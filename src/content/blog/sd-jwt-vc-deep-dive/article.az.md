---
title: "SD-JWT VC ətraflı: imzalama, açıqlamalar, KB-JWT"
slug: sd-jwt-vc-deep-dive
description: "SD-JWT VC-nin bayt-bayt necə qurulduğu və yoxlandığı: duzlanmış həşlər, _sd, cnf, KB-JWT və sd_hash, vct#integrity və status — Tamga profili ilə."
date: 2026-10-08
lang: az
updated: 2026-10-19
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Sources: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9 (Tamga constraints, disclosure, hash-the-string rule, _sd sorted, decoys forbidden, x5c, typ, cnf, KB-JWT, sd_hash, Ş1–Ş10, C1–C18); SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b issuerId from leaf cert); SPEC-CRED-0003 (status claim); schema-catalog (vct URN, W3C SRI integrity string, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vector v2, fake person data; issuer URL replaced with an example path); live catalogue entry for urn:tamga:edu:DiplomaCredential:1 (content_hash = vector vct#integrity, checked 2026-10-08). RFC 9901 (Nov 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Aug 2026, IESG evaluation; iat may be disclosable, vct#integrity optional, status JWT list). HAIP 1.0 Final §6 (x5c, KB-JWT always with holder binding). -->

SD-JWT VC sənədi verən qurumun imzaladığı JWT-dir. O, iddia dəyərlərinin əvəzinə duzlanmış SHA-256 həşlərini daşıyır, yanında isə `~` ilə birləşdirilmiş **açıqlamalar** (disclosures — duzlanmış dəyərlərin özləri) siyahısı göndərilir. Sənəd sahibi iddianı onun açıqlamasını göndərməklə göstərir, açıqlamanı göndərməməklə isə gizlədir; hər təqdimatı sənəd sahibinin cihaz açarı ilə imzalanmış **KB-JWT** tamamlayır.

Burada iki standart iştirak edir. **SD-JWT** mexanizmdir; IETF onu 2025-ci ilin noyabrında RFC 9901 kimi dərc edib. **SD-JWT VC** onun üzərində qurulan rəqəmsal sənəd profilidir, `draft-ietf-oauth-sd-jwt-vc`; 19-cu versiya (31 avqust 2026) IESG qiymətləndirməsindədir. Tamga-nın bayt səviyyəsindəki profili [SPEC-CRED-0002](https://docs.tamga.network/specifications/sd-jwt-vc) sənədində təsvir olunub.

> **Qeyd:** Aşağıdakı bütün nümunələr Tamga-nın açıq uyğunluq test vektorundan `sd-jwt/diploma-basic` götürülüb (uydurma şəxs məlumatları, şəxsi açarlar yoxdur). Sənədi verən qurumun URL-ini nümunə yolla əvəz etmiş, sertifikatları isə qısaltmışıq. İmzalar çıxarılıb, ona görə də nümunələri sadələşdirilmiş hesab edin.

## Sənədi verən qurum əslində nəyi imzalayır?

Sənədi verən qurumun imzaladığı JWT adi JOSE başlığından və gizlədilə bilən iddiaların həşlərlə əvəz olunduğu faydalı yükdən (payload) ibarətdir:

```json title="Simplified example: header and payload of the issuer-signed JWT"
{
  "alg": "ES256",
  "typ": "dc+sd-jwt",
  "x5c": ["MIICCzCCAbCgAwIBAgIC…"]
}
{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=",
  "iat": 1790619528,
  "cnf": {
    "jwk": {
      "kty": "EC", "crv": "P-256",
      "x": "hFEM1avAMSadeciYwVO0nJ6aMEM8YDCTigu_GO4tqgM",
      "y": "R-5AIVbUthAPOiJm4-2U8aB1Oppfyjl84HhDZrLqdfU"
    }
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  },
  "_sd_alg": "sha-256",
  "_sd": [
    "5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo",
    "9xI8VcNCjl8OcW6W0n30e_LGJ4lm3ah3SAEVEI4pM38",
    "FJqsIjUpFitVLNSAhwL-3LcB-_4YoIupLGFhC5WhdMs",
    "IpStBdfeq4pqVfpP9xFH2ZM46lojLf7cqcEpDBk9OV4",
    "JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4",
    "kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI",
    "…6 more, sorted"
  ]
}
```

Açıq qalan iddialar yoxlayan tərəfin qalan hər şeyi oxuya bilməsi üçün əvvəlcə lazım olanlardır. Tamga-da onlar tip metaməlumatlarında `sd: "never"` kimi işarələnir və heç vaxt gizlədilə bilməz:

| İddia | Niyə görünən qalır |
|---|---|
| `iss` | qeydiyyatdakı sənədi verən qurumla uyğunluq yoxlaması |
| `vct`, `vct#integrity` | tipin müəyyənləşdirilməsi və sabitlənməsi |
| `iat` | etibar yoxlamaları bu vaxta bağlıdır |
| `cnf` | KB-JWT-ni yoxlamaq üçün lazımdır |
| `status` | ləğv statusunun yoxlanması |
| `_sd_alg`, `_sd` | mexanizmin özü |
| `exp` | tipdə mövcud olduqda |

19-cu layihə versiyası sənədi verən quruma `iat` iddiasını seçici paylaşım (selective disclosure) ilə gizlədilə bilən etməyə imkan verir. Tamga onu görünən saxlayır, çünki yoxlayan tərəf etibar qatından "bu qurumun `iat` **anında** bu tipi verməyə icazəsi var idimi?" deyə soruşur, "bu gün icazəsi varmı" deyə yox.

Başlıq sənədi verən qurumun sertifikat zəncirini `x5c` sahəsində daşıyır: əvvəlcə son (leaf) sertifikat gəlir, kök sertifikat isə daxil edilmir. HAIP 1.0 `x5c` əsaslı açar müəyyənləşdirilməsini tələb edir, Tamga isə `x5c` sahəsini məcburi edir. Yoxlayan tərəf sənədi verən qurumun kimliyini heç vaxt `iss` sahəsindən deyil, **son sertifikatın barmaq izindən** (fingerprint) müəyyən edir. Əgər `iss` sahəsinə etibar etsəydi, eyni kök altında etibarlı sertifikatı olan istənilən qurum `iss` sahəsinə başqa universitetin URL-ini yazıb öz açarı ilə imzalaya bilərdi.

`typ` sahəsinin dəyəri `dc+sd-jwt` olur. Layihə 2024-cü ilin noyabrına qədər `vc+sd-jwt` dəyərindən istifadə edirdi və W3C media tipi ilə toqquşmanın qarşısını almaq üçün onu dəyişdi. Tamga-nın sənədi verən qurumları yalnız `dc+sd-jwt` yaradır, yoxlayan tərəf isə xarici rəqəmsal sənədlər üçün uyğunluq bayrağı aktivləşdirilmədikcə `vc+sd-jwt` dəyərini rədd edir (bayraq standart olaraq söndürülüb).

## Açıqlama necə qurulur və niyə sətrin özü həşlənir?

Açıqlama üç elementli JSON massividir `[salt, name, value]`; o, UTF-8 ilə, sonra isə doldurma (padding) olmadan base64url ilə kodlaşdırılır. Duz (salt) 16 təsadüfi baytdır (128 bit) və hər açıqlama üçün yenidən yaradılır. Vektorun təqdimatındakı dörd açıqlama bunlardır:

```text title="Disclosures from the conformance vector, decoded, with their digests"
WyJJY3NEZDFmdmh6bS1mcVpTNDJLb1p3IiwiZXFmX2xldmVsIiw2XQ
  → ["IcsDd1fvhzm-fqZS42KoZw","eqf_level",6]
  → 5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo

WyJoY0FvdmV4bmpkTFd3aF9sN1hkM1ZBIiwiaXNfZ3JhZHVhdGUiLHRydWVd
  → ["hcAovexnjdLWwh_l7Xd3VA","is_graduate",true]
  → kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI

WyJSc3ZSUXY2cDhGM3NfRXRBSXFQTnpnIiwiZmFtaWx5X25hbWUiLCLDlnJuZWsiXQ
  → ["RsvRQv6p8F3s_EtAIqPNzg","family_name","Örnek"]
  → JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4

WyJjazFtMktWejdVWEg2cTlMNEJad1BRIiwiZ2l2ZW5fbmFtZSIsIlZla3TDtnIiXQ
  → ["ck1m2KVz7UXH6q9L4BZwPQ","given_name","Vektör"]
  → sHl3d9xOXRVt7kU78VQvmAjq4kZzrWjyyJV1sBfRA1M
```

Həş `base64url(SHA-256(ASCII bytes of the disclosure string))` kimi hesablanır. Yuxarıdakı dörd həşin hər biri faydalı yükün `_sd` massivində yer alır.

SD-JWT kodunda ən çox rast gəlinən xəta açıqlamanı dekod etmək, massivi yenidən seriallaşdırmaq və nəticəni həşləməkdir. JSON seriallaşdırması deterministik deyil: vergüldən sonrakı boşluq və ya `ö` simvolunun `\u00f6` kimi yazılması fərqli baytlar və fərqli həş verir. Tamga spesifikasiyası bunu `given_name: "Ayşe"` üçün açıqlama nümunəsində göstərir: boşluqsuz və ya escape ardıcıllıqları olmadan yenidən seriallaşdırma `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` həşini `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU` həşinə çevirir. Yoxlayan tərəflər üçün qayda sadədir: **sətri alındığı kimi həşləyin, sonra dekod edin.** Heç vaxt əksinə yox.

![İddiadan imzalanmış faydalı yükdəki həşə qədər dörd addım](/blog/sd-jwt-vc-deep-dive/en/fig-disclosure.png)

## `_sd` massivi niyə sıralanır və niyə yalançı həşlər yoxdur?

Tamga `_sd` massivini baytların artan sırası ilə sıralayır. Sıralanmasa, həşlər sənədi verən qurumun iddiaları emal etdiyi ardıcıllıqla düzülərdi, bu da adətən sxemi izləyir. Onda yoxlayan tərəf gizli həşləri sxemin sahələr siyahısı ilə tutuşdurub hansı sahələrin gizlədildiyini müəyyən edə bilərdi.

RFC 9901 həmçinin gizlədilən iddiaların sayını bulanıqlaşdırmaq üçün **yalançı həşlərə** (decoy digests) — heç bir açıqlamaya uyğun gəlməyən saxta yazılara — icazə verir. Tamga onları qadağan edir. `vct` açıq görünür və tip metaməlumatları bütün sahələri sadalayır, ona görə də say onsuz da hamıya məlumdur. Sənədi verən qurumlar arasında yalançı həşlərin fərqli sayı özü barmaq izinə çevrilərdi, hər yalançı həş isə QR koda 43 simvol əlavə edir. Əsl yan kanal dəyişən açıqlama dəstidir, ona görə də Tamga-nın rəqəmsal cüzdan qaydaları bunun əvəzinə şəbəkədəki cüzdanlardan dəsti hər yoxlayan tərəf və tip üzrə sabit saxlamağı tələb edir.

Daha iki profil məhdudiyyəti: iç-içə seçici paylaşım iki səviyyə ilə məhdudlaşdırılıb, massivin ayrı-ayrı elementlərinin gizlədilməsindən isə hələ istifadə olunmur.

## Sənəd sahibinə bağlama necə işləyir və KB-JWT nəyi imzalayır?

`cnf.jwk` sənəd verilərkən telefonun təhlükəsiz aparat modulunda yaradılan P-256 açarının açıq yarısıdır (sənədi verən qurum onu rəqəmsal cüzdanın açar sübutundan köçürür; bax: [OpenID4VCI ətraflı](/blog/openid4vci-deep-dive)). Gizli yarı heç vaxt cihazı tərk etmir. Tamga-da `cnf` olmayan rəqəmsal sənəd etibarsızdır, KB-JWT olmayan təqdimat da həmçinin. Standart açar bağlamasını ixtiyari saxlayır; HAIP rəqəmsal sənəd sənəd sahibinə bağlı olduqda KB-JWT tələb edir, Tamga isə hər rəqəmsal sənədi bağlayır.

Təqdimat zamanı rəqəmsal cüzdan yalnız yoxlayan tərəfin istədiyi və şəxsin təsdiqlədiyi açıqlamaları saxlayır, sonra KB-JWT əlavə edir:

![Rəqəmsal cüzdanda nə saxlanılır və yoxlayan tərəfə nə göndərilir](/blog/sd-jwt-vc-deep-dive/en/fig-anatomy.png)

```json title="KB-JWT from the conformance vector (header and payload)"
{ "alg": "ES256", "typ": "kb+jwt" }
{
  "nonce": "conf-nonce-0001",
  "aud": "x509_hash:9OGMDF0OXzjg3FX8kOjh9tUnI7A5VhSc1mweK1ElZ_Q",
  "iat": 1790705928,
  "sd_hash": "-SOR78_i6a2u-_oX-jovk7jVjCrsZYIe35q4lixd8NE"
}
```

`nonce` yoxlayan tərəfin birdəfəlik çağırışıdır (challenge), ona görə də qeydə alınmış təqdimatı təkrar istifadə etmək mümkün deyil. `aud` yoxlayan tərəfin prefiks daxil olmaqla **tam** müştəri identifikatorudur; OpenID4VP üzərindən bu, `x509_hash:` və onun giriş sertifikatının barmaq izidir ([OpenID4VP və DCQL ətraflı](/blog/openid4vp-dcql-deep-dive)). `iat` yoxlayan tərəfin saatından ən çox 300 saniyə fərqlənə bilər.

`sd_hash` vasitəçinin açıqlamanı silməsinin qarşısını alan elementdir:

```text title="What goes into sd_hash"
sd_hash = base64url( SHA-256( ASCII bytes of
  "<issuer-signed JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Yalnız təqdim olunan açıqlamalar daxil edilir və sondakı `~` da girişin bir hissəsidir. `sd_hash` olmasaydı, kimsə diplom təqdimatından `grade` açıqlamasını çıxara bilərdi və hər iki imza yenə də doğrulanardı.

Əhatə dairəsi barədə xatırlatma: etibarlı KB-JWT rəqəmsal sənədə bağlanmış açara nəzarəti sübut edir. Telefonu hansı insanın tutduğunu isə sübut etmir.

## `vct` və `vct#integrity` nə üçündür?

`vct` rəqəmsal sənədin tipini adlandırır. Tamga URN-lərdən (`urn:tamga:<domain>:<Type>:<major>`) istifadə edir ki, domen adı dəyişsə belə, identifikator dəyişməsin. Tip metaməlumatları sənədi ictimai kataloqun URN-ə uyğunlaşdırdığı HTTPS ünvanında yerləşir; 19-cu layihə versiyası bunu "reyestrdən" müəyyənləşdirmə adlandırır (§5.3.2). Diplom üçün `https://schemas.tamga.network/v1/catalogue.json` `urn:tamga:edu:DiplomaCredential:1` tipini onun metaməlumat faylına və `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` məzmun həşinə uyğunlaşdırır; bu, vektordakı `vct#integrity` ilə eyni sətirdir.

Bütövlük dəyəri W3C Subresource Integrity formatından istifadə edir: `sha256-`, ardınca sənədin xam baytlarının base64 SHA-256 həşi. Dərc edilmiş fayl bayt-bayt eyni qalmalıdır; heç bir proksi onu yenidən formatlaşdıra bilməz. Standart `vct#integrity` sahəsini ixtiyari edir. Tamga onu məcburi edir ki, yoxlayan tərəfə heç vaxt sənədi verən qurumun imzalayarkən əsaslandığı tip tərifindən fərqli tərif təqdim edilə bilməsin. Hər iddianın `sd` siyasəti (`always`, `allowed`, `never`) də tip metaməlumatlarında yazılır və Tamga-nın sənədi verən qurumları gizlədilməsinə icazə verilən hər iddianı gizlədir.

## `status` iddiası nəyə istinad edir?

`status.status_list` indeksi (`idx`) və Token Status List URI-sini saxlayır. Yoxlayan tərəf həmin indeksdəki yazını əvvəlcədən yüklədiyi imzalanmış, sıxılmış siyahıdan oxuyur: `0` — etibarlı, `1` — ləğv edilib, yalnız sxemi dayandırmaya icazə verən tiplər üçün `2` — dayandırılıb; `3` istifadə olunmur və ləğv edilmiş kimi qəbul edilir. Tamga indeksləri təsadüfi ayırır, siyahı URI-lərini qeyri-şəffaf saxlayır və yoxlayan tərəflərdən siyahıları cədvəl üzrə əvvəlcədən yükləmələrini gözləyir ki, sənədi verən qurum rəqəmsal sənədin nə vaxt yoxlandığını heç vaxt bilməsin. 19-cu layihə versiyası istinad edilən status siyahısının JWT formasında olmasını tələb edir. Mexanika və məxfilik qaydaları [HAIP və Token Status List](/blog/haip-and-token-status-list) məqaləsində izah olunur.

## Yoxlayan tərəf SD-JWT VC-ni hansı ardıcıllıqla yoxlamalıdır?

Tamga hər yoxlama addımına daimi kod verir və onun yoxlayıcısı uğursuz olan ilk kodu `failed_step` kimi qaytarır. Əvvəlcə format qatı işləyir:

| Kod | Yoxlama |
|---|---|
| A1 | `~` üzrə bölmə; son hissə boş deyil, KB-JWT olmalıdır |
| A2 | başlıq: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` mövcuddur |
| A3 | siyahıdakı kökə qədər zəncir, aralıq sertifikatlar CA-dır, JWT imzası etibarlıdır |
| A3b | sənədi verən qurumun kimliyi `iss` sahəsindən deyil, son sertifikatın barmaq izindən |
| A3c | son sertifikat ləğv edilməyib |
| A3d | `cnf` mövcuddur |
| A4 | `_sd_alg` = `sha-256` |
| A5 | hər açıqlama: sətri həşləyin, `_sd` daxilində tapın, sonra dekod edin |
| A6 | KB-JWT: `cnf` ilə imza, `aud`, `nonce`, `iat` ±300 s daxilində, `sd_hash` |
| A7 | `exp` keçməyib, `nbf` çatıb |
| A8 | heç bir həş iki dəfə istifadə olunmur, heç bir açıqlama görünən iddianın üzərinə yazmır |

Bunlardan ikisi xüsusi diqqətə layiqdir. A5 həşi `_sd` daxilində olmayan istənilən açıqlamanı rədd edir, çünki onu qəbul etmək hər kəsə sənədi verən qurumun heç vaxt imzalamadığı iddiaları əlavə etməyə imkan verərdi. A8, məsələn, `iss` və ya `vct` adlı açıqlamanı rədd edir, çünki o, görünən iddianın üzərinə yazardı.

Format qatından sonra sxem yoxlamaları (B1–B6: `vct` həll edilir, bütövlük heşi kataloqla müqayisə olunur, `extends` izlənilir), imzalanmış etibar siyahısı üzrə etibar yoxlamaları (C1–C4: sənədi verən qurum `iat` anında siyahıda olubmu və bu növ üçün səlahiyyətli idimi), ləğv (D1–D6) və yoxlayan tərəfin öz siyasəti (E1–E4) gəlir. Nəticənin üç dəyəri var: qəbul edildi, rədd edildi və ya status siyahısı kimi infrastruktura çatmaq mümkün olmadıqda qeyri-müəyyən. "Hazırda yoxlaya bilmirəm" heç vaxt "etibarsız" kimi bildirilmir. Tam reyestr [yoxlama ardıcıllığı](https://docs.tamga.network/specifications/verification-api) səhifəsindədir.

Bütün bunları bizim istifadə etdiyimiz eyni baytlar üzərində Siz də işlədə bilərsiniz: test vektoru, onun beş neqativ halı (KB-JWT yoxdur, yanlış nonce, `iat` 301 saniyə fərqlə, uyğunu olmayan disclosure, müddəti bitmiş rəqəmsal sənəd) və icraçı proqram açıq repozitoriyanın [uyğunluq qovluğunda](https://github.com/tamga-network/tamga-network/tree/main/conformance) yerləşir.

## Tamga profili standartla müqayisədə nəyi dəyişir?

| Mövzu | Standart | Tamga |
|---|---|---|
| İmza | bir neçə alqoritm | yalnız ES256 |
| `_sd_alg` | bir neçə | `sha-256`, açıq şəkildə yazılır |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` standart olaraq rədd edilir |
| Sənədi verən qurumun açarı | `iss` metaməlumatları, `x5c` və ya digər | `x5c` məcburidir, kök daxil edilmir |
| Açar bağlaması | ixtiyari | hər rəqəmsal sənəd üçün məcburi |
| Yalançı (decoy) heşlər | icazəlidir | qadağandır |
| `_sd` ardıcıllığı | müəyyən edilməyib | sıralanmış |
| `vct#integrity` | ixtiyari | məcburi |
| İç-içə disclosure | icazəlidir | ən çoxu iki səviyyə |

Qalan hər şey RFC 9901 və 19-cu layihəyə uyğundur; Tamga yoxlayan tərəfi Tamga-nın öz sənədi verən qurumundan fərqli seriyalaşdırılmış disclosure-ları da yoxlayır, çünki massivləri deyil, sətirləri heşləyir.

## Tez-tez verilən suallar

### Tamga rəqəmsal sənədlərini yoxlamaq üçün ümumi SD-JWT kitabxanasından istifadə edə bilərəmmi?

Bəli, əgər kitabxana disclosure sətirlərini alındığı kimi heşləyirsə və açar bağlamasını məcburi etməyə imkan verirsə. Üzərinə Tamga-nın profil yoxlamalarını əlavə edin: yalnız ES256, siyahıdakı kökə qədər `x5c` zənciri, sənədi verən qurumun kimliyi son (leaf) sertifikatdan, məcburi KB-JWT və `vct#integrity`. `@tamga-network/sd-jwt` və `@tamga-network/verifier` paketləri bunların hamısını yerinə yetirir.

### Nə üçün `aud` sadəcə host adı deyil, tam müştəri identifikatorudur?

Çünki rəqəmsal cüzdanın yoxladığı məhz müştəri identifikatorudur. OpenID4VP üzərindən yoxlayan tərəf `x509_hash:` və sertifikatının barmaq izi ilə müəyyən edilir; KB-JWT-nin dəqiq həmin dəyərə bağlanması təqdimatı başqa heç kim üçün yararsız edir.

### İddianın gizlədilməsi sənədi verən qurumun imzasını dəyişirmi?

Xeyr. Gizlətmək disclosure-un `~` ilə birləşdirilmiş sətirdən çıxarılması deməkdir. İmzalanmış JWT heç vaxt yenidən imzalanmır və dəyişdirilmir.

### Nə üçün 128 bitlik duz (salt)?

Əks halda doğum tarixi kimi aşağı entropiyalı dəyərin heşini bütün mümkün tarixləri sınamaqla tapmaq olardı. Hər disclosure üçün yeni 16 baytlıq duz bunu praktiki olaraq mümkünsüz edir və eyni iddianın iki rəqəmsal sənəddə eyni heşi yaratmasının da qarşısını alır.

## Mənbələr

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, noyabr 2025](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, avqust 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, yekun versiya, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network sənədləri](https://docs.tamga.network/specifications/sd-jwt-vc)
- [Yoxlama ardıcıllığı və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)
- [Sxem kataloqu (Type Metadata, vct#integrity), Tamga Network sənədləri](https://docs.tamga.network/specifications/schema-catalog)
- [Uyğunluq vektorları və icraçı proqram, Tamga Network repozitoriyası](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network sənədləri](https://docs.tamga.network/packages/sd-jwt)

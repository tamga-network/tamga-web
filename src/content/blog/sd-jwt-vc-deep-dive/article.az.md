---
title: "SD-JWT VC ətraflı: imzalama, açıqlamalar, KB-JWT"
slug: sd-jwt-vc-deep-dive
description: "SD-JWT VC-nin bayt-bayt necə qurulduğunu və yoxlandığını Tamga profili ilə izah edirik: duzlanmış heşlər, _sd, cnf, KB-JWT və sd_hash, vct#integrity və status."
date: 2026-10-08
lang: az
updated: 2026-10-19
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Sources: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9 (Tamga constraints, disclosure, hash-the-string rule, _sd sorted, decoys forbidden, x5c, typ, cnf, KB-JWT, sd_hash, Ş1–Ş10, C1–C18); SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b issuerId from leaf cert); SPEC-CRED-0003 (status claim); schema-catalog (vct URN, W3C SRI integrity string, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vector v2, fake person data; issuer URL replaced with an example path); live catalogue entry for urn:tamga:edu:DiplomaCredential:1 (content_hash = vector vct#integrity, checked 2026-10-08). RFC 9901 (Nov 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Aug 2026, IESG evaluation; iat may be disclosable, vct#integrity optional, status JWT list). HAIP 1.0 Final §6 (x5c, KB-JWT always with holder binding). -->

SD-JWT VC qurumun imzaladığı JWT-dir və sahə dəyərləri əvəzinə bu dəyərlərin duzlanmış SHA-256 heşlərini daşıyır. JWT-nin yanında `~` işarəsi ilə birləşdirilmiş **açıqlamalar** (disclosures) gəlir. Açıqlamalar duzlanmış dəyərlərin özüdür. Sənəd sahibi sahəni göstərmək istəyəndə həmin sahənin açıqlamasını göndərir, gizlətmək istəyəndə göndərmir. Hər təqdimatın sonuna sənəd sahibinin cihaz açarı ilə imzaladığı **KB-JWT** əlavə olunur.

Burada iki standart var. **SD-JWT** üsulun özüdür və IETF onu 2025-ci ilin noyabrında RFC 9901 kimi dərc edib. **SD-JWT VC** isə bunun üzərində qurulan sənəd profilidir (`draft-ietf-oauth-sd-jwt-vc`) və onun 19-cu versiyası (31 avqust 2026) IESG qiymətləndirməsindədir. Tamga-nın bayt səviyyəsindəki profili [SPEC-CRED-0002](https://docs.tamga.network/specifications/sd-jwt-vc) sənədində yazılıb.

> **Qeyd:** Aşağıdakı nümunələrin hamısını Tamga-nın açıq uyğunluq vektoru olan `sd-jwt/diploma-basic`-dən götürmüşük. Vektordakı şəxsi məlumatlar saxtadır və orada gizli açar yoxdur. Qurumun ünvanını nümunə yolla əvəz etdik və sertifikatları qısaltdıq. İmzalar göstərilmədiyi üçün nümunələri sadələşdirilmiş hesab edin.

## Qurum əslində nəyi imzalayır?

İmzalanmış JWT-nin adi JOSE başlığı və faydalı yükü olur. Faydalı yükdə gizlədilə bilən sahələrin yerində onların heşləri durur:

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

Açıq qalan sahələr yoxlayan tərəfin başqa nəyisə oxuya bilməsi üçün əvvəlcə bilməli olduğu sahələrdir. Tamga-da bu sahələr tip metaməlumatında `sd: "never"` kimi işarələnir və heç vaxt gizlədilə bilməz:

| Sahə | Niyə açıq qalır |
|---|---|
| `iss` | qeydiyyatdakı qurumla uyğunluğu yoxlamaq üçün |
| `vct`, `vct#integrity` | tipi müəyyənləşdirmək və sabitləmək üçün |
| `iat` | etibar yoxlamaları bu ana görə aparıldığı üçün |
| `cnf` | KB-JWT-ni yoxlamaq üçün |
| `status` | ləğv vəziyyətini sorğulamaq üçün |
| `_sd_alg`, `_sd` | üsulun özü olduqları üçün |
| `exp` | tipdə varsa |

19-cu layihə qurumun `iat` sahəsini də seçici açıqlanan etməsinə icazə verir. Tamga bu sahəni açıq saxlayır, çünki yoxlayan tərəf etibar qatından qurumun bu tipi bu gün verə bilib-bilmədiyini deyil, `iat` anında verə bilib-bilmədiyini soruşur.

Başlıqdakı `x5c` sahəsi qurumun sertifikat zəncirini daşıyır. Zəncirdə əvvəlcə yarpaq sertifikat gəlir, kök sertifikat isə əlavə edilmir. HAIP 1.0 açarın `x5c` vasitəsilə tapılmasını məcburi edir və Tamga-da `x5c` olmayan sənəd yoxlamadan keçmir. Yoxlayan tərəf qurumun kimliyini `iss` sahəsindən deyil, **yarpaq sertifikatın barmaq izindən** çıxarır. `iss` sahəsinə etibar etsəydi, eyni kök altında etibarlı sertifikatı olan istənilən qurum `iss` sahəsinə başqa universitetin ünvanını yazıb sənədi öz açarı ilə imzalaya bilərdi.

`typ` dəyəri `dc+sd-jwt`-dir. Layihə 2024-cü ilin noyabrına qədər `vc+sd-jwt` istifadə edirdi və bu dəyər W3C media tipi ilə toqquşmasın deyə dəyişdirildi. Tamga qurumları yalnız `dc+sd-jwt` yaradır və yoxlayan tərəf `vc+sd-jwt` dəyərini rədd edir. Xarici ekosistemlərdən gələn sənədlər üçün uyğunluq seçimi var, amma bu seçim standart olaraq bağlıdır.

## Açıqlama necə qurulur və niyə sətrin heşi götürülür?

Açıqlama `[duz, ad, dəyər]` formasında üç elementli JSON massividir. Massiv UTF-8 ilə, sonra isə doldurmasız base64url ilə kodlaşdırılır. Duz 16 təsadüfi baytdan (128 bit) ibarətdir və hər açıqlama üçün yenidən yaradılır. Vektordakı təqdimatda bu dörd açıqlama var:

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

Heş `base64url(SHA-256(açıqlama sətrinin ASCII baytları))` düsturu ilə hesablanır. Yuxarıdakı dörd heşin hamısı faydalı yükdəki `_sd` massivində var.

SD-JWT kodunda ən çox rast gəlinən xəta açıqlamanı açıb massivi yenidən JSON-a çevirmək və sonra onun heşini götürməkdir. JSON-un yazılışı vahid deyil. Vergüldən sonra boşluq qoymaq və ya `ö` hərfini `ö` kimi yazmaq fərqli baytlar və deməli fərqli heş yaradır. Tamga-nın spesifikasiyası bunu `given_name: "Ayşe"` üçün qurulmuş açıqlama ilə göstərir. Massiv boşluqsuz və escape simvolları olmadan yenidən yazılanda `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` heşi `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU` olur. Yoxlayan tərəflər üçün qayda sadədir: **əvvəlcə sətrin heşini gəldiyi kimi götürün, sonra sətri açın.** Bu sıra heç vaxt tərsinə çevrilmir.

![İddiadan imzalanmış faydalı yükdəki heşə qədər dörd addım](/blog/sd-jwt-vc-deep-dive/en/fig-disclosure.png)

## `_sd` massivi niyə sıralanır və niyə saxta heşlər yoxdur?

Tamga `_sd` massivini artan bayt sırası ilə düzür. Massiv sıralanmasaydı, heşlər qurumun sahələri emal etdiyi sırada durardı və bu sıra çox vaxt sxemdəki sıradır. Yoxlayan tərəf də gizli heşləri sxemdəki sahə siyahısı ilə yan-yana qoyaraq hansı sahələrin gizlədildiyini müəyyənləşdirə bilərdi.

RFC 9901 neçə sahənin gizlədildiyini qeyri-müəyyən etmək üçün **saxta heşlər** (decoy) əlavə etməyə də icazə verir. Bunlar heç bir açıqlamaya uyğun gəlməyən qeydlərdir. Tamga isə saxta heşləri qadağan edir. `vct` açıqdır və tip metaməlumatı bütün sahələri sadalayır, yəni sahələrin sayı onsuz da hamıya məlumdur. Qurumdan quruma dəyişən saxta heş sayı da özlüyündə barmaq izinə çevrilərdi. Bundan əlavə, hər saxta heş QR koda 43 simvol əlavə edir. Əsl məlumat sızması göstərilən açıqlama dəstinin dəyişməsindən yaranır. Ona görə Tamga-nın cüzdan qaydaları şəbəkədəki cüzdanların eyni yoxlayan tərəfə eyni tip üçün hər dəfə eyni dəsti göstərməsini tələb edir.

Profildə daha iki məhdudiyyət var. İç-içə seçici açıqlama ən çoxu iki səviyyəyə icazə verir, massiv elementlərini ayrı-ayrılıqda gizlətmək isə hələlik istifadə olunmur.

## Sənəd sahibinə bağlanma necə işləyir və KB-JWT nəyi imzalayır?

`cnf.jwk` sənəd verilərkən telefonun təhlükəsiz aparat modulunda yaradılan P-256 açarının açıq yarısıdır. Qurum bu açarı cüzdanın göndərdiyi sahiblik sübutundan köçürür ([OpenID4VCI ətraflı](/blog/openid4vci-deep-dive)). Açarın gizli yarısı cihazdan heç vaxt çıxmır. Tamga-da `cnf` olmayan sənəd də, KB-JWT olmayan təqdimat da etibarsızdır. Standart açara bağlanmanı istəyə buraxır. HAIP isə sənəd cihaza bağlıdırsa hər təqdimatda KB-JWT tələb edir və Tamga hər sənədi cihaza bağlayır.

Təqdimat zamanı cüzdan yalnız yoxlayan tərəfin istədiyi və şəxsin təsdiqlədiyi açıqlamaları saxlayır və sonuna KB-JWT əlavə edir:

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

`nonce` yoxlayan tərəfin yalnız bir dəfə istifadə oluna bilən çağırış dəyəridir. Bunun sayəsində qeydə alınmış təqdimat yenidən istifadə edilə bilmir. `aud` yoxlayan tərəfin prefiksi ilə birlikdə **tam** müştəri identifikatorudur. OpenID4VP-də bu dəyər `x509_hash:` prefiksindən və yoxlayan tərəfin giriş sertifikatının barmaq izindən ibarətdir ([OpenID4VP və DCQL ətraflı](/blog/openid4vp-dcql-deep-dive)). `iat` isə yoxlayan tərəfin saatından ən çoxu 300 saniyə fərqli ola bilər.

Aradakı birinin açıqlamanı silməsinin qarşısını `sd_hash` alır:

```text title="What goes into sd_hash"
sd_hash = base64url( SHA-256( ASCII bytes of
  "<issuer-signed JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Hesablamaya yalnız göstərilən açıqlamalar daxil olur və sondakı `~` da hesablamaya daxildir. `sd_hash` olmasaydı, kimsə diplom təqdimatından `grade` açıqlamasını çıxara bilərdi və hər iki imza yenə də etibarlı görünərdi.

Bu üsulun əhatə dairəsini də xatırladaq. Etibarlı KB-JWT sənədə bağlı açarın əldə saxlandığını sübut edir. Telefonu hansı insanın tutduğunu isə sübut etmir.

## `vct` və `vct#integrity` nə üçündür?

`vct` sənədin tipini adlandırır. Tamga bunun üçün `urn:tamga:<sahə>:<Tip>:<əsas versiya>` formasında URN-lərdən istifadə edir. Beləliklə domen adı dəyişsə belə, tipin identifikatoru dəyişmir. Tip metaməlumatı (Type Metadata) açıq kataloqun URN-dən uyğunlaşdırdığı HTTPS ünvanında yerləşir. 19-cu layihə bu üsulu "reyestrdən həll etmə" adlandırır (§5.3.2). Diplom üçün `https://schemas.tamga.network/v1/catalogue.json` `urn:tamga:edu:DiplomaCredential:1` tipini metaməlumat faylına və `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` məzmun heşinə uyğunlaşdırır. Bu dəyər vektordakı `vct#integrity` sahəsi ilə eyni sətirdir.

Bütövlük dəyəri W3C Subresource Integrity formatından istifadə edir. Dəyər `sha256-` prefiksi ilə başlayır və sənədin xam baytlarının base64 formasındakı SHA-256 heşi ilə davam edir. Ona görə dərc olunan fayl bayt-bayt eyni qalmalıdır və heç bir aralıq server onu yenidən formatlaya bilməz. Standart `vct#integrity` sahəsini istəyə buraxır, Tamga isə məcburi edir. Beləliklə yoxlayan tərəfə qurumun sənədi imzalayarkən əsaslandığı tərifdən fərqli tip tərifi verilə bilmir. Hər sahənin `sd` siyasəti (`always`, `allowed`, `never`) də tip metaməlumatında yazılır və Tamga qurumları gizlədilməsinə icazə verilən hər sahəni gizlədir.

## `status` sahəsi nəyə işarə edir?

`status.status_list` indeks (`idx`) və Token Status List ünvanını daşıyır. Yoxlayan tərəf əvvəlcədən endirdiyi imzalanmış və sıxılmış siyahıda həmin indeksdəki dəyəri oxuyur. `0` etibarlı, `1` ləğv edilmiş deməkdir. Sxemi dayandırmaya icazə verən tiplərdə `2` dayandırılmış deməkdir. `3` isə istifadə olunmur və ləğv kimi qiymətləndirilir. Tamga indeksləri təsadüfi paylayır, siyahı ünvanlarını mənasız sətirlərdən yaradır və yoxlayan tərəflərin siyahıları müəyyən fasilələrlə əvvəlcədən endirməsini tələb edir. Beləliklə qurum sənədin nə vaxt yoxlandığını heç vaxt öyrənə bilmir. 19-cu layihə istinad edilən status siyahısının JWT formasında olmasını tələb edir. İşləmə qaydasını və məxfilik qaydalarını [HAIP və Token Status List](/blog/haip-and-token-status-list) yazısında izah etmişik.

## Yoxlayan tərəf SD-JWT VC-ni hansı ardıcıllıqla yoxlamalıdır?

Tamga hər yoxlama addımına daimi kod verir və yoxlayan tərəf ilk uğursuz addımın kodunu `failed_step` sahəsində qaytarır. İlk işləyən qat format qatıdır:

| Kod | Yoxlama |
|---|---|
| A1 | `~` ilə böl; son hissə boş olmamalı, KB-JWT olmalıdır |
| A2 | başlıq: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` var |
| A3 | zəncir siyahıdakı köklərdən birinə çatır, aralıq sertifikatlar CA-dır, JWT imzası etibarlıdır |
| A3b | qurumun kimliyi `iss` sahəsindən deyil, yarpaq sertifikatın barmaq izindən çıxarılır |
| A3c | yarpaq sertifikat ləğv edilməyib |
| A3d | `cnf` var |
| A4 | `_sd_alg` = `sha-256` |
| A5 | hər açıqlama üçün əvvəlcə sətrin heşini götür, `_sd` daxilində tap, sonra aç |
| A6 | KB-JWT: `cnf` ilə imza, `aud`, `nonce`, ±300 san daxilində `iat`, `sd_hash` |
| A7 | `exp` keçməyib, `nbf` vaxtı çatıb |
| A8 | eyni heş iki dəfə istifadə olunmayıb, açıq sahənin üzərinə yazan açıqlama yoxdur |

Bunlardan ikisi ayrıca izaha layiqdir. A5 heşi `_sd` daxilində olmayan hər açıqlamanı rədd edir. Onu qəbul etsəydi, hər kəs qurumun heç vaxt imzalamadığı sahələri sənədə əlavə edə bilərdi. A8 isə adı, məsələn, `iss` və ya `vct` olan açıqlamanı rədd edir, çünki belə açıqlama açıq sahənin üzərinə yazardı.

Format qatından sonra sxem yoxlamaları gəlir (B1–B6). Bu addımlarda `vct` həll edilir, bütövlük heşi kataloqla müqayisə olunur və `extends` zənciri izlənilir. Sonra imzalanmış etibar siyahısına qarşı etibar yoxlamaları (C1–C4) aparılır və qurumun `iat` anında siyahıda olub-olmadığına və bu tip üçün səlahiyyətli olub-olmadığına baxılır. Sonra ləğv yoxlaması (D1–D6) və yoxlayan tərəfin öz siyasəti (E1–E4) işləyir. Nəticə üç dəyərdən biridir. Sənəd qəbul edilir, rədd edilir və ya status siyahısı kimi infrastruktura çatmaq mümkün olmayanda "hazırda yoxlamaq mümkün olmadı" nəticəsi verilir. "Hazırda yoxlaya bilmirəm" vəziyyəti heç vaxt "etibarsız" kimi bildirilmir. Kodların tam siyahısını [yoxlama ardıcıllığı](https://docs.tamga.network/specifications/verification-api) sənədində tapa bilərsiniz.

Bu yoxlamaların hamısını bizim istifadə etdiyimiz baytlarla özünüz işlədə bilərsiniz. Vektor, beş mənfi hal və onları işlədən proqram açıq repozitoriyanın [conformance qovluğundadır](https://github.com/tamga-network/tamga-network/tree/main/conformance). Mənfi hallar KB-JWT-nin olmaması, səhv nonce, `iat` dəyərinin 301 saniyə sürüşməsi, uyğun gəlməyən açıqlama və müddəti bitmiş sənəddir.

## Tamga profili standartla müqayisədə nəyi dəyişir?

| Mövzu | Standart | Tamga |
|---|---|---|
| İmza | bir neçə alqoritm | yalnız ES256 |
| `_sd_alg` | bir neçə seçim | `sha-256`, açıq yazılır |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` standart olaraq rədd edilir |
| Qurumun açarı | `iss` metaməlumatı, `x5c` və ya başqa yol | `x5c` məcburidir, kök sertifikat əlavə edilmir |
| Açara bağlanma | istəyə bağlı | hər sənəddə məcburi |
| Saxta heşlər | icazəlidir | qadağandır |
| `_sd` sırası | müəyyən edilməyib | sıralanıb |
| `vct#integrity` | istəyə bağlı | məcburi |
| İç-içə açıqlama | icazəlidir | ən çoxu iki səviyyə |

Bunlardan başqa hər məsələdə Tamga RFC 9901-ə və 19-cu layihəyə əməl edir. Tamga yoxlayan tərəfi Tamga-nın öz qurumlarından fərqli şəkildə yazılmış açıqlamaları da yoxlaya bilir, çünki massivlərin deyil, sətirlərin heşini götürür.

## Tez-tez verilən suallar

### Tamga sənədlərini ümumi SD-JWT kitabxanası ilə yoxlaya bilərəmmi?

Kitabxana açıqlama sətirlərinin heşini gəldiyi kimi götürürsə və açara bağlanmanı məcburi etməyə imkan verirsə, yoxlaya bilərsiniz. Bunun üzərinə Tamga profilinin yoxlamalarını da əlavə etməlisiniz. Yalnız ES256 qəbul edilməli, `x5c` zənciri siyahıdakı köklərdən birinə çatmalı, qurumun kimliyi yarpaq sertifikatdan çıxarılmalı, KB-JWT və `vct#integrity` də məcburi olmalıdır. `@tamga-network/sd-jwt` və `@tamga-network/verifier` paketləri bunların hamısını edir.

### `aud` niyə sadəcə host adı deyil, tam müştəri identifikatorudur?

Cüzdanın yoxladığı dəyər müştəri identifikatorudur. OpenID4VP-də yoxlayan tərəf `x509_hash:` prefiksi və sertifikatının barmaq izi ilə tanınır. KB-JWT-ni məhz bu dəyərə bağlamaq təqdimatı başqa hər kəs üçün yararsız edir.

### Sahəni gizlətmək qurumun imzasını dəyişirmi?

Xeyr. Sahəni gizlətmək həmin sahənin açıqlamasını `~` ilə birləşdirilmiş sətirdən çıxarmaq deməkdir. İmzalanmış JWT heç vaxt yenidən imzalanmır və dəyişdirilmir.

### Niyə 128 bitlik duz istifadə olunur?

Duz olmasaydı, doğum tarixi kimi az sayda mümkün dəyəri olan sahənin heşini bütün mümkün tarixləri sınamaqla tapmaq olardı. Hər açıqlama üçün yenidən yaradılan 16 baytlıq duz bunu praktiki olaraq qeyri-mümkün edir. Eyni sahənin iki fərqli sənəddə eyni heşi yaratmasının da qarşısını alır.

## Mənbələr

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, noyabr 2025](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, avqust 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, yekun versiya, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network sənədləri](https://docs.tamga.network/specifications/sd-jwt-vc)
- [Yoxlama ardıcıllığı və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)
- [Sxem kataloqu (Type Metadata, vct#integrity), Tamga Network sənədləri](https://docs.tamga.network/specifications/schema-catalog)
- [Uyğunluq vektorları və icraçı proqram, Tamga Network repozitoriyası](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network sənədləri](https://docs.tamga.network/packages/sd-jwt)

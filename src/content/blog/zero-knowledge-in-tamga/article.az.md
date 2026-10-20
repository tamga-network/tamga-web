---
title: "Tamga-da sıfır bilik sübutu: Longfellow, sxemlər, etibar siyahısı"
slug: zero-knowledge-in-tamga
description: "Tamga Network-un \"18 yaşdan yuxarı\" şərtini Longfellow sıfır bilik sübutu ilə necə yoxladığı, sxemlərin niyə imzalı etibar siyahısında olduğu və bu gün nəyin işlədiyi."
date: 2026-10-08
lang: az
updated: 2026-10-19
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Mənbələr: ADR-0032 1.0.0 (sadə xülasə; kontekst: Longfellow açıq mənbəlidir, Apache-2.0, əsas kimi; Avropa İttifaqı (Aİ) yaş yoxlaması profili və TS13 onun üzərində qurulub, etibarlı ilkin quraşdırma (trusted setup) tələb olunmur, v8 namespace-i deyil, docType-ı bağlayır; 1-ci mərhələ ölçmələri 518 ms / 211 ms / ~343 KB, neqativ testlər; K1 longfellow-libzk-v1 ≥ v8; K2 sxemlər lotl.jws-də digest ilə, yeniləmə = siyahı yeniləməsi + CHANGELOG; K3 ilk predikat age_over_18, növbəti bərabərlik predikatları, diapazonlar və qurumun gizlədilməsi əhatə dairəsindən kənardır; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB QR-da deyil; K5 ehtiyat variant olaraq paket rəqəmsal sənəd nüsxələri; K6 ləğv yoxdur, qısamüddətli, accept_unrevocable_zk; K7 SessionTranscript üzərində cihaz açarı imzası, açıq açar gizlidir; K8/ZK6 unikal atribut adları; 2b mərhələsi Android kitabxanaları 2026-10-07 tarixində qurulub, iOS gözləmədədir; 2c mərhələsi rəqəmsal cüzdana inteqrasiya, telefon kitabxanaları hazır olana qədər sübut yaradılması söndürülüb; 3-cü mərhələ yoxlayan tərəf WASM 889 KB, d5e6be77-yə bərkidilib, masaüstündə ~3 s; native backend 0.2–0.3 s; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README (giriş nöqtələri, sxem faylları ~300 KB, siyahıdakı SHA-256 ilə yoxlanılır, iOS available() false, istənilən rəqəmsal cüzdan). guides/verify-on-server (siyasət nümunəsi, Z1, NOT_APPLICABLE, ehtiyat variant age-over-18-mdoc). SPEC-API-0001 Z1 və INDETERMINATE siyahısı. ARF arxitekturası §2.6, §2.8. Tamga Verify siyasəti accept_unrevocable_zk: true ilə age-over-18-zk olaraq təyin edilib. Canlı yoxlama 2026-10-08: verify.tamga.network/policies age-over-18-zk-ni göstərir; trust.tamga.network/lotl.json zk_circuits qeydi (id 5a8938…3c9291, v8, 1 atribut, ACTIVE, sha256 f44ab1…0d83); zk/<id>.zst 299,999 bayt, SHA-256 uyğundur. Xarici mənbələr: Longfellow ZK GitHub (bir neçə müstəqil təhlükəsizlik auditi), IACR ePrint 2024/2010 "Anonymous credentials from ECDSA", Google-un açıq mənbəyə keçid elanı, Aİ TS13 (araşdırma xarakterli; ETSI TS 119 476-2-yə), Aİ yaş yoxlaması planı (blueprint). -->

Sıfır bilik sübutu rəqəmsal cüzdana rəqəmsal sənədin özünü göstərmədən onun haqqında müəyyən bir müddəanı, məsələn, "bu şəxs 18 yaşdan yuxarıdır" müddəasını sübut etməyə imkan verir. Tamga Network-da yoxlayan tərəf yalnız qeydiyyatdan keçmiş qurumun şəxsiyyət sənədində `age_over_18 = true` göstərildiyini öyrənir. O, doğum tarixini, digər sahələri, qurumun imzasını və ya cihaz açarını görmür, eyni şəxsin iki təqdimatını isə bir-biri ilə əlaqələndirmək mümkün olmur. Tamga Longfellow ZK-ni qurumun mövcud [ISO mdoc](/blog/iso-mdoc-deep-dive) rəqəmsal sənədi üzərində tətbiq edir, buna görə qurum heç nəyi dəyişmir. Yoxlayan tərəf hissəsi Tamga Verify-da işləkdir (`age-over-18-zk` siyasəti); qəbul edilən sübut sxemləri imzalı etibar siyahısında dərc olunub; cüzdan tərəfində Android üçün native kitabxana hazırdır, iOS kitabxanası isə hələ gözlənilir.

## Sübut əslində nəyi sübut edir?

18 yaşdan yuxarı atributunun klassik təqdimatı doğum tarixini onsuz da gizlədir: rəqəmsal cüzdan yalnız bir sahəni, `age_over_18` sahəsini açıqlayır, başqa heç nəyi. Gizlədə bilmədiyi isə qurumun həmin sahə üzərindəki imzasıdır və eyni nüsxə hər dəfə göstərildikdə bu imza eyni olur. Tamga hər rəqəmsal sənədi 10 nüsxə şəklində verir ki, müxtəlif yoxlayan tərəflər müxtəlif imzalar görsün. Bu üsul işləyir, lakin nüsxələr tükənir və yenilənməlidir.

Sıfır bilik sübutu imzanı tamamilə görünməz edir. Rəqəmsal cüzdan saxladığı rəqəmsal sənəd üzərində hesablama aparır və bu hesablamanın düzgün nəticə verdiyini təsdiqləyən sübut yaradır. Longfellow sxeminin 8-ci versiyasında sübut aşağıdakıları bağlayır:

![Sıfır bilik təqdimatının nəyi göstərdiyi və nəyi gizlətdiyi](/blog/zero-knowledge-in-tamga/en/fig-gosterir.png)

- qurumun açıq açarı; yoxlayan tərəf onu etibar siyahısı ilə tutuşdurur;
- rəqəmsal sənədin növü (mdoc docType);
- atributun adı və dəyəri, burada `age_over_18` və `true`;
- cihaz açarı ilə bu sessiyanın protokolu üzərində verilmiş imza; bununla sübut məhz bu yoxlayan tərəfə və bu sorğuya bağlanır, cihazın açıq açarı isə gizli qalır;
- sübut yaradıldığı anda rəqəmsal sənədin etibarlılığı.

Sübutun bağlamadığı şey rəqəmsal sənəd daxilindəki ad sahəsidir (namespace). Sübut belə deyir: "bu qurumun bu növdən olan rəqəmsal sənədində hansısa ad sahəsində `age_over_18 = true` var". Tamga bu boşluğu kataloq qaydası ilə aradan qaldırır: bir rəqəmsal sənəd növü daxilində atribut adı yalnız bir ad sahəsində ola bilər və sxem kataloqu qurularkən bunu yoxlayır (ZK6 qaydası).

## Niyə Longfellow ZK?

Bir neçə yanaşma mövcuddur. Tamga üçün həlledici sual qurumların imzalama üsulunu dəyişməli olub-olmayacağı idi. Qərar sənədində onlar müqayisə edilir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)):

| Variant | Nəticə | Səbəb |
|---|---|---|
| Longfellow ZK | qəbul edildi | qurumlar ES256 mdoc imzalarını saxlayır; etibarlı ilkin quraşdırma (trusted setup) tələb olunmur; açıq mənbəlidir; müstəqil yoxlanılıb; Aİ yaş yoxlaması üzrə işlərini ona əsaslandırır |
| BBS imzaları | rədd edildi | qurumlar açarlarını və imza formatını dəyişməli olardı; Aİ-nin təsdiqlənmiş siyahısında yoxdur |
| Yalnız nüsxə paketləri | ehtiyat variant kimi saxlanıldı | bu gün işləyir, lakin nüsxələr tükənir və hər nüsxədə imza təkrarlanır |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk) ECDSA ilə imzalanmış mdoc rəqəmsal sənədləri haqqında müddəaları sübut edir. O, Apache-2.0 lisenziyası ilə açıq mənbə kimi buraxılıb ([elan](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) məqaləsində təsvir olunub və bir neçə müstəqil təhlükəsizlik yoxlamasından keçib. Etibarlı ilkin quraşdırma tələb etmir, yəni kiminsə məhv etdiyinə etibar edilməli olan gizli mərasim yoxdur. Aİ-nin rəqəmsal cüzdanlarda arifmetik sxem sübutları üzrə texniki spesifikasiya layihəsi olan [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) eyni yanaşma əsasında yazılıb və hələ də araşdırma mərhələsindədir; sonrakı işlər ETSI-yə keçir.

## Sxemlər niyə imzalı etibar siyahısında göstərilir?

Sxem sübutun aid olduğu proqramdır. İstənilən sxemi qəbul edən yoxlayan tərəfə onun soruşduğundan fərqli bir şeyin sübutu təqdim oluna bilər. Buna görə Tamga-da yoxlayan tərəf yalnız şəbəkənin nəzərdən keçirdiyi və heş dəyəri (digest) ilə, `ACTIVE` statusunda, etibar siyahılarının imzalı siyahısında dərc etdiyi sxemləri qəbul edir. Naməlum və ya aktiv olmayan sxem rədd edilir (ZK2 qaydası).

8 oktyabr 2026-cı il tarixinə aktual qeyd belədir:

```json title="trust.tamga.network/lotl.json → zk_circuits (live, 8 October 2026)"
{
  "circuit_id": "5a8938159603876eb537a117cfe9e2eaec5a01a042b316a8e57e52e4bb3c9291",
  "system": "longfellow-libzk-v1",
  "version": 8,
  "attributes": 1,
  "sha256": "f44ab1a415f284251ea6ad5451d2588c1e7011eb9ba46091116e8caa4c8e0d83",
  "status": "ACTIVE"
}
```

Sxem faylının özü siyahıların yanında, `trust.tamga.network/zk/<circuit_id>.zst` ünvanında dərc olunub, həcmi təxminən 300 KB-dır və heç bir fərdi məlumat ehtiva etmir. Rəqəmsal cüzdan onu tətbiqin içində təqdim edə və ya yükləyə bilər; hər iki halda istifadədən əvvəl faylı imzalı siyahıdakı `sha256` ilə yoxlayır, buna görə faylın haradan gəldiyi nəyə etibar edildiyini dəyişmir. Dərc olunmuş faylı yuxarıdakı tarixdə siyahı ilə yoxladıq, heş dəyərləri üst-üstə düşür.

![Sabitlənmiş kök barmaq izindən qəbul edilmiş sübuta qədər](/blog/zero-knowledge-in-tamga/en/fig-zincir.png)

Sxemin yenilənməsi siyahının yenilənməsidir. Bunun üçün yeni arxitektura qərarı lazım deyil, lakin siyahıdakı hər hansı digər dəyişiklik kimi o da yeni imzalı siyahı versiyası kimi dərc olunur və açıq dəyişiklik jurnalında qeyd edilir ([İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## Yoxlayan tərəf sübutu necə yoxlayır?

Yoxlayan tərəf paketi Longfellow-un yalnız yoxlama kodunu WebAssembly-yə kompilyasiya edir. Modulun həcmi 889 KB-dır, xarici asılılıqları yoxdur, sabitlənmiş upstream commit-dən qurulur və təkrarlana bilən şəkildə yenidən qurula bilər. WebAssembly-də masaüstü kompüterdə bir yoxlama təxminən 3 saniyə çəkir. Yüksək həcm üçün eyni mənbədən qurulmuş native backend var və o, təxminən 0,2–0,3 saniyə çəkir; Tamga Verify ondan istifadə edir, native proses cavab vermədikdə isə WebAssembly-yə keçir. Hər iki yolda baş verən xəta heç vaxt "etibarlı" sayılmır.

Yoxlama ardıcıllığında bu, `Z1` addımıdır. O, dörd sual verir: sxem imzalı siyahıdadırmı və faylın heş dəyəri uyğun gəlirmi; yalnız sorğu edilən elementlər, bir ad sahəsindən açıqlanıbmı; zaman möhürü öz intervalı daxilindədirmi; sübut etibarlıdırmı. Qurum imzasının, cihaz imzasının və etibarlılıq müddətinin adi yoxlamaları sübutun içində aparılır. `Z1` addımından əvvəl yoxlayan tərəf yenə də cavabı deşifrə edir, docType-ı yoxlayır və qurumu etibar siyahısında tapmaq üçün qurumun sertifikat zəncirini oxuyur ([yoxlama API-si](https://docs.tamga.network/specifications/verification-api)).

## Nəticə nə vaxt INDETERMINATE, nə vaxt REJECTED olur?

Tamga sıfır bilik sübutu üçün də üç dəyərli nəticəni saxlayır: yoxlayan tərəfdə nəyinsə çatışmaması səbəbindən rəqəmsal sənəd heç vaxt saxta adlandırılmır.

![Sıfır bilik təqdimatının nəticələri, hal-hal](/blog/zero-knowledge-in-tamga/en/fig-sonuc.png)

| Hal | Nəticə |
|---|---|
| Sxem imzalı siyahıda yoxdur və ya `ACTIVE` deyil | `REJECTED` |
| Sübut dəyişdirilib, qurum açarı yanlışdır, başqa sessiya və ya başqa yoxlayan tərəf | `REJECTED` |
| Yoxlayan tərəfdə sxem faylı və ya WebAssembly yoxdur | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| Sübut etibarlıdır, siyasətdə `accept_unrevocable_zk: false` var | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| Sübut etibarlıdır, siyasətdə `accept_unrevocable_zk: true` var | `ACCEPTED`, səbəb göstərilməklə `NOT_APPLICABLE` statusu |

İkinci sətirdəki rədd halları ilk masaüstü sınaqda qəsdən yoxlanıldı: dəyişdirilmiş dəyər, yanlış qurum açarı, başqa sessiyanın nonce-u, başqa yoxlayan tərəf, "false" göstərən rəqəmsal sənəddən "true" iddiası, başqa docType və zədələnmiş sübut — hamısı uğursuz oldu.

## Sıfır bilik təqdimatı niyə ləğvi göstərə bilmir?

Ləğvi yoxlamaq üçün yoxlayan tərəfə rəqəmsal sənədin qurumun [status siyahısındakı](/blog/status-list-privacy) mövqeyi lazımdır. Bu mövqe hər rəqəmsal sənəd üçün sabitdir, ona görə onu açıqlamaq iki təqdimatı yenidən əlaqələndirilə bilən edərdi — sübutun qarşısını almalı olduğu məhz budur. Buna görə sxem ləğvi yoxlamır (ZK4 qaydası).

Tamga-nın cavabı iki hissədən ibarətdir. Qərar ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies), Aİ ARF-in qısamüddətli attestasiya yolu) belədir: sıfır bilikli (zero-knowledge) təqdimat şəxsiyyət rəqəmsal sənədinin yalnız qısamüddətli nüsxələrindən istifadə edir; bu nüsxələr ən çoxu 24 saat etibarlıdır və rəqəmsal cüzdan tərəfindən avtomatik yenilənir. Rəqəmsal sənəd ləğv edildikdən sonra yeni nüsxə verilmir, beləliklə, sonuncu nüsxə bir gün ərzində işləməyi dayandırır. **Yeniləmə, 19 oktyabr 2026:** bu artıq tətbiq edilib (paketlər 0.4.0, 9 oktyabr 2026). Sıfır bilikli təqdimatlar ayrıca rəqəmsal sənəd növünün qısamüddətli nüsxələrindən istifadə edir və Tamga Verify-dakı `age-over-18-zk` siyasəti onları əlavə bayraq olmadan qəbul edir. Uzunmüddətli rəqəmsal sənəd üzərində sübut üçün isə siyasətdə ləğv statusu yoxlanıla bilməyən təqdimatın qəbul edilib-edilmədiyi hələ də açıq şəkildə göstərilməlidir; bu sahə buraxılarsa, aşağıdakı əvvəlki nümunədə olduğu kimi `false` sayılır:

```ts title="Policy for an over-18 check with a zero-knowledge proof"
const policy: Policy = {
  policy_id: "age-over-18-zk",
  purpose: { "en-US": "Over-18 check, yes/no only" },
  credentials: [{
    id: "identity",
    vct_values: ["urn:tamga:id:IdentityAttestation:1"],
    format: "mso_mdoc_zk",
    namespace: "tamga.id.1",
    required_claims: ["age_over_18"],
    constraints: { age_over_18: true }, // equality only
    accept_unrevocable_zk: true,        // knowingly accept: revocation cannot be checked
  }],
  trust: { /* … */ },
  freshness: { /* … */ },
};
```

Ləğv statusunun mütləq yoxlanılmalı olduğu sayt bunun əvəzinə klassik `mso_mdoc` siyasətindən istifadə edir. Aİ TS13 üçün ləğv sxemini müəyyənləşdirdikdən sonra məxfiliyi qoruyan ləğv sübutu barədə ayrıca qərar qəbul ediləcək.

## Sayt sübutu necə tələb edir?

Sorğu TS13-də olduğu kimi, formatı `mso_mdoc_zk` olan DCQL sorğusu ilə [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) protokolundan istifadə edir; ikinci ötürmə kanalı brauzerin Digital Credentials API-sidir (rəqəmsal sənədlər üçün brauzer API-si; yoxlayan tərəf tərəfində hazırdır, rəqəmsal cüzdanlar isə hələ ona qoşulmayıb). Sübutun həcmi təxminən 350 KB-dır, ona görə də onu QR kodla ötürmək mümkün deyil. Bluetooth vasitəsilə əyani yoxlamalar üçün qərar cihaz üzərində aparılacaq ölçmələrin nəticələrini gözləyir.

Tamga Verify-da sıfır bilikli və klassik yoxlamalar iki ayrı siyasətdir və hər ikisi `verify.tamga.network/policies` ünvanında sadalanır: `age-over-18-zk` və `age-over-18-mdoc`. Şəxsin rəqəmsal cüzdanı sübut yarada bilmirsə, sayt bu yola icazə verdiyi halda klassik siyasətlə yenidən sorğu göndərə bilər. Bu klassik yol da yalnız `age_over_18` sahəsini açıqlayır; onun əlavə etdiyi yeganə şey qurumun şəxsin nüsxələrindən biri üzərindəki imzasıdır. Bunu sayta necə qoşmaq barədə [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" funksiyasını əlavə edin](/blog/add-verification-to-your-site) məqaləsində oxuya bilərsiniz.

## Rəqəmsal cüzdan tərəfi bu gün hansı vəziyyətdədir?

Sübutun yaradılması açıq şəbəkə paketi olan `@tamga-network/zk` vasitəsilə həyata keçirilir ki, şəbəkədəki hər rəqəmsal cüzdan eyni sübut yaradıcısından (prover) istifadə etsin; bu, hansısa bir cüzdanın funksiyası deyil. Paketin üç giriş nöqtəsi var: DCQL sorğusunu sübut ediləcək iddialara çevirən, sxemi (circuit) etibar siyahısından seçən və onu həş dəyəri (digest) ilə yoxlayan saf TypeScript nüvəsi; React Native üçün cihaz üzərində işləyən prover; testlər və uyğunluq yoxlamaları üçün masaüstü prover.

Rəqəmsal cüzdan əvvəlcə sessiya üçün, həmişəki kimi aparat açarı və telefon kilidi ilə, cihaz tərəfindən imzalanmış adi cavabını hazırlayır. Prover bu cavabı giriş məlumatı kimi qəbul edir və telefondan yalnız sübut çıxır.

| Hissə | 8 oktyabr 2026 tarixinə vəziyyət |
|---|---|
| Yoxlayan tərəf (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | işləyir |
| İmzalanmış etibar siyahısında qəbul edilmiş sxem | işləyir |
| Prover paketi, TypeScript nüvəsi və masaüstü prover | hazırdır |
| Android native kitabxanası (arm64-v8a, armeabi-v7a, x86_64) | yığılıb (build) |
| iOS kitabxanası | gözləmədədir; yığılması üçün macOS lazımdır |
| Cihaz testləri və cihaz üzərində ölçmələr | tətbiq mağazasında buraxılışla birlikdə |

iOS kitabxanası hazır olana qədər paketi ehtiva edən iOS tətbiqi adi qaydada yığılır və prover-in mövcud olmadığını bildirir, rəqəmsal cüzdan isə klassik üsulla təqdimat edir. Şəbəkədəki rəqəmsal cüzdanlardan biri olan Tamga Wallet-a prover artıq qoşulub; onun Android versiyası sübutu yaradır, iPhone-da isə iOS kitabxanası hazır olana qədər yalnız bəli/xeyr sahəsini göndərir (yeniləmə, 19 oktyabr 2026).

Miqyas barədə təsəvvür üçün: masaüstü kompüterdə ilk sınaq zamanı sübutun yaradılması 518 ms, onun native yoxlanılması isə 211 ms çəkdi, sübutun həcmi təxminən 343 KB oldu. Telefon göstəriciləri cihaz testlərindən sonra dərc ediləcək.

## Hələ nəyi edə bilmir?

- **Yalnız bərabərlik.** Bu gün ilk və yeganə predikat budur: `age_over_18 = true`. Növbədə `age_over_21`, vətəndaşlıq, həmçinin təhsil rəqəmsal sənədlərində qeydiyyat və ya məzuniyyət dayanır; bunların hamısı bərabərlik yoxlamalarıdır. Diapazonlar ("müəyyən tarixdən əvvəl doğulub") hələ Longfellow-da yoxdur.
- **Qurum görünən qalır.** Yoxlayan tərəf rəqəmsal sənədi hansı qurumun verdiyini yenə də öyrənir. Adını çəkmədən "hansısa akkreditə olunmuş qurum" olduğunu sübut etmək hələlik əhatə dairəsinə daxil deyil.
- **Ləğv yoxlaması yoxdur**, yuxarıda izah edildiyi kimi; onu ən çoxu 24 saatlıq qısamüddətli nüsxələr əvəz edir (2026-cı ilin oktyabrında tətbiq edilib), məxfiliyi qoruyan ləğv sübutu isə Aİ-nin qərarını gözləyir.
- **Həcm.** Hər sübutun təxminən 350 KB olması QR kodlardan istifadəni istisna edir.
- **iOS** hələ hazır deyil.

## Tez-tez verilən suallar

### Sıfır bilikli sübutlar üçün qurum nəyisə dəyişməlidirmi?

Xeyr. Qurum mdoc rəqəmsal sənədlərini əvvəlki kimi ES256 ilə imzalamağa davam edir. Sıfır bilik yalnız rəqəmsal cüzdanda və yoxlayan tərəfdə tətbiq olunur (ZK1 qaydası).

### Yoxlayan tərəf 18 yaşdan yuxarı olma sübutundan nə öyrənir?

Qeydiyyatdan keçmiş qurumun verdiyi şəxsiyyət rəqəmsal sənədində `age_over_18 = true` göstərildiyini və sübutun məhz bu sessiya üçün yaradıldığını. Başqa heç nə: nə doğum tarixi, nə başqa sahə, nə imza dəyəri, nə də cihaz açarı.

### İki sayt eyni şəxsin hər ikisinə yaşını sübut etdiyini müəyyən edə bilərmi?

Sübutun özündən — xeyr. Hər sübut yenidir və təqdimatlar arasında təkrarlanan heç bir sabit dəyər ehtiva etmir.

### Sıfır bilikli yoxlama artıq işləyirmi?

Yoxlayan tərəf hissəsi Tamga Verify-da `age-over-18-zk` siyasəti ilə işləyir. Rəqəmsal cüzdanlara isə prover lazımdır: Android kitabxanası hazırdır, iOS gözləmədədir.

### Rəqəmsal cüzdanım sübut yarada bilməsə nə baş verir?

Sayt buna icazə verirsə, klassik yoxlama ilə yenidən sorğu göndərir. Bu zaman rəqəmsal cüzdanınız nüsxələrinizdən birindən yalnız `age_over_18` sahəsini açıqlayır.

## Mənbələr

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [ECDSA əsasında anonim rəqəmsal sənədlər (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Yaş təsdiqi üçün sıfır bilikli sübut kitabxanalarının açıq mənbəyə çevrilməsi (elan)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [Aİ texniki spesifikasiyası TS13: arifmetik sxemlərə əsaslanan sıfır bilikli sübutlar (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [Aİ yaş yoxlaması planı](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: sıfır bilikli sübutlar](https://docs.tamga.network/adr/0032-zk-mdoc-presentation) · [Öz serverinizdə yoxlama: sıfır bilikli yaş yoxlaması](https://docs.tamga.network/guides/verify-on-server) · [Yoxlama API-si](https://docs.tamga.network/specifications/verification-api)
- [Tamga ARF: arxitektura (§2.6, §2.8)](https://arf.tamga.network/architecture) · [Sıfır bilikli sübutlar](/learn/zero-knowledge-proofs) · [Əlaqələndirilə bilməmə (unlinkability)](/learn/unlinkability)

---
title: "Tamga-da sıfır bilik sübutu: Longfellow, sxemlər, etibar siyahısı"
slug: zero-knowledge-in-tamga
description: "Tamga Network-un \"18 yaşdan yuxarı\" məlumatını Longfellow sıfır bilik sübutu ilə necə yoxladığını, sxemlərin niyə imzalanmış etibar siyahısında durduğunu və bu gün nəyin işlədiyini izah edirik."
date: 2026-10-08
lang: az
updated: 2026-10-19
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Mənbələr: ADR-0032 1.0.0 (sadə xülasə; kontekst: Longfellow açıq mənbəlidir, Apache-2.0, əsas kimi; Avropa İttifaqı (Aİ) yaş yoxlaması profili və TS13 onun üzərində qurulub, etibarlı ilkin quraşdırma (trusted setup) tələb olunmur, v8 namespace-i deyil, docType-ı bağlayır; 1-ci mərhələ ölçmələri 518 ms / 211 ms / ~343 KB, neqativ testlər; K1 longfellow-libzk-v1 ≥ v8; K2 sxemlər lotl.jws-də digest ilə, yeniləmə = siyahı yeniləməsi + CHANGELOG; K3 ilk predikat age_over_18, növbəti bərabərlik predikatları, diapazonlar və qurumun gizlədilməsi əhatə dairəsindən kənardır; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB QR-da deyil; K5 ehtiyat variant olaraq paket rəqəmsal sənəd nüsxələri; K6 ləğv yoxdur, qısamüddətli, accept_unrevocable_zk; K7 SessionTranscript üzərində cihaz açarı imzası, açıq açar gizlidir; K8/ZK6 unikal atribut adları; 2b mərhələsi Android kitabxanaları 2026-10-07 tarixində qurulub, iOS gözləmədədir; 2c mərhələsi rəqəmsal cüzdana inteqrasiya, telefon kitabxanaları hazır olana qədər sübut yaradılması söndürülüb; 3-cü mərhələ yoxlayan tərəf WASM 889 KB, d5e6be77-yə bərkidilib, masaüstündə ~3 s; native backend 0.2–0.3 s; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README (giriş nöqtələri, sxem faylları ~300 KB, siyahıdakı SHA-256 ilə yoxlanılır, iOS available() false, istənilən rəqəmsal cüzdan). guides/verify-on-server (siyasət nümunəsi, Z1, NOT_APPLICABLE, ehtiyat variant age-over-18-mdoc). SPEC-API-0001 Z1 və INDETERMINATE siyahısı. ARF arxitekturası §2.6, §2.8. Tamga Verify siyasəti accept_unrevocable_zk: true ilə age-over-18-zk olaraq təyin edilib. Canlı yoxlama 2026-10-08: verify.tamga.network/policies age-over-18-zk-ni göstərir; trust.tamga.network/lotl.json zk_circuits qeydi (id 5a8938…3c9291, v8, 1 atribut, ACTIVE, sha256 f44ab1…0d83); zk/<id>.zst 299,999 bayt, SHA-256 uyğundur. Xarici mənbələr: Longfellow ZK GitHub (bir neçə müstəqil təhlükəsizlik auditi), IACR ePrint 2024/2010 "Anonymous credentials from ECDSA", Google-un açıq mənbəyə keçid elanı, Aİ TS13 (araşdırma xarakterli; ETSI TS 119 476-2-yə), Aİ yaş yoxlaması planı (blueprint). -->

Sıfır bilik sübutu (zero-knowledge proof) cüzdana sənəd haqqında hər hansı iddianı, məsələn "bu şəxs 18 yaşdan yuxarıdır" iddiasını sənədin özünü göstərmədən sübut etməyə imkan verir. Tamga Network-da yoxlayan tərəf yalnız qeydiyyatdakı qurumun şəxsiyyət sənədində `age_over_18 = true` yazıldığını öyrənir. Doğum tarixini, digər sahələri, qurumun imzasını və ya cihaz açarını görmür. Eyni şəxsin etdiyi iki təqdimatı da bir-biri ilə əlaqələndirmək olmur. Tamga bunun üçün Longfellow ZK-dan qurumun artıq verdiyi [ISO mdoc](/blog/iso-mdoc-deep-dive) sənədi üzərində istifadə edir, ona görə qurum heç nəyi dəyişməli olmur. Yoxlayan tərəf hissəsi Tamga Verify-da `age-over-18-zk` siyasəti ilə artıq işləyir və qəbul edilmiş sübut sxemləri imzalanmış etibar siyahısında dərc olunur. Cüzdan tərəfində isə Android üçün yerli kitabxana hazırdır, iOS kitabxanası hələ gözlənilir.

## Sübut əslində nəyi sübut edir?

18 yaş məlumatının klassik təqdimatı da doğum tarixini onsuz da gizlədir, çünki cüzdan yalnız `age_over_18` sahəsini açır və başqa heç nə göstərmir. Bu üsulun gizlədə bilmədiyi şey qurumun həmin sahə üzərindəki imzasıdır. Eyni nüsxə hər dəfə göstəriləndə bu imza da eyni qalır. Tamga hər sənədi 10 nüsxə kimi verdiyi üçün fərqli yoxlayan tərəflər fərqli imzalar görür. Bu üsul işə yarayır, amma nüsxələr zamanla tükənir və onları yeniləmək lazım gəlir.

Sıfır bilik sübutu isə imzanı tamamilə görünməz edir. Cüzdan əlindəki sənəd üzərində hesablama aparır və bu hesablamanın düzgün nəticə verdiyini göstərən sübut yaradır. Longfellow sxeminin 8-ci versiyasında sübut aşağıdakı məlumatlara bağlanır:

![Sıfır bilik təqdimatının nəyi göstərdiyi və nəyi gizlətdiyi](/blog/zero-knowledge-in-tamga/en/fig-gosterir.png)

- qurumun açıq açarına; yoxlayan tərəf bu açarı etibar siyahısı ilə uyğunlaşdırır;
- sənəd növünə (mdoc docType);
- sahənin adına və dəyərinə, bu nümunədə `age_over_18` və `true`;
- cihaz açarının bu sessiyanın transkripti üzərində qoyduğu imzaya; beləliklə sübut bu yoxlayan tərəfə və bu sorğuya bağlanır, cihazın açıq açarı isə gizli qalır;
- sənədin sübutun yaradıldığı andakı etibarlılığına.

Sübutun bağlamadığı yeganə şey sənədin içindəki ad sahəsidir (namespace). Sübut "bu qurumun bu növdəki sənədində ad sahələrindən birində `age_over_18 = true` yazılıb" demiş olur. Tamga bu boşluğu kataloq qaydası ilə bağlayır. Bir sənəd növündə sahə adı yalnız bir ad sahəsində ola bilər və sxem kataloqu bunu yığılarkən yoxlayır (ZK6 qaydası).

## Niyə Longfellow ZK?

Bu iş üçün bir neçə fərqli yanaşma var. Tamga üçün həlledici sual qurumların sənəd imzalama üsulunu dəyişməli olub-olmayacağı idi. Qərar qeydi variantları belə qiymətləndirir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)):

| Variant | Nəticə | Səbəb |
|---|---|---|
| Longfellow ZK | qəbul edildi | qurumlar ES256 mdoc imzalarını saxlayır; etibarlı ilkin quraşdırma (trusted setup) tələb olunmur; açıq mənbəlidir; müstəqil şəkildə yoxlanılıb; Aİ-nin yaş yoxlaması işi də bunun üzərində qurulub |
| BBS imzaları | rədd edildi | qurumlar açarlarını və imza formatını dəyişməli olardı; Aİ-nin təsdiqlənmiş siyahısında yoxdur |
| Yalnız nüsxə paketləri | ehtiyat yol kimi saxlanıldı | bu gün işləyir, amma nüsxələr tükənir və hər nüsxədə imza təkrarlanır |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk) ECDSA ilə imzalanmış mdoc sənədləri haqqında iddiaları sübut etməyə imkan verir. O, Apache-2.0 lisenziyası ilə açıq mənbə kimi dərc olunub ([elan](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) məqaləsində təsvir edilib və bir neçə müstəqil təhlükəsizlik yoxlamasından keçib. Etibarlı ilkin quraşdırma tələb etmədiyi üçün kiminsə gizli dəyəri məhv etdiyinə etibar etməyinizi tələb edən mərasim də yoxdur. Aİ-nin cüzdanlarda arifmetik sxemlərə əsaslanan sübutlar üçün hazırladığı texniki spesifikasiya layihəsi [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) də eyni yanaşma üzərində qurulub. Bu spesifikasiya hələ araşdırma mərhələsindədir və onun üzərində iş ETSI-də davam edəcək.

## Sxemlər niyə imzalanmış etibar siyahısında durur?

Sxem sübutun üzərində qurulduğu proqramdır. Hər sxemi qəbul edən yoxlayan tərəfə istədiyindən başqa şeyin sübutu göstərilə bilərdi. Ona görə Tamga yoxlayan tərəfi yalnız şəbəkənin yoxladığı və imzalanmış siyahılar siyahısında heşi ilə və `ACTIVE` statusu ilə dərc etdiyi sxemləri qəbul edir. Naməlum və ya aktiv olmayan sxem rədd edilir (ZK2 qaydası).

8 oktyabr 2026-cı il tarixinə canlı qeyd belədir:

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

Sxem faylı siyahılarla birlikdə `trust.tamga.network/zk/<circuit_id>.zst` ünvanında dərc olunur. Fayl təxminən 300 KB tutur və fərdi məlumat ehtiva etmir. Cüzdan faylı tətbiqin içində gətirə və ya endirə bilər. Hər iki halda faylı istifadə etməzdən əvvəl imzalanmış siyahıdakı `sha256` dəyəri ilə müqayisə edir. Beləliklə faylın haradan gəldiyi nəyə etibar edildiyini dəyişmir. Yuxarıdakı tarixdə dərc olunmuş faylı siyahı ilə müqayisə etdik və heşlər uyğun gəlir.

![Sabitlənmiş kök barmaq izindən qəbul edilmiş sübuta qədər](/blog/zero-knowledge-in-tamga/en/fig-zincir.png)

Sxemin yenilənməsi siyahının yenilənməsi deməkdir. Bunun üçün yeni arxitektura qərarı lazım deyil, amma siyahıdakı hər dəyişiklikdə olduğu kimi yeni imzalanmış siyahı versiyası dərc olunur və dəyişiklik açıq dəyişiklik qeydinə yazılır ([İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## Yoxlayan tərəf sübutu necə yoxlayır?

Yoxlayan tərəf paketi Longfellow-un yalnız yoxlama kodunu WebAssembly-yə yığır. Modul 889 KB tutur, xarici asılılığı yoxdur, sabitlənmiş mənbə versiyasından yaradılır və eyni nəticəni verəcək şəkildə yenidən yığıla bilir. WebAssembly ilə bir yoxlama masaüstü kompüterdə təxminən 3 saniyə çəkir. Yüksək həcm üçün eyni mənbədən yığılmış yerli backend də var və yoxlamanı təxminən 0,2–0,3 saniyəyə aparır. Tamga Verify bu backend-dən istifadə edir və yerli proses cavab verməsə, WebAssembly-yə keçir. Hər iki yolda xəta heç vaxt "etibarlı" nəticəsi kimi sayılmır.

Yoxlama ardıcıllığında bu addımın adı `Z1`-dir və addım dörd suala cavab axtarır. Sxem imzalanmış siyahıdadırmı və faylın heşi uyğun gəlirmi? Yalnız istənilən elementlər və bir ad sahəsindən açılıbmı? Vaxt möhürü icazə verilən aralığın içindədirmi? Sübut etibarlıdırmı? Qurum imzası, cihaz imzası və etibarlılıq müddəti yoxlamaları isə sübutun içində aparılır. `Z1` addımından əvvəl yoxlayan tərəf yenə də cavabı açır, docType dəyərini yoxlayır və qurumu etibar siyahısında tapmaq üçün qurumun sertifikat zəncirini oxuyur ([yoxlama API-si](https://docs.tamga.network/specifications/verification-api)).

## Nəticə nə vaxt INDETERMINATE, nə vaxt REJECTED olur?

Tamga sıfır bilik sübutlarında da üç dəyərli nəticəni saxlayır. Yoxlayan tərəfdə nəsə çatışmır deyə heç bir sənəd saxta elan edilmir.

![Sıfır bilik təqdimatının nəticələri, hal-hal](/blog/zero-knowledge-in-tamga/en/fig-sonuc.png)

| Hal | Nəticə |
|---|---|
| Sxem imzalanmış siyahıda yoxdur və ya `ACTIVE` statusunda deyil | `REJECTED` |
| Sübut dəyişdirilib, qurum açarı yanlışdır, başqa sessiyaya və ya başqa yoxlayan tərəfə aiddir | `REJECTED` |
| Yoxlayan tərəfdə sxem faylı və ya WebAssembly yoxdur | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| Sübut etibarlıdır, siyasətdə `accept_unrevocable_zk: false` var | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| Sübut etibarlıdır, siyasətdə `accept_unrevocable_zk: true` var | `ACCEPTED`, səbəb göstərilməklə `NOT_APPLICABLE` statusu |

İkinci sətirdəki rədd halları ilk masaüstü sınağında bilərəkdən yoxlanıldı. Dəyişdirilmiş dəyər, yanlış qurum açarı, başqa sessiyanın nonce-u, başqa yoxlayan tərəf, "false" yazılmış sənəddən edilən "true" iddiası, başqa docType və pozulmuş sübut sınandı və hamısı yoxlamadan keçə bilmədi.

## Sıfır bilik təqdimatı ləğv vəziyyətini niyə göstərə bilmir?

Ləğv vəziyyətini yoxlamaq üçün yoxlayan tərəf sənədin qurumun [status siyahısındakı](/blog/status-list-privacy) mövqeyini bilməlidir. Bu mövqe hər sənəd üçün sabit olduğundan, onu açmaq iki təqdimatı yenidən bir-biri ilə əlaqələndirilə bilən edərdi. Sübutun qarşısını almaq istədiyi də məhz budur. Ona görə sxem ləğv vəziyyətini yoxlamır (ZK4 qaydası).

Tamga-nın bu problemə cavabı iki hissədən ibarətdir. Qərar Aİ ARF-nin qısaömürlü attestasiya yolunu izləyir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Sıfır bilik sübutu ilə edilən təqdimatlar yalnız şəxsiyyət sənədinin qısaömürlü nüsxələri ilə aparılır. Bu nüsxələr ən çoxu 24 saat etibarlıdır və cüzdan onları özü yeniləyir. Sənəd ləğv ediləndə yeni nüsxə verilmir, ona görə sonuncu nüsxə də ən geci bir gün ərzində istifadəyə yararsız olur. **Yeniləmə, 19 oktyabr 2026:** Bu üsul artıq tətbiq olunur (paketlər 0.4.0, 9 oktyabr 2026). Sıfır bilik sübutu ilə edilən təqdimatlar ayrıca növdəki qısaömürlü nüsxələrlə aparılır və Tamga Verify-ın `age-over-18-zk` siyasəti bu nüsxələri əlavə ayar olmadan qəbul edir. Uzunömürlü sənəd üzərindəki sübutlarda isə siyasət ləğv vəziyyəti yoxlana bilməyən təqdimatı qəbul edib-etmədiyini yenə də açıq göstərməlidir. Bu sahə yazılmasa, onun dəyəri `false` sayılır. Aşağıdakı köhnə nümunədə də vəziyyət belədir:

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

Ləğv vəziyyəti mütləq yoxlanılmalı olan sayt bunun əvəzinə klassik `mso_mdoc` siyasətindən istifadə edir. Ləğvi məxfiliyi pozmadan sübut edəcək sübut üçün isə Aİ TS13-dəki ləğv sxemini dəqiqləşdirəndə ayrıca qərar qəbul ediləcək.

## Sayt sübutu necə istəyir?

Sorğu [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) vasitəsilə, TS13-dəki kimi formatı `mso_mdoc_zk` olan DCQL sorğusu ilə aparılır. İkinci daşıma yolu brauzerin Digital Credentials API-sidir. Yoxlayan tərəf hissəsi bu yola da hazırdır, amma cüzdanlar hələ ona qoşulmayıb. Sübut təxminən 350 KB tutduğu üçün QR koda sığmır. Bluetooth ilə aparılacaq əyani yoxlamalar üçün isə qərar cihazlar üzərində aparılacaq ölçmələri gözləyir.

Tamga Verify-da sıfır bilik yoxlaması ilə klassik yoxlama iki ayrı siyasət kimi müəyyən edilib və hər ikisi `verify.tamga.network/policies` ünvanında sadalanır. Bunlar `age-over-18-zk` və `age-over-18-mdoc` siyasətləridir. Şəxsin cüzdanı sübut yarada bilməsə, sayt bu yola icazə verirsə, eyni sualı klassik siyasətlə yenidən verə bilər. Klassik yol da yalnız `age_over_18` sahəsini açır. Əlavə olaraq göstərdiyi yeganə şey şəxsin nüsxələrindən birindəki qurum imzasıdır. Bunu sayta necə qoşacağınızı [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) yazısında izah etmişik.

## Cüzdan tərəfi bu gün hansı vəziyyətdədir?

Sübutun yaradılması şəbəkənin açıq mənbəli paketlərindən biri olan `@tamga-network/zk` daxilində yerləşir. Bunun sayəsində şəbəkədəki hər cüzdan eyni prover-dən istifadə edir və sübutun yaradılması bir cüzdanın xüsusiyyəti olmur. Paketin üç giriş nöqtəsi var. Təmiz TypeScript ilə yazılmış nüvə DCQL sorğusunu sübut ediləcək sahələrə çevirir, etibar siyahısından sxemi seçir və sxemi heşi ilə yoxlayır. React Native üçün cihaz üzərində işləyən prover və testlər ilə uyğunluq yoxlamaları üçün masaüstü prover də var.

Cüzdan əvvəlcə sessiya üçün həmişəki cihaz imzalı cavabını yaradır. Bunun üçün aparat açarı və telefon kilidi həmişəki kimi istifadə olunur. Prover bu cavabı giriş kimi alır və telefondan kənara yalnız sübut çıxır.

| Hissə | 8 oktyabr 2026 tarixinə vəziyyəti |
|---|---|
| Yoxlayan tərəf (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | işləyir |
| İmzalanmış etibar siyahısında qəbul edilmiş sxem | işləyir |
| Prover paketi, TypeScript nüvəsi və masaüstü prover | hazırdır |
| Android yerli kitabxanası (arm64-v8a, armeabi-v7a, x86_64) | yığılıb |
| iOS kitabxanası | gözlənilir; yığmaq üçün macOS lazımdır |
| Cihaz testləri və cihaz üzərində ölçmələr | tətbiq mağazası buraxılışı ilə birlikdə |

iOS kitabxanası çıxana qədər bu paketi ehtiva edən iOS tətbiqi normal yığılır, prover-in olmadığını bildirir və cüzdan sənədi klassik yolla göstərir. Şəbəkədəki cüzdanlardan biri olan Tamga Wallet-ə prover əlavə edilib. Tətbiqin Android versiyası sübutu yaradır, iPhone-da isə iOS kitabxanası çıxana qədər yalnız bəli/xeyr sahəsi göndərilir (yeniləmə, 19 oktyabr 2026).

Təsəvvür yaratmaq üçün qeyd edək ki, masaüstü kompüterdə aparılan ilk sınaqda sübutun yaradılması 518 ms, yerli yoxlanılması isə 211 ms çəkdi. Sübutun ölçüsü təxminən 343 KB idi. Telefonlardakı göstəricilər cihaz testlərindən sonra dərc olunacaq.

## Hələ nəyi edə bilmir?

- **Yalnız bərabərlik yoxlanılır.** Bugünkü predikatlar `age_over_18 = true` və `age_over_15 = true`-dur və hər ikisi eyni sxemlə sübut edilir ([ADR-0064](https://docs.tamga.network/adr/0064-age-over-15-threshold)). Növbədə `age_over_21`, vətəndaşlıq və təhsil sənədlərində qeydiyyat və ya məzuniyyət məlumatı var və bunların hamısı da bərabərlik yoxlamasıdır. "Bu tarixdən əvvəl doğulub" kimi aralıq yoxlamaları isə Longfellow-da hələ yoxdur.
- **Qurum görünən qalır.** Yoxlayan tərəf sənədi hansı qurumun verdiyini yenə də öyrənir. Qurumun adını demədən "akkreditasiyalı qurum" demək hələlik əhatə dairəsindən kənardadır.
- **Ləğv yoxlaması yoxdur.** Yuxarıda izah etdiyimiz kimi, bunun əvəzinə ən çoxu 24 saat etibarlı qısaömürlü nüsxələrdən istifadə olunur (2026-cı ilin oktyabrında tətbiq edildi). Ləğvi məxfiliyi pozmadan sübut edəcək sübut isə Aİ-nin qərarını gözləyir.
- **Ölçü.** Hər sübut üçün təxminən 350 KB QR koddan istifadəni istisna edir.
- **iOS** hələ hazır deyil.

## Tez-tez verilən suallar

### Sıfır bilik sübutu üçün qurum nəyisə dəyişməlidirmi?

Xeyr. Qurum mdoc sənədlərini əvvəlki kimi ES256 ilə imzalamağa davam edir. Sıfır bilik sübutu yalnız cüzdanda və yoxlayan tərəfdə işə düşür (ZK1 qaydası).

### Yoxlayan tərəf 18 yaş sübutundan nə öyrənir?

Qeydiyyatdakı qurumun şəxsiyyət sənədində `age_over_18 = true` yazıldığını və sübutun bu sessiya üçün yaradıldığını öyrənir. Bundan başqa heç nə öyrənmir. Doğum tarixini, başqa sahəni, imza dəyərini və ya cihaz açarını görmür.

### İki sayt eyni şəxsin hər ikisinə yaşını sübut etdiyini anlaya bilərmi?

Sübuta baxaraq anlaya bilməz. Hər sübut yenidən yaradılır və təqdimatlar arasında təkrarlanan sabit dəyər ehtiva etmir.

### Sıfır bilik yoxlaması artıq işləyirmi?

Yoxlayan tərəf hissəsi Tamga Verify-da `age-over-18-zk` siyasəti ilə işləyir. Cüzdanların isə prover-ə ehtiyacı var. Android kitabxanası hazırdır, iOS kitabxanası gözlənilir.

### Cüzdanım sübut yarada bilməsə, nə baş verir?

Sayt icazə verirsə, eyni sualı klassik yoxlama ilə yenidən verir. Bu halda cüzdanınız nüsxələrinizdən birindən yalnız `age_over_18` sahəsini açır.

## Mənbələr

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [ECDSA əsasında anonim rəqəmsal sənədlər (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Yaş təsdiqi üçün sıfır bilikli sübut kitabxanalarının açıq mənbəyə çevrilməsi (elan)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [Aİ texniki spesifikasiyası TS13: arifmetik sxemlərə əsaslanan sıfır bilikli sübutlar (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [Aİ yaş yoxlaması planı](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: sıfır bilikli sübutlar](https://docs.tamga.network/adr/0032-zk-mdoc-presentation) · [Öz serverinizdə yoxlama: sıfır bilikli yaş yoxlaması](https://docs.tamga.network/guides/verify-on-server) · [Yoxlama API-si](https://docs.tamga.network/specifications/verification-api)
- [Tamga ARF: arxitektura (§2.6, §2.8)](https://arf.tamga.network/architecture) · [Sıfır bilikli sübutlar](/learn/zero-knowledge-proofs) · [Əlaqələndirilə bilməmə (unlinkability)](/learn/unlinkability)

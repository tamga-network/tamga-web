---
title: "OpenID uyğunluq testlərindən keçərkən öyrəndiklərimiz və açıq mənbəli etdiyimiz dəst"
slug: openid-conformance-self-test
description: OpenID Foundation-ın issuer və verifier test planlarını (OpenID4VCI, OpenID4VP, HAIP, FAPI 2.0) sandbox-da işlətdik, iyirmiyə yaxın tapıntını düzəltdik və dəsti dərc etdik.
date: 2026-10-27
lang: az
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, trusting-a-wallet, page:/sdk
---

<!-- Sources: same as the English article (OpenID self-test results ledger and module notes; issuer plan 63 modules, final run 2026-10-23: 0 FAILED, 2 WARNING, 4 REVIEW, 4 SKIPPED; round 2 29/22/5; verifier plan 14 modules, round 1: 0 FAILED, 6 REVIEW, 7 WARNING, 1 SKIPPED; round 2 logs: 7 PASSED, 6 REVIEW, 1 SKIPPED; tamga-network CHANGELOG 0.7.2 and 0.7.3; ADR-0059…0062; kit README, CONTRIBUTING, common-failures). -->

21–27 oktyabr 2026-cı il tarixləri arasında OpenID Foundation-ın iki uyğunluq test planını Tamga-nın sandbox mühitində işlətdik: şəxsiyyət xidmətinə qarşı **issuer** planı (HAIP və FAPI 2.0 Security Profile ilə OpenID4VCI 1.0 Final, 63 modul) və Tamga Verify-a qarşı **verifier** planı (HAIP ilə OpenID4VP 1.0 Final, 14 modul). Issuer planının son təkrarında uğursuz modul qalmadı, verifier planının son turunda isə nə uğursuz modul, nə də xəbərdarlıq var. Buna çatmaq iyirmiyə yaxın kod dəyişikliyi tələb etdi və hər biri spesifikasiyanın bir bəndinə əsaslanır. Bizdən sonra eyni testlərdən keçəcək komandalar daha az əziyyət çəksin deyə öyrəndiklərimizi [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) adlı açıq mənbəli dəstdə (Apache-2.0) topladıq.

> **Vacib:** Bu, OpenID Foundation-ın öz test aləti ilə etdiyimiz özünütestdir. OpenID sertifikatı deyil; test planlarını alətdə dərc etmədik (səbəbi aşağıdadır).

## AB ilə uyğun şəbəkə üçün uyğunluq testi niyə vacibdir?

İki məhsul OpenID4VP-yə hərfi-hərfinə əməl edib yenə də bir-biri ilə anlaşa bilməyə bilər, çünki spesifikasiya bir çox məqamda bir neçə seçimə yol verir. Yüksək təminatlı qarşılıqlı işləmə profili [HAIP](/blog/haip-and-token-status-list) vahid seçimlər toplusunu sabitləyərək bu boşluqların çoxunu bağlayır; Avropanın rəqəmsal şəxsiyyət ekosistemi də ona söykənir. Tamga özünü AB ilə uyğun adlandırır. Bu iddianı yalnız öz testlərimizlə yoxlasaq, öz ev tapşırığımıza özümüz qiymət vermiş olarıq.

Öz testlərimiz və uyğunluq vektorlarımız kodu spesifikasiyaları bizim oxuduğumuz kimi yoxlayır. OpenID Foundation-ın [conformance suite](https://gitlab.com/openid/conformance-suite) aləti isə başqasının oxunuşu ilə yoxlayır: Fondun hazırladığı, protokolun o biri tərəfini oynayan və diqqətsiz bir tətbiqin səhv edəcəyi yüzlərlə şeyi sınayan açıq mənbəli alət. Fondun [sertifikasiya proqramının](https://openid.net/certification/) arxasında da bu alət dayanır. Alət bizimlə razılaşmırsa, ikimizdən biri səhvdir; hansımız olduğunu tapmaq işin faydalı hissəsidir.

## Nəyi, nəyə qarşı sınadıq?

| | Issuer planı | Verifier planı |
|---|---|---|
| Plan | `oid4vci-1_0-issuer-haip-test-plan` | `oid4vp-1final-verifier-haip-test-plan` |
| Spesifikasiyalar | OpenID4VCI 1.0 Final, HAIP 1.0, FAPI 2.0 Security Profile | OpenID4VP 1.0 Final, HAIP 1.0 |
| Bizim xidmət | şəxsiyyət xidməti, `id.sandbox.tamga.network` | Tamga Verify, `verify.sandbox.tamga.network` |
| Variant | SD-JWT VC, cüzdanın başlatdığı avtorizasiya kodu axını, müştəri attestasiyası, DPoP | SD-JWT VC, `direct_post.jwt`, `x509_hash`, imzalı `request_uri` |
| Alətin rolu | cüzdan; öz cüzdan attestasiyası və açar attestasiyası ilə | cüzdan; öz test açarı ilə imzalanmış saxta AB PID-i (`urn:eudi:pid:1`) təqdim edir |
| Modul | 63: 23 OpenID4VCI və 40 FAPI 2.0 | 14 |

![İki plan: alət hər ikisində cüzdanı oynayır](/blog/openid-conformance-self-test/en/fig-plans.png)

Alətin `demo.certification.openid.net` ünvanındakı host edilən versiyasından istifadə etdik. Alətin imza sertifikatlarını yalnız sandbox etibar siyahısına əlavə etdik. Cüzdan attestasiyasının imzalayıcısı orada test cüzdan provayderi kimi, PID imzalayıcısı isə ayrıca test siyahısında yer alır. Real şəbəkənin siyahıları dəyişmədi.

İki praktik seçim planları formalaşdırdı. Issuer planı qurumun issuer xidmətinə deyil, şəxsiyyət xidmətinə qarşı işlədildi, çünki qurumun avtorizasiya addımı şəxsdən əvvəlcə şəxsiyyət sənədini təqdim etməyi istəyir və alət bunu edə bilmir. Bundan başqa, alətin öz attestasiyalarında siyasətimizin tələb etdiyi iki sahə yoxdur: cüzdan attestasiyasında ləğv qeydi və açar attestasiyasında açarın saxlanma statusu. Ona görə sandbox bu sahələri ixtiyari sayır, real şəbəkədə isə hər ikisi məcburi olaraq qalır.

## Nəticələr necə oldu?

Issuer planı 21–23 oktyabr tarixlərində üç tur və bir təkrarla başa çatdı. Birinci turda 63 modulun 42-si işlədi və səhvlərin çoxu bu turda üzə çıxdı. İkinci turda 63 modulun hamısı işlədi: 29-u keçdi, 22-si xəbərdarlıq verdi, 5-i uğursuz oldu. Üçüncü tur və son təkrar qalan problemləri bağladı.

| Plan | Tur | Keçdi | Xəbərdarlıq | Uğursuz | Baxış | Buraxıldı |
|---|---|---|---|---|---|---|
| Issuer (63) | son təkrar, 23 oktyabr | 53 | 2 | 0 | 4 | 4 |
| Verifier (14) | 1-ci tur, 27 oktyabr | 0 | 7 | 0 | 6 | 1 |
| Verifier (14) | 2-ci tur, 27 oktyabr | 7 | 0 | 0 | 6 | 1 |

Verifier-in birinci turunda "xəbərdarlıq" alan yeddi modul əslində əsas yoxlamadan keçmişdi, çünki Tamga pozulmuş təqdimatı rədd etmişdi. Yeddisində də eyni xəbərdarlıq var idi və onu həmin gün düzəltdik.

"Keçdi" olmayan hər sətrin səbəbi var:

- **İki xəbərdarlıq (issuer metaməlumatı, adi və imzalı).** Metaməlumatımızda ETSI TS 119 472-3-ün müəyyən etdiyi və AB ARF-nin istifadə etdiyi paket verilməsi və təkrar istifadə siyasəti `credential_reuse_policy` var. Alətin sxemi `credential_metadata` daxilində əlavə sahələrə icazə vermir. Ona görə bir qanuni genişlənmə sxemin bütöv bir qolunu keçərsiz edir və alət sonra standart sahələri (`scope`, `proof_types_supported` və s.) naməlum kimi bildirir. İcazə siyahısı genişlənmənin adını susdura bilir, bu zənciri isə yox. Sahə AB standartıdır, ona görə qalır. Problemi təkrarlama addımları və iki mümkün həll ilə birlikdə alətin komandasına bildirdik.
- **Baxış.** Bəzi mənfi testlər "ekran görüntüsü yükləyin" ilə bitir, çünki alət serverimizin şəxsə göstərdiyi xəta səhifəsini görə bilmir və bu səhifəni insan təsdiqləməlidir. Verifier planında Tamga Verify-ın təqdimatı qəbul etdiyi və ya nəticə səhifəsində rədd etdiyi (yanlış sənəd növü, ləğv edilmiş sənəd) hər hal eyni səbəbdən baxışla bitir. Doğrulayıcının cavabı birbaşa HTTP 400 ilə rədd etdiyi hallar öz-özünə keçir.
- **Buraxıldı.** Üç issuer modulu şifrələnmiş sənəd cavabını sınayır. HAIP bunu ixtiyari saxlayır və metaməlumatımız bu seçimi təklif etmir. Biri yeniləmə tokenini sınayır; şəxsiyyət xidmətimiz yeniləmə tokenini yalnız qısa ömürlü sıfır bilik nüsxələri üçün verir ([ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)). Alətin sorğusu həmin scope-u istəmədiyi üçün token verilmir və modul buraxılır. Verifier planında `request_uri_method=post` seçimini təklif etmədiyimiz üçün həmin modul buraxılır.

## Testlər nə tapdı, biz nəyi dəyişdik?

Aşağıda iyirmiyə yaxın dəyişikliyi mövzulara görə qruplaşdırdıq. Hər biri onu tələb edən bəndi göstərir, mötərizədəki şərt adları alətin loglarında görünən adlardır.

![Mövzulara görə düzəltdiklərimiz](/blog/openid-conformance-self-test/en/fig-fixes.png)

### Metaməlumat və görünüş

- **Müştəri attestasiyası alqoritmləri.** Avtorizasiya serverinin metaməlumatı `attest_jwt_client_auth` təklif edirdi, lakin `client_attestation_signing_alg_values_supported` və `client_attestation_pop_signing_alg_values_supported` siyahılarını vermirdi (attestation-based client authentication §10.1). İndi hər ikisi `["ES256"]`.
- **Final versiyanın formaları.** Hər sənəd konfiqurasiyasında hələ də yuxarı səviyyədə `display` var idi və görünüş obyektləri `lang` istifadə edirdi. OpenID4VCI 1.0 Final (§12.2.4) görünüşü `credential_metadata.display` altına qoyur və sahəni `locale` adlandırır. Bunu yalnız issuer metaməlumatında düzəltdik; SD-JWT VC növ metaməlumatı `lang`-ı saxlayır, çünki öz spesifikasiyasının sözü odur.
- **Dil teqləri.** Yeni bir yoxlama dil teqlərini təsdiqləyir. Bizimkilər düzgün idi, amma reyestrdəki `EN-us` kimi dəyəri və ya təkrarlanan dili dayandıran heç nə yox idi. Görünüş dəyərləri indi kanonik BCP 47 teqləridir, hər dil üçün bir qeyd (paketlər 0.7.3).

### Nüsxələri əlaqələndirə bilən vaxt sahələri

- **Yuvarlaqlaşdırılmış `iat` və `exp`.** Sənədlər verilmə anını saniyəsinə qədər daşıyırdı; paketin on nüsxəsi və ya bir şəxsə verilən iki sənəd vaxt üzərindən əlaqələndirilə bilirdi (RFC 9901 §10.1). Verilmə və bitmə vaxtları indi saata qədər aşağı yuvarlaqlaşdırılır, mdoc etibarlılıq sahələri də onlarla birlikdə.
- İki yeni paket yoxlaması, ortaq siyahıda fərqli və proqnozlaşdırıla bilməyən status indeksləri, artıq keçirdi; onlar üçün reqressiya testləri əlavə etdik.

### DPoP, PAR və avtorizasiya serveri

DPoP giriş tokenini müştərinin əlindəki açara bağlayan üsuldur. PAR (pushed authorization request) isə avtorizasiya sorğusunun parametrlərini brauzerdən keçmədən birbaşa serverə göndərir.

- **PAR-da DPoP.** Pushed authorization request DPoP sübutunu `dpop_jkt` ilə müqayisə etmədən qəbul edirdi, token endpoint-i isə PAR-dakından fərqli DPoP açarını qəbul edirdi (RFC 9449 §10). Sübut indi PAR-da yoxlanılır, kod həmin açara bağlanır, token endpoint-ində fərqli açar `invalid_grant` alır.
- **`htu` normallaşdırması.** `htu`-da host adı böyük hərflə və ya açıq `:443` ilə gələn DPoP sübutu rədd edilirdi; RFC 9449 §4.3 əvvəlcə RFC 3986 normallaşdırmasını istəyir. Sxem və host indi hərf registrindən asılı olmadan müqayisə edilir, standart port atılır.
- **Testdən əvvəl bağladıqlarımız.** Birinci turdan əvvəl hələ işlədilməmiş FAPI 2.0 modullarını oxuduq və tapacaqlarını əvvəlcədən bağladıq: PAR POST olmayan metodlara 405 qaytarır (RFC 9126 §2.3); təkrarlanan parametrlər və PAR daxilində `request_uri` `invalid_request` alır; yalnız `response_type=code` qəbul edilir; `plain` PKCE rədd edilir; attestasiya edilmiş müştəridən fərqli `client_id` `invalid_client` alır; kod verildikdən sonra `request_uri` təkrar istifadə edilə bilməz (RFC 9126 §4). Bu modulların hamısı ilk dəfədə keçdi.

### TLS

- **Şifrə dəstləri.** TLS 1.2 hələ də CBC/SHA-1 dəstini qəbul edirdi. FAPI 2.0 (§5.2.2, BCP 195 ilə) yalnız tövsiyə olunan dəstlərə icazə verir; server indi yalnız ECDHE ilə AES-GCM təklif edir.

### Tokenlər

- **Access token-in təkrar istifadəsi.** Access token-lərimiz birdəfəlik idi. FAPI testlərinin adi ssenarisi isə eyni tokenlə bir neçə sənəd sorğusu göndərir və buna görə uğursuz oldu. Spesifikasiyalar təkrar istifadəyə icazə verdiyi üçün qaydanı [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests) ilə dəyişdik. Token indi öz ömrü (ən çox beş dəqiqə) ərzində bir neçə sorğuda istifadə oluna bilər, amma yalnız əhatə etdiyi konfiqurasiyalar üçün, cəmi ən çox on nüsxə və hər dəfə eyni DPoP açarı ilə.
- **Kodun təkrar istifadəsi.** Avtorizasiya kodu ikinci dəfə istifadə edildikdə, ilk istifadədən verilən tokenlər artıq işləmir (RFC 6749 §4.1.2, RFC 9700 §4.5).
- **Yeniləmə tokeninin bağlanması.** Yeniləmə tokenlərini DPoP açarına bağlayırdıq; alət yeni DPoP açarı və eyni müştəri ilə yeniləyir. RFC 9449 §5 və attestation-based client authentication §10.3 yeniləmə tokenini müştəri nümunəsinə bağlayır. [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding) onu cüzdan attestasiyasındakı nümunə açarına bağlayır, beləliklə DPoP açarı dəyişsə də token işləməyə davam edir.
- **İlk sənəddən əvvəl yeniləmə.** Alət token cavabından dərhal sonra, sənəd istəmədən yeniləyir; yeniləmə tokeninin göstərdiyi qeyd hələ yaranmadığı üçün bunu rədd edirdik. RFC 6749 §6 yeniləmə tokeninin verildiyi andan istifadə edilməsinə icazə verir; indi istifadə edilə bilir.

### Xəta kodları və başlıqlar

- Naməlum `credential_identifier` ümumi `invalid_credential_request` əvəzinə `unknown_credential_identifier` qaytarır (OpenID4VCI §8.3.1.2).
- `code_verifier`-siz token sorğusu `invalid_grant` qaytarır və kod yanır (RFC 7636 §4.6).
- Token endpoint-inin xətalar daxil hər cavabında `Cache-Control: no-store` var (RFC 6749 §5.1).
- Sənəd endpoint-indən gələn 401 xətanı və qəbul edilən alqoritmi bildirən `WWW-Authenticate: DPoP` başlığı daşıyır (RFC 9449 §7.1). Bu bənd issuer turlarından sonra apardığımız protokol baxışından gəldi.
- Başqa müştərinin `request_uri`-sini açan şəxs xam JSON əvəzinə HTML xəta səhifəsi görür.

### Sənəd cavabının forması

- Sənəd cavabımız hər sayt üçün ayrıca təxəllüs yaratmaqda istifadə olunan toxumu əlavə sahə kimi daşıyırdı. Alət sənəd cavablarındakı naməlum sahələri qeyd edir. Spesifikasiyada genişlənməni qadağan edən heç nə olmadığı üçün bu, yozuma açıq məsələ idi, amma daha təmiz, standart yol var idi. [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration) toxumu ayrıca sənəd konfiqurasiyası edir; ikinci standart sənəd sorğusu ilə alınır. Toxumla bağlı məxfilik qaydaları dəyişmədi.

### Doğrulayıcı

- **Sorğudakı `purpose`.** İmzalı sorğu obyekti OpenID4VP 1.0-ın (§5.1) müəyyən etmədiyi `purpose` parametrini daşıyırdı (`CheckForUnexpectedParametersInVpAuthorizationRequest`). Bu parametri çıxardıq. Cüzdanın göstərdiyi məqsəd onsuz da `verifier_info` daxilindəki qeydiyyat sertifikatından (ETSI TS 119 475) və etibar siyahısındakı qeydə alınmış istifadədən gəlirdi.
- **`direct_post` cavabı.** Qəbul edilmiş təqdimatdan sonra cavab endpoint-i `redirect_uri` ilə yanaşı `show_url` da qaytarırdı (`ValidateDirectPostResponse`, OpenID4VP §8.2). İndi yalnız `redirect_uri` qaytarır; üzbəüz yoxlama görünüşünün açarı bu ünvanın içindədir.
- **Doğrulama zamanı çəkilən status siyahıları.** Tamga doğrulayıcıları status siyahılarını əvvəlcədən yükləyir və keşdən yoxlayır; beləliklə qurum sənədin nə vaxt yoxlandığını öyrənmir. Alət hər testdə yeni siyahı ünvanı verir və doğrulayıcının onu çəkdiyini yoxlayır. Buna görə doğrulama zamanı çatışmayan siyahını çəkməyə imkan verən seçim əlavə etdik. Seçim defolt olaraq söndürülüb və yalnız açıq şəkildə yandırılanda işləyir; siyahı da yalnız qurumun bildirdiyi status hostundan, eyni şəbəkə yoxlamalarından keçərək çəkilir. Bu seçim yalnız sandbox-un özünütest siyasətində yanılıdır. Eyni iş real bir boşluğu da bağladı, çünki xarici qurumun status siyahısının ünvanı artıq ilk görüldüyü anda öyrənilir və bu, real AB PID-lərinin yoxlanmasına da kömək edir.
- **Sorğu obyektinin sahələri.** Sorğu obyektinin gövdəsi indi başlıqla yanaşı `aud` və `iat` da daşıyır.
- HAIP altında yeni yoxlama cavab şifrələmə açarını təkrar istifadə edən doğrulayıcını yıxır. Bizimki onsuz da hər sorğuda yeni açar yaradır, yenə də bunun üçün reqressiya testləri əlavə etdik.

### Koddan kənarda: konfiqurasiya və test addımları

Bəzi tapıntılar bizim idi, amma kodda deyildi. Yerləşdirmə zamanı yenidən başlayan xidmət üç modula 502 qaytardı, ona görə testlər gedərkən yerləşdirmə edilməməlidir. İkinci müştərinin geri dönmə ünvanında sorğu sətri var və sandbox-un icazə siyahısı bunu saxlamırdı. Bir neçə modul isə test edəndən müəyyən addımı dəqiq yerinə yetirməyi tələb edir. Rədd testində Təsdiqlə yerinə Ləğv et düyməsini basmaq, `request_uri` təkrar istifadə testində ilk açılışda heç nə etməmək, on dəqiqəlik müddətin bitməsini gözləmək, düzgün ekran görüntüsünü yükləmək və bir alias ilə eyni anda yalnız bir test işlətmək bunlardan bəziləridir. Hər biri bizə bir dəfə təkrar tura başa gəldi.

## Nəyi düzəldəcəyimizə necə qərar verdik?

Əvvəldən axıra qədər bir qaydaya əməl etdik. Kodu yalnız spesifikasiyanın bir bəndi tələb edəndə dəyişdik, test alətinin özünəməxsus gözləntiləri üçün dəyişmədik və bilərəkdən saxladığımız hər fərqi yazıya aldıq. Koda toxunmazdan əvvəl hər tapıntını aşağıdakı siniflərdən birinə yerləşdirdik.

| Sinif | Mənası | Nə etdik |
|---|---|---|
| xəta | spesifikasiyadakı və ya profildəki MUST başqa cür deyir | düzəltdik, reqressiya testi ilə |
| tövsiyə olunan | SHOULD və ya məxfilik ya da təhlükəsizlik tövsiyəsi | yazılı səbəb yoxdursa düzəltdik |
| konfiqurasiya | alətin konfiqurasiyası, test mühiti və ya test edənin addımı | konfiqurasiyanı və ya proseduru düzəltdik |
| gözlənilən | dəstəkləmədiyimiz variant və ya sənədləşdirilmiş genişlənmə | olduğu kimi saxladıq və qeyd etdik |
| qərar | spesifikasiya icazə verir, amma alət başqa yol gözləyir | layihə rəhbərliyi ADR ilə qərar verdi |
| alət məhdudiyyəti | alət heç bir spesifikasiyanın tələb etmədiyini yoxlayır | düzgün kodu saxladıq, problemi alətin komandasına bildirdik |

![Təsnifat: log sətrindən düzəlişə](/blog/openid-conformance-self-test/en/fig-triage.png)

Dörd tapıntı bağlanmış qərarlara toxunurdu, ona görə əvvəlcə ADR-lərdən keçdi (0059–0062) və layihə rəhbərliyi hər birini kod dəyişməzdən əvvəl təsdiqlədi. Bir genişlənməni (`credential_reuse_policy`) bilərəkdən saxladıq, digərini isə təmiz standart forma olduğu üçün o formaya köçürdük. Təmiz nəticə üçün AB-nin müəyyən etdiyi sahəni silə bilərdik, amma onda əlimizdə testdən keçən, lakin standarta daha az uyğun gələn xidmət qalardı.

## Özünütest nəyi göstərmir?

- **Sertifikat deyil.** OpenID sertifikasiyası Fondla aparılan ayrıca prosesdir; bizim üçün də ayrıca qərardır.
- **Planları dərc etmədik.** Alətdə planı dərc etmək nəticələrini hamıya açır, planın konfiqurasiyasında isə alətə verdiyimiz test məxfi açarları (attestasiya imzalayıcısı, saxta PID-in imza açarı) var. İxrac edilmiş logları və ekran görüntülərini özümüzdə saxlayırıq.
- **Sandbox-u, iki xidməti və hər birinin bir variantını əhatə edir.** Cüzdan planları cihaz üçün ayrıca quruluş tələb etdiyi üçün işlədilmədi. Doğrulayıcının mdoc variantı işlədilmədi. Qurumun issuer xidməti bu planla sınanmadı.
- **Bəzi düzəlişlər hələ npm-də deyil.** npm-dəki paketlər 0.7.2-dir; 27 oktyabrdakı iki doğrulayıcı düzəlişi və dil teqi dəyişikliyi 0.7.3-dədir və sandbox-da işləyir.
- **Yalnız protokolu sınayır.** Alət mesajların düzgün formada olduğunu və tələb olunan yoxlamaların aparıldığını sınayır. Qurumun diplom verməyə səlahiyyətli olub-olmaması etibar siyahısının işidir, hüquqi tanınma isə hüququn.

## Dəstdə nə var?

Dəst ilk tam test turunun öyrətdiklərini istənilən OpenID4VCI issuer və ya OpenID4VP verifier üçün yazılmış şəkildə toplayır. Dəstdə heç bir məhsul və ya host adı keçmir, nümunələrdə isə `example.com` istifadə olunur.

| Hissə | Nə edir |
|---|---|
| İş axını | plan və variantlar, konfiqurasiya, işə salma sırası, brauzer addımları və baxış görüntüləri, loglar, tapıntıların təsnifatı, düzəliş, təkrar tur |
| Issuer planı arayışı | hər OpenID4VCI modulu: nəyi yoxlayır, spesifikasiya bəndi, tipik xəta, düzəliş |
| FAPI 2.0 arayışı | issuer planının içində işləyən 40 FAPI 2.0 Security Profile modulu |
| Verifier planı arayışı | hər modul və 400 ilə 200 cavablarının keçdi və baxışa necə uyğun gəldiyi |
| Tez-tez rast gəlinən xətalar | əlamət → şərt → səbəb → düzəliş, hər tapıntının sinfi ilə |
| Konfiqurasiya şablonları | iki plan üçün açarları çıxarılmış suite JSON-u, sahə-sahə |
| Test PKI | test kökü, attestasiya imzalayıcısı və saxta PID açarları üçün openssl resepti |
| İlkin yoxlama siyahısı | ilk test turundan əvvəl kodda baxılacaqlar |
| Log xülasəçisi | modul üzrə nəticə və hər uğursuz, xəbərdarlıq və baxış sətri; açar və hesab məlumatı olmadan |

Dəst süni intellekt kodlaşdırma köməkçisi üçün plagin kimi paketlənib; quraşdırma əmrləri [README](https://github.com/tamga-network/oidf-conformance-kit#install) faylındadır. İçindəki hər şey sadə Markdown və yalnız standart kitabxanadan istifadə edən Python skriptidir, köməkçi olmadan da işləyir:

```bash title="Arayışlardan və log xülasəçisindən birbaşa istifadə"
git clone https://github.com/tamga-network/oidf-conformance-kit
cd oidf-conformance-kit
# planınızın loglarını alətdən ixrac edin, sonra:
python scripts/oidf-log-summary.py ./logs --latest
python scripts/oidf-log-summary.py ./logs --latest --format markdown --redact -o summary.md
```

> **Qeyd:** Uyğunluq logları alətə verdiyiniz məxfi açarları və ixrac edənin hesabını ehtiva edir. Logları və doldurulmuş konfiqurasiyaları versiya nəzarətinə qoymayın. Xülasəçi yalnız icazə verilmiş sahələri yazır; `--redact` host adlarınızı da gizlədir.

## Necə töhfə verə bilərsiniz?

Alət sürətlə dəyişir. Yeni modullar əlavə olunur, bəzilərinin adı dəyişir, bəziləri isə yeni bir şeyi yoxlamağa başlayır. Dəstdəki modul adlarını alətin 26 oktyabr 2026-cı il tarixli əsas budağı ilə tutuşdurduq, amma bu məlumatlar zamanla köhnələcək. Ən çox kömək edən üç töhfə:

- əlavə olunan və ya dəyişən modul və ya şərt, yoxladığınız alət commit-i ilə;
- rastlaşdığınız və düzəltdiyiniz xəta: şərt adı, səbəb, düzəliş və onu tələb edən bənd;
- alət məhdudiyyəti: davranışı heç bir spesifikasiyanın niyə tələb etmədiyi və alətin problem qeydinə link.

Dəstdəki hər düzəliş spesifikasiyaya istinad etməlidir, yeganə mənbəyi alət olan tapıntı isə məhdudiyyət kimi daxil olur. Cüzdan planları hələ əhatə olunmur; ən böyük boşluq odur. Issue və pull request-lər [github.com/tamga-network/oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) ünvanında qəbul edilir.

## Tez-tez verilən suallar

### Tamga OpenID sertifikatlıdır?

Xeyr. Fondun test alətini sandbox-da özümüz işlətdik. Sertifikasiya ayrıca prosesdir və müraciət edilməyib.

### Niyə bəzi modullar "keçdi" deyil, "baxış" ilə bitir?

Çünki alət şəxsə göstərilən səhifəni görə bilmir. Doğrulayıcımız nəticəni öz səhifəsində göstərdikdə və ya serverimiz xəta səhifəsi göstərdikdə alət ekran görüntüsü istəyir və insan təsdiqləyir. Bu modulların adi sonu belədir.

### Yalnız aləti razı salmaq üçün kodu dəyişdiniz?

Xeyr. Hər kod dəyişikliyi spesifikasiya və ya profil bəndinə əsaslanır. Alətin heç bir spesifikasiyanın tələb etmədiyi bir şey gözlədiyi yerdə kodumuzu saxladıq və fərqi qeyd etdik.

### Dəstdən Tamga ilə əlaqəsi olmayan issuer və ya verifier üçün istifadə edə bilərəm?

Bəli. Arayışlar ümumidir; log xülasəçisi bu iki planın ixrac edilmiş istənilən logunda işləyir.

## Mənbələr

- [OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html)
- [OpenID Foundation conformance suite](https://gitlab.com/openid/conformance-suite) və [sertifikasiya](https://openid.net/certification/)
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/)
- [RFC 9449 (DPoP)](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9126 (PAR)](https://www.rfc-editor.org/rfc/rfc9126), [RFC 6749 (OAuth 2.0)](https://www.rfc-editor.org/rfc/rfc6749), [RFC 9700 (OAuth security BCP)](https://www.rfc-editor.org/rfc/rfc9700), [RFC 9901 (SD-JWT)](https://www.rfc-editor.org/rfc/rfc9901)
- [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests), [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding), [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration), [ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)
- [Tamga OpenID4VP profili](https://docs.tamga.network/specifications/openid4vp) və [OpenID4VCI profili](https://docs.tamga.network/specifications/openid4vci)
- [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0)

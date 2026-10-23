---
title: "OpenID4VP və DCQL ətraflı: sorğudan nəticəyə"
slug: openid4vp-dcql-deep-dive
description: "Yoxlayan tərəf OpenID4VP 1.0 ilə rəqəmsal sənədləri necə tələb edir və yoxlayır: x509_hash imzalı sorğular, DCQL, şifrələnmiş direct_post.jwt, A–E ardıcıllığı."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Sources: OpenID4VP 1.0 Final (9 Jul 2025): client identifier prefixes §5.9.3 (x509_hash = base64url SHA-256 of leaf DER; origin reserved, wallet MUST NOT accept), DCQL §6 (credentials, claims, values, claim_sets, credential_sets, trusted_authorities), response encryption §8.3 (default enc A128GCM), Annex A (DC API, aud origin:), Annex B.2.6. HAIP 1.0 Final (24 Dec 2025) §5: x509_hash for signed requests, DCQL, ECDH-ES P-256, verifiers list A128GCM + A256GCM, wallets SHOULD use A256GCM, ephemeral keys per request, aki trusted_authorities, JAR with request_uri, direct_post.jwt, same-device redirect rules, DC API dc_api.jwt. SPEC-PROTO-0002 v1.0.0: PV1–PV14, over-asking, credential_sets limits, wallet selection behaviour, error table. SPEC-API-0001: A–E codes, three outcomes, AP3. ADR-0034 (x509_hash, SAN check, dns_name). concepts/presentation (channels: QR/link live, DC API verifier ready / no wallet connection yet). Code: packages/verifier request.ts (request_uri QR, aud self-issued, RESPONSE_ENC both), wallet-core jwe.ts (A256GCM preferred), apps/verify (redirect_uri after response). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0 yoxlayan tərəfin rəqəmsal cüzdandan rəqəmsal sənəd istəməsi və cavabında imzalanmış, sənəd sahibinə bağlı təqdimat alması üsuludur. Tamga-da yoxlayan tərəf **imzalanmış sorğu obyekti** göndərir: bu obyekt onu sertifikatının heş dəyəri ilə tanıdır (`x509_hash`), nə istədiyini **DCQL** sorğusu ilə bildirir və birdəfəlik şifrələmə açarı təqdim edir; rəqəmsal cüzdan şifrələnmiş `vp_token` ilə cavab verir və onu yoxlayan tərəfə göndərir (`direct_post.jwt`). Daha sonra yoxlayan tərəf format, sxem, etibar, ləğv və siyasət yoxlamalarından ibarət sabit ardıcıllığı icra edir və üç nəticədən birinə gəlir.

OpenID4VP 1.0 9 iyul 2025-ci ildə, HAIP 1.0 isə 24 dekabr 2025-ci ildə Final statusu aldı. Tamga-nın profili: [SPEC-PROTO-0002](https://docs.tamga.network/specifications/openid4vp). Əvvəlki layihə versiyalarındakı Presentation Exchange (`presentation_definition`) dəstəklənmir: onu ehtiva edən sorğu rədd edilir.

> **Qeyd:** Nümunələr sadələşdirilib. Host adları nümunədir, JWT-lər qısaldılıb, imzalar və açarlar göstərilməyib.

## Sorğu rəqəmsal cüzdana necə çatır?

Başqa cihazda yoxlayan tərəf QR kod göstərir; eyni telefonda isə keçid açır. Hər iki halda ötürülən məlumat kiçikdir, çünki sorğu obyektinin özü istinad üzrə alınır (HAIP-in tələb etdiyi kimi, `request_uri` ilə JAR):

```text title="What the QR code or link carries"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Rəqəmsal cüzdan `request_uri` ünvanına müraciət edir və `typ: oauth-authz-req+jwt`, `alg: ES256`, eləcə də `x5c` daxilində yoxlayan tərəfin sertifikat zəncirini ehtiva edən JWT alır:

```json title="Simplified example: payload of the signed request object"
{
  "aud": "https://self-issued.me/v2",
  "iat": 1791446400,
  "exp": 1791446700,
  "client_id": "x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk",
  "response_type": "vp_token",
  "response_mode": "direct_post.jwt",
  "response_uri": "https://verifier.example.org/vp/response",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "dcql_query": { "credentials": ["… see below …"] },
  "client_metadata": {
    "jwks": { "keys": [{ "kty": "EC", "crv": "P-256", "use": "enc", "alg": "ECDH-ES", "kid": "r1", "x": "…", "y": "…" }] },
    "encrypted_response_enc_values_supported": ["A128GCM", "A256GCM"],
    "vp_formats_supported": {
      "dc+sd-jwt": { "sd-jwt_alg_values": ["ES256"], "kb-jwt_alg_values": ["ES256"] },
      "mso_mdoc": { "issuerauth_alg_values": [-7], "deviceauth_alg_values": [-7] }
    }
  }
}
```

`client_metadata.jwks` daxilindəki şifrələmə açarı müvəqqətidir: HAIP-in tələb etdiyi kimi, yalnız bu sorğu üçün yaradılır. `nonce` ən azı 128 bit entropiyaya malikdir və yalnız bir dəfə qəbul edilir. HAIP yoxlayan tərəflərdən həm `A128GCM`, həm də `A256GCM` dəyərini siyahıya salmağı tələb edir; hər ikisini dəstəkləyən rəqəmsal cüzdan `A256GCM` seçiminə üstünlük verməlidir.

## `x509_hash` nədir və rəqəmsal cüzdan nəyi yoxlayır?

`x509_hash` müştəri identifikatoru sorğunu imzalayan, DER formatında kodlanmış **son (leaf)** sertifikatın base64url SHA-256 heş dəyəridir (OpenID4VP 1.0 §5.9.3). HAIP onu imzalı sorğular üçün yoxlayan tərəfin istifadə etməli, rəqəmsal cüzdanın isə qəbul etməli olduğu yeganə prefiks edir; Tamga-nın bunun üçün dizaynını niyə dəyişdiyi [HAIP və Token Status List](/blog/haip-and-token-status-list) yazısında izah olunur. Onu özünüz hesablaya bilərsiniz:

```bash title="Computing an x509_hash client identifier"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Şəxsə nəsə göstərməzdən əvvəl Tamga qaydalarına əməl edən rəqəmsal cüzdan (istinad kitabxanası: `@tamga-network/wallet-core`):

1. sorğunun imzasını və `x5c` zəncirini yoxlayır, `client_id` daxilindəki heş dəyərinin son sertifikata uyğun gəldiyini təsdiqləyir;
2. `response_uri` domeninin sertifikatın SAN adlarından biri olduğunu yoxlayır; bu, köhnə `x509_san_dns` prefiksinin təhlükəsizlik xüsusiyyətini qoruyur;
3. `exp` (məcburi, vaxtı keçməmiş), `iat` (gələcəkdə 60 saniyədən çox olmayan) və `aud` dəyərlərini yoxlayır;
4. barmaq izini imzalanmış etibar siyahısında axtarır. Tamga-nın etibar edən tərəf qeydlərində eyni dəyər `client_id` kimi saxlanılır, əlavə olaraq daimi `dns_name` də var, çünki sertifikat hər dəfə yenilənəndə heş dəyəri dəyişir;
5. tələb olunan hər bir atributu yoxlayan tərəfin qeydiyyatdan keçmiş əhatə dairəsi ilə müqayisə edir.

Siyahıda olmayan yoxlayan tərəf üçün axını dayandıran xəbərdarlıq ekranı göstərilir. Siyahıda olan, lakin əhatə dairəsindən kənar atribut istəyən yoxlayan tərəf üçün həddindən artıq tələb xəbərdarlığı göstərilir: əhatə dairəsindən kənar sahələr işarələnir, paylaşma düyməsi isə üç saniyə gecikmə ilə aktivləşir. Heç bir halda birbaşa bloklama tətbiq edilmir: rəqəmsal cüzdan şəxsin nəzarətçisi deyil, onun təmsilçisidir. `redirect_uri` prefiksli (imzasız) sorğular, eləcə də `x509_san_dns` sorğuları [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) əsasında rədd edilir.

![İmzalanmış sorğudan şifrələnmiş cavaba](/blog/openid4vp-dcql-deep-dive/en/fig-request.png)

## DCQL sorğusu necə yazılır?

DCQL (Digital Credentials Query Language) yoxlayan tərəfin istədiyi rəqəmsal sənədləri və hər biri üçün atributları sadalayır. Tələbə endirimi üçün bir atribut kifayətdir:

```json title="DCQL: student discount"
{
  "credentials": [{
    "id": "student",
    "format": "dc+sd-jwt",
    "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
    "claims": [{ "path": ["is_enrolled"], "values": [true] }]
  }]
}
```

`meta.vct_values` növü müəyyən edir; Tamga onsuz `dc+sd-jwt` sorğusunu qəbul etmir. `values` atributu şərtə çevirir: rəqəmsal sənəd yalnız `is_enrolled` `true` olduqda uyğun gəlir. Rəqəmsal cüzdan `is_enrolled` atributunu paylaşır, başqa heç nəyi yox.

İşə müraciət diplom **və ya** qüvvədə olan tələbə arayışını qəbul edə və əlavə olaraq könüllü atribut istəyə bilər:

```json title="DCQL: alternatives with credential_sets and an optional claim with claim_sets"
{
  "credentials": [
    {
      "id": "diploma",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:DiplomaCredential:1"] },
      "claims": [
        { "id": "g", "path": ["is_graduate"], "values": [true] },
        { "id": "q", "path": ["qualification_title"] },
        { "id": "t", "path": ["thesis_title"] }
      ],
      "claim_sets": [["g", "q", "t"], ["g", "q"]]
    },
    {
      "id": "student",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
      "claims": [{ "path": ["is_enrolled"], "values": [true] }]
    }
  ],
  "credential_sets": [
    { "options": [["diploma"], ["student"]], "required": true }
  ]
}
```

OpenID4VP §6.4-ə əsasən `@tamga-network/wallet-core` bunu belə şərh edir:

- Məcburi dəstdə yoxlayan tərəfin sıralamasına uyğun olaraq qarşılaya bildiyi **ilk** variantı təklif edir; şəxs qarşılana bilən başqa variantı seçə bilər. Yalnız seçilmiş variant göndərilir.
- Könüllü dəst (`required: false`) defolt olaraq söndürülüb və yalnız şəxs onu aktivləşdirdikdə paylaşılır.
- `claim_sets` ilə yalnız rəqəmsal sənədin qarşılaya bildiyi ilk kombinasiya paylaşılır. Burada dissertasiya mövzusu olan diplom üç, olmayan isə iki atribut göndərir.
- Tələb olunan atributlardan biri əskik olduqda rəqəmsal sənəd **heç vaxt** göndərilmir. `thesis_title` adi `claims` siyahısında olsaydı, dissertasiyası olmayan diplom ümumiyyətlə uyğun gəlməzdi; `claim_sets` məhz bunun üçündür.
- Razılıq ekranı anlaşıqlı qalsın deyə sorğuda ən çoxu üç rəqəmsal sənəd və iki `credential_sets` elementi ola bilər.

mdoc üçün yol `[namespace, element]`, növ isə `meta.doctype_value` daxilində göstərilir ([ISO mdoc ətraflı](/blog/iso-mdoc-deep-dive)). HAIP həmçinin `aki` növlü `trusted_authorities` dəstəyini tələb edir; bu, rəqəmsal sənəd sorğusunu zənciri müəyyən Authority Key Identifier ehtiva edən sənədi verən qurumlarla məhdudlaşdırır. Tamga-nın həm yoxlayan tərəf xidməti, həm də rəqəmsal cüzdanı bunu tətbiq edir.

## Rəqəmsal cüzdan nə qaytarır?

`vp_token` hər DCQL `id` dəyərini təqdimatlar massivinə uyğunlaşdıran xəritədir:

```json title="Simplified example: vp_token before encryption"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Hər SD-JWT VC təqdimatı KB-JWT ilə bitir: onun `aud` dəyəri **tam** müştəri identifikatoru (`x509_hash:Uvo3…`), `nonce` dəyəri sorğunun nonce-u olur, `sd_hash` isə məhz təqdim edilmiş açıqlamaları əhatə edir ([SD-JWT VC ətraflı](/blog/sd-jwt-vc-deep-dive)). mdoc üçün dəyər base64url `DeviceResponse` olur və onun cihaz imzası OpenID4VP handover-i əhatə edir.

`direct_post.jwt` ilə bütün obyekt yoxlayan tərəfin müvəqqəti açarına JWE kimi şifrələnir (P-256 üzərində `alg: ECDH-ES`, `enc: A256GCM` və ya `A128GCM`) və forma sahəsi kimi göndərilir:

```http title="Simplified example: the encrypted response"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS artıq mövcud ikən niyə şifrələmək lazımdır? Təqdimat fərdi məlumatları ehtiva edir, TLS-in sonlandığı nöqtə ilə tətbiq arasında isə sorğu məzmununu görə bilən əks proksilər, firewall-lar və jurnallar yerləşir. JWE ilə onu yalnız müvəqqəti açarın sahibi oxuya bilər. Tamga şifrələnməmiş cavab rejimindən istifadə etmir.

Şəxs imtina edərsə, rəqəmsal cüzdan heç bir səbəb göstərmədən `access_denied` qaytarır. "Bu rəqəmsal sənəd məndə yoxdur" və "Onu paylaşmamağı seçdim" eyni görünməlidir, əks halda yoxlayan tərəf müxtəlif sorğular göndərərək şəxsin hansı sənədlərə malik olduğunu müəyyən edə bilər.

## Yoxlayan tərəf nəticəyə necə gəlir?

Tamga-nın yoxlayan tərəf xidməti addımları sabit ardıcıllıqla icra edir və ilk uğursuzluqda dayanaraq onun daimi kodunu `failed_step` kimi qaytarır:

| Qat | Kodlar | Nə yoxlanılır |
|---|---|---|
| A, format | A1–A8 | sənədi verən qurumun imzası və zənciri, son sertifikatdan sənədi verən qurumun kimliyi, açıqlama heşləri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), etibarlılıq müddəti |
| B, sxem | B1–B6 | `vct` həll edilib, `vct#integrity` kataloqa uyğundur, `extends` zənciri |
| C, etibar | C1–C4 | sənədi verən qurum siyahıdadır və rəqəmsal sənədin `iat` anında bu növ üçün səlahiyyətlidir |
| D, ləğv | D1–D6 | əvvəlcədən yüklənmiş keşdən status siyahısı, imza, aktuallıq, lövbər, `idx` mövqeyindəki bitlər |
| E, siyasət | E1–E4 | zəmanət səviyyəsi həddi, tələb olunan hər atribut açıqlanıb, əhatə dairəsi aşılmayıb, audit qeydi |

Nəticə `ACCEPTED`, `REJECTED` və ya `INDETERMINATE` olur. Üçüncüsü infrastruktura çatmağın mümkün olmadığını bildirir (məsələn, status siyahısı köhnəlib) və rəqəmsal sənədin əleyhinə heç nə ifadə etmir; o, rəddən fərqli şəkildə göstərilməlidir. Nəticə obyekti açıqlanmış atributların yalnız **adlarını** sadalayır, dəyərlərini isə heç vaxt, çünki o, audit jurnalına yazılır. Tam reyestr [yoxlama ardıcıllığı](https://docs.tamga.network/specifications/verification-api) yazısındadır.

![Beş yoxlama qatı](/blog/openid4vp-dcql-deep-dive/en/fig-pipeline.png)

## Eyni cihaz, yoxsa fərqli cihaz?

| | Eyni cihaz | Fərqli cihaz |
|---|---|---|
| Necə başlayır | telefonun öz brauzerində keçid və ya düymə | başqa ekranda QR kod |
| Cavabdan sonra | yoxlayan tərəf `redirect_uri` qaytarır, rəqəmsal cüzdan ona keçir | digər ekrandakı səhifə nəticəni öz server hissəsindən alır |
| Fişinqə davamlılıq | yönləndirmə sorğunu başladan sessiyaya qayıdır | daha zəif: QR kod başqasına ötürülə bilər |

HAIP hər iki tərəfdən eyni cihaz axınını dəstəkləməyi tələb edir və yoxlayan tərəfin sessiya bağlantısına əsaslanmadığı hallar istisna olmaqla, onu tövsiyə edir. Bu axında yönləndirmə heç vaxt geri qayıtmazsa və ya fərqli sessiyaya gələrsə, yoxlayan tərəf təqdimatı rədd etməlidir. Tamga-nın host edilən yoxlayan tərəf xidməti hər cavabdan sonra `redirect_uri` qaytarır, şəbəkədəki rəqəmsal cüzdanlar isə ona keçir. Saytın protokolu özü yazmadan bunu necə qurduğu [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) yazısında izah olunur.

## Bəs brauzerin Digital Credentials API-si (rəqəmsal sənədlər üçün API) necə?

W3C Digital Credentials API (rəqəmsal sənədlər üçün API) ilə sorğunu rəqəmsal cüzdana, cavabı isə geri brauzerin özü `response_mode: dc_api.jwt` vasitəsilə ötürür. Bu halda təqdimatın auditoriyası `origin:https://verifier.example.org` kimi yazılan səhifə mənşəyi (origin) olur və onu brauzerin özü təqdim edir: fişinq saytı başqa saytın mənşəyini özünə aid edə bilməz. Rəqəmsal cüzdan sorğu daxilində `origin:`-ni heç vaxt müştəri identifikatoru kimi qəbul etməməlidir. Tamga bu axında da `x509_hash` ilə imzalanmış sorğunu tövsiyə edir, çünki mənşəyə bağlama fişinq problemini həll edir, reyestrdə yoxlamanı və artıq məlumat tələbinin yoxlanmasını isə `x509_hash` mümkün edir.

Bugünkü vəziyyət: QR kod və link vasitəsilə təqdimat artıq işləyir. Tamga-nın yoxlayan tərəf xidməti onu dəstəkləyən brauzerlərdə Digital Credentials API-dən (rəqəmsal sənədlər üçün API) standart olaraq istifadə edir, masaüstündə isə QR kod ehtiyat yoldur. Rəqəmsal cüzdan tərəfində Tamga Wallet-ın Android kodu yazılıb, hələ tətbiqə daxil edilməyib və cihazda sınaqdan keçirilməyib; iPhone-da hələ yoxdur.

## Tez-tez verilən suallar

### Niyə bir çox əvvəlki tətbiqlər kimi `x509_san_dns` istifadə edilmir?

HAIP 1.0 imzalanmış sorğular üçün `x509_hash` tələb edir və HAIP-ə əməl edən rəqəmsal cüzdan onu qəbul etməlidir. Tamga `x509_san_dns` prefiksinin faydalı hissəsini saxlayır: cavab ünvanı imzalayan sertifikatda göstərilmiş domendə olmalıdır.

### Yoxlayan tərəf hansı atributlardan imtina etdiyimi öyrənirmi?

O, hansı iddiaların (claims) gəldiyini öyrənir. Tələb olunan dəst ödənilə bilmirsə və ya şəxs imtina edirsə, rəqəmsal cüzdan səbəbini bildirmədən `access_denied` qaytarır.

### Bir neçə sxem versiyasını yenə də tələb edə bilərəmmi?

Bəli. Qəbul etdiyiniz bütün versiyaları `vct_values` daxilində göstərin, məsələn, `urn:tamga:edu:DiplomaCredential:1` və `:2`. İkinci versiya yarandıqdan sonra Tamga ən azı iki versiyanın göstərilməsini tövsiyə edir ki, əvvəlki sənəd sahiblərinin çıxışı bağlanmasın.

### `transaction_data` dəstəklənirmi?

Hələ yox. Təqdimatın konkret əməliyyata bağlanması maliyyə və avtorizasiya ssenariləri üçün planlaşdırılır; təhsil ssenarilərində buna ehtiyac yoxdur.

## Mənbələr

- [OpenID for Verifiable Presentations 1.0, yekun versiya, 9 iyul 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, yekun versiya, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network sənədləri](https://docs.tamga.network/specifications/openid4vp)
- [Yoxlama axını və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)
- [ADR-0034: HAIP 1.0 uyğunluğu, Tamga Network sənədləri](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Təqdimat, Tamga Network sənədləri](https://docs.tamga.network/concepts/presentation)
- [Serverdə yoxlama, Tamga Network sənədləri](https://docs.tamga.network/guides/verify-on-server)

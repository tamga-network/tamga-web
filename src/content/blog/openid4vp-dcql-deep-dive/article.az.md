---
title: "OpenID4VP və DCQL ətraflı: sorğudan nəticəyə"
slug: openid4vp-dcql-deep-dive
description: "Yoxlayan tərəfin OpenID4VP 1.0 ilə sənədləri necə istədiyini və yoxladığını izah edirik: x509_hash ilə imzalanmış sorğu, DCQL, şifrələnmiş direct_post.jwt və A–E yoxlama ardıcıllığı."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Sources: OpenID4VP 1.0 Final (9 Jul 2025): client identifier prefixes §5.9.3 (x509_hash = base64url SHA-256 of leaf DER; origin reserved, wallet MUST NOT accept), DCQL §6 (credentials, claims, values, claim_sets, credential_sets, trusted_authorities), response encryption §8.3 (default enc A128GCM), Annex A (DC API, aud origin:), Annex B.2.6. HAIP 1.0 Final (24 Dec 2025) §5: x509_hash for signed requests, DCQL, ECDH-ES P-256, verifiers list A128GCM + A256GCM, wallets SHOULD use A256GCM, ephemeral keys per request, aki trusted_authorities, JAR with request_uri, direct_post.jwt, same-device redirect rules, DC API dc_api.jwt. SPEC-PROTO-0002 v1.0.0: PV1–PV14, over-asking, credential_sets limits, wallet selection behaviour, error table. SPEC-API-0001: A–E codes, three outcomes, AP3. ADR-0034 (x509_hash, SAN check, dns_name). concepts/presentation (channels: QR/link live, DC API verifier ready / no wallet connection yet). Code: packages/verifier request.ts (request_uri QR, aud self-issued, RESPONSE_ENC both), wallet-core jwe.ts (A256GCM preferred), apps/verify (redirect_uri after response). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0 yoxlayan tərəfin cüzdandan sənəd istəmək üçün istifadə etdiyi protokoldur. Yoxlayan tərəf bu protokolla imzalanmış və sənəd sahibinin cihazına bağlı təqdimat alır. Tamga-da yoxlayan tərəf cüzdana **imzalanmış sorğu obyekti** göndərir. Bu obyektdə özünü sertifikatının heşi (`x509_hash`) ilə təqdim edir, nə istədiyini **DCQL** sorğusu ilə bildirir və birdəfəlik şifrələmə açarı verir. Cüzdan da şifrələnmiş `vp_token` ilə cavab verir və bu cavabı birbaşa yoxlayan tərəfə göndərir (`direct_post.jwt`). Sonra yoxlayan tərəf format, sxem, etibar, ləğv və siyasət yoxlamalarından ibarət sabit ardıcıllığı işlədir və üç nəticədən birinə gəlir.

OpenID4VP 1.0 9 iyul 2025-ci ildə, HAIP 1.0 isə 24 dekabr 2025-ci ildə Final oldu. Tamga-nın profili [SPEC-PROTO-0002](https://docs.tamga.network/specifications/openid4vp) sənədində yazılıb. Köhnə layihələrdəki Presentation Exchange (`presentation_definition`) dəstəklənmir və bu sahəni daşıyan sorğular rədd edilir.

> **Qeyd:** Nümunələr sadələşdirilib. Ünvanlar nümunə dəyərlərdir, JWT-lər qısaldılıb, imzalar və açarlar isə göstərilmir.

## Sorğu cüzdana necə çatır?

Şəxs başqa cihazdadırsa, yoxlayan tərəf QR kod göstərir, eyni telefondadırsa keçid açır. Hər iki halda ötürülən məlumat kiçikdir, çünki sorğu obyektinin özü ayrıca ünvandan alınır. HAIP-in tələb etdiyi kimi bunun üçün `request_uri` ilə JAR istifadə olunur:

```text title="What the QR code or link carries"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Cüzdan `request_uri` ünvanına müraciət edir və JWT alır. Bu JWT-nin `typ` dəyəri `oauth-authz-req+jwt`, `alg` dəyəri `ES256` olur və yoxlayan tərəfin sertifikat zənciri `x5c` sahəsində yerləşir:

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

`client_metadata.jwks` daxilindəki şifrələmə açarı müvəqqətidir və HAIP-in tələb etdiyi kimi yalnız bu sorğu üçün yaradılır. `nonce` ən azı 128 bitlik təsadüfilik daşıyır və yalnız bir dəfə qəbul edilir. HAIP yoxlayan tərəfin həm `A128GCM`, həm də `A256GCM`-i siyahıya almasını tələb edir. Hər ikisini dəstəkləyən cüzdan `A256GCM`-i seçməlidir.

## `x509_hash` nədir və cüzdan nəyi yoxlayır?

`x509_hash` müştəri identifikatoru sorğunu imzalayan **yarpaq** sertifikatın DER kodlaşdırmasının SHA-256 heşinin base64url formasıdır (OpenID4VP 1.0 §5.9.3). HAIP imzalanmış sorğularda yoxlayan tərəfin istifadə etməli və cüzdanın qəbul etməli olduğu yeganə prefiks kimi bunu müəyyən edir. Tamga-nın bu səbəbdən dizaynını necə dəyişdiyini [HAIP və Token Status List](/blog/haip-and-token-status-list) yazısında izah etmişik. Bu dəyəri özünüz də hesablaya bilərsiniz:

```bash title="Computing an x509_hash client identifier"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Tamga qaydalarına əməl edən cüzdan şəxsə nəyisə göstərməzdən əvvəl aşağıdakı yoxlamaları aparır. Bu qaydaların istinad kitabxanası `@tamga-network/wallet-core`-dur.

1. Sorğunun imzasını və `x5c` zəncirini yoxlayır, `client_id` daxilindəki heşin yarpaq sertifikatla uyğun gəldiyinə baxır.
2. `response_uri` ünvanındakı domenin sertifikatın SAN sahəsindəki adlardan biri olduğunu yoxlayır. Beləliklə köhnə `x509_san_dns` prefiksinin təmin etdiyi təhlükəsizlik qorunur.
3. `exp` dəyərinin olduğuna və keçmədiyinə, `iat` dəyərinin ən çoxu 60 saniyə irəlidə olduğuna və `aud` dəyərinin düzgün olduğuna baxır.
4. Barmaq izini imzalanmış etibar siyahısında axtarır. Tamga-dakı yoxlayan tərəf qeydləri `client_id` ilə eyni dəyəri daşıyır. Sertifikat hər yenilənəndə heş dəyişdiyi üçün qeydlərdə əlavə olaraq daimi `dns_name` də olur.
5. İstənilən hər sahəni yoxlayan tərəfin qeydiyyatdakı əhatə dairəsi ilə müqayisə edir.

Siyahıda olmayan yoxlayan tərəf prosesi yarımçıq kəsən xəbərdarlıq ekranı ilə qarşılanır. Siyahıda olduğu halda əhatə dairəsindən kənar sahə istəyən yoxlayan tərəf üçün də artıq məlumat istəyi xəbərdarlığı çıxır. Bu halda əhatə dairəsindən kənar sahələr ayrıca işarələnir və paylaş düyməsi üç saniyədən sonra aktiv olur. Hər iki halda paylaşım qəti şəkildə bloklanmır, çünki cüzdan şəxsin yerinə qərar verən gözətçi deyil, onun adından hərəkət edən vasitədir. `redirect_uri` prefiksi ilə gələn imzasız sorğular isə rədd edilir. [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)-ə əsasən `x509_san_dns` prefiksli sorğular da rədd edilir.

![İmzalanmış sorğudan şifrələnmiş cavaba](/blog/openid4vp-dcql-deep-dive/en/fig-request.png)

## DCQL sorğusu necə yazılır?

DCQL (Digital Credentials Query Language) yoxlayan tərəfin istədiyi sənədləri və hər sənəddən hansı sahələri istədiyini sadalayır. Tələbə endirimi üçün bir sahə kifayətdir:

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

`meta.vct_values` sənəd növünü göstərir və Tamga bu sahə olmadan gələn `dc+sd-jwt` sorğusunu rədd edir. `values` isə sahəni şərtə çevirir. Sənəd yalnız `is_enrolled` dəyəri `true` olduqda uyğun gəlir. Cüzdan da yalnız `is_enrolled` sahəsini açır, başqa heç bir sahəni açmır.

İşə müraciətdə isə diplom **və ya** etibarlı tələbə sənədi qəbul edilə və istəyə bağlı sahə də istənilə bilər:

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

`@tamga-network/wallet-core` bu sorğunu OpenID4VP §6.4-ə əsasən belə şərh edir:

- Məcburi dəstdə yoxlayan tərəfin göstərdiyi sıra ilə ödəyə bildiyi **ilk** seçimi təklif edir. Şəxs ödənilə bilən başqa seçimi də seçə bilər. Yoxlayan tərəfə yalnız seçilmiş seçim göndərilir.
- İstəyə bağlı dəst (`required: false`) standart olaraq bağlıdır və yalnız şəxs onu açanda paylaşılır.
- `claim_sets` varsa, sənədin ödəyə bildiyi ilk sahə kombinasiyası açılır. Bu nümunədə dissertasiya adı olan diplom üç sahə, dissertasiya adı olmayan diplom isə iki sahə göndərir.
- İstənilən sahələrdən biri çatışmayan sənəd **heç vaxt** göndərilmir. `thesis_title` adi `claims` siyahısında olsaydı, dissertasiyası olmayan diplom sorğuya ümumiyyətlə uyğun gəlməzdi. `claim_sets` məhz bu hal üçün var.
- Razılıq ekranının anlaşılan qalması üçün bir sorğuda ən çoxu üç sənəd və iki `credential_sets` qeydi ola bilər.

mdoc-da sahə yolu `[ad sahəsi, element]` formasındadır və sənəd növü `meta.doctype_value` sahəsinə yazılır ([ISO mdoc-a dərindən baxış](/blog/iso-mdoc-deep-dive)). HAIP əlavə olaraq `aki` tipli `trusted_authorities` dəstəyini də tələb edir. Bu sahə sənəd sorğusunu sertifikat zəncirində müəyyən Authority Key Identifier olan qurumlarla məhdudlaşdırır. Tamga-nın yoxlayan tərəfi də, cüzdan kitabxanası da bunu dəstəkləyir.

## Cüzdan geri nə göndərir?

`vp_token` hər DCQL `id` dəyərini təqdimatlar massivi ilə uyğunlaşdıran xəritədir:

```json title="Simplified example: vp_token before encryption"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Hər SD-JWT VC təqdimatı KB-JWT ilə bitir. Bu KB-JWT-nin `aud` dəyəri **tam** müştəri identifikatorudur (`x509_hash:Uvo3…`), `nonce` dəyəri sorğunun nonce dəyəridir və `sd_hash` dəyəri də məhz təqdim olunan disclosure-ları əhatə edir ([SD-JWT VC-yə ətraflı baxış](/blog/sd-jwt-vc-deep-dive)). mdoc-da isə dəyər base64url formasında `DeviceResponse` strukturudur və bu strukturdakı cihaz imzası OpenID4VP əl sıxma prosedurasını əhatə edir.

`direct_post.jwt` istifadə olunanda obyektin tamamı yoxlayan tərəfin müvəqqəti açarına görə JWE kimi şifrələnir. Burada `alg: ECDH-ES` (P-256) və `enc: A256GCM` və ya `A128GCM` istifadə olunur. Şifrələnmiş obyekt form sahəsi kimi göndərilir:

```http title="Simplified example: the encrypted response"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS artıq olduğu halda cavabı ayrıca şifrələməyimizin səbəbi var. Təqdimat fərdi məlumat daşıyır və TLS bağlantısının bitdiyi nöqtə ilə tətbiq arasında sorğunun məzmununu görə bilən əks proksi serverlər, firewall-lar və loglar olur. JWE istifadə olunanda təqdimatı yalnız müvəqqəti açarın sahibi oxuya bilər. Tamga şifrələnməmiş cavab formasından istifadə etmir.

Şəxs paylaşmaqdan imtina edərsə, cüzdan səbəb göstərmədən `access_denied` qaytarır. "Bu sənəd məndə yoxdur" və "paylaşmamağı seçdim" cavabları eyni görünməlidir. Əks halda yoxlayan tərəf müxtəlif sorğular göndərərək şəxsin əlində hansı sənədlərin olduğunu müəyyənləşdirə bilərdi.

## Yoxlayan tərəf nəticəyə necə gəlir?

Tamga-nın yoxlayan tərəfi addımları həmişə eyni ardıcıllıqla işlədir. İlk uğursuz addımda dayanır və həmin addımın daimi kodunu `failed_step` sahəsində qaytarır:

| Qat | Kodlar | Nə yoxlanılır |
|---|---|---|
| A, format | A1–A8 | qurumun imzası və zənciri, yarpaq sertifikatdan çıxarılan qurum kimliyi, disclosure heşləri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), etibarlılıq müddəti |
| B, sxem | B1–B6 | `vct` həll edilir, `vct#integrity` kataloqla uyğun gəlir, `extends` zənciri yoxlanılır |
| C, etibar | C1–C4 | qurum sənədin `iat` anında siyahıdadır və bu növ üçün səlahiyyətlidir |
| D, ləğv | D1–D6 | əvvəlcədən endirilmiş status siyahısı, imza, aktuallıq, lövbər, `idx` mövqeyindəki bitlər |
| E, siyasət | E1–E4 | etibarlılıq həddi, istənilən hər sahənin açılması, əhatə dairəsinin aşılmaması, audit qeydi |

Nəticə `ACCEPTED`, `REJECTED` və ya `INDETERMINATE` olur. Üçüncü nəticə, məsələn, status siyahısı çox köhnə olduğu üçün infrastruktura çatmaq mümkün olmadığını göstərir və sənəd barədə mənfi heç nə demir. Ona görə rədd cavabından fərqli göstərilməlidir. Nəticə obyekti audit qeydinə düşdüyü üçün açılmış sahələrin yalnız **adlarını** daşıyır və onların dəyərlərini heç vaxt daşımır. Kodların tam siyahısını [yoxlama ardıcıllığı](https://docs.tamga.network/specifications/verification-api) sənədində tapa bilərsiniz.

![Beş yoxlama qatı](/blog/openid4vp-dcql-deep-dive/en/fig-pipeline.png)

## Eyni cihaz, yoxsa fərqli cihaz?

| | Eyni cihaz | Fərqli cihaz |
|---|---|---|
| Necə başlayır | telefonun öz brauzerindəki keçid və ya düymə ilə | başqa ekranda göstərilən QR kodla |
| Cavabdan sonra | yoxlayan tərəf `redirect_uri` qaytarır və cüzdan həmin ünvana keçir | digər ekrandakı səhifə nəticəni öz serverindən alır |
| Fişinqə qarşı davamlılıq | yönləndirmə sorğunu başladan sessiyaya qayıdır | daha zəif, çünki QR kod başqasına ötürülə bilər |

HAIP hər iki tərəfin eyni cihaz axınını dəstəkləməsini tələb edir və yoxlayan tərəf sessiyaya bağlanmaya söykənmirsə, bu axını tövsiyə edir. Bu axında yönləndirmə heç geri qayıtmasa və ya başqa sessiyaya qayıtsa, yoxlayan tərəf təqdimatı rədd etməlidir. Tamga-nın host edilən yoxlayan tərəfi hər cavabdan sonra `redirect_uri` qaytarır və şəbəkədəki cüzdanlar bu ünvana keçir. Saytın protokolu özü yazmadan bunu necə qura biləcəyini [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) yazısında izah etmişik.

## Brauzerin Digital Credentials API-si nə vəziyyətdədir?

W3C Digital Credentials API istifadə olunanda sorğunu cüzdana, cavabı isə geri daşıyan brauzerin özüdür. Bu axında `response_mode: dc_api.jwt` istifadə olunur. Təqdimatın alıcısı da səhifənin mənşəyi (origin) olur və `origin:https://verifier.example.org` formasında yazılır. Bu dəyəri brauzer özü verdiyi üçün fişinq saytı başqa saytın mənşəyini öz mənşəyi kimi göstərə bilməz. Cüzdan da sorğu daxilində müştəri identifikatoru kimi gələn `origin:` dəyərini heç vaxt qəbul etməməlidir. Tamga bu axında da `x509_hash` ilə imzalanmış sorğudan istifadə etməyi tövsiyə edir. Mənşəyə bağlanma fişinq problemini həll edir, amma etibar siyahısındakı qeydin tapılmasını və artıq məlumat istəyinin yoxlanılmasını mümkün edən `x509_hash`-dir.

Bugünkü vəziyyətə baxsaq, QR kod və keçidlə təqdimat artıq işləyir. Tamga-nın yoxlayan tərəfi dəstəkləyən brauzerlərdə Digital Credentials API-dən standart olaraq istifadə edir və masaüstündə QR kodu ehtiyat yol kimi təklif edir. Cüzdan tərəfində Tamga Wallet-in Android kodu yazılıb, amma hələ tətbiqə əlavə edilməyib və real cihazda sınaqdan keçirilməyib. iPhone dəstəyi isə hələ yoxdur.

## Tez-tez verilən suallar

### Niyə bir çox köhnə tətbiqlərdəki kimi `x509_san_dns` istifadə edilmir?

HAIP 1.0 imzalanmış sorğularda `x509_hash`-i tələb edir və HAIP-ə əməl edən cüzdan bu prefiksi qəbul etməlidir. Tamga `x509_san_dns`-in faydalı hissəsini də qoruyur. Cavab ünvanı imzalayan sertifikatda yazılmış domenlərdən birində olmalıdır.

### Yoxlayan tərəf hansı sahələri paylaşmadığımı öyrənirmi?

Yoxlayan tərəf yalnız hansı sahələrin gəldiyini öyrənir. Məcburi dəst ödənilə bilməsə və ya şəxs paylaşmaqdan imtina etsə, cüzdan səbəbini demədən `access_denied` qaytarır.

### Bir neçə sxem versiyasını istəyə bilərəmmi?

Bəli. Qəbul etdiyiniz hər versiyanı `vct_values` sahəsinə yazın, məsələn `urn:tamga:edu:DiplomaCredential:1` və `:2`. İkinci versiya çıxanda Tamga ən azı iki versiyanın birlikdə yazılmasını tövsiyə edir, beləliklə köhnə versiyadakı sənədin sahibləri kənarda qalmır.

### `transaction_data` dəstəklənirmi?

Hələ dəstəklənmir. Təqdimatın müəyyən əməliyyata bağlanması maliyyə və səlahiyyət ssenariləri üçün planlaşdırılır. Təhsil ssenarilərində buna ehtiyac yoxdur.

## Mənbələr

- [OpenID for Verifiable Presentations 1.0, yekun versiya, 9 iyul 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, yekun versiya, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network sənədləri](https://docs.tamga.network/specifications/openid4vp)
- [Yoxlama axını və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)
- [ADR-0034: HAIP 1.0 uyğunluğu, Tamga Network sənədləri](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Təqdimat, Tamga Network sənədləri](https://docs.tamga.network/concepts/presentation)
- [Serverdə yoxlama, Tamga Network sənədləri](https://docs.tamga.network/guides/verify-on-server)

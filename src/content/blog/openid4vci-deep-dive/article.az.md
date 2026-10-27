---
title: "OpenID4VCI ətraflı: təkliflər, DPoP, sübutlar, paketlər"
slug: openid4vci-deep-dive
description: "Tamga-da OpenID4VCI 1.0 ilə sənədin verilməsini izah edirik: təkliflər və tx_code, PAR və PKCE, DPoP, nonce endpoint-i, açar sübutları, cüzdan attestasiyası və 10 nüsxəlik paket."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Sources: OpenID4VCI 1.0 Final (16 Sep 2025): Nonce Endpoint §7 (c_nonce only, no-store), proofs §8.2, deferred §9 (HTTP 202 + transaction_id + interval), notification events §11, signed metadata typ openidvci-issuer-metadata+jwt, key attestation typ key-attestation+jwt (App. D), batch_size ≥ 2. HAIP 1.0 Final (24 Dec 2025) §4: authorization code flow, FAPI2 PKCE S256 + PAR, DPoP + DPoP-Nonce, scope per configuration, wallet attestation shared sub, key attestations, nonce_endpoint when binding. SPEC-PROTO-0001 v1.0.0 (2026-10-08): flows, tx_code rules PR1/PR12, offer classes, PR3, DPoP PR17, WUA/WIA §11.1, KA §11.1.1, PAR flow §11.2 PR13–PR15, batch §8 PR6, diploma 10 copies (2026-10-08), deferred §9, errors §13. Code: @tamga-network/issuer oid4vci.ts (metadata, scope = vct, config id = vct, reuse policy, authServerMetadata), wallet-core authcode.ts (scope in PAR), dpop.ts (use_dpop_nonce), oid4vci.ts (proofs or key_attestation), platform issuer (c_nonce TTL 300 s). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0 cüzdanın qurumdan sənəd almaq üçün istifadə etdiyi OAuth əsaslı protokoldur. Cüzdan token endpoint-indən giriş tokeni, **nonce endpoint-indən** isə təzə `c_nonce` alır. Sonra açarlarının sahiblik sübutlarını **sənəd endpoint-inə** göndərir və bu endpoint sahibliyi sübut olunan hər açar üçün bir sənəd qaytarır. Tamga bunun üzərində HAIP 1.0 profilini tətbiq edir. Bu profildə tokenlər DPoP-a bağlıdır, avtorizasiya kodu axınında PAR və PKCE istifadə olunur, token endpoint-i cüzdan attestasiyası (wallet attestation) tələb edir, açar attestasiyaları (key attestation) dəstəklənir və sənəd 10 fərqli açara bağlı 10 nüsxəlik paket kimi verilir.

OpenID4VCI 1.0 16 sentyabr 2025-ci ildə Final oldu. Layihələrə əsasən yazılmış kodda iki dəyişiklik hələ də problem yaradır. `c_nonce` artıq token cavabından deyil, nonce endpoint-indən gəlir. Açar sübutları da tək `proof` sahəsi əvəzinə massivlərdən ibarət obyekt olan `proofs` daxilində göndərilir. Tamga-nın profili [SPEC-PROTO-0001](https://docs.tamga.network/specifications/openid4vci) sənədində yazılıb.

![Tamga-da sənəd verilməsinin iki başlanğıc yolu](/blog/openid4vci-deep-dive/en/fig-flows.png)

> **Qeyd:** Nümunələr sadələşdirilib. Ünvanlar və identifikatorlar nümunə dəyərlərdir, JWT-lər qısaldılıb və imzalar göstərilmir.

## Başlamazdan əvvəl cüzdan nəyi oxuyur?

Hər Tamga qurumu host edilən issuer xidmətinin altında bir yol kimi yerləşir. Ona görə qurumun metaməlumat ünvanı well-known ünvanın yola əlavə edilmiş formasından istifadə edir:

```http title="Issuer metadata request (sample institution)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` başlığı ilə sorğu göndəriləndə qurum **imzalanmış metaməlumat** qaytarır. Bu metaməlumatın `typ` dəyəri `openidvci-issuer-metadata+jwt` olur və qurum onu sertifikatı `x5c` sahəsində duran sənəd imza açarı ilə imzalayır. Cüzdan imzalayan sertifikatın barmaq izini etibar siyahısındakı qurum qeydi ilə müqayisə edir. Barmaq izi uyğun gəlmirsə, metaməlumatdan istifadə edilmir. Başlıqsız sorğu isə adi JSON qaytarır:

```json title="Simplified example: credential issuer metadata"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "authorization_servers": ["https://issuer.tamga.network/example-university"],
  "credential_endpoint": "https://issuer.tamga.network/example-university/credential",
  "nonce_endpoint": "https://issuer.tamga.network/example-university/nonce",
  "batch_credential_issuance": { "batch_size": 10 },
  "credential_configurations_supported": {
    "urn:tamga:edu:DiplomaCredential:1": {
      "format": "dc+sd-jwt",
      "scope": "urn:tamga:edu:DiplomaCredential:1",
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "cryptographic_binding_methods_supported": ["jwk"],
      "credential_signing_alg_values_supported": ["ES256"],
      "proof_types_supported": {
        "jwt": {
          "proof_signing_alg_values_supported": ["ES256"],
          "key_attestations_required": { "key_storage": ["iso_18045_moderate", "iso_18045_high"] }
        }
      },
      "credential_metadata": {
        "credential_reuse_policy": {
          "id": "arf_annex_ii",
          "options": [{
            "details": ["per-relying-party", "once_only"],
            "batch_size": 10,
            "reissue_trigger_unused": 2,
            "reissue_trigger_lifetime_left": 604800
          }]
        }
      }
    }
  }
}
```

Bu metaməlumatda bir neçə məqama diqqət etmək lazımdır. Hər konfiqurasiya `scope` dəyəri daşıyır, çünki HAIP hər konfiqurasiya üçün əhatə dairəsi tələb edir və cüzdan bu dəyəri avtorizasiya sorğusunda istifadə edir. Tamga `vct` URN-ini həm konfiqurasiya identifikatoru, həm də əhatə dairəsi kimi istifadə edir. Sənədlər açara bağlı olduğu üçün `nonce_endpoint` də göstərilir. `key_attestations_required` qurumun qəbul etdiyi açar saxlama səviyyələrini sadalayır. Təkrar istifadə siyasəti isə cüzdana hər yoxlayan tərəf üçün ayrıca nüsxə işlətməyi, iki nüsxə qalanda və ya sənədin müddətinin bitməsinə yeddi gün qalanda yeni paket almağı deyir.

`/.well-known/oauth-authorization-server/example-university` ünvanındakı avtorizasiya serverinin metaməlumatı (RFC 8414) buna bir neçə sahə də əlavə edir. Bunlar `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]` və içində `attest_jwt_client_auth` olan `token_endpoint_auth_methods_supported` sahələridir. Cüzdanın başlatdığı sənəd verilməsi aktivdirsə, metaməlumatda `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` və `code_challenge_methods_supported: ["S256"]` sahələri də olur.

## Qurumun başlatdığı təklif necə işləyir?

Qurum **sənəd təklifi** (credential offer) yaradır və onu QR kod və ya keçid kimi göstərir. QR kodun kiçik qalması üçün Tamga yalnız `credential_offer_uri` dəyərini göndərir və cüzdan təklif obyektini bu ünvandan alır. Ünvan yalnız bir dəfə istifadə oluna bilər və beş dəqiqədən sonra etibarsız olur. Ünvan ikinci dəfə istənəndə 404 cavabı qayıdır.

```json title="Simplified example: offer with a pre-authorized code"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "credential_configuration_ids": ["urn:tamga:edu:DiplomaCredential:1"],
  "grants": {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
      "pre-authorized_code": "oaKazRN8I0IbtZ0C7JuMn5",
      "tx_code": { "input_mode": "numeric", "length": 6 }
    }
  }
}
```

`tx_code` QR kodu şəxsin çiyninin üstündən çəkən adama qarşı ikinci qoruma qatıdır. Tamga-da əvvəlcədən avtorizasiya olunmuş axında bu koddan keçmək olmaz. Kod altı rəqəmlidir, üç səhv cəhd təklifi etibarsız edir və kod heç vaxt təkliflə eyni kanaldan göndərilmir:

| Təklif sinfi | Harada görünür | Müddət | Şəxs özü olduğunu necə göstərir |
|---|---|---|---|
| ekranda | portal ekranında, şəxs sistemə daxil olanda | 5 dəq, birdəfəlik | sessiyada göstərilən `tx_code` ilə |
| kanaldan kənar (out-of-band) | e-poçt və ya SMS ilə göndərilən QR və ya keçid | ən çoxu 72 saat, birdəfəlik | *digər* kanal vasitəsilə qurumun qeydlərindəki ünvana göndərilən `tx_code` ilə |
| şəxsiyyətə bağlı | qurumun öz kanalı ilə göndərilən keçid | 7 gün, birdəfəlik | şəxsiyyət sənədini təqdim etməklə (avtorizasiya kodu, `issuer_state`) |

## Token sorğusu necə görünür və DPoP niyə lazımdır?

```http title="Simplified example: token request with DPoP and wallet attestation"
POST /example-university/token HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7…fX0…
OAuth-Client-Attestation: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24rand0Ii…
OAuth-Client-Attestation-PoP: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24tcG9wK2p3dCJ9…

grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
&pre-authorized_code=oaKazRN8I0IbtZ0C7JuMn5
&tx_code=493812
```

```json title="Token response"
{ "access_token": "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NiJ9…", "token_type": "DPoP", "expires_in": 300 }
```

**DPoP** (RFC 9449) giriş tokenini açara bağlayır. Cüzdan hər sənəd verilməsi üçün müvəqqəti P-256 açarı yaradır və `jwk`, `jti`, `htm`, `htu` və `iat` sahələrini daşıyan `dpop+jwt` sübutunu imzalayır. Qurum tokeni bu açarın barmaq izinə bağlayır. Beləliklə oğurlanmış token açar olmadan işə yaramır. Sənəd endpoint-inə gedən sorğular `Authorization: DPoP <token>` başlığını və tokenin SHA-256 heşi olan `ath` sahəsini daşıyan yeni sübutu ehtiva edir. Server `DPoP-Nonce` başlığı ilə birlikdə `use_dpop_nonce` cavabını verərsə, cüzdan sorğunu bu nonce ilə bir dəfə də təkrarlayır. HAIP cüzdanların buna hazır olmasını istəyir. Tamga-da giriş tokenləri beş dəqiqə etibarlıdır.

İki `OAuth-Client-Attestation` başlığı **cüzdan attestasiyasını** daşıyır. Bu, HAIP-in istifadə etdiyi və OAuth-da attestasiyaya əsaslanan müştəri autentifikasiyası kimi tanınan üsuldur. Birinci başlıq cüzdan provayderinin imzaladığı və provayderin sertifikatını `x5c` sahəsində daşıyan JWT-dir. İkincisi isə attestasiyadakı `cnf` açarı ilə imzalanmış və `aud` dəyəri qurum olan sahiblik sübutudur. Qurum imzalayan sertifikatın etibar siyahısındakı cüzdan provayderinə məxsus olub-olmadığını yoxlayır. Məxsus deyilsə, token vermir və `invalid_client` xətası qaytarır. HAIP-ə görə attestasiyadakı `sub` dəyəri cüzdan məhsulunun bütün quraşdırmalarında eyni olmalıdır, ona görə bu sahə telefona xas dəyər daşımır. Şəbəkədəki cüzdanlardan biri olan Tamga Wallet burada öz məhsulunun identifikatorundan istifadə edir. Qısaömürlü Wallet Instance Attestation isə 24 saatdan az davam edir və hər əməliyyatda yeni açar və yeni ləğv qeydi ilə yaradılır. Bu attestasiya `client_status` sahəsini də daşıyır və qurum bu sahəni cüzdan provayderinin status siyahısı ilə yoxlayır. Qurumun bu attestasiyalara niyə etibar etdiyini [Rəqəmsal cüzdana necə etibar etmək olar?](/blog/trusting-a-wallet) yazısında izah etmişik.

## Cüzdanın başlatdığı axın PAR və PKCE-dən necə istifadə edir?

Şəxs tətbiqdəki siyahıdan qurum seçəndə cüzdan avtorizasiya kodu axınını başladır. Bu siyahı ayrıca kataloq serverindən deyil, etibar siyahısından oxunur:

```http title="Simplified example: pushed authorization request"
POST /example-university/par HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
OAuth-Client-Attestation: eyJ…
OAuth-Client-Attestation-PoP: eyJ…

client_id=example-wallet-solution
&response_type=code
&scope=urn%3Atamga%3Aedu%3ADiplomaCredential%3A1
&redirect_uri=…
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
&code_challenge_method=S256
&state=af0ifjsldkj
```

PAR (RFC 9126) avtorizasiya sorğusunun parametrlərini brauzer əvəzinə arxa kanaldan gedən sorğuya köçürür. S256 üsulu ilə istifadə edilən PKCE (RFC 7636) də avtorizasiya kodunu axını başladan cüzdana bağlayır. HAIP FAPI 2.0 vasitəsilə hər ikisini tələb edir. `client_id` cüzdan attestasiyasındakı `sub` dəyəridir. `redirect_uri` PAR sorğusunda sabitlənir və qeydiyyatdakı ünvanla tam eyni olmalıdır. Şəxsiyyətə bağlı təklifdə cüzdan `issuer_state` dəyərini də göndərir.

`/authorize` addımında Tamga qurumu şəbəkəyə xas bir iş görür. Şəxsə giriş səhifəsi göstərmək əvəzinə, şəxsin şəxsiyyət sənədini istəyən imzalanmış OpenID4VP sorğusu qaytarır. Cüzdan adi təqdimat addımlarını icra edir. Qurum təqdimatı yoxlama ardıcıllığının bütün addımlarından keçirir və şəxsi öz qeydləri ilə uyğunlaşdırır. Bu uğurla bitsə, şəxsi ən çoxu 60 saniyə etibarlı və birdəfəlik `code` ilə geri yönləndirir. Sonra gələn token sorğusu `grant_type=authorization_code` dəyərini, `code` və `code_verifier` dəyərlərini, eyni `redirect_uri` ünvanını və eyni cüzdan attestasiyasını daşıyır.

## Açar sübutları və 10 nüsxəlik paket necə göndərilir?

Cüzdan əvvəlcə nonce istəyir. Bu endpoint token tələb etmir və cavabı `Cache-Control: no-store` başlığı ilə qaytarır:

```http title="Nonce endpoint"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Hər `c_nonce` yalnız bir dəfə və bölünməz əməliyyatla istifadə olunur. "Əvvəlcə yoxla, sonra sil" kimi iki addımlı əməliyyat aradakı yarış vəziyyətində eyni sübutun iki dəfə istifadə olunmasına səbəb ola bilərdi. Sonra cüzdan cihaz açarlarını təhlükəsiz aparat modulunda yaradır və sənəd sorğusunu göndərir:

```http title="Simplified example: credential request with ten proofs"
POST /example-university/credential HTTP/1.1
Host: issuer.tamga.network
Authorization: DPoP eyJ0eXAiOiJhdCtqd3Qi…
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIs…
Content-Type: application/json

{
  "credential_configuration_id": "urn:tamga:edu:DiplomaCredential:1",
  "proofs": {
    "jwt": [
      "<openid4vci-proof+jwt signed with key 1>",
      "<… key 2 …>",
      "…",
      "<… key 10 …>"
    ]
  }
}
```

Hər sübutun başlığında `typ: openid4vci-proof+jwt`, `alg: ES256` və `jwk` daxilində açıq açar olur. Faydalı yükündə isə `aud` (qurumun identifikatoru), `iat` və `nonce` sahələri yer alır. Qurum hər sübutu yoxlayır və on açarın **hamısının bir-birindən fərqli** olduğuna baxır. Sonra on sənəd verir və hər nüsxənin `cnf` sahəsinə həmin nüsxənin sübutundakı açarı yazır:

```json title="Credential response (shortened)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… nine more …"
  ]
}
```

Hər sətir boş `~` ilə bitir, çünki KB-JWT yalnız cüzdan sənədi təqdim edəndə əlavə olunur ([SD-JWT VC-yə ətraflı baxış](/blog/sd-jwt-vc-deep-dive)). Şəxsiyyət sənədində hər obyekt əlavə olaraq eyni açara bağlı `mso_mdoc` da daşıyır ([ISO mdoc-a dərindən baxış](/blog/iso-mdoc-deep-dive)).

![On açar, on sübut, on nüsxə](/blog/openid4vci-deep-dive/en/fig-batch.png)

On fərqli açardan istifadə edilməsinin səbəbi var. Hər nüsxə eyni `cnf` dəyərini daşısaydı, məlumat bölüşən iki yoxlayan tərəf nüsxələri bir-biri ilə əlaqələndirə bilərdi və paket heç nəyi qorumamış olardı. Hər nüsxə status siyahısında da öz təsadüfi indeksini alır, ona görə nüsxələr `idx` vasitəsilə də bir-birinə bağlana bilmir. Sənəd ləğv ediləndə qurum bütün nüsxələrin indekslərini birlikdə işarələyir. Hansı nüsxənin hansı indeksə uyğun gəldiyi isə yalnız qurumun öz verilənlər bazasında saxlanılır. Bu qayda diplom da daxil olmaqla bütün sənəd növlərində keçərlidir.

**Açar attestasiyası** (key attestation) istifadə olunanda paketi bir sübutla da istəmək olar. Bu halda sübutun başlığı `key_attestation` sahəsini daşıyır. Bu sahə cüzdan provayderinin imzaladığı, `attested_keys` siyahısını və açarların saxlama səviyyəsini bildirən JWT-dir. Sübut da siyahıdakı ilk açarla imzalanır. Qurum açar attestasiyasını, onun ləğv vəziyyətini və nonce dəyərini yoxlayır, qurumun tələb etdiyi ən aşağı açar saxlama səviyyəsini tətbiq edir və siyahıdakı hər açara bir nüsxə bağlayır. OpenID4VCI 1.0 bu formatı D əlavəsində müəyyən edir.

## Tamga təxirə salınmış sənəd verilməsindən istifadə edirmi?

Profil təxirə salınmış sənəd verilməsini (deferred issuance) yalnız bir hal üçün təsvir edir. Bu hal məzuniyyət qərarı hələ təsdiqlənməmiş diplomdur. Onun öz qaydaları da var. `transaction_id` ən çoxu 30 gün etibarlıdır, sorğulama aralığı (`interval`) ən azı 300 saniyədir və cüzdan gözləmə müddətini hər dəfə qat-qat artırır. Bunun səbəbi müntəzəm aralıqlarla aparılan sorğulamanın quruma "bu şəxs hələ də gözləyir" məlumatını verməsidir. Bu gün heç bir Tamga qurumu təxirə salınmış sənəd verilməsini təklif etmir. Metaməlumatda `deferred_credential_endpoint` yoxdur və diplom yalnız imzalana biləcək vəziyyətdə olanda təklif edilir. OpenID4VCI 1.0 Final-da təxirə salınmış cavab `transaction_id` və `interval` daşıyan HTTP 202 cavabıdır. Hələ də gözləyən təxirə salınmış sorğu da yenə HTTP 202 alır. Köhnə layihələrə əsasən yazılmış tətbiqlər isə bunun əvəzinə `issuance_pending` xətası gözləyir.

## Cüzdan hansı xətaları emal etməlidir?

| Xəta | Mənası | Cüzdan nə edir |
|---|---|---|
| `invalid_proof` | sübut yoxdur, etibarsızdır və ya nonce daşımır | yeni `c_nonce` alır və təkrar cəhd edir |
| `invalid_nonce` | nonce köhnəlib və ya istifadə olunub | yeni `c_nonce` alır və təkrar cəhd edir |
| `invalid_credential_request` | sorğu düzgün formatda deyil | vəziyyəti bildirir, təkrar cəhd etmir |
| `unknown_credential_configuration` | konfiqurasiya təklif olunmur | metaməlumatı yeniləyir |
| `credential_request_denied` | icazə yoxdur və ya icazə geri götürülüb | təkrar cəhd etmir |
| `invalid_client` (token) | cüzdan attestasiyası yoxdur, etibarsızdır və ya ləğv edilib | əməliyyatı dayandırır |
| `invalid_token` | giriş tokeninin müddəti bitib | axını yenidən başladır |

Xəta cavablarında fərdi məlumat olmur. Məsələn, "bu şəxsə aid qeyd yoxdur" vəziyyəti `credential_request_denied` xətası ilə bildirilir və təfərrüat qurumun öz audit qeydində qalır.

## Tez-tez verilən suallar

### `tx_code` niyə heç vaxt QR kodun içində olmur?

QR kodu başqası görə və ya şəklini çəkə bilər. Kod QR ilə birlikdə göndərilsəydi, həmin şəxs sənədi öz cüzdanına ala bilərdi. Onları ayrı kanallardan göndərmək sənədi ələ keçirmək istəyən şəxsdən hər iki kanalı ələ keçirməyi tələb edir.

### HAIP əvvəlcədən avtorizasiya olunmuş kod axınını tələb edirmi?

Xeyr. HAIP avtorizasiya kodu axınını tələb edir. Tamga isə hər iki axını dəstəkləyir. Portalı şəxsi artıq tanıyan qurumlar üçün əvvəlcədən avtorizasiya olunmuş təklifdən, cüzdanın başlatdığı sorğular üçün isə PAR, PKCE və şəxsiyyət təqdimatı olan avtorizasiya kodu axınından istifadə edir.

### Qurum nüsxənin hansı yoxlayan tərəfdə istifadə olunduğunu bilə bilərmi?

Xeyr. Qurum təqdimatları görmür və nüsxələr nə açarı, nə də status indeksini bölüşür. Ona görə məlumat bölüşən yoxlayan tərəflər belə nüsxələri sənəd vasitəsilə bir-birinə bağlaya bilmir.

### Nüsxələr bitəndə nə baş verir?

İki nüsxə qalanda cüzdan birdəfəlik yeniləmə tokeni ilə yeni paket istəyir. Bu token sənəd verilərkən istifadə olunmuş cüzdan attestasiyasının açarına bağlıdır. Cüzdan da bunu həmin açar üçün yaradılmış təzə attestasiya ilə göstərir, DPoP açarı isə dəyişə bilər ([ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding)). Cüzdan əvvəl rastlaşdığı yoxlayan tərəfdə həmin tərəf üçün ayırdığı nüsxədən istifadə etməyə davam edir. Yeni yoxlayan tərəfdə isə nüsxəni təkrar istifadə etməzdən əvvəl şəxsdən soruşur.

## Mənbələr

- [OpenID for Verifiable Credential Issuance 1.0, yekun versiya, 16 sentyabr 2025](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, yekun versiya, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 9449: OAuth 2.0 Demonstrating Proof of Possession (DPoP), IETF](https://www.rfc-editor.org/rfc/rfc9449)
- [RFC 9126: OAuth 2.0 Pushed Authorization Requests, IETF](https://www.rfc-editor.org/rfc/rfc9126)
- [OpenID4VCI profili (SPEC-PROTO-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/openid4vci)
- [Rəqəmsal sənədlərin verilməsi, Tamga Network sənədləri](https://docs.tamga.network/concepts/issuance)
- [ADR-0025: Rəqəmsal cüzdan nüsxəsi və açar attestasiyaları, Tamga Network sənədləri](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)
- [Qurum olaraq rəqəmsal sənədlərin verilməsi, Tamga Network sənədləri](https://docs.tamga.network/guides/issue-credentials)
- [`@tamga-network/issuer`, Tamga Network sənədləri](https://docs.tamga.network/packages/issuer)

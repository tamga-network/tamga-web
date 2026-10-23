---
title: "OpenID4VCI ətraflı: təkliflər, DPoP, sübutlar, paketlər"
slug: openid4vci-deep-dive
description: "Tamga-da OpenID4VCI 1.0 ilə sənəd verilməsi: təkliflər və tx_code, PAR və PKCE, DPoP, nonce endpoint-i, açar sübutları, cüzdan attestasiyası, 10-luq paketlər."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Sources: OpenID4VCI 1.0 Final (16 Sep 2025): Nonce Endpoint §7 (c_nonce only, no-store), proofs §8.2, deferred §9 (HTTP 202 + transaction_id + interval), notification events §11, signed metadata typ openidvci-issuer-metadata+jwt, key attestation typ key-attestation+jwt (App. D), batch_size ≥ 2. HAIP 1.0 Final (24 Dec 2025) §4: authorization code flow, FAPI2 PKCE S256 + PAR, DPoP + DPoP-Nonce, scope per configuration, wallet attestation shared sub, key attestations, nonce_endpoint when binding. SPEC-PROTO-0001 v1.0.0 (2026-10-08): flows, tx_code rules PR1/PR12, offer classes, PR3, DPoP PR17, WUA/WIA §11.1, KA §11.1.1, PAR flow §11.2 PR13–PR15, batch §8 PR6, diploma 10 copies (2026-10-08), deferred §9, errors §13. Code: @tamga-network/issuer oid4vci.ts (metadata, scope = vct, config id = vct, reuse policy, authServerMetadata), wallet-core authcode.ts (scope in PAR), dpop.ts (use_dpop_nonce), oid4vci.ts (proofs or key_attestation), platform issuer (c_nonce TTL 300 s). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0 rəqəmsal cüzdanın sənədi verən qurumdan rəqəmsal sənəd almaq üçün istifadə etdiyi OAuth əsaslı protokoldur. Cüzdan token endpoint-indən access token, **nonce endpoint-indən** yeni `c_nonce` alır və açar sübutlarını **credential endpoint-ə** göndərir; bu endpoint sübut edilmiş hər açar üçün bir rəqəmsal sənəd qaytarır. Tamga bunun üzərində HAIP 1.0 profilinə əməl edir: DPoP ilə bağlanmış tokenlər, avtorizasiya kodu axınında PAR və PKCE, token endpoint-ində cüzdan attestasiyası, açar attestasiyaları və 10 müxtəlif açara bağlanmış 10 nüsxədən ibarət paket.

OpenID4VCI 1.0 16 sentyabr 2025-ci ildə Final statusu aldı. Layihə versiyalarından (draft) olan iki dəyişiklik onlara əsasən yazılmış kodu hələ də çaşdırır: `c_nonce` artıq token cavabından deyil, nonce endpoint-indən gəlir, açar sübutları isə `proof` ilə deyil, `proofs` (massivlərdən ibarət obyekt) ilə ötürülür. Tamga-nın profili: [SPEC-PROTO-0001](https://docs.tamga.network/specifications/openid4vci).

![Tamga-da sənəd verilməsinin iki başlanğıc yolu](/blog/openid4vci-deep-dive/en/fig-flows.png)

> **Qeyd:** Nümunələr sadələşdirilib. Hostlar və identifikatorlar nümunədir, JWT-lər qısaldılıb, imzalar göstərilmir.

## Başlamazdan əvvəl rəqəmsal cüzdan nəyi oxuyur?

Hər bir Tamga qurumu host edilən sənədi verən qurum ünvanı altında ayrıca yoldur (path), buna görə onun metaməlumatları well-known URL-in path-insertion formasından istifadə edir:

```http title="Issuer metadata request (sample institution)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` ilə sənədi verən qurum **imzalanmış metaməlumatlar** qaytarır (`typ` `openidvci-issuer-metadata+jwt`, qurumun `x5c`-dəki rəqəmsal sənəd imzalama sertifikatı ilə imzalanır). Cüzdan imzalayanın barmaq izini (fingerprint) etibar siyahısındakı qurum qeydi ilə müqayisə edir; uyğun gəlmirsə, metaməlumatlardan istifadə olunmur. Adi sorğu JSON qaytarır:

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

Diqqət yetirilməli məqamlar. Hər konfiqurasiya `scope` elan edir, çünki HAIP bunu hər konfiqurasiya üçün tələb edir və rəqəmsal cüzdan ondan avtorizasiya sorğusunda istifadə edir; Tamga `vct` URN-dən həm konfiqurasiya identifikatoru, həm də scope kimi istifadə edir. `nonce_endpoint` mövcuddur, çünki rəqəmsal sənədlər açara bağlıdır. `key_attestations_required` qurumun qəbul etdiyi açar saxlama səviyyələrini sadalayır. Təkrar istifadə siyasəti rəqəmsal cüzdana hər yoxlayan tərəf üçün ayrıca nüsxədən istifadə etməyi, iki nüsxə qaldıqda və ya müddətin bitməsinə yeddi gün qalmış yeni dəst almağı bildirir.

`/.well-known/oauth-authorization-server/example-university` ünvanındakı avtorizasiya serveri metaməlumatları (RFC 8414) `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]`, `attest_jwt_client_auth` daxil olmaqla `token_endpoint_auth_methods_supported`, cüzdanın başlatdığı sənəd verilməsi aktiv olduqda isə `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` və `code_challenge_methods_supported: ["S256"]` əlavə edir.

## Sənədi verən qurumun başlatdığı təklif necə işləyir?

Qurum **rəqəmsal sənəd təklifi (credential offer)** yaradır və onu QR kod və ya keçid kimi göstərir. QR kodu kiçik saxlamaq üçün Tamga yalnız `credential_offer_uri` göndərir; cüzdan təklif obyektini oradan alır. URI birdəfəlikdir və beş dəqiqədən sonra etibarsız olur; ikinci sorğu 404 qaytarır.

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

`tx_code` QR kodu şəxsin çiyni üzərindən çəkən birinə qarşı ikinci faktordur. Tamga-da əvvəlcədən avtorizasiya olunmuş (pre-authorized) axında onu ötürmək mümkün deyil, o, altı rəqəmdən ibarətdir, üç səhv cəhd təklifi etibarsız edir və o, heç vaxt təkliflə eyni kanalda ötürülmür:

| Təklif sinfi | Harada görünür | Müddət | Şəxs özü olduğunu necə sübut edir |
|---|---|---|---|
| ekranda | portal ekranı, şəxs sistemə daxil olub | 5 dəq, birdəfəlik | `tx_code` sistemə daxil olunmuş sessiyada göstərilir |
| kanaldan kənar (out-of-band) | e-poçt və ya SMS ilə QR və ya keçid | 72 saata qədər, birdəfəlik | `tx_code` *digər* kanal vasitəsilə, qurumun qeydlərindəki ünvana |
| şəxsiyyətə bağlı | qurumun öz kanalı ilə keçid | 7 gün, birdəfəlik | şəxsiyyət sənədinin təqdim edilməsi (authorization code grant, `issuer_state`) |

## Token sorğusu necə görünür və niyə DPoP?

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

**DPoP** (RFC 9449) access token-i açara bağlayır. Hər sənəd verilməsi axını üçün cüzdan müvəqqəti P-256 açarı yaradır və `jwk`, `jti`, `htm`, `htu` və `iat` daşıyan `dpop+jwt` sübutunu imzalayır. Sənədi verən qurum tokeni açarın thumbprint-inə bağlayır, buna görə oğurlanmış token açar olmadan yararsızdır. Credential endpoint-inə sorğular `Authorization: DPoP <token>` və tokenin SHA-256 heşi olan `ath` ilə yeni sübut daşıyır. Server `DPoP-Nonce` başlığı ilə `use_dpop_nonce` cavab verərsə, cüzdan həmin nonce ilə bir dəfə təkrar cəhd edir — HAIP cüzdanlardan buna hazır olmağı tələb edir. Tamga-nın access token-ləri beş dəqiqə etibarlıdır.

İki `OAuth-Client-Attestation` başlığı **cüzdan attestasiyasıdır** — HAIP-in istifadə etdiyi, attestasiyaya əsaslanan OAuth müştəri autentifikasiyası. Birincisi cüzdan provayderi tərəfindən imzalanmış JWT-dir, `x5c`-də provayderin sertifikatı yerləşir; ikincisi attestasiyanın `cnf`-dəki açarla imzalanmış sahiblik sübutudur (proof of possession), `aud` isə sənədi verən quruma təyin edilir. Sənədi verən qurum imzalama sertifikatının etibar siyahısında olan cüzdan provayderinə məxsus olduğunu yoxlayır, əks halda tokeni rədd edir (`invalid_client`). HAIP-ə görə attestasiyanın `sub` dəyəri cüzdan məhsulunun bütün quraşdırmaları üçün eyni olmalıdır, buna görə o, konkret telefona məxsus dəyər daşımır; şəbəkədəki cüzdanlardan biri olan Tamga Wallet öz həll identifikatorundan istifadə edir. Qısamüddətli Wallet Instance Attestation (24 saatdan az, hər əməliyyat üçün yeni açar və yeni ləğv qeydi) həmçinin `client_status` daşıyır və sənədi verən qurum onu cüzdan provayderinin status siyahısı ilə yoxlayır. Qurumun bu attestasiyalara ümumiyyətlə niyə etibar etdiyi [Cüzdana necə etibar etmək olar?](/blog/trusting-a-wallet) məqaləsində izah olunur.

## Cüzdanın başlatdığı axın PAR və PKCE-dən necə istifadə edir?

Şəxs tətbiqdaxili siyahıdan qurum seçdikdə (siyahı ayrıca kataloq serverindən deyil, etibar siyahısından oxunur), cüzdan avtorizasiya kodu axınını başladır:

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

PAR (RFC 9126) avtorizasiya parametrlərini arxa kanal (back-channel) sorğusuna köçürür, S256 ilə PKCE (RFC 7636) isə kodu axını başladan cüzdana bağlayır; HAIP FAPI 2.0 vasitəsilə hər ikisini tələb edir. `client_id` cüzdan attestasiyasının `sub` dəyəridir. `redirect_uri` PAR-da sabitlənir və qeydiyyatdan keçmiş ünvana uyğun olmalıdır. Şəxsiyyətə bağlı təklif üçün cüzdan həmçinin `issuer_state` göndərir.

`/authorize` mərhələsində Tamga sənədi verən qurumu şəbəkəyə xas bir addım atır: giriş səhifəsi əvəzinə şəxsin şəxsiyyət sənədi üçün imzalanmış OpenID4VP sorğusu qaytarır. Cüzdan adi təqdimat axınını icra edir, sənədi verən qurum təqdimatı tam yoxlama zənciri (pipeline) ilə yoxlayır və şəxsi qurumun öz qeydləri ilə tutuşdurur, uğurlu olduqda isə ən çox 60 saniyə etibarlı birdəfəlik `code` ilə yönləndirir. Bundan sonra token sorğusu `grant_type=authorization_code`, `code`, `code_verifier`, eyni `redirect_uri` və eyni cüzdan attestasiyasını daşıyır.

## Açar sübutları və 10-luq paket necə göndərilir?

Əvvəlcə cüzdan nonce istəyir. Endpoint token tələb etmir və `Cache-Control: no-store` ilə cavab verir:

```http title="Nonce endpoint"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Hər `c_nonce` atomar şəkildə yalnız bir dəfə istifadə olunur: "əvvəl yoxla, sonra sil" yarışı (race condition) bir sübutun iki dəfə istifadəsinə imkan verərdi. Sonra cüzdan cihaz açarlarını təhlükəsiz aparat modulunda yaradır və rəqəmsal sənəd sorğusunu göndərir:

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

Hər sübutda `typ: openid4vci-proof+jwt`, `alg: ES256` və `jwk` başlığında açıq açar var, yükündə (payload) isə `aud` (sənədi verən qurumun identifikatoru), `iat` və `nonce` olur. Sənədi verən qurum hər sübutu yoxlayır, on açarın **hamısının fərqli** olduğunu yoxlayır və hər sübutun açarını həmin nüsxənin `cnf` sahəsinə yerləşdirərək on rəqəmsal sənəd verir:

```json title="Credential response (shortened)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… nine more …"
  ]
}
```

Hər sətir boş `~` ilə bitir: cüzdan sənədi təqdim edənə qədər KB-JWT olmur ([SD-JWT VC ətraflı](/blog/sd-jwt-vc-deep-dive)). Şəxsiyyət sənədi üçün hər obyekt həmçinin eyni açara bağlı `mso_mdoc` daşıyır ([ISO mdoc ətraflı](/blog/iso-mdoc-deep-dive)).

![On açar, on sübut, on nüsxə](/blog/openid4vci-deep-dive/en/fig-batch.png)

Niyə on fərqli açar? Hər nüsxə eyni `cnf` daşısaydı, məlumat mübadiləsi edən iki yoxlayan tərəf nüsxələri bir-biri ilə əlaqələndirə bilərdi və paket heç nəyi qorumazdı. Hər nüsxə həmçinin öz təsadüfi status siyahısı indeksini alır, beləliklə nüsxələri `idx` vasitəsilə də əlaqələndirmək mümkün olmur. Rəqəmsal sənəd ləğv edildikdə sənədi verən qurum onun bütün nüsxələrinin indekslərini birlikdə təyin edir; nüsxələrlə indekslər arasındakı uyğunluq sənədi verən qurumun öz verilənlər bazasında qalır. Bu, diplomlar da daxil olmaqla bütün rəqəmsal sənəd növlərinə aiddir.

**Açar attestasiyası** ilə paketi tək sübutla da tələb etmək olar. Sübutun başlığı `key_attestation` daşıyır — cüzdan provayderi tərəfindən imzalanmış, `attested_keys` sadalayan və onların saxlama səviyyəsini bildirən JWT; sübut isə ilk attestasiya edilmiş açarla imzalanır. Sənədi verən qurum attestasiyanı, onun ləğv statusunu və nonce-u yoxlayır, qurumun minimum açar saxlama səviyyəsini tətbiq edir və hər attestasiya edilmiş açara bir nüsxə bağlayır. OpenID4VCI 1.0 bu formatı D əlavəsində müəyyən edir.

## Tamga təxirə salınmış sənəd verilməsindən (deferred issuance) istifadə edirmi?

Profil bunu bir hal üçün — məzuniyyət qərarı hələ təsdiqlənməmiş diplom üçün — öz qaydaları ilə təsvir edir: `transaction_id` ən çox 30 gün qüvvədə qalır, sorğulama (polling) üçün `interval` ən azı 300 saniyədir və cüzdan intervalı eksponensial artırır, çünki müntəzəm sorğulama sənədi verən quruma "bu şəxs hələ də gözləyir" xəbərini verir. Bu gün heç bir Tamga sənədi verən qurumu bunu təklif etmir: metaməlumatlarda `deferred_credential_endpoint` yoxdur, buna görə diplom yalnız imzalana bildikdən sonra təklif olunur. OpenID4VCI 1.0 Final-da təxirə salınmış cavab `transaction_id` və `interval` ilə HTTP 202-dir, hələ gözləmədə olan təxirə salınmış sorğu isə yenidən HTTP 202 alır; köhnə layihə versiyalarına əsasən qurulmuş tətbiqlər bunun əvəzində `issuance_pending` xətası gözləyir.

## Cüzdan hansı xətaları emal etməlidir?

| Xəta | Mənası | Cüzdanın davranışı |
|---|---|---|
| `invalid_proof` | sübut yoxdur, etibarsızdır və ya nonce daşımır | yeni `c_nonce` alın, təkrar cəhd edin |
| `invalid_nonce` | nonce köhnəlib və ya istifadə olunub | yeni `c_nonce` alın, təkrar cəhd edin |
| `invalid_credential_request` | sorğu düzgün formatda deyil | bildirin, təkrar cəhd etməyin |
| `unknown_credential_configuration` | konfiqurasiya təklif olunmur | metaməlumatları yeniləyin |
| `credential_request_denied` | icazə yoxdur və ya icazə geri götürülüb | təkrar cəhd etməyin |
| `invalid_client` (token) | cüzdan attestasiyası yoxdur, etibarsızdır və ya ləğv edilib | dayandırın |
| `invalid_token` | access token-in müddəti bitib | axını yenidən başladın |

Xəta cavablarında heç bir fərdi məlumat olmur. "Bu şəxs üçün qeyd tapılmadı" cavabı `credential_request_denied` kimi qaytarılır; təfərrüatlar sənədi verən qurumun öz audit jurnalında qalır.

## Tez-tez verilən suallar

### Niyə `tx_code` heç vaxt QR kodda olmur?

Çünki QR kodu başqa biri görə və ya fotoşəkilini çəkə bilər. Əgər kod da onunla birlikdə ötürülsəydi, həmin şəxs rəqəmsal sənədi öz rəqəmsal cüzdanına götürə bilərdi. Onları ayrı kanallara bölmək o deməkdir ki, hər ikisi ələ keçirilməlidir.

### HAIP əvvəlcədən avtorizasiya olunmuş kod axınını tələb edirmi?

Xeyr. HAIP avtorizasiya kodu axınını tələb edir. Tamga hər ikisini dəstəkləyir: portalı şəxsi artıq tanıyan qurumlar üçün əvvəlcədən avtorizasiya olunmuş təklifləri, rəqəmsal cüzdan tərəfindən başladılan sorğular üçün isə PAR, PKCE və şəxsiyyətin təqdim edilməsi ilə avtorizasiya kodu axınını.

### Sənədi verən qurum nüsxənin hansı yoxlayan tərəfə təqdim edildiyini bilə bilərmi?

Xeyr. Sənədi verən qurum təqdimatları görmür, nüsxələrin isə ortaq açarı və ya status indeksi yoxdur. Buna görə hətta öz aralarında razılaşan yoxlayan tərəflər belə onları rəqəmsal sənəd vasitəsilə əlaqələndirə bilməz.

### Nüsxələr bitdikdə nə baş verir?

İki nüsxə qaldıqda rəqəmsal cüzdan birdəfəlik yeniləmə tokenindən istifadə edərək yeni dəst tələb edir. Token buraxılış zamanı istifadə olunan cüzdan attestasiyasının açarına bağlıdır və rəqəmsal cüzdan bunu həmin açar üçün təzə attestasiya ilə sübut edir; DPoP açarı dəyişə bilər ([ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding)). Artıq tanıdığı yoxlayan tərəfdə həmin yoxlayan tərəfin nüsxəsindən istifadə etməyə davam edir; yeni yoxlayan tərəfdə isə nüsxədən təkrar istifadə etməzdən əvvəl şəxsdən soruşur.

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

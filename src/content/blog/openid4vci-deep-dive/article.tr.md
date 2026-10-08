---
title: "OpenID4VCI ayrıntılı: teklif, DPoP, kanıt, 10'lu paket"
slug: openid4vci-deep-dive
description: Tamga'da OpenID4VCI 1.0 ile belge verme; teklif ve tx_code, PAR ve PKCE, DPoP, nonce ucu, anahtar kanıtları, cüzdan doğrulaması, 10 kopyalık paket.
date: 2026-10-08
lang: tr
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Kaynak: OpenID4VCI 1.0 Final (16 Eylül 2025): Nonce Endpoint §7 (yalnız c_nonce, no-store), proofs §8.2, ertelenmiş ihraç §9 (HTTP 202 + transaction_id + interval), bildirim olayları §11, imzalı metadata typ openidvci-issuer-metadata+jwt, anahtar kanıtı typ key-attestation+jwt (Ek D). HAIP 1.0 Final (24 Aralık 2025) §4. SPEC-PROTO-0001 v1.0.0 (2026-10-08). Kod: @tamga-network/issuer oid4vci.ts, wallet-core authcode.ts, dpop.ts, oid4vci.ts; platform issuer (c_nonce 300 sn). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0, cüzdanın bir kurumdan belge almak için kullandığı OAuth tabanlı protokoldür. Cüzdan token ucundan bir erişim belirteci, **nonce ucundan** taze bir `c_nonce` alır ve anahtar kanıtlarını **belge ucuna** gönderir; belge ucu kanıtlanan her anahtar için bir belge döner. Tamga bunun üstüne HAIP 1.0 profilini uygular: DPoP'a bağlı belirteçler, yetkilendirme kodu akışında PAR ve PKCE, token ucunda cüzdan doğrulaması (wallet attestation), anahtar kanıtları (key attestation) ve 10 ayrı anahtara bağlı 10 kopyalık paket.

OpenID4VCI 1.0, 16 Eylül 2025'te Final oldu. Taslaklara göre yazılmış kodu hâlâ iki değişiklik şaşırtıyor: `c_nonce` artık token yanıtından değil nonce ucundan geliyor; anahtar kanıtları da `proof` (tekil) yerine `proofs` (dizilerden oluşan bir nesne) içinde gidiyor. Tamga profili [SPEC-PROTO-0001](https://docs.tamga.network/tr/specifications/openid4vci).

![Tamga'da belge vermenin iki başlangıcı](/blog/openid4vci-deep-dive/tr/fig-flows.png)

> **Not:** Sadeleştirilmiş örnekler. Adresler ve kimlikler örnektir, JWT'ler kısaltıldı, imzalar gösterilmiyor.

## Cüzdan başlamadan önce neyi okur?

Her Tamga kurumu, barındırılan issuer hizmetinin altında bir yoldur; metadata adresi de well-known adresin yola eklenmiş biçimini kullanır:

```http title="Kurum metadata isteği (örnek kurum)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` ile kurum **imzalı metadata** döner (`typ` `openidvci-issuer-metadata+jwt`, kurumun `x5c`'deki belge imza sertifikasıyla imzalı). Cüzdan imzacının parmak izini güven listesindeki kurum kaydıyla karşılaştırır; tutmazsa metadata kullanılmaz. Düz istek JSON döner:

```json title="Sadeleştirilmiş örnek: kurum metadata'sı"
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

Dikkat edilecek noktalar. Her yapılandırma bir `scope` ilan eder; HAIP her yapılandırma için bir kapsam ister, cüzdan da onu yetkilendirme isteğinde kullanır. Tamga hem yapılandırma kimliği hem kapsam olarak `vct` URN'sini kullanır. Belgeler anahtara bağlı olduğu için `nonce_endpoint` vardır. `key_attestations_required`, kurumun kabul ettiği anahtar saklama düzeylerini sayar. Kopya politikası cüzdana her doğrulayıcı için ayrı kopya kullanmasını, iki kopya kalınca ya da süre bitimine yedi gün kala yeni paket almasını söyler.

`/.well-known/oauth-authorization-server/example-university` adresindeki yetkilendirme sunucusu metadata'sı (RFC 8414) şunları ekler: `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]`, içinde `attest_jwt_client_auth` geçen `token_endpoint_auth_methods_supported`; cüzdandan başlayan ihraç açıksa `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` ve `code_challenge_methods_supported: ["S256"]`.

## Kurumun başlattığı teklif nasıl işler?

Kurum bir **belge teklifi** (credential offer) oluşturur ve QR kod ya da bağlantı olarak gösterir. QR küçük kalsın diye Tamga yalnız `credential_offer_uri` gönderir; cüzdan teklif nesnesini oradan çeker. Adres tek kullanımlıktır ve beş dakikada düşer; ikinci istek 404 alır.

```json title="Sadeleştirilmiş örnek: ön yetkili kodlu teklif"
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

`tx_code`, QR kodu kişinin omzunun üstünden fotoğraflayan birine karşı ikinci etkendir. Tamga'da ön yetkili akışta atlanamaz, altı hanelidir, üç yanlış deneme teklifi düşürür ve teklifle asla aynı kanaldan gitmez:

| Teklif sınıfı | Nerede görünür | Ömür | Kişi kendisi olduğunu nasıl gösterir |
|---|---|---|---|
| ekranda | portal ekranı, kişi oturum açmış | 5 dk, tek kullanım | oturum içinde gösterilen `tx_code` |
| kanal dışı | e-posta ya da SMS ile QR/bağlantı | en çok 72 saat, tek kullanım | *öbür* kanaldan, kurum kayıtlarındaki adrese giden `tx_code` |
| kimliğe bağlı | kurumun kendi kanalından bağlantı | 7 gün, tek kullanım | kimlik belgesini göstererek (yetkilendirme kodu, `issuer_state`) |

## Token isteği neye benzer, neden DPoP?

```http title="Sadeleştirilmiş örnek: DPoP ve cüzdan doğrulamalı token isteği"
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

```json title="Token yanıtı"
{ "access_token": "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NiJ9…", "token_type": "DPoP", "expires_in": 300 }
```

**DPoP** (RFC 9449) erişim belirtecini bir anahtara bağlar. Cüzdan her ihraç akışı için geçici bir P-256 anahtar üretir ve `jwk`, `jti`, `htm`, `htu` ve `iat` taşıyan bir `dpop+jwt` kanıtı imzalar. Kurum belirteci anahtarın parmak izine bağlar; çalınan belirteç anahtar olmadan işe yaramaz. Belge ucuna giden istekler `Authorization: DPoP <belirteç>` ve belirtecin SHA-256'sı olan `ath`'ı taşıyan yeni bir kanıtla gelir. Sunucu `DPoP-Nonce` başlığıyla `use_dpop_nonce` derse cüzdan o nonce ile bir kez yeniden dener; HAIP cüzdanların buna hazır olmasını ister. Tamga'da erişim belirteci beş dakika yaşar.

İki `OAuth-Client-Attestation` başlığı **cüzdan doğrulamasıdır**: HAIP'in kullandığı, OAuth'un doğrulamaya dayalı istemci kimlik doğrulaması. İlki cüzdan sağlayıcının imzaladığı, sağlayıcı sertifikası `x5c`'de olan bir JWT'dir; ikincisi doğrulamanın `cnf`'sindeki anahtarla imzalanmış, `aud`'u kurum olan bir sahiplik kanıtıdır. Kurum imza sertifikasının güven listesindeki bir cüzdan sağlayıcıya ait olduğunu denetler; değilse belirteç vermez (`invalid_client`). HAIP'e göre doğrulamanın `sub`'ı bir cüzdan ürününün bütün kurulumlarında aynı olmalıdır, yani telefona özgü bir değer taşımaz; ağdaki cüzdanlardan Tamga Wallet ürün kimliğini kullanır. Kısa ömürlü Wallet Instance Attestation (24 saatten kısa, her işlemde yeni anahtar ve yeni iptal kaydı) ayrıca `client_status` taşır; kurum bunu cüzdan sağlayıcının durum listesine karşı denetler. Kurumun bu kanıtlara neden güvendiği [Cüzdana nasıl güvenilir?](/blog/trusting-a-wallet) yazısında.

## Cüzdandan başlayan akış PAR ve PKCE'yi nasıl kullanır?

Kişi uygulamadaki listeden bir kurum seçtiğinde (liste ayrı bir dizin sunucusundan değil, güven listesinden okunur) cüzdan yetkilendirme kodu akışını başlatır:

```http title="Sadeleştirilmiş örnek: PAR isteği"
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

PAR (RFC 9126) yetkilendirme parametrelerini arka kanaldan giden bir isteğe taşır; S256'lı PKCE (RFC 7636) de kodu akışı başlatan cüzdana bağlar. HAIP ikisini de FAPI 2.0 üzerinden şart koşar. `client_id`, cüzdan doğrulamasının `sub`'ıdır. `redirect_uri` PAR'da sabitlenir ve kayıtlı bir adresle birebir aynı olmalıdır. Kimliğe bağlı teklifte cüzdan `issuer_state`'i de gönderir.

`/authorize` adımında Tamga kurumu ağa özgü bir şey yapar: giriş sayfası yerine, kişinin kimlik belgesi için imzalı bir OpenID4VP isteği döner. Cüzdan olağan gösterim akışını çalıştırır; kurum gösterimi doğrulama hattının tamamından geçirir ve kişiyi kendi kayıtlarıyla eşleştirir; başarılıysa en çok 60 saniye geçerli, tek kullanımlık bir `code` ile yönlendirir. Token isteği bu kez `grant_type=authorization_code`, `code`, `code_verifier`, aynı `redirect_uri` ve aynı cüzdan doğrulamasını taşır.

## Anahtar kanıtları ve 10'lu paket nasıl gönderilir?

Önce cüzdan bir nonce ister. Bu uç belirteç istemez ve `Cache-Control: no-store` ile yanıt verir:

```http title="Nonce ucu"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Her `c_nonce` bir kez ve bölünmez biçimde tüketilir; "önce denetle, sonra sil" arasındaki bir yarış, tek kanıtın iki kez kullanılmasına yol açardı. Sonra cüzdan cihaz anahtarlarını güvenli donanımda üretir ve belge isteğini gönderir:

```http title="Sadeleştirilmiş örnek: on kanıtlı belge isteği"
POST /example-university/credential HTTP/1.1
Host: issuer.tamga.network
Authorization: DPoP eyJ0eXAiOiJhdCtqd3Qi…
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIs…
Content-Type: application/json

{
  "credential_configuration_id": "urn:tamga:edu:DiplomaCredential:1",
  "proofs": {
    "jwt": [
      "<anahtar 1 ile imzalı openid4vci-proof+jwt>",
      "<… anahtar 2 …>",
      "…",
      "<… anahtar 10 …>"
    ]
  }
}
```

Her kanıtın başlığında `typ: openid4vci-proof+jwt`, `alg: ES256` ve `jwk` içinde açık anahtar; gövdesinde `aud` (kurum kimliği), `iat` ve `nonce` vardır. Kurum her kanıtı denetler, on anahtarın **hepsinin farklı** olduğuna bakar ve on belge verir; her kopyanın `cnf`'sine o kanıtın anahtarını koyar:

```json title="Belge yanıtı (kısaltılmış)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… dokuz tane daha …"
  ]
}
```

Her dizgi boş bir `~` ile biter: cüzdan göstermeden KB-JWT yoktur ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). Kimlik belgesinde her nesne ayrıca aynı anahtara bağlı bir `mso_mdoc` taşır ([ISO mdoc ayrıntılı](/blog/iso-mdoc-deep-dive)).

![On anahtar, on kanıt, on kopya](/blog/openid4vci-deep-dive/tr/fig-batch.png)

Neden on ayrı anahtar? Her kopya aynı `cnf`'yi taşısaydı, bilgi paylaşan iki doğrulayıcı kopyaları birbirine bağlayabilir, paket hiçbir şeyi korumazdı. Her kopya kendi rastgele durum listesi sırasını da alır; kopyalar `idx` üzerinden de bağlanamaz. Bir belge iptal edildiğinde kurum bütün kopyaların sıralarını birlikte işaretler; kopya ile sıra arasındaki eşleşme kurumun kendi veritabanında kalır. Bu kural diploma dahil bütün belge türleri için geçerlidir.

**Anahtar kanıtı** (key attestation) ile paket tek bir kanıtla da istenebilir. Kanıtın başlığı `key_attestation` taşır: cüzdan sağlayıcının imzaladığı, `attested_keys` listesini ve saklama düzeylerini bildiren bir JWT. Kanıt ilk doğrulanmış anahtarla imzalanır. Kurum anahtar kanıtını, iptal durumunu ve nonce'u denetler, kurumun en düşük anahtar saklama düzeyini uygular ve her doğrulanmış anahtara bir kopya bağlar. OpenID4VCI 1.0 bu biçimi Ek D'de tanımlar.

## Tamga ertelenmiş ihracı kullanıyor mu?

Profil onu tek bir durum için tarif ediyor: mezuniyet kararı henüz onaylanmamış bir diploma. Kuralları da var: bir `transaction_id` en çok 30 gün yaşar, sorgulama `interval`'ı en az 300 saniyedir ve cüzdan bekleme süresini katlayarak artırır; çünkü düzenli sorgulama kuruma "bu kişi hâlâ bekliyor" sinyali verir. Bugün hiçbir Tamga kurumu bunu sunmuyor: metadata'da `deferred_credential_endpoint` yok, diploma ancak imzalanabildiğinde teklif ediliyor. OpenID4VCI 1.0 Final'de ertelenmiş yanıt, `transaction_id` ve `interval` taşıyan HTTP 202'dir; hâlâ bekleyen bir ertelenmiş istek de yine HTTP 202 alır. Eski taslaklara göre yazılmış uygulamalar bunun yerine `issuance_pending` hatası bekler.

## Cüzdan hangi hataları karşılamalı?

| Hata | Anlamı | Cüzdan ne yapar |
|---|---|---|
| `invalid_proof` | kanıt eksik, geçersiz ya da nonce'suz | yeni `c_nonce` al, yeniden dene |
| `invalid_nonce` | nonce bayat ya da kullanılmış | yeni `c_nonce` al, yeniden dene |
| `invalid_credential_request` | bozuk istek | bildir, yeniden deneme |
| `unknown_credential_configuration` | yapılandırma sunulmuyor | metadata'yı yenile |
| `credential_request_denied` | yetki yok ya da geri alındı | yeniden deneme |
| `invalid_client` (token) | cüzdan doğrulaması eksik, geçersiz ya da iptal | dur |
| `invalid_token` | erişim belirtecinin süresi doldu | akışı baştan başlat |

Hata yanıtları kişisel veri taşımaz. "Bu kişiye ait kayıt yok" yanıtı `credential_request_denied` olarak döner; ayrıntı kurumun kendi denetim kaydında kalır.

## Sık sorulan sorular

### `tx_code` neden hiç QR kodun içinde olmaz?

Çünkü QR kodu başkası görebilir ya da fotoğraflayabilir. Kod onunla birlikte gitseydi o kişi belgeyi kendi cüzdanına alabilirdi. İkisini ayrı kanallara bölmek, ikisinin birden ele geçirilmesini gerektirir.

### HAIP ön yetkili kod akışını şart koşuyor mu?

Hayır. HAIP yetkilendirme kodu akışını şart koşar. Tamga ikisini de destekler: portalı kişiyi zaten tanıyan kurumlar için ön yetkili teklif, cüzdandan başlayan istekler için PAR, PKCE ve kimlik gösterimli yetkilendirme kodu akışı.

### Kurum bir kopyanın hangi doğrulayıcıda kullanıldığını anlayabilir mi?

Hayır. Kurum gösterimleri görmez; kopyalar ne anahtar ne durum sırası paylaşır. Bilgi paylaşan doğrulayıcılar bile onları belge üzerinden bağlayamaz.

### Kopyalar bitince ne olur?

İki kopya kalınca cüzdan, tek kullanımlık ve DPoP'a bağlı bir yenileme belirteciyle yeni paket ister. Tanıdığı bir doğrulayıcıda o doğrulayıcının kopyasını kullanmaya devam eder; yeni bir doğrulayıcıda bir kopyayı yeniden kullanmadan önce kişiye sorar.

## Kaynaklar

- [OpenID for Verifiable Credential Issuance 1.0, Final, 16 Eylül 2025](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 9449: OAuth 2.0 Demonstrating Proof of Possession (DPoP), IETF](https://www.rfc-editor.org/rfc/rfc9449)
- [RFC 9126: OAuth 2.0 Pushed Authorization Requests, IETF](https://www.rfc-editor.org/rfc/rfc9126)
- [OpenID4VCI profili (SPEC-PROTO-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/openid4vci)
- [Belge verme, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/issuance)
- [ADR-0025: Cüzdan örneği ve anahtar kanıtları, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations)
- [Kurum olarak belge verme, Tamga Network belgeleri](https://docs.tamga.network/tr/guides/issue-credentials)
- [`@tamga-network/issuer`, Tamga Network belgeleri](https://docs.tamga.network/tr/packages/issuer)

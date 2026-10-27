---
title: "OpenID4VCI ayrıntılı: teklif, DPoP, kanıt, 10'lu paket"
slug: openid4vci-deep-dive
description: Tamga'da OpenID4VCI 1.0 ile belge vermeyi anlatıyoruz; teklif ve tx_code, PAR ve PKCE, DPoP, nonce ucu, sahiplik kanıtları, cüzdan kanıtı ve 10 kopyalık paket.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Kaynak: OpenID4VCI 1.0 Final (16 Eylül 2025): Nonce Endpoint §7 (yalnız c_nonce, no-store), proofs §8.2, ertelenmiş ihraç §9 (HTTP 202 + transaction_id + interval), bildirim olayları §11, imzalı metadata typ openidvci-issuer-metadata+jwt, anahtar kanıtı typ key-attestation+jwt (Ek D). HAIP 1.0 Final (24 Aralık 2025) §4. SPEC-PROTO-0001 v1.0.0 (2026-10-08). Kod: @tamga-network/issuer oid4vci.ts, wallet-core authcode.ts, dpop.ts, oid4vci.ts; platform issuer (c_nonce 300 sn). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0, cüzdanın bir kurumdan belge almak için kullandığı OAuth tabanlı protokoldür. Cüzdan token ucundan bir erişim belirteci, **nonce ucundan** da taze bir `c_nonce` alır. Ardından anahtarlarının sahiplik kanıtlarını **belge ucuna** gönderir ve belge ucu, sahipliği kanıtlanan her anahtar için bir belge döndürür. Tamga bunun üzerine HAIP 1.0 profilini uyguluyor. Bu profilde belirteçler DPoP'a bağlıdır, yetki kodu akışında PAR ve PKCE kullanılır, token ucunda cüzdan kanıtı (wallet attestation) istenir, anahtar kanıtları (key attestation) desteklenir ve belge, 10 ayrı anahtara bağlı 10 kopyalık bir paket olarak verilir.

OpenID4VCI 1.0, 16 Eylül 2025'te Final oldu. Taslaklara göre yazılmış kodda iki değişiklik hâlâ sorun çıkarıyor. `c_nonce` artık token yanıtından değil nonce ucundan geliyor. Sahiplik kanıtları da tekil `proof` alanı yerine, dizilerden oluşan bir nesne olan `proofs` içinde gönderiliyor. Tamga'nın profili [SPEC-PROTO-0001](https://docs.tamga.network/tr/specifications/openid4vci) adlı belgede yazılı.

![Tamga'da belge vermenin iki başlangıcı](/blog/openid4vci-deep-dive/tr/fig-flows.png)

> **Not:** Örnekler sadeleştirildi. Adresler ve kimlikler örnek değerlerdir, JWT'ler kısaltıldı ve imzalar gösterilmiyor.

## Cüzdan başlamadan önce neyi okur?

Her Tamga kurumu, barındırılan issuer servisinin altında bir yol olarak yer alır. Bu yüzden kurumun metadata adresi, well-known adresin yola eklenmiş biçimini kullanır:

```http title="Kurum metadata isteği (örnek kurum)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` başlığıyla istendiğinde kurum **imzalı metadata** döndürür. Bu metadata'nın `typ` değeri `openidvci-issuer-metadata+jwt` olur ve kurum onu, sertifikası `x5c` alanında duran belge imza anahtarıyla imzalar. Cüzdan, imzalayan sertifikanın parmak izini güven listesindeki kurum kaydıyla karşılaştırır. Parmak izi uyuşmazsa metadata kullanılmaz. Başlıksız bir istek ise düz JSON döndürür:

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

Bu metadata'da birkaç noktaya dikkat etmek gerekiyor. Her yapılandırma bir `scope` değeri taşıyor, çünkü HAIP her yapılandırma için bir kapsam istiyor ve cüzdan bu kapsamı yetki isteğinde kullanıyor. Tamga, `vct` URN'sini hem yapılandırma kimliği hem de kapsam olarak kullanıyor. Belgeler anahtara bağlı olduğu için `nonce_endpoint` da yer alıyor. `key_attestations_required`, kurumun kabul ettiği anahtar saklama düzeylerini listeliyor. Yeniden kullanım politikası da cüzdana her doğrulayıcı için ayrı bir kopya kullanmasını ve iki kopya kaldığında ya da belgenin süresinin bitmesine yedi gün kaldığında yeni bir paket almasını söylüyor.

`/.well-known/oauth-authorization-server/example-university` adresindeki yetkilendirme sunucusu metadata'sı (RFC 8414) bunlara birkaç alan daha ekliyor. Bunlar `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]` ve içinde `attest_jwt_client_auth` bulunan `token_endpoint_auth_methods_supported` alanları. Cüzdanın başlattığı belge verme açıksa `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` ve `code_challenge_methods_supported: ["S256"]` alanları da metadata'da yer alıyor.

## Kurumun başlattığı teklif nasıl işler?

Kurum bir **belge teklifi** (credential offer) oluşturur ve bunu bir QR kod ya da bağlantı olarak gösterir. QR kodun küçük kalması için Tamga yalnız `credential_offer_uri` değerini gönderir ve cüzdan teklif nesnesini bu adresten alır. Adres yalnız bir kez kullanılabilir ve beş dakika sonra geçersiz olur. Adres ikinci kez istendiğinde 404 yanıtı döner.

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

`tx_code`, QR kodu kişinin omzunun üzerinden fotoğraflayan birine karşı ikinci bir güvenlik katmanıdır. Tamga'da ön yetkili akışta bu kod atlanamaz. Kod altı hanelidir, üç yanlış deneme teklifi geçersiz kılar ve kod hiçbir zaman teklifle aynı kanaldan gönderilmez:

| Teklif sınıfı | Nerede görünür | Ömrü | Kişi kendisi olduğunu nasıl gösterir |
|---|---|---|---|
| ekranda | portal ekranında, kişi oturum açmışken | 5 dk, tek kullanımlık | oturum içinde gösterilen `tx_code` ile |
| kanal dışı | e-posta ya da SMS ile gönderilen QR ya da bağlantı | en çok 72 saat, tek kullanımlık | *öbür* kanaldan, kurum kayıtlarındaki adrese gönderilen `tx_code` ile |
| kimliğe bağlı | kurumun kendi kanalından gönderilen bağlantı | 7 gün, tek kullanımlık | kimlik belgesini göstererek (yetki kodu, `issuer_state`) |

## Token isteği neye benzer, DPoP neden gerekli?

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

**DPoP** (RFC 9449), erişim belirtecini bir anahtara bağlar. Cüzdan her belge verme işlemi için geçici bir P-256 anahtarı üretir ve `jwk`, `jti`, `htm`, `htu` ve `iat` alanlarını taşıyan bir `dpop+jwt` kanıtı imzalar. Kurum belirteci bu anahtarın parmak izine bağlar. Böylece çalınan bir belirteç, anahtar olmadan işe yaramaz. Belge ucuna giden istekler `Authorization: DPoP <belirteç>` başlığını ve belirtecin SHA-256 özeti olan `ath` alanını taşıyan yeni bir kanıtı içerir. Sunucu `DPoP-Nonce` başlığıyla birlikte `use_dpop_nonce` yanıtını verirse, cüzdan bu nonce ile isteği bir kez daha dener. HAIP cüzdanların buna hazır olmasını istiyor. Tamga'da erişim belirteçleri beş dakika geçerli.

İki `OAuth-Client-Attestation` başlığı **cüzdan kanıtını** taşır. Bu, HAIP'in kullandığı ve OAuth'ta kanıta dayalı istemci kimlik doğrulaması diye bilinen yöntemdir. İlk başlık, cüzdan sağlayıcısının imzaladığı ve sağlayıcının sertifikasını `x5c` alanında taşıyan bir JWT'dir. İkincisi ise kanıttaki `cnf` anahtarıyla imzalanmış ve `aud` değeri kurum olan bir sahiplik kanıtıdır. Kurum, imzalayan sertifikanın güven listesindeki bir cüzdan sağlayıcısına ait olup olmadığını denetler. Değilse belirteç vermez ve `invalid_client` hatası döndürür. HAIP'e göre kanıttaki `sub` değerinin bir cüzdan ürününün bütün kurulumlarında aynı olması gerekir, bu yüzden bu alan telefona özgü bir değer taşımaz. Ağdaki cüzdanlardan biri olan Tamga Wallet, burada ürününün kimliğini kullanıyor. Kısa ömürlü Wallet Instance Attestation ise 24 saatten kısa sürer ve her işlemde yeni bir anahtar ve yeni bir iptal kaydıyla üretilir. Bu kanıt ayrıca `client_status` alanını taşır ve kurum bu alanı cüzdan sağlayıcısının durum listesine karşı denetler. Kurumun bu kanıtlara neden güvendiğini [Cüzdana nasıl güvenilir?](/blog/trusting-a-wallet) yazısında anlattık.

## Cüzdanın başlattığı akış PAR ve PKCE'yi nasıl kullanır?

Kişi uygulamadaki listeden bir kurum seçtiğinde cüzdan yetki kodu akışını başlatır. Bu liste ayrı bir dizin sunucusundan değil, güven listesinden okunur:

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

PAR (RFC 9126), yetki isteğinin parametrelerini tarayıcı yerine arka kanaldan giden bir isteğe taşır. S256 yöntemiyle kullanılan PKCE (RFC 7636) de yetki kodunu, akışı başlatan cüzdana bağlar. HAIP, FAPI 2.0 üzerinden ikisini de şart koşuyor. `client_id`, cüzdan kanıtındaki `sub` değeridir. `redirect_uri` PAR isteğinde sabitlenir ve kayıtlı bir adresle birebir aynı olmalıdır. Kimliğe bağlı bir teklifte cüzdan `issuer_state` değerini de gönderir.

`/authorize` adımında Tamga kurumu ağa özgü bir şey yapar. Kişiye bir giriş sayfası göstermek yerine, kişinin kimlik belgesini isteyen imzalı bir OpenID4VP isteği döndürür. Cüzdan olağan gösterim adımlarını uygular. Kurum gösterimi doğrulama hattının bütün adımlarından geçirir ve kişiyi kendi kayıtlarıyla eşleştirir. Bu başarılı olursa kişiyi en çok 60 saniye geçerli ve tek kullanımlık bir `code` ile geri yönlendirir. Ardından gelen token isteği `grant_type=authorization_code` değerini, `code` ve `code_verifier` değerlerini, aynı `redirect_uri` adresini ve aynı cüzdan kanıtını taşır.

## Sahiplik kanıtları ve 10'lu paket nasıl gönderilir?

Cüzdan önce bir nonce ister. Bu uç bir belirteç istemez ve yanıtı `Cache-Control: no-store` başlığıyla döndürür:

```http title="Nonce ucu"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Her `c_nonce` yalnız bir kez ve bölünemez bir işlemle tüketilir. "Önce denetle, sonra sil" biçiminde iki adımlı bir işlem, aradaki bir yarış durumunda aynı kanıtın iki kez kullanılmasına yol açabilirdi. Ardından cüzdan cihaz anahtarlarını güvenli donanımda üretir ve belge isteğini gönderir:

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

Her kanıtın başlığında `typ: openid4vci-proof+jwt`, `alg: ES256` ve `jwk` içinde açık anahtar bulunur. Gövdesinde ise `aud` (kurumun kimliği), `iat` ve `nonce` alanları yer alır. Kurum her kanıtı denetler ve on anahtarın **hepsinin birbirinden farklı** olduğuna bakar. Ardından on belge verir ve her kopyanın `cnf` alanına o kopyanın kanıtındaki anahtarı yazar:

```json title="Belge yanıtı (kısaltılmış)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… dokuz tane daha …"
  ]
}
```

Her dizgi boş bir `~` ile biter, çünkü KB-JWT ancak cüzdan belgeyi gösterdiğinde eklenir ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). Kimlik belgesinde her nesne ayrıca aynı anahtara bağlı bir `mso_mdoc` da taşır ([ISO mdoc ayrıntılı](/blog/iso-mdoc-deep-dive)).

![On anahtar, on kanıt, on kopya](/blog/openid4vci-deep-dive/tr/fig-batch.png)

On ayrı anahtar kullanılmasının bir nedeni var. Her kopya aynı `cnf` değerini taşısaydı, bilgi paylaşan iki doğrulayıcı kopyaları birbirine bağlayabilirdi ve paket hiçbir şeyi korumamış olurdu. Her kopya durum listesinde de kendi rastgele sırasını alır, bu yüzden kopyalar `idx` üzerinden de birbirine bağlanamaz. Bir belge iptal edildiğinde kurum bütün kopyaların sıralarını birlikte işaretler. Hangi kopyanın hangi sıraya karşılık geldiği ise yalnız kurumun kendi veritabanında tutulur. Bu kural diploma dahil bütün belge türlerinde geçerli.

**Anahtar kanıtı** (key attestation) kullanıldığında paket tek bir sahiplik kanıtıyla da istenebilir. Bu durumda kanıtın başlığı bir `key_attestation` alanı taşır. Bu alan, cüzdan sağlayıcısının imzaladığı, `attested_keys` listesini ve anahtarların saklama düzeyini bildiren bir JWT'dir. Sahiplik kanıtı da listedeki ilk anahtarla imzalanır. Kurum anahtar kanıtını, onun iptal durumunu ve nonce değerini denetler, kurumun istediği en düşük anahtar saklama düzeyini uygular ve listedeki her anahtara bir kopya bağlar. OpenID4VCI 1.0 bu biçimi Ek D'de tanımlıyor.

## Tamga ertelenmiş belge vermeyi kullanıyor mu?

Profil ertelenmiş belge vermeyi tek bir durum için tarif ediyor. Bu durum, mezuniyet kararı henüz onaylanmamış bir diploma. Bunun kendine özgü kuralları da var. Bir `transaction_id` en çok 30 gün geçerli, sorgulama aralığı (`interval`) en az 300 saniye ve cüzdan bekleme süresini her seferinde katlayarak artırıyor. Bunun nedeni, düzenli aralıklarla yapılan sorgulamanın kuruma "bu kişi hâlâ bekliyor" bilgisini vermesi. Bugün hiçbir Tamga kurumu ertelenmiş belge vermeyi sunmuyor. Metadata'da `deferred_credential_endpoint` yok ve diploma ancak imzalanabilecek durumdaysa teklif ediliyor. OpenID4VCI 1.0 Final'de ertelenmiş yanıt, `transaction_id` ve `interval` taşıyan bir HTTP 202 yanıtıdır. Hâlâ bekleyen bir ertelenmiş istek de yine HTTP 202 alır. Eski taslaklara göre yazılmış uygulamalar ise bunun yerine `issuance_pending` hatası bekliyor.

## Cüzdan hangi hataları karşılamalı?

| Hata | Anlamı | Cüzdan ne yapar |
|---|---|---|
| `invalid_proof` | kanıt eksik, geçersiz ya da nonce içermiyor | yeni bir `c_nonce` alır ve yeniden dener |
| `invalid_nonce` | nonce eskimiş ya da kullanılmış | yeni bir `c_nonce` alır ve yeniden dener |
| `invalid_credential_request` | istek bozuk | durumu bildirir, yeniden denemez |
| `unknown_credential_configuration` | yapılandırma sunulmuyor | metadata'yı yeniler |
| `credential_request_denied` | yetki yok ya da yetki geri alınmış | yeniden denemez |
| `invalid_client` (token) | cüzdan kanıtı eksik, geçersiz ya da iptal edilmiş | işlemi durdurur |
| `invalid_token` | erişim belirtecinin süresi dolmuş | akışı baştan başlatır |

Hata yanıtları kişisel veri taşımaz. Örneğin "bu kişiye ait kayıt yok" durumu `credential_request_denied` hatasıyla bildirilir ve ayrıntı kurumun kendi denetim kaydında kalır.

## Sık sorulan sorular

### `tx_code` neden hiçbir zaman QR kodun içinde olmaz?

QR kodu başka biri görebilir ya da fotoğraflayabilir. Kod QR ile birlikte gönderilseydi, o kişi belgeyi kendi cüzdanına alabilirdi. İkisini ayrı kanallardan göndermek, belgeyi ele geçirmek isteyen birinin iki kanalı birden ele geçirmesini gerektirir.

### HAIP ön yetkili kod akışını şart koşuyor mu?

Hayır. HAIP yetki kodu akışını şart koşuyor. Tamga ise iki akışı da destekliyor. Portalı kişiyi zaten tanıyan kurumlar için ön yetkili teklifi, cüzdanın başlattığı istekler için de PAR, PKCE ve kimlik gösterimi içeren yetki kodu akışını kullanıyor.

### Kurum bir kopyanın hangi doğrulayıcıda kullanıldığını anlayabilir mi?

Hayır. Kurum gösterimleri görmez ve kopyalar ne anahtar ne de durum sırası paylaşır. Bu yüzden bilgi paylaşan doğrulayıcılar bile kopyaları belge üzerinden birbirine bağlayamaz.

### Kopyalar bitince ne olur?

İki kopya kaldığında cüzdan, tek kullanımlık bir yenileme belirteciyle yeni bir paket ister. Bu belirteç, belge verilirken kullanılan cüzdan kanıtının anahtarına bağlıdır. Cüzdan da bunu o anahtar için üretilmiş taze bir kanıtla gösterir, DPoP anahtarı ise değişebilir ([ADR-0060](https://docs.tamga.network/tr/adr/0060-refresh-token-client-instance-binding)). Cüzdan daha önce karşılaştığı bir doğrulayıcıda o doğrulayıcıya ayırdığı kopyayı kullanmaya devam eder. Yeni bir doğrulayıcıda ise bir kopyayı yeniden kullanmadan önce kişiye sorar.

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

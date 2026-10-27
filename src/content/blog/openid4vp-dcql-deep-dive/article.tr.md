---
title: "OpenID4VP ve DCQL ayrıntılı: istekten sonuca"
slug: openid4vp-dcql-deep-dive
description: Doğrulayıcının OpenID4VP 1.0 ile belgeyi nasıl istediğini ve denetlediğini anlatıyoruz; x509_hash ile imzalı istek, DCQL, şifreli direct_post.jwt ve A–E doğrulama hattı.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Kaynak: OpenID4VP 1.0 Final (9 Temmuz 2025) §5.9.3, §6, §8.3, Ek A, Ek B.2.6; HAIP 1.0 Final (24 Aralık 2025) §5; SPEC-PROTO-0002 v1.0.0 (PV1–PV14); SPEC-API-0001 (A–E, üç sonuç, AP3); ADR-0034; concepts/presentation (QR/bağlantı canlı, DC API doğrulayıcı hazır / cüzdan bağlantısı yok). Kod: packages/verifier request.ts, wallet-core jwe.ts, apps/verify (yanıttan sonra redirect_uri). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0, doğrulayıcının cüzdandan belge istemek için kullandığı protokoldür. Doğrulayıcı bu protokolle imzalı ve belge sahibinin cihazına bağlı bir gösterim alır. Tamga'da doğrulayıcı cüzdana **imzalı bir istek nesnesi** gönderir. Bu nesnede kendini sertifikasının özetiyle (`x509_hash`) tanıtır, ne istediğini bir **DCQL** sorgusuyla belirtir ve tek kullanımlık bir şifreleme anahtarı verir. Cüzdan da şifrelenmiş bir `vp_token` ile yanıt verir ve bu yanıtı doğrudan doğrulayıcıya gönderir (`direct_post.jwt`). Doğrulayıcı ardından biçim, şema, güven, iptal ve politika denetimlerinden oluşan sabit bir hattı çalıştırır ve üç sonuçtan birine ulaşır.

OpenID4VP 1.0, 9 Temmuz 2025'te, HAIP 1.0 ise 24 Aralık 2025'te Final oldu. Tamga'nın profili [SPEC-PROTO-0002](https://docs.tamga.network/tr/specifications/openid4vp) adlı belgede yazılı. Eski taslaklardaki Presentation Exchange (`presentation_definition`) desteklenmiyor ve bu alanı taşıyan istekler reddediliyor.

> **Not:** Örnekler sadeleştirildi. Adresler örnek değerlerdir, JWT'ler kısaltıldı, imzalar ve anahtarlar da gösterilmiyor.

## İstek cüzdana nasıl ulaşır?

Kişi başka bir cihazdaysa doğrulayıcı bir QR kod gösterir, aynı telefondaysa bir bağlantı açar. İki durumda da taşınan veri küçüktür, çünkü istek nesnesinin kendisi ayrı bir adresten alınır. HAIP'in istediği gibi bunun için `request_uri` ile JAR kullanılır:

```text title="QR kodun ya da bağlantının taşıdığı"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Cüzdan `request_uri` adresine gider ve bir JWT alır. Bu JWT'nin `typ` değeri `oauth-authz-req+jwt`, `alg` değeri `ES256` olur ve doğrulayıcının sertifika zinciri `x5c` alanında bulunur:

```json title="Sadeleştirilmiş örnek: imzalı istek nesnesinin gövdesi"
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
  "dcql_query": { "credentials": ["… aşağıda …"] },
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

`client_metadata.jwks` içindeki şifreleme anahtarı geçicidir ve HAIP'in istediği gibi yalnız bu istek için üretilir. `nonce` en az 128 bitlik rastgelelik taşır ve yalnız bir kez kabul edilir. HAIP, doğrulayıcının hem `A128GCM`'yi hem de `A256GCM`'yi listelemesini istiyor. İkisini de destekleyen bir cüzdanın `A256GCM`'yi seçmesi gerekir.

## `x509_hash` nedir, cüzdan neyi denetler?

`x509_hash` istemci kimliği, isteği imzalayan **yaprak** sertifikanın DER kodlamasının SHA-256 özetinin base64url biçimidir (OpenID4VP 1.0 §5.9.3). HAIP, imzalı isteklerde doğrulayıcının kullanması ve cüzdanın kabul etmesi gereken tek önek olarak bunu belirliyor. Tamga'nın bu yüzden tasarımını nasıl değiştirdiğini [HAIP ve Token Status List](/blog/haip-and-token-status-list) yazısında anlattık. Bu değeri kendiniz de hesaplayabilirsiniz:

```bash title="x509_hash istemci kimliğini hesaplamak"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Tamga'nın kurallarına uyan bir cüzdan, kişiye bir şey göstermeden önce aşağıdaki denetimleri yapar. Bu kuralların başvuru kütüphanesi `@tamga-network/wallet-core`.

1. İstek imzasını ve `x5c` zincirini doğrular, `client_id` içindeki özetin yaprak sertifikayla uyuştuğuna bakar.
2. `response_uri` adresindeki alan adının sertifikanın SAN alanındaki adlardan biri olduğunu denetler. Böylece eski `x509_san_dns` önekinin sağladığı güvenlik korunmuş olur.
3. `exp` değerinin bulunduğuna ve geçmediğine, `iat` değerinin en çok 60 saniye ileride olduğuna ve `aud` değerinin doğru olduğuna bakar.
4. Parmak izini imzalı güven listesinde arar. Tamga'daki doğrulayıcı kayıtları `client_id` ile aynı değeri taşır. Sertifika her yenilendiğinde özet değiştiği için kayıtlarda ayrıca kalıcı bir `dns_name` bulunur.
5. İstenen her alanı doğrulayıcının kayıtlı kapsamıyla karşılaştırır.

Listede olmayan bir doğrulayıcı, süreci yarıda kesen bir uyarı ekranıyla karşılanır. Listede olduğu hâlde kapsamının dışında alan isteyen bir doğrulayıcı için de fazla veri isteği uyarısı çıkar. Bu durumda kapsam dışındaki alanlar ayrıca işaretlenir ve paylaş düğmesi üç saniye sonra etkinleşir. İki durumda da paylaşım kesin olarak engellenmez, çünkü cüzdan kişinin yerine karar veren bir bekçi değil, onun adına hareket eden bir araçtır. `redirect_uri` önekiyle gelen imzasız istekler ise reddedilir. [ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) uyarınca `x509_san_dns` önekli istekler de reddedilir.

![İmzalı istekten şifreli yanıta](/blog/openid4vp-dcql-deep-dive/tr/fig-request.png)

## DCQL sorgusu nasıl yazılır?

DCQL (Digital Credentials Query Language), doğrulayıcının istediği belgeleri ve her belgeden hangi alanları istediğini listeler. Öğrenci indirimi için tek bir alan yeterlidir:

```json title="DCQL: öğrenci indirimi"
{
  "credentials": [{
    "id": "student",
    "format": "dc+sd-jwt",
    "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
    "claims": [{ "path": ["is_enrolled"], "values": [true] }]
  }]
}
```

`meta.vct_values` belge türünü belirtir ve Tamga bu alan olmadan gelen bir `dc+sd-jwt` sorgusunu reddeder. `values` ise alanı bir koşula çevirir. Belge ancak `is_enrolled` değeri `true` ise eşleşir. Cüzdan da yalnız `is_enrolled` alanını açar, başka hiçbir alanı açmaz.

Bir iş başvurusunda ise diploma **ya da** geçerli bir öğrenci belgesi kabul edilebilir ve isteğe bağlı bir alan da istenebilir:

```json title="DCQL: credential_sets ile seçenekler, claim_sets ile isteğe bağlı alan"
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

`@tamga-network/wallet-core` bu sorguyu OpenID4VP §6.4'e göre şöyle yorumlar:

- Zorunlu bir kümede, doğrulayıcının belirttiği sırayla karşılayabildiği **ilk** seçeneği önerir. Kişi, karşılanabilen başka bir seçeneği de seçebilir. Doğrulayıcıya yalnız seçilen seçenek gönderilir.
- İsteğe bağlı bir küme (`required: false`) varsayılan olarak kapalıdır ve ancak kişi açarsa paylaşılır.
- `claim_sets` varsa, belgenin karşılayabildiği ilk alan bileşimi açılır. Bu örnekte tez başlığı olan bir diploma üç alan, tez başlığı olmayan bir diploma ise iki alan gönderir.
- İstenen alanlardan biri eksik olan bir belge **hiçbir zaman** gönderilmez. `thesis_title` düz bir `claims` listesinde olsaydı, tezsiz bir diploma sorguyla hiç eşleşmezdi. `claim_sets` tam da bu durum için var.
- Onay ekranının anlaşılır kalması için bir istekte en çok üç belge ve iki `credential_sets` kaydı bulunabilir.

mdoc'ta alan yolu `[ad alanı, öğe]` biçimindedir ve belge türü `meta.doctype_value` alanına yazılır ([ISO mdoc ayrıntılı](/blog/iso-mdoc-deep-dive)). HAIP ayrıca `aki` türündeki `trusted_authorities` desteğini de şart koşuyor. Bu alan, belge sorgusunu sertifika zincirinde belirli bir Authority Key Identifier bulunan kurumlarla sınırlar. Tamga'nın doğrulayıcısı da cüzdan kütüphanesi de bunu destekliyor.

## Cüzdan geri ne gönderir?

`vp_token`, her DCQL `id` değerini bir gösterim dizisiyle eşleyen bir haritadır:

```json title="Sadeleştirilmiş örnek: şifrelenmeden önce vp_token"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Her SD-JWT VC gösterimi bir KB-JWT ile biter. Bu KB-JWT'nin `aud` değeri **tam** istemci kimliğidir (`x509_hash:Uvo3…`), `nonce` değeri isteğin nonce değeridir ve `sd_hash` değeri de tam olarak gösterilen disclosure'ları kapsar ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). mdoc'ta ise değer base64url biçiminde bir `DeviceResponse` yapısıdır ve bu yapıdaki cihaz imzası OpenID4VP el sıkışmasını kapsar.

`direct_post.jwt` kullanıldığında nesnenin tamamı, doğrulayıcının geçici anahtarına göre bir JWE olarak şifrelenir. Burada `alg: ECDH-ES` (P-256) ve `enc: A256GCM` ya da `A128GCM` kullanılır. Şifreli nesne bir form alanı olarak gönderilir:

```http title="Sadeleştirilmiş örnek: şifreli yanıt"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS zaten varken yanıtı ayrıca şifrelememizin bir nedeni var. Gösterim kişisel veri taşır ve TLS bağlantısının sona erdiği nokta ile uygulama arasında istek gövdesini görebilen ters vekil sunucular, güvenlik duvarları ve günlükler bulunur. JWE kullanıldığında gösterimi yalnız geçici anahtarın sahibi okuyabilir. Tamga şifresiz bir yanıt biçimi kullanmıyor.

Kişi paylaşmayı reddederse cüzdan, gerekçe belirtmeden `access_denied` döndürür. "Bu belge bende yok" ile "paylaşmamayı seçtim" yanıtları aynı görünmelidir. Aksi hâlde bir doğrulayıcı farklı sorgular göndererek kişinin elinde hangi belgelerin bulunduğunu çıkarabilirdi.

## Doğrulayıcı sonuca nasıl varır?

Tamga'nın doğrulayıcısı adımları her zaman aynı sırayla çalıştırır. İlk başarısız adımda durur ve o adımın kalıcı kodunu `failed_step` alanında döndürür:

| Katman | Kodlar | Ne denetlenir |
|---|---|---|
| A, biçim | A1–A8 | kurum imzası ve zinciri, yaprak sertifikadan çıkarılan kurum kimliği, disclosure özetleri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), geçerlilik süresi |
| B, şema | B1–B6 | `vct` çözülür, `vct#integrity` katalogla uyuşur, `extends` zinciri denetlenir |
| C, güven | C1–C4 | kurum, belgenin `iat` anında listede ve bu tür için yetkili |
| D, iptal | D1–D6 | önceden indirilmiş durum listesi, imza, tazelik, çapa, `idx` sırasındaki bitler |
| E, politika | E1–E4 | güvence eşiği, istenen her alanın açılması, kapsamın aşılmaması, denetim kaydı |

Sonuç `ACCEPTED`, `REJECTED` ya da `INDETERMINATE` olur. Üçüncü sonuç, örneğin durum listesi fazla eskidiği için altyapıya ulaşılamadığını gösterir ve belge hakkında olumsuz bir şey söylemez. Bu yüzden bir retten farklı gösterilmesi gerekir. Sonuç nesnesi denetim kaydına girdiği için açılan alanların yalnız **adlarını** taşır ve değerlerini hiçbir zaman taşımaz. Kodların tam listesini [doğrulama hattı](https://docs.tamga.network/tr/specifications/verification-api) belgesinde bulabilirsiniz.

![Beş doğrulama katmanı](/blog/openid4vp-dcql-deep-dive/tr/fig-pipeline.png)

## Aynı cihaz mı, farklı cihaz mı?

| | Aynı cihaz | Farklı cihaz |
|---|---|---|
| Nasıl başlar | telefonun kendi tarayıcısındaki bir bağlantı ya da düğmeyle | başka bir ekranda gösterilen QR kodla |
| Yanıttan sonra | doğrulayıcı bir `redirect_uri` döndürür ve cüzdan o adrese gider | öbür ekrandaki sayfa sonucu kendi sunucusundan alır |
| Oltalamaya karşı dayanıklılık | yönlendirme, isteği başlatan oturuma geri döner | daha zayıf, çünkü QR kod başka birine iletilebilir |

HAIP, iki tarafın da aynı cihaz akışını desteklemesini şart koşuyor ve doğrulayıcı oturum bağlamaya dayanmıyorsa bu akışı öneriyor. Bu akışta yönlendirme hiç geri dönmezse ya da başka bir oturuma dönerse doğrulayıcının gösterimi reddetmesi gerekir. Tamga'nın barındırılan doğrulayıcısı her yanıttan sonra bir `redirect_uri` döndürüyor ve ağdaki cüzdanlar bu adrese gidiyor. Bir sitenin protokolü kendisi yazmadan bunu nasıl kurabileceğini [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında anlattık.

## Tarayıcının Digital Credentials API'si ne durumda?

W3C Digital Credentials API kullanıldığında isteği cüzdana ve yanıtı geri taşıyan şey tarayıcının kendisidir. Bu akışta `response_mode: dc_api.jwt` kullanılır. Gösterimin alıcısı da sayfanın kaynağı (origin) olur ve `origin:https://verifier.example.org` biçiminde yazılır. Bu değeri tarayıcı kendisi verdiği için bir oltalama sitesi başka bir sitenin kaynağını kendi kaynağı gibi gösteremez. Cüzdanın da istek içinde istemci kimliği olarak gelen bir `origin:` değerini hiçbir zaman kabul etmemesi gerekir. Tamga bu akışta da `x509_hash` ile imzalanmış bir istek kullanılmasını öneriyor. Kaynağa bağlama oltalama sorununu çözüyor, ama güven listesindeki kaydın bulunmasını ve fazla veri isteğinin denetlenmesini mümkün kılan şey `x509_hash`.

Bugünkü duruma bakarsak, QR kod ve bağlantıyla gösterim canlıda çalışıyor. Tamga'nın doğrulayıcısı, destekleyen tarayıcılarda Digital Credentials API'yi varsayılan olarak kullanıyor ve masaüstünde QR kodu yedek yol olarak sunuyor. Cüzdan tarafında Tamga Wallet'ın Android kodu yazıldı, ama henüz uygulamaya eklenmedi ve gerçek bir cihazda denenmedi. iPhone desteği ise henüz yok.

## Sık sorulan sorular

### Neden birçok eski kurulumda olduğu gibi `x509_san_dns` kullanılmıyor?

HAIP 1.0 imzalı isteklerde `x509_hash`'i şart koşuyor ve HAIP'e uyan bir cüzdan bu öneki kabul etmek zorunda. Tamga, `x509_san_dns`'in işe yarayan kısmını da koruyor. Yanıt adresi, imzalayan sertifikada yazılı alan adlarından birinde olmak zorunda.

### Doğrulayıcı hangi alanları paylaşmadığımı öğrenir mi?

Doğrulayıcı yalnız hangi alanların geldiğini öğrenir. Zorunlu bir küme karşılanamazsa ya da kişi paylaşmayı reddederse cüzdan, nedenini söylemeden `access_denied` döndürür.

### Birden çok şema sürümü isteyebilir miyim?

Evet. Kabul ettiğiniz her sürümü `vct_values` alanına yazın, örneğin `urn:tamga:edu:DiplomaCredential:1` ve `:2`. İkinci bir sürüm çıktığında Tamga en az iki sürümün birlikte yazılmasını öneriyor, böylece eski sürümdeki belgeyi taşıyanlar dışarıda kalmıyor.

### `transaction_data` destekleniyor mu?

Henüz desteklenmiyor. Bir gösterimi belirli bir işleme bağlamak, finans ve yetkilendirme senaryoları için planlanıyor. Eğitim senaryolarında buna ihtiyaç yok.

## Kaynaklar

- [OpenID for Verifiable Presentations 1.0, Final, 9 Temmuz 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/openid4vp)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)
- [ADR-0034: HAIP 1.0 uyumu, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)
- [Gösterim, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/presentation)
- [Sunucuda doğrulama, Tamga Network belgeleri](https://docs.tamga.network/tr/guides/verify-on-server)

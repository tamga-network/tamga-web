---
title: "OpenID4VP ve DCQL ayrıntılı: istekten sonuca"
slug: openid4vp-dcql-deep-dive
description: Doğrulayıcı OpenID4VP 1.0 ile belgeyi nasıl ister ve denetler: x509_hash'li imzalı istek, DCQL, şifreli direct_post.jwt ve A–E doğrulama hattı.
date: 2026-10-08
lang: tr
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Kaynak: OpenID4VP 1.0 Final (9 Temmuz 2025) §5.9.3, §6, §8.3, Ek A, Ek B.2.6; HAIP 1.0 Final (24 Aralık 2025) §5; SPEC-PROTO-0002 v1.0.0 (PV1–PV14); SPEC-API-0001 (A–E, üç sonuç, AP3); ADR-0034; concepts/presentation (QR/bağlantı canlı, DC API doğrulayıcı hazır / cüzdan bağlantısı yok). Kod: packages/verifier request.ts, wallet-core jwe.ts, apps/verify (yanıttan sonra redirect_uri). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0, doğrulayıcının cüzdandan belge istediği ve imzalı, cihaza bağlı bir gösterim aldığı protokoldür. Tamga'da doğrulayıcı **imzalı bir istek nesnesi** gönderir: kendini sertifikasının özetiyle (`x509_hash`) tanıtır, ne istediğini bir **DCQL** sorgusuyla söyler ve tek kullanımlık bir şifreleme anahtarı verir. Cüzdan, doğrulayıcıya gönderilen şifreli bir `vp_token` ile yanıt verir (`direct_post.jwt`). Doğrulayıcı sonra biçim, şema, güven, iptal ve politika denetimlerinden oluşan sabit bir hattı çalıştırır ve üç sonuçtan birine varır.

OpenID4VP 1.0, 9 Temmuz 2025'te; HAIP 1.0, 24 Aralık 2025'te Final oldu. Tamga profili [SPEC-PROTO-0002](https://docs.tamga.network/tr/specifications/openid4vp). Eski taslaklardaki Presentation Exchange (`presentation_definition`) desteklenmez; onu taşıyan istek reddedilir.

> **Not:** Sadeleştirilmiş örnekler. Adresler örnektir, JWT'ler kısaltıldı, imzalar ve anahtarlar gösterilmiyor.

## İstek cüzdana nasıl ulaşır?

Başka bir cihazda doğrulayıcı QR kod gösterir; aynı telefonda bir bağlantı açar. İki durumda da taşınan şey küçüktür, çünkü istek nesnesinin kendisi adresinden çekilir (HAIP'in istediği gibi `request_uri` ile JAR):

```text title="QR kodun ya da bağlantının taşıdığı"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Cüzdan `request_uri`'yi çeker ve `typ: oauth-authz-req+jwt`, `alg: ES256` olan, doğrulayıcının sertifika zincirini `x5c`'de taşıyan bir JWT alır:

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

`client_metadata.jwks` içindeki şifreleme anahtarı geçicidir, HAIP'in istediği gibi yalnız bu istek için üretilir. `nonce` en az 128 bit rastgelelik taşır ve bir kez kabul edilir. HAIP, doğrulayıcının `A128GCM` ve `A256GCM`'nin ikisini de ilan etmesini ister; ikisini de destekleyen cüzdan `A256GCM`'yi seçmelidir.

## `x509_hash` nedir, cüzdan neyi denetler?

`x509_hash` istemci kimliği, isteği imzalayan **yaprak** sertifikanın DER kodlamasının base64url SHA-256'sıdır (OpenID4VP 1.0 §5.9.3). HAIP onu, imzalı isteklerde doğrulayıcının kullanması, cüzdanın da kabul etmesi gereken tek önek yapar; Tamga'nın tasarımını bunun için nasıl değiştirdiği [HAIP ve Token Status List](/blog/haip-and-token-status-list) yazısında. Kendiniz hesaplayabilirsiniz:

```bash title="x509_hash istemci kimliğini hesaplamak"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Tamga kurallarına uyan bir cüzdan (başvuru kitaplığı `@tamga-network/wallet-core`) kişiye bir şey göstermeden önce:

1. istek imzasını ve `x5c` zincirini doğrular, `client_id`'deki özetin yaprak sertifikayla tuttuğuna bakar;
2. `response_uri` alan adının sertifikanın SAN adlarından biri olduğunu denetler; eski `x509_san_dns` önekinin güvenlik özelliği böylece korunur;
3. `exp` (zorunlu, geçmemiş), `iat` (en çok 60 saniye ileride) ve `aud` değerlerine bakar;
4. parmak izini imzalı güven listesinde arar. Tamga'nın doğrulayıcı kayıtları `client_id` ile aynı değeri taşır; sertifika her yenilendiğinde özet değiştiği için bir de kalıcı `dns_name` vardır;
5. istenen her alanı doğrulayıcının kayıtlı kapsamıyla karşılaştırır.

Listede olmayan doğrulayıcı, akışı kesen bir uyarı ekranıyla karşılanır. Listede olup kapsamı dışında alan isteyen doğrulayıcıda aşırı talep uyarısı çıkar: kapsam dışı alanlar ayrıca işaretlenir, paylaş düğmesi üç saniye bekler. İkisi de kesin olarak engellenmez; cüzdan kişinin bekçisi değil, vekilidir. `redirect_uri` önekli (imzasız) istekler reddedilir; [ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) uyarınca `x509_san_dns` istekleri de.

![İmzalı istekten şifreli yanıta](/blog/openid4vp-dcql-deep-dive/tr/fig-request.png)

## DCQL sorgusu nasıl yazılır?

DCQL (Digital Credentials Query Language), doğrulayıcının istediği belgeleri ve her biri için alanları listeler. Öğrenci indirimi tek alan ister:

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

`meta.vct_values` türü adlandırır; Tamga bu alan olmadan gelen bir `dc+sd-jwt` sorgusunu reddeder. `values` alanı bir koşula çevirir: belge ancak `is_enrolled` `true` ise eşleşir. Cüzdan `is_enrolled`'ı açar, başka hiçbir şeyi değil.

Bir iş başvurusu diploma **ya da** geçerli bir öğrenci belgesi kabul edebilir ve isteğe bağlı bir alan isteyebilir:

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

`@tamga-network/wallet-core` bunu OpenID4VP §6.4'e göre şöyle okur:

- Zorunlu bir kümede, doğrulayıcının sırasıyla karşılayabildiği **ilk** seçeneği önerir; kişi karşılanabilen başka bir seçeneği seçebilir. Yalnız seçilen seçenek gider.
- İsteğe bağlı bir küme (`required: false`) varsayılan olarak kapalıdır, ancak kişi açarsa paylaşılır.
- `claim_sets` varsa belgenin karşılayabildiği ilk alan bileşimi açılır. Burada tez başlığı olan diploma üç alan, olmayan iki alan gönderir.
- İstenen bir alanı eksik olan belge **asla** gönderilmez. `thesis_title` düz bir `claims` listesinde olsaydı, tezsiz diploma hiç eşleşmezdi; `claim_sets` tam bunun içindir.
- Bir istekte en çok üç belge ve iki `credential_sets` kaydı olabilir; onay ekranı anlaşılır kalsın diye.

mdoc'ta yol `[ad alanı, öğe]` biçimindedir, tür de `meta.doctype_value`'ya yazılır ([ISO mdoc ayrıntılı](/blog/iso-mdoc-deep-dive)). HAIP ayrıca `aki` türündeki `trusted_authorities` desteğini şart koşar: belge sorgusunu, zincirinde belirli bir Authority Key Identifier bulunan kurumlarla sınırlar. Tamga doğrulayıcısı da cüzdanı da bunu uygular.

## Cüzdan geri ne gönderir?

`vp_token`, her DCQL `id`'sinden bir gösterim dizisine giden bir haritadır:

```json title="Sadeleştirilmiş örnek: şifrelenmeden önce vp_token"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Her SD-JWT VC gösterimi bir KB-JWT ile biter: `aud`'u **tam** istemci kimliği (`x509_hash:Uvo3…`), `nonce`'u isteğin nonce'u, `sd_hash`'i de tam olarak gösterilen disclosure'ları kapsar ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). mdoc'ta değer, cihaz imzası OpenID4VP el sıkışmasını kapsayan base64url bir `DeviceResponse`'tur.

`direct_post.jwt` ile nesnenin tamamı doğrulayıcının geçici anahtarına bir JWE olarak şifrelenir (`alg: ECDH-ES`, P-256; `enc: A256GCM` ya da `A128GCM`) ve form alanı olarak gönderilir:

```http title="Sadeleştirilmiş örnek: şifreli yanıt"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS zaten varken neden şifreleme? Gösterim kişisel veri taşır; TLS'in bittiği yerle uygulama arasında istek gövdesini görebilen ters vekiller, güvenlik duvarları ve kayıtlar durur. JWE ile onu yalnız geçici anahtarın sahibi okuyabilir. Tamga şifresiz yanıt biçimi kullanmaz.

Kişi reddederse cüzdan, gerekçe vermeden `access_denied` döner. "Bu belge bende yok" ile "paylaşmamayı seçtim" aynı görünmelidir; yoksa doğrulayıcı farklı sorgular göndererek kişinin elinde ne olduğunu haritalayabilirdi.

## Doğrulayıcı sonuca nasıl varır?

Tamga doğrulayıcısı adımları sabit bir sırayla çalıştırır, ilk başarısızlıkta durur ve o adımın kalıcı kodunu `failed_step` olarak döner:

| Katman | Kodlar | Ne denetlenir |
|---|---|---|
| A, biçim | A1–A8 | kurum imzası ve zinciri, yaprak sertifikadan kurum kimliği, disclosure özetleri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), süre |
| B, şema | B1–B6 | `vct` çözülür, `vct#integrity` katalogla tutar, `extends` zinciri |
| C, güven | C1–C4 | kurum belgenin `iat` anında listede ve bu tür için yetkili |
| D, iptal | D1–D6 | önceden indirilmiş durum listesi, imza, tazelik, çapa, `idx`'teki bitler |
| E, politika | E1–E4 | güvence eşiği, istenen her alan açılmış, kapsam aşılmamış, denetim kaydı |

Sonuç `ACCEPTED`, `REJECTED` ya da `INDETERMINATE`'tir. Üçüncüsü altyapıya ulaşılamadığını söyler (örneğin bayat bir durum listesi) ve belge aleyhine bir şey demez; retten farklı gösterilmelidir. Sonuç nesnesi açılan alanların yalnız **adlarını** taşır, değerlerini asla; çünkü denetim kaydına girer. Kod listesinin tamamı [doğrulama hattında](https://docs.tamga.network/tr/specifications/verification-api).

![Beş doğrulama katmanı](/blog/openid4vp-dcql-deep-dive/tr/fig-pipeline.png)

## Aynı cihaz mı, farklı cihaz mı?

| | Aynı cihaz | Farklı cihaz |
|---|---|---|
| Nasıl başlar | telefonun kendi tarayıcısında bağlantı ya da düğme | başka bir ekranda QR kod |
| Yanıttan sonra | doğrulayıcı `redirect_uri` döner, cüzdan oraya gider | öbür ekrandaki sayfa sonucu kendi sunucusundan alır |
| Oltalamaya dayanıklılık | yönlendirme, isteği başlatan oturuma döner | daha zayıf: QR kod başkasına aktarılabilir |

HAIP iki tarafın da aynı cihaz akışını desteklemesini ister; oltalamaya karşı oturum bağlamaya dayanan doğrulayıcılara yalnız bu akışı kullanmalarını önerir. Bu akışta yönlendirme hiç dönmezse ya da başka bir oturuma dönerse doğrulayıcı gösterimi reddetmelidir. Tamga'nın barındırılan doğrulayıcısı her yanıttan sonra bir `redirect_uri` döner; ağdaki cüzdanlar da onu izler. Bir sitenin protokolü kendisi yazmadan bunu nasıl kuracağı [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında.

## Tarayıcının Digital Credentials API'si ne durumda?

W3C Digital Credentials API'de isteği cüzdana ve yanıtı geri tarayıcının kendisi taşır; `response_mode: dc_api.jwt` kullanılır. Gösterimin alıcısı o zaman sayfanın kaynağıdır (`origin:https://verifier.example.org`) ve bunu tarayıcının kendisi verir: oltalama sitesi başka bir sitenin kaynağını iddia edemez. Cüzdan, istek içinde istemci kimliği olarak `origin:`'i asla kabul etmemelidir. Tamga bu akışta da `x509_hash`'li imzalı istek önerir; kaynak bağlama oltalamayı çözer, kayıt sorgusunu ve aşırı talep denetimini mümkün kılan ise `x509_hash`'tir.

Bugünkü durum: QR ve bağlantıyla gösterim canlıda. Tamga doğrulayıcısı Digital Credentials API'ye hazır; cüzdanın ona bağlantısı henüz yok.

## Sık sorulan sorular

### Neden birçok eski kurulum gibi `x509_san_dns` kullanılmıyor?

HAIP 1.0 imzalı isteklerde `x509_hash`'i şart koşar; HAIP'e uyan bir cüzdan onu kabul etmek zorundadır. Tamga `x509_san_dns`'in işe yarayan kısmını korur: yanıt adresi, imzalayan sertifikada yazılı bir alan adında olmalıdır.

### Doğrulayıcı hangi alanları reddettiğimi öğrenir mi?

Hangi alanların geldiğini öğrenir. Zorunlu bir küme karşılanamazsa ya da kişi reddederse cüzdan, nedenini söylemeden `access_denied` döner.

### Birden çok şema sürümü isteyebilir miyim?

Evet. Kabul ettiğiniz her sürümü `vct_values`'a yazın, örneğin `urn:tamga:edu:DiplomaCredential:1` ve `:2`. İkinci sürüm çıktığında Tamga en az ikisini birden yazmayı önerir; eski belge sahipleri dışarıda kalmasın.

### `transaction_data` destekleniyor mu?

Henüz değil. Bir gösterimi belirli bir işleme bağlamak, finans ve yetkilendirme senaryoları için planlanıyor; eğitim senaryolarının buna ihtiyacı yok.

## Kaynaklar

- [OpenID for Verifiable Presentations 1.0, Final, 9 Temmuz 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/openid4vp)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)
- [ADR-0034: HAIP 1.0 uyumu, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)
- [Gösterim, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/presentation)
- [Sunucuda doğrulama, Tamga Network belgeleri](https://docs.tamga.network/tr/guides/verify-on-server)

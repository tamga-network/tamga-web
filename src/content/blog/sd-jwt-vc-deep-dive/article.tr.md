---
title: "SD-JWT VC ayrıntılı: imza, disclosure ve KB-JWT"
slug: sd-jwt-vc-deep-dive
description: Bir SD-JWT VC bayt bayt nasıl kurulur ve denetlenir; tuzlu özetler, _sd, cnf, KB-JWT ve sd_hash, vct#integrity ve status, Tamga profiliyle.
date: 2026-10-08
lang: tr
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Kaynak: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9; SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b); SPEC-CRED-0003 (status); şema kataloğu (vct URN, W3C SRI, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vektör sürüm 2, sahte kişi verisi; issuer adresi örnek yolla değiştirildi); canlı katalogda urn:tamga:edu:DiplomaCredential:1 content_hash = vektördeki vct#integrity (2026-10-08 denetlendi). RFC 9901 (Kasım 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Ağustos 2026, IESG değerlendirmesinde). HAIP 1.0 Final §6. -->

SD-JWT VC, kurumun imzaladığı bir JWT'dir; alan değerleri yerine tuzlu SHA-256 özetleri taşır ve yanında `~` ile birleştirilmiş **disclosure**'lar (tuzlanmış değerlerin kendisi) gelir. Belge sahibi bir alanı göstermek için o alanın disclosure'ını gönderir, gizlemek için göndermez; her gösterimi cihaz anahtarıyla imzalanan bir **KB-JWT** kapatır.

İşin içinde iki standart var. **SD-JWT** yöntemin kendisidir; IETF onu Kasım 2025'te RFC 9901 olarak yayımladı. **SD-JWT VC** bunun üstündeki belge profilidir (`draft-ietf-oauth-sd-jwt-vc`); 19. sürüm (31 Ağustos 2026) IESG değerlendirmesinde. Tamga'nın bayt düzeyindeki profili [SPEC-CRED-0002](https://docs.tamga.network/tr/specifications/sd-jwt-vc).

> **Not:** Aşağıdaki bütün örnekler Tamga'nın herkese açık uyum vektöründen (`sd-jwt/diploma-basic`) alındı: kişi verisi sahte, özel anahtar yok. Kurum adresini örnek bir yolla değiştirdik, sertifikaları kısalttık. İmzalar gösterilmiyor; örnekleri sadeleştirilmiş sayın.

## Kurum tam olarak neyi imzalıyor?

İmzalı JWT'nin sıradan bir JOSE başlığı ve gizlenebilen alanların yerine özetlerin konduğu bir gövdesi vardır:

```json title="Sadeleştirilmiş örnek: imzalı JWT'nin başlığı ve gövdesi"
{
  "alg": "ES256",
  "typ": "dc+sd-jwt",
  "x5c": ["MIICCzCCAbCgAwIBAgIC…"]
}
{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=",
  "iat": 1790619528,
  "cnf": {
    "jwk": {
      "kty": "EC", "crv": "P-256",
      "x": "hFEM1avAMSadeciYwVO0nJ6aMEM8YDCTigu_GO4tqgM",
      "y": "R-5AIVbUthAPOiJm4-2U8aB1Oppfyjl84HhDZrLqdfU"
    }
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  },
  "_sd_alg": "sha-256",
  "_sd": [
    "5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo",
    "9xI8VcNCjl8OcW6W0n30e_LGJ4lm3ah3SAEVEI4pM38",
    "FJqsIjUpFitVLNSAhwL-3LcB-_4YoIupLGFhC5WhdMs",
    "IpStBdfeq4pqVfpP9xFH2ZM46lojLf7cqcEpDBk9OV4",
    "JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4",
    "kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI",
    "…6 tane daha, sıralı"
  ]
}
```

Açıkta duran alanlar, doğrulayıcının başka bir şeyi okuyabilmesi için önce bilmesi gerekenlerdir. Tamga'da bunlar tür tanımında `sd: "never"` diye işaretlidir ve hiçbir zaman gizlenemez:

| Alan | Neden açıkta |
|---|---|
| `iss` | kayıtlı kurumla tutarlılık denetimi |
| `vct`, `vct#integrity` | türün çözülmesi ve sabitlenmesi |
| `iat` | güven denetimleri bu ana göre yapılır |
| `cnf` | KB-JWT'yi doğrulamak için gerekir |
| `status` | iptal sorgusu |
| `_sd_alg`, `_sd` | yöntemin kendisi |
| `exp` | türde varsa |

Taslak 19, `iat`'ın da seçici paylaşılabilmesine izin veriyor. Tamga onu açıkta tutar, çünkü doğrulayıcı güven katmanına "bu kurum bu türü bugün verebilir mi?" diye değil, "bu kurum bu türü `iat` anında verebilir miydi?" diye sorar.

Başlıktaki `x5c` kurumun sertifika zincirini taşır: önce yaprak sertifika, kök sertifika yok. HAIP 1.0 `x5c` ile anahtar çözmeyi zorunlu tutar; Tamga'da `x5c` olmadan belge geçmez. Doğrulayıcı kurumun kimliğini `iss`'ten değil, **yaprak sertifikanın parmak izinden** çıkarır. `iss`'e güvenseydi, aynı kök altında geçerli sertifikası olan herhangi bir kurum `iss`'e başka bir üniversitenin adresini yazıp kendi anahtarıyla imza atabilirdi.

`typ` değeri `dc+sd-jwt`. Taslak Kasım 2024'e kadar `vc+sd-jwt` kullanıyordu; bir W3C ortam türüyle çakışmasın diye değiştirildi. Tamga kurumları yalnız `dc+sd-jwt` üretir; doğrulayıcı da `vc+sd-jwt`'yi reddeder. Dış ekosistem belgeleri için bir uyumluluk bayrağı var, varsayılan olarak kapalı.

## Disclosure nasıl kurulur, neden dizginin özeti alınır?

Disclosure üç elemanlı bir JSON dizisidir: `[tuz, ad, değer]`. UTF-8'e çevrilir, sonra dolgusuz base64url ile kodlanır. Tuz 16 rastgele bayttır (128 bit) ve her disclosure için yenidir. Vektördeki gösterimin dört disclosure'ı:

```text title="Uyum vektöründeki disclosure'lar, çözülmüş hâlleri ve özetleri"
WyJJY3NEZDFmdmh6bS1mcVpTNDJLb1p3IiwiZXFmX2xldmVsIiw2XQ
  → ["IcsDd1fvhzm-fqZS42KoZw","eqf_level",6]
  → 5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo

WyJoY0FvdmV4bmpkTFd3aF9sN1hkM1ZBIiwiaXNfZ3JhZHVhdGUiLHRydWVd
  → ["hcAovexnjdLWwh_l7Xd3VA","is_graduate",true]
  → kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI

WyJSc3ZSUXY2cDhGM3NfRXRBSXFQTnpnIiwiZmFtaWx5X25hbWUiLCLDlnJuZWsiXQ
  → ["RsvRQv6p8F3s_EtAIqPNzg","family_name","Örnek"]
  → JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4

WyJjazFtMktWejdVWEg2cTlMNEJad1BRIiwiZ2l2ZW5fbmFtZSIsIlZla3TDtnIiXQ
  → ["ck1m2KVz7UXH6q9L4BZwPQ","given_name","Vektör"]
  → sHl3d9xOXRVt7kU78VQvmAjq4kZzrWjyyJV1sBfRA1M
```

Özet şöyle hesaplanır: `base64url(SHA-256(disclosure dizgisinin ASCII baytları))`. Yukarıdaki dört özetin dördü de gövdedeki `_sd` dizisinde var.

SD-JWT kodunda en sık görülen hata, disclosure'ı çözüp diziyi yeniden JSON'a çevirmek ve onun özetini almaktır. JSON yazımı tek biçimli değildir: virgülden sonra bir boşluk ya da `ö` yerine `ö` yazmak başka baytlar, başka bir özet demektir. Tamga'nın şartnamesi bunu `given_name: "Ayşe"` örneğiyle gösterir: boşluksuz ve kaçışsız yeniden yazınca `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` özeti `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU` olur. Doğrulayıcı için kural basit: **dizginin özetini geldiği gibi alın, sonra çözün.** Tersi asla.

![Bir alandan imzalı gövdedeki özete dört adım](/blog/sd-jwt-vc-deep-dive/tr/fig-disclosure.png)

## `_sd` neden sıralı, sahte özet neden yok?

Tamga `_sd` dizisini artan bayt sırasına dizer. Sıralanmasa özetler kurumun alanları işlediği sırada durur; bu da çoğu zaman şemadaki sıradır. Doğrulayıcı gizli özetleri şemanın alan listesiyle hizalayıp hangi alanların saklandığını çıkarabilirdi.

RFC 9901 kaç alanın gizlendiğini bulanıklaştırmak için **sahte özet** (decoy), yani hiçbir disclosure'a karşılık gelmeyen kayıtlar eklemeye de izin verir. Tamga bunu yasaklar. `vct` açıkta ve tür tanımı bütün alanları listeliyor; sayı zaten biliniyor. Kurumdan kuruma değişen sahte özet sayısı da kendi başına bir parmak izine dönüşür, her sahte özet de QR koduna 43 karakter ekler. Asıl yan kanal değişen bir disclosure kümesidir; bu yüzden Tamga'nın cüzdan kuralları, ağdaki cüzdanların aynı doğrulayıcıya ve aynı türe hep aynı kümeyi göstermesini ister.

İki sınır daha var: iç içe seçici paylaşım en çok iki düzey, dizi elemanlarını tek tek gizleme ise şimdilik kullanılmıyor.

## Cihaz bağlama nasıl çalışır, KB-JWT neyi imzalar?

`cnf.jwk`, belge verilirken telefonun güvenli donanımında üretilen P-256 anahtarın açık yarısıdır (kurum onu cüzdanın anahtar kanıtından kopyalar; bkz. [OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive)). Özel yarı cihazdan hiç çıkmaz. Tamga'da `cnf`'siz belge de, KB-JWT'siz gösterim de geçersizdir. Standart anahtar bağlamayı isteğe bırakır; HAIP, belge cihaza bağlıysa her gösterimde KB-JWT ister; Tamga ise her belgeyi cihaza bağlar.

Gösterimde cüzdan yalnız doğrulayıcının istediği ve kişinin onayladığı disclosure'ları bırakır, sonuna bir KB-JWT ekler:

![Cüzdanda saklanan ve doğrulayıcıya giden](/blog/sd-jwt-vc-deep-dive/tr/fig-anatomy.png)

```json title="Uyum vektöründeki KB-JWT (başlık ve gövde)"
{ "alg": "ES256", "typ": "kb+jwt" }
{
  "nonce": "conf-nonce-0001",
  "aud": "x509_hash:9OGMDF0OXzjg3FX8kOjh9tUnI7A5VhSc1mweK1ElZ_Q",
  "iat": 1790705928,
  "sd_hash": "-SOR78_i6a2u-_oX-jovk7jVjCrsZYIe35q4lixd8NE"
}
```

`nonce` doğrulayıcının tek kullanımlık meydan okumasıdır; kaydedilmiş bir gösterim yeniden oynatılamaz. `aud`, doğrulayıcının önekiyle birlikte **tam** istemci kimliğidir; OpenID4VP'de bu, `x509_hash:` ile erişim sertifikasının parmak izidir ([OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive)). `iat` doğrulayıcının saatine en çok 300 saniye uzak olabilir.

Aradaki birinin bir disclosure'ı silmesini `sd_hash` engeller:

```text title="sd_hash'e ne girer"
sd_hash = base64url( SHA-256( şu dizginin ASCII baytları:
  "<imzalı JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Yalnız gösterilen disclosure'lar girer; sondaki `~` da hesaba dahildir. `sd_hash` olmasa biri diploma gösteriminden `grade` disclosure'ını çıkarabilir, iki imza da yine doğrulanırdı.

Kapsamı unutmayın: geçerli bir KB-JWT, belgeye bağlı anahtarın elde tutulduğunu kanıtlar. Telefonu hangi insanın tuttuğunu kanıtlamaz.

## `vct` ve `vct#integrity` ne işe yarar?

`vct` belgenin türünü adlandırır. Tamga URN kullanır: `urn:tamga:<alan>:<Tür>:<ana sürüm>`; böylece bir alan adı değişse de kimlik değişmez. Tür tanımı (Type Metadata), açık katalogun URN'den eşlediği bir HTTPS adresinde durur; taslak 19 buna "kayıt defterinden çözme" der (§5.3.2). Diploma için `https://schemas.tamga.network/v1/catalogue.json`, `urn:tamga:edu:DiplomaCredential:1` türünü tanım dosyasına ve `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` içerik özetine eşler; bu, vektördeki `vct#integrity` ile aynı dizgidir.

Bütünlük değeri W3C Subresource Integrity biçimindedir: `sha256-` ve ardından belgenin ham baytlarının base64 SHA-256'sı. Yayımlanan dosya bayt bayt aynı kalmalıdır; hiçbir ara katman onu yeniden biçimlendiremez. Standart `vct#integrity`'yi isteğe bırakır, Tamga zorunlu tutar; böylece doğrulayıcıya, kurumun imzalarken dayandığından başka bir tür tanımı verilemez. Her alanın `sd` politikası (`always`, `allowed`, `never`) da tür tanımında yazılıdır ve Tamga kurumları gizlenmesine izin verilen her alanı gizler.

## `status` alanı neyi gösterir?

`status.status_list` bir sıra numarası (`idx`) ve bir Token Status List adresi taşır. Doğrulayıcı daha önce indirdiği imzalı, sıkıştırılmış listede o sıradaki iki biti okur: `0` geçerli, `1` iptal, `2` askıda; `3` kullanılmaz ve iptal sayılır. Tamga sıra numaralarını rastgele dağıtır, liste adreslerini anlamsız tutar ve doğrulayıcıların listeleri belli aralıklarla önceden indirmesini ister; böylece kurum belgenin ne zaman denetlendiğini öğrenemez. Taslak 19, gösterilen durum listesinin JWT biçiminde olmasını şart koşar. İşleyiş ve gizlilik kuralları: [HAIP ve Token Status List](/blog/haip-and-token-status-list).

## Doğrulayıcı bir SD-JWT VC'yi hangi sırayla denetlemeli?

Tamga her doğrulama adımına kalıcı bir kod verir; doğrulayıcı ilk başarısız adımın kodunu `failed_step` olarak döner. Önce biçim katmanı çalışır:

| Kod | Denetim |
|---|---|
| A1 | `~` ile böl; son parça boş değil, KB-JWT olmalı |
| A2 | başlık: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` var |
| A3 | zincir listedeki bir köke varıyor, ara sertifikalar CA, JWT imzası geçerli |
| A3b | kurum kimliği `iss`'ten değil, yaprak sertifikanın parmak izinden |
| A3c | yaprak sertifika iptal edilmemiş |
| A3d | `cnf` var |
| A4 | `_sd_alg` = `sha-256` |
| A5 | her disclosure: dizginin özetini al, `_sd`'de bul, sonra çöz |
| A6 | KB-JWT: `cnf` ile imza, `aud`, `nonce`, ±300 sn içinde `iat`, `sd_hash` |
| A7 | `exp` geçmemiş, `nbf` gelmiş |
| A8 | aynı özet iki kez yok, açık bir alanın üstüne yazan disclosure yok |

İkisine ayrıca bakın. A5, özeti `_sd`'de olmayan her disclosure'ı reddeder; kabul edilseydi herkes kurumun hiç imzalamadığı alanlar ekleyebilirdi. A8, adı örneğin `iss` ya da `vct` olan bir disclosure'ı reddeder; yoksa açıktaki alanın üstüne yazardı.

Biçim katmanından sonra şema denetimleri (B1–B6: `vct`'yi çöz, bütünlük özetini katalogla karşılaştır, `extends` zincirini izle), imzalı güven listesine karşı güven denetimleri (C1–C4: kurum `iat` anında listede ve bu tür için yetkili miydi), iptal (D1–D6) ve doğrulayıcının kendi politikası (E1–E4) gelir. Sonuç üç değerlidir: kabul, ret ya da durum listesi gibi bir altyapıya ulaşılamadığında "şu an doğrulanamıyor". "Şu an denetleyemiyorum", hiçbir zaman "geçersiz" diye bildirilmez. Kod listesinin tamamı [doğrulama hattında](https://docs.tamga.network/tr/specifications/verification-api).

Bunların hepsini bizim kullandığımız baytlarla kendiniz koşturabilirsiniz: vektör, beş olumsuz durumu (KB-JWT yok, yanlış nonce, 301 saniye kaymış `iat`, eşleşmeyen disclosure, süresi geçmiş belge) ve koşucu, açık deponun [conformance klasöründe](https://github.com/tamga-network/tamga-network/tree/main/conformance).

## Tamga profili standarda göre neyi değiştiriyor?

| Konu | Standart | Tamga |
|---|---|---|
| İmza | birçok algoritma | yalnız ES256 |
| `_sd_alg` | birçok | `sha-256`, açıkça yazılır |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` varsayılan olarak reddedilir |
| Kurum anahtarı | `iss` metadata'sı, `x5c` ya da başka | `x5c` zorunlu, kök dahil değil |
| Anahtar bağlama | isteğe bağlı | her belgede zorunlu |
| Sahte özet | serbest | yasak |
| `_sd` sırası | belirtilmemiş | sıralı |
| `vct#integrity` | isteğe bağlı | zorunlu |
| İç içe disclosure | serbest | en çok iki düzey |

Geri kalan her şey RFC 9901 ve taslak 19'u izler. Tamga doğrulayıcısı, Tamga'nın kendi kurumundan farklı yazılmış disclosure'ları da doğrular, çünkü dizilerin değil dizgilerin özetini alır.

## Sık sorulan sorular

### Tamga belgelerini genel bir SD-JWT kütüphanesiyle doğrulayabilir miyim?

Evet, disclosure dizgilerinin özetini geldiği gibi alıyor ve anahtar bağlamayı zorunlu tutmanıza izin veriyorsa. Üstüne Tamga profilinin denetimlerini ekleyin: yalnız ES256, listedeki bir köke varan `x5c` zinciri, yaprak sertifikadan kurum kimliği, zorunlu KB-JWT ve `vct#integrity`. `@tamga-network/sd-jwt` ve `@tamga-network/verifier` paketleri bunların hepsini yapar.

### `aud` neden yalnız alan adı değil de tam istemci kimliği?

Çünkü cüzdanın doğruladığı şey istemci kimliğidir. OpenID4VP'de doğrulayıcı `x509_hash:` ve sertifika parmak iziyle tanınır; KB-JWT'yi tam olarak bu değere bağlamak, gösterimi başka herkes için işe yaramaz kılar.

### Bir alanı gizlemek kurumun imzasını değiştirir mi?

Hayır. Gizlemek, disclosure'ı `~` ile birleşmiş dizgiden çıkarmaktır. İmzalı JWT hiçbir zaman yeniden imzalanmaz ya da değiştirilmez.

### Neden 128 bitlik tuz?

Doğum tarihi gibi düşük çeşitlilikli bir değerin özeti, bütün olası tarihler denenerek bulunabilirdi. Her disclosure için yeni bir 16 baytlık tuz bunu imkânsız kılar; aynı alanın iki belgede aynı özeti vermesini de önler.

## Kaynaklar

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, Kasım 2025](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, Ağustos 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/sd-jwt-vc)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)
- [Şema kataloğu (Type Metadata, vct#integrity), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/schema-catalog)
- [Uyum vektörleri ve koşucu, Tamga Network deposu](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network belgeleri](https://docs.tamga.network/tr/packages/sd-jwt)

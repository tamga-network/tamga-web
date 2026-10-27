---
title: "SD-JWT VC ayrıntılı: imza, disclosure ve KB-JWT"
slug: sd-jwt-vc-deep-dive
description: Bir SD-JWT VC'nin bayt bayt nasıl kurulduğunu ve denetlendiğini Tamga profiliyle anlatıyoruz; tuzlu özetler, _sd, cnf, KB-JWT ve sd_hash, vct#integrity ve status.
date: 2026-10-08
lang: tr
updated: 2026-10-19
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Kaynak: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9; SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b); SPEC-CRED-0003 (status); şema kataloğu (vct URN, W3C SRI, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vektör sürüm 2, sahte kişi verisi; issuer adresi örnek yolla değiştirildi); canlı katalogda urn:tamga:edu:DiplomaCredential:1 content_hash = vektördeki vct#integrity (2026-10-08 denetlendi). RFC 9901 (Kasım 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Ağustos 2026, IESG değerlendirmesinde). HAIP 1.0 Final §6. -->

SD-JWT VC, kurumun imzaladığı bir JWT'dir ve alan değerleri yerine bu değerlerin tuzlanmış SHA-256 özetlerini taşır. JWT'nin yanında, `~` işaretiyle birleştirilmiş **disclosure**'lar gelir. Disclosure'lar, tuzlanmış değerlerin kendisidir. Belge sahibi bir alanı göstermek istediğinde o alanın disclosure'ını gönderir, gizlemek istediğinde göndermez. Her gösterimin sonuna da belge sahibinin cihaz anahtarıyla imzaladığı bir **KB-JWT** eklenir.

Burada iki standart söz konusu. **SD-JWT** yöntemin kendisidir ve IETF onu Kasım 2025'te RFC 9901 olarak yayımladı. **SD-JWT VC** ise bunun üzerine kurulan belge profilidir (`draft-ietf-oauth-sd-jwt-vc`) ve 19. sürümü (31 Ağustos 2026) IESG değerlendirmesinde bekliyor. Tamga'nın bayt düzeyindeki profili [SPEC-CRED-0002](https://docs.tamga.network/tr/specifications/sd-jwt-vc) adlı belgede yazılı.

> **Not:** Aşağıdaki örneklerin hepsini Tamga'nın herkese açık uyum vektörü `sd-jwt/diploma-basic`'ten aldık. Vektördeki kişi verisi sahte ve içinde özel anahtar yok. Kurum adresini örnek bir yolla değiştirdik ve sertifikaları kısalttık. İmzalar gösterilmediği için örnekleri sadeleştirilmiş kabul edin.

## Kurum tam olarak neyi imzalıyor?

İmzalı JWT'nin sıradan bir JOSE başlığı ve bir gövdesi vardır. Gövdede gizlenebilen alanların yerinde bu alanların özetleri durur:

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

Açıkta duran alanlar, doğrulayıcının başka bir şeyi okuyabilmesi için önce bilmesi gereken alanlardır. Tamga'da bu alanlar tür tanımında `sd: "never"` olarak işaretlenir ve hiçbir zaman gizlenemez:

| Alan | Neden açıkta |
|---|---|
| `iss` | kayıtlı kurumla tutarlılık denetimi için |
| `vct`, `vct#integrity` | türün çözülmesi ve sabitlenmesi için |
| `iat` | güven denetimleri bu ana göre yapıldığı için |
| `cnf` | KB-JWT'yi doğrulamak için |
| `status` | iptal durumunu sorgulamak için |
| `_sd_alg`, `_sd` | yöntemin kendisi oldukları için |
| `exp` | türde varsa |

Taslak 19, kurumun `iat` alanını da seçici olarak paylaşılabilir yapmasına izin veriyor. Tamga bu alanı açıkta tutuyor, çünkü doğrulayıcı güven katmanına kurumun bu türü bugün verip veremeyeceğini değil, `iat` anında verip veremediğini soruyor.

Başlıktaki `x5c` alanı kurumun sertifika zincirini taşır. Zincirde önce yaprak sertifika yer alır, kök sertifika ise eklenmez. HAIP 1.0 anahtarın `x5c` üzerinden bulunmasını zorunlu tutuyor ve Tamga'da `x5c` olmayan bir belge doğrulamadan geçmiyor. Doğrulayıcı kurumun kimliğini `iss` alanından değil, **yaprak sertifikanın parmak izinden** çıkarır. `iss` alanına güvenseydi, aynı kök altında geçerli sertifikası olan herhangi bir kurum `iss` alanına başka bir üniversitenin adresini yazıp belgeyi kendi anahtarıyla imzalayabilirdi.

`typ` değeri `dc+sd-jwt`. Taslak Kasım 2024'e kadar `vc+sd-jwt` kullanıyordu ve bu değer bir W3C ortam türüyle çakışmasın diye değiştirildi. Tamga kurumları yalnız `dc+sd-jwt` üretiyor ve doğrulayıcı `vc+sd-jwt` değerini reddediyor. Dış ekosistemlerden gelen belgeler için bir uyumluluk seçeneği var, ama bu seçenek varsayılan olarak kapalı.

## Disclosure nasıl kurulur, neden dizginin özeti alınır?

Disclosure, `[tuz, ad, değer]` biçiminde üç elemanlı bir JSON dizisidir. Dizi UTF-8 olarak kodlanır, ardından dolgusuz base64url ile kodlanır. Tuz 16 rastgele bayttan (128 bit) oluşur ve her disclosure için yeniden üretilir. Vektördeki gösterimde bulunan dört disclosure şunlar:

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

Özet, `base64url(SHA-256(disclosure dizgisinin ASCII baytları))` formülüyle hesaplanır. Yukarıdaki dört özetin hepsi gövdedeki `_sd` dizisinde yer alıyor.

SD-JWT kodunda en sık görülen hata, disclosure'ı çözüp diziyi yeniden JSON'a çevirmek ve sonra bunun özetini almaktır. JSON'un yazılışı tek biçimli değildir. Virgülden sonra bir boşluk bırakmak ya da `ö` harfini `ö` olarak yazmak farklı baytlar ve dolayısıyla farklı bir özet üretir. Tamga'nın şartnamesi bunu `given_name: "Ayşe"` için oluşturulmuş bir disclosure üzerinden gösteriyor. Dizi boşluk ve kaçış karakteri olmadan yeniden yazıldığında `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` özeti `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU` oluyor. Doğrulayıcılar için kural basit: **önce dizginin özetini geldiği gibi alın, sonra dizgiyi çözün.** Bu sıra hiçbir zaman tersine çevrilmez.

![Bir alandan imzalı gövdedeki özete dört adım](/blog/sd-jwt-vc-deep-dive/tr/fig-disclosure.png)

## `_sd` neden sıralı, sahte özet neden yok?

Tamga `_sd` dizisini artan bayt sırasına göre diziyor. Dizi sıralanmasaydı, özetler kurumun alanları işlediği sırada dururdu ve bu sıra çoğu zaman şemadaki sıradır. Doğrulayıcı da gizli özetleri şemadaki alan listesiyle yan yana koyarak hangi alanların gizlendiğini çıkarabilirdi.

RFC 9901, kaç alanın gizlendiğini belirsizleştirmek için **sahte özetler** (decoy) eklenmesine de izin veriyor. Bunlar hiçbir disclosure'a karşılık gelmeyen kayıtlardır. Tamga ise sahte özetleri yasaklıyor. `vct` açıkta duruyor ve tür tanımı bütün alanları listeliyor, yani alan sayısı zaten herkesçe biliniyor. Kurumdan kuruma değişen sahte özet sayısı da başlı başına bir parmak izine dönüşürdü. Ayrıca her sahte özet QR koda 43 karakter ekliyor. Asıl bilgi sızıntısı, gösterilen disclosure kümesinin değişmesinden kaynaklanıyor. Bu yüzden Tamga'nın cüzdan kuralları, ağdaki cüzdanların aynı doğrulayıcıya aynı tür için her seferinde aynı kümeyi göstermesini istiyor.

Profilde iki sınır daha var. İç içe seçici paylaşım en fazla iki düzeye izin veriyor ve dizi elemanlarını tek tek gizleme özelliği şimdilik kullanılmıyor.

## Cihaz bağlama nasıl çalışır, KB-JWT neyi imzalar?

`cnf.jwk`, belge verilirken telefonun güvenli donanımında üretilen P-256 anahtarının açık yarısıdır. Kurum bu anahtarı, cüzdanın gönderdiği sahiplik kanıtından kopyalar ([OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive)). Anahtarın özel yarısı cihazdan hiç çıkmaz. Tamga'da `cnf` içermeyen bir belge de, KB-JWT içermeyen bir gösterim de geçersizdir. Standart anahtar bağlamayı isteğe bırakıyor. HAIP ise belge cihaza bağlıysa her gösterimde KB-JWT istiyor ve Tamga her belgeyi cihaza bağlıyor.

Gösterim sırasında cüzdan, yalnız doğrulayıcının istediği ve kişinin onayladığı disclosure'ları bırakır ve sonuna bir KB-JWT ekler:

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

`nonce`, doğrulayıcının yalnız bir kez kullanılabilen meydan okuma değeridir. Bu sayede kaydedilmiş bir gösterim yeniden kullanılamaz. `aud`, doğrulayıcının önekiyle birlikte **tam** istemci kimliğidir. OpenID4VP'de bu değer, `x509_hash:` önekinden ve doğrulayıcının erişim sertifikasının parmak izinden oluşur ([OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive)). `iat` ise doğrulayıcının saatinden en fazla 300 saniye farklı olabilir.

Aradaki birinin bir disclosure'ı silmesini `sd_hash` engeller:

```text title="sd_hash'e ne girer"
sd_hash = base64url( SHA-256( şu dizginin ASCII baytları:
  "<imzalı JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Hesaba yalnız gösterilen disclosure'lar girer ve sondaki `~` da hesaba dahildir. `sd_hash` olmasaydı, biri bir diploma gösteriminden `grade` disclosure'ını çıkarabilirdi ve iki imza da yine geçerli görünürdü.

Bu yöntemin kapsamını da hatırlatalım. Geçerli bir KB-JWT, belgeye bağlı anahtarın elde tutulduğunu kanıtlar. Telefonu hangi insanın tuttuğunu ise kanıtlamaz.

## `vct` ve `vct#integrity` ne işe yarar?

`vct` belgenin türünü adlandırır. Tamga bunun için `urn:tamga:<alan>:<Tür>:<ana sürüm>` biçiminde URN'ler kullanıyor. Böylece bir alan adı değişse bile türün kimliği değişmiyor. Tür tanımı (Type Metadata), herkese açık kataloğun URN'den eşlediği bir HTTPS adresinde duruyor. Taslak 19 bu yönteme "kayıt defterinden çözme" diyor (§5.3.2). Diploma için `https://schemas.tamga.network/v1/catalogue.json`, `urn:tamga:edu:DiplomaCredential:1` türünü tanım dosyasına ve `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` içerik özetine eşliyor. Bu değer, vektördeki `vct#integrity` alanıyla aynı dizgi.

Bütünlük değeri W3C Subresource Integrity biçimini kullanır. Değer `sha256-` önekiyle başlar ve belgenin ham baytlarının base64 biçimindeki SHA-256 özetiyle devam eder. Bu yüzden yayımlanan dosyanın bayt bayt aynı kalması gerekir ve hiçbir ara sunucu onu yeniden biçimlendiremez. Standart `vct#integrity` alanını isteğe bırakıyor, Tamga ise zorunlu tutuyor. Böylece doğrulayıcıya, kurumun belgeyi imzalarken dayandığı tanımdan başka bir tür tanımı verilemiyor. Her alanın `sd` politikası (`always`, `allowed`, `never`) da tür tanımında yazılı ve Tamga kurumları gizlenmesine izin verilen her alanı gizliyor.

## `status` alanı neyi gösterir?

`status.status_list` bir sıra numarası (`idx`) ve bir Token Status List adresi taşır. Doğrulayıcı, daha önce indirdiği imzalı ve sıkıştırılmış listede o sıradaki değeri okur. `0` geçerli, `1` iptal edilmiş anlamına gelir. Şeması askıya almaya izin veren türlerde `2` askıda demektir. `3` ise kullanılmaz ve iptal olarak değerlendirilir. Tamga sıra numaralarını rastgele dağıtıyor, liste adreslerini anlamsız dizgilerden oluşturuyor ve doğrulayıcıların listeleri belli aralıklarla önceden indirmesini istiyor. Böylece kurum, belgenin ne zaman denetlendiğini hiçbir zaman öğrenemiyor. Taslak 19, gösterilen durum listesinin JWT biçiminde olmasını şart koşuyor. İşleyişi ve gizlilik kurallarını [HAIP ve Token Status List](/blog/haip-and-token-status-list) yazısında anlattık.

## Doğrulayıcı bir SD-JWT VC'yi hangi sırayla denetlemeli?

Tamga her doğrulama adımına kalıcı bir kod veriyor ve doğrulayıcı ilk başarısız adımın kodunu `failed_step` alanında döndürüyor. İlk çalışan katman biçim katmanı:

| Kod | Denetim |
|---|---|
| A1 | `~` ile böl; son parça boş olmamalı, KB-JWT olmalı |
| A2 | başlık: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` var |
| A3 | zincir listedeki bir köke ulaşıyor, ara sertifikalar CA, JWT imzası geçerli |
| A3b | kurum kimliği `iss` alanından değil, yaprak sertifikanın parmak izinden çıkarılır |
| A3c | yaprak sertifika iptal edilmemiş |
| A3d | `cnf` var |
| A4 | `_sd_alg` = `sha-256` |
| A5 | her disclosure için önce dizginin özetini al, `_sd` içinde bul, sonra çöz |
| A6 | KB-JWT: `cnf` ile imza, `aud`, `nonce`, ±300 sn içinde `iat`, `sd_hash` |
| A7 | `exp` geçmemiş, `nbf` zamanı gelmiş |
| A8 | aynı özet iki kez kullanılmamış, açıktaki bir alanın üzerine yazan disclosure yok |

Bunlardan ikisi ayrıca açıklanmayı hak ediyor. A5, özeti `_sd` içinde bulunmayan her disclosure'ı reddeder. Bunu kabul etseydi, herkes kurumun hiç imzalamadığı alanları belgeye ekleyebilirdi. A8 ise adı, örneğin, `iss` ya da `vct` olan bir disclosure'ı reddeder, çünkü böyle bir disclosure açıktaki bir alanın üzerine yazardı.

Biçim katmanından sonra şema denetimleri gelir (B1–B6). Bu adımlarda `vct` çözülür, bütünlük özeti katalogla karşılaştırılır ve `extends` zinciri izlenir. Ardından imzalı güven listesine karşı güven denetimleri (C1–C4) yapılır ve kurumun `iat` anında listede bulunup bu tür için yetkili olup olmadığına bakılır. Sonra iptal denetimi (D1–D6) ve doğrulayıcının kendi politikası (E1–E4) çalışır. Sonuç üç değerden biridir. Belge kabul edilir, reddedilir ya da durum listesi gibi bir altyapıya ulaşılamadığında "şu an doğrulanamadı" sonucu verilir. "Şu an denetleyemiyorum" durumu hiçbir zaman "geçersiz" diye bildirilmez. Kodların tam listesini [doğrulama hattı](https://docs.tamga.network/tr/specifications/verification-api) belgesinde bulabilirsiniz.

Bu denetimlerin hepsini bizim kullandığımız baytlarla kendiniz çalıştırabilirsiniz. Vektör, beş olumsuz durumu ve bunları çalıştıran betik açık deponun [conformance klasöründe](https://github.com/tamga-network/tamga-network/tree/main/conformance) duruyor. Olumsuz durumlar KB-JWT'nin eksik olması, nonce'un yanlış olması, `iat` değerinin 301 saniye kayması, eşleşmeyen bir disclosure ve süresi geçmiş bir belgedir.

## Tamga profili standarda göre neyi değiştiriyor?

| Konu | Standart | Tamga |
|---|---|---|
| İmza | birçok algoritma | yalnız ES256 |
| `_sd_alg` | birçok seçenek | `sha-256`, açıkça yazılır |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` varsayılan olarak reddedilir |
| Kurum anahtarı | `iss` metadata'sı, `x5c` ya da başka bir yol | `x5c` zorunlu, kök sertifika eklenmez |
| Anahtar bağlama | isteğe bağlı | her belgede zorunlu |
| Sahte özet | serbest | yasak |
| `_sd` sırası | belirtilmemiş | sıralı |
| `vct#integrity` | isteğe bağlı | zorunlu |
| İç içe disclosure | serbest | en fazla iki düzey |

Bunların dışındaki her konuda Tamga RFC 9901'e ve taslak 19'a uyuyor. Tamga doğrulayıcısı, Tamga'nın kendi kurumlarından farklı biçimde yazılmış disclosure'ları da doğrulayabiliyor, çünkü dizilerin değil dizgilerin özetini alıyor.

## Sık sorulan sorular

### Tamga belgelerini genel bir SD-JWT kütüphanesiyle doğrulayabilir miyim?

Kütüphane disclosure dizgilerinin özetini geldiği gibi alıyor ve anahtar bağlamayı zorunlu tutmanıza izin veriyorsa doğrulayabilirsiniz. Bunun üzerine Tamga profilinin denetimlerini de eklemeniz gerekir. Yalnız ES256 kabul edilmeli, `x5c` zinciri listedeki bir köke ulaşmalı, kurum kimliği yaprak sertifikadan çıkarılmalı, KB-JWT ve `vct#integrity` de zorunlu tutulmalı. `@tamga-network/sd-jwt` ve `@tamga-network/verifier` paketleri bunların hepsini yapıyor.

### `aud` neden yalnız alan adı değil de tam istemci kimliği?

Cüzdanın doğruladığı değer istemci kimliğidir. OpenID4VP'de doğrulayıcı, `x509_hash:` önekiyle ve sertifikasının parmak iziyle tanınır. KB-JWT'yi tam olarak bu değere bağlamak, gösterimi başka herkes için işe yaramaz hâle getirir.

### Bir alanı gizlemek kurumun imzasını değiştirir mi?

Hayır. Bir alanı gizlemek, o alanın disclosure'ını `~` ile birleştirilmiş dizgiden çıkarmak demektir. İmzalı JWT hiçbir zaman yeniden imzalanmaz ya da değiştirilmez.

### Neden 128 bitlik tuz kullanılıyor?

Tuz olmasaydı, doğum tarihi gibi az sayıda olası değeri olan bir alanın özeti, bütün olası tarihler denenerek bulunabilirdi. Her disclosure için yeniden üretilen 16 baytlık bir tuz bunu pratikte imkânsız hâle getiriyor. Aynı alanın iki farklı belgede aynı özeti üretmesini de önlüyor.

## Kaynaklar

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, Kasım 2025](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, Ağustos 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/sd-jwt-vc)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)
- [Şema kataloğu (Type Metadata, vct#integrity), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/schema-catalog)
- [Uyum vektörleri ve çalıştırıcı betik, Tamga Network deposu](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network belgeleri](https://docs.tamga.network/tr/packages/sd-jwt)

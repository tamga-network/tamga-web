---
title: "HAIP ve Token Status List: izlenmeden yüksek güvence"
slug: haip-and-token-status-list
description: HAIP 1.0'ın neyi sabitlediğini ve Tamga'nın onu nasıl uyguladığını, Token Status List'in de belgeyi, kuruma nerede kullanıldığını söylemeden nasıl iptal ettiğini anlatıyoruz.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Kaynak: HAIP 1.0 Final (24 Aralık 2025) §3–8; ADR-0034 (K1–K5, CI1–CI6, yenileme sırası); draft-ietf-oauth-status-list-21 (21 Haziran 2026; datatracker'a göre RFC Editor kuyruğunda, 2026-10-08; başlık "Token Status List (TSL)") §4, §7, §12; SPEC-CRED-0003 v1.0.0 (taslak 20'ye atıf yapıyor); SPEC-API-0001 D1–D6. Sıkıştırma rakamları bu yazı için zlib düzey 9 ile hesaplandı (@tamga-network/sd-jwt ile aynı çağrı). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0, OpenID4VCI, OpenID4VP, SD-JWT VC ve ISO mdoc'un açık bıraktığı birçok seçenekten, yüksek güvence gereken kullanımlar için tek bir küme belirler. Her tarafın hangi biçimleri, algoritmaları, istemci kimliklerini, şifreleme yöntemlerini ve kanıtları desteklemesi gerektiği bu kümede yazılıdır. **Token Status List** ise bu kümenin dayandığı iptal yöntemidir. Her belge, büyük, imzalı ve sıkıştırılmış bir bit listesindeki bir sırayı gösterir ve doğrulayıcılar bu listeyi önceden indirir. Bu yüzden bir belgeyi denetlemek, belgeyi veren kuruma onun nerede ve ne zaman gösterildiğini hiçbir zaman söylemez.

HAIP 1.0, 24 Aralık 2025'te Final oldu. Token Status List taslağı 21. sürümüne ulaştı (21 Haziran 2026). Taslağın adı artık "Token Status List (TSL)" ve metin RFC Editor kuyruğunda bekliyor.

## HAIP, temel şartnamelerin açık bıraktığı neyi sabitler?

OpenID4VP'ye harfiyen uyan iki ürün yine de birbiriyle anlaşamayabilir. Örneğin biri istekleri `x509_san_dns` ile imzalarken öbürü yalnız DID kabul edebilir, ya da biri yanıtı şifrelerken öbürü şifrelemeyebilir. HAIP bu boşlukları üç akış ve iki biçim için kapatır. Akışlar belge verme, yönlendirmeyle gösterim ve tarayıcının Digital Credentials API'siyle gösterimdir. Başlıca kurallar şunlar:

| Alan | HAIP 1.0 kuralı |
|---|---|
| Biçimler | IETF SD-JWT VC (`dc+sd-jwt`) ya da ISO mdoc (`mso_mdoc`); hangisinin gerektiğini ekosistem belirler |
| Algoritmalar | herkes en az ES256 (COSE -7 ya da -9) ve SHA-256 destekler |
| Belge verme | FAPI 2.0 üzerinden PKCE (S256) ve PAR ile yetki kodu akışı; DPoP'a bağlı belirteçler; her belge yapılandırması için bir `scope`; belge anahtara bağlıysa `nonce_endpoint` |
| Cüzdana güven | PAR ve token uçlarında, `sub` değeri bütün kurulumlarda aynı olan cüzdan kanıtı; anahtar kanıtları |
| Doğrulayıcı kimliği | imzalı istekler `x509_hash` istemci kimliğini kullanır |
| Sorgu | DCQL, `aki` türündeki `trusted_authorities` dahil |
| Yanıt | şifreli: P-256 üzerinde ECDH-ES; doğrulayıcı hem A128GCM'yi hem A256GCM'yi listeler; her istek için yeni anahtar |
| Yönlendirmeli akış | `request_uri` ile JAR, `direct_post.jwt`, aynı cihazda isteği başlatan oturuma geri dönüş |
| Tarayıcı akışı | `dc_api.jwt` ile Digital Credentials API |
| Başlıktaki anahtarlar | kurum imzaları, imzalı metadata ve durum listesi belirteçleri için `x5c`; güven çapası eklenmez, kendinden imzalı sertifika kullanılmaz |
| SD-JWT VC | belge cihaza bağlıysa KB-JWT her zaman bulunur; `status` alanı `status_list` kullanır |
| Durum | her belgenin kendine ait, benzersiz ve tahmin edilemez bir sırası olur |

Tamga'nın profilleri bu kuralların hepsine uyuyor ve birkaç yerde daha da ileri gidiyor. İzin verilen tek imza algoritması ES256 ve her belge cihaza bağlı olduğu için KB-JWT her zaman isteniyor. Protokolün ayrıntılarını [OpenID4VCI](/blog/openid4vci-deep-dive) ve [OpenID4VP ve DCQL](/blog/openid4vp-dcql-deep-dive) yazılarında anlattık.

![HAIP kuralları ve Tamga'nın seçimleri](/blog/haip-and-token-status-list/tr/fig-haip.png)

## Hangi HAIP kuralları Tamga'nın tasarımını değiştirdi?

HAIP'in gereklerini tek tek kendi kurallarımızla eşlediğimizde, ikisinin daha önce kapatılmış kararlara dokunduğunu gördük. Bu yüzden ikisi de [ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) ile ele alındı ve proje yönetimi bu ADR'yi 1 Ekim 2026'da onayladı.

**Doğrulayıcı kimliği artık `x509_hash`.** HAIP §5 bu konuda açık: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". ADR'den önce Tamga doğrulayıcıları `x509_san_dns:<alan adı>` kullanıyordu ve güven listesindeki kayıtlar da bu dizgiye göre tutuluyordu. Değişiklikten sonra kurallar şöyle:

- doğrulayıcının `client_id` değeri erişim sertifikasından hesaplanır ve hiçbir yapılandırma dosyasına elle yazılmaz;
- cüzdan yalnız `x509_hash` kabul eder ve özet yaprak sertifikayla uyuşmazsa isteği reddeder; yanıt adresinin sertifikanın SAN alanındaki bir alan adında olmasını da istemeye devam eder;
- sertifika her yenilendiğinde özet değiştiği için her doğrulayıcı kaydı kalıcı bir `dns_name` taşır; kopyaların ayrılması, siteye özel takma adlar, geçiş kartları ve gösterim kaydı gibi yenilemeden etkilenmemesi gereken her şey bu ada bağlanır.

Bunun işletme tarafındaki sonucu, adımların belli bir sırayla atılması gerektiğidir. Sertifika yenilenirken önce yeni sertifika kayıt kaynağına girer ve güven listesi yeniden yayımlanır. Doğrulayıcı yeni sertifikaya ancak bundan sonra geçer. Erken geçerse cüzdanlar tanımadıkları bir `client_id` görür ve isteği reddeder.

**Cüzdan kanıtının öznesi ortak.** HAIP §4.4.1'e göre kanıttaki `sub` değeri "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation" ve PAR'daki `client_id` de bu değerdir. Ağdaki cüzdanlardan biri olan Tamga Wallet'ın sağlayıcısı, daha önce bu alana her işlemde yeniden üretilen bir anahtarın parmak izini yazıyordu. Artık cüzdan ürününün kimliğini yazıyor. Kurulumlar yine yalnız her işlemde yeni üretilen `cnf` anahtarı ve birbirine bağlanamayan yeni bir durum kaydıyla birbirinden ayrılıyor. Böylece kurumun kaydettiği bilgi cüzdan ürününü gösteriyor ve telefon hakkında hiçbir şey söylemiyor.

## Token Status List durumu nasıl kodlar?

Belge listedeki yerini gösteren bir işaret taşır, bitler ise listededir:

```json title="Belgede (SD-JWT VC gövdesinde ya da mdoc'ta MSO'da)"
"status": {
  "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
}
```

```json title="Sadeleştirilmiş örnek: Status List Token (başlık ve gövde)"
{ "alg": "ES256", "typ": "statuslist+jwt", "kid": "sl-2026-a", "x5c": ["MIIB…"] }
{
  "iss": "https://issuer.tamga.network/example-university",
  "sub": "https://status.tamga.network/3f9a2c",
  "iat": 1791446400,
  "exp": 1791468000,
  "ttl": 120,
  "status_list": { "bits": 2, "lst": "eNrt…" }
}
```

`sub` değeri belgedeki `uri` ile aynı olmak zorunda. Aynı belgenin mdoc kopyası aynı `idx` değerini kullanır, ama listenin CWT biçimini (`application/statuslist+cwt`) gösterir ve bu biçim kendi opak adresinde durur. İki biçim de aynı bitleri taşır ve aynı yayında imzalanır ([ADR-0048](https://docs.tamga.network/tr/adr/0048-identity-no-suspension-mdoc-cwt-status)). `lst` alanı, taslağın tanımladığı üç adımla oluşturulur. Önce her belge için `bits` kadar bit bir bayt dizisine yazılır ve her bayt **en düşük anlamlı bitten** başlanarak doldurulur. Sonra dizi ZLIB biçiminde DEFLATE ile sıkıştırılır ve sonuç base64url ile kodlanır.

Küçük bir örnek verelim. Bir kurumun 16 kayıtlık ve `bits: 2` olan listesinde 1. sıra iptal edilmiş, 2. sıra askıya alınmış ve 6. sıra iptal edilmiş olsun:

```text title="2 bitlik durumları paketlemek (bu yazı için hesaplandı)"
bayt 0 = sıra 3..0   → 00 10 01 00 → 0x24
bayt 1 = sıra 7..4   → 00 01 00 00 → 0x10
bayt 2 = sıra 11..8  → 0x00
bayt 3 = sıra 15..12 → 0x00

zlib (düzey 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` olan bir listede `idx` sırasını okumak için `idx >> 2` numaralı bayt alınır ve `(idx & 3) × 2` bit sağa kaydırılır. `idx` 48213 için bu, 12053. baytın 2. ve 3. bitlerine karşılık gelir. `bits: 1` olan listede ise `idx >> 3` numaralı baytın `idx & 7`. bitine bakılır. Listenin boyutu da sorun yaratmıyor. Bir Tamga listesinde en az 100.000 kayıt bulunur ve bu liste sıkıştırılmadan iki bitle 25.000 bayt, tek bitle 12.500 bayt tutar. Bu yazı için yaptığımız denemede zlib düzey 9 ile bütün kayıtları geçerli olan bir liste 46 bayta, aynı listenin 200 dağınık iptal içeren hâli de 439 bayta sıkıştı.

![Bir belgenin durumunu dört adımda okumak](/blog/haip-and-token-status-list/tr/fig-bits.png)

## Durum değerleri Tamga'da ne anlama gelir?

| Değer | Taslaktaki adı | Tamga'da |
|---|---|---|
| `0x00` | VALID | geçerli |
| `0x01` | INVALID | kalıcı olarak iptal |
| `0x02` | SUSPENDED | askıda, geri alınabilir; yalnız şeması izin veren türlerde |
| `0x03` | uygulamaya özgü | kullanılmaz; iptal sayılır |

Taslak `bits` için 1, 2, 4 ya da 8 değerine izin veriyor. Tamga bu değeri, paketlerin 0.6.0 sürümünden beri belge türüne göre belirliyor ([ADR-0048](https://docs.tamga.network/tr/adr/0048-identity-no-suspension-mdoc-cwt-status)). Kimlik servisinin belgeleri, AB'nin kişi kimlik verisi için koyduğu kurala uygun olarak askıya alınamaz. Bu yüzden bu belgelerin listeleri tek bit kullanır, yani belge ya geçerlidir ya iptal edilmiştir ve iptal kalıcıdır. Kurumların listeleri ise iki bit kullanır, çünkü askıya almanın ayrı bir değere ihtiyacı var. Bir diploma hakkında inceleme başlatan kurum, inceleme sürerken diplomayı geçici olarak durdurmak isteyebilir. Kurum listelerinde de `0x02` yalnız şeması askıya almaya izin veren türler için yazılır (`suspension_allowed`, bugün diploma). Başka bir türde askı değeri görülürse liste bozuk sayılır ve reddedilir. Dört ya da sekiz bit kullanmak listeyi hiçbir yarar sağlamadan iki ya da dört kat büyütürdü. Doğrulayıcı `0x00` dışındaki her değeri ret olarak değerlendirir, ama "askıda" ile "iptal edildi" sonuçlarını kullanıcıya ayrı ayrı gösterir.

## Durum listesi bir izleme kanalına dönüşmekten nasıl kaçınır?

Durum listesinin gizliliği kalabalıktan gelir. Listeyi indiren bir doğrulayıcı, listedeki kayıtlardan herhangi birini denetliyor olabilir. Tamga'nın kuralları bu kalabalığın gerçekten oluşmasını sağlıyor. Aynı kuralların kişinin gözünden anlatımını [İzlemeden iptal](/blog/status-list-privacy) yazısında bulabilirsiniz.

- **Büyük listeler.** Her listede en az 100.000 kayıt bulunur ve kayıtların %80'i dağıtıldığında yeni bir liste açılır. Kullanılmayan sıralar da geçerli belgelerle aynı `0x00` değerini taşıdığı için dışarıdan bakan biri kaç sıranın dağıtıldığını göremez.
- **Rastgele sıralar.** `idx`, listenin kapasitesi içinden rastgele seçilir. Sıralı bir numara, `awarding_date` gizli kalsa bile kayıt sırasını ve aşağı yukarı tarihi ele verirdi. HAIP de her belgenin kendine ait, benzersiz ve tahmin edilemez bir sırası olmasını istiyor.
- **Anlamsız adresler.** Liste adresi her gösterimde göründüğü için o da bir bilgi alanı sayılır. `/sl/2026-muhendislik` gibi bir adres yılı ve fakülteyi ortaya koyardı. Bu yüzden Tamga'da liste kimlikleri rastgele dizgilerden oluşur ve hangi kimliğin neye karşılık geldiğini yalnız kurum bilir.
- **Yalnız türe göre bölme.** Yeni bir liste, önceki liste dolduğunda açılır. Listeler hiçbir zaman yıla ya da bölüme göre ayrılmaz.
- **Kopyalar sıra paylaşmaz.** Paketteki on kopyanın her birinin kendi rastgele sırası vardır. Bu yüzden iki doğrulayıcı, gösterimleri `idx` üzerinden birbiriyle ilişkilendiremez.

Bu yöntemin yapısından gelen bir sınırı var ve bunu açıkça yazıyoruz. Küçük bir kurumda kalabalık, o kurumun kendi verdiği belgelerin sayısı kadardır, çünkü `iss` alanı kurumu zaten adıyla gösterir.

Gizliliğin öbür yarısı listenin ne zaman indirildiğiyle ilgili. Doğrulayıcı her denetimde listeyi yeniden indirseydi, kurum o anda birinin kendi belgelerinden birini denetlediğini öğrenirdi. İsteğin geldiği IP adresi de çoğu zaman bunun kim olduğunu söylerdi. Bu yüzden Tamga doğrulayıcıları listeleri belli aralıklarla **önceden indirir** ve denetimi önbellekten yapar. `@tamga-network/verifier` bunu varsayılan olarak yapıyor ve her denetimde indirme ancak açıkça etkinleştirilirse devreye giriyor. Taslağın isteğe bağlı `aggregation_uri` alanı, bir kurumun bütün durum listelerini tek bir adreste listeler. Önceden indirmeyi kolaylaştırdığı için Tamga bu alanın kullanılmasını öneriyor.

## Liste ne sıklıkla yayımlanır, bir kopya ne kadar geçerlidir?

| Kural | Tamga değeri | Neden |
|---|---|---|
| Yayın aralığı | sabit, 2 dakika; hiçbir şey değişmese de sürdürülür | yalnız iptal olduğunda yayımlamak "az önce bir iptal oldu" bilgisini sızdırırdı; kısa aralık iptalin birkaç dakika içinde görünmesini sağlar |
| Acil yayın | yapılmaz | sabit ritmi bozardı; acil durumlarda kurumun sertifikası askıya alınır ya da şema iptal edilir |
| `ttl` | 120 sn (yayın aralığı) | doğrulayıcının elindeki kopyayı yeniden indirmeden kullanabileceği süre |
| `exp` | `iat` + 6 saat | kesin üst sınır; durum sunucusundaki kısa bir kesinti doğrulamayı durdurmasın diye; referans doğrulayıcı politikalarındaki en yüksek belirteç yaşına eşit |
| Önbellek başlıkları | `exp` ve `ttl` varken dikkate alınmaz | belirtecin kendi alanları belirleyicidir |
| İmza anahtarı | belge anahtarından ayrı, aynı X.509 zincirinde | durum anahtarı sızarsa sahte bir durum yayımlanabilir, ama sahte bir diploma verilemez |

Her yayın önce durum sunucusuna yazılır, ardından yayının özeti kayda geçirilir. Bugün bu kayıt, güven listesi yayıncısının çapa günlüğünde tutuluyor ve bir defter (ledger) kullanmak sonraki bir aşamanın işi ([neden henüz blockchain yok](/blog/why-no-blockchain-yet)). Doğrulayıcı, belirtecin özetinin kayıttaki özetle uyuştuğuna ve sürüm numarasının geriye gitmediğine bakar. Böylece bir kurum, iptal ettiği bir belgeyi geçerli göstermek için listesini sessizce eski bir sürüme döndüremez.

## Doğrulayıcı denetleyemediğinde ne sonuca varır?

İptal denetimi Tamga'nın doğrulama hattında D1–D6 adımlarıyla yapılır. Doğrulayıcı önce `status.status_list` alanını okur ve belirteci önceden indirilmiş önbellekten alır. Belirtecin imzasını, güven listesinde o kurum için kayıtlı durum anahtarıyla doğrular. Ardından `sub` değerini, listenin tazeliğini ve kayıtlı özeti denetler ve en son bitleri okur. Liste indirilemediyse ya da `exp` süresi geçtiyse sonuç **INDETERMINATE** olur ve yanında `STATUS_UNREACHABLE` ya da `STATUS_STALE` gibi bir gerekçe yer alır. "Bu diploma iptal edildi" ile "şu an denetleyemiyorum" bir insan hakkında farklı kararlara yol açar, bu yüzden ikisinin farklı gösterilmesi gerekir. Çevrim dışıyken doğrulayıcı önbellekteki belirteçle ve bilinen son kayıtla çalışmayı sürdürebilir. Bu durumda son eşitlemenin zamanını gösterir ve sonucu "çevrim dışı doğrulandı" diye işaretler.

Sıfır bilgili yaş ispatları sırası olmayan tek durumdur. İspat, listede bir sırayı belirleyebilecek hiçbir bilgiyi açığa çıkarmadığı için durum "uygulanamaz" olarak bildirilir. Bu yüzden sıfır bilgi ispatı yalnız kısa ömürlü kopyalarla sunuluyor. Bu kopyalar en çok 24 saat geçerli ve belge iptal edildiğinde yenilenmiyor ([ADR-0044](https://docs.tamga.network/tr/adr/0044-zk-short-lived-copies)). Paketlerin 0.4.0 sürümünden beri böyle çalışıyor. Kopyalar iptal listesinde bir kayıt taşımıyor, cüzdan onları kişiye sormadan yeniliyor ve kısa ömürleri iptal denetiminin yerini tutuyor. Böyle bir kopyaya dayanmayan bir sıfır bilgi ispatını doğrulayıcı ancak politikası buna açıkça izin veriyorsa kabul eder ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)).

## Sık sorulan sorular

### HAIP bir yasa mı?

Hayır. HAIP, OpenID Foundation'ın yayımladığı bir şartnamedir. Avrupa dijital kimlik ekosistemi, farklı üreticilerin cüzdanları, kurumları ve doğrulayıcıları birlikte çalışabilsin diye bu şartnameye dayanıyor.

### Doğrulayıcı neden kuruma "bu belge hâlâ geçerli mi" diye sormuyor?

Bilgi, bu sorunun kendisiyle sızardı. Kurum hangi belgenin, ne zaman ve çoğu zaman kim tarafından denetlendiğini öğrenirdi. Durum listesi kullanıldığında doğrulayıcı herkesin durumunun bir kopyasını elinde tutar ve kimseye bir şey sormaz.

### Askıya alma kendiliğinden biter mi?

Hayır. Askıya alınmış bir belge, kurum bitleri yeniden geçerli değerine çekene ya da belgeyi iptal edene kadar askıda kalır. Doğrulayıcı yalnız o anki değeri okur.

### Doğrulayıcı on kopyanın aynı kişiye ait olduğunu anlayabilir mi?

Durum listesine bakarak anlayamaz. Her kopyanın kendi rastgele sırası vardır ve kopyalar arasındaki eşleşme kurumun veritabanında kalır. Belge iptal edildiğinde on sıranın hepsi aynı planlı yayında değişir ve o aralıkta değişen bütün öbür kayıtlarla birlikte görünür.

## Kaynaklar

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, Haziran 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 9 Temmuz 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 uyumu, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)
- [İptal ve durum listesi (SPEC-CRED-0003), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/status-list)
- [ADR-0008: Durum listesinin yeri, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0008-status-list-placement)
- [İptal ve tazelik, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/revocation)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)

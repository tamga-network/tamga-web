---
title: "OpenID uyum testlerinden öğrendiklerimiz ve açık kaynak yaptığımız kit"
slug: openid-conformance-self-test
description: OpenID Foundation'ın issuer ve verifier test planlarını (OpenID4VCI, OpenID4VP, HAIP, FAPI 2.0) sandbox'ımızda çalıştırdık, yirmiye yakın bulguyu düzelttik ve kiti yayımladık.
date: 2026-10-27
lang: tr
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, trusting-a-wallet, page:/sdk
---

<!-- Kaynaklar: İngilizce yazının kaynak notuyla aynı (OpenID öz-testi sonuç kütüğü ve modül notları; issuer planı 63 modül, son çalıştırma 2026-10-23: 0 BAŞARISIZ, 2 UYARI, 4 İNCELEME, 4 ATLANDI; 2. tur 29/22/5; verifier planı 14 modül, 1. tur 0 BAŞARISIZ, 6 İNCELEME, 7 UYARI, 1 ATLANDI; 2. tur loglar: 7 GEÇTİ, 6 İNCELEME, 1 ATLANDI; tamga-network CHANGELOG 0.7.2 ve 0.7.3; ADR-0059…0062; kit README, CONTRIBUTING, common-failures). -->

21–27 Ekim 2026 tarihleri arasında OpenID Foundation'ın iki uyum test planını Tamga'nın sandbox ortamında çalıştırdık. **Issuer** planıyla kimlik servisimizi (HAIP ve FAPI 2.0 Security Profile ile birlikte OpenID4VCI 1.0 Final, 63 modül), **verifier** planıyla da Tamga Verify'ı (HAIP ile birlikte OpenID4VP 1.0 Final, 14 modül) sınadık. Issuer planının son çalıştırmasında başarısız modül kalmadı, verifier planının son turunda ise ne başarısız modül ne de uyarı var. Bu sonuca yirmiye yakın kod değişikliğiyle ulaştık ve her değişiklik bir şartname maddesine dayanıyor. Bizden sonra aynı testlere girecek ekipler daha az uğraşsın diye öğrendiklerimizi [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) adlı açık kaynak bir kitte (Apache-2.0) topladık.

> **Önemli:** Bu çalışma, OpenID Foundation'ın kendi test aracıyla yaptığımız bir öz-testtir ve OpenID sertifikası yerine geçmez. Test planlarını araçta yayımlamadık; nedenini aşağıda anlatıyoruz.

## AB uyumlu bir ağ için uyum testi neden önemli?

OpenID4VP'ye harfiyen uyan iki ürün yine de birbiriyle anlaşamayabilir, çünkü şartname birçok noktada birden fazla seçeneğe izin verir. Yüksek güvenceli birlikte çalışabilirlik profili [HAIP](/blog/haip-and-token-status-list), bu seçeneklerden tek bir küme belirleyerek boşlukların çoğunu kapatır ve Avrupa dijital kimlik ekosistemi de bu profile dayanır. Tamga kendini AB uyumlu diye tanıtıyor. Bu iddiayı yalnız kendi testlerimizle sınarsak kendi ödevimize kendimiz not vermiş oluruz.

Kendi testlerimiz ve uyum vektörlerimiz, kodu şartnameleri bizim anladığımız biçimle karşılaştırır. OpenID Foundation'ın [conformance suite](https://gitlab.com/openid/conformance-suite) adlı test aracı ise işe başka birinin okumasını katar. Vakfın geliştirdiği bu açık kaynak araç protokolün karşı tarafının yerine geçer ve özensiz bir uygulamanın yanlış yapabileceği yüzlerce durumu tek tek dener. Vakfın [sertifika programında](https://openid.net/certification/) kullanılan araç da budur. Araç bizimle aynı fikirde değilse ikimizden biri yanılıyordur ve hangimizin yanıldığını bulmak bu işin en yararlı kısmıdır.

## Neyi, neye karşı sınadık?

| | Issuer planı | Verifier planı |
|---|---|---|
| Plan | `oid4vci-1_0-issuer-haip-test-plan` | `oid4vp-1final-verifier-haip-test-plan` |
| Şartnameler | OpenID4VCI 1.0 Final, HAIP 1.0, FAPI 2.0 Security Profile | OpenID4VP 1.0 Final, HAIP 1.0 |
| Sınanan servis | kimlik servisi, `id.sandbox.tamga.network` | Tamga Verify, `verify.sandbox.tamga.network` |
| Seçenekler | SD-JWT VC, cüzdanın başlattığı yetki kodu akışı, istemci kanıtı (client attestation), DPoP | SD-JWT VC, `direct_post.jwt`, `x509_hash`, imzalı `request_uri` |
| Aracın rolü | cüzdanın yerine geçer; kendi cüzdan kanıtını ve anahtar kanıtını kullanır | cüzdanın yerine geçer; kendi test anahtarıyla imzaladığı sahte bir AB PID'i (`urn:eudi:pid:1`) sunar |
| Modül | 63: 23 OpenID4VCI ve 40 FAPI 2.0 | 14 |

![İki plan: araç ikisinde de cüzdanın yerine geçer](/blog/openid-conformance-self-test/tr/fig-plans.png)

Testlerde aracın `demo.certification.openid.net` adresindeki barındırılan sürümünü kullandık. Aracın imza sertifikalarını yalnız sandbox güven listesine ekledik. Cüzdan kanıtını imzalayan sertifika bu listede test cüzdan sağlayıcısı olarak, PID'i imzalayan sertifika ise ayrı bir test listesinde yer alıyor. Gerçek ağın listelerinde hiçbir değişiklik yapılmadı.

Planların kapsamını iki pratik karar belirledi. Issuer planını bir kurumun issuer'ı yerine kimlik servisine karşı çalıştırdık, çünkü kurumların yetkilendirme adımı kişiden önce kimlik belgesini göstermesini istiyor ve test aracı bunu yapamıyor. Ayrıca aracın kendi kanıtlarında politikamızın zorunlu tuttuğu iki alan bulunmuyor. Bunlardan biri cüzdan kanıtındaki iptal kaydı, öteki de anahtar kanıtında anahtarın nasıl saklandığını gösteren durum bilgisi. Sandbox bu iki alanı isteğe bağlı sayıyor, ama gerçek ağda ikisi de zorunlu olmaya devam ediyor.

## Sonuçlar ne oldu?

Issuer planı 21–23 Ekim arasında üç tur ve bir tekrar çalıştırmasıyla tamamlandı. İlk turda 63 modülün 42'sini çalıştırdık ve hataların çoğu bu turda ortaya çıktı. İkinci turda 63 modülün hepsi çalıştı; 29'u geçti, 22'si uyarı verdi, 5'i başarısız oldu. Üçüncü tur ve son tekrar, kalan sorunları kapattı.

| Plan | Tur | Geçti | Uyarı | Başarısız | İnceleme | Atlandı |
|---|---|---|---|---|---|---|
| Issuer (63) | son tekrar, 23 Ekim | 53 | 2 | 0 | 4 | 4 |
| Verifier (14) | 1. tur, 27 Ekim | 0 | 7 | 0 | 6 | 1 |
| Verifier (14) | 2. tur, 27 Ekim | 7 | 0 | 0 | 6 | 1 |

Verifier'ın ilk turunda "uyarı" alan yedi modül asıl denetimi aslında geçmişti, yani Tamga bozuk sunumu doğru biçimde reddetmişti. Yedisinde de aynı uyarı vardı ve sorunu aynı gün düzelttik.

"Geçti" dışında kalan her satırın bir açıklaması var:

- **İki uyarı (issuer metadata'sı, düz ve imzalı hâli).** Metadata'mızda `credential_reuse_policy` alanı bulunuyor. Bu alan, toplu belge verme ve belgelerin yeniden kullanımıyla ilgili politikayı anlatır; ETSI TS 119 472-3 tanımlar, AB'nin ARF'si de kullanır. Aracın şeması ise `credential_metadata` içine ek alan konmasına izin vermiyor. Bu yüzden tek bir meşru uzantı şemanın bütün bir dalını geçersiz kılıyor ve araç ardından `scope`, `proof_types_supported` gibi standart alanları da bilinmeyen alan diye işaretliyor. Aracın izin listesi uzantının adını susturabiliyor, ama arkasından gelen bu hata zincirini durduramıyor. Alan bir AB standardından geldiği için onu koruyoruz. Sorunu, yeniden üretme adımları ve iki olası çözümle birlikte aracı geliştiren ekibe bildirdik.
- **İnceleme.** Bazı olumsuz testler "ekran görüntüsü yükleyin" adımıyla biter, çünkü araç sunucumuzun kişiye gösterdiği hata sayfasını göremez ve bu sayfayı bir insanın onaylaması gerekir. Verifier planında da aynı nedenle, Tamga Verify'ın sunumu kabul ettiği ya da sonuç sayfasında reddettiği her durum (yanlış belge türü, iptal edilmiş belge) incelemeyle sonuçlanır. Doğrulayıcının yanıtı doğrudan HTTP 400 ile geri çevirdiği durumlar ise kendiliğinden geçer.
- **Atlandı.** Üç issuer modülü şifreli belge yanıtını sınıyor. HAIP bu özelliği isteğe bağlı bıraktığı için metadata'mızda sunmuyoruz. Bir modül de yenileme belirtecini (refresh token) sınıyor. Kimlik servisimiz yenileme belirtecini yalnız kısa ömürlü sıfır bilgi kopyaları için veriyor ([ADR-0062](https://docs.tamga.network/tr/adr/0062-zk-copy-refresh-scope)). Aracın isteği bu kapsamı istemediği için belirteç verilmiyor ve modül atlanıyor. Verifier planında da `request_uri_method=post` seçeneğini sunmadığımız için ilgili modül atlanıyor.

## Testler ne buldu, biz neyi değiştirdik?

Aşağıda yirmiye yakın değişikliği konularına göre grupladık. Her maddede değişikliği gerektiren şartname maddesi yazıyor, parantez içindeki adlar da aracın loglarında geçen denetim adları.

![Konuya göre yaptığımız düzeltmeler](/blog/openid-conformance-self-test/tr/fig-fixes.png)

### Metadata ve görünüm

- **İstemci kanıtı algoritmaları.** Yetkilendirme sunucusunun metadata'sı `attest_jwt_client_auth` yöntemini sunuyordu, ama bu yöntemle birlikte verilmesi gereken `client_attestation_signing_alg_values_supported` ve `client_attestation_pop_signing_alg_values_supported` listeleri eksikti (attestation-based client authentication §10.1). İki liste de artık `["ES256"]` değerini taşıyor.
- **Final sürümün biçimi.** Belge yapılandırmalarının her birinde hâlâ üst düzeyde bir `display` alanı vardı ve görünüm nesnelerinde dil `lang` adıyla yazılıyordu. OpenID4VCI 1.0 Final (§12.2.4) ise görünüm bilgisini `credential_metadata.display` altına koyuyor ve alanın adını `locale` olarak belirliyor. Bu değişikliği yalnız issuer metadata'sında yaptık. SD-JWT VC tür metadata'sında `lang` kalıyor, çünkü o şartnamenin kullandığı ad bu.
- **Dil etiketleri.** Aracın yeni bir denetimi dil etiketlerini doğruluyor. Bizim etiketlerimiz geçerliydi, ama kayıtta `EN-us` gibi bir değerin ya da aynı dilin iki kez yazılmasının önünde bir engel yoktu. Artık görünüm değerlerinde kanonik BCP 47 etiketleri kullanılıyor ve her dil için tek girdi var (paketler 0.7.3).

### Kopyaları birbirine bağlayabilecek zaman alanları

- **Yuvarlanmış `iat` ve `exp`.** Belgeler verildikleri anı saniyesine kadar taşıyordu. Bu yüzden bir paketteki on kopya ya da aynı kişiye verilen iki belge, zaman bilgisi üzerinden birbiriyle ilişkilendirilebiliyordu (RFC 9901 §10.1). Artık verilme ve bitiş zamanlarını saat başına aşağı yuvarlıyoruz; mdoc belgelerindeki geçerlilik alanları da aynı biçimde yuvarlanıyor.
- Toplu belge verme için eklenen iki yeni denetim, ortak listede her kopyanın farklı ve tahmin edilemez bir durum sırası almasını istiyor. Bu denetimleri zaten geçiyorduk, yine de ikisi için regresyon testi ekledik.

### DPoP, PAR ve yetkilendirme sunucusu

DPoP, erişim belirtecini istemcinin elindeki bir anahtara bağlayan yöntemdir. PAR (pushed authorization request) ise yetki isteğinin parametrelerinin, tarayıcıdan geçmeden önce doğrudan sunucuya gönderilmesidir.

- **PAR'da DPoP.** PAR ucu, gelen DPoP kanıtını `dpop_jkt` değeriyle karşılaştırmadan kabul ediyordu. Token ucu da PAR'da kullanılandan farklı bir DPoP anahtarını kabul ediyordu (RFC 9449 §10). Artık kanıt PAR'da doğrulanıyor, yetki kodu o anahtara bağlanıyor ve token ucuna farklı bir anahtarla gelen istek `invalid_grant` hatası alıyor.
- **`htu` normalleştirmesi.** `htu` alanında ana makine adı büyük harfle yazılmış ya da `:443` bağlantı noktası açıkça belirtilmiş DPoP kanıtlarını reddediyorduk. Oysa RFC 9449 §4.3, karşılaştırmadan önce RFC 3986'ya göre normalleştirme yapılmasını istiyor. Artık şema ve ana makine adı büyük/küçük harf ayrımı yapılmadan karşılaştırılıyor ve varsayılan bağlantı noktası hesaba katılmıyor.
- **Testten önce kapattıklarımız.** İlk turdan önce henüz çalışmamış FAPI 2.0 modüllerini okuduk ve bulacakları sorunları önceden düzelttik. PAR ucu artık POST dışındaki yöntemlere 405 döndürüyor (RFC 9126 §2.3). Yinelenen parametre içeren istekler ve PAR içinde `request_uri` gönderen istekler `invalid_request` alıyor. Yalnız `response_type=code` kabul ediliyor, `plain` PKCE reddediliyor ve kanıtlanan istemciden farklı bir `client_id` gönderen istek `invalid_client` alıyor. Bir yetki kodu verildikten sonra aynı `request_uri` yeniden kullanılamıyor (RFC 9126 §4). Bu modüllerin hepsi ilk çalıştırmada geçti.

### TLS

- **Şifre takımları.** TLS 1.2 bağlantılarında hâlâ CBC ve SHA-1 kullanan bir takım kabul ediliyordu. FAPI 2.0 (§5.2.2, BCP 195 ile birlikte) yalnız önerilen takımlara izin verdiği için sunucu artık yalnız ECDHE ile AES-GCM takımlarını sunuyor.

### Belirteçler

- **Erişim belirtecinin yeniden kullanımı.** Erişim belirteçlerimiz tek kullanımlıktı. FAPI testlerinin olağan senaryosu ise aynı belirteçle birkaç belge isteği gönderiyor ve bu yüzden başarısız oldu. Şartnameler belirtecin yeniden kullanılmasına izin verdiği için kuralı [ADR-0059](https://docs.tamga.network/tr/adr/0059-access-token-multiple-credential-requests) ile değiştirdik. Belirteç artık ömrü boyunca (en fazla beş dakika) birden çok istekte kullanılabiliyor. Bu izin yalnız belirtecin kapsadığı yapılandırmalar için geçerli, toplamda en fazla on kopya alınabiliyor ve her istekte aynı DPoP anahtarı kullanılmak zorunda.
- **Yetki kodunun yeniden kullanımı.** Bir yetki kodu ikinci kez kullanıldığında, ilk kullanımda verilen belirteçler de artık geçersiz oluyor (RFC 6749 §4.1.2, RFC 9700 §4.5).
- **Yenileme belirtecinin neye bağlı olduğu.** Yenileme belirteçlerini DPoP anahtarına bağlıyorduk. Test aracı ise belirteci yenilerken aynı istemciyi ama yeni bir DPoP anahtarını kullanıyor. RFC 9449 §5 ve attestation-based client authentication §10.3, yenileme belirtecini istemci örneğine (client instance) bağlıyor. [ADR-0060](https://docs.tamga.network/tr/adr/0060-refresh-token-client-instance-binding) ile belirteci cüzdan kanıtındaki örnek anahtarına bağladık. Böylece DPoP anahtarı değişse de belirteç çalışmaya devam ediyor.
- **İlk belgeden önce yenileme.** Araç, token yanıtını alır almaz, henüz belge istemeden belirteci yeniliyor. Yenileme belirtecinin gösterdiği kayıt o sırada henüz oluşmadığı için bu isteği reddediyorduk. RFC 6749 §6 ise yenileme belirtecinin verildiği andan itibaren kullanılabilmesine izin veriyor ve artık bizde de öyle.

### Hata kodları ve başlıklar

- Bilinmeyen bir `credential_identifier`, genel `invalid_credential_request` hatası yerine `unknown_credential_identifier` döndürüyor (OpenID4VCI §8.3.1.2).
- `code_verifier` içermeyen bir token isteği `invalid_grant` alıyor ve yetki kodu bir daha kullanılamıyor (RFC 7636 §4.6).
- Token ucunun hata yanıtları dahil bütün yanıtlarında `Cache-Control: no-store` başlığı var (RFC 6749 §5.1).
- Belge ucunun döndürdüğü 401 yanıtı, hatayı ve kabul edilen algoritmayı bildiren bir `WWW-Authenticate: DPoP` başlığı taşıyor (RFC 9449 §7.1). Bu düzeltme, issuer turlarından sonra yaptığımız protokol incelemesinde ortaya çıktı.
- Başka bir istemcinin `request_uri` adresini açan kişi artık ham JSON yerine bir HTML hata sayfası görüyor.

### Belge yanıtının biçimi

- Belge yanıtımız, her site için ayrı takma ad üretmekte kullanılan tohumu (seed) fazladan bir alan olarak taşıyordu. Araç, belge yanıtlarındaki bilinmeyen alanları işaretliyor. Şartnamede uzantıyı yasaklayan bir hüküm olmadığı için konu yoruma açıktı, ama daha temiz ve standart bir yol vardı. [ADR-0061](https://docs.tamga.network/tr/adr/0061-pseudonym-seed-separate-configuration) ile tohumu ayrı bir belge yapılandırmasına taşıdık ve artık ikinci bir standart belge isteğiyle alınıyor. Tohumu koruyan gizlilik kuralları değişmedi.

### Doğrulayıcı

- **İstekteki `purpose`.** İmzalı istek nesnesi, OpenID4VP 1.0'ın (§5.1) tanımlamadığı bir `purpose` parametresi taşıyordu (`CheckForUnexpectedParametersInVpAuthorizationRequest`). Bu parametreyi kaldırdık. Cüzdanın kullanıcıya gösterdiği amaç zaten `verifier_info` içindeki kayıt sertifikasından (ETSI TS 119 475) ve güven listesindeki kayıtlı kullanımdan geliyordu.
- **`direct_post` yanıtı.** Sunum kabul edildikten sonra yanıt ucu, `redirect_uri` ile birlikte `show_url` da döndürüyordu (`ValidateDirectPostResponse`, OpenID4VP §8.2). Artık yalnız `redirect_uri` dönüyor ve yüz yüze kontrol ekranını açan anahtar bu adresin içinde taşınıyor.
- **Doğrulama sırasında çekilen durum listeleri.** Tamga doğrulayıcıları durum listelerini önceden indirir ve kontrolü önbellekten yapar. Böylece belgeyi veren kurum, belgenin ne zaman kontrol edildiğini öğrenemez. Test aracı ise her testte yeni bir liste adresi veriyor ve doğrulayıcının bu listeyi çekip çekmediğini denetliyor. Bunun için, eksik bir listeyi doğrulama sırasında çekmeye yarayan bir seçenek ekledik. Seçenek varsayılan olarak kapalı ve ancak açıkça etkinleştirilirse çalışıyor. Liste de yalnız kurumun bildirdiği durum sunucusundan, aynı ağ denetimlerinden geçerek çekiliyor. Bu seçenek yalnız sandbox'ın öz-test politikasında açık. Aynı çalışmayla gerçek bir eksiği de kapattık: dış bir kurumun durum listesinin adresi artık ilk görüldüğü anda öğreniliyor ve bu değişiklik gerçek AB PID'lerinin doğrulanmasında da işe yarıyor.
- **İstek nesnesinin alanları.** İstek nesnesinin gövdesi artık başlığa ek olarak `aud` ve `iat` alanlarını da taşıyor.
- HAIP kapsamındaki yeni bir denetim, yanıt şifreleme anahtarını yeniden kullanan doğrulayıcıyı başarısız sayıyor. Bizim doğrulayıcımız her istek için zaten yeni bir anahtar üretiyor, yine de bunun için regresyon testi ekledik.

### Kodda olmayanlar: ayarlar ve test adımları

Bazı bulgular bizden kaynaklanıyordu ama sorun kodda değildi. Testler sürerken yapılan bir dağıtımda yeniden başlayan bir servis, üç modüle 502 hatası döndürdü; bu yüzden test sırasında dağıtım yapılmamalı. İkinci istemcinin dönüş adresinde bir sorgu dizesi (query string) vardı ve sandbox'ın izin listesi bu adresi tanımıyordu. Bazı modüller de test eden kişiden belirli bir adımı tam olarak uygulamasını istiyor. Ret testinde Onayla yerine Vazgeç'e basmak, `request_uri` yeniden kullanım testinde ilk açılışta hiçbir şey yapmamak, on dakikalık sürenin dolmasını beklemek, doğru ekran görüntüsünü yüklemek ve aynı test takma adıyla (alias) aynı anda yalnız tek test çalıştırmak bunlardan bazıları. Her biri bize bir kez tekrar çalıştırmaya mal oldu.

## Neyi düzelteceğimize nasıl karar verdik?

Baştan sona tek bir ilkeye uyduk. Kodu yalnız bir şartname maddesi gerektirdiğinde değiştirdik, test aracının kendine özgü beklentileri için değiştirmedik ve bilerek bıraktığımız her farkı yazıya geçirdik. Koda dokunmadan önce de her bulguyu aşağıdaki sınıflardan birine koyduk.

| Sınıf | Anlamı | Ne yaptık |
|---|---|---|
| hata | şartnamedeki ya da profildeki bir MUST kuralı başka bir davranış istiyor | düzelttik ve regresyon testi ekledik |
| önerilen | bir SHOULD kuralı ya da gizlilik veya güvenlik önerisi | yazılı bir gerekçemiz yoksa düzelttik |
| ayar | aracın ayarı, test ortamı ya da test edenin adımı | ayarı ya da yöntemi düzelttik |
| beklenen | desteklemediğimiz bir seçenek ya da belgelenmiş bir uzantı | olduğu gibi bıraktık ve kayda geçirdik |
| karar | şartname izin veriyor ama araç başka bir yol bekliyor | proje yönetimi bir ADR ile karar verdi |
| araç sınırı | araç, hiçbir şartnamenin istemediği bir şeyi denetliyor | doğru kodu koruduk, sorunu aracı geliştiren ekibe bildirdik |

![Sınıflandırma: log satırından düzeltmeye](/blog/openid-conformance-self-test/tr/fig-triage.png)

Dört bulgu daha önce kapatılmış kararlara dokunuyordu. Bu yüzden önce ADR sürecinden geçtiler (0059–0062) ve her biri, kod değişmeden önce proje yönetiminin onayını aldı. Bir uzantıyı (`credential_reuse_policy`) bilerek koruduk. Bir başkasını ise temiz bir standart biçim bulunduğu için o biçime taşıdık. Temiz bir sonuç almak için AB'nin tanımladığı bir alanı silebilirdik, ama o zaman elimizde testi geçen ve standarda daha az uyan bir servis kalırdı.

## Öz-test neyi göstermez?

- **Sertifika değildir.** OpenID sertifikası, Vakıfla birlikte yürütülen ayrı bir süreçtir ve bizim için de ayrıca verilecek bir karardır.
- **Planları yayımlamadık.** Araçta bir planı yayımlamak, sonuçlarını herkese açık hâle getirir. Planın ayarlarında ise araca verdiğimiz test özel anahtarları (kanıt imzacısı ve sahte PID'in imza anahtarı) bulunuyor. Bu yüzden dışa aktarılan logları ve ekran görüntülerini yalnız kendimizde tutuyoruz.
- **Kapsamı sandbox, iki servis ve her servisin tek bir seçeneğiyle sınırlı.** Cüzdan planları cihaz için ayrı bir derleme gerektirdiğinden çalıştırılmadı. Doğrulayıcının mdoc seçeneği de sınanmadı. Bir kurumun issuer'ı bu planla test edilmedi.
- **Yalnız protokolü sınar.** Araç, iletilerin doğru biçimde kurulduğunu ve gereken denetimlerin yapıldığını sınar. Bir kurumun diploma vermeye yetkili olup olmadığını güven listesi belirler, hukuki tanınma ise hukukun konusudur.

## Kitte ne var?

Kit, bir uyum testinin ilk tam turunda öğrenilenleri, herhangi bir OpenID4VCI issuer'ı ya da OpenID4VP verifier'ı için genel bir dille anlatıyor. Kitte hiçbir ürün ya da sunucu adı geçmiyor ve örneklerde `example.com` kullanılıyor.

| Parça | Ne işe yarar |
|---|---|
| İş akışı | plan ve seçeneklerin belirlenmesi, ayar, çalıştırma sırası, tarayıcı adımları ve inceleme için ekran görüntüleri, loglar, bulguların sınıflandırılması, düzeltme ve tekrar çalıştırma |
| Issuer planı başvuru notları | her OpenID4VCI modülünün neyi denetlediği, ilgili şartname maddesi, tipik hata ve düzeltmesi |
| FAPI 2.0 başvuru notları | issuer planının içinde çalışan 40 FAPI 2.0 Security Profile modülü |
| Verifier planı başvuru notları | her modül ve 400 ile 200 yanıtlarının "geçti" ve "inceleme" sonuçlarına nasıl karşılık geldiği |
| Sık hatalar | belirti → denetim → neden → düzeltme sırasıyla, her bulgunun sınıfıyla birlikte |
| Ayar şablonları | iki plan için anahtarları çıkarılmış suite JSON dosyaları, alan alan açıklamalı |
| Test PKI'sı | test kök sertifikası, kanıt imzacısı ve sahte PID anahtarları için openssl tarifi |
| Ön kontrol listesi | ilk çalıştırmadan önce kodda bakılması gerekenler |
| Log özetleyici | her modülün sonucunu ve bütün başarısız, uyarı ve inceleme satırlarını, anahtar ve hesap bilgisi olmadan çıkaran betik |

Kit, bir yapay zekâ kodlama asistanına eklenti olarak kurulacak biçimde paketlendi; kurulum komutları [README](https://github.com/tamga-network/oidf-conformance-kit#install) dosyasında. Kitin içindeki her şey düz Markdown dosyalarından ve yalnız Python'un standart kütüphanesini kullanan bir betikten oluştuğu için asistan olmadan da kullanılabilir:

```bash title="Başvuru notlarını ve log özetleyiciyi doğrudan kullanmak"
git clone https://github.com/tamga-network/oidf-conformance-kit
cd oidf-conformance-kit
# planınızın loglarını araçtan dışa aktarın, sonra:
python scripts/oidf-log-summary.py ./logs --latest
python scripts/oidf-log-summary.py ./logs --latest --format markdown --redact -o summary.md
```

> **Not:** Uyum logları, araca verdiğiniz özel anahtarları ve logları dışa aktaran hesabın bilgilerini içerir. Bu yüzden logları ve doldurulmuş ayar dosyalarını sürüm denetimine eklemeyin. Özetleyici yalnız izin verilen alanları yazar, `--redact` seçeneği de sunucu adlarınızı gizler.

## Nasıl katkı verebilirsiniz?

Test aracı hızla değişiyor. Yeni modüller ekleniyor, bazı modüllerin adı değişiyor, bazıları da yeni bir şeyi denetlemeye başlıyor. Kitteki modül adlarını aracın 26 Ekim 2026 tarihli ana dalıyla karşılaştırdık, ama bu bilgiler zamanla eskiyecek. En çok işe yarayacak katkılar şunlar:

- eklenen ya da değişen bir modül veya denetim, kontrol ettiğiniz araç commit'iyle birlikte;
- karşılaştığınız ve düzelttiğiniz bir hata (denetimin adı, nedeni, düzeltmesi ve bunu gerektiren şartname maddesiyle);
- bir araç sınırı (hiçbir şartnamenin bu davranışı neden istemediğinin açıklaması ve aracın sorun kaydına bağlantıyla).

Kite eklenen her düzeltme bir şartnameye dayanmak zorunda. Tek dayanağı test aracı olan bir bulgu, kite araç sınırı olarak girer. Cüzdan planları henüz kitin kapsamında değil ve en büyük eksik de bu. Sorun kayıtlarını ve pull request'leri [github.com/tamga-network/oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) adresinde bekliyoruz.

## Sık sorulan sorular

### Tamga OpenID sertifikalı mı?

Hayır. Vakfın test aracını sandbox ortamında kendimiz çalıştırdık. Sertifika ayrı bir süreçtir ve bunun için başvuru yapılmadı.

### Bazı modüller neden "geçti" yerine "inceleme" ile bitiyor?

Çünkü araç, kişiye gösterilen bir sayfayı göremez. Doğrulayıcımız sonucu kendi sayfasında gösterdiğinde ya da sunucumuz bir hata sayfası açtığında araç ekran görüntüsü ister ve sonucu bir insan onaylar. Bu modüller olağan olarak böyle biter.

### Kodu yalnız aracı memnun etmek için mi değiştirdiniz?

Hayır. Her kod değişikliği bir şartname ya da profil maddesine dayanıyor. Aracın hiçbir şartnamede yer almayan bir şey beklediği durumlarda kodumuzu değiştirmedik ve farkı kayda geçirdik.

### Kiti Tamga'yla ilgisi olmayan bir issuer ya da verifier için kullanabilir miyim?

Evet. Başvuru notları geneldir ve log özetleyici bu iki planın dışa aktarılan bütün loglarında çalışır.

## Kaynaklar

- [OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html)
- [OpenID Foundation conformance suite](https://gitlab.com/openid/conformance-suite) ve [sertifika](https://openid.net/certification/)
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/)
- [RFC 9449 (DPoP)](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9126 (PAR)](https://www.rfc-editor.org/rfc/rfc9126), [RFC 6749 (OAuth 2.0)](https://www.rfc-editor.org/rfc/rfc6749), [RFC 9700 (OAuth güvenlik BCP)](https://www.rfc-editor.org/rfc/rfc9700), [RFC 9901 (SD-JWT)](https://www.rfc-editor.org/rfc/rfc9901)
- [ADR-0059](https://docs.tamga.network/tr/adr/0059-access-token-multiple-credential-requests), [ADR-0060](https://docs.tamga.network/tr/adr/0060-refresh-token-client-instance-binding), [ADR-0061](https://docs.tamga.network/tr/adr/0061-pseudonym-seed-separate-configuration), [ADR-0062](https://docs.tamga.network/tr/adr/0062-zk-copy-refresh-scope)
- [Tamga OpenID4VP profili](https://docs.tamga.network/tr/specifications/openid4vp) ve [OpenID4VCI profili](https://docs.tamga.network/tr/specifications/openid4vci)
- [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0)

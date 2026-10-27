---
title: "OpenID uyum testlerinden geçerken öğrendiklerimiz ve açık kaynak yaptığımız kit"
slug: openid-conformance-self-test
description: OpenID Foundation'ın issuer ve verifier test planlarını (OpenID4VCI, OpenID4VP, HAIP, FAPI 2.0) sandbox'ımızda koştuk, yirmiye yakın bulguyu düzelttik ve kiti yayımladık.
date: 2026-10-27
lang: tr
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, trusting-a-wallet, page:/sdk
---

<!-- Kaynaklar: İngilizce yazının kaynak notuyla aynı (OpenID öz-testi sonuç kütüğü ve modül notları; issuer planı 63 modül, son koşu 2026-10-23: 0 BAŞARISIZ, 2 UYARI, 4 İNCELEME, 4 ATLANDI; 2. tur 29/22/5; verifier planı 14 modül, 1. tur 0 BAŞARISIZ, 6 İNCELEME, 7 UYARI, 1 ATLANDI; 2. tur loglar: 7 GEÇTİ, 6 İNCELEME, 1 ATLANDI; tamga-network CHANGELOG 0.7.2 ve 0.7.3; ADR-0059…0062; kit README, CONTRIBUTING, common-failures). -->

21–27 Ekim 2026 arasında OpenID Foundation'ın iki uyum test planını Tamga'nın sandbox'ında koştuk: kimlik servisine karşı **issuer** planı (HAIP ve FAPI 2.0 Security Profile ile OpenID4VCI 1.0 Final, 63 modül), Tamga Verify'a karşı **verifier** planı (HAIP ile OpenID4VP 1.0 Final, 14 modül). Issuer planının son koşusunda başarısız modül yok; verifier planının son koşusunda ne başarısız modül ne uyarı var. Oraya varmak yirmiye yakın kod değişikliği gerektirdi ve her biri bir şartname maddesine dayanıyor. Öğrendiklerimizi bir sonraki ekip daha hızlı geçsin diye açık kaynak bir kitte topladık: [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0).

> **Önemli:** Bu, OpenID Foundation'ın kendi test aracıyla yaptığımız bir öz-testtir. OpenID sertifikası değildir; test planlarını araçta yayımlamadık (nedeni aşağıda).

## AB uyumlu bir ağ için uyum testi neden önemli?

İki ürün OpenID4VP'ye harfiyen uyup yine de birbiriyle konuşamayabilir. Yüksek güvence birlikte çalışabilirlik profili [HAIP](/blog/haip-and-token-status-list) bu boşlukların çoğunu tek bir seçim kümesi sabitleyerek kapatır; Avrupa dijital kimlik ekosistemi de ona dayanır. Tamga kendini AB uyumlu diye tanıtıyor. Soru, bu iddiayı kendi ödevimize kendimiz not vermeden nasıl sınayacağımız.

Kendi testlerimiz ve uyum vektörlerimiz kodu şartnameleri bizim okuduğumuz biçimle karşılaştırır. OpenID Foundation'ın [conformance suite](https://gitlab.com/openid/conformance-suite)'i ise başkasının okumasıyla: Vakfın bakımını yaptığı, protokolün öbür tarafını oynayan ve dikkatsiz bir uygulamanın yanlış yapacağı yüzlerce şeyi deneyen açık kaynak bir araç. Vakfın [sertifika programının](https://openid.net/certification/) arkasındaki araç da bu. Araç bizimle aynı fikirde değilse ikimizden biri yanılıyordur; hangimiz olduğunu bulmak işin yararlı kısmı.

## Neyi, neye karşı sınadık?

| | Issuer planı | Verifier planı |
|---|---|---|
| Plan | `oid4vci-1_0-issuer-haip-test-plan` | `oid4vp-1final-verifier-haip-test-plan` |
| Şartnameler | OpenID4VCI 1.0 Final, HAIP 1.0, FAPI 2.0 Security Profile | OpenID4VP 1.0 Final, HAIP 1.0 |
| Bizim servis | kimlik servisi, `id.sandbox.tamga.network` | Tamga Verify, `verify.sandbox.tamga.network` |
| Seçenek | SD-JWT VC, cüzdan başlatmalı yetki kodu akışı, istemci kanıtı, DPoP | SD-JWT VC, `direct_post.jwt`, `x509_hash`, imzalı `request_uri` |
| Aracın rolü | cüzdan; kendi cüzdan kanıtı ve anahtar kanıtıyla | cüzdan; kendi test anahtarıyla imzalı sahte bir AB PID'i (`urn:eudi:pid:1`) sunar |
| Modül | 63: 23 OpenID4VCI ve 40 FAPI 2.0 | 14 |

![İki plan: araç ikisinde de cüzdanı oynar](/blog/openid-conformance-self-test/tr/fig-plans.png)

Aracın `demo.certification.openid.net` adresindeki barındırılan sürümünü kullandık. Aracın imza sertifikaları yalnız **sandbox** güven listesine eklendi: cüzdan kanıtı imzacısı test cüzdan sağlayıcısı olarak, PID imzacısı ayrı bir test listesinde. Gerçek ağın listeleri değişmedi.

İki pratik seçim planları belirledi. Issuer planı bir kurumun issuer'ına değil kimlik servisine karşı koşuldu; çünkü kurumun yetkilendirme adımı kişiden önce kimlik belgesini sunmasını ister ve araç bunu yapamaz. Aracın kendi kanıtlarında politikamızın istediği iki alan da yok (cüzdan kanıtında iptal kaydı, anahtar kanıtında anahtar saklama durumu); sandbox bunları isteğe bağlı kabul ediyor. Gerçek ağda ikisi de zorunlu.

## Sonuçlar ne oldu?

Issuer planı 21–23 Ekim arasında üç tur ve bir tekrar koşusu sürdü. İlk tur 63 modülün 42'sini koştu ve hataların çoğunu buldu; ikinci tur 63'ünü de koştu (29 geçti, 22 uyarı, 5 başarısız); üçüncü tur ve son tekrar kalanları kapattı.

| Plan | Koşu | Geçti | Uyarı | Başarısız | İnceleme | Atlandı |
|---|---|---|---|---|---|---|
| Issuer (63) | son koşu, 23 Ekim | 53 | 2 | 0 | 4 | 4 |
| Verifier (14) | 1. tur, 27 Ekim | 0 | 7 | 0 | 6 | 1 |
| Verifier (14) | 2. tur, 27 Ekim | 7 | 0 | 0 | 6 | 1 |

Verifier'ın ilk turundaki yedi "uyarı" modülü asıl denetimi geçmişti (Tamga bozuk sunumu reddetti); uyarı her modülde aynıydı ve aynı gün düzeltildi.

"Geçti" olmayan her satırın bir nedeni var:

- **İki uyarı (issuer metadata, düz ve imzalı).** Metadata'mızda ETSI TS 119 472-3'ün tanımladığı ve AB ARF'nin kullandığı toplu ihraç ve yeniden kullanım politikası `credential_reuse_policy` var. Aracın şeması `credential_metadata`'yı ek alanlara kapatıyor; tek bir meşru uzantı şemanın bütün bir dalını düşürüyor ve araç ardından standart alanları (`scope`, `proof_types_supported` ve başkaları) bilinmeyen diye bildiriyor. İzin listesi uzantının adını susturabiliyor, bu zinciri susturamıyor. Alan bir AB standardı, o yüzden kalıyor. Sorunu, yeniden üretme adımları ve iki olası çözümle aracın bakımcıları için yazdık.
- **İnceleme.** Bazı olumsuz testler "ekran görüntüsü yükleyin" diye biter: araç sunucumuzun kişiye gösterdiği hata sayfasını göremez, onu bir insan onaylar. Verifier planında Tamga Verify'ın sunumu kabul ettiği ya da sonuç sayfasında reddettiği (yanlış belge türü, iptal edilmiş belge) her durum aynı nedenle incelemeyle biter. Doğrulayıcının yanıtı doğrudan HTTP 400 ile reddettiği durumlar kendiliğinden geçer.
- **Atlandı.** Üç issuer modülü şifreli belge yanıtını sınar; biz bunu ilan etmiyoruz (HAIP'te isteğe bağlı). Biri yenileme belirtecini sınar; kimlik servisimiz yenileme belirtecini yalnız kısa ömürlü sıfır bilgi kopyaları için verir ([ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)). Aracın isteği o kapsamı istemediği için belirteç verilmez ve modül atlanır. Verifier planında `request_uri_method=post` ilan edilmediği için o modül atlanır.

## Testler ne buldu, biz neyi değiştirdik?

Yirmiye yakın değişiklik, aşağıda konuya göre gruplu. Her biri onu gerektiren maddeyi gösteriyor; parantez içindeki koşul adları aracın loglarında geçen adlar.

![Konuya göre düzelttiklerimiz](/blog/openid-conformance-self-test/tr/fig-fixes.png)

### Metadata ve görünüm

- **İstemci kanıtı algoritmaları.** Yetkilendirme sunucusunun metadata'sı `attest_jwt_client_auth` sunuyor ama `client_attestation_signing_alg_values_supported` ve `client_attestation_pop_signing_alg_values_supported` listelerini vermiyordu (attestation-based client authentication §10.1). İkisi de artık `["ES256"]`.
- **Final sürümün biçimleri.** Her belge yapılandırmasında hâlâ üst düzey bir `display` vardı ve görünüm nesneleri `lang` kullanıyordu. OpenID4VCI 1.0 Final (§12.2.4) görünümü `credential_metadata.display` altına koyar ve alana `locale` der. Bunu yalnız issuer metadata'sında düzelttik; SD-JWT VC tür metadata'sı `lang`'ı korur, çünkü kendi şartnamesinin sözcüğü o.
- **Dil etiketleri.** Yeni bir denetim dil etiketlerini doğruluyor. Bizimkiler geçerliydi, ama kayıttaki `EN-us` gibi bir değeri ya da yinelenen bir dili durduran bir şey yoktu. Görünüm değerleri artık kanonik BCP 47 etiketi ve dil başına tek girdi (paketler 0.7.3).

### Kopyaları bağlayabilecek zaman alanları

- **Yuvarlanmış `iat` ve `exp`.** Belgeler verilme anını saniyesine kadar taşıyordu; bir paketin on kopyası ya da aynı kişiye verilen iki belge zaman üzerinden bağlanabiliyordu (RFC 9901 §10.1). Verilme ve bitiş zamanları artık saat başına aşağı yuvarlanıyor, mdoc geçerlilik alanları da onlarla birlikte.
- İki yeni toplu ihraç denetimi, ortak listede birbirinden farklı ve tahmin edilemez durum sıraları, zaten geçiyordu; onlar için regresyon testi ekledik.

### DPoP, PAR ve yetkilendirme sunucusu

- **PAR'da DPoP.** Pushed authorization request bir DPoP kanıtını `dpop_jkt` ile karşılaştırmadan kabul ediyordu; token ucu da PAR'dakinden farklı bir DPoP anahtarını kabul ediyordu (RFC 9449 §10). Kanıt artık PAR'da doğrulanıyor, kod o anahtara bağlanıyor ve token ucunda farklı anahtar `invalid_grant` alıyor.
- **`htu` normalleştirmesi.** `htu`'sunda ana makine adı büyük harfli ya da açık `:443` olan DPoP kanıtı reddediliyordu; RFC 9449 §4.3 önce RFC 3986 normalleştirmesini ister. Şema ve ana makine artık büyük/küçük harfe duyarsız karşılaştırılıyor, varsayılan bağlantı noktası düşüyor.
- **Koşudan önce kapatılanlar.** İlk turdan önce henüz koşulmamış FAPI 2.0 modüllerini okuduk ve bulacaklarını önceden kapattık: PAR, POST dışı yöntemlere 405 döner (RFC 9126 §2.3); yinelenen parametre ve PAR içinde `request_uri` `invalid_request` alır; yalnız `response_type=code` kabul edilir; `plain` PKCE reddedilir; kanıtlanan istemciden farklı bir `client_id` `invalid_client` alır; kod verildikten sonra `request_uri` yeniden kullanılamaz (RFC 9126 §4). Bu modüllerin hepsi ilk koşuda geçti.

### TLS

- **Şifre takımları.** TLS 1.2 hâlâ bir CBC/SHA-1 takımını kabul ediyordu. FAPI 2.0 (§5.2.2, BCP 195 ile) yalnız önerilen takımlara izin verir; sunucu artık yalnız ECDHE ile AES-GCM sunuyor.

### Belirteçler

- **Erişim belirtecinin yeniden kullanımı.** Erişim belirteçlerimiz tek kullanımlıktı; tek belirteçle birkaç belge isteği atan FAPI mutlu akışı bu yüzden düştü. Şartnameler yeniden kullanıma izin veriyor; [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests) artık belirtecin ömrü (en fazla beş dakika) içinde, yalnız kapsadığı yapılandırmalar için, toplam en fazla on kopya ve hep aynı DPoP anahtarıyla birden çok isteğe izin veriyor.
- **Kodun yeniden kullanımı.** Bir yetki kodu ikinci kez kullanıldığında, ilk kullanımından verilen belirteçler artık çalışmıyor (RFC 6749 §4.1.2, RFC 9700 §4.5).
- **Yenileme belirtecinin bağı.** Yenileme belirteçlerini DPoP anahtarına bağlıyorduk; araç yeni bir DPoP anahtarı ve aynı istemciyle yeniliyor. RFC 9449 §5 ve attestation-based client authentication §10.3 yenileme belirtecini istemci örneğine bağlar. [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding) onu cüzdan kanıtındaki örnek anahtarına bağlıyor; DPoP anahtarı değişebiliyor.
- **İlk belgeden önce yenileme.** Araç, token yanıtından hemen sonra, belge istemeden yeniliyor; yenileme belirtecinin gösterdiği kayıt henüz oluşmadığı için bunu reddediyorduk. RFC 6749 §6 yenileme belirtecinin verildiği andan itibaren kullanılabilmesine izin verir; artık kullanılabiliyor.

### Hata kodları ve başlıklar

- Bilinmeyen bir `credential_identifier` genel `invalid_credential_request` yerine `unknown_credential_identifier` döner (OpenID4VCI §8.3.1.2).
- `code_verifier`'sız token isteği `invalid_grant` döner ve kod yanar (RFC 7636 §4.6).
- Token ucunun hatalar dahil her yanıtında `Cache-Control: no-store` var (RFC 6749 §5.1).
- Belge ucundan gelen 401, hatayı ve kabul edilen algoritmayı söyleyen bir `WWW-Authenticate: DPoP` başlığı taşır (RFC 9449 §7.1). Bu madde issuer turlarından sonra yaptığımız protokol incelemesinden geldi.
- Başka bir istemcinin `request_uri`'sini açan kişi ham JSON yerine bir HTML hata sayfası görür.

### Belge yanıtının biçimi

- Belge yanıtımız fazladan bir alan taşıyordu: site başına takma adların tohumu. Araç belge yanıtlarındaki bilinmeyen alanları işaretler. Şartnamede uzantıyı yasaklayan bir şey yok, yani bu bir takdir meselesiydi; ama daha temiz, standart bir yol vardı. [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration) tohumu kendi belge yapılandırması yapıyor; ikinci bir standart belge isteğiyle alınıyor. Tohumu çevreleyen gizlilik kuralları değişmedi.

### Doğrulayıcı

- **İstekteki `purpose`.** İmzalı istek nesnesi OpenID4VP 1.0'ın (§5.1) tanımlamadığı bir `purpose` parametresi taşıyordu (`CheckForUnexpectedParametersInVpAuthorizationRequest`). Çıkarıldı. Cüzdanın gösterdiği amaç, `verifier_info` içindeki kayıt sertifikasından (ETSI TS 119 475) ve güven listesindeki kayıtlı kullanımdan gelir; zaten öyleydi.
- **`direct_post` cevabı.** Kabul edilen bir sunumdan sonra yanıt ucu `redirect_uri`'nin yanında `show_url` da dönüyordu (`ValidateDirectPostResponse`, OpenID4VP §8.2). Artık yalnız `redirect_uri` dönüyor; yüz yüze kontrol görünümünün anahtarı bu adresin içinde.
- **Doğrulama sırasında çekilen durum listeleri.** Tamga doğrulayıcıları durum listelerini önceden indirir ve önbellekten denetler; böylece kurum, belgenin ne zaman denetlendiğini öğrenmez. Araç her testte yeni bir liste adresi verir ve doğrulayıcının onu çektiğini denetler. Doğrulama sırasında eksik bir listeyi çekmek için varsayılanı kapalı, açıkça açılan bir seçenek ekledik; liste yalnız kurumun bildirdiği durum sunucusundan ve aynı ağ denetimleriyle çekilir. Yalnız sandbox'ın öz-test politikasında açık. Aynı iş gerçek bir boşluğu da kapattı: dış bir kurumun durum listesi adresi artık ilk görüldüğünde öğreniliyor; bu gerçek AB PID'leri için de önemli.
- **İstek nesnesinin alanları.** İstek nesnesinin gövdesi artık başlığın yanı sıra `aud` ve `iat` da taşıyor.
- HAIP altında yeni bir denetim, yanıt şifreleme anahtarını yeniden kullanan doğrulayıcıyı düşürür. Bizimki zaten her istekte yeni anahtar üretiyor; regresyon testi ekledik.

### Kod değil: ayar ve test adımları

Bazı bulgular bizimdi ama kodda değildi. Dağıtım sırasında yeniden başlayan bir servis üç modüle 502 döndü (koşu sırasında dağıtım yapılmaz). İkinci istemcinin dönüş adresinde sorgu dizisi var ve sandbox'ın izin listesi bunu tutmuyordu. Birkaç modül de test edenden tam bir adım ister: ret testinde Onayla değil Vazgeç'e basmak, `request_uri` yeniden kullanım testinde ilk açılışta hiçbir şey yapmamak, on dakikalık süre dolmasını beklemek, doğru ekran görüntüsünü yüklemek, bir takma adla aynı anda tek test koşmak. Her biri bize bir kez tekrar koşuya mal oldu.

## Neyi düzelteceğimize nasıl karar verdik?

Uyduğumuz kural: **düzeltmeyi şartname için yap, test aracı için değil; bilinçli her farkı yaz.** Her bulgu, koda dokunulmadan önce bir sınıfa kondu.

| Sınıf | Anlamı | Ne yaptık |
|---|---|---|
| hata | şartnamedeki ya da profildeki bir MUST başka türlüsünü söylüyor | düzelttik, regresyon testiyle |
| önerilen | bir SHOULD ya da gizlilik veya güvenlik önerisi | yazılı bir gerekçe yoksa düzelttik |
| ayar | aracın ayarı, test ortamı ya da test edenin adımı | ayarı ya da yöntemi düzelttik |
| beklenen | desteklemediğimiz bir seçenek ya da belgelenmiş bir uzantı | olduğu gibi bıraktık ve kaydettik |
| karar | şartname izin veriyor ama araç başka yol bekliyor | proje yönetimi bir ADR ile karar verdi |
| araç sınırı | araç hiçbir şartnamenin istemediği bir şeyi denetliyor | doğru kodu koruduk, bakımcılara bildirdik |

![Ayıklama: log satırından düzeltmeye](/blog/openid-conformance-self-test/tr/fig-triage.png)

Dört bulgu kapanmış kararlara dokunuyordu; o yüzden önce ADR'lerden geçti (0059–0062) ve her biri kod değişmeden önce proje yönetimince onaylandı. Bir uzantıyı bilerek koruduk (`credential_reuse_policy`); bir başkasını, temiz bir standart biçim bulunduğu için o biçime taşıdık. Testi geçmekle doğru olmak arasındaki fark burada: temiz sonuç için AB'nin tanımladığı bir alanı silseydik, sonuç daha kötü olurdu.

## Öz-test neyi göstermez?

- **Sertifika değildir.** OpenID sertifikası Vakıfla yürütülen ayrı bir süreçtir; bizim için de ayrı bir karar.
- **Planları yayımlamadık.** Araçta bir planı yayımlamak sonuçlarını herkese açar; planın ayarında da araca verdiğimiz test özel anahtarları (kanıt imzacısı, sahte PID'in imza anahtarı) var. Dışa aktarılan logları ve ekran görüntülerini kendimizde tutuyoruz.
- **Sandbox'ı, iki servisi ve her birinin tek seçeneğini kapsar.** Cüzdan planları cihaz derlemesi gerektirdiği için koşulmadı. Doğrulayıcının mdoc seçeneği koşulmadı. Bir kurumun issuer'ı bu planla sınanmadı.
- **Bazı düzeltmeler henüz npm'de değil.** npm'deki paketler 0.7.2; 27 Ekim'deki iki doğrulayıcı düzeltmesi ve dil etiketi değişikliği 0.7.3'te ve sandbox'ta çalışıyor.
- **Protokolü sınar, güveni değil.** Araç iletilerin doğru biçimde olduğunu ve denetimlerin yapıldığını sınar. Bir kurumun diploma vermeye yetkili olup olmadığı güven listesinin işidir, hukuki tanınma da hukukun.

## Kitte ne var?

Kit, ilk tam koşunun öğrettiklerini her OpenID4VCI issuer'ı ya da OpenID4VP verifier'ı için yazılmış hâlde topluyor. Hiçbir ürün ya da sunucu adı geçmiyor; örnekler `example.com` kullanıyor.

| Parça | Ne yapar |
|---|---|
| İş akışı | plan ve seçenekler, ayar, koşu sırası, tarayıcı adımları ve inceleme görüntüleri, loglar, ayıklama, düzeltme, tekrar koşu |
| Issuer planı başvurusu | her OpenID4VCI modülü: neyi denetler, şartname maddesi, tipik hata, düzeltme |
| FAPI 2.0 başvurusu | issuer planının içinde koşan 40 FAPI 2.0 Security Profile modülü |
| Verifier planı başvurusu | her modül ve 400 ile 200 yanıtlarının geçti ve incelemeye nasıl karşılık geldiği |
| Sık hatalar | belirti → koşul → neden → düzeltme, her bulgunun sınıfıyla |
| Ayar şablonları | iki plan için anahtarları çıkarılmış suite JSON'u, alan alan |
| Test PKI'sı | test kökü, kanıt imzacısı ve sahte PID anahtarları için openssl tarifi |
| Ön kontrol listesi | ilk koşudan önce kodda bakılacaklar |
| Log özetleyici | modül başına sonuç ve her başarısız, uyarı ve inceleme satırı; anahtar ve hesap bilgisi olmadan |

Kit bir yapay zekâ kodlama asistanı için eklenti olarak paketlendi; kurulum komutları [README](https://github.com/tamga-network/oidf-conformance-kit#install)'de. İçindeki her şey düz Markdown ve yalnız standart kütüphaneyi kullanan bir Python betiği; asistan olmadan da çalışır:

```bash title="Başvuru belgelerini ve log özetleyiciyi doğrudan kullanmak"
git clone https://github.com/tamga-network/oidf-conformance-kit
cd oidf-conformance-kit
# planınızın loglarını araçtan dışa aktarın, sonra:
python scripts/oidf-log-summary.py ./logs --latest
python scripts/oidf-log-summary.py ./logs --latest --format markdown --redact -o summary.md
```

> **Not:** Uyum logları araca verdiğiniz özel anahtarları ve dışa aktaranın hesabını içerir. Logları ve doldurulmuş ayarları sürüm denetimine koymayın. Özetleyici yalnız izin verilen alanları yazar; `--redact` sunucu adlarınızı da gizler.

## Nasıl katkı verebilirsiniz?

Araç hızlı değişiyor: modüller ekleniyor, adı değişiyor ya da yeni bir şey denetlemeye başlıyor. Kitteki modül adları aracın 26 Ekim 2026 tarihli ana dalına göre denetlendi ve zamanla eskiyecek. En çok işe yarayan üç katkı:

- eklenen ya da değişen bir modül veya koşul, denetlediğiniz araç commit'iyle;
- karşılaştığınız ve düzelttiğiniz bir hata: koşul adı, neden, düzeltme ve onu gerektiren madde;
- bir araç sınırı: davranışı hiçbir şartnamenin neden istemediği ve bakımcılara açılan kaydın bağlantısı.

Kitteki her düzeltme bir şartnameye dayanmak zorunda; tek kaynak araçsa sınır olarak girer. Cüzdan planları henüz kapsanmıyor; en büyük boşluk o. Sorun kaydı ve pull request'ler [github.com/tamga-network/oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) adresinde.

## Sık sorulan sorular

### Tamga OpenID sertifikalı mı?

Hayır. Vakfın test aracını sandbox'ta kendimiz koştuk. Sertifika ayrı bir süreç ve başvurulmadı.

### Bazı modüller neden "geçti" değil de "inceleme" ile bitiyor?

Araç kişiye gösterilen bir sayfayı göremez. Doğrulayıcımız sonucu kendi sayfasında gösterdiğinde ya da sunucumuz bir hata sayfası gösterdiğinde araç ekran görüntüsü ister ve bir insan onaylar. Bu modüllerin olağan sonu budur.

### Yalnız aracı memnun etmek için kod değiştirdiniz mi?

Hayır. Her kod değişikliği bir şartname ya da profil maddesine dayanıyor. Aracın hiçbir şartnamenin istemediği bir şey beklediği yerde kodumuzu koruduk ve farkı kaydettik.

### Kiti Tamga'yla ilgisi olmayan bir issuer ya da verifier için kullanabilir miyim?

Evet. Başvuru belgeleri geneldir; log özetleyici bu iki planın dışa aktarılan her logunda çalışır.

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

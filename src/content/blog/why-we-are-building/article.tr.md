---
title: "Belgeler dijital, güven hâlâ kâğıtta: Tamga Network'ü neden kuruyoruz?"
slug: why-we-are-building
description: Dijital belgeler başka bir ülkede hâlâ telefonla ve apostille doğrulanıyor. Tamga Network'ü neden kurduğumuzu, nasıl çalıştığını ve bugün neyin hazır olduğunu anlatıyoruz.
date: 2026-10-29
lang: tr
category: announcements
draft: false
related: learn:what-is-tamga-network, a-pdf-is-not-a-document, why-no-blockchain-yet, how-trust-lists-work, page:/manifesto
---

<!-- Kaynaklar: İngilizce yazının kaynak notuyla aynı (ana sayfa metinleri; trust.tamga.network canlı listelerin listesi: TR ACTIVE geçici işletmeciyle, AZ/KZ/KG/UZ TDT üyesi olarak ayrılmış, HU/TM gözlemci olarak ayrılmış, TAMGA-WP-1 2026-10-14'ten beri ACTIVE; marka sayfası; manifesto v1.0 gözden geçirilmiş baskı 2026-10-27; CHANGELOG 1.0.0; npm 0.7.4 (2026-10-29); OpenID öz-testi yazısı; ADR-0009, ADR-0042, ADR-0051; Tüzük (AB) 2024/1183 Md. 5a). -->

Tamga Network, bir kurumun verdiği dijital belgenin başka bir kurumda, hatta başka bir ülkede saniyeler içinde doğrulanmasını sağlayan ortak kurallar ve imzalı listelerden oluşur. Doğrulayan taraf belgeyi veren kuruma sormaz, belgenin sahibi de yalnız istenen bilgiyi paylaşır. Ağı Türk dünyası için, Avrupa'nın dijital kimlik düzeniyle aynı standartları kullanarak kuruyoruz. Bu yazıda neden başladığımızı, ağın nasıl çalıştığını, adımızın nereden geldiğini, hangi ilkelere dayandığımızı ve bugün neyin hazır olup neyin olmadığını anlatıyoruz.

## Bugün bir belge nasıl doğrulanıyor?

Almatı'daki bir kurum Bakü'de verilmiş bir belgeyi doğrulamak istediğinde telefon, e-posta, apostil ve haftalar gerekiyor. Kurumun elinde çoğu zaman taranmış bir PDF ya da fotokopi oluyor. İkisi de kolayca değiştirilebiliyor ve gerçeğini sahtesinden ayırmak uzmanlık istiyor.

Sorunun bir de kişiye dokunan yanı var. Yaşınızı kanıtlamak için kimlik kartınızın tamamını, mezun olduğunuzu kanıtlamak için bütün not dökümünüzü veriyorsunuz. Bu kopyaların her biri başka birinin sunucusunda kalıyor. Üstelik her ülke kendi dijital sistemini kuruyor. Bu sistemler birbirini tanımadığı için bir ülkede dijital olan belge, öteki ülkede yeniden kâğıda dönüyor.

Belgeler dijitalleşti, ama onlara duyduğumuz güven hâlâ kâğıt üzerinden işliyor. Bu sorunları [PDF bir belge değildir](/blog/a-pdf-is-not-a-document) yazımızda tek tek ele alıyoruz.

## Tamga Network nasıl çalışır?

İşin içinde üç taraf var: belgeyi veren kurum, belgeyi taşıyan kişi ve belgeyi kontrol eden taraf. Üçü de aynı imzalı listeye dayanır.

![Üç adım: kurum belgeyi imzalar, kişi belgeyi taşır, doğrulayan saniyeler içinde emin olur](/blog/why-we-are-building/tr/fig-steps.png)

1. **Kurum belgeyi imzalar.** Üniversite, hastane ya da ticaret odası belgeyi kendi anahtarıyla dijital olarak imzalar ve kişinin cüzdanına gönderir. Kurumun anahtarı devletin imzalı güven listesinde kayıtlıdır.
2. **Kişi belgeyi taşır.** Belge telefonda durur. Biri bir bilgi istediğinde kişi kimin, neyi, neden istediğini görür ve yalnız onayladığı bilgiyi gösterir.
3. **Doğrulayan saniyeler içinde emin olur.** İmzayı ve kurumun listedeki kaydını kontrol eder. Kaynağa sormaz, cevap beklemez.

Bütün düzen, doğrulayanın kuruma sormamasına dayanıyor. İmza, belgenin o kurumdan geldiğini ve üzerinde tek bir harfin bile değişmediğini kanıtlar. Güven listesi de imzalayanın gerçekten o kurum olduğunu doğrular. İkisi birlikte telefonun, e-postanın ve apostilin yerini alır.

## Güven listeleri ne işe yarar?

Herkes bir anahtar üretip bir şey imzalayabilir. Bu yüzden geçerli bir imza, imzalayanın gerçek bir üniversite olup olmadığını tek başına söylemez. Bu soruyu güven listeleri cevaplar. Listeler, her halkanın bir sonrakini imzaladığı bir zincir oluşturur.

![Güven zinciri: listelerin listesi, Türkiye listesi, kurum sertifikası, belge](/blog/why-we-are-building/tr/fig-chain.png)

En üstte **listelerin listesi** durur ve hangi ülke listelerinin geçerli olduğunu söyler. Her devletin **kendi listesi** o ülkede belge vermeye yetkili kurumları sayar. **Kurum sertifikası** kurumun anahtarını tanıtır, **belge** de o anahtarla imzalanır. Avrupa Birliği de aynı modeli kullanıyor.

Her devlet kendi listesini kendisi yayınlar. Listelerin bugünkü durumu şöyle:

| Liste | Durum |
|---|---|
| Türkiye | Yayında. Tamga listeyi devlet adına geçici olarak işletiyor. |
| Azerbaycan, Kazakistan, Kırgızistan, Özbekistan | Türk Devletleri Teşkilatı'nın bu üye devletleri için yer ayrıldı; her devlet kendi listesini kendisi yayınlayacak. |
| Macaristan, Türkmenistan | Teşkilatın gözlemci devletleri için yer ayrıldı. |
| Avrupa Birliği | Ağ, AB listelerini dış liste olarak okuyabiliyor; bugün bağlı bir AB listesi yok. |

## Adımız neden Tamga?

Tamga, Türk ve Moğol boylarının eski mührüdür. Hayvanlara, silahlara, halılara, mezar taşlarına ve belgelere vurulurdu. Bir şeyin kime ait olduğunu, bir sözün kimden geldiğini ve bir yetkinin gerçek olduğunu gösterirdi. Her boyun kendi tamgası vardı ve tamga aynı anda kimlik, imza ve tapu yerine geçerdi.

Doğrulanabilir dijital belge bugün aynı işi görüyor, yalnız işaret keskiyle değil matematikle atılıyor. Logomuz da aynı fikirden geliyor. İşaret iç içe geçmiş bir T'dir: dıştaki T ağı, içteki iki kol da ağa katılan devletleri ve kurumları temsil eder. Bir mühür gibi tek çizgi kalınlığıyla ve tek açıyla, hiç eğri kullanılmadan kesilmiştir.

## Ağ hangi ilkelere dayanıyor?

| İlke | Ne anlama geliyor |
|---|---|
| Kişi merkezde | Belge kişinin cüzdanında durur ve neyin gösterileceğine kişi karar verir. |
| Ağ kimsenin malı değil | Ağ hizmet satmaz ve kimseye ayrıcalık tanımaz. Hedef bağımsız bir vakıf. |
| Liste devletin | Her devlet kendi güven listesinin sahibidir ve kimi tanıyacağına kendisi karar verir. |
| Ağda kişisel veri yok | Listelerde, kayıtlarda ve günlüklerde kişisel veri, hatta onun özeti bile bulunmaz. |
| Açık kural, açık kod | Her kural numaralı ve herkese açık, kod da GitHub'da. |

Her ilke, kurallar kitabımız Tamga ARF'de numaralı kurallara dönüşür. Örneğin "ağda kişisel veri yok" ilkesi, güven listelerinde, günlüklerde ve ileride kurulacak ortak defterde belge içeriğinin ya da belge özetinin bulunmamasını şart koşar.

## Neden şimdi?

Avrupa Birliği, her üye devletin 2026 sonuna kadar vatandaşlarına bir dijital kimlik cüzdanı sunmasını zorunlu kıldı. Bu cüzdanın çevresindeki standartlar oturuyor; belge biçimleri, protokoller ve güven listeleri artık tanımlı. Manifestomuz durumu şöyle anlatıyor: bu dönüşümün olup olmayacağı artık soru olmaktan çıktı, asıl soru onu kimin kuracağı ve kimin yalnızca satın alacağı.

Yeni modeli dışarıdan alabilir ya da aynı açık standartlarla kendi altyapımızı kurabilirdik. Biz kurmayı seçtik. Avrupa'yla aynı belge biçimlerini ve protokolleri kullanıyoruz, kurallar ve listeler ise Türk dünyasının devletlerine ait. Böylece ağ hem Avrupa'yla uyumlu hem de bağımsız kalıyor. Avrupa'daki tarihlerin ayrıntısı [AB takvimi](/learn/eu-timeline) sayfasında.

## Bugün neler hazır, neler değil?

| Bugün hazır | Henüz yok |
|---|---|
| Kurallar: Tamga ARF 1.0 ve kurallar kitapları (arf.tamga.network) | Gerçek ağda belge veren kurum yok; ilk kurum pilotla katılacak |
| İngilizce ve Türkçe geliştirici belgeleri (docs.tamga.network) | Listedeki cüzdanların hiçbiri henüz uygulama mağazalarında değil |
| İmzalı güven listeleri (trust.tamga.network); ilk cüzdan sağlayıcı da listede | Üretimde ortak defter yok; kodu yazıldı ve test edildi, ama en az iki bağımsız işletmeci çalıştırana kadar kapalı kalacak |
| Tamga Verify: doğrulama kodunu kendisi çalıştırmak istemeyenler için doğrulama hizmeti | Hiçbir devletin ya da Avrupa Birliği'nin tanıması yok |
| Uydurma kişilerle uçtan uca deneme yapılan test ağı ve npm'de açık paketler (@tamga-network, sürüm 0.7.4) | Dış güvenlik denetimi henüz yapılmadı |
| OpenID Foundation'ın uyum test aracıyla yapılan ve başarısız modül kalmadan biten öz-test | |

Bu sınırları açıkça yazıyoruz, çünkü sınırlarını saklayan bir güven altyapısı güveni hak etmez. Ortak defterin neden henüz olmadığını [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında anlattık: en az iki bağımsız işletmeci olmadan defter, yalnızca daha yavaş bir veritabanıdır. Uyum testlerinin ayrıntısı [OpenID uyum testlerinden öğrendiklerimiz](/blog/openid-conformance-self-test) yazısında.

## Nereden başlamalı?

- **Kavramlar size yeniyse** [öğrenme bölümü](/learn), dijital kimlikten Tamga Network'e adım adım ilerliyor.
- **Kurumunuz belge veriyor ya da doğruluyorsa** [katılım sayfası](/join) nasıl yer alabileceğinizi anlatıyor.
- **Geliştiriciyseniz** [sandbox rehberi](https://docs.tamga.network/tr/guides/sandbox) her adımı test ağında nasıl deneyeceğinizi gösteriyor.

## Sık sorulan sorular

### Tamga Network bir blockchain mi?

Hayır. Bugün güven, imzalı ve sürümlenen listelerden geliyor. Ortak defterin kodu yazıldı ve test edildi, ama yalnız en az iki bağımsız işletmeci onu çalıştırdığında açılacak.

### Tamga Network kimin?

Ağ hizmet satmaz ve kimseye ayrıcalık tanımaz. Bugün ağı geçici bir işletmeci yürütüyor, hedef ise bağımsız bir vakıf.

### Belgem nerede duruyor?

Kendi telefonunuzdaki cüzdanda. Ağın listelerinde, kayıtlarında ve günlüklerinde kişisel veri bulunmaz.

### Bugün kullanabileceğim bir cüzdan var mı?

Ağ cüzdan işletmez, cüzdanları listeler. Listedeki ilk cüzdan olan Tamga Wallet henüz uygulama mağazalarında değil. Listedeki bir cüzdan mağazaya çıkana kadar bütün adımlar test ağında denenebilir.

## Kaynaklar

- [Tamga Network nedir](/learn/what-is-tamga-network)
- [Güven listeleri](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network)
- [Manifesto](/manifesto)
- [Tüzük (AB) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

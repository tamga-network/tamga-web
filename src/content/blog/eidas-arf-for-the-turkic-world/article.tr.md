---
title: "eIDAS 2.0 ve ARF: Türk dünyası için ne anlama geliyor?"
slug: eidas-arf-for-the-turkic-world
description: AB eIDAS 2.0 ve referans çerçevesiyle neyi kurdu, ne zaman uygulanıyor, AB dışındaki devletler için uyum neden önemli ve sınırları nerede.
date: 2026-10-08
lang: tr
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Kaynak: (AB) 2024/1183 (EUR-Lex, 2026-10-08'de denetlendi): kabul 11.4.2024, RG 30.4.2024, yürürlük 20.5.2024; değişen 910/2014 Md. 5a (cüzdan; 5a(1) uygulama tüzüklerinden 24 ay sonra; 5a(2) üye devletçe, onun yetkisiyle ya da onun tanımasıyla), 5b (güvenen taraf kaydı), 5c (sertifikasyon), 5d (sertifikalı cüzdan listesi), 5f (sınır ötesi kabul; 5f(2) 36 ay), 14(1) (üçüncü ülke güven hizmetleri, uygulama tüzüğü ya da ABİHA Md. 218 anlaşmasıyla nitelikli hizmete eşdeğer), 22 (güven listeleri), 45b-45h (öznitelik belgeleri). Uygulama tüzükleri: 2024/2977, 2979, 2980, 2981, 2982 (28.11.2024, RG 4.12.2024; 2024/2978 ilgisiz); 2025/848 ve 2025/849 (6.5.2025, RG 7.5.2025); 2025/1569 (29.7.2025, RG 30.7.2025); 2026/1731 (15.7.2026, RG 22.7.2026). AB ARF v3.0.0 (GitHub, 2026-07-23). Komisyon "EUDI Wallet implementation" sayfası: dört pilot Nisan 2023, 26 üye devlet, Norveç, İzlanda ve Ukrayna'dan 350'den fazla kuruluş. İkinci dalga WE BUILD ve APTITUDE (2025). ETSI TS 119 602. TDT: Dijital Ekonomi Ortaklığı Anlaşması 6.11.2024 Bişkek, Türkiye onay kanunu RG Haziran 2026 (basın); Türkistan gayriresmî zirvesi 15.5.2026, bildiri elektronik dijital imzaların karşılıklı tanınması anlaşma taslağının incelemesinin tamamlanmasını istiyor (basın). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3, §1.4, §6, §6.1; ADR-0035, ADR-0036; canlı lotl.json (TR etkin; AZ, KZ, KG, UZ ayrılmış; HU, TM gözlemci), 2026-10-08. -->

eIDAS 2.0, her AB üye devletinin 2026 sonuna kadar bir dijital kimlik cüzdanı sunmasını zorunlu kılan AB tüzüğüdür. Mimari ve Referans Çerçevesi (ARF) ise bunun arkasındaki teknik plandır. İkisi birlikte eksiksiz bir güven sistemi tanımlar: cüzdan, devletin verdiği kimlik verisi, diploma gibi öznitelik belgeleri, imzalı güven listeleri, veri isteyen her hizmetin kaydı ve sertifikasyon. Tüzük Türk dünyasına uygulanmaz; ama standartları AB'deki bankaların, üniversitelerin ve işverenlerin okuyacağı ortak dile dönüşüyor. AB dışındaki bir devlet bu dili bugünden benimseyebilir. AB'nin tanıması ise ayrı bir adımdır ve onu hükümetler atar.

## AB eIDAS 2.0 ile neyi kurdu?

eIDAS 2.0 diye anılan (AB) 2024/1183 sayılı Tüzük, 2014 tarihli eIDAS tüzüğünü değiştirir ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014 metni çoğunlukla ulusal elektronik kimlik sistemleri ve elektronik imzayla ilgiliydi. 2024 metni bunlara telefondaki bir cüzdan etrafında kurulan bütün bir ekosistem ekler. Bu ekosistemi altı yapı taşı taşır:

![eIDAS 2.0'ın altı yapı taşı: cüzdan, PID, öznitelik belgeleri, güven listeleri, güvenen taraf kaydı, sertifikasyon](/blog/eidas-arf-for-the-turkic-world/tr/fig-yapi-taslari.png)

| Yapı taşı | Ne | Hukuki dayanak |
|---|---|---|
| **Avrupa Dijital Kimlik Cüzdanı** | Kişinin kimlik verisini ve belgelerini tutan, kişinin denetiminde paylaşan uygulama | Md. 5a |
| **PID** (kişi kimlik verisi) | Devlet tarafından ya da devlet adına, yüksek güvence seviyesinde verilen temel kimlik verisi | Md. 5a, 2024/2977 sayılı Uygulama Tüzüğü |
| **Elektronik öznitelik belgeleri** | Geri kalan her belge: diploma, ehliyet, üyelik. *Nitelikli* öznitelik belgesini (QEAA) nitelikli güven hizmeti sağlayıcısı verir; kamu öznitelik belgesini (PuB-EAA) yetkili kaynaktan sorumlu kamu kurumu verir | Md. 45b–45h, 2025/1569 sayılı Uygulama Tüzüğü |
| **Güven listeleri** | Hangi sağlayıcıya, hangi iş için güvenileceğini söyleyen imzalı listeler | Md. 22; ETSI TS 119 612 ve ETSI TS 119 602 |
| **Güvenen taraf kaydı** | Cüzdandan veri istemek isteyen her hizmet bir üye devlette kaydolur; ne isteyeceğini ve neden isteyeceğini beyan eder | Md. 5b, 2025/848 sayılı Uygulama Tüzüğü |
| **Sertifikasyon** | Cüzdanlar sunulmadan önce uygunluk değerlendirme kuruluşlarınca sertifikalanır | Md. 5c, 2024/2981 sayılı Uygulama Tüzüğü |

İki nokta kolay gözden kaçar. Birincisi, sistemi sınır ötesinde çalıştıran güven listeleridir. Bir ülkedeki doğrulayıcının başka bir ülkedeki her üniversiteyle ayrı bir düzen kurması gerekmez; tek bir imzalı listeyi okur ([imzalı güven listesi nasıl çalışır](/blog/how-trust-lists-work)). İkincisi, güvenen taraf kaydı kişiyi imza kadar korur: cüzdan, bir hizmetin istediği alanları kaydında beyan ettikleriyle karşılaştırabilir ve fazlası istendiğinde uyarır.

## ARF nedir, tüzükle ilişkisi ne?

Tüzük yükümlülükleri koyar. Uygulama tüzükleri teknik ayrıntıları belirler ve standartlara atıf yapar. ARF ise bunların hepsini tek bir mimaride birleştiren başvuru belgesidir: roller, akışlar, veri modeli, güven modeli, rol başına üst düzey gereksinimler ve her belge türü için kural kitapları (rulebook). Avrupa Komisyonu ARF'yi GitHub'da açık olarak yayımlar. Güncel sürüm 3.0.0'dır ve 23 Temmuz 2026'da yayımlandı ([ARF sürümü](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Altta herkesin kullanabileceği açık standartlar vardır: belgeler için IETF SD-JWT VC ve ISO/IEC 18013-5 mdoc, belge verme ve gösterme için HAIP profiliyle OpenID4VCI ve OpenID4VP, iptal için IETF Token Status List, kurumlar için X.509 sertifikaları ve ETSI güven listesi biçimleri. ETSI TS 119 602, güvenilen kuruluş listelerini (LoTE, lists of trusted entities) tanımlar; cüzdan sağlayıcıları, PID sağlayıcıları ve nitelikli güven hizmeti sağlayıcısı olmayan öbür kuruluşlar için kullanılan JSON liste biçimi budur ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartların hiçbiri AB ile sınırlı değildir. Geri kalan herkes için kapı da burada açılır.

## Hangi parça ne zaman uygulanıyor?

![2024'teki tüzükten 2027 sonundaki kabul yükümlülüğüne eIDAS 2.0 takvimi](/blog/eidas-arf-for-the-turkic-world/tr/fig-takvim.png)

| Tarih | Ne oldu | Kaynak |
|---|---|---|
| 20 Mayıs 2024 | (AB) 2024/1183 yürürlüğe girdi | Tüzüğün 2. maddesi |
| 24 Aralık 2024 | İlk beş uygulama tüzüğü yürürlükte: 2024/2977 (PID ve öznitelik belgeleri), 2024/2979 (cüzdan bütünlüğü ve temel işlevler), 2024/2980 (bildirimler), 2024/2981 (sertifikasyon), 2024/2982 (protokoller ve arayüzler) | kabul 28 Kasım 2024, yayım 4 Aralık 2024 |
| 7 Mayıs 2025 | 2025/848 (güvenen taraf kaydı) ve 2025/849 (sertifikalı cüzdan listesi) yayımlandı | kabul 6 Mayıs 2025 |
| 30 Temmuz 2025 | 2025/1569 (nitelikli ve kamu öznitelik belgeleri) yayımlandı | kabul 29 Temmuz 2025 |
| 22 Temmuz 2026 | İlk tüzüklerden dördünün atıf yaptığı standartları güncelleyen 2026/1731 yayımlandı | kabul 15 Temmuz 2026 |
| 23 Temmuz 2026 | ARF 3.0.0 yayımlandı | GitHub |
| 2026 sonu | Her üye devlet en az bir cüzdan sunar | Md. 5a(1): uygulama tüzüklerinden 24 ay sonra |
| 2027 sonu | Güçlü kimlik doğrulama kullanmak zorunda olan özel hizmetler (bankacılık, ulaşım, enerji, sağlık, eğitim, telekomünikasyon ve diğerleri) kullanıcı isterse cüzdanı kabul eder | Md. 5f(2): 36 ay |

Doğrulayıcı için en önemli satır sonuncusu. 2027 sonundan itibaren AB'deki bir banka, kişi isterse cüzdanla kimlik doğrulamayı kabul etmek zorunda. Aynı tarihlerin adım adım anlatımı [Avrupa takvimi](/learn/eu-timeline) sayfasında.

## Son tarihten önce nasıl denendi?

Komisyon, ARF'yi gerçek hizmetlerde çalıştıran büyük ölçekli pilotları destekledi. Dördü Nisan 2023'te başladı: EWC (seyahat belgeleri), POTENTIAL (kamu hizmetleri, bankacılık, telekomünikasyon, ehliyet, imza ve sağlık), NOBID (ödemeler) ve DC4EU (eğitim ve sosyal güvenlik). Komisyon'a göre bu pilotlar 26 üye devlet, Norveç, İzlanda ve Ukrayna'dan 350'den fazla kamu ve özel kuruluşu bir araya getirdi ([Komisyon: EUDI Wallet uygulaması](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). İki pilot daha, WE BUILD ve APTITUDE, 2025'te başladı.

Bu listede Ukrayna'nın yer alması dikkate değer. AB dışındaki bir ülke, sistemi üye devletlerle birlikte denedi. Pilotlara katılmak hukuki tanıma doğurmaz. Ama teknik çalışmanın komşulara açık olduğunu gösterir. DC4EU eğitim belgelerini de denedi; Türk devletleri ile Avrupa arasında gidip gelen öğrenciler ve mezunlar için en çok önem taşıyan belgeler de bunlar.

## AB dışındaki bir ülke için uyum neden önemli?

Çünkü insanlar, mallar ve diplomalar sınırı zaten geçiyor ve sınırın bir tarafında evrak dijitale dönmek üzere. Üç durum sık tekrarlanır:

- **Eğitim.** Bişkek'ten bir mezun Almanya'da yüksek lisansa başvuruyor. Diploması AB biçiminde imzalı bir belgeyse kabul ofisinin yazılımı onu saniyeler içinde denetler. Taranmış bir PDF ise biri e-posta yazar ve bekler.
- **İş ve hareketlilik.** Taşkent'ten bir mühendis Münih'e taşınıyor. AB'deki işverenler ve bankalar cüzdan belgelerini okuyacak biçimde hazırlanıyor; aynı biçimdeki bir belge aynı sürece doğrudan girer.
- **Ticaret.** Bakü'deki bir şirket kaydını, lisanslarını ya da sertifikalarını AB'deki bir ortağına kanıtlıyor. Kişisel belgeleri taşıyan listeler ve biçimler bu belgeleri de taşır.

Her durumda iki ayrı şeyin doğru olması gerekir. Belgenin *okunabilir* olması biçim ve protokol işidir. Belgeyi verenin *güvenilir* olması ise liste ve tanıma işidir. Tamga Trust Framework bu yüzden birlikte çalışabilirliği üç seviyeye ayırır:

![Birlikte çalışabilirliğin üç seviyesi: taşınabilirlik ve güven teknik, hukuki tanıma siyasi](/blog/eidas-arf-for-the-turkic-world/tr/fig-uc-seviye.png)

1. **Taşınabilirlik.** Aynı biçimler ve protokoller. Bir AB cüzdanı ya da doğrulayıcısı belgeyi teknik olarak işleyebilir. Bu bugün mühendislikle sağlanabilir.
2. **Güven.** Birbirini gösteren güven listeleri; her liste yalnız tanımlı bir kapsam için kefil olabilir. Bu da tekniktir, ama her iki tarafta hangi listeye güvenileceğine dair bir karar gerektirir.
3. **Hukuki tanıma.** Bir devlet ya da AB, başka birinin belgelerini hukuki sonuç doğuracak biçimde kabul eder. Buna hükümetler yasa ya da anlaşmayla karar verir.

İlk iki seviye üçüncüden önce kurulabilir ve erken kurmanın anlamı da budur. İki hükümet birbirinin belgelerini tanımaya karar verdiğinde onları taşıyan sistemler zaten uyumlu olur. Biçim değişti diye kimsenin diplomasını yeniden alması gerekmez.

## Türk dünyası dijital güven konusunda bugün ne yapıyor?

Türk Devletleri Teşkilatı dijital iş birliğini gündemine aldı. Üye devletler 6 Kasım 2024'teki Bişkek zirvesinde e-ticaret, kâğıtsız ticaret, elektronik imza, veri koruma ve siber güvenliği kapsayan Dijital Ekonomi Ortaklığı Anlaşması'nı imzaladı; Türkiye'nin onay kanunu Haziran 2026'da Resmî Gazete'de yayımlandı ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 15 Mayıs 2026'daki Türkistan gayriresmî zirvesinin teması yapay zekâ ve dijital kalkınmaydı. Basına yansıdığı biçimiyle zirve bildirisi, üye devletleri elektronik dijital imzaların karşılıklı tanınmasına ilişkin anlaşma taslağının incelemesini tamamlamaya çağırıyor; Kazakistan Cumhurbaşkanı da dijital imzaların ve elektronik belgelerin karşılıklı tanınmasını önerdi ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

İmzaların karşılıklı tanınması yukarıdaki modelin hukuki seviyesidir. Ortak bir güven katmanı ise onun altındaki teknik seviyedir. Tamga Network'ün Türk Devletleri Teşkilatı ya da üye devletlerinden herhangi biriyle bir anlaşması yoktur; teknik seviyeyi, devletler kullanmak isterse hazır olsun diye kurar.

## Tamga Network AB modelinden neyi alıyor?

Teknik katmanı, değiştirmeden. Tamga'nın kuralı şudur: belge, protokol ve güven listesi biçimleri AB standartlarından ayrılmaz; Tamga'ya özgü her ek standart bir uzantı noktasıyla yapılır ve standart istemcileri bozmaz ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)).

| AB'deki öğe | Tamga Network'te |
|---|---|
| SD-JWT VC ve ISO mdoc | aynı; kimlik belgesi iki biçimde |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | aynı |
| Token Status List | aynı |
| LOTL ve ulusal güven listeleri | aynı iki katmanlı model; her Türk devleti için bir yer |
| LoTE (ETSI TS 119 602) | dış listeler için ilk okunan biçim |
| Güvenen taraf kaydı ve kayıt sertifikaları | AB'nin ortak kayıt veri seti ve sertifika modeli |
| ARF rol seti | her rolün her ulusal listede bir yeri var, boş olsa bile |

Yönetişim katmanı ise Türk dünyası için yazılır: her devlet kendi listesinin tek yazarıdır, devletler arası tanımaya her devlet kendisi karar verir. Eşlemenin tamamı, Tamga kurallarının AB'ninkinden nerede ve neden ayrıldığı [Tamga ARF: Avrupa çerçevesini nasıl uyarladık](/blog/tamga-arf) yazısında.

Ağın listelerin listesinde bugünden Türk Devletleri Teşkilatı'nın her üye devleti ve iki gözlemci devlet için bir yer var; her devlet kendi listesini devralabilir ([ağ neden vakfa gidiyor](/blog/network-as-a-foundation)). Bugün yalnız Türkiye listesi etkin; Tamga onu ulusal makam adına geçici olarak yayımlıyor ve liste bunu kendi içinde yazıyor. Diğerleri ayrılmış durumda. Canlı listeyi `trust.tamga.network` adresinde okuyabilirsiniz.

## Dürüst sınırlar neler?

- **Tamga Network AB tarafından tanınmış değildir.** AB uyumludur: aynı standartları konuşur ve bunu testlerle gösterir. "EUDI Wallet", bir üye devletin sunduğu ya da tanıdığı ve AB kurallarına göre sertifikalanan cüzdanların hukuki unvanıdır. AB dışındaki hiçbir ağ ya da cüzdan bugün bu unvanı iddia edemez.
- **Tüzükte kestirme yol yoktur.** eIDAS'ın 14. maddesi, üçüncü bir ülkedeki güven hizmetlerinin AB'deki nitelikli güven hizmetlerine eşdeğer sayılmasına izin verir; ama yalnız bir AB uygulama tüzüğüyle ya da AB ile o ülke arasında ABİHA 218. madde uyarınca yapılan bir anlaşmayla. Bu, hükümetler arası bir müzakeredir. Tamga teknik tarafı hazır edebilir; bu süreci başlatamaz, sonuçlandıramaz.
- **Henüz hiçbir dış liste eklenmedi.** Başka bir devletin ya da AB'nin listesini sabitlenmiş imzacı ve tanımlı kapsamla göstermenin mekanizması hazır ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)). Her ekleme ayrı ve kayda geçen bir karardır; şimdiye kadar hiçbiri alınmadı.
- **Güven çapası bugün tek işletmeciye dayanıyor.** Listeler imzalı, sürümlü ve herkese açık olarak kayıtlı; ama ikinci bağımsız işletmeci katılana kadar ağ tek bir imzaya dayanıyor. Çerçeve bunu bilinen bir sınır olarak yazar ([Tamga ARF](https://arf.tamga.network/tr/architecture)).
- **Türk devletleri arasındaki tanıma da siyasidir.** Kazakistan'daki bir doğrulayıcının Türkiye'deki bir üniversiteye güvenmesi Kazakistan'ın kararıdır. Ağ bu kararı yazılımda ifade etmeyi ve uygulamayı kolaylaştırır; kararı ağ vermez.

## Sık sorulan sorular

### eIDAS 2.0 Türkiye'ye ya da Orta Asya devletlerine uygulanır mı?

Hayır. Tüzük AB üye devletlerini ve AB'de kapsanan hizmetleri bağlar. Standartları açıktır; her devlet ya da kurum kullanabilir. AB içinde hizmet sunan şirketler kendi yükümlülüklerini bir hukukçuyla değerlendirmelidir.

### Türkiye'de verilen bir belge AB'de kabul edilebilir mi?

Aynı biçimleri kullanıyorsa AB yazılımı onu okuyabilir; Tamga belgeleri bu biçimleri kullanır. Hukuki sonuç doğuracak biçimde güvenilmesi için belgeyi verenin tanınması gerekir: güven listeleriyle ve nitelikli statü için 14. madde uyarınca bir anlaşma ya da uygulama tüzüğüyle.

### Tüzük ile ARF arasındaki fark ne?

Tüzük ve uygulama tüzükleri hukuktur. ARF, Komisyon'un bu tüzüklerin dayandığı mimariyi, rolleri ve gereksinimleri anlatan teknik başvuru belgesidir. Güncel sürüm 23 Temmuz 2026'da yayımlanan 3.0.0'dır.

### Tamga Network Türk Devletleri Teşkilatı ile birlikte mi çalışıyor?

Hayır. Teşkilatla ya da üye devletleriyle bir anlaşma yok. Ağ her biri için listede bir yer ayırır ve bir devletin kendi listesini istediği zaman devralabileceği biçimde tasarlanmıştır.

### Tanıma hükümetlere bağlıysa neden şimdi kuruyorsunuz?

Çünkü teknik seviyeler zaman alır ve siyasi bir karara bağlı değildir. Hazır olduklarında sonradan alınan bir tanıma kararı, kişilerin elindeki belgelere yeniden belge verilmeden uygulanır.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): Md. 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h
- Uygulama tüzükleri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [AB Dijital Kimlik Cüzdanı Mimari ve Referans Çerçevesi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Avrupa Komisyonu: EUDI Wallet uygulaması ve büyük ölçekli pilotlar](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: güvenilen kuruluş listeleri](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [AB güven listeleri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDT Dijital Ekonomi Ortaklığı Anlaşması](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türkistan gayriresmî zirvesi](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework) · [ADR-0035: konumlanma](https://docs.tamga.network/tr/adr/0035-positioning-three-layers) · [ADR-0036: güven federasyonu](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Devletler için](/learn/for-states) · [Manifesto](/manifesto)

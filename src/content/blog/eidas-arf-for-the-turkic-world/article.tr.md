---
title: "eIDAS 2.0 ve ARF: Türk dünyası için ne anlama geliyor?"
slug: eidas-arf-for-the-turkic-world
description: AB'nin eIDAS 2.0 ve referans çerçevesiyle ne kurduğunu, bunun ne zaman uygulandığını, AB dışındaki devletler için neden önemli olduğunu ve sınırlarını anlatıyoruz.
date: 2026-10-08
lang: tr
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Kaynak: (AB) 2024/1183 (EUR-Lex, 2026-10-08'de denetlendi): kabul 11.4.2024, RG 30.4.2024, yürürlük 20.5.2024; değişen 910/2014 Md. 5a (cüzdan; 5a(1) uygulama tüzüklerinden 24 ay sonra; 5a(2) üye devletçe, onun yetkisiyle ya da onun tanımasıyla), 5b (güvenen taraf kaydı), 5c (sertifikasyon), 5d (sertifikalı cüzdan listesi), 5f (sınır ötesi kabul; 5f(2) 36 ay), 14(1) (üçüncü ülke güven hizmetleri, uygulama tüzüğü ya da ABİHA Md. 218 anlaşmasıyla nitelikli hizmete eşdeğer), 22 (güven listeleri), 45b-45h (öznitelik belgeleri). Uygulama tüzükleri: 2024/2977, 2979, 2980, 2981, 2982 (28.11.2024, RG 4.12.2024; 2024/2978 ilgisiz); 2025/848 ve 2025/849 (6.5.2025, RG 7.5.2025); 2025/1569 (29.7.2025, RG 30.7.2025); 2026/1731 (15.7.2026, RG 22.7.2026). AB ARF v3.0.0 (GitHub, 2026-07-23). Komisyon "EUDI Wallet implementation" sayfası: dört pilot Nisan 2023, 26 üye devlet, Norveç, İzlanda ve Ukrayna'dan 350'den fazla kuruluş. İkinci dalga WE BUILD ve APTITUDE (2025). ETSI TS 119 602. TDT: Dijital Ekonomi Ortaklığı Anlaşması 6.11.2024 Bişkek, Türkiye onay kanunu RG Haziran 2026 (basın); Türkistan gayriresmî zirvesi 15.5.2026, bildiri elektronik dijital imzaların karşılıklı tanınması anlaşma taslağının incelemesinin tamamlanmasını istiyor (basın). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3, §1.4, §6, §6.1; ADR-0035, ADR-0036; canlı lotl.json (TR etkin; AZ, KZ, KG, UZ ayrılmış; HU, TM gözlemci), 2026-10-08. -->

eIDAS 2.0, AB üye devletlerinin her birini 2026 sonuna kadar bir dijital kimlik cüzdanı sunmakla yükümlü kılan AB tüzüğüdür. Mimari ve Referans Çerçevesi (ARF) ise bu tüzüğün arkasındaki teknik plandır. İkisi birlikte eksiksiz bir güven sistemi tanımlar. Bu sistemde cüzdan, devletin verdiği kimlik verisi, diploma gibi öznitelik belgeleri, imzalı güven listeleri, veri isteyen her hizmetin kaydı ve sertifikasyon yer alır. Tüzük Türk dünyasına uygulanmaz, ama standartları AB'deki bankaların, üniversitelerin ve işverenlerin okuyacağı ortak dile dönüşüyor. AB dışındaki bir devlet bu dili bugünden benimseyebilir. AB'nin bu belgeleri tanıması ise ayrı bir adımdır ve o adımı hükümetler atar.

## AB eIDAS 2.0 ile neyi kurdu?

eIDAS 2.0 diye bilinen (AB) 2024/1183 sayılı Tüzük, 2014 tarihli eIDAS tüzüğünü değiştiriyor ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014 metni daha çok ulusal elektronik kimlik sistemleriyle ve elektronik imzayla ilgiliydi. 2024 metni bunlara, telefondaki bir cüzdanın çevresinde kurulan bütün bir ekosistemi ekliyor. Bu ekosistem altı yapı taşına dayanıyor:

![eIDAS 2.0'ın altı yapı taşı: cüzdan, PID, öznitelik belgeleri, güven listeleri, güvenen taraf kaydı, sertifikasyon](/blog/eidas-arf-for-the-turkic-world/tr/fig-yapi-taslari.png)

| Yapı taşı | Ne işe yarar | Hukuki dayanak |
|---|---|---|
| **Avrupa Dijital Kimlik Cüzdanı** | Kişinin kimlik verisini ve belgelerini tutan ve bunları kişinin denetiminde paylaşan uygulama | Md. 5a |
| **PID** (kişi kimlik verisi) | Devletin ya da devlet adına bir kurumun yüksek güvence düzeyinde verdiği temel kimlik verisi | Md. 5a, 2024/2977 sayılı Uygulama Tüzüğü |
| **Elektronik öznitelik belgeleri** | Diploma, ehliyet, üyelik gibi geri kalan bütün belgeler. *Nitelikli* öznitelik belgesini (QEAA) nitelikli bir güven hizmeti sağlayıcısı, kamu öznitelik belgesini (PuB-EAA) ise yetkili kaynaktan sorumlu kamu kurumu verir | Md. 45b–45h, 2025/1569 sayılı Uygulama Tüzüğü |
| **Güven listeleri** | Hangi sağlayıcıya hangi iş için güvenileceğini gösteren imzalı listeler | Md. 22; ETSI TS 119 612 ve ETSI TS 119 602 |
| **Güvenen taraf kaydı** | Cüzdandan veri istemek isteyen her hizmet bir üye devlette kaydolur ve ne isteyeceğini, neden isteyeceğini beyan eder | Md. 5b, 2025/848 sayılı Uygulama Tüzüğü |
| **Sertifikasyon** | Cüzdanlar kullanıma sunulmadan önce uygunluk değerlendirme kuruluşlarınca sertifikalandırılır | Md. 5c, 2024/2981 sayılı Uygulama Tüzüğü |

Bu tabloda iki nokta kolayca gözden kaçabilir. Sistemi sınırların ötesinde çalıştıran şey güven listeleridir. Bir ülkedeki doğrulayıcının, başka bir ülkedeki her üniversiteyle ayrı ayrı anlaşma yapmasına gerek yoktur, çünkü tek bir imzalı listeyi okuması yeter ([imzalı güven listesi nasıl çalışır](/blog/how-trust-lists-work)). Güvenen taraf kaydı da kişiyi en az imza kadar korur. Cüzdan, bir hizmetin istediği alanları o hizmetin kaydında beyan ettikleriyle karşılaştırabilir ve fazlası istendiğinde kişiyi uyarır.

## ARF nedir, tüzükle ilişkisi ne?

Tüzük yükümlülükleri belirler. Uygulama tüzükleri teknik ayrıntıları düzenler ve standartlara atıf yapar. ARF ise bunların hepsini tek bir mimaride bir araya getiren başvuru belgesidir. Rolleri, akışları, veri modelini, güven modelini, her rol için üst düzey gereksinimleri ve her belge türünün kural kitabını (rulebook) burada bulursunuz. Avrupa Komisyonu ARF'yi GitHub'da herkese açık olarak yayımlıyor. Güncel sürüm 3.0.0 ve 23 Temmuz 2026'da yayımlandı ([ARF sürümü](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Bu yapının altında herkesin kullanabileceği açık standartlar var. Belgeler için IETF SD-JWT VC ve ISO/IEC 18013-5 mdoc, belgelerin verilmesi ve gösterilmesi için HAIP profiliyle birlikte OpenID4VCI ve OpenID4VP, iptal için IETF Token Status List, kurumlar için X.509 sertifikaları ve ETSI'nin güven listesi biçimleri kullanılıyor. ETSI TS 119 602, güvenilen kuruluş listelerini (LoTE, lists of trusted entities) tanımlıyor. Cüzdan sağlayıcıları, PID sağlayıcıları ve nitelikli güven hizmeti sağlayıcısı olmayan öbür kuruluşlar için kullanılan JSON liste biçimi de bu ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartların hiçbiri yalnız AB'ye ayrılmış değil ve AB dışındakiler için fırsat da tam burada doğuyor.

## Hangi parça ne zaman uygulanıyor?

![2024'teki tüzükten 2027 sonundaki kabul yükümlülüğüne eIDAS 2.0 takvimi](/blog/eidas-arf-for-the-turkic-world/tr/fig-takvim.png)

| Tarih | Ne oldu | Kaynak |
|---|---|---|
| 20 Mayıs 2024 | (AB) 2024/1183 yürürlüğe girdi | Tüzüğün 2. maddesi |
| 24 Aralık 2024 | İlk beş uygulama tüzüğü yürürlüğe girdi: 2024/2977 (PID ve öznitelik belgeleri), 2024/2979 (cüzdan bütünlüğü ve temel işlevler), 2024/2980 (bildirimler), 2024/2981 (sertifikasyon), 2024/2982 (protokoller ve arayüzler) | kabul 28 Kasım 2024, yayım 4 Aralık 2024 |
| 7 Mayıs 2025 | 2025/848 (güvenen taraf kaydı) ve 2025/849 (sertifikalı cüzdan listesi) yayımlandı | kabul 6 Mayıs 2025 |
| 30 Temmuz 2025 | 2025/1569 (nitelikli ve kamu öznitelik belgeleri) yayımlandı | kabul 29 Temmuz 2025 |
| 22 Temmuz 2026 | İlk tüzüklerden dördünün atıf yaptığı standartları güncelleyen 2026/1731 yayımlandı | kabul 15 Temmuz 2026 |
| 23 Temmuz 2026 | ARF 3.0.0 yayımlandı | GitHub |
| 2026 sonu | Her üye devlet en az bir cüzdan sunar | Md. 5a(1): uygulama tüzüklerinden 24 ay sonra |
| 2027 sonu | Güçlü kimlik doğrulama kullanmak zorunda olan özel hizmetler (bankacılık, ulaşım, enerji, sağlık, eğitim, telekomünikasyon ve diğerleri) kullanıcı isterse cüzdanı kabul eder | Md. 5f(2): 36 ay |

Doğrulayıcılar için en önemli satır sonuncusu. 2027 sonundan itibaren AB'deki bir banka, kişi isterse cüzdanla yapılan kimlik doğrulamayı kabul etmek zorunda olacak. Aynı tarihlerin adım adım anlatımını [Avrupa takvimi](/learn/eu-timeline) sayfasında bulabilirsiniz.

## Son tarihten önce nasıl denendi?

Komisyon, ARF'yi gerçek hizmetlerde çalıştıran büyük ölçekli pilot projeleri destekledi. Bunların dördü Nisan 2023'te başladı. EWC seyahat belgelerini, POTENTIAL kamu hizmetlerini, bankacılığı, telekomünikasyonu, ehliyeti, imzayı ve sağlığı, NOBID ödemeleri, DC4EU de eğitimi ve sosyal güvenliği denedi. Komisyon'un verdiği bilgiye göre bu pilotlar 26 üye devlet, Norveç, İzlanda ve Ukrayna'dan 350'den fazla kamu ve özel kuruluşu bir araya getirdi ([Komisyon: EUDI Wallet uygulaması](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). WE BUILD ve APTITUDE adlı iki pilot da 2025'te başladı.

Bu listede Ukrayna'nın da bulunması dikkat çekici, çünkü AB dışındaki bir ülke sistemi üye devletlerle birlikte denemiş oldu. Pilot projelere katılmak hukuki bir tanıma doğurmaz, ama teknik çalışmanın komşu ülkelere açık olduğunu gösterir. DC4EU eğitim belgelerini de denedi. Türk devletleri ile Avrupa arasında gidip gelen öğrenciler ve mezunlar için en çok önem taşıyan belgeler de bunlar.

## AB dışındaki bir ülke için uyum neden önemli?

İnsanlar, mallar ve diplomalar sınırı zaten geçiyor ve sınırın bir tarafında evrak yakında dijitale dönecek. Bu durumun etkisini en çok üç alanda görüyoruz:

- **Eğitim.** Bişkek'ten bir mezun Almanya'da yüksek lisansa başvuruyor. Diploması AB'nin kullandığı biçimde imzalanmış bir belgeyse kabul ofisinin yazılımı onu saniyeler içinde denetler. Diploma taranmış bir PDF ise birinin e-posta yazıp yanıt beklemesi gerekir.
- **İş ve hareketlilik.** Taşkent'ten bir mühendis Münih'e taşınıyor. AB'deki işverenler ve bankalar cüzdandaki belgeleri okuyacak biçimde hazırlanıyor. Aynı biçimdeki bir belge de bu sürece doğrudan girebilir.
- **Ticaret.** Bakü'deki bir şirket kaydını, lisanslarını ya da sertifikalarını AB'deki bir ortağına kanıtlıyor. Kişisel belgeleri taşıyan listeler ve biçimler şirket belgelerini de taşıyabilir.

Bu örneklerin her birinde iki ayrı koşulun sağlanması gerekir. Belgenin *okunabilir* olması biçimlere ve protokollere bağlıdır. Belgeyi verenin *güvenilir* sayılması ise listelere ve tanımaya bağlıdır. Tamga Trust Framework bu yüzden birlikte çalışabilirliği üç düzeye ayırıyor:

![Birlikte çalışabilirliğin üç seviyesi: taşınabilirlik ve güven teknik, hukuki tanıma siyasi](/blog/eidas-arf-for-the-turkic-world/tr/fig-uc-seviye.png)

1. **Taşınabilirlik.** İki taraf aynı biçimleri ve protokolleri kullanır, böylece bir AB cüzdanı ya da doğrulayıcısı belgeyi teknik olarak işleyebilir. Bu düzeye bugünden, mühendislik çalışmasıyla ulaşılabilir.
2. **Güven.** Güven listeleri birbirini gösterir ve her liste yalnız tanımlı bir kapsam için kefil olabilir. Bu düzey de tekniktir, ama iki tarafın da hangi listeye güveneceğine karar vermesi gerekir.
3. **Hukuki tanıma.** Bir devlet ya da AB, başka bir tarafın belgelerini hukuki sonuç doğuracak biçimde kabul eder. Bu karar hükümetlerindir ve bir yasayla ya da anlaşmayla verilir.

İlk iki düzey üçüncüsünden önce kurulabilir ve erken başlamanın anlamı da bu. İki hükümet birbirinin belgelerini tanımaya karar verdiğinde, bu belgeleri taşıyan sistemler zaten uyumlu olur. Böylece kimse yalnız biçim değişti diye diplomasını yeniden almak zorunda kalmaz.

## Türk dünyası dijital güven konusunda bugün ne yapıyor?

Türk Devletleri Teşkilatı dijital iş birliğini gündemine almış durumda. Üye devletler 6 Kasım 2024'teki Bişkek zirvesinde Dijital Ekonomi Ortaklığı Anlaşması'nı imzaladı. Anlaşma e-ticareti, kâğıtsız ticareti, elektronik imzayı, veri korumayı ve siber güvenliği kapsıyor. Türkiye'nin onay kanunu da Haziran 2026'da Resmî Gazete'de yayımlandı ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 15 Mayıs 2026'da Türkistan'da yapılan gayriresmî zirvenin teması yapay zekâ ve dijital kalkınmaydı. Basına yansıyan bilgilere göre zirve bildirisi, üye devletleri elektronik dijital imzaların karşılıklı tanınmasına ilişkin anlaşma taslağını incelemeyi tamamlamaya çağırıyor. Kazakistan Cumhurbaşkanı da dijital imzaların ve elektronik belgelerin karşılıklı tanınmasını önerdi ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

İmzaların karşılıklı tanınması, yukarıdaki modelin hukuki düzeyine karşılık geliyor. Ortak bir güven katmanı ise bunun altındaki teknik düzeydir. Tamga Network'ün Türk Devletleri Teşkilatı ile ya da teşkilatın üye devletlerinden biriyle bir anlaşması yok. Teknik düzeyi, devletler kullanmak istediğinde hazır olsun diye kuruyoruz.

## Tamga Network AB modelinden neyi alıyor?

Tamga Network, AB modelinin teknik katmanını olduğu gibi alıyor. Kuralımız, belge, protokol ve güven listesi biçimlerinin AB standartlarından ayrılmaması. Tamga'ya özgü her ek, standardın sunduğu bir uzantı noktası üzerinden yapılıyor ve standart istemcileri bozmuyor ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)).

| AB'deki öğe | Tamga Network'te |
|---|---|
| SD-JWT VC ve ISO mdoc | aynı; kimlik belgesi iki biçimde |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | aynı |
| Token Status List | aynı |
| LOTL ve ulusal güven listeleri | aynı iki katmanlı model; her Türk devleti için bir yer |
| LoTE (ETSI TS 119 602) | dış listeler için ilk okunan biçim |
| Güvenen taraf kaydı ve kayıt sertifikaları | AB'nin ortak kayıt veri seti ve sertifika modeli |
| ARF rol seti | her rolün her ulusal listede bir yeri var, boş olsa bile |

Yönetişim katmanını ise Türk dünyası için yazıyoruz. Her devlet kendi listesinin tek yazarıdır ve devletler arasındaki tanımaya her devlet kendisi karar verir. Eşlemenin tamamını ve Tamga kurallarının AB'nin kurallarından nerede, neden ayrıldığını [Tamga ARF: Avrupa çerçevesini nasıl uyarladık](/blog/tamga-arf) yazısında anlattık.

Ağın listelerin listesinde bugünden Türk Devletleri Teşkilatı'nın her üye devleti ve iki gözlemci devlet için ayrılmış bir yer bulunuyor ve her devlet kendi listesini devralabiliyor ([ağ neden vakfa devredilecek](/blog/network-as-a-foundation)). Şu an yalnız Türkiye listesi etkin. Tamga bu listeyi ulusal makam adına geçici olarak yayımlıyor ve listenin kendisi de bunu belirtiyor. Diğer yerler ayrılmış durumda. Canlı listeyi `trust.tamga.network` adresinde okuyabilirsiniz.

## Dürüst sınırlar neler?

- **Tamga Network'ü AB tanımış değildir.** Ağ AB uyumludur, yani aynı standartları kullanır ve bunu testlerle gösterir. "EUDI Wallet" ise bir üye devletin sunduğu ya da tanıdığı ve AB kurallarına göre sertifikalandırılmış cüzdanlara verilen hukuki bir unvandır. AB dışındaki hiçbir ağ ya da cüzdan bugün bu unvanı kullanamaz.
- **Tüzükte kestirme bir yol yoktur.** eIDAS'ın 14. maddesi, üçüncü bir ülkedeki güven hizmetlerinin AB'deki nitelikli güven hizmetlerine eşdeğer sayılmasına izin verir. Bunun için ise ya bir AB uygulama tüzüğü ya da AB ile o ülke arasında ABİHA'nın 218. maddesine göre yapılmış bir anlaşma gerekir. Bu süreç hükümetler arasında yürüyen bir müzakeredir. Tamga teknik tarafı hazırlayabilir, ama bu süreci başlatamaz ya da sonuçlandıramaz.
- **Henüz hiçbir dış liste eklenmedi.** Başka bir devletin ya da AB'nin listesini, imzacısı sabitlenmiş ve kapsamı tanımlanmış biçimde göstermeyi sağlayan mekanizma hazır ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)). Ama her ekleme ayrı ve kayda geçen bir karar gerektiriyor ve şimdiye kadar böyle bir karar alınmadı.
- **Güven çapası bugün tek bir işletmeciye dayanıyor.** Listeler imzalı, sürümlü ve herkese açık bir kayıtta tutuluyor. Yine de ikinci bağımsız işletmeci katılana kadar ağ tek bir imzaya dayanıyor ve çerçeve bunu bilinen bir sınır olarak yazıyor ([Tamga ARF](https://arf.tamga.network/tr/architecture)).
- **Türk devletleri arasındaki tanıma da siyasi bir karardır.** Kazakistan'daki bir doğrulayıcının Türkiye'deki bir üniversiteye güvenip güvenmeyeceğine Kazakistan karar verir. Ağ, bu kararın yazılımda kolayca ifade edilip uygulanmasını sağlar, ama kararı kendisi vermez.

## Sık sorulan sorular

### eIDAS 2.0 Türkiye'ye ya da Orta Asya devletlerine uygulanır mı?

Hayır. Tüzük AB üye devletlerini ve AB'de kapsamına giren hizmetleri bağlar. Standartları ise açıktır ve her devlet ya da kurum bunları kullanabilir. AB içinde hizmet sunan şirketlerin kendi yükümlülüklerini bir hukukçuyla değerlendirmesi gerekir.

### Türkiye'de verilen bir belge AB'de kabul edilebilir mi?

Belge aynı biçimleri kullanıyorsa AB'deki yazılımlar onu okuyabilir ve Tamga belgeleri bu biçimleri kullanıyor. Belgenin hukuki sonuç doğuracak biçimde güvenilir sayılması içinse belgeyi veren kurumun tanınması gerekir. Bu tanıma güven listeleriyle sağlanır, nitelikli statü için de 14. maddeye göre bir anlaşma ya da uygulama tüzüğü gerekir.

### Tüzük ile ARF arasındaki fark ne?

Tüzük ve uygulama tüzükleri hukuki metinlerdir. ARF ise Komisyon'un hazırladığı teknik bir başvuru belgesidir ve bu tüzüklerin dayandığı mimariyi, rolleri ve gereksinimleri anlatır. Güncel sürüm, 23 Temmuz 2026'da yayımlanan 3.0.0.

### Tamga Network Türk Devletleri Teşkilatı ile birlikte mi çalışıyor?

Hayır. Teşkilatla ya da üye devletleriyle bir anlaşmamız yok. Ağ bu devletlerin her biri için listede bir yer ayırıyor ve her devletin kendi listesini istediği zaman devralabileceği biçimde tasarlandı.

### Tanıma hükümetlere bağlıysa neden şimdi kuruyorsunuz?

Teknik düzeyleri kurmak zaman alıyor ve bu iş siyasi bir karara bağlı değil. Bu düzeyler hazır olursa ileride alınacak bir tanıma kararı, kişilerin elindeki belgelere yeniden verilmelerine gerek kalmadan uygulanabilir.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): Md. 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h
- Uygulama tüzükleri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [AB Dijital Kimlik Cüzdanı Mimari ve Referans Çerçevesi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Avrupa Komisyonu: EUDI Wallet uygulaması ve büyük ölçekli pilotlar](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: güvenilen kuruluş listeleri](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [AB güven listeleri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDT Dijital Ekonomi Ortaklığı Anlaşması](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türkistan gayriresmî zirvesi](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework) · [ADR-0035: konumlanma](https://docs.tamga.network/tr/adr/0035-positioning-three-layers) · [ADR-0036: güven federasyonu](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Devletler için](/learn/for-states) · [Manifesto](/manifesto)

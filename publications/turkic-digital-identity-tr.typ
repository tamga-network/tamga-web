// A13 — Türk Dünyasında Dijital Kimlik. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Türk Dünyasında Dijital Kimlik",
  altbaslik: "Bugünkü Durum ve Birlikte Çalışabilirlik: Altı Ülke, Bir Sınır Sorusu",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Ocak 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("dijital kimlik", "e-devlet", "Türk Devletleri Teşkilatı", "çipli kimlik kartı", "mobil imza", "birlikte çalışabilirlik", "sınır ötesi tanıma", "güven listesi", "ICAO PKD", "eIDAS",),
  atif: "Karataş, B. (2027). Türk Dünyasında Dijital Kimlik: Bugünkü Durum ve Birlikte Çalışabilirlik: Altı Ülke, Bir Sınır Sorusu. Tamga Network Akademik Çalışmalar, A13. https://tamga.network/files/publications/turkic-digital-identity-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Türk Devletleri Teşkilatı’nın üye ve gözlemci ülkeleri, son yirmi yılda dijital kimlik ve e-devlet alanında birbirinden bağımsız, çoğu zaman da birbirinden hızlı ilerleyen yollar izledi. Türkiye’de e-Devlet Kapısı 2008’den beri işliyor ve çipli kimlik kartı 2016’dan beri veriliyor. Kazakistan’ın e-devlet portalı 2006’da açıldı, kimlik belgeleri bugün mobil uygulamada dijital olarak taşınabiliyor. Azerbaycan 2018’den beri elektronik imza sertifikası taşıyan kimlik kartları veriyor; Özbekistan 2021’de pasaport yerine çipli kimlik kartına geçti; Kırgızistan devlet bilgi sistemlerini 2016’dan beri ortak bir veri değişim katmanıyla birbirine bağlıyor. Ama bu güçlü ulusal sistemlerin hiçbiri bugün sınırı geçtiğinde kendiliğinden tanınmıyor. Bakü’de verilmiş bir diploma İstanbul’da, Almatı’da atılmış bir elektronik imza Taşkent’te hâlâ ayrı bir onay zinciri gerektiriyor.

Bu yazı, yalnız kamuya açık kaynaklara dayanarak altı ülkenin dijital kimlik altyapısını ülke ülke anlatıyor, ortak noktalarını ve farklarını karşılaştırıyor. Sonra eğitim, iş ve seyahat alanlarından üç sınır ötesi senaryoyu izliyor; ikili anlaşmalardan ortak güven listelerine kadar birlikte çalışabilirlik için yönetişim seçeneklerini tartışıyor ve bu ülkelerin Avrupa Birliği’nin dijital kimlik çerçevesiyle ilişkisini ele alıyor. Teknik kutularda çipli kimlik kartlarının nasıl doğrulandığını, ülkeler arası veri değişim katmanlarının nasıl çalıştığını ve ortak bir güven listesinin neden ikili anlaşmalardan daha iyi ölçeklendiğini adım adım açıklıyoruz. Yazı bir politika incelemesidir; hiçbir ülke ya da kurum adına görüş bildirmez.
  ],
)

= Giriş: Üç Yolcu, Bir Sınır

Bu dizinin ilk yazısında tanıdığımız Aynur, Bakü’de lisansını bitirmiş ve İstanbul’da yüksek lisans yapmak istiyordu. Azerbaycan’da cebindeki kimlik kartının çipinde iki elektronik sertifika taşıyor; telefonundaki devlet uygulamasında kimlik kartının dijital bir karşılığı duruyor. Kendi ülkesinde birçok devlet hizmetine çevrimiçi başvurabiliyor. Ama İstanbul’daki üniversitenin başvuru sistemi bu sertifikaların hiçbirini tanımıyor. Aynur diplomasını yine taratacak, yine noter ve apostil onayıyla postalayacak.

Almatı’da yaşayan yazılım mühendisi Timur, İstanbul’daki bir şirketten iş teklifi aldı. Kazakistan’da kimlik kartı ve ehliyeti telefonundaki devlet uygulamasında dijital belge olarak duruyor ve ülke içinde kâğıt karşılıklarıyla aynı hukuki değeri taşıyor. Şirketin insan kaynakları bölümü ise ondan pasaportunun ve diplomasının kâğıt kopyalarını istiyor.

Taşkent’te yaşayan Dilnoza, Bişkek’teki bir konferansa katılacak ve orada kısa süreli bir eğitim programına kayıt yaptıracak. Özbekistan’ın yeni çipli kimlik kartı yanında. Kırgızistan’da yurttaşların kimlik kartları devlet uygulamasında dijital olarak gösterilebiliyor, iç hat uçuşlarında bile kabul görüyor. Ama Dilnoza’nın kartı, Kırgız sistemleri için yalnızca bir yabancı belgedir.

Üç yolcunun ortak noktası açık: Her biri kendi ülkesinde güçlü, modern bir dijital kimliğe sahip. Sınırı geçtiklerinde bu kimliğin dijital yanı neredeyse tümüyle kayboluyor; geriye kâğıt, fotokopi ve onay zinciri kalıyor. Bu yazının sorusu şu: #{strong[Türk dünyasının ülkeleri, her biri kendi içinde çözdüğü dijital kimlik sorununu, sınırların ötesinde birlikte nasıl çözebilir?]}

Bu soruya cevap aramadan önce, bugün elimizde ne olduğunu doğru görmek gerekiyor. Bölüm 2, ülkeleri karşılaştırmak için kullanacağımız basit bir çerçeve kuruyor ve çipli kimlik kartlarının nasıl doğrulandığını teknik olarak anlatıyor. Bölüm 3 altı ülkeyi tek tek ele alıyor. Bölüm 4 ortak noktaları ve farkları karşılaştırıyor. Bölüm 5 üç yolcunun senaryolarını sınır ötesi bir gözle izliyor. Bölüm 6 birlikte çalışabilirlik için yönetişim seçeneklerini ve Türk Devletleri Teşkilatı belgelerinde bu konuda söylenenleri, Bölüm 7 Avrupa Birliği ile ilişkiyi tartışıyor. Bölüm 8 açık soruları sıralıyor, Bölüm 9 bu yazıyı yayımlayan Tamga Network’ün bu tablodaki yerini kısaca anlatıyor.

#kutu("onemli", [Yöntem ve sınırlar])[
Bu yazıdaki ülke bilgileri yalnızca kamuya açık kaynaklardan derlendi: resmî devlet siteleri, kanun metinleri, uluslararası kuruluşların yayınları ve güvenilir haber kaynakları. Bilgiler Kasım 2026 itibarıyla kontrol edildi. Bu alan hızlı değiştiği için bazı ayrıntılar yazının okunduğu tarihte eskimiş olabilir. Doğrulayamadığımız tarih ve rakamları yazmadık; bu yüzden bazı ülkeler hakkında daha az ayrıntı var. Bu durum, ülkelerin altyapısından çok kamuya açık bilginin bugünkü durumunu yansıtır. Yazı, hiçbir ülkenin politikasını değerlendirmez ve hiçbir ülke ya da kurum adına konuşmaz.
]

= Karşılaştırma İçin Bir Çerçeve

== Dijital kimliğin katmanları

"Bir ülkenin dijital kimliği" dendiğinde çoğu zaman tek bir şeyden söz ediliyormuş gibi davranılır. Oysa bir ülkenin dijital kimlik altyapısı birbirinin üzerine kurulan birkaç katmandan oluşur ve ülkeler bu katmanların her birinde farklı yerlerdedir. Karşılaştırmayı anlamlı kılmak için bu katmanları baştan ayıralım (Şekil 1).

#sekil(1, [Bir ülkenin dijital kimlik altyapısının katmanları], "figures/a13/sekil-1.svg", yarim: false)

#{strong[Nüfus kaydı]} her şeyin temelidir: Bir devletin kimin var olduğunu, kimin kim olduğunu bildiği kayıt. Bu katman bütün ülkelerde yıllardır vardır ve bu yazının konusu değildir.

#{strong[Fiziksel kimlik belgesi]}, bu kaydın kişinin cebindeki karşılığıdır. Son on beş yılda bu ülkelerin neredeyse hepsi kâğıt kimlik belgelerinden, içinde bir mikroçip bulunan kartlara ya da biyometrik pasaportlara geçti. Çip, belgenin dijital dünyaya açılan kapısıdır: İçindeki veriler devletin imzasını taşır ve bir makine tarafından doğrulanabilir.

#{strong[Elektronik kimlik doğrulama]}, kişinin internet üzerinden "ben buyum" diyebilmesini sağlayan araçlardır: kimlik kartındaki sertifikayla elektronik imza, telefon hattına bağlı mobil imza, bir uygulamadaki yüz doğrulamasıyla açılan imza anahtarı.

#{strong[E-devlet kapısı]}, kamu hizmetlerinin tek bir adresten sunulduğu portaldır. Bu katman, dizinin ilk yazısındaki terimlerle, bir devlet #{strong[kimlik sağlayıcısıdır]}: Kişi bir kez giriş yapar, yüzlerce hizmete erişir.

#{strong[Mobil dijital belgeler]}, en yeni katmandır: kimlik kartının, ehliyetin ya da diplomanın, devletin uygulamasında gösterilebilen ve hukuken kâğıt karşılığıyla eşdeğer sayılan dijital hâli.

#{strong[Sınır ötesi tanıma]} ise en üst katmandır ve bu yazının asıl konusudur. Bir ülkenin verdiği belgenin, attığı imzanın ya da doğruladığı kimliğin başka bir ülkede hukuken ve teknik olarak kabul görmesi.

Bu katmanları iki dikey unsur keser. Birincisi #{strong[hukuki çerçevedir]}: elektronik imzanın hangi koşullarda ıslak imzaya eşdeğer olduğunu, kişisel verinin nasıl işleneceğini söyleyen kanunlar. İkincisi #{strong[birlikte çalışabilirlik altyapısıdır]}: devlet kurumlarının birbirleriyle güvenli biçimde veri alışverişi yapmasını sağlayan teknik katman.

== Çipli bir kimlik kartı nasıl doğrulanır?

Sınır ötesi tanıma sorusunun teknik çekirdeğini anlamak için, bugün dünyada sınırları zaten en iyi aşan dijital kimlik belgesine, yani #{strong[elektronik pasaporta]} bakmak öğreticidir. Bir havalimanındaki pasaport okuyucusu, başka bir ülkenin verdiği pasaportun çipindeki verinin gerçek olduğunu nasıl anlar? Cevap, Uluslararası Sivil Havacılık Örgütü’nün (ICAO) #{strong[Doc 9303]} belgesinde tanımlanan bir kriptografik zincirdir \[1\]. Kırgızistan’ın 2017’den beri verdiği kimlik kartı gibi bazı ulusal kimlik kartları da bu belgeye uygun olarak tanıtılmıştır.

#kutu("teknik", [Pasif doğrulama: çipteki verinin imzası])[
Bir elektronik pasaportun ya da ICAO uyumlu bir kimlik kartının çipinde veriler #{strong[veri grupları]} (#{emph[data groups]}) hâlinde durur. Örneğin DG1 sayfadaki makine tarafından okunabilir bölgenin (MRZ) bilgilerini, DG2 yüz fotoğrafını, DG3 parmak izlerini taşır. Çipte ayrıca #{strong[belge güvenlik nesnesi]} (#{emph[Document Security Object, SOD]}) adlı bir kayıt bulunur. Bu kayıt, her veri grubunun özetini içerir ve belgeyi veren ülkenin bir #{strong[belge imzalayıcı]} (#{emph[Document Signer]}) anahtarıyla imzalanmıştır.

Güven üç halkalı bir zincirle kurulur:

#tablo([], (31fr, 19fr, 22fr), ([Halka], [Kim imzalar], [Doğrulayan nereden bilir],), (
  ([SOD (veri gruplarının özet listesi; örnek: DG1 #{raw("3f9a…")}, DG2 #{raw("b71c…")}, DG3 #{raw("05de…")})], [belge imzalayıcı anahtarı], [çipten okur],),
  ([Belge imzalayıcı sertifikası], [ülkenin kök otoritesi (CSCA)], [çipten okur (SOD’un içinde)],),
  ([CSCA sertifikası], [ülke kendisi], [elinde önceden bulunmalı],),
))

Okuyucu bu zinciri aşağıdan yukarı doğrular. Aşağıda $"DG"_i$ çipteki $i$’inci veri grubu, $"SOD"[i]$ de SOD’da onun için kayıtlı özettir:

#adimlar((
  ("Okuyucu ← Çip", [#{strong[Okuma.]} Veri gruplarını ve SOD’u okur.], $"DG"_1, "DG"_2, dots, "SOD"$),
  ("Okuyucu", [#{strong[Özetler.]} Her veri grubunun özetini kendisi hesaplar ve SOD’daki değerle karşılaştırır.], $H("DG"_i) attach(=, t: ?) "SOD"[i]$),
  ("Okuyucu", [#{strong[SOD’un imzası.]} İmzayı belge imzalayıcının sertifikasındaki anahtarla doğrular.], $"Verify"("PK"_"DS", "SOD")$),
  ("Okuyucu", [#{strong[Sertifika.]} Belge imzalayıcı sertifikasını ülkenin kök sertifikasıyla doğrular.], $"Verify"("PK"_"CSCA", "sertifika"_"DS")$),
))

Dört adım da geçerse çipteki veri, ülkenin imzaladığı veridir. Burada "kök otorite", ülkenin #{strong[kök sertifika otoritesidir]} (#{emph[Country Signing Certification Authority, CSCA]}). Bu sürece #{strong[pasif doğrulama]} (#{emph[passive authentication]}) denir. Çipin kopyalanmadığını göstermek için ayrıca çipin kendi gizli anahtarıyla bir sınamaya cevap vermesi istenebilir; buna #{strong[aktif doğrulama]} ya da #{strong[çip doğrulaması]} denir.

Zincirin en önemli halkası en sondaki sorudur: Doğrulayan, başka bir ülkenin CSCA sertifikasını #{strong[nereden]} ve #{strong[neden güvenerek]} alacak? ICAO’nun cevabı, ülkelerin bu sertifikaları ikili yollarla değiş tokuş etmesi ya da ICAO’nun işlettiği #{strong[Açık Anahtar Dizini]} (#{emph[Public Key Directory, PKD]}) aracılığıyla paylaşmasıdır \[2\].
]

#sekil(2, [Çipli bir kimlik belgesinin pasif doğrulaması: imza zinciri ve güvenin kaynağı], "figures/a13/sekil-2.svg", yarim: false)

Şekil 2, pasif doğrulamanın adımlarını ve zincirin en ucundaki soruyu bir arada gösteriyor. İlk üç adım, dünyanın her yerinde aynı sonucu veren matematiksel işlemlerdir. Dördüncü soru ise bir ülkenin başka bir ülkenin kök sertifikasını hangi kanaldan alacağına ve ona neden güveneceğine ilişkindir. Bu yazının geri kalanı, aslında bu dördüncü sorunun pasaport dışındaki belgeler için Türk dünyasında nasıl cevaplanabileceği üzerinedir.

Bu teknik kutunun son paragrafı, bu yazının bütününün de özetidir. Bir belgenin imzasını doğrulamak matematiksel olarak kolaydır; zor olan, başka bir ülkenin kök anahtarına güvenmenin #{strong[kurumsal ve hukuki]} yolunu kurmaktır. Pasaportlar için bu yol, ülkelerin ICAO çatısı altında anlaştığı bir sistemle onlarca yıldır işliyor. Kimlik kartları, diplomalar, elektronik imzalar ve mobil belgeler için ise Türk dünyasında henüz böyle ortak bir yol yok.

= Ülke Ülke Durum

Bu bölümde Türk Devletleri Teşkilatı’nın beş üyesini ve gözlemci üyelerinden Türkmenistan’ı, Şekil 1’deki katmanlara göre sırayla ele alıyoruz. Her ülke için yalnız doğrulayabildiğimiz bilgileri yazdık; bir katman hakkında kamuya açık, güvenilir bir kaynak bulamadığımızda bunu açıkça belirttik. Şekil 3, bölümde anılan başlıca gelişmeleri tek bir zaman çizgisinde topluyor.

#sekil(3, [Türk dünyasında dijital kimlik ve e-devlet: başlıca kilometre taşları (yalnız doğrulanmış tarihler)], "figures/a13/sekil-3.svg", yarim: false)

== Türkiye

#{strong[E-devlet kapısı.]} Türkiye’nin e-Devlet Kapısı (turkiye.gov.tr), Ulaştırma ve Altyapı Bakanlığı’nın açıklamasına göre 18 Aralık 2008’de 22 hizmetle açıldı \[3\]. Portalın hukuki dayanağı 2006 tarihli bir Bakanlar Kurulu kararıdır; sistemi Türksat geliştirir ve işletir. Kullanıcılar portala T.C. kimlik numarası ve e-Devlet şifresiyle, elektronik imzayla, mobil imzayla, T.C. kimlik kartıyla ya da anlaşmalı bankaların internet şubesi aracılığıyla giriş yapabilir \[3\]. Dizinin ilk yazısında anlattığımız terimlerle e-Devlet Kapısı bir devlet kimlik sağlayıcısıdır: Vatandaş bir kez kimliğini kanıtlar, çok sayıda kamu hizmetine erişir.

#{strong[Çipli kimlik kartı.]} Yeni T.C. kimlik kartlarının pilot uygulaması Mart 2016’da başladı \[4\]. Basında yer alan resmî açıklamalara göre kart, fiziksel olarak birbirinden bağımsız biri temaslı, biri temassız iki çip taşır; çiplerde nüfus bilgileri, biyometrik veriler ve kart bilgileri bulunur ve biyometrik veriler görüntü olarak değil şablon olarak saklanır \[4\]. Kart, e-Devlet Kapısı’na giriş yöntemlerinden biri olarak da kullanılabilir.

#{strong[Elektronik imza.]} Türkiye’de elektronik imzanın hukuki çerçevesi 2004 tarihli 5070 sayılı Elektronik İmza Kanunu ile kuruldu; kişisel verilerin korunması ise 2016 tarihli 6698 sayılı Kişisel Verilerin Korunması Kanunu ile düzenlendi \[6\]. Nitelikli elektronik sertifikalar, kanunun öngördüğü elektronik sertifika hizmet sağlayıcıları tarafından verilir; mobil imza ise bu sertifikanın telefon hattına bağlı güvenli bir ortamda taşınmasıdır.

#{strong[Ulusal dijital kimlik cüzdanı.]} 27 Ekim 2026 tarihli Resmî Gazete’de yayımlanan 2027 Yılı Cumhurbaşkanlığı Yıllık Programı, "Kamu çalışanları öncelikli olmak üzere temel kimlik ve diploma belgelerini içeren ulusal dijital kimlik cüzdanı prototipi geliştirilecek ve pilot bir yükseköğretim kurumunda test edilecektir" faaliyetini, e-Devlet Kapısı’na ilişkin 963.1 numaralı tedbirin altında içerir; sorumlu kuruluş olarak Siber Güvenlik Başkanlığı, işbirliği yapacak kuruluşlar arasında İçişleri Bakanlığı gösterilmiştir \[5\]. Bu, Türkiye’nin dizinin ilk yazısında anlatılan dördüncü dönemin modeline, yani kişinin elindeki bir cüzdanda taşınan belgelere doğru resmî bir adımı olarak okunabilir. Prototipin hangi teknik standartlara dayanacağı, kamuya açık kaynaklarda bu yazının hazırlandığı tarihte henüz ayrıntılı olarak yer almıyor.

#kutu("ornek", [Aynur Türkiye’de])[
Aynur İstanbul’da öğrenci olarak yaşamaya başladığında Türkiye’de bir yabancı kimlik numarası alacak ve bu numarayla e-Devlet Kapısı’nın kendisine açık hizmetlerini kullanabilecek. Ama Azerbaycan’da yıllardır kullandığı kimlik kartı sertifikaları ve uygulamadaki dijital belgeleri, Türkiye’deki sistemler için bir anlam taşımayacak. Aynur, iki ülkede iki ayrı dijital kimliğe sahip olacak ve bu iki kimlik birbirini tanımayacak.
]

== Azerbaycan

#{strong[Çipli kimlik kartı ve elektronik imza.]} Azerbaycan Dijital Kalkınma ve Ulaştırma Bakanlığı’nın açıklamasına göre ülke, 1 Eylül 2018’den itibaren yeni nesil elektronik kimlik kartları vermeye başladı \[7\]. 15 yaşından büyük vatandaşların kartlarında iki sertifika bulunur: biri çevrimiçi kimlik doğrulama, diğeri elektronik imza için. 10 ile 15 yaş arasındakilere yalnızca kimlik doğrulama sertifikası verilir. Karttaki imza sertifikaları beş yıl, kartın kendisi on yıl geçerlidir. Kartın çipinde ikamet bilgisi, medeni durum ve biyometrik fotoğraf gibi kişisel veriler de yer alır \[7\].

#{strong[Mobil kimlik.]} Azerbaycan’ın en bilinen mobil kimlik aracı #{strong[Asan İmza]}’dır. Hizmetin kendi tanıtımına göre Asan İmza, mobil operatörlerin Vergiler Bakanlığı’na bağlı sertifika merkeziyle işbirliği içinde sunduğu, SIM kartta saklanan bir mobil kimliktir ve güvenli e-hizmetlere erişmek ve belgeleri dijital olarak imzalamak için kullanılır \[8\]. Bunun yanında 2022’de kullanıma sunulan ve açık anahtarlı kriptografiyi yüz biyometrisiyle birleştiren #{strong[SİMA İmza]} adlı bir uygulama tabanlı imza aracı da bulunur \[9\].

#{strong[Dijital belgeler.]} Uluslararası basında yer alan haberlere göre Azerbaycan’da 2024’ten itibaren devletin #{strong[mygov]} uygulamasındaki dijital kimlik kartı ile doğum, evlilik ve ölüm belgeleri, kâğıt karşılıklarıyla eşit hukuki değere sahiptir; uygulamayı devletin İnovasyon ve Dijital Kalkınma Ajansı işletir \[9\].

#{strong[Hukuki çerçeve.]} Azerbaycan’da elektronik imza ve elektronik belge 2004 tarihli bir kanunla, kişisel veriler 2010 tarihli "Kişisel Veriler Hakkında" kanunla düzenlenmiştir \[18\].

Azerbaycan örneği, Şekil 1’deki katmanların üçünde birden aracın bulunduğu bir ülkeyi gösteriyor: kartta imza sertifikası, telefon hattında mobil kimlik ve uygulamada dijital belgeler. Bu çeşitlilik ülke içinde kullanıcıya seçenek sunuyor; sınır ötesi tanıma açısından ise karşı tarafın her aracı ayrı ayrı tanımasını gerektiren bir tablo yaratabiliyor.

== Kazakistan

#{strong[E-devlet kapısı.]} Kazakistan’da dijital kalkınmadan sorumlu bakanlığın 2026’daki açıklamasına göre ülkenin e-devlet portalı eGov.kz, 12 Nisan 2006’da hizmete girdi. Portal, 2004 tarihli bir cumhurbaşkanlığı kararnamesiyle başlatılan e-devlet programının ürünüdür. Mobil uygulama 2019’da #{strong[eGov Mobile]} adıyla yenilendi ve aynı açıklamaya göre bugün uygulamada 39 türde dijital belge bulunuyor \[10\].

#{strong[Çipli kimlik belgeleri.]} Kazakistan İçişleri Bakanlığı’nın basına yaptığı açıklamaya göre ülkede mikroçipli pasaportlar ve kimlik kartları 2009’dan beri veriliyor \[11\].

#{strong[Dijital belgeler.]} 2021’de eGov Mobile uygulamasında kimlik kartı ve sürücü belgesi dahil on beş türde dijital belge kullanıma açıldı ve kâğıt ile dijital belgelerin eşdeğerliği aynı yıl hukuken düzenlendi \[11\]. Kazakistan, bu yazıda ele alınan ülkeler arasında mobil dijital belgeleri geniş ölçekte ve en erken kullanıma sunanlardan biridir.

#{strong[Hukuki çerçeve.]} Kazakistan’ın 2003 tarihli "Elektronik Belge ve Elektronik Dijital İmza Hakkında" kanunu, 9 Ocak 2026 tarihli bir kod ile yürürlükten kaldırıldı; kaldırma, kodun yayımından altı ay sonra geçerli olacak biçimde düzenlendi. Kişisel veriler 2013 tarihli "Kişisel Veriler ve Korunması Hakkında" kanunla düzenlenir \[12\]. Elektronik imzanın hukuki çerçevesinin yeni bir kod içinde yeniden kurulması, sınır ötesi tanıma tartışmaları için de önemlidir: Bir ülke kendi imza hukukunu yenilerken, karşılıklı tanıma ilkelerini de baştan bu metne yazma imkânına sahiptir.

#kutu("ornek", [Timur Kazakistan’da])[
Timur yıllardır bir resmî daireye kimlik kartını yanına almadan gidiyor; eGov Mobile’daki dijital kimliği yetiyor. İş teklifini aldığı gün, İstanbul’daki şirketin istediği belgelerin hepsinin telefonunda durduğunu fark ediyor. Ama bu belgelerin hiçbirini şirkete, şirketin doğrulayabileceği bir biçimde gönderemiyor. Belgeler onun telefonunda, Kazakistan devletinin imzasıyla duruyor; şirketin ise o imzaya güvenmek için bir dayanağı yok.
]

== Özbekistan

#{strong[Çipli kimlik kartı.]} Özbekistan Cumhurbaşkanı’nın 22 Eylül 2020 tarihli kararnamesiyle ülkede 2021’den itibaren kimlik kartları uygulamaya girdi. Geçiş 2021–2022’de gönüllü, 2023–2030 arasında zorunlu olarak planlandı; 2011 modeli biyometrik iç pasaportun 1 Ocak 2031’den itibaren geçersiz olacağı belirtildi \[13\]. Devletin resmî bilgilendirme sayfasına göre kartın çipinde dijital fotoğraf, 16 yaşından itibaren parmak izleri ve yine 16 yaşından itibaren elektronik dijital imza anahtarının sertifikası bulunur \[13\].

#{strong[E-devlet kapısı ve dijital belgeler.]} Özbekistan’ın tek kamu hizmetleri portalı my.gov.uz, Temmuz 2013’te deneme modunda açıldı \[14\]. Uluslararası Telekomünikasyon Birliği’nin (ITU) 2026’daki bir haberine göre ülkenin devlet uygulamasında kimlik kartı ve sürücü belgesi dahil 30 türde dijital belge bulunuyor ve bu belgeler bir hükümet kararıyla 1 Temmuz 2025’ten itibaren kâğıt karşılıklarına eşdeğer kabul ediliyor \[14\].

#{strong[Hukuki çerçeve.]} Kişisel veriler 2019 tarihli "Kişisel Veriler Hakkında" kanunla düzenlenir; elektronik dijital imza hakkında yeni bir kanun 2022’de kabul edildi \[18\].

Özbekistan örneği, Şekil 1’deki katmanların kısa sürede ve birlikte yenilendiği bir ülkeyi gösteriyor: Kimlik kartına geçiş, karta imza sertifikası eklenmesi, dijital belgelerin hukuki eşdeğerliği ve imza kanununun yenilenmesi beş yıllık bir dönemde gerçekleşti.

== Kırgızistan

#{strong[Birlikte çalışabilirlik altyapısı: Tunduk.]} Kırgızistan’ın dijital kimlik hikâyesi, bir kimlik kartından önce devlet kurumlarını birbirine bağlayan bir altyapıyla başlar. Estonya’nın e-Yönetişim Akademisi’nin duyurusuna göre, Estonya’nın #{strong[X-Road]} adlı veri değişim çözümü 18 Nisan 2016’da Kırgızistan’da #{strong[Tunduk]} adıyla hizmete girdi \[15\]. X-Road’un açık kaynak topluluğunun 2026’da yayımladığı bir vaka incelemesine göre Tunduk üzerinden geçen işlem sayısı 2018’de 363 bin iken 2024’te 3,5 milyara ulaştı ve 2025 ortasında 185 kurum sisteme bağlıydı \[15\].

#kutu("teknik", [X-Road tipi bir veri değişim katmanı nasıl çalışır?])[
X-Road, devlet kurumlarının veritabanlarını birleştirmeden, birbirleriyle güvenli biçimde veri alışverişi yapmasını sağlayan bir mimaridir. Her kurum kendi önüne bir #{strong[güvenlik sunucusu]} (#{emph[security server]}) koyar. Kurum A, kurum B’den bir bilgi istediğinde şu adımlar işler:

#adimlar((
  ("A → sunucu A", [#{strong[İstek.]} A’nın sistemi isteği kendi güvenlik sunucusuna verir.], []),
  ("sunucu A → sunucu B", [#{strong[İmza ve gönderim.]} İstek A’nın anahtarıyla imzalanır, zaman damgası alınır ve şifreli bir kanaldan gönderilir.], []),
  ("sunucu B → B", [#{strong[Denetim.]} A’nın imzası ve yetkisi doğrulanır, istek B’ye iletilir.], []),
  ("B → A", [#{strong[Cevap.]} Cevap aynı yoldan, B’nin imzasıyla geri döner.], []),
  ("A ve B", [#{strong[Kayıt.]} Her iki taraf da imzalı istek ve cevabı kendi günlüğünde saklar.], []),
))

Sistemin ortak bileşeni, hangi kurumların sisteme bağlı olduğunu, hangi sertifikaların geçerli olduğunu ve hangi zaman damgası hizmetlerine güvenildiğini söyleyen bir #{strong[ortak yapılandırmadır]}. Bu yapılandırma merkezî bir sunucu tarafından imzalanarak yayımlanır. Yani X-Road da, bu dizinin altıncı yazısında anlatılacak güven listesi fikrinin bir türünü kullanır: Kimin kim olduğunu söyleyen imzalı ortak bir liste. Veri ise her kurumun kendi yerinde kalır.
]

#{strong[Kimlik kartı ve elektronik imza.]} Kırgızistan Mayıs 2017’de yeni kimlik kartı için başvuru almaya başladı. Uluslararası sektör basınına göre kartın çipinde ad, uyruk, fotoğraf, adres, iki parmak izi, imza ve dijital imza ile kimlik doğrulama sertifikaları bulunur ve kart ICAO uyumlu olarak tanıtıldı \[16\]. Yerel basının 2017’deki haberine göre bu kartı alanlara üç yıl geçerli elektronik imza anahtarları ücretsiz veriliyordu \[16\].

#{strong[Mobil kimlik.]} Yerel basının 2024’teki haberine göre Tunduk mobil uygulamasındaki dijital kimlik, iç hat uçuşlarında kabul ediliyor \[16\].

#{strong[Hukuki çerçeve.]} Elektronik imza 2017 tarihli bir kanunla, kişisel bilgiler 2008 tarihli bir kanunla düzenlendi \[18\]. Türk Devletleri Teşkilatı’nın 2026 tarihli Türkistan Bildirisi, Kırgızistan’ın Dijital Kodunun 2026’da yürürlüğe girdiğini not eder \[21\]; bu kodun önceki kanunları ne ölçüde değiştirdiğini kamuya açık kaynaklardan doğrulayamadık.

== Türkmenistan

Türkmenistan, Türk Devletleri Teşkilatı’nın gözlemci üyesidir. Kamuya açık kaynaklarda bu ülkenin dijital kimlik altyapısı hakkındaki bilgi diğer ülkelere göre daha sınırlıdır. Doğrulayabildiğimiz bilgiler şunlardır: Türkmenistan’da biyometrik pasaport kaydı 10 Temmuz 2008’de başladı; tek kamu hizmetleri internet portalı Kasım 2019’da açıldı; elektronik belge ve dijital hizmetler hakkında bir kanun 2020’de kabul edildi ve "Elektronik Devlet Hakkında" kanun 27 Temmuz 2022’de yürürlüğe girdi \[17\]. Özel hayata ilişkin bilgilerin korunması 2017 tarihli bir kanunla düzenlenir \[18\]. Kamuya açık bazı kaynaklar, ülkede iç pasaportun temel kimlik belgesi olmaya devam ettiğini belirtiyor; çipli bir ulusal kimlik kartı ya da mobil kimlik uygulaması hakkında doğrulayabildiğimiz bir bilgi bulamadık.

== Gözlemci üyeler ve Avrupa Birliği

Türkiye Dışişleri Bakanlığı’nın sayfasına göre Türk Devletleri Teşkilatı’nın gözlemci üyeleri Macaristan, Türkmenistan ve Kuzey Kıbrıs Türk Cumhuriyeti’dir \[19\]. Bu yazı gözlemci üyeleri ayrıntılı olarak incelemiyor; ama Macaristan’ın konumu, Bölüm 7’deki tartışma açısından ayrıca anılmaya değer. Macaristan bir Avrupa Birliği üyesidir ve dizinin ilk yazısında anlatılan eIDAS 2.0 tüzüğü gereği vatandaşlarına bir Avrupa Dijital Kimlik Cüzdanı sunmakla yükümlüdür. Yani teşkilatın çevresinde, AB’nin dijital kimlik çerçevesinin doğrudan uygulandığı bir ülke de bulunur.

= Ortak Noktalar ve Farklar

== Katmanlara göre tablo

Tablo 1, Bölüm 3’te anlatılanları Şekil 1’deki katmanlara göre özetliyor. Tablodaki her hücre, o katmanda kamuya açık kaynaklarla doğrulayabildiğimiz durumu gösterir; boş ya da "doğrulanamadı" yazan hücre, o katmanın ülkede bulunmadığı anlamına gelmez.

#tablo([#{strong[Tablo 1.]} Altı ülkede dijital kimlik katmanları (Kasım 2026 itibarıyla, kamuya açık kaynaklara göre).], (20fr, 14fr, 15fr, 16fr, 19fr, 16fr, 18fr), ([Katman], [Türkiye], [Azerbaycan], [Kazakistan], [Özbekistan], [Kırgızistan], [Türkmenistan],), (
  ([Çipli kimlik kartı], [var (2016 pilot)], [var, e-imza sertifikalı (2018)], [var (2009’dan beri çipli belgeler)], [var, e-imza sertifikalı (2021)], [var, e-imza sertifikalı (2017)], [doğrulanamadı; biyometrik pasaport (2008)],),
  ([E-devlet kapısı], [e-Devlet (2008)], [e-gov.az, mygov], [eGov.kz (2006)], [my.gov.uz (2013)], [Tunduk mobil uygulaması], [portal (2019)],),
  ([Mobil imza ya da uygulama imzası], [mobil imza], [Asan İmza, SİMA İmza], [doğrulanamadı], [doğrulanamadı], [doğrulanamadı], [doğrulanamadı],),
  ([Uygulamada dijital belgeler], [prototip planlı (2027)], [mygov (2024)], [eGov Mobile (2021)], [devlet uygulaması (2025’te eşdeğerlik)], [Tunduk uygulaması], [doğrulanamadı],),
  ([Kişisel veri kanunu], [6698 (2016)], [2010], [2013], [2019], [2008], [2017],),
))

Tablodan birkaç ortak nokta okunabilir.

#{strong[Hepsi açık anahtar altyapısına dayanıyor.]} Ülkelerin hepsinde elektronik imza, dizinin ilk yazısında anlatılan açık anahtarlı kriptografiye dayanan bir sertifika altyapısıyla kurulmuş. Kimlik kartına imza sertifikası koyan Azerbaycan, Özbekistan ve Kırgızistan bunu kişinin cebindeki karta taşımış durumda. Bu, sınır ötesi tanıma için önemli bir başlangıç noktası: Teknik olarak herkes aynı matematik dilini konuşuyor.

#{strong[Mobil dijital belgeler son beş yılda hukuki eşdeğerlik kazandı.]} Kazakistan 2021’de, Azerbaycan 2024’te, Özbekistan 2025’te uygulamadaki dijital belgelerin kâğıt karşılıklarıyla eşdeğer olduğunu hukuken düzenledi; Türkiye 2027 için bir prototip planlıyor. Yani bölge, dizinin ilk yazısında anlatılan "dördüncü döneme", yani belgenin kişinin elinde taşındığı modele doğru birlikte ilerliyor.

#{strong[Farklar araçlarda ve profillerde.]} Bir ülke mobil kimliği SIM karta, bir diğeri bir uygulamaya ve yüz biyometrisine, bir başkası kimlik kartının çipine dayandırıyor. Dijital belgelerin teknik biçimleri, yani hangi veri yapısıyla kodlandıkları ve hangi protokolle gösterildikleri, kamuya açık kaynaklarda çoğu zaman ayrıntılı olarak yer almıyor. Bu durum, ülke içinde sorun yaratmaz; ama sınır ötesinde bir doğrulayanın her ülkenin her aracını ayrı ayrı anlaması gerektiği anlamına gelir.

== Uluslararası bir ölçüt: BM e-Devlet Endeksi

Birleşmiş Milletler’in iki yılda bir yayımladığı e-Devlet Araştırması, ülkelerin çevrimiçi hizmetlerini, telekomünikasyon altyapısını ve beşerî sermayesini birleştiren bir #{strong[e-Devlet Gelişmişlik Endeksi]} (EGDI) hesaplar. Endeks dijital kimliği doğrudan ölçmez; ama ülkelerin e-devlet alanındaki genel konumu hakkında karşılaştırılabilir bir fikir verir. 2024 araştırmasında 193 ülke arasında altı ülkenin yeri Tablo 2’deki gibidir \[22\].

#tablo([#{strong[Tablo 2.]} BM e-Devlet Gelişmişlik Endeksi 2024 (193 ülke arasında sıra).], (15fr, 8fr, 8fr, 8fr), ([Ülke], [2024 sırası], [EGDI değeri (2024)], [2022 sırası],), (
  ([Kazakistan], [24], [0,9009], [28],),
  ([Türkiye], [27], [0,8913], [48],),
  ([Özbekistan], [63], [0,7999], [69],),
  ([Azerbaycan], [74], [0,7607], [83],),
  ([Kırgızistan], [78], [0,7316], [81],),
  ([Türkmenistan], [145], [0,4757], [137],),
))

Tablo, iki şeyi aynı anda gösteriyor. Birincisi, bölgedeki ülkelerin önemli bir kısmı e-devlet alanında dünya ortalamasının belirgin biçimde üzerinde. İkincisi, ülkeler arasındaki farklar büyük. Bu farklar, ortak bir altyapı tasarlanırken her ülkenin aynı anda aynı adımı atamayabileceğini, dolayısıyla tasarımın farklı hızlarda katılmaya izin vermesi gerektiğini düşündürüyor.

== Mobil belgeler neden sınırı geçmiyor?

Tablo 1’deki en yeni katman, uygulamadaki dijital belgelerdir ve sınır ötesi tanıma tartışmasında en çok umut bağlanan katman da budur. Telefonunda dijital kimliği olan birinin, bu kimliği başka bir ülkede de gösterebileceğini düşünmek doğaldır. Ama bir mobil belgenin sınırı geçip geçemeyeceği, belgenin #{strong[nasıl]} doğrulandığına bağlıdır. Genel olarak üç yaklaşım vardır ve bir ülkenin uygulaması bunlardan birini ya da birkaçını birlikte kullanabilir. Kamuya açık kaynaklar, bölgedeki uygulamaların hangisini kullandığını çoğu zaman ayrıntılı olarak söylemediği için, aşağıdaki anlatım hiçbir ülkeye özgü olmayan genel yaklaşımları tarif ediyor.

#kutu("teknik", [Mobil belgenin üç doğrulama yaklaşımı])[
#{strong[1\. Ekrandaki görüntü.]} Uygulama, belgenin bir görüntüsünü güvenlik öğeleriyle (hareketli desen, saat, hologram benzeri efektler) gösterir. Doğrulayan, ekrana bakarak karar verir. Bu yöntem kâğıt belgenin dijital bir taklidi gibidir; ekran görüntüsü alınıp düzenlenebileceği için güvencesi sınırlıdır ve makineyle doğrulanamaz.

#{strong[2\. Sunucuya sorgu.]} Ekranda bir QR kod bulunur. Doğrulayan kodu okutur; kod, devletin bir sunucusuna giden bir adres ya da tek kullanımlık bir değer içerir. Doğrulayanın cihazı sunucuya sorar, sunucu belgenin bilgilerini ya da "geçerli" cevabını döner.

#adimlar((
  ("Doğrulayan → Devlet sunucusu", [#{strong[Soru.]} "Şu kodun sahibi kim, belgesi geçerli mi?"], []),
  ("Devlet sunucusu → Doğrulayan", [#{strong[Cevap.]} Ad, soyad ve belge durumu döner.], []),
))

Bu yöntem güvenlidir, ama iki bedeli vardır. Birincisi, her doğrulamada devletin sunucusu kimin nerede doğrulandığını öğrenir; dizinin ilk yazısında anlattığımız "eve telefon etme" sorunu. İkincisi, yabancı bir doğrulayanın o sunucuya erişim yetkisi ve o sunucuya güvenmek için bir dayanağı olması gerekir. Sınırı geçmek için iki ülke arasında bir sistem bağlantısı gerekir.

#{strong[3\. Cihazdaki imzalı belge.]} Belge, devletin ya da yetkili kurumun dijital imzasıyla kişinin telefonuna verilir ve orada durur. Gösterim sırasında telefon belgeyi (ya da yalnız istenen alanlarını) doğrulayana aktarır; doğrulayan imzayı, belgeyi verenin açık anahtarıyla, kimseye sormadan kontrol eder. Bu, dizinin ilk yazısında anlattığımız #{strong[üçgen modeldir]} ve AB’nin dijital kimlik cüzdanının dayandığı yaklaşımdır. Sınırı geçmek için ülkeler arasında bir sistem bağlantısı gerekmez; yalnızca doğrulayanın, belgeyi verenin açık anahtarını güvenilir biçimde öğrenebilmesi gerekir.
]

Bu üç yaklaşımın sınır ötesi tanıma açısından farkı büyüktür. Birinci yaklaşım sınırı geçemez, çünkü makineyle doğrulanamaz. İkinci yaklaşım sınırı ancak ülkeler arası sistem bağlantılarıyla geçebilir; bu da Bölüm 6.3’te anlatılacak ülke düğümleri modeline karşılık gelir. Üçüncü yaklaşım ise sınırı, Bölüm 2.2’deki pasaportlar gibi geçer: Belge kendi imzasını taşır, doğrulayanın ihtiyaç duyduğu tek şey verenin anahtarına güvenmenin bir yoludur. Bu yüzden bölgedeki ülkelerin mobil belgelerinin sınır ötesinde kullanılabilmesi, büyük ölçüde bu belgelerin üçüncü yaklaşımı ve ortak standartları destekleyip desteklemediğine bağlı olacaktır.

== Zaten işleyen bir ortak altyapı: pasaportlar

Sınır ötesi tanıma konusunda bölgede zaten işleyen bir örnek var ve Bölüm 2.2’de onun teknik işleyişini anlattık: elektronik pasaportlar ve ICAO’nun Açık Anahtar Dizini. ICAO’nun katılımcı listesine göre altı ülkeden dördü bu dizine katılmış durumda (Tablo 3) \[2\].

#tablo([#{strong[Tablo 3.]} ICAO Açık Anahtar Dizini’ne (PKD) katılım (ICAO katılımcı listesi, Kasım 2026).], (15fr, 15fr), ([Ülke], [Katılım tarihi],), (
  ([Kazakistan], [19 Aralık 2008],),
  ([Özbekistan], [19 Mart 2014],),
  ([Türkiye], [30 Eylül 2016],),
  ([Türkmenistan], [13 Şubat 2017],),
  ([Azerbaycan], [listede yer almıyor],),
  ([Kırgızistan], [listede yer almıyor],),
))

PKD’nin önemi, bu yazının Bölüm 6’da tartışacağı modellerden birinin, yani #{strong[ortak bir güven dizini]} modelinin, kimlik belgeleri için zaten onlarca yıldır işlediğini göstermesidir. Ülkeler kendi kök sertifikalarını ortak bir dizine koyar; her ülkenin sınır kapısı, diğerlerinin pasaportlarını o dizindeki sertifikalarla doğrular. Hiçbir ülke diğerinin veritabanına erişmez; yalnızca imzaları doğrular. Bir PKD’ye katılmamak bir ülkenin pasaportlarının doğrulanamadığı anlamına gelmez; sertifikalar ikili yollarla da değiş tokuş edilebilir. Ama ortak dizin, bu değiş tokuşu her çift için ayrı ayrı yapma zorunluluğunu ortadan kaldırır.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Altı ülkenin hepsi dijital kimliği açık anahtar altyapısı üzerine kurmuş durumda ve dördü son beş yılda mobil dijital belgelere hukuki eşdeğerlik tanıdı ya da bunu planlıyor. Farklar, araçlarda ve teknik profillerdedir. Pasaportlar için ortak bir güven dizini zaten işliyor; kimlik kartları, diplomalar ve mobil belgeler için bölgede henüz böyle bir ortak yapı yok.
]

= Sınır Ötesi Senaryolar: Eğitim, İş, Seyahat

Ülke ülke tabloyu gördükten sonra, girişteki üç yolcuya geri dönelim. Her senaryoda aynı üç soruyu soracağız: Bugün süreç nasıl işliyor, dijital kimliğin hangi parçası sınırda kayboluyor ve ortak bir güven altyapısı olsaydı ne değişirdi?

== Eğitim: Aynur’un diploması

#{strong[Bugün.]} Aynur’un diploması Bakü’deki üniversitesinin verdiği kâğıt bir belgedir. İstanbul’daki üniversite belgenin gerçek olduğunu anlamak için ondan diplomanın noter onaylı suretini ve apostilini ister. #{strong[Apostil]}, 1961 tarihli Lahey Sözleşmesi’ne dayanan ve bir resmî belgenin üzerindeki imzanın ve mührün gerçekliğini belgeyi veren ülkenin yetkili makamı adına onaylayan bir şerhtir. Apostil, tam da bu yazının konusu olan sorunun kâğıt çağındaki çözümüdür: Doğrulayan, yabancı bir kurumun imzasını tanımaz; o imzayı tanıyan kendi ülkesindeki bir makamın onayına güvenir. Ama her belge için ayrı bir onay zinciri gerektirir ve haftalar sürebilir.

#{strong[Kayıp parça.]} Aynur’un elinde aslında güçlü bir dijital araç var: kimlik kartındaki elektronik imza sertifikası. Ama diploma onunla imzalanmamış; üniversitesinin dijital bir imzasını taşımıyor. Taşısaydı bile İstanbul’daki üniversite o imzayı atan kurumun gerçekten bir yükseköğretim kurumu olduğunu ve diploma vermeye yetkili olduğunu bilemezdi.

#{strong[Ortak güven altyapısıyla.]} Bakü’deki üniversite diplomayı dijital olarak imzalayıp Aynur’un cüzdanına verir. Azerbaycan’ın yükseköğretim otoritesi, diploma vermeye yetkili kurumları imzalı bir listede yayımlar. İstanbul’daki üniversite diplomanın imzasını, Azerbaycan’ın listesindeki anahtarla doğrular. Azerbaycan ile Türkiye arasında elektronik imzaların karşılıklı tanınması konusunda bir adım zaten atılmış durumda: Azerbaycan’dan yapılan açıklamaya göre iki ülke arasında elektronik imzaların karşılıklı tanınması için bütün teknik süreçler ve testler Şubat 2026 itibarıyla tamamlanmış, sürece tam hukuki geçerlilik kazandıracak düzenleyici çerçeve ise hazırlanıyor \[25\].

== İş: Timur’un belgeleri

#{strong[Bugün.]} Timur’un kimlik kartı ve ehliyeti eGov Mobile’da dijital belge olarak duruyor ve Kazakistan’da kâğıt karşılıklarıyla eşdeğer. İstanbul’daki şirket ise onlardan bir pasaport fotokopisi ve diplomasının onaylı bir sureti istiyor. Çalışma izni başvurusunda da aynı belgeler kâğıt üzerinde dolaşacak.

#{strong[Kayıp parça.]} Timur’un dijital belgeleri bir uygulamanın ekranında gösterilmek üzere tasarlanmış. Bir başka ülkedeki bir kurumun bu belgeleri makineyle doğrulayabilmesi için, belgelerin ortak bir biçimde ve ortak bir protokolle sunulabilmesi gerekir. Dizinin ikinci ve sekizinci yazılarında anlatılan doğrulanabilir belge biçimleri ve gösterim protokolleri tam olarak bu işe yarar; ama bir ülkenin uygulamasının bu biçimleri kullanıp kullanmadığı kamuya açık kaynaklarda çoğu zaman belirtilmiyor.

#{strong[Ortak güven altyapısıyla.]} Timur, şirketin gösterdiği QR kodu okutur. Cüzdanı, şirketin yalnızca ad, soyad, doğum tarihi ve diploma bilgisini istediğini gösterir. Timur onaylar. Şirket, belgelerin imzalarını Kazakistan’ın yayımladığı listedeki anahtarlarla doğrular ve Kazakistan’daki hiçbir kuruma soru sormaz. Kimlik numarası, adres ya da fotoğraf gibi gerekmeyen bilgiler şirkete hiç gitmez.

== Seyahat ve kısa süreli kayıt: Dilnoza

#{strong[Bugün.]} Dilnoza Bişkek’e giderken yanında pasaportunu taşıyor. Pasaportun çipi, Bölüm 2.2’de anlatılan zincirle sınır kapısında doğrulanabiliyor; bu, bölgede zaten işleyen tek ortak dijital kimlik doğrulamasıdır. Ama eğitim programına kayıt yaptırırken, otelde ya da bir telefon hattı alırken, kurumlar pasaportunun fotokopisini alıyor. Fotokopi, çipteki imzalı verinin bütün güvencesini kaybetmiş bir kopyadır ve çoğu zaman gerekenden çok daha fazla bilgi içerir.

#{strong[Kayıp parça.]} Pasaport çipini okuyup doğrulamak teknik olarak mümkündür; ama bunun için kurumların çip okuyabilen bir cihazı ve Özbekistan’ın kök sertifikasına güvenmenin bir yolu olması gerekir. Sınır kapıları bu yola ICAO aracılığıyla sahiptir; bir eğitim kurumu ya da bir otel değildir.

#{strong[Ortak güven altyapısıyla.]} Dilnoza’nın cüzdanında Özbekistan’ın verdiği bir kimlik belgesi bulunur. Kayıt masasında yalnızca ad ve soyadını, ya da yalnızca "18 yaşından büyüktür" bilgisini gösterir. Kurum, belgeyi Özbekistan’ın listesindeki anahtarla doğrular ve kopyalamaya gerek duymaz (Şekil 4).

#kutu("teknik", [Sınır ötesi bir doğrulayanın üç sorusu ve bir ad sorunu])[
Bir ülkede verilmiş bir dijital belgeyi başka bir ülkede doğrulayan bir sistem, sırasıyla üç soruya cevap verir:

#tablo([], (19fr, 39fr, 14fr), ([Soru], [Neye bakılır], [Cevabın kaynağı],), (
  ([1\. İmza geçerli mi?], [belge değiştirilmemiş, imzalayan anahtar belli], [belgenin kendisi],),
  ([2\. İmzalayan kim, yetkili mi?], [anahtar hangi kuruma ait; o kurum bu belge türünü verebilir mi], [güven listesi],),
  ([3\. Belge hâlâ geçerli mi?], [iptal edilmiş ya da askıya alınmış mı], [durum listesi],),
))

Birinci soru saf matematiktir ve her ülke aynı cevabı bulur. İkinci ve üçüncü sorular ise belgeyi veren ülkenin #{strong[yayımladığı bir şeye]} bakmayı gerektirir: bir güven listesine ve bir durum listesine. Sınır ötesi tanımanın teknik çekirdeği, bu iki listenin biçiminin ve dağıtım yolunun ortak olmasıdır.

Bölgeye özgü bir ayrıntı daha vardır: alfabeler. Bölgedeki ülkelerde Latin ve Kiril alfabeleri kullanılır ve Türkçe, Azerbaycan Türkçesi, Kazakça ya da Özbekçe adlarda Ş, Ç, Ğ, Ə, Ң, Ў gibi özel harfler bulunur. ICAO Doc 9303’e göre pasaportların makine tarafından okunabilir bölgesi yalnızca A–Z harflerini, rakamları ve #{raw("<")} işaretini kullanır; bu yüzden özel harfler belgenin standart çeviri yazım kurallarına göre dönüştürülür \[1\]. Aynı kişinin adı, bir belgede özgün yazımıyla, bir diğerinde dönüştürülmüş hâliyle yer alabilir. Bir doğrulayan iki belgedeki adları karşılaştırırken bu farkı bilmek zorundadır; ortak bir altyapı, adların hangi alanda hangi yazımla taşınacağını da baştan tanımlamalıdır.
]

#sekil(4, [Üç sınır ötesi senaryo: bugün ve ortak bir güven altyapısıyla], "figures/a13/sekil-4.svg", yarim: false)

== Üç senaryonun ortak dersi

Üç senaryo farklı alanlardan geliyor, ama aynı yerde tıkanıyor. Aynur’un diploması, Timur’un belgeleri ve Dilnoza’nın kimliği, her biri kendi ülkesinde devletin ya da yetkili bir kurumun imzasını taşıyabilecek durumda. Teknik kutudaki üç sorudan birincisi, yani imzanın geçerli olup olmadığı, üç senaryoda da bugünkü teknolojiyle kolayca cevaplanabilir. Tıkanan yer ikinci ve üçüncü sorulardır: İstanbul’daki üniversite, Azerbaycan’da hangi kurumun diploma vermeye yetkili olduğunu; İstanbul’daki şirket, Kazakistan’da kimlik belgesini hangi anahtarın imzaladığını; Bişkek’teki kurum, Özbekistan’ın verdiği bir belgenin iptal edilip edilmediğini nereden öğrenecek?

Bu sorulara bugün verilen cevap, kâğıt çağının cevabıdır: noter, apostil, fotokopi, onaylı suret. Bu araçlar yüzyıllardır işliyor ve işlemeye de devam edecek; ama dijital belgenin taşıdığı iki önemli kazancı yok ediyor. Birincisi, belgenin değiştirilmediğinin matematiksel olarak kanıtlanabilmesi. Fotokopi bu kanıtı taşımaz. İkincisi, kişinin yalnızca gerekeni gösterebilmesi. Fotokopi belgenin tamamını verir. Üç senaryonun ortak dersi, eksik olan parçanın bir uygulama ya da bir cihaz olmadığıdır. Eksik olan, her ülkenin yetkili kurumlarını ve anahtarlarını diğer ülkelere güvenilir biçimde duyurabileceği ortak bir yoldur. Bir sonraki bölüm, bu yolun nasıl kurulabileceğine dair seçenekleri ele alıyor.

= Birlikte Çalışabilirlik İçin Yönetişim Seçenekleri

== Teşkilat belgelerinde dijital işbirliği

Türk Devletleri Teşkilatı, 3 Ekim 2009’da Türkiye, Azerbaycan, Kazakistan ve Kırgızistan’ın imzaladığı Nahçıvan Anlaşması ile Türk Konseyi adıyla kuruldu; Özbekistan 2019’da tam üye oldu ve teşkilat 12 Kasım 2021’deki İstanbul Zirvesi’nde bugünkü adını aldı \[19\]. Aynı zirvede kabul edilen #{strong[Türk Dünyası 2040 Vizyonu]}, bilgi ve iletişim teknolojileri başlığı altında, üye devletlerin bu alandaki politika ve düzenlemelerini düzenleyiciler arasındaki işbirliğini artırarak uyumlaştırmayı ve ticaret, ulaştırma, sağlık ve eğitim öncelikli olmak üzere ortak e-devlet ve e-hizmet programları geliştirmeyi hedefler arasında sayar \[20\].

Sonraki zirve belgeleri bu hedefleri biraz daha somutlaştırdı. 6 Kasım 2024 tarihli Bişkek Bildirisi, Türk devletleri arasında dijital ticaret için hukuki çerçeve oluşturacak bir Dijital Ekonomi Ortaklığı Anlaşması’nın imzalanmasını memnuniyetle karşılar ve birlikte çalışabilirliği sağlamak için ortak bilgi ve iletişim teknolojisi standartları kurulması çağrısında bulunur \[21\]. 15 Mayıs 2026 tarihli Türkistan Bildirisi ise sınır ötesi elektronik belge alışverişini geliştirmek ve dijital hizmetlere güveni artırmak amacıyla, üye devletler arasında elektronik dijital imzaların karşılıklı tanınmasına ilişkin anlaşma taslağının incelenmesinin sonuçlandırılmasını teşvik eder; ulusal tek pencere sistemlerinin ve e-devlet bilgi sistemlerinin entegrasyonunu destekler \[21\].

Bu belgeler, bu yazının sorusunun teşkilat düzeyinde de gündemde olduğunu gösteriyor. Belgelerin hangi teknik ve kurumsal modelle hayata geçirileceği ise kamuya açık kaynaklarda henüz ayrıntılı olarak yer almıyor. Bu yüzden bu bölümde, uluslararası deneyimlerden çıkarılabilecek üç temel modeli genel olarak tartışıyoruz. Bu tartışma, teşkilatın ya da herhangi bir üye devletin tercihine dair bir öngörü ya da öneri değildir.

== Birinci model: İkili tanıma anlaşmaları

En doğal başlangıç, iki ülkenin birbirinin imzalarını ve belgelerini tanımak için anlaşmasıdır. Azerbaycan ile Türkiye arasındaki elektronik imza çalışması bu modelin bir örneğidir. İkili model, karşılıklı güvenin en yüksek olduğu ülke çiftlerinde hızlı ilerler ve her anlaşma iki tarafın özel koşullarına göre biçimlenebilir.

Modelin sınırı ölçektir.

#kutu("teknik", [İkili anlaşmaların sayısı nasıl büyür?])[
Hesapladığımız şey, $n$ ülkenin her birinin diğer her biriyle ayrı bir tanıma anlaşması yapması gerektiğinde kaç anlaşma gerektiğidir. Her ülke diğer $n - 1$ ülkeyle anlaşır; ama her anlaşma iki ülke tarafından sayıldığı için toplam ikiye bölünür:

#formul[$ A(n) = (n (n - 1)) / 2 $]

Ortak bir listeler listesi modelinde ise her ülke yalnızca #{strong[bir]} kez, ortak listeye kendi listesinin adresini ve imzacısını kaydeder; gereken ilişki sayısı $n$’dir. İki modeli yan yana koyalım:

#tablo([], (8fr, 9fr, 10fr), ([Ülke sayısı $n$], [İkili anlaşma $n(n-1) slash 2$], [Listeler listesi $n$],), (
  ([2], [1], [2],),
  ([5], [10], [5],),
  ([6], [15], [6],),
  ([8], [28], [8],),
  ([10], [45], [10],),
))

Her anlaşma bir hukuki metin, bir teknik entegrasyon ve bir bakım yükü demektir. Bir ülke kök anahtarını yenilediğinde, bunu $n - 1$ ayrı ilişkide ayrı ayrı bildirmek zorunda kalır. Tablonun söylediği şey şudur: İkili anlaşmaların sayısı ülke sayısının karesiyle kabaca orantılı, listeler listesindeki ilişki sayısı ise ülke sayısıyla aynı hızda büyür. Altı ülke için bu, on beş yerine altı ilişki demektir; on ülkede kırk beşe karşı on.
]

== İkinci model: Ülke düğümleri ve ağ geçitleri

İkinci model, her ülkenin bir #{strong[ağ geçidi]} ya da #{strong[düğüm]} kurduğu ve sınır ötesi kimlik doğrulama isteklerinin bu düğümler arasından geçtiği modeldir. Avrupa Birliği’nin 2014 tarihli ilk eIDAS düzenlemesi elektronik kimlik için bu modeli kullandı: Bir ülkenin vatandaşı başka bir ülkenin kamu hizmetine girerken, istek iki ülkenin düğümleri üzerinden kişinin kendi ülkesinin kimlik sağlayıcısına yönlendirilir.

Bu model, dizinin ilk yazısında anlattığımız #{strong[federasyonun]} ülkeler arası hâlidir ve federasyonun güçlü ve zayıf yanlarını taşır. Güçlü yanı, mevcut e-devlet kapılarının olduğu gibi kullanılabilmesidir: Ülkelerin kimlik sağlayıcıları zaten vardır. Zayıf yanı ise her sınır ötesi işlemde kişinin kendi ülkesinin sistemine haber verilmesidir; dizinin ilk yazısındaki terimle bu bir "eve telefon etme" modelidir. Ayrıca her işlem için iki ülkenin sistemlerinin aynı anda çalışır durumda olmasını gerektirir. Avrupa Birliği’nin eIDAS 2.0 ile bu modelden, kişinin elinde taşıdığı imzalı belgelere dayanan cüzdan modeline geçmesinin nedenlerinden biri de budur.

== Üçüncü model: Ortak listeler listesi

Üçüncü model, Avrupa Birliği’nin güven hizmetleri için 2014’ten beri kullandığı, ICAO’nun pasaportlar için Açık Anahtar Dizini’yle uyguladığı ve Kırgızistan’ın Tunduk sisteminde de bir türü bulunan modeldir: #{strong[imzalı listeler ve onların listesi.]}

Her ülke, kendi ülkesinde hangi kurumların hangi belgeleri vermeye yetkili olduğunu söyleyen imzalı bir #{strong[güven listesi]} yayımlar. Listeyi ülke kendisi hazırlar, kendisi imzalar ve kendi sunucusunda tutar. Ortak bir yapı ise yalnızca bu listelerin adreslerini ve her listeyi imzalamaya yetkili anahtarı içeren bir #{strong[listeler listesi]} yayımlar. Bir doğrulayan, listeler listesini bir kez alır, oradan ilgili ülkenin listesine ulaşır ve belgeyi verenin anahtarını o listeden öğrenir. Belgeyi veren kuruma ya da o ülkenin hiçbir sistemine işlem sırasında soru sorulmaz (Şekil 5).

#sekil(5, [Sınır ötesi tanıma için üç yönetişim modeli], "figures/a13/sekil-5.svg", yarim: false)

Bu modelin bölge için birkaç çekici yanı vardır. Birincisi #{strong[egemenliği korur]}: Her ülkenin listesi kendi elinde kalır; ortak yapı o listenin içeriğine karar vermez, yalnızca adresini ve imzacısını duyurur. Bir ülke listesinden bir kurumu çıkardığında, bu karar bütün doğrulayanlara kendiliğinden ulaşır. İkincisi #{strong[farklı hızlara izin verir]}: Bir ülke listesini hazır olduğunda ekler; diğerlerinin beklemesi gerekmez. Bölüm 4.2’deki farkları düşünürsek bu önemli bir özelliktir. Üçüncüsü #{strong[mahremiyeti korur]}: Doğrulama sırasında kimseye haber gitmez. Dördüncüsü, #{strong[bölgede zaten bilinen bir modeldir]}: Pasaportlar için ICAO PKD, devlet kurumları arası veri değişimi için X-Road’un ortak yapılandırması aynı fikri kullanır.

Modelin açık sorusu, listeler listesini #{strong[kimin imzalayacağıdır]}. Bu, teknik değil yönetişim sorusudur: ortak bir kurumun mu, üye ülkelerin birlikte mi, yoksa her doğrulayanın kendi seçtiği listeleri mi? Dizinin altıncı yazısı bu soruyu ayrıntılı olarak ele alacak.

#tablo([#{strong[Tablo 4.]} Sınır ötesi tanıma için üç yönetişim modelinin karşılaştırması.], (25fr, 23fr, 27fr, 23fr), ([Ölçüt], [İkili anlaşmalar], [Ülke düğümleri (federasyon)], [Ortak listeler listesi],), (
  ([Gereken ilişki sayısı (n ülke)], [n × (n − 1) \/ 2], [n (her ülke ortak protokole bağlanır)], [n],),
  ([Doğrulamada verene haber gider mi?], [modele bağlı], [evet, her işlemde], [hayır],),
  ([Ülkenin kendi kararları üzerindeki denetimi], [yüksek], [yüksek], [yüksek (liste ülkede kalır)],),
  ([Farklı hızlarda katılım], [kolay (çift çift)], [orta (ortak protokol gerekir)], [kolay (liste hazır olunca eklenir)],),
  ([Kişinin elindeki belgeyle uyum], [sınırlı], [düşük (her seferinde kimlik sağlayıcıya gider)], [yüksek (cüzdan modeline uygun)],),
  ([Bölgede bilinen örnek], [Azerbaycan–Türkiye e-imza çalışması], [AB’nin ilk eIDAS düğümleri], [ICAO PKD; X-Road ortak yapılandırması],),
  ([Başlıca güçlük], [ölçek ve bakım], [süreklilik ve izlenme riski], [listeler listesinin yönetişimi],),
))

Bu üç model birbirini dışlamaz. İkili bir çalışma, iki ülkenin teknik ve hukuki olarak hazır olduğunu gösteren değerli bir ilk adım olabilir; ortak bir listeler listesine geçildiğinde, ikili çalışmada kurulan güven ve teknik deneyim kaybolmaz. Gerçek hayatta en olası yol, bu modellerin bir karışımıdır.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Türk Devletleri Teşkilatı’nın 2021, 2024 ve 2026 tarihli belgeleri, ortak e-devlet programlarını, ortak teknoloji standartlarını ve elektronik imzaların karşılıklı tanınmasını açıkça gündeme alıyor. Bu hedeflere ulaşmak için üç temel model var: ikili anlaşmalar, ülke düğümleri ve ortak listeler listesi. İkili anlaşmalar hızlı başlar ama zor ölçeklenir; ülke düğümleri mevcut sistemleri kullanır ama her işlemde kişinin ülkesine haber verir; ortak listeler listesi egemenliği ve mahremiyeti korur, ama kimin imzalayacağı sorusunu bir yönetişim kararı olarak bekler.
]

= Avrupa Birliği ile İlişki: Karşılıklı Tanıma

== Tüzük ne diyor?

Türk dünyası ülkelerinin dijital kimlik altyapıları, coğrafi ve ekonomik nedenlerle Avrupa Birliği ile de sürekli temas hâlindedir: öğrenciler, çalışanlar, şirketler ve seyahat edenler iki yönde de sınırları geçer. Bu yüzden bölgedeki birlikte çalışabilirlik tartışması, AB’nin dijital kimlik çerçevesiyle ilişkiden bağımsız düşünülemez.

eIDAS tüzüğünün 2024\/1183 sayılı tüzükle değiştirilmiş hâlinin 14. maddesi "uluslararası yönler" başlığını taşır \[23\]. Maddeye göre, üçüncü bir ülkede kurulu güven hizmeti sağlayıcılarının sunduğu güven hizmetleri, uygulama işlemleriyle ya da AB ile o üçüncü ülke arasında Avrupa Birliği’nin İşleyişi Hakkında Antlaşma’nın 218. maddesine göre yapılan bir anlaşmayla tanındığında, AB’deki nitelikli güven hizmetlerine hukuken eşdeğer kabul edilir. Madde, üçüncü ülkelerin tanınmış güven hizmeti sağlayıcılarının bir güven listesini kurmasını, tutmasını ve yayımlamasını da özellikle öngörür; tanıma bir anlaşmayla yapılıyorsa, AB’deki nitelikli güven hizmetlerinin de o ülkede eşdeğer tanınmasını şart koşar. Tüzüğün gerekçe bölümü ise AB’nin uluslararası ortaklarının, bu tüzükten esinlenen güven çerçeveleri kurmakta olduğunu not eder \[23\].

Bu düzenleme iki önemli şey söyler. Birincisi, AB’nin üçüncü ülkelerle tanıma için düşündüğü yol bir #{strong[güven listesinden]} geçer: Tanınmak isteyen ülke, AB’nin kendi güven listeleriyle aynı mantıkta bir liste yayımlamalıdır. Bu, Bölüm 6.4’teki üçüncü modelin AB ile bağlantı noktası da olabileceğini gösterir. İkincisi, 14. madde güven hizmetleri, yani elektronik imzalar, mühürler ve zaman damgaları gibi hizmetler için açık bir yol tarif eder. Kimlik cüzdanlarının ve kişi kimlik verisinin üçüncü ülkelerle karşılıklı tanınması ise bugün daha çok pilotlar ve ikili işbirlikleri üzerinden ilerliyor.

== AB dışındaki ülkelerle deneyimler

Bu işbirliklerinden ikisi kamuya açık kaynaklarda iyi belgelenmiştir. Ukrayna, 2023’te Avrupa Dijital Kimlik Cüzdanı’nı sınayan büyük ölçekli pilotlardan biri olan POTENTIAL konsorsiyumuna katıldı ve AB’nin bu konudaki yayınına göre konsorsiyumdaki tek AB üyesi olmayan ülke oldu \[24\]. Japonya ile AB, Nisan 2024’te dijital kimlikler ve güven hizmetleri alanında bir işbirliği mutabakatı imzaladı; Japonya Dijital Ajansı’nın Mayıs 2026’daki açıklamasına göre iki taraf, öğrenci akademik kayıtlarını doğrulanabilir belge olarak değiş tokuş eden bir pilotla dijital kimlik belgelerinin birlikte çalışabilirliğini sınadı \[24\].

Bu iki örnek, sınır ötesi tanımanın iki ayrı katmanda ilerlediğini gösteriyor (Şekil 6). Birinci katman #{strong[teknik uyumdur]}: aynı belge biçimleri, aynı gösterim protokolleri, aynı güven listesi biçimi. İkinci katman #{strong[hukuki tanımadır]}: bir ülkenin belgesinin diğer ülkede hukuken geçerli sayılması. Teknik uyum hukuki tanımayı kendiliğinden getirmez; ama hukuki tanıma, teknik uyum olmadan pratikte uygulanamaz. Bir ülke bugün AB’nin seçtiği standartlarla uyumlu bir altyapı kurarsa, yarın bir hukuki tanıma kararı alındığında teknik olarak hazır olur.

#sekil(6, [Sınır ötesi tanımanın iki katmanı: teknik uyum ve hukuki tanıma], "figures/a13/sekil-6.svg", yarim: false)

== Teknik uyumun bölge için anlamı

Dizinin ilk yazısında, AB’nin dijital kimlik cüzdanı için seçtiği standartların (SD-JWT VC ve mdoc belge biçimleri, OpenID4VCI ve OpenID4VP protokolleri, ETSI’nin güven listesi biçimleri) açık ve uluslararası standartlar olduğunu söylemiştik. Bu standartlar belirli bir ülkeye ait değildir; herhangi bir ülke onları kendi altyapısında kullanabilir.

Bu durum Türk dünyası için iki yönlü bir fırsat yaratır. Bölge ülkeleri kendi aralarında ortak bir altyapı kurarken AB’nin standartlarını temel alırsa, aynı anda iki işi birden yapmış olur: Hem birbirleriyle hem de, hukuki tanıma sağlandığı gün, AB ile konuşabilen bir altyapı kurarlar. Aksi durumda, bölge içi ortak bir altyapı ile AB arasında ayrıca bir köprü kurmak gerekir; bu da Bölüm 6.2’deki ikili anlaşma sayısı sorununun bir kat daha yukarıda tekrarlanması demektir.

Macaristan’ın teşkilatın gözlemci üyesi ve AB üyesi olması da bu açıdan dikkat çekicidir: Teşkilatın çevresinde, AB’nin dijital kimlik çerçevesini doğrudan uygulayan ve bu çerçevenin işleyişine dair deneyimi kaynağından taşıyabilecek bir ülke bulunur. Bunun pratikte nasıl bir işbirliğine dönüşeceği ise ilgili ülkelerin kararıdır ve bu yazının konusu dışındadır.

#kutu("ornek", [Aynur bir yaz okuluna başvuruyor])[
İstanbul’daki yüksek lisansının ikinci yılında Aynur, bir AB ülkesindeki bir üniversitenin yaz okuluna başvurmak istiyor. O üniversite, AB’nin dijital kimlik cüzdanlarından gelen belgeleri kabul eden bir başvuru sistemi kullanıyor. Aynur’un diploması Azerbaycan’da, öğrenci belgesi Türkiye’de verilmiş. İki belge de AB’nin seçtiği biçimlerde ve imzalı olarak Aynur’un cüzdanında dursa bile, AB’deki üniversitenin sistemi ancak bu belgeleri verenlerin anahtarlarını güvendiği bir listeden öğrenebildiği ölçüde onları kabul edebilir. Teknik uyum, belgelerin okunabilmesini sağlar; belgelerin kabul edilip edilmeyeceği ise üniversitenin kendi kurallarına ve, zamanla, AB ile Aynur’un belgelerini veren ülkeler arasında kurulacak tanıma ilişkilerine bağlıdır. Bu arada Aynur’un elindeki seçenek, bugün olduğu gibi, belgelerin kâğıt ve apostilli hâlleridir.
]

= Sınırlar ve Açık Sorular

Bu yazıdaki tablo, kamuya açık kaynakların izin verdiği ölçüde çizildi. Bu bölümde hem yazının kendi sınırlarını hem de bölgedeki birlikte çalışabilirlik tartışmasında açık kalan soruları sıralıyoruz.

#{strong[Kaynakların sınırı.]} Ülkelerin dijital kimlik altyapıları hakkındaki ayrıntılı teknik bilgi, yani dijital belgelerin hangi biçimde kodlandığı, mobil uygulamaların hangi protokolleri kullandığı ya da imza altyapılarının hangi profillere uyduğu, kamuya açık kaynaklarda çoğu zaman yer almıyor. Türkmenistan için kamuya açık bilgi özellikle sınırlı. Bu yazının karşılaştırması bu yüzden teknik ayrıntıdan çok katmanlar düzeyinde kalmak zorunda kaldı.

#{strong[Hızlı değişim.]} Kazakistan’ın 2026’da kabul ettiği ve Kırgızistan’ın 2026’da yürürlüğe giren dijital kodları, Türkiye’nin 2027 için planladığı cüzdan prototipi ve Özbekistan’ın 2030’a uzanan kimlik kartı geçişi, tablonun birkaç yıl içinde önemli ölçüde değişeceğini gösteriyor. Bu yazının bir fotoğraf olarak okunması gerekir.

#{strong[Kişisel verinin sınır ötesi aktarımı.]} Ülkelerin hepsinin kişisel veri kanunları var ve bu kanunlar verinin yurt dışına aktarılmasını farklı koşullara bağlıyor. Cüzdan modelinde kişi kendi belgesini kendisi gösterdiği için klasik veri aktarımı sorunlarının bir kısmı hafifler; ama doğrulayan kurumun aldığı veriyi nasıl saklayacağı, her ülkenin kendi hukukuna tabi kalır.

#{strong[Adlar, alfabeler ve tanımlayıcılar.]} Bölüm 5’teki teknik kutuda anlattığımız ad yazımı sorununa ek olarak, ülkelerin kişisel kimlik numaralarının biçimi ve kapsamı da farklıdır. Sınır ötesi bir altyapı, bir ülkenin kimlik numarasını başka bir ülkede bir #{strong[tanımlayıcı]} olarak dolaştırmaktan kaçınmalıdır; dizinin beşinci yazısında anlatılacağı gibi, kapsamı geniş tanımlayıcılar kişinin farklı bağlamlardaki kayıtlarının birleştirilmesini kolaylaştırır.

#{strong[Listeler listesinin yönetişimi.]} Bölüm 6.4’te açık bıraktığımız soru, yazının en önemli açık sorusudur. Bir listeler listesini kimin imzalayacağı, bir ülkenin listesinin nasıl ekleneceği ya da çıkarılacağı ve anlaşmazlıkların nasıl çözüleceği teknik standartlarla cevaplanamaz; bunlar ilgili devletlerin ve kurumların vereceği kararlardır.

#{strong[Dijital uçurum.]} Bölgedeki ülkeler arasında ve ülkelerin kendi içinde, akıllı telefona ve internete erişim eşit değildir. Mobil cüzdana dayanan bir altyapı, cüzdanı olmayanlar için kâğıt ve yüz yüze yolların açık kalmasını gerektirir.

#{strong[Teknik uyum ile hukuki tanıma arasındaki boşluk.]} Bölüm 7’de gördüğümüz gibi, aynı standartları kullanmak bir ülkenin belgesinin başka bir ülkede hukuken tanınması için yeterli değildir. Teknik olarak hazır bir altyapının, hukuki tanıma kararları gelene kadar nasıl değer üreteceği, örneğin hangi alanlarda gönüllü kabulle başlanabileceği, ayrıca düşünülmesi gereken bir sorudur.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisi Tamga Network tarafından yayımlanıyor. Bu yazının konusu, ağın varlık nedeniyle doğrudan ilgili olduğu için, ağın konumunu kamuya açık belgelerine dayanarak kısaca anlatmak doğru olur.

Tamga Network, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır ve Avrupa Birliği’nin eIDAS 2.0 ve EUDI profillerini temel alır. Ağın yaklaşımı, bu yazının Bölüm 6.4’te anlattığı #{strong[imzalı listeler ve listeler listesi]} modeline dayanır. Ağ, belge veren kurumların, doğrulayıcıların ve cüzdan sağlayıcılarının kimler olduğunu söyleyen imzalı güven listeleri yayımlar; listelerde hiçbir kişisel veri yer almaz. Ağ kendisi bir cüzdan işletmez; cüzdanları listeler.

Ağın teknik belgesine göre listeler listesi, başka bir işletmecinin yayımladığı bir listeyi de gösterebilecek biçimde tasarlanmıştır: bir devletin, onun yetkilendirdiği bir kurumun ya da Avrupa Birliği’nin listesini. Böyle bir listede liste sahibinde kalır; bir devlet kendi listesini yayımladığında, cüzdan ve doğrulayıcı için yalnızca listenin adresi ve imzacısı değişir. Dış liste olarak ilk okunan biçim ETSI TS 119 602’dir; böylece ağın doğrulayıcısı AB’nin kişi kimlik verisini ve mobil ehliyetini de tanıyabilecek biçimde tasarlanmıştır. #{strong[Bugün ağın listeler listesinde hiçbir dış liste yer almıyor]}; her biri ancak kayda geçen bir onayla eklenebilir. Ağın bugün etkin olan listesi yalnızca Türkiye bölümüdür.

Yani Tamga Network, bu yazının sorduğu sorunun teknik yarısına, AB’nin standartlarıyla uyumlu bir cevap hazırlamaya çalışan bir girişimdir. Sorunun diğer yarısı, yani kimin hangi listeyi yayımlayacağı ve hangi belgelerin hangi ülkede hukuken tanınacağı, Bölüm 8’de söylediğimiz gibi devletlerin ve yetkili kurumların kararıdır.

= Sonuç

Bu yazıya üç yolcuyla başladık: Bakü’den İstanbul’a giden Aynur, Almatı’dan İstanbul’a giden Timur ve Taşkent’ten Bişkek’e giden Dilnoza. Üçü de kendi ülkelerinde gelişmiş dijital kimlik araçlarına sahip. Kartlarında imza sertifikaları, telefonlarında devletin imzasını taşıyan dijital belgeler var. Ama sınırı geçtiklerinde bu araçların neredeyse hiçbiri işe yaramıyor.

Ülke ülke tablo, bölgenin dijital kimlikte ortak bir dili zaten konuştuğunu gösteriyor: Hepsi açık anahtar altyapısına dayanıyor, çoğu son beş yılda mobil belgelere hukuki eşdeğerlik tanıdı ya da bunu planlıyor, dördü pasaportlar için ICAO’nun ortak güven dizinine zaten katılmış durumda. Eksik olan teknoloji değil, ortak bir güven kaynağıdır: Bir ülkenin, diğer bir ülkenin hangi kurumunun hangi belgeyi vermeye yetkili olduğunu öğrenebileceği, herkesin aynı biçimde okuyabildiği imzalı bir kayıt.

Teşkilatın son belgeleri bu eksikliği gündeme almış durumda; elektronik imzaların karşılıklı tanınması ve ortak teknoloji standartları açıkça çağrılar arasında. Bu hedeflere hangi modelle ulaşılacağı ise henüz açık. Uluslararası deneyimler, imzalı ulusal listelerin ve onların ortak bir listesinin, hem egemenliği hem mahremiyeti koruyan ve farklı hızlarda katılmaya izin veren bir yol olduğunu gösteriyor. Aynı yol, AB’nin üçüncü ülkelerle tanıma için öngördüğü güven listesi mantığıyla da örtüşüyor.

Dizinin ilk yazısında, bozkırdaki tamganın gücünün, bir toplulukta herkesin o işareti tanımasından geldiğini söylemiştik. Türk dünyasının ülkeleri bugün her biri kendi içinde güçlü işaretlere sahip. Asıl iş, bu işaretlerin sınırın öbür yanında da tanınmasını sağlayacak ortak kuralları kurmak.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Uluslararası Sivil Havacılık Örgütü (ICAO) (2021). #{emph[Doc 9303: Machine Readable Travel Documents.]} 8. baskı, özellikle Bölüm 3 (makine tarafından okunabilir bölge ve çeviri yazım), Bölüm 10 (çipteki veri yapısı) ve Bölüm 11–12 (güvenlik mekanizmaları ve açık anahtar altyapısı).]

#kaynak("2")[ICAO. #{emph[ICAO PKD Participants.]} icao.int\/icao-pkd\/participants (erişim: Kasım 2026).]

#kaynak("3")[T.C. Ulaştırma ve Altyapı Bakanlığı (2023). "Dijital Türkiye’nin kapısı e-Devlet 15 yaşında." uab.gov.tr, 18 Aralık 2023. Ayrıca: e-Devlet Kapısı, "Hakkımızda" ve "Sıkça Sorulan Sorular" sayfaları, turkiye.gov.tr (erişim: Kasım 2026).]

#kaynak("4")[#{emph[Hürriyet]} (2016). "Yeni kimlik kartları sahtesini imkânsız kılacak." 3 Mart 2016.]

#kaynak("5")[T.C. Cumhurbaşkanlığı Strateji ve Bütçe Başkanlığı (2026). #{emph[2027 Yılı Cumhurbaşkanlığı Yıllık Programı.]} Resmî Gazete, 27 Ekim 2026 (mükerrer).]

#kaynak("6")[#{emph[5070 sayılı Elektronik İmza Kanunu.]} Resmî Gazete, 23 Ocak 2004, sayı 25355. Ayrıca: #{emph[6698 sayılı Kişisel Verilerin Korunması Kanunu.]} Resmî Gazete, 7 Nisan 2016, sayı 29677.]

#kaynak("7")[Azerbaycan Cumhuriyeti Dijital Kalkınma ve Ulaştırma Bakanlığı (2018). "New generation ID cards will have e-signature certificates." mincom.gov.az, 31 Ağustos 2018. Ayrıca: #{emph[Report.az]} (2018). "Azerbaijan begins to issue new generation ID cards to citizens." 1 Eylül 2018.]

#kaynak("8")[Asan İmza. "About." asanimza.az (erişim: Kasım 2026).]

#kaynak("9")[#{emph[Biometric Update]} (2024). "Physical IDs no longer mandatory in Azerbaijan." 18 Temmuz 2024. Ayrıca: #{emph[Biometric Update]} (2026). "SİMA İmza digital signature accelerates Azerbaijan’s digital transformation." Ocak 2026.]

#kaynak("10")[Kazakistan Cumhuriyeti hükümet portalı (2026). Dijital kalkınmadan sorumlu bakanlığın eGov.kz’nin yirminci yılına ilişkin basın açıklaması. gov.kz, 13 Nisan 2026.]

#kaynak("11")[#{emph[The Astana Times]} (2021). "Identity documents and other public services now available on mobile app in Kazakhstan." 18 Mayıs 2021. Ayrıca: #{emph[Nur.kz]} (2022), Kazakistan İçişleri Bakanlığı’nın çipli belgeler hakkındaki açıklaması, 23 Mayıs 2022.]

#kaynak("12")[Kazakistan Cumhuriyeti. #{emph[Elektronik Belge ve Elektronik Dijital İmza Hakkında Kanun]}, 7 Ocak 2003, No. 370-II (9 Ocak 2026 tarihli ve 255-VIII sayılı Kod ile yürürlükten kaldırılmıştır); #{emph[Kişisel Veriler ve Korunması Hakkında Kanun]}, 21 Mayıs 2013, No. 94-V. Adilet mevzuat veri tabanı.]

#kaynak("13")[#{emph[UzA]} (2020). Özbekistan’da kimlik kartlarının uygulamaya konmasına ilişkin önlemler (22 Eylül 2020 tarihli UP-6065 sayılı Cumhurbaşkanlığı Kararnamesi), 23 Eylül 2020. Ayrıca: gov.uz, kimlik kartının çipindeki bilgilere ilişkin resmî bilgilendirme sayfası (erişim: Kasım 2026).]

#kaynak("14")[#{emph[Trend]} (2013). my.gov.uz tek portalının deneme modunda açılması, 2 Temmuz 2013. Ayrıca: ITU, BDT Bölge Ofisi haberi, 24 Haziran 2026 (Özbekistan’da dijital belgeler).]

#kaynak("15")[e-Governance Academy (2016). "The heart of the e-state, Tunduk, launched in Kyrgyzstan." ega.ee, 26 Nisan 2016. Ayrıca: X-Road Global (2026). "The Tunduk story: How Kyrgyzstan built a digital nation on an open-source backbone." Mayıs 2026.]

#kaynak("16")[#{emph[IdentityWeek]} (2017). "Kyrgyzstan starts issuing ICAO compliant eIDs." 12 Temmuz 2017. Ayrıca: #{emph[24\.kg]} (2017). "Biometric passport contains key to e-signature." 4 Mayıs 2017; #{emph[24\.kg]} (2024), Tunduk uygulamasındaki dijital kimliğin iç hat uçuşlarında kabulü, 31 Mayıs 2024.]

#kaynak("17")[Türkmenistan’ın Hindistan Büyükelçiliği, "Biometric passport" konsolosluk bilgilendirmesi (erişim: Kasım 2026). Ayrıca: #{emph[Trend]} (2019), Türkmenistan’ın tek kamu hizmetleri portalı, 28 Kasım 2019; #{emph[Turkmenportal]} (2022), "Elektronik Devlet Hakkında" kanunun yürürlüğe girmesi, 27 Temmuz 2022.]

#kaynak("18")[DLA Piper. #{emph[Data Protection Laws of the World]} (Azerbaycan, Kırgızistan, Özbekistan, Türkmenistan sayfaları; erişim: Kasım 2026). Elektronik imza kanunları için ülkelerin resmî mevzuat veri tabanları.]

#kaynak("19")[T.C. Dışişleri Bakanlığı. "Türk Devletleri Teşkilatı." mfa.gov.tr (erişim: Kasım 2026).]

#kaynak("20")[Türk Devletleri Teşkilatı (2021). #{emph[Turkic World Vision – 2040.]} turkicstates.org.]

#kaynak("21")[Türk Devletleri Teşkilatı (2024). #{emph[Bishkek Declaration of the 11th Summit of the Organization of Turkic States]}, 6 Kasım 2024. Ayrıca: Türk Devletleri Teşkilatı (2026). #{emph[Turkistan Declaration]} (gayriresmî zirve, "Yapay Zekâ ve Dijital Kalkınma"), 15 Mayıs 2026. turkicstates.org.]

#kaynak("22")[Birleşmiş Milletler Ekonomik ve Sosyal İşler Dairesi (UN DESA) (2024). #{emph[United Nations E-Government Survey 2024.]} Ülke sayfaları, publicadministration.un.org\/egovkb.]

#kaynak("23")[Avrupa Parlamentosu ve Konseyi. #{emph[910\/2014 sayılı Tüzük (AB) (eIDAS)]}, 2024\/1183 sayılı Tüzük (AB) ile değiştirilmiş hâli, madde 14; 2024\/1183 sayılı Tüzük, gerekçe 47. Avrupa Birliği Resmî Gazetesi.]

#kaynak("24")[EU4Digital (2024). "Ukraine: helping to develop the European Digital Identity Wallet." 30 Nisan 2024. Ayrıca: Avrupa Komisyonu (2024). #{emph[EU–Japan Memorandum of Cooperation on Digital Identities and Trust Services.]} 30 Nisan 2024; Japonya Dijital Ajansı (2026), AB–Japonya Dijital Ortaklık Konseyi açıklaması, Mayıs 2026.]

#kaynak("25")[#{emph[Report.az]} (2026). "Azerbaijan, Türkiye complete technical integration of e-signatures." 11 Şubat 2026.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Türk Devletleri Teşkilatı, #{emph[Turkic World Vision – 2040]} (2021).]} Teşkilatın uzun vadeli hedeflerini kendi ağzından anlatan kısa belge; bilgi ve iletişim teknolojileri bölümü bu yazının konusuyla doğrudan ilgili.
+ #{strong[BM, #{emph[E-Government Survey 2024]}.]} Ülkelerin e-devlet alanındaki konumunu karşılaştırmalı olarak gösteren en kapsamlı kaynak; ülke sayfaları kısa ve okunaklı.
+ #{strong[ICAO, #{emph[Doc 9303]}, Bölüm 1 ve 11–12.]} Elektronik pasaportların nasıl doğrulandığını ve ülkeler arası güvenin nasıl kurulduğunu anlatan, dünyada en geniş ölçekte işleyen sınır ötesi dijital kimlik sisteminin belgesi.
+ #{strong[X-Road Global, #{emph[The Tunduk story]} (2026).]} Bir ülkenin devlet kurumlarını açık kaynak bir altyapıyla nasıl birbirine bağladığını sayılarla anlatan vaka incelemesi.
+ #{strong[eIDAS tüzüğünün 14. maddesi ve 2024\/1183 sayılı tüzüğün gerekçe bölümü.]} AB’nin üçüncü ülkelerle tanıma konusunda ne öngördüğünü kendi metninden okumak için.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. Teknik terimlerin İngilizce karşılıkları, başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (18fr, 20fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Açık Anahtar Dizini (PKD)], [ICAO Public Key Directory], [Ülkelerin pasaport imza sertifikalarını paylaştığı ICAO dizini],),
  ([Aktif doğrulama], [active authentication], [Çipin kopyalanmadığını, kendi gizli anahtarıyla bir sınamaya cevap vererek göstermesi],),
  ([Apostil], [apostille], [1961 Lahey Sözleşmesi’ne göre resmî bir belgedeki imzanın ve mührün gerçekliğini onaylayan şerh],),
  ([Belge güvenlik nesnesi (SOD)], [document security object], [Çipteki veri gruplarının özetlerini taşıyan, belgeyi veren ülkenin imzaladığı kayıt],),
  ([Birlikte çalışabilirlik], [interoperability], [Farklı sistemlerin birbirinin verisini ve belgesini anlayıp kullanabilmesi],),
  ([Çeviri yazım], [transliteration], [Bir alfabedeki harflerin başka bir alfabeye kurallı biçimde aktarılması],),
  ([E-devlet kapısı], [e-government portal], [Kamu hizmetlerinin tek bir adresten sunulduğu portal],),
  ([EGDI], [E-Government Development Index], [BM’nin ülkelerin e-devlet gelişmişliğini ölçtüğü endeks],),
  ([Elektronik imza], [electronic signature], [Açık anahtarlı kriptografiyle atılan, imzalayanı ve belgenin bütünlüğünü kanıtlayan imza],),
  ([Güven listesi], [trusted list], [Hangi kurumun hangi rolde yetkili olduğunu söyleyen imzalı liste],),
  ([Güvenlik sunucusu], [security server], [X-Road mimarisinde her kurumun önündeki, mesajları imzalayan ve doğrulayan sunucu],),
  ([Kök sertifika otoritesi (CSCA)], [country signing certification authority], [Bir ülkenin pasaport ve kimlik belgesi imzalayıcılarını sertifikalayan kök otorite],),
  ([Listeler listesi], [list of trusted lists], [Ülkelerin güven listelerinin adreslerini ve imzacılarını içeren ortak liste],),
  ([Makine tarafından okunabilir bölge (MRZ)], [machine readable zone], [Kimlik belgesinin alt kısmındaki, yalnız A–Z, rakam ve #{raw("<")} içeren okunabilir satırlar],),
  ([Mobil imza], [mobile signature], [İmza anahtarının telefon hattındaki güvenli bir ortamda saklandığı elektronik imza],),
  ([Pasif doğrulama], [passive authentication], [Çipteki verinin imzasının, belgeyi veren ülkenin sertifika zinciriyle doğrulanması],),
  ([Sınır ötesi tanıma], [cross-border recognition], [Bir ülkenin belgesinin ya da imzasının başka bir ülkede kabul görmesi],),
  ([Veri grubu], [data group], [Çipte belirli bir türde veriyi (ör. fotoğraf, parmak izi) taşıyan bölüm],),
  ([X-Road], [X-Road], [Kurumlar arası güvenli veri değişimi için açık kaynak altyapı; Kırgızistan’da Tunduk adıyla kullanılır],),
))

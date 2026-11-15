// A10 — Cüzdan Güvenliği. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Cüzdan Güvenliği",
  altbaslik: "Anahtar Nerede Saklanır, Telefon Gerçek mi?",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Ocak 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("dijital kimlik cüzdanı", "güvenli donanım", "Secure Enclave", "StrongBox", "güvenilir yürütme ortamı", "WSCD", "donanım güvenlik modülü", "cihaz kanıtı", "App Attest", "Play Integrity", "cüzdan birimi kanıtı", "WUA", "anahtar kanıtı", "kullanıcı doğrulama", "kayıp ve yedekleme",),
  atif: "Karataş, B. (2027). Cüzdan Güvenliği: Anahtar Nerede Saklanır, Telefon Gerçek mi?. Tamga Network Akademik Çalışmalar, A10. https://tamga.network/files/publications/wallet-security-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bir kimlik cüzdanı dışarıdan bakınca belgelerin durduğu bir uygulamaya benzer. Oysa cüzdanın asıl değerli parçası belgeler değil, belgeleri kişiye bağlayan gizli anahtarlardır. Bir belgenin kopyası tek başına işe yaramaz; doğrulayan, belgeyi gösterenin o belgeye bağlı anahtarı elinde tuttuğunu görmek ister. Bu yüzden cüzdan güvenliğinin ilk sorusu basittir: anahtar nerede duruyor ve onu kimse çıkarıp başka bir yere götürebilir mi? İkinci soru da en az onun kadar önemlidir: belge veren kurum, karşısındaki uygulamanın gerçek bir cüzdan olduğunu ve gerçek bir telefonda çalıştığını nereden bilecek?

Bu yazı bu iki soruyu sıfırdan ele alıyor. Önce bir cüzdanı kimin, nasıl ele geçirmek isteyebileceğini anlatan bir tehdit modeli kuruyoruz. Sonra telefonun içindeki güvenli donanımı (Apple’ın Secure Enclave’i, Android’in güvenilir yürütme ortamı ve StrongBox’ı), sunucudaki donanım güvenlik modüllerine dayanan uzak çözümleri, telefonun ve uygulamanın gerçekliğini kanıtlayan platform hizmetlerini (App Attest, Android anahtar kanıtı, Play Integrity) ve Avrupa Birliği’nin cüzdan birimi kanıtını (WUA) adım adım anlatıyoruz. PIN ve biyometrinin gerçekte neyi açtığını, telefon kaybolduğunda neler olduğunu ve anahtarların neden yedeklenmediğini de tartışıyoruz. Yazının sonunda bu yaklaşımları yan yana koyuyor ve çözülmemiş soruları sıralıyoruz.
  ],
)

= Giriş: Vapurda Kaybolan Telefon

Aynur’u dizinin ilk yazısından tanıyoruz. Bakü’de lisansını bitirmiş, İstanbul’da yüksek lisansa başlamıştı. Artık telefonunda bir kimlik cüzdanı var. İçinde kimlik bilgisi, diploması, öğrenci belgesi ve bir etkinlik bileti duruyor. Bir akşam Kadıköy’den Karaköy’e giden vapurda çantası açık kalıyor. İskeleye vardığında telefon yok.

Aynur’un aklından geçen ilk soru, cüzdanını kaybeden herkesin sorduğu sorudur: Bulan kişi ne yapabilir? Kimlik kartını bulan biri fotoğrafa bakıp kartın kendisine ait olmadığını hemen anlar, ama yine de kartla bazı işler yapmayı deneyebilir. Telefondaki cüzdanda durum farklıdır. Telefonu bulan kişi Aynur’un diplomasını bir işverene gösterebilir mi? Kimlik bilgisiyle bir banka hesabı açabilir mi? Ya telefon bulunmadıysa ama içindeki veriler bir şekilde kopyalandıysa? Daha sinsi bir senaryo da var: Aynur aylar önce, farkında olmadan, gerçek cüzdanın birebir taklidi olan sahte bir uygulama kurduysa ne olur?

Bu soruların hepsi, kimlik cüzdanlarının en az konuşulan ama en çok emek isteyen tarafına çıkıyor: güvenliğe. Dizinin önceki yazılarında belgelerin nasıl imzalandığını, seçici olarak nasıl gösterildiğini, nasıl iptal edildiğini ve internetten ya da yüz yüze nasıl aktarıldığını anlattık. Bütün bu mekanizmalar sessiz bir varsayıma dayanıyordu. Belgeyi gösteren kişi, o belgeye bağlı gizli anahtarı elinde tutan kişidir ve o anahtar başka kimsenin elinde değildir. Bu yazı o varsayımın nasıl ayakta tutulduğunu anlatıyor.

İki ana soru soracağız. Birincisi #{strong[anahtar nerede saklanıyor?]} Telefonun sıradan belleğinde mi, telefonun içindeki ayrı bir güvenli işlemcide mi, yoksa telefonun hiç dışında, bir sunucudaki güvenli donanımda mı? İkincisi #{strong[telefon ve uygulama gerçek mi?]} Bir belge veren kurum, karşısındaki yazılımın tanınmış bir cüzdan olduğunu, değiştirilmediğini ve anahtarlarını gerçekten güvenli donanımda tuttuğunu nereden bilecek? Bu iki sorunun yanında üçüncü, daha insani bir soru da var: #{strong[telefon kaybolunca ne olacak?]}

Yazının planı şöyle: Bölüm 2 cüzdanın asıl değerinin neden anahtarlarda durduğunu anlatıyor. Bölüm 3 bir tehdit modeli kuruyor ve kimin, neyi, hangi imkânlarla ele geçirmek isteyebileceğini soruyor. Bölüm 4 telefonun içindeki güvenli donanımı, Bölüm 5 sunucudaki uzak güvenli donanımı ele alıyor. Bölüm 6 telefonun ve uygulamanın gerçekliğini kanıtlayan platform hizmetlerini, Bölüm 7 Avrupa Birliği’nin cüzdan birimi kanıtını anlatıyor. Bölüm 8 PIN ve biyometriyi, Bölüm 9 kayıp, yedek ve taşıma sorunlarını tartışıyor. Bölüm 10 seçenekleri karşılaştırıyor, Bölüm 11 açık soruları sıralıyor, Bölüm 12 ise Tamga Network’ün bu konudaki yerini kısaca anlatıyor. Ek A’da terimlerin sözlüğü var.

= Cüzdanın Asıl Değeri: Anahtarlar

== Kopyalanabilen belge, kopyalanamayan anahtar

Dizinin ikinci yazısında doğrulanabilir belgenin yapısını anlatmıştık. Kısaca hatırlayalım. Veren kurum belgenin içeriğini kendi gizli anahtarıyla imzalar. Doğrulayan, verenin açık anahtarıyla imzayı kontrol eder ve belgenin değiştirilmediğinden, gerçekten o kurumdan çıktığından emin olur. Ama bu kontrol tek başına bir şeyi söylemez: belgeyi şu anda gösteren kişinin, belgenin sahibi olup olmadığını.

Bir düşünce deneyi yapalım. Aynur’un diploması imzalı bir veri dosyasıdır. Bu dosyanın bir kopyası bir yedekleme hatası ya da kötü amaçlı bir uygulama yüzünden başka birinin eline geçmiş olsun. İmza hâlâ geçerlidir, çünkü dosyanın tek bir biti bile değişmemiştir. Doğrulayan yalnızca imzaya baksaydı, kopyayı elinde tutan herkes Aynur’un diplomasını kendi diploması gibi gösterebilirdi. Fiziksel dünyada bu sorunu fotoğraf çözüyordu; görevli karttaki yüzle karşısındaki yüzü karşılaştırırdı. Dijital dünyada fotoğrafın yerini bir anahtar alır.

Veren kurum belgeyi düzenlerken içine Aynur’un cüzdanındaki bir #{strong[açık anahtarı]} yazar. Bu anahtarın eşi olan #{strong[gizli anahtar]} yalnızca Aynur’un cüzdanında durur. Aynur belgeyi bir doğrulayana gösterirken, doğrulayanın o an ürettiği rastgele bir değeri bu gizli anahtarla imzalar. Doğrulayan iki şeyi birlikte kontrol eder: belgenin verenin imzasını taşıdığını ve belgeyi gösterenin, belgenin içine yazılmış açık anahtarın eşini elinde tuttuğunu. Bu yönteme #{strong[sahip bağlama]} (#{emph[holder binding]}) ya da #{strong[anahtar bağlama]} (#{emph[key binding]}) denir. SD-JWT VC biçiminde bu ikinci imzaya anahtar bağlama JWT’si (#{emph[KB-JWT]}), mdoc biçiminde aygıt imzası (#{emph[device signature]}) adı verilir \[5, 6\].

#kutu("onemli", [Cüzdanın değeri nerede?])[
Belgenin kendisi kopyalanabilir ve kopyası tek başına bir işe yaramaz. Asıl değerli olan, belgeyi kişiye bağlayan gizli anahtardır. Bir saldırgan belgenin kopyasını alıp anahtarı alamazsa, belgeyi doğrulayana inandırıcı biçimde gösteremez. Bu yüzden cüzdan güvenliğinin merkezinde tek bir soru durur: #{strong[gizli anahtar, sahibinden başkası tarafından kullanılabilir mi?]}
]

== Anahtarı kim kullanabilir?

Bu soruyu parçalara ayırmak gerekiyor. Birinci parça #{strong[anahtarın kopyalanıp kopyalanamayacağıdır]}. Gizli anahtar telefonun sıradan belleğinde bir dosya olarak duruyorsa, o dosyayı okuyabilen bir saldırgan anahtarı alır, kendi bilgisayarına taşır ve istediği kadar imza atar. Aynur telefonunu hiç kaybetmese bile, kimliği bir gün başka bir yerde kullanılabilir ve bunun farkına bile varmaz. Anahtar kopyalanamaz bir yerde duruyorsa saldırganın işi çok zorlaşır; anahtarı kullanmak için o donanıma erişmek zorunda kalır.

İkinci parça #{strong[anahtarın kimin izniyle kullanıldığıdır]}. Anahtar kopyalanamasa bile, telefonu ele geçiren biri ondan imza istemeyi deneyebilir. Bu yüzden anahtarın kullanımı, kişinin orada olduğunu gösteren bir doğrulamaya bağlanır: PIN, parmak izi ya da yüz tanıma. Dizinin ilk yazısındaki dille söylersek, iyi bir cüzdan iki faktörü birleştirir. Biri #{strong[sahip olunan]} şeydir, yani anahtarı taşıyan donanım. Öteki #{strong[bilinen]} ya da #{strong[olunan]} şeydir, yani PIN ya da biyometri.

Üçüncü parça #{strong[anahtarın gerçekten iddia edildiği yerde durup durmadığıdır]}. Bir cüzdan uygulaması kurumlara "anahtarlarım güvenli donanımda" diyebilir. Bu cümleyi söyleyen uygulamanın kendisi sahteyse ya da değiştirilmişse cümlenin bir değeri kalmaz. Kurumun bu iddiayı, uygulamadan bağımsız biri tarafından doğrulanmış olarak görmesi gerekir. Bu doğrulamanın yolları Bölüm 6 ve 7’nin konusu.

= Tehdit Modeli: Kimden Korunuyoruz?

== Tehdit modeli nedir?

Güvenlik mühendisliğinde bir sistemi korumaya başlamadan önce "nasıl koruruz?" diye sorulmaz; önce "kimden ve neyi koruyoruz?" diye sorulur. Bu soruya verilen düzenli cevaba #{strong[tehdit modeli]} denir. İyi bir tehdit modeli dört şeyi açıkça yazar. Korunan #{strong[varlıkları]} (bizim örneğimizde gizli anahtarlar, belgeler, kişisel veriler ve kişinin hangi kuruma ne gösterdiğine dair iz), #{strong[saldırganları]} ve imkânlarını, saldırganın sisteme girebileceği #{strong[yolları]} ve sistemin bilerek #{strong[kapsam dışında]} bıraktığı durumları.

Tehdit modeli olmadan yapılan güvenlik tasarımı ya her şeye karşı korunmaya çalışır ve kullanılamaz hâle gelir ya da en olası saldırıyı gözden kaçırır. Kimlik cüzdanında bu denge ayrıca zordur, çünkü aynı uygulama hem bir kafede yaş göstermek hem de bir bankada hesap açmak için kullanılır.

== Saldırganlar ve imkânları

Bir kimlik cüzdanını hedef alabilecek saldırganları imkânlarına göre kabaca beş gruba ayırabiliriz (Şekil 1).

#sekil(1, [Bir kimlik cüzdanına yönelik başlıca tehditler], "figures/a10/sekil-1.svg", yarim: false)

#{strong[Telefonu bulan ya da çalan kişi.]} En sık karşılaşılan tehdittir. Bu kişinin elinde cihaz vardır, ama çoğu zaman özel bir teknik bilgisi yoktur. Amacı kilit ekranını geçmek, cüzdanı açmak ve belgeleri kullanmaktır. Bu tehdide karşı ilk savunma telefonun kilididir, ikincisi cüzdanın kendi PIN’i ya da biyometrik doğrulaması. Telefonu çalan kişi Aynur’un PIN’ini omzunun üstünden görmüşse bu savunmalar zayıflar. Bu yüzden kayıp telefondaki cüzdanı uzaktan geçersiz kılabilmek de savunmanın bir parçasıdır (Bölüm 9).

#{strong[Kötü amaçlı uygulama.]} Telefona kurulmuş başka bir uygulama, işletim sistemindeki bir açıktan yararlanarak cüzdanın dosyalarını okumaya, ekranını kaydetmeye ya da kişiyi kandırıp onay vermeye zorlamaya çalışabilir. Bu saldırgan uzaktadır ve milyonlarca telefonu aynı anda hedefleyebilir. Ona karşı en güçlü savunma, anahtarı işletim sisteminin ulaşamadığı ayrı bir donanımda tutmaktır (Bölüm 4).

#{strong[Sahte ya da değiştirilmiş cüzdan.]} Saldırgan gerçek cüzdanın görünüşünü taklit eden bir uygulama yazar ya da gerçek uygulamanın kodunu değiştirip yeniden paketler. Bu sahte uygulama kişinin PIN’ini kaydedebilir, kurumdan aldığı belgeyi saldırgana gönderebilir ya da anahtarları sıradan bellekte üretip kurumlara "donanımdayım" diye yalan söyleyebilir. Bu tehdide karşı belge veren kurumun karşısındaki yazılımı tanıyabilmesi gerekir (Bölüm 6 ve 7).

#{strong[Donanım laboratuvarı olan saldırgan.]} Telefonun ya da bir akıllı kartın çipini söküp mikroskop altında inceleyen, çipin güç tüketimini ölçen ya da çipe lazerle hata enjekte eden, bütçesi yüksek bir saldırgandır. Bu tür saldırılar pahalıdır ve genellikle tek bir hedefe yöneliktir. Yine de değeri yüksek kimlik belgeleri söz konusu olduğunda hesaba katılmaları gerekir. Güvenli donanımın sertifikasyonu tam olarak bu saldırgana karşı ne kadar dayanıklı olduğunu ölçer (Bölüm 3.3).

#{strong[Aşırı meraklı taraflar.]} Bu saldırgan bir hırsız değildir; sistemin meşru bir parçasıdır. Cüzdan sağlayıcı, cihaz kanıtı hizmeti veren platform şirketi ya da bir doğrulayan, kendisine düşen bilgiden fazlasını toplamaya çalışabilir: kişinin hangi kurumdan belge aldığını, hangi doğrulayana ne zaman gittiğini. Bu tehdit gizlilikle ilgilidir. Güvenlik önlemlerinin kendisi yeni bir izleme kanalı açmasın diye tasarımın her aşamasında hesaba katılmalıdır. Dizinin beşinci yazısı bu tehdidi bağlanamazlık başlığı altında ayrıntılı tartışıyor.

== Saldırı potansiyeli: "yüksek" ne demek?

Avrupa Birliği’nin kimlik düzenlemelerinde sık geçen bir ifade var: Kimlik aracı #{strong[yüksek saldırı potansiyeline]} sahip saldırganlara karşı korunmalıdır. Bu ifade gündelik dildeki "çok tehlikeli saldırgan" anlamında kullanılmaz. Ölçülebilir bir kavramdır ve uluslararası bir standarda dayanır.

Güvenlik ürünlerinin değerlendirilmesinde kullanılan #{strong[Ortak Kriterler]} (#{emph[Common Criteria]}, ISO\/IEC 15408) ve onun değerlendirme yöntemini tanımlayan ISO\/IEC 18045, bir saldırının ne kadar zor olduğunu birkaç etkene puan vererek hesaplar \[1, 2\]. Bu etkenler saldırıyı bulup uygulamak için gereken süre, saldırganın uzmanlığı, hedef hakkında gereken bilgi, hedefe erişme fırsatı (örneğin cihazı ne kadar süre elde tutmak gerektiği) ve gereken ekipmandır. Puanların toplamı saldırı potansiyelini verir. Bir ürün, değerlendirme laboratuvarının belirli bir potansiyele kadar denediği bütün saldırılara dayanırsa o düzeye karşı dirençli sayılır. Standart dört düzey tanımlar: temel (#{emph[basic]}), artırılmış temel (#{emph[enhanced-basic]}), orta (#{emph[moderate]}) ve yüksek (#{emph[high]}).

#kutu("teknik", [Saldırı potansiyelinin hesaplanması])[
ISO\/IEC 18045’in ekinde her etkene verilecek puanlar tablolarla verilir. Örneğin saldırıyı geliştirmek bir günden kısa sürüyorsa süre puanı düşüktür, aylar sürüyorsa yükselir. Saldırgan sıradan bir kullanıcıysa uzmanlık puanı düşüktür, birden çok alanda uzman bir ekip gerekiyorsa yüksektir. Gereken ekipman herkesin elindeki bir bilgisayarsa puan düşük, ısmarlama bir laboratuvar düzeneği gerekiyorsa yüksektir. Ekte bunlara hedef ürün hakkında gereken bilgi ve saldırı için gereken fırsat penceresi de eklenir. Laboratuvar bulduğu her saldırı yolu $y$ için bu beş puanı toplar; en düşük toplamı veren yol, ürünün dayanıklılığını belirler:

#formul[$ P(y) &= "süre"(y) + "uzmanlık"(y) + "bilgi"(y) + "fırsat"(y) + "ekipman"(y) \
"dayanıklılık" &= min_y P(y) $]

Yani bir ürün, en ucuz saldırı yolu kadar güçlüdür; tek bir kolay yol, diğer bütün zor yolları anlamsız kılar.

Ortak Kriterler’deki #{strong[AVA\_VAN]} bileşeni (güvenlik açığı analizi) bu çalışmanın ne kadar derin yapılacağını tanımlar. En sıkı düzey olan #{strong[AVA\_VAN.5]}’te laboratuvar, yüksek saldırı potansiyeline sahip bir saldırganı canlandırır. Pasaport çipleri ve nitelikli imza kartları gibi ürünler genellikle bu düzeyde değerlendirilir. Avrupa Birliği bu değerlendirmeleri 2024’ten beri kendi siber güvenlik sertifikasyon şeması EUCC çerçevesinde yürütüyor \[7\].
]

Bu kavram neden önemli? Çünkü AB’nin kimlik güvencesi düzeylerini tanımlayan 2015\/1502 sayılı Uygulama Tüzüğü, #{strong[yüksek]} güvence düzeyindeki bir kimlik aracının yüksek saldırı potansiyeline sahip saldırganlara karşı korunmasını ister \[3\]. eIDAS 2.0 de cüzdanın yüksek güvence düzeyinde bir elektronik kimlik sistemi altında sağlanmasını şart koşar (madde 5a(11)) \[4\]. Yani devletin verdiği temel kimlik bilgisinin (PID) bağlı olduğu anahtar, yüksek potansiyelli bir saldırgana karşı sınanmış bir donanımın koruması altında olmalıdır. Bu yazının bu kadar çok donanım konuşmasının nedeni bu şarttır. Sıradan bir akıllı telefonun bütün parçaları bu düzeyde sınanmış değildir.

== Kapsam dışında kalanlar

Her tehdit modeli bazı şeyleri bilerek dışarıda bırakır. Bir cüzdan, kişinin zorla PIN’ini söylemesine karşı teknik olarak çok az şey yapabilir. Kişinin kendi isteğiyle telefonunu ve PIN’ini bir başkasına vermesi de bir güvenlik açığından çok bir hukuk ve sorumluluk konusudur. Telefonun işletim sistemini üreten şirketin kendisinin kötü niyetli olması ise bütün mobil güvenlik modellerinin dayandığı, çoğu zaman açıkça söylenmeyen bir varsayımı sarsar; bu konuya Bölüm 11’de döneceğiz. Bir tehdit modelinin değeri, kapsam dışı bıraktıklarını da açıkça yazmasındadır.

#tablo([#{strong[Tablo 1.]} Tehditler ve onlara karşı kullanılan başlıca savunma katmanları.], (20fr, 18fr, 48fr, 10fr), ([Tehdit], [Saldırganın elinde ne var?], [Başlıca savunma], [Yazıda],), (
  ([Kayıp ya da çalıntı telefon], [cihaz, belki PIN], [telefon kilidi, cüzdan PIN’i ya da biyometri, uzaktan iptal], [Bölüm 8, 9],),
  ([Kötü amaçlı uygulama], [uzaktan yazılım erişimi], [anahtarın işletim sistemi dışında, güvenli donanımda tutulması], [Bölüm 4, 5],),
  ([Sahte ya da değiştirilmiş cüzdan], [kişinin güveni], [cihaz ve uygulama kanıtı, cüzdan birimi kanıtı, sertifikalı cüzdan listesi], [Bölüm 6, 7],),
  ([Donanım laboratuvarı], [cihaz, zaman, ekipman], [yüksek saldırı potansiyeline karşı sertifikalı güvenli donanım], [Bölüm 4, 5],),
  ([Aşırı meraklı taraf], [meşru erişim], [veri azaltma, işlem başına yeni kanıt, iz bırakmayan iptal listeleri], [Bölüm 7, 11],),
  ([Kişinin zorlanması], [kişinin kendisi], [teknik olarak sınırlı; hukuk ve kayıt], [kapsam dışı],),
))

= Telefonun İçindeki Kasa: Güvenli Donanım

== Bir telefonda kaç dünya var?

Bir akıllı telefonu tek bir bilgisayar gibi düşünürüz. Aslında modern bir telefonda, birbirinden ayrılmış birkaç çalışma ortamı yan yana yaşar. Bunu bir bankaya benzetebiliriz. Bankanın giriş katı herkese açıktır; müşteriler gelir gider, broşürler okunur, sıra numarası alınır. Bu kat telefonun #{strong[sıradan çalışma ortamıdır]} (#{emph[rich execution environment]}, kısaca REE). Android ya da iOS burada çalışır, uygulamalar burada açılır, internetten gelen her şey önce buraya düşer. Bu kat kalabalıktır ve kalabalık olduğu için en çok saldırıya uğrayan yer de burasıdır.

Bankanın arka tarafında, yalnızca yetkili personelin girebildiği bir bölüm vardır. Burada daha az iş yapılır ama yapılan işler daha önemlidir. Telefonda bunun karşılığı #{strong[güvenilir yürütme ortamıdır]} (#{emph[trusted execution environment]}, kısaca TEE). TEE, ana işlemcinin donanım desteğiyle ayrılmış, kendi küçük işletim sistemini çalıştıran, sıradan ortamın belleğine erişebilen ama kendi belleği sıradan ortamdan görünmeyen bir bölümdür. Telefonlardaki işlemcilerin çoğunda bu ayrım, ARM’ın #{strong[TrustZone]} adlı teknolojisiyle yapılır; işlemci "normal dünya" ve "güvenli dünya" arasında geçiş yapar \[8\].

En arkada ise kasa dairesi durur: kalın duvarlı, ayrı kilitli, içine girmek için başka bir anahtar gereken oda. Telefondaki karşılığı #{strong[güvenli elemandır]} (#{emph[secure element]}, SE): ana işlemciden fiziksel olarak ayrı, kendi işlemcisi, kendi belleği ve kendi rastgele sayı üreteci olan, fiziksel saldırılara (güç ölçümü, hata enjeksiyonu, çipin açılması) karşı dayanıklı tasarlanmış küçük bir çip. Banka kartlarındaki ve pasaportlardaki çipler bu türdendir. Bazı telefonlarda böyle bir çip ana kartın üzerinde ayrıca bulunur; SIM kart ve e-SIM de bir tür güvenli elemandır.

#sekil(2, [Bir telefonda üç çalışma ortamı ve gizli anahtarın yeri], "figures/a10/sekil-2.svg", yarim: false)

Bu katmanların ortak ilkesi şudur: Gizli anahtar içerideki ortamda üretilir ve #{strong[oradan hiç çıkmaz]}. Cüzdan uygulaması anahtarı hiçbir zaman görmez. Bir imzaya ihtiyaç duyduğunda, imzalanacak veriyi içerideki ortama gönderir ve "bunu imzala" der. İçerideki ortam gerekirse kullanıcıyı doğrular, imzayı üretir ve yalnızca imzayı geri verir. Sıradan ortamı tamamen ele geçiren bir saldırgan bile, bu tasarım doğru çalıştığı sürece, anahtarı kopyalayamaz. En fazla, telefon elindeyken ve kullanıcı doğrulaması aşılmışsa, içerideki ortamdan imza istemeyi deneyebilir. Bölüm 2’deki ilk soru, yani "anahtar kopyalanabilir mi?", bu yüzden büyük ölçüde anahtarın hangi odada durduğuna bağlıdır.

== Apple: Secure Enclave

Apple, iPhone 5s ile birlikte 2013’te işlemcisinin içine #{strong[Secure Enclave]} adını verdiği ayrı bir güvenlik alt sistemi yerleştirdi \[9\]. Apple’ın platform güvenliği kılavuzuna göre Secure Enclave, ana işlemciden yalıtılmış, kendi önyükleme zinciri ve kendi işletim sistemi olan, şifreli belleğe sahip bir bölümdür. Parmak izi ve yüz tanıma verileri burada işlenir, cihaz şifrelemesinin anahtarları burada korunur.

Uygulama geliştiriciler için Secure Enclave’in sunduğu imkân dardır ama tam da kimlik cüzdanının ihtiyaç duyduğu şeydir. Bir uygulama, Secure Enclave’den kendisi için bir eliptik eğri anahtar çifti üretmesini isteyebilir. Apple’ın belgelerine göre Secure Enclave yalnızca NIST P-256 eğrisi üzerindeki anahtarları destekler ve bu anahtarlar Secure Enclave’in dışına çıkarılamaz; dışarıda üretilmiş bir anahtar da içeri aktarılamaz \[10\]. Uygulama yalnızca anahtarın açık yarısını alır ve imza istediğinde Secure Enclave’e başvurur. Anahtar üretilirken bir #{strong[erişim kuralı]} da konabilir: örneğin "her kullanımda Face ID ya da Touch ID iste" ya da "yalnızca cihaz kilidi açıkken kullan". Bu kural da Secure Enclave içinde uygulanır; uygulamanın kendisi bu kuralı aşamaz.

#kutu("teknik", [Secure Enclave’de anahtar üretmek])[
iOS’ta bir uygulama, Secure Enclave’de anahtar üretmek için işletim sistemine şuna benzer özellikler verir (Swift’ten sadeleştirilmiş, değerler örnektir):

#kod("text", "kSecAttrKeyType        = kSecAttrKeyTypeECSECPrimeRandom   (eliptik eğri, P-256)
kSecAttrKeySizeInBits  = 256
kSecAttrTokenID        = kSecAttrTokenIDSecureEnclave      (anahtar Secure Enclave'de üretilsin)
kSecAttrAccessControl  = biometryCurrentSet + privateKeyUsage
                         (imza için güncel biyometri gerekli)", baslik: "Örnek: Secure Enclave'de anahtar üretme isteğinin özellikleri")

İşletim sistemi bu isteği Secure Enclave’e iletir. Secure Enclave anahtar çiftini üretir, gizli yarısını kendi anahtarıyla sararak saklar ve uygulamaya yalnızca bir başvuru tanıtıcısı (#{emph[reference]}) ile açık anahtarı verir. "biometryCurrentSet" kuralı, telefona sonradan yeni bir parmak izi ya da yüz eklenirse anahtarın kullanılamaz hâle gelmesini sağlar. Bu, telefonu ele geçirip kendi parmak izini ekleyen birinin anahtarı kullanmasını engeller.
]

== Android: Keystore, TEE ve StrongBox

Android dünyası daha çeşitlidir, çünkü telefonlar yüzlerce üreticiden ve onlarca farklı işlemci ailesinden gelir. Google bu çeşitliliği #{strong[Android Keystore]} adlı ortak bir arayüzle düzenler \[11\]. Uygulama Keystore’dan anahtar ister; Keystore bu anahtarı, cihazın imkânlarına göre üç yerden birinde üretir.

En zayıf seçenek, anahtarın yazılımda tutulmasıdır. Bu durumda anahtar işletim sisteminin korumasındadır ama sıradan ortamın içindedir. İkinci seçenek #{strong[donanım destekli]} anahtardır: anahtar TEE içinde çalışan küçük bir güvenlik uygulaması (eski adıyla #{emph[Keymaster]}, Android 12’den bu yana #{emph[KeyMint]}) tarafından üretilir ve orada kalır. Android’in belgelerine göre böyle bir anahtar, işletim sistemi ele geçirilse bile cihazdan çıkarılamaz \[11\]. Üçüncü ve en güçlü seçenek #{strong[StrongBox]}’tır. Android 9 ile 2018’de gelen StrongBox, anahtarın TEE yerine ayrı bir güvenli elemanda üretilmesini sağlar. Android’in belgelerine göre StrongBox’ı sağlayan çipin kendi işlemcisi, kendi güvenli belleği, gerçek bir rastgele sayı üreteci ve fiziksel kurcalamaya karşı ek korumaları olmalıdır \[11\]. Google’ın kendi telefonlarındaki Titan M çipi buna bir örnektir.

StrongBox’ın bir bedeli vardır. Ayrı çip daha yavaştır ve daha az algoritmayı destekler; desteklenen eliptik eğri yine P-256’dır. Her Android telefonda da StrongBox yoktur. Bu yüzden bir cüzdan, telefonda hangi seçeneğin bulunduğunu öğrenmek ve buna göre davranmak zorundadır. Daha da önemlisi, belge veren kurumun da bunu öğrenmesi gerekir. Bir PID sağlayıcı, kimlik bilgisini yazılımda tutulan bir anahtara bağlamak istemez.

#kutu("teknik", [Android’de anahtar üretmek ve kanıt istemek])[
Android’de bir uygulama Keystore’dan anahtar isterken şuna benzer bir tarif verir (Kotlin’den sadeleştirilmiş, değerler örnektir):

#kod("text", "KeyGenParameterSpec.Builder(\"pid-anahtari-1\", PURPOSE_SIGN)
  .setAlgorithmParameterSpec(ECGenParameterSpec(\"secp256r1\"))
  .setDigests(DIGEST_SHA256)
  .setIsStrongBoxBacked(true)                 // ayrı güvenli çipte üret
  .setUserAuthenticationRequired(true)        // kullanıcı doğrulaması olmadan kullanılmasın
  .setAttestationChallenge(sunucudanGelenRastgeleDeger)
  .build()", baslik: "Örnek: StrongBox'ta anahtar ve kanıt isteyen bir tarif")

Son satır önemlidir: Uygulama, anahtarla birlikte bir #{strong[anahtar kanıtı]} (#{emph[key attestation]}) da ister. Keystore anahtarı ürettikten sonra, cihaza fabrikada yerleştirilmiş ya da sonradan güvenli biçimde sağlanmış bir kanıt anahtarıyla, "bu açık anahtar şu güvenlik düzeyindeki donanımda üretildi" diyen bir sertifika imzalar. Bu sertifika zinciri Google’ın kök sertifikasına kadar uzanır. Bölüm 6’da bu sertifikanın içine bakacağız.
]

== Güvenli donanımın da açıkları olabilir

Bu katmanlı yapının sağladığı koruma güçlüdür, ama mutlak değildir. Tarih, "donanımda" denen anahtarların da zaman zaman çıkarılabildiğini gösteriyor. İki örnek, sorunun farklı yerlerden gelebildiğini gösterdiği için öğreticidir.

2017’de bir araştırma ekibi, yaygın kullanılan bir güvenli eleman üreticisinin RSA anahtarı üretme kütüphanesinde bir zayıflık buldu. Kütüphane, rastgele olması gereken asal sayıları belirli bir kalıba göre seçiyordu ve bu kalıp, açık anahtardan gizli anahtarı hesaplamayı mümkün kılıyordu. #{strong[ROCA]} adı verilen bu açık, o kütüphaneyi kullanan akıllı kartları ve güvenlik modüllerini etkiledi \[12\]. Etkilenenler arasında Estonya’nın yaklaşık 750 bin kimlik kartı da vardı; Estonya Kasım 2017’de bu kartların sertifikalarını askıya aldı ve kartların yenilenmesini istedi. Burada saldırı çipin fiziksel korumasını aşmadı. Sorun, çipin içinde çalışan yazılımın anahtarı yanlış üretmesiydi.

2022’de başka bir ekip, yaklaşık yüz milyon Android telefonda kullanılan bir TEE uygulamasında, anahtarları sarmak için kullanılan şifrelemenin hatalı kurulduğunu gösterdi. Bu hata, donanım destekli olduğu düşünülen anahtarların bazı koşullarda çıkarılmasına izin veriyordu; üretici açıkları güncellemelerle kapattı \[13\]. Bu örnek de TEE’nin donanım ayrımının sağlam, ama içinde çalışan yazılımın hatalı olabileceğini gösteriyor.

Bu iki olay güvenli donanımı gereksiz kılmaz, ama tek başına yetmediğini gösterir. Güvenli donanımın da #{strong[bağımsız olarak değerlendirilmesi]}, açık bulunduğunda #{strong[etkilenen anahtarların hızla geçersiz kılınabilmesi]} ve bir anahtarın hangi donanımda durduğunun belge veren kuruma #{strong[doğru söylenmesi]} gerekir. Avrupa’nın cüzdan mimarisi bu üç ihtiyacı sırasıyla sertifikasyonla, cüzdan biriminin iptaliyle ve anahtar kanıtıyla karşılar. Bu yazının geri kalanı bu üç mekanizmayı anlatıyor.

= Uzak Kasa: Sunucudaki Güvenli Donanım

== Telefon yetmezse

Bölüm 3.3’te gördüğümüz şart, yani PID anahtarının yüksek saldırı potansiyeline karşı sınanmış bir donanımda durması, telefonlar için kolay karşılanan bir şart değildir. Telefonların güvenli donanımları güçlüdür, ama hepsi Ortak Kriterler’in en sıkı düzeyinde değerlendirilmiş değildir. Üstelik bir ülkenin vatandaşları binlerce farklı telefon modeli kullanır; bir cüzdan sağlayıcının bunların her birinin güvenlik düzeyini tek tek kanıtlaması pratik değildir.

AB’nin cüzdan mimari çerçevesi (ARF), bu soruna tek bir cevap dayatmaz. ARF, gizli anahtarları koruyan donanıma #{strong[cüzdan güvenli kriptografik aygıtı]} (#{emph[Wallet Secure Cryptographic Device]}, #{strong[WSCD]}) adını verir ve onu kurcalamaya ve kopyalanmaya dayanıklı, kritik varlıkları koruyan ve güvenlik açısından hassas işlemleri yürüten bir aygıt olarak tanımlar \[14\]. Bu aygıtın içinde çalışan ve cüzdanla konuşan yazılıma da #{strong[cüzdan güvenli kriptografik uygulaması]} (#{emph[Wallet Secure Cryptographic Application]}, #{strong[WSCA]}) der. ARF’nin 3.0 sürümü dört WSCD mimarisi sayar ve cüzdan sağlayıcının bunlardan herhangi birini seçebileceğini söyler (Şekil 3).

#sekil(3, [ARF’ye göre dört WSCD mimarisi], "figures/a10/sekil-3.svg", yarim: false)

#{strong[Uzak WSCD.]} Anahtarlar, cüzdan sağlayıcının veri merkezindeki bir #{strong[donanım güvenlik modülünde]} (#{emph[hardware security module]}, #{strong[HSM]}) durur. HSM, bankaların ve sertifika otoritelerinin yıllardır kullandığı, kurcalamaya karşı korumalı, sertifikalı bir kriptografi cihazıdır. Telefon, anahtarı kendisi tutmaz; imza gerektiğinde ağ üzerinden HSM’e başvurur. ARF bu mimarinin genellikle telefonda yeterince güvenli donanım bulunmadığında ya da sağlayıcı böyle bir donanıma bağımlı olmak istemediğinde kullanıldığını söyler \[14\].

#{strong[Yerel harici WSCD.]} Kişiye bu iş için verilmiş bir akıllı kart ya da güvenlik anahtarı, telefona NFC ya da benzeri bir kısa mesafeli bağlantıyla bağlanır. ARF, mevcut kimlik kartlarının çoğunun bu işi yapamayacağını da not eder; kartın içinde bu amaçla yazılmış bir uygulama bulunmalıdır.

#{strong[Yerel dahili WSCD.]} Telefonun içindeki SIM, e-SIM ya da gömülü güvenli eleman kullanılır. WSCA burada genellikle güvenli elemana uzaktan yüklenen küçük bir Java Card uygulamasıdır. Bu yol, cüzdan sağlayıcının telefon üreticisi ya da mobil operatörle iş birliği yapmasını gerektirir.

#{strong[Yerel yerleşik WSCD.]} Telefona gömülü ve işletim sisteminin arayüzüyle erişilen güvenli donanım. Ayrı bir WSCA gerekmez; işletim sisteminin arayüzü bu rolü üstlenir. ARF burada bir ürün adı vermez. Bölüm 4’te anlattığımız donanımların bu rolü üstlenebilmesi, yüksek güvence düzeyine göre değerlendirilip değerlendirilmediğine bağlıdır.

ARF’ye göre hangi mimari seçilirse seçilsin, cüzdan sağlayıcı PID anahtarlarının yüksek güvence düzeyine yetecek bir WSCD’de durmasından sorumludur. ARF bir mimariyi anlatmanın, o mimarinin her uygulamasının sertifikasyonu geçeceği anlamına gelmediğini de açıkça yazar \[14\]. Ayrıca ARF, yüksek güvence düzeyi gerektirmeyen belgeler için WSCD dışında #{strong[anahtar deposu]} (#{emph[keystore]}) adını verdiği daha esnek bir katman tanımlar ve örnek olarak güvenli eleman, TPM, TEE, secure enclave ve uzak HSM’i sayar \[14\]. Bir etkinlik biletinin anahtarı böyle bir anahtar deposunda tutulabilir. PID anahtarı ise tutulamaz, çünkü ARF’ye göre PID anahtarları yüksek güvence düzeyinde yönetilmek zorundadır ve bu yalnızca WSCA ve WSCD ile mümkündür.

== Uzak anahtarı kim kullanabilir?

Uzak WSCD fikri ilk duyulduğunda akla gelen soru şudur: Anahtar bir sunucudaysa, o anahtar hâlâ "kişinin elinde" sayılır mı? Sunucuyu işleten sağlayıcı, kişinin yerine imza atamaz mı? Bu soru yerindedir ve uzak mimarinin bütün tasarımı bu soruya cevap vermek üzerine kuruludur.

Temel fikir, HSM’deki anahtarın #{strong[yalnızca kişinin telefonundan ve yalnızca kişinin doğrulamasıyla]} kullanılabilmesidir. Bunun için telefonda da bir anahtar bulunur; ama bu anahtar PID’e bağlı değildir, yalnızca telefonu HSM’e tanıtır. ARF bu yaklaşıma örnek olarak #{strong[bölünmüş anahtar]} (#{emph[split-key]}) mimarisini verir: Kişinin tarafındaki anahtar telefonun güvenli elemanında ya da anahtar deposunda durur, HSM tarafındaki anahtarla birlikte çalışır \[14\]. Kişi PIN’ini girer, telefon bu PIN’le ve kendi anahtarıyla bir istek imzalar, HSM isteği doğrular ve ancak bundan sonra PID anahtarıyla imza atar. PIN ise HSM tarafından ya da telefondaki güvenli donanım tarafından kontrol edilir ve belirli sayıda yanlış denemeden sonra kilitlenir.

#sekil(4, [Uzak WSCD ile bir imza: telefon, PIN ve HSM], "figures/a10/sekil-4.svg", yarim: false)

Bu tasarımda sağlayıcının elinde güçlü bir konum vardır ve bu konum iki biçimde sınırlanır. Birincisi teknik sınırlamadır: HSM erişim denetimi, kişinin doğrulaması olmadan anahtarın kullanılmasına izin vermeyecek biçimde kurulur ve ARF’ye göre sertifikasyon sırasında bu erişim denetimi de değerlendirilir \[14\]. İkincisi hukuki sınırlamadır: eIDAS 2.0, cüzdan sağlayıcının cüzdanın kullanımına dair bilgi toplamasını gereken en az düzeyle sınırlar (madde 5a(14)) \[4\]. Yine de uzak mimaride, kişinin güveninin bir kısmı telefondan sağlayıcıya geçer. Telefondaki güvenli donanımda bu güven donanım üreticisine, uzak mimaride ise cüzdan sağlayıcıya ve onun HSM’ine verilir.

#kutu("ornek", [Aynur’un iki seçeneği])[
Aynur’un telefonu birkaç yıllık, orta sınıf bir Android. Telefonda TEE var ama StrongBox yok. Cüzdan sağlayıcısı etkinleştirme sırasında bunu öğrenir. Sağlayıcı iki yol sunabilir. Birinci yolda PID anahtarı sağlayıcının HSM’inde tutulur; Aynur her kimlik gösterişinde PIN’ini girer, telefon isteği HSM’e iletir. İnternet bağlantısı gerekir, ama telefonun donanımı ne olursa olsun güvence düzeyi yüksek kalır. İkinci yolda Aynur’a NFC ile telefona dokundurulan bir kart verilir; PID anahtarı kartta durur. Bu yol internetsiz çalışır ama Aynur’un kartı yanında taşımasını gerektirir. Diploması ve etkinlik bileti ise yüksek güvence gerektirmediği için, her iki durumda da telefonun TEE’sindeki anahtarlara bağlanabilir.
]

== Uzak mimarinin artıları ve eksileri

Uzak mimarinin en büyük artısı #{strong[kapsayıcılıktır]}. Eski ya da ucuz bir telefonu olan kişi de yüksek güvence düzeyinde bir cüzdana sahip olabilir. Sağlayıcı da yüzlerce telefon modelinin güvenlik düzeyini tek tek kanıtlamak yerine, kendi HSM’ini bir kez sertifikalandırır. İkinci artısı #{strong[kayıp durumundaki kolaylıktır]}: Anahtar telefonda olmadığı için, telefon kaybolduğunda anahtar da kaybolmaz. Kişi yeni telefonundan kendini sağlayıcıya yeniden tanıtırsa, ARF’nin de belirttiği gibi, aynı HSM’deki anahtarlara yeniden erişebilir; anahtarın bir yere taşınmasına gerek kalmaz \[14\].

Eksileri de vardır. Birincisi #{strong[çevrimdışı kullanım]} zorlaşır. Dizinin dokuzuncu yazısında anlattığımız yüz yüze gösterimlerde, örneğin internetin olmadığı bir sınır kapısında, telefonun HSM’e ulaşması gerekir. İkincisi #{strong[merkezîleşme riskidir]}. Milyonlarca kişinin anahtarı tek bir veri merkezinde toplanır; bu merkez hem saldırganlar için cazip bir hedef, hem de arızalandığında milyonlarca kişinin aynı anda etkilendiği bir tekil hata noktası olur. Üçüncüsü #{strong[görünürlüktür]}. HSM’e yapılan her istek sağlayıcıya ulaşır. İçerik görünmese bile, isteklerin zamanı ve sıklığı bir iz bırakabilir. Bu iz, cüzdan sağlayıcının kişinin cüzdanı ne zaman kullandığını öğrenmesine yol açmamalıdır; bunu sağlamak tasarımın ve denetimin işidir.

= Telefon Gerçek mi? Cihaz ve Uygulama Kanıtı

== Yalan söyleyebilen bir uygulamaya nasıl güvenilir?

Bir belge veren kurumun gözünden bakalım. Karşısında bir cüzdan uygulaması var ve uygulama şunları söylüyor: "Ben resmî cüzdan uygulamasıyım, kodum değiştirilmedi, telefonum kilitli ve güncel, bana bağlayacağın anahtarı da güvenli donanımda ürettim." Bu cümlelerin hepsi, uygulamanın kendisi tarafından gönderilen veriler. Uygulama sahteyse aynı cümleleri aynı biçimde gönderebilir. Kurum, bu cümlelerin doğru olduğunu yalnızca uygulamaya bakarak anlayamaz.

Bu sorunun tek çıkışı, uygulamadan daha güvenilir #{strong[üçüncü bir tanığa]} başvurmaktır. Telefonda bu tanığın rolünü, işletim sistemini ve güvenli donanımı üreten platform şirketi üstlenir. Telefonun güvenli donanımına fabrikada ya da sonradan güvenli bir yolla, platform şirketinin imzaladığı bir #{strong[kanıt anahtarı]} yerleştirilir. Bu anahtar, telefonun durumu ve içinde üretilen anahtarlar hakkında imzalı ifadeler üretir. Kurum bu ifadeleri, platform şirketinin herkese açık kök sertifikasıyla doğrular. Sahte bir uygulama bu imzayı üretemez, çünkü kanıt anahtarına erişemez. Bu genel düzene #{strong[cihaz kanıtı]} (#{emph[device attestation]}) ya da #{strong[uygulama kanıtı]} (#{emph[app attestation]}) denir. Bu bölümde iki büyük mobil platformun sunduğu üç mekanizmayı inceliyoruz.

== Android anahtar kanıtı

Bölüm 4.3’teki teknik kutuda, Android’de anahtar üretirken bir "kanıt meydan okuması" (#{emph[attestation challenge]}) verilebildiğini görmüştük. Bu değer verildiğinde Keystore, ürettiği anahtarın açık yarısı için bir #{strong[X.509 sertifika zinciri]} döndürür. Zincirin en altındaki sertifika yeni anahtarı taşır ve güvenli donanımın içindeki kanıt anahtarıyla imzalanmıştır. Zincir, ara sertifikalar üzerinden Google’ın kök sertifikasına çıkar \[11\]. Android 7.0 ile gelen bu mekanizma, Android 8.0 ile birlikte çıkan cihazlarda zorunlu hâle geldi.

Asıl bilgi, en alttaki sertifikanın içindeki özel bir uzantıda durur. Bu uzantı, cihazın ve anahtarın durumunu anlatan bir veri yapısıdır.

#kutu("teknik", [Bir Android anahtar kanıtının içi])[
En alttaki sertifikanın #{raw("1.3.6.1.4.1.11129.2.1.17")} numaralı uzantısı çözüldüğünde şuna benzer bir yapı çıkar (alan adları standart, değerler örnektir ve sadeleştirilmiştir):

#kod("json", "{
  \"attestationSecurityLevel\": \"StrongBox\",
  \"keyMintSecurityLevel\": \"StrongBox\",
  \"attestationChallenge\": \"c2VydmVyLW5vbmNlLTQ3MTE…\",
  \"hardwareEnforced\": {
    \"purpose\": [\"SIGN\"],
    \"algorithm\": \"EC\",
    \"ecCurve\": \"P_256\",
    \"noAuthRequired\": false,
    \"userAuthType\": [\"FINGERPRINT\", \"PASSWORD\"],
    \"rootOfTrust\": {
      \"deviceLocked\": true,
      \"verifiedBootState\": \"Verified\"
    },
    \"osPatchLevel\": 202609
  },
  \"softwareEnforced\": {
    \"attestationApplicationId\": {
      \"packageName\": \"eu.ornek.cuzdan\",
      \"signatureDigests\": [\"9a1f…\"]
    }
  }
}", baslik: "Örnek: çözülmüş bir Android anahtar kanıtı uzantısı")

- #{raw("attestationSecurityLevel")}: kanıtı imzalayan ortamın düzeyi. Üç değer alabilir: #{raw("Software")}, #{raw("TrustedEnvironment")} (TEE) ve #{raw("StrongBox")}.
- #{raw("attestationChallenge")}: sunucunun gönderdiği rastgele değer. Eski bir kanıtın yeniden kullanılmasını engeller.
- #{raw("hardwareEnforced")}: güvenli donanımın kendisinin uyguladığı kurallar. Anahtarın yalnızca imza için kullanılabildiği, P-256 eğrisinde olduğu ve kullanıcı doğrulaması olmadan kullanılamayacağı burada yazar.
- #{raw("rootOfTrust")}: telefonun önyükleyicisinin kilitli olup olmadığı ve işletim sisteminin doğrulanmış bir önyüklemeyle açılıp açılmadığı. #{raw("verifiedBootState")} dört değer alabilir: #{raw("Verified")}, #{raw("SelfSigned")}, #{raw("Unverified")} ve #{raw("Failed")}.
- #{raw("attestationApplicationId")}: anahtarı isteyen uygulamanın paket adı ve imza özeti. Sunucu, bu özeti kendi resmî uygulamasının imza özetiyle karşılaştırarak anahtarın kendi uygulaması için üretildiğini anlar.

Sunucu bu alanların hepsini sırayla kontrol eder:

#adimlar((
  ("Sunucu", [#{strong[Zincir.]} Sertifika zincirinin Google kökünde bittiğini doğrular.], $"yaprak" -> "ara" -> "Google kökü"$),
  ("Sunucu", [#{strong[İptal.]} Ara sertifikaların Google’ın iptal listesinde olmadığını kontrol eder.], $"ara" in.not "iptal listesi"$),
  ("Sunucu", [#{strong[Tazelik.]} Meydan okumanın kendi gönderdiği değer olduğunu kontrol eder.], $"attestationChallenge" = c$),
  ("Sunucu", [#{strong[Düzey.]} Güvenlik düzeyinin beklediği düzey olduğunu kontrol eder.], $"SecurityLevel" = "StrongBox"$),
  ("Sunucu", [#{strong[Uygulama.]} Uygulama imza özetini kendi resmî uygulamasınınkiyle karşılaştırır.], $"signatureDigests" in.rev h_"resmî"$),
))
]

Bu mekanizmanın güveni tamamen kanıt anahtarlarının gizli kalmasına dayanır. Bir cihazın kanıt anahtarı sızarsa, o anahtarla istenen her şeyi söyleyen sahte kanıtlar üretilebilir. Google bu yüzden sızan ya da ele geçirilen kanıt anahtarlarını bir iptal listesinde yayımlar; sosyal medyada paylaşılmış anahtarların bulunması da iptal gerekçeleri arasında sayılır \[11\]. Android 12’den itibaren gelen #{strong[uzaktan anahtar sağlama]} (#{emph[remote key provisioning]}) ile kanıt anahtarları fabrikada kalıcı olarak yerleştirilmek yerine kısa ömürlü sertifikalarla cihaza sonradan sağlanmaya başlandı; bu, sızan bir anahtarın etkisini sınırlar. Google ayrıca 1 Şubat 2026’dan itibaren kanıt zincirlerini yeni bir kök sertifikayla imzalamaya başladı \[11\]. Bu ayrıntı, cihaz kanıtını doğrulayan her sunucunun kök sertifika listesini güncel tutması gerektiğini hatırlatıyor.

== Apple App Attest

Apple, 2020’de iOS 14 ile birlikte #{strong[App Attest]} adlı bir hizmet sundu \[16\]. App Attest’in amacı Android’in anahtar kanıtından biraz farklıdır. Asıl olarak #{strong[uygulamanın kendisinin]} gerçek olduğunu kanıtlamaya odaklanır: Sunucuyla konuşan şeyin, App Store’dan indirilmiş, değiştirilmemiş resmî uygulama olduğunu ve gerçek bir Apple cihazında çalıştığını.

Süreç beş adımda işler. Tabloda $c$ sunucunun meydan okumasıdır:

#adimlar((
  ("Uygulama", [#{strong[Anahtar.]} App Attest’ten Secure Enclave’de yeni bir anahtar üretmesini ister.], $(d, Q) <- "Secure Enclave"$),
  ("Sunucu → Uygulama", [#{strong[Meydan okuma.]} Uygulamaya rastgele bir değer gönderir.], $c <- "rastgele"$),
  ("Uygulama → Apple", [#{strong[Kanıt isteği.]} Meydan okumanın özetiyle birlikte anahtar için kanıt ister.], $"SHA-256"(c)$),
  ("Apple → Uygulama", [#{strong[Kanıt nesnesi.]} "Bu anahtar şu uygulamanın şu cihazdaki örneğine ait" diyen, CBOR biçiminde, App Attest kök sertifikasına uzanan zincirli bir nesne imzalar.], $"Apple imzası"(Q, "uygulama", dots)$),
  ("Sunucu", [#{strong[Doğrulama.]} Zinciri doğrular, sertifikadaki özel alanda (#{raw("1.2.840.113635.100.8.2")}) kendi meydan okumasının özetini bulur ve anahtarın kendi uygulamasına bağlı olduğunu kontrol eder \[16\].], $"alan" attach(=, t: ?) "nonce"$),
))

Son adımdaki karşılaştırmada sunucu, sertifikadaki değeri kendisi şöyle yeniden hesaplar. Kanıtın içindeki doğrulayıcı verisine (#{emph[authenticator data]}) $A$ dersek:

#formul[$ "nonce" = "SHA-256"(A || "SHA-256"(c)) $]

Değer tutarsa kanıt bu meydan okuma için, bu anda üretilmiştir.

İlk kanıttan sonra uygulama, sunucuya gönderdiği önemli istekleri bu anahtarla imzalar. Apple bunlara #{strong[onay]} (#{emph[assertion]}) der. Her onayın içinde, her kullanımda bir artan bir sayaç bulunur. Sayaç kanıt anında sıfırdır. Sunucu sayacın hep arttığını ($n_k > n_(k-1)$) kontrol ederek eski bir onayın yeniden gönderilmesini fark eder. Kanıtla birlikte gelen bir #{strong[makbuz]} (#{emph[receipt]}) ise sunucunun daha sonra Apple’dan o cihaz için kabaca bir dolandırıcılık riski ölçüsü istemesine izin verir.

Apple’ın kendi belgeleri bu mekanizmanın sınırını da açıkça yazar. App Attest tek başına her saldırıyı durdurmaz; örneğin ele geçirilmiş tek bir cihaz, değiştirilmiş birçok uygulama kopyasına onay üretmek için kullanılabilir \[16\]. Kimlik cüzdanı açısından daha önemli bir fark var. Apple’ın geliştirici arayüzlerinde, Android’deki gibi uygulamanın Secure Enclave’de ürettiği her genel amaçlı anahtar için ayrı bir donanım kanıtı veren bir mekanizma bulunmaz. App Attest’in anahtarı yalnızca uygulamayı kanıtlamak ve onay üretmek için kullanılır. Bu yüzden iOS’ta cüzdan sağlayıcı, belge anahtarlarının Secure Enclave’de üretildiğini doğrudan bir donanım imzasından öğrenemez. Bunu, App Attest ile gerçekliği kanıtlanmış uygulamanın bütünlüğüne dayanarak kabul eder. İki platform arasındaki bu fark, ilerleyen bölümlerde anlatacağımız anahtar kanıtının neden platformdan bağımsız, cüzdan sağlayıcının imzaladığı bir nesne olarak tasarlandığını da açıklar.

== Google Play Integrity

Android’de anahtar kanıtının yanında ikinci bir hizmet daha vardır: #{strong[Play Integrity]}. Anahtar kanıtı tek bir anahtar hakkında konuşur; Play Integrity ise uygulamanın ve cihazın genel durumu hakkında bir #{strong[karar]} (#{emph[verdict]}) verir. Uygulama Google Play hizmetlerinden bir bütünlük belirteci ister, belirteci kendi sunucusuna iletir, sunucu belirteci Google’ın sunucusunda ya da kendi anahtarıyla çözer ve içindeki kararları okur \[17\].

#kutu("teknik", [Play Integrity kararının içi])[
Çözülmüş bir bütünlük belirteci şuna benzer (alanlar Google’ın belgesindeki adlarla, değerler örnektir):

#kod("json", "{
  \"requestDetails\": {
    \"requestPackageName\": \"eu.ornek.cuzdan\",
    \"requestHash\": \"2cp24z…\",
    \"timestampMillis\": \"1798012800000\"
  },
  \"appIntegrity\": {
    \"appRecognitionVerdict\": \"PLAY_RECOGNIZED\",
    \"packageName\": \"eu.ornek.cuzdan\",
    \"certificateSha256Digest\": [\"6a6a14…\"],
    \"versionCode\": \"42\"
  },
  \"deviceIntegrity\": {
    \"deviceRecognitionVerdict\": [\"MEETS_DEVICE_INTEGRITY\", \"MEETS_STRONG_INTEGRITY\"]
  },
  \"accountDetails\": {
    \"appLicensingVerdict\": \"LICENSED\"
  }
}", baslik: "Örnek: çözülmüş bir Play Integrity belirteci")

- #{raw("appRecognitionVerdict")}: #{raw("PLAY_RECOGNIZED")} uygulamanın Google Play’in tanıdığı, değiştirilmemiş sürüm olduğunu söyler. #{raw("UNRECOGNIZED_VERSION")} tanınmayan bir sürümü, #{raw("UNEVALUATED")} değerlendirme yapılamadığını gösterir.
- #{raw("deviceRecognitionVerdict")}: #{raw("MEETS_DEVICE_INTEGRITY")} cihazın Google Play hizmetlerinin bulunduğu gerçek bir Android cihaz olduğunu söyler; Android 13 ve sonrasında bu karar, önyükleyicinin kilitli olduğuna dair donanım destekli bir kanıt ister. #{raw("MEETS_STRONG_INTEGRITY")} buna ek olarak, Android 13 ve sonrasında, son bir yıl içinde güvenlik güncellemesi alınmış olmasını ister. #{raw("MEETS_BASIC_INTEGRITY")} daha gevşek bir düzeydir.
- #{raw("requestHash")}: uygulamanın isteğe bağladığı değer; sunucunun gönderdiği meydan okumayla eşleşmelidir.
]

Google bu kararları zaman içinde sıkılaştırdı. Daha önce kullanılan SafetyNet hizmeti 31 Ocak 2025’te tamamen kapatıldı; Play Integrity’nin kararları da Mayıs 2025’ten itibaren Android 13 ve sonrasında donanım destekli sinyallere dayanmaya başladı \[17\]. Bu değişiklikler kararları daha güvenilir kıldı, ama güncelleme almayan eski telefonlar ve Google’ın onaylamadığı işletim sistemi sürümleri en güçlü kararları alamaz hâle geldi. Bu, Bölüm 11’de döneceğimiz kapsayıcılık sorusunun bir parçasıdır.

== Cihaz kanıtı neyi kanıtlamaz?

Bu mekanizmaların gücünü abartmamak gerekir. Cihaz kanıtı bir #{strong[anlık görüntüdür]}: Kanıtın alındığı anda cihazın ve uygulamanın durumu hakkında bilgi verir. Ertesi gün telefona kurulan kötü amaçlı bir uygulamayı ya da işletim sisteminde yeni bulunan bir açığı bilmez. Bu yüzden cüzdan sağlayıcılar kanıtı etkinleştirmeden sonra da düzenli aralıklarla yeniden ister.

Cihaz kanıtı #{strong[kişinin kim olduğunu]} da söylemez. Gerçek bir telefonda çalışan gerçek bir uygulama, telefonu çalan kişinin elinde de gerçektir. Kişinin varlığını kanıtlamak kullanıcı doğrulamasının işidir (Bölüm 8).

Son olarak, cihaz kanıtının #{strong[bir gizlilik bedeli]} vardır. Kanıtı veren platform şirketi, en azından bazı durumlarda, hangi uygulamanın hangi cihazda kanıt istediğini görür. App Attest’te ilk kanıt Apple’ın sunucularından geçer; Play Integrity’de karar Google’ın hizmetlerinden gelir. Bir kimlik cüzdanında bu, platform şirketinin kişinin cüzdan kullandığını ve kabaca ne sıklıkta kullandığını öğrenmesi anlamına gelebilir. Avrupa’nın mimarisi bu sorunu, cihaz kanıtını cüzdan sağlayıcının kendi arka ucunda tüketip, belge veren kurumlara platformdan bağımsız kendi kanıtını vererek sınırlamaya çalışır. Bir sonraki bölümün konusu bu kanıttır.

= Avrupa’nın Cevabı: Cüzdan Birimi Kanıtı

== Neden bir ara katman?

Bölüm 6’daki mekanizmaların her biri bir platforma aittir. Android anahtar kanıtı Google’ın kökünde, App Attest Apple’ın kökünde biter. Bir PID sağlayıcının, yani bir ülkenin kimlik bilgisini veren kurumun, her platformun kanıt biçimini ayrı ayrı anlaması, her birinin kök sertifikalarını izlemesi ve her birinin sınırlarını ayrı ayrı değerlendirmesi pratik olmaz. Üstelik uzak HSM ya da harici akıllı kart kullanan bir cüzdanda platformun kanıtı zaten anahtarın nerede durduğunu söylemez.

Avrupa Birliği bu yüzden araya bir katman koydu. Telefonun ve uygulamanın gerçekliğini platform kanıtlarıyla #{strong[cüzdan sağlayıcı]} doğrular; bu iş cüzdan biriminin etkinleştirilmesi sırasında ve sonrasında düzenli olarak yapılır. Sonra cüzdan sağlayıcı, belge veren kurumlara kendi imzasıyla, ortak bir biçimde, #{strong[cüzdan birimi kanıtı]} (#{emph[wallet unit attestation]}, #{strong[WUA]}) verir. Belge veren kurum yalnızca bu kanıtı doğrular. Kanıtı imzalayan cüzdan sağlayıcının anahtarını da, üye devletlerin bildirdiği cüzdan sağlayıcıları listesinden öğrenir. Böylece güven zinciri şöyle kurulur: Kurum listeye güvenir, liste cüzdan sağlayıcıyı tanır, cüzdan sağlayıcı da cihazı ve uygulamayı doğrulamıştır.

#formul[$ "kurum" -> "cüzdan sağlayıcılar listesi" -> "cüzdan sağlayıcı" -> "WUA" -> "cihaz ve uygulama" $]

Bu düzen 2024\/2979 sayılı Uygulama Tüzüğü’nde hukuki bir yükümlülüktür. Tüzüğe göre cüzdan sağlayıcılar her cüzdan birimi için en az bir cüzdan birimi kanıtı imzalar ve bu imzanın sertifikası, güven listesinde yer alan bir sertifikaya dayanır (madde 3(2)). Kanıt, gizli anahtarı bir WSCD tarafından korunan açık anahtarlar içerir (madde 6(2)) \[18\]. Temmuz 2026’da yayımlanan 2026\/1731 sayılı Uygulama Tüzüğü ise bu kanıtın teknik biçimini netleştirdi. Bu tüzüğün 2024\/2979’a eklediği Ek Ib’ye göre bir cüzdan birimi kanıtı #{strong[bir ya da daha fazla cüzdan örneği kanıtından]} (WIA) ve #{strong[bir ya da daha fazla anahtar kanıtından]} (KA) oluşur \[19\].

#sekil(5, [Cüzdan birimi kanıtı: belge verilirken WIA ve anahtar kanıtı], "figures/a10/sekil-5.svg", yarim: false)

== Cüzdan örneği kanıtı (WIA)

WIA, cüzdan uygulamasının kendisini tanıtan kısa ömürlü bir belgedir. İçinde cüzdan çözümünün adı ve sürümü, sertifikasyon bilgisi, bir açık anahtar ve bir iptal başvurusu bulunur. Biçimi OpenID4VCI 1.0’ın Ek E’sinde tanımlanan cüzdan kanıtıdır; bu biçim de IETF’te geliştirilen "kanıta dayalı istemci kimlik doğrulaması" taslağına dayanır \[20, 21\]. 2026\/1731’e göre WIA’nın geçerlilik süresi #{strong[24 saatten kısa]} olmalıdır. Kısa ömür, kanıtın yakın zamanda yapılmış bir bütünlük kontrolünü yansıtmasını sağlar \[19\].

Cüzdan, belge alırken WIA’yı yetkilendirme sunucusuna, WIA’daki anahtarla imzaladığı bir sahiplik kanıtıyla birlikte gönderir. Tüzüğe göre aynı WIA yalnızca bir yetkilendirme sunucusuna gönderilir ve bir WIA en fazla bir belge alma sürecinde kullanılır. Bunun nedeni gizliliktir. Aynı WIA iki farklı kuruma gitseydi, iki kurum ellerindeki kanıtları karşılaştırarak aynı cüzdanla konuştuklarını anlayabilirdi.

WIA’nın iptal durumu, IETF’in Token Status List yöntemiyle tutulur. Dizinin yedinci yazısında anlattığımız bu yöntemde her kanıt, büyük bir bit dizisinde bir konumu gösterir; o konumdaki bit iptal edilince kanıt geçersiz sayılır \[22\]. 2026\/1731 burada ince bir ayrım yapar. WIA’nın kendi geçerlilik süresi bir günden kısadır; ama içindeki durum başvurusu, cüzdan sağlayıcının o cüzdan örneğinin iptal durumunu ne zamana kadar yayımlamayı taahhüt ettiğini ayrıca söyler. Cüzdan sağlayıcı, kurumlara sunulan kanıtlarda bu sürenin her zaman en az #{strong[31 gün]} ileride olmasını sağlamakla yükümlüdür \[19\].

== Anahtar kanıtı (KA)

Anahtar kanıtı, Bölüm 2.2’deki üçüncü sorunun cevabıdır: anahtar gerçekten iddia edildiği yerde mi? Cüzdan sağlayıcı, belge anahtarlarının hangi WSCD ya da anahtar deposunda üretildiğini doğruladıktan sonra, bu anahtarların açık yarılarını ve donanımın özelliklerini bir belgeye yazıp imzalar. ARF’ye göre anahtar kanıtının üç işi vardır: anahtarları koruyan donanımın sertifikasyonunu ve özelliklerini anlatmak, bu donanımda üretilmiş açık anahtarları taşımak ve donanımın iptal durumuna bir başvuru vermek \[14\].

#kutu("teknik", [Bir anahtar kanıtının içi])[
OpenID4VCI 1.0 Ek D’ye göre anahtar kanıtı bir JWT’dir. Başlığındaki #{raw("typ")} değeri #{raw("key-attestation+jwt")}’dir ve #{raw("x5c")} alanında cüzdan sağlayıcının sertifika zinciri bulunur. İçeriği sadeleştirilmiş olarak şöyledir (değerler örnektir):

#kod("json", "{
  \"iat\": 1798012800,
  \"exp\": 1798016400,
  \"attested_keys\": [
    { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"TCAER19Zvu3…\", \"y\": \"ZxjiWWbZMQG…\" },
    { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"q4Lw0bH2yZk…\", \"y\": \"c9T1vG4mNfo…\" }
  ],
  \"key_storage\": [\"iso_18045_high\"],
  \"user_authentication\": [\"iso_18045_high\"],
  \"certification\": \"https://saglayici.ornek/sertifikasyon/wscd-1\",
  \"key_storage_status\": {
    \"status\": { \"status_list\": { \"idx\": 4127, \"uri\": \"https://saglayici.ornek/durum/ka/3\" } },
    \"exp\": 1801296000
  },
  \"nonce\": \"wKI4LT17ac15ES9bw8ac4\"
}", baslik: "Örnek: bir anahtar kanıtı JWT'sinin içeriği")

- #{raw("attested_keys")}: cüzdan sağlayıcının, gizli yarılarının belirtilen donanımda üretilip saklandığını onayladığı açık anahtarlar. Kurum, vereceği belgeleri bu anahtarlara bağlar. Birden çok anahtar, aynı belgenin birbirine bağlanamayan kopyaları (dizinin beşinci yazısındaki toplu kopyalar) içindir.
- #{raw("key_storage")} ve #{raw("user_authentication")}: anahtarın deposunun ve kullanıcı doğrulamasının hangi saldırı potansiyeline dayandığı. Değerler ISO\/IEC 18045’in dört düzeyinden türetilir. 2026\/1731’e göre kanıt bir WSCD’den söz ediyorsa iki değer de #{raw("iso_18045_high")} olmalıdır.
- #{raw("certification")}: donanımın sertifikasyonu hakkında bilgi veren adres (hangi şema, hangi koruma profili, hangi düzey).
- #{raw("key_storage_status")}: donanımın iptal durumunun tutulduğu durum listesi ve bu durumun ne zamana kadar yayımlanacağı.
- #{raw("nonce")}: kurumun verdiği tek kullanımlık değer; kanıtın bu belge isteği için üretildiğini gösterir.

Örnekteki zaman alanlarından iki süre çıkar. Kanıtın kendisi kısa ömürlüdür; donanımın durum bilgisi ise çok daha uzun süre yayımlanacaktır:

#formul[$ "exp" - "iat" &= 1798016400 - 1798012800 = 3600 "saniye" = 1 "saat" \
"durum exp" - "iat" &= 1801296000 - 1798012800 = 3283200 "saniye" = 38 "gün" $]
]

2026\/1731 anahtar kanıtının kullanımına sıkı kurallar koyar \[19\]. Bir açık anahtar en fazla bir anahtar kanıtında yer alır ve bir anahtar kanıtı en fazla bir belge alma sürecinde kullanılır. PID sağlayıcı, PID’i yalnızca bir WSCD’den söz eden bir anahtar kanıtından gelen açık anahtara bağlayabilir. Kanıtın imzası, cüzdan sağlayıcılar listesinde yer alan bir güven çapasına kadar doğrulanmalıdır. ARF ayrıca anahtar kanıtlarının ve WIA’ların yalnızca belge veren kurumlara gösterildiğini, doğrulayanlara hiç gösterilmediğini vurgular \[14\]. Bir kafede yaşını gösteren Aynur’un telefon modeli ya da cüzdan sürümü, kafenin işi değildir.

== İptal zinciri

WIA ve anahtar kanıtının iptal durumlarının neden bu kadar ayrıntılı düzenlendiğini anlamak için bir zincir düşünmek gerekir. PID, cüzdan biriminin güvenilir olduğu varsayımıyla verilmiştir. Cüzdan birimi güvenilirliğini yitirirse, örneğin telefon çalınır ya da cüzdan sürümünde bir açık bulunursa, PID’in de geçersiz kılınması gerekir. 2026\/1731 bunu açık bir kurala bağlar: Geçerlilik süresi 24 saati aşan bir PID’i veren sağlayıcı, belge alınırken aldığı WIA’nın ve anahtar kanıtının iptal durumunu PID geçerli olduğu sürece #{strong[en az 24 saatte bir]} kontrol eder; ikisinden biri iptal edilmişse PID’i iptal eder \[19\]. Ayrıca PID’in teknik geçerlilik süresi, WIA’daki ve anahtar kanıtındaki iptal yayımlama sürelerinden önce bitmelidir. Böylece PID sağlayıcı, cüzdan sağlayıcının artık yayımlamadığı bir iptal bilgisine bağımlı kalmaz.

İptal listelerinin kendisi de bir gizlilik riskidir. Bir listede yalnızca birkaç yüz kayıt varsa, bir kurum hangi bitin kime ait olduğunu tahmin edebilir. Bu yüzden 2026\/1731, WIA durum listelerinin mümkün olan her durumda en az #{strong[10\.000]} kanıtı kapsamasını ister \[19\]. Anahtar kanıtı için de iki seçenek tanır. Birinci seçenekte aynı türdeki donanımların hepsi aynı bit konumunu paylaşır; bir donanım türünde açık bulunursa tek bir bit, o türü kullanan bütün cüzdanlardaki anahtar kanıtlarını geçersiz kılar. İkinci seçenekte her cüzdan biriminin donanımına ayrı bir konum verilir. Birinci seçenek kişiye dair hiçbir iz bırakmaz ama yalnızca toplu iptale izin verir; ikincisi tek tek iptale izin verir ama daha fazla dikkat ister.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Belge veren kurum telefonla ya da platform şirketiyle doğrudan konuşmaz. Telefonun ve uygulamanın gerçekliğini cüzdan sağlayıcı doğrular; kurum, cüzdan sağlayıcının imzaladığı iki kanıta bakar. WIA uygulamanın tanınmış ve iptal edilmemiş olduğunu, anahtar kanıtı da anahtarların hangi donanımda durduğunu söyler. İkisi de kısa ömürlüdür ya da iptal edilebilir, ikisi de yalnızca belge veren kurumlara gösterilir ve iptal edildiklerinde PID de iptal edilir.
]

= Kişi Orada mı? PIN ve Biyometri

== İki kat kullanıcı doğrulaması

Güvenli donanım anahtarın kopyalanmasını engeller, cihaz ve cüzdan kanıtı da uygulamanın gerçek olduğunu gösterir. Ama ikisi de telefonu elinde tutan kişinin Aynur olup olmadığını söylemez. Bu, #{strong[kullanıcı doğrulamanın]} işidir.

2024\/2979 sayılı Uygulama Tüzüğü bu konuda iki kural koyar. Cüzdan birimi, kullanıcıyı doğrulamadan, kullanıcı doğrulamanın kendisi dışında hiçbir cüzdan işlevini yerine getirmez (madde 3(1)). WSCA da kritik varlıklarla, yani anahtarlarla yapılan kriptografik işlemleri yalnızca kullanıcıyı başarıyla doğruladıktan sonra yapar (madde 5(1)(a)) \[18\]. ARF bu kuralları iki katlı bir düzenle uygular (Şekil 6) \[14\].

#sekil(6, [İki kat kullanıcı doğrulaması: cüzdanı açmak ve anahtarı kullanmak], "figures/a10/sekil-6.svg", yarim: false)

Birinci kat #{strong[işletim sistemi düzeyindeki doğrulamadır]}. Cüzdan etkinleştirilirken telefonun kilidi kapalıysa cüzdan onu açmayı zorunlu tutar. ARF bu doğrulamanın çok faktörlü olmasını ister: biri cihaza sahip olmak, öteki bir bilgi (PIN, şifre) ya da bir beden özelliği (parmak izi, yüz). Kişi isterse buna cüzdana özel bir PIN de ekleyebilir. Bu kat, cüzdan her açıldığında çalışır ve belgelere, işlem kaydına, yüksek güvence gerektirmeyen belgelere erişimi korur.

İkinci kat #{strong[WSCA ya da WSCD düzeyindeki doğrulamadır]}. PID verilirken, gösterilirken ya da silinirken, yani PID anahtarı her kullanıldığında, güvenli donanımın kendisi kişiyi bir kez daha doğrular. Bir kurum kendi belgesinin anahtarının da WSCD’de tutulmasını istemişse aynı kural o belge için de geçerlidir. İkinci katın önemi, iki katın farklı yerlerde uygulanmasından gelir. Birinci kat işletim sistemi tarafından uygulanır ve işletim sistemi ele geçirilirse aşılabilir. İkinci kat ise anahtarın durduğu donanımın içinde uygulanır. Saldırgan işletim sistemini tamamen ele geçirse bile, güvenli donanım doğrulama olmadan imza atmaz.

== PIN: kısa bir sayı neden yeter?

Altı haneli bir PIN ilk bakışta zayıf görünür. Bir milyon olasılık bir bilgisayar için hiçbir şeydir; sıradan bir dizüstü bilgisayar bir milyon PIN’in özetini bir saniyeden kısa sürede hesaplayabilir. Ama bu hesap yalnızca saldırganın PIN’i kendi bilgisayarında, istediği kadar deneyebildiği durumda geçerlidir. PIN’i güvenli donanım kontrol ediyorsa durum tamamen değişir.

#kutu("teknik", [Deneme sayacının hesabı])[
Altı haneli bir PIN’de her hane on rakamdan biridir; olası PIN sayısı $N$ şöyle bulunur:

#formul[$ N = 10^6 = 1.000.000 $]

PIN’i güvenli donanım kontrol ediyor ve $k = 5$ yanlış denemeden sonra anahtarı kilitliyorsa, telefonu ele geçiren bir saldırgan en fazla beş farklı PIN deneyebilir. Rastgele tahminle PIN’i bulma olasılığı:

#formul[$ P &lt.eq k / N = 5 / (1.000.000) \
  &= "0,000005" = 1 / 200.000 $]

Yani iki yüz binde bir, yüzde olarak 0,0005. Saldırgan kişinin doğum tarihi gibi tahmin edilebilir PIN’leri önce denese bile, yalnızca beş hakkı vardır.

PIN uygulamanın içinde kontrol edilseydi, örneğin uygulama PIN’in özetini telefonun belleğinde saklasaydı, saldırgan bu özeti kopyalayıp kendi bilgisayarında bir milyon olasılığın hepsini denerdi. Dizinin ilk yazısında anlattığımız yavaş özet fonksiyonları bile bu kadar küçük bir alanı korumaya yetmez. Bu yüzden PIN’in kontrolü ve yanlış deneme sayacı, anahtarla aynı güvenli donanımın içinde durmalıdır. Uzak WSCD’de ise sayaç HSM tarafında tutulur ve PIN’den türetilen bir anahtarla doğrulama yapılır; Almanya’nın cüzdan mimarisi belgeleri bu yaklaşımı ayrıntılı anlatır \[23\].
]

== Biyometri: yüzünüz telefondan çıkmaz

Parmak izi ya da yüz tanıma ile doğrulama sık yanlış anlaşılır. Birçok kişi, yüzünün ya da parmak izinin bir yere gönderildiğini ve orada kontrol edildiğini düşünür. Telefonlardaki biyometrik doğrulamada durum böyle değildir. Biyometrik şablon, yani parmak izinin ya da yüzün matematiksel özeti, telefonun güvenli alanında saklanır ve orada karşılaştırılır. Karşılaştırmanın sonucu yalnızca "eşleşti" ya da "eşleşmedi"dir. Eşleşme olursa, güvenli alan o biyometriye bağlı anahtarın kullanılmasına izin verir. Yani biyometri bir kimlik bilgisi olarak paylaşılmaz; yalnızca telefondaki bir kilidi açar. Cüzdan sağlayıcı da belge veren kurum da kişinin yüzünü görmez.

Biyometrik doğrulamanın gücü bir olasılıkla ifade edilir. Apple’ın güvenlik kılavuzuna göre rastgele bir kişinin Face ID ile bir iPhone’u açabilme olasılığı milyonda birden azdır ($P < 1 / (1.000.000)$); Touch ID için bu oran elli binde birden azdır ($P < 1 / 50.000$). Apple, Face ID’de ikizler, birbirine çok benzeyen kardeşler ve 13 yaşından küçük çocuklar için yanlış eşleşme olasılığının daha yüksek olduğunu da not eder \[9\]. Biyometrinin ikinci zayıf noktası #{strong[sunum saldırılarıdır]}: sahte bir parmak izi kalıbı, bir fotoğraf ya da bir maske. Bu saldırıları tespit etmenin yöntemleri ve sınama biçimleri ISO\/IEC 30107 standart dizisinde tanımlanır \[15\]. Biyometrinin üçüncü özelliği en tartışmalı olanıdır. Bir PIN değiştirilebilir, ama bir parmak değiştirilemez. Bu yüzden biyometri genellikle PIN’le birlikte, PIN’in yerine geçen bir kolaylık olarak kullanılır; belirli sayıda başarısız denemeden sonra ya da telefon yeniden başlatıldıktan sonra PIN istenir.

#kutu("ornek", [Aynur bir bankada])[
Aynur, İstanbul’da bir banka hesabı açmak için bankanın uygulamasında "cüzdanla kimlik doğrula" düğmesine basar. Cüzdan açılır; telefon zaten kilidi açık olduğu için birinci kat sorun çıkarmaz. Cüzdan, bankanın ad, soyad, doğum tarihi ve uyruk istediğini gösterir ve Aynur’dan onay ister. Aynur onay düğmesine bastığında cüzdan bir kez daha yüz tanıma ister. Bu ikinci doğrulama güvenli donanımın içinde yapılır ve PID anahtarının bankanın gönderdiği meydan okumayı imzalamasına izin verir. Banka yalnızca imzalı yanıtı görür. Aynur’un yüzü telefondan hiç çıkmamıştır.
]

== Zorlama, paylaşım ve erişilebilirlik

Kullanıcı doğrulamanın çözemediği durumlar da vardır. Bir kişi zorla telefonunu açtırılabilir. Bir aile tek bir telefonu paylaşıyor olabilir ve çocuk annesinin PIN’ini biliyor olabilir. Bunlar teknik bir açıktan çok toplumsal gerçeklerdir ve cüzdanın bunlara karşı yapabilecekleri sınırlıdır. eIDAS 2.0, cüzdanın bütün işlemleri ortak bir panelde gösteren bir kayıt tutmasını ve kişinin bir doğrulayanı bu panelden veri koruma otoritesine bildirebilmesini ister (madde 5a(4)(d)) \[4\]. Bu kayıt, en azından kişinin sonradan ne olduğunu görmesini sağlar.

Erişilebilirlik de ayrı bir sorudur. Parmak izi okunamayan, yüz tanımanın iyi çalışmadığı ya da PIN’i hatırlamakta zorlanan kişiler vardır. eIDAS 2.0 cüzdanın engelli kişiler için erişilebilir olmasını ister (madde 5a(21)) \[4\]. Güvenlik tasarımı, bu kişileri cüzdanın dışında bırakmayacak seçenekler de sunmalıdır.

= Kayıp, Yedek ve Taşıma

== Vapurdaki gecenin devamı

Girişteki hikâyeye dönelim. Aynur iskelede telefonunun olmadığını fark etti. Şimdi ne yapacak ve sistem ne yapacak?

İlk iyi haber, telefonu bulan kişinin işinin zor olmasıdır. Telefon kilitlidir. Kilit bir şekilde aşılsa bile cüzdan ayrıca doğrulama ister. PID’i göstermek için güvenli donanımın içindeki ikinci doğrulama da geçilmelidir ve PIN’i beş kez yanlış girmek anahtarı kilitler. Anahtarlar kopyalanamadığı için, telefonu bulan kişinin bunları başka bir cihaza taşıması da mümkün değildir.

Yine de Aynur’un kaybı cüzdan sağlayıcısına bildirmesi gerekir. 2024\/2979 sayılı Uygulama Tüzüğü, cüzdan sağlayıcıların kişiyi #{strong[cüzdan biriminden bağımsız]} yollarla tanıyabilmesini ve kişinin bu yollarla cüzdan biriminin iptalini isteyebilmesini şart koşar (madde 6(3)(b) ve (c)) \[18\]. Telefon kaybolduğuna göre bu yol, telefonun kendisi olamaz. ARF bunun için cüzdan sağlayıcıda bir kullanıcı hesabı açılmasını öngörür; bu hesap gerçek kimlik bilgisi gerektirmez, örneğin yalnızca bir e-posta adresiyle de açılabilir \[14\]. Aynur bir arkadaşının telefonundan cüzdan sağlayıcının sayfasına girer, kendini etkinleştirme sırasında kurduğu yöntemle tanıtır ve "telefonum kayboldu" der.

Bundan sonrası bir zincir hâlinde ilerler (Şekil 7).

#sekil(7, [Kayıp telefonda iptal zinciri], "figures/a10/sekil-7.svg", yarim: false)

Bundan sonraki adımlar aşağıdadır; tabloda $t_1$, WIA’ların iptal edildiği anı gösterir:

#adimlar((
  ("Cüzdan sağlayıcı", [#{strong[WIA iptali.]} Aynur’un cüzdan birimine verdiği bütün WIA’ların durum bitlerini iptal eder \[14, 19\].], $"durum"("WIA") = 1$),
  ("Cüzdan sağlayıcı → Aynur", [#{strong[Açıklama.]} Tüzük gereği iptalin nedenini ve sonuçlarını açık ve sade bir dille bildirir (madde 7(3)) \[18\].], $t lt.eq t_1 + 24 "saat"$),
  ("PID sağlayıcı", [#{strong[PID iptali.]} Bölüm 7.4’teki kural gereği en geç bir sonraki 24 saatlik kontrolünde WIA’nın iptalini görür ve PID’i iptal eder.], $t lt.eq t_1 + 24 "saat"$),
  ("Doğrulayan", [#{strong[Ret.]} Eski telefondaki PID’i gösteren herkes, durum listesi kontrolünde reddedilir.], $"durum"("PID") = 1$),
))

Diploma ve öğrenci belgesi gibi diğer belgelerin ne olacağı ise o belgeleri veren kurumların kurallarına bağlıdır. Kurum belgeyi iptal etmese bile, belge eski telefondaki anahtara bağlı olduğu ve o anahtar kullanıcı doğrulaması olmadan kullanılamadığı için, telefonu bulan kişi belgeyi pratikte gösteremez.

== Anahtarlar neden yedeklenmez?

Telefonunu kaybeden birinin ilk isteği, eskisinin aynısını yeni telefonda bulmaktır. Fotoğraflar, mesajlar ve hatta birçok uygulamanın geçiş anahtarları (#{emph[passkeys]}) bulut yedeğinden birkaç dakikada geri gelir. Kimlik cüzdanında ise PID ve cihaza bağlı belgeler böyle geri gelmez. Bu bir eksiklikten kaynaklanmaz; bilinçli bir seçimdir.

Bölüm 2’de cüzdanın değerinin anahtarın kopyalanamamasından geldiğini söylemiştik. Anahtar yedeklenebilseydi, yedek de bir kopya olurdu. O kopyanın durduğu yer (bir bulut hesabı, bir dosya, bir kâğıda yazılmış kurtarma kelimeleri) anahtarın kendisi kadar korunmak zorunda kalırdı ve saldırganlar için yeni bir hedef olurdu. Güvenli donanım tam da bu yüzden anahtarın dışarı çıkmasına izin vermez. ARF de bu ilkeyi açıkça yazar: Bazı güvenli donanımlar anahtar yedekleme işlevleri sunsa da, cüzdan ekosisteminde gizli anahtarın dışa aktarılmasına gerek yoktur ve WSCA bunu desteklemez \[14\].

Geçiş anahtarlarıyla karşılaştırma öğreticidir. Geçiş anahtarları büyük platformların bulut hizmetleri üzerinden, uçtan uca şifrelenmiş olarak cihazlar arasında eşitlenebilir. Bu, bir web sitesine giriş için makul bir dengedir; çünkü giriş anahtarı kaybolursa site hesabı başka yollarla kurtarabilir ve anahtarın değeri o tek siteyle sınırlıdır. PID ise devletin yüksek güvence düzeyinde verdiği ve bütün AB’de kabul edilen bir kimlik bilgisidir. Onun anahtarının bir bulut hesabının güvenliğine bağlanması, yüksek saldırı potansiyeline karşı koruma şartıyla bağdaşmaz.

== Yedeklenen ne? Taşıma nesnesi

Bu, kişinin her şeyi sıfırdan yapacağı anlamına gelmez. eIDAS 2.0 kişiye verilerini taşıma hakkı tanır (madde 5a(4)(g)) \[4\]. ARF bu hakkı bir #{strong[taşıma nesnesi]} (#{emph[migration object]}) ile uygular \[14\]. Taşıma nesnesi, cüzdandaki belgelerin bir listesidir: hangi türde belge, hangi kurumdan alınmış ve yeniden almak için hangi adrese gidilmeli. İşlem kaydı da bu nesnenin içindedir. Gizli anahtarlar ise yoktur. PID ve cihaza bağlı belgeler için belgenin içindeki değerler de yazılmaz; çünkü bu değerler hassastır ve anahtar olmadan zaten işe yaramaz.

Yeni telefonda Aynur cüzdanı kurar ve etkinleştirir. Cüzdan, taşıma nesnesini okuyarak ona bir liste sunar: "Bu belgeleri yeniden istemek ister misin?" Aynur PID’i yeniden alır; bunun için PID sağlayıcının istediği kimlik doğrulamasını (örneğin çipli kimlik kartını telefona okutmayı) bir kez daha yapar. Diploma ve öğrenci belgesi için kurumlara yeniden başvurur. Her kurum yeni belgeyi yeni telefondaki yeni anahtarlara bağlar. Cihaza bağlı olmayan belgeler, örneğin bir anahtar içermeyen etkinlik bileti, ise taşıma nesnesiyle olduğu gibi aktarılabilir.

ARF bir istisnayı da not eder. PID anahtarları uzak bir HSM’de duruyorsa ve kişi aynı cüzdan sağlayıcının yeni bir cüzdanına geçiyorsa, anahtarın taşınmasına gerek yoktur. Kişi yeni telefonundan kendini HSM’e yeniden tanıtır ve aynı anahtarlara erişir \[14\]. Bu, uzak mimarinin Bölüm 5.3’te andığımız kolaylığıdır.

Bir ayrıntı daha var. Kişi cüzdan uygulamasını sadece silerse, anahtarlar güvenli donanımda kalabilir; çünkü onları silmek için kişiyi doğrulamak gerekir ve silinmekte olan bir uygulama bunu yapamaz. ARF bu yüzden cüzdanda bir #{strong[fabrika ayarlarına döndürme]} seçeneği öngörür: Kişi cüzdanı bu yolla sıfırlarsa cüzdan, güvenli donanımdan bütün anahtarları silmesini ister \[14\]. Telefonunu satmaya ya da başkasına vermeye hazırlanan biri için doğru yol budur.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Kimlik cüzdanında belgeler yedeklenebilir bir liste olarak taşınır, anahtarlar taşınmaz. Telefon kaybolduğunda kişi cüzdan sağlayıcıya telefondan bağımsız bir yolla başvurur, cüzdan birimi iptal edilir ve PID onunla birlikte iptal olur. Yeni telefonda PID ve cihaza bağlı belgeler veren kurumlardan yeniden alınır. Bu yol, bulut yedeğinden daha zahmetlidir; ama anahtarın hiçbir zaman ikinci bir kopyasının olmamasının bedelidir.
]

= Seçeneklerin Karşılaştırması

Bu yazıda anlattığımız seçenekleri yan yana koymanın zamanı geldi. Tablo 2 anahtarın durabileceği yerleri, Tablo 3 ise gerçekliği kanıtlayan mekanizmaları karşılaştırıyor.

#tablo([#{strong[Tablo 2.]} Gizli anahtarın durabileceği yerler.], (17fr, 15fr, 23fr, 10fr, 19fr, 32fr), ([Seçenek], [Kopyalanmaya direnç], [PID için uygun mu?], [İnternet olmadan], [Kime güveniliyor?], [Telefon kaybolunca],), (
  ([Yazılım (sıradan bellek)], [düşük], [hayır], [evet], [uygulamaya], [anahtar kopyalanmış olabilir],),
  ([TEE (anahtar deposu)], [orta; yazılım hatalarına açık], [hayır], [evet], [telefon üreticisine], [anahtar telefonda kalır, iptal gerekir],),
  ([Gömülü güvenli eleman, StrongBox], [yüksek], [ancak WSCD olarak değerlendirilirse], [evet], [çip ve telefon üreticisine], [anahtar telefonda kalır, iptal gerekir],),
  ([SIM, e-SIM], [yüksek], [WSCA yüklenip değerlendirilirse], [evet], [operatöre ve çip üreticisine], [SIM’le birlikte gider, iptal gerekir],),
  ([Harici akıllı kart], [yüksek], [WSCA yüklenip değerlendirilirse], [evet], [kartı verene], [kart kişide kalır],),
  ([Uzak HSM], [yüksek; erişim denetimine bağlı], [HSM ve erişim denetimi sertifikalanırsa], [hayır], [cüzdan sağlayıcıya], [anahtar sağlayıcıda kalır, yeni telefondan erişilir],),
))

#tablo([#{strong[Tablo 3.]} Gerçekliği kanıtlayan mekanizmalar.], (13fr, 16fr, 48fr, 18fr, 47fr), ([Mekanizma], [Kim imzalar?], [Neyi kanıtlar?], [Kime gösterilir?], [Bilinen sınırı],), (
  ([Android anahtar kanıtı], [cihazdaki kanıt anahtarı (Google kökü)], [anahtarın hangi donanımda üretildiği, önyükleme durumu, uygulamanın imzası], [cüzdan sağlayıcıya], [sızan kanıt anahtarları, kök sertifika değişiklikleri],),
  ([Apple App Attest], [Apple], [uygulamanın App Store’daki resmî sürüm olduğu, gerçek bir cihazda çalıştığı], [cüzdan sağlayıcıya], [her anahtar için ayrı donanım kanıtı vermez],),
  ([Play Integrity], [Google], [uygulamanın tanındığı, cihazın bütünlüğü ve güncelliği], [cüzdan sağlayıcıya], [Google hizmetlerine bağımlılık, eski cihazların dışlanması],),
  ([WIA], [cüzdan sağlayıcı], [cüzdan çözümünün tanınmış, sertifikalı ve iptal edilmemiş olduğu], [belge veren kuruma], [yalnızca sağlayıcının kontrolleri kadar güçlü],),
  ([Anahtar kanıtı], [cüzdan sağlayıcı], [anahtarların hangi düzeyde donanımda durduğu], [belge veren kuruma], [sağlayıcının doğru söylemesine dayanır; sertifikasyonla denetlenir],),
))

Tabloları okurken iki noktaya dikkat etmek gerekir. Birincisi, güven hiçbir seçenekte ortadan kalkmaz, yalnızca yer değiştirir. Yazılım anahtarında güven uygulamaya, telefonun içindeki güvenli donanımda telefon üreticisine, uzak HSM’de cüzdan sağlayıcıya verilir. Bu yüzden asıl soru, kime güvendiğimizi bilip bilmediğimiz ve o güvenin denetlenip denetlenmediğidir. İkincisi, platform kanıtları ile Avrupa’nın kanıtları birbirinin yerine geçmez, birbirini tamamlar. Platform kanıtları cüzdan sağlayıcının telefonu tanımasını sağlar; WIA ve anahtar kanıtı ise bu bilginin, platformdan bağımsız ve gereğinden fazlasını söylemeden belge veren kurumlara aktarılmasını.

= Sınırlar ve Açık Sorular

#{strong[İki şirkete bağımlılık.]} Dizinin ilk yazısında bir paradokstan söz etmiştik: Kimliği büyük şirketlerin elinden almak için kurulan bir sistem, başka bir katmanda yine onlara bağlanıyor. Bu yazıda bu bağımlılığın nerede durduğunu daha somut gördük. Telefonun içindeki güvenli donanım, cihaz kanıtının kök sertifikaları ve Play Integrity kararları iki platform şirketinin denetimindedir. Bu şirketlerden biri bir ülkede hizmetini kısıtlarsa ya da kanıt kurallarını değiştirirse, o ülkenin kimlik cüzdanları doğrudan etkilenir. Uzak HSM ve harici akıllı kart mimarileri bu bağımlılığı azaltmanın yollarıdır, ama kendi bedelleriyle gelirler.

#{strong[Kapsayıcılık.]} Cihaz kanıtları sıkılaştıkça, güncelleme almayan eski telefonlar ve platform şirketlerinin onaylamadığı işletim sistemleri dışarıda kalır. eIDAS 2.0 cüzdanın gönüllü ve ücretsiz olmasını, kullanmayan kişinin dezavantajlı duruma düşürülmemesini ister (madde 5a(13) ve 5a(15)) \[4\]. Ama yeni bir telefon alamayan birinin cüzdan kullanabilmesi, ancak uzak HSM ya da kart gibi seçeneklerin gerçekten sunulmasıyla mümkündür. Bu seçeneklerin ne kadar yaygın sunulacağı henüz belli değil.

#{strong[Telefonların sertifikasyonu.]} 2024\/2981 sayılı Uygulama Tüzüğü, WSCD’nin yüksek saldırı potansiyeline karşı değerlendirilmesini ve bu değerlendirmede Ortak Kriterler’in en sıkı açık analizi düzeyinin (AVA\_VAN.5) esas alınmasını ister \[24\]. Pasaport çipleri için yerleşmiş olan bu süreç, her yıl yüzlerce yeni modelin çıktığı telefon dünyasında nasıl işleyecek? Bir telefonun güvenli donanımının bu düzeyde değerlendirildiğini kim, hangi sıklıkla doğrulayacak? ARF bir mimariyi anlatmanın o mimarinin her uygulamasının sertifikasyonu geçeceği anlamına gelmediğini açıkça yazıyor \[14\]. Bu soru, ilk cüzdanlar yaygınlaştıkça cevaplanacak.

#{strong[Cihaz kanıtının gizliliği.]} Cihaz kanıtı hizmetleri platform şirketlerine bir miktar bilgi verir. Cüzdan sağlayıcının bu kanıtları ne sıklıkla istediği, platformun bu istekleri ne kadar süre sakladığı ve bunların kişinin cüzdan kullanımına dair bir iz oluşturup oluşturmadığı, kamuya açık belgelerde ayrıntılı tartışılmış değil.

#{strong[Cüzdan sağlayıcının gördükleri.]} 2026\/1731, WIA’ların durum başvurularında iki seçenek tanır. Ya her WIA’ya yeni ve birbirine bağlanamayan bir konum verilir ya da aynı kuruma giden WIA’larda aynı konum tekrar kullanılır. Tüzük, ikinci seçenekte cüzdan sağlayıcının bir cüzdanın kaç kurumla ve ne sıklıkla konuştuğunu öğrenebileceğini kendisi not eder ve sağlayıcının hangi seçeneği kullandığını gizlilik politikasında yazmasını ister \[19\]. Yani iptalin kolaylığı ile gizlilik arasında bir denge kurulmak zorunda ve bu denge sağlayıcıdan sağlayıcıya değişebilir.

#{strong[Merkezîleşen HSM’ler.]} Uzak mimari yaygınlaşırsa, bir ülkedeki milyonlarca PID anahtarı birkaç veri merkezinde toplanır. Bu merkezlerin sertifikalı olması tek başına yeterli değildir; erişim denetiminin, kayıtların ve iç tehditlere karşı önlemlerin sürekli denetlenmesi gerekir. Bir HSM arızasının, aynı anda milyonlarca kişinin kimliğini kullanılamaz hâle getirmesi de ayrıca planlanması gereken bir risktir.

#{strong[Kuantum sonrası dönem.]} Bugünkü güvenli donanımların çoğu yalnızca P-256 eliptik eğrisini destekler. Kuantum bilgisayarların bu imzaları ileride kırabilecek olması, yalnızca belge biçimlerini değil, telefonların içindeki donanımı da değiştirmeyi gerektirecek. Donanım yazılımdan çok daha yavaş değiştiği için bu geçiş uzun sürecek. Dizinin son yazısı bu konuya ayrılmış durumda.

#{strong[Zorlama ve paylaşılan telefonlar.]} Bölüm 8.4’te değindiğimiz gibi, kişinin zorla ya da kendi isteğiyle telefonunu ve PIN’ini başkasına vermesine karşı teknik önlemler sınırlıdır. Bu konuda hukukun, işlem kayıtlarının ve kişinin bildirim haklarının nasıl birlikte çalışacağı uygulamada görülecek.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisini yayımlayan Tamga Network, Türkiye ve Türk dünyası için AB’nin eIDAS 2.0 ve EUDI profillerine dayanan, kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır. Ağın kendisi bir cüzdan ya da cüzdan sağlayıcı işletmez. Cüzdanları, imzalı güven listesindeki cüzdan sağlayıcı kayıtlarıyla tanır. Bu yazının konusu açısından ağın rolü, listedeki her cüzdan sağlayıcıdan beklediği asgari kuralları açık bir belge olarak yayımlamaktır \[25\].

Bu kurallar, bu yazıda anlattığımız Avrupa modelini izler. Listedeki cüzdan sağlayıcılar, AB’deki cüzdan birimi kanıtının karşılığı olarak bir WIA ve bir anahtar kanıtı verir. WIA’nın ömrü 24 saatten kısadır ve her belge alma işleminde yeni bir WIA kullanılır. Anahtar kanıtı anahtarların durduğu donanımın düzeyini doğrulanmış duruma göre söyler; doğrulanmamış bir iddia kanıta yazılmaz. Belge anahtarları cihazın güvenli alanında ya da sertifikalı güvenli donanımda üretilir ve dışa aktarılamaz; yazılım anahtarı taşıyan bir cüzdana belge verilmez. En yüksek düzeyi beyan eden kanıtlardan önce platformun cihaz kanıtı (App Attest, Android anahtar kanıtı, Play Integrity) doğrulanır. Telefonu kaybolan kişinin, telefon olmadan ve bir kullanıcı hesabı gerekmeden cüzdan birimini iptal ettirebileceği bir yol etkinleştirme sırasında kurulur. WIA ve anahtar kanıtı durum listeleri en az 10.000 kayıtlıdır. Bu kurallar ağın çerçeve belgesinde kamuya açıktır ve güven listelerinde hiçbir kişisel veri yer almaz.

Ağın bu konudaki iddiası sınırlıdır. Tamga Network bir sertifikasyon kuruluşu değildir ve AB’nin sertifikalı cüzdan listesinin yerine geçmez. Yaptığı, AB dışındaki ülkelerde de aynı güvenlik ilkelerinin uygulanabileceği, AB’nin biçimleriyle uyumlu bir kurallar çerçevesi sunmaktır.

= Sonuç

Bir kimlik cüzdanının güvenliği, dışarıdan bakınca görünmeyen bir yerde, telefonun içindeki küçük bir çipte ya da uzak bir veri merkezindeki bir modülde başlar. Bu yazıda cüzdanın asıl değerinin, belgeleri kişiye bağlayan gizli anahtarlarda olduğunu gördük. Belgenin kopyası tek başına bir işe yaramaz; anahtarın kopyası ise kişinin kimliğinin kopyası olurdu. Bu yüzden anahtarlar güvenli donanımda üretilir, oradan hiç çıkmaz ve her kullanımda kişinin PIN’i ya da biyometrisiyle açılır.

Anahtarın güvenli donanımda durduğunu söylemek yetmez, bunu kanıtlamak gerekir. Platform şirketlerinin cihaz kanıtları telefonun ve uygulamanın gerçekliğini cüzdan sağlayıcıya gösterir. Avrupa Birliği’nin cüzdan birimi kanıtı ise bu bilgiyi, platformdan bağımsız ve gereğinden fazlasını söylemeden, belge veren kurumlara taşır. Bu kanıtlar iptal edilebilir; telefon kaybolduğunda cüzdan birimi iptal edilir ve PID de onunla birlikte iptal olur. Anahtarlar yedeklenmez, belgeler yeniden alınır.

Bu tasarımın her adımı bir dengedir. Güvenli donanım güçlüdür ama telefon üreticilerine bağımlılık yaratır. Uzak HSM bu bağımlılığı azaltır ama güveni cüzdan sağlayıcıda toplar. Sıkı cihaz kanıtları sahte uygulamaları dışarıda tutar ama eski telefonları da dışarıda bırakabilir. Anahtarın yedeklenmemesi kopyalanmayı engeller ama kayıptan sonra kişiye zahmet çıkarır. A1’de dijital kimliğin temelde bir güven sorunu olduğunu söylemiştik. Bu yazı aynı sonuca daha alçak bir yerden, bir çipin içinden bakıyor. Matematik ve donanım bir anahtarın kopyalanmasını çok zorlaştırabilir. O donanımı kimin ürettiğine, kimin denetlediğine ve kimin iptal edebileceğine ise yine kurallar ve kurumlar karar verir.

Dizinin bir sonraki yazısı, bu kuralların hukuki dayanağına, yani eIDAS 2.0’ın kendisine, bir hukukçu olmayan okurun gözüyle bakıyor.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[ISO\/IEC (2022). #{emph[ISO\/IEC 15408-1:2022 Information security, cybersecurity and privacy protection — Evaluation criteria for IT security — Part 1: Introduction and general model.]} (Ortak Kriterler; Bölüm 3: güvence bileşenleri, AVA\_VAN.)]

#kaynak("2")[ISO\/IEC (2022). #{emph[ISO\/IEC 18045:2022 Information security, cybersecurity and privacy protection — Evaluation criteria for IT security — Methodology for IT security evaluation.]}]

#kaynak("3")[Avrupa Komisyonu (2015). #{emph[Elektronik kimlik araçlarının güvence düzeylerine ilişkin asgari teknik şartları ve prosedürleri belirleyen 2015\/1502 sayılı Uygulama Tüzüğü (AB).]} Avrupa Birliği Resmî Gazetesi, L 235, 9 Eylül 2015.]

#kaynak("4")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024. (Madde numaraları 910\/2014’ün değiştirilmiş konsolide metnine göredir.)]

#kaynak("5")[Fett, D., Yasuda, K. ve Campbell, B. (2025). #{emph[Selective Disclosure for JSON Web Tokens.]} IETF RFC 9901, Kasım 2025. Ayrıca: #{emph[SD-JWT-based Verifiable Credentials (SD-JWT VC)]}, IETF OAuth Çalışma Grubu taslağı.]

#kaynak("6")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]}]

#kaynak("7")[Avrupa Komisyonu (2024). #{emph[Ortak Kriterlere dayalı Avrupa siber güvenlik sertifikasyon şemasının (EUCC) kabulüne ilişkin 2024\/482 sayılı Uygulama Tüzüğü (AB).]} 31 Ocak 2024; Avrupa Birliği Resmî Gazetesi, 7 Şubat 2024.]

#kaynak("8")[Arm Ltd. #{emph[TrustZone for Cortex-A.]} Arm geliştirici belgeleri, developer.arm.com.]

#kaynak("9")[Apple Inc. #{emph[Apple Platform Security.]} Çevrimiçi kılavuz, support.apple.com\/guide\/security (bölümler: "The Secure Enclave", "Face ID and Touch ID security").]

#kaynak("10")[Apple Inc. #{emph[Protecting keys with the Secure Enclave.]} Apple Developer Documentation, developer.apple.com\/documentation\/security.]

#kaynak("11")[Google. #{emph[Android Keystore system]} ve #{emph[Verifying hardware-backed key pairs with key attestation.]} Android Developers, developer.android.com; ayrıca #{emph[Key and ID attestation]}, Android Open Source Project, source.android.com.]

#kaynak("12")[Nemec, M., Sys, M., Svenda, P., Klinec, D. ve Matyas, V. (2017). "The Return of Coppersmith’s Attack: Practical Factorization of Widely Used RSA Moduli." #{emph[Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security (CCS ’17)]}, 1631–1648.]

#kaynak("13")[Shakevsky, A., Ronen, E. ve Wool, A. (2022). "Trust Dies in Darkness: Shedding Light on Samsung’s TrustZone Keymaster Design." #{emph[31st USENIX Security Symposium (USENIX Security 22).]}]

#kaynak("14")[Avrupa Komisyonu. #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF)]}, sürüm 3.0.0, 23 Temmuz 2026. github.com\/eu-digital-identity-wallet (bölümler 3, 4.5, 6.5.3, 6.5.4).]

#kaynak("15")[ISO\/IEC (2023). #{emph[ISO\/IEC 30107-1:2023 Information technology — Biometric presentation attack detection — Part 1: Framework.]}]

#kaynak("16")[Apple Inc. #{emph[Establishing your app’s integrity]} ve #{emph[Validating apps that connect to your server]} (DeviceCheck, App Attest). Apple Developer Documentation, developer.apple.com\/documentation\/devicecheck.]

#kaynak("17")[Google. #{emph[Integrity verdicts]} ve #{emph[Play Integrity API improvements.]} Android Developers, developer.android.com\/google\/play\/integrity.]

#kaynak("18")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarının bütünlüğü ve temel işlevleri için kurallara ilişkin 2024\/2979 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("19")[Avrupa Komisyonu (2026). #{emph[2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982 sayılı Uygulama Tüzüklerini uygulanacak standartlar ve şartnameler bakımından değiştiren 2026\/1731 sayılı Uygulama Tüzüğü (AB).]} 15 Temmuz 2026; Avrupa Birliği Resmî Gazetesi, 22 Temmuz 2026 (2024\/2979’a eklenen Ek Ib).]

#kaynak("20")[Lodderstedt, T., Yasuda, K., Looker, T. ve Bastian, P. (2025). #{emph[OpenID for Verifiable Credential Issuance 1.0.]} OpenID Foundation, Final, 16 Eylül 2025 (Ek D: anahtar kanıtları; Ek E: cüzdan kanıtları).]

#kaynak("21")[Looker, T., Bastian, P. ve Bormann, C. #{emph[OAuth 2.0 Attestation-Based Client Authentication.]} IETF OAuth Çalışma Grubu taslağı, draft-ietf-oauth-attestation-based-client-auth.]

#kaynak("22")[Looker, T., Bastian, P. ve Bormann, C. #{emph[Token Status List.]} IETF OAuth Çalışma Grubu taslağı, draft-ietf-oauth-status-list.]

#kaynak("23")[Almanya Federal Dijital İşler ve Devlet Modernizasyonu Bakanlığı. #{emph[Architecture Documentation for the German National EUDI Wallet]}, Bölüm 5 "Remote WSCA" (uzak WSCA kaydı, PIN’den türetilen anahtar, deneme sayacı). Kamuya açık geliştirici belgeleri, bmi.usercontent.opencode.de\/eudi-wallet.]

#kaynak("24")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarının sertifikasyonuna ilişkin 2024\/2981 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024 (Ek IV).]

#kaynak("25")[Tamga Network. #{emph[Wallet Attestation Policy (WIA and KA)]}, FW-POL-0002, sürüm 1.0.0, 16 Ekim 2026. arf.tamga.network.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Apple, #{emph[Apple Platform Security]}, "The Secure Enclave" bölümü.]} Bir telefonun içindeki güvenli alanın nasıl kurulduğunu bir üreticinin kendi ağzından, sade bir dille anlatıyor.
+ #{strong[Android Developers, #{emph[Android Keystore system]} ve anahtar kanıtı sayfaları.]} TEE, StrongBox ve anahtar kanıtının neyi kanıtladığını örneklerle gösteriyor.
+ #{strong[EUDI ARF 3.0, Bölüm 4.5 ve 6.5.]} Dört WSCD mimarisi, cüzdan biriminin etkinleştirilmesi, iptali ve taşınması; bu yazının Avrupa tarafının ana kaynağı.
+ #{strong[OpenID4VCI 1.0, Ek D ve Ek E.]} Anahtar kanıtının ve cüzdan kanıtının alanlarını birkaç sayfada tanımlıyor.
+ #{strong[Shakevsky, Ronen ve Wool, "Trust Dies in Darkness" (2022).]} Donanım destekli anahtarların da yazılım hatalarıyla nasıl açığa çıkabileceğini gösteren, okunaklı bir güvenlik çalışması.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (16fr, 22fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Anahtar bağlama, sahip bağlama], [key binding, holder binding], [Belgenin, sahibinin cüzdanındaki bir anahtara bağlanması ve gösterimde o anahtarla imza istenmesi],),
  ([Anahtar deposu], [keystore], [ARF’de yüksek güvence gerektirmeyen anahtarlar için kullanılan donanım destekli depo (TEE, secure enclave gibi)],),
  ([Anahtar kanıtı], [key attestation (KA)], [Anahtarların hangi güvenli donanımda üretilip saklandığını söyleyen imzalı belge],),
  ([Cihaz kanıtı], [device attestation], [Platformun, cihazın ve içinde üretilen anahtarların durumu hakkında imzaladığı ifade],),
  ([Cüzdan birimi], [wallet unit], [Bir kişinin cihazındaki cüzdan uygulaması ile ona bağlı güvenli donanımın bütünü],),
  ([Cüzdan birimi kanıtı], [wallet unit attestation (WUA)], [Cüzdan sağlayıcının imzaladığı, WIA ve anahtar kanıtından oluşan kanıt],),
  ([Cüzdan örneği kanıtı], [wallet instance attestation (WIA)], [Cüzdan uygulamasını tanıtan, 24 saatten kısa ömürlü imzalı belge],),
  ([Cüzdan sağlayıcı], [wallet provider], [Cüzdan uygulamasını sağlayan ve cüzdan birimi kanıtlarını imzalayan kuruluş],),
  ([Donanım güvenlik modülü], [hardware security module (HSM)], [Anahtarları kurcalamaya dayanıklı biçimde saklayan ve kullanan sertifikalı cihaz],),
  ([Güvenilir yürütme ortamı], [trusted execution environment (TEE)], [Ana işlemcinin donanım desteğiyle ayrılmış, sıradan ortamdan yalıtılmış çalışma ortamı],),
  ([Güvenli eleman], [secure element (SE)], [Kendi işlemcisi ve belleği olan, fiziksel saldırılara dayanıklı ayrı çip],),
  ([Kullanıcı doğrulama], [user authentication], [Cihazı kullanan kişinin sahibi olduğunun PIN ya da biyometriyle kontrol edilmesi],),
  ([Onay (App Attest)], [assertion], [App Attest anahtarıyla imzalanmış, sayaç içeren istek],),
  ([Ortak Kriterler], [Common Criteria (ISO\/IEC 15408)], [Güvenlik ürünlerinin değerlendirilmesi için uluslararası çerçeve],),
  ([PID], [person identification data], [Devletin ya da yetkilendirdiği kurumun verdiği temel kişi kimlik bilgisi],),
  ([Saldırı potansiyeli], [attack potential], [Bir saldırının süre, uzmanlık, bilgi, fırsat ve ekipman bakımından ne kadar zor olduğunun ölçüsü],),
  ([Sunum saldırısı], [presentation attack], [Biyometrik okuyucuyu sahte parmak izi, fotoğraf ya da maskeyle kandırma girişimi],),
  ([Taşıma nesnesi], [migration object], [Cüzdandaki belgelerin listesini ve işlem kaydını taşıyan, anahtar içermeyen nesne],),
  ([Token Status List], [Token Status List], [Belgelerin iptal durumunu bit dizisinde tutan IETF yöntemi],),
  ([Uzaktan anahtar sağlama], [remote key provisioning (RKP)], [Android’de kanıt anahtarlarının cihaza sonradan, kısa ömürlü sertifikalarla sağlanması],),
  ([WSCA], [wallet secure cryptographic application], [WSCD’de çalışan ve cüzdanla konuşan güvenlik uygulaması],),
  ([WSCD], [wallet secure cryptographic device], [Cüzdanın kritik anahtarlarını koruyan, kurcalamaya ve kopyalanmaya dayanıklı aygıt],),
  ([Yerel \/ uzak WSCD], [local \/ remote WSCD], [Anahtarın telefonda ya da ona bağlı bir kartta (yerel) veya bir sunucudaki HSM’de (uzak) durması],),
))

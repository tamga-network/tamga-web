// A4 — Sıfır Bilgi İspatları ve Kimlik. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Sıfır Bilgi İspatları ve Kimlik",
  altbaslik: "“18 Yaşından Büyüğüm” Demenin Matematiği",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Kasım 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("sıfır bilgi ispatı", "yaş doğrulama", "Schnorr protokolü", "Fiat-Shamir dönüşümü", "zk-SNARK", "zk-STARK", "mdoc", "ECDSA", "Longfellow ZK", "bağlanamazlık", "EUDI cüzdanı",),
  atif: "Karataş, B. (2026). Sıfır Bilgi İspatları ve Kimlik: “18 Yaşından Büyüğüm” Demenin Matematiği. Tamga Network Akademik Çalışmalar, A4. https://tamga.network/files/publications/zero-knowledge-proofs-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bir gece kulübünün kapısındaki görevli, içeri girmek isteyen gencin yalnızca on sekiz yaşını doldurup doldurmadığını merak eder. Ama bunu öğrenmek için kimlik kartına bakar ve kartın üzerindeki her şeyi görür: adı, soyadı, doğum tarihi, kimlik numarası, bazen adresi. Dijital dünyada bu fazlalık çok daha pahalıdır, çünkü görülen her bilgi kaydedilebilir, birleştirilebilir ve yıllarca saklanabilir. Kriptografide kırk yıldır bilinen bir fikir bu sorunun kökten bir cevabını verir. Sıfır bilgi ispatı, bir ifadenin doğru olduğunu, ifadenin dayandığı bilgiyi hiç açmadan kanıtlamayı sağlar. "Doğum tarihim şu" demeden "18 yaşından büyüğüm" demek, hangi kurumdan belge aldığını söylemeden "bu ülkenin tanıdığı bir kurumdan geçerli bir belgem var" demek bu sayede mümkün olur.

Bu yazı sıfır bilgi ispatlarını hiçbir matematik bilgisi varsaymadan anlatıyor. Önce sezgiyle başlıyoruz: Ali Baba mağarası, üç temel özellik (tamlık, sağlamlık, sıfır bilgi) ve bir ispatın neden "ikna eder ama öğretmez" olabildiği. Sonra etkileşimli ispatlardan, internette kullanılabilen etkileşimsiz ispatlara geçişi, zk-SNARK ve zk-STARK gibi genel amaçlı ispat sistemlerini ve bunların kimlikteki kullanımlarını (yaş, aralık, üyelik, iptal edilmemişlik) ele alıyoruz. Yazının ağırlık merkezi, bugün kurumların zaten verdiği ECDSA imzalı mobil belgeler üzerinde, belgeyi değiştirmeden ispat üretme yaklaşımı ve Avrupa Birliği’nin yaş doğrulama çalışmasında bu yaklaşımın nasıl kullanıldığı. Performans ve cihaz sınırlarını, açık soruları ve Tamga Network’ün bu alandaki yerini tartıştıktan sonra, Ek B’de küçük sayılarla adım adım bir Schnorr ispatı veriyoruz.
  ],
)

= Giriş: Kapıdaki Görevli Ne Görmeli?

Timur on dokuz yaşında. Ablası Aynur gibi o da Bakü’den İstanbul’a okumaya gelmiş, bilgisayar mühendisliğinin ikinci sınıfında. Cuma akşamı arkadaşlarıyla yalnızca yetişkinlerin girebildiği bir konsere gitmek istiyor. Bilet satan site, ödeme sayfasından önce bir kutucuk gösteriyor: "Bu etkinlik 18 yaş ve üzeri içindir. Lütfen yaşınızı doğrulayın." Altında iki seçenek var. Birincisi kimlik kartının ön ve arka yüzünün fotoğrafını yüklemek, ikincisi telefonun kamerasına bakıp yüzünü taratmak.

Timur’un aklına iki soru geliyor. Birincisi, bu site kimliğimin fotoğrafını ne yapacak? Kartın üzerinde adı, soyadı, doğum tarihi, kimlik numarası, uyruğu ve fotoğrafı var. Site bunlardan yalnızca tek bir şeyi bilmek istiyor: Timur’un 18 yaşını doldurup doldurmadığını. Ama bu tek bilgi için bütün kartı alıyor ve muhtemelen bir yerde saklıyor. İkincisi, yüz taraması gerçekten ne kadar güvenilir? Bir yazılım bir yüze bakıp "bu kişi 18 yaşından büyük görünüyor" diyebilir; ama 17 yaşında olup büyük görünen biriyle 19 yaşında olup küçük görünen biri arasındaki farkı her zaman doğru söyleyemez. Üstelik bu kez de yüzün kendisi, yani değiştirilemeyen bir biyometrik veri, bir sunucuya gidiyor.

Konserin kapısında da aynı sahne yaşanacak. Görevli Timur’dan kimliğini isteyecek, karta bakacak ve kafasında hızlı bir hesap yapacak. Görevli kartı kaydetmez, birkaç saniye sonra unutur; fiziksel dünyada bu fazlalığın bedeli düşüktür. Dijital dünyada ise aynı fazlalık birikir. Bir sitenin veritabanına giren kimlik fotoğrafı yıllarca orada kalabilir, sızabilir, başka verilerle birleştirilebilir. Her yeni yaş doğrulama zorunluluğu, insanların kimlik kartlarının bir kopyasını bir yere daha bırakması anlamına gelir.

Bu soru artık kuramsal değil. Avrupa Birliği’nde Dijital Hizmetler Yasası’nın küçükleri koruma maddesine dayanarak Temmuz 2025’te çevrimiçi platformlar için yönergeler yayımlandı ve aynı gün Avrupa Komisyonu bir yaş doğrulama çözümünün ilk sürümünü kamuya açtı \[17, 18\]. Türkiye’de 7578 sayılı Kanunla 5651 sayılı Kanun’da yapılan değişiklik 1 Mayıs 2026’da Resmî Gazete’de yayımlandı; sosyal ağ sağlayıcılarının 15 yaşından küçüklere hizmet vermemesini öngören hükümler 1 Kasım 2026’da yürürlüğe girdi \[19\]. Benzer düzenlemeler başka ülkelerde de tartışılıyor. Yani yakın gelecekte milyonlarca insan, her gün birçok kez, yaşını bir yazılıma kanıtlamak zorunda kalacak. Bu kanıtın nasıl yapılacağı, mahremiyet açısından bu on yılın en önemli tasarım kararlarından biri.

Bu dizinin üçüncü yazısında seçici açıklamayı anlatmıştık: Bir belgenin tamamını değil yalnızca gereken alanını göstermek. Seçici açıklama Timur’un sorununu büyük ölçüde çözer. Devletin verdiği dijital kimlik belgesinde "18 yaşından büyük" anlamına gelen ayrı bir alan bulunur ve Timur yalnızca o alanı gösterir. Site Timur’un adını, doğum tarihini, kimlik numarasını görmez. Ama bir şeyi hâlâ görür: belgenin kendisine ait bazı değerleri, yani veren kurumun imzasını ve Timur’un cüzdanındaki anahtarın açık yarısını. Bu değerler her gösterimde aynıysa, Timur’un yaşını doğruladığı iki farklı site bir araya gelip "bu ikimizin müşterisi aynı kişi" diyebilir. Bu sorunun adı bağlanabilirliktir ve dizinin beşinci yazısının konusudur.

Sıfır bilgi ispatları bu son adımı da atmayı sağlar. Timur, siteye belgesini hiç göstermeden şunu kanıtlayabilir: "Elimde, güvenilir kurumlar listesindeki bir kurumun imzaladığı, süresi dolmamış, bu telefondaki anahtara bağlı bir kimlik belgesi var ve bu belgeye göre 18 yaşından büyüğüm." Site bu cümlenin doğru olduğundan matematiksel olarak emin olur. Ama ne doğum tarihini, ne belgeyi, ne imzayı, ne de Timur’un anahtarını görür. Timur aynı ispatı yarın başka bir siteye gösterdiğinde, iki ispat arasında iki sitenin karşılaştırabileceği ortak hiçbir değer yoktur (Şekil 1).

#sekil(1, [Yaşı kanıtlamanın üç yolu: doğrulayıcı ne görüyor?], "figures/a4/sekil-1.svg", yarim: false)

Kulağa sihir gibi geliyor. Bir şeyi kanıtlayıp aynı anda o şeyle ilgili hiçbir şey söylememek nasıl mümkün olabilir? Bu yazının amacı, bu sorunun cevabını hiçbir matematik bilgisi varsaymadan vermek. Yazının ana metni formül içermiyor. Teknik ayrıntı merak eden okur için "Teknik ayrıntı" kutuları var, yazının sonundaki Ek B’de ise küçük sayılarla, elle hesaplanabilecek bir ispat adım adım yürütülüyor.

Yazının planı şöyle. Bölüm 2 sıfır bilgi fikrini bir masal ve bir oyunla sezgisel olarak anlatıyor, üç temel özelliği tanımlıyor. Bölüm 3 kısa bir tarihçe veriyor. Bölüm 4, karşılıklı soru-cevaba dayanan ilk ispatlardan, tek bir mesajla gönderilebilen etkileşimsiz ispatlara nasıl geçildiğini anlatıyor. Bölüm 5 herhangi bir hesaplama hakkında ispat üretebilen genel amaçlı sistemleri (zk-SNARK, zk-STARK ve diğerleri) tanıtıyor. Bölüm 6 kimlikte neyin kanıtlanabileceğine, Bölüm 7 bugün zaten verilmiş belgeler üzerinde ispat üretmeye, Bölüm 8 Avrupa Birliği’nin yaş doğrulama çalışmasına ve mimari çerçevesindeki yol haritasına bakıyor. Bölüm 9 performans ve cihaz sınırlarını, Bölüm 10 yöntemlerin karşılaştırmasını, Bölüm 11 açık soruları ele alıyor. Bölüm 12 Tamga Network’ün bu alandaki yerini kısaca anlatıyor.

= Sezgi: Bir Sırrı Açmadan Kanıtlamak

== Ali Baba’nın mağarası

Sıfır bilgi ispatlarını anlatmanın en ünlü yolu, 1989’da bir kriptografi konferansında sunulan kısa bir makaleden gelir. Makalenin başlığı bile niyetini açıkça söyler: "Sıfır Bilgi Protokollerini Çocuklarınıza Nasıl Anlatırsınız" \[3\]. Yazarlar, Binbir Gece Masalları’ndaki Ali Baba hikâyesinden esinlenen bir mağara tarif eder. Bugün bu anlatının birçok sürümü dolaşıyor; biz kendi karakterlerimizle anlatalım.

Halka biçiminde bir mağara düşünün. Girişten içeri girince yol ikiye ayrılır: sola giden A koridoru ve sağa giden B koridoru. İki koridor mağaranın derinliğinde bir kapıyla birbirine bağlanır. Kapı yalnızca gizli bir sözle açılır. Sözü bilen biri A’dan girip kapıyı açarak B’den çıkabilir; bilmeyen biri hangi koridordan girdiyse oradan geri dönmek zorundadır (Şekil 2).

Aynur kapının sözünü bildiğini Timur’a kanıtlamak istiyor, ama sözü ona söylemek istemiyor. Söylerse Timur da sözü öğrenir ve artık Aynur’un sırrı sır olmaktan çıkar. Şöyle bir oyun oynuyorlar:

+ Timur mağaranın girişinde, koridorları göremeyeceği bir yerde bekler. Aynur içeri girer ve A ya da B koridorlarından birini, yazı tura atarak, kendisi seçer.
+ Timur girişe gelir ve yüksek sesle bir koridorun adını söyler: "B’den çık!" Hangi koridoru söyleyeceğini o da yazı tura atarak seçer.
+ Aynur, Timur’un söylediği koridordan çıkar.

Aynur sözü biliyorsa her seferinde istenen koridordan çıkabilir: Zaten o koridordaysa geri yürür, değilse kapıyı açıp öbür tarafa geçer. Sözü bilmiyorsa ancak şansı yaver giderse doğru koridordan çıkar, yani Timur’un tesadüfen Aynur’un girdiği koridoru söylemesi gerekir. Bunun olasılığı yarı yarıyadır.

Tek bir tur pek bir şey kanıtlamaz; sözü bilmeyen biri de yarı yarıya şansla doğru çıkabilir. Ama oyun tekrarlanabilir. İki turda şansla geçme olasılığı dörtte bire, on turda yaklaşık binde bire, yirmi turda yaklaşık milyonda bire düşer. Yirmi turun hepsinde doğru koridordan çıkan biri için Timur artık şunu söyleyebilir: "Bu kişi sözü bilmiyorsa, milyonda bir ihtimalle denk gelen bir şans yaşadı. Buna inanmaktansa sözü bildiğine inanırım."

#sekil(2, [Ali Baba mağarası ve turlar ilerledikçe şansla geçme olasılığının düşüşü], "figures/a4/sekil-2.svg", yarim: false)

Bu oyunun dikkat çeken yanı, Timur’un yirmi turun sonunda neyi öğrendiği ve neyi öğrenmediğidir. Öğrendiği şey, Aynur’un sözü bildiğidir. Öğrenmediği şey ise sözün kendisidir. Timur her turda yalnızca Aynur’un hangi koridordan çıktığını görür ve bu, zaten kendi istediği koridordur. Yani Timur’un oyun boyunca gördüğü her şey, kendi seçtiği koridor adlarının bir listesinden ibarettir. Bu listeyi Timur oyunu hiç oynamadan da kendi kendine yazabilirdi.

Son cümle, sıfır bilginin en derin fikrini taşıyor. Bir konuşmadan "hiçbir şey öğrenmemek", o konuşmada gördüğün her şeyi konuşmaya hiç katılmadan kendi başına da üretebilecek olmak demektir. Bu fikri biraz sonra kurgusal bir kayıt üzerinden yeniden ele alacağız.

== Bir oyun daha: renk körü arkadaş

Mağara masalı sırrın bir "söz" olduğu durumu anlatır. Sıfır bilginin ikinci bir sezgisi, bir sırrın değil bir #{strong[olgunun]} kanıtlandığı durumdan gelir. Bu örnek de kriptografi derslerinde sık anlatılır.

Elif’in elinde biri kırmızı biri yeşil iki top var. Nurlan kırmızı-yeşil renk körü; ona göre iki top aynı renktedir. Elif topların farklı renkte olduğunu kanıtlamak istiyor, ama hangisinin kırmızı olduğunu söylemek istemiyor. Oyun şöyle: Nurlan iki topu alır, ellerini arkasına koyar, topları değiştirip değiştirmediğine yazı turayla karar verir ve topları yeniden Elif’e gösterir. Elif’e tek bir soru sorulur: "Topların yerini değiştirdim mi?"

Toplar gerçekten farklı renkteyse Elif her seferinde doğru cevap verir, çünkü renklerine bakar. Toplar aynı renkte olsaydı Elif’in yarı yarıya şansı olurdu. Turlar tekrarlandıkça Nurlan, Elif’in her seferinde doğru bildiğini görür ve topların farklı olduğuna ikna olur. Ama hangi topun kırmızı olduğunu hâlâ bilmez. Elif’in cevapları, Nurlan’ın zaten bildiği bir şeyi, yani topları değiştirip değiştirmediğini, ona geri söylemekten ibarettir.

İki oyunun ortak yapısına dikkat edin. İki tarafın rolleri bellidir: Bir #{strong[ispatçı]} (#{emph[prover]}) bir ifadenin doğru olduğunu iddia eder; bir #{strong[doğrulayıcı]} (#{emph[verifier]}) bu iddiayı sınar. Doğrulayıcı her turda ispatçının önceden kestiremeyeceği rastgele bir #{strong[meydan okuma]} (#{emph[challenge]}) yapar. İspatçı ancak ifade gerçekten doğruysa her meydan okumaya doğru cevap verebilir. Ve cevaplar, doğrulayıcının zaten bildiği ya da kendi başına üretebileceği şeylerdir.

== Üç özellik: tamlık, sağlamlık, sıfır bilgi

Kriptografide bir protokolün sıfır bilgi ispatı sayılması için üç özelliği birlikte taşıması gerekir. Bu üç özellik dizinin geri kalanında ve bu alandaki bütün kaynaklarda karşınıza çıkacak; bu yüzden onları dikkatlice tanımlayalım.

#{strong[Tamlık]} (#{emph[completeness]}): İfade doğruysa ve iki taraf da kurallara uyuyorsa, doğrulayıcı ikna olur. Mağarada sözü bilen Aynur her turda doğru koridordan çıkar ve Timur her seferinde "tamam" der. Tamlık, sistemin dürüst kullanıcıyı haksız yere reddetmediğini söyler.

#{strong[Sağlamlık]} (#{emph[soundness]}): İfade yanlışsa, ispatçı ne yaparsa yapsın doğrulayıcıyı ancak çok küçük bir olasılıkla kandırabilir. Sözü bilmeyen biri yirmi turu milyonda bir ihtimalle geçebilir. Sağlamlık, sistemin sahtekâra kapı açmadığını söyler. Buradaki "çok küçük olasılık" ifadesi önemlidir. Sıfır bilgi ispatlarının neredeyse hepsi #{strong[olasılıksal]} bir güvence verir. Ama gerçek sistemlerde bu olasılık milyonda bir düzeyinde kalmaz; evrendeki atom sayısıyla kıyaslanacak kadar küçük seçilir.

#{strong[Sıfır bilgi]} (#{emph[zero-knowledge]}): Doğrulayıcı, ifadenin doğru olduğu dışında hiçbir şey öğrenmez. Bunun matematiksel tanımı ilk bakışta tuhaf görünür, ama mağara örneğinden sonra sezgisi açıktır. Doğrulayıcının protokol boyunca gördüğü her şeyi (mesajlar, cevaplar, kendi meydan okumaları), sırrı hiç bilmeyen bir #{strong[benzetici]} (#{emph[simulator]}) de üretebiliyorsa, o görüntüler sır hakkında hiçbir şey taşımıyor demektir. Çünkü sırrı bilmeyen birinin üretebildiği bir şey, sırrı ele veremez.

#kutu("teknik", [Benzetici fikri: Sahte bir video kaydı neden önemli?])[
Benzeticiyi bir video kaydı üzerinden düşünmek kolaylaştırır. Timur, mağara oyununun yirmi turunu baştan sona videoya çekmiş olsun. Bu video, Aynur’un sözü bildiğini başkalarına da kanıtlar mı?

Kanıtlamaz. Çünkü sözü bilmeyen biri de inandırıcı bir video çekebilir: Kamerayı her turun başında kapatır, Aynur’un hangi koridora girdiğini görür, sonra kamerayı açıp tam o koridorun adını söyler. Yanlış tahmin edilen turları montajda keser. Ortaya çıkan video, gerçek oyunun videosundan ayırt edilemez. Sözü bilmeden, gerçeğinden ayırt edilemeyen bir kayıt üretilebildiğine göre, kayıt sözle ilgili hiçbir bilgi taşıyamaz.

Matematiksel tanım tam olarak budur: Her doğrulayıcı için, sırrı bilmeden çalışan ve çıktısı gerçek protokolün kaydından (istatistiksel ya da hesaplamaya dayalı anlamda) ayırt edilemeyen bir benzetici algoritma bulunmalıdır. Montaj hilesinin işe yaramasının nedeni, benzeticinin meydan okumayı #{strong[önceden]} bilmesidir. Gerçek protokolde ispatçı bu avantaja sahip değildir; meydan okuma, ispatçı ilk adımını attıktan #{strong[sonra]} gelir. Sağlamlığın da sıfır bilginin de sırrı bu sıralamadadır.

Bu tanımın bir sonucu da şudur: Etkileşimli bir sıfır bilgi ispatının kaydı, üçüncü kişiler için kanıt değeri taşımaz. Bu ilk bakışta bir eksiklik gibi görünür, ama kimlik için çoğu zaman bir avantajdır. Timur’un bir siteye verdiği etkileşimli ispat, o sitenin elinde Timur aleyhine kullanılabilecek, başkalarına gösterilebilecek bir "makbuza" dönüşmez. Bölüm 4’te göreceğimiz etkileşimsiz ispatlarda bu durum değişir.
]

== Doğruluğu kanıtlamak, bilgiyi kanıtlamak

Mağara ile renkli toplar arasında ince ama önemli bir fark var. Renkli toplar örneğinde Elif bir #{strong[olgunun]} doğru olduğunu kanıtlar: "Bu iki top farklı renkte." Mağarada ise Aynur bir #{strong[bilgiye sahip olduğunu]} kanıtlar: "Kapının sözünü biliyorum." İlkine #{strong[doğruluk ispatı]}, ikincisine #{strong[bilgi ispatı]} (#{emph[proof of knowledge]}) denir.

Kimlikte çoğu zaman ikisine birden ihtiyaç duyarız. Timur’un siteye kanıtlaması gereken şey, aslında iki parçalı bir cümledir: "Bir kurumun imzaladığı geçerli bir belgem var (bunu biliyorum, yani elimde) ve bu belgedeki doğum tarihine göre 18 yaşından büyüğüm (bu doğru)." Yalnızca ikinci parçayı kanıtlamak yetmez; bir başkasının belgesini ödünç alıp ispat üretmek de mümkün olmamalıdır. Bu yüzden kimlikteki ispatlar, belgenin kişinin cihazındaki gizli anahtara bağlı olduğunu da (dizinin ikinci yazısında anlattığımız "sahip bağlama") ispatın içine katar. Bölüm 7’de bunun nasıl yapıldığını göreceğiz.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Sıfır bilgi ispatı üç özelliği birlikte taşır. #{strong[Tamlık]}: doğru bir ifade her zaman kabul edilir. #{strong[Sağlamlık]}: yanlış bir ifade yalnızca ihmal edilebilecek kadar küçük bir olasılıkla kabul edilir. #{strong[Sıfır bilgi]}: doğrulayıcı, ifadenin doğru olduğu dışında hiçbir şey öğrenmez; çünkü gördüğü her şeyi sırrı bilmeyen biri de üretebilirdi. Kimlikte kanıtlanan şey çoğu zaman hem bir bilgiye sahip olmak (geçerli bir belge) hem de bir olgunun doğruluğudur (18 yaşından büyük olmak).
]

= Kısa Bir Tarihçe: Bir Tuhaf Fikirden Telefondaki Cüzdana

Sıfır bilgi ispatları, kriptografinin "kuramdan uygulamaya" en uzun yolculuk yapan fikirlerinden biridir. Kavramın ortaya çıkması ile milyonlarca kişinin telefonunda çalışması arasında kırk yıl var. Bu yolculuğu birkaç durakta özetleyelim.

#kutu("tarihce", [Sıfır bilgi ispatlarının yolu])[
#{strong[1985 · Fikrin doğuşu.]} Shafi Goldwasser, Silvio Micali ve Charles Rackoff, "Etkileşimli İspat Sistemlerinin Bilgi Karmaşıklığı" başlıklı makalelerini ACM’nin kuramsal bilgisayar bilimi sempozyumu STOC’ta sundu; genişletilmiş hâli 1989’da #{emph[SIAM Journal on Computing]}’de yayımlandı \[1\]. Makale hem etkileşimli ispat kavramını hem de bir ispatın "ne kadar bilgi sızdırdığını" ölçme fikrini getirdi. Bu çalışma 1993’te kuramsal bilgisayar biliminin en saygın ödüllerinden Gödel Ödülü’nü aldı; Goldwasser ve Micali 2012’de Turing Ödülü’ne layık görüldü.

#{strong[1985 · Kimliksiz güvenlik.]} Aynı yıl David Chaum, "Kimliksiz Güvenlik" adlı makalesinde, insanların kurumlarla işlem yaparken kimliklerini değil yalnızca yetkilerini gösterdiği, işlemlerinin birbirine bağlanamadığı bir dünya tasarladı \[5\]. Bugünkü "anonim belge" fikrinin kökü bu makaledir.

#{strong[1986 · Etkileşimsiz ispat.]} Amos Fiat ve Adi Shamir, etkileşimli bir kimlik doğrulama protokolünü, doğrulayıcının rastgele sorusunu bir özet fonksiyonuyla değiştirerek tek mesajlık bir imzaya dönüştürmeyi gösterdi \[6\]. Bu "Fiat-Shamir dönüşümü" bugün neredeyse bütün pratik ispat sistemlerinde kullanılır.

#{strong[1989 · Mağara.]} Ali Baba mağarası anlatısı CRYPTO ’89 konferansında sunuldu \[3\]. Aynı dönemde Claus-Peter Schnorr, akıllı kartlar için tasarladığı verimli kimlik doğrulama ve imza şemasını sundu; dergi sürümü 1991’de yayımlandı \[7\].

#{strong[2000’ler · Anonim belgeler.]} Stefan Brands’in seçici açıklamalı belge sistemi (2000) \[8\] ve Jan Camenisch ile Anna Lysyanskaya’nın anonim belge şeması (2001) \[9\], sıfır bilgi ispatlarını doğrudan kimlik belgelerine uyguladı. Bu çalışmalar büyük şirketlerin araştırma ürünlerine dönüştü ama geniş ölçekte yaygınlaşmadı.

#{strong[2010’lar · Genel amaçlı ispatlar.]} Herhangi bir hesaplama hakkında kısa ispat üreten sistemler pratik hâle geldi. 2016’da yayımlanan bir yapı, ispatı yalnızca üç grup elemanına, yani birkaç yüz bayta indirdi \[10\]. 2017’de güvenilir kurulum gerektirmeyen hafif bir sistem \[12\], 2018’de yalnızca özet fonksiyonlarına dayanan ve kuantum bilgisayarlara dayanıklı olduğu düşünülen bir başka yaklaşım yayımlandı \[11\].

#{strong[2024–2025 · Var olan belgeyle ispat.]} Bir araştırma ekibi, devletlerin ve kurumların zaten kullandığı ECDSA imzaları üzerinde, telefonda saniyeler içinde sıfır bilgi ispatı üretmenin yolunu gösterdi \[13\]. Yöntem Nisan 2025’te büyük bir mobil cüzdanda yaş doğrulama için kullanılmaya başladı ve Temmuz 2025’te açık kaynak olarak yayımlandı \[14\].

#{strong[2025–2026 · Avrupa.]} Avrupa Komisyonu’nun yaş doğrulama çözümü sıfır bilgi ispatlarını içine aldı \[18\]; AB cüzdanının teknik şartnameleri arasında sıfır bilgi ispatlarına ayrılmış üç belge yer aldı \[21\].
]

Bu tarihçeden çıkan ilginç bir ders, dizinin ilk yazısında federasyon için söylediğimizin bir benzeri. Fikir 1985’te hazırdı. Ama otuz yılı aşkın bir süre boyunca ispatlar ya çok büyük ya çok yavaş ya da kurumların zaten kullandığı imza türleriyle uyumsuzdu. Yaygınlaşmanın önündeki asıl engel matematikte yatmıyordu; mühendislik ve benimseme koşullarındaydı. 2020’lerin ortasında bu engellerin üçü birden aşılmaya başladı: telefonlar yeterince hızlandı, ispat sistemleri yeterince küçüldü ve var olan belgelerle çalışan bir yöntem bulundu.

= Etkileşimden Etkileşimsize: Tek Mesajlık İspat

== Üç adımlı dans: taahhüt, meydan okuma, cevap

Mağara oyunu güzel bir sezgi verir ama internette kullanılamaz. Kimse bir siteye girmek için yirmi tur soru-cevap oynamak istemez; üstelik mağaranın kapısı fiziksel bir nesnedir. Gerçek sistemlerde "sır" bir sayıdır (örneğin bir gizli anahtar) ve "kapı" bir matematik problemidir. Bu dönüşümün en sade ve en çok öğretilen örneği #{strong[Schnorr protokolüdür]} \[7\].

Schnorr protokolünde Aynur’un sırrı, yalnızca kendisinin bildiği bir gizli anahtardır. Bu anahtardan hesaplanan bir açık anahtar ise herkesçe bilinir; dizinin ilk yazısının dijital imza bölümünde anlattığımız anahtar çiftinin aynısı. Açık anahtardan gizli anahtarı geri hesaplamak pratikte imkânsızdır. Aynur, gizli anahtarı bildiğini, onu açıklamadan kanıtlamak ister. Protokol üç mesajdan oluşur ve mağaradaki turun yapısını birebir taşır (Şekil 3):

+ #{strong[Taahhüt]} (#{emph[commitment]}). Aynur o tura özel rastgele bir sayı seçer, bu sayıyı kimseye söylemez, ondan türettiği bir değeri Timur’a gönderir. Bu, mağarada Aynur’un bir koridora girmesine karşılık gelir: Aynur bir seçim yapmış ve ona bağlanmıştır, ama seçimini göstermemiştir.
+ #{strong[Meydan okuma]} (#{emph[challenge]}). Timur rastgele bir sayı seçip Aynur’a gönderir. Bu, "B’den çık!" demektir. Önemli olan, bu sayının Aynur’un taahhüdünden sonra gelmesi ve Aynur’un onu önceden kestirememesidir.
+ #{strong[Cevap]} (#{emph[response]}). Aynur, gizli anahtarını, kendi rastgele sayısını ve Timur’un meydan okumasını basit bir hesapta birleştirir ve sonucu Timur’a gönderir. Rastgele sayı gizli anahtarın üzerini örten bir perde gibi çalışır; cevaba bakan biri gizli anahtarı göremez.
+ #{strong[Kontrol.]} Timur, yalnızca herkesin bildiği değerlerle (açık anahtar, taahhüt, kendi meydan okuması, cevap) bir eşitliğin tutup tutmadığına bakar. Eşitlik tutuyorsa ikna olur.

#sekil(3, [Schnorr protokolünün üç mesajı ve mağara oyunundaki karşılıkları], "figures/a4/sekil-3.svg", yarim: false)

Bu protokolün mağaradan önemli bir farkı var: Tek bir tur yeterlidir. Mağarada meydan okuma yalnızca iki değer alabiliyordu (A ya da B), bu yüzden şansla geçme olasılığı yarı yarıyaydı. Schnorr protokolünde meydan okuma çok büyük bir sayı aralığından seçilir; gerçek sistemlerde bu aralığın büyüklüğü 2 üzeri 128 ya da daha fazladır. Sahtekârın doğru meydan okumayı önceden tahmin etme şansı bu yüzden ihmal edilebilecek kadar küçüktür. Mağaradaki yirmi turun işini tek bir büyük tur görür.

#kutu("teknik", [Schnorr protokolü formüllerle])[
Ana metni formülsüz tutmak için hesapları burada ve Ek B’de veriyoruz. Herkesin bildiği üç değer vardır: büyük bir asal sayı $p$, $p - 1$’i tam bölen bir başka asal $q$ ve bir "üreteç" $g$. Aynur’un gizli anahtarı $x$’tir; açık anahtarı ise bundan hesaplanır ve herkese açıktır:

#formul[$ y = g^x mod p $]

Protokol dört adımdan oluşur. Tablodaki son sütun, o adımda hesaplanan değeri gösterir:

#adimlar((
  ("Aynur → Timur", [#{strong[Taahhüt.]} Aynur rastgele bir $r$ seçer ve taahhüdü gönderir.], $t = g^r mod p$),
  ("Timur → Aynur", [#{strong[Meydan okuma.]} Timur rastgele bir $c$ seçip Aynur’a gönderir.], $c in {0, 1, ..., q - 1}$),
  ("Aynur → Timur", [#{strong[Cevap.]} Aynur gizli anahtarını cevabın içine katar.], $s = (r + c dot x) mod q$),
  ("Timur", [#{strong[Kontrol.]} Timur iki tarafı hesaplayıp karşılaştırır.], $g^s attach(=, t: ?) t dot y^c quad (mod p)$),
))

#{strong[Eşitlik neden tutar?]} Üslerin toplama kuralıyla kısa bir hesaptır:

#formul[$ g^s &= g^(r + c x) \
    &= g^r dot (g^x)^c \
    &= t dot y^c $]

Cevap $s$, gizli anahtar $x$’i içerir ama $r$ ile örtülmüştür; $r$ her turda yeni ve rastgele olduğu için $s$ tek başına $x$ hakkında bir şey söylemez.

#{strong[Sağlamlığın sezgisi.]} Aynur aynı taahhüt $t$ için iki farklı meydan okumaya ($c$ ve $c'$) doğru cevap ($s$ ve $s'$) verebiliyorsa, bu iki cevaptan gizli anahtar hesaplanabilir:

#formul[$ x = (s - s') / (c - c') mod q $]

Yani her meydan okumaya cevap verebilen biri, gizli anahtarı "bilmek" zorundadır. Bu özelliğe #{emph[özel sağlamlık]} (#{emph[special soundness]}) denir.

#{strong[Sıfır bilginin sezgisi.]} Benzetici, meydan okumayı önceden bilirse işi kolaydır: Önce $s$ ve $c$’yi rastgele seçer, sonra taahhüdü geriye doğru hesaplar:

#formul[$ t = g^s dot y^(-c) mod p $]

Bu üçlü ($t, c, s$), gerçek bir konuşmanınkiyle aynı dağılıma sahiptir. Bölüm 2.3’teki video montajının cebirsel karşılığı budur. Ek B’de bütün bu adımlar küçük sayılarla, elle yürütülüyor.

Gerçek sistemlerde aynı protokol, büyük asal sayılar yerine eliptik eğri grupları üzerinde çalıştırılır; anahtarlar ve mesajlar çok daha kısa olur. Günümüzde yaygın kullanılan EdDSA imzaları da Schnorr’un bu yapısının bir türevidir.
]

== Doğrulayıcıyı bir özet fonksiyonuyla değiştirmek

Schnorr protokolü tek tura indi, ama hâlâ #{strong[etkileşimli]}: Timur’un taahhüdü gördükten sonra bir meydan okuma göndermesi gerekiyor. Bu, iki tarafın aynı anda çevrimiçi olmasını ve en az üç mesajın gidip gelmesini gerektirir. Daha önemlisi, bir ispatın başka biri tarafından sonradan kontrol edilmesini imkânsız kılar; çünkü üçüncü bir kişi, meydan okumanın gerçekten taahhütten sonra ve rastgele seçildiğinden emin olamaz.

1986’da Amos Fiat ve Adi Shamir bu sorunu şaşırtıcı ölçüde basit bir fikirle çözdü \[6\]. Meydan okumanın görevi, ispatçının önceden kestiremeyeceği bir sayı olmaktır. Bu sayıyı Timur’un üretmesi gerekmez. Taahhüdü ve kanıtlanan ifadeyi bir #{strong[özet fonksiyonuna]} verip çıkan sonucu meydan okuma olarak kullanmak da aynı işi görür. Özet fonksiyonu, dizinin ilk yazısında parolaların saklanmasını anlatırken tanıttığımız, girdisini tanınmaz bir parmak izine dönüştüren işlemdir. Çıktısı önceden kestirilemez; taahhüt değişirse meydan okuma da tamamen değişir. Aynur artık meydan okumayı kendisi hesaplar, cevabı hesaplar ve taahhütle cevabı tek bir mesajda gönderir. Timur, ya da sonradan bakan herhangi biri, aynı özeti kendisi hesaplayıp kontrolü yapar (Şekil 4).

#sekil(4, [Fiat-Shamir dönüşümü: doğrulayıcının rastgele sorusu yerine özet fonksiyonu], "figures/a4/sekil-4.svg", yarim: false)

Bu dönüşümün iki önemli sonucu var. Birincisi, ispat artık bir #{strong[nesne]} olur: Bir dosyaya yazılabilir, bir ağdan gönderilebilir, yarın başka biri tarafından doğrulanabilir. İnternette kullanılabilmesinin önkoşulu budur. Bugün kimlikte kullanılan bütün sıfır bilgi ispatları bu anlamda #{strong[etkileşimsizdir]} (#{emph[non-interactive]}).

İkincisi, ispatın kime ve ne için üretildiğini ispatın içine yazmak gerekir. Etkileşimli protokolde Timur’un rastgele meydan okuması ispatı o anki konuşmaya bağlıyordu. Etkileşimsiz ispatta bu bağı özet fonksiyonuna katılan bilgiler kurar: doğrulayıcının kimliği, doğrulayıcının o oturum için ürettiği tek kullanımlık rastgele değer (#{emph[nonce]}) ve zaman. Bunlar özete katılmazsa, Timur’un bir siteye verdiği ispatı kötü niyetli bir site alıp başka bir siteye kendi ispatıymış gibi gösterebilir. İlk yazıda OpenID Connect kimlik belirtecindeki #{raw("aud")} ve #{raw("nonce")} alanlarının neden önemli olduğunu anlatmıştık; burada aynı ilke ispatın içinde uygulanır.

#kutu("teknik", [Rastgele kâhin ve Fiat-Shamir’in güvenliği])[
Fiat-Shamir dönüşümünün güvenliği genellikle "rastgele kâhin modeli" (#{emph[random oracle model]}) adı verilen bir varsayım altında kanıtlanır \[2\]. Bu modelde özet fonksiyonu, her yeni girdiye tamamen rastgele bir çıktı veren ideal bir kutu gibi düşünülür. Gerçek özet fonksiyonları (SHA-256 gibi) böyle ideal kutular sayılmaz, ama iyi tasarlanmışlarsa pratikte öyle davranırlar.

Uygulamada asıl risk, özete katılması gereken bir değerin unutulmasıdır. Taahhüt özete katılır ama kanıtlanan ifade, açık anahtar ya da oturum bilgisi katılmazsa, saldırgan bazı değerleri sonradan ayarlayarak sahte ispat üretebilir. Literatürde bu hataya "zayıf Fiat-Shamir" denir ve gerçek yazılımlarda birçok kez bulunmuştur. Schnorr örneğinde iki hâl yan yana şöyle görünür:

#formul[$ "zayıf:" quad c &= H(t) \
"doğru:" quad c &= H(g, y, t, "oturum bilgisi") $]

Bu yüzden ciddi ispat sistemleri, özete nelerin hangi sırayla katılacağını tek tek tanımlar; buna ispatın #{strong[dökümü]} (#{emph[transcript]}) denir.
]

== İspattan imzaya

Fiat-Shamir dönüşümünün bir yan ürünü, dijital imzaların kendisidir. Schnorr protokolünün etkileşimsiz hâlinde özete bir de #{strong[mesaj]} katarsanız, ortaya çıkan ispat şunu söyler: "Bu açık anahtarın gizli anahtarını bilen biri bu mesajı gördü ve onayladı." Bu tam olarak bir imzadır. Schnorr imzası da, birçok modern imza şeması da bu yoldan doğmuştur.

Bu bağlantı, sıfır bilgi ispatlarının kimlik dünyasına neden bu kadar doğal oturduğunu da gösterir. Bir dijital imza, en basit hâliyle, "gizli anahtarı biliyorum" ifadesinin bir mesaja bağlanmış sıfır bilgi ispatıdır. Kimlikte istediğimiz ise bunun daha zengin bir hâlidir: "Gizli anahtarı biliyorum, bu anahtara bağlı bir belgem var, belgeyi şu kurum imzaladı, belge şu tarihe kadar geçerli ve belgedeki doğum tarihi şu eşikten önce." Bu kadar katmanlı bir ifadeyi kanıtlamak için Schnorr gibi tek amaçlı protokoller yetmez; herhangi bir hesaplama hakkında ispat üretebilen genel amaçlı sistemler gerekir.

= Her Hesaplama İçin Bir İspat: Devreler, SNARK’lar ve STARK’lar

== İfadeyi bir hesaplamaya çevirmek

Genel amaçlı ispat sistemlerinin ortak fikri şöyle özetlenebilir. Kanıtlamak istediğiniz ifadeyi, bir bilgisayarın yapabileceği bir #{strong[kontrol]} olarak yazarsınız. Bu kontrol bazı girdileri alır ve sonunda "evet" ya da "hayır" der. Sonra ispat sistemi şunu kanıtlar: "Bu kontrolü ’evet’ diyecek biçimde çalıştıran gizli girdiler biliyorum."

Timur’un yaş ifadesi için kontrol kabaca şöyle yazılabilir:

+ Belgenin içeriğinin özetini hesapla; kurumun imzasını kurumun açık anahtarıyla doğrula.
+ Belgedeki "18 yaşından büyük" alanının değerinin "doğru" olduğunu kontrol et (ya da doğum tarihinin, bugünden 18 yıl önceki tarihten önce olduğunu).
+ Belgenin geçerlilik süresinin dolmadığını kontrol et.
+ Belgenin bağlı olduğu cihaz anahtarıyla bu oturuma ait bir imza atıldığını kontrol et.
+ Hepsi doğruysa "evet" de.

Bu kontrolün girdilerinin bir kısmı #{strong[açıktır]} ve doğrulayıcı da onları bilir: kurumun açık anahtarı, bugünün tarihi, eşik yaşı, oturumun tek kullanımlık değeri. Bir kısmı ise #{strong[gizlidir]} ve yalnızca Timur’un telefonunda durur: belgenin tamamı, kurumun imzası, doğum tarihi, cihaz anahtarının imzası. Kriptografide gizli girdilere #{strong[tanık]} (#{emph[witness]}) denir, çünkü ifadenin doğru olduğuna tanıklık ederler. İspat sistemi, tanığı açmadan, tanığın var olduğunu kanıtlar (Şekil 5).

#sekil(5, [Yaş ifadesinin bir kontrol devresine çevrilmesi: açık girdiler, gizli tanık ve tek bitlik çıktı], "figures/a4/sekil-5.svg", yarim: false)

Bilgisayar bilimcileri bu tür kontrolleri #{strong[aritmetik devre]} (#{emph[arithmetic circuit]}) biçiminde yazar. Devre, yalnızca toplama ve çarpma kapılarından oluşan büyük bir hesap ağıdır. Bir imza doğrulaması, bir özet hesabı, bir tarih karşılaştırması, hepsi sonunda binlerce, bazen milyonlarca toplama ve çarpmaya ayrıştırılabilir. İspat sistemi, bu devrenin her kapısının doğru hesaplandığını tek tek göstermek yerine, bütün devre için tek bir ispat üretmenin yolunu bulur.

#kutu("teknik", [Çok küçük bir devre örneği])[
En basit örnekle başlayalım. Timur, bir $w$ sayısı bildiğini ve bu sayının karesinin 25 olduğunu, $w$’yu açmadan kanıtlamak istiyor olsun. Herkesin gördüğü bir #{strong[açık girdi]} ($z$) ve yalnız Timur’un bildiği bir #{strong[gizli tanık]} ($w$) vardır; devrenin tek işi bir çarpma yapıp sonucu açık girdiyle karşılaştırmaktır:

#formul[$ "açık girdi:" quad & z = 25 \
"gizli tanık:" quad & w quad ("ispatta görünmez") \
"devre:" quad & w dot w - z attach(=, t: ?) 0 $]

Timur’un bildiği değer $w = 5$ olduğunda $5 dot 5 - 25 = 0$ çıkar ve devre "evet" der. İspat, bu hesabın doğru yapıldığını gösterir ama $w$’nun 5 olduğunu söylemez.

Yaş kontrolü bunun çok daha büyük bir hâlidir. Doğum tarihi $d$ gizli, bugünün tarihinden 18 yıl öncesi $e$ açıktır ve devre $d <= e$ karşılaştırmasını yapar. Karşılaştırma, sayıları bitlerine ayırıp bit bit çıkarma yaparak birkaç yüz kapıyla ifade edilir. Pahalı olan kısım yaş karşılaştırması sayılmaz; asıl yük, kurumun imzasını devre içinde doğrulamaktır. Bir ECDSA imza doğrulaması, eliptik eğri üzerinde yüzlerce çarpma ve toplama, her biri de büyük sayılar üzerinde onlarca küçük işlem demektir. Bu yüzden bir kimlik devresi kolayca yüz binlerce, hatta milyonlarca kapıya ulaşır. Bölüm 7’de bu maliyetin nasıl düşürüldüğünü göreceğiz.
]

== zk-SNARK: kısa ve hızlı, ama bir kurulum töreniyle

2010’larda en çok konuşulan ispat sistemleri ailesinin adı #{strong[zk-SNARK]}’tır. Kısaltmanın her harfi bir özelliği anlatır: sıfır bilgili (#{emph[zero-knowledge]}), kısa (#{emph[succinct]}), etkileşimsiz (#{emph[non-interactive]}), bilgi argümanı (#{emph[argument of knowledge]}). "Kısa" burada güçlü bir anlam taşır: İspatın boyu ve doğrulama süresi, devre ne kadar büyük olursa olsun neredeyse sabittir. Milyonlarca kapılı bir devrenin ispatı, en bilinen yapılardan birinde yalnızca üç grup elemanından, yani birkaç yüz bayttan oluşur ve doğrulaması birkaç milisaniye sürer \[10\].

Bu kısalığın bir bedeli vardır. En kısa SNARK’ların birçoğu, kullanılmaya başlamadan önce bir #{strong[güvenilir kurulum]} (#{emph[trusted setup]}) gerektirir. Kurulumda devreye özel bazı ortak parametreler üretilir; bu üretim sırasında kullanılan rastgele değerler ise hemen ardından yok edilmelidir. Bu değerleri saklayan biri sahte ispatlar üretebilir. Sıfır bilgi özelliği bundan etkilenmez, ama sağlamlık çöker. Bu yüzden kurulum çoğu zaman birçok bağımsız katılımcının sırayla katkı verdiği törenlerle yapılır; katılımcılardan yalnızca birinin dürüst olup kendi parçasını yok etmesi yeterlidir.

Kimlik için bu bir yönetişim sorusu doğurur. Bir ülkenin ya da bir ekosistemin bütün yaş ispatları bir kurulum töreninin dürüstlüğüne dayanacaksa, o törene kim katılmalı, kim denetlemeli, devre değişirse ne olacak? Bu sorular çözülemez sayılmaz, ama bir kamu kimlik sistemi için ek bir güven katmanı demektir. Sonraki yıllarda geliştirilen bazı SNARK’lar, bir kez yapılan ve her devre için kullanılabilen "evrensel" kurulumlarla bu yükü azalttı; bir kısmı ise kurulumu tamamen ortadan kaldırdı.

== zk-STARK: şeffaf ve kuantuma dayanıklı, ama daha büyük

2018’de yayımlanan #{strong[zk-STARK]} yaklaşımı, güvenilir kurulumu tamamen kaldırdı \[11\]. Kısaltmadaki "T" harfi #{emph[transparent]}, yani #{strong[şeffaf]} kelimesinden gelir: Sistemin bütün parametreleri herkese açık rastgelelikten türetilir, saklanması gereken bir sır yoktur. STARK’lar ayrıca yalnızca özet fonksiyonlarına dayanır. Bugünkü açık anahtarlı kriptografinin büyük kısmını tehdit eden kuantum bilgisayarların özet fonksiyonları üzerindeki etkisi çok daha sınırlı olduğu için, STARK’ların kuantum sonrası dönemde de güvenli kalacağı düşünülür. Bu konu dizinin on beşinci yazısında ele alınacak.

Bedeli ispat boyudur. Bir STARK ispatı, SNARK’ın birkaç yüz baytına karşılık onlarca ya da yüzlerce kilobayt tutabilir. Sunucular arasında bu boyut sorun yaratmaz. Ama bir QR kodla aktarılacak ya da zayıf bir mobil bağlantıyla gönderilecek bir kimlik ispatı için hesaba katılması gereken bir maliyettir.

== Diğer aileler

İspat sistemleri dünyası SNARK ve STARK’tan ibaret sayılmaz. Kimlik açısından anılmaya değer üç aile daha var.

#{strong[Bulletproofs]} (2018) özellikle #{strong[aralık ispatları]} için tasarlandı. "Bu gizli sayı 0 ile 2 üzeri 64 arasında" gibi ifadeleri güvenilir kurulum olmadan, bir kilobayttan küçük ispatlarla kanıtlar \[22\]. Doğrulaması SNARK’lardan yavaştır, ama yaş gibi sayısal koşullar için doğal bir araçtır.

#{strong[Ligero]} (2017), güvenilir kurulum gerektirmeyen, yalnızca özet fonksiyonlarına dayanan ve ispatçısı çok hızlı çalışan bir sistemdir \[12\]. İspat boyu devre büyüdükçe yavaşça (kabaca devre boyunun kareköküyle) büyür. Bölüm 7’de anlatacağımız yaklaşım, Ligero’yu 1990’ların başından beri bilinen #{strong[toplam kontrolü]} (#{emph[sumcheck]}) protokolüyle \[4\] birleştirir.

#{strong[İmza tabanlı anonim belgeler]} ise farklı bir yol izler. Genel bir devre kurmak yerine, belgeyi baştan, üzerinde verimli sıfır bilgi ispatı yapılabilecek özel bir imzayla imzalar. 2001’deki Camenisch-Lysyanskaya şeması \[9\] ve bugün IRTF’te taslak olarak işlenen BBS imzaları \[25\] bu ailenin üyeleridir. İspatlar küçük ve hızlıdır; ama belgeyi veren kurumun da bu özel imzayı kullanması gerekir. Bu koşulun neden ağır bastığını Bölüm 7’de tartışacağız.

#tablo([#{strong[Tablo 1.]} Başlıca ispat sistemi ailelerinin kaba karşılaştırması (değerler büyüklük sırası olarak verilmiştir).], (22fr, 11fr, 21fr, 9fr, 19fr, 31fr), ([Aile], [Güvenilir kurulum], [İspat boyu], [İspat üretimi], [Kuantuma dayanıklılık], [Kimlikte tipik kullanım],), (
  ([Schnorr türü (Sigma) protokoller], [yok], [çok küçük (onlarca bayt)], [çok hızlı], [yok], [anahtara sahip olduğunu kanıtlamak, imzalar],),
  ([Kısa SNARK’lar (ör. eşleme tabanlı)], [var (devreye özel ya da evrensel)], [birkaç yüz bayt], [yavaş, bellek ister], [yok], [ispatın çok küçük olması gereken genel ifadeler],),
  ([STARK’lar], [yok (şeffaf)], [onlarca – yüzlerce kilobayt], [orta], [var (düşünülen)], [büyük hesaplamalar],),
  ([Bulletproofs], [yok], [bir kilobayttan az], [orta], [yok], [aralık ispatları],),
  ([Ligero + toplam kontrolü], [yok], [yüzlerce kilobayt], [hızlı], [yalnız özet fonksiyonlarına dayanır], [var olan ECDSA belgeleri üzerinde ispat],),
  ([İmza tabanlı anonim belgeler (CL, BBS)], [yok], [küçük (yüzlerce bayt – birkaç kilobayt)], [hızlı], [yok], [belge baştan bu imzayla verilirse],),
))

= Kimlikte Sıfır Bilgi: Ne Kanıtlanabilir?

Genel amaçlı ispat sistemleri, devre olarak yazılabilen her ifadenin kanıtlanmasına izin verir. Kimlik alanında bu ifadeler birkaç tipik kalıpta toplanır. Her birini Timur’un ya da Aynur’un hayatından bir örnekle anlatalım.

== Eşik ispatı: "18 yaşından büyüğüm"

En yaygın ve en çok konuşulan kullanım budur. İki farklı yoldan yapılabilir.

Birinci yolda belgeyi veren kurum, yaşla ilgili cevabı #{strong[önceden hesaplayıp]} belgeye ayrı bir alan olarak yazar. Mobil ehliyet standardı ISO\/IEC 18013-5, #{raw("age_over_18")}, #{raw("age_over_21")} gibi alanlar tanımlar \[23\]; Avrupa’nın kişi kimlik verisi (PID) tanımında da benzer yaş alanları vardır. Bu alanlar evet ya da hayır değeri taşır. Sıfır bilgi ispatı bu durumda yalnızca şunu kanıtlar: "Belgemde #{raw("age_over_18")} alanı var ve değeri ’evet’." Devre görece basittir, çünkü tarih hesabı yoktur. Kısıtı ise eşiklerin önceden belirlenmiş olmasıdır: Belgede #{raw("age_over_16")} alanı yoksa, 16 yaş eşiği için ispat üretilemez.

İkinci yolda ispat doğrudan doğum tarihi üzerinden yapılır: "Doğum tarihim, bugünden 18 yıl önceki tarihten önce." Bu yol her eşik için çalışır; ama devre bir tarih karşılaştırması içerir ve "bugün" değerinin doğrulayıcıyla uyuşması gerekir. Gece yarısı doğum günü dolan biri için hangi saat diliminin geçerli olduğu gibi küçük ama gerçek sorular ortaya çıkar.

Bugün sahada kullanılan sistemler çoğunlukla birinci yolu seçiyor ve belgede hazır bulunan bir yaş alanını, belgeyi açmadan kanıtlıyor. Bölüm 8’de anlatacağımız AB yaş doğrulama çözümü de böyle çalışır.

== Aralık ispatı

Eşik ispatının genellemesi, bir değerin iki sınır arasında olduğunu kanıtlamaktır. Aynur bir burs başvurusunda ailesinin gelirinin belirli bir aralıkta olduğunu, tutarı açmadan kanıtlamak isteyebilir. Bir araç kiralama şirketi, sürücünün ehliyetini en az iki yıldır taşıdığını bilmek ister ama ehliyetin veriliş tarihini bilmek zorunda değildir. Aralık ispatları bu tür sorulara cevap verir; Bulletproofs gibi sistemler bunun için tasarlanmıştır \[22\].

Aralık ispatı için belgede sayısal değerin kendisi bulunmalıdır, yani belge bunu mümkün kılacak biçimde verilmiş olmalıdır. Bugünkü yaygın belge biçimlerinde (SD-JWT VC ve mdoc) her alan ayrı ayrı özetlendiği için, devre önce alanın özetini doğrulamalı, sonra değeri karşılaştırmalıdır. Bu yapılabilir, ama her yeni ifade türü yeni bir devre ve o devrenin bağımsız olarak incelenmesi demektir.

== Üyelik ispatı ve veren kurumu gizlemek

Bazen kanıtlanması gereken şey bir değerin kendisi değil, bir kümeye ait olmasıdır: "Uyruğum Avrupa Birliği ülkelerinden biri", "bu belgeyi akredite tıp fakültelerinden biri verdi" gibi. Bu ikinci örnek özellikle ilginçtir, çünkü gizlenen şey kişinin bir özelliği değil, #{strong[belgeyi veren kurumun kimliğidir]}.

Neden önemli olduğunu düşünelim. Bir öğrencinin "öğrenciyim" ispatı hangi üniversitenin imzasını taşıdığını gösteriyorsa, doğrulayıcı öğrencinin hangi üniversitede okuduğunu öğrenir. Küçük bir üniversite için bu bilgi kişiyi neredeyse tanımlayacak kadar ayırt edicidir. İdeal ispat şunu söyler: "Güven listesindeki yetkili üniversitelerden biri bana öğrenci belgesi verdi." Devre bu durumda kurumun açık anahtarını gizli girdi olarak alır ve bu anahtarın listedeki anahtarlardan biri olduğunu kanıtlar. Dizinin altıncı yazısında anlatacağımız güven listeleri, burada ispatın açık girdisi hâline gelir.

Bu tür ispatlar araştırmalarda ve bazı deneysel sistemlerde gösterildi, ama bugünkü yaygın uygulamalarda henüz yer almıyor. Liste büyüdükçe devre büyür ve listenin her güncellemesinde ispatların hangi liste sürümüne göre üretildiği bilinmelidir.

== İptal edilmemişlik

Bir belgenin hâlâ geçerli olduğunu, yani veren kurumun onu iptal etmediğini göstermek, dizinin yedinci yazısının konusu. Bugünkü yaygın yöntemde kurum binlerce belgenin durumunu tek bir bit dizisinde yayımlar ve her belge bu dizide bir sıra numarası taşır. Doğrulayıcı, belgedeki sıra numarasına bakıp listede o bitin değerini okur.

Sıfır bilgi ispatıyla birlikte kullanıldığında bu yöntem bir çelişki doğurur. Sıra numarası her gösterimde aynıysa, iki doğrulayıcı o numarayı karşılaştırarak kişiyi eşleştirebilir; yani ispatın sağladığı bağlanamazlık iptal kontrolü yüzünden geri gelir. Çözüm, iptal edilmemişliği de ispatın içine almaktır: "Listedeki yerimdeki bit sıfır" ifadesini, yerin kendisini açmadan kanıtlamak. Bu da yapılabilir, ama devreyi büyütür ve listenin hangi sürümüne göre kanıtlandığı sorusunu getirir. Pratikte bugün sık kullanılan bir ara çözüm, sıfır bilgi ispatında kullanılan belgelerin #{strong[ömrünü kısaltmaktır]}. Belge birkaç saat ya da bir gün geçerliyse ve kurum iptal edilen bir belgenin yenisini vermiyorsa, ayrıca iptal kontrolüne gerek kalmaz. Bu yaklaşımın bedeli, cüzdanın kurumla daha sık konuşup belgeyi yenilemesidir.

== Bağlanamazlık: ispatın doğal sonucu

Yukarıdaki ifade türlerinin hepsinde, sıfır bilgi ispatının bir yan ürünü daha vardır. Aynı belgeden üretilen iki ispat birbirine bağlanamaz. Her ispat yeni rastgelelikle üretilir ve ispatta belgenin kendisine ait sabit bir değer (imza, anahtar, sıra numarası) görünmez. Seçici açıklamada iki sitenin aynı kişiyi tanımasını sağlayan bu sabit değerler, ispatta hiç ortaya çıkmaz.

Bu özellik, dizinin beşinci yazısında ayrıntılı ele alacağımız bağlanamazlık sorununa verilmiş en temiz matematiksel cevaptır. Bugün yaygın kullanılan alternatif, aynı belgenin birçok kopyasını almak ve her doğrulayıcıya ayrı kopya göstermektir. Bu yöntem çalışır, ama kopyalar tükenir ve yenilenmesi gerekir. Üstelik belgeyi veren kurum kopyaların hepsini kendisi imzaladığı için, kurumun doğrulayıcılarla iş birliği yapması hâlinde koruma zayıflar. Sıfır bilgi ispatında ise kurumun imzası ispatın içinde gizli kalır; kurum bile hangi ispatın kendi verdiği hangi belgeden üretildiğini bilemez.

#kutu("ornek", [Timur’un bir haftası])[
Pazartesi Timur bir video platformunda yaş sınırlı içeriğe erişmek için yaşını kanıtlar. Çarşamba bir bilet sitesinde konser bileti alırken yine kanıtlar. Cuma konserin kapısında, telefonunu görevlinin cihazına yaklaştırarak bir kez daha kanıtlar.

Seçici açıklamayla her gösterimde aynı belge kopyasını kullansaydı, üç doğrulayıcı da aynı imzayı ve aynı cihaz anahtarını görürdü. Video platformu ile bilet sitesi verilerini aynı reklam şirketine satsa, reklam şirketi iki kaydı aynı kişiye bağlayabilirdi. Sıfır bilgi ispatıyla ise üç doğrulayıcının elinde yalnızca "18 yaşından büyük, güvenilir bir kurumun belgesine dayanıyor" bilgisi kalır. Üç ispat arasında karşılaştırılabilecek ortak bir değer yoktur. Timur’un hangi gün hangi siteye girdiğini birleştirmek isteyen, bunu kriptografiden değil, başka izlerden (IP adresi, tarayıcı parmak izi, ödeme bilgisi) yapmak zorunda kalır.
]

Son cümle önemli bir uyarı taşıyor ve Bölüm 11’de ona döneceğiz. Sıfır bilgi ispatı kimlik belgesinin bıraktığı izi siler; ama kişinin internette bıraktığı diğer izleri silmez.

= Var Olan Belgeyle Sıfır Bilgi: ECDSA İmzalı mdoc Üzerinde İspat

== Kurumların imzası değişmeyecekse

Bölüm 3’teki tarihçede, sıfır bilgi ispatlarının otuz yılı aşkın bir süre kimlikte yaygınlaşamadığını söylemiştik. Nedenlerden biri şuydu: En verimli anonim belge sistemleri, belgeyi veren kurumun özel bir imza türü kullanmasını gerektiriyordu. Oysa dünyadaki kimlik altyapısı başka imzalar üzerine kurulu. Pasaport çipleri, mobil ehliyetler, Avrupa’nın kişi kimlik verisi ve doğrulanabilir belgelerin büyük çoğunluğu, eliptik eğrilere dayanan #{strong[ECDSA]} ile imzalanıyor.

ECDSA’nın bu kadar yaygın olmasının nedenleri sağlamdır. Onlarca yıldır kullanılıyor, uluslararası standartlara girmiş, devletlerin ve bankaların kullandığı donanım güvenlik modülleri ve telefonların güvenli donanımları onu doğrudan destekliyor. Bir ülkenin kimlik belgesi veren kurumunun imza altyapısını değiştirmesi ise yıllar süren bir iştir: yeni donanım, yeni sertifikalar, yeni denetimler, yeni yasal onaylar. Avrupa’nın cüzdan mimarisi de belge biçimi olarak SD-JWT VC ve mdoc’u, imza olarak da bu yerleşik algoritmaları seçti (dizinin ikinci yazısı).

Bu durumda iki yol var (Şekil 6):

#{strong[Birinci yol: imzayı değiştirmek.]} Kurumlar belgeyi, üzerinde sıfır bilgi ispatının doğal olarak yapılabildiği bir imzayla imzalar. BBS imzaları bu yolun bugünkü en olgun örneğidir \[25\]. Kişi, kurumun imzasından her seferinde yeni, birbirine bağlanamayan bir "türetilmiş ispat" üretir ve yalnızca istediği alanları açar. İspatlar küçük ve hızlıdır. Ama bu yol, kurumların imza altyapısını değiştirmesini gerektirir. BBS, eşleme (#{emph[pairing]}) dostu özel eliptik eğriler kullanır ve bu eğriler bugün yaygın güvenli donanımlarda desteklenmez. Avrupa’da onaylı kriptografik mekanizma listelerinde yer almaması da sık dile getirilen bir engeldir.

#{strong[İkinci yol: imzayı devrenin içinde doğrulamak.]} Kurumlar hiçbir şeyi değiştirmez; belgeyi bugün nasıl imzalıyorlarsa öyle imzalamaya devam eder. Kişinin cüzdanı, ispat üretirken ECDSA imza doğrulamasının tamamını Bölüm 5’teki gibi bir devre olarak çalıştırır ve "bu devreyi evet diyecek biçimde çalıştıran gizli bir imza ve belge biliyorum" diye kanıtlar. Sorun, bunun pahalı olmasıdır; bir ECDSA doğrulaması devre içinde çok sayıda kapı demektir. Yıllarca bu yolun telefonda pratik olmadığı düşünüldü.

#sekil(6, [Sıfır bilgiye iki yol: kurumun imzasını değiştirmek ya da var olan imzayı devrede doğrulamak], "figures/a4/sekil-6.svg", yarim: false)

== Telefonda saniyeler içinde ECDSA ispatı

2024’ün sonunda bir araştırma ekibi, "ECDSA’dan Anonim Belgeler" başlıklı bir makale yayımladı \[13\]. Makale, ikinci yolun telefonda pratik olabileceğini gösteriyordu. Yazarlar ispat sistemini baştan ECDSA’ya göre tasarladı: Bölüm 5.4’te andığımız Ligero sistemini toplam kontrolü protokolüyle birleştirdiler, gereken matematiksel alanlar için verimli kodlama yöntemleri geliştirdiler ve ECDSA doğrulaması için özel devreler kurdular. Makalenin bildirdiğine göre tek bir ECDSA imzası için ispat 60 milisaniyede üretilebiliyor; ISO mdoc standardındaki gösterim akışının tamamı için ispat ise, belgenin boyutuna bağlı olarak, mobil cihazlarda yaklaşık 1,2 saniye sürüyor.

Makalenin vurguladığı üç özellik, bu yaklaşımı kimlik için çekici kılıyor. Belgeyi veren kurumun süreçlerinde hiçbir değişiklik gerekmiyor. Telefonların donanımında ya da işletim sisteminde güncelleme gerekmiyor. Ve sistem alışılmadık kriptografik varsayımlara dayanmıyor; güvenliği esas olarak iyi bilinen özet fonksiyonlarına dayanıyor ve güvenilir kurulum gerektirmiyor.

Yaklaşım kısa sürede sahaya çıktı. Nisan 2025’te büyük bir mobil cüzdan, kullanıcıların yaşlarını doğum tarihlerini paylaşmadan kanıtlayabilmesi için sıfır bilgi ispatlarını kullanmaya başladığını duyurdu \[14\]. 3 Temmuz 2025’te ispat kütüphanesi "Longfellow ZK" adıyla açık kaynak olarak yayımlandı \[14\]; duyuruda, üye devletlerin bu araçları gelecekteki AB cüzdanlarına katabileceği özellikle belirtildi. Sistemin tanımı bir İnternet taslağı olarak İnternet Araştırma Görev Gücü’nün (IRTF) kriptografi araştırma grubuna sunuldu ve Ekim 2026’da grubun çalışma belgesi oldu \[16\]. Proje sayfasına göre ispat şeması üç bağımsız güvenlik incelemesinden geçti. İncelemelerin ikisinde mdoc devresinde, devrenin bazı gizli değerleri yeterince kısıtlamadığı hatalar bulundu ve düzeltildi. Bu ayrıntı küçük görünebilir, ama Bölüm 11’de tartışacağımız bir noktayı somutlaştırıyor: İspat sisteminin matematiği sağlam olsa bile, devrenin kendisi bir yazılımdır ve yazılım gibi denetlenmelidir.

== Devre tam olarak neyi kanıtlıyor?

Bir mdoc belgesinin içini dizinin ikinci ve üçüncü yazılarında anlatmıştık. Burada kısaca hatırlayalım, çünkü ispat devresi bu yapının her parçasına dokunur.

Bir mdoc’ta kurum, kişinin bilgilerini doğrudan imzalamaz. Her alan (ad, doğum tarihi, #{raw("age_over_18")} ve diğerleri) rastgele bir tuzla birleştirilip özetlenir. Kurum bu özetlerin listesini, belgenin türünü, geçerlilik tarihlerini ve kişinin cihazındaki anahtarın açık yarısını tek bir yapıda toplar. Bu yapıya #{strong[mobil güvenlik nesnesi]} (#{emph[Mobile Security Object]}, MSO) denir ve kurumun imzaladığı şey budur. Kişi belgeyi gösterirken, açmak istediği alanları tuzlarıyla birlikte gönderir ve o anki oturuma ait bir veriyi cihaz anahtarıyla imzalar. Doğrulayıcı açılan alanların özetini hesaplar, MSO’daki özetlerle karşılaştırır, kurumun imzasını ve cihaz imzasını doğrular.

Sıfır bilgi ispatında bu kontrollerin hepsi devrenin içine taşınır. Doğrulayıcı MSO’yu, imzaları ya da tuzları görmez. Yalnızca devrenin "evet" dediğine dair ispatı görür (Şekil 7).

#kutu("teknik", [mdoc yaş devresinin açık ve gizli girdileri])[
Aşağıdaki tablo ve kontroller, ECDSA imzalı bir mdoc için yaş ispatı devresinin tipik girdilerini sadeleştirerek gösterir. Gerçek devrelerin ayrıntıları ilgili belirtimlerde tanımlanır; alan adları ISO\/IEC 18013-5’tekilerdir, değerler örnektir. Girdilerin bir kısmı #{strong[açıktır]} (doğrulayıcı da bilir), bir kısmı #{strong[gizli tanıktır]} (yalnız telefonda durur):

#tablo([], (13fr, 8fr, 40fr), ([Girdi], [Kim bilir], [İçerik],), (
  ([#{raw("issuer_pk")}], [açık], [veren kurumun ECDSA P-256 açık anahtarı (güven listesinden)],),
  ([#{raw("doc_type")}], [açık], [#{raw("\"org.iso.18013.5.1.mDL\"")} ya da bir kimlik belgesi türü],),
  ([#{raw("now")}], [açık], [şu anki zaman, ör. #{raw("2026-11-26T09:00:00Z")}],),
  ([#{raw("session")}], [açık], [oturum dökümü (doğrulayıcının nonce’u ve kimliği dahil)],),
  ([#{raw("claim")}], [açık], [ad alanı + #{raw("\"age_over_18\" = true")}],),
  ([#{raw("mso")}], [gizli tanık], [mobil güvenlik nesnesinin tamamı],),
  ([#{raw("issuer_sig")}], [gizli tanık], [kurumun MSO üzerindeki ECDSA imzası $(r, s)$],),
  ([#{raw("salt")}, #{raw("digestID")}], [gizli tanık], [#{raw("age_over_18")} alanının tuzu ve özet sıra numarası],),
  ([#{raw("device_pk")}], [gizli tanık], [MSO içindeki cihaz anahtarı],),
  ([#{raw("device_sig")}], [gizli tanık], [cihaz anahtarının oturum dökümü üzerindeki ECDSA imzası],),
))

Devre bu girdilerle beş kontrol yapar ve beşi de tutarsa "evet" der:

#formul[$ (1) quad & "ECDSA.verify"("issuer_pk", "SHA-256"("mso"), "issuer_sig") = "doğru" \
(2) quad & "mso.docType" = "doc_type" \
(3) quad & "mso.validFrom" <= "now" <= "mso.validUntil" \
(4) quad & "SHA-256"("salt" ‖ "“age_over_18”" ‖ "true") = "mso.valueDigests"["digestID"] \
(5) quad & "ECDSA.verify"("mso.deviceKey", "SHA-256"("session"), "device_sig") = "doğru" $]

Dördüncü kontrol, seçici açıklamanın devredeki karşılığıdır: Alanın değeri açılır (#{raw("true")}), ama tuzu ve özet sıra numarası gizli kalır. Beşinci kontrol, belgenin ödünç alınmasını zorlaştırır; ispat ancak cihaz anahtarına erişen biri tarafından üretilebilir. Cihaz anahtarı telefonun güvenli donanımında duruyorsa, anahtarın kendisi devreye hiç girmez: Güvenli donanım oturum dökümünü olağan biçimde imzalar, devre bu imzayı gizli girdi olarak alır ve doğrular.

Devre büyük ölçüde iki ECDSA doğrulaması ve birkaç SHA-256 hesabından oluşur. Bu yüzden ispat boyu ve süresi, yaş koşulundan çok bu işlemlere bağlıdır. Devrenin hangi belge türünü, hangi alan grubunu ve hangi dökümü bağladığı, devrenin sürümüne göre değişebilir; doğrulayıcının bunu bilmesi ve yalnızca incelenmiş devreleri kabul etmesi gerekir.
]

#sekil(7, [ECDSA imzalı bir mdoc üzerinde yaş ispatı: kim neyi görür?], "figures/a4/sekil-7.svg", yarim: false)

== Doğrulayıcı neye güvenir?

Sıfır bilgi ispatı doğrulayıcıya "bu devre evet dedi" der. Ama doğrulayıcının iki soruya daha cevap bulması gerekir.

Birincisi, #{strong[hangi kurumun anahtarı?]} Kurumun açık anahtarı ispatın açık girdisidir. Doğrulayıcı bu anahtarın gerçekten yetkili bir kimlik belgesi verene ait olduğunu, ispattan bağımsız olarak bilmelidir. Bu bilgi, dizinin altıncı yazısında anlatacağımız güven listelerinden gelir. Sıfır bilgi ispatı güvenin kaynağını değiştirmez; yalnızca belgenin içeriğini gizler.

İkincisi, #{strong[hangi devre?]} Doğrulayıcı, ispatın doğru devreye göre üretildiğinden emin olmalıdır. Kötü tasarlanmış ya da kasten gevşetilmiş bir devre, örneğin imzayı hiç kontrol etmeyen bir devre, her ispata "evet" dedirtebilir. Bu yüzden ciddi sistemlerde kabul edilen devreler, içeriklerinin özetiyle (parmak iziyle) tanımlanır ve bu özetler güvenilir bir yerde yayımlanır. Doğrulayıcı, listede olmayan bir devreye göre üretilmiş ispatı reddeder. Devrenin herkesin tekrar derleyip aynı özeti elde edebileceği biçimde yayımlanması ("yeniden üretilebilir derleme") bu güveni güçlendirir.

= Avrupa’nın Yaş Doğrulama Çalışması ve Mimari Çerçevedeki Yol Haritası

== Neden yaş?

Avrupa Birliği’nde sıfır bilgi ispatlarının ilk büyük ölçekli kullanım alanının yaş doğrulama olması tesadüf sayılmaz. Dijital Hizmetler Yasası’nın 28. maddesi, küçüklerin erişebildiği çevrimiçi platformlardan, küçüklerin mahremiyetini, güvenliğini ve emniyetini korumak için uygun ve orantılı önlemler almalarını ister. Avrupa Komisyonu, 14 Temmuz 2025’te bu maddenin uygulanmasına yönelik yönergeleri yayımladı \[17\]. Yönergeler bağlayıcı değildir, ama Komisyon platformların yükümlülüklerine uyup uymadığını değerlendirirken onları esas alacağını belirtir. Aynı gün Komisyon, yönergelerdeki etkinlik ölçütlerini karşılamak üzere tasarlanmış bir yaş doğrulama çözümünün ilk sürümünü yayımladı \[18\].

Yaş doğrulama, sıfır bilgi ispatları için neredeyse ideal bir ilk kullanım alanıdır. Sorulan soru tektir ve evet ya da hayır cevabı vardır. Doğrulayıcılar (yetişkin içerikli siteler, oyun ve sosyal medya platformları) kişinin kimliğini bilmeye ihtiyaç duymaz, çoğu zaman bilmemesi de istenir. Mahremiyet riski çok yüksektir: Bir kişinin hangi yetişkin içerikli siteleri ziyaret ettiğinin kimliğiyle birlikte kaydedilmesi, ağır sonuçlar doğurabilecek bir veri sızıntısı riskidir. Kullanıcı sayısı da çok büyüktür; bir çözüm benimsenirse milyonlarca kişi her gün kullanır.

== Çözüm nasıl çalışıyor?

Komisyon’un yaş doğrulama çözümü, AB dijital kimlik cüzdanıyla aynı teknik temeller üzerine kurulu, ama ondan bağımsız da kullanılabilen bir "mini cüzdan" olarak tasarlandı \[18\]. Akış kabaca şöyle işler (Şekil 8):

+ Kişi, yaş doğrulama uygulamasını telefonuna kurar ve bir #{strong[yaş ispatı sağlayıcısı]} aracılığıyla yaşını bir kez doğrular. İkinci sürümle birlikte bu doğrulama için ulusal elektronik kimliklerin yanında pasaport ve kimlik kartları da kullanılabilir hâle geldi.
+ Sağlayıcı, uygulamaya bir #{strong[yaş ispatı belgesi]} paketi verir. Kamuya açık belirtime göre bu belge ISO\/IEC 18013-5 mdoc biçimindedir ve yalnızca #{raw("age_over_18")} ve #{raw("age_over_21")} gibi birkaç evet-hayır alanı taşır; kişinin adı ya da doğum tarihi belgede yoktur. Her belge yalnızca bir kez kullanılır; belgelerin otuzarlık paketler hâlinde verilmesi ve en çok üç ay geçerli olması önerilir.
+ Kişi yaş sınırlı bir siteye girdiğinde, site uygulamadan yaş ispatı ister. İkinci sürümle birlikte bu istek, tarayıcıların cüzdanla doğrudan konuşmasını sağlayan Digital Credentials API üzerinden de yapılabilir hâle geldi.
+ Site, belgenin imzasını güvenilir yaş ispatı sağlayıcılarının listesine göre doğrular. Sağlayıcı, belgenin nerede kullanıldığını öğrenmez.

#sekil(8, [AB yaş doğrulama çözümünün sadeleştirilmiş akışı], "figures/a4/sekil-8.svg", yarim: false)

Bu tasarımda bağlanamazlık iki katmanda sağlanıyor. İlk katman #{strong[tek kullanımlık kopyalardır]}: Her siteye paketteki farklı bir belge gösterilir; iki site aynı imzayı ya da aynı cihaz anahtarını görmez. Belirtim ayrıca, aynı paketteki belgelerin zaman damgalarının birbirinden ayırt edilemeyecek biçimde yuvarlanmasını ister; böylece "aynı saniyede verilmiş" belgeler eşleştirilemez. İkinci katman sıfır bilgi ispatıdır. Komisyon’un 10 Ekim 2025’teki duyurusu, sıfır bilgi teknolojisinin yıl sonundan önce bir sürüme eklenmesi için çalışmanın sürdüğünü söylüyordu \[18\]. Çözümün belirtimindeki sıfır bilgi eki, kullanılan yöntemi açıkça tanımlıyor: Bölüm 7.2’deki ECDSA tabanlı anonim belgeler, Ligero protokolü üzerine kurulu biçimiyle. Ekte, yaş ispatı sağlayıcısının bu yöntemin kullanıldığından habersiz kaldığı ve belge verme sürecinde hiçbir değişiklik gerekmediği vurgulanıyor \[18\].

Danimarka, Fransa, Yunanistan, İtalya ve İspanya çözümü ilk benimseyen üye devletler oldu \[18\]. Komisyon’un sayfasına göre çözümün işlevleri 15 Nisan 2026’da tamamlandı; artık üye devletler ve piyasa aktörleri onu kendilerine uyarlayabiliyor. Komisyon ayrıca, üye devletlerin yaş doğrulamayı 2026 sonuna kadar yaygınlaştırması için atacakları adımları sıralayan bir tavsiye kabul etti \[18\].

Çözüm eleştirisiz de değil. Dijital haklar alanında çalışan bir Avrupa sivil toplum ağı, Eylül 2026’da yayımladığı bir değerlendirmede, belirtimdeki bağlanamazlık şartının "sağlamak" yerine "zorlaştırmak" biçiminde yazıldığını ve sıfır bilgi ispatlarının zorunlu değil önerilen bir seçenek olarak kaldığını eleştirdi; tek kullanımlık kopyaların tuz ve özet gibi benzersiz değerler taşıdığını ve sağlayıcının iş birliğiyle yeniden kimliklendirmeye açık olabileceğini hatırlattı \[24\]. Bu eleştiriler, bu yazının ana tezini destekliyor: Kopyalarla sağlanan bağlanamazlık doğrulayıcılar arasında iyi çalışır, ama veren kurumun da işin içine girdiği senaryolarda sıfır bilgi ispatı belirgin biçimde daha güçlü bir korumadır.

== Mimari çerçevede sıfır bilgi

Yaş doğrulama çözümü ayrı bir uygulama olarak başladı, ama hedef, aynı işlevin üye devletlerin AB dijital kimlik cüzdanlarına katılmasıdır. Cüzdanın teknik kurallarını belirleyen Mimari ve Başvuru Çerçevesi (ARF), sıfır bilgi ispatlarını baştan beri gündeminde tutuyor. Çerçevenin tartışma belgelerinden biri ("Topic G") doğrudan sıfır bilgi ispatlarına ayrılmıştır; bu ispatlar için üst düzey gereksinimler ise çerçevenin ekinde ayrı bir başlıkta (Topic 53) toplanmıştır \[21\].

Çerçeveyi tamamlayan teknik şartnameler arasında sıfır bilgi ispatlarına ayrılmış üç belge var \[21\]. Bunlardan biri cüzdanda sıfır bilgi ispatının genel uygulamasını, ikisi ise Bölüm 7.1’deki iki yolu ayrı ayrı ele alıyor: #{strong[aritmetik devrelere dayanan]} sıfır bilgi ispatları (var olan ECDSA belgeleri üzerinde devre içinde doğrulama) ve #{strong[çoklu ileti imzalarına dayanan]} sıfır bilgi ispatları (BBS türü imzalar). Avrupa’nın iki yolu birlikte takip etmesi dikkat çekici. Kısa vadede kurumların imzasını değiştirmeden çalışan yol öne çıkıyor; uzun vadede ise kurumların yeni imza türlerine geçmesiyle daha küçük ve hızlı ispatların önü açılabilir. Çerçevenin Temmuz 2026’da yayımlanan 3.0.0 sürümü, bu konudaki tartışmaların sürdüğünü ve ekosistemde desteklenecek belirli bir sıfır bilgi şemasının henüz seçilmediğini açıkça yazıyor; nedenler arasında bu ispatları güvenli donanımda uygulamanın karmaşıklığını ve bugünkü güvenli donanımlarda desteğin bulunmamasını sayıyor \[21\].

Standartlar tarafında Avrupa Telekomünikasyon Standartları Enstitüsü (ETSI), seçici açıklama ve sıfır bilgi ispatlarını AB’nin öznitelik onaylarına uygulamanın yollarını inceleyen bir teknik rapor yayımlıyor. Raporun ilk sürümü Ağustos 2023’te çıktı; Temmuz 2024’teki sürüm sıfır bilgi ispatı şemalarının araştırma, standartlaşma ve uygulama durumuna geniş bir genel bakış ekledi; Ağustos 2025’te ise rapor yeni bir numarayla, çok parçalı bir dizinin ilk parçası olarak güncellendi \[20\].

Bugün için dürüst tablo şöyle. Avrupa’da bağlanamazlığın varsayılan yöntemi hâlâ tek kullanımlık belge kopyaları. Sıfır bilgi ispatı ise belirtimlerde tanımlanmış, sahada denenmiş ve yaş doğrulamada kullanılmaya başlanmış, ama henüz her cüzdanda ve her belge türünde bulunan bir özellik değil. Bu durumun teknik nedenlerine bir sonraki bölümde bakıyoruz.

#kutu("ornek", [Timur ve Avrupa’daki kuzeni])[
Timur’un kuzeni Dilnoza Roma’da yaşıyor ve İtalya’nın yaş doğrulama uygulamasını kullanıyor. Uygulamaya yaşını bir kez, kimlik kartını telefonuna okutarak kanıtladı. Bir oyun platformu 18 yaş kontrolü istediğinde telefonu ona, paketteki otuz belgeden birini kullanarak bir ispat gösteriyor. Platform yalnızca "18 yaşından büyük: evet" bilgisini ve ispatın güvenilir bir sağlayıcının belgesine dayandığını öğreniyor.

Dilnoza’nın bilmediği bir ayrıntı var: Telefonu ispatı sıfır bilgiyle mi, yoksa tek kullanımlık bir belgeyi doğrudan göstererek mi üretti? Kullanıcı açısından iki yol aynı görünür. Fark, sağlayıcı ile platformların bir gün verilerini birleştirmek istemesi hâlinde ortaya çıkar. Tek kullanımlık belgede sağlayıcı kendi imzaladığı belgeyi tanıyabilir; sıfır bilgi ispatında tanıyamaz.
]

= Performans ve Cihaz Sınırları

Sıfır bilgi ispatları matematiksel olarak zarif, ama bir telefonun üzerinde, bir sitenin ödeme sayfasında, bir konserin kapısında çalışmak zorundalar. Bu bölümde sahada karşılaşılan sınırları tek tek ele alıyoruz.

== İspat süresi

Bir dijital imza bir telefonda milisaniyeler içinde atılır. Sıfır bilgi ispatı ise çok daha fazla hesap gerektirir. ECDSA tabanlı yaklaşımın makalesi, mdoc gösterimi için mobil cihazlarda yaklaşık 1,2 saniyelik bir süre bildiriyor \[13\]. Bu süre bir web sitesinde kabul edilebilir; kullanıcı zaten bir onay ekranına bakıyordur. Ama süre cihazdan cihaza büyük farklar gösterebilir. İspatçının hızı, işlemcinin özel komut setlerinin (vektör işlemleri gibi) kullanılıp kullanılmadığına çok bağlıdır. Aynı kod, bu komutları kullanmayan genel bir derlemede birkaç kat yavaş çalışabilir. Eski ya da düşük donanımlı telefonlarda süre birkaç saniyeye çıkabilir. Kapıda sıra bekleyen bir kalabalık için birkaç saniye, sayfa başında bekleyen bir kullanıcıya göre çok daha uzun hissedilir.

== İspat boyu

Bir ECDSA imzası 64 bayttır. Seçici açıklamalı bir mdoc gösterimi, açılan alanlara göre birkaç kilobayt tutar. Ligero tabanlı bir sıfır bilgi ispatı ise #{strong[yüzlerce kilobayt]} tutabilir. Tamga Network’ün açık belgelerinde yayımlanan bir masaüstü ölçümünde, tek alanlı bir yaş ispatı yaklaşık 343 kilobayt geldi \[15\]. Bu boyut, internet üzerinden gönderilen bir istek için sorun yaratmaz. Ama yüz yüze gösterimde iki sonucu var. Birincisi, ispat bir QR koda sığmaz; bir QR kod en fazla birkaç kilobayt taşıyabilir. İkincisi, Bluetooth gibi yakın alan bağlantılarında aktarım süresi, ispat süresinin üzerine eklenir. Dizinin dokuzuncu yazısında anlatacağımız yüz yüze doğrulamada, sıfır bilgi ispatının yeri bu yüzden henüz netleşmiş değil.

#tablo([#{strong[Tablo 2.]} Bir yaş kontrolünde doğrulayıcıya giden verinin kaba boyutları (değerler büyüklük sırasıdır).], (30fr, 30fr, 21fr, 33fr), ([Yöntem], [Doğrulayıcıya giden], [Kaba boyut], [Bağlanabilirlik],), (
  ([Kimlik kartı fotoğrafı], [kartın iki yüzünün görüntüsü], [yüzlerce kilobayt – birkaç megabayt], [tam kimlik açılır],),
  ([Seçici açıklama (tek kopya)], [açılan alan + tuz + imzalı MSO + cihaz imzası], [birkaç kilobayt], [imza ve cihaz anahtarı her seferinde aynı],),
  ([Seçici açıklama (tek kullanımlık kopyalar)], [aynı, ama her seferinde farklı kopya], [birkaç kilobayt], [doğrulayıcılar arasında yok; veren kurum kopyayı tanır],),
  ([Devre tabanlı sıfır bilgi ispatı (ECDSA mdoc)], [ispat + açılan değer], [yüzlerce kilobayt], [yok; veren kurum da tanıyamaz],),
  ([İmza tabanlı türetilmiş ispat (BBS)], [türetilmiş ispat + açılan değer], [birkaç yüz bayt – birkaç kilobayt], [yok; ama kurumun BBS ile imzalaması gerekir],),
))

== Bellek, pil ve işletim sistemleri

İspat üretimi, bir mesajlaşma uygulamasının yapmadığı ölçüde bellek kullanır; yaş ispatı gibi küçük devreler için bile on megabaytlarca, büyük devrelerde çok daha fazlası gerekir. Arka planda çalışan uygulamaların belleğini sıkı yöneten mobil işletim sistemlerinde bu, ispatın ön planda ve kullanıcı ekrana bakarken üretilmesi gerektiği anlamına gelir.

Daha pratik bir engel de kütüphanelerin her platformda hazır olmamasıdır. İspatçılar genellikle C++ ya da Rust gibi dillerde yazılır ve her mobil işletim sistemi için ayrı derlenmeleri, paketlenmeleri ve uygulama mağazalarının kurallarına uydurulmaları gerekir. Bir cüzdanın bir platformda sıfır bilgi ispatı üretebilirken öbüründe üretememesi bugün olağan bir durumdur. Bu yüzden sahadaki sistemler, ispat üretilemediğinde tek kullanımlık kopyalarla olağan gösterime geri dönen bir #{strong[yedek yol]} tutar.

== Doğrulayıcı tarafı

İspatı doğrulamak, üretmekten çok daha hızlıdır; Ligero tabanlı sistemlerde bile genellikle bir saniyenin altında kalır. Ama doğrulayıcı tarafında başka bir maliyet vardır: Doğrulayıcının yazılımı, kabul ettiği her devrenin sürümünü bilmeli, devre güncellendiğinde güncellenmeli ve güven listesindeki kurum anahtarlarını ispat sistemine doğru biçimde vermelidir. Küçük bir web sitesi için bu iş, bir imza doğrulama kütüphanesi eklemekten daha fazladır. Bu yüzden doğrulama hizmetlerinin ve hazır kütüphanelerin olgunlaşması, ispatların yaygınlaşmasının ön koşullarından biridir.

== Ne zaman ispat, ne zaman kopya?

Bütün bu sınırlar, sıfır bilgi ispatlarının bugün her durumda en iyi seçenek olmadığını gösteriyor. Kaba bir karar çerçevesi şöyle çizilebilir. Doğrulayıcı uzaktaysa, internet bağlantısı iyiyse ve veren kurumun izleme riski önemliyse (yetişkin içerik, sağlık, siyasi ya da dinî içerik gibi hassas alanlar), sıfır bilgi ispatı belirgin bir kazanç sağlar. Yüz yüze, hızlı ve çevrimdışı gösterimlerde (kapıda bilet kontrolü, kasada yaş kontrolü) tek kullanımlık kopyalarla seçici açıklama bugün daha pratiktir. İki yolu birlikte destekleyen cüzdanlar, durumun gerektirdiğini seçebilir.

= Yöntemlerin Karşılaştırması

Bu noktada yaşı kanıtlamanın bütün yollarını yan yana koyabiliriz. Tablo 3, Timur’un konser bileti örneğinden yola çıkarak, bugün kullanılan ya da kullanılmaya başlanan yöntemleri aynı sorularla karşılaştırıyor.

#tablo([#{strong[Tablo 3.]} Yaş doğrulama yöntemlerinin karşılaştırması.], (26fr, 11fr, 14fr, 13fr, 17fr, 16fr, 13fr), ([Ölçüt], [Kimlik kartı kopyası], [Yüzden yaş tahmini], [Seçici açıklama (tek kopya)], [Tek kullanımlık kopyalar], [Devre tabanlı sıfır bilgi (ECDSA)], [İmza tabanlı sıfır bilgi (BBS)],), (
  ([Doğrulayıcı ne görür?], [kartın tamamı], [yüz görüntüsü], [yaş alanı, imza, cihaz anahtarı], [yaş alanı, kopyaya özel imza ve anahtar], [yalnız yaş ifadesi], [yalnız açılan alan],),
  ([Sonuç kesin mi?], [evet (kart gerçekse)], [hayır, tahmin], [evet], [evet], [evet], [evet],),
  ([Doğrulayıcılar kişiyi eşleştirebilir mi?], [evet], [yüz üzerinden mümkün], [evet], [hayır], [hayır], [hayır],),
  ([Veren kurum, doğrulayıcılarla iş birliği yaparsa izleyebilir mi?], [—], [—], [evet], [evet], [hayır], [hayır],),
  ([Veren kurumun değişmesi gerekir mi?], [hayır], [—], [hayır], [kopya sayısı artar], [hayır], [evet, yeni imza türü],),
  ([Cihaz yükü], [yok], [kamera], [çok düşük], [düşük (kopyaların yenilenmesi)], [yüksek (saniyeler, yüzlerce kilobayt)], [düşük],),
  ([Çevrimdışı, yüz yüze uygunluk], [evet], [evet], [evet], [evet], [sınırlı], [evet],),
  ([Standart durumu], [—], [ISO\/IEC çalışmaları sürüyor], [yerleşik (SD-JWT VC, mdoc)], [yerleşik (AB’nin varsayılanı)], [AB şartnamesi ve IETF taslağı], [AB şartnamesi ve IETF taslağı],),
))

Tabloyu okurken üç noktaya dikkat etmek gerekiyor.

Birincisi, sağa doğru gittikçe doğrulayıcının gördüğü bilgi azalıyor, ama bir maliyet de bir yerden başka bir yere taşınıyor. Kimlik kartı kopyasında maliyeti kişinin mahremiyeti ödüyor; sıfır bilgi ispatında ise telefonun işlemcisi, ispat sistemini geliştirenler ve devreleri denetleyenler ödüyor. Mahremiyet bedava gelmiyor; bedeli kimin ödediği değişiyor.

İkincisi, "veren kurum izleyebilir mi?" satırı, tek kullanımlık kopyalar ile sıfır bilgi ispatı arasındaki asıl farkı gösteriyor. Doğrulayıcılar arasında iki yöntem de aynı korumayı sağlar. Fark, kimlik belgesini veren kurumun, yani çoğu zaman devletin ya da devletin yetkilendirdiği bir kuruluşun, doğrulayıcılarla birlikte hareket ettiği senaryoda ortaya çıkıyor. Dizinin ilk yazısında devlet destekli cüzdanların risklerinden söz ederken bu senaryoya değinmiştik. Sıfır bilgi ispatı, bu riske karşı teknik bir güvence koyan tek yöntem.

Üçüncüsü, yüzden yaş tahmini tablonun dışında bir yerde duruyor. Kriptografik bir kanıt sunmuyor, bir olasılık tahmini sunuyor. Hiçbir belge gerektirmemesi onu erişilebilir kılıyor, ama eşiğe yakın yaşlarda yanılabiliyor ve biyometrik veri işliyor. Bazı düzenlemeler bu yöntemi belgeye dayalı yöntemlerle birlikte kabul ediyor. Bu yazının konusu kriptografik yöntemler olduğu için bu yolu ayrıntılı tartışmıyoruz.

= Sınırlar ve Açık Sorular

Sıfır bilgi ispatları kimlikte mahremiyet için bugün bilinen en güçlü araç. Ama hiçbir araç bütün sorunları çözmüyor ve bu aracın sınırlarını açıkça söylemek, ondan doğru beklentiler kurmak için gerekli.

#{strong[İspat, aşırı istemeyi engellemez.]} Sıfır bilgi ispatı, doğrulayıcının istediği şeyi en az bilgiyle vermeyi sağlar; ama doğrulayıcının neyi isteyebileceğine karar vermez. Bir site 18 yaş ispatı yerine tam kimlik isterse, cüzdan bunu matematikle engelleyemez. Dizinin ilk yazısında "aşırı kimlik isteme" riskinden söz etmiştik. Kanıt göstermek kolaylaştıkça, gerekmeyen yerlerde de kanıt istenmesi riski artar. Bu riski sınırlayan şey hukuktur: Doğrulayıcıların hangi bilgiyi hangi amaçla isteyebileceklerini önceden kaydettirmeleri ve cüzdanın, kayıtlı olmayan istekler karşısında kullanıcıyı uyarması. Avrupa’nın yaş doğrulama çözümüne yöneltilen eleştirilerden biri de, bazı ülkelerin yalnız yaş yerine tam kimlik istemeyi planlamasıydı \[24\].

#{strong[İspat belgeyi kanıtlar, telefonun başındakini değil.]} Devre, ispatın belgenin bağlı olduğu cihaz anahtarıyla üretildiğini kanıtlar. Ama 15 yaşındaki bir çocuğun ebeveyninin kilidi açık telefonunu kullanmasını engelleyemez. Cihazın kullanıcıyı PIN ya da biyometriyle doğrulaması bu riski azaltır; ortadan kaldırmaz. Yüz yüze doğrulamada görevli kişiye bakabilir; uzaktan doğrulamada ise bu bağın gücü cihazın güvenliğine bağlıdır (dizinin onuncu yazısı).

#{strong[Kimlik izi siler, diğer izleri silmez.]} Bölüm 6.5’teki örnekte gördüğümüz gibi, iki site Timur’u kimlik belgesinden eşleştiremese bile IP adresinden, tarayıcı parmak izinden, ödeme bilgisinden, hesabına verdiği e-posta adresinden eşleştirebilir. Sıfır bilgi ispatı mahremiyeti tek başına sağlamaz; mahremiyet zincirinin yalnızca bir halkasıdır.

#{strong[Devreye kim güvenecek?]} Bir imza algoritması on yıllarca incelenir ve sonra değişmeden kullanılır. Bir devre ise belirli bir belge biçimi, belirli bir ifade ve belirli bir sürüm için yazılmış bir yazılımdır. Bölüm 7.2’de bir devrede eksik bir kısıt bulunup düzeltildiğini gördük. Eksik bir kısıt, devrenin olması gerekenden fazla ispata "evet" demesi, yani sağlamlığın bozulması anlamına gelir. Hangi devrelerin kabul edileceğine kim karar verecek, bu devreleri kim denetleyecek, bir açık bulunduğunda eski ispatlar ne olacak? Bunlar teknik olduğu kadar yönetişim sorularıdır ve cevapları henüz oturmuş değil.

#{strong[İptal ve tazelik.]} Bölüm 6.4’te gördüğümüz gibi, iptal kontrolü ile bağlanamazlık arasında bir gerilim var. Kısa ömürlü belgeler bugün pratik bir ara çözüm; ama cüzdanın sık sık veren kurumla konuşmasını gerektiriyor ve veren kurumun "bu kişi bugün belge yeniledi" bilgisini görmesine yol açıyor. İptal edilmemişliği ispatın içinde, verimli ve standart bir biçimde kanıtlamak açık bir araştırma ve standartlaşma konusu.

#{strong[Onay ve sertifikasyon.]} Kamu kimlik sistemlerinde kullanılan kriptografik algoritmalar, ulusal ve Avrupa düzeyinde onaylanmış listelerden seçilir ve cüzdanlar bu listelere göre sertifikalandırılır. Sıfır bilgi ispat sistemleri bu listelere görece yeni giriyor. Bir ispat sisteminin resmî onay süreçlerinden geçmesi, matematiğinin doğru olmasından ayrı ve zaman alan bir iştir.

#{strong[Kuantum sonrası.]} Ligero tabanlı ispatlar özet fonksiyonlarına dayandığı için kuantum bilgisayarlara karşı görece dayanıklıdır. Ama ispatın içinde doğrulanan şey, kurumun ECDSA imzasıdır. Güçlü bir kuantum bilgisayar ECDSA’yı kırabilirse, sahte belgeler üretilebilir ve bu belgeler üzerinde de "geçerli" ispatlar üretilebilir. Sıfır bilgi katmanı, altındaki imzanın güvenliğinden daha güvenli olamaz. Kimlik belgelerinin kuantum sonrası imzalara geçişi dizinin son yazısının konusu.

#{strong[Anlaşılabilirlik.]} Kişi, telefonunun neyi kanıtladığını ekranda görür ama ispatın kendisini okuyamaz. "Bu site yalnızca 18 yaşından büyük olduğunuzu öğrenecek" cümlesinin doğru olduğuna güvenmek, cüzdanın ve devrenin doğru yazıldığına güvenmek demektir. Bu yüzden cüzdanların açık kaynaklı olması, devrelerin yeniden üretilebilir biçimde yayımlanması ve bağımsız incelemeler, teknik bir lüks olmaktan çok güvenin kendisinin parçası.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisini yayımlayan Tamga Network, dizinin ilk yazısında anlattığımız gibi, Türkiye ve Türk dünyası için AB’nin dijital kimlik profilleriyle uyumlu, kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır. Ağ kendisi bir cüzdan işletmez; belge veren kurumları, cüzdanları ve doğrulayıcıları imzalı güven listelerinde listeler ve açık kaynak yazılım paketleri yayımlar. Sıfır bilgi ispatları açısından kamuya açık belgelerinde ve yazılımında şunlar yer alıyor \[15\]:

- Ağın açık kaynak paketleri arasında, cüzdan tarafında ECDSA imzalı mdoc belgeleri üzerinde sıfır bilgi ispatı üreten bir ispatçı paketi ve doğrulayıcı tarafında bu ispatları doğrulayan bir modül bulunuyor. İkisi de bu yazının Bölüm 7’de anlattığı Longfellow ZK yaklaşımını kullanıyor; belge veren kurumların imzalarında hiçbir değişiklik gerekmiyor.
- Doğrulayıcının kabul ettiği devreler, içeriklerinin özetiyle ağın imzalı güven listesinde yayımlanıyor ve devreler, herkesin aynı özeti yeniden elde edebileceği biçimde derleniyor. Böylece Bölüm 7.4’teki "hangi devre?" sorusunun cevabı da kurum anahtarları gibi imzalı listeden geliyor.
- İlk desteklenen ifade, kimlik belgesindeki "18 yaşından büyük" alanı. Bölüm 6.4’teki iptal gerilimi, ispatın yalnızca en çok 24 saat geçerli kısa ömürlü kopyalarla üretilmesiyle çözülüyor; iptal edilen bir belgenin kopyası yenilenmiyor.
- İspatçı bugün yalnızca bir mobil işletim sisteminde çalışıyor. İspat üretilemediğinde cüzdan, Bölüm 9.3’teki gibi tek kullanımlık kopyalarla olağan gösterime geri dönüyor.

Bu yaklaşım, Avrupa’nın yaş doğrulama çözümünün ve teknik şartnamelerinin seçtiği yolla aynı doğrultuda. Ağın blokzincir kullanmadığını, ispatların ve güven listelerinin hiçbir kişisel veri içermediğini de ekleyelim.

= Sonuç

Timur’un konser bileti için yaşını kanıtlama sorunu, ilk bakışta küçük bir kullanıcı deneyimi sorusu gibi görünüyor. Oysa arkasında, dijital kimliğin bütün mahremiyet tartışmasını özetleyen bir soru yatıyor: Bir kurum, bir kişi hakkında bir karar vermek için gerçekten neyi bilmelidir?

Fiziksel dünyada kapıdaki görevli bu soruya cevap vermek zorunda kalmadı, çünkü gördüğünü unutuyordu. Dijital dünyada görülen her şey kalıcıdır ve bu yüzden soruyu teknolojinin cevaplaması gerekir. Seçici açıklama, belgenin yalnızca gereken alanını göstermeyi sağlayarak ilk büyük adımı attı. Tek kullanımlık kopyalar, doğrulayıcıların kişiyi birbirine anlatmasını zorlaştırdı. Sıfır bilgi ispatları ise son adımı atıyor: Doğrulayıcıya, kararını vermesi için gereken tek bitlik bilgiden başka hiçbir şey vermiyor ve bunu, belgeyi veren kurum dahil hiç kimsenin geri çözemeyeceği biçimde yapıyor.

Bu yazıda bu fikrin 1985’teki doğuşundan bugünkü telefonlara uzanan yolunu izledik. Mağara masalı tamlık, sağlamlık ve sıfır bilginin sezgisini verdi. Schnorr protokolü bu sezginin cebirsel karşılığını, Fiat-Shamir dönüşümü ise internette kullanılabilir hâlini gösterdi. Genel amaçlı ispat sistemleri her hesaplama için ispat üretmeyi mümkün kıldı; son yıllardaki çalışmalar da bunu, kurumların bugün zaten verdiği ECDSA imzalı belgeler üzerinde, telefonda saniyeler içinde yapılabilir hâle getirdi. Avrupa’nın yaş doğrulama çalışması bu yaklaşımı benimsedi ve cüzdan mimarisi iki farklı sıfır bilgi yolunu birlikte takip ediyor.

Ama yazının belki en önemli dersi, ispatın matematiği ile ispatın çevresindeki düzen arasındaki ilişki. Bir sıfır bilgi ispatı, ancak kurum anahtarlarının güvenilir bir listeden geldiği, devrelerin denetlendiği, doğrulayıcıların neyi isteyebileceklerinin hukukla sınırlandığı bir düzen içinde anlam taşır. Matematik "bu kişi 18 yaşından büyük" cümlesinin yanlış olamayacağını garanti eder. O cümleyi kimin, hangi hakla sorabileceğine ise yine toplumun kuralları karar verir. Dizinin bir sonraki yazısında, bağlanamazlığı bütün yöntemleriyle ve hukuki boyutuyla ele alarak bu tartışmayı genişleteceğiz.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Goldwasser, S., Micali, S. ve Rackoff, C. (1989). "The Knowledge Complexity of Interactive Proof Systems." #{emph[SIAM Journal on Computing]}, 18(1), 186–208. (İlk sunum: STOC 1985.)]

#kaynak("2")[Bellare, M. ve Rogaway, P. (1993). "Random Oracles are Practical: A Paradigm for Designing Efficient Protocols." #{emph[Proceedings of the 1st ACM Conference on Computer and Communications Security (CCS ’93).]}]

#kaynak("3")[Quisquater, J.-J., Guillou, L. C. ve diğerleri (1990). "How to Explain Zero-Knowledge Protocols to Your Children." #{emph[Advances in Cryptology – CRYPTO ’89]}, LNCS 435, 628–631. Springer.]

#kaynak("4")[Lund, C., Fortnow, L., Karloff, H. ve Nisan, N. (1992). "Algebraic Methods for Interactive Proof Systems." #{emph[Journal of the ACM]}, 39(4), 859–868.]

#kaynak("5")[Chaum, D. (1985). "Security Without Identification: Transaction Systems to Make Big Brother Obsolete." #{emph[Communications of the ACM]}, 28(10), 1030–1044.]

#kaynak("6")[Fiat, A. ve Shamir, A. (1987). "How to Prove Yourself: Practical Solutions to Identification and Signature Problems." #{emph[Advances in Cryptology – CRYPTO ’86]}, LNCS 263, 186–194. Springer.]

#kaynak("7")[Schnorr, C. P. (1991). "Efficient Signature Generation by Smart Cards." #{emph[Journal of Cryptology]}, 4(3), 161–174.]

#kaynak("8")[Brands, S. A. (2000). #{emph[Rethinking Public Key Infrastructures and Digital Certificates: Building in Privacy.]} MIT Press.]

#kaynak("9")[Camenisch, J. ve Lysyanskaya, A. (2001). "An Efficient System for Non-transferable Anonymous Credentials with Optional Anonymity Revocation." #{emph[Advances in Cryptology – EUROCRYPT 2001]}, LNCS 2045. Springer.]

#kaynak("10")[Groth, J. (2016). "On the Size of Pairing-Based Non-interactive Arguments." #{emph[Advances in Cryptology – EUROCRYPT 2016]}, LNCS 9666, 305–326. Springer.]

#kaynak("11")[Ben-Sasson, E., Bentov, I., Horesh, Y. ve Riabzev, M. (2018). "Scalable, Transparent, and Post-Quantum Secure Computational Integrity." #{emph[Cryptology ePrint Archive]}, Rapor 2018\/046.]

#kaynak("12")[Ames, S., Hazay, C., Ishai, Y. ve Venkitasubramaniam, M. (2017). "Ligero: Lightweight Sublinear Arguments Without a Trusted Setup." #{emph[Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security (CCS ’17).]}]

#kaynak("13")[Frigo, M. ve shelat, a. (2024). "Anonymous Credentials from ECDSA." #{emph[Cryptology ePrint Archive]}, Rapor 2024\/2010.]

#kaynak("14")[Google (2025). "It’s now easier to prove age and identity with Google Wallet" (29 Nisan 2025) ve "Opening up ’Zero-Knowledge Proof’ technology to promote privacy in age assurance" (3 Temmuz 2025). blog.google. Kod: github.com\/google\/longfellow-zk.]

#kaynak("15")[Tamga Network (2026). #{emph[Gizlilik]} (kavramlar) ve #{emph[ADR-0032: Zero-knowledge proofs (ZK)]}. docs.tamga.network; paket listesi: github.com\/tamga-network.]

#kaynak("16")[Frigo, M. ve shelat, a. (2026). #{emph[Longfellow ZK.]} IRTF CFRG İnternet taslağı draft-irtf-cfrg-longfellow-00, 19 Ekim 2026 (önceki adı draft-google-cfrg-libzk). Güvenlik incelemeleri: longfellow-zk.github.io\/longfellow-zk\/docs\/reviews.]

#kaynak("17")[Avrupa Komisyonu (2025). #{emph[Guidelines on measures to ensure a high level of privacy, safety and security for minors online, pursuant to Article 28(4) of Regulation (EU) 2022\/2065.]} 14 Temmuz 2025.]

#kaynak("18")[Avrupa Komisyonu (2025–2026). #{emph[EU age verification blueprint]}: duyurular (14 Temmuz 2025; 10 Ekim 2025), bilgi sayfası ve teknik belirtim, "Annex B: Zero Knowledge Proofs for the Age Verification Solution". digital-strategy.ec.europa.eu; ageverification.dev.]

#kaynak("19")[7578 sayılı Sosyal Hizmetler Kanunu ve Bazı Kanunlarda Değişiklik Yapılmasına Dair Kanun. #{emph[Resmî Gazete]}, 1 Mayıs 2026, sayı 33240; madde 22 (5651 sayılı Kanun’a ek) ve madde 27 (yürürlük).]

#kaynak("20")[ETSI. #{emph[TR 119 476: Electronic Signatures and Trust Infrastructures (ESI); Analysis of selective disclosure and zero-knowledge proofs applied to Electronic Attestation of Attributes.]} V1.1.1 (Ağustos 2023), V1.2.1 (Temmuz 2024); TR 119 476-1 V1.3.1 (Ağustos 2025).]

#kaynak("21")[Avrupa Komisyonu. #{emph[EUDI Wallet Standards and Technical Specifications]}: TS04 "Zero-Knowledge Proof (ZKP) Implementation in EUDI Wallet", TS13 "Implementation of ZKP based on arithmetic circuits in the EUDI Wallet", TS14 "Implementation of ZKP based on multimessage signatures in the EUDI Wallet"; ayrıca #{emph[Architecture and Reference Framework]} (ARF), sürüm 3.0.0, 23 Temmuz 2026, Bölüm 7.4.3.5. github.com\/eu-digital-identity-wallet.]

#kaynak("22")[Bünz, B., Bootle, J., Boneh, D., Poelstra, A., Wuille, P. ve Maxwell, G. (2018). "Bulletproofs: Short Proofs for Confidential Transactions and More." #{emph[2018 IEEE Symposium on Security and Privacy.]}]

#kaynak("23")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]}]

#kaynak("24")[European Digital Rights (EDRi) (2026). "Why the EU age-verification tool does not solve privacy concerns." 7 Eylül 2026.]

#kaynak("25")[Looker, T., Kalos, V., Whitehead, A., Lodder, M. ve Bernstein, G. (2026). #{emph[The BBS Signature Scheme.]} IRTF CFRG İnternet taslağı draft-irtf-cfrg-bbs-signatures-14, 29 Ekim 2026.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Quisquater ve diğerleri, #{emph[How to Explain Zero-Knowledge Protocols to Your Children]} (1989).]} Dört sayfalık bir masal; mağara anlatısının asıl kaynağı. Matematik bilgisi gerektirmez.
+ #{strong[David Chaum, #{emph[Security Without Identification]} (1985).]} Kırk yıl önce yazılmış ama bugünkü cüzdan tartışmalarının neredeyse hepsini önceden gören bir makale. Anonim belge fikrinin kökü.
+ #{strong[ETSI TR 119 476’nın sıfır bilgi bölümleri.]} Avrupa bağlamında hangi ispat sistemlerinin konuşulduğunu, artılarını ve eksilerini standartların diliyle ama okunabilir biçimde özetliyor.
+ #{strong[AB yaş doğrulama çözümünün teknik belirtimi ve sıfır bilgi eki (ageverification.dev).]} Bu yazıda anlatılan fikirlerin gerçek bir sistemde nasıl bir araya geldiğini görmek için en somut kaynak.
+ #{strong[Frigo ve shelat, #{emph[Anonymous Credentials from ECDSA]} (2024).]} Teknik bir makale; ama giriş ve motivasyon bölümleri, var olan belgeler üzerinde ispat üretmenin neden önemli olduğunu açık bir dille anlatıyor.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. İngilizce karşılıklar, başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (16fr, 19fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Aralık ispatı], [range proof], [Gizli bir sayının iki sınır arasında olduğunu, sayıyı açmadan kanıtlama],),
  ([Aritmetik devre], [arithmetic circuit], [Toplama ve çarpma kapılarından oluşan, bir kontrolü ifade eden hesap ağı],),
  ([Bağlanamazlık], [unlinkability], [Aynı kişinin iki gösteriminin birbirine bağlanamaması],),
  ([Benzetici], [simulator], [Sırrı bilmeden, gerçek protokol kaydından ayırt edilemeyen kayıt üreten algoritma],),
  ([BBS imzası], [BBS signature], [Üzerinde verimli sıfır bilgi ispatı yapılabilen, çok iletili bir imza türü],),
  ([Bilgi ispatı], [proof of knowledge], [Bir sırra (ör. gizli anahtara) sahip olunduğunu kanıtlayan ispat],),
  ([Cevap], [response], [İspatçının meydan okumaya göre hesaplayıp gönderdiği değer],),
  ([Döküm], [transcript], [Etkileşimsiz ispatta özete katılan değerlerin tanımlı sırası],),
  ([ECDSA], [Elliptic Curve Digital Signature Algorithm], [Eliptik eğrilere dayanan, kimlik belgelerinde yaygın imza algoritması],),
  ([Etkileşimsiz ispat], [non-interactive proof], [Tek mesajla gönderilen, herkesin sonradan doğrulayabildiği ispat],),
  ([Fiat-Shamir dönüşümü], [Fiat–Shamir transform], [Doğrulayıcının rastgele sorusunu özet fonksiyonuyla değiştirerek ispatı etkileşimsiz yapma],),
  ([Güvenilir kurulum], [trusted setup], [Bazı SNARK’ların gerektirdiği, rastgele değerleri sonradan yok edilmesi gereken parametre üretimi],),
  ([İspatçı], [prover], [Bir ifadenin doğru olduğunu kanıtlayan taraf],),
  ([Meydan okuma], [challenge], [Doğrulayıcının ispatçıya yönelttiği, önceden kestirilemeyen rastgele değer],),
  ([MSO], [mobile security object], [mdoc’ta alan özetlerini, geçerlilik süresini ve cihaz anahtarını taşıyan, kurumun imzaladığı yapı],),
  ([Özel sağlamlık], [special soundness], [Aynı taahhüde iki farklı cevaptan sırrın çıkarılabilmesi özelliği],),
  ([Rastgele kâhin modeli], [random oracle model], [Özet fonksiyonunu ideal rastgele bir kutu sayan güvenlik modeli],),
  ([Sağlamlık], [soundness], [Yanlış bir ifadenin ancak ihmal edilebilir olasılıkla kabul edilmesi],),
  ([Sıfır bilgi], [zero-knowledge], [Doğrulayıcının ifadenin doğruluğu dışında hiçbir şey öğrenmemesi],),
  ([Sıfır bilgi ispatı], [zero-knowledge proof (ZKP)], [Bir ifadeyi, dayandığı bilgiyi açmadan kanıtlayan ispat],),
  ([Taahhüt], [commitment], [İspatçının seçimine bağlandığı ama seçimini göstermediği ilk mesaj],),
  ([Tamlık], [completeness], [Doğru bir ifadenin, kurallara uyulduğunda her zaman kabul edilmesi],),
  ([Tanık], [witness], [İfadenin doğru olduğunu gösteren gizli girdi],),
  ([Toplam kontrolü], [sumcheck protocol], [Büyük bir toplamın doğruluğunu az sayıda kontrolle sınayan etkileşimli protokol],),
  ([Tek kullanımlık kopya], [single-use (batch) attestation], [Her doğrulayıcıya ayrı gösterilmek üzere toplu verilen belge kopyası],),
  ([zk-SNARK], [zero-knowledge succinct non-interactive argument of knowledge], [Kısa, etkileşimsiz, sıfır bilgili genel amaçlı ispat],),
  ([zk-STARK], [zero-knowledge scalable transparent argument of knowledge], [Güvenilir kurulum gerektirmeyen, özet fonksiyonlarına dayanan genel amaçlı ispat],),
))

#heading(level: 1, numbering: none)[Ek B — Basit Bir Schnorr İspatı, Adım Adım]

Bu ekte, Bölüm 4’te anlatılan Schnorr protokolünü elle hesaplanabilecek kadar küçük sayılarla yürütüyoruz. Gerçek sistemlerde bu sayılar yüzlerce basamaklıdır ve küçük sayılarla yapılan bir ispatın hiçbir güvenliği yoktur. Amaç yalnızca adımların mantığını göstermek. Bütün değerler örnektir.

#{strong[Hazırlık: ortak değerler ve anahtarlar.]}

Herkesin bildiği değerler şunlar: $p = 23$ (asal), $q = 11$ (asal ve $p - 1 = 22$’yi tam böler) ve $g = 4$. Bu $g$, 23’e göre kalan hesabında 11 adımda bir başa dönen bir sayıdır. Kuvvetlerini sırayla yazınca bu görülür:

#tablo([#{strong[Tablo B.1.]} $g = 4$ sayısının kuvvetleri (hepsi mod 23).], (5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr, 5fr), ([$k$], [1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11],), (
  ([$4^k mod 23$], [4], [16], [18], [3], [12], [2], [8], [9], [13], [6], [1],),
))

Aynur gizli anahtar olarak $x = 7$ seçer. Açık anahtarı tablodan okunur:

#formul[$ y = g^x mod p = 4^7 mod 23 = 8 $]

Timur yalnızca $y = 8$’i bilir. Gerçek sistemlerde $y$’den $x$’i bulmak (ayrık logaritma problemi) pratikte imkânsızdır. Bu küçük örnekte tabloya bakarak bulunabilir, ama mantık değişmez.

#{strong[Protokolün dört adımı.]}

#adimlar((
  ("Aynur → Timur", [#{strong[Taahhüt.]} Aynur rastgele $r = 5$ seçer, kimseye söylemez ve taahhüdü gönderir.], $t = 4^5 mod 23 = 12$),
  ("Timur → Aynur", [#{strong[Meydan okuma.]} Timur 0 ile 10 arasından rastgele bir sayı seçer.], $c = 3$),
  ("Aynur → Timur", [#{strong[Cevap.]} Aynur gizli anahtarını cevabın içine katar.], $s = (5 + 3 dot 7) mod 11 = 26 mod 11 = 4$),
  ("Timur", [#{strong[Kontrol.]} Timur iki tarafı ayrı ayrı hesaplar (aşağıda).], $g^s attach(=, t: ?) t dot y^c$),
))

Timur’un elinde artık $t = 12$, $c = 3$, $s = 4$ ve açık anahtar $y = 8$ vardır. $x = 7$ ve $r = 5$ hiçbir mesajda yer almadı. Kontrolde iki taraf şöyle hesaplanır:

#formul[$ "sol taraf:" quad g^s &= 4^4 = 256 equiv 3 quad (mod 23) \
"sağ taraf:" quad t dot y^c &= 12 dot 8^3 = 12 dot 512 equiv 12 dot 6 = 72 equiv 3 quad (mod 23) $]

İki taraf da 3. Eşitlik tutuyor ve Timur ikna oluyor.

#{strong[Sağlamlık: sırrı iki cevaptan bulmak.]}

Diyelim ki Aynur, aynı taahhüt $t = 12$ için ikinci bir meydan okumaya da cevap verebiliyor. Timur $c' = 5$ deseydi, Aynur’un cevabı şu olurdu:

#formul[$ s' = (5 + 5 dot 7) mod 11 = 40 mod 11 = 7 $]

Bu iki cevaba sahip biri gizli anahtarı hesaplayabilir. Kalan hesabında bölme, bölenin tersiyle çarpmak demektir; 2’nin 11’e göre tersi 6’dır, çünkü $2 dot 6 = 12 equiv 1 thin (mod 11)$:

#formul[$ x &= (s - s') / (c - c') mod q = (4 - 7) / (3 - 5) mod 11 = (-3) / (-2) mod 11 \
  &= 3 dot 2^(-1) mod 11 = 3 dot 6 mod 11 = 18 mod 11 = 7 $]

Gerçekten de $x = 7$. Bu hesap, her meydan okumaya cevap verebilen birinin sırrı bilmek zorunda olduğunu gösterir. Sırrı bilmeyen biri taahhüdünü gönderdikten sonra en fazla bir meydan okumaya hazırlıklı olabilir; meydan okuma büyük bir aralıktan seçildiğinde doğru tahmin etme şansı ihmal edilebilir.

#{strong[Sıfır bilgi: sırrı bilmeden inandırıcı bir kayıt üretmek.]}

Şimdi sırrı bilmeyen biri, meydan okumayı önceden bildiği takdirde, gerçeğinden ayırt edilemeyen bir kayıt üretebilir mi, bakalım. Benzetici önce cevabı ve meydan okumayı rastgele seçer: $s = 9$, $c = 2$. Sonra taahhüdü geriye doğru hesaplar. Bunun için $y$’nin tersi gerekir: $8 dot 3 = 24 equiv 1 thin (mod 23)$ olduğundan $y^(-1) = 3$ ve $y^(-2) = 9$’dur.

#formul[$ t &= g^s dot y^(-c) mod p = 4^9 dot 8^(-2) mod 23 \
  &= 13 dot 9 mod 23 = 117 mod 23 = 2 $]

Kontrol: $g^s = 4^9 equiv 13$ ve $t dot y^c = 2 dot 8^2 = 128 equiv 13 thin (mod 23)$. Eşitlik tutuyor.

$(t, c, s) = (2, 2, 9)$ üçlüsü, sırrı bilen birinin gerçek bir konuşmasında ortaya çıkabilecek bir üçlüyle aynı biçimdedir ve aynı kontrolden geçer. Benzetici $x$’i hiç kullanmadı. Demek ki bir konuşma kaydı, $x$ hakkında bir şey öğretemez. Bölüm 2.3’teki video montajı tam olarak buydu.

#{strong[Etkileşimsiz hâli.]}

Fiat-Shamir dönüşümünde Timur’un meydan okuması yerine, taahhüdün, açık anahtarın ve oturum bilgisinin özeti kullanılır. Burada $H$, SHA-256 gibi bir özet fonksiyonudur:

#formul[$ c = H(g, y, t, "oturum bilgisi") mod q, quad "ispat" = (t, s) $]

Aynur $c$’yi kendisi hesaplar, $s$’yi bulur ve $(t, s)$ çiftini tek mesajla gönderir. Timur aynı $c$’yi kendisi hesaplar ve kontrol adımını yapar. Özete bir mesaj eklendiğinde, ortaya çıkan $(t, s)$ çifti o mesaj üzerinde bir Schnorr imzasıdır.

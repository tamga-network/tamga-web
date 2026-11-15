// A11 — eIDAS 2.0'a Hukuk Dışından Bakış. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "eIDAS 2.0'a Hukuk Dışından Bakış",
  altbaslik: "Ne Getiriyor, Kimi Etkiliyor? Bir Mühendisin Okuma Notları",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Ocak 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("eIDAS 2.0", "Tüzük (AB) 2024/1183", "Avrupa Dijital Kimlik Cüzdanı", "uygulama tüzükleri", "güvenen taraf", "öznitelik onayı", "zorunlu kabul", "sertifikasyon", "güven hizmetleri", "üçüncü ülkeler",),
  atif: "Karataş, B. (2027). eIDAS 2.0'a Hukuk Dışından Bakış: Ne Getiriyor, Kimi Etkiliyor? Bir Mühendisin Okuma Notları. Tamga Network Akademik Çalışmalar, A11. https://tamga.network/files/publications/eidas-2-explained-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Avrupa Birliği’nin dijital kimlik düzenlemesi eIDAS 2.0, yani Tüzük (AB) 2024\/1183, 2024 baharında kabul edildi ve 20 Mayıs 2024’te yürürlüğe girdi. Tüzük, her üye devlete vatandaşlarına bir dijital kimlik cüzdanı sunma yükümlülüğü getiriyor, kamu kurumlarının ve belirli özel sektör kuruluşlarının bu cüzdanı kabul etmesini istiyor ve güven hizmetlerinin listesine öznitelik onayları, elektronik arşivleme ve elektronik defterler gibi yeni kalemler ekliyor. Ama tüzüğün kendisi işin yalnızca bir kısmı. Mühendislerin asıl uygulayacağı kurallar, Kasım 2024’ten bu yana çıkan ve standartlara atıf yapan uygulama tüzüklerinde duruyor.

Bu yazı eIDAS 2.0’ı, bu sistemle bir ürün yapacak ya da ona bağlanacak bir mühendisin ve yöneticinin gözüyle okuyor; yazar bir hukukçu değil. Bir AB tüzüğünün nasıl okunduğunu, eski eIDAS’tan neyin değiştiğini, tüzüğün tanımladığı rolleri, cüzdanın tüzükteki niteliklerini, uygulama tüzüklerinin sistemini, son tarihlerin nasıl hesaplandığını, kimlerin cüzdanı kabul etmek zorunda olduğunu, sertifikasyonu ve AB dışındaki ülkeler için tüzüğün ne söylediğini sırasıyla anlatıyor. Yazı hukuki görüş değildir; tüzüğün metninin ne söylediğini aktarır ve madde numaralarıyla kaynağını gösterir.
  ],
)

= Giriş: Uzun Bir Metnin Karşısında

Nurlan, Almatı’da küçük bir finansal teknoloji şirketinde yazılım mühendisi. Şirketi, Avrupa’daki müşterilere de hizmet vermeye hazırlanıyor. Bir gün Avrupalı bir iş ortağından kısa bir e-posta geliyor: "Önümüzdeki yıl müşterilerimiz AB dijital kimlik cüzdanıyla giriş yapmak isteyecek. Sizin sistem buna hazır mı?" Nurlan soruyu anlamak için önce kaynağa gitmeye karar veriyor. AB’nin resmî hukuk veri tabanı EUR-Lex’te "Regulation (EU) 2024\/1183" diye arıyor ve karşısına uzun bir metin çıkıyor: başında onlarca numaralı gerekçe paragrafı, sonra "5a", "5b", "45k" gibi harfli madde numaraları, ardından ekler.

Nurlan’ın aklından geçen sorular, bu yazının da sorularıdır. Bu metin kime ne yükümlülük getiriyor? Hangi tarihlerde? Bir yazılım ekibinin asıl uyması gereken teknik kurallar bu metnin neresinde? Ve en önemlisi, AB’nin dışındaki bir şirket ya da ülke için bu metin ne anlama geliyor?

Dizinin önceki yazılarında eIDAS 2.0’a sık sık atıf yaptık. İlk yazıda Avrupa Dijital Kimlik Cüzdanı’nın dijital kimliğin dördüncü dönemini nasıl başlattığını anlattık; sonraki yazılarda seçici açıklamanın, bağlanamazlığın, güven listelerinin, iptalin ve cüzdan güvenliğinin tüzükte nasıl karşılık bulduğunu gördük. Bu yazıda tüzüğün kendisine dönüyoruz ve onu baştan sona, bir mühendisin okuyabileceği bir harita hâline getirmeye çalışıyoruz.

#kutu("onemli", [Bu yazı ne değildir?])[
Bu yazı hukuki görüş ya da danışmanlık değildir. Bir kurumun eIDAS 2.0 karşısındaki yükümlülükleri o kurumun durumuna, ulusal mevzuata ve yetkili makamların yorumuna bağlıdır. Yazı yalnızca tüzüğün ve uygulama tüzüklerinin metninin ne söylediğini aktarır, her iddianın yanına madde numarasını yazar ve metnin açıkça söylemediği yerleri öyle işaretler. Madde numaraları, 2024\/1183 ile değiştirilmiş 910\/2014 sayılı Tüzüğün konsolide metnine göredir \[1, 2\].
]

Yazının planı şöyle: Bölüm 2 bir AB tüzüğünün nasıl okunduğunu anlatıyor. Bölüm 3 eski eIDAS’tan yenisine geçişi, Bölüm 4 tüzüğün yeni tanımlarını, Bölüm 5 rolleri ele alıyor. Bölüm 6 cüzdanın tüzükteki niteliklerini, Bölüm 7 uygulama tüzüklerini, Bölüm 8 takvimi anlatıyor. Bölüm 9 zorunlu kabulü, Bölüm 10 güven hizmetleri tarafındaki yenilikleri, Bölüm 11 sertifikasyonu ve denetimi, Bölüm 12 AB dışındaki ülkeleri tartışıyor. Bölüm 13 eski ve yeni eIDAS’ı karşılaştırıyor, Bölüm 14 açık soruları sıralıyor, Bölüm 15 Tamga Network’ün bu tablodaki yerini anlatıyor. Ek A’da terimlerin sözlüğü var.

= Bir AB Tüzüğü Nasıl Okunur?

== Tüzük, yönerge, uygulama tüzüğü

Avrupa Birliği’nin hukuk metinleri birkaç türdür ve türü bilmek, metnin kimi nasıl bağladığını anlamanın ilk adımıdır. #{strong[Tüzük]} (#{emph[regulation]}), yürürlüğe girdiği andan itibaren bütün üye devletlerde doğrudan uygulanır; ulusal bir kanunla iç hukuka aktarılması gerekmez. #{strong[Yönerge]} (#{emph[directive]}) ise bir hedef koyar ve bu hedefe nasıl ulaşılacağını üye devletlerin kendi kanunlarına bırakır. eIDAS’ın 2014’teki ilk hâli de 2024’teki değişikliği de tüzüktür. Bu yüzden metinde yazan yükümlülükler, örneğin bir üye devletin cüzdan sunma yükümlülüğü, doğrudan o metinden doğar.

Üçüncü bir tür daha var ve mühendisler için en önemlisi odur: #{strong[uygulama tüzüğü]} (#{emph[implementing regulation]}). Ana tüzük, bazı konularda ayrıntıyı Avrupa Komisyonu’na bırakır ve "Komisyon, uygulama işlemleriyle şu konuda standartların listesini belirler" der. Komisyon bu yetkiyi, üye devletlerin temsilcilerinden oluşan bir komitenin onayıyla kullanır ve ortaya çıkan metin de bir tüzüktür; o da doğrudan uygulanır. eIDAS 2.0’da hangi belge biçiminin, hangi protokolün, hangi ETSI standardının kullanılacağı bu uygulama tüzüklerinde yazar; ana tüzük bu ayrıntılara girmez.

== Gerekçeler ve maddeler

Bir AB tüzüğü iki ana bölümden oluşur. Baştaki numaralı paragraflar #{strong[gerekçelerdir]} (#{emph[recitals]}). Gerekçeler tüzüğün neden yazıldığını, neyi amaçladığını ve bazı kavramların nasıl anlaşılması gerektiğini anlatır. Bağlayıcı hükümler ise #{strong[maddelerdedir]} (#{emph[articles]}). Gerekçeler maddelerin yorumlanmasında yol gösterir ama tek başına yükümlülük doğurmaz. Bu yüzden bu yazıda bir yükümlülükten söz ederken her zaman maddeye atıf yapıyoruz. Gerekçeler ise okunması en kolay kısımdır; tüzüğün ruhunu anlamak için dizinin ilk yazısında da önerdiğimiz gibi iyi bir başlangıç noktasıdır.

== Değiştiren tüzük ve konsolide metin

eIDAS 2.0 bağımsız yeni bir tüzük değildir. Resmî adı, "Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük"tür \[1\]. Yani 2014’teki metni yürürlükten kaldırmaz, ona yeni maddeler ekler, bazılarını yeniden yazar. Bu yüzden 2024\/1183’ü tek başına okumak zordur: Metin "910\/2014’ün 5. maddesinden sonra şu maddeler eklenir" biçiminde talimatlarla doludur. Asıl okunması gereken, bu talimatların 2014 metnine işlenmiş hâli olan #{strong[konsolide metindir]} \[2\]. EUR-Lex konsolide metinleri ayrıca yayımlar. Konsolide metin resmî bağlayıcı metin değildir, bir belgeleme aracıdır; ama madde numaralarını ve metnin bugünkü hâlini görmek için en pratik kaynaktır.

Harfli madde numaraları da buradan gelir. 2014 metninde 5. madde ile 6. madde arasına yeni maddeler eklemek gerektiğinde, bütün numaraları kaydırmak yerine 5a, 5b, 5c gibi numaralar verilir. eIDAS 2.0’ın cüzdanla ilgili hükümlerinin neredeyse tamamı bu yüzden 5a ile 5f arasındadır. Güven hizmetlerine eklenen yeni bölümler de 45a’dan 45l’ye kadar uzanır.

#kutu("teknik", [Bir madde atfı nasıl okunur?])[
AB metinlerinde atıflar iç içe bir adres gibidir. Adres büyükten küçüğe okunur: önce madde, sonra o maddenin fıkrası, sonra fıkranın bendi, en sonda bendin alt bendi. Örneğin "madde 5a(4)(d)(iii)" şu demektir:

#tablo([], (6fr, 6fr, 42fr), ([Parça], [Düzey], [Bu örnekte gösterdiği yer],), (
  ([#{raw("5a")}], [madde], ["Avrupa Dijital Kimlik Cüzdanları"],),
  ([#{raw("(4)")}], [fıkra], [cüzdanın kullanıcıya sağlaması gereken işlevler],),
  ([#{raw("(d)")}], [bent], [bütün işlemlerin kaydına ortak bir panelden erişim],),
  ([#{raw("(iii)")}], [alt bent], [bir güvenen tarafı veri koruma otoritesine bildirebilmek],),
))

Yani bu atıf, cüzdan maddesinin dördüncü fıkrasındaki işlev listesinin (d) bendinde sayılan üçüncü olanağı gösterir.

Uygulama tüzüklerinde ayrıca ekler (#{emph[Annex]}) önemlidir. Teknik gereklilikler çoğu zaman bir ekte, kendi numaralama düzeniyle yazılır. Örneğin bu dizinin onuncu yazısında andığımız 2024\/2979 sayılı Uygulama Tüzüğü’nün Ek Ib’si, cüzdan birimi kanıtının biçimini "TR-WIA-1", "C\_KA-1" gibi kodlarla numaralanmış kurallar hâlinde verir. Bir metnin hangi sürümünü okuduğunuz da önemlidir: Uygulama tüzükleri sonradan başka uygulama tüzükleriyle değiştirilebilir. EUR-Lex’teki her metnin kalıcı bir adresi (ELI) vardır; örneğin #{raw("http://data.europa.eu/eli/reg/2024/1183/oj")}.
]

= eIDAS 1’den eIDAS 2.0’a

== 2014 tüzüğü neyi kurdu?

910\/2014 sayılı Tüzük 23 Temmuz 2014’te kabul edildi ve Avrupa Birliği Resmî Gazetesi’nde 28 Ağustos 2014’te yayımlandı \[2\]. Güven hizmetlerine ilişkin hükümlerinin büyük kısmı 1 Temmuz 2016’dan itibaren uygulanmaya başladı (madde 52). Dizinin ilk yazısında anlattığımız gibi tüzük iki ayağa dayanıyordu.

Birinci ayak #{strong[elektronik kimlikti]}. Bir üye devlet kendi elektronik kimlik sistemini Komisyon’a bildirirse (madde 9), diğer üye devletlerin kamu hizmetleri bu sistemle verilen kimlik araçlarını tanımak zorundaydı (madde 6). Kimlik araçlarının güvence düzeyleri (düşük, önemli, yüksek) 2015\/1502 sayılı Uygulama Tüzüğü’yle tanımlandı \[3\]. Karşılıklı tanıma yükümlülüğü 2018’de başladı.

İkinci ayak #{strong[güven hizmetleriydi]}: elektronik imza, elektronik mühür, zaman damgası, kayıtlı elektronik teslimat hizmeti ve web sitesi kimlik doğrulama sertifikaları. Tüzük, nitelikli elektronik imzanın el yazısıyla atılan imzayla aynı hukuki etkiye sahip olduğunu söyledi ve nitelikli güven hizmeti sağlayıcılarının bir denetim düzenine tabi olmasını, her üye devletin bu sağlayıcıları bir güven listesinde yayımlamasını şart koştu. Dizinin altıncı yazısında anlattığımız güven listesi mimarisi bu ayağın ürünüdür.

== Neyi kuramadı?

Elektronik kimlik ayağı beklenen yaygınlığa ulaşmadı. Komisyon’un 2021’de yayımladığı değişiklik önerisinin gerekçesi bunu açıkça yazar. Karşılıklı tanıma Eylül 2018’de başladığından beri yalnızca 14 üye devlet en az bir kimlik sistemi bildirmişti ve bu yüzden AB’de yaşayanların ancak yaklaşık yüzde 59’u sınır ötesinde kullanılabilen güvenilir bir elektronik kimliğe erişebiliyordu. Bildirilen kimliklerin hem üye devletlerde hem hizmet sağlayıcılar arasında kabulü de sınırlı kalmıştı \[4\]. Dizinin ilk yazısındaki dille söylersek, 2014 düzeni bir federasyon düzeniydi: Kişi bir belge taşımıyor, her girişte kendi ülkesinin kimlik sağlayıcısına yönlendiriliyordu.

== Değişiklik süreci

#kutu("tarihce", [eIDAS 2.0’ın yasama yolculuğu])[
#{strong[3 Haziran 2021: Komisyon önerisi.]} Komisyon, 910\/2014’ü değiştiren tüzük önerisini yayımladı (COM(2021) 281) \[4\]. Aynı gün, üye devletleri ortak bir teknik çerçeve üzerinde çalışmaya çağıran 2021\/946 sayılı Tavsiye Kararı’nı da kabul etti \[5\]. Bu çağrının ürünü, dizide sık andığımız Mimari ve Başvuru Çerçevesi’dir (ARF).

#{strong[Kasım 2023: siyasi uzlaşma.]} Avrupa Parlamentosu ile Konsey, uzun müzakerelerin ardından metin üzerinde anlaştı.

#{strong[29 Şubat 2024: Parlamento’nun kabulü; 26 Mart 2024: Konsey’in kabulü.]}

#{strong[11 Nisan 2024: imza.]} Tüzük bu tarihi taşır: "Tüzük (AB) 2024\/1183, 11 Nisan 2024".

#{strong[30 Nisan 2024: Resmî Gazete’de yayım; 20 Mayıs 2024: yürürlük.]} Tüzük yayımını izleyen yirminci günde yürürlüğe girdi (madde 2) \[1\].

#{strong[21 Kasım 2024: Komisyon için son tarih.]} Tüzük, cüzdanla ilgili uygulama tüzüklerinin bu tarihe kadar kabul edilmesini istedi (örneğin madde 5a(23) ve 5c(6)).

#{strong[28 Kasım 2024: ilk uygulama tüzükleri.]} Beş uygulama tüzüğü kabul edildi ve 4 Aralık 2024’te yayımlandı \[6–10\].
]

== Ne değişti?

Değişikliğin özü dizinin ilk yazısında anlattığımız geçiştir: federasyondan, kişinin belgeyi kendi cüzdanında taşıdığı üçgen modele. Ama tüzük bununla yetinmedi. Bir mühendisin gözünden bakınca değişiklikler beş başlıkta toplanabilir.

+ #{strong[Cüzdan.]} Her üye devlet en az bir Avrupa Dijital Kimlik Cüzdanı sunmak zorunda (madde 5a(1)). Cüzdanın işlevleri, gizlilik kuralları, ücretsizliği ve gönüllülüğü maddelerde sayılıyor (Bölüm 6).
+ #{strong[Kabul yükümlülüğü.]} Kamu kurumları, belirli özel sektör kuruluşları ve çok büyük çevrimiçi platformlar cüzdanı kabul etmek zorunda (madde 5f; Bölüm 9).
+ #{strong[Güvenen tarafların kaydı.]} Cüzdandan veri isteyen her kurum önce kayıt olmak ve ne isteyeceğini bildirmek zorunda (madde 5b).
+ #{strong[Yeni güven hizmetleri.]} Öznitelik onayları, elektronik arşivleme, elektronik defterler ve uzaktan imza aygıtlarının yönetimi güven hizmetleri arasına girdi (Bölüm 10).
+ #{strong[Sertifikasyon ve denetim.]} Cüzdanlar bağımsız kuruluşlarca sertifikalandırılıyor, sertifikalı cüzdanlar Resmî Gazete’de listeleniyor, güvenlik ihlallerinde askıya alma ve geri çekme kuralları işliyor (madde 5c, 5d, 5e; Bölüm 11).

#sekil(1, [eIDAS 2.0’ın katmanları: tüzükten standarda], "figures/a11/sekil-1.svg", yarim: false)

= Yeni Kavramlar: Tüzüğün Sözlüğü

Bir tüzüğü okurken ilk durak, tanımlar maddesidir. eIDAS’ta bu madde 3’tür. 2014 metninde 41 tanım vardı; 2024\/1183 bazılarını yeniden yazdı ve listeyi 57’ye kadar uzattı. Tanımlar önemlidir, çünkü tüzüğün geri kalanında bir kelime geçtiğinde buradaki anlamıyla okunur; gündelik anlamı yol gösterici olmayabilir.

Nurlan’ın ilk fark ettiği şey, tüzüğün cüzdanı bir #{strong[elektronik kimlik aracı]} olarak tanımlamasıdır. Madde 3(42)’ye göre Avrupa Dijital Kimlik Cüzdanı, kullanıcının kişi kimlik verilerini ve öznitelik onaylarını güvenli biçimde saklamasını, yönetmesini ve doğrulamasını, bunları güvenen taraflara ve başka cüzdan kullanıcılarına sunmasını ve nitelikli elektronik imza atmasını ya da mühür basmasını sağlayan bir elektronik kimlik aracıdır \[2\]. Bu tanımın bir sonucu var: Cüzdan, 2014’ten beri var olan elektronik kimlik hükümlerinin içine yerleşir. Cüzdanın "yüksek güvence düzeyinde bir elektronik kimlik sistemi altında" sağlanması (madde 5a(11)) bu yüzden şaşırtıcı değildir.

#tablo([#{strong[Tablo 1.]} Mühendisin bilmesi gereken başlıca tanımlar (madde 3).], (6fr, 21fr, 48fr), ([Madde 3], [Terim], [Tüzükteki anlamı (özetle)],), (
  ([(3)], [Kişi kimlik verisi (PID)], [AB ya da ulusal hukuka göre verilen ve bir gerçek ya da tüzel kişinin kimliğinin belirlenmesini sağlayan veri kümesi],),
  ([(5a)], [Kullanıcı], [Güven hizmetlerini ya da elektronik kimlik araçlarını kullanan gerçek ya da tüzel kişi],),
  ([(42)], [Avrupa Dijital Kimlik Cüzdanı], [PID ve öznitelik onaylarını saklayan, sunan ve nitelikli imza attıran elektronik kimlik aracı],),
  ([(43)], [Öznitelik], [Bir gerçek ya da tüzel kişinin ya da bir nesnenin özelliği, niteliği, hakkı ya da izni],),
  ([(44)], [Elektronik öznitelik onayı (EAA)], [Özniteliklerin doğrulanmasını sağlayan elektronik onay],),
  ([(45)], [Nitelikli öznitelik onayı (QEAA)], [Nitelikli güven hizmeti sağlayıcısının verdiği ve Ek V’i karşılayan öznitelik onayı],),
  ([(46)], [Kamu kurumunun verdiği onay (PuB-EAA)], [Yetkili kaynaktan sorumlu ya da bunun için görevlendirilmiş bir kamu kurumunun verdiği öznitelik onayı],),
  ([(47)], [Yetkili kaynak], [Bir kişi ya da nesne hakkındaki öznitelikler için birincil kaynak sayılan kayıt ya da sistem],),
  ([(50)], [AB Cüzdan Güven İşareti], [Bir cüzdanın tüzüğe uygun sağlandığını gösteren doğrulanabilir, basit ve tanınabilir işaret],),
  ([(51)], [Güçlü kullanıcı doğrulaması], [Farklı türden en az iki bağımsız faktöre (bilgi, sahiplik, beden) dayanan kimlik doğrulama],),
  ([(52)], [Elektronik defter], [Kayıtların bütünlüğünü ve zaman sırasının doğruluğunu sağlayan elektronik veri kayıtları dizisi],),
  ([(55)], [Kimlik eşleştirme], [Kimlik verisinin ya da aracının aynı kişiye ait mevcut bir hesapla eşleştirilmesi],),
  ([(57)], [Çevrim dışı kullanım], [Cüzdanın uzak sistemlere bağlanmadan, yakın alan teknolojileriyle fiziksel bir yerde kullanılması],),
))

Tablonun bir ayrıntısı dikkat çekici: Tüzük "cüzdana güvenen taraf" (#{emph[wallet-relying party]}) diye ayrı bir terim tanımlamaz. Bu ifade yalnızca madde 5b’nin başlığında ve uygulama tüzüklerinde geçer. Madde 3(6)’daki "güvenen taraf" tanımı, elektronik kimliğe ya da bir güven hizmetine dayanan herkesi kapsar; cüzdana dayanmak isteyenler için ayrıca kayıt yükümlülüğünü 5b getirir.

= Roller: Kim Ne Yapar?

Dizinin ilk yazısında eIDAS 2.0’ın üç temel rolü (veren, sahip, doğrulayan) hukuki olarak tanımlanmış aktörlere dönüştürdüğünü söylemiştik. Tüzüğü ve uygulama tüzüklerini birlikte okuyunca bu aktörlerin sayısı artıyor. Şekil 2 bu haritayı gösteriyor.

#sekil(2, [eIDAS 2.0’da roller ve aralarındaki ilişkiler (sadeleştirilmiş)], "figures/a11/sekil-2.svg", yarim: false)

#{strong[Üye devlet.]} Tüzüğün asıl muhatabıdır. En az bir cüzdan sunmak zorundadır ve bunu üç yoldan biriyle yapar: cüzdanı doğrudan kendisi sağlar, bir kuruluşa görevlendirmeyle sağlatır ya da kendisinden bağımsız olarak geliştirilmiş bir cüzdanı tanır (madde 5a(2)). Üye devlet ayrıca güvenen tarafları kaydeder (madde 5b(1)), cüzdan sağlayıcılarını, kayıt listelerinin yerini ve doğrulama mekanizmalarını Komisyon’a bildirir (madde 5a(18)) ve cüzdanlar için denetim organlarını belirler (madde 46a).

#{strong[Cüzdan sağlayıcı.]} Cüzdan uygulamasını ve ona bağlı hizmetleri sağlayan kuruluştur. Tüzük bu kuruluşa bazı doğrudan ödevler yükler: Kullanıcılar teknik destek isteyebilmeli ve sorun bildirebilmelidir (madde 5a(10)); sağlayıcı, cüzdan hizmeti için gerekli olmayan kullanım bilgilerini toplamamalı, cüzdandaki verileri kendi başka hizmetlerindeki verilerle birleştirmemeli ve bu verileri mantıksal olarak ayrı tutmalıdır (madde 5a(14)). Dizinin onuncu yazısında anlattığımız cüzdan birimi kanıtları ve iptal düzeni de uygulama tüzükleriyle bu kuruluşa yüklenir.

#{strong[PID sağlayıcı.]} Kişi kimlik verisini cüzdana veren kuruluştur. Tüzük, cüzdanın sağlandığı kimlik sisteminden gelen PID’in kişiyi tekil olarak temsil etmesini ve cüzdanla ilişkilendirilmesini ister (madde 5a(5)(f)). Hangi kuruluşun bu ilişkilendirmeden sorumlu olduğunu üye devlet bildirir (madde 5a(18)(c)). Ayrıntılı kurallar 2024\/2977 sayılı Uygulama Tüzüğü’ndedir \[6\].

#{strong[Öznitelik onayı sağlayıcıları.]} PID dışındaki belgeleri verenler üç gruba ayrılır. Nitelikli güven hizmeti sağlayıcıları nitelikli onay (QEAA) verir. Bir yetkili kaynaktan sorumlu kamu kurumu ya da onun adına görevlendirilen kurum, kamu kurumu onayı (PuB-EAA) verir. Bunların dışındaki herkes, örneğin bir üniversite ya da bir spor kulübü, nitelikli olmayan öznitelik onayı (EAA) verebilir. Bu ayrım hukuki etkiyi belirler (Bölüm 10).

#{strong[Güvenen taraf ve aracı.]} Cüzdandan veri isteyen kurumdur. Kurulu olduğu üye devlette kayıt olur, ne amaçla hangi verileri isteyeceğini bildirir ve bildirdiğinden fazlasını isteyemez (madde 5b(1)–(3)). Bir güvenen taraf adına çalışan #{strong[aracılar]}, örneğin birçok bankaya cüzdan doğrulama hizmeti veren bir şirket, tüzüğe göre güvenen taraf sayılır ve işlemin içeriğine dair veri saklayamaz (madde 5b(10)).

#{strong[Uygunluk değerlendirme kuruluşları.]} Cüzdanların tüzüğe uygunluğunu sertifikalandıran, üye devletlerin görevlendirdiği bağımsız kuruluşlardır (madde 5c(1)). Nitelikli güven hizmeti sağlayıcılarını denetleyen kuruluşlar da bu ailedendir.

#{strong[Denetim organları, tek temas noktaları ve İşbirliği Grubu.]} Her üye devlet cüzdan çerçevesi için bir denetim organı (madde 46a), güven hizmetleri için bir denetim organı (madde 46b) ve tek temas noktası (madde 46c) belirler. Üye devletler ve Komisyon, #{strong[Avrupa Dijital Kimlik İşbirliği Grubu]}’nda bir araya gelir (madde 46e).

#{strong[Komisyon.]} Uygulama tüzüklerini çıkarır, sertifikalı cüzdanların listesini Resmî Gazete’de yayımlar (madde 5d(3)) ve tüzüğün uygulanmasını değerlendirir (madde 49).

#kutu("ornek", [Nurlan’ın şirketi hangi rolde?])[
Nurlan’ın şirketi, Avrupa’daki müşterilerinin cüzdanlarından kimlik bilgisi istemek istiyor. Yani tüzüğün dilinde bir #{strong[güvenen taraf]} olmak istiyor. Tüzük, güvenen tarafın kurulu olduğu üye devlette kayıt olmasını öngörür (madde 5b(1)). Nurlan’ın şirketi bir AB üye devletinde kurulu değil. Tüzüğün AB dışında kurulu bir güvenen tarafın nasıl kayıt olacağına dair özel bir hükmü yok. Uygulamada bu, şirketin AB’deki bir yan kuruluş ya da AB’de kayıtlı bir aracı üzerinden çalışmayı değerlendirmesi anlamına gelebilir; ama bu bir hukuki değerlendirme gerektirir. Nurlan’ın not defterine yazdığı ilk soru bu oluyor.
]

= Cüzdanın Tüzükteki Nitelikleri

== Cüzdan ne yapabilmeli?

Madde 5a(4), cüzdanın kullanıcıya sağlaması gereken işlevleri sayar. Bu liste, bir cüzdan ürününün asgari özellik listesi gibi okunabilir.

#tablo([#{strong[Tablo 2.]} Madde 5a(4)’teki işlevler ve mühendislik karşılıkları.], (6fr, 48fr, 38fr), ([Madde 5a(4)], [Tüzük ne istiyor?], [Mühendislikteki karşılığı (dizide)],), (
  ([(a)], [PID ve öznitelik onaylarını kullanıcının tek denetiminde istemek, almak, seçmek, birleştirmek, saklamak, silmek, paylaşmak ve sunmak; çevrimiçi ve uygun yerde çevrim dışı; seçici açıklama mümkün], [belge alma ve sunma protokolleri (8. yazı), seçici açıklama (3. yazı), yüz yüze gösterim (9. yazı)],),
  ([(b)], [Takma adlar üretmek ve bunları cüzdanda şifreli ve yerel olarak saklamak], [siteye özel takma adlar (5. yazı)],),
  ([(c)], [Başka bir kişinin cüzdanını güvenli biçimde doğrulamak ve iki cüzdan arasında veri alıp vermek], [cüzdandan cüzdana gösterim (9. yazı)],),
  ([(d)], [Bütün işlemlerin kaydına ortak bir panelden erişmek; güvenen tarafların listesini görmek, silme talebinde bulunmak, şüpheli bir talebi veri koruma otoritesine bildirmek], [işlem kaydı ve kullanıcı paneli],),
  ([(e)], [Nitelikli elektronik imza atmak ya da mühür basmak], [uzaktan ya da yerel nitelikli imza],),
  ([(f)], [Teknik olarak mümkün olduğu ölçüde kendi verilerini, onaylarını ve ayarlarını indirmek], [dışa aktarma],),
  ([(g)], [Veri taşınabilirliği hakkını kullanmak], [taşıma nesnesi (10. yazı)],),
))

Madde 5a(5) bu işlevlerin nasıl sağlanacağına dair ikinci bir liste verir: belge verme, isteme, sunma, iki cüzdan arası etkileşim, güvenen tarafların kimliğinin doğrulanması, cüzdanın gerçekliğinin doğrulanması, silme talebi ve şikâyet için #{strong[ortak protokoller ve arayüzler]} (madde 5a(5)(a)). Hangi protokollerin bu "ortak protokoller" olduğu ise uygulama tüzüklerinde yazar (Bölüm 7).

== Cüzdan ne yapmamalı?

Mühendis için tüzüğün en ilginç hükümleri, cüzdanın neyi yapmaması gerektiğini söyleyenlerdir. Bunlar doğrudan tasarım kısıtlarına dönüşür.

- #{strong[Veren kuruma kullanım bilgisi vermemek.]} Cüzdan, öznitelik onayı veren güven hizmeti sağlayıcılarına o onayların kullanımı hakkında bilgi vermemelidir (madde 5a(5)(b)). Dizinin ilk yazısındaki "eve telefon etme" sorununun yasal karşılığı budur.
- #{strong[İzlemeye izin vermemek.]} Cüzdanın teknik çerçevesi, öznitelik onayı sağlayıcılarının ya da başka herhangi bir tarafın, kullanıcı açıkça izin vermedikçe, işlemleri ya da kullanıcının davranışını izlemesine, birbirine bağlamasına ya da ilişkilendirmesine imkân veren veri elde etmesine izin vermemelidir (madde 5a(16)(a)). Kullanıcının kimliğinin belirlenmesi gerekmeyen durumlarda bağlanamazlığı sağlayan gizlilik tekniklerine imkân vermelidir (madde 5a(16)(b)). Dizinin beşinci yazısının hukuki dayanağı bu fıkradır.
- #{strong[Sağlayıcının gereğinden fazla veri toplamaması.]} Cüzdan sağlayıcı cüzdan hizmeti için gerekli olmayan kullanım bilgisi toplayamaz (madde 5a(14)).
- #{strong[Zorunlu olmamak.]} Cüzdanın kullanımı gönüllüdür. Cüzdan kullanmayanların kamu ve özel hizmetlere, iş piyasasına erişimi kısıtlanamaz ya da dezavantajlı hâle getirilemez; hizmetlere başka kimlik doğrulama yollarıyla erişmek mümkün kalmalıdır (madde 5a(15)).
- #{strong[Ücret almamak.]} Cüzdanın verilmesi, kullanılması ve iptali bütün gerçek kişiler için ücretsizdir (madde 5a(13)). Cüzdan ayrıca bütün gerçek kişilere varsayılan olarak ve ücretsiz nitelikli elektronik imza imkânı sunmalıdır; üye devletler bu ücretsiz imzayı mesleki olmayan kullanımla sınırlayabilir (madde 5a(5)(g)).

== Açık kaynak, güvenlik ve iptal

Madde 5a’nın birkaç fıkrası daha mühendislik açısından doğrudan sonuç doğurur. Cüzdan uygulamasının yazılım bileşenlerinin kaynak kodu açık kaynak lisansıyla yayımlanır; üye devletler, kullanıcı cihazına kurulmayan bazı bileşenlerin kodunu gerekçeli olarak yayımlamayabilir (madde 5a(3)). Cüzdanlar tasarımdan itibaren güvenliği sağlamalıdır (madde 5a(12)) ve yüksek güvence düzeyinin kimlik doğrulama ve araç yönetimi şartlarını karşılamalıdır (madde 5a(5)(d) ve 5a(11)). Cüzdanın geçerliliği kullanıcının açık isteğiyle, güvenliği tehlikeye girdiğinde ve kullanıcının ölümü ya da tüzel kişinin faaliyetinin sona ermesi durumunda iptal edilebilmelidir (madde 5a(9)). Bir güvenlik ihlali cüzdanı ya da içeriğini etkilediyse üye devlet kullanıcıları gecikmeden bilgilendirir (madde 5a(6)).

== Gerekçeler ne söylüyor?

Maddeler bağlayıcı hükümleri koyar; gerekçeler ise bu hükümlerin arkasındaki düşünceyi açar. İki gerekçe, mühendis için özellikle yol göstericidir. 13. gerekçe, madde 5a(4)(d)’deki işlem kaydının ne içermesi gerektiğini anlatır: işlemin tarihi ve saati, karşı tarafın kimliği, istenen kişisel veriler ve paylaşılan veriler. Gerekçeye göre bu bilgi, işlem tamamlanmasa bile saklanmalı ve bu işlev varsayılan olarak açık olmalıdır. 14. gerekçe ise üye devletleri, sıfır bilgi ispatı gibi farklı gizlilik koruyucu teknolojileri cüzdana katmaya çağırır; bu yöntemler, bir güvenen tarafın kişinin kimlik verisine dayanan bir ifadenin doğru olup olmadığını, verinin kendisini görmeden doğrulamasına imkân vermelidir \[1\]. Dizinin dördüncü yazısında anlattığımız yaş ispatı örneği, bu gerekçenin somut bir karşılığıdır.

#kutu("ornek", [Elif’in paneli])[
Aynur’un Berlin’de yaşayan ve çalışan kuzeni Elif’in, yaşadığı ülkenin sunduğu bir AB cüzdanı olduğunu varsayalım. Bir akşam Elif cüzdanının işlem panelini açıyor. Panel, son bir ayda cüzdanından veri isteyen bütün kurumları, her birinin ne istediğini ve Elif’in neyi paylaştığını listeliyor (madde 5a(4)(d)(i)). Listede tanımadığı bir çevrimiçi mağaza var; mağaza bir indirim kampanyası için doğum tarihini istemiş, Elif de dalgınlıkla onaylamış. Elif panelden mağazaya kişisel verisinin silinmesi talebini gönderiyor (madde 5a(4)(d)(ii)). Mağazanın kayıt bilgilerinde doğum tarihi istemeye dair bir amaç göremediği için, isteği veri koruma otoritesine bildirmeyi de düşünüyor (madde 5a(4)(d)(iii)). Bu işlemlerin hepsi, tüzüğün cüzdana yazdığı haklardır; ama sonucun ne olacağı, mağazanın kaydına, veri koruma hukukuna ve otoritenin değerlendirmesine bağlıdır.
]

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Madde 5a, bir cüzdanın hem işlev listesini hem de tasarım kısıtlarını içerir. İşlevler (seçici açıklama, takma ad, cüzdandan cüzdana, işlem paneli, imza, taşıma) bir ürün yol haritası gibi okunabilir. Kısıtlar (veren kuruma bilgi vermemek, izlemeye izin vermemek, gereğinden fazla veri toplamamak, gönüllülük, ücretsizlik, açık kaynak) ise mimari kararları belirler.
]

= Uygulama Tüzükleri: Mühendisin Asıl Okuduğu Metinler

== Neden ayrı metinler?

Ana tüzük hangi belge biçiminin, hangi protokolün, hangi standardın kullanılacağını söylemez. Bu bilinçli bir tercihtir: Teknoloji yasama sürecinden hızlı değişir ve bir ayrıntıyı değiştirmek için Parlamento’dan ve Konsey’den yeni bir tüzük geçirmek gerekmesin istenir. Tüzük bu yüzden ayrıntıyı Komisyon’a bırakır. Madde 5a(23), Komisyon’un 21 Kasım 2024’e kadar cüzdanın işlevleri ve bildirimler için #{strong[referans standartların listesini]} ve gerekirse şartnameleri ve usulleri uygulama tüzükleriyle belirlemesini ister. Benzer yetkiler madde 5b(11), 5c(6), 5d(7), 5e(5), 45d(5), 45e(2) ve 45f(6) gibi hükümlerde tekrar eder \[2\].

== Hangi uygulama tüzükleri var?

#tablo([#{strong[Tablo 3.]} Cüzdanla ilgili başlıca uygulama tüzükleri.], (11fr, 48fr, 12fr, 13fr), ([Uygulama tüzüğü], [Konu], [Kabul], [Resmî Gazete],), (
  ([2024\/2977], [Cüzdanlara verilen kişi kimlik verileri ve öznitelik onayları], [28 Kasım 2024], [4 Aralık 2024],),
  ([2024\/2979], [Cüzdanların bütünlüğü ve temel işlevleri], [28 Kasım 2024], [4 Aralık 2024],),
  ([2024\/2980], [Cüzdan ekosistemine ilişkin Komisyon’a yapılan bildirimler], [28 Kasım 2024], [4 Aralık 2024],),
  ([2024\/2981], [Cüzdanların sertifikasyonu], [28 Kasım 2024], [4 Aralık 2024],),
  ([2024\/2982], [Desteklenecek protokoller ve arayüzler], [28 Kasım 2024], [4 Aralık 2024],),
  ([2025\/846], [Gerçek kişilerin sınır ötesi kimlik eşleştirmesi], [6 Mayıs 2025], [7 Mayıs 2025],),
  ([2025\/847], [Cüzdanlardaki güvenlik ihlallerine tepki], [6 Mayıs 2025], [7 Mayıs 2025],),
  ([2025\/848], [Cüzdana güvenen tarafların kaydı], [6 Mayıs 2025], [7 Mayıs 2025],),
  ([2025\/849], [Sertifikalı cüzdanlar listesi için bilgi gönderimi], [6 Mayıs 2025], [7 Mayıs 2025],),
  ([2025\/1569], [Nitelikli öznitelik onayları ve kamu kurumlarının verdiği onaylar], [29 Temmuz 2025], [30 Temmuz 2025],),
  ([2026\/798], [Kullanıcıların cüzdana uzaktan kaydı için referans standartlar], [7 Nisan 2026], [8 Nisan 2026],),
  ([2026\/1730], [2025\/848’i (güvenen taraf kaydı) uygulanacak standartlar bakımından değiştirir], [15 Temmuz 2026], [22 Temmuz 2026],),
  ([2026\/1731], [2024\/2977, 2979, 2980 ve 2982’yi uygulanacak standartlar bakımından değiştirir], [15 Temmuz 2026], [22 Temmuz 2026],),
  ([2026\/1735], [2025\/1569’u uygulanacak standartlar bakımından değiştirir], [15 Temmuz 2026], [22 Temmuz 2026],),
))

Tablodaki ilk beş tüzük dizinin birçok yazısının hukuki dayanağıdır \[6–10\]. Mayıs 2025’teki ikinci paket kimlik eşleştirmeyi, güvenlik ihlallerini, güvenen taraf kaydını ve sertifikalı cüzdan listesini düzenledi \[11\]. Temmuz 2026’daki üç tüzük ise yeni bir şey eklemekten çok, ilk paketlerin atıf yaptığı standartları ARF’nin ve standart kuruluşlarının yeni sürümleriyle güncelledi \[12\]. 2026\/1731’in gerekçesi bunu açıkça söyler: Mimari ve başvuru çerçevesi ilk uygulama tüzüklerinden bu yana önemli ölçüde geliştiği için bu tüzüklerin yeni standartlara, şartnamelere ve usullere uyarlanması gerekmiştir. Nisan 2026’da yayımlanan 2026\/798 sayılı Uygulama Tüzüğü ise kullanıcıların cüzdana uzaktan kaydı için referans standartları belirledi \[19\]. Güven hizmetleri tarafında da ayrı uygulama tüzükleri çıktı; örneğin 2025\/2531 sayılı Uygulama Tüzüğü nitelikli elektronik defterler için referans standartları belirledi.

== Uygulama tüzükleri standartlara nasıl bağlanır?

Bir uygulama tüzüğü çoğu zaman bir standardın tamamını kopyalamaz; ona atıf yapar ve gerekiyorsa üzerine ek kurallar koyar. Bu, mühendisin okuma düzenini belirler. Önce uygulama tüzüğü okunur, sonra tüzüğün atıf yaptığı standardın atıf yapılan sürümü, sonra da uygulama tüzüğünün o standarda eklediği ya da ondan çıkardığı kurallar.

#kutu("teknik", [Bir uygulama tüzüğünden bir protokole])[
2026\/1731 sayılı Uygulama Tüzüğü’nün 2024\/2979’a eklediği Ek Ib, cüzdan birimi kanıtını tarif ederken şöyle bir zincir kurar (sadeleştirilmiştir):

#tablo([], (10fr, 26fr, 40fr), ([Katman], [Metin], [Bu katmanda söylenen],), (
  ([Ana tüzük], [Tüzük 910\/2014, madde 5a(23)], [Komisyon’a uygulama tüzüğü çıkarma yetkisi ve amacı],),
  ([Uygulama tüzüğü], [2024\/2979, madde 6 ve Ek Ib (2026\/1731 ile eklendi)], [cüzdan birimi kanıtının bağlayıcı kuralları],),
  ([Biçim], [RFC 7519 ve OpenID4VCI 1.0, Ek E], [kanıt bir JWT’dir; OpenID4VCI’daki cüzdan kanıtıdır],),
  ([Süre], [Ek Ib’deki kural], [geçerlilik süresi 24 saatten kısadır],),
  ([İptal], [IETF Token Status List], [iptal durumu bir durum listesiyle tutulur],),
))

Tablo yukarıdan aşağıya okunur: Her satır, bir üstündeki metnin atıf yaptığı ya da ayrıntılandırdığı yeri gösterir.

Yani bir mühendisin bu kanıtı üretebilmesi için dört metne bakması gerekir: ana tüzük (yetki ve amaç), uygulama tüzüğü (bağlayıcı kurallar), OpenID4VCI (biçim) ve Token Status List (iptal). Uygulama tüzüğü bazen standardın bir taslak sürümünü de sabitler; örneğin 2026\/1731, Token Status List’in belirli bir taslak sürümüne atıf yapar \[12\]. Standart daha sonra değişse bile AB’de bağlayıcı olan, tüzüğün atıf yaptığı sürümdür.
]

== ARF’nin yeri

Dizide sık sık andığımız Mimari ve Başvuru Çerçevesi (ARF) bu katmanların neresinde duruyor? ARF, 2021\/946 sayılı Tavsiye Kararı’nın çağrısıyla üye devletlerin ve Komisyon’un birlikte geliştirdiği teknik bir çerçevedir \[5, 18\]. Kendisi bağlayıcı bir hukuk metni değildir. Ama uygulama tüzükleri ARF’deki çalışmaya dayanır ve 2026\/1731’in gerekçesinde olduğu gibi bunu açıkça yazar. Pratikte ARF, uygulama tüzüklerinin bir sonraki sürümünde neyin bağlayıcı olacağını önceden gösteren bir taslak defteri gibi çalışır. Bir mühendis için doğru okuma sırası şudur: bağlayıcı olan için uygulama tüzüğü, nedenini ve bağlamını anlamak için ARF.

= Takvim: Saat Ne Zaman İşlemeye Başladı?

== Saati uygulama tüzükleri başlatır

eIDAS 2.0’ın en çok merak edilen sorusu "ne zaman?" sorusudur ve cevabı ilk bakışta şaşırtıcıdır: Tüzük cüzdan için takvimde bir gün yazmaz. Bunun yerine bir saat kurar. Madde 5a(1)’e göre her üye devlet, #{strong[madde 5a(23) ve 5c(6)’da anılan uygulama tüzüklerinin yürürlüğe girdiği tarihten itibaren 24 ay içinde]} en az bir cüzdan sunar. Madde 5f(2)’deki özel sektör kabul yükümlülüğü de aynı tarihten itibaren #{strong[36 ay]} içinde başlar. Madde 45e(1)’deki yetkili kaynaklardan doğrulama yükümlülüğü de yine aynı tarihten itibaren 24 ay içinde yerine getirilir \[2\].

Peki o uygulama tüzükleri ne zaman yürürlüğe girdi? Madde 5a(23)’e dayanan 2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982 ile madde 5c(6)’ya dayanan 2024\/2981, 28 Kasım 2024’te kabul edildi, 4 Aralık 2024’te Resmî Gazete’de yayımlandı ve yayımlarını izleyen yirminci günde, yani #{strong[24 Aralık 2024]}’te yürürlüğe girdi \[6–10\].

#sekil(3, [Son tarihlerin hesaplanması], "figures/a11/sekil-3.svg", yarim: false)

#kutu("teknik", [Hesap adım adım])[
AB tüzükleri genellikle "Resmî Gazete’de yayımlandığı günü izleyen yirminci günde" yürürlüğe girer. Hesaplamak istediğimiz şey, bu yürürlük gününden sayılan sürelerin hangi takvim gününe düştüğüdür. Önce yürürlük günü bulunur. Yayım gününün ertesi günü (5 Aralık) birinci gün sayılır; yirminci gün 24 Aralık’tır:

#formul[$ t_0 &= "4 Aralık 2024" + 20 "gün" = "24 Aralık 2024" $]

Tüzüğün süreleri bu $t_0$ gününden sayılır. Ay olarak verilen bir süre, başladığı günle aynı numaralı günde dolar:

#formul[$ t_0 + 24 "ay" &= "24 Aralık 2026" quad "madde 5a(1) ve 45e(1)" \
t_0 + 36 "ay" &= "24 Aralık 2027" quad "madde 5f(2)" $]

İlk satır cüzdan sunma ve yetkili kaynaklardan doğrulama yükümlülüklerinin, ikinci satır özel sektördeki zorunlu kabulün son günüdür. Yani üye devletlere cüzdan için iki yıl, özel sektördeki güvenen taraflara kabul için üç yıl verilmiştir; iki saat de aynı gün işlemeye başlamıştır.

Aynı yöntem ana tüzüğe de uygulanır: 2024\/1183, 30 Nisan 2024’te yayımlandı ve 20 Mayıs 2024’te yürürlüğe girdi. Temmuz 2026’daki değiştirici uygulama tüzüklerinin bu saatleri yeniden başlatıp başlatmadığı tartışılabilir bir sorudur. Tüzüğün metni "anılan uygulama tüzüklerinin yürürlüğe girdiği tarih" der; bu metne göre saat, ilk tüzüklerin yürürlüğüyle başlamıştır. Bu yazı bu okumayı esas alır, ama kesin yorum yetkili makamlarındır.
]

== Takvimin bütünü

#tablo([#{strong[Tablo 4.]} eIDAS 2.0 takviminin başlıca tarihleri.], (13fr, 48fr, 18fr), ([Tarih], [Olay], [Dayanak],), (
  ([20 Mayıs 2024], [2024\/1183 yürürlüğe girdi], [2024\/1183, madde 2],),
  ([21 Kasım 2024], [Komisyon’un cüzdan uygulama tüzüklerini kabul etmesi için son tarih], [madde 5a(23), 5c(6)],),
  ([24 Aralık 2024], [İlk beş uygulama tüzüğü yürürlükte; süreler buradan sayılır], [2024\/2977–2982],),
  ([21 Mayıs 2026], [Komisyon’un tüzüğün uygulanmasına ilişkin raporu için son tarih], [madde 49(1)],),
  ([22 Temmuz 2026], [Standartları güncelleyen değiştirici uygulama tüzükleri yayımlandı], [2026\/1730, 1731, 1735],),
  ([24 Aralık 2026], [Her üye devlet en az bir cüzdan sunmuş olmalı; yetkili kaynaklardan doğrulama], [madde 5a(1), 45e(1)],),
  ([21 Mayıs 2027], [Eski yönergeye göre uygunluğu belirlenmiş imza aygıtları için geçiş süresinin sonu], [madde 51(1)],),
  ([24 Aralık 2027], [Düzenlenmiş özel sektörde zorunlu kabul], [madde 5f(2)],),
  ([her yıl 31 Mart], [Üye devletlerin cüzdan ve nitelikli güven hizmeti istatistiklerini Komisyon’a raporlaması], [madde 48a(4)],),
  ([21 Mayıs 2030], [Komisyon’un ilerleme raporu; sonra dört yılda bir], [madde 49(3)],),
))

Tablo, kamu kurumlarının kabul yükümlülüğü (madde 5f(1)) ve çok büyük çevrimiçi platformların yükümlülüğü (madde 5f(3)) için bir tarih göstermiyor. Bunun nedeni, bu iki fıkranın kendi tarihlerini yazmamasıdır. Kabul edilecek bir cüzdan ancak üye devletler cüzdan sunduğunda var olacağından, bu yükümlülüklerin pratikte cüzdanların kullanıma girmesiyle anlam kazanacağı düşünülebilir; ama metin bunu açıkça söylemez.

== Bir ürün ekibi takvimi nasıl okumalı?

Takvim, ekosistemdeki her rol için farklı bir yapılacaklar listesi doğurur. Tüzüğün metninden çıkan sıralama kabaca şöyledir.

#{strong[Güvenen taraf olacak bir kurum]} için ilk iş, kurulu olduğu üye devletin kayıt usulünü öğrenmektir, çünkü cüzdandan veri istemeden önce kayıt şarttır (madde 5b(1)). İkinci iş, isteyeceği verileri bugünden belirlemektir; kayıtta bildirmediği bir veriyi sonradan isteyemez (madde 5b(3)). Üçüncü iş, uygulama tüzüklerinin öngördüğü protokolleri ve doğrulama adımlarını sistemine eklemektir. Madde 5f(2) kapsamındaki bir kurum için bu işlerin 24 Aralık 2027’den önce bitmesi gerekir.

#{strong[Bir öznitelik onayı vermek isteyen kurum]} için soru, hangi türde onay vereceğidir. Nitelikli onay vermek, nitelikli güven hizmeti sağlayıcısı statüsü ve denetim gerektirir; kamu kurumu onayı, yetkili kaynaktan sorumlu bir kamu kurumu olmayı ve bildirimi gerektirir (madde 45f(3)); nitelikli olmayan bir onay ise bu ağır şartlara bağlı değildir ama kâğıt belgeyle eşdeğerlik karinesinden de yararlanmaz. Hangi yolun seçileceği, belgenin kullanılacağı yerde ne kadar hukuki etki beklendiğine bağlıdır.

#{strong[Bir cüzdan sağlayıcı]} için takvimin merkezinde sertifikasyon durur: Cüzdan ancak sertifikalandırıldıktan ve üye devletin bildirimiyle listeye girdikten sonra AB cüzdanı olarak sunulabilir (madde 5c, 5d). Bütün roller için ortak iş ise uygulama tüzüklerindeki değişiklikleri izlemektir; Temmuz 2026’da olduğu gibi standart atıfları güncellenebilir.

= Zorunlu Kabul: Cüzdanı Kim Kabul Etmek Zorunda?

== Tavuk ile yumurta sorununa hukuki cevap

Dizinin ilk yazısında, kendi kendine egemen kimlik projelerinin önemli bir kısmının "tavuk ve yumurta" sorunu yüzünden yaygınlaşamadığını anlatmıştık. Kimse cüzdan kullanmadığı için kurumlar belge vermiyor, işe yarar belge olmadığı için de kimse cüzdan indirmiyordu. eIDAS 2.0 bu döngüyü kırmak için zorunluluğu #{strong[kabul eden]} tarafa koyar. Cüzdan kullanmak gönüllüdür (madde 5a(15)); ama kullanıcı cüzdanla gelmek isterse, belirli kurumlar onu geri çeviremez. Bu yükümlülük madde 5f’de dört fıkraya ayrılır (Şekil 4).

#sekil(4, [Madde 5f: cüzdanı kabul etme yükümlülüğünün kapsamı], "figures/a11/sekil-4.svg", yarim: false)

== Kamu kurumları

Madde 5f(1)’e göre üye devletler, bir kamu kurumunun sunduğu çevrimiçi hizmete erişim için elektronik kimlik ve kimlik doğrulama istiyorsa, bu tüzüğe göre sağlanan Avrupa Dijital Kimlik Cüzdanlarını da kabul eder \[2\]. Fıkradaki "de" önemlidir: Cüzdan mevcut kimlik yöntemlerinin yerine geçmez, onların yanına eklenir. Fıkra, tüzüğe göre sağlanan bütün cüzdanların kabul edilmesini ister; maddenin başlığı da "cüzdanlara sınır ötesi güven"dir. Yani bir Fransız vatandaşı, kendi ülkesinin cüzdanıyla bir İtalyan kamu hizmetine girebilmelidir.

== Düzenlenmiş özel sektör

Madde 5f(2), tüzüğün en çok tartışılan hükümlerinden biridir. Fıkraya göre, AB ya da ulusal hukuk tarafından çevrimiçi kimlik belirleme için #{strong[güçlü kullanıcı doğrulaması]} kullanmakla yükümlü tutulan ya da bunu bir sözleşme gereği yapmak zorunda olan özel güvenen taraflar, uygulama tüzüklerinin yürürlüğünden itibaren en geç 36 ay içinde ve yalnızca kullanıcının gönüllü isteği üzerine cüzdanı kabul eder. Fıkra örnek alanları da sayar: ulaşım, enerji, bankacılık, finansal hizmetler, sosyal güvenlik, sağlık, içme suyu, posta hizmetleri, dijital altyapı, eğitim ve telekomünikasyon. Mikro ve küçük işletmeler bu yükümlülüğün dışındadır; bunların tanımı için fıkra Komisyon’un 2003\/361\/AT sayılı Tavsiye Kararı’na atıf yapar \[2\].

Bu hükmü bir mühendisin gözüyle okumak, iki kelimeye dikkat etmeyi gerektirir. Birincisi "güçlü kullanıcı doğrulaması"dır. Tüzük bu kavramı madde 3(51)’de farklı türden en az iki bağımsız faktöre dayanan kimlik doğrulama olarak tanımlar. Yani yükümlülük, hukuken ya da sözleşmeyle çok faktörlü kimlik belirlemenin istendiği durumlarda doğar. İkincisi "sözleşme gereği" ifadesidir. Bir kurum güçlü doğrulamayı bir kanun yüzünden yapmıyor, ama örneğin bir ödeme ağının kuralları gereği yapıyorsa, o da kapsama girebilir. Bir kurumun bu kapsama girip girmediği, o kurumun durumuna göre yapılacak bir hukuki değerlendirmedir.

#kutu("ornek", [Bir bankanın yol haritası])[
Avrupa’daki bir banka, müşterilerinin çevrimiçi bankacılığa girişinde zaten güçlü kullanıcı doğrulaması kullanıyor. Madde 5f(2)’ye göre banka, 24 Aralık 2027’den itibaren, müşteri isterse, girişte ve kimlik belirlemede AB cüzdanını kabul etmek zorunda olacak. Bankanın mühendislik ekibi için bu, iki işin önceden yapılması demek: Kurulu olduğu üye devlette bir güvenen taraf olarak kayıt olmak ve hangi verileri isteyeceğini bildirmek (madde 5b), sonra uygulama tüzüklerinin öngördüğü protokollerle cüzdandan veri isteyen ve gelen yanıtı doğrulayan bir sistem kurmak. Bankanın ayrıca kara para aklamayla mücadele mevzuatını da izlemesi gerekir: AB’nin 2024\/1624 sayılı Tüzüğü, 10 Temmuz 2027’den itibaren uygulanacak ve müşteri kimliğinin doğrulanmasında elektronik kimlik araçlarına yer veriyor \[13\].
]

== Çok büyük çevrimiçi platformlar

Madde 5f(3), Dijital Hizmetler Yasası’nın (Tüzük (AB) 2022\/2065) 33. maddesinde \[15\] anılan #{strong[çok büyük çevrimiçi platformlara]} ayrı bir yükümlülük koyar: Bu platformlar çevrimiçi hizmetlerine erişim için kullanıcı doğrulaması istiyorlarsa, kullanıcı isterse cüzdanı da kabul eder ve kullanımını kolaylaştırır. Fıkra iki sınır da koyar. Kabul yalnızca kullanıcının gönüllü isteği üzerinedir ve yalnızca söz konusu hizmet için gereken en az veriyle sınırlıdır \[2\]. Yani bir sosyal ağ, kullanıcıdan cüzdanla giriş yapmasını istediğinde kimlik kartındaki bütün bilgileri isteyemez. Fıkra, 5f(2)’deki 36 aylık süreye atıf yapmaz ve kendi süresini de yazmaz.

== Kabul edenin ödevleri

Kabul yükümlülüğünün öbür yüzü, güvenen tarafların uyması gereken kurallardır. Madde 5b bunları sıralar. Cüzdana dayanmak isteyen güvenen taraf, kurulu olduğu üye devlette kayıt olur. Kayıtta en az kimlik bilgisini, iletişim bilgisini ve cüzdanı ne için kullanacağını, isteyeceği verilerle birlikte bildirir (madde 5b(2)). Bildirdiği verilerden başkasını isteyemez (madde 5b(3)). Üye devlet bu kayıtları elektronik olarak imzalı ya da mühürlü, makinece işlenebilir biçimde kamuya açıklar (madde 5b(5)). Güvenen taraf kullanıcıya kendini tanıtır (madde 5b(8)) ve cüzdandan gelen verinin doğrulamasından kendisi sorumludur. Bir başka hüküm de dizinin beşinci yazısıyla doğrudan ilgilidir: Kullanıcının kimliğinin belirlenmesi AB ya da ulusal hukukça gerekli değilse, güvenen taraf #{strong[takma ad]} kullanılmasını reddedemez (madde 5b(9)) \[2\].

Bu kurallar dizinin önceki yazılarında anlattığımız teknik mekanizmalarla birleşir. Kayıt bilgisi, güvenen tarafın cüzdana gösterdiği sertifikalar aracılığıyla cüzdana ulaşır. Cüzdan, bir güvenen tarafın kayıtlı olduğundan fazlasını istediğini fark edebilir ve kullanıcıyı uyarabilir. Kayıt ve sertifikaların ayrıntısı 2025\/848 ve onu değiştiren 2026\/1730 sayılı Uygulama Tüzükleri’ndedir \[11, 12\].

== Platformların donanımı

Madde 5f ile birlikte okunması gereken bir hüküm daha var. Madde 12b’ye göre, Dijital Piyasalar Yasası’ndaki (Tüzük (AB) 2022\/1925) #{strong[geçit bekçileri]}, cüzdan sağlayıcılarına ve bildirilmiş elektronik kimlik araçlarının verenlerine, kendi işletim sistemlerinin, donanımlarının ve yazılımlarının aynı özelliklerine etkin birlikte çalışabilirlik ve erişim imkânı tanır \[2, 16\]. Dizinin onuncu yazısında, cüzdanların telefonların güvenli donanımına ve cihaz kanıtı hizmetlerine ne kadar bağımlı olduğunu anlatmıştık. Madde 12b bu bağımlılığa karşı tüzüğün koyduğu bir güvencedir.

== Sınır ötesi kimlik eşleştirme

Bir kamu kurumunun cüzdanı kabul etmesi, hikâyenin yalnızca ilk yarısıdır. İkinci yarı, cüzdanla gelen kişinin kurumun kayıtlarındaki hangi kişi olduğunu bulmaktır. Bir İtalyan belediyesi, Alman cüzdanıyla gelen bir kullanıcının kendi kayıtlarındaki dosyasını nasıl bulacak? Tüzük bu soruya madde 11a ile cevap verir: Üye devletler, sınır ötesi hizmetlerde güvenen taraf olarak hareket ettiklerinde, bildirilmiş kimlik araçlarını ya da cüzdanları kullanan gerçek kişiler için kimliğin #{strong[tereddütsüz eşleştirilmesini]} sağlar (madde 11a(1)). Aynı madde, eşleştirme için kullanılan kişisel verilerin yüksek düzeyde korunmasını ve kullanıcıların profillenmesinin önlenmesini de ister (madde 11a(2)) \[2\]. Ayrıntılar 2025\/846 sayılı Uygulama Tüzüğü’ndedir \[11\]. Mühendis için bu, cüzdandan gelen PID ile kurumun kendi kayıtları arasında bir eşleştirme mantığı kurmak demektir; bu mantığın gereğinden fazla veri istememesi de tüzüğün gizlilik kurallarının bir parçasıdır.

= Güven Hizmetleri Tarafında Neler Değişti?

eIDAS 2.0’ı yalnızca cüzdan tüzüğü olarak okumak eksik olur. Tüzük güven hizmetlerinin listesini de genişletti. Madde 3(16)’daki güven hizmeti tanımı, elektronik imza, mühür ve zaman damgası gibi eski kalemlerin yanına öznitelik onaylarının verilmesini ve doğrulanmasını, uzaktan imza ve mühür aygıtlarının yönetimini, elektronik arşivlemeyi ve elektronik defterlere veri kaydını ekledi.

== Öznitelik onayları

Dizinin ikinci yazısında "doğrulanabilir belge" dediğimiz şeyin tüzükteki adı #{strong[elektronik öznitelik onayıdır]}. Tüzük bu onayları güvence türüne göre üçe ayırır ve her birinin hukuki etkisini ayrı ayrı yazar \[2\].

#tablo([#{strong[Tablo 5.]} Öznitelik onaylarının türleri ve hukuki etkileri.], (21fr, 44fr, 48fr, 15fr), ([Tür], [Kim verir?], [Hukuki etki], [Dayanak],), (
  ([Öznitelik onayı (EAA)], [herhangi bir sağlayıcı], [elektronik olduğu ya da nitelikli olmadığı için hukuki etkisi ve delil değeri reddedilemez], [madde 45b(1)],),
  ([Nitelikli öznitelik onayı (QEAA)], [nitelikli güven hizmeti sağlayıcısı; Ek V’i karşılar], [hukuka uygun verilmiş kâğıt belgeyle aynı hukuki etki], [madde 45b(2), 45d],),
  ([Kamu kurumu onayı (PuB-EAA)], [yetkili kaynaktan sorumlu ya da onun adına görevlendirilmiş kamu kurumu; Ek VII’yi karşılar], [kâğıt belgeyle aynı hukuki etki; bütün üye devletlerde aynı statüde tanınır], [madde 45b(2), 45b(3), 45f],),
))

Tüzük bu onaylara birkaç kural daha bağlar. İptal edilen nitelikli onay ve kamu kurumu onayı, iptal anından itibaren geçerliliğini yitirir ve durumu hiçbir koşulda geri alınamaz (madde 45d(4), 45f(4)). Dizinin yedinci yazısında iptal ile askıya almanın farkını anlatırken bu kurala değinmiştik. Öznitelik onayı sağlayıcıları, kullanıcının cüzdanı hangi üye devletten almış olursa olsun onaylarını o cüzdana verebilmelidir (madde 45g(1)). Bu sağlayıcılar onay hizmetine ilişkin kişisel verileri başka hizmetlerindeki verilerle birleştiremez ve mantıksal olarak ayrı tutar (madde 45h) \[2\].

== Yetkili kaynaklardan doğrulama

Madde 45e, tüzüğün az bilinen ama etkisi büyük olabilecek hükümlerinden biridir. Üye devletler, 24 Aralık 2026’ya kadar, en az Ek VI’da sayılan öznitelikler için, bu öznitelikler kamu sektöründeki yetkili kaynaklara dayanıyorsa, nitelikli öznitelik onayı sağlayıcılarının bu öznitelikleri kullanıcının isteği üzerine elektronik yolla doğrulayabilmesi için önlem alır (madde 45e(1)). Ek VI’daki liste on bir kalemdir: adres, yaş, cinsiyet, medeni durum, aile bileşimi, uyruk ya da vatandaşlık, eğitim nitelikleri, unvanları ve lisansları, mesleki nitelikler, unvanlar ve lisanslar, gerçek ya da tüzel kişileri temsil yetkileri, kamu izinleri ve lisansları ve tüzel kişiler için mali ve şirket verileri \[2\]. Mühendislik açısından bu, kamu kayıtlarının nitelikli güven hizmeti sağlayıcılarına açılacak arayüzler demektir. Bu arayüzlerin teknik standartları 2025\/1569 ve onu değiştiren 2026\/1735 sayılı Uygulama Tüzükleri’nde belirlenir \[12, 14\].

== Arşiv, defter, web sitesi sertifikaları ve uzaktan imza

#{strong[Elektronik arşivleme.]} Nitelikli bir elektronik arşivleme hizmetiyle saklanan veri ve belgeler, saklama süresi boyunca bütünlük ve köken karinesinden yararlanır (madde 45i(2)). Nitelikli hizmetin şartları madde 45j’dedir.

#{strong[Elektronik defterler.]} Nitelikli bir elektronik defterdeki veri kayıtları, tekil ve doğru kronolojik sıralama ile bütünlük karinesinden yararlanır (madde 45k(2)). Nitelikli defterin şartları madde 45l’dedir: bir ya da daha fazla nitelikli güven hizmeti sağlayıcısı tarafından kurulup yönetilmesi, kayıtların kökenini belirlemesi, tekil kronolojik sırayı sağlaması ve sonradan yapılan her değişikliği hemen fark edilebilir kılması \[2\]. Dizinin on ikinci yazısında, blokzincirin kimlikte nerede değer katabileceğini tartışırken bu maddeye döneceğiz.

#{strong[Web sitesi kimlik doğrulama sertifikaları.]} Madde 45(1a), web tarayıcılarının nitelikli web sitesi sertifikalarını tanımasını ve sertifikadaki kimlik bilgisini kullanıcı dostu biçimde göstermesini ister; madde 45a ise tarayıcıların güvenlik kaygısıyla alabileceği önlemleri ve bildirim ödevlerini düzenler \[2\].

#{strong[Uzaktan imza aygıtlarının yönetimi.]} Bir nitelikli imza aygıtının kullanıcı adına uzaktan yönetilmesi artık kendi başına bir nitelikli güven hizmetidir (madde 29a; mühürler için 39a). Cüzdanların ücretsiz nitelikli imza sunma yükümlülüğü (madde 5a(5)(g)) pratikte büyük ölçüde bu hizmete dayanacaktır.

== Yaptırımlar

Madde 16, üye devletlerin nitelikli ve nitelikli olmayan güven hizmeti sağlayıcılarının ihlallerine en az belirli bir üst sınırı olan idari para cezaları öngörmesini ister: gerçek kişiler için en az 5 milyon avro, tüzel kişiler için 5 milyon avro ya da dünya çapındaki yıllık cironun yüzde 1’i, hangisi yüksekse \[2\]. Bu rakamlar, ulusal hukukta öngörülecek azami cezanın alt sınırıdır; bir ihlalde verilecek cezanın kendisini göstermez.

= Sertifikasyon, Güven İşareti ve Denetim

== Cüzdan nasıl sertifikalandırılır?

Bir üye devletin cüzdanı, kullanıma girmeden önce sertifikalandırılır. Madde 5c(1)’e göre cüzdanın ve sağlandığı elektronik kimlik sisteminin, madde 5a(4), 5a(5) ve 5a(8)’deki şartlara ve 5a(14)’teki mantıksal ayrım şartına uygunluğu, üye devletlerin görevlendirdiği uygunluk değerlendirme kuruluşlarınca sertifikalandırılır. Bu şartların siber güvenlikle ilgili kısımları, AB’nin Siber Güvenlik Yasası (Tüzük (AB) 2019\/881) \[17\] kapsamında kabul edilen Avrupa siber güvenlik sertifikasyon şemalarına göre değerlendirilir (madde 5c(2)). Böyle bir şemanın bulunmadığı ya da şartları yalnızca kısmen kapsadığı durumlarda üye devletler, uygulama tüzüklerine uygun #{strong[ulusal sertifikasyon şemaları]} kurar (madde 5c(3)) \[2\].

Sertifika en fazla beş yıl geçerlidir ve iki yılda bir güvenlik açığı değerlendirmesi yapılması şartına bağlıdır. Bulunan bir açık zamanında giderilmezse sertifika iptal edilir (madde 5c(4)). Sertifikasyonun ayrıntıları 2024\/2981 sayılı Uygulama Tüzüğü’ndedir. Bu tüzük, dizinin onuncu yazısında andığımız gibi, cüzdanın anahtarları koruyan donanımının yüksek saldırı potansiyeline karşı değerlendirilmesini ister \[9\].

== Sertifikalı cüzdanlar listesi ve Güven İşareti

Sertifikalandırılan cüzdanları üye devletler Komisyon’a ve İşbirliği Grubu’na bildirir. Komisyon bu bilgilere dayanarak sertifikalı cüzdanların listesini kurar, Resmî Gazete’de yayımlar ve makinece okunabilir biçimde tutar (madde 5d(3)). Listede bir değişiklik olduğunda Komisyon bir ay içinde güncellemeyi yayımlar (madde 5d(6)) \[2\]. Bilgi gönderiminin biçimi 2025\/849 sayılı Uygulama Tüzüğü’ndedir \[11\].

Kullanıcının bir cüzdanın gerçekten sertifikalı olduğunu görebilmesi için tüzük bir de #{strong[AB Dijital Kimlik Cüzdanı Güven İşareti]} tanımlar (madde 3(50)). 2026\/1731 sayılı Uygulama Tüzüğü’nün 2024\/2979’a eklediği madde 14a’ya göre cüzdan sağlayıcılar, cüzdan birimlerinin bu işareti göstermesini sağlar; işaretin biçimi tüzüğün eklerinde tanımlanır ve kullanıcı işaretten cüzdanın sertifikasyon bilgisine ulaşabilmelidir \[12\].

== Güvenlik ihlali olursa

Madde 5e, bir cüzdanın ya da onun dayandığı sistemin güvenliği ihlal edildiğinde izlenecek yolu çizer. Cüzdanların ya da diğer cüzdanların güvenilirliğini etkileyen bir ihlal varsa, cüzdanı sağlayan üye devlet cüzdanın sunulmasını ve kullanımını gecikmeden askıya alır; ihlalin ağırlığı haklı kılıyorsa cüzdanı geri çeker. İhlal askıya almadan itibaren üç ay içinde giderilmezse üye devlet cüzdanı geri çeker ve geçerliliğini iptal eder (madde 5e(1)–(2)) \[2\]. 2025\/847 sayılı Uygulama Tüzüğü bu yolun ayrıntısını verir: Askıya alma bilgisinin tek temas noktalarına ve ilgililere en geç 24 saat içinde ulaştırılması, üç ay dolduğunda geri çekmenin en geç 72 saat içinde yapılması gibi \[11\].

== Denetim, istatistik ve değerlendirme

Cüzdan çerçevesinin denetimi her üye devletin belirlediği denetim organındadır (madde 46a). Üye devletler cüzdanların ve nitelikli güven hizmetlerinin işleyişine dair istatistik toplar. Bu istatistikler arasında geçerli cüzdanı olan kişi sayısı, cüzdanı kabul eden hizmetlerin türü ve sayısı, şikâyetler ve güvenlik olayları bulunur. İstatistikler açık ve makinece okunabilir biçimde yayımlanır ve her yıl 31 Mart’a kadar Komisyon’a raporlanır (madde 48a) \[2\]. Komisyon da tüzüğün uygulanmasına ilişkin bir raporu 21 Mayıs 2026’ya kadar sunmakla yükümlüdür. Bu raporda, üçüncü taraf kimlik hizmetlerine dayanan bütün çevrimiçi özel hizmet sağlayıcılarının bildirilmiş kimlik araçlarını ve cüzdanları kabul etmesinin gerekip gerekmediği de değerlendirilir (madde 49(1)– (2)). Sonraki ilerleme raporları 21 Mayıs 2030’dan itibaren dört yılda birdir (madde 49(3)).

= AB Dışındaki Ülkeler: Tüzük Ne Söylüyor?

== Sık yapılan bir karışıklık

Nurlan’ın ikinci sorusu, şirketinin AB’de kayıt olup olamayacağından daha büyüktü: Kazakistan’ın, Azerbaycan’ın ya da Türkiye’nin kendi kimlik cüzdanları bir gün AB’de tanınabilir mi? İnternette bu soruya sık rastlanan bir cevap madde 5f’yi gösterir. Oysa madde 5f, Bölüm 9’da gördüğümüz gibi, AB içindeki kurumların #{strong[AB cüzdanlarını]} kabul etme yükümlülüğüdür ve konusu, tüzüğe göre sağlanan cüzdanlara AB içinde güvenilmesidir. Tüzükte AB dışındaki bir ülkenin cüzdanını Avrupa Dijital Kimlik Cüzdanı sayan ya da onunla eşdeğer tutan bir hüküm yoktur. Madde 5a(1) de cüzdanı, üye devletlerin sunduğu ya da tanıdığı bir araç olarak tanımlar \[2\].

== Madde 14: güven hizmetleri için bir kapı

Tüzükte "üçüncü ülke" ifadesinin geçtiği asıl madde, "Uluslararası boyut" başlıklı 14. maddedir ve bu madde #{strong[güven hizmetleriyle]} sınırlıdır. Madde 14(1)’e göre, bir üçüncü ülkede kurulu güven hizmeti sağlayıcılarının sunduğu güven hizmetleri, bir #{strong[uygulama tüzüğüyle]} ya da AB ile o ülke arasında Avrupa Birliği’nin İşleyişi Hakkında Antlaşma’nın 218. maddesine göre yapılmış bir #{strong[anlaşmayla]} tanınırsa, AB’deki nitelikli güven hizmetleriyle hukuken eşdeğer sayılır. Madde 14(2), bu tanımanın ancak üçüncü ülkedeki sağlayıcıların ve hizmetlerin AB’deki nitelikli sağlayıcılara uygulanan şartları karşılaması durumunda yapılabileceğini söyler ve üçüncü ülkenin tanınan sağlayıcılarının bir güven listesini kurup yayımlamasını ister. Madde 14(3) ise karşılıklılık şartıdır: Bir anlaşma, AB’deki nitelikli güven hizmetlerinin de karşı tarafta eşdeğer tanınmasını sağlamalıdır \[2\].

#sekil(5, [AB dışındaki bir ülke için tüzüğün kapsamı], "figures/a11/sekil-5.svg", yarim: false)

Bu çerçevede birkaç nokta önemli. Birincisi, madde 14’ün tarafları #{strong[devletlerdir]}: Tanıma, AB ile bir üçüncü ülke ya da uluslararası kuruluş arasında olur; bir şirket ya da bir sivil girişim bu yolu kendi başına açamaz. İkincisi, madde 14 nitelikli güven hizmetlerinin eşdeğerliğiyle ilgilidir; elektronik kimlik araçlarının ya da cüzdanların tanınması bu maddenin konusu değildir. Üçüncüsü, madde 14(2)’nin istediği güven listesi şartı, dizinin altıncı yazısında anlattığımız mimariyle doğrudan bağlantılıdır: Bir üçüncü ülkenin AB ile güven hizmetleri alanında tanınma araması, önce kendi güven listesini AB’nin kullandığı biçimde kurmasını gerektirir.

== Teknik uyum ve hukuki tanıma

Tüzüğün ve uygulama tüzüklerinin atıf yaptığı standartların hepsi kamuya açıktır: SD-JWT VC, ISO\/IEC 18013-5 mdoc, OpenID4VCI, OpenID4VP, ETSI’nin güven listesi standartları. AB dışındaki bir ülke ya da kurum, bu standartları kendi sisteminde kullanmakta serbesttir. Böyle yapan bir sistem, teknik olarak AB cüzdanlarıyla aynı dili konuşur. Ama teknik uyum hukuki tanıma demek değildir. AB’deki bir güvenen taraf, AB dışındaki bir kurumun imzaladığı bir belgeyi teknik olarak doğrulayabilir; o belgeye hangi hukuki değeri vereceği ise AB hukukuna, ulusal hukuka ve varsa iki taraf arasındaki anlaşmalara bağlıdır.

Türkiye’nin durumu bu ayrımı somutlaştırır. Türkiye’nin 5070 sayılı Elektronik İmza Kanunu’na dayanan kendi elektronik imza düzeni \[20\], kendi elektronik sertifika hizmet sağlayıcıları ve kendi e-Devlet kimlik altyapısı vardır. Bunların AB’de nitelikli güven hizmetleriyle eşdeğer sayılması, madde 14’teki yollardan biriyle, yani AB ile Türkiye arasında bir anlaşma ya da Komisyon’un bir uygulama tüzüğüyle mümkündür. Kazakistan, Özbekistan, Azerbaycan, Kırgızistan ve Türkmenistan için de durum aynıdır. Türk devletlerinin kendi aralarında karşılıklı tanıma kurması ise eIDAS’ın konusu değildir; bu devletler isterse, kendi aralarındaki düzenlemelerde AB’nin modelinden ve standartlarından yararlanabilir. Dizinin on üçüncü yazısı bu ülkelerin bugünkü kimlik altyapılarına ayrıntılı bakacak.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
eIDAS 2.0’da AB dışındaki ülkeler için tek açık hukuki kapı madde 14’tür ve bu kapı yalnızca güven hizmetlerine açılır. Yol, devletler arası bir anlaşmadan ya da Komisyon’un bir uygulama tüzüğünden geçer ve karşılıklılık ile bir güven listesi ister. Tüzükte AB dışı cüzdanların tanınmasına dair bir hüküm yoktur. Madde 5f ise AB içindeki kurumların AB cüzdanlarını kabul etmesiyle ilgilidir; üçüncü ülke tanıması değildir. Aynı standartları kullanmak teknik birlikte çalışabilirlik sağlar, hukuki tanıma sağlamaz.
]

= Eski ve Yeni eIDAS Yan Yana

Buraya kadar anlattıklarımızı tek bir tabloda toplayalım. Tablo 6, 2014 metniyle 2024 değişikliğinden sonraki metni, bir mühendisin ve bir yöneticinin en çok soracağı başlıklarda karşılaştırıyor.

#tablo([#{strong[Tablo 6.]} eIDAS (2014) ile eIDAS 2.0’ın karşılaştırması.], (17fr, 43fr, 48fr), ([Başlık], [eIDAS (910\/2014, ilk hâli)], [eIDAS 2.0 (2024\/1183 ile değişik)],), (
  ([Elektronik kimlik modeli], [ülkelerin bildirdiği ulusal sistemler; kişi her girişte kendi ülkesinin sistemine yönlendirilir], [ulusal sistemlerin yanında cüzdan; belge kişinin cüzdanında durur],),
  ([Üye devletin yükümlülüğü], [kimlik sistemi bildirmek isteğe bağlı], [en az bir cüzdan sunmak zorunlu (madde 5a(1))],),
  ([Taşınan veri], [temel kimlik verisi], [PID ve her türlü öznitelik onayı (diploma, ehliyet, meslek belgesi)],),
  ([Kimler kabul eder?], [başka üye devletlerin kamu hizmetleri], [kamu kurumları, düzenlenmiş özel sektör, çok büyük çevrimiçi platformlar (madde 5f)],),
  ([Gizlilik kuralları], [genel veri koruma hukuku], [seçici açıklama, veren kuruma bilgi vermeme, izlenmeme, bağlanamazlık, işlem paneli (madde 5a)],),
  ([Doğrulayanlar], [özel bir kayıt yok], [kayıt, bildirim ve "bildirdiğinden fazlasını isteyememe" (madde 5b)],),
  ([Güven hizmetleri], [imza, mühür, zaman damgası, kayıtlı teslimat, web sitesi sertifikası], [bunlara ek olarak öznitelik onayı, uzaktan aygıt yönetimi, arşiv, defter (madde 3(16))],),
  ([Güvencenin kanıtı], [kimlik sistemleri için üye devletler arası değerlendirme], [cüzdan sertifikasyonu, Resmî Gazete’de liste, Güven İşareti (madde 5c, 5d)],),
  ([Nitelikli imza], [piyasada sunulan bir hizmet], [cüzdanda gerçek kişilere varsayılan ve ücretsiz (madde 5a(5)(g))],),
  ([Teknik ayrıntının yeri], [uygulama tüzükleri (güvence düzeyleri, birlikte çalışabilirlik)], [uygulama tüzükleri, onların atıf yaptığı standartlar ve ARF],),
))

Tablonun en sağ sütununa bakınca, eIDAS 2.0’ın bir teknoloji tüzüğü olmaktan çok bir #{strong[ekosistem tüzüğü]} olduğu görülüyor. Tüzük kimin neyi sunmak, kabul etmek, kaydetmek, sertifikalandırmak ve denetlemek zorunda olduğunu söylüyor. Bir cüzdanın nasıl yazılacağı ise uygulama tüzüklerine ve standartlara bırakılıyor.

= Sınırlar ve Açık Sorular

#{strong[Takvime yetişmek.]} Tüzük her üye devletin 24 Aralık 2026’ya kadar en az bir cüzdan sunmasını istiyor. Bütün üye devletlerin bu tarihe sertifikalı bir cüzdanla yetişip yetişmeyeceğini, Komisyon’un Resmî Gazete’de yayımlayacağı sertifikalı cüzdanlar listesi gösterecek (madde 5d). Bir cüzdanın "sunulmuş" sayılması için hangi aşamaya gelmiş olması gerektiği, örneğin bütün nüfusa mı yoksa bir pilot grubuna mı açılmış olması gerektiği, metinde ayrıntılı tanımlanmış değil.

#{strong[Tarihi yazılmamış yükümlülükler.]} Kamu kurumlarının (madde 5f(1)) ve çok büyük çevrimiçi platformların (madde 5f(3)) kabul yükümlülükleri için metin bir tarih yazmıyor. Değiştirici uygulama tüzüklerinin 24 ve 36 aylık saatleri yeniden başlatıp başlatmadığı da metnin lafzından okunabilse de tartışmaya açık. Bu sorulara kesin cevabı yetkili makamlar ve uygulama verecek.

#{strong["Sözleşme gereği" güçlü doğrulama.]} Madde 5f(2), güçlü kullanıcı doğrulamasını hukuk gereği yapanların yanında sözleşme gereği yapan özel kuruluşları da kapsıyor. Bir kurumun hangi sözleşme ilişkileri yüzünden bu kapsama gireceği, sektörden sektöre farklı değerlendirilebilir.

#{strong[Aşırı kimlik isteme.]} Dizinin ilk yazısında, cüzdandan kimlik istemenin kolaylaşmasının, gerekmediği hâlde kimlik isteme eğilimini artırabileceğini söylemiştik. Tüzüğün cevabı güvenen taraf kaydı ve "bildirdiğinden fazlasını isteyememe" kuralıdır (madde 5b(3)). Bir kurumun hangi veriyi istemeye gerçekten hakkı olduğuna kayıt sırasında kimin ve hangi ölçütle karar vereceği, üye devletlerin uygulamasıyla şekillenecek.

#{strong[AB dışındaki güvenen taraflar.]} Tüzük güvenen tarafların kurulu oldukları üye devlette kayıt olmasını öngörüyor (madde 5b(1)). AB dışında kurulu bir kuruluşun AB cüzdanlarından doğrudan veri istemek için nasıl bir yol izleyeceği, metinde ayrıca düzenlenmiş değil. Nurlan’ın şirketi gibi AB’ye hizmet veren AB dışı şirketler için bu, pratikte en çok sorulacak sorulardan biri olacak.

#{strong[Üçüncü ülkeler.]} Madde 14 güven hizmetleri için bir kapı açıyor; cüzdanlar için ise tüzükte bir kapı yok. Madde 49(1), Komisyon’un raporunda tüzüğün kapsamının değiştirilmesinin uygun olup olmadığını değerlendirmesini istiyor. AB dışındaki cüzdanlarla birlikte çalışabilirliğin ileride hukuki bir zemine kavuşup kavuşmayacağı bu değerlendirmelere bağlı.

#{strong[Hukukun ve standardın hızı.]} Temmuz 2026’daki değiştirici uygulama tüzükleri, ilk paketin yürürlüğünden yaklaşık bir buçuk yıl sonra standart atıflarını güncellemek zorunda kaldı. Bir yandan bu, sistemin esnek olduğunu gösteriyor; öte yandan, bir ürünü bugünkü uygulama tüzüğüne göre yapan ekibin, birkaç yıl içinde yeni bir standart sürümüne geçmek zorunda kalabileceği anlamına geliyor. Mühendis için eIDAS 2.0’a uyum, bir kez yapılıp bitmez; sürekli izlenmesi gerekir.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisini yayımlayan Tamga Network, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır ve AB’nin eIDAS 2.0 ve EUDI profillerine dayanır \[21\]. Bu yazının açısından bunun anlamını açıkça söylemek gerekir.

eIDAS 2.0, AB üye devletlerini ve AB’de faaliyet gösteren kurumları bağlayan bir AB tüzüğüdür; AB dışında kendiliğinden bir hukuki etkisi yoktur. Tamga Network’ün yaptığı, bu tüzüğün ve uygulama tüzüklerinin atıf yaptığı açık standartları (belge biçimleri, protokoller, imzalı güven listeleri) AB dışındaki ülkeler için uygulanabilir bir çerçeveye dönüştürmektir. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayanları imzalı güven listelerinde tanır ve bu listelerde kişisel veri yer almaz. Ağın kendi kuralları da, tüzüğün güvenen taraf kaydını hatırlatan biçimde, doğrulayanlara verilen kayıt sertifikalarının politikasını kamuya açık olarak yayımlar \[22\].

Bölüm 12’de anlattığımız ayrım burada da geçerlidir. Tamga Network’ün listeleri AB’nin listeler listesinde değildir; Tamga Network bir AB cüzdanı, bir AB nitelikli güven hizmeti sağlayıcısı ya da bir AB denetim kuruluşu değildir. AB standartlarıyla teknik uyum, AB’de hukuki tanıma anlamına gelmez. Böyle bir tanıma, madde 14’te gördüğümüz gibi, devletler arasında kurulacak bir düzenin konusudur. Ağın hedefi, o gün geldiğinde Türk dünyasındaki kurumların ve devletlerin AB’nin diliyle konuşmaya hazır bir altyapıya sahip olmasıdır.

= Sonuç

Nurlan, o uzun metnin karşısında ilk gün kaybolmuştu. Bu yazıda o metni bir haritaya dönüştürmeye çalıştık. Haritanın en üstünde 910\/2014 sayılı Tüzük ve onu 2024’te değiştiren 2024\/1183 duruyor. Bu metin rolleri, yükümlülükleri ve saatleri kuruyor: Her üye devlet bir cüzdan sunacak, kamu kurumları ve düzenlenmiş özel sektör onu kabul edecek, cüzdandan veri isteyen herkes önce kayıt olacak, cüzdanlar sertifikalandırılıp listelenecek. Tüzük cüzdana bir işlev listesi kadar bir yasaklar listesi de yazıyor: veren kuruma kullanım bilgisi vermemek, izlemeye izin vermemek, gereğinden fazla veri toplamamak, kimseyi kullanmaya zorlamamak.

Haritanın ikinci katında uygulama tüzükleri var. Bir mühendisin gerçekten uyguladığı kurallar, yani hangi biçim, hangi protokol, hangi standart sürümü, burada yazıyor ve bu kurallar Temmuz 2026’da olduğu gibi zaman zaman güncelleniyor. Üçüncü katta ise standartların kendisi ve onların arkasında, bağlayıcı olmasa da yönü gösteren ARF duruyor.

AB dışından bakan biri için haritanın en önemli kenar notu şudur: Tüzük, AB dışındaki ülkeler için yalnızca güven hizmetlerine ve yalnızca devletler arası bir yolla açılan bir kapı bırakıyor. Standartlar ise herkese açık. Bu iki gerçeğin arasındaki boşluk, dizinin on üçüncü yazısında Türk dünyasının kimlik altyapılarına bakarken yeniden karşımıza çıkacak.

Bir tüzüğü okumak bir mühendis için sıkıcı görünebilir. Ama bu yazının gösterdiği gibi, eIDAS 2.0’ın maddelerinin büyük kısmı, bu dizide anlattığımız teknik mekanizmaların neden var olduğunu açıklıyor. Seçici açıklama, bağlanamazlık, iptal, güven listeleri ve cüzdan güvenliği, tüzükte birer madde numarasına sahip. Bir sonraki yazıda, tüzüğün de yeni bir güven hizmeti olarak tanıdığı elektronik defterlerden yola çıkıp blokzincirin dijital kimlikte gerçekten nerede işe yaradığını tartışacağız.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 11 Nisan 2024 tarihli ve 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, L serisi, 30 Nisan 2024. ELI: http:\/\/data.europa.eu\/eli\/reg\/2024\/1183\/oj]

#kaynak("2")[Avrupa Parlamentosu ve Konseyi (2014). #{emph[İç pazarda elektronik işlemler için elektronik kimlik ve güven hizmetlerine ilişkin 910\/2014 sayılı Tüzük (AB)]}, 2024\/1183 ile değiştirilmiş konsolide metin (18 Ekim 2024 sürümü). EUR-Lex, CELEX 02014R0910-20241018. İlk yayım: Avrupa Birliği Resmî Gazetesi, L 257, 28 Ağustos 2014.]

#kaynak("3")[Avrupa Komisyonu (2015). #{emph[Elektronik kimlik araçlarının güvence düzeylerine ilişkin asgari teknik şartları ve prosedürleri belirleyen 2015\/1502 sayılı Uygulama Tüzüğü (AB).]} Avrupa Birliği Resmî Gazetesi, L 235, 9 Eylül 2015.]

#kaynak("4")[Avrupa Komisyonu (2021). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğün değiştirilmesine ilişkin Avrupa Parlamentosu ve Konsey Tüzüğü önerisi.]} COM(2021) 281 final, 3 Haziran 2021.]

#kaynak("5")[Avrupa Komisyonu (2021). #{emph[Avrupa Dijital Kimlik Çerçevesine yönelik eşgüdümlü bir yaklaşım için ortak bir Birlik Araç Kutusu hakkında 2021\/946 sayılı Tavsiye Kararı (AB).]} 3 Haziran 2021.]

#kaynak("6")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarına verilen kişi kimlik verileri ve elektronik öznitelik onayları bakımından 2024\/2977 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("7")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarının bütünlüğü ve temel işlevleri bakımından 2024\/2979 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("8")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanı ekosistemine ilişkin Komisyon’a yapılan bildirimler bakımından 2024\/2980 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("9")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarının sertifikasyonu bakımından 2024\/2981 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("10")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin desteklemesi gereken protokoller ve arayüzler bakımından 2024\/2982 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("11")[Avrupa Komisyonu (2025). #{emph[2025\/846 (gerçek kişilerin sınır ötesi kimlik eşleştirmesi), 2025\/847 (cüzdanlardaki güvenlik ihlallerine tepkiler), 2025\/848 (cüzdana güvenen tarafların kaydı) ve 2025\/849 (sertifikalı cüzdanlar listesi için bilgi gönderimi) sayılı Uygulama Tüzükleri (AB).]} 6 Mayıs 2025; Avrupa Birliği Resmî Gazetesi, 7 Mayıs 2025.]

#kaynak("12")[Avrupa Komisyonu (2026). #{emph[2025\/848’i değiştiren 2026\/1730, 2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982’yi değiştiren 2026\/1731 ve 2025\/1569’u değiştiren 2026\/1735 sayılı Uygulama Tüzükleri (AB), uygulanacak standartlar ve şartnameler bakımından.]} 15 Temmuz 2026; Avrupa Birliği Resmî Gazetesi, 22 Temmuz 2026.]

#kaynak("13")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Finansal sistemin kara para aklama ve terörün finansmanı amacıyla kullanılmasının önlenmesine ilişkin 2024\/1624 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 19 Haziran 2024.]

#kaynak("14")[Avrupa Komisyonu (2025). #{emph[Nitelikli elektronik öznitelik onayları ve kamu kurumlarınca ya da onlar adına verilen elektronik öznitelik onayları bakımından 2025\/1569 sayılı Uygulama Tüzüğü (AB).]} 29 Temmuz 2025; Avrupa Birliği Resmî Gazetesi, 30 Temmuz 2025.]

#kaynak("15")[Avrupa Parlamentosu ve Konseyi (2022). #{emph[Dijital hizmetler için tek pazara ilişkin 2022\/2065 sayılı Tüzük (AB) (Dijital Hizmetler Yasası).]} Avrupa Birliği Resmî Gazetesi, L 277, 27 Ekim 2022.]

#kaynak("16")[Avrupa Parlamentosu ve Konseyi (2022). #{emph[Dijital sektörde rekabete açık ve adil piyasalara ilişkin 2022\/1925 sayılı Tüzük (AB) (Dijital Piyasalar Yasası).]} Avrupa Birliği Resmî Gazetesi, L 265, 12 Ekim 2022.]

#kaynak("17")[Avrupa Parlamentosu ve Konseyi (2019). #{emph[ENISA ve bilgi ve iletişim teknolojilerinin siber güvenlik sertifikasyonuna ilişkin 2019\/881 sayılı Tüzük (AB) (Siber Güvenlik Yasası).]} Avrupa Birliği Resmî Gazetesi, L 151, 7 Haziran 2019.]

#kaynak("18")[Avrupa Komisyonu. #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF)]}, sürüm 3.0.0, 23 Temmuz 2026. github.com\/eu-digital-identity-wallet.]

#kaynak("19")[Avrupa Komisyonu (2026). #{emph[Kullanıcıların Avrupa Dijital Kimlik Cüzdanına kaydına ilişkin referans standartları belirleyen 2026\/798 sayılı Uygulama Tüzüğü (AB).]} 7 Nisan 2026; Avrupa Birliği Resmî Gazetesi, 8 Nisan 2026.]

#kaynak("20")[Türkiye Büyük Millet Meclisi (2004). #{emph[5070 sayılı Elektronik İmza Kanunu.]} Resmî Gazete, 23 Ocak 2004.]

#kaynak("21")[Tamga Network. #{emph[Tamga Network]} depo tanıtımı ve çerçeve belgeleri. tamga.network; arf.tamga.network.]

#kaynak("22")[Tamga Network. #{emph[Registration Certificate Policy]}, FW-POL-0003, sürüm 1.0.0, 29 Ekim 2026. arf.tamga.network.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Tüzük (AB) 2024\/1183’ün gerekçeleri.]} Maddelerden önce okunması gereken kısım; AB’nin cüzdanla neyi amaçladığını kendi ağzından anlatıyor.
+ #{strong[910\/2014’ün konsolide metninde madde 5a–5f.]} Cüzdanla ilgili yükümlülüklerin hepsi birkaç sayfada; bu yazının Bölüm 5, 6 ve 9’unun asıl kaynağı.
+ #{strong[COM(2021) 281, gerekçe bölümü.]} Komisyon’un eski eIDAS’ın neden yetmediğini anlattığı, rakamlı ve okunaklı bir değerlendirme.
+ #{strong[2024\/2979 sayılı Uygulama Tüzüğü ve 2026\/1731 ile eklenen Ek Ib.]} Bir uygulama tüzüğünün bir standarda nasıl bağlandığını görmek için iyi bir örnek.
+ #{strong[EUDI ARF 3.0’ın "Legal context" ve "Ecosystem" bölümleri.]} Tüzükteki rollerin teknik çerçevedeki karşılıkları.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (16fr, 24fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Aracı], [intermediary], [Bir güvenen taraf adına cüzdandan veri isteyen ve tüzüğe göre güvenen taraf sayılan kuruluş],),
  ([ARF], [Architecture and Reference Framework], [AB cüzdanının bağlayıcı olmayan teknik mimari çerçevesi],),
  ([Avrupa Dijital Kimlik Cüzdanı], [European Digital Identity Wallet], [PID ve öznitelik onaylarını saklayan ve sunan, nitelikli imza attıran elektronik kimlik aracı],),
  ([Çok büyük çevrimiçi platform], [very large online platform (VLOP)], [Dijital Hizmetler Yasası’nın 33. maddesinde tanımlanan büyük platformlar],),
  ([Denetim organı], [supervisory body], [Üye devletin cüzdan çerçevesini ya da güven hizmetlerini denetleyen kurumu],),
  ([Geçit bekçisi], [gatekeeper], [Dijital Piyasalar Yasası’na göre belirlenen büyük platform şirketi],),
  ([Gerekçe], [recital], [Bir AB metninin başındaki, amacı açıklayan numaralı paragraf; tek başına bağlayıcı değil],),
  ([Güçlü kullanıcı doğrulaması], [strong user authentication], [Farklı türden en az iki bağımsız faktöre dayanan kimlik doğrulama],),
  ([Güven hizmeti], [trust service], [İmza, mühür, zaman damgası, öznitelik onayı, arşiv, defter gibi tüzükte sayılan elektronik hizmetler],),
  ([Güven İşareti], [EU Digital Identity Wallet Trust Mark], [Bir cüzdanın tüzüğe uygun sağlandığını gösteren işaret],),
  ([Güvenen taraf], [relying party], [Elektronik kimliğe ya da bir güven hizmetine dayanan kuruluş],),
  ([Konsolide metin], [consolidated text], [Değişikliklerin ana metne işlenmiş, belgeleme amaçlı hâli],),
  ([Nitelikli güven hizmeti sağlayıcısı], [qualified trust service provider (QTSP)], [Tüzüğün şartlarını karşıladığı denetlenmiş ve güven listesinde yer alan sağlayıcı],),
  ([Öznitelik onayı], [electronic attestation of attributes (EAA)], [Özniteliklerin doğrulanmasını sağlayan elektronik onay],),
  ([PID], [person identification data], [Bir kişinin kimliğinin belirlenmesini sağlayan, hukuka göre verilen veri kümesi],),
  ([PuB-EAA], [EAA issued by or on behalf of a public sector body], [Yetkili kaynaktan sorumlu kamu kurumunun verdiği öznitelik onayı],),
  ([QEAA], [qualified electronic attestation of attributes], [Nitelikli güven hizmeti sağlayıcısının verdiği öznitelik onayı],),
  ([Tüzük], [regulation], [Bütün üye devletlerde doğrudan uygulanan AB hukuk metni],),
  ([Uygulama tüzüğü], [implementing regulation], [Komisyon’un ana tüzüğün verdiği yetkiyle çıkardığı, teknik ayrıntıyı belirleyen tüzük],),
  ([Uygunluk değerlendirme kuruluşu], [conformity assessment body (CAB)], [Cüzdanları ve güven hizmetlerini değerlendirip sertifikalandıran bağımsız kuruluş],),
  ([Üçüncü ülke], [third country], [AB üyesi olmayan ülke],),
  ([Yetkili kaynak], [authentic source], [Bir öznitelik için birincil kaynak sayılan kayıt ya da sistem],),
  ([Yönerge], [directive], [Hedefi belirleyen, üye devletlerin kendi kanunlarıyla iç hukuka aktardığı AB hukuk metni],),
))

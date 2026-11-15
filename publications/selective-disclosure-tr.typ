// A3 — Seçici Açıklama. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Seçici Açıklama",
  altbaslik: "Gerekeni Göster, Gerisi Sende Kalsın: Tuzlu Özetler, mdoc ve BBS İmzaları",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Kasım 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("seçici açıklama", "veri minimizasyonu", "SD-JWT", "tuzlu özet", "mdoc", "MSO", "BBS imzası", "türetilmiş ispat", "bağlanabilirlik", "KVKK", "GDPR",),
  atif: "Karataş, B. (2026). Seçici Açıklama: Gerekeni Göster, Gerisi Sende Kalsın: Tuzlu Özetler, mdoc ve BBS İmzaları. Tamga Network Akademik Çalışmalar, A3. https://tamga.network/files/publications/selective-disclosure-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bir konser girişinde yaşınızı kanıtlamak için kimlik kartınızı uzattığınızda, görevli yalnızca yaşınızı değil, adınızı, doğum tarihinizi, kimlik numaranızı ve kartta ne yazıyorsa hepsini görür. Dijital belgeler bu durumu değiştirebilir: Kişi bir belgenin yalnızca istenen alanını gösterebilir ve doğrulayan, gösterilen alanın belgeyi verenin imzaladığı alan olduğundan yine emin olur. Bu yeteneğe seçici açıklama denir. Kişisel verilerin korunması hukukunun yıllardır söylediği "yalnızca gerektiği kadar veri" ilkesinin, yani veri minimizasyonunun teknik karşılığıdır ve Avrupa Birliği’nin dijital kimlik cüzdanında temel bir tasarım şartı olarak yer alır.

Bu yazı, seçici açıklamanın üç teknik yolunu sıfırdan ve örnek hesaplarla anlatıyor. İlki, IETF’in SD-JWT standardındaki tuzlu özet yöntemi; bir belgeyi verenin, alanların kendisini değil kapalı zarflarını imzalaması fikri. İkincisi, ISO\/IEC 18013-5 mobil belgelerindeki imzalı özet tablosu. Üçüncüsü, kişinin her gösterimde imzadan yeni bir ispat türettiği BBS imzaları. Yöntemleri boyut, hız, gizlilik ve standart durumu açısından karşılaştırıyor; son olarak seçici açıklamanın tek başına yetmediği yerleri, özellikle aynı belgenin farklı doğrulayanlar tarafından birbirine bağlanabilmesini tartışıyoruz.
  ],
)

= Giriş: Kapıdaki Görevli Ne Görmeli?

Aynur, İstanbul’daki yüksek lisansının ikinci döneminde. Cuma akşamı bir arkadaşıyla Kadıköy’de bir caz kulübünün konserine gidiyor. Kulübün iki kuralı var: Bar alanına 18 yaşından küçükler giremez, öğrencilere de bilette indirim yapılıyor. Kapıdaki görevli Aynur’dan iki şeyi kanıtlamasını istiyor: 18 yaşından büyük olduğunu ve öğrenci olduğunu.

Aynur bir yabancı öğrenci olarak cüzdanında ikamet izni kartını ve öğrenci kartını taşıyor. İkisini de uzatıyor. Görevli kartlara birkaç saniye bakıyor ve başını sallıyor. Ama o birkaç saniyede gördükleri, sorduğu iki sorunun cevabından çok daha fazlası: Aynur’un adı ve soyadı, tam doğum tarihi, uyruğu, ikamet izninin numarası ve bitiş tarihi, okuduğu üniversite, bölümü, öğrenci numarası. Kulübün bilmesi gereken iki bilgi vardı; öğrendiği ise on bilgi (Şekil 1).

Bu sahnede kimse kötü niyetli değil. Görevli bu bilgileri bir yere yazmıyor, Aynur da birkaç saniyelik bu açılmadan rahatsız olmuyor. Ama aynı sahneyi dijital dünyaya taşıdığımızda tablo değişir. Bir web sitesi yaşınızı doğrulamak için kimlik kartınızın fotoğrafını istediğinde, o fotoğraf bir sunucuya kaydedilir. Bir uygulama öğrenci olduğunuzu doğrulamak için öğrenci belgenizin PDF’ini aldığında, o PDF bir veritabanında durur. Kâğıt dünyasında birkaç saniyelik bir bakış olan şey, dijital dünyada kalıcı bir kopyaya dönüşür. Bu kopyalar birikir, birleştirilir ve bir gün bir veri sızıntısıyla başkalarının eline geçebilir.

Dizinin ikinci yazısında, doğrulanabilir belgenin bu sorunu çözmenin zeminini hazırladığını görmüştük: Belge, bir sayfa olarak değil, ayrı ayrı iddialardan oluşan imzalı bir veri yapısı olarak verilir. Bu yazının sorusu şu: Bir belgenin yalnızca bir alanını, örneğin yalnızca "18 yaşından büyük" bilgisini, belgenin geri kalanını göstermeden nasıl gösterebiliriz ve doğrulayan bu tek alanın gerçekten belgeyi verenin imzaladığı alan olduğundan nasıl emin olur?

Bu soru ilk bakışta kolay görünür. Ama dizinin ilk yazısında anlattığımız dijital imzanın temel özelliği tam olarak bu kolaylığı engeller: İmza belgenin bütününü korur ve belgeden tek bir harf çıkarılsa bile bozulur. Seçici açıklama, bu iki gereksinimi, yani bütünlüğü ve parçalı gösterimi birlikte sağlamanın sanatıdır.

Yazının planı şöyle. Bölüm 2 veri minimizasyonunu hem hukuki bir ilke hem de teknik bir ihtiyaç olarak tanıtıyor. Bölüm 3, imzanın bütünü koruması ile parçayı gösterme isteği arasındaki gerilimi ve bu gerilimi çözmenin akla gelen ilk yollarını tartışıyor. Bölüm 4, SD-JWT’deki tuzlu özet yöntemini adım adım, gerçek hesaplarla anlatıyor. Bölüm 5 mobil belgelerdeki (mdoc) seçici açıklamaya, Bölüm 6 ise BBS imzalarına ayrılmış. Bölüm 7 yöntemleri karşılaştırıyor. Bölüm 8, seçici açıklamanın çözemediği sorunları, Bölüm 9 açık soruları, Bölüm 10 ise bu yazıyı yayımlayan Tamga Network’ün bu konudaki yerini anlatıyor.

#sekil(1, [Kapıdaki görevlinin sorduğu ile gördüğü], "figures/a3/sekil-1.svg", yarim: false)

= Veri Minimizasyonu: Hukuki İlke, Teknik İhtiyaç

== Hukukun söylediği

"Bir iş için gerekenden fazla kişisel veri toplanmamalı" fikri, kişisel verilerin korunması hukukunun en eski ve en temel ilkelerinden biridir. Avrupa Birliği’nin Genel Veri Koruma Tüzüğü (GDPR), kişisel verilerin işlenmesine ilişkin ilkeleri sayarken verilerin "işlendikleri amaçlar bakımından yeterli, ilgili ve gerekli olanla sınırlı" olmasını ister ve bu ilkeye adını da koyar: #{strong[veri minimizasyonu]} \[12\]. Aynı tüzük, bu ilkenin sistemlerin tasarımına baştan yerleştirilmesini de şart koşar; buna #{strong[tasarımdan itibaren ve varsayılan olarak veri koruma]} denir.

Türkiye’de 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) aynı ilkeyi kendi diliyle söyler: Kişisel veriler "işlendikleri amaçla bağlantılı, sınırlı ve ölçülü" olmalıdır \[13\]. Kapıdaki görevliye dönersek, kulübün amacı yaş ve öğrencilik kontrolüdür; Aynur’un ikamet izni numarası ve bölümü bu amaçla bağlantılı değildir.

Avrupa’nın dijital kimlik tüzüğü eIDAS 2.0 ise bu ilkeyi bir hukuki şart olmaktan çıkarıp bir #{strong[teknik tasarım şartına]} dönüştürür. Tüzüğün gerekçe bölümü, cüzdanın öznitelikleri güvenen taraflara seçici olarak açıklamayı teknik olarak mümkün kılması gerektiğini, kişinin farklı belgelerden seçtiği öznitelikleri birleştirip sunabilmesi gerektiğini ve bu özelliğin cüzdanların temel bir tasarım özelliği olması gerektiğini açıkça yazar \[14, gerekçe 59\]. Tüzüğün 5a maddesi de cüzdanın, seçici olarak açıklanmış verilerin çevrimiçi ve gerektiğinde çevrimdışı paylaşılması için ortak protokolleri desteklemesini ister. Temmuz 2026’da kabul edilen 2026\/1731 sayılı uygulama tüzüğü bu şartı kimlik bilgisinin her alanına indirir: Üye devletler, kişi kimlik verisinin #{strong[her bir alanına]}, fotoğraf dahil, seçici açıklamanın uygulanmasını sağlamak zorundadır \[15\].

== Teknik ihtiyaç: kopya kalır

Hukukun bu ilkeyi bu kadar vurgulamasının nedeni, kişisel verinin bir kez paylaşıldıktan sonra geri alınamamasıdır. Bir kurum sizin hakkınızda bir bilgiyi bir kez öğrendiyse, o bilgiyi silmesini isteyebilirsiniz, ama sildiğinden emin olamazsınız. Veriyi korumanın en güvenilir yolu, onu hiç vermemektir.

Dijital dünyada bu ilke ayrıca önemlidir, çünkü dijital veri kopyalandıkça çoğalır ve birleştirildikçe değerlenir. Tek başına masum görünen bilgiler, bir araya geldiğinde bir kişiyi tanımlamaya yetebilir. Bölüm 8.2’de bunun ne kadar az bilgiyle mümkün olduğunu gösteren ünlü bir çalışmaya döneceğiz. Bir kurumun elindeki her fazla bilgi, o kurumun sızıntıya uğraması durumunda dışarı çıkacak bir bilgidir. Bu yüzden veri minimizasyonu, veriyi tutan kurumun da çıkarınadır; hiç toplanmamış bir veri hiç sızmaz.

Tablo 1, gündelik hayattaki bazı doğrulama işleri için gerçekten neyin gerektiğini, bugün çoğu zaman neyin verildiğini gösteriyor.

#tablo([#{strong[Tablo 1.]} Bazı doğrulama işlerinde gereken bilgi ile bugün verilen bilgi.], (19fr, 26fr, 24fr), ([İş], [Gerçekten gereken], [Bugün çoğu zaman verilen],), (
  ([Yaş sınırlı ürün ya da mekân], [18 yaşından büyük mü?], [kimlik kartının tamamı],),
  ([Öğrenci indirimi], [şu an kayıtlı öğrenci mi?], [öğrenci kartı ya da belgesinin tamamı],),
  ([Araç kiralama], [geçerli ehliyet sınıfı, ad, fotoğraf], [ehliyetin fotokopisi],),
  ([Otel girişi], [rezervasyon sahibi bu kişi mi?], [kimlik kartının fotokopisi],),
  ([İş başvurusu (ön eleme)], [ilgili derece ve bölüm], [diploma, transkript, kimlik],),
  ([İnternet sitesinde yerleşiklik kontrolü], [belirli bir ülkede mi oturuyor?], [tam adres],),
))

== İlke ile araç arasındaki fark

Seçici açıklamayı veri minimizasyonuyla eş tutmak cazip, ama ikisi aynı şey değil. Veri minimizasyonu bir #{strong[ilkedir]}: Bir iş için ne kadar verinin gerektiğine dair bir yargı. Seçici açıklama ise bir #{strong[araçtır]}: O yargıya uygun davranmayı teknik olarak mümkün kılan bir yetenek. Araç ilkeyi kendiliğinden uygulamaz.

Bunu bir örnekle düşünelim. Bir kira sözleşmesi uygulaması, kiracının kimliğini doğrulamak için cüzdandan ad, soyad, doğum tarihi, uyruk, adres ve kimlik numarası istiyor. Cüzdan seçici açıklamayı mükemmel biçimde destekliyor: Kişi yalnızca bu altı alanı paylaşıyor, geri kalan alanlar gizli kalıyor. Teknik açıdan her şey yolunda. Ama uygulamanın gerçekten kimlik numarasına ve doğum tarihine ihtiyacı var mı, yoksa "bu kişi reşit ve kimliği doğrulanmış bir kişi" bilgisi yeterli mi? Bu soruyu araç cevaplayamaz. Cevabı, hizmeti tasarlayanların ve onları denetleyen kurumların vermesi gerekir.

Tersi de geçerlidir. Seçici açıklama olmadan veri minimizasyonu uygulamak mümkündür, ama zahmetlidir: Kurum ya kimlik kartının fotokopisini alıp gereksiz alanları karartır ya da kişiden gereken bilgiyi beyan etmesini ister ve bu beyanın doğruluğundan emin olamaz. Seçici açıklama, minimizasyon ile güvence arasında yapılan bu tercihi ortadan kaldırır: Hem az veri hem de imzalı güvence. Bu yazının geri kalanı bu aracın nasıl çalıştığını, Bölüm 8 ise aracın tek başına neden yetmediğini anlatıyor.

#kutu("tarihce", [Fikir kırk yıllık])[
Seçici açıklamanın kökleri, dijital kimlik cüzdanlarından çok daha eskiye uzanır. 1985’te kriptograf David Chaum, #{emph[Communications of the ACM]} dergisinde yayımlanan "Kimliksiz Güvenlik" (#{emph[Security Without Identification]}) başlıklı makalesinde, bilgisayarlaşan toplumun kişilerin her işlemini bir dosyada toplayan bir gözetim düzenine dönüşebileceği uyarısında bulundu ve buna karşı, kişinin farklı kurumlara farklı takma adlarla görünebildiği, bir kurumdan aldığı belgeyi başka bir kuruma kim olduğunu açmadan gösterebildiği bir düzen önerdi \[10\].

2000 yılında Stefan Brands, #{emph[Rethinking Public Key Infrastructures and Digital Certificates]} adlı kitabında, sertifikaların içindeki özniteliklerin tek tek açılabildiği ve gösterimlerin birbirine bağlanamadığı bir sertifika sistemini matematiksel olarak tanımladı \[11\]. Bu fikirler daha sonra U-Prove adlı bir teknolojiye dönüştü. Aynı yıllarda IBM’deki araştırmacılar Jan Camenisch ve Anna Lysyanskaya’nın çalışmalarına dayanan Idemix sistemini geliştirdi \[20\].

2005’te Kim Cameron’ın "Kimliğin Yasaları"nın ikincisi, "kısıtlı kullanım için asgari açıklama", aynı fikri bir ilke olarak koydu \[18\]. Yani bugün eIDAS 2.0’ın zorunlu kıldığı yetenek, kriptografi topluluğunda kırk yıla yakın bir süredir tartışılıyor. Değişen, bu fikirlerin ilk kez milyonlarca kişinin kullanacağı bir sistemde zorunlu hâle gelmesidir.
]

= Neden Kolay Değil? İmza Bütünü Korur

== Gerilim

Dizinin ilk yazısında dijital imzanın nasıl çalıştığını anlatmıştık: Veren, belgenin özetini hesaplar ve bu özeti gizli anahtarıyla imzalar. Doğrulayan özeti yeniden hesaplar ve imzayı kontrol eder. Özet fonksiyonunun önemli bir özelliği, girdideki en küçük değişikliğe büyük tepki vermesidir; belgeden tek bir harf çıkarılırsa özet tamamen değişir ve imza artık tutmaz.

Bu özellik imzayı güçlü kılan şeydir, ama seçici açıklamanın önündeki engel de odur. Aynur öğrenci belgesinden yalnızca "öğrenci: evet" satırını göstermek isterse, belgenin geri kalanını silmesi gerekir; sildiği anda da imza bozulur. Doğrulayanın elinde, imzası tutmayan bir parça kalır. Yani klasik imzayla ya hep ya hiç: Belgenin tamamını gösterirsin, imza tutar; bir kısmını gösterirsin, imza tutmaz.

== Akla gelen üç çözüm

Bu gerilimi çözmek için akla ilk gelen yolları sırayla düşünmek, sonunda neden SD-JWT ve mdoc’un seçtiği yola varıldığını anlamayı kolaylaştırır (Şekil 2).

#{strong[Birinci yol: Her alan için ayrı belge.]} Veren, belgenin her alanını ayrı ayrı imzalayabilir: bir belge yalnızca adı, bir belge yalnızca doğum tarihini, bir belge yalnızca öğrencilik durumunu taşır. Aynur yalnızca gereken belgeleri gösterir. Bu yol çalışır, ama iki sorunu vardır. Birincisi, onlarca alanlı bir belge onlarca ayrı imzalı parçaya dönüşür ve her biri ayrı ayrı yönetilmek, yenilenmek ve iptal edilmek zorundadır. İkincisi ve daha önemlisi, parçalar birbirinden kopar: Doğrulayan "18 yaşından büyük" parçasının ve "öğrenci" parçasının #{strong[aynı kişiye]} ait olduğunu nasıl bilecek? Bunun için her parçaya ortak bir tanımlayıcı koymak gerekir; o tanımlayıcı da tam olarak gizlemek istediğimiz türden bir bilgidir.

#{strong[İkinci yol: Her seferinde verenden yeni belge.]} Aynur her gösterimden önce verene başvurur ve yalnızca o işin gerektirdiği alanları içeren, yeni imzalanmış bir belge ister. Bu, dizinin ilk yazısında anlattığımız federasyon modeline benzer ve seçici açıklamayı eksiksiz sağlar. Ama bedeli ağırdır: Veren, Aynur’un hangi bilgisini ne zaman, büyük ihtimalle de kime göstereceğini öğrenir. Dizinin ikinci yazısında "eve telefon etme" adını verdiğimiz sorunun ta kendisidir. Ayrıca veren her gösterimde çevrimiçi olmak zorundadır.

#{strong[Üçüncü yol: Alanların kapalı zarflarını imzalamak.]} Veren, belgeyi imzalarken her alanın kendisi yerine, o alanın #{strong[kapalı bir zarfını]} imzalar. Zarfların kendileri Aynur’a ayrıca verilir. Aynur bir alanı göstermek istediğinde o alanın zarfını açar; doğrulayan, açılan zarfın imzalı listedeki kapalı zarflardan biriyle eşleştiğini kontrol eder. Gösterilmeyen zarflar kapalı kalır. İmza hep aynı listenin üzerindedir ve hiç bozulmaz.

Üçüncü yol, bu yazıda anlatacağımız ilk iki yöntemin, SD-JWT’nin ve mdoc’un temelidir. Geriye "kapalı zarf"ın dijital olarak ne olduğunu tanımlamak kalıyor.

#sekil(2, [Seçici açıklama için akla gelen üç yol], "figures/a3/sekil-2.svg", yarim: false)

== Dijital zarf: taahhüt

Kriptografide "kapalı zarf" fikrinin bir adı vardır: #{strong[taahhüt]} (#{emph[commitment]}). Bir taahhüt, bir değeri şimdi bağlayıp sonra açmanın yoludur. İyi bir taahhüdün iki özelliği vardır. #{strong[Gizleme]} (#{emph[hiding]}): Kapalı zarfa bakan biri içindeki değeri öğrenemez. #{strong[Bağlama]} (#{emph[binding]}): Zarfı kapatan kişi, zarfı daha sonra başka bir değerle açamaz; zarf yalnızca içine konan değerle açılır.

Özet fonksiyonu bu iki özellikten birini kendiliğinden sağlar. Bir değerin özetini yayımlarsanız, sonradan başka bir değer gösterip "bu özetin girdisi buydu" diyemezsiniz, çünkü aynı özeti veren iki farklı girdi bulmak pratikte imkânsızdır. Yani özet #{strong[bağlar]}. Ama özet tek başına her zaman #{strong[gizlemez]}. Bunun nedenini bir örnekle görelim.

#kutu("teknik", [Tuz neden gerekir? Küçük bir deneme])[
Diyelim ki veren, Aynur’un #{raw("age_over_18")} (18 yaşından büyük) alanının zarfını, tuz kullanmadan, yalnızca alanın adı ve değerinden oluşturdu ve imzalı listeye bu özeti koydu (değerler örnektir; özetler SHA-256 ile hesaplandı ve Base64URL ile yazıldı):

#kod("text", "özet( [\"\", \"age_over_18\", true] )  =  KX70iNdIyTgQU542LtYKpCYOh6R5DgZzI6APtk4hIr0", baslik: "Örnek: tuzsuz zarfın özeti")

Aynur bu alanı göstermedi. Ama alanın değeri yalnızca iki ihtimalden biridir: #{raw("true")} ya da #{raw("false")}. Meraklı bir doğrulayan iki ihtimalin de özetini kendisi hesaplar, listede hangisinin bulunduğuna bakar ve gizli alanın değerini bir saniyede öğrenir. Doğum tarihi için de durum pek farklı değildir: Son yüz yılın bütün günleri yaklaşık otuz altı bin ihtimal eder ve hepsinin özetini hesaplamak sıradan bir dizüstü bilgisayarda saniyeler sürer.

Çözüm, dizinin ilk yazısında parolaların saklanmasında gördüğümüz #{strong[tuzdur]}. Veren her alan için tahmin edilemeyen rastgele bir değer üretir ve özeti bu değerle birlikte hesaplar:

#kod("text", "özet( [\"G02NSrQfjFXQ7Io09syajA\", \"age_over_18\", true] )  =  CaXyDDbeR-b9DdQkEWIMsf6bimIGy_-ZZRZoOkCE8og", baslik: "Örnek: aynı alanın tuzlu zarfının özeti")

Artık doğrulayan #{raw("true")} ve #{raw("false")} için özet hesaplasa da işe yaramaz, çünkü tuzu bilmez. Tuz yeterince uzun ve rastgeleyse (SD-JWT standardı en az 128 bitlik rastgelelik önerir \[1\]), tuzu tahmin etmek, özeti doğrudan kırmaktan daha kolay değildir. Tuz, zarfı #{strong[gizleyen]} şeydir.
]

Böylece kapalı zarfın tarifi tamamlanmış olur: #{strong[tuz + alan adı + değer]} üçlüsünün özeti. Zarfı açmak, bu üçlüyü göstermektir. Doğrulayan üçlünün özetini hesaplar ve imzalı listedeki özetlerden biriyle eşleşip eşleşmediğine bakar. Bu yönteme kısaca #{strong[tuzlu özet]} yöntemi denir.

= Tuzlu Özetler: SD-JWT Adım Adım

== Sahne

Tuzlu özet yönteminin en yaygın standart biçimi, IETF’in Kasım 2025’te RFC 9901 numarasıyla yayımladığı #{strong[SD-JWT]}’dir (#{emph[Selective Disclosure for JSON Web Tokens]}) \[1\]. Dizinin ikinci yazısında SD-JWT VC biçiminin genel yapısını tanıtmıştık; burada yöntemin içine gireceğiz ve bir belgenin verilmesinden doğrulanmasına kadar her adımı gerçek hesaplarla izleyeceğiz.

Örneğimiz Aynur’un üniversitesinin verdiği bir #{strong[öğrenci belgesi]}. Belgede yedi alan var: ad, soyad, doğum tarihi, uyruk, üniversite, öğrencilik durumu ve 18 yaşından büyük olup olmadığı. Son alan, belgeyi veren üniversitenin doğum tarihinden hesaplayıp ayrıca yazdığı bir alan; bunun neden yapıldığına Bölüm 5.4’te döneceğiz. Bu yazıdaki bütün özetler gerçekten hesaplanmıştır, ama bütün değerler örnektir: Kişi, kurum ve anahtarlar hayalîdir.

== Veren tarafı: zarfları hazırlamak

Veren, belgeyi hazırlarken her gizlenebilir alan için üç adım atar (Şekil 3).

+ #{strong[Tuz üret.]} Her alan için ayrı, kriptografik olarak güvenli bir rastgele sayı üretilir. Örnekteki tuzlar 16 bayt, yani 128 bit rastgele veridir.
+ #{strong[Açıklamayı oluştur.]} Tuz, alan adı ve değer, bu sırayla, üç öğeli bir JSON dizisine konur. Bu dizi Base64URL ile kodlanır. Ortaya çıkan metne #{strong[açıklama]} (#{emph[disclosure]}) denir; kapalı zarfın içindeki kâğıttır.
+ #{strong[Özeti hesapla.]} Açıklama metninin SHA-256 özeti alınır ve Base64URL ile yazılır. Bu özet, zarfın dışından görünen mühürdür.

Sonra veren, bütün özetleri #{raw("_sd")} adlı bir listede toplar, belgenin her zaman açık kalması gereken alanlarını (veren, tür, geçerlilik, sahip anahtarı, durum) ekler ve bu içeriği imzalar.

#kutu("teknik", [Yedi alan, yedi açıklama, yedi özet])[
Aşağıda öğrenci belgesinin yedi alanı için üretilen açıklamaların içeriği (JSON dizisi) ve özetleri var. Açıklamanın kendisi, bu dizinin Base64URL kodlamasıdır; örneğin ilk satırın açıklaması #{raw("WyJlbHVWNU9nM2dTTklJOEVZbnN4QV9BIiwiZ2l2ZW5fbmFtZSIsIkF5bnVyIl0")} metnidir.

#kod("text", "[\"eluV5Og3gSNII8EYnsxA_A\",\"given_name\",\"Aynur\"]          → OeH1--ehivaXNs5kBlsDPpD3JeQEu-XXHiRevIUdnac
[\"6Ij7tM-a5iVPGboS5tmvVA\",\"family_name\",\"Aliyeva\"]       → PjFFF-Lc218Ug-IP53G9NMRRb_2c_r2WraLn4mip1pY
[\"eI8ZWm9QnKPpNPeNenHdhQ\",\"birthdate\",\"2001-03-14\"]      → pTFbYDVDTkHXcfRPACRNCEd9pDAV3n56yJjuO6vYn-8
[\"Qg_O64zqAxe412a108iroA\",\"nationalities\",[\"AZ\"]]        → 022jpYd1uSsyCIWiJRDeYYaF0nCKxp75v0fgum7ZZ9E
[\"AJx-095VPrpTtN4QMOqROA\",\"university\",\"Örnek Üniversitesi\"] → Envp3SkH0Oxczok5CdMgdbttONJuu0vAwvQQM4rQ094
[\"Pc33JM2LchcU_lHggv_ufQ\",\"student_status\",\"active\"]     → VBAe-PI3vmYapXAtmxerreYdq_3Kdx_sZdqH-bQiBuE
[\"G02NSrQfjFXQ7Io09syajA\",\"age_over_18\",true]           → CaXyDDbeR-b9DdQkEWIMsf6bimIGy_-ZZRZoOkCE8og", baslik: "Örnek: yedi açıklamanın içeriği (solda) ve özeti (sağda)")

Verenin imzaladığı içerik şöyle görünür. #{raw("_sd")} listesinde sekiz özet var: yedisi gerçek alanların, biri rastgele bir değerden üretilmiş #{strong[sahte özettir]} (Bölüm 4.6). Liste alfabetik sıraya dizilmiştir; böylece özetlerin sırası alanların sırasını ele vermez.

#kod("json", "{
  \"iss\": \"https://ogrenci.example.edu\",
  \"vct\": \"https://credentials.example/ogrenci-belgesi\",
  \"iat\": 1793606400,
  \"nbf\": 1793606400,
  \"exp\": 1825142400,
  \"_sd_alg\": \"sha-256\",
  \"_sd\": [
    \"022jpYd1uSsyCIWiJRDeYYaF0nCKxp75v0fgum7ZZ9E\",
    \"CaXyDDbeR-b9DdQkEWIMsf6bimIGy_-ZZRZoOkCE8og\",
    \"Crstn3-KXpID45nE7bTJvpNcPNDmNOZa9HAJCUrnKfE\",
    \"Envp3SkH0Oxczok5CdMgdbttONJuu0vAwvQQM4rQ094\",
    \"OeH1--ehivaXNs5kBlsDPpD3JeQEu-XXHiRevIUdnac\",
    \"PjFFF-Lc218Ug-IP53G9NMRRb_2c_r2WraLn4mip1pY\",
    \"VBAe-PI3vmYapXAtmxerreYdq_3Kdx_sZdqH-bQiBuE\",
    \"pTFbYDVDTkHXcfRPACRNCEd9pDAV3n56yJjuO6vYn-8\"
  ],
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\",
           \"x\": \"RyZ45dRSXuX9CzV2V22HDWdX_VYKU9hf8Qnvd1t8Jow\",
           \"y\": \"rM9hMxUo0CzU99DB0hpmSkxTGdWeMIRCxdGN_nN7wgY\" } }
}", baslik: "Örnek: verenin imzaladığı içerik (alanlar yalnızca özet olarak var)")

Bu içerikte Aynur’un adı, doğum tarihi ya da üniversitesi #{strong[hiçbir yerde açık olarak yazmaz]}. İmzalı belge, sekiz mühürden ve birkaç teknik alandan ibarettir. Veren, bu içeriği ve yedi açıklamayı birlikte Aynur’un cüzdanına gönderir.
]

#sekil(3, [SD-JWT: veren zarfları hazırlar, sahip seçer, doğrulayan eşleştirir], "figures/a3/sekil-3.svg", yarim: false)

== Sahip tarafı: seçmek

Aynur’un cüzdanı imzalı içeriği ve yedi açıklamayı saklar. Konser girişinde kulübün sistemi iki alan ister: #{raw("age_over_18")} ve #{raw("student_status")}. Cüzdan Aynur’a isteği gösterir: "Kulüp, 18 yaşından büyük olup olmadığınızı ve öğrencilik durumunuzu görmek istiyor." Aynur onaylar.

Cüzdan sunumu şöyle kurar: Verenin imzaladığı JWT’yi alır, arkasına tilde (#{raw("~")}) işaretiyle yalnızca iki açıklamayı ekler ve en sona, kulübün gönderdiği tek kullanımlık değeri imzaladığı sahip bağlama JWT’sini koyar. Ad, soyad, doğum tarihi, uyruk ve üniversitenin açıklamaları cüzdandan çıkmaz.

#kod("text", "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9.eyJpc3Mi…(imza)
~WyJQYzMzSk0yTGNoY1VfbEhnZ3ZfdWZRIiwic3R1ZGVudF9zdGF0dXMiLCJhY3RpdmUiXQ
~WyJHMDJOU3JRZmpGWFE3SW8wOXN5YWpBIiwiYWdlX292ZXJfMTgiLHRydWVd
~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9.eyJpYXQiOjE3OTQ0NzA0MDAs…(imza)", baslik: "Örnek: kulübe giden sunum, parçalar tildeyle ayrılmış (kısaltıldı)")

Örnekteki belgede verenin imzaladığı JWT kabaca bin bayt tutar; iki açıklama ve sahip bağlama JWT’si eklendiğinde sunum bir buçuk kilobaytı biraz aşar. Yedi açıklamanın hepsi eklenseydi aradaki fark yalnızca birkaç yüz bayt olurdu; yani SD-JWT’de gizlemenin boyut maliyeti çok düşüktür.

Sahip bağlama JWT’sinin içinde bir alan, seçici açıklama açısından özellikle önemlidir: #{raw("sd_hash")}. Bu alan, sunumun geri kalanının, yani verenin JWT’si ile seçilen açıklamaların özetidir. Aynur’un imzası bu özeti de kapsadığı için, yolda biri sunuma bir açıklama ekleyemez ya da çıkaramaz; Aynur’un neyi göstermeyi seçtiği de imzanın koruması altındadır.

#kutu("teknik", [Sahip bağlama JWT’si (değerler örnektir)])[
Sunumun son parçası, cüzdanın kulübün gönderdiği tek kullanımlık değeri imzaladığı küçük bir JWT’dir. İçeriği dört alandan oluşur:

#kod("json", "{
  \"iat\": 1794470400,
  \"aud\": \"https://bilet.example\",
  \"nonce\": \"XZOUco1u_gEPknxS78sWWg\",
  \"sd_hash\": \"XqVtZy8NJutyLDb_vMSsQUKhNZIwrg7W6IQCwhClvlg\"
}", baslik: "Örnek: sahip bağlama JWT’sinin içeriği")

#{raw("sd_hash")}, sunumdaki son tildeye kadar olan metnin, yani #{raw("<verenin JWT'si>~<açıklama>~<açıklama>~")} metninin SHA-256 özetidir \[1\].
]

== Doğrulayan tarafı: eşleştirmek

Kulübün doğrulama yazılımı sunumu aldığında şu adımları izler.

+ #{strong[Parçala.]} Sunumu tildelerden böler: ilk parça verenin JWT’si, son parça sahip bağlama JWT’si, aradakiler açıklamalardır.
+ #{strong[Verenin imzasını kontrol et.]} JWT’nin imzasını, verenin güven listesinden alınan açık anahtarıyla doğrular. İmza tutmuyorsa işlem biter.
+ #{strong[Her açıklamanın özetini hesapla.]} İki açıklamanın her birinin SHA-256 özetini hesaplar. #{raw("student_status")} açıklamasının özeti #{raw("VBAe-PI3…")}, #{raw("age_over_18")} açıklamasınınki #{raw("CaXyDDbe…")} çıkar.
+ #{strong[Listede ara.]} Her özetin, verenin imzaladığı #{raw("_sd")} listesinde bulunup bulunmadığına bakar. İkisi de listede vardır. Listede olmayan bir özet ya da aynı özetin iki kez kullanılması, sunumun reddedilmesi için yeterlidir.
+ #{strong[Açıklamayı çöz.]} Açıklamaları Base64URL’den çözer ve alan adlarıyla değerleri okur: #{raw("student_status: \"active\"")}, #{raw("age_over_18: true")}.
+ #{strong[Sahibi kontrol et.]} Sahip bağlama JWT’sinin imzasını, verenin içeriğindeki #{raw("cnf")} anahtarıyla doğrular; #{raw("nonce")} ve #{raw("aud")} değerlerinin bu işleme ait olduğunu, #{raw("sd_hash")}’in de sunumla eşleştiğini kontrol eder.

Bu adımların sonunda kulüp iki şeyden emindir: Aynur 18 yaşından büyüktür ve kayıtlı bir öğrencidir; bu iki bilgiyi Aynur’un üniversitesi söylemiştir. Kulübün #{raw("_sd")} listesindeki diğer altı özetten öğrenebildiği tek şey, belgede altıdan fazla olmayan sayıda başka alan bulunduğudur.

#kutu("ornek", [Aynur konser kapısında, dijital olarak])[
Aynur telefonunu kapıdaki tablete yaklaştırıyor. Cüzdan ekranında iki satır beliriyor: "18 yaşından büyük" ve "öğrencilik durumu". Aynur onaylıyor. Tablet yeşil yanıyor ve görevlinin ekranında yalnızca iki bilgi görünüyor: "18 yaş üstü: evet", "öğrenci: evet". Görevli Aynur’un adını bilmiyor, doğum tarihini bilmiyor, hangi ülkeden geldiğini bilmiyor. Kulübün sisteminde o akşamdan geriye kalan kayıt, bir kişinin bu iki koşulu sağladığıdır.
]

== İç içe nesneler ve diziler

Gerçek belgeler düz bir alan listesinden ibaret değildir. Bir adres alanı sokak, şehir, posta kodu ve ülke gibi alt alanlardan oluşur; bir kişinin birden fazla uyruğu olabilir. SD-JWT bu yapıları da destekler \[1\].

#{strong[İç içe nesnelerde]} her düzeyin kendi #{raw("_sd")} listesi olabilir. Veren, örneğin adres nesnesinin içindeki her alt alanı ayrı ayrı gizlenebilir yapabilir; Aynur yalnızca "ülke" alt alanını göstererek yerleşik olduğu ülkeyi kanıtlayabilir, sokak adresini göstermeden. İstenirse adres nesnesinin kendisi de ayrıca gizlenebilir; bu durumda önce dış zarf, sonra içteki zarflar açılır.

#{strong[Dizilerde]} her öğe ayrı bir zarfa konabilir. Bu durumda açıklama üç değil iki öğeden oluşur (tuz ve değer; dizinin öğelerinin adı yoktur) ve dizinin içinde, öğenin yerinde #{raw("{\"...\": \"<özet>\"}")} biçiminde bir yer tutucu bulunur. Böylece iki uyruklu bir kişi, yalnızca birini gösterebilir.

== Sahte özetler ve sıralama

Bölüm 4.4’ün sonunda, kapalı kalan özetlerin bile bir bilgi sızdırdığını gördük: alan sayısını. Bazı durumlarda bu bilgi önemsiz değildir. Örneğin bir belge türünde isteğe bağlı bir alan yalnızca belirli kişilerde bulunuyorsa (bir engellilik durumu, bir ek uyruk), özet sayısının fazla olması o alanın varlığını ele verebilir.

SD-JWT bunun için #{strong[sahte özetler]} (#{emph[decoy digests]}) önerir: Veren, rastgele değerlerden üretilmiş, hiçbir açıklamaya karşılık gelmeyen özetleri listeye ekler \[1\]. Sahte bir özet, gerçek bir özetten ayırt edilemez. Örneğimizdeki #{raw("Crstn3-K…")} özeti böyle bir sahte özettir; doğrulayan onun gerçek bir alana mı ait olduğunu, yoksa sahte mi olduğunu bilemez. Benzer bir nedenle özetler listede alanların sırasıyla değil karışık ya da alfabetik sırada durur; aksi hâlde "üçüncü özet her zaman doğum tarihidir" gibi bir çıkarım yapılabilirdi.

== Hep açık kalanlar

Her alan gizlenebilir değildir. SD-JWT VC belirtimi, doğrulama için zorunlu olan bazı alanların #{strong[asla]} gizli zarfa konmamasını ister: verenin kim olduğu (#{raw("iss")}), geçerlilik başlangıcı ve sonu (#{raw("nbf")}, #{raw("exp")}), sahip anahtarı (#{raw("cnf")}), belge türü (#{raw("vct")}) ve durum listesindeki yer (#{raw("status")}) \[2\]. Bunlar olmadan doğrulayan imzayı kimin attığını, belgenin geçerli olup olmadığını ya da sunanın sahibi olup olmadığını kontrol edemez.

Bu zorunlu açıklığın bir bedeli vardır ve Bölüm 8’de ona döneceğiz: Hep açık kalan alanların bir kısmı, özellikle sahip anahtarı ve durum listesindeki yer, belgenin her gösteriminde aynıdır ve farklı doğrulayanların aynı belgeyi tanımasına yarar.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
SD-JWT’de veren, her alan için tuz, ad ve değerden oluşan bir açıklamanın yalnızca özetini imzalar. Tuz, özetin tahminle çözülmesini engeller. Sahip, yalnızca göstermek istediği açıklamaları sunuma ekler; doğrulayan onların özetini hesaplar ve imzalı listede bulur. İmza hiç bozulmaz, gösterilmeyen alanlar kapalı kalır. Yöntem yalnızca özet fonksiyonu ve sıradan bir imza kullandığı için hızlıdır ve bugünün telefonlarında, güvenli donanımda bile çalışır.
]

== Doğru uygulamanın ayrıntıları

Tuzlu özet yöntemi kâğıt üzerinde basittir, ama güvenliği birkaç ayrıntının doğru yapılmasına bağlıdır. Bunların çoğu RFC 9901’de açıkça yazılıdır \[1\]; burada en önemlilerini, neden önemli olduklarıyla birlikte sıralıyoruz.

#{strong[Tuzlar gerçekten rastgele olmalı.]} Tuz, kriptografik olarak güvenli bir rastgele sayı üretecinden gelmeli ve her alan için ayrı üretilmelidir. Saat bilgisinden ya da sıradan bir sayaçtan türetilen bir tuz tahmin edilebilir ve Bölüm 3.3’teki deneme saldırısını yeniden mümkün kılar. Aynı tuzun iki alanda ya da iki belgede tekrar kullanılması da, o alanların birbirine bağlanmasına yol açar.

#{strong[Her özet bir kez kullanılmalı.]} Doğrulayan, aynı özetin listede ya da sunumda iki kez geçtiğini görürse sunumu reddetmelidir. Aksi hâlde bir saldırgan, aynı açıklamayı iki farklı yerde kullanarak doğrulayanın yazılımını şaşırtabilir.

#{strong[Açıklama, imzalı listede yoksa reddedilmeli.]} Doğrulayan, özeti #{raw("_sd")} listesinde bulunmayan bir açıklamayı görmezden gelmekle yetinmemeli, sunumu bütünüyle reddetmelidir. Hatalı bir sunumdan "işe yarar kısmı" ayıklamaya çalışan doğrulayıcılar, saldırganlara kapı açar.

#{strong[Özet algoritması imzalı olmalı.]} Hangi özet fonksiyonunun kullanıldığını söyleyen #{raw("_sd_alg")} alanı verenin imzaladığı içeriğin içindedir. Bu sayede bir saldırgan, sunumu daha zayıf bir özet fonksiyonuyla yorumlatmaya çalışamaz.

#{strong[Açık alanlarla gizli alanlar çakışmamalı.]} Aynı alan adı hem açık olarak hem de bir açıklamanın içinde bulunmamalıdır; doğrulayan böyle bir çakışma görürse sunumu reddeder. Bu kural, hangi değerin geçerli olduğu konusunda belirsizlik bırakmamak içindir.

Bu ayrıntıların ortak noktası, seçici açıklamanın güvenliğinin yalnızca matematiğe değil, matematiği uygulayan yazılımın titizliğine de bağlı olmasıdır. Bu yüzden standartların yanında uyum testleri ve ortak test vektörleri büyük önem taşır.

= Mobil Belgelerde Seçici Açıklama (mdoc)

== Aynı fikir, başka bir dil

Dizinin ikinci yazısında ISO\/IEC 18013-5 standardının tanımladığı mobil belge biçimini, mdoc’u tanıtmıştık \[3\]. mdoc’ta seçici açıklama, SD-JWT’den bağımsız olarak ama aynı fikirle kurulmuştur: Veren her alanı, içinde bir tuz bulunan ayrı bir pakete koyar, paketlerin özetlerini #{strong[mobil güvenlik nesnesi]} (#{emph[Mobile Security Object]}, MSO) adı verilen bir yapıda toplar ve yalnızca MSO’yu imzalar.

İki yöntem arasındaki farklar ayrıntıdadır. SD-JWT metin tabanlı JSON kullanır, mdoc ikili CBOR. SD-JWT’de özetler sırasız bir listede durur ve doğrulayan bir açıklamanın özetini bütün listede arar; mdoc’ta ise her paketin bir #{strong[sıra numarası]} (#{raw("digestID")}) vardır ve MSO, sıra numarasıyla özet arasında bir eşleme tutar. Doğrulayan, gelen paketin sıra numarasına bakar ve özeti doğrudan o numaranın karşısındaki değerle karşılaştırır. Bir de tuzun adı farklıdır: mdoc’ta bu değere #{raw("random")} denir ve standart bu değerin en az 16 bayt olmasını öngörür.

== İstek: ne isteniyor, saklanacak mı?

mdoc’un SD-JWT’den belirgin biçimde farklı olduğu bir nokta, doğrulayanın isteğinin yapısıdır. mdoc’ta doğrulayan, istediği her alan için ayrıca bir #{strong[saklama niyeti]} (#{emph[intent to retain]}) bildirir: Bu alanı yalnızca bakıp geçmek için mi istiyor, yoksa kaydedip saklayacak mı? Örneğin kulübün isteği şöyle olabilir:

#kutu("teknik", [Bir mdoc isteği (CBOR teşhis gösterimiyle; değerler örnektir)])[
İstek, belge türünü ve istenen her alanı, saklama niyetiyle birlikte sayar:

#kod("text", "{
  \"docType\": \"org.iso.18013.5.1.mDL\",
  \"nameSpaces\": {
    \"org.iso.18013.5.1\": {
      \"age_over_18\": false,
      \"portrait\": false
    }
  }
}", baslik: "Örnek: kulübün mobil ehliyetten iki alan isteyen isteği")

Bu istek bir mobil ehliyetten iki alan istiyor: 18 yaşından büyük olup olmadığını ve fotoğrafı (yüz yüze karşılaştırma için). Her alanın karşısındaki #{raw("false")} değeri, doğrulayanın bu alanları #{strong[saklamayacağını]} bildirir. Cüzdan bu bilgiyi kişiye gösterir; "Bu okuyucu fotoğrafınızı görmek istiyor ama saklamayacağını bildiriyor" gibi bir ifade, kişinin kararını etkileyebilir.
]

Saklama niyeti teknik bir güvence değildir; doğrulayan saklamayacağını söyleyip yine de saklayabilir. Ama istek imzalı olduğunda ve doğrulayan kayıtlı bir kurum olduğunda, bu beyan hukuki bir bağlayıcılık kazanır ve sonradan denetlenebilir.

== Yanıt: yalnızca istenen paketler

Cüzdan, kişinin onayından sonra yanıtı hazırlar. Yanıtta üç şey bulunur: istenen alanların paketleri, imzalı MSO ve bu oturuma özel sahip imzası. İstenmeyen alanların paketleri yanıta konmaz; onların yalnızca özetleri, zaten imzalı MSO’nun içinde durur.

Doğrulayan her gelen paketin özetini hesaplar, MSO’da aynı sıra numarasının karşısındaki özetle karşılaştırır, MSO’nun imzasını verenin sertifikasıyla, sahip imzasını da MSO’daki cihaz anahtarıyla doğrular. Şekil 4 bu akışı özetliyor.

#kutu("teknik", [Bir mdoc yanıtının iskeleti (CBOR teşhis gösterimiyle; değerler örnektir ve kısaltıldı)])[
Yanıtta istenen paketler, imzalı MSO ve cüzdanın oturuma özel imzası birlikte gelir:

#kod("text", "{
  \"version\": \"1.0\",
  \"documents\": [ {
    \"docType\": \"org.iso.18013.5.1.mDL\",
    \"issuerSigned\": {
      \"nameSpaces\": { \"org.iso.18013.5.1\": [
        24(<< { \"digestID\": 3, \"random\": h'5B2C…', \"elementIdentifier\": \"age_over_18\", \"elementValue\": true } >>),
        24(<< { \"digestID\": 4, \"random\": h'A91E…', \"elementIdentifier\": \"portrait\", \"elementValue\": h'FFD8…' } >>)
      ] },
      \"issuerAuth\": [ …COSE_Sign1: MSO + verenin imzası ve sertifikası… ]
    },
    \"deviceSigned\": { \"nameSpaces\": 24(<< {} >>), \"deviceAuth\": { \"deviceSignature\": [ … ] } }
  } ],
  \"status\": 0
}", baslik: "Örnek: cüzdanın yanıtı, yalnızca istenen iki paketle")

#{raw("issuerSigned")} içinde yalnızca istenen iki paket var; diğer paketler yanıta hiç konmamış. #{raw("issuerAuth")}, imzalı MSO’yu taşır ve bütün paketlerin özetlerini içerdiği için her yanıtta aynıdır. #{raw("deviceAuth")} ise cüzdanın bu oturuma özel imzasıdır; sahip bağlamayı sağlar.
]

#sekil(4, [mdoc’ta seçici açıklama: imzalı özet tablosu ve yalnızca istenen paketler], "figures/a3/sekil-4.svg", yarim: false)

== Hesaplanmış öznitelikler: alanı değil cevabı göstermek

Seçici açıklamanın en sık anılan örneği yaş kontrolüdür. Ama dikkatli bakılırsa, tuzlu özet yöntemlerinin kendisi "18 yaşından büyüğüm" demeye yetmez. Tuzlu özetle gösterebileceğiniz şey, belgede #{strong[yazılı olan bir alandır]}. Belgede yalnızca doğum tarihi yazıyorsa, yaşınızı kanıtlamak için doğum tarihinizi göstermek zorundasınız; bu da gerekenden fazlasıdır.

ISO\/IEC 18013-5’in bu soruna cevabı, #{strong[hesaplanmış öznitelikler]}dir. Mobil ehliyet standardı, veren makamın belgeye doğum tarihinin yanında #{raw("age_over_18")}, #{raw("age_over_21")} gibi hazır cevaplar yazmasını tanımlar; standarttaki genel adıyla #{raw("age_over_NN")} \[3\]. Veren, belgeyi hazırlarken doğum tarihinden bu cevapları hesaplar ve her birini ayrı bir alan olarak imzalar. Doğrulayan yalnızca ihtiyaç duyduğu cevabı ister. Bu yazıdaki SD-JWT örneğinde #{raw("age_over_18")} alanının belgeye ayrıca yazılması da aynı fikirdir.

Bu çözüm basit ve etkilidir, ama üç sınırı vardır. Birincisi, veren hangi soruların sorulacağını #{strong[önceden]} bilmek zorundadır: 18, 21 ve 65 için cevap yazdıysa, 16 yaş sınırı olan bir hizmet için hazır cevap yoktur. İkincisi, cevaplar zamanla değişir: Bugün 17 yaşında olan biri için #{raw("age_over_18: false")} yazan belge, kişi 18’ine bastığı gün yanlış olur ve yenilenmesi gerekir. Üçüncüsü, cevapların bileşimi bilgi verir: Bir kişi #{raw("age_over_21: true")} ve #{raw("age_over_25: false")} gösterirse, yaşının 21 ile 25 arasında olduğu anlaşılır.

#kutu("ornek", [Aynur markette])[
Aynur bir akşam markette, kasada bir şişe şarap alıyor. Kasiyer yaş kontrolü için tezgâhtaki okuyucuyu gösteriyor. Aynur’un telefonu okuyucuya dokunduğunda cüzdan ekranında tek bir satır beliriyor: "Bu okuyucu 18 yaşından büyük olup olmadığınızı soruyor; bilgiyi saklamayacağını bildiriyor." Aynur onaylıyor. Kasiyerin ekranında yeşil bir işaret ve "18+" yazısı görünüyor. Ne Aynur’un adı, ne doğum tarihi, ne de fotoğrafı ekrana geliyor. Okuyucu, gelen tek paketin özetini imzalı MSO ile karşılaştırmış, MSO’nun imzasını ve cihaz imzasını kontrol etmiştir. Yine de okuyucunun elinde, aynı belgenin her gösteriminde değişmeyen imzalı MSO kalmıştır; Bölüm 8’de bunun neden önemli olduğuna döneceğiz.
]

Bu sınırları aşmanın yolu, cevabı verenin önceden hesaplaması yerine, sahibin gösterim anında #{strong[matematiksel olarak ispatlamasıdır]}: "Belgemdeki doğum tarihi, bugünden 18 yıl öncesinden daha eskidir" önermesinin, doğum tarihini açmadan ispatı. Bu, sıfır bilgi ispatlarının konusudur ve dizinin dördüncü yazısında ele alınıyor. Bir sonraki bölümde anlatacağımız BBS imzaları, bu yöne doğru atılmış önemli bir adımdır.

= BBS İmzaları: Türetilmiş İspat

== Sezgi: zarfları değil, imzayı dönüştürmek

Tuzlu özet yöntemlerinde imza hiç değişmez: Aynur, verenin imzasını olduğu gibi doğrulayana iletir ve yanına seçtiği açıklamaları ekler. Bu yöntemin ne kadar sade olduğunu gördük. Ama bir sonucu var: Aynur aynı belgeyi kime gösterirse göstersin, doğrulayanın eline #{strong[aynı imza]} geçer. Bu imza, belgenin bir tür parmak izidir.

BBS imzaları farklı bir fikre dayanır. Veren, belgenin bütün alanlarını #{strong[tek bir imzayla]} imzalar; ama bu imza öyle bir matematik yapıya sahiptir ki, sahibi imzayı hiç göstermeden ondan yeni bir şey #{strong[türetebilir]}: "Elimde, şu verenin imzaladığı bir belge var ve o belgedeki beşinci ve altıncı alanlar şunlardır" önermesinin bir #{strong[ispatını]}. Doğrulayan bu ispatı verenin açık anahtarıyla kontrol eder ve önermenin doğru olduğuna ikna olur. Ama imzanın kendisini hiç görmez; gösterilmeyen alanlar hakkında da hiçbir bilgi edinmez.

Daha da önemlisi, Aynur her gösterimde #{strong[yeni bir ispat]} türetir. Bu ispatların her biri rastgelelik içerir ve iki ispat, aynı belgeden türetilmiş olsalar bile birbirinden ayırt edilemez. İki doğrulayan ellerindeki ispatları karşılaştırsa, aynı belgeyi gördüklerini anlayamazlar. Bu özelliğe #{strong[bağlanamazlık]} (#{emph[unlinkability]}) denir ve tuzlu özet yöntemlerinin sağlayamadığı bir şeydir.

#kutu("tarihce", [BBS’nin uzun yolu])[
BBS adı, 2004’te "Kısa Grup İmzaları" (#{emph[Short Group Signatures]}) makalesini yayımlayan Dan Boneh, Xavier Boyen ve Hovav Shacham’ın soyadlarının baş harflerinden gelir \[5\]. Aynı yıl Jan Camenisch ve Anna Lysyanskaya, eşleme (#{emph[pairing]}) tabanlı eliptik eğrilerle çalışan ve birden çok mesajı tek imzayla imzalayıp sonra seçerek ispatlamaya izin veren imza şemalarını anonim belgeler için önerdi \[6\]. 2006’da Man Ho Au, Willy Susilo ve Yi Mu bu yapının tam güvenlik ispatını veren ve literatürde uzun süre "BBS+" diye anılan biçimini yayımladı \[7\]. 2023’te Stefano Tessaro ve Chenzhi Zhu, daha kısa imzalarla da aynı güvenliğin sağlandığını gösterdi \[8\]; bugünkü standart taslak bu sonuca dayanır.

Standartlaşma iki kanaldan ilerliyor. İnternet Araştırma Görev Gücü’nün (IRTF) kriptografi araştırma grubu CFRG, BBS imza şemasını tanımlayan taslak üzerinde çalışıyor; Ekim 2026 tarihli 14. sürüm en günceli \[4\]. W3C ise doğrulanabilir belgelerde BBS kullanımını tanımlayan "Data Integrity BBS Cryptosuites" belgesini aday öneri (#{emph[Candidate Recommendation]}) aşamasında tutuyor \[9\].
]

== Nasıl çalışır?

BBS’nin matematiğini tam olarak anlatmak bu yazının sınırlarını aşar; ama işleyişin iskeletini, ayrıntıya girmeden çizebiliriz.

#kutu("teknik", [BBS’nin iskeleti])[
#{strong[Anahtarlar.]} Veren, BLS12-381 adlı, #{strong[eşleme dostu]} (#{emph[pairing-friendly]}) özel bir eliptik eğri üzerinde bir anahtar çifti üretir. Eşleme, iki eğri noktasını alıp üçüncü bir matematiksel nesneye götüren ve bazı denklemlerin, içindeki gizli sayılar bilinmeden kontrol edilmesini sağlayan özel bir işlemdir. BBS’yi mümkün kılan bu işlemdir.

#{strong[İmzalama.]} Belgenin her alanı bir sayıya çevrilir: $m_1, m_2, ..., m_L$. Veren, bu sayıların hepsini tek bir eğri noktasında birleştirir ve bu noktayı, gizli anahtarı ve rastgele bir sayıyla birlikte, yine tek bir noktaya ($A$) dönüştürür. İmza, bu nokta ile o rastgele sayıdan ($e$) oluşur. BLS12-381 eğrisinde bir nokta 48 bayt, bir sayı 32 bayt tutar; imzanın boyutu bu yüzden belgede kaç alan olursa olsun aynıdır \[4\]:

#formul[$ "imza" = (A, e), quad 48 + 32 = 80 "bayt" $]

#{strong[İspat türetme.]} Sahip, imzayı doğrudan göstermez. Önce imzadaki noktaları rastgele sayılarla "karartır": Ortaya çıkan yeni noktalar, imzayla matematiksel ilişkisini korur ama imzanın kendisine benzemez. Sonra gizli kalacak her alan için, o alanın değerini açmadan, "bu karartılmış noktalar, verenin imzaladığı ve şu alanları içeren bir belgeden gelmektedir" önermesinin sıfır bilgi ispatını üretir. İspatın içinde üç eğri noktası, dört sayı ve #{strong[gizli kalan her alan için bir sayı]} bulunur \[4\].

#{strong[Doğrulama.]} Doğrulayan, verenin açık anahtarını, açıklanan alanları ve ispatı alır; bir eşleme denklemini kontrol eder ve ispatın doğru olup olmadığına karar verir.

#{strong[Küçük bir hesap.]} İspatın kaç bayt tuttuğunu, içindeki parçaları toplayarak bulabiliriz. $U$ gizli kalan alan sayısı olsun:

#formul[$ "ispat" &= underbrace(3 dot 48, "üç nokta") + underbrace(4 dot 32, "dört sayı") + underbrace(U dot 32, "gizli alanlar") \
        &= 272 + 32 U quad "bayt" $]

Aynur’un yedi alanlı öğrenci belgesinde iki alanı gösterdiğini düşünelim. Beş alan gizli kalır, yani $U = 5$:

#formul[$ 272 + 32 dot 5 = 272 + 160 = 432 "bayt" $]

Belge ne kadar çok alan içerirse içersin ispatın sabit kısmı 272 bayttır ve gizlenen her alan buna yalnızca 32 bayt ekler. Hiçbir alanı gizlemezse ispat 272 bayta iner. Gösterilen alanların değerleri bu boyuta ayrıca eklenir.
]

== Bağlanamazlık: her gösterim yeni

BBS’nin tuzlu özet yöntemlerine göre en büyük üstünlüğü, Bölüm 6.1’de söz ettiğimiz bağlanamazlıktır. Bunu somutlaştırmak için Aynur’un aynı öğrenci belgesini iki farklı yere gösterdiğini düşünelim: Cuma akşamı konser kapısında, cumartesi sabahı bir müzenin gişesinde. İki kurumun bilgi sistemleri bir gün birleşirse ya da iki kurum verilerini bir reklam şirketiyle paylaşırsa ne olur?

Tuzlu özet yöntemlerinde iki kurumun elinde #{strong[aynı]} verenin imzası, #{strong[aynı]} #{raw("_sd")} listesi ve #{strong[aynı]} sahip anahtarı vardır. Bu değerleri karşılaştıran biri, iki gösterimin aynı belgeden geldiğini kesin olarak anlar. Gösterilen alanlar farklı olsa bile (kulüp yaşı, müze öğrenciliği görmüş olsa bile) eşleşme kurulur ve iki kurumun bilgisi birleşir.

BBS’de ise her iki kurumun elinde, birbirinden matematiksel olarak ayırt edilemeyen iki farklı ispat vardır (Şekil 5). Karşılaştırılacak ortak bir değer yoktur. Elbette gösterilen alanların kendisi kişiyi tanımlıyorsa (örneğin her iki gösterimde de ad ve soyad açıldıysa) bağlanamazlık anlamını yitirir; ama bu sınır yöntemden gelmez, gösterilen veriden gelir.

BBS’de sahip bağlama da farklı kurulur. Tuzlu özet yöntemlerinde belge, sahibin açık anahtarını içerir ve bu anahtar her gösterimde aynıdır; yani bağlanamazlığı bozan tutamaklardan biridir. BBS’de ise sahibin gizli değeri, belgenin gizli alanlarından biri gibi imzalanabilir. Sahip her ispatta bu gizli değeri bildiğini, değeri açmadan kanıtlar. Bu yaklaşımın standart biçimi, verenin sahibin gizli değerini görmeden imzalamasını sağlayan "kör imza" uzantısı olarak ayrı bir IRTF taslağında çalışılıyor. Doğrulayanın gönderdiği tek kullanımlık değer de ispatın içine bağlanır; böylece bir ispat başka bir işlemde tekrar kullanılamaz.

#sekil(5, [BBS: tek imza, her gösterimde yeni ve birbirine bağlanamayan ispat], "figures/a3/sekil-5.svg", yarim: false)

== Neden henüz her yerde değil?

BBS’nin bu üstünlükleri karşısında, AB cüzdanının neden hâlâ tuzlu özet yöntemlerine dayandığı sorusu doğaldır. Bunun birkaç nedeni var ve hepsi teknik olmaktan çok pratiktir.

#{strong[Güvenli donanım.]} Dizinin ikinci yazısında, belgenin sahibine bağlanmasının telefonun güvenli donanımında üretilen bir anahtara dayandığını görmüştük. Bugünkü telefonların güvenli donanımları, sıradan eliptik eğri imzalarını (ECDSA, P-256 eğrisi) destekler; BBS’nin gerektirdiği eşleme işlemlerini ve BLS12-381 eğrisini desteklemez. BBS ispatı yazılımla üretilebilir, ama o zaman sahip bağlamanın güvencesi zayıflar ya da iki farklı kriptografiyi birbirine bağlayan ek ispatlar gerekir. Akademik çalışmalar bu iki dünyayı birleştirmenin yollarını araştırıyor \[17\].

#{strong[Onaylı kriptografi.]} Avrupa Birliği’nde kamu güvencesi taşıyan sistemlerde kullanılacak kriptografik mekanizmalar, onaylı listelerden seçilir. 2026\/1731 sayılı uygulama tüzüğü, AB cüzdanlarının kullanacağı kriptografik mekanizmaları, AB Siber Güvenlik Ajansı ENISA’nın yayımladığı "Agreed Cryptographic Mechanisms" belgesine bağlamıştır \[15\]. Yeni bir imza şemasının bu tür listelere girmesi, yıllar süren bir inceleme ve olgunlaşma sürecidir.

#{strong[Standart olgunluğu.]} BBS’nin IRTF taslağı ve W3C belgesi henüz tamamlanmış standartlar değildir. SD-JWT bir IETF standardı, ISO\/IEC 18013-5 de yıllardır uygulanan bir uluslararası standarttır. Milyonlarca kişiye hizmet verecek bir sistemin, tamamlanmamış bir standarda dayanması büyük bir risk taşır.

#{strong[Kuantum sonrası dönem.]} BBS’nin güvenliği, eliptik eğriler üzerindeki zor problemlere dayanır; bu problemler gelecekteki büyük ölçekli kuantum bilgisayarlar karşısında dayanıksızdır. Aynı sorun ECDSA için de geçerlidir, ama tuzlu özet yöntemlerinde imza algoritmasını değiştirmek görece kolaydır: Özetler aynı kalır, yalnızca imza kuantuma dayanıklı bir algoritmayla değiştirilir. BBS’de ise bağlanamazlık özelliği imza şemasının kendisine gömülüdür; kuantuma dayanıklı bir karşılığı henüz araştırma aşamasındadır. Bu konu dizinin son yazısında ele alınıyor.

== Üçüncü bir yol: var olan imzanın üzerinde ispat

BBS’nin önündeki engellerin çoğu, yeni bir imza şemasını bütün ekosisteme yaymanın zorluğundan kaynaklanır: Verenlerin yeni anahtarlar üretmesi, telefonların yeni kriptografiyi desteklemesi, onaylı listelerin güncellenmesi. Bu yüzden son yıllarda farklı bir yaklaşım güç kazandı: Belgeyi bugünkü gibi, sıradan ECDSA imzasıyla ve tuzlu özetlerle vermek, ama gösterim anında imzanın ve özetlerin #{strong[kendisini göstermek yerine]}, "elimde bu verenin imzaladığı ve şu koşulu sağlayan bir belge var" önermesinin genel amaçlı bir sıfır bilgi ispatını üretmek.

Bu yaklaşımın çekici yanı, verenlerin hiçbir şeyi değiştirmek zorunda olmamasıdır; değişiklik yalnızca cüzdanda ve doğrulayıcıda olur. Üstelik ispat, "doğum tarihi şu tarihten öncedir" gibi koşulları da kapsayabilir; yani Bölüm 5.4’teki hesaplanmış özniteliklerin esneklik sorununu da çözer. Bedeli ise hesaplama maliyetidir: Genel amaçlı sıfır bilgi ispatları, BBS’nin türetilmiş ispatlarından çok daha ağırdır ve bir telefonda saniyeler sürebilir. Son yıllarda açık kaynak olarak yayımlanan kütüphaneler bu süreyi gündelik kullanıma uygun düzeylere indirmeye başladı. Bu yaklaşımın ayrıntısı, maliyetleri ve AB’nin bu konudaki çalışmaları dizinin dördüncü yazısının konusu.

= Yöntemlerin Karşılaştırması

Üç yöntemi tanıdıktan sonra onları yan yana koyabiliriz. Tablo 2, bu yazıdaki örnekler üzerinden ve standartların kendi verdiği değerlerle bir karşılaştırma sunuyor. Boyutlar örnek belgeler içindir ve yalnızca büyüklük mertebesini göstermeyi amaçlar.

#tablo([#{strong[Tablo 2.]} Seçici açıklama yöntemlerinin karşılaştırması.], (18fr, 26fr, 19fr, 32fr), ([Ölçüt], [SD-JWT (tuzlu özet)], [mdoc (MSO özetleri)], [BBS (türetilmiş ispat)],), (
  ([Temel fikir], [açıklamaların özetleri imzalanır], [sıra numaralı paketlerin özetleri imzalanır], [çok mesajlı tek imzadan ispat türetilir],),
  ([Kodlama], [JSON, Base64URL], [CBOR (ikili)], [şemadan bağımsız; W3C’de JSON-LD],),
  ([Kriptografi], [özet fonksiyonu + sıradan imza (ör. ECDSA)], [özet fonksiyonu + COSE imzası (ör. ECDSA)], [eşleme tabanlı eğri (BLS12-381)],),
  ([İmza \/ ispat boyutu], [imza 64 bayt (ES256); gizli alan başına bir özet], [benzer], [imza 80 bayt; ispat $272 + 32 U$ bayt ($U$: gizli alan sayısı)],),
  ([Hız], [çok hızlı (özet ve tek imza)], [çok hızlı], [daha yavaş (eşleme işlemleri)],),
  ([Güvenli donanım desteği], [var], [var], [bugün yok],),
  ([Gösterilmeyen alanlar], [gizli (tuz sayesinde)], [gizli (tuz sayesinde)], [gizli (sıfır bilgi)],),
  ([Alan sayısının gizlenmesi], [sahte özetlerle], [sınırlı], [yok (toplam alan sayısı doğrulamada bilinir)],),
  ([Gösterimler arası bağlanamazlık], [yok (aynı imza ve özetler)], [yok (aynı MSO)], [var (her ispat yeni)],),
  ([Hesaplanmış cevaplar (yaş vb.)], [verenin önceden yazdığı alanlarla], [#{raw("age_over_NN")} alanlarıyla], [önceden yazılmış alanlarla; aralık ispatı uzantıları araştırılıyor],),
  ([Standart durumu (Kasım 2026)], [RFC 9901 (2025)], [ISO\/IEC 18013-5:2021], [IRTF taslağı; W3C aday öneri],),
  ([AB cüzdanındaki yeri], [PID ve EAA için zorunlu biçimlerden], [PID ve EAA için zorunlu biçimlerden], [zorunlu çekirdekte yok],),
))

Tablonun iki satırı, bu alandaki temel ödünleşimi özetler (Şekil 6). "Güvenli donanım desteği" satırında tuzlu özet yöntemleri kazanır; "bağlanamazlık" satırında BBS. Bugün AB’nin ve dünyanın büyük kimlik sistemlerinin çoğu, güvenli donanımı, standart olgunluğunu ve sadeliği önceleyerek tuzlu özetleri seçmiş, bağlanamazlık sorununu ise başka yollarla, örneğin aynı belgenin birden çok kopyasını vererek hafifletmeye çalışmıştır. Bu yolların ayrıntısı dizinin beşinci yazısının konusu.

Peki bir kurum, bugün hangi yöntemi seçmelidir? Bu sorunun cevabı çoğu zaman kurumun elinde değildir. AB cüzdanıyla çalışacak bir veren için kimlik bilgisi ve nitelikli onaylar söz konusu olduğunda biçimler tüzükle belirlenmiştir: SD-JWT VC ve mdoc. Bu biçimlerin ikisi de tuzlu özet yöntemini kullanır. Kurumun asıl seçimi, belgesinin hangi alanlarını #{strong[ayrı ayrı gizlenebilir]} yapacağı, hangi hesaplanmış cevapları ekleyeceği ve belgeyi kaç kopya hâlinde vereceğidir. Bu seçimler, yöntemin kendisinden çok daha fazla gizlilik farkı yaratır. Doğum tarihini tek bir alan olarak veren ama #{raw("age_over_18")} cevabını eklemeyen bir belge, en iyi seçici açıklama yöntemiyle bile yaş kontrolünde doğum tarihini açtırır. Adres alanını tek bir bütün olarak gizlenebilir yapan bir belge, kişiyi yalnızca ülkesini kanıtlamak için bütün adresini göstermeye zorlar.

BBS gibi türetilmiş ispat yöntemleri ise bugün, kurumların kendi aralarında kurduğu, AB cüzdanının zorunlu çekirdeğinin dışında kalan sistemlerde ve araştırma projelerinde deneniyor. Gizliliğin özellikle önemli olduğu, bağlanamazlığın birincil hedef olduğu ve güvenli donanım şartının esnetilebildiği kullanım durumları için ciddi bir seçenektir; ama genel amaçlı bir kimlik sistemi için, en azından önümüzdeki birkaç yıl, tamamlayıcı bir rol oynaması daha olası görünüyor.

#sekil(6, [Üç yöntemin boyut ve gizlilik ödünleşimi (örnek: yedi alanlı belge, iki alan gösteriliyor)], "figures/a3/sekil-6.svg", yarim: false)

= Seçici Açıklamanın Sınırı

== Aynı imza, aynı kişi

Bölüm 6.3’te konser ile müze örneğinde gördüğümüz sorunu genelleştirelim. Tuzlu özet yöntemlerinde bir belgenin her gösteriminde değişmeyen birkaç değer vardır ve her biri, gösterimleri birbirine bağlamak için kullanılabilecek bir #{strong[ilişkilendirme tutamağı]} gibi çalışır (Şekil 7):

- #{strong[Verenin imzası.]} Belgenin her gösteriminde aynıdır; iki doğrulayan aynı imzayı görürse aynı belgeyi görmüştür.
- #{strong[Özet listesi.]} #{raw("_sd")} listesi ya da MSO’daki özetler her gösterimde aynıdır.
- #{strong[Sahip anahtarı.]} #{raw("cnf")} alanındaki ya da MSO’daki cihaz anahtarı, belge yenilenene kadar aynıdır.
- #{strong[Durum listesindeki yer.]} Belgenin iptal durumunun bakıldığı sıra numarası her gösterimde aynıdır.
- #{strong[Tek tek alanlar.]} Bir alanın açıklaması, tuzu dahil, her gösterimde aynıdır; aynı açıklamayı gören iki doğrulayan eşleşme kurabilir.

Bu tutamakların hiçbiri gizli alanların değerini açmaz. Seçici açıklama işini yapmıştır. Ama iki gösterimin #{strong[aynı kişiye]} ait olduğunu ortaya koyarlar. Kulüp yalnızca yaşı, müze yalnızca öğrenciliği gördüyse bile, iki kurum verilerini birleştirdiğinde "cuma akşamı caz kulübünde olan kişi ile cumartesi sabahı müzede olan kişi aynıdır" bilgisine ulaşır. Bu tür eşleşmeler zamanla birikir ve bir kişinin hareketlerinin bir haritasına dönüşebilir.

Bu yüzden seçici açıklama, gizliliğin #{strong[gerekli ama yeterli olmayan]} bir koşuludur. Ne gösterildiğini sınırlar; gösterimlerin birbirine bağlanmasını engellemez. AB’nin cüzdan mimarisi bu sorun için, aynı belgenin birden çok kopyasının toplu olarak verilmesini ve her kopyanın bir kez kullanılmasını önerir; her kopyanın imzası, özetleri ve anahtarı farklı olduğu için gösterimler birbirine bağlanamaz. eIDAS 2.0 da, belgenin kişinin kimliğini gerektirmediği durumlarda bağlanamazlığı sağlayan gizlilik koruyucu tekniklerin desteklenmesini ister \[14\]. Bu çözümlerin ayrıntısı ve bedelleri dizinin beşinci yazısında.

#sekil(7, [Seçici açıklama alanları gizler ama gösterimleri birbirine bağlayan tutamaklar kalır], "figures/a3/sekil-7.svg", yarim: false)

== Az sayıda alan da tanımlayıcıdır

Seçici açıklamanın ikinci sınırı, gösterilen alanların kendisiyle ilgilidir. Bir kişinin adını ve kimlik numarasını gizleyip yalnızca birkaç "masum" alanını göstermesi, onu her zaman tanınmaz kılmaz.

Bu konuda sık anılan bir çalışma, 2000’de Carnegie Mellon Üniversitesi’nde yayımlanan "Basit Demografik Bilgiler İnsanları Çoğu Zaman Tek Başına Tanımlar" (#{emph[Simple Demographics Often Identify People Uniquely]}) başlıklı rapordur \[16\]. Çalışma, 1990 Amerikan nüfus sayımı verileri üzerinden, beş haneli posta kodu, cinsiyet ve tam doğum tarihinden oluşan üç bilginin Amerika Birleşik Devletleri nüfusunun yaklaşık yüzde 87’sini tek başına tanımlamaya yettiğini tahmin etti. Yani her biri tek başına sıradan görünen üç alan, birlikte bir kimlik numarası kadar ayırt edicidir.

Seçici açıklama açısından ders açıktır: Doğrulayanın bir işlem için istediği alanların #{strong[bileşimi]} de minimizasyon ilkesine göre değerlendirilmelidir. "Doğum tarihi" yerine "18 yaşından büyük mü?", "tam adres" yerine "bu ülkede mi oturuyor?" sorulduğunda, hem her tek alanın hem de alanların bileşiminin ayırt ediciliği azalır. Bölüm 5.4’teki hesaplanmış öznitelikler ve dizinin dördüncü yazısındaki sıfır bilgi ispatları, bu yüzden teknik bir incelikten öte, gizliliğin özüdür.

== İsteyen fazlasını isterse

Üçüncü sınır, teknik değil davranışsaldır. Seçici açıklama, kişiye belgenin bir kısmını gösterme #{strong[imkânı]} verir; ama doğrulayan belgenin tamamını isterse ve kişi hizmeti almak için onaylamak zorunda kalırsa, bu imkânın bir anlamı kalmaz. Kâğıt dünyasında "kimliğinizin fotokopisini alabilir miyiz?" sorusuna hayır demek zordur; dijital dünyada "bütün alanları paylaş" düğmesine basmamak da aynı ölçüde zor olabilir.

Bu yüzden AB’nin cüzdan mimarisi seçici açıklamayı, doğrulayanın ne isteyebileceğini sınırlayan kurallarla birlikte düşünür. Dizinin ikinci yazısında anlattığımız gibi, güvenen taraflar hangi alanları hangi amaçla isteyeceklerini önceden kaydettirir. 2026\/1731 sayılı uygulama tüzüğüne göre cüzdan, istenen alanları bu kayıtla karşılaştırır; doğrulayan kayıtlı olduğundan fazlasını istiyorsa, herhangi bir veri paylaşılmadan önce kişiyi açıkça uyarır ve kişinin ayrıca onay vermesini ister \[15\]. Fotoğraf için ise, kayıtlı bir istek olsa bile, kişiden ayrıca ve açıkça onay alınması gerekir. Yani seçici açıklama tek başına bir teknik özellik olarak değil, bir #{strong[hukuki ve teknik sistemin parçası]} olarak anlam kazanır.

== Doğrulayanın elinde kalan kanıt

Seçici açıklamanın az konuşulan bir yanı daha var. Kâğıt dünyasında görevli kartınıza baktığında, gördüğü bilginin bir kanıtını elinde tutmaz; birine "bu kişi 18 yaşından büyüktü" dese bile, bunu ispatlayamaz. Tuzlu özet yöntemlerinde ise doğrulayan, gösterilen alanları verenin imzasıyla birlikte saklayabilir. Elinde, "bu alanlar şu verenin imzaladığı bir belgeden geldi" diye üçüncü kişilere gösterebileceği, matematiksel olarak doğrulanabilir bir kayıt kalır.

Bu durum her zaman bir sorun değildir; bazı işlemlerde, örneğin bir banka hesabı açılırken, kurumun neye dayanarak karar verdiğini belgelemesi hukuken gereklidir. Ama kişinin bakış açısından, paylaştığı her alanın imzalı bir kopyasının karşı tarafta kalması, o paylaşımın ağırlığını artırır. Bu yüzden seçici açıklama, Bölüm 5.2’deki saklama niyeti beyanı ve güvenen tarafların kayıt kurallarıyla birlikte düşünülmelidir. Gösterilen verinin ne kadar süre, hangi amaçla saklanacağı teknik değil hukuki bir sorudur; ama teknik tasarım, bu sorunun ciddiyetini belirler.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Seçici açıklama ne gösterildiğini sınırlar, ama üç şeyi kendi başına çözmez. Tuzlu özet yöntemlerinde imza, özetler ve sahip anahtarı her gösterimde aynı olduğu için farklı doğrulayanlar gösterimleri birbirine bağlayabilir. Masum görünen birkaç alanın bileşimi kişiyi tanımlamaya yetebilir. Doğrulayan gereğinden fazlasını isterse, gizleme imkânı kullanılmaz. Bu üç sınırın cevapları sırasıyla bağlanamazlık teknikleri, hesaplanmış öznitelikler ve sıfır bilgi ispatları ile güvenen taraf kaydıdır.
]

= Sınırlar ve Açık Sorular

#{strong[Bağlanamazlığın maliyeti.]} Tuzlu özet yöntemlerinde bağlanamazlığın en yaygın çaresi, aynı belgenin çok sayıda tek kullanımlık kopyasını vermektir. Bu, verenin daha fazla imza üretmesi, cüzdanın daha fazla veri saklaması ve kopyalar tükendiğinde yenilerinin alınması demektir. Kopyaların ne zaman ve nasıl yenileneceği, yenileme sırasında verenin kişinin kullanım sıklığını öğrenip öğrenmeyeceği, henüz tam oturmamış sorulardır.

#{strong[Hesaplanmış özniteliklerin esnekliği.]} Verenin önceden yazdığı #{raw("age_over_NN")} gibi cevaplar basit ve hızlıdır, ama her ülkenin, her hizmetin farklı yaş sınırları vardır. Bir veren kaç farklı cevap yazmalıdır ve doğum günlerinde belgeler nasıl yenilenmelidir? Sıfır bilgi ispatları bu soruyu ortadan kaldırabilir, ama onların cihazlardaki maliyeti ve standart durumu ayrı bir tartışmadır.

#{strong[Kullanıcının anlaması.]} Seçici açıklama, kişinin neyi paylaştığını anlamasına dayanır. "Öğrencilik durumu" ile "öğrenci belgesi" arasındaki fark, ya da "bu okuyucu fotoğrafınızı saklamayacağını bildiriyor" ifadesinin ne anlama geldiği, her kullanıcı için açık değildir. Cüzdan arayüzlerinin bu ayrımları sade ve doğru biçimde göstermesi, teknik tasarım kadar önemli ve henüz yeterince araştırılmamış bir alandır.

#{strong[Biçimler arası tutarlılık.]} Aynı kimlik bilgisi hem SD-JWT VC hem mdoc olarak verildiğinde, iki biçimde gizlenebilen alanların, alan adlarının ve hesaplanmış cevapların tutarlı olması gerekir. Bir biçimde gizlenebilen bir alanın diğerinde gizlenememesi, kişinin gizliliğini en zayıf biçime indirir.

#{strong[Yüz yüze ve çevrimdışı durumlar.]} Kapıda, kasada ya da yol kenarında yapılan doğrulamada doğrulayan çoğu zaman kişinin fotoğrafını da ister; çünkü yüz yüze ortamda sahip bağlamanın en güçlü tamamlayıcısı yine görevlinin gözüdür. Ama fotoğraf, bir kişiye ait belki de en hassas veridir. Fotoğrafı istemeden yüz yüze doğrulama yapmanın, ya da fotoğrafı yalnızca o anki karşılaştırma için gösterip hiçbir yerde bırakmamanın güvenilir yolları, mobil belge standartlarının üzerinde çalıştığı açık bir konudur. AB’nin fotoğraf için ayrıca ve açıkça onay şartı, bu hassasiyetin hukuki karşılığıdır.

#{strong[Gelecek imzalar.]} BBS ve benzeri şemalar güvenli donanıma ve onaylı listelere ne zaman girecek? Yoksa var olan ECDSA imzalı belgeler üzerinde sıfır bilgi ispatı üreten yaklaşımlar bu boşluğu daha önce mi dolduracak? Bu sorunun cevabı, önümüzdeki yıllarda cüzdanların gizlilik düzeyini belirleyecek.

= Bu Tablonun İçinde Tamga Network

Bu yazıyı yayımlayan Tamga Network, Türkiye ve Türk dünyası için AB’nin eIDAS 2.0 ve EUDI profilleri üzerine kurulan, kâr amacı gütmeyen bir dijital güven ağıdır. Ağın modelinde kişi, cüzdanındaki belgeden yalnızca istenen alanları paylaşır; bu yazıda anlatılan seçici açıklama, bu modelin merkezindedir.

Ağın açık kaynak paketleri, AB’nin kişi kimlik verisi ve öznitelik onayları için seçtiği iki biçimi, SD-JWT VC’yi ve ISO\/IEC 18013-5 mdoc’u esas alır; yani bu yazının Bölüm 4 ve 5’inde anlatılan tuzlu özet yöntemlerini kullanır. Doğrulayanın "bu belgeyi veren kurum yetkili mi?" sorusunu cevapladığı imzalı güven listelerinde hiçbir kişisel veri yer almaz. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayanları listeler.

= Sonuç

Kapıdaki görevliye dönelim. Kâğıt dünyasında görevlinin iki soru sorup on cevap öğrenmesi, belgenin bölünemez olmasından kaynaklanıyordu: Kartın bir köşesini gösterip gerisini kapatamazsınız. Dijital belgede bu kısıt ortadan kalkar, ama yerine başka bir kısıt gelir: Dijital imza da belgenin bütününü korur ve parçalandığında bozulur.

Seçici açıklama bu kısıtı aşmanın matematiğidir. Tuzlu özet yöntemlerinde veren alanların tuzlanmış kapalı zarflarını imzalar; sahip yalnızca istediği zarfları açar ve doğrulayan açılan zarfların imzalı listede bulunduğunu kontrol eder. SD-JWT bu fikri web’in diliyle, mdoc ise mobil ehliyetin ikili diliyle uygular. BBS imzaları ise bir adım öteye giderek imzanın kendisini hiç göstermeden, her gösterimde yeni bir ispat türetir ve böylece gösterimlerin birbirine bağlanmasını da engeller; ama bugünün telefonları ve onaylı kriptografi listeleri henüz ona hazır değildir.

Bu yazının belki en önemli dersi, seçici açıklamanın bir başlangıç olduğudur. Ne gösterildiğini sınırlamak, kimin neyi birleştirebileceğini sınırlamakla aynı şey değildir. Aynı belgeyi gören iki kurumun aynı kişiyle iş yaptığını anlamasını engellemek, dizinin beşinci yazısının; belgede yazılı olmayan bir cevabı, örneğin "18 yaşından büyüğüm" önermesini doğum tarihini açmadan ispatlamak ise dördüncü yazının konusu.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Fett, D., Yasuda, K. ve Campbell, B. (2025). #{emph[Selective Disclosure for JSON Web Tokens.]} IETF RFC 9901, Kasım 2025.]

#kaynak("2")[Terbu, O., Fett, D. ve Campbell, B. (2026). #{emph[SD-JWT-based Verifiable Digital Credentials (SD-JWT VC).]} IETF Internet-Draft draft-ietf-oauth-sd-jwt-vc-23, 31 Ekim 2026.]

#kaynak("3")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]} Eylül 2021.]

#kaynak("4")[Looker, T., Kalos, V., Whitehead, A., Lodder, M. ve Bernstein, G. (2026). #{emph[The BBS Signature Scheme.]} IRTF CFRG Internet-Draft draft-irtf-cfrg-bbs-signatures-14, 29 Ekim 2026.]

#kaynak("5")[Boneh, D., Boyen, X. ve Shacham, H. (2004). "Short Group Signatures." #{emph[Advances in Cryptology — CRYPTO 2004]}, Lecture Notes in Computer Science 3152, Springer, 41–55.]

#kaynak("6")[Camenisch, J. ve Lysyanskaya, A. (2004). "Signature Schemes and Anonymous Credentials from Bilinear Maps." #{emph[Advances in Cryptology — CRYPTO 2004]}, Lecture Notes in Computer Science 3152, Springer, 56–72.]

#kaynak("7")[Au, M. H., Susilo, W. ve Mu, Y. (2006). "Constant-Size Dynamic k-TAA." #{emph[Security and Cryptography for Networks (SCN 2006)]}, Lecture Notes in Computer Science 4116, Springer.]

#kaynak("8")[Tessaro, S. ve Zhu, C. (2023). "Revisiting BBS Signatures." #{emph[Advances in Cryptology — EUROCRYPT 2023]}, Lecture Notes in Computer Science, Springer.]

#kaynak("9")[W3C (2026). #{emph[Data Integrity BBS Cryptosuites v1.0.]} W3C Candidate Recommendation Draft, 10 Eylül 2026.]

#kaynak("10")[Chaum, D. (1985). "Security Without Identification: Transaction Systems to Make Big Brother Obsolete." #{emph[Communications of the ACM]}, 28(10), 1030–1044.]

#kaynak("11")[Brands, S. (2000). #{emph[Rethinking Public Key Infrastructures and Digital Certificates: Building in Privacy.]} MIT Press.]

#kaynak("12")[Avrupa Parlamentosu ve Konseyi (2016). #{emph[Kişisel verilerin işlenmesi bakımından gerçek kişilerin korunması ve bu verilerin serbest dolaşımı hakkında 2016\/679 sayılı Tüzük (AB) (Genel Veri Koruma Tüzüğü).]} 27 Nisan 2016; madde 5(1)(c) ve 25.]

#kaynak("13")[#{emph[6698 sayılı Kişisel Verilerin Korunması Kanunu.]} Resmî Gazete, 7 Nisan 2016, sayı 29677; madde 4(2)(ç).]

#kaynak("14")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024; gerekçe 59, madde 5a.]

#kaynak("15")[Avrupa Komisyonu (2026). #{emph[2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982 sayılı Uygulama Tüzüklerini uygulanacak standartlar ve şartnameler bakımından değiştiren 2026\/1731 sayılı Uygulama Tüzüğü (AB).]} 15 Temmuz 2026; Avrupa Birliği Resmî Gazetesi, 22 Temmuz 2026.]

#kaynak("16")[Sweeney, L. (2000). #{emph[Simple Demographics Often Identify People Uniquely.]} Carnegie Mellon University, Data Privacy Working Paper 3, Pittsburgh.]

#kaynak("17")[Flamini, A., Sciarretta, G., Scuro, M., Sharif, A., Tomasi, A. ve Ranise, S. (2024). #{emph[On Cryptographic Mechanisms for the Selective Disclosure of Verifiable Credentials.]} arXiv:2401.08196.]

#kaynak("18")[Cameron, K. (2005). #{emph[The Laws of Identity.]} Microsoft Corporation, Mayıs 2005.]

#kaynak("19")[Sporny, M., Thibodeau Jr, T., Herman, I., Cohen, G. ve Jones, M. B. (Ed.) (2025). #{emph[Verifiable Credentials Data Model v2.0.]} W3C Recommendation, 15 Mayıs 2025.]

#kaynak("20")[Camenisch, J. ve Lysyanskaya, A. (2001). "An Efficient System for Non-transferable Anonymous Credentials with Optional Anonymity Revocation." #{emph[Advances in Cryptology — EUROCRYPT 2001]}, Lecture Notes in Computer Science 2045, Springer, 93–118.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

+ #{strong[IETF, RFC 9901, Bölüm 4 ve 5 ile Ek A.]} Verenin ve doğrulayanın adımları ve tam çözümlü örnekler; bu yazıdaki hesapları kendiniz tekrarlamak için en iyi kaynak.
+ #{strong[David Chaum, "Security Without Identification" (1985).]} Kırk yıl önce yazılmış ama bugünkü cüzdan tartışmasının neredeyse bütün sorularını soran, teknik olmayan okurun da izleyebileceği bir makale.
+ #{strong[Flamini ve arkadaşları, #{emph[On Cryptographic Mechanisms for the Selective Disclosure of Verifiable Credentials]} (2024).]} Tuzlu özet yöntemlerini ve BBS’yi aynı ölçütlerle karşılaştıran, ölçümler içeren güncel bir inceleme.
+ #{strong[IRTF CFRG, #{emph[The BBS Signature Scheme]}, Bölüm 1 ve 3.]} BBS’nin amacını ve işlemlerini tanımlayan giriş bölümleri.
+ #{strong[Tüzük (AB) 2024\/1183, gerekçe 59.]} Seçici açıklamanın AB cüzdanının neden temel bir tasarım özelliği olduğunu tüzüğün kendi dilinden okumak için kısa bir paragraf.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. İngilizce karşılıklar, başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (19fr, 18fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Açıklama], [disclosure], [SD-JWT’de tuz, alan adı ve değerden oluşan, Base64URL ile kodlanmış kapalı zarf içeriği],),
  ([Bağlanabilirlik], [linkability], [Farklı gösterimlerin aynı belgeye ya da kişiye ait olduğunun anlaşılabilmesi],),
  ([Bağlanamazlık], [unlinkability], [Gösterimlerin birbirine bağlanamaması],),
  ([BBS imzası], [BBS signature], [Çok mesajı tek imzayla imzalayan, sahibin ondan seçici ispat türetebildiği imza şeması],),
  ([BLS12-381], [BLS12-381], [BBS’de kullanılan, eşleme işlemine uygun eliptik eğri],),
  ([Eşleme], [pairing], [İki eğri noktasından üçüncü bir nesne üreten ve bazı denklemlerin gizli değerler bilinmeden kontrolünü sağlayan işlem],),
  ([Hesaplanmış öznitelik], [derived attribute], [Verenin başka bir alandan hesaplayıp ayrıca yazdığı cevap (ör. #{raw("age_over_18")})],),
  ([İlişkilendirme tutamağı], [correlation handle], [Her gösterimde aynı kalan ve gösterimleri birbirine bağlamaya yarayan değer],),
  ([MSO], [mobile security object], [mdoc’ta alan paketlerinin özetlerini, cihaz anahtarını ve geçerliliği taşıyan imzalı nesne],),
  ([Sahte özet], [decoy digest], [Hiçbir alana karşılık gelmeyen, alan sayısını gizlemek için eklenen özet],),
  ([Saklama niyeti], [intent to retain], [mdoc isteğinde doğrulayanın bir alanı saklayıp saklamayacağını bildiren işaret],),
  ([Seçici açıklama], [selective disclosure], [Belgenin yalnızca istenen alanlarını, imzanın güvencesini koruyarak gösterebilme],),
  ([Sıfır bilgi ispatı], [zero-knowledge proof], [Bir önermenin doğru olduğunu, önermenin doğruluğu dışında hiçbir bilgi vermeden kanıtlama],),
  ([Taahhüt], [commitment], [Bir değeri şimdi bağlayıp sonra açmayı sağlayan, gizleyen ve bağlayan kriptografik yapı],),
  ([Tasarımdan itibaren veri koruma], [data protection by design], [Veri korumanın sistem tasarımına baştan yerleştirilmesi ilkesi],),
  ([Türetilmiş ispat], [derived proof], [Sahibin imzadan, imzayı göstermeden ürettiği ve seçilen alanları kanıtlayan yapı],),
  ([Tuz], [salt], [Özetin tahminle çözülmesini engellemek için girdiye eklenen rastgele değer],),
  ([Tuzlu özet], [salted hash], [Tuz, alan adı ve değerin birlikte özetlenmesiyle oluşan kapalı zarf],),
  ([Veri minimizasyonu], [data minimisation], [Bir amaç için yalnızca gerekli, ilgili ve sınırlı verinin işlenmesi ilkesi],),
))

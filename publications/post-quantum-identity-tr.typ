// A15 — Kuantum Sonrası Dönemde Dijital Kimlik. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Kuantum Sonrası Dönemde Dijital Kimlik",
  altbaslik: "Shor Algoritmasından ML-DSA'ya: İmzaların Geleceği ve Uzun Ömürlü Belgelerin Geçişi",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Şubat 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("kuantum sonrası kriptografi", "Shor algoritması", "ML-DSA", "SLH-DSA", "ML-KEM", "FIPS 204", "karma imza", "kripto çeviklik", "şimdi topla sonra çöz", "dijital kimlik",),
  atif: "Karataş, B. (2027). Kuantum Sonrası Dönemde Dijital Kimlik: Shor Algoritmasından ML-DSA'ya: İmzaların Geleceği ve Uzun Ömürlü Belgelerin Geçişi. Tamga Network Akademik Çalışmalar, A15. https://tamga.network/files/publications/post-quantum-identity-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bu dizide anlattığımız her şey, yani doğrulanabilir belgeler, seçici açıklama, güven listeleri, iptal listeleri, pasaport çipleri ve kimlik cüzdanları, sonunda aynı temele dayanıyor: dijital imza. Bugün kullanılan imzaların neredeyse tamamı, RSA ve eliptik eğri kriptografisi gibi, büyük sayıları çarpanlarına ayırmanın ya da ayrık logaritma almanın zor olmasına güvenir. 1994’te gösterildiği gibi, yeterince büyük ve hatası düzeltilmiş bir kuantum bilgisayar bu iki problemi de verimli biçimde çözebilir. Böyle bir makine henüz yok ve ne zaman yapılabileceği bilinmiyor. Ama bir diploma ömür boyu, bir pasaport on yıl, bir devletin kök anahtarı on beş yıl geçerli kalıyorsa, soru bugün sorulmak zorunda.

Yazı, hiçbir ön bilgi varsaymadan kuantum tehdidini, Shor algoritmasının sezgisini ve ABD Ulusal Standartlar ve Teknoloji Enstitüsü’nün (NIST) Ağustos 2024’te yayımladığı ilk kuantum sonrası standartları (FIPS 203, 204 ve 205) anlatıyor. ML-DSA ve SLH-DSA imzalarının nasıl çalıştığını, kimlik belgelerine getirdiği boyut yükünü küçük hesaplarla gösteriyor; "şimdi topla, sonra çöz" riskinin şifreleme ve imza için neden farklı anlama geldiğini açıklıyor. Karma imzaları, kripto çevikliği, Avrupa Birliği’nin 2024 tavsiyesini ve 2025 yol haritasını, ETSI’nin güncel şartnamelerini ve NIST’in Ekim 2026’da kesinleşen geçiş takvimini ele alıyor. Bu, dizinin son yazısı; Sonuç bölümünde diziye kısa bir kapanış yapıyoruz.
  ],
)

= Giriş: 2041’de Bir Diploma

Dizinin ilk yazısında Bakü’den İstanbul’a yüksek lisans başvurusu yapan Aynur’la tanışmıştık. Aradan on beş yıl geçtiğini düşünelim. Yıl 2041. Aynur artık deneyimli bir yazılım mühendisi ve Almatı’daki bir şirkete başvuruyor. Şirket ondan lisans diplomasını istiyor. Aynur cüzdanını açıyor; Bakü’deki üniversitesinin 2026 yazında imzalayıp gönderdiği dijital diploma hâlâ orada duruyor. Paylaşıyor. Şirketin doğrulama yazılımı imzayı kontrol ediyor: geçerli.

Bu sahnede gözden kaçan bir soru var. Diplomanın imzası, 2026’da yaygın olan bir eliptik eğri imza algoritmasıyla atıldı. Bu algoritmanın güvenliği, belirli bir matematik probleminin klasik bilgisayarlarla çözülemeyecek kadar zor olmasına dayanıyor. 2041’e gelindiğinde bu varsayım hâlâ geçerli mi? Eğer o yıllarda yeterince güçlü bir kuantum bilgisayar yapılmışsa, biri Bakü’deki üniversitenin açık anahtarından gizli anahtarını hesaplayabilir ve istediği kişi adına, 2026 tarihli, imzası "geçerli" görünen diplomalar üretebilir. O zaman şirket, Aynur’un diplomasının gerçekten 2026’da üniversite tarafından imzalandığını, 2040’ta bir sahtekâr tarafından üretilmediğini nasıl anlayacak?

Bu yazının konusu bu soru. Daha genel hâliyle: #{strong[Kimlik sistemlerimizin dayandığı dijital imzalar kuantum bilgisayarlar karşısında ne kadar dayanıklı ve dayanıklı değilse ne yapmamız gerekiyor?]} Soru ilk bakışta uzak bir geleceğe ait görünüyor. Ama kimlik belgeleri uzun yaşar. Bir pasaport on yıl geçerlidir; bir diploma, bir doğum belgesi, bir tapu kaydı bir ömür boyu. Bu belgelerin dayandığı güven altyapısını, yani devletlerin kök anahtarlarını, güven listelerini ve yazılımları değiştirmek de yıllar sürer. Bu yüzden geçiş, tehdidin kendisinden çok önce başlamak zorunda.

Yazının planı şöyle: Bölüm 2, bir kimlik ekosisteminde imzaların nerelerde kullanıldığını ve ne kadar yaşadığını haritalıyor. Bölüm 3 kuantum tehdidini ve Shor algoritmasının sezgisini anlatıyor. Bölüm 4 "şimdi topla, sonra çöz" riskini ve bu riskin şifreleme ile imza için farkını tartışıyor. Bölüm 5 NIST’in kuantum sonrası standartlarını ve bu algoritmaların arkasındaki fikirleri açıklıyor. Bölüm 6 bu algoritmaların kimlik belgelerine etkisini, Bölüm 7 karma imzaları ve geçişi, Bölüm 8 Avrupa Birliği’nin, ETSI’nin ve NIST’in takvimlerini ele alıyor. Bölüm 9 algoritmaları karşılaştırıyor, Bölüm 10 açık soruları tartışıyor. Ek A’da sözlük var.

= Bir Kimlik Ekosisteminde İmzalar Nerede?

== Her yerde bir imza

Dizinin önceki yazılarına geri dönüp bakarsak, neredeyse her adımda bir imzayla karşılaştığımızı görürüz. Bu imzaları tek tek saymak, kuantum tehdidinin kimlik dünyasında neye dokunduğunu görmenin en kısa yoludur.

#{strong[Belgenin imzası.]} Veren kurum, belgeyi (bir PID’i, bir diplomayı, bir ehliyeti) kendi gizli anahtarıyla imzalar. Doğrulayan bu imzayla belgenin değiştirilmediğini ve gerçekten o kurumdan geldiğini anlar (dizinin ikinci yazısı).

#{strong[Sahip bağlama imzası.]} Kişi belgeyi gösterirken, cüzdanındaki ve belgeye bağlı olan bir anahtarla o işleme özel bir imza atar. Bu imza, belgenin çalınıp başkası tarafından gösterilmediğini kanıtlar (ikinci ve onuncu yazılar).

#{strong[Sertifika zinciri.]} Veren kurumun açık anahtarı, genellikle daha üst bir otoritenin imzaladığı bir sertifikanın içinde gelir. Pasaportlarda bu, belge imzalayıcı sertifikasını imzalayan ülke kök otoritesidir (on dördüncü yazı).

#{strong[Güven listesi.]} Hangi kurumun hangi rolde yetkili olduğunu söyleyen listenin kendisi de bir imza taşır; listeyi yayımlayan otoritenin imzası (altıncı yazı).

#{strong[İptal listesi.]} Belgelerin iptal durumunu taşıyan durum listeleri de veren tarafından imzalanır (yedinci yazı).

#{strong[Cüzdan ve cihaz beyanları.]} Cüzdan sağlayıcısı, cüzdanın güvenilir olduğunu ve anahtarların güvenli donanımda tutulduğunu imzalı bir beyanla kanıtlar (onuncu yazı).

#{strong[Taşıma katmanı.]} Bütün bu mesajlar internette TLS ile şifrelenmiş bağlantılardan geçer. TLS de hem bir anahtar anlaşması (çoğunlukla eliptik eğri Diffie-Hellman) hem de sunucunun sertifikası için imzalar kullanır.

Bu imzaların hepsi bugün büyük ölçüde iki algoritma ailesine dayanır: #{strong[RSA]} ve #{strong[eliptik eğri kriptografisi]} (ECC). Avrupa Dijital Kimlik Cüzdanı’nın teknik profillerinde ve onlara uyumlu sistemlerde en sık karşılaşılan imza, JOSE dünyasında #{raw("ES256")} adıyla bilinen, P-256 eğrisi üzerinde SHA-256 ile çalışan ECDSA’dır.

== İmzaların ömrü

Kuantum tehdidini değerlendirirken en önemli soru şudur: #{strong[Bu imzaya ne kadar süre güvenmemiz gerekiyor?]} Bir imzanın güvenilir kalması gereken süre, imzanın türüne göre saniyelerden onlarca yıla kadar değişir (Şekil 1).

#sekil(1, [Bir kimlik ekosistemindeki imzaların ve anahtarların güvenilir kalması gereken süre (yaklaşık, logaritmik ölçek)], "figures/a15/sekil-1.svg", yarim: false)

Bu şekil, yazının geri kalanının iskeletini veriyor. Bir sahip bağlama imzası yalnızca birkaç saniye için anlamlıdır; doğrulayan onu kontrol eder, işlem biter. Bugün atılan böyle bir imzayı on yıl sonra kırmanın kimseye bir faydası yoktur. Bir pasaportun imzası ise on yıl boyunca sınır kapılarında kontrol edilir. Bir diplomanın imzası, sahibi emekli olana kadar işe yarar. Ve bütün bu belgelerin dayandığı kök anahtarlar, yani güven zincirinin en tepesindeki imzalar, belgelerin hepsinden uzun yaşamak zorundadır.

#tablo([#{strong[Tablo 1.]} Kimlik ekosistemindeki başlıca imzalar ve kuantum açısından önemleri.], (23fr, 15fr, 14fr, 19fr), ([İmza], [Kim imzalar], [Ne kadar güvenilir kalmalı], [Kuantum açısından öncelik],), (
  ([Sahip bağlama (KB-JWT, mdoc cihaz imzası)], [kişinin cüzdanı], [saniyeler], [düşük: imza o an doğrulanır ve biter],),
  ([TLS kimlik doğrulaması], [sunucu], [oturum süresi], [düşük (imza) \/ yüksek (anahtar anlaşması, Bölüm 4)],),
  ([Durum listesi], [veren], [saatler – günler], [düşük – orta],),
  ([PID ve kısa ömürlü belgeler], [veren], [aylar – birkaç yıl], [orta],),
  ([Pasaport, kimlik kartı], [devletin belge imzalayıcısı], [on yıl], [yüksek],),
  ([Kök otorite, güven listesi], [devlet ya da güven otoritesi], [on – on beş yıl], [yüksek],),
  ([Diploma, doğum belgesi, tapu], [veren kurum], [ömür boyu], [çok yüksek],),
))

= Kuantum Tehdidi

== Kuantum bilgisayar nedir, ne değildir?

Kuantum bilgisayarlar hakkındaki yaygın bir yanlış anlama, onların "her şeyi aynı anda deneyen", dolayısıyla her problemi anında çözen süper hızlı bilgisayarlar olduğudur. Gerçek bundan hem daha sınırlı hem de daha ilginçtir.

Klasik bir bilgisayar bilgiyi #{strong[bit]} adı verilen birimlerde tutar; her bit ya 0 ya 1’dir. Bir kuantum bilgisayar ise #{strong[kübit]} (#{emph[qubit]}) kullanır. Bir kübit, ölçülene kadar 0 ile 1’in belirli oranlarda birleşimi olan bir durumda bulunabilir; buna #{strong[süperpozisyon]} denir. Birden fazla kübit birbirine #{strong[dolanık]} (#{emph[entangled]}) hâle getirildiğinde, n kübitlik bir sistemin durumu 2ⁿ olasılığın her biri için bir genlik taşır. Ama bu, bilgisayarın 2ⁿ sonucu birden okuyabileceği anlamına gelmez: Sistem ölçüldüğünde yalnızca tek bir sonuç elde edilir ve hangi sonucun çıkacağı genliklere bağlı bir olasılıkla belirlenir.

Bir kuantum algoritmasının bütün ustalığı, hesaplamayı öyle düzenlemektir ki yanlış cevapların genlikleri birbirini #{strong[sönümlesin]}, doğru cevabın genliği ise #{strong[güçlensin]}. Buna #{strong[girişim]} (#{emph[interference]}) denir; dalgaların birbirini yok etmesi ya da güçlendirmesi gibi. Bu ancak belirli bir matematiksel yapısı olan problemlerde işe yarar. Kuantum bilgisayar her problemi hızlandırmaz; ama tam da kriptografinin dayandığı bazı problemleri #{strong[çok]} hızlandırır.

Bir zorluk daha var: Kübitler son derece kırılgandır. Çevreden gelen en küçük etkileşim, durumlarını bozar. Bu yüzden büyük hesaplamalar yapabilmek için, çok sayıda #{strong[fiziksel kübitin]} bir araya getirilip hatalarını sürekli düzelten tek bir #{strong[mantıksal kübit]} oluşturması gerekir. Kriptografiyi tehdit edecek bir kuantum bilgisayardan söz ederken kastedilen, bu hata düzeltmesini büyük ölçekte başarmış bir makinedir. Alan yazında buna #{strong[kriptografik olarak anlamlı kuantum bilgisayar]} (#{emph[cryptographically relevant quantum computer]}, CRQC) denir. Bugün böyle bir makine yok.

== Shor algoritması

1994’te bir matematikçi, kuantum bilgisayarların iki problemi klasik bilgisayarlardan üstel olarak daha hızlı çözebileceğini gösterdi \[1\]: büyük bir sayıyı #{strong[çarpanlarına ayırmak]} ve #{strong[ayrık logaritma]} almak. Bu algoritma, bulucusunun adıyla #{strong[Shor algoritması]} olarak bilinir. RSA’nın güvenliği birinci probleme, Diffie-Hellman ve eliptik eğri kriptografisinin güvenliği ikinci probleme dayandığı için, Shor algoritması bugünkü açık anahtarlı kriptografinin neredeyse tamamını tehdit eder.

Algoritmanın arkasındaki fikir, çarpanlara ayırma problemini bir #{strong[periyot bulma]} problemine dönüştürmektir. Periyot bulma, yani tekrarlanan bir örüntünün ne kadar sürede bir tekrarlandığını bulmak, kuantum bilgisayarın girişim yoluyla çok iyi yaptığı bir iştir.

#kutu("teknik", [Shor algoritmasının sezgisi: 15’i çarpanlarına ayırmak])[
$N = 15$ sayısını çarpanlarına ayırmak istediğimizi düşünelim (elbette $3 dot 5$ olduğunu biliyoruz; amaç yöntemi görmek). Algoritma dört adımdan oluşur; tablonun ilk sütunu, adımın klasik mi kuantum bilgisayarda mı yapıldığını gösterir:

#adimlar((
  ("Klasik", [#{strong[Taban seçimi.]} $N$ ile ortak böleni olmayan bir sayı seçilir.], $a = 7, quad "ebob"(7, 15) = 1$),
  ("Klasik", [#{strong[Kuvvetler.]} $a$’nın kuvvetlerinin $N$’ye bölümünden kalanlara bakılır (aşağıda).], $f(x) = 7^x mod 15$),
  ("Kuantum", [#{strong[Periyot.]} Kalanların kaç adımda bir tekrarlandığı bulunur (Şekil 2).], $r = 4$),
  ("Klasik", [#{strong[Çarpanlar.]} Periyodun yarısı kadar kuvvetin bir eksiği ve bir fazlasıyla ortak bölenler alınır.], $"ebob"(7^(r slash 2) plus.minus 1, N)$),
))

İkinci adımdaki kalanlar şöyledir. Her satırda bir önceki kalanı 7 ile çarpıp yeniden 15’e bölmek yeter:

#formul[$ 7^1 &equiv 7 && quad (mod 15) \
7^2 &equiv 49 equiv 4 && quad (mod 15) \
7^3 &equiv 4 dot 7 = 28 equiv 13 && quad (mod 15) \
7^4 &equiv 13 dot 7 = 91 equiv 1 && quad (mod 15) \
7^5 &equiv 1 dot 7 = 7 && quad (mod 15) $]

Dizi 7, 4, 13, 1, 7, 4, 13, 1, … diye tekrar eder; tekrarın uzunluğu, yani #{strong[periyot]}, $r = 4$’tür. Periyot çift olduğu için dördüncü adımın hesabı yapılabilir:

#formul[$ 7^(r slash 2) &= 7^2 = 49 \
"ebob"(49 - 1, 15) &= "ebob"(48, 15) = 3 \
"ebob"(49 + 1, 15) &= "ebob"(50, 15) = 5 $]

Çarpanlar bulunmuştur: $15 = 3 dot 5$. Küçük sayılarda periyodu deneyerek bulmak kolaydır. Ama RSA’da kullanılan 2048 bitlik, yani yaklaşık 617 basamaklı bir $N$ için periyot, bilinen hiçbir klasik yöntemle makul bir sürede bulunamaz. Shor algoritmasının kuantum kısmı #{strong[yalnızca 3. adımı]} yapar: Bütün kuvvetleri süperpozisyonda hesaplar ve #{strong[kuantum Fourier dönüşümü]} adı verilen bir işlemle, periyodun katlarına karşılık gelmeyen sonuçların genliklerini sönümler. Ölçüm yapıldığında periyot hakkında bilgi veren bir sonuç yüksek olasılıkla çıkar. Geri kalan adımlar klasik bilgisayarda yapılır.

Eliptik eğri kriptografisindeki ayrık logaritma problemi de benzer biçimde bir periyot bulma problemine dönüştürülebilir. Bu yüzden Shor algoritması ECDSA’yı da, RSA’yı da aynı şekilde tehdit eder.
]

Eliptik eğri kriptografisinin neden bu kadar yaygınlaştığını ve neden aynı tehdit altında olduğunu anlamak için, ayrık logaritma probleminin ne olduğuna kısaca bakmak yararlı.

#kutu("teknik", [Ayrık logaritma: Kolay ileri, zor geri])[
Bir eliptik eğri, belirli bir denklemi sağlayan noktalardan oluşur ve bu noktalar üzerinde bir "toplama" işlemi tanımlanır. Bir başlangıç noktası $G$ seçilir. Gizli anahtar, rastgele seçilmiş büyük bir tam sayı $d$’dir; açık anahtar ise $G$’nin kendisiyle $d$ kez toplanmasıyla elde edilen noktadır:

#formul[$ Q = d dot G = underbrace(G + G + dots + G, d "kez") $]

İki yönün maliyetini karşılaştıralım. $d$ bilindiğinde $Q$’yu hesaplamak kolaydır: "İkiye katla ve ekle" yöntemi $d$’nin her biti için bir katlama ve bitlerin yaklaşık yarısı için bir toplama yapar. Geri yönde, $Q$ ve $G$ bilindiğinde $d$’yi bulmak, yani #{strong[ayrık logaritma]} almak, bilinen en iyi klasik yöntemlerle olası anahtar sayısının karekökü kadar işlem ister. P-256 eğrisi için:

#formul[$ "ileri yön:" quad & 256 + 128 = 384 "nokta işlemi" \
"geri yön:" quad & sqrt(2^256) = 2^128 "işlem" $]

$2^128$, bugünkü bilgisayarlarla ulaşılması düşünülemeyecek kadar büyük bir sayıdır. ECDSA’nın güvenliği bu asimetriye dayanır: İleri yön kolay, geri yön pratikte imkânsız.

Shor algoritması bu asimetriyi ortadan kaldırır. $d dot G$ işlemi, d’nin değerine göre periyodik davranan bir fonksiyon olarak yazılabilir ve kuantum Fourier dönüşümü bu periyodu, dolayısıyla d’yi ortaya çıkarır. Eliptik eğri anahtarları RSA anahtarlarından çok daha kısa olduğu için (256 bite karşı 2048 bit), onları kırmak için gereken kuantum kaynakları da daha azdır. Bu, bir paradoks gibi görünse de, eliptik eğri kriptografisinin kuantum bilgisayarlar karşısında RSA’dan #{strong[daha erken]} düşebileceği anlamına gelir \[5\].
]

#sekil(2, [Shor algoritmasının yakaladığı örüntü: 7^x mod 15 dizisinin periyodu], "figures/a15/sekil-2.svg", yarim: false)

== Grover algoritması ve simetrik kriptografi

Kuantum tehdidinin ikinci bileşeni, 1996’da önerilen #{strong[Grover algoritmasıdır]} \[2\]. Grover, yapısı olmayan bir arama problemini, yani $N$ olasılık arasından doğru olanı bulmayı, klasik yöntemin yaklaşık $N$ adımı yerine yaklaşık $sqrt(N)$ adımda çözer. Bu ikinci dereceden (karekök) bir hızlanmadır; Shor’un üstel hızlanmasıyla karşılaştırıldığında mütevazıdır.

Grover’ın etkisi #{strong[simetrik]} kriptografiye (AES gibi şifreleme algoritmalarına) ve #{strong[özet fonksiyonlarına]} (SHA-256 gibi) yöneliktir. 128 bitlik bir anahtarı deneme yanılmayla bulmak klasik olarak yaklaşık $2^128$ adım gerektirirken, Grover ile kabaca $sqrt(2^128) = 2^64$ adıma iner. Ama bu hesap, Grover adımlarının paralel çalıştırılmasının zorluğu ve hata düzeltmenin maliyeti hesaba katılınca çok daha pahalı hâle gelir. Uygulamadaki genel kanı şudur: AES-256 gibi uzun anahtarlı simetrik algoritmalar ve SHA-256, SHA-384 gibi özet fonksiyonları kuantum çağında da güvenli kalır. Nitekim NIST’in kuantum sonrası güvenlik kategorileri bile, referans olarak AES ve SHA ailesinin güvenliğini kullanır \[10\].

#kutu("teknik", [Güvenlik düzeyi: "128 bit" ne demek?])[
Kriptografide bir algoritmanın gücü çoğu zaman #{strong[bit]} cinsinden söylenir. "$k$ bit güvenlik", algoritmayı kırmanın bilinen en iyi yolunun yaklaşık $2^k$ işlem gerektirdiği anlamına gelir. Her ek bit işi iki katına çıkarır; 128 bit, 64 bitten iki kat değil, $2^64$ kat daha zordur. Bu ölçüyle bugünkü algoritmaların klasik ve kuantum saldırılar karşısındaki durumu şöyledir:

#tablo([], (11fr, 23fr, 22fr), ([Algoritma], [Klasik saldırının maliyeti], [Kuantum saldırısının maliyeti],), (
  ([AES-128], [$2^128$ (bütün anahtarları denemek)], [yaklaşık $2^64$ (Grover)],),
  ([AES-256], [$2^256$], [yaklaşık $2^128$ (Grover)],),
  ([ECDSA P-256], [$sqrt(2^256) = 2^128$ (ayrık logaritma)], [polinom süre (Shor)],),
  ([RSA-2048], [yaklaşık $2^112$ (çarpanlara ayırma)], [polinom süre (Shor)],),
))

Grover güvenlik düzeyini yarıya indirir; bu yüzden anahtar uzunluğunu iki katına çıkarmak yeter. Shor ise saldırıyı polinom süreye, yani anahtar uzunluğu arttıkça yalnızca ölçülü biçimde büyüyen bir maliyete indirir; anahtarı uzatmak burada çare değildir.

NIST kuantum sonrası algoritmaların gücünü bit yerine beş #{strong[güvenlik kategorisiyle]} anlatır. Her kategori, iyi bilinen bir simetrik algoritmayı kırmanın zorluğuna eşitlenmiştir: Kategori 1 AES-128’in anahtarını, kategori 3 AES-192’nin anahtarını, kategori 5 AES-256’nın anahtarını bulmak kadar zordur; 2 ve 4 ise SHA-256 ve SHA-384’te çakışma bulmaya karşılık gelir. Bölüm 5’te göreceğimiz ML-DSA-44, ML-DSA-65 ve ML-DSA-87 sırasıyla 2, 3 ve 5. kategoridedir \[8, 10\].
]

Bu ayrımın kimlik dünyası için önemli bir sonucu var ve Bölüm 6’da ona döneceğiz: Seçici açıklamanın kendisi, yani SD-JWT’de alanların tuzlanmış özetlerle gizlenmesi, özet fonksiyonlarına dayanır ve kuantum çağında da ayakta kalır. Değişmesi gereken, bu özetleri bir arada tutan #{strong[imzadır]}.

#tablo([#{strong[Tablo 2.]} Kuantum bilgisayarın başlıca kriptografik araçlara etkisi.], (16fr, 20fr, 23fr, 14fr, 20fr), ([Araç], [Örnek], [Dayandığı problem], [Kuantum saldırısı], [Sonuç],), (
  ([Açık anahtarlı imza], [RSA, ECDSA, EdDSA], [çarpanlara ayırma, ayrık logaritma], [Shor (üstel hızlanma)], [kırılır; değiştirilmeli],),
  ([Anahtar anlaşması], [ECDH, Diffie-Hellman, RSA şifreleme], [ayrık logaritma, çarpanlara ayırma], [Shor], [kırılır; değiştirilmeli],),
  ([Eşleme tabanlı imzalar], [BBS (bağlanamazlık için)], [eliptik eğri eşlemeleri], [Shor], [kırılır],),
  ([Simetrik şifreleme], [AES-128, AES-256], [anahtar arama], [Grover (karekök)], [AES-256 güvenli kalır],),
  ([Özet fonksiyonu], [SHA-256, SHA-384, SHA3], [ön görüntü, çakışma], [Grover ve türevleri], [güvenli kalır; uzun çıktı tercih edilir],),
))

== Ne zaman?

Bu sorunun dürüst cevabı: kimse bilmiyor. Ama tahminlerin nasıl değiştiğine bakmak öğretici. Shor algoritmasını gerçek bir RSA anahtarına uygulamak için kaç kübit ve ne kadar zaman gerektiği, yıllar içinde defalarca yeniden hesaplandı. 2019’da yayımlanan bir çalışma, 2048 bitlik bir RSA anahtarının, hataları belirli bir düzeyde olan 20 milyon fiziksel kübitle yaklaşık sekiz saatte çarpanlarına ayrılabileceğini tahmin etti \[3\]. Mayıs 2025’te aynı yazarlardan birinin yayımladığı yeni bir çalışma, algoritmik iyileştirmelerle bu sayıyı #{strong[bir milyondan az]} fiziksel kübite indirdi; bu durumda işlemin bir haftadan kısa sürebileceğini gösterdi \[4\]. Eliptik eğriler için yapılan tahminler de P-256 eğrisindeki ayrık logaritmanın, RSA-2048’den daha az mantıksal kübitle (birkaç bin mertebesinde) çözülebileceğini gösteriyor \[5\].

Bu rakamları bugünkü kuantum bilgisayarlarla karşılaştırmak yanıltıcı olabilir; bugünkü makineler hem kübit sayısında hem hata oranında bu hedeflerin çok uzağında. Ama eğilim açık: Gereken kaynak tahminleri yıllar içinde düşüyor, donanım ise gelişiyor. Bu iki eğrinin ne zaman kesişeceğini öngörmek mümkün değil. Bu yüzden ciddi kurumlar, belirli bir tarihe bahis oynamak yerine, geçiş için gereken süreyi esas alıyor.

== Raf ömrü eşitsizliği

Bu düşünceyi en sade biçimde ifade eden çerçeve, 2018’de yayımlanan bir makalede önerilen ve alan yazında çoğu zaman yazarının adıyla anılan basit bir eşitsizliktir \[6\]. Biz ona raf ömrü eşitsizliği diyeceğiz. Üç süre tanımlanır:

- $x$: Verinin ya da imzanın güvenli kalması gereken süre (raf ömrü).
- $y$: Sistemleri kuantum sonrası kriptografiye geçirmek için gereken süre.
- $z$: Kriptografik olarak anlamlı bir kuantum bilgisayarın ortaya çıkmasına kalan süre.

Eğer şu eşitsizlik sağlanıyorsa, sorun zaten başlamış demektir:

#formul[$ x + y > z $]

Bu durumda geçişi bitirdiğimizde, korunması gereken veri ya da imza hâlâ korunmaya muhtaç olacak, ama artık korunamayacaktır (Şekil 3).

#sekil(3, [Raf ömrü eşitsizliği: x + y \> z ise geç kalınmıştır], "figures/a15/sekil-3.svg", yarim: false)

Kimlik dünyasına uygulandığında eşitsizlik çarpıcı sonuçlar verir. Bir sahip bağlama imzası için $x$ neredeyse sıfırdır; bu imzalar geçişin en sonunda değiştirilebilir. Ama Aynur’un diploması için $x$ kırk yıl olabilir. Bir devletin kök anahtarını ve bütün belge verme altyapısını değiştirmek için $y$ birkaç yıl, hatta on yıl sürebilir. Diploma için toplam şöyle olur:

#formul[$ x + y approx 40 "yıl" + 10 "yıl" = 50 "yıl" $]

$z$ ne olursa olsun, elli yıl çoğu tahminin çok üstündedir.

= Şimdi Topla, Sonra Çöz: Şifreleme ve İmza Farkı

== Bugün kaydedilen trafik

Kuantum tehdidinin en sık anılan biçimi "şimdi topla, sonra çöz" (#{emph[harvest now, decrypt later]}) adını taşır. Fikir basittir: Bir saldırgan, bugün şifreli olarak gönderilen verileri kaydeder ve saklar. Bugün bu verileri çözemez. Ama on ya da yirmi yıl sonra güçlü bir kuantum bilgisayara eriştiğinde, kaydettiği trafiğin şifresini kırar ve içeriği okur.

Bu saldırının hedefi #{strong[gizliliktir]} ve kimlik dünyasında doğrudan bir karşılığı vardır. Aynur’un cüzdanı, bir doğrulayana PID’ini gösterdiğinde, adı, doğum tarihi, uyruğu gibi kişisel veriler TLS ile şifrelenmiş bir bağlantıdan geçer. TLS’in bu bağlantı için kullandığı oturum anahtarı, eliptik eğri Diffie-Hellman ile belirlenir. Bağlantıyı bugün kaydeden biri, ileride Diffie-Hellman anlaşmasını Shor algoritmasıyla çözebilirse, oturum anahtarını ve dolayısıyla Aynur’un paylaştığı bütün verileri elde eder. Kişisel verinin gizliliği için x, kişinin ömrü kadar uzundur.

Bu yüzden kuantum sonrası geçişin #{strong[ilk ve en acil]} adımı imzalardan önce gelir: #{strong[anahtar anlaşması]}. Ve bu adım, kimlik sistemlerinin farkında bile olmadan, büyük ölçüde atılmış durumda: Yaygın tarayıcıların bir kısmı, 2024’ün sonundan itibaren TLS bağlantılarında varsayılan olarak, klasik X25519 anlaşmasını NIST’in kuantum sonrası anahtar kapsülleme standardı ML-KEM ile birleştiren #{strong[karma]} bir anahtar anlaşması önermeye başladı. Sunucu tarafı da desteklediğinde, bugün kaydedilen trafik ileride çözülemez.

#kutu("ornek", [Aynur’un 2026’daki başvurusu])[
Aynur 2026’da İstanbul’daki üniversiteye başvururken cüzdanından PID’ini ve diplomasını paylaştı. Paylaşım, üniversitenin sunucusuna TLS ile şifrelenmiş bir bağlantı üzerinden gitti. Bu bağlantıyı yol üzerinde kaydeden biri, içinde Aynur’un adının, doğum tarihinin, uyruğunun ve not ortalamasının bulunduğu şifreli bir kayda sahip olur. 2026’da bu kayıt anlamsız bir bayt yığınıdır. Bağlantı yalnızca klasik eliptik eğri anlaşmasıyla kurulduysa ve 2040’larda güçlü bir kuantum bilgisayar yapılırsa, aynı kayıt okunabilir hâle gelir. Bağlantı karma bir anlaşmayla kurulduysa, kayıt 2040’larda da bir bayt yığını olarak kalır. Aynur’un bu farkı hiçbir zaman görmesi gerekmez; fark, iki sunucunun hangi algoritmaları desteklediğindedir.
]

== İmzalar için durum farklı

İmzalar için "şimdi topla, sonra çöz" mantığı aynen işlemez. Bir imza bir sır saklamaz; bir şeyi #{strong[kanıtlar]}. Bugün atılmış bir imzayı kaydedip on yıl sonra "kırmak", geçmişteki bir işlemi geri almaz. Doğrulayan imzayı zamanında kontrol etmiş, kararını vermiştir.

İmzalar için risk iki farklı biçimde ortaya çıkar. Birincisine #{strong[sonra taklit et]} diyebiliriz: Kuantum bilgisayar ortaya çıktığı anda, açık anahtarı bilinen her imza anahtarının gizli eşi hesaplanabilir hâle gelir. O andan itibaren saldırgan, o anahtarla #{strong[yeni]} imzalar üretebilir. Eğer bir devletin kök anahtarı hâlâ kullanımdaysa, saldırgan geçerli görünen yeni pasaportlar, PID’ler, güven listeleri imzalayabilir. Bu yüzden kuantum bilgisayar ortaya çıkmadan #{strong[önce]}, eski anahtarların güven listelerinden çıkarılmış ve yenileriyle değiştirilmiş olması gerekir.

İkincisi #{strong[geçmişe dönük güven kaybıdır]}: Aynur’un 2041’deki diploma sahnesindeki durum. Diploma gerçekten 2026’da imzalanmış olsa bile, artık aynı anahtarla herkes imza üretebildiği için, doğrulayan #{strong[hangi]} imzanın gerçek olduğunu yalnızca imzaya bakarak ayırt edemez. Yani kuantum bilgisayar, eski imzaları geçmişe dönük olarak "kırmaz" ama #{strong[değersizleştirir]}. Uzun ömürlü belgelerin sahiplerinin bu andan önce, belgelerini kuantum sonrası bir imzayla #{strong[yeniden]} almış olması ya da belgenin ne zaman imzalandığını kanıtlayan, kendisi kuantuma dayanıklı bir zaman damgasıyla korunmuş olması gerekir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
"Şimdi topla, sonra çöz" bir #{strong[gizlilik]} tehdididir ve kimlik dünyasında en acil cevabı, verinin taşındığı bağlantıların anahtar anlaşmasını kuantum sonrası (ya da karma) yöntemlere geçirmektir. İmzalar için tehdit farklıdır: Kuantum bilgisayar ortaya çıktığında eski anahtarlarla yeni sahte imzalar atılabilir ve eski imzalar ayırt edilemez hâle gelir. Bu yüzden uzun ömürlü belgeler ve kök anahtarlar, tehdit gerçekleşmeden önce değiştirilmiş olmalıdır.
]

= NIST’in Kuantum Sonrası Standartları

== Sekiz yıllık bir yarışma

#{strong[Kuantum sonrası kriptografi]} (#{emph[post-quantum cryptography]}, PQC), kuantum bilgisayarlarla bile verimli biçimde çözülemeyeceği düşünülen matematik problemlerine dayanan ve #{strong[bugünkü sıradan bilgisayarlarda]} çalışan algoritmaların genel adıdır. Bu ayrım önemli: Kuantum sonrası kriptografi için kuantum bilgisayara gerek yoktur. Telefonlarda, sunucularda, akıllı kartlarda bugün çalışan yazılım ve donanımla uygulanabilir.

NIST, 2016’nın sonunda dünyaya açık bir çağrı yaparak kuantum sonrası anahtar kapsülleme ve imza algoritmaları için bir standartlaştırma süreci başlattı. Süreç, AES’in seçildiği yarışmaya benzer biçimde, birkaç tur boyunca algoritmaların dünya çapındaki kriptograflar tarafından açıkça incelenmesine ve saldırıya uğramasına dayanıyordu.

#kutu("tarihce", [Kuantum sonrası standartlara giden yol])[
#{strong[1994 — Shor algoritması.]} Kuantum bilgisayarların çarpanlara ayırma ve ayrık logaritma problemlerini verimli çözebileceği gösterildi \[1\].

#{strong[1996 — Grover algoritması.]} Yapısız arama için karekök hızlanma \[2\].

#{strong[2016 — NIST çağrısı.]} Kuantum sonrası açık anahtarlı algoritmalar için açık standartlaştırma süreci başladı.

#{strong[2022 — İlk seçimler ve iki büyük kırılma.]} NIST Temmuz 2022’de standartlaştırılacak ilk algoritmaları açıkladı: anahtar kapsülleme için CRYSTALS-Kyber, imza için CRYSTALS-Dilithium, FALCON ve SPHINCS+. Aynı yıl, sürecin ileri turlarına kalmış iki aday, Rainbow imza şeması ve SIKE anahtar kapsülleme şeması, klasik bilgisayarlarla yapılan saldırılarla kırıldı. Kırılmalar, yeni algoritmalara temkinli yaklaşmak için güçlü bir gerekçe oldu (Bölüm 7).

#{strong[13 Ağustos 2024 — İlk üç standart.]} FIPS 203 (ML-KEM, Kyber’den), FIPS 204 (ML-DSA, Dilithium’dan) ve FIPS 205 (SLH-DSA, SPHINCS+’tan) yayımlandı \[7, 8, 9\].

#{strong[11 Mart 2025 — HQC.]} Farklı bir matematik temele dayanan HQC, ML-KEM’e alternatif ikinci bir anahtar kapsülleme algoritması olarak seçildi; standardı hazırlanıyor.

#{strong[Mayıs 2026 — Ek imzalar.]} Farklı matematik temellere dayanan ek imza algoritmalarını değerlendiren ayrı bir süreçte dokuz aday üçüncü tura kaldı.

#{strong[Ekim 2026 — Geçiş takvimi.]} NIST, kuantuma açık algoritmaların kullanımdan kaldırılma takvimini kesinleştiren NIST IR 8547’nin son sürümünü yayımladı \[10\].
]

== Üç standart, üç iş

#{strong[FIPS 203, ML-KEM]} (#{emph[Module-Lattice-Based Key-Encapsulation Mechanism]}). İki tarafın açık bir kanal üzerinden ortak bir gizli anahtar oluşturmasını sağlar. Bölüm 4.1’deki "şimdi topla, sonra çöz" tehdidine karşı ana araçtır; TLS’teki eliptik eğri Diffie-Hellman’ın yerini alır ya da onunla birlikte kullanılır \[7\].

#{strong[FIPS 204, ML-DSA]} (#{emph[Module-Lattice-Based Digital Signature Algorithm]}). Genel amaçlı dijital imza standardıdır. Kimlik belgeleri, sertifikalar, güven listeleri için ECDSA’nın ana adayıdır. Üç parametre setiyle gelir: ML-DSA-44, ML-DSA-65 ve ML-DSA-87; sayı büyüdükçe güvenlik düzeyi ve boyutlar artar \[8\].

#{strong[FIPS 205, SLH-DSA]} (#{emph[Stateless Hash-Based Digital Signature Algorithm]}). Güvenliği yalnızca özet fonksiyonlarına dayanan bir imza standardıdır. ML-DSA’dan çok daha büyük imzalar üretir ve daha yavaştır; ama dayandığı varsayım, kriptografinin en iyi anlaşılmış ve en uzun süredir incelenen yapı taşıdır. Bu yüzden bir yedek, ve özellikle uzun ömürlü ve seyrek atılan imzalar (kök sertifikalar, yazılım güncellemeleri, zaman damgaları) için güçlü bir aday olarak görülür \[9\].

Bunlara iki ek daha var. NIST’in 2020’de yayımladığı SP 800-208, #{strong[durum tutan]} (#{emph[stateful]}) özet tabanlı iki imza şemasını, LMS ve XMSS’i onaylar \[11\]. Ve FALCON’dan türetilen, daha küçük imzalar üreten #{strong[FN-DSA]} için ayrı bir standart (FIPS 206) hazırlanıyor; Ekim 2026 itibarıyla henüz yayımlanmış değil \[10\].

== Kafes problemleri: ML-DSA ve ML-KEM neye dayanır?

ML-KEM ve ML-DSA’nın adlarındaki "ML", #{strong[modül kafes]} (#{emph[module lattice]}) anlamına gelir. Bu algoritmaların güvenliği, kafeslerle ilgili bir problem ailesine, özellikle #{strong[hatalı öğrenme]} (#{emph[learning with errors]}, LWE) adı verilen problemin bir türüne dayanır.

#kutu("teknik", [Hatalı öğrenme problemi: Gürültülü denklemler])[
Lise matematiğinden bildiğimiz doğrusal denklem sistemleriyle başlayalım. Gizli bir vektör $bold(s) = (s_1, s_2)$ olsun ve tüm hesaplar 17’ye göre (mod 17) yapılsın. Elimizde şu denklemler olsun (değerler örnektir; gizli vektör $bold(s) = (3, 5)$):

#formul[$ 2 s_1 + 7 s_2 &equiv 7 && quad (mod 17) \
4 s_1 + 1 s_2 &equiv 0 && quad (mod 17) \
9 s_1 + 3 s_2 &equiv 8 && quad (mod 17) $]

Denklemlerin doğru olduğunu görmek için $bold(s) = (3, 5)$’i yerine koymak yeter: $2 dot 3 + 7 dot 5 = 41 equiv 7$, $4 dot 3 + 5 = 17 equiv 0$, $9 dot 3 + 3 dot 5 = 42 equiv 8$. Bu sistemi Gauss eleme yöntemiyle kolayca çözer ve $bold(s) = (3, 5)$ buluruz. Şimdi her denklemin sağ tarafına küçük, rastgele bir #{strong[hata]} $e_i in {-1, 0, +1}$ ekleyelim:

#formul[$ 2 s_1 + 7 s_2 + e_1 &equiv 8 && quad (e_1 = +1) \
4 s_1 + 1 s_2 + e_2 &equiv 16 && quad (e_2 = -1) \
9 s_1 + 3 s_2 + e_3 &equiv 8 && quad (e_3 = 0) $]

Elimizde artık yalnızca sağ taraflar (8, 16, 8) var; hatalar gizli. Genel biçimiyle problem, katsayı matrisi $A$ ve sonuç vektörü $bold(b)$ verildiğinde gizli $bold(s)$’yi bulmaktır:

#formul[$ bold(b) equiv A bold(s) + bold(e) quad (mod q) $]

İki bilinmeyenli bu küçük örnekte, bütün olasılıkları deneyerek gizli vektörü yine bulabiliriz. Ama gerçek sistemlerde gizli vektör yüzlerce boyutludur, modül binlerdir ve denklem sayısı yüzlercedir. Hatalar eklenmeden önce çocuk oyuncağı olan problem, hatalar eklendiğinde bilinen hiçbir klasik ya da kuantum algoritmayla verimli çözülemeyen bir probleme dönüşür. Gauss eleme, her adımda hataları büyüterek işe yaramaz hâle gelir.

ML-KEM ve ML-DSA bu fikrin verimli bir türünü kullanır: Vektörlerin elemanları sayılar yerine polinomlardır ve hesaplar polinom halkaları üzerinde yapılır. "Modül" kelimesi bu yapıyı anlatır. Açık anahtar, kabaca, gürültülü denklemlerin kendisidir; gizli anahtar, gizli vektör ve hatalardır.

ML-DSA’nın imza atma yöntemi, "#{strong[vazgeçmeli Fiat-Shamir]}" (#{emph[Fiat-Shamir with aborts]}) adı verilen bir yapıya dayanır. İmzalayan, gizli anahtarını kullanarak bir aday imza üretir; ama bu aday, gizli anahtar hakkında istatistiksel bir ipucu verecek durumdaysa onu atar ve yeniden dener. Ortalama birkaç denemede gizli anahtarla ilgili hiçbir şey sızdırmayan bir imza bulunur. Bu yüzden ML-DSA’da bir imzayı üretmek, ECDSA’dan farklı olarak, sabit değil değişken sayıda adım sürebilir.
]

== Özet tabanlı imzalar: SLH-DSA, LMS ve XMSS

Özet tabanlı imzaların fikri kriptografinin en eskilerinden biridir ve onu anlamak, kuantum sonrası imzalara dair güzel bir sezgi verir: Bir imza, yalnızca özet fonksiyonlarından kurulabilir.

#kutu("teknik", [Tek kullanımlık bir imza nasıl kurulur?])[
En basit özet tabanlı imza, 1979’da önerilen #{strong[Lamport imzasıdır]} \[12\]. SHA-256 ile imzalanacak bir mesaj $m$ düşünelim. Aşağıda $H$ SHA-256’yı, $b_i$ de mesaj özetinin $i$’inci bitini gösterir:

#adimlar((
  ("İmzalayan", [#{strong[Anahtar üretimi.]} 256 çift rastgele sayı üretilir (her biri 32 bayt); bunlar gizli anahtardır. Her birinin özeti alınır; bu 512 özet açık anahtardır.], $"PK" = {H(a_i^0), H(a_i^1)}_(i = 1)^256$),
  ("İmzalayan", [#{strong[İmzalama.]} Mesajın özeti alınır; her bit için çiftin o bite karşılık gelen sayısı açıklanır.], $sigma_i = a_i^(b_i), quad b = H(m)$),
  ("İmzalayan → Doğrulayan", [#{strong[Gönderim.]} Mesaj ve açıklanan 256 sayı gönderilir.], $(m, sigma_1, dots, sigma_256)$),
  ("Doğrulayan", [#{strong[Doğrulama.]} Açıklanan her sayının özeti, açık anahtardaki ilgili özetle karşılaştırılır.], $H(sigma_i) attach(=, t: ?) H(a_i^(b_i))$),
))

Boyutlar şöyle hesaplanır; her değer 32 bayttır:

#formul[$ "gizli anahtar" = "açık anahtar" &= 512 dot 32 = "16.384 bayt" \
"imza" &= 256 dot 32 = "8.192 bayt" $]

İmzayı taklit etmek, açık anahtardaki özetlerden birinin ön görüntüsünü bulmayı gerektirir; bu da özet fonksiyonunu kırmak demektir. Ama bir sorun var: Anahtar #{strong[yalnızca bir kez]} kullanılabilir. İkinci bir mesaj imzalanırsa, iki mesajın farklı bitlerinde her iki sayı da açıklanmış olur ve saldırgan bunları karıştırarak yeni imzalar üretebilir.

Çözüm, binlerce tek kullanımlık anahtarı bir #{strong[Merkle ağacıyla]} tek bir açık anahtar altında toplamaktır (Şekil 4). Her yaprak, bir tek kullanımlık açık anahtarın özetidir; her üst düğüm iki çocuğunun özetidir; ağacın kökü, asıl açık anahtardır. Bir imza, kullanılan tek kullanımlık imzayı ve o yapraktan köke giden yoldaki komşu düğümleri içerir. Doğrulayan bu yolu yeniden hesaplar ve köke ulaşıp ulaşmadığına bakar.

#{strong[LMS ve XMSS]} bu yapıyı doğrudan kullanır ve #{strong[durum tutar]}: İmzalayan, hangi tek kullanımlık anahtarı kullandığını hatasız kaydetmek zorundadır; aynı anahtarı iki kez kullanırsa güvenlik çöker. #{strong[SLH-DSA]} ise, ağaçlardan oluşan bir ağaç yapısı ve rastgele seçilen yapraklarla bu durum tutma zorunluluğunu ortadan kaldırır; bedeli, çok daha büyük imzalardır.
]

#sekil(4, [Özet tabanlı imza: Tek kullanımlık anahtarlar bir Merkle ağacıyla tek açık anahtara bağlanır], "figures/a15/sekil-4.svg", yarim: false)

== NIST’in geçiş takvimi

NIST, Ekim 2026’da son hâlini alan NIST IR 8547 ile kuantuma açık algoritmaların takvimini belirledi \[10\]. Belgeye göre RSA, ECDSA ve EdDSA gibi kuantuma açık bütün imza algoritmaları, anahtar boyutundan bağımsız olarak #{strong[2030’dan sonra kullanımdan kaldırılmakta olan]} (#{emph[deprecated]}), #{strong[2035’ten sonra izin verilmeyen]} (#{emph[disallowed]}) algoritmalar olacak. Aynı takvim anahtar anlaşması algoritmaları için de geçerli. "Kullanımdan kaldırılmakta olan", algoritmanın kullanılabileceği ama bir güvenlik riski taşıdığı ve veri sahibinin bu riski değerlendirmesi gerektiği anlamına gelir. NIST’in daha önceki planlarında 112 bit güvenlik düzeyindeki algoritmaların 2031’de yasaklanması öngörülüyordu; yeni takvim, kuantum geçişi nedeniyle bu planı genişletti.

ABD federal sistemleri için daha sıkı tarihler var: Yüksek değerli ve yüksek etkili federal sistemler, anahtar anlaşmasında 31 Aralık 2030’a, dijital imzalarda 31 Aralık 2031’e kadar kuantum sonrası kriptografiye geçmek zorunda \[10\]. Federal göçün tamamlanması için genel hedef yıl ise 2035.

= Kimlik Belgelerinde Etki: Boyutlar, Cihazlar, Biçimler

== İmzalar büyüyor

Kuantum sonrası imzaların en göze çarpan özelliği boyutlarıdır. Tablo 3, NIST standartlarındaki değerleri bugün kullanılan algoritmalarla karşılaştırıyor.

#tablo([#{strong[Tablo 3.]} İmza algoritmalarının açık anahtar ve imza boyutları (bayt).], (21fr, 16fr, 9fr, 10fr, 25fr), ([Algoritma], [Dayandığı problem], [Açık anahtar], [İmza], [Not],), (
  ([ECDSA P-256 (ES256)], [eliptik eğri ayrık logaritma], [64], [64], [bugünkü kimlik profillerinin ana imzası],),
  ([Ed25519], [eliptik eğri ayrık logaritma], [32], [64], [],),
  ([RSA-2048], [çarpanlara ayırma], [256], [256], [],),
  ([ML-DSA-44], [modül kafes], [1\.312], [2\.420], [FIPS 204],),
  ([ML-DSA-65], [modül kafes], [1\.952], [3\.309], [FIPS 204; ETSI yeni kurulumlar için 65 ya da 87’yi önerir],),
  ([ML-DSA-87], [modül kafes], [2\.592], [4\.627], [FIPS 204],),
  ([SLH-DSA-SHA2-128s], [özet fonksiyonu], [32], [7\.856], [FIPS 205; "s" küçük imza, yavaş imzalama],),
  ([SLH-DSA-SHA2-128f], [özet fonksiyonu], [32], [17\.088], [FIPS 205; "f" hızlı imzalama, büyük imza],),
  ([FN-DSA-512 (FALCON)], [NTRU kafesi], [897], [yaklaşık 666], [FIPS 206 taslak aşamasında; değerler FALCON önerisinden],),
))

#sekil(5, [İmza boyutlarının karşılaştırması (bayt, doğrusal ölçek)], "figures/a15/sekil-5.svg", yarim: false)

Bu sayıları bir kimlik belgesi üzerinde somutlaştıralım.

#kutu("teknik", [Bir SD-JWT VC gösteriminin kriptografik yükü])[
Aynur’un PID’ini bir doğrulayana SD-JWT VC biçiminde gösterdiğini düşünelim. Gösterimde üç imza ve iki açık anahtar bulunur (değerler yaklaşıktır; sertifikanın imza dışındaki alanları ve açılan veriler hesaba katılmamıştır):

- verenin belge üzerindeki imzası,
- verenin sertifikası (verenin açık anahtarı ve onu imzalayan otoritenin imzası),
- Aynur’un cüzdanının anahtar bağlama imzası (KB-JWT) ve belgenin içinde gömülü cüzdan açık anahtarı.

#tablo([], (18fr, 8fr, 11fr), ([Parça], [ES256 (bayt)], [ML-DSA-44 (bayt)],), (
  ([Verenin imzası], [64], [2\.420],),
  ([Sertifika: açık anahtar], [64], [1\.312],),
  ([Sertifika: otorite imzası], [64], [2\.420],),
  ([Cüzdan açık anahtarı (belgede)], [64], [1\.312],),
  ([KB-JWT imzası], [64], [2\.420],),
  ([#{strong[Toplam (ikili)]}], [#{strong[320]}], [#{strong[9\.884]}],),
))

Toplamlar şöyle bulunur: ES256’da beş parçanın hepsi 64 bayttır; ML-DSA-44’te üç imza ve iki açık anahtar vardır.

#formul[$ "ES256:" quad & 5 dot 64 = 320 "bayt" \
"ML-DSA-44:" quad & 3 dot 2420 + 2 dot 1312 = 7260 + 2624 = 9884 "bayt" $]

SD-JWT bir metin biçimidir; ikili değerler Base64URL ile harflere çevrilerek taşınır. Base64URL her 3 baytı 4 karaktere çevirir, yani $n$ baytlık bir değer yaklaşık $ceil(4n slash 3)$ karakter tutar:

#formul[$ "ES256:" quad & ceil((4 dot 320) / 3) = ceil(426","67) = 427 "karakter" \
"ML-DSA-44:" quad & ceil((4 dot 9884) / 3) = ceil(13178","67) = 13179 "karakter" $]

İki toplamın oranı $9884 slash 320 approx 30","9$’dur: Kriptografik yük yaklaşık otuz kat büyür. İnternet üzerinden gönderilen bir mesaj için on üç kilobayt sorun değildir; bir web sayfasının tek bir görseli bundan büyüktür. Ama belgenin #{strong[QR kod]} ile taşındığı senaryolarda durum farklıdır. En büyük standart QR kod yaklaşık 2.953 bayt ikili veri taşıyabilir. Tek bir ML-DSA-44 imzası (2.420 bayt) bu kapasitenin büyük kısmını, $2420 slash 2953 approx 0","82$, yani yüzde 82’sini tek başına doldurur. Belgenin tamamının QR kodda taşındığı tasarımlar (örneğin çevrimdışı doğrulanan kâğıt belgelerdeki imzalı karekodlar) kuantum sonrası imzalarla bugünkü hâliyle çalışamaz; ya daha küçük imzalı algoritmalar (FN-DSA gibi) ya da QR kodun yalnızca bir bağlantı kurma aracı olarak kullanıldığı tasarımlar gerekir. Dizinin dokuzuncu yazısında anlattığımız ISO\/IEC 18013-5 akışı zaten bu ikinci yolu izler: QR kod yalnızca bağlantıyı başlatır, belgenin kendisi Bluetooth ya da NFC üzerinden gider.
]

== Cihazlar ve güvenli donanım

Boyuttan daha zor bir konu, imzaların #{strong[nerede]} atıldığıdır. Dizinin onuncu yazısında anlattığımız gibi, cüzdanın sahip bağlama anahtarı telefonun güvenli donanımında üretilir ve oradan hiç çıkmaz. Pasaportun aktif doğrulama anahtarı da çipin içindedir. Bu güvenli donanımlar, belirli algoritmaları donanımda destekleyecek biçimde tasarlanır ve bugün yaygın olan destek eliptik eğri algoritmalarına yöneliktir.

Bir algoritmanın standart olarak yayımlanması ile milyonlarca cihazın güvenli donanımında desteklenmesi arasında yıllar vardır. Telefonlar için bu süre işletim sistemi güncellemeleri ve yeni donanım nesilleriyle kısalabilir. Ama pasaport ve kimlik kartı çipleri için durum farklıdır: Bir çip bir kez üretilip belgeye gömüldüğünde, belgenin bütün ömrü boyunca aynı algoritmalarla yaşar. Bugün basılan ve on yıl geçerli olacak bir pasaport, 2036’ya kadar bugünkü çipiyle sınır kapılarında okunacaktır. Bu da NIST takviminde kuantuma açık imzalara izin verilmeyen döneme denk gelir. Kısıtlı bellek ve işlem gücüne sahip akıllı kartlarda ML-DSA’nın büyük anahtarlarını ve imzalarını işlemek mümkün, ama tasarımı ve sertifikasyonu yeni nesil çipler gerektiriyor.

== Biçimler ve algoritma tanımlayıcıları

Bir algoritmanın kimlik belgelerinde kullanılabilmesi için, belge biçimlerinin o algoritmayı #{strong[adlandırabilmesi]} gerekir: Bir JWT’nin başlığında #{raw("\"alg\": \"ES256\"")} yazdığı gibi, bir kuantum sonrası imza için de bir ad ve bir kodlama tanımlanmalıdır. Bu çalışmalar son iki yılda büyük ölçüde tamamlandı:

- #{strong[X.509 sertifikaları:]} ML-DSA için IETF RFC 9881 (Ekim 2025) \[13\]; SLH-DSA için RFC 9909 (Aralık 2025).
- #{strong[CMS]} (elektronik imza biçimlerinin temeli): ML-DSA için RFC 9882 (Ekim 2025), SLH-DSA için RFC 9814 (Temmuz 2025) \[14\].
- #{strong[JOSE ve COSE]} (SD-JWT VC ve mdoc’un dayandığı imza biçimleri): ML-DSA için RFC 9964 (Mayıs 2026) \[15\]. Bu RFC, #{raw("ML-DSA-44")}, #{raw("ML-DSA-65")} ve #{raw("ML-DSA-87")} adlı algoritma tanımlayıcılarını ve yeni bir anahtar türünü tanımlar.

Yani teknik altyapının "yazım kuralları" büyük ölçüde hazır. Eksik olan, bu kuralların kimlik profillerine, yani AB cüzdan mimarisine, ISO mobil ehliyet standardına ve ICAO pasaport standardına işlenmesi ve sahada yaygın biçimde desteklenmesi.

== Neler değişmez?

Kuantum sonrası geçişi abartmamak için, nelerin #{strong[değişmeyeceğini]} de söylemek gerekir.

#{strong[Seçici açıklamanın kendisi.]} Dizinin üçüncü yazısında anlattığımız SD-JWT, belgedeki her alanı tuzlanmış bir özetle gizler. Özet fonksiyonları kuantum çağında güvenli kaldığı için bu mekanizma olduğu gibi kalır. Değişen, özetlerin listesini imzalayan algoritmadır. mdoc’taki seçici açıklama da aynı biçimde özetlere dayanır.

#{strong[İptal listeleri.]} Dizinin yedinci yazısındaki durum listeleri, her belge için bir ya da iki bit taşır. Listenin içeriği değişmez; yalnızca listenin üzerindeki tek imza büyür. Binlerce belgenin durumunu taşıyan bir liste için birkaç kilobaytlık fark önemsizdir.

#{strong[Güven listelerinin mimarisi.]} Hangi kurumun hangi rolde yetkili olduğunu söyleyen imzalı listeler aynı kalır; yalnızca içlerindeki sertifikalar ve üzerlerindeki imza değişir. Hatta güven listeleri, geçişin en önemli #{strong[araçlarından]} biri olabilir: Bir kurumun yeni kuantum sonrası anahtarı, eski anahtarıyla birlikte listeye eklenebilir ve eski anahtar belirli bir tarihte listeden çıkarılabilir.

Bir alan ise daha zor durumda: #{strong[bağlanamazlık]}. Dizinin dördüncü ve beşinci yazılarında anlattığımız, aynı belgenin farklı gösterimlerinin birbirine bağlanamaması için önerilen bazı imza şemaları (örneğin BBS), eliptik eğri #{strong[eşlemelerine]} dayanır ve Shor algoritmasına açıktır. Yalnızca özet fonksiyonlarına dayanan sıfır bilgi ispatı sistemleri bu açıdan daha dayanıklı görülür, ama kuantum sonrası bağlanamazlık hâlâ olgunlaşmakta olan bir araştırma alanıdır.

= Karma İmzalar ve Geçiş

== Neden ikisi birden?

Kuantum sonrası algoritmalar bugün standart, ama #{strong[genç]}. ECDSA’nın arkasında onlarca yıllık analiz ve saha deneyimi var; ML-DSA’nın arkasında birkaç yıllık yoğun inceleme. 2022’de NIST sürecinin ileri turlarına kalmış iki adayın, Rainbow ve SIKE’ın, sıradan bilgisayarlarla kırılması, yeni algoritmalara temkinli yaklaşmak için güçlü bir gerekçe oldu. Ayrıca bir algoritmanın matematiği sağlam olsa bile #{strong[uygulaması]} hatalı olabilir; zamanlama ya da güç tüketimi üzerinden gizli anahtarı sızdıran yan kanal açıkları, yeni algoritmalarda daha sık görülür.

Bu belirsizliğe karşı önerilen çözüm, geçiş döneminde iki algoritmayı #{strong[birlikte]} kullanmaktır: bir klasik (örneğin ECDSA) ve bir kuantum sonrası (örneğin ML-DSA). Buna #{strong[karma]} (#{emph[hybrid]}) yaklaşım denir. Karma bir imzada, belge her iki algoritmayla da imzalanır ve doğrulayan #{strong[her iki imzanın da]} geçerli olmasını şart koşar. Böylece bir saldırganın sahte belge üretebilmesi için iki algoritmayı birden kırması gerekir. Kuantum bilgisayar gelirse ECDSA kırılır ama ML-DSA ayakta kalır; ML-DSA’da beklenmedik bir zayıflık bulunursa ECDSA ayakta kalır.

#kutu("teknik", [Karma bir imza nasıl doğrulanır?])[
Algoritma düzeyindeki bir karma imzada veren, aynı belge $m$ üzerinde iki bağımsız imza atar: biri klasik anahtarıyla ($"SK"_1$, örneğin ECDSA P-256), biri kuantum sonrası anahtarıyla ($"SK"_2$, örneğin ML-DSA-65). Doğrulayan iki imzayı ayrı ayrı doğrular ve sonuçları "ve" ile birleştirir:

#adimlar((
  ("Veren", [#{strong[Klasik imza.]} Belge ECDSA anahtarıyla imzalanır.], $sigma_1 = "Sign"("SK"_1, m)$),
  ("Veren", [#{strong[Kuantum sonrası imza.]} Aynı belge ML-DSA anahtarıyla da imzalanır.], $sigma_2 = "Sign"("SK"_2, m)$),
  ("Veren → Doğrulayan", [#{strong[Gönderim.]} Belge iki imzasıyla birlikte gönderilir.], $(m, sigma_1, sigma_2)$),
  ("Doğrulayan", [#{strong[Anahtarlar.]} Verenin iki açık anahtarı güven listesinden alınır.], $"PK"_1, quad "PK"_2$),
  ("Doğrulayan", [#{strong[Klasik doğrulama.]} ECDSA imzası doğrulanır.], $v_1 = "Verify"("PK"_1, m, sigma_1)$),
  ("Doğrulayan", [#{strong[Kuantum sonrası doğrulama.]} ML-DSA imzası doğrulanır.], $v_2 = "Verify"("PK"_2, m, sigma_2)$),
  ("Doğrulayan", [#{strong[Karar.]} Belge yalnızca iki imza da geçerliyse kabul edilir.], $"kabul" <==> v_1 and v_2$),
))

Son satırdaki "ve" işlemi karma yaklaşımın bütün anlamını taşır. Doğrulayan "imzalardan biri geçerliyse yeter" deseydi, sahtekâr yalnızca kırılan algoritmanın imzasını üretip öbürünü bozuk bırakabilirdi ve karma imza en zayıf algoritma kadar güçlü olurdu. "İkisi de geçerli olmalı" kuralıyla sahte bir belge, iki algoritmanın #{strong[ikisi de]} kırıldığında üretilebilir.
]

== ETSI’nin tarifi

Avrupa’da elektronik imza ve güven hizmetleri için kriptografik algoritmaları belirleyen ETSI TS 119 312, Haziran 2026’da yayımlanan 2.1.1 sürümünde kuantum sonrası geçişi doğrudan ele aldı \[16\]. Bu sürüm ML-DSA’yı ve SLH-DSA’yı önerilen mekanizmalar arasına aldı; LMS ve XMSS’i, durumun sıkı biçimde yönetilebildiği ortamlar (örneğin sertifikalı donanım güvenlik modülleri) ile sınırlayarak tanıdı. ML-DSA için yeni kurulumlarda ML-DSA-65 ya da ML-DSA-87’nin tercih edilmesini; ML-DSA-44’ün ise bunların mümkün olmadığı yerlerde kabul edilebilir olduğunu belirtti.

Şartnamenin en dikkat çekici kısmı karma imzalardır. RSA, ECDSA ve EdDSA için, kuantum saldırılarına karşı korumanın gerektiği durumlarda (örneğin imzanın uzun süreli geçerliliğinin 2030’u aştığı durumlarda) algoritmanın ya bir karma şema içinde kullanılması ya da kuantuma dayanıklı bir algoritmayla değiştirilmesi gerektiğini söyler. Karma imzalarda kabul için #{strong[iki imzanın da]} geçerli olmasını şart koşar ve önerilen birleşimleri listeler; örneğin gelişmiş elektronik imza biçimleri (CAdES, XAdES, PAdES) için ECDSA (P-256 ya da P-384) ile ML-DSA-65’in, zaman damgaları ve yazılım imzalama için ECDSA ya da EdDSA ile SLH-DSA’nın birlikte kullanılması \[16\].

Şartname iki karma yöntemi de uygun sayar: #{strong[algoritma düzeyinde]} karma, yani aynı veri üzerinde bağımsız olarak hesaplanıp doğrulanan iki imza; ve #{strong[protokol düzeyinde]} karma, yani belge biçiminin kendisinin birden çok imza taşıma imkânının kullanılması. Kodlama ve birlikte çalışabilirlik ayrıntıları ise hazırlanmakta olan ayrı bir kuantum sonrası geçiş belgesine bırakılmıştır.

NIST’in bakışı biraz daha mesafeli: Karma çözümlerin, bir algoritma ya da uygulama zayıflığına karşı sigorta olarak yararlı olduğunu kabul eder; ama uygulamaya karmaşıklık eklediğini ve genellikle ikinci bir geçişe, yani yalnızca kuantum sonrası algoritmaya geçişe götüren #{strong[geçici]} önlemler olarak görülmesi gerektiğini vurgular \[10\].

== Kripto çeviklik

Kuantum sonrası geçişin belki de en kalıcı dersi, belirli bir algoritmadan çok bir #{strong[tasarım ilkesiyle]} ilgilidir: #{strong[kripto çeviklik]} (#{emph[crypto agility]}). Bir sistem, kullandığı kriptografik algoritmayı, sistemin geri kalanını yeniden yazmadan değiştirebiliyorsa çeviktir.

Kimlik sistemlerinde kripto çeviklik birkaç somut anlama gelir. Belge biçimleri algoritmayı açıkça adlandırmalı ve doğrulayan yazılım, tanımadığı bir algoritmayla karşılaştığında güvenli biçimde reddetmeli. Güven listeleri, aynı kurum için birden fazla anahtarı ve algoritmayı aynı anda taşıyabilmeli. Cüzdanlar, desteklediği algoritmaları doğrulayana ve verene bildirebilmeli; doğrulayanlar da hangi algoritmaları kabul ettiklerini isteklerinde belirtebilmeli. Ve belki en önemlisi, belgelerin ömrü, algoritma değişikliğini kolaylaştıracak biçimde tasarlanmalı.

Bu son nokta, dizinin önceki yazılarında söz ettiğimiz bir tasarım tercihine bağlanır: #{strong[kısa ömürlü belgeler]}. Bir PID birkaç ayda bir yeniden veriliyorsa, kuantum sonrası algoritmaya geçiş, bir sonraki yenilemede kendiliğinden gerçekleşir. Ömür boyu geçerli bir belge ise ya yeniden verilmek ya da arşiv yöntemleriyle korunmak zorundadır.

== Uzun ömürlü belgeler için arşiv

Elektronik imza dünyasında, imzayı atan algoritma zamanla zayıflasa bile imzanın geçerliliğini korumak için geliştirilmiş bir yöntem uzun zamandır var: #{strong[arşiv zaman damgaları]}. Fikir şudur: Bir belge ve imzası, imza algoritması hâlâ güvenliyken, güvenilir bir zaman damgası hizmeti tarafından daha güçlü bir algoritmayla zaman damgalanır. Zaman damgası, "bu belge ve imza, bu tarihte bu hâliyle vardı" der. Eski algoritma kırıldığında bile, belge imzanın kırılmadan #{strong[önce]} var olduğunu kanıtlayan daha güçlü bir zaman damgası taşır. Zaman damgasının algoritması da zayıfladığında, işlem yeni bir zaman damgasıyla tekrarlanır.

Aynur’un diploması için bu, iki yol anlamına gelir. Birincisi, üniversitesi diplomayı belirli bir tarihten sonra kuantum sonrası bir imzayla #{strong[yeniden verebilir]}; Aynur’un cüzdanı eski diplomanın yanına yenisini alır. İkincisi, eski diploma, kuantum sonrası bir algoritmayla atılmış bir arşiv zaman damgasıyla korunabilir. Her iki yol da, kuantum bilgisayar ortaya çıkmadan #{strong[önce]} yürünmüş olmalıdır.

#kutu("ornek", [Bakü’deki üniversitenin geçiş planı])[
Aynur’un mezun olduğu üniversitenin bilgi işlem birimi 2027’de kuantum sonrası geçiş için bir plan hazırlıyor. İlk iş bir #{strong[envanter]}: Üniversite hangi anahtarlarla neyi imzalıyor? Diploma imzalama anahtarı, transkript imzalama anahtarı, öğrenci kartlarının durum listesini imzalayan anahtar, web sitesinin TLS sertifikası. Her biri için ikinci soru: Bu imzaya ne kadar süre güvenilmesi gerekiyor? Durum listesi için birkaç gün; transkript için birkaç yıl; diploma için ömür boyu.

Plan buna göre kuruluyor. Web sitesinin bağlantıları, sunucu yazılımının yeni sürümüyle karma anahtar anlaşmasına geçiriliyor. Ülkenin güven listesini yayımlayan otoriteye, üniversitenin diploma imzalama sertifikası için ML-DSA tabanlı bir eşinin de listeye eklenmesi başvurusu yapılıyor. Yeni diplomalar, ETSI’nin önerdiği biçimde hem ECDSA hem ML-DSA ile, karma olarak imzalanmaya başlıyor. 2026 ve öncesinde verilmiş diplomalar için iki yol açılıyor: Mezunlar cüzdanlarından bir istekle diplomalarını yeni imzayla yeniden alabiliyor; almayanların diplomaları ise üniversitenin anlaşmalı zaman damgası hizmetiyle, kuantum sonrası bir algoritmayla arşiv damgası alıyor. Durum listeleri ise en sona bırakılıyor: Ömürleri kısa, ne zaman değiştirilirlerse değiştirilsinler bir sonraki yayında yeni imzayla çıkacaklar.

Planın hiçbir adımı Aynur’dan bir şey istemiyor; en fazla, cüzdanına "diplomanızın yeni sürümü hazır" diye bir bildirim düşüyor.
]

== Geçişin sırası

Bütün bu parçaları bir araya getirdiğimizde, bir kimlik ekosistemi için makul bir geçiş sırası ortaya çıkar (Şekil 6).

#sekil(6, [Bir kimlik ekosisteminde kuantum sonrası geçişin önerilen sırası], "figures/a15/sekil-6.svg", yarim: false)

İlk basamak taşıma katmanıdır, çünkü "şimdi topla, sonra çöz" tehdidi bugün işler. İkinci basamak güven çapalarıdır; çünkü bunlar en uzun yaşayan anahtarlardır ve onların değişmesi bütün zincirin önünü açar. Üçüncü basamak uzun ömürlü belgelerdir. Dördüncüsü ise kısa ömürlü imzalardır: Bunlar en çok sayıda olanlardır, ama raf ömrü eşitsizliğinde x neredeyse sıfır olduğu için en son değiştirilebilirler ve cihazların güvenli donanımındaki desteği beklemek için en uygun olanlardır.

= Avrupa Birliği, ETSI ve NIST: Takvimler

== AB’nin tavsiyesi ve yol haritası

Avrupa Komisyonu, 11 Nisan 2024’te üye devletlere kuantum sonrası kriptografiye geçiş için #{strong[eşgüdümlü bir uygulama yol haritası]} hazırlamalarını tavsiye etti (Tavsiye (AB) 2024\/1101) \[17\]. Tavsiyenin amacı, üye devletlerin geçişi birbirinden kopuk biçimde yapmasını ve sınır ötesi birlikte çalışabilirliğin bozulmasını önlemekti. Tavsiye, bu işin, AB’nin ağ ve bilgi güvenliği işbirliği grubu (NIS İşbirliği Grubu) bünyesinde kurulacak bir çalışma koluyla yürütülmesini öngördü.

Bu çalışma kolunun hazırladığı #{strong[Kuantum Sonrası Kriptografiye Geçiş için Eşgüdümlü Uygulama Yol Haritası]}, 23 Haziran 2025’te yayımlandı \[18\]. Yol haritası üç aşama tanımlar:

- #{strong[2026 sonuna kadar:]} Her üye devlet ulusal bir kuantum sonrası geçiş stratejisi oluşturmuş ve ilk adımları atmış olmalıdır: kriptografik varlıkların envanterinin çıkarılması, kuantum risk analizi, paydaşların sürece katılması ve yüksek ve orta riskli kullanım alanları için pilot uygulamalar.
- #{strong[2030 sonuna kadar:]} Yüksek riskli bütün kullanım alanlarında geçiş tamamlanmış olmalıdır. Kamu anahtarı altyapıları ve yazılım ve donanım güncellemelerinin imzalanması bu kapsamdadır; kuantuma dayanıklı güncellemeler varsayılan hâle gelmelidir.
- #{strong[2035 sonuna kadar:]} Orta ve düşük riskli kullanım alanlarında geçiş, mümkün olduğunca tamamlanmış olmalıdır.

Kimlik ekosistemi açısından bu takvimin anlamı açık: Güven listeleri, kök otoriteler ve belge veren kurumların anahtarları birer kamu anahtarı altyapısıdır ve yüksek riskli kullanım alanları arasında sayılmaları beklenir. Yani AB’nin dijital kimlik altyapısının çekirdeği için hedef tarih 2030’un sonudur. Avrupa Dijital Kimlik Cüzdanı’nın üye devletlerde kullanıma girdiği 2026–2027 döneminin, aynı zamanda bu cüzdanların ve onlara bağlı altyapının kuantum sonrası geçişinin planlanması gereken dönem olması, mimarinin baştan kripto çevik tasarlanmasının önemini artırıyor.

== ETSI

ETSI’nin kuantum sonrası çalışmaları iki kolda ilerliyor. Siber güvenlik teknik komitesi (TC CYBER) bünyesindeki #{strong[Kuantum Güvenli Kriptografi]} çalışma grubu, geçişin genel çerçevesini ele alıyor. Bu grubun 2020’de yayımladığı TR 103 619, kuantum güvenli şemalara geçiş için stratejiler ve öneriler sunar \[19\]. Aynı yıl ilk sürümü yayımlanan TS 103 744, klasik ve kuantum sonrası anahtar anlaşmalarının nasıl birleştirileceğini, yani karma anahtar değişimini tanımlar ve sonraki sürümlerinde ML-KEM’i de kapsayacak biçimde güncellendi \[20\].

İkinci kol, bu dizinin konusuna daha yakın olan Elektronik İmzalar ve Güven Altyapıları komitesidir (ESI). AB’nin güven hizmetleri ve dijital kimlik altyapısının dayandığı standartların büyük çoğunluğu, yani güven listeleri, elektronik imza biçimleri, zaman damgaları, nitelikli sertifikalar, bu komiteden çıkar. Bölüm 7.2’de anlattığımız TS 119 312’nin Haziran 2026 sürümü, bu komitenin kuantum sonrası geçişteki ilk somut adımıdır \[16\]. Şartname, geçiş takvimini ve uyum son tarihlerini, hazırlanmakta olan ayrı bir kuantum sonrası geçiş belgesine bırakıyor.

== Takvimler yan yana

#tablo([#{strong[Tablo 4.]} Kuantum sonrası geçişte başlıca tarihler.], (11fr, 48fr, 14fr), ([Tarih], [Olay], [Kaynak],), (
  ([11 Nisan 2024], [AB Komisyonu tavsiyesi: eşgüdümlü yol haritası], [Tavsiye (AB) 2024\/1101 \[17\]],),
  ([13 Ağustos 2024], [FIPS 203, 204, 205 yayımlandı], [NIST \[7, 8, 9\]],),
  ([23 Haziran 2025], [AB eşgüdümlü uygulama yol haritası], [NIS İşbirliği Grubu \[18\]],),
  ([Ekim 2025 – 2026], [ML-DSA için X.509, CMS, JOSE ve COSE tanımlayıcıları], [IETF RFC 9881, 9882, 9964 \[13, 14, 15\]],),
  ([Haziran 2026], [ETSI TS 119 312 V2.1.1: ML-DSA, SLH-DSA ve karma imza takımları], [ETSI ESI \[16\]],),
  ([Ekim 2026], [NIST IR 8547 son sürüm: 2030 sonrası kullanımdan kaldırma, 2035 sonrası yasak], [NIST \[10\]],),
  ([2026 sonu], [AB: ulusal stratejiler, envanter, pilotlar], [\[18\]],),
  ([2030 sonu], [AB: yüksek riskli kullanımlarda geçiş tamam; ABD: federal yüksek etkili sistemlerde anahtar anlaşması], [\[18, 10\]],),
  ([31 Aralık 2031], [ABD: federal yüksek etkili sistemlerde dijital imzalar], [\[10\]],),
  ([2035], [AB: orta ve düşük riskte mümkün olduğunca geçiş; NIST: kuantuma açık algoritmalara izin yok], [\[18, 10\]],),
))

#sekil(7, [Kuantum sonrası geçiş takvimi: standartlar ve son tarihler (2024–2035)], "figures/a15/sekil-7.svg", yarim: false)

= İmza Algoritmalarının Karşılaştırması

#tablo([#{strong[Tablo 5.]} Kimlik sistemleri açısından imza algoritmalarının karşılaştırması.], (14fr, 15fr, 16fr, 17fr, 16fr, 19fr), ([Ölçüt], [ECDSA \/ EdDSA], [ML-DSA], [SLH-DSA], [LMS \/ XMSS], [FN-DSA],), (
  ([Dayandığı varsayım], [eliptik eğri ayrık logaritma], [modül kafes problemleri], [yalnızca özet fonksiyonları], [yalnızca özet fonksiyonları], [NTRU kafesi],),
  ([Kuantuma dayanıklı], [hayır], [evet], [evet], [evet], [evet],),
  ([İmza boyutu], [çok küçük (64 bayt)], [orta (2,4–4,6 KB)], [büyük (7,8–49 KB)], [orta (parametreye bağlı)], [küçük (yaklaşık 0,7 KB)],),
  ([Açık anahtar], [çok küçük], [orta (1,3–2,6 KB)], [çok küçük (32–64 bayt)], [çok küçük], [küçük (yaklaşık 0,9 KB)],),
  ([İmzalama hızı], [hızlı], [hızlı], [yavaş ("s"), orta ("f")], [hızlı], [hızlı, ama uygulaması zor],),
  ([Durum tutma], [yok], [yok], [yok], [#{strong[zorunlu]}], [yok],),
  ([Standart durumu], [yerleşik], [FIPS 204 (2024)], [FIPS 205 (2024)], [SP 800-208 (2020)], [FIPS 206 hazırlanıyor],),
  ([Kimlikte uygun kullanım], [geçiş döneminde karma imzanın klasik yarısı], [belgeler, sertifikalar, güven listeleri], [kök anahtarlar, zaman damgaları, arşiv], [güncelleme imzalama, donanım modülünde imza], [boyutun belirleyici olduğu yerler (QR, akıllı kart)],),
))

Tablodan çıkan sonuç, tek bir kazananın olmadığı. ML-DSA, kimlik belgelerinin ve sertifikaların genel amaçlı imzası olarak öne çıkıyor. SLH-DSA, büyüklüğüne karşın en az varsayıma dayandığı için en uzun yaşayan anahtarlar için güçlü bir aday. FN-DSA standartlaştığında, boyutun gerçekten önemli olduğu yerlerde bir boşluğu dolduracak. Ve geçiş döneminde ECDSA, karma imzaların klasik yarısı olarak bir süre daha bizimle olacak.

= Sınırlar ve Açık Sorular

#{strong[Tarih belirsizliği.]} Kuantum sonrası geçişin bütün planlaması, ne zaman geleceği bilinmeyen bir olaya göre yapılıyor. Erken ve pahalı bir geçiş, tehdit hiç gelmezse boşa harcanmış görünebilir. Geç bir geçiş ise geri dönüşü olmayan bir güven kaybına yol açabilir. x + y \> z eşitsizliği bu belirsizliği ortadan kaldırmaz; yalnızca hangi sistemler için beklemenin göze alınamayacağını gösterir. Abartılı kuantum haberleri ile tehdidi hafife alan değerlendirmeler arasında sağduyulu bir yol bulmak, karar vericilerin önündeki ilk sorudur.

#{strong[Yeni algoritmalara güven.]} ML-DSA ve SLH-DSA kapsamlı bir açık incelemeden geçti. Ama 2022’deki iki kırılma, bu alanda sürprizlerin mümkün olduğunu gösterdi. Karma imzalar bu riske karşı bir sigorta; ama karmaşıklık ekliyor ve karmaşıklık da kendi başına bir güvenlik riski.

#{strong[Uygulama hataları.]} Matematiksel olarak güvenli bir algoritma, kötü yazılmış bir yazılımda ya da yan kanal saldırılarına açık bir donanımda güvenli değildir. Kuantum sonrası algoritmaların sabit zamanlı, yan kanallara dayanıklı uygulamaları, özellikle kısıtlı cihazlarda, hâlâ olgunlaşıyor.

#{strong[Fiziksel belgelerin döngüsü.]} Pasaportlar ve kimlik kartları on yıllık döngülerle yenilenir. Bugün basılan belgelerin çipleri 2035’ten sonrasına uzanacak. Bu belgelerin kuantum sonrası imzalarla basılmaya başlaması, ICAO standardının, çip üreticilerinin, sınır kontrol sistemlerinin ve ülkeler arası anahtar paylaşım altyapısının birlikte güncellenmesini gerektiriyor. Bu, ülkeler arasında eşgüdüm gerektiren uzun bir süreç.

#{strong[Gizlilik teknolojileri.]} Bölüm 6.4’te gördüğümüz gibi, bağlanamazlık için önerilen bazı imza şemaları Shor algoritmasına açık. Kuantum sonrası dünyada aynı gizlilik özelliklerini aynı verimlilikle sağlayan yöntemler henüz araştırma aşamasında. Kuantum sonrası geçişin, gizlilik kazanımlarını geri almaması için bu alanın yakından izlenmesi gerekiyor.

#{strong[Kaynak eşitsizliği.]} Geçişin maliyeti, envanter çıkarmaktan donanım yenilemeye kadar, büyük ve iyi finanse edilmiş kurumlar için bile ağır. AB üyesi olmayan ülkeler, küçük belge veren kurumlar ve kaynakları kısıtlı kamu idareleri için bu yük daha da ağır. Ortak standartlar, açık kaynak kütüphaneler ve paylaşılan güven altyapıları bu yükü hafifletmenin en gerçekçi yolları.

#{strong[Kuantum anahtar dağıtımı bir alternatif mi?]} Kuantum fiziğinin kendisini kullanarak anahtar dağıtan sistemler de var. Ama bu sistemler özel donanım ve doğrudan fiziksel bağlantılar gerektirir ve imza işlevi görmez. Milyonlarca telefonda çalışması gereken kimlik sistemleri için kuantum sonrası kriptografinin yerini tutmazlar.

= Bu Tablonun İçinde Tamga Network

Bu yazı dizisini yayımlayan Tamga Network, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır ve Avrupa Birliği’nin eIDAS 2.0 ve EUDI mimarisini, AB üyesi olmayan ülkeler için uygulanabilir kılmayı hedefler. Ağ, belge veren kurumların ve cüzdanların kim olduğunu söyleyen imzalı güven listelerini yayımlar; güven listelerinde hiçbir kişisel veri yer almaz ve ağ kendisi bir cüzdan işletmez.

Ağın bugünkü yazılımları, AB profillerinde olduğu gibi eliptik eğri imzaları (#{raw("ES256")}) kullanır; kuantum sonrası algoritmalara geçiş henüz yapılmış değil. Bu yazıda anlattığımız geçiş, ağın da AB profilleri ve ETSI şartnameleri olgunlaştıkça izleyeceği yoldur. Bu açıdan ağın elindeki en önemli araç, Bölüm 6.4’te söz ettiğimiz güven listelerinin kendisidir: Bir kurumun yeni bir anahtarını eskisinin yanına eklemek ve eskisini belirli bir tarihte listeden çıkarmak, kripto çevik bir geçişin doğal bir parçasıdır. AB dışındaki ülkeler için ortak bir güven altyapısı, kuantum sonrası geçişin maliyetini de ülkeler arasında paylaşmanın bir yolu olabilir.

= Sonuç

Dijital kimliğin bütün yapısı, yazının başında söylediğimiz gibi, dijital imzaya dayanır. Kuantum bilgisayarlar, bu imzaların bugün dayandığı iki matematik problemini çözebilecek bir makine vaat ediyor. Böyle bir makinenin ne zaman yapılacağını bilmiyoruz. Ama kimlik belgeleri uzun yaşadığı, onları taşıyan altyapıyı değiştirmek de yıllar sürdüğü için, cevabın "bilmiyoruz, o yüzden bekleyelim" olamayacağını biliyoruz.

İyi haber, araçların hazır olması. NIST’in 2024’te yayımladığı ML-KEM, ML-DSA ve SLH-DSA standartları, IETF’in 2025–2026’da tamamladığı algoritma tanımlayıcıları ve ETSI’nin 2026’da güncellediği kriptografik takımlar, geçişin yazım kurallarını büyük ölçüde belirledi. Avrupa Birliği’nin yol haritası ve NIST’in takvimi, bu geçişin 2030 ile 2035 arasında tamamlanmasını hedefliyor. Seçici açıklama, iptal listeleri ve güven listeleri gibi bu dizide anlattığımız mekanizmaların çoğu, yalnızca imza algoritmaları değiştirilerek kuantum sonrası dünyaya taşınabiliyor. Zor olan, bu değişikliği milyonlarca belgede, cihazda ve kurumda, doğru sırayla ve kimseyi geride bırakmadan yapmak.

Aynur’un 2041’deki diploması için cevap, bu yazının önerdiği sırada saklı. Bağlantılar bugünden korunursa, kök anahtarlar 2030’a kadar değiştirilirse, üniversitesi diplomayı zamanında yeni bir imzayla yeniden verirse ya da eski diplomayı güçlü bir arşiv zaman damgasıyla korursa, Almatı’daki şirket 2041’de de diplomanın gerçek olduğundan emin olabilir.

#heading(level: 2, numbering: none)[Diziye bir kapanış]

Bu yazı, Tamga Network Akademik Çalışmalar dizisinin on beşinci ve son yazısı. Dizi, 1960’ların başında bir zaman paylaşım bilgisayarındaki parola dosyasıyla başladı ve burada, henüz yapılmamış bir bilgisayarın gölgesinde bitiyor. Arada doğrulanabilir belgelerin iç yapısını, seçici açıklamayı ve sıfır bilgi ispatlarını, doğrulayanların bizi birbirine anlatmasını engellemenin yollarını, güven listelerini ve iptali, belgelerin nasıl verilip gösterildiğini, yüz yüze doğrulamayı, cüzdan güvenliğini, eIDAS 2.0’ı, blokzincirin yerini, Türk dünyasındaki durumu ve deepfake çağında kimlik doğrulamayı ele aldık.

Bütün bu konuların altında aynı fikir vardı. Dijital kimlik, teknik araçları ne kadar gelişmiş olursa olsun, temelde bir güven sorunudur. Bir imza bir belgenin değiştirilmediğini kanıtlar; ama imzayı atanın kim olduğuna ve o belgeyi vermeye yetkili olup olmadığına, toplulukların ortak kuralları ve kurumları karar verir. Bu dizinin son yazısının konusu da aynı sonuca varıyor: Kuantum sonrası geçiş, bir algoritmayı başkasıyla değiştirmekten ibaret olsaydı kolay olurdu. Asıl iş, belgeyi verenlerin, doğrulayanların ve güven listelerini yayımlayanların bu değişikliği birlikte ve zamanında yapabilmesi.

İlk yazıyı, bozkırdaki tamganın gücünün çizginin kendisinden değil, o çizgiyi herkesin tanımasından geldiğini söyleyerek bitirmiştik. Kuantum sonrası dönemde çizgiyi çizen alet değişecek. Tanımanın, yani güvenin, nasıl kurulduğu ise aynı kalacak. Bu diziyi okuyan herkese teşekkür ederiz.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Shor, P. W. (1994). "Algorithms for quantum computation: discrete logarithms and factoring." #{emph[Proceedings of the 35th Annual Symposium on Foundations of Computer Science (FOCS)]}, 124–134. Genişletilmiş sürümü: #{emph[SIAM Journal on Computing]}, 26(5), 1997.]

#kaynak("2")[Grover, L. K. (1996). "A fast quantum mechanical algorithm for database search." #{emph[Proceedings of the 28th Annual ACM Symposium on Theory of Computing (STOC)]}, 212–219.]

#kaynak("3")[Gidney, C. ve Ekerå, M. (2021). "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits." #{emph[Quantum]}, 5, 433. (Ön baskı 2019.)]

#kaynak("4")[Gidney, C. (2025). "How to factor 2048 bit RSA integers with less than a million noisy qubits." arXiv:2505.15917, Mayıs 2025.]

#kaynak("5")[Roetteler, M., Naehrig, M., Svore, K. M. ve Lauter, K. (2017). "Quantum resource estimates for computing elliptic curve discrete logarithms." #{emph[Advances in Cryptology — ASIACRYPT 2017]}, LNCS 10625, 241–270.]

#kaynak("6")[Mosca, M. (2018). "Cybersecurity in an era with quantum computers: will we be ready?" #{emph[IEEE Security & Privacy]}, 16(5), 38–41.]

#kaynak("7")[NIST (2024). #{emph[FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard.]} 13 Ağustos 2024.]

#kaynak("8")[NIST (2024). #{emph[FIPS 204: Module-Lattice-Based Digital Signature Standard.]} 13 Ağustos 2024.]

#kaynak("9")[NIST (2024). #{emph[FIPS 205: Stateless Hash-Based Digital Signature Standard.]} 13 Ağustos 2024.]

#kaynak("10")[NIST (2026). #{emph[Transition to Post-Quantum Cryptography Standards.]} NIST IR 8547, son sürüm, Ekim 2026.]

#kaynak("11")[Cooper, D. A., Apon, D. C., Dang, Q. H., Davidson, M. S., Dworkin, M. J. ve Miller, C. A. (2020). #{emph[Recommendation for Stateful Hash-Based Signature Schemes.]} NIST SP 800-208, Ekim 2020.]

#kaynak("12")[Lamport, L. (1979). #{emph[Constructing Digital Signatures from a One Way Function.]} SRI International, Teknik Rapor CSL-98.]

#kaynak("13")[IETF (2025). #{emph[Internet X.509 Public Key Infrastructure — Algorithm Identifiers for the Module-Lattice-Based Digital Signature Algorithm (ML-DSA).]} RFC 9881, Ekim 2025.]

#kaynak("14")[IETF (2025). #{emph[Use of the SLH-DSA Signature Algorithm in the Cryptographic Message Syntax (CMS).]} RFC 9814, Temmuz 2025. Ayrıca: #{emph[Use of the ML-DSA Signature Algorithm in the Cryptographic Message Syntax (CMS)]}, RFC 9882, Ekim 2025.]

#kaynak("15")[Prorock, M. ve Steele, O. (2026). #{emph[ML-DSA for JSON Object Signing and Encryption (JOSE) and CBOR Object Signing and Encryption (COSE).]} IETF RFC 9964, Mayıs 2026.]

#kaynak("16")[ETSI (2026). #{emph[ETSI TS 119 312 V2.1.1: Electronic Signatures and Trust Infrastructures (ESI); Cryptographic Suites.]} Haziran 2026.]

#kaynak("17")[Avrupa Komisyonu (2024). #{emph[Kuantum sonrası kriptografiye geçiş için eşgüdümlü bir uygulama yol haritasına ilişkin 11 Nisan 2024 tarihli Tavsiye (AB) 2024\/1101.]} Avrupa Birliği Resmî Gazetesi.]

#kaynak("18")[NIS İşbirliği Grubu (2025). #{emph[A Coordinated Implementation Roadmap for the Transition to Post-Quantum Cryptography.]} 23 Haziran 2025.]

#kaynak("19")[ETSI (2020). #{emph[ETSI TR 103 619: CYBER; Migration strategies and recommendations to Quantum Safe schemes.]}]

#kaynak("20")[ETSI (2020). #{emph[ETSI TS 103 744: CYBER; Quantum-safe Hybrid Key Exchanges.]} İlk sürüm Aralık 2020; sonraki sürümler ML-KEM’i kapsar.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

+ #{strong[NIST IR 8547, #{emph[Transition to Post-Quantum Cryptography Standards]} (2026).]} Hangi algoritmanın ne zaman bırakılacağını ve yerine neyin geleceğini kısa tablolarla anlatır; geçişi planlayan herkes için başlangıç noktası.
+ #{strong[AB NIS İşbirliği Grubu, #{emph[A Coordinated Implementation Roadmap for the Transition to Post-Quantum Cryptography]} (2025).]} Avrupa’nın 2026, 2030 ve 2035 hedeflerini ve risk sınıflandırmasını anlatır.
+ #{strong[Mosca, #{emph[Cybersecurity in an era with quantum computers: will we be ready?]} (2018).]} Dört sayfalık, matematik gerektirmeyen ve "ne zaman başlamalıyız?" sorusuna en sade çerçeveyi veren yazı.
+ #{strong[FIPS 204’ün giriş bölümleri.]} ML-DSA’nın parametre setlerini ve kullanım yönergelerini doğrudan standarttan okumak için.
+ #{strong[ETSI TS 119 312 V2.1.1, Bölüm 6.]} Avrupa’da elektronik imza ve güven hizmetleri için kuantum sonrası algoritmaların ve karma takımların nasıl önerildiğini gösterir.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (16fr, 25fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Anahtar kapsülleme], [key encapsulation mechanism (KEM)], [İki tarafın açık bir kanal üzerinden ortak gizli anahtar oluşturmasını sağlayan yöntem],),
  ([Arşiv zaman damgası], [archive timestamp], [Bir belgenin ve imzasının belirli bir tarihte var olduğunu, daha güçlü bir algoritmayla kanıtlayan damga],),
  ([Ayrık logaritma], [discrete logarithm], [Eliptik eğri ve Diffie-Hellman kriptografisinin dayandığı, klasik olarak zor problem],),
  ([Dolanıklık], [entanglement], [Kübitlerin durumlarının birbirine bağlı olması],),
  ([Durum tutan imza], [stateful signature], [İmzalayanın hangi tek kullanımlık anahtarı kullandığını kaydetmek zorunda olduğu imza (LMS, XMSS)],),
  ([FN-DSA], [FFT over NTRU-Lattice-Based Digital Signature Algorithm], [FALCON’dan türetilen, küçük imzalı kafes tabanlı imza; standardı hazırlanıyor],),
  ([Girişim], [interference], [Kuantum genliklerinin birbirini güçlendirmesi ya da sönümlemesi],),
  ([Grover algoritması], [Grover’s algorithm], [Yapısız aramada karekök hızlanma sağlayan kuantum algoritması],),
  ([Hatalı öğrenme], [learning with errors (LWE)], [Gürültülü doğrusal denklemlerden gizli vektörü bulma problemi; kafes kriptografisinin temeli],),
  ([Kafes], [lattice], [Düzenli aralıklı noktalardan oluşan çok boyutlu yapı; kuantum sonrası algoritmaların bir ailesinin temeli],),
  ([Karma imza], [hybrid signature], [Aynı verinin hem klasik hem kuantum sonrası algoritmayla imzalanması; ikisi de geçerli olmalı],),
  ([Kripto çeviklik], [crypto agility], [Bir sistemin kriptografik algoritmasını, geri kalanını yeniden yazmadan değiştirebilmesi],),
  ([Kriptografik olarak anlamlı kuantum bilgisayar], [cryptographically relevant quantum computer (CRQC)], [Bugünkü açık anahtarlı kriptografiyi kırabilecek ölçekte, hatası düzeltilmiş kuantum bilgisayar],),
  ([Kübit], [qubit], [Kuantum bilgisayarın temel bilgi birimi],),
  ([Kuantum sonrası kriptografi], [post-quantum cryptography (PQC)], [Kuantum bilgisayarlara dayanıklı olduğu düşünülen, klasik bilgisayarlarda çalışan kriptografi],),
  ([Mantıksal kübit], [logical qubit], [Çok sayıda fiziksel kübitle hataları düzeltilerek oluşturulan güvenilir kübit],),
  ([Merkle ağacı], [Merkle tree], [Her düğümün çocuklarının özeti olduğu, birçok değeri tek bir köke bağlayan yapı],),
  ([ML-DSA], [Module-Lattice-Based Digital Signature Algorithm], [FIPS 204’teki kafes tabanlı imza standardı],),
  ([ML-KEM], [Module-Lattice-Based Key-Encapsulation Mechanism], [FIPS 203’teki kafes tabanlı anahtar kapsülleme standardı],),
  ([Shor algoritması], [Shor’s algorithm], [Çarpanlara ayırma ve ayrık logaritmayı verimli çözen kuantum algoritması],),
  ([SLH-DSA], [Stateless Hash-Based Digital Signature Algorithm], [FIPS 205’teki, yalnızca özet fonksiyonlarına dayanan imza standardı],),
  ([Süperpozisyon], [superposition], [Bir kübitin ölçülene kadar 0 ve 1’in birleşimi olan durumda bulunması],),
  ([Şimdi topla, sonra çöz], [harvest now, decrypt later], [Bugün şifreli veriyi kaydedip ileride kuantum bilgisayarla çözme saldırısı],),
))

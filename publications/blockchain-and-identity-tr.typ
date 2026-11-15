// A12 — Blokzincir ve Dijital Kimlik. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Blokzincir ve Dijital Kimlik",
  altbaslik: "Ne Zaman Gerekir, Ne Zaman Gerekmez? Defter, Tanık ve Silme Hakkı",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Ocak 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("blokzincir", "dağıtık defter", "dijital kimlik", "merkeziyetsiz tanımlayıcı", "silme hakkı", "GDPR", "KVKK", "EBSI", "şeffaflık günlüğü", "çapa", "izinli zincir",),
  atif: "Karataş, B. (2027). Blokzincir ve Dijital Kimlik: Ne Zaman Gerekir, Ne Zaman Gerekmez? Defter, Tanık ve Silme Hakkı. Tamga Network Akademik Çalışmalar, A12. https://tamga.network/files/publications/blockchain-and-identity-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Blokzincir, son on beş yılda dijital kimlik tartışmalarına en sık konuk olan teknolojilerden biri oldu. Vaadi güçlüydü: kimsenin tek başına sahip olmadığı, değiştirilemeyen ve herkesin okuyabildiği bir defter, kimliğin güven kaynağı olabilirdi. Bu vaatle kimlik defterleri, merkeziyetsiz tanımlayıcı kayıtları ve zincir üzerinde tutulan iptal kayıtları kuruldu. Aradan geçen yıllarda sahadan gelen dersler daha karışık bir tablo çizdi. Kişisel veriyi değişmez bir deftere yazmak, Avrupa’nın Genel Veri Koruma Tüzüğü’nün ve Türkiye’nin Kişisel Verilerin Korunması Kanunu’nun tanıdığı silme hakkıyla çatıştı. Yıllarca işletilen bazı kimlik defterleri kapandı. Avrupa Birliği, kendi blokzincir altyapısını kurmuş olmasına rağmen, dijital kimlik cüzdanının güvenini zincire değil imzalı güven listelerine dayandırdı.

Bu yazı, hiçbir ön bilgi varsaymadan, blokzincirin ne olduğunu ve kimlik için ne vaat ettiğini anlatıyor; özet zincirlerini, Merkle ağaçlarını ve uzlaşma algoritmalarını küçük örneklerle açıyor. Sonra zincirin kimlikte önerilen dört rolünü (kimlik defteri, tanımlayıcı kaydı, iptal kaydı, denetim izi) tek tek tartıyor; silme hakkı sorununu ve Avrupa’nın EBSI deneyiminden çıkan dersleri inceliyor. Vardığı yer şu: Zincir güvenin kaynağı olmaya uygun değildir, ama imzalı kayıtların geriye dönük değiştirilmediğine tanıklık etmek için değerli olabilir. Yazının sonunda zincirin ne zaman değer kattığını sınamak için bir karar çerçevesi öneriyoruz.
  ],
)

= Giriş: Toplantı Odasındaki Soru

Nurlan, Almatı’da yaşayan bir yazılım mimarı. Birkaç ülkeden üniversitelerin kurduğu bir çalışma grubunda teknik sorumlu olarak çalışıyor. Grubun amacı basit görünüyor: Bir ülkede verilen diplomanın başka bir ülkede, kâğıt, noter ve apostil zinciri olmadan doğrulanabilmesi. Dizinin ilk yazısından tanıdığımız Aynur gibi binlerce öğrenci her yıl Bakü’den İstanbul’a, Taşkent’ten Almatı’ya, Bişkek’ten Ankara’ya gidiyor ve her seferinde aynı belgeleri yeniden onaylatmak zorunda kalıyor.

İlk toplantıda masaya hemen bir öneri geliyor: "Diplomaları blokzincire yazalım. Kimse değiştiremez, herkes görebilir, kimse tek başına sahip olmaz." Odadaki herkes başını sallıyor; öneri kulağa hem modern hem de güvenli geliyor. Nurlan ise not defterine birkaç soru yazıyor: Zincire tam olarak ne yazılacak? Bir öğrenci kaydının silinmesini isterse ne olacak? Zinciri kim işletecek ve bir üniversite yanlış bir diploma yazarsa onu kim düzeltecek? Doğrulama yapan kurum zincire baktığında, aslında neye güvenmiş olacak?

Bu yazı, Nurlan’ın not defterindeki soruların cevabını arıyor. Blokzincir hakkında iki yaygın tutum var. Birincisi onu her güven sorununun ilacı gibi görür; ikincisi ise, özellikle kripto paralar etrafındaki gürültü yüzünden, onu tümden reddeder. İkisi de işe yaramaz. Blokzincir bir veri yapısı ile bir uzlaşma yönteminin birleşimidir; bazı işleri çok iyi yapar, bazılarını ise hiç yapamaz. Kimlik alanında sorulması gereken soru "blokzincir iyi mi, kötü mü?" sorusu olamaz. Doğru soru şudur: #{strong[Bu işte zincirin yaptığı şeyi başka bir araç daha basit ve daha güvenli yapabilir mi?]}

Yazının planı şöyle. Bölüm 2’de blokzinciri sıfırdan, parçalarına ayırarak anlatıyoruz: özet zinciri, Merkle ağacı ve uzlaşma. Bölüm 3, zincirin kimlik için öne sürülen üç büyük vaadini (merkeziyetsizlik, değişmezlik, şeffaflık) tek tek tartıyor. Bölüm 4, zincirin kimlikte üstlenmesi önerilen dört rolü ele alıyor ve merkeziyetsiz tanımlayıcılar ile zincir tabanlı kimlik defterlerinin hikâyesini anlatıyor. Bölüm 5, kişisel veri ile değişmez defter arasındaki hukuki ve teknik çatışmayı inceliyor. Bölüm 6, Avrupa Birliği’nin tutumunu ve EBSI deneyimini; Bölüm 7, izinli zincirlerin ve şeffaflık günlüklerinin "tanık" rolünü anlatıyor. Bölüm 8 bir karar çerçevesi öneriyor, Bölüm 9 seçenekleri karşılaştırıyor, Bölüm 10 açık soruları sıralıyor. Bölüm 11’de bu yazıyı yayımlayan Tamga Network’ün bu konudaki yerini kısaca anlatıyoruz.

#kutu("onemli", [Bu yazının tezi tek cümlede])[
Bir dijital kimlik sisteminde güvenin kaynağı, bir kurumun yetkisini tanıyan kurallar ve o kurumun attığı imzadır. Blokzincir bu kaynağın yerini tutamaz; ama imzalı kayıtların sonradan sessizce değiştirilmediğine birden çok bağımsız tarafın tanıklık etmesini sağlayabilir. Zincir güvenin #{strong[kaynağı]} olmaz; en fazla #{strong[tanığı]} olur.
]

= Blokzincir Nedir? Parçalarına Ayırarak

"Blokzincir" kelimesi çoğu zaman tek bir şeymiş gibi kullanılır. Oysa birbirinden bağımsız olarak icat edilmiş üç fikrin birleşimidir: kayıtları birbirine kriptografik olarak bağlayan #{strong[özet zinciri]}, çok sayıda kaydı tek bir parmak izinde toplayan #{strong[Merkle ağacı]} ve birbirine güvenmeyen bilgisayarların hangi kaydın geçerli olduğu üzerinde anlaşmasını sağlayan #{strong[uzlaşma yöntemi]}. Bu üç parçayı ayrı ayrı anlamak, zincirin kimlikte neyi yapıp neyi yapamayacağını görmenin en kısa yoludur; çünkü çoğu zaman kimlik sisteminin ihtiyaç duyduğu şey bu üç parçadan yalnızca biri ya da ikisidir.

== Özet zinciri: Her sayfa bir öncekini gösterir

Dizinin ilk yazısında #{strong[özet fonksiyonunu]} (#{emph[hash function]}) tanıtmıştık: istenen uzunlukta bir girdiden sabit uzunlukta bir parmak izi üreten, tek yönlü ve girdideki en küçük değişikliğe büyük tepki veren bir işlem. Özet zinciri bu aracın çok basit bir kullanımıdır.

Eski usul, sayfaları numaralı bir defter düşünelim. Defterin her sayfasının en üstüne, bir önceki sayfanın özetini yazıyoruz. İkinci sayfanın başında birinci sayfanın parmak izi, üçüncü sayfanın başında ikinci sayfanın parmak izi duruyor. Şimdi biri geriye dönüp birinci sayfadaki tek bir rakamı değiştirmek istesin. Birinci sayfanın özeti değişir; artık ikinci sayfanın başındaki değerle tutmaz. Değişikliği gizlemek için ikinci sayfanın başını da değiştirmesi gerekir; bu kez ikinci sayfanın özeti değişir ve üçüncü sayfayla tutmaz. Yani geçmişteki tek bir değişiklik, ondan sonraki #{strong[bütün]} sayfaları değiştirmeyi gerektirir (Şekil 1).

#sekil(1, [Özet zinciri: her blok bir öncekinin özetini taşır], "figures/a12/sekil-1.svg", yarim: false)

Bu yapının ne sağladığını dikkatle söylemek gerekir. Özet zinciri değişikliği #{strong[imkânsız]} kılmaz; değişikliği #{strong[fark edilir]} kılar. Defteri elinde tutan kişi bütün sayfaları baştan yazabilir. Ama defterin son sayfasının özetini daha önce başka birine göstermişse, yeniden yazılan defterin son özeti eskisiyle tutmayacağı için sahtekârlık ortaya çıkar. İngilizcede bu özelliğe #{emph[tamper-evident]}, yani "kurcalandığı belli olan" denir. Bu ayrım yazının geri kalanı için çok önemlidir: Değişmezlik, defterin kendisinden değil, defterin son hâlini #{strong[başkalarının da bilmesinden]} gelir.

#kutu("teknik", [Özet zinciri tek satırda])[
Hesapladığımız şey, defterdeki her bloğun parmak izidir. $H$ özet fonksiyonu, $‖$ iki değeri yan yana eklemek, $h_i$ de $i$’inci bloğun özeti olsun. Her blok bir önceki bloğun özetini kendi içinde taşıdığı için özet şöyle hesaplanır:

#formul[$ h_i = H(h_(i-1) ‖ "kayıtlar"_i ‖ "zaman"_i) $]

Birinci bloktaki bir kayıt değiştirilirse, bloğun yeni özetine $h'_1$ diyelim. $h_1$ ikinci bloğun girdisi olduğu için ikinci bloğun özeti de değişir ve değişiklik son bloğa kadar zincirleme ilerler:

#formul[$ h'_1 != h_1 quad ==> quad h'_2 != h_2 quad ==> quad dots quad ==> quad h'_n != h_n $]

Bu ne demek? Son özet $h_n$’i önceden bilen biri, defterin herhangi bir yerinde değişiklik yapılıp yapılmadığını tek bir karşılaştırmayla anlar; bütün sayfaları tek tek okuması gerekmez.
]

#kutu("tarihce", [Blokzincirden önce zincir: zaman damgası ve gazete ilanı])[
Özet zinciri fikri kripto paralardan yaklaşık yirmi yıl eskidir. Stuart Haber ve W. Scott Stornetta, 1991’de #{emph[Journal of Cryptology]} dergisinde yayımladıkları "How to Time-Stamp a Digital Document" adlı makalede, dijital belgelere güvenilir zaman damgası vurmak için her damganın bir öncekinin özetini içerdiği bir zincir önerdi \[1\]. İki yıl sonra yayımlanan bir çalışmada çok sayıda belgeyi tek bir özette toplamak için Merkle ağaçlarını da bu yönteme eklediler. Haber ve Stornetta’nın kurduğu şirketin, zincirin en son özetini 1990’ların ortasından itibaren her hafta bir ABD gazetesinin ilan sayfasında yayımladığı anlatılır. Fikir zarifti: Gazetenin binlerce basılı nüshası, özetin o gün var olduğuna tanıklık ediyordu ve kimse o nüshaların hepsini geri toplayıp değiştiremezdi. 2008’de yayımlanan Bitcoin makalesinin kaynakçasında Haber ve Stornetta’nın çalışmaları yer alır \[2\]. Yani blokzincirin en eski parçası, bir #{strong[tanıklık]} düzeneği olarak doğdu.
]

== Merkle ağacı: Binlerce kaydı tek parmak izinde toplamak

Bir bloğa çoğu zaman binlerce kayıt girer. Her kaydı ayrı ayrı zincirlemek yerine hepsini tek bir özette toplamanın zarif bir yolu vardır: #{strong[Merkle ağacı]}. Adını, bu yapıyı 1970’lerin sonunda tanımlayan ve 1987’deki bir kriptografi konferansında sunduğu makalede bir imza şemasının parçası olarak anlatan Ralph Merkle’den alır \[3\].

Fikir şöyle işler. Kayıtların her birinin özeti alınır; bunlar ağacın yapraklarıdır. Sonra yapraklar ikişer ikişer eşlenir ve her çiftin birleşiminin özeti alınır. Bu işlem, yukarıda tek bir özet kalana kadar tekrarlanır. En tepedeki bu değere #{strong[kök özet]} (#{emph[Merkle root]}) denir. Kök özet, ağaçtaki bütün kayıtların parmak izidir: tek bir kayıttaki tek bir harf değişse, kök değişir.

Merkle ağacının asıl gücü, bir kaydın ağaçta bulunduğunu kanıtlamanın çok ucuz olmasıdır. Bir kaydın ağaçta olduğunu göstermek için bütün kayıtları göndermek gerekmez; yalnızca kayıttan köke giden yol üzerindeki "kardeş" özetleri göndermek yeter. Bu kanıta #{strong[dahil olma kanıtı]} (#{emph[inclusion proof]}) denir (Şekil 2).

#sekil(2, [Merkle ağacı ve bir kaydın ağaçta bulunduğunu gösteren dahil olma kanıtı], "figures/a12/sekil-2.svg", yarim: false)

#kutu("teknik", [Dahil olma kanıtı adım adım])[
Sekiz kayıtlı bir ağaçta K3 kaydının ağaçta olduğunu kanıtlamak isteyelim. $H$ özet fonksiyonu, $‖$ iki değeri yan yana eklemek anlamına gelsin. Kanıtı isteyen kişinin elinde yalnızca yayımlanmış kök özet var. Doğrulayan, K3’ten başlayıp kökü kendisi yeniden hesaplar; kanıtı veren taraf ona yalnızca bu hesap için eksik olan üç "kardeş" özeti gönderir:

#adimlar((
  ("Günlük → Doğrulayan", [#{strong[Kanıt.]} K3’ten köke giden yoldaki kardeş özetler gönderilir.], $K_4, quad H(1,2), quad H(5"–"8)$),
  ("Doğrulayan", [#{strong[Birinci kat.]} K3 kendi kardeşiyle birleştirilir.], $a = H(K_3 ‖ K_4) = H(3,4)$),
  ("Doğrulayan", [#{strong[İkinci kat.]} Sonuç, soldaki kardeşle birleştirilir.], $b = H(H(1,2) ‖ a) = H(1"–"4)$),
  ("Doğrulayan", [#{strong[Kök.]} Sonuç, sağdaki kardeşle birleştirilir.], $c = H(b ‖ H(5"–"8))$),
  ("Doğrulayan", [#{strong[Karşılaştırma.]} Eşitse K3 ağaçtadır.], $c attach(=, t: ?) "yayımlanmış kök"$),
))

Kanıt ne kadar uzun olur? Ağacın her katında bir kardeş özet gerekir ve $n$ kayıtlı bir ağaçta yaklaşık $log_2 n$ kat vardır. Bir milyonluk bir ağaç için hesap şöyledir:

#formul[$ n &= 2^20 = "1.048.576" "kayıt" \
"kanıt uzunluğu" &= log_2 n = 20 "özet" \
"boyut (SHA-256)" &= 20 dot 32 "bayt" = 640 "bayt" $]

Bir milyon kaydı indirmek yerine 640 bayt indirip aynı güvenceyi almak, Merkle ağacını hem blokzincirlerin hem de bu yazının ilerleyen bölümlerinde göreceğimiz şeffaflık günlüklerinin temel yapı taşı yapar.

İkinci önemli kanıt türü #{strong[tutarlılık kanıtıdır]} (#{emph[consistency proof]}). Bir günlüğün dün yayımlanan kökü ile bugün yayımlanan kökü arasında, yalnızca #{strong[ekleme]} yapıldığını, eski kayıtların hiçbirinin değiştirilmediğini ya da silinmediğini gösterir. Bu kanıt da birkaç düzine özetten oluşur.
]

== Uzlaşma: Birbirine güvenmeyenler aynı deftere nasıl yazar?

Özet zinciri ve Merkle ağacı tek bir kişinin tuttuğu defterde de çalışır. Blokzinciri farklı kılan üçüncü parça, defterin #{strong[birçok bilgisayarda aynı anda]} tutulması ve bu bilgisayarların sıradaki bloğun ne olacağı üzerinde, birbirlerine güvenmeden, anlaşabilmesidir. Bu soruna dağıtık sistemler alanında #{strong[uzlaşma]} (#{emph[consensus]}) denir.

Sorunun klasik anlatımı Leslie Lamport, Robert Shostak ve Marshall Pease’in 1982’de yayımladığı "Bizans Generalleri Problemi"dir \[4\]. Bir şehri kuşatan generaller saldırıp saldırmamaya ortak karar vermek zorundadır; ama aralarında hain olanlar vardır ve haberciler yalan söyleyebilir. Makalenin vardığı sonuçlardan biri, imzasız mesajlarla, $f$ sayıda hainin varlığında doğru generallerin anlaşabilmesi için toplamda en az $3f + 1$ general gerektiğidir. Bu sayı, bugün izinli blokzincirlerin tasarımında hâlâ belirleyicidir.

Uzlaşma yöntemleri, zincire kimin yazabildiğine göre iki büyük aileye ayrılır.

#{strong[İzinsiz]} (#{emph[permissionless]}) zincirlerde katılımcılar önceden bilinmez; herkes bir bilgisayar çalıştırıp katılabilir. Kimin kim olduğu bilinmediği için oy saymak işe yaramaz: Bir saldırgan binlerce sahte katılımcı yaratabilir. Bitcoin bu sorunu #{strong[iş ispatı]} (#{emph[proof of work]}) ile çözdü: Sıradaki bloğu yazma hakkı, çok büyük miktarda hesaplama yaparak bir bulmacayı ilk çözene verilir. Böylece oy, kişi sayısıyla değil harcanan hesaplama gücüyle ölçülür. Bu yöntemin bedeli büyük enerji tüketimidir; daha yeni zincirler bunun yerine katılımcıların teminat yatırdığı başka yöntemler kullanır. İzinsiz zincirlerde bir kaydın kesinleşmesi olasılığa dayanır: Üzerine yeni bloklar eklendikçe geri alınma olasılığı azalır.

#{strong[İzinli]} (#{emph[permissioned]}) zincirlerde ise bloğu onaylayan katılımcılar, yani #{strong[doğrulayıcılar]} (#{emph[validators]}), önceden bellidir ve kimlikleri bilinir. Bu durumda Lamport’un problemi doğrudan uygulanabilir: Doğrulayıcılar oy verir, yeterli çoğunluk aynı bloğu imzaladığında blok kesinleşir. Bu ailenin yaygın örneklerinden biri, açık kaynak Ethereum istemcisi Besu’nun (eski adıyla Hyperledger Besu) desteklediği #{strong[QBFT]} algoritmasıdır.

#kutu("teknik", [QBFT’de kaç doğrulayıcı kaç hataya dayanır?])[
QBFT gibi Bizans hatasına dayanıklı (#{emph[Byzantine fault tolerant, BFT]}) algoritmalarda bir blok, doğrulayıcıların üçte ikisinden fazlası onu imzaladığında kesinleşir. Besu belgelerine göre ağın $f$ sayıda hatalı ya da kötü niyetli doğrulayıcıya dayanabilmesi için $n = 3f + 1$ doğrulayıcı gerekir \[5\]. Soruyu ters çevirip "elimizdeki $n$ doğrulayıcı en fazla kaç hatalı doğrulayıcıya dayanır?" diye sorarsak cevap, $(n - 1) slash 3$’ün tam kısmıdır:

#formul[$ f = floor((n - 1) / 3) $]

#tablo([], (14fr, 14fr), ([Doğrulayıcı sayısı $n$], [Dayanılan hatalı doğrulayıcı $f$],), (
  ([4], [1],),
  ([7], [2],),
  ([10], [3],),
))

Arada kalan sayılar bir şey kazandırmaz: Beş ya da altı doğrulayıcılı bir ağ da yalnızca bir hataya dayanır.

İki ya da üç doğrulayıcılı bir ağ çalışabilir, ama Bizans hatasına dayanıklı sayılmaz: Biri susarsa ya da yanlış davranırsa yeterli çoğunluk kalmaz. Bu küçük hesap, kimlik alanında sık gözden kaçan bir noktayı gösterir: İzinli bir zincirin güvenliği, doğrulayıcıların #{strong[sayısına]} ve #{strong[birbirinden gerçekten bağımsız]} olmasına bağlıdır. Aynı kurumun dört ayrı sunucuda çalıştırdığı dört doğrulayıcı, matematik açısından dört, güven açısından birdir.
]

== Akıllı sözleşme

Son bir kavram daha: #{strong[Akıllı sözleşme]} (#{emph[smart contract]}), zincir üzerinde saklanan ve her doğrulayıcının aynı biçimde çalıştırdığı küçük bir programdır. Kimin hangi kaydı yazabileceğini, bir kaydın hangi koşulda geçerli sayılacağını bu programlar belirler. Adı yanıltıcıdır: Hukuki anlamda bir sözleşme değildir, yalnızca herkesin aynı sonucu hesapladığı bir kuraldır. Kimlik sistemlerinde akıllı sözleşmeler genellikle "bu tanımlayıcıyı yalnızca sahibi güncelleyebilir" ya da "bu özet ancak şu yazıcılardan yeterli sayıda imza gelirse onaylı sayılır" gibi kuralları uygulamak için kullanılır.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Blokzincir üç fikrin birleşimidir: kayıtları birbirine bağlayan #{strong[özet zinciri]}, çok kaydı tek parmak izinde toplayan #{strong[Merkle ağacı]} ve birbirine güvenmeyen bilgisayarları anlaştıran #{strong[uzlaşma]}. İlk ikisi tek bir kurumun tuttuğu bir günlükte de kullanılabilir ve zincirin "kurcalanınca belli olma" özelliğinin asıl kaynağıdır. Uzlaşma ise ancak kayıtları gerçekten #{strong[birden çok bağımsız taraf]} onaylıyorsa bir şey katar.
]

= Üç Vaat ve Gerçekte Sağladıkları

Blokzincirin kimlik alanındaki çekiciliği üç kelimeyle özetlenir: merkeziyetsizlik, değişmezlik ve şeffaflık. Her üçü de kimlik sistemleri için gerçekten önemli değerlerdir. Ama her biri zincir bağlamında belirli bir anlama gelir ve bu anlam, kimlik sisteminin ihtiyaç duyduğu şeyle her zaman örtüşmez.

== Merkeziyetsizlik: Kimden bağımsız?

Merkeziyetsizlik vaadi, hiçbir kurumun sistemi tek başına kontrol edememesidir. Kimlik için bu çok değerli bir hedeftir; dizinin ilk yazısında federasyon döneminde kimlik sağlayıcının nasıl "her kapıda bekleyen bir kapıcıya" dönüştüğünü görmüştük.

Ama bir kimlik sisteminde merkeziyetsizlik iki ayrı katmanda düşünülmelidir. Birincisi #{strong[altyapı]} katmanıdır: Defteri kim işletiyor, kim kapatabilir? İkincisi #{strong[yetki]} katmanıdır: Kimin diploma, kimin kimlik belgesi vermeye yetkili olduğuna kim karar veriyor? Blokzincir yalnızca birinci katmanı merkeziyetsizleştirebilir. Bir üniversitenin diploma vermeye yetkili olduğunu söyleyen, o ülkenin yükseköğretim mevzuatı ve onu uygulayan kurumdur; bu yetki zincire yazılsa bile kaynağı zincir olmaz. Zincir yalnızca birinin bu yetkiyi #{strong[beyan ettiğini]} kaydeder.

İkinci bir incelik de şudur: İzinli bir zincir, doğrulayıcıları seçen bir yönetişim yapısı gerektirir. Kimin doğrulayıcı olacağına karar veren bir kurul varsa, merkez ortadan kalkmamış, zincirin bir katman üstüne taşınmıştır. Bu kötü bir şey olmak zorunda değildir; ama "merkeziyetsiz" kelimesinin bu durumda neyi kastettiği açıkça söylenmelidir.

== Değişmezlik: Bir özellik mi, bir yük mü?

Bölüm 2.1’de gördüğümüz gibi zincirin değişmezliği aslında "kurcalanınca belli olma" özelliğidir ve yeterince çok bağımsız taraf aynı kaydı tuttuğu sürece geçerlidir. Bu özellik, #{strong[geçmişin sessizce yeniden yazılmasını]} önlemek istediğimiz her yerde çok değerlidir: Bir güven listesinin dünkü hâlini bugün inkâr etmek, bir sertifikanın verildiğini gizlemek, bir denetim kaydını sonradan silmek.

Ama kimlik sistemlerinde bazı şeylerin değişmesi #{strong[gerekir]}. İnsanlar ad değiştirir, adres değiştirir; belgeler yanlış düzenlenir ve düzeltilir; kişiler verilerinin silinmesini ister. Değişmezlik, değişmesi gereken bir şeye uygulandığında bir güvence olmaktan çıkar, bir yüke dönüşür. Bu yükün en ağır hâli, Bölüm 5’te ayrıntılı anlatacağımız silme hakkıyla çatışmadır.

Bir başka nokta: Zincirin değişmezliği, zincire yazılan bilginin #{strong[doğru]} olduğunu söylemez. Yanlış bir diploma kaydı zincire yazılırsa, yanlış olarak değişmez kalır. Değişmezlik doğruluk üretmez, yalnızca bir kez yazılanın korunmasını sağlar. Bu yüzden "zincire yazılmışsa doğrudur" düşüncesi kimlikte belki de en tehlikeli yanılgıdır.

== Şeffaflık: Herkes her şeyi görürse

Herkese açık zincirlerde her kayıt herkes tarafından okunabilir. Bu, kurumların hesap verebilirliği için güçlü bir araçtır: Bir kurumun ne zaman, hangi kaydı yayımladığını herkes denetleyebilir.

Kişiler için ise tablo tersine döner. Dizinin ilk yazısında, iyi bir kimlik sisteminin kişinin farklı bağlamlardaki kısmi kimliklerini birbirinden ayrı tutması gerektiğini söylemiştik. Herkese açık ve kalıcı bir defter, bu ayrımı korumanın değil, yıkmanın aracıdır. Bir kişiye ait tek bir tanımlayıcı bile, farklı işlemlerde tekrar göründüğünde, o işlemleri birbirine bağlamaya yeter. Bu soruna #{strong[bağlanabilirlik]} (#{emph[linkability]}) denir ve dizinin beşinci yazısının konusudur. Değişmez bir defterde bu bağlar sonsuza dek kurulabilir durumda kalır.

#tablo([#{strong[Tablo 1.]} Blokzincirin üç vaadi, gerçekte sağladığı ve kimlikteki bedeli.], (15fr, 48fr, 43fr, 31fr), ([Ölçüt], [Merkeziyetsizlik], [Değişmezlik], [Şeffaflık],), (
  ([Gerçekte sağladığı], [Defteri tek bir işletmecinin kapatamaması ya da değiştirememesi], [Geçmişteki değişikliğin fark edilmesi (kurcalanınca belli olma)], [Herkesin kayıtları okuyabilmesi],),
  ([Kimlik için değeri], [Altyapının tek kuruma bağımlı olmaması], [Kayıtların geriye dönük inkâr edilememesi], [Kurumların hesap verebilirliği],),
  ([Kimlikteki bedeli], [Yetkiyi merkeziyetsizleştirmez; doğrulayıcıları seçen bir yönetişim gerekir], [Düzeltme ve silme zorlaşır; yanlış kayıt da kalıcı olur], [Kişiye ait her iz kalıcı olarak bağlanabilir hâle gelir],),
))

#kutu("ornek", [Nurlan’ın ilk notu])[
Toplantıdan sonra Nurlan not defterine şunu yazıyor: "Zincir üç şey veriyor. Birincisi, kimse defteri tek başına kapatamaz. İkincisi, kimse geçmişi sessizce değiştiremez. Üçüncüsü, herkes okuyabilir. Üniversiteler için üçü de iyi. Öğrenciler için ikincisi ve üçüncüsü tehlikeli. O hâlde zincire üniversiteler hakkında bir şeyler yazılabilir, öğrenciler hakkında hiçbir şey yazılmamalı."
]

= Zincirin Kimlikte Önerilen Dört Rolü

Kimlik alanında blokzincire biçilen roller, kabaca dört başlıkta toplanabilir. Her birinin zincire ne yazdığı, kimin hakkında yazdığı ve zincirin o işte gerçekten neyi değiştirdiği farklıdır. Bu bölümde dördünü sırayla ele alıyoruz.

== Birinci rol: Kimlik defteri

En iddialı öneri, kişilerin kimlik bilgilerini, diplomalarını ya da sağlık kayıtlarını doğrudan zincire yazmaktır. Toplantıdaki "diplomaları blokzincire yazalım" önerisi bu türdendir. Bu yaklaşımın teknik çekiciliği açıktır: Bir doğrulayan, diplomanın gerçek olup olmadığını öğrenmek için zincire bakar ve kaydı orada bulur.

Ama bu rol, hem hukuki hem teknik açıdan en zayıf olanıdır. Hukuki tarafı Bölüm 5’in konusu. Teknik tarafta ise iki sorun var. Birincisi, zincir kaydın #{strong[kimin]} olduğunu söylemez; yalnızca kaydın var olduğunu söyler. Aynur’un diplomasının zincirde bulunması, onu gösteren kişinin Aynur olduğunu kanıtlamaz; bunun için yine kişinin bir anahtarla kendini kanıtlaması gerekir. İkincisi, doğrulayan zincire bakarak bir kayıt aradığında, hangi kaydı aradığını ağ üzerinden belli eder; eğer zinciri kendisi işletmiyorsa, bir başkasının sunucusuna "Aynur’un diplomasını arıyorum" demiş olur. Dizinin ilk yazısında anlattığımız "eve telefon etme" sorunu, bu kez verene değil zincir sunucusuna yönelmiş biçimde geri döner.

Üstelik kimlik defteri, dizinin ilk yazısında anlattığımız üçgen modelin sunduğu çözümü gereksiz yere karmaşıklaştırır. Üçgen modelde diploma, üniversitenin imzasıyla Aynur’un cüzdanında durur; doğrulayan imzayı kontrol eder ve kimseye sormaz. İmza zaten belgenin değiştirilmediğini ve kimin verdiğini kanıtlar. Diplomayı ayrıca zincire yazmak bu kanıta bir şey eklemez; yalnızca kişisel veriyi silinemez bir yere koyar.

== İkinci rol: Tanımlayıcı kaydı ve merkeziyetsiz tanımlayıcılar

Kendi kendine egemen kimlik hareketinin zincire yüklediği asıl rol, belge veren değil #{strong[tanımlayan]} bir roldü. Dizinin ilk yazısında #{strong[merkeziyetsiz tanımlayıcıyı]} (#{emph[Decentralized Identifier, DID]}) tanıtmıştık: bir kişinin ya da kurumun herhangi bir merkezî kayıt kurumuna bağlı olmadan oluşturabildiği, çözüldüğünde açık anahtarları içeren bir #{strong[DID belgesi]} veren tanımlayıcı. W3C, DID 1.0 belirtimini 19 Temmuz 2022’de öneri olarak yayımladı; 1.1 sürümü Mart 2026’da aday öneri aşamasına geldi \[6\].

DID belirtimi, belgenin nerede ve nasıl tutulacağını kendisi söylemez; bu işi #{strong[DID yöntemlerine]} (#{emph[DID methods]}) bırakır. W3C’nin tuttuğu DID yöntemleri listesinde, bu yazının hazırlandığı tarihte iki yüzü aşkın kayıt bulunuyor \[7\]. Bu yöntemler, tanımlayıcının arkasındaki belgeyi nerede tuttuklarına göre üç gruba ayrılabilir (Şekil 3):

- #{strong[Anahtarın kendisinde.]} #{raw("did:key")} yöntemi, açık anahtarı doğrudan tanımlayıcının içine yazar. DID belgesi, tanımlayıcıdan hesaplanarak üretilir; ne bir sunucuya ne bir zincire ihtiyaç vardır. Bedeli şudur: Anahtar değiştirilemez, yeni anahtar yeni tanımlayıcı demektir.
- #{strong[Bir web sunucusunda.]} #{raw("did:web")} yöntemi, DID belgesini bir alan adının altındaki bilinen bir adreste yayımlar. #{raw("did:web:ornek-universite.edu")} gibi bir tanımlayıcı, o alan adının altındaki #{raw("/.well-known/did.json")} adresindeki belgeye çözülür. Güven, alan adının ve onun TLS sertifikasının güvenine dayanır; yani internetin bugünkü güven altyapısına.
- #{strong[Bir zincirde.]} #{raw("did:indy")}, #{raw("did:ebsi")} ya da Bitcoin üzerine kurulu #{raw("did:ion")} gibi yöntemler, DID belgesini ya da onun değişikliklerini bir defterde tutar. Anahtar değişikliği defterde kayıt altına alınır; tanımlayıcı aynı kalır.

#sekil(3, [DID yöntemleri: tanımlayıcının arkasındaki belge nerede duruyor?], "figures/a12/sekil-3.svg", yarim: false)

Şekil 3’ün altındaki bant, DID’lerin kimlik için neden tek başına yetmediğini gösterir. Hangi yöntem seçilirse seçilsin, DID yalnızca "bu tanımlayıcı şu anahtara sahip" der. "Bu tanımlayıcı bir üniversiteye ait ve o üniversite diploma vermeye yetkili" demez. Bu ikinci cümleyi kuran şey bir #{strong[güven çerçevesidir]}: kimin hangi rolde yetkili olduğunu söyleyen kurallar ve o kuralları uygulayan bir otorite.

#kutu("teknik", [Bir DID belgesinin içi])[
Bir üniversitenin #{raw("did:web")} tanımlayıcısının çözülmesiyle elde edilen DID belgesi, sadeleştirilmiş olarak şöyle görünebilir (değerler örnektir):

#kod("json", "{
  \"@context\": [\"https://www.w3.org/ns/did/v1\"],
  \"id\": \"did:web:ornek-universite.edu\",
  \"verificationMethod\": [{
    \"id\": \"did:web:ornek-universite.edu#imza-2026\",
    \"type\": \"JsonWebKey\",
    \"controller\": \"did:web:ornek-universite.edu\",
    \"publicKeyJwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"…\", \"y\": \"…\" }
  }],
  \"assertionMethod\": [\"did:web:ornek-universite.edu#imza-2026\"]
}", baslik: "Örnek: bir üniversitenin did:web tanımlayıcısından çözülen DID belgesi")

- #{raw("id")}: tanımlayıcının kendisi.
- #{raw("verificationMethod")}: tanımlayıcıya bağlı anahtarlar. Burada bir eliptik eğri (P-256) açık anahtarı JWK biçiminde duruyor.
- #{raw("controller")}: bu anahtarı kimin denetlediği.
- #{raw("assertionMethod")}: hangi anahtarın "beyan" (örneğin belge imzalama) için kullanılabileceği.

Belgenin hiçbir yerinde "bu bir üniversitedir" ya da "diploma verebilir" bilgisi yoktur. Bir zincir yöntemi kullanılsaydı fark yalnızca bu belgenin #{strong[nerede]} durduğu olurdu; içeriği yine aynı soruyu açık bırakırdı.
]

#{strong[Zincir defterlerinin hikâyesi.]} DID ve zincir fikrinin en kapsamlı uygulamalarından biri, Hyperledger Indy yazılımı üzerine kurulan ve izinli bir doğrulayıcı kümesiyle işletilen kamu kimlik defterleriydi. Bu ailenin en bilinen örneği Sovrin MainNet’tir. Bir vakıf tarafından yönetilen ve dünyanın farklı yerlerindeki gönüllü kurumların doğrulayıcı çalıştırdığı bu ağ, kendi kendine egemen kimlik hareketinin uzun süre amiral gemisi gibi görüldü. Defterde kişilerin belgeleri tutulmuyordu; kurumların tanımlayıcıları, belge şemaları ve iptal kayıtları tutuluyordu.

Bu tasarımın sahadaki seyri öğreticidir. Vakıf, yaklaşık yedi yıllık işletmenin ardından Şubat 2025’te ağın büyük olasılıkla 31 Mart 2025’e kadar kapatılacağını duyurdu. Gerekçeler arasında kullanımın azalması, 2024 boyunca ağa yeni bir işlem onaylayıcı kurumun katılmaması, merkeziyetsiz kimlik alanındaki düzenleyici belirsizlik ve doğrulayıcı işletmecilerin yönetişime sınırlı katılımı sayılıyordu \[8\]. Vakıf Mayıs 2025’te feshedildi. Vakfın Ocak 2026’daki açıklamasına göre defter artık salt okunur bir arşiv olarak duruyor, bütün düğümleri tek bir şirket işletiyor ve defter tek bir bulut sunucusunda çalışıyor \[8\]. Kimsenin tek başına kapatamayacağı bir altyapı olarak kurulan defter, sonunda tek bir işletmecinin elinde kaldı.

Benzer bir yön değişikliği büyük bulut sağlayıcılarının kimlik ürünlerinde de görüldü. Bitcoin üzerine kurulu #{raw("did:ion")} yöntemini bir güven sistemi seçeneği olarak sunan bir kurumsal doğrulanabilir belge hizmeti, bu seçeneği Aralık 2023’te kaldırdı ve yalnızca #{raw("did:web")} yöntemini bıraktı \[9\]. Bu kararın ayrıntılı gerekçesi bizi ilgilendirmiyor; yönü ise dikkat çekici. Pratikte belge veren kurumların çoğu, kimliklerini zaten sahip oldukları ve herkesin tanıdığı bir şeye, yani alan adlarına bağlamayı tercih etti.

Bu hikâyelerden çıkan ders, zincirin işe yaramadığı yönünde okunmamalı. Asıl ders, bir tanımlayıcı kaydının onu işleten topluluk kadar yaşamasıdır. Bir zincir defteri, "kimsenin tek başına kapatamayacağı" bir altyapı olarak tasarlansa bile, doğrulayıcıları çalıştıracak kurumlar ilgisini kaybettiğinde kapanabilir. Bu durumda o deftere bağlı tanımlayıcılarla verilmiş belgeler, en iyi ihtimalle eski kayıtlarla doğrulanabilir hâlde kalır; yeni anahtar dönüşü ya da iptal yazılamaz. Kimlik gibi on yıllarca geçerli kalması gereken bir şeyin dayanağı, en az o kadar uzun yaşayacak bir kurumsal yapıya ihtiyaç duyar.

== Üçüncü rol: İptal kaydı

Bir belge iptal edildiğinde doğrulayanın bunu öğrenmesi gerekir. Dizinin yedinci yazısı tamamen bu konuya ayrılacak; burada yalnızca zincirin bu işteki yerine bakıyoruz.

Indy tipi sistemlerde iptal için ilginç bir kriptografik yöntem kullanıldı: #{strong[kriptografik toplayıcı]} (#{emph[cryptographic accumulator]}). Belge veren kurum, defterde bir "iptal kaydı" tanımlar ve geçerli bütün belgeleri temsil eden tek bir sayıyı, yani toplayıcının değerini, zaman zaman deftere yazar. Belge sahibi, belgesinin iptal edilmediğini, hangi belge olduğunu söylemeden, bu değere karşı bir sıfır bilgi ispatıyla gösterebilir. Toplayıcıyı hesaplamak için gereken büyük yardımcı dosya defter dışında tutulur; defterde yalnızca onun adresi ve özeti durur \[10\].

Bu tasarım mahremiyet açısından güçlüdür. Ama zincir burada yalnızca kurumun yayımladığı bir değeri #{strong[taşıyan]} bir ortam olarak çalışır. Aynı değer, kurumun imzaladığı ve herhangi bir web sunucusundan dağıtılan bir dosyada da taşınabilir. AB’nin dijital kimlik cüzdanı için seçilen iptal yöntemi de bu mantıktadır: IETF’in #{strong[Token Status List]} belirtiminde belge veren kurum, her belgenin durumunu birkaç bitle gösteren, sıkıştırılmış ve imzalı bir liste yayımlar; doğrulayan listeyi indirir ve belgenin konumundaki bite bakar \[11\]. Liste herkes için aynıdır ve önbelleğe alınabilir; doğrulayan hangi belgeyi kontrol ettiğini kimseye söylemez.

Zincirin bu işe kattığı tek şey, listenin #{strong[geçmiş hâllerinin]} inkâr edilememesi olabilir: Kurum, "o tarihte bu belge iptal edilmişti" ya da "edilmemişti" dediğinde bunun sonradan değiştirilmediğini kanıtlamak. Bu ise, birazdan göreceğimiz gibi, bir tanıklık işidir.

== Dördüncü rol: Denetim izi ve tanıklık

Dördüncü rol en mütevazı olanı, ama bu yazının savunduğu gibi en sağlamıdır: Zincire kişiler hakkında hiçbir şey yazmadan, yalnızca kurumların yayımladığı kayıtların #{strong[özetlerini]} yazmak. Bir güven listesinin her sürümünün özeti, bir iptal listesinin her yayınının özeti, bir belge şemasının her değişikliğinin özeti. Bu özetler kimseyi tanımlamaz; yalnızca "bu kurum, bu tarihte, bu içeriği yayımladı" bilgisini sabitler.

Bu rolde zincir hiçbir şeyi doğrulamaz ve hiçbir şeye yetki vermez. Doğrulayan, belgeyi yine imzasından ve güven listesinden doğrular. Zincire yalnızca elindeki listenin herkesin gördüğü listeyle aynı olup olmadığını ve geçmişte yayımlanmış bir listenin sonradan değiştirilip değiştirilmediğini sormak için bakar. Bu rolü Bölüm 7’de ayrıntılı ele alıyoruz.

#tablo([#{strong[Tablo 2.]} Zincirin kimlikte önerilen dört rolü.], (14fr, 27fr, 19fr, 26fr, 42fr), ([Rol], [Zincire ne yazılır], [Kimin hakkında], [Zincirsiz karşılığı], [Değerlendirme],), (
  ([Kimlik defteri], [belgeler, öznitelikler], [kişiler], [cüzdandaki imzalı belge], [kişisel veri silinemez; imza zaten yeterli],),
  ([Tanımlayıcı kaydı], [DID belgeleri, anahtar dönüşleri], [kurumlar (bazen kişiler)], [alan adı (did:web), güven listesi], [kurumlar için mümkün; kişiler için bağlanabilirlik riski],),
  ([İptal kaydı], [toplayıcı değerleri, durum bilgisi], [dolaylı olarak kişiler], [imzalı durum listesi (Token Status List)], [zincir yalnızca taşıyıcı; liste daha basit],),
  ([Denetim izi, tanıklık], [yayımlanan kayıtların özetleri], [yalnızca kurumların yayınları], [şeffaflık günlüğü], [kişisel veri yok; birden çok bağımsız tanık varsa değerli],),
))

= Kişisel Veri ve Zincir: Silme Hakkıyla Çatışma

== Hukuk ne diyor?

Avrupa Birliği’nin Genel Veri Koruma Tüzüğü (GDPR), kişisel veriyi kimliği belirli ya da belirlenebilir bir gerçek kişiye ilişkin her türlü bilgi olarak tanımlar (madde 4) \[12\]. "Belirlenebilir" kelimesi kilit önemdedir: Bir bilgi tek başına kimseyi göstermese bile, makul olarak kullanılabilecek başka bilgilerle birleştirildiğinde bir kişiye götürüyorsa kişisel veridir. Tüzüğün gerekçe bölümü, takma adlandırılmış (#{emph[pseudonymised]}) verinin de bu yüzden kişisel veri sayılmaya devam ettiğini açıkça söyler. Avrupa Birliği Adalet Divanı, 19 Ekim 2016 tarihli C-582\/14 sayılı kararında, bir web sitesinin kaydettiği değişken IP adresinin bile, site işletmecisinin ek bilgiye hukuken ulaşma imkânı varsa kişisel veri olabileceğine hükmetti \[13\].

Tüzüğün 17. maddesi kişiye #{strong[silme hakkı]} tanır: Verinin toplandığı amaç için artık gerekli olmaması, kişinin rızasını geri çekmesi ya da verinin hukuka aykırı işlenmesi gibi durumlarda kişi verisinin silinmesini isteyebilir ve veri sorumlusu bunu gecikmeksizin yapmak zorundadır \[12\].

Türkiye’de 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) benzer bir düzen kurar. Kanunun 7. maddesine göre, işlenmesini gerektiren sebepler ortadan kalktığında kişisel veriler veri sorumlusu tarafından resen ya da ilgili kişinin talebi üzerine silinir, yok edilir ya da anonim hâle getirilir \[14\]. Bu işlemlerin nasıl yapılacağı, 28 Ekim 2017 tarihli Resmî Gazete’de yayımlanan Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik ile ayrıntılandırılmıştır \[14\]. Yönetmeliğe göre #{strong[silme]}, kişisel verinin ilgili kullanıcılar için hiçbir şekilde erişilemez ve tekrar kullanılamaz hâle getirilmesidir. #{strong[Yok etme]}, verinin hiç kimse tarafından erişilemez, geri getirilemez ve kullanılamaz hâle getirilmesidir. #{strong[Anonim hâle getirme]} ise verinin başka verilerle eşleştirilse bile kimliği belirli ya da belirlenebilir bir kişiyle ilişkilendirilemez hâle getirilmesidir.

Şimdi bu tanımları, binlerce bilgisayarda kopyası bulunan ve geçmişteki tek bir değişikliğin bütün zinciri bozduğu bir deftere uygulayalım. Bir kayıt zincire yazıldıktan sonra onu "hiç kimse tarafından erişilemez" hâle getirmek, zinciri baştan yazmayı ve bütün kopyaları değiştirmeyi gerektirir. Bu da zincirin varlık nedenine aykırıdır.

== Düzenleyiciler zaman içinde ne söyledi?

Veri koruma otoriteleri bu çatışmayı erken fark etti. Fransa’nın veri koruma otoritesi CNIL, Eylül 2018’de blokzincir ve GDPR üzerine yazılı rehber yayımlayan ilk otoritelerden biri oldu \[15\]. Rehberin ana tavsiyesi şuydu: Blokzincirin özellikleri amaca ulaşmak için gerçekten gerekli değilse başka çözümler tercih edilmeli; gerekliyse kişisel veri zincire açık hâliyle değil, kriptografik bir taahhüt ya da özet olarak yazılmalı, asıl veri zincir dışında tutulmalı ve mümkünse izinli bir zincir seçilmeli.

Avrupa Parlamentosu’nun araştırma servisi için Temmuz 2019’da hazırlanan "Blockchain and the General Data Protection Regulation" çalışması, sorunu daha temel bir düzeyde koydu: GDPR, verinin belirli ve tanımlı #{strong[veri sorumluları]} tarafından işlendiği bir dünya için yazılmıştı; oysa izinsiz zincirlerde binlerce katılımcı aynı veriyi işler ve kimin sorumlu olduğu belirsizleşir \[16\]. Çalışma, zincirlerin GDPR ile ilkesel olarak uyumsuz olmadığını, ama uyumun ancak tasarımda alınan kararlarla sağlanabileceğini vurguladı.

Avrupa Veri Koruma Kurulu (EDPB) ise Nisan 2025’te blokzincir teknolojileri aracılığıyla kişisel verilerin işlenmesi hakkındaki 02\/2025 sayılı rehberin taslağını kamuoyu görüşüne açtı ve rehberin son hâlini 7 Temmuz 2026’da kabul etti \[17\]. Rehberin vardığı yer, CNIL’in sekiz yıl önceki tavsiyesiyle büyük ölçüde örtüşür. Rehbere göre kişisel veri doğrudan tanımlanabilir hâlde zincire yazıldığında, çoğu durumda silme ya da değiştirme için pratik bir imkân kalmaz; açık metin olarak saklanması GDPR’ın temel ilkeleriyle çatışabileceği için kesinlikle önerilmez. Zincire en fazla verinin #{strong[tuzlu ya da anahtarlı bir özeti]} yazılmalı, asıl veri ve tuz ya da anahtar zincir dışında gizli tutulmalıdır. Silme talebi geldiğinde zincirdeki özetin anlamsız hâle getirilebilmesi tasarım aşamasında düşünülmelidir.

== "Yalnızca özetini yazarız" yeterli mi?

İlk bakışta çözüm basit görünür: Kişisel verinin yerine onun özetini zincire yazalım; özet tek yönlüdür, nasılsa geri çevrilemez. Ne yazık ki bu düşünce, özellikle kimlik verisi için yanıltıcıdır.

#kutu("teknik", [Bir kimlik numarasının özeti neden güvenli değildir?])[
Özet fonksiyonu girdiden çıktıya giden yolu kolay, geri dönüşü zor kılar. Ama "zor" olan, #{strong[her olası girdiyi bilmeden]} geri dönmektir. Olası girdilerin sayısı azsa saldırgan hepsini dener.

T.C. kimlik numarasını düşünelim. On bir hanelidir, ama son iki hane ilk dokuz haneden hesaplanan kontrol haneleridir ve ilk hane sıfır olamaz. Saldırganın denemesi gereken numara sayısını hesaplayalım: İlk hane için 9, sonraki sekiz hanenin her biri için 10 seçenek vardır; son iki hane seçilmez, hesaplanır. Bir doğum tarihi için aynı sayım, son yüz yıldaki günlerdir:

#formul[$ "kimlik numarası:" quad N &<= 9 dot 10^8 = "900 milyon" \
"doğum tarihi:" quad N &approx 100 dot 365 = "36.500" $]

Saldırganın yaptığı iş, bu olasılıkların her birinin özetini hesaplayıp zincirdeki değerle karşılaştırmaktır:

#kod("text", "zincirdeki değer:  SHA-256(\"12345678950\")  = 7c1e…
saldırgan:         her geçerli numara n için:
                       SHA-256(n) == 7c1e… ise  → bulundu", baslik: "Örnek: tuzsuz bir özete karşı kaba kuvvet denemesi (değerler örnektir)")

Bu ne kadar sürer? Günümüzün grafik işlemcileri saniyede milyarlarca SHA-256 hesaplayabilir. Saniyede $10^9$ deneme kabul edersek:

#formul[$ t approx (9 dot 10^8 "deneme") / (10^9 "deneme/saniye") approx 1 "saniye" $]

Yani dokuz yüz milyon numaranın tamamını denemek tek bir grafik işlemcisiyle bir saniye mertebesinde, sıradan bir bilgisayarın işlemcisiyle de dakikalar içinde biter. Tuzsuz bir kimlik numarası özeti, numaranın kendisi kadar kişiseldir.

Bu yüzden EDPB rehberi yalnızca #{strong[tuzlu]} ya da #{strong[anahtarlı]} özetten söz eder \[17\]: Özet, uzun ve rastgele bir değerle (tuz) ya da gizli bir anahtarla birlikte hesaplanır; tuz veya anahtar zincir dışında saklanır. Silme talebi geldiğinde zincir dışındaki veri ve tuz yok edilir. Zincirdeki özet kalır, ama artık onu herhangi bir kişiye bağlamanın yolu yoktur. Bu yönteme #{strong[kripto silme]} (#{emph[crypto-shredding]}) denir. Hukuken yeterli olup olmadığı, tuzun gerçekten yok edildiğinin kanıtlanabilmesine ve zincirdeki değerin başka bilgilerle kişiye bağlanamamasına bağlıdır.
]

Tuzlu özet bile sorunu tümüyle çözmez. Bir özet, aynı kişiye ait başka işlemlerde tekrar görünüyorsa, kişinin kim olduğu bilinmese bile o işlemleri birbirine bağlar. Zincirdeki bir kaydın zaman damgası, hangi kurum tarafından yazıldığı, hangi diğer kayıtlarla aynı blokta yer aldığı gibi #{strong[üst veriler]} de kişiye ilişkin bir iz bırakabilir. Kişisel veri konusunda güvenli olan tek tasarım, zincire kişiye ilişkin #{strong[hiçbir şey]} yazmayan tasarımdır: ne verinin kendisini, ne özetini, ne de kişiye özgü bir tanımlayıcıyı (Şekil 4).

#sekil(4, [Zincire ne yazılabilir? Kişiye ilişkin veri ile kurumların yayınları], "figures/a12/sekil-4.svg", yarim: false)

== Zincire istenmeyen içerik yazılırsa

Değişmezliğin bir başka yüzü daha var. Herkese açık bir zincire yazma hakkı olan herkes oraya istediğini yazabilir; o içerik de zincirin her kopyasına dağılır. Aachen Teknik Üniversitesi’nden (RWTH) bir araştırma ekibi 2018’de Bitcoin zincirindeki işlemlerin içine gömülmüş verileri inceledi ve büyük çoğunluğu metin ya da görüntü olan binin üzerinde dosya buldu. Bu içeriklerin arasında yasa dışı içeriğe bağlantılar da vardı ve bu içerik, zinciri çalıştıran her katılımcının bilgisayarına kopyalanmıştı \[18\].

Kimlik açısından bunun anlamı şudur: Tanımlayıcı kaydı olarak kullanılan herkese açık bir zincire, kötü niyetli bir kullanıcı bir başkasının verisini o kişinin rızası olmadan yazabilir ve bu veri de silinemez hâle gelir. İzinli zincirler bu riski, zincire kimin ne yazabileceğini akıllı sözleşmelerle sınırlayarak azaltabilir. Bu da zincirin değerinin içerikte değil #{strong[kurallarda]} olduğunu bir kez daha gösterir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Hem GDPR hem KVKK kişiye verisinin silinmesini isteme hakkı tanır ve değişmez bir defter bu hakkı karşılamayı çok zorlaştırır. Veri koruma otoriteleri 2018’den 2026’ya aynı noktada buluştu: Kişisel veri zincire yazılmamalı; zorunluysa yalnızca tuzlu ya da anahtarlı bir özet yazılmalı, asıl veri zincir dışında kalmalı. Kimlik verisinde olası değerler az olduğu için tuzsuz özet, verinin kendisi kadar kişiseldir. En güvenli tasarım, zincire kişiye ilişkin hiçbir şey yazmayan tasarımdır.
]

= Avrupa Birliği’nin Tutumu: ARF ve EBSI’den Dersler

Avrupa Birliği bu tartışmada ilginç bir konumdadır. Bir yandan kendi kamu blokzincir altyapısını kurmuş, bunu sınır ötesi diplomalar gibi tam da kimlik alanına giren işlerde denemiştir. Öte yandan dijital kimlik cüzdanının güvenini bu altyapıya değil, on yıldır işleyen imzalı güven listelerine dayandırmıştır. İki kararın birlikte okunması, zincirin kimlikteki yeri hakkında belki de elimizdeki en zengin vaka çalışmasıdır.

== Avrupa Blokzincir Hizmetleri Altyapısı (EBSI)

2018’de, Avrupa Komisyonu’nun desteğiyle bir grup Avrupa ülkesi #{strong[Avrupa Blokzincir Ortaklığı]} (#{emph[European Blockchain Partnership]}) bildirgesini imzaladı ve kamu hizmetleri için ortak bir blokzincir altyapısı kurmayı taahhüt etti; ortaklık zamanla bütün AB üyelerini kapsayacak biçimde genişledi \[19\]. Bu altyapının adı #{strong[Avrupa Blokzincir Hizmetleri Altyapısı]}, kısaca EBSI (#{emph[European Blockchain Services Infrastructure]}) oldu. EBSI, düğümleri farklı ülkelerdeki bağımsız kurumlarca işletilen izinli bir zincirdir. Kullanım alanları arasında eğitim belgelerinin doğrulanması, gümrükte belge izlenebilirliği ve sınır ötesi kamu hizmetleri yer aldı. Mayıs 2024’te EBSI’nin yönetişimini üstlenmek üzere, dokuz üye devletin oluşturduğu ve Komisyon kararıyla kurulan EUROPEUM-EDIC adlı bir Avrupa dijital altyapı konsorsiyumu kuruldu \[19\].

EBSI’nin kimlik tasarımı, zamanla nasıl evrildiği açısından özellikle öğreticidir. Bugünkü tasarımda iki tür tanımlayıcı vardır \[19\]:

- #{strong[Tüzel kişiler]} (üniversiteler, kamu kurumları) #{raw("did:ebsi")} yöntemiyle tanımlanır ve DID belgeleri EBSI defterindeki bir tanımlayıcı kaydında tutulur. Hangi kurumun hangi tür belgeyi vermeye yetkili olduğu da defterdeki bir #{strong[güvenilir verenler kaydında]} (#{emph[Trusted Issuers Registry]}), bir yetkilendirme zinciri biçiminde tutulur: Bir kök otorite bir sektör otoritesini, o da belge veren kurumları yetkilendirir.
- #{strong[Gerçek kişiler]} ise #{raw("did:key")} yöntemini kullanır. EBSI’nin kendi belgelerine göre bu yöntemle ilgili bütün veriler, yani belgeler, gizli anahtarlar, tanımlayıcılar ve DID belgeleri, cüzdan sağlayıcının seçtiği bir yerde ama #{strong[EBSI platformunun dışında]} saklanmak zorundadır \[19\].

Yani EBSI, kişilere ait hiçbir şeyi zincire yazmayan bir tasarıma varmıştır. Defterde yalnızca kurumlar ve onların yetkileri durur. Bu, Bölüm 5’te veri koruma otoritelerinin vardığı sonucun bir kamu altyapısında uygulanmış hâlidir.

Dikkat çekici ikinci nokta, EBSI’nin güvenilir verenler kaydının aslında bir #{strong[güven listesi]} olmasıdır. Defter burada, kimin hangi rolde yetkili olduğunu söyleyen bir listeyi tutar. Yetkinin kaynağı ise yine zincir dışındadır: EBSI’nin belgeleri, belge verenlerin sektöre özgü yetkilendirilmesinin EBSI’nin kapsamı dışında kaldığını açıkça söyler. Bir üniversitenin diploma vermeye yetkili olduğuna o ülkenin eğitim otoritesi karar verir; defter yalnızca bu kararın kaydını tutar.

== ARF’nin seçimi: güven listeleri

Dizinin ilk yazısında, eIDAS 2.0 tüzüğünün ve onun teknik çerçevesi ARF’nin (#{emph[Architecture and Reference Framework]}) güveni nasıl kurduğunu anlatmıştık: Her üye devlet, kendi ülkesindeki kimlik verenleri, nitelikli güven hizmeti sağlayıcılarını ve cüzdan sağlayıcılarını imzalı #{strong[güven listelerinde]} yayımlar; AB bu listelerin listesini tutar. Doğrulayan, bir belgeyi verenin açık anahtarını bu listelerden ve onlara bağlı X.509 sertifikalarından öğrenir; bunun için bir zincire ya da DID’e başvurmaz \[20\].

ARF bu seçimi yaparken bir blokzincir altyapısının varlığından habersiz değildi; EBSI aynı Komisyon’un çatısı altında yıllardır işliyordu. Büyük ölçekli pilotlar da iki yolu birlikte sınadı. Örneğin eğitim ve sosyal güvenlik belgelerine odaklanan DC4EU pilotu, klasik açık anahtar altyapısına dayanan yaklaşımların yanında EBSI’ye dayanan merkeziyetsiz güven mekanizmalarını da denedi \[21\]. Yine de cüzdanın temel güven modeli için seçilen yol, mevcut hukuki çerçeveyle doğrudan bağlantılı, olgun ve on yıllık işletme deneyimi olan güven listesi mimarisi oldu.

== eIDAS 2.0’da "elektronik defter"

eIDAS 2.0’ın blokzincirle ilişkisi bundan ibaret değildir. Tüzük, güven hizmetleri arasına yeni bir hizmet ekledi: #{strong[elektronik defterler]} (#{emph[electronic ledgers]}). 45k maddesi elektronik defterlerin hukuki etkisini, 45l maddesi ise #{strong[nitelikli elektronik defterlerin]} taşıması gereken şartları düzenler \[22\]. Bu şartlara göre nitelikli bir defter, bir ya da birden çok nitelikli güven hizmeti sağlayıcısı tarafından kurulup yönetilmeli, içindeki veri kayıtlarının kaynağını belirlemeli, kayıtların benzersiz ve zaman sırasına göre ardışık dizilmesini sağlamalı ve veriyi, sonradan yapılan her değişikliğin hemen fark edileceği biçimde kaydetmelidir. Bu şartların hangi standartlarla karşılanacağını belirleyen 2025\/2531 sayılı Uygulama Tüzüğü 16 Aralık 2025’te kabul edildi \[22\].

Bu düzenlemenin bakış açısı, bu yazının teziyle örtüşür. Tüzük defteri bir #{strong[kimlik kaynağı]} olarak tanımlamaz; onu kayıtların #{strong[kökenini ve sırasını]} güvence altına alan bir güven hizmeti olarak tanımlar. Yani hukuk da defterden "kimin kim olduğunu" söylemesini beklemez; "neyin, ne zaman, hangi sırayla kaydedildiğini" güvenilir biçimde göstermesini bekler. Bu, Bölüm 4.4’te anlattığımız tanıklık rolünün hukuki karşılığına çok yakındır.

#kutu("ornek", [Nurlan AB örneğini okuyor])[
Nurlan, çalışma grubunun ikinci toplantısına EBSI’nin belgelerinden notlarla geliyor. "Avrupa bu yolu bizden önce yürüdü," diyor. "Öğrencileri zincirden çıkardılar, yalnızca üniversiteleri bıraktılar. Hangi üniversitenin yetkili olduğunu da zincir söylemiyor, her ülkenin eğitim otoritesi söylüyor. Cüzdan için de zinciri değil güven listelerini seçtiler. Bizim sorumuz artık ’zincir mi, liste mi’ olamaz. Önce listeyi kurmalıyız. Zincir ancak listeye bir şey katıyorsa gelir."
]

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Avrupa Birliği kendi blokzincir altyapısı EBSI’de kişilere ait hiçbir şeyi zincire yazmayan bir tasarıma vardı; zincirde yalnızca kurumlar ve yetkileri kaldı, yetkinin kaynağı ise zincir dışındaki otoriteler oldu. Dijital kimlik cüzdanının güveni için de imzalı güven listeleri seçildi. eIDAS 2.0 ise defteri, kayıtların kökenini ve sırasını güvenceye alan bir güven hizmeti olarak tanımlar.
]

= İzinli Zincirler ve "Tanık" Rolü

== Tanık ne yapar?

Bir köyde iki komşu tarla sınırı konusunda anlaşır ve anlaşmayı bir kâğıda yazar. Kâğıdı kim saklayacak? Komşulardan biri saklarsa, yıllar sonra kâğıdı değiştirme imkânı ona kalır. Bu yüzden anlaşma köyün ihtiyarlarının önünde yapılır ve imzalanan kâğıdın birer sureti onlara da verilir. İhtiyarlar anlaşmanın içeriğine karar vermez; sınırı onlar çizmez. Yalnızca, ileride biri "biz böyle anlaşmamıştık" derse, ellerindeki suretle o günkü hâli gösterirler.

Kimlik altyapısında zincirin üstlenebileceği en sağlam rol budur. Bir güven listesinin içeriğine yetkili kurum karar verir ve listeyi kendi anahtarıyla imzalar. Doğrulayan, belgeyi bu imzalı listeye bakarak doğrular. Tanık ise listenin içeriğine karışmaz; yalnızca hangi gün hangi listenin yayımlandığının kaydını tutar. Böylece liste yayıncısı iki şeyi yapamaz hâle gelir: geçmişte yayımladığı bir listeyi sessizce değiştirmek ve farklı doğrulayıcılara farklı listeler göstermek.

İkinci tehdit daha az bilinir ama daha sinsidir. Ona #{strong[bölünmüş görüş saldırısı]} (#{emph[split-view attack]}) denir. Kötü niyetli ya da ele geçirilmiş bir yayıncı, bir ülkedeki doğrulayıcılara içinde sahte bir kurum bulunan bir liste, diğerlerine ise temiz bir liste gösterebilir. Her iki liste de yayıncının geçerli imzasını taşıdığı için, tek başına bakan hiçbir doğrulayıcı farkı anlayamaz. Farkı ancak, herkesin aynı listeyi gördüğünü kontrol eden ortak bir kayıt ortaya çıkarır.

== Şeffaflık günlükleri: zincirsiz tanık

İnternette bu sorunun en yaygın çözümü #{strong[şeffaflık günlüğüdür]} (#{emph[transparency log]}) ve bir blokzincir kullanmaz. En bilinen örneği #{strong[Sertifika Şeffaflığı]}dır (#{emph[Certificate Transparency]}, CT). Web sitelerinin TLS sertifikalarını veren sertifika otoritelerinden biri ele geçirilirse, saldırgan herhangi bir site adına sahte bir sertifika üretebilir. CT bu riske karşı, her sertifikanın herkese açık, yalnızca ekleme yapılabilen günlüklere yazılmasını şart koşar. Günlükler Merkle ağaçlarıyla tutulur; günlük işletmecisi ağacın kökünü düzenli olarak imzalayıp yayımlar ve herkes, Bölüm 2.2’deki dahil olma ve tutarlılık kanıtlarıyla bir sertifikanın günlükte olduğunu ve günlüğün geriye dönük değiştirilmediğini denetleyebilir. Mekanizma 2013’te RFC 6962 ile tanımlandı, 2021’de RFC 9162 ile ikinci sürümüne kavuştu \[23\]. Yaygın bir tarayıcı, 30 Nisan 2018’den sonra verilen sertifikaların bu günlüklerde yer almasını güvenmenin şartı yaptı \[23\].

CT’nin dikkat çekici yanı, bir uzlaşma algoritması kullanmamasıdır. Her günlük tek bir işletmeci tarafından tutulur. Güven, birden çok bağımsız günlüğün bulunmasından, sertifikaların birden fazla günlüğe yazılmasından ve günlüklerin imzalı köklerini izleyen bağımsız denetçilerden gelir. Yani tanıklık burada, aynı defteri birlikte yazan doğrulayıcılar yerine #{strong[birbirini izleyen bağımsız taraflarla]} kurulur.

#kutu("teknik", [Bir günlüğün kendisiyle çelişmesi nasıl yakalanır?])[
Bir şeffaflık günlüğü belirli aralıklarla #{strong[imzalı ağaç başı]} (#{emph[signed tree head]}) yayımlar: ağaçtaki kayıt sayısı, kök özet, zaman ve günlüğün imzası. Sadeleştirilmiş bir örnek (değerler örnektir):

#kod("json", "{
  \"tree_size\": 48211,
  \"root_hash\": \"b3f1…9a\",
  \"timestamp\": \"2026-11-03T09:00:00Z\",
  \"signature\": \"…\"
}", baslik: "Örnek: bir şeffaflık günlüğünün imzalı ağaç başı")

Bir izleyici dün #{raw("tree_size: 48100")} olan bir başı, bugün #{raw("48211")} olan bir başı görmüş olsun. Günlükten bu ikisi arasında bir tutarlılık kanıtı ister. Kanıt, eski 48.100 kaydın aynen yerinde durduğunu ve yalnızca $48211 - 48100 = 111$ kayıt eklendiğini gösteriyorsa günlük dürüsttür. Günlük geçmişte bir kaydı değiştirmişse böyle bir kanıt #{strong[üretemez]}.

Bölünmüş görüşü yakalamak için ise izleyiciler gördükleri imzalı başları birbirleriyle karşılaştırır. Aynı #{raw("tree_size")} için iki farklı #{raw("root_hash")} taşıyan, ikisi de günlüğün geçerli imzasını taşıyan iki baş, günlüğün yalan söylediğinin #{strong[imzalı kanıtıdır]}. Bu kanıt herkese gösterilebilir ve inkâr edilemez.
]

Devletlerin kendi kayıtları için benzer bir tanıklık düzeneği kullandığı da görülür. Estonya, devlet kayıtlarının bütünlüğünü korumak için özet ağaçlarına dayanan KSI adlı bir sistem kullanıyor. Estonya’nın kendi tanıtımına göre 2007’de geliştirilen bu sistem devletin ağlarında, kayıtların geçmişinin kimse tarafından yeniden yazılamamasını sağlıyor \[24\]. Sistemin tasarımında zincire verinin kendisi #{strong[yazılmaz]}; bütünlük yalnızca kayıtların özetleri üzerinden doğrulanır. Yani veri kendi yerinde, kendi koruma kurallarıyla duruyor; zincir yalnızca onun değiştirilmediğine tanıklık ediyor.

== İzinli zincir: birden çok tanığı tek kayıtta birleştirmek

Şeffaflık günlükleri tanıklık için çoğu zaman yeterlidir. Peki izinli bir zincir buna ne ekleyebilir? Cevap, #{strong[kimin tanık olduğunu]} ve #{strong[tanıkların anlaşamadığı durumu]} kurala bağlamaktır.

Şeffaflık günlüğünde günlüğü bir taraf tutar, diğerleri izler. İzinli bir zincirde ise kaydı birden çok bağımsız işletmeci birlikte onaylar. Bir liste sürümünün özeti, ancak belirli sayıda bağımsız yazıcı aynı değeri gönderdiğinde onaylı sayılabilir. Yazıcılar bir sürüm hakkında anlaşamazsa, ilk gelenin değeri kabul edilmek yerine #{strong[çelişki]} kayda geçebilir. Bu kurallar bir akıllı sözleşmede yazılıdır ve her işletmeci aynı kuralı çalıştırır. Böylece tanıklık, iyi niyetli izleyicilerin varlığına bağlı olmaktan çıkar ve işletmecilerin her birinin imzasını taşıyan ortak bir kayda dönüşür.

Bu kurgunun değerli olabilmesi için üç koşul gerekir. Birincisi, zincire kişiye ilişkin hiçbir şey yazılmamalıdır; yalnızca kurumların herkese açık yayınlarının özetleri. İkincisi, doğrulama zincire #{strong[bağımlı olmamalıdır]}: Bir doğrulayan, internet bağlantısı olmasa ya da zincir bir süre çalışmasa bile, imzalı listeyle belgeyi doğrulayabilmelidir. Zincir yalnızca ek bir denetimdir. Üçüncüsü, zincir ile imzalı liste çeliştiğinde hangisinin geçerli olacağı önceden yazılı olmalıdır. Bu yazının önerisi, imzalı listenin geçerli olması ve çelişkinin bir alarm olarak ele alınmasıdır; çünkü listeyi imzalayan, onun içeriğinden hukuken sorumlu olan kurumdur. Zincir yalnızca bir şeylerin ters gittiğini gösterir (Şekil 5).

#sekil(5, [Tanık mimarisi: güven imzalı listeden gelir, zincir yalnızca tanıklık eder], "figures/a12/sekil-5.svg", yarim: false)

#kutu("teknik", [Bir çapa kaydının içi])[
Tanık rolündeki bir zincire yazılan kayıt, kimseyi tanımlamayan birkaç alandan oluşur. Bir güven listesi sürümü için sadeleştirilmiş bir örnek (değerler örnektir):

#kod("json", "{
  \"liste\": \"tl-ornek\",
  \"surum\": 42,
  \"icerik_ozeti\": \"sha256:9c4e…\",
  \"onceki_ozet\": \"sha256:71ab…\",
  \"yayin_zamani\": \"2026-11-03T08:00:00Z\"
}", baslik: "Örnek: bir güven listesi sürümü için zincire yazılan çapa kaydı")

#{raw("icerik_ozeti")} imzalı listenin kendisinin özetidir; #{raw("onceki_ozet")} bir önceki sürümün özetidir. $L_k$, listenin $k$’inci sürümü olsun. İki alan şöyle hesaplanır:

#formul[$ "icerik_ozeti"_k &= "SHA-256"(L_k) \
"onceki_ozet"_k &= "icerik_ozeti"_(k-1) $]

Böylece liste sürümleri kendi aralarında Bölüm 2.1’deki gibi bir özet zinciri oluşturur ve tek bir sürümün sessizce değiştirilmesi bütün sonraki sürümleri bozar. Bir doğrulayıcının çapa kontrolü şu adımlardan oluşur:

#adimlar((
  ("Yayıncı → Doğrulayıcı", [#{strong[Liste.]} Doğrulayıcı güven listesinin 42. sürümünü indirir ve önce imzasını doğrular.], $"Verify"("PK"_"yayıncı", L_42)$),
  ("Doğrulayıcı", [#{strong[Özet.]} İndirdiği listenin özetini kendisi hesaplar.], $h = "SHA-256"(L_42)$),
  ("Zincir → Doğrulayıcı", [#{strong[Çapa.]} Zincirde aynı #{raw("surum")} için kayıtlı özeti okur.], $a = "icerik_ozeti"_42$),
  ("Doğrulayıcı", [#{strong[Karşılaştırma.]} İki özet aynı mı?], $h attach(=, t: ?) a$),
  ("Doğrulayıcı", [#{strong[Sonuç.]} Eşitse liste herkesin gördüğü listedir; değilse alarm verir.], $h != a ==> "alarm"$),
))

Özetler eşleşmiyorsa ya liste yolda değiştirilmiştir ya da yayıncı farklı kişilere farklı listeler göstermektedir. İki durumda da listeyi reddetmek yerine alarm vermek ve listeyi ikinci bir kanaldan doğrulamak, doğrulamayı zincirin anlık durumuna bağımlı kılmamanın yoludur. Zincir yanıt vermezse son üç adım atlanır; ilk adımdaki imza doğrulaması tek başına yeterlidir.
]

== Tanığın değeri, tanıkların bağımsızlığıdır

Bölüm 2.3’teki QBFT hesabını hatırlayalım: Dört doğrulayıcılı bir ağ yalnızca bir hatalı doğrulayıcıya dayanır ve bu dört doğrulayıcı aynı kurumun elindeyse, güven açısından tek bir tanıktan farkı yoktur. Tanık rolündeki bir zincirin değeri, onu işleten tarafların #{strong[sayısından çok bağımsızlığından]} gelir: farklı hukuk düzenlerinde, farklı kurumlarda, birbirinin talimatını almayan taraflar. Köydeki ihtiyarlar heyeti, komşulardan birinin akrabalarından oluşsaydı, sureti saklamalarının bir anlamı kalmazdı.

Bu yüzden, tek bir kurumun işlettiği bir zincir, aynı kurumun tuttuğu bir şeffaflık günlüğünden daha fazla güvence vermez; yalnızca daha pahalıdır. Zincir, ancak gerçekten bağımsız birden çok taraf onu birlikte işletmeye başladığında bir şey katar.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Tanık, kaydın içeriğine karar vermez; yalnızca geçmişin sessizce değiştirilmesini ve farklı kişilere farklı kayıt gösterilmesini fark edilir kılar. Bu işi çoğu zaman şeffaflık günlükleri zincirsiz olarak yapar. İzinli bir zincir, tanıklığı birden çok bağımsız işletmecinin ortak kuralına bağlamak için değerli olabilir; ama yalnızca zincire kişisel veri yazılmıyorsa, doğrulama zincire bağımlı değilse ve işletmeciler gerçekten bağımsızsa.
]

= Karar Çerçevesi: Zincir Ne Zaman Değer Katar?

Blokzincirin ne zaman gerekli olduğunu sınamak için önerilmiş birkaç karar şeması vardır. Bunların en çok atıf alanlarından biri, 2018’de yayımlanan ve "Blokzincire ihtiyacınız var mı?" sorusunu adım adım soran bir çalışmadır \[25\]. ABD Ulusal Standartlar ve Teknoloji Enstitüsü’nün (NIST) aynı yıl yayımladığı blokzincir genel bakış raporu da benzer bir akış önerir \[25\]. Bu şemaların ortak sorusu şudur: Birden çok taraf ortak bir kayda yazmak zorunda mı, bu taraflar birbirine güvenmiyor mu ve herkesin güvendiği bir üçüncü taraf yok mu? Bu üç sorunun cevabı "evet" değilse, sıradan bir veritabanı ya da imzalı bir kayıt genellikle daha iyi bir seçimdir.

Kimlik alanına özgü bir çerçeve için bu sorulara iki soru daha eklemek gerekir: Kişisel veri işin içinde mi ve zinciri yıllarca işletecek bağımsız taraflar gerçekten var mı? Şekil 6 bu soruları bir karar akışı olarak sıralıyor.

#sekil(6, [Kimlik altyapısında zincir için karar akışı], "figures/a12/sekil-6.svg", yarim: false)

Akışın birkaç noktası açıklamaya değer.

#{strong[İlk soru bir eleme sorusudur.]} Kişiye ilişkin bir şey zincire yazılacaksa, sonraki soruların cevabı ne olursa olsun zincir kimlik için uygun değildir. Bölüm 5’te gördüğümüz gibi bu kural açık verinin yanında özetler ve kişiye özgü tanımlayıcılar için de geçerlidir.

#{strong[İkinci soru, güvenin kaynağını sorar.]} Bir diplomanın gerçek olup olmadığına üniversite, bir kurumun yetkili olup olmadığına ilgili otorite karar verir. Kaydın içeriğine karar veren tek bir yetkili kurum varsa, o kurumun imzası güvenin kaynağıdır ve hiçbir uzlaşma algoritması bu imzanın yerini tutamaz. Bu durumda zincir ancak tanık olarak düşünülebilir.

#{strong[Üçüncü ve dördüncü sorular, tanıklık ihtiyacını ve onun en basit karşılığını sorar.]} Çoğu durumda şeffaflık günlüğü ve onu izleyen bağımsız taraflar yeterlidir; internetin sertifika altyapısı on yıldır bu modelle çalışıyor.

#{strong[Beşinci soru, kurumsal gerçekliği sorar.]} Bölüm 4.2’deki zincir defterlerinin hikâyesi, teknik olarak iyi tasarlanmış bir zincirin bile, onu işletecek bağımsız taraflar ilgisini kaybettiğinde kapanabileceğini gösterdi. Zincir, ancak onu yıllarca birlikte işletecek, birbirinden gerçekten bağımsız kurumlar varsa anlamlıdır. Bu kurumlar yoksa, zinciri tek bir tarafın işletmesi, ona yalnızca ad olarak merkeziyetsiz bir görünüm verir.

#kutu("ornek", [Nurlan’ın çalışma grubu karar veriyor])[
Üçüncü toplantıda çalışma grubu Şekil 6’daki akışı soru soru tartışır. Birinci soruda öneri elenir: Diplomalar zincire yazılmayacak; her üniversite diplomayı imzalayıp doğrudan öğrencinin cüzdanına verecek. İkinci soruda, hangi üniversitenin diploma vermeye yetkili olduğuna her ülkenin eğitim otoritesinin karar verdiği kabul edilir; bu bilgi imzalı bir listede yayımlanacak. Üçüncü soruda grup, listelerin geçmiş hâllerinin inkâr edilememesini önemli bulur; bir öğrencinin mezuniyet tarihinde üniversitesinin yetkili olup olmadığı yıllar sonra sorulabilir. Dördüncü soruda, liste yayınlarının özetlerinin herkese açık bir günlüğe yazılmasına karar verilir. Beşinci soru ise açık kalır: Grup, birkaç ülkeden en az iki bağımsız kurum zinciri birlikte işletmeye hazır olduğunda zincire geçmeyi, o zamana kadar günlükle yetinmeyi kararlaştırır.

Aynur için bunun anlamı şudur: Diploması onun cüzdanında durur, İstanbul’daki üniversite onu imzadan ve listeden doğrular, ne Bakü’deki üniversite ne de herhangi bir zincir bu doğrulamadan haberdar olur. Aynur’a ait hiçbir şey hiçbir deftere yazılmaz.
]

= Seçeneklerin Karşılaştırması

Kimlik altyapısında "zincir ya da zincir değil" sorusu aslında beş seçenekli bir yelpazedir. Tablo 3, bu seçenekleri yazı boyunca kullandığımız ölçütlerle yan yana koyuyor.

#tablo([#{strong[Tablo 3.]} Kimlik altyapısında kayıt tutma seçeneklerinin karşılaştırması.], (21fr, 15fr, 19fr, 24fr, 30fr, 23fr), ([Ölçüt], [Merkezî veritabanı], [İmzalı kayıt \/ güven listesi], [Şeffaflık günlüğü], [İzinli zincir (tanık rolünde)], [İzinsiz zincir],), (
  ([Güvenin kaynağı], [işletmecinin itibarı], [imzalayan yetkili kurum], [imzalayan kurum + bağımsız izleyiciler], [imzalayan kurum + bağımsız işletmecilerin ortak onayı], [uzlaşma algoritması ve ekonomik teşvikler],),
  ([Geçmişin değişmesi fark edilir mi?], [hayır], [kısmen (sürüm zinciriyle)], [evet], [evet], [evet],),
  ([Farklı kişilere farklı kayıt (bölünmüş görüş)], [fark edilmez], [fark edilmez], [izleyiciler karşılaştırırsa fark edilir], [ortak kayıtta fark edilir], [ortak kayıtta fark edilir],),
  ([Silme ve düzeltme], [kolay], [yeni sürümle], [kayıt kalır, yeni kayıt eklenir], [kayıt kalır, yeni kayıt eklenir], [kayıt kalır],),
  ([Kişisel veri için uygunluk], [kurallara uyulursa uygun], [kişisel veri içermez], [kişisel veri içermemeli], [kişisel veri içermemeli], [uygun değil],),
  ([Çevrimdışı doğrulama], [hayır], [evet], [evet (son imzalı baş ile)], [evet (zincir yalnızca ek denetim)], [yalnızca kendi düğümünü çalıştıran için],),
  ([İşletme yükü], [düşük], [düşük], [orta], [yüksek (birden çok kurum, yönetişim)], [düşük ama işlem ücreti ve dalgalanma],),
  ([Yönetişim], [tek kurum], [tek kurum, açık kurallar], [günlük işletmecisi + izleyiciler], [doğrulayıcıları seçen ortak yapı], [açık katılım; kurallar topluluğun elinde],),
  ([Kimlik için önerilen kullanım], [kurum içi kayıtlar], [belgelerin ve listelerin kendisi], [liste yayınlarının denetim izi], [bağımsız işletmeciler varsa tanıklık], [önerilmez],),
))

Tablonun dikkat çeken yanı, sağa doğru gidildikçe tanıklık gücünün arttığı, ama yönetişim ve işletme yükünün de arttığıdır. Her ölçütte en iyi olan bir sütun yoktur. Kimlik altyapısının çekirdeği, ikinci sütundaki imzalı kayıtlar ve güven listeleridir; diğer sütunlar bu çekirdeğin etrafına, ihtiyaç ölçüsünde eklenen katmanlardır.

= Sınırlar ve Açık Sorular

Bu yazının önerdiği "zincir tanıktır" yaklaşımı da kendi sınırlarını taşır. Bu bölümde dürüstçe açık kalan soruları sıralıyoruz.

#{strong[Tanığa kim tanıklık eder?]} Bir şeffaflık günlüğü ya da izinli bir zincir, liste yayıncısının dürüstlüğünü denetlemek için vardır. Ama günlük ve zincir de birilerinin işlettiği sistemlerdir. Günlük işletmecisinin kendisi bölünmüş görüş sunarsa, bunu ancak birbirine bağımsız izleyiciler yakalar. Bu zincir sonsuza dek uzatılamaz; bir noktada toplumsal ve kurumsal güvene, yani denetime, hesap verebilirliğe ve hukuka dayanmak gerekir. Teknoloji bu güveni ölçülebilir kılar, ama yerine geçmez.

#{strong[Kaç tanık yeterlidir?]} QBFT gibi algoritmalarda bir hatalı doğrulayıcıya dayanmak için dört doğrulayıcı gerekir. Birbirinden gerçekten bağımsız dört kurumun aynı zinciri yıllarca birlikte işletmesi ise kolay bir kurumsal başarı değildir. İki bağımsız işletmeciyle başlayan bir zincir, tanıklık için anlamlı bir ilk adımdır; çünkü iki tarafın aynı yanlışı birlikte imzalaması, tek tarafın yanlışından çok daha zordur. Ama Bizans hatasına dayanıklılık ancak doğrulayıcı sayısı arttıkça gelir. Bu sayının hangi kurumlardan oluşacağı ise bir yönetişim sorusudur.

#{strong[Uzun ömür.]} Kimlik belgeleri on yıllarca geçerli kalabilir; bir diplomanın verildiği gün üniversitenin yetkili olup olmadığı otuz yıl sonra sorulabilir. Zincir yazılımları, uzlaşma algoritmaları ve onları işleten kurumlar ise bu süre boyunca değişir. Zincir kapanırsa ya da başka bir altyapıya taşınırsa, eski tanıklık kayıtlarının nasıl korunacağı önceden düşünülmelidir. Bu yüzden tanıklık kayıtlarının zincirden bağımsız olarak, örneğin imzalı ve arşivlenmiş günlük dosyaları hâlinde de saklanması akıllıcadır.

#{strong[Yanlış güven hissi.]} "Blokzincirle korunuyor" ifadesi, okura gerçekte olduğundan daha güçlü bir güvence algısı verebilir. Zincir, kayda yazılan bilginin doğru olduğunu söylemez; yalnızca yazıldıktan sonra değiştirilmediğini söyler. Kimlik sistemleri kamuya anlatılırken bu ayrımın açıkça yapılması, tasarımın kendisi kadar önemlidir.

#{strong[Sorumluluk.]} EDPB rehberinin son hâli, yalnızca teknik doğrulama yapan ve işlemenin amacına karar vermeyen düğümlerin veri sorumlusu sayılmayabileceğini kabul ederek taslağa göre daha esnek bir tutum aldı \[17\]. Ama zincirde kişisel veri hiç yoksa bu soru büyük ölçüde ortadan kalkar. Tanık rolündeki bir zincirin hukuki olarak en sade hâli, işletmecilerinin hiçbir kişisel veriye dokunmadığı hâldir.

#{strong[AB dışında hukuki statü.]} eIDAS 2.0, nitelikli elektronik defterlere AB içinde belirli bir hukuki karine tanıyor. AB üyesi olmayan ülkelerde bu tür bir statünün karşılığı henüz yok. Bir tanıklık kaydının bir uyuşmazlıkta delil değeri, her ülkenin kendi usul hukukuna bağlı kalacak. Bu, dizinin on birinci yazısında tartışılan, eIDAS’ın AB dışındaki ülkelerle ilişkisi sorusunun bir parçasıdır.

#{strong[Kuantum sonrası dönem.]} Özet fonksiyonları kuantum bilgisayarlara karşı imza algoritmalarından çok daha dayanıklıdır; bu yüzden özet zincirleri ve Merkle ağaçları uzun vadede de güvenilir kalabilir. Ama zincirdeki kayıtları ve listeleri imzalayan anahtarlar değişmek zorunda kalacak. Uzun ömürlü tanıklık kayıtlarının bu geçişte nasıl korunacağı, dizinin son yazısının konusu.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisi Tamga Network tarafından yayımlanıyor. Bu yazının konusu, ağın tasarımında üzerinde en çok düşünülen sorulardan biri olduğu için, ağın bugünkü durumunu kamuya açık belgelerine dayanarak kısaca anlatmak doğru olur.

Tamga Network, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır ve Avrupa Birliği’nin eIDAS 2.0 ve EUDI profillerini temel alır. Ağda bugün çalışan bir zincir yoktur. Güven #{strong[imzalı, sürümlü ve özet zincirli güven listelerine]} ve herkese açık bir #{strong[çapa günlüğüne]} dayanır. Listelerin her sürümü bir öncekinin özetini taşır ve hiçbir sürüm silinmez. Her liste sürümü, her iptal listesi yayını ve her şema değişikliği en az saatte bir bu günlüğe yazılır; böylece geri sarılmış bir liste fark edilir. Listelere, günlüğe ya da deftere hiçbir kişisel veri yazılmaz, özeti bile. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayıcıları listeler.

Ağın yayımladığı teknik belgeye göre, izinli bir defterin (Besu üzerinde QBFT uzlaşmasıyla) kodu yazılmış ve test edilmiştir. Ancak bu defter, #{strong[en az iki bağımsız doğrulayıcı işletmecisi onu birlikte işletmeyi yazılı olarak kabul edene kadar kapalı kalır]}. Gerekçe, bu yazının Bölüm 7.4’teki ilkesiyle aynıdır: Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Defter açıldığında da bir güven kaynağı olmayacak; karar gereği imzalı listelerin bir #{strong[projeksiyonu]}, yani yansıması olacaktır. Zincire yalnızca her liste sürümünün özeti (sürüm, içerik özeti, önceki özet, yayın zamanı) ve çapa günlüğünün son satırının özeti yazılır. Bir özet, ancak eşik sayıda bağımsız yazıcı aynı değeri gönderdiğinde onaylı sayılır; yazıcılar anlaşamazsa ilk gelenin değeri kilitlenmez, çelişki kayda geçer. Zincirin cevabı doğrulama için hiçbir zaman gerekli değildir ve imzalı listeyle çeliştiğinde liste geçerlidir.

Ağın belgeleri bugünkü sınırı da açıkça yazar: Bu aşamada güven çapası tek bir işletmecinin imzasına dayanır. Herkese açık çapa günlüğü, şeffaflık raporları ve denetimler kötüye kullanımı caydırır, ama imkânsız kılmaz. Bu sınırı önce ikinci bir bağımsız liste yazıcısı, sonra da birden çok bağımsız işletmecinin birlikte yürüttüğü defter kaldırabilir. Yani Tamga Network, Şekil 6’daki karar akışında bugün dördüncü kutudadır ve beşinci sorunun cevabını, bağımsız işletmecilerin katılımına bırakmıştır.

= Sonuç

Nurlan’ın toplantı odasında duyduğu öneri, son on beş yılda dijital kimlik alanında sayısız kez dile getirildi: "Kimliği blokzincire yazalım." Bu yazı boyunca bu önerinin neyi doğru, neyi yanlış gördüğünü ayırmaya çalıştık.

Doğru gördüğü şey, kimlik altyapısının tek bir kurumun keyfine bırakılmaması gerektiğidir. Bir güven listesinin geçmişte ne söylediğinin sonradan inkâr edilememesi, farklı kişilere farklı listeler gösterilememesi ve kimsenin altyapıyı tek başına kapatamaması gerçekten değerli hedeflerdir. Blokzincirin parçaları, yani özet zincirleri, Merkle ağaçları ve uzlaşma, bu hedeflere hizmet edebilir.

Yanlış gördüğü şey ise güvenin nereden geldiğidir. Bir diplomanın gerçek olduğunu söyleyen, onu imzalayan üniversitedir. O üniversitenin yetkili olduğunu söyleyen, ülkesinin eğitim otoritesidir. Bu iki cümlenin hiçbiri bir uzlaşma algoritmasından türetilemez. Zincir yalnızca bir şeyin yazıldıktan sonra değiştirilmediğini gösterir; yazılanın doğru olduğunu göstermez. Kişisel veri söz konusu olduğunda ise zincirin en çok övülen özelliği olan değişmezlik, silme hakkıyla çatışan bir yüke dönüşür. Veri koruma otoritelerinin 2018’den 2026’ya vardığı ortak sonuç, Avrupa’nın EBSI’de kişileri zincirden çıkarması ve cüzdanın güvenini güven listelerine dayandırması aynı yöne işaret eder.

Bu yazının önerdiği denge şudur: Kimlik altyapısının çekirdeği, yetkili kurumların imzaladığı belgeler ve güven listeleridir. Bu çekirdeğin etrafına, geçmişin sessizce değiştirilmesini fark edilir kılan bir şeffaflık günlüğü eklenebilir. Ve ancak gerçekten bağımsız, uzun ömürlü birden çok işletmeci varsa, bu tanıklık izinli bir zincirle güçlendirilebilir. Hiçbir aşamada zincire kişiye ilişkin bir şey yazılmaz ve hiçbir aşamada doğrulama zincire bağımlı olmaz.

Dizinin ilk yazısında, bozkırdaki tamganın gücünün çizginin kendisinden değil, o çizgiyi herkesin tanımasından geldiğini söylemiştik. Blokzincir de bir çizgiyi daha fazla kişinin aynı anda görmesini sağlayan bir araçtır. Çizgiyi kimin çizebileceğine ise yine toplumun kuralları ve kurumları karar verir.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Haber, S. ve Stornetta, W. S. (1991). "How to Time-Stamp a Digital Document." #{emph[Journal of Cryptology]}, 3(2), 99–111. Ayrıca: Bayer, D., Haber, S. ve Stornetta, W. S. (1993). "Improving the Efficiency and Reliability of Digital Time-Stamping." #{emph[Sequences II: Methods in Communication, Security and Computer Science]}, Springer, 329–334.]

#kaynak("2")[Nakamoto, S. (2008). #{emph[Bitcoin: A Peer-to-Peer Electronic Cash System.]} 31 Ekim 2008.]

#kaynak("3")[Merkle, R. C. (1988). "A Digital Signature Based on a Conventional Encryption Function." #{emph[Advances in Cryptology — CRYPTO ’87]}, Lecture Notes in Computer Science 293, Springer, 369–378.]

#kaynak("4")[Lamport, L., Shostak, R. ve Pease, M. (1982). "The Byzantine Generals Problem." #{emph[ACM Transactions on Programming Languages and Systems]}, 4(3), 382–401.]

#kaynak("5")[Besu belgeleri. "Create a private network using QBFT" ve "Proof of authority consensus." besu.hyperledger.org (erişim: Kasım 2026).]

#kaynak("6")[W3C (2022). #{emph[Decentralized Identifiers (DIDs) v1.0.]} W3C Recommendation, 19 Temmuz 2022. Ayrıca: W3C (2026). #{emph[Decentralized Identifiers (DIDs) v1.1.]} W3C Candidate Recommendation Snapshot, 5 Mart 2026.]

#kaynak("7")[W3C Decentralized Identifier Working Group. #{emph[DID Extensions: DID Methods.]} W3C Group Note (yaşayan liste), w3.org\/TR\/did-extensions-methods (erişim: Kasım 2026).]

#kaynak("8")[Sovrin Foundation (2025). "Sovrin Foundation MainNet Ledger Shutdown Likely on or before March 31, 2025." sovrin.org, 8 Şubat 2025. Ayrıca: Sovrin Foundation (2026). "The Sovrin Foundation Has Been Dissolved — but Sovrin MainNet Remains." sovrin.org, 20 Ocak 2026.]

#kaynak("9")[Microsoft. "What’s new in Microsoft Entra Verified ID" ve "Frequently Asked Questions (FAQ)." learn.microsoft.com (erişim: Kasım 2026).]

#kaynak("10")[Hyperledger Indy. #{emph[HIPE 0011: Credential Revocation.]} hyperledger-indy.readthedocs.io (erişim: Kasım 2026).]

#kaynak("11")[Looker, T., Bastian, P. ve Bormann, C. #{emph[Token Status List (TSL).]} IETF OAuth Çalışma Grubu İnternet taslağı, draft-ietf-oauth-status-list (yazının yayın tarihindeki son sürüm).]

#kaynak("12")[Avrupa Parlamentosu ve Konseyi (2016). #{emph[Kişisel verilerin işlenmesi bakımından gerçek kişilerin korunması ve bu verilerin serbest dolaşımına ilişkin 2016\/679 sayılı Tüzük (AB) (Genel Veri Koruma Tüzüğü).]} Avrupa Birliği Resmî Gazetesi, L 119, 4 Mayıs 2016.]

#kaynak("13")[Avrupa Birliği Adalet Divanı (2016). #{emph[Patrick Breyer v Bundesrepublik Deutschland]}, C-582\/14, 19 Ekim 2016, ECLI:EU:C:2016:779.]

#kaynak("14")[#{emph[6698 sayılı Kişisel Verilerin Korunması Kanunu.]} Resmî Gazete, 7 Nisan 2016, sayı 29677. Ayrıca: #{emph[Kişisel Verilerin Silinmesi, Yok Edilmesi veya Anonim Hale Getirilmesi Hakkında Yönetmelik.]} Resmî Gazete, 28 Ekim 2017, sayı 30224.]

#kaynak("15")[CNIL (2018). #{emph[Blockchain et RGPD : quelles solutions pour un usage responsable en présence de données personnelles ?]} Commission Nationale de l’Informatique et des Libertés, Eylül 2018.]

#kaynak("16")[Finck, M. (2019). #{emph[Blockchain and the General Data Protection Regulation: Can distributed ledgers be squared with European data protection law?]} Avrupa Parlamentosu Araştırma Servisi (EPRS), Bilim ve Teknolojinin Geleceği Paneli (STOA), PE 634.445, Temmuz 2019.]

#kaynak("17")[Avrupa Veri Koruma Kurulu (EDPB). #{emph[Guidelines 02\/2025 on processing of personal data through blockchain technologies.]} Sürüm 1.0 (kamuoyu görüşü), Nisan 2025; Sürüm 2.0 (son hâl), 7 Temmuz 2026.]

#kaynak("18")[Matzutt, R., Hiller, J., Henze, M., Ziegeldorf, J. H., Müllmann, D., Hohlfeld, O. ve Wehrle, K. (2018). "A Quantitative Analysis of the Impact of Arbitrary Blockchain Content on Bitcoin." #{emph[Financial Cryptography and Data Security (FC 2018)]}, Lecture Notes in Computer Science 10957, Springer, 420–438.]

#kaynak("19")[Avrupa Komisyonu. "European Blockchain Partnership" (digital-strategy.ec.europa.eu) ve EBSI, "About us" (ebsi.eu); EBSI belgeleri: "The did:ebsi DID method (Legal Entities)", "DID method for Natural Persons" ve "Trusted Issuers Registry" (hub.ebsi.eu) (erişim: Kasım 2026).]

#kaynak("20")[Avrupa Komisyonu ve eIDAS Uzman Grubu. #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF).]} github.com\/eu-digital-identity-wallet (yaşayan belge; okunan sürüm yazının yayın tarihindeki son sürümdür).]

#kaynak("21")[DC4EU Konsorsiyumu. #{emph[Digital Credentials for Europe (DC4EU)]} proje tanıtımı. GRNET, grnet.gr (erişim: Kasım 2026).]

#kaynak("22")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024 (madde 45k ve 45l). Ayrıca: Avrupa Komisyonu (2025). #{emph[Nitelikli elektronik defterlere ilişkin referans standartları ve şartnameleri belirleyen 2025\/2531 sayılı Uygulama Tüzüğü (AB)]}, 16 Aralık 2025.]

#kaynak("23")[Laurie, B., Langley, A. ve Kasper, E. (2013). #{emph[Certificate Transparency.]} IETF RFC 6962. Ayrıca: Laurie, B., Messeri, E. ve Stradling, R. (2021). #{emph[Certificate Transparency Version 2.0.]} IETF RFC 9162; Chromium CT Policy, "Certificate Transparency Enforcement in Google Chrome" (ct-policy duyuru listesi, 2018).]

#kaynak("24")[e-Estonia. "KSI Blockchain." e-estonia.com (erişim: Kasım 2026).]

#kaynak("25")[Wüst, K. ve Gervais, A. (2018). "Do you need a Blockchain?" #{emph[2018 Crypto Valley Conference on Blockchain Technology (CVCBT)]}, IEEE, 45–54. Ayrıca: Yaga, D., Mell, P., Roby, N. ve Scarfone, K. (2018). #{emph[Blockchain Technology Overview.]} NIST Internal Report 8202, Ekim 2018.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Karl Wüst ve Arthur Gervais, #{emph[Do you need a Blockchain?]} (2018).]} Kısa ve sade; zincirin ne zaman gerektiğini adım adım soran bir karar şeması. Bu yazının Bölüm 8’deki çerçevesinin de çıkış noktası.
+ #{strong[EDPB, #{emph[Guidelines 02\/2025 on processing of personal data through blockchain technologies]} (2026).]} Avrupa’nın veri koruma otoritelerinin ortak görüşü; özellikle zincire ne yazılmaması gerektiğini anlatan bölümler.
+ #{strong[Michèle Finck, #{emph[Blockchain and the General Data Protection Regulation]} (EPRS, 2019).]} GDPR ile dağıtık defterler arasındaki gerilimin en kapsamlı hukuki incelemelerinden biri; ilk iki bölümü teknik bilgi gerektirmez.
+ #{strong[RFC 9162, #{emph[Certificate Transparency Version 2.0]} (2021), giriş bölümleri.]} Zincirsiz bir şeffaflık günlüğünün nasıl çalıştığını ve neden işe yaradığını anlatan, internetin bugün kullandığı tasarım.
+ #{strong[EBSI belgeleri, gerçek ve tüzel kişiler için DID yöntemleri.]} Bir kamu blokzincir altyapısının kişileri zincirin dışında tutmak için tasarımını nasıl değiştirdiğini kendi ağzından anlatır.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. Teknik terimlerin İngilizce karşılıkları, başka kaynaklarda aranabilmeleri için verilmiştir.

Terimler alfabetik sıradadır, ama yazıdaki yerlerine göre üç kümede de okunabilir. Zincirin yapı taşları (özet zinciri, Merkle ağacı, dahil olma ve tutarlılık kanıtları, uzlaşma, izinli ve izinsiz zincir, QBFT, akıllı sözleşme) Bölüm 2’de tanıtılır. Merkeziyetsiz tanımlayıcılarla ilgili terimler (DID, DID belgesi, DID yöntemi, kriptografik toplayıcı) Bölüm 4’te, kişisel veriyle ilgili terimler (silme hakkı, anonim hâle getirme, takma adlandırma, tuz, kripto silme) Bölüm 5’te geçer. Tanıklıkla ilgili terimler, yani şeffaflık günlüğü, bölünmüş görüş saldırısı, çapa günlüğü ve projeksiyon, Bölüm 7’nin konusudur. Bir terimin sözlükteki tanımı, ilk geçtiği yerdeki açıklamanın kısa bir özetidir; ayrıntı ve örnek için o bölüme dönmek yararlı olur.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (16fr, 20fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Akıllı sözleşme], [smart contract], [Zincirde saklanan ve her doğrulayıcının aynı biçimde çalıştırdığı küçük program; hukuki sözleşme değildir],),
  ([Anonim hâle getirme], [anonymisation], [Verinin başka verilerle eşleştirilse bile bir kişiyle ilişkilendirilemez hâle getirilmesi (KVKK)],),
  ([Bizans hatasına dayanıklılık], [Byzantine fault tolerance (BFT)], [Katılımcıların bir kısmı yalan söylese ya da sussa bile doğru olanların anlaşabilmesi],),
  ([Bölünmüş görüş saldırısı], [split-view attack], [Bir yayıncının farklı taraflara aynı anda farklı kayıtlar göstermesi],),
  ([Çapa, çapa günlüğü], [anchor, anchor log], [Bir kaydın özetinin, sonradan değiştirilemeyeceği herkese açık bir ortama düzenli olarak yazılması],),
  ([Dahil olma kanıtı], [inclusion proof], [Bir kaydın Merkle ağacında bulunduğunu birkaç özetle gösteren kanıt],),
  ([DID belgesi], [DID document], [Bir merkeziyetsiz tanımlayıcı çözüldüğünde elde edilen, açık anahtarları içeren belge],),
  ([DID yöntemi], [DID method], [Bir DID’in nerede ve nasıl oluşturulup çözüleceğini tanımlayan kurallar (ör. did:key, did:web)],),
  ([Doğrulayıcı (zincirde)], [validator], [İzinli bir zincirde blokları onaylayan, kimliği bilinen katılımcı],),
  ([EBSI], [European Blockchain Services Infrastructure], [Avrupa Blokzincir Ortaklığı’nın kamu hizmetleri için kurduğu izinli zincir],),
  ([Elektronik defter], [electronic ledger], [eIDAS 2.0’da kayıtların kökenini ve sırasını güvenceye alan güven hizmeti],),
  ([İş ispatı], [proof of work], [Blok yazma hakkını büyük hesaplama yapana veren uzlaşma yöntemi],),
  ([İzinli zincir], [permissioned blockchain], [Blokları onaylayanların önceden belirli ve kimliklerinin bilinir olduğu zincir],),
  ([İzinsiz zincir], [permissionless blockchain], [Herkesin katılıp blok önerebildiği zincir],),
  ([Kripto silme], [crypto-shredding], [Zincir dışındaki veri ve tuz yok edilerek zincirdeki özetin anlamsız bırakılması],),
  ([Kriptografik toplayıcı], [cryptographic accumulator], [Bir kümeyi tek bir değerle temsil eden ve üyeliğin gizlice kanıtlanmasını sağlayan yapı],),
  ([Kurcalanınca belli olma], [tamper-evidence], [Değişikliği engellemeyen ama fark edilir kılan özellik],),
  ([Merkle ağacı], [Merkle tree], [Kayıtların özetlerini ikişer ikişer birleştirip tek bir kök özete indiren ağaç],),
  ([Merkeziyetsiz tanımlayıcı], [decentralized identifier (DID)], [Merkezî bir kayıt kurumuna bağlı olmadan oluşturulan tanımlayıcı],),
  ([Özet zinciri], [hash chain], [Her kaydın bir öncekinin özetini taşıdığı kayıt dizisi],),
  ([Projeksiyon], [projection], [Zincirin yalnızca imzalı listelerin özetlerini yansıttığı, güvenin kaynağı olmadığı tasarım],),
  ([QBFT], [QBFT], [İzinli zincirlerde kullanılan, n = 3f + 1 doğrulayıcıyla f hataya dayanan uzlaşma algoritması],),
  ([Silme hakkı], [right to erasure], [Kişinin verisinin silinmesini isteme hakkı (GDPR madde 17, KVKK madde 7)],),
  ([Şeffaflık günlüğü], [transparency log], [Yalnızca ekleme yapılabilen, Merkle ağacıyla tutulan herkese açık günlük],),
  ([Takma adlandırma], [pseudonymisation], [Verinin ek bilgi olmadan kişiye bağlanamayacak hâle getirilmesi; GDPR’da kişisel veri olmaya devam eder],),
  ([Tutarlılık kanıtı], [consistency proof], [Bir günlüğün iki hâli arasında yalnızca ekleme yapıldığını gösteren kanıt],),
  ([Tuz], [salt], [Özetle birleştirilen, olası değerlerin denenmesini engelleyen rastgele değer],),
  ([Uzlaşma], [consensus], [Birbirine güvenmeyen bilgisayarların sıradaki kayıt üzerinde anlaşma yöntemi],),
))

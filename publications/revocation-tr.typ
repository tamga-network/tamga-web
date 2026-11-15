// A7 — İptal. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "İptal",
  altbaslik: "Bir Belgeyi Geri Almak, Kimseyi İzlemeden",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Aralık 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("iptal", "askıya alma", "sertifika iptal listesi", "OCSP", "Token Status List", "sürü gizliliği", "tazelik", "kısa ömürlü belge", "eIDAS 2.0", "EUDI cüzdanı",),
  atif: "Karataş, B. (2026). İptal: Bir Belgeyi Geri Almak, Kimseyi İzlemeden. Tamga Network Akademik Çalışmalar, A7. https://tamga.network/files/publications/revocation-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
İmzalı bir dijital belge, imzalandığı andan sonra kendi başına değişmez. Ama belgenin anlattığı dünya değişir: Öğrenci mezun olur, ehliyete el konur, bir kimlik kartı kaybolur, bir diplomanın sahte bilgilere dayandığı ortaya çıkar. Belgeyi veren kurumun, verdiği belgeyi geri alabilmesi, yani #{strong[iptal edebilmesi]} gerekir. Asıl zorluk bu kararı duyurmaktadır. Doğrulayıcı her belgede kuruma "bu belge hâlâ geçerli mi?" diye sorarsa, kurum belgenin kime, ne zaman, nerede gösterildiğini öğrenir. Hiç sormazsa, iptal edilmiş belgeler kabul edilmeye devam eder. Bu yazı, bu iki kötü seçenek arasındaki yolu anlatıyor.

Hiçbir ön bilgi varsaymadan önce iptal, askı ve süre dolması kavramlarını ayırıyoruz. Sonra web’in kırk yıla yakın deneyiminden, sertifika iptal listeleri (CRL) ve çevrimiçi durum sorgusundan (OCSP) çıkan dersleri, bu yöntemlerin neden gizlilik sorunu doğurduğunu ve web’in bugün neden onlardan uzaklaştığını gösteriyoruz. Ardından AB dijital kimlik cüzdanının benimsediği IETF Token Status List yöntemini bit bit açıyoruz: belgenin listedeki sırası, sıkıştırma, imzalı liste, doğrulama adımları. Sürü gizliliğini, listenin asgari boyunu, indekslerin neden rastgele dağıtılması gerektiğini, çevrimdışı doğrulamada tazeliği ve iptale hiç ihtiyaç bırakmayan kısa ömürlü belgeleri tartışıyoruz. Yazının sonunda yöntemleri karşılaştırıyor, açık soruları sıralıyor ve Tamga Network’ün bu tablodaki yerini kısaca anlatıyoruz.
  ],
)

= Giriş: Mezun Olan Öğrencinin Kartı

Dizinin önceki yazılarından tanıdığımız Aynur, İstanbul’daki yüksek lisans programının ilk yılında. Üniversitesi, kayıt olduğu gün telefonundaki cüzdana dijital bir öğrenci belgesi gönderdi. Aynur bu belgeyi haftada birkaç kez kullanıyor: şehir müzelerinde öğrenci indirimi alırken, bir sinemada, bir kitapçıda, bir dil kursunda. Her seferinde kasadaki okuyucu belgenin imzasını kontrol ediyor ve indirimi uyguluyor.

İki yıl sonra Aynur mezun oluyor. Öğrenci belgesi artık doğru bir şey söylemiyor; ama telefonunda duruyor ve imzası hâlâ matematiksel olarak geçerli. Üniversite bu belgeyi nasıl geri alacak? Bir kâğıt kartı geri istemek mümkün; ama dijital bir belgenin sayısız kopyası olabilir ve kişinin cihazından silinmesini zorlamak ne mümkün ne de doğru. Üniversitenin yapabileceği tek şey, belgenin artık geçerli olmadığını #{strong[duyurmaktır]}. Müze, sinema ve kitapçı da bir belgeyi kabul etmeden önce bu duyuruya bakmalıdır.

Burada iki kötü seçenek var (Şekil 1). Birincisinde doğrulayıcılar hiç bakmaz; iptal edilen belge kabul edilmeye devam eder ve iptal kavramı anlamını yitirir. İkincisinde her doğrulayıcı, her belgede üniversiteye "bu belge hâlâ geçerli mi?" diye sorar. Bu çalışır, ama bir bedeli vardır: Üniversite, Aynur’un hangi gün hangi müzeye, hangi sinemaya gittiğini öğrenir. Dizinin ilk yazısında "eve telefon etme" (#{emph[phone home]}) adını verdiğimiz sorun, kapıdan çıkarıldığı yerden, iptal kontrolünün arka kapısından geri girmiş olur.

#sekil(1, [İptal sorusunun iki kötü cevabı ve aranan üçüncü yol], "figures/a7/sekil-1.svg", yarim: false)

Bu yazının konusu üçüncü yol. Doğrulayıcının iptali öğrendiği, ama belgeyi verenin belgenin nerede gösterildiğini öğrenmediği bir düzen kurmak mümkün mü? Mümkün, ve bu düzenin teknik adı #{strong[durum listesi]} (#{emph[status list]}). AB dijital kimlik cüzdanının benimsediği biçim, IETF’in #{strong[Token Status List]} belirtimidir.

Yazının planı şöyle: Bölüm 2’de iptal, askı ve süre dolması kavramlarını ayırıyoruz. Bölüm 3, web’in sertifika dünyasında kullanılan iptal listelerini ve çevrimiçi durum sorgusunu, gizlilik sorunlarıyla birlikte anlatıyor. Bölüm 4 Token Status List’i bit düzeyinde açıyor. Bölüm 5 sürü gizliliğine, Bölüm 6 çevrimdışı doğrulamada tazeliğe, Bölüm 7 iptale gerek bırakmayan kısa ömürlü belgelere ayrılmış durumda. Bölüm 8 yöntemleri karşılaştırıyor, Bölüm 9 AB’nin tercihlerini özetliyor, Bölüm 10 açık soruları tartışıyor. Bölüm 11 Tamga Network’ün yerini anlatıyor. Ek A’da yazıda geçen terimlerin sözlüğü var.

= Bir Belgenin Ömrü: Geçerlilik, Askı, İptal ve Süre Dolması

== Belgeler neden geri alınır?

Bir belgenin geri alınmasını gerektiren durumlar şaşırtıcı derecede çeşitlidir. Bazıları belgenin anlattığı gerçeğin değişmesinden doğar. Öğrenci mezun olur ya da okuldan ayrılır, bir çalışan işten çıkar, bir meslek odası üyesinin üyeliği sona erer. Bazıları belgenin kendisiyle ilgili bir hatadan doğar. Belgeye yanlış bir not ya da yanlış bir doğum tarihi yazılmıştır ve düzeltilmiş belge verilince eskisinin geri alınması gerekir. Bazıları ise güvenlikle ilgilidir. Kişinin telefonu çalınır ve belgenin bağlı olduğu anahtar başkasının eline geçmiş olabilir; ya da belgenin sahte bilgilere dayanarak alındığı anlaşılır.

Fiziksel dünyada bu durumların çoğu, belgenin kendisini geri almakla ya da üzerine bir işaret koymakla çözülür. Süresi dolan pasaportun köşesi kesilir; el konan ehliyet karakolda kalır. Dijital dünyada belgenin kendisi kişinin elinde kalır ve kopyalanabilir. Bu yüzden geri alma, belgenin dışında tutulan bir #{strong[durum bilgisine]} dönüşür.

== Üç kavram

Bu yazı boyunca birbirine karıştırılmaması gereken üç kavram kullanacağız (Şekil 2).

#{strong[Süre dolması]} (#{emph[expiry]}), belgenin içine en baştan yazılmış bir son geçerlilik tarihinin geçmesidir. Kimsenin bir karar vermesi gerekmez; tarih gelince belge kendiliğinden geçersiz olur. Doğrulayıcı bunu belgenin kendisine bakarak anlar; başka hiçbir kaynağa ihtiyaç yoktur.

#{strong[İptal]} (#{emph[revocation]}), belgeyi verenin, süresi dolmadan önce belgenin artık geçerli olmadığını ilan etmesidir. İptal kalıcıdır; iptal edilen bir belge yeniden geçerli hâle getirilmez. Kurum fikrini değiştirirse yeni bir belge verir.

#{strong[Askıya alma]} (#{emph[suspension]}), belgenin geçici olarak geçersiz sayılmasıdır. Askı kaldırılınca belge yeniden geçerli olur. Askının tipik örneği bir soruşturmadır: Bir diplomanın intihal şüphesiyle incelendiği bir dönemde kurum diplomayı kalıcı olarak iptal etmek istemez, ama inceleme sürerken kabul edilmesini de istemez. Kaybolan ama bulunması muhtemel bir kimlik kartı da benzer bir durumdur.

#sekil(2, [Bir belgenin ömrü: geçerlilik, askı, iptal ve süre dolması], "figures/a7/sekil-2.svg", yarim: false)

Bu ayrımın pratik bir sonucu vardır. Süre dolması doğrulayıcı için #{strong[ücretsizdir]}; belge kendi son tarihini taşır. İptal ve askı ise belgenin dışında duran, zamanla değişen ve doğrulayıcının bir şekilde öğrenmesi gereken bilgilerdir. Bu yazının bütün zorluğu bu ikinci gruptan doğar.

#kutu("teknik", [Süre dolması belgenin içinde nasıl yazar?])[
Dizinin ikinci yazısında anlattığımız SD-JWT VC biçimindeki bir belgede zamanla ilgili üç alan bulunabilir (değerler örnektir; zamanlar 1 Ocak 1970’ten bu yana geçen saniye sayısıdır):

#kod("json", "{
  \"iss\": \"https://universite.example\",
  \"iat\": 1789000000,
  \"nbf\": 1789000000,
  \"exp\": 1852072000,
  \"vct\": \"urn:example:ogrenci-belgesi\"
}", baslik: "Örnek: bir öğrenci belgesinin zaman alanları")

- #{raw("iat")} (#{emph[issued at]}): belgenin verildiği an.
- #{raw("nbf")} (#{emph[not before]}): belgenin geçerli olmaya başladığı an.
- #{raw("exp")} (#{emph[expiration]}): belgenin son geçerlilik anı. Bu örnekte verilişten iki yıl sonrası.

Belgenin ömrünü bulmak için iki alanın farkını alıp güne çeviririz (bir gün 86.400 saniyedir):

#formul[$ "exp" - "iat" &= 1852072000 - 1789000000 = 63072000 "saniye" \
              &= 63072000 / 86400 = 730 "gün" approx 2 "yıl" $]

Doğrulayıcı bu alanları kendi saatiyle karşılaştırır. #{raw("exp")} geçmişse belge reddedilir. Bu kontrol için kimseye sormak gerekmez. İptal ve askı ise bu alanlarda yazmaz; belge verildikten sonra olan bir şeyi belgenin kendisi bilemez.
]

== İptalin anı ve kimin kararı olduğu

İptalle ilgili iki soru, teknik ayrıntılara girmeden önce cevaplanmalıdır. Birincisi #{strong[kimin]} iptal edebileceğidir. Çoğu sistemde yalnızca belgeyi veren kurum iptal edebilir. Bazı durumlarda kişinin kendisi de iptal isteyebilir; örneğin telefonu çalındığında cüzdanındaki belgelerin geçersiz kılınmasını ister. AB’nin cüzdan düzenlemesinde kişinin kimlik bilgisinin (PID) hangi durumlarda iptal edileceği ve kişiye ne kadar sürede haber verileceği de kurallara bağlanmıştır.

İkinci soru iptalin #{strong[ne zaman]} geçerli olduğudur. Bir öğrenci belgesi 30 Haziran’da iptal edildiyse, Aynur’un 29 Haziran’da aldığı müze indirimi geçerli miydi? Elbette evet. Ama doğrulayıcı iptali ancak kendi bilgisini tazelediği anda öğrenir; bu an 30 Haziran’dan biraz sonra olabilir. Bu aradaki boşluk, her iptal yönteminin bir parçasıdır ve Bölüm 6’da ayrıntılı tartışacağımız #{strong[tazelik]} sorusunun özüdür. Hiçbir yöntem bu boşluğu sıfıra indiremez; yöntemler yalnızca boşluğun ne kadar olacağına ve bu boşluk karşılığında neyin feda edileceğine karar verir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Süre dolması belgenin içinde yazar ve doğrulayıcı onu kimseye sormadan anlar. İptal kalıcı, askı geçicidir ve ikisi de belge verildikten sonra alınan kararlardır; bu yüzden belgenin dışında tutulan bir durum bilgisinden öğrenilir. İptal yöntemlerinin hepsi iki şeyi dengeler: iptalin doğrulayıcıya ne kadar hızlı ulaştığını ve bu sırada kimin neyi öğrendiğini.
]

= Web’in Deneyimi: İptal Listeleri ve Çevrimiçi Sorgu

Kimlik cüzdanlarının iptal sorununa nasıl yaklaştığını anlamak için önce, aynı sorunla otuz yılı aşkın süredir boğuşan bir sisteme, web sitelerinin sertifikalarına bakmak gerekiyor. Dizinin altıncı yazısında anlattığımız X.509 sertifikaları da iptal edilebilir: Bir sitenin gizli anahtarı çalınırsa, sertifikasının süresi dolmadan geçersiz kılınması gerekir. Web bu iş için sırayla iki yöntem geliştirdi ve ikisinin de sınırlarıyla karşılaştı.

== Sertifika iptal listesi: kara liste

İlk yöntem, X.509 standardının kendisi kadar eskidir: #{strong[sertifika iptal listesi]} (#{emph[certificate revocation list]}, CRL). Fikir basittir. Sertifika otoritesi, iptal ettiği bütün sertifikaların seri numaralarını bir listeye yazar, listeyi imzalar ve belirli aralıklarla yayımlar. Her sertifikanın içinde bu listenin nerede bulunacağı yazar. Doğrulayıcı listeyi indirir ve elindeki sertifikanın seri numarasının listede olup olmadığına bakar.

Bu bir #{strong[kara liste]} yaklaşımıdır: Listede yalnızca iptal edilenler bulunur, geçerli olanlar bulunmaz. Bir sertifikanın listede olmaması, onun geçerli olduğu anlamına gelir.

#kutu("teknik", [Bir CRL’in içi])[
RFC 5280’de \[20\] tanımlanan bir CRL’in insan tarafından okunabilir hâli şuna benzer (değerler örnektir, kısaltılmıştır):

#kod("text", "Sürüm:            2
İmza algoritması: ecdsa-with-SHA256
Veren:            C=XX, O=Örnek Sertifika Makamı, CN=Örnek Ara CA
Bu güncelleme:    2026-11-01 09:00:00 UTC
Sonraki güncelleme: 2026-11-08 09:00:00 UTC
İptal edilen sertifikalar:
  Seri: 0a:41:7c:…   İptal tarihi: 2026-10-12 14:22:05   Neden: anahtar ele geçirildi
  Seri: 13:9e:02:…   İptal tarihi: 2026-10-30 08:01:44   Neden: yerine yenisi verildi
  … (binlerce satır olabilir)
İmza: 30:46:02:21:…", baslik: "Örnek: okunur biçime çevrilmiş bir iptal listesi (CRL)")

Listede her iptal için seri numarası, iptal tarihi ve isteğe bağlı bir neden kodu bulunur. "Sonraki güncelleme" alanı, dizinin altıncı yazısındaki güven listelerinde gördüğümüz alanla aynı işi yapar: Bu tarihten sonra liste bayat sayılır.
]

CRL’in güzel bir özelliği vardır: #{strong[gizlilik]}. Doğrulayıcı listenin tamamını indirir; sertifika otoritesi, doğrulayıcının listede hangi seri numarasına baktığını bilmez. Aynı listeyi bir saat önce de, bir saat sonra da indirmiş olabilir. Bu özelliği aklımızda tutalım; Token Status List’in temeli de budur.

== CRL’in sorunları

CRL’in iki büyük sorunu vardı. Birincisi #{strong[boyuttur]}. Büyük bir sertifika otoritesi milyonlarca sertifika verir ve bunların küçük bir oranı bile iptal edilse liste megabaytlara ulaşabilir. 2014’te OpenSSL kütüphanesinde ortaya çıkan Heartbleed açığından sonra, gizli anahtarlarının sızmış olabileceğinden kuşkulanan çok sayıda site sertifikasını iptal ettirdi ve bazı listeler bir anda büyüdü. Bir telefonun bir web sitesine bağlanmak için önce birkaç megabaytlık bir liste indirmesi kabul edilebilir değildi.

İkincisi #{strong[tazeliktir]}. Liste belirli aralıklarla, örneğin haftada bir yayımlanırsa, iptal edilen bir sertifika bir hafta boyunca geçerli görünmeye devam edebilir. Aralığı kısaltmak listenin daha sık indirilmesi, yani daha fazla trafik demektir.

== OCSP: her seferinde sor

Bu sorunlara cevap olarak IETF, 1999’da #{strong[çevrimiçi sertifika durum protokolünü]} (#{emph[Online Certificate Status Protocol]}, OCSP) yayımladı \[1\]. Protokolün bugünkü sürümü 2013 tarihli RFC 6960’tır \[2\]. OCSP’de doğrulayıcı listenin tamamını indirmez. Bunun yerine sertifika otoritesinin işlettiği bir sunucuya, #{strong[tek bir sertifika]} için soru sorar: "Şu seri numaralı sertifika hâlâ geçerli mi?" Sunucu imzalı bir cevap döner: geçerli, iptal edilmiş ya da bilinmiyor.

#kutu("teknik", [Bir OCSP sorusu ve cevabı])[
OCSP mesajları ikili (ASN.1\/DER) biçimdedir. Bir soru ve cevabın içeriği sadeleştirilmiş olarak şöyledir (değerler örnektir; tablodaki $H$ bir özet fonksiyonudur, $t_1$ ve $t_2$ bu ve sonraki güncellemenin zamanıdır):

#adimlar((
  ("Doğrulayıcı → Sunucu", [#{strong[Soru.]} Verenin adının özetini (#{raw("9f86d0…")}), verenin anahtarının özetini (#{raw("2c26b4…")}) ve sertifikanın seri numarasını (#{raw("0a:41:7c:…")}) gönderir.], $(H_"ad", H_"anahtar", "seri")$),
  ("Sunucu → Doğrulayıcı", [#{strong[Cevap (imzalı).]} Durum: iptal edildi (2026-10-12 14:22:05, neden: anahtar ele geçirildi). Bu güncelleme 2026-11-03 10:00, sonraki güncelleme 2026-11-03 22:00 UTC.], $"imza"("durum", t_1, t_2)$),
))

Sorunun içinde sertifikanın seri numarası açıkça yer alır. Sunucu, hangi sertifikanın sorulduğunu bilmek #{strong[zorundadır]}; aksi hâlde cevap veremez.
]

OCSP, CRL’in iki sorununu da çözdü. Cevap küçüktü, birkaç yüz bayt. Sunucu her zaman en güncel bilgiyi verebiliyordu. Ama bu iki kazanç, ağır bir bedelle geldi.

== OCSP’nin gizlilik bedeli

Bir OCSP sorusunun içinde, sorulan sertifikanın seri numarası yazar. Web’de her sertifika tek bir siteye aittir. Demek ki tarayıcınız bir siteye bağlanıp o sitenin sertifikasını OCSP ile sorduğunda, sertifika otoritesi şunu öğrenir: "Şu IP adresinden biri, şu anda, şu siteye bağlanıyor." Bir sertifika otoritesi binlerce sitenin sertifikasını verdiğine göre, OCSP sunucusu internetteki dolaşımın büyük bir kısmını gören bir gözlem noktasına dönüşür.

Kimlik belgelerine uyarlandığında tablo daha da ağırlaşır. Aynur’un öğrenci belgesini OCSP benzeri bir yöntemle soran her müze, üniversiteye "Aynur’un belgesi şu anda bizim kasamızda" demiş olur. Üniversite bu bilgiyi kötüye kullanmasa bile, bilginin toplanmış olması bir risktir: sızabilir, mahkeme kararıyla istenebilir, başka amaçlarla kullanılabilir.

OCSP’nin bir de güvenilirlik sorunu vardı. Tarayıcılar, OCSP sunucusuna ulaşamadıklarında sayfayı açmayı reddetseydi, bir sertifika otoritesinin sunucusundaki her kesinti, binlerce sitenin açılmamasına yol açardı. Bu yüzden tarayıcıların çoğu "sessizce geç" (#{emph[soft-fail]}) kuralını benimsedi: Cevap gelmezse sertifikayı geçerli say. Ama bu kural, OCSP’yi tam da ihtiyaç duyulduğu anda işe yaramaz hâle getiriyordu. Çalınmış bir sertifikayla araya giren bir saldırgan, OCSP sorusunu da kolayca engelleyebilirdi. Chrome ekibinden bir mühendis 2012’de bu durumu "kaza anında kopan bir emniyet kemeri"ne benzetti ve tarayıcının çevrimiçi iptal kontrollerini bırakıp kendi derlediği iptal listelerine geçme planını duyurdu \[3\].

== Bir ara çözüm: zımbalama

OCSP’nin gizlilik sorununa bir ara çözüm, #{strong[OCSP zımbalama]} (#{emph[OCSP stapling]}) oldu. Bu yöntemde soruyu tarayıcı sormaz, sitenin kendisi sorar. Site, kendi sertifikasının durumu için sertifika otoritesinden düzenli olarak imzalı bir OCSP cevabı alır ve bu cevabı, sertifikasıyla birlikte, kendisine bağlanan her tarayıcıya "zımbalanmış" olarak verir. Cevap imzalı olduğu için site onu değiştiremez; tarayıcı da sertifika otoritesine hiç bağlanmaz.

Zımbalama, kimlik belgeleri dünyası için de öğretici bir fikirdir: Durum kanıtını #{strong[belgenin sahibinin]} taşıması. Ama web’de yaygınlaşamadı; sitelerin çoğu bunu açmadı, açanların bir kısmı yanlış yapılandırdı. Daha önemlisi, zımbalanmış cevap belgenin sahibi tarafından taşındığı için, kişiyi farklı doğrulayıcılar arasında tanınabilir kılan bir iz daha oluşturur. Bu soruya Bölüm 5’te döneceğiz.

== Web bugün nereye gidiyor?

Web’in bu alandaki yönü son birkaç yılda açıkça belli oldu: #{strong[çevrimiçi sorudan uzaklaşmak ve listeye geri dönmek]}, ama listeyi akıllıca sıkıştırarak.

#kutu("tarihce", [OCSP’den listelere dönüş])[
#{strong[2012 — Chrome.]} Chrome ekibi çevrimiçi iptal kontrollerini bırakma planını açıkladı. Tarayıcı bunun yerine, önemli iptalleri kendi güncelleme kanalıyla dağıtılan bir listede (CRLSet) toplayacaktı \[3\].

#{strong[2015 — ölçüm.]} Bir araştırma grubu, web’deki iptal düzeninin uçtan uca ilk kapsamlı ölçümünü yayımladı ve yaygın mobil tarayıcıların hiçbirinin iptal bilgisini kontrol etmediğini gösterdi \[4\].

#{strong[2017 — CRLite.]} Aynı çevreden araştırmacılar, web’deki bütün iptalleri yaklaşık on megabaytlık bir dosyaya sığdırıp her tarayıcıya dağıtmayı mümkün kılan, olasılıksal veri yapılarına dayalı bir yöntem önerdi \[5\].

#{strong[2023 — CA\/Tarayıcı Forumu.]} Forum, sertifika otoritelerinin OCSP sunmasını isteğe bağlı hâle getiren, buna karşılık CRL yayımlamayı zorunlu kılan bir karar aldı; kararın OCSP ve CRL kuralları 15 Mart 2024’te yürürlüğe girdi \[6\].

#{strong[2025 — Let’s Encrypt ve Firefox.]} Dünyanın en büyük ücretsiz sertifika otoritesi Let’s Encrypt, OCSP hizmetini gizlilik gerekçesiyle kapatacağını duyurdu; sertifikalarına OCSP adresi koymayı Mayıs 2025’te bıraktı ve OCSP sunucularını 6 Ağustos 2025’te kapattı \[7\]. Firefox ise CRLite’ı 137. sürümden itibaren bütün masaüstü kullanıcıları için açtı; tarayıcı günde ortalama yaklaşık 300 kilobayt iptal verisi indirerek, hiçbir siteye bağlanırken kimseye soru sormadan iptal kontrolü yapabiliyor \[8\].
]

Bu tarihçenin kimlik belgeleri için dersi açık: Çevrimiçi soru, ne kadar pratik görünürse görünsün, gözlem noktası yaratır ve kesinti anında ya çalışmaz ya da sistemi kilitler. İyi tasarlanmış, sıkıştırılmış, herkesin aynı biçimde indirdiği bir liste ise hem gizliliği hem de dayanıklılığı korur.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
CRL gizlidir ama büyük ve yavaştır. OCSP küçük ve günceldir ama her soruda sorulan sertifikayı açık eder ve sorgulanan sunucuyu bir gözlem noktasına dönüştürür. Web, otuz yıllık deneyimin sonunda çevrimiçi sorudan uzaklaşıp akıllıca sıkıştırılmış listelere dönüyor. Kimlik belgeleri için seçilen yöntem de bu dersin üzerine kurulu.
]

= Token Status List: Herkesin Durumu Tek Bir Bit Dizisinde

== Fikir: bir apartmanın posta kutuları

Bir apartmanın girişindeki posta kutularını düşünün. Her dairenin bir kutusu var ve her kutunun üzerinde küçük bir bayrak. Bayrak inikse her şey yolunda, kalkıksa daire boşaltılmış. Apartman yöneticisi bayrakları düzenli olarak günceller. Kapıdaki görevli bir ziyaretçinin hangi daireye gittiğini kontrol etmek istediğinde yöneticiyi aramaz; yalnızca o kutunun bayrağına bakar. Üstelik görevli bütün kutuların bir fotoğrafını sabah çekip gün boyunca o fotoğrafa da bakabilir. Yönetici, görevlinin hangi kutuya baktığını hiç öğrenmez.

Token Status List bu fikrin dijital karşılığıdır. Belgeyi veren kurum, verdiği her belgeye büyük bir listede bir #{strong[sıra numarası]} (#{emph[index]}) ayırır. Listedeki her sıra, birkaç bitlik bir durum değeri taşır: geçerli, iptal edilmiş ya da askıda. Kurum bu listeyi sıkıştırır, imzalar ve herkesin indirebileceği bir adreste yayımlar. Doğrulayıcı listenin tamamını indirir ve belgenin sırasına bakar. CRL’in gizliliği korunur, çünkü liste bütün olarak indirilir. CRL’in boyut sorunu da çözülür, çünkü her belge için yalnızca bir ya da iki bit harcanır ve liste çok iyi sıkışır.

Belirtim, IETF’in OAuth çalışma grubunda, kimlik cüzdanları alanında çalışan mühendisler tarafından geliştiriliyor \[9\]. Bu yazının yazıldığı tarihte belirtimin 21. taslağı yayımlanmış ve RFC olarak yayımlanmak üzere RFC Editörü’nün kuyruğuna girmişti. AB, cüzdan düzenlemelerinde bu belirtimin Nisan 2026 tarihli 20. taslağını referans olarak sabitledi \[10\].

== Belgenin tarafı: "beni şu listede, şu sırada ara"

Durum listesi kullanan bir belge, içinde küçük bir işaretçi taşır. Bu işaretçi doğrulayıcıya "benim durumumu şu adresteki listenin şu sırasında bulursun" der.

#kutu("teknik", [Belgedeki durum işaretçisi])[
SD-JWT VC biçimindeki bir belgede işaretçi #{raw("status")} alanında durur (değerler örnektir):

#kod("json", "{
  \"iss\": \"https://universite.example\",
  \"vct\": \"urn:example:ogrenci-belgesi\",
  \"exp\": 1852072000,
  \"status\": {
    \"status_list\": {
      \"idx\": 48213,
      \"uri\": \"https://status.universite.example/7f3a9c21\"
    }
  }
}", baslik: "Örnek: belgenin içindeki durum listesi işaretçisi")

- #{raw("idx")}: belgenin listedeki sırası. Sıfırdan başlar.
- #{raw("uri")}: durum listesinin adresi.

Bu alan, dizinin üçüncü yazısında anlattığımız seçici açıklamayla #{strong[gizlenemez]}. Doğrulayıcının iptali kontrol edebilmesi için her gösterimde açık olması gerekir. Bu küçük ayrıntının gizlilik açısından önemli sonuçları var; onları Bölüm 5’te tartışıyoruz.

Mobil ehliyet standardı ISO\/IEC 18013-5’e dayanan mdoc biçimindeki belgelerde de aynı bilgi, belgenin imzalı özet yapısının (MSO) içinde, CBOR biçiminde taşınır.
]

== Bit dizisi ve sıra numarası

Listenin kalbi bir #{strong[bit dizisidir]}. Her belge, dizide sabit sayıda bit kaplar. Belirtim bu sayının 1, 2, 4 ya da 8 olmasına izin verir; bu değerler sayesinde bir belgenin bitleri hiçbir zaman iki baytın arasına bölünmez ve hesaplar basit kalır \[9\].

#{strong[Bir bitlik]} listede her belgenin yalnızca iki durumu olabilir: 0 geçerli, 1 geçersiz. #{strong[İki bitlik]} listede dört durum vardır. Belirtim bunlardan üçüne ad verir: #{raw("0x00")} geçerli (#{emph[VALID]}), #{raw("0x01")} geçersiz yani iptal edilmiş (#{emph[INVALID]}), #{raw("0x02")} askıda (#{emph[SUSPENDED]}). Dördüncü değer #{raw("0x03")}, uygulamaların kendi tanımlayabileceği bir durum için ayrılmıştır.

Bitlerin baytlara nasıl yerleştirildiği, hiçbir belirsizlik kalmayacak biçimde tanımlanmıştır. Sıra numarası küçük olan belge, baytın #{strong[en düşük değerli]} bitine yerleşir. Bu kural ilk bakışta ters görünebilir, çünkü bir baytı yazarken en düşük değerli biti en sağa koyarız. Şekil 3 bunu bir örnekle gösteriyor.

#sekil(3, [Bir bitlik durum listesinde on altı belge ve iki bayt], "figures/a7/sekil-3.svg", yarim: false)

#kutu("teknik", [Bir belgenin durumunu bulmak: küçük bir hesap])[
Şekil 3’teki örnek, belirtimin kendi örneğidir. On altı belgenin durumları sırasıyla 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1 olsun. İlk sekiz belge birinci baytı oluşturur. Sıra 0 en düşük değerli bite ($2^0$), sıra 7 en yüksek değerli bite ($2^7$) yerleşir. Baytı alışık olduğumuz biçimde soldan sağa, yüksekten düşüğe yazıp değerini hesaplarsak:

#formul[$ "bayt 0" &= (10111001)_2 = 128 + 32 + 16 + 8 + 1 = 185 = "0xB9" \
"bayt 1" &= (10100011)_2 = 128 + 32 + 2 + 1 = 163 = "0xA3" $]

Genel kural şöyle: Her belge $b$ bit kaplıyorsa ve dizinin $n$ numaralı baytı $D[n]$ ise, $i$ sıralı belgenin hangi baytta ve o baytın kaçıncı bitinden başladığı, sonra da durumu şöyle bulunur ($floor(dot)$ aşağı yuvarlamadır):

#formul[$ n &= floor((i dot b) / 8) \
k &= (i dot b) mod 8 \
"durum" &= floor(D[n] / 2^k) mod 2^b $]

$2^k$’ye bölüp aşağı yuvarlamak baytı $k$ bit sağa kaydırmak, $2^b$’ye göre kalan almak da son $b$ biti ayırmak demektir. Aynur’un öğrenci belgesinin sırası 48213 ve liste iki bitlik olsun:

#formul[$ i dot b &= 48213 dot 2 = 96426 \
n &= floor(96426 / 8) = 12053 \
k &= 96426 mod 8 = 2 \
"durum" &= floor(D[12053] / 2^2) mod 2^2 $]

Doğrulayıcı dizinin 12053 numaralı baytını alır, iki bit sağa kaydırır ve son iki bite bakar. Sonuç #{raw("00")} ise belge geçerli, #{raw("01")} ise iptal edilmiş, #{raw("10")} ise askıdadır.

İki bitlik bir örnek daha: Dört belgenin durumları sırasıyla 1, 2, 0, 3 ise bu dört belge tek bir bayta sığar. Sıra 0 en düşük iki biti (#{raw("01")}), sıra 1 sonraki iki biti (#{raw("10")}), sıra 2 sonrakini (#{raw("00")}), sıra 3 en yüksek iki biti (#{raw("11")}) alır. Her belgenin değeri, sırası kadar dördün kuvvetiyle çarpılıp toplanır:

#formul[$ "bayt" &= 1 dot 4^0 + 2 dot 4^1 + 0 dot 4^2 + 3 dot 4^3 \
       &= 1 + 8 + 0 + 192 = 201 = (11001001)_2 = "0xC9" $]
]

== Sıkıştırma: yüz bin belge birkaç yüz bayta

Bir kurumun yüz bin belge verdiğini ve iki bitlik bir liste kullandığını düşünelim. Ham bit dizisinin boyu $100.000 dot 2 = 200.000 "bit"$, yani $200.000 div 8 = 25.000 "bayt"$’tır. Bu, bir web sayfasındaki küçük bir görsel kadardır. Ama dizinin çok önemli bir özelliği vardır: Belgelerin büyük çoğunluğu geçerlidir, yani dizi neredeyse tamamen sıfırlardan oluşur. Sıfırlarla dolu bir dizi olağanüstü iyi sıkışır.

Belirtim, diziyi yaygın bir sıkıştırma yöntemi olan DEFLATE ile, ZLIB veri biçiminde sıkıştırmayı ister ve mümkün olan en yüksek sıkıştırma düzeyinin kullanılmasını önerir \[9\]. Bu yazı için yaptığımız küçük bir denemede, yüz bin belgelik iki bitlik bir liste şu boyutlara sıkıştı:

#tablo([#{strong[Tablo 1.]} Yüz bin belgelik iki bitlik bir listenin sıkıştırılmış boyutu (iptaller rastgele dağıtılmış; yazarın denemesi).], (19fr, 11fr, 19fr), ([İptal ya da askı oranı], [Ham boyut], [Sıkıştırılmış boyut],), (
  ([hiç yok], [25\.000 bayt], [yaklaşık 50 bayt],),
  ([binde bir (100 belge)], [25\.000 bayt], [yaklaşık 250 bayt],),
  ([yüzde bir (1.000 belge)], [25\.000 bayt], [yaklaşık 1,5 kilobayt],),
  ([yüzde beş (5.000 belge)], [25\.000 bayt], [yaklaşık 4,9 kilobayt],),
))

Sıkıştırma oranı, ham boyutun sıkıştırılmış boyuta bölümüdür. Binde bir iptal olan listede dosya yüz kat, yüzde beş iptal olan listede bile beş kat küçülür:

#formul[$ 25.000 / 250 = 100, quad 25.000 / 1.500 approx 17, quad 25.000 / 4.900 approx 5 $]

Yani bir doğrulayıcı, yüz bin belgenin durumunu bir e-postanın ekinden çok daha küçük bir dosyayla öğrenebilir. Bu, Bölüm 3.2’deki CRL’lerle karşılaştırıldığında çok büyük bir farktır. CRL her iptal için seri numarası, tarih ve neden kodu taşıyan bir satır harcarken, durum listesi her belge için yalnızca bir ya da iki bit harcar.

== Durum listesi belirteci: imzalı liste

Sıkıştırılmış dizi tek başına yayımlanmaz; imzalı bir belirtecin içine konur. Bu belirtece #{strong[durum listesi belirteci]} (#{emph[Status List Token]}) denir. Belirtim iki gösterim tanımlar: JSON dünyası için JWT, ikili CBOR dünyası için CWT. Kimlik cüzdanlarında SD-JWT VC biçimindeki belgeler genellikle JWT gösterimini, mdoc biçimindekiler ise CWT gösterimini kullanır.

#sekil(4, [Belgeden durum listesi belirtecine: işaretçi, imzalı liste ve okunan bit], "figures/a7/sekil-4.svg", yarim: false)

#kutu("teknik", [Bir durum listesi belirtecinin içi])[
JWT gösteriminde belirtecin başlığı ve içeriği şöyledir (değerler örnektir, #{raw("lst")} kısaltılmıştır):

#kod("json", "{
  \"alg\": \"ES256\",
  \"typ\": \"statuslist+jwt\",
  \"x5c\": [\"MIIB…\"]
}", baslik: "Örnek: durum listesi belirtecinin başlığı")

#kod("json", "{
  \"sub\": \"https://status.universite.example/7f3a9c21\",
  \"iat\": 1793606400,
  \"exp\": 1793628000,
  \"ttl\": 120,
  \"status_list\": {
    \"bits\": 2,
    \"lst\": \"eNrbuRgAAhcBXQ…\"
  }
}", baslik: "Örnek: durum listesi belirtecinin içeriği")

- #{raw("typ")}: belirtecin bir durum listesi olduğunu söyler. Doğrulayıcı başka türden bir JWT’yi durum listesi diye kabul etmez.
- #{raw("sub")}: listenin adresi. Belgedeki #{raw("uri")} ile #{strong[birebir aynı]} olmalıdır; böylece bir saldırgan başka bir listenin belirtecini bu listenin yerine koyamaz.
- #{raw("iat")} ve #{raw("exp")}: belirtecin üretildiği ve geçerliliğini yitirdiği an. Bu örnekte belirteç $1793628000 - 1793606400 = 21600$ saniye, yani $21600 div 3600 = 6$ saat geçerlidir.
- #{raw("ttl")} (#{emph[time to live]}): doğrulayıcının yenisini çekmeden önce bu belirteci en çok kaç saniye kullanabileceği. Bölüm 6’da ayrıntılı ele alıyoruz.
- #{raw("status_list.bits")}: her belgenin kaç bit kapladığı.
- #{raw("status_list.lst")}: sıkıştırılmış dizinin, internette güvenle taşınabilsin diye Base64URL ile metne çevrilmiş hâli.

HTTP üzerinden istenirken medya türü #{raw("application/statuslist+jwt")} (CWT için #{raw("application/statuslist+cwt")}) kullanılır.
]

Doğrulayıcının bir belgenin durumunu kontrol ederken izlediği yol şöyle özetlenebilir:

#adimlar((
  ("Doğrulayıcı", [#{strong[İşaretçi.]} Belgedeki #{raw("status")} alanından #{raw("idx")} ve #{raw("uri")} değerlerini alır.], $("idx", "uri") <- "belge.status"$),
  ("Doğrulayıcı", [#{strong[Önbellek.]} Bu adresin belirtecini önceden indirilmiş önbellekte bulur; yoksa ya da bayatsa yenisini çeker.], $"belirteç" <- "önbellek"("uri")$),
  ("Doğrulayıcı", [#{strong[İmza ve yetki.]} Belirtecin türünü, imzasını ve imzacı sertifikasının belgeyi verenle aynı güven zincirine bağlandığını kontrol eder; imzacının yetkisini dizinin altıncı yazısında anlattığımız güven listelerinden öğrenir.], $"typ" = "statuslist+jwt"$),
  ("Doğrulayıcı", [#{strong[Adres eşleşmesi.]} Belirtecin #{raw("sub")} alanının belgedeki #{raw("uri")} ile aynı olduğunu kontrol eder.], $"sub" = "uri"$),
  ("Doğrulayıcı", [#{strong[Tazelik.]} #{raw("exp")} geçmişse belirteci kullanmaz.], $t_"şimdi" < "exp"$),
  ("Doğrulayıcı", [#{strong[Okuma.]} #{raw("lst")} alanını açar, #{raw("idx")} sırasındaki değeri okur ve yorumlar.], $"durum" = floor(D[n] / 2^k) mod 2^b$),
))

Üçüncü adım önemlidir. Durum listesi belirteci, belgenin kendisinden #{strong[ayrı bir anahtarla]} imzalanabilir. Belirtim bunun için belirteçte imzacının sertifikasının taşınmasına izin verir. Ayrı anahtar kullanmanın iyi bir gerekçesi var: Belge imzalama anahtarı seyrek kullanılır ve güvenli donanımda, çoğu zaman çevrimdışı tutulur. Durum listesi ise sık sık, belki her birkaç dakikada bir yeniden imzalanır; anahtarının çevrimiçi bir sistemde durması gerekir. İki anahtarı ayırmak, çevrimiçi anahtar çalınsa bile saldırganın sahte #{strong[durum]} yayımlayabilmesini, ama sahte #{strong[belge]} üretememesini sağlar.

#kutu("ornek", [Aynur’un mezuniyet haftası])[
30 Haziran sabahı Aynur’un mezuniyeti öğrenci işleri sistemine işleniyor. Sistem, Aynur’un öğrenci belgesinin sırasını, yani 48213’ü, iptal kuyruğuna ekliyor. Üniversitenin durum servisi iki dakikada bir yeni bir liste yayımlıyor; bir sonraki yayında listenin 48213. sırasındaki iki bit #{raw("00")}’dan #{raw("01")}’e dönüyor. Liste yeniden sıkıştırılıyor, imzalanıyor ve aynı adreste yayımlanıyor. Dışarıdan bakan biri yalnızca "yeni bir sürüm var" görüyor; bu, iki dakika önceki yayından ve iki dakika sonraki yayından farksız.

Şehrin müzesi, kabul ettiği kurumların listelerini on dakikada bir indiriyor. 30 Haziran öğleden sonra, Aynur’un iptali müzenin önbelleğine ulaşmış durumda. 1 Temmuz’da Aynur alışkanlıkla öğrenci belgesini gösteriyor. Müzenin okuyucusu imzayı doğruluyor, belgenin son geçerlilik tarihinin henüz gelmediğini görüyor, sonra kendi önbelleğindeki listede 48213. sıraya bakıyor ve #{raw("01")} buluyor. Ekranda "Bu belge veren kurum tarafından iptal edilmiş" yazıyor. Aynur tam bilet alıyor.

Bu konuşmadan üniversitenin hiçbir haberi olmuyor. Müze listeyi o sabah da indirmişti, öğlen de indirdi, akşam da indirecek. Üniversitenin sunucusu yalnızca müzenin her zamanki indirme isteklerini görüyor; hangi gün hangi öğrencinin kasada durduğunu bilmiyor. Listede iptalin nedeni de yazmıyor. CRL’de bir iptalin yanında bir neden kodu bulunabilirken, durum listesinde yalnızca iki bit var. Müze Aynur’un mezun mu olduğunu, okuldan mı ayrıldığını, yoksa belgesinin bir hatadan dolayı mı yenilendiğini bilmiyor. Bilmesine de gerek yok.
]

== Kurumun tarafı: listeyi işletmek

Buraya kadar listeye doğrulayıcının gözünden baktık. Kurumun tarafında ise birkaç iş daha var ve bunların her biri, listenin gizliliğini ve güvenilirliğini doğrudan etkiliyor.

#{strong[Sıra ayırmak.]} Kurum bir belge verdiği anda, o belgeye listede bir sıra ayırır ve bu sırayı belgenin içine yazar. Sıra bir kez belgeye yazıldıktan sonra değişemez; çünkü belge imzalıdır. Bu yüzden sıranın nasıl seçildiği, belgenin bütün ömrü boyunca taşıyacağı bir karardır. Bölüm 5’te bu seçimin neden rastgele yapılması gerektiğini göreceğiz.

#{strong[Değişiklikleri biriktirmek.]} Bir iptal ya da askı kararı geldiğinde kurum listeyi hemen yeniden yayımlamaz; değişikliği bir kuyruğa alır ve bir sonraki yayında listeye işler. Yayınların sabit aralıklarla yapılmasının nedenini Bölüm 6.3’te tartışıyoruz.

#{strong[Yeni liste açmak.]} Bir listenin sıraları tükenmeye yaklaştığında kurum yeni bir liste açar. Eski liste, içindeki belgelerin hepsinin süresi dolana kadar yayımlanmaya devam eder; çünkü o belgelerin her biri hâlâ eski listenin adresini taşır.

#{strong[Listelerini duyurmak.]} Doğrulayıcının bir kurumun bütün listelerini önceden indirebilmesi için hangi listelerin var olduğunu bilmesi gerekir. Bir doğrulayıcı listeleri ancak belgelerin içinde gördükçe öğrenirse, ilk karşılaştığı belgede listeyi o anda indirmek zorunda kalır ve Bölüm 6.1’de anlatacağımız iz yeniden ortaya çıkar. Token Status List belirtimi bunun için isteğe bağlı bir #{strong[toplama]} (#{emph[aggregation]}) mekanizması tanımlar. Kurum, bütün liste adreslerini tek bir yerde yayımlar; bu adres kurumun üst verisinde ya da liste belirtecinin içindeki #{raw("aggregation_uri")} alanında yazar \[9\]. Doğrulayıcı bu toplu listeyi bilerek bir kurumun bütün durum listelerini, hiçbir belge görmeden önce indirebilir.

#{strong[Anahtarı yenilemek.]} Durum listesini imzalayan anahtar sık kullanıldığı için düzenli olarak yenilenmelidir. Yeni anahtarın sertifikası, belgeyi verenin güven zincirine bağlı olmalı ve doğrulayıcıların güven listesinden öğrenebileceği biçimde yayımlanmalıdır. Dizinin altıncı yazısında anlattığımız güven listeleri, bu anahtarların da kayıtlı olduğu yerdir.

== Bir akraba: W3C Bitstring Status List

Aynı fikrin bir benzeri, W3C’nin doğrulanabilir belgeler dünyasında da standartlaştı. #{strong[Bitstring Status List v1.0]}, 15 Mayıs 2025’te W3C önerisi olarak yayımlandı \[11\]. Bu belirtimde de belge, bir bit dizisindeki sırasını ve listenin adresini taşır; liste GZIP ile sıkıştırılır ve imzalı bir doğrulanabilir belge olarak yayımlanır. Önemli farklardan biri, her listenin tek bir #{strong[amaca]} hizmet etmesidir: iptal, askı, yenileme ya da mesaj. Bir belge iptal ve askı için iki ayrı listede iki ayrı sıra taşıyabilir. Bir diğer fark, bitlerin sırasıdır; W3C listesinde ilk sıra dizinin en soldaki bitidir. İki belirtim aynı sorunu benzer biçimde çözer; AB’nin cüzdan ekosistemi ise IETF belirtimini seçti.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Token Status List’te her belgenin büyük bir bit dizisinde bir sırası vardır ve o sıradaki bir ya da iki bit belgenin durumunu söyler. Dizi sıkıştırılır, imzalanır ve herkesin indirebileceği bir adreste yayımlanır. Yüz bin belgenin durumu birkaç yüz bayt ile birkaç kilobayt arasında bir dosyaya sığar. Doğrulayıcı listenin tamamını indirdiği için, kurum hangi belgeye bakıldığını öğrenmez.
]

= Sürü Gizliliği: Kalabalığın İçinde Kaybolmak

== Neden "sürü"?

Durum listesinin gizlilik vaadi tek bir şeye dayanır: Doğrulayıcı listenin #{strong[tamamını]} indirdiği için, kurum hangi belgenin sorgulandığını bilemez. Ama bu vaat, listede çok sayıda belge bulunduğu sürece anlamlıdır. Bir listede yalnızca tek bir belge olsaydı, o listeyi indiren her doğrulayıcı, aslında o tek belgenin sahibini sorguluyor olurdu. Listeyi indirmek, OCSP sorusu sormakla aynı şey olurdu.

Bu yüzden durum listelerinin gizliliğine #{strong[sürü gizliliği]} (#{emph[herd privacy]}) denir. Kişi, kalabalık bir sürünün içinde kaybolur. Liste ne kadar kalabalıksa, listeyi indirmenin taşıdığı bilgi o kadar azdır. Token Status List belirtimi de gizliliğin gücünün listenin büyüklüğüne bağlı olduğunu açıkça yazar ve kurumlara birkaç önlem önerir: birden çok listeyi aynı anda kullanmak, sıra numaralarını sırasız ya da rastgele dağıtmak ve gerçek belge sayısını gizlemek için listeye sahte girdiler eklemek \[9\].

#sekil(5, [Sürü gizliliği: küçük liste, sıralı dağıtım ve büyük rastgele liste], "figures/a7/sekil-5.svg", yarim: false)

== Asgari liste boyu

Ne kadar büyük bir liste yeterlidir? Bu soruya kesin bir cevap yok, ama belirtimler ve uygulamalar bir taban koyma eğiliminde. W3C’nin Bitstring Status List belirtimi, sürü gizliliği gerekçesiyle iptal listeleri için en az #{strong[131\.072 girdi]}, yani sıkıştırılmamış hâliyle 16 kilobaytlık bir dizi şart koşar \[11\]. Girdi başına bir bit düşünce hesap şöyledir: $131.072 = 2^17 "bit"$ ve $2^17 div 8 = 2^14 = 16.384 "bayt" = 16 "KiB"$. IETF belirtimi sabit bir sayı vermez, ilkeyi koyar ve sayıyı uygulamalara bırakır. Bölüm 11’de anlatacağımız Tamga Network profili ise her listenin en az 100.000 sıralık bir kapasiteyle açılmasını şart koşar.

Asgari boy, listenin #{strong[kapasitesini]} sınırlar; içindeki gerçek belge sayısını değil. Yeni açılmış bir listede yalnızca birkaç yüz belge olabilir. Ama bu, dışarıdan görünmez; çünkü geçerli bir belgenin değeri de hiç kullanılmamış bir sıranın değeri de sıfırdır. Dışarıdan bakan biri, sıfırların hangisinin bir belgeye ait olduğunu ayırt edemez.

== Sıra numarası neden rastgele olmalı?

Belgedeki #{raw("idx")} değeri, Bölüm 4.2’de gördüğümüz gibi gizlenemez; her gösterimde doğrulayıcı onu görür. Kurum sıra numaralarını basit bir sayaçla, ilk belgeye 0, ikinciye 1, üçüncüye 2 diye dağıtırsa, bu numara kendi başına bir bilgi taşımaya başlar.

Bir üniversitenin mezuniyet belgelerini düşünelim. Sıra numarası 12 olan bir mezun, o listede on ikinci belgeyi almış kişidir. Mezuniyetler belirli tarihlerde toplu yapıldığı için, sıra numarası mezuniyet dönemini, hatta bölümün sırasını ele verebilir. İki mezunun sıra numaraları arasındaki fark, aralarındaki zaman farkını yaklaşık gösterir. Küçük bir bölümde bu bilgi kişiyi neredeyse tek başına tanımlar. Daha kötüsü, kişi dizinin üçüncü yazısında anlattığımız seçici açıklamayla mezuniyet tarihini gizlemiş olsa bile, tarih sıra numarası üzerinden sızar.

Çözüm, sıra numaralarını listenin kapasitesi içinden #{strong[rastgele]} seçmektir. Rastgele bir sıra numarası, kişinin ne zaman belge aldığı ya da kaçıncı sırada aldığı hakkında hiçbir şey söylemez.

== Adres de bir bilgidir

Aynı mantık listenin adresi için de geçerlidir. Belgedeki #{raw("uri")} alanı da gizlenemez. Kurum listelerine anlamlı adlar verirse, örneğin #{raw("…/muhendislik-2026")} ya da #{raw("…/tip-fakultesi-lisans")}, adres kişinin fakültesini ve mezuniyet yılını herkese söyler. Bu yüzden iyi bir tasarımda liste adresleri #{strong[opak]} olur: #{raw("…/7f3a9c21")} gibi, hiçbir anlam taşımayan, rastgele üretilmiş bir dize. Kurum, hangi adresin hangi gruba ait olduğunu kendi içinde tutar.

Listelerin nasıl bölündüğü de aynı soruya bağlıdır. Her mezuniyet yılı için ayrı liste açmak idari olarak kolaydır, ama adres opak olsa bile, bir listeye ait olmak o yılı ele verir. Daha güvenli olan, yeni listeyi yalnızca eski liste dolduğunda açmaktır. Belge türüne göre ayrı liste tutmak ise zararsızdır, çünkü belgenin türü zaten gösterimde açıktır.

== Küçük kurum sorunu

Sürü gizliliğinin teknik bir çözümü olmayan bir sınırı var. Üç yüz öğrencisi olan küçük bir meslek yüksekokulu düşünelim. Okul yüz binlik bir liste açabilir ve sıraları rastgele dağıtabilir. Ama listede gerçekten belge sahibi olan yalnızca üç yüz kişi vardır. Liste büyük, sürü küçüktür. Üstelik belgenin #{raw("iss")} alanı zaten okulun adını söylemektedir. Bu durumda gizlilik, listenin boyuyla sınırlı kalmaz, #{strong[kurumun büyüklüğüyle]} sınırlanır ve bunu düzeltecek bir bit hilesi yoktur.

Bir çözüm önerisi, küçük kurumların durum listelerini ortak bir yerde, büyük bir listenin içinde tutmaktır. Bu sürüyü büyütür ama yeni bir soru doğurur: O ortak listeyi kim işletecek ve o işletmeci bütün iptalleri görecek mi? Bu soruya Bölüm 10’da döneceğiz.

== Sürünün göremediği: doğrulayıcıların notlarını karşılaştırması

Sürü gizliliği, kurumun #{strong[doğrulayıcıyı]} izlemesini engeller. Ama başka bir izlemeyi engellemez. #{raw("idx")} ve #{raw("uri")} çifti bir belgede sabittir ve her gösterimde aynıdır. Aynur aynı öğrenci belgesini hem müzede hem sinemada gösterirse, iki işletme notlarını karşılaştırdığında aynı #{raw("idx")} ve #{raw("uri")} çiftini görür ve bu iki ziyaretin aynı kişiye ait olduğunu anlar.

Bu, Token Status List’in bilinen ve yapısal bir sınırıdır; belirtim de bunu açıkça yazar \[9\]. Çözümü, dizinin beşinci yazısında anlattığımız #{strong[toplu kopya]} (#{emph[batch issuance]}) yaklaşımıdır. Kurum aynı belgeden birden çok kopya verir; her kopya farklı bir anahtara bağlıdır ve listede farklı bir sırada durur. Cüzdan her gösterimde farklı bir kopya kullanır. Böylece iki doğrulayıcı aynı sırayı görmez. Bedeli, kurumun listesinde her kişi için birden çok sıra harcanması ve bir belge iptal edildiğinde bütün kopyalarının sırasının güncellenmesidir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Durum listesinin gizliliği kalabalıktan gelir. Liste büyük olmalı, sıra numaraları rastgele dağıtılmalı ve liste adresleri anlam taşımamalıdır; aksi hâlde sıra numarası ve adres, gizlenen bilgileri sızdırır. Küçük kurumlarda sürü küçük kalır. Aynı belgenin farklı doğrulayıcılara gösterilmesindeki izlenebilirliği ise ancak her gösterimde farklı kopya kullanmak giderir.
]

= Tazelik: İptal Doğrulayıcıya Ne Zaman Ulaşır?

== Önceden çekmek

Durum listesinin gizliliği, doğrulayıcının listeyi #{strong[önceden]}, belge gelmeden indirmesine dayanır. Bir müze, Aynur kasaya geldiği anda üniversitenin listesini indirirse, üniversitenin sunucusu indirme isteğinin saatini ve müzenin IP adresini görür. Liste bütün olarak indirilse bile, "şu müze şu dakikada benim listemle ilgilendi" bilgisi, o dakikada kasada duran öğrenciyle ilişkilendirilebilir. Özellikle küçük bir kurumun listesi için bu, kişiyi neredeyse tanımlar.

Bu yüzden iyi uygulamada doğrulayıcı listeleri #{strong[zamanlanmış olarak]}, belge gelsin ya da gelmesin, düzenli aralıklarla çeker ve önbellekte tutar. Kasada gelen belge için yalnızca bu önbelleğe bakılır. Böylece liste indirme istekleri tek tek doğrulamalarla ilişkilendirilemez. Token Status List belirtimi de önbelleği etkin kullanmayı ve indirme isteklerini gizleyen ara katmanlar kullanmayı gizlilik önlemleri arasında sayar \[9\].

== İki saat: ttl ve exp

Durum listesi belirtecindeki iki alan, önbelleğin nasıl kullanılacağını söyler.

#{strong[#{raw("exp")}]}, belirtecin mutlak son geçerlilik anıdır. Bu andan sonra belirteç hiçbir koşulda kullanılmaz. #{strong[#{raw("ttl")}]} ise bir yenileme ipucudur: Doğrulayıcı belirteci indirdikten sonra en çok bu kadar saniye bekleyip yenisini çekmelidir. Belirtim iki alanı birlikte kullanmayı önerir \[9\]. İkisi farklı soruları cevaplar. #{raw("ttl")} "iptaller bana ne kadar hızlı ulaşsın?" sorusunun, #{raw("exp")} ise "listenin sunucusu çökerse elimdeki kopyayla ne kadar idare edebilirim?" sorusunun cevabıdır.

#sekil(6, [Bir iptalin doğrulayıcıya ulaşması: yayın aralığı, ön çekim ve en kötü gecikme], "figures/a7/sekil-6.svg", yarim: false)

Bir iptalin doğrulayıcıya ulaşma süresi, iki aralığın toplamıyla sınırlıdır (Şekil 6). Kurum listesini her $T$ dakikada bir yayımlıyorsa ve doğrulayıcı her $P$ dakikada bir çekiyorsa, iptal önce en çok $T$ dakika bir sonraki yayını bekler, sonra en çok $P$ dakika doğrulayıcının bir sonraki çekimini. Kurum iki dakikada bir yayımlar, doğrulayıcı beş dakikada bir çekerse:

#formul[$ t_"gecikme" lt.eq T + P = 2 + 5 = 7 "dakika" $]

Yani iptal en geç yedi dakika civarında kasaya ulaşır. Bu, kâğıt dünyasıyla karşılaştırıldığında çok kısa bir süredir; dizinin altıncı yazısında anlattığımız güven listelerinin aylarla ölçülen güncelleme aralıklarından da kat kat kısadır.

== Değişiklik olmasa da yayımlamak

Kurumun listeyi ne zaman yayımladığı da bir bilgi sızdırabilir. Kurum listeyi yalnızca bir iptal olduğunda yeniden yayımlarsa, yeni bir sürümün ortaya çıkması "şu saatte bir iptal oldu" demektir. Bu bilgi, bir disiplin kararının ya da bir işten ayrılmanın tarihiyle birleştirilirse, iptal edilen kişi daraltılabilir. Bunun çaresi basittir: Liste, değişiklik olsun ya da olmasın, #{strong[sabit aralıklarla]} yeniden imzalanıp yayımlanır. Dışarıdan bakan biri yalnızca "listenin yeni bir sürümü var" görür; hangi bitin değiştiğini, hatta bir bitin değişip değişmediğini göremez.

== Listeyi geri sarmak

Durum listesinin bir zayıf noktası daha var. Liste kurumun kendi sunucusunda durur ve kurum, iptal ettiği bir belgeyi sessizce yeniden "geçerli" gösteren eski bir sürümü tekrar yayımlayabilir. Ya da sunucuyla doğrulayıcı arasına giren bir saldırgan, iptalden önceki bir sürümü sunabilir. İkinci tehlikeye karşı #{raw("exp")} alanı bir sınır koyar: Eski belirtecin süresi dolmuşsa kabul edilmez. Ama süresi içindeki eski bir sürüm, yenisinden ayırt edilemeyebilir.

Bu sorunun çözümü, dizinin altıncı yazısında güven listeleri için anlattığımız şeffaflık ilkesidir. Her yayımın özeti, kurumun kendisinin değiştiremeyeceği, herkese açık ve yalnızca eklenebilen bir günlüğe yazılırsa, doğrulayıcı elindeki listenin en güncel sürüm olup olmadığını kontrol edebilir. Belirtim bu konuda bir zorunluluk koymaz; ama bazı uygulamalar, Bölüm 11’de göreceğimiz gibi, bu ek güvenceyi kullanır.

== "Geçersiz" ile "şu an doğrulanamadı" farkı

Doğrulayıcı listeyi indiremiyorsa ve elindeki kopyanın #{raw("exp")} süresi dolmuşsa ne yapmalı? Dizinin altıncı yazısında güven listeleri için söylediğimiz ilke burada da geçerlidir. Belgeyi #{strong[reddetmek]} yanlıştır, çünkü belge büyük olasılıkla geçerlidir. Belgeyi #{strong[kabul etmek]} de yanlıştır, çünkü iptal edilmiş olabilir. Doğru cevap üçüncü bir cevaptır: "Şu an doğrulanamadı." Doğrulayıcı bunu kullanıcıya iptal edilmiş bir belgeden farklı göstermelidir. Bir diplomanın iptal edilmiş olması ile durumunun şu an kontrol edilememesi arasındaki fark, bir insanın işe alınıp alınmaması kadar büyük olabilir.

Her doğrulayıcı, işinin riskine göre ne kadar eski bir listeye razı olacağını kendisi belirler. Bir müze indiriminde birkaç saatlik bir liste yeterlidir. Bir banka hesabı açılışında ya da bir sınır kapısında ise bu süre çok daha kısa tutulabilir.

#tablo([#{strong[Tablo 2.]} Riske göre azami liste yaşı için örnek bir politika (değerler örnektir; her doğrulayıcı kendi işine göre belirler).], (12fr, 24fr, 26fr, 37fr), ([İşlem türü], [Örnek], [Kabul edilen en eski liste], [Liste daha eskiyse],), (
  ([Düşük riskli], [müze ya da sinema indirimi], [belirtecin #{raw("exp")} süresine kadar], ["şu an doğrulanamadı", indirim uygulanmaz],),
  ([Orta riskli], [iş başvurusunda diploma kontrolü], [yaklaşık bir saat], [yeniden çekmeyi dene, olmazsa "şu an doğrulanamadı"],),
  ([Yüksek riskli], [banka hesabı açılışı, resmî işlem], [birkaç yayın aralığı (dakikalar)], [işlemi beklet, kişiye nedenini açıkla],),
))

Tablo 2, aynı listenin farklı işlerde farklı sıkılıkla kullanılabileceğini gösteriyor. Liste yayımlayan kurum yalnızca belirtecin üst sınırını (#{raw("exp")}) koyar; doğrulayıcı bu sınırın altında, kendi riskine uygun bir eşik seçer. Bu seçim doğrulayıcının politikasında açıkça yazmalı ve denetim kaydına, kararın hangi liste sürümüne dayandığı da işlenmelidir.

== Tamamen çevrimdışı doğrulama

Dizinin dokuzuncu yazısında anlatacağımız yüz yüze senaryolarda doğrulayıcı cihaz, örneğin bir sınav salonundaki okuyucu, bütün gün internetsiz çalışabilir. Böyle bir cihaz durum listelerini sabah indirir ve gün boyunca o kopyayla çalışır. Öğlen iptal edilen bir belgeyi akşama kadar fark edemez. Bu sınır kabul edilebilir olabilir; ama cihazın, kullanıcıya son eşitleme zamanını göstermesi ve sonucu "çevrimdışı doğrulandı" diye işaretlemesi gerekir. Kullanıcı, kararın hangi bilgiye dayandığını bilmelidir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Doğrulayıcı listeleri belge geldiğinde indirmez, düzenli aralıklarla önceden çeker. Bir iptal, kurumun yayın aralığı ile doğrulayıcının çekme aralığının toplamı kadar gecikmeyle görülür. Liste değişmese de sabit aralıklarla yayımlanır ki iptalin anı sızmasın. Liste bayatsa doğru cevap "şu an doğrulanamadı"dır ve bu, iptalden farklı gösterilir.
]

= Kısa Ömürlü Belgeler: İptale Gerek Bırakmamak

== En kolay iptal, hiç iptal etmemek

Bölüm 2’de süre dolmasının doğrulayıcı için "ücretsiz" olduğunu söylemiştik: Belge kendi son tarihini taşır, kimseye sormak gerekmez. Bu gözlem akla basit bir soru getiriyor. Belgelerin ömrünü yeterince kısaltırsak, iptale hiç ihtiyaç kalmaz mı?

Bu fikir yeni değil. 1998’de açık anahtarlı şifrelemenin öncülerinden bir kriptograf, "İptal listelerini ortadan kaldırabilir miyiz?" başlıklı kısa bir makale yayımladı \[12\]. Makaleye göre bir belgenin ne kadar yeni olması gerektiğine, belgeyi kabul eden taraf karar vermeliydi. Belgenin sahibi de bu şartı karşılamak için, gerektiğinde verenden taze bir onay alıp sunmalıydı. Böylece "bu belge iptal edildi mi?" sorusu yerini "bu belge yeterince yeni mi?" sorusuna bırakacaktı. İkinci soru, belgenin içindeki tarihe bakarak, kimseye sormadan cevaplanabilir.

Kısa ömürlü belgede iptal şöyle işler: Kurum belgeyi iptal etmek istediğinde, yalnızca #{strong[yenilemeyi durdurur]}. Kişinin elindeki son kopya, birkaç saat ya da bir gün içinde kendiliğinden geçersiz olur. Ortada yayımlanacak bir liste, indirilecek bir dosya, sorulacak bir sunucu yoktur.

#sekil(7, [Kısa ömürlü kopyalarla iptal: kurum yalnızca yenilemeyi durdurur], "figures/a7/sekil-7.svg", yarim: false)

== Web’de kısa ömür

Web’in sertifika dünyası bu yolda epey ilerledi. CA\/Tarayıcı Forumu’nun 2023’teki kararı, ömrü en çok on gün olan sertifikalara #{strong[kısa ömürlü]} sertifika adını verdi ve bunlar için iptal bilgisi yayımlama zorunluluğunu kaldırdı; 15 Mart 2026’dan sonra verilen kısa ömürlü sertifikalarda bu sınır yedi güne indi \[6\]. Aynı forum 2025’te, bütün web sertifikalarının azami ömrünün 2029’a kadar adım adım 47 güne inmesine karar verdi \[13\]. Yani web, iptali iyileştirmeye çalışmanın yanında, iptale duyulan ihtiyacı da azaltıyor.

== AB’de kısa ömür

AB’nin cüzdan düzenlemeleri de aynı yolu açık bıraktı. 2026\/1731 sayılı Uygulama Tüzüğü’yle değişen kurallara göre, ömrü 24 saat ya da daha kısa olan öznitelik onaylarının iptal edilebilir olması gerekmez \[10\]. Kısa ömürlü belgeler özellikle sık kullanılan, düşük riskli ama gizlilik açısından hassas kanıtlar için uygundur. "18 yaşından büyüktür" gibi bir yaş kanıtı, her gün yenilenen kısa ömürlü bir kopya olarak cüzdanda tutulabilir; böylece bu kanıtın hiçbir durum listesinde sırası olmaz ve Bölüm 5.6’daki izlenebilirlik sorunu da kendiliğinden ortadan kalkar.

#kutu("ornek", [Aynur’un yaş kanıtı])[
Aynur’un cüzdanında kimlik bilgisinden türetilmiş bir "18 yaşından büyüktür" kanıtı var. Bu kanıtın ömrü 24 saat. Cüzdan her gece, telefon şarjdayken ve internete bağlıyken, kimlik bilgisini veren kurumdan birkaç yeni kopya alıyor; her kopya farklı bir anahtara bağlı. Aynur bir akşam bir konser salonunun kapısında bu kanıtı gösteriyor. Görevlinin okuyucusu imzayı ve süreyi kontrol ediyor; kopyanın üzerinde bir durum listesi işaretçisi yok, çünkü ona gerek yok. Kopya ertesi gün kendiliğinden geçersiz olacak.

Aynur’un telefonu çalınsa ve Aynur kimlik bilgisini iptal ettirse, cüzdan o gece yeni kopya alamaz. Hırsızın elindeki son kopya en geç bir gün içinde işe yaramaz hâle gelir. Kimlik bilgisini veren kurum ise Aynur’un hangi konsere gittiğini hiçbir aşamada öğrenmez; yalnızca cüzdanın her gece aynı saatte yenileme istediğini görür.
]

== Kısa ömrün bedeli

Kısa ömürlü belgeler bedelsiz değildir. Token Status List belirtimi de bu yolu bir seçenek olarak anar, ama veren kurumun altyapısına ek yük bindirdiğini not eder \[9\].

#{strong[Yenileme trafiği.]} Her kişinin her belgesi her gün yenilenecekse, kurumun belge verme sistemi sürekli çalışmak zorundadır. Milyonlarca kişiye kimlik bilgisi veren bir kurum için bu, ciddi bir yüktür.

#{strong[Çevrimiçi olma zorunluluğu.]} Cüzdanın kopyaları yenileyebilmesi için düzenli olarak internete bağlanması gerekir. Bir hafta internetsiz kalan bir telefondaki kısa ömürlü belgeler kullanılamaz hâle gelir.

#{strong[Yenilemenin kendisi bir izdir.]} Kurum, kişinin belgesini nerede gösterdiğini öğrenmez; ama cüzdanın ne zaman yenileme istediğini görür. Yenilemeler gerçek kullanımdan bağımsız, sabit bir takvimle yapılırsa bu iz bilgi taşımaz. Kullanıma bağlı yapılırsa, örneğin "kopya bitince yenile" denirse, kişinin ne sıklıkla belge gösterdiği kuruma yansır.

#{strong[Uzun ömürlü belgeler için uygun değil.]} Bir diploma ya da bir tapu kaydı yıllarca geçerli kalmalıdır. Bunları her gün yenilemek anlamsızdır. Bu tür belgeler için durum listesi hâlâ doğru araçtır.

== Sıfır bilgi ispatları ve iptal

Dizinin dördüncü yazısında anlattığımız sıfır bilgi ispatları, iptal konusunda özel bir sorun doğurur. Kişi, belgesini göstermeden yalnızca "18 yaşından büyüğüm" gibi bir ispat sunduğunda, belgenin #{raw("idx")} ve #{raw("uri")} değerlerini de açmaz. Açarsa, ispatın sağladığı bağlanamazlık kaybolur. Ama açmazsa doğrulayıcı, ispatın dayandığı belgenin iptal edilip edilmediğini kontrol edemez.

Bu sorunun iki çözüm yolu var. Birincisi, burada anlattığımız kısa ömürlü kopyalardır: İspat yalnızca ömrü birkaç saat ya da bir gün olan bir kopyaya dayanırsa, iptal kontrolüne gerek kalmaz. İkincisi, iptal edilmemişliğin kendisini de sıfır bilgiyle kanıtlamaktır. Kriptografide #{strong[akümülatör]} (#{emph[accumulator]}) adı verilen yapılar, bir değerin büyük bir kümeye ait olduğunu, hangi değer olduğunu açmadan kanıtlamayı sağlar ve iptal için yirmi yılı aşkın süredir araştırılmaktadır \[14\]. Ama bu yöntemler henüz kimlik cüzdanlarının standart profillerine girmiş değil. Bugün pratikte kullanılan yol, kısa ömürlü kopyalardır.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Belgenin ömrü yeterince kısaysa iptal, "yenilemeyi durdurmak"a dönüşür; ortada liste ya da sorgu kalmaz. Web ve AB bu yolu giderek daha çok kullanıyor. Bedeli, kurumun sürekli belge yenilemesi ve cüzdanın düzenli olarak çevrimiçi olmasıdır. Uzun ömürlü belgeler için durum listesi, sık kullanılan kısa kanıtlar için kısa ömürlü kopyalar uygun düşer.
]

= Yöntemlerin Karşılaştırması

Artık bu yazıda anlattığımız yöntemleri yan yana koyabiliriz. Tablo 3, her yöntemi aynı sorularla değerlendiriyor: İptal doğrulayıcıya ne kadar hızlı ulaşır, kurum neyi öğrenir, doğrulayıcılar notlarını karşılaştırırsa ne olur ve sistem çevrimdışı çalışabilir mi?

#tablo([#{strong[Tablo 3.]} İptal yöntemlerinin karşılaştırması.], (18fr, 22fr, 17fr, 18fr, 31fr, 24fr), ([Ölçüt], [CRL], [OCSP], [OCSP zımbalama], [Token Status List], [Kısa ömürlü belge],), (
  ([Ne yayımlanır?], [iptal edilenlerin listesi], [tek belge için imzalı cevap], [sahibin taşıdığı imzalı cevap], [herkesin durumunu taşıyan bit dizisi], [hiçbir şey; belge kendiliğinden biter],),
  ([Kurum neyi öğrenir?], [hiçbir şey (liste bütün indirilir)], [hangi belgenin, ne zaman, kimden soruldu], [sahibin ne zaman cevap aldığı], [listeyi kimin indirdiği; hangi belgeye bakıldığı değil], [yenilemenin zamanı],),
  ([Boyut], [iptal sayısıyla büyür], [çok küçük], [çok küçük], [belge başına 1–2 bit, çok iyi sıkışır], [yok],),
  ([İptalin gecikmesi], [liste aralığı], [çok kısa], [cevabın ömrü], [yayın + ön çekim aralığı], [son kopyanın ömrü],),
  ([Çevrimdışı çalışma], [son indirilen listeyle], [çalışmaz], [cevap geçerli kaldıkça], [son indirilen listeyle], [kopya geçerli kaldıkça],),
  ([Doğrulayıcılar arası izlenebilirlik], [sertifika seri numarası sabit], [seri numarası sabit], [cevap ve seri sabit], [sıra ve adres sabit; toplu kopyayla giderilir], [kopya başına farklı olabilir],),
  ([Askı desteği], [var (neden kodu)], [var], [var], [var (iki bitlik listede)], [yok],),
  ([Başlıca kullanım], [web sertifikaları (yeniden yükselişte)], [web sertifikaları (terk ediliyor)], [web sertifikaları (sınırlı)], [AB cüzdan belgeleri], [yaş kanıtı gibi sık kullanılan kanıtlar, web’de kısa ömürlü sertifikalar],),
))

Tablodan çıkan sonuç şu: Hiçbir yöntem bütün sütunlarda en iyi değil. OCSP iptali en hızlı duyurur ama gizliliği en çok zedeler. Kısa ömürlü belge gizliliği en iyi korur ama uzun ömürlü belgelere uymaz. Token Status List bu ikisinin arasında bir denge kurar: Gecikmeyi dakikalarla sınırlar, kurumun bireysel doğrulamaları görmesini engeller ve çevrimdışı çalışabilir. Zayıf yanı, doğrulayıcılar arası izlenebilirliğin ancak toplu kopyalarla giderilebilmesi ve sürü gizliliğinin küçük kurumlarda sınırlı kalmasıdır.

= AB’nin Tercihi

Avrupa Birliği’nin cüzdan düzenlemeleri, iptal konusunda bu yazıda anlattığımız derslerin büyük kısmını hukuki bir çerçeveye dönüştürdü.

#{strong[İzlenmeme bir yükümlülük.]} eIDAS 2.0’ın cüzdana ilişkin 5a maddesinin 16. fıkrası, cüzdanın teknik çerçevesinin, öznitelik onayı veren kurumların ya da başka tarafların, belge verildikten sonra işlemleri ya da kişinin davranışını izlemesine, bağlamasına ya da ilişkilendirmesine, kullanıcı açıkça izin vermedikçe, imkân vermemesini ister \[15\]. OCSP benzeri, her doğrulamada kuruma soru soran bir iptal yöntemi bu ilkeyle bağdaşmaz.

#{strong[Gizliliği koruyan durum bilgisi.]} Kişi kimlik verisine (PID) ilişkin 2024\/2977 sayılı Uygulama Tüzüğü, PID sağlayıcılarının verdikleri kimlik bilgilerinin geçerlilik durumunu gizliliği koruyan bir biçimde kamuya açık tutmasını ister \[16\]. Aynı tüzük, bir PID iptal edildiğinde kişiye iptalden sonraki 24 saat içinde, gerekçesiyle birlikte haber verilmesini de ister.

#{strong[Belirli bir taslak.]} 2026\/1731 sayılı Uygulama Tüzüğü, cüzdan düzenlemelerinde kullanılacak durum listesi biçimi olarak IETF Token Status List’in Nisan 2026 tarihli 20. taslağını referans aldı \[10\]. Bu, standartlaşma süreci henüz tamamlanmamış bir belirtimin hukuken sabitlenmesi demektir; belirtim RFC olarak yayımlandığında düzenlemenin buna göre güncellenmesi gerekecek.

#{strong[İkili durum, askı yok.]} Aynı değişikliklere göre PID’ler, nitelikli öznitelik onayları ve kamu kurumlarının öznitelik onayları için durum yalnızca "iptal edildi" ya da "iptal edilmedi" olabilir; askıya alma öngörülmez ve iptal kalıcıdır \[10\]. Bu, kimlik gibi temel belgeler için bilinçli bir sadeliktir: Bir kimlik bilgisi ya geçerlidir ya değildir.

#{strong[Kısa ömre izin.]} Bölüm 7.3’te gördüğümüz gibi, ömrü 24 saat ya da daha kısa olan öznitelik onaylarının iptal edilebilir olması gerekmez \[10\].

#{strong[Mimari çerçevede ikinci yol.]} AB’nin Mimari ve Başvuru Çerçevesi (ARF) \[17\], durum listesinin yanında, yalnızca iptal edilen belgelerin tanımlayıcılarını sayan bir #{strong[iptal listesi]} biçimini de tanır. Bu, Bölüm 3.1’deki CRL’in cüzdan dünyasına uyarlanmış bir akrabasıdır; özellikle mdoc biçimindeki belgeler için tanımlanmıştır.

#{strong[Cüzdanın kendisi de iptal edilir.]} İptal yalnızca kurumların verdiği belgeler için değil, cüzdanın kendisi için de gereklidir. Dizinin onuncu yazısında anlatacağımız cüzdan birimi kanıtı, bir cüzdan kurulumunun sertifikalı ve anahtarlarının güvenli donanımda olduğunu söyler. Telefon kaybolduğunda ya da cüzdan yazılımında bir güvenlik açığı bulunduğunda bu kanıtın da geri alınması gerekir. 2026\/1731 sayılı Uygulama Tüzüğü’yle değişen kurallar, cüzdan kanıtlarının durumunun da Token Status List ile tutulmasını öngörür. Ömrü 24 saati aşan bir PID’i veren sağlayıcı, PID’i verirken aldığı cüzdan kurulum kanıtının ve anahtar kanıtının durumunu en az 24 saatte bir denetler ve cüzdanın geçersiz kılındığını görürse PID’i de iptal eder \[10\]. Yani bir telefonun kaybı, zincirleme olarak o telefondaki kimlik bilgisinin geçersiz olmasına yol açar. Bu zincir de aynı ilkeyle işler: Sağlayıcı cüzdan kanıtlarının listesini toplu olarak okur, kişinin cüzdanını nerede kullandığını öğrenmez.

#{strong[Güvenen tarafların kayıt sertifikaları.]} Dizinin altıncı yazısında anlattığımız kayıt sertifikaları da iptal edilebilir. Kaydı silinen ya da kuralları çiğneyen bir güvenen tarafın kayıt sertifikası geçersiz kılındığında, cüzdanlar bunu yine bir durum listesinden öğrenir. Böylece aynı mekanizma, belgeyi verenin, belgeyi taşıyanın ve belgeyi isteyenin durumunu tek bir dille anlatır.

Bu tercihler, iptal konusunda AB’nin genel yönünü gösteriyor: çevrimiçi soru yok, herkesin aynı biçimde indirdiği imzalı listeler var, temel belgelerde sade durum kodları var ve kısa ömürlü belgeler için iptalden muafiyet var.

= Sınırlar ve Açık Sorular

Token Status List ve kısa ömürlü belgeler, iptal sorununun büyük kısmını çözüyor. Ama bazı sorular hâlâ açık.

#{strong[Doğrulayıcılar arası izlenebilirlik.]} Bölüm 5.6’da gördüğümüz gibi, aynı belge farklı doğrulayıcılara gösterildiğinde sıra numarası ve liste adresi aynı kalır. Toplu kopyalar bu sorunu çözer, ama kopya sayısı sınırlıdır ve kopyalar bittiğinde cüzdanın ya yenisini alması ya da bir kopyayı yeniden kullanması gerekir. Bir kopyanın kaç kez kullanılabileceği, gizlilik ile kullanılabilirlik arasında bir tercih olarak kalıyor. Dizinin beşinci yazısı bu konuyu ayrıntılı ele aldı.

#{strong[Liste indirmenin izi.]} Ön çekim, bireysel doğrulamaları gizler. Ama listeyi kimin indirdiği yine görünür. Bir kurumun listesini düzenli olarak indiren bir IP adresi, o kurumun belgelerini kabul eden bir işletmeye aittir. Bu bilgi tek tek kişileri ele vermez; ama kurumun belgelerinin nerelerde geçerli sayıldığını gösterir. Belirtim, listelerin üçüncü taraflarda barındırılmasını ve indirme isteklerini gizleyen ara katmanların kullanılmasını önerir \[9\]. Bunlar ek bir altyapı ve ek bir güven ilişkisi gerektirir.

#{strong[Ortak barındırmanın bedeli.]} Küçük kurumların sürüsünü büyütmek ya da işletme yükünü azaltmak için durum listelerini ortak bir işletmecide tutmak cazip görünür. Ama ortak işletmeci, binlerce kurumun bütün iptallerini görür. Bu, tek bir noktada toplanan yeni bir bilgi birikimidir. İmza anahtarının kurumda kalması, işletmecinin sahte durum yayımlamasını engeller; ama gördüğü bilgiyi gizlemez.

#{strong[Askının kötüye kullanılması.]} Askı, soruşturma gibi durumlar için yararlı bir araçtır. Ama bir kurumun bir belgeyi uzun süre askıda tutması, belgeyi iptal etmeden kullanılamaz hâle getirmesi demektir. Askının ne kadar sürebileceği, kişinin buna nasıl itiraz edeceği ve askının kişiye nasıl bildirileceği, teknik değil hukuki sorulardır. AB’nin kimlik belgeleri için askıyı hiç öngörmemesi, bu sorunun en azından en hassas belgelerde ortaya çıkmasını engelliyor.

#{strong[İptalin hukuki anı.]} Bir belge 30 Haziran öğlen iptal edildi, ama bir doğrulayıcı bunu ancak 30 Haziran akşamı öğrendi. Aradaki saatlerde belgeye dayanarak yapılan bir işlemin sorumluluğu kimdedir? Bu soru teknik olarak cevaplanamaz; ama teknik tasarım, doğrulayıcının hangi bilgiye dayanarak karar verdiğini kanıtlayabilmesini sağlamalıdır. Bunun için doğrulayıcının, kullandığı listenin sürümünü ve zamanını denetim kaydına yazması iyi bir uygulamadır.

#{strong[Sıfır bilgiyle iptal.]} Bölüm 7.5’te değindiğimiz akümülatör tabanlı yöntemler, bağlanamazlığı bozmadan iptali kanıtlamayı vaat ediyor. Bu yöntemlerin cihazlarda ne kadar hızlı çalışacağı, standartlaşıp standartlaşmayacağı ve AB’nin sertifikasyon süreçlerine nasıl gireceği henüz belirsiz.

#{strong[Taslağın sabitlenmesi.]} AB’nin belirli bir taslağı hukuken referans alması, birlikte çalışabilirliği güvenceye alır; ama RFC yayımlandığında ortaya çıkabilecek küçük farkların nasıl yönetileceği izlenmesi gereken bir konudur.

= Bu Tablonun İçinde Tamga Network

Bu yazı dizisi Tamga Network tarafından yayımlanıyor. İptal, ağın tasarımında üzerinde en çok durulan konulardan biri olduğu için bu bölümde ağın yaklaşımını, kamuya açık belgelerine dayanarak biraz daha ayrıntılı anlatıyoruz \[18, 19\].

Tamga Network’te belge veren her kurum, verdiği belgelerin durumunu IETF Token Status List biçiminde yayımlar. Ağın belgelerinde bu yayımın birkaç kuralı tanımlanmıştır:

- #{strong[İki ve bir bitlik listeler.]} Kurumların listeleri iki bitliktir. Askı değeri yalnızca belge türü buna izin veriyorsa, örneğin bir diploma için kullanılır. Ağın kimlik servisinin verdiği türlerde ise, AB’nin PID kuralına uygun olarak askı yoktur ve listeler bir bitliktir.
- #{strong[Rastgele sıra ve opak adres.]} Sıra numaraları listenin kapasitesi içinden rastgele seçilir; liste adresleri kurumu, yılı ya da grubu açığa vurmayan anlamsız dizelerdir. Listeler en az 100.000 sıralık bir kapasiteyle açılır ve yalnızca belge türüne göre ayrılır.
- #{strong[Sabit aralıkla yayın.]} Listeler, değişiklik olsun ya da olmasın, iki dakikada bir yeniden yayımlanır; böylece iptalin anı dışarı sızmaz. Her liste belirteci altı saat geçerlidir; durum sunucusu kesintiye uğrarsa doğrulayıcı son listeyle bu süre boyunca çalışmaya devam edebilir.
- #{strong[Ön çekim.]} Ağın doğrulayıcı paketi, listeleri doğrulamadan önce düzenli aralıklarla çeker; doğrulama anında kuruma ya da ağa istek gitmez.
- #{strong[Geri sarmaya karşı günlük.]} Her liste yayımının özeti, güven altyapısının herkese açık çapa günlüğüne yazılır. Doğrulayıcı, elindeki listenin gerçekten kurumdan gelen en güncel sürüm olduğunu buradan denetler; bir kurum listesini sessizce geri saramaz.
- #{strong[Ayrı anahtar.]} Durum listesi, belge imza anahtarından ayrı bir anahtarla imzalanır ve bu anahtarın parmak izi güven listesinde ayrıca yayımlanır.
- #{strong["Şu an doğrulanamadı."]} Liste bayatsa ya da alınamıyorsa sonuç "reddedildi" olmaz; "doğrulanamadı" olur ve kullanıcıya farklı gösterilir.
- #{strong[Sıfır bilgi sunumunda kısa ömür.]} Sıfır bilgi ispatıyla yapılan sunumlar listedeki sırayı açmadığı için, ağ bu sunumları yalnızca ömrü en çok 24 saat olan ve cüzdanın kendiliğinden yenilediği kopyalarla kabul eder. İptal edilen belgenin kopyası yenilenmez.

Ağın belgeleri, Bölüm 5.6’da anlattığımız sınırı da açıkça kaydeder: Aynı sıra numarasını taşıyan bir belge iki doğrulayıcıya gösterilirse, bu iki doğrulayıcı iş birliği yaparak gösterimleri eşleştirebilir. Bunun çözümü olarak her gösterim için farklı sıra taşıyan toplu kopyalar öngörülür. Ağın kendisi bir cüzdan işletmez ve bugün güvenin kaynağı imzalı listelerdir; bir blokzincir yoktur.

= Sonuç

Bu yazıya mezun olan bir öğrencinin telefonundaki kartla başladık. Kart artık doğru bir şey söylemiyordu, ama imzası hâlâ geçerliydi. Üniversitenin onu geri alabilmesi gerekiyordu; müzenin, sinemanın, kitapçının da bunu öğrenebilmesi. Bunu yaparken üniversitenin, öğrencisinin hafta sonlarını nerede geçirdiğini öğrenmemesi gerekiyordu.

Web’in otuz yılı aşkın deneyimi bize iki ucu gösterdi. Kara listeler gizliydi ama hantaldı. Çevrimiçi sorgular çevikti ama her soruda birinin nereye gittiğini başkasına söylüyordu ve tam ihtiyaç duyulduğu anda çalışmayabiliyordu. Web bugün çevrimiçi sorgudan uzaklaşıp akıllıca sıkıştırılmış listelere ve kısa ömürlü sertifikalara dönüyor. Kimlik cüzdanları için seçilen yöntem de bu dersin üzerine kurulu. Token Status List, herkesin durumunu tek bir sıkıştırılmış bit dizisinde topluyor; doğrulayıcı listeyi önceden indirip kendi kopyasına bakıyor ve kurum kimin hangi satıra baktığını hiç öğrenmiyor.

Ama bu yazının belki en önemli dersi, gizliliğin bitlerin içinde değil, ayrıntılarda saklı olmasıdır. Sıra numarası sayaçla dağıtılırsa, mezuniyet tarihi sızar. Liste adresi anlamlı bir ad taşırsa, fakülte sızar. Liste yalnızca iptal olduğunda yayımlanırsa, iptalin anı sızar. Doğrulayıcı listeyi belge geldiği anda indirirse, ziyaretin anı sızar. Aynı belge iki yere gösterilirse, iki ziyaret birbirine bağlanır. İyi bir iptal sistemi, bu sızıntıların her birini ayrı ayrı kapatır.

Dizinin bir sonraki yazısında, belgelerin cüzdana nasıl verildiğini ve doğrulayıcıya nasıl gösterildiğini, yani OpenID4VCI ve OpenID4VP protokollerini, akış çizimleriyle anlatacağız.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Myers, M., Ankney, R., Malpani, A., Galperin, S. ve Adams, C. (1999). #{emph[X.509 Internet Public Key Infrastructure Online Certificate Status Protocol – OCSP.]} IETF RFC 2560, Haziran 1999.]

#kaynak("2")[Santesson, S., Myers, M., Ankney, R., Malpani, A., Galperin, S. ve Adams, C. (2013). #{emph[X.509 Internet Public Key Infrastructure Online Certificate Status Protocol – OCSP.]} IETF RFC 6960, Haziran 2013.]

#kaynak("3")[Langley, A. (2012). "Revocation checking and Chrome’s CRL." #{emph[ImperialViolet]}, 5 Şubat 2012.]

#kaynak("4")[Liu, Y., Tome, W., Zhang, L., Choffnes, D., Levin, D., Maggs, B., Mislove, A., Schulman, A. ve Wilson, C. (2015). "An End-to-End Measurement of Certificate Revocation in the Web’s PKI." #{emph[Proceedings of the 2015 ACM Internet Measurement Conference (IMC)]}, 183–196.]

#kaynak("5")[Larisch, J., Choffnes, D., Levin, D., Maggs, B. M., Mislove, A. ve Wilson, C. (2017). "CRLite: A Scalable System for Pushing All TLS Revocations to All Browsers." #{emph[2017 IEEE Symposium on Security and Privacy]}, 539–556.]

#kaynak("6")[CA\/Browser Forum (2023). #{emph[Ballot SC-063v4: Make OCSP Optional, Require CRLs, and Incentivize Automation.]} Temmuz 2023.]

#kaynak("7")[Let’s Encrypt (2024). "Ending OCSP Support in 2025." letsencrypt.org, 5 Aralık 2024.]

#kaynak("8")[Mozilla (2025). "CRLite: Fast, private, and comprehensive certificate revocation checking in Firefox." #{emph[Mozilla Hacks]}, 19 Ağustos 2025.]

#kaynak("9")[Looker, T., Bastian, P. ve Bormann, C. #{emph[Token Status List (TSL).]} IETF OAuth Çalışma Grubu, draft-ietf-oauth-status-list-21, 21 Haziran 2026 (RFC Editörü kuyruğunda).]

#kaynak("10")[Avrupa Komisyonu (2026). #{emph[2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982 sayılı Uygulama Tüzüklerini değiştiren 2026\/1731 sayılı Uygulama Tüzüğü (AB) (uygulanacak standartlar ve teknik belirtimler bakımından).]} 15 Temmuz 2026; Avrupa Birliği Resmî Gazetesi, 22 Temmuz 2026.]

#kaynak("11")[W3C (2025). #{emph[Bitstring Status List v1.0.]} W3C Recommendation, 15 Mayıs 2025.]

#kaynak("12")[Rivest, R. L. (1998). "Can We Eliminate Certificate Revocation Lists?" #{emph[Financial Cryptography ’98]}, Lecture Notes in Computer Science 1465, Springer, 178–183.]

#kaynak("13")[CA\/Browser Forum (2025). #{emph[Ballot SC-081v3: Introduce Schedule of Reducing Validity and Data Reuse Periods.]} Nisan 2025.]

#kaynak("14")[Camenisch, J. ve Lysyanskaya, A. (2002). "Dynamic Accumulators and Application to Efficient Revocation of Anonymous Credentials." #{emph[Advances in Cryptology – CRYPTO 2002]}, Lecture Notes in Computer Science 2442, Springer, 61–76.]

#kaynak("15")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024.]

#kaynak("16")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanları ile verilen kişi kimlik verisi ve elektronik öznitelik onaylarına ilişkin kuralları belirleyen 2024\/2977 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024; Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("17")[Avrupa Komisyonu ve eIDAS Uzman Grubu. #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF).]} github.com\/eu-digital-identity-wallet (yaşayan belge; okunan sürüm yazının yayın tarihindeki son sürümdür).]

#kaynak("18")[Tamga Network. #{emph[İptal ve tazelik]} (kavram belgesi). docs.tamga.network\/concepts\/revocation (erişim Kasım 2026).]

#kaynak("19")[Tamga Network. #{emph[İptal ve durum listesi]} (belirtim). docs.tamga.network\/specifications\/status-list (erişim Kasım 2026).]

#kaynak("20")[Cooper, D., Santesson, S., Farrell, S., Boeyen, S., Housley, R. ve Polk, W. (2008). #{emph[Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.]} IETF RFC 5280, Mayıs 2008.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[IETF, #{emph[Token Status List]} taslağının giriş ve gizlilik bölümleri.]} Belirtimin ilk bölümleri yöntemi sade örneklerle anlatıyor; gizlilik bölümü ise bu yazıdaki sürü gizliliği ve izlenebilirlik tartışmalarının kaynağı.
+ #{strong[Let’s Encrypt, "Ending OCSP Support in 2025" (2024).]} Dünyanın en büyük sertifika otoritelerinden birinin OCSP’yi neden bıraktığını kısa ve açık bir dille anlatıyor.
+ #{strong[Mozilla Hacks, CRLite yazısı (2025).]} Bütün web iptallerini her tarayıcıya dağıtmanın nasıl mümkün olduğunu teknik ama okunabilir biçimde açıklıyor.
+ #{strong[Ronald Rivest, "Can We Eliminate Certificate Revocation Lists?" (1998).]} Birkaç sayfalık bu makale, kısa ömürlü belgeler fikrinin çıkış noktalarından biri.
+ #{strong[W3C, #{emph[Bitstring Status List v1.0]}.]} Aynı fikrin W3C dünyasındaki biçimi; özellikle gizlilik bölümü, asgari liste boyunun gerekçesini anlatıyor.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. Teknik terimlerin İngilizce karşılıkları, başka kaynaklarda aranabilmeleri için parantez içinde verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (13fr, 15fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Akümülatör], [accumulator], [Bir değerin bir kümeye ait olduğunu, değeri açmadan kanıtlamayı sağlayan kriptografik yapı],),
  ([Askıya alma], [suspension], [Belgenin geçici olarak geçersiz sayılması; kaldırılınca belge yeniden geçerli olur],),
  ([Bit dizisi], [bitstring], [Her belgenin durumunun bir ya da birkaç bitle tutulduğu uzun ikili dizi],),
  ([Çevrimiçi sertifika durum protokolü], [online certificate status protocol (OCSP)], [Doğrulayıcının tek bir sertifikanın durumunu sunucuya sorduğu protokol],),
  ([Durum listesi], [status list], [Bir kurumun verdiği belgelerin durumlarını toplu olarak taşıyan imzalı liste],),
  ([Durum listesi belirteci], [status list token], [Sıkıştırılmış bit dizisini taşıyan imzalı JWT ya da CWT],),
  ([İptal], [revocation], [Belgeyi verenin, süresi dolmadan önce belgenin kalıcı olarak geçersiz olduğunu ilan etmesi],),
  ([Kısa ömürlü belge], [short-lived credential], [Ömrü birkaç saat ya da birkaç gün olan, iptal yerine yenilenmeyerek geçersiz kılınan belge],),
  ([OCSP zımbalama], [OCSP stapling], [Durum cevabını doğrulayıcının değil, sertifika sahibinin alıp sunması],),
  ([Ön çekim], [prefetch], [Doğrulayıcının durum listelerini belge gelmeden önce, düzenli aralıklarla indirmesi],),
  ([Opak adres], [opaque identifier], [Hiçbir anlam taşımayan, rastgele üretilmiş liste adresi],),
  ([Sertifika iptal listesi], [certificate revocation list (CRL)], [İptal edilen sertifikaların seri numaralarını taşıyan imzalı kara liste],),
  ([Sessizce geç], [soft-fail], [Durum bilgisi alınamadığında sertifikayı geçerli sayma kuralı],),
  ([Sıra numarası], [index (idx)], [Bir belgenin durum listesindeki yeri],),
  ([Süre dolması], [expiry], [Belgenin içine yazılmış son geçerlilik tarihinin geçmesi],),
  ([Sürü gizliliği], [herd privacy], [Kişinin, kalabalık bir listenin içinde ayırt edilemez kalmasından gelen gizlilik],),
  ([Tazelik], [freshness], [Doğrulayıcının elindeki durum bilgisinin ne kadar yeni olduğu],),
  ([Toplu kopya], [batch issuance], [Aynı belgenin her gösterimde farklı kullanılmak üzere birden çok kopyasının verilmesi],),
  ([Yenileme ipucu], [time to live (ttl)], [Doğrulayıcının durum listesini yenisini çekmeden en çok ne kadar kullanabileceği],),
))

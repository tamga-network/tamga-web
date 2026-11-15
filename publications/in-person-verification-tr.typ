// A9 — Yüz Yüze Doğrulama. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Yüz Yüze Doğrulama",
  altbaslik: "NFC, Bluetooth ve Mobil Ehliyet",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Aralık 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("ISO/IEC 18013-5", "mobil ehliyet", "mdoc", "yakın alan doğrulama", "NFC", "Bluetooth Low Energy", "okuyucu kimlik doğrulaması", "cüzdandan cüzdana", "çevrimdışı doğrulama",),
  atif: "Karataş, B. (2026). Yüz Yüze Doğrulama: NFC, Bluetooth ve Mobil Ehliyet. Tamga Network Akademik Çalışmalar, A9. https://tamga.network/files/publications/in-person-verification-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Belge göstermenin en eski ve en yaygın biçimi yüz yüzedir: kapıda, kasada, yol kenarında, bir görevlinin önünde. Dijital kimlik cüzdanları bu anlara da girmek zorundadır; ama bu anların çoğunda internet yoktur, zaman birkaç saniyedir ve karşıdaki kişi çoğu zaman elinde bir okuyucu tutan bir insandır. Bu ihtiyaç için geliştirilen en olgun standart, mobil ehliyet için yazılmış ISO\/IEC 18013-5’tir. Standart; telefonun ve okuyucunun bir QR kod ya da NFC dokunuşuyla tanışmasını, aralarında şifreli bir oturum kurulmasını, verinin Bluetooth ya da NFC üzerinden taşınmasını ve verinin hem veren kurum hem de telefon tarafından imzalanmasını tanımlar. Avrupa Birliği’nin kimlik cüzdanı da yüz yüze gösterimde bu standardı esas alır.

Bu yazı, hiçbir ön bilgi varsaymadan bu standardın nasıl çalıştığını anlatıyor. Bir araç kiralama tezgâhından, sinyalin çekmediği bir yol kenarına ve bir konser kapısına uzanan bir gün boyunca, telefon ile okuyucu arasında gidip gelen mesajları sıra diyagramlarıyla ve örnek veri yapılarıyla izliyoruz. QR, NFC ve Bluetooth’un hangi durumda neden seçildiğini, okuyucunun kendini cüzdana nasıl tanıttığını ve iki sıradan insanın telefonlarını birbirine doğrulatmasının, yani cüzdandan cüzdana gösterimin, getirdiği yeni kötüye kullanım risklerini tartışıyoruz.
  ],
)

= Giriş: Sinyalin Çekmediği Bir Yol Kenarı

Temmuz ayı. Aynur, yüksek lisansının ilk yılını bitirmiş, birkaç günlüğüne Antalya’ya gelmiştir. Havalimanındaki araç kiralama tezgâhında görevli ehliyetini ister. Aynur cüzdanından kartı çıkarmak yerine telefonunu açar; ekranda bir QR kod belirir. Görevli elindeki okuyucuyla kodu okutur, Aynur’un telefonu titrer: "Araç kiralama şirketi ehliyetinizden şu bilgileri istiyor: ad, soyad, fotoğraf, ehliyet sınıfları, ehliyet numarası. Ehliyet numaranızı saklayacağını bildiriyor." Aynur parmak iziyle onaylar. Görevlinin ekranında Aynur’un fotoğrafı ve ehliyet bilgileri belirir; görevli fotoğrafa ve Aynur’un yüzüne bakar, anahtarı uzatır.

Ertesi gün Aynur dağ köylerine doğru yola çıkar. Telefonunda sinyal yoktur. Bir vadide jandarma bir kontrol noktası kurmuştur. Görevli ehliyet ister. Aynur telefonunu görevlinin cihazına yaklaştırır; iki cihaz bir an "tanışır", sonra bilgi aktarılır. Ortamda ne internet vardır, ne de ehliyeti veren kurumun sunucusuna ulaşmanın bir yolu. Yine de görevlinin cihazı birkaç saniye içinde ehliyetin gerçek olduğunu, değiştirilmediğini ve Aynur’un telefonundan geldiğini söyler.

Akşam Aynur bir açık hava konserine gider. Kapıdaki görevli 18 yaşından büyük olduğunu doğrulamak ister. Aynur yine telefonunu uzatır. Bu kez ekranda tek bir satır vardır: "18 yaşından büyük müsünüz?" Aynur onaylar ve görevlinin cihazı yalnızca "evet" görür; Aynur’un doğum tarihi, adı ya da adresi görevliye gitmez.

Bu üç sahne bugün çoğu ülkede henüz bir düşünce deneyidir. Ama her birinin arkasındaki teknik altyapı tanımlanmış, birçok yerde sahada kullanılır durumdadır. Bu yazının sorusu şu: #{strong[İnternet olmadan, birkaç saniyede ve birbirini hiç tanımayan iki cihaz arasında bir belge nasıl güvenle gösterilir?]} Dizinin sekizinci yazısında internet üzerinden belge vermeyi ve göstermeyi anlatan OpenID4VCI ve OpenID4VP protokollerini incelemiştik. O yazının son cümlesi bu yazıya işaret ediyordu: Kapıda, kasada ya da yol kenarında başka bir standart devreye girer.

Yazının planı şöyle. Bölüm 2 yüz yüze doğrulamanın internet üzerinden doğrulamadan neden farklı olduğunu senaryolar üzerinden tartışıyor. Bölüm 3 mobil ehliyetin ve ISO\/IEC 18013 ailesinin kısa tarihini veriyor. Bölüm 4 bir mdoc belgesinin içine bakıyor. Bölüm 5 bir yüz yüze işlemin üç evresini (tanışma, oturum kurma ve veri alma) adım adım anlatıyor. Bölüm 6 QR, NFC ve Bluetooth’un hangi durumda seçildiğini, Bölüm 7 okuyucunun kendini nasıl tanıttığını ele alıyor. Bölüm 8 aynı belgenin internet üzerinden nasıl gösterildiğine kısaca değiniyor. Bölüm 9 cüzdandan cüzdana gösterimi ve onun kötüye kullanım risklerini tartışıyor. Bölüm 10 karşılaştırmayı, Bölüm 11 açık soruları, Bölüm 12 Tamga Network’ün bu konudaki yerini veriyor.

Gri zeminli "Teknik ayrıntı" kutuları veri yapılarının içine bakmak isteyenler içindir; atlanırsa yazının akışı bozulmaz. Kutulardaki bütün değerler örnektir.

= Çevrimdışı Senaryolar: Polis, Kapı, Kasa, Etkinlik

== Yüz yüze doğrulamayı farklı kılan nedir?

Dizinin önceki yazısında anlattığımız internet üzerinden gösterimde doğrulayan bir web sitesidir. Sitenin bir alan adı, bir TLS sertifikası, bir sunucusu vardır; cüzdan ile site arasındaki her mesaj internetten geçer. Yüz yüze doğrulamada ise bu varsayımların çoğu ortadan kalkar.

Birincisi, #{strong[bağlantı yoktur ya da güvenilmezdir.]} Bir yol kenarında, bir metro istasyonunun altında ya da kalabalık bir stadyumun önünde mobil veri ya çekmez ya da yavaştır. Doğrulamanın internete hiç ihtiyaç duymadan yapılabilmesi gerekir. Bu, cüzdanla birlikte okuyucunun da çevrimdışı çalışabilmesi demektir: veren kurumun açık anahtarı, güven listesi ve mümkünse iptal bilgisi önceden okuyucuya yüklenmiş olmalıdır.

İkincisi, #{strong[zaman çok kısadır.]} Bir kapıda yüzlerce kişi sırada beklerken her doğrulamanın birkaç saniyede bitmesi gerekir. Bu süreye iki cihazın birbirini bulması, şifreli bir bağlantı kurması, verinin aktarılması ve imzaların kontrol edilmesi sığmak zorundadır.

Üçüncüsü, #{strong[karşıda bir insan vardır.]} Bu, doğrulamaya güç katar. Görevli, ekranda beliren fotoğrafa ve karşısındaki yüze bakabilir. Dizinin ikinci yazısında anlattığımız sahip bağlama (#{emph[holder binding]}), internet üzerinde tamamen kriptografiye dayanır; yüz yüze ortamda ise buna bir de insan gözü eklenir. Mobil ehliyetin portre fotoğrafı bu yüzden standardın merkezindedir.

Dördüncüsü, #{strong[iki cihaz birbirini önceden tanımaz ve tanışma anı saldırıya açıktır.]} Kapıdaki okuyucu ile Aynur’un telefonu arasındaki ilk temas bir QR kodla ya da bir NFC dokunuşuyla kurulur. Bu ilk temasın, yakındaki başka bir cihaz tarafından dinlenememesi ya da araya girilememesi gerekir.

== Senaryolar ve ihtiyaçları

Bütün yüz yüze doğrulamalar aynı değildir. Bir trafik kontrolü ile bir konser kapısı, hem ne istendiği hem de ne kadar güvence gerektiği açısından birbirinden ayrılır.

#tablo([#{strong[Tablo 1.]} Yüz yüze doğrulama senaryoları ve ihtiyaçları.], (18fr, 17fr, 27fr, 13fr, 32fr), ([Senaryo], [Kim doğruluyor?], [Ne isteniyor?], [Bağlantı], [Öne çıkan ihtiyaç],), (
  ([Trafik kontrolü], [kolluk görevlisi], [ehliyet, sınıflar, kısıtlamalar, portre], [çoğu zaman yok], [yüksek güvence, iptal bilgisi, kolluğun kendini tanıtması],),
  ([Araç kiralama], [şirket görevlisi], [ehliyet, portre, ehliyet numarası (saklanacak)], [genellikle var], [saklama niyetinin açıkça söylenmesi],),
  ([Konser, gece kulübü, tekel satışı], [kapı ya da kasa görevlisi], [yalnızca "18 yaşından büyük"], [değişken], [hız, veri en azaltma],),
  ([Havalimanı güvenliği], [kamu görevlisi], [kimlik, portre], [var ama kapalı ağda], [yüksek güvence, yüksek hacim],),
  ([Otel, kiralık konut], [işletme ya da kişi], [ad, soyad, belge numarası], [değişken], [kimin istediğinin bilinmesi],),
  ([İki kişi arasında], [sıradan bir kişi], [ad, portre, belki adres], [değişken], [kötüye kullanımın önlenmesi (Bölüm 9)],),
))

Tablonun gösterdiği ilk şey, yüz yüze doğrulamanın tek bir senaryo olmadığıdır. Konser kapısındaki görevlinin Aynur’un adını bilmesine gerek yoktur; trafik kontrolündeki görevlinin ise ehliyet sınıflarını ve kısıtlamaları görmesi gerekir. İyi bir standardın her iki uca da cevap verebilmesi, yani doğrulayanın #{strong[yalnızca ihtiyaç duyduğunu]} isteyebilmesi gerekir.

İkinci gözlem, okuyucuyu tutan kişinin rolüyle ilgilidir. Kolluk görevlisinin bir ehliyeti görmeye hakkı vardır; bir gece kulübü görevlisinin ise yalnızca yaşı görmeye hakkı olmalıdır. Cüzdanın, karşısındaki okuyucunun kime ait olduğunu bilmesi bu yüzden önemlidir. Bu konuya Bölüm 7’de döneceğiz.

== Bugün nasıl yapılıyor?

Bu sahnelerin bugünkü karşılığını hepimiz biliyoruz. Görevli plastik kartı elinize alır, fotoğrafa ve yüzünüze bakar, kartın hologramına göz atar, bazen kartın bir fotokopisini çeker ya da telefonuyla fotoğrafını alır. Bu yöntemin üç zayıflığı vardır.

Birincisi, #{strong[kontrol tamamen görseldir.]} Görevlinin bir sahte kartı fark etmesi, kartın ne kadar iyi taklit edildiğine ve görevlinin ne kadar deneyimli olduğuna bağlıdır. Dizinin ilk yazısında fiziksel belgelerin güvenini "taklit zorluğu"na dayandırdığını söylemiştik; bu zorluk, iyi donanımlı bir sahtekâr karşısında sanıldığı kadar büyük değildir. Kartın içinde çip olsa bile, çoğu kapıda o çipi okuyacak bir cihaz bulunmaz.

İkincisi, #{strong[kart her şeyi gösterir.]} Yaşınızı kontrol eden barmen adınızı, kimlik numaranızı ve adresinizi de görür. Kartın üzerinde ne yazıyorsa, sorulan soru ne olursa olsun, hepsi karşı tarafa açılır.

Üçüncüsü, #{strong[kopyalar kalır.]} Bir otelde, bir araç kiralama şirketinde ya da bir kiralık evde kimliğinizin fotokopisi ya da fotoğrafı bir klasörde ya da bir telefonun galerisinde kalır. O kopyanın ne zaman silineceğini, kimlerin erişebileceğini bilmezsiniz. Bir sızıntıda bu kopyalar, kimlik hırsızlığının hammaddesine dönüşür.

Mobil belgelerin vaadi, bu üç zayıflığın her birine bir cevap vermektir: görsel kontrolün yanına kriptografik bir kontrol, her şeyin yerine yalnızca istenen bilgi ve kalıcı kopyanın yerine açıkça bildirilmiş bir saklama niyeti. Bu yazının geri kalanı bu cevapların nasıl kurulduğunu anlatıyor.

= Mobil Ehliyet ve ISO\/IEC 18013 Ailesi

== Plastik karttan telefona

Ehliyet, dünyanın birçok yerinde fiilen en yaygın kimlik belgesidir. Pasaportu olmayan pek çok kişinin ehliyeti vardır ve ehliyet araç kullanma hakkının yanında gündelik hayatta kimliği ve yaşı kanıtlamak için de kullanılır. Ehliyetin dijitalleşmesinin kimlik dünyasında öncü bir rol oynaması bu yüzden şaşırtıcı değildir.

#kutu("tarihce", [ISO\/IEC 18013 ailesi])[
#{strong[ISO\/IEC 18013]} standart ailesi, ISO ve IEC’nin ortak teknik komitesinin kimlik kartlarıyla ilgilenen alt komitesi (JTC 1\/SC 17) tarafından geliştirilir. Ailenin ilk bölümleri, plastik ehliyet kartının fiziksel özelliklerini, makinece okunabilir alanlarını ve kartın üzerindeki verinin nasıl korunacağını tanımlar. Amaç, bir ülkede verilen ehliyetin başka bir ülkede de okunabilmesidir.

#{strong[ISO\/IEC 18013-5:2021]} ailenin beşinci bölümüdür ve Eylül 2021’de yayımlanmıştır \[1\]. Başlığı "Mobil ehliyet (mDL) uygulaması"dır; ehliyetin bir mobil cihazda nasıl taşınacağını, cihaz ile okuyucu arasındaki arayüzü ve okuyucu ile veren kurumun altyapısı arasındaki arayüzü tanımlar.

#{strong[ISO\/IEC TS 18013-7]} bu yapının internet üzerinden gösterimini tanımlayan "ek işlevler" spesifikasyonudur; ikinci baskısı Mayıs 2025’te yayımlanmıştır \[2\].

#{strong[ISO\/IEC 18013-5’in ikinci baskısı]} hazırlanmaktadır; taslak uluslararası standart (DIS) oylaması Mart 2026’da kapanmıştır \[3\]. Bu yazıda anlattığımız temel yapılar 2021 baskısına dayanır.
]

Standardın tasarımında önemli bir tercih vardır. Belge biçimi ve protokol, ehliyete özgü değil, #{strong[genel]} olarak tanımlanmıştır. Standart, belgeye #{strong[mdoc]} (#{emph[mobile document]}, mobil belge) adını verir ve "ehliyet" yalnızca bu genel yapının bir türüdür: belge türü (#{raw("docType")}) #{raw("org.iso.18013.5.1.mDL")}, veri öğelerinin ad alanı #{raw("org.iso.18013.5.1")} olan mdoc. Aynı yapı başka belge türleri için de kullanılabilir. Avrupa Birliği’nin kişi kimlik verisi (PID) de mdoc biçiminde, #{raw("eu.europa.ec.eudi.pid.1")} belge türüyle verilebilir. ISO’nun mobil kimlik için genel yapı taşlarını tanımlayan 23220 serisi de aynı düşünceyi daha geniş bir çerçeveye taşır.

== Sahadaki yeri

Mobil ehliyet standardı bugün birçok ülkede kullanılıyor. Amerika Birleşik Devletleri’nde birçok eyalet, bu standarda dayanan mobil ehliyetler veriyor. Ülkenin havalimanı güvenliğinden sorumlu kurumu TSA, Ekim 2024’te yayımladığı bir kuralla eyaletlerin mobil ehliyetlerinin güvenlik noktalarında geçici bir muafiyet düzeniyle kabul edilmeye devam etmesinin yolunu açtı ve kalıcı teknik gereklilikleri ileride belirleyeceğini duyurdu \[4\]. Aynı ülkede, eyaletlerin motorlu taşıt idarelerini bir araya getiren AAMVA, Nisan 2024’te veren kurumların kök sertifikalarını tek bir yerden dağıtan bir güven hizmetini (#{emph[Digital Trust Service]}) kullanıma açtı \[5\]. Bu hizmeti Bölüm 7’de, okuyucunun veren kurumun anahtarına nereden ulaştığını anlatırken yeniden anacağız.

Avrupa Birliği’nde ise ISO\/IEC 18013-5, cüzdanın yüz yüze gösterimde kullanacağı standart olarak seçildi. Dizinin sekizinci yazısında AB’nin gösterme protokollerini ETSI TS 119 472-2 \[17\] üzerinden tanımladığını ve bu profilin internet üzerinden gösterim için OpenID4VP’nin yanına bir de ISO mdoc yolunu koyduğunu görmüştük. Yüz yüze gösterimde ise AB’nin tercihi doğrudan bu standarttır.

= Bir mdoc’un İçi

== Veri öğeleri ve ad alanları

Bir mdoc, #{strong[veri öğelerinden]} (#{emph[data elements]}) oluşur. Her öğenin bir adı (ör. #{raw("family_name")}, #{raw("birth_date")}, #{raw("portrait")}, #{raw("driving_privileges")}) ve bir değeri vardır. Öğeler #{strong[ad alanlarına]} (#{emph[namespace]}) göre gruplanır. Ehliyetin standart öğeleri #{raw("org.iso.18013.5.1")} ad alanındadır; bir ülke kendine özgü ek öğeleri kendi ad alanında tanımlayabilir.

Veriler JSON yerine #{strong[CBOR]} (#{emph[Concise Binary Object Representation]}) adlı ikili bir biçimde kodlanır \[9\]. Dizinin ikinci yazısında bu tercihin gerekçesine değinmiştik: CBOR, aynı veriyi JSON’dan çok daha az baytla taşır. Bluetooth ya da NFC gibi dar kanallarda her bayt önemlidir; bir portre fotoğrafı tek başına birkaç kilobayt tutabilir.

== Yaş öğeleri: "18’den büyük müsün?" sorusunun cevabı

Konser kapısındaki sahne, mdoc’un ilginç bir özelliğine dayanır: #{strong[yaş onayı öğeleri]}. Standart, #{raw("age_over_NN")} biçiminde öğeler tanımlar; burada NN 00 ile 99 arasında bir sayıdır ve öğenin değeri doğru ya da yanlıştır. Veren kurum, belgeyi verirken örneğin #{raw("age_over_18: true")}, #{raw("age_over_21: true")}, #{raw("age_over_65: false")} gibi birkaç öğeyi belgeye koyar. Kapıdaki okuyucu #{raw("age_over_18")} istediğinde cüzdan yalnızca bu öğeyi gönderir; doğum tarihi hiç paylaşılmaz.

Standart burada mahremiyeti gözeten ince bir kural koyar. Okuyucu #{raw("age_over_18")} istediğinde ama cüzdanda yalnızca #{raw("age_over_21: true")} varsa, cüzdan istenen yaşa #{strong[en yakın]} doğru onayı döner; "21’den büyük" cevabı "18’den büyük" sorusunu da cevaplar. Okuyucunun bir işlemde ikiden fazla #{raw("age_over_NN")} istemesi yasaktır; böylece bir okuyucu art arda sorular sorarak kişinin yaşını daraltamaz. Standardın notlarında bu dengenin iki yüzü de tartışılır: Belgede daha çok yaş öğesi bulunması, cevabın soruya daha yakın olmasını sağlar; ama tekrarlanan isteklerle kişinin yaşının daha iyi tahmin edilmesine de yol açabilir \[1\].

== Veren kurumun imzası: mobil güvenlik nesnesi

Dizinin üçüncü yazısında seçici açıklamanın iki yaygın yolunu anlatmıştık. SD-JWT’de her alan için bir "açıklama" ve onun özeti vardır. mdoc’ta da fikir aynıdır, yalnızca kodlama farklıdır.

Veren kurum belgeyi oluştururken her veri öğesini bir #{strong[rastgele değer]} (#{emph[random]}) ve bir #{strong[özet kimliği]} (#{emph[digestID]}) ile birlikte paketler. Bu pakete #{strong[veren imzalı öğe]} (#{emph[IssuerSignedItem]}) denir. Her paketin SHA-256 özeti hesaplanır ve bütün özetler #{strong[mobil güvenlik nesnesi]} (#{emph[Mobile Security Object]}, MSO) adı verilen tek bir yapıda toplanır. MSO ayrıca belgenin türünü, geçerlilik tarihlerini ve en önemlisi #{strong[telefonun açık anahtarını]} (#{raw("deviceKey")}) içerir. Veren kurum yalnızca MSO’yu imzalar (Şekil 1). Sadeleştirilmiş hâliyle $i$ numaralı öğenin MSO’ya yazılan özeti şöyle hesaplanır:

#formul[$ "özet"_i = "SHA-256"("CBOR"("digestID"_i, "random"_i, "elementIdentifier"_i, "elementValue"_i)) $]

Bu yapının sonucu şudur: Cüzdan, kapıdaki okuyucuya yalnızca istenen öğelerin paketlerini ve imzalı MSO’yu gönderir. Okuyucu gelen her paketin özetini hesaplar ve MSO’daki özetle karşılaştırır. Gönderilmeyen öğelerin yalnızca özetleri MSO’da durur ve rastgele değerler sayesinde bu özetlerden asıl değer tahmin edilemez. "Aynur" adı ya da "1999-04-12" gibi bir doğum tarihi tahmin edilebilir değerlerdir; rastgele değer olmasa, okuyucu olası her değeri özetleyip MSO’daki özetle karşılaştırarak gizli öğeyi bulabilirdi.

#sekil(1, [Bir mdoc’un yapısı: veri öğeleri, özetler ve imzalar], "figures/a9/sekil-1.svg", yarim: false)

#kutu("teknik", [Bir MSO’nun içi])[
MSO’nun yapısı CBOR ile tanımlanır. Okunabilir olsun diye CBOR’un metin gösterimiyle (#{emph[diagnostic notation]}) yazılmış bir örnek (değerler örnektir, özetler kısaltılmıştır):

#kod("text", "{
  \"version\": \"1.0\",
  \"digestAlgorithm\": \"SHA-256\",
  \"valueDigests\": {
    \"org.iso.18013.5.1\": {
      0: h'75A1…', 1: h'9F02…', 3: h'C92E…', 7: h'0B4F…', 12: h'3D8A…'
    }
  },
  \"deviceKeyInfo\": {
    \"deviceKey\": { 1: 2, -1: 1, -2: h'96313D6C…', -3: h'1FA8C83E…' }
  },
  \"docType\": \"org.iso.18013.5.1.mDL\",
  \"validityInfo\": {
    \"signed\":     0(\"2026-06-01T09:00:00Z\"),
    \"validFrom\":  0(\"2026-06-01T09:00:00Z\"),
    \"validUntil\": 0(\"2026-09-01T09:00:00Z\")
  }
}", baslik: "Örnek: bir MSO'nun CBOR metin gösterimi")

#{raw("deviceKey")}, COSE biçiminde bir açık anahtardır: #{raw("1: 2")} anahtar türünün eliptik eğri (EC2), #{raw("-1: 1")} eğrinin P-256 olduğunu, #{raw("-2")} ve #{raw("-3")} noktanın koordinatlarını söyler. Veren kurum bu yapıyı CBOR olarak kodlar ve bir #{strong[COSE\_Sign1]} zarfıyla imzalar \[10\]. İmzayı atan anahtarın sertifikası (belge imzalayıcı sertifikası) zarfın başlığında taşınır. #{raw("validUntil")} değerinin yalnızca üç ay sonrası olmasına dikkat edin ($30 + 31 + 31 = 92$ gün): Standart iptal mekanizmasını kapsamı dışında bırakır ve veren kurumlara, tazelik ile çevrimdışı kullanım arasında dengeli #{strong[kısa geçerlilik süreleri]} belirlemelerini söyler \[1\]. Bu konuya Bölüm 11’de döneceğiz.
]

== Telefonun imzası: kopyalamaya karşı

MSO’daki #{raw("deviceKey")}, belgeyi telefona bağlayan anahtardır. Bu anahtarın gizli eşi telefonun güvenli donanımında üretilir ve oradan çıkmaz. Belge gösterilirken telefon, o işleme özgü bir veri üzerine bu anahtarla bir imza (ya da bir MAC) üretir; okuyucu bunu MSO’daki açık anahtarla doğrular. Böylece belgenin bir kopyası başka bir cihaza aktarılsa bile, gizli anahtar olmadan gösterilemez. Standart bu mekanizmaya #{strong[mdoc kimlik doğrulaması]} der ve amacını açıkça "kopyalamaya karşı koruma" olarak tanımlar \[1\]. Hangi veri üzerine imza atıldığını Bölüm 5.4’te göreceğiz.

== Yüz yüzede neden mdoc?

Dizinin önceki yazılarında belge biçimi olarak çoğu zaman SD-JWT VC’yi örnek aldık. Yüz yüze gösterimde ise mdoc öne çıkar. Bunun birkaç nedeni vardır.

Birincisi #{strong[boyuttur.]} CBOR ikili bir kodlamadır ve aynı bilgiyi JSON’dan ve onun base64 ile metne çevrilmiş hâlinden çok daha az baytla taşır. İnternette birkaç kilobaytlık fark hissedilmez; NFC ile tek bir dokunuşta ya da kalabalık bir ortamda Bluetooth ile aktarılan bir cevapta ise hissedilir.

İkincisi, #{strong[yüz yüze akış standardın kendisinin içindedir.]} ISO\/IEC 18013-5 belge biçimini, tanışmayı, oturum şifrelemesini ve telefonun kanıtının neye bağlanacağını tek bir metinde, birbirine uyumlu olarak tanımlar. SD-JWT VC ise bir belge biçimidir; onu yüz yüze taşıyacak, aynı olgunlukta yaygın bir protokol bugün yoktur.

Üçüncüsü #{strong[MAC seçeneğidir.]} Bölüm 5.4’te göreceğimiz gibi mdoc, telefonun kanıtını inkâr edilebilir bir MAC olarak üretmeye izin verir. Yüz yüze gösterimin, sonradan "bu kişi şu saatte buradaydı" diye kullanılabilecek bir iz bırakmaması mahremiyet açısından değerlidir.

Dördüncüsü #{strong[sahadaki yaygınlıktır.]} Mobil ehliyetler için kurulan okuyucular bu standardı esas alır. Yeni bir belge türünün aynı okuyucularla okunabilmesi, yatırımın tekrar edilmemesi demektir.

Avrupa Birliği’nin cüzdandan cüzdana gösterim spesifikasyonu da (Bölüm 9) yalnızca mdoc’u kullanır \[12\]. Bu durum, aynı kişi bilgisinin hem internet üzerinden gösterime uygun SD-JWT VC biçiminde hem de yüz yüze gösterime uygun mdoc biçiminde verilebilmesini önemli kılar; dizinin sekizinci yazısında bu iki biçimin birlikte desteklenmesinin bir maliyeti olduğunu da not etmiştik.

= Bir Yüz Yüze İşlemin Üç Evresi

ISO\/IEC 18013-5’te bir yüz yüze işlem üç evrede gerçekleşir (Şekil 2):

+ #{strong[Aygıt katılımı]} (#{emph[device engagement]}): Telefon ile okuyucu tanışır. Telefon, kendisiyle nasıl bağlantı kurulacağını ve o işleme özgü bir geçici açık anahtarı okuyucuya bir QR kodla ya da NFC dokunuşuyla verir.
+ #{strong[Oturum kurulması]} (#{emph[session establishment]}): Okuyucu kendi geçici anahtarını üretir, iki taraf ortak oturum anahtarlarını hesaplar ve okuyucu ilk isteğini şifreli olarak gönderir.
+ #{strong[Veri alma]} (#{emph[data retrieval]}): Telefon, kişinin onayıyla, istenen veriyi şifreli olarak Bluetooth, NFC ya da Wi-Fi Aware üzerinden gönderir.

#sekil(2, [Yüz yüze işlemin üç evresi], "figures/a9/sekil-2.svg", yarim: false)

Bu ayrımın neden yapıldığını anlamak, standardın güvenlik mantığının anahtarıdır. Tanışma ile veri aktarımı farklı kanallardan yapılır. Tanışma kanalı (QR ya da NFC) çok kısa menzillidir ve fiziksel yakınlık gerektirir: QR kodu okumak için ekranı görmek, NFC için cihazları birkaç santimetreye kadar yaklaştırmak gerekir. Veri kanalı (Bluetooth ya da Wi-Fi Aware) ise daha uzak mesafeden çalışır ve daha çok veri taşır, ama dinlenmeye daha açıktır. Standart, geçici açık anahtarı kısa menzilli kanaldan geçirerek uzun menzilli kanalı şifrelemenin dayanağını kurar. Yakındaki bir saldırgan Bluetooth trafiğini dinlese bile, tanışma anında verilen anahtarı görmediği için oturumu çözemez.

== Aygıt katılımı: telefon kendini tanıtır

Aynur cüzdanında "ehliyetimi göster" dediğinde telefon önce #{strong[yeni bir geçici anahtar çifti]} üretir (#{raw("EDeviceKey")}). "Geçici" (#{emph[ephemeral]}) sözcüğü önemlidir: Bu anahtar yalnızca bu işlem için üretilir, işlem bitince silinir ve bir sonraki işlemde başkası üretilir. Böylece iki farklı işlemdeki tanışma verisi birbirine bağlanamaz.

Telefon, geçici açık anahtarı ve okuyucunun kendisine nasıl ulaşabileceği bilgisini #{strong[aygıt katılımı yapısı]} (#{emph[DeviceEngagement]}) adı verilen küçük bir CBOR nesnesine koyar. QR kodla tanışmada bu yapı base64url ile metne çevrilir ve başına #{raw("mdoc:")} eklenir; ekranda beliren QR kodun içeriği budur. NFC ile tanışmada ise yapı, NFC Forum’un #{strong[bağlantı devri]} (#{emph[Connection Handover]}) mesajlarının içinde taşınır.

#kutu("teknik", [Aygıt katılımı yapısı])[
Bluetooth ile veri almayı öneren bir telefonun aygıt katılımı yapısı (CBOR metin gösterimiyle; değerler örnektir):

#kod("text", "{
  0: \"1.0\",                                  ; sürüm
  1: [                                       ; güvenlik
       1,                                    ; şifre takımı 1
       24(<< { 1: 2, -1: 1,                  ; EDeviceKey: EC2, P-256
               -2: h'5A88D182…', -3: h'BA4E5C3A…' } >>)
     ],
  2: [                                       ; veri alma yöntemleri
       [ 2, 1, { 0: false, 1: true,          ; tür 2 = BLE, sürüm 1
                 11: h'45EFEF74…' } ]        ; merkezî istemci kipi, işleme özgü UUID
     ]
}", baslik: "Örnek: Bluetooth öneren bir aygıt katılımı yapısı")

QR koda giden metin şöyle başlar: #{raw("mdoc:owBjMS4wAYIB2BhYS6QBAiAB…")}. Yapıdaki #{raw("24(<< … >>)")} gösterimi, içteki CBOR nesnesinin bir bayt dizisi olarak gömüldüğünü söyler; bu, daha sonra aynı baytların özetinin alınabilmesi için gereklidir. Veri alma yöntemleri dizisinde tür 1 NFC, tür 2 Bluetooth Low Energy (BLE), tür 3 Wi-Fi Aware’dir. BLE seçenekleri telefonun hangi rolde çalışabildiğini (#{raw("0")}: çevre birim sunucusu kipi, #{raw("1")}: merkezî istemci kipi) ve bağlantı için kullanılacak, #{strong[yalnızca bu işleme özgü]} UUID’yi taşır. NFC ile tanışmada #{raw("2")} alanı bulunmaz; desteklenen yöntemler NFC bağlantı devri mesajındaki "alternatif taşıyıcı" kayıtlarında yer alır.
]

== Oturum kurulması: ortak sır ve iki anahtar

Okuyucu QR kodu okuduğunda telefonun geçici açık anahtarını öğrenmiştir. Şimdi kendi #{strong[geçici anahtar çiftini]} (#{raw("EReaderKey")}) aynı eğri üzerinde üretir. Bu noktada iki tarafın elinde şunlar vardır: Telefon kendi geçici gizli anahtarını bilir; okuyucu kendi geçici gizli anahtarını ve telefonun geçici açık anahtarını bilir. Okuyucu ilk mesajında kendi açık anahtarını telefona gönderecektir.

İki taraf, #{strong[eliptik eğri Diffie-Hellman]} (ECDH) adı verilen bir yöntemle, birbirlerine hiçbir gizli bilgi göndermeden #{strong[aynı ortak sırrı]} hesaplar. Yöntemin sezgisi şöyle anlatılabilir: Her taraf kendi gizli anahtarını karşı tarafın açık anahtarıyla "karıştırır" ve matematik, iki karışımın aynı sonucu vermesini sağlar. Kanalı dinleyen biri yalnızca iki açık anahtarı görür; bunlardan ortak sırrı hesaplamak pratikte imkânsızdır.

Ortak sır doğrudan şifreleme anahtarı olarak kullanılmaz. İki taraf ondan, #{strong[HKDF]} adlı bir anahtar türetme fonksiyonuyla \[8\], iki ayrı anahtar türetir: biri okuyucunun telefona gönderdiği mesajları şifrelemek için (#{raw("SKReader")}), diğeri telefonun okuyucuya gönderdiği mesajları şifrelemek için (#{raw("SKDevice")}). Türetmede bir "tuz" da kullanılır: o ana kadarki tanışma mesajlarının tamamını özetleyen #{strong[oturum dökümü]} (#{emph[SessionTranscript]}). Oturum dökümü üç parçadır: telefonun aygıt katılımı yapısı, okuyucunun geçici açık anahtarı ve tanışmanın nasıl yapıldığını gösteren bir #{strong[devir]} (#{emph[handover]}) parçası (QR ile tanışmada boş, NFC ile tanışmada NFC mesajlarının kendisi):

#formul[$ "SessionTranscript" = ("DeviceEngagementBytes", "EReaderKeyBytes", "Handover") $]

Böylece oturum anahtarları, tanışmanın her baytına bağlanır; araya giren biri tanışma mesajlarından birini değiştirirse iki tarafın anahtarları tutmaz ve oturum açılmaz (Şekil 3).

Okuyucu ilk isteğini #{raw("SKReader")} ile şifreler ve kendi geçici açık anahtarıyla birlikte #{strong[oturum kurma mesajı]} (#{emph[SessionEstablishment]}) olarak gönderir. Telefon bu mesajdan okuyucunun açık anahtarını alır, aynı hesabı yapar, iki anahtarı türetir ve isteği çözer.

#sekil(3, [Oturum anahtarlarının türetilmesi], "figures/a9/sekil-3.svg", yarim: false)

Oturum kurulumunun tamamı beş adımdır; $e$ gizli, $E$ açık geçici anahtarı, alt simge de sahibini ($D$ telefon, $R$ okuyucu) gösterir:

#adimlar((
  ("Telefon", [#{strong[Geçici anahtar.]} Bu işleme özgü yeni bir anahtar çifti üretir.], $(e_D, E_D)$),
  ("Telefon → Okuyucu", [#{strong[Tanışma.]} Geçici açık anahtarı aygıt katılımı yapısına koyup QR ya da NFC ile verir.], $E_D -> "QR / NFC"$),
  ("Okuyucu", [#{strong[Ortak sır.]} Aynı eğride kendi geçici anahtar çiftini $(e_R, E_R)$ üretir, ortak sırrı ve iki oturum anahtarını hesaplar.], $Z_"AB" = "ECDH"(e_R, E_D)$),
  ("Okuyucu → Telefon", [#{strong[Oturum kurma.]} Kendi açık anahtarını ve #{raw("SKReader")} ile şifrelenmiş isteği gönderir.], $(E_R, "şifreli istek")$),
  ("Telefon", [#{strong[Aynı hesap.]} Aynı ortak sırrı kendi tarafından hesaplar, anahtarları türetip isteği çözer.], $Z_"AB" = "ECDH"(e_D, E_R)$),
))

#kutu("teknik", [Şifreleme ayrıntıları ve küçük bir hesap])[
Standardın tanımladığı tek şifre takımında (takım 1) oturum anahtarları dört satırlık bir hesapla bulunur \[1\]. Burada $e_R$ okuyucunun, $e_D$ telefonun geçici gizli anahtarıdır; $E_R$ ve $E_D$ bunların açık eşleridir. Tuz, oturum dökümünün CBOR kodlamasının özetidir:

#formul[$ Z_"AB" &= "ECDH"(e_R, E_D) = "ECDH"(e_D, E_R) \
"tuz" &= "SHA-256"("SessionTranscriptBytes") \
"SK"_"Reader" &= "HKDF-SHA-256"(Z_"AB", "tuz", "SKReader", 32 "bayt") \
"SK"_"Device" &= "HKDF-SHA-256"(Z_"AB", "tuz", "SKDevice", 32 "bayt") $]

İlk satır, iki tarafın birbirine gizli bir şey göndermeden aynı sırra ulaştığını söyler. HKDF’nin dört girdisi sırasıyla girdi anahtarı, tuz, bağlam bilgisi (#{emph[info]}) ve çıktı uzunluğudur; aynı ortak sırdan farklı bağlam bilgisiyle iki bağımsız anahtar çıkar. Şifreleme AES-256-GCM ile yapılır \[11\]; ek doğrulanmış veri boştur ve şifreli metnin sonuna 16 baytlık doğrulama etiketi eklenir.

GCM’de aynı anahtarla aynı başlangıç vektörünün (IV) iki kez kullanılması felakettir; iki mesaj birbirine karşı çözülebilir hâle gelir. Standart bu yüzden IV’yi basit ve tekrarsız bir kuralla kurar: 8 baytlık bir #{strong[tanımlayıcı]} ile 4 baytlık bir #{strong[mesaj sayacının]} birleşimi.

#formul[$ "IV" = underbrace("tanımlayıcı", 8 "bayt") || underbrace("sayaç", 4 "bayt"), quad 8 + 4 = 12 "bayt" = 96 "bit" $]

Okuyucunun tanımlayıcısı sekiz sıfır baytı, telefonunki son baytı 1 olan sekiz bayttır. Sayaç her anahtar için ayrı tutulur, ilk mesajda 1’dir ve her mesajda bir artar. Buna göre ilk üç mesajın IV’si şöyledir:

#tablo([], (16fr, 9fr, 22fr, 12fr), ([Mesaj], [Anahtar], [Tanımlayıcı (8 bayt)], [Sayaç (4 bayt)],), (
  ([okuyucunun 1. mesajı], [$"SK"_"Reader"$], [#{raw("00 00 00 00 00 00 00 00")}], [#{raw("00 00 00 01")}],),
  ([telefonun 1. mesajı], [$"SK"_"Device"$], [#{raw("00 00 00 00 00 00 00 01")}], [#{raw("00 00 00 01")}],),
  ([okuyucunun 2. mesajı], [$"SK"_"Reader"$], [#{raw("00 00 00 00 00 00 00 00")}], [#{raw("00 00 00 02")}],),
))

İki yön farklı anahtarlar kullandığı ve tanımlayıcılar farklı olduğu için hiçbir IV tekrarlanmaz. Ayrıca iki tarafın geçici anahtarları her işlemde yenilendiğinden, bir işlemin anahtarlarını ele geçiren biri ne önceki ne de sonraki işlemleri çözebilir.
]

== İstek: ne isteniyor, ne saklanacak?

Okuyucunun şifreli olarak gönderdiği ilk mesajın içinde #{strong[aygıt isteği]} (#{emph[DeviceRequest]}) vardır. İstek, belge türüne ve ad alanına göre hangi veri öğelerinin istendiğini sayar. Her öğenin yanında tek bir doğru\/yanlış değeri bulunur: #{strong[saklama niyeti]} (#{emph[IntentToRetain]}). Okuyucu, öğeyi işlem bittikten sonra da saklayacaksa bunu #{raw("true")} olarak bildirmek zorundadır.

Standart bu bayrağa hukuki bir taahhüt gibi davranır: Doğrulayan, saklama niyetini #{raw("true")} olarak bildirmediği hiçbir öğeyi saklayamaz; buna özetler, imzalar ve veriden türetilen bilgiler de dahildir. "Saklamak", işlemi gerçek zamanlı yürütmek için gerekenden daha uzun süre tutmak olarak tanımlanır \[1\]. Giriş bölümündeki araç kiralama sahnesinde cüzdanın "ehliyet numaranızı saklayacağını bildiriyor" demesi bu bayraktan gelir. Kişi, onay vermeden önce hangi öğenin kalıcı olarak bir yerde duracağını görür.

#kutu("teknik", [Bir aygıt isteği])[
Araç kiralama şirketinin okuyucusunun gönderdiği istek (CBOR metin gösterimiyle; değerler örnektir):

#kod("text", "{
  \"version\": \"1.0\",
  \"docRequests\": [
    {
      \"itemsRequest\": 24(<< {
        \"docType\": \"org.iso.18013.5.1.mDL\",
        \"nameSpaces\": {
          \"org.iso.18013.5.1\": {
            \"family_name\": false,
            \"given_name\": false,
            \"portrait\": false,
            \"driving_privileges\": false,
            \"document_number\": true
          }
        }
      } >>),
      \"readerAuth\": [ h'A10126', { 33: h'30820215…' }, null, h'5B4C2A…' ]
    }
  ]
}", baslik: "Örnek: araç kiralama okuyucusunun aygıt isteği")

Her öğenin yanındaki değer saklama niyetidir; yalnızca #{raw("document_number")} saklanacaktır. #{raw("readerAuth")}, okuyucunun kimliğini kanıtlayan isteğe bağlı imzadır (Bölüm 7): Dört parçalı bir COSE\_Sign1 dizisidir; ilk parça imza algoritmasını (#{raw("h'A10126'")}, yani ES256), ikinci parça #{raw("33")} etiketi altında okuyucunun sertifika zincirini, üçüncü parça boş yükü (imzalanan veri ayrıca hesaplanır), dördüncü parça imzanın kendisini taşır.
]

== Cevap: iki imza, bir döküm

Telefon isteği çözdükten sonra kişiye bir onay ekranı gösterir: kim istiyor (okuyucu kimliğini kanıtladıysa), ne istiyor, neyi saklayacak. Aynur onay verdiğinde (genellikle biyometri ya da PIN ile, çünkü telefonun gizli anahtarının kullanılması kişinin doğrulanmasına bağlanmıştır) telefon #{strong[aygıt cevabını]} (#{emph[DeviceResponse]}) hazırlar.

Cevabın her belge için iki kısmı vardır:

- #{strong[Veren imzalı kısım]} (#{raw("issuerSigned")}): Kişinin onayladığı veri öğelerinin paketleri (rastgele değer ve özet kimliğiyle birlikte) ve veren kurumun imzaladığı MSO.
- #{strong[Cihaz imzalı kısım]} (#{raw("deviceSigned")}): Telefonun, MSO’daki #{raw("deviceKey")}’e karşılık gelen gizli anahtarla ürettiği kanıt.

Telefonun neyi imzaladığı, bütün güvenliğin düğümlendiği noktadır. İmzalanan veri #{strong[cihaz kimlik doğrulama yapısıdır]} (#{emph[DeviceAuthentication]}) ve dört parçadan oluşur: sabit bir etiket, #{strong[oturum dökümü]}, belge türü ve cihaz imzalı öğeler.

#formul[$ "DeviceAuthentication" = ("DeviceAuthentication", "SessionTranscript", "docType", "DeviceNameSpaces") $]

Oturum dökümü, Bölüm 5.2’de gördüğümüz gibi, bu işlemin tanışma mesajlarını ve okuyucunun geçici açık anahtarını içerir. Yani telefonun kanıtı #{strong[bu işleme ve bu okuyucuya]} bağlıdır. Başka bir okuyucuya gösterilmiş bir cevabı kaydedip buraya getiren biri başarılı olamaz; çünkü o cevaptaki kanıt başka bir oturum dökümü üzerine atılmıştır. Dizinin sekizinci yazısında SD-JWT’nin anahtar bağlama JWT’sinde #{raw("nonce")} ve #{raw("aud")} alanlarının gördüğü işi, mdoc’ta oturum dökümü görür.

Telefon bu kanıtı iki yoldan biriyle üretebilir. Birincisi, gizli anahtarla atılan bir #{strong[imzadır]} (ECDSA ya da EdDSA). İkincisi, gizli anahtar ile okuyucunun geçici açık anahtarından ECDH ile türetilen ortak bir anahtarla hesaplanan bir #{strong[MAC]}’tir (mesaj doğrulama kodu). Standart iki yol arasında mahremiyet açısından önemli bir fark olduğunu not eder: İmza, üçüncü kişilere de gösterilebilen, inkâr edilemez bir kanıttır; okuyucu onu saklayıp "bu kişi şu saatte buradaydı" demek için kullanabilir. MAC ise yalnızca okuyucuyu ikna eder; çünkü aynı MAC’i okuyucu da hesaplayabilir ve bu yüzden okuyucu onu başkasına kanıt olarak gösteremez \[1\]. Kişinin sonradan inkâr edebilmesi (#{emph[deniability]}), yüz yüze gösterimin dijital bir iz bırakmaması açısından değerli bir özelliktir.

#kutu("teknik", [Bir aygıt cevabı])[
Konser kapısındaki okuyucu yalnızca #{raw("age_over_18")} istediğinde dönen cevap (CBOR metin gösterimiyle; değerler örnektir, MSO kısaltılmıştır):

#kod("text", "{
  \"version\": \"1.0\",
  \"documents\": [
    {
      \"docType\": \"org.iso.18013.5.1.mDL\",
      \"issuerSigned\": {
        \"nameSpaces\": {
          \"org.iso.18013.5.1\": [
            24(<< { \"digestID\": 7, \"random\": h'8798645B20EA…',
                    \"elementIdentifier\": \"age_over_18\", \"elementValue\": true } >>)
          ]
        },
        \"issuerAuth\": [ h'A10126', { 33: h'308201E8…' }, 24(<< MSO >>), h'59E64205…' ]
      },
      \"deviceSigned\": {
        \"nameSpaces\": 24(<< {} >>),
        \"deviceAuth\": { \"deviceMac\": [ h'A10105', {}, null, h'E99521A8…' ] }
      }
    }
  ],
  \"status\": 0
}", baslik: "Örnek: yalnızca age_over_18 taşıyan bir aygıt cevabı")

Okuyucu #{raw("age_over_18")} paketinin SHA-256 özetini hesaplar ve MSO’daki #{raw("7")} numaralı özetle karşılaştırır:

#formul[$ "SHA-256"("paket"_7) attach(=, t: ?) "valueDigests"["org.iso.18013.5.1"][7] $]

#{raw("deviceMac")}’in başlığındaki #{raw("h'A10105'")}, algoritmanın HMAC-SHA-256 olduğunu söyler. Okuyucu aynı MAC’i kendisi hesaplayabilmek için, kendi geçici gizli anahtarı ile MSO’daki #{raw("deviceKey")}’den ECDH ile aynı anahtarı türetir. Sadeleştirilmiş hâliyle hesap şöyledir ($d$, #{raw("deviceKey")}’in telefonda kalan gizli eşidir):

#formul[$ K_"MAC" &= "HKDF-SHA-256"("ECDH"(e_R, "deviceKey"), "tuz", "EMacKey", 32 "bayt") \
        &= "HKDF-SHA-256"("ECDH"(d, E_R), "tuz", "EMacKey", 32 "bayt") \
"deviceMac" &= "HMAC-SHA-256"(K_"MAC", "DeviceAuthentication") $]

İlk iki satır aynı anahtarı iki taraftan hesaplar; bu yüzden MAC’i okuyucu da üretebilir ve onu başkasına kanıt diye gösteremez. #{raw("status: 0")} cevabın hatasız olduğunu gösterir.
]

== Okuyucunun kontrol listesi

Cevap geldiğinde okuyucu, internete hiç bağlanmadan şu kontrolleri yapar:

#adimlar((
  ("Okuyucu", [#{strong[Çözme.]} Cevabı #{raw("SKDevice")} ile çözer.], $"çöz"("SK"_"Device", "cevap")$),
  ("Okuyucu", [#{strong[Veren imzası.]} MSO’nun imzasını belge imzalayıcı sertifikasıyla doğrular; sertifikanın önceden yüklenmiş güvenilir bir #{strong[kök sertifikaya]} (Bölüm 7.1) zincirlendiğini kontrol eder.], $"imzalayıcı" -> "kök"$),
  ("Okuyucu", [#{strong[Tür ve süre.]} Belge türünün istenen türle aynı olduğunu ve şimdiki zamanın geçerlilik aralığında olduğunu kontrol eder.], $t in ["validFrom", "validUntil"]$),
  ("Okuyucu", [#{strong[Özetler.]} Gelen her veri öğesi paketinin özetini hesaplar ve MSO’daki özetle karşılaştırır.], $"SHA-256"("paket"_i) = "özet"_i$),
  ("Okuyucu", [#{strong[Telefonun kanıtı.]} İmza ya da MAC’i #{raw("deviceKey")} ile ve kendi hesapladığı oturum dökümü üzerinden doğrular.], $"doğrula"("deviceKey")$),
  ("Okuyucu", [#{strong[İptal.]} Elinde güncel bir iptal bilgisi varsa belgenin iptal edilmediğini kontrol eder.], $"durum" = 0$),
  ("Görevli", [#{strong[Portre.]} Okuyucu portreyi gösterir; görevli fotoğrafı karşısındaki kişiyle karşılaştırır.], []),
))

Son adım, yüz yüze doğrulamanın internet üzerinden doğrulamadan en önemli farkıdır: Zincirin son halkası bir insan gözüdür. Şekil 4, araç kiralama tezgâhındaki işlemin tamamını baştan sona gösteriyor.

#sekil(4, [QR ile tanışma ve Bluetooth ile veri alma: bir işlemin tamamı], "figures/a9/sekil-4.svg", yarim: false)

== Oturumun kapanışı

İşlem bittiğinde iki taraf oturumu kapatır. Standart burada da açıktır: Oturum anahtarları ve geçici anahtar malzemesi yok edilir, veri kanalı kapatılır. Bluetooth kullanıldıysa bağlantıya ait bütün bilgiler her işlemden sonra silinir. Bir işlem sırasında hiçbir mesaj gelmezse, oturum belirli bir bekleme süresinden sonra kendiliğinden kapanır; standart bu sürenin 300 saniyeden kısa olmamasını önerir \[1\].

= QR, NFC, BLE: Ne Zaman Hangisi?

== İki evre, iki ayrı seçim

Bölüm 5’te tanışma ile veri aktarımının ayrı kanallardan yapıldığını gördük. Bu yüzden "QR mı, NFC mi, Bluetooth mu?" sorusu aslında iki ayrı sorudur: Tanışma hangi kanaldan yapılacak, veri hangi kanaldan taşınacak?

Standart her iki soru için de bir zorunlu ve isteğe bağlı seçenekler düzeni kurar \[1\]. Tanışma için telefon QR koddan ya da NFC’den en az birini desteklemek zorundadır; okuyucu ise ikisini de desteklemek zorundadır. Veri aktarımı için telefon Bluetooth Low Energy’den (BLE) ya da NFC’den en az birini desteklemelidir; okuyucu ikisini de desteklemek zorundadır. Wi-Fi Aware ise telefon için isteğe bağlı, okuyucu için önerilen bir üçüncü veri yoludur. Bu düzenin mantığı basittir: Telefonlar birbirinden farklıdır ve her birinin bütün teknolojileri desteklemesi beklenemez; ama okuyucu sahada her telefonla karşılaşacağı için hepsini konuşabilmelidir.

#tablo([#{strong[Tablo 2.]} Yüz yüze gösterimde kanallar ve rolleri (ISO\/IEC 18013-5:2021).], (6fr, 9fr, 48fr, 33fr, 27fr), ([Kanal], [Evre], [Destek (telefon \/ okuyucu)], [Güçlü yanı], [Zayıf yanı],), (
  ([QR kod], [tanışma], [telefon: QR ya da NFC’den en az biri \/ okuyucu: zorunlu], [her telefonda ekran var; bilinçli bir hareket gerektirir], [tek yönlü; okuyucu telefona bir şey söyleyemez],),
  ([NFC], [tanışma ve veri], [telefon: her evrede seçeneklerden biri \/ okuyucu: zorunlu], [dokunma yakınlığı; tanışmada iki yönlü pazarlık], [düşük hız; telefon alanda tutulmalı],),
  ([BLE], [veri], [telefon: BLE ya da NFC’den en az biri \/ okuyucu: zorunlu (iki kip)], [menzil ve hız yeterli; telefon elde kalır], [bağlantı kurma süresi değişken],),
  ([Wi-Fi Aware], [veri], [telefon: isteğe bağlı \/ okuyucu: önerilir], [yüksek hız], [daha az yaygın],),
))

== QR kod: görerek tanışma

QR kod, tanışmanın en evrensel yoludur: Her akıllı telefonun ekranı vardır ve her okuyucunun bir kamerası olabilir. Kişinin kodu ekranda göstermesi bilinçli bir harekettir; telefon cebindeyken kimse ondan habersiz bir QR kod okuyamaz.

QR kodun bir sınırı vardır: #{strong[tek yönlüdür.]} Telefon okuyucuya bilgi verir, ama okuyucu telefona bu kanaldan hiçbir şey söyleyemez. Standart bu sınırın pratik bir sonucunu not eder: Tanışma QR ile yapılır ve okuyucu veri aktarımı için NFC’yi seçerse, telefona bunu bildirmenin bir yolu yoktur; kişi telefonunu okuyucuya dokundurması gerektiğini bilmeyebilir \[1\]. Bu yüzden QR ile tanışmanın doğal eşi BLE’dir.

== NFC: dokunarak tanışma

NFC (#{emph[Near Field Communication]}, yakın alan iletişimi) birkaç santimetrelik bir menzilde çalışır. Temassız ödeme kartlarından ve toplu taşıma kartlarından tanıdığımız teknoloji budur. Tanışmada NFC’nin QR’a göre iki üstünlüğü vardır. Birincisi, kişinin ekranı açıp bir kod göstermesine gerek kalmadan, telefonu okuyucuya yaklaştırması yeterlidir. İkincisi, NFC tanışması #{strong[iki yönlü]} olabilir.

Standart, NFC ile tanışmada NFC Forum’un #{strong[bağlantı devri]} (#{emph[Connection Handover]}) spesifikasyonunu kullanır \[6\]. Okuyucu "devir isteyen", telefon ise etiket rolündedir. İki yol vardır. #{strong[Durağan devirde]} (#{emph[static handover]}) telefon, desteklediği veri yollarını ve aygıt katılımı yapısını hazır bir mesajda sunar, okuyucu bunlardan birini seçer. #{strong[Pazarlıklı devirde]} (#{emph[negotiated handover]}) ise okuyucu önce kendi desteklediği yolları gönderir, telefon bunlardan tam birini seçerek cevap verir. Pazarlıklı devir, iki tarafın Bluetooth ya da Wi-Fi Aware bağlantısı için gerekli bilgileri de değiş tokuş etmesine olanak verir; bu hem bağlantıyı hızlandırır hem de güvenliği artırır. NFC ile tanışmada oturum dökümünün "devir" parçası, bu NFC mesajlarının kendisidir; böylece oturum anahtarları dokunma anında değiş tokuş edilen baytlara bağlanır.

Veri aktarımında ise NFC’nin zayıf yanı ortaya çıkar. Standardın kendi notuna göre NFC’nin veri hızı sınırlıdır; çok veri gerektiren bir işlemde kişinin telefonunu işlem boyunca okuyucunun alanında tutması pratik olmayabilir. Daha önemlisi, telefon alandan çıktığında bağlantı kopar ve işlemin yeniden başlaması gerekir. Kişinin telefonda bir onay vermesi gerekiyorsa ve bu sırada telefonu okuyucudan uzaklaştırırsa işlem bozulur \[1\]. Bu yüzden NFC veri aktarımı, küçük cevaplar (bir yaş onayı gibi) ya da onayın önceden verildiği akışlar için daha uygundur.

== BLE: elde kalan telefon

Bluetooth Low Energy \[7\], onlarca metreye varabilen menzili ve NFC’ye göre çok daha yüksek hızıyla veri aktarımının asıl yoludur. En büyük pratik üstünlüğü, telefonun #{strong[kişinin elinde kalmasıdır]}. Tanışma bir QR kodla ya da bir dokunuşla yapıldıktan sonra kişi telefonunu geri çeker, onay ekranına rahatça bakar, parmak izini okutur; veri bu sırada Bluetooth üzerinden akar.

BLE’de iki cihazdan biri "merkez", diğeri "çevre birim" rolündedir. Standart iki kip tanımlar. #{strong[Çevre birim sunucusu kipinde]} (#{emph[mdoc peripheral server mode]}) telefon kendini duyurur ve okuyucu ona bağlanır. #{strong[Merkezî istemci kipinde]} (#{emph[mdoc central client mode]}) okuyucu kendini duyurur ve telefon ona bağlanır. Okuyucu iki kipi de desteklemek zorundadır; telefon ikisini de destekliyorsa okuyucunun merkezî istemci kipini seçmesi önerilir \[1\].

Kalabalık bir yerde onlarca cihaz aynı anda Bluetooth yayını yapıyor olabilir. Telefon doğru okuyucuyu nasıl bulur? Tanışma mesajında yalnızca #{strong[o işleme özgü]} bir UUID (tekil tanımlayıcı) verilir; doğru cihaz bu UUID’yi yayınlayan cihazdır. Standart buna bir kontrol daha ekler: Merkezî istemci kipinde okuyucu, tanışmada aldığı geçici açık anahtardan HKDF ile türettiği 16 baytlık bir değeri (#{raw("\"BLEIdent\"")} etiketiyle) bir özellik olarak sunar; telefon bu değeri kendisi de hesaplar ve tutmazsa bağlantıyı keser. Bu değeri yalnızca QR kodu ya da NFC mesajını gerçekten almış olan okuyucu hesaplayabilir. Standart, yanlış okuyucuya bağlanmanın bir güvenlik açığı yaratmayacağını da not eder: Oturum anahtarları tanışmaya bağlı olduğu için yanlış okuyucuyla oturum zaten kurulamaz; Ident kontrolü yalnızca zaman kaybını önler \[1\].

BLE’nin kendi şifreleme ve eşleştirme özellikleri vardır, ama standart bunlara güvenmez: Güvenli BLE bağlantıları her iki taraf destekliyorsa kullanılabilir, ancak zorunlu tutulamaz; verinin güvenliği Bölüm 5.2’deki oturum şifrelemesinden gelir. BLE’yi standart, bir taşıma borusu olarak görür.

#sekil(5, [Hangi kanal, hangi evrede?], "figures/a9/sekil-5.svg", yarim: false)

#kutu("ornek", [Aynur’un günü, kanal kanal])[
Araç kiralama tezgâhında okuyucunun kamerası vardır; Aynur’un telefonu QR kod gösterir, veri BLE ile akar. Görevli fotoğrafı ve ehliyet bilgilerini gördüğünde Aynur telefonunu çoktan cebine koymuştur. Jandarma kontrolünde görevlinin cihazı NFC okuyucudur; Aynur telefonunu cihaza dokundurur, pazarlıklı devirle iki cihaz BLE bilgilerini değiş tokuş eder ve veri yine BLE ile akar. Konser kapısında kalabalık sırada hız önemlidir; okuyucu yalnızca #{raw("age_over_18")} istediği ve cevap birkaç yüz bayt tuttuğu için tanışma da veri aktarımı da NFC ile, tek bir dokunuşta yapılabilir. Bunun için Aynur’un, yaş onayı gibi küçük paylaşımlar için önceden izin vermiş olması gerekir; aksi hâlde onay ekranına bakarken telefonu okuyucudan uzaklaştırması bağlantıyı koparır.
]

= Güven İki Yönlü: Okuyucu Verene, Cüzdan Okuyucuya

== Okuyucu, veren kurumun anahtarını nereden biliyor?

Bölüm 5.5’teki kontrol listesinin ikinci adımı, MSO’yu imzalayan sertifikanın güvenilir bir kök sertifikaya zincirlenmesiydi. Mobil ehliyet dünyasında bu kök sertifikanın adı #{strong[IACA]}’dır (#{emph[Issuing Authority Certificate Authority]}, veren makamın sertifika otoritesi). Her veren makam, örneğin bir ülkenin ya da eyaletin trafik idaresi, kendi IACA kökünü işletir; belgeleri imzalayan #{strong[belge imzalayıcı]} (#{emph[document signer]}, DS) sertifikalarını bu kök verir. Okuyucu bir belgeyi doğrulamak için o belgeyi veren makamın IACA köküne sahip olmalıdır.

Standart, IACA köklerinin okuyuculara nasıl dağıtılacağını zorunlu bir yönteme bağlamaz. Yalnızca bilgilendirici bir ekinde, #{strong[VICAL]} (#{emph[Verified Issuer Certificate Authority List]}, doğrulanmış veren sertifika otoriteleri listesi) adını verdiği bir yöntemi tarif eder: Güvenilir bir sağlayıcı, kabul ettiği veren makamların IACA köklerini toplayıp imzalı tek bir liste hâlinde yayımlar \[1\]. Bölüm 3.2’de andığımız AAMVA güven hizmeti, Amerika Birleşik Devletleri ve Kanada’daki veren makamlar için böyle bir liste sağlar \[5\]. Avrupa Birliği’nde ise aynı işi, dizinin altıncı yazısında anlattığımız #{strong[güven listeleri]} görür: Hangi kurumun kişi kimlik verisi ya da öznitelik onayı vermeye yetkili olduğunu ve hangi anahtarları kullandığını imzalı listeler söyler.

Bu düzenin yüz yüze doğrulama için önemli bir sonucu vardır: Liste #{strong[önceden]} okuyucuya yüklenir. Okuyucu her işlemde bir sunucuya sormaz; elindeki listeyle çevrimdışı karar verir. Listenin ne sıklıkla güncelleneceği ise, okuyucunun internete ne sıklıkla eriştiğine bağlı, işletmeye özgü bir karardır.

== Cüzdan, okuyucunun kim olduğunu nereden biliyor?

Şimdi soruyu tersine çevirelim. Konser kapısındaki okuyucu yalnızca yaş istemeli; ama ya kötü niyetli biri, eline aldığı bir okuyucuyla kapıda bekleyip insanlardan ad, adres ve fotoğraf isterse? Ya da trafik görevlisi kılığına girmiş biri? Cüzdanın, karşısındaki okuyucunun kime ait olduğunu bilmesi gerekir.

ISO\/IEC 18013-5 bunun için #{strong[mdoc okuyucu kimlik doğrulaması]} (#{emph[mdoc reader authentication]}) adlı bir mekanizma tanımlar \[1\]. Okuyucunun bir anahtar çifti ve o anahtar için güvenilen bir otoritenin verdiği bir #{strong[okuyucu sertifikası]} vardır. Okuyucu isteğini gönderirken, isteğin üzerine bu anahtarla bir imza atar ve sertifika zincirini imzayla birlikte gönderir (Bölüm 5.3’teki #{raw("readerAuth")}). İmzalanan veri #{strong[okuyucu kimlik doğrulama yapısıdır]} (#{emph[ReaderAuthentication]}): sabit bir etiket, #{strong[oturum dökümü]} ve isteğin kendisi.

#formul[$ "ReaderAuthentication" = ("ReaderAuthentication", "SessionTranscript", "ItemsRequest") $]

Oturum dökümünün imzaya girmesi, imzanın bu işleme bağlı olmasını sağlar; başka bir yerde kaydedilmiş bir okuyucu imzası burada kullanılamaz.

Cüzdan imzayı doğrular, sertifika zincirini kendi güvendiği köklere karşı kontrol eder ve sonucu kişiye gösterir: "Bu istek, X kurumuna ait doğrulanmış bir okuyucudan geliyor" ya da "Bu okuyucunun kimliği doğrulanamadı." Standart, okuyucu kimlik doğrulamasının bir yan faydasını da not eder: Telefon, araya giren bir saldırganı #{strong[veri göndermeden önce]} fark edebilir \[1\].

Okuyucu kimlik doğrulaması, ISO\/IEC 18013-5’te #{strong[isteğe bağlıdır]}; veren kurumun imzası, oturum şifrelemesi ve telefonun kanıtı zorunludur. Bu tercihin anlaşılır nedenleri vardır. Okuyuculara sertifika vermek, onları yönetmek ve iptal etmek ayrı bir altyapı gerektirir; küçük bir dükkânın kasasındaki okuyucu için bu yük ağır olabilir. Ama isteğe bağlılığın bir bedeli de vardır: Okuyucusu kimliğini kanıtlamayan bir istek karşısında karar, ekrandaki uyarıyı okuyan kişiye kalır.

Avrupa Birliği’nin çerçevesi bu konuda daha ileri gider. eIDAS 2.0 \[18\] cüzdandan bilgi isteyen güvenen tarafların kayıt olmasını şart koşar ve kayıtlı güvenen taraflara, cüzdanın onları tanıyabilmesi için sertifikalar verilir; dizinin sekizinci yazısında bu düzenin internet üzerindeki karşılığını görmüştük. Yüz yüze senaryoda aynı tanıma, ISO’nun okuyucu kimlik doğrulaması mekanizması üzerinden yapılır. Hedef, Aynur’un cüzdanının konser kapısındaki okuyucunun kayıtlı bir işletmeye ait olduğunu ve bu işletmenin kayıtta yalnızca yaş bilgisi isteyeceğini bildirdiğini görebilmesidir; kayıt bilgisinin yüz yüze akışta ayrıntılı olarak nasıl taşınacağı ise AB’nin teknik çalışmalarında hâlâ işlenen bir konudur.

#sekil(6, [Güvenin iki yönü: okuyucu verene, cüzdan okuyucuya], "figures/a9/sekil-6.svg", yarim: false)

= Aynı Belge, İnternet Üzerinden

Yüz yüze gösterim için tasarlanan mdoc, internet üzerinden de gösterilebilir ve bu iki dünya arasındaki köprüler, kişinin tek bir belgeyi her yerde kullanabilmesi için önemlidir.

ISO\/IEC TS 18013-7, mobil ehliyetin bir okuyucuya #{strong[internet üzerinden]} gösterilmesini tanımlayan ek işlevleri içerir \[2\]. Dizinin sekizinci yazısında anlattığımız OpenID4VP de mdoc’u taşıyabilir: Spesifikasyonun mdoc eki, cevabı ISO’nun aygıt cevabı yapısıyla döner ve telefonun kanıtını, yüz yüze tanışma mesajları yerine #{raw("OpenID4VPHandover")} adlı bir yapıyı içeren bir oturum dökümü üzerine attırır \[14\]. Bu yapı doğrulayanın kimliğini, isteğin #{raw("nonce")} değerini ve cevabın gideceği adresi içerir; yani yüz yüze dünyadaki "bu işleme ve bu okuyucuya bağlılık" ilkesi internette de korunur. W3C Digital Credentials API’nin protokol kaydında da ISO\/IEC 18013-7’nin bir ekinden gelen, mdoc’a özgü bir istek türü (#{raw("org-iso-mdoc")}) yer alır \[16\].

ISO\/IEC 18013-5’in 2021 baskısında bir de #{strong[sunucudan alma]} (#{emph[server retrieval]}) yolu vardır: Okuyucu, telefondan aldığı bir belirteçle veriyi doğrudan veren makamın sunucusundan ister. Bu yol, belgenin taze olmasını sağlar; ama dizinin ilk yazısında "eve telefon etme" dediğimiz sorunu geri getirir, çünkü veren makam her doğrulamadan haberdar olur. AB’nin cüzdandan cüzdana gösterim spesifikasyonu, Bölüm 9’da göreceğimiz gibi, bu yolu açıkça yasaklar \[12\].

= Cüzdandan Cüzdana Gösterim ve Kötüye Kullanım Riskleri

== Karşınızda bir kurum değil, bir insan varsa

Şimdiye kadarki bütün örneklerde okuyucu bir kuruma aitti: bir kiralama şirketi, kolluk, bir konser organizatörü. Ama gündelik hayatta kimlik göstermenin önemli bir kısmı iki sıradan insan arasında olur. İkinci el bir araba satılırken alıcı ile satıcı birbirinin kimliğine bakar. Bir ev sahibi kiracısının kimliğini görmek ister. Bir kurye, paketi alan kişinin adını kontrol eder.

Aynur yazın kalan haftaları için Antalya’da bir öğrenci evi kiralamak ister. Ev sahibi Nurlan, kendi evini kiraya veren sıradan bir kişidir. Nurlan, Aynur’un adını ve fotoğrafını görmek ister; Aynur da Nurlan’ın gerçekten evin sahibi olduğundan, en azından kendini tanıttığı kişi olduğundan emin olmak ister. Bugün bu iş çoğu zaman bir kimlik kartının fotoğrafını çekmekle yapılır; o fotoğrafın sonra nerede durduğunu kimse bilmez.

Avrupa Birliği’nin mimari çerçevesi bu durumu #{strong[cüzdandan cüzdana etkileşim]} (#{emph[wallet-to-wallet]}) adıyla ayrı bir konu olarak ele alır ve Komisyon’un yayımladığı teknik spesifikasyonlardan biri (TS9) bu etkileşimin kurallarını tanımlar \[12, 13\]. Spesifikasyonun 1.1 sürümü 28 Mayıs 2026 tarihlidir. Temel fikri basittir: İki cüzdan arasındaki etkileşim, ISO\/IEC 18013-5’in aygıttan veri alma yöntemiyle yapılır; gösteren kişinin cüzdanı #{strong[mdoc]}, doğrulayan kişinin cüzdanı #{strong[mdoc okuyucu]} rolündedir. Yani bu yazıda anlattığımız her şey burada da geçerlidir, ama bazı ekler ve kısıtlarla.

== TS9’un kuralları

Spesifikasyonun getirdiği başlıca kurallar şunlardır \[12\]:

- #{strong[Kip bilinçli açılır.]} Cüzdan, kişiye cüzdandan cüzdana kipini açma seçeneği sunar ve kip açılmadan önce bu işlevin yalnızca güvenilen gerçek kişilerle kullanılması gerektiğini hatırlatır. Kişi kipte ya "gösteren" ya da "doğrulayan" rolünü seçer.
- #{strong[Tanışma QR ile, veri BLE ile.]} Her iki rol için QR ile tanışma ve BLE ile veri aktarımı zorunludur; NFC ve Wi-Fi Aware isteğe bağlıdır. Sunucudan alma yolu kullanılamaz.
- #{strong[Sunum teklifi.]} Gösteren kişi, isterse, hangi belgeden hangi alanları göstermeye razı olduğunu bir #{strong[sunum teklifi]} (#{emph[presentation offer]}) olarak önceden belirleyebilir. Teklif, aygıt katılımı yapısının içine, uygulamaya özgü uzantılar için ayrılmış negatif bir anahtar altında konur ve QR kodla birlikte doğrulayana ulaşır. Doğrulayan teklif varsa yalnızca onun alt kümesini isteyebilir.
- #{strong[Saklamak yok.]} Cüzdandan cüzdana istekte bütün saklama niyeti bayrakları #{raw("false")} olmak zorundadır. Doğrulayan cüzdan aldığı değerleri kimseye iletemez ve ekran görüntüsü alınmasını engellemeye çalışmalıdır.
- #{strong[Gösteren denetler.]} Teklif gönderildiyse ve gelen istek teklifin alt kümesi değilse ya da bir saklama niyeti bayrağı #{raw("true")} ise, gösterenin cüzdanı hiçbir veri göndermeden işlemi keser ve kişiye nedenini söyler.
- #{strong[İstek sınırı.]} Cüzdan sağlayıcısı, doğrulayan kipini sınırlamak zorundadır: Bir cüzdan bu kipte saatte en fazla 5, günde en fazla 20, haftada en fazla 50 sunum isteği gönderebilir.
- #{strong[Doğrulayan cüzdanın kimliği.]} 1.1 sürümünde eklenen bir kurala göre gösterenin cüzdanı, doğrulayan cüzdanın tanınmış bir sağlayıcının işlettiği, iptal edilmemiş gerçek bir cüzdan olduğunu aynı oturum içinde doğrulamak zorundadır. Ama spesifikasyon bunun teknik yönteminin henüz belirlenmediğini not eder; eşlik eden tartışma makalesi birkaç aday yöntemi karşılaştırır, ama bir seçim yapmaz.

#sekil(7, [Cüzdandan cüzdana gösterim (TS9)], "figures/a9/sekil-7.svg", yarim: false)

#kutu("teknik", [Sunum teklifinin yeri])[
TS9, sunum teklifini aygıt katılımı yapısının içine #{raw("-1")} anahtarı altında koyar. ISO\/IEC 18013-5, uygulamaya özgü uzantıların negatif anahtarlar kullanmasına izin verir ve okuyucuların tanımadıkları negatif anahtarları yok saymasını şart koşar \[1\]. Bu sayede teklifli bir QR kod, cüzdandan cüzdana kipini bilmeyen sıradan bir okuyucunun işini bozmaz. Bir örnek (CBOR metin gösterimiyle; değerler örnektir):

#kod("text", "{
  0: \"1.0\",
  1: [ 1, 24(<< EDeviceKey >>) ],
  2: [ [ 2, 1, { 0: false, 1: true, 11: h'7C1E…' } ] ],
  -1: {                                         ; sunum teklifi
    0: \"1.0\",
    1: [ { 0: \"eu.europa.ec.eudi.pid.1\",
           1: { \"eu.europa.ec.eudi.pid.1\": [\"family_name\", \"given_name\", \"portrait\"] } } ]
  }
}", baslik: "Örnek: sunum teklifli bir aygıt katılımı yapısı")

Teklif, aygıt isteğinin kısaltılmış bir hâlidir: Saklama niyeti içermez, yalnızca belge türünü, ad alanını ve alan adlarını sayar. QR koda sığması için kısa tutulmuştur.
]

== Kötüye kullanım: hangi riskler, hangi önlemler?

Kurumlar arasındaki doğrulamada kötüye kullanımı sınırlayan birçok araç vardır: kayıt, sertifika, denetim, hukuki sorumluluk. İki sıradan insan arasında bunların hiçbiri yoktur. TS9’un eki, bu boşluğu üç amaçla tarif eder: doğrulayanın kimliğinin bilinmesi, kayıtlı kurumların bu yolu kayıt dışı veri toplamak için kullanmaması ve genel olarak veri toplamanın önlenmesi \[12\]. Riskleri tek tek ele alalım.

#{strong[Kayıttan kaçan işletmeler.]} Bir kafe ya da bir dükkân, güvenen taraf olarak kayıt olmak ve okuyucu sertifikası almak yerine, bir çalışanının kişisel cüzdanını "doğrulayan" kipinde kullanmayı deneyebilir. İstek sınırı bunu anlamsız kılmak için tasarlanmıştır: Saatte beş istek, bir insanın gündelik ihtiyacına fazlasıyla yeter, ama bir dükkânın kasasına hiç yetmez. Bu sayı, teknik bir önlemle bir hukuki kuralın (kayıt zorunluluğu) arkasını kollamanın güzel bir örneğidir.

#{strong[Sahte doğrulayan ve sosyal mühendislik.]} Kötü niyetli biri kendini ev sahibi, alıcı ya da görevli olarak tanıtıp kişilerden kimlik bilgisi toplayabilir. Kipin bilinçli açılması ve ilk ekrandaki "yalnızca güvendiğiniz kişilerle" uyarısı bu riski azaltmayı amaçlar. Sunum teklifi de gösterene inisiyatif verir: Ne göstereceğine karşı taraf istemeden önce kişi kendisi karar verir.

#{strong[Sahte doğrulayan uygulaması.]} Doğrulayan cüzdanın, aldığı veriyi saklamaması ve kimseye iletmemesi gerekir. Ama bu kurala yalnızca gerçek, sertifikalı bir cüzdan uyar. Biri, kendini cüzdan gibi gösteren ama aldığı her şeyi kaydeden bir uygulama yazarsa, saklama bayrakları ve ekran görüntüsü engeli hiçbir işe yaramaz. 1.1 sürümünde eklenen "doğrulayan cüzdanın kimliği" kuralı tam bu riske karşıdır; ama yöntemi belirlenmediği sürece bu kural kâğıt üzerinde kalır. Bu, cüzdandan cüzdana gösterimin bugünkü en büyük açık sorusudur.

#{strong[Baskı ve zorlama.]} Bir kişinin, istemediği hâlde kimliğini göstermeye zorlanması teknik bir sorun değildir ve teknik bir çözümü de yoktur. Ama tasarım bazı şeyleri zorlaştırabilir: Gösteren her alanı tek tek onaylar, isteğin teklif dışına çıkmasına cüzdan izin vermez ve hiçbir veri kalıcı olarak karşı tarafta kalmaz. Fiziksel bir kimlik kartının fotokopisiyle karşılaştırıldığında, karşı tarafa daha az ve daha kısa ömürlü bilgi verilir.

#{strong[Portrenin kendisi.]} Cüzdandan cüzdana gösterimde portre çoğu zaman en çok istenen alandır; çünkü karşıdakinin gerçekten belge sahibi olduğunu ancak yüz karşılaştırmasıyla anlayabilirsiniz. Ama yüksek çözünürlüklü bir portre, başka bağlamlarda kötüye kullanılabilecek bir biyometrik veridir. Ekran görüntüsü engeli bunu sınırlamaya çalışır; ama ekranın başka bir telefonla fotoğrafının çekilmesini hiçbir yazılım önleyemez.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Cüzdandan cüzdana gösterim, ISO\/IEC 18013-5’in yüz yüze akışını iki sıradan insan arasında kullanır. AB’nin TS9 spesifikasyonu bu yola kipin bilinçli açılması, sunum teklifi, saklama yasağı ve istek sınırı gibi önlemler ekler. En önemli açık soru, doğrulayan tarafın gerçek bir cüzdan olduğunun nasıl kanıtlanacağıdır; bu soru cevaplanmadan verinin saklanmayacağı yalnızca bir söz olarak kalır.
]

= Karşılaştırma: Kâğıttan Telefona

#tablo([#{strong[Tablo 3.]} Yüz yüze kimlik göstermenin yollarının karşılaştırması.], (19fr, 20fr, 13fr, 34fr, 25fr), ([Ölçüt], [Plastik kart], [Kartın fotokopisi ya da fotoğrafı], [mdoc, yüz yüze (ISO\/IEC 18013-5)], [mdoc ya da SD-JWT VC, internet üzerinden (OpenID4VP)],), (
  ([Sahtecilik nasıl önleniyor?], [hologram, baskı güvenliği; göz kontrolü], [önlenmiyor], [veren imzası (MSO) ve kök sertifika], [veren imzası ve güven listesi],),
  ([Kopyalamaya karşı], [fiziksel taklit zorluğu], [yok], [cihaz anahtarıyla işleme özgü kanıt], [anahtar bağlama kanıtı],),
  ([Ne kadar bilgi gidiyor?], [kartın tamamı], [kartın tamamı, kalıcı olarak], [yalnızca istenen öğeler], [yalnızca istenen alanlar],),
  ([Yaş sorusu], [doğum tarihi görünür], [doğum tarihi kopyalanır], [#{raw("age_over_NN")}: yalnız evet ya da hayır], [yaş alanı ya da sıfır bilgi ispatı (dizinin 4. yazısı)],),
  ([Saklama], [göz görür, unutur], [kopya kalır], [saklama niyeti bayrağı; aksi hâlde saklanamaz], [doğrulayan kaydına ve amaca bağlı],),
  ([İnternet gerekiyor mu?], [hayır], [hayır], [hayır], [evet],),
  ([Doğrulayanın kimliği], [görevlinin üniforması], [yok], [okuyucu sertifikası (isteğe bağlı)], [imzalı istek ve sertifika],),
  ([Veren işlemden haberdar mı?], [hayır], [hayır], [hayır (sunucudan alma yolu hariç)], [hayır],),
  ([İptal bilgisi], [yok (süre dolana kadar geçerli görünür)], [yok], [kısa geçerlilik; varsa önceden yüklenmiş liste], [durum listesi],),
  ([Kişinin bilgisinden geçmeden okunabilir mi?], [evet (kart görülürse)], [evet], [hayır; QR gösterme ya da dokunma ve onay gerekir], [hayır; onay gerekir],),
))

Tablonun en dikkat çekici satırı "ne kadar bilgi gidiyor?" satırıdır. Plastik kart her gösterildiğinde üzerindeki her şeyi gösterir: Bir barmen yaşınızı kontrol ederken adresinizi de görür. Fotokopi bunu kalıcı hâle getirir. mdoc ise, dizinin üçüncü yazısında anlattığımız seçici açıklamayı yüz yüze dünyaya taşır: Kapıdaki görevli yalnızca sorduğu sorunun cevabını görür.

= Sınırlar ve Açık Sorular

#{strong[Çevrimdışı iptal.]} ISO\/IEC 18013-5’in 2021 baskısı iptal mekanizmasını kapsamı dışında bırakır ve kısa geçerlilik sürelerini önerir \[1\]. Bunun bir bedeli vardır: Geçerlilik süresi kısaldıkça telefonun belgeyi daha sık yenilemesi, yani internete daha sık bağlanması gerekir. Yüksek güvence profili HAIP, mdoc’ta iptal kullanılacaksa standardın ikinci baskısında tanımlanan mekanizmalardan birinin kullanılmasını ister \[15\]; dizinin yedinci yazısında anlattığımız durum listeleri de mdoc için kullanılabilir. Ama okuyucu çevrimdışıysa, ancak en son indirdiği listeye göre karar verebilir. Bir belgenin iptal edildiği an ile bir yol kenarındaki okuyucunun bunu öğrendiği an arasında her zaman bir boşluk kalacaktır.

#{strong[Saat.]} Geçerlilik kontrolü, okuyucunun saatinin doğru olmasına dayanır. İnternete hiç bağlanmayan bir okuyucunun saati kayabilir. Bu küçük görünen sorun, kısa geçerlilik süreleri tercih edildikçe büyür.

#{strong[İnsan gözü.]} Yüz yüze doğrulamanın son halkası, ekrandaki portre ile karşıdaki yüzün karşılaştırılmasıdır. İnsanların tanımadıkları yüzleri eşleştirmekte sanıldığı kadar iyi olmadığı bilinen bir gerçektir. Bu halkayı bir yazılıma bırakmak ise başka sorular doğurur: yanlış eşleşmeler, demografik gruplar arasında farklı hata oranları ve biyometrik verinin işlenmesi. Dizinin on dördüncü yazısı bu konuya ayrıldı.

#{strong[Okuyucu altyapısı.]} Okuyucu kimlik doğrulamasının isteğe bağlı olması, sahada çoğu okuyucunun kimliğini kanıtlamayacağı anlamına gelebilir. Kayıtlı güvenen taraflara sertifika veren bir altyapının küçük işletmelere kadar yayılması zaman alacak. O zamana kadar kişinin, kimliği doğrulanmamış bir okuyucu karşısında ne yapacağına dair sezgisi, teknik güvencenin yerini tutmak zorunda kalıyor.

#{strong[Birlikte çalışabilirlik.]} Bluetooth’un farklı telefonlarda ve işletim sistemlerinde farklı davranması, sahadaki en yaygın sorunlardan biridir. Standart da, mobil cihazlardaki tarama ve önbellek davranışlarının bağlantı süresini etkileyebileceğini not eder \[1\]. Bir kapıda saniyeler önemli olduğunda, kâğıt üzerindeki uyum ile gerçek hayattaki hız arasındaki fark büyüyebilir.

#{strong[Telefonun kendisi.]} Şarjı biten, bozulan ya da kaybolan bir telefon, kişiyi kimliksiz bırakmamalıdır. Bu yüzden yakın gelecekte mobil belgeler plastik kartların yanında yaşayacak, onların yerini almayacak. Telefonun güvenli donanımı, cihaz kaybı ve yedekleme konuları dizinin onuncu yazısında ele alınıyor.

#{strong[Cüzdandan cüzdana gösterimin açık sorusu.]} Bölüm 9’da gördüğümüz gibi, doğrulayan cüzdanın gerçek olduğunun nasıl kanıtlanacağı henüz belirlenmedi. Bu soru cevaplanmadan, saklama yasağı ve ekran görüntüsü engeli yalnızca dürüst uygulamaları bağlar.

#{strong[AB dışındaki okuyucular ve verenler.]} Bir Avrupa cüzdanı, kimliği AB’nin güven altyapısında tanımlı olmayan bir okuyucuyu nasıl değerlendirecek? Bir Avrupa okuyucusu, AB dışındaki bir ülkenin verdiği bir mobil ehliyete nasıl güvenecek? Bu soruların cevabı teknik değil; kök sertifikaların ve güven listelerinin hangi anlaşmalarla, kim tarafından dağıtılacağına bağlı.

= Tamga Network Bu Konuda Nerede?

Tamga Network, Türkiye ve Türk dünyası için AB’nin eIDAS 2.0 ve EUDI profilleri üzerine kurulmuş, kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır. Ağın açık kaynak #{raw("@tamga-network")} paketleri arasında ISO\/IEC 18013-5 mdoc biçimi için bir paket vardır; paket mdoc belgelerinin CBOR ve COSE yapılarını, belge vermeyi ve doğrulamayı kapsar. Kod ve belgeler herkese açıktır.

Bu yazının Bölüm 7’deki sorusu, yani okuyucunun veren kurumun kök sertifikasını nereden alacağı, Tamga Network’ün asıl iş alanına denk düşer. Ağ, belge veren kurumların ve cüzdanların kim olduğunu söyleyen imzalı güven listeleri yayımlar; bu listelerde hiçbir kişisel veri yer almaz. Çevrimdışı çalışan bir okuyucu için böyle bir liste, önceden yüklenip yerel olarak kullanılabilecek bir güven kaynağıdır. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayanları listeler.

= Sonuç

Yüz yüze kimlik göstermek insanlık tarihi kadar eskidir; değişen, gösterilen şeyin kendisi. Bu yazıda bir telefonun, sinyalin çekmediği bir yol kenarında, birbirini hiç tanımayan bir okuyucuya birkaç saniyede nasıl güvenilir bir belge gösterebildiğini adım adım izledik. ISO\/IEC 18013-5’in cevabı üç katmanlıdır. Telefon ile okuyucu kısa menzilli bir kanalda (QR ya da NFC) tanışır ve geçici anahtarlarını orada değiş tokuş eder. Bu anahtarlardan, tanışmanın her baytına bağlı oturum anahtarları türetilir ve asıl veri daha uzun menzilli bir kanalda (çoğu zaman Bluetooth) şifreli olarak akar. Gösterilen belge iki imza taşır: veren kurumun, belgenin içeriğini güvenceye alan imzası ve telefonun, bu işleme ve bu okuyucuya bağlı kanıtı.

Bu tasarımın en değerli yanı belki de seçici açıklamayı yüz yüze dünyaya taşımasıdır. Konser kapısındaki görevli yalnızca "evet" görür; araç kiralama şirketi neyi saklayacağını önceden söylemek zorundadır; trafik kontrolünde bile veren kurum işlemden habersiz kalır. Plastik kartın ve fotokopinin her seferinde her şeyi gösteren dünyasına göre bu büyük bir adımdır.

Ama yazının son bölümleri, teknik olarak zarif bir sistemin bile insanlara ve kurumlara bağlı kaldığını gösterdi. Okuyucunun kimliğini kanıtlaması isteğe bağlıdır; iptal bilgisi çevrimdışı dünyada hep biraz gecikir; cüzdandan cüzdana gösterimde verinin saklanmayacağı ancak karşı tarafın dürüstlüğüne ya da henüz belirlenmemiş bir kanıta dayanır. Dizinin ilk yazısında söylediğimiz cümle burada da geçerli: Teknoloji bir imzanın sahte olmadığını kanıtlayabilir; karşımızdakinin o bilgiyi istemeye hakkı olup olmadığına ise ortak kurallarımız karar verir. Dizinin bir sonraki yazısında, bütün bu güvencenin dayandığı yere, telefonun içindeki anahtara ve o telefonun gerçek olup olmadığı sorusuna bakacağız.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]} Eylül 2021.]

#kaynak("2")[ISO\/IEC (2025). #{emph[ISO\/IEC TS 18013-7:2025 Personal identification — ISO-compliant driving licence — Part 7: Mobile driving licence (mDL) add-on functions.]} İkinci baskı, Mayıs 2025.]

#kaynak("3")[ISO\/IEC (2026). #{emph[ISO\/IEC DIS 18013-5 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application]} (ikinci baskı taslağı; ISO proje 91081). Taslak oylamasının kapanışı 27 Mart 2026.]

#kaynak("4")[Transportation Security Administration (2024). Mobil ehliyetlerin havalimanı güvenlik noktalarında kabul edilmeye devam etmesini sağlayan nihai kurala ilişkin basın açıklaması. tsa.gov, 24 Ekim 2024.]

#kaynak("5")[American Association of Motor Vehicle Administrators (2024). "AAMVA’s Mobile Driver License Digital Trust Service is Now Live." aamva.org, 15 Nisan 2024.]

#kaynak("6")[NFC Forum. #{emph[Connection Handover (CH) Technical Specification]}, sürüm 1.5.]

#kaynak("7")[Bluetooth SIG. #{emph[Bluetooth Core Specification]} (Bluetooth Low Energy bölümleri). bluetooth.com.]

#kaynak("8")[Krawczyk, H. ve Eronen, P. (2010). #{emph[HMAC-based Extract-and-Expand Key Derivation Function (HKDF).]} IETF RFC 5869.]

#kaynak("9")[Bormann, C. ve Hoffman, P. (2020). #{emph[Concise Binary Object Representation (CBOR).]} IETF RFC 8949.]

#kaynak("10")[Schaad, J. (2017). #{emph[CBOR Object Signing and Encryption (COSE).]} IETF RFC 8152.]

#kaynak("11")[Dworkin, M. (2007). #{emph[Recommendation for Block Cipher Modes of Operation: Galois\/Counter Mode (GCM) and GMAC.]} NIST Special Publication 800-38D.]

#kaynak("12")[Avrupa Komisyonu (2026). #{emph[Specification of Wallet to Wallet interactions]} (TS9), sürüm 1.1, 28 Mayıs 2026. github.com\/eu-digital-identity-wallet\/eudi-doc-standards-and-technical-specifications (CC BY 4.0).]

#kaynak("13")[Avrupa Komisyonu ve eIDAS Uzman Grubu. #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF).]} github.com\/eu-digital-identity-wallet (yaşayan belge; cüzdandan cüzdana etkileşimler konusu).]

#kaynak("14")[Terbu, O., Lodderstedt, T., Yasuda, K., Fett, D. ve Heenan, J. (2025). #{emph[OpenID for Verifiable Presentations 1.0.]} OpenID Foundation, nihai spesifikasyon, 9 Temmuz 2025 (Ek B.2: ISO mdoc).]

#kaynak("15")[Yasuda, K., Lodderstedt, T., Bormann, C. ve Heenan, J. (2025). #{emph[OpenID4VC High Assurance Interoperability Profile 1.0.]} OpenID Foundation, nihai spesifikasyon, 24 Aralık 2025.]

#kaynak("16")[Caceres, M., Cappalli, T. ve Yosef, M. A. (Ed.) (2026). #{emph[Digital Credentials.]} W3C Working Draft, Federated Identity Working Group, 29 Ekim 2026.]

#kaynak("17")[ETSI (2026). #{emph[ETSI TS 119 472-2 V1.2.1: Electronic Signatures and Trust Infrastructures (ESI); Profiles for Electronic Attestation of Attributes; Part 2: Profiles for EAA\/PID Presentations to Relying Party.]} Mart 2026.]

#kaynak("18")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[ISO\/IEC 18013-5:2021, Bölüm 6.3 ("Security mechanisms") ve Bölüm 9.]} Standardın güvenlik hedeflerini (sahteciliğe, kopyalamaya, dinlemeye ve yetkisiz erişime karşı koruma) ve bunları sağlayan mekanizmaları sade bir dille özetler.
+ #{strong[ISO\/IEC 18013-5:2021, Ek D.]} Aygıt katılımından cevaba kadar bütün yapıların gerçek bayt örnekleri; bir uygulamayı adım adım izlemek isteyenler için.
+ #{strong[TS9, "Specification of Wallet to Wallet interactions" (sürüm 1.1).]} Kısa ve okunaklı; cüzdandan cüzdana gösterimin kurallarını ve Ek A’daki kötüye kullanım tartışmasını içerir.
+ #{strong[OpenID4VP 1.0, Ek B.2.]} Aynı mdoc’un internet üzerinden nasıl gösterildiğini ve oturum dökümünün nasıl uyarlandığını gösterir.
+ #{strong[AAMVA’nın mobil ehliyet uygulama kılavuzu ve güven hizmeti sayfaları.]} Standardın sahada nasıl işletildiğine, kök sertifikaların nasıl dağıtıldığına dair pratik bir bakış.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. İngilizce karşılıkları başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (14fr, 23fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Aygıt cevabı], [DeviceResponse], [Telefonun okuyucuya gönderdiği, belgeleri ve kanıtları taşıyan yapı],),
  ([Aygıt isteği], [DeviceRequest], [Okuyucunun hangi öğeleri istediğini ve hangilerini saklayacağını söyleyen yapı],),
  ([Aygıt katılımı], [device engagement], [Telefonun okuyucuyla QR ya da NFC üzerinden tanışması],),
  ([Bağlantı devri], [connection handover], [NFC ile tanışmada veri yolunun belirlendiği NFC Forum yöntemi],),
  ([BLE], [Bluetooth Low Energy], [Düşük enerjili Bluetooth; yüz yüze veri aktarımının ana yolu],),
  ([CBOR], [Concise Binary Object Representation], [JSON’a benzeyen ama ikili ve daha kısa veri kodlaması],),
  ([COSE], [CBOR Object Signing and Encryption], [CBOR verisini imzalama ve şifreleme biçimi],),
  ([Cüzdandan cüzdana], [wallet-to-wallet (W2W)], [İki kişinin cüzdanları arasında belge gösterimi],),
  ([ECDH], [Elliptic Curve Diffie-Hellman], [İki tarafın gizli bilgi göndermeden ortak sır hesaplaması],),
  ([Geçici anahtar], [ephemeral key], [Yalnızca bir işlem için üretilip sonra silinen anahtar],),
  ([HKDF], [HMAC-based Key Derivation Function], [Bir sırdan amaçlara göre ayrı anahtarlar türeten fonksiyon],),
  ([IACA], [Issuing Authority Certificate Authority], [Veren makamın kök sertifika otoritesi],),
  ([mdoc], [mobile document], [ISO\/IEC 18013-5’in tanımladığı mobil belge biçimi],),
  ([mdoc okuyucu], [mdoc reader], [Belgeyi telefondan okuyan cihaz],),
  ([MAC], [message authentication code], [Paylaşılan bir anahtarla üretilen, üçüncü kişiye kanıt olmayan doğrulama kodu],),
  ([Mobil ehliyet], [mobile driving licence (mDL)], [Telefonda taşınan ehliyet],),
  ([Mobil güvenlik nesnesi], [mobile security object (MSO)], [Öğe özetlerini, cihaz anahtarını ve geçerliliği taşıyan, verenin imzaladığı yapı],),
  ([NFC], [Near Field Communication], [Birkaç santimetrelik menzilli temassız iletişim],),
  ([Okuyucu kimlik doğrulaması], [mdoc reader authentication], [Okuyucunun isteğini sertifikalı anahtarıyla imzalayarak kendini tanıtması],),
  ([Oturum dökümü], [session transcript], [Tanışma mesajlarını ve okuyucunun geçici anahtarını içeren, imzaların bağlandığı yapı],),
  ([Saklama niyeti], [intent to retain], [Okuyucunun bir öğeyi işlemden sonra saklayıp saklamayacağını bildiren bayrak],),
  ([Sunucudan alma], [server retrieval], [Okuyucunun veriyi veren makamın sunucusundan istediği yol],),
  ([Sunum teklifi], [presentation offer], [Gösterenin önceden belirlediği, göstermeye razı olduğu alanlar],),
  ([VICAL], [Verified Issuer Certificate Authority List], [Güvenilen veren makamların kök sertifikalarının imzalı listesi],),
  ([Yaş onayı öğesi], [age attestation (age\_over\_NN)], [Kişinin belirli bir yaşın üstünde olup olmadığını söyleyen öğe],),
))

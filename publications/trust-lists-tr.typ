// A6 — Kime Güveniyoruz?. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Kime Güveniyoruz?",
  altbaslik: "Güven Listeleri ve Dijital Güven Altyapısı",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Aralık 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("güven listesi", "açık anahtar altyapısı", "sertifika otoritesi", "LOTL", "ETSI TS 119 612", "ETSI TS 119 602", "güvenen taraf kaydı", "eIDAS 2.0", "EUDI cüzdanı", "güven çapası",),
  atif: "Karataş, B. (2026). Kime Güveniyoruz?: Güven Listeleri ve Dijital Güven Altyapısı. Tamga Network Akademik Çalışmalar, A6. https://tamga.network/files/publications/trust-lists-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Dijital bir belgenin altındaki imza, belgenin değiştirilmediğini ve belirli bir anahtarla imzalandığını kesin olarak kanıtlar. Ama o anahtarın kime ait olduğunu, sahibinin o belgeyi vermeye yetkili olup olmadığını ve bugün hâlâ yetkili sayılıp sayılmadığını söylemez. Bu üç soru, dijital kimliğin en az konuşulan ama en çok iş gören katmanını oluşturur: güven altyapısını. Bu yazı, hiçbir ön bilgi varsaymadan bu katmanı anlatıyor. Önce açık anahtar altyapısının ve sertifika otoritelerinin nasıl doğduğunu, web’deki modelin neden "en zayıf halka kadar güçlü" olduğunu gösteriyoruz. Sonra Avrupa Birliği’nin 2009’dan bu yana kurduğu farklı yola, imzalı güven listelerine, listelerin listesine (LOTL) ve onu Resmî Gazete’ye bağlayan zincire geçiyoruz.

Teknik kısmı da atlamıyoruz: bir X.509 sertifikasının içini, ETSI TS 119 612 güven listesinin XML yapısını, yeni ETSI TS 119 602 "güvenilen kuruluş listeleri" biçimini ve AB dijital kimlik cüzdanında güvenen tarafların nasıl kayıt edilip sertifikalandırıldığını örnek verilerle açıklıyoruz. Doğrulayıcının internete çıkmadan "bu kurum gerçek ve yetkili mi?" sorusunu nasıl cevapladığını adım adım izliyoruz. Yazının sonunda farklı güven modellerini yan yana koyuyor, listeyi işletenin gücünü ve bu gücün nasıl sınırlandığını tartışıyor ve Tamga Network’ün bu tablodaki yerini kısaca anlatıyoruz.
  ],
)

= Giriş: İmza Doğru, Peki İmzalayan Kim?

İstanbul’daki bir üniversitenin lisansüstü kabul ofisinde Timur adında bir görevli çalışıyor. Önündeki ekranda, dizinin önceki yazılarından tanıdığımız Aynur’un başvurusu duruyor. Aynur bu kez diplomasını taranmış bir PDF yerine, telefonundaki cüzdandan imzalı bir dijital belge olarak gönderdi. Ofisin doğrulama yazılımı belgeyi açıyor ve yeşil bir işaret gösteriyor: "İmza geçerli."

Timur bir an duraksıyor. Yazılım neyi kontrol etti? Belgenin içeriğinin, imzalandığı andan beri tek bir harfinin bile değişmediğini. Bir de imzanın, belgenin içinde ya da yanında gelen bir açık anahtarla uyuştuğunu. Ama o anahtarın gerçekten Bakü’deki üniversiteye ait olduğunu nereden biliyoruz? Herhangi biri bir anahtar çifti üretip belgeye "Bakü Devlet Üniversitesi" yazabilir ve imzalayabilir. İmza yine matematiksel olarak geçerli olur. Yeşil işaret yine yanar.

Bu yazının sorusu bu duraksamadan doğuyor. Dizinin ilk yazısında fiziksel dünyadaki güvenin üç dayanağı olduğunu söylemiştik: belgeyi taklit etmenin zorluğu, işlemin yüz yüze yapılması ve belgeyi verenin herkesçe tanınması. Dijital imza birinci dayanağı matematikle kurar; ikinci yazıda gördüğümüz sahip bağlama da ikinciyi. Üçüncü dayanak, yani #{strong[tanınan veren]}, ne imzanın ne de belgenin içinden gelebilir. Onu dışarıdan, herkesin üzerinde anlaştığı bir kaynaktan almak gerekir. Bu kaynağa #{strong[güven altyapısı]} diyoruz; Avrupa’daki en olgun biçimine ise #{strong[güven listesi]} (#{emph[trusted list]}).

#sekil(1, [Bir imzayı kabul etmek için sorulan iki ayrı soru], "figures/a6/sekil-1.svg", yarim: false)

Bu yazıda güven altyapısının nasıl kurulduğunu sıfırdan anlatıyoruz. Bölüm 2’de imzanın doğru olmasıyla imzalayanın yetkili olmasının neden ayrı sorular olduğunu açıyoruz. Bölüm 3, bugün internette her gün kullandığımız açık anahtar altyapısını ve sertifika otoritelerini, güçlü ve zayıf yanlarıyla anlatıyor. Bölüm 4 Avrupa Birliği’nin güven listelerine, Bölüm 5 bu listelerin teknik biçimlerine (ETSI TS 119 612 ve TS 119 602) ayrılmış durumda. Bölüm 6 AB dijital kimlik cüzdanının güven modelini ve güvenen tarafların kaydını, Bölüm 7 doğrulayıcının internete çıkmadan nasıl karar verdiğini anlatıyor. Bölüm 8 farklı güven modellerini karşılaştırıyor, Bölüm 9 liste işletmecisinin gücünü ve sınırlarını tartışıyor. Bölüm 10 açık soruları, Bölüm 11 Tamga Network’ün yerini anlatıyor. Ek A’da yazıda geçen terimlerin sözlüğü var.

= İmzanın Doğru Olması ile İmzalayanın Yetkili Olması

== Bir mühür ve onun kaydı

Dizinin ilk yazısında açık anahtarlı kriptografiyi bir mühre benzetmiştik. Gizli anahtar mühürdür; yalnızca sahibi onunla mühür basabilir. Açık anahtar ise o mührün herkesin elinde bulunan bir örneğidir; bir belgedeki izi bu örnekle karşılaştırıp mührün gerçek olup olmadığını anlarız. Bu benzetmenin atladığı bir ayrıntı var. Elinizdeki örneğin #{strong[hangi mühre ait olduğunu]} kim söyledi?

Osmanlı döneminde resmî yazışmalarda kullanılan mühürlerin örnekleri, yazışmanın yapıldığı makamlarda saklanırdı. Gelen bir yazının mührü kuşkulu görünürse o kayıtlara bakılırdı. Bugün de noterler, bankalar ve kamu kurumları yetkili imzaların "imza sirküleri"ni saklar. Bir şirket adına imza atan kişinin o yetkiye sahip olup olmadığı, ticaret sicilinde yayımlanmış bir kayıtla anlaşılır. Yani fiziksel dünyada da imzanın kendisi yetmez; imzanın sahibini ve yetkisini gösteren, imzadan bağımsız #{strong[bir kayıt]} gerekir.

Dijital dünyada da durum aynıdır. Doğrulama yazılımının yaptığı hesap, yalnızca şunu söyler: "Bu imza, bu belge için, bu açık anahtarın eşi olan gizli anahtarla üretilmiştir." Hesap, açık anahtarın kime ait olduğu hakkında tek bir bit bilgi üretmez.

#kutu("teknik", [İmza doğrulamanın gerçekte cevapladığı soru])[
Bir ECDSA imzasını doğrulayan fonksiyonun girdisi üç şeydir: imzalanan veri, imza ve bir açık anahtar. Çıktısı tek bir evet ya da hayırdır. Basitleştirilmiş hâliyle:

#formul[$ "doğrula"("veri", "imza", "açık anahtar") -> {"evet", "hayır"} $]

Fonksiyonun içinde "Bakü", "üniversite" ya da "diploma" diye bir kavram yoktur. Açık anahtar, eliptik eğri üzerinde bir noktadır, yani iki büyük sayıdan ($x$ ve $y$ koordinatları) ibarettir. P-256 eğrisinde her koordinat 256 bitlik bir sayıdır; anahtarın boyu şöyle bulunur:

#formul[$ "açık anahtar" = (x, y), quad 256 "bit" = 32 "bayt", quad 2 dot 32 "bayt" = 64 "bayt" $]

Bu 64 baytlık değeri kimin ürettiğini fonksiyon bilemez; girdide sahibinin adı yoktur, yalnızca iki sayı vardır. Bu yüzden saldırgan imzayı kırmaya uğraşmaz; doğrulayıcıya #{strong[kendi açık anahtarını]} doğru anahtarmış gibi kabul ettirmeye çalışır. Kriptografi literatüründe buna "anahtar yerine koyma" (#{emph[key substitution]}) ya da genel adıyla ortadaki adam saldırısı denir. Güven altyapısının bütün işi, bu yerine koymayı engellemektir.
]

== "Kim?" sorusunun üç katmanı

Timur’un duraksamasını biraz daha açarsak, aslında üç ayrı soru sorduğunu görürüz:

+ #{strong[Kimlik:]} Bu açık anahtar hangi kuruma ait? Anahtar ile "Bakü Devlet Üniversitesi" adı arasındaki bağı kim kurdu?
+ #{strong[Yetki:]} Bu kurum bu tür belgeyi vermeye yetkili mi? Bir üniversitenin diploma vermesi doğaldır; aynı üniversitenin ehliyet vermesi ise değildir. Bir kurumun gerçek olması, her belgeyi verebileceği anlamına gelmez.
+ #{strong[Durum:]} Bu kurum, belgenin verildiği anda ve bugün hâlâ yetkili mi? Kurumun anahtarı çalınmış, kurum kapanmış, yetkisi geri alınmış olabilir.

Bu üç katman, bu yazının iskeletini oluşturuyor. Göreceğimiz her güven modeli bu sorulara farklı cevaplar verir. Web’deki sertifika sistemi birinci soruya oldukça iyi, ikinci soruya ise yalnızca dar bir anlamda cevap verir. Avrupa’nın güven listeleri üçünü birlikte cevaplamak için tasarlanmıştır. Durum sorusunun bir kısmı, yani tek tek belgelerin iptali, dizinin yedinci yazısının konusu. Bu yazıda yalnızca #{strong[kurumun]} durumuyla ilgileniyoruz.

== Güven çapası: bir yerden başlamak zorundayız

Her güven zinciri bir yerde durmak zorundadır. "Bu anahtar Bakü’deki üniversitenin" diyen bir kayda güvenmek için, o kaydı imzalayana güvenmemiz gerekir. Onu imzalayana güvenmek için de bir başkasına. Bu soru sonsuza kadar geriye gidemez. Bir noktada doğrulayıcı, başka hiçbir şeye dayanmadan, #{strong[önceden ve doğrudan]} güvendiği bir anahtarı kabul eder. Bu anahtara #{strong[güven çapası]} (#{emph[trust anchor]}) denir.

Güven çapası, gemideki çapa gibi her şeyin bağlandığı sabit noktadır. Bilgisayarınızdaki tarayıcının içinde yüzü aşkın güven çapası gömülü gelir; bunlara kök sertifikalar denir. Avrupa’daki güven listesi sisteminde ise çapa, Avrupa Birliği Resmî Gazetesi’nde yayımlanan birkaç sertifikadır. Hangi çapanın seçildiği, bütün sistemin kime güvendiğini belirler. Bu yazı boyunca her modelde "çapa nerede?" diye soracağız.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
İmza doğrulama yalnızca "bu belge bu anahtarla imzalanmış ve değişmemiş" der. Anahtarın kime ait olduğu, sahibinin bu belgeyi vermeye yetkili olup olmadığı ve bugün hâlâ yetkili sayılıp sayılmadığı, imzanın dışından gelen bir kayıtla öğrenilir. Bu kayıtların hepsi sonunda doğrulayıcının önceden güvendiği bir noktaya, #{strong[güven çapasına]} bağlanır.
]

= Açık Anahtar Altyapısı ve Sertifika Otoriteleri

== Bir lisans tezinden doğan fikir

Açık anahtarlı kriptografi 1976’da Whitfield Diffie ve Martin Hellman’ın yayımladığı makaleyle kamuoyuna duyuruldu \[1\]. Makale, iki kişinin daha önce hiç buluşmadan güvenli biçimde haberleşebileceğini gösteriyordu. Ama hemen bir sorun doğdu: Ayşe, Mehmet’in açık anahtarını nereden alacaktı? Diffie ve Hellman, bütün açık anahtarların bir telefon rehberi gibi tek bir "açık dosyada" toplanmasını önermişti. Bu dosyayı işleten merkez, her sorguda çevrimiçi olmak ve her cevabı imzalamak zorunda kalacaktı.

1978’de MIT’de lisans öğrencisi olan Loren Kohnfelder, bitirme tezinde daha zarif bir çözüm önerdi \[2\]. Rehberin her satırını ayrı ayrı imzalayıp kişinin kendisine verelim, dedi. Böylece Ayşe, Mehmet’in açık anahtarını rehbere sormadan, doğrudan Mehmet’ten alabilir; satırın üzerindeki imza, bilginin rehberden geldiğini kanıtlar. Kohnfelder bu imzalı satırlara #{strong[sertifika]} (#{emph[certificate]}) adını verdi. Bugün internetteki neredeyse her güvenli bağlantı bu fikrin üzerinde durur.

Sertifikanın getirdiği yenilik, güveni #{strong[çevrimdışı taşınabilir]} hâle getirmesidir. Rehberi işleten merkez yalnızca sertifikayı verirken çevrimiçi olmalıdır. Sonrasında sertifika, imzalı bir belge gibi elden ele dolaşır ve herkes onu merkeze sormadan doğrulayabilir. Bu düşünce, dizinin ilk yazısında anlattığımız üçgen modelin, yani doğrulayıcının verene sormadan karar vermesinin, anahtarlar düzeyindeki karşılığıdır.

== Bir X.509 sertifikasının içi

Kohnfelder’in fikri, 1988’de Uluslararası Telekomünikasyon Birliği’nin (ITU-T, o zamanki adıyla CCITT) X.509 tavsiyesiyle standart bir biçime kavuştu. X.509 bugün de sertifikaların ortak dilidir; internette kullanılan ayrıntılı profili IETF’in RFC 5280 belgesinde tanımlanır \[3\]. Bir sertifikayı, bir otoritenin "şu açık anahtar şu kişiye ya da kuruma aittir" cümlesini imzaladığı bir belge olarak düşünebiliriz.

#kutu("teknik", [X.509 sertifikasının başlıca alanları])[
Bir sertifika, bilgisayarda ikili (DER) biçimde saklanır. İnsanın okuyabileceği biçime çevrildiğinde şuna benzer (değerler örnektir, kısaltılmıştır):

#kod("text", "Sürüm:            3
Seri numarası:    4f:1a:9c:…
İmza algoritması: ecdsa-with-SHA256
Veren (Issuer):   C=AZ, O=Örnek Güven Hizmetleri, CN=Örnek Ara Sertifika Makamı
Geçerlilik:       2026-01-15 → 2029-01-14
Konu (Subject):   C=AZ, O=Bakü Devlet Üniversitesi (örnek), CN=Diploma İmza Anahtarı
Konunun açık anahtarı: EC P-256, 04:7b:d2:…
Uzantılar:
  Temel kısıtlar:         CA=false
  Anahtar kullanımı:      dijital imza
  CRL dağıtım noktası:    http://crl.ornek.az/ara.crl
  Yetkili erişim bilgisi: http://ocsp.ornek.az
İmza:             30:45:02:21:…  (verenin gizli anahtarıyla)", baslik: "Örnek: okunur biçime çevrilmiş bir diploma imza sertifikası")

- #{strong[Veren]} ve #{strong[Konu]} alanları, sertifikayı kimin imzaladığını ve kimin hakkında olduğunu ayırt edici adlarla (#{emph[distinguished name]}) yazar: ülke (C), kurum (O), ortak ad (CN).
- #{strong[Geçerlilik]} süresinin dışında sertifika kabul edilmez.
- #{strong[Temel kısıtlar]} uzantısındaki #{raw("CA=false")}, bu anahtarın başka sertifika imzalayamayacağını söyler. Bir ara makamın sertifikasında burada #{raw("CA=true")} yazar.
- #{strong[Anahtar kullanımı]} uzantısı, anahtarın ne için kullanılabileceğini sınırlar.
- #{strong[CRL dağıtım noktası]} ve #{strong[yetkili erişim bilgisi]}, sertifikanın iptal edilip edilmediğinin nereden öğrenileceğini gösterir. Bu mekanizmaları dizinin yedinci yazısında ayrıntılı ele alıyoruz.

En sondaki imza, bütün bu alanların verenin gizli anahtarıyla imzalanmış hâlidir. Sertifikayı doğrulamak için verenin açık anahtarına, onu bulmak için de verenin sertifikasına ihtiyaç vardır.
]

== Zincir ve kök

Son cümle bizi yine geriye gidişe götürüyor. Sertifikayı doğrulamak için verenin sertifikası gerekir; onu doğrulamak için de onu verenin. Bu yüzden sertifikalar #{strong[zincir]} hâlinde gelir (Şekil 2). En altta, kullanılan anahtarın sertifikası durur; buna #{strong[yaprak]} sertifika denir. Onun üstünde bir ya da birkaç #{strong[ara]} sertifika, en üstte ise #{strong[kök]} sertifika vardır. Kök sertifika kendi kendini imzalar. İçindeki imza hiçbir şey kanıtlamaz; kökün değeri, doğrulayıcının onu önceden ve doğrudan güvendiği listeye koymuş olmasından gelir. Kök, Bölüm 2.3’te tanımladığımız güven çapasıdır.

#sekil(2, [Sertifika zinciri: yapraktan güven çapasına], "figures/a6/sekil-2.svg", yarim: false)

Doğrulama, zinciri aşağıdan yukarıya doğru izlemekle yapılır. Doğrulayıcı önce belgenin imzasını yaprak sertifikadaki anahtarla, sonra yaprak sertifikanın imzasını ara sertifikadaki anahtarla, sonra ara sertifikanın imzasını kökün anahtarıyla kontrol eder. Her adımda geçerlilik süresine, #{raw("CA=true")} kısıtına ve anahtar kullanımı uzantısına bakar. En sonunda kökün kendi güven deposunda olup olmadığına bakar. Depoda yoksa zincirin geri kalanının ne kadar düzgün olduğu önemli değildir; belge kabul edilmez.

Bu yapının ilginç bir sonucu vardır: Zincir, güveni #{strong[devreder]}. Kök sertifika makamı bir ara makama #{raw("CA=true")} yazılı bir sertifika verdiğinde, ona "benim adıma sertifika imzalayabilirsin" demiş olur. Ara makam da başka bir ara makama aynı yetkiyi verebilir. Bu devir zinciri ne kadar uzarsa, doğrulayıcının sonunda kime güvendiğini bilmesi o kadar zorlaşır.

== Web’deki model: tarayıcının kök deposu

Bugün en büyük açık anahtar altyapısı, web sitelerine bağlanırken kullandığımız sistemdir. Tarayıcının adres çubuğundaki kilit simgesinin arkasında bir sertifika zinciri vardır. Siteye bağlandığınızda site, kendi sertifikasını ve ara sertifikaları gönderir; tarayıcınız zinciri kendi kök deposuna kadar izler.

Bu depoyu kim doldurur? İşletim sistemi ve tarayıcı üreticileri. Her büyük üreticinin bir #{strong[kök programı]} vardır: Sertifika otoriteleri (#{emph[certificate authority]}, CA) bu programlara başvurur, bağımsız denetim raporlarını sunar ve kabul edilirlerse kök sertifikaları milyarlarca cihaza dağıtılır. 2005’te kurulan #{strong[CA\/Tarayıcı Forumu]} (#{emph[CA\/Browser Forum]}), sertifika otoriteleriyle tarayıcı üreticilerinin ortak kurallarını belirler. Forumun "Temel Gereksinimler" (#{emph[Baseline Requirements]}) belgesi, bir sertifika otoritesinin bir site için sertifika vermeden önce neleri kontrol etmesi gerektiğini tanımlar \[4\].

Bu modelin en dikkat çekici özelliği, #{strong[kapsam sınırının olmamasıdır]}. Kök depodaki her sertifika otoritesi, ilke olarak, dünyadaki #{strong[her alan adı]} için sertifika verebilir. Türkiye’deki bir sertifika otoritesi bir Japon bankasının sitesi için, Brezilya’daki bir otorite bir Alman üniversitesinin sitesi için sertifika üretebilir; tarayıcı ikisini de kabul eder. Bu, sistemin dünya çapında ölçeklenmesini sağlayan esnekliktir. Ama aynı esneklik, sistemin güvenliğini #{strong[en zayıf sertifika otoritesinin]} güvenliğine eşitler.

#sekil(3, [Web modelinde her kök, her alan adı için imza atabilir], "figures/a6/sekil-3.svg", yarim: false)

#kutu("tarihce", [DigiNotar: en zayıf halka koptuğunda])[
DigiNotar, Hollanda’da faaliyet gösteren ve Hollanda devletinin kendi sertifika altyapısında da yer alan bir sertifika otoritesiydi. 2011 yazında saldırganlar şirketin sistemlerine girdi. 10 Temmuz 2011’de bu sistemlerden, Google’ın bütün alt alan adlarını kapsayan sahte bir sertifika üretildi. Sertifika DigiNotar’ın gerçek anahtarıyla imzalandığı için bütün tarayıcılarda geçerli görünüyordu. Ağustos sonunda İran’daki kullanıcıların Google hizmetlerine bağlanırken bu sertifikayla karşılaştığı fark edildi; yani trafikleri araya giren biri tarafından okunuyordu. Sonradan yapılan incelemeye göre DigiNotar’ın sertifika durumu sorgularını karşılayan sunucusuna, sahte Google sertifikası için yaklaşık 300.000 farklı IP adresinden sorgu gelmişti ve bu adreslerin çok büyük kısmı İran’daydı. Saldırganların ürettiği sahte sertifika sayısı 500’ü aşıyordu \[5\]. Tarayıcı üreticileri DigiNotar’ın köklerini depolarından çıkardı, Hollanda hükümeti şirketin sistemlerinin yönetimini devraldı ve şirket Eylül 2011’de iflas etti.

Olayın dersi, sahte sertifikanın #{strong[teknik olarak eksiksiz]} olmasıydı. İmza doğruydu, zincir sağlamdı, kök depodaydı. Sistem, Google ile hiçbir ilişkisi olmayan bir Hollanda şirketinin Google adına konuşmasını engelleyecek bir kural içermiyordu.
]

== Onarımlar: şeffaflık günlükleri ve daha kısa ömürler

DigiNotar ve benzeri olaylardan sonra web’in sertifika sistemine birkaç önemli onarım eklendi. Bunların en etkilisi #{strong[sertifika şeffaflığı]} (#{emph[Certificate Transparency]}, CT) oldu. 2013’te IETF’in deneysel belgesi RFC 6962 olarak yayımlanan bu yöntemde \[6\] sertifika otoriteleri, verdikleri her sertifikayı herkese açık, yalnızca eklenebilen günlüklere yazar. Günlük, bir Merkle ağacı adı verilen veri yapısıyla tutulduğu için içine yazılan bir kaydın sonradan sessizce silinmesi ya da değiştirilmesi fark edilir. Tarayıcılar, bu günlüklerde yer almayan sertifikaları kabul etmez. Böylece bir alan adının sahibi, kendi adına kimin sertifika aldığını izleyebilir. Google’ın bir sertifika otoritesi tarafından kendi adına verilen bir sertifikayı birkaç saat içinde görmesi artık mümkündür.

Şeffaflık günlüğü sahte sertifikanın #{strong[verilmesini]} engellemez; verildiğini #{strong[görünür]} kılar. Bu ayrım önemlidir ve ileride liste işletmecisinin gücünü tartışırken geri döneceğiz: Bazı tehlikeler önlenemez, ama gizli kalmaları engellenebilir.

İkinci onarım, sertifika ömürlerinin kısaltılmasıdır. Bir sertifikanın ömrü ne kadar kısaysa, ele geçirilmiş bir anahtar o kadar kısa süre kötüye kullanılabilir ve iptal mekanizmasına o kadar az ihtiyaç duyulur. Web sertifikalarının azami ömrü 2012’de beş yıldı, 2020’de 398 güne indi ve CA\/Tarayıcı Forumu 2025’te bu sürenin 2029’a kadar adım adım 47 güne inmesine karar verdi \[7\]. Kısa ömürlü belgelerin iptale nasıl alternatif olabileceğini dizinin yedinci yazısında tartışıyoruz.

== Web’deki modelin cevapladığı ve cevaplamadığı

Bölüm 2.2’deki üç soruya dönelim. Web sertifikası, #{strong[kimlik]} sorusuna cevap verir: Bu açık anahtar #{raw("universite.example")} alan adını kontrol eden kişiye aittir. Çoğu sertifika için sertifika otoritesinin kontrol ettiği tek şey de budur; başvuranın o alan adını gerçekten yönettiğini gösteren bir sınama (#{emph[domain validation]}). Sitenin arkasındaki kurumun gerçekten bir üniversite olup olmadığı, bir devlet tarafından tanınıp tanınmadığı, diploma vermeye yetkili olup olmadığı sertifikanın konusu değildir.

Yani web modeli #{strong[yetki]} sorusunu yalnızca dar bir anlamda cevaplar: "Bu anahtar bu alan adı adına konuşmaya yetkilidir." Diploma, ehliyet ya da kimlik belgesi gibi belgeler için ise ihtiyacımız olan cevap başkadır: "Bu anahtar, devletin ya da yetkili bir makamın tanıdığı bir kurumundur ve bu kurum şu belge türlerini vermeye yetkilidir." Bu cevabı verecek bir yapıyı Avrupa, web’den farklı bir yoldan kurdu.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Sertifika, bir otoritenin "bu açık anahtar şu adın sahibine aittir" cümlesini imzaladığı bir belgedir. Sertifikalar zincir hâlinde gelir ve doğrulayıcının önceden güvendiği bir köke bağlanır. Web’de bu kökleri tarayıcı üreticileri seçer ve her kök her alan adı için imza atabilir. Bu esneklik sistemi dünya ölçeğinde çalıştırır, ama sistemin güvenliğini en zayıf otoritenin güvenliğine bağlar. Web sertifikası anahtarın hangi alan adına ait olduğunu söyler; kurumun neye yetkili olduğunu söylemez.
]

= Kâğıttan Listeye: Avrupa Birliği’nin Güven Listeleri

== Bir hizmet direktifinden doğan liste

Avrupa’daki güven listelerinin hikâyesi, beklenmedik bir yerden, Avrupa’nın iç pazarında hizmetlerin serbest dolaşımını düzenleyen 2006 tarihli Hizmetler Direktifi’nden başlar. Direktif, bir üye ülkede iş kurmak isteyen birinin işlemlerini elektronik olarak, başka bir üye ülkeden yapabilmesini istiyordu. Bunun için başvuruların elektronik imzayla atılabilmesi, imzaların da sınır ötesinde doğrulanabilmesi gerekiyordu. Ama 1999 tarihli e-imza direktifi altında her ülkenin kendi denetlediği sertifika sağlayıcıları vardı ve bir Fransız kamu kurumunun, bir Leton sertifika sağlayıcısının gerçekten Letonya’da denetlenen bir kuruluş olup olmadığını bilmesinin pratik bir yolu yoktu.

Avrupa Komisyonu bu sorunu 16 Ekim 2009 tarihli 2009\/767\/AT sayılı Kararla çözdü \[8\]. Karar, her üye devletin kendi denetlediği ya da akredite ettiği sertifika hizmeti sağlayıcılarının bir listesini, ortak bir şablona göre, imzalı ve makine tarafından okunabilir biçimde yayımlamasını istiyordu. Komisyon da bu ulusal listelerin nerede yayımlandığını gösteren bir üst liste tutacaktı. Böylece #{strong[listelerin listesi]} (#{emph[List of Trusted Lists]}, LOTL) doğdu.

Bu fikrin web modelinden temel farkı, güvenin kaynağının #{strong[bir yazılım üreticisinin kök programı değil, bir devletin denetim makamı]} olmasıdır. Bir sertifika sağlayıcısının listeye girmesi, o ülkenin yasal denetim sürecinden geçmesine bağlıdır ve listeye kimin, hangi statüyle, ne zamandan beri girdiğini o devlet imzasıyla söyler.

== eIDAS ve güven listelerinin hukuki yeri

2014’te kabul edilen eIDAS Tüzüğü (Tüzük (AB) No 910\/2014) bu yapıyı hukuken sağlamlaştırdı \[9\]. Tüzüğün 22. maddesine göre her üye devlet, kendi denetlediği #{strong[nitelikli güven hizmeti sağlayıcılarının]} ve onların sunduğu nitelikli güven hizmetlerinin bilgilerini içeren güven listelerini oluşturmak, güncel tutmak ve yayımlamakla yükümlüdür. Listeler, otomatik işlemeye uygun biçimde ve elektronik olarak imzalanmış ya da mühürlenmiş olarak yayımlanır. Komisyon da üye devletlerin bildirdiği bilgileri güvenli bir kanal üzerinden kamuya açar.

Nitelikli güven hizmetinin ne olduğuna kısaca değinelim. eIDAS, elektronik imza, elektronik mühür, zaman damgası, kayıtlı elektronik teslim ve web sitesi kimlik doğrulaması gibi hizmetleri #{strong[güven hizmeti]} olarak tanımlar. Bu hizmetleri sunan bir kuruluş, tüzüğün sıkı şartlarını karşıladığını bağımsız bir uygunluk değerlendirme kuruluşunun denetimiyle kanıtlarsa ve ulusal denetim makamı bunu onaylarsa #{strong[nitelikli]} statü kazanır. Nitelikli statünün en somut göstergesi, o hizmetin ulusal güven listesinde "verildi" (#{emph[granted]}) durumuyla yer almasıdır. Başka bir deyişle güven listesi, nitelikli statünün #{strong[kanıtıdır]}. Bir nitelikli elektronik imzanın el yazısıyla atılmış imzaya hukuken eşdeğer sayılması da imzayı atan sertifikanın bu listede yer alan bir sağlayıcıdan gelmesine bağlıdır.

2024’te kabul edilen eIDAS 2.0 (Tüzük (AB) 2024\/1183) güven listelerini korudu ve iki yönde genişletti \[10\]. Birincisi, yeni güven hizmetleri ekledi; dizinin ilk yazısında anlattığımız #{strong[nitelikli elektronik öznitelik onayları]} (QEAA) bunların başında geliyor. Bir diploma ya da meslek belgesi veren nitelikli bir güven hizmeti sağlayıcısı da artık ulusal güven listesinde yer alacak. İkincisi, Avrupa Dijital Kimlik Cüzdanı ekosistemindeki yeni rolleri (cüzdan sağlayıcılar, kimlik verisi sağlayıcıları, güvenen taraflara sertifika veren kuruluşlar) bildirme ve listeleme yükümlülükleri getirdi. Bu ikinci genişlemeye Bölüm 6’da döneceğiz.

== LOTL ve ulusal listeler

Bugün AB’nin güven omurgası iki katmanlıdır (Şekil 4). Üst katmanda Komisyon’un yayımladığı LOTL durur. LOTL’un içinde, AB üyesi 27 devletin ve Avrupa Ekonomik Alanı’ndaki ülkelerin ulusal güven listelerinin #{strong[nerede]} yayımlandığı ve #{strong[hangi sertifikayla]} imzalandığı yazar. Alt katmanda ulusal listeler bulunur; her biri o ülkenin denetim makamının ya da onun görevlendirdiği bir kuruluşun imzasını taşır ve o ülkedeki güven hizmeti sağlayıcılarını, onların hizmetlerini ve bu hizmetlerin durumunu sayar.

#sekil(4, [AB’nin güven omurgası: Resmî Gazete’den tek bir hizmete], "figures/a6/sekil-4.svg", yarim: false)

Bir doğrulayıcı, örneğin bir İtalyan bankasının imza doğrulama yazılımı, bir Estonya şirketinin nitelikli elektronik imzasını şöyle kontrol eder: LOTL’u indirir ve imzasını doğrular. LOTL’da Estonya listesinin adresini ve imzacısını bulur. Estonya listesini indirir, imzasını LOTL’da yazan sertifikayla doğrular. Estonya listesinde imzayı atan sertifikanın bağlandığı hizmeti arar. Hizmeti bulursa, türüne (nitelikli sertifika verme), durumuna (verildi) ve durumun hangi tarihten beri geçerli olduğuna bakar. Bütün bu adımlar, imzanın atıldığı şirkete ya da Estonya’daki sertifika sağlayıcısına tek bir soru sormadan yapılır.

Pratikte bu işi her doğrulayıcı sıfırdan yazmaz. Komisyon’un açık kaynak olarak geliştirdiği #{strong[DSS]} (#{emph[Digital Signature Service]}) kütüphanesi, LOTL’u ve ulusal listeleri indirip doğrulayan, önbellekte tutan ve imza doğrulamada kullanan hazır bir araçtır. Avrupa’daki imza doğrulama hizmetlerinin büyük kısmı bu kütüphaneyi ya da onunla aynı kuralları uygulayan yazılımları kullanır.

== Çapanın kendisi: Resmî Gazete ve "pivot" LOTL

LOTL’un imzasını doğrulamak için hangi sertifikaya güveneceğiz? Bu sorunun Avrupa’daki cevabı hukukidir. Komisyon, LOTL’un yayımlandığı adresi ve onu imzalamaya yetkili sertifikaları #{strong[Avrupa Birliği Resmî Gazetesi]}’nde ilan eder \[11\]. Resmî Gazete, AB hukukunun yayımlandığı ve herkesin erişebildiği resmî kaynaktır. Böylece güven çapası, bir yazılımın içine gömülü bir dosya değil, hukuken yayımlanmış ve herkesin denetleyebileceği bir ilan olur.

Bu yaklaşımın pratik bir zorluğu var. İmza sertifikaları belirli aralıklarla yenilenir, LOTL’un adresi de değişebilir. Her değişiklikte Resmî Gazete’de yeni bir ilan yayımlamak ve bütün doğrulayıcıların yapılandırmasını güncellemesini beklemek ağır bir iştir. Komisyon bu sorunu #{strong[pivot LOTL]} adı verilen bir yöntemle çözer.

#kutu("teknik", [Pivot LOTL: çapayı kaybetmeden anahtar değiştirmek])[
İmza sertifikaları ya da LOTL’un adresi değiştiğinde Komisyon, o anki LOTL’un bir kopyasını kalıcı bir adreste arşivler. Bu arşivlenmiş kopyaya #{strong[pivot]} denir. Her pivot, bir sonraki dönemin imza sertifikalarını içinde taşır ve bir önceki dönemin sertifikasıyla imzalanır. Güncel LOTL’un #{raw("SchemeInformationURI")} alanı, bu pivotların adreslerini sıralı olarak listeler.

Resmî Gazete’deki son ilanı bilen bir doğrulayıcı şöyle ilerler. Tabloda $K_0$ ilandaki sertifika kümesini, $K_i$ ise $i$’nci pivottan öğrenilen kümeyi gösterir:

#adimlar((
  ("Doğrulayıcı", [#{strong[Başlangıç.]} Resmî Gazete ilanındaki sertifika kümesini başlangıç noktası alır.], $K_0 = "ilandaki küme"$),
  ("Doğrulayıcı", [#{strong[İlk pivot.]} İlandan sonraki ilk pivotu indirir, imzasını bu kümeyle doğrular ve içindeki LOTL imzacısı kayıtlarından (#{raw("OtherTSLPointer")} alanı) bir sonraki dönemin kümesini öğrenir.], $"doğrula"("pivot"_1, K_0) => K_1$),
  ("Doğrulayıcı", [#{strong[Sıradaki pivotlar.]} Her pivotu bir öncekinden öğrendiği kümeyle doğrular ve böyle devam eder.], $"doğrula"("pivot"_(i+1), K_i) => K_(i+1)$),
  ("Doğrulayıcı", [#{strong[Güncel liste.]} Son pivottan çıkan küme, güncel LOTL’u doğrulamak için kullanılır.], $"doğrula"("LOTL", K_n)$),
))

Zincirin tamamı tek satırda şöyle yazılabilir; her ok bir imza doğrulamasıdır:

#formul[$ K_0 -> "pivot"_1 -> K_1 -> "pivot"_2 -> K_2 -> dots.c -> K_n -> "güncel LOTL" $]

Her adım bir öncekine imzayla bağlı olduğu için, Resmî Gazete’deki ilk çapadan bugünkü anahtara kadar kesintisiz bir zincir kurulur. Yöntemin bir benzeri, bu yazının sonunda anlatacağımız Tamga Network’ün listelerinde de kullanılır: Her yeni sürüm bir öncekine bağlanır.
]

== Listede ne yazar, ne yazmaz

Güven listeleri hakkında sık yapılan bir yanlış anlamayı burada düzeltelim. Ulusal liste, ülkedeki her imzayı ya da her sertifikayı içermez. Yalnızca #{strong[hizmetleri]} içerir: "Şu kuruluşun şu sertifika makamı, nitelikli sertifika verme hizmetidir ve şu tarihten beri onaylıdır." Bir vatandaşın imza sertifikası listede yer almaz; o sertifika, listede yer alan bir hizmetin kökünden ya da ara makamından gelen bir zincirle listeye bağlanır.

Bu tasarımın iki sonucu var. Birincisi, listeler küçük kalır. Milyonlarca imza sertifikası yerine birkaç yüz hizmet kaydı taşınır; doğrulayıcı bunları önceden indirip saklayabilir. İkincisi, listelerde #{strong[hiçbir kişisel veri yoktur]}. Listede kuruluş adları, sertifikalar, adresler ve durumlar yazar; tek tek kişilere ait hiçbir bilgi bulunmaz. Bu, güven altyapısının mahremiyet açısından taşıdığı en önemli özelliktir ve ilerleyen bölümlerde tekrar tekrar önemini göreceğiz.

Listenin söylediği bir başka şey de #{strong[geçmiştir]}. Bir hizmetin durumu değiştiğinde, örneğin bir sertifika sağlayıcısının nitelikli statüsü geri çekildiğinde, eski kayıt silinmez. Hizmetin güncel durumu "geri çekildi" olur ve önceki durum, başlangıç tarihiyle birlikte #{strong[hizmet geçmişi]} bölümüne taşınır. Bu sayede bir doğrulayıcı, 2022’de atılmış bir imzayı bugün incelerken, "bu hizmet 2022’de onaylı mıydı?" sorusunu cevaplayabilir. Belgelerin ve imzaların yıllarca geçerli kaldığı bir dünyada, yalnızca bugünkü durumu bilmek yetmez.

#kutu("ornek", [Timur’un sorusu güven listesiyle])[
Aynur’un diploması bir AB üye devletinden gelseydi, Timur’un yazılımı şu sırayla çalışabilirdi:

#adimlar((
  ("Timur'un yazılımı", [#{strong[Zincir.]} Diplomayı imzalayan anahtarın sertifika zincirini köke kadar izler.], $"imza anahtarı" -> "ara makam" -> "kök"$),
  ("Timur'un yazılımı", [#{strong[Liste.]} Zincirin bağlandığı kökü o ülkenin ulusal güven listesinde arar.], $"kök" in "ulusal liste"$),
  ("Timur'un yazılımı", [#{strong[Tür.]} Kaydın türüne bakar: nitelikli öznitelik onayı verme hizmeti mi?], $"tür" = "nitelikli öznitelik onayı"$),
  ("Timur'un yazılımı", [#{strong[Tarih.]} Kaydın, diplomanın imzalandığı tarihteki durumuna bakar.], $"durum"(t_"imza") = "granted"$),
))

Hepsi tutarsa diploma kabul edilir. Bu işlemde ne diplomayı veren üniversite ne de güven listesini yayımlayan makam Timur’un sorgusundan haberdar olur; çünkü liste önceden indirilmiştir.

Ama Aynur’un diploması Azerbaycan’dan geliyor ve Azerbaycan’ın güven listesi AB’nin LOTL’unda yok. Bu soruya Bölüm 10’da döneceğiz.
]

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Avrupa’da güvenin kaynağı, devletlerin imzaladığı listelerdir. Komisyon ulusal listelerin adresini ve imzacısını LOTL’da toplar; LOTL’un kendi imzacısı Resmî Gazete’de ilan edilir. Listeler kişileri değil hizmetleri sayar, kişisel veri taşımaz ve geçmişi silmez.
]

= Listelerin Dili: ETSI TS 119 612 ve TS 119 602

== Neden ortak bir biçim?

Otuz ayrı ülke otuz ayrı biçimde liste yayımlasaydı, her doğrulayıcının otuz ayrı okuyucu yazması gerekirdi. Üstelik bir durumun bir ülkede "onaylı", başka bir ülkede "geçerli" diye adlandırılması, otomatik karşılaştırmayı imkânsız kılardı. Bu yüzden listelerin biçimi en baştan ortak bir standarda bağlandı. Bu standardı, Avrupa Telekomünikasyon Standartları Enstitüsü’nün (ETSI) elektronik imza ve güven altyapıları komitesi (ESI) hazırlar.

2009 Kararı daha eski bir ETSI belgesine, TS 102 231’e dayanıyordu. eIDAS ile birlikte bu belgenin yerini #{strong[ETSI TS 119 612]} aldı ve Komisyon’un 2015\/1505 sayılı Uygulama Kararı, üye devletlerin listelerini bu standardın belirli bir sürümüne göre yayımlamasını şart koştu \[12\]. Karar 2025’te 2025\/2164 sayılı Uygulama Kararı ile güncellendi ve standardın daha yeni bir sürümüne bağlandı. Bu yazının yazıldığı tarihte TS 119 612’nin en güncel sürümü Ağustos 2025 tarihli V2.4.1’dir \[13\].

== TS 119 612: bir güven listesinin anatomisi

TS 119 612’ye göre bir güven listesi, tek bir imzalı XML belgesidir ve birkaç iç içe bölümden oluşur (Şekil 5). Bu bölümleri yukarıdan aşağıya, bir binanın katları gibi okuyabiliriz.

#sekil(5, [ETSI TS 119 612 güven listesinin yapısı ve TS 119 602’deki karşılığı], "figures/a6/sekil-5.svg", yarim: false)

#{strong[Şema bilgisi]} (#{emph[scheme information]}), listenin kimliğidir. Listenin türünü, sıra numarasını, kim tarafından işletildiğini, hangi ülkeye ait olduğunu, ne zaman yayımlandığını ve en geç ne zaman yenileneceğini yazar. Son alan, yani #{strong[sonraki güncelleme]} (#{emph[next update]}), güvenlik açısından önemlidir. Bir doğrulayıcı, bu tarihi geçmiş bir listeyi geçerli saymaz. Böylece bir saldırganın eski bir listeyi, örneğin bir hizmetin henüz geri çekilmediği zamandan kalma bir kopyayı, yeniymiş gibi sunması engellenir. AB’deki listelerde yayım tarihi ile sonraki güncelleme arasındaki süre en çok altı aydır; liste değişmese bile bu sürenin sonunda yeniden imzalanıp yayımlanır. LOTL’da bu bölümde bir de #{strong[diğer listelere işaretçiler]} bulunur.

#{strong[Güven hizmeti sağlayıcısı]} (#{emph[trust service provider]}, TSP) bölümü, listedeki her kuruluşun adını, adresini ve bilgi sayfasını taşır. Her sağlayıcının altında bir ya da birkaç #{strong[hizmet]} kaydı bulunur. Hizmet kaydı listenin asıl iş gören kısmıdır. Hizmetin türünü bir URI ile, adını, onu tanımlayan #{strong[dijital kimliği]} (çoğunlukla bir X.509 sertifikası ya da açık anahtar), güncel durumunu ve bu durumun hangi andan beri geçerli olduğunu yazar.

#{strong[Hizmet geçmişi]} (#{emph[service history]}), Bölüm 4.5’te söz ettiğimiz geçmiş kayıtlarını tutar. En sonda #{strong[imza]} gelir. TS 119 612 listeleri, XML belgeleri için tanımlanmış gelişmiş elektronik imza biçimi olan XAdES ile imzalanır.

#kutu("teknik", [Bir güven listesinden kısaltılmış bir parça])[
Aşağıdaki XML, TS 119 612 biçimindeki bir ulusal listeden alınmış gibi düzenlenmiş kısaltılmış bir örnektir. Ad ve tarihler örnektir; URI’ler standarttaki gerçek değerlerdir.

#kod("xml", "<TrustServiceStatusList>
  <SchemeInformation>
    <TSLSequenceNumber>48</TSLSequenceNumber>
    <TSLType>http://uri.etsi.org/TrstSvc/TrustedList/TSLType/EUgeneric</TSLType>
    <SchemeOperatorName><Name xml:lang=\"en\">Örnek Denetim Makamı</Name></SchemeOperatorName>
    <SchemeTerritory>EE</SchemeTerritory>
    <ListIssueDateTime>2026-11-01T09:00:00Z</ListIssueDateTime>
    <NextUpdate><dateTime>2027-04-30T09:00:00Z</dateTime></NextUpdate>
  </SchemeInformation>
  <TrustServiceProviderList>
    <TrustServiceProvider>
      <TSPInformation><TSPName><Name xml:lang=\"en\">Örnek Güven Hizmetleri</Name></TSPName></TSPInformation>
      <TSPServices>
        <TSPService>
          <ServiceInformation>
            <ServiceTypeIdentifier>http://uri.etsi.org/TrstSvc/Svctype/CA/QC</ServiceTypeIdentifier>
            <ServiceName><Name xml:lang=\"en\">Örnek Nitelikli CA 2026</Name></ServiceName>
            <ServiceDigitalIdentity>
              <DigitalId><X509Certificate>MIIC…</X509Certificate></DigitalId>
            </ServiceDigitalIdentity>
            <ServiceStatus>http://uri.etsi.org/TrstSvc/TrustedList/Svcstatus/granted</ServiceStatus>
            <StatusStartingTime>2026-02-01T00:00:00Z</StatusStartingTime>
          </ServiceInformation>
        </TSPService>
      </TSPServices>
    </TrustServiceProvider>
  </TrustServiceProviderList>
  <ds:Signature>…</ds:Signature>
</TrustServiceStatusList>", baslik: "Örnek: bir ulusal güven listesinin kısaltılmış XML'i")

- #{raw("TSLType")} değerindeki #{raw("EUgeneric")}, bunun bir AB üye devleti listesi olduğunu söyler.
- #{raw("ServiceTypeIdentifier")} değerindeki #{raw("CA/QC")}, hizmetin nitelikli sertifika veren bir sertifika makamı olduğunu anlatır.
- #{raw("ServiceStatus")} değerindeki #{raw("granted")}, hizmetin nitelikli statüsünün verildiğini; #{raw("StatusStartingTime")} bunun hangi andan beri geçerli olduğunu gösterir.
- #{raw("ServiceDigitalIdentity")} içindeki sertifika, hizmetin kökü ya da ara makamıdır. Bir vatandaşın imza sertifikası bu köke zincirle bağlanır; kendisi listede yer almaz.
]

Hizmet türü ve durum alanlarının #{strong[URI]} olması bilinçli bir tercihtir. URI, dünyada tek olan ve bir tanım sayfasına işaret eden bir addır. "Verildi" kelimesi Almancada, Fransızcada ve Estoncada farklı yazılır; ama durum URI’si her dilde aynıdır. Bu sayede bir İtalyan yazılımı, bir Estonya listesindeki durumu dil bilmeden yorumlayabilir. Aynı yöntem, AB dışındaki bir işletmecinin kendi URI’lerini tanımlamasına da izin verir. Standart, listenin AB dışındaki ülkeler ya da uluslararası kuruluşlar tarafından da, kendi kurallarına göre yayımlanabileceğini açıkça öngörür. Bunun için o işletmecinin kendi liste türü ve durum URI’lerini kullanması ve bunların anlamını bir sayfada tanımlaması yeterlidir.

== TS 119 602: her tür güvenilen kuruluş için

TS 119 612 yıllar içinde olgunlaştı, ama tek bir amaç için tasarlanmıştı: güven hizmeti sağlayıcılarını listelemek. Avrupa Dijital Kimlik Cüzdanı ekosistemi ise başka türden kuruluşlar getirdi. Kimlik verisi (PID) sağlayıcıları, cüzdan sağlayıcıları, güvenen taraflara sertifika veren kuruluşlar, kamu adına öznitelik onayı veren kurumlar bunların başında geliyor. Bunların çoğu eIDAS anlamında bir güven hizmeti sağlayıcısı sayılmaz. Ama hepsinin, aynı soruya cevap veren imzalı bir listeye ihtiyacı var: "Bu rolde kim tanınıyor ve anahtarı ne?"

ETSI bu ihtiyaca #{strong[TS 119 602]} ile cevap verdi. Kasım 2025’te V1.1.1 olarak yayımlanan bu belge, #{strong[güvenilen kuruluş listesi]} (#{emph[List of Trusted Entities]}, LoTE) adını verdiği genel bir veri modeli tanımlar \[14\]. LoTE, TS 119 612’nin genelleştirilmiş hâlidir. "Güven hizmeti sağlayıcısı" yerine "güvenilen kuruluş" (#{emph[trusted entity]}), "güven hizmeti durum listesi" yerine "güvenilen kuruluş listesi" der. Yapı neredeyse aynen korunur; standardın bir eki, iki belgenin alanlarını tek tek eşler.

İki önemli fark var. Birincisi biçimdir. LoTE hem XML hem de #{strong[JSON]} olarak yazılabilir. JSON, web ve mobil uygulamaların gündelik dilidir ve cüzdan yazılımları için XML’den çok daha kolay işlenir. JSON biçimindeki listeler, JSON için tanımlanmış gelişmiş imza biçimi olan JAdES ile imzalanır. İkinci fark kapsamdadır. Standardın ekleri, AB’nin cüzdan ekosistemi için altı ayrı #{strong[profil]} tanımlar. Komisyon’un yayımlayacağı bu listeler kimlik verisi sağlayıcılarını, cüzdan sağlayıcılarını, güvenen taraflara erişim sertifikası veren kuruluşları, güvenen taraflara kayıt sertifikası veren kuruluşları, kamu adına öznitelik onayı veren kurumları (PuB-EAA) ve güvenen taraf kayıt kurumlarını sayar. Hukuki dayanakları Komisyon’un 2024\/2980 sayılı Uygulama Tüzüğü ile kamu kurumlarının öznitelik onaylarına ilişkin 2025\/1569 sayılı Uygulama Tüzüğü’dür \[15\]. Üye devletler bu rollerdeki kuruluşları Komisyon’a bildirir; Komisyon da bildirimleri imzalı listeler olarak yayımlar.

#kutu("teknik", [Bir LoTE listesinin iskeleti (JSON)])[
Aşağıdaki örnek, cüzdan sağlayıcılarını sayan bir LoTE listesinin kısaltılmış iskeletidir. Alan adları TS 119 602’nin JSON şemasındaki adlardır; değerler örnektir.

#kod("json", "{
  \"LoTE\": {
    \"ListAndSchemeInformation\": {
      \"LoTEVersionIdentifier\": 1,
      \"LoTESequenceNumber\": 12,
      \"LoTEType\": \"…/WalletProvidersList\",
      \"SchemeOperatorName\": [{ \"lang\": \"en\", \"value\": \"Örnek Liste İşletmecisi\" }],
      \"SchemeTerritory\": \"EU\",
      \"ListIssueDateTime\": \"2026-11-01T09:00:00Z\",
      \"NextUpdate\": \"2027-04-30T09:00:00Z\"
    },
    \"TrustedEntitiesList\": [
      {
        \"TrustedEntityInformation\": {
          \"TEName\": [{ \"lang\": \"en\", \"value\": \"Örnek Cüzdan Sağlayıcı\" }]
        },
        \"TrustedEntityServices\": [
          {
            \"ServiceInformation\": {
              \"ServiceTypeIdentifier\": \"http://uri.etsi.org/19602/SvcType/WalletSolution/Issuance\",
              \"ServiceName\": [{ \"lang\": \"en\", \"value\": \"Örnek Cüzdan, birim kanıtı imzası\" }],
              \"ServiceDigitalIdentity\": { \"X509Certificates\": [{ \"val\": \"MIIC…\" }] }
            }
          }
        ]
      }
    ]
  }
}", baslik: "Örnek: cüzdan sağlayıcılarını sayan bir LoTE listesi")

Yapının TS 119 612’ye ne kadar benzediği görülüyor: liste bilgisi, kuruluşlar, kuruluşların hizmetleri, hizmetlerin dijital kimliği. Bir fark dikkat çekiyor. Bu örnekte hizmet durumu alanı yok, çünkü standardın cüzdan sağlayıcıları profili durum alanını kullanmaz; listede yer almak onaylı olmak demektir. Onayı geri çekilen kuruluş listeden çıkar ve önceki sürümler ayrı bir adreste arşivlenir. Kamu adına öznitelik onayı veren kurumların profilinde ise durum alanı zorunludur. Profiller aynı iskeleti her rolün ihtiyacına göre farklı sıkılıkta kullanır.
]

#tablo([#{strong[Tablo 1.]} İki ETSI liste biçiminin karşılaştırması.], (11fr, 27fr, 48fr), ([Özellik], [TS 119 612 (güven listesi)], [TS 119 602 (güvenilen kuruluş listesi)],), (
  ([Ne listeler], [güven hizmeti sağlayıcıları ve hizmetleri], [her tür güvenilen kuruluş ve hizmetleri],),
  ([Biçim], [XML], [XML ya da JSON],),
  ([İmza], [XAdES], [XAdES ya da JAdES],),
  ([AB’deki kullanımı], [üye devletlerin ulusal listeleri ve LOTL], [Komisyon’un cüzdan ekosistemi listeleri (PID, cüzdan, erişim ve kayıt sertifikası sağlayıcıları, PuB-EAA, kayıt kurumları)],),
  ([Durum ve geçmiş], [her hizmette durum ve geçmiş], [profile göre: bazı listelerde var, bazılarında listede olmak onay demek],),
  ([Hukuki dayanak], [eIDAS madde 22; Uygulama Kararı 2015\/1505], [eIDAS 2.0; Uygulama Tüzükleri 2024\/2980 ve 2025\/1569],),
  ([Olgunluk], [2009’dan beri işleyen sistem], [2025’te yayımlandı, uygulamaya yeni giriyor],),
))

= Cüzdan Dünyasında Güven: Kim Kimi Doğrular?

== Dört yönlü bir güven ağı

Dizinin ilk yazısında, AB dijital kimlik cüzdanında doğrulamanın #{strong[iki yönlü]} olduğunu söylemiştik: Doğrulayıcı belgeyi doğrularken, cüzdan da doğrulayıcıyı doğrular. Aslında güven ağı bundan da sıktır. Cüzdan ekosistemindeki her ilişkide bir taraf, karşısındakinin kim olduğunu ve neye yetkili olduğunu bir listeden öğrenir (Şekil 6).

#sekil(6, [AB dijital kimlik cüzdanı ekosisteminde kim kimi hangi listeyle doğrular], "figures/a6/sekil-6.svg", yarim: false)

+ #{strong[Belge veren, cüzdanı doğrular.]} Bir PID sağlayıcısı kimlik bilgisini yalnızca sertifikalı bir cüzdana ve o cüzdanın güvenli donanımda tuttuğu bir anahtara vermek ister. Cüzdan, belge isterken cüzdan sağlayıcısının imzaladığı bir #{strong[cüzdan birimi kanıtı]} sunar. Belge veren bu kanıtın imzacısını cüzdan sağlayıcıları listesinde arar. Bu konuyu dizinin onuncu yazısında ayrıntılı anlatacağız.
+ #{strong[Cüzdan, güvenen tarafı doğrular.]} Bir site cüzdandan bilgi istediğinde isteğini bir #{strong[erişim sertifikasıyla]} imzalar. Cüzdan bu sertifikanın, erişim sertifikası sağlayıcıları listesinde yer alan bir kuruluştan geldiğini kontrol eder.
+ #{strong[Güvenen taraf, belgeyi doğrular.]} Bu, Timur’un sorusudur: Belgeyi imzalayan anahtar, ilgili listede kayıtlı ve bu belge türünü vermeye yetkili bir kuruma mı ait?
+ #{strong[Cüzdan, belge vereni doğrular.]} Kişi bir kurumdan belge alırken de cüzdanı, karşısındakinin gerçekten o kurum olduğunu kontrol eder. Böylece sahte bir kurumun kişinin cüzdanına belge gibi görünen bir şey yerleştirmesi zorlaşır.

Her yönde aynı mantık işler. Bir taraf, karşısındakinin anahtarını #{strong[önceden indirdiği imzalı bir listede]} arar ve kimseye sormadan karar verir. Bu, Bölüm 3’teki sertifika fikrinin ve Bölüm 4’teki liste fikrinin birleşimidir.

== Güvenen tarafın kaydı: kim, neyi, neden isteyebilir?

Dördüncü dönem cüzdanlarının en önemli yeniliklerinden biri, güvenen tarafların #{strong[kayıt]} zorunluluğudur. Federasyon döneminde bir site, kullanıcıdan istediği bilgiyi izin ekranında sıralar, kullanıcı da onaylardı. Sitenin o bilgiye gerçekten ihtiyacı olup olmadığına kimse bakmazdı. eIDAS 2.0 bu düzeni değiştirdi. Tüzüğün 5b maddesine göre, cüzdan aracılığıyla bilgi isteyecek her güvenen taraf, yerleşik olduğu üye devlette kayıt olmak ve hangi bilgileri hangi amaçla isteyeceğini bildirmek zorundadır \[10\]. Kaydın ayrıntıları Komisyon’un 2025\/848 sayılı Uygulama Tüzüğü’nde düzenlenir; 2026\/1730 sayılı Uygulama Tüzüğü bu kuralları güncelledi \[16\].

Kayıt bilgileri her üye devletin tuttuğu #{strong[ulusal güvenen taraf sicilinde]} yer alır ve herkesin erişebileceği biçimde yayımlanır. Kayıt işini yürüten kuruma #{strong[kayıt kurumu]} (#{emph[registrar]}) denir. Sicile bakan herkes, örneğin bir bankanın cüzdandan hangi bilgileri, hangi amaçla isteme hakkı olduğunu görebilir. Bu, Bölüm 2.2’deki #{strong[yetki]} sorusunun doğrulayıcı tarafındaki karşılığıdır. Artık belge verenin yanında belge isteyenin yetkisi de bir kayda bağlanır.

== İki sertifika: erişim ve kayıt

Kaydın cüzdana nasıl ulaştığını iki sertifika belirler. İkisi de ETSI standartlarıyla tanımlanmıştır ve adları birbirine çok benzediği için kolayca karıştırılır.

#{strong[Erişim sertifikası]} (#{emph[wallet-relying party access certificate]}, WRPAC), güvenen tarafın #{strong[kim olduğunu]} kanıtlar. Klasik bir X.509 sertifikasıdır; güvenen tarafın resmî adını ve kimlik numarasını taşır. Bu sertifikaları, üye devletlerin bildirdiği ve Komisyon’un listesinde yer alan #{strong[erişim sertifikası sağlayıcıları]} verir. Sertifika politikası ETSI TS 119 411-8’de tanımlanır \[17\]. Güvenen taraf cüzdana gönderdiği her isteği bu sertifikayla imzalar.

#{strong[Kayıt sertifikası]} (#{emph[wallet-relying party registration certificate]}, WRPRC), güvenen tarafın #{strong[neyi, neden isteyebileceğini]} söyler. Kayıt sırasında bildirilen her kullanım amacı sertifikada yazılır; yanında istenebilecek belge türleri ve alanlar, güvenen tarafın gizlilik politikasının adresi bulunur. Biçimi ETSI TS 119 475’te tanımlanır \[18\]. 2026\/1730 sayılı tüzük, kayıt sertifikalarının kayıtlı güvenen taraflara otomatik ve gecikmesiz verilmesini ve sertifikada AB genelinde ortak bir erişim politikası bulunmasını şart koştu. Bu politikaya göre güvenen taraf yalnızca sertifikasında yazan bilgiyi, yalnızca kayıtlı amaç için isteyebilir.

#kutu("teknik", [Bir kayıt sertifikasının içeriği])[
TS 119 475, kayıt sertifikası için JWT tabanlı bir biçim de tanımlar. Aşağıdaki içerik, bir kayıt sertifikasının taşıdığı bilginin sadeleştirilmiş bir gösterimidir. Alan adları anlaşılır olsun diye Türkçeleştirilmiştir; standarttaki gerçek adlar ve zorunlu alanlar farklıdır. Değerler örnektir.

#kod("json", "{
  \"konu_kimlik_no\": \"VATXX-1234567890\",
  \"ad\": \"Örnek Üniversitesi Lisansüstü Kabul Ofisi\",
  \"kullanim_amaci\": \"Lisansüstü başvurularında diploma doğrulama\",
  \"istenebilecek_bilgiler\": [
    { \"belge_turu\": \"diploma\", \"alanlar\": [\"derece\", \"bolum\", \"mezuniyet_tarihi\", \"veren_kurum\"] },
    { \"belge_turu\": \"PID\", \"alanlar\": [\"ad\", \"soyad\", \"dogum_tarihi\"] }
  ],
  \"gizlilik_politikasi\": \"https://universite.example/gizlilik\",
  \"kayit_kurumu\": \"Örnek Ulusal Kayıt Kurumu\",
  \"durum\": { \"liste_adresi\": \"…\", \"sira\": 418 }
}", baslik: "Örnek: bir kayıt sertifikasının sadeleştirilmiş içeriği")

Cüzdan gelen bir isteği aldığında üç şey yapar:

#adimlar((
  ("Cüzdan", [#{strong[Erişim.]} İsteğin erişim sertifikasıyla imzalandığını ve bu sertifikanın listede yer alan bir sağlayıcıdan geldiğini doğrular.], $"erişim sertifikası" -> "listedeki sağlayıcı"$),
  ("Cüzdan", [#{strong[Kayıt.]} Kayıt sertifikasının imzasını ve durumunu kontrol eder.], $"durum"("kayıt sertifikası") = "geçerli"$),
  ("Cüzdan", [#{strong[Kapsam.]} İstenen alanları kayıt sertifikasındaki listeyle karşılaştırır; istek kayıtta yazanı aşıyorsa kişiyi uyarır.], $"istenen" subset.eq "kayıttaki alanlar"$),
))

Son satırdaki durum bilgisi, kayıt sertifikasının da tıpkı bir belge gibi iptal edilebildiğini gösterir; iptal mekanizmasını dizinin yedinci yazısında anlatıyoruz.
]

== Aynur’un cüzdanı fazla isteği nasıl yakalar?

#kutu("ornek", [Bir dil kursu, bir kampanya sitesi])[
Aynur İstanbul’a geldikten sonra bir dil kursuna yazılmak istiyor. Kursun sitesi cüzdandan ad, soyad ve doğum tarihi istiyor. Aynur’un cüzdanı isteğin erişim sertifikasını doğruluyor; kurs gerçekten kayıtlı bir kurum. Sonra kayıt sertifikasına bakıyor. Kursun kayıtlı amacı "kayıt ve faturalandırma", istenebilecek alanlar arasında ad, soyad ve doğum tarihi var. İstek kayıtla uyumlu olduğu için cüzdan Aynur’a sade bir onay ekranı gösteriyor.

Birkaç gün sonra başka bir site, bir kampanya için Aynur’dan ad, soyad, doğum tarihi, adres ve kimlik numarası istiyor. Bu sitenin kayıt sertifikasında adres ve kimlik numarası yok. Cüzdan, Aynur’a bu iki alanın sitenin kayıtlı amacının dışında kaldığını belirgin biçimde gösteriyor. Aynur paylaşmamayı seçebilir ya da sitenin durumunu ilgili makama bildirebilir.

Cüzdanın bu ayrımı yapabilmesi için internetten bir yere sorması gerekmiyor. Erişim sertifikası sağlayıcılarının listesi cüzdanda önceden indirilmiş durumda, kayıt sertifikası da isteğin içinde geliyor.
]

Bu örnek, güven altyapısının yalnızca belgeleri değil #{strong[istekleri]} de denetlediğini gösteriyor. Dizinin ilk yazısında "aşırı kimlik isteme" riskinden söz etmiştik: Kimlik göstermek tek dokunuşa indiğinde kurumlar gerekmediği hâlde kimlik istemeye başlayabilir. Güvenen taraf kaydı ve kayıt sertifikası, Avrupa’nın bu riske karşı kurduğu en somut güvencedir. Güvence eksiksiz sayılmaz; kaydın içeriğini ilk başta kimin, ne kadar dikkatle incelediği belirleyicidir. Bu konuya Bölüm 9’da döneceğiz.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
AB cüzdan ekosisteminde her taraf karşısındakini önceden indirdiği bir listeyle doğrular: Belge veren cüzdanı, cüzdan güvenen tarafı, güvenen taraf belge vereni. Güvenen taraflar kayıt olmak zorundadır; erişim sertifikası onların kim olduğunu, kayıt sertifikası neyi ve neden isteyebileceklerini söyler. Böylece yetki sorusu belgeyi isteyene de sorulur.
]

= Doğrulayıcı İnternete Çıkmadan Nasıl Karar Verir?

== Önce indir, sonra doğrula

Timur’a dönelim. Ofisin doğrulama yazılımı, Aynur’un diplomasını incelerken kimseye soru sormak zorunda mı? İyi tasarlanmış bir güven altyapısında cevap hayırdır. Yazılım güven listelerini #{strong[önceden]}, örneğin birkaç saatte bir, indirir, imzalarını doğrular ve belleğinde tutar. Bir belge geldiğinde kararı bu yerel kopyaya bakarak verir.

Bu "önce indir, sonra doğrula" düzeninin üç faydası var. Birincisi hızdır; belgenin doğrulanması ağ gecikmesi olmadığı için milisaniyeler sürer. İkincisi dayanıklılıktır; liste sunucusu birkaç saatliğine erişilemez olsa bile doğrulama sürer. Belki en önemlisi olan üçüncüsü ise #{strong[mahremiyettir]}. Liste yayımlayan makam, hangi belgenin hangi gün hangi kurumda gösterildiğini öğrenmez. Liste indirme istekleri tek tek doğrulamalarla ilişkilendirilemez; yazılım listeyi Aynur’un diploması gelmeden önce de, geldikten sonra da aynı aralıkla indirir. Dizinin ilk yazısında anlattığımız "eve telefon etme" sorunu, güven altyapısı düzeyinde de böyle önlenir.

== Adım adım bir karar

#sekil(7, [Doğrulayıcının yerel güven listesiyle karar vermesi], "figures/a6/sekil-7.svg", yarim: false)

Şekil 7, doğrulayıcının bir belgeyi kabul etmeden önce sorduğu soruları sıralıyor. İlk soru Bölüm 2’deki matematik sorusudur. Sonraki üçü sırasıyla #{strong[kimlik]}, #{strong[durum]} ve #{strong[yetki]} sorularıdır. Sonuncusu ise yeni bir şey getirir: #{strong[tazelik]}.

"İmza anında" ifadesi önemlidir. Bir kurumun kaydı bugün geri çekilmiş olabilir; ama kurum, geri çekilmeden önce verdiği belgeler için hâlâ güvenilir sayılabilir. Bunun tersi de mümkündür. Kurumun anahtarı çalınmışsa, çalınma tarihinden sonra imzalanmış her belge kuşkuludur. Bu yüzden iyi bir güven listesi durumun yanında #{strong[durumun başlangıç anını]} ve #{strong[geçmişini]} taşır; doğrulayıcı da belgenin imza tarihini bu geçmişle karşılaştırır.

Burada ince bir sorun saklı. Belgenin imza tarihini belge kendisi söyler, yani imzalayan. Anahtarını çalan bir saldırgan, sahte belgeye geçmiş bir tarih yazabilir. Bu yüzden anahtarı çalınan bir kurum için "şu tarihten sonra verilenler geçersiz" kuralı tek başına yetmez. Ya kurumun bütün belgeleri geçersiz sayılır ya da belgelerin verildiği an bağımsız bir kaynakla, örneğin güvenilir bir zaman damgasıyla ya da herkese açık bir kayıtla kanıtlanır. Güven listesi tasarımcıları bu iki seçenek arasında karar verirken risk ile kullanılabilirliği tartmak zorundadır.

== Üçüncü cevap: "şu an bilmiyorum"

Tazelik sorusu, birçok sistemin atladığı bir ayrıma dayanır. Bir doğrulayıcının verebileceği cevaplar yalnızca "evet" ve "hayır" değildir. Listenin sonraki güncelleme tarihi geçmişse ve yeni liste indirilemiyorsa, doğrulayıcı aslında bir şey bilmiyordur. Belge belki geçerlidir, ama bugün geçerli olduğu kanıtlanamaz. Bu durumda doğru cevap reddetmek olmaz; doğru cevap "#{strong[belirsiz]}"dir (#{emph[indeterminate]}).

Bu ayrım küçük bir teknik ayrıntı gibi görünebilir, ama insanların hayatına doğrudan dokunur. "Bu diploma geçersiz" ile "bu diplomayı şu an kontrol edemiyorum" arasındaki fark, bir insanın işe alınıp alınmaması kadar büyük olabilir. Avrupa’nın imza doğrulama standartları da sonuçları geçerli, geçersiz ve belirsiz diye üçe ayırır \[19\]. Bir doğrulama yazılımı belirsiz sonucu kullanıcıya reddedilmiş gibi göstermemeli, "biraz sonra yeniden deneyin" demelidir.

== Çevrimdışı doğrulama ve sınırları

"Önce indir, sonra doğrula" düzeni, doğrulayıcının #{strong[tamamen çevrimdışı]} çalışmasına da kapı açar. Bir sınır kapısındaki ya da bir sınav salonundaki okuyucu cihaz, listeleri sabah indirip gün boyu internetsiz çalışabilir. Yüz yüze doğrulamayı dizinin dokuzuncu yazısında ayrıntılı anlatacağız. Burada yalnızca bir sınıra dikkat çekelim. Çevrimdışı çalışan bir cihaz, son indirdiği listeden sonra olan değişiklikleri bilemez. Sabah indirilen listede etkin görünen bir kurumun öğlen yetkisi geri alınmışsa, cihaz bunu akşam yeniden bağlanana kadar fark etmez.

Bu sınır, iki değer arasında bir seçimdir. Daha sık indirme daha taze bilgi demektir; daha seyrek indirme daha fazla dayanıklılık ve daha az ağ trafiği. Her doğrulayıcı, işinin riskine göre bir #{strong[azami liste yaşı]} belirler. Bir müze indiriminde bir günlük liste yeterli olabilir; bir banka hesabı açılışında birkaç saatlik bir sınır daha doğrudur. Aynı ayrım tek tek belgelerin iptal bilgisi için de geçerlidir; onu dizinin yedinci yazısında ele alıyoruz.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
İyi bir güven altyapısında doğrulayıcı listeleri önceden indirir ve kararı yerel kopyaya bakarak verir. Böylece hem hızlı hem dayanıklı çalışır, liste işletmecisi de doğrulamalardan haberdar olmaz. Doğrulayıcı kimliği, yetkiyi, belgenin verildiği andaki durumu ve listenin tazeliğini kontrol eder. Liste bayatsa doğru cevap "şu an doğrulanamadı"dır.
]

= Güven Modellerini Yan Yana Koymak

Güven listeleri, "kime güveneceğiz?" sorusuna verilen tek cevap değil. Bu bölümde dört farklı modeli kısaca tanıtıp karşılaştırıyoruz. Her modelde aynı soruları soracağız: Çapa nerede, kim karar veriyor, kapsam sınırlı mı ve bir şey ters gittiğinde ne oluyor?

#{strong[Web’in sertifika sistemi.]} Bölüm 3’te anlattığımız model. Çapa, tarayıcı ve işletim sistemi üreticilerinin kök depolarıdır. Karar, bu üreticilerin kök programlarında ve CA\/Tarayıcı Forumu’nda verilir. Kapsam sınırı yoktur; her kök her alan adı için imza atabilir. Bir şey ters gittiğinde üreticiler kökü depodan çıkarır; şeffaflık günlükleri de sahte sertifikaların görünür olmasını sağlar.

#{strong[Pasaport çipleri.]} Bugün dünyadaki elektronik pasaportların çipindeki veriler, ülkenin #{strong[ülke imza sertifika makamı]} (#{emph[Country Signing Certificate Authority]}, CSCA) tarafından yönetilen bir zincirle imzalanır. Bu yapı, Uluslararası Sivil Havacılık Örgütü’nün (ICAO) makinece okunabilir seyahat belgeleri standardı Doc 9303’te tanımlanmıştır \[20\]. Ülkeler birbirlerinin kök sertifikalarını ikili alışverişle ya da ICAO’nun ortak açık anahtar dizini (#{emph[Public Key Directory]}, PKD) üzerinden edinir; bazı ülkeler ve gruplar ise doğruladıkları kök sertifikaları imzalı #{strong[ana listeler]} (#{emph[master list]}) hâlinde yayımlar. Bu modelin özelliği, çapanın her ülkenin kendi kararında durmasıdır. Bir sınır polisi, hangi ülkenin kökünü kabul edeceğine kendi devletinin kararıyla karar verir. Kapsam doğal olarak sınırlıdır; bir ülkenin kökü yalnızca o ülkenin pasaportlarını imzalar.

#{strong[Merkeziyetsiz tanımlayıcılar.]} Dizinin ilk yazısında anlattığımız kendi kendine egemen kimlik hareketi, güveni bir merkezden değil, #{strong[merkeziyetsiz tanımlayıcılardan]} (DID) \[21\] almayı önerdi. Bir kurumun DID’i çözüldüğünde açık anahtarı ortaya çıkar; bazı yöntemlerde bu bilgi bir blokzincirde, bazılarında bir web sunucusunda durur. DID, birinci soruya, yani "bu anahtar bu tanımlayıcıya ait mi?" sorusuna iyi bir cevap verir. Ama "bu tanımlayıcının arkasındaki kurum gerçekten bir üniversite mi ve diploma vermeye yetkili mi?" sorusu yine dışarıdan bir kayıt ister. SSI projeleri bu kaydı genellikle #{strong[güven kayıtları]} (#{emph[trust registry]}) ya da yönetişim çerçeveleri adıyla kurmaya çalıştı. Yani DID modeli, güven listesine ihtiyacı ortadan kaldırmaz; listenin içine ne yazılacağını değiştirir.

#{strong[Federasyon zincirleri.]} OpenID Vakfı’nın Şubat 2026’da son hâline gelen #{strong[OpenID Federation 1.0]} belirtimi \[22\], kuruluşların birbirlerini her biriyle ayrı ayrı anlaşma yapmadan tanımasını sağlayan bir yapı tanımlar. Her kuruluş kendisi hakkında imzalı bir açıklama yayımlar; bir üst makam (#{emph[trust anchor]} ya da ara makam) da onun hakkında imzalı bir açıklama yayımlar. Doğrulayıcı bu açıklamaları birleştirerek bir #{strong[güven zinciri]} kurar. Bu model, X.509 zincirlerinin JSON ve web dünyasına uyarlanmış bir akrabası gibi düşünülebilir; üstelik zincirdeki makamlar, alt kuruluşların ne yapabileceğine politika sınırları da koyabilir. AB’de bu yapıyı ulusal cüzdan ekosisteminin güven modeline temel alan ülkeler de var; İtalya’nın cüzdan belirtimleri güven modelini OpenID Federation 1.0 üzerine kurar \[26\].

#tablo([#{strong[Tablo 2.]} Dört güven modelinin karşılaştırması.], (16fr, 26fr, 27fr, 21fr, 26fr), ([Ölçüt], [Web sertifika sistemi], [AB güven listeleri], [Pasaport çipleri (ICAO)], [DID tabanlı modeller],), (
  ([Çapa nerede?], [tarayıcı ve işletim sistemi kök depoları], [Resmî Gazete’de ilan edilen LOTL imzacısı], [her devletin kabul ettiği ülke kökleri], [DID yöntemine göre: zincir, web sunucusu, anahtarın kendisi],),
  ([Kim karar veriyor?], [yazılım üreticileri, CA\/Tarayıcı Forumu], [üye devletlerin denetim makamları, Komisyon], [her devlet kendisi], [yöntemin ve güven çerçevesinin yönetişimi],),
  ([Ne listeleniyor?], [kök sertifikalar], [hizmetler, durumları ve geçmişleri], [ülke kökleri], [tanımlayıcılar ve anahtarlar],),
  ([Kapsam sınırı], [yok, her kök her alan adı için], [var, hizmet türüne göre], [var, ülkeye göre], [çerçeveye göre değişir],),
  ([Yetki bilgisi], [yalnızca alan adı kontrolü], [hizmet türü ve nitelikli statü], [yalnızca "bu ülke bu pasaportu verdi"], [güven kaydı varsa],),
  ([Geçmiş tutuluyor mu?], [şeffaflık günlüklerinde], [hizmet geçmişinde], [sınırlı], [yönteme göre],),
  ([Hukuki dayanak], [sözleşmeler, kök program kuralları], [eIDAS ve uygulama düzenlemeleri], [uluslararası sözleşme ve ulusal hukuk], [çoğunlukla yok],),
  ([Kişisel veri], [yok], [yok], [yok], [yönteme göre risk var],),
))

Tablodan çıkan sonuç, iyi bir güven modelinin iki şeyi birleştirmesi gerektiğidir: kimliği kanıtlayan #{strong[kriptografik zincir]} ve yetkiyi söyleyen #{strong[kurumsal karar]}. Web modeli birincisinde çok güçlü, ikincisinde zayıftır. DID modeli birincisini yeniden kurar ama ikincisini dışarıda bırakır. AB’nin güven listeleri ve pasaport sistemi ise ikisini birlikte taşır; kurumsal kararı, o kararı vermeye yetkili devlet makamlarına bağlar.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Her güven modeli bir çapa seçer ve bir karar mekanizması kurar. Fark, kararı kimin verdiğinde, kapsamın sınırlanıp sınırlanmadığında ve kararın hukuki bir dayanağı olup olmadığındadır. Kimlik belgeleri için "anahtar kimin?" sorusunun yanında "kurum neye yetkili?" sorusunun da cevabı gerekir.
]

= Liste İşletmecisinin Gücü ve Bu Gücün Sınırlanması

== Listeyi tutan, kapıyı tutar

Bir güven listesi, kimin sistemin içinde, kimin dışında kalacağını belirler. Listeye girmeyen bir üniversitenin diplomaları, matematiksel olarak ne kadar doğru imzalanmış olursa olsun, doğrulayıcılar tarafından kabul edilmez. Listeden çıkarılan bir kurum, bir gecede bütün dijital belgelerinin değerini kaybedebilir. Bu, liste işletmecisine büyük bir güç verir.

Bu gücün kötüye kullanılabileceği birkaç yol var. İşletmeci, siyasi ya da ticari nedenlerle bir kurumu listeye almayabilir ya da listeden çıkarabilir. Bir rakibi kayırabilir. Daha incelikli bir risk de #{strong[çift konuşma]}dır: İşletmeci, farklı doğrulayıcılara farklı listeler sunabilir; örneğin belirli bir ülkeden gelen isteklere bir kurumu "etkin", başka yerlerden gelenlere "geri çekilmiş" gösterebilir. Son olarak işletmecinin imza anahtarı ele geçirilirse, saldırgan sahte bir kurumu listeye ekleyebilir; bu, DigiNotar olayının liste düzeyindeki karşılığı olurdu.

== Sınırlamanın yolları

Avrupa’nın sistemi ve daha genel olarak iyi tasarlanmış güven altyapıları, bu gücü birkaç katmanla sınırlar.

#{strong[Hukuki sınır.]} AB’de ulusal listeyi yayımlayan makamın kararları idari kararlardır. Listeye alınmayan ya da listeden çıkarılan bir güven hizmeti sağlayıcısı bu karara karşı hukuki yollara başvurabilir. Hangi kuruluşun hangi şartla listeye gireceği de tüzükte ve uygulama düzenlemelerinde açıkça yazar; işletmeci keyfi bir ölçüt koyamaz.

#{strong[Bölünmüş güç.]} LOTL’u Komisyon imzalar, ama ulusal listelerin içeriğine Komisyon karar vermez. Bir ülkenin listesine hangi kuruluşun gireceğine o ülkenin denetim makamı karar verir. Böylece tek bir aktör bütün sistemin içeriğini belirleyemez. Pasaport sistemindeki "her ülke kendi kökünü kabul eder" ilkesi de aynı bölünmenin başka bir biçimidir.

#{strong[Şeffaflık.]} Listeler herkese açıktır. Bir listenin her sürümü sıra numarası taşır ve eski sürümler arşivlenir. Herkes, örneğin bir araştırmacı ya da bir gazeteci, listelerin zaman içinde nasıl değiştiğini izleyebilir. Bölüm 3.5’teki sertifika şeffaflığı günlüklerinden öğrendiğimiz ders burada da geçerlidir: Bir işletmecinin yanlış bir şey yapmasını tamamen engelleyemeyebilirsiniz, ama yaptığı şeyin #{strong[gizli kalmasını]} engelleyebilirsiniz. Çift konuşmaya karşı en etkili önlem de budur. Bir işletmeci farklı doğrulayıcılara farklı listeler sunarsa, aynı sıra numarasına sahip iki farklı imzalı liste ortaya çıkar; bu, işletmecinin kendi imzasıyla kanıtlanmış bir sahtekârlık olur.

#{strong[Geçmişin silinmemesi.]} Durum değişikliklerinin silinmeden geçmişe yazılması, işletmecinin "bu kurum hiç listede olmadı" diyerek geçmişi yeniden yazmasını engeller. Bir kurum listeden çıkarılmışsa, ne zaman ve hangi durumla çıkarıldığı kayıtta kalır.

#{strong[Anahtar disiplini.]} İşletmecinin imza anahtarı güvenli donanımda saklanır, birden fazla anahtar dönüşümlü kullanılır ve anahtar değişiklikleri önceden duyurulur. Bölüm 4.4’teki pivot LOTL yöntemi, anahtar değişikliğinin bile kesintisiz bir imza zinciriyle yapılmasını sağlar.

#{strong[Kapsam sınırı.]} Bir liste yalnızca kendi alanındaki kuruluşlar için söz söyleyebilir. Eğitim kurumlarını listeleyen bir makam, kimlik verisi sağlayıcısı ekleyemez; cüzdan sağlayıcılarını sayan bir liste, bir bankanın neyi isteyebileceğine karar veremez. Web modelindeki "her kök her şey için imza atabilir" esnekliğinin tersine, iyi bir güven listesi her işletmecinin yetkisini kendi alanıyla sınırlar.

#kutu("ornek", [Bir kurum listeden çıkarılırsa])[
Bir öğrenci belgesi veren kurumun imza anahtarının 1 Mart’ta çalındığı anlaşılsın. Liste işletmecisi, kurumun kaydını "geri çekildi" durumuna alır ve geri çekilmenin 1 Mart’tan itibaren geçerli olduğunu yazar. Aynı gün yayımlanan yeni liste sürümü, önceki sürümün özetini taşır; eski kayıt geçmiş bölümünde kalır.

Doğrulayıcılar yeni listeyi bir sonraki indirmelerinde alır. 1 Mart’tan sonra imzalanmış görünen belgeler reddedilir. Daha önce imzalanmış görünen belgeler için ise karar, Bölüm 7.2’de tartıştığımız soruya bağlıdır: Belgenin gerçekten o tarihte verildiğini bağımsız olarak kanıtlayan bir kayıt var mı? Yoksa temkinli bir işletmeci kurumun bütün belgelerini geçersiz sayabilir ve kurum, yeni bir anahtarla öğrencilerine belgelerini yeniden verir. Her iki durumda da bu karar herkesin görebileceği bir listede, tarihiyle birlikte yayımlanır.
]

= Sınırlar ve Açık Sorular

Güven listeleri yirmi yıla yakın bir süredir Avrupa’da işliyor ve olgun bir sistem. Ama cüzdan dönemiyle birlikte yeni sorular da ortaya çıktı. Bu bölümde, bu yazı dizisinin ilerleyen bölümlerinde de karşımıza çıkacak olanları sıralıyoruz.

#{strong[AB dışındaki ülkeler.]} Aynur’un diploması Azerbaycan’dan geliyor ve Azerbaycan’ın listesi LOTL’da yok. eIDAS’ın 14. maddesi, üçüncü ülkelerde kurulmuş güven hizmeti sağlayıcılarının, AB ile o ülke arasında yapılacak bir anlaşma yoluyla tanınabileceğini öngörür. Bu yol uzun ve siyasi bir süreçtir. Daha hızlı bir adım olarak Komisyon, üçüncü ülkelerin gelişmiş elektronik imza ve mühür hizmetlerini toplayan ayrı bir liste olan #{strong[TC AdES LOTL]}’u yayımlamaya başladı; bugün bu listede Ukrayna ve Moldova’nın güven listeleri yer alıyor \[23\]. Bu liste, o ülkenin imzalarının AB’deki araçlarla teknik olarak doğrulanmasını sağlar; nitelikli imzaya tanınan hukuki eşdeğerliği kendiliğinden getirmez. Cüzdan belgeleri için ise üçüncü ülkelerin bu ekosisteme nasıl katılacağı henüz belirsiz. Dizinin on birinci ve on üçüncü yazıları bu konuya ayrılacak.

#{strong[İki biçimin birlikte yaşaması.]} TS 119 612 XML biçimi yıllardır işliyor, TS 119 602 JSON biçimi ise yeni. Cüzdan ekosistemi için yazılan yazılımlar büyük olasılıkla JSON listeleri, imza doğrulama araçları XML listeleri okuyacak. İki biçimin aynı bilgiyi tutarlı biçimde taşıması, geçiş döneminin pratik bir sorunu olarak kalıyor.

#{strong[Kaydın kalitesi.]} Güvenen taraf kaydı, ancak kayıt sırasında beyan edilen amacın gerçekten incelendiği ölçüde koruma sağlar. Bir kayıt kurumu her başvuruyu otomatik kabul ederse, kayıt sertifikası yalnızca kurumun kendi beyanını imzalı hâle getirir. Üye devletlerin bu incelemeyi ne derinlikte yapacağı ve farklı ülkelerdeki uygulamaların ne kadar tutarlı olacağı zamanla görülecek.

#{strong[Liste işletmecisinin anahtarı.]} Bütün sistemin güveni sonunda birkaç imza anahtarına dayanır. Bu anahtarların güvenli donanımda tutulması ve değişikliklerinin pivot zinciriyle yapılması önemli bir korumadır. Yine de bir LOTL imzacısının ele geçirilmesi, bütün Avrupa’yı etkileyecek bir olay olurdu ve böyle bir olayın nasıl yönetileceği, uygulamada hiç sınanmamış bir senaryodur.

#{strong[Küçük kurumlar.]} Bir köy okulu ya da küçük bir meslek odası, kendi imza anahtarını güvenli biçimde yönetecek kaynağa her zaman sahip değildir. Bu kurumların belge vermesi için bir aracıya ihtiyaç duyulabilir. Aracı kullanıldığında ise listede kimin adının yazacağı, anahtarın kimde duracağı ve sorumluluğun kime ait olacağı soruları ortaya çıkar.

#{strong[Kuantum sonrası dönem.]} Bugünkü güven listelerinin hepsi, kuantum bilgisayarlar karşısında zayıf kalacağı bilinen imza algoritmalarıyla imzalanıyor. Liste imzaları kısa ömürlüdür ve yenilenebilir, ama listelerin gösterdiği kök sertifikalar yıllarca kullanılır. Bu geçişin nasıl planlanacağı dizinin son yazısının konusu.

= Bu Tablonun İçinde Tamga Network

Bu yazı dizisi Tamga Network tarafından yayımlanıyor. Güven listeleri, Tamga Network’ün işinin tam merkezinde durduğu için, bu bölümde ağın bu konudaki tasarımını kamuya açık belgelerine dayanarak biraz daha ayrıntılı anlatıyoruz.

Tamga Network, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır ve AB’nin eIDAS 2.0 \/ EUDI profillerini temel alır. Ağın güveni, ETSI TS 119 612 modelini izleyen #{strong[imzalı ve sürümlü güven listelerine]} dayanır \[24\]. Yapı, Bölüm 4.3’te anlattığımız AB yapısıyla aynı iki katmanı kullanır. En üstte bir #{strong[listeler listesi]} (LOTL) durur; bu liste ülke listelerinin adreslerini ve onları imzalayan sertifikaları, tanınan cüzdan sağlayıcılarını ve ortak belge türü kataloğunu taşır. Altında ülke listeleri bulunur; bugün yayımlanan Türkiye listesi, belge veren kurumları, kayıtlı doğrulayıcıları ve kök sertifikaları sayar. Listeler JSON biçimindedir ve JWS ile imzalanır.

Bu tasarımın birkaç özelliği, bu yazıda tartıştığımız sorulara doğrudan karşılık gelir:

- #{strong[Tek güven çapası.]} Cüzdan ve doğrulayıcı baştan yalnızca bir şeye güvenir: LOTL’u imzalayan kökün parmak izine. Bu parmak izi ağın sitesinde ilan edilir ve yazılımın yapılandırmasına sabitlenir; gerisini listeler söyler.
- #{strong[Sürüm zinciri ve tazelik.]} Her listenin sürüm numarası yalnızca artar ve her sürüm bir öncekinin özetini taşır; böylece eski bir liste yeniymiş gibi sunulamaz. Her listede bir sonraki güncelleme tarihi yazar; listeler değişiklik olmasa da en geç 90 günde bir yeniden imzalanır. Liste bayatsa ya da erişilemiyorsa doğrulama sonucu "reddedildi" olmaz, "doğrulanamadı" olur.
- #{strong[Yetki ve geçmiş.]} Belge veren kurumun kaydı, hangi belge türlerini hangi zaman aralığında vermeye yetkili olduğunu yazar. Durum değişiklikleri silinmez, geçmişe eklenir; doğrulayıcı kurumun durumuna belgenin verildiği tarihe göre bakar.
- #{strong[Kişisel veri yok.]} Listelerde yalnızca kurum adları, sertifika parmak izleri, durumlar, tarihler ve adresler bulunur.
- #{strong[Geçici işletmecilik ve devir.]} Türkiye listesini bugün Tamga, ulusal makam adına ve geçici olarak yayımlar; listede bu durum açıkça yazar. Devlet ya da yetkilendirdiği bir kurum kendi listesini yayımlamaya başladığında LOTL yalnızca o listenin adresini ve imzacısını gösterecek biçimde değişir; kurum kimlikleri ve verilmiş belgeler geçerli kalır.
- #{strong[Federasyon ve kapsam sınırı.]} Her Türk devleti kendi listesini işletebilir; LOTL bunları bir araya getirir. Dış listeler (örneğin AB’nin ETSI biçimindeki listeleri) LOTL’a eklenebilir, ama yalnızca kendi kapsamındaki rollere kefil olabilir. Bugün LOTL’da dış liste yoktur ve her ekleme ayrı bir onay gerektirir.

Ülke listesinin aynı kayıtları taşıyan bir #{strong[ETSI TS 119 612 XML görünümü]} de üretilir ve XAdES ile imzalanır; bu görünüm bugün ağın test ortamında yayımlanıyor \[25\]. Ağın belgeleri bu görünüm hakkında açık bir sınır çizer: Bu XML listesi, AB tüzüğü kapsamında bildirilmiş bir liste değildir, içinde nitelikli güven hizmeti yoktur ve AB’nin "üye devletçe bildirilmiş" anlamı taşıyan URI’leri yerine Tamga’nın kendi tanımladığı liste türü ve durum URI’leri kullanılır. Bölüm 5.2’de anlattığımız, standardın AB dışındaki işletmecilere tanıdığı esneklik budur.

Yani Tamga Network, bu yazının Bölüm 10’da açık bıraktığı ilk soruya, #{strong[AB dışındaki ülkeler için ortak bir güven altyapısı]} sorusuna, AB’nin kendi standartlarıyla uyumlu bir cevap üretmeye çalışıyor. Ağın kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayıcıları listeler. Ağın belgelerinde ileride birden fazla bağımsız işletmeci katıldığında aynı kayıtların ortak bir deftere taşınabileceği yazar; bugün ise böyle bir zincir yoktur ve güvenin kaynağı imzalı listelerdir.

= Sonuç

Bu yazıya bir duraksamayla başladık. Timur’un ekranında yeşil bir işaret yanıyordu ve işaret doğruydu; imza gerçekten geçerliydi. Ama imzanın geçerli olması, Timur’un asıl sorusunu cevaplamıyordu: Bu anahtar kimin, o kurum bu belgeyi vermeye yetkili mi ve bugün hâlâ yetkili mi?

Bu soruların cevabını aramak bizi yarım asra yakın bir yolculuğa çıkardı. Kohnfelder’in sertifika fikri, güveni çevrimdışı taşınabilir hâle getirdi. Web’in sertifika sistemi bu fikri dünya ölçeğine taşıdı, ama her kökün her şey için imza atabildiği esnek yapısı, DigiNotar gibi olaylarla sınırlarını gösterdi. Avrupa ise farklı bir yol seçti. Güvenin kaynağını yazılım üreticilerinin kök programlarından alıp devletlerin denetim makamlarına bağladı. Ulusal listeleri bir listeler listesinde topladı, o listenin imzacısını Resmî Gazete’de ilan etti ve listelere yalnızca "kim" sorusunun değil "neye yetkili" ve "ne zamandan beri" sorularının cevabını da yazdı. Cüzdan dönemiyle birlikte aynı mantık yeni rollere genişledi; artık belgeyi isteyen de kim olduğunu ve neyi neden isteyebileceğini kanıtlamak zorunda.

Bu yolculuğun belki en önemli dersi, güvenin hiçbir zaman tamamen matematikten gelmediğidir. Matematik, bir imzanın sahte olmadığını kanıtlar. Ama kimin güvenilir olduğuna, bir toplumun ortak kurumları karar verir. İyi bir güven altyapısı bu kararı saklamaz; imzalı, sürümlü, geçmişi silinmeyen ve herkesin okuyabileceği bir listeye yazar. Dizinin ilk yazısında anlattığımız bozkırdaki tamga da böyle işliyordu: Gücü, çizginin kendisinden değil, o çizginin kime ait olduğunu herkesin bilmesinden geliyordu.

Dizinin bir sonraki yazısında, bu yazıda yalnızca kurum düzeyinde ele aldığımız "durum" sorusunu tek tek belgelere indireceğiz: Bir belge iptal edildiğinde doğrulayıcı bunu nasıl öğrenir ve veren kurum, belgenin nerede gösterildiğini öğrenmeden bunu nasıl duyurabilir?

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Diffie, W. ve Hellman, M. E. (1976). "New Directions in Cryptography." #{emph[IEEE Transactions on Information Theory]}, 22(6), 644–654.]

#kaynak("2")[Kohnfelder, L. M. (1978). #{emph[Towards a Practical Public-key Cryptosystem.]} Lisans tezi, Massachusetts Institute of Technology, Mayıs 1978.]

#kaynak("3")[Cooper, D., Santesson, S., Farrell, S., Boeyen, S., Housley, R. ve Polk, W. (2008). #{emph[Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.]} IETF RFC 5280.]

#kaynak("4")[CA\/Browser Forum. #{emph[Baseline Requirements for the Issuance and Management of Publicly-Trusted TLS Server Certificates.]} cabforum.org (yaşayan belge; ilk sürümü 2011’de kabul edildi).]

#kaynak("5")[Fox-IT (2012). #{emph[Black Tulip: Report of the investigation into the DigiNotar Certificate Authority breach.]} Hollanda İçişleri Bakanlığı için hazırlanan rapor, Ağustos 2012.]

#kaynak("6")[Laurie, B., Langley, A. ve Kasper, E. (2013). #{emph[Certificate Transparency.]} IETF RFC 6962, Haziran 2013.]

#kaynak("7")[CA\/Browser Forum (2025). #{emph[Ballot SC-081v3: Introduce Schedule of Reducing Validity and Data Reuse Periods.]} Nisan 2025.]

#kaynak("8")[Avrupa Komisyonu (2009). #{emph[2006\/123\/AT sayılı Direktif kapsamında tek temas noktaları aracılığıyla elektronik yollarla işlemleri kolaylaştıran önlemleri belirleyen 16 Ekim 2009 tarihli 2009\/767\/AT sayılı Komisyon Kararı.]}]

#kaynak("9")[Avrupa Parlamentosu ve Konseyi (2014). #{emph[İç pazarda elektronik işlemler için elektronik kimlik ve güven hizmetlerine ilişkin 910\/2014 sayılı Tüzük (AB) (eIDAS).]} Avrupa Birliği Resmî Gazetesi, L 257, 28 Ağustos 2014.]

#kaynak("10")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024.]

#kaynak("11")[Avrupa Komisyonu. #{emph[EU List of Trusted Lists ve pivot LOTL açıklaması.]} ec.europa.eu\/tools\/lotl (erişim Kasım 2026).]

#kaynak("12")[Avrupa Komisyonu (2015). #{emph[Güven listelerine ilişkin teknik şartname ve biçimleri belirleyen 8 Eylül 2015 tarihli 2015\/1505 sayılı Uygulama Kararı (AB).]} 2025\/2164 sayılı Uygulama Kararı ile değişik.]

#kaynak("13")[ETSI (2025). #{emph[ETSI TS 119 612 V2.4.1 — Electronic Signatures and Trust Infrastructures (ESI); Trusted Lists.]} Ağustos 2025.]

#kaynak("14")[ETSI (2025). #{emph[ETSI TS 119 602 V1.1.1 — Electronic Signatures and Trust Infrastructures (ESI); Lists of trusted entities; Data model.]} Kasım 2025.]

#kaynak("15")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanları ekosistemine ilişkin bildirimler bakımından kuralları belirleyen 2024\/2980 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024. Ayrıca: 2025\/1569 sayılı Uygulama Tüzüğü (AB), 29 Temmuz 2025.]

#kaynak("16")[Avrupa Komisyonu (2025). #{emph[Cüzdan güvenen taraflarının kaydına ilişkin 2025\/848 sayılı Uygulama Tüzüğü (AB).]} 6 Mayıs 2025; 2026\/1730 sayılı Uygulama Tüzüğü (AB) ile değişik, 15 Temmuz 2026.]

#kaynak("17")[ETSI (2025). #{emph[ETSI TS 119 411-8 V1.1.1 — Policy and security requirements for Trust Service Providers issuing certificates; Part 8: Access Certificate Policy for EUDI Wallet Relying Parties.]} Ekim 2025.]

#kaynak("18")[ETSI (2026). #{emph[ETSI TS 119 475 V1.2.1 — Relying party attributes supporting EUDI Wallet user’s authorisation decisions.]} Mart 2026.]

#kaynak("19")[ETSI. #{emph[ETSI EN 319 102-1 — Procedures for Creation and Validation of AdES Digital Signatures; Part 1: Creation and Validation.]} (güncel sürüm).]

#kaynak("20")[ICAO (2021). #{emph[Doc 9303 — Machine Readable Travel Documents, Part 12: Public Key Infrastructure for MRTDs.]} Sekizinci baskı.]

#kaynak("21")[W3C (2022). #{emph[Decentralized Identifiers (DIDs) v1.0.]} W3C Recommendation, 19 Temmuz 2022.]

#kaynak("22")[Hedberg, R., Jones, M. B., Solberg, A. Å., Bradley, J., De Marco, G. ve Dzhuvinov, V. (2026). #{emph[OpenID Federation 1.0.]} OpenID Foundation, Şubat 2026.]

#kaynak("23")[Avrupa Komisyonu. #{emph[Third Countries AdES List of Trusted Lists (TC AdES LOTL).]} ec.europa.eu\/tools\/lotl\/mra\/ades-lotl.xml (erişim Kasım 2026).]

#kaynak("24")[Tamga Network. #{emph[Tamga Network depo tanıtımı ve kavram belgeleri: "Güven listeleri ve federasyon", "Federasyon".]} tamga.network ve docs.tamga.network\/concepts (erişim Kasım 2026).]

#kaynak("25")[Tamga Network. #{emph[ETSI XML güven listesi.]} docs.tamga.network\/concepts\/etsi-trusted-list (erişim Kasım 2026).]

#kaynak("26")[İtalya IT-Wallet teknik belirtimleri. #{emph[Trust Model]} bölümü. italia.github.io\/eid-wallet-it-docs (erişim Kasım 2026).]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Avrupa Komisyonu’nun "EU Trusted Lists" sayfaları.]} Güven listelerinin ne olduğunu, LOTL’un nasıl işlediğini ve pivot yöntemini kısa açıklamalarla anlatır. Komisyon’un çevrimiçi liste tarayıcısında ulusal listelerin içine bakmak da mümkündür.
+ #{strong[Fox-IT, #{emph[Black Tulip]} raporu (2012).]} DigiNotar olayının ayrıntılı incelemesi. Web modelinin zayıf noktalarını somut bir olay üzerinden anlamak için en iyi kaynak.
+ #{strong[RFC 6962, Certificate Transparency (2013), giriş bölümleri.]} Şeffaflık günlüğü fikrinin neden ortaya çıktığını ve "engelleyemiyorsan görünür kıl" ilkesini sade bir dille anlatır.
+ #{strong[ETSI TS 119 602’nin giriş ve kapsam bölümleri.]} Güvenilen kuruluş listesinin neden genelleştirildiğini ve AB profillerinin neyi listelediğini birkaç sayfada özetler.
+ #{strong[EUDI ARF’nin güven modeli bölümleri.]} Cüzdan ekosisteminde kimin kimi hangi listeyle doğruladığını resmî tanımlarıyla verir.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. Teknik terimlerin İngilizce karşılıkları, başka kaynaklarda aranabilmeleri için parantez içinde verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (15fr, 20fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Açık anahtar altyapısı], [public key infrastructure (PKI)], [Açık anahtarları sertifikalarla kişi ve kurumlara bağlayan kurallar, kurumlar ve yazılımlar bütünü],),
  ([Ara sertifika], [intermediate certificate], [Kök ile yaprak arasında duran, başka sertifikaları imzalamaya yetkili sertifika],),
  ([Belirsiz sonuç], [indeterminate], [Belgenin geçerli ya da geçersiz olduğunun şu an kanıtlanamadığı doğrulama sonucu],),
  ([Erişim sertifikası], [access certificate (WRPAC)], [Güvenen tarafın kim olduğunu cüzdana kanıtlayan X.509 sertifikası],),
  ([Güven çapası], [trust anchor], [Doğrulayıcının başka hiçbir şeye dayanmadan önceden güvendiği anahtar ya da sertifika],),
  ([Güven hizmeti sağlayıcısı], [trust service provider (TSP)], [Elektronik imza, mühür, zaman damgası gibi güven hizmetleri sunan kuruluş],),
  ([Güven listesi], [trusted list], [Hangi kuruluşun hangi hizmette yetkili olduğunu, durumunu ve geçmişini söyleyen imzalı liste],),
  ([Güvenen taraf], [relying party], [Belgeye dayanarak karar veren, cüzdandan bilgi isteyen kurum],),
  ([Güvenilen kuruluş listesi], [list of trusted entities (LoTE)], [ETSI TS 119 602’nin tanımladığı, her tür güvenilen kuruluşu sayan liste biçimi],),
  ([Hizmet geçmişi], [service history], [Bir hizmetin önceki durumlarının başlangıç tarihleriyle tutulduğu, silinmeyen kayıt],),
  ([Kayıt kurumu], [registrar], [Güvenen tarafları kaydeden ve ulusal sicili tutan kurum],),
  ([Kayıt sertifikası], [registration certificate (WRPRC)], [Güvenen tarafın neyi, hangi amaçla isteyebileceğini söyleyen sertifika],),
  ([Kök sertifika], [root certificate], [Zincirin en üstündeki, kendi kendini imzalayan sertifika],),
  ([Kök program], [root program], [Tarayıcı ve işletim sistemi üreticilerinin hangi sertifika otoritesine güvenileceğine karar verdiği süreç],),
  ([Listelerin listesi], [list of trusted lists (LOTL)], [Ulusal güven listelerinin adreslerini ve imzacılarını toplayan üst liste],),
  ([Nitelikli güven hizmeti], [qualified trust service], [eIDAS’ın sıkı şartlarını karşılayan ve denetim makamınca onaylanan güven hizmeti],),
  ([Pivot LOTL], [pivot LOTL], [İmzacı ya da adres değiştiğinde arşivlenen ve yeni imzacıları zincirle bağlayan LOTL kopyası],),
  ([Sertifika], [certificate], [Bir otoritenin "bu açık anahtar şu ada aittir" cümlesini imzaladığı belge],),
  ([Sertifika otoritesi], [certificate authority (CA)], [Sertifika veren kuruluş],),
  ([Sertifika şeffaflığı], [certificate transparency (CT)], [Verilen her sertifikanın herkese açık, yalnızca eklenebilen günlüklere yazılması],),
  ([Sonraki güncelleme], [next update], [Bir listenin en geç ne zaman yenileneceğini gösteren tarih; geçtiyse liste bayattır],),
  ([Tazelik], [freshness], [Doğrulayıcının elindeki bilginin ne kadar yeni olduğu],),
  ([Yaprak sertifika], [end-entity certificate], [Zincirin en altında, belgeyi ya da bağlantıyı imzalayan anahtarın sertifikası],),
  ([XAdES \/ JAdES], [XML \/ JSON advanced electronic signatures], [XML ve JSON belgeleri için tanımlanmış gelişmiş elektronik imza biçimleri],),
))

// A5 — Bağlanamazlık. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Bağlanamazlık",
  altbaslik: "Doğrulayıcılar Seni Birbirine Anlatmasın",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Aralık 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("bağlanamazlık", "bağlanabilirlik", "mahremiyet", "toplu belge verme", "tek kullanımlık belge", "takma ad", "sürü gizliliği", "durum listesi", "sıfır bilgi ispatı", "eIDAS 2.0", "EUDI cüzdanı",),
  atif: "Karataş, B. (2026). Bağlanamazlık: Doğrulayıcılar Seni Birbirine Anlatmasın. Tamga Network Akademik Çalışmalar, A5. https://tamga.network/files/publications/unlinkability-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Dijital kimlik cüzdanları kişiye büyük bir güç verir: Bir belgenin tamamını değil yalnızca gereken alanını gösterebilir, kimliğini açmadan bir koşulu sağladığını kanıtlayabilir. Ama gösterilen her belge, kişinin farkında olmadığı bazı değerleri de beraberinde taşır: veren kurumun imzası, belgenin bağlı olduğu anahtar, özetler, iptal listesindeki sıra numarası, verilme zamanı. Bu değerler her gösterimde aynıysa, belgeyi gören iki kurum bir gün kayıtlarını karşılaştırıp "bu ikimizin müşterisi aynı kişi" diyebilir. Bir kişinin hayatının farklı bağlamlarını birbirine eklemenin adı bağlanabilirliktir; bunu imkânsız ya da çok zor kılmanın adı ise bağlanamazlık.

Bu yazı bağlanamazlığı hiçbir ön bilgi varsaymadan anlatıyor. Önce bağlamanın neden tanımlamaktan farklı ama ondan daha az tehlikeli olmadığını gösteriyor, sonra kimin kimi bağlayabileceğini (doğrulayıcılar birbirini, veren kurum doğrulayıcıları, cüzdan sağlayıcı herkesi) ve bir belgenin hangi alanlarının iz bıraktığını sınıflıyor. Ardından bugün kullanılan çözümleri, yani toplu verilen tek kullanımlık kopyaları, siteye özel takma adları, iptal listelerinde rastgele sıra ve sürü gizliliğini, son olarak da sıfır bilgi ispatlarını karşılaştırıyor. Avrupa Birliği’nin eIDAS 2.0 tüzüğünün ve cüzdan mimari çerçevesinin bu konuda ne istediğini, hangi soruların hâlâ açık olduğunu tartışıyor.
  ],
)

= Giriş: Aynı Kişi Olduğunu Kim Söyledi?

Aynur yüksek lisansını bitirdi ve İstanbul’da iş arıyor. Bir hafta içinde dijital kimlik cüzdanını beş farklı yerde kullanıyor. Pazartesi bir bankada maaş hesabı açıyor ve kimlik belgesini gösteriyor. Salı bir emlak sitesinde kiralık ev başvurusu yapıyor; site kimliğinin yanında yüksek lisans diplomasını da görmek istiyor. Çarşamba iki farklı şirketin iş ilanına başvuruyor; ikisi de diplomayı istiyor. Cuma bir spor salonuna üye oluyor ve yalnızca 18 yaşından büyük olduğunu kanıtlıyor.

Her gösterimde Aynur yalnızca istenen alanları paylaşıyor; dizinin üçüncü yazısında anlattığımız seçici açıklama sayesinde spor salonu adını öğrenmiyor, emlak sitesi not ortalamasını görmüyor. Aynur’un hiçbir kurumla gereğinden fazla bilgi paylaşmadığını düşünmek için iyi nedenleri var.

Altı ay sonra emlak sitesi ile iş ilanı sitelerinden biri aynı veri aracısına veri satıyor. Aracı iki kaydı yan yana koyuyor ve bir şey fark ediyor: İki sitenin aldığı diploma belgesi, aynı imza değerini ve aynı cihaz anahtarını taşıyor. Aracı bu iki kaydın aynı kişiye ait olduğunu kesin olarak biliyor. Emlak sitesinden Aynur’un hangi semtte, hangi fiyata ev aradığını, iş sitesinden hangi pozisyonlara başvurduğunu öğreniyor. Birleşen bu profil, iki kaydın hiçbirinde tek başına bulunmayan bir şey söylüyor: Aynur’un ne kadar kazanmayı beklediği ve nerede yaşamak istediği.

Bu senaryoda kimse yasa dışı bir veri istemedi; Aynur da kimseye gereğinden fazlasını vermedi. Sorunun kaynağı, belgenin her gösterimde taşıdığı ve Aynur’un hiç görmediği teknik değerlerdi. Bu değerler bir parmak izi gibi çalıştı ve iki ayrı bağlamı birbirine bağladı (Şekil 1).

#sekil(1, [İki doğrulayıcı notlarını karşılaştırınca: aynı teknik değerler aynı kişiyi ele verir], "figures/a5/sekil-1.svg", yarim: false)

Bu yazının konusu, bu tür bağlantıları imkânsız ya da çok zor kılmaktır. Bunun teknik adı #{strong[bağlanamazlıktır]} (#{emph[unlinkability]}). Dizinin ilk yazısında üçgen modelin en büyük kazancının, belgeyi veren kurumun belgenin nerede gösterildiğini öğrenmemesi olduğunu söylemiştik. Bağlanamazlık bu kazancı bir adım ileri taşır: Belgeyi gören kurumlar da, bir araya gelseler bile, aynı kişiyle iş yaptıklarını öğrenmemelidir. Dizinin dördüncü yazısında anlattığımız sıfır bilgi ispatları bu soruna matematiksel olarak en temiz cevabı verir; ama bugün sahadaki cüzdanların çoğu başka, daha basit yöntemler kullanıyor. Bu yazı o yöntemlerin hepsini yan yana koyuyor.

Yazının planı şöyle. Bölüm 2 bağlanabilirliği tanımlıyor ve neden yalnızca kimlik açılmasından ibaret bir sorun olmadığını gösteriyor. Bölüm 3 kimin kimi bağlayabileceğini, Bölüm 4 bir belgenin hangi alanlarının iz bıraktığını sınıflıyor. Bölüm 5 toplu kopyaları ve tek kullanımlık belgeleri, Bölüm 6 siteye özel takma adları, Bölüm 7 iptal listelerinin bağlanabilirlikle ilişkisini, Bölüm 8 sıfır bilgi ispatlarının neden henüz yaygınlaşmadığını anlatıyor. Bölüm 9 hukuki çerçeveyi, Bölüm 10 yöntemlerin karşılaştırmasını, Bölüm 11 açık soruları ele alıyor. Bölüm 12 Tamga Network’ün bu alandaki yaklaşımını kısaca anlatıyor.

= Bağlamak, Tanımaktan Neden Daha Az Masum Değil?

== Birkaç kavramı ayırmak

Mahremiyet alanında birbirine yakın birkaç kavram sık karıştırılır. Bu alanda en çok başvurulan terim çalışmalarından biri, Andreas Pfitzmann ve Marit Hansen’in yıllar içinde güncelledikleri "mahremiyet terminolojisi" belgesidir \[1\]. Oradaki tanımları sadeleştirerek kullanalım.

#{strong[Anonimlik]} (#{emph[anonymity]}), bir kişinin belirli bir grup içinde tanımlanamamasıdır. Spor salonu Aynur’un adını bilmiyorsa, Aynur o salonun üyeleri arasında anonimdir.

#{strong[Takma adlılık]} (#{emph[pseudonymity]}), kişinin gerçek adı yerine bir takma adla tanınmasıdır. Spor salonu Aynur’u "üye 4821" olarak tanır; her gelişinde aynı kişi olduğunu bilir ama kim olduğunu bilmez.

#{strong[Bağlanamazlık]} (#{emph[unlinkability]}), iki ya da daha fazla olayın (iki gösterim, iki mesaj, iki işlem) aynı kişiye ait olup olmadığının, dışarıdan bakan biri için, en baştaki tahmininden daha iyi bilinememesidir. Tanımdaki son kısım önemlidir. Bağlanamazlık "hiçbir şey bilinmez" demek değildir; gözlemcinin iki olayı görmeden önceki tahmini neyse, gördükten sonra da aşağı yukarı odur.

#{strong[Gözlemlenemezlik]} (#{emph[unobservability]}), bir olayın gerçekleştiğinin bile fark edilmemesidir. Örneğin veren kurumun, belgenin herhangi bir yerde gösterildiğini bile öğrenmemesi.

Bu kavramlar birbirinin içine geçer, ama aralarındaki fark gerçek bir farktır. Aynur spor salonunda takma adlıdır ama tek bir salon içinde bağlanabilir: Salon onun hangi günler geldiğini bir takma ad altında biriktirir. Bu çoğu zaman meşrudur, çünkü salon üyelik hizmeti veriyor. Sorun, Aynur’un spor salonundaki takma adı ile emlak sitesindeki kaydının birbirine bağlanabilmesidir. İyi tasarlanmış bir sistem, aynı bağlam içinde gerektiği kadar tanınmayı, bağlamlar arasında ise bağlanamazlığı sağlar. Dizinin ilk yazısında kimliği "bir varlığa ait özniteliklerin belirli bir bağlamdaki toplamı" olarak tanımlamış ve bir insanın bağlama göre değişen birçok kısmi kimliği olduğunu söylemiştik. Bağlanamazlık, bu kısmi kimlikleri birbirinden ayrı tutan teknik özelliktir. IETF’in internet protokollerinin mahremiyetini değerlendirmek için yayımladığı rehber de ilişkilendirmeyi (#{emph[correlation]}) ve tanımlamayı ayrı tehditler olarak sayar \[20\].

== Bağlantı, kimliği açığa çıkarır

İlk bakışta bağlanabilirlik, kimliğin doğrudan açıklanmasından daha az ciddi bir sorun gibi görünebilir. Emlak sitesi ile iş sitesi Aynur’un adını bilmiyorsa, iki kaydı birleştirmeleri ne zarar verir?

Mahremiyet araştırmalarının son yirmi beş yılı bu sorunun cevabını açık biçimde verdi: Yeterince bağlam birleştirildiğinde, isim gerekmez. 2000’de yayımlanan bir çalışma, Amerika Birleşik Devletleri nüfusunun yaklaşık yüzde 87’sinin yalnızca üç bilgiyle, yani posta kodu, cinsiyet ve doğum tarihiyle tek başına ayırt edilebildiğini tahmin etti \[2\]. 2013’te yayımlanan bir başka çalışma, bir buçuk milyon kişinin on beş aylık telefon konum verisini inceledi ve kişilerin yüzde 95’inin, saat ve yaklaşık konum içeren yalnızca dört veri noktasıyla tek başına ayırt edilebildiğini buldu \[3\]. 2010’daki bir başka çalışmada, bir web sitesini ziyaret eden tarayıcıların büyük çoğunluğunun, yalnızca tarayıcının kendiliğinden gönderdiği teknik bilgilerle (yazı tipleri, ekran boyutu, eklentiler) tek başına ayırt edilebildiği gösterildi \[4\].

Bu bulguların ortak dersi şudur: Her biri tek başına "anonim" görünen kayıtlar birbirine bağlandıkça, birleşik kayıt giderek daha az sayıda insana uyar ve sonunda tek bir insana iner. Bağlamak, tanımlamanın en yaygın yoludur. Bu yüzden bağlanamazlık, seçici açıklamanın ve veri en aza indirmenin tamamlayıcısıdır; biri olmadan öbürü yarım kalır.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Bağlanamazlık, iki olayın aynı kişiye ait olup olmadığının dışarıdan bilinememesidir. Bir kişinin adı hiç açıklanmasa bile, farklı bağlamlardaki kayıtları birleştirilebiliyorsa, birleşik kayıt kısa sürede onu tanımlar. Seçici açıklama #{strong[ne]} gösterildiğini sınırlar; bağlanamazlık, gösterilenlerin #{strong[birbirine eklenmesini]} sınırlar.
]

== Bağlantının gündelik sonuçları

Bağlanabilirliğin zararı çoğu zaman tek bir olayda görünmez; birikerek ortaya çıkar. Birkaç örnek bunu somutlaştırabilir.

Bir sigorta şirketi, bir müşterisinin aynı belge kopyasıyla bir spor salonuna değil de bir sigara satış sitesine yaşını kanıtladığını öğrenirse, prim hesabını buna göre değiştirmek isteyebilir. Bir işveren, adayın başvuru sırasında gösterdiği diplomanın aynı hafta başka şirketlere de gösterildiğini öğrenirse, pazarlıkta bunu kullanabilir. Bir çevrimiçi mağaza, müşterisinin hangi semtte ev aradığını başka bir siteden öğrenip fiyatlarını ona göre ayarlayabilir. Hiçbirinde müşterinin adı geçmeyebilir; ama her biri, kişinin bir bağlamda verdiği bilginin, bilgisi ve rızası dışında, başka bir bağlamda ona karşı kullanılmasıdır.

Bu riskin bir de ölçek boyutu var. Dijital kimlik cüzdanları yaygınlaştıkça belge göstermek bir dokunuşa iner ve insanlar her gün birçok kez belge gösterir hâle gelir. Belge gösterimi ne kadar sıklaşırsa, gösterimler arasındaki bağlantılardan kurulabilecek profil de o kadar zenginleşir. Kimlik kartının fotokopisini birkaç yılda bir verdiğimiz bir dünyadan, belgemizi günde birkaç kez gösterdiğimiz bir dünyaya geçiyoruz. Bu yüzden bağlanamazlığın önemi cüzdanların yaygınlaşmasıyla birlikte artar. İlk gün ihmal edilirse sonradan eklemek çok daha zordur, çünkü o zamana kadar birikmiş kayıtlar zaten birbirine bağlanmış olur.

== Fiziksel dünyada bağlanamazlık zaten vardı

Bu sorunun dijital dünyaya özgü olduğunu fark etmek için fiziksel dünyaya bakmak yeter. Aynur nüfus cüzdanını bir bankada, bir emlakçıda ve bir işverende gösterdiğinde, üç görevli de aynı kartı görür. Kartta kimlik numarası yazdığı için, aslında bu üç kurum bir gün kayıtlarını karşılaştırırsa Aynur’u kolayca eşleştirebilir. Ama kartın fotokopisi alınmadıkça, görevliler kartı bir an görür ve unutur. Bağlantı kurmak için bir veritabanına yazmak, sonra veritabanlarını birleştirmek gerekir; bu da zahmetlidir.

Dijital dünyada bu zahmet ortadan kalkar. Bir doğrulayıcının yazılımı, gelen belgeyi bütün teknik değerleriyle birlikte varsayılan olarak kaydeder. Kayıtlar birleştirilmek için tasarlanmış veritabanlarında durur. İki şirketin kayıtlarını karşılaştırmak bir programın birkaç saniyesidir. Fiziksel dünyada kendiliğinden var olan "unutma" özelliği, dijital dünyada bilinçli olarak tasarlanmak zorundadır. Bağlanamazlık, bu tasarımın adıdır.

= Kim Kimi Bağlayabilir?

Bağlanabilirliği tek bir tehdit gibi düşünmek yanıltıcıdır. Kimin bağladığına göre sorun, çözüm ve sorumluluk değişir. Avrupa’nın cüzdan mimari çerçevesi (ARF) bu tehditleri iki ana başlıkta toplar ve bu yazıda biz biraz daha ayrıntılı bir sınıflama kullanacağız \[5\] (Şekil 2).

#sekil(2, [Bağlanabilirliğin türleri: kim, hangi kayıtları birbirine bağlayabilir?], "figures/a5/sekil-2.svg", yarim: false)

== Doğrulayıcılar arası bağlanabilirlik

En çok konuşulan tür budur ve Aynur’un hikâyesinde yaşanan da budur. İki ya da daha fazla doğrulayıcı (emlak sitesi, iş sitesi, banka) aynı belgeden aldıkları değerleri karşılaştırır ve aynı kişiyle iş yaptıklarını anlar. ARF bu türe #{strong[güvenen taraf bağlanabilirliği]} (#{emph[Relying Party linkability]}) adını verir ve iki durumu birlikte sayar: tek bir doğrulayıcının kendi içinde kayıtları birleştirmesi ve birden çok doğrulayıcının iş birliği yapması. ARF bir üçüncü durumu da ekler: Doğrulayıcıların sistemlerine sızan bir saldırganın, birden çok doğrulayıcıdan çaldığı kayıtları birleştirmesi \[5\]. Bu son durum önemli bir uyarıdır, çünkü doğrulayıcıların hepsi dürüst olsa bile, sakladıkları teknik değerler bir veri sızıntısında bağlanabilirliğe dönüşebilir. Bu yüzden ARF, doğrulayıcıların aldıkları belgelerdeki benzersiz sabit değerleri, ihtiyaçları kalmadığı anda silmelerini ister.

== Aynı doğrulayıcının zaman içinde bağlaması

Bazen tek bir doğrulayıcının aynı kişiyi her seferinde tanıması meşrudur: Banka müşterisini, spor salonu üyesini tanımak zorundadır. Ama her doğrulayıcı için durum böyle değildir. Bir yaş doğrulama sitesinin, aynı kişinin bu hafta kaç kez geldiğini bilmesine gerek yoktur. Aynı doğrulayıcının aynı kişiyi tanıyıp tanımaması gerektiği, kullanım amacına bağlıdır ve bu yüzden tasarımda bilinçli bir seçim olarak ele alınmalıdır. Bölüm 6’da göreceğimiz siteye özel takma adlar, "tanınmak gereken yerde tanınmayı" bağlanamazlıkla birlikte sağlamanın yoludur.

== Veren kurum ile doğrulayıcıların iş birliği

İkinci büyük tür daha az konuşulur ama daha ağır sonuçlar doğurabilir. Belgeyi veren kurum, belgenin teknik değerlerini kendisi üretmiştir; imzayı o atmış, tuzları o seçmiş, sıra numarasını o vermiştir. Doğrulayıcılar aldıkları değerleri veren kurumla paylaşırsa, kurum hangi belgenin, yani hangi kişinin, hangi doğrulayıcıda kullanıldığını öğrenir. ARF bunu #{strong[veren kurum bağlanabilirliği]} (#{emph[Attestation Provider linkability]}) olarak adlandırır \[5\].

Bu tür neden ağırdır? Çünkü kimlik belgesini veren kurum çoğu zaman devlettir ya da devletin yetkilendirdiği bir kuruluştur. Devletin elinde zaten kişinin adı vardır. Doğrulayıcılardan gelen değerlerle birleştiğinde, kişinin hangi siteleri kullandığı, hangi hizmetlere eriştiği adıyla birlikte ortaya çıkar. Dizinin ilk yazısında federasyondaki "her kapıda bekleyen kapıcı" sorunundan söz etmiştik; üçgen model bu kapıcıyı ortadan kaldırmıştı. Veren kurum bağlanabilirliği, kapıcının arka kapıdan geri dönmesi demektir. ARF bu türün, tuzlu özetlere dayanan bugünkü belge biçimleriyle tamamen ortadan kaldırılamayacağını açıkça kabul eder \[5\]. Bölüm 8’de bu kabulün ne anlama geldiğini tartışacağız.

== Cüzdan sağlayıcının gözlemi

Kişinin cüzdan uygulamasını geliştiren ve işleten kurum, teknik olarak cüzdanın ne zaman, nerede kullanıldığını görebilecek konumdadır. Uygulama her gösterimde sağlayıcının sunucusuna bir bildirim gönderiyorsa ya da bir "kullanım analizi" topluyorsa, sağlayıcı bütün doğrulayıcıları tek başına bağlayabilir. eIDAS 2.0 bu riski doğrudan yasaklar: Cüzdan sağlayıcı, hizmetin sunulması için gerekli olmayan kullanım bilgisini toplayamaz (Bölüm 9). Teknik olarak bu, cüzdanın gösterim sırasında sağlayıcıyla hiç konuşmaması anlamına gelir.

== İptal kontrolü sırasında gözlem

Son tür daha incedir. Doğrulayıcı, bir belgenin iptal edilip edilmediğini öğrenmek için veren kurumun yayımladığı bir listeye bakar. Bu liste her belge için ayrı soruluyorsa ("şu numaralı belge iptal mi?"), veren kurum her sorguda hangi belgenin, hangi doğrulayıcıda, ne zaman gösterildiğini öğrenir. Dizinin yedinci yazısının konusu olan iptal mekanizmalarının tasarımı, büyük ölçüde bu gözlemi önleme çabasıdır. Bölüm 7’de bağlanabilirlikle ilgili kısmına bakacağız.

== Cüzdanın kendi kanıtları

Bir tür daha, okurların çoğunun aklına gelmeyen bir yerden doğar. Avrupa mimarisinde cüzdan, belge veren kurumlara kendisinin güvenilir bir cüzdan olduğunu ve anahtarlarının güvenli donanımda saklandığını kanıtlamak için, cüzdan sağlayıcının imzaladığı kanıtlar sunar. Bu kanıtlar da belge gibi imza, açık anahtar ve iptal bilgisi taşır. Aynı kanıt bütün veren kurumlara gösterilirse, bu kez #{strong[veren kurumlar]} birbirini bağlayabilir: Kimlik belgesini veren kurum ile diploma veren üniversite, aynı cüzdan kanıtını gördükleri için aynı kişiye belge verdiklerini anlar. ARF bu yüzden cüzdan sağlayıcının, farklı veren kurumlara gösterilecek kanıtlardaki benzersiz değerlerin (açık anahtar, imza, iptal sırası) birbirinden farklı olmasını sağlamasını ister \[5\]. Belgeler için anlatacağımız bütün teknikler cüzdanın kendi kanıtları için de geçerlidir; bağlanamazlık zincirin her halkasında ayrı ayrı sağlanmalıdır.

#tablo([#{strong[Tablo 1.]} Bağlanabilirlik türleri, kimin bağladığı ve başlıca karşı önlemler.], (19fr, 27fr, 36fr, 48fr), ([Tür], [Kim bağlar?], [Neyi kullanır?], [Başlıca karşı önlem],), (
  ([Doğrulayıcılar arası], [iki ya da daha çok doğrulayıcı, ya da kayıtlarını çalan saldırgan], [imza, anahtar, özetler, sıra numarası, açılan öznitelikler], [tek kullanımlık kopyalar, siteye özel takma adlar, sıfır bilgi ispatı],),
  ([Aynı doğrulayıcı, zaman içinde], [tek doğrulayıcı], [aynı değerlerin tekrar görülmesi], [gerekmiyorsa her seferinde yeni kopya; gerekiyorsa siteye özel takma ad],),
  ([Veren kurum ile doğrulayıcılar], [veren kurum + doğrulayıcılar], [verenin kendi ürettiği değerler], [sıfır bilgi ispatı; örgütsel önlemler ve denetim],),
  ([Cüzdan sağlayıcı], [cüzdanı işleten kurum], [uygulamanın sunucuya gönderdiği kullanım bilgisi], [gösterim sırasında sunucuyla konuşmamak; hukuki yasak],),
  ([İptal kontrolü], [veren kurum (liste sunucusu)], [hangi belgenin sorulduğu], [toplu durum listeleri, rastgele sıra, sürü gizliliği, önbellek],),
  ([Veren kurumlar arası], [birden çok veren kurum], [cüzdanın kendi kanıtlarındaki sabit değerler], [her veren kuruma farklı değerli kanıt],),
))

= Bir Belgenin İz Bırakan Alanları

Aynur’un hikâyesinde iki siteyi birbirine bağlayan şey, Aynur’un adı ya da kimlik numarası olmadı; iki site bunları hiç görmedi. Bağı kuran, belgenin içindeki teknik değerlerdi. Bu bölümde bir belgenin, kişinin hiç görmediği ama her gösterimde taşınan alanlarına tek tek bakıyoruz. ARF bu alanları "benzersiz, sabit öğeler" diye anar ve bir doğrulayıcının kişiyi izlemek için bunları saklayıp karşılaştırabileceğini söyler \[5\].

== Veren kurumun imzası

Dizinin ikinci yazısında anlattığımız gibi, doğrulanabilir bir belgenin en önemli parçası veren kurumun dijital imzasıdır. İmza, belgenin içeriğinden ve kurumun gizli anahtarından hesaplanan uzun bir sayıdır. İki farklı belgenin imzası, pratikte hiçbir zaman aynı çıkmaz. Bu, imzanın güvenliği için gereklidir; ama mahremiyet açısından imzayı mükemmel bir tanımlayıcıya dönüştürür. Aynur aynı belgeyi iki yere gösterirse, iki doğrulayıcı aynı imzayı görür. İmza, belgenin değişmediğini kanıtlamak için doğrulayıcıya gösterilmek zorunda olduğundan, seçici açıklamayla gizlenemez.

== Cihaz anahtarı

Belgenin çalınıp başkası tarafından kullanılmasını önlemek için belge, kişinin cihazındaki bir anahtara bağlanır (dizinin ikinci yazısındaki "sahip bağlama"). Belgenin içinde bu anahtarın açık yarısı yazılıdır ve kişi belgeyi gösterirken o anahtarla bir imza atar. Doğrulayıcı imzayı kontrol etmek için açık anahtarı görmek zorundadır. Açık anahtar da imza gibi benzersizdir ve her gösterimde aynıysa bağlantı kurar.

== Tuzlar ve özetler

Seçici açıklama yöntemleri, dizinin üçüncü yazısında anlattığımız gibi, her alanı rastgele bir tuzla birleştirip özetler. Doğrulayıcı açılan alanların tuzlarını, açılmayanların ise yalnızca özetlerini görür. Tuzlar ve özetler rastgele üretildiği için her belgede farklıdır ve yine aynı belgenin bütün gösterimlerinde aynıdır. Kişi her seferinde farklı alanlar açsa bile, belgede açılmayan alanların özet listesi değişmez; o liste de bir parmak izi olur.

== Belge kimliği ve iptal sırası

Birçok belge, veren kurumun iptal edebilmesi için bir kimlik numarası ya da bir iptal listesindeki sıra numarasını taşır. Doğrulayıcı iptal kontrolü yapmak için bu numarayı görmek zorundadır. Numara belgeye özgüdür ve aynı belgenin bütün gösterimlerinde aynıdır. Üstelik sıra numaraları belgeler verildikçe artarak atanıyorsa, iki farklı belgenin numarası birbirine yakınlığıyla bile bilgi verebilir: Ardışık numaralar aynı gün, belki aynı paket içinde verilmiş belgeleri gösterir. ARF bu yüzden sıra numaralarının rastgele atanmasını ister (Bölüm 7).

== Zaman damgaları

Belgenin verilme zamanı ve geçerlilik süresi genellikle saniyesine kadar yazılır. Bir saniyelik hassasiyet, aynı saniyede belge alan insan sayısı az olduğu için güçlü bir ayırt edicidir. Daha da önemlisi, bir kişiye aynı anda birden çok kopya verildiğinde (Bölüm 5) kopyaların hepsi aynı saniyeyi taşıyabilir; bu durumda kopyaları ayırmanın amacı boşa çıkar, çünkü doğrulayıcılar "aynı saniyede verilmiş iki belge" üzerinden kopyaları eşleştirebilir. ARF, toplu verilen belgelerdeki zaman damgalarının, belgelerin aynı pakete ait olduğunu ele vermeyecek kadar kaba tutulmasını şart koşar; örneğin çok sayıda farklı kişiye verilen paketlerin aynı zaman değerini paylaşmasını sağlayarak \[5\]. Bu yaklaşımın adı #{strong[sürü gizliliğidir]} (#{emph[herd privacy]}): Bir değer ancak kalabalık bir grup tarafından paylaşıldığında kimseyi ele vermez.

== Açılan bilgilerin kendisi

Teknik değerlerin hepsi gizlense bile, kişinin açtığı bilgiler bağlantı kurabilir. Aynur iki siteye de adını ve doğum tarihini gösterirse, iki site onu bu bilgilerden eşleştirir; imzaya ya da anahtara gerek kalmaz. Ad, doğum tarihi, adres gibi doğrudan tanımlayıcılar açıklandığı anda bağlanamazlık ortadan kalkar. Daha sinsi olan, tek başına zararsız görünen ama birlikte ayırt edici olan bilgilerdir; Bölüm 2.2’deki posta kodu, cinsiyet ve doğum tarihi örneği bunu gösteriyordu. Kriptografi bu konuda yalnızca yarı yolu yürüyebilir; öteki yarısı doğrulayıcının neyi isteyebileceğini sınırlayan kurallardır (Bölüm 9).

== Belgenin dışındaki izler

Son olarak, belgenin kendisi tamamen bağlanamaz olsa bile, gösterimin çevresindeki teknik bilgiler bağlantı kurabilir. Gösterimi yapan telefonun IP adresi, tarayıcının teknik özellikleri, gösterimin saati, aynı oturumda girilen e-posta adresi ya da ödeme bilgisi, belgenin taşımadığı izleri taşır. Bu yazı belgenin kendisine odaklanıyor, ama okurun aklında tutması gereken bir gerçek var: Belge düzeyindeki bağlanamazlık gereklidir, ama tek başına yetmez.

#kutu("teknik", [Bir SD-JWT VC gösteriminde neler sabit, neler değişken?])[
Aşağıda, Aynur’un diploma belgesinin bir doğrulayıcıya gösterilirken taşıdığı yapının sadeleştirilmiş bir örneği var. SD-JWT VC biçiminde bir gösterim üç parçadan oluşur: veren kurumun imzaladığı belge, açılan alanların "açıklama" (#{emph[disclosure]}) değerleri ve kişinin cihaz anahtarıyla o oturum için imzaladığı #{strong[anahtar bağlama]} (#{emph[key binding]}) parçası. Alan adları standarttaki gibidir, değerler örnektir. İlk parça, veren kurumun imzaladığı içeriktir:

#kod("json", "{
  \"iss\": \"https://diploma.example-universite.edu.tr\",
  \"iat\": 1782864000,
  \"exp\": 1972166400,
  \"vct\": \"urn:example:diploma:1\",
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"7c2e…\", \"y\": \"a91d…\" } },
  \"status\": { \"status_list\": { \"idx\": 41817, \"uri\": \"https://diploma.example-universite.edu.tr/status/3\" } },
  \"_sd\": [\"Xk2…\", \"pQ9…\", \"c0R…\", \"L7m…\", \"e3V…\"],
  \"_sd_alg\": \"sha-256\"
}", baslik: "Örnek: veren kurumun imzaladığı belge")

Kurum bu yapının üzerine bir ECDSA imzası atar; örnekte imza #{raw("3f9a…")} diye başlıyor. İkinci parça, Aynur’un açtığı tek alanın açıklamasıdır. Dizinin ilk öğesi tuzdur:

#kod("json", "[\"8YkQ…\", \"derece\", \"Yüksek Lisans\"]", baslik: "Örnek: açılan alan (derece)")

Üçüncü parça, cüzdanın bu gösterim için ürettiği ve cihaz anahtarıyla imzaladığı anahtar bağlama parçasıdır:

#kod("json", "{ \"aud\": \"https://emlak.example\", \"nonce\": \"q8Lr…\", \"iat\": 1795000000, \"sd_hash\": \"Wb3…\" }", baslik: "Örnek: anahtar bağlama parçası (her gösterimde yeni)")

Bu yapıda #{strong[aynı belgenin her gösteriminde değişmeyen]} değerler şunlardır: imza (#{raw("3f9a…")}), cihaz anahtarı (#{raw("cnf")} içindeki #{raw("x")}, #{raw("y")}), iptal listesindeki sıra (#{raw("idx: 41817")}), açılmayan alanların özetleri (#{raw("_sd")} listesi), açılan alanın tuzu ve zaman damgaları (#{raw("iat")}, #{raw("exp")}). #{strong[Her gösterimde değişen]} değerler ise anahtar bağlama parçasındaki doğrulayıcı adresi (#{raw("aud")}), doğrulayıcının o oturum için ürettiği tek kullanımlık değer (#{raw("nonce")}) ve gösterim zamanıdır. Değişen değerler gösterimin tekrar kullanılmasını önler; ama bağlanabilirliği önlemez, çünkü sabit değerler zaten yeterlidir.

ISO\/IEC 18013-5 mdoc biçiminde \[19\] yapı farklıdır ama tablo aynıdır: kurumun imzaladığı mobil güvenlik nesnesi (MSO), içindeki alan özetleri, cihaz anahtarı (#{raw("deviceKey")}), geçerlilik zamanları ve iptal bilgisi, bir belgenin bütün gösterimlerinde aynıdır.
]

#sekil(3, [Bir belge gösteriminin anatomisi: hangi değerler bağlantı kurar?], "figures/a5/sekil-3.svg", yarim: false)

= Toplu Kopyalar ve Tek Kullanımlık Belgeler

== Fikir: aynı belgeden birçok kopya

Bölüm 4’teki değerlerin hepsi bir ortak noktayı paylaşıyor: Belgeye özgüdürler ve aynı belgenin bütün gösterimlerinde aynıdırlar. En doğrudan çözüm bu yüzden şudur: Kişiye tek bir belge yerine, #{strong[aynı bilgileri taşıyan ama teknik değerleri birbirinden tamamen farklı]} birçok kopya vermek ve her gösterimde farklı bir kopya kullanmak. İki doğrulayıcı farklı kopyalar görürse, karşılaştıracakları ortak bir değer kalmaz.

ARF bu ayrımı iki terimle yapar. #{strong[Mantıksal belge]} (#{emph[logical attestation]}), kişinin sahip olduğu belgedir: Aynur’un yüksek lisans diploması. #{strong[Teknik belge]} (#{emph[technical attestation]}) ise o mantıksal belgenin cüzdandaki somut, imzalı kopyalarından biridir. Bir mantıksal belge birçok teknik belgeyle temsil edilebilir; hepsi aynı bilgileri taşır \[5\]. Kişi cüzdanında tek bir "diploma" görür; arka planda cüzdan, hangi gösterimde hangi kopyanın kullanılacağına karar verir.

== Kopyalar neyle farklı olmalı?

Kopyaları farklı kılmak, yalnızca imzanın farklı olmasıyla sağlanmaz. Bölüm 4’teki değerlerin her biri kopyadan kopyaya değişmelidir; biri bile aynı kalırsa bağlantı onun üzerinden kurulur. ARF, veren kurumların belgedeki bütün benzersiz öğelerin farklı belgelerde aynı çıkma olasılığını ihmal edilebilir düzeyde tutmasını ister ve bu öğeleri tek tek sayar: her alanın tuzu, bütün alanların özetleri, iptal için kullanılan belge kimliği ya da sıra numarası, sahip bağlama için kullanılan açık anahtar ve kurumun imzası \[5\]. Bunun yanında kurumun, belgeyi verdikten sonra, artık gerekmedikleri anda bu değerleri ve zaman damgalarını silmesini ve hiçbir tarafa iletmemesini şart koşar. Bu son şart, Bölüm 3.3’teki veren kurum bağlanabilirliğini ortadan kaldırmaz ama zorlaştırır: Kurum değerleri sakladığını iddia etmezse, sonradan doğrulayıcılarla eşleştiremez. Bu tamamen kurumun dürüstlüğüne ve denetimine dayanan bir güvencedir.

Cihaz anahtarının farklı olması özel bir dikkat ister. Her kopya farklı bir cihaz anahtarına bağlanmalıdır, yani cüzdan her kopya için ayrı bir anahtar çifti üretmelidir. Belge verme protokolü OpenID4VCI bu yüzden tek bir istekle birden çok belge istenmesine ve her belgenin ayrı bir anahtara bağlanmasına izin verir; belirtimde, belgeler arasında bağlanamazlık sağlamak için her belgenin farklı kriptografik anahtarlara bağlanması gerektiği açıkça yazılır \[6\]. Seçici açıklamalı JWT standardı da mahremiyet bölümünde toplu belge vermeyi bir çözüm olarak anlatır: Kişi her doğrulayıcı için, hatta her oturum için farklı bir kopya kullanabilir; her kopyada sahip bağlama anahtarı ve tuzlar yeni olmalı, zaman bilgileri de rastgeleleştirilmeli ya da yuvarlanmalıdır \[7\].

== Avrupa’nın dört yöntemi

ARF, kopyaların nasıl kullanılacağı için dört yöntem tanımlar ve cüzdanlardan bunların ikisini zorunlu olarak desteklemesini ister \[5\] (Şekil 4):

#{strong[Yöntem A: bir kez kullanılan belgeler]} (#{emph[once-only attestations]}). Cüzdan kopyaları paketler hâlinde alır ve her kopyayı yalnızca bir kez gösterir. Kopya sayısı belirli bir alt sınıra düşünce yeni paket ister. Alt sınırı ve paket boyunu veren kurum belirler. Doğrulayıcılar arası bağlanabilirliği tamamen önler; bir doğrulayıcı aynı kişiyi ikinci gelişinde bile tanıyamaz. Cüzdanların desteklemesi zorunludur.

#{strong[Yöntem B: süresi kısa belgeler]} (#{emph[limited-time attestations]}). Cüzdan tek bir kopya alır ve onu her yerde kullanır; ama kopyanın geçerlilik süresi kısadır ve süresi dolmadan yenisi alınır. Bir kopya yalnızca kısa bir süre boyunca bağlantı kurabilir. ARF bu yöntemin bağlanabilirliği yalnızca kısmen azalttığını açıkça söyler. Cüzdanların desteklemesi zorunludur ve Yöntem A’da kopyalar tükendiğinde, cüzdan çevrimdışıysa bu yönteme geri döner.

#{strong[Yöntem C: dönen paket]} (#{emph[rotating-batch attestations]}). Cüzdan bir paketteki kopyaları rastgele sırayla birer kez kullanır; paket bitince baştan, yine rastgele sırayla kullanmaya başlar. Kopya sayısını sınırlı tutar ama bağlanabilirliği tamamen önlemez. İsteğe bağlıdır.

#{strong[Yöntem D: doğrulayıcı başına kopya]} (#{emph[per-Relying Party attestations]}). Cüzdan her doğrulayıcıya ayrı bir kopya gösterir, ama aynı doğrulayıcı tekrar istediğinde ona aynı kopyayı gösterebilir. Doğrulayıcılar arası bağlanabilirliği önler; aynı doğrulayıcının kişiyi tanımasına izin verir. İsteğe bağlıdır.

#sekil(4, [ARF’nin dört yöntemi: aynı gösterim sırası, farklı kopya kullanımı], "figures/a5/sekil-4.svg", yarim: false)

ARF yöntem seçimini veren kuruma bırakır ama bir koşulla: Her kurum hangi yöntemi, hangi paket boyu ve geçerlilik süresiyle kullanacağını anlatan bir politika yazmalı ve bu politikayı, belgenin beklenen kullanımına göre yaptığı bir bağlanabilirlik risk analizine dayandırmalıdır \[5\]. Kurum bu tercihleri cüzdana, belge verme bilgilerinde yayımladığı bir parametreyle bildirir. Yani bağlanamazlığın düzeyi belge türüne göre değişebilir. Kimlik belgesi gibi her gün birçok yerde kullanılan bir belge için Yöntem A uygun olabilir; yılda birkaç kez gösterilen bir meslek belgesi için Yöntem B yeterli görülebilir.

#kutu("teknik", [Kaç kopya gerekir? Küçük bir hesap])[
Yöntem A’da paket boyunu ve alt sınırı belirlemek, kişinin belgeyi ne sıklıkla kullandığına bağlıdır. Aşağıdaki hesap bir örnektir; değerler varsayımdır. Kimlik belgesinin haftada ortalama 6 kez gösterildiğini, bazı haftalar bu sayının 15’e çıktığını ve cüzdanın en az haftada bir çevrimiçi olduğunu varsayalım.

İlk soru, bir pakette kaç kopya bulunması gerektiği. Paket en kötü haftayı karşılamalı; üstüne iki kat güvenlik payı koyarız:

#formul[$ "paket boyu" = underbrace(15, "en kötü hafta") dot 2 = 30 "kopya" $]

Cüzdan elinde 10 kopya kalınca yeni paket ister; bu, yeni paket isteme alt sınırıdır. İkinci soru, kurumun ayda kaç kopya imzalayacağı. Bir ay yaklaşık 4,3 haftadır:

#formul[$ "kişi başına ayda" &approx 6 dot "4,3" approx 26 "kopya" quad (+ "yenileme kayıpları") \
"bir milyon kişi için ayda" &approx 26 dot 10^6 = 26 "milyon imza" $]

Son satır, Yöntem A’nın veren kurum için asıl maliyetini gösteriyor. Tek bir kopya yerine her kişiye ayda onlarca imza atmak, kurumun imza donanımı ve belge verme sunucuları için önemli bir yüktür. Avrupa Komisyonu’nun yaş doğrulama çözümünde yaş ispatı belgelerinin otuzarlık paketler hâlinde verilmesi ve en çok üç ay geçerli olmaları önerilir \[8\]; bu, yukarıdaki hesapla aynı büyüklük sırasındadır.
]

== Kopyaların bedeli

Toplu kopyalar bugün bağlanamazlığın en yaygın yöntemi, ama bedelleri var ve bu bedeller tasarım kararlarını şekillendiriyor.

#{strong[Veren kurumun yükü.]} Yukarıdaki hesapta gördüğümüz gibi, kopya sayısı arttıkça kurumun imzalama ve belge verme yükü artar. Belgeleri güvenli donanımda imzalayan kurumlar için bu, donanım kapasitesi ve maliyet demektir.

#{strong[Çevrimiçi olma zorunluluğu.]} Kopyalar tükendiğinde cüzdanın yenilerini alması gerekir. Uzun süre çevrimdışı kalan bir cüzdan, ya kopyasız kalır ya da Yöntem B’ye düşerek bağlanabilirliği kabul eder. ARF, bu durumda cüzdanın kişiyi uyarmasını ve internete bağlanmasını istemesini öngörür \[5\].

#{strong[Yenileme zamanının sızdırdığı bilgi.]} Yöntem A’da cüzdan, kopyaları bittikçe yenisini ister. Kopyaların ne sıklıkla yenilendiği, kişinin belgesini ne sıklıkla kullandığına dair veren kuruma kaba bir bilgi verir. Bu bilgi hangi doğrulayıcıda kullanıldığını söylemez, ama bir kullanım sıklığı profilidir. Sabit aralıklarla yenileme ya da kullanımdan bağımsız sabit paket boyları bu sızıntıyı azaltır.

#{strong[Veren kurum bağlanabilirliği yerinde kalır.]} En önemli bedel budur. Kopyaların hepsini veren kurum imzalamıştır. Kurum kopyaların değerlerini silmediyse ya da gizlice sakladıysa, doğrulayıcılardan gelen her değeri kendi kaydıyla eşleştirip kişiyi bulabilir. Toplu kopyalar doğrulayıcıları birbirinden ayırır, ama veren kurumu doğrulayıcılardan ayırmaz. Bu boşluğu teknik olarak yalnızca sıfır bilgi ispatları kapatabilir (Bölüm 8).

== Kopyalar ve yüz yüze gösterim

Kopyaların güzel bir yanı, internet olmadan da çalışmalarıdır. Dizinin dokuzuncu yazısında anlatacağımız yüz yüze gösterimde, örneğin bir kapıda ya da bir kasada, cüzdan belgeyi Bluetooth ya da NFC üzerinden doğrulayıcının cihazına aktarır. Bu sırada cüzdanın internete çıkması gerekmez; cebinde yeterli kopya olduğu sürece her gösterimde yenisini kullanabilir. Sıfır bilgi ispatlarının yüz yüze gösterim için henüz büyük ve yavaş olduğunu düşünürsek, toplu kopyalar bu senaryoda bugün en pratik bağlanamazlık yöntemidir.

Ama yüz yüze gösterimin kendine özgü bir izi vardır: Doğrulayıcı kişiyi görür. Bir kapıdaki görevli Aynur’un yüzünü tanıyorsa, belgenin hangi kopyasını gösterdiği önemsizleşir. Yüz yüze dünyada bağlanamazlık fiziksel dünyanın eski kurallarına geri döner. Belge teknik iz bırakmamalıdır, ama görevlinin gözünü kimse kapatamaz. Bu yüzden yüz yüze gösterimdeki asıl kazanç, belgenin bir veritabanına sessizce eklenip başka kayıtlarla birleştirilmesinin önlenmesidir.

#kutu("ornek", [Aynur’un cüzdanı, Yöntem A ile])[
Aynur’un cüzdanında yüksek lisans diplomasının yirmi kopyası var. Pazartesi bankaya kopya 1’i, salı emlak sitesine kopya 2’yi, çarşamba iki iş sitesine kopya 3 ve 4’ü gösteriyor. Altı ay sonra emlak sitesi ile iş sitesinin kayıtları aynı veri aracısının eline geçtiğinde, aracı iki farklı imza, iki farklı cihaz anahtarı ve iki farklı özet listesi görüyor. Zaman damgaları da aynı hafta diploma kopyası alan binlerce kişiyle ortak bir değere yuvarlanmış. İki kaydı teknik değerlerden eşleştirmek mümkün değil.

Aynur’un fark etmediği tek şey, telefonunun cuma gecesi kopya sayısı ona düşünce üniversitesinden on kopya daha istemesi oluyor. Üniversite bu isteği görüyor ama Aynur’un diplomasını o hafta nerelerde gösterdiğini bilmiyor.
]

= Siteye Özel Takma Adlar

== Tanınmak gereken yerde tanınmak

Tek kullanımlık kopyalar, her gösterimi bir öncekinden ayırır. Ama bazen ayrılmak istenmez. Aynur bir alışveriş sitesine üye olduysa, site onu her girişte tanımalı ki sepetini, siparişlerini, adresini hatırlasın. Bir forum, aynı kişinin birden çok hesap açıp oylamayı çarpıtmasını önlemek isteyebilir. Bu durumlarda doğrulayıcının kişiyi #{strong[kendi içinde]} tanıması meşrudur; sorun, bu tanımanın başka doğrulayıcılara taşınabilir olmasıdır.

En kolay ama en kötü çözüm, kişiyi her yerde aynı olan bir değerle, örneğin kimlik numarasıyla tanımaktır. Dizinin ilk yazısında kapsamı geniş tanımlayıcıların bu bedeli taşıdığını söylemiştik: Kimlik numarası her sitede aynı olduğu için, onu kaydeden bütün siteler birbirine bağlanır. Doğru çözüm, kişiye her site için #{strong[ayrı, ama o site içinde kalıcı]} bir tanımlayıcı vermektir. Bu tanımlayıcıya #{strong[siteye özel takma ad]} (#{emph[pairwise pseudonym]}) denir.

== Federasyondan bir öncül

Fikir yeni değildir. David Chaum 1985’te, kişinin her kurumla ayrı bir takma adla iş yaptığı ve bu takma adların birbirine bağlanamadığı bir sistem önermişti \[17\]. Bugün yaygın kullanılan bir öncül de federasyondan gelir. Dizinin ilk yazısında anlattığımız OpenID Connect, kimlik sağlayıcının her siteye aynı kullanıcı numarasını vermesi yerine siteye özel bir numara vermesine izin verir; belirtimde bu numaraya "ikili" (#{emph[pairwise]}) tanımlayıcı denir \[9\]. Kimlik sağlayıcı her site için farklı bir #{raw("sub")} değeri üretir; iki site bu değerleri karşılaştırsa da eşleştiremez.

Ama federasyondaki bu çözümün bir sınırı vardır: Takma adları üreten kimlik sağlayıcıdır ve sağlayıcı her girişte hangi siteye giriş yapıldığını zaten bilir. Siteler birbirinden ayrılır, ama sağlayıcı hepsini görmeye devam eder. Cüzdan modelinde amaç, takma adı kişinin kendi cihazında, hiçbir merkezî tarafa sormadan üretmektir.

== Geçiş anahtarları: hazır bir siteye özel anahtar

Dizinin ilk yazısında geçiş anahtarlarından (#{emph[passkeys]}) söz etmiştik. W3C’nin WebAuthn standardına dayanan geçiş anahtarları, her site için ayrı bir anahtar çifti üretir ve bir sitenin anahtarını başka bir siteye vermez \[10\]. Bu, doğası gereği siteye özel bir takma addır: Site, kişiyi açık anahtarından tanır; iki site farklı açık anahtarlar gördüğü için kişiyi eşleştiremez. ARF de geçiş anahtarlarını, cüzdanın "doğrulanabilir takma ad" üretmesinin bir yolu olarak anar; cüzdan bu durumda WebAuthn’deki kimlik doğrulayıcı (#{emph[authenticator]}) rolünü üstlenir \[5\].

== Avrupa’nın takma ad kuralları

eIDAS 2.0 takma adlara üç yerde yer verir. Tüzüğün 5. maddesi, kullanıcının kimliğini belirlemesini gerektiren özel kurallar saklı kalmak üzere, kullanıcının seçtiği takma adların kullanılmasının yasaklanamayacağını söyler. Cüzdanın işlevlerini sayan 5a maddesi, cüzdanların takma ad üretebilmesini ve bunları şifreli olarak cihazda saklayabilmesini ister. Güvenen tarafların yükümlülüklerini düzenleyen 5b maddesi ise, Birlik ya da ulusal hukuk kimlik belirlemeyi gerektirmedikçe güvenen tarafların takma ad kullanımını reddedemeyeceğini öngörür \[11\]. Cüzdanların işlevlerine ilişkin 2024\/2979 sayılı Uygulama Tüzüğü ise bunu teknik bir yükümlülüğe çevirir: Cüzdan, bir güvenen tarafın isteği üzerine, o tarafa #{strong[özgü ve benzersiz]} bir takma ad üretebilmeli ve bunu tek başına ya da istenen bir belgeyle birlikte sunabilmelidir \[12\].

ARF bu çerçevede takma adlar için dört kullanım biçimi tarif eder \[5\]:

- #{strong[Takma adla giriş:]} Site kişinin kimliğini bilmeden, onu bir takma adla tanır ve hesabına erişim verir.
- #{strong[Doğrulanmış bilgiyle kayıt, sonra takma adla giriş:]} Kişi kayıt sırasında bir belge gösterir (örneğin 18 yaşından büyük olduğunu), sonraki girişlerde yalnızca takma adını kullanır.
- #{strong[Sınırlı katılım:]} Kişinin belirli bir kapsamda yalnızca sınırlı sayıda takma ad açabilmesi; en uç hâli "kişi başına tek hesap"tır. Bir anket ya da oylamada aynı kişinin iki kez katılmasını, kimliğini açmadan önler.
- #{strong[Birden çok tarafa aynı takma ad:]} Örneğin bir alışveriş sitesi ile kargo şirketinin, teslimat için aynı kişiyi tanıması. Bu biçim bilerek bağlanabilirlik yaratır; ARF yalnızca gerektiğinde, kişinin seçimiyle ve uygun güvencelerle kullanılmasını önerir.

ARF bugün ilk biçimin cüzdanlarda desteklendiğini, diğerleri için ortak teknik belirtimlerin henüz tamamlanmadığını açıkça söyler.

#kutu("teknik", [Siteye özel takma ad nasıl türetilir?])[
Siteye özel takma ad üretmenin yaygın yollarından biri, cüzdanın yalnızca kendisinin bildiği bir gizli #{strong[tohum]} (#{emph[seed]}) değerinden, sitenin kimliğiyle birlikte bir anahtarlı özet fonksiyonu (HMAC) hesaplamaktır. Tohum anahtar, sitenin adresi girdi olur; her site için ayrı bir sonuç çıkar. Değerler örnektir:

#formul[$ "tohum" &= "9b41…e07c" quad ("yalnız cüzdanda") \
"takma ad"_"emlak" &= "HMAC-SHA256"("tohum", "https://emlak.example") = "pZ3c…" \
"takma ad"_"iş ilanı" &= "HMAC-SHA256"("tohum", "https://is.example") = "Q81m…" $]

Bu yöntemin üç özelliği var. Aynı site için her seferinde aynı takma ad çıkar, yani site kişiyi tanır. Farklı siteler için çıkan takma adlar birbirinden bağımsız görünür, yani siteler karşılaştırsa da eşleştiremez. Ve tohumu bilmeyen biri, bir takma addan ötekini hesaplayamaz. Pratikte takma ad çoğu zaman o değerden türetilen bir anahtar çiftinin açık yarısı olarak sunulur; böylece site, kişinin takma adın sahibi olduğunu her girişte bir imzayla doğrulayabilir.

Asıl zorluk tohumun nerede durduğudur. Tohum yalnızca telefondaysa, telefon kaybolduğunda bütün takma adlar ve onlara bağlı hesaplar kaybolur. Tohum bir yedekte ya da bir sunucuda saklanırsa, o yedeği ya da sunucuyu ele geçiren herkes bütün takma adları hesaplayabilir. Tohum kişinin kimliğinden türetilirse (örneğin kimlik doğrulama sırasında bir hizmet tarafından), telefon değişse de aynı takma adlar geri gelir ve "kişi başına tek hesap" sağlanır; ama o hizmet teorik olarak takma adları hesaplayabilecek konumda olur. Her seçenek bir şey kazandırıp bir şey kaybettirir. Sıfır bilgi ispatıyla üretilen takma adlar (literatürdeki adıyla #{emph[nullifier]}) bu üçlemeyi aşmanın araştırılan yoludur.
]

#kutu("ornek", [Timur ve kampüs anketi])[
Timur’un üniversitesi, öğrencilerin yemekhane hakkındaki görüşlerini soran bir anket açıyor. Üniversite iki şey istiyor: Her öğrenci yalnızca bir kez oy versin ve hiç kimse, yönetim dahil, hangi öğrencinin hangi cevabı verdiğini öğrenemesin.

Timur’un cüzdanı anket sitesine iki şey sunar: öğrenci belgesine dayanan "bu üniversitenin kayıtlı öğrencisiyim" ispatı ve bu anket için türetilmiş bir takma ad. Takma ad Timur’un tohumundan ve anketin kimliğinden türetildiği için, Timur ikinci kez oy vermeye kalkarsa aynı takma ad çıkar ve site ikinci oyu reddeder. Ama takma ad yalnızca bu ankete özgüdür; Timur’un kütüphane sistemindeki ya da spor salonundaki takma adıyla hiçbir ilişkisi yoktur. Bölüm 6.4’te anlatılan "sınırlı katılım" kullanımı budur. Bu senaryonun tam güvenli hâli, takma adın doğru türetildiğini ve öğrenci belgesine bağlı olduğunu sıfır bilgi ispatıyla göstermeyi gerektirir; ARF de bu kullanım için ortak bir mekanizmanın henüz belirtilmesi gerektiğini not eder \[5\].
]

#sekil(5, [Siteye özel takma ad: aynı tohumdan her site için ayrı, kalıcı bir değer], "figures/a5/sekil-5.svg", yarim: false)

= İptal Listeleri ve Bağlanabilirlik

== Sıra numarası neden tehlikeli?

Bölüm 4.4’te iptal listesindeki sıra numarasının bir belgeye özgü olduğunu söylemiştik. Bugün Avrupa’da yaygın olarak kullanılan iptal yöntemi, IETF’te standartlaştırılan Token Status List yaklaşımıdır \[13\]. Veren kurum, binlerce belgenin durumunu tek bir bit dizisinde toplar: Her belgeye dizide bir sıra ayrılır; o sıradaki bit sıfırsa belge geçerli, birse iptal edilmiştir. Dizi sıkıştırılıp imzalanır ve herkesin indirebileceği bir adreste yayımlanır. Belge, hangi listede kaçıncı sırada olduğunu taşır. Ayrıntılar dizinin yedinci yazısının konusu; burada bağlanabilirlikle ilgili üç noktaya bakalım.

#{strong[Birincisi, sıra numarası bir tanımlayıcıdır.]} Kopyaların hepsi aynı sırayı paylaşıyorsa, Bölüm 5’teki bütün çaba boşa gider. Bu yüzden her kopyanın listede kendi sırası olmalıdır. ARF bunu, veren kurumun belgedeki benzersiz öğeler arasında iptal sırasını da farklı tutma yükümlülüğüyle sağlar \[5\].

#{strong[İkincisi, sıralar rastgele atanmalıdır.]} Kurum sıraları artarak dağıtırsa, aynı paketteki kopyalar listede yan yana durur ve doğrulayıcılar "41817 ile 41818 aynı gün verilmiş" gibi çıkarımlar yapabilir. ARF, sıra numaralarının rastgele atanmasını, böylece sıranın bir ilişkilendirici (#{emph[correlator]}) hâline gelmemesini şart koşar \[5\].

#{strong[Üçüncüsü, liste kalabalık olmalıdır.]} Bir listede yalnızca birkaç yüz belge varsa, doğrulayıcının o listeyi indirmesi bile kurum için anlamlı bir bilgidir: "Bu doğrulayıcı, şu küçük gruptan birinin belgesini görmüş." ARF, her listede #{strong[sürü gizliliğini]} sağlayacak kadar çok belge bulunmasını ister ve belge sayısı az olan kurumların listeye sahte kayıtlar eklemesini önerir \[5\]. Burada sürü gizliliğinin anlamı şudur: Bir doğrulayıcı belirli bir listeyi indirdiğinde, kurum bu doğrulayıcıya hangi belgenin gösterildiğini kestiremez.

#kutu("teknik", [Bir durum listesi ne kadar büyük, sürü ne kadar kalabalık?])[
Token Status List’te her belge için listede bir ya da birkaç bit ayrılır; en basit hâlinde tek bit yeter (0 geçerli, 1 iptal) \[13\]. Liste sıkıştırılarak yayımlanır. Aşağıdaki hesap kabadır ve değerler örnektir.

Bir milyon belgelik, belge başına tek bitlik bir listenin sıkıştırılmadan önceki boyutunu bulalım. Sekiz bit bir bayt eder:

#formul[$ "boyut" &= ("1.000.000" "belge" dot 1 "bit") / (8 "bit/bayt") \
        &= "125.000" "bayt" approx 122 "KB" $]

İptal oranı %1 ise bitlerin çoğu 0 olduğu için liste iyi sıkışır; sıkıştırılmış hâli genellikle birkaç on KB tutar.

Bir doğrulayıcı bu listeyi indirdiğinde kurumun öğrenebileceği şey, listenin kaç belge taşıdığına bağlıdır:

#tablo([], (11fr, 48fr), ([Listedeki belge sayısı], [Kurumun öğrenebileceği],), (
  ([1\.000.000], ["Bu doğrulayıcı, bu listedeki 1.000.000 belgeden birini (ya da hiçbirini) görmüş olabilir."],),
  ([300], ["300 kişiden birinin belgesini görmüş olabilir." Bu çok daha ayırt edici bir bilgidir.],),
))

Sürü gizliliği bu yüzden listenin boyuyla doğrudan ilişkilidir. Kopyaların her biri listede ayrı bir yer kapladığı için, toplu kopya kullanan bir sistemde liste kişi sayısının kopya sayısıyla çarpımı kadar büyür; bu, iptal listelerini daha da kalabalık ve dolayısıyla daha mahremiyet dostu yapan bir yan etkidir.
]

== Listeyi kim, ne zaman indirir?

İptal listesinin bir avantajı, doğrulayıcının belge başına soru sormak yerine listenin tamamını indirmesidir. Ama doğrulayıcı listeyi her gösterimde, gösterimden hemen sonra indirirse, kurum indirme zamanlarından gösterim zamanlarını çıkarabilir. ARF bu yüzden doğrulayıcıların listeyi her gösterimde istememesini, her yeni sürümü gösterimlerden bağımsız bir zamanda bir kez indirip kendi içinde dağıtmasını ve önbellekte tutmasını önerir; veren kurumun da liste indirmek için doğrulayıcıdan kimlik doğrulaması istememesini şart koşar \[5\]. Böylece kurum, listesini kimin, hangi gösterim için indirdiğini bilemez.

#sekil(6, [İptal listesinde bağlanabilirliği azaltan üç önlem], "figures/a5/sekil-6.svg", yarim: false)

== İptale gerek bırakmamak

Bir başka yol, iptal edilebilir bilgiyi belgeden tamamen çıkarmaktır. Belge birkaç saat ya da bir gün geçerliyse ve kurum iptal edilen bir belgenin yenisini vermiyorsa, doğrulayıcının ayrıca iptal kontrolü yapmasına gerek kalmaz; belgede sıra numarası da bulunmaz. Bu yaklaşım Yöntem B’nin uç hâlidir ve sıfır bilgi ispatlarıyla birlikte sık kullanılır, çünkü iptal kontrolü sıfır bilgi ispatının içinde yapılmadıkça sıra numarası ispatın sağladığı bağlanamazlığı bozar (dizinin dördüncü yazısı). Bedeli, cüzdanın kurumla sık konuşmasıdır.

= Sıfır Bilgi İspatlarıyla Tam Bağlanamazlık

== Kopyaların kapatamadığı boşluk

Bölüm 5’in sonunda toplu kopyaların veren kurum bağlanabilirliğini kapatamadığını söylemiştik. Kurum her kopyayı kendisi imzaladığı için, değerleri saklamışsa doğrulayıcılardan gelen her değeri tanıyabilir. ARF bu konuda açıktır: Tuzlu özetlere dayanan belge biçimleri kullanıldığı sürece veren kurum bağlanabilirliği tamamen ortadan kaldırılamaz; tek etkili önlem, ispat mekanizması olarak tuzlu özetler yerine sıfır bilgi ispatlarını benimsemektir \[5\].

Dizinin dördüncü yazısında anlattığımız gibi, sıfır bilgi ispatında doğrulayıcı belgenin imzasını, anahtarını, özetlerini ya da sıra numarasını hiç görmez; yalnızca bir ifadenin doğru olduğuna dair bir ispat görür. Her ispat yeni rastgelelikle üretildiği için iki ispat birbirine benzemez. Doğrulayıcının elinde kuruma geri götürebileceği bir değer olmadığından, kurum da ispatı kendi kaydıyla eşleştiremez. Tek bir belge, sınırsız sayıda gösterimde, ne doğrulayıcılar ne de veren kurum tarafından bağlanamaz. Kopya tükenmesi, yenileme yükü ve yenileme zamanının sızdırdığı bilgi de ortadan kalkar.

Aynur’un hikâyesini sıfır bilgi ispatlarıyla yeniden düşünelim. Emlak sitesi ve iş sitesi diplomanın kendisini değil, "bu kişinin güven listesindeki bir üniversiteden yüksek lisans diploması var" ifadesinin ispatını alır. İki ispatta da ortak bir değer yoktur. Veri aracısı iki kaydı teknik değerlerden eşleştiremez. Üniversite de, aracının elindeki ispatları görse bile, hangisinin kendi verdiği hangi diplomadan üretildiğini bilemez. Aynur’un cüzdanında ise yirmi kopya yerine tek bir diploma durur ve yenilenmesi gerekmez.

== Neden henüz her yerde değil?

Bu kadar güçlü bir çözüm varken toplu kopyaların hâlâ varsayılan yöntem olmasının nedenleri, dizinin dördüncü yazısında ayrıntılı anlatılmıştı. Burada bağlanamazlık açısından özetleyelim.

#{strong[Belirli bir şema henüz seçilmedi.]} ARF’nin Temmuz 2026’daki 3.0.0 sürümü, sıfır bilgi ispatları üzerindeki tartışmaların sürdüğünü ve ekosistemde desteklenmek üzere belirli bir şemanın henüz seçilmediğini açıkça yazar; konuyu sıfır bilgi ispatlarına ayrılmış üç teknik şartnameye bırakır \[5\].

#{strong[Güvenli donanım desteği yok.]} ARF, sıfır bilgi ispatlarının entegrasyonunun hâlâ tartışma ve geliştirme aşamasında olmasının nedenleri arasında, bu ispatları güvenli donanımda uygulamanın karmaşıklığını ve bugün kullanılabilen güvenli donanımlarda desteğin bulunmamasını sayar \[5\]. Cihaz anahtarının güvenli donanımda tutulması yüksek güvence düzeyinin şartlarından biri olduğu için, bu sınır pratikte önemlidir.

#{strong[Kurumların imzası.]} İmza tabanlı anonim belgeler (örneğin BBS imzaları) küçük ve hızlı ispatlar verir, ama kurumların imza altyapısını değiştirmesini gerektirir. Var olan ECDSA imzaları üzerinde çalışan devre tabanlı ispatlar kurumlara dokunmaz, ama ispatlar yüzlerce kilobayt tutar ve telefonda saniyeler alır \[18\].

#{strong[Bir uzman görüşü.]} 2024 Haziran’ında aralarında anonim belge şemalarının mucitlerinin de bulunduğu on altı kriptografçıdan oluşan bir grup, ARF’ye ortak bir değerlendirme sundu. Değerlendirme, o dönemki yaklaşımların tüzüğün istediği mahremiyet özelliklerini, özellikle bağlanamazlığı tam karşılayamayacağını, bunun için bu iş için tasarlanmış anonim belge şemalarına geçilmesi gerektiğini savundu \[14\]. Bu görüş Avrupa’daki tartışmayı etkiledi; aradan geçen sürede iki sıfır bilgi yolu da teknik şartnamelere girdi.

Bugünkü tablo şöyle özetlenebilir. Doğrulayıcılar arası bağlanamazlık, toplu kopyalarla bugün sağlanabiliyor ve Avrupa mimarisinin varsayılanı. Veren kurum bağlanamazlığı ise sıfır bilgi ispatlarını bekliyor; bu arada örgütsel önlemlerle, denetimle ve kurumların değerleri silme yükümlülüğüyle sınırlanıyor. ARF, veren kurumların çoğunun düzenli denetimlere tabi olduğunu ve bu yüzden iş birliği ve izlemenin doğrulayıcılara göre daha kolay fark edilebileceğini not eder \[5\].

= Hukuk Tarafı: Bağlanamazlık Bir Tercih mi, Yükümlülük mü?

== eIDAS 2.0 ne istiyor?

Avrupa Birliği’nde bağlanamazlık, iyi bir mühendislik alışkanlığı olmanın ötesinde hukuki bir yükümlülüktür. eIDAS 2.0 olarak bilinen 2024\/1183 sayılı Tüzük \[11\], bu konuda birkaç yerde açık hükümler içerir.

#{strong[Veren kurum izleyemez.]} Tüzüğün cüzdanı düzenleyen 5a maddesinin 16. fıkrası, cüzdanın teknik çerçevesinin, belge verildikten sonra veren kurumun ya da başka herhangi bir tarafın, kullanıcı açıkça izin vermedikçe, işlemlerin ya da kullanıcı davranışının izlenmesine, birbirine bağlanmasına ya da ilişkilendirilmesine imkân veren veri elde etmesine izin vermemesini ister. Aynı fıkra, belgenin kullanıcının kimliğinin belirlenmesini gerektirmediği durumlarda bağlanamazlığı sağlayan mahremiyet koruyucu tekniklerin mümkün kılınmasını şart koşar.

#{strong[Cüzdan sağlayıcı gözlemleyemez.]} Aynı maddenin 14. fıkrası, cüzdan sağlayıcının cüzdan hizmetinin sunulması için gerekli olmayan kullanım bilgisini toplamasını ve cüzdandaki verileri kendi ya da üçüncü tarafların diğer hizmetlerindeki verilerle, kullanıcı açıkça istemedikçe, birleştirmesini yasaklar. Bölüm 3.4’teki tehdit doğrudan bu hükmün konusudur.

#{strong[Takma adlar.]} Bölüm 6.4’te gördüğümüz gibi, tüzük takma adların kullanılmasını yasaklanamaz kılar, cüzdanlardan takma ad üretmelerini ister ve güvenen tarafların, kimlik belirlemenin hukuken gerekli olmadığı durumlarda takma adı reddedemeyeceğini öngörür.

#{strong[Gerekçeler.]} ARF, tüzüğün gerekçe bölümlerinde hizmetlere erişimin tasarımdan itibaren mahremiyeti koruyacak biçimde olması, mahremiyeti artıran teknolojilerle desteklenmesi ve gözlemlenemezlik ilkesinin korunması yönündeki ifadelere dikkat çeker \[5\]. Bu gerekçeler, teknik belirtimlerdeki tercihlerin yorumlanmasında yol gösterir.

== Genel veri koruma hukuku

eIDAS 2.0’ın bu hükümleri boşlukta durmaz. Avrupa Birliği’nin Genel Veri Koruma Tüzüğü, kişisel verilerin işlendikleri amaç için gerekli olanla sınırlı tutulmasını (veri en aza indirme ilkesi) ve veri korumanın sistemlere tasarım aşamasından itibaren yerleştirilmesini ister \[15\]. Türkiye’de 6698 sayılı Kişisel Verilerin Korunması Kanunu da kişisel verilerin işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmasını genel ilkeler arasında sayar \[16\]. Bir doğrulayıcının, işi için gerekmediği hâlde kişiyi başka kayıtlarla eşleştirmeye yarayan teknik değerleri saklaması, bu ilkelerle bağdaşması zor bir uygulamadır. Bağlanamazlık, veri en aza indirme ilkesinin zaman boyutundaki karşılığı olarak düşünülebilir: Yalnızca bugün gerekeni almak değil, yarın birleştirilebilecek olanı da bırakmamak.

== Kurallar ve yaptırım

Kriptografi bağlantıyı zorlaştırabilir, ama her zaman imkânsız kılamaz; Bölüm 4.6’da gördüğümüz gibi açılan bilgilerin kendisi de bağlantı kurabilir. Bu yüzden Avrupa mimarisi teknik önlemleri örgütsel önlemlerle tamamlar. Güvenen taraflar hangi bilgileri, hangi amaçla isteyeceklerini önceden kaydettirir ve cüzdan kayıtlı olmayan istekler karşısında kişiyi uyarabilir. ARF’ye göre, kişileri izlemek için iş birliği yaptığı tespit edilen güvenen tarafların erişim sertifikaları iptal edilebilir ve bu taraflar artık cüzdanlarla etkileşime giremez \[5\]. Veren kurumlar ise bağlanabilirlik risk analizi yapmak ve yöntem seçimlerini bir politikaya dayandırmak zorundadır.

= Yöntemlerin Karşılaştırması

Artık bütün yöntemleri yan yana koyabiliriz. Tablo 2, her yöntemin hangi bağlanabilirlik türüne karşı koruma sağladığını ve bunun bedelini gösteriyor.

#tablo([#{strong[Tablo 2.]} Bağlanamazlık yöntemlerinin karşılaştırması.], (25fr, 18fr, 15fr, 18fr, 25fr, 26fr), ([Yöntem], [Doğrulayıcılar arası], [Aynı doğrulayıcı, zaman içinde], [Veren kurum + doğrulayıcı], [Başlıca bedel], [Standart durumu],), (
  ([Tek belge, her yerde aynı], [korumaz], [korumaz], [korumaz], [yok], [—],),
  ([Yöntem A: bir kez kullanılan kopyalar], [korur], [korur], [korumaz (silme yükümlülüğü ve denetime dayanır)], [çok sayıda imza, sık yenileme, çevrimiçi olma], [ARF’de zorunlu destek; OpenID4VCI toplu verme],),
  ([Yöntem B: süresi kısa belge], [süre içinde korumaz], [süre içinde korumaz], [korumaz], [sık yenileme], [ARF’de zorunlu destek],),
  ([Yöntem C: dönen paket], [kısmen], [kısmen], [korumaz], [paket yönetimi], [ARF’de isteğe bağlı],),
  ([Yöntem D: doğrulayıcı başına kopya], [korur], [bilerek tanınır], [korumaz], [doğrulayıcı sayısı kadar kopya], [ARF’de isteğe bağlı],),
  ([Siteye özel takma ad], [korur (takma ad düzeyinde)], [bilerek tanınır], [tohum nerede durduğuna bağlı], [tohumun yedeklenmesi ve kurtarılması], [eIDAS ve uygulama tüzüğünde zorunlu işlev],),
  ([Rastgele iptal sırası ve sürü gizliliği], [iptal alanını korur], [iptal alanını korur], [liste indirme düzeyinde korur], [büyük listeler, sahte kayıtlar], [ARF’de zorunlu],),
  ([Sıfır bilgi ispatı], [korur], [korur], [korur], [ispat boyu ve süresi, güvenli donanım desteği], [AB teknik şartnameleri, IETF taslakları; şema seçilmedi],),
))

Tabloyu okurken dikkat edilmesi gereken üç nokta var.

Birincisi, hiçbir satır her sütunda "korur" demiyor; sıfır bilgi ispatı bile, gösterimin çevresindeki izleri (Bölüm 4.7) ve açılan bilgilerin kendisini (Bölüm 4.6) kapsamıyor. Bağlanamazlık ancak birlikte çalışan önlemlerle sağlanıyor; tek bir teknik buna yetmiyor.

İkincisi, "aynı doğrulayıcı, zaman içinde" sütunundaki "bilerek tanınır" ifadesi bir eksiklik sayılmamalı. Bazı hizmetler kişiyi tanımak zorundadır; doğru tasarım, tanınmanın gerektiği yerle sınırlı kalmasıdır. Yöntem D ve siteye özel takma adlar tam bunu yapıyor.

Üçüncüsü, "veren kurum + doğrulayıcı" sütununda yalnızca sıfır bilgi ispatı teknik bir koruma sağlıyor. Diğer bütün yöntemlerde bu koruma, kurumun değerleri silmesine, denetime ve hukuka dayanıyor. Bu fark, kimlik belgesini verenin devlet olduğu bir sistemde küçük bir ayrıntı sayılmaz.

== Hangi belge için hangi yöntem?

ARF’nin veren kurumlardan bir bağlanabilirlik risk analizi istemesi, yöntem seçiminin belge türüne göre değişeceğini kabul ettiğini gösteriyor. Tablo 3, bu yazıdaki tartışmadan çıkan kaba bir yol haritası öneriyor. Tablo bir standart sayılmamalı; düşünmeye başlamak için bir çerçevedir.

#tablo([#{strong[Tablo 3.]} Belge türüne göre bağlanamazlık için kaba bir yol haritası (öneri).], (37fr, 14fr, 8fr, 48fr), ([Belge ve kullanım], [Ne sıklıkla gösterilir?], [Kimlik açılır mı?], [Önerilebilecek yaklaşım],), (
  ([Kişi kimlik verisi, yaş ya da uyruk gibi tek bir koşul için], [çok sık], [hayır], [sıfır bilgi ispatı; olmadığı yerde bir kez kullanılan kopyalar],),
  ([Kişi kimlik verisi, hesap açma gibi kimlik gerektiren işlemler için], [seyrek], [evet], [kopya seçimi önemsiz; asıl koruma veri en aza indirme ve saklama kuralları],),
  ([Diploma, meslek belgesi], [ara sıra], [çoğu zaman evet], [doğrulayıcı başına kopya; açılan alanların sınırlanması],),
  ([Öğrenci, üyelik, indirim belgesi], [sık], [hayır], [bir kez kullanılan kopyalar ya da kısa ömürlü belgeler; uzun vadede sıfır bilgi],),
  ([Bir hizmete giriş (hesap)], [her girişte], [hayır], [siteye özel takma ad; kayıt sırasında gereken belge bir kez],),
  ([Oylama, anket, kişi başına tek katılım], [bir kez], [hayır], [sınırlı katılımlı takma ad; sıfır bilgi ispatıyla birlikte],),
))

Tablonun ikinci satırı önemli bir noktayı hatırlatıyor. Kimliğin zaten açıldığı işlemlerde kopya seçimi bağlanabilirliği değiştirmez, çünkü doğrulayıcı kişinin adını ve kimlik numarasını görür. Bu işlemlerde mahremiyeti koruyan şey, doğrulayıcının yalnızca gerekeni istemesi ve aldığı bilgiyi yalnızca gerektiği kadar saklamasıdır. Kriptografinin sağladığı bağlanamazlık, kimliğin açılmadığı işlemlerde anlam kazanır; dijital kimliğin geleceğindeki işlemlerin çoğunun da bu türden olması beklenir.

= Sınırlar ve Açık Sorular

#{strong[Gerektiğinde kimlik.]} Bazı işlemler kimlik belirlemeyi hukuken gerektirir: banka hesabı açmak, bir sözleşme imzalamak, bir kamu hizmetine başvurmak. Bu işlemlerde kişi adını ve kimlik numarasını gösterir ve bağlanamazlık o işlem için zaten söz konusu değildir. Asıl soru, kimlik belirlemenin gerçekten gerektiği yerlerle gerekmediği yerler arasındaki sınırın nerede çizileceğidir. Bu sınırı teknoloji çizemez; hukuki ve siyasi bir karardır. Avrupa’nın yaş doğrulama çözümüne yöneltilen eleştirilerden biri de, bazı ülkelerin yaş doğrulamayla yetinmeyip tam kimlik istemeyi planlamasıydı \[8\].

#{strong[Hesap verebilirlik ile bağlanamazlık arasındaki gerilim.]} Bağlanamazlık, kötüye kullanımı izlemeyi de zorlaştırır. Aynı kişinin bir hizmette yüz hesap açması, bir oylamaya iki kez katılması, sahte yorumlar yazması, bağlanamazlık arttıkça daha zor fark edilir. "Kişi başına tek hesap" gibi sınırlı katılım mekanizmaları bu gerilime bir cevap arıyor, ama ortak belirtimler henüz tamamlanmadı.

#{strong[Küçük topluluklar.]} Sürü gizliliği kalabalığa dayanır. Küçük bir ülkede, küçük bir meslek odasında ya da az sayıda öğrencisi olan bir programda, bir iptal listesinde ya da bir zaman damgası aralığında yeterince kişi bulunmayabilir. Sahte kayıtlar ve kaba zaman aralıkları yardımcı olur, ama bir sınırı vardır.

#{strong[Çevrimdışı kullanım.]} Yöntem A ve kısa ömürlü belgeler cüzdanın sık sık çevrimiçi olmasını gerektirir. İnternet erişimi kesintili olan bölgelerde ya da uzun yolculuklarda cüzdan, bağlanabilirliği daha yüksek yöntemlere düşmek zorunda kalabilir. Bu, mahremiyetin internet erişimine göre eşitsiz dağılması anlamına gelir.

#{strong[Belgenin dışındaki izler.]} Cüzdan ve belge düzeyinde mükemmel bir bağlanamazlık sağlansa bile, bir doğrulayıcının web sitesi IP adresini, tarayıcı parmak izini ve oturum çerezlerini kaydetmeye devam eder. Belge düzeyindeki çaba, ancak bu katmanlardaki önlemlerle birlikte anlam kazanır.

#{strong[Doğrulamanın doğrulanması.]} Kişi, cüzdanının gerçekten her gösterimde farklı kopya kullandığını, sıra numaralarının gerçekten rastgele atandığını, veren kurumun değerleri gerçekten sildiğini kendisi göremez. Bu güvenceler açık kaynak kod, bağımsız denetim ve sertifikasyonla somutlaşır. Bağlanamazlık, kişinin görmediği yerde yapılan doğru tasarımlara duyulan güvene dayanır.

= Tamga Network Bu Konuda Nerede?

Bu yazı dizisini yayımlayan Tamga Network, Türkiye ve Türk dünyası için AB’nin dijital kimlik profilleriyle uyumlu, kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır. Ağ kendisi bir cüzdan işletmez; belge veren kurumları, cüzdanları ve doğrulayıcıları imzalı güven listelerinde listeler ve açık kaynak yazılım paketleri yayımlar. Ağın kamuya açık belgeleri, bağlanamazlık için bu yazıda anlatılan yöntemlerin birkaçını birlikte kullanan bir yaklaşım tarif ediyor \[21\]:

- #{strong[Doğrulayıcı başına kopya.]} Cüzdan her belgeden birkaç kopya alır ve her doğrulayıcıya ayrı bir kopya gösterir; aynı doğrulayıcıya hep aynı kopyayı. Bu, Bölüm 5.3’teki Yöntem D’ye karşılık gelir: İki doğrulayıcı imza ya da anahtar değerlerini karşılaştırarak kişiyi eşleştiremez. Kopyalar azalınca cüzdan arka planda yeniler.
- #{strong[Siteye özel takma ad.]} Ağın tanımladığı "giriş yap" akışında siteye kimlik numarası ya da belge özeti gönderilmez; cüzdan her site için ayrı ve kalıcı bir takma ad türetir. Telefon değişip kimlik yeniden doğrulandığında aynı takma adlar geri gelir ve kişi başına sitede tek hesap varsayılandır. Belgeler, bu yaklaşımın Bölüm 6.4’teki teknik kutuda anlatılan bedelini de açıkça kaydeder: Tohum kimlikten türetildiği için kimlik hizmeti teorik olarak takma adı hesaplayabilecek konumdadır; bu risk anahtar koruması ve denetimle sınırlanır ve uzun vadede sıfır bilgi ispatıyla kaldırılması hedeflenir.
- #{strong[Sıfır bilgi ispatıyla yaş.]} "18 yaşından büyüğüm" ispatı belgenin kendisi gösterilmeden üretilir; dizinin dördüncü yazısında anlatılan yaklaşımla, iki gösterim birbirine bağlanamaz.
- #{strong[Doğrulayıcıların yükümlülükleri.]} Ağın kuralları, doğrulayıcıların alan değerlerini ve iptal sırasını günlüğe yazmamasını, kayıtlı kapsamlarının dışında alan istememesini ister.

Ağın güven listelerinin hiçbir kişisel veri içermediğini ve bugün blokzincir kullanılmadığını da ekleyelim.

= Sonuç

Aynur bir hafta içinde beş yerde belge gösterdi ve hiçbirinde gereğinden fazlasını paylaşmadı. Yine de iki kurum, belgenin taşıdığı ve Aynur’un hiç görmediği değerler üzerinden onu tanıdı. Bu yazı bu durumun nasıl oluştuğunu ve nasıl önlenebileceğini anlattı.

Bağlanabilirliğin tek bir tehdit olmadığını gördük. Doğrulayıcılar birbirini bağlayabilir, veren kurum doğrulayıcılarla birlikte kişiyi izleyebilir, cüzdan sağlayıcı kullanımı gözleyebilir, iptal kontrolü sırasında bile bilgi sızabilir. Her tehdidin çözümü farklıdır. Toplu verilen tek kullanımlık kopyalar doğrulayıcıları birbirinden ayırır ve bugün Avrupa mimarisinin varsayılanıdır. Siteye özel takma adlar, tanınmanın gerektiği yerde tanınmayı bağlamlar arasında bağlanamazlıkla birleştirir. Rastgele iptal sıraları ve kalabalık listeler, iptal kontrolünün bir izleme kanalına dönüşmesini önler. Sıfır bilgi ispatları ise bu yöntemlerin kapatamadığı son boşluğu, veren kurumun izleme imkânını, teknik olarak kapatabilen tek araçtır ve yaygınlaşmayı bekliyor.

Belki en önemli ders, bağlanamazlığın kendiliğinden ortaya çıkmamasıdır. Fiziksel dünyada görevlinin unutkanlığı bizi koruyordu. Dijital dünyada her değer varsayılan olarak kaydedilir ve her kayıt varsayılan olarak birleştirilebilir. Bu yüzden unutma, belgenin, cüzdanın ve doğrulayıcının tasarımına bilinçli olarak yazılmak zorundadır. Avrupa Birliği bunu bir hukuki yükümlülüğe dönüştürdü. Bu yükümlülüğün gerçekten yerine gelip gelmediği ise kişinin göremediği yerlerde yapılan tasarım tercihlerine ve onları denetleyecek kurumlara bağlı. Dizinin bir sonraki yazısında, bütün bu sistemin dayandığı soruya döneceğiz: Bir imzayı atan kurumun gerçekten yetkili olduğunu kime sorarak biliyoruz?

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Pfitzmann, A. ve Hansen, M. (2010). #{emph[A terminology for talking about privacy by data minimization: Anonymity, Unlinkability, Undetectability, Unobservability, Pseudonymity, and Identity Management.]} Sürüm 0.34, 10 Ağustos 2010.]

#kaynak("2")[Sweeney, L. (2000). #{emph[Simple Demographics Often Identify People Uniquely.]} Carnegie Mellon University, Data Privacy Working Paper 3, Pittsburgh.]

#kaynak("3")[de Montjoye, Y.-A., Hidalgo, C. A., Verleysen, M. ve Blondel, V. D. (2013). "Unique in the Crowd: The privacy bounds of human mobility." #{emph[Scientific Reports]}, 3, 1376.]

#kaynak("4")[Eckersley, P. (2010). "How Unique Is Your Web Browser?" #{emph[Privacy Enhancing Technologies Symposium (PETS 2010)]}, LNCS 6205. Springer.]

#kaynak("5")[Avrupa Komisyonu ve eIDAS Uzman Grubu (2026). #{emph[European Digital Identity Wallet — Architecture and Reference Framework (ARF)]}, sürüm 3.0.0, 23 Temmuz 2026. Özellikle Bölüm 2.5 ve 4.7 (takma adlar), 5.3 (mantıksal ve teknik belgeler), 7.4.3.5 (bağlanabilirlik riskleri ve önlemleri) ve Ek 2’deki üst düzey gereksinimler (Konu 7, 10 ve 11). github.com\/eu-digital-identity-wallet.]

#kaynak("6")[Lodderstedt, T., Yasuda, K., Looker, T. ve diğerleri (2025). #{emph[OpenID for Verifiable Credential Issuance 1.0.]} OpenID Foundation, 16 Eylül 2025.]

#kaynak("7")[Fett, D., Yasuda, K. ve Campbell, B. (2025). #{emph[Selective Disclosure for JSON Web Tokens.]} IETF RFC 9901, Kasım 2025. Bölüm 10.1 (Unlinkability).]

#kaynak("8")[Avrupa Komisyonu (2025–2026). #{emph[EU age verification blueprint]}: duyurular, bilgi sayfası ve teknik belirtim (ageverification.dev); ayrıca European Digital Rights (EDRi) (2026), "Why the EU age-verification tool does not solve privacy concerns", 7 Eylül 2026.]

#kaynak("9")[Sakimura, N., Bradley, J., Jones, M., de Medeiros, B. ve Mortimore, C. (2014). #{emph[OpenID Connect Core 1.0.]} OpenID Foundation, Bölüm 8 (Subject Identifier Types).]

#kaynak("10")[W3C. #{emph[Web Authentication: An API for accessing Public Key Credentials.]} W3C Recommendation (Level 1, Mart 2019; sonraki seviyeler).]

#kaynak("11")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024. Madde 5, 5a ve 5b.]

#kaynak("12")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Cüzdanlarının bütünlüğü ve temel işlevlerine ilişkin kuralları belirleyen 2024\/2979 sayılı Uygulama Tüzüğü (AB).]} 28 Kasım 2024. Madde 14(2).]

#kaynak("13")[Looker, T., Bastian, P. ve Bormann, C. (2026). #{emph[Token Status List.]} IETF OAuth Çalışma Grubu İnternet taslağı draft-ietf-oauth-status-list-21, 21 Haziran 2026 (RFC Editör aşamasında).]

#kaynak("14")[Baum, C., Blazy, O., Hoepman, J.-H., Lehmann, A., Lysyanskaya, A. ve diğerleri (2024). "Cryptographers’ Feedback on the EU Digital Identity’s ARF." ARF GitHub tartışmaları, 19 Haziran 2024.]

#kaynak("15")[Avrupa Parlamentosu ve Konseyi (2016). #{emph[Kişisel verilerin işlenmesi bakımından gerçek kişilerin korunması ve bu verilerin serbest dolaşımına ilişkin 2016\/679 sayılı Tüzük (AB) (Genel Veri Koruma Tüzüğü).]} Madde 5(1)(c) ve 25.]

#kaynak("16")[6698 sayılı Kişisel Verilerin Korunması Kanunu. #{emph[Resmî Gazete]}, 7 Nisan 2016. Madde 4.]

#kaynak("17")[Chaum, D. (1985). "Security Without Identification: Transaction Systems to Make Big Brother Obsolete." #{emph[Communications of the ACM]}, 28(10), 1030–1044.]

#kaynak("18")[Frigo, M. ve shelat, a. (2024). "Anonymous Credentials from ECDSA." #{emph[Cryptology ePrint Archive]}, Rapor 2024\/2010.]

#kaynak("19")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]}]

#kaynak("20")[Cooper, A., Tschofenig, H., Aboba, B., Peterson, J., Morris, J., Hansen, M. ve Smith, R. (2013). #{emph[Privacy Considerations for Internet Protocols.]} IETF RFC 6973.]

#kaynak("21")[Tamga Network (2026). #{emph[Gizlilik]} (kavramlar) ve #{emph[ADR-0031: Per-site pseudonyms]}. docs.tamga.network.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Konuya yeni başlayan bir okur için, bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[Pfitzmann ve Hansen, #{emph[A terminology for talking about privacy by data minimization]} (2010).]} Anonimlik, bağlanamazlık, takma adlılık ve gözlemlenemezlik kavramlarının en çok başvurulan tanımları. Kısa bölümler hâlinde, sırayla okunabilir.
+ #{strong[ARF 3.0.0, Bölüm 7.4.3.5.]} Avrupa cüzdan mimarisinin bağlanabilirlik risklerini ve önlemlerini kendi diliyle anlattığı birkaç sayfa; bu yazıdaki "doğrulayıcı" ve "veren kurum" bağlanabilirliği ayrımının kaynağı.
+ #{strong[David Chaum, #{emph[Security Without Identification]} (1985).]} Siteye özel takma adlar ve bağlanamaz işlemler fikrinin kırk yıllık kökü.
+ #{strong[Cryptographers’ Feedback on the EU Digital Identity’s ARF (2024).]} Avrupa mimarisinin bağlanamazlık konusundaki eleştirisini, kriptografinin önerdiği alternatiflerle birlikte, uzman olmayan okura da açık bir dille sunan bir değerlendirme.
+ #{strong[de Montjoye ve diğerleri, #{emph[Unique in the Crowd]} (2013).]} Birkaç "anonim" veri noktasının bir insanı nasıl tanımladığını gösteren kısa ve çarpıcı bir makale.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. İngilizce karşılıklar, başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (20fr, 20fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Anahtar bağlama], [key binding], [Kişinin cihaz anahtarıyla, o gösterime özel olarak attığı imza],),
  ([Anonimlik], [anonymity], [Bir kişinin bir grup içinde tanımlanamaması],),
  ([Bağlanabilirlik], [linkability], [İki olayın aynı kişiye ait olduğunun anlaşılabilmesi],),
  ([Bağlanamazlık], [unlinkability], [İki olayın aynı kişiye ait olup olmadığının dışarıdan bilinememesi],),
  ([Bir kez kullanılan belge], [once-only attestation], [Yalnızca bir gösterimde kullanılan, toplu verilmiş teknik kopya (ARF Yöntem A)],),
  ([Doğrulayıcı başına kopya], [per-Relying Party attestation], [Her doğrulayıcıya ayrı, aynı doğrulayıcıya hep aynı kopya (ARF Yöntem D)],),
  ([Dönen paket], [rotating-batch attestation], [Paketteki kopyaların rastgele sırayla tekrar tekrar kullanılması (ARF Yöntem C)],),
  ([Gözlemlenemezlik], [unobservability], [Bir olayın gerçekleştiğinin bile fark edilmemesi],),
  ([Güvenen taraf bağlanabilirliği], [Relying Party linkability], [Doğrulayıcıların, tek başına ya da birlikte, gösterimleri birbirine bağlaması],),
  ([İlişkilendirici], [correlator], [Farklı kayıtları birbirine bağlamaya yarayan sabit değer],),
  ([Mantıksal belge], [logical attestation], [Kişinin sahip olduğu belge; birçok teknik kopyayla temsil edilebilir],),
  ([Siteye özel takma ad], [pairwise pseudonym], [Her site için ayrı, o site içinde kalıcı tanımlayıcı],),
  ([Süresi kısa belge], [limited-time attestation], [Tek kopyanın kısa süre geçerli olup sık yenilenmesi (ARF Yöntem B)],),
  ([Sürü gizliliği], [herd privacy], [Bir değerin kalabalık bir grupla paylaşıldığı için kimseyi ele vermemesi],),
  ([Takma ad], [pseudonym], [Kişinin gerçek adı yerine kullanılan tanımlayıcı],),
  ([Takma adlılık], [pseudonymity], [Kişinin bir takma adla tanınıp kim olduğunun bilinmemesi],),
  ([Teknik belge], [technical attestation], [Mantıksal bir belgenin cüzdandaki somut, imzalı kopyalarından biri],),
  ([Toplu belge verme], [batch issuance], [Aynı belgenin birçok teknik kopyasının tek seferde verilmesi],),
  ([Tohum], [seed], [Takma adların türetildiği, yalnızca cüzdanın bilmesi gereken gizli değer],),
  ([Token Status List], [Token Status List], [Belgelerin durumunu bir bit dizisinde yayımlayan IETF iptal yöntemi],),
  ([Veren kurum bağlanabilirliği], [Attestation Provider linkability], [Veren kurumun, doğrulayıcılardan gelen değerlerle kişiyi izlemesi],),
  ([Yarı tanımlayıcı], [quasi-identifier], [Tek başına tanımlamayan ama başkalarıyla birlikte tanımlayan bilgi],),
))

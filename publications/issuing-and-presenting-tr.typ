// A8 — Belge Nasıl Verilir, Nasıl Gösterilir. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Belge Nasıl Verilir, Nasıl Gösterilir",
  altbaslik: "OpenID4VCI, OpenID4VP ve Cüzdanla Konuşmanın Kuralları",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Aralık 2026",
  surum: "1.0",
  lisans: "© 2026 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("OpenID4VCI", "OpenID4VP", "HAIP", "DCQL", "Digital Credentials API", "OAuth 2.0", "kimlik cüzdanı", "doğrulanabilir belge", "uyum testi",),
  atif: "Karataş, B. (2026). Belge Nasıl Verilir, Nasıl Gösterilir: OpenID4VCI, OpenID4VP ve Cüzdanla Konuşmanın Kuralları. Tamga Network Akademik Çalışmalar, A8. https://tamga.network/files/publications/issuing-and-presenting-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bir kimlik cüzdanı tek başına bir kutudur. Değerini, içine belge koyan kurumlarla ve o belgeleri görmek isteyen doğrulayanlarla konuşabilmesinden alır. Bu konuşmanın dünyanın her yerinde aynı kurallarla yapılması gerekir; yoksa her cüzdan her kurumla ayrı ayrı anlaşmak zorunda kalır. Bu yazı o kuralların bugün en yaygın iki parçasını anlatıyor: belge vermek için OpenID4VCI ve belge göstermek için OpenID4VP. İkisi de OpenID Vakfı’nda geliştirildi, 2025’te nihai sürümlerine ulaştı ve "Google ile giriş yap" düğmesinin arkasındaki OAuth 2.0 altyapısını yeni bir amaca uyarlıyor. Yanlarına, doğrulayanın ne istediğini tarif ettiği sorgu dili DCQL’i, Avrupa Birliği’nin bu protokollerden seçtiği yüksek güvence profili HAIP’i ve tarayıcının cüzdanla doğrudan konuşmasını sağlayan W3C Digital Credentials API’yi ekliyoruz.

Anlatımı bir öğrencinin, Aynur’un, gündelik iki işi üzerinden yürütüyoruz: üniversitenin verdiği öğrenci belgesini cüzdanına alması ve bir kurumun sitesinde o belgeyi göstermesi. Her akışı sıra diyagramıyla çiziyor, gidip gelen mesajları örnek değerlerle açıyor ve her adımda "bu adım hangi saldırıyı önlüyor?" sorusunu soruyoruz. Yazının sonunda protokollerin uyum testlerine, birbirinin yerine geçmeyen ama birbirini tamamlayan yollara ve hâlâ açık olan sorulara değiniyoruz.
  ],
)

= Giriş: Bir QR Kodun Arkasında

Eylül ayının ilk haftası. Aynur, İstanbul’daki yüksek lisans programına kaydını yaptırmış, öğrenci işleri bürosunun önündeki kuyruktan nihayet kurtulmuştur. Görevli ona bir kart uzatmak yerine ekrana dönüp bir QR kod gösterir: "Öğrenci belgenizi cüzdanınıza ekleyin." Aynur telefonunu kaldırır, kodu okutur, cüzdanında bir pencere açılır: "İstanbul’daki üniversite size #{emph[Öğrenci Belgesi]} vermek istiyor. E-postanıza gelen dört haneli kodu girin." Kodu girer. Birkaç saniye sonra cüzdanında yeni bir kart belirir.

Bir ay sonra Aynur bir öğrenci yurdunun sitesinde oda başvurusu yapar. Site "öğrenci olduğunuzu kanıtlayın" der ve bir düğme gösterir. Düğmeye basınca telefonu titrer: "Yurt başvuru sistemi öğrenci belgenizden şu bilgileri istiyor: adınız, soyadınız, öğrencilik durumunuz, belgenin geçerlilik tarihi. Paylaşılsın mı?" Aynur onaylar ve site "teşekkürler, öğrenciliğiniz doğrulandı" der.

Bu iki sahne, kullanıcı açısından birkaç dokunuştan ibarettir. Ama arkalarında, birbirini daha önce hiç görmemiş üç yazılımın (üniversitenin sunucusu, Aynur’un cüzdanı ve yurdun sitesi) aynı dili konuşması vardır. Cüzdanı bir şirket yazmış olabilir, üniversitenin sistemini başka bir şirket, yurdun sitesini bir üçüncüsü. Üniversite, Aynur’un hangi cüzdanı kullandığını bilmez; yurt da belgeyi hangi üniversitenin verdiğini önceden bilmez. Yine de mesajlar yerine ulaşır, belge doğru kişiye gider ve doğru kişiden gelir.

Bu yazının sorusu şu: #{strong[O birkaç saniyede kim kime ne söylüyor ve bu konuşmanın kuralları neden böyle seçilmiş?]} Dizinin ilk yazısında "Google ile giriş yap" düğmesine basıldığında arka planda dönen OpenID Connect akışını \[2\] adım adım izlemiştik. Bu yazıda aynı merakla iki yeni akışa bakıyoruz. Biri belgeyi kurumdan cüzdana taşıyan #{strong[OpenID4VCI]}, diğeri belgeyi cüzdandan doğrulayana taşıyan #{strong[OpenID4VP]}. İkisi de aynı ailedendir ve ikisi de, birazdan göreceğimiz gibi, OpenID Connect’in temelindeki OAuth 2.0’ın üzerine kurulmuştur.

Yazının planı şöyle. Bölüm 2’de "protokol", "biçim" ve "profil" kavramlarını ayırıyoruz; çünkü bu alandaki karışıklığın büyük kısmı bu üçünün birbirine karıştırılmasından doğar. Bölüm 3 OAuth 2.0’ı kısaca hatırlatıyor ve OpenID4VC ailesinin onu nasıl yeniden kullandığını gösteriyor. Bölüm 4 belge vermeyi, Bölüm 5 belge göstermeyi ve bu ikincinin içindeki sorgu dili DCQL’i anlatıyor. Bölüm 6 Avrupa Birliği’nin yüksek güvence profili HAIP’i, Bölüm 7 tarayıcı ile cüzdan arasındaki yeni köprü olan Digital Credentials API’yi ele alıyor. Bölüm 8 uyum testlerini, Bölüm 9 akışların karşılaştırmasını, Bölüm 10 açık soruları tartışıyor. Bölüm 11’de bu yazıyı yayımlayan Tamga Network’ün bu protokollerle ilişkisini kısaca anlatıyoruz.

Okurun hiçbir protokol bilgisi olmadığını varsayıyoruz. Gri zeminli "Teknik ayrıntı" kutuları gerçek mesajların içine bakmak isteyenler içindir; atlanırsa yazının akışı bozulmaz. Kutulardaki bütün değerler örnektir ve gerçek bir kişiye ya da kuruma ait değildir.

= Ortak Dil Neden Gerekli: Biçim, Protokol, Profil

Bir mektup düşünelim. Mektubun #{strong[içeriği]} bir dilde yazılır ve belirli bir düzene uyar: başta hitap, sonda imza. Mektubun #{strong[taşınması]} ise ayrı bir iştir: zarfa konur, üzerine adres yazılır, pula ve postaneye ihtiyaç vardır. Aynı mektup elden de verilebilir, faksla da gönderilebilir. İçerik ile taşıma birbirinden bağımsızdır.

Dijital belgelerde de aynı ayrım vardır ve bu yazı boyunca onu akılda tutmak işimizi çok kolaylaştıracak.

#{strong[Belge biçimi]} (#{emph[credential format]}), belgenin kendisinin nasıl kodlandığını söyler: hangi alanlar nerede durur, imza nasıl atılır, seçici açıklama nasıl yapılır. Dizinin ikinci ve üçüncü yazılarında iki biçimi ayrıntılı incelemiştik: JSON tabanlı #{strong[SD-JWT VC]} \[13, 14\] ve ikili CBOR tabanlı #{strong[mdoc]} (ISO\/IEC 18013-5). Bunlar mektubun içeriğine karşılık gelir.

#{strong[Protokol]} (#{emph[protocol]}), belgenin taraflar arasında nasıl taşındığını söyler: kim kime hangi sırayla hangi mesajı gönderir, her mesajda hangi alanlar bulunur, bir şey ters giderse ne olur. OpenID4VCI ve OpenID4VP birer protokoldür. İkisi de belge biçiminden bağımsız tasarlanmıştır; yani aynı OpenID4VP akışı içinde bir SD-JWT VC de, bir mdoc da, bir W3C doğrulanabilir belgesi de taşınabilir.

#{strong[Profil]} (#{emph[profile]}) ise bir ya da birkaç standardın içindeki seçenekleri daraltan bir kurallar setidir. Büyük standartlar çok sayıda seçenek tanımlar; çünkü farklı sektörlerin farklı ihtiyaçları vardır. Ama iki taraf farklı seçenekleri seçerse, ikisi de standarda "uygun" olduğu hâlde birbiriyle konuşamaz. Profil, "bu ekosistemde şu seçenekler zorunlu, şunlar yasak" diyerek bu sorunu çözer. Bölüm 6’da anlatacağımız #{strong[HAIP]} böyle bir profildir.

Bunlara bir dördüncü katman eklemek gerekir: #{strong[cüzdanın çağrılması]} (#{emph[wallet invocation]}). Bir web sitesi ya da bir kurumun sunucusu, Aynur’un telefonundaki cüzdan uygulamasına "seninle konuşmak istiyorum" demenin bir yolunu bulmak zorundadır. Bu iş bir QR kodla, özel bir bağlantı şemasıyla (#{raw("openid4vp://")} gibi), işletim sisteminin bir arayüzüyle ya da yüz yüze ortamda NFC ve Bluetooth ile yapılabilir. Yüz yüze yolları dizinin dokuzuncu yazısına bırakıyor, bu yazıda internet üzerinden çağırma yollarına odaklanıyoruz.

#sekil(1, [Bir cüzdan konuşmasının dört katmanı], "figures/a8/sekil-1.svg", yarim: false)

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Bir belgenin #{strong[biçimi]} (SD-JWT VC, mdoc) ile onu taşıyan #{strong[protokol]} (OpenID4VCI, OpenID4VP) ayrı şeylerdir. Protokoller birçok seçenek sunar; bir #{strong[profil]} (ör. HAIP) bu seçenekleri daraltarak farklı cüzdan ve kurumların gerçekten birlikte çalışabilmesini sağlar.
]

= OAuth 2.0’dan OpenID4VC’ye

== Bir hatırlatma: OAuth 2.0 ne yapar?

Dizinin ilk yazısında OAuth 2.0’ı bir yetkilendirme çerçevesi olarak tanıtmıştık \[1\]. Sorduğu soru şudur: Bir uygulama, bir kullanıcının başka bir hizmetteki verisine, kullanıcının parolasını öğrenmeden nasıl erişebilir? Örneğin bir takvim uygulaması Aynur’un e-posta hesabındaki toplantı davetlerini okumak istiyorsa, Aynur’un e-posta parolasını istemek yerine e-posta hizmetinden sınırlı bir izin belgesi alır.

OAuth 2.0 bu işte dört rol tanımlar:

- #{strong[Kaynak sahibi]} (#{emph[resource owner]}): verinin sahibi olan kişi; örnekte Aynur.
- #{strong[İstemci]} (#{emph[client]}): veriye erişmek isteyen uygulama; örnekte takvim uygulaması.
- #{strong[Yetkilendirme sunucusu]} (#{emph[authorization server]}): kişinin kimliğini doğrulayan, iznini alan ve izin belgesini veren sunucu.
- #{strong[Kaynak sunucusu]} (#{emph[resource server]}): korunan veriyi tutan ve yalnızca geçerli bir izin belgesi gösterene veren sunucu.

İzin belgesinin adı #{strong[erişim belirtecidir]} (#{emph[access token]}). İstemci, yetkilendirme sunucusundan aldığı bu belirteci kaynak sunucusuna gösterir ve karşılığında veriye ulaşır. Belirtecin alınma yolları #{strong[yetki türü]} (#{emph[grant type]}) diye adlandırılır; en yaygını, dizinin ilk yazısında "Google ile giriş" örneğinde izlediğimiz #{strong[yetkilendirme kodu]} (#{emph[authorization code]}) akışıdır: tarayıcı yetkilendirme sunucusuna yönlendirilir, kişi orada giriş yapıp izin verir, tarayıcı kısa ömürlü bir kodla geri döner ve istemci bu kodu arka kanaldan erişim belirteciyle değiştirir.

== Neden yeni bir şey icat edilmedi?

Doğrulanabilir belgeler için bir protokol tasarlayan herkesin önünde iki yol vardı. Birincisi sıfırdan yeni bir protokol yazmak; ikincisi milyarlarca kullanıcıya hizmet veren, saldırılara karşı on yılı aşkın süredir sınanmış, kütüphaneleri ve uzmanları hazır bir altyapıyı uyarlamak. OpenID Vakfı’nın Dijital Kimlik Bilgisi Protokolleri (#{emph[Digital Credentials Protocols]}, DCP) çalışma grubu ikinci yolu seçti.

Bu tercihin pratik bir nedeni vardır. Bir üniversitenin bilgi işlem birimi büyük olasılıkla zaten bir OAuth yetkilendirme sunucusu işletiyordur; öğrencileri kampüs sistemlerine bununla girer. Bir bankanın mobil uygulaması OAuth ile çalışır. Kurumların güvenlik ekipleri OAuth’un saldırı modelini, bilinen açıklarını ve bunlara karşı geliştirilmiş önlemleri tanır. Belge vermeyi "OAuth ile korunan bir kaynağa erişim" olarak modellemek, bütün bu birikimi tek hamlede yeni alana taşır.

Buna karşılık OAuth’un yükü de taşınır. OAuth’un çok sayıda eklentisi, isteğe bağlı parametresi ve birbirine benzeyen seçenekleri vardır. Bölüm 6’da göreceğimiz gibi, yüksek güvence gereken bir ekosistemde bu seçeneklerin bir profil ile daraltılması zorunlu hâle gelir.

== Roller nasıl eşleşiyor?

OpenID4VC ailesinin iki protokolü OAuth rollerini farklı biçimlerde kullanır ve bu fark, akışları anlamanın anahtarıdır (Şekil 2).

#{strong[Belge verirken (OpenID4VCI)]} cüzdan, OAuth’taki #{strong[istemci]} rolündedir. Belge, korunan bir kaynaktır; cüzdan onu almak için önce yetkilendirme sunucusundan bir erişim belirteci alır, sonra belirteci belge veren kurumun #{strong[belge uç noktasına]} gösterir. Veren kurum, OAuth’taki kaynak sunucusunun yerindedir. Yani bu yönde her şey tanıdıktır: cüzdan, bir takvim uygulamasının e-posta hizmetinden veri alması gibi, üniversiteden belge alır.

#{strong[Belge gösterirken (OpenID4VP)]} roller tersine döner. Bu kez bir şey isteyen taraf doğrulayandır; dolayısıyla doğrulayan #{strong[istemci]} rolüne geçer. Cüzdan ise isteği karşılayan, kişinin onayını alan ve cevabı üreten taraf olur; yani bir tür #{strong[yetkilendirme sunucusu]} gibi davranır. OpenID4VP, OAuth’un yetkilendirme isteği ve yetkilendirme cevabı mesajlarını alır ama cevabın içine bir erişim belirteci yerine yeni bir parametre koyar: #{raw("vp_token")}, yani gösterilen belgeleri taşıyan zarf.

#sekil(2, [OAuth 2.0 rolleri belge verirken ve gösterirken nasıl eşleşir?], "figures/a8/sekil-2.svg", yarim: false)

#kutu("teknik", [OAuth’un güvenlik eklentileri: PKCE, PAR, DPoP])[
Bölüm 4 ve 6’da adı sık geçecek üç OAuth eklentisini burada tanıtalım.

#{strong[PKCE]} (#{emph[Proof Key for Code Exchange]}, RFC 7636 \[7\]). Yetkilendirme kodu tarayıcı üzerinden taşındığı için yolda çalınabilir. PKCE’de istemci akışın başında rastgele bir sır üretir, özetini öne gönderir, sırrın kendisini ise yalnızca kod değişimi sırasında açar. Tabloda $v$ sır (#{raw("code_verifier")}), $c$ onun özetidir (#{raw("code_challenge")}):

#adimlar((
  ("İstemci", [#{strong[Sır.]} Akışın başında rastgele bir sır üretir ve kimseye göstermez.], $v <- "rastgele"$),
  ("İstemci → Sunucu", [#{strong[Özet.]} Sırrın SHA-256 özetini yetkilendirme isteğine koyar.], $c = "BASE64URL"("SHA-256"(v))$),
  ("İstemci → Sunucu", [#{strong[Kod değişimi.]} Aldığı yetkilendirme kodunu sırrın kendisiyle birlikte gönderir.], $("kod", v)$),
  ("Sunucu", [#{strong[Kontrol.]} Gelen sırrın özetini yeniden hesaplar ve baştaki özetle karşılaştırır.], $"BASE64URL"("SHA-256"(v)) attach(=, t: ?) c$),
))

Kodu yolda çalan biri $v$’yi bilmez; $c$’yi görse bile özetten sırra geri dönemez, bu yüzden kodu belirtece çeviremez. #{raw("S256")} değeri, özetin SHA-256 ile alındığını söyler.

#{strong[PAR]} (#{emph[Pushed Authorization Requests]}, RFC 9126 \[8\]). Normalde yetkilendirme isteğinin parametreleri tarayıcının adres çubuğunda taşınır; görülebilir, değiştirilebilir ve uzunluk sınırına takılabilir. PAR’da istemci bu parametreleri önce arka kanaldan yetkilendirme sunucusuna "iter" ve karşılığında kısa bir #{raw("request_uri")} alır; tarayıcı yalnızca bu kısa değeri taşır.

#{strong[DPoP]} (#{emph[Demonstrating Proof of Possession]}, RFC 9449 \[9\]). Sıradan bir erişim belirteci "taşıyana" geçerlidir; çalan kullanabilir. DPoP’ta istemcinin bir anahtar çifti vardır; her istekte o anahtarla imzalı küçük bir JWT (DPoP kanıtı) gönderir ve belirteç bu anahtara bağlanır. Belirteci çalan biri, anahtar olmadan onu kullanamaz.
]

= OpenID4VCI: Belge Verme

OpenID4VCI (#{emph[OpenID for Verifiable Credential Issuance]}) 1.0, OpenID Vakfı’nın DCP çalışma grubu tarafından hazırlandı ve 1–15 Eylül 2025 arasındaki oylamanın ardından 16 Eylül 2025 tarihli nihai spesifikasyon olarak yayımlandı \[3\]. Spesifikasyon bir belgenin cüzdana verilmesi için bir #{strong[API]} ve bu API’yi korumak için OAuth 2.0 tabanlı bir yetkilendirme düzeni tanımlar. Belge biçimi konusunda tarafsızdır; eklerinde SD-JWT VC, mdoc ve W3C belgeleri için ayrı profiller bulunur.

Belge verme akışı beş soruya cevap verir. Veren kim ve neler verebiliyor? Belge verme sürecini kim başlatıyor? Belgeyi alacak kişinin gerçekten o kişi olduğu nasıl anlaşılıyor? Belge hangi anahtara bağlanacak ve o anahtarın gerçekten cüzdanda olduğu nasıl kanıtlanıyor? Belge cüzdana nasıl teslim ediliyor? Bu bölümde sırasıyla bu soruların cevabına bakıyoruz.

== Veren kendini tanıtır: üst veri

Aynur’un cüzdanı üniversiteyle ilk kez konuşacaktır. Üniversitenin hangi belgeleri verdiğini, bunları hangi biçimde verdiğini, hangi adreslere istek gönderileceğini bilmez. Bu bilgilerin hepsi, üniversitenin herkese açık yayımladığı bir #{strong[üst veri]} (#{emph[metadata]}) belgesinde durur. Belge veren kurumun (spesifikasyonun deyişiyle #{emph[Credential Issuer]}) kimliği bir #{raw("https")} adresidir; üst veri de bu adresin altındaki sabit bir yoldan okunur: #{raw("/.well-known/openid-credential-issuer")}.

Üst verinin en önemli parçası, verilebilen her belge türünü tarif eden #{raw("credential_configurations_supported")} haritasıdır. Her kayıt bir belge türünün biçimini, türünü (SD-JWT VC için #{raw("vct")}, mdoc için #{raw("doctype")}), hangi imza algoritmalarıyla imzalandığını, cüzdanın anahtarını kanıtlamak için hangi yöntemlerin kabul edildiğini ve cüzdanda nasıl görüneceğini (ad, logo, renk) söyler. Üst veri ayrıca belgenin alınacağı #{strong[belge uç noktasını]} (#{emph[credential endpoint]}), cüzdanın tek kullanımlık değer isteyeceği #{strong[nonce uç noktasını]} ve hangi yetkilendirme sunucularının kullanılacağını da bildirir.

#kutu("teknik", [Bir veren üst verisinden kesit])[
Aşağıdaki kesit, OpenID4VCI’nin SD-JWT VC eki örneğine dayanarak Aynur’un üniversitesi için uyarlanmıştır (değerler örnektir):

#kod("json", "{
  \"credential_issuer\": \"https://belge.universite.example\",
  \"credential_endpoint\": \"https://belge.universite.example/credential\",
  \"nonce_endpoint\": \"https://belge.universite.example/nonce\",
  \"authorization_servers\": [\"https://giris.universite.example\"],
  \"credential_configurations_supported\": {
    \"ogrenci_belgesi_sdjwt\": {
      \"format\": \"dc+sd-jwt\",
      \"scope\": \"ogrenci_belgesi\",
      \"vct\": \"https://belge.universite.example/ogrenci-belgesi\",
      \"cryptographic_binding_methods_supported\": [\"jwk\"],
      \"credential_signing_alg_values_supported\": [\"ES256\"],
      \"proof_types_supported\": {
        \"jwt\": { \"proof_signing_alg_values_supported\": [\"ES256\"] }
      },
      \"credential_metadata\": {
        \"display\": [{ \"name\": \"Öğrenci Belgesi\", \"locale\": \"tr-TR\" }]
      }
    }
  }
}", baslik: "Örnek: üniversitenin veren üst verisi")

#{raw("format")} değeri #{raw("dc+sd-jwt")}, belgenin SD-JWT VC biçiminde olduğunu söyler. #{raw("cryptographic_binding_methods_supported")} belgenin cüzdandaki bir anahtara bağlanacağını, #{raw("proof_types_supported")} ise cüzdanın o anahtarı nasıl kanıtlayacağını (burada imzalı bir JWT ile) belirtir. Kayıttaki anahtar (#{raw("ogrenci_belgesi_sdjwt")}) bir #{strong[belge yapılandırma kimliğidir]} (#{emph[credential configuration identifier]}); akışın geri kalanında belge türüne bu adla atıf yapılır.
]

== Kim başlatıyor? Teklif ve cüzdan girişimi

Belge verme iki yoldan başlayabilir.

#{strong[Veren başlatırsa]} (#{emph[issuer-initiated]}) kurum cüzdana bir #{strong[belge teklifi]} (#{emph[credential offer]}) gönderir. Teklif, "ben şu adresteki veren kurumum, sana şu belgeleri vermek istiyorum, şu yoldan gel" diyen küçük bir JSON nesnesidir. Giriş bölümündeki QR kod tam olarak budur. Teklif ya doğrudan bağlantının içine gömülür (#{raw("credential_offer")} parametresi) ya da bağlantı yalnızca teklifin durduğu adresi taşır (#{raw("credential_offer_uri")}); ikinci yol QR kodu küçük tutar. Bağlantının şeması, spesifikasyonun önerdiği #{raw("openid-credential-offer://")} olabilir; ekosistemler başka şemalar ya da #{raw("https")} bağlantıları da tanımlayabilir.

#{strong[Cüzdan başlatırsa]} (#{emph[wallet-initiated]}) kişi cüzdanında bir listeden "Öğrenci belgesi al" gibi bir seçeneğe dokunur ya da cüzdan, bir doğrulayanın istediği belgenin cüzdanda olmadığını görüp kişiyi o belgeyi verebilecek bir kuruma yönlendirir. Bu durumda teklif yoktur; cüzdan, veren kurumun üst verisini okuyarak doğrudan yetkilendirme adımına geçer.

#kutu("teknik", [Bir belge teklifi])[
Teklif, ön yetkilendirilmiş kod (Bölüm 4.3) ile birlikte gönderildiğinde şöyle görünebilir (değerler örnektir):

#kod("json", "{
  \"credential_issuer\": \"https://belge.universite.example\",
  \"credential_configuration_ids\": [\"ogrenci_belgesi_sdjwt\"],
  \"grants\": {
    \"urn:ietf:params:oauth:grant-type:pre-authorized_code\": {
      \"pre-authorized_code\": \"oaKazRN8I0IbtZ0C7JuMn5\",
      \"tx_code\": {
        \"length\": 4,
        \"input_mode\": \"numeric\",
        \"description\": \"E-postanıza gönderilen tek kullanımlık kodu girin\"
      }
    }
  }
}", baslik: "Örnek: ön yetkilendirilmiş kodlu bir belge teklifi")

QR koda ise çoğu zaman yalnızca teklifin adresi konur:

#kod("text", "openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fbelge.universite.example%2Fteklif%2F7Hq2…", baslik: "Örnek: QR kodun taşıdığı bağlantı")

Cüzdan bu adresten teklifi indirir, #{raw("credential_issuer")} alanındaki adresten üst veriyi okur ve teklifteki #{raw("credential_configuration_ids")} değerlerini üst verideki kayıtlarla eşleştirir.
]

== Kişi kim? İki yetkilendirme yolu

Bir belge vermeden önce kurumun, belgeyi isteyenin gerçekten Aynur olduğundan emin olması gerekir. OpenID4VCI bunun için iki yetki türünü öne çıkarır.

#{strong[Yetkilendirme kodu akışı]} (#{emph[authorization code flow]}), dizinin ilk yazısından tanıdığımız akıştır. Cüzdan, üniversitenin yetkilendirme sunucusuna bir istek gönderir; Aynur tarayıcıda ya da cüzdanın içindeki güvenli bir web görünümünde üniversitenin giriş sayfasını görür, öğrenci numarası ve parolasıyla (ya da başka bir yöntemle) giriş yapar ve belge verilmesine izin verir. Yetkilendirme sunucusu cüzdanı kısa ömürlü bir kodla geri gönderir; cüzdan kodu arka kanaldan bir erişim belirteciyle değiştirir. İstekte hangi belgenin istendiği ya #{raw("scope")} parametresiyle ya da daha ayrıntılı bir yapı olan #{raw("authorization_details")} ile söylenir; ikincisinde türü #{raw("openid_credential")} olan bir nesne içinde belge yapılandırma kimliği yer alır (bu yapı RFC 9396’da tanımlanan zengin yetkilendirme isteklerinden gelir \[11\]). Şekil 3 bu akışı gösteriyor.

#sekil(3, [OpenID4VCI: yetkilendirme kodu akışıyla belge verme], "figures/a8/sekil-3.svg", yarim: false)

#{strong[Ön yetkilendirilmiş kod akışı]} (#{emph[pre-authorized code flow]}) ise kurumun kişiyi akış başlamadan önce zaten tanıdığı durumlar içindir. Giriş bölümündeki sahne buna örnektir: Aynur öğrenci işleri bürosundadır, kaydı yapılmış, kimliği kontrol edilmiştir. Üniversite, teklifin içine doğrudan bir #{strong[ön yetkilendirilmiş kod]} koyar. Cüzdan bu kodu yetkilendirme sayfasına hiç gitmeden, doğrudan belirteç uç noktasında erişim belirteciyle değiştirir (Şekil 4).

Bu kolaylığın bir bedeli vardır. Ön yetkilendirilmiş kodu ele geçiren herkes, tek başına belgeyi alabilir. Görevlinin ekranındaki QR kodun fotoğrafını arkadaki kuyruktan biri çekse, Aynur’un belgesi onun cüzdanına gidebilir. Spesifikasyon bu riski açıkça yazar ve önlem olarak #{strong[işlem kodu]} (#{emph[transaction code]}, #{raw("tx_code")}) tanımlar: kurum, teklifin içinde bir kod gerektiğini belirtir ve kodun kendisini Aynur’a farklı bir kanaldan (e-posta, SMS, kayıt ekranında ayrı bir gösterim) iletir. Cüzdan, belirteç isteğinde ön yetkilendirilmiş kodla birlikte bu işlem kodunu da gönderir. QR kodu çalan kişi e-postayı görmediği için belgeyi alamaz.

#sekil(4, [OpenID4VCI: ön yetkilendirilmiş kod akışı ve işlem kodu], "figures/a8/sekil-4.svg", yarim: false)

#kutu("teknik", [Belirteç isteği ve cevabı])[
Ön yetkilendirilmiş kod akışında cüzdanın belirteç uç noktasına gönderdiği istek şöyledir (değerler örnektir):

#kod("http", "POST /token HTTP/1.1
Host: giris.universite.example
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
&pre-authorized_code=oaKazRN8I0IbtZ0C7JuMn5
&tx_code=4935", baslik: "Örnek: cüzdanın belirteç isteği")

Yetkilendirme kodu akışında ise #{raw("grant_type=authorization_code")}, kodun kendisi ve PKCE sırrı (#{raw("code_verifier")}) gönderilir. Her iki durumda da cevap tanıdık bir OAuth cevabıdır; isteğe bağlı olarak #{raw("authorization_details")} içinde, verilecek belge veri kümesinin kimliği de döner:

#kod("json", "{
  \"access_token\": \"eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCJ9…\",
  \"token_type\": \"DPoP\",
  \"expires_in\": 300,
  \"authorization_details\": [{
    \"type\": \"openid_credential\",
    \"credential_configuration_id\": \"ogrenci_belgesi_sdjwt\",
    \"credential_identifiers\": [\"ogrenci-2026-guz\"]
  }]
}", baslik: "Örnek: belirteç uç noktasının cevabı")

#{raw("token_type")} değerinin #{raw("DPoP")} olması, belirtecin cüzdanın DPoP anahtarına bağlandığını gösterir (Bölüm 3’teki kutu).
]

== Belge hangi anahtara bağlanacak? Nonce ve anahtar kanıtı

Dizinin ikinci yazısında #{strong[sahip bağlama]} (#{emph[holder binding]}) kavramını anlatmıştık: belge, sahibinin cüzdanındaki bir anahtara bağlanır; belgeyi gösterirken cüzdan o anahtarla imza atar ve böylece hem belgenin gerçek olduğunu hem de onu gösterenin de gerçek sahibi olduğunu kanıtlar. SD-JWT VC’de bu anahtar belgenin içindeki #{raw("cnf")} alanında, mdoc’ta ise mobil güvenlik nesnesindeki #{raw("deviceKey")} alanında durur.

Belge verilirken veren kurum bu anahtarı belgeye yazar. Ama hangi anahtarı? Cüzdan bir açık anahtar gönderir; kurumun bu anahtarın gerçekten o cüzdanda, o anda var olan bir gizli anahtara karşılık geldiğinden emin olması gerekir. Aksi hâlde biri başkasının açık anahtarını gönderip belgeyi ona bağlatabilir ya da eski bir istekten kopyaladığı bir kanıtı yeniden kullanabilir.

OpenID4VCI bu soruyu #{strong[anahtar kanıtı]} (#{emph[key proof]}) ile çözer. Akış şöyledir:

#adimlar((
  ("Cüzdan → Veren", [#{strong[Taze değer.]} Cüzdan, veren kurumun #{strong[nonce uç noktasından]} taze bir rastgele değer ister; kurum #{raw("c_nonce")} adlı bir değer döner.], $"c_nonce" <- "veren"$),
  ("Cüzdan → Veren", [#{strong[Kanıt.]} Cüzdan, bağlanacak anahtar çiftinin gizli anahtarıyla küçük bir JWT imzalar. İçinde kimin için (#{raw("aud")}: veren kurumun adresi), ne zaman (#{raw("iat")}) üretildiği ve az önce alınan #{raw("nonce")} bulunur; açık anahtar başlığa konur.], $pi = "imza"("aud", "iat", "nonce")$),
  ("Veren", [#{strong[Kontrol.]} Kurum imzayı başlıktaki açık anahtarla doğrular; #{raw("nonce")} değerinin kendi verdiği taze değer, #{raw("aud")} değerinin kendi adresi olduğunu kontrol eder.], $"nonce" = "c_nonce", quad "aud" = "veren"$),
))

Bu üç kontrol birlikte şunu kanıtlar: Bu açık anahtarın gizli eşi şu anda isteği gönderen tarafın elindedir ve bu kanıt başka bir yerden kopyalanmamıştır.

#kutu("teknik", [Anahtar kanıtı JWT’si])[
OpenID4VCI’deki #{raw("jwt")} türündeki anahtar kanıtının çözülmüş hâli şöyledir (spesifikasyondaki örneğe dayanır; değerler örnektir):

#kod("json", "{
  \"typ\": \"openid4vci-proof+jwt\",
  \"alg\": \"ES256\",
  \"jwk\": {
    \"kty\": \"EC\", \"crv\": \"P-256\",
    \"x\": \"nUWAoAv3XZith8E7i19OdaxOLYFOwM-Z2EuM02TirT4\",
    \"y\": \"HskHU8BjUi1U9Xqi7Swmj8gwAK_0xkcDjEW_71SosEY\"
  }
}
.
{
  \"aud\": \"https://belge.universite.example\",
  \"iat\": 1788508800,
  \"nonce\": \"LarRGSbmUPYtRYO6BQ4yn8\"
}", baslik: "Örnek: çözülmüş bir anahtar kanıtı (başlık . içerik)")

Başlıktaki #{raw("typ")} değeri JWT’yi açıkça "anahtar kanıtı" olarak etiketler; böylece başka amaçla imzalanmış bir JWT’nin kanıt yerine kullanılması engellenir. Kanıtın bir türü daha vardır: başlığa bir #{strong[anahtar onayı]} (#{emph[key attestation]}) eklenebilir ya da #{raw("attestation")} türündeki kanıt doğrudan bir anahtar onayı olarak gönderilebilir. Anahtar onayı, cüzdan sağlayıcısının (ya da telefonun güvenli donanımının) imzaladığı ve "bu anahtar güvenli donanımda üretildi, dışarı çıkarılamaz" diyen bir belgedir. Yüksek güvence gereken belgelerde, kurumun yalnızca anahtarın var olduğunu değil, nerede saklandığını da bilmesi gerekir; bu konuyu dizinin onuncu yazısında ayrıntılı ele alacağız.
]

Burada önemli bir mahremiyet ayrıntısı vardır. Aynur aynı belgeyi birçok doğrulayana gösterecekse, her gösterimde aynı anahtarla imza atması doğrulayanların onu birbirine bağlamasını kolaylaştırır. Dizinin beşinci yazısında bunun için önerilen çözümü anlatmıştık: aynı belgenin her biri farklı bir anahtara bağlı birkaç kopyasını almak ve her kopyayı yalnızca bir kez kullanmak. OpenID4VCI bunu #{strong[toplu belge verme]} (#{emph[batch issuance]}) ile destekler: cüzdan tek bir belge isteğinde birden çok anahtar kanıtı gönderir ve kurum her anahtar için ayrı bir kopya döner.

== Teslim: belge isteği ve cevabı

Artık cüzdanın elinde bir erişim belirteci ve bir anahtar kanıtı vardır. Son adım, belge uç noktasına bir #{strong[belge isteği]} (#{emph[credential request]}) göndermektir. İstek, hangi belgenin istendiğini (belge veri kümesi kimliği ya da belge yapılandırma kimliği) ve anahtar kanıtlarını taşır. Kurum belirteci, kanıtları ve gerekiyorsa cüzdanın kendisine dair onayları kontrol eder, belgeyi üretir, imzalar ve #{strong[belge cevabı]} (#{emph[credential response]}) içinde döner.

#kutu("teknik", [Belge isteği ve cevabı])[
İstek (değerler örnektir; #{raw("DPoP")} başlığı Bölüm 3’teki kanıttır):

#kod("http", "POST /credential HTTP/1.1
Host: belge.universite.example
Content-Type: application/json
Authorization: DPoP eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCJ9…
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2Iiwi…

{
  \"credential_identifier\": \"ogrenci-2026-guz\",
  \"proofs\": {
    \"jwt\": [\"eyJ0eXAiOiJvcGVuaWQ0dmNpLXByb29mK2p3dCIsImFsZyI6IkVTMjU2Iiwi…\"]
  }
}", baslik: "Örnek: cüzdanın belge isteği")

Cevap:

#kod("json", "{
  \"credentials\": [
    { \"credential\": \"eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~\" }
  ],
  \"notification_id\": \"3fwe98js\"
}", baslik: "Örnek: veren kurumun belge cevabı")

#{raw("credentials")} bir dizidir; toplu verme kullanıldıysa her anahtar için bir öğe içerir. Burada dönen değer, dizinin ikinci yazısında anatomisini incelediğimiz bir SD-JWT VC’dir: imzalı JWT, ardından #{raw("~")} ile ayrılmış açıklamalar. #{raw("notification_id")} ise cüzdanın daha sonra kuruma "belgeyi aldım ve sakladım" ya da "kişi belgeyi sildi" demesi için kullanacağı isteğe bağlı #{strong[bildirim uç noktasına]} atıf yapar.
]

İki ek mekanizmayı da anmak gerekir. Birincisi #{strong[ertelenmiş belge verme]} (#{emph[deferred issuance]}): Belgenin hazırlanması zaman alıyorsa (örneğin bir görevlinin onayı gerekiyorsa) kurum belge yerine bir #{raw("transaction_id")} ve bekleme süresi döner; cüzdan belgeyi daha sonra ayrı bir uç noktadan alır. İkincisi #{strong[cevap şifreleme]}: Belge cevabı TLS ile zaten korunur, ama cüzdan isterse kurumdan cevabı yalnızca kendisinin açabileceği bir anahtarla ayrıca şifrelemesini isteyebilir.

== Cüzdan da kendini tanıtır

Şimdiye kadar hep kurumun kişiyi ve anahtarı doğrulamasından söz ettik. Ama yüksek güvence gereken bir belgede kurum bir soru daha sorar: #{strong[Bu istek gerçekten güvenilir bir cüzdandan mı geliyor, yoksa belgeyi alıp kopyalamaya hazırlanan bir yazılımdan mı?]} Bir devletin kimlik bilgisini (PID) bir kişinin telefonuna yüklerken, o telefondaki uygulamanın sertifikalı bir cüzdan olduğunu bilmek ister.

OAuth dünyasında bir istemcinin kendini tanıtmasına #{strong[istemci kimlik doğrulaması]} denir. Bir sunucu uygulaması için bu kolaydır; sunucunun güvenli bir yerde sakladığı bir sır ya da anahtar vardır. Ama milyonlarca telefona kurulan bir uygulamanın içine gömülü ortak bir sır, ilk tersine mühendislik denemesinde ortaya çıkar. Bu yüzden IETF OAuth çalışma grubunda #{strong[onaya dayalı istemci kimlik doğrulaması]} (#{emph[OAuth 2.0 Attestation-Based Client Authentication]}) adlı bir yöntem geliştiriliyor \[12\]. Bu yöntemde cüzdan sağlayıcısı, her cüzdan kurulumu için cihazdaki bir anahtara bağlı bir #{strong[cüzdan onayı]} (#{emph[wallet attestation]}) imzalar; cüzdan bu onayı ve onayın içindeki anahtarla imzaladığı taze bir kanıtı iki HTTP başlığında (#{raw("OAuth-Client-Attestation")} ve #{raw("OAuth-Client-Attestation-PoP")}) gönderir. OpenID4VCI 1.0 bu yöntemi eklerinde cüzdan onayının biçimiyle birlikte tarif eder. AB’nin mimari çerçevesindeki "cüzdan birimi onayı" kavramı da bu düzene oturur; dizinin onuncu yazısında ona ayrıca döneceğiz.

#kutu("ornek", [Aynur öğrenci belgesini alıyor])[
Öğrenci işleri bürosundaki ekranda gösterilen QR kod, bir #{raw("openid-credential-offer://")} bağlantısıdır. Aynur’un cüzdanı bağlantıdaki adresten teklifi indirir, üniversitenin üst verisini okur ve Aynur’a üniversitenin adını, logosunu ve "Öğrenci Belgesi" başlığını gösterir. Teklif ön yetkilendirilmiş kod içerdiği ve işlem kodu istediği için cüzdan "e-postanıza gelen dört haneli kodu girin" der. Aynur kodu girer; cüzdan kodu ve ön yetkilendirilmiş kodu belirteç uç noktasına gönderir, bunu yaparken cüzdan sağlayıcısının imzaladığı onayı da ekler. Erişim belirtecini alan cüzdan, telefonun güvenli donanımında yeni bir anahtar çifti üretir (aslında birkaç tane, toplu verme için), nonce ister, her anahtar için bir kanıt imzalar ve belge isteğini gönderir. Üniversite her anahtara bağlı bir öğrenci belgesi kopyası döner. Aynur’un ekranında yalnızca bir kart görünür; cüzdan kopyaları arka planda saklar ve her gösterimde farklı birini kullanır.
]

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
OpenID4VCI, belge vermeyi OAuth 2.0 ile korunan bir kaynağa erişim olarak modeller. Kurum kişiyi ya kendi giriş sayfasında (yetkilendirme kodu) ya da akıştan önce (ön yetkilendirilmiş kod) tanır. Cüzdan, belgenin bağlanacağı anahtarı taze bir nonce üzerine attığı imzayla kanıtlar; yüksek güvencede cüzdan kendi güvenilirliğini de bir onayla gösterir.
]

= OpenID4VP: Belge Gösterme

OpenID4VP (#{emph[OpenID for Verifiable Presentations]}) 1.0, aynı çalışma grubunun ürünüdür ve 9 Temmuz 2025’te nihai spesifikasyon olarak yayımlandı \[4\]. Görevi, bir doğrulayanın cüzdandan belge istemesini ve cüzdanın kişinin onayıyla bu isteği karşılamasını tanımlamaktır. Spesifikasyonun girişindeki bir cümle, yazının bütününü anlamak için önemlidir: OpenID4VP kendi başına birlikte çalışabilirliği garanti etmez, #{strong[profillenmesi gereken bir çerçevedir]}. Hangi seçeneklerin zorunlu olduğu, hangi belge biçimlerinin kullanılacağı ve doğrulayanın kimliğinin nasıl kanıtlanacağı bir profil tarafından belirlenir.

== Bir sunumun yapısı: istek, onay, cevap

Doğrulayan bir #{strong[yetkilendirme isteği]} (#{emph[authorization request]}) hazırlar. İstek en az şunları söyler: doğrulayan kim (#{raw("client_id")}), ne isteniyor (#{raw("dcql_query")}), cevap nereye ve nasıl gönderilecek (#{raw("response_mode")}, #{raw("response_uri")}), cevap yalnızca bu istek için üretilsin diye hangi taze değer kullanılacak (#{raw("nonce")}). Cüzdan isteği alır, doğrulayanın kimliğini kontrol eder, cüzdandaki belgeler arasında isteğe uyanları bulur ve kişiye bir onay ekranı gösterir. Kişi onaylarsa cüzdan bir #{strong[sunum]} (#{emph[presentation]}) hazırlar: seçilen belge, yalnızca istenen alanlar açılmış hâlde, cüzdanın anahtarıyla bu isteğe özel olarak imzalanmış bir kanıtla birlikte. Sunumlar #{raw("vp_token")} adlı bir zarfa konur ve #{strong[yetkilendirme cevabı]} (#{emph[authorization response]}) içinde doğrulayana gider.

Burada dizinin ilk yazısındaki "Google ile giriş" akışından temel bir fark var. OpenID Connect’te kimlik belirtecini kimlik sağlayıcı o anda üretir ve imzalar; yani kimlik sağlayıcı her girişten haberdar olur. OpenID4VP’de ise belgenin imzası, aylar önce veren kurum tarafından atılmıştır. Sunum anında veren kuruma hiçbir mesaj gitmez. Doğrulayan imzayı, veren kurumun güven listesinden öğrendiği açık anahtarla kendi başına kontrol eder. Dizinin altıncı ve yedinci yazılarında anlattığımız güven listeleri ve durum listeleri bu kontrolün geri kalanını tamamlar.

== Aynı cihaz ve cihazlar arası

Sunumun iki temel senaryosu vardır ve bu ikisi güvenlik açısından farklı riskler taşır.

#{strong[Aynı cihaz akışında]} (#{emph[same-device flow]}) Aynur yurdun sitesini telefonunun tarayıcısında açmıştır; cüzdan da aynı telefondadır. Site, isteği bir bağlantıyla cüzdana iletir (işletim sistemi bağlantıyı cüzdan uygulamasına yönlendirir), cüzdan cevabı doğrulayana gönderir ve kişiyi tarayıcıda kaldığı sayfaya geri yönlendirir.

#{strong[Cihazlar arası akışta]} (#{emph[cross-device flow]}) Aynur başvuruyu dizüstü bilgisayarında yapmaktadır. Site ekranda bir QR kod gösterir; Aynur kodu telefonundaki cüzdanla okutur. Cüzdan cevabı tarayıcı üzerinden geri gönderemez (tarayıcı başka bir cihazdadır), bu yüzden cevabı doğrudan doğrulayanın sunucusuna bir HTTP POST isteğiyle iletir. Bu cevap yoluna #{raw("direct_post")} denir. Bilgisayardaki sayfa, sunucunun cevabı aldığını öğrenince ilerler. QR kodun küçük kalması için kodun içine isteğin tamamı değil, yalnızca doğrulayanın kimliği ve isteğin indirileceği adres (#{raw("request_uri")}) konur; cüzdan asıl isteği bu adresten indirir. Bu düzen aynı zamanda isteğin #{strong[imzalanmasına]} da olanak verir: İndirilen istek, doğrulayanın imzaladığı bir JWT’dir (JWT ile güvenceye alınmış yetkilendirme isteği, kısaca JAR, RFC 9101 \[10\]). Şekil 5 bu akışı gösteriyor.

#sekil(5, [OpenID4VP: cihazlar arası akış (QR kod ve direct\_post)], "figures/a8/sekil-5.svg", yarim: false)

#kutu("teknik", [İmzalı bir istek nesnesi])[
Cüzdanın #{raw("request_uri")} adresinden indirdiği istek, imzalı bir JWT’dir. İmza çözüldükten sonraki içerik şöyle görünebilir (spesifikasyondaki örneklere dayanır; değerler örnektir):

#kod("json", "{
  \"client_id\": \"x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk\",
  \"response_type\": \"vp_token\",
  \"response_mode\": \"direct_post.jwt\",
  \"response_uri\": \"https://basvuru.yurt.example/cevap\",
  \"nonce\": \"n-0S6_WzA2Mj\",
  \"state\": \"eyJhb…6-sVA\",
  \"dcql_query\": { \"credentials\": [ \"…\" ] },
  \"client_metadata\": {
    \"jwks\": { \"keys\": [ { \"kty\": \"EC\", \"crv\": \"P-256\", \"use\": \"enc\", \"alg\": \"ECDH-ES\", \"…\": \"…\" } ] },
    \"encrypted_response_enc_values_supported\": [\"A128GCM\", \"A256GCM\"]
  }
}", baslik: "Örnek: imzalı istek nesnesinin içeriği")

JWT’nin başlığındaki #{raw("x5c")} alanı, doğrulayanın X.509 sertifika zincirini taşır. #{raw("client_id")} değerinin başındaki #{raw("x509_hash:")} öneki, bu kimliğin zincirdeki ilk (yaprak) sertifikanın SHA-256 özeti olduğunu söyler. Cüzdan özeti kendisi hesaplar ve karşılaştırır:

#formul[$ "client_id" = "x509_hash:" || "BASE64URL"("SHA-256"("yaprak sertifika")) $]

Burada $||$ iki metni uç uca eklemek demektir. #{raw("response_mode")} değerinin #{raw("direct_post.jwt")} olması, cevabın #{raw("client_metadata")} içindeki geçici anahtara şifrelenerek gönderileceğini belirtir.
]

== Doğrulayan kim? İstemci kimliği önekleri

OAuth’ta istemciler yetkilendirme sunucusuna önceden kayıt olur. Ama bir cüzdan dünyadaki her doğrulayanı önceden tanıyamaz. Aynur’un cüzdanı yurdun sitesini hayatında ilk kez görmektedir. Öyleyse cüzdan, isteğin gerçekten kendini "yurt başvuru sistemi" olarak tanıtan kurumdan geldiğini nasıl anlayacak?

OpenID4VP bu soruya tek bir cevap vermek yerine birkaç seçenek sunar ve bunları #{raw("client_id")} değerinin başına eklenen #{strong[öneklerle]} (#{emph[client identifier prefix]}) ayırt eder. Başlıcaları şunlardır:

- #{raw("redirect_uri:")} Doğrulayanın kimliği, cevabın gideceği adrestir. İstek imzalanamaz; doğrulayanın kim olduğuna dair güçlü bir güvence vermez. Düşük riskli senaryolar içindir.
- #{raw("x509_san_dns:")} İstek, alan adını içeren bir X.509 sertifikasıyla imzalanır. Cüzdan imzayı ve sertifika zincirini kontrol eder.
- #{raw("x509_hash:")} İstek yine X.509 sertifikasıyla imzalanır; kimlik, sertifikanın özetidir. Bölüm 6’da göreceğimiz gibi HAIP bu öneki zorunlu kılar.
- #{raw("verifier_attestation:")} Doğrulayan, güvenilen bir üçüncü tarafın kendisi için imzaladığı bir onay JWT’si gösterir.
- #{raw("decentralized_identifier:")} Kimlik bir DID’dir; açık anahtar DID çözülerek bulunur.
- #{raw("openid_federation:")} Kimlik, OpenID Federation güven zinciriyle doğrulanır.

İmzanın ve sertifikanın doğru olması, cüzdana yalnızca "bu istek bu sertifikanın sahibinden geldi" der. "Bu kurum bu bilgileri istemeye yetkili mi?" ayrı bir sorudur. OpenID4VP bunun için #{raw("verifier_info")} adlı isteğe bağlı bir parametre tanımlar; doğrulayan bu parametreyle, güvenilen bir otoritenin verdiği bir #{strong[kayıt sertifikası]} gibi ek belgeler gönderebilir. Avrupa Birliği’nde güvenen tarafların kayıt olması ve hangi bilgileri hangi amaçla isteyeceklerini bildirmesi hukuken zorunludur; dizinin ilk yazısında buna değinmiştik. Kayıt sertifikası, bu kaydın cüzdan tarafından okunabilir hâlidir. Cüzdan, istenen alanlar kayıtta bildirilenlerden fazlaysa kişiyi uyarabilir.

== DCQL: doğrulayan ne istediğini nasıl söyler?

Doğrulayanın isteği en basit hâliyle "öğrenci belgesi göster" gibi görünebilir. Gerçek hayattaki istekler ise daha inceliklidir. Yurt yalnızca adı, soyadı ve öğrencilik durumunu ister; doğum tarihini istemez. Bir banka "ya kimlik bilgisi (PID) ya da ehliyet, ayrıca isteğe bağlı olarak bir sadakat kartı" diyebilir. Bir araç kiralama şirketi ehliyetin yalnızca belirli bir güven listesindeki kurumlardan gelmesini isteyebilir.

OpenID4VP’nin ön sürümlerinde bu istekler için Merkeziyetsiz Kimlik Vakfı’nın (DIF) #{emph[Presentation Exchange]} adlı genel amaçlı ve oldukça ayrıntılı dili kullanılıyordu. 1.0 sürümünde bunun yerini daha dar, uygulaması daha kolay bir dil aldı: #{strong[DCQL]} (#{emph[Digital Credentials Query Language]}), spesifikasyonun 6. bölümünde tanımlanan, JSON ile yazılan bir sorgu dili \[4\].

DCQL sorgusunun iskeleti iki parçadır (Şekil 6):

- #{strong[#{raw("credentials")}]}: Her biri bir #{strong[belge sorgusu]} olan nesnelerden oluşan dizi. Her belge sorgusunun bir kimliği (#{raw("id")}), bir belge biçimi (#{raw("format")}), biçime özgü üst veri koşulları (#{raw("meta")}; SD-JWT VC için kabul edilen #{raw("vct")} değerleri, mdoc için belge türü #{raw("doctype_value")}) ve istenen alanların listesi (#{raw("claims")}) vardır. Her alan bir #{strong[yol]} (#{emph[path]}) ile gösterilir: JSON belgelerde iç içe alan adlarının dizisi, mdoc’ta ise ad alanı ve öğe adı.
- #{strong[#{raw("credential_sets")}]} (isteğe bağlı): Hangi belge sorgularının hangi birleşimlerle yeterli sayılacağını söyler. "Şu ya da şu" seçenekleri ve zorunlu olmayan ek belgeler burada tanımlanır.

#sekil(6, [Bir DCQL sorgusunun yapısı], "figures/a8/sekil-6.svg", yarim: false)

#kutu("teknik", [DCQL örnekleri])[
Yurdun öğrenci belgesi isteği tek bir belge sorgusundan oluşur (değerler örnektir):

#kod("json", "{
  \"credentials\": [
    {
      \"id\": \"ogrenci\",
      \"format\": \"dc+sd-jwt\",
      \"meta\": { \"vct_values\": [\"https://belge.universite.example/ogrenci-belgesi\"] },
      \"claims\": [
        { \"path\": [\"given_name\"] },
        { \"path\": [\"family_name\"] },
        { \"path\": [\"enrollment_status\"] },
        { \"path\": [\"valid_until\"] }
      ]
    }
  ]
}", baslik: "Örnek: yurdun tek belgelik DCQL sorgusu")

Bir bankanın "ya kimlik bilgisi ya ehliyet, isteğe bağlı olarak da sadakat kartı numarası" isteği ise #{raw("credential_sets")} ile yazılır. Ehliyet mdoc biçiminde olduğu için alan yolları iki parçalıdır: önce ad alanı, sonra öğe adı.

#kod("json", "{
  \"credentials\": [
    { \"id\": \"pid\", \"format\": \"dc+sd-jwt\",
      \"meta\": { \"vct_values\": [\"urn:eudi:pid:1\"] },
      \"claims\": [ { \"path\": [\"family_name\"] }, { \"path\": [\"given_name\"] },
                  { \"path\": [\"birthdate\"] } ] },
    { \"id\": \"ehliyet\", \"format\": \"mso_mdoc\",
      \"meta\": { \"doctype_value\": \"org.iso.18013.5.1.mDL\" },
      \"claims\": [ { \"path\": [\"org.iso.18013.5.1\", \"family_name\"] },
                  { \"path\": [\"org.iso.18013.5.1\", \"given_name\"] },
                  { \"path\": [\"org.iso.18013.5.1\", \"birth_date\"] } ] },
    { \"id\": \"sadakat\", \"format\": \"dc+sd-jwt\",
      \"meta\": { \"vct_values\": [\"https://banka.example/sadakat\"] },
      \"claims\": [ { \"path\": [\"member_number\"] } ] }
  ],
  \"credential_sets\": [
    { \"options\": [ [\"pid\"], [\"ehliyet\"] ] },
    { \"required\": false, \"options\": [ [\"sadakat\"] ] }
  ]
}", baslik: "Örnek: bankanın seçenekli DCQL sorgusu")

İlk küme "pid ya da ehliyet, biri yeter" der. İkinci küme #{raw("required: false")} olduğu için isteğe bağlıdır; cüzdan kişiye bu belgeyi paylaşmama seçeneğini sunar. DCQL ayrıca bir alanın belirli değerlerden birini taşımasını (#{raw("values")}), belgenin belirli bir güven otoritesinden gelmesini (#{raw("trusted_authorities")}; örneğin sertifika zincirindeki otorite anahtar kimliği #{raw("aki")} ya da bir ETSI güven listesi #{raw("etsi_tl")}) ve sahip bağlama kanıtının istenip istenmediğini (#{raw("require_cryptographic_holder_binding")}) ifade edebilir.
]

DCQL’in sade görünen yapısının arkasında bir mahremiyet düşüncesi yatar. Sorgu, doğrulayanın #{strong[neyi istediğini]} açıkça yazar; böylece cüzdan kişiye tam olarak ne paylaşılacağını gösterebilir ve istekte bulunmayan hiçbir alanı göndermez. #{raw("trusted_authorities")} alanı da doğrulayanın zaten reddedeceği bir belgenin boşuna paylaşılmasını önler. Spesifikasyon burada bir uyarı düşer: Bu alan yalnızca seçimi kolaylaştırır; gelen belgenin verenine güvenip güvenmeyeceğine her durumda doğrulayan kendisi karar vermek zorundadır.

== Cevap: vp\_token ve sahip bağlama kanıtı

Kişi onay verdiğinde cüzdan, DCQL sorgusundaki her belge sorgusu için bir sunum hazırlar. Cevaptaki #{raw("vp_token")}, anahtarları belge sorgularının kimlikleri, değerleri o sorguya karşılık gelen sunumlar olan bir JSON nesnesidir: #{raw("{\"ogrenci\": [\"eyJhbGci…\"]}")}. Doğrulayan, hangi sunumun hangi isteğe cevap olduğunu bu anahtarlardan anlar.

Sunumun içi belge biçimine göre değişir.

#{strong[SD-JWT VC için]} sunum üç parçanın birleşimidir: veren kurumun imzaladığı JWT, kişinin açmayı kabul ettiği alanların açıklamaları ve en sonda #{strong[anahtar bağlama JWT’si]} (#{emph[Key Binding JWT]}, KB-JWT). KB-JWT, cüzdanın belgedeki #{raw("cnf")} anahtarıyla imzaladığı küçük bir JWT’dir ve dört şey taşır: kim için üretildiği (#{raw("aud")}: doğrulayanın #{raw("client_id")} değeri), hangi istek için üretildiği (#{raw("nonce")}: istekteki taze değer), ne zaman üretildiği (#{raw("iat")}) ve hangi açıklamaların gönderildiği (#{raw("sd_hash")}: sunumun geri kalanının özeti) \[13\]. Bu dört alan birlikte üç saldırıyı önler. Başka bir doğrulayana gösterilmiş bir sunum buraya getirilemez (#{raw("aud")}). Aynı doğrulayana daha önce gösterilmiş bir sunum tekrar oynatılamaz (#{raw("nonce")}). Yolda bir açıklama eklenip çıkarılamaz (#{raw("sd_hash")}).

#{strong[mdoc için]} sunum, ISO\/IEC 18013-5’in #{raw("DeviceResponse")} yapısıdır. Bu yapıda cüzdanın imzası (ya da bir MAC değeri) bir #{strong[oturum dökümü]} (#{emph[session transcript]}) üzerine atılır. Yüz yüze kullanımda oturum dökümü cihazlar arasındaki tanışma mesajlarını içerir; dizinin dokuzuncu yazısında ayrıntılı anlatacağız. OpenID4VP internet üzerinden kullanım için özel bir döküm tanımlar: #{raw("OpenID4VPHandover")} adlı yapı doğrulayanın kimliğini, istekteki nonce değerini, cevabın şifrelendiği anahtarın parmak izini ve cevabın gönderildiği adresi bir araya getirip özetler. Dört değer önce bir CBOR dizisine konur, sonra bu dizinin özeti alınır:

#formul[$ h &= "SHA-256"("CBOR"["client_id", "nonce", "anahtar parmak izi", "response_uri"]) \
"handover" &= ("OpenID4VPHandover", h) $]

Böylece mdoc imzası da KB-JWT gibi bu isteğe, bu doğrulayana ve bu cevap adresine bağlanır.

#kutu("teknik", [Bir anahtar bağlama JWT’si])[
Yurdun isteğine cevap olarak üretilen KB-JWT’nin çözülmüş hâli (değerler örnektir):

#kod("json", "{
  \"typ\": \"kb+jwt\",
  \"alg\": \"ES256\"
}
.
{
  \"aud\": \"x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk\",
  \"nonce\": \"n-0S6_WzA2Mj\",
  \"iat\": 1791187200,
  \"sd_hash\": \"Dy-RYwZfaaoC3inJbLslgPvMp09bH-clYP_3qbRqtW4\"
}", baslik: "Örnek: çözülmüş bir KB-JWT (başlık . içerik)")

Sunumun tamamı şöyle dizilir:

#kod("text", "<veren imzalı JWT>~<açıklama 1>~<açıklama 2>~<açıklama 3>~<açıklama 4>~<KB-JWT>", baslik: "Örnek: bir SD-JWT VC sunumunun dizilişi")

#{raw("sd_hash")}, KB-JWT’den önceki bütün metnin (son #{raw("~")} dahil) SHA-256 özetinin base64url ile yazılmış hâlidir. Veren imzalı JWT’ye $J$, açıklamalara $D_1, dots, D_4$ dersek:

#formul[$ "sd_hash" = "BASE64URL"("SHA-256"(J "~" D_1 "~" D_2 "~" D_3 "~" D_4 "~")) $]

Doğrulayan aynı özeti kendisi hesaplar; tek bir açıklama eksik ya da fazla olsa özet tutmaz.

Cevap şifreli gönderildiğinde (#{raw("direct_post.jwt")}), cüzdan #{raw("vp_token")} ve #{raw("state")} değerlerini bir JSON nesnesine koyar, bunu doğrulayanın istekte verdiği geçici açık anahtara şifreler (JWE; ECDH-ES ile anahtar anlaşması, A128GCM ya da A256GCM ile şifreleme) ve tek bir #{raw("response")} parametresi olarak gönderir. Böylece belge içeriği, bağlantıyı aradan açan ara sistemlerde bile açık hâlde görünmez.
]

== Doğrulayanın kontrol listesi

Cevap geldiğinde doğrulayanın asıl işi başlar. Bir sunumun kabul edilebilmesi için doğrulayan, aşağıdaki tabloda sıralanan altı kontrolü yapar. Bu listenin dikkat çekici yanı, hiçbir adımda veren kurumla canlı bir konuşma bulunmamasıdır. Üçüncü adımdaki güven listeleri dizinin altıncı, dördüncü adımdaki durum listeleri yedinci, altıncı adımdaki özetler üçüncü yazısının konusudur. Dördüncü adımda doğrulayan, belgede adresi yazan durum listesini indirir; ama bu liste bile önbelleğe alınabilir ve herkese aynı dosya olarak sunulur. Liste binlerce belgenin durumunu birlikte taşıdığı için veren kurum hangi belgenin sorgulandığını öğrenmez. Kontroller sırasıyla şunlardır:

#adimlar((
  ("Doğrulayan", [#{strong[Oturum.]} Cevap şifreliyse çözer; #{raw("state")} değerinin bu oturuma ait olduğunu kontrol eder.], $"state" = "oturum"$),
  ("Doğrulayan", [#{strong[Sorgu.]} Her sunumun DCQL’deki bir sorguya karşılık geldiğini, fazlasının gelmediğini kontrol eder.], $"gelen" subset.eq "istenen"$),
  ("Doğrulayan", [#{strong[Veren.]} Veren kurumun imzasını doğrular; imzacının yetkisini #{strong[güven listesinden]} öğrenir.], $"imzacı" in "güven listesi"$),
  ("Doğrulayan", [#{strong[Süre ve iptal.]} Belgenin süresinin dolmadığını ve #{strong[iptal edilmediğini]} kontrol eder.], $t < "exp", "durum" = 0$),
  ("Doğrulayan", [#{strong[Sahip.]} KB-JWT’yi (ya da mdoc imzasını) belgedeki anahtarla doğrular; #{raw("aud")}, #{raw("nonce")}, #{raw("iat")} bu isteğe ait ve taze olmalı.], $"doğrula"("KB-JWT", "cnf")$),
  ("Doğrulayan", [#{strong[Açıklamalar.]} Açılan alanların özetlerinin belgedeki özetlerle eşleştiğini doğrular.], $H(D_i) in "_sd"$),
))

== Oltalama ve oturum sabitleme

Cihazlar arası akışın zayıf bir noktası vardır ve OpenID4VP güvenlik bölümünde bunu açıkça tartışır. Saldırgan, gerçek bir doğrulayanın sitesinde kendisi için başlattığı bir isteğin QR kodunu sahte bir sayfada kurbana gösterebilir. Kurban kodu okutur, cüzdanında gerçek bir kurumun adını görür ve onaylar. Sunum gerçek kuruma gider, ama kimliği doğrulanmış oturum saldırganın tarayıcısında açılır. Bu saldırıya #{strong[oturum sabitleme]} (#{emph[session fixation]}) denir. Cüzdan, kişinin QR kodu hangi ekranda gördüğünü bilemez.

Aynı cihaz akışında bunun bir çaresi vardır. Doğrulayan cevabı aldıktan sonra cüzdana bir #{raw("redirect_uri")} döner; cüzdan kişiyi bu adrese, yani akışın başladığı tarayıcıya geri gönderir. Adresin içinde yalnızca o oturuma ait taze bir değer bulunur. Oturum saldırganın tarayıcısında başlamışsa, kurbanın tarayıcısına dönen değer orada bir anlam taşımaz ve doğrulayan sunumu reddeder. Bölüm 6’da göreceğimiz gibi HAIP bu nedenle doğrulayanlara, yakınlığa dayanmayan senaryolarda mümkün olduğunca aynı cihaz akışını önerir. Bölüm 7’deki Digital Credentials API ise sorunu farklı bir yoldan, tarayıcının kendisini işin içine katarak çözer.

#kutu("ornek", [Aynur yurt başvurusunda])[
Aynur dizüstü bilgisayarında yurdun başvuru sayfasındadır. "Öğrencilik durumunu cüzdanla kanıtla" düğmesine basınca ekranda bir QR kod belirir. Telefonundaki cüzdan kodu okur, #{raw("request_uri")} adresinden imzalı isteği indirir, imzayı ve sertifikayı kontrol eder. İstekle gelen kayıt sertifikası, yurdu işleten kurumun adını ve bildirdiği amacı ("öğrenci yurdu başvurusu") taşır. Cüzdan DCQL sorgusuna bakarak öğrenci belgesini bulur ve Aynur’a dört alanı gösterir. Aynur onaylar. Cüzdan, toplu verme sırasında aldığı kopyalardan daha önce kullanılmamış birini seçer, yalnızca dört açıklamayı ekler, KB-JWT’yi imzalar, sonucu yurdun geçici anahtarına şifreler ve gönderir. Yurdun sunucusu kontrolleri yapar ve bilgisayardaki sayfa ilerler. Üniversite bu işlemden habersizdir.
]

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
OpenID4VP’de doğrulayan OAuth istemcisi, cüzdan ise isteği karşılayan taraftır. Doğrulayan ne istediğini DCQL ile tarif eder, kimliğini imzalı bir istekle ve sertifikalarla gösterir. Cüzdan yalnızca istenen alanları, bu isteğe ve bu doğrulayana bağlanmış bir imzayla gönderir. Doğrulama sırasında veren kurumla hiçbir canlı konuşma olmaz.
]

= HAIP: AB’nin Yüksek Güvence Profili

== Neden bir profil daha?

Bölüm 4 ve 5’te sayılan seçeneklere bir kez daha bakalım: iki yetki türü, altı istemci kimliği öneki, birkaç belge biçimi, şifreli ya da şifresiz cevap, imzalı ya da imzasız istek, birkaç anahtar kanıtı türü. İki taraf bu seçeneklerden farklılarını seçerse, ikisi de "OpenID4VP uyumlu" olduğu hâlde birbirini anlamaz. Kimlik gibi yüksek riskli bir alanda bazı seçenekler (imzasız istek ya da şifresiz cevap gibi) belirli senaryolarda kabul edilemez de olabilir.

#{strong[HAIP]} (#{emph[OpenID4VC High Assurance Interoperability Profile]}) 1.0, bu sorunu çözmek için hazırlanmış ve 24 Aralık 2025’te nihai spesifikasyon olarak yayımlanmış bir profildir \[5\]. Adındaki "yüksek güvence", yüksek düzeyde güvenlik ve mahremiyet gerektiren senaryoları hedeflediğini söyler. Spesifikasyon hedef kitlesi arasında eIDAS 2.0’ı \[23\] uygulayanları açıkça sayar; ama yalnızca Avrupa’ya ait değildir, başka yetki alanlarının ve özel sektörün de kullanabileceği biçimde yazılmıştır.

HAIP’in giriş bölümündeki bir not, sık yapılan bir hatayı önler. Profil, eIDAS’taki "yüksek" güvence düzeyinin gereklerinin #{strong[bir kısmını]} karşılar, tamamını karşılamaz. Kişinin kimliğinin ilk başta ne kadar sağlam doğrulandığı, anahtarların hangi donanımda saklandığı ve kurumların hangi süreçleri işlettiği gibi konular profilin dışındadır. HAIP’e uymak, bir sistemi kendiliğinden yüksek güvenceli yapmaz.

== HAIP neyi zorunlu kılıyor?

Tablo 1, HAIP’in başlıca zorunluluklarını OpenID4VCI ve OpenID4VP’deki karşılıklarıyla yan yana koyuyor.

#tablo([#{strong[Tablo 1.]} HAIP 1.0’ın başlıca zorunlulukları.], (15fr, 20fr, 48fr), ([Alan], [Temel spesifikasyonda], [HAIP’te],), (
  ([Belge biçimi], [serbest (SD-JWT VC, mdoc, W3C VC…)], [SD-JWT VC (#{raw("dc+sd-jwt")}) ya da mdoc (#{raw("mso_mdoc")}); en az biri],),
  ([Belge verme yetki türü], [yetkilendirme kodu ve\/veya ön yetkilendirilmiş kod], [yetkilendirme kodu zorunlu; teklif aynı cihaz ve cihazlar arası desteklenmeli],),
  ([OAuth güvenliği], [isteğe bağlı eklentiler], [FAPI 2.0 güvenlik profili: PKCE (#{raw("S256")}), PAR (yetkilendirme uç noktası kullanılıyorsa), DPoP],),
  ([Cüzdanın kimliği], [isteğe bağlı], [PAR ve belirteç uç noktasında istemci kimlik doğrulaması zorunlu (cüzdan onayıyla)],),
  ([Anahtar kanıtı], [#{raw("jwt")}, #{raw("attestation")}…], [cüzdanlar anahtar onayını desteklemek zorunda],),
  ([Sunum isteği], [imzalı ya da imzasız], [yönlendirmeli akışta imzalı istek (JAR, #{raw("request_uri")}) zorunlu],),
  ([Doğrulayanın kimliği], [altı önek], [imzalı isteklerde #{raw("x509_hash")}],),
  ([Sorgu dili], [DCQL ya da #{raw("scope")}], [DCQL zorunlu; #{raw("aki")} türündeki güven otoritesi sorgusu desteklenmeli],),
  ([Cevap], [şifreli ya da şifresiz], [şifreli cevap zorunlu (#{raw("direct_post.jwt")}; DC API’de #{raw("dc_api.jwt")})],),
  ([Kriptografi], [serbest], [en az ES256 (P-256, SHA-256); şifrelemede ECDH-ES P-256, A128GCM ve A256GCM],),
  ([Tarayıcı yolu], [isteğe bağlı], [DC API ile sunum yolu tanımlı; cüzdan imzasız, imzalı ve çok imzalı istekleri desteklemeli],),
))

Tablonun arkasında birkaç ayrıntı daha vardır. HAIP, imza zincirlerinde güven çapası (en üstteki kök) sertifikasının mesajla birlikte gönderilmesini yasaklar; kökü her taraf kendi güvendiği kaynaktan, örneğin bir güven listesinden almalıdır. İsteği imzalayan sertifikanın kendinden imzalı olması da yasaktır. OAuth tarafında HAIP, finans sektörü için geliştirilen FAPI 2.0 güvenlik profiline \[15\] dayanır ve onun bazı kurallarını cüzdan dünyasına uyarlar. Cüzdan onaylarında ise mahremiyet için bir kural koyar: Onay, tek bir cüzdan kurulumuna özgü bir tanımlayıcı taşımamalı ve farklı veren kurumlara aynı onay gösterilmemelidir; yoksa veren kurumlar aynı cüzdanı birbirine bağlayabilir.

HAIP’in kapsam dışı bıraktıkları da öğreticidir. Spesifikasyon, hangi veren kurumun hangi belgeyi vermeye yetkili olduğunu ve hangi doğrulayanın hangi belgeyi istemeye yetkili olduğunu belirleyen #{strong[güven yönetimini]} bilerek kapsam dışında tutar; X.509 altyapısını yoğun biçimde kullanır ama kök sertifikaların nereden alınacağını ekosisteme bırakır. Bluetooth gibi çevrimdışı yollarla sunum da bu sürümün kapsamında değildir; o alan ISO\/IEC 18013-5’e aittir.

== Avrupa Birliği HAIP’i nasıl kullanıyor?

Avrupa Birliği, cüzdanın hangi protokolleri desteklemesi gerektiğini 2024’te kabul edilen 2024\/2982 sayılı uygulama tüzüğüyle belirlemişti \[16\]. Temmuz 2026’da kabul edilen 2026\/1731 sayılı uygulama tüzüğü bu tüzüğü değiştirerek atıfları güncelledi \[17\]. Güncellenen metin belge verme için ETSI TS 119 472-3’e, belge gösterme için ETSI TS 119 472-2’ye dayanır \[18, 19\]. Bu ETSI spesifikasyonları kendi başlarına yeni protokoller tanımlamaz; OpenID4VCI ve OpenID4VP’yi HAIP üzerinden profiller, gösterme tarafında da yanına ISO mdoc yolunu ekler. Yani bir Avrupa cüzdanı için HAIP bir tavsiye olmaktan çıkmış, hukuken atıf yapılan bir zincirin halkası hâline gelmiştir.

Bu zincir AB dışındaki bir ekosistem için de önemli bir şey söyler. Avrupa cüzdanlarıyla konuşmak isteyen bir veren kurum ya da doğrulayan, "OpenID4VP destekliyorum" demekle yetinemez; HAIP’in seçtiği seçenekleri, ETSI’nin üzerine eklediklerini ve ekosistemin güven altyapısını birlikte desteklemek zorundadır.

= Tarayıcıdan Cüzdana: W3C Digital Credentials API

== Bağlantı şemalarının sorunu

Bölüm 5’te cüzdanın bir bağlantı ya da QR kodla çağrıldığını söyledik. Bu yöntemin üç sorunu vardır.

Birincisi, #{raw("openid4vp://")} gibi özel bir bağlantı şemasını telefona kurulu #{strong[herhangi bir uygulama]} sahiplenebilir. Kişinin telefonunda iki cüzdan varsa işletim sistemi hangisini açacağını bilemeyebilir; daha kötüsü, kötü niyetli bir uygulama aynı şemayı kaydedip istekleri kendine çekebilir.

İkincisi, cüzdan isteğin #{strong[hangi web sitesinde]} başladığını bilmez. İstekteki imza doğrulayanın kim olduğunu söyler; kişinin o an gerçekten o doğrulayanın sitesinde mi, yoksa onu taklit eden bir sayfada mı olduğunu söylemez. Bölüm 5.7’deki oturum sabitleme saldırısı bu boşluktan beslenir.

Üçüncüsü, kullanıcı deneyimi kırılgandır. Cüzdan açıldıktan sonra kişinin doğru tarayıcı sekmesine geri dönmesi, birden fazla tarayıcının kurulu olduğu telefonlarda sık sık bozulur.

== Tarayıcıya bir kapı açmak

W3C’nin Federe Kimlik Çalışma Grubu (#{emph[Federated Identity Working Group]}) bünyesinde geliştirilen #{strong[Digital Credentials API]}, bu sorunlara tarayıcı düzeyinde bir cevap verir \[6\]. Web sitesi cüzdanı bir bağlantıyla çağırmak yerine tarayıcıya "kullanıcıdan şu protokolle bir belge iste" der. Tarayıcı isteği işletim sistemine iletir; işletim sistemi kurulu cüzdanlardan isteği karşılayabilecek olanları bulur ve kişiye bir seçim ekranı gösterir. Kişi bir cüzdanı seçip onay verdiğinde cüzdanın cevabı aynı yoldan, aynı sekmeye döner (Şekil 7).

Bu düzenin en önemli kazancı #{strong[köken]} (#{emph[origin]}) bilgisidir. Tarayıcı isteği cüzdana iletirken isteğin hangi web sitesinden geldiğini kendisi ekler; bu bilgiyi sayfa değiştiremez. İmzalı bir istekte cüzdan, doğrulayanın beyan ettiği köken listesini (#{raw("expected_origins")}) tarayıcının bildirdiği kökenle karşılaştırır. Cevaptaki sahip bağlama kanıtının alıcısı da (#{raw("aud")}) artık #{raw("origin:")} önekiyle yazılmış bu kökendir; istemci kimliği bu rolü bırakır. Sahte bir sayfa gerçek bir doğrulayanın imzalı isteğini kopyalasa bile tarayıcının bildirdiği köken farklı olacağı için cüzdan isteği reddeder; imzasız bir istekte de üretilen sunum sahte sayfanın kökenine bağlanacağı için gerçek doğrulayanın işine yaramaz.

Cihazlar arası senaryoda da DC API bir fark yaratır. Masaüstü tarayıcı yine bir QR kod gösterir, ama bu kod bir OpenID4VP isteği taşımaz; işletim sistemlerinin geçiş anahtarları için de kullandığı bir yakınlık bağlantısını başlatır ve telefon ile bilgisayar arasındaki bağlantı Bluetooth üzerinden bir yakınlık kontrolünden geçer. OpenID4VP spesifikasyonu, bu yolun FIDO CTAP 2.2’deki "hibrit" taşıma yöntemiyle sağlanabileceğini yazar \[4\]. Böylece uzaktaki bir saldırganın sahte sayfadan gösterdiği QR kod, kurbanın telefonunu saldırganın bilgisayarına bağlayamaz.

#sekil(7, [Digital Credentials API ile sunum], "figures/a8/sekil-7.svg", yarim: false)

#kutu("teknik", [Sayfanın tarafından bir çağrı])[
Web sayfası API’yi şöyle çağırır (W3C taslağındaki örneğin yapısına dayanır; değerler örnektir):

#kod("javascript", "const cevap = await navigator.credentials.get({
  digital: {
    requests: [{
      protocol: \"openid4vp-v1-signed\",
      data: { request: \"eyJhbGciOiJFUzI1NiIsInR5cCI6Im9hdXRoLWF1dGh6LXJlcStqd3Qi…\" }
    }]
  }
});
// cevap.protocol: \"openid4vp-v1-signed\"
// cevap.data: { response: \"eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIs…\" }", baslik: "Örnek: sayfanın Digital Credentials API çağrısı")

#{raw("protocol")} alanı, verinin hangi protokole göre yorumlanacağını söyler. OpenID4VP 1.0 üç değer tanımlar: #{raw("openid4vp-v1-unsigned")} (imzasız istek), #{raw("openid4vp-v1-signed")} (tek imzalı istek) ve #{raw("openid4vp-v1-multisigned")} (birden fazla imza; farklı güven çerçevelerine aynı anda seslenmek için). W3C taslağının protokol kaydında bunlara ek olarak ISO\/IEC 18013-7’nin mdoc’a özgü yolu #{raw("org-iso-mdoc")} ve belge verme için #{raw("openid4vci-v1")} yer alır. Belge verme API’nin #{raw("navigator.credentials.create")} yöntemiyle yapılır; #{raw("data")} alanı bir OpenID4VCI teklifini taşır.
]

== Durum: taslak bir standart, yayında bir özellik

Digital Credentials API, bu yazının yazıldığı sırada W3C’de hâlâ bir #{strong[çalışma taslağıdır]} (#{emph[Working Draft]}); okuduğumuz son taslak 29 Ekim 2026 tarihlidir \[6\]. Buna karşılık tarayıcılar API’yi taslak aşamasında kullanıma açtı. Chrome, Ekim 2025’te yayımladığı duyuruda API’nin Chrome 141’den itibaren varsayılan olarak etkin olduğunu, Android’de aynı cihazda ve masaüstünde cihazlar arası sunumu desteklediğini bildirdi; aynı duyuruya göre Apple da Safari 26 ile API’yi desteklemeye başladı \[21\]. Belge verme tarafında Chrome, Ekim 2026’da #{raw("navigator.credentials.create")} ile OpenID4VCI tekliflerinin Chrome 155’ten itibaren varsayılan olarak çalıştığını duyurdu; bu duyuruda desteklenen platformlar arasında iOS sayılmıyor \[22\].

Bu tablo, standartlaşma ile uygulama arasındaki ilişkinin tipik bir örneğidir: Taslak, büyük tarayıcıların gerçek kullanıcılarla edindiği deneyimle şekillenmeye devam ediyor. HAIP’in DC API yolunu tanımlaması ve Avrupa’daki ETSI profillerinin bu yola atıf yapması da bu nedenle izlenmesi gereken bir gelişmedir: Bir protokol hukuki bir metne bağlanırken, altındaki tarayıcı arayüzü hâlâ değişebilir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Digital Credentials API, cüzdanı çağırma işini bağlantı şemalarından alıp tarayıcıya ve işletim sistemine verir. Bunun en önemli sonucu, isteğin hangi web sitesinden geldiğini tarayıcının kendisinin söylemesidir; böylece oltalama ve oturum sabitleme saldırıları zorlaşır. API’nin kendisi protokolden bağımsızdır; OpenID4VP, OpenID4VCI ve ISO mdoc istekleri aynı kapıdan geçer.
]

= Uyum Testleri: "Destekliyorum" Demek Yetmez

== Neden test?

Bir protokolün metni, onu uygulayan herkesin aynı şeyi anladığı anlamına gelmez. OpenID4VP’nin güvenlik bölümü bu konuda açık konuşur: Spesifikasyonun eksik ya da yanlış uygulanması güvenlik sorunlarına yol açar ve uygulamacılar uyum testlerini kullanmaya teşvik edilir. Bir cüzdanın, imzası bozulmuş bir isteği reddetmesi, #{raw("nonce")} değeri tutmayan bir sunumu doğrulayanın kabul etmemesi, istekte olmayan bir alanın gönderilmemesi gerekir. Bunlar ancak bilerek bozulmuş mesajlarla sınanabilir.

== OpenID Vakfı’nın test düzeni

OpenID Vakfı, OpenID Connect için yıllardır işlettiği uyum testi ve sertifikasyon düzenini OpenID4VC ailesine genişletti. Vakıf Aralık 2025’te OpenID4VP 1.0, OpenID4VCI 1.0 ve HAIP 1.0 için öz-sertifikasyonun Şubat 2026’da başlayacağını duyurdu; testlerin ücretsiz ve açık kaynak olduğunu, yerelde ya da vakfın sunucularına karşı çalıştırılabildiğini ve sürekli entegrasyon hatlarına eklenebildiğini belirtti \[20\]. Ağustos 2026’daki duyuruda ise test takımlarının tamamlandığı ve öz-sertifikasyona açıldığı bildirildi: OpenID4VP için cüzdan ve doğrulayan, OpenID4VCI için veren kurum ve cüzdan rolleri ayrı ayrı test edilebiliyor \[20\]. Aynı duyuruya göre test takımları 2025’in Mayıs, Temmuz ve Kasım aylarında yapılan uygulamacı buluşmalarında sınandı.

Düzenin işleyişi şöyledir. Uygulamacı kendi yazılımını test takımına karşı çalıştırır. Takım olumlu senaryoların yanında bilerek bozulmuş mesajlar da gönderir ve yazılımın bunları reddedip reddetmediğine bakar. Bütün testleri geçen uygulamacı, test kayıtlarını vakfa gönderebilir; vakıf kayıtları inceler ve sonuçları kendi sitesinde yayımlar. Testleri çalıştırmak ücretsizdir; sonuçların incelenip yayımlanması için vakfın kâr amacı gütmeyen bir ücret tarifesi vardır.

== Öz-test, sertifika ve hukuki uygunluk

Burada kamuoyunda sık karıştırılan üç kavramı ayırmak gerekir.

#{strong[Kendi kendine test]} (#{emph[self-test]}), bir uygulamacının test takımını kendi ortamında çalıştırıp sonuçlara bakmasıdır. Hiçbir dış onay içermez; "testlerden geçiyor" demek "sertifikalı" demek anlamına gelmez.

#{strong[Öz-sertifikasyon]} (#{emph[self-certification]}), test kayıtlarının vakfa sunulup vakıf tarafından yayımlanmasıdır. Uygulamacı testleri kendisi çalıştırır, ama sonuçlar herkese açık ve incelenebilir hâle gelir.

#{strong[Hukuki uygunluk değerlendirmesi]} ise bambaşka bir süreçtir. Avrupa Birliği’nde bir cüzdanın sertifikalandırılması, eIDAS 2.0 kapsamında yetkilendirilmiş uygunluk değerlendirme kuruluşlarının yürüttüğü, güvenlik, süreç ve işletme gerekliliklerini de kapsayan bir değerlendirmedir. Bir protokol testinden geçmek bu sürecin yalnızca küçük bir parçasıdır.

= Akışların Karşılaştırması

Bu yazıda anlattığımız akışları dizinin ilk yazısındaki OpenID Connect girişiyle yan yana koymak, her birinin neyi çözdüğünü görmeyi kolaylaştırır.

#tablo([#{strong[Tablo 2.]} OpenID Connect girişi ile OpenID4VC akışlarının karşılaştırması.], (18fr, 23fr, 24fr, 23fr, 26fr), ([Ölçüt], [OpenID Connect girişi], [OpenID4VCI], [OpenID4VP (yönlendirmeli)], [OpenID4VP (DC API)],), (
  ([Amaç], [bir siteye giriş], [cüzdana belge koymak], [cüzdandan belge göstermek], [cüzdandan belge göstermek],),
  ([Cüzdanın OAuth rolü], [yok (kimlik sağlayıcı merkezde)], [istemci], [yetkilendirme sunucusu gibi], [yetkilendirme sunucusu gibi],),
  ([İmzayı kim, ne zaman atıyor?], [kimlik sağlayıcı, her girişte], [veren kurum, bir kez], [veren (önceden) ve cüzdan (sunumda)], [veren (önceden) ve cüzdan (sunumda)],),
  ([Veren işlemden haberdar mı?], [evet, her girişte], [evet (belgeyi veren odur)], [hayır], [hayır],),
  ([Karşı tarafın kimliği], [önceden kayıtlı istemci], [veren üst verisi ve TLS], [imzalı istek, X.509, kayıt sertifikası], [imzalı istek ve tarayıcının bildirdiği köken],),
  ([Tekrar oynatmaya karşı], [#{raw("nonce")}, tek kullanımlık kod], [#{raw("c_nonce")}, DPoP], [#{raw("nonce")}, #{raw("aud")}, #{raw("sd_hash")}], [#{raw("nonce")}, #{raw("origin:")} kökeni],),
  ([Cihazlar arası risk], [düşük (tarayıcı içinde)], [ön yetkilendirilmiş kodun çalınması (işlem koduyla azaltılır)], [oturum sabitleme], [yakınlık kontrolüyle azaltılır],),
  ([Cüzdanı çağırma], [tarayıcı yönlendirmesi], [QR, bağlantı, cüzdan içi liste, DC API], [QR, bağlantı şeması], [tarayıcı ve işletim sistemi],),
))

Tablonun en önemli satırı dördüncüsüdür. OpenID Connect’te her giriş kimlik sağlayıcının o anda imza atmasını gerektirir; bu yüzden kimlik sağlayıcı her şeyi görür. OpenID4VC ailesinde ise veren kurum yalnızca belgeyi verdiği anda işin içindedir; sonraki her gösterim onun haberi olmadan gerçekleşir. Dizinin ilk yazısında "eve telefon etme" sorunu dediğimiz şeyin teknik çözümü, belge vermenin ve belge göstermenin iki ayrı protokole ayrılmasıdır.

= Sınırlar ve Açık Sorular

#{strong[Seçenek bolluğu.]} OpenID4VP’nin kendisini "profillenmesi gereken bir çerçeve" olarak tanımladığını gördük. HAIP bu seçenekleri daraltıyor, ama Avrupa’da ETSI profilleri, ulusal kurallar ve sektör profilleri bunun üzerine yeni katmanlar ekliyor. AB dışındaki ekosistemler de kendi profillerini yazdıkça, aynı protokol ailesi içinde birbirini anlamayan adacıklar oluşabilir. Dizinin ilk yazısında federasyon tarihinden çıkardığımız ders burada da geçerli: Birlikte çalışabilirlik metinlerden çok ortak test takımlarından ve gerçek uygulamacı buluşmalarından doğuyor.

#{strong[İki biçim, iki yığın.]} HAIP, SD-JWT VC ile mdoc’tan en az birini zorunlu kılıyor ve hangisinin seçileceğini ekosisteme bırakıyor. Avrupa’da kimlik bilgisi iki biçimde de verilebiliyor; yüz yüze kullanımda ise mdoc öne çıkıyor. Bu durum veren kurumların, cüzdanların ve doğrulayanların iki ayrı yazılım yığınını birlikte desteklemesini gerektiriyor ve bunun maliyeti küçük kurumlar için azımsanmayacak düzeyde.

#{strong[Doğrulayanın yetkisi.]} Bir isteğin imzası doğrulayanın kim olduğunu söyler; o bilgiyi istemeye hakkı olup olmadığını söylemez. Kayıt sertifikaları ve #{raw("verifier_info")} bu boşluğu doldurmaya çalışıyor. Ama hangi kurumun hangi bilgiyi hangi amaçla isteyebileceğine kimin karar vereceği ve cüzdanların aşırı istekler karşısında ne kadar katı davranacağı, teknik olmaktan çok kurumsal ve hukuki sorular.

#{strong[Platform bağımlılığı.]} Digital Credentials API cüzdan seçimini ve köken doğrulamasını tarayıcıya ve işletim sistemine veriyor. Güvenlik açısından bu büyük bir kazanç. Ama dünyadaki akıllı telefonların neredeyse tamamı iki şirketin işletim sistemini kullanıyor ve hangi cüzdanın seçim listesinde görüneceğine, hangi protokollerin hangi ülkelerde destekleneceğine bu şirketler karar veriyor. Dizinin ilk yazısında "platform bağımlılığı" adıyla andığımız soru, en somut karşılığını burada buluyor.

#{strong[Taslak üzerine kurulan hukuk.]} Avrupa’nın uygulama tüzükleri nihai OpenID spesifikasyonlarına ve ETSI profillerine atıf yapıyor. Ama zincirin bazı halkaları (IETF’teki SD-JWT VC ve cüzdan onayı taslakları, W3C’deki Digital Credentials API) bu yazının yazıldığı sırada hâlâ taslak aşamasında. Hukuki metinler belirli sürümlere bağlandığında, taslaklar ilerledikçe uygulamaların hangi sürümü izleyeceği sorusu doğuyor.

#{strong[Kişinin anlayabileceği onay.]} Protokoller, kişinin onay ekranında neyi göreceğini belirlemez. "Yurt başvuru sistemi dört alan istiyor" ekranı ile bir sertifika zincirini ve bir sorgu metnini gösteren ekran arasında büyük fark var. Kişinin bir isteğin olağan olup olmadığını anlayabilmesi, protokolden çok cüzdan tasarımının ve doğrulayan kayıtlarının okunabilirliğinin işi.

#{strong[Çevrimdışı dünya.]} Bu yazıdaki akışların hepsi bir internet bağlantısı varsayıyor. Kapıda, kasada ya da yol kenarında, internet olmadan yapılan doğrulama başka bir standardın, ISO\/IEC 18013-5’in konusu. Dizinin bir sonraki yazısı ona ayrıldı.

= Tamga Network Bu Konuda Nerede?

Tamga Network, Türkiye ve Türk dünyası için AB’nin eIDAS 2.0 ve EUDI profilleri üzerine kurulmuş, kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanmıştır. Ağın açık kaynak #{raw("@tamga-network")} paketleri bu yazıda anlatılan protokollerin uygulamalarını içerir: belge verme için OpenID4VCI, belge gösterme ve doğrulama için OpenID4VP, belge biçimi olarak SD-JWT VC ve ISO\/IEC 18013-5 mdoc. Ağın bir referans doğrulayıcısı ve bir deneme ortamı (#{emph[sandbox]}) vardır; kod ve belgeler herkese açıktır.

Bölüm 6’da HAIP’in güven yönetimini bilerek kapsam dışında bıraktığını söylemiştik: Hangi veren kurumun hangi belgeyi vermeye yetkili olduğuna ve doğrulayanların kim olduğuna ekosistem karar verir. Tamga Network’ün asıl işi bu boşluktadır. Ağ, belge veren kurumların ve cüzdanların kim olduğunu söyleyen imzalı güven listelerini yayımlar; bu listelerde hiçbir kişisel veri yer almaz. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayanları listeler. Protokol tarafında Avrupa’daki profillerle uyumlu kalmak, AB üyesi olmayan ülkelerin kurumlarının ileride Avrupa cüzdanlarıyla aynı dili konuşabilmesinin ön koşuludur.

= Sonuç

Giriş bölümündeki iki sahne kullanıcı için birkaç dokunuştan ibaretti. Bu yazıda o dokunuşların arkasındaki konuşmayı adım adım izledik. Belge verirken cüzdan bir OAuth istemcisi gibi davranır: Veren kurumun üst verisini okur, kişinin kimliğini kurumun kendi giriş sayfasında ya da bir ön yetkilendirme koduyla kanıtlar, bir erişim belirteci alır ve belgenin bağlanacağı anahtarı taze bir değer üzerine attığı imzayla gösterir. Belge gösterirken roller tersine döner. Doğrulayan ne istediğini DCQL ile tarif eden imzalı bir istek gönderir; cüzdan yalnızca istenen alanları, bu isteğe ve bu doğrulayana bağlanmış bir imzayla döner. HAIP bu seçenekleri yüksek güvence için daraltır. Digital Credentials API, cüzdanı çağırma işini tarayıcıya taşıyarak oltalamaya karşı yeni bir savunma ekler. Uyum testleri de bütün bunların kâğıt üzerinde kalmamasını sağlamaya çalışır.

Bu protokollerin en dikkat çekici yanı, belki de yeni bir şey icat etmemeleridir. On yılı aşkın süredir milyarlarca girişte sınanmış OAuth 2.0’ı alıp, kimlik sağlayıcının her girişi görmediği bir modele uyarlarlar. Dizinin ilk yazısında federasyonun bedelinin "her kapıda bekleyen bir kapıcı" olduğunu söylemiştik. OpenID4VCI ve OpenID4VP aynı teknik mirası kullanarak o kapıcıyı kapıdan kaldırıyor: Belgeyi veren kurum onu bir kez verir ve sonrasında nerede gösterildiğini bilmez.

Ama protokol yalnızca bir dildir. Bir cümlenin dil bilgisi açısından doğru olması, söyleyenin güvenilir olduğunu göstermez. Hangi kurumun hangi belgeyi vermeye, hangi doğrulayanın hangi bilgiyi istemeye yetkili olduğu sorusunu protokoller bilerek dışarıda bırakır; bu soruyu güven listeleri, kayıtlar ve hukuk cevaplar. Dizinin bir sonraki yazısında aynı soruyu internetin olmadığı yerde, bir kapıda ya da bir yol kenarında soracağız.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Hardt, D. (Ed.) (2012). #{emph[The OAuth 2.0 Authorization Framework.]} IETF RFC 6749.]

#kaynak("2")[Sakimura, N., Bradley, J., Jones, M., de Medeiros, B. ve Mortimore, C. (2014). #{emph[OpenID Connect Core 1.0.]} OpenID Foundation, 25 Şubat 2014.]

#kaynak("3")[Lodderstedt, T., Yasuda, K., Looker, T. ve Bastian, P. (2025). #{emph[OpenID for Verifiable Credential Issuance 1.0.]} OpenID Foundation, nihai spesifikasyon, 16 Eylül 2025.]

#kaynak("4")[Terbu, O., Lodderstedt, T., Yasuda, K., Fett, D. ve Heenan, J. (2025). #{emph[OpenID for Verifiable Presentations 1.0.]} OpenID Foundation, nihai spesifikasyon, 9 Temmuz 2025.]

#kaynak("5")[Yasuda, K., Lodderstedt, T., Bormann, C. ve Heenan, J. (2025). #{emph[OpenID4VC High Assurance Interoperability Profile 1.0.]} OpenID Foundation, nihai spesifikasyon, 24 Aralık 2025.]

#kaynak("6")[Caceres, M., Cappalli, T. ve Yosef, M. A. (Ed.) (2026). #{emph[Digital Credentials.]} W3C Working Draft, Federated Identity Working Group, 29 Ekim 2026.]

#kaynak("7")[Sakimura, N., Bradley, J. ve Agarwal, N. (2015). #{emph[Proof Key for Code Exchange by OAuth Public Clients.]} IETF RFC 7636.]

#kaynak("8")[Lodderstedt, T., Campbell, B., Sakimura, N., Tonge, D. ve Skokan, F. (2021). #{emph[OAuth 2.0 Pushed Authorization Requests.]} IETF RFC 9126.]

#kaynak("9")[Fett, D., Campbell, B., Bradley, J., Lodderstedt, T., Jones, M. ve Waite, D. (2023). #{emph[OAuth 2.0 Demonstrating Proof of Possession (DPoP).]} IETF RFC 9449.]

#kaynak("10")[Sakimura, N., Bradley, J. ve Jones, M. (2021). #{emph[The OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request (JAR).]} IETF RFC 9101.]

#kaynak("11")[Lodderstedt, T., Richer, J. ve Campbell, B. (2023). #{emph[OAuth 2.0 Rich Authorization Requests.]} IETF RFC 9396.]

#kaynak("12")[Looker, T., Bastian, P. ve Bormann, C. #{emph[OAuth 2.0 Attestation-Based Client Authentication.]} IETF OAuth Çalışma Grubu taslağı (draft-ietf-oauth-attestation-based-client-auth), 2026’da sürüyor.]

#kaynak("13")[Fett, D., Yasuda, K. ve Campbell, B. (2025). #{emph[Selective Disclosure for JWTs (SD-JWT).]} IETF RFC 9901, Kasım 2025.]

#kaynak("14")[Terbu, O., Fett, D. ve Campbell, B. #{emph[SD-JWT-based Verifiable Digital Credentials (SD-JWT VC).]} IETF OAuth Çalışma Grubu taslağı (draft-ietf-oauth-sd-jwt-vc).]

#kaynak("15")[Fett, D., Tonge, D. ve Heenan, J. (2025). #{emph[FAPI 2.0 Security Profile.]} OpenID Foundation, nihai spesifikasyon, Şubat 2025.]

#kaynak("16")[Avrupa Komisyonu (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin desteklemesi gereken protokol ve arayüzlere ilişkin kuralları belirleyen 2024\/2982 sayılı Uygulama Tüzüğü (AB).]} Avrupa Birliği Resmî Gazetesi, 4 Aralık 2024.]

#kaynak("17")[Avrupa Komisyonu (2026). #{emph[Uygulanacak standart ve spesifikasyonlar bakımından 2024\/2977, 2024\/2979, 2024\/2980 ve 2024\/2982 sayılı Uygulama Tüzüklerini değiştiren 2026\/1731 sayılı Uygulama Tüzüğü (AB).]} 15 Temmuz 2026; Avrupa Birliği Resmî Gazetesi, 22 Temmuz 2026.]

#kaynak("18")[ETSI (2026). #{emph[ETSI TS 119 472-2 V1.2.1: Electronic Signatures and Trust Infrastructures (ESI); Profiles for Electronic Attestation of Attributes; Part 2: Profiles for EAA\/PID Presentations to Relying Party.]} Mart 2026.]

#kaynak("19")[ETSI (2026). #{emph[ETSI TS 119 472-3 V1.1.1: Electronic Signatures and Trust Infrastructures (ESI); Profiles for Electronic Attestation of Attributes; Part 3: Profiles for issuance of EAA or PID.]} Mart 2026.]

#kaynak("20")[OpenID Foundation (2025, 2026). "OpenID for Verifiable Credential self-certification to launch Feb 2026" (18 Aralık 2025) ve "OpenID4VP and OpenID4VCI conformance tests are complete and open for self-certification" (7 Ağustos 2026). openid.net.]

#kaynak("21")[Chrome for Developers (2025). "Digital Credentials API: Secure and private identity on the web." developer.chrome.com, 3 Ekim 2025.]

#kaynak("22")[Chrome for Developers (2026). "Digital Credentials API issuance ships in Chrome 155." developer.chrome.com, 23 Ekim 2026.]

#kaynak("23")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024.]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

Bu yazıdan sonra okunabilecek beş kaynak:

+ #{strong[OpenID4VCI 1.0, Bölüm 3 ("Overview").]} İki akışın spesifikasyondaki çizimleri ve her adımın kısa açıklaması; bu yazıdaki Şekil 3 ve 4’ün kaynağı.
+ #{strong[OpenID4VP 1.0, Bölüm 3 ve 6.]} Aynı cihaz ve cihazlar arası akışların çizimleri ile DCQL’in tanımı ve örnekleri. Ek D’deki karmaşık DCQL örnekleri dilin neler yapabildiğini gösterir.
+ #{strong[OpenID4VP 1.0, Bölüm 14 ve 15.]} Güvenlik ve mahremiyet bölümleri; oturum sabitleme, tekrar oynatma ve doğrulayanlar arası bağlanabilirlik üzerine sade bir tartışma.
+ #{strong[HAIP 1.0, Bölüm 1–5.]} Bir profilin nasıl yazıldığını ve hangi seçenekleri neden daralttığını görmek için kısa, okunaklı bir metin.
+ #{strong[W3C Digital Credentials taslağının giriş ve mahremiyet bölümleri.]} Tarayıcının bu işe neden girdiğini ve hangi riskleri üstlendiğini anlatır.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

Bu yazıda geçen terimler, yazıdaki anlamlarıyla. İngilizce karşılıkları başka kaynaklarda aranabilmeleri için verilmiştir.

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (20fr, 20fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Anahtar bağlama JWT’si], [key binding JWT (KB-JWT)], [SD-JWT sunumunun sonuna eklenen, cüzdanın bu isteğe özel attığı imza],),
  ([Anahtar kanıtı], [key proof], [Cüzdanın anahtara sahip olduğunu taze bir değere imzayla göstermesi],),
  ([Anahtar onayı], [key attestation], [Bir anahtarın güvenli donanımda üretildiğini ve saklandığını söyleyen imzalı belge],),
  ([Aynı cihaz akışı], [same-device flow], [Doğrulayan sayfası ile cüzdanın aynı telefonda olduğu sunum],),
  ([Belge teklifi], [credential offer], [Veren kurumun cüzdana "sana şu belgeleri vermek istiyorum" dediği mesaj],),
  ([Cihazlar arası akış], [cross-device flow], [Doğrulayan sayfası ile cüzdanın ayrı cihazlarda olduğu sunum],),
  ([Cüzdan onayı], [wallet attestation], [Cüzdan sağlayıcısının imzaladığı, cüzdanın güvenilirliğini gösteren belge],),
  ([DCQL], [Digital Credentials Query Language], [Doğrulayanın hangi belgeleri ve alanları istediğini yazdığı JSON sorgu dili],),
  ([Digital Credentials API], [Digital Credentials API (DC API)], [Sayfaların tarayıcı üzerinden cüzdandan belge istediği arayüz],),
  ([DPoP], [Demonstrating Proof of Possession], [Erişim belirtecini istemcinin anahtarına bağlayan OAuth eklentisi],),
  ([HAIP], [High Assurance Interoperability Profile], [OpenID4VCI ve OpenID4VP için yüksek güvence profili],),
  ([İşlem kodu], [transaction code (tx\_code)], [Ön yetkilendirilmiş kodla birlikte istenen, ayrı kanaldan iletilen kısa kod],),
  ([İstemci kimliği öneki], [client identifier prefix], [Doğrulayanın kimliğinin nasıl doğrulanacağını belirten #{raw("client_id")} başlığı],),
  ([Köken], [origin], [Bir web sayfasının şema, alan adı ve bağlantı noktasından oluşan kimliği],),
  ([Nonce], [nonce], [Mesajın bu işleme özgü olduğunu gösteren taze rastgele değer],),
  ([OpenID4VCI], [OpenID for Verifiable Credential Issuance], [Cüzdana belge verme protokolü],),
  ([OpenID4VP], [OpenID for Verifiable Presentations], [Cüzdandan belge isteme ve gösterme protokolü],),
  ([Oturum sabitleme], [session fixation], [Saldırganın başlattığı oturumu kurbana tamamlatma saldırısı],),
  ([Ön yetkilendirilmiş kod], [pre-authorized code], [Kurumun kişiyi akıştan önce tanıdığı durumda teklifle gönderdiği kod],),
  ([PAR], [Pushed Authorization Requests], [Yetkilendirme isteği parametrelerini arka kanaldan önceden gönderme],),
  ([PKCE], [Proof Key for Code Exchange], [Çalınan yetkilendirme kodunun kullanılmasını önleyen OAuth eklentisi],),
  ([Profil], [profile], [Bir standardın seçeneklerini belirli bir ekosistem için daraltan kurallar],),
  ([Sunum], [presentation], [Bir belgenin istenen alanlarıyla ve sahip kanıtıyla doğrulayana gösterilen hâli],),
  ([Toplu belge verme], [batch issuance], [Aynı belgenin farklı anahtarlara bağlı birkaç kopyasını tek seferde alma],),
  ([Uyum testi], [conformance test], [Bir uygulamayı olumlu ve bozuk mesajlarla sınayan test],),
  ([Üst veri], [metadata], [Bir kurumun yeteneklerini ve adreslerini tarif eden belge],),
  ([vp\_token], [vp\_token], [OpenID4VP cevabında sunumları taşıyan parametre],),
  ([Yetkilendirme kodu akışı], [authorization code flow], [Kişinin kurumun giriş sayfasında kimliğini doğruladığı OAuth akışı],),
))

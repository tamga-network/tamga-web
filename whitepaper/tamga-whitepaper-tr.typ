// Tamga Network — Whitepaper v1.0 (tr). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-tr.typ ../public/whitepaper-tr.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "tr",
  title: [Türkiye ve Türk Dünyası için \ Dijital Güven Altyapısı],
  subtitle: [AB’nin EUDI profilleri üzerinde egemen bir referans mimari — X.509 kurumlar, bugün imzalı güven listeleri, bağımsız operatörler katılınca izinli bir defter.],
  labels: (abstract: "Yönetici özeti", contents: "İçindekiler", version: "WHITEPAPER · SÜRÜM 1.0"),
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network bir *Dijital Güven Altyapısıdır*: kurumlar belgeleri — diploma, öğrenci belgesi, kimlik belgesi, bilet — kişinin telefonuna verir, kişi doğrulayıcının ihtiyaç duyduğu alanları paylaşır ve doğrulayıcı belgeyi verene ulaşmadan saniyeler içinde denetler.

    Tamga, AB’nin teknik katmanını değiştirmeden kullanır: *SD-JWT VC* ve *ISO 18013-5 mdoc* belgeleri, *OpenID4VCI/VP*, *X.509* kurumlar ve ETSI modelinde *imzalı güven listeleri*. Kendi katmanı Türk dünyası için yönetişimdir: her yapıda her üye devlet için bir yer vardır ve Tamga yalnızca onlar adına geçici operatördür.

    Güven bugün, herkese açık bir çapa günlüğüyle birlikte sürümlü ve hash-zincirli güven listelerine dayanır; izinli bir *Besu/QBFT* defteri ancak en az iki bağımsız operatör katıldığında eklenir. Listelere, günlüklere ya da deftere hiçbir kişisel veri — özeti bile — yazılmaz. Akışın tamamı gerçek kriptografiyle bugün uçtan uca çalışıyor; bu belge neyin çalıştığını, neyin planlı olduğunu ve neyin hâlâ araştırma olduğunu söyler.

  ],
)

= Sorun: “belge kopyası” çağının sonu

Onlarca yıl kim olduğumuzu kopya teslim ederek kanıtladık. Kopyalar sunucularda birikir ve kontrolden çıkar; her banka, işveren ve üniversite aynı doğrulamayı yeniden kurar; belgenin gerçekliği ise kopyanın ikna ediciliğine kalır.

Yeni model bunu tersine çevirir: belge kişide kalır, yalnızca gerekli kanıt paylaşılır ve doğrulama kaynağa sormadan kriptografik olarak yapılır. Bkz. #link("https://tamga.network/tr/learn/paper-to-digital")[neden yeni bir model].

= Vizyon: eIDAS 2.0’dan Türk dünyasına

*eIDAS 2.0* ile her AB üye devleti vatandaşına bir *Avrupa Dijital Kimlik Cüzdanı* sunmak zorundadır. Bu cüzdanın mimarisi (ARF) ve profilleri dijital güvenin fiilî standardı hâline geliyor.

Türk dünyası dili, kültürü ve tarihi paylaşır. Bir devlette verilen diploma bir diğerinde doğrulanabilmeli; bir kurumun kimliğine sınır ötesinde güvenilebilmelidir. Tamga bu ortak zemini aynı standartlar üzerinde, her devleti egemen tutan bir yönetişimle kurar.

Tamga, her biri tek başına ayakta durabilen üç katmanda kuruludur. Taban: belgeler, protokoller ve güven listeleri AB standartlarındadır; böylece uyumlu cüzdanlar ve doğrulayıcılar Tamga’daki kurumlarla çalışabilir. Onun üstünde *Tamga Network*, her devletin güven listesini toplayan ve devletlerin birbirini tanımasını sağlayan hafif bir federasyondur — bugün Türkiye listesini Tamga geçici olarak yayınlar; bir devlet kendi listesini yayınladığında ağ onu gösterir. Bu zeminde ağın ilk cüzdanı olan, ayrı bir ürün olarak gelişen *Tamga Wallet* (AB uyumludur; “EUDI Wallet” bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlara ayrılmış bir unvandır) ve ağın kurallarına uyan hizmet sağlayıcılar çalışır; bunlar ağın parçası değil, katılımcılarıdır. Ağ bir şey satmaz: kuralları, güven listelerini, açık kodu ve Kurum Konsolu, Tamga Verify gibi referans hizmetleri işletir; ticari hizmetleri ağın dışındaki şirketler sunar.

= İlkeler

- *Önce egemenlik* — her devlet kendi kaydının tek yazarıdır; ağ üyeliği 2/3 oyla; sınır ötesi tanıma tek taraflı belirlenir.
- *Hiçbir ortak kayıtta kişisel veri yok* — listede, günlükte ya da defterde yok; özeti bile yok.
- *Uyumlu ama bağımsız* — AB’nin teknik katmanı olduğu gibi; yönetişim katmanı Türk dünyası için yazılır.
- *Birden çok devlet için* — hiçbir tanımlayıcı ya da rol Tamga’yı tek operatör varsaymaz; Tamga her yerde geçici vekildir.
- *Defter bir depolama değil, imzacı seçimidir* — bugün listeler; bağımsız operatörler katılınca defter.
- *İstisnasız cihaz bağı* — her belge kopyası cihazdaki bir anahtara bağlıdır; kopya yeniden oynatılamaz.
- *Devredilmek üzere tasarım* — her geçici yetkinin ölçülebilir bir devir noktası vardır.

= Roller

AB mimarisinin her rolü Tamga’da vardır. Bir devlet henüz katılmadıysa rolü Tamga geçici ve kayıtlı olarak üstlenir: güven listesi operatörü, kayıt otoritesi ve “TR National Root CA (geçici operatör: Tamga)”. Kurumlar belge sağlayıcılarıdır; işverenler, web siteleri ve kapılar kayıtlı doğrulayıcılardır. PID sağlayıcısı yeri bir devlet doldurana kadar boştur; bu arada kimlik belgesi Tamga kimlik servisinden gelir (belge ve canlılık kontrolü). Ağ cüzdanları seçmez, tanır: yayınlanmış kurallara uyan ve uyum testlerini geçen her cüzdan sağlayıcısı listeye girebilir; ilki Tamga Wallet’tır. Her cüzdan kendi cüzdan sağlayıcısını işletir; ağ hiçbirini işletmez. Henüz validator operatörü yoktur — bu yüzden defter de yoktur. Yan yana: #link("https://tamga.network/tr/learn/roles")[roller ve terimler].

#chapter()
= Güven modeli: imzalı güven listeleri

İmza kimin imzaladığını kanıtlar; *güven listesi* ise imzalayanın gerçek bir kurum olup olmadığını, hangi belge tiplerini ne zamandan beri verebileceğini ve güncel durumunu söyler. Listeler imzalı JWS dosyalarıdır, *sürümlü ve hash-zincirlidir*, silinmez ve bir sonraki güncelleme tarihi taşır; doğrulayıcı imzalayanı bant dışında yayınlanmış bir kök parmak iziyle karşılaştırır. Her iptal listesi yayını ve şema değişikliği ayrıca en az saatte bir herkese açık bir *çapa günlüğüne* yazılır; böylece geri sarılmış bir liste fark edilir. Ayrıntı: #link("https://tamga.network/tr/learn/trust-lists")[güven listeleri].

#kvtable("Yayınlanan dosyalar — trust.tamga.network", (("lotl.jws", "listelerin listesi — ulusal listeler, dış listeler, şemalar, cüzdan sağlayıcıları, kabul edilen ZK devreleri"), ("tl-tr.jws", "Türkiye — kök sertifika otoriteleri, belge verenler (+ yetkiler), doğrulayıcılar"), ("tl-az · kz · kg · uz", "diğer üye devletler için ayrılmış yerler"), ("anchors.jsonl", "çapa günlüğü — her olay için imzalı bir satır, en az saatte bir"), ("keys/", "kök parmak izleri (bant dışı güven çapası)"), ("archive/", "geçmiş her sürüm, hiç silinmez"),), mono: false)

Tanımlayıcılar atanmaz, türetilir; devirde ya da defter geldiğinde değişmez:

#kvtable("Tanımlayıcılar", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifika))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(kurum sertifikası))"), ("vct", "urn:tamga:<alan>:<Tür>:<ana sürüm> — örn. urn:tamga:edu:DiplomaCredential:1"), ("schema_id", "keccak256(vct)"), ("kişi", "tanımlayıcı yok — her belge kopyası için bir cihaz anahtarı"),), mono: true)

*Federasyon.* Listelerin listesi, başka bir işletmecinin — bir devletin, onun yetkilendirdiği bir kurumun ya da AB’nin — yayınladığı bir listeyi de gösterebilir: adresini, Tamga’nın imzalı listeler listesinde sabitlenmiş imzacısını ve hangi rollere ve belge türlerine kefil olabileceğini söyleyen kapsamını. Liste sahibinde kalır; bir devlet kendi listesini yayınladığında cüzdan ve doğrulayıcı için yalnızca adres ve imzacı değişir. İlk okunan biçim ETSI TS 119 602’dir; böylece doğrulayıcı AB kimlik belgesini (PID) ve mobil ehliyeti (mDL) de tanıyabilir. Bugün listeler listesinde dış liste yoktur; her biri kayda geçen bir onayla eklenir. Bkz. #link("https://tamga.network/tr/learn/federation")[federasyon].

= Belgeler: SD-JWT VC ve mdoc

Ana biçim *SD-JWT VC*’dir (IETF, #raw("dc+sd-jwt"), ES256). Her alan bir salted hash'in arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır; başlık kurumun X.509 zincirini taşır; #raw("cnf") kopyayı bir cihaz anahtarına bağlar. Kimlik belgesi ayrıca *ISO 18013-5 mdoc* olarak verilir; böylece yaş kontrolü #raw("age_over_18") alanını alır ve başka hiçbir şey almaz. Belge tipleri sabit URN’lerdir; tanımları herkese açık bir katalogda durur ve her belge kendi tanımının özetini taşır. Bkz. #link("https://tamga.network/tr/learn/verifiable-credentials")[belgeler].

#codeblock("SD-JWT VC biçiminde bir diploma (çözülmüş, kısaltılmış)", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-…\",
  \"iat\": 1790000000,
  \"cnf\": { \"jwk\": { … } },
  \"status\": { \"status_list\": {
    \"idx\": 48213,
    \"uri\": \"https://status.tamga.network/…\" } },
  \"_sd\": [ \"…\", \"…\" ]
}")

#kvtable("", (("cnf.jwk", "bu kopyanın cihaz anahtarı"), ("_sd", "gizli alanlar, salted hash olarak"), ("başlık · x5c", "kurumun X.509 sertifika zinciri"),), mono: false)

Ulusal kimlik numarası yalnızca kimlik belgesinde bulunur; hiçbir diploma, kart ya da bilet onu taşımaz.

= Belge verme ve sunma

- *Verme (OpenID4VCI).* Kurum bir QR kodu ve aynı ekranda bir PIN gösterir — PIN bağlantının içinde asla gitmez. Ya da cüzdan kurum dizininden başlar ve önce kişinin kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı *on kopya* alır.
- *Yalnızca gerçek cüzdanlar.* Kurumlar cüzdan sağlayıcısından kısa ömürlü bir *cüzdan onayı* (WUA) ister.
- *Sunum (OpenID4VP, DCQL).* Doğrulayıcının isteği kayıtlı sertifikasıyla imzalıdır. Cüzdan onu güven listesine karşı denetler, tam olarak neyin istendiğini gösterir ve kayıtlı kapsamın dışındaki her şey için uyarır. Doğrulayıcı seçenek sunuyorsa (#raw("credential_sets"), #raw("claim_sets")) cüzdan bunları seçenek olarak gösterir; istenen bir alanı taşımayan belge asla gönderilmez ve cüzdan isteğin neden karşılanamadığını kişiye söyler. Cevap şifrelidir; yalnızca onaylanan alanları ve anahtarın bu telefonda olduğunun kanıtını taşır.
- *Web siteleri.* Site kişiyi bir kez cüzdanla, o siteye özel bir takma adla kaydeder: cüzdan her site için ayrı ve sabit bir takma ad türetir; iki site kişiyi eşleştiremez, yeni telefonda kimlik yeniden doğrulanınca aynı takma adlar geri gelir. Günlük giriş ardından bir *passkey* ile olur ve hiçbir alan paylaşılmaz. Bkz. #link("https://tamga.network/tr/learn/unlinkability")[Tamga ile giriş yap].

= Doğrulama: beş katman, üç sonuç

Her doğrulama aynı hattı aynı sırayla çalıştırır ve ilk hatada durur. Her adımın kalıcı bir kodu vardır; bu yüzden bir red her zaman nedenini söyler.

#kvtable("Doğrulama hattı", (("T0", "istek ve cevap birbirine ait (nonce, hedef, şifreleme)"), ("A · biçim", "imza, sertifika zinciri, cihaz kanıtı, gizli alanlar bozulmamış"), ("B · tür", "belge türü kayıtlı; tanımın özeti katalogla aynı"), ("C · güven", "kurum bu tür için veriliş tarihinde yetkili; kategori uyuşuyor"), ("D · durum", "iptal edilmemiş ya da askıda değil; liste güncel ve çapalı"), ("E · politika", "istenen alanlar var; doğrulayıcının kapsamı dışında bir şey yok"), ("→ sonuç", "ACCEPTED (kabul) · REJECTED (red, hangi adımda) · INDETERMINATE (denetlenemedi)"),), mono: false)

*INDETERMINATE* (belirsiz) asla REJECTED (red) olarak bildirilmez. Bir listeye ulaşılamazsa ya da liste güncel değilse doğrulayıcı “şu an denetlenemedi” der — “bu diploma sahte” ile “denetleyemiyorum” arasındaki fark birinin işe alınıp alınmamasıdır. Yetki *veriliş tarihine* göre değerlendirilir: üniversite etkinken verilmiş diploma askıdan sonra da geçerli kalır, yeni belge verme ise hemen durur.

= İptal ve yaşam döngüsü

İptal *IETF Token Status List* ile yapılır: her belge kopyası için *rastgele* bir konumda iki bit — geçerli, iptal ya da askıda. Kurum listeyi *sabit aralıkla* yayınlar, asla istek üzerine değil; böylece zamanlama kişi hakkında hiçbir şey ele vermez; her yayın çapalanır. Doğrulayıcılar listeleri önceden çeker; bir belgeyi denetlemek ne kuruma ne telefona çağrı yapar. Bir iptal en geç yaklaşık 90 dakikada her doğrulayıcıya ulaşır. Kopyalar tasarım gereği tükenir; yenileme belirteciyle verilen belgelerde cüzdan, kurumun ilan ettiği eşikte yeni kopyaları arka planda kendiliğinden alır ve yenileme yeni bir bilgi paylaşmaz. Kimlik belgesi sunularak yenilenen belgeler ise kişinin onayı ve PIN'iyle yenilenir. Bkz. #link("https://tamga.network/tr/learn/revocation")[iptal].

#chapter()
= Tasarımdan gelen mahremiyet

- *Doğrulayıcı başına kopya.* Her doğrulayıcı farklı bir anahtara bağlı farklı bir kopya alır; doğrulayıcılar aldıklarını karşılaştırarak kişiyi eşleştiremez.
- Varsayılan olarak *seçici paylaşım*; biçim izin verdiğinde #raw("age_over_18") gibi yüklemler.
- *Kimlik kontrolü yalıtılmıştır.* Kimlik doğrulama sağlayıcısıyla yalnızca kimlik servisi konuşur; belgeyi verdikten sonra fotoğraf tutmaz, yalnızca opak ve özetlenmiş bir kayıt (kişi referansı ve belge numarası özeti) tutar. Kurumlar kişiyi sağlayıcı üzerinden değil, kimlik belgesi üzerinden eşleştirir.
- *Günlüklerde ve herkese açık adreslerde kişisel veri yok.* İptal listesi adresleri kurumu açığa vurmaz; günlükler ne olduğunu yazar, kimin başına geldiğini asla yazmaz.
- *Web siteleri* hesap anahtarı olarak siteye özel bir takma ad alır; kimlik belgesi numarası da, özeti de gitmez; siteler kişiyi eşleştiremez.

#notebox[Açıkça söylenen artık risk: aynı kurum birden çok doğrulayıcıyla işbirliği yaparsa kişiyi hâlâ eşleştirebilir. Sıfır bilgi ispatıyla sunum bunu kapatır; cüzdan tarafında mağaza sürümünden sonra gelir (bkz. aşağıda sıfır bilgi ispatı).]

= Yakın alan: geçiş kartları ve yaş kontrolü

Turnike ve etkinlik kapıları için Tamga bir *geçiş kartı* kullanır: standart bir sunumla bir kez kayıt, ardından QR olarak gösterilen 60 saniyelik imzalı bir jeton — jetonda kişisel veri yoktur, tekrar kullanım reddedilir ve biletler tek kullanımlık olabilir. Kişiden kişiye kontrolde OpenID4VP tersine başlatılır: kontrol edenin uygulaması standart bir istek başlatır. İkisi de sürümlü köprülerdir; hedef NFC/BLE üzerinden ISO 18013-5’tir.

#chapter()
= Listelerden deftere

Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Bu yüzden Tamga listelerle başlar ve *QBFT* uzlaşılı (consensus) izinli bir *Hyperledger Besu* ağını ancak en az iki bağımsız validator operatörü yazılı kabul verdiğinde ekler. Her liste alanı bir kontrat kaydına eşlenir; liste geçmişi kontratlara yeniden oynatılır ve ikisinin aynı cevabı verdiği test edilir. Bileşenler güveni tek bir arayüz üzerinden okur; belgeler, cüzdanlar ve doğrulama hattı değişmez. Bkz. #link("https://tamga.network/tr/learn/what-is-blockchain")[blockchain nedir — ve ne değildir].

Defterdeki yönetişim ilkeleri izler: validator’lar eşit oylu devletlerdir; yeni üyeler 2/3 oyla; her devlet kendi kurumlarını yalnız başına kaydeder ya da askıya alır; yabancı kurumların tanınmasına her devlet kendisi karar verir.

= Sıfır bilgi ispatı ve araştırma yönleri

*Sıfır bilgi ispatıyla sunum (karara bağlandı).* Cüzdan, kurumun imzaladığı ve hiç değişmeyen bir mdoc hakkında “18 yaşından büyüğüm” gibi bir olguyu açık kaynak Longfellow ZK sistemiyle kanıtlar — Avrupa’nın yaş doğrulama çalışmaları da bu sistem üzerine kurulu. Doğrulayıcı yalnızca cümlenin doğru olduğunu ve belgeyi hangi kurumun verdiğini görür; iki gösterim birbirine bağlanamaz. Yalnızca incelenmiş ve kimliği imzalı güven listesinde yayımlanmış ispat devreleri kabul edilir. Doğrulayıcı tarafı hazır; telefonda ispat üretimi mağaza sürümünden sonra gelir; ispat yapılamadığında olağan sunum sürer. Bkz. #link("https://tamga.network/tr/learn/zero-knowledge-proofs")[sıfır bilgi ispatı].

*Araştırma yönü: değer katmanı.* Doğrulanmış taraflar arasında yetkilendirme; para hareketi düzenlenmiş ödeme sistemlerinde kalır. İlk sürümün ya da pilotun parçası değildir; herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir.

#chapter()
= Durum ve yol haritası

*Bugün çalışan (ilk sürüm, gerçek kriptografi):* diploma ve öğrenci belgesi verme ve sunma; iptal ve kurum askısı; kimlik kontrolü ve kimlik belgesi, mdoc olarak da; kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; siteye özel takma adla web sitesine kayıt ve passkey ile giriş; doğrulayıcı tarafında sıfır bilgi ispatıyla yaş kontrolü; dokuz açık kaynak paket. Telefonda test edildi.

#kvtable("Aşamalar", (("Liste aşaması (bugün)", "imzalı güven listeleri + çapa günlüğü · Tamga = geçici operatör"), ("Pilot", "ilk belge veren kurum bir üniversite · kurum anahtarı üniversitede · listeler, defter yok"), ("Faz 0", "en az 2 bağımsız validator operatörü imzalayınca izinli Besu/QBFT defteri"), ("Faz 1", "üye devlet listeleri · yakın alan (NFC/BLE) · Digital Credentials API"),), mono: false)

İlk sürümün bilinen sınırları kayıt altındadır ve pilottan önce kapanır. Pilotun başarı ve durdurma ölçütleri önceden tanımlıdır.

Gerçek ağdan tamamen ayrı bir test ağı, *sandbox.tamga.network*, yayında: kendi test kökü ve listeleri, örnek kurumlar, sahte kişiler ve her türden örnek belgeler, hızlı denemenin yanında isteğe bağlı gerçek kimlik doğrulama (günlük ve aylık tavanlı) ve test kurumu hesapları. Gerçek ağdaki hiçbir cüzdan ya da doğrulayıcı ona güvenmez. Cüzdan, kurum ve doğrulayıcı geliştiricilerinin hepsi orada dener: cüzdan geliştiricisi kendi cüzdan sağlayıcısını sandbox listesine kaydettirir ve cüzdanını örnek kurumlarla, kimlik servisiyle ve doğrulayıcıyla dener. Bkz. #link("https://docs.tamga.network/tr/guides/sandbox")[sandbox rehberi].

= Bilinen sınırlar

- Bu aşamada güven çapası tek operatörün imzasına dayanır. Herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır; imkânsız kılamaz.
- Bir iptal en geç yaklaşık 90 dakikada etkili olur.
- Sıfır bilgi ispatıyla sunum cüzdana gelene kadar kurum eşleştirmesi riski kalır.
- Kimlik servisi teorik olarak bir kişinin belirli bir sitedeki takma adını hesaplayabilir; anahtar koruması ve denetim bunu sınırlar, sıfır bilgi ispatı ileride kaldırır.
- Ağdaki cüzdanlar (ilki Tamga Wallet) uygulama mağazalarında yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez; bir cüzdanın mağaza sürümüyle App Attest / Play Integrity zorunlu olur.

= Kurallar, açık kaynak ve ayrıntılı okuma

Ağın kuralları *Tamga ARF 1.0* olarak yayınlanır: ana belge, Trust Framework, *Tamga Rulebook* ve ondan her belge türü için dallanan rulebook’lar — Education, Identity ve Event Ticket — #link("https://arf.tamga.network/tr/")[arf.tamga.network] adresindedir. Ayrıca bkz. #link("https://tamga.network/tr/learn/rules-and-rulebooks")[kurallar ve rulebook’lar].

Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. #raw("@tamga-network/*") paketleri güven listelerini, belge biçimlerini, belge vermeyi, doğrulamayı ve cüzdan çekirdeğini kapsar; entegrasyon kılavuzları ve spesifikasyonlar #link("https://docs.tamga.network/tr/")[geliştirici belgelerindedir]. Kavramlar #link("https://tamga.network/tr/learn")[Öğren] bölümünde sıfırdan anlatılır; #link("https://docs.tamga.network/tr/glossary")[sözlük] hızlı başvuru, #link("https://tamga.network/tr/manifesto")[manifesto] ise “neden”dir.

#notebox[Bu yaşayan bir belgedir (v1.0). Kararlar olgunlaştıkça değişir; kalıcı olan güven modelidir.]

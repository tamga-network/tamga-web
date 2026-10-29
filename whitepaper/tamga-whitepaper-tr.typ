// Tamga Network — Whitepaper v1.0 (tr). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-tr.typ ../public/whitepaper-tr.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "tr",
  title: [Türkiye ve Türk Dünyası için \ Dijital Güven Altyapısı],
  subtitle: [AB’nin EUDI profilleri üzerinde egemen bir referans mimari. Kurumlar X.509 sertifikası taşır, güven bugün imzalı listelere dayanır, bağımsız operatörler katılınca izinli bir defter eklenir.],
  labels: (abstract: "Yönetici özeti", contents: "İçindekiler", version: "WHITEPAPER · SÜRÜM 1.0"),
  date: "2026-10-29",
  edition: "Gözden geçirilmiş baskı · ilk baskı 2026-10-03",
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network bir dijital güven altyapısıdır. Kurum, diploma, öğrenci belgesi, kimlik belgesi ya da bilet gibi bir belgeyi doğrudan kişinin telefonuna verir. Kişi yalnızca doğrulayıcının istediği alanları paylaşır, doğrulayıcı da kurumu aramadan belgeyi saniyeler içinde denetler.

    Teknik katman Avrupa Birliği’nin katmanıdır ve olduğu gibi kullanılır: SD-JWT VC ve ISO 18013-5 mdoc belgeleri, OpenID4VCI ve OpenID4VP, kurumlar için X.509 sertifikaları ve ETSI modelinde imzalı güven listeleri. Tamga bunun üstüne Türk dünyası için yazılmış bir yönetişim katmanı ekler. Her listede, tanımlayıcıda ve rolde her üye devlet için bir yer vardır; Tamga operatör rolünü yalnızca geçici olarak, devletler adına ve bir devlet devralana kadar üstlenir.

    Güven bugün herkese açık bir çapa günlüğüyle birlikte sürümlü ve hash zincirli güven listelerine dayanır. İzinli bir Besu/QBFT defterinin kodu yazıldı ve test edildi, ama defter yalnızca imzalı listeleri yansıtır ve en az iki bağımsız operatör onu birlikte işletmeye başlayana kadar kapalı kalır. Listelere, günlüklere ya da deftere hiçbir kişisel veri yazılmaz, özeti bile yazılmaz. Servisler gerçek kriptografiyle uçtan uca çalışıyor, açık paketler npm’de deneme sürümü olarak yayında ve belge veren ile doğrulayıcı Ekim 2026’da OpenID Foundation’ın uyum test planlarını öz-test olarak çalıştırıp başarısız modül kalmadan tamamladı; doğrulayıcı o günden beri değişti ve planı yeniden çalıştırılacak. Bu belge neyin çalıştığını, neyin planlandığını ve neyin hâlâ araştırma olduğunu söyler.

  ],
)

= Sorun: belge kopyası çağının sonu

Onlarca yıl kim olduğumuzu kopya teslim ederek kanıtladık. Diplomanın kopyası işverene, kimlik kartının kopyası bankaya gider ve her kopya, sahibinin bir daha hiç görmediği bir sunucuda yaşamaya başlar. Her banka, işveren ve üniversite aynı doğrulamayı yeniden kurar; belgenin gerçek olup olmadığı da kopyanın ne kadar ikna edici göründüğüne kalır.

Yeni model bunu tersine çevirir. Belge kişide kalır, yalnızca gereken kanıt paylaşılır ve doğrulayıcı kaynağa sormak yerine kriptografik imzayı denetler. Bu belgenin geri kalanı Tamga’nın bu modeli Türkiye ve Türk dünyası için nasıl kurduğunu anlatır; arka plan #link("https://tamga.network/tr/learn/paper-to-digital")[neden yeni bir model] sayfasında.

= Vizyon: eIDAS 2.0’dan Türk dünyasına

eIDAS 2.0 ile her AB üye devleti vatandaşına bir Avrupa Dijital Kimlik Cüzdanı sunmak zorunda. Arkasındaki mimari (ARF) ve sabitlediği profiller AB’nin çok ötesinde dijital güvenin ortak dili hâline geliyor, çünkü bu profiller üzerine kurulan cüzdanlar, belge verenler ve doğrulayıcılar birbiriyle konuşabiliyor.

Türk dünyası ortak bir dil ailesini, kültürü ve uzun bir tarihi paylaşır. Bir devlette verilen diploma bir diğerinde doğrulanabilmeli, bir kurumun kimliğine sınırın öte yanında da güvenilebilmeli. Tamga bu ortak zemini aynı standartlar üzerinde kurar ve her devleti kendi kaydının egemeni bırakan bir yönetişim katmanı ekler.

Tamga her biri tek başına ayakta duran üç katmanda kuruludur. Tabanda belgeler, protokoller ve güven listeleri AB standartlarına uyar; bu yüzden başka yerden gelen uyumlu bir cüzdan ya da doğrulayıcı bir Tamga kurumuyla çalışabilir. Onun üstünde Tamga Network hafif bir federasyondur: her devletin güven listesini toplar ve devletlerin birbirini tanımasını sağlar. Bugün Türkiye listesini Tamga geçici olarak yayınlıyor; bir devlet kendi listesini yayınladığında ağ onu gösterir. Ağın üstünde de kurallarına uyan cüzdanlar ve hizmetler çalışır. Ağ kendi cüzdanını işletmez. Cüzdan sağlayıcılarını güven listesinde listeler ve yayınlanmış kurallara uyan her sağlayıcı listeye girebilir. Listeye giren ilk cüzdan Tamga Wallet’tır; kendi sağlayıcı servisi olan ayrı bir üründür ve kaydı 14 Ekim 2026’dan beri listede etkindir. Tamga Wallet AB uyumludur; “EUDI Wallet” unvanı ise bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlara ayrılmıştır. Ağ bir şey satmaz. Kuralları, güven listelerini, açık kodu ve Kurum Konsolu ile Tamga Verify gibi referans hizmetleri işletir; ticari hizmetleri ağın dışındaki şirketler sunar.

= İlkeler

- *Önce egemenlik.* Her devlet kendi kaydının tek yazarıdır; ağ üyeliğine üçte iki oyla karar verilir; sınır ötesi tanıma her devletin tek taraflı kararıdır.
- *Hiçbir ortak kayıtta kişisel veri yok.* Listeler, günlükler ve defter kişisel veri taşımaz, özetini bile taşımaz.
- *Uyumlu ama bağımsız.* AB’nin teknik katmanı olduğu gibi kullanılır; yönetişim katmanı Türk dünyası için yazılır.
- *Birden çok devlet için.* Hiçbir tanımlayıcı, rol ya da veri yapısı Tamga’yı tek operatör varsaymaz. Tamga her yerde kayıtlı bir geçici vekildir.
- *Defter bir depolama seçimi değil, imzacı seçimidir.* Bugün imzalı listeler; bağımsız operatörler birlikte imzalayınca defter.
- *İstisnasız cihaz bağı.* Her belge kopyası kişinin cihazındaki bir anahtara bağlıdır; bu yüzden kopya yeniden oynatılamaz.
- *Devredilmek üzere tasarım.* Her geçici yetkinin ölçülebilir bir devir noktası vardır; ağın işletmesinin bir vakfa devri şimdiden yazılı ve provası yapılmış durumda.

= Roller

AB mimarisinin her rolü Tamga’da vardır. Bir devlet henüz katılmadıysa rolü Tamga geçici ve kayıtlı olarak üstlenir: güven listesi operatörü, kayıt otoritesi ve “TR National Root CA (geçici operatör: Tamga)”. Kurumlar belge sağlayıcılarıdır. İşverenler, web siteleri ve kapılar kayıtlı doğrulayıcılardır; her birinin kuruluşu ve bir destek adresini gösteren bir erişim sertifikası vardır ve bu sertifika ETSI TS 119 411-8 profiline uyar. PID sağlayıcısının yeri bir devlet doldurana kadar boş kalır. O güne kadar kimlik belgesi, kişinin kimlik belgesini ve canlılığını doğrulayan Tamga kimlik servisinden gelir; bu belge bir devlet PID’i sayılmaz, bir onaylama belgesidir ve devletin PID’i geldiğinde onun yerini alır. Ağ cüzdan seçmez, cüzdanları listeler. Her cüzdan kendi cüzdan sağlayıcısını işletir; sağlayıcı cüzdan birimlerini kaydeder ve cüzdan ile anahtar kanıtlarını verir. Ağ hiçbirini işletmez. Bugün Türkiye listesinde tek etkin belge veren geçici kimlik servisidir; demolarda kullanılan test kurumları iptal edildi, ilk gerçek kurum hazırlanıyor. Henüz validator operatörü yok, bu yüzden defter de yok. Yan yana tablo #link("https://tamga.network/tr/learn/roles")[roller ve terimler] sayfasında.

#chapter()
= Güven modeli: imzalı güven listeleri

İmza kimin imzaladığını kanıtlar. Güven listesi ise imzalayanın gerçek bir kurum olup olmadığını, hangi belge türlerini ne zamandan beri verebildiğini ve güncel durumunu söyler. Tamga’nın listeleri imzalı JWS dosyalarıdır; sürümlü ve hash zincirlidir, yani her sürüm bir öncekini gösterir. Hiçbir sürüm silinmez ve her biri bir sonraki güncelleme tarihini taşır. Doğrulayıcı listenin imzacısını bant dışında yayınlanmış bir kök parmak iziyle karşılaştırır. Her liste sürümü, her iptal listesi yayını ve her şema değişikliği ayrıca en az saatte bir herkese açık bir çapa günlüğüne yazılır; böylece geri sarılmış bir liste fark edilir. Ayrıntı #link("https://tamga.network/tr/learn/trust-lists")[güven listeleri] sayfasında.

#kvtable("Yayınlanan dosyalar — trust.tamga.network", (("lotl.jws", "listelerin listesi: ulusal listeler, dış listeler, şemalar, cüzdan sağlayıcıları, kabul edilen ZK devreleri"), ("tl-tr.jws", "Türkiye: kök sertifika otoriteleri, yetkileriyle birlikte belge verenler, doğrulayıcılar, cüzdan sağlayıcıları"), ("tl-<cc>.jws", "öteki her üye devlet (AZ, KZ, KG, UZ) ve gözlemciler (HU, TM) için ayrılmış yer; bugün yalnız TR etkin"), ("anchors.jsonl", "çapa günlüğü: her olay için imzalı bir satır, en az saatte bir"), ("keys/", "kök parmak izleri (bant dışı güven çapası)"), ("archive/", "geçmiş her sürüm, hiç silinmez"),), mono: false)

Tanımlayıcılar elle atanmaz, sertifikalardan ve tür adlarından türetilir; bu yüzden devirde de defter geldiğinde de değişmez:

#kvtable("Tanımlayıcılar", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifika))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(kurum sertifikası))"), ("vct", "urn:tamga:<alan>:<Tür>:<ana sürüm>, örn. urn:tamga:edu:DiplomaCredential:1 (ağ türü)"), ("vct (ulusal)", "urn:tamga:<cc>:<alan>:<Tür>:<ana sürüm>; bir devletin kendi ad alanında kaydettiği tür"), ("schema_id", "keccak256(vct)"), ("kişi", "tanımlayıcı yok; her belge kopyası için bir cihaz anahtarı"),), mono: true)

*Federasyon.* Listelerin listesi başka bir işletmecinin yayınladığı bir listeyi de gösterebilir: bir devletin, onun yetkilendirdiği bir kurumun ya da AB’nin listesini. Her biri için adresi, Tamga’nın kendi imzalı listeler listesinde sabitlenmiş imzacısını ve hangi rollere ve belge türlerine kefil olabileceğini söyleyen kapsamını kaydeder. Liste sahibinde kalır. Bir devlet kendi listesini yayınladığında cüzdan ve doğrulayıcı için yalnızca adres ve imzacı değişir. İlk okunan dış biçim ETSI TS 119 602’dir; böylece bir Tamga doğrulayıcısı AB kimlik belgesini (PID) ve mobil ehliyeti (mDL) de tanıyabilir. Bugün listeler listesinde dış liste yoktur; her biri kayda geçen bir onayla eklenir. Sandbox, Türkiye listesini imzalı ve imzalı listeyle aynı sürümde bir ETSI TS 119 612 XML görünümü olarak da yayımlıyor; gerçek ağın XML listesi, listeyi işletecek vakıf kurulunca gelecek. Bkz. #link("https://tamga.network/tr/learn/federation")[federasyon].

= Belgeler: SD-JWT VC ve mdoc

Ana biçim SD-JWT VC’dir (IETF, #raw("dc+sd-jwt"), ES256). Her alan bir salted hash’in arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır. Başlık kurumun X.509 zincirini taşır, #raw("cnf") alanı kopyayı cihazdaki bir anahtara bağlar. Kimlik belgesi aynı sahip anahtarıyla ISO 18013-5 mdoc olarak da verilir; böylece yalnızca mdoc anlayan bir tarayıcı ya da yaş kapısı da onu kullanabilir. İki biçim de #raw("age_over_15") ve #raw("age_over_18") yaş alanlarını taşır; bu alanlar veriliş anında doğum tarihinden türetilir ve birini isteyen doğrulayıcı yalnızca evet ya da hayır alır. Yaş eşikleri kümesi kapalıdır ve yalnızca kayıtlı bir kararla değişir. Belge türleri sabit URN’lerdir. Tanımları herkese açık bir katalogda durur ve her belge kendi tanımının özetini taşır; böylece cüzdan tanımın değiştiğini anlar. Bir üye devletin kaydettiği ulusal tür kendi ad alanını kullanır (#raw("urn:tamga:<cc>:…")), bu yüzden bir ulusal ad ağ geneli bir adla asla çakışmaz. Bkz. #link("https://tamga.network/tr/learn/verifiable-credentials")[belgeler].

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

Ulusal kimlik numarası yalnızca kimlik belgesinde ve yalnızca seçici açıklanan bir alan olarak bulunur. Hiçbir diploma, kart ya da bilet onu taşımaz.

= Belge verme ve sunma

- *Verme (OpenID4VCI).* Kurum aynı ekranda bir QR kodu ve bir PIN gösterir; PIN bağlantının içinde asla gitmez. Ya da cüzdan kurum dizininden başlar ve kimlik belgesini sunarak önce kişinin kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı on kopya alır. Bir erişim belirteci beş dakikalık ömrü içinde birden çok belge isteğinde kullanılabilir, ama yalnızca kapsadığı belge yapılandırmaları için, toplam on kopyayla ve her zaman aynı DPoP anahtarıyla.
- *Yalnızca gerçek cüzdanlar.* Kurum belgeyi vermeden önce cüzdan sağlayıcısının verdiği kısa ömürlü bir cüzdan örneği kanıtı ile bir anahtar kanıtı denetler. İkisi de güven listesindeki bir sağlayıcıdan gelir, kendi iptal kaydını taşır ve anahtarın nasıl saklandığını söyler.
- *Sunum (OpenID4VP, DCQL).* Doğrulayıcının isteği kayıtlı sertifikasıyla imzalıdır ve kayıt sertifikasını taşır. Cüzdan ikisini de güven listesine karşı denetler, tam olarak neyin istendiğini gösterir ve kayıtlı kapsamın dışındaki her şey için uyarır. Doğrulayıcı seçenek sunuyorsa (#raw("credential_sets"), #raw("claim_sets")) cüzdan bunları seçenek olarak gösterir. İstenen bir alanı taşımayan belge asla gönderilmez; cüzdan isteğin neden karşılanamadığını kişiye söyler. Cevap şifrelidir ve yalnızca onaylanan alanları ile anahtarın bu telefonda olduğunun kanıtını taşır. İsteğin her çekimi yeni değerlerle kendi istek nesnesini alır ve bir ret yalnız onu kapatır; böylece QR kodu gören biri sahte bir retle kişinin sunumunu iptal edemez. Kayıt sertifikası kendi politikasını adlandırır ve bir durum listesine işaret eder; cüzdan iptal edilmiş sertifikayı reddeder, durum denetlenemiyorsa kişiyi uyarır.
- *Tarayıcıdan.* Bir web sitesi belgeyi QR kodu yerine tarayıcının Digital Credentials API’siyle de isteyebilir. Referans doğrulayıcı bunu sunar, cüzdan çekirdeği de ISO/IEC 18013-7 Ek C’deki mdoc isteğini yanıtlar. Tamga Wallet’ta Android modülü yazıldı ama henüz cihazda denenmedi; iOS sürümü henüz yok.
- *Web siteleri.* Site kişiyi cüzdanla bir kez, yalnızca o siteye ait bir takma adla kaydeder. Cüzdan takma adı sitenin kayıtlı alan adından türetir; bu yüzden iki site kişiyi eşleştiremez, yenilenen sertifika takma adı değiştirmez ve yeni telefonda kimlik doğrulanınca aynı takma adlar geri gelir. Günlük giriş ardından bir passkey ile yapılır ve hiçbir alan paylaşılmaz. Bkz. #link("https://tamga.network/tr/learn/unlinkability")[Tamga ile giriş yap].

= Doğrulama: beş adım, üç sonuç

Her doğrulama aynı hattı aynı sırayla çalıştırır ve ilk hatada durur. Her adımın kalıcı bir kodu vardır; bu yüzden bir red her zaman nedenini söyler.

#kvtable("Doğrulama hattı", (("T0", "istek ve cevap birbirine ait (nonce, hedef, şifreleme)"), ("A · biçim", "imza, sertifika zinciri, cihaz kanıtı, gizli alanlar bozulmamış"), ("B · tür", "belge türü kayıtlı; tanımın özeti katalogla aynı"), ("C · güven", "kurum bu tür için veriliş tarihinde yetkili; kategori uyuşuyor"), ("D · durum", "iptal edilmemiş ya da askıda değil; liste güncel ve çapalı"), ("E · politika", "istenen alanlar var; doğrulayıcının kapsamı dışında bir şey yok"), ("→ sonuç", "ACCEPTED (kabul) · REJECTED (red, hangi adımda) · INDETERMINATE (denetlenemedi)"),), mono: false)

INDETERMINATE (belirsiz) asla REJECTED (red) olarak bildirilmez. Bir listeye ulaşılamıyorsa ya da liste güncel değilse doğrulayıcı şu an denetleyemediğini söyler, çünkü “bu diploma sahte” ile “denetleyemiyorum” arasındaki fark birinin işe alınıp alınmamasına karar verebilir. Yetki veriliş tarihine göre değerlendirilir: üniversite etkinken verilmiş bir diploma üniversite askıya alındıktan sonra da geçerli kalır, yeni belge verme ise hemen durur.

Ekim 2026’da kimlik servisi ve Tamga Verify, OpenID Foundation’ın uyum test planlarını sandbox üzerinde çalıştırdı: HAIP ve FAPI 2.0 ile OpenID4VCI (63 modül) ve HAIP ile OpenID4VP (14 modül). Belge veren planının son çalıştırmasında başarısız modül kalmadı; doğrulayıcı planının son turunda ne başarısız modül ne uyarı vardı. Bu doğrulayıcı çalıştırması, istek işleyişinin değiştiği 29 Ekim’den öncedir (her çekim artık kendi isteğini alıyor); plan o günden beri yeniden çalıştırılmadı. Bu çalışmadan yirmiye yakın değişiklik çıktı, her biri bir şartname maddesine dayanıyor ve dördü önceki kararları kayıtlı ADR’lerle değiştirdi. Bu, Foundation’ın kendi aracıyla yapılan bir öz-testti; sertifika ayrı bir süreçtir. İlk tam çalıştırmanın öğrettikleri açık kaynak #link("https://github.com/tamga-network/oidf-conformance-kit")[oidf-conformance-kit] olarak yayımlandı; bütün hikâye #link("https://tamga.network/tr/blog/openid-conformance-self-test")[blogda].

= İptal ve yaşam döngüsü

İptal IETF Token Status List ile yapılır. Her belge kopyasının bir listede rastgele bir konumda durum kaydı vardır. Kimlik servisinin listeleri kayıt başına tek bit kullanır; belge geçerli ya da iptaldir, askı yoktur. Kurum listeleri iki bit kullanır ve askıda değeri yalnızca türün şeması askıya izin veriyorsa görülür; bugün bu tür diplomadır. Kurum listeyi istek üzerine değil sabit aralıkla yayınlar; böylece zamanlama kişi hakkında hiçbir şey ele vermez ve her yayın çapalanır. Doğrulayıcılar listeleri önceden çeker; bir belgeyi denetlemek ne kuruma ne telefona çağrı yapar. Listeler 2 dakikada bir yeniden yayınlanır ve her biri 6 saat geçerlidir: durum sunucusu çalışırken bir iptal dakikalar içinde doğrulayıcılara ulaşır, kısa bir kesinti de doğrulamayı durdurmaz.

Kopyalar tasarım gereği tükenir. Belge bir yenileme belirteciyle geldiyse cüzdan kopyaları kurumun ilan ettiği eşikte arka planda yeniler ve yenileme yeni bir bilgi paylaşmaz. Yenileme belirteci tek bir taşıma anahtarına değil cüzdan örneğinin kanıt anahtarına bağlıdır; OAuth kanıt profili bunu ister ve cüzdan böylece DPoP anahtarlarını değiştirse de yenileyebilir. Kimlik belgesi sunularak yenilenen belgeler ise kişinin onayını ve PIN’ini gerektirir. Bkz. #link("https://tamga.network/tr/learn/revocation")[iptal].

#chapter()
= Tasarımdan gelen mahremiyet

- *Doğrulayıcı başına kopya.* Her doğrulayıcı farklı bir anahtara bağlı farklı bir kopya alır; doğrulayıcılar aldıklarını karşılaştırarak kişiyi eşleştiremez. Veriliş ve bitiş zamanları saat başına yuvarlanır, bu yüzden kopyalar zaman damgasıyla da eşleştirilemez.
- Varsayılan olarak *seçici paylaşım*; soru asıl veri olmadan cevaplanabiliyorsa #raw("age_over_15") ve #raw("age_over_18") gibi evet/hayır alanları.
- *Kimlik kontrolü yalıtılmıştır.* Kimlik doğrulama sağlayıcısıyla yalnızca kimlik servisi konuşur. Belgeyi verdikten sonra fotoğraf tutmaz; yalnızca opak bir kayıt (kişi referansı ve belge numarasının özeti) tutar. Kurumlar kişiyi sağlayıcı üzerinden değil kimlik belgesi üzerinden eşleştirir.
- *Günlüklerde ve herkese açık adreslerde kişisel veri yok.* İptal listesi adresleri kurumu açığa vurmaz; günlükler ne olduğunu yazar, kimin başına geldiğini asla yazmaz.
- *Web siteleri* hesap anahtarı olarak siteye özel bir takma ad alır. Kimlik belgesi numarası da özeti de hiçbir zaman gönderilmez; takma adların türetildiği tohum cüzdana ayrı bir belge olarak ulaşır ve sunucuda saklanmaz.

#notebox[Açıkça söylenen artık risk: bir kurum birden çok doğrulayıcıyla işbirliği yaparsa verdiği imzalar üzerinden kişiyi hâlâ eşleştirebilir. Sıfır bilgi ispatıyla sunum bu açığı kapatır; cüzdan tarafında mağaza sürümünden sonra gelir (bkz. sıfır bilgi ispatı bölümü).]

= Yakın alan: geçiş kartları ve yaş kontrolü

Turnike ve etkinlik kapıları için Tamga bir geçiş kartı kullanır. Kişi standart bir sunumla bir kez kaydolur; ardından cüzdan 60 saniyelik imzalı bir jetonu QR kodu olarak gösterir. Jetonda kişisel veri yoktur, tekrar kullanım reddedilir ve bilet tek kullanımlık olabilir. Ekim 2026’dan beri her kapı kendini doğrulama servisine işletmecinin verdiği bir terminal anahtarıyla tanıtır; böylece QR kodun fotoğrafını çeken biri bileti sahibi kapıya varmadan harcayamaz. Kapılar güven listesinde yayımlanan gruplara bağlıdır; her grup kapıları işleten kurumu ve kabul edebilecekleri geçiş kartlarını söyler. Grubu listeden çıkan ya da listesi güncel olmayan kapı reddedilir. Kişiden kişiye kontrolde roller tersine döner: cüzdan kısa ömürlü bir istek adresi gösterir, kontrol edenin uygulaması standart bir OpenID4VP isteği başlatır. İkisi de sürümlü köprülerdir. Hedef Bluetooth ve NFC üzerinden ISO 18013-5’tir; Bluetooth yolu cüzdanda kodlandı ve cihaz testlerini bekliyor.

#chapter()
= Listelerden deftere

Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Bu yüzden Tamga listelerle başlar ve QBFT uzlaşılı izinli bir Hyperledger Besu ağını ancak en az iki bağımsız validator operatörü yazılı kabul verdiğinde ekler. O ağın kontratları yazıldı, derlendi ve test edildi; liste yayıncısı liste özetlerini yerel bir geliştirme zincirine şimdiden gönderebiliyor. Karar gereği zincir imzalı listelerin projeksiyonudur: yalnızca her liste sürümünün özetini (sürüm, içerik özeti, önceki özet, yayın zamanı) ve çapa günlüğünün son satırının özetini kaydeder. İçerik, kayıt, belge ya da kişisel veri tutmaz. Bir özet ancak eşik sayıda bağımsız yazıcı aynı değeri gönderince onaylı sayılır; yazıcılar bir sürüm hakkında anlaşamazsa ilk gelenin değeri kilitlenmez, çelişki kayda geçer. Zincirin cevabı doğrulama için hiçbir zaman gerekli değildir; imzalı listeyle çeliştiğinde liste geçerlidir. Üretimde bu özellik ikinci bir bağımsız operatör var olana kadar kapalı kalır.

Defterdeki yönetişim ilkeleri izler. Validator’lar eşit oylu devletlerdir; yeni üyeler üçte iki oyla katılır; her devlet kendi kurumlarını tek başına kaydeder ya da askıya alır ve hangi yabancı kurumları tanıyacağına kendisi karar verir. Bir protokol yükseltmesi eşiğe ulaştıktan sonra en az yedi gün bekler; böylece katılmayan bir devlet yürürlüğe girmeden önce çekilebilir. Ulusal şema adları kendi ad alanında durur, bir kurum yalnızca kendi devletinin kök sertifikasına bağlanabilir ve defterdeki durum listesi kaydı her listeyi kendi bit sayısıyla kabul eder. Geçişten önce liste geçmişi kontratlara yeniden oynatılır ve ikisinin aynı cevapları vermesi gerekir. Bileşenler güveni tek bir arayüz üzerinden okur; bu yüzden belgeler, cüzdanlar ve doğrulama hattı değişmez. Bkz. #link("https://tamga.network/tr/learn/what-is-blockchain")[blockchain nedir, ne değildir].

= Sıfır bilgi ispatı ve araştırma yönleri

*Sıfır bilgi ispatıyla sunum (karara bağlandı, kısmen yapıldı).* Cüzdan, kurumun imzaladığı ve hiç değişmeyen bir mdoc hakkında “18 yaşından büyük” ya da “15 yaşından büyük” gibi bir cümleyi açık kaynak Longfellow ZK sistemiyle kanıtlar; AB’nin yaş doğrulama çalışması da bu sistem üzerine kurulu. Doğrulayıcı yalnızca cümlenin doğru olduğunu ve belgeyi hangi kurumun verdiğini öğrenir; iki sunum birbirine bağlanamaz. Yalnızca incelenmiş ve kimliği imzalı güven listesinde yayımlanmış devreler kabul edilir. İspat durum listesi konumunu açmadığı için iptal ispatın içinde denetlenemez; bu yüzden ispat en çok 24 saat geçerli kısa ömürlü bir kopya üzerinden yapılır ve belge iptal edilince kimlik servisi bu kopyayı yenilemeyi bırakır. Doğrulayıcı tarafı canlıda. Yerel ispatçı Android için derlendi ve gerçek ispatlar masaüstü ispatçısıyla test edildi; telefonda ispat üretimi mağaza sürümünden sonra gelir, ispat yapılamadığında olağan sunum sürer. Bkz. #link("https://tamga.network/tr/learn/zero-knowledge-proofs")[sıfır bilgi ispatı].

*Araştırma yönü: değer katmanı.* Doğrulanmış taraflar arasında yetkilendirme; para hareketi düzenlenmiş ödeme sistemlerinde kalır. İlk sürümün ya da pilotun parçası değildir ve herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir.

#chapter()
= Durum ve yol haritası

*Bugün çalışan (ilk sürüm, gerçek kriptografi):* diploma ve öğrenci belgesi verme ve sunma; iptal ve kurum askısı; kimlik kontrolü ve iki yaş alanı taşıyan, mdoc olarak da verilen kimlik belgesi; kimliği doğrulanmış kapılarla kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; siteye özel takma adla web sitesine kayıt ve passkey ile giriş; doğrulayıcı tarafında sıfır bilgi ispatıyla yaş kontrolü; kurumun imza anahtarının kurumda kaldığı ve servisin imzalamak için kuruma yalnızca bir özet gönderdiği barındırılan belge verme servisi (Cloud Signature Consortium API). Dokuz açık kaynak paket npm’de 0.7.4 deneme sürümünde; bu sürüm sahte ret korumasını, kayıt sertifikası durumunu, güven listesindeki kapı gruplarını ve ETSI XML liste görünümünü getiriyor. Gerçek ağın Türkiye listesi yayında ve tek etkin belge vereni kimlik servisi; ilk gerçek kurum, bir üniversite, hazırlanıyor.

#kvtable("Aşamalar", (("Liste aşaması (bugün)", "imzalı güven listeleri ve çapa günlüğü · Tamga geçici operatör · sandbox yayında · paketler npm'de deneme sürümü · OpenID öz-testi yapıldı"), ("Pilot", "ilk belge veren kurum bir üniversite · kurumun anahtarı kurumda kalır (uzaktan imza) · cüzdanlar mağazalarda · gerçek telefonlarda Bluetooth ve Digital Credentials API · listeler, defter yok"), ("Devir", "ağın işletmesi bir vakfa geçer; adım yazılı ve provası yapılmış · tanımlayıcılar değişmez"), ("Faz 0", "en az 2 bağımsız validator operatörü imzalayınca izinli Besu/QBFT defteri · kontratlar yazıldı ve test edildi; zincir imzalı listeleri yansıtır"), ("Faz 1", "üye devlet listeleri · okuyucu doğrulamalı NFC ile yakın alan"),), mono: false)

İlk sürümün bilinen sınırları aşağıda kayıtlıdır ve pilottan önce kapanır. Pilotun başarı ve durdurma ölçütleri önceden tanımlıdır. Listeye giren ilk cüzdan Tamga Wallet Android test derlemesinde; mağaza sürümleri ile Bluetooth ve Digital Credentials API cihaz testleri cüzdan tarafındaki sonraki adımlardır ve ağın değil cüzdanın işidir.

Gerçek ağdan ayrı bir test ağı, sandbox.tamga.network, Ekim 2026’dan beri yayında: kendi test kökü ve listeleri, örnek kurumlar, sahte kişiler ve her türden örnek belgeler, hızlı denemenin yanında günlük ve aylık tavanlı isteğe bağlı gerçek kimlik doğrulama, test kurumu hesapları ve kendi terminal anahtarları olan bir deneme kapısı. Gerçek ağdaki hiçbir cüzdan ya da doğrulayıcı ona güvenmez. Cüzdan, kurum ve doğrulayıcı geliştiricilerinin hepsi orada dener; cüzdan geliştiricisi kendi cüzdan sağlayıcısını sandbox listesine kaydettirir ve cüzdanını örnek kurumlarla, kimlik servisiyle ve doğrulayıcıyla dener. OpenID öz-testi de orada çalıştı; test aracının sertifikaları yalnızca sandbox listelerine eklendi. Bkz. #link("https://docs.tamga.network/tr/guides/sandbox")[sandbox rehberi].

= Bilinen sınırlar

- Bu aşamada güven çapası tek operatörün imzasına dayanır. Herkese açık çapa günlüğü, şeffaflık raporu ve denetimler kötüye kullanımı caydırır; imkânsız kılamaz. Bu sınırı yalnızca ikinci bir bağımsız liste yazıcısı, sonra da defter kaldırır.
- Durum sunucusu çalışırken bir iptal birkaç dakikada etkili olur (2 dakikalık yayın aralığı ile doğrulayıcının ön çekim aralığı).
- Sıfır bilgi ispatıyla sunulan belgenin iptali ispatın içinde denetlenemez. Kısa ömürlü kopya bu açıklığı 24 saatle sınırlar, ortadan kaldırmaz.
- Sıfır bilgi ispatıyla sunum cüzdana gelene kadar kurum eşleştirmesi riski kalır.
- Kimlik servisi teorik olarak bir kişinin belirli bir sitedeki takma adını hesaplayabilir. Anahtar koruması, ayrı yapılandırılan tohum ve denetim bunu sınırlar; sıfır bilgi ispatı ileride kaldırır.
- Bir cüzdan uygulama mağazalarında yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez. Cüzdanın mağaza sürümüyle App Attest ve Play Integrity zorunlu olur.
- OpenID uyum çalıştırması sandbox üzerinde, her planın tek bir çeşidiyle yapılan bir öz-testti. Sertifika ayrı bir süreçtir; cüzdan planları cihaz derlemesi gerektirdiği için çalıştırılmadı. Doğrulayıcı planı, istek işleyişinin 29 Ekim’de değişmesinden önce çalıştı ve yeniden çalıştırılması gerekiyor.
- Barındırılan belge verme servisinin uzaktan imza yolu yazıldı ve test edildi, ama gerçek ağda henüz hiçbir kurum kullanmıyor; gerçek ağ dosyada tutulan bir kurum anahtarını reddeder.

= Kurallar, açık kaynak ve ayrıntılı okuma

Ağın kuralları Tamga ARF 1.0 olarak yayınlanır: ana belge, Trust Framework, Tamga Rulebook ve ondan her belge türü için dallanan rulebook’lar (Education, Identity ve Event Ticket) #link("https://arf.tamga.network/tr/")[arf.tamga.network] adresindedir. Ayrıca bkz. #link("https://tamga.network/tr/learn/rules-and-rulebooks")[kurallar ve rulebook’lar].

Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. #raw("@tamga-network/*") paketleri güven listelerini, belge biçimlerini, belge vermeyi, doğrulamayı, sıfır bilgi ispatını ve cüzdan çekirdeğini kapsar. Entegrasyon kılavuzları ve spesifikasyonlar #link("https://docs.tamga.network/tr/")[geliştirici belgelerindedir]; bu belgede anılan her karar orada bir ADR olarak yayımlanmıştır. Kavramlar #link("https://tamga.network/tr/learn")[Öğren] bölümünde sıfırdan anlatılır; #link("https://docs.tamga.network/tr/glossary")[sözlük] hızlı başvuru, #link("https://tamga.network/tr/manifesto")[manifesto] ise “neden” sorusunun cevabıdır.

#notebox[Bu yaşayan bir belgedir. Duyuruya kadar sürüm 1.0’da kalır ve kararlar olgunlaştıkça yerinde güncellenir; bu baskı 29 Ekim 2026 tarihlidir, ilk baskı 3 Ekim 2026’da yayımlandı. Kalıcı olan güven modelidir.]

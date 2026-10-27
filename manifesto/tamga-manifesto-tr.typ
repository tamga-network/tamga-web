// Tamga Network — Manifesto (Türkçe). v1.0, gözden geçirilmiş 2026-10-27 (ilk baskı 2026-10-03).
// Metin src/content/manifesto.tsx (tr) ile aynıdır; ikisi birlikte değiştirilir.
// Build:  typst compile --root . tamga-manifesto-tr.typ ../public/manifesto-tr.pdf
#import "template.typ": conf

#conf(
  lang: "tr",
  eyebrow: "Manifesto",
  title: [Kadim mührün çağdaş karşılığını inşa ediyoruz],
  footer-right: "Manifesto v1.0",
  date: "2026-10-27",
  edition: "Gözden geçirilmiş baskı · ilk baskı 2026-10-03",
  lead: [
    Dünya güveni kurma biçimini değiştiriyor. Avrupa yeni modeli düzenlemeyle zorunlu
    kıldı ve çevresinde bir standart oluşuyor. Bu dönüşümün olup olmayacağı artık soru
    olmaktan çıktı. Şimdi soru, onu kimin kuracağı ve kimin yalnızca satın alacağı.
  ],
  theses: (
    (
      title: "Güven bir altyapıdır",
      body: [
        Hiçbir uygulama kimliği, yetkiyi ve belgeyi sıfırdan doğrulamak zorunda kalmamalı.
        Elektrik ve internet nasıl ortak altyapıysa dijital güven de öyle olmalı; her
        banka, üniversite, işveren ve kapı onu yeniden kurmak yerine ondan yararlanmalı.
        Biz bu altyapıyı kuruyoruz ve devredilmek üzere kuruyoruz; önce bir vakfa,
        zamanla devletlerin kendisine devredilecek.
      ],
    ),
    (
      title: "Veri, sahibinin elinde kalır",
      body: [
        Kimse kendisiyle ilgili bir şeyi kanıtlamak için belgesinin kopyasını teslim etmek
        zorunda kalmamalı. Belge kişinin telefonunda kalır, telefondan yalnızca gereken
        kanıt çıkar. Kişi doğum tarihini vermeden 15 ya da 18 yaşından büyük olduğunu
        gösterebilir, doğrulayan taraf da yalnızca evet ya da hayır görür. Biz bunu bir
        hak sayıyoruz ve teknoloji bu hakka saygı göstermeyi artık kolaylaştırıyor.
      ],
    ),
    (
      title: "Doğrulama kaynağa gitmeden yapılmalı",
      body: [
        Bir belgenin gerçek olduğuna matematik karar vermeli; fotokopinin ne kadar ikna
        edici göründüğü ölçü olamaz. Kriptografik imza belgeyi kimin verdiğini ve içinde
        hiçbir şeyin değişmediğini kanıtlar. Bunu belgeyi verene sormadan yapar, bu yüzden
        veren kurum kişinin belgeyi nerede ve ne zaman kullandığını hiç öğrenmez.
      ],
    ),
    (
      title: "Blockchain araçtır, yalnızca araç",
      body: [
        Biz yeni bir blockchain kurmuyoruz. Güven bugün herkesin indirip denetleyebildiği
        imzalı, açık güven listelerine dayanır. Ortak bir defter ancak bağımsız taraflar
        onu birlikte işlettiğinde bir şey katar; defterin kodu yazıldı ve test edildi,
        o güne kadar kapalı durur. *Kişisel veri ikisine de asla yazılmaz.* Kişi bunların
        hiçbirini görmez; yalnızca kimliğini kullanır.
      ],
    ),
    (
      title: "Açık standartlar, kilitlenme yok",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 ve seçici paylaşım AB'nin kendi
        profilleridir ve biz onları olduğu gibi kullanırız. Kendimizi dünyanın üzerinde
        uzlaştığı standartlara bağlarız; herhangi bir şirketin ürününe bağlamayız, kendi
        ürünümüze de. Ağ cüzdan işletmez; kurallara uyan her cüzdanı listeler. İlk
        listelenen cüzdan Tamga Wallet ayrı bir üründür ve listeye başka her cüzdanın
        gireceği yoldan girdi.
      ],
    ),
    (
      title: "Egemenlik ve uyum aynı anda mümkündür",
      body: [
        Dünya taşınabilir kanıta geçerken önümüzde iki yol var. Ya bu dönüşümü dışarıdan
        ithal ederiz ya da aynı açık standartlar üzerinde kendi altyapımızı kurar ve
        anahtarlarını elimizde tutarız. Biz ikincisini seçiyoruz. *Aynı standartlar, kendi
        ağımız* ve kendi kaydının tek yazarı olan her devlet.
      ],
    ),
    (
      title: "Tamga, ortak bir mühür geleneğidir",
      body: [
        _Tamga_, Türk halklarının kadim mührüydü; mülkiyeti, aidiyeti ve yetkiyi kanıtlayan
        işaret. Doğrulanabilir dijital belge bunun çağdaş karşılığıdır. Ortak bir dil
        ailesini, kültürü ve tarihi paylaşan halklar ortak bir dijital güven zemini için
        doğal bir topraktır ve her biri kendi mührünü elinde tutar.
      ],
    ),
    (
      title: "Merkez değil, örgü",
      body: [
        Tek bir otorite istemiyoruz. Birlikte çalışabilen bağımsız ağlardan oluşan bir
        örgü istiyoruz, bir *Trust Mesh*. Bu örgüde her ülke kendi güven listesini,
        kurumlarını ve yönetişimini korur ve ötekilere ortak standartlar üzerinden
        bağlanır, tıpkı Avrupa'ya bağlanacağı gibi.
      ],
    ),
  ),
  closing: [
    Amacımız dijital güveni her uygulamanın yeniden çözdüğü sorunlar listesinden çıkarmak
    ve Türkiye ile Türk dünyası için ortak, egemen ve birlikte çalışabilir bir altyapıya
    dönüştürmek.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

// MF — Kadim mührün çağdaş karşılığını inşa ediyoruz. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Manifesto",
  baslik: "Kadim mührün çağdaş karşılığını inşa ediyoruz",
  altbaslik: "Türkiye ve Türk dünyası için dijital güven üzerine sekiz ilke",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "Kasım 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("",),
  atif: "Tamga Network (2026). Kadim mührün çağdaş karşılığını inşa ediyoruz. Manifesto, sürüm 1.0. https://tamga.network/manifesto-tr.pdf",
  ozet-sayfasi: false,
  kisa-baslik: none,
  icindekiler: false,
  ozet: [

  ],
)

Dünya güveni kurma biçimini değiştiriyor. Avrupa, her üye devletin vatandaşına bir dijital kimlik cüzdanı sunmasını düzenlemeyle zorunlu kıldı ve çevresinde bir standart oluşuyor. Bu dönüşümün olup olmayacağı artık soru olmaktan çıktı. Şimdi soru, onu kimin kuracağı ve kimin yalnızca satın alacağı.

#heading(level: 1, numbering: none)[Güven bir altyapıdır]

Hiçbir uygulama kimliği, yetkiyi ve belgeyi sıfırdan doğrulamak zorunda kalmamalı. Elektrik ve internet nasıl ortak altyapıysa dijital güven de öyle olmalı; her banka, üniversite, işveren ve kapı onu yeniden kurmak yerine ondan yararlanmalı. Biz bu altyapıyı devredilebilecek biçimde kuruyoruz: önce bir vakfa, devletler katıldıkça da onların kendisine. Ağ kâr amacı gütmez ve hizmet satmaz. Kuralları ve güven listeleri açıktır, paketlerinin kodu da açık kaynaklıdır; herkes okuyabilir ve denetleyebilir.

#heading(level: 1, numbering: none)[Veri, sahibinin elinde kalır]

Kimse kendisiyle ilgili bir şeyi kanıtlamak için belgesinin kopyasını teslim etmek zorunda kalmamalı. Belge kişinin telefonunda kalır ve telefondan yalnızca gereken kanıt çıkar. Kişi belgenin yalnız istenen alanlarını gösterir; buna seçici açıklama denir. Doğum tarihini vermeden 15 ya da 18 yaşından büyük olduğunu gösterebilir, doğrulayan taraf da yalnızca evet ya da hayır görür. Biz bunu bir hak sayıyoruz ve teknoloji bu hakka saygı göstermeyi artık kolaylaştırıyor.

#heading(level: 1, numbering: none)[Doğrulama kaynağa gitmeden yapılmalı]

Bir belgenin gerçek olduğuna matematik karar vermeli; fotokopinin ne kadar ikna edici göründüğü ölçü olamaz. Kriptografik imza belgeyi kimin verdiğini ve içinde hiçbir şeyin değişmediğini kanıtlar. Bunu belgeyi verene sormadan yapar, bu yüzden veren kurum belgenin nerede kullanıldığını öğrenmez. Belgenin iptal edilip edilmediği de kurumun yayımladığı durum listesinden okunur. Liste bütün olarak indirildiği için kurum hangi belgenin sorulduğunu bilmez.

#heading(level: 1, numbering: none)[Blockchain araçtır, yalnızca araç]

Bugün ağda bir blockchain yok ve güvenin ona ihtiyacı da yok. Güven, herkesin indirip denetleyebildiği imzalı, açık güven listelerine dayanır. Ortak bir defter ancak bağımsız taraflar onu birlikte işlettiğinde bir şey katar ve o zaman da yalnız bu listelerin özetini taşır. Defterin kodu yazıldı ve test edildi; ikinci bağımsız işletmeci katılana kadar kapalı kalır. #{strong[Kişisel veri ikisine de asla yazılmaz.]} Kişi bunların hiçbirini görmez; yalnızca kimliğini kullanır.

#heading(level: 1, numbering: none)[Açık standartlar, kilitlenme yok]

SD-JWT VC, ISO mdoc, OpenID4VC ve X.509, AB’nin seçtiği açık standartlardır ve biz onları AB’nin profilleriyle olduğu gibi kullanırız. Kendimizi dünyanın üzerinde uzlaştığı standartlara bağlarız; herhangi bir şirketin ürününe bağlamayız, kendi ürünümüze de. Böylece bir kurumun verdiği belgeyi, aynı standartları izleyen her doğrulayıcı okuyabilir. Ağ cüzdan işletmez, kurallara uyan her cüzdanı listeler. Listeye giren ilk cüzdan Tamga Wallet ayrı bir üründür ve listeye başka her cüzdanın gireceği yoldan girdi.

#heading(level: 1, numbering: none)[Egemenlik ve uyum aynı anda mümkündür]

Dünya taşınabilir kanıta geçerken önümüzde iki yol var. Ya bu dönüşümü dışarıdan ithal ederiz ya da aynı açık standartlar üzerinde kendi altyapımızı kurar ve anahtarlarını elimizde tutarız. Biz ikincisini seçiyoruz. Uyum, AB’nin seçtiği biçimleri ve kuralları izlemek demektir; egemenlik ise kimin güvenilir sayılacağına kendimizin karar vermesi. Formülümüz kısa: #{strong[aynı standartlar, kendi ağımız.]} Katıldığında her devlet de kendi kaydının tek yazarı olacak.

#heading(level: 1, numbering: none)[Tamga, ortak bir mühür geleneğidir]

#{emph[Tamga]}, Türk halklarının kadim mührüydü; mülkiyeti, aidiyeti ve yetkiyi kanıtlayan işaret. Doğrulanabilir dijital belge bunun çağdaş karşılığıdır. Ortak bir dil ailesini, kültürü ve tarihi paylaşan halklar ortak bir dijital güven zemini için doğal bir topraktır ve her biri kendi mührünü elinde tutar.

#heading(level: 1, numbering: none)[Merkez değil, örgü]

Tek bir otorite istemiyoruz. Birlikte çalışabilen bağımsız güven listelerinden oluşan bir örgü istiyoruz. Bu örgüde her ülke kendi güven listesini, kurumlarını ve yönetişimini korur ve ötekilere ortak standartlar üzerinden bağlanır. Bir listeye girmek ötekine girmek demek değildir; her ağ kimi tanıyacağına kendisi karar verir. Aynı standartlar sayesinde Avrupa ile de konuşabilir.

#heading(level: 1, numbering: none)[Amacımız]

Dijital güveni her uygulamanın yeniden çözdüğü sorunlar listesinden çıkarmak ve Türkiye ile Türk dünyası için ortak, egemen ve birlikte çalışabilir bir altyapıya dönüştürmek istiyoruz.

#{emph[Building Trust Infrastructure for the Digital World.]}

#{emph[Sürüm 1.0, gözden geçirilmiş baskı, Kasım 2026. İlk baskı 3 Ekim 2026.]}

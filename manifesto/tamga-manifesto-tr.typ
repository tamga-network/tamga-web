// Tamga Network — Manifesto (Türkçe)
// Build:  typst compile --root . tamga-manifesto-tr.typ ../public/manifesto-tr.pdf
#import "template.typ": conf

#conf(
  lang: "tr",
  eyebrow: "Manifesto",
  title: [Kadim mührün çağdaş karşılığını inşa ediyoruz],
  footer-right: "Manifesto v1.0",
  lead: [
    Dünya, güveni kurma biçimini değiştiriyor. Avrupa bunu düzenlemeyle zorunlu
    kıldı; standart oluşuyor. Soru artık "bu dönüşüm olacak mı" değil — "bu
    dönüşümde kim üretici olacak."
  ],
  theses: (
    (
      title: "Güven bir ürün değil, bir altyapıdır",
      body: [
        Her uygulama kimliği, yetkiyi ve belgeyi yeniden doğrulamak zorunda
        kalmamalı. Nasıl elektrik ve internet ortak bir altyapıysa, dijital güven
        de ortak bir altyapı olmalıdır. Biz bu altyapıyı inşa ediyoruz.
      ],
    ),
    (
      title: "Veri, sahibinin elinde kalır",
      body: [
        Kimliğini kanıtlamak için belgenin kopyasını teslim etmek zorunda
        kalmamalısın. Veri kullanıcının kontrolünde kalır; yalnızca gerekli olan
        kanıt paylaşılır. Doğum tarihini vermeden "18 yaş üstü" olduğunu
        kanıtlayabilmelisin. Bu bir lüks değil, #strong[hak]tır.
      ],
    ),
    (
      title: "Doğrulama kaynağa gitmeden yapılmalı",
      body: [
        Bir belgenin gerçekliği fotokopinin ikna ediciliğine değil, matematiğin
        kesinliğine dayanmalı. Kriptografik imza, belgenin kimden geldiğini ve
        değiştirilmediğini kaynağa hiç sormadan kanıtlar.
      ],
    ),
    (
      title: "Blockchain araçtır, amaç değildir",
      body: [
        Biz yeni bir blockchain ağı kurmuyoruz. Bugün güven, imzalı ve herkese
        açık güven listelerine dayanır; ortak bir defter ancak bağımsız taraflar onu
        birlikte işlettiğinde eklenir. *Kişisel veri ikisine de asla yazılmaz.*
        Kullanıcı bunların hiçbirini görmez; yalnızca kimliğini kullanır.
      ],
    ),
    (
      title: "Açık standartlar, üretici bağımsızlığı",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 ve seçici açıklama — EUDI profilleri. Belirli bir
        şirketin ürününe değil, dünyanın üzerinde uzlaştığı açık standartlara
        bağlıyız. Kilitlenme yok; birlikte çalışabilirlik esas.
      ],
    ),
    (
      title: "Egemenlik ve uyum aynı anda mümkündür",
      body: [
        Dünya taşınabilir kanıt modeline geçerken önümüzde iki yol var: bu
        dönüşümü dışarıdan ithal etmek ya da kendi egemen, açık standartlara uyumlu
        altyapımızı inşa etmek. Biz ikinci yolu seçiyoruz — *uyumlu ama bağımsız.*
        Aynı standartlar, kendi ağımız.
      ],
    ),
    (
      title: "Tamga, ortak bir mühür geleneğidir",
      body: [
        _Tamga_, Türk boylarının kadim mührüydü — mülkiyeti, aidiyeti ve yetkiyi
        doğrulayan işaret. Doğrulanabilir dijital belge bunun çağdaş karşılığıdır.
        Ortak dil, kültür ve tarih mirasını paylaşan *~300 milyon nüfuslu Türk
        dünyası*, ortak bir dijital güven zemini için doğal bir topraktır.
      ],
    ),
    (
      title: "Merkez değil, örgü",
      body: [
        Tek bir otorite değil, birlikte çalışabilir bağımsız ağlardan oluşan bir
        örgü — *Trust Mesh*. Her ülke kendi güven ağını, kurumlarını ve
        yönetişimini korurken ortak standartlar üzerinden diğer ağlarla güven
        ilişkisi kurar.
      ],
    ),
  ),
  closing: [
    Dijital güveni tek tek uygulamaların yeniden çözdüğü bir problem olmaktan
    çıkarıp, Türkiye'nin ve Türk dünyasının ortak, egemen ve birlikte çalışabilir
    bir altyapı hizmetine dönüştürmeyi hedefliyoruz.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

// MF — Biz qədim möhürün müasir qarşılığını qururuq. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "az")
#let sekil = sekil.with(dil: "az")

#show: conf.with(
  lang: "az",
  dizi: "Tamga Network Manifesto",
  baslik: "Biz qədim möhürün müasir qarşılığını qururuq",
  altbaslik: "Türkiyə və türk dünyası üçün rəqəmsal etibar haqqında səkkiz prinsip",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "Noyabr 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. Bu əsər Creative Commons Attribution 4.0 International (CC BY 4.0) lisenziyası ilə nəşr olunub: mənbə göstərilməklə paylaşıla və uyğunlaşdırıla bilər. https://creativecommons.org/licenses/by/4.0/deed.az",
  anahtar: ("",),
  atif: "Tamga Network (2026). Biz qədim möhürün müasir qarşılığını qururuq. Manifest, versiya 1.0. https://tamga.network/manifesto-az.pdf",
  ozet-sayfasi: false,
  kisa-baslik: none,
  icindekiler: false,
  ozet: [

  ],
)

Dünya etibarı qurmaq üsulunu dəyişir. Avropa hər üzv dövlətin öz vətəndaşlarına rəqəmsal şəxsiyyət cüzdanı təqdim etməsini tənzimləmə ilə məcburi etdi və ətrafında bir standart formalaşır. Bu dəyişikliyin baş verib-verməyəcəyi artıq sual olmaqdan çıxdı. İndi sual onu kimin quracağı və kimin yalnız satın alacağıdır.

#heading(level: 1, numbering: none)[Etibar infrastrukturdur]

Heç bir tətbiq şəxsiyyəti, səlahiyyəti və sənədləri sıfırdan yoxlamağa məcbur olmamalıdır. Elektrik və internet ortaq infrastruktur olduğu kimi rəqəmsal etibar da belə olmalıdır; hər bank, universitet, işəgötürən və giriş qapısı onu yenidən qurmaq əvəzinə ondan faydalanmalıdır. Biz bu infrastrukturu təhvil verilə biləcək şəkildə qururuq: əvvəlcə bir fonda, dövlətlər qoşulduqca isə onların özünə. Şəbəkə mənfəət məqsədi güdmür və xidmət satmır. Onun qaydaları və etibar siyahıları açıqdır, paketlərinin kodu da açıq mənbəlidir; hər kəs onları oxuya və yoxlaya bilər.

#heading(level: 1, numbering: none)[Məlumat sahibinin əlində qalır]

Heç kim özü haqqında nəyisə sübut etmək üçün sənədinin surətini təhvil verməyə məcbur olmamalıdır. Sənəd şəxsin telefonunda qalır və telefondan yalnız lazım olan sübut çıxır. Şəxs sənədin yalnız soruşulan sahələrini göstərir; buna seçici açıqlama deyilir. O, doğum tarixini vermədən 15 və ya 18 yaşdan yuxarı olduğunu göstərə bilər, yoxlayan tərəf isə yalnız bəli və ya xeyr görür. Biz bunu bir hüquq sayırıq və texnologiya bu hüquqa hörmət etməyi artıq asanlaşdırır.

#heading(level: 1, numbering: none)[Yoxlama mənbəyə müraciət etmədən aparılmalıdır]

Sənədin həqiqi olduğuna riyaziyyat qərar verməlidir; surətin nə qədər inandırıcı göründüyü ölçü ola bilməz. Kriptoqrafik imza sənədi kimin verdiyini və içində heç nəyin dəyişmədiyini sübut edir. Bunu sənədi verəndən soruşmadan edir, buna görə verən qurum sənədin harada istifadə olunduğunu öyrənmir. Sənədin ləğv edilib-edilmədiyi də qurumun dərc etdiyi status siyahısından oxunur. Siyahı bütöv şəkildə yükləndiyi üçün qurum hansı sənədin yoxlandığını bilmir.

#heading(level: 1, numbering: none)[Blockchain vasitədir, yalnız vasitə]

Bu gün şəbəkədə blockchain yoxdur və etibarın ona ehtiyacı da yoxdur. Etibar hər kəsin yükləyib yoxlaya bildiyi imzalı, açıq etibar siyahılarına əsaslanır. Ortaq reyestr yalnız müstəqil tərəflər onu birlikdə idarə etdikdə nəsə qatır və o zaman da yalnız siyahı qeydlərinin xülasələrini (hash) və barmaq izlərini daşıyır, fərdi məlumatı isə heç vaxt. Reyestrin kodu yazılıb və test edilib; ikinci müstəqil operator qoşulana qədər söndürülmüş qalır. #{strong[Fərdi məlumat heç birinə heç vaxt yazılmır.]} Şəxs bunların heç birini görmür; yalnız öz şəxsiyyətindən istifadə edir.

#heading(level: 1, numbering: none)[Açıq standartlar, asılılıq yoxdur]

SD-JWT VC, ISO mdoc, OpenID4VC və X.509 Aİ-nin seçdiyi açıq standartlardır və biz onları Aİ-nin profilləri ilə olduğu kimi istifadə edirik. Özümüzü dünyanın razılaşdığı standartlara bağlayırıq; hər hansı şirkətin məhsuluna bağlamırıq, öz məhsulumuza da. Beləliklə, bir qurumun verdiyi sənədi eyni standartlara uyan istənilən yoxlayan tərəf oxuya bilər. Şəbəkə cüzdan idarə etmir; qaydalara uyan hər cüzdanı siyahıya alır. Siyahıya daxil olan ilk cüzdan Tamga Wallet ayrıca məhsuldur və siyahıya başqa hər cüzdanın daxil olacağı yolla daxil olub.

#heading(level: 1, numbering: none)[Suverenlik və uyğunluq eyni anda mümkündür]

Dünya daşına bilən sübuta keçərkən qarşımızda iki yol var. Ya bu dəyişikliyi xaricdən idxal edərik, ya da eyni açıq standartlar üzərində öz infrastrukturumuzu qurub açarlarını öz əlimizdə saxlayarıq. Biz ikincisini seçirik. Uyğunluq Aİ-nin seçdiyi formatlara və qaydalara əməl etmək, suverenlik isə kimin etibarlı sayılacağına özümüzün qərar verməsidir. #{strong[Eyni standartlar, öz şəbəkəmiz]} və qoşulduqda öz qeydiyyatının yeganə müəllifi olacaq hər dövlət.

#heading(level: 1, numbering: none)[Tamga ortaq möhür ənənəsidir]

#{emph[Tamga]} türk xalqlarının qədim möhürü idi; mülkiyyəti, mənsubiyyəti və səlahiyyəti sübut edən nişan. Yoxlanıla bilən rəqəmsal sənəd onun müasir qarşılığıdır. Ortaq dil ailəsini, mədəniyyəti və tarixi paylaşan xalqlar ortaq rəqəmsal etibar təməli üçün təbii zəmindir və hər biri öz möhürünü öz əlində saxlayır.

#heading(level: 1, numbering: none)[Mərkəz deyil, şəbəkə toxuması]

Biz tək bir hakimiyyət istəmirik. Qarşılıqlı işləyə bilən müstəqil etibar siyahılarından ibarət toxuma istəyirik. Bu toxumada hər ölkə öz etibar siyahısını, qurumlarını və idarəetməsini qoruyur və digərlərinə ortaq standartlar vasitəsilə bağlanır. Bir siyahıya daxil olmaq digərinə daxil olmaq demək deyil; hər şəbəkə kimi tanıyacağına özü qərar verir. Eyni standartlar sayəsində o, Avropa ilə də danışa bilir.

#heading(level: 1, numbering: none)[Məqsədimiz]

Rəqəmsal etibarı hər tətbiqin yenidən həll etdiyi problemlər siyahısından çıxarmaq və Türkiyə ilə türk dünyası üçün ortaq, suveren və qarşılıqlı işləyə bilən infrastruktura çevirmək istəyirik.

#{emph[Building Trust Infrastructure for the Digital World.]}

#{emph[Versiya 1.0, yenidən baxılmış nəşr, Noyabr 2026. İlk nəşr 3 oktyabr 2026.]}

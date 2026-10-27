// Tamga Network — Manifest (Azərbaycanca). v1.0, yenidən baxılmış 2026-10-27 (ilk nəşr 2026-10-03).
// Mətn src/content/manifesto.tsx (az) ilə eynidir; ikisi birlikdə dəyişdirilir.
// Build:  typst compile --root . tamga-manifesto-az.typ ../public/manifesto-az.pdf
#import "template.typ": conf

#conf(
  lang: "az",
  eyebrow: "Manifest",
  title: [Biz qədim möhürün müasir qarşılığını qururuq],
  footer-right: "Manifest v1.0",
  date: "2026-10-27",
  edition: "Yenidən baxılmış nəşr · ilk nəşr 2026-10-03",
  lead: [
    Dünya etibarı qurmaq üsulunu dəyişir. Avropa yeni modeli tənzimləmə ilə məcburi etdi
    və ətrafında bir standart formalaşır. Bu dəyişikliyin baş verib-verməyəcəyi artıq
    sual olmaqdan çıxdı. İndi sual onu kimin quracağı və kimin yalnız satın alacağıdır.
  ],
  theses: (
    (
      title: "Etibar infrastrukturdur",
      body: [
        Heç bir tətbiq şəxsiyyəti, səlahiyyəti və sənədləri sıfırdan yoxlamağa məcbur
        olmamalıdır. Elektrik və internet ortaq infrastruktur olduğu kimi rəqəmsal etibar
        da belə olmalıdır; hər bank, universitet, işəgötürən və giriş qapısı onu yenidən
        qurmaq əvəzinə ondan faydalanmalıdır. Biz bu infrastrukturu qururuq və təhvil
        verilmək üçün qururuq; əvvəlcə bir fonda, zamanla dövlətlərin özünə təhvil
        veriləcək.
      ],
    ),
    (
      title: "Məlumat sahibinin əlində qalır",
      body: [
        Heç kim özü haqqında nəyisə sübut etmək üçün sənədinin surətini təhvil verməyə
        məcbur olmamalıdır. Sənəd şəxsin telefonunda qalır, telefondan yalnız lazım olan
        sübut çıxır. Şəxs doğum tarixini vermədən 15 və ya 18 yaşdan yuxarı olduğunu
        göstərə bilər, yoxlayan tərəf isə yalnız bəli və ya xeyr görür. Biz bunu bir hüquq
        sayırıq və texnologiya bu hüquqa hörmət etməyi artıq asanlaşdırır.
      ],
    ),
    (
      title: "Yoxlama mənbəyə müraciət etmədən aparılmalıdır",
      body: [
        Sənədin həqiqi olduğuna riyaziyyat qərar verməlidir; surətin nə qədər inandırıcı
        göründüyü ölçü ola bilməz. Kriptoqrafik imza sənədi kimin verdiyini və içində heç
        nəyin dəyişmədiyini sübut edir. Bunu sənədi verəndən soruşmadan edir, buna görə
        verən qurum şəxsin sənədi harada və nə vaxt istifadə etdiyini heç vaxt öyrənmir.
      ],
    ),
    (
      title: "Blockchain vasitədir, yalnız vasitə",
      body: [
        Biz yeni blockchain qurmuruq. Etibar bu gün hər kəsin yükləyib yoxlaya bildiyi
        imzalı, açıq etibar siyahılarına əsaslanır. Ortaq reyestr yalnız müstəqil tərəflər
        onu birlikdə idarə etdikdə nəsə qatır; reyestrin kodu yazılıb və test edilib, o
        günə qədər söndürülmüş qalır. *Fərdi məlumat heç birinə heç vaxt yazılmır.* Şəxs
        bunların heç birini görmür; yalnız öz şəxsiyyətindən istifadə edir.
      ],
    ),
    (
      title: "Açıq standartlar, asılılıq yoxdur",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 və seçici paylaşım Aİ-nin öz profilləridir
        və biz onları olduğu kimi istifadə edirik. Özümüzü dünyanın razılaşdığı
        standartlara bağlayırıq; hər hansı şirkətin məhsuluna bağlamırıq, öz məhsulumuza
        da. Şəbəkə cüzdan idarə etmir; qaydalara uyan hər cüzdanı sıralayır. Siyahıya
        daxil olan ilk cüzdan Tamga Wallet ayrıca məhsuldur və siyahıya başqa hər cüzdanın
        daxil olacağı yolla daxil olub.
      ],
    ),
    (
      title: "Suverenlik və uyğunluq eyni anda mümkündür",
      body: [
        Dünya daşına bilən sübuta keçərkən qarşımızda iki yol var. Ya bu dəyişikliyi
        xaricdən idxal edərik, ya da eyni açıq standartlar üzərində öz infrastrukturumuzu
        qurub açarlarını öz əlimizdə saxlayarıq. Biz ikincisini seçirik. *Eyni
        standartlar, öz şəbəkəmiz* və öz qeydiyyatının yeganə müəllifi olan hər dövlət.
      ],
    ),
    (
      title: "Tamga ortaq möhür ənənəsidir",
      body: [
        _Tamga_ türk xalqlarının qədim möhürü idi; mülkiyyəti, mənsubiyyəti və səlahiyyəti
        sübut edən nişan. Yoxlanıla bilən rəqəmsal sənəd onun müasir qarşılığıdır. Ortaq
        dil ailəsini, mədəniyyəti və tarixi paylaşan xalqlar ortaq rəqəmsal etibar təməli
        üçün təbii zəmindir və hər biri öz möhürünü öz əlində saxlayır.
      ],
    ),
    (
      title: "Mərkəz deyil, şəbəkə toxuması",
      body: [
        Biz tək bir hakimiyyət istəmirik. Qarşılıqlı işləyə bilən müstəqil şəbəkələrdən
        ibarət toxuma istəyirik, bir *Trust Mesh*. Bu toxumada hər ölkə öz etibar
        siyahısını, qurumlarını və idarəetməsini qoruyur və digərlərinə ortaq standartlar
        vasitəsilə bağlanır, eynilə Avropaya bağlanacağı kimi.
      ],
    ),
  ),
  closing: [
    Məqsədimiz rəqəmsal etibarı hər tətbiqin yenidən həll etdiyi problemlər siyahısından
    çıxarmaq və Türkiyə ilə türk dünyası üçün ortaq, suveren və qarşılıqlı işləyə bilən
    infrastruktura çevirməkdir.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

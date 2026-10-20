// Tamga Network — Manifesto (Azərbaycan dili) — TASLAK: sitede açık değil; ana dili Azerbaycanca olan biri okumadan
// yayına girmez. tamga-manifesto-tr.typ'den çeviri (2026-10-20), terimler tools/claude-api/glossary/az.json.
// Build:  powershell -File manifesto/build.ps1  (az → manifesto/draft/manifesto-az.pdf, public/'e yazılmaz)
#import "template.typ": conf

#conf(
  lang: "az",
  eyebrow: "Manifest",
  title: [Qədim möhürün müasir qarşılığını qururuq],
  footer-right: "Manifest v1.0",
  lead: [
    Dünya etibarı qurma üsulunu dəyişir. Avropa bunu tənzimləmə ilə məcburi
    etdi; standart formalaşır. Sual artıq "bu dəyişiklik baş verəcəkmi" deyil —
    "bu dəyişiklikdə istehsalçı kim olacaq."
  ],
  theses: (
    (
      title: "Etibar məhsul deyil, infrastrukturdur",
      body: [
        Hər tətbiq kimliyi, səlahiyyəti və sənədi yenidən yoxlamağa məcbur
        olmamalıdır. Elektrik və internet necə ortaq infrastrukturdursa, rəqəmsal
        etibar da ortaq infrastruktur olmalıdır. Biz bu infrastrukturu qururuq.
      ],
    ),
    (
      title: "Məlumat sahibinin əlində qalır",
      body: [
        Kimliyini sübut etmək üçün sənədin surətini təhvil verməyə məcbur
        olmamalısan. Məlumat istifadəçinin nəzarətində qalır; yalnız lazım olan
        sübut paylaşılır. Doğum tarixini vermədən "18 yaşdan yuxarı" olduğunu
        sübut edə bilməlisən. Bu dəbdəbə deyil, #strong[hüquq]dur.
      ],
    ),
    (
      title: "Yoxlama mənbəyə müraciət etmədən aparılmalıdır",
      body: [
        Sənədin həqiqiliyi surətin inandırıcılığına deyil, riyaziyyatın
        dəqiqliyinə əsaslanmalıdır. Kriptoqrafik imza sənədin kimdən gəldiyini və
        dəyişdirilmədiyini mənbəyə heç müraciət etmədən sübut edir.
      ],
    ),
    (
      title: "Blokçeyn vasitədir, məqsəd deyil",
      body: [
        Biz yeni blokçeyn şəbəkəsi qurmuruq. Bu gün etibar imzalı və hamıya
        açıq etibar siyahılarına əsaslanır; ortaq reyestr yalnız müstəqil tərəflər
        onu birlikdə idarə etdikdə əlavə olunur. *Fərdi məlumatlar heç birinə heç vaxt yazılmır.*
        İstifadəçi bunların heç birini görmür; yalnız öz kimliyindən istifadə edir.
      ],
    ),
    (
      title: "Açıq standartlar, istehsalçıdan asılı olmamaq",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 və seçici paylaşım — EUDI profilləri. Biz
        konkret bir şirkətin məhsuluna deyil, dünyanın razılaşdığı açıq standartlara
        bağlıyıq. Kilidlənmə yoxdur; əsas olan qarşılıqlı fəaliyyət qabiliyyətidir.
      ],
    ),
    (
      title: "Suverenlik və uyğunluq eyni anda mümkündür",
      body: [
        Dünya daşına bilən sübut modelinə keçərkən qarşımızda iki yol var: bu
        dəyişikliyi kənardan idxal etmək və ya öz suveren, açıq standartlara uyğun
        infrastrukturumuzu qurmaq. Biz ikinci yolu seçirik — *uyğun, amma müstəqil.*
        Eyni standartlar, öz şəbəkəmiz.
      ],
    ),
    (
      title: "Tamga ortaq möhür ənənəsidir",
      body: [
        _Tamğa_ türk boylarının qədim möhürü idi — mülkiyyəti, mənsubiyyəti və
        səlahiyyəti təsdiqləyən işarə. Yoxlana bilən rəqəmsal sənəd onun müasir
        qarşılığıdır. Ortaq dil, mədəniyyət və tarix irsini paylaşan *türk dünyasının
        xalqları* ortaq rəqəmsal etibar zəmini üçün təbii torpaqdır.
      ],
    ),
    (
      title: "Mərkəz deyil, şəbəkə toru",
      body: [
        Vahid bir orqan deyil, qarşılıqlı işləyə bilən müstəqil şəbəkələrdən ibarət
        tor — *Trust Mesh*. Hər ölkə öz etibar şəbəkəsini, qurumlarını və
        idarəetməsini qoruyaraq ortaq standartlar vasitəsilə digər şəbəkələrlə
        etibar əlaqəsi qurur.
      ],
    ),
  ),
  closing: [
    Rəqəmsal etibarı ayrı-ayrı tətbiqlərin yenidən həll etdiyi problem olmaqdan
    çıxarıb Türkiyənin və türk dünyasının ortaq, suveren və qarşılıqlı işləyə bilən
    infrastruktur xidmətinə çevirməyi hədəfləyirik.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

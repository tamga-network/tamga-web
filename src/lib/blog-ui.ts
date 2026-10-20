/**
 * Blog arayüz metinleri ve kategoriler (üç dil). İstemci bileşenleri de bunu içe aktarabilir (node:fs yok).
 * Yeni kategori = BLOG_CATEGORIES + CATEGORY_LABELS (proje yönetimi onayıyla; kamuya açık yeni ad).
 */
export const BLOG_CATEGORIES = ["announcements", "network", "standards", "privacy", "europe"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

type UiLocale = "en" | "tr" | "tk" | "az";
const pick = (locale: string): UiLocale => (locale === "tr" || locale === "tk" || locale === "az" ? locale : "en");

// TODO(tk): Türkmence kategori adları ana dili Türkmence olan biri tarafından gözden geçirilmeli.
const CATEGORY_LABELS: Record<BlogCategory, Record<UiLocale, string>> = {
  announcements: { en: "Announcements", tr: "Duyurular", tk: "Habarlar", az: "Elanlar" },
  network: { en: "Network", tr: "Ağ", tk: "Tor", az: "Şəbəkə" },
  standards: { en: "Standards", tr: "Standartlar", tk: "Standartlar", az: "Standartlar" },
  privacy: { en: "Privacy", tr: "Gizlilik", tk: "Gizlinlik", az: "Məxfilik" },
  europe: { en: "Europe", tr: "Avrupa", tk: "Ýewropa", az: "Avropa" },
};

export const categoryLabel = (c: BlogCategory, locale: string) => CATEGORY_LABELS[c]?.[pick(locale)] ?? c;

/** "İlgili" kartlarında site sayfalarının adı (routing.ts'teki sabit yollar; adı olmayan yol olduğu gibi yazılır). */
const PAGE_LABELS: Record<string, Record<UiLocale, string>> = {
  "/": { en: "Tamga Network", tr: "Tamga Network", tk: "Tamga Network", az: "Tamga Network" },
  "/about": { en: "About", tr: "Hakkında", tk: "Biz barada", az: "Haqqımızda" },
  "/manifesto": { en: "Manifesto", tr: "Manifesto", tk: "Manifest", az: "Manifest" },
  "/scenarios": { en: "Scenarios", tr: "Senaryolar", tk: "Ssenariýalar", az: "Ssenarilər" },
  "/whitepaper": { en: "Whitepaper", tr: "Whitepaper", tk: "Whitepaper", az: "Whitepaper" },
  "/blog": { en: "Blog", tr: "Blog", tk: "Blog", az: "Bloq" },
  "/join": { en: "Join the network", tr: "Ağa katıl", tk: "Tora goşul", az: "Şəbəkəyə qoşulun" },
  "/network": { en: "The network", tr: "Ağ", tk: "Tor", az: "Şəbəkə" },
  "/partners": { en: "Partners", tr: "Ortaklar", tk: "Hyzmatdaşlar", az: "Tərəfdaşlar" },
  "/events": { en: "Events", tr: "Etkinlikler", tk: "Çäreler", az: "Tədbirlər" },
  "/roadmap": { en: "Roadmap", tr: "Yol haritası", tk: "Ýol kartasy", az: "Yol xəritəsi" },
  "/changelog": { en: "Changelog", tr: "Değişiklikler", tk: "Üýtgeşmeler", az: "Dəyişikliklər" },
  "/sdk": { en: "SDK", tr: "SDK", tk: "SDK", az: "SDK" },
  "/brand": { en: "Brand", tr: "Marka", tk: "Marka", az: "Brend" },
  "/learn": { en: "Learn", tr: "Öğren", tk: "Öwren", az: "Öyrən" },
};
export const pageLabel = (p: string, locale: string) => PAGE_LABELS[p]?.[pick(locale)] ?? p;

export type BlogUi = {
  eyebrow: string;
  title: string;
  description: string;
  rss: string;
  count: (n: number) => string;
  filter: string;
  all: string;
  latest: string;
  draft: string;
  draftNote: string;
  emptyFilter: string;
  empty: string;
  readMore: string;
  minRead: (n: number) => string;
  noDate: string;
  updated: string;
  toc: string;
  related: string;
  relatedPost: string;
  relatedLearn: string;
  relatedPage: string;
  copy: string;
  copied: string;
  code: string;
  author: string;
  allPosts: string;
  back: string;
  ctaTitle: string;
  ctaText: string;
  ctaLearn: string;
  ctaJoin: string;
  /** tk: Türkmence metin yokken İngilizce gösterildiğini bildiren not (Learn'deki "Gysga wersiýa…" notu gibi). */
  fallback?: string;
};

const UI: Record<UiLocale, BlogUi> = {
  en: {
    eyebrow: "Blog",
    title: "Writing",
    description:
      "Decisions, standards and progress behind Tamga Network — digital trust for institutions, developers and states across the Turkic world.",
    rss: "RSS feed",
    count: (n) => `${n} ${n === 1 ? "post" : "posts"}`,
    filter: "Filter by category",
    all: "All",
    latest: "Latest",
    draft: "Draft",
    draftNote: "This post is a draft and is not published.",
    emptyFilter: "No posts in this category yet.",
    empty: "No posts yet.",
    readMore: "Keep reading",
    minRead: (n) => `${n} min read`,
    noDate: "Undated",
    updated: "Updated",
    toc: "On this page",
    related: "Related",
    relatedPost: "Post",
    relatedLearn: "Learn",
    relatedPage: "Tamga Network",
    copy: "Copy",
    copied: "Copied",
    code: "Code",
    author: "Tamga Network",
    allPosts: "All posts",
    back: "Back to all posts",
    ctaTitle: "Build on the network",
    ctaText: "Learn the concepts from scratch, or see how an institution, verifier, wallet or state joins.",
    ctaLearn: "Learn from scratch",
    ctaJoin: "Join the network",
  },
  tr: {
    eyebrow: "Blog",
    title: "Yazılar",
    description:
      "Tamga Network’ün ardındaki kararlar, standartlar ve ilerleme — Türk dünyasında kurumlar, geliştiriciler ve devletler için dijital güven.",
    rss: "RSS akışı",
    count: (n) => `${n} yazı`,
    filter: "Kategoriye göre süz",
    all: "Tümü",
    latest: "En yeni",
    draft: "Taslak",
    draftNote: "Bu yazı taslaktır, yayında değildir.",
    emptyFilter: "Bu kategoride henüz yazı yok.",
    empty: "Henüz yazı yok.",
    readMore: "Okumaya devam et",
    minRead: (n) => `${n} dk okuma`,
    noDate: "Tarihsiz",
    updated: "Güncellendi",
    toc: "Bu sayfada",
    related: "İlgili",
    relatedPost: "Yazı",
    relatedLearn: "Öğren",
    relatedPage: "Tamga Network",
    copy: "Kopyala",
    copied: "Kopyalandı",
    code: "Kod",
    author: "Tamga Network",
    allPosts: "Tüm yazılar",
    back: "Tüm yazılara dön",
    ctaTitle: "Ağın üzerine kurun",
    ctaText: "Kavramları sıfırdan öğrenin ya da bir kurumun, doğrulayıcının, cüzdanın ya da devletin ağa nasıl katıldığına bakın.",
    ctaLearn: "Sıfırdan öğren",
    ctaJoin: "Ağa katıl",
  },
  // TODO(tk): Türkmence metinler ana dili Türkmence olan biri tarafından gözden geçirilmeli.
  tk: {
    eyebrow: "Blog",
    title: "Ýazgylar",
    description:
      "Tamga Network-yň aňyrsyndaky kararlar, standartlar we öňegidişlik — türki dünýäsinde guramalar, işläp düzüjiler we döwletler üçin sanly ynam.",
    rss: "RSS akymy",
    count: (n) => `${n} ýazgy`,
    filter: "Kategoriýa boýunça süz",
    all: "Ählisi",
    latest: "Iň täze",
    draft: "Garalama",
    draftNote: "Bu ýazgy garalama, çap edilmedi.",
    emptyFilter: "Bu kategoriýada heniz ýazgy ýok.",
    empty: "Heniz ýazgy ýok.",
    readMore: "Okamagy dowam et",
    minRead: (n) => `${n} min okamak`,
    noDate: "Senesiz",
    updated: "Täzelendi",
    toc: "Bu sahypada",
    related: "Baglanyşykly",
    relatedPost: "Ýazgy",
    relatedLearn: "Öwren",
    relatedPage: "Tamga Network",
    copy: "Göçür",
    copied: "Göçürildi",
    code: "Kod",
    author: "Tamga Network",
    allPosts: "Ähli ýazgylar",
    back: "Ähli ýazgylara dolan",
    ctaTitle: "Toruň üstünde guruň",
    ctaText: "Düşünjeleri başdan öwreniň ýa-da gurama, barlaýjy, gapjyk ýa-da döwletiň tora nähili goşulýandygyny görüň.",
    ctaLearn: "Başdan öwren",
    ctaJoin: "Tora goşul",
    fallback: "Bu ýazgy heniz türkmen diline terjime edilmedi; iňlis dilindäki asyl nusgasy görkezilýär.",
  },
  az: {
    eyebrow: "Bloq",
    title: "Yazılar",
    description:
      "Tamga Network-un arxasında duran qərarlar, standartlar və irəliləyiş — türk dünyasında qurumlar, tərtibatçılar və dövlətlər üçün rəqəmsal etibar.",
    rss: "RSS lenti",
    count: (n) => `${n} yazı`,
    filter: "Kateqoriyaya görə süzün",
    all: "Hamısı",
    latest: "Ən yeni",
    draft: "Qaralama",
    draftNote: "Bu yazı qaralamadır və dərc olunmayıb.",
    emptyFilter: "Bu kateqoriyada hələ yazı yoxdur.",
    empty: "Hələ yazı yoxdur.",
    readMore: "Oxumağa davam edin",
    minRead: (n) => `${n} dəq oxuma`,
    noDate: "Tarixsiz",
    updated: "Yenilənib",
    toc: "Bu səhifədə",
    related: "Əlaqəli",
    relatedPost: "Yazı",
    relatedLearn: "Öyrənin",
    relatedPage: "Tamga Network",
    copy: "Kopyala",
    copied: "Kopyalandı",
    code: "Kod",
    author: "Tamga Network",
    allPosts: "Bütün yazılar",
    back: "Bütün yazılara qayıdın",
    ctaTitle: "Şəbəkə üzərində qurun",
    ctaText: "Anlayışları sıfırdan öyrənin və ya qurumun, yoxlayan tərəfin, rəqəmsal cüzdanın və ya dövlətin şəbəkəyə necə qoşulduğuna baxın.",
    ctaLearn: "Sıfırdan öyrənin",
    ctaJoin: "Şəbəkəyə qoşulun",
    fallback: "Bu yazı hələ Azərbaycan dilinə tərcümə olunmayıb; ingilis dilindəki əsli göstərilir.",
  },
};

export const getBlogUi = (locale: string): BlogUi => UI[pick(locale)];

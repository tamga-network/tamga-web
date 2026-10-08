/**
 * Blog arayüz metinleri ve kategoriler (üç dil). İstemci bileşenleri de bunu içe aktarabilir (node:fs yok).
 * Yeni kategori = BLOG_CATEGORIES + CATEGORY_LABELS (proje yönetimi onayıyla; kamuya açık yeni ad).
 */
export const BLOG_CATEGORIES = ["announcements", "network", "standards", "privacy", "europe"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

type UiLocale = "en" | "tr" | "tk";
const pick = (locale: string): UiLocale => (locale === "tr" || locale === "tk" ? locale : "en");

// TODO(tk): Türkmence kategori adları ana dili Türkmence olan biri tarafından gözden geçirilmeli.
const CATEGORY_LABELS: Record<BlogCategory, Record<UiLocale, string>> = {
  announcements: { en: "Announcements", tr: "Duyurular", tk: "Habarlar" },
  network: { en: "Network", tr: "Ağ", tk: "Tor" },
  standards: { en: "Standards", tr: "Standartlar", tk: "Standartlar" },
  privacy: { en: "Privacy", tr: "Gizlilik", tk: "Gizlinlik" },
  europe: { en: "Europe", tr: "Avrupa", tk: "Ýewropa" },
};

export const categoryLabel = (c: BlogCategory, locale: string) => CATEGORY_LABELS[c]?.[pick(locale)] ?? c;

/** "İlgili" kartlarında site sayfalarının adı (routing.ts'teki sabit yollar; adı olmayan yol olduğu gibi yazılır). */
const PAGE_LABELS: Record<string, Record<UiLocale, string>> = {
  "/": { en: "Tamga Network", tr: "Tamga Network", tk: "Tamga Network" },
  "/about": { en: "About", tr: "Hakkında", tk: "Biz barada" },
  "/manifesto": { en: "Manifesto", tr: "Manifesto", tk: "Manifest" },
  "/scenarios": { en: "Scenarios", tr: "Senaryolar", tk: "Ssenariýalar" },
  "/whitepaper": { en: "Whitepaper", tr: "Whitepaper", tk: "Whitepaper" },
  "/blog": { en: "Blog", tr: "Blog", tk: "Blog" },
  "/join": { en: "Join the network", tr: "Ağa katıl", tk: "Tora goşul" },
  "/network": { en: "The network", tr: "Ağ", tk: "Tor" },
  "/partners": { en: "Partners", tr: "Ortaklar", tk: "Hyzmatdaşlar" },
  "/events": { en: "Events", tr: "Etkinlikler", tk: "Çäreler" },
  "/roadmap": { en: "Roadmap", tr: "Yol haritası", tk: "Ýol kartasy" },
  "/changelog": { en: "Changelog", tr: "Değişiklikler", tk: "Üýtgeşmeler" },
  "/sdk": { en: "SDK", tr: "SDK", tk: "SDK" },
  "/brand": { en: "Brand", tr: "Marka", tk: "Marka" },
  "/learn": { en: "Learn", tr: "Öğren", tk: "Öwren" },
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
};

export const getBlogUi = (locale: string): BlogUi => UI[pick(locale)];

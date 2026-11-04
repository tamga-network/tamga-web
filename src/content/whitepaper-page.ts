import type { Locale } from "@/i18n/routing";
import { WHITEPAPER_INTRO, type WhitepaperIntroData } from "./whitepaper.generated";

/*
 * /whitepaper tanıtım sayfası: whitepaper sürüm 1.0 (Kasım 2026, genişletilmiş baskı) dört dilde PDF olarak yayımlanır
 * (public/whitepaper-<dil>.pdf; basım publications/md2typ.mjs + publications/build.ps1). Başlık, özet, bölüm listesi ve atıf
 * whitepaper.generated.ts'ten (scripts/whitepaper-intro.mjs ile Markdown kaynağından üretilir); burada yalnız sayfa
 * etiketleri ve PDF bilgileri durur. Sayfa sayıları ve boyutlar PDF'lerden ölçüldü — PDF yeniden basılınca güncelle.
 * Eski kısa whitepaper'ın tam metni (whitepaper.tsx) 2026-11-04'te kaldırıldı (git geçmişinde).
 */

export const WHITEPAPER_LOCALES = ["en", "tr", "tk", "az"] as const;

/** PDF sayfa sayısı ve boyutu (KB). */
export const WHITEPAPER_PDF: Record<Locale, { pages: number; sizeKb: number }> = {
  en: { pages: 137, sizeKb: 2477 },
  tr: { pages: 127, sizeKb: 2438 },
  tk: { pages: 136, sizeKb: 2552 },
  az: { pages: 131, sizeKb: 2495 },
};

export const whitepaperPdf = (lang: string) => `/whitepaper-${lang}.pdf`;

/** Yayın ayı (JSON-LD datePublished). */
export const WHITEPAPER_DATE = "2026-11";

type Ui = {
  metaDescription: string;
  eyebrow: string;
  mastheadSub: string;
  version: string;
  pages: (n: number) => string;
  open: string;
  download: string;
  otherLanguages: string;
  opensNewTab: string;
  contents: string;
  contentsNote: string;
  chapters: string;
  appendices: string;
  citeAs: string;
  license: string;
  licenseText: string;
  linkManifesto: string;
  linkLearn: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    metaDescription:
      "The Tamga Network whitepaper, version 1.0 (November 2026): a digital trust infrastructure for Türkiye and the Turkic world — how it works, why it was built this way and where it is going. Twenty-four chapters, PDF in four languages.",
    eyebrow: "Whitepaper",
    mastheadSub: "v1.0 · November 2026",
    version: "Version",
    pages: (n) => `${n} pages`,
    open: "Open PDF",
    download: "Download",
    otherLanguages: "Other languages",
    opensNewTab: "opens in a new tab",
    contents: "Contents",
    contentsNote: "Twenty-four chapters and five appendices. The full text is in the PDF.",
    chapters: "Chapters",
    appendices: "Appendices",
    citeAs: "Cite as",
    license: "Licence",
    licenseText: "You may share and adapt this work, including commercially, as long as you give credit.",
    linkManifesto: "Read the manifesto →",
    linkLearn: "Learn the concepts from scratch →",
  },
  tr: {
    metaDescription:
      "Tamga Network whitepaper'ı, sürüm 1.0 (Kasım 2026): Türkiye ve Türk dünyası için dijital güven altyapısı — nasıl çalışır, neden böyle seçildi, nereye gidiyor. Yirmi dört bölüm, dört dilde PDF.",
    eyebrow: "Whitepaper",
    mastheadSub: "v1.0 · Kasım 2026",
    version: "Sürüm",
    pages: (n) => `${n} sayfa`,
    open: "PDF'i aç",
    download: "İndir",
    otherLanguages: "Diğer diller",
    opensNewTab: "yeni sekmede açılır",
    contents: "İçindekiler",
    contentsNote: "Yirmi dört bölüm ve beş ek. Metnin tamamı PDF'te.",
    chapters: "Bölümler",
    appendices: "Ekler",
    citeAs: "Atıf",
    license: "Lisans",
    licenseText: "Kaynak gösterildiği sürece ticari amaçla da paylaşılabilir ve uyarlanabilir.",
    linkManifesto: "Manifestoyu oku →",
    linkLearn: "Kavramları sıfırdan öğren →",
  },
  tk: {
    metaDescription:
      "Tamga Network whitepaper-i, wersiýa 1.0 (Noýabr 2026): Türkiýe we türki dünýäsi üçin sanly ynam infrastrukturasy — nähili işleýär, näme üçin şeýle saýlandy, nirä barýar. Ýigrimi dört bölüm, dört dilde PDF.",
    eyebrow: "Whitepaper",
    mastheadSub: "v1.0 · Noýabr 2026",
    version: "Wersiýa",
    pages: (n) => `${n} sahypa`,
    open: "PDF-i aç",
    download: "Ýükle",
    otherLanguages: "Beýleki diller",
    opensNewTab: "täze goýmada açylýar",
    contents: "Mazmuny",
    contentsNote: "Ýigrimi dört bölüm we bäş goşmaça. Doly tekst PDF-de.",
    chapters: "Bölümler",
    appendices: "Goşmaçalar",
    citeAs: "Salgylanma",
    license: "Ygtyýarnama",
    licenseText: "Çeşme görkezilse, söwda maksady bilen hem paýlaşyp we uýgunlaşdyryp bolýar.",
    linkManifesto: "Manifesti oka →",
    linkLearn: "Düşünjeleri başdan öwren →",
  },
  az: {
    metaDescription:
      "Tamga Network whitepaper-i, versiya 1.0 (Noyabr 2026): Türkiyə və türk dünyası üçün rəqəmsal etibar infrastrukturu — necə işləyir, niyə belə seçilib, hara gedir. İyirmi dörd fəsil, dörd dildə PDF.",
    eyebrow: "Whitepaper",
    mastheadSub: "v1.0 · Noyabr 2026",
    version: "Versiya",
    pages: (n) => `${n} səhifə`,
    open: "PDF-i aç",
    download: "Yüklə",
    otherLanguages: "Digər dillər",
    opensNewTab: "yeni tabda açılır",
    contents: "Mündəricat",
    contentsNote: "İyirmi dörd fəsil və beş əlavə. Tam mətn PDF-dədir.",
    chapters: "Fəsillər",
    appendices: "Əlavələr",
    citeAs: "İstinad",
    license: "Lisenziya",
    licenseText: "Mənbə göstərildiyi halda kommersiya məqsədilə də paylaşıla və uyğunlaşdırıla bilər.",
    linkManifesto: "Manifesti oxuyun →",
    linkLearn: "Anlayışları sıfırdan öyrənin →",
  },
};

export type WhitepaperPage = WhitepaperIntroData & { ui: Ui; lang: Locale; pdf: { pages: number; sizeKb: number } };

export function getWhitepaperPage(locale: string): WhitepaperPage {
  const lang: Locale = (WHITEPAPER_LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : "en";
  return { ...WHITEPAPER_INTRO[lang]!, ui: UI[lang], lang, pdf: WHITEPAPER_PDF[lang] };
}

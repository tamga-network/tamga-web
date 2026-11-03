import type { Locale } from "@/i18n/routing";
import { evolutionOfDigitalIdentity } from "./evolution-of-digital-identity";
import type { Publication, PublicationVersion } from "./types";

export type { Publication, PublicationVersion } from "./types";

/**
 * Yayımlanmış çalışmalar. Yeni yazılar önceden hazırlanır (dosyası bu klasörde, PDF'i public/files/publications/), ama yalnız
 * proje yönetimi "yayınla" deyince buraya bir satır eklenir ve commit'e girer (src/content/team/README.md, "PDF ekleme").
 */
export const PUBLICATIONS: Publication[] = [evolutionOfDigitalIdentity]
  .filter((p) => p.versions.some((v) => v.file || v.url))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** Bir ekip üyesinin (slug) yazarı olduğu yayınlar. */
export const publicationsBy = (slug: string): Publication[] => PUBLICATIONS.filter((p) => p.authors.includes(slug));

/** Gösterilecek sürüm: sayfanın dilindeki sürüm, yoksa ilk (asıl) sürüm; diğerleri parantez içinde bağlantı olur. */
export const pickVersion = (p: Publication, locale: string): { main: PublicationVersion; others: PublicationVersion[] } => {
  const main = p.versions.find((v) => v.lang === locale) ?? p.versions[0]!;
  return { main, others: p.versions.filter((v) => v !== main && (v.file || v.url)) };
};

/** Yıla göre gruplama (yeniden eskiye). */
export const publicationsByYear = (): [string, Publication[]][] => {
  const m = new Map<string, Publication[]>();
  for (const p of PUBLICATIONS) {
    const y = p.date.slice(0, 4);
    m.set(y, [...(m.get(y) ?? []), p]);
  }
  return [...m.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
};

type Ui = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  open: string;
  download: string;
  external: string;
  abstract: string;
  license: string;
  otherLanguages: string;
  pages: (n: number) => string;
  kind: Record<Publication["kind"], string>;
  opensNewTab: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    title: "Publications",
    description: "Papers, reports and articles by the Tamga Network team, as PDFs.",
    eyebrow: "Research",
    lead: "Articles, papers and reports written by the Tamga Network team on digital identity, trust and the EU digital identity framework. Each work opens as a PDF.",
    open: "Open PDF",
    download: "Download",
    external: "Publisher page",
    abstract: "Abstract",
    license: "Licence",
    otherLanguages: "Other languages",
    pages: (n) => `${n} pages`,
    kind: {
      article: "Article",
      paper: "Paper",
      report: "Report",
      thesis: "Thesis",
      slides: "Slides",
      whitepaper: "White paper",
      other: "Document",
    },
    opensNewTab: "opens in a new tab",
  },
  tr: {
    title: "Akademik Çalışmalar",
    description: "Tamga Network ekibinin makaleleri, raporları ve çalışmaları (PDF).",
    eyebrow: "Araştırma",
    lead: "Tamga Network ekibinin dijital kimlik, güven ve AB dijital kimlik çerçevesi üzerine yazdığı makaleler, bildiriler ve raporlar. Her çalışma PDF olarak açılır.",
    open: "PDF'i aç",
    download: "İndir",
    external: "Yayın sayfası",
    abstract: "Özet",
    license: "Lisans",
    otherLanguages: "Diğer diller",
    pages: (n) => `${n} sayfa`,
    kind: {
      article: "Makale",
      paper: "Bildiri",
      report: "Rapor",
      thesis: "Tez",
      slides: "Sunum",
      whitepaper: "Teknik rapor",
      other: "Belge",
    },
    opensNewTab: "yeni sekmede açılır",
  },
  tk: {
    title: "Ylmy işler",
    description: "Tamga Network toparynyň makalalary, hasabatlary we ylmy işleri (PDF).",
    eyebrow: "Gözleg",
    lead: "Tamga Network toparynyň sanly şahsyýet, ynam we ÝB-niň sanly şahsyýet çarçuwasy barada ýazan makalalary, ylmy işleri we hasabatlary. Her iş PDF görnüşinde açylýar.",
    open: "PDF-i aç",
    download: "Ýükle",
    external: "Neşir sahypasy",
    abstract: "Gysgaça mazmuny",
    license: "Ygtyýarnama",
    otherLanguages: "Beýleki diller",
    pages: (n) => `${n} sahypa`,
    kind: {
      article: "Makala",
      paper: "Ylmy iş",
      report: "Hasabat",
      thesis: "Dissertasiýa",
      slides: "Prezentasiýa",
      whitepaper: "Tehniki hasabat",
      other: "Resminama",
    },
    opensNewTab: "täze goýmada açylýar",
  },
  az: {
    title: "Elmi işlər",
    description: "Tamga Network komandasının məqalələri, hesabatları və elmi işləri (PDF).",
    eyebrow: "Tədqiqat",
    lead: "Tamga Network komandasının rəqəmsal şəxsiyyət, etibar və AB rəqəmsal şəxsiyyət çərçivəsi haqqında yazdığı məqalələr, elmi işlər və hesabatlar. Hər iş PDF kimi açılır.",
    open: "PDF-i aç",
    download: "Yüklə",
    external: "Nəşr səhifəsi",
    abstract: "Xülasə",
    license: "Lisenziya",
    otherLanguages: "Digər dillər",
    pages: (n) => `${n} səhifə`,
    kind: {
      article: "Məqalə",
      paper: "Elmi məqalə",
      report: "Hesabat",
      thesis: "Dissertasiya",
      slides: "Təqdimat",
      whitepaper: "Texniki hesabat",
      other: "Sənəd",
    },
    opensNewTab: "yeni tabda açılır",
  },
};

export const pubUi = (locale: string): Ui => UI[locale as Locale] ?? UI.en;

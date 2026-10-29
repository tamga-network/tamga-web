import type { Locale } from "@/i18n/routing";
import { berkeKaratas } from "./berke-karatas";
import { turgayGultekin } from "./turgay-gultekin";
import type { LText, Publication, TeamMember, Writing } from "./types";

export type { LText, Publication, TeamMember, Writing } from "./types";

/** Ekip: yeni kişi = yeni dosya + bu listeye bir satır (README.md). */
export const TEAM: TeamMember[] = [berkeKaratas, turgayGultekin].sort((a, b) => a.order - b.order);

export const teamSlugs = () => TEAM.map((m) => m.slug);
export const memberBySlug = (slug: string) => TEAM.find((m) => m.slug === slug);

/** Dile göre metin; eksikse İngilizce. */
export const tx = (v: LText, locale: string) => v[locale as Locale] ?? v.en;
/** Tek metin ya da dile göre metin. */
export const txs = (v: string | LText, locale: string) => (typeof v === "string" ? v : tx(v, locale));

export const bioOf = (m: TeamMember, locale: string): string[] =>
  m.bio ? (m.bio[locale as Locale] ?? m.bio.en) : [];

/** Baş harfler (fotoğrafı olmayan kişinin simgesi). */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]!.toLocaleUpperCase("tr"))
    .slice(0, 2)
    .join("");

/** Yazılar ve yayınlar yeniden eskiye; adresi olmayan yazı gösterilmez. */
export const writingsOf = (m: TeamMember): Writing[] =>
  m.writings.filter((w) => w.url).sort((a, b) => (a.date < b.date ? 1 : -1));
export const publicationsOf = (m: TeamMember): Publication[] =>
  m.publications.filter((p) => p.file || p.url).sort((a, b) => (a.date < b.date ? 1 : -1));

/** Dil kodunun okunur adı (yayın ve yazı etiketleri). */
export const langName = (code: string, locale: string) => {
  try {
    const n = new Intl.DisplayNames([locale === "tk" ? "tk" : locale], { type: "language" }).of(code);
    return n ? n.charAt(0).toLocaleUpperCase(locale) + n.slice(1) : code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
};

type Ui = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  viewProfile: string;
  back: string;
  about: string;
  focus: string;
  expertise: string;
  education: string;
  experience: string;
  writings: string;
  publications: string;
  publicationsLead: string;
  links: string;
  open: string;
  download: string;
  external: string;
  abstract: string;
  pages: (n: number) => string;
  inPreparation: string;
  contactTitle: string;
  contactText: string;
  contactCta: string;
  venue: Record<Writing["venue"], string>;
  kind: Record<Publication["kind"], string>;
  opensNewTab: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    title: "Team",
    description: "The people building Tamga Network.",
    eyebrow: "About",
    lead: "The people building Tamga Network: the rules, the reference services and the relations with institutions.",
    viewProfile: "View profile",
    back: "Team",
    about: "About",
    focus: "Interests",
    expertise: "Areas of expertise",
    education: "Education",
    experience: "Background",
    writings: "Writings",
    publications: "Publications and documents",
    publicationsLead: "Papers, reports and slides. PDFs open in your browser's viewer.",
    links: "Links",
    open: "Open PDF",
    download: "Download",
    external: "Publisher page",
    abstract: "Abstract",
    pages: (n) => `${n} pages`,
    inPreparation: "This profile is being prepared. More details will appear here soon.",
    contactTitle: "Work with us",
    contactText: "Institutions, researchers and developers who want to take part in the network can reach us.",
    contactCta: "Contact",
    venue: {
      linkedin: "LinkedIn",
      "tamga-blog": "Tamga blog",
      medium: "Medium",
      journal: "Journal",
      other: "Article",
    },
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
    title: "Ekibimiz",
    description: "Tamga Network'ü kuran ekip.",
    eyebrow: "Hakkında",
    lead: "Tamga Network'ü kuran ekip: kurallar, referans hizmetler ve kurumlarla ilişkiler.",
    viewProfile: "Profili gör",
    back: "Ekibimiz",
    about: "Hakkında",
    focus: "İlgi alanları",
    expertise: "Uzmanlık alanları",
    education: "Eğitim",
    experience: "Geçmiş",
    writings: "Yazılar",
    publications: "Yayınlar ve belgeler",
    publicationsLead: "Makaleler, raporlar ve sunumlar. PDF'ler tarayıcınızın görüntüleyicisinde açılır.",
    links: "Bağlantılar",
    open: "PDF'i aç",
    download: "İndir",
    external: "Yayın sayfası",
    abstract: "Özet",
    pages: (n) => `${n} sayfa`,
    inPreparation: "Bu profil hazırlanıyor. Ayrıntılar yakında burada olacak.",
    contactTitle: "Bizimle çalışın",
    contactText: "Ağda yer almak isteyen kurumlar, araştırmacılar ve geliştiriciler bize yazabilir.",
    contactCta: "İletişim",
    venue: {
      linkedin: "LinkedIn",
      "tamga-blog": "Tamga blogu",
      medium: "Medium",
      journal: "Dergi",
      other: "Yazı",
    },
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
    title: "Toparymyz",
    description: "Tamga Network-y gurýan topar.",
    eyebrow: "Biz barada",
    lead: "Tamga Network-y gurýan topar: düzgünler, salgylanma hyzmatlary we guramalar bilen gatnaşyklar.",
    viewProfile: "Profile seret",
    back: "Toparymyz",
    about: "Barada",
    focus: "Gyzyklanmalary",
    expertise: "Hünär ugurlary",
    education: "Bilim",
    experience: "Tejribe",
    writings: "Ýazgylar",
    publications: "Neşirler we resminamalar",
    publicationsLead: "Makalalar, hasabatlar we prezentasiýalar. PDF faýllary brauzeriňiziň görkezijisinde açylýar.",
    links: "Salgylar",
    open: "PDF-i aç",
    download: "Ýükle",
    external: "Neşir sahypasy",
    abstract: "Gysgaça mazmuny",
    pages: (n) => `${n} sahypa`,
    inPreparation: "Bu profil taýýarlanýar. Jikme-jiklikler ýakynda şu ýerde bolar.",
    contactTitle: "Biziň bilen işläň",
    contactText: "Torda orun almak isleýän guramalar, gözlegçiler we programmistler bize ýazyp bilerler.",
    contactCta: "Aragatnaşyk",
    venue: {
      linkedin: "LinkedIn",
      "tamga-blog": "Tamga blogy",
      medium: "Medium",
      journal: "Žurnal",
      other: "Ýazgy",
    },
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
    title: "Komandamız",
    description: "Tamga Network-u quran komanda.",
    eyebrow: "Haqqımızda",
    lead: "Tamga Network-u quran komanda: qaydalar, istinad xidmətləri və qurumlarla əlaqələr.",
    viewProfile: "Profilə bax",
    back: "Komandamız",
    about: "Haqqında",
    focus: "Maraq sahələri",
    expertise: "İxtisas sahələri",
    education: "Təhsil",
    experience: "Təcrübə",
    writings: "Yazılar",
    publications: "Nəşrlər və sənədlər",
    publicationsLead: "Məqalələr, hesabatlar və təqdimatlar. PDF-lər brauzerinizin baxış pəncərəsində açılır.",
    links: "Keçidlər",
    open: "PDF-i aç",
    download: "Yüklə",
    external: "Nəşr səhifəsi",
    abstract: "Xülasə",
    pages: (n) => `${n} səhifə`,
    inPreparation: "Bu profil hazırlanır. Ətraflı məlumat tezliklə burada olacaq.",
    contactTitle: "Bizimlə işləyin",
    contactText: "Şəbəkədə iştirak etmək istəyən qurumlar, tədqiqatçılar və proqramçılar bizə yaza bilər.",
    contactCta: "Əlaqə",
    venue: {
      linkedin: "LinkedIn",
      "tamga-blog": "Tamga bloqu",
      medium: "Medium",
      journal: "Jurnal",
      other: "Yazı",
    },
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

export const teamUi = (locale: string): Ui => UI[locale as Locale] ?? UI.en;

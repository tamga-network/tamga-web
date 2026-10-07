import type { Locale } from "@/i18n/routing";
import type { L, LearnChapter, LearnPage } from "./types";
import { CHAPTER_1 } from "./01-identity";
import { CHAPTER_2 } from "./02-building-blocks";
import { CHAPTER_3 } from "./03-privacy";
import { CHAPTER_4 } from "./04-europe";
import { CHAPTER_5 } from "./05-trust-infrastructure";
import { CHAPTER_6 } from "./06-tamga-network";
import { CHAPTER_7 } from "./07-joining";

/*
 * Learn kaydı: bölümler, sıralı sayfalar, önceki/sonraki ve arayüz metinleri. Sayfa eklemek: ilgili bölüm dosyasına nesne
 * ekle (slug İngilizce, kısa); routing.ts'e `/learn/<slug>` satırı ekle. Sıra `chapter` + `order` ile belirlenir.
 */

export type { LearnPage, LearnChapter, Deeper, DiagramKey, L } from "./types";

export const CHAPTERS: LearnChapter[] = [
  {
    n: 1,
    key: "identity",
    title: {
      tr: "Kimlik ve güven",
      en: "Identity and trust",
      tk: "Şahsyýet we ynam",
    },
    intro: {
      tr: "Kimlik nedir, bugün neden zor, dijital dünyada güven nasıl kurulur.",
      en: "What identity is, why it is hard today and how trust is built in the digital world.",
      tk: "Şahsyýet näme, häzir näme üçin kyn we sanly dünýäde ynam nädip gurulýar.",
    },
  },
  {
    n: 2,
    key: "building-blocks",
    title: {
      tr: "Dijital belgenin yapı taşları",
      en: "Building blocks",
      tk: "Sanly resminamanyň esaslary",
    },
    intro: {
      tr: "İmza, sertifika, doğrulanabilir belge ve cüzdan: teknik ayrıntıya boğulmadan.",
      en: "Signatures, certificates, verifiable credentials and wallets, without drowning in detail.",
      tk: "Gol, sertifikat, barlanyp bilinýän resminama we gapjyk: jikme-jikliklere batman.",
    },
  },
  {
    n: 3,
    key: "privacy",
    title: {
      tr: "Gizlilik tasarımın içinde",
      en: "Privacy by design",
      tk: "Gizlinlik dizaýnyň içinde",
    },
    intro: {
      tr: "Yalnız gerekeni göstermek, iz bırakmamak ve kontrolün kişide kalması.",
      en: "Showing only what is needed, leaving no trail and keeping the person in control.",
      tk: "Diňe zerur zady görkezmek, yz galdyrmazlyk we gözegçiligiň adamda galmagy.",
    },
  },
  {
    n: 4,
    key: "europe",
    title: {
      tr: "Avrupa'nın modeli",
      en: "Europe's model",
      tk: "Ýewropanyň modeli",
    },
    intro: {
      tr: "eIDAS 2.0, EUDI Wallet ve güven hizmetleri: ağımızın konuştuğu ortak dil.",
      en: "eIDAS 2.0, the EUDI Wallet and trust services: the common language our network speaks.",
      tk: "eIDAS 2.0, EUDI Wallet we ynam hyzmatlary: torumyzyň gürleýän umumy dili.",
    },
  },
  {
    n: 5,
    key: "trust-infrastructure",
    title: {
      tr: "Güven altyapısı",
      en: "Trust infrastructure",
      tk: "Ynam infrastrukturasy",
    },
    intro: {
      tr: "Güven listeleri, federasyon ve blockchain'in bu resimdeki gerçek yeri.",
      en: "Trust lists, federation and where blockchain really fits in this picture.",
      tk: "Ynam sanawlary, federasiýa we blokçeýniň bu suratdaky hakyky ýeri.",
    },
  },
  {
    n: 6,
    key: "tamga-network",
    title: { tr: "Tamga Network", en: "Tamga Network", tk: "Tamga Network" },
    intro: {
      tr: "Ağın ne olduğu, kimin ne yaptığı, kuralları ve yönetişimi.",
      en: "What the network is, who does what, its rules and its governance.",
      tk: "Toruň näme bolýandygy, kimiň näme edýändigi, düzgünleri we dolandyryşy.",
    },
  },
  {
    n: 7,
    key: "joining",
    title: { tr: "Katılım", en: "Joining the network", tk: "Tora goşulmak" },
    intro: {
      tr: "Kurum, doğrulayıcı, cüzdan sağlayıcısı ya da devlet olarak ağa katılmak.",
      en: "Joining as an institution, a verifier, a wallet provider or a state.",
      tk: "Gurama, barlaýjy, gapjyk üpjün ediji ýa-da döwlet hökmünde tora goşulmak.",
    },
  },
];

export const LEARN_PAGES: LearnPage[] = [
  ...CHAPTER_1,
  ...CHAPTER_2,
  ...CHAPTER_3,
  ...CHAPTER_4,
  ...CHAPTER_5,
  ...CHAPTER_6,
  ...CHAPTER_7,
].sort((a, b) => a.chapter - b.chapter || a.order - b.order);

export const learnSlugs = (): string[] => LEARN_PAGES.map((p) => p.slug);
export const getLearnPage = (slug: string): LearnPage | undefined =>
  LEARN_PAGES.find((p) => p.slug === slug);
export const chapterPages = (n: number): LearnPage[] =>
  LEARN_PAGES.filter((p) => p.chapter === n);
export const getChapter = (n: number): LearnChapter | undefined =>
  CHAPTERS.find((c) => c.n === n);

export function adjacentLearn(slug: string): {
  prev?: LearnPage;
  next?: LearnPage;
} {
  const i = LEARN_PAGES.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: LEARN_PAGES[i - 1], next: LEARN_PAGES[i + 1] };
}

export const chapterMinutes = (n: number): number =>
  chapterPages(n).reduce((s, p) => s + p.minutes, 0);
export const totalMinutes = (): number =>
  LEARN_PAGES.reduce((s, p) => s + p.minutes, 0);

export const pickLocale = (raw: string): Locale =>
  ["en", "tr", "tk"].includes(raw) ? (raw as Locale) : "en";
export const t = (l: L, locale: Locale): string => l[locale] ?? l.en;

/* -------------------------------------------------------------------------- arayüz metinleri */

export type LearnUi = {
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  start: string;
  continueReading: string;
  chapter: string;
  chapters: string;
  pages: (n: number) => string;
  minutes: (n: number) => string;
  totalTime: (pages: number, minutes: number) => string;
  whereTitle: string;
  whereLead: string;
  roles: { key: string; title: string; text: string; target: number[] }[];
  pathTitle: string;
  summary: string;
  deeper: string;
  deeperLead: string;
  kinds: { docs: string; arf: string; site: string };
  prev: string;
  next: string;
  writing: string;
  writingNote: string;
  read: string;
  /** "{read}" ve "{total}" yer tutucularıyla */
  progress: string;
  contents: string;
  home: string;
  callout: { info: string; turkic: string; caution: string };
  backToPath: string;
  /** Gövde kısaltılmışsa sayfanın başında gösterilen not (şimdilik yalnız tk) */
  abridged?: string;
};

export const LEARN_UI: Record<Locale, LearnUi> = {
  tr: {
    name: "Öğren",
    title: "Öğren: dijital kimlikten Tamga Network'e",
    description:
      "Sıfırdan başlayan öğrenme yolu: dijital kimlik, imza, doğrulanabilir belge, gizlilik, Avrupa'nın modeli, güven listeleri ve Tamga Network'e katılım.",
    eyebrow: "Öğrenme yolu",
    heroTitle: "Dijital kimlikten Tamga Network'e",
    heroLead:
      "Hiçbir şey bilmeden başlayın. Kimlik nedir sorusundan ağa katılmaya kadar, yedi bölümde kısa sayfalar ve şemalarla ilerleyin. Her sayfa tek bir fikri anlatır; teknik ayrıntıyı merak ettiğiniz yerde geliştirici belgelerine ve Tamga ARF'ye geçersiniz.",
    start: "Baştan başla",
    continueReading: "Kaldığın yerden devam et",
    chapter: "Bölüm",
    chapters: "Bölümler",
    pages: (n) => `${n} sayfa`,
    minutes: (n) => `${n} dk`,
    totalTime: (p, m) =>
      `${p} sayfa · yaklaşık ${m >= 60 ? `${Math.floor(m / 60)} sa ${m % 60} dk` : `${m} dk`}`,
    whereTitle: "Nereden başlamalıyım?",
    whereLead:
      "Herkes baştan başlayabilir. Acelesi olanlar için rolüne göre kısa yollar:",
    roles: [
      {
        key: "manager",
        title: "Kurum yöneticisi",
        text: "Sorun, ağ ve katılım adımları.",
        target: [1, 6, 7],
      },
      {
        key: "developer",
        title: "Geliştirici",
        text: "Yapı taşları, sonra geliştirici belgeleri.",
        target: [2],
      },
      {
        key: "state",
        title: "Devlet temsilcisi",
        text: "Avrupa'nın modeli, güven altyapısı ve yönetişim.",
        target: [4, 5, 6],
      },
      {
        key: "curious",
        title: "Meraklı",
        text: "En baştan, sırayla.",
        target: [1],
      },
    ],
    pathTitle: "Yedi bölüm",
    summary: "Özet",
    deeper: "Daha derine",
    deeperLead: "Teknik ayrıntılar ve bağlayıcı kurallar:",
    kinds: {
      docs: "Geliştirici belgeleri",
      arf: "Tamga ARF",
      site: "Tamga Network",
    },
    prev: "Önceki",
    next: "Sonraki",
    writing: "Bu sayfa yazılıyor.",
    writingNote:
      "Kısa süre içinde burada olacak. Şimdilik özet ve bağlantılar aşağıda.",
    read: "okundu",
    progress: "{total} sayfadan {read} okundu",
    contents: "Bölümler",
    home: "Öğren",
    callout: { info: "Bilgi", turkic: "Türk dünyasında", caution: "Dikkat" },
    backToPath: "Öğrenme yoluna dön",
  },
  en: {
    name: "Learn",
    title: "Learn: from digital identity to Tamga Network",
    description:
      "A learning path that starts from zero: digital identity, signatures, verifiable credentials, privacy, Europe's model, trust lists and joining Tamga Network.",
    eyebrow: "Learning path",
    heroTitle: "From digital identity to Tamga Network",
    heroLead:
      'Start knowing nothing. From "what is identity?" to joining the network, move through seven chapters of short pages and diagrams. Each page explains one idea; wherever you want the technical detail, step over to the developer docs and Tamga ARF.',
    start: "Start from the beginning",
    continueReading: "Continue where you left off",
    chapter: "Chapter",
    chapters: "Chapters",
    pages: (n) => `${n} ${n === 1 ? "page" : "pages"}`,
    minutes: (n) => `${n} min`,
    totalTime: (p, m) =>
      `${p} pages · about ${m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`}`,
    whereTitle: "Where should I start?",
    whereLead:
      "Anyone can start at the beginning. Short paths by role for those in a hurry:",
    roles: [
      {
        key: "manager",
        title: "Institution manager",
        text: "The problem, the network and how to join.",
        target: [1, 6, 7],
      },
      {
        key: "developer",
        title: "Developer",
        text: "Building blocks, then the developer docs.",
        target: [2],
      },
      {
        key: "state",
        title: "State representative",
        text: "Europe's model, trust infrastructure and governance.",
        target: [4, 5, 6],
      },
      {
        key: "curious",
        title: "Curious",
        text: "From the start, in order.",
        target: [1],
      },
    ],
    pathTitle: "Seven chapters",
    summary: "Summary",
    deeper: "Go deeper",
    deeperLead: "Technical details and binding rules:",
    kinds: { docs: "Developer docs", arf: "Tamga ARF", site: "Tamga Network" },
    prev: "Previous",
    next: "Next",
    writing: "This page is being written.",
    writingNote:
      "It will be here soon. For now, the summary and links are below.",
    read: "read",
    progress: "{read} of {total} pages read",
    contents: "Chapters",
    home: "Learn",
    callout: {
      info: "Note",
      turkic: "In the Turkic world",
      caution: "Caution",
    },
    backToPath: "Back to the learning path",
  },
  tk: {
    name: "Öwren",
    title: "Öwren: sanly şahsyýetden Tamga Network-a",
    description:
      "Noldan başlaýan öwreniş ýoly: sanly şahsyýet, gol, barlanyp bilinýän resminama, gizlinlik, Ýewropanyň modeli, ynam sanawlary we Tamga Network-a goşulmak.",
    eyebrow: "Öwreniş ýoly",
    heroTitle: "Sanly şahsyýetden Tamga Network-a",
    heroLead:
      'Hiç zat bilmän başlaň. "Şahsyýet näme?" soragyndan tora goşulmaga çenli, ýedi bölümde gysga sahypalar we çyzgylar bilen öňe gidiň. Her sahypa bir pikiri düşündirýär; tehniki jikme-jiklik gerek bolanda işläp düzüjiler üçin resminamalara we Tamga ARF-e geçiň.',
    start: "Başdan başla",
    continueReading: "Galan ýeriňden dowam et",
    chapter: "Bölüm",
    chapters: "Bölümler",
    pages: (n) => `${n} sahypa`,
    minutes: (n) => `${n} min`,
    totalTime: (p, m) =>
      `${p} sahypa · takmynan ${m >= 60 ? `${Math.floor(m / 60)} sag ${m % 60} min` : `${m} min`}`,
    whereTitle: "Nireden başlamaly?",
    whereLead:
      "Her kim başdan başlap biler. Howlukýanlar üçin rola görä gysga ýollar:",
    roles: [
      {
        key: "manager",
        title: "Gurama ýolbaşçysy",
        text: "Mesele, tor we goşulyş ädimleri.",
        target: [1, 6, 7],
      },
      {
        key: "developer",
        title: "Işläp düzüji",
        text: "Esaslar, soňra işläp düzüjiler üçin resminamalar.",
        target: [2],
      },
      {
        key: "state",
        title: "Döwlet wekili",
        text: "Ýewropanyň modeli, ynam infrastrukturasy we dolandyryş.",
        target: [4, 5, 6],
      },
      {
        key: "curious",
        title: "Gyzyklanýan",
        text: "Başdan, yzygiderli.",
        target: [1],
      },
    ],
    pathTitle: "Ýedi bölüm",
    summary: "Gysgaça",
    deeper: "Has çuňňur",
    deeperLead: "Tehniki jikme-jiklikler we hökmany düzgünler:",
    kinds: {
      docs: "Işläp düzüjiler üçin",
      arf: "Tamga ARF",
      site: "Tamga Network",
    },
    prev: "Öňki",
    next: "Indiki",
    writing: "Bu sahypa ýazylýar.",
    writingNote:
      "Ýakynda şu ýerde bolar. Häzirlikçe gysgaça we baglanyşyklar aşakda.",
    read: "okaldy",
    progress: "{total} sahypadan {read} okaldy",
    contents: "Bölümler",
    home: "Öwren",
    callout: {
      info: "Bellik",
      turkic: "Türki dünýäsinde",
      caution: "Üns beriň",
    },
    backToPath: "Öwreniş ýoluna dolan",
    abridged: "Gysga wersiýa; doly tekst iňlis dilinde.",
  },
};

export const getLearnUi = (locale: string): LearnUi =>
  LEARN_UI[pickLocale(locale)];

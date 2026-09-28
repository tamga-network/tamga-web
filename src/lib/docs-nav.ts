import type { Locale } from "@/i18n/routing";
import type { Href } from "@/i18n/navigation";

type L = Record<Locale, string>;
type NavItemSrc = { href: Href; title: L };
type NavSectionSrc = { title: L; items: NavItemSrc[] };

export type DocLink = { title: string; href: Href };
export type DocSection = { title: string; items: DocLink[] };

const NAV: NavSectionSrc[] = [
  {
    title: { en: "Getting started", tr: "Başlangıç", tk: "Başlangyç" },
    items: [
      {
        href: "/docs",
        title: { en: "Overview", tr: "Genel Bakış", tk: "Umumy syn" },
      },
      {
        href: "/docs/why-new-model",
        title: {
          en: "Why a new model?",
          tr: "Neden yeni bir model?",
          tk: "Näme üçin täze model?",
        },
      },
    ],
  },
  {
    title: {
      en: "Concepts — from scratch",
      tr: "Kavramlar — sıfırdan",
      tk: "Düşünjeler — başdan",
    },
    items: [
      {
        href: "/docs/digital-identity",
        title: {
          en: "What is digital identity?",
          tr: "Dijital Kimlik nedir?",
          tk: "Sanly şahsyýet näme?",
        },
      },
      {
        href: "/docs/blockchain",
        title: {
          en: "What blockchain is (and isn’t)",
          tr: "Blockchain nedir (ve değildir)",
          tk: "Blokçeýn näme (we däl)",
        },
      },
      {
        href: "/docs/cryptography",
        title: {
          en: "Cryptography basics",
          tr: "Kriptografi temelleri",
          tk: "Kriptografiýa esaslary",
        },
      },
      {
        href: "/docs/did-vc",
        title: {
          en: "Credentials: X.509, SD-JWT VC, mdoc",
          tr: "Belgeler: X.509, SD-JWT VC, mdoc",
          tk: "Resminamalar: X.509, SD-JWT VC, mdoc",
        },
      },
      {
        href: "/docs/selective-disclosure",
        title: {
          en: "Selective disclosure and SD-JWT",
          tr: "Seçici ifşa ve SD-JWT",
          tk: "Saýlama açyklama we SD-JWT",
        },
      },
    ],
  },
  {
    title: {
      en: "How Tamga works",
      tr: "Tamga nasıl çalışır",
      tk: "Tamga nähili işleýär",
    },
    items: [
      {
        href: "/docs/how-tamga-works",
        title: {
          en: "Architecture: how Tamga runs",
          tr: "Mimari: Tamga nasıl çalışır",
          tk: "Arhitektura: Tamga nähili işleýär",
        },
      },
      {
        href: "/docs/trust-lists",
        title: {
          en: "Trust lists",
          tr: "Güven listeleri",
          tk: "Ynam sanawlary",
        },
      },
      {
        href: "/docs/eidas-eudi",
        title: {
          en: "eIDAS, EUDI and EBSI",
          tr: "eIDAS, EUDI ve EBSI",
          tk: "eIDAS, EUDI we EBSI",
        },
      },
      {
        href: "/docs/eudi-comparison",
        title: {
          en: "Tamga and the EUDI architecture",
          tr: "Tamga ve EUDI mimarisi",
          tk: "Tamga we EUDI arhitekturasy",
        },
      },
      {
        href: "/docs/tamga-id",
        title: {
          en: "TamgaID and the ecosystem",
          tr: "TamgaID ve ekosistem",
          tk: "TamgaID we ekoulgam",
        },
      },
      {
        href: "/docs/login-with-tamga",
        title: {
          en: "Sign in with TamgaID",
          tr: "TamgaID ile giriş",
          tk: "TamgaID bilen giriş",
        },
      },
    ],
  },
  {
    title: {
      en: "Advanced Architecture",
      tr: "İleri Mimari",
      tk: "Ösen Arhitektura",
    },
    items: [
      {
        href: "/docs/identity-layers",
        title: {
          en: "Three-layer identity and pseudonyms",
          tr: "Üç katmanlı kimlik ve pseudonym",
          tk: "Üç gatlakly şahsyýet we pseudonym",
        },
      },
      {
        href: "/docs/accountable-disclosure",
        title: {
          en: "Accountable disclosure (escrow)",
          tr: "Hesap verebilir ifşa (escrow)",
          tk: "Hasabatly açyklama (escrow)",
        },
      },
      {
        href: "/docs/recovery-revocation",
        title: {
          en: "Recovery and revocation",
          tr: "Kurtarma ve iptal",
          tk: "Dikeldiş we ýatyrylyş",
        },
      },
    ],
  },
  {
    title: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler" },
    items: [
      {
        href: "/docs/developers",
        title: { en: "Build with Tamga", tr: "Tamga ile geliştir", tk: "Tamga bilen düz" },
      },
    ],
  },
  {
    title: { en: "Reference", tr: "Referans", tk: "Salgy" },
    items: [
      {
        href: "/docs/glossary",
        title: { en: "Glossary", tr: "Sözlük", tk: "Sözlük" },
      },
    ],
  },
];

function loc(l: L, locale: string): string {
  return l[locale as Locale] ?? l.en;
}

export function getDocsNav(locale: string): DocSection[] {
  return NAV.map((s) => ({
    title: loc(s.title, locale),
    items: s.items.map((i) => ({ title: loc(i.title, locale), href: i.href })),
  }));
}

export function getDocsFlat(locale: string): DocLink[] {
  return getDocsNav(locale).flatMap((s) => s.items);
}

/** Locale-agnostic list of all doc hrefs (for sitemap etc.). */
export const docHrefs: Href[] = NAV.flatMap((s) => s.items.map((i) => i.href));

export function getAdjacent(href: string, locale: string) {
  const flat = getDocsFlat(locale);
  const i = flat.findIndex((d) => d.href === href);
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}

type DocsUi = { prev: string; next: string };
const DOCS_UI: Record<Locale, DocsUi> = {
  en: { prev: "Previous", next: "Next" },
  tr: { prev: "Önceki", next: "Sonraki" },
  tk: { prev: "Öňki", next: "Indiki" },
};
export function getDocsUi(locale: string): DocsUi {
  return DOCS_UI[locale as Locale] ?? DOCS_UI.en;
}

/* Üç kapı (ADR-0018): genel anlatım bu sitede, geliştirici belgeleri docs.tamga.network, Tamga ARF arf.tamga.network. */
export type DocDoor = { key: "general" | "developers" | "arf"; title: string; text: string; href?: Href; external?: string };

const DOORS: Record<Locale, { title: string; text: string }[]> = {
  en: [
    { title: "General", text: "Tamga explained from scratch: digital identity, eIDAS and EUDI, how Tamga works, scenarios." },
    { title: "Developer docs", text: "Integration guides, tested code examples, the @tamga-network packages and specifications." },
    { title: "Tamga ARF", text: "The Architecture and Reference Framework: roles, trust model, participant rules, attestation rulebooks." },
  ],
  tr: [
    { title: "Genel", text: "Tamga'yı sıfırdan anlatır: dijital kimlik, eIDAS ve EUDI, Tamga nasıl çalışır, senaryolar." },
    { title: "Geliştirici belgeleri", text: "Entegrasyon kılavuzları, testli kod örnekleri, @tamga-network paketleri ve spesifikasyonlar." },
    { title: "Tamga ARF", text: "Mimari ve Referans Çerçevesi: roller, güven modeli, katılımcı kuralları, belge kural kitapları." },
  ],
  tk: [
    { title: "Umumy", text: "Tamgany başdan düşündirýär: sanly şahsyýet, eIDAS we EUDI, Tamga nähili işleýär, ssenariler." },
    { title: "Işläp düzüjiler üçin resminamalar", text: "Integrasiýa gollanmalary, synagdan geçen kod mysallary, @tamga-network paketleri we spesifikasiýalar." },
    { title: "Tamga ARF", text: "Arhitektura we salgylanma çarçuwasy: rollar, ynam modeli, gatnaşyjy düzgünleri (iňlis we türk dillerinde)." },
  ],
};

export const DEV_DOCS_URL = "https://docs.tamga.network";
export function arfUrl(locale: string): string {
  return locale === "tr" ? "https://arf.tamga.network/tr/" : "https://arf.tamga.network/";
}

export function getDocDoors(locale: string): DocDoor[] {
  const d = DOORS[locale as Locale] ?? DOORS.en;
  return [
    { key: "general", ...d[0], href: "/docs" },
    { key: "developers", ...d[1], external: DEV_DOCS_URL },
    { key: "arf", ...d[2], external: arfUrl(locale) },
  ];
}

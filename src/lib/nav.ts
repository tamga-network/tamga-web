import {
  BadgeCheck,
  BookOpen,
  Boxes,
  CalendarDays,
  Braces,
  Building2,
  Code,
  FileBadge,
  FileText,
  Fingerprint,
  Handshake,
  GraduationCap,
  History,
  Info,
  Landmark,
  Link2,
  ListChecks,
  Mail,
  Map,
  Newspaper,
  Package,
  Palette,
  PenLine,
  Rocket,
  Scale,
  ScanLine,
  ShieldCheck,
  Smartphone,
  SquareTerminal,
  Ticket,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Href } from "@/i18n/navigation";
import { GithubIcon } from "@/components/github-icon";
import { DEV_LINKS, SUBDOMAINS } from "./ecosystem";

/*
 * Üst menü, telefon menüsü ve alt bilgi tek kaynaktan: MENUS. Her menü iki başlıklı grup + öne çıkan kart.
 * Kural: hiçbir hedef menülerde iki kez geçmez (öne çıkan kartlar dahil); kartın bağlantısı telefonda da madde olur.
 * ARF bağlantıları 1.0 adresleriyle yazıldı (/trust-framework, /rulebook, /rulebooks/*); canlıda ARF 1.0 yayına alınana
 * kadar 404 verirler.
 */

type L = Record<Locale, string>;

/** Simge kutusunun rengi (telefon menüsü) */
export type Tone = "primary" | "gold" | "accent" | "neutral";

/** Hedef: site içi bağlantı, dış adres ya da Tamga ARF sayfası (dile göre). */
export type Target = {
  /** site içi bağlantı */
  href?: Href;
  /** dış bağlantı (yeni sekme); docs.tamga.network adresleri okurun diline çevrilir */
  external?: string;
  /** Tamga ARF: dile göre adres */
  arf?: true;
  /** ARF içindeki sayfa (ör. "rulebook") */
  arfPath?: string;
  /** ARF sayfasındaki bölüm; başlık çapaları dile göre değişir (tk İngilizce ARF'yi açar) */
  arfHash?: L;
};

export type NavItem = Target & {
  title: L;
  desc: L;
  icon: LucideIcon;
  tone: Tone;
};

/** Açılır menünün sağındaki öne çıkan kart. */
export type Featured = Target & {
  eyebrow: L;
  title: L;
  text: L;
  /** kartın görseli: işaret, belge sayfası ya da kısa kod */
  visual: "mark" | "doc" | "code";
  code?: string;
  /** telefonda madde olarak gösterilirken simge */
  icon: LucideIcon;
};

export type MenuGroup = { label: L; items: NavItem[] };
export type Menu = {
  key: string;
  label: L;
  groups: [MenuGroup, MenuGroup];
  featured: Featured;
};

const docs = (path = "") => `${DEV_LINKS.devDocs}${path}`;

/* ------------------------------------------------------------------ Ağ */
const NETWORK_MENU: Menu = {
  key: "network",
  label: { en: "Network", tr: "Ağ", tk: "Tor" },
  groups: [
    {
      label: { en: "Network", tr: "Ağ", tk: "Tor" },
      items: [
        {
          title: {
            en: "Learn",
            tr: "Öğren",
            tk: "Öwren",
          },
          desc: {
            en: "From digital identity to Tamga Network, step by step.",
            tr: "Dijital kimlikten Tamga Network'e, adım adım.",
            tk: "Sanly şahsyýetden Tamga Network-a, ädimme-ädim.",
          },
          icon: GraduationCap,
          tone: "primary",
          href: "/learn",
        },
        {
          title: { en: "Scenarios", tr: "Senaryolar", tk: "Ssenariler" },
          desc: {
            en: "How it looks in daily life.",
            tr: "Günlük hayatta nasıl görünür.",
            tk: "Gündelik durmuşda nähili görünýär.",
          },
          icon: ScanLine,
          tone: "gold",
          href: "/scenarios",
        },
        {
          title: {
            en: "Trust lists",
            tr: "Güven listeleri",
            tk: "Ynam sanawlary",
          },
          desc: {
            en: "The live, signed lists — who is trusted.",
            tr: "Canlı, imzalı listeler: kime güvenilir.",
            tk: "Göni, gollanan sanawlar: kime ynanylýar.",
          },
          icon: ListChecks,
          tone: "accent",
          external: "https://trust.tamga.network/",
        },
      ],
    },
    {
      label: { en: "Status", tr: "Durum", tk: "Ýagdaý" },
      items: [
        {
          title: { en: "Roadmap", tr: "Yol haritası", tk: "Ýol kartasy" },
          desc: {
            en: "What is live and what comes next.",
            tr: "Ne yayında, sırada ne var.",
            tk: "Näme işleýär, indiki näme.",
          },
          icon: Map,
          tone: "primary",
          href: "/roadmap",
        },
        {
          title: {
            en: "Release notes",
            tr: "Sürüm notları",
            tk: "Wersiýa bellikleri",
          },
          desc: {
            en: "Every release of the network.",
            tr: "Ağın her sürümü.",
            tk: "Toruň her wersiýasy.",
          },
          icon: History,
          tone: "neutral",
          href: "/changelog",
        },
        {
          title: {
            en: "Network addresses",
            tr: "Ağ adresleri",
            tk: "Tor salgylary",
          },
          desc: {
            en: "Every address of the network, one page.",
            tr: "Ağın bütün adresleri, tek sayfada.",
            tk: "Toruň ähli salgylary, bir sahypada.",
          },
          icon: Boxes,
          tone: "accent",
          href: "/network",
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Featured", tr: "Öne çıkan", tk: "Saýlanan" },
    title: {
      en: "Read the whitepaper.",
      tr: "Whitepaper'ı oku.",
      tk: "Whitepaper-i okaň.",
    },
    text: {
      en: "The architecture, the trust model and the road ahead in one document.",
      tr: "Mimari, güven modeli ve yol haritası tek belgede.",
      tk: "Arhitektura, ynam modeli we ýol kartasy bir resminamada.",
    },
    visual: "doc",
    icon: FileText,
    href: "/whitepaper",
  },
};

/* ------------------------------------------------------------------ Kurallar */
const RULES_MENU: Menu = {
  key: "rules",
  label: { en: "Rules", tr: "Kurallar", tk: "Düzgünler" },
  groups: [
    {
      label: { en: "Framework", tr: "Çerçeve", tk: "Çarçuwa" },
      items: [
        {
          title: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF" },
          desc: {
            en: "Architecture and reference framework.",
            tr: "Mimari ve referans çerçevesi.",
            tk: "Arhitektura we salgylanma çarçuwasy.",
          },
          icon: Landmark,
          tone: "primary",
          arf: true,
          arfPath: "architecture",
        },
        {
          title: {
            en: "Trust Framework",
            tr: "Trust Framework",
            tk: "Trust Framework",
          },
          desc: {
            en: "Onboarding, compliance and agreements.",
            tr: "Katılım, uyum ve sözleşmeler.",
            tk: "Goşulyş, laýyklyk we şertnamalar.",
          },
          icon: ShieldCheck,
          tone: "accent",
          arf: true,
          arfPath: "trust-framework",
        },
        {
          title: {
            en: "Tamga Rulebook",
            tr: "Tamga Rulebook",
            tk: "Tamga Rulebook",
          },
          desc: {
            en: "Numbered rules for every role.",
            tr: "Her rol için numaralı kurallar.",
            tk: "Her rol üçin belgili düzgünler.",
          },
          icon: FileBadge,
          tone: "gold",
          arf: true,
          arfPath: "rulebook",
        },
      ],
    },
    {
      label: { en: "Rulebooks", tr: "Rulebook'lar", tk: "Rulebook-lar" },
      items: [
        {
          title: {
            en: "Education Rulebook",
            tr: "Education Rulebook",
            tk: "Education Rulebook",
          },
          desc: {
            en: "Diploma and student certificate.",
            tr: "Diploma ve öğrenci belgesi.",
            tk: "Diplom we talyp güwänamasy.",
          },
          icon: GraduationCap,
          tone: "primary",
          arf: true,
          arfPath: "rulebooks/education",
        },
        {
          title: {
            en: "Identity Rulebook",
            tr: "Identity Rulebook",
            tk: "Identity Rulebook",
          },
          desc: {
            en: "The Tamga identity credential.",
            tr: "Tamga kimlik belgesi.",
            tk: "Tamga şahsyýet resminamasy.",
          },
          icon: Fingerprint,
          tone: "accent",
          arf: true,
          arfPath: "rulebooks/identity",
        },
        {
          title: {
            en: "Event Ticket Rulebook",
            tr: "Event Ticket Rulebook",
            tk: "Event Ticket Rulebook",
          },
          desc: {
            en: "Tickets and gate checks.",
            tr: "Bilet ve kapı kontrolü.",
            tk: "Bilet we gapy barlagy.",
          },
          icon: Ticket,
          tone: "gold",
          arf: true,
          arfPath: "rulebooks/event-ticket",
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Tamga ARF 1.0", tr: "Tamga ARF 1.0", tk: "Tamga ARF 1.0" },
    title: { en: "Read ARF 1.0.", tr: "ARF 1.0'ı oku.", tk: "ARF 1.0-y okaň." },
    text: {
      en: "Every document, how to read them and where they sit next to the EU ARF.",
      tr: "Bütün belgeler, nasıl okunacağı ve AB ARF'nin yanında nerede durduğu.",
      tk: "Ähli resminamalar, nähili okalmaly we ÝB ARF-iň ýanynda nirede durýar.",
    },
    visual: "mark",
    icon: BookOpen,
    arf: true,
  },
};

/* ------------------------------------------------------------------ Yönetişim */
const GOVERNANCE_MENU: Menu = {
  key: "governance",
  label: { en: "Governance", tr: "Yönetişim", tk: "Dolandyryş" },
  groups: [
    {
      label: { en: "Governance", tr: "Yönetişim", tk: "Dolandyryş" },
      items: [
        {
          title: {
            en: "Governing bodies",
            tr: "Yönetişim organları",
            tk: "Dolandyryş edaralary",
          },
          desc: {
            en: "Who decides what, and with which powers.",
            tr: "Kim neye, hangi yetkiyle karar verir.",
            tk: "Kim nämäni, haýsy ygtyýar bilen çözýär.",
          },
          icon: Users,
          tone: "primary",
          arf: true,
          arfPath: "trust-framework",
          arfHash: {
            en: "_1-6-governing-bodies-and-powers",
            tr: "_1-6-yonetisim-organları-ve-yetkiler",
            tk: "_1-6-governing-bodies-and-powers",
          },
        },
        {
          title: {
            en: "Path to a foundation",
            tr: "Vakıf yolu",
            tk: "Gaznaçylyga ýol",
          },
          desc: {
            en: "When states join, a council or foundation forms.",
            tr: "Devletler katılınca konsey ya da vakıf kurulur.",
            tk: "Döwletler goşulanda geňeş ýa-da gaznaçylyk döreýär.",
          },
          icon: Landmark,
          tone: "gold",
          arf: true,
          arfPath: "architecture",
          arfHash: {
            en: "_8-3-governance-body",
            tr: "_8-3-yonetisim-kurumu",
            tk: "_8-3-governance-body",
          },
        },
        {
          title: {
            en: "Decision records",
            tr: "Karar kayıtları",
            tk: "Karar ýazgylary",
          },
          desc: {
            en: "Every closed decision, with its reasons.",
            tr: "Kapatılmış her karar, gerekçesiyle.",
            tk: "Her ýapylan karar, esaslandyrmasy bilen.",
          },
          icon: Scale,
          tone: "neutral",
          external: docs("/adr/"),
        },
      ],
    },
    {
      label: { en: "Ledger stage", tr: "Zincir aşaması", tk: "Zynjyr tapgyry" },
      items: [
        {
          title: {
            en: "What blockchain is",
            tr: "Blockchain nedir",
            tk: "Blokçeýn näme",
          },
          desc: {
            en: "A permissioned ledger, in plain words.",
            tr: "İzinli bir defter, sade anlatımla.",
            tk: "Rugsatly kitap, ýönekeý dilde.",
          },
          icon: Link2,
          tone: "accent",
          href: "/learn/what-is-blockchain",
        },
        {
          title: {
            en: "Moving to a shared ledger",
            tr: "Ortak deftere geçiş",
            tk: "Umumy kitaba geçiş",
          },
          desc: {
            en: "Comes with at least two independent operators.",
            tr: "En az iki bağımsız işletmeciyle gelir.",
            tk: "Azyndan iki garaşsyz operator bilen gelýär.",
          },
          icon: Waypoints,
          tone: "primary",
          arf: true,
          arfPath: "architecture",
          arfHash: {
            en: "_8-2-moving-to-the-shared-ledger",
            tr: "_8-2-ortak-deftere-gecis",
            tk: "_8-2-moving-to-the-shared-ledger",
          },
        },
        {
          title: {
            en: "Why not a blockchain yet",
            tr: "Neden henüz blockchain değil",
            tk: "Näme üçin entek blokçeýn däl",
          },
          desc: {
            en: "Signed lists first, the ledger later.",
            tr: "Önce imzalı listeler, defter sonra.",
            tk: "Ilki gollanan sanawlar, kitap soňra.",
          },
          icon: PenLine,
          tone: "gold",
          href: {
            pathname: "/blog/[slug]",
            params: { slug: "why-no-blockchain-yet" },
          },
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Today", tr: "Bugün", tk: "Şu gün" },
    title: {
      en: "A provisional operator today, a foundation tomorrow.",
      tr: "Bugün geçici işletmeci, yarın vakıf.",
      tk: "Şu gün wagtlaýyn operator, ertir gaznaçylyk.",
    },
    text: {
      en: "How the network is run now and how it is handed over.",
      tr: "Ağ bugün nasıl işletiliyor ve nasıl devredilecek.",
      tk: "Tor häzir nähili işledilýär we nähili tabşyrylar.",
    },
    visual: "mark",
    icon: Building2,
    href: { pathname: "/", hash: "governance" },
  },
};

/* ------------------------------------------------------------------ Geliştiriciler */
const DEV_MENU: Menu = {
  key: "dev",
  label: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler" },
  groups: [
    {
      label: { en: "Start", tr: "Başla", tk: "Başla" },
      items: [
        {
          title: { en: "Docs", tr: "Belgeler", tk: "Resminamalar" },
          desc: {
            en: "Guides, concepts and specifications.",
            tr: "Rehberler, kavramlar ve şartnameler.",
            tk: "Gollanmalar, düşünjeler we spesifikasiýalar.",
          },
          icon: BookOpen,
          tone: "primary",
          external: docs(),
        },
        {
          title: { en: "Get started", tr: "Başlarken", tk: "Başlamak" },
          desc: {
            en: "Which package for which role.",
            tr: "Hangi rol için hangi paket.",
            tk: "Haýsy rol üçin haýsy paket.",
          },
          icon: Rocket,
          tone: "accent",
          external: docs("/guides/"),
        },
        {
          title: {
            en: "Code examples",
            tr: "Kod örnekleri",
            tk: "Kod mysallary",
          },
          desc: {
            en: "Tested examples with the real packages.",
            tr: "Gerçek paketlerle, testli örnekler.",
            tk: "Hakyky paketler bilen synagdan geçen mysallar.",
          },
          icon: Code,
          tone: "gold",
          external: docs("/guides/code-examples"),
        },
      ],
    },
    {
      label: { en: "Tools", tr: "Araçlar", tk: "Gurallar" },
      items: [
        {
          title: { en: "Packages", tr: "Paketler", tk: "Paketler" },
          desc: {
            en: "Open-source @tamga-network packages.",
            tr: "Açık kaynak @tamga-network paketleri.",
            tk: "Açyk çeşmeli @tamga-network paketleri.",
          },
          icon: Package,
          tone: "gold",
          href: "/sdk",
        },
        {
          title: {
            en: "API reference",
            tr: "API başvurusu",
            tk: "API salgylanmasy",
          },
          desc: {
            en: "Hosted issuing and verification APIs.",
            tr: "Barındırılan belge verme ve doğrulama API'leri.",
            tk: "Ýerleşdirilen resminama beriş we barlag API-leri.",
          },
          icon: Braces,
          tone: "accent",
          external: DEV_LINKS.apiRef,
        },
        {
          title: { en: "GitHub", tr: "GitHub", tk: "GitHub" },
          desc: {
            en: "Source code, issues and releases.",
            tr: "Kaynak kod, konular ve sürümler.",
            tk: "Çeşme kody, meseleler we wersiýalar.",
          },
          icon: GithubIcon,
          tone: "neutral",
          external: DEV_LINKS.github,
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Quick start", tr: "Hızlı başlangıç", tk: "Çalt başlangyç" },
    title: {
      en: "Verify in five minutes.",
      tr: "Beş dakikada doğrulama.",
      tk: "Bäş minutda barlag.",
    },
    text: {
      en: "Two packages and a signed trust list.",
      tr: "İki paket ve imzalı bir güven listesi.",
      tk: "Iki paket we gollanan ynam sanawy.",
    },
    visual: "code",
    code: "npm install\n  @tamga-network/verifier\n  @tamga-network/trust",
    icon: SquareTerminal,
    external: docs("/guides/verify-on-server"),
  },
};

/* ------------------------------------------------------------------ Hakkında */
const ABOUT_MENU: Menu = {
  key: "about",
  label: { en: "About", tr: "Hakkında", tk: "Biz barada" },
  groups: [
    {
      label: { en: "Tamga", tr: "Tamga", tk: "Tamga" },
      items: [
        {
          title: { en: "About", tr: "Hakkında", tk: "Biz barada" },
          desc: {
            en: "The name, the mission, the positioning.",
            tr: "Ad, misyon ve konumlanma.",
            tk: "At, missiýa we orny.",
          },
          icon: Info,
          tone: "primary",
          href: "/about",
        },
        {
          title: { en: "Partners", tr: "Partnerler", tk: "Hyzmatdaşlar" },
          desc: {
            en: "Institutions and organisations that joined the network.",
            tr: "Ağa katılan kurumlar ve kuruluşlar.",
            tk: "Tora goşulan guramalar we edaralar.",
          },
          icon: Handshake,
          tone: "gold",
          href: "/partners",
        },
        {
          title: { en: "Brand", tr: "Marka", tk: "Marka" },
          desc: {
            en: "Mark, colours, type and downloads.",
            tr: "İşaret, renkler, yazı ve indirmeler.",
            tk: "Nyşan, reňkler, şrift we ýüklemeler.",
          },
          icon: Palette,
          tone: "neutral",
          href: "/brand",
        },
      ],
    },
    {
      label: {
        en: "News and contact",
        tr: "Haber ve iletişim",
        tk: "Habarlar we aragatnaşyk",
      },
      items: [
        {
          title: { en: "Blog", tr: "Blog", tk: "Blog" },
          desc: {
            en: "Notes on the network, the rules and the work.",
            tr: "Ağ, kurallar ve çalışmalar üzerine notlar.",
            tk: "Tor, düzgünler we işler barada bellikler.",
          },
          icon: Newspaper,
          tone: "neutral",
          href: "/blog",
        },
        {
          title: { en: "Contact", tr: "İletişim", tk: "Aragatnaşyk" },
          desc: {
            en: "General questions and joining.",
            tr: "Genel sorular ve katılım.",
            tk: "Umumy soraglar we goşulyş.",
          },
          icon: Mail,
          tone: "primary",
          href: { pathname: "/about", hash: "contact" },
        },
        {
          title: { en: "Events", tr: "Etkinlikler", tk: "Çäreler" },
          desc: {
            en: "Talks, workshops and meetings we run or join.",
            tr: "Düzenlediğimiz ve katıldığımız konuşmalar, atölyeler.",
            tk: "Geçirýän we gatnaşýan çykyşlarymyz, okuw duşuşyklary.",
          },
          icon: CalendarDays,
          tone: "accent",
          href: "/events",
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Manifesto", tr: "Manifesto", tk: "Manifest" },
    title: {
      en: "Read the manifesto.",
      tr: "Manifestoyu oku.",
      tk: "Manifesti okaň.",
    },
    text: {
      en: "We are building the modern counterpart of the ancient seal.",
      tr: "Kadim mührün çağdaş karşılığını inşa ediyoruz.",
      tk: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys.",
    },
    visual: "mark",
    icon: PenLine,
    href: "/manifesto",
  },
};

/** Üst menü sırası: Ağ · Kurallar · Geliştiriciler · Yönetişim · Hakkında (Blog, Hakkında'nın içinde). */
export const MENUS: Menu[] = [
  NETWORK_MENU,
  RULES_MENU,
  DEV_MENU,
  GOVERNANCE_MENU,
  ABOUT_MENU,
];

/** Öne çıkan kartın telefon menüsü ve alt bilgi için madde hâli (kart yalnız masaüstünde görünür). */
export const featuredItem = (m: Menu): NavItem => {
  const { eyebrow, title, text, visual, code, icon, ...target } = m.featured;
  void eyebrow;
  void visual;
  void code;
  return {
    ...target,
    title: stripDot(title),
    desc: text,
    icon,
    tone: "primary",
  };
};
const stripDot = (t: L): L => ({
  en: t.en.replace(/\.$/, ""),
  tr: t.tr.replace(/\.$/, ""),
  tk: t.tk.replace(/\.$/, ""),
});

/** Alt bilgi ve telefon menüsü için: bir menünün bütün maddeleri, öne çıkan kart sonda. */
export const menuItems = (m: Menu): NavItem[] => [
  ...m.groups[0].items,
  ...m.groups[1].items,
  featuredItem(m),
];

/** Ağ adresleri: alt alan adları, simgeleriyle */
export const HOST_ICON: Record<string, { icon: LucideIcon; tone: Tone }> = {
  "docs.tamga.network": { icon: BookOpen, tone: "primary" },
  "arf.tamga.network": { icon: Landmark, tone: "neutral" },
  "trust.tamga.network": { icon: ListChecks, tone: "accent" },
  "schemas.tamga.network": { icon: FileBadge, tone: "gold" },
  "status.tamga.network": { icon: BadgeCheck, tone: "accent" },
  "issuer.tamga.network": { icon: Boxes, tone: "primary" },
  "console.tamga.network": { icon: Building2, tone: "gold" },
  "verify.tamga.network": { icon: ScanLine, tone: "accent" },
  "id.tamga.network": { icon: Fingerprint, tone: "primary" },
  "wallet.tamga.network": { icon: Smartphone, tone: "neutral" },
};
export const ECOSYSTEM_MENU = SUBDOMAINS.filter((s) => s.group !== "learn");

export const TONE_CLS: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary ring-primary/20",
  gold: "bg-gold-bright/10 text-gold-bright ring-gold-bright/25",
  accent: "bg-accent/10 text-accent ring-accent/25",
  neutral: "bg-surface-2 text-foreground-muted ring-border",
};

export const MENU_LABELS: Record<
  Locale,
  { ecosystem: string; joinCta: string; soon: string; social: string }
> = {
  en: {
    ecosystem: "Network addresses",
    joinCta: "Join the network",
    soon: "Soon",
    social: "Social media",
  },
  tr: {
    ecosystem: "Ağ adresleri",
    joinCta: "Ağa katıl",
    soon: "Yakında",
    social: "Sosyal medya",
  },
  tk: {
    ecosystem: "Tor salgylary",
    joinCta: "Tora goşul",
    soon: "Ýakynda",
    social: "Sosial media",
  },
};

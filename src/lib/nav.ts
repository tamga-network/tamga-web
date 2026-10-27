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
  FlaskConical,
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
import { SANDBOX_HOST, SANDBOX_URL } from "./docs-nav";

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
  label: { en: "Network", tr: "Ağ", tk: "Tor", az: "Şəbəkə" },
  groups: [
    {
      label: { en: "Network", tr: "Ağ", tk: "Tor", az: "Şəbəkə" },
      items: [
        {
          title: {
            en: "Learn",
            tr: "Öğren",
            tk: "Öwren",
            az: "Öyrənin",
          },
          desc: {
            en: "From digital identity to Tamga Network, step by step.",
            tr: "Dijital kimlikten Tamga Network'e, adım adım.",
            tk: "Sanly şahsyýetden Tamga Network-a, ädimme-ädim.",
            az: "Rəqəmsal şəxsiyyətdən Tamga Network-a, addım-addım.",
          },
          icon: GraduationCap,
          tone: "primary",
          href: "/learn",
        },
        {
          title: { en: "Scenarios", tr: "Senaryolar", tk: "Ssenariler", az: "Ssenarilər" },
          desc: {
            en: "How it looks in daily life.",
            tr: "Günlük hayatta nasıl görünür.",
            tk: "Gündelik durmuşda nähili görünýär.",
            az: "Gündəlik həyatda necə görünür.",
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
            az: "Etibar siyahıları",
          },
          desc: {
            en: "The live, signed lists that show who is trusted.",
            tr: "Kime güvenildiğini gösteren canlı, imzalı listeler.",
            tk: "Kime ynanylýandygyny görkezýän janly, gol çekilen sanawlar.",
            az: "Kimə etibar edildiyini göstərən canlı, imzalanmış siyahılar.",
          },
          icon: ListChecks,
          tone: "accent",
          external: "https://trust.tamga.network/",
        },
      ],
    },
    {
      label: { en: "Status", tr: "Durum", tk: "Ýagdaý", az: "Vəziyyət" },
      items: [
        {
          title: { en: "Roadmap", tr: "Yol haritası", tk: "Ýol kartasy", az: "Yol xəritəsi" },
          desc: {
            en: "What is live and what comes next.",
            tr: "Ne yayında, sırada ne var.",
            tk: "Näme işleýär, indiki näme.",
            az: "Nə işləyir, sırada nə var.",
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
            az: "Buraxılış qeydləri",
          },
          desc: {
            en: "Every release of the network.",
            tr: "Ağın her sürümü.",
            tk: "Toruň her wersiýasy.",
            az: "Şəbəkənin hər buraxılışı.",
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
            az: "Şəbəkə ünvanları",
          },
          desc: {
            en: "Every address of the network, one page.",
            tr: "Ağın bütün adresleri, tek sayfada.",
            tk: "Toruň ähli salgylary, bir sahypada.",
            az: "Şəbəkənin bütün ünvanları, bir səhifədə.",
          },
          icon: Boxes,
          tone: "accent",
          href: "/network",
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Featured", tr: "Öne çıkan", tk: "Saýlanan", az: "Seçilmiş" },
    title: {
      en: "Read the whitepaper.",
      tr: "Whitepaper'ı oku.",
      tk: "Whitepaper-i okaň.",
      az: "Whitepaper-i oxuyun.",
    },
    text: {
      en: "The architecture, the trust model and the road ahead in one document.",
      tr: "Mimari, güven modeli ve yol haritası tek belgede.",
      tk: "Arhitektura, ynam modeli we ýol kartasy bir resminamada.",
      az: "Arxitektura, etibar modeli və yol xəritəsi bir sənəddə.",
    },
    visual: "doc",
    icon: FileText,
    href: "/whitepaper",
  },
};

/* ------------------------------------------------------------------ Kurallar */
const RULES_MENU: Menu = {
  key: "rules",
  label: { en: "Rules", tr: "Kurallar", tk: "Düzgünler", az: "Qaydalar" },
  groups: [
    {
      label: { en: "Framework", tr: "Çerçeve", tk: "Çarçuwa", az: "Çərçivə" },
      items: [
        {
          title: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF", az: "Tamga ARF" },
          desc: {
            en: "Architecture and reference framework.",
            tr: "Mimari ve referans çerçevesi.",
            tk: "Arhitektura we salgylanma çarçuwasy.",
            az: "Arxitektura və istinad çərçivəsi.",
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
            az: "Trust Framework",
          },
          desc: {
            en: "Onboarding, compliance and agreements.",
            tr: "Katılım, uyum ve sözleşmeler.",
            tk: "Goşulyş, laýyklyk we şertnamalar.",
            az: "Qoşulma, uyğunluq və müqavilələr.",
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
            az: "Tamga Rulebook",
          },
          desc: {
            en: "Numbered rules for every role.",
            tr: "Her rol için numaralı kurallar.",
            tk: "Her rol üçin belgili düzgünler.",
            az: "Hər rol üçün nömrələnmiş qaydalar.",
          },
          icon: FileBadge,
          tone: "gold",
          arf: true,
          arfPath: "rulebook",
        },
      ],
    },
    {
      label: { en: "Rulebooks", tr: "Rulebook'lar", tk: "Rulebook-lar", az: "Rulebook-lar" },
      items: [
        {
          title: {
            en: "Education Rulebook",
            tr: "Education Rulebook",
            tk: "Education Rulebook",
            az: "Education Rulebook",
          },
          desc: {
            en: "Diploma and student certificate.",
            tr: "Diploma ve öğrenci belgesi.",
            tk: "Diplom we talyp güwänamasy.",
            az: "Diplom və tələbə arayışı.",
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
            az: "Identity Rulebook",
          },
          desc: {
            en: "The Tamga identity credential.",
            tr: "Tamga kimlik belgesi.",
            tk: "Tamga şahsyýet resminamasy.",
            az: "Tamga şəxsiyyət rəqəmsal sənədi.",
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
            az: "Event Ticket Rulebook",
          },
          desc: {
            en: "Tickets and gate checks.",
            tr: "Bilet ve kapı kontrolü.",
            tk: "Bilet we gapy barlagy.",
            az: "Biletlər və giriş yoxlaması.",
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
    eyebrow: { en: "Tamga ARF 1.0", tr: "Tamga ARF 1.0", tk: "Tamga ARF 1.0", az: "Tamga ARF 1.0" },
    title: { en: "Read ARF 1.0.", tr: "ARF 1.0'ı oku.", tk: "ARF 1.0-y okaň.", az: "ARF 1.0 sənədini oxuyun." },
    text: {
      en: "Every document, how to read them and where they sit next to the EU ARF.",
      tr: "Bütün belgeler, nasıl okunacağı ve AB ARF'nin yanında nerede durduğu.",
      tk: "Ähli resminamalar, nähili okalmaly we ÝB ARF-iň ýanynda nirede durýar.",
      az: "Bütün sənədlər, onların necə oxunacağı və Avropa İttifaqı (Aİ) ARF-inin yanında hansı yeri tutduqları.",
    },
    visual: "mark",
    icon: BookOpen,
    arf: true,
  },
};

/* ------------------------------------------------------------------ Yönetişim */
const GOVERNANCE_MENU: Menu = {
  key: "governance",
  label: { en: "Governance", tr: "Yönetişim", tk: "Dolandyryş", az: "İdarəetmə" },
  groups: [
    {
      label: { en: "Governance", tr: "Yönetişim", tk: "Dolandyryş", az: "İdarəetmə" },
      items: [
        {
          title: {
            en: "Governing bodies",
            tr: "Yönetişim organları",
            tk: "Dolandyryş edaralary",
            az: "İdarəetmə orqanları",
          },
          desc: {
            en: "Who decides what, and with which powers.",
            tr: "Kim neye, hangi yetkiyle karar verir.",
            tk: "Kim nämäni, haýsy ygtyýar bilen çözýär.",
            az: "Kim nəyə və hansı səlahiyyətlə qərar verir.",
          },
          icon: Users,
          tone: "primary",
          arf: true,
          arfPath: "trust-framework",
          arfHash: {
            en: "_1-6-governing-bodies-and-powers",
            tr: "_1-6-yonetisim-organları-ve-yetkiler",
            tk: "_1-6-governing-bodies-and-powers",
            az: "_1-6-governing-bodies-and-powers",
          },
        },
        {
          title: {
            en: "Path to a foundation",
            tr: "Vakıf yolu",
            tk: "Gaznaçylyga ýol",
            az: "Fonda doğru yol",
          },
          desc: {
            en: "When states join, a council or foundation forms.",
            tr: "Devletler katılınca konsey ya da vakıf kurulur.",
            tk: "Döwletler goşulanda geňeş ýa-da gaznaçylyk döreýär.",
            az: "Dövlətlər qoşulduqda şura və ya fond yaradılır.",
          },
          icon: Landmark,
          tone: "gold",
          arf: true,
          arfPath: "architecture",
          arfHash: {
            en: "_8-3-governance-body",
            tr: "_8-3-yonetisim-kurumu",
            tk: "_8-3-governance-body",
            az: "_8-3-governance-body",
          },
        },
        {
          title: {
            en: "Decision records",
            tr: "Karar kayıtları",
            tk: "Karar ýazgylary",
            az: "Qərar qeydləri",
          },
          desc: {
            en: "Every closed decision, with its reasons.",
            tr: "Kapatılmış her karar, gerekçesiyle.",
            tk: "Her ýapylan karar, esaslandyrmasy bilen.",
            az: "Bağlanmış hər qərar, əsaslandırması ilə.",
          },
          icon: Scale,
          tone: "neutral",
          external: docs("/adr/"),
        },
      ],
    },
    {
      label: { en: "Ledger stage", tr: "Zincir aşaması", tk: "Zynjyr tapgyry", az: "Reyestr mərhələsi" },
      items: [
        {
          title: {
            en: "What blockchain is",
            tr: "Blockchain nedir",
            tk: "Blokçeýn näme",
            az: "Blokçeyn nədir",
          },
          desc: {
            en: "A permissioned ledger, in plain words.",
            tr: "İzinli bir defter, sade anlatımla.",
            tk: "Rugsatly kitap, ýönekeý dilde.",
            az: "İcazəli reyestr, sadə dillə.",
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
            az: "Ortaq reyestrə keçid",
          },
          desc: {
            en: "Comes with at least two independent operators.",
            tr: "En az iki bağımsız işletmeciyle gelir.",
            tk: "Azyndan iki garaşsyz operator bilen gelýär.",
            az: "Ən azı iki müstəqil operatorla başlayır.",
          },
          icon: Waypoints,
          tone: "primary",
          arf: true,
          arfPath: "architecture",
          arfHash: {
            en: "_8-2-moving-to-the-shared-ledger",
            tr: "_8-2-ortak-deftere-gecis",
            tk: "_8-2-moving-to-the-shared-ledger",
            az: "_8-2-moving-to-the-shared-ledger",
          },
        },
        {
          title: {
            en: "Why not a blockchain yet",
            tr: "Neden henüz blockchain değil",
            tk: "Näme üçin entek blokçeýn däl",
            az: "Niyə hələ blokçeyn deyil",
          },
          desc: {
            en: "Signed lists first, the ledger later.",
            tr: "Önce imzalı listeler, defter sonra.",
            tk: "Ilki gollanan sanawlar, kitap soňra.",
            az: "Əvvəl imzalı siyahılar, reyestr sonra.",
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
    eyebrow: { en: "Today", tr: "Bugün", tk: "Şu gün", az: "Bu gün" },
    title: {
      en: "A provisional operator today, a foundation tomorrow.",
      tr: "Bugün geçici işletmeci, yarın vakıf.",
      tk: "Şu gün wagtlaýyn operator, ertir gaznaçylyk.",
      az: "Bu gün müvəqqəti operator, sabah fond.",
    },
    text: {
      en: "How the network is run now and how it is handed over.",
      tr: "Ağ bugün nasıl işletiliyor ve nasıl devredilecek.",
      tk: "Tor häzir nähili işledilýär we nähili tabşyrylar.",
      az: "Şəbəkə indi necə idarə olunur və necə təhvil veriləcək.",
    },
    visual: "mark",
    icon: Building2,
    href: { pathname: "/", hash: "governance" },
  },
};

/* ------------------------------------------------------------------ Geliştiriciler */
const DEV_MENU: Menu = {
  key: "dev",
  label: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler", az: "Tərtibatçılar" },
  groups: [
    {
      label: { en: "Start", tr: "Başla", tk: "Başla", az: "Başlanğıc" },
      items: [
        {
          title: { en: "Docs", tr: "Belgeler", tk: "Resminamalar", az: "Sənədləşmə" },
          desc: {
            en: "Guides, concepts and specifications.",
            tr: "Rehberler, kavramlar ve şartnameler.",
            tk: "Gollanmalar, düşünjeler we spesifikasiýalar.",
            az: "Bələdçilər, anlayışlar və spesifikasiyalar.",
          },
          icon: BookOpen,
          tone: "primary",
          external: docs(),
        },
        {
          title: { en: "Get started", tr: "Başlarken", tk: "Başlamak", az: "Başlamaq" },
          desc: {
            en: "Which package for which role.",
            tr: "Hangi rol için hangi paket.",
            tk: "Haýsy rol üçin haýsy paket.",
            az: "Hansı rol üçün hansı paket.",
          },
          icon: Rocket,
          tone: "accent",
          external: docs("/guides/"),
        },
        {
          title: { en: "Sandbox", tr: "Sandbox", tk: "Sandbox", az: "Sandbox" },
          desc: {
            en: "Test network for wallet, institution and verifier developers: sample institutions and credentials.",
            tr: "Cüzdan, kurum ve doğrulayıcı geliştiricileri için test ağı: örnek kurumlar ve belgeler.",
            tk: "Gapjyk, gurama we barlaýjy işläp düzüjileri üçin synag ulgamy: nusga guramalar we resminamalar.",
            az: "Rəqəmsal cüzdan, qurum və yoxlayan tərəf tərtibatçıları üçün test şəbəkəsi: nümunə qurumlar və rəqəmsal sənədlər.",
          },
          icon: FlaskConical,
          tone: "neutral",
          external: SANDBOX_URL,
        },
        {
          title: {
            en: "Code examples",
            tr: "Kod örnekleri",
            tk: "Kod mysallary",
            az: "Kod nümunələri",
          },
          desc: {
            en: "Tested examples with the real packages.",
            tr: "Gerçek paketlerle, testli örnekler.",
            tk: "Hakyky paketler bilen synagdan geçen mysallar.",
            az: "Real paketlərlə sınaqdan keçmiş nümunələr.",
          },
          icon: Code,
          tone: "gold",
          external: docs("/guides/code-examples"),
        },
      ],
    },
    {
      label: { en: "Tools", tr: "Araçlar", tk: "Gurallar", az: "Alətlər" },
      items: [
        {
          title: { en: "Packages", tr: "Paketler", tk: "Paketler", az: "Paketlər" },
          desc: {
            en: "Open-source @tamga-network packages.",
            tr: "Açık kaynak @tamga-network paketleri.",
            tk: "Açyk çeşmeli @tamga-network paketleri.",
            az: "Açıq mənbəli @tamga-network paketləri.",
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
            az: "API arayışı",
          },
          desc: {
            en: "Hosted issuing and verification APIs.",
            tr: "Barındırılan belge verme ve doğrulama API'leri.",
            tk: "Ýerleşdirilen resminama beriş we barlag API-leri.",
            az: "Hostinqdə təqdim olunan rəqəmsal sənəd vermə və yoxlama API-ləri.",
          },
          icon: Braces,
          tone: "accent",
          external: DEV_LINKS.apiRef,
        },
        {
          title: { en: "GitHub", tr: "GitHub", tk: "GitHub", az: "GitHub" },
          desc: {
            en: "Source code, issues and releases.",
            tr: "Kaynak kod, konular ve sürümler.",
            tk: "Çeşme kody, meseleler we wersiýalar.",
            az: "Mənbə kodu, məsələlər və buraxılışlar.",
          },
          icon: GithubIcon,
          tone: "neutral",
          external: DEV_LINKS.github,
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Quick start", tr: "Hızlı başlangıç", tk: "Çalt başlangyç", az: "Sürətli başlanğıc" },
    title: {
      en: "Verify in five minutes.",
      tr: "Beş dakikada doğrulama.",
      tk: "Bäş minutda barlag.",
      az: "Beş dəqiqəyə yoxlama.",
    },
    text: {
      en: "Two packages and a signed trust list.",
      tr: "İki paket ve imzalı bir güven listesi.",
      tk: "Iki paket we gollanan ynam sanawy.",
      az: "İki paket və imzalı bir etibar siyahısı.",
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
  label: { en: "About", tr: "Hakkında", tk: "Biz barada", az: "Haqqımızda" },
  groups: [
    {
      label: { en: "Tamga", tr: "Tamga", tk: "Tamga", az: "Tamga" },
      items: [
        {
          title: { en: "About", tr: "Hakkında", tk: "Biz barada", az: "Haqqımızda" },
          desc: {
            en: "The name, the mission, the positioning.",
            tr: "Ad, misyon ve konumlanma.",
            tk: "At, missiýa we orny.",
            az: "Ad, missiya və mövqe.",
          },
          icon: Info,
          tone: "primary",
          href: "/about",
        },
        {
          title: { en: "Partners", tr: "Partnerler", tk: "Hyzmatdaşlar", az: "Tərəfdaşlar" },
          desc: {
            en: "Institutions and organisations that joined the network.",
            tr: "Ağa katılan kurumlar ve kuruluşlar.",
            tk: "Tora goşulan guramalar we edaralar.",
            az: "Şəbəkəyə qoşulan qurumlar və təşkilatlar.",
          },
          icon: Handshake,
          tone: "gold",
          href: "/partners",
        },
        {
          title: { en: "Brand", tr: "Marka", tk: "Marka", az: "Brend" },
          desc: {
            en: "Mark, colours, type and downloads.",
            tr: "İşaret, renkler, yazı ve indirmeler.",
            tk: "Nyşan, reňkler, şrift we ýüklemeler.",
            az: "İşarə, rənglər, şrift və yükləmələr.",
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
        az: "Xəbərlər və əlaqə",
      },
      items: [
        {
          title: { en: "Blog", tr: "Blog", tk: "Blog", az: "Bloq" },
          desc: {
            en: "Notes on the network, the rules and the work.",
            tr: "Ağ, kurallar ve çalışmalar üzerine notlar.",
            tk: "Tor, düzgünler we işler barada bellikler.",
            az: "Şəbəkə, qaydalar və gördüyümüz işlər haqqında qeydlər.",
          },
          icon: Newspaper,
          tone: "neutral",
          href: "/blog",
        },
        {
          title: { en: "Contact", tr: "İletişim", tk: "Aragatnaşyk", az: "Əlaqə" },
          desc: {
            en: "General questions and joining.",
            tr: "Genel sorular ve katılım.",
            tk: "Umumy soraglar we goşulyş.",
            az: "Ümumi suallar və qoşulma.",
          },
          icon: Mail,
          tone: "primary",
          href: { pathname: "/about", hash: "contact" },
        },
        {
          title: { en: "Events", tr: "Etkinlikler", tk: "Çäreler", az: "Tədbirlər" },
          desc: {
            en: "Talks, workshops and meetings we run or join.",
            tr: "Düzenlediğimiz ve katıldığımız konuşmalar, atölyeler.",
            tk: "Geçirýän we gatnaşýan çykyşlarymyz, okuw duşuşyklary.",
            az: "Təşkil etdiyimiz və qatıldığımız çıxışlar, seminarlar və görüşlər.",
          },
          icon: CalendarDays,
          tone: "accent",
          href: "/events",
        },
      ],
    },
  ],
  featured: {
    eyebrow: { en: "Manifesto", tr: "Manifesto", tk: "Manifest", az: "Manifest" },
    title: {
      en: "Read the manifesto.",
      tr: "Manifestoyu oku.",
      tk: "Manifesti okaň.",
      az: "Manifesti oxuyun.",
    },
    text: {
      en: "We are building the modern counterpart of the ancient seal.",
      tr: "Kadim mührün çağdaş karşılığını inşa ediyoruz.",
      tk: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys.",
      az: "Qədim möhürün müasir qarşılığını qururuq.",
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
  az: t.az.replace(/\.$/, ""),
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
  [SANDBOX_HOST]: { icon: FlaskConical, tone: "neutral" },
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
  { ecosystem: string; joinCta: string; social: string }
> = {
  en: {
    ecosystem: "Network addresses",
    joinCta: "Join the network",
    social: "Social media",
  },
  tr: {
    ecosystem: "Ağ adresleri",
    joinCta: "Ağa katıl",
    social: "Sosyal medya",
  },
  tk: {
    ecosystem: "Tor salgylary",
    joinCta: "Tora goşul",
    social: "Sosial media",
  },
  az: {
    ecosystem: "Şəbəkə ünvanları",
    joinCta: "Şəbəkəyə qoşulun",
    social: "Sosial media",
  },
};

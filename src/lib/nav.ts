import {
  BookOpen,
  Braces,
  Building2,
  FileText,
  Fingerprint,
  Info,
  Landmark,
  ListChecks,
  Map,
  Newspaper,
  Package,
  PenLine,
  Route,
  ScanLine,
  ShieldCheck,
  History,
  Boxes,
  Smartphone,
  FileBadge,
  BadgeCheck,
  ListTodo,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Href } from "@/i18n/navigation";
import { DEV_LINKS, SUBDOMAINS } from "./ecosystem";

type L = Record<Locale, string>;

/** Simge kutusunun rengi (marka paleti) */
export type Tone = "primary" | "gold" | "accent" | "neutral";

export type NavItem = {
  title: L;
  desc: L;
  icon: LucideIcon;
  tone: Tone;
  /** site içi bağlantı */
  href?: Href;
  /** dış bağlantı (yeni sekme) */
  external?: string;
  /** Tamga ARF: dile göre adres */
  arf?: true;
};

export const DEVELOPERS: NavItem[] = [
  {
    title: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler" },
    desc: {
      en: "guides, specifications and decisions",
      tr: "kılavuzlar, spesifikasyonlar ve kararlar",
      tk: "gollanmalar, spesifikasiýalar we kararlar",
    },
    icon: BookOpen,
    tone: "primary",
    external: DEV_LINKS.devDocs,
  },
  {
    title: { en: "SDK", tr: "SDK", tk: "SDK" },
    desc: {
      en: "open-source @tamga-network packages",
      tr: "açık kaynak @tamga-network paketleri",
      tk: "açyk çeşmeli @tamga-network paketleri",
    },
    icon: Package,
    tone: "gold",
    href: "/sdk",
  },
  {
    title: { en: "API", tr: "API", tk: "API" },
    desc: {
      en: "issuing API and institution lookup endpoint",
      tr: "belge verme API'si ve kurum sorgu ucu",
      tk: "resminama beriş API-si we gurama gözleg nokady",
    },
    icon: Braces,
    tone: "accent",
    external: DEV_LINKS.apiRef,
  },
  {
    title: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF" },
    desc: {
      en: "architecture, trust framework and rulebooks",
      tr: "mimari, güven çerçevesi ve kural kitapları",
      tk: "arhitektura, ynam çarçuwasy we düzgünnamalar",
    },
    icon: Landmark,
    tone: "neutral",
    arf: true,
  },
];

/** Ekosistem menüsü: alt alan adları, simgeleriyle */
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

/** Menüde gösterilen ağ adresleri (docs / ARF Geliştiriciler menüsünde) */
export const ECOSYSTEM_MENU = SUBDOMAINS.filter((s) => s.group !== "learn");

export const PROJECT: NavItem[] = [
  {
    title: { en: "Manifesto", tr: "Manifesto", tk: "Manifest" },
    desc: {
      en: "why we build it",
      tr: "neden inşa ediyoruz",
      tk: "näme üçin gurýarys",
    },
    icon: PenLine,
    tone: "primary",
    href: "/manifesto",
  },
  {
    title: { en: "Whitepaper", tr: "Whitepaper", tk: "Whitepaper" },
    desc: {
      en: "the architecture in depth",
      tr: "mimarinin ayrıntısı",
      tk: "arhitekturanyň jikme-jikligi",
    },
    icon: FileText,
    tone: "gold",
    href: "/whitepaper",
  },
  {
    title: { en: "Scenarios", tr: "Senaryolar", tk: "Ssenariler" },
    desc: {
      en: "how it looks in daily life",
      tr: "günlük hayatta nasıl görünür",
      tk: "gündelik durmuşda nähili görünýär",
    },
    icon: Route,
    tone: "accent",
    href: "/scenarios",
  },
  {
    title: { en: "Roadmap", tr: "Yol haritası", tk: "Ýol kartasy" },
    desc: {
      en: "what is live, what comes next",
      tr: "ne yayında, sırada ne var",
      tk: "näme işleýär, indiki näme",
    },
    icon: Map,
    tone: "primary",
    href: "/roadmap",
  },
  {
    title: {
      en: "Known shortcuts",
      tr: "Bilinen kısayollar",
      tk: "Belli gysga ýollar",
    },
    desc: {
      en: "what is temporary, and how it closes",
      tr: "ne geçici, nasıl kapanacak",
      tk: "näme wagtlaýyn, nähili ýapylýar",
    },
    icon: ListTodo,
    tone: "neutral",
    href: "/shortcuts",
  },
  {
    title: { en: "Changelog", tr: "Changelog", tk: "Changelog" },
    desc: {
      en: "every release of the network",
      tr: "ağın her sürümü",
      tk: "toruň her wersiýasy",
    },
    icon: History,
    tone: "gold",
    href: "/changelog",
  },
  {
    title: { en: "Blog", tr: "Blog", tk: "Blog" },
    desc: {
      en: "notes and announcements",
      tr: "notlar ve duyurular",
      tk: "bellikler we bildirişler",
    },
    icon: Newspaper,
    tone: "accent",
    href: "/blog",
  },
  {
    title: { en: "About", tr: "Hakkında", tk: "Biz barada" },
    desc: {
      en: "the name, the mission, contact",
      tr: "ad, misyon, iletişim",
      tk: "at, missiýa, aragatnaşyk",
    },
    icon: Info,
    tone: "neutral",
    href: "/about",
  },
  {
    title: {
      en: "Become an issuer",
      tr: "Kurum olarak katıl",
      tk: "Gurama hökmünde goşul",
    },
    desc: {
      en: "issue credentials with Tamga",
      tr: "Tamga ile belge verin",
      tk: "Tamga bilen resminama beriň",
    },
    icon: ShieldCheck,
    tone: "primary",
    href: "/issuers",
  },
];

export const TONE_CLS: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary ring-primary/20",
  gold: "bg-gold-bright/10 text-gold-bright ring-gold-bright/25",
  accent: "bg-accent/10 text-accent ring-accent/25",
  neutral: "bg-surface-2 text-foreground-muted ring-border",
};

export const MENU_LABELS: Record<
  Locale,
  {
    docs: string;
    developers: string;
    ecosystem: string;
    project: string;
    all: string;
  }
> = {
  en: {
    docs: "Docs",
    developers: "Developers",
    ecosystem: "Ecosystem",
    project: "Project",
    all: "All addresses",
  },
  tr: {
    docs: "Dokümanlar",
    developers: "Geliştiriciler",
    ecosystem: "Ekosistem",
    project: "Proje",
    all: "Tüm adresler",
  },
  tk: {
    docs: "Resminamalar",
    developers: "Işläp düzüjiler",
    ecosystem: "Ekoulgam",
    project: "Taslama",
    all: "Ähli salgylar",
  },
};

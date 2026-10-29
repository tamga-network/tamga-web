import type { Locale } from "@/i18n/routing";

/*
 * Ekip sayfası veri tipleri. Her kişi bir dosya: src/content/team/<slug>.ts. Nasıl eklenir: README.md (aynı klasör).
 * Kural: yalnız kişinin kendisinin verdiği ya da onayladığı bilgi yazılır; boş alan sayfada hiç görünmez.
 */

/** Dört dilde metin; en az İngilizce. Eksik dilde İngilizce gösterilir. */
export type LText = { en: string } & Partial<Record<Locale, string>>;

/** Eğitim ya da geçmiş (zaman çizelgesi satırı). */
export type TimelineItem = {
  /** "2015 – 2019" ya da "2021" gibi; serbest metin */
  period: string;
  /** Bölüm / derece / görev, ör. "Bilgisayar Mühendisliği, Lisans" */
  title: LText;
  /** Kurum adı (özel ad; çevrilmez) */
  place?: string;
  note?: LText;
};

/** Kişinin yazdığı ve başka yerde yayımlanmış bir yazı (LinkedIn makalesi, Tamga blogu, dergi …). */
export type Writing = {
  title: string;
  /** YYYY-AA-GG */
  date: string;
  /** Tam adres (https://…) ya da site içi blog yolu (/blog/<slug>) */
  url: string;
  venue: "linkedin" | "tamga-blog" | "medium" | "journal" | "other";
  /** Yazının dili (en, tr, az, tk, ru …) */
  lang: string;
};

/** Yayın ya da belge (PDF). Dosya: public/files/team/<slug>/<dosya>.pdf */
export type Publication = {
  /** Benzersiz kısa kimlik (dosya adıyla aynı olabilir) */
  id: string;
  /** Asıl dilindeki başlık (çevrilmez) */
  title: string;
  /** Yazarlar, ör. ["Berke Karataş", "Ad Soyad"]; boşsa yalnız kişinin adı */
  authors?: string[];
  /** YYYY-AA-GG ya da YYYY-AA */
  date: string;
  kind: "article" | "paper" | "report" | "thesis" | "slides" | "whitepaper" | "other";
  /** Belgenin dili (en, tr, az, tk, ru …) */
  lang: string;
  /** Kısa özet (abstract); her dilde olmak zorunda değil */
  abstract?: LText;
  /** Yayın yeri, ör. "Konferans adı 2026" ya da "Ön baskı" */
  venue?: string;
  /** Site içi PDF yolu: "/files/team/<slug>/<dosya>.pdf" */
  file?: string;
  /** Dış adres (DOI, arXiv, dergi sayfası) */
  url?: string;
  /** Sayfa sayısı ve boyut (gösterim için, isteğe bağlı) */
  pages?: number;
  sizeKb?: number;
};

export type MemberLinks = {
  linkedin?: string;
  github?: string;
  x?: string;
  email?: string;
  website?: string;
  orcid?: string;
  scholar?: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  /** Sıralama (küçük önce) */
  order: number;
  role: LText;
  /** Kartta görünen tek satır */
  headline?: LText;
  /** Fotoğraf: public/team/<photo>.{avif,webp,jpg} (üçü birlikte üretilir); yoksa baş harfli simge */
  photo?: { base: string; width: number; height: number; alt: LText };
  /** Paragraflar, dil başına */
  bio?: Partial<Record<Locale, string[]>> & { en: string[] };
  /** Uzmanlık alanları (etiket) */
  focus?: LText[];
  education: TimelineItem[];
  experience: TimelineItem[];
  writings: Writing[];
  publications: Publication[];
  links: MemberLinks;
};

import type { LText } from "@/content/team/types";

/*
 * Akademik çalışmalar kataloğu. Her yayın bir dosya: src/content/publications/<id>.ts; liste index.ts'te.
 * Bir yayının birden çok dil sürümü olabilir; her sürüm ayrı PDF: public/files/publications/<id>-<dil>.pdf.
 * Nasıl eklenir: src/content/team/README.md ("PDF ekleme").
 */

/** Bir yayının tek dildeki sürümü. */
export type PublicationVersion = {
  /** Sürümün dili (tr, en, tk, az, ru …) */
  lang: string;
  /** Bu dildeki başlık (çevrilmez) */
  title: string;
  /** Site içi PDF yolu: "/files/publications/<id>-<dil>.pdf" */
  file?: string;
  /** Dış adres (DOI, arXiv, dergi sayfası) */
  url?: string;
  /** Sayfa sayısı ve boyut (gösterim için, isteğe bağlı) */
  pages?: number;
  sizeKb?: number;
  /** Bu dildeki kısa özet */
  abstract?: string;
  /** Bu dildeki anahtar kelimeler (kaynaktaki sırayla; sayfada JSON-LD'ye yazılır) */
  keywords?: string[];
};

export type Publication = {
  /** Benzersiz kısa kimlik; dosya adlarının başı */
  id: string;
  /** Yazarlar: ekip üyesinin slug'ı (profile bağlanır), ekip dışı yazarın adı ya da kurum yazısında "Tamga Network" */
  authors: string[];
  /** YYYY-AA-GG ya da YYYY-AA */
  date: string;
  kind: "article" | "paper" | "report" | "thesis" | "slides" | "whitepaper" | "other";
  /** Yayın yeri, ör. "Tamga Network Akademik Çalışmalar" ya da konferans adı */
  venue?: LText;
  /** Lisans, ör. "CC BY 4.0" */
  license?: string;
  /** En az bir sürüm; ilki asıl dil */
  versions: PublicationVersion[];
};

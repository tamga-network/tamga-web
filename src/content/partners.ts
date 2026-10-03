/*
 * Partnerler — tek kaynak (ana sayfadaki "Ağda yer alanlar" bandı ve /partners sayfası).
 * Yalnız gerçekten katılmış ve adının yazılmasına izin vermiş kuruluşlar eklenir; uydurma ad ya da logo yok.
 * Logo dosyası public/partners/ altına konur (SVG tercih; tek renk sürümü varsa daha iyi).
 */
import type { Locale } from "@/i18n/routing";

export type PartnerGroup = "institutions" | "wallets" | "technology" | "ecosystem";

export type Partner = {
  name: string;
  group: PartnerGroup;
  /** public/ altındaki yol, ör. "/partners/ornek-universite.svg" */
  logo?: string;
  /** Logo yalnız işaretse (yazısız) adı yanında göster */
  withName?: boolean;
  url?: string;
  /** Kısa tanım, dile göre */
  note?: Partial<Record<Locale, string>>;
};

export const PARTNERS: Partner[] = [
  { name: "İstanbul Bilgi Üniversitesi", group: "institutions", url: "https://www.bilgi.edu.tr", logo: "/partners/istanbul-bilgi.png" },
  { name: "Tamga Wallet", group: "wallets", logo: "/partners/tamga-wallet.svg", withName: true },
  { name: "BİLGİ Spark-Up TEKMER", group: "ecosystem", url: "https://tekmer.bilgi.org.tr", logo: "/partners/sparkup-tekmer.png" },
  { name: "Teknokratlar Derneği", group: "ecosystem", url: "https://teknokratlar.org.tr", logo: "/partners/teknokratlar-dernegi.svg" },
];

export const partnersIn = (group: PartnerGroup) => PARTNERS.filter((p) => p.group === group);

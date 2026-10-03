/*
 * Partnerler — tek kaynak (ana sayfadaki "Ağda yer alanlar" bandı ve /partners sayfası).
 * Yalnız gerçekten katılmış ve adının yazılmasına izin vermiş kuruluşlar eklenir; uydurma ad ya da logo yok.
 * Logo dosyası public/partners/ altına konur (SVG tercih; tek renk sürümü varsa daha iyi).
 */
import type { Locale } from "@/i18n/routing";

export type PartnerGroup = "institutions" | "wallets" | "technology";

export type Partner = {
  name: string;
  group: PartnerGroup;
  /** public/ altındaki yol, ör. "/partners/ornek-universite.svg" */
  logo?: string;
  url?: string;
  /** Kısa tanım, dile göre */
  note?: Partial<Record<Locale, string>>;
};

export const PARTNERS: Partner[] = [];

export const partnersIn = (group: PartnerGroup) => PARTNERS.filter((p) => p.group === group);

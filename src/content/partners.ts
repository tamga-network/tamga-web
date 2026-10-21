/*
 * Partnerler — tek kaynak (ana sayfadaki "Ağda yer alanlar" bandı ve /partners sayfası).
 * Yalnız gerçekten katılmış ve adının yazılmasına izin vermiş kuruluşlar eklenir; uydurma ad ya da logo yok.
 * Logo dosyası public/partners/ altına konur (SVG tercih; tek renk sürümü varsa daha iyi).
 */
import type { Locale } from "@/i18n/routing";
import { tamgaWalletUrl } from "@/lib/ecosystem";

export type PartnerGroup = "institutions" | "wallets" | "technology" | "ecosystem";

export type Partner = {
  name: string;
  group: PartnerGroup;
  /** public/ altındaki yol, ör. "/partners/ornek-universite.svg" */
  logo?: string;
  /** Logo yalnız işaretse (yazısız) adı yanında göster */
  withName?: boolean;
  /** Dış adres; dile göre değişiyorsa işlev */
  url?: string | ((locale: string) => string);
  /** Kısa tanım, dile göre */
  note?: Partial<Record<Locale, string>>;
};

export const PARTNERS: Partner[] = [
  { name: "İstanbul Bilgi Üniversitesi", group: "institutions", url: "https://www.bilgi.edu.tr", logo: "/partners/istanbul-bilgi.png", note: { en: "Pilot partner (education)", tr: "Pilot ortağımız (eğitim)", tk: "Pilot hyzmatdaşymyz (bilim)", az: "Pilot tərəfdaşımız (təhsil)" } },
  { name: "Tamga Wallet", group: "wallets", url: tamgaWalletUrl, logo: "/partners/tamga-wallet.svg", withName: true },
  { name: "BİLGİ Spark-Up TEKMER", group: "ecosystem", url: "https://tekmer.bilgi.org.tr", logo: "/partners/sparkup-tekmer.png" },
  { name: "Teknokratlar Derneği", group: "ecosystem", url: "https://teknokratlar.org.tr", logo: "/partners/teknokratlar-dernegi.svg" },
];

export const partnerUrl = (p: Partner, locale: string) => (typeof p.url === "function" ? p.url(locale) : p.url);

export const partnersIn = (group: PartnerGroup) => PARTNERS.filter((p) => p.group === group);

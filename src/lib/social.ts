/**
 * Sosyal medya hesapları — tek kaynak (alt bilgi, telefon menüsü). Adresi boş bırakılan hesap
 * hiç gösterilmez. Bir hesap açılınca adresini buraya yazın; aynı adres JSON-LD `sameAs`
 * listesine de eklenmeli (src/components/json-ld.tsx).
 */
export type SocialKey =
  "linkedin" | "x" | "instagram" | "youtube" | "telegram" | "github";

export const SOCIAL_URLS: Record<SocialKey, string> = {
  linkedin: "https://www.linkedin.com/company/tamganetwork/",
  x: "",
  instagram: "https://www.instagram.com/tamganetwork/",
  youtube: "",
  telegram: "",
  github: "https://github.com/tamga-network",
};

/** Gösterim sırası */
export const SOCIAL_ORDER: SocialKey[] = [
  "linkedin",
  "x",
  "instagram",
  "youtube",
  "telegram",
  "github",
];

export const SOCIAL_LABELS: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  youtube: "YouTube",
  telegram: "Telegram",
  github: "GitHub",
};

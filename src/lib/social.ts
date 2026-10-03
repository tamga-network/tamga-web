/**
 * Sosyal medya hesapları — tek kaynak (alt bilgi, telefon menüsü). Adresleri proje yönetimi verecek; boş bırakılan hesap
 * simgesi tıklanamaz "Yakında" olarak görünür. Bir hesap açılınca adresini buraya yazın; aynı adres JSON-LD `sameAs`
 * listesine de eklenmeli (src/components/json-ld.tsx).
 */
export type SocialKey =
  "linkedin" | "x" | "instagram" | "youtube" | "telegram" | "github";

export const SOCIAL_URLS: Record<SocialKey, string> = {
  linkedin: "",
  x: "",
  instagram: "",
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

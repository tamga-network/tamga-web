import type { TeamMember } from "./types";

/*
 * Turgay Gültekin. Ad, rol ve fotoğraf (2026-10-30); kısa tanıtım, eğitim, yazılar ve adresler kişinin kendisi
 * verince ve yayımlanmasına izin verince eklenir (README.md).
 * Fotoğraf: arka plandaki tabela yazıları bulanıklaştırıldı ve kırpıldı (sayfada başka kurumun adı görünmesin).
 * Unvan: vakıf kurulunca rol "Kurucu · Yönetim Kurulu Üyesi / Founder · Board Member" olur (henüz yönetim kurulu yok).
 */
export const turgayGultekin: TeamMember = {
  slug: "turgay-gultekin",
  name: "Turgay Gültekin",
  order: 2,
  role: { en: "Founder", tr: "Kurucu", tk: "Esaslandyryjy", az: "Təsisçi" },
  photo: {
    base: "turgay-gultekin",
    width: 640,
    height: 640,
    alt: {
      en: "Portrait of Turgay Gültekin",
      tr: "Turgay Gültekin'in portresi",
      tk: "Turgay Gültekiniň portreti",
      az: "Turgay Gültəkinin portreti",
    },
  },
  education: [],
  experience: [],
  writings: [],
  publications: [],
  links: {},
};

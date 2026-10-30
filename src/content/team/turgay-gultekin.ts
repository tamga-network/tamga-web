import type { TeamMember } from "./types";

/*
 * Turgay Gültekin. Ad, rol, fotoğraf, eğitim ve üyelik (2026-10-30); kısa tanıtım, yazılar ve adresler kişinin kendisi
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
  education: [
    {
      period: "2003 – 2007",
      title: {
        en: "Electrical and Electronics Engineering, Bachelor's degree",
        tr: "Elektrik-Elektronik Mühendisliği, Lisans",
        tk: "Elektrik we elektronika inženerçiligi, bakalawr",
        az: "Elektrik və elektronika mühəndisliyi, bakalavr",
      },
      place: {
        en: "Kocaeli University",
        tr: "Kocaeli Üniversitesi",
        tk: "Kocaeli uniwersiteti",
        az: "Kocaeli Universiteti",
      },
    },
    {
      period: "1995 – 2002",
      title: { en: "High school", tr: "Lise", tk: "Orta mekdep", az: "Orta məktəb" },
      place: {
        en: "Kağıthane Anatolian High School",
        tr: "Kağıthane Anadolu Lisesi",
        tk: "Kağıthane Anadolu Lisesi",
        az: "Kağıthane Anadolu Lisesi",
      },
    },
  ],
  experience: [],
  // Adres: derneğin resmî sitesi (2026-10-30'da açılıyor, başlığı "Teknokratlar Derneği").
  memberships: [
    {
      name: {
        en: "Teknokratlar Association",
        tr: "Teknokratlar Derneği",
        tk: "Teknokratlar Derneği",
        az: "Teknokratlar Derneği",
      },
      role: { en: "Member", tr: "Üye", tk: "Agza", az: "Üzv" },
      url: "https://teknokratlar.org.tr",
    },
  ],
  writings: [],
  publications: [],
  links: {},
};

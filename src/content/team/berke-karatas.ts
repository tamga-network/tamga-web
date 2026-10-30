import type { TeamMember } from "./types";

/*
 * Berke Karataş. Metinler ve bilgiler kişinin kendi verdiği özgeçmiş verisinden (2026-10-30): eğitim, uzmanlık, bağlantılar.
 * İş geçmişi, telefon, kişisel e-posta ve konum bilinçli olarak yok. Boş listeler sayfada görünmez (nasıl eklenir: README.md).
 */
export const berkeKaratas: TeamMember = {
  slug: "berke-karatas",
  name: "Berke Karataş",
  order: 1,
  // Vakıf kurulunca: "Kurucu · Yönetim Kurulu Üyesi / Founder · Board Member" (henüz yönetim kurulu yok).
  role: { en: "Founder", tr: "Kurucu", tk: "Esaslandyryjy", az: "Təsisçi" },
  headline: {
    en: "Defines the network's rules, principles and roadmap.",
    tr: "Ağın kurallarını, ilkelerini ve yol haritasını belirliyor.",
    tk: "Toruň düzgünlerini, ýörelgelerini we ýol kartasyny kesgitleýär.",
    az: "Şəbəkənin qaydalarını, prinsiplərini və yol xəritəsini müəyyənləşdirir.",
  },
  photo: {
    base: "berke-karatas",
    width: 640,
    height: 640,
    alt: {
      en: "Portrait of Berke Karataş",
      tr: "Berke Karataş'ın portresi",
      tk: "Berke Karataşyň portreti",
      az: "Berke Karataşın portreti",
    },
  },
  bio: {
    en: [
      "Berke Karataş is the founder of Tamga Network, an open, EU-compatible digital trust network for the Turkic world. He defines the network's rules (Tamga ARF 1.0), principles and roadmap.",
      "His interest is digital identity and verifiable credentials: proving that a document is genuine without calling the issuer, while the person shares only what is asked. He follows the EU's eIDAS 2.0 framework and the EUDI Wallet architecture closely, and works on software architecture and backend development.",
    ],
    tr: [
      "Berke Karataş, Türk dünyası için açık ve AB uyumlu dijital güven ağı Tamga Network'ün kurucusu. Ağın kurallarını (Tamga ARF 1.0), ilkelerini ve yol haritasını belirliyor.",
      "İlgi alanı dijital kimlik ve doğrulanabilir belgeler: bir belgenin gerçek olduğunu belgeyi verene sormadan kanıtlamak, kişinin yalnız istenen bilgiyi paylaşması. Avrupa'nın eIDAS 2.0 düzenini ve EUDI cüzdan mimarisini yakından izliyor; yazılım mimarisi ve backend geliştirme üzerine çalışıyor.",
    ],
    tk: [
      "Berke Karataş türki dünýäsi üçin açyk, ÝB bilen laýyk sanly ynam tory bolan Tamga Network-yň esaslandyryjysy. Toruň düzgünlerini (Tamga ARF 1.0), ýörelgelerini we ýol kartasyny kesgitleýär.",
      "Onuň gyzyklanýan ugry sanly şahsyýet we barlanyp bilinýän resminamalar: resminamanyň hakykydygyny ony berene ýüz tutman subut etmek, adamyň diňe soralan maglumaty paýlaşmagy. Ýewropanyň eIDAS 2.0 düzgünini we EUDI gapjyk arhitekturasyny ýakyndan yzarlaýar; programma arhitekturasy we backend işläp taýýarlamak bilen meşgullanýar.",
    ],
    az: [
      "Berke Karataş Türk dünyası üçün açıq, Aİ ilə uyğun rəqəmsal etibar şəbəkəsi olan Tamga Network-un təsisçisidir. Şəbəkənin qaydalarını (Tamga ARF 1.0), prinsiplərini və yol xəritəsini müəyyənləşdirir.",
      "Maraq sahəsi rəqəmsal kimlik və yoxlanıla bilən sənədlərdir: sənədin həqiqi olduğunu onu verən quruma müraciət etmədən sübut etmək, insanın yalnız istənilən məlumatı paylaşması. Avropanın eIDAS 2.0 çərçivəsini və EUDI pul kisəsi arxitekturasını yaxından izləyir; proqram arxitekturası və backend inkişafı üzərində işləyir.",
    ],
  },
  // İlgi alanları (üst bölümde etiket)
  focus: [
    { en: "Digital identity", tr: "Dijital kimlik", tk: "Sanly şahsyýet", az: "Rəqəmsal kimlik" },
    {
      en: "Verifiable credentials",
      tr: "Doğrulanabilir belgeler",
      tk: "Barlanyp bilinýän resminamalar",
      az: "Yoxlanıla bilən sənədlər",
    },
    { en: "Trust frameworks", tr: "Güven çerçeveleri", tk: "Ynam çarçuwalary", az: "Etibar çərçivələri" },
    { en: "Privacy by design", tr: "Tasarımda gizlilik", tk: "Dizaýnda gizlinlik", az: "Dizaynda məxfilik" },
    { en: "Software architecture", tr: "Yazılım mimarisi", tk: "Programma arhitekturasy", az: "Proqram arxitekturası" },
  ],
  // Uzmanlık alanları: kişinin kendi beceri listesinden (teknik adlar çevrilmez)
  expertise: [
    {
      group: { en: "Digital identity", tr: "Dijital kimlik", tk: "Sanly şahsyýet", az: "Rəqəmsal kimlik" },
      items: [
        { en: "eIDAS 2.0" },
        { en: "EUDI Wallet" },
        { en: "SD-JWT VC" },
        { en: "ISO mdoc" },
        { en: "OpenID4VCI" },
        { en: "OpenID4VP" },
        {
          en: "Verifiable credentials",
          tr: "Doğrulanabilir belgeler",
          tk: "Barlanyp bilinýän resminamalar",
          az: "Yoxlanıla bilən sənədlər",
        },
        { en: "Selective disclosure", tr: "Seçici paylaşım", tk: "Saýlap paýlaşmak", az: "Seçici paylaşım" },
        { en: "Trust lists", tr: "Güven listeleri", tk: "Ynam sanawlary", az: "Etibar siyahıları" },
      ],
    },
    {
      group: { en: "Backend" },
      items: [{ en: "Python" }, { en: "Django" }, { en: "REST APIs", tr: "REST API", az: "REST API" }, { en: "PostgreSQL" }],
    },
    {
      group: { en: "Web and mobile", tr: "Web ve mobil", tk: "Web we mobil", az: "Veb və mobil" },
      items: [{ en: "TypeScript" }, { en: "React" }, { en: "Next.js" }, { en: "React Native" }],
    },
    {
      group: { en: "Infrastructure", tr: "Altyapı", tk: "Infrastruktura", az: "İnfrastruktur" },
      items: [{ en: "Linux" }, { en: "Docker" }, { en: "Nginx" }],
    },
    {
      group: { en: "Architecture", tr: "Mimari", tk: "Arhitektura", az: "Arxitektura" },
      items: [
        { en: "Software architecture", tr: "Yazılım mimarisi", tk: "Programma arhitekturasy", az: "Proqram arxitekturası" },
        { en: "Privacy by design", tr: "Tasarımda gizlilik", tk: "Dizaýnda gizlinlik", az: "Dizaynda məxfilik" },
      ],
    },
  ],
  education: [
    {
      period: "2018 – 2022",
      title: {
        en: "Management Information Systems, Bachelor's degree (BSc)",
        tr: "Yönetim Bilişim Sistemleri, Lisans",
        tk: "Dolandyryş maglumat ulgamlary, bakalawr",
        az: "İdarəetmə informasiya sistemləri, bakalavr",
      },
      place: {
        en: "Istanbul Bilgi University",
        tr: "İstanbul Bilgi Üniversitesi",
        tk: "Stambul Bilgi uniwersiteti",
        az: "İstanbul Bilgi Universiteti",
      },
    },
    {
      period: "2011 – 2015",
      title: { en: "High school", tr: "Lise", tk: "Orta mekdep", az: "Orta məktəb" },
      place: {
        en: "Kağıthane Anatolian High School",
        tr: "Kağıthane Anadolu Lisesi",
        tk: "Kağıthane Anadolu Lisesi",
        az: "Kağıthane Anadolu Lisesi",
      },
    },
  ],
  // İş geçmişi bilinçli olarak yazılmıyor (profil özgeçmiş değil).
  experience: [],
  // Yazılar: adresleri eklendikçe görünür (README.md, "Yazı ekleme").
  writings: [],
  // Yayınlar (PDF): dosya public/files/team/berke-karatas/ altına, kayıt buraya (README.md, "PDF ekleme"). Boşken bölüm görünmez.
  publications: [],
  links: {
    linkedin: "https://www.linkedin.com/in/uberke-karatas",
    github: "https://github.com/ubk8",
  },
};

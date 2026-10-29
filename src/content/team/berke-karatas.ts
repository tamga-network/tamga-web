import type { TeamMember } from "./types";

/*
 * Berke Karataş. Metinler kişinin kendi profil metninden uyarlandı (üçüncü kişi). Boş listeler sayfada görünmez;
 * eğitim, yazılar, yayınlar ve sosyal adresler kişi verdikçe eklenir (nasıl: README.md).
 */
export const berkeKaratas: TeamMember = {
  slug: "berke-karatas",
  name: "Berke Karataş",
  order: 1,
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
      "Berke Karataş is the founder of Tamga Network, an open, EU-compatible digital trust network for the Turkic world. Proving that a document is genuine should not require a phone call to the issuer, and the person should share only what is asked: that is the problem the network sets out to solve.",
      "He defines the network's rules (Tamga ARF 1.0), principles and roadmap, leads relations with institutions and the public sector, and takes the product and architecture decisions.",
      "He follows the EU's eIDAS 2.0 framework closely. Tamga uses the same standards (SD-JWT VC, ISO mdoc, OpenID4VC), while the rules and trust lists belong to the states of the Turkic world. The network's goal is an independent, non-profit foundation.",
    ],
    tr: [
      "Berke Karataş, Türk dünyası için açık ve AB uyumlu dijital güven ağı Tamga Network'ün kurucusu. Bir belgenin gerçek olduğunu kanıtlamak için belgeyi verene telefon açılmasın, kişi yalnız istenen bilgiyi paylaşsın: ağın çözmeye çalıştığı sorun bu.",
      "Ağın kurallarını (Tamga ARF 1.0), ilkelerini ve yol haritasını belirliyor; kurumlar ve kamu tarafıyla ilişkileri yürütüyor; ürün ve mimari kararlarını veriyor.",
      "Avrupa'nın eIDAS 2.0 düzenini yakından izliyor. Tamga aynı standartları (SD-JWT VC, ISO mdoc, OpenID4VC) kullanıyor; kurallar ve güven listeleri ise Türk dünyasının devletlerine ait. Ağın hedefi bağımsız, kâr amacı gütmeyen bir vakıf.",
    ],
    tk: [
      "Berke Karataş türki dünýäsi üçin açyk, ÝB bilen laýyk sanly ynam tory bolan Tamga Network-yň esaslandyryjysy. Resminamanyň hakykydygyny subut etmek üçin ony berene jaň etmek gerek bolmasyn, adam diňe soralan maglumaty paýlaşsyn: toruň çözmäge çalyşýan meselesi şu.",
      "Toruň düzgünlerini (Tamga ARF 1.0), ýörelgelerini we ýol kartasyny kesgitleýär, guramalar we döwlet pudagy bilen gatnaşyklary alyp barýar, önüm we arhitektura kararlaryny kabul edýär.",
      "Ýewropanyň eIDAS 2.0 düzgünini ýakyndan yzarlaýar. Tamga şol bir standartlary (SD-JWT VC, ISO mdoc, OpenID4VC) ulanýar, düzgünler we ynam sanawlary bolsa türki dünýäsiniň döwletlerine degişli. Toruň maksady garaşsyz, girdeji gazanmaýan gazna.",
    ],
    az: [
      "Berke Karataş Türk dünyası üçün açıq, Aİ ilə uyğun rəqəmsal etibar şəbəkəsi olan Tamga Network-un təsisçisidir. Sənədin həqiqi olduğunu sübut etmək üçün onu verən quruma zəng etmək lazım olmasın, insan yalnız istənilən məlumatı paylaşsın: şəbəkənin həll etməyə çalışdığı problem budur.",
      "Şəbəkənin qaydalarını (Tamga ARF 1.0), prinsiplərini və yol xəritəsini müəyyənləşdirir, qurumlar və dövlət sektoru ilə əlaqələri aparır, məhsul və arxitektura qərarlarını verir.",
      "Avropanın eIDAS 2.0 çərçivəsini yaxından izləyir. Tamga eyni standartlardan (SD-JWT VC, ISO mdoc, OpenID4VC) istifadə edir, qaydalar və etibar siyahıları isə Türk dünyası dövlətlərinə məxsusdur. Şəbəkənin məqsədi müstəqil, qeyri-kommersiya fondudur.",
    ],
  },
  focus: [
    { en: "Digital identity", tr: "Dijital kimlik", tk: "Sanly şahsyýet", az: "Rəqəmsal kimlik" },
    {
      en: "Verifiable credentials",
      tr: "Doğrulanabilir belgeler",
      tk: "Barlanyp bilinýän resminamalar",
      az: "Yoxlanıla bilən sənədlər",
    },
    { en: "eIDAS 2.0" },
    { en: "Trust frameworks", tr: "Güven çerçeveleri", tk: "Ynam çarçuwalary", az: "Etibar çərçivələri" },
    { en: "Software architecture", tr: "Yazılım mimarisi", tk: "Programma arhitekturasy", az: "Proqram arxitekturası" },
    { en: "Privacy by design", tr: "Tasarımda gizlilik", tk: "Dizaýnda gizlinlik", az: "Dizaynda məxfilik" },
  ],
  // Eğitim: kişi verdiğinde doldurulacak (ör. { period: "2016 – 2020", title: { en: "…", tr: "…" }, place: "…" }).
  education: [],
  experience: [],
  // LinkedIn yazıları: adresleri eklendikçe görünür (README.md, "Yazı ekleme").
  writings: [],
  // PDF yayınlar: dosya public/files/team/berke-karatas/ altına, kayıt buraya (README.md, "PDF ekleme").
  publications: [],
  // Sosyal adresler: kişi verdiğinde (linkedin, github, x, email …).
  links: {},
};

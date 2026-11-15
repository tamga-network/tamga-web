import type { Publication } from "./types";

export const trustLists: Publication = {
  id: "trust-lists",
  authors: ["berke-karatas"],
  date: "2026-12-10",
  kind: "article",
  venue: {
    en: "Tamga Network Publications",
    tr: "Tamga Network Akademik Çalışmalar",
    tk: "Tamga Network Ylmy işler",
    az: "Tamga Network Elmi işlər",
  },
  license: "CC BY 4.0",
  versions: [
    {
      lang: "tr",
      title: "Kime Güveniyoruz? Güven Listeleri ve Dijital Güven Altyapısı",
      file: "/files/publications/trust-lists-tr.pdf",
      pages: 29,
      sizeKb: 553,
      abstract:
        "Dijital bir imza belgenin değiştirilmediğini kanıtlar, ama imzalayanın kim olduğunu ve o belgeyi vermeye yetkili olup " +
        "olmadığını söylemez. Yazı, web'in sertifika otoriteleri modelinden Avrupa Birliği'nin imzalı güven listelerine, listelerin " +
        "listesine (LOTL), ETSI TS 119 612 ve TS 119 602 biçimlerine ve AB dijital kimlik cüzdanında güvenen tarafların kaydına uzanan " +
        "güven altyapısını hiçbir ön bilgi varsaymadan anlatıyor. Doğrulayıcının internete çıkmadan \"bu kurum gerçek ve yetkili mi?\" " +
        "sorusunu nasıl cevapladığını adım adım gösteriyor ve liste işletmecisinin gücünün nasıl sınırlandığını tartışıyor.",
    },
  ],
};

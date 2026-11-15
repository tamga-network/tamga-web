import type { Publication } from "./types";

export const selectiveDisclosure: Publication = {
  id: "selective-disclosure",
  authors: ["berke-karatas"],
  date: "2026-11-19",
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
      title: "Seçici Açıklama: Gerekeni Göster, Gerisi Sende Kalsın",
      file: "/files/publications/selective-disclosure-tr.pdf",
      pages: 26,
      sizeKb: 495,
      abstract:
        "Seçici açıklama, kişinin bir belgenin tamamını değil yalnızca istenen alanını göstermesini ve doğrulayanın o alanın belgeyi " +
        "verenin imzaladığı alan olduğundan yine emin olmasını sağlar; veri minimizasyonu ilkesinin teknik karşılığıdır. " +
        "Yazı, SD-JWT'deki tuzlu özet yöntemini gerçek hesaplarla adım adım, ardından ISO mdoc'taki imzalı özet tablosunu ve " +
        "her gösterimde yeni bir ispat türeten BBS imzalarını anlatıp yöntemleri boyut, hız, gizlilik ve standart durumu açısından " +
        "karşılaştırıyor. Son bölüm, seçici açıklamanın tek başına yetmediği yerleri, özellikle aynı belgenin farklı doğrulayanlarca " +
        "birbirine bağlanabilmesini tartışıyor.",
    },
  ],
};

import type { Publication } from "./types";

export const deepfakesAndIdentityVerification: Publication = {
  id: "deepfakes-and-identity-verification",
  authors: ["berke-karatas"],
  date: "2027-02-04",
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
      title: "Deepfake Çağında Kimlik Doğrulama: Belge Fotoğrafı ve Selfie'den Çip ve İmzaya",
      file: "/files/publications/deepfakes-and-identity-verification-tr.pdf",
      pages: 30,
      sizeKb: 602,
      abstract:
        "Uzaktan kimlik doğrulama, bir belgenin ve bir yüzün görüntüsünü yorumlayarak karar verir; yapay zekâyla üretilen sahte yüzler " +
        "ve kameranın arkasından sisteme sokulan görüntüler bu yöntemin dayandığı varsayımı zayıflatıyor. Yazı, belge fotoğrafı, selfie " +
        "ve canlılık tespitinin nasıl çalıştığını, sunum ve enjeksiyon saldırılarını ve bunları ölçen ISO/IEC 30107, CEN/TS 18099 ve " +
        "ETSI TS 119 461 gibi standartları sıfırdan anlatıyor; ardından çipli belgelerin telefonla okunmasını ICAO 9303 üzerinden açıklıyor " +
        "ve imzaya dayanan kimlik bilgisine geçişin neyi çözüp neyi açıkta bıraktığını tartışıyor.",
    },
  ],
};

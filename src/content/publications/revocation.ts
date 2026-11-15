import type { Publication } from "./types";

export const revocation: Publication = {
  id: "revocation",
  authors: ["berke-karatas"],
  date: "2026-12-17",
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
      title: "İptal: Bir Belgeyi Geri Almak, Kimseyi İzlemeden",
      file: "/files/publications/revocation-tr.pdf",
      pages: 28,
      sizeKb: 565,
      abstract:
        "Bir belge iptal edildiğinde doğrulayıcının bunu öğrenmesi gerekir; ama her doğrulamada belgeyi veren kuruma sormak, kurumun " +
        "belgenin nerede gösterildiğini öğrenmesi demektir. Yazı, web'in sertifika iptal listeleri ve çevrimiçi durum sorgusu (OCSP) " +
        "deneyiminden başlayıp AB dijital kimlik cüzdanının benimsediği IETF Token Status List yöntemini bit düzeyinde, hiçbir ön bilgi " +
        "varsaymadan anlatıyor. Sürü gizliliğini, sıra numaralarının neden rastgele dağıtılması gerektiğini, çevrimdışı doğrulamada " +
        "tazeliği ve iptale gerek bırakmayan kısa ömürlü belgeleri tartışıyor.",
    },
  ],
};

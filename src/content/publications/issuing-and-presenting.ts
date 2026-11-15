import type { Publication } from "./types";

export const issuingAndPresenting: Publication = {
  id: "issuing-and-presenting",
  authors: ["berke-karatas"],
  date: "2026-12-24",
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
      title: "Belge Nasıl Verilir, Nasıl Gösterilir: OpenID4VCI, OpenID4VP ve Cüzdanla Konuşmanın Kuralları",
      file: "/files/publications/issuing-and-presenting-tr.pdf",
      pages: 30,
      sizeKb: 610,
      abstract:
        "Bir kimlik cüzdanı, ancak belge veren kurumlarla ve belgeyi görmek isteyen doğrulayanlarla ortak bir dilde konuşabildiğinde işe yarar. " +
        "Yazı, bu dilin bugün en yaygın iki parçası olan OpenID4VCI ve OpenID4VP'yi, doğrulayanın ne istediğini tarif ettiği DCQL sorgu dilini, " +
        "AB'nin yüksek güvence profili HAIP'i ve tarayıcıyı cüzdana bağlayan Digital Credentials API'yi sıra diyagramları ve örnek mesajlarla anlatıyor. " +
        "Her adımda hangi saldırının nasıl önlendiğini sorarak belge veren kurumun, belgenin nerede gösterildiğini neden öğrenmediğini gösteriyor.",
    },
  ],
};

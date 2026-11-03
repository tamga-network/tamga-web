import type { Publication } from "./types";

export const evolutionOfDigitalIdentity: Publication = {
  id: "evolution-of-digital-identity",
  authors: ["berke-karatas"],
  date: "2026-11-03",
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
      title: "Dijital Kimliğin Evrimi: Kullanıcı Adından Kimlik Cüzdanına",
      file: "/files/publications/evolution-of-digital-identity-tr.pdf",
      pages: 30,
      sizeKb: 569,
      abstract:
        "İnternet, insanların birbirini yüz yüze, bir mühre ya da devletin verdiği bir belgeye bakarak tanıdığı düzeni bozdu. " +
        "Son altmış yılda bu soruna verilen cevaplar dört dönemde toplanabilir: her sistemin kendi parolasını tuttuğu ada dönemi, " +
        "\"Google ile giriş\" düğmesinin simgelediği federasyon, kimliği kişinin elinde tutmayı amaçlayan kendi kendine egemen kimlik " +
        "ve AB'nin eIDAS 2.0 ile kurduğu devlet destekli kimlik cüzdanları. Yazı, hiçbir ön bilgi varsaymadan bu dört dönemi teknik " +
        "işleyişiyle birlikte anlatıyor ve her birinde kimliği kimin verdiğini, kimin sakladığını ve doğrulamada kimin neyi gördüğünü soruyor.",
    },
  ],
};

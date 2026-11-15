import type { Publication } from "./types";

export const eidas2Explained: Publication = {
  id: "eidas-2-explained",
  authors: ["berke-karatas"],
  date: "2027-01-14",
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
      title: "eIDAS 2.0'a Hukuk Dışından Bakış: Ne Getiriyor, Kimi Etkiliyor? Bir Mühendisin Okuma Notları",
      file: "/files/publications/eidas-2-explained-tr.pdf",
      pages: 28,
      sizeKb: 506,
      abstract:
        "Tüzük (AB) 2024/1183 ile değişen eIDAS, her üye devlete bir dijital kimlik cüzdanı sunma yükümlülüğü getiriyor, kamu kurumlarının ve düzenlenmiş özel sektörün bu cüzdanı kabul etmesini istiyor ve güven hizmetlerine öznitelik onaylarını, arşivlemeyi ve elektronik defterleri ekliyor. " +
        "Yazı tüzüğü ve onun teknik ayrıntısını taşıyan uygulama tüzüklerini bir mühendisin gözüyle, madde numaralarıyla okuyor: roller, cüzdanın nitelikleri, son tarihlerin hesabı, zorunlu kabul, sertifikasyon ve denetim. " +
        "Son bölümde tüzüğün AB dışındaki ülkeler için ne söylediğini, yani yalnız güven hizmetlerine ve devletler arası bir yolla açılan madde 14'ü tarafsız biçimde inceliyor; yazı hukuki görüş değildir.",
    },
  ],
};

import type { Publication } from "./types";

export const turkicDigitalIdentity: Publication = {
  id: "turkic-digital-identity",
  authors: ["berke-karatas"],
  date: "2027-01-28",
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
      title: "Türk Dünyasında Dijital Kimlik: Bugünkü Durum ve Birlikte Çalışabilirlik",
      file: "/files/publications/turkic-digital-identity-tr.pdf",
      pages: 25,
      sizeKb: 486,
      abstract:
        "Türk Devletleri Teşkilatı ülkeleri son yirmi yılda çipli kimlik kartları, e-devlet kapıları, mobil imza ve mobil dijital belgelerle " +
        "güçlü ulusal dijital kimlik altyapıları kurdu, ama bu altyapılar sınırı geçtiğinde kendiliğinden tanınmıyor. " +
        "Yazı, yalnız kamuya açık kaynaklara dayanarak Türkiye, Azerbaycan, Kazakistan, Özbekistan, Kırgızistan ve Türkmenistan'ın durumunu " +
        "karşılaştırıyor ve eğitim, iş ve seyahat senaryoları üzerinden sınır ötesi tanımanın nerede tıkandığını gösteriyor. " +
        "Ardından ikili anlaşmalar, ülke düğümleri ve ortak listeler listesi gibi yönetişim seçeneklerini ve bu ülkelerin AB'nin dijital " +
        "kimlik çerçevesiyle ilişkisini tartışıyor.",
    },
  ],
};

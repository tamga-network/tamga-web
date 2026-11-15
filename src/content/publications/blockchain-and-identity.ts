import type { Publication } from "./types";

export const blockchainAndIdentity: Publication = {
  id: "blockchain-and-identity",
  authors: ["berke-karatas"],
  date: "2027-01-21",
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
      title: "Blokzincir ve Dijital Kimlik: Ne Zaman Gerekir, Ne Zaman Gerekmez?",
      file: "/files/publications/blockchain-and-identity-tr.pdf",
      pages: 29,
      sizeKb: 544,
      abstract:
        "Blokzincir, dijital kimlik için uzun süre kimsenin tek başına sahip olmadığı, değiştirilemeyen bir güven kaynağı olarak önerildi. " +
        "Yazı, zincirin özet zinciri, Merkle ağacı ve uzlaşmadan oluşan yapısını sıfırdan anlatıyor; kimlik defteri, tanımlayıcı kaydı, iptal kaydı " +
        "ve denetim izi rollerini, GDPR ve KVKK'daki silme hakkını ve Avrupa'nın EBSI deneyiminden çıkan dersleri tek tek tartıyor. " +
        "Vardığı sonuç, zincirin güvenin kaynağı olmaya uygun olmadığı, ama kişisel veri yazılmadan, imzalı kayıtların geriye dönük " +
        "değiştirilmediğine birden çok bağımsız tarafın tanıklık etmesi için değerli olabileceğidir.",
    },
  ],
};

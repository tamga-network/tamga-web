import type { Publication } from "./types";

export const zeroKnowledgeProofs: Publication = {
  id: "zero-knowledge-proofs",
  authors: ["berke-karatas"],
  date: "2026-11-26",
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
      title: "Sıfır Bilgi İspatları ve Kimlik: “18 Yaşından Büyüğüm” Demenin Matematiği",
      file: "/files/publications/zero-knowledge-proofs-tr.pdf",
      pages: 31,
      sizeKb: 601,
      abstract:
        "Sıfır bilgi ispatı, bir ifadenin doğru olduğunu, ifadenin dayandığı bilgiyi açmadan kanıtlamayı sağlar; doğum tarihini göstermeden " +
        "\"18 yaşından büyüğüm\" demek bu sayede mümkün olur. Yazı, Ali Baba mağarasından Schnorr protokolüne, Fiat-Shamir dönüşümünden " +
        "zk-SNARK ve zk-STARK'lara kadar temel kavramları matematik bilgisi varsaymadan anlatıyor; formüller ve adım adım bir Schnorr ispatı ekte. " +
        "Ağırlık merkezi, kurumların bugün verdiği ECDSA imzalı mobil belgeler üzerinde belgeyi değiştirmeden ispat üretmek, AB'nin yaş doğrulama " +
        "çalışmasında bu yaklaşımın kullanımı ve telefondaki performans sınırları.",
    },
  ],
};

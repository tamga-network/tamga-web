import type { Publication } from "./types";

export const postQuantumIdentity: Publication = {
  id: "post-quantum-identity",
  authors: ["berke-karatas"],
  date: "2027-02-11",
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
      title: "Kuantum Sonrası Dönemde Dijital Kimlik: Shor Algoritmasından ML-DSA'ya",
      file: "/files/publications/post-quantum-identity-tr.pdf",
      pages: 27,
      sizeKb: 568,
      abstract:
        "Dijital kimliğin bütün yapısı, bugün RSA ve eliptik eğri kriptografisine dayanan dijital imzalara yaslanıyor; yeterince güçlü bir " +
        "kuantum bilgisayar Shor algoritmasıyla bu imzaları kırabilir. Yazı, kuantum tehdidini, NIST'in 2024'te yayımladığı ML-KEM, ML-DSA ve " +
        "SLH-DSA standartlarını ve bu algoritmaların kimlik belgelerine getirdiği boyut yükünü sıfırdan, küçük hesaplarla anlatıyor; " +
        "\"şimdi topla, sonra çöz\" riskini, karma imzaları ve AB, ETSI ve NIST'in 2030–2035 geçiş takvimlerini tartışıyor ve diziye kısa bir kapanış yapıyor.",
    },
  ],
};

import type { Publication } from "./types";

export const verifiableCredentials: Publication = {
  id: "verifiable-credentials",
  authors: ["berke-karatas"],
  date: "2026-11-10",
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
      title: "Doğrulanabilir Belgeler: Veren, Taşıyan, Doğrulayan",
      file: "/files/publications/verifiable-credentials-tr.pdf",
      pages: 26,
      sizeKb: 511,
      abstract:
        "Telefondaki bir belgenin fotoğrafı ya da taranmış PDF'i doğrulanamaz ve doğrulamak için belgeyi veren kuruma sormak gerekir; " +
        "doğrulanabilir belgede ise kurum makinenin okuyabileceği iddiaları imzalar, kişi de belgeyi kendi cüzdanında taşır. " +
        "Doğrulayan imzayı kontrol ederek, veren kuruma sormadan, belgenin değişmediğini, kimin verdiğini ve gösterene ait olduğunu anlar. " +
        "Yazı, W3C Verifiable Credentials, SD-JWT VC ve ISO mdoc biçimlerini örnek veri yapılarıyla karşılaştırıyor, belgeyi " +
        "sahibine bağlayan yöntemi adım adım anlatıyor ve AB'nin kimlik verisi ile öznitelik onayları için yaptığı biçim seçimini tartışıyor.",
    },
  ],
};

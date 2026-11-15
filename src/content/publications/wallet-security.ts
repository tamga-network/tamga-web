import type { Publication } from "./types";

export const walletSecurity: Publication = {
  id: "wallet-security",
  authors: ["berke-karatas"],
  date: "2027-01-07",
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
      title: "Cüzdan Güvenliği: Anahtar Nerede Saklanır, Telefon Gerçek mi?",
      file: "/files/publications/wallet-security-tr.pdf",
      pages: 31,
      sizeKb: 587,
      abstract:
        "Bir kimlik cüzdanının asıl değeri belgelerde değil, belgeleri kişiye bağlayan ve kopyalanmaması gereken gizli anahtarlardadır. " +
        "Yazı bu anahtarların telefonun güvenli donanımında (Secure Enclave, StrongBox, TEE) ya da uzak donanım güvenlik modüllerinde nasıl korunduğunu, " +
        "telefonun ve uygulamanın gerçekliğinin App Attest, Android anahtar kanıtı, Play Integrity ve AB'nin cüzdan birimi kanıtıyla (WIA ve anahtar kanıtı) nasıl gösterildiğini adım adım anlatıyor. " +
        "PIN ve biyometrinin neyi açtığını, telefon kaybolduğunda işleyen iptal zincirini ve anahtarların neden yedeklenmediğini de tartışıyor.",
    },
  ],
};

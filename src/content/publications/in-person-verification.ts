import type { Publication } from "./types";

export const inPersonVerification: Publication = {
  id: "in-person-verification",
  authors: ["berke-karatas"],
  date: "2026-12-31",
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
      title: "Yüz Yüze Doğrulama: NFC, Bluetooth ve Mobil Ehliyet",
      file: "/files/publications/in-person-verification-tr.pdf",
      pages: 27,
      sizeKb: 558,
      abstract:
        "Kapıda, kasada ya da yol kenarında belge göstermek çoğu zaman internetsiz, birkaç saniyelik ve karşıda bir insanın durduğu bir iştir. " +
        "Yazı, bu ihtiyaç için geliştirilen ISO/IEC 18013-5 mobil ehliyet standardını; QR ya da NFC ile tanışmayı, geçici anahtarlarla kurulan şifreli oturumu, " +
        "Bluetooth ile veri aktarımını ve hem veren kurumun hem telefonun imzasını sıra diyagramları ve örnek veri yapılarıyla anlatıyor. " +
        "Okuyucunun kendini cüzdana nasıl tanıttığını ve iki kişinin telefonları arasında belge göstermenin getirdiği kötüye kullanım risklerini de tartışıyor.",
    },
  ],
};

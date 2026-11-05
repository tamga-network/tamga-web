import type { Publication } from "./types";

/* Kurum yazısı: yazar Tamga Network (ekip üyesi değil; ekip profiline bağlanmaz). A dizisinden ayrı belge, numarası yok. */
export const signedListsToLedger: Publication = {
  id: "signed-lists-to-ledger",
  authors: ["Tamga Network"],
  date: "2026-11-05",
  kind: "report",
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
      title: "İmzalı Listelerden Deftere: Tamga Network'ün Zincir Tasarımı",
      file: "/files/publications/signed-lists-to-ledger-tr.pdf",
      pages: 28,
      sizeKb: 588,
      abstract:
        "Tamga Network'ün güveni bugün imzalı ve sürümlü güven listelerinde ve saatlik bir çapa günlüğünde durur; çalışan bir zincir " +
        "yoktur. Ağın ilk tasarımı bir blokzincirle başlıyordu; bu yazı o zincirin neden ertelendiğini, ertelenirken neden bir kenara " +
        "atılmadığını ve bugün hangi kurallarla bekletildiğini anlatıyor. Merkezdeki fikir projeksiyon ilkesidir: defter açıldığında da " +
        "kaynak imzalı listeler olarak kalır, defter yalnız onların ikinci ve değiştirilemez bir kaydı olur. Yazı, Hyperledger Besu ve " +
        "QBFT üzerine kurulan izinli defteri, kontratların haritasını, eşikli liste çapasını, belgenin verildiği andaki durumu, sert " +
        "iptali, listelerin geçmişinin deftere aktarılmasını ve yönetişim kurallarını adım adım açıklıyor. Doğrulama hiçbir adımda " +
        "deftere bağlı değildir ve deftere kişisel veri yazılmaz; defterin kodu yazılmış ve sınanmıştır, üretimde kapalıdır.",
      keywords: [
        "güven listeleri",
        "çapa günlüğü",
        "izinli defter",
        "Hyperledger Besu",
        "QBFT",
        "projeksiyon",
        "eşikli çapa",
        "yeniden oynatma",
        "eşdeğerlik testi",
        "göç penceresi",
        "sert iptal",
        "yönetişim",
      ],
    },
  ],
};

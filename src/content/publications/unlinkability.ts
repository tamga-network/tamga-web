import type { Publication } from "./types";

export const unlinkability: Publication = {
  id: "unlinkability",
  authors: ["berke-karatas"],
  date: "2026-12-03",
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
      title: "Bağlanamazlık: Doğrulayıcılar Seni Birbirine Anlatmasın",
      file: "/files/publications/unlinkability-tr.pdf",
      pages: 26,
      sizeKb: 493,
      abstract:
        "Seçici açıklama bir belgenin yalnızca gereken alanını gösterir, ama imza, cihaz anahtarı, özetler ve iptal sırası gibi teknik " +
        "değerler her gösterimde aynı kalırsa, belgeyi gören kurumlar kayıtlarını karşılaştırıp aynı kişiyle iş yaptıklarını anlayabilir. " +
        "Yazı, kimin kimi bağlayabileceğini ve bir belgenin hangi alanlarının iz bıraktığını sınıflıyor; toplu verilen tek kullanımlık " +
        "kopyaları, siteye özel takma adları, iptal listelerinde sürü gizliliğini ve sıfır bilgi ispatlarını karşılaştırıyor. " +
        "eIDAS 2.0'ın ve AB cüzdan mimari çerçevesinin bağlanamazlık şartlarını ve hâlâ açık olan soruları tartışıyor.",
    },
  ],
};

import type { Locale } from "@/i18n/routing";

/*
 * Changelog — ağın sürümleri (sade dille). Sürüm numaraları ağın yayınlarıdır (paket sürümleri npm'de ayrıdır).
 * Kaynak: tamga-network CHANGELOG.md (1.0.0 = 2026-10-02 ilk yayın; öncesi özel arşivde). Yeni sürüm en üste; her metin üç dilde.
 */

type L = Record<Locale, string>;
type LL = Record<Locale, string[]>;

export type ReleaseKind = "feature" | "security" | "fix";
export type SectionKind = "added" | "changed" | "fixed" | "security";

export type Release = {
  version: string;
  date: string;
  kind: ReleaseKind;
  title: L;
  sections: Partial<Record<SectionKind, LL>>;
  note?: L;
};

export const RELEASE_LABELS: Record<Locale, Record<ReleaseKind, string>> = {
  en: { feature: "Feature", security: "Security", fix: "Fix" },
  tr: { feature: "Özellik", security: "Güvenlik", fix: "Düzeltme" },
  tk: { feature: "Aýratynlyk", security: "Howpsuzlyk", fix: "Düzediş" },
};

export const SECTION_LABELS: Record<Locale, Record<SectionKind, string>> = {
  en: {
    added: "Added",
    changed: "Changed",
    fixed: "Fixed",
    security: "Security",
  },
  tr: {
    added: "Eklendi",
    changed: "Değiştirildi",
    fixed: "Düzeltildi",
    security: "Güvenlik",
  },
  tk: {
    added: "Goşuldy",
    changed: "Üýtgedildi",
    fixed: "Düzedildi",
    security: "Howpsuzlyk",
  },
};

export const CHANGELOG_PAGE: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    more: string;
    latest: string;
  }
> = {
  en: {
    title: "Release notes",
    description: "Tamga Network releases: rules, documentation, open packages, trust lists and services.",
    eyebrow: "Release notes",
    lead: "Every release of the network, newest first. Package versions are listed separately on npm. Tamga Wallet keeps its own release notes.",
    more: "Package changelog on GitHub",
    latest: "Latest",
  },
  tr: {
    title: "Sürüm notları",
    description: "Tamga Network sürümleri: kurallar, belgeler, açık paketler, güven listeleri ve servisler.",
    eyebrow: "Sürüm notları",
    lead: "Ağın her sürümü, en yenisi üstte. Paket sürümleri npm'de ayrıca listelenir. Tamga Wallet kendi sürüm notlarını tutar.",
    more: "GitHub'da paket değişiklikleri",
    latest: "Son sürüm",
  },
  tk: {
    title: "Wersiýa bellikleri",
    description: "Tamga Network wersiýalary: düzgünler, resminamalar, açyk paketler, ynam sanawlary we hyzmatlar.",
    eyebrow: "Wersiýa bellikleri",
    lead: "Toruň her wersiýasy, iň täzesi ýokarda. Paket wersiýalary npm-de aýratyn görkezilýär. Tamga Wallet öz wersiýa belliklerini saklaýar.",
    more: "GitHub-da paket üýtgeşmeleri",
    latest: "Iň soňky",
  },
};

export const RELEASES: Release[] = [
  {
    version: "v1.0.0",
    date: "2026-10-02",
    kind: "feature",
    title: {
      en: "First release",
      tr: "İlk yayın",
      tk: "Ilkinji çykyş",
    },
    sections: {
      added: {
        en: [
          "Rules: Tamga ARF 1.0 — the Architecture and Reference Framework, the Trust Framework, the Tamga Rulebook and the credential-type rulebooks (Education, Identity, Event Ticket).",
          "Developer documentation in English and Turkish: guides, concepts, specifications, decisions and a glossary.",
          "Open packages: @tamga-network/* on npm as a pre-release (0.x).",
          "Services: the trust list publisher, Tamga Verify and the network's reference services.",
          "Federation: reading external trust lists (ETSI TS 119 602).",
        ],
        tr: [
          "Kurallar: Tamga ARF 1.0 — Mimari ve Referans Çerçevesi, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları (Education, Identity, Event Ticket).",
          "İngilizce ve Türkçe geliştirici belgeleri: rehberler, kavramlar, şartnameler, kararlar ve sözlük.",
          "Açık paketler: npm'de @tamga-network/*, ön sürüm (0.x).",
          "Servisler: güven listesi yayıncısı, Tamga Verify ve ağın referans hizmetleri.",
          "Federasyon: dış güven listelerini okuma (ETSI TS 119 602).",
        ],
        tk: [
          "Düzgünler: Tamga ARF 1.0 — Arhitektura we salgylanma çarçuwasy, Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary (Education, Identity, Event Ticket).",
          "Iňlis we türk dillerinde işläp düzüjiler üçin resminamalar: gollanmalar, düşünjeler, spesifikasiýalar, kararlar we sözlük.",
          "Açyk paketler: npm-de @tamga-network/*, deslapky wersiýa (0.x).",
          "Hyzmatlar: ynam sanawyny çap ediji, Tamga Verify we toruň salgylanma hyzmatlary.",
          "Federasiýa: daşky ynam sanawlaryny okamak (ETSI TS 119 602).",
        ],
      },
    },
  },
];

import type { Locale } from "@/i18n/routing";

/*
 * Changelog — ağın sürümleri (sade dille). Sürüm numaraları ağın yayınlarıdır (paket sürümleri npm'de ayrıdır).
 * Kaynak: tamga-network CHANGELOG.md (1.0.0 = 2026-10-02 ilk yayın; öncesi özel arşivde). Yeni sürüm en üste; her metin üç dilde.
 * Duyuruya kadar sürüm 1.0.0 kalır; aynı sürüm içindeki tarihli güncellemeler ayrı kayıt olur ve `id` ile ayrılır.
 */

type L = Record<Locale, string>;
type LL = Record<Locale, string[]>;

export type ReleaseKind = "feature" | "security" | "fix";
export type SectionKind = "added" | "changed" | "fixed" | "security";

export type Release = {
  /** Bağlantı çapası; aynı sürümde birden çok kayıt varsa (ör. "v1.0.0-2026-10-06") */
  id?: string;
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
    description:
      "Tamga Network releases: rules, documentation, open packages, trust lists and services.",
    eyebrow: "Release notes",
    lead: "Every release of the network, newest first. Package versions are listed separately on npm. Tamga Wallet keeps its own release notes.",
    more: "Package changelog on GitHub",
    latest: "Latest",
  },
  tr: {
    title: "Sürüm notları",
    description:
      "Tamga Network sürümleri: kurallar, belgeler, açık paketler, güven listeleri ve servisler.",
    eyebrow: "Sürüm notları",
    lead: "Ağın her sürümü, en yenisi üstte. Paket sürümleri npm'de ayrıca listelenir. Tamga Wallet kendi sürüm notlarını tutar.",
    more: "GitHub'da paket değişiklikleri",
    latest: "Son sürüm",
  },
  tk: {
    title: "Wersiýa bellikleri",
    description:
      "Tamga Network wersiýalary: düzgünler, resminamalar, açyk paketler, ynam sanawlary we hyzmatlar.",
    eyebrow: "Wersiýa bellikleri",
    lead: "Toruň her wersiýasy, iň täzesi ýokarda. Paket wersiýalary npm-de aýratyn görkezilýär. Tamga Wallet öz wersiýa belliklerini saklaýar.",
    more: "GitHub-da paket üýtgeşmeleri",
    latest: "Iň soňky",
  },
};

export const RELEASES: Release[] = [
  {
    id: "v1.0.0-2026-10-09",
    version: "v1.0.0",
    date: "2026-10-09",
    kind: "fix",
    title: {
      en: "Final OpenID4VCI/VP and HAIP alignment, packages 0.3.1",
      tr: "OpenID4VCI/VP ve HAIP son sürümüne uyum, paketler 0.3.1",
      tk: "OpenID4VCI/VP we HAIP soňky wersiýasyna laýyklyk, paketler 0.3.1",
    },
    sections: {
      changed: {
        en: [
          "Revocation lists stay valid for 6 hours and are still republished every 2 minutes: a revocation shows within minutes, and a short server outage no longer stops checks (verifiers on 0.3.1). The revocation list endpoints keep no access log, and no network service records IP addresses.",
          "Zero-knowledge presentations are accepted only when the verifier's policy says so; short-lived ZK copies that close the revocation gap are decided (ADR-0044) and come in 0.4.0.",
          "Issuance follows OpenID4VCI 1.0 Final: key attestations use the type key-attestation+jwt, error codes match the standard (unknown_credential_configuration, invalid_nonce, credential_request_denied), and the nonce comes only from the nonce endpoint.",
          "The @tamga-network/* packages are on npm as the 0.3.1 test release; the stable 1.0.0 comes when everything is ready.",
        ],
        tr: [
          "İptal listeleri 6 saat geçerli, yine 2 dakikada bir yenilenir: iptal birkaç dakikada görünür, sunucunun kısa kesintisi kontrolleri durdurmaz (0.3.1 kullanan doğrulayıcılarda). İptal listesi uçları erişim kaydı tutmaz; ağın hiçbir servisi IP adresi kaydetmez.",
          "Sıfır bilgi ispatıyla gösterim yalnız doğrulayıcının kuralı açıkça kabul ediyorsa geçer; iptal açığını kapatan kısa ömürlü ZK kopyaları kararlaştırıldı (ADR-0044), 0.4.0 ile gelir.",
          "Belge verme OpenID4VCI 1.0 Final'e uyar: anahtar kanıtının türü key-attestation+jwt, hata kodları standarttaki gibi (unknown_credential_configuration, invalid_nonce, credential_request_denied), tek kullanımlık değer (nonce) yalnız kendi ucundan alınır.",
          "@tamga-network/* paketleri npm'de 0.3.1 deneme sürümünde; kararlı 1.0.0 hazır olunca gelir.",
        ],
        tk: [
          "Ýatyrma sanawlary 6 sagat güýjüne eýe we her 2 minutda täzelenýär: ýatyrma birnäçe minutda görünýär, serweriň gysga kesilmesi barlaglary saklamaýar (0.3.1 ulanýan barlaýjylarda). Ýatyrma sanawlarynyň nokatlary giriş ýazgysyny saklamaýar; toruň hiç bir hyzmaty IP salgylaryny ýazmaýar.",
          "Nol bilimli subutnama bilen görkezmek diňe barlaýjynyň düzgüni aç-açan kabul etse geçýär; ýatyrma boşlugyny ýapýan gysga ömürli ZK nusgalary karar edildi (ADR-0044), 0.4.0 bilen geler.",
          "Resminama bermek OpenID4VCI 1.0 Final-a laýyk: açar subutnamasynyň görnüşi key-attestation+jwt, ýalňyşlyk kodlary standartdaky ýaly (unknown_credential_configuration, invalid_nonce, credential_request_denied), birgezeklik baha (nonce) diňe öz nokadyndan alynýar.",
          "@tamga-network/* paketleri npm-de 0.3.1 synag wersiýasynda; durnukly 1.0.0 taýýar bolanda geler.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-06",
    version: "v1.0.0",
    date: "2026-10-06",
    kind: "feature",
    title: {
      en: "Network and wallets separated",
      tr: "Ağ ve cüzdanlar ayrıldı",
      tk: "Tor we gapjyklar aýryldy",
    },
    sections: {
      changed: {
        en: [
          "Tamga Network runs no wallet (ADR-0042). It lists wallets in its trust list; Tamga Wallet, the network's first wallet, is a separate project and joins like any other wallet. The network's wallet services (on the main network and in the sandbox) were removed: every wallet runs its own wallet provider, and Tamga Wallet runs its own.",
          "One sandbox for everyone: wallet, institution and verifier developers test on sandbox.tamga.network. A wallet developer registers their own wallet provider in the sandbox list (on request, for now) and tests against the sample institutions, the identity service and the verifier.",
          "One favicon: the network's mark is the same at every size.",
        ],
        tr: [
          "Tamga Network cüzdan işletmez (ADR-0042). Cüzdanları güven listesinde listeler; ağın ilk cüzdanı Tamga Wallet ayrı bir projedir ve ağa her cüzdan gibi katılır. Ağın cüzdan hizmetleri (gerçek ağda ve sandbox'ta) kaldırıldı: her cüzdan kendi cüzdan sağlayıcısını işletir, Tamga Wallet da kendisininkini.",
          "Herkes için tek sandbox: cüzdan, kurum ve doğrulayıcı geliştiricileri sandbox.tamga.network'te dener. Cüzdan geliştiricisi kendi cüzdan sağlayıcısını sandbox listesine kaydettirir (şimdilik başvuruyla) ve örnek kurumlarla, kimlik servisiyle ve doğrulayıcıyla dener.",
          "Tek favicon: ağın işareti her boyutta aynı.",
        ],
        tk: [
          "Tamga Network gapjyk işletmeýär (ADR-0042). Gapjyklary ynam sanawynda görkezýär; toruň ilkinji gapjygy Tamga Wallet aýry taslama we tora beýleki gapjyklar ýaly goşulýar. Toruň gapjyk hyzmatlary (hakyky torda we sandbox-da) aýryldy: her gapjyk öz gapjyk üpjün edijisini işledýär, Tamga Wallet hem özüňkini.",
          "Hemmeler üçin bir sandbox: gapjyk, gurama we barlaýjy işläp düzüjileri sandbox.tamga.network-da synaýar. Gapjyk işläp düzüjisi öz gapjyk üpjün edijisini sandbox sanawyna hasaba aldyrýar (häzirlikçe haýyş boýunça) we nusga guramalar, şahsyýet hyzmaty we barlaýjy bilen synaýar.",
          "Bir favicon: toruň belgisi ähli ölçeglerde birmeňzeş.",
        ],
      },
      added: {
        en: [
          "New open package @tamga-network/zk (on npm with the 0.2.0 test release): the wallet side of zero-knowledge proofs for mdoc credentials, made on the device (first use: proving “over 18” without the birth date; ADR-0032). Verification is in @tamga-network/verifier/zk.",
        ],
        tr: [
          "Yeni açık paket @tamga-network/zk (npm'de 0.2.0 deneme sürümüyle): mdoc belgeleri için sıfır bilgi ispatının cüzdan tarafı, cihazda üretilir (ilk kullanım: doğum tarihini vermeden “18 yaş üstü” kanıtı; ADR-0032). Doğrulama @tamga-network/verifier/zk'dadır.",
        ],
        tk: [
          "Täze açyk paket @tamga-network/zk (npm-de 0.2.0 synag wersiýasy bilen): mdoc resminamalary üçin nol bilimli subutnamanyň gapjyk tarapy, enjamda döredilýär (ilkinji ulanylyşy: doglan senäni açman “18 ýaşdan uly” subutnamasy; ADR-0032). Barlag @tamga-network/verifier/zk-da.",
        ],
      },
    },
  },
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

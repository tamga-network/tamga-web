import type { Locale } from "@/i18n/routing";
import { SANDBOX_HOST, SANDBOX_URL } from "./docs-nav";

type L = Record<Locale, string>;

/** Ağın herkese açık adresleri. Tek kaynak: üst menü (Ekosistem), belge ve Hakkında sayfalarındaki tablo, alt bilgi. */
export type Subdomain = {
  host: string;
  url: string;
  /** Kısa ad (menüde) */
  name: L;
  /** Ne işe yarar (tabloda) */
  desc: L;
  /** Kullanılan standart ya da biçim (tabloda, varsa) */
  std?: string;
  group: "learn" | "trust" | "services";
  /** Kimin için (ağ adresleri sayfası) */
  serves: L;
  /** Henüz kurulmadı ("Yakında" gösterilir) */
  soon?: boolean;
};

export const SUBDOMAINS: Subdomain[] = [
  {
    host: "docs.tamga.network",
    serves: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler" },
    url: "https://docs.tamga.network",
    group: "learn",
    name: {
      en: "Developer docs",
      tr: "Geliştirici belgeleri",
      tk: "Işläp düzüji resminamalary",
    },
    desc: {
      en: "guides, specifications, decisions, packages and API references",
      tr: "rehberler, şartnameler, kararlar, paketler ve API başvuruları",
      tk: "gollanmalar, spesifikasiýalar, kararlar, paketler we API salgylanmalary",
    },
  },
  {
    host: "arf.tamga.network",
    serves: { en: "States, institutions, auditors", tr: "Devletler, kurumlar, denetçiler", tk: "Döwletler, guramalar, auditorlar" },
    url: "https://arf.tamga.network",
    group: "learn",
    name: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF" },
    desc: {
      en: "architecture and reference framework, Trust Framework, the Tamga Rulebook and the credential-type rulebooks",
      tr: "mimari ve referans çerçevesi, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları",
      tk: "arhitektura we salgylanma çarçuwasy, Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary",
    },
  },
  {
    host: "trust.tamga.network",
    serves: { en: "Wallets and verifiers", tr: "Cüzdanlar ve doğrulayıcılar", tk: "Gapjyklar we barlaýjylar" },
    url: "https://trust.tamga.network/",
    group: "trust",
    std: "ETSI TS 119 612",
    name: { en: "Trust lists", tr: "Güven listeleri", tk: "Ynam sanawlary" },
    desc: {
      en: "signed lists of institutions, verifiers and wallet providers, with a public anchor log",
      tr: "kurumların, doğrulayıcıların ve cüzdan sağlayıcılarının imzalı listeleri; herkese açık çapa günlüğüyle",
      tk: "guramalaryň, barlaýjylaryň we gapjyk üpjün edijileriň gol çekilen sanawlary; açyk labyr žurnaly bilen",
    },
  },
  {
    host: "schemas.tamga.network",
    serves: { en: "Issuers and verifiers", tr: "Belge verenler ve doğrulayıcılar", tk: "Resminama berijiler we barlaýjylar" },
    url: "https://schemas.tamga.network/v1/catalogue.json",
    group: "trust",
    std: "SD-JWT VC Type Metadata",
    name: {
      en: "Credential types",
      tr: "Belge türleri",
      tk: "Resminama görnüşleri",
    },
    desc: {
      en: "public catalogue of credential types and their definitions",
      tr: "belge türlerinin ve tanımlarının herkese açık kataloğu",
      tk: "resminama görnüşleriniň we kesgitlemeleriniň açyk katalogy",
    },
  },
  {
    host: "status.tamga.network",
    serves: { en: "Verifiers and wallets", tr: "Doğrulayıcılar ve cüzdanlar", tk: "Barlaýjylar we gapjyklar" },
    url: "https://status.tamga.network",
    group: "trust",
    std: "Token Status List",
    name: {
      en: "Revocation lists",
      tr: "İptal listeleri",
      tk: "Ýatyrylyş sanawlary",
    },
    desc: {
      en: "revocation and suspension, published at fixed times; no personal data",
      tr: "iptal ve askıya alma, sabit aralıkla yayınlanır; kişisel veri yok",
      tk: "ýatyrylyş we togtatma, kesgitli aralykda çap edilýär; şahsy maglumat ýok",
    },
  },
  {
    host: "issuer.tamga.network",
    serves: { en: "Institutions", tr: "Kurumlar", tk: "Guramalar" },
    url: "https://issuer.tamga.network",
    group: "services",
    std: "OpenID4VCI",
    name: {
      en: "Issuing service",
      tr: "Belge verme servisi",
      tk: "Resminama beriş hyzmaty",
    },
    desc: {
      en: "issues credentials for each institution on its own path, with the institution's key",
      tr: "her kurum için kendi yolunda, kurumun anahtarıyla belge verir",
      tk: "her gurama üçin öz ýolunda, guramanyň açary bilen resminama berýär",
    },
  },
  {
    host: "console.tamga.network",
    serves: { en: "Institution staff", tr: "Kurum personeli", tk: "Gurama işgärleri" },
    url: "https://console.tamga.network",
    group: "services",
    name: {
      en: "Institution Console",
      tr: "Kurum Konsolu",
      tk: "Gurama konsoly",
    },
    desc: {
      en: "institutions manage issuing, revocation and statistics",
      tr: "kurumlar belge verme, iptal ve istatistikleri yönetir",
      tk: "guramalar resminama bermegi, ýatyrylyşy we statistikany dolandyrýar",
    },
  },
  {
    host: "verify.tamga.network",
    serves: { en: "Websites and verifiers", tr: "Web siteleri ve doğrulayıcılar", tk: "Web saýtlar we barlaýjylar" },
    url: "https://verify.tamga.network",
    group: "services",
    std: "OpenID4VP",
    name: { en: "Tamga Verify", tr: "Tamga Verify", tk: "Tamga Verify" },
    desc: {
      en: "hosted verifier and the “Sign in with Tamga” kit for websites",
      tr: "barındırılan doğrulayıcı ve web siteleri için “Tamga ile giriş yap” kiti",
      tk: "ýerleşdirilen barlaýjy we web saýtlar üçin “Tamga bilen gir” toplumy",
    },
  },
  {
    host: "id.tamga.network",
    serves: { en: "People getting an identity credential", tr: "Kimlik belgesi alan kişiler", tk: "Şahsyýet resminamasyny alýan adamlar" },
    url: "https://id.tamga.network",
    group: "services",
    name: {
      en: "Identity service",
      tr: "Kimlik servisi",
      tk: "Şahsyýet hyzmaty",
    },
    desc: {
      en: "remote identity check (document + liveness) and the identity credential",
      tr: "uzaktan kimlik doğrulama (belge + canlılık) ve kimlik belgesi",
      tk: "uzakdan şahsyýet barlagy (resminama + janlylyk) we şahsyýet resminamasy",
    },
  },
];

/**
 * Test ağı. SUBDOMAINS'te değil (menülerde ve tablolarda gerçek ağ adresleriyle karışmasın); yalnız /network sayfasında
 * listelenir. Adres ve "Yakında" durumu docs-nav.ts'teki SANDBOX_LIVE'dan.
 */
export const SANDBOX_SUBDOMAIN: Subdomain = {
  host: SANDBOX_HOST,
  serves: { en: "Wallet, institution and verifier developers", tr: "Cüzdan, kurum ve doğrulayıcı geliştiricileri", tk: "Gapjyk, gurama we barlaýjy işläp düzüjileri" },
  url: SANDBOX_URL,
  group: "services",
  soon: SANDBOX_URL.startsWith("https://docs."),
  name: { en: "Sandbox", tr: "Sandbox", tk: "Sandbox" },
  desc: {
    en: "separate test network: sample institutions, made-up people and test credentials; wallet developers register their own wallet provider and test their wallet here; no real wallet or verifier trusts it",
    tr: "ayrı test ağı: örnek kurumlar, uydurma kişiler ve test belgeleri; cüzdan geliştiricileri kendi cüzdan sağlayıcılarını kaydettirip cüzdanlarını burada dener; gerçek hiçbir cüzdan ya da doğrulayıcı ona güvenmez",
    tk: "aýry synag ulgamy: nusga guramalar, oýlanyp tapylan adamlar we synag resminamalary; gapjyk işläp düzüjileri öz gapjyk üpjün edijisini hasaba aldyryp, gapjygyny şu ýerde synaýar; hiç bir hakyky gapjyk ýa-da barlaýjy oňa ynanmaýar",
  },
};

export const ECOSYSTEM_GROUPS: Record<Subdomain["group"], L> = {
  learn: { en: "Read", tr: "Okuyun", tk: "Okaň" },
  trust: { en: "Trust layer", tr: "Güven katmanı", tk: "Ynam gatlagy" },
  services: { en: "Services", tr: "Servisler", tk: "Hyzmatlar" },
};

/** Paket ve kod adresleri (alt bilgi, geliştirici sayfası). */
export const DEV_LINKS = {
  github: "https://github.com/tamga-network",
  npm: "https://www.npmjs.com/org/tamga-network",
  devDocs: "https://docs.tamga.network",
  apiRef: "https://docs.tamga.network/api/",
  packages: "https://docs.tamga.network/packages/",
};

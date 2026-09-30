import type { Locale } from "@/i18n/routing";

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
};

export const SUBDOMAINS: Subdomain[] = [
  {
    host: "docs.tamga.network",
    url: "https://docs.tamga.network",
    group: "learn",
    name: {
      en: "Developer docs",
      tr: "Geliştirici belgeleri",
      tk: "Işläp düzüji resminamalary",
    },
    desc: {
      en: "specifications, decisions, packages and API references",
      tr: "spesifikasyonlar, kararlar, paketler ve API başvuruları",
      tk: "spesifikasiýalar, kararlar, paketler we API salgylanmalary",
    },
  },
  {
    host: "arf.tamga.network",
    url: "https://arf.tamga.network",
    group: "learn",
    name: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF" },
    desc: {
      en: "architecture and reference framework, trust framework and rulebooks",
      tr: "mimari ve referans çerçevesi, güven çerçevesi ve kural kitapları",
      tk: "arhitektura we salgylanma çarçuwasy, ynam çarçuwasy we düzgünnamalar",
    },
  },
  {
    host: "trust.tamga.network",
    url: "https://trust.tamga.network/lotl.jws",
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
    url: "https://verify.tamga.network",
    group: "services",
    std: "OpenID4VP",
    name: { en: "Verifier", tr: "Doğrulayıcı", tk: "Barlaýjy" },
    desc: {
      en: "reference verifier and the sign-in kit for websites",
      tr: "referans doğrulayıcı ve web siteleri için giriş kiti",
      tk: "salgylanma barlaýjysy we web saýtlar üçin giriş toplumy",
    },
  },
  {
    host: "id.tamga.network",
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
  {
    host: "wallet.tamga.network",
    url: "https://wallet.tamga.network",
    group: "services",
    name: {
      en: "Wallet provider",
      tr: "Cüzdan sağlayıcı",
      tk: "Gapjyk üpjün edijisi",
    },
    desc: {
      en: "vouches that a wallet is the genuine app on a genuine device",
      tr: "cüzdanın gerçek uygulama ve gerçek cihaz olduğuna kefil olur",
      tk: "gapjygyň hakyky programma we hakyky enjam bolandygyna kepil geçýär",
    },
  },
];

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

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
    serves: { en: "Developers", tr: "Geliştiriciler", tk: "Işläp düzüjiler", az: "Tərtibatçılar" },
    url: "https://docs.tamga.network",
    group: "learn",
    name: {
      en: "Developer docs",
      tr: "Geliştirici belgeleri",
      tk: "Işläp düzüji resminamalary",
      az: "Tərtibatçı sənədləri",
    },
    desc: {
      en: "guides, specifications, decisions, packages and API references",
      tr: "rehberler, şartnameler, kararlar, paketler ve API başvuruları",
      tk: "gollanmalar, spesifikasiýalar, kararlar, paketler we API salgylanmalary",
      az: "bələdçilər, spesifikasiyalar, qərarlar, paketlər və API arayışları",
    },
  },
  {
    host: "arf.tamga.network",
    serves: { en: "States, institutions, auditors", tr: "Devletler, kurumlar, denetçiler", tk: "Döwletler, guramalar, auditorlar", az: "Dövlətlər, qurumlar, auditorlar" },
    url: "https://arf.tamga.network",
    group: "learn",
    name: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF", az: "Tamga ARF" },
    desc: {
      en: "architecture and reference framework, Trust Framework, the Tamga Rulebook and the credential-type rulebooks",
      tr: "mimari ve referans çerçevesi, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları",
      tk: "arhitektura we salgylanma çarçuwasy, Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary",
      az: "arxitektura və istinad çərçivəsi, Trust Framework, Tamga Rulebook və rəqəmsal sənəd növlərinin rulebook-ları",
    },
  },
  {
    host: "trust.tamga.network",
    serves: { en: "Wallets and verifiers", tr: "Cüzdanlar ve doğrulayıcılar", tk: "Gapjyklar we barlaýjylar", az: "Rəqəmsal cüzdanlar və yoxlayan tərəflər" },
    url: "https://trust.tamga.network/",
    group: "trust",
    std: "ETSI TS 119 612",
    name: { en: "Trust lists", tr: "Güven listeleri", tk: "Ynam sanawlary", az: "Etibar siyahıları" },
    desc: {
      en: "signed lists of institutions, verifiers and wallet providers, with a public anchor log",
      tr: "kurumların, doğrulayıcıların ve cüzdan sağlayıcılarının imzalı listeleri; herkese açık çapa günlüğüyle",
      tk: "guramalaryň, barlaýjylaryň we gapjyk üpjün edijileriň gol çekilen sanawlary; açyk labyr žurnaly bilen",
      az: "qurumların, yoxlayan tərəflərin və cüzdan provayderlərinin imzalanmış siyahıları; açıq lövbər jurnalı ilə",
    },
  },
  {
    host: "schemas.tamga.network",
    serves: { en: "Issuers and verifiers", tr: "Belge verenler ve doğrulayıcılar", tk: "Resminama berijiler we barlaýjylar", az: "Sənədi verən qurumlar və yoxlayan tərəflər" },
    url: "https://schemas.tamga.network/v1/catalogue.json",
    group: "trust",
    std: "SD-JWT VC Type Metadata",
    name: {
      en: "Credential types",
      tr: "Belge türleri",
      tk: "Resminama görnüşleri",
      az: "Rəqəmsal sənəd növləri",
    },
    desc: {
      en: "public catalogue of credential types and their definitions",
      tr: "belge türlerinin ve tanımlarının herkese açık kataloğu",
      tk: "resminama görnüşleriniň we kesgitlemeleriniň açyk katalogy",
      az: "rəqəmsal sənəd növlərinin və onların təriflərinin açıq kataloqu",
    },
  },
  {
    host: "status.tamga.network",
    serves: { en: "Verifiers and wallets", tr: "Doğrulayıcılar ve cüzdanlar", tk: "Barlaýjylar we gapjyklar", az: "Yoxlayan tərəflər və rəqəmsal cüzdanlar" },
    url: "https://status.tamga.network",
    group: "trust",
    std: "Token Status List",
    name: {
      en: "Revocation lists",
      tr: "İptal listeleri",
      tk: "Ýatyrylyş sanawlary",
      az: "Ləğv siyahıları",
    },
    desc: {
      en: "revocation and suspension, published at fixed times; no personal data",
      tr: "iptal ve askıya alma, sabit aralıkla yayınlanır; kişisel veri yok",
      tk: "ýatyrylyş we togtatma, kesgitli aralykda çap edilýär; şahsy maglumat ýok",
      az: "ləğv və dayandırma, müəyyən vaxtlarda dərc olunur; fərdi məlumatlar yoxdur",
    },
  },
  {
    host: "issuer.tamga.network",
    serves: { en: "Institutions", tr: "Kurumlar", tk: "Guramalar", az: "Qurumlar" },
    url: "https://issuer.tamga.network",
    group: "services",
    std: "OpenID4VCI",
    name: {
      en: "Issuing service",
      tr: "Belge verme servisi",
      tk: "Resminama beriş hyzmaty",
      az: "Sənəd vermə xidməti",
    },
    desc: {
      en: "issues credentials for each institution on its own path, with the institution's key",
      tr: "her kurum için kendi yolunda, kurumun anahtarıyla belge verir",
      tk: "her gurama üçin öz ýolunda, guramanyň açary bilen resminama berýär",
      az: "hər qurum üçün öz yolunda, qurumun açarı ilə rəqəmsal sənədlər verir",
    },
  },
  {
    host: "console.tamga.network",
    serves: { en: "Institution staff", tr: "Kurum personeli", tk: "Gurama işgärleri", az: "Qurum əməkdaşları" },
    url: "https://console.tamga.network",
    group: "services",
    name: {
      en: "Institution Console",
      tr: "Kurum Konsolu",
      tk: "Gurama konsoly",
      az: "Qurum Konsolu",
    },
    desc: {
      en: "institutions manage issuing, revocation and statistics",
      tr: "kurumlar belge verme, iptal ve istatistikleri yönetir",
      tk: "guramalar resminama bermegi, ýatyrylyşy we statistikany dolandyrýar",
      az: "qurumlar sənəd verilməsini, ləğvi və statistikanı idarə edir",
    },
  },
  {
    host: "verify.tamga.network",
    serves: { en: "Websites and verifiers", tr: "Web siteleri ve doğrulayıcılar", tk: "Web saýtlar we barlaýjylar", az: "Veb-saytlar və yoxlayan tərəflər" },
    url: "https://verify.tamga.network",
    group: "services",
    std: "OpenID4VP",
    name: { en: "Tamga Verify", tr: "Tamga Verify", tk: "Tamga Verify", az: "Tamga Verify" },
    desc: {
      en: "hosted verifier and the “Sign in with Tamga” kit for websites",
      tr: "barındırılan doğrulayıcı ve web siteleri için “Tamga ile giriş yap” kiti",
      tk: "ýerleşdirilen barlaýjy we web saýtlar üçin “Tamga bilen gir” toplumy",
      az: "yerləşdirilmiş yoxlayan tərəf xidməti və veb-saytlar üçün “Tamga ilə daxil olun” dəsti",
    },
  },
  {
    host: "id.tamga.network",
    serves: { en: "People getting an identity credential", tr: "Kimlik belgesi alan kişiler", tk: "Şahsyýet resminamasyny alýan adamlar", az: "Şəxsiyyət rəqəmsal sənədi alan şəxslər" },
    url: "https://id.tamga.network",
    group: "services",
    name: {
      en: "Identity service",
      tr: "Kimlik servisi",
      tk: "Şahsyýet hyzmaty",
      az: "Şəxsiyyət xidməti",
    },
    desc: {
      en: "remote identity check (document + liveness) and the identity credential",
      tr: "uzaktan kimlik doğrulama (belge + canlılık) ve kimlik belgesi",
      tk: "uzakdan şahsyýet barlagy (resminama + janlylyk) we şahsyýet resminamasy",
      az: "məsafədən şəxsiyyət yoxlaması (sənəd + canlılıq) və şəxsiyyət rəqəmsal sənədi",
    },
  },
];

/**
 * Test ağı. SUBDOMAINS'te değil (menülerde ve tablolarda gerçek ağ adresleriyle karışmasın); yalnız /network sayfasında
 * listelenir. Adres ve "Yakında" durumu docs-nav.ts'teki SANDBOX_LIVE'dan.
 */
export const SANDBOX_SUBDOMAIN: Subdomain = {
  host: SANDBOX_HOST,
  serves: { en: "Wallet, institution and verifier developers", tr: "Cüzdan, kurum ve doğrulayıcı geliştiricileri", tk: "Gapjyk, gurama we barlaýjy işläp düzüjileri", az: "Rəqəmsal cüzdan, qurum və yoxlayan tərəf tərtibatçıları" },
  url: SANDBOX_URL,
  group: "services",
  soon: SANDBOX_URL.startsWith("https://docs."),
  name: { en: "Sandbox", tr: "Sandbox", tk: "Sandbox", az: "Sandbox" },
  desc: {
    en: "separate test network: sample institutions, made-up people and test credentials, an optional real identity check (daily and monthly caps) next to the quick test, and test institution accounts; wallet developers register their own wallet provider and test their wallet here; no real wallet or verifier trusts it",
    tr: "ayrı test ağı: örnek kurumlar, uydurma kişiler ve test belgeleri, hızlı denemenin yanında isteğe bağlı gerçek kimlik doğrulama (günlük ve aylık tavanlı) ve test kurumu hesapları; cüzdan geliştiricileri kendi cüzdan sağlayıcılarını kaydettirip cüzdanlarını burada dener; gerçek hiçbir cüzdan ya da doğrulayıcı ona güvenmez",
    tk: "aýry synag ulgamy: nusga guramalar, oýlanyp tapylan adamlar we synag resminamalary, çalt synagyň ýanynda islege bagly hakyky şahsyýet barlagy (gündelik we aýlyk çägi bilen) we synag gurama hasaplary; gapjyk işläp düzüjileri öz gapjyk üpjün edijisini hasaba aldyryp, gapjygyny şu ýerde synaýar; hiç bir hakyky gapjyk ýa-da barlaýjy oňa ynanmaýar",
    az: "ayrıca test şəbəkəsi: nümunə qurumlar, uydurma şəxslər və test rəqəmsal sənədləri, sürətli testin yanında istəyə bağlı real şəxsiyyət yoxlaması (gündəlik və aylıq limitlərlə) və test qurum hesabları; rəqəmsal cüzdan tərtibatçıları öz cüzdan provayderlərini qeydiyyatdan keçirir və rəqəmsal cüzdanlarını burada sınaqdan keçirirlər; heç bir real rəqəmsal cüzdan və ya yoxlayan tərəf ona etibar etmir",
  },
};

export const ECOSYSTEM_GROUPS: Record<Subdomain["group"], L> = {
  learn: { en: "Read", tr: "Okuyun", tk: "Okaň", az: "Oxuyun" },
  trust: { en: "Trust layer", tr: "Güven katmanı", tk: "Ynam gatlagy", az: "Etibar qatı" },
  services: { en: "Services", tr: "Servisler", tk: "Hyzmatlar", az: "Xidmətlər" },
};

/** Paket ve kod adresleri (alt bilgi, geliştirici sayfası). */
export const DEV_LINKS = {
  github: "https://github.com/tamga-network",
  npm: "https://www.npmjs.com/org/tamga-network",
  devDocs: "https://docs.tamga.network",
  apiRef: "https://docs.tamga.network/api/",
  packages: "https://docs.tamga.network/packages/",
};

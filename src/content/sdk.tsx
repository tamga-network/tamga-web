import type { Locale } from "@/i18n/routing";
import { EXAMPLES } from "@/content/examples.generated";

/*
 * SDK: açık kaynak @tamga-network paketleri, kurulum ve çalışan örnekler. /sdk sayfası ve geliştirici belgesi ortak kullanır.
 * Kaynak: tamga-network packages/*\/package.json açıklamaları, examples/ (scripts/sync-examples.mjs), D-OSS-2.
 */

type L = Record<Locale, string>;

export const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;
/* docs.tamga.network'te sayfası olmayan paketler (zk) depo README'sine gider. */
const DOCS_OVERRIDE: Record<string, string> = {
  "@tamga-network/zk": "https://github.com/tamga-network/tamga-network/tree/main/packages/zk#readme",
};
export const pkgDocsUrl = (name: string) =>
  DOCS_OVERRIDE[name] ?? `https://docs.tamga.network/packages/${name.replace("@tamga-network/", "")}`;

/* soon: npm'de henüz olmayan paket için; bugün dokuz paketin hepsi npm'de (0.7.4). */
export const PACKAGES: { name: string; what: L; soon?: L }[] = [
  {
    name: "@tamga-network/core",
    what: {
      en: "hashes, identifier derivation, certificate helpers",
      tr: "özetler, kimlik türetme, sertifika yardımcıları",
      tk: "heşler, belgi almak, sertifikat kömekçileri",
      az: "heşlər, identifikatorun törədilməsi, sertifikat köməkçiləri",
    },
  },
  {
    name: "@tamga-network/trust",
    what: {
      en: "loads and verifies the signed trust lists; one read interface (also for the future ledger)",
      tr: "imzalı güven listelerini yükler ve doğrular; tek okuma arayüzü (ileride zincir için de)",
      tk: "gol çekilen ynam sanawlaryny ýükleýär we barlaýar; bir okamak interfeýsi (geljekde zynjyr üçin hem)",
      az: "imzalanmış etibar siyahılarını yükləyir və yoxlayır; vahid oxuma interfeysi (gələcəkdə zəncir üçün də)",
    },
  },
  {
    name: "@tamga-network/schemas",
    what: {
      en: "document-type catalogue: type metadata, JSON Schema, content hashes",
      tr: "belge tipi kataloğu: tip tanımı, JSON Schema, içerik özetleri",
      tk: "resminama görnüşleriniň katalogy: görnüş kesgitlemesi, JSON Schema, mazmun heşleri",
      az: "sənəd növləri kataloqu: növ metaməlumatları, JSON Schema, məzmun heşləri",
    },
  },
  {
    name: "@tamga-network/sd-jwt",
    what: {
      en: "SD-JWT VC: selective disclosure, device binding, format checks",
      tr: "SD-JWT VC: seçici paylaşım, cihaz bağı, biçim denetimleri",
      tk: "SD-JWT VC: saýlap paýlaşmak, enjam baglanyşygy, görnüş barlaglary",
      az: "SD-JWT VC: seçici paylaşım (selective disclosure), cihaza bağlama, format yoxlamaları",
    },
  },
  {
    name: "@tamga-network/mdoc",
    what: {
      en: "ISO 18013-5 mdoc: CBOR, COSE, issuing and verifying",
      tr: "ISO 18013-5 mdoc: CBOR, COSE, verme ve doğrulama",
      tk: "ISO 18013-5 mdoc: CBOR, COSE, bermek we barlamak",
      az: "ISO 18013-5 mdoc: CBOR, COSE, vermə və yoxlama",
    },
  },
  {
    name: "@tamga-network/issuer",
    what: {
      en: "credential factory, OpenID4VCI helpers, revocation-list publisher; /client for the hosted service",
      tr: "belge fabrikası, OpenID4VCI yardımcıları, iptal listesi yayıncısı; barındırılan servis için /client",
      tk: "resminama fabrigi, OpenID4VCI kömekçileri, ýatyrylyş sanawyny çap ediji; ýerleşdirilen hyzmat üçin /client",
      az: "rəqəmsal sənəd fabriki, OpenID4VCI köməkçiləri, ləğv siyahısının dərc edicisi; yerləşdirilmiş xidmət üçün /client",
    },
  },
  {
    name: "@tamga-network/verifier",
    what: {
      en: "the verification pipeline (T0 + A–E), three outcomes, OpenID4VP requests; /web for the page kit; /zk for zero-knowledge age proofs",
      tr: "doğrulama hattı (T0 + A–E), üç sonuç, OpenID4VP istekleri; sayfa kiti için /web; sıfır bilgi ispatlı yaş doğrulama için /zk",
      tk: "barlag hatary (T0 + A–E), üç netije, OpenID4VP haýyşlary; sahypa toplumy üçin /web; nol bilimli subutnama bilen ýaş barlagy üçin /zk",
      az: "yoxlama xətti (T0 + A–E), üç nəticə, OpenID4VP sorğuları; səhifə dəsti üçün /web; sıfır bilikli yaş sübutları üçün /zk",
    },
  },
  {
    name: "@tamga-network/wallet-core",
    what: {
      en: "wallet core for Node and React Native: keys, receiving, local checks, presenting",
      tr: "Node ve React Native için cüzdan çekirdeği: anahtarlar, alma, yerel denetim, sunma",
      tk: "Node we React Native üçin gapjyk ýadrosy: açarlar, almak, ýerli barlag, hödürlemek",
      az: "Node və React Native üçün rəqəmsal cüzdan nüvəsi: açarlar, qəbul etmə, yerli yoxlamalar, təqdim etmə",
    },
  },
  {
    name: "@tamga-network/zk",
    what: {
      en: "wallet-side zero-knowledge prover (ISO mdoc, first use: over 18): Android native ready, iOS pending",
      tr: "cüzdan tarafı sıfır bilgi ispatçısı (ISO mdoc, ilk kullanım: 18 yaş üstü): Android yerel ispatçı hazır, iOS bekliyor",
      tk: "gapjyk tarapynda nol bilimli subutnama düzüji (ISO mdoc, ilkinji ulanylyşy: 18 ýaşdan uly): Android ýerli düzüji taýýar, iOS garaşylýar",
      az: "cüzdan tərəfində sıfır bilikli sübut generatoru (ISO mdoc, ilk istifadə: 18 yaşdan yuxarı): Android yerli generatoru hazırdır, iOS gözlənilir",
    },
  },
];

export const PKGS =
  "@tamga-network/verifier @tamga-network/trust @tamga-network/issuer";
export const INSTALL = [
  { label: "npm", code: `npm install ${PKGS}` },
  { label: "pnpm", code: `pnpm add ${PKGS}` },
  { label: "yarn", code: `yarn add ${PKGS}` },
];

/* Kod: tamga-network/examples (her testte gerçek paketlerle çalışır) → scripts/sync-examples.mjs → examples.generated.ts */
export const EX: {
  title: L;
  text: L;
  tabs: { label: string; code: string }[];
}[] = [
  {
    title: {
      en: "1 · “Sign in with Tamga” on a website",
      tr: "1 · Web sitesine “Tamga ile giriş yap”",
      tk: "1 · Web saýta “Tamga bilen gir”",
      az: "1 · Veb saytda “Tamga ilə daxil olun”",
    },
    text: {
      en: "Your server opens the presentation with a short-lived assertion signed by your trust-list key. The page only shows the QR code, and the approved values are handed to your server once.",
      tr: "Sunumu, sunucunuz güven listesindeki anahtarınızla imzaladığı kısa ömürlü bir beyanla açar. Sayfa yalnızca QR kodunu gösterir ve kişinin onayladığı değerler sunucunuza bir kez iletilir.",
      tk: "Hödürlemäni serweriňiz ynam sanawyndaky açaryňyz bilen gol çeken gysga möhletli beýany bilen açýar. Sahypa diňe QR koduny görkezýär we adamyň tassyklan bahalary serweriňize bir gezek berilýär.",
      az: "Təqdimatı serveriniz etibar siyahısındakı açarınızla imzaladığı qısamüddətli bəyanla açır. Səhifə yalnız QR kodu göstərir və şəxsin təsdiqlədiyi dəyərlər serverinizə bir dəfə ötürülür.",
    },
    tabs: [
      { label: "server.ts", code: EXAMPLES.webLoginServer },
      { label: "page.html", code: EXAMPLES.webLoginPage },
    ],
  },
  {
    title: {
      en: "2 · Verify documents on your own server",
      tr: "2 · Kendi sunucunuzda belge doğrulama",
      tk: "2 · Öz serweriňizde resminama barlamak",
      az: "2 · Öz serverinizdə sənədləri yoxlayın",
    },
    text: {
      en: "This path works without the hosted verifier. The package verifies the trust lists, pre-fetches revocation lists, signs the request, decrypts the answer and runs the pipeline (T0 + A–E). INDETERMINATE means the credential could not be checked right now, and it never means invalid.",
      tr: "Bu yol barındırılan doğrulayıcıya ihtiyaç duymaz. Paket güven listelerini doğrular, iptal listelerini önceden indirir, isteği imzalar, şifreli cevabı çözer ve doğrulama hattını (T0 + A–E) çalıştırır. INDETERMINATE sonucu belgenin şu an denetlenemediğini anlatır ve hiçbir zaman belgenin geçersiz olduğu anlamına gelmez.",
      tk: "Bu ýol ýerleşdirilen barlaýja mätäç däl. Paket ynam sanawlaryny barlaýar, ýatyrylyş sanawlaryny öňünden alýar, haýyşa gol çekýär, şifrlenen jogaby açýar we barlag hataryny (T0 + A–E) işledýär. INDETERMINATE netijesi resminamany häzir barlap bolmandygyny aňladýar we hiç haçan resminamanyň nädogrudygyny aňlatmaýar.",
      az: "Bu yol yerləşdirilmiş yoxlayıcıya ehtiyac duymur. Paket etibar siyahılarını yoxlayır, ləğv siyahılarını əvvəlcədən yükləyir, sorğunu imzalayır, şifrələnmiş cavabı açır və yoxlama xəttini (T0 + A–E) işə salır. INDETERMINATE nəticəsi sənədin hazırda yoxlana bilmədiyini bildirir və heç vaxt sənədin etibarsız olduğu demək deyil.",
    },
    tabs: [{ label: "verifier.ts", code: EXAMPLES.verifyOwnServer }],
  },
  {
    title: {
      en: "3 · Issue documents as an institution",
      tr: "3 · Kurum olarak belge vermek",
      tk: "3 · Gurama hökmünde resminama bermek",
      az: "3 · Qurum olaraq sənəd verin",
    },
    text: {
      en: "The institution uses its scoped API key on the hosted issuing service. The offer link becomes a QR code, and the PIN travels through a separate channel, never inside the link.",
      tr: "Kurum, barındırılan belge verme servisinde kendisine tanımlanmış kapsamlı API anahtarını kullanır. Teklif bağlantısı QR koduna dönüşür, PIN ise bağlantının içine hiç konmaz ve ayrı bir kanaldan gönderilir.",
      tk: "Gurama ýerleşdirilen beriş hyzmatynda özüne berlen çäkli API açaryny ulanýar. Teklip salgysy QR koduna öwrülýär, PIN bolsa salgynyň içine hiç haçan goýulmaýar we başga kanal arkaly iberilýär.",
      az: "Qurum yerləşdirilmiş sənəd vermə xidmətində ona verilmiş məhdud səlahiyyətli API açarından istifadə edir. Təklif keçidi QR koda çevrilir, PIN isə heç vaxt keçidin içinə qoyulmur və ayrı kanalla göndərilir.",
    },
    tabs: [{ label: "issuer.ts", code: EXAMPLES.issueHosted }],
  },
  {
    title: {
      en: "4 · Check an institution",
      tr: "4 · Kurumu sorgulamak",
      tk: "4 · Guramany barlamak",
      az: "4 · Qurumu yoxlayın",
    },
    text: {
      en: "It answers whether the institution is registered, active and authorised for this document type. It reads only the signed trust lists and touches no personal data.",
      tr: "Kurumun kayıtlı ve etkin olup olmadığını, bu belge türünü vermeye yetkili olup olmadığını söyler. Yalnızca imzalı güven listelerini okuduğu için kişisel veriye dokunmaz.",
      tk: "Guramanyň hasaba alnandygyny, işjeňdigini we bu resminama görnüşini bermäge ygtyýarlydygyny aýdýar. Diňe gol çekilen ynam sanawlaryny okaýandygy üçin şahsy maglumata degmeýär.",
      az: "Qurumun qeydiyyatda və aktiv olub-olmadığını, bu sənəd növünü verməyə səlahiyyəti olub-olmadığını bildirir. Yalnız imzalanmış etibar siyahılarını oxuduğu üçün fərdi məlumatlara toxunmur.",
    },
    tabs: [{ label: "check.ts", code: EXAMPLES.checkInstitution }],
  },
];

export const COPY: Record<Locale, [string, string]> = {
  en: ["Copy", "Copied"],
  tr: ["Kopyala", "Kopyalandı"],
  tk: ["Göçür", "Göçürildi"],
  az: ["Kopyala", "Kopyalandı"],
};

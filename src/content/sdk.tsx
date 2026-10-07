import type { Locale } from "@/i18n/routing";
import { EXAMPLES } from "@/content/examples.generated";

/*
 * SDK: açık kaynak @tamga-network paketleri, kurulum ve çalışan örnekler. /sdk sayfası ve geliştirici belgesi ortak kullanır.
 * Kaynak: tamga-network packages/*\/package.json açıklamaları, examples/ (scripts/sync-examples.mjs), D-OSS-2.
 */

type L = Record<Locale, string>;

export const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;
export const pkgDocsUrl = (name: string) =>
  `https://docs.tamga.network/packages/${name.replace("@tamga-network/", "")}`;

/* soon: npm'deki erken ön sürümde (0.1.0) yok; 1.0 yayınıyla gelir. */
export const PACKAGES: { name: string; what: L; soon?: L }[] = [
  {
    name: "@tamga-network/core",
    what: {
      en: "hashes, identifier derivation, certificate helpers",
      tr: "özetler, kimlik türetme, sertifika yardımcıları",
      tk: "heşler, belgi almak, sertifikat kömekçileri",
    },
  },
  {
    name: "@tamga-network/trust",
    what: {
      en: "loads and verifies the signed trust lists; one read interface (also for the future ledger)",
      tr: "imzalı güven listelerini yükler ve doğrular; tek okuma arayüzü (ileride zincir için de)",
      tk: "gol çekilen ynam sanawlaryny ýükleýär we barlaýar; bir okamak interfeýsi (geljekde zynjyr üçin hem)",
    },
  },
  {
    name: "@tamga-network/schemas",
    what: {
      en: "document-type catalogue: type metadata, JSON Schema, content hashes",
      tr: "belge tipi kataloğu: tip tanımı, JSON Schema, içerik özetleri",
      tk: "resminama görnüşleriniň katalogy: görnüş kesgitlemesi, JSON Schema, mazmun heşleri",
    },
  },
  {
    name: "@tamga-network/sd-jwt",
    what: {
      en: "SD-JWT VC: selective disclosure, device binding, format checks",
      tr: "SD-JWT VC: seçici paylaşım, cihaz bağı, biçim denetimleri",
      tk: "SD-JWT VC: saýlap paýlaşmak, enjam baglanyşygy, görnüş barlaglary",
    },
  },
  {
    name: "@tamga-network/mdoc",
    what: {
      en: "ISO 18013-5 mdoc: CBOR, COSE, issuing and verifying",
      tr: "ISO 18013-5 mdoc: CBOR, COSE, verme ve doğrulama",
      tk: "ISO 18013-5 mdoc: CBOR, COSE, bermek we barlamak",
    },
  },
  {
    name: "@tamga-network/issuer",
    what: {
      en: "credential factory, OpenID4VCI helpers, revocation-list publisher; /client for the hosted service",
      tr: "belge fabrikası, OpenID4VCI yardımcıları, iptal listesi yayıncısı; barındırılan servis için /client",
      tk: "resminama fabrigi, OpenID4VCI kömekçileri, ýatyrylyş sanawyny çap ediji; ýerleşdirilen hyzmat üçin /client",
    },
  },
  {
    name: "@tamga-network/verifier",
    what: {
      en: "the verification pipeline (T0 + A–E), three outcomes, OpenID4VP requests; /web for the page kit; /zk for zero-knowledge age proofs (with the 1.0 release)",
      tr: "doğrulama hattı (T0 + A–E), üç sonuç, OpenID4VP istekleri; sayfa kiti için /web; sıfır bilgi ispatlı yaş doğrulama için /zk (1.0 yayınıyla)",
      tk: "barlag hatary (T0 + A–E), üç netije, OpenID4VP haýyşlary; sahypa toplumy üçin /web; nol bilimli subutnama bilen ýaş barlagy üçin /zk (1.0 neşiri bilen)",
    },
  },
  {
    name: "@tamga-network/wallet-core",
    what: {
      en: "wallet core for Node and React Native: keys, receiving, local checks, presenting",
      tr: "Node ve React Native için cüzdan çekirdeği: anahtarlar, alma, yerel denetim, sunma",
      tk: "Node we React Native üçin gapjyk ýadrosy: açarlar, almak, ýerli barlag, hödürlemek",
    },
  },
  {
    name: "@tamga-network/zk",
    what: {
      en: "wallet-side zero-knowledge prover (ISO mdoc, first use: over 18): Android native ready, iOS pending",
      tr: "cüzdan tarafı sıfır bilgi ispatçısı (ISO mdoc, ilk kullanım: 18 yaş üstü): Android yerel ispatçı hazır, iOS bekliyor",
      tk: "gapjyk tarapynda nol bilimli subutnama düzüji (ISO mdoc, ilkinji ulanylyşy: 18 ýaşdan uly): Android ýerli düzüji taýýar, iOS garaşylýar",
    },
    soon: {
      en: "With the 1.0 release",
      tr: "1.0 yayınıyla",
      tk: "1.0 neşiri bilen",
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
    },
    text: {
      en: "Your server opens the presentation with a short-lived assertion signed by your trust-list key; the page only shows the QR code; the approved values are handed to your server once.",
      tr: "Sunumu sunucunuz, güven listesindeki anahtarınızla imzalı kısa ömürlü bir beyanla açar; sayfa yalnızca QR'ı gösterir; onaylanan değerler sunucunuza bir kez verilir.",
      tk: "Hödürlemäni serweriňiz ynam sanawyndaky açaryňyz bilen gol çekilen gysga möhletli beýan bilen açýar; sahypa diňe QR-y görkezýär; tassyklanan bahalar serweriňize bir gezek berilýär.",
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
    },
    text: {
      en: "Without the hosted verifier: verifies the trust lists, pre-fetches revocation lists, signs the request, decrypts the answer and runs the pipeline (T0 + A–E). INDETERMINATE means “could not check right now”, never “invalid”.",
      tr: "Barındırılan doğrulayıcı olmadan: güven listelerini doğrular, iptal listelerini önceden çeker, isteği imzalar, şifreli cevabı çözer ve hattı (T0 + A–E) çalıştırır. INDETERMINATE “şu an denetlenemedi” demektir, “geçersiz” değil.",
      tk: "Ýerleşdirilen barlaýjysyz: ynam sanawlaryny barlaýar, ýatyrylyş sanawlaryny öňünden alýar, haýyşa gol çekýär, şifrlenen jogaby açýar we hatary (T0 + A–E) işledýär. INDETERMINATE “häzir barlap bolmady” diýmekdir, “nädogry” däl.",
    },
    tabs: [{ label: "verifier.ts", code: EXAMPLES.verifyOwnServer }],
  },
  {
    title: {
      en: "3 · Issue documents as an institution",
      tr: "3 · Kurum olarak belge vermek",
      tk: "3 · Gurama hökmünde resminama bermek",
    },
    text: {
      en: "With your institution’s scoped API key on the hosted issuing service. The offer link becomes a QR code; the PIN goes through a different channel, never inside the link.",
      tr: "Barındırılan belge verme servisinde kurumunuzun kapsamlı API anahtarıyla. Teklif bağlantısı QR olur; PIN ayrı bir kanaldan gider, bağlantının içinde asla gitmez.",
      tk: "Ýerleşdirilen beriş hyzmatynda guramaňyzyň çäkli API açary bilen. Teklip salgysy QR bolýar; PIN başga kanaldan gidýär, salgynyň içinde hiç haçan gitmeýär.",
    },
    tabs: [{ label: "issuer.ts", code: EXAMPLES.issueHosted }],
  },
  {
    title: {
      en: "4 · Check an institution",
      tr: "4 · Kurumu sorgulamak",
      tk: "4 · Guramany barlamak",
    },
    text: {
      en: "Is it registered, active, and authorised for this document type? Reads the signed trust lists only — no personal data.",
      tr: "Kayıtlı mı, etkin mi, bu belge türüne yetkili mi? Yalnızca imzalı güven listelerini okur — kişisel veri yok.",
      tk: "Hasaba alnanmy, işjeňmi, bu resminama görnüşine ygtyýarlymy? Diňe gol çekilen ynam sanawlaryny okaýar — şahsy maglumat ýok.",
    },
    tabs: [{ label: "check.ts", code: EXAMPLES.checkInstitution }],
  },
];

export const COPY: Record<Locale, [string, string]> = {
  en: ["Copy", "Copied"],
  tr: ["Kopyala", "Kopyalandı"],
  tk: ["Göçür", "Göçürildi"],
};

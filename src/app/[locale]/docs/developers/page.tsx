import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CompareTable, FitPill } from "@/components/doc-article";
import { CodeTabs } from "@/components/code-tools";
import { EXAMPLES } from "@/content/examples.generated";
import type { Locale } from "@/i18n/routing";

/*
 * Kaynak: tamga-network docs/guides/README.md (GUIDE-0000), 01–03 kılavuzları, packages/*\/package.json açıklamaları,
 * ADR-0016 (dış kurum erişimi), D-OSS-2 (@tamga-network kapsamı; npm'de 0.1.0).
 */

type L = Record<Locale, string>;

const GOALS: { goal: L; pkg: string; href?: "/docs/login-with-tamga" }[] = [
  { goal: { en: "Add “Sign up / Sign in with TamgaID” to a website", tr: "Web sitesine “TamgaID ile Kayıt Ol / Giriş Yap” eklemek", tk: "Web saýta “TamgaID bilen hasaba dur / gir” goşmak" }, pkg: "@tamga-network/verifier/web + your server", href: "/docs/login-with-tamga" },
  { goal: { en: "Verify documents on your server (hiring, campus, age)", tr: "Sunucunda belge doğrulamak (işe alım, kampüs, yaş)", tk: "Serweriňde resminama barlamak (işe almak, kampus, ýaş)" }, pkg: "@tamga-network/verifier" },
  { goal: { en: "Issue your institution’s documents into people’s wallets", tr: "Kurumunun belgelerini kişilerin cüzdanına vermek", tk: "Guramaňyň resminamalaryny adamlaryň gapjygyna bermek" }, pkg: "@tamga-network/issuer/client (hosted) · @tamga-network/issuer (own service)" },
];

const PACKAGES: { name: string; what: L }[] = [
  { name: "@tamga-network/core", what: { en: "hashes, identifier derivation, certificate helpers", tr: "özetler, kimlik türetme, sertifika yardımcıları", tk: "heşler, belgi almak, sertifikat kömekçileri" } },
  { name: "@tamga-network/trust", what: { en: "loads and verifies the signed trust lists; one read interface (also for the future ledger)", tr: "imzalı güven listelerini yükler ve doğrular; tek okuma arayüzü (ileride zincir için de)", tk: "gol çekilen ynam sanawlaryny ýükleýär we barlaýar; bir okamak interfeýsi (geljekde zynjyr üçin hem)" } },
  { name: "@tamga-network/schemas", what: { en: "document-type catalogue: type metadata, JSON Schema, content hashes", tr: "belge tipi kataloğu: tip tanımı, JSON Schema, içerik özetleri", tk: "resminama görnüşleriniň katalogy: görnüş kesgitlemesi, JSON Schema, mazmun heşleri" } },
  { name: "@tamga-network/sd-jwt", what: { en: "SD-JWT VC: selective disclosure, device binding, format checks", tr: "SD-JWT VC: seçici açıklama, cihaz bağı, biçim denetimleri", tk: "SD-JWT VC: saýlama açyklama, enjam baglanyşygy, görnüş barlaglary" } },
  { name: "@tamga-network/mdoc", what: { en: "ISO 18013-5 mdoc: CBOR, COSE, issuing and verifying", tr: "ISO 18013-5 mdoc: CBOR, COSE, verme ve doğrulama", tk: "ISO 18013-5 mdoc: CBOR, COSE, bermek we barlamak" } },
  { name: "@tamga-network/issuer", what: { en: "credential factory, OpenID4VCI helpers, revocation-list publisher; /client for the hosted service", tr: "belge fabrikası, OpenID4VCI yardımcıları, iptal listesi yayıncısı; barındırılan servis için /client", tk: "resminama fabrigi, OpenID4VCI kömekçileri, ýatyrylyş sanawyny çap ediji; ýerleşdirilen hyzmat üçin /client" } },
  { name: "@tamga-network/verifier", what: { en: "the verification pipeline (T0 + A–E), three outcomes, OpenID4VP requests; /web for the page kit", tr: "doğrulama hattı (T0 + A–E), üç sonuç, OpenID4VP istekleri; sayfa kiti için /web", tk: "barlag hatary (T0 + A–E), üç netije, OpenID4VP haýyşlary; sahypa toplumy üçin /web" } },
  { name: "@tamga-network/wallet-core", what: { en: "wallet core for Node and React Native: keys, receiving, local checks, presenting", tr: "Node ve React Native için cüzdan çekirdeği: anahtarlar, alma, yerel denetim, sunma", tk: "Node we React Native üçin gapjyk ýadrosy: açarlar, almak, ýerli barlag, hödürlemek" } },
];

const STATUS: { part: L; state: "same" | "bridge" | "planned"; label: L; note: L }[] = [
  { part: { en: "Packages", tr: "Paketler", tk: "Paketler" }, state: "same", label: { en: "on npm (0.1.0)", tr: "npm'de (0.1.0)", tk: "npm-de (0.1.0)" }, note: { en: "pre-release; the API may change before 1.0", tr: "ön sürüm; 1.0'a kadar arayüz değişebilir", tk: "deslapky wersiýa; 1.0-a çenli interfeýs üýtgäp biler" } },
  { part: { en: "Hosted verifier", tr: "Barındırılan doğrulayıcı", tk: "Ýerleşdirilen barlaýjy" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "results only to the site that opened the presentation (signed assertion), values once; policies fixed for now", tr: "sonuç yalnızca sunumu açan siteye (imzalı beyan), değerler bir kez; politikalar şimdilik sabit", tk: "netije diňe hödürlemäni açan saýta (gol çekilen beýan), bahalar bir gezek; syýasatlar häzirlikçe hemişelik" } },
  { part: { en: "Hosted issuing service", tr: "Barındırılan belge verme servisi", tk: "Ýerleşdirilen resminama beriş hyzmaty" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "per-institution API keys with scopes, expiry and revocation", tr: "kurum başına kapsamlı, süreli ve iptal edilebilir API anahtarı", tk: "gurama başyna çäkli, möhletli we ýatyrylyp bilinýän API açary" } },
  { part: { en: "Trust list registration", tr: "Güven listesi kaydı", tk: "Ynam sanawyna hasaba alyş" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "done by the Tamga operator on request", tr: "istek üzerine Tamga operatörü yapar", tk: "haýyş boýunça Tamga operatory edýär" } },
];

const PKGS = "@tamga-network/verifier @tamga-network/trust @tamga-network/issuer";
const INSTALL = [
  { label: "npm", code: `npm install ${PKGS}` },
  { label: "pnpm", code: `pnpm add ${PKGS}` },
  { label: "yarn", code: `yarn add ${PKGS}` },
];

/* Kod: tamga-network/examples (her testte gerçek paketlerle çalışır) → scripts/sync-examples.mjs → examples.generated.ts */
const EX: { title: L; text: L; tabs: { label: string; code: string }[] }[] = [
  {
    title: { en: "1 · “Sign in with TamgaID” on a website", tr: "1 · Web sitesine “TamgaID ile giriş”", tk: "1 · Web saýta “TamgaID bilen gir”" },
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
    title: { en: "2 · Verify documents on your own server", tr: "2 · Kendi sunucunuzda belge doğrulama", tk: "2 · Öz serweriňizde resminama barlamak" },
    text: {
      en: "Without the hosted verifier: verifies the trust lists, pre-fetches revocation lists, signs the request, decrypts the answer and runs the pipeline (T0 + A–E). INDETERMINATE means “could not check right now”, never “invalid”.",
      tr: "Barındırılan doğrulayıcı olmadan: güven listelerini doğrular, iptal listelerini önceden çeker, isteği imzalar, şifreli cevabı çözer ve hattı (T0 + A–E) çalıştırır. INDETERMINATE “şu an denetlenemedi” demektir, “geçersiz” değil.",
      tk: "Ýerleşdirilen barlaýjysyz: ynam sanawlaryny barlaýar, ýatyrylyş sanawlaryny öňünden alýar, haýyşa gol çekýär, şifrlenen jogaby açýar we hatary (T0 + A–E) işledýär. INDETERMINATE “häzir barlap bolmady” diýmekdir, “nädogry” däl.",
    },
    tabs: [{ label: "verifier.ts", code: EXAMPLES.verifyOwnServer }],
  },
  {
    title: { en: "3 · Issue documents as an institution", tr: "3 · Kurum olarak belge vermek", tk: "3 · Gurama hökmünde resminama bermek" },
    text: {
      en: "With your institution’s scoped API key on the hosted issuing service. The offer link becomes a QR code; the PIN goes through a different channel, never inside the link.",
      tr: "Barındırılan belge verme servisinde kurumunuzun kapsamlı API anahtarıyla. Teklif bağlantısı QR olur; PIN ayrı bir kanaldan gider, bağlantının içinde asla gitmez.",
      tk: "Ýerleşdirilen beriş hyzmatynda guramaňyzyň çäkli API açary bilen. Teklip salgysy QR bolýar; PIN başga kanaldan gidýär, salgynyň içinde hiç haçan gitmeýär.",
    },
    tabs: [{ label: "issuer.ts", code: EXAMPLES.issueHosted }],
  },
  {
    title: { en: "4 · Check an institution", tr: "4 · Kurumu sorgulamak", tk: "4 · Guramany barlamak" },
    text: {
      en: "Is it registered, active, and authorised for this document type? Reads the signed trust lists only — no personal data.",
      tr: "Kayıtlı mı, etkin mi, bu belge türüne yetkili mi? Yalnızca imzalı güven listelerini okur — kişisel veri yok.",
      tk: "Hasaba alnanmy, işjeňmi, bu resminama görnüşine ygtyýarlymy? Diňe gol çekilen ynam sanawlaryny okaýar — şahsy maglumat ýok.",
    },
    tabs: [{ label: "check.ts", code: EXAMPLES.checkInstitution }],
  },
];

const COPY: Record<Locale, [string, string]> = { en: ["Copy", "Copied"], tr: ["Kopyala", "Kopyalandı"], tk: ["Göçür", "Göçürildi"] };

type Ui = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  hGoals: string;
  hPkgs: string;
  pPkgs: ReactNode;
  hStatus: string;
  hCode: string;
  pCode: string;
  hRules: string;
  rules: ReactNode[];
  outro: ReactNode;
  cols: { goal: string; pkg: string; name: string; what: string; part: string; state: string; note: string };
  guide: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    meta: { title: "Developers", description: "Integrate with Tamga: sign-in for websites, server-side verification, issuing documents. Open-source packages @tamga-network/*, and what is ready today versus planned." },
    eyebrow: "Developers",
    title: "Build with Tamga",
    intro: "Three kinds of organization connect to Tamga: websites, verifiers and institutions that issue documents. Every piece is open source and follows the EUDI profiles, so what you build is not tied to Tamga.",
    hGoals: "What do you want to do?",
    hPkgs: "Packages",
    pPkgs: <>All packages are Apache-2.0 and published under the <code>@tamga-network</code> scope. Current release: 0.1.0 (pre-release) — the API may change before 1.0.</>,
    hStatus: "Status today — honestly",
    hCode: "Code examples",
    pCode: "Install the packages, then start from one of four working examples. This is the real code from the repository’s examples folder: every test run executes it against the real packages, so it cannot drift from them. The packages are not on npm yet; until then, use them from the source repository.",
    hRules: "Rules for every integration",
    rules: [
      <>Ask only for the fields you need — a request beyond your registered scope is refused by the wallet.</>,
      <>Treat <strong>INDETERMINATE</strong> as “try again”, never as “invalid”.</>,
      <>Never log personal data — no names, no identifiers, no passkey IDs.</>,
      <>Decide on the server. Browser code can be changed by the user.</>,
    ],
    outro: <>Full developer documentation — guides, specifications, decisions: <a href="https://docs.tamga.network">docs.tamga.network</a>. Roles and participant rules: <a href="https://arf.tamga.network/">Tamga ARF</a>. Background: <Link href="/docs/how-tamga-works">architecture</Link> · <Link href="/docs/trust-lists">trust lists</Link> · <Link href="/docs/eudi-comparison">Tamga and EUDI</Link>.</>,
    cols: { goal: "Goal", pkg: "Package", name: "Package", what: "What it does", part: "Part", state: "State", note: "Note" },
    guide: "guide",
  },
  tr: {
    meta: { title: "Geliştiriciler", description: "Tamga ile entegrasyon: web siteleri için giriş, sunucuda doğrulama, belge verme. Açık kaynak paketler @tamga-network/* ve bugün neyin hazır, neyin planlı olduğu." },
    eyebrow: "Geliştiriciler",
    title: "Tamga ile geliştir",
    intro: "Tamga’ya üç tür kurum bağlanır: web siteleri, doğrulayıcılar ve belge veren kurumlar. Her parça açık kaynaktır ve EUDI profillerini izler; yaptığın şey Tamga’ya bağımlı kalmaz.",
    hGoals: "Ne yapmak istiyorsun?",
    hPkgs: "Paketler",
    pPkgs: <>Tüm paketler Apache-2.0 lisanslıdır ve <code>@tamga-network</code> kapsamında yayınlanır. Güncel sürüm: 0.1.0 (ön sürüm) — 1.0'a kadar arayüz değişebilir.</>,
    hStatus: "Bugünkü durum — dürüstçe",
    hCode: "Kod örnekleri",
    pCode: "Paketleri kurun, sonra dört çalışan örnekten birinden başlayın. Bu, deponun examples klasöründeki gerçek koddur: her test çalıştırmasında gerçek paketlerle denenir, paketlerden kopamaz. Paketler henüz npm’de değil; o zamana kadar kaynak depodan kullanılabilir.",
    hRules: "Her entegrasyonda kurallar",
    rules: [
      <>Yalnızca ihtiyacın olan alanları iste — kayıtlı kapsamını aşan istek cüzdan tarafından reddedilir.</>,
      <><strong>INDETERMINATE</strong> sonucunu “tekrar dene” olarak yorumla, asla “geçersiz” olarak değil.</>,
      <>Kişisel veriyi asla loglama — ad, kimlik numarası, passkey kimliği yok.</>,
      <>Kararı sunucuda ver. Tarayıcı kodu kullanıcı tarafından değiştirilebilir.</>,
    ],
    outro: <>Geliştirici belgelerinin tamamı — kılavuzlar, spesifikasyonlar, kararlar: <a href="https://docs.tamga.network">docs.tamga.network</a>. Roller ve katılımcı kuralları: <a href="https://arf.tamga.network/tr/">Tamga ARF</a>. Arka plan: <Link href="/docs/how-tamga-works">mimari</Link> · <Link href="/docs/trust-lists">güven listeleri</Link> · <Link href="/docs/eudi-comparison">Tamga ve EUDI</Link>.</>,
    cols: { goal: "Amaç", pkg: "Paket", name: "Paket", what: "Ne yapar", part: "Parça", state: "Durum", note: "Not" },
    guide: "kılavuz",
  },
  tk: {
    meta: { title: "Işläp düzüjiler", description: "Tamga bilen integrasiýa: web saýtlar üçin giriş, serwerde barlag, resminama bermek. Açyk çeşmeli paketler @tamga-network/* we häzir nämäniň taýýar, nämäniň meýilleşdirilendigi." },
    eyebrow: "Işläp düzüjiler",
    title: "Tamga bilen düz",
    intro: "Tamga-a üç görnüşli gurama birikýär: web saýtlar, barlaýjylar we resminama berýän guramalar. Her bölek açyk çeşmelidir we EUDI profillerine eýerýär; düzen zadyň Tamga-a bagly galmaýar.",
    hGoals: "Näme etmek isleýärsiň?",
    hPkgs: "Paketler",
    pPkgs: <>Ähli paketler Apache-2.0 ygtyýarnamalydyr we <code>@tamga-network</code> çäginde çap edilýär. Häzirki wersiýa: 0.1.0 (deslapky) — 1.0-a çenli interfeýs üýtgäp biler.</>,
    hStatus: "Häzirki ýagdaý — dogruçyl",
    hCode: "Kod mysallary",
    pCode: "Paketleri guruň, soňra dört işleýän mysalyň birinden başlaň. Bu, ammaryň examples bukjasyndaky hakyky koddyr: her synag işledilende hakyky paketler bilen barlanýar, olardan aýrylyp bilmeýär. Paketler entek npm-de ýok; oňa çenli çeşme ammaryndan ulanyp bolýar.",
    hRules: "Her integrasiýada düzgünler",
    rules: [
      <>Diňe zerur meýdanlary sora — hasaba alnan çägiňden çykýan haýyş gapjyk tarapyndan ret edilýär.</>,
      <><strong>INDETERMINATE</strong> netijäni “gaýtadan synanyş” diýip düşün, asla “nädogry” diýip däl.</>,
      <>Şahsy maglumaty asla žurnala ýazma — at, şahsyýet belgisi, passkey belgisi ýok.</>,
      <>Karary serwerde ber. Brauzer kody ulanyjy tarapyndan üýtgedilip bilner.</>,
    ],
    outro: <>Işläp düzüjiler üçin doly resminamalar — gollanmalar, spesifikasiýalar, kararlar: <a href="https://docs.tamga.network">docs.tamga.network</a>. Rollar we gatnaşyjy düzgünleri: <a href="https://arf.tamga.network/">Tamga ARF</a>. Esas: <Link href="/docs/how-tamga-works">arhitektura</Link> · <Link href="/docs/trust-lists">ynam sanawlary</Link> · <Link href="/docs/eudi-comparison">Tamga we EUDI</Link>.</>,
    cols: { goal: "Maksat", pkg: "Paket", name: "Paket", what: "Näme edýär", part: "Bölek", state: "Ýagdaý", note: "Bellik" },
    guide: "gollanma",
  },
};

function body(l: Locale): ReactNode {
  const u = UI[l];
  return (
    <>
      <h2>{u.hGoals}</h2>
      <CompareTable
        head={[u.cols.goal, u.cols.pkg]}
        rows={GOALS.map((g) => [
          g.href ? (
            <span key="g">
              {g.goal[l]} · <Link href={g.href}>{u.guide}</Link>
            </span>
          ) : (
            g.goal[l]
          ),
          <code key="p">{g.pkg}</code>,
        ])}
      />

      <h2>{u.hPkgs}</h2>
      <p>{u.pPkgs}</p>
      <CompareTable head={[u.cols.name, u.cols.what]} rows={PACKAGES.map((p) => [<code key="n">{p.name}</code>, p.what[l]])} />

      <h2>{u.hStatus}</h2>
      <CompareTable
        head={[u.cols.part, u.cols.state, u.cols.note]}
        rows={STATUS.map((s) => [s.part[l], <FitPill key="s" fit={s.state} label={s.label[l]} />, s.note[l]])}
      />

      <h2>{u.hCode}</h2>
      <p>{u.pCode}</p>
      <CodeTabs tabs={INSTALL} copyLabel={COPY[l][0]} copiedLabel={COPY[l][1]} />
      {EX.map((e) => (
        <div key={e.tabs[0].label}>
          <h3>{e.title[l]}</h3>
          <p>{e.text[l]}</p>
          <CodeTabs tabs={e.tabs} copyLabel={COPY[l][0]} copiedLabel={COPY[l][1]} />
        </div>
      ))}

      <h2>{u.hRules}</h2>
      <Callout tone="primary">
        <ul className="list-disc space-y-1.5 pl-5">
          {u.rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Callout>
      <p>{u.outro}</p>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const u = UI[locale as Locale] ?? UI.en;
  return { title: u.meta.title, description: u.meta.description };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (UI[locale as Locale] ? locale : "en") as Locale;
  const u = UI[loc];
  return (
    <DocArticle href="/docs/developers" eyebrow={u.eyebrow} title={u.title} intro={u.intro}>
      {body(loc)}
    </DocArticle>
  );
}

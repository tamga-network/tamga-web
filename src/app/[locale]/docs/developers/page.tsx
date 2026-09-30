import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CompareTable, FitPill } from "@/components/doc-article";
import { PACKAGES, npmUrl } from "@/content/sdk";
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

const STATUS: { part: L; state: "same" | "bridge" | "planned"; label: L; note: L }[] = [
  { part: { en: "Packages", tr: "Paketler", tk: "Paketler" }, state: "same", label: { en: "on npm (0.1.0)", tr: "npm'de (0.1.0)", tk: "npm-de (0.1.0)" }, note: { en: "pre-release; the API may change before 1.0", tr: "ön sürüm; 1.0'a kadar arayüz değişebilir", tk: "deslapky wersiýa; 1.0-a çenli interfeýs üýtgäp biler" } },
  { part: { en: "Hosted verifier", tr: "Barındırılan doğrulayıcı", tk: "Ýerleşdirilen barlaýjy" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "results only to the site that opened the presentation (signed assertion), values once; policies fixed for now", tr: "sonuç yalnızca sunumu açan siteye (imzalı beyan), değerler bir kez; politikalar şimdilik sabit", tk: "netije diňe hödürlemäni açan saýta (gol çekilen beýan), bahalar bir gezek; syýasatlar häzirlikçe hemişelik" } },
  { part: { en: "Hosted issuing service", tr: "Barındırılan belge verme servisi", tk: "Ýerleşdirilen resminama beriş hyzmaty" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "per-institution API keys with scopes, expiry and revocation", tr: "kurum başına kapsamlı, süreli ve iptal edilebilir API anahtarı", tk: "gurama başyna çäkli, möhletli we ýatyrylyp bilinýän API açary" } },
  { part: { en: "Trust list registration", tr: "Güven listesi kaydı", tk: "Ynam sanawyna hasaba alyş" }, state: "same", label: { en: "working", tr: "çalışıyor", tk: "işleýär" }, note: { en: "done by the Tamga operator on request", tr: "istek üzerine Tamga operatörü yapar", tk: "haýyş boýunça Tamga operatory edýär" } },
];

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
    pCode: "Installation and four working examples — the real code from the repository, run against the packages in every test — are on the SDK page.",
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
    pCode: "Kurulum ve dört çalışan örnek — deponun gerçek kodu, her testte paketlerle çalıştırılır — SDK sayfasında.",
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
    pCode: "Gurnamak we dört işleýän mysal — ammaryň hakyky kody, her synagda paketler bilen işledilýär — SDK sahypasynda.",
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
      <CompareTable head={[u.cols.name, u.cols.what]} rows={PACKAGES.map((p) => [
          <a key="n" href={npmUrl(p.name)} target="_blank" rel="noopener noreferrer">
            <code>{p.name}</code> ↗
          </a>,
          p.what[l],
        ])} />

      <h2>{u.hStatus}</h2>
      <CompareTable
        head={[u.cols.part, u.cols.state, u.cols.note]}
        rows={STATUS.map((s) => [s.part[l], <FitPill key="s" fit={s.state} label={s.label[l]} />, s.note[l]])}
      />

      <h2>{u.hCode}</h2>
      <p>
        {u.pCode} <Link href="/sdk">SDK →</Link>
      </p>

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

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight, BookOpen, Package } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { CodeWindowTabs as CodeTabs } from "@/components/code-window";
import type { Locale } from "@/i18n/routing";
import { COPY, EX, INSTALL, PACKAGES, npmUrl, pkgDocsUrl } from "@/content/sdk";
import { DEV_LINKS } from "@/lib/ecosystem";

/* npm'deki deneme sürümü (kararlı 1.0.0 hazır olunca) — pInstall/pPkgs bunu söyler; paketlerin package.json sürümüyle aynı tutulur. */
const VERSION = "0.3.1";

const UI: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    hInstall: string;
    pInstall: string;
    hPkgs: string;
    pPkgs: string;
    docs: string;
    hCode: string;
    pCode: string;
    npmOrg: string;
    github: string;
  }
> = {
  en: {
    title: "SDK",
    description:
      "Open-source @tamga-network packages for websites, verifiers, institutions and wallets: install, packages and working examples.",
    eyebrow: "SDK",
    lead: "Open-source TypeScript packages for everything on the network: verifying, issuing, trust lists and the wallet core. Apache-2.0, following the EUDI profiles.",
    hInstall: "Install",
    pInstall:
      "The packages are published on npm as the 0.3.1 test release; the stable 1.0.0 comes when everything is ready. In test releases the API may change.",
    hPkgs: "Packages",
    pPkgs:
      "Each package name opens its npm page; “Docs” opens its reference on the developer docs. The version shown (0.3.1) is the current test release.",
    docs: "Docs",
    hCode: "Working examples",
    pCode:
      "The real code from the repository's examples folder: every test run executes it against the packages, so it cannot drift from them.",
    npmOrg: "All packages on npm",
    github: "Source on GitHub",
  },
  tr: {
    title: "SDK",
    description:
      "Web siteleri, doğrulayıcılar, kurumlar ve cüzdanlar için açık kaynak @tamga-network paketleri: kurulum, paketler ve çalışan örnekler.",
    eyebrow: "SDK",
    lead: "Ağdaki her iş için açık kaynak TypeScript paketleri: doğrulama, belge verme, güven listeleri ve cüzdan çekirdeği. Apache-2.0, EUDI profillerine uygun.",
    hInstall: "Kurulum",
    pInstall:
      "Paketler npm'de 0.3.1 deneme sürümüyle yayımlanır; kararlı 1.0.0 hazır olunca gelir. Deneme sürümünde arayüz değişebilir.",
    hPkgs: "Paketler",
    pPkgs:
      "Paket adı npm sayfasını açar; “Belge” geliştirici belgelerindeki başvurusunu açar. Gösterilen sürüm (0.3.1) güncel deneme sürümüdür.",
    docs: "Belge",
    hCode: "Çalışan örnekler",
    pCode:
      "Deponun examples klasöründeki gerçek kod: her test çalıştırmasında paketlerle çalıştırılır, onlardan kopamaz.",
    npmOrg: "npm'deki bütün paketler",
    github: "GitHub'da kaynak kod",
  },
  tk: {
    title: "SDK",
    description:
      "Web saýtlar, barlaýjylar, guramalar we gapjyklar üçin açyk çeşmeli @tamga-network paketleri: gurnamak, paketler we işleýän mysallar.",
    eyebrow: "SDK",
    lead: "Torda her iş üçin açyk çeşmeli TypeScript paketleri: barlamak, resminama bermek, ynam sanawlary we gapjyk ýadrosy. Apache-2.0, EUDI profillerine laýyk.",
    hInstall: "Gurnamak",
    pInstall:
      "Paketler npm-de 0.3.1 synag wersiýasy bilen çap edilýär; durnukly 1.0.0 taýýar bolanda geler. Synag wersiýasynda interfeýs üýtgäp biler.",
    hPkgs: "Paketler",
    pPkgs:
      "Paketiň ady npm sahypasyny açýar; “Resminama” işläp düzüji resminamalaryndaky salgylanmany açýar. Görkezilen wersiýa (0.3.1) häzirki synag wersiýasydyr.",
    docs: "Resminama",
    hCode: "Işleýän mysallar",
    pCode:
      "Ammaryň examples bukjasyndaky hakyky kod: her synagda paketler bilen işledilýär, olardan aýrylyp bilmeýär.",
    npmOrg: "npm-däki ähli paketler",
    github: "GitHub-da çeşme kody",
  },
};

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const u = UI[loc(locale)];
  return pageMeta(locale, "/sdk", {
    title: u.title,
    description: u.description,
  });
}

export default async function SdkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const u = UI[l];

  return (
    <>
      <PageHeader eyebrow={u.eyebrow} title={u.title} description={u.lead} />

      <section className="shell py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              {u.hInstall}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">{u.pInstall}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={DEV_LINKS.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground-muted hover:text-foreground"
              >
                {u.npmOrg} <ArrowUpRight size={13} aria-hidden />
              </a>
              <a
                href={`${DEV_LINKS.github}/tamga-network`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground-muted hover:text-foreground"
              >
                {u.github} <ArrowUpRight size={13} aria-hidden />
              </a>
            </div>
          </div>
          <CodeTabs
            tabs={INSTALL}
            copyLabel={COPY[l][0]}
            copiedLabel={COPY[l][1]}
          />
        </div>
      </section>

      <section className="border-y border-border bg-background-elevated/40">
        <div className="shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-foreground">{u.hPkgs}</h2>
          <p className="mt-2 text-sm text-foreground-muted">{u.pPkgs}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className="flex flex-col rounded-xl border border-border bg-background/60 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20"
                    aria-hidden
                  >
                    <Package size={18} />
                  </span>
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.7rem] text-foreground-subtle">
                    {VERSION}
                  </span>
                </div>
                {p.soon ? (
                  <span className="mt-4 font-mono text-sm font-medium text-foreground">
                    {p.name}
                  </span>
                ) : (
                  <a
                    href={npmUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1 font-mono text-sm font-medium text-foreground hover:text-primary"
                  >
                    {p.name}
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="opacity-50 group-hover:opacity-100"
                    />
                  </a>
                )}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {p.what[l]}
                </p>
                {p.soon ? (
                  <span className="mt-4 text-xs text-foreground-subtle">
                    {p.soon[l]}
                  </span>
                ) : (
                  <a
                    href={pkgDocsUrl(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground"
                  >
                    <BookOpen size={13} aria-hidden /> {u.docs}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-foreground">{u.hCode}</h2>
        <p className="mt-2 max-w-3xl text-sm text-foreground-muted">
          {u.pCode}
        </p>
        <div className="mt-8 space-y-12">
          {EX.map((e) => (
            <div
              key={e.tabs[0].label}
              className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {e.title[l]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {e.text[l]}
                </p>
              </div>
              <div className="min-w-0">
                <CodeTabs
                  tabs={e.tabs}
                  copyLabel={COPY[l][0]}
                  copiedLabel={COPY[l][1]}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

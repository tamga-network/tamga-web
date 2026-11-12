import { Fragment } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Download, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "@/components/logo";
import { EXTERNAL_ATTRS } from "@/components/external-link";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { NPM_VERSION } from "@/lib/package-version";
import { langName } from "@/content/team";
import {
  getWhitepaperPage,
  whitepaperPdf,
  WHITEPAPER_DATE,
  WHITEPAPER_LOCALES,
  WHITEPAPER_PRINT_NPM_VERSION,
} from "@/content/whitepaper-page";

/*
 * Whitepaper tanıtım sayfası: üst bilgi, PDF düğmeleri (sayfanın dili + diğer diller), özet, içindekiler, atıf ve lisans.
 * Metnin tamamı PDF'te; veri src/content/whitepaper-page.ts + whitepaper.generated.ts.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getWhitepaperPage(locale);
  return pageMeta(locale, "/whitepaper", { title: "Whitepaper", description: c.ui.metaDescription });
}

const btnPrimary =
  "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const linkCls =
  "underline decoration-1 underline-offset-4 text-primary transition-colors hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default async function WhitepaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getWhitepaperPage(locale);
  const { ui } = c;
  const pdf = whitepaperPdf(c.lang);
  const others = WHITEPAPER_LOCALES.filter((l) => l !== c.lang);
  const chapters = c.sections.filter((s) => s.kind === "chapter");
  const rest = c.sections.filter((s) => s.kind !== "chapter");
  const size = `${(c.pdf.sizeKb / 1024).toFixed(1)} MB`;

  return (
    <article className="shell max-w-3xl py-16 sm:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: c.title,
          alternativeHeadline: c.subtitle,
          inLanguage: c.lang,
          datePublished: WHITEPAPER_DATE,
          version: c.version,
          abstract: c.abstract.join("\n\n"),
          keywords: c.keywords.join(", "),
          url: `${SITE_URL}/${locale}/whitepaper`,
          encoding: {
            "@type": "MediaObject",
            contentUrl: `${SITE_URL}${pdf}`,
            encodingFormat: "application/pdf",
          },
          numberOfPages: c.pdf.pages,
          license: "https://creativecommons.org/licenses/by/4.0/",
          author: { "@id": ORGANIZATION["@id"], "@type": "Organization", name: ORGANIZATION.name },
          publisher: { "@id": ORGANIZATION["@id"], "@type": "Organization", name: ORGANIZATION.name },
          workTranslation: others.map((l) => ({
            "@type": "TechArticle",
            inLanguage: l,
            url: `${SITE_URL}${whitepaperPdf(l)}`,
          })),
        }}
      />

      {/* Masthead */}
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <LogoMark size={30} />
        <div>
          <p className="font-serif text-base font-semibold text-foreground">Tamga Network</p>
          <p className="mono-label">
            <span lang="en">Whitepaper</span> · {ui.mastheadSub}
          </p>
        </div>
      </div>

      {/* Title */}
      <header className="mt-12">
        <p className="eyebrow mb-4" lang="en">
          {ui.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">{c.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground-muted">{c.subtitle}</p>
        <p className="mono-label mt-6">
          {[`${ui.version} ${c.version}`, c.date, ui.pages(c.pdf.pages), `PDF · ${size}`].join(" · ")}
        </p>
        {/* Baskı anındaki paket sürümü + güncel sürüm (tek kaynak NPM_VERSION); aynıysa yalnız güncel sürüm. */}
        <p className="mt-2 text-sm text-foreground-muted">
          {WHITEPAPER_PRINT_NPM_VERSION !== NPM_VERSION && <>{ui.packagesAtPrint(WHITEPAPER_PRINT_NPM_VERSION)} </>}
          {ui.packagesCurrent}:{" "}
          <Link href="/sdk" className={linkCls}>
            {NPM_VERSION}
          </Link>
        </p>

        <div className="no-print mt-8 flex flex-wrap items-center gap-3">
          <a href={pdf} {...EXTERNAL_ATTRS} className={btnPrimary}>
            <FileText size={16} aria-hidden="true" />
            {ui.open}
            <span className="sr-only"> ({ui.opensNewTab})</span>
          </a>
          <a href={pdf} download className={btnSecondary}>
            <Download size={16} aria-hidden="true" />
            {ui.download}
          </a>
          <span className="text-sm text-foreground-muted">
            <span className="sr-only">{ui.otherLanguages}: </span>(
            {others.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && " - "}
                <a
                  href={whitepaperPdf(l)}
                  {...EXTERNAL_ATTRS}
                  hrefLang={l}
                  lang={l}
                  title={getWhitepaperPage(l).title}
                  className={linkCls}
                >
                  {l.toUpperCase()}
                  <span className="sr-only">
                    {" "}
                    — {langName(l, locale)} ({ui.opensNewTab})
                  </span>
                </a>
              </Fragment>
            ))}
            )
          </span>
        </div>
      </header>

      {/* Abstract */}
      <section
        id="abstract"
        aria-labelledby="abstract-h"
        className="mt-12 scroll-mt-24 rounded-xl border border-border bg-surface/40 p-6 sm:p-8"
      >
        <h2 id="abstract-h" className="mono-label mb-4">
          {c.abstractLabel}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-foreground">
          {c.abstract.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {c.keywords.length > 0 && (
          <div className="mt-6">
            <p className="mono-label mb-2">{c.keywordsLabel}</p>
            <ul className="flex flex-wrap gap-1.5">
              {c.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-foreground-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Contents */}
      <section id="contents" aria-labelledby="contents-h" className="mt-12 scroll-mt-24">
        <h2 id="contents-h" className="font-serif text-2xl font-semibold text-foreground">
          {ui.contents}
        </h2>
        <p className="mt-2 text-sm text-foreground-muted">{ui.contentsNote}</p>

        <p className="mono-label mb-3 mt-6">{ui.chapters}</p>
        <ol className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {chapters.map((s) => (
            <li key={s.n} className="flex gap-3 text-sm leading-snug text-foreground">
              <span className="w-6 shrink-0 text-right font-mono text-gold">{s.n}</span>
              <span>{s.title}</span>
            </li>
          ))}
        </ol>

        <p className="mono-label mb-3 mt-6">{ui.appendices}</p>
        <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {rest.map((s) => (
            <li key={s.title} className="flex gap-3 text-sm leading-snug text-foreground">
              <span className="w-6 shrink-0 text-right font-mono text-gold">{s.n || "·"}</span>
              <span>{s.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Citation + licence */}
      <section className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="mono-label mb-2">{ui.citeAs}</p>
          <p className="break-words font-mono text-[0.8rem] leading-relaxed text-foreground-muted">{c.citation}</p>
        </div>
        <div className="sm:max-w-56">
          <p className="mono-label mb-2">{ui.license}</p>
          <p className="text-sm text-foreground-muted">
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              {...EXTERNAL_ATTRS}
              className={linkCls}
            >
              {c.license}
            </a>
            . {ui.licenseText}
          </p>
        </div>
      </section>

      <footer className="mt-12 border-t border-border pt-8">
        <p className="font-serif text-xl italic text-primary" lang="en">
          Building Trust Infrastructure for the Digital World.
        </p>
        <div className="no-print mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/manifesto" className="link-underline text-foreground-muted hover:text-foreground">
            {ui.linkManifesto}
          </Link>
          <span className="text-border-strong">·</span>
          <Link href="/learn" className="link-underline text-foreground-muted hover:text-foreground">
            {ui.linkLearn}
          </Link>
        </div>
      </footer>
    </article>
  );
}

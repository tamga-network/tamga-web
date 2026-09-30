import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { getWhitepaperContent } from "@/content/whitepaper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getWhitepaperContent(locale);
  return pageMeta(locale, "/whitepaper", { title: meta.title, description: meta.description });
}

export default async function WhitepaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getWhitepaperContent(locale);
  const t = await getTranslations("common");

  return (
    <article className="shell max-w-3xl py-16 sm:py-20">
      {/* Masthead */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <LogoMark size={30} />
          <div>
            <p className="font-serif text-base font-semibold text-foreground">
              Tamga Network
            </p>
            <p className="mono-label" lang="en">
              Whitepaper · v1.0 · {new Date().getFullYear()}
            </p>
          </div>
        </div>
        <a
          href={`/whitepaper-${locale}.pdf`}
          target="_blank"
          rel="noopener"
          className="no-print inline-flex items-center justify-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Download size={16} />
          {t("downloadPdf")}
        </a>
      </div>

      {/* Title */}
      <header className="mt-12">
        <p className="eyebrow mb-4" lang="en">
          {c.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
          {c.subtitle}
        </p>
      </header>

      {/* Abstract */}
      <section
        id="ozet"
        className="mt-12 scroll-mt-24 rounded-xl border border-border bg-surface/40 p-6 sm:p-8"
      >
        <p className="mono-label mb-3">{c.abstractLabel}</p>
        <div className="prose">{c.abstract}</div>
      </section>

      {/* TOC */}
      <nav className="no-print mt-10">
        <p className="mono-label mb-4">{c.tocLabel}</p>
        <ol className="grid gap-1.5 sm:grid-cols-2">
          {c.sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex gap-3 rounded-md px-2 py-1.5 text-sm text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <span className="font-mono text-gold">{s.n}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Body */}
      <div className="mt-14 space-y-14">
        {c.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-2xl font-medium text-gold">
                {s.n}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                {s.title}
              </h2>
            </div>
            <div className="prose mt-5">{s.body}</div>
          </section>
        ))}
      </div>

      <footer className="mt-16 border-t border-border pt-8">
        <p className="font-serif text-xl italic text-primary" lang="en">
          {c.slogan}
        </p>
      </footer>
    </article>
  );
}

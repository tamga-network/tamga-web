import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Clock, List } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import {
  CHAPTERS,
  LEARN_PAGES,
  adjacentLearn,
  chapterPages,
  getChapter,
  getLearnPage,
  getLearnUi,
  learnSlugs,
  pickLocale,
  t,
} from "@/content/learn";
import { LearnSidebar, ReadTracker, type SidebarChapter } from "@/components/learn/learn-sidebar";
import { Figure } from "@/components/learn/prose";
import { deeperTarget } from "@/components/learn/links";

/*
 * Learn konu sayfası: solda bölümler (telefonda açılır "Bölümler"), ortada ~68 karakterlik okuma sütunu. Sıra: yol izi ·
 * bölüm · başlık · süre · özet cümlesi · (şema) · gövde · Özet · Daha derine · Önceki/Sonraki.
 */

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => learnSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLearnPage(slug);
  if (!page) return {};
  const loc = pickLocale(locale);
  return pageMeta(
    locale,
    `/learn/${slug}`,
    { title: `${t(page.title, loc)} · ${getLearnUi(locale).name}`, description: t(page.summary, loc) },
    { type: "article" },
  );
}

export default async function LearnPageView({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const page = getLearnPage(slug);
  if (!page) notFound();
  const locale = pickLocale(raw);
  const ui = getLearnUi(locale);
  const chapter = getChapter(page.chapter)!;
  const { prev, next } = adjacentLearn(slug);
  const body = page.body?.[locale] ?? page.body?.en;
  const indexInChapter = chapterPages(page.chapter).findIndex((p) => p.slug === slug) + 1;

  const sidebar: SidebarChapter[] = CHAPTERS.map((c) => ({
    n: c.n,
    title: t(c.title, locale),
    pages: chapterPages(c.n).map((p) => ({ slug: p.slug, title: t(p.title, locale) })),
  }));
  const sidebarLabels = { chapter: ui.chapters, progress: ui.progress, read: ui.read, total: LEARN_PAGES.length };
  const url = `${SITE_URL}/${raw}/learn/${slug}`;

  return (
    <div className="shell grid gap-10 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 lg:py-14">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t(page.title, locale),
            description: t(page.summary, locale),
            inLanguage: raw,
            url,
            mainEntityOfPage: url,
            isPartOf: { "@type": "Course", name: ui.title, url: `${SITE_URL}/${raw}/learn` },
            timeRequired: `PT${page.minutes}M`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: ORGANIZATION,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}/${raw}/learn` },
              { "@type": "ListItem", position: 2, name: t(chapter.title, locale) },
              { "@type": "ListItem", position: 3, name: t(page.title, locale), item: url },
            ],
          },
        ]}
      />
      <ReadTracker slug={slug} />

      {/* Bölümler */}
      <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
        <Link href="/learn" className="mb-5 hidden items-center gap-2 text-sm font-medium text-foreground lg:flex">
          <BookOpen size={16} aria-hidden className="text-primary" />
          {ui.home}
        </Link>
        <details className="group lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <List size={15} aria-hidden className="text-primary" />
              {ui.contents}
              <span className="font-normal text-foreground-subtle">
                · {ui.chapter} {chapter.n}
              </span>
            </span>
            <ChevronDown size={16} aria-hidden className="text-foreground-subtle transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="mt-3 rounded-lg border border-border bg-background-elevated p-4">
            <LearnSidebar chapters={sidebar} current={slug} labels={sidebarLabels} />
          </div>
        </details>
        <div className="hidden lg:block">
          <LearnSidebar chapters={sidebar} current={slug} labels={sidebarLabels} />
        </div>
      </aside>

      {/* Okuma sütunu */}
      <article className="min-w-0 max-w-[68ch]">
        <nav aria-label="breadcrumb" className="mb-6 text-[13px] text-foreground-subtle">
          <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
            <li>
              <Link href="/learn" className="transition-colors hover:text-foreground">
                {ui.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              {ui.chapter} {chapter.n}: {t(chapter.title, locale)}
            </li>
          </ol>
        </nav>

        <header className="space-y-4 border-b border-border pb-8">
          <p className="eyebrow m-0">
            {ui.chapter} {chapter.n} · {indexInChapter}/{chapterPages(chapter.n).length}
          </p>
          <h1 className="m-0 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem]">
            {t(page.title, locale)}
          </h1>
          <p className="m-0 text-lg leading-relaxed text-foreground-muted">{t(page.summary, locale)}</p>
          <p className="m-0 flex items-center gap-1.5 font-mono text-xs text-foreground-subtle">
            <Clock size={13} aria-hidden />
            {ui.minutes(page.minutes)}
          </p>
        </header>

        {ui.abridged && page.body?.[locale] ? (
          <p className="mt-6 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground-muted">
            <a href={`/en/learn/${page.slug}`} hrefLang="en" className="underline decoration-border-strong underline-offset-2 hover:text-foreground">
              {ui.abridged}
            </a>
          </p>
        ) : null}

        {page.diagram ? <Figure diagram={page.diagram} locale={raw} /> : null}

        {body ? (
          <div className="learn-prose mt-8">{body}</div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-border-strong px-6 py-8 text-center">
            <p className="m-0 font-medium text-foreground">{ui.writing}</p>
            <p className="m-0 mt-1.5 text-sm text-foreground-muted">{ui.writingNote}</p>
          </div>
        )}

        {page.keyPoints?.length ? (
          <section aria-labelledby="learn-summary" className="mt-12 rounded-2xl border border-border bg-surface/50 px-6 py-6">
            <h2 id="learn-summary" className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              {ui.summary}
            </h2>
            <ul className="m-0 mt-4 list-none space-y-3 p-0">
              {page.keyPoints.map((k, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                  <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" />
                  {t(k, locale)}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {page.deeper?.length ? (
          <section aria-labelledby="learn-deeper" className="mt-10">
            <h2 id="learn-deeper" className="m-0 text-xl font-semibold">
              {ui.deeper}
            </h2>
            <p className="m-0 mt-1.5 text-sm text-foreground-muted">{ui.deeperLead}</p>
            <ul className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
              {page.deeper.map((d) => {
                const target = deeperTarget(d, raw);
                const inner = (
                  <>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">{ui.kinds[d.kind]}</span>
                    <span className="flex items-start justify-between gap-3 font-medium leading-snug text-foreground">
                      {t(d.label, locale)}
                      <ArrowUpRight size={15} aria-hidden className="mt-0.5 shrink-0 text-foreground-subtle transition-colors group-hover:text-primary" />
                    </span>
                  </>
                );
                const cls =
                  "group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-background-elevated px-4 py-3.5 transition-colors hover:border-primary/50";
                return (
                  <li key={d.href}>
                    {target.external ? (
                      <a href={target.external} target="_blank" rel="noopener noreferrer" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={target.href!} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <nav aria-label={`${ui.prev} / ${ui.next}`} className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={{ pathname: "/learn/[slug]", params: { slug: prev.slug } }}
              className="group flex flex-col gap-1 rounded-xl border border-border px-4 py-3.5 transition-colors hover:border-border-strong"
            >
              <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
                <ArrowLeft size={13} aria-hidden /> {ui.prev}
              </span>
              <span className="font-medium text-foreground group-hover:text-primary">{t(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={{ pathname: "/learn/[slug]", params: { slug: next.slug } }}
              className="group flex flex-col items-end gap-1 rounded-xl border border-border px-4 py-3.5 text-right transition-colors hover:border-primary/50 sm:col-start-2"
            >
              <span className="flex items-center gap-1.5 text-xs text-foreground-subtle">
                {ui.next} <ArrowRight size={13} aria-hidden />
              </span>
              <span className="font-medium text-foreground group-hover:text-primary">{t(next.title, locale)}</span>
            </Link>
          ) : (
            <Link
              href="/learn"
              className="group flex flex-col items-end gap-1 rounded-xl border border-border px-4 py-3.5 text-right transition-colors hover:border-primary/50 sm:col-start-2"
            >
              <span className="text-xs text-foreground-subtle">{ui.home}</span>
              <span className="font-medium text-foreground group-hover:text-primary">{ui.backToPath}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Clock, List } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { PostBody } from "@/components/blog/post-body";
import { getLearnPage, pickLocale, t as learnT } from "@/content/learn";
import {
  POSTS,
  blogPath,
  formatDate,
  isFallback,
  postBySlug,
  postText,
  visibleRelated,
  type BlogPost,
} from "@/lib/blog";
import { categoryLabel, getBlogUi, pageLabel } from "@/lib/blog-ui";

type Params = { params: Promise<{ locale: string; slug: string }> };

// Yalnız görünen yazılar üretilir (yayında taslak yok); başka adres 404.
export const dynamicParams = false;
export function generateStaticParams() {
  const slugs = POSTS.length ? POSTS.map((p) => p.slug) : ["_"];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

/** Paylaşım görseli: kapak varsa kapak, yoksa yazıya özel üretilen ./og.png. tk çevirisi yoksa İngilizce görsel. */
const ogImage = (p: BlogPost, locale: string) =>
  p.cover ?? `/${isFallback(p, locale) ? "en" : locale}${blogPath(p.slug)}/og.png`;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  const x = postText(p, locale);
  const ui = getBlogUi(locale);
  const meta = pageMeta(
    locale,
    blogPath(slug),
    { title: x.title, description: x.description },
    {
      type: "article",
      ...(p.date ? { publishedTime: p.date } : {}),
      ...(p.updated ? { modifiedTime: p.updated } : {}),
      authors: [ui.author],
      section: categoryLabel(p.category, locale),
      image: ogImage(p, locale),
      // Çevirisi olmayan dil hreflang'da yer almaz; o dildeki sayfa (İngilizce metin) asıl olarak İngilizceyi gösterir.
      locales: p.locales,
      ...(isFallback(p, locale) ? { canonicalLocale: "en" } : {}),
      noindex: p.draft,
    },
  );
  return {
    ...meta,
    alternates: { ...meta.alternates, types: { "application/rss+xml": `${SITE_URL}/${locale}/blog/rss.xml` } },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = postBySlug(slug);
  if (!p) notFound();
  const x = postText(p, locale);
  const fallback = isFallback(p, locale);
  const ui = getBlogUi(locale);
  const category = categoryLabel(p.category, locale);
  const url = `${SITE_URL}/${locale}${blogPath(slug)}`;
  const learnLoc = pickLocale(locale);

  const related = visibleRelated(p).map((r) => {
    if (r.kind === "post") {
      const rp = postBySlug(r.slug)!;
      const rx = postText(rp, locale);
      return {
        key: `post-${r.slug}`,
        href: { pathname: "/blog/[slug]" as const, params: { slug: r.slug } },
        tag: `${ui.relatedPost} · ${categoryLabel(rp.category, locale)}`,
        title: rx.title,
        text: rx.description,
      };
    }
    if (r.kind === "learn") {
      const lp = getLearnPage(r.slug)!;
      return {
        key: `learn-${r.slug}`,
        href: { pathname: "/learn/[slug]" as const, params: { slug: r.slug } },
        tag: ui.relatedLearn,
        title: learnT(lp.title, learnLoc),
        text: learnT(lp.summary, learnLoc),
      };
    }
    return {
      key: `page-${r.slug}`,
      href: r.slug as "/",
      tag: ui.relatedPage,
      title: pageLabel(r.slug, locale),
      text: "",
    };
  });

  const toc = x.toc.length > 1 ? x.toc : [];
  const TocList = () => (
    <ul className="m-0 list-none space-y-0.5 p-0 text-[14px]">
      {toc.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="flex min-h-9 items-center border-l border-border py-1 pl-3 leading-snug text-foreground-muted transition-colors hover:border-primary hover:text-foreground"
          >
            {h.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <article>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: x.title,
            description: x.description,
            inLanguage: fallback ? "en" : locale,
            url,
            mainEntityOfPage: url,
            articleSection: category,
            wordCount: x.words,
            ...(p.date ? { datePublished: p.date, dateModified: p.updated ?? p.date } : {}),
            image: `${SITE_URL}${ogImage(p, locale)}`,
            author: { "@id": `${SITE_URL}/#organization` },
            publisher: ORGANIZATION,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: ui.title, item: `${SITE_URL}/${locale}/blog` },
              { "@type": "ListItem", position: 2, name: x.title, item: url },
            ],
          },
        ]}
      />

      <header className="border-b border-border bg-tamga-grain">
        <div className="shell py-12 sm:py-16">
          <nav aria-label="breadcrumb" className="text-[13px] text-foreground-subtle">
            <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
              <li>
                <Link href="/blog" className="inline-flex min-h-9 items-center gap-1.5 transition-colors hover:text-foreground">
                  <ArrowLeft size={14} aria-hidden /> {ui.allPosts}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={{ pathname: "/blog", query: { category: p.category } }}
                  className="inline-flex min-h-9 items-center transition-colors hover:text-foreground"
                >
                  {category}
                </Link>
              </li>
            </ol>
          </nav>
          <p className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href={{ pathname: "/blog", query: { category: p.category } }}
              className="rounded-full border border-border bg-background-elevated px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary"
            >
              {category}
            </Link>
            {p.draft ? (
              <span className="rounded-full border border-gold px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
                {ui.draft}
              </span>
            ) : null}
          </p>
          <h1
            lang={fallback ? "en" : undefined}
            className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-5xl"
          >
            {x.title}
          </h1>
          <p lang={fallback ? "en" : undefined} className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {x.description}
          </p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-foreground-subtle">
            <span>{ui.author}</span>
            <span aria-hidden>·</span>
            {p.date ? <time dateTime={p.date}>{formatDate(p.date, locale)}</time> : <span>{ui.noDate}</span>}
            {p.updated ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {ui.updated}: <time dateTime={p.updated}>{formatDate(p.updated, locale)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} aria-hidden /> {ui.minRead(x.readingTime)}
            </span>
          </p>
        </div>
      </header>

      <div className="shell grid gap-10 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14 lg:py-14">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
          {toc.length ? (
            <>
              <details className="group lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-strong [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2">
                    <List size={15} aria-hidden className="text-primary" />
                    {ui.toc}
                  </span>
                  <ChevronDown size={16} aria-hidden className="text-foreground-subtle transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <nav aria-label={ui.toc} className="mt-3 rounded-lg border border-border bg-background-elevated p-4">
                  <TocList />
                </nav>
              </details>
              <nav aria-label={ui.toc} className="hidden lg:block">
                <p className="eyebrow m-0 mb-3">{ui.toc}</p>
                <TocList />
              </nav>
            </>
          ) : null}
        </aside>

        <div className="min-w-0 max-w-[70ch]">
          {p.draft ? (
            <p className="mb-6 rounded-lg border border-gold/50 bg-gold/[0.07] px-4 py-2.5 text-sm text-foreground">
              <strong>{ui.draft}:</strong> {ui.draftNote}
            </p>
          ) : null}
          {fallback && ui.fallback ? (
            <p className="mb-6 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground-muted">
              <a
                href={`/en${blogPath(slug)}`}
                hrefLang="en"
                className="underline decoration-border-strong underline-offset-2 hover:text-foreground"
              >
                {ui.fallback}
              </a>
            </p>
          ) : null}

          <div className="learn-prose blog-prose" lang={fallback ? "en" : undefined}>
            <PostBody blocks={x.blocks} labels={{ copy: ui.copy, copied: ui.copied, code: ui.code }} />
          </div>

          {related.length ? (
            <section aria-labelledby="blog-related" className="mt-14">
              <h2 id="blog-related" className="m-0 text-xl font-semibold">
                {ui.related}
              </h2>
              <ul className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.key}>
                    <Link
                      href={r.href}
                      className="group flex h-full flex-col gap-1.5 rounded-xl border border-border bg-background-elevated px-4 py-3.5 transition-colors hover:border-primary/50"
                    >
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">{r.tag}</span>
                      <span className="flex items-start justify-between gap-3 font-medium leading-snug text-foreground">
                        {r.title}
                        <ArrowUpRight size={15} aria-hidden className="mt-0.5 shrink-0 text-foreground-subtle transition-colors group-hover:text-primary" />
                      </span>
                      {r.text ? <span className="line-clamp-2 text-[14px] leading-relaxed text-foreground-muted">{r.text}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="blog-cta" className="mt-14 rounded-2xl border border-border bg-surface/50 px-6 py-7 sm:px-8">
            <h2 id="blog-cta" className="m-0 text-xl font-semibold">
              {ui.ctaTitle}
            </h2>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-foreground-muted">{ui.ctaText}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-contrast transition-colors hover:bg-primary-strong"
              >
                {ui.ctaLearn} <ArrowRight size={15} aria-hidden />
              </Link>
              <Link
                href="/join"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border-strong px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {ui.ctaJoin}
              </Link>
            </div>
          </section>

          <p className="mt-10">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-strong">
              <ArrowLeft size={15} aria-hidden /> {ui.back}
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}

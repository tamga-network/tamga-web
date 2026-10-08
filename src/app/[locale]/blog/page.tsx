import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Rss } from "lucide-react";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { PageHeader } from "@/components/ui";
import { BlogList, type BlogCard } from "@/components/blog/blog-list";
import { BLOG_CATEGORIES, POSTS, blogPath, formatPostDate, postText } from "@/lib/blog";
import { categoryLabel, getBlogUi } from "@/lib/blog-ui";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  const meta = pageMeta(locale, "/blog", { title: ui.eyebrow, description: ui.description });
  return {
    ...meta,
    alternates: { ...meta.alternates, types: { "application/rss+xml": `${SITE_URL}/${locale}/blog/rss.xml` } },
  };
}

/** Blog listesi: başlık, RSS, kategori süzgeci (?category=), öne çıkan en yeni yazı, yazı kartları. */
export default async function BlogPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = getBlogUi(locale);

  const cards: BlogCard[] = POSTS.map((p) => {
    const x = postText(p, locale);
    return {
      slug: p.slug,
      category: p.category,
      categoryLabel: categoryLabel(p.category, locale),
      title: x.title,
      description: x.description,
      date: p.date ? formatPostDate(p, locale) : ui.noDate,
      dateIso: p.date,
      minRead: ui.minRead(x.readingTime),
      draft: p.draft,
      ...(p.cover ? { cover: p.cover, coverAlt: x.coverAlt } : {}),
    };
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${ui.title} · Tamga Network`,
          url: `${SITE_URL}/${locale}/blog`,
          inLanguage: locale,
          publisher: ORGANIZATION,
          blogPost: POSTS.filter((p) => !p.draft).map((p) => ({
            "@type": "BlogPosting",
            headline: postText(p, locale).title,
            url: `${SITE_URL}/${locale}${blogPath(p.slug)}`,
            datePublished: p.date,
          })),
        }}
      />
      <PageHeader eyebrow={ui.eyebrow} title={ui.title} description={ui.description} />

      <section className="shell py-12 sm:py-16">
        <p className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-foreground-subtle">
          <span>{ui.count(cards.length)}</span>
          <a
            href={`/${locale}/blog/rss.xml`}
            className="inline-flex min-h-9 items-center gap-1.5 text-primary transition-colors hover:text-primary-strong"
          >
            <Rss size={13} aria-hidden /> {ui.rss}
          </a>
        </p>
        {cards.length ? (
          <BlogList
            cards={cards}
            categories={BLOG_CATEGORIES.map((k) => ({ key: k, label: categoryLabel(k, locale) }))}
            labels={{
              filter: ui.filter,
              all: ui.all,
              draft: ui.draft,
              emptyFilter: ui.emptyFilter,
              latest: ui.latest,
              readMore: ui.readMore,
            }}
          />
        ) : (
          <p className="text-foreground-muted">{ui.empty}</p>
        )}
      </section>
    </>
  );
}

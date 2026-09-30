import type { Metadata } from "next";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { allSlugs, getPost, getBlogUi, formatDate, isEarlierDesign } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};
  return pageMeta(
    locale,
    `/blog/${slug}`,
    { title: post.title, description: post.description },
    { type: "article", publishedTime: post.date, authors: ["Tamga Network"] },
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();
  const ui = getBlogUi(locale);

  return (
    <article className="shell max-w-2xl py-16 sm:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: locale,
          url: `${SITE_URL}/${locale}/blog/${slug}`,
          mainEntityOfPage: `${SITE_URL}/${locale}/blog/${slug}`,
          image: `${SITE_URL}/og.png`,
          author: { "@id": `${SITE_URL}/#organization` },
          publisher: ORGANIZATION,
        }}
      />
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={15} /> {ui.allPosts}
      </Link>

      <div className="flex items-center gap-3 text-xs text-foreground-subtle">
        <span className="rounded-full border border-border px-2.5 py-0.5 font-mono uppercase tracking-wide text-primary">
          {post.tag}
        </span>
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
        {post.description}
      </p>

      {isEarlierDesign(post.date) && (
        <aside className="mt-8 rounded-r-lg border border-border border-l-[3px] border-l-gold-bright bg-surface/50 p-4 text-sm leading-relaxed text-foreground-muted">
          {ui.earlierDesign}
        </aside>
      )}

      <div className="prose mt-10 border-t border-border pt-10">{post.body}</div>

      <footer className="mt-14 border-t border-border pt-8">
        <p className="text-sm text-foreground-muted">{ui.footer}</p>
      </footer>
    </article>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { getPostsMeta, getBlogUi, formatDate } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  return pageMeta(locale, "/blog", { title: ui.eyebrow, description: ui.description });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = getBlogUi(locale);
  const posts = getPostsMeta(locale);

  return (
    <>
      <PageHeader eyebrow={ui.eyebrow} title={ui.title} description={ui.description} />

      <section className="shell py-14">
        <div className="mx-auto max-w-3xl divide-y divide-border">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                className="group flex flex-col gap-2 py-11 first:pt-0"
              >
                <div className="flex items-center gap-3 text-xs text-foreground-subtle">
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono uppercase tracking-wide text-primary">
                    {post.tag}
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="leading-relaxed text-foreground-muted">
                  {post.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {ui.readMore}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

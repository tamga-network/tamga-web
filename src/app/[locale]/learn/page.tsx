import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import {
  CHAPTERS,
  LEARN_PAGES,
  chapterMinutes,
  chapterPages,
  getLearnUi,
  pickLocale,
  t,
  totalMinutes,
} from "@/content/learn";
import { ContinueLink } from "@/components/learn/learn-sidebar";

/*
 * Learn ana sayfası: giriş, rol bazlı kısa yollar ("Nereden başlamalıyım?") ve yedi bölümün dikey yol haritası.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ui = getLearnUi(locale);
  return pageMeta(locale, "/learn", { title: ui.title, description: ui.description });
}

export default async function LearnIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = pickLocale(raw);
  const ui = getLearnUi(locale);
  const first = LEARN_PAGES[0];
  const order = LEARN_PAGES.map((p) => p.slug);
  const firstOf = (n: number) => chapterPages(n)[0]?.slug ?? first.slug;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Course",
            name: ui.title,
            description: ui.description,
            inLanguage: raw,
            url: `${SITE_URL}/${raw}/learn`,
            provider: ORGANIZATION,
            hasPart: CHAPTERS.map((c) => ({ "@type": "CreativeWork", name: t(c.title, locale) })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ "@type": "ListItem", position: 1, name: ui.home, item: `${SITE_URL}/${raw}/learn` }],
          },
        ]}
      />

      {/* Giriş */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="sig-glow pointer-events-none absolute inset-0 opacity-70" />
        <div className="shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div className="space-y-6">
            <p className="eyebrow m-0">{ui.eyebrow}</p>
            <h1 className="m-0 max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-6xl">
              {ui.heroTitle}
            </h1>
            <p className="m-0 max-w-2xl text-lg leading-relaxed text-foreground-muted">{ui.heroLead}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={{ pathname: "/learn/[slug]", params: { slug: first.slug } }}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong"
              >
                {ui.start} <ArrowRight size={15} aria-hidden />
              </Link>
              <ContinueLink order={order} label={ui.continueReading} />
            </div>
          </div>
          <dl className="m-0 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {[
              [String(CHAPTERS.length), ui.chapters],
              [String(LEARN_PAGES.length), ui.pages(LEARN_PAGES.length).replace(/^\d+\s*/, "")],
              [ui.minutes(totalMinutes()), <Clock key="c" size={14} aria-hidden />],
            ].map(([v, k], i) => (
              <div key={i} className="flex flex-col gap-1 bg-background-elevated px-4 py-4">
                <dt className="order-2 flex items-center gap-1 text-xs text-foreground-subtle">{k}</dt>
                <dd className="order-1 m-0 font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nereden başlamalıyım? */}
      <section className="shell py-14 sm:py-16">
        <div className="max-w-2xl space-y-2">
          <h2 className="m-0 text-2xl font-semibold sm:text-3xl">{ui.whereTitle}</h2>
          <p className="m-0 text-foreground-muted">{ui.whereLead}</p>
        </div>
        <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {ui.roles.map((r) => (
            <li key={r.key}>
              <Link
                href={{ pathname: "/learn/[slug]", params: { slug: firstOf(r.target[0]) } }}
                className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-background-elevated p-5 transition-colors hover:border-primary/50"
              >
                <span className="text-base font-semibold text-foreground group-hover:text-primary">{r.title}</span>
                <span className="flex-1 text-sm leading-relaxed text-foreground-muted">{r.text}</span>
                <span className="flex flex-wrap gap-1.5">
                  {r.target.map((n) => (
                    <span
                      key={n}
                      className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-foreground-subtle"
                    >
                      {ui.chapter} {n}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Yedi bölüm */}
      <section className="border-t border-border bg-surface/30">
        <div className="shell py-14 sm:py-16">
          <h2 className="m-0 text-2xl font-semibold sm:text-3xl">{ui.pathTitle}</h2>
          <ol className="m-0 mt-10 list-none space-y-0 p-0">
            {CHAPTERS.map((c, i) => {
              const pages = chapterPages(c.n);
              return (
                <li key={c.n} className="relative grid gap-6 pb-12 pl-14 last:pb-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
                  {i < CHAPTERS.length - 1 ? (
                    <span aria-hidden className="absolute bottom-0 left-[19px] top-11 w-px bg-border" />
                  ) : null}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-primary/40 bg-background-elevated font-mono text-sm font-medium text-primary"
                  >
                    {String(c.n).padStart(2, "0")}
                  </span>
                  <div className="space-y-2">
                    <p className="eyebrow m-0">
                      {ui.chapter} {c.n}
                    </p>
                    <h3 className="m-0 text-xl font-semibold sm:text-2xl">{t(c.title, locale)}</h3>
                    <p className="m-0 text-foreground-muted">{t(c.intro, locale)}</p>
                    <p className="m-0 font-mono text-xs text-foreground-subtle">
                      {ui.pages(pages.length)} · {ui.minutes(chapterMinutes(c.n))}
                    </p>
                  </div>
                  <ol className="m-0 grid list-none gap-1 p-0 sm:grid-cols-2">
                    {pages.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={{ pathname: "/learn/[slug]", params: { slug: p.slug } }}
                          className="group flex items-baseline gap-2.5 rounded-md px-2 py-1.5 text-[15px] text-foreground-muted transition-colors hover:bg-background-elevated hover:text-foreground"
                        >
                          <span className="font-mono text-[11px] text-foreground-subtle">
                            {c.n}.{p.order}
                          </span>
                          <span className="group-hover:text-primary">{t(p.title, locale)}</span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

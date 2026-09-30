import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import {
  CHANGELOG,
  CHANGELOG_PAGE,
  CHANGE_LABELS,
  type ChangeKind,
} from "@/content/changelog";
import { DEV_LINKS } from "@/lib/ecosystem";

const KIND: Record<ChangeKind, string> = {
  added: "border-accent/50 text-accent",
  changed: "border-gold-bright/60 text-gold-bright",
  security: "border-primary/50 text-primary",
};

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const p = CHANGELOG_PAGE[loc(locale)];
  return { title: p.title, description: p.description };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const p = CHANGELOG_PAGE[l];
  const dates = [...new Set(CHANGELOG.map((e) => e.date))];
  const fmt = new Intl.DateTimeFormat(l === "en" ? "en-GB" : l, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.lead} />
      <section className="shell py-14 sm:py-16">
        <div className="space-y-12">
          {dates.map((d) => (
            <div
              key={d}
              className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <time
                dateTime={d}
                className="font-mono text-sm text-foreground-subtle md:pt-1"
              >
                {fmt.format(new Date(d + "T12:00:00Z"))}
              </time>
              <div className="space-y-6">
                {CHANGELOG.filter((e) => e.date === d).map((e) => (
                  <article
                    key={e.title.en}
                    className="rounded-lg border border-border bg-surface/40 p-5"
                  >
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider ${KIND[e.kind]}`}
                    >
                      {CHANGE_LABELS[l][e.kind]}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-foreground">
                      {e.title[l]}
                    </h2>
                    <ul className="mt-3 space-y-1.5">
                      {e.items[l].map((i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm leading-relaxed text-foreground-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                          />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a
          href={`${DEV_LINKS.github}/tamga-network/blob/main/CHANGELOG.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-12 inline-block text-sm text-foreground-muted hover:text-foreground"
        >
          {p.more} ↗
        </a>
      </section>
    </>
  );
}

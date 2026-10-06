import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import {
  CHANGELOG_PAGE,
  RELEASES,
  RELEASE_LABELS,
  SECTION_LABELS,
  type ReleaseKind,
  type SectionKind,
} from "@/content/changelog";
import { DEV_LINKS } from "@/lib/ecosystem";

const KIND: Record<ReleaseKind, string> = {
  feature: "border-accent/50 bg-accent/10 text-accent",
  security: "border-primary/50 bg-primary/10 text-primary",
  fix: "border-gold-bright/60 bg-gold-bright/10 text-gold-bright",
};
const SECTION_ORDER: SectionKind[] = ["added", "changed", "fixed", "security"];

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const p = CHANGELOG_PAGE[loc(locale)];
  return pageMeta(locale, "/changelog", { title: p.title, description: p.description });
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
  const fmt = new Intl.DateTimeFormat(l === "en" ? "en-GB" : l, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.lead} />
      <section className="shell py-14 sm:py-16">
        <ol className="relative mx-auto max-w-4xl">
          {RELEASES.map((r, i) => (
            <li
              key={r.id ?? r.version}
              id={r.id ?? r.version}
              className="relative grid scroll-mt-24 gap-4 border-l border-border pb-14 pl-8 last:pb-0 md:grid-cols-[10rem_1fr] md:gap-10 md:border-l-0 md:pl-0"
            >
              {/* Sol: sürüm ve tarih */}
              <div className="md:sticky md:top-24 md:self-start md:text-right">
                <span
                  aria-hidden
                  className="absolute -left-[0.4rem] top-1.5 h-3 w-3 rotate-45 border-2 border-primary bg-background md:hidden"
                />
                <a
                  href={`#${r.id ?? r.version}`}
                  className="font-mono text-2xl font-semibold text-foreground hover:text-primary"
                >
                  {r.version}
                </a>
                <p className="mt-1 font-mono text-xs text-foreground-subtle">
                  <time dateTime={r.date}>
                    {fmt.format(new Date(r.date + "T12:00:00Z"))}
                  </time>
                </p>
                {i === 0 && (
                  <span className="mt-2 inline-block rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-foreground-muted">
                    {p.latest}
                  </span>
                )}
              </div>

              {/* Sağ: içerik */}
              <article className="md:border-l md:border-border md:pl-10">
                <span
                  className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider ${KIND[r.kind]}`}
                >
                  {RELEASE_LABELS[l][r.kind]}
                </span>
                <h2 className="mt-3 text-balance text-2xl font-semibold text-foreground">
                  {r.title[l]}
                </h2>
                <div className="mt-5 space-y-5">
                  {SECTION_ORDER.filter((s) => r.sections[s]).map((s) => (
                    <div key={s}>
                      <h3 className="mono-label text-foreground-subtle">
                        {SECTION_LABELS[l][s]}
                      </h3>
                      <ul className="mt-2 space-y-1.5">
                        {r.sections[s]![l].map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {r.note && (
                  <p className="mt-5 text-sm italic text-foreground-subtle">
                    {r.note[l]}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 max-w-4xl">
          <a
            href={`${DEV_LINKS.github}/tamga-network/blob/main/CHANGELOG.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-sm text-foreground-muted hover:text-foreground"
          >
            {p.more} ↗
          </a>
        </div>
      </section>
    </>
  );
}

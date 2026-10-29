import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Download, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { formatDate } from "@/lib/blog-format";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { EXTERNAL_ATTRS } from "@/components/external-link";
import {
  bioOf,
  langName,
  memberBySlug,
  publicationsOf,
  teamSlugs,
  teamUi,
  tx,
  txs,
  writingsOf,
  type TeamMember,
} from "@/content/team";
import type { TimelineItem } from "@/content/team/types";
import { MemberAvatar, MemberLinkIcons, memberLinks } from "@/components/team/member-parts";

/*
 * Ekip üyesi profili: fotoğraf, rol, tanıtım, eğitim / geçmiş, yazılar, yayınlar (PDF) ve bağlantılar.
 * Boş bölüm hiç görünmez. PDF'ler aynı sitede, tarayıcının kendi görüntüleyicisinde yeni sekmede açılır
 * (çerçeve içine gömme yok: site başlıkları çerçeveyi bilinçli olarak kapatır).
 */

type Params = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => teamSlugs().map((slug) => ({ locale, slug })));
}

/** "2026-10" ya da "2026-10-29" → okunur tarih */
const fmtDate = (d: string, locale: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return formatDate(d, locale);
  if (/^\d{4}-\d{2}$/.test(d)) {
    const [y, m] = d.split("-").map(Number);
    return new Intl.DateTimeFormat(locale === "tk" ? "tk" : locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, 1)));
  }
  return d;
};

const isSitePath = (u: string) => u.startsWith("/");

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const m = memberBySlug(slug);
  if (!m) return {};
  const role = tx(m.role, locale);
  const description = m.headline ? `${role}. ${tx(m.headline, locale)}` : `${role} · Tamga Network`;
  return pageMeta(
    locale,
    `/team/${m.slug}`,
    { title: m.name, description },
    m.photo ? { image: `/team/${m.photo.base}.jpg` } : undefined,
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 font-serif text-2xl font-semibold text-foreground sm:text-[1.7rem]">
      {children}
    </h2>
  );
}

function Timeline({ items, locale }: { items: TimelineItem[]; locale: string }) {
  return (
    <ol className="relative mt-6 space-y-7 border-l border-border pl-6">
      {items.map((it, i) => (
        <li key={`${it.period}-${i}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background"
          />
          <p className="mono-label">{it.period}</p>
          <p className="mt-1 font-medium text-foreground">{tx(it.title, locale)}</p>
          {it.place && <p className="text-sm text-foreground-muted">{txs(it.place, locale)}</p>}
          {it.note && <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{tx(it.note, locale)}</p>}
        </li>
      ))}
    </ol>
  );
}

function personLd(m: TeamMember, locale: string) {
  const url = `${SITE_URL}/${locale}/team/${m.slug}`;
  const knowsAbout = [
    ...(m.focus ?? []).map((f) => tx(f, "en")),
    ...(m.expertise ?? []).flatMap((g) => g.items.map((x) => tx(x, "en"))),
  ];
  const alumniOf = m.education
    .filter((e) => e.place)
    .map((e) => ({ "@type": "EducationalOrganization", name: txs(e.place!, locale) }));
  const sameAs = memberLinks(m)
    .map((l) => l.url)
    .filter((u) => u.startsWith("http"));
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/team/${m.slug}#person`,
      name: m.name,
      jobTitle: tx(m.role, locale),
      url,
      ...(m.photo ? { image: `${SITE_URL}/team/${m.photo.base}.jpg` } : {}),
      ...(m.bio ? { description: bioOf(m, locale)[0] } : {}),
      ...(knowsAbout.length ? { knowsAbout } : {}),
      ...(alumniOf.length ? { alumniOf } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      memberOf: { "@id": ORGANIZATION["@id"], "@type": "Organization", name: ORGANIZATION.name },
    },
  };
}

export default async function TeamMemberPage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const m = memberBySlug(slug);
  if (!m) notFound();
  const ui = teamUi(locale);
  const bio = bioOf(m, locale);
  const writings = writingsOf(m);
  const pubs = publicationsOf(m);
  const links = memberLinks(m);
  const expertise = m.expertise ?? [];
  const sections = [
    bio.length > 0 && ["about", ui.about],
    expertise.length > 0 && ["expertise", ui.expertise],
    m.education.length > 0 && ["education", ui.education],
    m.experience.length > 0 && ["experience", ui.experience],
    writings.length > 0 && ["writings", ui.writings],
    pubs.length > 0 && ["publications", ui.publications],
  ].filter((x): x is [string, string] => Boolean(x));
  const showAside = sections.length > 1 || links.length > 0;
  const hasMain =
    bio.length > 0 || expertise.length > 0 || m.education.length > 0 || m.experience.length > 0 || writings.length > 0 || pubs.length > 0;

  return (
    <>
      <JsonLd data={personLd(m, locale)} />

      {/* Üst bölüm */}
      <div className="border-b border-border bg-tamga-grain">
        <div className="shell py-12 sm:py-16">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {ui.back}
          </Link>

          <div className="mt-8 grid items-center justify-items-center gap-8 text-center md:grid-cols-[auto_1fr] md:justify-items-start md:gap-14 md:text-left">
            <MemberAvatar
              member={m}
              locale={locale}
              live
              priority
              sizes="(min-width: 768px) 224px, 192px"
              initialsClassName="text-6xl sm:text-7xl"
              className="[--team-size:12rem] md:[--team-size:14rem]"
            />
            <div className="flex flex-col items-center md:items-start">
              <p className="eyebrow mb-3">{tx(m.role, locale)}</p>
              <h1 className="text-balance text-4xl font-semibold sm:text-5xl">{m.name}</h1>
              {m.headline && (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">{tx(m.headline, locale)}</p>
              )}
              {m.focus && m.focus.length > 0 && (
                <ul aria-label={ui.focus} className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                  {m.focus.map((f) => (
                    <li
                      key={f.en}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground-muted"
                    >
                      {tx(f, locale)}
                    </li>
                  ))}
                </ul>
              )}
              <MemberLinkIcons member={m} withLabels size={15} className="mt-6 justify-center md:justify-start" />
            </div>
          </div>
        </div>
      </div>

      <div className="shell py-14 sm:py-16">
        {!hasMain ? (
          <p className="max-w-2xl rounded-xl border border-dashed border-border-strong bg-surface/40 p-6 text-foreground-muted">
            {ui.inPreparation}
          </p>
        ) : (
          <div className={`grid gap-14 ${showAside ? "lg:grid-cols-[minmax(0,1fr)_260px]" : ""}`}>
            <div className="min-w-0 space-y-16">
              {bio.length > 0 && (
                <section aria-labelledby="about">
                  <SectionTitle id="about">{ui.about}</SectionTitle>
                  <div className="prose mt-5 max-w-3xl">
                    {bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              )}

              {expertise.length > 0 && (
                <section aria-labelledby="expertise">
                  <SectionTitle id="expertise">{ui.expertise}</SectionTitle>
                  <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                    {expertise.map((g) => (
                      <div key={g.group.en}>
                        <dt className="mono-label text-primary">{tx(g.group, locale)}</dt>
                        <dd className="mt-2.5">
                          <ul className="flex flex-wrap gap-2">
                            {g.items.map((x) => (
                              <li
                                key={x.en}
                                className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-sm text-foreground"
                              >
                                {tx(x, locale)}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {m.education.length > 0 && (
                <section aria-labelledby="education">
                  <SectionTitle id="education">{ui.education}</SectionTitle>
                  <Timeline items={m.education} locale={locale} />
                </section>
              )}

              {m.experience.length > 0 && (
                <section aria-labelledby="experience">
                  <SectionTitle id="experience">{ui.experience}</SectionTitle>
                  <Timeline items={m.experience} locale={locale} />
                </section>
              )}

              {writings.length > 0 && (
                <section aria-labelledby="writings">
                  <SectionTitle id="writings">{ui.writings}</SectionTitle>
                  <ul className="mt-6 divide-y divide-border border-y border-border">
                    {writings.map((w) => {
                      const inner = (
                        <>
                          <span className="min-w-0">
                            <span className="mono-label">
                              {ui.venue[w.venue]} · {fmtDate(w.date, locale)} · {langName(w.lang, locale)}
                            </span>
                            <span className="mt-1 block font-medium text-foreground group-hover:text-primary">
                              {w.title}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-foreground-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </>
                      );
                      const cls =
                        "group flex items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
                      return (
                        <li key={w.url}>
                          {isSitePath(w.url) ? (
                            <a href={`/${locale}${w.url}`} className={cls}>
                              {inner}
                            </a>
                          ) : (
                            <a href={w.url} {...EXTERNAL_ATTRS} className={cls}>
                              {inner}
                              <span className="sr-only"> ({ui.opensNewTab})</span>
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {pubs.length > 0 && (
                <section aria-labelledby="publications">
                  <SectionTitle id="publications">{ui.publications}</SectionTitle>
                  <p className="mt-2 text-sm text-foreground-muted">{ui.publicationsLead}</p>
                  <ol className="mt-6 space-y-5">
                    {pubs.map((p) => {
                      const authors = p.authors?.length ? p.authors : [m.name];
                      const meta = [
                        fmtDate(p.date, locale),
                        langName(p.lang, locale),
                        p.pages ? ui.pages(p.pages) : null,
                        p.sizeKb
                          ? `PDF · ${p.sizeKb >= 1024 ? `${(p.sizeKb / 1024).toFixed(1)} MB` : `${p.sizeKb} KB`}`
                          : null,
                      ].filter(Boolean);
                      return (
                        <li key={p.id}>
                          <article className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-border-strong">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-primary">
                                {ui.kind[p.kind]}
                              </span>
                              <span className="mono-label">{meta.join(" · ")}</span>
                            </div>
                            <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground">
                              {p.title}
                            </h3>
                            <p className="mt-1.5 text-sm text-foreground-muted">
                              {authors.join(", ")}
                              {p.venue ? (
                                <>
                                  {" "}
                                  · <em>{p.venue}</em>
                                </>
                              ) : null}
                            </p>
                            {p.abstract && (
                              <div className="mt-4 border-l-2 border-gold/70 pl-4">
                                <p className="mono-label mb-1">{ui.abstract}</p>
                                <p className="text-sm leading-relaxed text-foreground-muted">
                                  {tx(p.abstract, locale)}
                                </p>
                              </div>
                            )}
                            <div className="mt-5 flex flex-wrap gap-2.5">
                              {p.file && (
                                <>
                                  <a
                                    href={p.file}
                                    {...EXTERNAL_ATTRS}
                                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                  >
                                    <FileText size={15} aria-hidden="true" />
                                    {ui.open}
                                    <span className="sr-only"> ({ui.opensNewTab})</span>
                                  </a>
                                  <a
                                    href={p.file}
                                    download
                                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                  >
                                    <Download size={15} aria-hidden="true" />
                                    {ui.download}
                                  </a>
                                </>
                              )}
                              {p.url && (
                                <a
                                  href={p.url}
                                  {...EXTERNAL_ATTRS}
                                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                  <ArrowUpRight size={15} aria-hidden="true" />
                                  {ui.external}
                                  <span className="sr-only"> ({ui.opensNewTab})</span>
                                </a>
                              )}
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              )}
            </div>

            {/* Yan sütun: sayfa içi gezinme ve bağlantılar */}
            {showAside && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-8">
                  {sections.length > 1 && (
                    <nav aria-label={m.name}>
                      <ul className="space-y-2 border-l border-border pl-4 text-sm">
                        {sections.map(([id, label]) => (
                          <li key={id}>
                            <a href={`#${id}`} className="link-underline text-foreground-muted hover:text-foreground">
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                  {links.length > 0 && (
                    <div>
                      <p className="mono-label mb-3">{ui.links}</p>
                      <MemberLinkIcons member={m} size={16} />
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </>
  );
}

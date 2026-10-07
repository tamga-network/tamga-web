import { setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/reveal";
import { VerifyModule } from "@/components/verify-card";
import { CodeWindow } from "@/components/code-window";
import { HowItWorks } from "@/components/how-it-works";
import {
  type ChainLabels,
  CredentialDiagram,
  DisclosureDiagram,
  PseudonymDiagram,
  RolesDiagram,
  TrustChainDiagram,
  ZkDiagram,
} from "@/components/home-diagrams";
import { getHomeContent, devCode, INSTALL_CMD, type HomeContent, type Topic } from "@/content/home";
import { PARTNERS } from "@/content/partners";
import { pickL, upcomingEvents } from "@/content/events";
import { formatDate, getPostsMeta } from "@/lib/blog";
import { arfUrl, docsUrl } from "@/lib/docs-nav";
import { DEV_LINKS } from "@/lib/ecosystem";

/*
 * tamga.network ana sayfası (2026-10-02, ikinci tur). Sıra: hero → ağda yer alanlar → neden → felsefe → nasıl çalışır
 * (akış diyagramı) → teknoloji sade dille (beş konu, her biri diyagramlı) → imza modülü → katmanlar ve kapılar → haberler ve
 * etkinlikler → yönetişim (zaman çizgisi + roller) → geliştiriciler (kod penceresi) → AB eşlemesi.
 * Hareket kısa ve amaçlı; reduced-motion'da durur. Renkler tema tokenlarından; imza geçişi yalnız hero ışığında.
 */

const btnPrimary =
  "inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-5 text-[15px] font-semibold text-primary-contrast transition-colors hover:bg-primary-strong";
const btnSecondary =
  "inline-flex min-h-12 items-center gap-2 rounded-md border border-border-strong px-5 text-[15px] font-semibold text-foreground transition-colors hover:border-foreground";
const h2 = "text-balance text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.025em] sm:text-5xl";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{children}</span>;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getHomeContent(locale);

  return (
    <>
      <Hero c={c} locale={locale} />
      <PartnersBand c={c} />
      <StandardsBand c={c} />
      <Why c={c} />
      <Philosophy c={c} />
      <How c={c} locale={locale} />
      <Tech c={c} />
      <section className="bg-ink-band text-ink-band-fg">
        <VerifyModule {...c.verify} />
      </section>
      <Stack c={c} locale={locale} />
      <Doors c={c} />
      <News c={c} locale={locale} />
      <Governance c={c} locale={locale} />
      <Developers c={c} locale={locale} />
      <Europe c={c} />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero({ c, locale }: { c: HomeContent; locale: string }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="sig-glow absolute inset-0" />
        <div className="shell grid h-full grid-cols-4 opacity-50 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`border-l border-border ${i >= 4 ? "hidden md:block" : ""}`} />
          ))}
        </div>
        <div className="home-scan absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-primary/[0.05] to-transparent" />
      </div>

      <div className="shell relative grid items-end gap-12 py-16 sm:py-20 lg:grid-cols-[7fr_5fr] lg:gap-14 lg:py-24">
        <div className="grid gap-7">
          <span className="home-rise" style={{ animationDelay: "40ms" }}>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
          </span>
          <h1
            className="home-rise text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[5.2rem] lg:leading-[0.98]"
            style={{ animationDelay: "110ms" }}
          >
            {c.hero.title}
          </h1>
          <p
            className="home-rise max-w-[46ch] text-lg leading-relaxed text-foreground-muted sm:text-xl"
            style={{ animationDelay: "190ms" }}
          >
            {c.hero.lead}
          </p>
          <div className="home-rise flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
            <Link href="/join" className={btnPrimary}>
              {c.hero.primary} <ArrowRight size={16} aria-hidden />
            </Link>
            <a href={arfUrl(locale)} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              {c.hero.secondary} <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>

        <div
          className="home-rise overflow-hidden rounded-xl border border-border-strong bg-background-elevated shadow-[0_24px_60px_-30px_rgba(13,41,56,0.45)]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border-strong px-4 py-3.5">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-foreground">{c.hero.listTitle}</span>
            <span className="font-mono text-xs text-foreground-subtle">{c.hero.listHost}</span>
          </div>
          <ul className="m-0 list-none p-0">
            {c.hero.rows.map((r, i) => (
              <li
                key={r.code}
                className={`home-rise grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 ${
                  i < c.hero.rows.length - 1 ? "border-b border-border" : ""
                } ${r.live ? "text-foreground" : "text-foreground-subtle"}`}
                style={{ animationDelay: `${320 + i * 70}ms` }}
              >
                <span className="font-mono text-[13px]">{r.code}</span>
                <span className="truncate">{r.name}</span>
                {r.live ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <span className="home-live h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    {r.status}
                  </span>
                ) : (
                  <span className="text-right text-xs">{r.status}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="m-0 bg-surface px-4 py-3 text-[13px] leading-snug text-foreground-muted">{c.hero.listNote}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ partners */

function PartnersBand({ c }: { c: HomeContent }) {
  return (
    <section aria-labelledby="home-partners" className="border-y border-border bg-surface/50">
      <div className="shell flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">{c.partners.eyebrow}</span>
          <h2 id="home-partners" className="text-lg font-semibold tracking-[-0.01em]">
            {c.partners.title}
          </h2>
        </div>
        {PARTNERS.length ? (
          <ul className="m-0 grid w-full list-none grid-cols-2 items-center gap-x-5 sm:grid-cols-4 gap-y-5 p-0 md:flex md:w-auto md:flex-wrap md:gap-x-10">
            {PARTNERS.slice(0, 8).map((p) => (
              <li key={p.name} className="flex h-12 min-w-0 items-center justify-center md:justify-start">
                <a href={p.url ?? "/partners"} target={p.url ? "_blank" : undefined} rel={p.url ? "noopener noreferrer" : undefined} title={p.name} className="flex h-full min-w-0 max-w-full items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  {p.logo ? (
                    p.withName ? (
                      <span className="flex items-center gap-2 text-foreground-muted opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.logo} alt="" className="h-8 w-auto dark:invert" />
                        <span className="font-semibold tracking-[-0.01em] whitespace-nowrap">{p.name}</span>
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={p.name} className="max-h-10 w-auto max-w-full object-contain opacity-70 md:max-h-11 md:max-w-40 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert" />
                    )
                  ) : (
                    <span className="font-serif font-semibold text-foreground-muted">{p.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="text-[15px] text-foreground-muted">{c.partners.empty}</p>
            <div className="flex gap-2.5">
              <Link href="/join" className="inline-flex min-h-10 items-center gap-1.5 rounded-md bg-primary px-4 text-sm font-semibold text-primary-contrast hover:bg-primary-strong">
                {c.partners.join}
              </Link>
              <Link href="/partners" className="inline-flex min-h-10 items-center gap-1.5 rounded-md border border-border-strong px-4 text-sm font-semibold text-foreground hover:border-foreground">
                {c.partners.all} <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ standards */

/**
 * Dayandığımız standartlar: kuruluş adı + kullandığımız şartname. Logo kullanılmaz (kuruluşların logoları onay ya da üyelik
 * izlenimi verir; kurumlarla bir ilişki yoktur). Yalnız gerçekten uygulanan standartlar.
 */
const STANDARDS: { body: string; specs: string }[] = [
  { body: "OpenID Foundation", specs: "OpenID4VCI · OpenID4VP · HAIP" },
  { body: "IETF", specs: "SD-JWT VC · Token Status List" },
  { body: "ISO/IEC", specs: "18013-5 mdoc" },
  { body: "ETSI", specs: "Trust lists · TS 119 612" },
  { body: "W3C", specs: "WebAuthn · passkeys" },
  { body: "eIDAS 2.0", specs: "EUDI ARF" },
];

function StandardsBand({ c }: { c: HomeContent }) {
  return (
    <section aria-labelledby="home-standards" className="border-b border-border">
      <div className="shell grid gap-6 py-9 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-center">
        <div className="grid gap-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">{c.standards.eyebrow}</span>
          <h2 id="home-standards" className="text-lg font-semibold tracking-[-0.01em]">
            {c.standards.title}
          </h2>
        </div>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-5 p-0 sm:grid-cols-3">
          {STANDARDS.map((x) => (
            <li key={x.body} className="grid gap-1">
              <span className="font-semibold tracking-[-0.01em] text-foreground-muted">{x.body}</span>
              <span className="font-mono text-[11px] leading-snug text-foreground-subtle">{x.specs}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ why */

function Why({ c }: { c: HomeContent }) {
  return (
    <section id="network" className="shell grid scroll-mt-24 gap-12 py-20 sm:py-28">
      <Reveal className="grid max-w-3xl gap-4">
        <Eyebrow>{c.why.eyebrow}</Eyebrow>
        <h2 className={h2}>{c.why.title}</h2>
        <p className="text-lg leading-relaxed text-foreground-muted">{c.why.lead}</p>
      </Reveal>
      <ol className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-border bg-border p-0 sm:grid-cols-2 lg:grid-cols-3">
        {c.why.problems.map((p, i) => (
          <li key={p.title} className="grid content-start gap-3 bg-background-elevated p-7">
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold leading-snug">{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-foreground-muted">{p.body}</p>
          </li>
        ))}
        <li className="sig-band grid content-start gap-3 p-7 text-ink-band-fg">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-gok-200">{c.why.purposeTitle}</span>
          <p className="text-[17px] leading-relaxed text-ink-band-fg">{c.why.purpose}</p>
        </li>
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ philosophy */

function Philosophy({ c }: { c: HomeContent }) {
  return (
    <section className="shell grid gap-9 pb-20 sm:pb-28">
      <Reveal className="grid gap-3">
        <Eyebrow>{c.philosophy.eyebrow}</Eyebrow>
        <h2 className={h2}>{c.philosophy.title}</h2>
      </Reveal>
      <div className="grid grid-cols-1 border-t border-foreground/80 sm:grid-cols-2 lg:grid-cols-5">
        {c.philosophy.items.map((p, i) => (
          <div
            key={p.title}
            className={`grid content-start gap-2.5 border-b border-border py-6 sm:pr-6 lg:border-b-0 ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <span className="font-mono text-xs text-foreground-subtle">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-foreground-muted">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ how */

function How({ c, locale }: { c: HomeContent; locale: string }) {
  // Adım açıklamaları animasyonun kendi altyazısında; ayrı adım listesi tekrar olmasın diye yok.
  return (
    <section id="how" className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="shell grid gap-10">
        <Reveal className="grid max-w-3xl gap-4">
          <Eyebrow>{c.how.eyebrow}</Eyebrow>
          <h2 className={h2}>{c.how.title}</h2>
          <p className="text-lg leading-relaxed text-foreground-muted">{c.how.lead}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="rounded-2xl border border-border bg-background p-4 sm:p-6 [background-image:linear-gradient(var(--dg-grid)_1px,transparent_1px),linear-gradient(90deg,var(--dg-grid)_1px,transparent_1px)] [background-size:28px_28px]">
            <HowItWorks locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ technology */

function TopicDiagram({ t }: { t: Topic }) {
  switch (t.id) {
    case "credential":
      return <CredentialDiagram l={t.d} />;
    case "disclosure":
      return <DisclosureDiagram l={t.d} />;
    case "zk":
      return <ZkDiagram l={t.d} />;
    case "pseudonym":
      return <PseudonymDiagram l={t.d} />;
    case "chain":
      return <TrustChainDiagram l={t.d satisfies ChainLabels} />;
  }
}

function Tech({ c }: { c: HomeContent }) {
  return (
    <section id="technology" className="shell grid scroll-mt-24 gap-14 py-20 sm:py-28">
      <Reveal className="grid max-w-3xl gap-4">
        <Eyebrow>{c.tech.eyebrow}</Eyebrow>
        <h2 className={h2}>{c.tech.title}</h2>
        <p className="text-lg leading-relaxed text-foreground-muted">{c.tech.lead}</p>
      </Reveal>
      <div className="grid gap-16 sm:gap-20">
        {c.tech.topics.map((t, i) => (
          <Reveal key={t.id}>
            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={`grid gap-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em]">{t.title}</h3>
                </div>
                <p className="text-lg leading-relaxed">{t.what}</p>
                <dl className="m-0 grid gap-4 border-t border-border pt-5">
                  <div className="grid gap-1">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">{c.tech.labels.why}</dt>
                    <dd className="m-0 text-[15px] leading-relaxed text-foreground-muted">{t.why}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="font-mono text-xs uppercase tracking-[0.12em] text-foreground-subtle">{c.tech.labels.solves}</dt>
                    <dd className="m-0 text-[15px] font-medium leading-relaxed text-foreground">{t.solves}</dd>
                  </div>
                </dl>
              </div>
              <div className={`rounded-2xl border border-border bg-background-elevated p-3 sm:p-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <TopicDiagram t={t} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ stack + doors */

function Stack({ c, locale }: { c: HomeContent; locale: string }) {
  return (
    <section id="rules" className="shell grid scroll-mt-24 gap-9 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal className="grid gap-3">
          <Eyebrow>{c.stack.eyebrow}</Eyebrow>
          <h2 className={`${h2} max-w-[18ch]`}>{c.stack.title}</h2>
        </Reveal>
        <a href={arfUrl(locale)} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
          {c.stack.cta} <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
      <ol className="m-0 list-none border-t border-foreground/80 p-0">
        {c.stack.layers.map((l, i) => (
          <li
            key={l.title}
            className={`group grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1.5 border-b border-border py-4 transition-colors hover:bg-surface/60 md:grid-cols-[4rem_minmax(0,3fr)_minmax(0,6fr)_8rem] md:gap-6 ${
              l.future ? "text-foreground-subtle" : ""
            }`}
          >
            <span className="font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
            <h3 className={`text-xl font-semibold transition-transform duration-200 group-hover:translate-x-1 ${l.future ? "!text-foreground-subtle" : ""}`}>
              {l.title}
            </h3>
            <p className={`col-start-2 text-[15px] md:col-start-auto ${l.future ? "" : "text-foreground-muted"}`}>{l.body}</p>
            <span className={`col-start-2 font-mono text-xs uppercase tracking-[0.08em] md:col-start-auto md:text-right ${l.future ? "" : "text-primary"}`}>
              {l.status}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Doors({ c }: { c: HomeContent }) {
  return (
    <section id="join" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="shell grid gap-8">
        <Reveal className="grid gap-3">
          <Eyebrow>{c.doors.eyebrow}</Eyebrow>
          <h2 className={h2}>{c.doors.title}</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {c.doors.items.map((d) => (
            <Link
              key={d.kicker}
              href={d.href}
              className="group grid content-start gap-3 rounded-xl border border-border bg-background-elevated p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-foreground-subtle">{d.kicker}</span>
              <h3 className="text-xl font-semibold leading-tight">{d.title}</h3>
              <p className="text-[15px] text-foreground-muted">{d.body}</p>
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                {d.cta} <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ news + events */

function News({ c, locale }: { c: HomeContent; locale: string }) {
  const posts = getPostsMeta(locale);
  const next = upcomingEvents()[0];
  const big = next ? null : posts[0];
  const small = next ? posts.slice(0, 2) : posts.slice(1, 3);
  return (
    <section id="news" className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="shell grid gap-9">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="grid gap-3">
            <Eyebrow>{c.news.eyebrow}</Eyebrow>
            <h2 className={h2}>{c.news.title}</h2>
          </Reveal>
          <div className="flex gap-2.5">
            <Link href="/blog" className={btnSecondary}>
              {c.news.allPosts}
            </Link>
            <Link href="/events" className={btnSecondary}>
              {c.news.allEvents}
            </Link>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[7fr_5fr]">
          {next ? (
            <article className="sig-band grid content-between gap-10 rounded-2xl p-8 text-ink-band-fg sm:p-10">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-gok-200">
                <CalendarDays size={14} aria-hidden /> {c.news.upcoming}
              </span>
              <div className="grid gap-3">
                <span className="font-mono text-sm text-gok-200">
                  {formatDate(next.date, locale)} · {pickL(next.place, locale)}
                </span>
                <h3 className="text-3xl font-semibold leading-tight text-ink-band-fg sm:text-4xl">{pickL(next.title, locale)}</h3>
                {next.url && (
                  <a href={next.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-gok-200 hover:text-white">
                    {c.news.read} <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
              </div>
            </article>
          ) : (
            big && (
              <Link
                href={{ pathname: "/blog/[slug]", params: { slug: big.slug } }}
                className="sig-band group grid content-between gap-10 rounded-2xl p-8 text-ink-band-fg sm:p-10"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gok-200">
                  {c.news.latest} · {big.tag}
                </span>
                <div className="grid gap-3">
                  <span className="font-mono text-sm text-gok-200">{formatDate(big.date, locale)}</span>
                  <h3 className="text-3xl font-semibold leading-tight text-ink-band-fg sm:text-4xl">{big.title}</h3>
                  <p className="max-w-[56ch] text-ink-band-muted">{big.description}</p>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-gok-200 group-hover:text-white">
                    {c.news.read} <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          )}
          <div className="grid gap-5">
            {small.map((p) => (
              <Link
                key={p.slug}
                href={{ pathname: "/blog/[slug]", params: { slug: p.slug } }}
                className="group grid content-start gap-2.5 rounded-2xl border border-border bg-background-elevated p-6 transition-colors hover:border-primary"
              >
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-foreground-subtle">
                  {formatDate(p.date, locale)} · {p.tag}
                </span>
                <h3 className="text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="line-clamp-2 text-[15px] text-foreground-muted">{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {c.news.read} <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ governance */

function Governance({ c, locale }: { c: HomeContent; locale: string }) {
  return (
    <section id="governance" className="shell grid scroll-mt-24 gap-12 py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-14">
        <Reveal className="grid gap-4">
          <Eyebrow>{c.gov.eyebrow}</Eyebrow>
          <h2 className={`${h2} max-w-[20ch]`}>{c.gov.title}</h2>
          <p className="max-w-[60ch] text-lg leading-relaxed text-foreground-muted">{c.gov.lead}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`${arfUrl(locale)}trust-framework`} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              {c.gov.arf} <ArrowUpRight size={16} aria-hidden />
            </a>
            <Link href={{ pathname: "/blog/[slug]", params: { slug: "why-no-blockchain-yet" } }} className={btnSecondary}>
              {c.gov.blog} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
        <div className="rounded-2xl border border-border bg-background-elevated p-3 sm:p-4">
          <RolesDiagram l={c.gov.roles} />
        </div>
      </div>
      <ol className="relative m-0 grid list-none gap-0 p-0 md:grid-cols-3">
        <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-border-strong md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
        {c.gov.steps.map((s, i) => (
          <li key={s.when} className="relative grid content-start gap-2.5 pb-9 pl-10 md:pb-0 md:pl-0 md:pr-8 md:pt-10">
            <span
              aria-hidden
              className={`absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border-2 ${
                i === 0 ? "border-primary bg-primary" : "border-border-strong bg-background"
              }`}
            >
              {i === 0 && <span className="home-live h-2 w-2 rounded-full bg-primary-contrast" />}
            </span>
            <span className={`font-mono text-xs uppercase tracking-[0.12em] ${i === 0 ? "text-primary" : "text-foreground-subtle"}`}>{s.when}</span>
            <h3 className="text-2xl font-semibold leading-tight">{s.title}</h3>
            <p className="text-[15px] leading-relaxed text-foreground-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------ developers */

async function Developers({ c, locale }: { c: HomeContent; locale: string }) {
  return (
    <section id="developers" className="scroll-mt-24 bg-ink-band py-20 text-ink-band-fg sm:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14">
        <Reveal className="grid content-start gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-gok-300">{c.dev.eyebrow}</span>
          <h2 className={`${h2} text-ink-band-fg`}>{c.dev.title}</h2>
          <p className="text-lg leading-relaxed text-ink-band-muted">{c.dev.lead}</p>
          <CodeWindow code={INSTALL_CMD} lang="sh" filename="terminal" numbers={false} dark copyLabel={c.dev.copy} copiedLabel={c.dev.copied} />
          <p className="-mt-2 text-sm leading-relaxed text-ink-band-muted">{c.dev.npmNote}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={docsUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-gok-300 px-5 text-[15px] font-semibold text-gok-900 transition-colors hover:bg-gok-200"
            >
              {c.dev.docs} <ArrowUpRight size={16} aria-hidden />
            </a>
            <a
              href={DEV_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-ink-band-line px-5 text-[15px] font-semibold text-ink-band-fg transition-colors hover:border-gok-300"
            >
              {c.dev.github} <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </Reveal>
        <CodeWindow code={devCode(locale)} lang="ts" filename="verify.ts" dark copyLabel={c.dev.copy} copiedLabel={c.dev.copied} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ EU */

function Europe({ c }: { c: HomeContent }) {
  return (
    <section className="shell grid gap-8 py-20 sm:py-28">
      <Reveal className="grid gap-3">
        <Eyebrow>{c.eu.eyebrow}</Eyebrow>
        <h2 className={`${h2} max-w-[22ch]`}>{c.eu.title}</h2>
      </Reveal>
      <div className="overflow-x-auto rounded-2xl border border-border bg-background-elevated">
        <table className="w-full min-w-[40rem] border-collapse text-[15px]">
          <thead>
            <tr className="bg-surface">
              {c.eu.head.map((hd, i) => (
                <th
                  key={hd}
                  className={`border-b border-border px-5 py-3.5 text-left font-mono text-xs font-medium uppercase tracking-[0.08em] ${
                    i === 1 ? "text-primary" : "text-foreground-subtle"
                  }`}
                >
                  {hd}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.eu.rows.map((r, i) => (
              <tr key={r.eu} className="transition-colors hover:bg-surface/50">
                <td className={`px-5 py-4 align-top ${i < c.eu.rows.length - 1 ? "border-b border-border" : ""}`}>{r.eu}</td>
                <td className={`px-5 py-4 align-top font-semibold ${i < c.eu.rows.length - 1 ? "border-b border-border" : ""}`}>
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {r.tamga}
                  </span>
                </td>
                <td className={`px-5 py-4 align-top text-foreground-muted ${i < c.eu.rows.length - 1 ? "border-b border-border" : ""}`}>{r.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

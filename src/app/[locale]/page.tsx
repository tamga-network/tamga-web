import { Fragment } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Fingerprint,
  Boxes,
  Building2,
  Network,
  Layers,
  Lock,
  FileCheck2,
  Globe2,
  GraduationCap,
  HeartPulse,
  Truck,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { LogoMark, AnimatedTamgaGlyph } from "@/components/logo";
import { ThreadsLazy as Threads } from "@/components/threads-lazy";
import { FloatingLinesLazy as FloatingLines } from "@/components/floating-lines-lazy";
import { Credentials } from "@/components/credentials";
import { DisclosureCard } from "@/components/disclosure-card";
import { PlatformDiagram } from "@/components/platform-diagram";
import { SignInSection } from "@/components/sign-in-tamga";
import { Reveal } from "@/components/reveal";
import { Button, Card, SectionHeading } from "@/components/ui";
import { getHomeContent, type HomeContent } from "@/content/home";
import { EcosystemTable } from "@/components/ecosystem-table";
import type { Locale } from "@/i18n/routing";

const NET: Record<Locale, { eyebrow: string; title: string; lead: string }> = {
  en: {
    eyebrow: "Ecosystem",
    title: "The network's public addresses",
    lead: "Everything the network publishes and runs, in one place. Lists and catalogues are open to everyone; services speak open standards.",
  },
  tr: {
    eyebrow: "Ekosistem",
    title: "Ağın herkese açık adresleri",
    lead: "Ağın yayınladığı ve çalıştırdığı her şey tek yerde. Listeler ve kataloglar herkese açık; servisler açık standartlarla konuşur.",
  },
  tk: {
    eyebrow: "Ekoulgam",
    title: "Toruň açyk salgylary",
    lead: "Toruň çap edýän we işledýän ähli zady bir ýerde. Sanawlar we kataloglar hemmelere açyk; hyzmatlar açyk standartlar bilen gürleşýär.",
  },
};

/** Ağın alt alan adları (üst menüdeki "Tüm adresler" buraya gelir). */
function NetworkAddresses({ locale }: { locale: string }) {
  const l: Locale = locale === "tr" || locale === "tk" ? locale : "en";
  return (
    <section id="ecosystem" className="border-y border-border bg-background-elevated/40">
      <div className="shell scroll-mt-20 py-20 sm:py-24">
        <SectionHeading eyebrow={NET[l].eyebrow} title={NET[l].title} description={NET[l].lead} />
        <EcosystemTable locale={l} />
      </div>
    </section>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getHomeContent(locale);

  return (
    <>
      <Hero c={c} />
      <Problem c={c} />
      <WhatWeAre c={c} />
      <PlatformDiagram locale={locale} />
      <NameOrigin c={c} />
      <Europe c={c} />
      <TurkicWorld c={c} />
      <HowItWorks c={c} locale={locale} />
      <Credentials locale={locale} />
      <SignInSection locale={locale} />
      <Ecosystem c={c} />
      <NetworkAddresses locale={locale} />
      <Today c={c} />
      <Positioning c={c} />
      <CTA c={c} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ c }: { c: HomeContent }) {
  const chips = c.hero.trustLine.split(" · ");
  return (
    <section className="relative overflow-hidden border-b border-border bg-tamga-grain">
      {/* Animated woven "trust fabric" (WebGL, motion-safe) */}
      <Threads
        color={[0.78, 0.63, 0.3]}
        amplitude={1.1}
        distance={0.15}
        className="opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_45%,#000,transparent)]"
      />

      {/* Depth: dotted grid, faded outward from center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(60%_55%_at_50%_38%,#000,transparent)]"
      />

      <div className="shell relative py-24 text-center sm:py-28 md:py-32">
        <Reveal>
          <div className="mb-6 flex items-center justify-center gap-2">
            <LogoMark size={16} />
            <p className="eyebrow" lang="en">
              {c.hero.eyebrow}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[4.25rem]">
            {c.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {c.hero.lead}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="/issuers"
              className="shadow-sm hover:shadow-soft"
            >
              {c.hero.ctaDemo} <ArrowRight size={16} />
            </Button>
            <Button href="/manifesto" variant="outline">
              {c.hero.ctaManifesto}
            </Button>
            <Button href="/whitepaper" variant="outline">
              {c.hero.ctaWhitepaper}
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <ul
            className="mt-10 flex flex-wrap justify-center gap-2"
            lang="en"
          >
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-foreground-subtle"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Problem                                                                   */
/* -------------------------------------------------------------------------- */

function Problem({ c }: { c: HomeContent }) {
  const icons = [Boxes, Network, FileCheck2];
  return (
    <section className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow={c.problem.eyebrow}
          title={c.problem.title}
          description={c.problem.description}
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {c.problem.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={item.title} delay={i * 0.08}>
              <Card className="h-full">
                <Icon className="text-primary" size={24} />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {item.body}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-xl border border-border bg-surface/40 p-6 md:p-8">
          <p className="text-lg leading-relaxed text-foreground">
            {c.problem.callout}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  What we are                                                               */
/* -------------------------------------------------------------------------- */

function WhatWeAre({ c }: { c: HomeContent }) {
  const icons = [Fingerprint, Layers, ShieldCheck, Lock];
  return (
    <section className="border-y border-border bg-background-elevated/40">
      <div className="shell py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={c.whatWeAre.eyebrow}
            title={c.whatWeAre.title}
            description={c.whatWeAre.description}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {c.whatWeAre.principles.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className="flex h-full gap-4">
                  <Icon className="mt-1 shrink-0 text-gold" size={22} />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      {p.body}
                    </p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Name origin                                                               */
/* -------------------------------------------------------------------------- */

function NameOrigin({ c }: { c: HomeContent }) {
  return (
    <section className="shell py-20 sm:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div>
            <p className="eyebrow mb-3">{c.nameOrigin.eyebrow}</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {c.nameOrigin.title}
            </h2>
            <div className="prose mt-6">{c.nameOrigin.body}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex items-center justify-center py-6">
            <AnimatedTamgaGlyph className="w-[300px] sm:w-[380px] lg:w-[460px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Europe / eIDAS                                                            */
/* -------------------------------------------------------------------------- */

function Europe({ c }: { c: HomeContent }) {
  return (
    <section className="border-y border-border bg-background-elevated/40">
      <div className="shell py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow={c.europe.eyebrow}
              title={c.europe.title}
              description={c.europe.description}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="prose">{c.europe.body}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Turkic world                                                              */
/* -------------------------------------------------------------------------- */

function TurkicWorld({ c }: { c: HomeContent }) {
  return (
    <section className="shell py-20 sm:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div>
            <p className="eyebrow mb-3">{c.turkicWorld.eyebrow}</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {c.turkicWorld.title}
            </h2>
            <div className="prose mt-6">{c.turkicWorld.body}</div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            {c.turkicWorld.stats.map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong"
              >
                <p className="font-serif text-3xl font-semibold text-primary">
                  {s.k}
                </p>
                <p className="mt-2 text-sm leading-snug text-foreground-muted">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

function HowItWorks({ c, locale }: { c: HomeContent; locale: string }) {
  return (
    <section className="border-y border-border bg-background-elevated/40">
      <div className="shell py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={c.howItWorks.eyebrow}
            title={c.howItWorks.title}
            description={c.howItWorks.description}
          />
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
          {c.howItWorks.roles.map((r, i) => {
            const Icon = [Building2, Wallet, ShieldCheck][i] ?? Building2;
            const last = i === c.howItWorks.roles.length - 1;
            return (
              <Fragment key={r.role}>
                <Reveal delay={i * 0.1} className="flex-1">
                  <div className="group h-full rounded-xl border border-border bg-surface/50 p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-soft">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary">
                        <Icon size={19} />
                      </span>
                      <span className="mono-label">{r.label}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                      {r.role}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
                {!last && (
                  <div
                    aria-hidden
                    className="flex shrink-0 items-center justify-center text-primary/50"
                  >
                    <ArrowRight size={22} className="hidden md:block" />
                    <ArrowDown size={20} className="md:hidden" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mono-label mt-10">{c.howItWorks.codeLabel}</p>
          <div className="mt-4">
            <DisclosureCard locale={locale} />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-center text-lg text-foreground">
            {c.howItWorks.result}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem                                                                 */
/* -------------------------------------------------------------------------- */

function Ecosystem({ c }: { c: HomeContent }) {
  const icons = [GraduationCap, HeartPulse, Truck, Wallet];
  return (
    <section id="sectors" className="shell scroll-mt-20 py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow={c.ecosystem.eyebrow}
          title={c.ecosystem.title}
          description={c.ecosystem.description}
        />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-12 flex items-start gap-4 rounded-xl border border-primary/30 bg-primary/[0.06] p-6 transition-colors hover:border-primary/50">
          <Fingerprint className="mt-1 shrink-0 text-primary" size={26} />
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {c.ecosystem.tamgaIdTitle}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
              {c.ecosystem.tamgaIdBody}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.ecosystem.verticals.map((v, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={v.name} delay={i * 0.06}>
              <Card className="h-full">
                <Icon className="text-gold" size={22} />
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {v.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {v.body}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Today — pilot — later                                                     */
/* -------------------------------------------------------------------------- */

function Today({ c }: { c: HomeContent }) {
  return (
    <section id="status" className="shell scroll-mt-20 py-20 sm:py-24">
      <Reveal>
        <SectionHeading
          eyebrow={c.today.eyebrow}
          title={c.today.title}
          description={c.today.description}
        />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {c.today.columns.map((col, i) => (
          <Reveal key={col.label} delay={i * 0.06}>
            <Card className={i === 0 ? "h-full border-primary/40" : "h-full"}>
              <p className={i === 0 ? "mono-label text-primary" : "mono-label"}>
                {col.label}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted"
                  >
                    <CheckCircle2
                      className={i === 0 ? "mt-0.5 shrink-0 text-primary" : "mt-0.5 shrink-0 text-foreground-subtle"}
                      size={16}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {c.today.note}
        </p>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Positioning                                                               */
/* -------------------------------------------------------------------------- */

function Positioning({ c }: { c: HomeContent }) {
  const icons = [Layers, Building2, ShieldCheck, Lock, Network];
  return (
    <section className="border-y border-border bg-background-elevated/40">
      <div className="shell py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-4">
              <Globe2 className="text-accent" size={28} />
              <h2 className="text-3xl font-semibold">{c.positioning.title}</h2>
              <p className="text-lg leading-relaxed text-foreground-muted">
                {c.positioning.lead}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-4">
              {c.positioning.rows.map((row, i) => {
                const Icon = icons[i] ?? Layers;
                return (
                  <div
                    key={row.k}
                    className="flex gap-4 rounded-xl border border-border bg-surface/40 p-5 transition-colors hover:border-border-strong"
                  >
                    <Icon className="mt-0.5 shrink-0 text-accent" size={20} />
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {row.k}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                        {row.v}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

function CTA({ c }: { c: HomeContent }) {
  return (
    <section className="shell py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Animated floating gradient lines (WebGL, transparent → shows on
              both themes; motion-safe) */}
          <FloatingLines
            className="z-0 opacity-90"
            linesGradient={["#B01E22", "#C8A24C", "#2A6F8E"]}
            animationSpeed={1}
            lineCount={[5]}
          />
          <div className="relative z-10 px-8 py-16 text-center sm:px-16">
            <p className="eyebrow mb-4">{c.cta.eyebrow}</p>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
              {c.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-foreground-muted">
              {c.cta.description}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/docs">
                {c.cta.ctaDocs} <ArrowRight size={16} />
              </Button>
              <Button href="/whitepaper" variant="outline">
                {c.cta.ctaWhitepaper}
              </Button>
              <Button href="/manifesto" variant="outline">
                {c.cta.ctaManifesto}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

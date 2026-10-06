import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Noto_Sans_Old_Turkic } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/reveal";
import { WalletMock, FlowStrip } from "@/components/scenario-visuals";
import { LetterGlitch } from "@/components/letter-glitch";
import {
  getScenariosContent,
  type Vertical,
  type VerticalTone,
  type StepStatus,
  type ScenariosContent,
} from "@/content/scenarios";
import type { Locale } from "@/i18n/routing";

// Old Turkic (Orkhon) runiform script — used as the glitch backdrop on the hero.
const orkhon = Noto_Sans_Old_Turkic({ weight: "400", display: "swap", preload: false });
const ORKHON_CHARS = Array.from({ length: 0x10c49 - 0x10c00 }, (_, i) =>
  String.fromCodePoint(0x10c00 + i),
).join("");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getScenariosContent(locale);
  return pageMeta(locale, "/scenarios", { title: c.meta.title, description: c.meta.description });
}

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getScenariosContent(locale);

  return (
    <>
      <ScenariosHero c={c} />

      {/* jump chips */}
      <div className="border-b border-border bg-background-elevated/40">
        <div className="shell flex flex-wrap gap-2 py-4">
          {c.verticals.map((v) => (
            <a
              key={v.id}
              href={`#${v.id}`}
              className="rounded-md border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {v.name}
            </a>
          ))}
        </div>
      </div>

      {c.verticals.map((v, i) => (
        <VerticalSection
          key={v.id}
          v={v}
          labels={c.statusLabels}
          flip={i % 2 === 1}
          last={i === c.verticals.length - 1}
        />
      ))}

      <p className="shell pb-16 pt-4 text-center font-mono text-xs text-foreground-subtle">
        {c.note}
      </p>
    </>
  );
}

function ScenariosHero({ c }: { c: ScenariosContent }) {
  return (
    <section className={`relative overflow-hidden border-b border-border bg-[#0b0b0c] ${orkhon.className}`}>
      {/* glitching Old Turkic (Orkhon) script backdrop (canvas, dark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_105%_at_50%_0%,#000_35%,transparent_82%)]"
      >
        <LetterGlitch
          glitchColors={["#1E5A78", "#C8A24C", "#6FB3D2"]}
          characters={ORKHON_CHARS}
          fontFamily={orkhon.style.fontFamily}
        />
      </div>
      {/* readability scrim */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0b0b0c]/45" />

      <div className="shell relative z-10 py-16 sm:py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-gold-bright">
          {c.eyebrow}
        </p>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold !text-white sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          {c.intro}
        </p>
      </div>
    </section>
  );
}

// Durum etiketlerinin rengi: ana senaryo ve bugün çalışan Gök, karar aşaması altın, vizyon/araştırma nötr.
const TONE: Record<VerticalTone, string> = {
  main: "border-primary bg-primary text-primary-contrast",
  today: "border-primary/50 bg-primary/10 text-primary",
  proposed: "border-gold-bright/60 bg-gold-bright/10 text-gold",
  vision: "border-border-strong bg-surface text-foreground-muted",
  research: "border-border-strong bg-surface text-foreground-muted",
};
const STEP: Record<StepStatus, string> = {
  today: "border-primary/40 text-primary",
  pilot: "border-gold-bright/60 text-gold",
  later: "border-border-strong text-foreground-subtle",
};

function VerticalSection({
  v,
  labels,
  flip,
  last,
}: {
  v: Vertical;
  labels: Record<StepStatus, string>;
  flip: boolean;
  last: boolean;
}) {
  return (
    <section
      id={v.id}
      className={`scroll-mt-20 ${flip ? "bg-background-elevated/40" : ""} ${
        last ? "" : "border-b border-border"
      }`}
    >
      <div className="shell py-16 sm:py-20">
        {/* heading */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{v.name}</h2>
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wide ${TONE[v.tone]}`}
            >
              {v.badge}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {v.intro}
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* scenarios */}
          <div className={`space-y-4 ${flip ? "lg:order-2" : ""}`}>
            {v.scenarios.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="rounded-xl border border-border bg-surface/50 p-5 transition-colors hover:border-border-strong">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] text-primary">
                      {i + 1}
                    </span>
                    <div>
                      {s.status && (
                        <span
                          className={`mb-1.5 inline-block rounded-full border px-2 py-px font-mono text-[0.65rem] uppercase tracking-wide ${STEP[s.status]}`}
                        >
                          {labels[s.status]}
                        </span>
                      )}
                      <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            {v.callout && (
              <Reveal delay={v.scenarios.length * 0.06}>
                <aside className="rounded-r-xl border border-border border-l-[3px] border-l-primary bg-primary/5 p-5">
                  <h3 className="text-base font-semibold text-foreground">{v.callout.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{v.callout.body}</p>
                </aside>
              </Reveal>
            )}
          </div>

          {/* visuals: wallet mockup + role flow */}
          <div className={`space-y-6 ${flip ? "lg:order-1" : ""}`}>
            <Reveal delay={0.08}>
              <WalletMock data={v.wallet} />
            </Reveal>
            <Reveal delay={0.12}>
              <FlowStrip nodes={v.flow} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

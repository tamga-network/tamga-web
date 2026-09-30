import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import {
  BadgeCheck,
  Bluetooth,
  Briefcase,
  Building2,
  CircleCheck,
  CircleDashed,
  Cpu,
  EyeOff,
  Flag,
  FlaskConical,
  Globe2,
  GraduationCap,
  IdCard,
  KeyRound,
  ListChecks,
  Loader,
  Network,
  Package,
  Plug,
  ShieldCheck,
  Smartphone,
  Ticket,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/ui";
import {
  getRoadmapContent,
  type RoadmapIcon,
  type RoadmapState,
} from "@/content/roadmap";

const ICONS: Record<RoadmapIcon, LucideIcon> = {
  shield: ShieldCheck,
  wallet: Smartphone,
  list: ListChecks,
  id: IdCard,
  ticket: Ticket,
  building: Building2,
  package: Package,
  smartphone: Smartphone,
  cpu: Cpu,
  key: KeyRound,
  plug: Plug,
  bluetooth: Bluetooth,
  globe: Globe2,
  graduation: GraduationCap,
  network: Network,
  flag: Flag,
  eye: EyeOff,
  user: UserRound,
  briefcase: Briefcase,
  test: BadgeCheck,
};

/** Durum: renk + simge + metin (renk tek başına anlam taşımaz) */
const STATE: Record<
  RoadmapState,
  { cls: string; icon: LucideIcon; ring: string }
> = {
  done: {
    cls: "border-accent/50 bg-accent/10 text-accent",
    icon: CircleCheck,
    ring: "border-accent/40",
  },
  progress: {
    cls: "border-gold-bright/60 bg-gold-bright/10 text-gold-bright",
    icon: Loader,
    ring: "border-gold-bright/50",
  },
  planned: {
    cls: "border-border-strong bg-surface text-foreground-muted",
    icon: CircleDashed,
    ring: "border-border",
  },
  research: {
    cls: "border-border bg-surface/50 text-foreground-subtle",
    icon: FlaskConical,
    ring: "border-border",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getRoadmapContent(locale);
  return pageMeta(locale, "/roadmap", { title: meta.title, description: meta.description });
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getRoadmapContent(locale);

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />

      {/* Aşama özeti */}
      <section className="shell pt-12">
        <ol className="grid gap-3 sm:grid-cols-5">
          {c.phases.map((p) => {
            const S = STATE[p.state];
            return (
              <li key={p.n}>
                <a
                  href={`#phase-${p.n}`}
                  className={`flex h-full flex-col gap-1 rounded-lg border p-3 transition-colors hover:bg-surface ${S.ring}`}
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-foreground-subtle">
                    {c.phaseLabel} {p.n}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {p.title}
                  </span>
                  <span
                    className={`mt-auto inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[0.7rem] ${S.cls}`}
                  >
                    <S.icon size={12} aria-hidden /> {c.labels[p.state]}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="shell space-y-16 py-14 sm:py-16">
        {c.phases.map((p) => {
          const S = STATE[p.state];
          return (
            <div key={p.n} id={`phase-${p.n}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    {c.phaseLabel} {p.n}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-foreground-muted">{p.summary}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${S.cls}`}
                >
                  <S.icon size={14} aria-hidden /> {c.labels[p.state]}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.cards.map((card) => {
                  const I = ICONS[card.icon];
                  return (
                    <div
                      key={card.title}
                      className={`flex gap-4 rounded-xl border bg-surface/40 p-5 ${p.state === "done" ? "border-accent/25" : "border-border"}`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${S.cls}`}
                        aria-hidden
                      >
                        <I size={19} />
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <p className="text-sm text-foreground-subtle">{c.note}</p>
      </section>
    </>
  );
}

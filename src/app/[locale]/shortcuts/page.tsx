import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import {
  CircleCheck,
  CircleDot,
  CircleDashed,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import {
  SHORTCUTS,
  SHORTCUTS_PAGE,
  type Shortcut,
  type ShortcutState,
} from "@/content/shortcuts";

/** Durum: renk + simge + metin (renk tek başına anlam taşımaz) */
const STATE: Record<ShortcutState, { cls: string; icon: LucideIcon }> = {
  open: {
    cls: "border-gold-bright/60 bg-gold-bright/10 text-gold-bright",
    icon: CircleDot,
  },
  narrowed: {
    cls: "border-accent/50 bg-accent/10 text-accent",
    icon: CircleDashed,
  },
  closed: {
    cls: "border-border bg-surface text-foreground-subtle",
    icon: CircleCheck,
  },
};

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const p = SHORTCUTS_PAGE[loc(locale)];
  return pageMeta(locale, "/shortcuts", { title: p.title, description: p.description });
}

function Row({ s, l }: { s: Shortcut; l: Locale }) {
  const p = SHORTCUTS_PAGE[l];
  const S = STATE[s.state];
  return (
    <li className="grid gap-3 border-b border-border px-4 py-4 last:border-b-0 md:grid-cols-[7rem_1.3fr_1fr_1.2fr] md:gap-6">
      <div className="flex items-center gap-2 md:flex-col md:items-start">
        <span className="font-mono text-sm font-semibold text-foreground">
          {s.id}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.7rem] ${S.cls}`}
        >
          <S.icon size={12} aria-hidden /> {p.labels[s.state]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{s.what[l]}</p>
      <p className="text-sm leading-relaxed text-foreground-muted">
        <span className="mono-label mb-1 block text-foreground-subtle md:hidden">
          {s.state === "closed" ? p.closedCols.date : p.cols.why}
        </span>
        {s.why ? s.why[l] : (s.date ?? "—")}
      </p>
      <p className="text-sm leading-relaxed text-foreground-muted">
        <span className="mono-label mb-1 block text-foreground-subtle md:hidden">
          {s.state === "closed" ? p.closedCols.done : p.cols.closing}
        </span>
        {s.closing[l]}
      </p>
    </li>
  );
}

export default async function ShortcutsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const p = SHORTCUTS_PAGE[l];
  const open = SHORTCUTS.filter((s) => s.state !== "closed");
  const closed = SHORTCUTS.filter((s) => s.state === "closed");

  const Table = ({
    items,
    closedHead = false,
  }: {
    items: Shortcut[];
    closedHead?: boolean;
  }) => (
    <div className="overflow-hidden rounded-xl border border-border bg-surface/40">
      <div className="hidden grid-cols-[7rem_1.3fr_1fr_1.2fr] gap-6 border-b border-border px-4 py-2 md:grid">
        <span />
        <span className="mono-label">{p.cols.what}</span>
        <span className="mono-label">
          {closedHead ? p.closedCols.date : p.cols.why}
        </span>
        <span className="mono-label">
          {closedHead ? p.closedCols.done : p.cols.closing}
        </span>
      </div>
      <ul>
        {items.map((s) => (
          <Row key={s.id} s={s} l={l} />
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.lead} />
      <section className="shell space-y-12 py-14 sm:py-16">
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            {p.hOpen}{" "}
            <span className="font-mono text-base text-foreground-subtle">
              ({open.length})
            </span>
          </h2>
          <Table items={open} />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            {p.hClosed}{" "}
            <span className="font-mono text-base text-foreground-subtle">
              ({closed.length})
            </span>
          </h2>
          <Table items={closed} closedHead />
        </div>
        <p className="text-sm text-foreground-subtle">{p.note}</p>
      </section>
    </>
  );
}

import { Fragment } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

/* Presentational, theme-aware diagram components for the docs prose.
   Each root carries `not-prose` so the prose styles don't touch it. */

/** A short chain of blocks, linked by hash (prev == previous block's hash). */
export function ChainBlocks({ blockLabel = "Block" }: { blockLabel?: string }) {
  const blocks = [
    { n: "100", prev: "genesis", hash: "…a2" },
    { n: "101", prev: "…a2", hash: "…c7" },
    { n: "102", prev: "…c7", hash: "…e1" },
  ];
  return (
    <div className="not-prose my-6 flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
      {blocks.map((b, i) => (
        <Fragment key={b.n}>
          <div className="flex-1 rounded-lg border border-border bg-surface/50 p-3.5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
              {blockLabel} {b.n}
            </p>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="flex justify-between gap-2">
                <span className="text-foreground-subtle">prev</span>
                <span className="text-accent">{b.prev}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-foreground-subtle">data</span>
                <span className="text-foreground-muted">…</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-foreground-subtle">hash</span>
                <span className="text-gold">{b.hash}</span>
              </div>
            </div>
          </div>
          {i < blocks.length - 1 && (
            <div aria-hidden className="flex shrink-0 items-center justify-center text-primary/50">
              <ArrowRight size={16} className="hidden sm:block" />
              <ArrowDown size={14} className="sm:hidden" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

type Panel = { title: string; items: string[]; tone?: "accent" | "gold" };

/** Two side-by-side panels — e.g. on-chain vs off-chain. */
export function SplitPanel({ left, right }: { left: Panel; right: Panel }) {
  const color = (t?: "accent" | "gold") =>
    t === "gold" ? "var(--gold)" : "var(--accent)";
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {[left, right].map((p, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-surface/50 p-4"
          style={{ borderTop: `2px solid ${color(p.tone)}` }}
        >
          <p
            className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.08em]"
            style={{ color: color(p.tone) }}
          >
            {p.title}
          </p>
          <ul className="space-y-1.5">
            {p.items.map((it) => (
              <li key={it} className="flex gap-2 text-sm leading-snug text-foreground-muted">
                <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type EventRow = { k: string; v: string; tone?: "accent" };

/** A credential-card style event card (e.g. a verifiable delivery event). */
export function EventCard({
  title,
  badge,
  rows,
  footer,
}: {
  title: string;
  badge: string;
  rows: EventRow[];
  footer?: string;
}) {
  return (
    <div className="not-prose my-6 w-full overflow-hidden rounded-xl border border-border-strong bg-background-elevated shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground-subtle">
          {title}
        </span>
        <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gold">
          {badge}
        </span>
      </div>
      <div className="space-y-2 px-5 py-4 font-mono text-[12px] leading-relaxed">
        {rows.map((r) => (
          <div key={r.k} className="flex justify-between gap-4">
            <span className="text-foreground-subtle">{r.k}</span>
            <span className={`truncate ${r.tone === "accent" ? "text-accent" : "text-foreground"}`} lang="en">
              {r.v}
            </span>
          </div>
        ))}
      </div>
      {footer && (
        <div className="border-t border-border px-5 py-2.5 font-mono text-[11px] text-foreground-subtle">
          {footer}
        </div>
      )}
    </div>
  );
}

type KeyApp = { path: string; out: string };

/** A hierarchical key-derivation tree: one seed → an unlinkable key per app. */
export function KeyTree({ root, apps, note }: { root: string; apps: KeyApp[]; note: string }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-border bg-surface/40 p-4 sm:p-5">
      <div className="mx-auto w-fit rounded-md border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-foreground">
        {root}
      </div>
      <div aria-hidden className="flex justify-center py-1 text-primary/50">
        <ArrowDown size={16} />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {apps.map((a) => (
          <div key={a.path} className="rounded-md border border-border bg-background px-3 py-2.5 text-center">
            <p className="font-mono text-[10px] text-foreground-subtle" lang="en">{a.path}</p>
            <p className="mt-1 font-mono text-[11px] text-accent" lang="en">{a.out}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs leading-snug text-foreground-muted">{note}</p>
    </div>
  );
}

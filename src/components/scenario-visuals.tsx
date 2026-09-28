import { Fragment } from "react";
import { ArrowRight, ArrowDown, Check, Lock } from "lucide-react";

export type WalletRow = { k: string; v: string; tone?: "disclosed" | "hidden" | "accent" };
export type WalletMockData = {
  app: string;
  cardLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  rows: WalletRow[];
  action: string;
  status: string;
};

/** A stylized TamgaID app / wallet screen — a usage mockup, theme-aware. */
export function WalletMock({ data }: { data: WalletMockData }) {
  return (
    <div className="mx-auto w-full max-w-[310px] rounded-[1.9rem] border border-border-strong bg-background-elevated p-2.5 shadow-soft">
      <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface/50">
        {/* status bar */}
        <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
            {data.app}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>

        {/* the credential / action card */}
        <div className="mx-3 rounded-xl border border-border bg-background px-4 py-3.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
              {data.cardLabel}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-gold">
              {data.badge}
            </span>
          </div>
          <h4 className="mt-2 font-serif text-base font-semibold leading-tight text-foreground">
            {data.title}
          </h4>
          <p className="mt-0.5 truncate font-mono text-[11px] text-accent" lang="en">
            {data.subtitle}
          </p>

          <div className="mt-3 space-y-1.5">
            {data.rows.map((row) => (
              <div key={row.k} className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-foreground-subtle">{row.k}</span>
                {row.tone === "disclosed" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-gold">
                    <Check size={10} /> {row.v}
                  </span>
                ) : row.tone === "hidden" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-foreground-subtle">
                    <Lock size={9} /> {row.v}
                  </span>
                ) : (
                  <span
                    className={`truncate font-mono text-[11px] ${
                      row.tone === "accent" ? "text-accent" : "text-foreground"
                    }`}
                    lang="en"
                  >
                    {row.v}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* faux primary action */}
        <div className="px-3 pb-4 pt-3">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-contrast">
            {data.action}
          </div>
          <p className="mt-2 text-center font-mono text-[10px] text-foreground-subtle">
            {data.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export type FlowNode = { label: string; sub: string; icon?: string };

/** A compact Issuer → Holder → Verifier style role flow (text nodes, no icons). */
export function FlowStrip({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {nodes.map((n, i) => {
        const last = i === nodes.length - 1;
        return (
          <Fragment key={n.label + i}>
            <div className="flex-1 rounded-lg border border-border bg-surface/50 px-3 py-3 text-center">
              <p className="text-xs font-semibold text-foreground">{n.label}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-foreground-subtle">{n.sub}</p>
            </div>
            {!last && (
              <div aria-hidden className="flex shrink-0 items-center justify-center text-primary/50">
                <ArrowRight size={16} className="hidden sm:block" />
                <ArrowDown size={14} className="sm:hidden" />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { getAdjacent, getDocsUi } from "@/lib/docs-nav";
import { CopyButton } from "./code-tools";

export async function DocArticle({
  href,
  eyebrow,
  title,
  intro,
  children,
}: {
  href: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  const locale = await getLocale();
  const { prev, next } = getAdjacent(href, locale);
  const ui = getDocsUi(locale);

  return (
    <article>
      <header className="border-b border-border pb-8">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-balance text-4xl font-semibold leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
          {intro}
        </p>
      </header>

      <div className="prose mt-10">{children}</div>

      {(prev || next) && (
        <nav className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-border-strong"
            >
              <span className="mono-label flex items-center gap-1">
                <ArrowLeft size={13} /> {ui.prev}
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={next.href}
              className="group flex flex-col rounded-lg border border-border p-4 text-right transition-colors hover:border-border-strong"
            >
              <span className="mono-label flex items-center justify-end gap-1">
                {ui.next} <ArrowRight size={13} />
              </span>
              <span className="mt-1 font-medium text-foreground group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}

/** Callout box used within docs prose. */
export function Callout({
  title,
  children,
  tone = "primary",
}: {
  title?: string;
  children: ReactNode;
  tone?: "primary" | "gold" | "accent";
}) {
  const border = {
    primary: "border-l-primary",
    gold: "border-l-gold-bright",
    accent: "border-l-accent",
  }[tone];
  return (
    <div
      className={`not-prose my-6 rounded-r-lg border border-border border-l-[3px] ${border} bg-surface/50 p-5`}
    >
      {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
      <div className="text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}

/** Monospace code / diagram block. */
export function CodeBlock({ label, code, copy = false }: { label?: string; code: string; copy?: boolean | [string, string] }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      {(label || copy) && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
          <span className="mono-label">{label}</span>
          {copy && <CopyButton text={code} {...(Array.isArray(copy) ? { label: copy[0], done: copy[1] } : {})} />}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground-muted">
        {code}
      </pre>
    </div>
  );
}

/** Durum hapı — renk tek başına anlam taşımasın diye simge + metin birlikte. */
export type Fit = "same" | "bridge" | "planned" | "differs";
const FIT_STYLE: Record<Fit, { mark: string; cls: string }> = {
  same: { mark: "●", cls: "border-accent/40 text-accent" },
  bridge: { mark: "◐", cls: "border-gold-bright/50 text-gold-bright" },
  planned: { mark: "○", cls: "border-border-strong text-foreground-subtle" },
  differs: { mark: "◆", cls: "border-primary/40 text-primary" },
};
export function FitPill({ fit, label }: { fit: Fit; label: string }) {
  const s = FIT_STYLE[fit];
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}
    >
      <span aria-hidden>{s.mark}</span>
      {label}
    </span>
  );
}

/** Karşılaştırma tablosu — dar ekranda kendi kabında yatay kayar (sayfa kaymaz). */
export function CompareTable({
  label,
  head,
  rows,
}: {
  label?: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/40">
      {label && (
        <div className="border-b border-border px-4 py-2">
          <span className="mono-label">{label}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground-subtle"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0 align-top">
                {r.map((c, j) => (
                  <td
                    key={j}
                    className={`px-4 py-2.5 leading-relaxed ${j === 0 ? "font-medium text-foreground" : "text-foreground-muted"}`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

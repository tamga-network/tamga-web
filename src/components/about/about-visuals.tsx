/*
 * Hakkında sayfasının görsel panelleri (2026-11-18 yeniden tasarım).
 * Ad için mühür izi, konumlanma için katman kesiti. Renkler yalnız globals.css tokenlarından; metinler content/about.tsx (4 dil).
 */
import { AnimatedLogoMark } from "@/components/logo";
import type { AboutVisuals } from "@/content/about";

/* -------------------------------------------------------------------------- */
/*  Ad: mühür izi + üç anlam                                                    */
/* -------------------------------------------------------------------------- */

export function NameSeal({ labels }: { labels: AboutVisuals["seal"] }) {
  const pos = ["top-[10%]", "top-[44%]", "top-[78%]"];
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[30rem]">
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="170" cy="200" r="150" fill="none" stroke="var(--dg-line)" strokeWidth="1.5" />
        <circle cx="170" cy="200" r="132" fill="none" stroke="var(--dg-line)" strokeWidth="1" strokeDasharray="2 6" />
        {[60, 200, 340].map((y) => (
          <path
            key={y}
            d={`M 300 200 C 330 200, 330 ${y}, 360 ${y}`}
            fill="none"
            stroke="var(--dg-line-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
        ))}
        <circle cx="300" cy="200" r="4" fill="var(--gold-bright)" />
      </svg>
      <div className="absolute left-[34%] top-1/2 -translate-x-1/2 -translate-y-1/2">
        <AnimatedLogoMark size={150} />
      </div>
      {labels.map((l, i) => (
        <span
          key={l}
          className={`absolute right-0 whitespace-nowrap sm:left-[72%] sm:right-auto ${pos[i]} rounded-full border border-border-strong bg-background-elevated px-3 py-1 font-mono text-xs text-foreground shadow-sm`}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Konumlanma: katman kesiti (üstte cüzdanlar, tabanda AB uyumu)              */
/* -------------------------------------------------------------------------- */

export function LayerSection({ rows, label }: { rows: { k: string; v: string }[]; label: string }) {
  const tint = ["8%", "14%", "22%"]; // taban en koyu
  return (
    <ol className="overflow-hidden rounded-2xl border border-border-strong">
      {rows
        .map((row, i) => ({ row, n: i + 1 }))
        .reverse()
        .map(({ row, n }) => (
          <li
            key={row.k}
            className={`grid gap-3 px-5 py-6 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-10 ${n === 1 ? "border-b-4 border-b-primary" : "border-b border-border-strong"}`}
            style={{ background: `color-mix(in oklab, var(--primary) ${tint[n - 1]}, var(--background-elevated))` }}
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                {label} {n}
              </p>
              <h3 className="mt-2 text-balance text-lg font-semibold leading-snug text-foreground">{row.k}</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground-muted">{row.v}</p>
          </li>
        ))}
    </ol>
  );
}

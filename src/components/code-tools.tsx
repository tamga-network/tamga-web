"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Kopyala düğmesi — pano izni yoksa sessizce geçer (kod bloğu yine seçilebilir). */
export function CopyButton({ text, label = "Copy", done = "Copied" }: { text: string; label?: string; done?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => {
            setOk(true);
            setTimeout(() => setOk(false), 1600);
          })
          .catch(() => {});
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[11px] text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      aria-label={ok ? done : label}
    >
      {ok ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      {ok ? done : label}
    </button>
  );
}

/** Sekmeli kod: her sekme bir dosya ya da bir kurulum komutu; etkin sekmenin kopyala düğmesi. */
export function CodeTabs({
  tabs,
  copyLabel,
  copiedLabel,
}: {
  tabs: { label: string; code: string }[];
  copyLabel?: string;
  copiedLabel?: string;
}) {
  const [i, setI] = useState(0);
  const cur = tabs[i] ?? tabs[0];
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
        <div role="tablist" className="flex flex-wrap gap-1">
          {tabs.map((t, n) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                n === i ? "bg-primary/10 text-primary" : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={cur.code} label={copyLabel} done={copiedLabel} />
      </div>
      <pre className="max-h-[32rem] overflow-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground-muted">
        {cur.code}
      </pre>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Panoya kopyalar; pano izni yoksa gizli bir metin alanıyla eski yolu dener. */
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CodeCopy({ text, label, done, dark = false }: { text: string; label: string; done: string; dark?: boolean }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(text)) {
          setOk(true);
          setTimeout(() => setOk(false), 1600);
        }
      }}
      aria-label={ok ? done : label}
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 font-mono text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        dark
          ? "border-[#2a3846] text-[#9fb0bd] hover:border-[#4e93b2] hover:text-white"
          : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground dark:border-[#2a3846] dark:text-[#9fb0bd] dark:hover:text-white"
      }`}
    >
      {ok ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      <span className="hidden sm:inline">{ok ? done : label}</span>
    </button>
  );
}

export function CodeTabsClient({
  tabs,
  copyLabel,
  copiedLabel,
  numbers,
  frameClass,
  barClass,
}: {
  tabs: { label: string; code: string; html: string }[];
  copyLabel: string;
  copiedLabel: string;
  numbers: boolean;
  frameClass: string;
  barClass: string;
}) {
  const [i, setI] = useState(0);
  const cur = tabs[i] ?? tabs[0];
  return (
    <figure className={frameClass} data-numbers={String(numbers)}>
      <figcaption className={barClass}>
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <div role="tablist" className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
          {tabs.map((t, n) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`shrink-0 rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                n === i
                  ? "bg-primary/12 text-primary"
                  : "text-foreground-muted hover:text-foreground dark:text-[#9fb0bd] dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CodeCopy text={cur.code} label={copyLabel} done={copiedLabel} />
      </figcaption>
      <div
        role="tabpanel"
        className="max-h-[32rem] overflow-auto font-mono text-[13px] leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: cur.html }}
      />
    </figure>
  );
}

import { codeToHtml } from "shiki";
import { CodeCopy, CodeTabsClient } from "./code-window-client";

/*
 * Kod penceresi (2026-10-02): macOS tarzı pencere — üç nokta, dosya adı sekmesi, satır numaraları, sözdizimi renkleri
 * (shiki, sunucuda; açık ve koyu tema birlikte üretilir, CSS seçer), kopyala düğmesi, yatay kaydırma.
 * `dark` verilirse tema ne olursa olsun koyu pencere (koyu bantların içinde).
 */

export type CodeLang = "ts" | "tsx" | "js" | "sh" | "bash" | "json" | "html" | "text" | "http" | "yaml";

const THEMES = { light: "github-light", dark: "github-dark-dimmed" } as const;

export async function highlight(code: string, lang: CodeLang = "ts"): Promise<string> {
  return codeToHtml(code.replace(/\s+$/, ""), {
    lang: lang === "text" ? "text" : lang,
    themes: THEMES,
    defaultColor: false,
  });
}

function Dots() {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </span>
  );
}

const frame = (dark: boolean) =>
  `code-window not-prose overflow-hidden rounded-xl border shadow-[0_18px_50px_-24px_rgba(13,41,56,0.45)] ${
    dark
      ? "cw-dark border-[#22313d] bg-[#0f171e] text-[#d5dde3]"
      : "border-border bg-background-elevated text-foreground dark:border-[#22313d] dark:bg-[#0f171e]"
  }`;
const bar = (dark: boolean) =>
  `flex items-center gap-4 border-b px-4 py-2.5 ${
    dark ? "border-[#22313d] bg-[#131d25]" : "border-border bg-surface dark:border-[#22313d] dark:bg-[#131d25]"
  }`;

export async function CodeWindow({
  code,
  lang = "ts",
  filename,
  numbers = true,
  dark = false,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className = "",
}: {
  code: string;
  lang?: CodeLang;
  filename?: string;
  numbers?: boolean;
  dark?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const html = await highlight(code, lang);
  return (
    <figure className={`${frame(dark)} ${className}`} data-numbers={String(numbers)}>
      <figcaption className={bar(dark)}>
        <Dots />
        <span className="min-w-0 flex-1 truncate font-mono text-xs opacity-80">{filename ?? lang}</span>
        <CodeCopy text={code} label={copyLabel} done={copiedLabel} dark={dark} />
      </figcaption>
      <div className="font-mono text-[13px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}

/** Sekmeli kod penceresi: her sekme bir dosya ya da komut. Renklendirme sunucuda, sekme seçimi istemcide. */
export async function CodeWindowTabs({
  tabs,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  numbers = true,
}: {
  tabs: { label: string; code: string; lang?: CodeLang }[];
  copyLabel?: string;
  copiedLabel?: string;
  numbers?: boolean;
}) {
  const rendered = await Promise.all(
    tabs.map(async (t) => ({ label: t.label, code: t.code, html: await highlight(t.code, t.lang ?? guess(t.label, t.code)) })),
  );
  return (
    <CodeTabsClient
      tabs={rendered}
      copyLabel={copyLabel}
      copiedLabel={copiedLabel}
      numbers={numbers}
      frameClass={`${frame(false)} my-6`}
      barClass={bar(false)}
    />
  );
}

/** Sekme adından dil tahmini (README'deki gibi: .ts, .tsx, .html, komut). */
function guess(label: string, code: string): CodeLang {
  if (/\.tsx$/.test(label)) return "tsx";
  if (/\.(ts|mts)$/.test(label)) return "ts";
  if (/\.(js|mjs)$/.test(label)) return "js";
  if (/\.html$/.test(label)) return "html";
  if (/\.json$/.test(label)) return "json";
  if (/^\s*(npm|npx|curl|git)\s/.test(code)) return "sh";
  return "ts";
}

export function WindowDots() {
  return <Dots />;
}

import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { ECOSYSTEM_GROUPS, SUBDOMAINS, type Subdomain } from "@/lib/ecosystem";

const HEAD: Record<Locale, [string, string, string]> = {
  en: ["Address", "What it does", "Standard"],
  tr: ["Adres", "Ne yapar", "Standart"],
  tk: ["Salgy", "Näme edýär", "Standart"],
};

/** Ağın herkese açık adresleri, gruplu tablo. Dar ekranda satırlar kart gibi alt alta akar. */
export function EcosystemTable({
  locale,
  groups = ["learn", "trust", "services"],
}: {
  locale: Locale;
  groups?: Subdomain["group"][];
}) {
  const [hAddr, hWhat, hStd] = HEAD[locale];
  return (
    <div className="not-prose my-8 overflow-hidden rounded-lg border border-border bg-surface/60">
      <div className="hidden grid-cols-[15rem_1fr_11rem] gap-5 border-b border-border px-4 py-2 sm:grid">
        <span className="mono-label">{hAddr}</span>
        <span className="mono-label">{hWhat}</span>
        <span className="mono-label">{hStd}</span>
      </div>
      {groups.map((g) => (
        <div key={g}>
          <div className="border-b border-border bg-background/40 px-4 py-1.5">
            <span className="mono-label text-gold-bright">
              {ECOSYSTEM_GROUPS[g][locale]}
            </span>
          </div>
          <div role="list" className="divide-y divide-border">
            {SUBDOMAINS.filter((s) => s.group === g).map((s) => (
              <div
                role="listitem"
                key={s.host}
                className="grid gap-1 px-4 py-3 sm:grid-cols-[15rem_1fr_11rem] sm:gap-5"
              >
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 self-start font-mono text-[0.8rem] text-foreground no-underline hover:text-primary"
                >
                  {s.host}
                  <ArrowUpRight
                    size={13}
                    className="opacity-50 group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
                <span className="text-sm leading-relaxed text-foreground-muted">
                  <b className="font-medium text-foreground">
                    {s.name[locale]}
                  </b>{" "}
                  — {s.desc[locale]}
                </span>
                <span className="font-mono text-[0.75rem] text-foreground-subtle">
                  {s.std ?? "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

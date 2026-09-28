"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Map each app locale to an ISO country flag (flag-icons).
const FLAG: Record<string, string> = {
  en: "gb",
  tr: "tr",
  tk: "tm",
};

function Flag({ locale, className = "" }: { locale: string; className?: string }) {
  return (
    <span
      className={`fi fi-${FLAG[locale]} rounded-[3px] ${className}`}
      style={{ width: "1.3em", height: "1em" }}
      aria-hidden="true"
    />
  );
}

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("langSwitcher");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchTo(next: string) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      // Keep the current path (with its params), change only the locale.
      router.replace(
        // @ts-expect-error -- next-intl's params typing is loose for dynamic routes
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Flag locale={locale} />
        <span className="font-mono text-xs uppercase tracking-wide">{locale}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-background-elevated py-1 shadow-soft"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => switchTo(l)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-foreground-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <Flag locale={l} />
                  <span className="flex-1 text-left">{t(l)}</span>
                  {active && <Check size={15} className="text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

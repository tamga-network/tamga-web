"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const FLAG: Record<string, string> = { en: "gb", tr: "tr", tk: "tm" };

function Flag({ locale }: { locale: string }) {
  return (
    <span
      className={`fi fi-${FLAG[locale]} rounded-[3px]`}
      style={{ width: "1.35em", height: "1em" }}
      aria-hidden="true"
    />
  );
}

/** Full-width, colored language dropdown for the mobile menu panel. */
export function MobileLocale() {
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
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- next-intl's params typing is loose for dynamic routes
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex w-full items-center gap-2.5 rounded-md border border-border px-3 py-2.5 text-sm text-foreground"
      >
        <Flag locale={locale} />
        <span>{t(locale)}</span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`ml-auto text-foreground-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className="absolute inset-x-0 bottom-full z-10 mb-2 overflow-hidden rounded-md border border-border bg-background shadow-soft"
          role="listbox"
        >
          {routing.locales
            .filter((l) => l !== locale)
            .map((l) => (
              <li key={l} role="option">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => switchTo(l)}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-foreground hover:bg-surface disabled:opacity-50"
                >
                  <Flag locale={l} />
                  <span>{t(l)}</span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

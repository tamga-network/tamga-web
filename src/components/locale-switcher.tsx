"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Flag } from "./flag";

/**
 * Dil seçici (masaüstü): tek bir dil simgesi; açılınca diller alt alta — bayrak + dilin kendi adı, seçili olan işaretli.
 * Liste routing.locales'ten kurulur: yeni Türk dilleri eklendiğinde düzen değişmez.
 * Klavye: Enter/Boşluk açar, ↑/↓ gezer, Esc ve dışarı tıklama kapatır.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("langSwitcher");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    // Açılınca seçili dile odaklan
    const i = routing.locales.indexOf(
      locale as (typeof routing.locales)[number],
    );
    itemRefs.current[Math.max(0, i)]?.focus();
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, locale]);

  function switchTo(next: string) {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      // Aynı sayfada kal, yalnız dili değiştir.
      router.replace(
        // @ts-expect-error -- next-intl's params typing is loose for dynamic routes
        { pathname, params },
        { locale: next },
      );
    });
  }

  function onListKey(e: React.KeyboardEvent, i: number) {
    const n = routing.locales.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[(i + 1) % n]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemRefs.current[(i - 1 + n) % n]?.focus();
    }
  }

  const current = `${t("label")}: ${t(locale)}`;
  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="locale-menu"
        aria-label={current}
        title={current}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Languages size={17} aria-hidden />
      </button>

      {open && (
        <ul
          id="locale-menu"
          aria-label={t("menuLabel")}
          className="locale-menu absolute right-0 z-50 mt-2 min-w-48 rounded-lg border border-border bg-background-elevated p-1.5 shadow-soft"
        >
          {routing.locales.map((l, i) => {
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  type="button"
                  lang={l}
                  disabled={isPending}
                  onClick={() => switchTo(l)}
                  onKeyDown={(e) => onListKey(e, i)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50 ${
                    active
                      ? "bg-surface text-foreground"
                      : "text-foreground-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <Flag locale={l} />
                  <span className="flex-1">{t(l)}</span>
                  {active && (
                    <Check size={15} aria-hidden className="text-primary" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

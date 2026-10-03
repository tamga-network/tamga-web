"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Flag } from "./flag";

/**
 * Telefon menüsünde dil seçimi: tek satır ("Dil · Türkçe"); dokununca diller alt alta açılır — bayrak + dilin kendi adı.
 * Liste routing.locales'ten kurulur: yeni Türk dilleri eklendiğinde düzen değişmez.
 */
export function MobileLocale() {
  const locale = useLocale();
  const t = useTranslations("langSwitcher");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

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
    <div className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-locale-list"
        className="flex h-11 w-full items-center gap-3 px-3 text-left text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Languages size={17} aria-hidden className="text-foreground-muted" />
        <span className="flex-1">{t("label")}</span>
        <span className="flex items-center gap-2 text-foreground-muted">
          <Flag locale={locale} />
          {t(locale)}
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`text-foreground-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          id="mobile-locale-list"
          aria-label={t("menuLabel")}
          className="border-t border-border p-1.5"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <li key={l}>
                <button
                  type="button"
                  lang={l}
                  disabled={isPending}
                  onClick={() => switchTo(l)}
                  aria-current={active ? "true" : undefined}
                  className={`flex h-11 w-full items-center gap-3 rounded-md px-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary disabled:opacity-50 ${
                    active
                      ? "bg-surface text-foreground"
                      : "text-foreground-muted active:bg-surface"
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

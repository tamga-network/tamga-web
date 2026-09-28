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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
    <div ref={ref} className="sm-locale">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="sm-locale-btn"
      >
        <Flag locale={locale} />
        <span>{t(locale)}</span>
        <ChevronDown size={16} className="sm-locale-chev" />
      </button>

      {open && (
        <ul className="sm-locale-menu" role="listbox">
          {routing.locales
            .filter((l) => l !== locale)
            .map((l) => (
              <li key={l} role="option">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => switchTo(l)}
                  className="sm-locale-opt"
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

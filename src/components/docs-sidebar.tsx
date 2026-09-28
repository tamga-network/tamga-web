"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { getDocDoors, getDocsNav } from "@/lib/docs-nav";
import { ArrowUpRight } from "lucide-react";

export function DocsSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const nav = getDocsNav(locale);
  const doors = getDocDoors(locale).filter((d) => d.external);
  const more = { en: "More documentation", tr: "Diğer belgeler", tk: "Başga resminamalar" }[locale] ?? "More documentation";

  return (
    <nav className="space-y-7">
      {nav.map((section) => (
        <div key={section.title}>
          <p className="mono-label mb-3">{section.title}</p>
          <ul className="space-y-1 border-l border-border">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                      active
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-foreground-muted hover:border-border-strong hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div>
        <p className="mono-label mb-3">{more}</p>
        <ul className="space-y-1 border-l border-border">
          {doors.map((d) => (
            <li key={d.key}>
              <a
                href={d.external}
                className="-ml-px flex items-center gap-1 border-l-2 border-transparent py-1.5 pl-4 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                {d.title}
                <ArrowUpRight size={13} aria-hidden className="text-foreground-subtle" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

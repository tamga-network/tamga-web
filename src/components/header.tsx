"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  triggerCls,
} from "./shadcn/navigation-menu";
import type { Locale } from "@/i18n/routing";
import { arfUrl } from "@/lib/docs-nav";
import { ECOSYSTEM_GROUPS, type Subdomain } from "@/lib/ecosystem";
import {
  DEVELOPERS,
  ECOSYSTEM_MENU,
  HOST_ICON,
  MENU_LABELS,
  PROJECT,
  TONE_CLS,
  type NavItem,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Menü kutucuğu: renkli simge + başlık + kısa açıklama. İç bağlantı ya da yeni sekmede dış bağlantı. */
export function MenuTile({
  item,
  locale,
  compact = false,
}: {
  item: NavItem;
  locale: Locale;
  compact?: boolean;
}) {
  const external = item.arf ? arfUrl(locale) : item.external;
  const body = (
    <>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg ring-1",
          compact ? "h-8 w-8" : "h-9 w-9",
          TONE_CLS[item.tone],
        )}
        aria-hidden
      >
        <item.icon size={compact ? 16 : 18} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
          {item.title[locale]}
          {external && (
            <ArrowUpRight size={12} aria-hidden className="opacity-50" />
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-foreground-muted">
          {item.desc[locale]}
        </span>
      </span>
    </>
  );
  const cls =
    "flex items-start gap-3 rounded-lg p-2.5 outline-none transition-colors hover:bg-surface focus-visible:bg-surface";
  return (
    <NavigationMenuLink asChild>
      {external ? (
        <a
          href={external}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {body}
        </a>
      ) : (
        <Link href={item.href!} className={cls}>
          {body}
        </Link>
      )}
    </NavigationMenuLink>
  );
}

function EcosystemPanel({ locale }: { locale: Locale }) {
  const groups: Subdomain["group"][] = ["trust", "services"];
  return (
    <div className="w-[min(40rem,90vw)]">
      <div className="grid grid-cols-2 gap-x-4">
        {groups.map((g) => (
          <div key={g}>
            <p className="mono-label px-2.5 pb-1 pt-1 text-foreground-subtle">
              {ECOSYSTEM_GROUPS[g][locale]}
            </p>
            {ECOSYSTEM_MENU.filter((s) => s.group === g).map((s) => {
              const ic = HOST_ICON[s.host];
              return (
                <MenuTile
                  key={s.host}
                  compact
                  locale={locale}
                  item={{
                    title: s.name,
                    desc: { en: s.host, tr: s.host, tk: s.host },
                    icon: ic.icon,
                    tone: ic.tone,
                    external: s.url,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-border px-2.5 pt-2.5">
        <NavigationMenuLink asChild>
          <Link
            href={{ pathname: "/", hash: "ecosystem" }}
            className="text-xs text-foreground-muted hover:text-foreground"
          >
            {MENU_LABELS[locale].all} →
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const L = MENU_LABELS[locale];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const docsActive = pathname.startsWith("/docs");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className={cn(triggerCls, docsActive && "text-foreground")}
                >
                  {L.docs}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem value="dev">
              <NavigationMenuTrigger>{L.developers}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(34rem,90vw)] grid-cols-2 gap-1">
                  {DEVELOPERS.map((d) => (
                    <MenuTile key={d.title.en} item={d} locale={locale} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="eco">
              <NavigationMenuTrigger>{L.ecosystem}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <EcosystemPanel locale={locale} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem value="project">
              <NavigationMenuTrigger>{L.project}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(44rem,90vw)] grid-cols-2 gap-1 lg:grid-cols-3">
                  {PROJECT.filter((p) => p.href !== "/issuers").map((p) => (
                    <MenuTile key={p.title.en} item={p} locale={locale} />
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href="/issuers"
            className="hidden whitespace-nowrap rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong lg:inline-flex"
          >
            {t("joinIssuer")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

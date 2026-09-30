"use client";

import { Link, type Href } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { StaggeredMenu } from "./staggered-menu";
import { SOCIALS } from "./social-icons";
import type { Locale } from "@/i18n/routing";
import { ECOSYSTEM_GROUPS, SUBDOMAINS, type Subdomain } from "@/lib/ecosystem";

/** Üst düzey bağlantılar */
const TOP = [
  { href: "/manifesto", key: "manifesto" },
  { href: "/whitepaper", key: "whitepaper" },
  { href: "/docs", key: "docs" },
] as const;

/** "Proje" menüsü */
const PROJECT = [
  { href: "/scenarios", key: "scenarios" },
  { href: "/roadmap", key: "roadmap" },
  { href: "/changelog", key: "changelog" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
] as const;

const linkCls = (active: boolean) =>
  `relative rounded-md px-3 py-2 text-sm transition-colors after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 ${
    active
      ? "text-foreground after:scale-x-100 after:bg-gold-bright"
      : "text-foreground-muted hover:text-foreground"
  }`;

/** Açılır menü: fareyle ya da tıklamayla açılır; Esc ve dışarı tıklama kapatır; klavyeyle erişilebilir. */
function Dropdown({
  label,
  active,
  wide = false,
  children,
}: {
  label: string;
  active: boolean;
  wide?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        if (timer.current) clearTimeout(timer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => setOpen(false), 120);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`${linkCls(active)} inline-flex items-center gap-1`}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
          <div
            className={`rounded-lg border border-border bg-background/95 p-2 shadow-soft backdrop-blur-md ${
              wide ? "w-[40rem]" : "w-56"
            }`}
          >
            {children(close)}
          </div>
        </div>
      )}
    </div>
  );
}

function EcosystemMenu({
  locale,
  close,
  allLabel,
}: {
  locale: Locale;
  close: () => void;
  allLabel: string;
}) {
  const groups: Subdomain["group"][] = ["learn", "trust", "services"];
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {groups.map((g) => (
          <div key={g}>
            <p className="mono-label px-2 pb-1 pt-1.5 text-gold-bright">
              {ECOSYSTEM_GROUPS[g][locale]}
            </p>
            <ul>
              {SUBDOMAINS.filter((s) => s.group === g).map((s) => (
                <li key={s.host}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="group block rounded-md px-2 py-1.5 transition-colors hover:bg-surface"
                  >
                    <span className="flex items-center gap-1 text-sm text-foreground">
                      {s.name[locale]}
                      <ArrowUpRight
                        size={12}
                        aria-hidden
                        className="opacity-40 group-hover:opacity-100"
                      />
                    </span>
                    <span className="block font-mono text-[0.7rem] text-foreground-subtle">
                      {s.host}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-1 border-t border-border px-2 pt-2">
        <Link
          href={{ pathname: "/about", hash: "ecosystem" }}
          onClick={close}
          className="text-xs text-foreground-muted hover:text-foreground"
        >
          {allLabel} →
        </Link>
      </div>
    </>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Telefon menüsü: düz liste (kurum başvurusu en başta)
  const items = [
    { href: "/issuers" as Href, label: t("joinIssuer") },
    ...TOP.map((n) => ({ href: n.href as Href, label: t(n.key) })),
    ...PROJECT.map((n) => ({ href: n.href as Href, label: t(n.key) })),
    {
      href: { pathname: "/about", hash: "ecosystem" } as Href,
      label: t("ecosystem"),
    },
  ];

  return (
    <>
      {/* Desktop header */}
      <header
        className={`sticky top-0 z-50 hidden border-b transition-colors duration-300 md:block ${
          scrolled
            ? "border-border bg-background/80 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="flex items-center gap-0.5">
            {TOP.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkCls(isActive(item.href))}
              >
                {t(item.key)}
              </Link>
            ))}
            <Dropdown label={t("ecosystem")} active={false} wide>
              {(close) => (
                <EcosystemMenu
                  locale={locale}
                  close={close}
                  allLabel={t("allAddresses")}
                />
              )}
            </Dropdown>
            <Dropdown
              label={t("project")}
              active={PROJECT.some((p) => isActive(p.href))}
            >
              {(close) => (
                <ul>
                  {PROJECT.map((p) => (
                    <li key={p.href}>
                      <Link
                        href={p.href}
                        onClick={close}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface ${
                          isActive(p.href)
                            ? "text-foreground"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        {t(p.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Dropdown>
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
            <Link
              href="/issuers"
              className="ml-1 hidden whitespace-nowrap rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong lg:inline-flex"
            >
              {t("joinIssuer")}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile: staggered overlay menu takes over the top bar */}
      <div className="md:hidden">
        <StaggeredMenu items={items} socialItems={SOCIALS} />
      </div>
    </>
  );
}

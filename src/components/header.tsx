"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { StaggeredMenu } from "./staggered-menu";
import { SOCIALS } from "./social-icons";

const NAV = [
  { href: "/manifesto", key: "manifesto" },
  { href: "/scenarios", key: "scenarios" },
  { href: "/whitepaper", key: "whitepaper" },
  { href: "/docs", key: "docs" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
] as const;

export function Header() {
  const t = useTranslations("nav");
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

  const items = NAV.map((n) => ({ href: n.href, label: t(n.key) }));

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
        <div className="shell flex h-16 items-center justify-between">
          <Logo />

          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive(item.href)
                    ? "text-foreground after:scale-x-100 after:bg-gold-bright"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle />
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

"use client";

/*
 * Üst bant: geniş açılır menüler (Ağ · Kurallar · Yönetişim · Geliştiriciler · Hakkında) + düz Blog bağlantısı; sağda dil,
 * tema ve "Ağa katıl". Her panel bandın tam
 * genişliğinde açılır: solda iki başlıklı grup (simge, kalın başlık, tek satır açıklama), sağda öne çıkan kart.
 * Radix NavigationMenu: üzerine gelince ve tıklayınca/Enter ile açılır; Esc, dışarı tıklama ve sayfa değişimi kapatır;
 * aynı anda tek panel açık; aria-expanded/aria-controls Radix'ten.
 */
import { Link, usePathname, type Href } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Logo, LogoMark } from "./logo";
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
} from "./shadcn/navigation-menu";
import type { Locale } from "@/i18n/routing";
import {
  MENU_LABELS,
  MENUS,
  type Featured,
  type Menu,
  type NavItem,
} from "@/lib/nav";
import { opensInPlace, targetOf } from "@/lib/nav-target";
import { cn } from "@/lib/utils";

/** Panel maddesi: çizgi simge, kalın başlık, tek satır açıklama. */
function MenuRow({ item, locale }: { item: NavItem; locale: Locale }) {
  const { external, href } = targetOf(item, locale);
  const body = (
    <>
      <item.icon
        size={20}
        strokeWidth={1.6}
        aria-hidden
        className="mt-0.5 shrink-0 text-foreground-muted transition-colors group-hover/row:text-primary"
      />
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-foreground">
          {item.title[locale]}
          {external && !opensInPlace(external) && (
            <ArrowUpRight size={13} aria-hidden className="opacity-40" />
          )}
        </span>
        <span className="mt-1 block text-sm leading-snug text-foreground-muted">
          {item.desc[locale]}
        </span>
      </span>
    </>
  );
  const cls =
    "group/row -mx-3 flex items-start gap-3.5 rounded-lg px-3 py-3 outline-none transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:ring-2 focus-visible:ring-primary/40";
  return (
    <NavigationMenuLink asChild>
      {external ? (
        <a
          href={external}
          {...(opensInPlace(external)
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className={cls}
        >
          {body}
        </a>
      ) : (
        <Link href={href!} className={cls}>
          {body}
        </Link>
      )}
    </NavigationMenuLink>
  );
}

/** Sağdaki öne çıkan kart. */
function FeaturedCard({ f, locale }: { f: Featured; locale: Locale }) {
  const { external, href } = targetOf(f, locale);
  const visual =
    f.visual === "code" ? (
      <pre className="whitespace-pre-wrap break-words rounded-lg bg-ink-band px-4 py-3 font-mono text-[0.72rem] leading-relaxed text-ink-band-fg">
        <span className="select-none text-ink-band-muted">$ </span>
        {f.code}
      </pre>
    ) : f.visual === "doc" ? (
      <div className="mx-auto flex h-[7.5rem] w-24 flex-col gap-1.5 rounded-md border border-border bg-background p-3 shadow-soft">
        <FileText
          size={18}
          strokeWidth={1.6}
          aria-hidden
          className="text-primary"
        />
        <span className="mt-1 h-1.5 w-full rounded bg-border" />
        <span className="h-1.5 w-4/5 rounded bg-border" />
        <span className="h-1.5 w-full rounded bg-border" />
        <span className="h-1.5 w-3/5 rounded bg-border" />
      </div>
    ) : (
      <div className="relative mx-auto grid h-28 w-28 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/15 blur-xl"
        />
        <span className="relative grid h-24 w-24 place-items-center rounded-full border border-primary/30 bg-background">
          <LogoMark size={48} />
        </span>
      </div>
    );
  const cls =
    "group/feat flex h-full flex-col gap-5 rounded-xl border border-border bg-surface p-6 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40";
  const inner = (
    <>
      <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary">
        {f.eyebrow[locale]}
      </span>
      <div className="flex flex-1 items-center py-1">
        {<div className="w-full">{visual}</div>}
      </div>
      <div>
        <p className="flex items-center gap-2 font-serif text-lg font-semibold tracking-[-0.01em] text-foreground">
          {f.title[locale]}
          <ArrowRight
            size={16}
            aria-hidden
            className="text-primary transition-transform group-hover/feat:translate-x-0.5"
          />
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
          {f.text[locale]}
        </p>
      </div>
    </>
  );
  return (
    <NavigationMenuLink asChild>
      {external ? (
        <a
          href={external}
          {...(opensInPlace(external)
            ? {}
            : { target: "_blank", rel: "noopener noreferrer" })}
          className={cls}
        >
          {inner}
        </a>
      ) : (
        <Link href={href!} className={cls}>
          {inner}
        </Link>
      )}
    </NavigationMenuLink>
  );
}

/** Bandın tam genişliğinde açılan panel. */
function MegaPanel({ menu, locale }: { menu: Menu; locale: Locale }) {
  // İki grup tek ızgarada: aynı sıradaki maddeler iki sütunda aynı satırda durur (satır yüksekliği ikisinin büyüğü).
  const [a, b] = menu.groups;
  const rows = Math.max(a.items.length, b.items.length);
  const label = (g: typeof a) => (
    <p className="mb-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary">
      {g.label[locale]}
    </p>
  );
  const cell = (item: (typeof a.items)[number] | undefined, key: string) => (
    <div key={key} className="flex [&>*]:flex-1">
      {item && <MenuRow item={item} locale={locale} />}
    </div>
  );
  return (
    <div className="shell grid gap-10 py-10 lg:grid-cols-[minmax(0,2fr)_20rem] xl:gap-14">
      <div className="grid grid-cols-2 content-start gap-x-10 gap-y-1 xl:gap-x-14">
        {label(a)}
        {label(b)}
        {Array.from({ length: rows }, (_, i) => [
          cell(a.items[i], `a${i}`),
          cell(b.items[i], `b${i}`),
        ])}
      </div>
      <FeaturedCard f={menu.featured} locale={locale} />
    </div>
  );
}

export function Header() {
  const locale = useLocale() as Locale;
  const L = MENU_LABELS[locale];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Sayfa değişince açık panel kapanır.
  useEffect(() => setOpen(""), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-background/95 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="shell flex h-[4.25rem] items-center justify-between gap-4">
        <Logo />

        <NavigationMenu
          className="hidden xl:flex"
          value={open}
          onValueChange={setOpen}
        >
          <NavigationMenuList>
            {MENUS.map((m) => (
              <NavigationMenuItem key={m.key} value={m.key}>
                <NavigationMenuTrigger>{m.label[locale]}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaPanel menu={m} locale={locale} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 xl:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href="/join"
            className="hidden min-h-10 items-center gap-1.5 whitespace-nowrap rounded-md bg-primary px-4 text-sm font-semibold text-primary-contrast transition-colors hover:bg-primary-strong sm:inline-flex"
          >
            {L.joinCta}
            <ArrowRight size={14} aria-hidden />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

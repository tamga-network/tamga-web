"use client";

/*
 * Telefon menüsü: bütün ekranı kaplayan katman (Radix Dialog; sayfa kaydırması kilitli, güvenli alan payları) + açılır
 * bölümler (Radix Accordion). Odak içeride kalır; Esc, bağlantıya dokunma, sayfa değişimi ve ekran masaüstü genişliğine
 * (xl, 1280 px) çıkınca kendiliğinden kapanır. Bölümler üst menüyle aynı (lib/nav MENUS):
 * her bölümde iki başlıklı grup ve masaüstündeki öne çıkan kartın bağlantısı (son madde); altta Blog ve "Ağa katıl".
 */
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Accordion, Dialog } from "radix-ui";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  MENU_LABELS,
  MENUS,
  TONE_CLS,
  featuredItem,
  type NavItem,
} from "@/lib/nav";
import { opensInPlace, targetOf } from "@/lib/nav-target";
import { cn } from "@/lib/utils";
import { LogoMark } from "./logo";
import { MobileLocale } from "./mobile-locale";
import { ThemeToggle } from "./theme-toggle";
import { SocialLinks } from "./social-icons";

function Row({
  item,
  locale,
  onGo,
}: {
  item: NavItem;
  locale: Locale;
  onGo: () => void;
}) {
  const { external, href } = targetOf(item, locale);
  const inner = (
    <>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1",
          TONE_CLS[item.tone],
        )}
        aria-hidden
      >
        <item.icon size={16} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-[0.95rem] text-foreground">
          {item.title[locale]}
          {external && !opensInPlace(external) && (
            <ArrowUpRight size={12} aria-hidden className="opacity-50" />
          )}
        </span>
        <span className="block truncate text-xs text-foreground-subtle">
          {item.desc[locale]}
        </span>
      </span>
    </>
  );
  const cls =
    "flex items-center gap-3 rounded-lg px-2 py-2.5 active:bg-surface";
  return external ? (
    <a
      href={external}
      {...(opensInPlace(external)
        ? {}
        : { target: "_blank", rel: "noopener noreferrer" })}
      className={cls}
      onClick={onGo}
    >
      {inner}
    </a>
  ) : (
    <Link href={href!} className={cls} onClick={onGo}>
      {inner}
    </Link>
  );
}

function Section({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item value={value} className="border-b border-border">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-lg font-medium text-foreground">
          {title}
          <ChevronDown
            size={18}
            aria-hidden
            className="text-foreground-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden pb-3">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const L = MENU_LABELS[locale];
  const close = () => setOpen(false);
  const pathname = usePathname();

  // Sayfa değişince kapan
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Masaüstü genişliğine (xl = 1280 px, üst menünün göründüğü eşik) çıkınca kapan
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setOpen(false);
    };
    onChange(mq);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground xl:hidden"
        aria-label={t("menu")}
      >
        <Menu size={20} aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay fixed inset-0 z-[60] bg-background" />
        <Dialog.Content className="mobile-nav-panel fixed inset-0 z-[61] flex h-[100dvh] w-full flex-col bg-background pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] outline-none">
          <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-border">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5"
              aria-label="Tamga Network"
            >
              <LogoMark size={28} />
              <span className="font-serif text-lg font-semibold text-foreground">
                Tamga Network
              </span>
            </Link>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
              aria-label="Close"
            >
              <X size={20} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Tamga Network
          </Dialog.Description>

          <div className="shell flex-1 overflow-y-auto overscroll-contain">
            <Accordion.Root type="single" collapsible>
              {MENUS.map((m) => (
                <Section key={m.key} value={m.key} title={m.label[locale]}>
                  {m.groups.map((g) => (
                    <div key={g.label.en} className="pb-2">
                      <p className="px-2 pb-1 pt-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em] text-primary">
                        {g.label[locale]}
                      </p>
                      {g.items.map((item) => (
                        <Row
                          key={item.title.en}
                          item={item}
                          locale={locale}
                          onGo={close}
                        />
                      ))}
                    </div>
                  ))}
                  <div className="border-t border-border/60 pt-1">
                    <Row item={featuredItem(m)} locale={locale} onGo={close} />
                  </div>
                </Section>
              ))}
            </Accordion.Root>
          </div>

          <div className="shell shrink-0 space-y-4 border-t border-border py-4">
            <Link
              href="/join"
              onClick={close}
              className="flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-contrast"
            >
              {L.joinCta}
              <ArrowRight size={14} aria-hidden />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <MobileLocale />
              </div>
              <ThemeToggle />
            </div>
            <SocialLinks size={20} soonLabel={L.soon} label={L.social} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

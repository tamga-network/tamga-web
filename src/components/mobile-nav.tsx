"use client";

/*
 * Telefon menüsü: sağdan açılan panel (Radix Dialog) + açılır bölümler (Radix Accordion). shadcn/ui Sheet + Accordion kalıbı.
 * Odak panel içinde kalır, Esc kapatır; bağlantıya dokununca panel kapanır.
 */
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Accordion, Dialog } from "radix-ui";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { arfUrl } from "@/lib/docs-nav";
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
  const external = item.arf ? arfUrl(locale) : item.external;
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
          {external && (
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
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      onClick={onGo}
    >
      {inner}
    </a>
  ) : (
    <Link href={item.href!} className={cls} onClick={onGo}>
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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
        aria-label={t("menu")}
      >
        <Menu size={20} aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="mobile-nav-overlay fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="mobile-nav-panel fixed inset-y-0 right-0 z-[61] flex w-[min(24rem,100vw)] flex-col border-l border-border bg-background shadow-soft outline-none">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-2.5"
              aria-label="Tamga Network"
            >
              <LogoMark size={28} />
              <span className="font-serif text-lg font-semibold text-foreground">
                Tamga
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

          <div className="flex-1 overflow-y-auto px-4">
            <Link
              href="/docs"
              onClick={close}
              className="flex items-center justify-between border-b border-border py-4 text-lg font-medium text-foreground"
            >
              {L.docs}
            </Link>
            <Accordion.Root type="single" collapsible>
              <Section value="dev" title={L.developers}>
                {DEVELOPERS.map((d) => (
                  <Row key={d.title.en} item={d} locale={locale} onGo={close} />
                ))}
              </Section>
              <Section value="eco" title={L.ecosystem}>
                {ECOSYSTEM_MENU.map((s) => {
                  const ic = HOST_ICON[s.host];
                  return (
                    <Row
                      key={s.host}
                      locale={locale}
                      onGo={close}
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
              </Section>
              <Section value="project" title={L.project}>
                {PROJECT.filter((p) => p.href !== "/issuers").map((p) => (
                  <Row key={p.title.en} item={p} locale={locale} onGo={close} />
                ))}
              </Section>
            </Accordion.Root>
          </div>

          <div className="shrink-0 space-y-4 border-t border-border p-4">
            <Link
              href="/issuers"
              onClick={close}
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-contrast"
            >
              {t("joinIssuer")}
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <MobileLocale />
              </div>
              <ThemeToggle />
            </div>
            <SocialLinks size={18} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

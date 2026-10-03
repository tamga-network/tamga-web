import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { ECOSYSTEM_GROUPS, SUBDOMAINS, type Subdomain } from "@/lib/ecosystem";
import { HOST_ICON } from "@/lib/nav";
import type { Locale } from "@/i18n/routing";

/* Ağ adresleri: bütün alt alan adları, gruplu ve eşit kartlarla. Kaynak lib/ecosystem.ts (alt bilgi ve belge sayfasıyla aynı). */

const C: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    serves: string;
    std: string;
    live: string;
    wallet: string;
  }
> = {
  en: {
    title: "Network addresses",
    description: "Every public address of Tamga Network: documents, rules, trust lists, schemas and reference services.",
    eyebrow: "Network",
    lead: "Every public address of the network on one page. All are live; the lists and schemas are signed and readable by anyone.",
    serves: "For",
    std: "Standard",
    live: "Live",
    wallet: "Tamga Wallet's address; moves to the wallet's own domain.",
  },
  tr: {
    title: "Ağ adresleri",
    description: "Tamga Network'ün herkese açık bütün adresleri: belgeler, kurallar, güven listeleri, şemalar ve referans hizmetler.",
    eyebrow: "Ağ",
    lead: "Ağın herkese açık bütün adresleri tek sayfada. Hepsi yayında; listeler ve şemalar imzalıdır, herkes okuyabilir.",
    serves: "Kimin için",
    std: "Standart",
    live: "Yayında",
    wallet: "Tamga Wallet'ın adresi; cüzdanın kendi alan adına taşınacak.",
  },
  tk: {
    title: "Tor salgylary",
    description: "Tamga Network-yň ähli açyk salgylary: resminamalar, düzgünler, ynam sanawlary, shemalar we salgylanma hyzmatlary.",
    eyebrow: "Tor",
    lead: "Toruň ähli açyk salgylary bir sahypada. Hemmesi işleýär; sanawlar we shemalar gollanan, her kim okap biler.",
    serves: "Kim üçin",
    std: "Standart",
    live: "Işleýär",
    wallet: "Tamga Wallet-iň salgysy; gapjygyň öz domenine geçiriler.",
  },
};

const pick = (raw: string): Locale => (["en", "tr", "tk"].includes(raw) ? (raw as Locale) : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = C[pick(locale)];
  return pageMeta(locale, "/network", { title: c.title, description: c.description });
}

function Card({ d, locale }: { d: Subdomain; locale: Locale }) {
  const c = C[locale];
  const Icon = HOST_ICON[d.host]?.icon;
  return (
    <a
      href={d.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && <Icon size={20} strokeWidth={1.6} aria-hidden className="shrink-0 text-primary" />}
          <span className="truncate font-mono text-sm text-foreground">{d.host}</span>
        </div>
        <ArrowUpRight size={16} aria-hidden className="shrink-0 text-foreground-subtle transition-colors group-hover:text-primary" />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold tracking-[-0.01em] text-foreground">{d.name[locale]}</p>
        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{d.desc[locale]}</p>
      </div>
      <dl className="mt-auto grid gap-1.5 border-t border-border pt-3 text-xs">
        <div className="flex justify-between gap-3">
          <dt className="text-foreground-subtle">{c.serves}</dt>
          <dd className="text-right text-foreground-muted">{d.serves[locale]}</dd>
        </div>
        {d.std && (
          <div className="flex justify-between gap-3">
            <dt className="text-foreground-subtle">{c.std}</dt>
            <dd className="text-right font-mono text-foreground-muted">{d.std}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-foreground-subtle">{c.live}</dt>
          <dd className="inline-flex items-center gap-1.5 text-foreground-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#1f7a4d]" />
            {c.live}
          </dd>
        </div>
        {d.wallet && <dd className="pt-1 text-foreground-subtle">{c.wallet}</dd>}
      </dl>
    </a>
  );
}

export default async function NetworkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = pick(raw);
  const c = C[locale];
  const groups = (["learn", "trust", "services"] as const).map((g) => ({
    key: g,
    label: ECOSYSTEM_GROUPS[g][locale],
    items: SUBDOMAINS.filter((s) => s.group === g),
  }));

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />
      <div className="shell space-y-14 py-14 sm:py-16">
        {groups.map((g) => (
          <section key={g.key} aria-labelledby={`grp-${g.key}`}>
            <h2 id={`grp-${g.key}`} className="mb-5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-primary">
              {g.label}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((d) => (
                <li key={d.host}>
                  <Card d={d} locale={locale} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

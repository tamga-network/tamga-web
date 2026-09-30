import { getLocale, getTranslations } from "next-intl/server";
import { arfUrl } from "@/lib/docs-nav";
import { DEV_LINKS, SUBDOMAINS } from "@/lib/ecosystem";
import type { Locale } from "@/i18n/routing";
import { Link, type Href } from "@/i18n/navigation";
import { LogoMark } from "./logo";
import { SocialLinks } from "./social-icons";

type FItem = {
  /** Literal label (brand / technical terms) — used when `key` is absent. */
  label?: string;
  /** Translation key under the "footer" namespace. */
  key?: string;
  /** Internal (localized) link. */
  href?: Href;
  /** External link. */
  external?: string;
};

/** Alt bilgideki ağ adresleri: kullanıcıya ve kurumlara dönük servisler (docs / ARF Kaynaklar'da; arka uçlar ana sayfa tablosunda). */
const FOOTER_HOSTS = [
  "trust.tamga.network",
  "schemas.tamga.network",
  "verify.tamga.network",
  "console.tamga.network",
  "id.tamga.network",
];

const COLUMNS: { titleKey: string; items: FItem[] }[] = [
  {
    titleKey: "resources",
    items: [
      { key: "devDocs", external: DEV_LINKS.devDocs },
      { label: "Tamga ARF", external: "arf" },
      { key: "sdk", href: "/sdk" },
      { key: "apiRef", external: DEV_LINKS.apiRef },
      { key: "npm", external: DEV_LINKS.npm },
      { label: "GitHub", external: DEV_LINKS.github },
    ],
  },
  {
    titleKey: "ecosystem",
    items: [], // SUBDOMAINS'ten, dilde (aşağıda)
  },
  {
    titleKey: "sectors",
    items: [{ key: "education" }, { key: "health" }, { key: "payments" }, { key: "logistics" }],
  },
  {
    titleKey: "company",
    items: [
      { key: "about", href: "/about" },
      { key: "issuers", href: "/issuers" },
      { key: "roadmap", href: "/roadmap" },
      { key: "changelog", href: "/changelog" },
      { key: "blog", href: "/blog" },
      { key: "brand", href: "/brand" },
      { key: "careers" },
    ],
  },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const label = (item: FItem) => (item.key ? t(item.key) : item.label);
  const loc = (["en", "tr", "tk"].includes(locale) ? locale : "en") as Locale;
  const columns = COLUMNS.map((c) =>
    c.titleKey === "ecosystem"
      ? {
          ...c,
          items: SUBDOMAINS.filter((d) => FOOTER_HOSTS.includes(d.host)).map((d): FItem => ({
            label: d.name[loc],
            external: d.url,
          })),
        }
      : c,
  );

  return (
    <footer className="mt-24 border-t border-border">
      <div className="shell flex flex-col gap-12 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="font-serif text-lg font-semibold text-foreground">
              Tamga Network
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">
            {t("tagline")}
          </p>
          <p className="mono-label mt-6" lang="en">
            {t("slogan")}
          </p>
          <div className="mt-6">
            <p className="mono-label mb-2">{t("contact")}</p>
            <a
              href="mailto:info@tamga.network"
              className="link-underline text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              info@tamga.network
            </a>
          </div>
          <SocialLinks size={19} className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 md:gap-x-14 lg:gap-x-20">
          {columns.map((col) => (
            <div key={col.titleKey}>
            <h4 className="mono-label mb-4">{t(col.titleKey)}</h4>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item.key ?? item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {label(item)}
                    </Link>
                  ) : item.external ? (
                    <a
                      href={item.external === "arf" ? arfUrl(locale) : item.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {label(item)}
                    </a>
                  ) : (
                    <span
                      className="cursor-default text-sm text-foreground-subtle"
                      title="Soon"
                    >
                      {label(item)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-2 py-6 text-xs text-foreground-subtle md:flex-row">
          <span>
            © {new Date().getFullYear()} Tamga Network. {t("rights")}
          </span>
          <span className="font-mono tracking-wide">tamga.network</span>
        </div>
      </div>
    </footer>
  );
}

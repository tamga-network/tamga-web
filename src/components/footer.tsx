import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { MENUS, type Menu, type NavItem } from "@/lib/nav";
import { opensInPlace, targetOf } from "@/lib/nav-target";
import { LogoMark } from "./logo";
import { SocialLinks } from "./social-icons";

/*
 * Alt bilgi (özgün düzen): marka bloğu + dört sütun. Sütun başlıkları ve maddeleri üst menüden alınır (aynı ad, aynı hedef):
 * Ağ · Kurallar · Geliştiriciler · Hakkında. Yönetişim alt bilgide yok.
 */
const FOOTER: { menu: string; items: string[] }[] = [
  {
    menu: "network",
    items: [
      "Learn",
      "Scenarios",
      "Network addresses",
      "Roadmap",
      "Release notes",
    ],
  },
  {
    menu: "rules",
    items: [
      "Tamga ARF",
      "Trust Framework",
      "Tamga Rulebook",
      "Education Rulebook",
      "Identity Rulebook",
    ],
  },
  {
    menu: "dev",
    items: ["Docs", "Get started", "Sandbox", "Packages", "API reference", "GitHub"],
  },
  { menu: "about", items: ["About", "Partners", "Events", "Blog", "Contact"] },
];

function footerColumns(): { title: Menu["label"]; items: NavItem[] }[] {
  return FOOTER.map(({ menu, items }) => {
    const m = MENUS.find((x) => x.key === menu);
    if (!m) throw new Error(`footer: menü yok: ${menu}`);
    const all = [...m.groups[0].items, ...m.groups[1].items];
    return {
      title: m.label,
      items: items.map((en) => {
        const it = all.find((x) => x.title.en === en);
        if (!it) throw new Error(`footer: madde yok: ${menu} / ${en}`);
        return it;
      }),
    };
  });
}

const linkCls =
  "link-underline text-sm text-foreground-muted transition-colors hover:text-foreground";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const loc = (["en", "tr", "tk"].includes(locale) ? locale : "en") as Locale;
  const columns = footerColumns();

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
          <p className="mono-label mt-6">
            {t("slogan")}
          </p>
          <div className="mt-6">
            <p className="mono-label mb-2">{t("contact")}</p>
            <a href="mailto:info@tamga.network" className={linkCls}>
              info@tamga.network
            </a>
          </div>
          <SocialLinks
            size={19}
            className="mt-6"
            label={t("social")}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 md:gap-x-10 lg:gap-x-16">
          {columns.map((col) => (
            <div key={col.title.en}>
              <h4 className="mono-label mb-4">{col.title[loc]}</h4>
              <ul className="space-y-2.5">
                {col.items.map((item) => {
                  const { external, href } = targetOf(item, loc);
                  return (
                    <li key={item.title.en}>
                      {external ? (
                        <a
                          href={external}
                          {...(opensInPlace(external)
                            ? {}
                            : { target: "_blank", rel: "noopener noreferrer" })}
                          className={linkCls}
                        >
                          {item.title[loc]}
                        </a>
                      ) : (
                        <Link href={href!} className={linkCls}>
                          {item.title[loc]}
                        </Link>
                      )}
                    </li>
                  );
                })}
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

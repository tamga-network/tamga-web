import { Fragment } from "react";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/blog-format";
import { EXTERNAL_ATTRS } from "@/components/external-link";
import { langName, memberBySlug, tx } from "@/content/team";
import { pickVersion, pubUi, type Publication } from "@/content/publications";

/*
 * Yayın kartı: /publications ve ekip profili aynı kartı kullanır. Başlık sayfanın dilindeki sürümden (yoksa asıl dil);
 * diğer dil sürümleri başlığın yanında parantez içinde altı çizili bağlantı: "Başlık (EN - TK - RU)".
 * PDF'ler tarayıcının kendi görüntüleyicisinde yeni sekmede açılır.
 */

/** "2026-10" ya da "2026-10-29" → okunur tarih */
export const fmtPubDate = (d: string, locale: string) => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return formatDate(d, locale);
  if (/^\d{4}-\d{2}$/.test(d)) {
    const [y, m] = d.split("-").map(Number);
    return new Intl.DateTimeFormat(locale === "tk" ? "tk" : locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, 1)));
  }
  return d;
};

const btnPrimary =
  "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-contrast shadow-sm transition-colors hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const linkCls =
  "underline decoration-1 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function PublicationCard({
  p,
  locale,
  as: Heading = "h3",
}: {
  p: Publication;
  locale: string;
  as?: "h2" | "h3";
}) {
  const ui = pubUi(locale);
  const { main, others } = pickVersion(p, locale);
  const mainHref = main.file ?? main.url;
  const meta = [
    fmtPubDate(p.date, locale),
    langName(main.lang, locale),
    main.pages ? ui.pages(main.pages) : null,
    main.sizeKb ? `PDF · ${main.sizeKb >= 1024 ? `${(main.sizeKb / 1024).toFixed(1)} MB` : `${main.sizeKb} KB`}` : null,
  ].filter(Boolean);

  return (
    <article lang={main.lang} className="rounded-xl border border-border bg-surface/50 p-6 transition-colors hover:border-border-strong">
      <div className="flex flex-wrap items-center gap-2" lang={locale}>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider text-primary">
          {ui.kind[p.kind]}
        </span>
        <span className="mono-label">{meta.join(" · ")}</span>
      </div>

      <Heading className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground">
        {mainHref ? (
          <a href={mainHref} {...EXTERNAL_ATTRS} className={`${linkCls} decoration-foreground/30 hover:decoration-primary`}>
            {main.title}
            <span className="sr-only" lang={locale}> ({ui.opensNewTab})</span>
          </a>
        ) : (
          main.title
        )}
        {others.length > 0 && (
          <span className="ml-2 whitespace-nowrap font-sans text-base font-medium text-foreground-muted" lang={locale}>
            <span className="sr-only">{ui.otherLanguages}: </span>(
            {others.map((v, i) => (
              <Fragment key={v.lang}>
                {i > 0 && " - "}
                <a
                  href={v.file ?? v.url}
                  {...EXTERNAL_ATTRS}
                  hrefLang={v.lang}
                  lang={v.lang}
                  title={v.title}
                  className={`${linkCls} text-primary hover:text-primary-strong`}
                >
                  {v.lang.toUpperCase()}
                  <span className="sr-only" lang={locale}> — {langName(v.lang, locale)} ({ui.opensNewTab})</span>
                </a>
              </Fragment>
            ))}
            )
          </span>
        )}
      </Heading>

      <p className="mt-1.5 text-sm text-foreground-muted" lang={locale}>
        {p.authors.map((a, i) => {
          const m = memberBySlug(a);
          return (
            <Fragment key={a}>
              {i > 0 && ", "}
              {m ? (
                <Link
                  href={{ pathname: "/team/[slug]", params: { slug: m.slug } }}
                  className="link-underline transition-colors hover:text-foreground"
                >
                  {m.name}
                </Link>
              ) : (
                a
              )}
            </Fragment>
          );
        })}
        {p.venue ? (
          <>
            {" "}
            · <em>{tx(p.venue, locale)}</em>
          </>
        ) : null}
        {p.license ? (
          <>
            {" "}
            · {ui.license}: {p.license}
          </>
        ) : null}
      </p>

      {main.abstract && (
        <div className="mt-4 border-l-2 border-gold/70 pl-4">
          <p className="mono-label mb-1" lang={locale}>
            {ui.abstract}
          </p>
          <p className="text-sm leading-relaxed text-foreground-muted">{main.abstract}</p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2.5" lang={locale}>
        {main.file && (
          <>
            <a href={main.file} {...EXTERNAL_ATTRS} className={btnPrimary}>
              <FileText size={15} aria-hidden="true" />
              {ui.open}
              <span className="sr-only"> ({ui.opensNewTab})</span>
            </a>
            <a href={main.file} download className={btnSecondary}>
              <Download size={15} aria-hidden="true" />
              {ui.download}
            </a>
          </>
        )}
        {main.url && (
          <a href={main.url} {...EXTERNAL_ATTRS} className={btnSecondary}>
            <ArrowUpRight size={15} aria-hidden="true" />
            {ui.external}
            <span className="sr-only"> ({ui.opensNewTab})</span>
          </a>
        )}
      </div>
    </article>
  );
}

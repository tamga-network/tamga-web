"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type BlogCard = {
  slug: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  date: string;
  dateIso: string | null;
  minRead: string;
  draft: boolean;
  cover?: string;
  coverAlt?: string;
};

/**
 * Blog listesi + kategori süzgeci. JavaScript olmadan da bütün yazılar görünür; süzgeç yalnız gösterimi daraltır. Seçim
 * adrese `?category=<kategori>` olarak yazılır (yazı sayfasındaki kategori etiketi bu adrese bağlanır). "Tümü"nde en yeni
 * yazı koyu bantta geniş kart olur (ana sayfadaki "Haberler" kartıyla aynı dil).
 */
export function BlogList({
  cards,
  categories,
  labels,
}: {
  cards: BlogCard[];
  categories: { key: string; label: string }[];
  labels: { filter: string; all: string; draft: string; emptyFilter: string; latest: string; readMore: string };
}) {
  const [cat, setCat] = useState<string | null>(null);
  const keys = categories.map((c) => c.key);

  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search).get("category");
      setCat(q && keys.includes(q) ? q : null);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
    // kategori listesi derlemede sabit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (key: string | null) => {
    setCat(key);
    const url = new URL(window.location.href);
    if (key) url.searchParams.set("category", key);
    else url.searchParams.delete("category");
    window.history.pushState(null, "", url);
  };

  const count = (key: string) => cards.filter((c) => c.category === key).length;
  // Yazısı olmayan kategori süzgeçte görünmez.
  const chips = [
    { key: null as string | null, label: labels.all, n: cards.length },
    ...categories.map((c) => ({ ...c, n: count(c.key) })).filter((c) => c.n > 0),
  ];
  const shown = cat ? cards.filter((c) => c.category === cat) : cards;
  const featured = cat ? null : shown[0];
  const rest = cat ? shown : shown.slice(1);

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const on = cat === c.key;
          return (
            <button
              key={c.key ?? "all"}
              type="button"
              aria-pressed={on}
              onClick={() => choose(c.key)}
              className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                on
                  ? "border-primary bg-primary text-primary-contrast"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-border-strong hover:text-foreground"
              }`}
            >
              {c.label}
              <span className={`font-mono text-[11px] ${on ? "opacity-80" : "text-foreground-subtle"}`}>{c.n}</span>
            </button>
          );
        })}
      </div>

      {shown.length ? (
        <div className="mt-9 grid gap-5" aria-live="polite">
          {featured ? <Featured card={featured} labels={labels} /> : null}
          {rest.length ? (
            <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((c) => (
                <li key={c.slug}>
                  <Card card={c} labels={labels} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="mt-9 text-foreground-muted" aria-live="polite">
          {labels.emptyFilter}
        </p>
      )}
    </>
  );
}

const href = (slug: string) => ({ pathname: "/blog/[slug]" as const, params: { slug } });

function Meta({ c }: { c: BlogCard }) {
  return (
    <>
      {c.dateIso ? <time dateTime={c.dateIso}>{c.date}</time> : <span>{c.date}</span>}
      <span aria-hidden> · </span>
      <span>{c.minRead}</span>
    </>
  );
}

function Featured({ card: c, labels }: { card: BlogCard; labels: { latest: string; draft: string; readMore: string } }) {
  return (
    <Link
      href={href(c.slug)}
      className="sig-band group grid gap-8 overflow-hidden rounded-2xl p-8 text-ink-band-fg sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end"
    >
      <div className="grid content-between gap-10">
        <span className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-gok-200">
          <span className="text-gold-bright">{labels.latest}</span>
          <span aria-hidden>·</span>
          {c.categoryLabel}
          {c.draft ? <span className="rounded-full border border-gold-bright/60 px-2 py-0.5 text-gold-bright">{labels.draft}</span> : null}
        </span>
        <div className="grid gap-3">
          <span className="font-mono text-sm text-gok-200">
            <Meta c={c} />
          </span>
          <h2 className="text-balance text-3xl font-semibold leading-tight text-ink-band-fg sm:text-4xl">{c.title}</h2>
          <p className="max-w-[60ch] text-ink-band-muted">{c.description}</p>
          <span className="inline-flex items-center gap-1.5 font-semibold text-gok-200 group-hover:text-white">
            {labels.readMore} <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
      {c.cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- statik kapak
        <img src={c.cover} alt={c.coverAlt ?? ""} width={1400} height={788} className="h-auto w-full rounded-xl border border-ink-band-line" />
      ) : null}
    </Link>
  );
}

function Card({ card: c, labels }: { card: BlogCard; labels: { draft: string; readMore: string } }) {
  return (
    <Link
      href={href(c.slug)}
      className="group flex h-full flex-col gap-2.5 rounded-2xl border border-border bg-background-elevated p-6 transition-colors hover:border-primary"
    >
      <span className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-primary">
        {c.categoryLabel}
        {c.draft ? <span className="rounded-full border border-gold px-2 py-0.5 text-gold">{labels.draft}</span> : null}
      </span>
      <h2 className="text-xl font-semibold leading-snug text-foreground group-hover:text-primary">{c.title}</h2>
      <p className="line-clamp-3 text-[15px] leading-relaxed text-foreground-muted">{c.description}</p>
      <span className="mt-auto pt-3 font-mono text-xs text-foreground-subtle">
        <Meta c={c} />
      </span>
    </Link>
  );
}

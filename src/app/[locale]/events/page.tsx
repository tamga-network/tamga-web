import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CalendarClock, History } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { pastEvents, pickL, upcomingEvents } from "@/content/events";
import { formatDate } from "@/lib/blog-format";

/*
 * Etkinlikler: Tamga'nın düzenlediği ve katıldığı konuşmalar, atölyeler ve toplantılar. İskelet — yalnız gerçek, tarihi
 * belli etkinlikler eklenir; uydurma etkinlik yok. Gruplar boşken sade bir boş durum görünür.
 */

type Group = {
  key: "upcoming" | "past";
  icon: typeof CalendarClock;
  title: string;
  empty: string;
};

const C: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    groups: Group[];
    contact: string;
  }
> = {
  en: {
    title: "Events",
    description: "Talks, workshops and meetings Tamga runs or takes part in.",
    eyebrow: "About",
    lead: "Talks, workshops and meetings Tamga runs or takes part in.",
    groups: [
      {
        key: "upcoming",
        icon: CalendarClock,
        title: "Upcoming",
        empty: "No upcoming events yet. New dates appear here first.",
      },
      {
        key: "past",
        icon: History,
        title: "Past",
        empty: "Past events, with their slides and notes, will be kept here.",
      },
    ],
    contact: "Would you like us at your event? Write to info@tamga.network.",
  },
  tr: {
    title: "Etkinlikler",
    description:
      "Tamga'nın düzenlediği ve katıldığı konuşmalar, atölyeler ve toplantılar.",
    eyebrow: "Hakkında",
    lead: "Tamga'nın düzenlediği ve katıldığı konuşmalar, atölyeler ve toplantılar.",
    groups: [
      {
        key: "upcoming",
        icon: CalendarClock,
        title: "Yaklaşan",
        empty:
          "Henüz yaklaşan etkinlik yok. Yeni tarihler önce burada duyurulur.",
      },
      {
        key: "past",
        icon: History,
        title: "Geçmiş",
        empty: "Geçmiş etkinlikler, sunumları ve notlarıyla burada kalacak.",
      },
    ],
    contact:
      "Etkinliğinizde bizi görmek ister misiniz? info@tamga.network adresine yazın.",
  },
  tk: {
    title: "Çäreler",
    description:
      "Tamga-nyň geçirýän we gatnaşýan çykyşlary, okuw duşuşyklary we ýygnaklary.",
    eyebrow: "Biz barada",
    lead: "Tamga-nyň geçirýän we gatnaşýan çykyşlary, okuw duşuşyklary we ýygnaklary.",
    groups: [
      {
        key: "upcoming",
        icon: CalendarClock,
        title: "Ýakynlaşýan",
        empty:
          "Häzirlikçe ýakynlaşýan çäre ýok. Täze seneler ilki şu ýerde yglan edilýär.",
      },
      {
        key: "past",
        icon: History,
        title: "Geçen",
        empty: "Geçen çäreler slaýdlary we bellikleri bilen şu ýerde saklanar.",
      },
    ],
    contact:
      "Çäräňizde bizi görmek isleýärsiňizmi? info@tamga.network salgysyna ýazyň.",
  },
};

const pick = (raw: string): Locale =>
  ["en", "tr", "tk"].includes(raw) ? (raw as Locale) : "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = C[pick(locale)];
  return pageMeta(locale, "/events", {
    title: c.title,
    description: c.description,
  });
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const c = C[pick(raw)];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />
      <div className="shell space-y-14 py-14 sm:py-16">
        {c.groups.map((g) => {
          const Icon = g.icon;
          return (
            <section
              key={g.key}
              aria-labelledby={`ev-${g.key}`}
              className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
            >
              <div className="space-y-3">
                <Icon
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden
                  className="text-primary"
                />
                <h2
                  id={`ev-${g.key}`}
                  className="font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground"
                >
                  {g.title}
                </h2>
              </div>
              {(g.key === "upcoming" ? upcomingEvents() : pastEvents()).length ? (
                <ul className="m-0 grid list-none gap-3 p-0">
                  {(g.key === "upcoming" ? upcomingEvents() : pastEvents()).map((e) => (
                    <li key={e.id} className="grid gap-1 rounded-xl border border-border bg-background-elevated px-6 py-5">
                      <span className="font-mono text-xs uppercase tracking-[0.1em] text-primary">
                        {formatDate(e.date, raw)} · {pickL(e.place, raw)}
                      </span>
                      <span className="font-serif text-lg font-semibold">
                        {e.url ? (
                          <a href={e.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                            {pickL(e.title, raw)}
                          </a>
                        ) : (
                          pickL(e.title, raw)
                        )}
                      </span>
                      {e.summary && <span className="text-sm text-foreground-muted">{pickL({ en: e.summary.en ?? "", ...e.summary }, raw)}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex min-h-[120px] items-center rounded-xl border border-dashed border-border-strong bg-background px-6 py-8">
                  <p className="text-sm text-foreground-muted">{g.empty}</p>
                </div>
              )}
            </section>
          );
        })}
        <p className="border-t border-border pt-8 text-sm text-foreground-muted">
          {c.contact}
        </p>
      </div>
    </>
  );
}

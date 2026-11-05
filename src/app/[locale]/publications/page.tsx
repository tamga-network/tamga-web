import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { pageMeta, SITE_URL } from "@/lib/seo";
import { JsonLd, ORGANIZATION } from "@/components/json-ld";
import { memberBySlug } from "@/content/team";
import { pickVersion, publicationsByYear, pubUi, type Publication } from "@/content/publications";
import { PublicationCard } from "@/components/publications/publication-card";

/*
 * Akademik çalışmalar: ekibin bütün yayınları (PDF), yıla göre yeniden eskiye. Veri src/content/publications/
 * (ekleme rehberi src/content/team/README.md, "PDF ekleme"). Aynı kayıtlar yazarın ekip profilinde de görünür.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ui = pubUi(locale);
  return pageMeta(locale, "/publications", { title: ui.title, description: ui.description });
}

function articleLd(p: Publication, locale: string) {
  const { main } = pickVersion(p, locale);
  return {
    "@type": "ScholarlyArticle",
    headline: main.title,
    inLanguage: main.lang,
    datePublished: p.date,
    ...(main.abstract ? { abstract: main.abstract } : {}),
    ...(main.keywords?.length ? { keywords: main.keywords.join(", ") } : {}),
    ...(main.file ? { url: `${SITE_URL}${main.file}`, encodingFormat: "application/pdf" } : main.url ? { url: main.url } : {}),
    ...(p.license === "CC BY 4.0" ? { license: "https://creativecommons.org/licenses/by/4.0/" } : {}),
    author: p.authors.map((a) => {
      const m = memberBySlug(a);
      if (m) return { "@type": "Person", "@id": `${SITE_URL}/team/${m.slug}#person`, name: m.name };
      // Kurum yazısı: yazar kurumun kendisi
      if (a === ORGANIZATION.name) return { "@id": ORGANIZATION["@id"], "@type": "Organization", name: ORGANIZATION.name };
      return { "@type": "Person", name: a };
    }),
    publisher: { "@id": ORGANIZATION["@id"], "@type": "Organization", name: ORGANIZATION.name },
  };
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = pubUi(locale);
  const years = publicationsByYear();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: ui.title,
          url: `${SITE_URL}/${locale}/publications`,
          inLanguage: locale,
          hasPart: years.flatMap(([, ps]) => ps.map((p) => articleLd(p, locale))),
        }}
      />
      <PageHeader eyebrow={ui.eyebrow} title={ui.title} description={ui.lead} />

      <section className="shell py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-14">
          {years.map(([year, ps]) => (
            <section key={year} aria-labelledby={`y-${year}`}>
              <h2 id={`y-${year}`} className="font-serif text-2xl font-semibold text-foreground">
                {year}
              </h2>
              <ol className="mt-6 space-y-5">
                {ps.map((p) => (
                  <li key={p.id}>
                    <PublicationCard p={p} locale={locale} />
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

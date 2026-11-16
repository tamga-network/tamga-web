import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { getPrivacyContent } from "@/content/privacy";

/* Geçici gizlilik sayfası — metin ve kaynakları src/content/privacy.tsx. */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = getPrivacyContent(locale);
  return pageMeta(locale, "/privacy", { title: c.title, description: c.description });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getPrivacyContent(locale);

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />
      <div className="shell space-y-12 py-14 sm:py-16">
        <p
          role="note"
          className="max-w-3xl rounded-xl border border-border bg-background-elevated px-5 py-4 text-sm font-medium text-foreground"
        >
          {c.notice}
        </p>
        {c.sections.map((s) => (
          <section key={s.id} aria-labelledby={`pv-${s.id}`} className="max-w-3xl border-t border-border pt-8">
            <div className="prose">
              <h2 id={`pv-${s.id}`}>{s.title}</h2>
              <ul>
                {s.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

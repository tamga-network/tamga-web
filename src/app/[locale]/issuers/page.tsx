import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Mail, ShieldCheck } from "lucide-react";
import { PageHeader, Card, Button } from "@/components/ui";
import { getIssuersContent } from "@/content/issuers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getIssuersContent(locale);
  return { title: meta.title, description: meta.description };
}

export default async function IssuersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getIssuersContent(locale);
  const mailto = `mailto:${c.apply.mail}?subject=${encodeURIComponent(c.apply.subject)}`;

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />

      <section className="shell py-14 sm:py-16">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface/50 p-6 sm:flex-row sm:items-start">
          <ShieldCheck className="shrink-0 text-accent" size={28} aria-hidden />
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {c.principle.title}
            </h2>
            <p className="mt-2 max-w-3xl leading-relaxed text-foreground-muted">
              {c.principle.body}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={mailto}>{c.apply.title}</Button>
          <Button href={c.apply.docs} variant="outline">
            {c.apply.docsLabel}
          </Button>
        </div>
      </section>

      <section className="shell grid gap-12 pb-16 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{c.whoTitle}</h2>
          <dl className="mt-6 divide-y divide-border rounded-lg border border-border">
            {c.who.map((w) => (
              <div key={w.k} className="px-4 py-3">
                <dt className="font-medium text-foreground">{w.k}</dt>
                <dd className="mt-0.5 text-sm text-foreground-muted">{w.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{c.getTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.get.map((g) => (
              <Card key={g.k} className="h-full">
                <h3 className="font-semibold text-foreground">{g.k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {g.v}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-elevated/40">
        <div className="shell py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">{c.needTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {c.need.map((n) => (
              <div
                key={n.title}
                className="rounded-lg border border-border bg-background/60 p-5"
              >
                <h3 className="mono-label text-gold-bright">{n.title}</h3>
                <ul className="mt-3 space-y-2">
                  {n.items.map((i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary"
                      />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <h2 className="text-2xl font-semibold sm:text-3xl">{c.stepsTitle}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.steps.map((s) => (
            <li key={s.k} className="rounded-lg border border-border p-5">
              <p className="font-mono text-sm text-primary">{s.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {s.v}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-xl border border-border bg-surface/50 p-6">
          <h2 className="text-xl font-semibold text-foreground">
            {c.verifierTitle}
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-foreground-muted">
            {c.verifierBody}
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="shell py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            {c.apply.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-foreground-muted">
            {c.apply.body}
          </p>
          <a
            href={mailto}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-contrast shadow-sm hover:bg-primary-strong"
          >
            <Mail size={16} aria-hidden /> {c.apply.mail}
          </a>
          <p className="mt-4 text-sm text-foreground-subtle">{c.apply.guide}</p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/ui";
import { getRoadmapContent, type RoadmapState } from "@/content/roadmap";

const STATE: Record<RoadmapState, string> = {
  done: "border-accent/50 text-accent",
  now: "border-gold-bright/60 text-gold-bright",
  next: "border-primary/50 text-primary",
  later: "border-border-strong text-foreground-muted",
  research: "border-border text-foreground-subtle",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getRoadmapContent(locale);
  return { title: meta.title, description: meta.description };
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getRoadmapContent(locale);
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />
      <section className="shell py-14 sm:py-16">
        <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-10">
          {c.stages.map((s) => (
            <li key={s.title} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[1.95rem] top-1.5 h-3 w-3 rotate-45 border-2 bg-background sm:-left-[2.95rem] ${STATE[s.state]}`}
              />
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider ${STATE[s.state]}`}
              >
                {c.labels[s.state]}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {s.title}
              </h2>
              <p className="mt-1 text-foreground-muted">{s.summary}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-md border border-border bg-surface/40 px-3.5 py-2.5 text-sm leading-relaxed text-foreground-muted"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-12 text-sm text-foreground-subtle">{c.note}</p>
      </section>
    </>
  );
}

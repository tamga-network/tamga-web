import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { Compass, Target, Landmark, Users, ShieldCheck, Layers, Mail } from "lucide-react";
import { PageHeader, Card, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { AnimatedLogoMark } from "@/components/logo";
import { PlatformDiagram } from "@/components/platform-diagram";
import { getAboutContent } from "@/content/about";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = getAboutContent(locale);
  return pageMeta(locale, "/about", { title: meta.title, description: meta.description });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getAboutContent(locale);
  const posIcons = [Layers, Landmark, ShieldCheck];

  return (
    <>
      <PageHeader
        eyebrow={c.header.eyebrow}
        title={c.header.title}
        description={c.header.description}
      />

      <PlatformDiagram locale={locale} />

      {/* Name origin */}
      <section className="shell py-16 sm:py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">{c.name.eyebrow}</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {c.name.title}
              </h2>
              <div className="prose mt-6">{c.name.body}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center justify-center rounded-2xl border border-border bg-surface/40 p-12">
              <AnimatedLogoMark size={220} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="border-y border-border bg-background-elevated/40">
        <div className="shell grid gap-6 py-16 sm:py-20 md:grid-cols-2">
          <Reveal>
            <Card className="h-full">
              <Compass className="text-primary" size={26} />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                {c.mission.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground-muted">
                {c.mission.body}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full">
              <Target className="text-primary" size={26} />
              <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                {c.vision.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground-muted">
                {c.vision.body}
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Positioning */}
      <section className="shell py-16 sm:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">{c.positioning.eyebrow}</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {c.positioning.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              {c.positioning.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.positioning.rows.map((row, i) => {
            const Icon = posIcons[i];
            return (
              <Reveal key={row.k} delay={i * 0.07}>
                <Card className="h-full">
                  <Icon className="text-accent" size={24} />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {row.k}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {row.v}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>


      {/* Why now */}
      <section className="border-t border-border bg-background-elevated/40">
        <div className="shell py-16 sm:py-20">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <Users className="text-gold" size={28} />
                <h2 className="mt-4 text-3xl font-semibold">{c.whyNow.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="prose">{c.whyNow.body}</div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/learn">{c.whyNow.ctaDocs}</Button>
              <Button href="/whitepaper" variant="outline">
                {c.whyNow.ctaWhitepaper}
              </Button>
              <Button href="/manifesto" variant="outline">
                {c.whyNow.ctaManifesto}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="shell scroll-mt-24 py-16 sm:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">{c.contact.eyebrow}</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {c.contact.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              {c.contact.lead}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {c.contact.items.map((item, i) => (
            <Reveal key={item.email} delay={i * 0.06}>
              <Card className="h-full">
                <Mail className="text-accent" size={22} />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {item.note}
                </p>
                <a
                  href={`mailto:${item.email}`}
                  className="link-underline mt-3 inline-block font-mono text-sm text-primary"
                >
                  {item.email}
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

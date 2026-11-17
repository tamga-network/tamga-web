import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { HowItWorks } from "@/components/how-it-works";
import { LayerSection, NameSeal } from "@/components/about/about-visuals";
import { getAboutContent, getAboutVisuals } from "@/content/about";

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
  const v = getAboutVisuals(locale);

  return (
    <>
      {/* Açılış: başlık + güven akışı sahnesi (ana sayfayla aynı motor) */}
      <section className="relative overflow-hidden border-b border-border bg-tamga-grain">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden />
        <div className="shell relative pb-16 pt-16 sm:pb-20 sm:pt-20">
          <p className="eyebrow">{c.header.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl">
            {c.header.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted sm:text-xl">{c.header.description}</p>
          <div className="mt-12">
            <HowItWorks locale={locale} />
          </div>
        </div>
      </section>

      {/* Ad */}
      <section className="shell py-20 sm:py-28">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">{c.name.eyebrow}</p>
              <h2 className="text-4xl font-semibold sm:text-5xl">{c.name.title}</h2>
              <div className="prose mt-6">{c.name.body}</div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <NameSeal labels={v.seal} />
          </Reveal>
        </div>
      </section>

      {/* Misyon / vizyon: kart değil, bildiri */}
      <section className="border-y border-border bg-background-elevated">
        <div className="shell grid md:grid-cols-2">
          {[
            { t: c.mission.title, b: c.mission.body },
            { t: c.vision.title, b: c.vision.body },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div
                className={`py-14 sm:py-20 ${i === 0 ? "md:pr-12 lg:pr-16" : "border-t border-border md:border-l md:border-t-0 md:pl-12 lg:pl-16"}`}
              >
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-gold">
                  <span className="h-px w-8 bg-gold-bright" aria-hidden />
                  {s.t}
                </p>
                <p className="mt-6 text-balance font-serif text-2xl font-medium leading-snug tracking-[-0.015em] text-foreground sm:text-[1.75rem]">
                  {s.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Konumlanma: katman kesiti */}
      <section className="shell py-20 sm:py-28">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">{c.positioning.eyebrow}</p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{c.positioning.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground-muted">{c.positioning.lead}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <LayerSection rows={c.positioning.rows} label={v.layer} />
        </Reveal>
      </section>

      {/* Neden şimdi */}
      <section className="border-t border-border bg-surface/40">
        <div className="shell grid gap-10 py-20 sm:py-28 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-semibold sm:text-5xl">{c.whyNow.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="prose about-why text-lg">{c.whyNow.body}</div>
            <div className="mt-10 flex flex-wrap gap-3">
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

      {/* İletişim: satırlar */}
      <section id="contact" className="shell scroll-mt-24 py-20 sm:py-28">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow mb-3">{c.contact.eyebrow}</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">{c.contact.title}</h2>
              <p className="mt-4 leading-relaxed text-foreground-muted">{c.contact.lead}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="border-t border-border-strong">
              {c.contact.items.map((item) => (
                <li key={item.email} className="border-b border-border-strong">
                  <a
                    href={`mailto:${item.email}`}
                    className="group grid gap-1 py-5 transition-colors hover:bg-surface/60 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6 sm:px-3"
                  >
                    <span className="font-serif text-lg font-semibold text-foreground">{item.label}</span>
                    <span className="text-sm leading-relaxed text-foreground-muted">{item.note}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-sm text-primary">
                      {item.email}
                      <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

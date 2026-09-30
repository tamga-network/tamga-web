import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, Download, X } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { LogoMark } from "@/components/logo";
import type { Locale } from "@/i18n/routing";
import { pageMeta } from "@/lib/seo";
import { BRAND_PAGE, DOWNLOADS, FONTS, SWATCHES, TINTS, type Swatch } from "@/content/brand";

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const p = BRAND_PAGE[loc(locale)];
  return pageMeta(locale, "/brand", { title: p.title, description: p.description });
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <h2 className="mb-5 text-2xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

/** Mühür + ad (başlıktaki yerleşim). */
function Lockup({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark size={44} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl font-semibold tracking-tight">Tamga</span>
        <span className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.22em] opacity-70">Network</span>
      </span>
    </span>
  );
}

function SwatchCard({ s, l }: { s: Swatch; l: Locale }) {
  const text = s.on === "light" ? "#17110F" : "#F4EDE2";
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background-elevated">
      <div className="flex h-28 items-end p-4" style={{ background: s.hex, color: text }}>
        <span className="font-serif text-lg font-semibold">{s.name[l]}</span>
      </div>
      <figcaption className="space-y-2 p-4">
        <dl className="grid grid-cols-[3rem_1fr] gap-x-2 font-mono text-xs tabular-nums">
          <dt className="text-foreground-subtle">HEX</dt>
          <dd className="select-all text-foreground">{s.hex}</dd>
          <dt className="text-foreground-subtle">RGB</dt>
          <dd className="select-all text-foreground">{s.rgb}</dd>
        </dl>
        <p className="text-sm leading-relaxed text-foreground-muted">{s.use[l]}</p>
      </figcaption>
    </figure>
  );
}

export default async function BrandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const p = BRAND_PAGE[l];
  const sections: [string, string][] = [
    ["name", p.nav.name],
    ["seal", p.nav.logo],
    ["colour", p.nav.colour],
    ["type", p.nav.type],
    ["button", p.nav.button],
    ["downloads", p.nav.downloads],
    ["use", p.nav.use],
  ];

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.lead} />
      <div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[11rem_1fr]">
        <nav aria-label={p.title} className="hidden lg:block">
          <ul className="sticky top-24 space-y-2 text-sm">
            {sections.map(([id, t]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-foreground-muted transition-colors hover:text-foreground">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-14">
          <Section id="name" title={p.nav.name}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.name.body}</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {p.name.rows.map(([n, d]) => (
                    <tr key={n} className="border-b border-border last:border-b-0">
                      <th scope="row" className="whitespace-nowrap px-4 py-3 text-left font-semibold text-foreground">
                        {n}
                      </th>
                      <td className="px-4 py-3 text-foreground-muted">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
              <span className="mono-label">{p.name.wrongLabel}</span>
              {p.name.wrong.map((w) => (
                <span key={w} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs line-through decoration-primary">
                  {w}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-gold-bright pl-4 text-sm leading-relaxed text-foreground-muted">
              {p.name.origin}
            </p>
          </Section>

          <Section id="seal" title={p.nav.logo}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.logo.body}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: p.logo.onDark, bg: "#17110F", fg: "#F4EDE2", node: <LogoMark size={88} /> },
                { label: p.logo.onLight, bg: "#F4EDE2", fg: "#17110F", node: <LogoMark size={88} /> },
                { label: p.logo.mono, bg: "#B01E22", fg: "#FFFFFF", node: <LogoMark size={88} mono /> },
                { label: p.logo.lockup, bg: "#17110F", fg: "#F4EDE2", node: <Lockup /> },
              ].map((t) => (
                <figure key={t.label} className="overflow-hidden rounded-xl border border-border">
                  <div
                    className="flex h-40 items-center justify-center"
                    style={{ background: t.bg, color: t.fg, ["--gold-bright" as string]: "#C8A24C", ["--primary" as string]: "#B01E22" }}
                  >
                    {t.node}
                  </div>
                  <figcaption className="border-t border-border px-4 py-2.5 text-xs text-foreground-muted">{t.label}</figcaption>
                </figure>
              ))}
            </div>
            <ul className="mt-6 space-y-1.5 text-sm text-foreground-muted">
              <li>{p.logo.space}</li>
              <li>{p.logo.min}</li>
            </ul>
            <p className="mono-label mt-6 mb-3">{p.logo.dontLabel}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.logo.dont.map((d) => (
                <li key={d} className="flex gap-2 text-sm text-foreground-muted">
                  <X size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden /> {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="colour" title={p.nav.colour}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.colour.body}</p>
            <p className="mono-label mt-6 mb-3">{p.colour.core}</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {SWATCHES.filter((s) => s.core).map((s) => (
                <SwatchCard key={s.hex} s={s} l={l} />
              ))}
            </div>
            <p className="mono-label mt-8 mb-3">{p.colour.secondary}</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {SWATCHES.filter((s) => !s.core).map((s) => (
                <SwatchCard key={s.hex} s={s} l={l} />
              ))}
            </div>
            <p className="mono-label mt-8 mb-3">{p.colour.tints}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">{p.colour.tintsBody}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {TINTS.map((t) => (
                <span
                  key={t.hex}
                  className="inline-flex items-center gap-3 rounded-lg px-4 py-2.5 font-mono text-xs"
                  style={{ background: "#17110F", color: t.hex }}
                >
                  <span className="font-semibold">{t.of}</span>
                  <span className="select-all tabular-nums">{t.hex}</span>
                </span>
              ))}
            </div>
          </Section>

          <Section id="type" title={p.nav.type}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.type.body}</p>
            <div className="mt-6 divide-y divide-border rounded-xl border border-border">
              {FONTS.map((f) => (
                <div key={f.family} className="grid gap-3 p-5 md:grid-cols-[12rem_1fr] md:items-baseline">
                  <div>
                    <p className="mono-label">{f.role[l]}</p>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-semibold text-foreground underline-offset-4 hover:underline"
                    >
                      {f.family}
                    </a>
                    <p className="mt-1 font-mono text-xs text-foreground-subtle">
                      {p.type.weights}: {f.weights}
                    </p>
                  </div>
                  <p
                    className={`${f.cls} break-words text-foreground ${
                      f.cls === "font-serif" ? "text-3xl font-semibold sm:text-4xl" : f.cls === "font-mono" ? "text-base" : "text-xl"
                    }`}
                  >
                    {f.sample[l]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-foreground-subtle">{p.type.licence}</p>
          </Section>

          <Section id="button" title={p.nav.button}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.button.body}</p>
            <div className="mt-6 grid gap-6 rounded-xl border border-border bg-surface/50 p-6 md:grid-cols-[auto_1fr] md:items-center">
              <span className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#B01E22] px-5 py-3 text-sm font-medium text-white shadow-sm">
                <LogoMark size={18} mono /> {p.button.label}
              </span>
              <ul className="space-y-2">
                {p.button.rules.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-foreground-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="downloads" title={p.nav.downloads}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.downloads.body}</p>
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
              {DOWNLOADS.map((d) => (
                <li key={d.file}>
                  <a
                    href={`/${d.file}`}
                    download
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-surface/60"
                  >
                    <span className="text-foreground">{d.label[l]}</span>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-foreground-subtle">
                      {d.file} <Download size={14} aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="use" title={p.nav.use}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.use.body}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="mono-label mb-3">{p.use.okLabel}</p>
                <ul className="space-y-2">
                  {p.use.ok.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-foreground-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden /> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mono-label mb-3">{p.use.askLabel}</p>
                <ul className="space-y-2">
                  {p.use.ask.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-foreground-muted">
                      <X size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-foreground-muted">
              {p.use.contact}{" "}
              <a href="mailto:info@tamga.network" className="font-medium text-foreground underline underline-offset-4">
                info@tamga.network
              </a>
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}

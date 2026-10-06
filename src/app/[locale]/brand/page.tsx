import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Check, Download, X } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { LogoMark } from "@/components/logo";
import type { Locale } from "@/i18n/routing";
import { pageMeta } from "@/lib/seo";
import {
  APP_ICON,
  APP_ICON_ALT,
  BRAND_PAGE,
  FONTS,
  LOCKUPS,
  LOGO_VARIANTS,
  SAMPLES,
  SWATCHES,
  type LogoVariant,
  type Swatch,
} from "@/content/brand";

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const p = BRAND_PAGE[loc(locale)];
  return pageMeta(locale, "/brand", {
    title: p.title,
    description: p.description,
  });
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-foreground pt-8">
      <h2 className="mb-5 font-serif text-3xl font-semibold tracking-[-0.02em] text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Files({ files, label }: { files: { file: string; kind: string }[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {files.map((f) => (
        <li key={f.file}>
          <a
            href={`/brand/${f.file}`}
            download
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-border px-2.5 font-mono text-xs text-foreground-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            <Download size={13} aria-hidden /> {f.kind}
          </a>
        </li>
      ))}
    </ul>
  );
}

function VariantCard({ v, l, download }: { v: LogoVariant; l: Locale; download: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-background-elevated">
      <div className="flex h-48 items-center justify-center gap-6" style={{ background: v.bg, color: v.fg }}>
        <LogoMark size={104} mono />
      </div>
      <figcaption className="grid gap-3 border-t border-border p-4">
        <span className="text-sm font-medium text-foreground">{v.label[l]}</span>
        <Files files={v.files} label={`${download}: ${v.label[l]}`} />
      </figcaption>
    </figure>
  );
}

function SwatchRow({ s, l, labels }: { s: Swatch; l: Locale; labels: { hex: string; rgb: string; contrast: string } }) {
  return (
    <div className="grid gap-4 border-b border-border py-4 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
      <div
        className="flex h-20 items-end rounded-lg p-3 font-serif text-sm font-semibold"
        style={{
          background: s.hex,
          color: s.text,
          boxShadow: s.border ? "inset 0 0 0 1px var(--border)" : undefined,
        }}
      >
        {s.name[l]}
      </div>
      <div className="grid gap-1">
        <span className="font-medium text-foreground">{s.role[l]}</span>
        <dl className="grid grid-cols-[2.6rem_1fr] gap-x-2 font-mono text-xs tabular-nums text-foreground-muted">
          <dt className="text-foreground-subtle">{labels.hex}</dt>
          <dd className="select-all">{s.hex}</dd>
          <dt className="text-foreground-subtle">{labels.rgb}</dt>
          <dd className="select-all">{s.rgb}</dd>
        </dl>
      </div>
      <p className="text-sm text-foreground-muted">
        <span className="mono-label mr-2">{labels.contrast}</span>
        {s.note[l]}
      </p>
    </div>
  );
}

export default async function BrandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const p = BRAND_PAGE[l];
  const sections: [string, string][] = [
    ["logo", p.nav.logo],
    ["colour", p.nav.colour],
    ["type", p.nav.type],
    ["names", p.nav.name],
    ["button", p.nav.button],
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

        <div className="min-w-0 space-y-16">
          <Section id="logo" title={p.nav.logo}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-center">
              <div className="space-y-4">
                <p className="max-w-2xl text-lg leading-relaxed text-foreground">{p.logo.body}</p>
                <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted">{p.logo.story}</p>
              </div>
              <div className="flex aspect-square items-center justify-center rounded-xl bg-[#F8F6F1] text-[#1E5A78] ring-1 ring-border">
                <LogoMark size={168} mono />
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {LOGO_VARIANTS.map((v) => (
                <VariantCard key={v.id} v={v} l={l} download={p.logo.download} />
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {[
                {
                  bg: "bg-[#1E5A78] text-white",
                  t: p.logo.appIcon,
                  b: p.logo.appIconBody,
                  f: APP_ICON.files,
                },
                {
                  bg: "bg-[#14120F] text-[#C8A24C]",
                  t: p.logo.appIconAlt,
                  b: p.logo.appIconAltBody,
                  f: APP_ICON_ALT.files,
                },
              ].map((ic) => (
                <div
                  key={ic.t}
                  className="grid gap-5 rounded-xl border border-border bg-background-elevated p-5 sm:grid-cols-[auto_1fr] sm:items-center"
                >
                  <span className={`flex h-24 w-24 items-center justify-center rounded-[22px] shadow-lg ${ic.bg}`}>
                    <LogoMark size={56} mono />
                  </span>
                  <div className="grid gap-3">
                    <div>
                      <p className="font-medium text-foreground">{ic.t}</p>
                      <p className="text-sm text-foreground-muted">{ic.b}</p>
                    </div>
                    <Files files={ic.f} label={`${p.logo.download}: ${ic.t}`} />
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-10 font-serif text-xl font-semibold tracking-[-0.02em] text-foreground">{p.logo.lockup}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">{p.logo.lockupBody}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {LOCKUPS.filter((lu) => !lu.vertical).map((lu) => (
                <figure key={lu.id} className="overflow-hidden rounded-xl border border-border bg-background-elevated">
                  <div className="flex h-36 items-center justify-center px-8" style={{ background: lu.bg }}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- düz SVG dosyası, indirilen dosyanın kendisi */}
                    <img src={`/brand/${lu.file}`} alt="Tamga Network" className="h-10 w-auto max-w-full sm:h-12" />
                  </div>
                  <figcaption className="grid gap-3 border-t border-border p-4">
                    <span className="text-sm font-medium text-foreground">{lu.label[l]}</span>
                    <Files files={lu.files} label={`${p.logo.download}: ${p.logo.lockup} · ${lu.label[l]}`} />
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LOCKUPS.filter((lu) => lu.vertical).map((lu) => (
                <figure key={lu.id} className="overflow-hidden rounded-xl border border-border bg-background-elevated">
                  <div className="flex h-56 items-center justify-center p-6" style={{ background: lu.bg }}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- düz SVG dosyası, indirilen dosyanın kendisi */}
                    <img src={`/brand/${lu.file}`} alt="Tamga Network" className="h-36 w-auto max-w-full" />
                  </div>
                  <figcaption className="grid gap-3 border-t border-border p-4">
                    <span className="text-sm font-medium text-foreground">{lu.label[l]}</span>
                    <Files files={lu.files} label={`${p.logo.download}: ${p.logo.lockup} · ${lu.label[l]}`} />
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mono-label mt-8 mb-3">{p.logo.rulesLabel}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {p.logo.rules.map((r) => (
                <li key={r} className="flex gap-2 text-sm leading-relaxed text-foreground-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden /> {r}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="colour" title={p.nav.colour}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.colour.body}</p>
            <div className="mt-6 rounded-xl border border-border bg-background-elevated px-5">
              {SWATCHES.map((s) => (
                <SwatchRow key={s.hex} s={s} l={l} labels={p.colour} />
              ))}
            </div>
          </Section>

          <Section id="type" title={p.nav.type}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.type.body}</p>
            <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-background-elevated">
              {FONTS.map((f) => (
                <div key={f.family} className="grid gap-3 p-5 md:grid-cols-[13rem_1fr] md:items-baseline">
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
                      {p.type.weights}: {f.weights} · {p.type.scripts}: {f.scripts[l]}
                    </p>
                  </div>
                  <p
                    className={`${f.cls} break-words text-foreground ${
                      f.cls === "font-serif"
                        ? "text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
                        : f.cls === "font-mono"
                          ? "text-base"
                          : "text-xl"
                    }`}
                  >
                    {f.cls === "font-mono" ? "urn:tamga:edu:DiplomaCredential:1" : SAMPLES[0].text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mono-label mt-8 mb-3">{p.type.samplesLabel}</p>
            <ul className="divide-y divide-border rounded-xl border border-border bg-background-elevated">
              {SAMPLES.map((s) => (
                <li key={s.lang} className="grid gap-1 p-4 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                  <span className="font-mono text-xs text-foreground-subtle">{s.lang}</span>
                  <span className="font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground">{s.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-foreground-subtle">{p.type.licence}</p>
          </Section>

          <Section id="names" title={p.nav.name}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.name.body}</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background-elevated">
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
                <span
                  key={w}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-xs line-through decoration-primary"
                >
                  {w}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-primary pl-4 text-sm leading-relaxed text-foreground-muted">
              {p.name.origin}
            </p>
          </Section>

          <Section id="button" title={p.nav.button}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.button.body}</p>
            <div className="mt-6 grid gap-6 rounded-xl border border-border bg-background-elevated p-6 md:grid-cols-[auto_1fr] md:items-center">
              <span className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md bg-[#1E5A78] px-5 text-sm font-semibold text-white">
                <LogoMark size={20} mono /> {p.button.label}
              </span>
              <ul className="space-y-2">
                {p.button.rules.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-foreground-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="use" title={p.nav.use}>
            <p className="max-w-2xl leading-relaxed text-foreground-muted">{p.use.body}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="mono-label mb-3">{p.use.okLabel}</p>
                <ul className="space-y-2">
                  {p.use.ok.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-foreground-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden /> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mono-label mb-3">{p.use.askLabel}</p>
                <ul className="space-y-2">
                  {p.use.ask.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-foreground-muted">
                      <X size={16} className="mt-0.5 shrink-0 text-foreground-subtle" aria-hidden /> {o}
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

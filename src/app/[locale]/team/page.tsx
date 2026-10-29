import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";
import { Button, PageHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";
import { TEAM, teamUi, tx } from "@/content/team";
import { MemberAvatar, MemberLinkIcons } from "@/components/team/member-parts";

/*
 * Ekibimiz: ağı kuran kişiler. Veri src/content/team/ (kişi başına bir dosya; ekleme rehberi README.md). Kart → /team/<slug>.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ui = teamUi(locale);
  return pageMeta(locale, "/team", { title: ui.title, description: ui.description });
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = teamUi(locale);

  return (
    <>
      <PageHeader eyebrow={ui.eyebrow} title={ui.title} description={ui.lead} />

      <section className="shell py-16 sm:py-20">
        {/* Ortalanmış kartlar: yuvarlak resim (dönen halka) · rol · ad · kısa tanıtım · bağlantılar · "Profili gör".
            Resim ve düğme ayrı bağlantılar (iç içe etkileşimli öğe yok); resim bağlantısı klavye sırasından çıkarıldı,
            aynı hedef düğmede. Animasyon ve vurgu: globals.css `.team-*`. */}
        <ul className="team-grid flex flex-wrap justify-center gap-6">
          {TEAM.map((m, i) => {
            const href = { pathname: "/team/[slug]" as const, params: { slug: m.slug } };
            return (
              <li key={m.slug} className="w-full max-w-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <article className="team-card flex h-full flex-col items-center rounded-2xl border border-border bg-surface/50 px-6 pb-7 pt-9 text-center">
                  <Link href={href} tabIndex={-1} aria-hidden="true" className="rounded-full">
                    <MemberAvatar
                      member={m}
                      locale={locale}
                      priority={i < 3}
                      sizes="152px"
                      className="[--team-size:9.5rem]"
                    />
                  </Link>
                  <p className="mono-label mt-6 text-primary">{tx(m.role, locale)}</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">{m.name}</h2>
                  {m.headline && (
                    <p className="mt-3 line-clamp-2 max-w-[34ch] text-sm leading-relaxed text-foreground-muted">
                      {tx(m.headline, locale)}
                    </p>
                  )}
                  <MemberLinkIcons member={m} size={15} className="mt-5 justify-center" />
                  <div className="mt-auto pt-7">
                    <Link
                      href={href}
                      className="team-cta inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-5 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-contrast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      {ui.viewProfile}
                      <span className="sr-only">: {m.name}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-border bg-background-elevated/40">
        <div className="shell flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">{ui.contactTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground-muted">{ui.contactText}</p>
          </div>
          <Button href={{ pathname: "/about", hash: "contact" }}>
            <Mail size={16} aria-hidden="true" />
            {ui.contactCta}
          </Button>
        </div>
      </section>
    </>
  );
}

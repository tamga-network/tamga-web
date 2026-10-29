import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Mail } from "lucide-react";
import { Button, PageHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";
import { TEAM, teamUi, tx } from "@/content/team";
import { MemberLinkIcons, MemberPhoto } from "@/components/team/member-parts";

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
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <li key={m.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/50 transition-[transform,box-shadow,border-color,background-color] duration-200 focus-within:border-primary hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface hover:shadow-soft">
                <MemberPhoto
                  member={m}
                  locale={locale}
                  priority={i < 3}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3.4] w-full [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="mono-label text-primary">{tx(m.role, locale)}</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
                    {/* Kartın tamamı tıklanabilir: bağlantı kartı kaplar; simge bağlantıları z-10 ile üstte kalır */}
                    <Link
                      href={{ pathname: "/team/[slug]", params: { slug: m.slug } }}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {m.name}
                    </Link>
                  </h2>
                  {m.headline && (
                    <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{tx(m.headline, locale)}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {ui.viewProfile}
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                    <MemberLinkIcons member={m} size={15} />
                  </div>
                </div>
              </article>
            </li>
          ))}
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

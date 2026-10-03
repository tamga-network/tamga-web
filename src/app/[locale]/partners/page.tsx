import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, Code, Sprout, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { partnersIn, type PartnerGroup } from "@/content/partners";

/*
 * Partnerler: ağa katılan kurumlar ve kuruluşlar. İskelet — yalnız gerçekten katılmış ve adının yazılmasına izin vermiş
 * kuruluşlar eklenir; uydurma ad ya da logo yok. Gruplar boşken "Yakında" görünür.
 */

type Group = {
  key: string;
  icon: typeof Building2;
  title: string;
  desc: string;
};

const C: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    soon: string;
    soonNote: string;
    groups: Group[];
    ctaTitle: string;
    ctaText: string;
    cta: string;
  }
> = {
  en: {
    title: "Partners",
    description:
      "Institutions and organisations that take part in Tamga Network.",
    eyebrow: "Network",
    lead: "Institutions and organisations that take part in the network. Each appears here once it has joined and agreed to be listed.",
    soon: "Coming soon",
    soonNote: "The first partners will be listed here.",
    groups: [
      {
        key: "institutions",
        icon: Building2,
        title: "Institutions",
        desc: "Universities, public bodies and companies that issue or verify credentials on the network.",
      },
      {
        key: "wallets",
        icon: Wallet,
        title: "Wallet providers",
        desc: "Wallets that follow the network's rules and pass the conformance tests.",
      },
      {
        key: "technology",
        icon: Code,
        title: "Technology and implementation partners",
        desc: "Organisations that build on the open packages and help institutions join.",
      },
      {
        key: "ecosystem",
        icon: Sprout,
        title: "Ecosystem",
        desc: "Technology centres, associations and communities that support the network.",
      },
    ],
    ctaTitle: "Would you like to take part?",
    ctaText:
      "Institutions, wallet providers and states join through the same open process.",
    cta: "Join the network",
  },
  tr: {
    title: "Partnerler",
    description: "Tamga Network'e katılan kurumlar ve kuruluşlar.",
    eyebrow: "Ağ",
    lead: "Ağa katılan kurumlar ve kuruluşlar. Her biri ağa katıldıktan ve listelenmeyi kabul ettikten sonra burada yer alır.",
    soon: "Yakında",
    soonNote: "İlk partnerler burada listelenecek.",
    groups: [
      {
        key: "institutions",
        icon: Building2,
        title: "Kurumlar",
        desc: "Ağda belge veren ya da doğrulayan üniversiteler, kamu kurumları ve şirketler.",
      },
      {
        key: "wallets",
        icon: Wallet,
        title: "Cüzdan sağlayıcılar",
        desc: "Ağın kurallarına uyan ve uyum testlerini geçen cüzdanlar.",
      },
      {
        key: "technology",
        icon: Code,
        title: "Teknoloji ve uygulama ortakları",
        desc: "Açık paketler üzerine çözüm geliştiren ve kurumların katılımına yardım eden kuruluşlar.",
      },
      {
        key: "ecosystem",
        icon: Sprout,
        title: "Ekosistem",
        desc: "Ağı destekleyen teknoloji merkezleri, dernekler ve topluluklar.",
      },
    ],
    ctaTitle: "Siz de katılmak ister misiniz?",
    ctaText:
      "Kurumlar, cüzdan sağlayıcılar ve devletler aynı açık süreçle katılır.",
    cta: "Ağa katıl",
  },
  tk: {
    title: "Hyzmatdaşlar",
    description: "Tamga Network-a goşulan guramalar we edaralar.",
    eyebrow: "Tor",
    lead: "Tora goşulan guramalar we edaralar. Her biri tora goşulandan we sanawa girmäge razy bolandan soň şu ýerde görkezilýär.",
    soon: "Ýakynda",
    soonNote: "Ilkinji hyzmatdaşlar şu ýerde görkeziler.",
    groups: [
      {
        key: "institutions",
        icon: Building2,
        title: "Guramalar",
        desc: "Torda resminama berýän ýa-da barlaýan uniwersitetler, döwlet edaralary we kompaniýalar.",
      },
      {
        key: "wallets",
        icon: Wallet,
        title: "Gapjyk üpjün edijiler",
        desc: "Toruň düzgünlerine eýerýän we laýyklyk synaglaryndan geçen gapjyklar.",
      },
      {
        key: "technology",
        icon: Code,
        title: "Tehnologiýa we durmuşa geçiriş hyzmatdaşlary",
        desc: "Açyk paketleriň üstünde çözgüt döredýän we guramalaryň goşulmagyna kömek edýän edaralar.",
      },
      {
        key: "ecosystem",
        icon: Sprout,
        title: "Ekoulgam",
        desc: "Tory goldaýan tehnologiýa merkezleri, birleşikler we jemgyýetler.",
      },
    ],
    ctaTitle: "Siz hem goşulmak isleýärsiňizmi?",
    ctaText:
      "Guramalar, gapjyk üpjün edijiler we döwletler şol bir açyk tertip bilen goşulýar.",
    cta: "Tora goşul",
  },
};

const pick = (raw: string): Locale =>
  ["en", "tr", "tk"].includes(raw) ? (raw as Locale) : "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = C[pick(locale)];
  return pageMeta(locale, "/partners", {
    title: c.title,
    description: c.description,
  });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const c = C[pick(raw)];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.lead} />
      <div className="shell space-y-14 py-14 sm:py-16">
        {c.groups.map((g) => {
          const Icon = g.icon;
          return (
            <section
              key={g.key}
              aria-labelledby={`grp-${g.key}`}
              className="grid gap-6 border-t border-border pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
            >
              <div className="space-y-3">
                <Icon
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden
                  className="text-primary"
                />
                <h2
                  id={`grp-${g.key}`}
                  className="font-serif text-2xl font-semibold tracking-[-0.02em] text-foreground"
                >
                  {g.title}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
                  {g.desc}
                </p>
              </div>
              {partnersIn(g.key as PartnerGroup).length ? (
                <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
                  {partnersIn(g.key as PartnerGroup).map((p) => (
                    <li key={p.name} className="group relative flex min-h-24 items-center justify-center rounded-xl border border-border bg-background-elevated px-4 py-5">
                      {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="absolute inset-0 rounded-xl focus-visible:outline-2 focus-visible:outline-primary" /> : null}
                      {p.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.logo} alt={p.name} className="max-h-12 max-w-full w-auto opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 dark:invert" />
                      ) : (
                        <span className="font-serif font-semibold">{p.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex min-h-[140px] flex-col items-start justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-background px-6 py-8">
                  <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-primary">
                    {c.soon}
                  </span>
                  <p className="text-sm text-foreground-muted">{c.soonNote}</p>
                </div>
              )}
            </section>
          );
        })}

        <section className="flex flex-col items-start justify-between gap-6 rounded-xl border border-border bg-surface px-6 py-8 sm:flex-row sm:items-center sm:px-8">
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl font-semibold tracking-[-0.01em] text-foreground">
              {c.ctaTitle}
            </h2>
            <p className="text-sm text-foreground-muted">{c.ctaText}</p>
          </div>
          <Link
            href="/join"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-contrast transition-colors hover:bg-primary-strong"
          >
            {c.cta}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </section>
      </div>
    </>
  );
}

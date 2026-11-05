import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { LEARN_PAGES } from "@/content/learn";
import { PUBLISHED, blogPath } from "@/lib/blog";
import { teamSlugs } from "@/content/team";
import { PUBLICATIONS } from "@/content/publications";
import { gitLastModified, latest } from "@/lib/lastmod";

const BASE = "https://tamga.network";
const APP = "src/app/[locale]";

// The href type accepted by getPathname (a subset of the <Link> href type).
type SHref = Parameters<typeof getPathname>[0]["href"];

/*
 * lastmod kuralı (Google yalnız doğru lastmod'a güvenir; changefreq/priority'yi yok sayar, bu yüzden yazılmaz):
 * - blog yazısı: yazının `updated` ya da `date` alanı;
 * - diğer sayfalar: sayfanın ve içerik dosyasının son commit tarihi (src/lib/lastmod.ts). messages/*.json bilinçli olarak
 *   sayılmaz — her metin düzeltmesi bütün sayfaları "değişti" gösterirdi;
 * - PDF'ler: dosyanın son commit tarihi.
 * Tarih bulunamazsa lastmod yazılmaz; asla derleme anı ("bugün") yazılmaz.
 */

/** Sabit sayfa → sayfa klasörü + içerik kaynağı. */
const STATIC: [SHref, string[]][] = [
  ["/", [`${APP}/page.tsx`, "src/content/home.tsx"]],
  ["/about", [`${APP}/about`, "src/content/about.tsx"]],
  ["/manifesto", [`${APP}/manifesto`, "src/content/manifesto.tsx"]],
  ["/scenarios", [`${APP}/scenarios`, "src/content/scenarios.tsx"]],
  ["/whitepaper", [`${APP}/whitepaper`, "src/content/whitepaper.generated.ts", "src/content/whitepaper-page.ts"]],
  ["/learn", [`${APP}/learn/page.tsx`, "src/content/learn"]],
  ["/blog", [`${APP}/blog/page.tsx`]],
  ["/join", [`${APP}/join`, "src/content/join.tsx"]],
  ["/network", [`${APP}/network`, "src/lib/ecosystem.ts"]],
  ["/partners", [`${APP}/partners`, "src/content/partners.ts"]],
  ["/team", [`${APP}/team/page.tsx`, "src/content/team"]],
  ["/publications", [`${APP}/publications`, "src/content/publications"]],
  ["/events", [`${APP}/events`, "src/content/events.ts"]],
  ["/roadmap", [`${APP}/roadmap`, "src/content/roadmap.tsx"]],
  ["/changelog", [`${APP}/changelog`, "src/content/changelog.tsx"]],
  ["/sdk", [`${APP}/sdk`, "src/content/sdk.tsx", "src/content/examples.generated.ts"]],
  ["/brand", [`${APP}/brand`, "src/content/brand.tsx"]],
];

/** Learn bölüm dosyası: src/content/learn/0<n>-*.tsx */
const learnFiles = readdirSync("src/content/learn");
const chapterFile = (n: number) => {
  const f = learnFiles.find((x) => x.startsWith(`${String(n).padStart(2, "0")}-`));
  return f ? `src/content/learn/${f}` : "src/content/learn";
};

const day = (d: string | null) => (d ? new Date(`${d}T00:00:00Z`) : undefined);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Bütün dillerde aynı yolla bulunan sayfalar (hreflang: dört dil + x-default).
  const pages: [SHref, Date | undefined][] = [
    ...STATIC.map(([href, src]): [SHref, Date | undefined] => {
      const d = gitLastModified(...src);
      // Blog dizini: en yeni yazının tarihi de sayılır.
      if (href === "/blog") return [href, latest(d, ...PUBLISHED.map((p) => day(p.updated ?? p.date)))];
      return [href, d];
    }),
    // Öğren sayfaları (eski /docs genel belgeleri Learn'e taşındığı için site haritasında yok)
    ...LEARN_PAGES.map((p): [SHref, Date | undefined] => [
      { pathname: "/learn/[slug]", params: { slug: p.slug } },
      gitLastModified(chapterFile(p.chapter)),
    ]),
    // Ekip üyelerinin profilleri
    ...teamSlugs().map((slug): [SHref, Date | undefined] => [
      { pathname: "/team/[slug]", params: { slug } },
      gitLastModified(`src/content/team/${slug}.ts`, `${APP}/team/[slug]`),
    ]),
  ];

  for (const [href, lastModified] of pages) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE}${getPathname({ href, locale: l })}`]),
    );
    languages["x-default"] = `${BASE}${getPathname({ href, locale: routing.defaultLocale })}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}${getPathname({ href, locale })}`,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
      });
    }
  }

  // Blog: yalnız yayımlanan yazılar ve yalnız yazının gerçekten yazıldığı diller (tk çevirisi yoksa tk adresi yok).
  for (const p of PUBLISHED) {
    const path = blogPath(p.slug);
    const languages: Record<string, string> = Object.fromEntries(
      p.locales.map((l) => [l, `${BASE}/${l}${path}`]),
    );
    languages["x-default"] = `${BASE}/${routing.defaultLocale}${path}`;
    for (const locale of p.locales) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        ...(day(p.updated ?? p.date) ? { lastModified: day(p.updated ?? p.date) } : {}),
        alternates: { languages },
      });
    }
  }

  // PDF'ler: whitepaper, manifesto ve yayımlanan akademik çalışmalar (sayfalarda bağlantılı; burada da listelenir).
  const pdfs = [
    ...routing.locales.flatMap((l) => [`/whitepaper-${l}.pdf`, `/manifesto-${l}.pdf`]),
    ...PUBLICATIONS.flatMap((p) => p.versions.map((v) => v.file).filter((f): f is string => !!f)),
  ];
  for (const file of pdfs) {
    const lastModified = gitLastModified(`public${file}`);
    entries.push({ url: `${BASE}${file}`, ...(lastModified ? { lastModified } : {}) });
  }

  return entries;
}

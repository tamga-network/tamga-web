import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { learnSlugs } from "@/content/learn";
import { PUBLISHED, blogPath } from "@/lib/blog";

const BASE = "https://tamga.network";

// The href type accepted by getPathname (a subset of the <Link> href type).
type SHref = Parameters<typeof getPathname>[0]["href"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticHrefs: SHref[] = [
    "/",
    "/about",
    "/manifesto",
    "/scenarios",
    "/whitepaper",
    "/learn",
    "/blog",
    "/join",
    "/network",
    "/partners",
    "/events",
    "/roadmap",
    "/changelog",
    "/sdk",
    "/brand",
  ];
  // Öğren sayfaları (eski /docs genel belgeleri Learn'e taşındığı için site haritasında yok)
  const learnRoutes: SHref[] = learnSlugs().map((slug) => ({ pathname: "/learn/[slug]", params: { slug } }));
  const hrefs: SHref[] = [...staticHrefs, ...learnRoutes];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const href of hrefs) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE}${getPathname({ href, locale: l })}`]),
    );
    languages["x-default"] = `${BASE}${getPathname({ href, locale: routing.defaultLocale })}`;
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}${getPathname({ href, locale })}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: href === "/" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  // Blog: yalnız yayımlanan yazılar ve yalnız yazının gerçekten yazıldığı diller (tk çevirisi yoksa tk adresi yok).
  for (const p of PUBLISHED) {
    const path = blogPath(p.slug);
    const languages: Record<string, string> = Object.fromEntries(p.locales.map((l) => [l, `${BASE}/${l}${path}`]));
    languages["x-default"] = `${BASE}/${routing.defaultLocale}${path}`;
    for (const locale of p.locales) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(`${p.updated ?? p.date}T00:00:00Z`),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}

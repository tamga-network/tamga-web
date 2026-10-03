import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { learnSlugs } from "@/content/learn";
import { allSlugs } from "@/lib/blog";

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
  const blogRoutes: SHref[] = allSlugs().map((slug) => ({
    pathname: "/blog/[slug]",
    params: { slug },
  }));
  const hrefs: SHref[] = [...staticHrefs, ...learnRoutes, ...blogRoutes];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const href of hrefs) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE}${getPathname({ href, locale: l })}`]),
    );
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

  return entries;
}

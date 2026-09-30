import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { docHrefs } from "@/lib/docs-nav";
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
    "/docs",
    "/blog",
    "/issuers",
    "/roadmap",
    "/changelog",
  ];
  const docRoutes = docHrefs.filter((h) => h !== "/docs") as unknown as SHref[];
  const blogRoutes: SHref[] = allSlugs().map((slug) => ({
    pathname: "/blog/[slug]",
    params: { slug },
  }));
  const hrefs: SHref[] = [...staticHrefs, ...docRoutes, ...blogRoutes];

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

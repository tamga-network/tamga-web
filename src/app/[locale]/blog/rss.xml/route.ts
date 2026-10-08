import { routing } from "@/i18n/routing";
import { PUBLISHED, blogPath, isFallback, postText } from "@/lib/blog";
import { categoryLabel, getBlogUi } from "@/lib/blog-ui";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/**
 * Blog RSS akışı, dil başına: /en/blog/rss.xml, /tr/blog/rss.xml, /tk/blog/rss.xml. Yalnız yayımlanan yazılar (taslak hiçbir
 * zaman). tk akışında Türkmencesi olmayan yazı İngilizce başlık ve özetle yer alır. Derlemede statik dosya olarak üretilir.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();
const LANG: Record<string, string> = { en: "en", tr: "tr-TR", tk: "tk-TM" };

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const ui = getBlogUi(locale);
  const link = (path: string) => `${SITE_URL}/${locale}${path}`;
  const items = PUBLISHED.map((p) => {
    const x = postText(p, locale);
    const url = link(blogPath(p.slug));
    return `    <item>
      <title>${esc(x.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(url)}</guid>
      <description>${esc(x.description)}</description>
      <category>${esc(categoryLabel(p.category, locale))}</category>
      <dc:creator>${esc(ui.author)}</dc:creator>${isFallback(p, locale) ? "\n      <dc:language>en</dc:language>" : ""}
      ${p.date ? `<pubDate>${rfc822(p.date)}</pubDate>` : ""}
    </item>`;
  }).join("\n");
  const latest = PUBLISHED.find((p) => p.date)?.date;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`${ui.title} · ${SITE_NAME}`)}</title>
    <link>${esc(link("/blog"))}</link>
    <atom:link href="${esc(link("/blog/rss.xml"))}" rel="self" type="application/rss+xml" />
    <description>${esc(ui.description)}</description>
    <language>${LANG[locale] ?? "en"}</language>
${latest ? `    <lastBuildDate>${rfc822(latest)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

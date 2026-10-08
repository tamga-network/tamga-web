import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";
import { POSTS, postBySlug, postText } from "@/lib/blog";
import { categoryLabel, getBlogUi } from "@/lib/blog-ui";

/**
 * Yazıya özel paylaşım görseli: /<dil>/blog/<slug>/og.png — koyu bant #101820, N1 işareti (açık Gök), "Tamga Network · BLOG",
 * kategori (açık Gök), başlık (Onest 600), altın kısa çizgi. Kapak (`cover`) olan yazıda paylaşımda kapak kullanılır.
 * Derlemede statik dosya olarak üretilir.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = POSTS.length ? POSTS.map((p) => p.slug) : ["_"];
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = postBySlug(slug);
  if (!p) return new Response("Not found", { status: 404 });
  const x = postText(p, locale);
  const ui = getBlogUi(locale);
  const onest = readFileSync(join(process.cwd(), "assets", "og", "Onest-600.ttf"));
  const onDark = join(process.cwd(), "public", "brand", "tamga-network-on-dark.svg");
  const mark = readFileSync(existsSync(onDark) ? onDark : join(process.cwd(), "public", "mark.svg"));
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;
  const size = x.title.length > 80 ? 52 : x.title.length > 50 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101820",
          padding: "72px 88px",
          fontFamily: "Onest",
          color: "#F4F7F9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={63} height={60} alt="" />
          <div style={{ display: "flex", marginLeft: 22, fontSize: 30, letterSpacing: -0.5 }}>Tamga Network</div>
          <div style={{ display: "flex", marginLeft: 18, fontSize: 22, letterSpacing: 4, color: "#9FB0BD" }}>
            {`· ${ui.eyebrow.toLocaleUpperCase(locale)}`}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#6FB3D2" }}>
            {categoryLabel(p.category, locale).toLocaleUpperCase(locale)}
          </div>
          <div style={{ display: "flex", fontSize: size, letterSpacing: -1.5, lineHeight: 1.1, marginTop: 18, maxWidth: 1020 }}>
            {x.title}
          </div>
        </div>
        <div style={{ display: "flex", width: 120, height: 4, background: "#C8A24C" }} />
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: "Onest", data: onest, weight: 600, style: "normal" }] },
  );
}

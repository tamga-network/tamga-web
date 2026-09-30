import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Paylaşım görseli: marka işareti (public/mark.svg — tek kaynaktan, npm run brand:sync) Obsidyen zeminde, ad ve dile göre
// alt başlık. Renkler marka tablosundan: Obsidyen #17110F, Parşömen #F4EDE2, Altın #C8A24C.
export const alt = "Tamga Network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const mark = readFileSync(join(process.cwd(), "public", "mark.svg"));
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#17110F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={280} height={280} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: -3,
            color: "#F4EDE2",
          }}
        >
          Tamga Network
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 30,
            letterSpacing: 10,
            color: "#C8A24C",
          }}
        >
          {t("tagline")}
        </div>
      </div>
    ),
    { ...size },
  );
}

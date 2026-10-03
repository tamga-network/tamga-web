import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Paylaşım görseli: ağ işareti (açık Gök, public/brand/tamga-network-on-dark.svg — npm run brand:sync; yoksa public/mark.svg)
// koyu bant #101820 üstünde, ad ve dile göre alt başlık. Renkler: açık Gök #6FB3D2, metin #F4F7F9.
export const alt = "Tamga Network";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const onDark = join(process.cwd(), "public", "brand", "tamga-network-on-dark.svg");
  const mark = readFileSync(existsSync(onDark) ? onDark : join(process.cwd(), "public", "mark.svg"));
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
          background: "#101820",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={250} height={238} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 92,
            fontWeight: 600,
            letterSpacing: -3,
            color: "#F4F7F9",
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
            color: "#6FB3D2",
          }}
        >
          {t("tagline")}
        </div>
      </div>
    ),
    { ...size },
  );
}

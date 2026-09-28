import { ImageResponse } from "next/og";

// Social share image — the header logo (hexagon seal + tamga glyph) on the brand
// dark background, with the wordmark. Rendered to PNG at build time by next/og.
export const alt = "Tamga Network — Digital Trust Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The logo mark, identical to the header LogoMark (src/components/logo.tsx):
// gold hexagon seal + al-kızıl tamga glyph. Pure vector — no font needed.
const MARK = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 4 L86 24 V60 L50 96 L14 60 V24 Z' fill='none' stroke='#e0bf6f' stroke-width='3'/><path d='M50 22 V70 M32 40 L50 22 L68 40 M34 62 H66' fill='none' stroke='#e0554b' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/></svg>`;

export default function Image() {
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`;

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
          background: "#131314",
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
            color: "#f4f3f1",
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
            color: "#e0bf6f",
          }}
        >
          DIGITAL TRUST INFRASTRUCTURE
        </div>
      </div>
    ),
    { ...size }
  );
}

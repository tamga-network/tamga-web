import type { MetadataRoute } from "next";

// Ana ekrana ekleme / uygulama bilgisi. Simgeler tek kaynaktan (npm run brand:sync).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tamga Network",
    short_name: "Tamga",
    description: "Digital Trust Infrastructure — verifiable credentials on open standards.",
    start_url: "/",
    display: "standalone",
    background_color: "#101820",
    theme_color: "#101820",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

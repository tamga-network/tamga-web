// Marka simgeleri tek kaynaktan: ../tamga-network/ops/brand/icons (build-icons.mjs üretir) → public/ ve src/app/favicon.ico.
// Logo değişince: tamga-network'te `node ops/brand/build-icons.mjs`, burada `npm run brand:sync` (çıktılar depoya girer —
// bu depo yan klasör olmadan da derlenir). Başlık logosu src/components/logo.tsx, paylaşım görseli opengraph-image.tsx.
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const web = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = resolve(web, "../tamga-network/ops/brand/icons");
if (!existsSync(src)) {
  console.log("brand:sync: ../tamga-network/ops/brand/icons yok — atlandı");
  process.exit(0);
}
const files = ["icon.svg", "mark.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "logo-512.png", "og.png"];
for (const f of files) copyFileSync(join(src, f), join(web, "public", f));
copyFileSync(join(src, "favicon.ico"), join(web, "src", "app", "favicon.ico"));
console.log(`brand:sync: ${files.length + 1} dosya`);

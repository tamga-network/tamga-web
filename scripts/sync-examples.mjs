// Kod örneklerini tek kaynaktan alır: ../tamga-network/examples (testte gerçek paketlerle çalışan dosyalar) →
// src/content/examples.generated.ts. Sitede elle kopyalanmış kod bayatlamasın diye.
//   node scripts/sync-examples.mjs          → dosyayı üretir
//   node scripts/sync-examples.mjs --check  → üretilen dosya kaynakla aynı değilse hata (npm run check)
// ../tamga-network yoksa (yalnızca site deposu) kontrol atlanır ve bunu söyler.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "../../tamga-network/examples");
const out = resolve(here, "../src/content/examples.generated.ts");
const FILES = {
  webLoginServer: "01-web-login/server.ts",
  webLoginPage: "01-web-login/page.html",
  verifyOwnServer: "02-verify-own-server/verifier.ts",
  issueHosted: "03-issue-hosted/issuer.ts",
  checkInstitution: "04-check-institution/check.ts",
};

if (!existsSync(src)) {
  console.log("examples: ../tamga-network/examples yok — atlandı");
  process.exit(0);
}
const body = Object.entries(FILES)
  .map(([k, f]) => `  ${k}: ${JSON.stringify(readFileSync(join(src, f), "utf8").replace(/\r\n/g, "\n").trimEnd())},`)
  .join("\n");
const text = `// ÜRETİLDİ — elle düzenlemeyin. Kaynak: tamga-network/examples (npm run examples:sync)
export const EXAMPLES = {
${body}
} as const;
`;
if (process.argv.includes("--check")) {
  const cur = existsSync(out) ? readFileSync(out, "utf8").replace(/\r\n/g, "\n") : "";
  if (cur !== text) {
    console.error("examples: src/content/examples.generated.ts eski — npm run examples:sync çalıştırın");
    process.exit(1);
  }
  console.log(`examples: ${Object.keys(FILES).length} örnek güncel`);
} else {
  writeFileSync(out, text);
  console.log(`examples: ${Object.keys(FILES).length} örnek yazıldı → src/content/examples.generated.ts`);
}

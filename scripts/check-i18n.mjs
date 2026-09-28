// Üç dilin (en/tr/tk) arayüz metinlerinde anahtar kümesi aynı mı? (iç içe anahtarlar dahil)
import { readFileSync } from "node:fs";
const keys = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
const langs = ["en", "tr", "tk"];
const sets = Object.fromEntries(langs.map((l) => [l, new Set(keys(JSON.parse(readFileSync(`messages/${l}.json`, "utf8"))))]));
let bad = 0;
for (const a of langs)
  for (const b of langs) {
    if (a === b) continue;
    const missing = [...sets[a]].filter((k) => !sets[b].has(k));
    if (missing.length) {
      bad++;
      console.error(`${b}.json'da eksik (${a}'da var): ${missing.join(", ")}`);
    }
  }
if (bad) process.exit(1);
console.log(`i18n: ${sets.en.size} anahtar, üç dilde aynı`);

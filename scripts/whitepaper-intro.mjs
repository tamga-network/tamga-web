// /whitepaper tanıtım sayfasının verisini whitepaper Markdown kaynaklarından üretir → src/content/whitepaper.generated.ts
// Kullanım: node scripts/whitepaper-intro.mjs <WP-en.md> <WP-tr.md> <WP-tk.md> <WP-az.md>
// (dil, her dosyanın ön bilgisindeki `dil` alanından okunur; kaynak dosyalar bu depoda değildir.)
// Alınanlar: ön bilgi (baslik, altbaslik, tarih, surum, lisans, atif, anahtar_kelimeler), ilk "## " bölümü (özet) ve
// "## " başlıkları (okuma kılavuzu hariç: numaralı bölümler, ekler, kaynaklar). Markdown işaretleri ve [n] atıfları temizlenir.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "src/content/whitepaper.generated.ts");
const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("kullanım: node scripts/whitepaper-intro.mjs <WP-en.md> <WP-tr.md> …");
  process.exit(1);
}

const clean = (s) =>
  s
    .replace(/\s*\[\d+(?:\s*[,–-]\s*\d+)*\]/g, "") // [12], [3, 4], [5–7]
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const data = {};
for (const file of files) {
  let md = readFileSync(file, "utf8").replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) throw new Error(`${file}: ön bilgi yok`);
  const fm = {};
  for (const l of fmMatch[1].split("\n")) {
    const m = l.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (v.startsWith("[")) v = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^"|"$/g, "")).filter(Boolean);
    else v = v.replace(/^"|"$/g, "").replace(/\\"/g, '"');
    fm[m[1]] = v;
  }
  md = md.slice(fmMatch[0].length);

  const parts = md.split(/^## /m).slice(1); // [ "Başlık\n\ngövde", … ]
  const [absHead, ...absBodyLines] = parts[0].split("\n");
  const absBody = absBodyLines.join("\n").split(/^---$/m)[0];
  const paras = absBody
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const kwPara = paras.find((p) => /^\*\*[^*]+:\*\*/.test(p));
  const keywordsLabel = kwPara ? kwPara.match(/^\*\*([^*]+):\*\*/)[1] : "";
  const abstract = paras.filter((p) => p !== kwPara).map(clean);

  const sections = [];
  for (const p of parts.slice(2)) {
    // 0: özet, 1: okuma kılavuzu
    const head = clean(p.split("\n")[0]);
    let m;
    if ((m = head.match(/^(\d+)\.\s+(.+)$/))) sections.push({ n: m[1], title: m[2], kind: "chapter" });
    else if ((m = head.match(/^(\S+)\s+([A-Z])\s+—\s+(.+)$/)))
      sections.push({ n: m[2], title: m[3], kind: "appendix", label: `${m[1]} ${m[2]}` });
    else sections.push({ n: "", title: head, kind: "references" });
  }
  const chapters = sections.filter((s) => s.kind === "chapter").length;
  if (chapters !== 24) console.warn(`${fm.dil}: ${chapters} numaralı bölüm (24 bekleniyordu)`);

  data[fm.dil] = {
    title: fm.baslik,
    subtitle: fm.altbaslik,
    date: fm.tarih,
    version: fm.surum,
    license: fm.lisans,
    citation: fm.atif,
    abstractLabel: clean(absHead),
    abstract,
    keywordsLabel,
    keywords: fm.anahtar_kelimeler ?? [],
    sections,
  };
  console.log(`${fm.dil}: ${abstract.length} özet paragrafı, ${sections.length} başlık`);
}

const body = `// ÜRETİLDİ — elle düzenlemeyin. Kaynak: whitepaper Markdown metinleri (node scripts/whitepaper-intro.mjs <WP-*.md>)
export type WhitepaperSectionEntry = {
  n: string;
  title: string;
  kind: "chapter" | "appendix" | "references";
  /** Ekler için yazıldığı biçimde etiket, ör. "Ek A". */
  label?: string;
};

export type WhitepaperIntroData = {
  title: string;
  subtitle: string;
  date: string;
  version: string;
  license: string;
  citation: string;
  abstractLabel: string;
  abstract: string[];
  keywordsLabel: string;
  keywords: string[];
  sections: WhitepaperSectionEntry[];
};

export const WHITEPAPER_INTRO: Record<string, WhitepaperIntroData> = ${JSON.stringify(data, null, 2)};
`;
writeFileSync(out, body);
console.log(`yazıldı: ${out}`);

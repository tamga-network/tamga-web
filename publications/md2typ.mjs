// Akademik çalışma Markdown'ını Typst'e çevirir (şablon: template.typ).
// Kullanım: node publications/md2typ.mjs <yazı.md>
// Çıktı: publications/<kimlik>-<dil>.typ (ön bilgideki `kimlik` ve `dil` alanlarından).
//
// Desteklenen Markdown (dizgi kuralları yazı kaynağının yanındaki DIZGI.md'de):
//   ## / ### başlıklar (baştaki "1." "2.1" numaraları atılır; numarasız başlık numarasız kalır)
//   paragraf, **kalın**, *eğik*, `kod`; - ve 1. listeleri; tablo (üstünde **Tablo N.** satırı)
//   ```sekil blokları → figures/<numara>/sekil-N.svg; ```dil kod blokları
//   > [!TEKNIK|ORNEK|TARIHCE|ONEMLI] Başlık kutuları; Kaynaklar'da [n] satırları; <!-- --> yorumları atılır.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
if (!src) {
  console.error("kullanım: node publications/md2typ.mjs <yazı.md>");
  process.exit(1);
}

let md = readFileSync(src, "utf8").replace(/\r\n/g, "\n");
md = md.replace(/<!--[\s\S]*?-->/g, "");

// ---------- ön bilgi ----------
const fm = {};
const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
if (!fmMatch) throw new Error("ön bilgi (front matter) yok");
for (const l of fmMatch[1].split("\n")) {
  const m = l.match(/^(\w+):\s*(.*)$/);
  if (!m) continue;
  let v = m[2].trim();
  if (v.startsWith("[")) v = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  else v = v.replace(/^"|"$/g, "").replace(/\\"/g, '"');
  fm[m[1]] = v;
}
md = md.slice(fmMatch[0].length);
for (const k of ["kimlik", "dil", "numara", "baslik", "yazar"]) if (!fm[k]) throw new Error(`ön bilgide ${k} yok`);

// ---------- kaçış ----------
const str = (s) => `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
function escText(s) {
  // düz kesme işareti → ’ (Typst rakamdan sonra ′ basıyor: "1990'lar")
  s = s.replace(/'/g, "’");
  return s.replace(/[\\#$*_`<>@\[\]~\/{}]/g, (c) => "\\" + c);
}
function inline(s) {
  let out = "";
  const re = /(`[^`]+`)|(\*\*(.+?)\*\*)|(\*([^*\s][^*]*?)\*)/g;
  let last = 0;
  let m;
  while ((m = re.exec(s))) {
    out += escText(s.slice(last, m.index));
    if (m[1]) out += `#{raw(${str(m[1].slice(1, -1))})}`;
    else if (m[2]) out += `#{strong[${inline(m[3])}]}`;
    else out += `#{emph[${inline(m[5])}]}`;
    last = re.lastIndex;
  }
  out += escText(s.slice(last));
  // satır başında liste/başlık işareti sayılabilecek karakterler
  return out.replace(/^([=+\-])/, "\\$1").replace(/^(\d+)\./, "$1\\.");
}

// ---------- bloklar ----------
const figDir = `figures/${String(fm.numara).toLowerCase()}`;
const KUTU = { TEKNIK: "teknik", ORNEK: "ornek", TARIHCE: "tarihce", ONEMLI: "onemli" };

function blocks(lines, ctx = {}) {
  const out = [];
  let i = 0;
  let pendingCaption = null;
  // Paragrafı yalnız "- " ya da "1. " ile başlayan liste böler (CommonMark): sarılmış bir satırın "433. " ile başlaması liste değildir.
  const isBlockStart = (l) =>
    /^#{2,3} /.test(l) || /^```/.test(l) || /^> /.test(l) || /^>$/.test(l) || /^\|/.test(l) || /^(- |1\. )/.test(l) || /^---\s*$/.test(l);

  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---\s*$/.test(l)) {
      i++;
      continue;
    }
    // başlık
    let h = l.match(/^(#{2,3}) (.+)$/);
    if (h) {
      const level = h[1].length - 1;
      const raw = h[2].trim();
      // Numaralı başlık: "## 3. …" (bölüm) ya da "### 3.2 …" (alt bölüm). Ekteki "### 1. adım" numaralı sayılmaz.
      const num = level === 1 ? raw.match(/^\d+\.?\s+/) : raw.match(/^\d+\.\d+\.?\s+/);
      const title = inline(num ? raw.slice(num[0].length) : raw);
      out.push(num ? `${"=".repeat(level)} ${title}` : `#heading(level: ${level}, numbering: none)[${title}]`);
      if (raw.startsWith("Kaynaklar")) ctx.refs = true;
      else if (level === 1) ctx.refs = false;
      i++;
      continue;
    }
    // kod / şekil
    let f = l.match(/^```(\w*)\s*$/);
    if (f) {
      const lang = f[1];
      const body = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) body.push(lines[i++]);
      i++;
      if (lang === "sekil") {
        const get = (k) => (body.find((b) => b.startsWith(k + ":")) || "").slice(k.length + 1).trim().replace(/^"|"$/g, "");
        const no = get("no");
        out.push(`#sekil(${no}, [${inline(get("baslik"))}], ${str(`${figDir}/sekil-${no}.svg`)}, yarim: ${get("yerlesim") === "yarim"})`);
      } else {
        out.push(`#kod(${str(lang || "text")}, ${str(body.join("\n"))})`);
      }
      continue;
    }
    // kutu
    let k = l.match(/^> \[!(\w+)\]\s*(.*)$/);
    if (k) {
      const inner = [];
      i++;
      while (i < lines.length && /^>( |$)/.test(lines[i])) inner.push(lines[i++].replace(/^> ?/, ""));
      const tur = KUTU[k[1].toUpperCase()] || "onemli";
      out.push(`#kutu(${str(tur)}, [${inline(k[2])}])[\n${blocks(inner).join("\n\n")}\n]`);
      continue;
    }
    // tablo
    if (/^\|/.test(l)) {
      const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = rows.map((r) => r.replace(/^\||\|\s*$/g, "").split("|").map((c) => c.trim()));
      const header = cells[0];
      const body = cells.slice(2);
      const n = header.length;
      const lens = header.map((_, c) => Math.max(...cells.filter((_, ri) => ri !== 1).map((r) => (r[c] || "").length)));
      const cols = lens.map((L) => `${Math.min(Math.max(L, 4), 48)}fr`);
      const cap = pendingCaption ?? "[]";
      pendingCaption = null;
      out.push(
        `#tablo(${cap}, (${cols.join(", ")}), (${header.map((c) => `[${inline(c)}]`).join(", ")},), (\n` +
          body.map((r) => `  (${Array.from({ length: n }, (_, c) => `[${inline(r[c] || "")}]`).join(", ")},),`).join("\n") +
          `\n))`,
      );
      continue;
    }
    // liste
    let li = l.match(/^(- |(\d+)\. )(.*)$/);
    if (li) {
      const items = [];
      while (i < lines.length) {
        const m2 = lines[i].match(/^(- |(\d+)\. )(.*)$/);
        if (m2) {
          items.push({ num: !!m2[2], text: m2[3] });
          i++;
        } else if (/^\s{2,}\S/.test(lines[i]) && items.length) {
          items[items.length - 1].text += " " + lines[i].trim();
          i++;
        } else break;
      }
      out.push(items.map((it) => `${it.num ? "+" : "-"} ${inline(it.text)}`).join("\n"));
      continue;
    }
    // paragraf
    const para = [];
    while (i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i]))) para.push(lines[i++].trim());
    const text = para.join(" ");
    const cap = text.match(/^\*\*(Tablo [^*]+)\*\*\s*(.*)$/);
    if (cap) {
      pendingCaption = `[#{strong[${inline(cap[1])}]} ${inline(cap[2])}]`;
      continue;
    }
    const ref = text.match(/^\[(\d+)\]\s+(.*)$/);
    if (ctx.refs && ref) {
      out.push(`#kaynak(${str(ref[1])})[${inline(ref[2])}]`);
      continue;
    }
    out.push(inline(text));
  }
  return out;
}

// ---------- Özet bölümünü ayır ----------
const lines = md.split("\n");
const ozetStart = lines.findIndex((l) => /^## Özet\s*$/.test(l));
let ozetEnd = lines.findIndex((l, idx) => idx > ozetStart && (/^## /.test(l) || /^---\s*$/.test(l)));
const ozetLines = [];
for (const l of lines.slice(ozetStart + 1, ozetEnd)) {
  // "**Anahtar kelimeler:**" paragrafı (birden çok satır olabilir) ön bilgiden gelir; atılır
  if (/^\*\*Anahtar kelimeler:\*\*/.test(l)) ozetLines.push("\u0000");
  else if (ozetLines.at(-1) === "\u0000" && l.trim()) continue;
  else ozetLines.push(l);
}
const ozetClean = ozetLines.filter((l) => l !== "\u0000");
const bodyLines = lines.slice(ozetEnd);

const ctx = {};
const ozet = blocks(ozetClean).join("\n\n");
const body = blocks(bodyLines, ctx).join("\n\n");

const pdfUrl = `https://tamga.network/files/publications/${fm.kimlik}-${fm.dil}.pdf`;
const yil = (fm.tarih.match(/\d{4}/) || [""])[0];
const [ad, ...soy] = fm.yazar.split(" ");
const atif = `${soy.join(" ")}, ${ad[0]}. (${yil}). ${fm.baslik}: ${fm.altbaslik}. ${fm.dizi}, ${fm.numara}. ${pdfUrl}`;
const lisans =
  fm.lisans === "CC BY 4.0"
    ? `© ${yil} ${fm.yazar}. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr`
    : `© ${yil} ${fm.yazar}. ${fm.lisans}`;

const typ = `// ${fm.numara} — ${fm.baslik}. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak

#show: conf.with(
  lang: ${str(fm.dil)},
  dizi: ${str(fm.dizi)},
  baslik: ${str(fm.baslik)},
  altbaslik: ${str(fm.altbaslik)},
  yazar: ${str(fm.yazar)},
  kurum: ${str(fm.kurum)},
  tarih: ${str(fm.tarih)},
  surum: ${str(fm.surum)},
  lisans: ${str(lisans)},
  anahtar: (${fm.anahtar_kelimeler.map(str).join(", ")},),
  atif: ${str(atif)},
  ozet: [
${ozet}
  ],
)

${body}
`;

const outFile = join(here, `${fm.kimlik}-${fm.dil}.typ`);
writeFileSync(outFile, typ);
console.log("yazıldı:", outFile);

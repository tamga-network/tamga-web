// Dış bağlantı kuralı: src/ altındaki JSX'te adresi http(s) ile başlayan her <a> yeni sekmede açılmalı
// (target="_blank" rel="noopener noreferrer" ya da EXTERNAL_ATTRS); en kolayı <ExternalLink> (src/components/external-link.tsx).
// Blog/markdown bağlantıları SmartLink'ten (src/components/blog/rich.tsx) geçer, orada merkezi olarak ele alınır.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src/", import.meta.url));

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.tsx$/.test(name)) yield p;
  }
}

/** `<a ...>` açılış etiketini { } iç içeliğini sayarak keser (JSX ifadelerindeki `>` etiketi bitirmez). */
function openingTag(src, start) {
  let depth = 0;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    else if (ch === ">" && depth === 0) return src.slice(start, i + 1);
  }
  return src.slice(start);
}

const problems = [];
for (const file of walk(root)) {
  const src = readFileSync(file, "utf8");
  const re = /<a[\s\n]/g;
  let m;
  while ((m = re.exec(src))) {
    const tag = openingTag(src, m.index);
    const literalExternal = /href=(?:"(?:https?:)?\/\/|\{\s*`(?:https?:)?\/\/)/.test(tag);
    if (!literalExternal) continue;
    if (/target=|EXTERNAL_ATTRS/.test(tag)) continue;
    const line = src.slice(0, m.index).split("\n").length;
    problems.push(`${relative(root, file)}:${line}  ${tag.replace(/\s+/g, " ").slice(0, 100)}`);
  }
}

if (problems.length) {
  console.error(`Dış bağlantı yeni sekmede açılmıyor (${problems.length}). <ExternalLink> kullan:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log("external links: ok");

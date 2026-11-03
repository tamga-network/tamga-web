// Akademik yayın şekilleri için küçük SVG yardımcıları (marka renkleri, IBM Plex Sans).
// Şekil dosyaları (ör. a1.mjs) bunları kullanır; çıktı figures/<yazı>/sekil-N.svg.

export const C = {
  gok: "#1E5A78",
  gok700: "#174A63",
  gok50: "#EEF5F8",
  gok100: "#D6E6EE",
  gold: "#C8A24C",
  gold50: "#FAF4E4",
  ink: "#14120F",
  muted: "#4A4740",
  rule: "#CFC7B6",
  paper: "#F8F6F1",
  red: "#A8432F",
  red50: "#F8ECE8",
  green: "#2F7A55",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const FONT = "IBM Plex Sans";

export function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}">
<defs>
  <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.gok}"/></marker>
  <marker id="arm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker>
  <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.red}"/></marker>
  <marker id="arg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.gold}"/></marker>
</defs>
<rect x="0" y="0" width="${w}" height="${h}" fill="#FFFFFF"/>
${body}
</svg>
`;
}

/** Metin; lines bir dizi ise alt alta yazılır. */
export function text(x, y, lines, o = {}) {
  const { size = 13, weight = 400, fill = C.ink, anchor = "middle", lh = 1.3, italic = false } = o;
  const arr = Array.isArray(lines) ? lines : [lines];
  const start = y - ((arr.length - 1) * size * lh) / 2;
  return arr
    .map(
      (l, i) =>
        `<text x="${x}" y="${(start + i * size * lh).toFixed(1)}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="middle"${italic ? ' font-style="italic"' : ""}>${esc(l)}</text>`,
    )
    .join("\n");
}

/** Kutu + ortalanmış metin. */
export function box(x, y, w, h, lines, o = {}) {
  const { fill = C.gok50, stroke = C.gok, size = 13, weight = 500, color = C.ink, r = 6, dash = false, sw = 1.4 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""}/>
${text(x + w / 2, y + h / 2, lines, { size, weight, fill: color })}`;
}

/** Ok (düz çizgi). kind: "" | "m" (gri) | "r" (kırmızı) | "g" (altın) */
export function arrow(x1, y1, x2, y2, o = {}) {
  const { kind = "", dash = false, sw = 1.6, both = false } = o;
  const color = { "": C.gok, m: C.muted, r: C.red, g: C.gold }[kind];
  const m = `ar${kind}`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""} marker-end="url(#${m})"${both ? ` marker-start="url(#${m})"` : ""}/>`;
}

export function line(x1, y1, x2, y2, o = {}) {
  const { stroke = C.rule, sw = 1, dash = false } = o;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="5 4"' : ""}/>`;
}

export function circle(cx, cy, r, o = {}) {
  const { fill = C.gok, stroke = "none", sw = 1 } = o;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

/** Basit insan simgesi (baş + gövde). */
export function person(cx, cy, s = 1, color = C.gok) {
  return `<circle cx="${cx}" cy="${cy - 14 * s}" r="${9 * s}" fill="${color}"/>
<path d="M${cx - 16 * s},${cy + 18 * s} Q${cx - 16 * s},${cy - 2 * s} ${cx},${cy - 2 * s} Q${cx + 16 * s},${cy - 2 * s} ${cx + 16 * s},${cy + 18 * s} z" fill="${color}"/>`;
}

/** Telefon simgesi (çerçeve). */
export function phone(x, y, w, h, color = C.gok) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#FFFFFF" stroke="${color}" stroke-width="2.4"/>
<rect x="${x + w / 2 - 18}" y="${y + 8}" width="36" height="5" rx="2.5" fill="${color}"/>`;
}

/** Küçük anahtar simgesi. */
export function key(x, y, color = C.gold, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="0" r="6" fill="none" stroke="${color}" stroke-width="2.4"/>
<path d="M6,0 H20 M15,0 V5 M19,0 V4" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
}

/** Küçük kilit simgesi. */
export function lock(x, y, color = C.red, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-8" y="-2" width="16" height="12" rx="2" fill="${color}"/>
<path d="M-5,-2 V-6 A5,5 0 0 1 5,-6 V-2" stroke="${color}" stroke-width="2.2" fill="none"/></g>`;
}

/** Veritabanı simgesi (silindir). */
export function db(cx, cy, color = C.gok, s = 1) {
  const w = 22 * s, h = 26 * s, e = 5 * s;
  return `<path d="M${cx - w / 2},${cy - h / 2} v${h} a${w / 2},${e} 0 0 0 ${w},0 v${-h}" fill="${C.gok50}" stroke="${color}" stroke-width="1.5"/>
<ellipse cx="${cx}" cy="${cy - h / 2}" rx="${w / 2}" ry="${e}" fill="${C.gok100}" stroke="${color}" stroke-width="1.5"/>`;
}

/**
 * Etiketin arkasına beyaz zemin: çizgiler yazının altından geçer. `text()` çıktısını alır, her satırın arkasına dikdörtgen koyar.
 * (paint-order="stroke" ile beyaz kenar Typst'in PDF çıktısında harfleri bozuyor; kullanılmaz.)
 */
export function halo(markup) {
  return markup.replace(/<text x="([\d.-]+)" y="([\d.-]+)" font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g, (m, x, y, fs, anchor, t) => {
    const size = +fs;
    const plain = t.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    const w = plain.length * size * 0.53 + 8;
    const x0 = anchor === "start" ? +x - 4 : anchor === "end" ? +x - w + 4 : +x - w / 2;
    return `<rect x="${x0.toFixed(1)}" y="${(+y - size * 0.72).toFixed(1)}" width="${w.toFixed(1)}" height="${(size * 1.44).toFixed(1)}" fill="#FFFFFF"/>\n${m}`;
  });
}

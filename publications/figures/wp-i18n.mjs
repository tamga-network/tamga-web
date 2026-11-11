// Whitepaper şekilleri 1–34, çevrilmiş sürümler için ortak üretici (wp.mjs'nin kopyası; metinler sözlükten).
// Doğrudan çalıştırılmaz: wp-en.mjs, wp-tk.mjs, wp-az.mjs bunu kendi sözlükleriyle çağırır → figures/wp-<dil>/sekil-N.svg.
// Sözlük anahtarı Türkçe metindir (wp.mjs'deki haliyle). Değer dize ise kutuda yeniden sarılır, dizi ise satırlar olduğu gibi.
// Çok satırlı Türkçe etiketler (dizi) önce " | " ile birleştirilmiş anahtarla aranır, yoksa satır satır.
// wp.mjs'de bir şekil değişirse burası da aynı biçimde güncellenmelidir.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text as rawText, arrow, line, circle, person, phone, key, lock, db, halo } from "./svg.mjs";

/** Teknik terimler, kod ve alan adları: hiçbir dilde çevrilmez. */
const KEEP = new Set([
  "heartbeat", "previous_version_hash", "OpenID4VCI", "OpenID4VP", "is_graduate: true", "grade: 3.71", "birth_date: …",
  "IETF Token Status List", "OpenID Foundation", "c_nonce", "4. /nonce", "2. GET request_uri", "mdoc", "SD-JWT VC (IETF) · mdoc (ISO/IEC 18013-5)", "Tamga Network", "Sandbox",
  "Aynur", "Timur", "Elif", "Nurlan",
  "status: idx 48213", "uri …/7f3a9c21", "uri …/c41f…", "site-a.example", "site-b.example", "Tamga Verify",
]);

export function build(lang, dict, lay = {}) {
const out = join(dirname(fileURLToPath(import.meta.url)), `wp-${lang}`);
mkdirSync(out, { recursive: true });
const miss = [];
const done = new Set();
const has = (k) => Object.prototype.hasOwnProperty.call(dict, k);
const mark = (r) => { (Array.isArray(r) ? r : [r]).forEach((l) => done.add(l)); return r; };
/** Tek dize → çeviri (dize ya da satır dizisi). */
function tone(s) {
  if (s == null || s === "" || done.has(s)) return s;
  if (has(s)) return mark(dict[s]);
  if (!/[a-zçğıöşü]/.test(s) || KEEP.has(s) || /^k=\d$/.test(s)) return s;
  if (!miss.includes(s)) miss.push(s);
  return s;
}
/** Dize ya da satır dizisi → çeviri. */
function tr(c) {
  if (c == null) return c;
  if (!Array.isArray(c)) return tone(c);
  const j = c.join(" | ");
  if (has(j)) return mark(dict[j]);
  const ok = c.every((l) => l === "" || done.has(l) || has(l) || !/[a-zçğıöşü]/.test(l) || KEEP.has(l) || /^k=\d$/.test(l));
  if (!ok) { if (!miss.includes(j)) miss.push(j); return c; }
  return c.flatMap((l) => { const r = tone(l); return Array.isArray(r) ? r : [r]; });
}
/** Kalıp: "sürüm {0}" → sözlükteki kalıp, sayı yerleştirilir. */
const fmt = (p, ...a) => mark(String(tone(p)).replace(/\{(\d)\}/g, (m, i) => a[+i]));
/** Çevrilmiş parçaları birleştirir (iki nokta, boşluk gibi bağlarla). */
const cat = (...parts) => mark(parts.map((p) => (Array.isArray(p) ? p.join(" ") : p)).join(""));
/** Yerleşim ayarı: dile özgü değer yoksa Türkçe değer. */
const G = (k, d) => (k in lay ? lay[k] : d);
const text = (x, y, lines, o) => rawText(x, y, tr(lines), o);
const warn = [];
let cur = 0;
const save = (n, w, h, b) => writeFileSync(join(out, `sekil-${n}.svg`), svg(w, h, b));

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const G50 = "#E8F3EC";
const GOLDTXT = "#8A6A1F";
const est = (s, size, weight = 400) => String(s).length * size * (weight >= 600 ? 0.56 : 0.53);
/** Metni genişliğe göre satırlara böler. */
function wrap(str, w, size, weight) {
  const words = String(str).split(" ");
  const lines = [];
  let cur = "";
  for (const wd of words) {
    const t = cur ? cur + " " + wd : wd;
    if (est(t, size, weight) > w && cur) {
      lines.push(cur);
      cur = wd;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}
/** Kutu: metin dizi ise satırlar olduğu gibi, dize ise sarılır. Taşma uyarısı verir. */
function B(x, y, w, h, content, o = {}) {
  const { fill = C.gok50, stroke = C.gok, size = 12, weight = 500, color = C.ink, r = 6, dash = false, sw = 1.4, tsize } = o;
  content = tr(content);
  const title = tr(o.title);
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""}/>`;
  const pad = 10;
  if (title) {
    const ts = tsize || size + 0.5;
    const tl = Array.isArray(title) ? title : wrap(title, w - 2 * pad, ts, 700);
    const body = content ? (Array.isArray(content) ? content : wrap(content, w - 2 * pad, size, weight)) : [];
    const lh = 1.3;
    const total = tl.length * ts * lh + (body.length ? 4 + body.length * size * lh : 0);
    let yy = y + h / 2 - total / 2 + (ts * lh) / 2;
    tl.forEach((l) => {
      s += rawText(x + w / 2, yy, l, { size: ts, weight: 700, fill: o.tcolor || C.gok700 });
      check(l, ts, 700, w - 8);
      yy += ts * lh;
    });
    yy += 4 - (ts * lh) / 2 + (size * lh) / 2;
    body.forEach((l) => {
      s += rawText(x + w / 2, yy, l, { size, weight, fill: color });
      check(l, size, weight, w - 8);
      yy += size * lh;
    });
    if (total > h - 6) warn.push(`şekil ${cur}: yükseklik taşması (${title})`);
    return s;
  }
  if (content == null || content === "") return s;
  const lines = Array.isArray(content) ? content : wrap(content, w - 2 * pad, size, weight);
  lines.forEach((l) => check(l, size, weight, w - 8));
  if (lines.length * size * 1.3 > h - 6) warn.push(`şekil ${cur}: yükseklik taşması (${lines[0]})`);
  return s + rawText(x + w / 2, y + h / 2, lines, { size, weight, fill: color });
}
function check(l, size, weight, w) {
  if (est(l, size, weight) > w) warn.push(`şekil ${cur}: genişlik taşması "${l}" (${Math.round(est(l, size, weight))} > ${w})`);
}
/** Serbest metin (isteğe bağlı beyaz zemin). */
function T(x, y, lines, o = {}) {
  const t = rawText(x, y, tr(lines), { size: 11, fill: C.ink, ...o });
  return o.halo === false ? t : halo(t);
}
function W(x, y, str, w, o = {}) {
  const t = tr(str);
  const lines = Array.isArray(t) ? t : wrap(t, w, o.size || 11, o.weight);
  const m = rawText(x, y, lines, { size: 11, fill: C.ink, ...o });
  return o.halo === false ? m : halo(m);
}
const P = (d, o = {}) =>
  `<path d="${d}" fill="none" stroke="${o.stroke || C.gok}" stroke-width="${o.sw || 1.6}"${o.dash ? ' stroke-dasharray="6 4"' : ""}${o.end !== false ? ` marker-end="url(#ar${o.kind || ""})"` : ""}${o.start ? ` marker-start="url(#ar${o.kind || ""})"` : ""}/>`;
const doc = (x, y, c = C.gok) =>
  `<path d="M${x},${y} h12 l5,5 v16 h-17 z" fill="#FFFFFF" stroke="${c}" stroke-width="1.3"/><line x1="${x + 3}" y1="${y + 9}" x2="${x + 14}" y2="${y + 9}" stroke="${c}" stroke-width="1"/><line x1="${x + 3}" y1="${y + 14}" x2="${x + 14}" y2="${y + 14}" stroke="${c}" stroke-width="1"/>`;
const cross = (x, y, s = 7, c = C.red) => `<path d="M${x - s},${y - s} L${x + s},${y + s} M${x + s},${y - s} L${x - s},${y + s}" stroke="${c}" stroke-width="2.4"/>`;
const check2 = (x, y, c = C.green) => `<path d="M${x - 6},${y} l4,5 l9,-10" stroke="${c}" stroke-width="2.4" fill="none"/>`;
const heading = (x, y, s, o = {}) => text(x, y, s, { size: o.size || 14, weight: 700, fill: o.fill || C.gok700, anchor: o.anchor || "middle" });
const note = (x, y, s, o = {}) => text(x, y, s, { size: o.size || 11, italic: true, fill: o.fill || C.muted, anchor: o.anchor || "middle" });

// sıra diyagramı yardımcıları (a8.mjs ile aynı desen)
function lifelines(parts, top, bottom, w = 160) {
  let s = "";
  parts.forEach((p) => {
    s += B(p.x - w / 2, top, w, 46, p.label, { size: 11.5, weight: 600, fill: p.gold ? C.gold50 : p.gray ? C.paper : C.gok50, stroke: p.gold ? C.gold : p.gray ? C.muted : C.gok, dash: p.dash });
    s += line(p.x, top + 46, p.x, bottom, { stroke: C.rule, sw: 1.4, dash: true });
  });
  return s;
}
function msg(y, x1, x2, label, o = {}) {
  const { kind = "", dash = false, size = 11, color } = o;
  const tl = tr(label);
  const lines = Array.isArray(tl) ? tl : [tl];
  let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind, dash });
  const fill = color || (kind === "r" ? C.red : kind === "g" ? GOLDTXT : C.ink);
  const cy = y - 9 - ((lines.length - 1) * size * 1.3) / 2;
  const cx = o.cx ?? (x1 + x2) / 2;
  lines.forEach((l) => check(l, size, 400, Math.abs(x2 - x1) + (o.slack || 40)));
  s += halo(rawText(cx, cy, lines, { size, fill }));
  return s;
}
function act(x, y, w, lines, o = {}) {
  const tl = tr(lines);
  const arr = Array.isArray(tl) ? tl : wrap(tl, w - 16, 10.5);
  const h = arr.length * 14 + 14;
  return B(x - w / 2, y - h / 2, w, h, arr, { size: 10.5, fill: o.fill || C.paper, stroke: o.stroke || C.ink, weight: 500 });
}

// =====================================================================================================
// Şekil 1 — Eski yol ve yeni yol
cur = 1;
{
  let b = "";
  b += `<rect x="8" y="8" width="430" height="404" rx="10" fill="${C.paper}" stroke="${C.rule}"/>`;
  b += `<rect x="462" y="8" width="430" height="404" rx="10" fill="#FFFFFF" stroke="${C.gok100}" stroke-width="1.6"/>`;
  b += heading(223, 32, "Eski yol: kopyalar", { fill: C.muted });
  b += heading(677, 32, "Yeni yol: imzalı belge");
  // sol
  b += B(24, 56, 150, 40, "Bakü'deki üniversite", { fill: "#FFFFFF", stroke: C.muted, size: 11.5, weight: 600 });
  b += person(62, 210, 1.1, C.muted);
  b += text(62, 248, "Aynur", { size: 12, weight: 600, fill: C.muted });
  const rec = [["İşveren", 120], ["Banka", 210], ["Başka bir üniversite", 300]];
  rec.forEach(([n, y]) => {
    b += arrow(88, 205, 222, y, { kind: "m" });
    b += doc(140, (205 + y) / 2 - 22, C.muted);
    b += B(226, y - 20, 140, 40, n, { fill: "#FFFFFF", stroke: C.muted, size: 11.5, weight: 600 });
    b += db(395, y - 4, C.muted, 0.8);
    b += text(395, y + 20, "kopya kalır", { size: 9.5, italic: true, fill: C.muted });
  });
  b += T(166, 160, "kopya", { size: 10, italic: true, fill: C.muted });
  b += P("M226,108 C200,96 196,84 176,80", { stroke: C.muted, dash: true, kind: "m" });
  b += T(256, 78, ["e-postayla doğrulama talebi", "haftalar"], { size: 10.5, fill: C.muted, italic: true });
  b += note(223, 356, "kopya aslını kanıtlamaz · doğrulama kaynağın cevabına bağlı", { size: 10.5 });
  b += note(223, 376, "her başvuru yeni bir kopya bırakır", { size: 10.5 });
  // sağ
  b += B(478, 186, 124, 60, ["Belge veren", "(üniversite)"], { size: 11.5, weight: 600 });
  b += phone(648, 156, 60, 112);
  b += B(658, 196, 40, 32, ["✓"], { fill: C.gold50, stroke: C.gold, size: 13 });
  b += text(678, 284, "cüzdan", { size: 11, weight: 600, fill: C.gok700 });
  b += B(758, 186, 124, 60, ["Doğrulayıcı", "(işveren)"], { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += B(744, 58, 140, 44, ["İmzalı güven", "listesi"], { size: 11.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(602, 216, 644, 216);
  b += T(540, 270, ["imzalı belge,", "cihaz anahtarına bağlı"], { size: 10.5, fill: C.gok700 });
  b += arrow(712, 216, 754, 216);
  b += T(820, 270, ["yalnız istenen", "alanları alır"], { size: 10.5, fill: C.gok700 });
  b += arrow(820, 184, 816, 106, { kind: "g" });
  b += T(822, 144, ["imzalayan", "yetkili mi?"], { size: 10.5, fill: GOLDTXT });
  b += line(540, 318, 820, 318, { stroke: C.rule, sw: 1.6, dash: true });
  b += cross(680, 318);
  b += T(680, 340, "kurum aranmaz", { size: 11, weight: 600, fill: C.red });
  b += note(677, 376, "Veren, belgenin nerede kullanıldığını öğrenmez.", { size: 10.5 });
  save(1, 900, 420, b);
}

// Şekil 2 — Paydaşlar ve gerilimler
cur = 2;
{
  let b = "";
  const S = [
    [40, 30, "Kişi (belge sahibi)", "az veri, iz yok, denetim bende"],
    [600, 30, "Kurum (belge veren)", "anahtarım bende, verim bende, yük az"],
    [40, 290, "Doğrulayıcı", "işveren, web sitesi, kapı: hızlı, kesin, kaynağa sormadan"],
    [600, 290, "Devlet", "kendi kaydım, kendi kuralım"],
  ];
  S.forEach(([x, y, t, d]) => (b += B(x, y, 260, 76, d, { title: t, size: 11, fill: C.gok50 })));
  b += line(610, 104, 298, 294, { stroke: C.rule, sw: 1.4, dash: true });
  b += cross(330, 274, 6);
  b += T(346, 280, "kurumla doğrudan sorgu yok", { size: 10.5, italic: true, fill: C.muted, anchor: "start" });
  b += `<ellipse cx="450" cy="200" rx="128" ry="42" fill="${C.gold50}" stroke="${C.gold}" stroke-width="1.6"/>`;
  b += text(450, 200, ["Ortak kurallar ve", "imzalı listeler"], { size: 12, weight: 600, fill: GOLDTXT });
  [[300, 90, 360, 168], [600, 90, 540, 168], [300, 300, 360, 232], [600, 300, 540, 232]].forEach(([a, c, d, e]) => (b += arrow(a, c, d, e, { kind: "m", sw: 1.1 })));
  // gerilim 1: kişi ↔ doğrulayıcı
  b += arrow(110, 112, 110, 284, { sw: 3, both: true, kind: "r" });
  b += T(116, 198, ["mahremiyet ↔", "denetlenebilirlik"], { size: 11.5, weight: 600, fill: C.red, anchor: "start" });
  // gerilim 2: devlet ↔ halka
  b += arrow(700, 284, 572, 214, { sw: 3, both: true, kind: "r" });
  b += T(762, 236, ["egemenlik ↔", "birlikte çalışabilirlik"], { size: 11.5, weight: 600, fill: C.red });
  save(2, 900, 380, b);
}

// Şekil 3 — EUDI rolleri
cur = 3;
{
  let b = "";
  b += B(20, 14, 860, 40, ["Güven listeleri: ulusal listeler ve listelerin listesi (LOTL)"], { fill: C.gold50, stroke: C.gold, size: 12.5, weight: 700, color: GOLDTXT });
  b += heading(80, 82, "Verenler", { size: 13 });
  const V = ["PID sağlayıcısı", "QEAA sağlayıcısı", "PuB-EAA sağlayıcısı", "EAA sağlayıcısı"];
  V.forEach((v, i) => {
    const y = 96 + i * 58;
    b += B(30, y, 160, 42, v, { size: 11.5, weight: 600 });
    b += arrow(190, y + 21, 386, 230 + (i - 1.5) * 14, { sw: 1.3 });
  });
  b += T(286, 150, "belge verir", { size: 10.5, fill: C.gok700 });
  b += phone(392, 150, 116, 170);
  b += text(450, 182, ["Kullanıcı ve", "cüzdan birimi"], { size: 11.5, weight: 600, fill: C.gok700 });
  b += B(410, 216, 80, 30, "PID", { fill: C.gold50, stroke: C.gold, size: 11, weight: 700 });
  b += B(410, 256, 80, 30, "EAA", { fill: C.gok50, stroke: C.gok, size: 11, weight: 700 });
  b += heading(740, 82, "Güvenen taraflar", { size: 13 });
  b += B(690, 110, 170, 46, ["Güvenen taraf", "(doğrulayıcı)"], { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += B(690, 176, 170, 36, "Aracı", { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(512, 212, 686, 140);
  b += T(598, 156, ["kullanıcının onayıyla,", "yalnız istenen veri"], { size: 10.5, fill: C.gok700 });
  b += arrow(686, 156, 512, 230, { kind: "m", dash: true, sw: 1.1 });
  b += T(600, 222, "cüzdan da doğrulayıcıyı denetler", { size: 10, italic: true, fill: C.muted });
  b += B(330, 360, 240, 48, ["Cüzdan sağlayıcısı"], { size: 12, weight: 600 });
  b += arrow(450, 358, 450, 324);
  b += T(440, 340, ["uygulamayı sunar; cüzdanın", "gerçek olduğunu kanıtlar"], { size: 10, fill: C.gok700, anchor: "end" });
  b += B(640, 270, 220, 40, "Kayıt kurumu", { size: 11.5, weight: 600 });
  b += B(640, 330, 220, 40, "Erişim sertifikası makamı", { size: 11.5, weight: 600 });
  b += arrow(780, 268, 780, 216, { sw: 1.3 });
  b += T(820, 244, "kayıt sertifikası", { size: 10, fill: C.gok700 });
  b += P("M860,350 C892,330 892,150 864,136", { sw: 1.3 });
  b += T(862, 400, "erişim sertifikası", { size: 10, fill: C.gok700, anchor: "end" });
  // listeden kesikli oklar
  [[170, 58, 170, 92], [450, 58, 450, 146], [840, 58, 840, 106]].forEach(([a, c, d, e]) => (b += arrow(a, c, d, e, { kind: "g", dash: true, sw: 1.1 })));
  b += T(300, 70, "kim yetkili?", { size: 10.5, italic: true, fill: GOLDTXT });
  b += note(220, 430, "Verenlerden güvenen taraflara doğrudan yol yoktur.", { size: 10.5 });
  save(3, 900, 444, b);
}

// Şekil 4 — Standart katmanları
cur = 4;
{
  let b = "";
  const L = [
    ["Kişinin kimlik doğrulaması", "ETSI TS 119 461", "ETSI", C.paper],
    ["İptal", "IETF Token Status List", "IETF", C.gok50],
    ["Protokol", "OpenID4VCI 1.0 (verme) · OpenID4VP 1.0 + DCQL (gösterme) · HAIP 1.0 (profil)", "OpenID Foundation", C.gok100],
    ["Belge biçimi", "SD-JWT VC (IETF) · mdoc (ISO/IEC 18013-5)", "IETF · ISO/IEC", C.gold50],
    ["Güven", "ETSI TS 119 612 (XML) · TS 119 602 (LoTE, JSON) · listelerin listesi", "ETSI", C.gok50],
    ["Kurum kimliği", "X.509 · ETSI TS 119 412-6, TS 119 411-8, TS 119 475", "IETF · ETSI", C.paper],
  ];
  L.forEach(([t, d, who, fill], i) => {
    const y = 16 + i * 62;
    b += `<rect x="70" y="${y}" width="520" height="52" rx="6" fill="${fill}" stroke="${C.gok}" stroke-width="1.2"/>`;
    b += text(86, y + 17, t, { anchor: "start", size: 12.5, weight: 700, fill: C.gok700 });
    b += text(86, y + 36, d, { anchor: "start", size: 11, fill: C.ink });
    check(d, 11, 400, 500);
    b += text(815, y + 26, who, { size: 11, weight: 600, fill: C.muted });
  });
  b += B(598, 134, 146, 64, ["tarayıcı: W3C DC API,", "ISO/IEC 18013-7", "yakın alan: 18013-5"], { size: 9.5, fill: "#FFFFFF", stroke: C.gok, dash: true });
  b += text(745, 4 + 6, "", {});
  b += text(815, 8, "Kim yazar?", { size: 11, weight: 700, fill: C.muted });
  b += line(752, 16, 752, 380, { stroke: C.rule });
  b += `<path d="M56,20 h-10 v356 h10" fill="none" stroke="${C.gold}" stroke-width="2"/>`;
  b += text(30, 198, "", {});
  b += `<text x="26" y="198" font-size="10.5" fill="${GOLDTXT}" text-anchor="middle" transform="rotate(-90 26 198)" font-style="italic">${esc(tone("AB seçer ve profiller; uygulama tüzükleri sürümlerine atıf yapar"))}</text>`;
  save(4, 880, 392, b);
}

// Şekil 5 — Tamga'nın üç katmanı
cur = 5;
{
  let b = "";
  b += B(150, 20, 600, 86, null, { fill: C.paper, stroke: C.ink, dash: false });
  b += heading(450, 40, "Ağın üstündekiler", { size: 13.5, fill: C.ink });
  b += B(200, 56, 230, 36, "cüzdanlar (listede kayıtlı)", { size: 11, fill: "#FFFFFF", stroke: C.muted });
  b += B(470, 56, 250, 36, "hizmet sağlayıcılar (ağın dışında)", { size: 11, fill: "#FFFFFF", stroke: C.muted });
  b += note(450, 118, "ağın parçası değil; katılımcı", { size: 10.5 });
  b += B(100, 130, 700, 150, null, { fill: C.gok50, stroke: C.gok });
  b += heading(450, 150, "Tamga Network: hafif güven federasyonu", { size: 13.5 });
  b += B(120, 166, 150, 30, "listelerin listesi", { size: 11, fill: "#FFFFFF" });
  const slots = ["TR", "AZ", "KZ", "KG", "UZ", "HU", "TM"];
  slots.forEach((s, i) => (b += B(290 + i * 52, 166, 44, 30, s, { size: 11, weight: 700, fill: i ? "#FFFFFF" : C.gok, color: i ? C.muted : "#FFFFFF", stroke: i ? C.muted : C.gok, dash: i > 0 })));
  b += note(470, 210, "TR etkin · diğer yuvalar ayrılmış (kesikli)", { size: 10 });
  b += B(120, 226, 240, 40, "kurallar (ARF, Trust Framework, Rulebook)", { size: 10.5, fill: "#FFFFFF" });
  b += B(372, 226, 160, 40, "açık paketler", { size: 10.5, fill: "#FFFFFF" });
  b += B(544, 226, 236, 40, "referans hizmetler", { size: 10.5, fill: "#FFFFFF" });
  b += B(50, 296, 800, 84, null, { fill: C.gold50, stroke: C.gold });
  b += heading(450, 318, "Taban: AB uyumu", { size: 13.5, fill: GOLDTXT });
  b += text(450, 346, "SD-JWT VC · mdoc · OpenID4VCI/VP · HAIP · ETSI listeleri · X.509", { size: 11.5, fill: C.ink });
  b += note(450, 366, "ağ hiç büyümese de değer taşır", { size: 10.5 });
  b += note(860, 205, "devletler", { size: 10, anchor: "end" });
  b += note(860, 219, "katıldıkça", { size: 10, anchor: "end" });
  b += note(860, 233, "büyür", { size: 10, anchor: "end" });
  b += arrow(26, 378, 26, 30, { kind: "m" });
  b += `<text x="16" y="205" font-size="10.5" fill="${C.muted}" text-anchor="middle" transform="rotate(-90 16 205)" font-style="italic">${esc(tone("her katman tek başına ayakta durur"))}</text>`;
  b += note(450, 400, "Ayrılmış yuvalar anlaşma ya da görüşme bildirimi değildir.", { size: 10.5 });
  save(5, 880, 412, b);
}

// Şekil 6 — Bileşenler ve veri akışı
cur = 6;
{
  let b = "";
  b += B(150, 12, 510, 98, null, { fill: C.gold50, stroke: C.gold });
  b += heading(405, 30, "Ağın yayınları (herkese açık, kişisel veri yok)", { size: 12.5, fill: GOLDTXT });
  b += B(162, 44, 156, 50, ["Güven listeleri +", "çapa günlüğü (trust.)"], { size: 10, fill: "#FFFFFF", stroke: C.gold });
  b += B(328, 44, 156, 50, ["Belge türü kataloğu", "(schemas.)"], { size: 10, fill: "#FFFFFF", stroke: C.gold });
  b += B(494, 44, 156, 50, ["İptal listeleri", "(status.)"], { size: 10, fill: "#FFFFFF", stroke: C.gold });
  b += note(240, 102, "yalnız liste yayıncısı yazar", { size: 9.5 });
  // sol grup
  b += heading(110, 132, "Belge veren tarafı", { size: 12 });
  b += B(14, 146, 190, 40, "Kimlik servisi (geçici)", { size: 11, weight: 600 });
  b += B(14, 200, 190, 36, "Kurum Konsolu", { size: 11, weight: 600 });
  b += B(14, 250, 190, 48, ["Barındırılan belge", "verme hizmeti"], { size: 11, weight: 600 });
  b += B(14, 350, 140, 46, ["Yetkili kaynak", "(kurumun sistemi)"], { size: 10, fill: C.paper, stroke: C.muted });
  b += B(236, 340, 130, 46, ["Kurumun imza", "hizmeti"], { size: 10.5, fill: C.paper, stroke: C.muted });
  b += arrow(60, 348, 60, 302, { kind: "m" });
  b += T(70, 326, ["imza anında okunur, saklanmaz"], { size: 9.5, fill: C.muted, anchor: "start", halo: false });
  b += arrow(190, 300, 250, 338, { kind: "m", both: true });
  b += T(300, 314, "yalnız SHA-256 özeti", { size: 9.5, fill: C.muted, anchor: "start", halo: false });
  // telefon
  b += phone(400, 160, 100, 160);
  b += text(450, 240, ["Cüzdan", "(kişinin)"], { size: 12, weight: 600, fill: C.gok700 });
  b += B(370, 360, 160, 44, ["Cüzdan sağlayıcısı", "(ağ işletmez)"], { size: 10.5, fill: C.paper, stroke: C.muted });
  b += arrow(450, 356, 450, 324, { kind: "m", both: true });
  b += T(560, 340, "birim kaydı · WIA · KA", { size: 10, fill: C.muted });
  b += arrow(204, 166, 396, 196, { sw: 2 });
  b += T(290, 160, "OpenID4VCI: kimlik", { size: 10, fill: C.gok700 });
  b += arrow(204, 274, 396, 250, { sw: 2.4 });
  b += T(300, 252, "OpenID4VCI", { size: 10.5, weight: 600, fill: C.gok700 });
  // sağ grup
  b += heading(790, 132, "Doğrulayıcı tarafı", { size: 12 });
  b += B(700, 180, 186, 44, ["Doğrulayıcı", "(kendi yazılımı)"], { size: 11, weight: 600, fill: C.paper, stroke: C.ink });
  b += B(700, 250, 186, 44, ["Tamga Verify", "(aracı)"], { size: 11, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(504, 220, 696, 204, { sw: 2.4 });
  b += arrow(504, 240, 696, 270, { sw: 2.4 });
  b += T(600, 196, "OpenID4VP", { size: 10.5, weight: 600, fill: C.gok700 });
  // yayınlardan kesikli
  b += arrow(450, 112, 450, 156, { kind: "g", dash: true, sw: 1.1 });
  b += arrow(660, 80, 740, 176, { kind: "g", dash: true, sw: 1.1 });
  b += T(672, 30, ["önceden çekilir; imza,", "sürüm ve tazelik denetlenir"], { size: 9.5, fill: GOLDTXT, anchor: "start" });
  b += P("M204,262 C300,130 540,130 572,98", { kind: "g", sw: 1.1 });
  b += T(520, 140, "sabit aralıkla yayın", { size: 9.5, fill: GOLDTXT });
  b += line(600, 380, 880, 380, { stroke: C.rule, dash: true });
  b += T(740, 396, "doğrulayıcıdan belge verene ok yok: kaynağa sorulmaz", { size: 10, italic: true, fill: C.muted, halo: false });
  save(6, 900, 412, b);
}

// Şekil 7 — Listelerin listesi ağacı
cur = 7;
{
  let b = "";
  b += B(250, 12, 400, 110, null, { fill: C.gold50, stroke: C.gold });
  b += heading(450, 30, "Listelerin listesi (lotl.jws)", { size: 13, fill: GOLDTXT });
  b += text(450, 54, "ortak belge türleri ve katalog · cüzdan sağlayıcıları", { size: 10.5 });
  b += text(450, 72, "ZK devreleri · kategori sözlüğü", { size: 10.5 });
  b += text(450, 90, "PID sağlayıcıları (boş)", { size: 10.5, fill: C.muted, italic: true });
  b += key(672, 40);
  b += T(752, 64, ["kök parmak izi:", "cüzdanda ve", "doğrulayıcıda sabit"], { size: 10, fill: GOLDTXT });
  const S = [["TR", 0], ["AZ", 1], ["KZ", 1], ["KG", 1], ["UZ", 1], ["HU", 2], ["TM", 2]];
  S.forEach(([s, k], i) => {
    const x = 74 + i * 112;
    b += arrow(450, 122, x + 40, 156, { kind: k ? "m" : "", sw: 1.1 });
    b += B(x, 160, 80, 40, s, { size: 13, weight: 700, fill: k ? "#FFFFFF" : C.gok, color: k ? C.muted : "#FFFFFF", stroke: k ? C.muted : C.gok, dash: k > 0 });
    if (k) b += text(x + 40, 214, k === 1 ? "TDT üyesi" : "gözlemci", { size: 9.5, italic: true, fill: C.muted });
  });
  b += note(580, 236, "Yer ayrılmıştır; anlaşma ya da görüşme bildirimi değildir.", { size: 10.5 });
  b += T(124, 236, "işletmeci: geçici, devlet adına", { size: 10, fill: C.gok700, anchor: "start" });
  const K = ["Kök sertifikalar", "Belge verenler ve yetkili türleri", "Doğrulayıcılar ve kullanımları", "Ulusal belge türleri"];
  K.forEach((k, i) => {
    const x = 20 + i * 196;
    b += P(`M114,200 L114,262 L${x + 90},262 L${x + 90},284`, { sw: 1.1 });
    b += B(x, 288, 180, 44, k, { size: 11, weight: 600 });
  });
  b += `<rect x="830" y="140" width="50" height="200" rx="6" fill="${C.green}" opacity="0.12"/>`;
  b += `<text x="855" y="240" font-size="11" font-weight="700" fill="${C.green}" text-anchor="middle" transform="rotate(-90 855 240)">${esc(tone("Kişisel veri yok"))}</text>`;
  save(7, 900, 346, b);
}

// Şekil 8 — Hash zinciri ve çapa günlüğü
cur = 8;
{
  let b = "";
  b += text(20, 22, "Ülke listesi", { anchor: "start", size: 12.5, weight: 700, fill: C.gok700 });
  [205, 206, 207].forEach((v, i) => {
    const x = 40 + i * 190;
    b += B(x, 40, 130, 50, [fmt("sürüm {0}", v), tone("imzalı")], { size: 11.5, weight: 600 });
    if (i) {
      b += P(`M${x},62 L${x - 56},62`, { sw: 1.2 });
      b += T(x - 30, 46, "previous_version_hash", { size: 9.5, fill: C.gok700 });
    }
  });
  b += B(640, 40, 160, 50, ["Saldırganın sunduğu", "sürüm 205"], { size: 11, weight: 600, fill: C.red50, stroke: C.red, dash: true, color: C.red });
  b += text(720, 106, "ret: sürüm geride", { size: 11, weight: 700, fill: C.red });
  b += line(10, 130, 890, 130, { stroke: C.rule });
  b += text(20, 152, "Çapa günlüğü", { anchor: "start", size: 12.5, weight: 700, fill: C.gok700 });
  b += line(40, 200, 600, 200, { stroke: C.gok, sw: 1.6 });
  for (let i = 0; i < 8; i++) {
    const x = 50 + i * 76;
    const hb = i % 3 === 0;
    b += circle(x, 200, hb ? 6 : 8, { fill: hb ? C.muted : C.gok });
  }
  b += T(50, 226, "heartbeat", { size: 9.5, fill: C.muted });
  b += T(202, 174, "status_list: sürüm 15293, özet a1…", { size: 10, fill: C.gok700 });
  b += T(430, 228, "status_list: sürüm 15294, özet f0…", { size: 10, fill: C.gok700 });
  b += T(320, 244, "satırlar previous_hash ile birbirine bağlı", { size: 9.5, italic: true, fill: C.muted });
  b += person(720, 190, 0.9, C.ink);
  b += text(720, 224, "Doğrulayıcı", { size: 11, weight: 600 });
  b += B(624, 252, 140, 44, ["sürüm 15294, f0…", "günlükle eşleşir"], { size: 10, fill: G50, stroke: C.green, color: C.green });
  b += B(776, 252, 112, 44, ["eski liste, a1…", "kullanılmaz"], { size: 10, fill: C.red50, stroke: C.red, color: C.red });
  b += check2(694, 310);
  b += cross(832, 310, 6);
  b += line(612, 150, 612, 330, { stroke: C.rule, dash: true });
  b += B(20, 270, 300, 50, ["Arşiv + imzalı kontrol noktası", "zincir kesilmez, satır silinmez"], { size: 10.5, fill: C.paper, stroke: C.muted, dash: true });
  b += note(460, 300, "Değerler örnektir.", { size: 10 });
  save(8, 900, 336, b);
}

// Şekil 9 — Federasyon
cur = 9;
{
  let b = "";
  b += B(320, 30, 260, 70, ["Tamga listelerin listesi"], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  b += note(450, 18, "kök parmak izi cüzdanda ve doğrulayıcıda sabit", { size: 10.5 });
  b += B(30, 180, 220, 60, ["Türkiye listesi", "(Tamga biçimi)"], { size: 12, weight: 600 });
  b += arrow(330, 90, 200, 176);
  b += T(220, 124, "imzacı: signing_keys", { size: 10.5, fill: C.gok700 });
  b += B(610, 180, 270, 60, ["Dış liste", "(bir devletin ya da AB'nin ETSI listesi)"], { size: 11, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(570, 90, 700, 176);
  ["adres", "sabitlenmiş imzacı parmak izi", "kapsam: roller + belge türleri", "onay kaydı"].forEach((t, i) => (b += T(690, 106 + i * 15, t, { size: 10, fill: C.gok700, anchor: "start" })));
  b += B(610, 262, 130, 44, "kapsam içi: kabul", { size: 10.5, fill: G50, stroke: C.green, color: C.green, weight: 600 });
  b += B(750, 262, 130, 44, ["kapsam dışı kayıt:", "yok sayılır"], { size: 10, fill: C.red50, stroke: C.red, color: C.red, weight: 600 });
  b += `<circle cx="300" cy="290" r="14" fill="none" stroke="${C.muted}" stroke-width="1.6"/><path d="M300,282 V290 H307" stroke="${C.muted}" stroke-width="1.6" fill="none"/>`;
  b += W(322, 284, "dış listenin tazeliği ayrı izlenir; bayatsa yalnız ona bağlı sorular \"bilinmiyor\" döner", 260, { size: 10.5, fill: C.muted, anchor: "start" });
  b += note(450, 340, "Bugün listelerin listesinde dış liste yoktur; her ekleme ayrı bir onaydır.", { size: 10.5 });
  save(9, 900, 352, b);
}

// Şekil 10 — Sertifika ağacı
cur = 10;
{
  let b = "";
  b += B(20, 10, 860, 34, ["Bütün parmak izleri imzalı listelerde; listelerin imzacısı bant dışı güven çapasına bağlı."], { size: 11, fill: C.gold50, stroke: C.gold, color: GOLDTXT, weight: 600 });
  // sol ağaç
  b += B(30, 62, 330, 50, ["Ulusal kök sertifika (TR)", "geçici işletmeci, devlet adına"], { size: 11, weight: 600, fill: C.gok, color: "#FFFFFF", stroke: C.gok });
  const L = [
    ["Kurum belge imza sertifikası", "ETSI TS 119 412-6; yalnız digitalSignature"],
    ["Kurum iptal listesi imza sertifikası", "ETSI TS 119 412-6"],
    ["Doğrulayıcı erişim sertifikası", "ETSI TS 119 411-8"],
    ["ETSI XML liste imza sertifikası", "yalnız XML"],
  ];
  L.forEach(([t, d], i) => {
    const y = 132 + i * 60;
    b += P(`M60,112 L60,${y + 24} L84,${y + 24}`, { sw: 1.2 });
    b += B(86, y, 280, 48, d, { title: t, size: 10, tsize: G("f10.tsize", 11) });
  });
  // orta
  b += B(400, 62, 230, 50, ["Kayıt kurumu anahtarı", "parmak izi listelerin listesinde"], { size: 10.5, weight: 600, fill: C.gok, color: "#FFFFFF" });
  b += P("M515,112 L515,148", { sw: 1.2 });
  b += B(400, 152, 230, 48, "JWT, en çok 12 ay", { title: "Kayıt sertifikaları (TS 119 475)", size: 10, tsize: G("f10.tsize", 11) });
  b += P("M515,200 L515,224", { sw: 1.2 });
  b += B(400, 228, 230, 48, "kayıt kurumunun anahtarıyla imzalı", { title: "1 bitlik durum listesi", size: 10, tsize: 11 });
  // sağ
  b += B(660, 62, 220, 50, ["Cüzdan sağlayıcısı", "sertifikası (listede)"], { size: 10.5, weight: 600, fill: C.paper, stroke: C.muted, color: C.muted });
  b += P("M720,112 L720,152", { sw: 1.2, stroke: C.muted, kind: "m" });
  b += P("M820,112 L820,152", { sw: 1.2, stroke: C.muted, kind: "m" });
  b += B(664, 156, 100, 40, "WIA", { size: 11, fill: "#FFFFFF", stroke: C.muted, color: C.muted, weight: 600 });
  b += B(776, 156, 104, 40, "KA", { size: 11, fill: "#FFFFFF", stroke: C.muted, color: C.muted, weight: 600 });
  b += note(770, 216, "ayrıntı Bölüm 9.3 ve 13", { size: 10 });
  save(10, 900, 380, b);
}

// Şekil 11 — SD-JWT VC katmanları
cur = 11;
{
  let b = "";
  b += B(20, 20, 330, 150, ["başlık: alg ES256, typ dc+sd-jwt, x5c", "gövde: iss, vct, vct#integrity, iat,", "cnf, status, _sd [özetler]", "kurum imzası"], { title: "Kurumun imzaladığı JWT", size: 10.5, fill: "#E3EFE8", stroke: C.green, tcolor: C.green });
  b += text(366, 95, "~", { size: 28, weight: 700, fill: C.muted });
  b += B(384, 20, 230, 150, null, { fill: "#F2F8F4", stroke: C.green, dash: true });
  b += heading(499, 38, "Açıklamalar", { size: 12, fill: C.green });
  ["[tuz, ad, değer]", "[tuz, ad, değer]", "…"].forEach((t, i) => (b += B(404, 54 + i * 36, 190, 28, i < 2 ? fmt("Açıklama {0}: [tuz, ad, değer]", i + 1) : t, { size: 10, fill: "#FFFFFF", stroke: C.green })));
  b += text(632, 95, "~", { size: 28, weight: 700, fill: C.muted });
  b += B(650, 20, 230, 150, ["nonce, aud, iat, sd_hash", "cihazdaki anahtarla imza"], { title: "Anahtar bağı JWT'si (KB-JWT)", size: 10.5, fill: C.gold50, stroke: C.gold, tcolor: GOLDTXT });
  b += P("M404,68 C370,110 330,120 300,118", { sw: 1.1, kind: "m" });
  b += T(352, 200, "her açıklamanın SHA-256 özeti _sd içinde", { size: 10, fill: C.muted });
  b += P("M760,172 C700,250 300,260 220,128", { sw: 1.3, kind: "g", dash: true });
  b += T(500, 236, "aynı anahtar: cnf ↔ KB-JWT imzası", { size: 10, fill: GOLDTXT });
  b += B(20, 270, 860, 30, ["Cüzdanda duran: JWT~A1~A2~…~An~"], { size: 11.5, fill: C.paper, stroke: C.rule });
  b += B(20, 308, 860, 30, ["Doğrulayıcıya giden: JWT~A2~A5~KB-JWT"], { size: 11.5, fill: C.gok50, stroke: C.gok });
  save(11, 900, 350, b);
}

// Şekil 12 — Seçici açıklama
cur = 12;
{
  let b = "";
  b += heading(200, 22, "Cüzdanda");
  b += heading(700, 22, "Timur'un gördüğü");
  b += B(40, 40, 320, 230, null, { fill: "#FFFFFF", stroke: C.gok });
  b += text(200, 60, "Diploma · Örnek Üniversitesi", { size: 11.5, weight: 700, fill: C.gok700 });
  const F = ["is_graduate: true", "qualification_title: …Yüksek Lisans…", "grade: 3.71", "birth_date: …"];
  F.forEach((f, i) => {
    b += B(58, 80 + i * 46, 260, 36, f, { size: 10.5, fill: C.gok50 });
    b += lock(336, 96 + i * 46, C.gold, 0.8);
  });
  b += arrow(380, 155, 520, 155, { sw: 2 });
  b += T(450, 128, ["Timur'un isteği:", "mezun mu, hangi derece?"], { size: 10.5, fill: C.gok700 });
  b += B(540, 40, 320, 230, null, { fill: "#FFFFFF", stroke: C.gok });
  b += text(700, 60, "Diploma · Örnek Üniversitesi", { size: 11.5, weight: 700, fill: C.gok700 });
  F.forEach((f, i) => {
    const open = i < 2;
    b += B(558, 80 + i * 46, 284, 36, open ? f : "_sd içinde bir özet (değer görünmez)", { size: 10.5, fill: open ? G50 : "#EEEEEC", stroke: open ? C.green : C.rule, color: open ? C.ink : C.muted });
  });
  b += W(700, 292, "Kurumun imzası bozulmadı; gizlenen açıklamalar dizeden çıkarıldı. Anahtar bağı sunulan kümeyi mühürler (sd_hash).", 420, { size: 10.5, italic: true, fill: C.muted });
  save(12, 900, 320, b);
}

// Şekil 13 — Yol A ve Yol B
cur = 13;
{
  let b = "";
  b += line(450, 10, 450, 330, { stroke: C.rule, sw: 1.4 });
  const col = (x0, ttl) => {
    let s = heading(x0 + 210, 22, ttl);
    s += B(x0 + 20, 44, 170, 52, ["Kurumun sistemi", "(yetkili kaynak)"], { size: 10.5, weight: 600, fill: C.paper, stroke: C.muted });
    s += B(x0 + 240, 44, 170, 52, ["Belge verme", "hizmeti"], { size: 10.5, weight: 600 });
    s += phone(x0 + 140, 190, 130, 110);
    s += text(x0 + 205, 246, "Cüzdan", { size: 11.5, weight: 700, fill: C.gok700 });
    return s;
  };
  b += col(0, "Yol A: kurum başlatır");
  b += col(450, "Yol B: kişi başlatır");
  // A
  b += arrow(190, 60, 236, 60);
  b += T(213, 112, ["tür + subject_ref +", "kimlik özeti (HMAC)"], { size: 9.5, fill: C.gok700 });
  b += arrow(100, 98, 160, 188, { kind: "m" });
  b += T(70, 150, ["bağlantıyı", "kurum gönderir"], { size: 9.5, fill: C.muted });
  b += arrow(260, 188, 320, 98);
  b += T(330, 160, ["kimlik belgesi", "sunumu"], { size: 9.5, fill: C.gok700, anchor: "start" });
  b += arrow(236, 84, 192, 84, { kind: "g" });
  b += T(214, 140, "", {});
  b += B(296, 108, 140, 26, ["özetler eşleşiyor mu?"], { size: 9, fill: C.gold50, stroke: C.gold });
  // B
  b += arrow(700, 188, 756, 98);
  b += T(696, 140, ["kurumu seç +", "kimlik sunumu"], { size: 9.5, fill: C.gok700, anchor: "end" });
  b += arrow(686, 60, 642, 60);
  b += T(664, 112, ["imzalı sorgu", "(lookup)"], { size: 9.5, fill: C.gok700 });
  b += arrow(642, 84, 686, 84, { kind: "g" });
  b += arrow(800, 98, 752, 186, { kind: "g" });
  b += T(800, 150, "belge", { size: 9.5, fill: GOLDTXT, anchor: "start" });
  b += B(20, 314, 860, 44, ["Bilgi imza anında okunur, saklanmaz. Kalıcı olan: opak subject_ref ve anahtarlı özet. Günlüklerde kişi verisi yok."], { size: 10.5, fill: C.gold50, stroke: C.gold, color: GOLDTXT, weight: 600 });
  save(13, 900, 368, b);
}

// Şekil 14 — Kurumun başlattığı belge verme
cur = 14;
{
  let b = "";
  const A = 92, Wt = 262, H = 490, K = 710, L = 852;
  b += lifelines([{ x: A, label: ["Aynur"], gold: true }, { x: Wt, label: ["Cüzdan"] }, { x: H, label: ["Belge verme hizmeti", "(Örnek Üniversitesi)"] }, { x: K, label: ["Kurumun sistemi", "(yetkili kaynak)"], gray: true }], 10, 640, 170);
  b += B(806, 10, 92, 46, ["Güven listesi", "(önceden)"], { size: 10, weight: 600, fill: C.gold50, stroke: C.gold, color: GOLDTXT, dash: true });
  b += line(L, 56, L, 640, { stroke: C.gold, sw: 1.2, dash: true });
  b += msg(96, K, A, "1. karekod + ayrı işlem kodu");
  b += msg(146, Wt, H, "2. teklif ve imzalı tanıtım belgesi");
  b += arrow(Wt, 160, L - 4, 160, { kind: "g", dash: true, sw: 1 });
  b += T(700, 172, "imzacı listede mi?", { size: 9.5, fill: GOLDTXT });
  b += msg(212, Wt, H, ["3. /token: ön yetkili kod + işlem kodu", "+ DPoP + WIA"]);
  b += msg(248, H, Wt, "erişim belirteci (5 dk, DPoP bağlı)", { kind: "m", color: C.muted });
  b += msg(292, Wt, H, "4. /nonce");
  b += msg(326, H, Wt, "c_nonce", { kind: "m", color: C.muted });
  b += act(Wt, 368, 200, ["5. 10 anahtar üret, anahtar", "kanıtı al, kanıtı imzala"]);
  b += msg(420, Wt, H, "6. /credential: DPoP + anahtar kanıtı");
  b += act(H, 462, 230, ["7. denetimler; nonce atomik tüket;", "WIA ve KA listede mi"]);
  b += arrow(H + 116, 462, L - 4, 462, { kind: "g", dash: true, sw: 1 });
  b += msg(512, H, K, "8. imza anında bilgiyi oku");
  b += msg(540, K, H, "bilgi (saklanmaz)", { kind: "m", color: C.muted });
  b += act(H, 584, 260, ["9. her kopyaya ayrı cnf ve iptal yeri;", "kurumun anahtarıyla imza"]);
  b += msg(628, H, Wt, "10. on kopya", { kind: "g" });
  b += note(450, 662, "Ortak deftere hiçbir şey yazılmaz; iptal yeri ayırma belge verenin kendi veritabanındadır.", { size: 10.5 });
  save(14, 900, 676, b);
}

// Şekil 15 — Uzaktan gösterme
cur = 15;
{
  let b = "";
  const A = 92, Wt = 290, V = 590, L = 820;
  b += lifelines([{ x: A, label: ["Aynur"], gold: true }, { x: Wt, label: ["Cüzdan"] }, { x: V, label: ["Doğrulayıcı", "(Timur'un sunucusu)"], gray: true }], 10, 520, 170);
  b += B(L - 75, 10, 150, 46, ["İmzalı güven listesi", "önceden, toplu"], { size: 10, fill: C.gold50, stroke: C.gold, dash: true, color: GOLDTXT });
  b += line(L, 56, L, 520, { stroke: C.gold, sw: 1.2, dash: true });
  b += msg(92, V, A, "1. ekranda QR: yalnız request_uri", { kind: "m", color: C.muted });
  b += msg(132, Wt, V, "2. GET request_uri");
  b += msg(186, V, Wt, ["3. imzalı istek nesnesi: x5c, client_id = x509_hash,", "DCQL, nonce, kayıt sertifikası"]);
  b += act(Wt, 236, 230, ["4. kayıt, kayıt sertifikası, paylaşım", "kuralı ve kapsam denetimi"]);
  b += arrow(Wt + 116, 236, L - 4, 236, { kind: "g", dash: true, sw: 1 });
  b += msg(298, Wt, A, ["5. onay ekranı: kim, ne için,", "paylaşılacak alanlar"]);
  b += msg(338, A, Wt, "6. biyometri ya da parola", { kind: "g" });
  b += msg(398, Wt, V, ["7. JWE( vp_token: seçilen açıklamalar + KB-JWT )"], { kind: "", size: 11 });
  b += lock(440, 412, C.gok, 0.8);
  b += act(V, 452, 210, ["8. doğrulama hattı T0 → E"]);
  b += B(V + 120, 436, 70, 32, "kabul", { size: 11, weight: 700, fill: G50, stroke: C.green, color: C.green });
  b += note(450, 540, "Kişisel veri yalnız 7. adımda ve yalnız şifreli gider.", { size: 10.5 });
  save(15, 900, 554, b);
}

// Şekil 16 — Sahte ret ve çekim dalları
cur = 16;
{
  let b = "";
  const X = (s) => 120 + s * 12.5;
  const lane = (y, ttl) => {
    let s = text(20, y - 70, ttl, { anchor: "start", size: 12.5, weight: 700, fill: C.gok700 });
    s += line(X(0), y, X(60), y, { stroke: C.ink, sw: 1.2 });
    [0, 10, 20, 30, 40, 50, 60].forEach((t) => {
      s += line(X(t), y - 4, X(t), y + 4, { stroke: C.ink });
      s += text(X(t), y + 16, fmt("{0} sn", t), { size: 9, fill: C.muted });
    });
    return s;
  };
  b += lane(100, "Eski tasarım: tek istek nesnesi");
  b += B(X(0) - 40, 46, 100, 28, "QR gösterildi", { size: 10, fill: C.paper, stroke: C.muted });
  b += B(X(5) - 10, 124, 170, 40, ["QR'ı gören kişi nesneyi", "çeker (state = S)"], { size: 9.5, fill: C.red50, stroke: C.red, color: C.red });
  b += B(X(20) - 20, 46, 230, 28, "sahte ret (S) → sunum REDDEDİLDİ", { size: 10, fill: C.red50, stroke: C.red, color: C.red, weight: 600 });
  b += B(X(40) - 10, 124, 200, 40, ["Aynur'un cüzdanı gelir:", "geç kaldı"], { size: 9.5, fill: "#EEEEEC", stroke: C.rule, color: C.muted });
  [[5, 124], [20, 74], [40, 124]].forEach(([t, yy]) => (b += line(X(t), 100, X(t), yy, { stroke: C.muted, dash: true })));
  b += lane(290, "Bugün: her çekim ayrı dal");
  b += B(X(5) - 10, 314, 170, 40, ["dal 1 (state = S1)", "sahte ret: yalnız dal 1 kapanır"], { size: 9.5, fill: C.red50, stroke: C.red, color: C.red });
  b += B(X(20) - 20, 236, 230, 40, ["Aynur'un cüzdanı: dal 2", "(S2, yeni nonce, yeni anahtar)"], { size: 9.5, fill: C.gok50, stroke: C.gok });
  b += B(X(40) - 10, 314, 200, 40, ["sunum dal 2'de", "tamamlandı: kabul"], { size: 10, fill: G50, stroke: C.green, color: C.green, weight: 600 });
  [[5, 314], [20, 276], [40, 314]].forEach(([t, yy]) => (b += line(X(t), 290, X(t), yy, { stroke: C.muted, dash: true })));
  b += note(450, 380, "Sahte ret yalnız sahtecinin kendi dalını kapatır.", { size: 11 });
  save(16, 900, 392, b);
}

// Şekil 17 — Yakın alanda üç yol
cur = 17;
{
  let b = "";
  const cols = [
    ["B: Geçiş kartı", "imzalı jeton, 60 sn, kişisel veri yok", "Kapı terminali", "terminal anahtarıyla doğrulama servisine", "bir kez kayıt, sonra her gün geçiş", false],
    ["C: Yüz yüze kontrol", "5 dk geçerli görüntüleme anahtarı", "Görevlinin telefonu", "önce doğrulayıcıya olağan sunum", "görevli sonucu görür", false],
    ["Hedef: ISO/IEC 18013-5", "tanışma (Bluetooth oturumu)", "Okuyucu", "şifreli oturum, mdoc", "kodlandı, cihaz testi bekliyor", true],
  ];
  cols.forEach(([t, qr, dst, via, foot, dash], i) => {
    const x = 20 + i * 296;
    b += B(x, 10, 270, 330, null, { fill: dash ? "#FFFFFF" : C.paper, stroke: dash ? C.gok : C.rule, dash });
    b += heading(x + 135, 32, t, { size: 12.5 });
    b += phone(x + 20, 52, 90, 150);
    b += `<rect x="${x + 38}" y="${88}" width="54" height="54" fill="#FFFFFF" stroke="${C.ink}" stroke-width="1.4"/>`;
    for (let k = 0; k < 4; k++) for (let j = 0; j < 4; j++) if ((k + j * 3) % 3 !== 1) b += `<rect x="${x + 42 + k * 12}" y="${92 + j * 12}" width="9" height="9" fill="${C.ink}"/>`;
    b += text(x + 65, 160, "Göster", { size: 10, weight: 600, fill: C.gok700 });
    b += text(x + 65, 178, "canlı saat", { size: 9, fill: C.muted });
    b += B(x + 150, 92, 104, 60, dst, { size: 10.5, weight: 600, fill: "#FFFFFF", stroke: C.ink });
    if (i === 2) {
      b += line(x + 112, 118, x + 148, 118, { stroke: C.gok, sw: 1.4 });
      b += line(x + 112, 126, x + 148, 126, { stroke: C.gok, sw: 1.4 });
    } else b += arrow(x + 112, 122, x + 148, 122);
    b += W(x + 135, 226, cat(tone("QR'ın içi:"), " ", tone(qr)), 240, { size: 10, fill: C.ink, halo: false });
    b += W(x + 135, 268, via, 240, { size: 10, fill: C.gok700, halo: false });
    b += W(x + 135, 314, foot, 240, { size: 10, italic: true, fill: C.muted, halo: false });
  });
  b += B(20, 350, 860, 30, ["Göster ekranı aynı kalır; değişen yalnız QR'ın arkasındaki taşıma."], { size: 11, fill: C.gold50, stroke: C.gold, color: GOLDTXT, weight: 600 });
  save(17, 900, 390, b);
}

// Şekil 18 — Doğrulama hattı
cur = 18;
{
  let b = "";
  const S = [["T0", "Ön koşul", "liste taze mi"], ["A", "Biçim", "A3b: kimlik sertifikadan"], ["B", "Tür", ""], ["C", "Güven", "C2 atlanamaz"], ["D", "Durum", ""], ["E", "Politika", "E4: denetim kaydı"]];
  S.forEach(([c, t, d], i) => {
    const x = 14 + i * 128;
    b += B(x, 40, 110, 70, d, { title: cat(c, " ", tone(t)), size: 9.5, tsize: 12 });
    if (i < S.length - 1) b += arrow(x + 110, 75, x + 126, 75);
    if (i > 0) b += arrow(x + 40, 112, x + 40, 160, { kind: "r", sw: 1.3 });
    b += arrow(x + 72, 112, x + 72, 222, { kind: "m", dash: true, sw: 1.3 });
  });
  b += lock(14 + 3 * 128 + 96, 52, C.red, 0.7);
  b += arrow(14 + 5 * 128 + 110, 75, 806, 75, { kind: "" });
  b += B(808, 52, 80, 46, "kabul", { size: 12, weight: 700, fill: G50, stroke: C.green, color: C.green });
  b += B(132, 2, 130, 26, ["Z1 sıfır bilgi ispatı"], { size: 9, fill: C.gold50, stroke: C.gold, dash: true });
  b += arrow(197, 28, 197, 38, { kind: "g", sw: 1 });
  b += B(130, 164, 660, 32, ["ret: belge geçersiz"], { size: 11, weight: 700, fill: C.red50, stroke: C.red, color: C.red });
  b += B(14, 226, 776, 32, ["doğrulanamadı: hüküm yok; ret gibi gösterilmez, ayrı gösterilir"], { size: 11, weight: 700, fill: "#EEEEEC", stroke: C.muted, color: C.muted });
  b += note(450, 276, "T0'dan yalnız \"doğrulanamadı\" çıkar; Z1 yalnız ZK sunumunda çalışır.", { size: 10.5 });
  save(18, 900, 288, b);
}

// Şekil 19 — İptal listesi bitleri
cur = 19;
{
  let b = "";
  b += note(530, 16, "Liste imzalı, sabit aralıkla yayımlanır; doğrulayıcı önceden indirir.", { size: 10.5 });
  b += B(14, 40, 220, 80, ["status: idx 48213", "uri …/7f3a9c21"], { title: "Diploma · Örnek Üniversitesi", size: 10, tsize: 11 });
  b += B(14, 190, 220, 80, ["status: idx 48213", "uri …/c41f…"], { title: "Kimlik belgesi · kimlik servisi", size: 10, tsize: 11 });
  const strip = (y, ttl, n, hi, val, color) => {
    let s = text(270, y - 18, ttl, { anchor: "start", size: 11, weight: 600, fill: C.gok700 });
    for (let i = 0; i < 10; i++) s += `<rect x="${270 + i * 34}" y="${y}" width="30" height="22" fill="${i === 4 ? C.gold50 : "#FFFFFF"}" stroke="${C.rule}"/>`;
    s += P(`M${270 + 4 * 34 + 15},${y + 22} L560,${y + 46}`, { stroke: C.gold, sw: 1.1, end: false });
    const cw = n === 4 ? 70 : 36;
    for (let k = 0; k < n; k++) {
      const x = 560 + k * cw;
      s += `<rect x="${x}" y="${y + 46}" width="${cw - 4}" height="34" fill="${k === hi ? color : "#FFFFFF"}" stroke="${C.ink}" stroke-width="1"/>`;
      s += text(x + (cw - 4) / 2, y + 63, k === hi ? val : n === 4 ? "00" : "0", { size: 11, weight: k === hi ? 700 : 400, fill: k === hi ? "#FFFFFF" : C.muted });
      s += text(x + (cw - 4) / 2, y + 92, `k=${k}`, { size: 9, fill: C.muted });
    }
    return s;
  };
  b += strip(50, "kurum listesi, 2 bit: bayt 12053 büyütülmüş", 4, 2, "10", C.gold);
  b += strip(200, "kimlik servisi listesi, 1 bit: bayt 6026", 8, 5, "1", C.red);
  b += arrow(236, 80, 266, 62);
  b += arrow(236, 230, 266, 212);
  b += B(560, 316, 330, 40, ["00 geçerli · 01 iptal · 10 askıda (yalnız izin veren türde)", "1 bitlik listede askı yok"], { size: 10, fill: C.paper, stroke: C.rule });
  b += note(124, 300, "Değerler örnektir.", { size: 10 });
  save(19, 900, 366, b);
}

// Şekil 20 — Yayın döngüsü
cur = 20;
{
  let b = "";
  const X = (m) => 172 + m * 48;
  b += text(20, 40, "Kurumun yayınları", { anchor: "start", size: 11.5, weight: 600, fill: C.gok700 });
  b += text(20, 130, "Çapa günlüğü", { anchor: "start", size: 11.5, weight: 600, fill: C.gok700 });
  b += text(20, 210, ["Doğrulayıcının", "ön çekimleri"], { anchor: "start", size: 11.5, weight: 600, fill: C.gok700 });
  b += `<rect x="${X(0) - 20}" y="66" width="${X(12) - X(0) + 40}" height="34" fill="#EEEEEC"/>`;
  b += text(X(0) - 14, 92, "kurumun içi", { anchor: "start", size: 9, italic: true, fill: C.muted });
  for (let m = 0; m <= 12; m += 2) {
    b += B(X(m) - 16, 24, 32, 32, "", { fill: C.gok50, stroke: C.gok, r: 3 });
    b += text(X(m), 40, "✓", { size: 10, fill: C.gok });
    b += circle(X(m), 130, 5, { fill: C.gok });
    b += text(X(m), 148, fmt("sürüm {0}", m / 2 + 1), { size: 9, fill: C.muted });
    b += arrow(X(m), 172, X(m), 196, { sw: 1.2 });
  }
  b += line(X(0), 130, X(12), 130, { stroke: C.gok });
  b += cross(X(3), 83, 6);
  b += T(X(3) + 12, 83, "Elif diplomayı askıya aldı", { size: 9.5, fill: C.red, anchor: "start", halo: false });
  b += `<rect x="${X(4) - 18}" y="22" width="36" height="36" rx="3" fill="none" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  b += B(X(6) - 50, 204, 100, 26, "askıyı öğrendi", { size: 9.5, fill: G50, stroke: C.green, color: C.green, weight: 600 });
  b += line(X(0), 250, X(12), 250, { stroke: C.ink });
  for (let m = 0; m <= 12; m += 2) b += text(X(m), 266, fmt("{0}. dk", m), { size: 9, fill: C.muted });
  b += `<path d="M${X(3)},280 v6 h${X(6) - X(3)} v-6" fill="none" stroke="${C.gold}" stroke-width="1.6"/>`;
  b += T((X(3) + X(6)) / 2, 300, "en kötü gecikme ≤ yayın aralığı + ön çekim aralığı", { size: 10, fill: GOLDTXT });
  b += B(780, 24, 110, 210, ["exp = 6 saat:", "sunucu", "kesilirse", "son listeyle", "devam"], { size: 10, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  b += note(430, 322, "Bütün yayınlar dışarıdan aynı görünür; iptal olup olmadığı yayından anlaşılmaz.", { size: 10 });
  save(20, 900, 334, b);
}

// Şekil 21 — Cüzdan birimi ve kanıtlar
cur = 21;
{
  let b = "";
  b += phone(20, 40, 200, 230);
  b += B(36, 74, 168, 80, ["belge anahtarları", "(dışa çıkmaz)"], { title: "güvenli donanım", size: 10, fill: C.gold50, stroke: C.gold, tcolor: GOLDTXT });
  b += B(36, 170, 168, 70, ["birim anahtarı"], { title: "cüzdan uygulaması", size: 10, fill: C.gok50 });
  b += B(340, 60, 250, 170, null, { fill: C.paper, stroke: C.muted });
  b += heading(465, 80, "Cüzdan sağlayıcısı", { size: 12.5, fill: C.ink });
  b += W(465, 112, "birim kaydı: parmak izi, sürüm, iptal durumu; kişisel veri yok", 220, { size: 10, fill: C.ink, halo: false });
  b += B(354, 150, 222, 30, "WIA iptal listesi (≥ 10.000)", { size: 10, fill: "#FFFFFF", stroke: C.muted });
  b += B(354, 188, 222, 30, "KA iptal listesi (tür başına)", { size: 10, fill: "#FFFFFF", stroke: C.muted });
  b += arrow(222, 90, 336, 90);
  b += T(280, 64, ["kurulumda: birim kaydı", "+ cihaz kanıtı"], { size: 9.5, fill: C.gok700 });
  b += arrow(222, 130, 336, 130);
  b += T(280, 118, "her işlemde: WIA iste", { size: 9.5, fill: C.gok700 });
  b += arrow(336, 210, 222, 210, { kind: "g" });
  b += T(280, 236, ["WIA (< 24 sa, yeni anahtar,", "yeni giriş) + KA"], { size: 9.5, fill: GOLDTXT });
  b += B(680, 150, 200, 60, ["Belge veren kurum"], { size: 12, weight: 600 });
  b += P("M220,262 C400,330 600,300 700,214", { sw: 1.6 });
  b += T(470, 300, "WIA + KA + anahtar kanıtı (proof)", { size: 10, fill: C.gok700 });
  b += B(680, 30, 200, 50, ["Güven listesi:", "wallet_providers[]"], { size: 10.5, fill: C.gold50, stroke: C.gold, color: GOLDTXT, weight: 600 });
  b += arrow(780, 148, 780, 84, { kind: "g", dash: true });
  b += T(784, 116, ["sağlayıcı listede mi,", "anahtarı ACTIVE mi"], { size: 9.5, fill: GOLDTXT, anchor: "start" });
  b += B(20, 330, 520, 30, "her işlemde yeni WIA: kurumlar cüzdanı birbirine bağlayamaz", { size: 10.5, fill: G50, stroke: C.green, color: C.green });
  b += B(560, 330, 320, 30, "ağ sağlayıcı işletmez, listeler", { size: 10.5, fill: "#EEEEEC", stroke: C.muted, color: C.muted });
  save(21, 900, 370, b);
}

// Şekil 22 — Kimlik zinciri
cur = 22;
{
  let b = "";
  const K = [
    ["Uzaktan kimlik doğrulama", "belge taraması, canlılık, yüz eşleştirmesi", "yalnız kimlik servisinde"],
    ["Kimlik belgesi", "cüzdanda; SD-JWT VC + mdoc; 10 kopya", "PID değil, nitelikli olmayan EAA"],
    ["Kurumun eşleştirmesi", "kimlik numarası, doğum tarihi, ad ve soyadla kendi kaydını eşler", "eşleştirme anahtarı saklanmaz"],
    ["Kurum belgesi", "diploma, öğrenci belgesi", ""],
  ];
  K.forEach(([t, d, n], i) => {
    const x = 14 + i * 222;
    b += B(x, 60, 196, 96, d, { title: t, size: 10, tsize: 11.5, fill: i < 2 ? C.gok50 : C.paper, stroke: i < 2 ? C.gok : C.ink });
    if (n) b += W(x + 98, 176, n, 190, { size: 9.5, italic: true, fill: C.muted });
    if (i < 3) b += arrow(x + 196, 108, x + 220, 108);
  });
  b += T(234, 40, "OpenID4VCI, yetki kodu", { size: 10, fill: C.gok700 });
  b += T(456, 40, "OpenID4VP, seçici açıklama", { size: 10, fill: C.gok700 });
  b += P("M210,52 L232,90", { sw: 1, kind: "m", stroke: C.muted });
  b += P("M432,52 L454,90", { sw: 1, kind: "m", stroke: C.muted });
  b += B(14, 214, 418, 44, ["Devlet PID'i geldiğinde: 1 ve 2'nin yerini devlet sağlayıcısı alır"], { size: 10.5, fill: "#FFFFFF", stroke: C.gok, dash: true });
  b += B(458, 214, 418, 44, ["3 ve 4 değişmez"], { size: 10.5, fill: "#FFFFFF", stroke: C.gok, dash: true });
  b += W(450, 284, "Uzaktan kimlik doğrulama sağlayıcısı yalnız kimlik servisiyle konuşur; kurum, cüzdan ve doğrulayıcı onu görmez.", 820, { size: 10, fill: C.muted, italic: true });
  save(22, 900, 300, b);
}

// Şekil 23 — Bağlanabilirlik kanalları
cur = 23;
{
  let b = "";
  b += `<circle cx="450" cy="210" r="70" fill="${C.gok50}" stroke="${C.gok}" stroke-width="2"/>`;
  b += text(450, 210, ["Aynur'un", "gösterimleri"], { size: 13, weight: 700, fill: C.gok700 });
  const ch = [
    ["Aynı kopya, aynı imza ve anahtar", "her doğrulayıcıya ayrı kopya, ayrı cihaz anahtarı", 0],
    ["Veriliş saniyesi", "iat ve exp saat başına yuvarlanır", 0],
    ["İptal listesi konumu", "rastgele konum, toplu ön çekim; ZK'da konum açılmaz", 0],
    ["Site hesabı tanımlayıcısı", "site başına takma ad", 0],
    ["Cüzdan kanıtı", "her işlemde yeni WIA anahtarı", 0],
    ["Kurumun kendi imzası (kurum ile doğrulayıcının işbirliği)", "sıfır bilgi ispatı; bugün artık risk L3", 1],
  ];
  const pos = [[30, 28], [30, 172], [30, 316], [610, 28], [610, 172], [610, 316]];
  ch.forEach(([c, m, g], i) => {
    const [x, y] = pos[i];
    const left = x < 450;
    const cx = left ? x : x + 140;
    b += B(cx, y, 120, 70, c, { size: 9.5, fill: C.red50, stroke: C.red, color: C.red, weight: 600 });
    const mx = left ? x + 130 : x;
    b += B(left ? cx + 130 : cx - 130, y, 120, 70, m, { size: 9.5, fill: g ? C.gold50 : G50, stroke: g ? C.gold : C.green, color: g ? GOLDTXT : C.green });
    const ax = left ? cx + 250 : cx - 130;
    const tx = left ? 384 : 516;
    b += arrow(left ? cx + 250 : cx - 130, y + 35, tx, 210 + (y - 172) * 0.25, { kind: "r", dash: true, sw: 1.1 });
    b += line(left ? cx + 120 : cx, y + 35, left ? cx + 130 : cx - 10, y + 35, { stroke: C.muted });
  });
  b += note(450, 410, "Ortak kayıtlarda (liste, günlük, defter) kişisel veri yok: bu ayrı bir kanal değil, tasarımın tabanıdır.", { size: 10.5 });
  save(23, 900, 424, b);
}

// Şekil 24 — Takma ad türetme ağacı (yarım)
cur = 24;
{
  let b = "";
  b += B(60, 10, 460, 50, ["tohum = HMAC(k_ps, ülke, kimlik no)"], { title: "Kimlik servisi", size: 11, fill: C.gok, stroke: C.gok, color: "#FFFFFF", tcolor: "#FFFFFF" });
  b += line(290, 60, 290, 110, { stroke: C.muted, dash: true });
  b += T(300, 84, "tohum saklanmaz; ayrı ve gösterilmeyen belgeyle cüzdana", { size: 10, fill: C.muted, anchor: "start" });
  b += B(170, 112, 240, 44, ["Cüzdanın güvenli deposu: tohum"], { size: 11, weight: 600, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  const D = [["site-a.example", "anahtar A", "takma ad A"], ["site-b.example", "anahtar B", "takma ad B"], ["site-b.example, sıra 1", "anahtar B1", "yalnız çoklu takma ada izin veren sitede"]];
  D.forEach(([s, k, t], i) => {
    const x = 20 + i * 190;
    b += arrow(290, 156, x + 85, 196, { sw: 1.2 });
    b += B(x, 200, 170, 34, s, { size: 10, fill: "#FFFFFF" });
    b += arrow(x + 85, 234, x + 85, 250, { sw: 1 });
    b += B(x, 252, 170, 30, k, { size: 10, fill: C.gok50 });
    b += arrow(x + 85, 282, x + 85, 298, { sw: 1 });
    b += B(x, 300, 170, 40, t, { size: 9.5, fill: C.paper, stroke: C.muted });
  });
  b += line(190, 267, 210, 267, { stroke: C.red, dash: true });
  b += cross(200, 267, 5);
  b += T(200, 362, "A ile B eşleştirilemez", { size: 10, fill: C.red, weight: 600 });
  b += B(20, 378, 550, 34, ["tohum anahtarı + kimlik numarası birlikte: kuramsal türetme (bilinen zayıflama)"], { size: 10, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  save(24, 590, 420, b);
}

// Şekil 25 — ZK sunumu
cur = 25;
{
  let b = "";
  b += heading(220, 22, "Klasik seçici açıklama (mdoc)", { size: 13 });
  b += heading(680, 22, "Sıfır bilgi ispatı (mso_mdoc_zk)", { size: 13 });
  b += text(220, 44, "doğrulayıcının gördükleri", { size: 10.5, italic: true, fill: C.muted });
  b += text(680, 44, "doğrulayıcının gördükleri", { size: 10.5, italic: true, fill: C.muted });
  const Lc = [["age_over_18 = evet", 0], ["kurumun imzası", 0], ["MSO (alan özetleri, geçerlilik)", 1], ["cihaz anahtarının açık yarısı", 1], ["iptal listesi konumu", 1]];
  Lc.forEach(([t, r], i) => (b += B(40, 58 + i * 40, 360, 32, t, { size: 10.5, fill: r ? C.red50 : C.gok50, stroke: r ? C.red : C.gok, color: r ? C.red : C.ink })));
  b += note(220, 268, "kırmızılar: kopyalar arasında aynı ya da kuruma tanıdık", { size: 10 });
  const Rc = ["age_over_18 = evet", "belge veren (listedeki kurum anahtarı)", "belge türü: ZK kopyası", "ispat bu oturuma ait"];
  Rc.forEach((t, i) => (b += B(500, 58 + i * 40, 360, 32, t, { size: 10.5, fill: C.gok50 })));
  b += B(500, 222, 360, 52, ["görünmeyenler: imza, MSO, tuzlar, cihaz anahtarı,", "iptal konumu, doğum tarihi"], { size: 10, fill: G50, stroke: C.green, color: C.green });
  b += line(450, 30, 450, 300, { stroke: C.rule });
  b += B(500, 286, 360, 30, "iptal yerine kısa ömür: kopya en çok 24 saat", { size: 10.5, fill: C.gold50, stroke: C.gold, color: GOLDTXT, weight: 600 });
  save(25, 900, 326, b);
}

// Şekil 26 — Güven sınırları
cur = 26;
{
  let b = "";
  const bx = (x, y, w, h, t) => B(x, y, w, h, t, { size: 11.5, weight: 700, fill: "#FFFFFF", stroke: C.gok, dash: true, sw: 1.6 });
  b += bx(340, 150, 200, 80, ["Cihaz", "(güvenli donanım)"]);
  b += bx(20, 20, 200, 64, "Cüzdan sağlayıcısı");
  b += bx(20, 280, 200, 64, "Belge verme hizmeti");
  b += bx(20, 400, 200, 56, "Kurumun imza hizmeti");
  b += bx(660, 20, 220, 64, "Liste yayıncısı");
  b += bx(660, 300, 220, 64, "Doğrulayıcı");
  b += arrow(336, 160, 224, 70);
  b += T(268, 128, ["cihaz kanıtı", "(W3'te zorunlu)"], { size: 9.5, fill: C.gok700, anchor: "end" });
  b += arrow(220, 46, 340, 146, { kind: "g" });
  b += T(306, 40, "WIA (< 24 sa), KA", { size: 9.5, fill: GOLDTXT });
  b += arrow(336, 220, 224, 290);
  b += T(258, 238, ["WIA + KA + anahtar", "kanıtı + DPoP"], { size: 9.5, fill: C.gok700 });
  b += arrow(120, 346, 120, 396, { both: true });
  b += T(128, 372, "yalnız SHA-256 özeti (CSC API v2) · imza yerelde, listedeki sertifikayla denetlenir", { size: 9.5, fill: C.gok700, anchor: "start" });
  b += arrow(660, 70, 544, 156, { sw: 3 });
  b += arrow(770, 86, 770, 296, { sw: 3 });
  b += T(640, 128, ["imzalı liste +", "çapa günlüğü"], { size: 10, fill: C.gok700, weight: 600 });
  b += arrow(656, 320, 544, 214);
  b += T(640, 232, ["imzalı istek +", "kayıt sertifikası"], { size: 9.5, fill: C.gok700 });
  b += arrow(544, 226, 656, 346, { kind: "g" });
  b += T(560, 300, ["şifreli yanıt +", "cihaz bağı (KB-JWT)"], { size: 9.5, fill: GOLDTXT });
  b += B(600, 400, 280, 48, ["Tek çapa: kök parmak izi", "(bant dışı yayımlanır)"], { size: 10.5, weight: 600, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  b += key(570, 424);
  save(26, 900, 466, b);
}

// Şekil 27 — Sahte bilet tüketme
cur = 27;
{
  let b = "";
  const row = (y, ttl, steps) => {
    let s = text(20, y - 30, ttl, { anchor: "start", size: 12.5, weight: 700, fill: C.gok700 });
    s += line(30, y + 30, 690, y + 30, { stroke: C.ink, sw: 1.2 });
    steps.forEach(([t, k], i) => {
      const x = 30 + i * 168;
      const f = k === "r" ? [C.red50, C.red, C.red] : k === "g" ? [G50, C.green, C.green] : [C.gok50, C.gok, C.ink];
      s += B(x, y - 14, 154, 64, t, { size: 9.5, fill: f[0], stroke: f[1], color: f[2] });
    });
    return s;
  };
  b += row(50, "Önce", [["1. Nurlan QR'ı gösterir (60 sn jeton)", ""], ["2. Saldırgan fotoğraf çeker", ""], ["3. Saldırgan jetonu gönderir: kabul, bilet tüketildi", "r"], ["4. Nurlan kapıda: \"bilet kullanılmış\"", "r"]]);
  b += row(190, "Sonra", [["1. Nurlan QR'ı gösterir (60 sn jeton)", ""], ["2. Saldırgan fotoğraf çeker", ""], ["3. İstek terminal anahtarı taşımıyor: jetona dokunulmaz", "g"], ["4. Kapı kurumun terminal anahtarıyla gönderir: Nurlan girer", "g"]]);
  b += B(714, 60, 170, 170, "Kapı grubu listede: kurum ve izinli politikalar; grup listeden çıkarsa kapı reddedilir", { size: 10, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  save(27, 900, 270, b);
}

// Şekil 28 — Geliştiricinin yolu
cur = 28;
{
  let b = "";
  const S = [
    ["Sandbox", "sahte kişiler ve örnek kurumlarla uçtan uca deneme", "test kökü"],
    ["Uyum testleri", "vektörler ve taahhüt testleri", "bayat liste = doğrulanamadı"],
    ["Telefonla gerçek akış", "sandbox'ta, gerçek cihazla", ""],
    ["Kayıt başvurusu", "kayıt verisi + uyum raporu", "kayıt kurumu testleri yeniden çalıştırabilir"],
    ["Gerçek ağ", "listede kayıt, gerçek kök", ""],
  ];
  S.forEach(([t, d, n], i) => {
    const x = 14 + i * 178;
    const last = i === 4;
    b += B(x, 40, 156, 96, d, { title: cat(`${i + 1}. `, tone(t)), size: 10, tsize: 11.5, fill: last ? G50 : C.gok50, stroke: last ? C.green : C.gok, tcolor: last ? C.green : C.gok700 });
    if (n) b += W(x + 78, 156, n, 150, { size: 9.5, italic: true, fill: C.muted });
    if (i < 4) b += arrow(x + 156, 88, x + 176, 88);
  });
  b += `<rect x="704" y="20" width="6" height="150" fill="${C.red}"/>`;
  b += T(560, 204, "sandbox belgesi gerçek ağda geçmez; güven kökleri ayrıdır", { size: 10.5, fill: C.red, weight: 600 });
  b += B(14, 226, 872, 32, ["Kendi yazılımınızı aynı kurallarla kurabilirsiniz: paketler Apache-2.0"], { size: 10.5, fill: C.paper, stroke: C.rule, color: C.muted });
  save(28, 900, 268, b);
}

// Şekil 29 — Egemenliğin üç katmanı
cur = 29;
{
  let b = "";
  const R = [
    ["Ağa üyelik", "kabul, çıkarma, protokol yükseltmesi", "üye devletler, üçte iki (yükseltmede 7 gün bekleme)", C.gok, "#FFFFFF"],
    ["Ulusal kayıtlar", "belge verenler, doğrulayıcılar, kök", "yalnız ilgili devlet; dış oy yok", C.gok50, C.ink],
    ["Sınır ötesi tanıma", "\"X'in belgelerini kabul ediyor muyum?\"", "her devlet kendi adına; tek yönlü", C.gold50, C.ink],
  ];
  R.forEach(([t, k, d, fill, col], i) => {
    const y = 14 + i * 100;
    b += `<rect x="14" y="${y}" width="872" height="86" rx="8" fill="${fill}" stroke="${C.gok}" stroke-width="1.2"/>`;
    b += text(30, y + 26, t, { anchor: "start", size: 13, weight: 700, fill: col === "#FFFFFF" ? "#FFFFFF" : C.gok700 });
    b += text(30, y + 50, k, { anchor: "start", size: 10.5, fill: col });
    b += text(870, y + 26, "karar veren", { anchor: "end", size: 9.5, italic: true, fill: col === "#FFFFFF" ? "#DDE8EE" : C.muted });
    b += text(870, y + 50, d, { anchor: "end", size: 10.5, weight: 600, fill: col });
  });
  ["TR", "AZ", "KZ", "KG", "UZ", "HU", "TM"].forEach((s, i) => (b += B(330 + i * 44, 174, 38, 22, s, { size: 9.5, weight: 700, fill: i ? "#FFFFFF" : C.gok, color: i ? C.muted : "#FFFFFF", stroke: i ? C.muted : C.gok, dash: i > 0, r: 3 })));
  b += arrow(420, 278, 470, 278, { kind: "g" });
  b += arrow(520, 290, 470, 290, { kind: "g" });
  b += B(14, 314, 872, 30, ["çıkış hakkı (oy gerekmez) · çıkarma, verilmiş belgeleri geçersiz kılmaz"], { size: 10.5, fill: C.paper, stroke: C.rule });
  b += note(450, 362, "Bugün yalnız Türkiye listesi etkin. Yuvalar anlaşma ya da görüşme bildirimi değildir.", { size: 10.5 });
  save(29, 900, 374, b);
}

// Şekil 30 — Yönetişim aşamaları
cur = 30;
{
  let b = "";
  const S = [
    ["Liste aşaması (bugün)", "imzalı listeler + çapa günlüğü", "geçici işletmeci", true],
    ["Defter aşaması", "ortak defter (liste kayıtlarının özetleri)", "ilk işletmeciler", false],
    ["Devlet katılımı", "ortak defter", "konsey (üçte iki)", false],
    ["Kurumsal genişleme", "ortak defter", "konsey", false],
  ];
  const X = [90, 330, 570, 800];
  b += line(60, 70, 840, 70, { stroke: C.gok, sw: 2 });
  S.forEach(([t, c, k, now], i) => {
    b += circle(X[i], 70, 12, { fill: now ? C.gok : "#FFFFFF", stroke: C.gok, sw: 2.4 });
    b += B(X[i] - 88, 96, 176, 92, mark([cat(tone("çapa:"), " ", tone(c)), cat(tone("yöneten:"), " ", tone(k))].flatMap((l) => wrap(l, 160, 10))), { title: t, size: 10, tsize: 11.5, fill: now ? C.gok50 : "#FFFFFF" });
  });
  const C2 = ["≥ 2 bağımsız işletmeci, yazılı kabul + eşdeğerlik testi", "ilk devlet işletmecisi üretimde", "konseyin eşikleri"];
  C2.forEach((c, i) => (b += W((X[i] + X[i + 1]) / 2, 30, c, 210, { size: 9.5, fill: GOLDTXT })));
  b += `<path d="M${X[0] + 60},62 l8,-12 l8,12 z" fill="${C.gold}"/>`;
  b += T(X[0] + 68, 224, "", {});
  b += W(210, 214, "vakfa devir: işletmeci değişir, listeler aynı kalır", 200, { size: 9.5, fill: GOLDTXT });
  b += B(14, 250, 872, 32, ["Değişmeyenler: kurum, kök ve belge türü kimlikleri · verilmiş belgeler · doğrulama hattı"], { size: 10.5, fill: C.paper, stroke: C.rule });
  b += note(450, 300, "Tarih yok; her geçiş bir koşula bağlıdır.", { size: 10 });
  save(30, 900, 312, b);
}

// Şekil 31 — Projeksiyon
cur = 31;
{
  let b = "";
  b += B(20, 30, 260, 150, ["listelerin listesi, sürüm n", "tl-tr, sürüm n", "günlüğün son satırı"], { title: "Kaynak: imzalı listeler + çapa günlüğü", size: 10.5, fill: C.gok50, stroke: C.gok, sw: 2.4 });
  b += B(330, 66, 230, 80, "önce kendi çıktısını doğrular, sonra yalnız özetleri gönderir", { title: "Liste yayıncısı", size: 10, fill: C.paper, stroke: C.ink });
  b += B(610, 30, 270, 150, ["sürüm, içerik özeti,", "önceki özet, zaman", "kayıt özetleri, parmak izleri"], { title: "Türev: ortak defter (bugün yok, kapalı)", size: 10.5, fill: "#FFFFFF", stroke: C.muted, dash: true });
  b += arrow(282, 106, 326, 106, { sw: 3 });
  b += arrow(562, 106, 606, 106, { sw: 3 });
  b += T(584, 128, ["yalnız", "özetler"], { size: 10, weight: 600, fill: C.gok700 });
  b += note(745, 196, "çelişkide liste geçerli", { size: 10.5 });
  b += B(330, 250, 230, 44, ["Doğrulama hattı"], { size: 12, weight: 700, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  b += arrow(330, 262, 150, 184, { sw: 2.2 });
  b += T(200, 236, "yalnız buradan okur", { size: 10, fill: C.gok700, weight: 600 });
  b += arrow(560, 262, 740, 184, { kind: "m", dash: true, sw: 1.1 });
  b += T(720, 236, "isteğe bağlı: evet / hayır / bilinmiyor", { size: 10, fill: C.muted });
  ["belge", "belge özeti", "kişisel veri", "kayıt içeriği"].forEach((t, i) => {
    const x = G("f31.x", [640, 700, 760, 820])[i];
    b += text(x, 316 - (i % 2) * 0, t, { size: 9.5, fill: C.muted });
  });
  b += line(612, 316, 878, 316, { stroke: C.red, sw: 1.4 });
  b += T(745, 336, "defterde olmayanlar", { size: 9.5, italic: true, fill: C.red });
  save(31, 900, 348, b);
}

// Şekil 32 — Rakip adaylar
cur = 32;
{
  let b = "";
  const A = 90, Bx = 270, Cx = 450, D = 700;
  b += lifelines([{ x: A, label: ["Yazıcı A"] }, { x: Bx, label: ["Yazıcı B"] }, { x: Cx, label: ["Yazıcı C"] }, { x: D, label: ["Defter"], gold: true }], 10, 380, 140);
  b += msg(96, A, D, "1. sürüm 42 için X", { slack: 0 });
  b += B(D + 14, 82, 172, 28, "aday 1 (X), destek 1", { size: 9.5, fill: C.paper, stroke: C.rule });
  b += msg(160, Bx, D, "2. sürüm 42 için Y");
  b += B(D + 14, 140, 172, 44, ["aday 2 (Y), destek 1", "çelişki olayı: ilk X, gelen Y"], { size: 9.5, fill: C.gold50, stroke: C.gold, color: GOLDTXT });
  b += msg(232, Cx, D, ["3. kendi doğruladığı", "listeden X'i hesaplar"]);
  b += B(D + 14, 212, 172, 44, ["aday 1, destek 2 = k", "onaylandı; sürüm 42 kapandı"], { size: 9.5, fill: G50, stroke: C.green, color: C.green, weight: 600 });
  b += msg(304, Bx, D, "4. B yeniden gönderir", { kind: "r" });
  b += B(D + 14, 286, 172, 44, ["ret: bu sürüm için zaten", "bir aday destekledin"], { size: 9.5, fill: C.red50, stroke: C.red, color: C.red });
  b += W(450, 404, "Bir yazıcı, bir aday · çıkarılan yazıcının desteği sayılmaz · onaysız aday \"evet\" üretmez.", 860, { size: 10.5, italic: true, fill: C.muted });
  save(32, 900, 420, b);
}

// Şekil 33 — Tanıma yolları
cur = 33;
{
  let b = "";
  b += `<rect x="10" y="230" width="880" height="150" rx="8" fill="#EEEEEC"/>`;
  b += text(24, 250, "Teknik güven: tek taraflı, bugünden kurulabilir", { anchor: "start", size: 11, weight: 700, fill: C.muted });
  b += `<rect x="10" y="10" width="880" height="140" rx="8" fill="${C.gok}" opacity="0.92"/>`;
  b += text(24, 30, "Hukuki tanıma: devletler arası, iki taraflı", { anchor: "start", size: 11, weight: 700, fill: "#FFFFFF" });
  b += B(30, 270, 220, 100, ["listelerin listesi", "Türkiye listesi (etkin)", "diğer yuvalar (boş)"], { title: "Tamga Network", size: 10, fill: "#FFFFFF" });
  b += B(650, 270, 220, 100, ["AB listeleri", "AB doğrulayıcısı"], { title: "Avrupa Birliği", size: 10, fill: "#FFFFFF" });
  b += arrow(646, 296, 254, 296, { kind: "m", dash: true });
  b += T(450, 284, "AB listeleri dış liste olarak gösterilebilir; bugün dış liste yok", { size: 9.5, fill: C.muted });
  b += arrow(254, 344, 646, 344, { kind: "m", dash: true });
  b += T(450, 332, "AB doğrulayıcısı kendi isteğiyle Tamga listesini ekleyebilir; hukuki tanıma değildir", { size: 9.5, fill: C.muted });
  b += B(40, 50, 160, 50, "Bir devlet", { size: 12, weight: 700, fill: "#FFFFFF", stroke: "#FFFFFF" });
  b += B(700, 50, 160, 50, "Avrupa Birliği", { size: 12, weight: 700, fill: "#FFFFFF", stroke: "#FFFFFF" });
  b += arrow(204, 75, 696, 75, { sw: 3, kind: "g" });
  b += text(450, 56, "madde 14: uygulama tüzüğü ya da anlaşma (ABİHA md. 218) · karşılıklılık", { size: 10, fill: "#FFFFFF" });
  b += text(450, 96, "güven listesi · yalnız güven hizmetleri", { size: 10, fill: "#FFFFFF" });
  b += line(140, 266, 300, 80, { stroke: C.gold, sw: 1.4, dash: true });
  b += T(250, 196, "ağın rolü teknik hazırlık; anlaşmanın tarafı değil", { size: 10, fill: GOLDTXT, weight: 600 });
  b += B(560, 166, 320, 50, ["Madde 5f: AB içinde AB cüzdanlarını kabul", "yükümlülüğü; üçüncü ülke tanıması değildir"], { size: 9.5, fill: "#FFFFFF", stroke: C.muted, color: C.muted, dash: true });
  save(33, 900, 390, b);
}

// Şekil 34 — Karar haritası
cur = 34;
{
  let b = "";
  const themes = [
    ["Yönetişim ve defter", C.gok, C.gok50, [["0002", "egemenlik"], ["0009", "zincirsiz başlangıç"], ["0051", "projeksiyon"], ["0035", "üç katman"], ["0037", "yalnız ağ"], ["0042", "cüzdan işletmez"], ["0070", "geçici işletmeci"], ["0072", "değer katmanı"]]],
    ["Güven ve liste", C.gold, C.gold50, [["0004", "X.509"], ["0015", "tek arayüz"], ["0026", "kayıt sertifikası"], ["0068", "durum listesi"], ["0036", "federasyon"], ["0066", "ETSI XML"]]],
    ["Belge ve protokol", C.green, G50, [["0006", "SD-JWT VC"], ["0013", "mdoc"], ["0010", "URN"], ["0034", "HAIP"], ["0056", "güvenli varsayılan"], ["0067", "çekim dalları"]]],
    ["Cüzdan ve kimlik", C.red, C.red50, [["0025", "WIA ve KA"], ["0047", "birim iptali"], ["0060", "istemci örneği bağı"], ["0011", "geçici sağlayıcı"], ["0022", "nitelikli değil"], ["0020", "yetkili kaynak"], ["0057", "uzaktan imza"]]],
    ["Gizlilik", C.muted, "#EEEEEC", [["0008", "iptal listede"], ["0031", "takma ad"], ["0032", "ZK"], ["0044", "kısa ömürlü kopya"]]],
  ];
  const pos = {};
  themes.forEach(([t, st, fi, items], c) => {
    const x = 14 + c * 176;
    b += `<rect x="${x}" y="10" width="164" height="${46 + items.length * 46}" rx="8" fill="${fi}" opacity="0.6"/>`;
    b += text(x + 82, 28, t, { size: 11.5, weight: 700, fill: st === C.muted ? C.ink : st });
    items.forEach(([n, l], i) => {
      const y = 44 + i * 46;
      b += B(x + 8, y, 148, 36, null, { fill: "#FFFFFF", stroke: st, sw: 1.3 });
      b += text(x + 16, y + 18, n, { anchor: "start", size: 11, weight: 700, fill: st === C.muted ? C.ink : st });
      b += text(x + 54, y + 18, l, { anchor: "start", size: 9.5, fill: C.ink });
      check(l, 9.5, 400, 100);
      pos[n] = [x + 8, y, x + 156, y + 36];
    });
  });
  const mid = (n, side) => {
    const [x1, y1, x2, y2] = pos[n];
    return side === "l" ? [x1, (y1 + y2) / 2] : side === "r" ? [x2, (y1 + y2) / 2] : side === "t" ? [(x1 + x2) / 2, y1] : [(x1 + x2) / 2, y2];
  };
  const link = (a, sa, z, sz, o = {}) => {
    const [x1, y1] = mid(a, sa);
    const [x2, y2] = mid(z, sz);
    return P(`M${x1},${y1} C${x1 + (sa === "r" ? 30 : sa === "l" ? -30 : 0)},${y1} ${x2 + (sz === "r" ? 30 : sz === "l" ? -30 : 0)},${y2} ${x2},${y2}`, { sw: 1.1, ...o });
  };
  // dayanır (aynı sütunda kısa bağlar: sağ kenardan kavis)
  [["0051", "0009"], ["0042", "0037"], ["0037", "0035"], ["0070", "0037"], ["0068", "0026"], ["0013", "0006"], ["0022", "0011"], ["0057", "0020"], ["0044", "0032"]].forEach(([a, z]) => (b += link(a, "r", z, "r", { kind: "" })));
  // sütunlar arası
  b += link("0015", "l", "0051", "r", { kind: "", dash: true });
  b += link("0034", "l", "0026", "r", { kind: "" });
  b += link("0044", "l", "0011", "r", { kind: "" });
  // değiştirir
  const yl = 46 + 8 * 46 + 40;
  b += `<rect x="14" y="${yl}" width="872" height="62" rx="8" fill="#FFFFFF" stroke="${C.gold}" stroke-dasharray="5 4"/>`;
  b += text(30, yl + 18, "değiştirir (kesikli):", { anchor: "start", size: 10.5, weight: 700, fill: GOLDTXT });
  b += text(200, yl + 18, "0072 → 0003 (değer katmanı kancaları, yerini aldı) · 0010 → kararlı HTTPS adresi olarak vct", { anchor: "start", size: 9.5, fill: C.ink });
  b += text(30, yl + 42, "0025 → 30 günlük cüzdan kanıtı · 0060 → DPoP anahtarına bağlı yenileme · 0048 → kimlikte askı · 0027 → günlüğün hiç çıkmaması", { anchor: "start", size: 9.5, fill: C.ink });
  b += P(`M${pos["0072"][0] + 74},${pos["0072"][3]} L${pos["0072"][0] + 74},${yl}`, { kind: "g", dash: true, sw: 1.1 });
  b += line(700, yl + 74, 740, yl + 74, { stroke: C.gok, sw: 1.4 });
  b += text(748, yl + 74, "dayanır", { anchor: "start", size: 10, fill: C.ink });
  b += note(300, yl + 76, "Tam liste Ek B'de; temalara göre tablolar Bölüm 21.3'te.", { size: 10 });
  save(34, 900, yl + 88, b);
}

if (miss.length) console.log(`EKSİK ÇEVİRİ (${miss.length}):\n` + miss.map((m) => JSON.stringify(m)).join("\n"));
if (warn.length) console.log("UYARI:\n" + warn.join("\n"));
console.log("şekiller yazıldı:", out);
return { miss, warn };
}

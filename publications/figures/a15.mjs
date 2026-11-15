// A15 — Kuantum Sonrası Dönemde Dijital Kimlik: şekiller 1–7. Çalıştır: node publications/figures/a15.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a15");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const rect = (x, y, w, h, fill, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 4}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 1.3}"` : ""}${o.dash ? ' stroke-dasharray="6 4"' : ""}/>`;

// ---------- Şekil 1: imzaların ömrü (logaritmik) ----------
{
  let b = "";
  const L = 330, R = 860;
  const ticks = ["saniye", "dakika", "gün", "ay", "yıl", "10 yıl", "ömür boyu"];
  const X = (i) => L + (i * (R - L)) / (ticks.length - 1);
  const ay = 400;
  b += line(L - 10, ay, R + 10, ay, { stroke: C.ink, sw: 1.3 });
  ticks.forEach((t, i) => {
    b += line(X(i), ay - 5, X(i), ay + 5, { stroke: C.ink, sw: 1.2 });
    b += text(X(i), ay + 18, t, { size: 11, fill: C.muted });
    b += line(X(i), 20, X(i), ay - 6, { stroke: "#EEEAE0", sw: 1 });
  });
  const rows = [
    ["Sahip bağlama imzası (KB-JWT)", 0, 1, C.green],
    ["TLS oturumunun kimlik doğrulaması", 0, 0.8, C.green],
    ["Cüzdan ve cihaz beyanı", 1.6, 2.4, C.green],
    ["İptal durum listesi", 1.6, 2.5, C.green],
    ["PID", 3, 4.5, C.gok],
    ["Pasaport (belge imzalayıcı)", 4, 5, C.gold],
    ["Ülke kök otoritesi, güven listesi kökü", 4.6, 5.3, C.gold],
    ["Diploma, doğum belgesi", 4.6, 6, C.red],
  ];
  rows.forEach(([lbl, a, z, col], i) => {
    const y = 30 + i * 44;
    b += text(L - 16, y + 11, lbl, { anchor: "end", size: 12, weight: 600 });
    const x1 = X(a), x2 = X(z);
    b += rect(x1, y, Math.max(x2 - x1, 8), 22, col);
    if (i === rows.length - 1) b += `<path d="M${x2},${y - 4} l14,15 l-14,15 z" fill="${col}"/>`;
  });
  b += `<line x1="${X(5.6)}" y1="20" x2="${X(5.6)}" y2="${ay}" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  b += text(X(5.6) - 6, 16, "kuantum bilgisayar ne zaman? (bilinmiyor)", { anchor: "end", size: 11, italic: true, fill: C.red });
  b += text(20, 448, "Kısa ömürlü imzalar kolay değişir; uzun ömürlüler bugünden plan ister.", { anchor: "start", size: 12, italic: true, fill: C.muted });
  save(1, svg(900, 462, b));
}

// ---------- Şekil 2: 7^x mod 15 periyodu ----------
{
  let b = "";
  const vals = [];
  let v = 1;
  for (let x = 1; x <= 12; x++) { v = (v * 7) % 15; vals.push(v); }
  const L = 70, base = 300, sx = 46, sy = 15;
  b += line(L - 10, base, L + 12 * sx + 10, base, { stroke: C.ink, sw: 1.3 });
  b += line(L - 10, base, L - 10, base - 15 * sy - 10, { stroke: C.ink, sw: 1.3 });
  [0, 5, 10, 15].forEach((t) => {
    b += line(L - 14, base - t * sy, L - 10, base - t * sy, { stroke: C.ink });
    b += text(L - 18, base - t * sy, String(t), { anchor: "end", size: 10.5, fill: C.muted });
  });
  b += text(26, base - 8 * sy, ["7^x", "mod 15"], { size: 11, fill: C.muted });
  const fills = [C.gok, C.gok, C.gok, C.gold];
  vals.forEach((val, i) => {
    const x = L + i * sx + 6;
    b += rect(x, base - val * sy, 32, val * sy, fills[i % 4], { r: 2 });
    b += text(x + 16, base - val * sy - 9, String(val), { size: 11, weight: 600 });
    b += text(x + 16, base + 15, String(i + 1), { size: 10.5, fill: C.muted });
  });
  b += text(L + 6 * sx, base + 34, "x", { size: 11, fill: C.muted });
  [0, 1, 2].forEach((k) => {
    const x1 = L + k * 4 * sx + 4, x2 = L + (k * 4 + 4) * sx - 4;
    b += `<path d="M${x1},44 v-8 H${x2} v8" fill="none" stroke="${C.red}" stroke-width="1.6"/>`;
    b += text((x1 + x2) / 2, 24, "periyot r = 4", { size: 11.5, weight: 600, fill: C.red });
  });
  b += box(640, 90, 240, 96, ["7² = 49", "ebob(48, 15) = 3", "ebob(50, 15) = 5"], { size: 12.5, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += text(640, 210, ["Altın çubuklar: 7^x mod 15 = 1;", "örüntü her dört adımda yeniden başlar."], { anchor: "start", size: 11, fill: C.muted });
  b += text(20, 362, "Klasik bilgisayar periyodu deneyerek arar; kuantum bilgisayar girişimle doğrudan ortaya çıkarır.", { anchor: "start", size: 12, italic: true, fill: C.muted });
  save(2, svg(900, 378, b));
}

// ---------- Şekil 3: x + y > z ----------
{
  let b = "";
  const L = 90, U = 58; // 1 birim = 58 px (yıl ölçeği değil, şematik)
  b += line(L, 40, L, 250, { stroke: C.ink, sw: 1.4 });
  b += text(L, 26, "bugün", { size: 12, weight: 700 });
  // üst satır y + x
  b += rect(L, 70, 4 * U, 40, C.gok);
  b += text(L + 2 * U, 90, "y: geçiş süresi", { size: 12, weight: 600, fill: "#FFFFFF" });
  b += rect(L + 4 * U, 70, 8 * U, 40, C.gold);
  b += text(L + 5.5 * U, 90, "x: imzanın ömrü", { size: 12, weight: 600, fill: C.ink });
  // alt satır z
  b += rect(L, 150, 7 * U, 40, "#D9D4C7");
  b += text(L + 3.5 * U, 170, "z: kuantum bilgisayara kalan süre (bilinmiyor)", { size: 12, weight: 600, fill: C.ink });
  const cz = L + 7 * U;
  b += `<line x1="${cz}" y1="50" x2="${cz}" y2="215" stroke="${C.red}" stroke-width="2.2"/>`;
  b += text(cz, 232, "CRQC", { size: 12, weight: 700, fill: C.red });
  b += `<defs><pattern id="hz" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="${C.red}" stroke-width="2.4"/></pattern></defs>`;
  b += rect(cz, 70, L + 12 * U - cz, 40, "url(#hz)", { r: 0 });
  b += text(L + 12 * U, 126, "korumasız kalan dönem", { anchor: "end", size: 11.5, weight: 600, fill: C.red });
  b += box(20, 262, 420, 46, ["Sahip bağlama imzası: x ≈ 0 → sorun yok"], { size: 12, fill: "#EAF4EE", stroke: C.green });
  b += box(460, 262, 420, 46, ["Diploma: x ≈ 40 yıl → bugün başlamak gerek"], { size: 12, fill: C.red50, stroke: C.red });
  save(3, svg(900, 322, b));
}

// ---------- Şekil 4: Merkle ağacı ----------
{
  let b = "";
  const W = 900;
  const leafY = 300, leafW = 86;
  const leafX = (i) => 40 + i * 104;
  const cx = (i) => leafX(i) + leafW / 2;
  const L1 = [0, 1, 2, 3].map((k) => (cx(2 * k) + cx(2 * k + 1)) / 2);
  const L2 = [0, 1].map((k) => (L1[2 * k] + L1[2 * k + 1]) / 2);
  const root = (L2[0] + L2[1]) / 2;
  const path = new Set(["leaf2", "l1-1", "l2-0", "root"]);
  const auth = new Set(["leaf3", "l1-0", "l2-1"]);
  const style = (id) =>
    path.has(id) ? { fill: "#EAF4EE", stroke: C.green, sw: 2.2 } : auth.has(id) ? { fill: C.gold50, stroke: C.gold, sw: 2 } : { fill: C.gok50, stroke: C.gok };
  const edge = (x1, y1, x2, y2, on) => line(x1, y1, x2, y2, { stroke: on ? C.green : C.rule, sw: on ? 2.4 : 1.4 });
  // kenarlar
  for (let i = 0; i < 8; i++) b += edge(cx(i), leafY, L1[i >> 1], 222, i === 2);
  for (let k = 0; k < 4; k++) b += edge(L1[k], 190, L2[k >> 1], 132, k === 1);
  for (let k = 0; k < 2; k++) b += edge(L2[k], 100, root, 64, k === 0);
  b += box(root - 110, 22, 220, 42, ["Kök = açık anahtar"], { size: 13, weight: 700, fill: C.gold, stroke: C.gold, color: C.ink });
  ["H(0-3)", "H(4-7)"].forEach((t, k) => (b += box(L2[k] - 60, 100, 120, 32, [t], { size: 12, ...style(`l2-${k}`) })));
  ["H(0-1)", "H(2-3)", "H(4-5)", "H(6-7)"].forEach((t, k) => (b += box(L1[k] - 50, 190, 100, 32, [t], { size: 12, ...style(`l1-${k}`) })));
  for (let i = 0; i < 8; i++) b += box(leafX(i), leafY, leafW, 40, [`OTS ${i}`], { size: 12, weight: 600, ...style(`leaf${i}`) });
  b += text(cx(2), leafY + 58, ["bu imzada kullanılan", "tek kullanımlık anahtar"], { size: 11, weight: 600, fill: C.green });
  b += rect(40, 384, 14, 14, C.gold50, { stroke: C.gold });
  b += text(62, 391, "imzaya eklenen kimlik doğrulama yolu (kardeş düğümler)", { anchor: "start", size: 11.5 });
  b += rect(40, 406, 14, 14, "#EAF4EE", { stroke: C.green });
  b += text(62, 413, "doğrulayanın köke kadar yeniden hesapladığı yol", { anchor: "start", size: 11.5 });
  b += text(W - 20, 391, "LMS / XMSS: hangi yaprağın kullanıldığı kaydedilmeli (durum).", { anchor: "end", size: 11.5, fill: C.red });
  b += text(W - 20, 413, "SLH-DSA: ağaçlardan ağaç + rastgele yaprak; durum yok.", { anchor: "end", size: 11.5, fill: C.gok700 });
  save(4, svg(W, 432, b));
}

// ---------- Şekil 5: imza boyutları ----------
{
  let b = "";
  const data = [
    ["ECDSA P-256", 64, "#7E9DAD"],
    ["Ed25519", 64, "#7E9DAD"],
    ["RSA-2048", 256, "#7E9DAD"],
    ["FN-DSA-512 (taslak)", 666, C.gok],
    ["ML-DSA-44", 2420, C.gok],
    ["ML-DSA-65", 3309, C.gok],
    ["ML-DSA-87", 4627, C.gok],
    ["SLH-DSA-128s", 7856, C.gold],
    ["SLH-DSA-128f", 17088, C.gold],
  ];
  const L = 190, R = 800, max = 17088;
  const X = (v) => L + (v / max) * (R - L);
  const fmt = (v) => v.toLocaleString("tr-TR");
  data.forEach(([n, v, col], i) => {
    const y = 30 + i * 37;
    b += text(L - 12, y + 13, n, { anchor: "end", size: 12, weight: 600 });
    b += rect(L, y, Math.max(X(v) - L, 2), 26, col, { r: 2 });
    b += text(X(v) + 8, y + 13, `${fmt(v)} B`, { anchor: "start", size: 11.5, fill: C.ink });
  });
  const q = X(2953);
  b += `<line x1="${q}" y1="18" x2="${q}" y2="372" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  b += text(q + 6, 12, "2.953 B: en büyük QR kodun ikili veri kapasitesi", { anchor: "start", size: 11, weight: 600, fill: C.red });
  b += line(L, 372, R, 372, { stroke: C.ink, sw: 1.2 });
  [0, 5000, 10000, 15000].forEach((t) => {
    b += line(X(t), 372, X(t), 377, { stroke: C.ink });
    b += text(X(t), 389, fmt(t), { size: 10, fill: C.muted });
  });
  b += rect(20, 412, 14, 14, "#7E9DAD");
  b += text(40, 419, "bugünkü (kuantuma açık)", { anchor: "start", size: 11 });
  b += rect(230, 412, 14, 14, C.gok);
  b += text(250, 419, "kafes tabanlı", { anchor: "start", size: 11 });
  b += rect(380, 412, 14, 14, C.gold);
  b += text(400, 419, "özet tabanlı", { anchor: "start", size: 11 });
  save(5, svg(900, 436, b));
}

// ---------- Şekil 6: geçiş sırası ----------
{
  let b = "";
  const steps = [
    ["1. Taşıma", ["TLS anahtar anlaşması", "→ karma ML-KEM"], "şimdi topla, sonra çöz'e karşı;", "büyük ölçüde başladı", "#EAF4EE", C.green],
    ["2. Güven çapaları", ["kök otoriteler, güven", "listeleri, CSCA → karma ya", "da kuantum sonrası imza"], "en uzun ömürlü;", "erken başlamalı", C.gold50, C.gold],
    ["3. Uzun ömürlü belgeler", ["diploma, pasaport → yeni", "verilişlerde karma imza;", "eskiler: yeniden verme", "ya da arşiv damgası"], "x büyük; belge döngüsü", "uzun", C.gok50, C.gok],
    ["4. Kısa ömürlü imzalar", ["PID yenilemesi, durum", "listeleri, sahip bağlama,", "cüzdan beyanları"], "x ≈ 0; cihaz desteği", "geldikçe", C.paper, C.muted],
  ];
  steps.forEach(([t, body, n1, n2, f, s], i) => {
    const x = 20 + i * 220;
    b += box(x, 20, 196, 40, [t], { size: 12.5, weight: 700, fill: s, stroke: s, color: "#FFFFFF" });
    b += box(x, 66, 196, 104, body, { size: 11.5, fill: f, stroke: s });
    b += text(x + 98, 192, [n1, n2], { size: 11, italic: true, fill: C.muted });
    if (i < 3) b += arrow(x + 198, 118, x + 218, 118);
  });
  b += box(20, 222, 856, 42, ["Her basamakta: algoritmayı adlandır · birden çok anahtarı listele · tanımadığını güvenli reddet (kripto çeviklik)"], {
    size: 12, weight: 600, fill: C.gok, stroke: C.gok, color: "#FFFFFF",
  });
  save(6, svg(900, 280, b));
}

// ---------- Şekil 7: takvim 2024–2036 ----------
{
  let b = "";
  const L = 120, R = 870;
  const X = (y) => L + ((y - 2024) * (R - L)) / 12;
  const rowsY = { std: 70, eu: 190, us: 300 };
  b += line(L, 388, R, 388, { stroke: C.ink, sw: 1.3 });
  for (let y = 2024; y <= 2036; y++) {
    b += line(X(y), 383, X(y), 393, { stroke: C.ink });
    b += text(X(y), 406, String(y), { size: 10.5, fill: C.muted });
    b += line(X(y), 30, X(y), 383, { stroke: "#EEEAE0", sw: 1 });
  }
  b += text(20, rowsY.std, "Standartlar", { anchor: "start", size: 12.5, weight: 700, fill: C.gok });
  b += text(20, rowsY.eu, "AB", { anchor: "start", size: 12.5, weight: 700, fill: C.gok });
  b += text(20, rowsY.us, "NIST / ABD", { anchor: "start", size: 12.5, weight: 700, fill: C.gok });
  const ev = (yr, row, dy, lines, col = C.gok, anchor = "middle") => {
    const x = X(yr), y = rowsY[row];
    let s = circle(x, y, 5.5, { fill: col });
    s += line(x, y + (dy > 0 ? 6 : -6), x, y + dy * 0.55, { stroke: col, sw: 1 });
    s += text(anchor === "end" ? x + 8 : x, y + dy, lines, { size: 10.5, fill: C.ink, anchor });
    return s;
  };
  const stdEv = [
    [2024.62, "FIPS 203/204/205 (Ağustos 2024)"],
    [2025.2, "HQC seçimi (Mart 2025)"],
    [2025.8, "RFC 9881, ML-DSA sertifikaları (Ekim 2025)"],
    [2026.45, "ETSI TS 119 312 V2.1.1 (Haziran 2026)"],
    [2026.82, "NIST IR 8547 son sürüm (Ekim 2026)"],
  ];
  stdEv.forEach(([yr, lbl], i) => {
    b += circle(X(yr), rowsY.std, 8.5, { fill: C.gok });
    b += text(X(yr), rowsY.std + 0.5, String(i + 1), { size: 10, weight: 700, fill: "#FFFFFF" });
    const col = i < 3 ? 0 : 1;
    const lx = X(2027.4) + col * 250, ly = rowsY.std - 30 + (i % 3) * 20;
    b += circle(lx, ly, 7.5, { fill: C.gok });
    b += text(lx, ly + 0.5, String(i + 1), { size: 9.5, weight: 700, fill: "#FFFFFF" });
    b += text(lx + 13, ly, lbl, { anchor: "start", size: 10.5 });
  });
  b += text(X(2027.4) + 250 - 7, rowsY.std + 10, "FIPS 206 (FN-DSA): hazırlanıyor", { anchor: "start", size: 10.5, italic: true, fill: C.muted });
  b += ev(2024.28, "eu", 36, ["Tavsiye", "2024/1101"]);
  b += ev(2025.48, "eu", -34, ["Yol haritası", "(Haziran 2025)"]);
  b += ev(2027, "eu", 36, ["2026 sonu: strateji,", "envanter, pilotlar"], C.gold);
  b += ev(2031, "eu", -34, ["2030 sonu: yüksek", "riskte geçiş tamam"], C.red);
  b += ev(2036, "eu", 36, ["2035 sonu: orta/düşük", "risk, mümkün olduğunca"], C.gold, "end");
  b += `<rect x="${X(2031)}" y="${rowsY.us - 40}" width="${X(2036) - X(2031)}" height="20" rx="3" fill="${C.gold50}" stroke="${C.gold}"/>`;
  b += text((X(2031) + X(2036)) / 2, rowsY.us - 30, "kuantuma açık algoritmalar: kullanımdan kaldırılıyor (2030 sonrası)", { size: 10.5, weight: 600 });
  b += ev(2031, "us", 34, ["2030 sonu: federal", "anahtar anlaşması"], C.red);
  b += ev(2032, "us", 34, ["", ""], C.red);
  b += text(X(2032) + 8, rowsY.us + 34, ["2031 sonu:", "federal imzalar"], { anchor: "start", size: 10.5 });
  b += ev(2036, "us", 38, ["2035 sonrası:", "izin yok"], C.red, "end");
  // pasaport bandı
  b += `<path d="M${X(2026.9)},356 H${X(2036.25)}" stroke="${C.red}" stroke-width="2.4" marker-end="url(#arr)"/>`;
  b += text(X(2026.9), 345, "Bugün verilen 10 yıllık pasaport → 2036", { anchor: "start", size: 11, weight: 600, fill: C.red });
  save(7, svg(900, 418, b));
}

console.log("A15 şekilleri yazıldı:", out);

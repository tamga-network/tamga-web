// A2 — Doğrulanabilir Belgeler: şekiller 1–6. Çalıştır: node publications/figures/a2.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a2");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

// küçük işaretler: tik, çarpı, soru
const tick = (x, y, c = C.green) => `<path d="M${x - 7},${y} l5,6 l10,-12" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cross = (x, y, c = C.red) => `<path d="M${x - 6},${y - 6} l12,12 M${x + 6},${y - 6} l-12,12" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
const ques = (x, y) => text(x, y + 0.5, "?", { size: 16, weight: 700, fill: C.gold });

// ---------- Şekil 1: bir diplomanın üç hâli ----------
{
  let b = "";
  const cols = [
    { x: 20, title: "Kâğıt diploma", note: ["Doğrulayan mührü tanırsa güvenir;", "tanımazsa verene yazar."], noteFill: C.muted, marks: ["q", "q", "x"] },
    { x: 315, title: "Taranmış PDF ya da fotoğraf", note: ["Değiştirilip değiştirilmediği görülemez;", "tek yol verene sormak."], noteFill: C.red, marks: ["x", "x", "x"] },
    { x: 610, title: "Doğrulanabilir belge", note: ["İmza kontrol edilir;", "verene sorulmaz."], noteFill: C.green, marks: ["t", "t", "t"] },
  ];
  cols.forEach((c, i) => {
    const cx = c.x + 135;
    b += `<rect x="${c.x}" y="12" width="270" height="400" rx="8" fill="${i === 2 ? C.gok50 : C.paper}" stroke="${C.rule}"/>`;
    b += text(cx, 36, c.title, { size: 14, weight: 700, fill: C.gok });
    if (i === 0) {
      b += `<rect x="${cx - 55}" y="58" width="110" height="140" rx="3" fill="#FFFFFF" stroke="${C.ink}" stroke-width="1.4"/>`;
      for (let k = 0; k < 5; k++) b += line(cx - 40, 80 + k * 14, cx + 40, 80 + k * 14, { stroke: C.rule, sw: 2 });
      b += `<circle cx="${cx + 22}" cy="170" r="17" fill="none" stroke="${C.red}" stroke-width="2"/><circle cx="${cx + 22}" cy="170" r="11" fill="none" stroke="${C.red}" stroke-width="1.2"/>`;
      b += `<path d="M${cx - 42},176 q8,-14 16,0 t16,0" stroke="${C.ink}" stroke-width="1.6" fill="none"/>`;
    } else if (i === 1) {
      b += `<path d="M${cx - 50},58 h72 l28,28 v112 h-100 z" fill="#FFFFFF" stroke="${C.ink}" stroke-width="1.4"/>`;
      b += `<path d="M${cx + 22},58 v28 h28" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`;
      b += `<rect x="${cx - 36}" y="100" width="72" height="56" fill="${C.gok100}"/>`;
      b += `<path d="M${cx - 36},156 l22,-24 l16,14 l14,-12 l20,22 z" fill="${C.gok}" opacity="0.5"/>`;
      b += text(cx, 180, "PDF", { size: 12, weight: 700, fill: C.muted });
    } else {
      b += phone(cx - 45, 54, 90, 148, C.gok);
      b += `<rect x="${cx - 32}" y="78" width="64" height="92" rx="4" fill="${C.gok50}" stroke="${C.gok}"/>`;
      for (let k = 0; k < 4; k++) b += line(cx - 24, 94 + k * 13, cx + 10, 94 + k * 13, { stroke: C.gok, sw: 2 });
      b += key(cx - 8, 160, C.gold, 0.8);
      b += text(cx, 188, "imzalı veri", { size: 11, fill: C.gok700 });
    }
    b += text(cx, 232, c.note, { size: 11.5, fill: c.noteFill, weight: 600 });
    const qs = ["Değişmemiş mi?", "Kim verdi?", "Gösteren sahibi mi?"];
    qs.forEach((q, k) => {
      const y = 290 + k * 36;
      b += line(c.x + 16, y - 18, c.x + 254, y - 18, { stroke: C.rule });
      b += text(c.x + 24, y, q, { anchor: "start", size: 12.5 });
      const m = c.marks[k];
      b += m === "t" ? tick(c.x + 238, y) : m === "x" ? cross(c.x + 238, y) : ques(c.x + 238, y);
    });
  });
  b += text(880, 432, "? = inceleyenin mührü tanımasına bağlı", { anchor: "end", size: 11, italic: true, fill: C.muted });
  save(1, svg(900, 445, b));
}

// ---------- Şekil 2: roller ----------
{
  let b = "";
  b += box(20, 14, 860, 44, ["Güven listesi: hangi veren yetkili, açık anahtarı ne?"], { size: 13, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(40, 110, 240, 66, ["Veren", "Bakü'deki üniversite"], { size: 13.5 });
  b += box(620, 110, 240, 66, ["Doğrulayan", "İstanbul'daki şirket"], { size: 13.5 });
  b += box(330, 330, 240, 66, ["Sahip", "Aynur'un cüzdanı"], { size: 13.5, fill: C.gold50, stroke: C.gold });
  // veren → sahip
  b += arrow(170, 178, 360, 326);
  b += halo(text(222, 268, ["imzalı belgeyi verir", "(bir kez)"], { anchor: "end", size: 11.5, fill: C.gok700 }));
  // sahip → doğrulayan
  b += arrow(540, 326, 730, 180);
  b += halo(text(680, 268, ["belgeyi gösterir", "(her seferinde, onayla)"], { anchor: "start", size: 11.5, fill: C.gok700 }));
  // doğrudan bağ yok
  b += line(284, 143, 616, 143, { stroke: C.muted, sw: 1.4, dash: true });
  b += cross(450, 143);
  b += text(450, 124, "veren ile doğrulayan arasında doğrudan bağlantı yok", { size: 11, italic: true, fill: C.red });
  // güven listesi oklar
  b += arrow(740, 60, 740, 106, { kind: "g", dash: true });
  b += text(750, 84, "önceden indirilir", { anchor: "start", size: 10.5, fill: C.muted });
  b += arrow(160, 106, 160, 60, { kind: "g", dash: true });
  b += text(150, 84, "listelenir", { anchor: "end", size: 10.5, fill: C.muted });
  // durum listesi
  b += box(345, 200, 210, 48, ["Durum listesi", "(veren yayımlar)"], { size: 12, fill: C.paper, stroke: C.ink });
  b += arrow(250, 178, 342, 212, { kind: "m", dash: true });
  b += text(262, 210, "yayımlar", { anchor: "end", size: 10.5, fill: C.muted });
  b += arrow(557, 212, 650, 180, { kind: "m", dash: true });
  b += text(450, 266, "doğrulayana toplu indirilir; kişiye özel soru yok", { size: 10.5, fill: C.muted });
  // cüzdan sağlayıcı
  b += box(330, 440, 240, 44, ["Cüzdan sağlayıcı"], { size: 12.5, fill: C.paper, stroke: C.ink });
  b += arrow(450, 438, 450, 400, { kind: "m" });
  b += text(586, 462, "cüzdanın güvenilir olduğunu kanıtlar", { anchor: "start", size: 10.5, fill: C.muted });
  save(2, svg(900, 500, b));
}

// ---------- Şekil 3: doğrulayanın dört sorusu ----------
{
  let b = "";
  const qs = [
    ["1. Belge sağlam mı?", "(verenin imzası)"],
    ["2. Veren yetkili mi?", "(güven listesi)"],
    ["3. Hâlâ geçerli mi?", "(süre + durum listesi)"],
    ["4. Gösteren sahibi mi?", "(anahtar ispatı)"],
  ];
  const xs = [10, 200, 390, 580];
  // kaynak parantezleri
  const brace = (x1, x2, label, color) =>
    `<path d="M${x1},44 v-10 h${x2 - x1} v10" fill="none" stroke="${color}" stroke-width="1.4"/>` + text((x1 + x2) / 2, 20, label, { size: 11, weight: 600, fill: color });
  b += brace(20, 170, "belgeden", C.gok);
  b += brace(210, 550, "önceden indirilmiş herkese açık listelerden", C.gold);
  b += brace(590, 740, "cüzdandan", C.gok);
  qs.forEach((q, i) => {
    b += box(xs[i], 56, 170, 72, q, { size: 12, fill: i === 1 || i === 2 ? C.gold50 : C.gok50, stroke: i === 1 || i === 2 ? C.gold : C.gok });
    if (i < 3) b += arrow(xs[i] + 172, 92, xs[i + 1] - 2, 92);
    b += arrow(xs[i] + 85, 130, xs[i] + 85, 200, { kind: "r" });
    b += text(xs[i] + 93, 166, "hayır", { anchor: "start", size: 11, fill: C.red });
  });
  b += arrow(752, 92, 778, 92);
  b += box(780, 66, 110, 52, ["Kabul"], { size: 14, weight: 700, fill: "#EAF4EE", stroke: C.green, color: C.green });
  b += box(10, 202, 740, 36, ["Reddet"], { size: 13, weight: 700, fill: C.red50, stroke: C.red, color: C.red });
  b += text(890, 270, "Hiçbir adımda verene o anda soru sorulmaz.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(3, svg(900, 285, b));
}

// ---------- Şekil 4: eve telefon etme ----------
{
  let b = "";
  b += text(225, 22, "Eve telefon eden doğrulama", { size: 14.5, weight: 700, fill: C.red });
  b += text(675, 22, "İmzalı belgeyle doğrulama", { size: 14.5, weight: 700, fill: C.green });
  b += line(450, 10, 450, 420, { stroke: C.rule, sw: 1.2 });
  // sol
  b += person(50, 205, 1.1, C.gold);
  b += text(50, 248, "Aynur", { size: 12, weight: 600 });
  const vy = [80, 180, 280];
  ["Şirket A", "Şirket B", "Banka"].forEach((n, i) => {
    b += box(120, vy[i], 110, 44, [n], { size: 12.5, fill: C.paper, stroke: C.ink });
    b += arrow(74, 205, 118, vy[i] + 22, { kind: "m", sw: 1.3 });
    b += arrow(232, vy[i] + 22, 318, 175 + i * 14, { kind: "r" });
  });
  b += halo(text(275, 72, ["“bu belge", "gerçek mi?”"], { size: 11, fill: C.red }));
  b += box(320, 150, 110, 70, ["Veren"], { size: 13.5, weight: 700 });
  b += `<rect x="292" y="250" width="152" height="92" rx="6" fill="${C.red50}" stroke="${C.red}"/>`;
  b += text(368, 266, "verenin kaydı", { size: 10.5, weight: 600, fill: C.red });
  b += text(302, 304, ["Aynur · Şirket A · 3 Kasım", "Aynur · Şirket B · 5 Kasım", "Aynur · Banka · 7 Kasım"], { anchor: "start", size: 10, fill: C.ink, lh: 1.45 });
  b += line(375, 222, 375, 248, { stroke: C.red, sw: 1.4 });
  b += text(225, 395, ["Veren, belgenin nerede ve ne zaman", "gösterildiğini öğrenir."], { size: 12, weight: 600, fill: C.red });
  // sağ
  b += box(470, 50, 130, 50, ["Veren"], { size: 13.5, weight: 700 });
  b += arrow(535, 102, 535, 146);
  b += text(545, 124, "bir kez", { anchor: "start", size: 11, fill: C.gok700 });
  b += phone(495, 150, 80, 130, C.gold);
  b += text(535, 215, ["Aynur'un", "cüzdanı"], { size: 11.5, weight: 600 });
  b += box(650, 48, 235, 46, ["Güven listesi + durum listesi", "(herkese açık, toplu)"], { size: 11.5, fill: C.gold50, stroke: C.gold });
  const ry = [122, 200, 278];
  ["Şirket A", "Şirket B", "Banka"].forEach((n, i) => {
    b += box(700, ry[i], 130, 44, [n], { size: 12.5, fill: C.paper, stroke: C.ink });
    b += arrow(577, 215, 698, ry[i] + 22);
  });
  b += arrow(860, 120, 860, 96, { kind: "g", dash: true });
  b += text(852, 108, "önceden", { anchor: "end", size: 10.5, fill: C.muted });
  b += text(675, 395, ["Veren, belgenin nerede gösterildiğini", "bilmez."], { size: 12, weight: 600, fill: C.green });
  save(4, svg(900, 425, b));
}

// ---------- Şekil 5: sahip bağlama ----------
{
  let b = "";
  const V = 130, W = 450, D = 770;
  b += box(V - 100, 16, 200, 46, ["Veren"], { size: 13.5, weight: 600 });
  b += box(W - 120, 16, 240, 46, ["Aynur'un cüzdanı", "(güvenli donanım)"], { size: 12.5, fill: C.gold50, stroke: C.gold });
  b += box(D - 100, 16, 200, 46, ["Doğrulayan"], { size: 13.5, weight: 600 });
  [V, W, D].forEach((x) => (b += line(x, 62, x, 560, { stroke: C.rule, sw: 1.4, dash: true })));
  const msg = (y, x1, x2, label, kind = "") => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind });
    s += halo(text((x1 + x2) / 2, y - 12, label, { size: 11.5 }));
    return s;
  };
  b += text(20, 84, "Belge alınırken", { anchor: "start", size: 12, weight: 700, fill: C.gok });
  b += box(W - 150, 96, 300, 40, ["1. Anahtar çifti üretilir; gizli anahtar donanımda kalır"], { size: 11, fill: C.paper, stroke: C.ink });
  b += key(W + 160, 116, C.gold, 0.8);
  b += msg(170, W, V, "2. Açık anahtar + gizli anahtara sahip olduğunun kanıtı");
  b += msg(220, V, W, "3. Belge: içinde açık anahtar, verenin imzasıyla");
  b += line(10, 252, 890, 252, { stroke: C.gok, sw: 1, dash: true });
  b += text(20, 272, "Belge gösterilirken", { anchor: "start", size: 12, weight: 700, fill: C.gok });
  b += msg(305, D, W, "4. İstek + tek kullanımlık değer (nonce)");
  b += box(W - 175, 330, 350, 58, ["5. Aynur onaylar; nonce + doğrulayan adresi + sunum", "özeti gizli anahtarla imzalanır"], { size: 11, fill: C.paper, stroke: C.ink });
  b += msg(420, W, D, "6. Belge + seçilen alanlar + sahip imzası");
  b += box(D - 165, 446, 280, 74, ["7. Verenin imzası: belge sağlam mı?", "Sahip imzası, belgedeki açık", "anahtarla: gösteren sahibi mi?"], { size: 11, fill: "#EAF4EE", stroke: C.green });
  b += box(30, 440, 300, 76, ["Kopyalanan belge, gizli anahtar", "olmadan yeni bir nonce'u", "imzalayamaz."], { size: 11.5, weight: 600, fill: C.red50, stroke: C.red, color: C.red });
  save(5, svg(900, 570, b));
}

// ---------- Şekil 6: üç biçimin yapısı ----------
{
  let b = "";
  const mono = (x, y, lines, o = {}) =>
    lines.map((l, i) => `<text x="${x}" y="${y + i * 16}" font-family="IBM Plex Mono" font-size="${o.size || 11}" fill="${o.fill || C.ink}" dominant-baseline="middle">${l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/^ +/, (m) => " ".repeat(m.length))}</text>`).join("\n");
  const head = (cx, t) => text(cx, 22, t, { size: 14.5, weight: 700, fill: C.gok });
  // W3C
  b += head(150, "W3C VC 2.0");
  b += `<rect x="15" y="40" width="270" height="200" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.3"/>`;
  b += mono(30, 62, ["{", '  "@context": [ … ],', '  "type": [ … ],', '  "issuer": "…",', '  "validFrom": "…",', '  "credentialSubject": {', "     ad, derece, bolum …", "  },", '  "credentialStatus": { … }', "}"], { size: 10.5 });
  b += text(150, 262, "imza nereye?", { size: 11, italic: true, fill: C.muted });
  b += box(15, 278, 130, 62, ["gömülü:", "proof alanı", "(Data Integrity)"], { size: 10.5 });
  b += box(155, 278, 130, 62, ["zarf:", "JWT · SD-JWT", "· COSE"], { size: 10.5 });
  // SD-JWT VC
  b += head(450, "SD-JWT VC");
  b += box(315, 40, 270, 84, ["Verenin JWT'si (imzalı)", "iss · vct · exp · cnf", "_sd: [özet, özet, özet …]"], { size: 11, fill: C.gok50, stroke: C.gok });
  const tl = (y) => text(450, y, "~", { size: 18, weight: 700, fill: C.muted });
  b += tl(136);
  b += box(315, 148, 270, 38, ["açıklama: [tuz, ad, değer]"], { size: 11, fill: C.gold50, stroke: C.gold });
  b += tl(198);
  b += box(315, 210, 270, 38, ["açıklama: [tuz, ad, değer]"], { size: 11, fill: C.gold50, stroke: C.gold });
  b += tl(260);
  b += box(315, 272, 270, 68, ["Sahip bağlama JWT'si", "nonce · aud · sd_hash", "(cüzdanın imzası)"], { size: 11, fill: C.paper, stroke: C.ink });
  // mdoc
  b += head(750, "ISO mdoc");
  const items = [["0", "given_name"], ["1", "family_name"], ["2", "nationality"], ["3", "birth_date"]];
  items.forEach(([n, a], i) => {
    const x = 615 + (i % 2) * 138, y = 40 + Math.floor(i / 2) * 46;
    b += box(x, y, 130, 38, [`${n} · ${a}`], { size: 10.5, fill: C.gold50, stroke: C.gold });
  });
  b += text(750, 140, "her alan ayrı paket (tuzlu)", { size: 10.5, italic: true, fill: C.muted });
  b += arrow(750, 150, 750, 172);
  b += text(758, 161, "özetler", { anchor: "start", size: 10.5, fill: C.gok700 });
  b += box(615, 174, 270, 84, ["MSO", "valueDigests · deviceKeyInfo", "validityInfo · docType"], { size: 11, fill: C.gok50, stroke: C.gok });
  b += arrow(750, 260, 750, 284);
  b += box(615, 286, 270, 54, ["COSE_Sign1", "(verenin imzası + sertifikası)"], { size: 11, fill: C.paper, stroke: C.ink });
  // etiketler
  const tag = (cx, t, f, s) => box(cx - 120, 362, 240, 30, [t], { size: 11, weight: 600, fill: f, stroke: s, r: 15 });
  b += tag(150, "JSON-LD · eğitim, web", C.gok50, C.gok);
  b += tag(450, "JSON · çevrimiçi, web", C.gok50, C.gok);
  b += tag(750, "CBOR · yüz yüze, mobil ehliyet", C.gok50, C.gok);
  save(6, svg(900, 405, b));
}

console.log("A2 şekilleri yazıldı:", out);

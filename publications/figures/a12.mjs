// A12 — Blokzincir ve Dijital Kimlik: şekiller 1–6. Çalıştır: node publications/figures/a12.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, key, lock, db, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a12");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const cross = (x, y, r = 8, color = C.red) =>
  `<path d="M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
const tick = (x, y, color = C.green) =>
  `<path d="M${x - 8},${y} L${x - 2},${y + 6} L${x + 9},${y - 7}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const rect = (x, y, w, h, o = {}) => {
  const { fill = "#FFFFFF", stroke = C.gok, sw = 1.4, r = 8, dash = false } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""}/>`;
};
/** Zincir halkası simgesi. */
const chainIcon = (x, y, color = C.gok) =>
  `<g transform="translate(${x},${y})"><rect x="-14" y="-6" width="16" height="12" rx="6" fill="none" stroke="${color}" stroke-width="2.4"/><rect x="-2" y="-6" width="16" height="12" rx="6" fill="none" stroke="${color}" stroke-width="2.4"/></g>`;
const serverIcon = (x, y, color = C.gok) =>
  `<g transform="translate(${x},${y})"><rect x="-12" y="-12" width="24" height="10" rx="2" fill="${C.gok50}" stroke="${color}" stroke-width="1.8"/><rect x="-12" y="1" width="24" height="10" rx="2" fill="${C.gok50}" stroke="${color}" stroke-width="1.8"/><circle cx="7" cy="-7" r="1.6" fill="${color}"/><circle cx="7" cy="6" r="1.6" fill="${color}"/></g>`;

// ---------- Şekil 1: özet zinciri ----------
{
  let b = "";
  const xs = [40, 255, 470, 685];
  const W = 175, H = 112;
  const row = (y, bad) => {
    let s = "";
    xs.forEach((x, i) => {
      const broken = bad && i === 1;
      const mism = bad && i === 2;
      s += rect(x, y, W, H, { fill: broken ? C.red50 : C.gok50, stroke: broken ? C.red : C.gok });
      s += text(x + W / 2, y + 18, `Blok ${i + 1}`, { size: 13.5, weight: 700, fill: C.gok700 });
      s += line(x + 10, y + 32, x + W - 10, y + 32, { stroke: C.rule });
      const prev = i === 0 ? "önceki özet: 0000…" : `önceki özet: ${["", "3a7f…", "c41b…", "9e02…"][i]}`;
      s += text(x + 14, y + 50, prev, { anchor: "start", size: 11.5, fill: mism ? C.red : C.ink, weight: mism ? 600 : 400 });
      s += text(x + 14, y + 72, broken ? "kayıtlar (değiştirildi)" : "kayıtlar", { anchor: "start", size: 11.5, fill: broken ? C.red : C.ink, weight: broken ? 600 : 400 });
      s += text(x + 14, y + 94, "zaman", { anchor: "start", size: 11.5, fill: C.muted });
      if (i > 0) s += arrow(x - 2, y + 50, xs[i - 1] + W + 2, y + 50, { kind: mism ? "r" : "" });
      if (mism) s += cross(x + W - 22, y + 50, 7);
    });
    return s;
  };
  b += text(40, 22, "Her blok bir öncekinin özetini taşır", { anchor: "start", size: 13, weight: 600, fill: C.gok });
  b += row(36, false);
  b += text(40, 186, "Blok 2'deki bir kayıt sonradan değiştirilirse", { anchor: "start", size: 13, weight: 600, fill: C.red });
  b += row(200, true);
  b += text(642, 334, "Blok 2'nin özeti değişir; Blok 3'teki kayıt artık tutmaz.", { anchor: "middle", size: 11.5, fill: C.red });
  b += text(860, 362, "Geçmişteki tek değişiklik, ondan sonraki bütün blokları bozar.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(1, svg(900, 378, b));
}

// ---------- Şekil 2: Merkle ağacı ----------
{
  let b = "";
  const leafX = (i) => 70 + i * 92;
  const yL = 330, y1 = 250, y2 = 170, yR = 90;
  const proof = new Set(["K4", "H(1,2)", "H(5–8)"]);
  const path = new Set(["K3", "H(3,4)", "H(1–4)", "Kök özet"]);
  const node = (cx, cy, label, w = 74) => {
    const isProof = proof.has(label);
    const isLeaf3 = label === "K3";
    const onPath = path.has(label) && !isLeaf3;
    const fill = isLeaf3 ? C.gold50 : isProof ? C.gok100 : onPath ? "#EAF4EE" : "#FFFFFF";
    const stroke = isLeaf3 ? C.gold : isProof ? C.gok : onPath ? C.green : C.rule;
    const sw = isProof || isLeaf3 ? 2.4 : 1.4;
    return rect(cx - w / 2, cy - 17, w, 34, { fill, stroke, sw, r: 6, dash: onPath }) + text(cx, cy, label, { size: 12, weight: 600, fill: C.ink });
  };
  const l1 = [0, 1, 2, 3].map((j) => (leafX(2 * j) + leafX(2 * j + 1)) / 2);
  const l2 = [0, 1].map((j) => (l1[2 * j] + l1[2 * j + 1]) / 2);
  const root = (l2[0] + l2[1]) / 2;
  // bağlar
  for (let i = 0; i < 8; i++) b += line(leafX(i), yL - 17, l1[Math.floor(i / 2)], y1 + 17, { stroke: C.muted, sw: 1.2 });
  for (let j = 0; j < 4; j++) b += line(l1[j], y1 - 17, l2[Math.floor(j / 2)], y2 + 17, { stroke: C.muted, sw: 1.2 });
  for (let j = 0; j < 2; j++) b += line(l2[j], y2 - 17, root, yR + 17, { stroke: C.muted, sw: 1.2 });
  for (let i = 0; i < 8; i++) b += node(leafX(i), yL, `K${i + 1}`, 64);
  ["H(1,2)", "H(3,4)", "H(5,6)", "H(7,8)"].forEach((t, j) => (b += node(l1[j], y1, t, 80)));
  ["H(1–4)", "H(5–8)"].forEach((t, j) => (b += node(l2[j], y2, t, 86)));
  b += node(root, yR, "Kök özet", 110);
  b += text(root, 56, "yayımlanmış ve imzalı", { size: 11, italic: true, fill: C.muted });
  b += text(40, yL + 34, "yapraklar: kayıtların özetleri", { anchor: "start", size: 11, fill: C.muted });
  // açıklama sağda
  const lx = 760;
  b += rect(lx - 14, 92, 168, 196, { fill: C.paper, stroke: C.rule, r: 8 });
  b += rect(lx, 108, 22, 16, { fill: C.gold50, stroke: C.gold, sw: 2.4, r: 3 });
  b += text(lx + 30, 116, "kanıtlanan kayıt", { anchor: "start", size: 11 });
  b += rect(lx, 140, 22, 16, { fill: C.gok100, stroke: C.gok, sw: 2.4, r: 3 });
  b += text(lx + 30, 148, "kanıt olarak", { anchor: "start", size: 11 });
  b += text(lx + 30, 162, "gönderilen özet", { anchor: "start", size: 11 });
  b += rect(lx, 184, 22, 16, { fill: "#EAF4EE", stroke: C.green, sw: 1.4, r: 3, dash: true });
  b += text(lx + 30, 192, "doğrulayanın", { anchor: "start", size: 11 });
  b += text(lx + 30, 206, "hesapladığı yol", { anchor: "start", size: 11 });
  b += text(lx + 70, 238, ["8 kayıtta kanıt 3 özet;", "1 milyon kayıtta", "yaklaşık 20 özet"], { size: 11, fill: C.gok700, weight: 600 });
  b += text(450, 388, "Doğrulayan K3'ten başlayıp kökü yeniden hesaplar ve yayımlanmış kökle karşılaştırır.", { size: 11.5, italic: true, fill: C.muted });
  save(2, svg(920, 404, b));
}

// ---------- Şekil 3: DID yöntemleri ----------
{
  let b = "";
  const cols = [
    { x: 20, title: ["Anahtarın içinde", "did:key"], icon: (x, y) => key(x - 10, y, C.gold, 1.2),
      items: ["Belge tanımlayıcıdan", "hesaplanır", "", "Ağ ya da sunucu", "gerekmez", "", "Anahtar değişirse", "tanımlayıcı da değişir"] },
    { x: 315, title: ["Web sunucusunda", "did:web"], icon: (x, y) => serverIcon(x, y),
      items: ["Belge alan adı altında", "yayımlanır", "", "Güven: alan adı", "ve TLS sertifikası", "", "Sunucu sahibi belgeyi", "değiştirebilir"] },
    { x: 610, title: ["Zincirde", "did:indy · did:ebsi · did:ion"], icon: (x, y) => chainIcon(x, y),
      items: ["Değişiklikler defterde", "kayıt altına alınır", "", "Anahtar dönebilir,", "tanımlayıcı aynı kalır", "", "Defter işletilmeli;", "kapanırsa ne olur?"] },
  ];
  cols.forEach((c) => {
    b += rect(c.x, 16, 270, 270, { fill: C.gok50, stroke: C.gok });
    b += c.icon(c.x + 135, 42);
    b += text(c.x + 135, 74, c.title[0], { size: 14, weight: 700, fill: C.gok700 });
    b += text(c.x + 135, 94, c.title[1], { size: 12, weight: 600, fill: C.muted });
    b += line(c.x + 16, 110, c.x + 254, 110, { stroke: C.gok100, sw: 1.4 });
    let y = 132;
    for (const it of c.items) {
      if (it) b += text(c.x + 135, y, it, { size: 12.5 });
      y += it ? 18 : 10;
    }
  });
  b += rect(20, 304, 860, 50, { fill: C.gold50, stroke: C.gold });
  b += text(450, 329, "Üçünde de açık kalan soru aynı: Bu tanımlayıcının arkasında gerçekten kim var ve o kurum yetkili mi?", {
    size: 12.5, weight: 600, fill: C.ink,
  });
  save(3, svg(900, 370, b));
}

// ---------- Şekil 4: zincire ne yazılabilir ----------
{
  let b = "";
  b += rect(20, 16, 420, 300, { fill: C.red50, stroke: C.red, sw: 1.8 });
  b += text(230, 42, "Zincire yazılmamalı", { size: 15, weight: 700, fill: C.red });
  b += rect(460, 16, 420, 300, { fill: "#EAF4EE", stroke: C.green, sw: 1.8 });
  b += text(670, 42, "Zincire yazılabilir", { size: 15, weight: 700, fill: C.green });
  const bad = [
    [["Kişinin verisi", "(ad, doğum tarihi, diploma)"], "silinemez; herkese kopyalanır", C.red],
    [["Verinin tuzsuz özeti"], "olası değerler denenerek geri bulunur", C.red],
    [["Kişiye özgü tanımlayıcı", "ya da tuzlu özet"], "silinebilir ama işlemleri birbirine bağlar", C.gold],
  ];
  bad.forEach(([t, note, col], i) => {
    const y = 62 + i * 82;
    b += rect(40, y, 380, 66, { fill: "#FFFFFF", stroke: col });
    if (col === C.red) b += cross(66, y + 33, 9);
    else b += text(66, y + 34, "!", { size: 22, weight: 700, fill: C.gold });
    b += text(90, y + (t.length > 1 ? 20 : 24), t, { anchor: "start", size: 12.5, weight: 600 });
    b += text(90, y + 52, note, { anchor: "start", size: 11, italic: true, fill: C.muted });
  });
  const good = ["Güven listesi sürümünün özeti", "İptal listesi yayınının özeti", "Belge şeması değişikliğinin özeti"];
  good.forEach((t, i) => {
    const y = 62 + i * 62;
    b += rect(480, y, 380, 48, { fill: "#FFFFFF", stroke: C.green });
    b += tick(506, y + 24);
    b += text(530, y + 24, t, { anchor: "start", size: 12.5, weight: 600 });
  });
  b += text(670, 270, ["Hepsi kurumların herkese açık", "yayınlarıdır; kimseyi tanımlamaz."], { size: 12, italic: true, fill: C.gok700 });
  b += rect(150, 334, 600, 40, { fill: C.paper, stroke: C.ink, sw: 1.4 });
  b += text(450, 354, "Güvenli kural: Zincire kişiye ilişkin hiçbir şey yazılmaz, özeti bile.", { size: 13, weight: 700 });
  save(4, svg(900, 390, b));
}

// ---------- Şekil 5: tanık mimarisi ----------
{
  let b = "";
  b += box(20, 40, 190, 64, ["Yetkili kurum", "(liste yayıncısı)"], { size: 12.5, weight: 600 });
  b += arrow(212, 72, 300, 72);
  b += text(256, 60, "imzalar", { size: 11, fill: C.gok700 });
  b += box(302, 34, 230, 76, ["İmzalı güven listesi", "sürüm n"], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold });
  b += key(318, 52, C.gold, 0.8);
  b += box(690, 34, 190, 76, ["Doğrulayıcı"], { size: 13.5, weight: 700, fill: C.paper, stroke: C.ink });
  b += arrow(534, 72, 688, 72, { sw: 3 });
  b += halo(text(611, 52, "1. imzayı ve içeriği doğrular", { size: 11.5, weight: 600, fill: C.gok700 }));
  b += text(611, 94, "(asıl güven buradan)", { size: 11, fill: C.gok700 });
  // çapa
  b += arrow(417, 112, 417, 168);
  b += text(427, 128, "özet: sürüm, içerik özeti,", { anchor: "start", size: 11, fill: C.muted });
  b += text(427, 144, "önceki özet, yayın zamanı", { anchor: "start", size: 11, fill: C.muted });
  b += box(322, 170, 190, 50, ["Çapa günlüğü"], { size: 13, weight: 600 });
  b += arrow(417, 222, 417, 262);
  // zincir bandı
  b += rect(150, 264, 534, 132, { fill: C.gok50, stroke: C.gok, sw: 1.6 });
  ["A", "B", "C"].forEach((n, i) => {
    const x = 180 + i * 165;
    b += box(x, 280, 145, 52, ["Bağımsız", `işletmeci ${n}`], { size: 12, fill: "#FFFFFF", stroke: C.gok });
  });
  b += line(325, 306, 345, 306, { stroke: C.gok, sw: 1.4 });
  b += line(490, 306, 510, 306, { stroke: C.gok, sw: 1.4 });
  b += text(417, 356, "İzinli zincir (tanık)", { size: 13, weight: 700, fill: C.gok700 });
  b += text(417, 378, "eşik sayıda yazıcı aynı değeri gönderince onay; anlaşmazlık kayda geçer", { size: 11, fill: C.ink });
  // isteğe bağlı denetim
  b += `<path d="M785,112 L785,330 L686,330" fill="none" stroke="${C.muted}" stroke-width="1.6" stroke-dasharray="6 4" marker-end="url(#arm)"/>`;
  b += text(795, 170, ["2. isteğe bağlı:", "herkes aynı listeyi", "mi görüyor?", "geçmiş değişti mi?"], { anchor: "start", size: 11, fill: C.muted });
  b += text(880, 420, "Zincir yanıt vermese de doğrulama sürer. Çelişkide imzalı liste geçerlidir; çelişki alarm olarak kaydedilir.", {
    anchor: "end", size: 11, italic: true, fill: C.muted,
  });
  b += rect(250, 436, 400, 34, { fill: C.red50, stroke: C.red });
  b += text(450, 453, "Zincire kişisel veri yazılmaz, özeti bile.", { size: 12.5, weight: 700, fill: C.red });
  save(5, svg(900, 484, b));
}

// ---------- Şekil 6: karar akışı ----------
{
  let b = "";
  const qs = [
    ["S1", ["Zincire kişiye ilişkin bir şey (veri, özet,", "tanımlayıcı) yazılacak mı?"], "evet", ["Durun:", "zincir kullanmayın"], C.red50, C.red],
    ["S2", ["Kaydın içeriğine karar veren", "tek bir yetkili kurum var mı?"], "evet", ["Güvenin kaynağı o kurumun", "imzası: imzalı kayıt / liste"], C.gok50, C.gok],
    ["S3", ["Geçmişin değişmediğini ve herkesin aynı", "kaydı gördüğünü kanıtlamak gerekiyor mu?"], "hayır", ["İmzalı kayıt", "ya da liste yeterli"], C.gok50, C.gok],
    ["S4", ["Bu tanıklığı bir günlük ve bağımsız", "izleyiciler sağlayabilir mi?"], "evet", ["Şeffaflık günlüğü", "(zincirsiz tanık)"], C.gold50, C.gold],
    ["S5", ["Tanıklığı birlikte yürütecek, birbirinden", "bağımsız, uzun ömürlü işletmeciler var mı?"], "hayır", ["Zincir bir şey katmaz:", "günlükle kalın"], C.gold50, C.gold],
  ];
  const X = 40, W = 430, H = 62, gap = 34;
  qs.forEach(([id, q, ans, res, f, s], i) => {
    const y = 20 + i * (H + gap);
    b += rect(X, y, W, H, { fill: "#FFFFFF", stroke: C.ink, sw: 1.4, r: 14 });
    b += circle(X + 24, y + H / 2, 15, { fill: C.gok });
    b += text(X + 24, y + H / 2 + 0.5, id, { size: 11.5, weight: 700, fill: "#FFFFFF" });
    b += text(X + 54, y + H / 2, q, { anchor: "start", size: 12.5, weight: 500 });
    b += arrow(X + W + 2, y + H / 2, 598, y + H / 2, { kind: ans === "evet" && i === 0 ? "r" : "" });
    b += halo(text(534, y + H / 2 - 12, ans, { size: 11.5, weight: 700, fill: C.gok700 }));
    b += box(600, y + 4, 270, H - 8, res, { size: 12, weight: 600, fill: f, stroke: s });
    if (i < qs.length - 1) {
      const other = { evet: "hayır", hayır: "evet" }[ans];
      const label = i === 1 ? "her iki cevapta da" : other;
      b += arrow(X + W / 2, y + H + 2, X + W / 2, y + H + gap - 2);
      b += halo(text(X + W / 2 + 10, y + H + gap / 2, label, { anchor: "start", size: 11.5, weight: 700, fill: C.gok700 }));
    }
  });
  const yl = 20 + 5 * (H + gap);
  b += arrow(X + W / 2, yl - gap + 2, X + W / 2, yl - 2);
  b += halo(text(X + W / 2 + 10, yl - gap / 2, "evet", { anchor: "start", size: 11.5, weight: 700, fill: C.gok700 }));
  b += box(X + 40, yl, W - 80, 56, ["İzinli zincir, tanık rolünde", "(imzalı listenin projeksiyonu)"], { size: 12.5, weight: 700, fill: "#EAF4EE", stroke: C.green });
  b += text(870, yl + 28, ["Hiçbir dalda zincir", "güvenin kaynağı olmaz."], { anchor: "end", size: 12, italic: true, fill: C.muted });
  save(6, svg(900, yl + 76, b));
}

console.log("A12 şekilleri yazıldı:", out);

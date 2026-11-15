// A3 — Seçici Açıklama: şekiller 1–7. Çalıştır: node publications/figures/a3.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a3");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const tick = (x, y, c = C.green) => `<path d="M${x - 7},${y} l5,6 l10,-12" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cross = (x, y, c = C.red) => `<path d="M${x - 6},${y - 6} l12,12 M${x + 6},${y - 6} l-12,12" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
const eye = (x, y, c = C.red) => `<path d="M${x - 9},${y} q9,-8 18,0 q-9,8 -18,0 z" fill="none" stroke="${c}" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`;
const grey = "#E9E6DF";

// ---------- Şekil 1: kapıdaki görevli ----------
{
  let b = "";
  b += text(225, 22, "Bugün: kart uzatılır", { size: 14.5, weight: 700, fill: C.red });
  b += text(675, 22, "Seçici açıklama ile", { size: 14.5, weight: 700, fill: C.green });
  b += line(450, 10, 450, 334, { stroke: C.rule, sw: 1.2 });
  // iki kart
  const card = (x, y, title, fields) => {
    let s = `<rect x="${x}" y="${y}" width="190" height="${34 + fields.length * 22}" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.3"/>`;
    s += text(x + 95, y + 17, title, { size: 12, weight: 700, fill: C.gok });
    fields.forEach((f, i) => {
      const fy = y + 42 + i * 22;
      s += text(x + 14, fy, f, { anchor: "start", size: 11.5 });
      s += eye(x + 170, fy);
    });
    return s;
  };
  b += card(30, 44, "İkamet izni kartı", ["Ad, soyad", "Doğum tarihi", "Uyruk", "Kart numarası", "Geçerlilik tarihi", "Fotoğraf"]);
  b += card(240, 44, "Öğrenci kartı", ["Ad, soyad", "Üniversite", "Bölüm", "Öğrenci numarası", "Geçerlilik"]);
  b += text(225, 300, "Görevli sorduğu iki bilginin yanında", { size: 12, fill: C.red, weight: 600 });
  b += text(225, 318, "kartlarda yazan her şeyi görür.", { size: 12, fill: C.red, weight: 600 });
  // sağ: telefon
  b += phone(540, 44, 270, 250, C.gok);
  b += text(675, 76, "Aynur'un cüzdanı", { size: 12, weight: 700 });
  const rows = [
    ["18 yaşından büyük: evet", true],
    ["Öğrenci: evet (geçerli)", true],
    ["Ad, soyad", false],
    ["Doğum tarihi", false],
    ["Uyruk · kart numarası", false],
    ["Üniversite · bölüm · öğrenci no", false],
  ];
  rows.forEach(([t, open], i) => {
    const y = 94 + i * 31;
    b += `<rect x="556" y="${y}" width="238" height="25" rx="4" fill="${open ? "#EAF4EE" : grey}" stroke="${open ? C.green : C.rule}"/>`;
    b += text(568, y + 12.5, t, { anchor: "start", size: 11.5, weight: open ? 600 : 400, fill: open ? C.ink : C.muted });
    b += open ? tick(776, y + 13) : lock(778, y + 11, C.muted, 0.7);
  });
  b += text(675, 318, "İmzalı ama gösterilmeyen alanlar kilitli kalır.", { size: 12, fill: C.green, weight: 600 });
  b += text(450, 352, "Sorulan iki bilgi · gösterilen iki bilgi", { size: 12, italic: true, fill: C.muted });
  save(1, svg(900, 365, b));
}

// ---------- Şekil 2: üç yol ----------
{
  let b = "";
  const cols = [10, 310, 610];
  const titles = ["1. Her alan ayrı belge", "2. Her seferinde yeni belge", "3. Kapalı zarfları imzala"];
  cols.forEach((x, i) => {
    b += `<rect x="${x}" y="10" width="280" height="370" rx="8" fill="${i === 2 ? C.gok50 : C.paper}" stroke="${C.rule}"/>`;
    b += text(x + 140, 32, titles[i], { size: 13.5, weight: 700, fill: C.gok });
  });
  // 1
  b += box(95, 50, 110, 36, ["Veren"], { size: 12.5, weight: 600 });
  ["ad", "doğum tarihi", "uyruk", "üniversite", "öğrencilik"].forEach((t, i) => {
    const y = 112 + i * 38;
    b += box(80, y, 140, 28, [t], { size: 11, fill: "#FFFFFF", stroke: C.gok });
    b += key(198, y + 14, C.gold, 0.55);
  });
  b += arrow(150, 88, 150, 108);
  b += text(150, 325, ["Parçalar birbirine", "nasıl bağlanacak?"], { size: 12, weight: 600, fill: C.red });
  // 2
  b += box(370, 60, 160, 36, ["Veren"], { size: 12.5, weight: 600 });
  b += box(370, 170, 160, 36, ["Aynur"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(370, 260, 160, 36, ["Doğrulayan"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(430, 168, 430, 100, { kind: "r" });
  b += arrow(470, 100, 470, 166);
  b += text(424, 134, ["her", "gösterimde"], { anchor: "end", size: 10.5, fill: C.red });
  b += text(476, 134, ["yeni", "belge"], { anchor: "start", size: 10.5, fill: C.gok700 });
  b += arrow(450, 208, 450, 256);
  b += text(450, 325, ["Veren her gösterimi", "öğrenir (eve telefon)."], { size: 12, weight: 600, fill: C.red });
  // 3
  b += box(695, 50, 110, 36, ["Veren"], { size: 12.5, weight: 600 });
  b += `<rect x="640" y="104" width="220" height="56" rx="6" fill="#FFFFFF" stroke="${C.gok}" stroke-width="1.4"/>`;
  b += text(750, 118, "tek imzalı liste", { size: 11, weight: 600, fill: C.gok700 });
  for (let k = 0; k < 6; k++) b += `<rect x="${652 + k * 34}" y="128" width="28" height="22" rx="3" fill="${C.gok100}" stroke="${C.gok}"/>`;
  b += key(842, 118, C.gold, 0.55);
  b += arrow(750, 88, 750, 102);
  b += text(750, 182, "zarflar Aynur'da", { size: 11, fill: C.muted });
  for (let k = 0; k < 6; k++) {
    const open = k === 1 || k === 4;
    b += `<rect x="${652 + k * 34}" y="196" width="28" height="22" rx="3" fill="${open ? "#EAF4EE" : grey}" stroke="${open ? C.green : C.rule}"/>`;
  }
  b += text(750, 238, "yalnız iki zarf açılır", { size: 11, fill: C.green, weight: 600 });
  b += text(750, 325, ["Tek imza, istenen alan;", "verene sorulmaz."], { size: 12, weight: 600, fill: C.green });
  save(2, svg(900, 390, b));
}

// ---------- Şekil 3: SD-JWT akışı ----------
{
  let b = "";
  const band = (y, h, label, fill) => `<rect x="10" y="${y}" width="880" height="${h}" rx="6" fill="${fill}" stroke="${C.rule}"/>` + text(22, y + 14, label, { anchor: "start", size: 11.5, weight: 700, fill: C.gok });
  b += band(10, 112, "Veren", C.paper);
  b += band(132, 112, "Sahip (Aynur'un cüzdanı)", C.gold50);
  b += band(254, 132, "Doğrulayan", C.gok50);
  const row = (y, items, o = {}) => {
    let s = "";
    const w = o.w || 150, gap = o.gap || 24, x0 = o.x0 || 26;
    items.forEach((t, i) => {
      const x = x0 + i * (w + gap);
      s += box(x, y, w, o.h || 54, t, { size: 11, fill: "#FFFFFF", stroke: o.stroke || C.gok });
      if (i < items.length - 1) s += arrow(x + w + 2, y + (o.h || 54) / 2, x + w + gap - 2, y + (o.h || 54) / 2);
    });
    return s;
  };
  b += row(44, [["tuz + alan adı", "+ değer"], ["açıklama", "(Base64URL)"], ["özet", "(SHA-256)"], ["_sd listesi +", "açık alanlar"], ["verenin imzası"]]);
  b += row(166, [["imzalı JWT + 7", "açıklama saklanır"], ["doğrulayan iki", "alan istiyor"], ["yalnız iki açıklama", "seçilir"], ["JWT ~ açıklama ~", "açıklama ~ sahip JWT'si"]], { w: 190, gap: 30, stroke: C.gold });
  b += row(290, [["verenin imzasını", "kontrol et"], ["açıklamaların", "özetini hesapla"], ["_sd listesinde", "var mı?"], ["sahip imzasını", "kontrol et"]], { w: 150, gap: 24 });
  b += box(722, 290, 160, 54, ["2 alan doğrulandı"], { size: 11.5, weight: 700, fill: "#EAF4EE", stroke: C.green, color: C.green });
  b += arrow(698, 317, 720, 317);
  b += text(882, 366, "5 alan ve 1 sahte özet kapalı kaldı", { anchor: "end", size: 11, italic: true, fill: C.muted });
  b += arrow(800, 100, 800, 164, { kind: "g" });
  b += arrow(800, 222, 800, 286, { kind: "g", dash: true });
  b += text(808, 254, "sunum", { anchor: "start", size: 10.5, fill: C.muted });
  save(3, svg(900, 395, b));
}

// ---------- Şekil 4: mdoc ----------
{
  let b = "";
  b += text(165, 22, "Cüzdanda saklanan", { size: 13.5, weight: 700, fill: C.gok });
  b += text(735, 22, "Doğrulayana giden", { size: 13.5, weight: 700, fill: C.gok });
  const pk = ["0 family_name", "1 given_name", "2 birth_date", "3 age_over_18", "4 portrait", "5 issuing_country", "6 document_number", "7 driving_privileges"];
  pk.forEach((t, i) => {
    const x = 15 + (i % 2) * 152, y = 40 + Math.floor(i / 2) * 42;
    const sel = i === 3 || i === 4;
    b += box(x, y, 144, 34, [t], { size: 10.5, fill: sel ? C.gold50 : "#FFFFFF", stroke: sel ? C.gold : C.gok });
  });
  b += text(165, 222, "her pakette ayrı tuz (random)", { size: 10.5, italic: true, fill: C.muted });
  b += box(15, 236, 296, 70, ["MSO: 0 → özet, 1 → özet, … 7 → özet", "cihaz anahtarı · geçerlilik"], { size: 11, fill: C.gok50, stroke: C.gok });
  b += box(15, 316, 296, 36, ["COSE_Sign1 (verenin imzası)"], { size: 11, fill: C.paper, stroke: C.ink });
  // istek
  b += box(345, 70, 210, 84, ["İstek:", "age_over_18 (saklamaz)", "portrait (saklamaz)"], { size: 11, fill: C.paper, stroke: C.ink });
  b += arrow(343, 112, 318, 112, { kind: "m" });
  b += text(450, 60, "doğrulayan ister", { size: 10.5, fill: C.muted });
  b += box(345, 200, 210, 54, ["Aynur onaylar;", "cüzdan yanıtı kurar"], { size: 11, fill: C.gold50, stroke: C.gold });
  b += arrow(557, 220, 598, 168);
  // giden
  b += box(600, 40, 140, 34, ["3 age_over_18"], { size: 10.5, fill: C.gold50, stroke: C.gold });
  b += box(750, 40, 140, 34, ["4 portrait"], { size: 10.5, fill: C.gold50, stroke: C.gold });
  b += box(600, 84, 290, 52, ["MSO + verenin imzası (tamamı;", "8 özetin hepsi içinde)"], { size: 11, fill: C.gok50, stroke: C.gok });
  b += box(600, 146, 290, 34, ["cihaz imzası (bu oturuma özel)"], { size: 11, fill: C.paper, stroke: C.ink });
  b += text(745, 200, "kontroller", { size: 11.5, weight: 700, fill: C.gok });
  ["özet(paket 3) = MSO[3] ?", "özet(paket 4) = MSO[4] ?", "MSO imzası geçerli mi?", "cihaz imzası geçerli mi?"].forEach((t, i) => {
    const y = 224 + i * 28;
    b += text(620, y, t, { anchor: "start", size: 11 });
    b += tick(870, y + 1);
  });
  save(4, svg(900, 365, b));
}

// ---------- Şekil 5: BBS ----------
{
  let b = "";
  b += box(15, 40, 150, 250, [], { fill: C.paper, stroke: C.ink });
  b += text(90, 58, "Veren", { size: 12.5, weight: 700, fill: C.gok });
  for (let k = 0; k < 7; k++) b += box(35, 72 + k * 26, 110, 20, [`m${k + 1}`], { size: 10.5, fill: "#FFFFFF", stroke: C.gok, r: 3 });
  b += arrow(167, 165, 207, 165);
  b += box(209, 135, 120, 60, ["tek imza (A, e)", "80 bayt"], { size: 11, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(331, 165, 371, 165);
  b += phone(373, 70, 120, 200, C.gold);
  b += text(433, 140, ["Aynur'un", "cüzdanı"], { size: 11.5, weight: 700 });
  b += text(433, 196, ["imza + 7 alan", "saklanır"], { size: 10.5, fill: C.muted });
  // ispatlar
  b += arrow(495, 130, 575, 80);
  b += arrow(495, 210, 575, 262);
  b += box(577, 44, 190, 72, ["ispat₁ (rastgele)", "m6, m7 açık · 5 alan gizli", "432 bayt"], { size: 10.5, fill: "#FFFFFF", stroke: C.gok });
  b += box(577, 226, 190, 72, ["ispat₂ (rastgele)", "m6 açık · 6 alan gizli", "464 bayt"], { size: 10.5, fill: "#FFFFFF", stroke: C.gok });
  b += arrow(769, 80, 795, 80);
  b += arrow(769, 262, 795, 262);
  b += box(797, 58, 90, 44, ["Kulüp"], { size: 12, weight: 600, fill: C.paper, stroke: C.ink });
  b += box(797, 240, 90, 44, ["Müze"], { size: 12, weight: 600, fill: C.paper, stroke: C.ink });
  b += line(842, 104, 842, 238, { stroke: C.red, sw: 1.6, dash: true });
  b += halo(text(842, 160, "aynı belge mi?", { size: 11, weight: 600, fill: C.red }));
  b += halo(text(842, 180, "ayırt edilemez", { size: 11, weight: 600, fill: C.green }));
  b += text(450, 318, "İmzanın kendisi hiçbir doğrulayana gitmez; her gösterimde yeni bir ispat türetilir.", { size: 11.5, italic: true, fill: C.muted });
  save(5, svg(900, 332, b));
}

// ---------- Şekil 6: ödünleşim ----------
{
  let b = "";
  b += text(640, 20, "Güvenli donanım", { size: 11.5, weight: 700, fill: C.gok });
  b += text(800, 20, ["Gösterimler", "bağlanamaz"], { size: 11.5, weight: 700, fill: C.gok });
  const rows = [
    ["SD-JWT", [["imzalı JWT (~1 KB)", "8 özet + açık alanlar", 150, C.gok50, C.gok], ["açıklama", "", 66, C.gold50, C.gold], ["açıklama", "", 66, C.gold50, C.gold], ["sahip JWT'si", "", 86, C.paper, C.ink]], true, false],
    ["mdoc", [["MSO + imza", "8 özet", 150, C.gok50, C.gok], ["paket", "", 66, C.gold50, C.gold], ["paket", "", 66, C.gold50, C.gold], ["cihaz imzası", "", 86, C.paper, C.ink]], true, false],
    ["BBS", [["ispat", "432 bayt", 150, "#EAF4EE", C.green], ["açık alan", "", 66, C.gold50, C.gold], ["açık alan", "", 66, C.gold50, C.gold]], false, true],
  ];
  rows.forEach(([name, blocks, hw, unl], i) => {
    const y = 52 + i * 84;
    b += `<rect x="10" y="${y - 8}" width="880" height="72" rx="6" fill="${i % 2 ? C.paper : "#FFFFFF"}" stroke="${C.rule}"/>`;
    b += text(30, y + 28, name, { anchor: "start", size: 13.5, weight: 700, fill: C.gok });
    let x = 110;
    blocks.forEach(([t1, t2, w, f, s]) => {
      b += box(x, y + 4, w, 48, t2 ? [t1, t2] : [t1], { size: 10.5, fill: f, stroke: s });
      x += w + 8;
    });
    b += hw ? tick(640, y + 28) : cross(640, y + 28);
    b += unl ? tick(800, y + 28) : cross(800, y + 28);
  });
  b += text(890, 312, "Örnek: yedi alanlı belge, iki alan gösteriliyor. Boyutlar büyüklük mertebesini gösterir.", { anchor: "end", size: 10.5, italic: true, fill: C.muted });
  save(6, svg(900, 325, b));
}

// ---------- Şekil 7: ilişkilendirme tutamakları ----------
{
  let b = "";
  const panel = (x, title, seen) => {
    let s = `<rect x="${x}" y="14" width="300" height="280" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.2"/>`;
    s += text(x + 150, 36, title, { size: 13.5, weight: 700, fill: C.gok });
    s += text(x + 150, 62, "gördüğü alan", { size: 10.5, fill: C.muted });
    s += box(x + 30, 72, 240, 32, [seen], { size: 11.5, weight: 600, fill: "#EAF4EE", stroke: C.green });
    s += text(x + 150, 124, "ayrıca gördüğü tutamaklar", { size: 10.5, fill: C.muted });
    ["verenin imzası: 9f3c…", "_sd listesi (8 özet)", "cnf anahtarı: RyZ4…", "durum sırası: 41207"].forEach((t, i) => {
      s += box(x + 30, 136 + i * 38, 240, 30, [t], { size: 11, fill: "#FFFFFF", stroke: C.red });
    });
    return s;
  };
  b += panel(20, "Caz kulübü (cuma)", "age_over_18 = true");
  b += panel(580, "Müze (cumartesi)", "student_status = active");
  for (let i = 0; i < 4; i++) b += line(292, 151 + i * 38, 608, 151 + i * 38, { stroke: C.red, sw: 1.4, dash: true });
  b += halo(text(450, 120, "aynı değerler", { size: 11.5, weight: 600, fill: C.red }));
  b += box(330, 306, 240, 40, ["Aynı kişi: cuma kulüpte,", "cumartesi müzede."], { size: 11.5, weight: 600, fill: C.red50, stroke: C.red, color: C.red });
  b += box(110, 362, 680, 36, ["Çözüm yolları (dizinin 5. yazısı): tek kullanımlık kopyalar · siteye özel anahtarlar · sıfır bilgi ispatları"], { size: 11, fill: "#EAF4EE", stroke: C.green });
  save(7, svg(900, 410, b));
}

console.log("A3 şekilleri yazıldı:", out);

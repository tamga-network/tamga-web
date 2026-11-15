// A13 — Türk Dünyasında Dijital Kimlik: şekiller 1–6. Çalıştır: node publications/figures/a13.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, key, person, phone, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a13");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const rect = (x, y, w, h, o = {}) => {
  const { fill = "#FFFFFF", stroke = C.gok, sw = 1.4, r = 8, dash = false } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""}/>`;
};
const vtext = (x, y, label, o = {}) => {
  const { size = 12.5, weight = 600, fill = C.gok700 } = o;
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${x} ${y})">${label}</text>`;
};

// ---------- Şekil 1: katmanlar ----------
{
  let b = "";
  const layers = [
    ["Sınır ötesi tanıma", "henüz büyük ölçüde boş", true],
    ["Mobil dijital belgeler", "uygulamada kimlik, ehliyet, diğer belgeler"],
    ["E-devlet kapısı", "tek giriş noktası, kamu hizmetleri"],
    ["Elektronik kimlik doğrulama", "e-imza, mobil imza, kartla giriş"],
    ["Fiziksel kimlik belgesi", "çipli kimlik kartı, biyometrik pasaport"],
    ["Nüfus kaydı", "kim var, kimlik numarası"],
  ];
  const X = 150, W = 600, H = 50, G = 10, Y0 = 20;
  layers.forEach(([name, ex, top], i) => {
    const y = Y0 + i * (H + G);
    const shade = [C.gold50, "#E3EEF3", C.gok50, "#E3EEF3", C.gok50, C.gok100][i];
    b += rect(X, y, W, H, { fill: top ? "#FFFFFF" : shade, stroke: top ? C.gold : C.gok, dash: !!top, sw: top ? 2 : 1.4, r: 6 });
    b += text(X + 20, y + H / 2, `${6 - i}`, { anchor: "start", size: 14, weight: 700, fill: top ? C.gold : C.gok });
    b += text(X + 48, y + H / 2, name, { anchor: "start", size: 13.5, weight: 700, fill: C.ink });
    b += text(X + W - 18, y + H / 2, ex, { anchor: "end", size: 12, italic: true, fill: C.muted });
  });
  const totalH = layers.length * (H + G) - G;
  b += rect(20, Y0, 112, totalH, { fill: C.paper, stroke: C.ink, r: 8 });
  b += vtext(76, Y0 + totalH / 2, "Hukuki çerçeve: e-imza ve kişisel veri kanunları", { size: 12.5, fill: C.ink });
  b += rect(768, Y0, 112, totalH, { fill: C.paper, stroke: C.ink, r: 8 });
  b += vtext(824, Y0 + totalH / 2, "Birlikte çalışabilirlik: kurumlar arası veri değişimi", { size: 12.5, fill: C.ink });
  b += text(450, Y0 + totalH + 24, "Katmanlar alttan üste birbirinin üzerine kurulur; en üst katman bu yazının konusudur.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(1, svg(900, Y0 + totalH + 42, b));
}

// ---------- Şekil 3: zaman çizelgesi ----------
{
  let b = "";
  const X0 = 200, X1 = 860;
  const X = (y) => X0 + ((y - 2006) * (X1 - X0)) / (2027 - 2006);
  const lanes = [
    ["Türkiye", [[2008, "e-Devlet Kapısı"], [2016, "çipli kimlik kartı (pilot)"], [2027, "cüzdan prototipi (plan)"]]],
    ["Azerbaycan", [[2018, "e-imza sertifikalı kimlik kartı"], [2026, "TR ile e-imza: teknik entegrasyon"]]],
    ["Kazakistan", [[2006, "eGov.kz"], [2009, "çipli kimlik belgeleri"], [2021, "mobil dijital belgeler"]]],
    ["Özbekistan", [[2013, "my.gov.uz (deneme)"], [2021, "çipli kimlik kartı"], [2025, "dijital belge = kâğıt"]]],
    ["Kırgızistan", [[2016, "Tunduk (X-Road)"], [2017, "e-imza sertifikalı kimlik kartı"]]],
    ["Türkmenistan", [[2008, "biyometrik pasaport"], [2019, "e-devlet portalı"]]],
    ["Türk Devletleri Teşkilatı", [[2009, "Nahçıvan Anlaşması"], [2021, "yeni ad, Vizyon 2040"], [2024, "Bişkek Bildirisi"], [2026, "Türkistan Bildirisi", 34]]],
  ];
  const LH = 58, Y0 = 46;
  // yıl ekseni
  for (let y = 2006; y <= 2027; y++) {
    const x = X(y);
    const major = y % 5 === 0;
    b += line(x, Y0 - 8, x, Y0 + lanes.length * LH - 8, { stroke: major ? C.rule : "#EDE8DD", sw: major ? 1 : 0.7 });
    if (major || y === 2006 || y === 2027) b += text(x, Y0 - 20, String(y), { size: 11, fill: C.muted });
  }
  lanes.forEach(([name, ev], i) => {
    const y = Y0 + i * LH + LH / 2 - 8;
    const isOrg = i === lanes.length - 1;
    if (i % 2 === 0) b += `<rect x="20" y="${y - LH / 2}" width="${X1 + 20}" height="${LH}" fill="${C.paper}" opacity="0.55"/>`;
    b += text(28, y, name, { anchor: "start", size: 12.5, weight: 700, fill: isOrg ? C.gold : C.gok700 });
    b += line(X0 - 6, y, X1 + 6, y, { stroke: isOrg ? C.gold : C.gok100, sw: 2 });
    ev.forEach(([yr, label, dy], j) => {
      const x = X(yr);
      const up = j % 2 === 0;
      b += circle(x, y, 5.5, { fill: isOrg ? C.gold : C.gok, stroke: "#FFFFFF", sw: 1.5 });
      const ty = dy ? y + dy : up ? y - 15 : y + 16;
      const anchor = x > X1 - 120 ? "end" : "start";
      const tx = anchor === "end" ? x + 6 : x - 6;
      b += halo(text(tx, ty, `${yr} ${label}`, { anchor, size: 11, fill: C.ink }));
    });
  });
  const yb = Y0 + lanes.length * LH + 14;
  b += text(880, yb + 6, "Yalnız kamuya açık kaynaklarla doğrulanmış tarihler; 2027 bir plandır.", { anchor: "end", size: 11, italic: true, fill: C.muted });
  save(3, svg(900, yb + 22, b));
}

// ---------- Şekil 2: pasif doğrulama ----------
{
  let b = "";
  // çip
  b += rect(20, 40, 210, 230, { fill: C.gok50, stroke: C.gok, sw: 1.8, r: 12 });
  b += text(125, 62, "Çip", { size: 14, weight: 700, fill: C.gok700 });
  [["DG1", "MRZ bilgileri"], ["DG2", "yüz fotoğrafı"], ["DG3", "parmak izi"]].forEach(([d, t], i) => {
    const y = 80 + i * 40;
    b += rect(36, y, 178, 32, { fill: "#FFFFFF", stroke: C.gok, r: 5 });
    b += text(50, y + 16, d, { anchor: "start", size: 12, weight: 700 });
    b += text(90, y + 16, t, { anchor: "start", size: 12 });
  });
  b += rect(36, 206, 178, 50, { fill: C.gold50, stroke: C.gold, sw: 2, r: 5 });
  b += text(125, 222, "SOD", { size: 12, weight: 700 });
  b += text(125, 242, "özetler + imza", { size: 11.5 });
  // belge imzalayıcı
  b += box(420, 196, 180, 70, ["Belge imzalayıcı", "sertifikası"], { size: 12.5, weight: 600 });
  b += arrow(216, 231, 418, 231);
  b += halo(text(318, 214, "2. imzayı doğrula", { size: 11, weight: 600, fill: C.gok700 }));
  // CSCA
  b += box(420, 46, 180, 70, ["Ülkenin kök otoritesi", "(CSCA)"], { size: 12.5, weight: 600, fill: C.gok100 });
  b += arrow(510, 194, 510, 118);
  b += text(518, 156, ["3. sertifikayı", "doğrula"], { anchor: "start", size: 11, weight: 600, fill: C.gok700 });
  // okuyucu adımı 1
  b += `<path d="M232,100 C285,100 285,150 232,150" fill="none" stroke="${C.gok}" stroke-width="1.6" marker-end="url(#ar)"/>`;
  b += text(292, 125, ["1. özetleri hesapla,", "SOD ile karşılaştır"], { anchor: "start", size: 11, weight: 600, fill: C.gok700 });
  // nereden?
  b += rect(640, 30, 245, 236, { fill: "#FFFFFF", stroke: C.red, sw: 1.6, r: 10, dash: true });
  b += text(762, 56, "4. CSCA sertifikası nereden?", { size: 13, weight: 700, fill: C.red });
  b += arrow(602, 81, 638, 81, { kind: "r", dash: true });
  b += box(656, 82, 212, 52, ["İkili değiş tokuş", "(ülke çiftleri arasında)"], { size: 12, fill: C.paper, stroke: C.ink });
  b += box(656, 150, 212, 52, ["ICAO PKD", "(ortak dizin)"], { size: 12, fill: C.paper, stroke: C.ink });
  b += text(762, 234, ["kurumsal ve hukuki bir soru:", "neden bu köke güveniyorum?"], { size: 11.5, italic: true, fill: C.red });
  b += text(450, 300, "1–3 matematiktir ve her ülkede aynı sonucu verir; 4. soru güvenin kaynağı sorusudur.", { size: 12, italic: true, fill: C.muted });
  save(2, svg(900, 318, b));
}

// ---------- Şekil 4: üç senaryo ----------
{
  let b = "";
  const rows = [
    ["Aynur", "Bakü → İstanbul · eğitim", ["taranmış diploma, noter, apostil,", "posta; haftalar"], ["imzalı diploma cüzdanda; anahtar", "Azerbaycan'ın listesinden"]],
    ["Timur", "Almatı → İstanbul · iş", ["pasaport fotokopisi ve onaylı", "diploma sureti"], ["yalnız istenen alanlar; imzalar", "Kazakistan'ın listesinden"]],
    ["Dilnoza", "Taşkent → Bişkek · kayıt", ["pasaport fotokopisi;", "gerekenden fazla bilgi"], ["yalnız ad ya da yaş bilgisi;", "kopya yok"]],
  ];
  b += text(365, 22, "Bugün", { size: 14, weight: 700, fill: C.red });
  b += text(705, 22, "Ortak güven altyapısıyla", { size: 14, weight: 700, fill: C.green });
  rows.forEach(([n, route, now, fut], i) => {
    const y = 40 + i * 104;
    b += person(52, y + 44, 0.9, C.gold);
    b += text(90, y + 30, n, { anchor: "start", size: 13.5, weight: 700 });
    b += text(90, y + 52, route, { anchor: "start", size: 11, fill: C.muted });
    b += box(250, y + 8, 230, 72, now, { size: 11.5, weight: 500, fill: C.red50, stroke: C.red });
    b += arrow(484, y + 44, 586, y + 44, { kind: "g" });
    b += box(590, y + 8, 290, 72, fut, { size: 11.5, weight: 500, fill: "#EAF4EE", stroke: C.green });
  });
  b += text(450, 362, "Üç senaryoda aynı soru: Yabancı bir kurumun imzasına neye dayanarak güvenilir?", { size: 12, italic: true, fill: C.gok700, weight: 600 });
  save(4, svg(900, 378, b));
}

// ---------- Şekil 5: üç yönetişim modeli ----------
{
  let b = "";
  const codes = ["TR", "AZ", "KZ", "UZ", "KG", "TM"];
  const panel = (ox, title) => {
    let s = rect(ox, 14, 280, 360, { fill: "#FFFFFF", stroke: C.rule, r: 10 });
    s += text(ox + 140, 36, title, { size: 13.5, weight: 700, fill: C.gok700 });
    return s;
  };
  const ring = (cx, cy, r) => codes.map((c, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 6;
    return [c, cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  const node = (c, x, y, f = C.gok50) => circle(x, y, 18, { fill: f, stroke: C.gok, sw: 1.6 }) + text(x, y + 0.5, c, { size: 11.5, weight: 700 });
  // 1 ikili
  {
    const ox = 10;
    b += panel(ox, "İkili anlaşmalar");
    const P = ring(ox + 140, 160, 88);
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) b += line(P[i][1], P[i][2], P[j][1], P[j][2], { stroke: C.gok, sw: 1.1 });
    P.forEach(([c, x, y]) => (b += node(c, x, y)));
    b += text(ox + 140, 290, "6 ülke → 15 ilişki", { size: 12.5, weight: 700 });
    b += text(ox + 140, 314, ["her anahtar yenilemesi", "5 ayrı ilişkide bildirilir"], { size: 11, fill: C.muted });
  }
  // 2 düğümler
  {
    const ox = 310;
    b += panel(ox, "Ülke düğümleri (federasyon)");
    const P = ring(ox + 140, 160, 88);
    P.forEach(([c, x, y]) => (b += line(x, y, ox + 140, 160, { stroke: C.gok100, sw: 1.4 })));
    b += circle(ox + 140, 160, 22, { fill: C.paper, stroke: C.ink, sw: 1.4 });
    b += text(ox + 140, 160, ["ortak", "protokol"], { size: 9.5, weight: 600 });
    P.forEach(([c, x, y]) => (b += node(c, x, y)));
    // kırmızı geri bildirim
    b += `<path d="M${P[2][1] - 6},${P[2][2] + 20} Q${ox + 140},${322} ${P[4][1] + 10},${P[4][2] + 18}" fill="none" stroke="${C.red}" stroke-width="1.8" marker-end="url(#arr)"/>`;
    b += text(ox + 140, 318, ["her işlemde kişinin", "kendi ülkesine haber gider"], { size: 11.5, weight: 600, fill: C.red });
    b += text(ox + 140, 352, ["mevcut e-devlet kapıları kullanılır;", "iki sistem aynı anda çalışmalı"], { size: 11, fill: C.muted });
  }
  // 3 listeler listesi
  {
    const ox = 610;
    b += panel(ox, "Ortak listeler listesi");
    const P = ring(ox + 140, 168, 92);
    P.forEach(([c, x, y]) => (b += line(x, y, ox + 140, 168, { stroke: C.gold, sw: 1.4, dash: true })));
    b += rect(ox + 92, 146, 96, 44, { fill: C.gold50, stroke: C.gold, sw: 2, r: 6 });
    b += text(ox + 140, 168, ["listeler", "listesi"], { size: 11, weight: 700 });
    P.forEach(([c, x, y]) => (b += node(c, x, y, "#EAF4EE")));
    b += text(ox + 140, 290, "6 ülke → 6 ilişki", { size: 12.5, weight: 700 });
    b += text(ox + 140, 314, ["her liste kendi ülkesinde kalır;", "verene soru sorulmaz"], { size: 11, fill: C.muted });
  }
  b += text(450, 392, "Ortadaki yapının içeriği: yalnız her ülke listesinin adresi ve imzacısı.", { size: 11.5, italic: true, fill: C.muted });
  save(5, svg(900, 404, b));
}

// ---------- Şekil 6: teknik uyum ve hukuki tanıma ----------
{
  let b = "";
  b += box(20, 60, 150, 200, ["AB dışındaki", "bir ülke"], { size: 13.5, weight: 700, fill: C.paper, stroke: C.ink });
  b += box(730, 60, 150, 200, ["Avrupa", "Birliği"], { size: 13.5, weight: 700, fill: C.paper, stroke: C.ink });
  // üst bant
  b += rect(190, 50, 520, 92, { fill: C.gold50, stroke: C.gold, sw: 1.8, r: 10 });
  b += text(450, 70, "Hukuki tanıma", { size: 14, weight: 700, fill: C.ink });
  b += text(450, 94, "uygulama işlemi ya da AB ile anlaşma (eIDAS md. 14, ABİHA md. 218)", { size: 11.5 });
  b += text(450, 114, "karşılıklılık · üçüncü ülkenin güven listesi", { size: 11.5 });
  b += text(450, 132, "siyasi ve hukuki karar; iki taraflı", { size: 11, italic: true, fill: C.muted });
  // alt bant
  b += rect(190, 178, 520, 92, { fill: C.gok50, stroke: C.gok, sw: 1.8, r: 10 });
  b += text(450, 198, "Teknik uyum", { size: 14, weight: 700, fill: C.ink });
  b += text(450, 222, "belge biçimleri: SD-JWT VC, mdoc · protokoller: OpenID4VCI, OpenID4VP", { size: 11.5 });
  b += text(450, 242, "güven listesi biçimi: ETSI TS 119 612 / TS 119 602", { size: 11.5 });
  b += text(450, 260, "bugünden kurulabilir; tek taraflı", { size: 11, italic: true, fill: C.muted });
  b += arrow(172, 96, 188, 96, { both: true });
  b += arrow(712, 96, 728, 96, { both: true });
  b += arrow(172, 224, 188, 224, { both: true });
  b += arrow(712, 224, 728, 224, { both: true });
  b += arrow(450, 176, 450, 146, { sw: 2.2 });
  b += halo(text(462, 161, "teknik uyum, hukuki tanımayı uygulanabilir kılar", { anchor: "start", size: 11, weight: 600, fill: C.gok700 }));
  b += text(450, 296, "Teknik uyum hukuki tanımayı kendiliğinden getirmez; hukuki tanıma da teknik uyum olmadan uygulanamaz.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(6, svg(900, 312, b));
}

console.log("A13 şekilleri yazıldı:", out);

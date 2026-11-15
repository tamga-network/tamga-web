// A7 — İptal: Bir Belgeyi Geri Almak, Kimseyi İzlemeden: şekiller 1–7. Çalıştır: node publications/figures/a7.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, phone } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a7");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const rect = (x, y, w, h, fill, stroke = "none", sw = 1, r = 0) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
// Arka planı beyaz kutulu etiket (çizginin üstünde okunur kalsın diye).
const label = (x, y, lines, o = {}) => {
  const arr = Array.isArray(lines) ? lines : [lines];
  const size = o.size ?? 11;
  const w = Math.max(...arr.map((l) => l.length)) * size * 0.56 + 10;
  const h = arr.length * size * 1.3 + 6;
  const anchor = o.anchor ?? "middle";
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "start" ? x - 5 : x - w + 5;
  return rect(x0.toFixed(1), (y - h / 2).toFixed(1), w.toFixed(1), h.toFixed(1), "#FFFFFF") + text(x, y, arr, o);
};

// ---------- Şekil 1: iki kötü cevap, üçüncü yol ----------
{
  let b = "";
  const cols = [20, 315, 610];
  const W = 270;
  const titles = ["1. Hiç sorma", "2. Her seferinde sor", "3. Önceden indir"];
  cols.forEach((x, i) => {
    b += rect(x, 10, W, 360, i === 2 ? "#F3F8F5" : "#FFFFFF", i === 2 ? C.green : C.rule, 1.2, 8);
    b += text(x + W / 2, 32, titles[i], { size: 14, weight: 700, fill: i === 2 ? C.green : C.gok });
  });
  // 1
  b += box(45, 70, 100, 44, ["Müze"], { size: 12.5, fill: C.paper, stroke: C.ink, weight: 600 });
  b += box(175, 70, 100, 44, ["Üniversite"], { size: 12.5, weight: 600 });
  b += line(147, 92, 173, 92, { stroke: C.rule, sw: 1.2, dash: true });
  b += text(160, 132, "soru yok", { size: 11, fill: C.muted });
  b += box(60, 170, 200, 50, ["Belge kabul edildi"], { size: 12, fill: "#EAF4EE", stroke: C.green });
  b += arrow(95, 116, 120, 168);
  b += text(155, 300, ["İptal edilmiş belge", "de kabul edilir."], { size: 12.5, weight: 600, fill: C.red });
  // 2
  b += box(340, 70, 100, 44, ["Müze"], { size: 12.5, fill: C.paper, stroke: C.ink, weight: 600 });
  b += box(470, 70, 100, 44, ["Üniversite"], { size: 12.5, weight: 600 });
  b += arrow(442, 84, 468, 84, { kind: "r" });
  b += arrow(468, 102, 442, 102);
  b += text(450, 150, ["“Aynur'un belgesi", "şu an geçerli mi?”"], { size: 11.5, fill: C.red });
  b += box(355, 190, 200, 50, ["Cevap: geçerli / iptal"], { size: 12, fill: C.gok50, stroke: C.gok });
  b += text(450, 300, ["Üniversite, Aynur'un", "nereye gittiğini öğrenir."], { size: 12.5, weight: 600, fill: C.red });
  // 3
  b += box(675, 55, 140, 40, ["Üniversite"], { size: 12.5, weight: 600 });
  b += arrow(745, 97, 745, 121);
  b += box(640, 123, 210, 50, ["Herkese açık imzalı liste", "(binlerce belgenin durumu)"], { size: 11.5, fill: C.gold50, stroke: C.gold, weight: 600 });
  ["Müze", "Sinema", "Kitapçı"].forEach((t, i) => {
    const x = 625 + i * 82;
    b += box(x, 215, 74, 38, [t], { size: 11.5, fill: C.paper, stroke: C.ink });
    b += arrow(x + 37, 213, 700 + i * 45, 175, { kind: "m" });
  });
  b += text(745, 270, "düzenli indirir; kasada kendi kopyasına bakar", { size: 10.5, fill: C.muted });
  b += text(745, 310, ["İptal görülür,", "kimse izlenmez."], { size: 12.5, weight: 600, fill: C.green });
  save(1, svg(900, 385, b));
}

// ---------- Şekil 2: yaşam döngüsü ----------
{
  let b = "";
  circle && (b += `<circle cx="40" cy="120" r="9" fill="${C.ink}"/>`);
  b += arrow(51, 120, 128, 120);
  b += text(90, 105, "verildi", { size: 11.5, fill: C.gok700 });
  b += box(130, 90, 170, 60, ["Geçerli"], { size: 15, weight: 700, fill: "#EAF4EE", stroke: C.green, color: C.green });
  b += box(450, 20, 170, 60, ["Askıda"], { size: 15, weight: 700, fill: C.gold50, stroke: C.gold });
  b += arrow(302, 105, 448, 60, { kind: "g" });
  b += text(370, 64, "askıya al", { size: 11.5, fill: C.muted });
  b += arrow(448, 75, 302, 120, { kind: "g" });
  b += text(390, 113, "askıyı kaldır", { size: 11.5, fill: C.muted });
  b += box(700, 120, 170, 60, ["İptal edildi"], { size: 15, weight: 700, fill: C.red50, stroke: C.red, color: C.red });
  b += text(785, 198, "kalıcı, geri dönüş yok", { size: 11.5, italic: true, fill: C.red });
  b += arrow(302, 140, 698, 150, { kind: "r" });
  b += label(500, 145, "iptal et", { size: 11.5, fill: C.red });
  b += arrow(622, 60, 720, 118, { kind: "r" });
  b += text(690, 76, "iptal et", { size: 11.5, fill: C.red });
  b += box(130, 250, 170, 56, ["Süresi doldu"], { size: 14, weight: 700, fill: C.paper, stroke: C.muted, color: C.muted });
  b += arrow(215, 152, 215, 248, { kind: "m", dash: true });
  b += text(225, 200, ["son geçerlilik tarihi geçti", "(kimse karar vermez)"], { anchor: "start", size: 11.5, fill: C.muted });
  b += text(880, 290, ["Süre dolması belgenin içinden;", "iptal ve askı belgenin dışındaki", "durum bilgisinden öğrenilir."], {
    anchor: "end", size: 12, italic: true, fill: C.muted,
  });
  save(2, svg(900, 325, b));
}

// ---------- Şekil 3: bit dizisi ----------
{
  let b = "";
  const vals = [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1];
  const S = 46, X0 = 82;
  b += text(20, 22, "Belgelerin sıra numaraları ve durumları (0 = geçerli, 1 = iptal)", { anchor: "start", size: 12.5, weight: 600 });
  vals.forEach((v, i) => {
    const x = X0 + i * S + (i >= 8 ? 14 : 0);
    b += rect(x, 40, S - 6, S - 6, v ? C.red50 : "#FFFFFF", v ? C.red : C.ink, 1.3, 4);
    b += text(x + (S - 6) / 2, 60, String(v), { size: 15, weight: 700, fill: v ? C.red : C.ink });
    b += text(x + (S - 6) / 2, 98, String(i), { size: 11, fill: C.muted });
  });
  b += text(40, 60, "durum", { size: 11, fill: C.muted });
  b += text(40, 98, "sıra", { size: 11, fill: C.muted });
  // baytlar
  const byte = (bx, idxs, hex, title) => {
    let s = text(bx + 172, 150, title, { size: 12.5, weight: 600, fill: C.gok });
    s += rect(bx, 162, 344, 54, C.gok50, C.gok, 1.4, 6);
    idxs.forEach((idx, k) => {
      const x = bx + 8 + k * 41;
      const v = vals[idx];
      s += rect(x, 170, 36, 38, v ? C.red50 : "#FFFFFF", v ? C.red : C.ink, 1.2, 3);
      s += text(x + 18, 189, String(v), { size: 14, weight: 700, fill: v ? C.red : C.ink });
      s += text(x + 18, 230, `bit ${7 - k}`, { size: 9.5, fill: C.muted });
      s += text(x + 18, 245, `sıra ${idx}`, { size: 9.5, fill: C.gok700 });
    });
    s += text(bx + 172, 278, hex, { size: 15, weight: 700, fill: C.ink });
    return s;
  };
  b += byte(60, [7, 6, 5, 4, 3, 2, 1, 0], "1011 1001 = 0xB9", "Bayt 0 (sıra 0–7)");
  b += byte(480, [15, 14, 13, 12, 11, 10, 9, 8], "1010 0011 = 0xA3", "Bayt 1 (sıra 8–15)");
  // sıra 0 vurgusu
  b += `<path d="M${X0 + 20},${108} C ${X0 + 20},135 ${60 + 8 + 7 * 41 + 18},130 ${60 + 8 + 7 * 41 + 18},166" fill="none" stroke="${C.gold}" stroke-width="2" marker-end="url(#arg)"/>`;
  b += text(880, 305, "Küçük sıra numarası, baytın en düşük değerli bitine (en sağa) yerleşir.", { anchor: "end", size: 12, italic: true, fill: C.muted });
  save(3, svg(900, 320, b));
}

// ---------- Şekil 4: belgeden belirtece ----------
{
  let b = "";
  // belge
  b += rect(20, 40, 200, 200, "#FFFFFF", C.ink, 1.4, 8);
  b += text(120, 62, "Aynur'un öğrenci belgesi", { size: 12.5, weight: 700 });
  b += text(36, 92, ["iss: universite.example", "vct: öğrenci belgesi", "exp: 2028-…"], { anchor: "start", size: 11, fill: C.muted });
  b += rect(32, 140, 176, 74, C.gold50, C.gold, 1.4, 4);
  b += text(42, 158, "status", { anchor: "start", size: 11.5, weight: 700, fill: C.ink });
  b += text(42, 180, ["idx: 48213", "uri: …/7f3a9c21"], { anchor: "start", size: 11.5, fill: C.ink });
  // belirteç
  b += rect(300, 20, 340, 300, "#FFFFFF", C.gok, 1.6, 8);
  b += text(470, 42, "Durum listesi belirteci (JWT)", { size: 13, weight: 700, fill: C.gok });
  b += box(315, 58, 310, 58, ["Başlık", "typ: statuslist+jwt · alg: ES256 · imzacı sertifikası"], { size: 11 });
  b += box(315, 126, 310, 118, ["İçerik", "sub: …/7f3a9c21", "iat · exp · ttl", "status_list: { bits: 2,", "lst: sıkıştırılmış dizi }"], { size: 11 });
  b += box(315, 254, 310, 50, ["İmza (kurumun durum anahtarı)"], { size: 11.5, weight: 600, fill: C.red50, stroke: C.red });
  b += arrow(210, 178, 380, 150, { kind: "g", dash: true });
  b += text(260, 214, ["aynı adres", "olmalı"], { size: 10.5, fill: C.gold });
  // açılan dizi
  b += arrow(627, 205, 690, 205);
  b += text(658, 192, "aç", { size: 11, fill: C.gok700 });
  b += rect(692, 120, 190, 170, C.gok50, C.gok, 1.2, 8);
  b += text(787, 140, "bit dizisi (açılmış)", { size: 11.5, weight: 600 });
  for (let k = 0; k < 8; k++) {
    const x = 702 + k * 22;
    const hot = k === 5;
    b += rect(x, 160, 18, 26, hot ? C.red50 : "#FFFFFF", hot ? C.red : C.rule, hot ? 2 : 1, 2);
  }
  b += text(787, 204, "… 48213. sıra …", { size: 10.5, fill: C.muted });
  b += box(712, 222, 150, 52, ["01 → iptal edilmiş"], { size: 12, weight: 700, fill: C.red50, stroke: C.red, color: C.red });
  b += text(880, 345, "Doğrulayıcı listeyi önceden indirir; kasada yalnızca kendi kopyasına bakar.", { anchor: "end", size: 12, italic: true, fill: C.muted });
  save(4, svg(900, 360, b));
}

// ---------- Şekil 5: sürü gizliliği ----------
{
  let b = "";
  const panels = [
    [20, "1. Küçük liste"],
    [320, "2. Büyük ama sıralı dağıtılmış"],
    [620, "3. Büyük ve rastgele dağıtılmış"],
  ];
  panels.forEach(([x, t], i) => {
    b += rect(x, 10, 260, 290, i === 2 ? "#F3F8F5" : "#FFFFFF", i === 2 ? C.green : C.rule, 1.2, 8);
    b += text(x + 130, 32, t, { size: 13, weight: 700, fill: i === 2 ? C.green : C.gok });
  });
  // 1: 12 kare, 3 dolu
  const fill1 = [1, 4, 9];
  for (let k = 0; k < 12; k++) {
    const x = 42 + (k % 6) * 36, y = 70 + Math.floor(k / 6) * 36;
    b += rect(x, y, 30, 30, fill1.includes(k) ? C.gok : "#FFFFFF", C.gok, 1.2, 3);
  }
  b += text(150, 170, "12 sıra, 3 belge", { size: 11.5, fill: C.muted });
  b += text(150, 245, ["Listeyi indirmek,", "neredeyse kişiyi", "sormak demek."], { size: 12, weight: 600, fill: C.red });
  // grid helper
  const grid = (x0, filled, highlight) => {
    let s = "";
    for (let r = 0; r < 10; r++)
      for (let c = 0; c < 22; c++) {
        const k = r * 22 + c;
        s += rect(x0 + c * 10, 60 + r * 10, 8, 8, filled.has(k) ? C.gok : "#FFFFFF", filled.has(k) ? C.gok : C.rule, 0.6, 1);
      }
    if (highlight !== undefined) {
      const c = highlight % 22, r = Math.floor(highlight / 22);
      s += rect(x0 + c * 10 - 2, 60 + r * 10 - 2, 12, 12, "none", C.red, 2, 2);
    }
    return s;
  };
  const seq = new Set(Array.from({ length: 40 }, (_, k) => k));
  b += grid(340, seq, 12);
  b += text(470, 175, "dolu sıralar hep başta: 0, 1, 2 …", { size: 11, fill: C.muted });
  b += text(470, 235, ["idx 12 kayıt sırasını ve", "yaklaşık tarihi ele verir."], { size: 12, weight: 600, fill: C.red });
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const rs = new Set();
  while (rs.size < 40) rs.add(Math.floor(rnd() * 220));
  b += grid(640, rs);
  b += text(770, 175, "dolu sıralar serpiştirilmiş", { size: 11, fill: C.muted });
  b += text(770, 235, ["Sıra numarası kişi hakkında", "bir şey söylemez."], { size: 12, weight: 600, fill: C.green });
  b += text(880, 322, "Sürü, listenin kapasitesiyle değil, gerçekten kullanılan sıralarla ve kurumun büyüklüğüyle sınırlıdır.", {
    anchor: "end", size: 11.5, italic: true, fill: C.muted,
  });
  save(5, svg(900, 335, b));
}

// ---------- Şekil 6: tazelik zaman çizelgesi ----------
{
  let b = "";
  const X = (m) => 140 + m * 52;
  b += line(X(0), 210, X(13), 210, { stroke: C.ink, sw: 1.4 });
  for (let m = 0; m <= 13; m++) {
    b += line(X(m), 205, X(m), 215, { stroke: C.ink, sw: 1 });
    b += text(X(m), 230, `${m}`, { size: 10.5, fill: C.muted });
  }
  b += text(X(13) + 8, 230, "dk", { anchor: "start", size: 10.5, fill: C.muted });
  b += text(20, 80, ["Kurumun", "yayınları"], { anchor: "start", size: 12, weight: 600, fill: C.gok });
  b += text(20, 160, ["Doğrulayıcının", "ön çekimleri"], { anchor: "start", size: 12, weight: 600, fill: C.gok });
  for (let m = 0; m <= 12; m += 2) {
    const hot = m === 2;
    b += rect(X(m) - 12, 66, 24, 28, hot ? C.red50 : C.gold50, hot ? C.red : C.gold, hot ? 2 : 1.2, 3);
    b += line(X(m), 96, X(m), 205, { stroke: C.rule, sw: 0.8, dash: true });
  }
  b += text(X(2) + 16, 54, "iptali içeren ilk yayın", { anchor: "start", size: 11, weight: 600, fill: C.red });
  // iptal anı
  b += `<path d="M${X(1) - 6},20 L${X(1) + 4},34 L${X(1) - 2},34 L${X(1) + 6},48" fill="none" stroke="${C.red}" stroke-width="2.4"/>`;
  b += text(X(1) - 12, 34, "iptal", { anchor: "end", size: 11.5, weight: 700, fill: C.red });
  b += line(X(1), 50, X(1), 205, { stroke: C.red, sw: 1.4, dash: true });
  for (const m of [0, 5, 10]) {
    const hot = m === 5;
    b += arrow(X(m), 130, X(m), 178, { kind: hot ? "r" : "" , sw: hot ? 2.2 : 1.6 });
    b += circle(X(m), 130, 5, { fill: hot ? C.red : C.gok });
  }
  b += text(X(5) + 10, 150, "iptali öğrendi", { anchor: "start", size: 11, weight: 600, fill: C.red });
  // parantez
  b += `<path d="M${X(1)},258 v8 H${X(5)} v-8" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`;
  b += text((X(1) + X(5)) / 2, 284, "en kötü gecikme ≈ yayın aralığı + ön çekim aralığı", { size: 12, weight: 600 });
  b += text(X(13), 312, "Örnek: yayın 2 dakikada bir, ön çekim 5 dakikada bir. Belirtecin exp süresi (ör. 6 saat), sunucu kesintisinde son listeyle ne kadar idare edileceğini belirler.", {
    anchor: "end", size: 10.5, italic: true, fill: C.muted,
  });
  save(6, svg(900, 325, b));
}

// ---------- Şekil 7: kısa ömürlü kopyalar ----------
{
  let b = "";
  const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
  const D = 160, X0 = 60;
  b += line(X0, 200, X0 + 5 * D, 200, { stroke: C.ink, sw: 1.4 });
  days.forEach((d, i) => {
    const x = X0 + i * D;
    b += line(x, 194, x, 206, { stroke: C.ink, sw: 1 });
    b += text(x + D / 2, 222, d, { size: 12, fill: C.muted });
  });
  b += line(X0 + 5 * D, 194, X0 + 5 * D, 206, { stroke: C.ink, sw: 1 });
  b += text(20, 40, "Cüzdandaki kopyalar (her biri 24 saat geçerli)", { anchor: "start", size: 12.5, weight: 600 });
  for (let i = 0; i < 5; i++) {
    const x = X0 + i * D;
    const alive = i <= 2;
    b += rect(x + 4, 110, D - 8, 34, alive ? "#EAF4EE" : C.paper, alive ? C.green : C.rule, 1.3, 5);
    b += text(x + D / 2, 127, alive ? `kopya ${i + 1}` : "kopya yok", { size: 12, weight: 600, fill: alive ? C.green : C.muted });
    if (i > 0) {
      const ok = i <= 2;
      b += arrow(x, 80, x, 106, { kind: ok ? "" : "r" });
      b += text(x, 70, ok ? "yenilendi" : "yenilenmez", { size: 10.5, weight: 600, fill: ok ? C.gok700 : C.red });
      if (!ok) b += line(x - 10, 84, x + 10, 100, { stroke: C.red, sw: 2.4 });
    }
  }
  // iptal anı
  const xi = X0 + 2 * D + D / 2;
  b += line(xi, 150, xi, 196, { stroke: C.red, sw: 1.6, dash: true });
  b += text(xi, 166, "", { size: 1 });
  b += label(xi, 172, "Kurum iptal etti", { size: 11.5, weight: 700, fill: C.red });
  b += text(X0 + 5 * D, 258, ["En kötü durumda iptal, son kopyanın ömrü kadar gecikir;", "ortada liste ya da sorgu yoktur."], {
    anchor: "end", size: 12, italic: true, fill: C.muted,
  });
  save(7, svg(900, 280, b));
}

console.log("A7 şekilleri yazıldı:", out);

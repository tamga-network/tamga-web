// A14 — Deepfake Çağında Kimlik Doğrulama: şekiller 1–6. Çalıştır: node publications/figures/a14.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a14");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
// Etiket: arkasında beyaz zemin (Typst'te paint-order desteklenmediği için hale yerine).
const lab = (x, y, str, o = {}) => {
  const size = o.size ?? 11.5;
  const lines = Array.isArray(str) ? str : [str];
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.56 + 10;
  const h = lines.length * size * 1.3 + 4;
  const anchor = o.anchor ?? "middle";
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return `<rect x="${x0.toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="#FFFFFF"/>` + text(x, y, str, o);
};

// ---------- Şekil 1: görüntü tabanlı IDV hattı ----------
{
  let b = "";
  b += text(20, 22, "Belge", { anchor: "start", size: 13, weight: 700, fill: C.gok });
  b += text(20, 152, "Kişi", { anchor: "start", size: 13, weight: 700, fill: C.gok });
  // üst kol
  b += box(20, 34, 170, 72, ["Belge fotoğrafı", "(ön/arka yüz ya da", "pasaport sayfası)"], { size: 11.5 });
  b += arrow(192, 70, 216, 70);
  b += box(220, 34, 200, 72, ["Belge kontrolleri: şablon,", "güvenlik öğeleri, MRZ sağlama", "haneleri, yazı tutarlılığı"], { size: 11 });
  b += arrow(422, 70, 446, 70);
  b += box(450, 34, 150, 72, ["Okunan bilgiler", "+ belgedeki portre"], { size: 11.5 });
  // alt kol
  b += box(20, 164, 170, 72, ["Selfie ya da", "kısa video"], { size: 11.5, fill: C.gold50, stroke: C.gold });
  b += arrow(192, 200, 216, 200);
  b += box(220, 164, 200, 72, ["Canlılık tespiti:", "gerçek ve canlı bir", "yüz mü?"], { size: 11.5 });
  b += arrow(422, 200, 446, 200);
  b += box(450, 164, 150, 72, ["Canlı yüz", "görüntüsü"], { size: 11.5 });
  // birleşme
  b += arrow(602, 70, 640, 112);
  b += arrow(602, 200, 640, 158);
  b += box(644, 98, 236, 74, ["Yüz karşılaştırma: portre ile", "canlı yüz aynı kişi mi?", "→ benzerlik puanı"], { size: 11.5, fill: C.paper, stroke: C.ink, weight: 600 });
  b += arrow(762, 174, 762, 204);
  b += box(644, 208, 236, 62, ["Risk sinyalleri: cihaz, ağ,", "tekrar eden yüz ya da belge"], { size: 11 });
  b += arrow(762, 272, 762, 296);
  b += box(644, 300, 236, 50, ["Karar: kabul · ret · insan incelemesi"], { size: 11.5, weight: 600, fill: C.gok, color: "#FFFFFF" });
  b += line(20, 276, 610, 276, { stroke: C.rule, dash: true });
  b += text(20, 300, ["Her adım bir görüntüyü yorumlar;", "hiçbiri belgeyi verenin imzasını kontrol etmez."], { anchor: "start", size: 12, italic: true, fill: C.red });
  save(1, svg(900, 365, b));
}

// ---------- Şekil 2: görüntünün yolu ve saldırı noktaları ----------
{
  let b = "";
  const X = [20, 200, 380, 560, 740];
  const W = 150;
  const labels = [
    ["Kameranın önü:", "yüz ve belge"],
    ["Kamera", "(donanım)"],
    ["Telefondaki", "uygulama ve", "işletim sistemi"],
    ["Ağ"],
    ["Doğrulama", "sunucusu"],
  ];
  const Y = 150;
  labels.forEach((l, i) => {
    b += box(X[i], Y, W, 76, l, { size: 12, fill: i === 0 ? C.gold50 : C.gok50, stroke: i === 0 ? C.gold : C.gok, weight: 600 });
    if (i < 4) b += arrow(X[i] + W + 2, Y + 38, X[i + 1] - 2, Y + 38);
  });
  // savunmalar (üstte, yeşil)
  b += `<rect x="20" y="70" width="330" height="54" rx="6" fill="#EAF4EE" stroke="${C.green}" stroke-width="1.3"/>`;
  b += text(185, 97, ["Canlılık tespiti (PAD)", "ISO/IEC 30107"], { size: 11.5, weight: 600, fill: C.green });
  b += `<rect x="380" y="70" width="330" height="54" rx="6" fill="#EAF4EE" stroke="${C.green}" stroke-width="1.3"/>`;
  b += text(545, 97, ["Enjeksiyon saldırısı tespiti (CEN/TS 18099),", "cihaz ve uygulama bütünlüğü"], { size: 11.5, weight: 600, fill: C.green });
  b += arrow(185, 126, 185, 146, { kind: "m" });
  b += arrow(545, 126, 545, 146, { kind: "m" });
  // belge saldırıları (en üstte)
  b += box(20, 12, 690, 44, ["Belge saldırıları: sahte belge görüntüsü · harmanlanmış (morph) portre · çalıntı gerçek belge"], {
    size: 11.5, fill: C.red50, stroke: C.red, color: C.red, weight: 600,
  });
  // saldırılar (altta, kırmızı)
  b += `<path d="M20,246 h150" stroke="${C.red}" stroke-width="2"/>`;
  b += text(20, 272, ["Sunum saldırısı (Tip 1):", "basılı fotoğraf, ekrandan", "video, maske, makyaj"], { anchor: "start", size: 11.5, fill: C.red });
  b += `<path d="M380,246 v8 h330 v-8" fill="none" stroke="${C.red}" stroke-width="2"/>`;
  b += text(545, 280, ["Enjeksiyon saldırısı (Tip 2): sanal kamera, emülatör,", "değiştirilmiş uygulama, akışın yolda değiştirilmesi"], { size: 11.5, fill: C.red });
  b += text(545, 322, "Görüntü hiçbir fiziksel ortamdan geçmez.", { size: 11.5, weight: 600, italic: true, fill: C.red });
  b += text(185, 322, "Taklit gerçek kameranın önünden geçer.", { size: 11.5, italic: true, fill: C.muted });
  save(2, svg(910, 340, b));
}

// ---------- Şekil 3: APCER / BPCER ödünleşimi ----------
{
  let b = "";
  const x0 = 60, x1 = 840, base = 250;
  const gauss = (mu, sd, h) => (x) => h * Math.exp(-((x - mu) ** 2) / (2 * sd * sd));
  const fa = gauss(330, 85, 170);
  const fb = gauss(560, 85, 170);
  const path = (f, from, to) => {
    let d = `M${from},${base}`;
    for (let x = from; x <= to; x += 4) d += ` L${x},${(base - f(x)).toFixed(1)}`;
    return d + ` L${to},${base} z`;
  };
  const curve = (f) => {
    let d = "";
    for (let x = x0; x <= x1; x += 4) d += `${d ? " L" : "M"}${x},${(base - f(x)).toFixed(1)}`;
    return d;
  };
  const T = 470;
  b += `<defs><pattern id="hr" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="${C.red}" stroke-width="2"/></pattern>
<pattern id="hb" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="7" stroke="${C.gok}" stroke-width="2"/></pattern></defs>`;
  b += `<path d="${path(fa, x0, x1)}" fill="${C.red50}"/>`;
  b += `<path d="${path(fb, x0, x1)}" fill="${C.gok50}" fill-opacity="0.85"/>`;
  b += `<path d="${path(fa, T, x1)}" fill="url(#hr)"/>`;
  b += `<path d="${path(fb, x0, T)}" fill="url(#hb)"/>`;
  b += `<path d="${curve(fa)}" fill="none" stroke="${C.red}" stroke-width="2"/>`;
  b += `<path d="${curve(fb)}" fill="none" stroke="${C.gok}" stroke-width="2"/>`;
  b += line(x0, base, x1, base, { stroke: C.ink, sw: 1.4 });
  b += line(T, 40, T, base + 6, { stroke: C.ink, sw: 1.6, dash: true });
  b += text(T, 30, "eşik", { size: 12.5, weight: 700 });
  b += text(330, 62, "Saldırı sunumları", { size: 13, weight: 700, fill: C.red });
  b += text(600, 62, "Gerçek kullanıcılar", { size: 13, weight: 700, fill: C.gok });
  b += text(x0, base + 18, "saldırı gibi", { anchor: "start", size: 11, fill: C.muted });
  b += text(x1, base + 18, "gerçek gibi", { anchor: "end", size: 11, fill: C.muted });
  b += text((x0 + x1) / 2 + 150, base + 18, "canlılık puanı →", { size: 11, fill: C.muted });
  b += arrow(330, base + 46, 440, base - 10, { kind: "", sw: 1.3 });
  b += text(320, base + 52, ["BPCER: reddedilen", "gerçek kişiler"], { anchor: "end", size: 11.5, weight: 600, fill: C.gok700 });
  b += arrow(610, base + 46, 505, base - 8, { kind: "r", sw: 1.3 });
  b += text(620, base + 52, ["APCER: kaçırılan", "saldırılar"], { anchor: "start", size: 11.5, weight: 600, fill: C.red });
  b += box(60, 330, 370, 40, ["Eşiği sağa kaydır: APCER azalır, BPCER artar"], { size: 11.5, fill: C.paper, stroke: C.ink });
  b += box(470, 330, 370, 40, ["Eşiği sola kaydır: APCER artar, BPCER azalır"], { size: 11.5, fill: C.paper, stroke: C.ink });
  save(3, svg(900, 385, b));
}

// ---------- Şekil 4: pasif doğrulama zinciri ----------
{
  let b = "";
  b += box(40, 14, 330, 66, ["Ülke imzalama sertifika otoritesi (CSCA)", "devletin kök anahtarı"], { size: 12, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += text(390, 36, ["Sertifikası ICAO PKD ve ikili yollarla paylaşılır.", "Doğrulayan bu anahtarı önceden bilmelidir."], { anchor: "start", size: 11, italic: true, fill: C.muted });
  b += arrow(205, 82, 205, 110);
  b += text(215, 96, "imzalar", { anchor: "start", size: 11, fill: C.gok700 });
  b += box(70, 114, 270, 50, ["Belge imzalayıcı (DS) sertifikası"], { size: 12, weight: 600 });
  b += arrow(205, 166, 205, 196);
  b += text(215, 181, "imzalar", { anchor: "start", size: 11, fill: C.gok700 });
  // çip çerçevesi
  b += `<rect x="20" y="200" width="860" height="236" rx="14" fill="#FFFFFF" stroke="${C.gok700}" stroke-width="2" stroke-dasharray="2 0"/>`;
  b += text(36, 220, "Belgenin çipi", { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
  b += `<rect x="40" y="234" width="340" height="186" rx="8" fill="${C.gok50}" stroke="${C.gok}" stroke-width="1.6"/>`;
  b += text(210, 254, "EF.SOD — belge güvenlik nesnesi", { size: 12.5, weight: 700, fill: C.gok700 });
  const rows = ["DG1 özeti: 3a7f…", "DG2 özeti: c91e…", "DG14 özeti: 07bd…", "DG15 özeti: 5e22…"];
  rows.forEach((r, i) => {
    b += `<rect x="60" y="${270 + i * 30}" width="300" height="24" rx="4" fill="#FFFFFF" stroke="${C.rule}"/>`;
    b += text(74, 282 + i * 30, r, { anchor: "start", size: 11.5, fill: C.ink });
  });
  b += lock(345, 400, C.red, 0.9);
  b += text(330, 404, "DS imzası", { anchor: "end", size: 10.5, fill: C.red });
  const dgs = [["DG1", "MRZ bilgileri"], ["DG2", "yüz görüntüsü"], ["DG14", "çip doğrulama anahtarı"], ["DG15", "aktif doğrulama anahtarı"]];
  dgs.forEach(([a, c], i) => {
    const y = 262 + i * 40;
    b += box(600, y, 260, 32, [`${a} · ${c}`], { size: 11.5, fill: C.paper, stroke: C.ink });
    b += arrow(598, y + 16, 364, 282 + i * 30, { kind: "m", dash: true, sw: 1.2 });
  });
  b += text(490, 250, "özet yeniden hesaplanır, karşılaştırılır", { size: 10.5, fill: C.muted });
  b += text(20, 458, "Tek bir bayt değişirse özet tutmaz; imza geçersiz olur.", { anchor: "start", size: 12, weight: 600, fill: C.green });
  b += text(20, 480, "Pasif doğrulama verinin gerçek olduğunu kanıtlar; çipin kopyalanmadığını kanıtlamaz (bkz. çip ve aktif doğrulama).", { anchor: "start", size: 11.5, italic: true, fill: C.red });
  save(4, svg(900, 495, b));
}

// ---------- Şekil 5: telefonla çip okuma sıra diyagramı ----------
{
  let b = "";
  const A = 130, Cp = 430, S = 730;
  b += box(A - 110, 16, 220, 48, ["Telefondaki uygulama"], { size: 12.5, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += box(Cp - 110, 16, 220, 48, ["Belgenin çipi"], { size: 12.5, weight: 600 });
  b += box(S - 140, 16, 280, 48, ["Doğrulama sunucusu", "(güvenen taraf)"], { size: 12, weight: 600 });
  [A, Cp, S].forEach((x) => (b += line(x, 64, x, 560, { stroke: C.rule, sw: 1.4, dash: true })));
  const msg = (y, x1, x2, label, both = false) => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { both });
    s += lab((x1 + x2) / 2, y - 12, label, { size: 11.5 });
    return s;
  };
  const self = (y, x, lines, o = {}) => box(Math.max(10, x - 150), y, 300, 22 + lines.length * 15, lines, { size: 11, fill: C.paper, stroke: C.ink, ...o });
  b += self(80, A, ["1. MRZ'yi kamerayla okur ya da", "kullanıcı kart erişim numarasını (CAN) girer"]);
  b += msg(160, A, Cp, "2. PACE (eski belgelerde BAC): şifreli oturum", true);
  b += msg(195, A, Cp, "3. DG1, DG2, DG14/DG15 ve EF.SOD okunur");
  b += msg(240, A, Cp, "4. Çip ya da aktif doğrulama (sınama ve cevap)", true);
  b += msg(300, A, S, "5. Veri grupları, EF.SOD ve çipin cevabı sunucuya gönderilir");
  b += self(326, S, ["6. Pasif doğrulama: özetler, DS imzası,", "CSCA zinciri, iptal listesi"], { fill: "#EAF4EE", stroke: C.green });
  b += self(400, S, ["7. DG2'deki imzalı portre ile canlılık", "kontrolünden geçmiş selfie karşılaştırılır"], { fill: C.gold50, stroke: C.gold });
  b += text(Cp - 10, 268, "çip kopya değil", { size: 11, weight: 600, fill: C.green, anchor: "end" });
  b += lab(S, 482, "belge gerçek ve değişmemiş (6)", { size: 11.5, weight: 600, fill: C.green });
  b += lab(S, 504, "kişi belgenin sahibi mi? hâlâ görüntüye dayanır (7)", { size: 11.5, weight: 600, fill: "#8A6A1E" });
  b += lab(A + 20, 530, ["Telefon saldırganın denetiminde olabilir:", "imzalı veri sunucuda doğrulanır."], { size: 11, italic: true, fill: C.muted });
  save(5, svg(900, 570, b));
}

// ---------- Şekil 6: üç kanıt düzeyi ----------
{
  let b = "";
  const cols = [
    { x: 20, t: "Görüntü", s: "belge fotoğrafı + selfie" },
    { x: 315, t: "Çipten okunan belge", s: "NFC + pasif/çip doğrulama + selfie" },
    { x: 610, t: "Cüzdandaki imzalı kimlik (PID)", s: "verenin imzası + cihaz anahtarı" },
  ];
  b += `<path d="M30,28 H860" stroke="${C.gold}" stroke-width="3" marker-end="url(#arg)"/>`;
  b += text(445, 16, "güvence artar", { size: 11, italic: true, fill: C.muted });
  const rows = [
    ["Belge gerçek mi?", ["görüntü yorumu", "(tahmin)"], ["devletin imzası", "(kanıt)"], ["verenin imzası", "(kanıt)"]],
    ["Kişi belgenin sahibi mi?", ["yüz karşılaştırma +", "canlılık (tahmin)"], ["imzalı portreyle yüz", "karşılaştırma + canlılık (tahmin)"], ["cihazdaki anahtarla imza", "+ telefonun yerel kilidi (kanıt)"]],
  ];
  cols.forEach((c, i) => {
    const hdrFill = [C.red50, C.gold50, "#EAF4EE"][i];
    const hdrStroke = [C.red, C.gold, C.green][i];
    b += box(c.x, 44, 270, 54, [c.t, c.s], { size: 12, fill: hdrFill, stroke: hdrStroke, weight: 600 });
    rows.forEach((r, j) => {
      const y = 112 + j * 92;
      b += text(c.x + 4, y + 8, r[0], { anchor: "start", size: 11, weight: 600, fill: C.muted });
      const tahmin = r[i + 1][r[i + 1].length - 1].includes("tahmin");
      b += box(c.x, y + 18, 270, 58, r[i + 1], { size: 11.5, fill: "#FFFFFF", stroke: tahmin ? C.red : C.green });
    });
  });
  const notes = [
    ["deepfake ve enjeksiyona açık", C.red],
    ["kişi tarafı her doğrulamada yeniden", "#8A6A1E"],
    ["biyometri yalnız ilk verilişte ve telefonun içinde", C.green],
  ];
  notes.forEach(([n, col], i) => (b += text(cols[i].x + 135, 310, n, { size: 11, weight: 600, italic: true, fill: col })));
  b += box(20, 330, 860, 40, ["Görüntü tahmini, her doğrulamada yapılan bir iş olmaktan çıkıp belgenin ilk verildiği ana çekilir."], {
    size: 12, weight: 600, fill: C.gok, color: "#FFFFFF",
  });
  save(6, svg(900, 385, b));
}

console.log("A14 şekilleri yazıldı:", out);

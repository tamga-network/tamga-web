// A1 — Dijital Kimliğin Evrimi: şekiller 1–8. Çalıştır: node publications/figures/a1.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock, db } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a1");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const halo = (s) => s.replace(/<text /g, '<text stroke="#FFFFFF" stroke-width="5" paint-order="stroke" stroke-linejoin="round" ');

// ---------- Şekil 1: zaman çizelgesi ----------
{
  const X = (y) => 60 + (y - 1960) * (800 / 70);
  let b = "";
  const bands = [
    [1961, "Ada (silo) dönemi", C.gok100, true],
    [1999, "Federasyon", "#C9DCE6", false],
    [2016, "Kendi kendine egemen kimlik", "#E9DDBA", false],
    [2024, "Devlet destekli kimlik cüzdanları", "#E7C98A", false],
  ];
  bands.forEach(([start, label, fill, inside], i) => {
    const y = 34 + i * 36;
    const x = X(start);
    b += `<rect x="${x}" y="${y}" width="${X(2030) - x - 6}" height="24" rx="4" fill="${fill}"/>`;
    b += `<path d="M${X(2030) - 6},${y} l12,12 l-12,12 z" fill="${fill}"/>`;
    b += inside
      ? text(x + 10, y + 12, label, { anchor: "start", size: 12.5, weight: 600, fill: C.gok700 })
      : text(x - 8, y + 12, label, { anchor: "end", size: 12.5, weight: 600, fill: C.gok700 });
  });
  // eksen
  const ay = 200;
  b += line(55, ay, 875, ay, { stroke: C.ink, sw: 1.4 });
  for (let y = 1960; y <= 2030; y += 10) {
    b += line(X(y), ay - 5, X(y), ay + 5, { stroke: C.ink, sw: 1.2 });
    b += text(X(y), ay - 16, String(y), { size: 11, fill: C.muted });
  }
  const ev = [
    [1962, "CTSS'de bilinen ilk parola hırsızlığı", 0],
    [1979, "Parola özetleme (Morris ve Thompson)", 0],
    [1993, "“İnternette kimse senin köpek olduğunu bilmez”", 0],
    [1999, "Microsoft Passport", 0],
    [2005, "SAML 2.0 · OpenID · Kimliğin Yedi Yasası", 0],
    [2008, "e-Devlet Kapısı", 1],
    [2012, "OAuth 2.0", 0],
    [2014, "OpenID Connect · eIDAS", 1],
    [2016, "Kendi kendine egemen kimlik manifestosu", 2],
    [2019, "WebAuthn (geçiş anahtarları)", 0],
    [2022, "W3C DID 1.0", 1],
    [2024, "eIDAS 2.0", 2],
    [2025, "W3C VC 2.0", 0],
    [2026, "AB'de cüzdan sunma son tarihi", 1],
  ];
  ev.forEach(([y, label, row], i) => {
    const cy = 228 + row * 25;
    b += line(X(y), ay, X(y), cy - 9, { stroke: C.gok, sw: 1 });
    b += circle(X(y), ay, 3.2, { fill: C.gok });
    b += circle(X(y), cy, 9, { fill: C.gok });
    b += text(X(y), cy + 0.5, String(i + 1), { size: 10, weight: 600, fill: "#FFFFFF" });
    const col = i < 7 ? 0 : 1;
    const ly = 318 + (i % 7) * 19;
    const lx = col === 0 ? 60 : 470;
    b += circle(lx + 8, ly, 8, { fill: C.gok });
    b += text(lx + 8, ly + 0.5, String(i + 1), { size: 9.5, weight: 600, fill: "#FFFFFF" });
    b += text(lx + 24, ly, `${y} — ${label}`, { anchor: "start", size: 12, fill: C.ink });
  });
  b += text(875, 460, "Dönemler birbirinin yerini almaz, üst üste biner.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(1, svg(900, 475, b));
}

// ---------- Şekil 2: üç rol ----------
{
  let b = "";
  b += box(30, 30, 230, 70, ["Veren", "Bakü'deki üniversite"], { size: 14 });
  b += box(380, 30, 230, 70, ["Doğrulayan", "İstanbul'daki üniversite"], { size: 14 });
  b += box(205, 285, 230, 70, ["Sahip", "Aynur"], { size: 14, fill: C.gold50, stroke: C.gold });
  b += arrow(150, 102, 272, 282);
  b += text(198, 200, ["belgeyi düzenler", "ve verir"], { anchor: "end", size: 12.5, fill: C.gok700 });
  b += arrow(368, 282, 490, 104);
  b += text(442, 200, ["belgeyi", "gösterir"], { anchor: "start", size: 12.5, fill: C.gok700 });
  b += arrow(377, 65, 264, 65, { kind: "m", dash: true });
  b += text(320, 50, "?", { size: 20, weight: 700, fill: C.red });
  b += text(320, 132, ["Doğrulayan, verene", "sormak zorunda mı?"], { size: 12.5, italic: true, fill: C.muted });
  save(2, svg(640, 380, b));
}

// ---------- Şekil 3: parolanın tuzlanıp özetlenmesi ----------
{
  let b = "";
  const row = (y, title, items) => {
    let s = text(20, y - 22, title, { anchor: "start", size: 13, weight: 600, fill: C.gok });
    const [p, t, f, o, d] = items;
    s += box(20, y, 140, 56, p, { size: 12.5 });
    s += text(175, y + 28, "+", { size: 20, weight: 600, fill: C.muted });
    s += box(190, y, 130, 56, t, { size: 12.5, fill: C.gold50, stroke: C.gold });
    s += arrow(322, y + 28, 346, y + 28);
    s += box(350, y, 160, 56, f, { size: 12.5 });
    s += arrow(512, y + 28, 536, y + 28);
    s += box(540, y, 110, 56, o, { size: 12.5 });
    s += arrow(652, y + 28, 676, y + 28);
    s += box(680, y, 200, 56, d, { size: 12.5, fill: C.paper, stroke: C.ink });
    return s;
  };
  b += row(62, "Kayıt sırasında", [
    ["Aynur'un", "parolası"],
    ["Rastgele tuz", "7f3a…"],
    ["Yavaş özet fonksiyonu", "(ör. Argon2)"],
    ["Özet", "c41b…"],
    ["Veritabanı:", "kullanıcı adı · tuz · özet"],
  ]);
  b += text(880, 22, "Parolanın kendisi hiçbir yerde saklanmaz.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  b += row(212, "Giriş sırasında", [
    ["Yazılan", "parola"],
    ["Kayıttaki", "tuz"],
    ["Aynı özet", "fonksiyonu"],
    ["Yeni özet", ""],
    ["Kayıttaki özetle", "karşılaştır"],
  ]);
  b += arrow(780, 120, 780, 208, { kind: "m", dash: true });
  b += text(772, 164, "kayıttaki tuz ve özet", { anchor: "end", size: 11, fill: C.muted });
  b += text(780, 290, "Aynıysa giriş başarılı", { size: 12.5, weight: 600, fill: C.green });
  save(3, svg(900, 310, b));
}

// ---------- Şekil 4: ada modeli ----------
{
  let b = "";
  const isl = (x, y, title) => {
    let s = `<rect x="${x}" y="${y}" width="170" height="96" rx="10" fill="${C.gok50}" stroke="${C.gok}" stroke-width="1.4"/>`;
    s += text(x + 85, y + 20, title, { size: 13, weight: 600 });
    s += db(x + 85, y + 50, C.gok, 0.9);
    s += text(x + 85, y + 80, "ad · parola · adres · telefon", { size: 10.5, fill: C.muted });
    return s;
  };
  b += isl(60, 24, "E-posta");
  b += isl(470, 24, "Banka");
  b += isl(20, 186, "Üniversite başvurusu");
  b += isl(510, 186, "Alışveriş sitesi");
  b += isl(265, 318, "Forum");
  const P = [350, 205];
  b += person(P[0], P[1], 1.5, C.gold);
  b += text(350, 250, "Aynur", { size: 13, weight: 600 });
  const arrows = [
    [325, 182, 232, 122],
    [375, 182, 468, 122],
    [318, 212, 192, 232],
    [382, 212, 508, 232],
    [350, 262, 350, 314],
  ];
  arrows.forEach(([x1, y1, x2, y2]) => {
    b += arrow(x1, y1, x2, y2, { kind: "m", sw: 1.3 });
    b += key((x1 + x2) / 2 - 8, (y1 + y2) / 2 - 6, C.gold, 0.7);
  });
  b += text(680, 438, "Her hizmette ayrı parola, ayrı kayıt; adalar arasında hiçbir bağ yok.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(4, svg(700, 452, b));
}

// ---------- Şekil 5: OpenID Connect sıra diyagramı ----------
{
  let b = "";
  const A = 140, S = 440, G = 720;
  b += box(A - 110, 20, 220, 50, ["Aynur (tarayıcı)"], { size: 13, fill: C.gold50, stroke: C.gold });
  b += box(S - 110, 20, 220, 50, ["Dil kursu sitesi", "(güvenen taraf)"], { size: 12.5 });
  b += box(G - 110, 20, 220, 50, ["Google", "(kimlik sağlayıcı)"], { size: 12.5 });
  [A, S, G].forEach((x) => (b += line(x, 70, x, 590, { stroke: C.rule, sw: 1.4, dash: true })));
  const msg = (y, x1, x2, label, kind = "") => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind });
    s += halo(text((x1 + x2) / 2, y - 12, label, { size: 11.5, fill: kind === "r" ? C.red : C.ink }));
    return s;
  };
  b += msg(110, A, S, "1. “Google ile giriş yap” düğmesine tıklar");
  b += msg(165, S, A, "2. Tarayıcıyı Google'a yönlendirir");
  b += text((A + S) / 2, 182, "(site numarası, istenen bilgiler, tek kullanımlık değerler)", { size: 10.5, fill: C.muted });
  b += msg(225, A, G, "3. Google'a giriş yapar (parola ya da geçiş anahtarı)");
  b += msg(280, G, A, "4. İzin ekranı: “Site adınızı ve e-postanızı görmek istiyor” — Aynur onaylar");
  b += msg(335, G, A, "5a. Tek kullanımlık yetkilendirme koduyla geri yönlendirir");
  b += msg(380, A, S, "5b. Kodu siteye iletir");
  b += msg(435, S, G, "6. Arka kanal: kod + sitenin kendi gizli bilgisi", "r");
  b += msg(490, G, S, "7. Kimlik belirteci (imzalı JWT) + erişim belirteci");
  b += box(S - 125, 522, 250, 46, ["8. İmzayı Google'ın açık anahtarıyla", "doğrular, Aynur'u içeri alır"], { size: 11.5, fill: C.paper, stroke: C.ink });
  b += box(758, 200, 136, 72, ["Site, Aynur'un", "parolasını hiç", "görmez."], { size: 11, weight: 500, fill: C.gold50, stroke: C.gold });
  b += box(758, 420, 136, 72, ["Google, Aynur'un", "bu siteye girdiğini", "öğrenir."], { size: 11, weight: 500, fill: C.red50, stroke: C.red });
  save(5, svg(900, 600, b));
}

// ---------- Şekil 6: federasyon ve üçgen model ----------
{
  let b = "";
  b += text(225, 24, "Federasyon", { size: 15, weight: 700, fill: C.gok });
  b += text(675, 24, "Üçgen model", { size: 15, weight: 700, fill: C.gok });
  b += line(450, 10, 450, 420, { stroke: C.rule, sw: 1.2 });
  // sol
  b += person(225, 76, 1.1, C.gold);
  b += text(262, 72, "Aynur", { anchor: "start", size: 12, weight: 600 });
  b += arrow(225, 100, 225, 166);
  b += text(233, 134, "giriş", { anchor: "start", size: 11, fill: C.gok700 });
  b += box(140, 170, 170, 60, ["Kimlik sağlayıcı"], { size: 13.5, weight: 600 });
  [["Site A", 30], ["Site B", 170], ["Site C", 310]].forEach(([n, x]) => {
    b += box(x, 330, 110, 44, [n], { size: 12.5, fill: C.paper, stroke: C.ink });
  });
  b += arrow(85, 328, 182, 234, { kind: "r" });
  b += arrow(225, 328, 225, 234, { kind: "r" });
  b += arrow(365, 328, 268, 234, { kind: "r" });
  b += text(225, 400, "Her girişte sağlayıcı haberdar olur.", { size: 12, weight: 600, fill: C.red });
  // sağ
  b += box(480, 50, 170, 54, ["Veren", "(üniversite)"], { size: 12.5 });
  b += arrow(565, 106, 565, 158);
  b += text(573, 132, "bir kez verilir", { anchor: "start", size: 11, fill: C.gok700 });
  b += phone(520, 162, 90, 140, C.gold);
  b += text(565, 222, ["Aynur'un", "cüzdanı"], { size: 12, weight: 600 });
  b += box(735, 50, 150, 50, ["Güven kaynağı"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  const ver = [150, 220, 290];
  ver.forEach((y, i) => {
    b += box(735, y, 150, 44, [`Doğrulayan ${"ABC"[i]}`], { size: 12.5, fill: C.paper, stroke: C.ink });
    b += arrow(612, 232, 733, y + 22);
  });
  b += text(668, 205, "gösterilir", { size: 11, fill: C.gok700 });
  b += arrow(810, 148, 810, 102, { kind: "m", dash: true });
  b += text(818, 125, ["açık anahtar", "ve yetki"], { anchor: "start", size: 10.5, fill: C.muted });
  b += text(675, 400, "Veren, belgenin nerede gösterildiğini bilmez.", { size: 12, weight: 600, fill: C.green });
  save(6, svg(900, 420, b));
}

// ---------- Şekil 7: dijital imza ----------
{
  let b = "";
  b += text(160, 22, "Veren (imzalar)", { size: 14, weight: 700, fill: C.gok });
  b += text(680, 22, "Doğrulayan (kontrol eder)", { size: 14, weight: 700, fill: C.gok });
  b += line(440, 10, 440, 400, { stroke: C.rule, sw: 1.2 });
  const L = [
    ["Belge içeriği", C.paper, C.ink],
    ["Özet fonksiyonu", C.gok50, C.gok],
    ["Özet", C.gok50, C.gok],
    ["Gizli anahtarla imzala", C.red50, C.red],
    ["Belge + imza", C.gold50, C.gold],
  ];
  L.forEach(([t, f, s], i) => {
    const y = 45 + i * 68;
    b += box(60, y, 200, 42, [t], { size: 12.5, fill: f, stroke: s, weight: 600 });
    if (i < L.length - 1) b += arrow(160, y + 44, 160, y + 66);
  });
  b += lock(40, 270, C.red, 1);
  b += arrow(262, 338, 478, 338, { kind: "g" });
  b += text(370, 322, ["Aynur'a verilir,", "doğrulayana gösterilir"], { size: 11, fill: C.muted });
  // sağ
  b += box(585, 45, 190, 42, ["Belge + imza"], { size: 12.5, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += arrow(640, 89, 560, 120);
  b += arrow(720, 89, 790, 120);
  b += box(462, 122, 196, 42, ["Belge içeriği → özet fonksiyonu"], { size: 11.5 });
  b += box(462, 188, 196, 42, ["Yeniden hesaplanan özet"], { size: 11.5 });
  b += arrow(560, 166, 560, 186);
  b += box(690, 122, 200, 42, ["İmza + verenin açık anahtarı"], { size: 11.5, fill: "#EAF4EE", stroke: C.green });
  b += key(700, 110, C.green, 0.8);
  b += box(690, 188, 200, 42, ["İmza doğrulama işlemi"], { size: 11.5 });
  b += arrow(790, 166, 790, 186);
  b += arrow(560, 232, 650, 262);
  b += arrow(790, 232, 720, 262);
  b += box(590, 264, 180, 42, ["Eşleşiyor mu?"], { size: 13, weight: 600, fill: C.paper, stroke: C.ink });
  b += text(680, 330, "Evet → belge gerçek ve değişmemiş", { size: 12, weight: 600, fill: C.green });
  b += text(680, 352, "Hayır → reddet", { size: 12, weight: 600, fill: C.red });
  b += text(885, 392, "Açık anahtar nereden geliyor? → güven sorusu (Bölüm 6.4 ve 7.4)", { anchor: "end", size: 10.5, italic: true, fill: C.muted });
  save(7, svg(900, 405, b));
}

// ---------- Şekil 8: EUDI ekosistemi ----------
{
  let b = "";
  b += box(20, 16, 860, 42, ["Güven altyapısı — güven listeleri · güvenen taraf kayıtları · sertifikalar"], {
    size: 13, weight: 600, fill: C.gold50, stroke: C.gold,
  });
  b += arrow(135, 60, 135, 86, { kind: "g", dash: true });
  b += arrow(765, 60, 765, 86, { kind: "g", dash: true });
  b += text(145, 74, "kim yetkili?", { anchor: "start", size: 10.5, fill: C.muted });
  b += text(755, 74, "kim yetkili?", { anchor: "end", size: 10.5, fill: C.muted });
  b += text(135, 100, "Verenler", { size: 14, weight: 700, fill: C.gok });
  b += text(765, 100, "Güvenen taraflar", { size: 14, weight: 700, fill: C.gok });
  const iss = [
    ["PID sağlayıcı", "(devlet ya da yetkilendirdiği kurum)"],
    ["Nitelikli güven hizmeti", "sağlayıcısı (QEAA)"],
    ["Kamu kurumu, yetkili", "kaynak adına (PuB-EAA)"],
    ["Diğer kurumlar (EAA)"],
  ];
  iss.forEach((t, i) => {
    const y = 118 + i * 66;
    b += box(20, y, 230, 52, t, { size: 11.5 });
    b += arrow(252, y + 26, 368, 190 + i * 36);
  });
  b += text(306, 135, "belgeyi verir", { size: 10.5, fill: C.gok700 });
  b += phone(370, 118, 160, 270, C.gok);
  b += text(450, 148, "Kişinin cüzdanı", { size: 13, weight: 700 });
  [["Kimlik (PID)", C.gok, "#FFFFFF"], ["Diploma (EAA)", C.gok50, C.ink], ["Ehliyet (EAA)", C.gok50, C.ink]].forEach(([t, f, c], i) => {
    b += box(385, 172 + i * 54, 130, 42, [t], { size: 12, fill: f, stroke: C.gok, color: c, weight: 600 });
  });
  const rp = ["Kamu hizmeti", "Banka", "Üniversite", "Çevrimiçi platform"];
  rp.forEach((t, i) => {
    const y = 118 + i * 60;
    b += box(650, y, 230, 44, [t], { size: 12.5, fill: C.paper, stroke: C.ink });
    b += arrow(532, 220 + i * 30, 648, y + 22);
  });
  b += text(590, 392, ["kişinin onayıyla,", "yalnızca gereken bilgi"], { size: 10.5, fill: C.gok700 });
  b += box(350, 446, 200, 48, ["Cüzdan sağlayıcı"], { size: 13, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(450, 444, 450, 392);
  b += text(562, 458, "uygulamayı sağlar, cüzdanın güvenilir olduğunu kanıtlar", { anchor: "start", size: 10.5, fill: C.muted });
  b += text(562, 478, "kişinin cüzdanı nerede kullandığını göremez", { anchor: "start", size: 10.5, italic: true, fill: C.red });
  b += text(20, 520, "Verenlerden güvenen taraflara doğrudan bağ yoktur.", { anchor: "start", size: 11.5, italic: true, fill: C.muted });
  save(8, svg(900, 535, b));
}

console.log("A1 şekilleri yazıldı:", out);

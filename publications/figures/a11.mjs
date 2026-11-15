// A11 — eIDAS 2.0'a Hukuk Dışından Bakış: şekiller 1–5. Çalıştır: node publications/figures/a11.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a11");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

// ---------- Şekil 1: katmanlar ----------
{
  let b = "";
  const L = [
    ["Tüzük 910/2014 (2024/1183 ile değişik)", "ilkeler · roller · yükümlülükler · son tarihler", C.gok, "#FFFFFF", "#D6E6EE"],
    ["Uygulama tüzükleri", "2024/2977–2982 · 2025/846–849 · 2025/1569 · 2026/798 · 2026/1730–1735", C.gok50, C.ink, C.muted],
    ["Standartlar", "ETSI · CEN · ISO/IEC · OpenID Vakfı · IETF", C.paper, C.ink, C.muted],
    ["Ürünler ve sistemler", "cüzdanlar · belge veren sistemler · doğrulayan sistemler", "#FFFFFF", C.ink, C.muted],
  ];
  const lab = ["yetki verir (ör. madde 5a(23))", "standarda atıf yapar", "uygulanır"];
  L.forEach(([t, d, fill, col, dcol], i) => {
    const y = 20 + i * 104;
    b += `<rect x="20" y="${y}" width="580" height="70" rx="8" fill="${fill}" stroke="${C.gok}" stroke-width="1.5"/>`;
    b += text(310, y + 24, t, { size: 14, weight: 700, fill: col });
    b += text(310, y + 48, d, { size: 11.5, fill: dcol });
    if (i < 3) {
      b += arrow(310, y + 72, 310, y + 102);
      b += text(322, y + 88, lab[i], { anchor: "start", size: 11, italic: true, fill: C.gok700 });
    }
  });
  b += `<rect x="640" y="124" width="240" height="176" rx="10" fill="${C.gold50}" stroke="${C.gold}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  b += text(760, 152, "ARF", { size: 15, weight: 700 });
  b += text(760, 176, "Mimari ve Başvuru Çerçevesi", { size: 11.5, weight: 600 });
  b += text(760, 222, ["bağlayıcı değil;", "teknik çerçeve,", "uygulama tüzüklerine", "kaynak olur"], { size: 11.5, fill: C.muted });
  b += arrow(638, 160, 602, 160, { kind: "g", dash: true });
  b += text(880, 428, "Bağlayıcı kurallar ilk iki katmandadır; standart, tüzüğün atıf yaptığı sürümüyle bağlayıcı olur.", {
    anchor: "end", size: 11, italic: true, fill: C.muted,
  });
  save(1, svg(900, 442, b));
}

// ---------- Şekil 2: roller ----------
{
  let b = "";
  b += box(220, 14, 460, 40, ["Avrupa Komisyonu · Avrupa Dijital Kimlik İşbirliği Grubu"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += box(160, 78, 580, 56, ["Üye devlet", "cüzdanı sağlar ya da tanır · güvenen tarafları kaydeder · bildirir · denetler"], { size: 12, weight: 600, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
  b += arrow(450, 56, 450, 76, { kind: "m" });
  // verenler
  const iss = [["PID sağlayıcı"], ["Nitelikli güven hizmeti", "sağlayıcısı (QEAA)"], ["Kamu kurumu, yetkili", "kaynak adına (PuB-EAA)"], ["Diğer sağlayıcılar (EAA)"]];
  b += text(115, 168, "Verenler", { size: 13, weight: 700, fill: C.gok });
  iss.forEach((t, i) => {
    const y = 182 + i * 62;
    b += box(20, y, 190, 50, t, { size: 11.5 });
    b += arrow(212, y + 25, 368, 290 + (i - 1.5) * 22);
  });
  b += text(292, 214, "verir", { size: 11, fill: C.gok700 });
  // cüzdan
  b += person(450, 190, 1.1, C.gold);
  b += text(450, 226, "Kullanıcı", { size: 12, weight: 600 });
  b += phone(395, 238, 110, 130, C.gold);
  b += text(450, 300, ["Avrupa", "Dijital Kimlik", "Cüzdanı"], { size: 11.5, weight: 600 });
  // güvenen taraflar
  b += text(785, 168, "Güvenen taraflar", { size: 13, weight: 700, fill: C.gok });
  const rp = [["Kamu kurumu"], ["Banka, sigorta, sağlık…"], ["Çok büyük platform"], ["Aracı (güvenen taraf sayılır)"]];
  rp.forEach((t, i) => {
    const y = 182 + i * 62;
    b += box(690, y, 190, 50, t, { size: 11.5, fill: C.paper, stroke: C.ink });
    b += arrow(507, 290 + (i - 1.5) * 22, 688, y + 25);
  });
  b += text(600, 214, "sunar", { size: 11, fill: C.gok700 });
  b += arrow(700, 136, 704, 180, { kind: "m", dash: true });
  b += text(692, 160, "kayıt (5b)", { anchor: "end", size: 10.5, fill: C.muted });
  // alt sıra
  b += box(330, 420, 240, 48, ["Cüzdan sağlayıcı"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(450, 418, 450, 370, { kind: "g" });
  b += text(458, 396, "sağlar", { anchor: "start", size: 10.5, fill: C.muted });
  b += box(20, 440, 240, 56, ["Uygunluk değerlendirme kuruluşu", "cüzdanı sertifikalandırır (5c)"], { size: 11, fill: "#FFFFFF" });
  b += arrow(262, 460, 328, 448, { kind: "m", dash: true });
  b += box(640, 440, 240, 56, ["Denetim organları (46a, 46b)", "tek temas noktası (46c)"], { size: 11, fill: "#FFFFFF" });
  save(2, svg(900, 512, b));
}

// ---------- Şekil 3: tarih hesabı ----------
{
  let b = "";
  const top = [
    ["28 Kasım 2024", "kabul"],
    ["4 Aralık 2024", "Resmî Gazete"],
    ["+ 20 gün", ""],
    ["24 Aralık 2024", "yürürlük"],
  ];
  top.forEach(([a, c], i) => {
    const x = 20 + i * 222;
    const strong = i === 3;
    b += box(x, 24, 190, 58, c ? [a, c] : [a], { size: 12.5, weight: 600, fill: strong ? C.gok : C.gok50, stroke: C.gok, color: strong ? "#FFFFFF" : C.ink });
    if (i < 3) b += arrow(x + 192, 53, x + 220, 53);
  });
  b += arrow(781, 84, 560, 150);
  b += arrow(781, 84, 781, 150);
  b += text(650, 112, "+ 24 ay", { size: 12, weight: 700, fill: C.gok700 });
  b += text(800, 118, "+ 36 ay", { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
  b += box(330, 152, 300, 84, ["24 Aralık 2026", "her üye devlet en az bir cüzdan (5a(1))", "yetkili kaynaklardan doğrulama (45e(1))"], { size: 11.5, weight: 500, fill: C.gold50, stroke: C.gold });
  b += box(660, 152, 220, 84, ["24 Aralık 2027", "düzenlenmiş özel sektörde", "zorunlu kabul (5f(2))"], { size: 11.5, weight: 500, fill: C.gold50, stroke: C.gold });
  b += box(20, 152, 280, 84, ["Ana tüzük 2024/1183", "30 Nisan 2024 yayım", "20 Mayıs 2024 yürürlük"], { size: 11.5, fill: C.paper, stroke: C.ink });
  b += text(20, 268, "5f(1) (kamu kurumları) ve 5f(3) (çok büyük platformlar) metinde kendi tarihini yazmaz.", { anchor: "start", size: 11.5, italic: true, fill: C.muted });
  save(3, svg(900, 286, b));
}

// ---------- Şekil 4: madde 5f ----------
{
  let b = "";
  const cols = [
    { t: ["Kamu kurumları", "madde 5f(1)"], lines: ["Elektronik kimlik istedikleri", "çevrimiçi hizmette cüzdanı", "da kabul eder", "", "Tarih metinde yok"], fill: C.gok50 },
    { t: ["Düzenlenmiş özel sektör", "madde 5f(2)"], lines: ["Hukuk ya da sözleşme güçlü", "kullanıcı doğrulaması istiyorsa", "ulaşım · enerji · bankacılık", "finans · sosyal güvenlik · sağlık", "içme suyu · posta · dijital", "altyapı · eğitim · telekom", "", "24 Aralık 2027", "Mikro ve küçük işletmeler muaf"], fill: C.gold50 },
    { t: ["Çok büyük platformlar", "madde 5f(3)"], lines: ["Kullanıcı doğrulaması", "istiyorlarsa cüzdanı da kabul", "eder; yalnız gereken en az", "veriyle", "", "Tarih metinde yok"], fill: C.gok50 },
  ];
  cols.forEach((c, i) => {
    const x = 20 + i * 292;
    b += box(x, 16, 276, 54, c.t, { size: 12.5, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
    b += `<rect x="${x}" y="78" width="276" height="200" rx="8" fill="${c.fill}" stroke="${C.rule}" stroke-width="1"/>`;
    c.lines.forEach((l, j) => {
      if (!l) return;
      const em = /2027|muaf|yok/.test(l);
      b += text(x + 138, 100 + j * 20, l, { size: 11.5, weight: em ? 600 : 400, fill: /muaf|yok/.test(l) ? C.red : C.ink });
    });
  });
  b += box(20, 292, 860, 40, ["Her durumda: yalnızca kullanıcının gönüllü isteği üzerine · cüzdan kullanmak zorunlu değildir (5a(15))"], {
    size: 12, weight: 600, fill: C.paper, stroke: C.ink,
  });
  save(4, svg(900, 348, b));
}

// ---------- Şekil 5: AB dışı ----------
{
  let b = "";
  b += `<rect x="20" y="20" width="300" height="300" rx="14" fill="${C.gok50}" stroke="${C.gok}" stroke-width="1.8"/>`;
  b += text(170, 46, "AB içi", { size: 14, weight: 700, fill: C.gok700 });
  ["Cüzdanlar (5a)", "Güvenen taraf kaydı (5b)", "Kabul yükümlülüğü (5f)", "Nitelikli güven hizmetleri", "Güven listeleri"].forEach((t, i) => {
    b += box(44, 66 + i * 48, 252, 38, [t], { size: 11.5, fill: "#FFFFFF" });
  });
  b += `<rect x="580" y="20" width="300" height="300" rx="14" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.8"/>`;
  b += text(730, 46, "Üçüncü ülke", { size: 14, weight: 700 });
  ["Kendi kimlik sistemi", "Kendi cüzdanı", "Kendi güven hizmeti sağlayıcıları", "Kendi güven listesi"].forEach((t, i) => {
    b += box(604, 66 + i * 58, 252, 42, [t], { size: 11.5, fill: "#FFFFFF", stroke: C.rule });
  });
  // bağlantılar
  b += arrow(578, 210, 298, 210, { kind: "", both: true, sw: 2 });
  b += `<rect x="352" y="160" width="196" height="40" rx="6" fill="#EAF4EE" stroke="${C.green}" stroke-width="1.2"/>`;
  b += text(450, 172, "Güven hizmetleri: madde 14", { size: 11, weight: 700, fill: C.green });
  b += text(450, 188, "anlaşma ya da uygulama tüzüğü", { size: 10, fill: C.ink });
  b += line(330, 110, 570, 110, { stroke: C.red, sw: 1.8, dash: true });
  b += text(450, 96, "Cüzdanlar: tüzükte tanıma hükmü yok", { size: 11, weight: 700, fill: C.red });
  b += line(330, 270, 570, 270, { stroke: C.muted, sw: 1.6, dash: true });
  b += text(450, 256, "Aynı standartlar: teknik uyum", { size: 11, weight: 600, fill: C.muted });
  b += text(450, 288, "hukuki tanıma sağlamaz", { size: 10.5, italic: true, fill: C.muted });
  b += text(450, 232, "karşılıklılık · güven listesi", { size: 10, fill: C.muted });
  b += text(880, 346, "Madde 14'ün tarafları devletlerdir; madde 5f üçüncü ülke tanıması değildir.", { anchor: "end", size: 11, italic: true, fill: C.muted });
  save(5, svg(900, 360, b));
}

console.log("A11 şekilleri yazıldı:", out);

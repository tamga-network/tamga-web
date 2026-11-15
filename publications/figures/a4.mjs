// A4 — Sıfır Bilgi İspatları ve Kimlik: şekiller 1–8. Çalıştır: node publications/figures/a4.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a4");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
// Etiketler çizgilerin üstüne yazılmadığı için beyaz kenar (halo) kullanılmaz; PDF'te harf aralığını bozuyor.
const halo = (s) => s;

// ---------- Şekil 1: yaşı kanıtlamanın üç yolu ----------
{
  let b = "";
  const cols = [
    {
      x: 20,
      title: ["Kimlik kartının tamamı"],
      seen: ["Ad, soyad", "Doğum tarihi", "Kimlik numarası", "Uyruk", "Fotoğraf", "Kartın geçerlilik tarihi"],
      note: ["Gerekenden çok", "fazla bilgi"],
      nc: C.red, nf: C.red50,
    },
    {
      x: 315,
      title: ["Seçici açıklama"],
      seen: ["18 yaşından büyük: evet", "Veren kurumun imzası", "Cüzdan anahtarı (açık yarısı)"],
      note: ["Yalnız gereken alan; ama imza ve anahtar", "her gösterimde aynıysa siteler", "kişiyi eşleştirebilir"],
      nc: C.gold, nf: C.gold50,
    },
    {
      x: 610,
      title: ["Sıfır bilgi ispatı"],
      seen: ["18 yaşından büyük: evet", "Güvenilir bir kurumun geçerli", "belgesine dayanıyor"],
      note: ["İspat her seferinde yeni;", "iki ispat birbirine", "bağlanamaz"],
      nc: C.green, nf: "#EAF4EE",
    },
  ];
  cols.forEach((c) => {
    b += box(c.x, 18, 270, 44, c.title, { size: 14, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
    b += text(c.x + 135, 84, "Doğrulayıcının gördüğü", { size: 11.5, italic: true, fill: C.muted });
    b += `<rect x="${c.x}" y="98" width="270" height="175" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.2"/>`;
    c.seen.forEach((t, i) => {
      b += circle(c.x + 20, 124 + i * 27, 3.2, { fill: C.gok });
      b += text(c.x + 32, 124 + i * 27, t, { anchor: "start", size: 12.5 });
    });
    b += arrow(c.x + 135, 276, c.x + 135, 298, { kind: "m" });
    b += box(c.x, 302, 270, 74, c.note, { size: 12, weight: 600, fill: c.nf, stroke: c.nc, color: C.ink });
  });
  b += text(450, 402, "Sağa doğru doğrulayıcının gördüğü bilgi azalır; sonuç (“18 yaşından büyük”) aynı kalır.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(1, svg(900, 418, b));
}

// ---------- Şekil 2: Ali Baba mağarası ----------
{
  let b = "";
  const cx = 265, cy = 200, R = 135, r = 78;
  // giriş tüneli
  b += `<rect x="${cx - 26}" y="${cy + r + 20}" width="52" height="95" fill="${C.gok100}" stroke="${C.gok}" stroke-width="1.6"/>`;
  b += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.gok100}" stroke="${C.gok}" stroke-width="1.6"/>`;
  b += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF" stroke="${C.gok}" stroke-width="1.6"/>`;
  b += `<rect x="${cx - 25}" y="${cy + r - 2}" width="50" height="${R - r + 6}" fill="${C.gok100}"/>`;
  // kapı (tepe)
  b += `<rect x="${cx - 7}" y="${cy - R}" width="14" height="${R - r}" fill="${C.red}"/>`;
  b += lock(cx, cy - R - 16, C.red, 0.9);
  b += text(cx, cy - R - 38, "Gizli sözle açılan kapı", { size: 12, weight: 600, fill: C.red });
  b += text(cx - 106, cy - 4, ["A", "koridoru"], { size: 12, weight: 600, fill: C.gok700 });
  b += text(cx + 106, cy - 4, ["B", "koridoru"], { size: 12, weight: 600, fill: C.gok700 });
  b += text(cx, cy, ["Mağaranın", "kayalık içi"], { size: 10.5, italic: true, fill: C.muted });
  b += text(cx, cy + R + 30, "Giriş", { size: 11.5, weight: 600, fill: C.gok700 });
  // Aynur A'da
  b += person(cx - 108, cy + 58, 0.62, C.gold);
  // Timur girişte
  b += person(cx, cy + R + 96, 0.8, C.gok);
  b += text(cx + 22, cy + R + 104, "Timur (doğrulayıcı)", { anchor: "start", size: 11.5, weight: 600 });
  b += box(cx + 40, cy + R + 50, 104, 30, ["“B'den çık!”"], { size: 12, weight: 600, fill: "#FFFFFF", stroke: C.ink, r: 12 });
  b += text(cx - 140, cy + 70, "Aynur (ispatçı)", { anchor: "end", size: 11, weight: 600, fill: C.ink });
  // olasılık çubukları
  const X0 = 540, W = 300;
  b += text(X0, 40, "Şansla geçme olasılığı", { anchor: "start", size: 13, weight: 700, fill: C.gok });
  b += text(X0, 60, "(sözü bilmeyen biri için; çubuklar logaritmik ölçekte)", { anchor: "start", size: 10.5, fill: C.muted });
  const rows = [
    [1, "1/2"],
    [2, "1/4"],
    [5, "≈ 1/32"],
    [10, "≈ 1/1.000"],
    [20, "≈ 1/1.000.000"],
  ];
  rows.forEach(([n, p], i) => {
    const y = 96 + i * 48;
    const L = Math.max(10, W * (1 - n / 21.5));
    b += text(X0 - 10, y + 11, `${n} tur`, { anchor: "end", size: 12, weight: 600 });
    b += `<rect x="${X0}" y="${y}" width="${L}" height="22" rx="3" fill="${i < 2 ? C.red : i < 4 ? C.gold : C.green}" opacity="0.85"/>`;
    b += text(X0 + L + 8, y + 11, p, { anchor: "start", size: 12, fill: C.ink });
  });
  b += text(690, 360, ["Timur her turda yalnız Aynur'un hangi", "koridordan çıktığını görür; sözü hiç duymaz."], {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(2, svg(900, 450, b));
}

// ---------- Şekil 3: Schnorr sıra diyagramı ----------
{
  let b = "";
  const A = 150, T = 520;
  b += box(A - 120, 18, 240, 52, ["Aynur (ispatçı)", "gizli anahtarı bilir"], { size: 12.5, fill: C.gold50, stroke: C.gold });
  b += box(T - 120, 18, 240, 52, ["Timur (doğrulayıcı)", "yalnız açık anahtarı bilir"], { size: 12.5 });
  [A, T].forEach((x) => (b += line(x, 70, x, 400, { stroke: C.rule, sw: 1.4, dash: true })));
  b += text(775, 44, "Mağarada karşılığı", { size: 12.5, weight: 700, fill: C.muted });
  const msg = (y, x1, x2, label, sub, cave) => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y);
    s += halo(text((x1 + x2) / 2, y - 14, label, { size: 12, weight: 600 }));
    if (sub) s += halo(text((x1 + x2) / 2, y + 15, sub, { size: 10.5, fill: C.muted }));
    s += box(670, y - 18, 210, 36, [cave], { size: 11.5, weight: 500, fill: C.paper, stroke: C.rule });
    return s;
  };
  b += msg(120, A, T, "1. Taahhüt", "rastgele sayıdan türetilmiş bir değer", "“bir koridora gir”");
  b += msg(195, T, A, "2. Meydan okuma", "rastgele bir sayı", "“B'den çık!”");
  b += msg(270, A, T, "3. Cevap", "gizli anahtar + rastgele sayı + meydan okuma", "“istenen koridordan çık”");
  b += box(T - 150, 312, 300, 58, ["4. Kontrol: açık anahtar, taahhüt, meydan", "okuma ve cevapla eşitlik tutuyor mu?"], {
    size: 11.5, fill: C.paper, stroke: C.ink,
  });
  b += box(30, 400, 300, 40, ["Gizli anahtar hiç gönderilmez"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(400, 400, 360, 40, ["Meydan okuma taahhütten sonra gelmeli"], { size: 12, weight: 600, fill: C.red50, stroke: C.red });
  save(3, svg(900, 458, b));
}

// ---------- Şekil 4: Fiat-Shamir ----------
{
  let b = "";
  b += text(210, 24, "Etkileşimli", { size: 15, weight: 700, fill: C.gok });
  b += text(660, 24, "Etkileşimsiz (Fiat-Shamir)", { size: 15, weight: 700, fill: C.gok });
  b += line(430, 10, 430, 400, { stroke: C.rule, sw: 1.2 });
  // sol
  b += box(20, 50, 130, 46, ["Aynur"], { size: 13, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(270, 50, 130, 46, ["Timur"], { size: 13, weight: 600 });
  b += line(85, 96, 85, 300, { stroke: C.rule, sw: 1.3, dash: true });
  b += line(335, 96, 335, 300, { stroke: C.rule, sw: 1.3, dash: true });
  b += arrow(85, 140, 333, 140);
  b += halo(text(210, 126, "taahhüt", { size: 12 }));
  b += arrow(335, 200, 87, 200, { kind: "r" });
  b += halo(text(210, 186, "meydan okuma", { size: 12, fill: C.red }));
  b += text(210, 216, "(Timur'un rastgele sayısı)", { size: 10.5, fill: C.muted });
  b += arrow(85, 260, 333, 260);
  b += halo(text(210, 246, "cevap", { size: 12 }));
  b += text(210, 340, ["İki taraf aynı anda çevrimiçi olmalı;", "kayıt başkasına kanıt olmaz."], { size: 11.5, italic: true, fill: C.muted });
  // sağ
  b += `<rect x="455" y="48" width="250" height="262" rx="8" fill="${C.gold50}" stroke="${C.gold}" stroke-width="1.4"/>`;
  b += text(580, 66, "Aynur kendi başına hesaplar", { size: 11.5, weight: 600, fill: C.gok700 });
  const steps = [
    ["taahhüt + ifade +", "oturum bilgisi"],
    ["özet fonksiyonu"],
    ["meydan okuma"],
    ["cevap"],
  ];
  steps.forEach((t, i) => {
    const y = 82 + i * 56;
    b += box(480, y, 200, 40, t, { size: 11.5, fill: "#FFFFFF", stroke: C.gok });
    if (i < steps.length - 1) b += arrow(580, y + 41, 580, y + 54);
  });
  b += box(778, 140, 110, 60, ["Timur"], { size: 13, weight: 600 });
  b += arrow(709, 170, 776, 170);
  b += halo(text(742, 156, "tek mesaj", { size: 10.5, fill: C.gok700 }));
  b += text(833, 222, ["ispat =", "taahhüt + cevap"], { size: 11, fill: C.ink });
  b += text(833, 262, ["aynı özeti kendisi", "hesaplar, kontrol eder"], { size: 10.5, fill: C.muted });
  b += text(665, 340, ["Tek mesaj; herkes sonradan doğrulayabilir. İspatı bu", "oturuma bağlamak için oturum bilgisi özete katılır."], {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(4, svg(900, 380, b));
}

// ---------- Şekil 5: kontrol devresi ----------
{
  let b = "";
  b += text(140, 22, "Açık girdiler (doğrulayıcı da bilir)", { size: 12.5, weight: 700, fill: C.gok });
  const pub = ["Kurumun açık anahtarı", "Bugünün tarihi", "Eşik: 18", "Oturumun tek kullanımlık değeri"];
  pub.forEach((t, i) => {
    const y = 38 + i * 40;
    b += box(20, y, 240, 32, [t], { size: 11.5 });
    b += arrow(262, y + 16, 338, 120 + i * 14);
  });
  b += text(140, 232, "Gizli tanık (yalnız telefonda)", { size: 12.5, weight: 700, fill: C.gold });
  const sec = ["Belgenin tamamı", "Kurumun imzası", "Doğum tarihi / yaş alanı", "Cihaz anahtarının imzası"];
  sec.forEach((t, i) => {
    const y = 248 + i * 40;
    b += box(20, y, 240, 32, [t], { size: 11.5, fill: C.gold50, stroke: C.gold });
    b += arrow(262, y + 16, 338, 250 + i * 14, { kind: "g" });
    b += lock(284, y + 6, C.gold, 0.55);
  });
  b += `<rect x="340" y="60" width="300" height="350" rx="10" fill="${C.gok50}" stroke="${C.gok}" stroke-width="1.8"/>`;
  b += text(490, 84, "Kontrol devresi", { size: 14, weight: 700, fill: C.gok });
  const chk = [
    "1. Kurum imzası doğru mu?",
    "2. Yaş alanı “doğru” mu?",
    "3. Belgenin süresi dolmamış mı?",
    ["4. Cihaz anahtarı bu oturumu", "imzalamış mı?"],
    "5. Hepsi evet mi?",
  ];
  chk.forEach((t, i) => {
    b += box(360, 104 + i * 58, 260, 46, Array.isArray(t) ? t : [t], { size: 11.5, fill: "#FFFFFF", stroke: C.gok, weight: 500 });
  });
  b += arrow(642, 235, 712, 235, { sw: 2 });
  b += box(714, 210, 70, 50, ["evet", "(1)"], { size: 13, weight: 700, fill: "#EAF4EE", stroke: C.green });
  b += box(670, 300, 215, 96, ["İspat: “Bu devreyi evet", "diyecek biçimde çalıştıran", "gizli girdiler biliyorum.”"], {
    size: 11.5, fill: C.paper, stroke: C.ink,
  });
  b += arrow(749, 262, 776, 298, { kind: "m" });
  b += text(490, 440, "Gizli tanığın hiçbiri devreden dışarı çıkmaz.", { size: 11.5, italic: true, fill: C.muted });
  save(5, svg(900, 456, b));
}

// ---------- Şekil 6: iki yol ----------
{
  let b = "";
  const row = (y, title, a, aStroke, aFill, aNote, noteColor, cNote) => {
    let s = text(20, y - 16, title, { anchor: "start", size: 13.5, weight: 700, fill: C.gok });
    s += box(20, y, 250, 70, a, { size: 11.5, fill: aFill, stroke: aStroke });
    s += text(145, y + 88, aNote, { size: 10.5, italic: true, fill: aStroke });
    s += arrow(272, y + 35, 318, y + 35);
    s += box(320, y, 250, 70, c(y), { size: 11.5 });
    s += arrow(572, y + 35, 618, y + 35);
    s += box(620, y, 120, 70, ["Doğrulayıcı"], { size: 12, fill: C.paper, stroke: C.ink, weight: 600 });
    s += box(758, y + 2, 132, 66, cNote, { size: 11, weight: 600, fill: noteColor === C.green ? "#EAF4EE" : C.gold50, stroke: noteColor });
    return s;
  };
  let c;
  c = () => ["Cüzdan: kurumun imzasından", "türetilmiş ispat"];
  b += row(44, "Yol 1: imzayı değiştir (ör. BBS)", ["Kurum: yeni imza türü,", "yeni anahtar, yeni donanım"], C.red, C.red50,
    "kurumun altyapısı değişir", C.green, ["ispat küçük", "ve hızlı"]);
  c = () => ["Cüzdan: imzayı devre içinde", "doğrular ve ispat üretir"];
  b += row(204, "Yol 2: imzayı devrede doğrula (ör. Longfellow)", ["Kurum: bugünkü ECDSA imzası,", "değişiklik yok"], C.green, "#EAF4EE",
    "kurum hiçbir şey değiştirmez", C.gold, ["ispat büyük (yüzlerce", "kilobayt), telefonda", "saniyeler"]);
  b += text(450, 340, "AB'nin teknik şartnamelerinde iki yol için ayrı belgeler var: çoklu ileti imzaları ve aritmetik devreler.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(6, svg(900, 358, b));
}

// ---------- Şekil 7: mdoc üzerinde yaş ispatı ----------
{
  let b = "";
  const heads = [
    [110, "Veren kurum"],
    [345, "Kişinin telefonu"],
    [760, "Doğrulayıcı"],
  ];
  heads.forEach(([x, t]) => (b += text(x, 22, t, { size: 14, weight: 700, fill: C.gok })));
  b += text(110, 40, "(değişiklik yok)", { size: 10.5, italic: true, fill: C.muted });
  b += box(20, 56, 180, 92, ["MSO:", "alan özetleri, belge türü,", "geçerlilik, cihaz anahtarı"], { size: 11, fill: C.paper, stroke: C.ink });
  b += arrow(110, 150, 110, 176);
  b += box(20, 178, 180, 40, ["ECDSA ile imzala"], { size: 12, weight: 600, fill: C.red50, stroke: C.red });
  b += arrow(202, 198, 248, 110);
  // telefon
  b += phone(250, 52, 190, 300, C.gold);
  b += box(265, 78, 160, 58, ["mdoc + kurum imzası", "+ tuzlar"], { size: 11, fill: C.gold50, stroke: C.gold });
  b += box(265, 146, 160, 46, ["Cihaz anahtarı", "(güvenli donanım)"], { size: 11, fill: C.gold50, stroke: C.gold });
  b += key(272, 202, C.gold, 0.7);
  b += arrow(345, 194, 345, 222);
  b += box(265, 224, 160, 48, ["İspatçı devre"], { size: 12.5, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
  b += text(345, 300, ["devre içinde: kurum imzası,", "alan özeti, age_over_18 = evet,", "süre, cihaz imzası"], { size: 10, fill: C.muted });
  // ok
  b += arrow(442, 248, 648, 248, { sw: 2 });
  b += halo(text(545, 226, ["ispat (yüzlerce kilobayt)", "+ age_over_18 = evet"], { size: 11, weight: 600 }));
  // doğrulayıcı
  b += box(650, 222, 220, 52, ["İspatı doğrula"], { size: 13, weight: 700, fill: C.paper, stroke: C.ink });
  const inputs = [
    ["Kurumun açık anahtarı", "(güven listesinden)"],
    ["Kabul edilen devrenin", "özeti (yayımlanmış liste)"],
    ["Oturum değeri (nonce)"],
  ];
  inputs.forEach((t, i) => {
    const x = 650 + i * 0;
    const y = 40 + i * 50;
    b += box(x + 20, y, 200, 44, t, { size: 10.5, fill: C.gok50 });
  });
  b += arrow(760, 186, 760, 220);
  // alt şerit
  b += box(20, 368, 425, 46, ["Doğrulayıcının görmediği: doğum tarihi, ad, MSO,", "kurum imzası, tuzlar, cihaz anahtarı"], {
    size: 11.5, weight: 600, fill: C.red50, stroke: C.red,
  });
  b += box(455, 368, 425, 46, ["Doğrulayıcının gördüğü: 18 yaşından büyük; ispat", "bu oturuma ait; belge güvenilir bir kurumdan"], {
    size: 11.5, weight: 600, fill: "#EAF4EE", stroke: C.green,
  });
  save(7, svg(900, 426, b));
}

// ---------- Şekil 8: AB yaş doğrulama akışı ----------
{
  let b = "";
  b += box(560, 16, 320, 42, ["Güvenilir yaş ispatı sağlayıcıları listesi"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(760, 60, 760, 150, { kind: "g", dash: true });
  b += text(770, 100, "kim yetkili?", { anchor: "start", size: 10.5, fill: C.muted });
  b += box(20, 152, 210, 70, ["Yaş ispatı", "sağlayıcısı"], { size: 13, weight: 700 });
  b += text(96, 250, ["yaşı bir kez doğrular:", "e-kimlik, pasaport", "ya da kimlik kartı"], { anchor: "start", size: 10.5, fill: C.muted });
  b += arrow(232, 187, 328, 187);
  b += text(280, 120, ["30 tek kullanımlık", "yaş belgesi (mdoc;", "yalnız age_over_18 /", "age_over_21)"], { size: 10.5, fill: C.gok700 });
  b += phone(330, 92, 150, 210, C.gold);
  b += text(405, 180, ["Yaş doğrulama", "uygulaması", "(mini cüzdan)"], { size: 12, weight: 600 });
  b += arrow(482, 187, 668, 187, { sw: 2 });
  b += halo(text(575, 166, ["yaş ispatı: tek kullanımlık", "belge ya da sıfır bilgi ispatı"], { size: 10.5, weight: 600 }));
  b += box(670, 152, 210, 70, ["Yaş sınırlı site"], { size: 13, weight: 700, fill: C.paper, stroke: C.ink });
  // kopuk bağ
  b += `<path d="M36,224 C36,372 864,372 864,224" fill="none" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="6 4"/>`;
  b += `<g stroke="${C.red}" stroke-width="3"><line x1="438" y1="322" x2="462" y2="346"/><line x1="462" y1="322" x2="438" y2="346"/></g>`;
  b += text(450, 368, "Sağlayıcı ispatın nerede kullanıldığını öğrenmez.", { size: 12, weight: 600, fill: C.red });
  b += text(450, 396, "İlk sürümler Temmuz ve Ekim 2025; sıfır bilgi ispatı sonraki sürümlerde.", { size: 11, italic: true, fill: C.muted });
  save(8, svg(900, 412, b));
}

console.log("A4 şekilleri yazıldı:", out);

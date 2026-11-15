// A9 — Yüz Yüze Doğrulama: şekiller 1–7. Çalıştır: node publications/figures/a9.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a9");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

// ---------- sıra diyagramı yardımcıları ----------
function lifelines(parts, top, bottom, w = 170) {
  let s = "";
  parts.forEach((p) => {
    s += box(p.x - w / 2, top, w, 48, p.label, {
      size: 12,
      fill: p.gold ? C.gold50 : C.gok50,
      stroke: p.gold ? C.gold : C.gok,
      weight: 600,
    });
    s += line(p.x, top + 48, p.x, bottom, { stroke: C.rule, sw: 1.4, dash: true });
  });
  return s;
}
function msg(y, x1, x2, label, o = {}) {
  const { kind = "", dash = false, size = 11.5, color, both = false } = o;
  const lines = Array.isArray(label) ? label : [label];
  const pad = both ? 2 : 0;
  let s = arrow(x1 + (x2 > x1 ? pad : -pad), y, x2 + (x2 > x1 ? -2 : 2), y, { kind, dash, both });
  const fill = color || (kind === "r" ? C.red : kind === "g" ? "#8A6A1F" : C.ink);
  const cy = y - 9 - ((lines.length - 1) * size * 1.3) / 2;
  s += halo(text((x1 + x2) / 2, cy, lines, { size, fill }));
  return s;
}
function act(x, y, w, lines, o = {}) {
  const n = Array.isArray(lines) ? lines.length : 1;
  const h = n * 16 + 18;
  return box(x - w / 2, y - h / 2, w, h, lines, { size: 11, fill: o.fill || C.paper, stroke: o.stroke || C.ink, weight: 500 });
}
/** Sola yaslı çok satırlı kutu: ilk satır başlık. */
function card(x, y, w, h, title, lines, o = {}) {
  const { fill = C.gok50, stroke = C.gok, tsize = 12.5, size = 11, lh = 16 } = o;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
  s += text(x + 12, y + 17, title, { anchor: "start", size: tsize, weight: 700, fill: C.gok700 });
  lines.forEach((l, i) => {
    s += text(x + 12, y + 17 + (i + 1) * lh + 2, l, { anchor: "start", size, fill: C.ink });
  });
  return s;
}

// ---------- Şekil 1: mdoc'un yapısı ----------
{
  let b = "";
  b += text(145, 22, "Veren imzalı öğeler", { size: 13, weight: 700, fill: C.gok });
  const items = [
    ["digestID 0", "random: 8F3C…", "family_name = \"…\""],
    ["digestID 3", "random: 21AB…", "birth_date = \"…\""],
    ["digestID 7", "random: 8798…", "age_over_18 = true"],
  ];
  items.forEach(([t, r, v], i) => {
    const y = 40 + i * 84;
    b += card(20, y, 250, 70, t, [r, v], { fill: C.paper, stroke: C.ink });
    b += arrow(272, y + 35, 338, 111 + i * 26, { kind: "m", sw: 1.2 });
  });
  b += halo(text(302, 122, "SHA-256", { size: 10.5, fill: C.muted }));
  b += card(340, 40, 270, 246, "Mobil güvenlik nesnesi (MSO)", [
    "valueDigests:",
    "   0 → 75A1…",
    "   3 → C92E…",
    "   7 → 0B4F…",
    "   … (gönderilmeyenler de)",
    "deviceKey: telefonun açık anahtarı",
    "validityInfo: validFrom, validUntil",
    "docType: org.iso.18013.5.1.mDL",
  ], { lh: 26 });
  // imza zinciri
  b += text(765, 22, "Veren tarafı", { size: 13, weight: 700, fill: C.gok });
  b += box(660, 36, 220, 46, ["IACA kökü (veren makam)"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(770, 84, 770, 108);
  b += box(660, 110, 220, 46, ["Belge imzalayıcı sertifikası"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(700, 158, 614, 182, { kind: "g" });
  b += halo(text(700, 190, ["MSO'yu imzalar", "(COSE_Sign1)"], { size: 10.5, fill: "#8A6A1F", anchor: "start" }));
  // cihaz kanıtı
  b += box(660, 300, 220, 70, ["Cihaz imzalı kısım (deviceAuth)", "telefonun gizli anahtarıyla, oturum", "dökümü üzerine imza ya da MAC"], {
    size: 10.5, fill: C.red50, stroke: C.red, weight: 500,
  });
  b += arrow(612, 215, 700, 296, { kind: "m", dash: true, sw: 1.2 });
  b += halo(text(668, 252, ["doğrulama bu", "açık anahtarla"], { size: 10.5, fill: C.muted, anchor: "start" }));
  b += text(20, 400, "Gönderilmeyen öğelerin yalnızca özeti görünür; rastgele değer, özetten değerin tahmin edilmesini engeller.", {
    anchor: "start", size: 11.5, italic: true, fill: C.muted,
  });
  save(1, svg(900, 420, b));
}

// ---------- Şekil 2: üç evre ----------
{
  let b = "";
  const P = [
    ["1. Aygıt katılımı", "kanal: QR kod ya da NFC", ["Telefon geçici açık anahtarını", "(EDeviceKey) ve bağlantı", "bilgisini verir.", "Kısa menzil: tanışma yakında olur."]],
    ["2. Oturum kurulması", "kanal: seçilen veri yolu", ["Okuyucu kendi geçici anahtarını", "üretir; iki taraf ECDH ile ortak", "sır, HKDF ile iki oturum", "anahtarı türetir."]],
    ["3. Veri alma", "kanal: BLE, NFC ya da Wi-Fi Aware", ["Şifreli istek ve şifreli cevap;", "arada kişinin onayı.", "Cevapta veren imzası ve", "telefonun kanıtı."]],
  ];
  P.forEach(([t, ch, lines], i) => {
    const x = 20 + i * 295;
    b += `<rect x="${x}" y="30" width="270" height="170" rx="8" fill="${i === 0 ? C.gold50 : C.gok50}" stroke="${i === 0 ? C.gold : C.gok}" stroke-width="1.4"/>`;
    b += text(x + 14, 52, t, { anchor: "start", size: 14, weight: 700, fill: C.gok700 });
    b += text(x + 14, 74, ch, { anchor: "start", size: 11, italic: true, fill: C.muted });
    lines.forEach((l, k) => (b += text(x + 14, 102 + k * 20, l, { anchor: "start", size: 12, fill: C.ink })));
    if (i < 2) b += arrow(x + 272, 115, x + 293, 115);
  });
  b += box(20, 220, 860, 34, ["İnternet gerekmez; işlem boyunca veren kurumla hiçbir bağlantı kurulmaz."], {
    size: 12, weight: 600, fill: C.paper, stroke: C.rule,
  });
  save(2, svg(900, 268, b));
}

// ---------- Şekil 3: oturum anahtarları ----------
{
  let b = "";
  b += card(20, 20, 300, 74, "Telefon", ["kendi geçici gizli anahtarı: EDeviceKey", "okuyucunun açık anahtarı: EReaderKey"], { fill: C.gold50, stroke: C.gold });
  b += card(580, 20, 300, 74, "Okuyucu", ["kendi geçici gizli anahtarı: EReaderKey", "telefonun açık anahtarı: EDeviceKey"], {});
  b += box(370, 112, 160, 40, ["ECDH"], { size: 14, weight: 700, fill: C.paper, stroke: C.ink });
  b += arrow(250, 96, 380, 114);
  b += arrow(650, 96, 520, 114);
  b += arrow(450, 154, 450, 184);
  b += box(340, 186, 220, 40, ["Z_AB: iki tarafta aynı ortak sır"], { size: 11.5, weight: 600, fill: C.gok50, stroke: C.gok });
  b += card(20, 170, 280, 76, "Oturum dökümü", ["[ aygıt katılımı,", "  okuyucunun açık anahtarı, devir ]"], { fill: C.paper, stroke: C.ink, size: 11 });
  b += arrow(160, 248, 330, 280);
  b += halo(text(212, 268, "SHA-256 → tuz", { size: 11, fill: C.gok700, anchor: "start" }));
  b += arrow(450, 228, 450, 258);
  b += box(330, 260, 240, 42, ["HKDF-SHA-256"], { size: 13, weight: 700, fill: C.paper, stroke: C.ink });
  b += arrow(400, 304, 320, 334);
  b += arrow(500, 304, 580, 334);
  b += halo(text(330, 316, "info = \"SKReader\"", { size: 10.5, fill: C.muted, anchor: "end" }));
  b += halo(text(570, 316, "info = \"SKDevice\"", { size: 10.5, fill: C.muted, anchor: "start" }));
  b += box(170, 336, 260, 42, ["SKReader: okuyucu → telefon"], { size: 12, weight: 600, fill: C.gok50, stroke: C.gok });
  b += box(470, 336, 260, 42, ["SKDevice: telefon → okuyucu"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += text(450, 402, "Şifreleme AES-256-GCM; her mesajda sayaç bir artar. Tanışmadaki tek bir bayt değişse anahtarlar tutmaz.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(3, svg(900, 418, b));
}

// ---------- Şekil 4: işlemin tamamı ----------
{
  let b = "";
  const A = 90, T = 410, R = 770;
  b += lifelines(
    [
      { x: A, label: ["Aynur"], gold: true },
      { x: T, label: ["Aynur'un telefonu", "(mdoc)"] },
      { x: R, label: ["Kiralama okuyucusu", "(mdoc okuyucu)"] },
    ],
    14, 710, 180,
  );
  b += msg(96, A, T, "0. \"Ehliyetimi göster\"");
  b += act(T, 134, 220, ["Geçici anahtar çifti üretir (EDeviceKey)"]);
  b += msg(190, T, R, ["1. QR kod: mdoc:… (aygıt katılımı:", "EDeviceKey açık anahtarı, BLE UUID)"]);
  b += act(R, 240, 230, ["2. EReaderKey üretir;", "ECDH + HKDF → oturum anahtarları"]);
  b += msg(298, R, T, "3. BLE bağlantısı (işleme özgü UUID)", { both: true });
  b += msg(356, R, T, ["4. SessionEstablishment: EReaderKey açık", "anahtarı + şifreli istek + readerAuth"]);
  b += act(T, 410, 250, ["5. Anahtarları türetir, isteği çözer,", "okuyucu sertifikasını kontrol eder"]);
  b += msg(466, T, A, "6. Onay ekranı: kim, ne, ne saklanacak");
  b += msg(506, A, T, "Parmak iziyle onaylar", { kind: "g" });
  b += msg(566, T, R, ["7. SessionData: şifreli DeviceResponse", "(öğeler + MSO + cihaz kanıtı)"], { kind: "g" });
  b += act(R, 620, 236, ["8. MSO imzası, kök sertifika, özetler,", "cihaz kanıtı, geçerlilik; portre"]);
  b += msg(682, R, T, "9. Oturumu kapat (durum 20 ya da BLE \"End\")");
  b += box(20, 560, 170, 46, ["İnternet yok;", "veren kurum habersiz."], { size: 11, fill: C.paper, stroke: C.rule, weight: 500 });
  save(4, svg(900, 720, b));
}

// ---------- Şekil 5: kanallar ----------
{
  let b = "";
  b += text(170, 24, "Tanışma", { size: 15, weight: 700, fill: C.gok });
  b += text(720, 24, "Veri aktarımı", { size: 15, weight: 700, fill: C.gok });
  b += box(40, 70, 260, 60, ["QR kod", "tek yönlü · ekran ve kamera"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(40, 220, 260, 60, ["NFC", "dokunma · iki yönlü pazarlık"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(590, 46, 260, 60, ["BLE", "telefon elde kalır"], { size: 12, weight: 600 });
  b += box(590, 156, 260, 60, ["NFC", "küçük veri · telefon alanda tutulur"], { size: 12, weight: 600 });
  b += box(590, 266, 260, 60, ["Wi-Fi Aware", "isteğe bağlı · hızlı"], { size: 12, weight: 600 });
  b += arrow(302, 92, 588, 72, { sw: 3 });
  b += halo(text(445, 70, "en yaygın eşleşme", { size: 11, weight: 600, fill: C.gok700 }));
  b += arrow(302, 236, 588, 90);
  b += arrow(302, 252, 588, 190);
  b += arrow(302, 112, 588, 290, { kind: "m", sw: 1.1 });
  b += arrow(302, 268, 588, 300, { kind: "m", sw: 1.1 });
  b += arrow(302, 104, 588, 176, { kind: "r", dash: true });
  b += halo(text(420, 150, "telefona bildirilemez", { size: 11, fill: C.red }));
  b += text(450, 356, "Okuyucu hepsini konuşmak zorundadır; telefon her evrede en az birini destekler.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(5, svg(900, 372, b));
}

// ---------- Şekil 6: güvenin iki yönü ----------
{
  let b = "";
  b += text(140, 20, "Cüzdanın okuyucuya güveni", { size: 13, weight: 700, fill: C.gok });
  b += text(760, 20, "Okuyucunun verene güveni", { size: 13, weight: 700, fill: C.gok });
  // sol zincir
  b += box(30, 36, 220, 42, ["Okuyucu sertifikası otoritesi"], { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(140, 80, 140, 100);
  b += box(30, 102, 220, 42, ["Okuyucu sertifikası"], { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(140, 146, 140, 166);
  b += box(30, 168, 220, 42, ["readerAuth imzası (istekte)"], { size: 11.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += box(280, 52, 200, 58, ["Cüzdanın güvendiği", "kökler ve kayıtlar"], { size: 11.5, weight: 500, fill: C.gok50, stroke: C.gok, dash: true });
  b += arrow(370, 112, 250, 254, { kind: "m", dash: true, sw: 1.2 });
  b += arrow(140, 212, 140, 254);
  // sağ zincir
  b += box(650, 36, 220, 42, ["IACA kökü (veren makam)"], { size: 11.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(760, 80, 760, 100);
  b += box(650, 102, 220, 42, ["Belge imzalayıcı sertifikası"], { size: 11.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(760, 146, 760, 166);
  b += box(650, 168, 220, 42, ["MSO imzası (belgede)"], { size: 11.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(420, 140, 200, 58, ["VICAL ya da güven listesi", "(önceden yüklenir)"], { size: 11.5, weight: 500, fill: C.gold50, stroke: C.gold, dash: true });
  b += arrow(622, 156, 648, 70, { kind: "g", dash: true, sw: 1.2 });
  b += halo(text(608, 112, "kökleri taşır", { size: 10.5, fill: "#8A6A1F", anchor: "end" }));
  b += arrow(560, 200, 690, 254, { kind: "g", dash: true, sw: 1.2 });
  b += halo(text(588, 240, "çevrimdışı karar", { size: 10.5, fill: "#8A6A1F", anchor: "end" }));
  b += arrow(760, 212, 760, 254);
  // cihazlar
  b += box(40, 256, 220, 60, ["Aynur'un telefonu", "(mdoc)"], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold });
  b += box(650, 256, 220, 60, ["Okuyucu"], { size: 13, weight: 700 });
  b += arrow(264, 286, 646, 286, { both: true, sw: 2 });
  b += halo(text(455, 274, "şifreli oturum", { size: 12, weight: 600, fill: C.gok700 }));
  b += text(450, 356, "İki imza da oturum dökümüne bağlıdır. Okuyucu kimlik doğrulaması ISO/IEC 18013-5'te isteğe bağlıdır;", {
    size: 11.5, italic: true, fill: C.muted,
  });
  b += text(450, 376, "veren imzası, oturum şifrelemesi ve telefonun kanıtı zorunludur.", { size: 11.5, italic: true, fill: C.muted });
  save(6, svg(900, 392, b));
}

// ---------- Şekil 7: cüzdandan cüzdana ----------
{
  let b = "";
  const A = 84, AW = 300, NW = 590, N = 818;
  b += lifelines(
    [
      { x: A, label: ["Aynur"], gold: true },
      { x: AW, label: ["Aynur'un cüzdanı", "(gösteren · mdoc)"] },
      { x: NW, label: ["Nurlan'ın cüzdanı", "(doğrulayan · okuyucu)"] },
      { x: N, label: ["Nurlan"], gold: true },
    ],
    14, 660, 150,
  );
  b += msg(96, A, AW, "1. Kipi açar: \"gösteren\"");
  b += act(AW, 134, 220, ["Uyarı: yalnız güvendiğin kişilerle"], { fill: C.gold50, stroke: C.gold });
  b += msg(184, N, NW, "2. Kipi açar: \"doğrulayan\"");
  b += msg(240, AW, NW, ["3. QR: aygıt katılımı + sunum teklifi", "(ad, soyad, portre)"]);
  b += msg(292, NW, N, "4. Teklifi gösterir; Nurlan seçer");
  b += msg(356, NW, AW, ["5. BLE, şifreli istek: teklifin alt kümesi,", "saklama bayrakları false + cüzdan kanıtı"]);
  b += act(AW, 414, 240, ["6. Alt küme mi? Bayraklar false mı?", "Değilse status 10 ile keser"]);
  b += msg(470, A, AW, "7. Onaylar", { kind: "g" });
  b += msg(524, AW, NW, "8. Şifreli cevap", { kind: "g" });
  b += act(NW, 576, 200, ["9. Doğrular, gösterir;", "saklamaz, iletmez"]);
  b += box(660, 400, 230, 60, ["Doğrulayan kipi: saatte en çok 5,", "günde 20, haftada 50 istek"], {
    size: 11, fill: C.red50, stroke: C.red, weight: 500,
  });
  b += box(660, 470, 230, 60, ["Doğrulayan cüzdanın kanıtı:", "zorunlu, yöntem henüz yok"], {
    size: 11, fill: C.red50, stroke: C.red, weight: 500,
  });
  save(7, svg(900, 670, b));
}

console.log("A9 şekilleri yazıldı:", out);

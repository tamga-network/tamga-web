// A6 — Kime Güveniyoruz? Güven listeleri: şekiller 1–7. Çalıştır: node publications/figures/a6.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, phone, key, lock } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a6");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
// Arka planı beyaz kutulu etiket (çizginin üstünde okunur kalsın diye).
const label = (x, y, lines, o = {}) => {
  const arr = Array.isArray(lines) ? lines : [lines];
  const size = o.size ?? 11;
  const w = Math.max(...arr.map((l) => l.length)) * size * 0.56 + 10;
  const h = arr.length * size * 1.3 + 6;
  const anchor = o.anchor ?? "middle";
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "start" ? x - 5 : x - w + 5;
  return `<rect x="${x0.toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="#FFFFFF"/>` + text(x, y, arr, o);
};

// ---------- Şekil 1: iki soru ----------
{
  let b = "";
  b += box(20, 125, 160, 80, ["Aynur'un diploması", "(imzalı belge)"], { size: 13, fill: C.gold50, stroke: C.gold, weight: 600 });
  // üst kol
  b += box(250, 20, 330, 100, ["1. Matematik sorusu", "İmza bu anahtarla mı atılmış?", "Belge imzadan sonra değişmiş mi?"], { size: 12.5 });
  b += arrow(182, 150, 248, 80);
  b += text(415, 136, "Cevap belgenin kendisinden çıkar; herkes kendi bilgisayarında hesaplar.", { size: 10.5, italic: true, fill: C.muted });
  b += box(620, 40, 150, 60, ["İmza geçerli", "(yeşil işaret)"], { size: 12, fill: "#EAF4EE", stroke: C.green, weight: 600 });
  b += arrow(582, 70, 618, 70);
  // alt kol
  b += box(250, 190, 330, 110, ["2. Güven sorusu", "Bu anahtar kimin?", "Kurum bu belgeyi vermeye yetkili mi?", "Bugün hâlâ yetkili mi?"], { size: 12.5 });
  b += arrow(182, 180, 248, 240);
  b += box(620, 205, 150, 80, ["Güven altyapısı", "sertifika zinciri,", "güven listesi"], { size: 12, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += arrow(582, 245, 618, 245, { kind: "g" });
  b += text(695, 302, "cevap belgenin dışından gelir", { size: 10.5, italic: true, fill: C.muted });
  // birleşme
  b += box(805, 135, 80, 60, ["Kabul"], { size: 14, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
  b += arrow(772, 75, 820, 133);
  b += arrow(772, 240, 820, 197);
  b += text(885, 330, "Birinci soru tek başına yeşil ışık yakar; kabul için ikisi de gerekir.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(1, svg(900, 345, b));
}

// ---------- Şekil 2: sertifika zinciri ----------
{
  let b = "";
  b += box(20, 50, 190, 80, ["Kök sertifika", "kendini imzalar"], { size: 13, weight: 600 });
  b += box(290, 50, 190, 80, ["Ara sertifika", "kök imzalar"], { size: 13, weight: 600 });
  b += box(560, 50, 200, 80, ["Yaprak sertifika", "Bakü Devlet Üniversitesi", "diploma anahtarı"], { size: 12.5, weight: 600 });
  b += arrow(212, 90, 288, 90);
  b += text(250, 76, "imzalar", { size: 11, fill: C.gok700 });
  b += arrow(482, 90, 558, 90);
  b += text(520, 76, "imzalar", { size: 11, fill: C.gok700 });
  b += box(800, 60, 85, 60, ["Diploma"], { size: 12.5, fill: C.paper, stroke: C.ink, weight: 600 });
  b += arrow(762, 90, 798, 90);
  b += text(842, 140, ["yaprak anahtarla", "imzalı"], { size: 10.5, fill: C.muted });
  b += key(130, 40, C.gold, 0.8);
  // güven deposu
  b += box(20, 200, 300, 70, ["Doğrulayıcının güven deposu", "(önceden ve doğrudan güvendiği kökler)"], { size: 12, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += line(115, 132, 115, 198, { stroke: C.gold, sw: 2, dash: true });
  b += text(123, 166, "çapa", { anchor: "start", size: 11.5, weight: 600, fill: C.gold });
  // doğrulama yönü
  b += arrow(860, 318, 40, 318, { kind: "r" });
  b += text(450, 298, "Doğrulayıcı zinciri yukarı doğru izler: belge → yaprak → ara → kök → depoda var mı?", { size: 12, weight: 600, fill: C.red });
  save(2, svg(900, 340, b));
}

// ---------- Şekil 3: web modeli ----------
{
  let b = "";
  b += `<rect x="20" y="15" width="860" height="100" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.2"/>`;
  b += text(36, 34, "Tarayıcının kök deposu", { anchor: "start", size: 13, weight: 700, fill: C.ink });
  const cas = [0, 1, 2, 3, 4, 5].map((i) => 45 + i * 140);
  cas.forEach((x, i) => {
    const bad = i === 3;
    b += box(x, 52, 110, 46, [`CA ${i + 1}`], { size: 13, weight: 600, fill: bad ? C.red50 : C.gok50, stroke: bad ? C.red : C.gok });
  });
  b += label(cas[3] - 4, 128, "ele geçirildi", { anchor: "end", size: 11, weight: 600, fill: C.red });
  const sites = [["banka.example", 90], ["universite.example", 360], ["posta.example", 630]];
  cas.forEach((x) => sites.forEach(([, sx]) => (b += line(x + 55, 100, sx + 90, 258, { stroke: C.rule, sw: 0.9 }))));
  sites.forEach(([n, sx]) => (b += box(sx, 260, 180, 50, [n], { size: 13, fill: "#FFFFFF", stroke: C.ink, weight: 600 })));
  b += `<line x1="${cas[3] + 55}" y1="100" x2="718" y2="256" stroke="${C.red}" stroke-width="3" marker-end="url(#arr)"/>`;
  b += label(735, 175, ["sahte ama geçerli", "görünen sertifika"], { anchor: "start", size: 11.5, weight: 600, fill: C.red });
  b += label(250, 180, "her kök, her site için imza atabilir", { size: 11.5, fill: C.muted });
  b += text(880, 340, "Sistemin gücü, en zayıf otoritenin gücü kadardır.", { anchor: "end", size: 12, italic: true, fill: C.muted });
  save(3, svg(900, 355, b));
}

// ---------- Şekil 4: AB güven omurgası ----------
{
  let b = "";
  b += box(250, 12, 400, 52, ["AB Resmî Gazetesi", "LOTL'un adresi ve imzacı sertifikaları ilan edilir"], { size: 12, fill: C.gold50, stroke: C.gold, weight: 600 });
  b += arrow(450, 66, 450, 100, { kind: "g", dash: true });
  b += text(460, 84, "çapa", { anchor: "start", size: 11, weight: 600, fill: C.gold });
  b += box(320, 102, 260, 50, ["LOTL", "(Avrupa Komisyonu imzalı)"], { size: 12.5, weight: 600 });
  const nat = ["Almanya", "Fransa", "İtalya", "Estonya", "… diğer üye ve", "AEA devletleri"];
  const xs = [20, 200, 380, 560];
  xs.forEach((x, i) => {
    b += box(x, 215, 150, 46, [nat[i] + " listesi"], { size: 12, fill: C.paper, stroke: C.ink });
    b += arrow(450, 154, x + 75, 213);
  });
  b += box(740, 215, 140, 46, [nat[4], nat[5]], { size: 11, fill: C.paper, stroke: C.ink, dash: true });
  b += arrow(450, 154, 810, 213, { kind: "m", dash: true });
  b += label(215, 182, "adres + imzacı sertifika", { size: 10.5, fill: C.gok700 });
  // Estonya ayrıntısı
  b += line(635, 263, 635, 292, { stroke: C.ink, sw: 1.2 });
  b += box(470, 294, 330, 44, ["Güven hizmeti sağlayıcısı (örnek)"], { size: 12, weight: 600 });
  b += line(635, 340, 635, 356, { stroke: C.gok, sw: 1.2 });
  b += line(515, 356, 755, 356, { stroke: C.gok, sw: 1.2 });
  b += arrow(515, 356, 515, 372);
  b += arrow(755, 356, 755, 372);
  b += box(420, 374, 190, 56, ["Nitelikli sertifika verme", "(CA/QC) · durum: verildi"], { size: 11, fill: "#EAF4EE", stroke: C.green });
  b += box(660, 374, 220, 56, ["Nitelikli zaman damgası", "durum: geri çekildi"], { size: 11, fill: C.red50, stroke: C.red });
  b += text(20, 320, ["Her katman, bir üstündeki", "katmanın gösterdiği", "anahtarla doğrulanır."], { anchor: "start", size: 12, italic: true, fill: C.muted });
  b += text(880, 452, "Ayrıntıdaki kayıtlar örnektir.", { anchor: "end", size: 10.5, italic: true, fill: C.muted });
  save(4, svg(900, 465, b));
}

// ---------- Şekil 5: TS 119 612 yapısı ve 602 karşılığı ----------
{
  let b = "";
  b += text(280, 22, "TS 119 612 güven listesi (XML)", { size: 14, weight: 700, fill: C.gok });
  b += text(745, 22, "TS 119 602 güvenilen kuruluş listesi", { size: 13, weight: 700, fill: C.gok });
  b += text(745, 40, "(JSON ya da XML)", { size: 11.5, fill: C.muted });
  b += `<rect x="20" y="38" width="520" height="400" rx="8" fill="#FFFFFF" stroke="${C.ink}" stroke-width="1.4"/>`;
  b += box(40, 55, 480, 70, ["Şema bilgisi", "liste türü · sıra numarası · işletmeci · ülke", "yayım tarihi · sonraki güncelleme · diğer listelere işaretçiler"], { size: 11.5 });
  b += `<rect x="40" y="140" width="480" height="215" rx="6" fill="${C.gok50}" stroke="${C.gok}" stroke-width="1.4"/>`;
  b += text(280, 158, "Güven hizmeti sağlayıcısı (TSP): ad · adres · bilgi adresi", { size: 12, weight: 600 });
  b += `<rect x="60" y="175" width="440" height="165" rx="6" fill="#FFFFFF" stroke="${C.gok}" stroke-width="1.2"/>`;
  b += text(280, 193, "Hizmet", { size: 12, weight: 600 });
  b += text(280, 218, ["tür (URI) · ad · dijital kimlik (sertifika)", "güncel durum · durum başlangıcı"], { size: 11.5 });
  b += box(80, 260, 400, 64, ["Hizmet geçmişi", "önceki durumlar ve başlangıç tarihleri (silinmez)"], { size: 11.5, fill: C.paper, stroke: C.ink });
  b += box(40, 370, 480, 52, ["İmza (XAdES)"], { size: 12.5, weight: 600, fill: C.red50, stroke: C.red });
  // sağ
  b += `<rect x="600" y="55" width="290" height="383" rx="8" fill="#FFFFFF" stroke="${C.ink}" stroke-width="1.4"/>`;
  const R = [
    [70, "Liste ve şema bilgisi", C.gok50, C.gok, 90],
    [170, "Güvenilen kuruluş (TE)", C.gok50, C.gok, 158],
    [245, "Hizmet (profile göre durum)", "#FFFFFF", C.gok, 230],
    [370, "İmza (JAdES ya da XAdES)", C.red50, C.red, 396],
  ];
  R.forEach(([y, t, f, s, ly]) => {
    b += box(620, y, 250, 50, [t], { size: 12, weight: 600, fill: f, stroke: s });
    b += arrow(522, ly, 618, y + 25, { kind: "m", dash: true });
  });
  b += text(570, 160, "TSP → TE", { size: 10.5, weight: 600, fill: C.muted });
  b += text(455, 462, "TS 119 602, TS 119 612'nin her tür güvenilen kuruluşa genelleştirilmiş hâlidir.", { size: 12, italic: true, fill: C.muted });
  save(5, svg(900, 478, b));
}

// ---------- Şekil 6: kim kimi hangi listeyle doğrular ----------
{
  let b = "";
  b += box(20, 12, 860, 38, ["Hepsinin çapası: Komisyon'un ve üye devletlerin imzaladığı listeler"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(30, 170, 210, 80, ["Belge veren", "(PID sağlayıcı ya da", "öznitelik onayı veren)"], { size: 12, weight: 600 });
  b += box(660, 170, 210, 80, ["Güvenen taraf", "(doğrulayıcı)"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += phone(390, 90, 120, 230, C.gok);
  b += text(450, 205, ["Kişinin", "cüzdanı"], { size: 13, weight: 700 });
  // oklar
  const num = (x, y, n) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.gok}"/>` + text(x, y + 0.5, String(n), { size: 11, weight: 700, fill: "#FFFFFF" });
  b += arrow(242, 190, 386, 190);
  b += num(314, 175, 1);
  b += arrow(386, 232, 242, 232, { kind: "m" });
  b += num(314, 248, 4);
  b += arrow(514, 190, 656, 190);
  b += num(585, 175, 2);
  b += arrow(656, 232, 514, 232, { kind: "m" });
  b += num(585, 248, 3);
  // cüzdan sağlayıcı
  b += box(350, 360, 200, 46, ["Cüzdan sağlayıcı"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(450, 358, 450, 324);
  b += text(458, 341, "uygulamayı ve birim kanıtını sağlar", { anchor: "start", size: 10.5, fill: C.muted });
  // açıklama
  const L = [
    [1, "Belge veren cüzdanı doğrular", "cüzdan sağlayıcıları listesi"],
    [2, "Cüzdan güvenen tarafı doğrular", "erişim ve kayıt sertifikası sağlayıcıları listeleri"],
    [3, "Güvenen taraf belgeyi doğrular", "PID sağlayıcıları, güven listeleri, PuB-EAA listesi"],
    [4, "Cüzdan belge vereni doğrular", "belge veren listeleri ve sertifikaları"],
  ];
  L.forEach(([n, a, l], i) => {
    const y = 440 + i * 26;
    b += num(40, y, n);
    b += text(60, y, a, { anchor: "start", size: 12, weight: 600 });
    b += text(330, y, "→ " + l, { anchor: "start", size: 12, fill: C.gok700 });
  });
  save(6, svg(900, 545, b));
}

// ---------- Şekil 7: yerel listeyle karar ----------
{
  let b = "";
  const X = 300, W = 330;
  const steps = [
    ["Belge gelir: imza + sertifika zinciri", null],
    ["İmza ve zincir matematiksel olarak geçerli mi?", "REDDET"],
    ["Zincirin bağlandığı kök listede var mı?", "REDDET"],
    ["Kayıt, belgenin verildiği anda etkin miydi?", "REDDET"],
    ["Kurum bu belge türünü vermeye yetkili mi?", "REDDET"],
    ["Liste taze mi? (sonraki güncelleme geçmemiş)", "BELİRSİZ"],
  ];
  steps.forEach(([t, no], i) => {
    const y = 20 + i * 64;
    const first = i === 0;
    b += box(X, y, W, 44, [t], { size: 12, weight: first ? 600 : 500, fill: first ? C.gold50 : C.gok50, stroke: first ? C.gold : C.gok });
    b += arrow(X + W / 2, y + 46, X + W / 2, y + 62);
    if (i > 0) b += text(X + W / 2 + 8, y + 54, "evet", { anchor: "start", size: 10.5, fill: C.green });
    if (no) {
      const unk = no === "BELİRSİZ";
      b += arrow(X + W + 2, y + 22, 698, y + 22, { kind: unk ? "g" : "r" });
      b += text(X + W + 32, y + 12, "hayır", { size: 10.5, fill: C.muted });
      b += box(700, y + 2, 180, 40, unk ? ["BELİRSİZ", "şu an doğrulanamadı"] : [no], {
        size: unk ? 11 : 12.5, weight: 700, fill: unk ? C.gold50 : C.red50, stroke: unk ? C.gold : C.red, color: unk ? C.ink : C.red,
      });
    }
  });
  const ay = 20 + 6 * 64;
  b += box(X, ay, W, 44, ["KABUL"], { size: 14, weight: 700, fill: "#EAF4EE", stroke: C.green, color: C.green });
  // önceden indirme
  b += box(20, 140, 230, 110, ["Önceden ve düzenli:", "listeleri indir,", "imzalarını ve tazeliğini", "doğrula, belleğe al"], { size: 12, fill: C.gold50, stroke: C.gold, weight: 500 });
  b += arrow(252, 195, 298, 170, { kind: "g", dash: true });
  b += arrow(252, 205, 298, 234, { kind: "g", dash: true });
  b += arrow(252, 215, 298, 298, { kind: "g", dash: true });
  b += text(135, 268, "yerel kopya", { size: 11, italic: true, fill: C.gold });
  b += text(20, 446, ["Hiçbir adımda belge verene ya da", "liste işletmecisine istek gitmez."], { anchor: "start", size: 11.5, italic: true, fill: C.muted });
  save(7, svg(900, 470, b));
}

console.log("A6 şekilleri yazıldı:", out);

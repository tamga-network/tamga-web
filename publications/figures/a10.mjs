// A10 — Cüzdan Güvenliği: şekiller 1–7. Çalıştır: node publications/figures/a10.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, person, phone, key, lock } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a10");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

// ---------- Şekil 1: tehdit haritası ----------
{
  let b = "";
  // telefon
  b += phone(385, 96, 130, 250, C.gok);
  b += text(450, 130, "Cüzdan", { size: 13.5, weight: 700, fill: C.gok700 });
  b += `<rect x="403" y="150" width="94" height="70" rx="8" fill="${C.gold50}" stroke="${C.gold}" stroke-width="1.4"/>`;
  b += key(432, 175, C.gold, 1.1);
  b += text(450, 203, ["gizli", "anahtarlar"], { size: 11, weight: 600, fill: C.ink });
  b += box(403, 236, 94, 32, ["belge"], { size: 11, fill: C.gok50 });
  b += box(403, 276, 94, 32, ["belge"], { size: 11, fill: C.gok50 });
  const atk = (x, y, title, goal) => {
    let s = `<rect x="${x}" y="${y}" width="270" height="66" rx="6" fill="${C.red50}" stroke="${C.red}" stroke-width="1.4"/>`;
    s += text(x + 135, y + 22, title, { size: 12.5, weight: 600 });
    s += text(x + 135, y + 46, goal, { size: 11, fill: C.muted, italic: true });
    return s;
  };
  b += atk(20, 30, "Telefonu bulan ya da çalan kişi", "kilidi aşıp belge göstermek");
  b += atk(20, 168, "Kötü amaçlı uygulama", "anahtarı ya da belgeyi kopyalamak");
  b += atk(20, 306, "Sahte ya da değiştirilmiş cüzdan", "kurumdan belge almak, PIN çalmak");
  b += atk(610, 30, "Donanım laboratuvarı olan saldırgan", "çipten anahtarı fiziksel yolla çıkarmak");
  b += atk(610, 168, "Aşırı meraklı taraflar", "kişinin nerede ne gösterdiğini izlemek");
  b += arrow(292, 72, 383, 150, { kind: "r" });
  b += arrow(292, 201, 383, 201, { kind: "r" });
  b += arrow(292, 330, 383, 290, { kind: "r" });
  b += arrow(608, 72, 517, 150, { kind: "r" });
  b += arrow(608, 201, 517, 201, { kind: "r" });
  b += box(610, 300, 270, 92, ["Savunma katmanları", "güvenli donanım · kullanıcı doğrulama", "cihaz ve cüzdan kanıtı", "gizlilik kuralları"], {
    size: 11.5, weight: 500, fill: C.gok50, stroke: C.gok,
  });
  b += text(880, 418, "Her tehdide karşı ayrı bir savunma katmanı gerekir.", { anchor: "end", size: 11.5, italic: true, fill: C.muted });
  save(1, svg(900, 432, b));
}

// ---------- Şekil 2: üç çalışma ortamı ----------
{
  let b = "";
  b += `<rect x="20" y="20" width="580" height="360" rx="22" fill="${C.gok50}" stroke="${C.gok}" stroke-width="2"/>`;
  b += text(40, 46, "Sıradan çalışma ortamı (REE): Android ya da iOS, uygulamalar", { anchor: "start", size: 12.5, weight: 600, fill: C.gok700 });
  b += box(44, 140, 170, 56, ["Cüzdan uygulaması"], { size: 12.5, weight: 600, fill: "#FFFFFF" });
  b += box(44, 220, 170, 44, ["Başka uygulamalar"], { size: 11.5, fill: "#FFFFFF", stroke: C.rule });
  b += box(44, 280, 170, 44, ["İnternet, bildirimler"], { size: 11.5, fill: "#FFFFFF", stroke: C.rule });
  b += `<rect x="268" y="70" width="312" height="290" rx="14" fill="#FFFFFF" stroke="${C.gok}" stroke-width="1.6"/>`;
  b += text(284, 94, "Güvenilir yürütme ortamı (TEE)", { anchor: "start", size: 12.5, weight: 600, fill: C.gok700 });
  b += `<rect x="300" y="120" width="250" height="210" rx="12" fill="${C.gold50}" stroke="${C.gold}" stroke-width="2"/>`;
  b += text(425, 146, ["Güvenli eleman ya da", "Secure Enclave, StrongBox"], { size: 12, weight: 600 });
  b += key(395, 222, C.gold, 1.4);
  b += text(425, 252, "gizli anahtar", { size: 12.5, weight: 700 });
  b += text(425, 284, ["anahtar burada üretilir", "ve buradan çıkmaz"], { size: 11, fill: C.muted, italic: true });
  b += arrow(216, 158, 298, 158);
  b += text(257, 146, "şunu imzala", { size: 10.5, fill: C.gok700 });
  b += arrow(298, 182, 216, 182, { kind: "g" });
  b += text(257, 196, "imza", { size: 10.5, weight: 600, fill: C.gold });
  // açıklama sütunu
  const leg = (y, fill, stroke, t, d) => {
    let s = `<rect x="630" y="${y}" width="22" height="22" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
    s += text(664, y + 6, t, { anchor: "start", size: 12, weight: 600 });
    s += text(664, y + 26, d, { anchor: "start", size: 10.5, fill: C.muted });
    return s;
  };
  b += leg(40, C.gok50, C.gok, "Sıradan ortam", ["kalabalık; en çok saldırıya", "uğrayan yer"]);
  b += leg(130, "#FFFFFF", C.gok, "TEE", ["işlemcide donanımla ayrılmış,", "kendi küçük işletim sistemi"]);
  b += leg(220, C.gold50, C.gold, "Güvenli eleman", ["ayrı çip; fiziksel saldırılara", "karşı dayanıklı"]);
  b += box(630, 300, 250, 80, ["Saldırgan sıradan ortamı ele", "geçirse bile anahtarı kopyalayamaz;", "en fazla imza istemeyi dener."], {
    size: 11, weight: 500, fill: C.red50, stroke: C.red,
  });
  save(2, svg(900, 400, b));
}

// ---------- Şekil 3: dört WSCD mimarisi ----------
{
  let b = "";
  const cols = [
    { t: ["Uzak WSCD"], kind: "remote", lines: ["Anahtar sağlayıcının", "veri merkezindeki HSM'de", "", "Telefon ağ üzerinden", "imza ister", "", "İnternet gerekir"] },
    { t: ["Yerel harici WSCD"], kind: "card", lines: ["Anahtar kişiye verilen", "akıllı kartta", "", "Telefona NFC ya da", "kısa mesafeli bağlantıyla", "bağlanır", "Kartı taşımak gerekir"] },
    { t: ["Yerel dahili WSCD"], kind: "sim", lines: ["Anahtar telefonun içindeki", "SIM, e-SIM ya da gömülü", "güvenli elemanda", "", "WSCA uzaktan yüklenen", "küçük bir uygulama", "Operatör iş birliği gerekir"] },
    { t: ["Yerel yerleşik WSCD"], kind: "native", lines: ["Anahtar telefona gömülü", "güvenli donanımda", "", "İşletim sisteminin arayüzü", "WSCA rolünü üstlenir", "", "Sertifikasyon gerekir"] },
  ];
  cols.forEach((c, i) => {
    const x = 16 + i * 220;
    b += box(x, 16, 206, 40, c.t, { size: 13, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
    b += `<rect x="${x}" y="66" width="206" height="150" rx="8" fill="${C.paper}" stroke="${C.rule}" stroke-width="1"/>`;
    b += phone(x + 22, 82, 62, 120, C.gok);
    if (c.kind === "remote") {
      b += box(x + 120, 104, 72, 70, ["HSM"], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold });
      b += key(x + 142, 154, C.gold, 0.8);
      b += arrow(x + 86, 140, x + 118, 140, { dash: true, both: true });
      b += text(x + 102, 126, "ağ", { size: 10.5, fill: C.muted });
    } else if (c.kind === "card") {
      b += box(x + 118, 116, 76, 48, ["akıllı", "kart"], { size: 11.5, weight: 600, fill: C.gold50, stroke: C.gold });
      b += arrow(x + 86, 140, x + 116, 140, { kind: "g", both: true });
      b += text(x + 101, 126, "NFC", { size: 10, fill: C.muted });
    } else if (c.kind === "sim") {
      b += box(x + 32, 150, 42, 30, ["SIM"], { size: 10.5, weight: 700, fill: C.gold50, stroke: C.gold });
      b += text(x + 145, 140, ["SIM, e-SIM,", "gömülü", "güvenli", "eleman"], { size: 11, fill: C.muted });
    } else {
      b += box(x + 32, 150, 42, 30, ["çip"], { size: 10.5, weight: 700, fill: C.gold50, stroke: C.gold });
      b += box(x + 32, 112, 42, 26, ["OS"], { size: 10, fill: C.gok50 });
      b += text(x + 145, 140, ["işletim", "sistemi", "arayüzüyle", "erişilir"], { size: 11, fill: C.muted });
    }
    c.lines.forEach((l, j) => {
      if (!l) return;
      const last = j === c.lines.length - 1;
      b += text(x + 103, 236 + j * 17, l, { size: 11.5, fill: last ? C.red : C.ink, weight: last ? 600 : 400 });
    });
  });
  b += text(884, 372, "ARF 3.0: cüzdan sağlayıcı bu dört mimariden herhangi birini seçebilir; PID için yüksek güvence düzeyi şarttır.", {
    anchor: "end", size: 11, italic: true, fill: C.muted,
  });
  save(3, svg(900, 386, b));
}

// ---------- Şekil 4: uzak WSCD ile imza ----------
{
  let b = "";
  const A = 140, W = 450, H = 760;
  b += box(A - 110, 18, 220, 50, ["Aynur'un telefonu", "(cüzdan + cihaz anahtarı)"], { size: 12, fill: C.gold50, stroke: C.gold });
  b += box(W - 110, 18, 220, 50, ["Cüzdan sağlayıcının WSCA'sı", "(erişim denetimi)"], { size: 12 });
  b += box(H - 110, 18, 220, 50, ["HSM", "(PID anahtarı burada)"], { size: 12, fill: C.paper, stroke: C.ink });
  [A, W, H].forEach((x) => (b += line(x, 68, x, 360, { stroke: C.rule, sw: 1.4, dash: true })));
  const msg = (y, x1, x2, label, kind = "") => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind });
    s += (text((x1 + x2) / 2, y - 12, label, { size: 11.5 }));
    return s;
  };
  b += box(A - 95, 88, 190, 34, ["1. Aynur PIN'ini girer"], { size: 11.5, fill: "#FFFFFF", stroke: C.gold });
  b += msg(160, A, W, "2. Cihaz anahtarıyla imzalı istek + PIN kanıtı");
  b += box(W - 125, 178, 250, 46, ["3. Cihaz anahtarını ve PIN'i doğrular", "(yanlış deneme sayacı)"], { size: 11, fill: "#FFFFFF" });
  b += msg(256, W, H, "4. “Şu veriyi PID anahtarıyla imzala”");
  b += msg(300, H, W, "5. İmza", "g");
  b += msg(340, W, A, "6. İmza telefona döner", "g");
  b += box(30, 380, 410, 50, ["PID anahtarı HSM'den hiç çıkmaz; kullanmak için", "hem telefon hem PIN gerekir."], { size: 11.5, fill: C.gok50 });
  b += box(460, 380, 410, 50, ["Sağlayıcı, imzalanan içeriği ve kişinin cüzdanı", "nerede kullandığını görmeyecek biçimde kurulmalıdır."], { size: 11.5, fill: C.red50, stroke: C.red });
  save(4, svg(900, 446, b));
}

// ---------- Şekil 5: WIA ve anahtar kanıtı ----------
{
  let b = "";
  const P = 110, S = 335, Wl = 565, I = 790;
  b += box(P - 95, 16, 190, 48, ["Platform", "(Apple / Google)"], { size: 12, fill: C.paper, stroke: C.ink });
  b += box(S - 95, 16, 190, 48, ["Cüzdan sağlayıcı"], { size: 12.5, weight: 600 });
  b += box(Wl - 95, 16, 190, 48, ["Aynur'un cüzdanı"], { size: 12.5, weight: 600, fill: C.gold50, stroke: C.gold });
  b += box(I - 95, 16, 190, 48, ["PID sağlayıcı"], { size: 12.5, weight: 600 });
  [P, S, Wl, I].forEach((x) => (b += line(x, 64, x, 560, { stroke: C.rule, sw: 1.4, dash: true })));
  const msg = (y, x1, x2, label, kind = "") => {
    let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind });
    s += (text((x1 + x2) / 2, y - 11, label, { size: 11 }));
    return s;
  };
  const phase = (y, t) => {
    let s = `<rect x="10" y="${y - 12}" width="880" height="24" fill="${C.gok50}"/>`;
    s += text(20, y, t, { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
    return s;
  };
  b += phase(88, "Etkinleştirme (ve sonra düzenli olarak)");
  b += msg(130, Wl, P, "1. Cihaz ve uygulama kanıtı ister");
  b += msg(166, P, Wl, "2. İmzalı platform kanıtı");
  b += msg(204, Wl, S, "3. Platform kanıtı + yeni açık anahtarlar");
  b += box(S - 110, 220, 220, 40, ["4. Kanıtları doğrular"], { size: 11.5, fill: "#FFFFFF" });
  b += msg(288, S, Wl, "5. WIA (24 saatten kısa) + anahtar kanıtı", "g");
  b += phase(322, "Belge alma");
  b += msg(362, Wl, I, "6. WIA + sahiplik kanıtı");
  b += msg(404, Wl, I, "7. Belge isteği + anahtar kanıtı");
  b += box(I - 108, 420, 206, 70, ["8. İmzaları cüzdan", "sağlayıcılar listesinden", "doğrular, düzeyi kontrol eder"], { size: 11, fill: "#FFFFFF" });
  b += msg(514, I, Wl, "9. PID, KA'daki anahtara bağlı", "g");
  b += box(S - 110, 470, 220, 56, ["Durum listeleri", "WIA · anahtar kanıtı"], { size: 11.5, fill: C.gold50, stroke: C.gold });
  b += arrow(I - 110, 470, S + 112, 492, { kind: "m", dash: true });
  b += (text(548, 462, "en az 24 saatte bir kontrol", { size: 10.5, fill: C.muted, italic: true }));
  b += text(880, 588, "Platform kanıtı yalnız cüzdan sağlayıcıya gider; WIA ve anahtar kanıtı yalnız belge veren kurumlara.", {
    anchor: "end", size: 11, italic: true, fill: C.muted,
  });
  save(5, svg(900, 602, b));
}

// ---------- Şekil 6: iki kat kullanıcı doğrulaması ----------
{
  let b = "";
  b += person(60, 120, 1.3, C.gold);
  b += text(60, 166, "Aynur", { size: 12.5, weight: 600 });
  b += box(110, 80, 230, 74, ["1. kat: işletim sistemi", "telefon kilidi + isteğe bağlı", "cüzdan PIN'i"], { size: 11.5, fill: C.gok50 });
  b += arrow(88, 117, 108, 117);
  b += arrow(342, 117, 388, 117);
  b += box(390, 90, 150, 54, ["Cüzdan açılır"], { size: 13, weight: 700, fill: "#FFFFFF" });
  b += arrow(542, 117, 588, 117);
  b += box(590, 70, 290, 94, ["Belgeleri ve işlem kaydını görmek", "anahtar deposundaki belgeler", "(bilet, öğrenci kartı gibi)"], { size: 11.5, fill: C.paper, stroke: C.ink });
  b += arrow(465, 146, 465, 206);
  b += box(330, 208, 270, 50, ["PID vermek, göstermek ya da silmek"], { size: 11.5, fill: "#FFFFFF" });
  b += arrow(465, 260, 465, 290);
  b += box(290, 292, 350, 70, ["2. kat: WSCA / WSCD", "PIN ya da biyometri, güvenli donanımın içinde"], { size: 11.5, fill: C.gold50, stroke: C.gold });
  b += arrow(642, 327, 728, 327, { kind: "g" });
  b += box(730, 304, 150, 46, ["İmza"], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold });
  b += lock(305, 327, C.red, 0.9);
  b += text(20, 400, "Yanlış deneme sayacı ve biyometrik karşılaştırma güvenli donanımın içindedir; işletim sistemi ele geçirilse bile 2. kat aşılamaz.", {
    anchor: "start", size: 11, italic: true, fill: C.muted,
  });
  save(6, svg(900, 416, b));
}

// ---------- Şekil 7: kayıp telefonda iptal zinciri ----------
{
  let b = "";
  const xs = [90, 234, 378, 522, 666, 810];
  const ly = 70;
  b += line(40, ly, 870, ly, { stroke: C.ink, sw: 1.4 });
  b += `<path d="M870,${ly - 6} l12,6 l-12,6 z" fill="${C.ink}"/>`;
  const when = ["başlangıç", "hemen", "24 saat içinde", "en geç 24 saat", "sonraki gösterim", "yeni telefon"];
  const steps = [
    ["Aynur kaybı", "sağlayıcıya bildirir", "(telefondan", "bağımsız yol)"],
    ["Sağlayıcı bütün", "WIA durum bitlerini", "iptal eder"],
    ["Aynur'a nedeni", "ve sonuçları", "bildirilir"],
    ["PID sağlayıcı", "iptali görür ve", "PID'i iptal eder"],
    ["Doğrulayan PID'i", "durum listesinde", "iptal edilmiş görür"],
    ["Yeni cüzdan kurulur;", "PID ve belgeler", "yeniden alınır"],
  ];
  xs.forEach((x, i) => {
    b += text(x, ly - 24, when[i], { size: 11, weight: 600, fill: C.gok700 });
    b += circle(x, ly, 12, { fill: i === 5 ? C.green : i === 0 ? C.red : C.gok });
    b += text(x, ly + 0.5, String(i + 1), { size: 11, weight: 700, fill: "#FFFFFF" });
    b += line(x, ly + 12, x, 100, { stroke: C.gok, sw: 1 });
    b += box(x - 66, 102, 132, 86, steps[i], { size: 11, weight: 500, fill: i === 5 ? "#EAF4EE" : C.gok50, stroke: i === 5 ? C.green : C.gok });
  });
  b += text(20, 222, "Telefondaki anahtarlar kopyalanamaz; telefonu bulan kişi PIN ya da biyometri olmadan imza atamaz.", {
    anchor: "start", size: 11.5, italic: true, fill: C.muted,
  });
  save(7, svg(900, 238, b));
}

console.log("A10 şekilleri yazıldı:", out);

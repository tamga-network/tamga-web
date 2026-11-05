// İmzalı Listelerden Deftere (signed-lists-to-ledger): şekiller 1–6. Çalıştır: node publications/figures/zincir.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "zincir");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

const rect = (x, y, w, h, o = {}) => {
  const { fill = "#FFFFFF", stroke = C.gok, sw = 1.4, r = 8, dash = false } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ' stroke-dasharray="6 4"' : ""}/>`;
};
const cross = (x, y, r = 7, color = C.red) =>
  `<path d="M${x - r},${y - r} L${x + r},${y + r} M${x + r},${y - r} L${x - r},${y + r}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
const tick = (x, y, color = C.green) =>
  `<path d="M${x - 8},${y} L${x - 2},${y + 6} L${x + 9},${y - 7}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
/** Üstü çizili etiket (yazılmayan şeyler). */
const struck = (x, y, label, size = 12) => {
  const w = label.length * size * 0.55 + 14;
  return `${rect(x, y - 12, w, 24, { fill: C.red50, stroke: C.red, sw: 1, r: 12 })}
${text(x + w / 2, y, label, { size, fill: C.red, weight: 500 })}
${line(x + 6, y, x + w - 6, y, { stroke: C.red, sw: 1.6 })}`;
};
const strucks = (x, y, labels, size = 12) => {
  let s = "";
  for (const l of labels) {
    s += struck(x, y, l, size);
    x += l.length * size * 0.55 + 14 + 10;
  }
  return s;
};
const lbl = (x, y, s, o = {}) => halo(text(x, y, s, { size: 11.5, fill: C.muted, ...o }));

// ---------- Şekil 1: zincirsiz hâl ----------
{
  let b = "";
  // Sürüm halkaları: listelerin listesi ve Türkiye listesi
  const rowY = [40, 190];
  const names = ["Listelerin listesi (lotl.jws)", "Türkiye listesi (tl-tr.jws)"];
  rowY.forEach((y, r) => {
    b += text(40, y, names[r], { anchor: "start", size: 13.5, weight: 700, fill: C.gok700 });
    [0, 1, 2].forEach((i) => {
      const x = 40 + i * 175;
      const cur = i === 2;
      b += rect(x, y + 16, 150, 82, { fill: cur ? C.gok100 : C.gok50, stroke: C.gok, sw: cur ? 2 : 1.4 });
      b += text(x + 75, y + 34, `sürüm ${["n−2", "n−1", "n"][i]}`, { size: 12.5, weight: 600 });
      b += text(x + 75, y + 56, i === 0 ? "önceki özet: …" : `önceki özet: h(${["", "n−2", "n−1"][i]})`, { size: 11.5 });
      b += text(x + 75, y + 78, "imza ✓", { size: 11.5, fill: C.green, weight: 600 });
      if (i > 0) b += arrow(x - 2, y + 57, x - 23, y + 57);
    });
  });
  b += line(115, 138, 115, 206, { stroke: C.gok, sw: 1.2, dash: true });
  b += lbl(125, 164, "ülke listesinin adresi ve imzacısı", { anchor: "start" });
  // Çapa günlüğü
  const gx = 590, gw = 270;
  b += text(gx, 40, "Çapa günlüğü (anchors.jsonl)", { anchor: "start", size: 13.5, weight: 700, fill: C.gok700 });
  const rows = [
    ["seq 41", "iptal listesi yayını"],
    ["seq 42", "kalp atışı"],
    ["seq 43", "şema değişikliği"],
    ["seq 44", "kalp atışı"],
  ];
  rows.forEach(([s, k], i) => {
    const y = 58 + i * 52;
    b += rect(gx, y, gw, 40, { fill: i === 3 ? C.gold50 : "#FFFFFF", stroke: i === 3 ? C.gold : C.gok, sw: 1.4, r: 6 });
    b += text(gx + 12, y + 13, s, { anchor: "start", size: 11.5, weight: 700 });
    b += text(gx + 70, y + 13, k, { anchor: "start", size: 11.5 });
    b += text(gx + 12, y + 30, i === 0 ? "önceki satırın özeti: …" : `önceki satırın özeti: h(${40 + i})`, { anchor: "start", size: 10.5, fill: C.muted });
    if (i > 0) b += arrow(gx + gw - 20, y - 1, gx + gw - 20, y - 11, { sw: 1.4 });
  });
  b += text(gx + gw / 2 - 20, 278, "en az saatte bir satır; satır silinmez", { size: 11.5, italic: true, fill: C.muted });
  // Doğrulayıcı
  b += rect(40, 320, 820, 64, { fill: C.paper, stroke: C.muted, sw: 1.2 });
  b += text(60, 342, "Doğrulayıcı", { anchor: "start", size: 13, weight: 700, fill: C.ink });
  b += text(60, 364, "Önbellekteki imzalı listeden okur; belgeyi doğrularken ne kuruma ne işletmeciye ne de bir zincire sorar.", {
    anchor: "start",
    size: 12,
  });
  b += arrow(445, 318, 445, 292, { kind: "m", dash: true });
  b += arrow(848, 318, 848, 258, { kind: "m", dash: true });
  b += text(450, 410, "Listelerde, günlükte ve değişiklik kaydında kişisel veri yoktur.", { size: 12, weight: 600, fill: C.red });
  save(1, svg(900, 428, b));
}

// ---------- Şekil 2: kontratların haritası ----------
{
  let b = "";
  b += box(330, 20, 240, 54, ["Governance", "üye devletler · 2/3 oy"], { fill: C.gok100, size: 13, weight: 600 });
  // Devlet ad alanı bölgesi
  b += rect(30, 120, 500, 236, { fill: "#FFFFFF", stroke: C.gok, sw: 1.4, dash: true, r: 12 });
  b += text(280, 140, "Devlet ad alanı: yalnız o devletin delegesi yazar", { size: 12.5, weight: 700, fill: C.gok700 });
  const nat = [
    ["RootCARegistry", "kök sertifikalar"],
    ["IssuerRegistry", "belge veren kurumlar"],
    ["SchemaRegistry", "ulusal belge türleri"],
    ["RelyingPartyRegistry", "doğrulayıcılar"],
    ["CrossRecognition", "devletler arası tanıma"],
    ["StatusListRegistry", "iptal listesi çapaları"],
  ];
  nat.forEach(([n, d], i) => {
    const x = 48 + (i % 2) * 238, y = 160 + Math.floor(i / 2) * 64;
    b += box(x, y, 226, 52, [n, d], { fill: C.gok50, size: 12, weight: 500 });
  });
  // Ağ düzeyi bölgesi
  b += rect(560, 120, 310, 236, { fill: "#FFFFFF", stroke: C.gold, sw: 1.4, dash: true, r: 12 });
  b += text(715, 140, "Ağ düzeyi: Governance oyu ya da eşik", { size: 12.5, weight: 700, fill: C.gok700 });
  [
    ["NetworkRegistry", "cüzdan sağlayıcı, ZK devresi, dış liste, imzacı"],
    ["SchemaRegistry (ortak tür)", "ortak belge türleri"],
    ["TrustListAnchorRegistry", "liste özetleri · eşikli yazıcılar"],
  ].forEach(([n, d], i) => {
    b += box(578, 160 + i * 64, 274, 52, [n, d], { fill: C.gold50, stroke: C.gold, size: 11.5, weight: 500 });
  });
  b += arrow(400, 76, 280, 117);
  b += arrow(500, 76, 715, 117);
  b += lbl(300, 96, "yükseltme (7 gün bekleme)");
  b += lbl(640, 96, "ağ kayıtları · yazıcı kümesi");
  // Okuma tarafı
  b += box(200, 392, 220, 48, ["TrustQueries", "C1 · C2 · C3 · D5"], { fill: C.paper, stroke: C.muted, size: 12 });
  b += box(480, 392, 240, 48, ["indeksleyici → ChainTrustSource", "aynı TrustSource arayüzü"], { fill: C.paper, stroke: C.muted, size: 12 });
  b += arrow(280, 358, 300, 388, { kind: "m" });
  b += arrow(600, 358, 600, 388, { kind: "m" });
  b += text(450, 470, "Doğrulayıcı yalnız okur; zincir cevabı doğrulama için hiçbir zaman gerekli değildir.", { size: 12, fill: C.ink });
  b += strucks(262, 504, ["kişisel veri", "belge", "belge özeti", "iptal biti"]);
  save(2, svg(900, 530, b));
}

// ---------- Şekil 3: projeksiyon, iki bağımsız oy, isteğe bağlı denetim ----------
{
  let b = "";
  const cols = [
    ["Liste yayıncısı", 90],
    ["İşletmeci A", 260],
    ["İşletmeci B", 430],
    ["Defter", 600],
    ["Doğrulayıcı", 790],
  ];
  cols.forEach(([n, x]) => {
    b += box(x - 72, 14, 144, 36, n, { fill: n === "Defter" ? C.gold50 : C.gok50, stroke: n === "Defter" ? C.gold : C.gok, size: 12.5, weight: 600 });
    b += line(x, 50, x, 380, { stroke: C.rule, sw: 1.2, dash: true });
  });
  const X = Object.fromEntries(cols);
  let y = 84;
  // 1
  b += rect(X["Liste yayıncısı"] - 72, y - 16, 144, 32, { fill: C.gok100, stroke: C.gok, r: 6 });
  b += text(X["Liste yayıncısı"], y, "sürüm n imzalanır", { size: 11.5, weight: 600 });
  b += arrow(X["Liste yayıncısı"] + 74, y, X["İşletmeci A"] - 4, y + 22, { kind: "m" });
  b += arrow(X["Liste yayıncısı"] + 74, y, X["İşletmeci B"] - 4, y + 22, { kind: "m" });
  b += lbl(250, y - 4, "herkese açık yayın");
  // 2 A doğrular ve oy verir
  y = 140;
  b += text(X["İşletmeci A"] + 8, y - 10, "kendi doğrular", { size: 11, fill: C.muted, anchor: "start" });
  b += arrow(X["İşletmeci A"], y + 10, X["Defter"] - 4, y + 10);
  b += lbl((X["İşletmeci A"] + X["Defter"]) / 2, y, "özet h (oy 1)");
  b += rect(X["Defter"] + 6, y - 4, 128, 30, { fill: "#FFFFFF", stroke: C.gold, r: 6 });
  b += text(X["Defter"] + 70, y + 11, "aday h · destek 1", { size: 11 });
  // 3 B bağımsız aynı özet
  y = 210;
  b += text(X["İşletmeci B"] + 8, y - 30, "bağımsız doğrular", { size: 11, fill: C.muted, anchor: "start" });
  b += arrow(X["İşletmeci B"], y + 10, X["Defter"] - 4, y + 10);
  b += lbl((X["İşletmeci B"] + X["Defter"]) / 2, y, "aynı h (oy 2)");
  b += rect(X["Defter"] + 6, y - 6, 150, 46, { fill: "#EAF4EE", stroke: C.green, r: 6, sw: 1.8 });
  b += text(X["Defter"] + 81, y + 6, "destek 2 = k", { size: 11, weight: 600, fill: C.green });
  b += text(X["Defter"] + 81, y + 25, "onaylı · sürüm kapandı", { size: 11, weight: 600, fill: C.green });
  // 4 doğrulayıcı listeden karar
  y = 290;
  b += rect(X["Doğrulayıcı"] - 92, y - 22, 184, 48, { fill: C.gok100, stroke: C.gok, r: 6, sw: 1.8 });
  b += text(X["Doğrulayıcı"], y - 6, "karar imzalı listeden", { size: 11.5, weight: 600 });
  b += text(X["Doğrulayıcı"], y + 12, "(önbellekten, çevrimdışı)", { size: 11, fill: C.muted });
  // 5 isteğe bağlı karşılaştırma
  y = 350;
  b += arrow(X["Doğrulayıcı"], y - 22, X["Defter"] + 4, y + 4, { kind: "m", dash: true });
  b += lbl(705, y - 20, "isteğe bağlı karşılaştırma");
  const ans = [
    ["Evet", "onaylı özet aynı", "#EAF4EE", C.green],
    ["Hayır", "alarm; sonuç değişmez", C.gold50, C.gold],
    ["Bilinmiyor", "sonuç kötüleşmez", C.paper, C.muted],
  ];
  ans.forEach(([a, d, f, s], i) => {
    const bx = 230 + i * 190;
    b += rect(bx, 392, 172, 50, { fill: f, stroke: s, r: 8, sw: 1.6 });
    b += text(bx + 86, 409, a, { size: 12.5, weight: 700, fill: s === C.muted ? C.ink : s });
    b += text(bx + 86, 429, d, { size: 11 });
  });
  b += arrow(X["Defter"], y + 8, 600, 388, { kind: "m" });
  b += text(450, 490, "Çelişkide imzalı liste geçerlidir · özellik bayrağı üretimde kapalıdır", { size: 12, italic: true, fill: C.muted });
  save(3, svg(900, 510, b));
}

// ---------- Şekil 4: kurum kaydı listede ve defterde ----------
{
  let b = "";
  b += rect(30, 20, 360, 380, { fill: C.gok50, stroke: C.gok, r: 10 });
  b += text(210, 44, "İmzalı ülke listesinde", { size: 13.5, weight: 700, fill: C.gok700 });
  b += rect(500, 20, 370, 380, { fill: C.gold50, stroke: C.gold, r: 10 });
  b += text(685, 44, "Defterde (projeksiyon)", { size: 13.5, weight: 700, fill: C.gok700 });
  const rows = [
    ["kurum kimliği (issuer_id)", "issuerId (bytes32)"],
    ["resmî ad", "nameHash (özet)"],
    ["sınıf: PUB / QUALIFIED / EAA", "kapalı küme değeri"],
    ["durum geçmişi", "durum pencereleri (an + durum)"],
    ["belge türü yetkileri", "yetki pencereleri"],
    ["sert iptal: invalidates_from", "invalidatesFrom (tarih)"],
  ];
  rows.forEach(([l, r], i) => {
    const y = 70 + i * 40;
    b += rect(46, y, 328, 30, { fill: "#FFFFFF", stroke: C.gok, r: 6, sw: 1.1 });
    b += text(58, y + 15, l, { anchor: "start", size: 11.5 });
    b += rect(516, y, 338, 30, { fill: "#FFFFFF", stroke: C.gold, r: 6, sw: 1.1 });
    b += text(528, y + 15, r, { anchor: "start", size: 11.5 });
    b += arrow(378, y + 15, 512, y + 15, { sw: 1.3 });
  });
  // kayıt bilgisi bloğu
  const by = 316;
  b += rect(46, by, 328, 70, { fill: "#FFFFFF", stroke: C.gok, r: 6, sw: 1.6 });
  b += text(58, by + 15, "kayıt bilgisi bloğu", { anchor: "start", size: 11.5, weight: 700 });
  b += text(58, by + 35, "ticari ad · kimlik numarası", { anchor: "start", size: 11 });
  b += text(58, by + 53, "posta adresi · iletişim · açıklama", { anchor: "start", size: 11 });
  b += rect(516, by + 14, 338, 42, { fill: "#FFFFFF", stroke: C.gold, r: 6, sw: 1.6 });
  b += text(685, by + 35, "registrationHash = SHA-256(JCS(blok))", { size: 11.5, weight: 600 });
  b += arrow(378, by + 35, 512, by + 35, { kind: "g", sw: 2 });
  b += lbl(445, by + 20, "kanonik JSON → SHA-256", { size: 10.5 });
  b += text(450, 424, "Ayrıntının kendisi yalnız imzalı listede kalır; defterden değişip değişmediği görülür, okunmaz.", { size: 12 });
  b += text(305, 458, "Hiçbir zaman:", { size: 12, weight: 700, fill: C.red, anchor: "end" });
  b += strucks(318, 458, ["kişi", "belge", "belge özeti", "iptal biti", "takma ad"]);
  save(4, svg(900, 480, b));
}

// ---------- Şekil 5: belgenin verildiği andaki durum ----------
{
  let b = "";
  const x0 = 60, x1 = 860, ay = 200;
  // dönem sınırları
  const tReg = 60, tSus = 270, tBack = 380, tComp = 600, tRev = 720;
  const seg = (a, c, label, fill, stroke) =>
    rect(a, ay - 22, c - a, 44, { fill, stroke, r: 0, sw: 1.2 }) + text((a + c) / 2, ay, label, { size: 12, weight: 600, fill: stroke === C.muted ? C.ink : stroke });
  b += seg(tReg, tSus, "ACTIVE", "#EAF4EE", C.green);
  b += seg(tSus, tBack, "SUSPENDED", C.gold50, C.gold);
  b += seg(tBack, tComp, "ACTIVE", "#EAF4EE", C.green);
  b += seg(tComp, tRev, "ACTIVE · düşer", C.red50, C.red);
  b += seg(tRev, x1, "REVOKED", C.red50, C.red);
  // sert iptal taraması
  b += line(tComp, ay - 40, tComp, ay + 40, { stroke: C.red, sw: 2, dash: true });
  b += `<path d="M${tRev - 6},${ay - 58} Q${(tComp + tRev) / 2},${ay - 86} ${tComp + 6},${ay - 48}" fill="none" stroke="${C.red}" stroke-width="1.8" marker-end="url(#arr)"/>`;
  b += halo(text((tComp + tRev) / 2, ay - 102, "invalidatesFrom: ele geçirilme anı", { size: 11.5, weight: 600, fill: C.red }));
  b += halo(text((tComp + tRev) / 2, ay - 86, "(iptalden geriye; yalnız daha geriye çekilir)", { size: 10.5, fill: C.red }));
  // zaman ekseni
  b += arrow(x0 - 20, ay + 70, x1 + 20, ay + 70, { kind: "m" });
  b += text(x1 + 18, ay + 88, "zaman", { size: 11, anchor: "end", fill: C.muted });
  [
    [tReg, "kayıt"],
    [tSus, "askı"],
    [tBack, "dönüş"],
    [tComp, "ele geçirilme"],
    [tRev, "iptal"],
  ].forEach(([t, l]) => {
    b += line(t, ay + 62, t, ay + 78, { stroke: C.muted, sw: 1.4 });
    b += text(t, ay + 92, l, { size: 11, fill: C.muted });
  });
  // belgeler
  const docs = [
    [150, "B1", "Aynur'un diploması", true],
    [320, "B2", "askı içinde", false],
    [490, "B3", "dönüşten sonra", true],
    [660, "B4", "ele geçirilmeden sonra", false],
    [790, "B5", "iptalden sonra", false],
  ];
  docs.forEach(([x, n, d, ok]) => {
    b += line(x, ay - 22, x, 74, { stroke: ok ? C.green : C.red, sw: 1.4 });
    b += rect(x - 58, 34, 116, 40, { fill: "#FFFFFF", stroke: ok ? C.green : C.red, r: 6, sw: 1.4 });
    b += text(x, 46, `${n} · iat`, { size: 11.5, weight: 700 });
    b += text(x, 62, d, { size: 9.5, fill: C.muted });
    b += ok ? tick(x + 46, 22) : cross(x + 46, 22, 6);
  });
  b += text(460, 330, "Aralıklar yarı açıktır: [başlangıç, bitiş). Karar, kurumun bugünkü durumuna değil belgenin iat anına göre verilir.", {
    size: 11.5,
    fill: C.ink,
  });
  b += text(460, 352, "B1 ve B3 kabul; B2 askı süresinde, B4 sert iptal kapsamında, B5 iptalden sonra verildiği için ret.", { size: 11.5, fill: C.muted });
  save(5, svg(920, 372, b));
}

// ---------- Şekil 6: göç penceresi ve eşdeğerlik kapısı ----------
{
  let b = "";
  const st = (x, w, l, sub, o) => box(x, 40, w, 64, [l, sub], { size: 12.5, weight: 600, ...o });
  b += st(30, 170, "başlamadı", "olağan yazım, blok zamanı", { fill: C.paper, stroke: C.muted });
  b += rect(260, 26, 340, 196, { fill: C.gold50, stroke: C.gold, r: 10, sw: 1.8 });
  b += text(430, 48, "açık (en çok 30 gün)", { size: 13.5, weight: 700, fill: C.gok700 });
  [
    "geçmiş tarih yazılabilir (≤ blok zamanı)",
    "kayıt başına zaman sırası korunur",
    "günlük kotalar uygulanmaz",
    "tarihsiz olağan yazım dondurulur",
    "kayıt kontratı yükseltilemez",
  ].forEach((t, i) => (b += text(280, 76 + i * 26, `• ${t}`, { anchor: "start", size: 11.5 })));
  b += st(700, 170, "kapandı", "geri dönüşsüz", { fill: C.gok100, stroke: C.gok });
  b += arrow(202, 72, 256, 72);
  b += lbl(229, 58, "2/3 oy", { size: 10.5 });
  // kapı
  b += `<path d="M640,${72 - 22} L662,72 L640,${72 + 22} L618,72 z" fill="#FFFFFF" stroke="${C.red}" stroke-width="1.8"/>`;
  b += text(640, 73, "?", { size: 14, weight: 700, fill: C.red });
  b += arrow(602, 72, 616, 72);
  b += arrow(664, 72, 696, 72);
  b += text(640, 112, "eşdeğerlik:", { size: 11, weight: 600, fill: C.red });
  b += text(640, 127, "fark yok mu?", { size: 11, weight: 600, fill: C.red });
  b += `<path d="M640,136 Q640,200 606,200" fill="none" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="6 4" marker-end="url(#arr)"/>`;
  b += text(650, 196, "fark varsa: kapanmaz,", { size: 11, fill: C.red, anchor: "start" });
  b += text(650, 212, "rapor herkese açık", { size: 11, fill: C.red, anchor: "start" });
  // alt: arşiv → plan → yazım
  const fy = 290;
  b += box(30, fy, 170, 56, ["herkese açık arşiv", "liste sürümleri + günlük"], { fill: C.gok50, size: 11.5 });
  b += box(240, fy, 190, 56, ["deterministik plan", "replayPlanHash"], { fill: C.gok50, size: 11.5 });
  b += box(470, fy, 170, 56, ["deftere yazım", "listedeki tarihlerle"], { fill: C.gold50, stroke: C.gold, size: 11.5 });
  b += arrow(202, fy + 28, 236, fy + 28);
  b += arrow(432, fy + 28, 466, fy + 28);
  b += arrow(335, fy - 2, 380, 226, { kind: "m", dash: true });
  b += arrow(555, fy - 2, 520, 226, { kind: "g", dash: true });
  b += lbl(250, 262, "pencereyi açan öneri plan özetini taşır", { size: 10.5 });
  b += lbl(548, 262, "yalnız pencere açıkken", { size: 10.5, anchor: "start" });
  // eşdeğerlik iki kaynak
  const ey = 390;
  b += box(60, ey, 220, 50, ["liste kaynağı", "(imzalı listeler)"], { fill: C.gok50, size: 11.5 });
  b += box(620, ey, 220, 50, ["zincir kaynağı", "(indeks + kontrat okuması)"], { fill: C.gold50, stroke: C.gold, size: 11.5 });
  b += box(340, ey, 220, 50, ["aynı soru kümesi", "her an ± 1 sn · C1 C2 C3 D5"], { fill: "#FFFFFF", stroke: C.muted, size: 11.5 });
  b += arrow(338, ey + 25, 284, ey + 25, { kind: "m" });
  b += arrow(562, ey + 25, 616, ey + 25, { kind: "m" });
  b += text(450, ey + 78, "Kabul ölçütü: her soruda karar(liste) = karar(zincir); tek bir kabul/ret farkı göçü kapatmaz.", { size: 12, weight: 600 });
  save(6, svg(900, 490, b));
}

console.log("şekiller yazıldı:", out);

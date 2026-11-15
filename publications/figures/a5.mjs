// A5 — Bağlanamazlık: şekiller 1–6. Çalıştır: node publications/figures/a5.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, circle, phone, lock } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a5");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);
const GREEN50 = "#EAF4EE";
const cross = (x, y, s = 10) =>
  `<g stroke="${C.red}" stroke-width="3"><line x1="${x - s}" y1="${y - s}" x2="${x + s}" y2="${y + s}"/><line x1="${x + s}" y1="${y - s}" x2="${x - s}" y2="${y + s}"/></g>`;

// ---------- Şekil 1: iki doğrulayıcı not karşılaştırıyor ----------
{
  let b = "";
  b += phone(20, 60, 140, 230, C.gold);
  b += text(90, 96, "Aynur'un cüzdanı", { size: 12, weight: 600 });
  b += box(36, 150, 108, 60, ["Diploma"], { size: 13, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
  b += text(90, 250, ["yalnız istenen", "alanlar açılır"], { size: 10.5, fill: C.muted });
  // siteler
  b += box(330, 30, 230, 100, ["Emlak sitesi", "", "kayıt: semt, kira bütçesi"], { size: 12, fill: C.paper, stroke: C.ink });
  b += box(330, 200, 230, 100, ["İş ilanı sitesi", "", "kayıt: başvurulan pozisyonlar"], { size: 12, fill: C.paper, stroke: C.ink });
  b += arrow(162, 160, 328, 80);
  b += arrow(162, 200, 328, 250);
  b += text(225, 58, ["imza: 3f9a…", "cihaz anahtarı: 7c2e…"], { size: 10.5, weight: 600, fill: C.red });
  b += text(225, 282, ["imza: 3f9a…", "cihaz anahtarı: 7c2e…"], { size: 10.5, weight: 600, fill: C.red });
  // aracı
  b += box(650, 80, 230, 170, ["Veri aracısı", "", "imza 3f9a… = imza 3f9a…", "→ aynı kişi", "", "birleşen profil:", "nerede yaşamak istiyor", "+ ne kazanmayı bekliyor"], {
    size: 11.5, fill: C.red50, stroke: C.red,
  });
  b += arrow(562, 80, 648, 130, { kind: "r", dash: true });
  b += arrow(562, 250, 648, 200, { kind: "r", dash: true });
  b += text(450, 336, "Hiçbir site Aynur'un adını ya da kimlik numarasını görmedi; ama ikisi aynı kişiyle iş yaptığını bilir. (Değerler örnektir.)", {
    size: 11, italic: true, fill: C.muted,
  });
  save(1, svg(900, 352, b));
}

// ---------- Şekil 2: bağlanabilirlik türleri ----------
{
  let b = "";
  const badge = (x, y, n) => circle(x, y, 10, { fill: C.red }) + text(x, y + 0.5, String(n), { size: 10.5, weight: 700, fill: "#FFFFFF" });
  const lab = (x, y, t, anchor = "start") => text(x, y, t, { anchor, size: 11.5, weight: 600, fill: C.red });
  const red = (x1, y1, x2, y2) => line(x1, y1, x2, y2, { stroke: C.red, sw: 1.8, dash: true });
  b += box(340, 20, 220, 52, ["Veren kurum"], { size: 13.5, weight: 600 });
  b += box(680, 20, 200, 52, ["Durum listesi", "(veren kurumun yayımladığı)"], { size: 11.5, fill: C.gold50, stroke: C.gold });
  b += line(562, 46, 678, 46, { stroke: C.muted, sw: 1.2, dash: true });
  b += text(620, 36, "yayımlar", { size: 10.5, fill: C.muted });
  b += box(20, 300, 210, 52, ["İkinci bir veren kurum", "(ör. üniversite)"], { size: 12 });
  b += box(680, 150, 200, 52, ["Doğrulayıcı A"], { size: 13.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += box(680, 310, 200, 52, ["Doğrulayıcı B"], { size: 13.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += box(340, 420, 220, 48, ["Cüzdan sağlayıcı"], { size: 13.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += phone(395, 150, 110, 220, C.gold);
  b += text(450, 262, ["Aynur'un", "cüzdanı"], { size: 13, weight: 700 });
  // olağan akış (gri)
  b += arrow(450, 74, 450, 148, { kind: "m" });
  b += arrow(232, 320, 393, 290, { kind: "m" });
  b += arrow(507, 240, 678, 180, { kind: "m" });
  b += arrow(507, 300, 678, 332, { kind: "m" });
  b += arrow(450, 418, 450, 372, { kind: "m" });
  // 1 doğrulayıcılar arası
  b += red(780, 204, 780, 308);
  b += badge(780, 256, 1) + lab(796, 256, "doğrulayıcılar arası");
  // 2 zaman içinde
  b += `<path d="M880,165 C918,150 918,200 880,188" fill="none" stroke="${C.red}" stroke-width="1.8" stroke-dasharray="5 4"/>`;
  b += badge(902, 124, 2) + lab(888, 100, "zaman içinde", "end");
  // 3 veren + doğrulayıcı
  b += red(562, 64, 690, 148);
  b += badge(650, 122, 3) + lab(636, 146, "veren + doğrulayıcı", "end");
  // 5 iptal kontrolü
  b += red(780, 74, 780, 148);
  b += badge(780, 110, 5) + lab(764, 92, "iptal kontrolünde gözlem", "end");
  // 4 cüzdan sağlayıcı
  b += badge(475, 395, 4) + lab(492, 395, "kullanımı gözlemek");
  // 6 veren kurumlar arası
  b += red(338, 60, 125, 298);
  b += badge(232, 179, 6) + lab(216, 179, "veren kurumlar arası", "end");
  b += text(460, 498, "Gri oklar olağan akış, kırmızı kesikli çizgiler bağlanabilirlik tehditleridir. Her türün çözümü farklıdır.", {
    size: 11.5, italic: true, fill: C.muted,
  });
  save(2, svg(930, 514, b));
}

// ---------- Şekil 3: gösterimin anatomisi ----------
{
  let b = "";
  const kinds = {
    r: [C.red50, C.red],
    g: [GREEN50, C.green],
    b: [C.gok50, C.gok],
    n: ["#FFFFFF", C.rule],
  };
  const panel = (x, w, title, rows) => {
    let s = `<rect x="${x}" y="20" width="${w}" height="330" rx="8" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.2"/>`;
    s += text(x + w / 2, 48, title, { size: 12, weight: 700, fill: C.gok700 });
    rows.forEach(([t, k], i) => {
      const [f, st] = kinds[k];
      s += box(x + 12, 76 + i * 38, w - 24, 30, [t], { size: 11, fill: f, stroke: st, weight: 500 });
    });
    return s;
  };
  b += panel(20, 240, ["Veren kurumun imzaladığı kısım"], [
    ["veren (iss)", "n"],
    ["belge türü (vct)", "n"],
    ["zaman damgaları (iat, exp)", "r"],
    ["cihaz anahtarı (cnf)", "r"],
    ["iptal sırası (idx)", "r"],
    ["açılmayan alanların özetleri (_sd)", "r"],
    ["veren kurumun imzası", "r"],
  ]);
  b += panel(272, 200, ["Açılan alanlar"], [
    ["derece: Yüksek Lisans", "b"],
    ["alanın tuzu", "r"],
  ]);
  b += panel(484, 230, ["Anahtar bağlama (her seferinde yeni)"], [
    ["doğrulayıcı adresi (aud)", "g"],
    ["tek kullanımlık değer (nonce)", "g"],
    ["gösterim zamanı (iat)", "g"],
    ["cihaz anahtarıyla imza", "g"],
  ]);
  const leg = [
    ["r", ["her gösterimde aynı;", "bağlantı kurar"]],
    ["g", ["her gösterimde yeni"]],
    ["b", ["kişinin bilerek açtığı;", "kendisi de bağlantı", "kurabilir"]],
    ["n", ["belge türünü ve vereni", "söyler; tek başına ayırt", "edici sayılmaz"]],
  ];
  b += text(730, 48, "Renkler", { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
  leg.forEach(([k, t], i) => {
    const [f, st] = kinds[k];
    const y = 70 + i * 66;
    b += `<rect x="730" y="${y}" width="22" height="18" rx="3" fill="${f}" stroke="${st}" stroke-width="1.4"/>`;
    b += text(760, y + 9 + ((t.length - 1) * 11.5 * 1.3) / 2, t, { anchor: "start", size: 11 });
  });
  b += text(450, 378, "Kutunun dışında da iz kalır: IP adresi, tarayıcının teknik özellikleri, saat, oturumda girilen diğer bilgiler.", {
    size: 11, italic: true, fill: C.muted,
  });
  save(3, svg(900, 394, b));
}

// ---------- Şekil 4: dört yöntem ----------
{
  let b = "";
  const cols = ["1. Banka", "2. Emlak", "3. Banka (tekrar)", "4. İş sitesi"];
  const cx = (i) => 270 + i * 100;
  b += text(110, 30, "Yöntem", { size: 12, weight: 700, fill: C.gok700 });
  cols.forEach((c, i) => (b += text(cx(i), 30, c, { size: 11.5, weight: 700, fill: C.gok700 })));
  b += text(735, 30, "Sonuç", { size: 12, weight: 700, fill: C.gok700 });
  b += line(20, 48, 880, 48, { stroke: C.gok, sw: 1 });
  const color = { K1: C.gok, K2: C.gold, K3: C.green, K4: C.red };
  const rows = [
    [["A · bir kez kullanılan", "(zorunlu destek)"], ["K1", "K2", "K3", "K4"], ["doğrulayıcılar eşleştiremez;", "banka da ikinci kez tanıyamaz"]],
    [["B · süresi kısa", "(zorunlu destek)"], ["K1", "K1", "K1", "K1"], ["süre dolana kadar herkes", "eşleştirebilir; sonra K2 gelir"]],
    [["C · dönen paket (3 kopya)", "(isteğe bağlı)"], ["K2", "K3", "K1", "K2"], ["paket bitince kopyalar", "tekrarlanır; kısmen korur"]],
    [["D · doğrulayıcı başına", "(isteğe bağlı)"], ["K1", "K2", "K1", "K3"], ["banka tanır; doğrulayıcılar", "birbirini eşleştiremez"]],
  ];
  rows.forEach(([lab, ks, res], r) => {
    const y = 66 + r * 74;
    if (r % 2 === 1) b += `<rect x="20" y="${y - 6}" width="860" height="68" fill="${C.paper}"/>`;
    b += text(110, y + 28, lab, { size: 11.5, weight: 600 });
    ks.forEach((k, i) => {
      b += circle(cx(i), y + 28, 19, { fill: color[k] });
      b += text(cx(i), y + 28.5, k, { size: 12, weight: 700, fill: "#FFFFFF" });
    });
    b += text(735, y + 28, res, { size: 11 });
  });
  b += line(20, 362, 880, 362, { stroke: C.gok, sw: 1 });
  b += text(450, 384, "K1–K4: aynı mantıksal belgenin teknik kopyaları. A ve B'yi desteklemek zorunlu, C ve D isteğe bağlı (ARF 3.0.0).", {
    size: 11, italic: true, fill: C.muted,
  });
  save(4, svg(900, 400, b));
}

// ---------- Şekil 5: siteye özel takma ad ----------
{
  let b = "";
  b += phone(20, 50, 150, 270, C.gold);
  b += lock(95, 140, C.gold, 1.2);
  b += text(95, 180, ["tohum", "(yalnız cüzdanda)"], { size: 12, weight: 600 });
  b += text(95, 250, "9b41…e07c", { size: 11, fill: C.muted });
  const sites = [
    ["Emlak sitesi", "https://emlak.example", "pZ3c…"],
    ["İş ilanı sitesi", "https://is.example", "Q81m…"],
    ["Spor salonu", "https://spor.example", "T0va…"],
  ];
  sites.forEach(([n, url, p], i) => {
    const y = 50 + i * 100;
    b += arrow(172, 185, 218, y + 30);
    b += box(220, y, 220, 60, ["HMAC(tohum,", url + ")"], { size: 11, fill: C.gok50 });
    b += arrow(442, y + 30, 488, y + 30);
    b += box(490, y + 8, 110, 44, [p], { size: 13, weight: 700, fill: C.gold50, stroke: C.gold });
    b += arrow(602, y + 30, 648, y + 30);
    b += box(650, y, 230, 60, [n, "her girişte aynı takma ad → tanır"], { size: 11, fill: C.paper, stroke: C.ink });
  });
  b += line(765, 112, 765, 148, { stroke: C.red, sw: 1.6, dash: true });
  b += line(765, 212, 765, 248, { stroke: C.red, sw: 1.6, dash: true });
  b += cross(765, 130, 7);
  b += cross(765, 230, 7);
  b += text(765, 330, "takma adlar birbiriyle karşılaştırılamaz", { size: 11, weight: 600, fill: C.red });
  b += text(450, 362, "Site kişiyi kendi içinde tanır; siteler birbirini eşleştiremez. (Değerler örnektir.)", { size: 11.5, italic: true, fill: C.muted });
  save(5, svg(900, 378, b));
}

// ---------- Şekil 6: iptal listesi ----------
{
  let b = "";
  const N = 40, x0 = 50, w = 20;
  const ones = [4, 13, 27, 38];
  const golds = { 7: "sıra 7203", 20: "sıra 41817", 31: "sıra 63950" };
  b += text(x0, 24, "Durum listesi (bit dizisi; 0 geçerli, 1 iptal)", { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
  for (let i = 0; i < N; i++) {
    const x = x0 + i * w;
    const isG = golds[i];
    const fill = isG ? C.gold : ones.includes(i) ? C.red : "#FFFFFF";
    b += `<rect x="${x}" y="40" width="${w - 3}" height="22" fill="${fill}" stroke="${C.gok}" stroke-width="1"/>`;
    b += text(x + (w - 3) / 2, 51, isG ? "0" : ones.includes(i) ? "1" : "0", { size: 9.5, fill: isG || ones.includes(i) ? "#FFFFFF" : C.muted });
    if (isG) b += text(x + 8, 78, isG, { size: 10.5, weight: 600, fill: C.ink });
  }
  b += text(x0 + N * w + 6, 51, "…", { anchor: "start", size: 14, fill: C.muted });
  b += text(x0, 102, "Aynur'un üç kopyasının sıraları rastgele dağılmış; aynı paketteki kopyalar yan yana durmaz.", { anchor: "start", size: 11, fill: C.ink });
  b += text(x0, 122, "Listede binlerce belge, gerekirse sahte kayıtlar: sürü gizliliği.", { anchor: "start", size: 11, fill: C.ink });
  b += box(50, 180, 230, 60, ["Veren kurum", "(listeyi yayımlar)"], { size: 12.5, weight: 600 });
  b += arrow(165, 178, 165, 136, { kind: "m" });
  b += box(620, 180, 230, 60, ["Doğrulayıcı"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += arrow(618, 210, 282, 210);
  b += text(450, 172, ["listenin tamamını indirir;", "gösterimden bağımsız bir zamanda;", "kimlik doğrulaması olmadan"], { size: 11, fill: C.gok700 });
  b += text(735, 262, "önbellek: sonraki kontroller çevrimdışı", { size: 10.5, fill: C.muted });
  b += text(450, 300, "Kurum, hangi belgenin hangi doğrulayıcıda gösterildiğini listeden öğrenemez.", { size: 11.5, weight: 600, fill: C.green });
  save(6, svg(900, 318, b));
}

console.log("A5 şekilleri yazıldı:", out);

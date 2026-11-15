// A8 — Belge Nasıl Verilir, Nasıl Gösterilir: şekiller 1–7. Çalıştır: node publications/figures/a8.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { C, svg, text, box, arrow, line, halo } from "./svg.mjs";

const out = join(dirname(fileURLToPath(import.meta.url)), "a8");
mkdirSync(out, { recursive: true });
const save = (n, s) => writeFileSync(join(out, `sekil-${n}.svg`), s);

/**
 * Sıra diyagramı yardımcısı.
 * parts: [{ x, label: [..], gold? }]; top: başlık kutularının üstü; bottom: yaşam çizgisinin sonu.
 */
function lifelines(parts, top, bottom, w = 176) {
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
/** Mesaj oku + üstünde etiket (tek ya da iki satır). */
function msg(y, x1, x2, label, o = {}) {
  const { kind = "", dash = false, size = 11.5, color } = o;
  const lines = Array.isArray(label) ? label : [label];
  let s = arrow(x1, y, x2 + (x2 > x1 ? -2 : 2), y, { kind, dash });
  const fill = color || (kind === "r" ? C.red : kind === "g" ? "#8A6A1F" : C.ink);
  const cy = y - 9 - ((lines.length - 1) * size * 1.3) / 2;
  s += halo(text((x1 + x2) / 2, cy, lines, { size, fill }));
  return s;
}
/** Bir yaşam çizgisi üstünde iç işlem kutusu. */
function act(x, y, w, lines, o = {}) {
  const h = (Array.isArray(lines) ? lines.length : 1) * 16 + 20;
  return box(x - w / 2, y - h / 2, w, h, lines, { size: 11, fill: o.fill || C.paper, stroke: o.stroke || C.ink, weight: 500 });
}
/** Satırlar arkasında açık renk bant ve köşesinde etiket. */
function band(x, y, w, h, label, fill, color) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="4 4" opacity="0.7"/>` +
    text(x + w - 8, y + h - 10, label, { anchor: "end", size: 10.5, italic: true, fill: color });
}

// ---------- Şekil 1: dört katman ----------
{
  let b = "";
  const rows = [
    ["Profil", "HAIP · ETSI TS 119 472-2 / 119 472-3", "Hangi seçenekler zorunlu, hangileri yasak?", C.gold50, C.gold],
    ["Cüzdanın çağrılması", "QR kod · bağlantı şeması · Digital Credentials API · yüz yüze NFC / BLE", "Kurum cüzdana nasıl ulaşır?", C.gok50, C.gok],
    ["Protokol", "OpenID4VCI (verme) · OpenID4VP (gösterme) · DCQL (sorgu)", "Kim kime hangi sırayla ne gönderir?", C.gok100, C.gok],
    ["Belge biçimi", "SD-JWT VC · mdoc (ISO/IEC 18013-5) · W3C VC", "Belgenin kendisi nasıl kodlanır?", C.paper, C.ink],
  ];
  rows.forEach(([t, ex, q, fill, stroke], i) => {
    const y = 20 + i * 78;
    b += `<rect x="20" y="${y}" width="580" height="64" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
    b += text(40, y + 20, t, { anchor: "start", size: 14, weight: 700, fill: C.gok700 });
    b += text(40, y + 44, ex, { anchor: "start", size: 12, fill: C.ink });
    b += text(625, y + 32, q, { anchor: "start", size: 11.5, italic: true, fill: C.muted });
    if (i < rows.length - 1) b += arrow(310, y + 64, 310, y + 76, { kind: "m", sw: 1.2 });
  });
  b += line(612, 30, 612, 316, { stroke: C.rule, sw: 1 });
  b += text(860, 352, "Alt katmanlar birbirinden bağımsızdır: aynı protokol farklı biçimleri taşıyabilir.", {
    anchor: "end", size: 11.5, italic: true, fill: C.muted,
  });
  save(1, svg(880, 368, b));
}

// ---------- Şekil 2: OAuth rolleri ----------
{
  let b = "";
  b += text(220, 24, "Belge verme (OpenID4VCI)", { size: 15, weight: 700, fill: C.gok });
  b += text(670, 24, "Belge gösterme (OpenID4VP)", { size: 15, weight: 700, fill: C.gok });
  b += line(445, 12, 445, 330, { stroke: C.rule, sw: 1.2 });
  const tag = (x, y, t) => text(x, y, t, { size: 10.5, italic: true, fill: C.muted });
  // sol
  b += box(130, 50, 180, 56, ["Aynur'un cüzdanı"], { size: 13, weight: 600, fill: C.gold50, stroke: C.gold });
  b += tag(220, 120, "OAuth rolü: istemci");
  b += box(20, 230, 180, 64, ["Yetkilendirme", "sunucusu (üniversite)"], { size: 12, weight: 600 });
  b += tag(110, 308, "OAuth rolü: yetkilendirme sunucusu");
  b += box(240, 230, 180, 64, ["Belge uç noktası", "(veren kurum)"], { size: 12, weight: 600 });
  b += tag(330, 308, "OAuth rolü: kaynak sunucusu");
  b += arrow(180, 132, 120, 226);
  b += halo(text(122, 172, ["1. erişim", "belirteci ister"], { size: 11, fill: C.gok700, anchor: "end" }));
  b += arrow(262, 132, 322, 226);
  b += halo(text(318, 172, ["2. belirteci gösterir,", "belgeyi alır"], { size: 11, fill: C.gok700, anchor: "start" }));
  // sağ
  b += box(480, 62, 180, 56, ["Yurdun sitesi", "(doğrulayan)"], { size: 12.5, weight: 600, fill: C.paper, stroke: C.ink });
  b += tag(570, 48, "OAuth rolü: istemci");
  b += box(690, 230, 180, 64, ["Aynur'un cüzdanı"], { size: 13, weight: 600, fill: C.gold50, stroke: C.gold });
  b += tag(780, 308, "yetkilendirme sunucusu gibi");
  b += arrow(620, 120, 750, 226);
  b += halo(text(712, 158, ["yetkilendirme isteği", "+ DCQL sorgusu"], { size: 11, fill: C.gok700, anchor: "start" }));
  b += arrow(700, 228, 550, 122, { kind: "g" });
  b += halo(text(578, 196, ["yetkilendirme cevabı:", "vp_token"], { size: 11, fill: "#8A6A1F", anchor: "end" }));
  b += text(445, 360, "Belge verirken cüzdan isteyen taraftır; gösterirken isteği karşılayan taraftır.", {
    size: 12, weight: 600, fill: C.gok700,
  });
  save(2, svg(890, 380, b));
}

// ---------- Şekil 3: OpenID4VCI yetkilendirme kodu akışı ----------
{
  let b = "";
  const A = 92, W = 280, Y = 540, V = 800;
  const top = 14, bottom = 640;
  b += band(150, 172, 720, 300, "OAuth 2.0 yetkilendirme kodu akışı (FAPI 2.0 eklentileriyle)", C.gok50, C.gok700);
  b += band(150, 482, 720, 140, "OpenID4VCI'nin ekledikleri", C.gold50, "#8A6A1F");
  b += lifelines(
    [
      { x: A, label: ["Aynur"], gold: true },
      { x: W, label: ["Cüzdan"] },
      { x: Y, label: ["Yetkilendirme sunucusu", "(üniversite girişi)"] },
      { x: V, label: ["Veren", "(belge uç noktası)"] },
    ],
    top, bottom, 170,
  );
  b += msg(100, V, W, "1. Belge teklifi (QR kod; isteğe bağlı, cüzdan da başlatabilir)");
  b += msg(146, W, V, "2. Üst veriyi okur: /.well-known/openid-credential-issuer");
  b += msg(206, W, Y, ["3. PAR: scope, code_challenge,", "cüzdan onayı"]);
  b += msg(256, Y, A, "4. Giriş ve onay (öğrenci no + parola, iki faktör)", { dash: true, kind: "m", color: C.muted });
  b += msg(304, Y, W, "5. Yetkilendirme kodu");
  b += msg(360, W, Y, ["6. Kod + code_verifier", "+ DPoP kanıtı"]);
  b += msg(416, Y, W, "7. Erişim belirteci (DPoP anahtarına bağlı)");
  b += msg(516, W, V, "8. Nonce iste; cevap: c_nonce");
  b += msg(560, W, V, "9. Belge isteği: erişim belirteci + anahtar kanıtı (proof JWT)");
  b += msg(604, V, W, "10. Belge (SD-JWT VC ya da mdoc)", { kind: "g" });
  save(3, svg(890, 650, b));
}

// ---------- Şekil 4: ön yetkilendirilmiş kod ----------
{
  let b = "";
  const A = 90, W = 300, T = 560, V = 800;
  const top = 14, bottom = 520;
  b += lifelines(
    [
      { x: A, label: ["Aynur"], gold: true },
      { x: W, label: ["Cüzdan"] },
      { x: T, label: ["Belirteç uç noktası"] },
      { x: V, label: ["Veren (üniversite)"] },
    ],
    top, bottom, 170,
  );
  b += box(30, 80, 830, 34, ["0. Akıştan önce: kayıt bürosunda Aynur'un kimliği kontrol edilir"], {
    size: 11.5, fill: C.paper, stroke: C.rule, weight: 500,
  });
  b += msg(160, V, W, ["1. Teklif (QR): ön yetkilendirilmiş kod", "ve \"işlem kodu gerekli\" bilgisi"]);
  b += msg(214, V, A, "2. İşlem kodu ayrı kanaldan (e-posta: 4 hane)", { kind: "g", dash: true });
  b += msg(262, A, W, "3. Kodu girer");
  b += msg(318, W, T, ["4. Ön yetkilendirilmiş kod", "+ işlem kodu"]);
  b += msg(366, T, W, "5. Erişim belirteci");
  b += msg(418, W, V, "6. Nonce, anahtar kanıtı, belge isteği");
  b += msg(466, V, W, "7. Belge", { kind: "g" });
  b += box(600, 236, 270, 46, ["QR kodu çalan kişi e-postayı görmediği", "için belgeyi alamaz."], {
    size: 11, fill: C.red50, stroke: C.red, weight: 500,
  });
  save(4, svg(890, 530, b));
}

// ---------- Şekil 5: OpenID4VP cihazlar arası ----------
{
  let b = "";
  const A = 86, B = 270, D = 530, W = 800;
  const top = 14, bottom = 600;
  b += lifelines(
    [
      { x: A, label: ["Aynur"], gold: true },
      { x: B, label: ["Bilgisayardaki", "tarayıcı"] },
      { x: D, label: ["Doğrulayan sunucusu", "(yurt)"] },
      { x: W, label: ["Telefondaki cüzdan"] },
    ],
    top, bottom, 160,
  );
  b += msg(96, A, B, "1. \"Öğrenciliğimi kanıtla\"");
  b += msg(146, D, B, "2. QR kod: client_id + request_uri");
  b += msg(196, A, W, "3. QR kodu cüzdanla okutur", { dash: true, kind: "m", color: C.muted });
  b += msg(246, W, D, "4. İsteği indir (request_uri)");
  b += msg(304, D, W, ["5. İmzalı istek (JAR): DCQL, nonce,", "response_uri, şifreleme anahtarı"]);
  b += act(W, 362, 168, ["6. İmza + sertifika", "kontrolü; Aynur onaylar"]);
  b += msg(428, W, D, ["7. direct_post.jwt:", "şifreli vp_token + state"], { kind: "g" });
  b += act(D, 490, 196, ["8. İmza, güven listesi, durum", "listesi, KB-JWT kontrolleri"]);
  b += msg(560, D, B, "9. \"Doğrulandı\" (sayfa ilerler)");
  b += box(30, 210, 190, 58, ["Sahte bir sayfa da", "aynı QR kodu gösterebilir", "(Bölüm 5.7)."], {
    size: 10.5, fill: C.red50, stroke: C.red, weight: 500,
  });
  save(5, svg(890, 610, b));
}

// ---------- Şekil 6: DCQL yapısı ----------
{
  let b = "";
  b += box(20, 200, 130, 46, ["dcql_query"], { size: 13, weight: 700, fill: C.gok, stroke: C.gok, color: "#FFFFFF" });
  b += box(200, 80, 150, 46, ["credentials", "(dizi)"], { size: 12, weight: 600 });
  b += box(200, 330, 150, 46, ["credential_sets", "(isteğe bağlı)"], { size: 12, weight: 600, fill: C.gold50, stroke: C.gold });
  b += arrow(150, 214, 198, 112);
  b += arrow(150, 232, 198, 346);
  const q = [
    ["id: pid", "format: dc+sd-jwt", "meta.vct_values", "claims: [family_name] [given_name] [birthdate]"],
    ["id: ehliyet", "format: mso_mdoc", "meta.doctype_value", "claims: [org.iso.18013.5.1, family_name] …"],
    ["id: sadakat", "format: dc+sd-jwt", "meta.vct_values", "claims: [member_number]"],
  ];
  q.forEach((t, i) => {
    const y = 14 + i * 92;
    b += `<rect x="400" y="${y}" width="300" height="80" rx="6" fill="${C.paper}" stroke="${C.ink}" stroke-width="1.2"/>`;
    b += text(412, y + 15, t[0], { anchor: "start", size: 12, weight: 700, fill: C.gok700 });
    b += text(412, y + 32, t[1], { anchor: "start", size: 11 });
    b += text(412, y + 48, t[2], { anchor: "start", size: 11 });
    b += text(412, y + 64, t[3], { anchor: "start", size: 10.5, fill: C.muted });
    b += arrow(352, 103, 398, y + 40, { kind: "m", sw: 1.2 });
  });
  b += box(730, 70, 150, 92, ["trusted_authorities", "(isteğe bağlı):", "aki · etsi_tl ·", "openid_federation"], {
    size: 10.5, fill: C.gok50, stroke: C.gok, dash: true, weight: 500,
  });
  b += arrow(702, 116, 728, 116, { kind: "m", dash: true, sw: 1.2 });
  b += box(400, 300, 300, 46, ["options: [ [pid], [ehliyet] ]", "→ biri yeterli"], { size: 11, fill: C.gold50, stroke: C.gold, weight: 500 });
  b += box(400, 356, 300, 46, ["required: false, options: [ [sadakat] ]", "→ isteğe bağlı ek belge"], { size: 11, fill: C.gold50, stroke: C.gold, weight: 500 });
  b += arrow(352, 348, 398, 323, { kind: "g", sw: 1.2 });
  b += arrow(352, 358, 398, 379, { kind: "g", sw: 1.2 });
  b += text(880, 428, "Cüzdan sorguya uyan belgeleri bulur; kişi hangisini göstereceğini seçer.", {
    anchor: "end", size: 11.5, italic: true, fill: C.muted,
  });
  save(6, svg(900, 442, b));
}

// ---------- Şekil 7: Digital Credentials API ----------
{
  let b = "";
  const S = 90, T = 270, O = 450, W = 630, D = 810;
  const top = 14, bottom = 520;
  b += lifelines(
    [
      { x: S, label: ["Yurdun sayfası"] },
      { x: T, label: ["Tarayıcı"] },
      { x: O, label: ["İşletim sistemi"] },
      { x: W, label: ["Cüzdan"], gold: true },
      { x: D, label: ["Doğrulayan", "sunucusu"] },
    ],
    top, bottom, 158,
  );
  b += msg(96, D, S, "1. OpenID4VP istek verisi (nonce, DCQL, şifreleme anahtarı)");
  b += msg(140, S, T, "2. credentials.get()");
  b += msg(184, T, O, "3. İstek + köken");
  b += act(O, 232, 160, ["4. Cüzdan seçimi", "(Aynur seçer)"]);
  b += msg(288, O, W, "5. İstek + köken");
  b += act(W, 342, 166, ["6. Köken kontrolü, onay,", "sunum (aud = origin:…)"]);
  b += msg(408, W, S, "7. Şifreli cevap (dc_api.jwt), aynı sekmeye döner", { kind: "g" });
  b += msg(462, S, D, "8. Cevabı iletir; sunucu kontrolleri yapar");
  b += box(176, 214, 186, 44, ["Köken bilgisini tarayıcı", "ekler; sayfa değiştiremez."], {
    size: 10.5, fill: C.gold50, stroke: C.gold, weight: 500,
  });
  save(7, svg(900, 530, b));
}

console.log("A8 şekilleri yazıldı:", out);

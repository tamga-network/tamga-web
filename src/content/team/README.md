# Ekip sayfası — nasıl güncellenir

Sayfalar: `/team` (ekip listesi) ve `/team/<slug>` (kişi profili), dört dilde (`en`, `tr`, `tk`, `az`).
Her kişi bu klasörde bir dosyadır: `berke-karatas.ts`, `turgay-gultekin.ts`. Alanların açıklaması `types.ts`'te.

**Kural:** yalnız kişinin kendisinin verdiği ve yayımlanmasına izin verdiği bilgi yazılır. Boş bırakılan alan
(eğitim, yazılar, yayınlar, bağlantılar) sayfada hiç görünmez; uydurma ya da tahmini bilgi yazılmaz.

## PDF (yayın / akademik çalışma) ekleme

Yayınlar kişi dosyasında değil, ortak katalogdadır: `src/content/publications/` (tipler `types.ts`). Her yayın hem
`/publications` (Akademik Çalışmalar) sayfasında hem de yazarlarının ekip profilinde görünür; bağlantı yazarın slug'ıdır.

1. PDF'i şu klasöre koy: `public/files/publications/<id>-<dil>.pdf` (ör. `evolution-of-digital-identity-tr.pdf`).
   - `<id>` küçük harf, İngilizce, tireli; Türkçe karakter ve boşluk yok. Her dil sürümü ayrı dosya.
   - PDF'in özelliklerinde (Dosya → Özellikler) kişisel bilgi, iç not ya da başka belge yolu kalmasın.
2. `src/content/publications/<id>.ts` dosyası aç ve `index.ts`'teki `PUBLICATIONS` listesine ekle:

```ts
import type { Publication } from "./types";

export const evolutionOfDigitalIdentity: Publication = {
  id: "evolution-of-digital-identity",
  authors: ["berke-karatas"],            // ekip üyesinin slug'ı (profile bağlanır); ekip dışı yazar: düz ad
  date: "2026-11-03",                    // ya da "2026-11"
  kind: "article",                       // article · paper · report · thesis · slides · whitepaper · other
  venue: { en: "Tamga Network Publications", tr: "Tamga Network Akademik Çalışmalar" }, // isteğe bağlı
  license: "CC BY 4.0",                  // isteğe bağlı
  versions: [                            // ilki asıl dil; her dil bir satır
    {
      lang: "tr",
      title: "Dijital Kimliğin Evrimi: …",  // o dildeki başlık
      file: "/files/publications/evolution-of-digital-identity-tr.pdf",
      abstract: "Türkçe kısa özet.",       // o dildeki özet (isteğe bağlı)
      pages: 28,                           // isteğe bağlı
      sizeKb: 840,                         // isteğe bağlı
      // url: "https://doi.org/…",         // dergi/DOI sayfası varsa
    },
    // { lang: "en", title: "The Evolution of Digital Identity: …", file: "/files/publications/evolution-of-digital-identity-en.pdf" },
  ],
};
```

Gösterim: başlık sayfanın dilindeki sürümden gelir (o dilde sürüm yoksa ilk sürümden); diğer dil sürümleri başlığın
yanında parantez içinde altı çizili bağlantı olur: "Dijital Kimliğin Evrimi (EN - TK - RU)". Kartta "PDF'i aç"
(tarayıcının kendi görüntüleyicisinde, yeni sekmede) ve "İndir" düğmeleri çıkar. Liste tarihe göre yeniden eskiye;
`/publications` sayfasında yıla göre gruplu. Dosyası ya da adresi olmayan yayın gösterilmez.

## Yazı ekleme (LinkedIn makalesi, blog yazısı …)

```ts
writings: [
  {
    title: "Yazının başlığı ya da ilk cümlesi",
    date: "2026-10-22",
    url: "https://www.linkedin.com/pulse/…",   // Tamga blogundaki yazı için: "/blog/<slug>"
    venue: "linkedin",                         // linkedin · tamga-blog · medium · journal · other
    lang: "tr",
  },
],
```

Adresi (`url`) boş olan yazı gösterilmez.

## Eğitim ve geçmiş

```ts
education: [
  { period: "2016 – 2020", title: { en: "BSc, Computer Engineering", tr: "Bilgisayar Mühendisliği, Lisans" }, place: "Üniversite adı" },
  // place dile göre de yazılabilir: place: { en: "Istanbul Bilgi University", tr: "İstanbul Bilgi Üniversitesi" }
],
experience: [
  { period: "2024 – bugün", title: { en: "…", tr: "…" }, place: "Kurum adı" },
],
```

## İlgi ve uzmanlık alanları

`focus` üst bölümde etiket olarak çıkar ("İlgi alanları"). `expertise` profilde "Uzmanlık alanları" bölümüdür: başlıklı etiket
grupları. Teknik adlar (eIDAS 2.0, SD-JWT VC, Python …) çevrilmez, yalnız `en` yazılır.

```ts
expertise: [
  { group: { en: "Digital identity", tr: "Dijital kimlik" }, items: [{ en: "eIDAS 2.0" }, { en: "SD-JWT VC" }] },
],
```

## Bağlantılar

```ts
links: {
  linkedin: "https://www.linkedin.com/in/…",
  github: "https://github.com/…",
  x: "https://x.com/…",
  email: "ad@tamga.network",
  // website, orcid, scholar da olabilir
},
```

## Fotoğraf

Kare, yüz ortada, en az 640×640. Üç biçim birlikte konur: `public/team/<slug>.avif`, `.webp`, `.jpg` (640×640; toplam
150 KB altı; konum/EXIF bilgisi silinmiş). Kişinin dosyasında `photo: { base: "<slug>", width: 640, height: 640, alt: {…} }`.
Fotoğraf yoksa kartta baş harfler görünür. Sitede fotoğraflar siyah-beyaz gösterilir, üstüne gelince renklenir (dosya renkli
kalır; dokunmatik ekranda hep renkli). Arka planda başka kurumun adı ya da tabelası görünmesin (gerekirse kırp, bulanıklaştır).

## Üyelik

Dernek ya da meslek kuruluşu üyeliği `memberships` listesine (boşsa bölüm görünmez):

```ts
memberships: [
  { name: { en: "Teknokratlar Association", tr: "Teknokratlar Derneği" }, role: { en: "Member", tr: "Üye" }, url: "https://…" },
],
```

`url` yalnız kurumun resmî sitesi doğrulanınca yazılır; özel ad korunur.

## Yeni kişi

1. `src/content/team/<slug>.ts` (var olan bir dosyayı kopyala).
2. `src/content/team/index.ts` içindeki `TEAM` listesine ekle.
3. `npm run check` ve `npm run build`.

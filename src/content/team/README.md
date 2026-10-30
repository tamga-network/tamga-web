# Ekip sayfası — nasıl güncellenir

Sayfalar: `/team` (ekip listesi) ve `/team/<slug>` (kişi profili), dört dilde (`en`, `tr`, `tk`, `az`).
Her kişi bu klasörde bir dosyadır: `berke-karatas.ts`, `turgay-gultekin.ts`. Alanların açıklaması `types.ts`'te.

**Kural:** yalnız kişinin kendisinin verdiği ve yayımlanmasına izin verdiği bilgi yazılır. Boş bırakılan alan
(eğitim, yazılar, yayınlar, bağlantılar) sayfada hiç görünmez; uydurma ya da tahmini bilgi yazılmaz.

## PDF (yayın / belge) ekleme

1. PDF'i şu klasöre koy: `public/files/team/<slug>/` (ör. `public/files/team/berke-karatas/`).
   - Dosya adı küçük harf, Türkçe karakter ve boşluk yok: `ab-uyumlu-guven-listeleri-2026.pdf`.
   - PDF'in özelliklerinde (Dosya → Özellikler) kişisel bilgi, iç not ya da başka belge yolu kalmasın.
2. Kişinin dosyasında `publications: []` listesine bir kayıt ekle:

```ts
publications: [
  {
    id: "ab-uyumlu-guven-listeleri-2026",
    title: "AB uyumlu güven listeleri: Türk dünyası için bir model", // belgenin kendi dilindeki başlığı
    authors: ["Berke Karataş"],          // birden çok yazar varsa hepsi
    date: "2026-11-15",                  // ya da "2026-11"
    kind: "paper",                       // article · paper · report · thesis · slides · whitepaper · other
    lang: "tr",                          // belgenin dili
    venue: "Konferans adı 2026",         // isteğe bağlı
    abstract: {                          // isteğe bağlı; en az "en", diğer diller eklenebilir
      en: "Short abstract in English.",
      tr: "Türkçe kısa özet.",
    },
    file: "/files/team/berke-karatas/ab-uyumlu-guven-listeleri-2026.pdf",
    pages: 12,                           // isteğe bağlı
    sizeKb: 840,                         // isteğe bağlı
    // url: "https://doi.org/…",         // dergi/DOI sayfası varsa
  },
],
```

Sayfada "PDF'i aç" (tarayıcının kendi görüntüleyicisinde, yeni sekmede) ve "İndir" düğmeleri çıkar. Liste tarihe göre yeniden
eskiye sıralanır.

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

## Yeni kişi

1. `src/content/team/<slug>.ts` (var olan bir dosyayı kopyala).
2. `src/content/team/index.ts` içindeki `TEAM` listesine ekle.
3. `npm run check` ve `npm run build`.

import type { Locale } from "@/i18n/routing";

/**
 * Marka sayfası (/brand) — Tamga Network'ün markası (2026-10-02): N1 işareti, Gök paleti, Onest + IBM Plex.
 * Logo dosyaları tek kaynaktan: çalışma alanı docs/brand/build-logo-kit.mjs → `npm run brand:sync` → public/brand/.
 * Renk değerleri src/app/globals.css ile aynıdır. Tamga Wallet'ın kendi markası (Al Kızıl, W2) cüzdan sitesindedir.
 */

type L = Record<Locale, string>;

/** Logo varyantları: zemin, işaret rengi, indirilebilir dosyalar (public/brand/). */
export type LogoVariant = {
  id: string;
  label: L;
  bg: string;
  fg: string;
  files: { file: string; kind: string }[];
};

export const LOGO_VARIANTS: LogoVariant[] = [
  {
    id: "gok-paper",
    label: {
      en: "Gök on paper — primary",
      tr: "Kâğıt üstünde Gök — ana kullanım",
      tk: "Kagyz üstünde Gök — esasy ulanyş",
      az: "Kağız üzərində Gök — əsas istifadə",
    },
    bg: "#F8F6F1",
    fg: "#1E5A78",
    files: [
      { file: "tamga-network.svg", kind: "SVG" },
      { file: "tamga-network-512.png", kind: "PNG 512" },
      { file: "tamga-network-1024.png", kind: "PNG 1024" },
    ],
  },
  {
    id: "black-paper",
    label: {
      en: "Black — one colour",
      tr: "Siyah — tek renk",
      tk: "Gara — bir reňk",
      az: "Qara — tək rəng",
    },
    bg: "#F8F6F1",
    fg: "#14120F",
    files: [
      { file: "tamga-network-black.svg", kind: "SVG" },
      { file: "tamga-network-black-512.png", kind: "PNG 512" },
      { file: "tamga-network-black-1024.png", kind: "PNG 1024" },
    ],
  },
  {
    id: "white-gok",
    label: {
      en: "White on Gök",
      tr: "Gök üstünde beyaz",
      tk: "Gök üstünde ak",
      az: "Gök üzərində ağ",
    },
    bg: "#1E5A78",
    fg: "#FFFFFF",
    files: [
      { file: "tamga-network-white.svg", kind: "SVG" },
      { file: "tamga-network-white-512.png", kind: "PNG 512" },
      { file: "tamga-network-white-1024.png", kind: "PNG 1024" },
    ],
  },
  {
    id: "light-ink",
    label: {
      en: "Light Gök on ink",
      tr: "Mürekkep üstünde açık Gök",
      tk: "Garaňky fonda açyk Gök",
      az: "Tünd fonda açıq Gök",
    },
    bg: "#101820",
    fg: "#6FB3D2",
    files: [{ file: "tamga-network-on-dark.svg", kind: "SVG" }],
  },
  {
    id: "white-ink",
    label: {
      en: "White on ink",
      tr: "Mürekkep üstünde beyaz",
      tk: "Garaňky fonda ak",
      az: "Tünd fonda ağ",
    },
    bg: "#101820",
    fg: "#FFFFFF",
    files: [
      { file: "tamga-network-white.svg", kind: "SVG" },
      { file: "tamga-network-white-512.png", kind: "PNG 512" },
    ],
  },
];

export const APP_ICON = {
  files: [
    { file: "tamga-network-app-icon.svg", kind: "SVG" },
    { file: "tamga-network-app-icon-512.png", kind: "PNG 512" },
  ],
};

/** Alternatif uygulama simgesi: obsidyen zemin, altın işaret (özel kullanımlar). */
export const APP_ICON_ALT = {
  files: [
    { file: "tamga-network-app-icon-obsidian.svg", kind: "SVG" },
    { file: "tamga-network-app-icon-obsidian-512.png", kind: "PNG 512" },
  ],
};

/** Logotip (işaret + ad yan yana; yazı çizgiye çevrilmiş). */
export type Lockup = {
  id: string;
  label: L;
  bg: string;
  file: string;
  vertical?: boolean;
  files: { file: string; kind: string }[];
};

const lockupFiles = (n: string) => [
  { file: `${n}.svg`, kind: "SVG" },
  { file: `${n}-1600.png`, kind: "PNG 1600" },
];

export const LOCKUPS: Lockup[] = [
  {
    id: "paper",
    label: {
      en: "On paper — primary",
      tr: "Kâğıt üstünde — ana kullanım",
      tk: "Kagyz üstünde — esasy ulanyş",
      az: "Kağız üzərində — əsas istifadə",
    },
    bg: "#F8F6F1",
    file: "tamga-network-lockup.svg",
    files: lockupFiles("tamga-network-lockup"),
  },
  {
    id: "dark",
    label: { en: "On ink", tr: "Mürekkep üstünde", tk: "Garaňky fonda", az: "Tünd fonda" },
    bg: "#101820",
    file: "tamga-network-lockup-on-dark.svg",
    files: lockupFiles("tamga-network-lockup-on-dark"),
  },
  {
    id: "black",
    label: {
      en: "Black — one colour",
      tr: "Siyah — tek renk",
      tk: "Gara — bir reňk",
      az: "Qara — tək rəng",
    },
    bg: "#F8F6F1",
    file: "tamga-network-lockup-black.svg",
    files: lockupFiles("tamga-network-lockup-black"),
  },
  {
    id: "white",
    label: {
      en: "White on Gök",
      tr: "Gök üstünde beyaz",
      tk: "Gök üstünde ak",
      az: "Gök üzərində ağ",
    },
    bg: "#1E5A78",
    file: "tamga-network-lockup-white.svg",
    files: lockupFiles("tamga-network-lockup-white"),
  },
  // Dikey logotip (işaret üstte, ad altta büyük harf ve geniş aralıkla) — dosyalar elle hazırlandı, docs/brand/logos'ta.
  {
    id: "vertical",
    label: {
      en: "Stacked — primary",
      tr: "Dikey — ana kullanım",
      tk: "Dik — esasy ulanyş",
      az: "Şaquli — əsas istifadə",
    },
    bg: "#F8F6F1",
    vertical: true,
    file: "tamga-network-lockup-vertical.svg",
    files: [
      { file: "tamga-network-lockup-vertical.svg", kind: "SVG" },
      { file: "tamga-network-lockup-vertical.png", kind: "PNG 2419" },
    ],
  },
  {
    id: "vertical-black",
    label: { en: "Stacked — black", tr: "Dikey — siyah", tk: "Dik — gara", az: "Şaquli — qara" },
    bg: "#F8F6F1",
    vertical: true,
    file: "tamga-network-lockup-vertical-black.svg",
    files: [
      { file: "tamga-network-lockup-vertical-black.svg", kind: "SVG" },
      { file: "tamga-network-lockup-vertical-black.png", kind: "PNG 2419" },
    ],
  },
  {
    id: "vertical-white",
    label: {
      en: "Stacked — white on ink",
      tr: "Dikey — mürekkep üstünde beyaz",
      tk: "Dik — garaňky fonda ak",
      az: "Şaquli — tünd fonda ağ",
    },
    bg: "#101820",
    vertical: true,
    file: "tamga-network-lockup-vertical-white.svg",
    files: [
      { file: "tamga-network-lockup-vertical-white.svg", kind: "SVG" },
      { file: "tamga-network-lockup-vertical-white.png", kind: "PNG 2419" },
    ],
  },
];

export type Swatch = {
  name: L;
  hex: string;
  rgb: string;
  role: L;
  note: L;
  text: string;
  border?: boolean;
};

export const SWATCHES: Swatch[] = [
  {
    name: { en: "Gök", tr: "Gök", tk: "Gök", az: "Gök" },
    hex: "#1E5A78",
    rgb: "30 90 120",
    role: {
      en: "Primary: the mark, buttons, links",
      tr: "Ana renk: işaret, düğmeler, bağlantılar",
      tk: "Esasy reňk: belgi, düwmeler, salgylar",
      az: "Əsas rəng: nişan, düymələr, keçidlər",
    },
    note: {
      en: "7.0 : 1 on paper · white on Gök 7.5 : 1",
      tr: "Kâğıtta 7,0 : 1 · Gök üstünde beyaz 7,5 : 1",
      tk: "Kagyzda 7,0 : 1 · Gök üstünde ak 7,5 : 1",
      az: "Kağızda 7,0 : 1 · Gök üzərində ağ 7,5 : 1",
    },
    text: "#FFFFFF",
  },
  {
    name: { en: "Light Gök", tr: "Açık Gök", tk: "Açyk Gök", az: "Açıq Gök" },
    hex: "#6FB3D2",
    rgb: "111 179 210",
    role: {
      en: "Gök on dark grounds",
      tr: "Koyu zeminde Gök",
      tk: "Garaňky fonda Gök",
      az: "Tünd fonda Gök",
    },
    note: {
      en: "7.7 : 1 on the deep band",
      tr: "Koyu bantta 7,7 : 1",
      tk: "Garaňky zolakda 7,7 : 1",
      az: "Tünd zolaqda 7,7 : 1",
    },
    text: "#101820",
  },
  {
    name: { en: "Ink", tr: "Mürekkep", tk: "Syýa", az: "Mürəkkəb" },
    hex: "#14120F",
    rgb: "20 18 15",
    role: {
      en: "Text and headings",
      tr: "Metin ve başlıklar",
      tk: "Tekst we sözbaşylar",
      az: "Mətn və başlıqlar",
    },
    note: {
      en: "17.3 : 1 on paper",
      tr: "Kâğıtta 17,3 : 1",
      tk: "Kagyzda 17,3 : 1",
      az: "Kağızda 17,3 : 1",
    },
    text: "#F8F6F1",
  },
  {
    name: { en: "Paper", tr: "Kâğıt", tk: "Kagyz", az: "Kağız" },
    hex: "#F8F6F1",
    rgb: "248 246 241",
    role: { en: "Page ground", tr: "Sayfa zemini", tk: "Sahypa fony", az: "Səhifə fonu" },
    note: {
      en: "Warm, never pure white",
      tr: "Sıcak; saf beyaz değil",
      tk: "Ýyly; arassa ak däl",
      az: "İsti; təmiz ağ deyil",
    },
    text: "#14120F",
    border: true,
  },
  {
    name: { en: "Deep band", tr: "Koyu bant", tk: "Garaňky zolak", az: "Tünd zolaq" },
    hex: "#101820",
    rgb: "16 24 32",
    role: {
      en: "Dark sections, footer, share images",
      tr: "Koyu bölümler, alt bilgi, paylaşım görselleri",
      tk: "Garaňky bölümler, aşaky bölüm, paýlaşma suratlary",
      az: "Tünd bölmələr, alt hissə, paylaşım şəkilləri",
    },
    note: {
      en: "White text 17.9 : 1",
      tr: "Beyaz metin 17,9 : 1",
      tk: "Ak tekst 17,9 : 1",
      az: "Ağ mətn 17,9 : 1",
    },
    text: "#F4F7F9",
  },
  {
    name: { en: "Rule", tr: "Çizgi", tk: "Çyzyk", az: "Xətt" },
    hex: "#E2DCCF",
    rgb: "226 220 207",
    role: {
      en: "Hairlines, table rules, borders",
      tr: "İnce çizgiler, tablo çizgileri, kenarlar",
      tk: "Inçe çyzyklar, tablisa çyzyklary, gyralar",
      az: "Nazik xətlər, cədvəl xətləri, kənarlar",
    },
    note: {
      en: "Structure, not text",
      tr: "Yapı içindir, metin için değil",
      tk: "Gurluş üçin, tekst üçin däl",
      az: "Struktur üçündür, mətn üçün deyil",
    },
    text: "#14120F",
  },
  {
    name: { en: "Gold", tr: "Altın", tk: "Altyn", az: "Qızıl" },
    hex: "#C8A24C",
    rgb: "200 162 76",
    role: {
      en: "Small accents only",
      tr: "Yalnız küçük vurgular",
      tk: "Diňe kiçi nygtamalar",
      az: "Yalnız kiçik vurğular",
    },
    note: {
      en: "Not for text on light (2.2 : 1); 7.4 : 1 on the deep band",
      tr: "Açık zeminde metin için değil (2,2 : 1); koyu bantta 7,4 : 1",
      tk: "Açyk fonda tekst üçin däl (2,2 : 1); garaňky zolakda 7,4 : 1",
      az: "Açıq fonda mətn üçün deyil (2,2 : 1); tünd zolaqda 7,4 : 1",
    },
    text: "#101820",
  },
];

export const FONTS = [
  {
    role: { en: "Display", tr: "Başlık", tk: "Sözbaşy", az: "Başlıq" },
    family: "Onest",
    cls: "font-serif",
    scripts: {
      en: "Latin · Cyrillic",
      tr: "Latin · Kiril",
      tk: "Latyn · Kiril",
      az: "Latın · Kiril",
    },
    weights: "500 · 600 · 700",
    url: "https://fonts.google.com/specimen/Onest",
  },
  {
    role: { en: "Text", tr: "Metin", tk: "Tekst", az: "Mətn" },
    family: "IBM Plex Sans",
    cls: "font-sans",
    scripts: {
      en: "Latin · Cyrillic",
      tr: "Latin · Kiril",
      tk: "Latyn · Kiril",
      az: "Latın · Kiril",
    },
    weights: "400 · 500 · 600",
    url: "https://fonts.google.com/specimen/IBM+Plex+Sans",
  },
  {
    role: {
      en: "Data and identifiers",
      tr: "Veri ve kimlikler",
      tk: "Maglumat we belgiler",
      az: "Məlumat və identifikatorlar",
    },
    family: "IBM Plex Mono",
    cls: "font-mono",
    scripts: {
      en: "Latin · Cyrillic",
      tr: "Latin · Kiril",
      tk: "Latyn · Kiril",
      az: "Latın · Kiril",
    },
    weights: "400 · 500",
    url: "https://fonts.google.com/specimen/IBM+Plex+Mono",
  },
];

/** Türk dünyasından örnek satırlar: başlık yazısı her alfabede aynı ağırlıkta durmalı. */
export const SAMPLES = [
  { lang: "Türkçe", text: "Güvenli belge, şeffaf ağ" },
  { lang: "Azərbaycan", text: "Etibarlı sənəd, şəffaf şəbəkə" },
  { lang: "Türkmen", text: "Ynamly resminama, açyk tor" },
  { lang: "Қазақ", text: "Сенімді құжат, ашық желі" },
];

export type BrandPage = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  nav: {
    logo: string;
    colour: string;
    type: string;
    name: string;
    button: string;
    use: string;
  };
  logo: {
    body: string;
    story: string;
    lockup: string;
    lockupBody: string;
    appIcon: string;
    appIconBody: string;
    appIconAlt: string;
    appIconAltBody: string;
    download: string;
    rulesLabel: string;
    rules: string[];
  };
  colour: { body: string; hex: string; rgb: string; contrast: string };
  type: {
    body: string;
    weights: string;
    scripts: string;
    licence: string;
    samplesLabel: string;
  };
  name: {
    body: string;
    rows: [string, string][];
    wrong: string[];
    wrongLabel: string;
    origin: string;
  };
  button: { body: string; label: string; rules: string[] };
  use: {
    body: string;
    ok: string[];
    okLabel: string;
    ask: string[];
    askLabel: string;
    contact: string;
  };
};

export const BRAND_PAGE: Record<Locale, BrandPage> = {
  en: {
    title: "Brand",
    description:
      "The Tamga Network mark, colours, typefaces and names — with every logo file to download and the rules for using them.",
    eyebrow: "Brand",
    lead: "One mark, one blue, three typefaces. Everything here can be downloaded and used to point to the network.",
    nav: {
      logo: "Logo",
      colour: "Colour",
      type: "Type",
      name: "Names",
      button: "Sign-in button",
      use: "Using the brand",
    },
    logo: {
      body: "The mark is a nested T: the outer T is the network, the two inner arms are the states and institutions that join it. It is cut like a seal — one stroke weight, one angle, no curves.",
      story: "A tamga is the seal of the steppe: the mark a clan pressed on what it vouched for.",
      lockup: "Logotype",
      lockupBody:
        "Two forms: horizontal, as in the site header, and stacked, with the mark above the name. The lettering is converted to outlines, so the files look the same without any typeface installed. Use the files as they are; don’t retype the name next to the mark.",
      appIcon: "App icon",
      appIconBody: "White mark on Gök, for app grids, browser tabs and bookmarks.",
      appIconAlt: "Alternative app icon",
      appIconAltBody: "Gold mark on obsidian, for special uses such as events and print. The Gök icon stays the default.",
      download: "Download",
      rulesLabel: "Rules",
      rules: [
        "Keep clear space of at least 15 % of the mark’s width on every side.",
        "Use the full mark everywhere — pages, headers, documents and icons at every size, including the browser tab.",
        "Use only the colours on this page: Gök, light Gök on dark, black or white.",
        "Don’t rotate, stretch or redraw the mark; don’t add shadows, outlines or gradients.",
        "Don’t place it on busy photos or grounds with weak contrast.",
      ],
    },
    colour: {
      body: "Gök carries the brand. Ink and paper do the reading; gold appears only in small accents. Contrast values are measured against WCAG 2.2.",
      hex: "HEX",
      rgb: "RGB",
      contrast: "Contrast",
    },
    type: {
      body: "Onest sets headings, IBM Plex Sans carries running text, IBM Plex Mono is for identifiers, hashes and code. All three cover Latin and Cyrillic, so every Turkic language reads in the same voice.",
      weights: "Weights",
      scripts: "Scripts",
      licence: "All three: SIL Open Font License 1.1",
      samplesLabel: "One headline, four alphabets",
    },
    name: {
      body: "The full name is Tamga Network. In running text, after the first mention, Tamga is enough.",
      rows: [
        ["Tamga Network", "the network: rules, trust lists, open packages, reference services"],
        ["Tamga Wallet", "the network’s first wallet — a separate product with its own brand"],
        ["Sign in with Tamga", "the sign-in button and flow"],
        ["Tamga Verify", "the hosted verifier"],
        ["Tamga ARF · Tamga Docs", "the reference framework · developer documentation"],
      ],
      wrongLabel: "Not",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin:
        "Tamga Network is the digital counterpart of the old seal: whoever vouches for something signs it, and anyone can check the signature.",
    },
    button: {
      body: "Sites that let people sign in with a wallet use one button, so it is recognised everywhere.",
      label: "Sign in with Tamga",
      rules: [
        "Label exactly “Sign in with Tamga” (or “Sign up with Tamga”), in the page’s language.",
        "Gök ground, white text, the small white mark on the left.",
        "Same height as the other sign-in buttons on the page; never smaller.",
      ],
    },
    use: {
      body: "Tamga’s texts are licensed CC BY 4.0. The Tamga name and mark are not covered by that licence.",
      okLabel: "Fine without asking",
      ok: [
        "linking to Tamga Network with the name or the mark",
        "the “Sign in with Tamga” button on your site",
        "saying that your service accepts or verifies credentials on Tamga Network",
        "articles and presentations about Tamga",
      ],
      askLabel: "Ask first",
      ask: [
        "anything that suggests Tamga endorses, certifies or partners with you",
        "the mark in your own product’s name, logo or app icon",
        "merchandise and printed material",
      ],
      contact: "Questions and permissions:",
    },
  },
  tr: {
    title: "Marka",
    description: "Tamga Network işareti, renkleri, yazı tipleri ve adları — bütün logo dosyaları ve kullanım kurallarıyla.",
    eyebrow: "Marka",
    lead: "Tek işaret, tek mavi, üç yazı tipi. Buradaki her şey indirilebilir ve ağa işaret etmek için kullanılabilir.",
    nav: {
      logo: "Logo",
      colour: "Renk",
      type: "Yazı",
      name: "Adlar",
      button: "Giriş düğmesi",
      use: "Kullanım",
    },
    logo: {
      body: "İşaret iç içe bir T’dir: dıştaki T ağ, içteki iki kol ağa katılan devletler ve kurumlar. Bir mühür gibi kesilmiştir — tek çizgi kalınlığı, tek açı, eğri yok.",
      story: "Tamga, bozkırın mührüdür: bir boyun kefil olduğu şeye bastığı işaret.",
      lockup: "Logotip",
      lockupBody:
        "İki biçim: yatay (site başlığındaki gibi) ve dikey (işaret üstte, ad altta). Yazılar çizgiye çevrildi; dosyalar yazı tipi kurulu olmadan da aynı görünür. Dosyaları olduğu gibi kullanın; işaretin yanına adı elle yeniden yazmayın.",
      appIcon: "Uygulama simgesi",
      appIconBody: "Gök üstünde beyaz işaret; uygulama ekranları, tarayıcı sekmeleri ve yer imleri için.",
      appIconAlt: "Alternatif uygulama simgesi",
      appIconAltBody:
        "Obsidyen üstünde altın işaret; etkinlik ve baskı gibi özel kullanımlar için. Varsayılan simge Gök olandır.",
      download: "İndir",
      rulesLabel: "Kurallar",
      rules: [
        "İşaretin her yanında, genişliğinin en az %15’i kadar boşluk bırakın.",
        "Her yerde tam işaret kullanılır: sayfalar, başlıklar, belgeler ve tarayıcı sekmesi dahil her boyuttaki simgeler.",
        "Yalnız bu sayfadaki renkleri kullanın: Gök, koyu zeminde açık Gök, siyah ya da beyaz.",
        "İşareti döndürmeyin, esnetmeyin, yeniden çizmeyin; gölge, dış çizgi ya da renk geçişi eklemeyin.",
        "Kalabalık fotoğrafların ya da zayıf kontrastlı zeminlerin üstüne koymayın.",
      ],
    },
    colour: {
      body: "Markayı Gök taşır. Okumayı mürekkep ve kâğıt yapar; altın yalnız küçük vurgularda görünür. Kontrast değerleri WCAG 2.2’ye göre ölçüldü.",
      hex: "HEX",
      rgb: "RGB",
      contrast: "Kontrast",
    },
    type: {
      body: "Başlıklarda Onest, metinde IBM Plex Sans, kimlik, özet ve kodda IBM Plex Mono. Üçü de Latin ve Kiril harflerini taşır; her Türk dili aynı sesle okunur.",
      weights: "Ağırlıklar",
      scripts: "Alfabeler",
      licence: "Üçü de: SIL Open Font License 1.1",
      samplesLabel: "Tek başlık, dört alfabe",
    },
    name: {
      body: "Tam ad Tamga Network’tür. Metin içinde ilk anıştan sonra Tamga yeterlidir.",
      rows: [
        ["Tamga Network", "ağ: kurallar, güven listeleri, açık paketler, referans hizmetler"],
        ["Tamga Wallet", "ağın ilk cüzdanı — kendi markası olan ayrı bir ürün"],
        ["Tamga ile giriş yap", "giriş düğmesi ve akışı"],
        ["Tamga Verify", "barındırılan doğrulayıcı"],
        ["Tamga ARF · Tamga Docs", "başvuru çerçevesi · geliştirici belgeleri"],
      ],
      wrongLabel: "Yanlış",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "Tamga Network eski mührün dijital karşılığıdır: bir şeye kefil olan onu imzalar, imzayı herkes denetleyebilir.",
    },
    button: {
      body: "Kişilerin cüzdanla giriş yapabildiği siteler tek bir düğme kullanır; her yerde tanınsın diye.",
      label: "Tamga ile giriş yap",
      rules: [
        "Etiket tam olarak “Tamga ile giriş yap” (ya da “Tamga ile kayıt ol”), sayfanın dilinde.",
        "Gök zemin, beyaz yazı, solda küçük beyaz işaret.",
        "Sayfadaki diğer giriş düğmeleriyle aynı yükseklikte; asla daha küçük değil.",
      ],
    },
    use: {
      body: "Tamga’nın metinleri CC BY 4.0 lisanslıdır. Tamga adı ve işareti bu lisansın kapsamında değildir.",
      okLabel: "Sormadan kullanabilirsiniz",
      ok: [
        "adla ya da işaretle Tamga Network’e bağlantı vermek",
        "sitenizde “Tamga ile giriş yap” düğmesi",
        "hizmetinizin Tamga Network’teki belgeleri kabul ettiğini ya da doğruladığını söylemek",
        "Tamga hakkında yazı ve sunumlar",
      ],
      askLabel: "Önce sorun",
      ask: [
        "Tamga’nın sizi onayladığını, belgelendirdiğini ya da ortağınız olduğunu düşündüren her şey",
        "işaretin kendi ürününüzün adında, logosunda ya da uygulama simgesinde kullanılması",
        "promosyon ürünleri ve basılı malzeme",
      ],
      contact: "Sorular ve izinler:",
    },
  },
  tk: {
    title: "Marka",
    description: "Tamga Network belgisi, reňkleri, şriftleri we atlary — ähli logo faýllary we ulanyş düzgünleri bilen.",
    eyebrow: "Marka",
    lead: "Bir belgi, bir gök reňk, üç şrift. Bu ýerdäki hemme zady göçürip alyp, tora salgylanmak üçin ulanyp bilersiňiz.",
    nav: {
      logo: "Logo",
      colour: "Reňk",
      type: "Şrift",
      name: "Atlar",
      button: "Giriş düwmesi",
      use: "Ulanyş",
    },
    logo: {
      body: "Belgi biri-biriniň içindäki T: daşky T tor, içki iki gol tora goşulýan döwletler we guramalar. Möhür ýaly kesilen — bir çyzyk galyňlygy, bir burç, egri ýok.",
      story: "Tamga — sähranyň möhri: tiräniň kepil geçen zadyna basýan belgisi.",
      lockup: "Logotip",
      lockupBody:
        "Iki görnüş: keseligine (saýtyň sözbaşysyndaky ýaly) we dik (belgi ýokarda, at aşakda). Ýazgylar çyzyga öwrüldi; faýllar şrift gurnalmadyk ýerde-de şol bir görünýär. Faýllary bolşy ýaly ulanyň; belginiň ýanyna ady elde täzeden ýazmaň.",
      appIcon: "Programma nyşany",
      appIconBody: "Gök üstünde ak belgi; programma ekranlary, brauzer goýmalary we bellikler üçin.",
      appIconAlt: "Goşmaça programma nyşany",
      appIconAltBody: "Obsidian üstünde altyn belgi; çäreler we çap ýaly aýratyn ulanyşlar üçin. Esasy nyşan Gök bolanydyr.",
      download: "Göçürip al",
      rulesLabel: "Düzgünler",
      rules: [
        "Belginiň her tarapynda iň az giňliginiň 15 %-i boşluk goýuň.",
        "Her ýerde doly belgi ulanylýar: sahypalar, sözbaşylar, resminamalar we brauzer goýmasy hem goşmak bilen ähli ölçegdäki nyşanlar.",
        "Diňe bu sahypadaky reňkleri ulanyň: Gök, garaňky fonda açyk Gök, gara ýa-da ak.",
        "Belgini öwürmäň, uzaltmaň, täzeden çyzmaň; kölege, gyra çyzygy ýa-da reňk geçişi goşmaň.",
        "Köp zatly suratlaryň ýa-da gowşak kontrastly fonlaryň üstünde goýmaň.",
      ],
    },
    colour: {
      body: "Markany Gök göterýär. Okamagy syýa we kagyz edýär; altyn diňe kiçi nygtamalarda görünýär. Kontrast bahalary WCAG 2.2 boýunça ölçeldi.",
      hex: "HEX",
      rgb: "RGB",
      contrast: "Kontrast",
    },
    type: {
      body: "Sözbaşylarda Onest, tekstde IBM Plex Sans, belgilerde, heşlerde we kodda IBM Plex Mono. Üçüsi hem Latyn we Kiril harplaryny göterýär; her türki dil şol bir ses bilen okalýar.",
      weights: "Galyňlyklar",
      scripts: "Elipbiýler",
      licence: "Üçüsi hem: SIL Open Font License 1.1",
      samplesLabel: "Bir sözbaşy, dört elipbiý",
    },
    name: {
      body: "Doly ady Tamga Network. Tekstde ilkinji agzalandan soň Tamga ýeterlikdir.",
      rows: [
        ["Tamga Network", "tor: düzgünler, ynam sanawlary, açyk paketler, salgylanma hyzmatlary"],
        ["Tamga Wallet", "toruň ilkinji gapjygy — öz markasy bolan aýratyn önüm"],
        ["Tamga bilen gir", "giriş düwmesi we akymy"],
        ["Tamga Verify", "ýerleşdirilen barlaýjy"],
        ["Tamga ARF · Tamga Docs", "salgylanma çarçuwasy · işläp düzüji resminamalary"],
      ],
      wrongLabel: "Nädogry",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "Tamga Network köne möhrüň sanly görnüşi: bir zada kepil geçýän ony gol çekýär, goly her kim barlap bilýär.",
    },
    button: {
      body: "Adamlaryň gapjyk bilen girip bilýän saýtlary bir düwme ulanýar; her ýerde tanalar ýaly.",
      label: "Tamga bilen gir",
      rules: [
        "Ýazgy takyk “Tamga bilen gir” (ýa-da “Tamga bilen hasaba dur”), sahypanyň dilinde.",
        "Gök fon, ak ýazgy, çepde kiçi ak belgi.",
        "Sahypadaky beýleki giriş düwmeleri bilen deň beýiklikde; hiç haçan kiçi däl.",
      ],
    },
    use: {
      body: "Tamganyň tekstleri CC BY 4.0 ygtyýarnamasy bilen. Tamga ady we belgisi bu ygtyýarnama girmeýär.",
      okLabel: "Soramazdan bolýar",
      ok: [
        "at ýa-da belgi bilen Tamga Network-e salgylanmak",
        "saýtyňyzda “Tamga bilen gir” düwmesi",
        "hyzmatyňyzyň Tamga Network-däki resminamalary kabul edýändigini ýa-da barlaýandygyny aýtmak",
        "Tamga barada makalalar we çykyşlar",
      ],
      askLabel: "Ilki soraň",
      ask: [
        "Tamganyň sizi tassyklaýandygyny, sertifikatlaýandygyny ýa-da hyzmatdaşdygyny aňladýan her zat",
        "belginiň öz önümiňiziň adynda, logosynda ýa-da programma nyşanynda ulanylmagy",
        "sowgat önümleri we çap materiallary",
      ],
      contact: "Soraglar we rugsatlar:",
    },
  },
  az: {
    title: "Brend",
    description: "Tamga Network-un nişanı, rəngləri, şriftləri və adları — bütün loqo faylları və istifadə qaydaları ilə.",
    eyebrow: "Brend",
    lead: "Bir nişan, bir mavi, üç şrift. Buradakı hər şeyi yükləyib şəbəkəyə istinad etmək üçün istifadə edə bilərsiniz.",
    nav: {
      logo: "Loqo",
      colour: "Rəng",
      type: "Şrift",
      name: "Adlar",
      button: "Giriş düyməsi",
      use: "Brendin istifadəsi",
    },
    logo: {
      body: "Nişan iç-içə T-dir: xarici T şəbəkədir, daxili iki qol isə ona qoşulan dövlətlər və qurumlardır. Möhür kimi kəsilib — bir xətt qalınlığı, bir bucaq, əyri yoxdur.",
      story: "Tamga çölün möhürüdür: tayfanın zəmanət verdiyi şeyin üzərinə basdığı nişan.",
      lockup: "Loqotip",
      lockupBody:
        "İki forma: üfüqi (saytın başlığındakı kimi) və şaquli (nişan yuxarıda, ad aşağıda). Yazılar konturlara çevrilib, ona görə fayllar heç bir şrift quraşdırılmadan da eyni görünür. Faylları olduğu kimi istifadə edin; adı nişanın yanında yenidən yazmayın.",
      appIcon: "Tətbiq ikonu",
      appIconBody: "Gök üzərində ağ nişan; tətbiq ekranları, brauzer tabları və əlfəcinlər üçün.",
      appIconAlt: "Alternativ tətbiq ikonu",
      appIconAltBody:
        "Obsidian üzərində qızıl nişan; tədbirlər və çap kimi xüsusi istifadələr üçün. Standart ikon Gök rəngli olaraq qalır.",
      download: "Yüklə",
      rulesLabel: "Qaydalar",
      rules: [
        "Nişanın hər tərəfində onun eninin ən azı 15 %-i qədər boş sahə saxlayın.",
        "Hər yerdə tam nişandan istifadə edin — səhifələrdə, başlıqlarda, sənədlərdə və brauzer tabı da daxil olmaqla hər ölçüdə ikonlarda.",
        "Yalnız bu səhifədəki rənglərdən istifadə edin: Gök, tünd fonda açıq Gök, qara və ya ağ.",
        "Nişanı döndərməyin, dartmayın və yenidən çəkməyin; kölgə, kontur və ya qradiyent əlavə etməyin.",
        "Onu qarışıq fotoşəkillərin və ya zəif kontrastlı fonların üzərində yerləşdirməyin.",
      ],
    },
    colour: {
      body: "Brendi Gök daşıyır. Oxunaqlılığı mürəkkəb və kağız təmin edir; qızıl yalnız kiçik vurğularda görünür. Kontrast dəyərləri WCAG 2.2-yə əsasən ölçülüb.",
      hex: "HEX",
      rgb: "RGB",
      contrast: "Kontrast",
    },
    type: {
      body: "Başlıqlar Onest ilə, əsas mətn IBM Plex Sans ilə yığılır; IBM Plex Mono identifikatorlar, heşlər və kod üçündür. Hər üçü latın və kiril əlifbalarını əhatə edir, beləliklə hər bir türk dili eyni səslə oxunur.",
      weights: "Qalınlıqlar",
      scripts: "Əlifbalar",
      licence: "Hər üçü: SIL Open Font License 1.1",
      samplesLabel: "Bir başlıq, dörd əlifba",
    },
    name: {
      body: "Tam ad Tamga Network-dur. Mətndə ilk qeyddən sonra Tamga kifayətdir.",
      rows: [
        ["Tamga Network", "şəbəkə: qaydalar, etibar siyahıları, açıq paketlər, istinad xidmətləri"],
        ["Tamga Wallet", "şəbəkənin ilk rəqəmsal cüzdanı — öz brendi olan ayrıca məhsul"],
        ["Tamga ilə daxil olun", "giriş düyməsi və prosesi"],
        ["Tamga Verify", "host edilən yoxlayan tərəf xidməti"],
        ["Tamga ARF · Tamga Docs", "istinad çərçivəsi · tərtibatçı sənədləri"],
      ],
      wrongLabel: "Yanlış",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "Tamga Network qədim möhürün rəqəmsal qarşılığıdır: bir şeyə zəmanət verən onu imzalayır, imzanı isə hər kəs yoxlaya bilər.",
    },
    button: {
      body: "İnsanların rəqəmsal cüzdanla daxil ola bildiyi saytlar hər yerdə tanınsın deyə vahid düymədən istifadə edir.",
      label: "Tamga ilə daxil olun",
      rules: [
        "Etiket dəqiq “Tamga ilə daxil olun” (və ya “Tamga ilə qeydiyyatdan keçin”) olmalıdır, səhifənin dilində.",
        "Gök fon, ağ mətn, solda kiçik ağ nişan.",
        "Səhifədəki digər giriş düymələri ilə eyni hündürlükdə; heç vaxt daha kiçik deyil.",
      ],
    },
    use: {
      body: "Tamga-nın mətnləri CC BY 4.0 lisenziyası ilə yayılır. Tamga adı və nişanı bu lisenziyaya daxil deyil.",
      okLabel: "İcazə almadan istifadə edə bilərsiniz",
      ok: [
        "ad və ya nişanla Tamga Network-a keçid vermək",
        "saytınızda “Tamga ilə daxil olun” düyməsi",
        "xidmətinizin Tamga Network-dakı rəqəmsal sənədləri qəbul etdiyini və ya yoxladığını bildirmək",
        "Tamga haqqında məqalələr və təqdimatlar",
      ],
      askLabel: "Əvvəlcə soruşun",
      ask: [
        "Tamga-nın sizi təsdiqlədiyini, sertifikatlaşdırdığını və ya sizinlə tərəfdaş olduğunu düşündürən hər şey",
        "nişanın öz məhsulunuzun adında, loqosunda və ya tətbiq ikonunda istifadəsi",
        "promosyon məhsulları və çap materialları",
      ],
      contact: "Suallar və icazələr:",
    },
  },
};

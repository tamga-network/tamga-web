import type { Locale } from "@/i18n/routing";

/**
 * Marka sayfası (/brand) — ad, logo, renkler, yazılar, "Tamga ile giriş yap" düğmesi, indirmeler, kullanım izni.
 * Renk ve yazı değerleri tek tablodan: src/app/globals.css ve tamga-network/ops/brand (tamga-ui.css, logo/, icons/).
 * Logo değişince yalnız bu sayfanın görselleri değişir (LogoMark + public/ dosyaları); metin aynı kalır.
 */

type L = Record<Locale, string>;

export type Swatch = { name: L; hex: string; rgb: string; use: L; on: "light" | "dark"; core: boolean };

export const SWATCHES: Swatch[] = [
  {
    name: { en: "Al Kızıl", tr: "Al Kızıl", tk: "Al Kızıl" },
    hex: "#B01E22",
    rgb: "176 30 34",
    use: {
      en: "The seal glyph, primary buttons, links on light grounds.",
      tr: "Mühür işareti, birincil düğmeler, açık zeminde bağlantılar.",
      tk: "Möhür belgisi, esasy düwmeler, açyk fonda salgylar.",
    },
    on: "dark",
    core: true,
  },
  {
    name: { en: "Altın", tr: "Altın", tk: "Altın" },
    hex: "#C8A24C",
    rgb: "200 162 76",
    use: {
      en: "The seal frame, highlights, small labels. Not for body text on light grounds.",
      tr: "Mühür çerçevesi, vurgular, küçük etiketler. Açık zeminde gövde metni için değil.",
      tk: "Möhür çarçuwasy, nygtamalar, kiçi bellikler. Açyk fonda esasy tekst üçin däl.",
    },
    on: "dark",
    core: true,
  },
  {
    name: { en: "Obsidyen", tr: "Obsidyen", tk: "Obsidyen" },
    hex: "#17110F",
    rgb: "23 17 15",
    use: {
      en: "Dark ground (dark theme, app icon, share images); text colour on light grounds.",
      tr: "Koyu zemin (koyu tema, uygulama simgesi, paylaşım görselleri); açık zeminde metin rengi.",
      tk: "Garaňky fon (garaňky tema, programma nyşany, paýlaşma suratlary); açyk fonda tekst reňki.",
    },
    on: "dark",
    core: true,
  },
  {
    name: { en: "Parşömen", tr: "Parşömen", tk: "Parşömen" },
    hex: "#F4EDE2",
    rgb: "244 237 226",
    use: {
      en: "Light surfaces and cards; text colour on dark grounds.",
      tr: "Açık yüzeyler ve kartlar; koyu zeminde metin rengi.",
      tk: "Açyk üstler we kartlar; garaňky fonda tekst reňki.",
    },
    on: "light",
    core: true,
  },
  {
    name: { en: "Göktürk blue", tr: "Göktürk mavisi", tk: "Göktürk gök reňki" },
    hex: "#2A6F8E",
    rgb: "42 111 142",
    use: {
      en: "Secondary accent: information, diagrams, the “verification” side.",
      tr: "İkincil vurgu: bilgi, şemalar, “doğrulama” tarafı.",
      tk: "Ikinji nygtama: maglumat, çyzgylar, “barlag” tarapy.",
    },
    on: "dark",
    core: false,
  },
];

/** Koyu zeminde metin için açık tonlar (WCAG AA kontrastı); çekirdek değerler işaret ve dolgularda kalır. */
export const TINTS = [
  { of: "Al Kızıl", hex: "#E0554B" },
  { of: "Altın", hex: "#E0BF6F" },
  { of: "Göktürk", hex: "#4D9EC0" },
];

export const FONTS = [
  {
    role: { en: "Headings", tr: "Başlıklar", tk: "Sözbaşylar" },
    family: "Sora",
    cls: "font-serif",
    sample: { en: "Trust you can verify", tr: "Doğrulanabilir güven", tk: "Barlap bolýan ynam" },
    weights: "500 · 600 · 700",
    url: "https://fonts.google.com/specimen/Sora",
  },
  {
    role: { en: "Body text", tr: "Gövde metni", tk: "Esasy tekst" },
    family: "IBM Plex Sans",
    cls: "font-sans",
    sample: {
      en: "The wallet shows only the fields you approve.",
      tr: "Cüzdan yalnız onayladığın alanları gösterir.",
      tk: "Gapjyk diňe siziň tassyklan meýdanlaryňyzy görkezýär.",
    },
    weights: "400 · 500 · 600",
    url: "https://fonts.google.com/specimen/IBM+Plex+Sans",
  },
  {
    role: { en: "Code and labels", tr: "Kod ve etiketler", tk: "Kod we bellikler" },
    family: "IBM Plex Mono",
    cls: "font-mono",
    sample: { en: "urn:tamga:edu:DiplomaCredential:1", tr: "urn:tamga:edu:DiplomaCredential:1", tk: "urn:tamga:edu:DiplomaCredential:1" },
    weights: "400 · 500",
    url: "https://fonts.google.com/specimen/IBM+Plex+Mono",
  },
];

export const DOWNLOADS = [
  { file: "mark.svg", label: { en: "Seal — vector (SVG)", tr: "Mühür — vektör (SVG)", tk: "Möhür — wektor (SVG)" } },
  { file: "icon.svg", label: { en: "App icon — vector (SVG)", tr: "Uygulama simgesi — vektör (SVG)", tk: "Programma nyşany — wektor (SVG)" } },
  { file: "logo-512.png", label: { en: "Seal on Obsidyen — 512 px (PNG)", tr: "Obsidyen zeminde mühür — 512 px (PNG)", tk: "Obsidyen fonda möhür — 512 px (PNG)" } },
  { file: "icon-512.png", label: { en: "Rounded icon — 512 px (PNG)", tr: "Yuvarlak köşeli simge — 512 px (PNG)", tk: "Tegelek burçly nyşan — 512 px (PNG)" } },
  { file: "og.png", label: { en: "Share image — 1200×630 (PNG)", tr: "Paylaşım görseli — 1200×630 (PNG)", tk: "Paýlaşma suraty — 1200×630 (PNG)" } },
];

export type BrandPage = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  nav: { name: string; logo: string; colour: string; type: string; button: string; downloads: string; use: string };
  name: { body: string; rows: [string, string][]; wrong: string[]; wrongLabel: string; origin: string };
  logo: { body: string; onDark: string; onLight: string; mono: string; lockup: string; space: string; min: string; dont: string[]; dontLabel: string };
  colour: { body: string; core: string; secondary: string; tints: string; tintsBody: string; copy: string };
  type: { body: string; weights: string; licence: string };
  button: { body: string; label: string; rules: string[] };
  downloads: { body: string };
  use: { body: string; ok: string[]; okLabel: string; ask: string[]; askLabel: string; contact: string };
};

export const BRAND_PAGE: Record<Locale, BrandPage> = {
  en: {
    title: "Brand",
    description: "The Tamga Network name, seal, colours, typefaces and the “Sign in with Tamga” button — how to use them, with downloads.",
    eyebrow: "Brand",
    lead: "The seal, the colours and the type that make Tamga recognisable — and the few rules that keep them that way.",
    nav: { name: "Name", logo: "Seal", colour: "Colour", type: "Type", button: "Sign-in button", downloads: "Downloads", use: "Using the brand" },
    name: {
      body: "The full name is Tamga Network. In running text, after the first mention, Tamga is enough.",
      rows: [
        ["Tamga Network", "the infrastructure, the organisation"],
        ["Tamga Wallet", "the wallet app"],
        ["Sign in with Tamga", "the sign-in button and flow"],
        ["Institution Console", "the tool institutions use to issue credentials"],
        ["Tamga Docs · Tamga ARF", "developer documentation · the reference framework"],
      ],
      wrongLabel: "Not",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "A tamga is the seal of the steppe: the mark a clan pressed on what it vouched for. Tamga Network is its digital counterpart.",
    },
    logo: {
      body: "The seal is a gold hexagon — the frame of a seal stamp — around a red tamga glyph. It is drawn from one source file; every icon and share image is generated from it.",
      onDark: "On Obsidyen",
      onLight: "On Parşömen",
      mono: "One colour",
      lockup: "With the name",
      space: "Clear space: at least a quarter of the seal’s width on every side.",
      min: "Smallest size: 16 px for the seal alone, 24 px when set with the name.",
      dontLabel: "Please don’t",
      dont: [
        "rotate, stretch or skew the seal",
        "change its colours or add gradients, shadows or outlines",
        "put it on a busy photo or a ground with weak contrast",
        "combine it with another mark so that it reads as one logo",
        "redraw the glyph or set “Tamga” in another typeface next to it",
      ],
    },
    colour: {
      body: "Four core colours come from the seal itself; one secondary colour carries information.",
      core: "Core",
      secondary: "Secondary",
      tints: "Tints for dark grounds",
      tintsBody: "On Obsidyen, red and gold text uses a lighter tint so it stays readable (WCAG AA). The core values stay for the seal and for fills.",
      copy: "Copy",
    },
    type: {
      body: "Sora sets headings; IBM Plex Sans carries all running text; IBM Plex Mono is for code, identifiers and small labels. All three are free under the SIL Open Font License.",
      weights: "Weights",
      licence: "SIL Open Font License 1.1",
    },
    button: {
      body: "Sites that let people sign in with their wallet use one button, so it is recognised everywhere.",
      label: "Sign in with Tamga",
      rules: [
        "Label exactly “Sign in with Tamga” (or “Sign up with Tamga”), in the page’s language.",
        "Al Kızıl ground, white text, the one-colour seal on the left.",
        "Same height as the other sign-in buttons on the page; never smaller.",
      ],
    },
    downloads: { body: "Vector and bitmap files, generated from the same source as the site." },
    use: {
      body: "Tamga’s texts are licensed CC BY 4.0. The Tamga name and the seal are not covered by that licence.",
      okLabel: "Fine without asking",
      ok: [
        "linking to Tamga with the name or the seal",
        "the “Sign in with Tamga” button on your site",
        "saying that your service accepts or verifies Tamga credentials",
        "articles and presentations about Tamga",
      ],
      askLabel: "Ask first",
      ask: [
        "anything that suggests Tamga endorses, certifies or partners with you",
        "the seal in your own product’s name, logo or app icon",
        "merchandise and printed material",
      ],
      contact: "Questions and permissions:",
    },
  },
  tr: {
    title: "Marka",
    description: "Tamga Network adı, mührü, renkleri, yazı tipleri ve “Tamga ile giriş yap” düğmesi — nasıl kullanılır, indirilebilir dosyalar.",
    eyebrow: "Marka",
    lead: "Tamga’yı tanınır kılan mühür, renkler ve yazılar — ve onları öyle tutan birkaç kural.",
    nav: { name: "Ad", logo: "Mühür", colour: "Renk", type: "Yazı", button: "Giriş düğmesi", downloads: "İndir", use: "Kullanım" },
    name: {
      body: "Tam ad Tamga Network’tür. Metin içinde ilk anıştan sonra Tamga yeterlidir.",
      rows: [
        ["Tamga Network", "altyapı, kuruluş"],
        ["Tamga Wallet", "cüzdan uygulaması"],
        ["Tamga ile giriş yap", "giriş düğmesi ve akışı"],
        ["Kurum Konsolu", "kurumların belge verdiği araç"],
        ["Tamga Docs · Tamga ARF", "geliştirici belgeleri · başvuru çerçevesi"],
      ],
      wrongLabel: "Yanlış",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "Tamga, bozkırın mührüdür: bir boyun kefil olduğu şeye bastığı işaret. Tamga Network onun dijital karşılığıdır.",
    },
    logo: {
      body: "Mühür, kırmızı bir tamga işaretini çevreleyen altın bir altıgendir — bir mühür damgasının çerçevesi. Tek bir kaynak dosyadan çizilir; bütün simgeler ve paylaşım görselleri ondan üretilir.",
      onDark: "Obsidyen üzerinde",
      onLight: "Parşömen üzerinde",
      mono: "Tek renk",
      lockup: "Adla birlikte",
      space: "Boşluk: her yanda en az mührün genişliğinin dörtte biri.",
      min: "En küçük boy: mühür tek başına 16 px, adla birlikte 24 px.",
      dontLabel: "Lütfen yapmayın",
      dont: [
        "mührü döndürmek, esnetmek, eğmek",
        "renklerini değiştirmek; degrade, gölge ya da dış çizgi eklemek",
        "kalabalık bir fotoğrafın ya da zayıf kontrastlı bir zeminin üstüne koymak",
        "başka bir işaretle tek logo gibi okunacak biçimde birleştirmek",
        "işareti yeniden çizmek ya da yanına “Tamga”yı başka yazı tipiyle yazmak",
      ],
    },
    colour: {
      body: "Dört ana renk mührün kendisinden gelir; bir ikincil renk bilgiyi taşır.",
      core: "Ana renkler",
      secondary: "İkincil",
      tints: "Koyu zemin için açık tonlar",
      tintsBody: "Obsidyen üzerinde kırmızı ve altın metin, okunur kalsın diye açık tonuyla yazılır (WCAG AA). Ana değerler mühürde ve dolgularda kalır.",
      copy: "Kopyala",
    },
    type: {
      body: "Başlıklar Sora ile; bütün metin IBM Plex Sans ile; kod, tanımlayıcılar ve küçük etiketler IBM Plex Mono ile yazılır. Üçü de SIL Open Font License ile ücretsizdir.",
      weights: "Kalınlıklar",
      licence: "SIL Open Font License 1.1",
    },
    button: {
      body: "Kişilerin cüzdanlarıyla giriş yaptığı siteler tek bir düğme kullanır; böylece her yerde tanınır.",
      label: "Tamga ile giriş yap",
      rules: [
        "Etiket tam olarak “Tamga ile giriş yap” (ya da “Tamga ile kayıt ol”), sayfanın dilinde.",
        "Al Kızıl zemin, beyaz yazı, solda tek renk mühür.",
        "Sayfadaki diğer giriş düğmeleriyle aynı yükseklik; asla daha küçük değil.",
      ],
    },
    downloads: { body: "Siteyle aynı kaynaktan üretilmiş vektör ve bitmap dosyalar." },
    use: {
      body: "Tamga’nın metinleri CC BY 4.0 lisanslıdır. Tamga adı ve mühür bu lisansın kapsamında değildir.",
      okLabel: "Sormadan kullanabilirsiniz",
      ok: [
        "adla ya da mühürle Tamga’ya bağlantı vermek",
        "sitenizde “Tamga ile giriş yap” düğmesi",
        "hizmetinizin Tamga belgelerini kabul ettiğini ya da doğruladığını söylemek",
        "Tamga hakkında yazı ve sunumlar",
      ],
      askLabel: "Önce sorun",
      ask: [
        "Tamga’nın sizi onayladığı, sertifikalandırdığı ya da ortağınız olduğu izlenimi veren her şey",
        "mührün kendi ürününüzün adında, logosunda ya da uygulama simgesinde kullanılması",
        "promosyon ürünleri ve basılı malzeme",
      ],
      contact: "Sorular ve izinler:",
    },
  },
  tk: {
    title: "Marka",
    description: "Tamga Network ady, möhüri, reňkleri, şriftleri we “Tamga bilen gir” düwmesi — nähili ulanmaly, ýüklenip alynýan faýllar.",
    eyebrow: "Marka",
    lead: "Tamga-ny tanalýan edýän möhür, reňkler we şriftler — we olary şeýle saklaýan birnäçe düzgün.",
    nav: { name: "At", logo: "Möhür", colour: "Reňk", type: "Şrift", button: "Giriş düwmesi", downloads: "Ýükle", use: "Ulanyş" },
    name: {
      body: "Doly ady Tamga Network. Tekstde ilkinji agzalandan soň Tamga ýeterlik.",
      rows: [
        ["Tamga Network", "infrastruktura, gurama"],
        ["Tamga Wallet", "gapjyk programmasy"],
        ["Tamga bilen gir", "giriş düwmesi we akymy"],
        ["Gurama konsoly", "guramalaryň resminama berýän guraly"],
        ["Tamga Docs · Tamga ARF", "işläp düzüji resminamalary · salgylanma çarçuwasy"],
      ],
      wrongLabel: "Nädogry",
      wrong: ["TamgaNetwork", "TAMGA", "Tamga network", "TamgaID"],
      origin: "Tamga — sähranyň möhüri: bir tiräniň kepil geçen zadyna basýan belgisi. Tamga Network onuň sanly deňi.",
    },
    logo: {
      body: "Möhür — gyzyl tamga belgisini gurşap alýan altyn altyburç: möhür basgysynyň çarçuwasy. Bir çeşme faýldan çyzylýar; ähli nyşanlar we paýlaşma suratlary şondan döredilýär.",
      onDark: "Obsidyen üstünde",
      onLight: "Parşömen üstünde",
      mono: "Bir reňk",
      lockup: "At bilen",
      space: "Boş ýer: her tarapda möhüriň giňliginiň azyndan dörtden biri.",
      min: "Iň kiçi ölçeg: ýeke möhür 16 px, at bilen 24 px.",
      dontLabel: "Haýyş, etmäň",
      dont: [
        "möhüri aýlamak, uzaltmak ýa-da egmek",
        "reňklerini üýtgetmek; gradiýent, kölege ýa-da daş çyzyk goşmak",
        "köp zatly surata ýa-da gowşak kontrastly fona goýmak",
        "başga belgi bilen bir logo ýaly okalar ýaly birleşdirmek",
        "belgini täzeden çyzmak ýa-da ýanynda “Tamga” sözüni başga şrift bilen ýazmak",
      ],
    },
    colour: {
      body: "Dört esasy reňk möhüriň özünden gelýär; bir ikinji reňk maglumaty göterýär.",
      core: "Esasy reňkler",
      secondary: "Ikinji",
      tints: "Garaňky fon üçin açyk öwüşginler",
      tintsBody: "Obsidyen üstünde gyzyl we altyn tekst okalar ýaly açyk öwüşgini bilen ýazylýar (WCAG AA). Esasy bahalar möhürde we doldurmalarda galýar.",
      copy: "Göçür",
    },
    type: {
      body: "Sözbaşylar Sora bilen; ähli tekst IBM Plex Sans bilen; kod, kesgitleýjiler we kiçi bellikler IBM Plex Mono bilen ýazylýar. Üçüsi hem SIL Open Font License bilen mugt.",
      weights: "Galyňlyklar",
      licence: "SIL Open Font License 1.1",
    },
    button: {
      body: "Adamlaryň gapjygy bilen girýän saýtlary bir düwme ulanýar; şeýdip ol her ýerde tanalýar.",
      label: "Tamga bilen gir",
      rules: [
        "Ýazgy takyk “Tamga bilen gir” (ýa-da “Tamga bilen hasaba dur”), sahypanyň dilinde.",
        "Al Kızıl fon, ak ýazgy, çepde bir reňkli möhür.",
        "Sahypadaky beýleki giriş düwmeleri bilen deň beýiklik; hiç haçan kiçi däl.",
      ],
    },
    downloads: { body: "Saýt bilen bir çeşmeden döredilen wektor we bitmap faýllar." },
    use: {
      body: "Tamga-nyň tekstleri CC BY 4.0 ygtyýarnamasy bilen. Tamga ady we möhür bu ygtyýarnama girmeýär.",
      okLabel: "Soramazdan ulanyp bilersiňiz",
      ok: [
        "at ýa-da möhür bilen Tamga salgy bermek",
        "saýtyňyzda “Tamga bilen gir” düwmesi",
        "hyzmatyňyzyň Tamga resminamalaryny kabul edýändigini ýa-da barlaýandygyny aýtmak",
        "Tamga barada makalalar we çykyşlar",
      ],
      askLabel: "Ilki soraň",
      ask: [
        "Tamga-nyň sizi goldaýandygy, sertifikatlaşdyrýandygy ýa-da hyzmatdaşdygy ýaly täsir galdyrýan her zat",
        "möhüri öz önümiňiziň adynda, logotipinde ýa-da programma nyşanynda ulanmak",
        "sowgat önümleri we çap materiallary",
      ],
      contact: "Soraglar we rugsatlar:",
    },
  },
};

// -----------------------------------------------------------------------------
// Content-Security-Policy (tek kaynak: proxy.ts sayfalar için, next.config.ts dosyalar için kullanır)
// -----------------------------------------------------------------------------
// Sayfalar (HTML) istek başına yeni bir nonce alır (src/proxy.ts). Next.js render sırasında başlıktaki 'nonce-…' değerini
// okur ve kendi betiklerine (çerçeve, sayfa parçaları, satır içi önyükleme) ve ürettiği <style> etiketlerine ekler.
//   - script-src 'nonce-…' 'strict-dynamic' → yalnız bu yanıtın betikleri ve onların yüklediği parçalar çalışır;
//     'unsafe-inline' YOK. ('self' strict-dynamic destekleyen tarayıcılarda yok sayılır; eskiler için duruyor.)
//   - style-src-elem 'self' 'nonce-…' → <style>/<link rel=stylesheet> yalnız kendi dosyalarımız ve nonce'lu etiketler.
//   - style-src-attr 'unsafe-inline' → style="…" öznitelikleri (framer-motion, style={{}}, shiki renkleri). Öznitelik
//     stili betik çalıştıramaz; kalan tek gevşeklik budur.
//   - img 'self' data: blob: → SVG data-URI'ler, flag-icons. font 'self' data: → kendi woff2'lerimiz.
//   - connect 'self' → RSC gezinme istekleri. frame-ancestors 'none' → tıklama hırsızlığına karşı.
// Dış bir hizmet (analitik, gömülü içerik) eklenirse ilgili yönergeyi burada genişlet.
//
// Yalnız geliştirmede: Turbopack + React geliştirme araçları eval() ve WebAssembly ister; stil için 'unsafe-inline'
// (HMR stilleri nonce'suz enjekte eder). Üretim paketinde bunların hiçbiri yoktur.
const isDev = process.env.NODE_ENV !== "production";

/** Sayfa (HTML) yanıtları için CSP; `nonce` her istek için yeni, tahmin edilemez bir değer olmalı. */
export function pageCsp(nonce: string): string {
  const devScript = isDev ? " 'unsafe-eval' 'wasm-unsafe-eval'" : "";
  const styleElem = isDev ? "'self' 'unsafe-inline'" : `'self' 'nonce-${nonce}'`;
  return [
    "default-src 'self'",
    "base-uri 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${devScript}`,
    `style-src ${styleElem}`,
    `style-src-elem ${styleElem}`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/**
 * Proxy'den geçmeyen yanıtlar (/_next/static, public/ dosyaları, robots/sitemap, og.png, rss.xml) için sabit CSP. Bunlar
 * belge olarak açılırsa (ör. doğrudan bir SVG) hiçbir betik çalışmaz. Sayfalara uygulanmaz (next.config.ts).
 */
export const ASSET_CSP = [
  "default-src 'none'",
  "img-src 'self' data:",
  "style-src 'unsafe-inline'",
  "font-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join("; ");

/** 128 bit rastgele nonce (base64). */
export function newNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

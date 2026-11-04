import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { ASSET_CSP } from "./src/lib/csp";

const withNextIntl = createNextIntlPlugin();

// Content-Security-Policy: src/lib/csp.ts. Sayfalar istek başına nonce'lu CSP'yi proxy'den (src/proxy.ts) alır; burada
// yalnız proxy'den geçmeyen dosya yanıtlarına (/_next, public/, robots/sitemap, og.png…) sabit, betiksiz bir CSP verilir.
// İkisi aynı yanıtta birleşmesin diye sayfalara burada CSP yazılmaz (iki CSP başlığı tarayıcıda kesişir).
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains (submit to hstspreload.org later).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework/version.
  poweredByHeader: false,

  async headers() {
    const assetCsp = [{ key: "Content-Security-Policy", value: ASSET_CSP }];
    return [
      { source: "/:path*", headers: securityHeaders },
      // Proxy eşleştiricisinin dışarıda bıraktığı yollar (src/proxy.ts `config.matcher`): _next ve uzantılı dosyalar.
      { source: "/_next/:path*", headers: assetCsp },
      { source: "/:file(.*\\.[A-Za-z0-9]+)", headers: assetCsp },
    ];
  },

  // Kaldırılan sayfalar (2026-10-01, eski tasarım / ADR-0035 temizliği) → en yakın güncel sayfa; arama motorları 404 görmesin.
  async redirects() {
    const moved: [string, string][] = [
      // Eski /docs/* sayfaları (2026-10-01'de kaldırıldı) → bugünkü /learn sayfası; kalanlar aşağıdaki catch-all ile /learn'e.
      ["/docs/identity-layers", "/learn/unlinkability"],
      ["/docs/login-with-tamga", "/learn/unlinkability"],
      ["/docs/accountable-disclosure", "/learn/selective-disclosure"],
      ["/docs/recovery-revocation", "/learn/revocation"],
      ["/docs/how-tamga-works", "/learn/what-is-tamga-network"],
      ["/docs/eudi-comparison", "/learn/roles"],
      ["/docs/roles", "/learn/roles"],
      ["/blog/roadmap-turkic-world", "/roadmap"],
      ["/blog/authorization-not-settlement", "/blog"],
      ["/blog/accountable-disclosure", "/blog"],
      ["/issuers", "/join"], // 2026-10-02: "Kurum olarak katıl" → "Ağa katıl"
      // 2026-10-06: 24 Eylül öncesi tasarımı anlatan blog yazıları kaldırıldı → konuyu bugün anlatan sayfa
      ["/blog/selective-disclosure-zk", "/learn/selective-disclosure"],
      ["/blog/sovereignty-first-governance", "/learn/governance"],
      ["/blog/why-besu-qbft", "/blog/why-no-blockchain-yet"],
      ["/blog/x509-institutional-identity", "/learn/certificates"],
      ["/blog/introducing-tamga-network", "/learn/what-is-tamga-network"],
      ["/blog/why-eidas-2-matters", "/learn/eidas"],
      ["/blog/why-no-personal-data-on-chain", "/learn/data-minimisation"],
    ];
    return [
      ...moved.map(([from, to]) => ({
        source: `/:locale(en|tr|tk|az)${from}`,
        destination: `/:locale${to}`,
        permanent: true,
      })),
      { source: "/:locale(en|tr|tk|az)/docs/:path*", destination: "/:locale/learn", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

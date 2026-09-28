import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// -----------------------------------------------------------------------------
// Content-Security-Policy
// -----------------------------------------------------------------------------
// Tuned for this app's real needs:
//   - script/style 'unsafe-inline': Next.js App Router injects inline bootstrap
//     scripts, and framer-motion / inline style={{}} write inline style attributes.
//     (No 'unsafe-eval' — production bundles don't eval.)
//   - img 'self' data: blob:  → SVG data-URIs (logo, OG), flag-icons, WebGL.
//   - font 'self' data:       → self-hosted next/font woff2.
//   - connect 'self'          → RSC navigation fetches, same-origin only.
//   - frame-ancestors 'none'  → clickjacking protection (pairs with X-Frame-Options).
// If you later add an external service (analytics, fonts CDN, embeds), extend the
// matching directive here — otherwise it will be blocked.
//
// Dev only: Turbopack + React dev tooling need eval() and WebAssembly (RSC payload
// decoding, callstack reconstruction). These are added under `next dev` and are
// never present in the production bundle, so the shipped CSP stays strict.
const isDev = process.env.NODE_ENV !== "production";
const devScriptExtras = isDev ? " 'unsafe-eval' 'wasm-unsafe-eval'" : "";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  `script-src 'self' 'unsafe-inline'${devScriptExtras}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains (submit to hstspreload.org later).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: csp },
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
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);

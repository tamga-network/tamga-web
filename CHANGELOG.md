# Changelog — tamga-web

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The site stays at 1.0.0 until the public announcement;
changes before it are folded into this release. The user-facing release notes are at `/changelog`.

## [1.0.0] — 2026-10-16

tamga.network with the network's 1.0 documentation set, in English, Turkish and Turkmen.

- Design: N1 mark at every size (one favicon across the network's sites), Gök palette, Onest + IBM Plex; mega menus;
  entry-level homepage with the animated "How it works".
- Pages: Learn (`/learn`, a step-by-step path from digital identity to Tamga Network), Network addresses (`/network`),
  Partners, Events, Join, Brand, Roadmap, SDK, Release notes, Blog, Whitepaper and Manifesto.
- Content follows the network's current state: the network runs no wallet and lists wallet providers (ADR-0042; Tamga
  Wallet's provider is listed as active); one sandbox for wallet, institution and verifier developers; the
  `@tamga-network/*` packages at the 0.6.0 test release.
- Links: every external link opens in a new tab (`ExternalLink` / `EXTERNAL_ATTRS`, blog markdown via `SmartLink`;
  `npm run check:links` fails on a raw external anchor); Tamga Wallet, the first listed wallet, links to its own site
  tamgawallet.com (partners, home band, Learn "first wallet", two blog posts; tr → /tr, other languages → /en).
- Tagline: "The digital trust network for the Turkic world" (TR "Türk dünyası için dijital güven ağı", TK "Türki
  dünýäsi üçin sanly ynam tory") in the page title, description, OG card, footer, homepage hero and the Learn page.

### Folded in after 2026-10-16

- 2026-10-20: Azerbaijani (`az`) opened on the site — `/az`, language switcher, blog, whitepaper and manifesto PDFs (draft
  languages stay in their own folders and out of the public copy; AZ term check fixed). Share image and description carry the
  full tagline. Packages shown at npm 0.7.0 (SDK page, homepage, roadmap, blog notes, release note). CI: an automated diff-review
  and translation workflow lives in the dev repo only (manual trigger, per-run spend cap, API key scrubbed from subprocesses;
  not part of the public repo).
- 2026-10-21: external links open in a new tab (`ExternalLink` / `EXTERNAL_ATTRS`; `npm run check:links`); Tamga Wallet links
  to tamgawallet.com. Packages at npm 0.7.1 everywhere a version is shown; release note dated 2026-10-21. AZ wording fix
  ("deter").
- 2026-10-23: Next.js 16.4.0 → 16.4.3 (security patch; check + build clean, `npm audit` 0). Blog currency pass: wallet
  provider record ACTIVE since 14 Oct 2026, bits per credential type (ADR-0048), short-lived ZK copies since 0.4.0, Digital
  Credentials API status, refresh token bound to the client-instance key (ADR-0060), hosted issuer keeps the key at the
  institution (ADR-0057); three claims re-verified against source; `updated: 2026-10-23` on changed posts (en, tr, az).
  Code comments no longer reference private workspace paths; `brand:sync` takes the logo kit location from
  `TAMGA_BRAND_KIT` or `--kit`.
- 2026-10-27: packages at npm 0.7.2 everywhere a version is shown (SDK page, home, roadmap, blog notes); release note dated
  2026-10-27 (OpenID self-test fixes, gate terminal keys); code examples re-synced (the verify-own-server example no longer
  passes a `purpose` to `createPresentationRequest`).
- 2026-10-27: new blog post `openid-conformance-self-test` (en, tr, az, tk): the OpenID Foundation issuer and verifier test
  plans run as a self-test on the sandbox (results, the fixes by theme, what a self-test does not show) and the open-source
  oidf-conformance-kit; three figures (`fig-plans`, `fig-fixes`, `fig-triage`; en + tr).

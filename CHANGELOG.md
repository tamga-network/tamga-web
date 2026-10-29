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
- 2026-10-27: whitepaper and manifesto revised edition (version stays 1.0; title page and masthead dated 2026-10-27 with a
  "revised edition · first published 2026-10-03" line). Both rewritten in plain language in en, tr, tk and az following the
  writing guide; same section structure. Facts brought up to date: the network runs no wallet and lists wallet providers
  (Tamga Wallet's record active since 2026-10-14; ADR-0042); the ledger is a projection of the signed lists, contracts written
  and tested, switched off until two independent operators (ADR-0051…0055, 0063); packages on npm 0.7.2 with 0.7.3 in the
  sandbox; the OpenID self-test (issuer 63 modules, verifier 14, no failed module) and the oidf-conformance-kit;
  `age_over_15` next to `age_over_18` (ADR-0064); gate terminal keys (ADR-0065); hosted issuance with remote signing
  (ADR-0057); access-certificate profile (ADR-0058); token rules from the self-test (ADR-0059…0062); Digital Credentials API
  (Android module written, not device-tested; no iOS) and Bluetooth (coded, device tests pending); foundation handover scripted
  and rehearsed; LOTL slots incl. observers. Typst templates: Onest headings, `date` and `edition` parameters; whitepaper
  masthead comes from the generated content (`masthead`); blog links in generated TSX use the typed `/blog/[slug]` route.
- 2026-10-27 (evening): packages at npm 0.7.3 everywhere a version is shown (SDK page, home, roadmap, blog notes); release note
  for 0.7.3 (verifier self-test fixes, canonical display locales); the self-test post no longer says that some fixes are not on npm;
  whitepaper says the nine packages are on npm as 0.7.3 (PDFs rebuilt; version 1.0, edition date unchanged).
- 2026-10-29: fonts come from the site's own files (`src/fonts/`, `next/font/local`; Onest, IBM Plex Sans, IBM Plex Mono and
  Noto Sans Old Turkic, SIL OFL 1.1 licence files alongside) instead of `next/font/google`: the build no longer fetches from
  Google Fonts (visitors were already served the fonts from tamga.network).
- 2026-10-29: currency check after the 0.7.4 package release. Packages at npm 0.7.4 everywhere a version is shown (SDK page,
  home, roadmap, blog notes); release note for 0.7.4 (en/tr/tk/az: protection against forged declines, registration-certificate
  policy and status list, gate groups in the trust list, ETSI XML view in the sandbox, strict CSP and self-hosted fonts, EU test
  wallet fixes; a note on the breaking changes points to the package changelog). Roadmap "Signed trust lists" card names gate
  groups and the sandbox ETSI XML view. Blog: the trust-lists post says registration certificates carry their policy and a
  status list; the OpenID self-test post says the verifier results predate the 29 October request-branch change and the plan
  has not been run again. Whitepaper revised in place (version 1.0, edition 2026-10-29): forged-decline protection and
  registration-certificate status in the presentation flow, ETSI XML view (sandbox; real network once the foundation exists),
  gate groups, 0.7.4, the verifier self-test caveat; four PDFs rebuilt. The manifesto needed no change.

# tamga.network

The website of Tamga Network — a Digital Trust Infrastructure for Türkiye and the Turkic world, built on the EU digital
identity (eIDAS 2.0 / EUDI) profiles. Three languages: English (default), Turkish, Turkmen.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4**; brand tokens in `src/app/globals.css` (light and dark theme)
- **next-intl** — every route carries a language prefix: `/en` · `/tr` · `/tk`
- **Radix UI** (shadcn/ui patterns) for the navigation menus; **framer-motion** and **ogl** (WebGL) for motion; **lucide-react** icons
- **Typst** for the whitepaper and manifesto PDFs

## Commands

```bash
npm run dev             # http://localhost:3000
npm run build           # production build
npm run start           # serve the build
npm run check           # typecheck + three-language key parity + code examples up to date
npm run examples:sync   # copy the tested code examples from the tamga-network repository
```

## Pages

| Route | Content |
|---|---|
| `/` | Home: the problem, what Tamga is, Europe, the Turkic world, how it works, sectors, the network's public addresses, status |
| `/learn`, `/learn/*` | Learn: a step-by-step path from digital identity to Tamga Network (7 chapters) |
| `/sdk` | The open-source `@tamga-network/*` packages, installation and working examples |
| `/join` | Join the network: institutions (issuers, verifiers), wallet providers, states (`/issuers` redirects here) |
| `/whitepaper`, `/manifesto` | Online and as PDF in three languages |
| `/roadmap`, `/changelog` | Stages of the network; every release |
| `/scenarios`, `/about`, `/blog` | Everyday scenarios, the name and mission, articles |

Developer documentation and the API reference live at [docs.tamga.network](https://docs.tamga.network); the architecture
and reference framework at [arf.tamga.network](https://arf.tamga.network).

## Content

- Page texts: `src/content/*` (one object per language) and `messages/{en,tr,tk}.json` (interface strings). All three
  languages are updated together; `npm run check` fails on a missing key.
- Public addresses of the network: `src/lib/ecosystem.ts` (used by the menu, the home page table and the footer).
- Whitepaper: single source `whitepaper/source/content.py` → site page and PDFs:
  ```bash
  python whitepaper/source/generate.py && npx prettier --write src/content/whitepaper.tsx
  powershell -File whitepaper/build.ps1   # Typst binary under tools/ (not in the repository)
  ```
- Manifesto PDF: `powershell -File manifesto/build.ps1`.

## Licence

Code: Apache-2.0 (`LICENSE`). Content (page texts, blog, whitepaper, manifesto): CC BY 4.0 (`LICENSE-docs`). The Tamga name
and seal are not covered by these licences.

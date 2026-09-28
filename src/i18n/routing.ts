import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "tk"],
  defaultLocale: "en",
  // Show a prefix for every locale, e.g. /en, /tr, /tk
  localePrefix: "always",
  // Pathnames are identical across every locale — the only thing that varies is
  // the `/en`, `/tr`, `/tk` prefix. (We used to localize `/about` and
  // `/scenarios`, but that required a proxy rewrite that broke behind the
  // production reverse proxy, so all paths are now kept language-agnostic.)
  pathnames: {
    "/": "/",
    "/about": "/about",
    "/manifesto": "/manifesto",
    "/scenarios": "/scenarios",
    "/whitepaper": "/whitepaper",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/docs": "/docs",
    "/docs/why-new-model": "/docs/why-new-model",
    "/docs/digital-identity": "/docs/digital-identity",
    "/docs/blockchain": "/docs/blockchain",
    "/docs/cryptography": "/docs/cryptography",
    "/docs/did-vc": "/docs/did-vc",
    "/docs/selective-disclosure": "/docs/selective-disclosure",
    "/docs/how-tamga-works": "/docs/how-tamga-works",
    "/docs/trust-lists": "/docs/trust-lists",
    "/docs/eidas-eudi": "/docs/eidas-eudi",
    "/docs/eudi-comparison": "/docs/eudi-comparison",
    "/docs/tamga-id": "/docs/tamga-id",
    "/docs/login-with-tamga": "/docs/login-with-tamga",
    "/docs/identity-layers": "/docs/identity-layers",
    "/docs/accountable-disclosure": "/docs/accountable-disclosure",
    "/docs/recovery-revocation": "/docs/recovery-revocation",
    "/docs/developers": "/docs/developers",
    "/docs/glossary": "/docs/glossary",
  },
});

export type Locale = (typeof routing.locales)[number];

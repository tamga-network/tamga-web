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
    "/join": "/join",
    "/network": "/network",
    "/partners": "/partners",
    "/events": "/events",
    "/roadmap": "/roadmap",
    "/changelog": "/changelog",
    "/sdk": "/sdk",
    "/brand": "/brand",
    "/blog/[slug]": "/blog/[slug]",
    // Öğren (Learn): sıfırdan Tamga Network'e öğrenme yolu; sayfalar src/content/learn/
    "/learn": "/learn",
    "/learn/[slug]": "/learn/[slug]",
    "/learn/what-is-identity": "/learn/what-is-identity",
    "/learn/paper-to-digital": "/learn/paper-to-digital",
    "/learn/identity-models": "/learn/identity-models",
    "/learn/trust-triangle": "/learn/trust-triangle",
    "/learn/cryptography-basics": "/learn/cryptography-basics",
    "/learn/digital-signatures": "/learn/digital-signatures",
    "/learn/certificates": "/learn/certificates",
    "/learn/verifiable-credentials": "/learn/verifiable-credentials",
    "/learn/credential-formats": "/learn/credential-formats",
    "/learn/digital-wallets": "/learn/digital-wallets",
    "/learn/issuance-and-presentation": "/learn/issuance-and-presentation",
    "/learn/revocation": "/learn/revocation",
    "/learn/data-minimisation": "/learn/data-minimisation",
    "/learn/selective-disclosure": "/learn/selective-disclosure",
    "/learn/zero-knowledge-proofs": "/learn/zero-knowledge-proofs",
    "/learn/unlinkability": "/learn/unlinkability",
    "/learn/consent-and-control": "/learn/consent-and-control",
    "/learn/eidas": "/learn/eidas",
    "/learn/eudi-wallet": "/learn/eudi-wallet",
    "/learn/trust-services": "/learn/trust-services",
    "/learn/pid-and-attestations": "/learn/pid-and-attestations",
    "/learn/eu-timeline": "/learn/eu-timeline",
    "/learn/trust-lists": "/learn/trust-lists",
    "/learn/federation": "/learn/federation",
    "/learn/what-is-blockchain": "/learn/what-is-blockchain",
    "/learn/why-not-blockchain-yet": "/learn/why-not-blockchain-yet",
    "/learn/what-is-tamga-network": "/learn/what-is-tamga-network",
    "/learn/why-turkic-world": "/learn/why-turkic-world",
    "/learn/roles": "/learn/roles",
    "/learn/network-layers": "/learn/network-layers",
    "/learn/rules-and-rulebooks": "/learn/rules-and-rulebooks",
    "/learn/governance": "/learn/governance",
    "/learn/open-source": "/learn/open-source",
    "/learn/first-wallet": "/learn/first-wallet",
    "/learn/join-as-issuer": "/learn/join-as-issuer",
    "/learn/join-as-verifier": "/learn/join-as-verifier",
    "/learn/build-a-wallet": "/learn/build-a-wallet",
    "/learn/for-states": "/learn/for-states",
    "/learn/next-steps": "/learn/next-steps",
    // Eski genel belgeler (Learn'e taşınıyor; menülerden çıkarıldı)
  },
});

export type Locale = (typeof routing.locales)[number];

// Tamga Network — Manifesto (English)
// Build:  typst compile --root . tamga-manifesto-en.typ ../public/manifesto-en.pdf
#import "template.typ": conf

#conf(
  lang: "en",
  eyebrow: "Manifesto",
  title: [We are building the modern counterpart of the ancient seal],
  footer-right: "Manifesto v1.0",
  lead: [
    The world is changing how it establishes trust. Europe made it mandatory by
    regulation; a standard is forming. The question is no longer "will this
    transformation happen" — but "who will be a producer in it."
  ],
  theses: (
    (
      title: "Trust is not a product, it is an infrastructure",
      body: [
        Every application should not have to re-verify identity, authority and
        documents. Just as electricity and the internet are shared
        infrastructure, digital trust should be a shared infrastructure too. We
        are building that infrastructure.
      ],
    ),
    (
      title: "Data stays in the hands of its owner",
      body: [
        You should not have to hand over a copy of your document to prove your
        identity. Data stays under the user's control; only the necessary proof
        is shared. You should be able to prove you are "over 18" without giving
        your birth date. This is not a luxury, it is a *right*.
      ],
    ),
    (
      title: "Verification must happen without going back to the source",
      body: [
        A document's authenticity should rely on the certainty of mathematics,
        not on how convincing a photocopy looks. A cryptographic signature
        proves who a document came from and that it was not altered, without
        asking the source at all.
      ],
    ),
    (
      title: "Blockchain is a means, not an end",
      body: [
        We are not building a new blockchain network. Today trust rests on signed,
        public trust lists; a shared ledger is added only when independent parties
        run it together. *Personal data is never written to either.* The user never
        sees any of it; they only use their identity.
      ],
    ),
    (
      title: "Open standards, vendor independence",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 and selective disclosure — the EUDI profiles. We are
        committed to the open standards the world agrees on, not to a specific
        company's product. No lock-in; interoperability is essential.
      ],
    ),
    (
      title: "Sovereignty and compatibility are possible at once",
      body: [
        As the world moves to the portable proof model, we have two paths: import
        this transformation from outside, or build our own sovereign,
        open-standards-compatible infrastructure. We choose the second —
        *compatible yet independent.* The same standards, our own network.
      ],
    ),
    (
      title: "Tamga is a shared tradition of the seal",
      body: [
        _Tamga_ was the ancient seal of the Turkic tribes — a mark that proved
        ownership, belonging and authority. A verifiable digital credential is
        its modern counterpart. Sharing a common language, culture and history,
        *the peoples of the Turkic world* are a natural soil for a shared
        digital foundation of trust.
      ],
    ),
    (
      title: "Not a center, but a mesh",
      body: [
        Not a single authority, but a mesh of interoperable, independent
        networks — a *Trust Mesh*. Each country keeps its own trust network,
        institutions and governance while connecting to others through shared
        standards.
      ],
    ),
  ),
  closing: [
    We aim to turn digital trust from a problem that each application solves anew
    into a shared, sovereign and interoperable infrastructure service for Türkiye
    and the Turkic world.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

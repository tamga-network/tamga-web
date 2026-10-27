// Tamga Network — Manifesto (English). v1.0, revised 2026-10-27 (first published 2026-10-03).
// Same text as src/content/manifesto.tsx (en); change both together.
// Build:  typst compile --root . tamga-manifesto-en.typ ../public/manifesto-en.pdf
#import "template.typ": conf

#conf(
  lang: "en",
  eyebrow: "Manifesto",
  title: [We are building the modern counterpart of the ancient seal],
  footer-right: "Manifesto v1.0",
  date: "2026-10-27",
  edition: "Revised edition · first published 2026-10-03",
  lead: [
    The world is changing how it establishes trust. Europe has made the new model
    mandatory by regulation, and a standard is taking shape around it. Whether this
    change will happen is no longer the question. The question is who will build it
    and who will only buy it.
  ],
  theses: (
    (
      title: "Trust is infrastructure",
      body: [
        No application should have to verify identity, authority and documents from
        scratch. Electricity and the internet are shared infrastructure, and digital
        trust should be one too, something every bank, university, employer and gate
        draws on rather than rebuilds. We are building that infrastructure, and we are
        building it to be handed over, first to a foundation and in time to the states
        themselves.
      ],
    ),
    (
      title: "Data stays in the hands of its owner",
      body: [
        Nobody should have to hand over a copy of a document to prove something about
        themselves. The document stays on the person's phone and only the proof that is
        needed leaves it. A person can show they are over 15 or over 18 without revealing
        a birth date, and the verifier gets a yes or a no. We treat this as a right, and
        the technology now makes it cheap to honour.
      ],
    ),
    (
      title: "Verification must not go back to the source",
      body: [
        A document's authenticity should rest on mathematics rather than on how
        convincing a photocopy looks. A cryptographic signature proves who issued a
        document and that nothing in it was changed, and it does so without asking the
        issuer, so the issuer never learns where and when a person used it.
      ],
    ),
    (
      title: "Blockchain is a tool, and only a tool",
      body: [
        We are not building a new blockchain. Trust today rests on signed, public trust
        lists that anyone can download and check. A shared ledger is worth adding only
        when independent parties run it together; the code for it is written and tested,
        and it stays switched off until that day. *Personal data is never written to
        either.* The person never sees any of this and simply uses their identity.
      ],
    ),
    (
      title: "Open standards, no lock-in",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 and selective disclosure are the EU's own
        profiles, and we use them as they are. We bind ourselves to standards the world
        agrees on rather than to any company's product, including our own. The network
        runs no wallet; it lists every wallet that follows the rules, and the first of
        them, Tamga Wallet, is a separate product that entered the list the same way
        any other will.
      ],
    ),
    (
      title: "Sovereign and compatible at once",
      body: [
        As the world moves to portable proofs, we have two paths: import the change from
        outside, or build our own infrastructure on the same open standards and keep the
        keys to it. We choose the second. *The same standards, our own network,* and
        every state the only writer of its own registry.
      ],
    ),
    (
      title: "Tamga is a shared tradition of the seal",
      body: [
        A _tamga_ was the ancient seal of the Turkic peoples, a mark that proved
        ownership, belonging and authority. A verifiable digital credential is its modern
        counterpart. Peoples who share a language family, a culture and a history are
        natural ground for a shared foundation of digital trust, and every one of them
        keeps its own seal.
      ],
    ),
    (
      title: "A mesh, not a center",
      body: [
        We want no single authority. We want a mesh of interoperable, independent
        networks, a *Trust Mesh*, in which each country keeps its own trust list,
        institutions and governance and connects to the others through shared
        standards, exactly as it will connect to Europe.
      ],
    ),
  ),
  closing: [
    Our aim is to take digital trust out of the list of problems each application solves
    anew, and to make it a shared, sovereign and interoperable infrastructure for Türkiye
    and the Turkic world.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

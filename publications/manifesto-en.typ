// MF — We are building the modern counterpart of the ancient seal. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "en")
#let sekil = sekil.with(dil: "en")

#show: conf.with(
  lang: "en",
  dizi: "Tamga Network Manifesto",
  baslik: "We are building the modern counterpart of the ancient seal",
  altbaslik: "Eight principles on digital trust for Türkiye and the Turkic world",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "November 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. This work is licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0): it may be shared and adapted with attribution. https://creativecommons.org/licenses/by/4.0/",
  anahtar: ("",),
  atif: "Tamga Network (2026). We are building the modern counterpart of the ancient seal. Manifesto, version 1.0. https://tamga.network/manifesto-en.pdf",
  ozet-sayfasi: false,
  kisa-baslik: none,
  icindekiler: false,
  ozet: [

  ],
)

The world is changing how it establishes trust. Europe has required every member state, by regulation, to offer its citizens a digital identity wallet, and a standard is taking shape around it. Whether this change will happen is no longer the question. The question is who will build it and who will only buy it.

#heading(level: 1, numbering: none)[Trust is infrastructure]

No application should have to verify identity, authority and documents from scratch. Electricity and the internet are shared infrastructure, and digital trust should be one too, something every bank, university, employer and gate draws on rather than rebuilds. We are building that infrastructure so that it can be handed over, first to a foundation and, as states join, to the states themselves. The network is not-for-profit and sells no services. Its rules and trust lists are public and the code of its packages is open source, so anyone can read and check them.

#heading(level: 1, numbering: none)[Data stays in the hands of its owner]

Nobody should have to hand over a copy of a document to prove something about themselves. The document stays on the person’s phone and only the proof that is needed leaves it. The person shows only the fields that are asked for, which is called selective disclosure. They can show they are over 15 or over 18 without revealing a birth date, and the verifier gets a yes or a no. We treat this as a right, and the technology now makes it cheap to honour.

#heading(level: 1, numbering: none)[Verification must not go back to the source]

A document’s authenticity should rest on mathematics rather than on how convincing a photocopy looks. A cryptographic signature proves who issued a document and that nothing in it was changed, and it does so without asking the issuer, so the issuer does not learn where the document was used. Whether a document has been revoked is read from a status list the issuer publishes. The list is downloaded as a whole, so the issuer cannot tell which document was checked.

#heading(level: 1, numbering: none)[Blockchain is a tool, and only a tool]

There is no blockchain in the network today, and trust does not need one. It rests on signed, public trust lists that anyone can download and check. A shared ledger adds something only when independent parties run it together, and even then it carries only digests and fingerprints of list records, never personal data. The code for it is written and tested, and it stays switched off until a second independent operator joins. #{strong[Personal data is never written to either.]} The person never sees any of this and simply uses their identity.

#heading(level: 1, numbering: none)[Open standards, no lock-in]

SD-JWT VC, ISO mdoc, OpenID4VC and X.509 are open standards the EU has chosen, and we use them as they are, with the EU’s own profiles. We bind ourselves to standards the world agrees on rather than to any company’s product, including our own. Any verifier that follows the same standards can then read a credential an institution has issued. The network runs no wallet; it lists every wallet that follows the rules. The first wallet on the list, Tamga Wallet, is a separate product and entered the list the same way any other will.

#heading(level: 1, numbering: none)[Sovereign and compatible at once]

As the world moves to portable proofs, we have two paths: import the change from outside, or build our own infrastructure on the same open standards and keep the keys to it. We choose the second. Compatibility means following the formats and rules the EU has chosen; sovereignty means deciding for ourselves who is trusted. #{strong[The same standards, our own network,]} and every state, once it joins, the only writer of its own registry.

#heading(level: 1, numbering: none)[Tamga is a shared tradition of the seal]

A #{emph[tamga]} was the ancient seal of the Turkic peoples, a mark that proved ownership, belonging and authority. A verifiable digital credential is its modern counterpart. Peoples who share a language family, a culture and a history are natural ground for a shared foundation of digital trust, and every one of them keeps its own seal.

#heading(level: 1, numbering: none)[A mesh, not a center]

We want no single authority. We want a mesh of interoperable, independent trust lists, in which each country keeps its own trust list, institutions and governance and connects to the others through shared standards. Being on one list does not put anyone on another; each network decides for itself whom it recognises. The same standards also let it talk to Europe.

#heading(level: 1, numbering: none)[Our aim]

We want to take digital trust out of the list of problems each application solves anew, and to make it a shared, sovereign and interoperable infrastructure for Türkiye and the Turkic world.

#{emph[Building Trust Infrastructure for the Digital World.]}

#{emph[Version 1.0, revised edition, November 2026. First edition 3 October 2026.]}

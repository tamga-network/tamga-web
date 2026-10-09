---
title: What is a trust network, and what does Tamga Network do?
slug: what-is-a-trust-network
description: A trust network publishes signed lists of who may issue and check digital credentials. What Tamga Network does, what it does not do, where to start.
date: 2026-10-08
lang: en
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Sources: tamga-network README (non-profit, foundation, runs no wallet, packages: 0.3.1 test release on npm, stable 1.0.0 when ready); ADR-0035 (EU-compatible, not "EUDI Wallet"; recognises wallets by rules), ADR-0037 K1 (the network's jobs: rules, trust, catalogue, open code, reference services, not sold), ADR-0042 (runs no wallet, lists them), ADR-0020 (no register of people, authentic source), ADR-0009 (ledger with ≥2 independent operators), ADR-0036 (external lists, none added yet), ADR-0038/0041 (sandbox, self-service test institutions); concepts/trust-lists, concepts/revocation (prefetching); SPEC-TRUST-0001 (TL11 no personal data; operator provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK verification in the verifier package); sandbox guide (age-zk example verifier); ARF §8.3 (non-profit, foundation). Live: trust.tamga.network/tl-tr.json operator.status provisional, on_behalf_of "TR national authority (to be designated)" (checked 2026-10-08). External: EU trusted lists browser, EU ARF GitHub. -->

A trust network is the shared layer that lets anyone check, without phoning anyone, that a digital credential comes from a real institution that is allowed to issue it. Tamga Network is that layer for Türkiye and the Turkic world, built on the EU's eIDAS 2.0 standards. It writes the rules, publishes signed trust lists, keeps the catalogue of credential types, publishes open-source packages and a reference verifier, and runs a test network. It does not hold people's documents, does not run wallets and does not see who shows what to whom.

## Why does a signed credential need a network at all?

A digital signature proves that a particular key signed a document. It does not prove whose key that is. When a diploma arrives with a valid signature, the verifier still has two questions: is the signer really a university, and is it allowed to issue diplomas?

Answering that one institution at a time does not scale. Every employer would need its own file of every school's keys and would have to keep it current by hand. A trust network replaces those private files with one public, signed answer that everyone reads the same way. The EU solved the same problem with the same idea: the European Commission publishes a list of trusted lists, and each member state publishes its own national list ([EU trusted lists](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Who takes part in a trust network?

Three roles, and all three read the same list:

![The institution issues, the person carries, the verifier checks; all three consult the same signed trust list](/blog/what-is-a-trust-network/en/fig-ucgen.png)

- **The institution (issuer).** A university, hospital, chamber, public body or event organiser signs credentials with its own key. The key never leaves the institution.
- **The person (holder).** Keeps the credential in a wallet on their phone and decides which fields to share.
- **The verifier.** An employer, a website or a gate checks the signature, finds the institution in the trust list and reads a revocation list it downloaded in advance.

The network sits beside these three. It is not in the path when a credential is issued or shown. Once the list is published, issuance and verification happen directly between the parties, which is what separates a trust network from a platform.

## What does Tamga Network actually do?

Six jobs, all of them public ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)):

1. **Rules.** Tamga ARF (the Architecture and Reference Framework), the Trust Framework and the rulebooks say what each role must do. Every rule is numbered and published at [arf.tamga.network](https://arf.tamga.network).
2. **Signed trust lists.** A list of trusted lists and a Türkiye list name the registered institutions and the credential types each may issue, the registered verifiers and what each may ask for, and the recognised wallet providers. They are published at `trust.tamga.network`, versioned, hash-chained and signed. The mechanics are in [How a signed trust list works](/blog/how-trust-lists-work).
3. **Schema catalogue.** Credential types such as the student credential, the diploma, the event ticket and the identity attestation are described once in a public catalogue at `schemas.tamga.network`, so every wallet and verifier reads a diploma the same way.
4. **Open packages.** The `@tamga-network/*` packages cover trust lists, SD-JWT VC, ISO mdoc, issuance, verification, the wallet core and zero-knowledge proofs. They are Apache-2.0 open source and are published on npm as the 0.3.1 test release; the stable 1.0.0 comes when everything is ready. In test releases the API may change.
5. **Reference services.** The trust list publisher and registration tool, a hosted issuance service with the Institution Console, the hosted verifier (Tamga Verify) and a provisional identity service. They exist so that the network works and institutions can join. They are not sold.
6. **The sandbox.** A test network at [sandbox.tamga.network](https://sandbox.tamga.network), fully separate from the real one, with its own test root certificate, example institutions and made-up people. An institution can open a test institution there by itself in a few minutes.

![What Tamga Network does and what it does not do](/blog/what-is-a-trust-network/en/fig-yapar.png)

## What does Tamga Network deliberately not do?

The limits matter as much as the jobs, and they are written down as binding rules.

**It holds no documents.** Credentials travel from the institution's system to the person's phone. The network keeps no register of people; at issuance the data is read from the institution's own system, its authentic source ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)). No list, log or ledger carries personal data, credential content or even a hash of a credential.

**It runs no wallet.** The network lists wallets. It does not operate any wallet's app, wallet provider or website ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)). Any wallet that follows the published rules and passes the conformance tests can be listed. Tamga Wallet, the first wallet on the network, is a separate product and enters the list the same way as any other; its provider entry is reserved today and receives keys when its provider service opens.

**It does not see who shows what to whom.** Verifiers download revocation lists ahead of time and keep them in a cache, so at the moment of a check no request goes to the institution or to the network. The institution cannot learn where its credentials are shown, and neither can we.

**It does not decide in a state's place.** Each state is the only author of its own list. Today Tamga publishes the Türkiye list provisionally, on behalf of the national authority, and the list says so in its `operator` field. When the state publishes its own list, the network's list of trusted lists points to it; credentials and wallets do not change.

**It sells nothing.** Tamga Network is non-profit, and its operation will be handed over to a foundation. Integration, support and consulting come from companies outside the network, which all join on the same terms.

## How does Tamga Network relate to the EU digital identity wallet?

It uses the same building blocks: SD-JWT VC and ISO/IEC 18013-5 mdoc for credentials, OpenID4VCI and OpenID4VP with the HAIP profile for issuance and presentation, the IETF Token Status List for revocation, X.509 certificates for institutions, and trust lists mapped to ETSI formats. These are the formats the EU's Architecture and Reference Framework names ([EU ARF on GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

What it cannot claim is a title. "EUDI Wallet" is a legal status for wallets provided or recognised by an EU member state. A network or wallet outside the EU can be EU-compatible, speaking the same standards and proving it with tests, and that is how Tamga describes itself ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

The country lists are also built to sit next to other lists. An external list in the ETSI format, from another state or from the EU, can be added to the network's list of trusted lists with a pinned signer and a defined scope, each by a separate approval ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). None has been added yet.

## Is Tamga Network a blockchain?

No. Today the trust anchor is the set of signed, versioned, hash-chained lists plus a public, hourly anchor log, which is the EU model. A permissioned ledger is added only once at least two independent operators take part, because a ledger kept by one operator adds no trust. Every list field already maps to a ledger record, so the switch will change nothing for wallets and verifiers. The reasoning is in [Why we start without a blockchain](/blog/why-no-blockchain-yet).

## What is working today, and what is not?

| Part | State on 8 October 2026 |
|---|---|
| Signed trust lists and the anchor log | live at `trust.tamga.network` |
| Schema catalogue | live at `schemas.tamga.network` |
| Hosted verifier (Tamga Verify) | live at `verify.tamga.network` |
| Zero-knowledge age check | live on Tamga Verify (policy `age-over-18-zk`); on the wallet side the Android proving library is ready, iOS is pending |
| Sandbox with self-service test institutions | live at `sandbox.tamga.network` |
| `@tamga-network/*` packages | 0.3.1 test release on npm; stable 1.0.0 when everything is ready |
| External lists (other states, the EU) | designed; none added |
| Shared ledger | waits for a second independent operator |

Test and demonstration institutions live only in the sandbox. A sandbox credential does not pass at a real verifier, because the real network does not trust the sandbox root.

## Where should I start?

- **An institution that wants to issue credentials:** [How an institution joins Tamga Network](/blog/join-as-an-institution), then the developer guide [Join the network as an institution](https://docs.tamga.network/guides/join-as-institution).
- **A site or an app that wants to check credentials:** [Add "verify with Tamga" to your website or app](/blog/add-verification-to-your-site).
- **A wallet developer:** the [wallet guide](https://docs.tamga.network/guides/build-a-wallet) and the [sandbox guide](https://docs.tamga.network/guides/sandbox).
- **A public body or a state:** [For states](/learn/for-states) and the [Trust Framework](https://arf.tamga.network/trust-framework).
- **Starting from zero:** [What is Tamga Network?](/learn/what-is-tamga-network) in the Learn section.

## Frequently asked questions

### Does Tamga Network store my diploma or my identity data?

No. Credentials go from the institution to the person's phone. The lists contain only institution names, certificate fingerprints, statuses, dates and addresses: no personal data and no credential hashes.

### Do I have to use Tamga Wallet?

No. Any wallet that follows the network's wallet rules and whose provider is listed can receive and present Tamga credentials. Tamga Wallet is one of the wallets on the network, not the only one.

### Who decides which institutions are on the list?

The registrar records institutions and the credential types each may issue. Today Tamga does this provisionally for Türkiye, on the state's behalf; when a state publishes its own list, that state decides. The network does not grant the legal right to issue a diploma; that comes from the law that governs the institution.

### Can a credential from another country be accepted?

Yes, when the verifier's country recognises the other country's list. Each state decides recognition on its own, and the check runs in every verification.

### What happens if the trust list cannot be fetched?

The verifier returns "cannot be verified right now", never "rejected". A credential is not treated as fake because the infrastructure was out of reach.

## Sources

- [EU trusted lists browser (European Commission)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Regulation (EU) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network documentation: trust lists and federation](https://docs.tamga.network/concepts/trust-lists)
- [ADR-0037: Tamga Network is only a network](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: the network operates no wallet](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network) · [Join the network](/join) · [Learn](/learn/what-is-tamga-network)

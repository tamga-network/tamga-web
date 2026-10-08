---
title: "Tamga ARF: how we adapted the European framework"
slug: tamga-arf
description: Tamga ARF 1.0 follows the EU reference framework: what it contains, what stays identical, what differs and why, and how states and institutions take part.
date: 2026-10-08
lang: en
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Sources: Tamga ARF set (framework README: document set, versions 1.0.0 Active, first release 2026-10-02, Turkish source and English official translation, CC BY 4.0, compiles decisions and creates none, every rule traces to an ADR/spec/invariant); FW-ARF-0001 §1.3 (structure), §1.4 (relation to eIDAS 2.0 and EU ARF, EUDI Wallet is a legal title), §1.5 (three layers), §1.6 (P1-P7), §1.7 (out of scope incl. PID), §3 (role table: TLSO, registrar, national root CA, access/registration certificate provider provisional; PID provider empty; provisional identity attestation provider), §4.1 (sandbox single, network's), §5.1-5.4, §6.1-6.6 (LOTL and country lists, federation, list rules, registration, assurance levels, known limit), §7.3 (conformance), §8.1-8.4 (phases, ledger, governance body, standards map). FW-TF-0001 §0 (binding for institutions signing the participation agreement; World Bank five-layer model), §1.3 (scope: TDT members and observers), §1.6 (organs, council two-thirds), §2.4 and §4.1-4.3 (light conformity, mixed regime, open conformance vectors), §6 (three interoperability levels), §6.1 (external lists FD1-FD5, LoTE first), §7 (hand-over plan). FW-RB-0001 (rule format RB-<ROLE>-<NN>, RFC 2119, branching rulebooks, RB-GEN-03, list phase note). FW-ONB-0001 §5 (state steps). ADR-0009 (chainless, ledger with two independent operators), ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (sandbox SB1-SB5), ADR-0041 (self-service test institutions), D-GOV-5 (TDT-first: slots, full role set, operator provisional, on_behalf_of; hand-over changes only operator). Live lotl.json checked 2026-10-08 (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved; TR roles tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). EU: ARF v3.0.0 (2026-07-23), CIR 2025/848, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF is the rulebook of Tamga Network: an Architecture and Reference Framework built on the same structure as the EU's ARF for the European Digital Identity Wallet ([what eIDAS 2.0 and the EU ARF are](/blog/eidas-arf-for-the-turkic-world)). Version 1.0 was published on 2 October 2026 at [arf.tamga.network](https://arf.tamga.network), in English and Turkish. Its technical layer is identical to the EU's: the same credential formats, protocols, trust list model and role set. What differs is the governance layer, which is written for states that are not in the EU and do not yet have their own lists. Tamga acts as a provisional operator, there is a reserved place for each Turkic state, a public sandbox, and no shared ledger until a second independent operator joins.

## What does Tamga ARF contain?

![The Tamga ARF document set and its EU counterparts](/blog/tamga-arf/en/fig-yapi.png)

Like the EU framework, Tamga ARF is one main document with annexes ([Tamga ARF](https://arf.tamga.network/architecture)):

| Document | What it covers | EU counterpart |
|---|---|---|
| Main document | Use cases, roles, architecture, data model, trust model, security, governance | EUDI ARF main document |
| Annex A: Trust Framework | Governance, entry gates per role, conformance, contracts, the hand-over plan | the implementing regulations and national trust schemes |
| Annex B: Tamga Rulebook | Numbered, binding rules for every role | ARF Annex 2, high-level requirements |
| Annex C: Rulebooks | Education (student credential, diploma), Identity (identity attestation, driving licence attestation), Event Ticket | the attestation rulebooks |
| Annex D and E | Definitions; standards, decisions and rule sources | ARF Annex 1 and references |
| Reading path, Roles, Onboarding | Reading order per role, what each role does, the steps to join | |

Three things about the set are worth knowing before reading it.

**It compiles; it does not decide.** Every rule in the framework comes from a recorded decision (an ADR), a specification or an invariant, and the references annex names the source of each. A rule with no source is not written as a rule. To change a rule, the decision behind it changes first, and the framework follows in the same piece of work.

**Rules are numbered and typed.** Each rule has a code in the form `RB-<ROLE>-<NN>` and uses MUST, MUST NOT, SHOULD and MAY in their RFC 2119 meaning. For example, RB-GEN-03 says that when the trust source is stale or unreachable, the result must be "indeterminate", never "accepted" and never "rejected". An auditor or an integrator can point to the exact rule.

**Credential rulebooks branch from the main rulebook.** The Education, Identity and Event Ticket rulebooks inherit every common rule and add only what is specific to their type: who issues it, with what identity proofing, which fields, how long it is valid and how it is revoked. A new domain becomes a new rulebook only after a seven-point checklist is completed ([Rulebooks](https://arf.tamga.network/rulebook)).

The Turkish text is the source and the English text is the official translation of the same version; both are always at the same version. The documents are published under CC BY 4.0, and every change is listed on the framework's [What changed](https://arf.tamga.network/changes) page.

## What stays identical to the EU?

The technical layer, by rule. Tamga's positioning decision says its credential, protocol and trust list formats do not depart from EU standards, and any Tamga-specific addition uses a standard extension point that does not break standard clients ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). In practice:

- **Credential formats:** IETF SD-JWT VC for every credential type, and ISO/IEC 18013-5 mdoc as the second representation of the identity credential, for in-person presentation and zero-knowledge proofs.
- **Protocols:** OpenID4VCI 1.0 for issuance, OpenID4VP 1.0 with DCQL for presentation, both under the HAIP 1.0 profile.
- **Revocation:** IETF Token Status List.
- **Institution identity:** X.509 certificates chaining to a national root.
- **Trust model:** a list of trusted lists (LOTL) that points to national lists, the same two levels as the EU. Lists are versioned, hash-chained and signed, and the trust list fields map to ETSI TS 119 612 and ETSI TS 119 602.
- **External lists:** a list run by someone else, another state or the EU, is read in the ETSI TS 119 602 format (LoTE, lists of trusted entities), with a pinned signer and a defined scope ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)).
- **Relying party registration:** verifiers register with the EU's common registration dataset and receive registration certificates in the model of Implementing Regulation (EU) 2025/848 and ETSI TS 119 475; the wallet compares each request with the certificate.
- **Wallet security:** wallet instance attestations and key attestations from the wallet provider, keys in the device's secure hardware.
- **Assurance names:** Low, Substantial and High for identity proofing, and EAA and QEAA terms for credentials.
- **Role set:** the ARF's roles, from trusted list scheme operator to relying party intermediary, each with a place in every national list.

The aim is that software written for the EU ecosystem can process a Tamga credential without a Tamga-specific code path. That is what "EU-compatible" means here, and it is shown by tests, not by a label.

## What differs, and why?

![The technical layer is the same as the EU's; the governance layer is written for the Turkic world](/blog/tamga-arf/en/fig-ayni-farkli.png)

The EU framework assumes a regulation, member states with authorities in place and a certification system. Tamga ARF has to work before any of those exist outside the EU. Six differences follow.

### 1. A provisional operator, and it says so

In the EU each member state operates its own trusted list. In Tamga Network no state has taken that role yet, so Tamga publishes the Türkiye list provisionally, on behalf of the national authority. The list records this in its own data, so nobody has to take it on trust:

```json title="The operator of the Türkiye list (live list of trusted lists, 8 October 2026)"
{
  "state_code": "TR",
  "status": "ACTIVE",
  "operator": {
    "name": "Tamga Network",
    "status": "provisional",
    "on_behalf_of": "TR national authority (to be designated)"
  }
}
```

The roles Tamga holds this way are the trusted list operator, the registrar, the national root certificate authority and the access certificate provider. Each is designed to be handed over. A hand-over changes the operator field, the list's address and its signer; institution identifiers, credential type identifiers and credentials already issued do not change.

### 2. A place for each Turkic state from day one

Nothing in the framework assumes a single operator. The list of trusted lists already has a slot for each member state of the Organization of Turkic States (Azerbaijan, Kazakhstan, Kyrgyzstan, Türkiye, Uzbekistan) and for the observer states Hungary and Turkmenistan. Today only Türkiye is active and the others are reserved. Each national list carries the full ARF role set, even where a role is empty. This rule was fixed early, as the "TDT-first" principle, precisely so that a state joining later does not force a redesign.

### 3. No PID, by design

The EU's wallet rests on PID, the person identification data that the state issues. Tamga does not take that role. In each national list the PID provider slot is reserved for the state. Until a state fills it, a provisional identity service issues an identity attestation after remote identity verification. That attestation is an attestation of attributes, not PID, and its rulebook follows the pattern of the EU's PID rulebook so that the change is smooth when a PID provider arrives.

### 4. Conformance before certification

In the EU, wallets are certified by conformity assessment bodies under Implementing Regulation 2024/2981. Tamga ARF uses a mixed regime: open, versioned conformance test vectors and commitment tests that every role runs with its own software before going live, prior assessment for the highest issuer class, and checks after the fact for the others. Independent assessment bodies and national certification are added when states join ([Trust Framework](https://arf.tamga.network/trust-framework)).

### 5. One public sandbox

The EU has reference implementations and pilots. Tamga Network adds a single test network at [sandbox.tamga.network](https://sandbox.tamga.network), run by the network under the same rules, with its own test root, its own lists, example institutions and made-up people ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). An institution can open a test institution there by itself, and wallet developers register their own wallet provider there. No real wallet or verifier trusts the sandbox root, so a sandbox credential never passes in the real network.

### 6. No shared ledger yet

Today trust comes from signed lists and a public, hourly anchor log, which is the EU model. A permissioned ledger is part of the plan, but only once at least two independent operators take part, because a ledger kept by one operator adds cost and no trust ([ADR-0009](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)). The framework states the limit openly: until then the anchor rests on one operator's signature, and public logs deter misuse rather than prevent it. More in [Why we start without a blockchain](/blog/why-no-blockchain-yet).

The legal basis differs too. In the EU the rules bind because a regulation says so. In Tamga Network the Trust Framework binds each institution that signs the participation agreement, and governance passes to a council of member states, deciding by a two-thirds majority, once states join ([Why Tamga Network is non-profit and bound for a foundation](/blog/network-as-a-foundation)).

## How does a state take part?

![The steps by which a state takes over its roles](/blog/tamga-arf/en/fig-devlet.png)

A state does not have to adopt a new system. It takes over roles that already have its name on them ([Onboarding](https://arf.tamga.network/onboarding)):

1. **Intent.** The state says it wants to join. When the first state operator goes into production, the council is formed.
2. **Root certificate.** The state's root certificate is created in an offline ceremony and added as a rollover next to the provisional one.
3. **List operation and registrar.** The operator field of the national list passes to the state, and so does registration. From then on the provisional operator can no longer register anyone in that state.
4. **PID provider.** The state appoints its PID provider, and the provisional identity attestation is handed over to it.

No credential, record or identifier is invalidated by any of these steps. Each state remains the only author of its own list, and recognition of another state's list is a decision each state takes for itself. The technical steps for publishing a national list are in the developer guide [Publish a national list](https://docs.tamga.network/guides/publish-national-list).

## How does an institution take part?

Through the sandbox first, then the entry gates of the Trust Framework. A university, a chamber, a public body or a ticket seller tries the full flow in the sandbox, runs the conformance tests, and then registers at one of three issuer levels: registered, contracted or accredited. Each credential type is authorised separately and is closed by default. Verifiers register with the common registration dataset and receive a registration certificate for each use. Registration is not a legal licence: the right to issue a diploma still comes from the law that governs the institution. The steps are in [How an institution joins Tamga Network](/blog/join-as-an-institution).

## Where should I start reading?

The framework has a [reading path](https://arf.tamga.network/reading-path) for each role. As a short version:

- **A state or a regulator:** the main document's sections on roles and governance, then the Trust Framework's hand-over plan.
- **An institution that issues credentials:** the Roles page, the Tamga Rulebook's issuer rules and the rulebook for your credential type, such as the [Education Rulebook](https://arf.tamga.network/rulebooks/education).
- **A verifier or a wallet developer:** the Tamga Rulebook's rules for your role, then the developer documentation at `docs.tamga.network` and the conformance tests.

## Frequently asked questions

### Is Tamga ARF a fork of the EU ARF?

It follows the EU ARF's structure and uses the same standards, but it is a separate framework with its own governance. Where an EU rule depends on the regulation or on a member state authority, Tamga ARF has a rule that works without one, and says who holds that role today.

### What happens when the EU publishes a new ARF version?

Tamga tracks EU rules as they appear and writes changes into its own decisions first, then into the framework. A change becomes a new framework version and is listed on the What changed page.

### Does following Tamga ARF make a wallet an EUDI Wallet?

No. "EUDI Wallet" is a legal status for wallets provided or recognised by an EU member state and certified under EU rules. Following Tamga ARF makes a wallet EU-compatible and lets it be listed in Tamga Network.

### Can a state change the rules?

Each state controls its own list and registrations. Network-wide rules, such as admitting a member or adding a shared credential type, are decided by the council of member states by a two-thirds vote once it exists.

### Is the framework free to use?

Yes. The documents are published under CC BY 4.0 and the network's packages are open source under Apache-2.0.

## Sources

- [Tamga ARF 1.0](https://arf.tamga.network) · [Architecture](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/rulebook) · [Roles](https://arf.tamga.network/roles) · [Onboarding](https://arf.tamga.network/onboarding) · [What changed](https://arf.tamga.network/changes)
- [ADR-0035: positioning](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: trust federation](https://docs.tamga.network/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox) · [ADR-0009: chainless beta and the chain threshold](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: sovereignty-first governance](https://docs.tamga.network/adr/0002-sovereignty-first-governance)
- [Federation](https://docs.tamga.network/concepts/federation) · [Publish a national list](https://docs.tamga.network/guides/publish-national-list) · [Conformance](https://docs.tamga.network/guides/conformance)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Commission Implementing Regulation (EU) 2025/848: registration of wallet-relying parties](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [Implementing Regulation (EU) 2024/2981: certification of wallets](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Rules and rulebooks](/learn/rules-and-rulebooks) · [For states](/learn/for-states) · [Whitepaper](/whitepaper)

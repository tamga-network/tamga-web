---
title: Why Tamga Network is non-profit and bound for a foundation
slug: network-as-a-foundation
description: Tamga Network sells no services and runs no wallet, and its operation will pass to a foundation. Why neutrality matters and how the hand-over works.
date: 2026-10-08
updated: 2026-10-23
lang: en
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Sources: tamga-network README ("Tamga Network is non-profit; operation will later be handed over to a foundation"); Tamga ARF §8.3 (governance body formed when one or two states are willing; Tamga provisional operator until then; operation passes to the foundation; the network sells no product or commercial service; service providers outside, same terms), §1.6 principles P1 (each state sole author of its national records; council membership by two-thirds of member states), P4 (every state role Tamga holds is designed to be handed over), P7 (powers not limited by code are limited by policy, a measurable hand-over threshold and a transparency report); ADR-0035 (known tension: list operator selling services = conflict of interest; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; the Tamga team's company gets no different treatment), ADR-0042 (NW1–NW4; wallet.tamga.network removed 2026-10-06; Tamga Wallet's provider operated by the wallet's operator at provider.tamgawallet.com), ADR-0002 (three governance layers; removal does not invalidate citizens' credentials; right to exit), ADR-0009 (ledger with ≥2 independent operators); SPEC-TRUST-0001 (operator.status provisional, on_behalf_of; hand-over changes only the operator field; TDT-first slots; security notes: public log, CHANGELOG, quarterly transparency report, audit); learn/governance (succession agreement: domain, roots, archive, keys); home page gov section. Live tl-tr.json/lotl.json operator fields (2026-10-08). External: eIDAS 2.0 Regulation (EU) 2024/1183, EU ARF, EU trusted lists. -->

Tamga Network is non-profit, and its operation will be handed over to a foundation, because a trust network only works if everyone who relies on it can believe that the keeper of the list favours no one. States, institutions, several wallets and competing service companies all read the same list. The network therefore sells no services, runs no wallet and gives nobody privileges, and every role it holds today on a provisional basis is designed to be handed over. When states join, a council or foundation will take over the operation, and each state will take over its own list.

## Why must the keeper of a trust list be neutral?

A trust list decides who is believed. An institution in the list can issue credentials that verifiers accept, a verifier in the list can ask wallets for data, and a wallet provider in the list can receive credentials. If the party that keeps the list also sold integration, ran a wallet or offered paid support, every listing decision would be open to doubt. People would ask whether an entry was approved on the rules or because it helped the list keeper's business.

The EU separates these roles for the same reason. In the eIDAS 2.0 model ([Regulation (EU) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) member states supervise and publish trusted lists, wallet providers operate wallets and relying parties register, and the roles are kept apart. When Tamga set its positioning, the record named this as a known tension, because a list operator that sells services has a conflict of interest ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). The separation was then made explicit ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)).

## What does "non-profit" mean in practice?

Three binding rules put it into practice:

- **The network sells no services** (PO5). Its documents and sites carry no pricing and no sales language. Integration, support, contracted hosting and consulting are offered by companies outside the network, under their own names.
- **The same terms apply to everyone** (PO6). The reference services and the registration process are open to all participants on the same terms. No service provider gets priority, and the decision states explicitly that this includes the company founded by the Tamga team.
- **Reference services exist so the network works.** The trust list publisher, the hosted verifier, hosted issuance with the Institution Console, the provisional identity service and the sandbox are there so that institutions can join and anyone can try the rules. None of them is a product.

The governance section of the Tamga ARF says the same. Tamga Network is non-profit, its operation will be handed over to a foundation, and it sells no product and offers no commercial service ([Tamga ARF](https://arf.tamga.network/architecture)). How the framework is built is explained in [Tamga ARF: how we adapted the European framework](/blog/tamga-arf).

## Why does the network run no wallet?

A list that also operates one of the listed wallets cannot be neutral towards the others. In the EU model each wallet is operated by the organisation that offers it, its wallet provider, and the trust framework only lists wallet providers.

Tamga Network follows that model ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- It does not operate or host any wallet's app, wallet provider, website or support service.
- No wallet service runs under the network's domain names. The wallet services that used to run at `wallet.tamga.network` were removed from the network on 6 October 2026.
- The network's interfaces and packages do not hard-code any wallet's name. The wording is "open in your wallet", and when a wallet's name is needed it comes from that wallet's list entry.
- There is one sandbox, and it belongs to the network. Wallet developers register their own provider there and test against the same institutions, identity service and verifier as everyone else.

Tamga Wallet, one of the wallets on the network and a separate product, follows the same path. Its wallet provider is run by the wallet's own operator under the wallet's own domain. The provider entry (`TAMGA-WP-1`) has been active in the list since 14 October 2026, and as with any other wallet, its certificate was supplied by that operator.

## Who owns the lists?

The lists belong to the states. Governance has three layers, and a different party decides in each ([ADR-0002](https://docs.tamga.network/adr/0002-sovereignty-first-governance)):

| Layer | Question | Who decides |
|---|---|---|
| Network membership | Does a new state join? | the member states, by a two-thirds vote once a council exists |
| National registry | Which institutions and verifiers does a state register? | only that state |
| Recognition | Does a state accept another state's credentials? | each state for itself |

Two consequences follow. A state can leave without anyone's vote, and removing a state does not invalidate the credentials in its citizens' wallets, because it only stops new records. Even after a council exists, it governs only the network's shared rules and cannot decide about a state's own institutions.

## What is the path from today to a foundation?

![From a provisional operator today to a council or foundation and a shared ledger](/blog/network-as-a-foundation/en/fig-yol.png)

**Today** Tamga is the provisional operator. It publishes the Türkiye list on behalf of the national authority and says so in the list itself, where the `operator` field reads `"status": "provisional"` with an `on_behalf_of` value that is never left empty. We are not setting up a heavy institution before anyone needs it.

**When one or two states are willing to join**, a governance body will be formed, made up of a council of member states and a foundation or secretariat to take over the operation. The lists will be handed over to their owners, and network-level decisions, such as admitting a member or adding a shared credential type, will be taken jointly.

**Once there are at least two independent operators**, the records will also move to a permissioned shared ledger, so that no single party can change them alone. A ledger kept by one operator would add cost without adding trust, which is why it waits ([Why we start without a blockchain](/blog/why-no-blockchain-yet)).

## How can the operator change without breaking credentials?

Credentials survive a change of operator because the identifiers do not belong to the operator. An institution's `issuer_id` is computed from its own certificate, credential types are named by fixed URNs, and the list format already has a slot for each state and the full set of roles. A hand-over changes the `operator` field, the list's address and its signer. For wallets and verifiers only the address and the signer change, and credentials already in people's wallets stay valid.

The parts that code cannot move, such as the domain name, the root certificates, the list archive and the keys, pass under a written succession agreement. The rule behind this is that every power code cannot limit, such as hosting, the domain, record-keeping and statistics, is limited by a policy, a measurable hand-over threshold and a transparency report (principle P7).

## What keeps the provisional operator honest until then?

We do not leave it to good intentions. The lists are signed, versioned and hash-chained, and nothing is ever deleted. Every revocation list publication goes into a public anchor log that gets at least one line an hour, and every build is recorded in a public change log at `trust.tamga.network`. The rules add a quarterly transparency report and independent audit, although the report's page is not published yet.

We are also clear about where this stops. Today the anchor rests on one operator's signature, and the public records deter misuse without making it impossible. The second independent operator, and the shared ledger after it, will close that gap. [How a signed trust list works](/blog/how-trust-lists-work) has the details.

## What does this mean for each participant?

![Who runs what: the network, states, wallets and service companies](/blog/network-as-a-foundation/en/fig-ayrim.png)

- **Institutions** register on the same terms whatever service company, if any, helps them integrate.
- **Wallets** are recognised by their list entry and their conformance with the rules, and their name plays no part in it.
- **Service companies** compete outside the network, and the network's rules are the same for all of them.
- **States** keep the only say over their own lists, and can take over the roles Tamga holds provisionally for Türkiye today whenever they are ready ([For states](/learn/for-states)).

## Frequently asked questions

### Has the foundation been set up?

Not yet. The governance body will be formed when one or two states are willing to join. Until then Tamga is the provisional operator, and the lists say so.

### Can a company pay for priority or a better listing?

No. The network sells no services, and its reference services and registration process are open to all participants on the same terms, so no company is treated differently.

### Does Tamga Wallet have a special position in the network?

No. It is one of the wallets on the network, run by its own operator, and it is listed the same way as any other wallet.

### What happens to people's credentials if a state leaves the network?

They stay valid. Leaving stops a state from writing new records, but it does not cancel what was already issued. Whether other states keep accepting those credentials is each state's own recognition decision.

### Could one state take over the network?

No. Each state writes only its own list, admitting a new member needs two-thirds of the member states, and each state decides on recognition for itself, so no single state controls another's list.

## Sources

- [Regulation (EU) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: architecture and governance](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework)
- [ADR-0002: sovereignty-first governance](https://docs.tamga.network/adr/0002-sovereignty-first-governance) · [ADR-0037: the network is only a network](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: the network operates no wallet](https://docs.tamga.network/adr/0042-network-and-wallets)
- [ADR-0009: chainless beta and the chain threshold](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [Governance](/learn/governance) · [About](/about) · [Roadmap](/roadmap)

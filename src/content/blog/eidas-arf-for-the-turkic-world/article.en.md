---
title: "eIDAS 2.0 and the ARF: what they mean for the Turkic world"
slug: eidas-arf-for-the-turkic-world
description: What the EU built with eIDAS 2.0 and its reference framework, when it applies, why alignment matters for states outside the EU, and where its limits are.
date: 2026-10-08
lang: en
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Sources: Regulation (EU) 2024/1183 (EUR-Lex, checked 2026-10-08): adopted 11.4.2024, OJ 30.4.2024, in force 20.5.2024; amended Regulation 910/2014 Art. 5a (wallets; 5a(1) 24 months after the implementing acts; 5a(2) provided by, under mandate from or recognised by a member state), 5b (wallet-relying parties: registration), 5c (certification), 5d (list of certified wallets), 5f (cross-border reliance; 5f(2) 36 months), 14(1) (third-country trust services recognised as equivalent to qualified trust services through implementing acts or an agreement under Art. 218 TFEU), 22 (trusted lists), 45b-45h (electronic attestations of attributes, qualified, public-sector). Implementing Regulations (EUR-Lex headers): 2024/2977 PID and EAA, 2024/2979 integrity and core functionalities, 2024/2980 notifications on the wallet ecosystem, 2024/2981 certification, 2024/2982 protocols and interfaces (all 28.11.2024, OJ 4.12.2024; note 2024/2978 is unrelated); 2025/848 registration of wallet-relying parties and 2025/849 list of certified wallets (6.5.2025, OJ 7.5.2025); 2025/1569 QEAA and public-sector EAA (29.7.2025, OJ 30.7.2025); 2026/1731 amending 2024/2977, 2979, 2980, 2982 as regards standards and specifications (15.7.2026, OJ 22.7.2026). EU ARF v3.0.0 GitHub release 2026-07-23. Commission page "EUDI Wallet implementation": four large-scale pilots (EWC, POTENTIAL, NOBID, DC4EU) launched April 2023, over 350 entities from 26 member states, Norway, Iceland and Ukraine. Second-wave pilots WE BUILD and APTITUDE (2025): public consortium pages and press. ETSI TS 119 602 (LoTE). OTS: Digital Economy Partnership Agreement signed 6.11.2024 in Bishkek, Türkiye's ratification law in the Official Gazette 23.6.2026 (press); Turkistan informal summit 15.5.2026, declaration calls for completing consideration of a draft Agreement on the Mutual Recognition of Electronic Digital Signatures (press; OTS PDF not machine-readable from here). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3 (TDT member and observer slots), §1.4 (Art. 14), §6 (three interoperability levels), §6.1 (external lists, LoTE); ADR-0035 (EU-compatible, PO1-PO4), ADR-0036 (external lists; none added); live lotl.json (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved), checked 2026-10-08. -->

eIDAS 2.0 is the EU law that makes every member state offer a digital identity wallet by the end of 2026. The Architecture and Reference Framework (ARF) is the technical blueprint behind it. Together they define a complete trust system: the wallet, the identity data issued by the state, attestations such as diplomas, signed trust lists, registration of every service that asks for data, and certification. For the Turkic world the law itself does not apply, but its standards are becoming the shared language that EU banks, universities and employers will read. A state outside the EU can adopt that language now. Recognition by the EU is a separate step, and it is taken by governments.

## What did the EU build with eIDAS 2.0?

Regulation (EU) 2024/1183, called eIDAS 2.0, amends the 2014 eIDAS regulation ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). The 2014 text dealt mainly with national eID schemes and electronic signatures. The 2024 text adds a full ecosystem around a wallet on the phone. Six building blocks carry it:

![Six building blocks of eIDAS 2.0: wallet, PID, attestations, trust lists, relying party registration, certification](/blog/eidas-arf-for-the-turkic-world/en/fig-yapi-taslari.png)

| Building block | What it is | Legal basis |
|---|---|---|
| **European Digital Identity Wallet** | The app that holds a person's identity data and credentials and shares them under the person's control | Art. 5a |
| **PID** (person identification data) | The core identity data, issued by or for the state at a high level of assurance | Art. 5a, Implementing Regulation 2024/2977 |
| **Electronic attestations of attributes** | Every other credential: diplomas, licences, memberships. A *qualified* attestation (QEAA) comes from a qualified trust service provider; a public-sector attestation (PuB-EAA) comes from a body responsible for an authentic source | Art. 45b–45h, Implementing Regulation 2025/1569 |
| **Trust lists** | Signed lists that say which providers are trusted, for what | Art. 22; ETSI TS 119 612 and ETSI TS 119 602 |
| **Relying party registration** | Every service that wants to ask a wallet for data registers in a member state and declares what it will ask for and why | Art. 5b, Implementing Regulation 2025/848 |
| **Certification** | Wallets are certified by conformity assessment bodies before they are offered | Art. 5c, Implementing Regulation 2024/2981 |

Two points are easy to miss. First, the trust lists are what make the system work across borders. A verifier in one country does not need a private arrangement with every university in another; it reads one signed list ([how a signed trust list works](/blog/how-trust-lists-work)). Second, relying party registration protects the person as much as the signature does: the wallet can compare what a service asks for with what it registered to ask for, and warn when the request goes further.

## What is the ARF, and how does it relate to the law?

The regulation sets obligations. The implementing regulations fix the technical details and point to standards. The ARF is the reference document that ties all of it into one architecture: roles, flows, the data model, the trust model, high-level requirements per role, and rulebooks for each credential type. The European Commission publishes it openly on GitHub. Its current version, 3.0.0, was released on 23 July 2026 ([ARF release](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Underneath sit open standards that anyone may use: IETF SD-JWT VC and ISO/IEC 18013-5 mdoc for credentials, OpenID4VCI and OpenID4VP with the HAIP profile for issuing and presenting them, the IETF Token Status List for revocation, X.509 certificates for institutions, and the ETSI trust list formats. ETSI TS 119 602 defines lists of trusted entities (LoTE), the JSON list format used for wallet providers, PID providers and other entities that are not qualified trust service providers ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

None of these standards is restricted to the EU. That is the opening for everyone else.

## When does each part apply?

![The eIDAS 2.0 timeline from the regulation in 2024 to the duty to accept wallets at the end of 2027](/blog/eidas-arf-for-the-turkic-world/en/fig-takvim.png)

| Date | Event | Source |
|---|---|---|
| 20 May 2024 | Regulation (EU) 2024/1183 enters into force | Art. 2 of the regulation |
| 24 December 2024 | First five implementing regulations in force: 2024/2977 (PID and attestations), 2024/2979 (wallet integrity and core functions), 2024/2980 (notifications), 2024/2981 (certification), 2024/2982 (protocols and interfaces) | adopted 28 November 2024, published 4 December 2024 |
| 7 May 2025 | 2025/848 (registration of relying parties) and 2025/849 (list of certified wallets) published | adopted 6 May 2025 |
| 30 July 2025 | 2025/1569 (qualified and public-sector attestations) published | adopted 29 July 2025 |
| 22 July 2026 | 2026/1731 published, updating the standards referenced in four of the first acts | adopted 15 July 2026 |
| 23 July 2026 | ARF 3.0.0 released | GitHub |
| End of 2026 | Every member state provides at least one wallet | Art. 5a(1): 24 months after the implementing acts |
| End of 2027 | Private services that must use strong authentication (banking, transport, energy, health, education, telecoms and others) accept the wallet when the user asks | Art. 5f(2): 36 months |

For a verifier, the last row matters most. From the end of 2027 a bank in the EU must accept identification with a wallet when a person asks for it. The same dates, step by step, are in [The European timeline](/learn/eu-timeline).

## How was it tested before the deadline?

The Commission funded large-scale pilots that ran the ARF in real services. Four of them started in April 2023: EWC (travel credentials), POTENTIAL (government services, banking, telecoms, driving licences, signatures and health), NOBID (payments) and DC4EU (education and social security). According to the Commission, they brought together more than 350 public and private organisations from 26 member states, Norway, Iceland and Ukraine ([Commission: EUDI Wallet implementation](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). Two further pilots, WE BUILD and APTITUDE, started in 2025.

Ukraine's place in that list is worth noting. A country outside the EU took part in testing the system alongside member states. Taking part in pilots does not create legal recognition. It does show that the technical work is open to neighbours. DC4EU also tested education credentials, the kind that matters most for students and graduates moving between the Turkic states and Europe.

## Why does alignment matter for a country outside the EU?

Because people, goods and qualifications already cross the border, and the paperwork is about to become digital on one side of it. Three situations recur:

- **Education.** A graduate from Bishkek applies for a master's programme in Germany. If the diploma is a signed credential in an EU format, the admissions office's software can check it in seconds. If it is a scanned PDF, someone writes an email and waits.
- **Work and mobility.** An engineer from Tashkent moves to Munich. Employers and banks in the EU will be set up to read wallet credentials; a credential in the same format slots into the same process.
- **Trade.** A company in Baku proves its registration, licences or certificates to an EU partner. The same lists and formats that carry personal credentials carry those attestations.

In each case two different things have to be true. The credential must be *readable*, which is a matter of formats and protocols. And its issuer must be *trusted*, which is a matter of lists and recognition. The Tamga Trust Framework separates interoperability into three levels for this reason:

![Three levels of interoperability: portability and trust are technical, legal recognition is political](/blog/eidas-arf-for-the-turkic-world/en/fig-uc-seviye.png)

1. **Portability.** Same formats and protocols. An EU wallet or verifier can technically process the credential. This can be achieved today, by engineering.
2. **Trust.** Trust lists that point to each other, with each list allowed to vouch only for a defined scope. This is technical too, but it needs a decision on each side about which lists to trust.
3. **Legal recognition.** A state, or the EU, accepts another's credentials as having legal effect. This is decided by governments, through law or agreement.

The first two levels can be built ahead of the third, and that is the point of building early. When two governments decide to recognise each other's credentials, the systems that carry them are already compatible. Nobody has to reissue a diploma because the format changed.

## What is the Turkic world already doing on digital trust?

The Organization of Turkic States has placed digital cooperation on its agenda. Its member states signed a Digital Economy Partnership Agreement at the Bishkek summit on 6 November 2024, covering e-commerce, paperless trade, electronic signatures, data protection and cybersecurity; Türkiye's ratification law was published in its Official Gazette in June 2026 ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). The informal summit in Turkistan on 15 May 2026 took artificial intelligence and digital development as its theme. Its declaration, as reported, calls on member states to complete their consideration of a draft agreement on the mutual recognition of electronic digital signatures, and Kazakhstan's president proposed mutual recognition of digital signatures and electronic documents ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

Mutual recognition of signatures is the legal level of the model above. A shared trust layer is the technical level underneath it. Tamga Network has no agreement with the Organization of Turkic States or any of its member states; it builds the technical level so that it is ready if states want to use it.

## What does Tamga Network take from the EU model?

The technical layer, unchanged. Tamga's rule is that its credential, protocol and trust list formats do not depart from EU standards, and that any Tamga-specific addition goes through a standard extension point without breaking standard clients ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

| EU element | In Tamga Network |
|---|---|
| SD-JWT VC and ISO mdoc | the same; identity credentials in both formats |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | the same |
| Token Status List | the same |
| LOTL and national trust lists | the same two-level model; a slot for each Turkic state |
| LoTE (ETSI TS 119 602) | the first format read for external lists |
| Relying party registration and registration certificates | the EU's common registration dataset and certificate model |
| The ARF role set | every role has a place in each national list, even when empty |

The governance layer is written for the Turkic world: each state is the only author of its own list, and recognition between states is decided by each state for itself. The full mapping, and where Tamga's rules differ from the EU's and why, is in [Tamga ARF: how we adapted the European framework](/blog/tamga-arf).

The network's list of trusted lists already carries a slot for each member state of the Organization of Turkic States and for two observer states, and each state can take over its own list ([why the network is bound for a foundation](/blog/network-as-a-foundation)). Today only the Türkiye list is active, and Tamga publishes it provisionally on behalf of the national authority, as the list itself states. The others are reserved. You can read the live list at `trust.tamga.network`.

## What are the honest limits?

- **Tamga Network is not recognised by the EU.** It is EU-compatible: it speaks the same standards and shows this with tests. "EUDI Wallet" is a legal status for wallets provided or recognised by a member state and certified under EU rules. No network or wallet outside the EU can claim it today.
- **There is no shortcut through the regulation.** Article 14 of eIDAS allows trust services from a third country to be treated as equivalent to EU qualified trust services, but only through an EU implementing act or an agreement between the EU and that country under Article 218 TFEU. That is a negotiation between governments. Tamga can make the technical side ready; it cannot start or conclude that process.
- **No external list has been added yet.** The mechanism for pointing to another state's list or to an EU list is in place, with a pinned signer and a defined scope ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Each addition is a separate, recorded decision, and none has been made.
- **The trust anchor rests on one operator today.** The lists are signed, versioned and publicly logged, but until a second independent operator joins, the network relies on a single signature. This is stated in the framework as a known limit ([Tamga ARF](https://arf.tamga.network/architecture)).
- **Recognition between Turkic states is also political.** A Kazakh verifier trusting a Turkish university is a decision for Kazakhstan. The network makes that decision easy to express and to enforce in software; it does not make it.

## Frequently asked questions

### Does eIDAS 2.0 apply to Türkiye or the Central Asian states?

No. It binds EU member states and services covered in the EU. Its standards are open, so any state or institution can use them, and companies offering services inside the EU should check their own obligations with a lawyer.

### Can a credential issued in Türkiye be accepted in the EU?

It can be read by EU software if it uses the same formats, which Tamga credentials do. Being trusted with legal effect needs recognition of its issuer, through trust lists and, for qualified status, an agreement or implementing act under Article 14.

### What is the difference between the regulation and the ARF?

The regulation and its implementing acts are law. The ARF is the Commission's technical reference that describes the architecture, roles and requirements those acts rely on. Version 3.0.0 is current, released on 23 July 2026.

### Is Tamga Network working with the Organization of Turkic States?

No. There is no agreement with the organisation or its member states. The network reserves a list slot for each of them and is designed so that a state can take over its own list whenever it chooses.

### Why build now if recognition depends on governments?

Because the technical levels take time and do not depend on a political decision. If they are ready, a later recognition decision applies to credentials people already hold, without reissuing them.

## Sources

- [Regulation (EU) 2024/1183 (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): Art. 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h
- Implementing Regulations [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [European Commission: EUDI Wallet implementation and large-scale pilots](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [EU trusted lists browser](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: OTS Digital Economy Partnership Agreement](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Turkistan informal summit](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [ADR-0035: positioning](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: trust federation](https://docs.tamga.network/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [For states](/learn/for-states) · [Manifesto](/manifesto)

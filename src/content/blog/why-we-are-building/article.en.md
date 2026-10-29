---
title: "Documents are digital, trust is still on paper: why we are building Tamga Network"
slug: why-we-are-building
description: Digital documents are still verified across borders by phone calls and apostilles. Why we are building Tamga Network, how it works and what is ready today.
date: 2026-10-29
lang: en
category: announcements
draft: false
related: learn:what-is-tamga-network, a-pdf-is-not-a-document, why-no-blockchain-yet, how-trust-lists-work, page:/manifesto
---

<!-- Sources: site home (hero lead, why.problems incl. EU end-2026 line, how.steps, hero.rows and listNote); live list of lists at trust.tamga.network (TR ACTIVE with provisional operator; AZ, KZ, KG, UZ reserved as TDT members; HU, TM reserved as observers; first wallet provider TAMGA-WP-1 ACTIVE since 2026-10-14); brand page (mark description); manifesto v1.0 revised edition 2026-10-27 (lead: "who will build it and who will only buy it"; thesis "Sovereign and compatible at once"); CHANGELOG 1.0.0 (ARF 1.0, docs EN/TR, list publisher, Tamga Verify, federation); packages 0.7.4 on npm since 2026-10-29 (0.7.3 since 2026-10-27); OpenID self-test article 2026-10-27; ledger code behind a flag, off in production (ADR-0051 Proposed), at least two independent operators (ADR-0009); network does not operate wallets (ADR-0042); Tamga Wallet not in the stores (wallet store documents); no external security audit yet (audit preparation 2026-10-29); Regulation (EU) 2024/1183 Art. 5a. -->

Tamga Network is a set of shared rules and signed lists that lets a digital document issued by one institution be verified by another, even in another country, within seconds. The verifier does not call the issuer, and the holder shares only what is asked for. We are building the network for the Turkic world, with the same standards as Europe's digital identity framework. This article explains why we started, how the network works, where the name comes from, which principles it follows, and what is and is not ready today.

## How is a document verified today?

When an institution in Almaty wants to verify a document issued in Baku, it takes phone calls, emails, an apostille and weeks. What the institution usually holds is a scanned PDF or a photocopy. Both are easy to alter, and telling the real one from a fake takes an expert.

The problem has a personal side too. To prove your age you hand over your whole ID card, and to prove you graduated you hand over your full transcript. Each of those copies ends up on someone else's server. On top of that, every country builds its own digital system. These systems do not recognise each other, so a document that is digital in one country turns back into paper in the next.

Documents have gone digital, but the trust we place in them still runs on paper. We go through these problems one by one in [A PDF is not a document](/blog/a-pdf-is-not-a-document).

## How does Tamga Network work?

Three parties take part: the institution that issues the document, the person who carries it and the party that checks it. All three rely on the same signed list.

![Three steps: the institution signs, the person carries it, the verifier is sure in seconds](/blog/why-we-are-building/en/fig-steps.png)

1. **The institution signs the document.** A university, hospital or chamber of commerce signs it digitally with its own key and sends it to the person's wallet. The institution's key is registered in the state's signed trust list.
2. **The person carries it.** The document lives on the phone. When someone asks for something, the person sees who is asking, for what and why, and shows only what they approve.
3. **The verifier is sure in seconds.** It checks the signature and the institution's entry in the list. It does not call the source and does not wait.

The whole design rests on the verifier not calling the issuer. The signature proves that the document came from that institution and that not a single letter has changed. The trust list confirms that the signer really is that institution. Together they replace the phone calls, the emails and the apostille.

## What are trust lists for?

Anyone can create a key and sign something, so a valid signature does not yet tell you whether the signer is a real university. Trust lists answer that question. They form a chain in which each link signs the next.

![Chain of trust: list of lists, Türkiye list, institution certificate, document](/blog/why-we-are-building/en/fig-chain.png)

At the top sits the **list of lists**, which says which national lists are valid. Each state's **own list** names the institutions allowed to issue documents in that country. The **institution certificate** identifies the institution's key, and the **document** is signed with that key. The European Union uses the same model.

Every state publishes its own list. This is where the lists stand today:

| List | Status |
|---|---|
| Türkiye | Live. Tamga runs it provisionally, on behalf of the state. |
| Azerbaijan, Kazakhstan, Kyrgyzstan, Uzbekistan | Seats reserved for these member states of the Organization of Turkic States; each state will publish its own list. |
| Hungary, Turkmenistan | Seats reserved for the organisation's observer states. |
| European Union | The network can read EU lists as external lists; no EU list is connected today. |

## Why the name Tamga?

A tamga is the old seal of the Turkic and Mongolic peoples. It was struck on animals, weapons, carpets, gravestones and documents, and it showed who something belonged to, who a word came from and that an authority was real. Every tribe had its own tamga, which served as identity, signature and title deed at once.

A verifiable digital credential does the same job today, except that the mark is made with mathematics instead of a chisel. Our logo comes from the same idea. The mark is a nested T: the outer T stands for the network, and the two inner arms stand for the states and institutions that join it. It is cut like a seal, with one stroke weight, one angle and no curves.

## Which principles does the network follow?

| Principle | What it means |
|---|---|
| The person at the centre | The document stays in the person's wallet, and the person decides what to show. |
| The network belongs to no one | It sells no services and gives no one a privileged position. The goal is an independent foundation. |
| The list belongs to the state | Every state owns its trust list and decides whom it recognises. |
| No personal data on the network | Lists, records and logs carry no personal data, not even a hash of it. |
| Open rules, open code | Every rule is numbered and public, and the code is on GitHub. |

Each principle becomes numbered rules in our rulebook, the Tamga ARF. For example, "no personal data on the network" requires that no document content and no document hash appear in the trust lists, in the logs or in a future shared ledger.

## Why now?

The European Union requires every member state to offer its citizens a digital identity wallet by the end of 2026. The standards around it are settling, and credential formats, protocols and trust lists are now defined. Our manifesto puts it this way: whether this change will happen is no longer the question, and the real question is who will build it and who will only buy it.

We could import the new model or build our own infrastructure on the same open standards, and we chose to build. We use the same credential formats and protocols as Europe, while the rules and the lists belong to the states of the Turkic world. That keeps the network compatible with Europe and independent at the same time. The [EU timeline](/learn/eu-timeline) page shows the European dates in detail.

## What is ready today, and what is not?

| Ready today | Not yet |
|---|---|
| Rules: Tamga ARF 1.0 and the rulebooks (arf.tamga.network) | No institution issues on the real network; the first one joins with the pilot |
| Developer documentation in English and Turkish (docs.tamga.network) | No wallet on the list is in the app stores yet |
| Signed trust lists (trust.tamga.network), with the first wallet provider listed | No shared ledger in production; its code is written and tested, but it stays off until at least two independent operators run it |
| Tamga Verify, a verification service for those who do not want to run verification code themselves | No recognition by any state or by the European Union |
| A test network for end-to-end trials with made-up people, and open packages on npm (@tamga-network, version 0.7.4) | No external security audit yet |
| A self-test with the OpenID Foundation's conformance tool that ended without a failed module | |

We write these limits down because trust infrastructure that hides them does not deserve trust. The reason there is no shared ledger yet is in [Why we start without a blockchain](/blog/why-no-blockchain-yet): without at least two independent operators, a ledger is only a slower database. The details of the conformance tests are in [What we learned passing the OpenID conformance tests](/blog/openid-conformance-self-test).

## Where should you start?

- **If the concepts are new to you,** the [learning path](/learn) leads from digital identity to Tamga Network step by step.
- **If your institution issues or verifies documents,** the [join page](/join) explains how to take part.
- **If you are a developer,** the [sandbox guide](https://docs.tamga.network/guides/sandbox) shows how to try every step on the test network.

## Frequently asked questions

### Is Tamga Network a blockchain?

No. Trust comes from signed, versioned lists today. The code for a shared ledger is written and tested, but it is switched on only when at least two independent operators run it.

### Who owns Tamga Network?

The network sells no services and gives no one a privileged position. A provisional operator runs it today, and the goal is an independent foundation.

### Where is my document kept?

In the wallet on your own phone. The network's lists, records and logs contain no personal data.

### Is there a wallet I can use today?

The network does not run wallets; it lists them. The first wallet on the list, Tamga Wallet, is not in the app stores yet. Until a listed wallet is in the stores, every step can be tried on the test network.

## Sources

- [What is Tamga Network](/learn/what-is-tamga-network)
- [Trust lists](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network)
- [Manifesto](/manifesto)
- [Regulation (EU) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

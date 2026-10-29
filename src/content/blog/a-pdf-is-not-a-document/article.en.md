---
title: "A PDF is not a document: four problems with documents today"
slug: a-pdf-is-not-a-document
description: A scanned PDF proves neither who issued it nor whether it is still valid. Four problems with documents today, and how verifiable credentials answer them.
date: 2026-10-29
lang: en
category: network
draft: false
related: why-we-are-building, learn:paper-to-digital, learn:selective-disclosure, how-trust-lists-work, zero-knowledge-in-tamga
---

<!-- Sources: site home (why.problems 0–4, tech "credential" and "disclosure", hero.rows); learn pages paper-to-digital, digital-signatures, selective-disclosure, trust-lists, eu-timeline; Tamga ARF 1.0 §4.4 (presentation and verification flow, three results) and §8.4 (standards map); whitepaper §9 and docs concepts/revocation (verifiers prefetch status lists, no request to the institution at verification time; INDETERMINATE is not a rejection); docs concepts/privacy (a separate copy for each verifier); live list of lists (TR ACTIVE; AZ, KZ, KG, UZ reserved as TDT members; HU, TM as observers); manifesto v1.0 revised edition 2026-10-27 (lead); Regulation (EU) 2024/1183 Art. 5a. -->

A scanned PDF is a picture of a document. It proves neither who issued the document nor whether it is still valid. Documents today have four problems: they are easy to fake, slow to verify, they reveal more data than needed, and every country runs its own separate system. A verifiable digital credential answers all four. This article takes each problem in turn, shows how it plays out today and how a verifiable credential solves it, and then follows a diploma from Baku to Almaty.

![Four problems with documents, today and with a verifiable credential](/blog/a-pdf-is-not-a-document/en/fig-problems.png)

## 1. Why is forgery so easy?

Changing the text of a PDF or a photocopy takes a few minutes, and a document with an altered grade, date or name looks like the real one at first glance. Spotting the change takes an expert who knows the seal, the signature, the paper and the typeface. Most institutions have neither the time nor such an expert, so they end up either trusting documents blindly or not trusting them at all.

With a verifiable credential the institution signs the document digitally with its own key. The signature is computed from the content, so if a single letter changes, the calculation no longer matches and the document fails verification. Nobody needs an expert eye to notice the change, because the mathematics shows it.

That leaves one question, since anyone who creates a key can sign something: is the signer really that institution? So besides the signature, the verifier checks the state's signed trust list. If the institution's key is not registered there, the credential is not accepted. A fake university can produce a mathematically valid signature, and the credential is still rejected because the university is not on the list.

## 2. Why does verification take weeks?

When an employer wants to check the diploma of a candidate from another country, it writes to the university and waits. If the document is used abroad, an apostille comes on top. All of this takes weeks because the only way to check is to ask the issuer, and if the university is on holiday, its archive is closed or it no longer exists, the process stalls.

With a verifiable credential the verifier does not ask the source. It checks the signature and the institution's entry in the list itself, which takes seconds. Verifiers also download the trust lists and revocation lists in advance, so the institution receives no request at the moment a credential is checked and never learns where or when it was shown. The credential can be verified even while the institution's servers are offline.

Every verification ends in one of three results.

![Three results of a verification: accepted, rejected, cannot be verified right now](/blog/a-pdf-is-not-a-document/en/fig-outcomes.png)

| Result | When | What it means |
|---|---|---|
| Accepted | The signature is correct, the institution is listed and the credential is not revoked | The credential is valid |
| Rejected | The signature is broken, the institution is not listed or the credential is revoked | The credential is not valid |
| Cannot be verified right now | A required list cannot be obtained at the moment | No decision can be made, and the credential is not treated as fake |

The third result exists because an unreachable server does not make a document fake. Without it, a person could be turned away for a problem that has nothing to do with their document.

## 3. Why do we hand over more data than needed?

To prove your age you show your whole ID card, and to prove you graduated you hand over your full transcript. A doorman who only needs to know whether you are over 18 also sees your date of birth, your address and your ID number. Each copy ends up on someone else's server, and each one is another chance for a leak.

In a verifiable credential every field is sealed separately. The person opens only the field that is asked for and the rest stay closed. The verifier checks the opened field and the signature, and it cannot see the closed fields.

![What the verifier sees: only the requested field is open, the rest are hidden](/blog/a-pdf-is-not-a-document/en/fig-what-is-seen.png)

The wallet goes one step further and shows each verifier a separate copy of the credential, so two verifiers cannot compare notes and match the same person. A zero-knowledge proof can even answer the age question without the date of birth being involved at all. We explain how that works in [Zero-knowledge in Tamga](/blog/zero-knowledge-in-tamga).

## 4. Why does every country build its own system?

Every country builds its own digital system, and these systems do not recognise each other. A digital document issued in one country turns back into paper in another, because the other side can neither read the format nor tell whether to trust the signer.

The answer is shared standards and a shared trust structure. Tamga Network uses the standards of Europe's digital identity framework:

| Layer | Standard | What it does |
|---|---|---|
| Credential format (online) | SD-JWT VC | A signed credential whose fields can be opened one by one |
| Credential format (in person) | ISO mdoc (ISO/IEC 18013-5) | A credential shown face to face from a phone |
| Issuance | OpenID4VCI | Moves the credential from the institution to the wallet |
| Presentation | OpenID4VP | Sends the chosen fields from the wallet to the verifier |
| Trust | Signed trust lists (ETSI) | Records which institution may issue what |

Every state publishes its own trust list, and the lists come together in a list of lists. Today the Türkiye list is live. Seats are reserved for the other member states of the Organization of Turkic States (Azerbaijan, Kazakhstan, Kyrgyzstan and Uzbekistan) and for its observer states, Hungary and Turkmenistan.

## How would a diploma travel from Baku to Almaty?

A graduate of a university in Baku applies for a job in Almaty. Today the employer receives a scan of the diploma, writes to the university and waits for weeks. With a shared trust structure the same check looks like this:

1. The graduate shows the diploma from the wallet on their phone and opens only the degree and the graduation year.
2. The employer checks the signature and sees that the university is registered in Azerbaijan's list.
3. The employer is sure within seconds, without calling Baku and without waiting.

This example assumes that Azerbaijan's list is live, while today only its seat is reserved. The check starts to work between countries once each state publishes its own list.

## What does Europe's progress mean for the Turkic world?

The European Union requires every member state to offer its citizens a digital identity wallet by the end of 2026. Diplomas, driving licences and memberships are moving into the wallet, and they are verified with the same standards. Without a shared trust structure, documents from the Turkic world would stay outside this system. They would not be issued in a format European verifiers can read, and their issuers would not appear in lists that Europe checks.

Our manifesto starts from the same point. Whether this change will happen is no longer the question; the question is who will build it and who will only buy it. Tamga Network's answer is a network built on the same standards, with rules and lists that belong to the states of the Turkic world. The [EU timeline](/learn/eu-timeline) page shows the European dates in detail.

## Frequently asked questions

### What is a verifiable credential?

It is a document that the institution signs digitally. It is kept in the person's wallet, and anyone can verify it without asking the issuer. If a single letter changes, the signature no longer matches.

### Why doesn't the verifier ask the issuer?

Everything it needs is in the signature and in the state's trust list. It checks the signature and confirms that the institution is registered.

### What if the issuer's server is down?

The credential can still be verified, because verifiers download the lists in advance. If a required list cannot be obtained at all, the result is "cannot be verified right now".

### Is the scanned PDF going away?

No. PDFs stay useful for reading and archiving. When a document has to be proven genuine, a signed, verifiable credential does that job.

## Sources

- [From paper to digital](/learn/paper-to-digital)
- [Digital signatures](/learn/digital-signatures)
- [Selective disclosure](/learn/selective-disclosure)
- [Trust lists](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network), §4.4 (presentation and verification) and §8.4 (standards map)
- [Manifesto](/manifesto)
- [Regulation (EU) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

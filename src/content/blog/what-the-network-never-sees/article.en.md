---
title: What Tamga Network never sees
slug: what-the-network-never-sees
description: What Tamga Network's lists, logs and services never contain, where its provisional services touch personal data, and what operators can and cannot access.
date: 2026-10-08
lang: en
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Sources: SPEC-TRUST-0001 TL11 (no personal data, credential or credential hash in any list, anchor log or change log); SPEC-BC-0001 DP1 (ledger later: no personal data, content or hash); ADR-0020 K2 + AS1–AS4 (no register of persons; data read from the authentic source at signing and dropped; persistent only subject_ref and keyed digest; Tamga never gets a contact address); ADR-0041 TI3–TI5 (trial register only in the sandbox); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (values once, deleted ≤ 5 min); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (identity service, data controller, ≤ 30 days provider image retention by contract, 10 copies, 730 days), §9.1 erasure; ADR-0011 (provisional until a state PID provider; Tamga data controller under KVKK); ADR-0022 (non-qualified, I2); ADR-0031 PS1–PS3 and "known weakening" with mitigations; ARF architecture §2.7 (deletion by resetting the wallet), §4.5 item 4 (no IP), §7.2 items 1, 6, 7 (no images at Tamga; statistics only in aggregate, groups ≥ 50); ARF rulebook RB-GEN-05 (no IP raw, hashed or truncated; debug logs ≤ 7 days); ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1 (no wallet operated). SPEC-TRUST-0001 security notes (single operator, quarterly transparency report, audit). Live check 2026-10-08: lotl.json / tl-tr.json fields and anchors.jsonl payloads contain no personal data. -->

Tamga Network never sees the contents of people's credentials in its lists, its logs or its anchor log. It keeps no register of people, does not learn where or to whom a credential is shown, and records no IP addresses. The network does run a few provisional services that touch personal data for a short time: the identity service during identity verification, the hosted issuing service at the moment of signing, and the hosted verifier when a site chooses to use it. For each of these the rules say what may be kept, for how long, and what may never be kept.

## What is in the public trust lists and the anchor log?

The signed trust lists at `trust.tamga.network` name institutions, verifiers and wallet providers. An entry carries a legal name, a certificate fingerprint, a status and its history, dates, addresses, and the credential types an institution may issue or a verifier may ask for. The rule is short: no list, anchor log or change log contains personal data, a credential or even a hash of a credential (rule TL11).

![What each public part of the network contains](/blog/what-the-network-never-sees/en/fig-katman.png)

The anchor log records every publication of an institution's status list as a signed line: which list, which version, which digest. No line says anything about a person, and no line contains a position in a status list. When the network later moves its records to a shared ledger, the same rule moves with it: no contract stores personal data, credential content or a credential hash (DP1). You can check this yourself; the lists have readable copies at `trust.tamga.network/lotl.json` and `tl-tr.json` ([How a signed trust list works](/blog/how-trust-lists-work)).

## Where do people's credentials live?

With the person, and nowhere in the network. A credential travels from the institution's system to the person's wallet. Tamga keeps no register of people: in hosted issuance the data is read from the institution's own system, its authentic source, at the moment of signing, and dropped from memory once the credential is issued ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Two things are kept, and only these two. The institution's opaque reference for the person, so that it can later revoke or renew the credential. And, for an offer bound to a person's identity, a keyed digest of the matching keys, never the plain identity number. Tamga never receives a person's e-mail address or phone number for an offer: the institution sends the link itself.

The Institution Console has a "sample source" register for trying things out. It exists only in the sandbox, for test institutions, and is wiped every night; it cannot be opened on the real network.

## Who sees a presentation?

The wallet and the verifier, and nobody else in the normal case. The presentation goes straight from the wallet to the verifier. Status lists and the schema catalogue are fetched in bulk, ahead of time, so nothing is requested from the institution or the network at the moment a credential is shown ([Revocation without tracking](/blog/status-list-privacy)). The person's presentation history stays on the phone; it never goes to a server or into a backup, and leaves the device only in a password-protected export the person makes (rule WL4). For an age check the verifier can see even less: with a zero-knowledge proof it learns only that the person is over 18 ([Zero-knowledge in Tamga](/blog/zero-knowledge-in-tamga)).

A site that does not want to run its own verification software can use the hosted verifier, Tamga Verify. Then Tamga Verify does see the fields the person agreed to share, because it checks them on the site's behalf. The rules limit that exposure: the values are released only to the registered site that opened the request, at most once, and deleted from memory at most five minutes after the result ([ADR-0017](https://docs.tamga.network/adr/0017-hosted-verifier-result-access)). The verification result itself carries field names, not values, and never a status list position (AP3, AP4).

## What does the identity service see?

Until a state identity provider is appointed, Tamga runs a provisional identity service that verifies a person remotely and issues an identity credential to their wallet ([ADR-0011](https://docs.tamga.network/adr/0011-provisional-identity-attestation-provider)). It is registered as a non-qualified service; "qualified" is a legal title that needs an independent assessment Tamga does not have yet. During verification:

- a licensed remote verification provider sees the person's identity document and face; Tamga is the data controller for this processing, and the person reads the notice and gives explicit consent before verification starts;
- the identity service holds the person's fields only until the credential is issued;
- afterwards it keeps an opaque reference, a keyed hash of the document number, the expiry and the status list positions of the copies, and nothing else;
- document images, selfies, video and raw text from the document are never stored at Tamga; the provider's own retention of images is limited by contract to at most 30 days ([identity proofing, §8 and §9](https://docs.tamga.network/specifications/identity-proofing)).

![Where personal data passes, and how long it stays](/blog/what-the-network-never-sees/en/fig-gecis.png)

A person can erase their record without an account. The wallet presents the identity service's own credentials as proof of ownership; the service then deletes the record and its event log lines, revokes all copies and asks the provider to delete its session. Resetting the wallet does the same, together with the wallet's record at its own provider.

## What about the pseudonyms used to sign in to websites?

"Sign in with Tamga" gives each website its own stable pseudonym, and two websites cannot match the same person ([ADR-0031](https://docs.tamga.network/adr/0031-per-site-pseudonyms)). The pseudonym is derived in the wallet from a seed. The seed is derived in the identity service from the person's unchanging identity with a separate key, delivered to the wallet in a credential type that is never shown to a site, and not stored by the service.

The decision record states the limit openly, so we repeat it here. Someone holding both that key and a person's identity number, for example the identity service's operator colluding with a website, could compute that person's pseudonym on that website. The mitigations are a protected key store, logged key access, key usage counts in the transparency report and the option to hand the key over to a state identity provider. Before this design, every site could match everyone.

## What do the network's logs contain?

Less than most web services keep. No Tamga service records IP addresses: not raw, not hashed and not truncated. Debug logs are kept for at most seven days ([Tamga ARF rulebook, RB-GEN-05](https://arf.tamga.network/rulebook)). Logs and results contain no claim values, no identity numbers and no status list positions; the identity service logs event type, an opaque session reference and a level, never a name, a document number or a score. Usage statistics are published only in aggregate, in groups of at least 50 ([ARF §7.2](https://arf.tamga.network/architecture)).

## How is the sandbox kept apart?

The sandbox at `sandbox.tamga.network` is a separate test network with its own root certificate and its own lists ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). The real network's keys sign nothing there, the sandbox lists mark themselves as test, and a wallet or verifier set up for the real network refuses them. A sandbox credential therefore never passes at a real verifier.

By default the sandbox uses made-up people with identity numbers in an invalid format. There is an optional path to try identity verification with a real document. Before it starts the person confirms a clear test warning; only the given name, family name and date of birth go into the credential, never the identity number or the document number; the provider's session is deleted at once; and everything is wiped at the nightly reset ([ADR-0040](https://docs.tamga.network/adr/0040-sandbox-invited-real-identity)). Test institutions cannot store a record carrying an 11-digit number that passes the Turkish identity number checksum.

## What can operators access, and what can they not?

![What the network's operators can and cannot access](/blog/what-the-network-never-sees/en/fig-isletmeci.png)

| Operators can access | Operators cannot access |
|---|---|
| data in transit while a hosted service works: at signing, during identity verification, and for up to five minutes in Tamga Verify | the content of credentials after issuance |
| the identity service's records: opaque references, document number hashes, expiry, status positions | the person's presentation history, which stays on the phone |
| revocations an institution makes through the hosted issuing service | where, when or to whom a credential is shown |
| server access logs, which carry no IP addresses | keys on people's phones, or wallets' own records (the network runs no wallet) |

The right-hand column is enforced by design: the data is not there. The left-hand column depends on the operator following rules, and that is why it is short, time-limited and written down.

## What are the honest limits?

- **The identity service is a point of trust.** It sees identity data during verification and holds the pseudonym key. It is provisional by design, and its role is meant to pass to a state identity provider.
- **One operator today.** The lists, the anchor log and the hosted services are run by a single, provisional operator. The public log, the change log, the quarterly transparency report the rules call for and independent audits deter misuse; they do not make it impossible. That limit goes when independent operators share the ledger ([Why we start without a blockchain](/blog/why-no-blockchain-yet)).
- **Hosted services see what they process.** An institution or a site that wants to see nothing pass through the network can run the open-source issuing and verification packages on its own servers.

## Frequently asked questions

### Does Tamga Network store my diploma or my identity data?

No. Your credentials are on your phone. The lists contain only institution and verifier data. The identity service keeps an opaque reference and a keyed hash of your document number after issuance, never your document images.

### Can Tamga see where I use my credentials?

No. Verifiers download status lists in advance, and presentations go straight from your wallet to the verifier. If a site uses Tamga Verify, it sees only the fields you agreed to share, for at most five minutes.

### Does Tamga log my IP address?

No Tamga service records IP addresses, raw, hashed or truncated.

### Can I have my data deleted?

Yes. Your wallet can ask the identity service to erase your record by presenting its credentials, and resetting the wallet does the same. You can also send an erasure request to an institution or a verifier from the wallet.

### Is the sandbox safe to try with my real identity?

It is optional and limited: only your name and date of birth go into the test credential, the provider session is deleted at once and everything is wiped every night. By default the sandbox uses made-up people.

## Sources

- [Regulation (EU) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [Regulation (EU) 2016/679 (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: architecture (§2.7, §4.5, §7.2)](https://arf.tamga.network/architecture) · [Tamga ARF: rulebook](https://arf.tamga.network/rulebook)
- [Tamga Network: privacy](https://docs.tamga.network/concepts/privacy) · [Identity proofing](https://docs.tamga.network/specifications/identity-proofing) · [Trust lists](https://docs.tamga.network/specifications/trust-lists)
- [ADR-0020: authentic source at the institution](https://docs.tamga.network/adr/0020-authentic-source-at-institution) · [ADR-0031: per-site pseudonyms](https://docs.tamga.network/adr/0031-per-site-pseudonyms) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox)
- [Data minimisation](/learn/data-minimisation) · [Consent and control](/learn/consent-and-control) · [What is a trust network?](/blog/what-is-a-trust-network)

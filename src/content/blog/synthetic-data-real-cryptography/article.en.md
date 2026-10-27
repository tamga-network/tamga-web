---
title: "Real cryptography, working today: the Tamga first release"
slug: synthetic-data-real-cryptography
description: What runs end to end today (diplomas, revocation, identity, passes, tickets, website sign-in) and every shortcut we still take, listed openly.
date: 2026-09-27
lang: en
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

We built the system a university would actually use and then ran it on invented students. Everything cryptographic is real. Only the people and some operational pieces are not.

## What runs today

- A university issues a diploma or student card into the wallet as ten copies, each bound to a different device key.
- An employer asks for two fields and gets exactly those two, verified in seconds.
- A revocation reaches every verifier at the next fixed publication. Suspending a university stops new issuance, while diplomas it issued earlier stay valid.
- A screenshot of a credential is rejected, and so is a copy presented with another phone's key.
- An identity check produces an identity credential, also as an ISO mdoc, and an age check receives only "over 18".
- Campus turnstiles and event gates accept a 60-second QR pass, and a ticket works once.
- A website signs a person up with the wallet and then lets them in every day with a passkey.

## What is still a shortcut

Every shortcut is recorded and will be closed before the pilot. The student records are samples, and keys live in software rather than in the phone's secure chip. The university's signing key is held by Tamga. The wallet provider does not accept the app's own statement about its platform, so every wallet counts as software-level, and with the App Store and Google Play release App Attest / Play Integrity become mandatory. There is also a single operator. At sign-up, the website sign-in still uses one account value across sites, and a per-site pseudonym is on the roadmap. *(Update, 2026-10-06: per-site pseudonyms are now live. The network runs no wallet provider, and each wallet runs its own (ADR-0042). On the real network, Tamga does not hold institutions' signing keys (Tamga ARF §3).)*

> **Note:** Update, 8 October 2026: in the wallet builds, keys now live in the phone's secure hardware, and wallets without hardware attestation get no wallet attestation on the live service. App Attest and Android key attestation are used, and Play Integrity is an optional extra check. See [How do you trust a wallet?](/blog/trusting-a-wallet).

## Why say all this

Trust infrastructure that hides its limits does not deserve trust. What the network does, and does not do, is explained in [What is a trust network](/blog/what-is-a-trust-network), and why it starts without a ledger is explained in [Why we start without a blockchain](/blog/why-no-blockchain-yet). The side-by-side comparison with the EU architecture (same, bridged, planned) is in [roles and terms](/learn/roles), and the plan is in the [whitepaper](/whitepaper).

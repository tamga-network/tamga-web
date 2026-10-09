---
title: "Zero-knowledge in Tamga: Longfellow, circuits, trust list"
slug: zero-knowledge-in-tamga
description: How Tamga Network checks "over 18" with a Longfellow zero-knowledge proof, why circuits sit in the signed trust list, and what works today.
date: 2026-10-08
lang: en
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Sources: ADR-0032 1.0.0 (plain summary; context: Longfellow open source Apache-2.0, foundation, EU age-verification profile and TS13 built on it, no trusted setup, v8 binds docType not namespace; Stage 1 measurements 518 ms / 211 ms / ~343 KB, negative tests; K1 longfellow-libzk-v1 ≥ v8; K2 circuits by digest in lotl.jws, update = list update + CHANGELOG; K3 first predicate age_over_18, equality predicates next, ranges and hiding the institution out of scope; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB not in QR; K5 fallback batch copies; K6 no revocation, short-lived, accept_unrevocable_zk; K7 device key signature over SessionTranscript, public key hidden; K8/ZK6 unique attribute names; Stage 2b Android libraries built 2026-10-07, iOS pending; Stage 2c wallet wiring, proving off until phone libraries; Stage 3 verifier WASM 889 KB pinned d5e6be77, ~3 s desktop; native backend 0.2–0.3 s; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README (entry points, circuit files ~300 KB checked against list SHA-256, iOS available() false, any wallet). guides/verify-on-server (policy example, Z1, NOT_APPLICABLE, fallback age-over-18-mdoc). SPEC-API-0001 Z1 and INDETERMINATE list. ARF architecture §2.6, §2.8. Tamga Verify policy set age-over-18-zk with accept_unrevocable_zk: true. Live 2026-10-08: verify.tamga.network/policies lists age-over-18-zk; trust.tamga.network/lotl.json zk_circuits entry (id 5a8938…3c9291, v8, 1 attribute, ACTIVE, sha256 f44ab1…0d83); zk/<id>.zst 299,999 bytes, SHA-256 matches. External: Longfellow ZK GitHub (several independent security reviews), IACR ePrint 2024/2010 "Anonymous credentials from ECDSA", Google announcement of open-sourcing, EU TS13 (exploratory; to ETSI TS 119 476-2), EU age verification blueprint. -->

A zero-knowledge proof lets a wallet prove a statement about a credential, such as "this person is over 18", without showing the credential itself. In Tamga Network the verifier learns only that a registered institution's identity credential says `age_over_18 = true`. It does not see the date of birth, the other fields, the institution's signature or the device key, and two presentations by the same person cannot be linked. Tamga uses Longfellow ZK over the institution's existing [ISO mdoc](/blog/iso-mdoc-deep-dive) credential, so the institution changes nothing. The verifier side is live on Tamga Verify (policy `age-over-18-zk`); the accepted proof circuits are published in the signed trust list; on the wallet side the Android native library is ready and the iOS library is pending.

## What does the proof actually prove?

A classic presentation of an over-18 attribute already hides the date of birth: the wallet discloses one field, `age_over_18`, and nothing else. What it cannot hide is the institution's signature over that field, and that signature is identical every time the same copy is shown. Tamga issues every credential as 10 copies so that different verifiers see different signatures. That works, but copies run out and must be refreshed.

A zero-knowledge proof removes the signature from view altogether. The wallet runs a computation over the credential it holds and produces a proof that the computation came out right. With Longfellow circuit version 8, the proof binds:

![What a zero-knowledge presentation shows and hides](/blog/zero-knowledge-in-tamga/en/fig-gosterir.png)

- the institution's public key, which the verifier matches against the trust list;
- the credential type (the mdoc docType);
- the attribute name and its value, here `age_over_18` and `true`;
- a signature by the device key over this session's transcript, so the proof is tied to this verifier and this request, while the device public key itself stays hidden;
- the validity of the credential at the time of proving.

What it does not bind is the namespace inside the credential. A proof says "in this institution's credential of this type, some namespace has `age_over_18 = true`". Tamga closes that gap with a catalogue rule: within one credential type, an attribute name may appear in only one namespace, and the schema catalogue checks this when it is built (rule ZK6).

## Why Longfellow ZK?

Several approaches exist. The deciding question for Tamga was whether institutions would have to change how they sign. The decision record weighs them ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)):

| Option | Outcome | Why |
|---|---|---|
| Longfellow ZK | accepted | institutions keep their ES256 mdoc signatures; no trusted setup; open source; independently reviewed; the EU's age-verification work builds on it |
| BBS signatures | rejected | institutions would have to change keys and signature format; not on the EU's approved list |
| Batch copies only | kept as fallback | works today, but copies run out and the signature repeats per copy |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk) proves statements about ECDSA-signed mdoc credentials. It was released as open source under Apache-2.0 ([announcement](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), is described in the paper [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010), and has completed several independent security reviews. It needs no trusted setup, so there is no secret ceremony that someone would have to be trusted to have destroyed. The EU's draft technical specification for arithmetic-circuit proofs in wallets, [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md), is written around the same approach and is still exploratory; its further work moves to ETSI.

## Why are circuits listed in the signed trust list?

A circuit is the program the proof is about. A verifier that accepted any circuit could be shown a proof of something other than what it asked for. So a Tamga verifier accepts only circuits that the network has reviewed and published by their digest, with status `ACTIVE`, in the signed list of trusted lists. An unknown or inactive circuit is rejected (rule ZK2).

This is the live entry on 8 October 2026:

```json title="trust.tamga.network/lotl.json → zk_circuits (live, 8 October 2026)"
{
  "circuit_id": "5a8938159603876eb537a117cfe9e2eaec5a01a042b316a8e57e52e4bb3c9291",
  "system": "longfellow-libzk-v1",
  "version": 8,
  "attributes": 1,
  "sha256": "f44ab1a415f284251ea6ad5451d2588c1e7011eb9ba46091116e8caa4c8e0d83",
  "status": "ACTIVE"
}
```

The circuit file itself is published next to the lists at `trust.tamga.network/zk/<circuit_id>.zst`, about 300 KB, and contains no personal data. A wallet can ship it inside the app or download it; either way it checks the file against the `sha256` in the signed list before use, so where the file came from does not change what is trusted. We checked the published file against the list on the date above, and the digests match.

![From the pinned root fingerprint to an accepted proof](/blog/zero-knowledge-in-tamga/en/fig-zincir.png)

A circuit update is a list update. It does not need a new architecture decision, but it is published as a new signed list version and recorded in the public change log, like any other change to the list ([How a signed trust list works](/blog/how-trust-lists-work)).

## How does a verifier check a proof?

The verifier package compiles only Longfellow's verification code to WebAssembly. The module is 889 KB, has no external dependencies, is built from a pinned upstream commit and can be rebuilt reproducibly. A verification takes about 3 seconds on a desktop in WebAssembly. For high volume there is a native backend built from the same source that takes about 0.2 to 0.3 seconds; Tamga Verify uses it and falls back to WebAssembly if the native process does not answer. An error on either path never counts as "valid".

In the verification pipeline this is step `Z1`. It asks four things: is the circuit in the signed list and does the file digest match; were only the requested elements disclosed, from one namespace; is the timestamp within its window; is the proof valid. The usual checks of the institution signature, the device signature and the validity period run inside the proof. Before `Z1` the verifier still decodes the response, checks the docType, and reads the institution's certificate chain to find the institution in the trust list ([verification API](https://docs.tamga.network/specifications/verification-api)).

## When is the result INDETERMINATE and when REJECTED?

Tamga keeps the three-valued result for zero-knowledge too: a credential is never called fake because something on the verifier's side was missing.

![Results of a zero-knowledge presentation, case by case](/blog/zero-knowledge-in-tamga/en/fig-sonuc.png)

| Case | Result |
|---|---|
| Circuit not in the signed list, or not `ACTIVE` | `REJECTED` |
| Proof tampered with, wrong institution key, another session or another verifier | `REJECTED` |
| Circuit file or WebAssembly missing on the verifier's side | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| Valid proof, policy has `accept_unrevocable_zk: false` | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| Valid proof, policy has `accept_unrevocable_zk: true` | `ACCEPTED`, status `NOT_APPLICABLE` with a reason |

The rejections in the second row were tested on purpose in the first desktop trial: a changed value, a wrong institution key, another session's nonce, another verifier, "true" claimed from a credential that said "false", another docType and a corrupted proof all failed.

## Why can a zero-knowledge presentation not show revocation?

To check revocation, the verifier needs the credential's position in the institution's [status list](/blog/status-list-privacy). That position is fixed per credential, so revealing it would make two presentations linkable again, which is the very thing the proof is meant to prevent. The circuit therefore does not check revocation (rule ZK4).

Tamga's answer has two parts. The decision ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies), the EU ARF's short-lived attestation path) is that a zero-knowledge presentation uses only short-lived copies of the identity credential, valid for at most 24 hours and refreshed by the wallet on its own; once the credential is revoked no new copy is issued, so the last one stops working within a day. That is not implemented yet. Until it is, the verifier's policy must say explicitly whether it accepts a presentation whose revocation cannot be checked; if the field is left out, it counts as `false`:

```ts title="Policy for an over-18 check with a zero-knowledge proof"
const policy: Policy = {
  policy_id: "age-over-18-zk",
  purpose: { "en-US": "Over-18 check, yes/no only" },
  credentials: [{
    id: "identity",
    vct_values: ["urn:tamga:id:IdentityAttestation:1"],
    format: "mso_mdoc_zk",
    namespace: "tamga.id.1",
    required_claims: ["age_over_18"],
    constraints: { age_over_18: true }, // equality only
    accept_unrevocable_zk: true,        // knowingly accept: revocation cannot be checked
  }],
  trust: { /* … */ },
  freshness: { /* … */ },
};
```

A site where revocation must be checked uses the classic `mso_mdoc` policy instead. A private revocation proof will get its own decision once the EU settles the revocation scheme for TS13.

## How does a site ask for a proof?

The request uses [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) with a DCQL query whose format is `mso_mdoc_zk`, as in TS13; the browser Digital Credentials API is the second transport (ready on the verifier side; wallets are not connected to it yet). A proof is about 350 KB, so it cannot be carried in a QR code. For in-person checks over Bluetooth, the decision waits for on-device measurements.

On Tamga Verify the zero-knowledge and classic checks are two separate policies, both listed at `verify.tamga.network/policies`: `age-over-18-zk` and `age-over-18-mdoc`. If the person's wallet cannot produce a proof, the site can ask again with the classic policy, if it allows that path. That classic path still discloses only the `age_over_18` field; what it adds is the institution's signature on one of the person's copies. How to wire this into a site is in [Add "verify with Tamga" to your website or app](/blog/add-verification-to-your-site).

## Where is the wallet side today?

Proof generation is an open network package, `@tamga-network/zk`, so that every wallet on the network uses the same prover; it is not a feature of one wallet. The package has three entry points: a pure TypeScript core that turns a DCQL query into the claims to prove, picks the circuit from the trust list and checks it against the digest; an on-device prover for React Native; and a desktop prover for tests and conformance runs.

The wallet first produces its usual device-signed response for the session, with the hardware key and the phone lock as always. The prover takes that response as input, and only the proof leaves the phone.

| Part | State on 8 October 2026 |
|---|---|
| Verifier (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | live |
| Accepted circuit in the signed trust list | live |
| Prover package, TypeScript core and desktop prover | done |
| Android native library (arm64-v8a, armeabi-v7a, x86_64) | built |
| iOS library | pending; it needs macOS to build |
| Device testing and on-device measurements | with the app-store release |

Until the iOS library exists, an iOS app with the package builds normally and reports that no prover is available, and the wallet presents the classic way. Tamga Wallet, one of the wallets on the network, has the prover wired in; proving stays switched off until the phone libraries and circuit files are in place.

For a sense of scale, the first trial on a desktop machine measured 518 ms to produce a proof and 211 ms to verify it natively, with a proof of about 343 KB. Phone figures will be published after the device tests.

## What can it not do yet?

- **Only equality.** The first and only predicate today is `age_over_18 = true`. Next in line are `age_over_21`, nationality, and enrolment or graduation in education credentials, all equality checks. Ranges ("born before") are not in Longfellow yet.
- **The institution stays visible.** The verifier still learns which institution issued the credential. Proving "some accredited institution" without naming it is out of scope for now.
- **No revocation check**, as explained above; short-lived copies of at most 24 hours are decided but not implemented yet, and a private revocation proof waits for the EU.
- **Size.** About 350 KB per proof rules out QR codes.
- **iOS** is not ready yet.

## Frequently asked questions

### Does the institution have to change anything for zero-knowledge proofs?

No. The institution keeps signing its mdoc credentials with ES256 as before. Zero-knowledge lives only in the wallet and the verifier (rule ZK1).

### What does the verifier learn from an over-18 proof?

That the identity credential of a registered institution says `age_over_18 = true`, and that the proof was made for this session. Nothing else: no date of birth, no other field, no signature value, no device key.

### Can two sites tell that the same person proved their age to both?

Not from the proof. Each proof is new and contains no fixed value that repeats between presentations.

### Is the zero-knowledge check live?

The verifier side is live on Tamga Verify with the policy `age-over-18-zk`. Wallets need the prover: the Android library is ready, iOS is pending.

### What happens if my wallet cannot make a proof?

If the site allows it, it asks again with the classic check. Your wallet then discloses only the `age_over_18` field from one of your copies.

## Sources

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [Anonymous credentials from ECDSA (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Open-sourcing the zero-knowledge proof libraries for age assurance (announcement)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [EU technical specification TS13: zero-knowledge proofs based on arithmetic circuits (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [EU age verification blueprint](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: zero-knowledge proofs](https://docs.tamga.network/adr/0032-zk-mdoc-presentation) · [Verify on your server: zero-knowledge age check](https://docs.tamga.network/guides/verify-on-server) · [Verification API](https://docs.tamga.network/specifications/verification-api)
- [Tamga ARF: architecture (§2.6, §2.8)](https://arf.tamga.network/architecture) · [Zero-knowledge proofs](/learn/zero-knowledge-proofs) · [Unlinkability](/learn/unlinkability)

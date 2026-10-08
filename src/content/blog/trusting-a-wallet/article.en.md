---
title: "How do you trust a wallet? Attestations and hardware keys"
slug: trusting-a-wallet
description: How an institution on Tamga Network decides a wallet is safe to issue to: wallet attestations, key attestations, hardware evidence and the trust list.
date: 2026-10-08
lang: en
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Sources: ADR-0025 1.0.0 (EU TS3 model; K1 unit registration, unit key never shown to institutions, unit record without personal data; K2 WIA Annex E, TS3 §2.3.1 fields, lifetime < 24 h (23 h), client_status ≥ 31 days (60), new PoP key and new status entry per transaction, no per-institution reuse; K3 KA Annex D, attested_keys, key_storage / user_authentication ISO 18045, certification, key_storage_status one shared entry per storage type (TS3 Option 1), in the jwt proof header, used once; K4 two status lists signed with a key registered in the trust list, WIA list ≥ 10,000 entries, "revoke this wallet", lost device needs an account later; K5 issuer checks at PAR/token and credential endpoint, KA level vs institution minimum, transition without KA until the pilot; implementation notes: keys bound to phone lock, Play Integrity not mandatory, making it mandatory needs a separate ADR; WIA1–WIA4; change note ADR-0042). ADR-0034 (WIA sub shared by all instances, HAIP §4.4.1; x509_hash). ADR-0042 (K1–K6, NW1–NW4; implementation note: TAMGA-WP-1 same entry in production and sandbox, RESERVED until certificate; registration by hand with approval; self-registration separate decision). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers (ACTIVE only; RESERVED not used). guides/build-a-wallet §4 (Android key attestation checks; App Attest checks; until verified the unit counts as software; Play Integrity added at the store release). ARF architecture §3 roles, §7.1, §2.8 (hardware keys and device attestation implemented, device testing with the store release). Live 2026-10-08: production lotl wallet_providers one entry RESERVED with no signing keys; sandbox lotl adds the network's own test provider (ACTIVE). External: EU TS3, OpenID4VCI 1.0 Annexes D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

An institution trusts a wallet through a chain of signed evidence, not through the wallet's own word. The wallet's provider must be listed in Tamga Network's signed trust list. For each credential request the provider hands the wallet two short-lived, signed statements: a wallet instance attestation (WIA) saying "this is a genuine, unrevoked installation of our wallet", and a key attestation (KA) saying where the credential keys live. The provider may only claim hardware storage it has verified from the phone platform's own evidence, Android key attestation or Apple App Attest. The institution checks all of this against the trust list before it issues anything. The network itself runs no wallet; it lists wallet providers.

## Why does an institution care which wallet it issues to?

A Tamga credential is bound to a key on the person's device. Whoever holds that key can present the credential. If the key sat in ordinary app storage, it could be copied together with the credential to another phone, and the credential would no longer prove much. If the app were a modified copy, it could skip the consent screen or keep presentations it should not keep.

So before signing a diploma or an identity credential, the institution wants answers to three questions. Is this a wallet that follows the network's rules? Is this particular installation still in good standing? Are the keys it wants me to bind to really in secure hardware? The EU framework asks the same questions and answers them with the same two attestations, described in the Commission's technical specification [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md). Tamga follows that model ([ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)).

## Who vouches for what?

Each link vouches only for what it can actually see:

![The chain of evidence from the phone platform to the issued credential](/blog/trusting-a-wallet/en/fig-zincir.png)

1. **The phone platform** (Google's hardware attestation root, Apple's App Attest root) vouches that a key was generated in the device's secure hardware and that the request comes from a known app.
2. **The wallet provider** verifies that evidence once, when the installation registers, and from then on signs attestations for that installation.
3. **The trust list** names the wallet provider and its signing certificate. Without an active entry, the provider's attestations count for nothing.
4. **The institution's issuer** checks the attestations, binds the credential to the attested keys and signs it.

The network sits in the third link only. It writes the rules every provider must follow and publishes the list; it does not register phones, sign attestations or hold any device data.

## What is in a wallet instance attestation?

A WIA is a signed JWT in the format of [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) Annex E. The fields come from TS3:

> **Note:** Simplified example. Values are shortened or made up. The real rules are in [ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) and the [wallet guide](https://docs.tamga.network/guides/build-a-wallet).

```json title="Simplified example: the payload of a wallet instance attestation"
{
  "iss": "https://provider.wallet.example",
  "sub": "example-wallet",
  "wallet_name": "example-wallet",
  "wallet_version": "1.0.0",
  "wallet_link": "https://wallet.example/",
  "client_status": {
    "status": { "status_list": { "idx": 7341, "uri": "https://provider.wallet.example/status/wia" } },
    "exp": 1797000000
  },
  "cnf": { "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" } },
  "iat": 1791800000,
  "exp": 1791882800
}
```

Three details carry most of the privacy:

- **`sub` is the same on every phone.** It names the wallet solution, not the installation. The [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profile requires this, and Tamga adopted it ([ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)).
- **It lives less than 24 hours** (23 hours in Tamga).
- **Every credential request gets a fresh one**, with a new proof-of-possession key in `cnf` and a new, unlinkable position in the provider's status list. A WIA is never reused for a second institution. Two institutions comparing notes cannot tell that the same phone talked to both, and the provider does not learn how many institutions a wallet deals with.

The installation's own long-term key, the unit key, is used only between the wallet and its provider. It is never shown to an institution.

## What does a key attestation add?

The WIA says the installation is genuine. The key attestation, a separate JWT in the format of OpenID4VCI Annex D, says something about the keys a credential will be bound to:

- `attested_keys`: every key in a batch, since every credential is issued as 10 copies and each copy has its own key;
- `key_storage` and `user_authentication`: the storage and user-verification levels, in the ISO 18045 terms TS3 uses;
- `key_storage_status`: a status list entry the provider can revoke.

The status entry is deliberately coarse. There is one shared entry per storage type (software store, Secure Enclave, StrongBox), the first option TS3 allows. If one type of storage turned out to be broken, the provider could withdraw it for everyone at once, and the key attestation reveals nothing that identifies the installation. Each key appears in exactly one key attestation, each key attestation is used once, and the attestation travels in the header of the wallet's proof to the institution.

The rule that keeps this honest is WIA3: the storage level in a key attestation states the truth, and an unverified claim is never written into one.

## How does the provider know a key is in hardware?

From the platform's signed evidence, never from what the app says about itself ([wallet guide §4](https://docs.tamga.network/guides/build-a-wallet)):

![What the wallet provider checks in the platform's evidence](/blog/trusting-a-wallet/en/fig-kanit.png)

| Platform | Evidence | What is checked |
|---|---|---|
| Android | [key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) chain | leads to Google's hardware root; one-time challenge; security level (TEE or StrongBox); verified boot; app package name |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | leads to Apple's root; app identity (Team ID and Bundle ID); client data carries the unit key's fingerprint |

Until the evidence is verified, the installation counts as software level. The network's wallet rules then decide what that means. Wallets are graded W1 (software keys), W2 (the device's secure area: Secure Enclave or StrongBox) and W3 (a certified secure element, for the state phase). W2 is the minimum. A software-key wallet is not supported; the only exception is the network's own test key in the sandbox list, used for its demonstration scenes (rule WL3).

Hardware keys are also tied to the phone lock. A credential key can be used only while the phone is unlocked, and each presentation is approved with the device's biometrics or passcode (rule WL11).

On Android, a provider may additionally send a [Play Integrity](https://developer.android.com/google/play/integrity) verdict, which shows that the app came from the store. Today it is optional: it never lowers the level taken from the key attestation and its absence does not block registration. Making it mandatory would change the decision and needs a separate decision record.

## What does the institution check before it issues?

![What the issuer checks, in order](/blog/trusting-a-wallet/en/fig-denetim.png)

At the authorisation and token endpoints the issuer verifies the WIA: its signature, that the signing key belongs to a wallet provider whose entry in the trust list is `ACTIVE`, its validity period, the proof of possession of the `cnf` key, and that `client_status` is not revoked.

At the credential endpoint it verifies the key attestation: its signature and provider key, that the wallet's proof was signed with the first attested key over the issuer's fresh nonce, that `key_storage_status` is not revoked, and that the storage level meets the institution's own minimum. Only then does it sign, binding each copy to one of the attested keys. An issuer never issues against a revoked WIA or key attestation (rule WIA4). The protocol view of these steps is in the [OpenID4VCI deep dive](/blog/openid4vci-deep-dive).

One transition is written down openly: until the pilot, an issuer also accepts a wallet proof without a key attestation. That path is removed at the pilot.

## How is a wallet, or a whole wallet product, withdrawn?

There are three levels, from narrow to wide:

| What is withdrawn | Who does it | Effect |
|---|---|---|
| One installation | the wallet provider, at the person's request ("revoke this wallet", for example before handing over a phone) | all WIA entries issued to that installation are revoked |
| One type of key storage | the wallet provider | every key attestation for that storage type fails its status check |
| A whole wallet provider | the registrar, through the trust list | the provider's entry becomes `SUSPENDED` or `REVOKED`; its attestations stop counting |

Credentials already on a phone are separate from this: they are withdrawn by the institutions that issued them, through their own [status lists](/blog/status-list-privacy). Revoking an installation stops it from obtaining new credentials.

Withdrawing a lost or stolen phone remotely needs some way for the person to prove who they are without that phone. The decision leaves this to a later step.

## Why doesn't Tamga Network run wallets?

Because a network that ran a wallet would be judging its own product. In the EU model each wallet is operated by the organisation that offers it, and the trust framework only lists wallet providers. Tamga Network follows the same split ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- the network operates no wallet app, wallet provider or wallet website, and no wallet service runs under the network's domain names;
- it recognises a wallet only by its entry in the trust list, which any provider can obtain by following the published rules;
- its interfaces and packages do not hard-code any wallet's name;
- there is one sandbox, and it belongs to the network: a wallet developer runs their own provider and registers it in the sandbox list.

Tamga Wallet is one of the wallets on the network. It is a separate product and enters the list the same way as any other. On 8 October 2026 its provider (`TAMGA-WP-1`) has one entry in the production list and the same entry in the sandbox list, both `RESERVED`: the place is held, but the entry carries no signing key until the wallet's operator supplies its own certificate, so no attestation can pass against it yet. The sandbox list also contains the network's own test provider for its scenes. Registration is done by hand today, with project management approval; self-registration of wallet providers needs a separate decision.

## What are the honest limits today?

- **Device testing is still ahead.** Hardware keys and device attestation are implemented; testing on real devices comes with the app-store release ([ARF §2.8](https://arf.tamga.network/architecture)).
- **No active wallet provider in the production list yet.** The only entry is reserved, as described above.
- **Play Integrity is optional**, and the transition that accepts proofs without a key attestation lasts until the pilot.
- **Remote withdrawal of a lost phone** waits for a later step.
- **No certified secure element yet.** W3 belongs to the state phase.
- **Attestations prove the software and the keys, not the person.** Who the person is, is a separate question answered by identity verification at the institution.

## Frequently asked questions

### Can any wallet join Tamga Network?

Any wallet whose provider follows the published rules and passes the conformance tests can be listed. The network recognises wallets by their trust list entry, not by name.

### Does the wallet provider learn which institutions I use?

No. Each credential request uses a fresh attestation with a new key and a new status position, so the provider does not see how many institutions a wallet talks to, and institutions cannot link the same phone across each other.

### What happens if my phone has no secure hardware?

The installation stays at software level, and the network's rules do not support software-key wallets for real credentials. The wallet should tell the person clearly instead of continuing silently.

### Can a wallet product be removed from the network?

Yes. The registrar can suspend or revoke the provider's entry in the trust list, and from that moment its attestations no longer pass at any issuer.

## Sources

- [EU technical specification TS3: wallet unit attestation (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [OpenID for Verifiable Credential Issuance 1.0 (Annex D key attestation, Annex E wallet attestation)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android key attestation](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: wallet and key attestations](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 conformance](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: the network operates no wallet](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Build a Tamga-compatible wallet](https://docs.tamga.network/guides/build-a-wallet) · [Wallet specification](https://docs.tamga.network/specifications/wallet)
- [Building a wallet](/learn/build-a-wallet) · [The first wallet](/learn/first-wallet) · [Digital wallets](/learn/digital-wallets)

---
title: "HAIP and Token Status List: high assurance without tracking"
slug: haip-and-token-status-list
description: What HAIP 1.0 fixes and how Tamga applies it, and how Token Status List revokes credentials without telling the issuer where they are used.
date: 2026-10-08
lang: en
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Sources: HAIP 1.0 Final (24 Dec 2025) §3–8 (flows, FAPI2/PKCE/PAR, DPoP + DPoP-Nonce, scope, signed metadata, wallet attestation shared sub, key attestations, x509_hash, DCQL, ECDH-ES P-256, A128GCM+A256GCM, ephemeral keys, aki, JAR request_uri, direct_post.jwt, same-device rules, dc_api.jwt, mso_mdoc / dc+sd-jwt, x5c without trust anchor, status_list, unique unpredictable index, KB-JWT always, ES256 / -7 -9, SHA-256). ADR-0034 (K1–K5, CI1–CI6, renewal order). draft-ietf-oauth-status-list-21 (21 Jun 2026; RFC Editor queue per datatracker 2026-10-08; title "Token Status List (TSL)"): §4 bit packing LSB-first, DEFLATE/ZLIB, bits 1/2/4/8, JWT claims sub/iat/exp/ttl/status_list, aggregation_uri, §7 status types (0x03 application specific), §12 herd privacy. SPEC-CRED-0003 v1.0.0 (cites draft-20): bits=2, 100,000 min, 80% fill, 1% noise, random idx, opaque URI, split by type only, 1 h fixed cadence, no emergency publish, exp = iat + 50 h, ttl 3600, prefetch, aggregation recommended, separate status key, Ş1–Ş10, S1–S14, anchors.jsonl today. SPEC-API-0001 D1–D6, INDETERMINATE reasons, ZK NOT_APPLICABLE. Compression figures computed for this post with zlib level 9 (same call as @tamga-network/sd-jwt). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0 takes the many options in OpenID4VCI, OpenID4VP, SD-JWT VC and ISO mdoc and fixes one set for high-assurance use: which formats, algorithms, client identifiers, encryption and attestations every party must support. **Token Status List** is the revocation mechanism that set relies on: each credential points to a position in a large, signed, compressed bit list that verifiers download in advance, so checking a credential never tells the issuer where or when it was shown.

HAIP 1.0 became Final on 24 December 2025. The Token Status List draft is at version 21 (21 June 2026), now titled "Token Status List (TSL)", and sits in the RFC Editor queue.

## What does HAIP fix that the base specifications leave open?

Two products can each follow OpenID4VP to the letter and still fail to talk to each other: one signs requests with `x509_san_dns`, the other only accepts DIDs; one encrypts responses, the other doesn't. HAIP closes those gaps for three flows (issuance, presentation with redirects, presentation over the browser's Digital Credentials API) and two formats. The main rules:

| Area | HAIP 1.0 requirement |
|---|---|
| Formats | IETF SD-JWT VC (`dc+sd-jwt`) or ISO mdoc (`mso_mdoc`); ecosystems say which |
| Algorithms | everyone supports ES256 (COSE -7 or -9) and SHA-256 at minimum |
| Issuance | authorization code flow with PKCE (S256) and PAR via FAPI 2.0; DPoP-bound tokens; a `scope` for every credential configuration; `nonce_endpoint` when credentials are key-bound |
| Wallet trust | wallet attestation at PAR and token endpoints, with a `sub` shared by all installations; key attestations |
| Verifier identity | signed requests use the `x509_hash` client identifier |
| Query | DCQL, including `trusted_authorities` of type `aki` |
| Response | encrypted: ECDH-ES on P-256; verifiers list both A128GCM and A256GCM; a fresh key per request |
| Redirect flow | JAR with `request_uri`, `direct_post.jwt`, same-device redirect back to the originating session |
| Browser flow | Digital Credentials API with `dc_api.jwt` |
| Keys in headers | `x5c` for issuer signatures, signed metadata and status list tokens, without the trust anchor, never self-signed |
| SD-JWT VC | KB-JWT always present when the credential is holder-bound; `status` uses `status_list` |
| Status | every credential gets its own unique, unpredictable index |

Tamga's profiles follow all of these, and in a few places go further: ES256 is the only signature algorithm allowed, and every credential is holder-bound, so a KB-JWT is always required. The protocol detail is in the [OpenID4VCI](/blog/openid4vci-deep-dive) and [OpenID4VP and DCQL](/blog/openid4vp-dcql-deep-dive) deep dives.

![HAIP rules and Tamga's choices](/blog/haip-and-token-status-list/en/fig-haip.png)

## Which HAIP rules changed Tamga's design?

When the HAIP requirements were mapped one by one, two touched closed decisions, so they went through [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub), approved by project management on 1 October 2026.

**Verifier identity is `x509_hash`.** HAIP §5: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". Before the ADR, Tamga verifiers used `x509_san_dns:<domain>`, and trust list records were keyed on that string. Now:

- the verifier's `client_id` is computed from its access certificate, never typed into a configuration file;
- the wallet accepts only `x509_hash` and rejects the request if the hash doesn't match the leaf certificate, while still requiring the response address to be on a domain in the certificate's SAN;
- because the hash changes whenever a certificate is renewed, each relying party record carries a permanent `dns_name`, and everything that must survive renewal is bound to it: copy separation, per-site pseudonyms, pass cards and the presentation log.

The operational consequence is an order of operations. On renewal, the new certificate goes into the registry source and the trust list is republished first; only then does the verifier switch. If it switches early, wallets see an unknown `client_id` and refuse.

**The wallet attestation's subject is shared.** HAIP §4.4.1 says the attestation `sub` "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation", and the PAR `client_id` is that value. The provider of Tamga Wallet, one of the wallets on the network, used to put the fingerprint of a per-transaction key there. It now uses the wallet solution's identifier. Instances are still told apart only by a fresh `cnf` key and a fresh, unlinkable status entry for each transaction, so what an institution records identifies the wallet product and says nothing about the phone.

## How does a Token Status List encode status?

A credential carries a pointer, and the list carries the bits:

```json title="In the credential (SD-JWT VC payload, or the MSO for mdoc)"
"status": {
  "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
}
```

```json title="Simplified example: Status List Token (header and payload)"
{ "alg": "ES256", "typ": "statuslist+jwt", "kid": "sl-2026-a", "x5c": ["MIIB…"] }
{
  "iss": "https://issuer.tamga.network/example-university",
  "sub": "https://status.tamga.network/3f9a2c",
  "iat": 1791446400,
  "exp": 1791626400,
  "ttl": 3600,
  "status_list": { "bits": 2, "lst": "eNrt…" }
}
```

`sub` must equal the `uri` in the credential. `lst` is built in three steps defined by the draft: write `bits` bits per credential into a byte array, packing from the **least significant bit** of each byte; compress the array with DEFLATE in ZLIB format; base64url-encode the result.

A tiny worked example with 16 entries and `bits: 2`, where index 1 is revoked, index 2 is suspended and index 6 is revoked:

```text title="Packing 2-bit statuses (computed for this post)"
byte 0 = idx 3..0  → 00 10 01 00 → 0x24
byte 1 = idx 7..4  → 00 01 00 00 → 0x10
byte 2 = idx 11..8 → 0x00
byte 3 = idx 15..12 → 0x00

zlib(level 9), base64url → eNpTEWBgAAAAxAA1
```

To read index `idx` with `bits: 2`: take byte `idx >> 2` and shift right by `(idx & 3) × 2`. For `idx` 48213 that is byte 12053, bits 2 and 3. Size is not a concern: a Tamga list has at least 100,000 entries, 25,000 bytes uncompressed. With zlib at level 9 an all-valid list compresses to 46 bytes, and the same list with 200 scattered revocations to 439 bytes, in our test run for this post.

![Reading a credential's status in four steps](/blog/haip-and-token-status-list/en/fig-bits.png)

## What do the status values mean in Tamga?

| Value | Draft name | In Tamga |
|---|---|---|
| `0x00` | VALID | valid |
| `0x01` | INVALID | revoked, permanently |
| `0x02` | SUSPENDED | suspended, reversible |
| `0x03` | application-specific | not used; treated as revoked |

The draft allows `bits` of 1, 2, 4 or 8. Tamga always uses 2, because suspension needs its own value: an institution investigating a diploma wants to pause it while the investigation runs. With one bit it would have to revoke without cause or do nothing. Four or eight bits would double or quadruple the list for no benefit. A verifier treats anything other than `0x00` as a rejection and shows "suspended" separately from "revoked".

## How does a status list avoid becoming a tracking channel?

The privacy of a status list comes from the herd: a verifier downloading a list could be checking any of its entries. Tamga's rules make the herd real; the same rules seen from the person's side are in [Revocation without tracking](/blog/status-list-privacy).

- **Big lists.** At least 100,000 entries, and a new list once 80% are allocated. When a list is created, 1% of its capacity is marked allocated at random positions with the valid value, so the first credential on a new list is not alone.
- **Random indices.** `idx` is drawn at random within the list's capacity. A sequential index would reveal enrolment order and roughly the date, even if `awarding_date` stays hidden. HAIP also requires every credential to have its own unique, unpredictable index.
- **Opaque URIs.** The list URI is visible in every presentation, so it is a claim. `/sl/2026-engineering` would leak year and faculty; Tamga list identifiers are random strings, and the mapping stays with the issuer.
- **Split by type only.** A new list opens when the previous one is full, never per year or per department.
- **Copies don't share an index.** Each of the ten batch copies has its own random index, so two verifiers can't link presentations through `idx`.

One limit is structural and written down as such: for a small institution the herd is only as large as that institution's own set of credentials, because `iss` names it anyway.

The other half of the privacy story is fetching. If a verifier downloaded the list at every check, the issuer would learn "someone is checking one of my credentials right now", and the source IP would often say who. Tamga verifiers therefore **prefetch** lists on a schedule and verify from the cache; `@tamga-network/verifier` does this by default, and fetching per verification must be switched on explicitly. The draft's optional `aggregation_uri`, which lists all of an issuer's status lists at one address, is recommended in Tamga because it makes prefetching practical.

## How often is a list published, and how long is a copy valid?

| Rule | Tamga value | Why |
|---|---|---|
| Publication interval | fixed, and kept even if nothing changed | publishing only on revocation would leak "a revocation happened just now" |
| Emergency publication | not done | it would break the fixed rhythm; urgent cases use issuer certificate suspension or schema revocation |
| `ttl` | 3600 s | how long a verifier may use its copy before refetching |
| `exp` | `iat` + 50 hours | absolute limit, so a weekend outage doesn't stop verification |
| Cache headers | ignored in favour of `exp` and `ttl` | the token's own claims decide |
| Signing key | separate from the credential key, same X.509 chain | a leaked status key can fake a status, not a diploma |

Each publication is written to the status server first and its hash recorded second. Today that record is the trust list publisher's anchor log; a ledger is a later stage ([why there is no blockchain yet](/blog/why-no-blockchain-yet)). The verifier checks that the token's hash matches the recorded one and that its version hasn't gone backwards, so an issuer can't quietly roll a list back to make a revoked credential look valid.

## What does a verifier conclude when it can't check?

Revocation checks run as steps D1–D6 of Tamga's pipeline: read `status.status_list`, take the token from the prefetch cache, verify its signature against the status key registered for that institution in the trust list, check `sub`, freshness and the recorded hash, then read the bits. When the list can't be fetched, or `exp` has passed, the outcome is **INDETERMINATE**, with a reason such as `STATUS_UNREACHABLE` or `STATUS_STALE`. "This diploma was revoked" and "I can't check right now" lead to different decisions about a person and must be shown differently. Offline, a verifier may continue from its cached token and last known record, show the time of the last synchronisation, and mark the result as verified offline.

Zero-knowledge age proofs are the one case without an index: the proof reveals nothing that could identify a list position, so the status is reported as not applicable and the proof relies on a short-lived credential instead ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

## Frequently asked questions

### Is HAIP a law?

No. It is an OpenID Foundation specification. The European digital identity ecosystem relies on it so that wallets, issuers and verifiers from different makers work together.

### Why not let the verifier ask the issuer "is this credential still valid"?

Because the question itself is the leak: the issuer would learn which credential is being checked, when, and often by whom. With a status list the verifier holds a copy of everyone's status and asks no one.

### Does suspension expire on its own?

No. A suspended credential stays suspended until the issuer sets the bits back to valid or revokes it. The verifier only reads the current value.

### Can a verifier tell that ten copies belong to the same person?

Not through the status list. Each copy has its own random index, and the mapping between copies stays in the issuer's database. On revocation, all ten indices change in the same scheduled publication, along with whatever else changed in that interval.

## Sources

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 December 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, June 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 9 July 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 conformance, Tamga Network docs](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Revocation and status list (SPEC-CRED-0003), Tamga Network docs](https://docs.tamga.network/specifications/status-list)
- [ADR-0008: Status list placement, Tamga Network docs](https://docs.tamga.network/adr/0008-status-list-placement)
- [Revocation and freshness, Tamga Network docs](https://docs.tamga.network/concepts/revocation)
- [Verification pipeline and API (SPEC-API-0001), Tamga Network docs](https://docs.tamga.network/specifications/verification-api)

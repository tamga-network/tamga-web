---
title: "SD-JWT VC deep dive: signing, disclosures, KB-JWT"
slug: sd-jwt-vc-deep-dive
description: How an SD-JWT VC is built and checked byte by byte - salted digests, _sd, cnf, the KB-JWT and sd_hash, vct#integrity and status - with Tamga's profile.
date: 2026-10-08
lang: en
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Sources: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9 (Tamga constraints, disclosure, hash-the-string rule, _sd sorted, decoys forbidden, x5c, typ, cnf, KB-JWT, sd_hash, Ş1–Ş10, C1–C18); SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b issuerId from leaf cert); SPEC-CRED-0003 (status claim); schema-catalog (vct URN, W3C SRI integrity string, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vector v2, fake person data; issuer URL replaced with an example path); live catalogue entry for urn:tamga:edu:DiplomaCredential:1 (content_hash = vector vct#integrity, checked 2026-10-08). RFC 9901 (Nov 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Aug 2026, IESG evaluation; iat may be disclosable, vct#integrity optional, status JWT list). HAIP 1.0 Final §6 (x5c, KB-JWT always with holder binding). -->

An SD-JWT VC is a JWT signed by the issuer that carries salted SHA-256 digests instead of claim values, plus a list of **disclosures** (the salted values themselves) sent next to it, joined with `~`. The holder reveals a claim by sending its disclosure and hides it by leaving the disclosure out, and a **KB-JWT** signed with the holder's device key closes each presentation.

Two standards are involved. **SD-JWT** is the mechanism, published by the IETF as RFC 9901 in November 2025. **SD-JWT VC** is the credential profile on top of it, `draft-ietf-oauth-sd-jwt-vc`; version 19 (31 August 2026) is in IESG evaluation. Tamga's byte-level profile is [SPEC-CRED-0002](https://docs.tamga.network/specifications/sd-jwt-vc).

> **Note:** Every example below comes from Tamga's public conformance vector `sd-jwt/diploma-basic` (fake person data, no private keys). We replaced the issuer URL with an example path and shortened certificates. Signatures are left out, so treat the examples as simplified.

## What does the issuer actually sign?

The issuer-signed JWT has an ordinary JOSE header and a payload in which hideable claims are replaced by digests:

```json title="Simplified example: header and payload of the issuer-signed JWT"
{
  "alg": "ES256",
  "typ": "dc+sd-jwt",
  "x5c": ["MIICCzCCAbCgAwIBAgIC…"]
}
{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=",
  "iat": 1790619528,
  "cnf": {
    "jwk": {
      "kty": "EC", "crv": "P-256",
      "x": "hFEM1avAMSadeciYwVO0nJ6aMEM8YDCTigu_GO4tqgM",
      "y": "R-5AIVbUthAPOiJm4-2U8aB1Oppfyjl84HhDZrLqdfU"
    }
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  },
  "_sd_alg": "sha-256",
  "_sd": [
    "5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo",
    "9xI8VcNCjl8OcW6W0n30e_LGJ4lm3ah3SAEVEI4pM38",
    "FJqsIjUpFitVLNSAhwL-3LcB-_4YoIupLGFhC5WhdMs",
    "IpStBdfeq4pqVfpP9xFH2ZM46lojLf7cqcEpDBk9OV4",
    "JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4",
    "kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI",
    "…6 more, sorted"
  ]
}
```

The claims in the clear are the ones a verifier needs before it can read anything else. In Tamga they are marked `sd: "never"` in the type metadata and can never be hidden:

| Claim | Why it stays visible |
|---|---|
| `iss` | consistency check against the registered issuer |
| `vct`, `vct#integrity` | type resolution and pinning |
| `iat` | the trust checks are time-bound to it |
| `cnf` | needed to verify the KB-JWT |
| `status` | revocation lookup |
| `_sd_alg`, `_sd` | the mechanism itself |
| `exp` | when the type has one |

Draft 19 lets an issuer make `iat` selectively disclosable. Tamga keeps it visible because the verifier asks the trust layer "was this issuer allowed to issue this type **at** `iat`?", not "is it allowed today".

The header carries the issuer's certificate chain in `x5c`, leaf first, without the root. HAIP 1.0 requires `x5c`-based key resolution, and Tamga makes `x5c` mandatory. The verifier derives the issuer's identity from the **leaf certificate fingerprint**, never from `iss`. If it trusted `iss`, any institution with a valid certificate under the same root could write another university's URL into `iss` and sign with its own key.

`typ` is `dc+sd-jwt`. The draft used `vc+sd-jwt` until November 2024 and changed it to avoid a clash with a W3C media type. Tamga issuers produce only `dc+sd-jwt`, and the verifier rejects `vc+sd-jwt` unless a compatibility flag for external credentials is switched on (it is off by default).

## How is a disclosure built, and why hash the string?

A disclosure is a three-element JSON array `[salt, name, value]`, UTF-8 encoded and then base64url-encoded without padding. The salt is 16 random bytes (128 bits), new for every disclosure. Here are the four disclosures from the vector's presentation:

```text title="Disclosures from the conformance vector, decoded, with their digests"
WyJJY3NEZDFmdmh6bS1mcVpTNDJLb1p3IiwiZXFmX2xldmVsIiw2XQ
  → ["IcsDd1fvhzm-fqZS42KoZw","eqf_level",6]
  → 5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo

WyJoY0FvdmV4bmpkTFd3aF9sN1hkM1ZBIiwiaXNfZ3JhZHVhdGUiLHRydWVd
  → ["hcAovexnjdLWwh_l7Xd3VA","is_graduate",true]
  → kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI

WyJSc3ZSUXY2cDhGM3NfRXRBSXFQTnpnIiwiZmFtaWx5X25hbWUiLCLDlnJuZWsiXQ
  → ["RsvRQv6p8F3s_EtAIqPNzg","family_name","Örnek"]
  → JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4

WyJjazFtMktWejdVWEg2cTlMNEJad1BRIiwiZ2l2ZW5fbmFtZSIsIlZla3TDtnIiXQ
  → ["ck1m2KVz7UXH6q9L4BZwPQ","given_name","Vektör"]
  → sHl3d9xOXRVt7kU78VQvmAjq4kZzrWjyyJV1sBfRA1M
```

The digest is `base64url(SHA-256(ASCII bytes of the disclosure string))`. Every one of the four digests above appears in the payload's `_sd` array.

The single most common bug in SD-JWT code is to decode the disclosure, re-serialise the array and hash the result. JSON serialisation is not deterministic: a space after a comma, or `ö` written as `ö`, gives different bytes and a different digest. Tamga's spec shows this with a disclosure for `given_name: "Ayşe"`, where re-serialising without spaces or escapes turns `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` into `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU`. The rule for verifiers is simple: **hash the string as received, then decode it.** Never the other way round.

![Four steps from a claim to a digest in the signed payload](/blog/sd-jwt-vc-deep-dive/en/fig-disclosure.png)

## Why is the `_sd` array sorted, and why no decoys?

Tamga sorts `_sd` in ascending byte order. Unsorted, the digests would sit in the order the issuer processed the claims, which usually follows the schema. A verifier could then line up the hidden digests with the schema's field list and tell which fields were withheld.

RFC 9901 also allows **decoy digests**, fake entries that match no disclosure, to blur how many claims are hidden. Tamga forbids them. The `vct` is in the clear and the type metadata lists every field, so the count is public anyway. Different decoy counts across issuers would themselves become a fingerprint, and each decoy adds 43 characters to a QR code. The real side channel is a changing disclosure set, so Tamga's wallet rules require wallets on the network to keep the set consistent per verifier and type instead.

Two further profile limits: nested selective disclosure is capped at two levels, and hiding individual array elements is not used yet.

## How does holder binding work, and what does the KB-JWT sign?

`cnf.jwk` is the public half of a P-256 key created in the phone's secure hardware during issuance (the issuer copies it from the wallet's key proof; see the [OpenID4VCI deep dive](/blog/openid4vci-deep-dive)). The private half never leaves the device. In Tamga a credential without `cnf` is invalid, and so is a presentation without a KB-JWT. The standard leaves key binding optional; HAIP requires a KB-JWT whenever the credential has holder binding, and Tamga binds every credential.

At presentation time the wallet keeps only the disclosures the verifier asked for and the person approved, then appends a KB-JWT:

![What is stored in the wallet and what is sent to a verifier](/blog/sd-jwt-vc-deep-dive/en/fig-anatomy.png)

```json title="KB-JWT from the conformance vector (header and payload)"
{ "alg": "ES256", "typ": "kb+jwt" }
{
  "nonce": "conf-nonce-0001",
  "aud": "x509_hash:9OGMDF0OXzjg3FX8kOjh9tUnI7A5VhSc1mweK1ElZ_Q",
  "iat": 1790705928,
  "sd_hash": "-SOR78_i6a2u-_oX-jovk7jVjCrsZYIe35q4lixd8NE"
}
```

`nonce` is the verifier's single-use challenge, so a recorded presentation can't be replayed. `aud` is the verifier's **full** client identifier, prefix included; over OpenID4VP that is `x509_hash:` plus the fingerprint of its access certificate ([OpenID4VP and DCQL deep dive](/blog/openid4vp-dcql-deep-dive)). `iat` must be within 300 seconds of the verifier's clock.

`sd_hash` is what stops a middleman from deleting a disclosure:

```text title="What goes into sd_hash"
sd_hash = base64url( SHA-256( ASCII bytes of
  "<issuer-signed JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Only the presented disclosures are included, and the trailing `~` is part of the input. Without `sd_hash`, someone could drop the `grade` disclosure from a diploma presentation and both signatures would still verify.

A reminder of scope: a valid KB-JWT proves control of the key bound to the credential. It does not prove which human is holding the phone.

## What are `vct` and `vct#integrity` for?

`vct` names the credential type. Tamga uses URNs, `urn:tamga:<domain>:<Type>:<major>`, so the identifier does not change if a domain name does. The type metadata document lives at an HTTPS address that the public catalogue maps from the URN; draft 19 calls this resolution "from a registry" (§5.3.2). For the diploma, `https://schemas.tamga.network/v1/catalogue.json` maps `urn:tamga:edu:DiplomaCredential:1` to its metadata file and to the content hash `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=`, the same string as `vct#integrity` in the vector.

The integrity value uses the W3C Subresource Integrity format: `sha256-` followed by the base64 SHA-256 of the document's raw bytes. The published file must stay byte-for-byte identical; no proxy may reformat it. The standard makes `vct#integrity` optional. Tamga makes it mandatory, so a verifier can never be handed a different definition of a type than the one the issuer signed against. The type metadata is also where each claim's `sd` policy (`always`, `allowed`, `never`) is written, and Tamga issuers hide every claim that is allowed to be hidden.

## What does the `status` claim point to?

`status.status_list` holds an index (`idx`) and the URI of a Token Status List. The verifier reads two bits at that index from a signed, compressed list it fetched earlier: `0` valid, `1` revoked, `2` suspended; `3` is unused and treated as revoked. Tamga allocates indices at random, keeps list URIs opaque, and expects verifiers to prefetch lists on a schedule so that the issuer never learns when a credential is checked. Draft 19 requires the referenced status list to be in JWT form. The mechanics and the privacy rules are in [HAIP and Token Status List](/blog/haip-and-token-status-list).

## In what order should a verifier check an SD-JWT VC?

Tamga gives every verification step a permanent code, and its verifier returns the first failing code as `failed_step`. The format layer runs first:

| Code | Check |
|---|---|
| A1 | split on `~`; the last part must be a KB-JWT, not empty |
| A2 | header: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` present |
| A3 | chain to a listed root, intermediates are CAs, JWT signature valid |
| A3b | issuer identity from the leaf certificate fingerprint, not from `iss` |
| A3c | leaf certificate not revoked |
| A3d | `cnf` present |
| A4 | `_sd_alg` = `sha-256` |
| A5 | each disclosure: hash the string, find it in `_sd`, then decode |
| A6 | KB-JWT: signature with `cnf`, `aud`, `nonce`, `iat` within ±300 s, `sd_hash` |
| A7 | `exp` not passed, `nbf` reached |
| A8 | no digest claimed twice, no disclosure overwriting a visible claim |

Two of these deserve a second look. A5 rejects any disclosure whose digest is not in `_sd`, because accepting it would let anyone add claims the issuer never signed. A8 rejects a disclosure named, say, `iss` or `vct`, because it would overwrite a visible claim.

After the format layer come schema checks (B1–B6: resolve `vct`, compare the integrity hash with the catalogue, follow `extends`), trust checks against the signed trust list (C1–C4: was the issuer listed and authorised for this type at `iat`), revocation (D1–D6) and the verifier's own policy (E1–E4). The result has three values: accepted, rejected, or indeterminate when infrastructure such as a status list can't be reached. "I can't check right now" is never reported as "invalid". The full registry is in [the verification pipeline](https://docs.tamga.network/specifications/verification-api).

You can run all of this against the same bytes we use: the vector, its five negative cases (no KB-JWT, wrong nonce, `iat` 301 seconds off, an unmatched disclosure, an expired credential) and the runner are in the [conformance folder](https://github.com/tamga-network/tamga-network/tree/main/conformance) of the open repository.

## What does the Tamga profile change compared with the standard?

| Topic | Standard | Tamga |
|---|---|---|
| Signature | several algorithms | ES256 only |
| `_sd_alg` | several | `sha-256`, written explicitly |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` rejected by default |
| Issuer key | `iss` metadata, `x5c` or other | `x5c` mandatory, root not included |
| Key binding | optional | mandatory for every credential |
| Decoy digests | allowed | forbidden |
| `_sd` order | not specified | sorted |
| `vct#integrity` | optional | mandatory |
| Nested disclosure | allowed | at most two levels |

Everything else follows RFC 9901 and draft 19, and a Tamga verifier still verifies disclosures serialised differently from Tamga's own issuer, because it hashes strings, not arrays.

## Frequently asked questions

### Can I use a generic SD-JWT library to verify Tamga credentials?

Yes, if it hashes disclosure strings as received and lets you enforce key binding. Add Tamga's profile checks on top: ES256 only, `x5c` chain to a listed root, issuer identity from the leaf certificate, mandatory KB-JWT and `vct#integrity`. The `@tamga-network/sd-jwt` and `@tamga-network/verifier` packages do all of this.

### Why is `aud` the full client identifier and not just a hostname?

Because the client identifier is what the wallet verified. Over OpenID4VP the verifier is identified by `x509_hash:` plus its certificate fingerprint, and binding the KB-JWT to exactly that value means the presentation is useless to anyone else.

### Does hiding a claim change the issuer's signature?

No. Hiding means removing the disclosure from the `~`-joined string. The signed JWT is never re-signed or modified.

### Why 128-bit salts?

A digest of a low-entropy value such as a birth date could otherwise be found by trying every possible date. A fresh 16-byte salt per disclosure makes that infeasible and also stops the same claim from producing the same digest in two credentials.

## Sources

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, November 2025](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, August 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 December 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profile (SPEC-CRED-0002), Tamga Network docs](https://docs.tamga.network/specifications/sd-jwt-vc)
- [Verification pipeline and API (SPEC-API-0001), Tamga Network docs](https://docs.tamga.network/specifications/verification-api)
- [Schema catalogue (Type Metadata, vct#integrity), Tamga Network docs](https://docs.tamga.network/specifications/schema-catalog)
- [Conformance vectors and runner, Tamga Network repository](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network docs](https://docs.tamga.network/packages/sd-jwt)

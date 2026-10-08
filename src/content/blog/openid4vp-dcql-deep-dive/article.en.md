---
title: "OpenID4VP and DCQL deep dive: request to verdict"
slug: openid4vp-dcql-deep-dive
description: "How a verifier requests and checks credentials with OpenID4VP 1.0: x509_hash signed requests, DCQL, encrypted direct_post.jwt, the A–E pipeline."
date: 2026-10-08
lang: en
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Sources: OpenID4VP 1.0 Final (9 Jul 2025): client identifier prefixes §5.9.3 (x509_hash = base64url SHA-256 of leaf DER; origin reserved, wallet MUST NOT accept), DCQL §6 (credentials, claims, values, claim_sets, credential_sets, trusted_authorities), response encryption §8.3 (default enc A128GCM), Annex A (DC API, aud origin:), Annex B.2.6. HAIP 1.0 Final (24 Dec 2025) §5: x509_hash for signed requests, DCQL, ECDH-ES P-256, verifiers list A128GCM + A256GCM, wallets SHOULD use A256GCM, ephemeral keys per request, aki trusted_authorities, JAR with request_uri, direct_post.jwt, same-device redirect rules, DC API dc_api.jwt. SPEC-PROTO-0002 v1.0.0: PV1–PV14, over-asking, credential_sets limits, wallet selection behaviour, error table. SPEC-API-0001: A–E codes, three outcomes, AP3. ADR-0034 (x509_hash, SAN check, dns_name). concepts/presentation (channels: QR/link live, DC API verifier ready / no wallet connection yet). Code: packages/verifier request.ts (request_uri QR, aud self-issued, RESPONSE_ENC both), wallet-core jwe.ts (A256GCM preferred), apps/verify (redirect_uri after response). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0 is how a verifier asks a wallet for credentials and gets back a signed, holder-bound presentation. In Tamga the verifier sends a **signed request object** that identifies it by the hash of its certificate (`x509_hash`), states what it wants with a **DCQL** query, and supplies a one-time encryption key; the wallet answers with an encrypted `vp_token` posted to the verifier (`direct_post.jwt`). The verifier then runs a fixed pipeline of format, schema, trust, revocation and policy checks and reaches one of three outcomes.

OpenID4VP 1.0 became Final on 9 July 2025, HAIP 1.0 on 24 December 2025. Tamga's profile is [SPEC-PROTO-0002](https://docs.tamga.network/specifications/openid4vp). Presentation Exchange (`presentation_definition`) from the earlier drafts is not supported: a request that carries it is rejected.

> **Note:** Simplified examples. Hosts are samples, JWTs are shortened, signatures and keys are left out.

## How does the request reach the wallet?

On a different device the verifier shows a QR code; on the same phone it opens a link. Either way the payload is small, because the request object itself is fetched by reference (JAR with `request_uri`, as HAIP requires):

```text title="What the QR code or link carries"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

The wallet fetches `request_uri` and receives a JWT with `typ: oauth-authz-req+jwt`, `alg: ES256` and the verifier's certificate chain in `x5c`:

```json title="Simplified example: payload of the signed request object"
{
  "aud": "https://self-issued.me/v2",
  "iat": 1791446400,
  "exp": 1791446700,
  "client_id": "x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk",
  "response_type": "vp_token",
  "response_mode": "direct_post.jwt",
  "response_uri": "https://verifier.example.org/vp/response",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "dcql_query": { "credentials": ["… see below …"] },
  "client_metadata": {
    "jwks": { "keys": [{ "kty": "EC", "crv": "P-256", "use": "enc", "alg": "ECDH-ES", "kid": "r1", "x": "…", "y": "…" }] },
    "encrypted_response_enc_values_supported": ["A128GCM", "A256GCM"],
    "vp_formats_supported": {
      "dc+sd-jwt": { "sd-jwt_alg_values": ["ES256"], "kb-jwt_alg_values": ["ES256"] },
      "mso_mdoc": { "issuerauth_alg_values": [-7], "deviceauth_alg_values": [-7] }
    }
  }
}
```

The encryption key in `client_metadata.jwks` is ephemeral, created for this request only, as HAIP requires. `nonce` has at least 128 bits of entropy and is accepted once. HAIP requires verifiers to list both `A128GCM` and `A256GCM`; a wallet that supports both should pick `A256GCM`.

## What is `x509_hash`, and what does the wallet check?

The `x509_hash` client identifier is the base64url SHA-256 of the DER-encoded **leaf** certificate that signed the request (OpenID4VP 1.0 §5.9.3). HAIP makes it the one prefix a verifier must use, and a wallet must accept, for signed requests; why Tamga changed its design for it is in [HAIP and Token Status List](/blog/haip-and-token-status-list). You can compute it yourself:

```bash title="Computing an x509_hash client identifier"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Before it shows anything to the person, a wallet following Tamga's rules (the reference library is `@tamga-network/wallet-core`):

1. verifies the request signature and the `x5c` chain, and checks that the hash in `client_id` matches the leaf certificate;
2. checks that the domain of `response_uri` is one of the certificate's SAN names, which keeps the security property of the older `x509_san_dns` prefix;
3. checks `exp` (required, not passed), `iat` (not more than 60 seconds in the future) and `aud`;
4. looks the fingerprint up in the signed trust list. Tamga's relying party records carry the same value as `client_id`, plus a permanent `dns_name` because the hash changes whenever the certificate is renewed;
5. compares every requested claim with the verifier's registered scope.

An unlisted verifier gets a warning screen that interrupts the flow. A listed verifier asking for a claim outside its scope gets an over-asking warning, with the out-of-scope fields marked and the share button delayed by three seconds. Neither case is blocked outright: the wallet is the person's agent, not their gatekeeper. Requests with the `redirect_uri` prefix (unsigned) are rejected, and so are `x509_san_dns` requests, following [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub).

![From signed request to encrypted response](/blog/openid4vp-dcql-deep-dive/en/fig-request.png)

## How do you write a DCQL query?

DCQL (Digital Credentials Query Language) lists the credentials a verifier wants and, for each, the claims. A student discount needs one claim:

```json title="DCQL: student discount"
{
  "credentials": [{
    "id": "student",
    "format": "dc+sd-jwt",
    "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
    "claims": [{ "path": ["is_enrolled"], "values": [true] }]
  }]
}
```

`meta.vct_values` names the type; Tamga refuses a `dc+sd-jwt` query without it. `values` turns a claim into a condition: the credential matches only if `is_enrolled` is `true`. The wallet discloses `is_enrolled` and nothing else.

A job application can accept a diploma **or** a current student certificate, and can ask for an optional claim:

```json title="DCQL: alternatives with credential_sets and an optional claim with claim_sets"
{
  "credentials": [
    {
      "id": "diploma",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:DiplomaCredential:1"] },
      "claims": [
        { "id": "g", "path": ["is_graduate"], "values": [true] },
        { "id": "q", "path": ["qualification_title"] },
        { "id": "t", "path": ["thesis_title"] }
      ],
      "claim_sets": [["g", "q", "t"], ["g", "q"]]
    },
    {
      "id": "student",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
      "claims": [{ "path": ["is_enrolled"], "values": [true] }]
    }
  ],
  "credential_sets": [
    { "options": [["diploma"], ["student"]], "required": true }
  ]
}
```

How `@tamga-network/wallet-core` reads this, following OpenID4VP §6.4:

- In a required set it proposes the **first** option it can satisfy, in the verifier's order; the person may choose another satisfiable option. Only the chosen option is sent.
- An optional set (`required: false`) is off by default and shared only if the person turns it on.
- With `claim_sets`, only the first combination the credential can satisfy is disclosed. Here a diploma with a thesis title sends three claims and one without sends two.
- A credential is **never** sent with a requested claim missing. If `thesis_title` were in a plain `claims` list, a diploma without a thesis would not match at all; that is what `claim_sets` is for.
- A request may contain at most three credentials and two `credential_sets` entries, so the consent screen stays understandable.

For mdoc the path is `[namespace, element]` and the type goes in `meta.doctype_value` ([ISO mdoc deep dive](/blog/iso-mdoc-deep-dive)). HAIP also requires support for `trusted_authorities` with type `aki`, which restricts a credential query to issuers whose chain contains a given Authority Key Identifier. Tamga's verifier and wallet both implement it.

## What does the wallet send back?

The `vp_token` is a map from each DCQL `id` to an array of presentations:

```json title="Simplified example: vp_token before encryption"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Each SD-JWT VC presentation ends with a KB-JWT whose `aud` is the **full** client identifier (`x509_hash:Uvo3…`), whose `nonce` is the request's nonce, and whose `sd_hash` covers exactly the presented disclosures ([SD-JWT VC deep dive](/blog/sd-jwt-vc-deep-dive)). For mdoc the value is a base64url `DeviceResponse` whose device signature covers the OpenID4VP handover.

With `direct_post.jwt` the whole object is encrypted as a JWE to the verifier's ephemeral key (`alg: ECDH-ES` on P-256, `enc: A256GCM` or `A128GCM`) and posted as a form field:

```http title="Simplified example: the encrypted response"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

Why encrypt when TLS is already there? A presentation carries personal data, and between the TLS endpoint and the application sit reverse proxies, firewalls and logs that can see request bodies. With JWE only the holder of the ephemeral key can read it. Tamga uses no unencrypted response mode.

If the person declines, the wallet returns `access_denied` with no reason. "I don't have this credential" and "I chose not to share it" must look the same, or a verifier could map what a person holds by sending different queries.

## How does the verifier reach a verdict?

Tamga's verifier runs the steps in a fixed order and stops at the first failure, returning its permanent code as `failed_step`:

| Layer | Codes | What is checked |
|---|---|---|
| A, format | A1–A8 | issuer signature and chain, issuer identity from the leaf certificate, disclosure digests, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), expiry |
| B, schema | B1–B6 | `vct` resolved, `vct#integrity` matches the catalogue, `extends` chain |
| C, trust | C1–C4 | issuer listed and authorised for this type at the credential's `iat` |
| D, revocation | D1–D6 | status list from the prefetch cache, signature, freshness, anchor, the bits at `idx` |
| E, policy | E1–E4 | assurance threshold, every requested claim disclosed, no scope overrun, audit record |

The outcome is `ACCEPTED`, `REJECTED` or `INDETERMINATE`. The third means infrastructure could not be reached (for example a stale status list) and says nothing against the credential; it must be shown differently from a rejection. The result object lists disclosed claim **names** only, never values, because it goes into the audit log. The full registry is in [the verification pipeline](https://docs.tamga.network/specifications/verification-api).

![The five verification layers](/blog/openid4vp-dcql-deep-dive/en/fig-pipeline.png)

## Same-device or cross-device?

| | Same device | Cross device |
|---|---|---|
| How it starts | link or button on the phone's own browser | QR code on another screen |
| After the response | verifier returns `redirect_uri`, the wallet follows it | the page on the other screen gets the result from its own back end |
| Phishing resistance | the redirect returns to the session that started the request | weaker: a QR code can be relayed to someone else |

HAIP requires both sides to support the same-device flow and recommends it unless the verifier doesn't rely on session binding. In that flow the verifier must reject a presentation if the redirect never comes back or arrives in a different session. Tamga's hosted verifier returns a `redirect_uri` after every response, and wallets on the network follow it. How a site wires this up without writing the protocol itself is in [Add "verify with Tamga" to your website or app](/blog/add-verification-to-your-site).

## What about the browser's Digital Credentials API?

With the W3C Digital Credentials API the browser itself carries the request to the wallet and the response back, using `response_mode: dc_api.jwt`. The audience of the presentation is then the page's origin, written as `origin:https://verifier.example.org`, and the browser itself supplies it: a phishing site can't claim another site's origin. A wallet must never accept `origin:` as a client identifier inside a request. Tamga still recommends a signed request with `x509_hash` in this flow too, because origin binding solves phishing while `x509_hash` is what makes the registry lookup and over-asking check possible.

Status today: QR and link presentation are live. The Tamga verifier is ready for the Digital Credentials API, and the wallet connection to it is not there yet.

## Frequently asked questions

### Why not use `x509_san_dns` like many earlier deployments?

HAIP 1.0 requires `x509_hash` for signed requests, and a wallet following HAIP must accept it. Tamga keeps the useful part of `x509_san_dns`: the response address must be on a domain listed in the signing certificate.

### Does the verifier learn which claims I refused?

It learns which claims arrived. If a required set can't be satisfied or the person declines, the wallet returns `access_denied` without saying why.

### Can I still ask for several schema versions?

Yes. Put every accepted version in `vct_values`, for example `urn:tamga:edu:DiplomaCredential:1` and `:2`. Tamga recommends listing at least two once a second version exists, so earlier holders are not locked out.

### Is `transaction_data` supported?

Not yet. Binding a presentation to a specific transaction is planned for finance and authorisation scenarios; education scenarios don't need it.

## Sources

- [OpenID for Verifiable Presentations 1.0, Final, 9 July 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 December 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profile (SPEC-PROTO-0002), Tamga Network docs](https://docs.tamga.network/specifications/openid4vp)
- [Verification pipeline and API (SPEC-API-0001), Tamga Network docs](https://docs.tamga.network/specifications/verification-api)
- [ADR-0034: HAIP 1.0 conformance, Tamga Network docs](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Presentation, Tamga Network docs](https://docs.tamga.network/concepts/presentation)
- [Verifying on a server, Tamga Network docs](https://docs.tamga.network/guides/verify-on-server)

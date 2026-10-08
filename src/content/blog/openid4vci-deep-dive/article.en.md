---
title: "OpenID4VCI deep dive: offers, DPoP, proofs, batches"
slug: openid4vci-deep-dive
description: "OpenID4VCI 1.0 issuance in Tamga: offers and tx_code, PAR and PKCE, DPoP, the nonce endpoint, key proofs, wallet attestation, batches of 10."
date: 2026-10-08
lang: en
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Sources: OpenID4VCI 1.0 Final (16 Sep 2025): Nonce Endpoint §7 (c_nonce only, no-store), proofs §8.2, deferred §9 (HTTP 202 + transaction_id + interval), notification events §11, signed metadata typ openidvci-issuer-metadata+jwt, key attestation typ key-attestation+jwt (App. D), batch_size ≥ 2. HAIP 1.0 Final (24 Dec 2025) §4: authorization code flow, FAPI2 PKCE S256 + PAR, DPoP + DPoP-Nonce, scope per configuration, wallet attestation shared sub, key attestations, nonce_endpoint when binding. SPEC-PROTO-0001 v1.0.0 (2026-10-08): flows, tx_code rules PR1/PR12, offer classes, PR3, DPoP PR17, WUA/WIA §11.1, KA §11.1.1, PAR flow §11.2 PR13–PR15, batch §8 PR6, diploma 10 copies (2026-10-08), deferred §9, errors §13. Code: @tamga-network/issuer oid4vci.ts (metadata, scope = vct, config id = vct, reuse policy, authServerMetadata), wallet-core authcode.ts (scope in PAR), dpop.ts (use_dpop_nonce), oid4vci.ts (proofs or key_attestation), platform issuer (c_nonce TTL 300 s). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0 is the OAuth-based protocol a wallet uses to obtain a credential from an issuer. The wallet gets an access token at the token endpoint, a fresh `c_nonce` from the **nonce endpoint**, and sends key proofs to the **credential endpoint**, which returns one credential per proven key. Tamga follows the HAIP 1.0 profile on top of it: DPoP-bound tokens, PAR and PKCE in the authorization code flow, wallet attestation at the token endpoint, key attestations, and a batch of 10 copies bound to 10 different keys.

OpenID4VCI 1.0 became Final on 16 September 2025. Two changes from the drafts still trip up code written against them: `c_nonce` now comes from the nonce endpoint, not the token response, and key proofs travel in `proofs` (an object of arrays), not `proof`. Tamga's profile is [SPEC-PROTO-0001](https://docs.tamga.network/specifications/openid4vci).

![The two ways issuance starts in Tamga](/blog/openid4vci-deep-dive/en/fig-flows.png)

> **Note:** Simplified examples. Hosts and identifiers are samples, JWTs are shortened, signatures are left out.

## What does the wallet read before it starts?

Every Tamga institution is a path under the hosted issuer, so its metadata uses the path-insertion form of the well-known URL:

```http title="Issuer metadata request (sample institution)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

With `Accept: application/jwt` the issuer returns **signed metadata** (`typ` `openidvci-issuer-metadata+jwt`, signed with the institution's credential signing certificate in `x5c`). The wallet compares the signer's fingerprint with the institution's entry in the trust list; if they don't match, the metadata is not used. A plain request returns JSON:

```json title="Simplified example: credential issuer metadata"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "authorization_servers": ["https://issuer.tamga.network/example-university"],
  "credential_endpoint": "https://issuer.tamga.network/example-university/credential",
  "nonce_endpoint": "https://issuer.tamga.network/example-university/nonce",
  "batch_credential_issuance": { "batch_size": 10 },
  "credential_configurations_supported": {
    "urn:tamga:edu:DiplomaCredential:1": {
      "format": "dc+sd-jwt",
      "scope": "urn:tamga:edu:DiplomaCredential:1",
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "cryptographic_binding_methods_supported": ["jwk"],
      "credential_signing_alg_values_supported": ["ES256"],
      "proof_types_supported": {
        "jwt": {
          "proof_signing_alg_values_supported": ["ES256"],
          "key_attestations_required": { "key_storage": ["iso_18045_moderate", "iso_18045_high"] }
        }
      },
      "credential_metadata": {
        "credential_reuse_policy": {
          "id": "arf_annex_ii",
          "options": [{
            "details": ["per-relying-party", "once_only"],
            "batch_size": 10,
            "reissue_trigger_unused": 2,
            "reissue_trigger_lifetime_left": 604800
          }]
        }
      }
    }
  }
}
```

Points worth noticing. Each configuration declares a `scope`, because HAIP requires one for every configuration and the wallet uses it in the authorization request; Tamga uses the `vct` URN as both configuration id and scope. `nonce_endpoint` is present because the credentials are key-bound. `key_attestations_required` lists the key storage levels the institution accepts. The reuse policy tells the wallet to use a separate copy per verifier and to fetch a new batch when two copies remain or seven days before expiry.

The authorization server metadata (RFC 8414) at `/.well-known/oauth-authorization-server/example-university` adds `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]`, `token_endpoint_auth_methods_supported` including `attest_jwt_client_auth`, and, where wallet-initiated issuance is enabled, `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` and `code_challenge_methods_supported: ["S256"]`.

## How does an issuer-initiated offer work?

The institution creates a **credential offer** and shows it as a QR code or a link. To keep the QR small, Tamga sends only `credential_offer_uri`; the wallet fetches the offer object from it. The URI is single-use and expires after five minutes; a second fetch returns 404.

```json title="Simplified example: offer with a pre-authorized code"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "credential_configuration_ids": ["urn:tamga:edu:DiplomaCredential:1"],
  "grants": {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
      "pre-authorized_code": "oaKazRN8I0IbtZ0C7JuMn5",
      "tx_code": { "input_mode": "numeric", "length": 6 }
    }
  }
}
```

The `tx_code` is the second factor against someone who photographs the QR code over the person's shoulder. In Tamga it can't be skipped in the pre-authorized flow, it is six digits, three wrong attempts void the offer, and it never travels in the same channel as the offer:

| Offer class | Where it appears | Lifetime | How the person proves it's them |
|---|---|---|---|
| on-screen | portal screen, person logged in | 5 min, single use | `tx_code` shown in the logged-in session |
| out-of-band | QR or link by e-mail or SMS | up to 72 h, single use | `tx_code` through the *other* channel, to an address from the institution's records |
| identity-bound | link through the institution's own channel | 7 days, single use | presenting the identity credential (authorization code grant, `issuer_state`) |

## What does the token request look like, and why DPoP?

```http title="Simplified example: token request with DPoP and wallet attestation"
POST /example-university/token HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7…fX0…
OAuth-Client-Attestation: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24rand0Ii…
OAuth-Client-Attestation-PoP: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24tcG9wK2p3dCJ9…

grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
&pre-authorized_code=oaKazRN8I0IbtZ0C7JuMn5
&tx_code=493812
```

```json title="Token response"
{ "access_token": "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NiJ9…", "token_type": "DPoP", "expires_in": 300 }
```

**DPoP** (RFC 9449) binds the access token to a key. For each issuance flow the wallet creates an ephemeral P-256 key and signs a `dpop+jwt` proof carrying `jwk`, `jti`, `htm`, `htu` and `iat`. The issuer binds the token to the key's thumbprint, so a stolen token is useless without the key. Requests to the credential endpoint carry `Authorization: DPoP <token>` plus a new proof with `ath`, the SHA-256 of the token. If a server answers `use_dpop_nonce` with a `DPoP-Nonce` header, the wallet retries once with that nonce, as HAIP asks wallets to be ready for. Tamga's access tokens live five minutes.

The two `OAuth-Client-Attestation` headers are **wallet attestation**, the OAuth attestation-based client authentication that HAIP uses. The first is a JWT signed by the wallet provider, with the provider's certificate in `x5c`; the second is a proof of possession signed with the key in the attestation's `cnf`, with `aud` set to the issuer. The issuer checks that the signing certificate belongs to a wallet provider listed in the trust list, and refuses the token (`invalid_client`) if not. Under HAIP the attestation's `sub` must be the same for every installation of a wallet product, so it carries no per-phone value; Tamga Wallet, one of the wallets on the network, uses its solution identifier. The short-lived Wallet Instance Attestation (under 24 hours, a fresh key and a fresh revocation entry for each operation) also carries `client_status`, which the issuer checks against the wallet provider's status list. Why an institution trusts these attestations at all is in [How do you trust a wallet?](/blog/trusting-a-wallet)

## How does the wallet-initiated flow use PAR and PKCE?

When the person picks an institution from the in-app list (read from the trust list, not from a separate directory server), the wallet starts the authorization code flow:

```http title="Simplified example: pushed authorization request"
POST /example-university/par HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
OAuth-Client-Attestation: eyJ…
OAuth-Client-Attestation-PoP: eyJ…

client_id=example-wallet-solution
&response_type=code
&scope=urn%3Atamga%3Aedu%3ADiplomaCredential%3A1
&redirect_uri=…
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
&code_challenge_method=S256
&state=af0ifjsldkj
```

PAR (RFC 9126) moves the authorization parameters to a back-channel request, and PKCE with S256 (RFC 7636) binds the code to the wallet that started the flow; HAIP requires both through FAPI 2.0. `client_id` is the wallet attestation's `sub`. `redirect_uri` is fixed in the PAR and must match a registered address. For an identity-bound offer the wallet also sends `issuer_state`.

At `/authorize` the Tamga issuer does something specific to the network: instead of a login page, it returns a signed OpenID4VP request for the person's identity credential. The wallet runs the normal presentation flow, the issuer verifies the presentation through the full pipeline and matches the person against the institution's own records, and on success redirects with a single-use `code` valid for at most 60 seconds. The token request then carries `grant_type=authorization_code`, the `code`, the `code_verifier`, the same `redirect_uri` and the same wallet attestation.

## How are key proofs and the batch of 10 sent?

First the wallet asks for a nonce. The endpoint needs no token and responds with `Cache-Control: no-store`:

```http title="Nonce endpoint"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Each `c_nonce` is consumed once, atomically: a "check, then delete" race would let one proof be used twice. Then the wallet generates the device keys in secure hardware and sends the credential request:

```http title="Simplified example: credential request with ten proofs"
POST /example-university/credential HTTP/1.1
Host: issuer.tamga.network
Authorization: DPoP eyJ0eXAiOiJhdCtqd3Qi…
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIs…
Content-Type: application/json

{
  "credential_configuration_id": "urn:tamga:edu:DiplomaCredential:1",
  "proofs": {
    "jwt": [
      "<openid4vci-proof+jwt signed with key 1>",
      "<… key 2 …>",
      "…",
      "<… key 10 …>"
    ]
  }
}
```

Each proof has `typ: openid4vci-proof+jwt`, `alg: ES256` and the public key in its `jwk` header, and its payload holds `aud` (the credential issuer identifier), `iat` and `nonce`. The issuer checks every proof, checks that the ten keys are **all different**, and issues ten credentials, putting each proof's key into that copy's `cnf`:

```json title="Credential response (shortened)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… nine more …"
  ]
}
```

Each string ends with an empty `~`: there is no KB-JWT until the wallet presents it ([SD-JWT VC deep dive](/blog/sd-jwt-vc-deep-dive)). For the identity credential, each object also carries an `mso_mdoc` bound to the same key ([ISO mdoc deep dive](/blog/iso-mdoc-deep-dive)).

![Ten keys, ten proofs, ten copies](/blog/openid4vci-deep-dive/en/fig-batch.png)

Why ten different keys? If every copy carried the same `cnf`, two verifiers comparing notes could link the copies, and the batch would protect nothing. Each copy also gets its own random status list index, so copies can't be linked through `idx` either. When a credential is revoked, the issuer sets all of its copies' indices together; the mapping between copies and indices stays in the issuer's own database. This applies to every credential type, diplomas included.

With a **key attestation** the batch can be requested with a single proof instead. The proof's header carries `key_attestation`, a JWT signed by the wallet provider that lists `attested_keys` and states their storage level, and the proof is signed with the first attested key. The issuer checks the attestation, its revocation status and the nonce, applies the institution's minimum key storage level, and binds one copy to each attested key. OpenID4VCI 1.0 defines this format in its Appendix D.

## Does Tamga use deferred issuance?

The profile describes it for one case, a diploma whose graduation decision is not yet approved, with rules of its own: a `transaction_id` lives at most 30 days, the polling `interval` is at least 300 seconds, and the wallet backs off exponentially, because regular polling tells the issuer "this person is still waiting". No Tamga issuer offers it today: the metadata has no `deferred_credential_endpoint`, so a diploma is offered only once it can be signed. In OpenID4VCI 1.0 Final, a deferred answer is HTTP 202 with `transaction_id` and `interval`, and a still-pending deferred request gets HTTP 202 again; implementations built from older drafts expect an `issuance_pending` error instead.

## Which errors should a wallet handle?

| Error | Meaning | Wallet behaviour |
|---|---|---|
| `invalid_proof` | a proof is missing, invalid or has no nonce | get a new `c_nonce`, retry |
| `invalid_nonce` | the nonce is stale or used | get a new `c_nonce`, retry |
| `invalid_credential_request` | malformed request | report, don't retry |
| `unknown_credential_configuration` | configuration not offered | refresh metadata |
| `credential_request_denied` | not authorised, or authorisation withdrawn | don't retry |
| `invalid_client` (token) | wallet attestation missing, invalid or revoked | stop |
| `invalid_token` | the access token expired | restart the flow |

Error responses carry no personal data. "No record found for this person" is returned as `credential_request_denied`; the detail stays in the issuer's own audit log.

## Frequently asked questions

### Why is the `tx_code` never in the QR code?

Because the QR code may be seen or photographed by someone else. If the code travelled with it, that person could collect the credential into their own wallet. Splitting them across channels means both must be captured.

### Does HAIP require the pre-authorized code flow?

No. HAIP requires the authorization code flow. Tamga supports both: pre-authorized offers for institutions whose portal already knows the person, and the authorization code flow with PAR, PKCE and identity presentation for wallet-initiated requests.

### Can the issuer tell which verifier a copy was used with?

No. The issuer doesn't see presentations, and copies don't share a key or a status index, so even colluding verifiers can't link them through the credential.

### What happens when the copies run out?

The wallet asks for a new batch when two copies remain, using a single-use, DPoP-bound refresh token. At a verifier it already knows it keeps using that verifier's copy; at a new verifier it asks the person before reusing a copy.

## Sources

- [OpenID for Verifiable Credential Issuance 1.0, Final, 16 September 2025](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 December 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 9449: OAuth 2.0 Demonstrating Proof of Possession (DPoP), IETF](https://www.rfc-editor.org/rfc/rfc9449)
- [RFC 9126: OAuth 2.0 Pushed Authorization Requests, IETF](https://www.rfc-editor.org/rfc/rfc9126)
- [OpenID4VCI profile (SPEC-PROTO-0001), Tamga Network docs](https://docs.tamga.network/specifications/openid4vci)
- [Issuance, Tamga Network docs](https://docs.tamga.network/concepts/issuance)
- [ADR-0025: Wallet instance and key attestations, Tamga Network docs](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)
- [Issuing credentials as an institution, Tamga Network docs](https://docs.tamga.network/guides/issue-credentials)
- [`@tamga-network/issuer`, Tamga Network docs](https://docs.tamga.network/packages/issuer)

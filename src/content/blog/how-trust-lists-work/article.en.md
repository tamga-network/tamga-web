---
title: "How a signed trust list works, from registration to check"
slug: how-trust-lists-work
description: How Tamga Network's signed trust lists work: two levels, signing, publication cadence, freshness, the anchor log and what a verifier checks.
date: 2026-10-08
lang: en
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Sources: SPEC-TRUST-0001 1.0.0 (§1 principles: JWS ES256 x5c, .json for humans only, version + previous_version_hash, next_update ≤ 90 days, change within 24 h, anchors hourly; §2 file layout; §3 lotl fields; §4 tl fields, issuer entry, status vocabulary, record never removed; §5 anchor log, checkpoint at 500 lines; §6 loader order, environment, YES/NO/UNKNOWN; §8 TL1–TL12; security notes: single operator signature, public log, CHANGELOG, quarterly transparency report, audit; open issues: ETSI XML export, ≥2 rolling keys + KMS before the pilot). SPEC-API-0001 §1 (A3b issuerId from certificate, C1/C2 at iat, C2 cannot be skipped, C3, D5 anchor check), §2.1 three results. Guides join-as-institution (registrar, 24 h, WRPRC), sandbox (environment: sandbox). Live files checked 2026-10-08 and 2026-10-23 (anchor_signing_keys: one ACTIVE entry): lotl.json/tl-tr.json list_format_version 1.0, operator.status provisional, next_update 90 days after issued_at, one anchor signing key. External: EU LOTL XML, CID (EU) 2015/1505, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List draft. -->

A signed trust list is a file, signed by the list operator, that says which institutions may issue which credential types, which verifiers are registered and which wallet providers are recognised. Tamga Network publishes them at two levels, with a list of trusted lists (`lotl.jws`) on top and a country list for Türkiye (`tl-tr.jws`) below it. A verifier trusts a single root fingerprint up front. After checking the signatures, the version chain and the freshness of the lists, it asks one question about each credential: was this institution registered and authorised for this credential type when it signed it?

## What are the two levels of lists?

The model comes from the EU. The European Commission publishes a list of the member states' trusted lists ([EU LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)), and each state publishes its own national list in the format set by [Commission Implementing Decision (EU) 2015/1505](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) and ETSI TS 119 612. Tamga uses the same structure:

| List | What it holds | Address |
|---|---|---|
| List of trusted lists (LOTL) | addresses and signing keys of the country lists, wallet providers, the schema catalogue, accepted zero-knowledge circuits | `trust.tamga.network/lotl.jws` |
| Country list | that country's root certificates, institutions and verifiers | `trust.tamga.network/tl-tr.jws` |

![From the pinned root fingerprint through the LOTL and the country list to the institution entry and the credential](/blog/how-trust-lists-work/en/fig-zincir.png)

The chain starts with something the verifier already has, namely the SHA-256 fingerprint of the certificate that signs the LOTL, which is built into its configuration. The fingerprint is also published at [tamga.network/trust-anchor](https://tamga.network/trust-anchor). The list server itself is not trusted. Downloading a list from the right address is not enough, because its signature also has to match that fingerprint.

The LOTL in turn names the signer of each country list. Today the Türkiye list is the only active one, and Tamga runs it provisionally on behalf of the national authority. The data structures already have slots for other states.

## What is in an institution's entry?

> **Note:** This is a simplified example. The institution is made up, identifiers and fingerprints are shortened, and some fields are left out. The real format is in the [trust list specification](https://docs.tamga.network/specifications/trust-lists).

```json title="Simplified example: one institution entry in tl-tr"
{
  "issuer_id": "0x5be1…",
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "cert_fingerprint_sha256": "a41f…",
  "status": "ACTIVE",
  "valid_from": "2026-10-01T00:00:00Z",
  "valid_until": "2028-10-01T00:00:00Z",
  "status_history": [
    { "status": "ACTIVE", "since": "2026-10-01T00:00:00Z", "reason": "initial-registration" }
  ],
  "schema_authorizations": [
    {
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "allowed": true,
      "valid_from": "2026-10-01T00:00:00Z",
      "valid_until": null
    }
  ],
  "status_list_base": "https://status.tamga.network/"
}
```

A few fields carry most of the weight:

- `issuer_id` is computed from the fingerprint of the institution's certificate, so the institution cannot choose it and nobody else can copy it.
- `class` says what kind of credential the institution issues, which is a public-body credential (`PUB`), a qualified one (`QUALIFIED`) or an ordinary attestation (`EAA`). `assurance` is its assurance level, from `I1` to `I3`.
- `schema_authorizations` lists the credential types the institution may issue, each with its own time window. A ticket seller with a valid entry still cannot issue a diploma that passes.
- `status_history` only ever gets new lines, and old lines are never rewritten.

What the entry leaves out is just as deliberate. It holds no student names, no credential hashes and no counts, because no list, anchor log or change log may carry personal data (TL11).

## How does an institution get into the list?

An institution applies with its registration data and a certificate signing request. The registrar checks the application and reports every missing field at once. The root certificate authority then signs the institution's certificate, the institution is added and the list is re-signed. The change is live within 24 hours. The steps from the institution's side are in [How an institution joins Tamga Network](/blog/join-as-an-institution).

At every publication the publisher also generates a registration certificate (ETSI TS 119 475) for each verifier use and each issuer, under `trust.tamga.network/wrprc/`. Its content comes only from the signed list, so a wallet can also use it to check a verifier's registration. Since 29 October 2026 each certificate also names its policy, the [registration certificate policy](https://arf.tamga.network/policies/registration-certificate) with its own identifier, and points to a one-bit status list at `trust.tamga.network/status/wrprc/1` that is re-signed every hour. A wallet refuses a revoked certificate and warns the person when the status cannot be checked.

## How is a list signed and published?

Each list is a compact JWS signed with ES256, with the operator's certificate in the `x5c` header. A `.json` copy sits next to it for people to read, and software uses only the `.jws`.

Three rules keep the history honest:

1. **The version only grows.** An old version cannot be served again as if it were new.
2. **Each version carries the hash of the previous one** (`previous_version_hash`), so the versions form a chain and a gap or a rewrite is easy to spot.
3. **Nothing is deleted.** A withdrawn institution stays in the list with a new status, and earlier versions stay in `archive/`.

![When each file is published and the rule that applies to it](/blog/how-trust-lists-work/en/fig-yayin.png)

Lists are re-signed at least every 90 days even when nothing changed, so a reader can always tell a quiet list from an abandoned one. A public `CHANGELOG.md` in the same place records every build.

## What is the anchor log for?

Some things change too often to re-sign the whole list each time, above all the revocation lists that institutions publish. These go into the anchor log, `anchors.jsonl`, which has one signed line per event, each linked to the previous line by its hash.

A line records, for example, that an institution published version N of its revocation list with a given content hash. When a verifier later reads that revocation list, it compares the hash with the anchor. If the hash does not match or the version went backwards, the credential does not pass. If the verifier's cached copy is simply older than the newest anchor, the result is "cannot be verified right now" until the copy is refreshed. This is how a verifier knows that a revocation list really comes from the institution and has not been swapped for an older one.

The log gets at least one line an hour, and if nothing else happened in that hour the line is a heartbeat. When it grows past 500 lines, the operator moves the lines into the archive and starts the new log with a signed checkpoint that links to the archive's last line and to the archive file's hash. Because no line is ever deleted, the full history can be rebuilt from the archives.

## How fresh must a list be?

Every list carries a `next_update` date. Services reload the lists at regular intervals, and verifiers fetch revocation lists ahead of time and keep them in a cache. Nothing is downloaded at the moment of a check, which is also why the institution never learns where its credentials are shown ([Revocation without tracking](/blog/status-list-privacy)).

If a list cannot be fetched, or its `next_update` has passed, the verifier does not guess. The result is "cannot be verified right now" (`INDETERMINATE`), never accepted and never rejected (TL5). A diploma is not declared fake because a server was unreachable.

## What does a verifier check, step by step?

The checks come in two groups. The first group runs when the lists load:

![What is checked when a trust list loads and what happens if it fails](/blog/how-trust-lists-work/en/fig-denetim.png)

The network check matters for testing. The sandbox's lists say `"environment": "sandbox"`, and a verifier set up for the real network stops when it sees them, so a sandbox credential cannot pass at a real verifier.

The second group runs for each credential, when the trust layer of the verification pipeline ([verification API](https://docs.tamga.network/specifications/verification-api)) asks:

| Step | Question |
|---|---|
| A3b | Which institution is this? Derived from the certificate that signed the credential; what the credential claims about itself is ignored |
| C1 | Was the institution acceptable at the moment the credential was issued? |
| C2 | Was it authorised for this credential type at that moment? This step cannot be switched off |
| C3 | Does the verifier's country recognise the institution's country? |
| D5 | Does the revocation list match its anchor in the log? |

C1 and C2 look at the moment the credential was issued rather than at today. If a university's entry is later retired, diplomas it issued while active stay valid. If its key was compromised, the entry is revoked with an `invalidates_from` date, and only credentials issued from that date on fail. What counts is the state of the list on the day of issue.

Code never interprets the list files directly. The `@tamga-network/trust` package exposes one interface, `TrustSource`, which answers `YES`, `NO` or `UNKNOWN`, and `UNKNOWN` becomes `INDETERMINATE`. The guide [Read the trust lists](https://docs.tamga.network/guides/read-trust-lists) shows how to use it.

## What are the honest limits today?

- **One signer.** The anchor rests on a single operator's signature. If the operator and an institution acted together, they could show different versions to different readers. The public log, the change log, a quarterly transparency report and independent audit deter this, but they do not make it impossible. The shared ledger, which needs at least two independent operators, is what closes this gap ([Why we start without a blockchain](/blog/why-no-blockchain-yet)).
- **One key for now.** The rules ask for at least two rolling signing certificates, with rotations announced 30 days ahead. The live lists use one (checked 2026-10-23). Before the pilot, the rules require the second key and require the signing key to be held in a key-management service.
- **ETSI XML: live on the sandbox, real network later.** The sandbox already publishes its country list as an ETSI TS 119 612 XML view, signed XAdES-B-B from the same signed list and with the same version ([trust.sandbox.tamga.network/tl-tr.xml](https://trust.sandbox.tamga.network/tl-tr.xml); the URIs are explained in the [ETSI trusted list page](https://docs.tamga.network/concepts/etsi-trusted-list)). The real network's XML list opens once the foundation that will operate the list exists, so that the list names a permanent operator and its address. It makes no EU "qualified" or "notified" claim. ETSI TS 119 602 views for wallet providers can be published when enabled.

## Frequently asked questions

### Can I read the trust list myself?

Yes. `trust.tamga.network/tl-tr.json` and `lotl.json` are readable copies. Software should load the signed `.jws` files through `TrustSource`, because that interface checks the signature, the chain and the freshness.

### Does the trust list contain personal data?

No. It holds institution and verifier names, certificate fingerprints, statuses, dates, addresses and credential types. People, credential contents and credential hashes are not in it.

### What happens when an institution leaves the network?

Its entry is not removed. The status changes (for example to `RETIRED` or `REVOKED`) and the change is appended to its history, so credentials issued earlier can still be judged by the state of the list on their issue date.

### How often is the list updated?

A change is published within 24 hours, and every list is re-signed at least every 90 days. The anchor log gets a new line at least once an hour.

### Is this the same as an EU trusted list?

It follows the same two-level model, and its fields map to ETSI TS 119 612. It is still not an EU list, because no EU body publishes it and Tamga does not claim EU status for it.

## Sources

- [EU list of trusted lists (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [Commission Implementing Decision (EU) 2015/1505: trusted list formats](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Trusted Lists](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth working group draft)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: trust list specification](https://docs.tamga.network/specifications/trust-lists) · [Trust lists and federation](https://docs.tamga.network/concepts/trust-lists) · [Read the trust lists](https://docs.tamga.network/guides/read-trust-lists)
- [Trust lists](/learn/trust-lists) · [Federation](/learn/federation)

---
title: "Revocation without tracking: privacy in the status list"
slug: status-list-privacy
description: How Tamga Network's status lists let a verifier check revocation without telling the issuer where a credential was shown, and where that privacy ends.
date: 2026-10-08
lang: en
updated: 2026-10-23
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (2026-10-09: interval 2 min, revocation effective within a few minutes, list valid 6 h; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. ADR-0044 (ZK short-lived copies ≤ 24 h, implemented in packages 0.4.0). -->

A status list lets a verifier find out whether a credential has been revoked without contacting the institution that issued it. In Tamga Network each institution publishes one large, signed bit string in the IETF Token Status List format, and every credential points to a random position in it. Verifiers download whole lists in advance and read the bit from their own copy, so the institution never learns when, where or to whom a credential was shown.

## Why can a revocation check become a tracking channel?

The obvious way to check revocation is to ask the issuer. The verifier sends the credential's serial number and gets back "valid" or "revoked", and certificate checking on the web worked that way for years. The method has a side effect that matters for people, because every check tells the issuer that someone, at this moment and from this network address, is looking at this person's credential.

For a diploma, that means the university could see which employers each graduate applied to. A paper diploma never told the university anything like that, and a digital one should not either. Tamga's status list specification makes this its first privacy rule, which says that a verifier must not fetch a list at the moment of verification ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## How does a Token Status List work?

The [IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) is a compressed array of small numbers, signed by the issuer. Since October 2026 the number of bits depends on the credential type (ADR-0048, packages 0.6.0). The identity service's credentials cannot be suspended, so their lists use one bit, with `0` for valid and `1` for revoked. Institutions' lists use two bits. There `0` means valid, `1` revoked for good and `2` suspended (which can be lifted), while `3` is unused and a verifier treats it as revoked. The value `2` is used only for types whose schema allows suspension, such as the diploma. Suspension exists so that a university can hold a diploma during an investigation instead of revoking it outright.

Each credential carries a pointer into the list. The pointer is not selectively disclosable and travels with every presentation, because the verifier needs it.

> **Note:** This is a simplified example, and the address and the index are made up. The real format is in the [status list specification](https://docs.tamga.network/specifications/status-list).

```json title="Simplified example: the status claim inside a credential"
{
  "status": {
    "status_list": {
      "idx": 48213,
      "uri": "https://status.tamga.network/3f9c1a7e5b20d846"
    }
  }
}
```

The verifier fetches the token at `uri` and checks its signature against the institution's entry in the [signed trust list](/blog/how-trust-lists-work). It then compares the token's digest with the anchor log, decompresses the list and reads the entry at `idx`. The list is signed with a status key that is separate from the key that signs credentials, so a stolen status key can publish false statuses but cannot forge a diploma.

## What is herd privacy, and how large is the herd?

A downloaded list says nothing about which of its entries the verifier cares about. This is called herd privacy, because your credential hides among all the others in the same list. The herd only helps if it is large and if nothing about your position stands out, and Tamga's rules are written to make both true:

![Rules that keep the status list from leaking who a credential belongs to](/blog/status-list-privacy/en/fig-suru.png)

- **Large lists.** Every list has room for at least 100,000 entries. When 80% are allocated, a new list is opened. Compressed, a list that is mostly zeros takes a few hundred bytes, so the size costs nothing.
- **Random positions.** The index is drawn at random from the whole list, and a counter is not allowed. With sequential numbers, index 12 would be the twelfth graduate of the year, and two graduates' indexes would show how far apart they graduated, even if the graduation date was never disclosed.
- **Opaque addresses.** The list address is a random string. An address such as `.../edu-2026` or `.../medicine` would disclose the year or the faculty in every presentation, while the person had hidden exactly that field.
- **Split by type only.** Lists may be separated by credential type, which is visible anyway. They may not be split by year, faculty or cohort, because simply being on "the 2026 list" would disclose something by itself.

These rules are enforced in the open packages as well as written down. The issuer library refuses a list smaller than 100,000 entries, refuses to allocate past 80% and picks every index with a cryptographic random number generator.

## Why does the verifier download the list in advance?

Downloading at the moment of verification would open exactly the tracking channel described above. A Tamga verifier therefore refreshes every status list it needs on a schedule and verifies from the cache:

```ts title="Prefetching status lists with @tamga-network/verifier"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // on a schedule, never per verification
```

In the verifier package, verification reads status only from this cache. The hosted verifier, Tamga Verify, works the same way.

Each list token carries two time limits. `ttl` is the freshness target and says how long a copy may be used before it is refreshed. `exp` is the hard limit after which a copy may not be used at all. If the cached copy is too old for the verifier's policy, the result is "cannot be verified right now" (`INDETERMINATE`) and never "revoked". The difference between "this diploma was revoked" and "I cannot check right now" can decide whether someone gets the job, so the two are shown differently ([how verification handles this](/blog/add-verification-to-your-site)).

## Why is the list republished when nothing has changed?

If an institution republished only when it revoked something, the publication itself would be news, for example that a revocation happened at Example University between 14:00 and 15:00. Combined with outside knowledge, such as the date of a disciplinary decision, that can point to a single person.

Every list is therefore republished on a fixed interval, whether or not anything changed. From the outside every interval looks the same, because each one produces a new version. The interval is 2 minutes, so while the status server is up a revocation reaches verifiers within a few minutes, and each published list is valid for 6 hours ([ARF §5.4](https://arf.tamga.network/architecture)).

![One publication cycle of a status list](/blog/status-list-privacy/en/fig-dongu.png)

There is deliberately no "urgent" publication outside the cycle, because a single off-cycle publication would undo the protection for everyone. When something must stop at once, such as a stolen signing key, the right tool is the trust list. The institution's certificate is suspended there instead.

Every publication is also recorded in the public anchor log of the trust list publisher. A verifier compares the list's digest and version with that record, which stops an institution from quietly rolling a revoked credential back to "valid". The anchor log carries list identifiers, versions and digests, and never a position in a list.

## How do copies stop two verifiers from matching a person?

The index is fixed for the life of a credential. If a person showed the same credential to two verifiers, and the two compared notes, the identical `idx` and `uri` would tell them it was the same person. The specification calls this out as a structural limit of Token Status List.

Batch issuance solves this. Every credential, a diploma included, is issued as 10 copies, and each copy has its own device key and its own random index. The wallet shows the same copy to the same verifier and a different copy to each different verifier (rule WL5). The mapping between copies and indexes stays in the issuer's database and never leaves it (PR10). When a credential is revoked, all of its copies' bits change in the same scheduled publication, alongside whatever else changed in that interval.

A zero-knowledge presentation goes one step further and reveals no index at all, at the cost that the verifier cannot check revocation. For this reason, only short-lived copies are presented with zero knowledge. They are valid for at most 24 hours and are not refreshed once the credential is revoked ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). This has been in place since packages 0.4.0. The short lifetime stands in for the revocation check, and a zero-knowledge presentation not based on such a copy is accepted only if the verifier's policy explicitly allows it ([Zero-knowledge proofs in Tamga](/blog/zero-knowledge-in-tamga)).

## Who can see what?

![What each party can and cannot learn from a status list](/blog/status-list-privacy/en/fig-kim.png)

| Party | Can see | Cannot see |
|---|---|---|
| Issuing institution | the revocations and suspensions it makes | where, when or to whom a credential is shown |
| Verifier | the status of the copy it was shown, today and later | the other copies of the same credential |
| Status list host | that a verifier keeps a list fresh | which credential is checked, or when |
| Anyone reading the list | a new version each interval; which bits differ between versions | whose credential a bit belongs to |

No Tamga service records IP addresses, and no record, log or result contains a position in a status list ([ARF §4.5](https://arf.tamga.network/architecture)).

## Where does this privacy stop?

The specification records some limits as accepted, and they are worth stating plainly.

- **Small institutions have small herds.** A college with 300 graduates on a 100,000-entry list has a big list but a herd of 300, because the credential names its issuer anyway. There is no technical fix for this, and it is recorded as an accepted limitation.
- **A verifier can watch the copy it saw.** The verifier knows that copy's index, so it can later see whether that copy was revoked. This is the purpose of a status list, but it is still information, and copies limit it to the one verifier that already knew the person.
- **Timing is blurred, not erased.** The fixed interval hides the exact moment of a revocation within the interval. It does not hide a revocation from someone who already knows the date of the underlying event and can watch for a flipped bit.
- **A hosted status service sees the revocations it publishes.** An institution can run its own status service or use the network's hosted issuing service. In the second case the operator publishes, and therefore sees, that institution's revocations. The specification names this as a real point of centralisation and ties it to governance rules.
- **The anchor rests on one signer today.** The anchor log is signed by a single, provisional operator. The shared ledger that removes this limit waits for a second independent operator ([Why we start without a blockchain](/blog/why-no-blockchain-yet)).

## Frequently asked questions

### Does the issuer learn when I show my credential?

No. Verifiers download the status lists ahead of time and check from their own copy. No request reaches the institution at the moment of verification.

### Can someone tell from the list who has been revoked?

They can see that some positions changed between two versions. They cannot tell whose credentials those positions belong to, because positions are random and the mapping stays with the issuer.

### How quickly does a revocation take effect?

It takes effect within one publication interval plus the verifier's refresh time. Lists are republished every 2 minutes, so while the status server is up this is a few minutes.

### What happens if the list cannot be downloaded?

The verifier keeps using its last good copy until that copy expires, 6 hours after it was published. After that the result is "cannot be verified right now", and never "revoked".

### Why not publish immediately in an emergency?

An off-cycle publication would reveal that something had happened, so urgent cases are handled by suspending the institution's certificate in the trust list instead.

## Sources

- [IETF Token Status List (OAuth working group draft)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: status list specification](https://docs.tamga.network/specifications/status-list) · [Revocation and freshness](https://docs.tamga.network/concepts/revocation) · [Privacy](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: architecture (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP and Token Status List](/blog/haip-and-token-status-list) · [Revocation](/learn/revocation) · [Unlinkability](/learn/unlinkability)

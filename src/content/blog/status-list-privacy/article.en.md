---
title: "Revocation without tracking: privacy in the status list"
slug: status-list-privacy
description: How Tamga Network's status lists let a verifier check revocation without telling the issuer where a credential was shown, and where that privacy ends.
date: 2026-10-08
lang: en
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (pilot interval 60 min, effect within 90 min; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. Interval figure taken only from the ARF (pilot value), not from today's deployment. -->

A status list lets a verifier find out whether a credential has been revoked without contacting the institution that issued it. In Tamga Network each institution publishes one large, signed bit string in the IETF Token Status List format; every credential points to a random position in it. Verifiers download whole lists in advance and read the bit from their own copy, so the institution never learns when, where or to whom a credential was shown.

## Why can a revocation check become a tracking channel?

The obvious way to check revocation is to ask: the verifier sends the credential's serial number to the issuer and gets back "valid" or "revoked". Certificate checking on the web worked that way for years. It has a side effect that matters for people. Every check tells the issuer that someone, at this moment, from this network address, is looking at this person's credential.

For a diploma, that means the university could see which employers each graduate applied to. A paper diploma never told the university anything like that. A digital one should not either. Tamga's status list specification treats this as its first privacy rule: a verifier must not fetch a list at the moment of verification ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## How does a Token Status List work?

The [IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) is a compressed array of small numbers, signed by the issuer. Tamga always uses two bits per entry, which gives four values: `0` valid, `1` revoked for good, `2` suspended (can be lifted), and `3` unused, which a verifier treats as revoked. Two bits rather than one exist so that a university can suspend a diploma during an investigation instead of revoking it outright.

Each credential carries a pointer into the list. The pointer is not selectively disclosable: it travels with every presentation, because the verifier needs it.

> **Note:** Simplified example. The address and the index are made up. The real format is in the [status list specification](https://docs.tamga.network/specifications/status-list).

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

The verifier fetches the token at `uri`, checks its signature against the institution's entry in the [signed trust list](/blog/how-trust-lists-work), compares its digest with the anchor log, decompresses it and reads the two bits at `idx`. The list itself is signed with a status key that is separate from the key that signs credentials, so a stolen status key can publish false statuses but cannot forge a diploma.

## What is herd privacy, and how large is the herd?

A downloaded list says nothing about which of its entries the verifier cares about. That is herd privacy: your credential hides among all the others in the same list. The herd is only useful if it is large and if nothing about your position stands out. Tamga's rules are written to make both true:

![Rules that keep the status list from leaking who a credential belongs to](/blog/status-list-privacy/en/fig-suru.png)

- **Large lists.** Every list has room for at least 100,000 entries. When 80% are allocated, a new list is opened. Compressed, a list that is mostly zeros is a few hundred bytes, so size costs nothing.
- **Random positions.** The index is drawn at random from the whole list. A counter is not allowed: with sequential numbers, index 12 would be the twelfth graduate of the year, and two graduates' indexes would show how far apart they graduated, even if the graduation date was never disclosed.
- **Opaque addresses.** The list address is a random string. An address such as `.../edu-2026` or `.../medicine` would disclose the year or the faculty in every presentation, while the person had hidden exactly that field.
- **Split by type only.** Lists may be separated by credential type, which is visible anyway. They may not be split by year, faculty or cohort, because simply being on "the 2026 list" would be a disclosure of its own.

These rules are in the open packages as well as on paper. The issuer library refuses a list smaller than 100,000 entries, refuses to allocate past 80% and picks every index with a cryptographic random number generator.

## Why does the verifier download the list in advance?

Because downloading at the moment of verification is precisely the tracking channel described above. A Tamga verifier refreshes every status list it needs on a schedule and verifies from the cache:

```ts title="Prefetching status lists with @tamga-network/verifier"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // on a schedule, never per verification
```

In the verifier package, verification reads status only from this cache. The hosted verifier, Tamga Verify, works the same way.

Each list token carries two time limits. `ttl` is the freshness target: how long a copy may be used before it is refreshed. `exp` is the hard limit after which a copy may not be used at all. If the cached copy is too old for the verifier's policy, the result is "cannot be verified right now" (`INDETERMINATE`), never "revoked". The difference between "this diploma was revoked" and "I cannot check right now" is whether someone gets the job, so the two are shown differently ([how verification handles this](/blog/add-verification-to-your-site)).

## Why is the list republished when nothing has changed?

If an institution republished only when it revoked something, the publication itself would be news: "a revocation happened at Example University between 14:00 and 15:00". Combined with outside knowledge, such as the date of a disciplinary decision, that can narrow things down to one person.

So every list is republished on a fixed interval whether or not anything changed. From the outside, every interval looks the same: there is a new version. The interval and the longest time a revocation may take to reach verifiers are fixed in the Tamga ARF ([ARF §5.4](https://arf.tamga.network/architecture)).

![One publication cycle of a status list](/blog/status-list-privacy/en/fig-dongu.png)

There is deliberately no "urgent" publication outside the cycle; one off-cycle publish would undo the protection for everyone. When something must stop at once, such as a stolen signing key, the right tool is suspending the institution's certificate in the trust list, not the status list.

Every publication is also recorded in the public anchor log of the trust list publisher. A verifier compares the list's digest and version with that record, which stops an institution from quietly rolling a revoked credential back to "valid". The anchor log carries list identifiers, versions and digests, never a position in a list.

## How do copies stop two verifiers from matching a person?

The index is fixed for the life of a credential. If a person showed the same credential to two verifiers, and the two compared notes, the identical `idx` and `uri` would tell them it was the same person. The specification calls this out as a structural limit of Token Status List.

The answer is batch issuance. Every credential, a diploma included, is issued as 10 copies, and each copy has its own device key and its own random index. The wallet shows the same copy to the same verifier and a different copy to each different verifier (rule WL5). The mapping between copies and indexes stays in the issuer's database and never leaves it (PR10). When a credential is revoked, all of its copies' bits change in the same scheduled publication, alongside whatever else changed in that interval.

A zero-knowledge presentation goes one step further: it reveals no index at all. The cost is that the verifier cannot check revocation, which is why credentials presented this way are kept short-lived ([Zero-knowledge proofs in Tamga](/blog/zero-knowledge-in-tamga)).

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

Some limits are written into the specification as accepted, and they are worth stating plainly.

- **Small institutions have small herds.** A college with 300 graduates on a 100,000-entry list has a big list but a herd of 300, because the credential names its issuer anyway. There is no technical fix for this; it is recorded as an accepted limitation.
- **A verifier can watch the copy it saw.** The verifier knows that copy's index, so it can see later whether that copy was revoked. This is the purpose of a status list, but it is also information. Copies keep it to the one verifier that already knew the person.
- **Timing is blurred, not erased.** The fixed interval hides the exact moment of a revocation within the interval. It does not hide a revocation from someone who already knows the date of the underlying event and can watch for a flipped bit.
- **A hosted status service sees the revocations it publishes.** An institution can run its own status service or use the network's hosted issuing service. In the second case the operator publishes, and therefore sees, that institution's revocations. The specification names this as a real point of centralisation and ties it to governance rules rather than pretending it away.
- **The anchor rests on one signer today.** The anchor log is signed by a single, provisional operator. The shared ledger that removes this limit waits for a second independent operator ([Why we start without a blockchain](/blog/why-no-blockchain-yet)).

## Frequently asked questions

### Does the issuer learn when I show my credential?

No. Verifiers download the status lists ahead of time and check from their own copy. No request reaches the institution at the moment of verification.

### Can someone tell from the list who has been revoked?

They can see that some positions changed between two versions. They cannot tell whose credentials those positions belong to, because positions are random and the mapping stays with the issuer.

### How quickly does a revocation take effect?

Within one publication interval plus the verifier's refresh. Lists are published at fixed intervals, and the Tamga ARF sets an upper limit on how long a revocation may take to reach verifiers.

### What happens if the list cannot be downloaded?

The verifier keeps using its last good copy until that copy expires. After that the result is "cannot be verified right now", not "revoked".

### Why not publish immediately in an emergency?

An off-cycle publication would reveal that something happened. Urgent cases are handled by suspending the institution's certificate in the trust list instead.

## Sources

- [IETF Token Status List (OAuth working group draft)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: status list specification](https://docs.tamga.network/specifications/status-list) · [Revocation and freshness](https://docs.tamga.network/concepts/revocation) · [Privacy](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: architecture (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP and Token Status List](/blog/haip-and-token-status-list) · [Revocation](/learn/revocation) · [Unlinkability](/learn/unlinkability)

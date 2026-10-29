---
title: "What we learned passing the OpenID conformance tests, and the kit we open-sourced"
slug: openid-conformance-self-test
description: We ran the OpenID Foundation's issuer and verifier test plans (OpenID4VCI, OpenID4VP, HAIP, FAPI 2.0) on our sandbox, fixed about twenty findings and published the kit.
date: 2026-10-27
lang: en
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, trusting-a-wallet, page:/sdk
---

<!-- Sources: results ledger and per-module notes of the OpenID self-test (issuer plan oid4vci-1_0-issuer-haip-test-plan, 63 modules, rounds 2026-10-21, 2026-10-21 evening, 2026-10-22, final 2026-10-23: 0 FAILED, 2 WARNING (01–02, suite schema cascade with credential_reuse_policy), 4 REVIEW (42, 54, 55, 56), 4 SKIPPED (21–23 encrypted, 52 refresh-token per ADR-0062); round 2 counts 29/22/5; verifier plan oid4vp-1final-verifier-haip-test-plan, sd_jwt_vc + direct_post.jwt, 14 modules, round 1 2026-10-27: 0 FAILED, 6 REVIEW, 7 WARNING, 1 SKIPPED; round 2 2026-10-27 exported logs: 7 PASSED, 6 REVIEW, 1 SKIPPED). Suite issue (credential_reuse_policy cascade) sent to the OIDF certification team on 2026-10-27. Fix list: tamga-network CHANGELOG 0.7.2 (2026-10-27, statusFetchOnDemand, external status list learned on first sight, dpopChallenge WWW-Authenticate, protocol review 2026-10-24) and 0.7.3 (2026-10-27, on npm the same day; locale canonicalisation, purpose removed from request object, direct_post response only redirect_uri). ADR-0059, ADR-0060, ADR-0061, ADR-0062 (public on docs.tamga.network). Kit: github.com/tamga-network/oidf-conformance-kit 0.1.0, README, CONTRIBUTING, references/common-failures.md (Apache-2.0; module names checked against suite master 2026-10-26). Spec references as printed by the suite and in the ledger. -->

Between 21 and 27 October 2026 we ran two OpenID Foundation conformance test plans against Tamga's sandbox: the **issuer** plan (OpenID4VCI 1.0 Final with HAIP and the FAPI 2.0 Security Profile, 63 modules) against the identity service, and the **verifier** plan (OpenID4VP 1.0 Final with HAIP, 14 modules) against Tamga Verify. The last issuer run has no failed module; the last verifier run has no failed module and no warning, for the verifier as it was on 27 October (it has changed since; see the limits below). Getting there meant about twenty code changes, each tied to a clause in a specification. We packaged what we learned into an open-source kit, [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0), so the next team gets through faster.

> **Important:** This is a self-test with the OpenID Foundation's own test tool. It is not an OpenID certification, and we did not publish the test plans in the tool (the reason is below).

## Why do conformance tests matter for an EU-compatible network?

Two products can each follow OpenID4VP to the letter and still fail to talk to each other, because the specification leaves many choices open. [HAIP](/blog/haip-and-token-status-list), the high-assurance interoperability profile, closes most of those gaps by fixing one set of choices, and the European digital identity ecosystem builds on it. Tamga calls itself EU-compatible, and if we checked that claim only with our own tests, we would be grading our own homework.

Our own tests and conformance vectors check the code against our reading of the specifications. The OpenID Foundation's [conformance suite](https://gitlab.com/openid/conformance-suite) checks it against someone else's reading: an open-source tool, maintained by the Foundation, that plays the other side of the protocol and tries hundreds of things a careless implementation gets wrong. It is also the tool behind the Foundation's [certification programme](https://openid.net/certification/). When it disagrees with us, one of us is wrong, and finding out which is the useful part.

## What did we test, and against what?

| | Issuer plan | Verifier plan |
|---|---|---|
| Plan | `oid4vci-1_0-issuer-haip-test-plan` | `oid4vp-1final-verifier-haip-test-plan` |
| Specifications | OpenID4VCI 1.0 Final, HAIP 1.0, FAPI 2.0 Security Profile | OpenID4VP 1.0 Final, HAIP 1.0 |
| Our service | identity service, `id.sandbox.tamga.network` | Tamga Verify, `verify.sandbox.tamga.network` |
| Variant | SD-JWT VC, wallet-initiated authorization code flow, client attestation, DPoP | SD-JWT VC, `direct_post.jwt`, `x509_hash`, signed `request_uri` |
| The tool plays | the wallet, with its own wallet attestation and key attestation | the wallet, presenting a mock EU PID (`urn:eudi:pid:1`) signed with its own test key |
| Modules | 63: 23 OpenID4VCI and 40 FAPI 2.0 | 14 |

![The two plans: the test tool plays the wallet in both](/blog/openid-conformance-self-test/en/fig-plans.png)

We used the hosted instance of the suite at `demo.certification.openid.net`. We added the tool's signing certificates to the sandbox trust list only. Its wallet attestation signer is listed there as a test wallet provider, and its PID signer sits in a separate test list. The real network's lists did not change.

Two practical choices shaped the plans. The issuer plan runs against the identity service rather than an institution's issuer, because an institution's authorization step asks the person to present their identity credential first, which the tool cannot do. The tool's own attestations also leave out two claims our policy requires: a revocation entry in the wallet attestation and a key storage status in the key attestation. The sandbox therefore treats them as optional, while the real network still requires both.

## What were the results?

The issuer plan took three rounds and one repeat run, from 21 to 23 October. The first round ran 42 of the 63 modules and found most of the bugs. The second ran all 63, with 29 passed, 22 warnings and 5 failures, and the third round and a final repeat closed the rest.

| Plan | Run | Passed | Warning | Failed | Review | Skipped |
|---|---|---|---|---|---|---|
| Issuer (63) | final repeat, 23 October | 53 | 2 | 0 | 4 | 4 |
| Verifier (14) | round 1, 27 October | 0 | 7 | 0 | 6 | 1 |
| Verifier (14) | round 2, 27 October | 7 | 0 | 0 | 6 | 1 |

In the verifier's first round, the seven "warning" modules had in fact passed their actual check, because Tamga rejected the bad presentation. All seven carried the same warning, and we fixed it the same day.

The rows that are not "passed" each have a reason:

- **Two warnings (issuer metadata, plain and signed).** Our metadata carries `credential_reuse_policy`, the batch and reuse policy defined by ETSI TS 119 472-3 and used by the EU's ARF. The tool's schema does not allow extra members in `credential_metadata`, so one legitimate extension makes a whole branch of the schema fail, and the tool then reports standard fields (`scope`, `proof_types_supported` and others) as unknown. Its allow-list can silence the extension's name but not that cascade. The field is an EU standard, so it stays. We reported the issue to the tool's team, with a reproduction and two possible fixes.
- **Review.** Some negative tests end with "upload a screenshot", because the tool cannot see the error page our server shows a person and a human has to confirm it. In the verifier plan, every case where Tamga Verify accepts the presentation, or rejects it on its result page (wrong credential type, revoked credential), ends in review for the same reason. Cases where the verifier refuses the response outright with HTTP 400 pass on their own.
- **Skipped.** Three issuer modules test encrypted credential responses. HAIP leaves them optional, and our metadata does not offer them. One tests refresh tokens, which our identity service issues only for its short-lived zero-knowledge copies ([ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)); the tool's request does not ask for that scope, so no refresh token is issued and the module skips. In the verifier plan, `request_uri_method=post` is not advertised, so that module skips.

## What did the tests find, and what did we change?

Below are the changes, about twenty of them, grouped by theme. Each one cites the clause that requires it, and the condition names in brackets are the ones the tool writes to its logs.

![What we fixed, by theme](/blog/openid-conformance-self-test/en/fig-fixes.png)

### Metadata and display

- **Client attestation algorithms.** The authorization server's metadata offered `attest_jwt_client_auth` but did not list `client_attestation_signing_alg_values_supported` and `client_attestation_pop_signing_alg_values_supported` (attestation-based client authentication, §10.1). Both now say `["ES256"]`.
- **Final-version shapes.** Each credential configuration still had a top-level `display`, and used `lang` in display objects. OpenID4VCI 1.0 Final (§12.2.4) puts display under `credential_metadata.display` and calls the field `locale`. We fixed this only in the issuer metadata; SD-JWT VC type metadata keeps `lang`, because that is its own specification's word.
- **Locales.** A newer check validates locale tags. Ours were valid, but nothing stopped a registry entry such as `EN-us` or a duplicate language. Display values are now canonical BCP 47 tags, one entry per language (packages 0.7.3).

### Time claims that could link copies

- **Rounded `iat` and `exp`.** Credentials carried the moment of issuance to the second, so the ten copies of a batch, or two credentials issued to one person, could be linked by time (RFC 9901 §10.1). Issuance and expiry times are now rounded down to the hour, and mdoc validity fields with them.
- Two newer batch checks, distinct and unpredictable status list indices on a shared list, already passed; we added regression tests for them.

### DPoP, PAR and the authorization server

DPoP binds an access token to a key the client holds. PAR (pushed authorization request) sends the authorization request parameters straight to the server before the browser is involved.

- **DPoP at PAR.** The pushed authorization request accepted a DPoP proof without comparing it to `dpop_jkt`, and the token endpoint accepted a different DPoP key from the one used at PAR (RFC 9449 §10). The proof is now verified at PAR, the code is bound to that key, and a different key at the token endpoint gets `invalid_grant`.
- **`htu` normalisation.** A DPoP proof whose `htu` had an upper-case host or an explicit `:443` was rejected; RFC 9449 §4.3 asks for RFC 3986 normalisation first. Scheme and host are now compared case-insensitively and the default port is dropped.
- **Fixed ahead of the run.** Before the first round we read the FAPI 2.0 modules that had not run yet and closed what they would find: PAR answers non-POST methods with 405 (RFC 9126 §2.3), duplicate parameters and a `request_uri` inside PAR get `invalid_request`, only `response_type=code` is accepted, `plain` PKCE is refused, a `client_id` that differs from the attested client gets `invalid_client`, and a `request_uri` cannot be reused once a code was issued (RFC 9126 §4). All of these modules passed on their first run.

### TLS

- **Cipher suites.** TLS 1.2 still accepted a CBC/SHA-1 suite. FAPI 2.0 (§5.2.2, with BCP 195) allows only the recommended suites, so the server now offers ECDHE with AES-GCM only.

### Tokens

- **Access token reuse.** Our access tokens were single-use, so the FAPI happy path, which sends several credential requests with one token, failed. The specifications allow reuse, so we changed the rule in [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests). A token can now be used for several requests within its lifetime (at most five minutes), but only for the configurations it covers, for at most ten copies in total and always with the same DPoP key.
- **Code reuse.** When an authorization code is used a second time, the tokens issued from its first use now stop working (RFC 6749 §4.1.2, RFC 9700 §4.5).
- **Refresh token binding.** We bound refresh tokens to the DPoP key; the tool refreshes with a new DPoP key and the same client. RFC 9449 §5 and attestation-based client authentication §10.3 bind a refresh token to the client instance instead. [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding) binds it to the wallet attestation's instance key, so the token keeps working when the DPoP key changes.
- **Refresh before the first credential.** The tool refreshes right after the token response, before requesting a credential; we rejected that because the record a refresh token pointed to did not exist yet. RFC 6749 §6 allows a refresh token to be used as soon as it is issued, and now it can be.

### Error codes and headers

- An unknown `credential_identifier` returns `unknown_credential_identifier` (OpenID4VCI §8.3.1.2) instead of the generic `invalid_credential_request`.
- A token request without `code_verifier` returns `invalid_grant`, and the code is burnt (RFC 7636 §4.6).
- Every token endpoint response, errors included, carries `Cache-Control: no-store` (RFC 6749 §5.1).
- A 401 from the credential endpoint carries a `WWW-Authenticate: DPoP` challenge with the error and the accepted algorithm (RFC 9449 §7.1). This one came from a protocol review we ran after the issuer rounds.
- A person who opens another client's `request_uri` sees an HTML error page instead of raw JSON.

### The shape of the credential response

- Our credential response carried an extra member, the seed for per-site pseudonyms. The tool flags unknown keys in credential responses. Nothing in the specification forbids an extension, so this was a judgement call, but there was a cleaner standard way. [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration) makes the seed its own credential configuration, requested with a second standard credential request. The privacy rules around the seed did not change.

### The verifier

- **`purpose` in the request.** The signed request object carried a `purpose` parameter, which OpenID4VP 1.0 (§5.1) does not define (`CheckForUnexpectedParametersInVpAuthorizationRequest`). We removed it. The purpose a wallet shows already came from the registration certificate in `verifier_info` (ETSI TS 119 475) and the registered use in the trust list.
- **The `direct_post` answer.** After an accepted presentation, the response endpoint returned `show_url` next to `redirect_uri` (`ValidateDirectPostResponse`, OpenID4VP §8.2). Now it returns only `redirect_uri`; the key for the face-to-face check view travels inside that address.
- **Status lists fetched during verification.** Tamga verifiers download status lists in advance and check from the cache, so the issuer never learns when a credential is checked. The tool serves a new list address in every test and checks that the verifier fetched it. We added an option to fetch a missing list during verification. It is off by default, it has to be switched on explicitly, and it fetches only from the issuer's declared status host, with the same network checks. Only the sandbox's self-test policy switches it on. The same work closed a real gap, because an external issuer's status list address is now learned the first time we see it, which helps with real EU PIDs too.
- **Request object claims.** The request object body now carries `aud` and `iat` as well as the header.
- A newer check under HAIP fails a verifier that reuses its response-encryption key. Ours already makes a new key for every request, and we added regression tests for it.

### Outside the code: configuration and test steps

Some findings were ours but not in the code. A service that restarted during a deployment returned 502 to three modules, so nothing should be deployed while a run is in progress. The second client's callback has a query string, which the sandbox's allow-list did not hold. Several modules also need the tester to do something exact, such as pressing Cancel rather than Approve in the rejection test, doing nothing on the first visit in the `request_uri` reuse test, waiting out the ten-minute expiry, uploading the right screenshot and running one test at a time per alias. Each of these cost us a re-run once.

## How did we decide what to fix?

We held to one rule throughout. We changed code only where a specification required it, never just to satisfy the suite, and we wrote down every deliberate difference. Before anyone touched the code, every finding was put in one of these classes.

| Class | Meaning | What we did |
|---|---|---|
| real bug | a MUST in the specification or profile says otherwise | fixed, with a regression test |
| recommended | a SHOULD, or a privacy or security recommendation | fixed unless there was a written reason not to |
| config | the tool's configuration, the test environment or the tester's step | fixed the configuration or the procedure |
| expected | a variant we do not support, or a documented extension | left as is and recorded |
| decision | the specification allows it, but the tool expects another way | decided by project management in an ADR |
| suite limitation | the tool checks what no specification requires | kept the correct code, reported the issue to the tool's team |

![Triage: from a log line to a fix](/blog/openid-conformance-self-test/en/fig-triage.png)

Four findings touched closed decisions, so they went through ADRs first (0059 to 0062), and project management approved each one before the code changed. We kept one extension on purpose (`credential_reuse_policy`) and moved another into a standard shape, because a clean one existed. We could have deleted an EU-defined field to get a clean result, but we would then have had a service that passes the test and follows the standard less closely.

## What does a self-test not show?

- **It is not certification.** OpenID certification is a separate process run with the Foundation, and a separate decision for us.
- **We did not publish the plans.** Publishing a plan in the tool makes its results public, and the plan configuration holds the test private keys we gave it (the attestation signer and the mock PID's signing key). For that reason we keep the exported logs and screenshots to ourselves.
- **It covers the sandbox, two services and one variant of each.** The wallet plans need a device build, so they were not run. The verifier's mdoc variant was not run. An institution's issuer was not tested by this plan.
- **The verifier results are from before 29 October.** On 29 October we changed how Tamga Verify serves its request: every fetch of the request now gets its own request object with a fresh `state`, nonce and encryption key, and a decline closes only its own branch, so someone who sees the QR code can no longer cancel the real person's presentation with a forged decline ([ADR-0067](https://docs.tamga.network/adr/0067-per-fetch-request-branches-soft-decline)). The verifier plan has not been run again since that change, so the results above describe the earlier version.
- **It tests the protocol only.** The suite checks that messages are well formed and that the required checks are made. Whether an issuer is allowed to issue a diploma is the trust list's job, and legal recognition is the law's.

## What is in the kit?

The kit collects what a first full run teaches you, written for any OpenID4VCI issuer or OpenID4VP verifier. It names no product or host, and its examples use `example.com`.

| Part | What it does |
|---|---|
| Workflow | plan and variants, configuration, run order, browser steps and review screenshots, logs, triage, fix, re-run |
| Issuer plan reference | every OpenID4VCI module: what it checks, spec references, typical failures, fixes |
| FAPI 2.0 reference | the 40 FAPI 2.0 Security Profile modules that run inside the issuer plan |
| Verifier plan reference | every module, and how 400 versus 200 answers map to passed and review |
| Common failures | symptom → condition → cause → fix, with the class of each finding |
| Configuration templates | redacted suite JSON for both plans, field by field |
| Test PKI | an openssl recipe for a test root, attester and mock PID keys |
| Pre-flight checklist | code checks to run before the first suite run |
| Log summariser | per-module results and every failure, warning and review, without keys or account data |

The kit is packaged as a plugin for an AI coding assistant, and the install commands are in the [README](https://github.com/tamga-network/oidf-conformance-kit#install). Everything in it is also plain Markdown and a standard-library Python script, so it works without the assistant:

```bash title="Use the references and the log summariser directly"
git clone https://github.com/tamga-network/oidf-conformance-kit
cd oidf-conformance-kit
# export your plan's logs from the suite, then:
python scripts/oidf-log-summary.py ./logs --latest
python scripts/oidf-log-summary.py ./logs --latest --format markdown --redact -o summary.md
```

> **Note:** Conformance logs contain the private keys you gave the suite and the exporter's account. Keep logs and filled-in configurations out of version control. The summariser prints only allow-listed fields, and `--redact` also hides your host names.

## How can you help?

The suite changes quickly. Modules are added or renamed, and some start checking something new. We checked the module names in the kit against the suite's master branch of 26 October 2026, and they will drift over time. Three kinds of contribution help most:

- a module or condition that was added or changed, with the suite commit you checked;
- a failure you hit and fixed, with the condition name, the cause, the fix and the clause that requires it;
- a suite limitation, with the reason no specification requires the behaviour and a link to the upstream issue.

Every fix in the kit must cite a specification, and a finding whose only source is the tool goes in as a limitation. The wallet plans are not covered yet, and that is the largest gap. Issues and pull requests are welcome at [github.com/tamga-network/oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit).

## Frequently asked questions

### Is Tamga OpenID certified?

No. We ran the Foundation's test tool ourselves, on the sandbox. Certification is a separate process, and we have not applied for it.

### Why do some modules end in "review" rather than "passed"?

Because the tool cannot see a page shown to a person. When our verifier shows its result on its own page, or our server shows an error page, the tool asks for a screenshot and a human confirms it. That is the normal end of those modules.

### Did you change code just to satisfy the tool?

No. Every code change cites a clause in a specification or profile. Where the tool asked for something no specification requires, we kept our code and recorded the difference.

### Can I use the kit for an issuer or verifier that has nothing to do with Tamga?

Yes. The references are generic, and the log summariser runs on any exported logs from these two plans.

## Sources

- [OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html)
- [OpenID Foundation conformance suite](https://gitlab.com/openid/conformance-suite) and [certification](https://openid.net/certification/)
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/)
- [RFC 9449 (DPoP)](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9126 (PAR)](https://www.rfc-editor.org/rfc/rfc9126), [RFC 6749 (OAuth 2.0)](https://www.rfc-editor.org/rfc/rfc6749), [RFC 9700 (OAuth security BCP)](https://www.rfc-editor.org/rfc/rfc9700), [RFC 9901 (SD-JWT)](https://www.rfc-editor.org/rfc/rfc9901)
- [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests), [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding), [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration), [ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)
- [Tamga OpenID4VP profile](https://docs.tamga.network/specifications/openid4vp) and [OpenID4VCI profile](https://docs.tamga.network/specifications/openid4vci)
- [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0)

---
title: Add "verify with Tamga" to your website or app
slug: add-verification-to-your-site
description: Two ways to check Tamga credentials on your site or app: the hosted verifier with a page kit, or your own server with @tamga-network/verifier.
date: 2026-10-08
lang: en
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Sources: GUIDE-0001 sign-in-with-tamga 1.0.0 (hosted verifier Tamga Verify; RP assertion signed with the access-certificate key, ≤60 s, single use; POST /presentations → presentation_id, qr_payload, expires_at, status_token; page kit tamga-verifier.js, TamgaVerifier.mount, /web subpath; kit does not verify and sees no values; claims given once, 410 on second read, deleted 5 min after the result; 404 for others; pseudonym per site; passkeys; policy names agreed with Tamga; sample site in the sandbox). GUIDE-0002 verify-on-server 1.0.0 (policy → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; three outcomes; checks_performed; nonce single use; ZK: mso_mdoc_zk, WASM ~3 s desktop, native ~0.2–0.3 s, accept_unrevocable_zk, Z1, fallback to mso_mdoc; wallet-side Android prover ready, iOS pending). GUIDE-0008 register-verifier (dns_name, access certificate, scopes, WRPRC, out-of-scope warning, pseudonym not accepted without registration). SPEC-API-0001 §2–§4 (result object, AP2–AP6, policy → DCQL, claims endpoint). Code examples page: packages 0.7.4 test release on npm, stable 1.0.0 when ready. examples/01-web-login/server.ts. Sandbox guide §6 (example verifiers incl. age-zk). External: OpenID4VP 1.0, HAIP 1.0, ISO/IEC 18013-5. -->

There are two ways to add "verify with Tamga" to a website or an app. The quicker one uses Tamga's hosted verifier, Tamga Verify: you add a small page kit that shows a QR code or an "open in your wallet" button, and two short server endpoints that open the request and collect the approved fields. The other runs the whole check on your own server with the open-source `@tamga-network/verifier` package: you describe what you need in a policy, send a signed OpenID4VP request, decrypt the wallet's encrypted answer and get one of three results. Either way you first register as a verifier, so wallets know who is asking and for what.

> **Note:** The `@tamga-network/*` packages are published on npm as the 0.7.4 test release; the stable 1.0.0 comes when everything is ready. In test releases the API may change. The code below is the API of that release.

## What do you need before writing any code?

You need a verifier entry in the trust list. When a request arrives, the wallet checks who is sending it, whether that sender is registered and active, and whether the requested fields fall inside the registered scope. An unregistered site still reaches the wallet, but every field it asks for is shown with an "outside the registered scope" warning, and a pseudonym request from it is refused outright.

Registering means giving the registrar ([Register as a verifier](https://docs.tamga.network/guides/register-verifier)):

- your domain name, which becomes your permanent identity;
- a certificate signing request for the key you will sign requests with (the key stays with you); your client identifier is derived from the resulting access certificate;
- one **scope** per intended use: a purpose in plain words, one credential type and the fewest fields that purpose needs, plus a privacy policy link;
- the EU common registration data: trade name, official identifier, address, contact, data protection authority.

A shop that offers a student discount, for example, asks only for `is_enrolled` from the student credential. It has no need for the name, the school or the student number, and when scopes stay that narrow the wallet's consent screen stays short.

You can try everything in the sandbox before you register. [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) has example verifiers for sign-in, age, diploma, student discount and event gates, and a working sample site at [/sample-site](https://verify.sandbox.tamga.network/sample-site).

## Which path should you choose?

![Hosted verifier or your own server: package, who verifies, where the values go, who keeps the lists](/blog/add-verification-to-your-site/en/fig-iki-yol.png)

The hosted verifier suits sign-up and sign-in pages and teams that want to start quickly. Organisations that do not want credential values to pass through any intermediary, or that already run verification-heavy infrastructure, usually verify on their own server. Both paths run the same verification pipeline, and the reference verifier at `verify.tamga.network` is built on the same library you would install.

## How does the hosted verifier work?

The process has four steps, and the credential values reach only your server:

1. **Your server opens a presentation.** It calls the verifier with a policy name and attaches a short-lived statement signed with the key of your access certificate. The statement is valid for at most 60 seconds and can be used once, so no separate password is needed.
2. **The page shows the request.** A person on a computer sees a QR code, and a person on a phone sees an "open in your wallet" button. The wallet shows only the requested fields, and the person approves.
3. **The verifier checks the credential.** It checks the signature, the trust list, revocation and whether the credential is bound to the person presenting it, and the page kit learns the outcome.
4. **Your server collects the result.** If the credential was accepted, it also collects the approved fields, once.

```http title="Opening a presentation at the hosted verifier"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <statement signed with your access-certificate key>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

The answer carries `presentation_id`, `qr_payload`, `expires_at` and a `status_token`, which your server passes to the page. The page kit is served by the verifier:

```html title="The page kit on your sign-up page"
<script src="https://verify.tamga.network/tamga-verifier.js"></script>
<div id="tamga"></div>
<script>
  TamgaVerifier.mount(document.getElementById("tamga"), {
    verifier: "https://verify.tamga.network",
    policy: "site-signup",
    start: () => fetch("/tamga/start", { method: "POST" }).then((r) => r.json()),
    onResult: (presentationId) =>
      fetch("/tamga/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ presentation_id: presentationId }),
      }).then(() => location.reload()),
  });
</script>
```

The kit does not verify anything and never sees a value. It only watches the state of the presentation and leaves the decision to your server:

```ts title="Your server: read the result, then the approved fields"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "try again", not "rejected"

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // values are handed out once
const { claims } = await res.json(); // e.g. claims.pseudonym, claims.given_name
```

Only the site that opened a presentation can read its result, and anyone else gets `404`. The values are given once and deleted five minutes after the result, so process them straight away. On the hosted verifier, policy names and their field sets are agreed with the network (an over-18 check, for example, uses only the `age_over_18` field). The full walk-through, including passkeys after sign-up, is in [Add "Sign in with Tamga"](https://docs.tamga.network/guides/sign-in-with-tamga).

## How do you verify on your own server?

You use the `@tamga-network/verifier` and `@tamga-network/trust` packages. Before the first request, load the trust lists through `TrustSource` ([how the lists are checked](/blog/how-trust-lists-work)) and start prefetching revocation lists on a timer, because nothing should be downloaded at the moment of a check. Then you build the request, decrypt the answer and verify the presentation:

```ts title="Your own server: request, decrypt, verify"
import { dcqlFromPolicy, createPresentationRequest, decryptResponse, verifyPresentation,
         pemRpSigner, PrefetchStatusCache, type Policy } from "@tamga-network/verifier";

const signer = await pemRpSigner(RP_KEY_PEM, RP_CERT_PEM); // client_id comes from the certificate
const req = await createPresentationRequest({ signer, dcql: dcqlFromPolicy(policy),
  responseUri: "https://shop.example.com/vp/response", requestUriBase: "https://shop.example.com/vp/req",
  registrationCert: WRPRC_JWT }); // your registration certificate (trust.tamga.network/wrprc/); since 0.7.0 wallets refuse requests without one
// req.qrPayload → QR code or deep link; it carries no personal data

// the wallet POSTs an encrypted answer to responseUri
const answer = await decryptResponse(jweBody, req.encPrivateKey);
const { result, claims } = await verifyPresentation({ presentation: answer.vp_token["student"][0],
  aud: signer.clientId, nonce: req.nonce, policy, policyCredentialId: "student",
  trust, statusCache, rootCertsDer, rp: trust.relyingParty(signer.clientId) });
```

`verifyPresentation` always runs the same numbered steps in the same order. It checks format and signature (A), credential type (B), trust (C) and revocation (D), and then applies your own policy (E). The steps are listed in the [verification API](https://docs.tamga.network/specifications/verification-api). A tested, runnable version of this code is among the [code examples](https://docs.tamga.network/guides/code-examples), and the full walk-through is in [Verify on your server](https://docs.tamga.network/guides/verify-on-server).

## What is a policy, and why is it not code?

A policy names what you need, meaning the credential type, the fields, the assurance level and how fresh the lists must be. The request the wallet sees (a DCQL query) is generated from the policy and is never written by hand. Asking for more therefore takes a policy change rather than a code change, and a policy can never ask beyond the scope in your registration (rule AP6). How the request and the encrypted answer are built is in the [OpenID4VP and DCQL deep dive](/blog/openid4vp-dcql-deep-dive).

## How do you read the result?

![Three results, what each means and what to tell the user](/blog/add-verification-to-your-site/en/fig-sonuclar.png)

The third result needs the most care. `INDETERMINATE` means the verifier could not complete the check at that moment, for example because a list could not be fetched or is too old. The credential itself may be perfectly valid. Show "cannot be verified right now, please try again" and never put it in the same bucket as `REJECTED` (rule AP2). The difference between "this diploma is fake" and "I cannot check right now" can decide whether someone gets hired.

The result object lists the checks performed and skipped. You may keep it for audit, because it carries field names and never values. Do not log personal data, including names and keys.

## Can you check age without seeing a date of birth?

Yes. It is live on Tamga Verify as the `age-over-18-zk` policy. A policy in the `mso_mdoc_zk` format asks the wallet for a zero-knowledge proof. The wallet proves that the identity credential of a registered institution says `age_over_18 = true`, and you learn nothing else. You do not see the credential, the date of birth, the institution's signature or the device key, and two proofs from the same person cannot be linked ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

A few practical points from the guide:

- Verification runs on the bundled WebAssembly and takes about 3 seconds per proof on a desktop. For high volume, a native build brings that down to about 0.2 to 0.3 seconds.
- Only circuits listed in the signed trust list are accepted.
- A ZK presentation carries no revocation index, so the policy must say `accept_unrevocable_zk: true` explicitly. If you need a revocation check, use the classic `mso_mdoc` policy.
- On the wallet side, the Android proving library is ready and iOS is still pending. If your policy allows it, a wallet that cannot produce a proof falls back to the classic mdoc check, which also discloses only `age_over_18`. We recommend offering both.

The sandbox's `age-zk` example verifier shows the whole process end to end. Circuits, the role of the trust list and the limits of the method are covered in [Zero-knowledge in Tamga](/blog/zero-knowledge-in-tamga).

## Frequently asked questions

### Does my site see the person's whole credential?

No. Your site receives only the fields the person approved, and those fields must sit inside your registered scope. With a zero-knowledge policy it receives only a yes or a no.

### Can the issuing institution see that we checked a credential?

No. Revocation lists are fetched in advance and cached, so no request goes to the institution or to the network at the moment of a check.

### Does it work only with Tamga Wallet?

No. Any wallet whose provider is listed in the trust list and follows the network's wallet rules can answer your request.

### What should we store after a sign-in?

An account key is enough, and you do not need to keep personal data. The sample site stores a keyed hash of the site-specific pseudonym. Another site sees a different pseudonym for the same person, so it cannot match that hash.

### Can we test without registering?

Yes, in the sandbox. Its example verifiers and sample site work with credentials from the sandbox's example institutions. To verify real credentials, you need to be a registered verifier on the real network.

## Sources

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (open-source proof system)](https://github.com/google/longfellow-zk)
- [Tamga Network: Add "Sign in with Tamga"](https://docs.tamga.network/guides/sign-in-with-tamga) · [Verify on your server](https://docs.tamga.network/guides/verify-on-server) · [Register as a verifier](https://docs.tamga.network/guides/register-verifier)
- [Code examples](https://docs.tamga.network/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/packages/verifier) · [API reference](https://docs.tamga.network/api/)
- [SDKs](/sdk) · [Joining as a verifier](/learn/join-as-verifier)

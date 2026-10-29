// Tamga Network — Whitepaper v1.0 (en). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-en.typ ../public/whitepaper-en.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "en",
  title: [A Digital Trust Infrastructure \ for Türkiye and the Turkic World],
  subtitle: [A sovereign reference architecture on the EU’s EUDI profiles. Institutions hold X.509 certificates, trust rests on signed lists today, and a permissioned ledger is added once independent operators join.],
  labels: (abstract: "Executive summary", contents: "Contents", version: "WHITEPAPER · VERSION 1.0"),
  date: "2026-10-29",
  edition: "Revised edition · first published 2026-10-03",
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network is a digital trust infrastructure. An institution issues a document, such as a diploma, a student card, an identity credential or a ticket, straight into a person’s phone. The person shares only the fields a verifier asks for, and the verifier checks them in seconds without calling the institution.

    The technical layer is the European Union’s, unchanged: SD-JWT VC and ISO 18013-5 mdoc credentials, OpenID4VCI and OpenID4VP, X.509 certificates for institutions and signed trust lists in the ETSI model. Tamga adds a governance layer written for the Turkic world. Every list, identifier and role has a slot for each member state, and Tamga holds the operator’s role only provisionally, on their behalf, until a state takes it over.

    Trust today rests on versioned, hash-chained trust lists with a public anchor log. The code for a permissioned Besu/QBFT ledger is written and tested, but the ledger only mirrors the signed lists and stays switched off until at least two independent operators run it together. No personal data, not even a hash, is written to lists, logs or ledger. The services run end to end with real cryptography, the open packages are on npm as test releases, and in October 2026 the issuer and the verifier ran the OpenID Foundation’s conformance test plans as a self-test and finished with no failed module; the verifier has changed since, and its plan is to be run again. This document says what works, what is planned and what is still research.

  ],
)

= The problem: the end of the document copy

For decades people proved who they were by handing over copies. A copy of the diploma goes to the employer, a copy of the ID card goes to the bank, and each copy then lives on a server its owner never sees again. Every bank, employer and university builds the same verification over and over, and whether a document is genuine comes down to how convincing the copy looks.

The new model turns this around. The document stays with the person, only the proof that is needed is shared, and the verifier checks a cryptographic signature instead of asking the source. The rest of this document explains how Tamga builds that model for Türkiye and the Turkic world; the background is in #link("https://tamga.network/en/learn/paper-to-digital")[why a new model].

= Vision: from eIDAS 2.0 to the Turkic world

With eIDAS 2.0, every EU member state must offer its citizens a European Digital Identity Wallet. The architecture behind it, the ARF, and the profiles it fixes are becoming the common language of digital trust well beyond the EU, because wallets, issuers and verifiers built on them can talk to each other.

The Turkic world shares a language family, a culture and much history. A diploma issued in one state should be verifiable in another, and an institution’s identity should be trusted across the border. Tamga builds that shared ground on the same standards, with a governance layer that keeps every state sovereign over its own registry.

Tamga is built in three layers, and each stands on its own. At the base, credentials, protocols and trust lists follow the EU standards, so a compatible wallet or verifier from elsewhere can work with a Tamga institution. Above that, Tamga Network is a light federation: it collects each state’s trust list and lets states recognise one another. Today Tamga publishes Türkiye’s list provisionally; when a state publishes its own, the network points to it. On top of the network run the wallets and services that follow its rules. The network runs no wallet of its own. It lists wallet providers in its trust list, and any provider that follows the published rules can be listed. The first listed wallet is Tamga Wallet, a separate product with its own provider service, and its record has been active in the list since 14 October 2026. Tamga Wallet is EU-compatible; the title “EUDI Wallet” is reserved for wallets an EU member state provides or recognises. The network sells nothing. It runs the rules, the trust lists, the open code and reference services such as the Institution Console and Tamga Verify, while commercial services are offered by companies outside the network.

= Principles

- *Sovereignty first.* Each state is the only writer of its own registry; network membership is decided by a two-thirds vote; cross-border recognition is a unilateral decision of each state.
- *No personal data in any shared record.* Lists, logs and ledger carry no personal data, not even a hash.
- *Compatible but independent.* The EU’s technical layer is used as it is; the governance layer is written for the Turkic world.
- *Built for many states.* No identifier, role or data structure assumes that Tamga is the only operator. Tamga is always the provisional stand-in, on the record.
- *A ledger is a choice of signers, not of storage.* Signed lists today; a ledger once independent operators sign together.
- *Holder binding without exception.* Every credential copy is bound to a key on the person’s device, so a copy cannot be replayed.
- *Designed to be handed over.* Every provisional power has a measurable handover point, and the handover of the network’s operation to a foundation is already scripted and rehearsed.

= Roles

Every role of the EU architecture exists in Tamga. Where a state has not yet joined, Tamga holds the role provisionally and on the record: trusted-list operator, registrar and the “TR National Root CA (provisional operator: Tamga)”. Institutions are attestation providers. Employers, websites and gates are registered relying parties, each with an access certificate that names the organisation and a support contact, following the ETSI TS 119 411-8 profile. The PID-provider slot stays empty until a state fills it. Until then an identity credential comes from Tamga’s identity service, which verifies the person’s identity document and liveness; this credential is an attestation rather than a state PID and will be superseded when a state’s PID arrives. The network does not pick wallets, it lists them. Each wallet runs its own wallet provider, which registers the wallet units and issues the wallet and key attestations, and the network runs none. Today the Türkiye list has one active issuer, the provisional identity service; the test institutions used in the demos have been revoked, and the first real institution is being prepared. There are no validator operators yet, so there is no ledger. A side-by-side table is in #link("https://tamga.network/en/learn/roles")[roles and terms].

#chapter()
= Trust model: signed trust lists

A signature proves who signed. A trust list says whether that signer is a real institution, which document types it may issue, since when, and what its current status is. Tamga’s lists are signed JWS files, versioned and hash-chained, so every version points to the one before it. No version is ever deleted and each carries a next-update date. A verifier checks the list’s signer against a root fingerprint published out of band. Every list version, every revocation-list publication and every schema change is also written, at least hourly, to a public anchor log, so a list that has been rolled back can be detected. Details are in #link("https://tamga.network/en/learn/trust-lists")[trust lists].

#kvtable("Published files — trust.tamga.network", (("lotl.jws", "list of lists: national lists, external lists, schemas, wallet providers, accepted ZK circuits"), ("tl-tr.jws", "Türkiye: root CAs, issuers with their authorizations, relying parties, wallet providers"), ("tl-<cc>.jws", "a reserved slot for every other member state (AZ, KZ, KG, UZ) and for the observers (HU, TM); only TR is active today"), ("anchors.jsonl", "anchor log: one signed line per event, at least hourly"), ("keys/", "root fingerprints (the out-of-band trust anchor)"), ("archive/", "every past version, never deleted"),), mono: false)

Identifiers are derived from certificates and type names rather than assigned by hand, so they survive a handover and the arrival of a ledger unchanged:

#kvtable("Identifiers", (("ca_id", "keccak256(state_code ‖ SHA-256(root certificate))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(issuer certificate))"), ("vct", "urn:tamga:<domain>:<Type>:<major>, e.g. urn:tamga:edu:DiplomaCredential:1 (network type)"), ("vct (national)", "urn:tamga:<cc>:<domain>:<Type>:<major>, registered by one state in its own namespace"), ("schema_id", "keccak256(vct)"), ("person", "no identifier; a device key per credential copy"),), mono: true)

*Federation.* The list of lists can also point to a list that another operator publishes: a state, an institution it authorises, or the EU. For each such list it records the address, a signer pinned in Tamga’s own signed list of lists, and a scope saying which roles and document types the list may vouch for. The list stays with its owner. When a state publishes its own list, wallets and verifiers see only the address and the signer change. The first external format read is ETSI TS 119 602, so a Tamga verifier can also recognise the EU identity credential (PID) and the mobile driving licence (mDL). No external list is in the list of lists today; each one is added with an approval on the record. The sandbox also publishes its Türkiye list as an ETSI TS 119 612 XML view, signed and with the same version as the signed list; the real network’s XML list follows once the foundation that will operate the list exists. See #link("https://tamga.network/en/learn/federation")[federation].

= Credentials: SD-JWT VC and mdoc

The main format is SD-JWT VC (IETF, #raw("dc+sd-jwt"), ES256). Each field is hidden behind a salted hash and revealed only with the holder’s approval. The header carries the institution’s X.509 chain, and #raw("cnf") binds the copy to a key on the device. The identity credential is also issued as an ISO 18013-5 mdoc with the same holder key, so a browser or an age gate that only understands mdoc can use it. Both forms carry the age flags #raw("age_over_15") and #raw("age_over_18"), derived from the birth date at issuance; a verifier that asks for one of them gets a yes or a no and nothing else. The set of age thresholds is closed and changes only by a recorded decision. Document types are stable URNs. Their definitions sit in a public catalogue and every credential carries a hash of its definition, so a wallet can tell when a definition has changed. A national type that a member state registers uses its own namespace, #raw("urn:tamga:<cc>:…"), so a national name can never collide with a network-wide one. See #link("https://tamga.network/en/learn/verifiable-credentials")[credentials].

#codeblock("An SD-JWT VC diploma (decoded, shortened)", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-…\",
  \"iat\": 1790000000,
  \"cnf\": { \"jwk\": { … } },
  \"status\": { \"status_list\": {
    \"idx\": 48213,
    \"uri\": \"https://status.tamga.network/…\" } },
  \"_sd\": [ \"…\", \"…\" ]
}")

#kvtable("", (("cnf.jwk", "device key of this copy"), ("_sd", "hidden fields, as salted hashes"), ("header · x5c", "the institution's X.509 certificate chain"),), mono: false)

The national ID number appears only in the identity credential, and only as a selectively disclosed field. No diploma, card or ticket carries it.

= Issuing and presenting

- *Issuance (OpenID4VCI).* The institution shows a QR code and a PIN on the same screen; the PIN never travels inside the link. Alternatively the wallet starts from the institution directory and first proves the person’s identity by presenting the identity credential. The wallet receives ten copies, each bound to a different device key. An access token may be used for several credential requests within its five-minute lifetime, but only for the configurations it covers, for ten copies in total and always with the same DPoP key.
- *Genuine wallets only.* Before issuing, the institution checks a short-lived wallet instance attestation and a key attestation from the wallet provider. Both come from a provider listed in the trust list, carry their own revocation entry, and tell the issuer how the key is stored.
- *Presentation (OpenID4VP, DCQL).* The verifier’s request is signed with its registered certificate and carries its registration certificate. The wallet checks both against the trust list, shows exactly what is asked and warns about anything beyond the verifier’s registered scope. Where the verifier offers alternatives (#raw("credential_sets"), #raw("claim_sets")), the wallet shows them as options. A credential missing a requested field is never sent, and the wallet tells the person why a request cannot be met. The answer is encrypted and carries only the approved fields and a proof that the key is on this phone. Every fetch of the request gets its own request object with fresh values and a decline closes only that one, so someone who sees the QR code cannot cancel the person’s presentation with a forged decline. The registration certificate names its policy and points to a status list; the wallet refuses a revoked certificate and warns the person when the status cannot be checked.
- *From the browser.* A website can ask for a credential through the browser’s Digital Credentials API instead of a QR code. The reference verifier offers it, and the wallet core answers the ISO/IEC 18013-7 Annex C request for an mdoc. In Tamga Wallet the Android module is written but has not yet been tried on a device, and there is no iOS version yet.
- *Websites.* A site signs a person up once with the wallet, under a pseudonym that belongs to that site alone. The wallet derives the pseudonym from the site’s registered domain, so two sites cannot match a person, a renewed certificate does not change it, and the same pseudonyms return on a new phone after the identity check. Daily sign-in then uses a passkey and shares no fields. See #link("https://tamga.network/en/learn/unlinkability")[sign in with Tamga].

= Verification: five steps, three outcomes

Every verification runs the same pipeline in the same order and stops at the first failure. Each step has a permanent code, so a rejection always says why.

#kvtable("Verification pipeline", (("T0", "request and answer belong together (nonce, audience, encryption)"), ("A · format", "signature, certificate chain, device proof, hidden fields intact"), ("B · type", "document type registered; definition hash matches the catalogue"), ("C · trust", "issuer authorized for this type on the issue date; category matches"), ("D · status", "not revoked or suspended; list fresh and anchored"), ("E · policy", "requested fields present; nothing beyond the verifier's scope"), ("→ outcome", "ACCEPTED · REJECTED (with the failing step) · INDETERMINATE (could not check)"),), mono: false)

INDETERMINATE is never reported as REJECTED. If a list cannot be reached or is out of date, the verifier says that it could not check right now, because the difference between “this diploma is fake” and “I cannot check” can decide whether someone is hired. Authorization is judged on the issue date: a diploma issued while a university was active stays valid after the university is suspended, while new issuance stops at once.

In October 2026 the identity service and Tamga Verify ran the OpenID Foundation’s conformance test plans on the sandbox: OpenID4VCI with HAIP and FAPI 2.0 (63 modules) and OpenID4VP with HAIP (14 modules). The last issuer run ended with no failed module and the last verifier run with no failed module and no warning. That verifier run predates 29 October, when the request handling changed (each fetch now gets its own request); the plan has not been run again since. About twenty changes came out of it, each tied to a clause in a specification, and four of them changed earlier decisions through recorded ADRs. This was a self-test with the Foundation’s own tool; certification is a separate process. What a first run teaches is published as the open-source #link("https://github.com/tamga-network/oidf-conformance-kit")[oidf-conformance-kit], and the full account is in the #link("https://tamga.network/en/blog/openid-conformance-self-test")[blog].

= Revocation and lifecycle

Revocation uses the IETF Token Status List. Each credential copy has a status entry at a random position in a list. The identity service’s lists use one bit per entry, so a credential is valid or revoked and never suspended. Institution lists use two bits, and the suspended value appears only where the type’s schema allows suspension, which today is the diploma. The issuer publishes at a fixed interval rather than on demand, so timing reveals nothing about a person, and each publication is anchored. Verifiers fetch the lists in advance, so checking a credential makes no call to the issuer or to the phone. Lists are republished every 2 minutes and each stays valid for 6 hours: while the status server is up, a revocation reaches verifiers within minutes, and a short outage does not stop verification.

Copies run out by design. When a credential comes with a refresh token, the wallet renews its copies in the background at the threshold the issuer announces, and a renewal shares nothing new. The refresh token is bound to the wallet instance’s attestation key rather than to a single transport key, as the OAuth attestation profile requires, so the wallet can rotate its DPoP keys and still renew. Credentials that are renewed by presenting the identity credential need the person’s approval and PIN. See #link("https://tamga.network/en/learn/revocation")[revocation].

#chapter()
= Privacy by design

- *Per-verifier copies.* Each verifier receives a different copy bound to a different key, so verifiers cannot link a person by comparing what they received. Issuance and expiry times are rounded to the hour, so copies cannot be linked by timestamp either.
- *Selective disclosure* by default, and yes/no flags such as #raw("age_over_15") and #raw("age_over_18") where a question can be answered without the underlying data.
- *Identity checks are isolated.* Only the identity service talks to the identity-verification provider. After issuing it keeps no photos, only an opaque record (a subject reference and a hash of the document number). Institutions match a person through the identity credential, never through the provider.
- *No personal data in logs or public addresses.* Revocation-list addresses never encode the institution; logs record what happened, never to whom.
- *Websites* get a pseudonym per site as the account key. Neither the identity-document number nor its hash is ever sent, and the seed the pseudonyms derive from reaches the wallet as a credential of its own and is never stored on the server.

#notebox[A residual risk, stated openly: an issuer colluding with several verifiers could still link a person through the signatures it issued. Zero-knowledge presentation closes this gap; on the wallet side it follows the store release (see the section on zero-knowledge proofs).]

= Close range: passes and age checks

For turnstiles and event gates Tamga uses a pass. The person registers once with a standard presentation; afterwards the wallet shows a signed 60-second token as a QR code. The token carries no personal data, replay is rejected, and a ticket can be single-use. Since October 2026 each gate identifies itself to the verification service with a terminal key issued by the operator, so someone who photographs a QR code cannot spend the ticket before its owner reaches the gate. Gates belong to groups published in the trust list, each naming the institution that runs them and the passes they may accept; a gate whose group leaves the list, or whose list is out of date, is refused. For a person-to-person check the roles are reversed: the wallet shows a short-lived request address and the checker’s app starts a standard OpenID4VP request. Both are versioned bridges. The target is ISO 18013-5 over Bluetooth and NFC; the Bluetooth path is coded in the wallet and waits for device tests.

#chapter()
= From lists to a ledger

A ledger adds something only when several independent parties run it. Tamga therefore starts with lists and will add a permissioned Hyperledger Besu network with QBFT consensus only once at least two independent validator operators agree in writing. The contracts for that network are written, compiled and tested, and the list publisher can already submit list digests to a local development chain. By decision, the chain is a projection of the signed lists: it records only the digest of each list version (version, content hash, previous hash, publication time) and the digest of the anchor log’s last line. It holds no content, no registration, no credential and no personal data. A digest counts as confirmed only when the threshold of independent writers has submitted the same value, and if writers disagree about a version, the conflict is recorded instead of being locked in by whoever came first. The chain’s answer is never required for verification, and where it disagrees with the signed list, the list wins. In production the feature stays switched off until a second independent operator exists.

Governance on the ledger follows the principles. Validators are states with equal votes; new members join by a two-thirds vote; each state alone registers or suspends its own institutions, and each decides for itself which foreign institutions it recognises. A protocol upgrade waits at least seven days after it reaches the threshold, so a state that disagrees can leave before it takes effect. National schema names live in their own namespace, an institution can anchor only to its own state’s root certificate, and the ledger’s status-list registry accepts each list with its own bit width. Before the switch, the list history is replayed into the contracts and both must give the same answers. Components read trust through one interface, so credentials, wallets and the verification pipeline do not change. See #link("https://tamga.network/en/learn/what-is-blockchain")[what blockchain is, and is not].

= Zero-knowledge proofs and research directions

*Zero-knowledge presentation (decided and partly built).* The wallet proves a statement such as “over 18” or “over 15” about an unchanged, issuer-signed mdoc with the open-source Longfellow ZK system, which the EU’s age-verification work also builds on. The verifier learns only that the statement is true and which institution issued the credential, and two presentations cannot be linked. Only reviewed circuits whose identifiers are published in the signed trust list are accepted. Because the proof reveals no status-list index, revocation cannot be checked inside it; the proof is therefore made over a short-lived copy valid for at most 24 hours, which the identity service stops renewing once the credential is revoked. The verifier side is live. The native prover is compiled for Android and real proofs have been tested with a desktop prover; proof generation on the phone follows the store release, and where a proof is not possible the ordinary presentation continues. See #link("https://tamga.network/en/learn/zero-knowledge-proofs")[zero-knowledge proofs].

*Research direction: the value layer.* Authorization between verified parties, with settlement staying on regulated rails. It is not part of the first release or the pilot and will pass an independent security review before any use.

#chapter()
= Status and roadmap

*Working today (first release, real cryptography):* issuance and presentation of diplomas and student cards; revocation and institution suspension; identity check and identity credential, also as mdoc, with two age flags; campus and event passes with authenticated gates and single-use tickets; website sign-up with a per-site pseudonym and passkey sign-in; zero-knowledge age proofs on the verifier side; a hosted issuing service in which the institution’s signing key stays at the institution and the service sends it only a hash to sign (Cloud Signature Consortium API). Nine open-source packages are on npm as the 0.7.4 test release, which adds the protection against forged declines, registration-certificate status, gate groups in the trust list and the ETSI XML list view. The real network’s Türkiye list is live with the identity service as its only active issuer; the first real institution, a university, is being prepared.

#kvtable("Phases", (("List stage (today)", "signed trust lists and anchor log · Tamga as provisional operator · sandbox live · packages on npm as test releases · OpenID self-test done"), ("Pilot", "the first issuing institution is a university · the institution's key stays at the institution (remote signing) · wallets in the app stores · Bluetooth and the Digital Credentials API on real phones · lists, no ledger"), ("Handover", "the network's operation passes to a foundation; the step is scripted and rehearsed · identifiers do not change"), ("Phase 0", "permissioned Besu/QBFT ledger once at least 2 independent validator operators sign · the contracts are written and tested; the chain mirrors the signed lists"), ("Phase 1", "member-state lists · close range over NFC with reader authentication"),), mono: false)

The known limits of the first release are recorded below and are closed before the pilot. The pilot’s success and stop criteria are defined in advance. Tamga Wallet, the first listed wallet, is in an Android test build; the store releases and the device tests for Bluetooth and the Digital Credentials API are the next steps on the wallet side, and they are the wallet’s work rather than the network’s.

A separate test network, sandbox.tamga.network, has been live since October 2026: its own test root and lists, sample institutions, fake people and sample credentials of every type, an optional real identity check with daily and monthly caps next to the quick test, test institution accounts and a demo gate with its own terminal keys. No wallet or verifier on the real network trusts it. Wallet, institution and verifier developers all test there; a wallet developer registers their own wallet provider in the sandbox list and tries the wallet against the sample institutions, the identity service and the verifier. The OpenID self-test also ran there, with the test tool’s certificates added to the sandbox lists only. See the #link("https://docs.tamga.network/guides/sandbox")[sandbox guide].

= Known limits

- In this phase the trust anchor rests on one operator’s signature. The public anchor log, the transparency report and audits deter misuse; they cannot make it impossible. Only a second independent list writer, and later the ledger, removes this limit.
- While the status server is up, a revocation takes effect within a few minutes (the 2-minute publication interval plus the verifier’s prefetch interval).
- A credential presented with a zero-knowledge proof cannot be checked for revocation inside the proof. The short-lived copy limits the exposure to 24 hours; it does not remove it.
- Issuer linkability remains until zero-knowledge presentation reaches the wallet.
- The identity service could in theory compute a person’s pseudonym at a given site. Key protection, a separately configured seed and audit limit this; zero-knowledge proofs will remove it.
- Until a wallet is in the app stores, a phone’s own claim of secure hardware is not accepted. From a wallet’s store release, App Attest and Play Integrity become mandatory.
- The OpenID conformance run was a self-test on the sandbox, for one variant of each plan. Certification is a separate process, and the wallet plans need a device build, so they have not been run. The verifier plan ran before the request handling changed on 29 October and has to be run again.
- The hosted issuing service’s remote-signing path is implemented and tested, but no institution uses it on the real network yet; the real network refuses an institution key kept in a file.

= Rules, open source and further reading

The network’s rules are published as the Tamga ARF 1.0: the main document, the Trust Framework, the Tamga Rulebook and the rulebooks that branch from it for each document type (Education, Identity and Event Ticket) at #link("https://arf.tamga.network")[arf.tamga.network]. See also #link("https://tamga.network/en/learn/rules-and-rulebooks")[rules and rulebooks].

Code is Apache-2.0 and documentation CC BY 4.0. The packages #raw("@tamga-network/*") cover trust lists, credential formats, issuing, verification, zero-knowledge proofs and the wallet core. Integration guides and specifications are in the #link("https://docs.tamga.network")[developer documentation], and every decision this document refers to is published there as an ADR. Concepts are explained from scratch in #link("https://tamga.network/en/learn")[Learn]; the #link("https://docs.tamga.network/glossary")[glossary] is a quick reference and the #link("https://tamga.network/en/manifesto")[manifesto] gives the why.

#notebox[This is a living document. It stays at version 1.0 until the public announcement and is revised in place as decisions mature; this edition is dated 29 October 2026, and the first was published on 3 October 2026. The trust model is what stays.]

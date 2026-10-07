// Tamga Network — Whitepaper v1.0 (en). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-en.typ ../public/whitepaper-en.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "en",
  title: [A Digital Trust Infrastructure \ for Türkiye and the Turkic World],
  subtitle: [A sovereign reference architecture on the EU’s EUDI profiles — X.509 institutions, signed trust lists today, a permissioned ledger when independent operators join.],
  labels: (abstract: "Executive summary", contents: "Contents", version: "WHITEPAPER · VERSION 1.0"),
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network is a *Digital Trust Infrastructure*: institutions issue documents — diplomas, student cards, identity credentials, tickets — into a person’s phone, the person shares only the fields a verifier needs, and the verifier checks them in seconds without contacting the issuer.

    Tamga keeps the EU’s technical layer unchanged: *SD-JWT VC* and *ISO 18013-5 mdoc* credentials, *OpenID4VCI/VP*, *X.509* institutions and *signed trust lists* in the ETSI model. Its own layer is governance for the Turkic world: every structure has a slot for each member state, and Tamga acts only as a provisional operator on their behalf.

    Trust is anchored today in versioned, hash-chained trust lists with a public anchor log; a permissioned *Besu/QBFT* ledger is added only when at least two independent operators join. No personal data — not even a hash — is written to lists, logs or ledger. The full flow runs end to end today with real cryptography; this document says what works, what is planned and what is still research.

  ],
)

= The problem: the end of the “document copy”

For decades people proved who they are by handing over copies. Copies pile up on servers and slip out of control; every bank, employer and university rebuilds the same verification; and authenticity is left to how convincing a copy looks.

The new model reverses this: the document stays with the person, only the necessary proof is shared, and verification is cryptographic — without asking the source. See #link("https://tamga.network/en/learn/paper-to-digital")[why a new model].

= Vision: from eIDAS 2.0 to the Turkic world

With *eIDAS 2.0* every EU member state must offer its citizens a *European Digital Identity Wallet*. Its architecture (the ARF) and profiles are becoming the de-facto standard for digital trust.

The Turkic world shares language, culture and history. A diploma issued in one state should be verifiable in another; an institution’s identity should be trusted across borders. Tamga builds that shared foundation on the same standards, with governance that keeps every state sovereign.

Tamga is built in three layers that each stand on their own. The base: credentials, protocols and trust lists follow the EU standards, so compatible wallets and verifiers can work with Tamga institutions. Above it, *Tamga Network* is a light federation that collects each state’s trust list and lets states recognise one another — today Tamga publishes Türkiye’s list provisionally, and when a state publishes its own, the network points to it. On that base run *Tamga Wallet*, the network’s first wallet and a separate product (EU-compatible; “EUDI Wallet” is a title reserved for wallets an EU member state provides or recognises), and service providers that follow the network’s rules; they are not part of the network but its participants. The network sells nothing: it runs the rules, the trust lists, open code and reference services such as the Institution Console and Tamga Verify; commercial services are offered by companies outside the network.

= Principles

- *Sovereignty first* — each state is the only writer of its own registry; network membership by a 2/3 vote; cross-border recognition decided unilaterally.
- *No personal data in any shared record* — not in lists, logs or ledger; not even a hash.
- *Compatible but independent* — the EU’s technical layer as it is; the governance layer written for the Turkic world.
- *Built for many states* — no identifier or role assumes Tamga as the only operator; Tamga is always the provisional stand-in.
- *A ledger is a choice of signers, not of storage* — lists today; a ledger when independent operators join.
- *Holder binding without exception* — every credential copy is bound to a key on the device; a copy cannot be replayed.
- *Designed to be handed over* — every provisional power has a measurable handover point.

= Roles

Every role of the EU architecture exists in Tamga. Where a state has not joined, Tamga holds the role provisionally and on the record: trusted-list operator, registrar and the “TR National Root CA (provisional operator: Tamga)”. Institutions are attestation providers; employers, websites and gates are registered relying parties. The PID-provider slot is empty until a state fills it; meanwhile an identity credential comes from Tamga’s identity service (document and liveness check). The network does not pick wallets, it recognises them: any wallet provider that follows the published rules and passes the conformance tests can be listed; the first is Tamga Wallet. Each wallet runs its own wallet provider; the network runs none. There are no validator operators yet — hence no ledger. Side-by-side: #link("https://tamga.network/en/learn/roles")[roles and terms].

#chapter()
= Trust model: signed trust lists

A signature proves who signed; a *trust list* says whether that signer is a real institution, which document types it may issue, since when, and its current status. Lists are signed JWS files, *versioned and hash-chained*, never deleted, and carry a next-update date; verifiers check the signer against a root fingerprint published out of band. Every revocation-list publication and schema change is also written, at least hourly, to a public *anchor log*, so a rolled-back list can be detected. Details: #link("https://tamga.network/en/learn/trust-lists")[trust lists].

#kvtable("Published files — trust.tamga.network", (("lotl.jws", "list of lists — national lists, external lists, schemas, wallet providers, accepted ZK circuits"), ("tl-tr.jws", "Türkiye — root CAs, issuers (+ authorizations), relying parties"), ("tl-az · kz · kg · uz", "reserved slots for the other member states"), ("anchors.jsonl", "anchor log — one signed line per event, at least hourly"), ("keys/", "root fingerprints (the out-of-band trust anchor)"), ("archive/", "every past version, never deleted"),), mono: false)

Identifiers are derived, not assigned, and do not change on handover or when the ledger arrives:

#kvtable("Identifiers", (("ca_id", "keccak256(state_code ‖ SHA-256(root certificate))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(issuer certificate))"), ("vct", "urn:tamga:<domain>:<Type>:<major> — e.g. urn:tamga:edu:DiplomaCredential:1"), ("schema_id", "keccak256(vct)"), ("person", "no identifier — a device key per credential copy"),), mono: true)

*Federation.* The list of lists can also point to a list published by another operator — a state, an institution it authorises, or the EU: its address, a signer pinned in Tamga’s signed list of lists, and a scope saying which roles and document types it may vouch for. The list stays with its owner; when a state publishes its own list, wallets and verifiers see only the address and the signer change. The first format read is ETSI TS 119 602, so verifiers can also recognise the EU identity credential (PID) and the mobile driving licence (mDL). No external list is in the list of lists today; each one is added only with an approval on the record. See #link("https://tamga.network/en/learn/federation")[federation].

= Credentials: SD-JWT VC and mdoc

The main format is *SD-JWT VC* (IETF, #raw("dc+sd-jwt"), ES256). Each field is hidden behind a salted hash and revealed only with the holder’s approval; the header carries the institution’s X.509 chain; #raw("cnf") binds the copy to a device key. The identity credential is also issued as an *ISO 18013-5 mdoc*, so an age check can receive #raw("age_over_18") and nothing else. Document types are stable URNs; their definitions sit in a public catalogue and every credential carries a hash of its definition. See #link("https://tamga.network/en/learn/verifiable-credentials")[credentials].

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

The national ID number appears only in the identity credential; no diploma, card or ticket carries it.

= Issuing and presenting

- *Issuance (OpenID4VCI).* The institution shows a QR code with a PIN on the same screen — the PIN never travels inside the link. Or the wallet starts from the institution directory and proves the person’s identity first. The wallet receives *ten copies*, each bound to a different device key.
- *Genuine wallets only.* Issuers require a short-lived *wallet unit attestation* from the wallet provider.
- *Presentation (OpenID4VP, DCQL).* The verifier’s request is signed with its registered certificate. The wallet checks it against the trust list, shows exactly what is asked and warns about anything beyond the verifier’s registered scope. Where the verifier offers alternatives (#raw("credential_sets"), #raw("claim_sets")), the wallet shows them as options; a credential missing a requested field is never sent, and the wallet tells the person why the request cannot be met. The answer is encrypted and carries only the approved fields and a proof that the key is on this phone.
- *Websites.* A site signs a person up once with the wallet, under a pseudonym of its own: the wallet derives a separate, stable pseudonym for each site, so two sites cannot match a person, and the same pseudonyms return on a new phone after the identity check. Daily sign-in then uses a *passkey* and shares no fields. See #link("https://tamga.network/en/learn/unlinkability")[sign in with Tamga].

= Verification: five layers, three outcomes

Every verification runs the same pipeline in the same order and stops at the first failure. Each step has a permanent code, so a rejection always states why.

#kvtable("Verification pipeline", (("T0", "request and answer belong together (nonce, audience, encryption)"), ("A · format", "signature, certificate chain, device proof, hidden fields intact"), ("B · type", "document type registered; definition hash matches the catalogue"), ("C · trust", "issuer authorized for this type on the issue date; category matches"), ("D · status", "not revoked or suspended; list fresh and anchored"), ("E · policy", "requested fields present; nothing beyond the verifier's scope"), ("→ outcome", "ACCEPTED · REJECTED (failing step) · INDETERMINATE (could not check)"),), mono: false)

*INDETERMINATE* is never reported as REJECTED. If a list cannot be reached or is out of date, the verifier says “could not check right now” — the difference between “this diploma is fake” and “I cannot check” decides whether someone is hired. Authorization is judged on the *issue date*: a diploma issued while a university was active stays valid after a suspension, while new issuance stops at once.

= Revocation and lifecycle

Revocation uses the *IETF Token Status List*: two bits per credential copy — valid, revoked or suspended — at a *random* position. The issuer publishes at a *fixed interval*, never on demand, so timing reveals nothing about a person; each publication is anchored. Verifiers pre-fetch the lists, so checking a credential makes no call to the issuer or to the phone. A revocation reaches every verifier within about 90 minutes at most. Copies run out by design; when a credential comes with a refresh token, the wallet renews its copies in the background at the threshold the issuer announces, and a renewal shares nothing new. Credentials renewed by presenting the identity credential need the person's approval and PIN. See #link("https://tamga.network/en/learn/revocation")[revocation].

#chapter()
= Privacy by design

- *Per-verifier copies.* Each verifier receives a different copy bound to a different key, so verifiers cannot link a person by comparing what they received.
- *Selective disclosure* by default; predicates such as #raw("age_over_18") where the format allows.
- *Identity checks are isolated.* Only the identity service talks to the identity-verification provider; after issuing it keeps no photos, only an opaque hashed record (a subject reference and a document-number hash). Institutions match a person through the identity credential, not through the provider.
- *No personal data in logs or public addresses.* Revocation-list addresses never encode the institution; logs record what happened, never to whom.
- *Websites* get a separate pseudonym per site as the account key; neither the identity-document number nor its hash is sent, and sites cannot match a person.

#notebox[Residual risk, stated openly: the same issuer colluding with several verifiers could still link a person. Zero-knowledge presentation closes this; on the wallet side it follows the store release (see zero-knowledge proofs below).]

= Close range: passes and age checks

For turnstiles and event gates Tamga uses a *pass*: registration once through a standard presentation, then a 60-second signed token shown as a QR code — no personal data in the token, replay rejected, and tickets can be single-use. A person-to-person check reverses OpenID4VP so the checker’s app starts a standard request. Both are versioned bridges; the target is ISO 18013-5 over NFC/BLE.

#chapter()
= From lists to a ledger

A ledger adds something only when several independent parties run it. Tamga therefore starts with lists and adds a permissioned *Hyperledger Besu* network with *QBFT* consensus only once at least two independent validator operators agree in writing. Every list field maps to a contract record; the list history is replayed into the contracts and both are tested to give the same answers. Components read trust through one interface, so documents, wallets and the verification pipeline do not change. See #link("https://tamga.network/en/learn/what-is-blockchain")[what blockchain is — and isn’t].

Governance on the ledger follows the principles: validators are states with equal votes; new members by a 2/3 vote; each state alone registers or suspends its own institutions; recognition of foreign institutions is decided by each state.

= Zero-knowledge proofs and research directions

*Zero-knowledge presentation (decided).* The wallet proves a fact such as “over 18” about an unchanged, issuer-signed mdoc with the open-source Longfellow ZK system — the system the EU age-verification work also builds on. The verifier sees only that the statement is true and which institution issued the credential; two presentations cannot be linked. Only reviewed circuits whose identifiers are published in the signed trust list are accepted. The verifier side is built; proof generation on the phone follows the store release, and where a proof is not possible the ordinary presentation continues. See #link("https://tamga.network/en/learn/zero-knowledge-proofs")[zero-knowledge proofs].

*Research direction: the value layer.* Authorization between verified parties; settlement stays on regulated rails. It is not part of the first release or the pilot and will pass an independent security review before any use.

#chapter()
= Status and roadmap

*Working today (first release, real cryptography):* issuance and presentation of diplomas and student cards; revocation and institution suspension; identity check and identity credential, also as mdoc; campus and event passes, single-use tickets; website sign-up with a per-site pseudonym and passkey sign-in; zero-knowledge age proofs on the verifier side; nine open-source packages. Tested on a phone.

#kvtable("Phases", (("List stage (today)", "signed trust lists + anchor log · Tamga = provisional operator"), ("Pilot", "the first issuing institution is a university · issuer key at the university · lists, no ledger"), ("Phase 0", "permissioned Besu/QBFT ledger once at least 2 independent validator operators sign"), ("Phase 1", "member-state lists · close range (NFC/BLE) · Digital Credentials API"),), mono: false)

The known limits of the first release are recorded and closed before the pilot. The pilot’s success and stop criteria are defined in advance.

A separate test network, *sandbox.tamga.network*, is live: its own test root and lists, sample institutions, fake people and sample credentials of every type, an optional real identity check (daily and monthly caps) next to the quick test, and test institution accounts. No wallet or verifier on the real network trusts it. Wallet, institution and verifier developers all test there: a wallet developer registers their own wallet provider in the sandbox list and tries the wallet against the sample institutions, the identity service and the verifier. See the #link("https://docs.tamga.network/guides/sandbox")[sandbox guide].

= Known limits

- In this phase the trust anchor rests on one operator’s signature. The public log, transparency report and audits deter misuse; they cannot make it impossible.
- A revocation takes effect within about 90 minutes at most.
- Issuer linkability remains until zero-knowledge presentation reaches the wallet.
- The identity service could in theory compute a person’s pseudonym at a given site; key protection and audit limit this, and zero-knowledge proofs will remove it.
- Until the wallets on the network (the first is Tamga Wallet) are in the app stores, a phone’s own claim of secure hardware is not accepted; from a wallet’s store release, App Attest / Play Integrity become mandatory.

= Rules, open source and further reading

The network’s rules are published as the *Tamga ARF 1.0*: the main document, the Trust Framework, the *Tamga Rulebook* and the rulebooks that branch from it for each document type — Education, Identity and Event Ticket — at #link("https://arf.tamga.network")[arf.tamga.network]. See also #link("https://tamga.network/en/learn/rules-and-rulebooks")[rules and rulebooks].

Code is Apache-2.0 and documentation CC BY 4.0. The packages #raw("@tamga-network/*") cover trust lists, credential formats, issuing, verification and the wallet core; integration guides and specifications are in the #link("https://docs.tamga.network")[developer documentation]. Concepts are explained from scratch in #link("https://tamga.network/en/learn")[Learn]; the #link("https://docs.tamga.network/glossary")[glossary] is a quick reference and the #link("https://tamga.network/en/manifesto")[manifesto] gives the “why”.

#notebox[This is a living document (v1.0). It changes as decisions mature; the trust model is what stays.]

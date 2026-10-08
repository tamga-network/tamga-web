---
title: "ISO mdoc deep dive: CBOR, COSE, MSO and engagement"
slug: iso-mdoc-deep-dive
description: How an ISO/IEC 18013-5 mdoc is built and verified - CBOR and COSE, the MSO and value digests, device authentication, session transcripts, QR and BLE.
date: 2026-10-08
lang: en
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Sources: ADR-0013 v1.0.0 (accepted 2026-09-26; MD1–MD5; docType/namespace; CBOR determinism note; Safari/Chrome DC API facts as recorded in the ADR); SPEC-PROTO-0001 PR16 (mdoc in the same credential response, same proof key, same status bit, wallet cross-check); SPEC-PROTO-0002 §4.5, §5.2, PV11 (DCQL mso_mdoc, DeviceResponse, OpenID4VPHandover); @tamga-network/mdoc README + src (mdoc.ts: tag-24 items, random 31-bit digestIDs, 16-byte random, MSO fields, status in MSO, empty DeviceNameSpaces, OpenID4VPHandover + OpenID4VPDCAPIHandover; proximity.ts: DeviceEngagement QR "mdoc:", cipher suite 1, BLE peripheral server mode, SessionTranscript [DE, EReaderKey, null], HKDF SKReader/SKDevice, AES-256-GCM IV, status 20, BLE chunk prefix); identity type metadata urn:tamga:id:IdentityAttestation:1 (11 elements, sd always, no portrait); concepts/presentation (BLE implemented, device testing pending). Example mdoc generated with @tamga-network/mdoc for this post (fake values). ISO/IEC 18013-5:2021 public catalogue entry; OpenID4VP 1.0 Final Annex B.2.6; HAIP 1.0 Final §6. -->

An **mdoc** is the mobile document format defined in ISO/IEC 18013-5:2021, the standard for mobile driving licences. It is CBOR signed with COSE: the issuer signs a **Mobile Security Object (MSO)** that lists a digest of every data element and the holder's device key, the holder sends only the elements a reader asked for, and a device signature over a **session transcript** binds the response to that one session. Tamga issues its identity credential as an mdoc next to its SD-JWT VC.

> **Note:** The examples were generated for this post with the open `@tamga-network/mdoc` package, using fake values. Digests are shortened and the certificate chain is left out.

## Why does Tamga issue the identity credential in two formats?

[ADR-0013](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity), accepted on 26 September 2026, gives three reasons. The EU's architecture for digital identity wallets requires mdoc for person identification data and treats SD-JWT VC as optional. In-person presentation under ISO 18013-5 carries mdoc. And when the decision was taken, Safari's Digital Credentials API accepted only mdoc, while Chrome accepted both formats.

The rules that follow from that decision:

- **SD-JWT VC stays primary.** mdoc is a second representation of the same credential, and only for the identity credential (`urn:tamga:id:IdentityAttestation:1`). Student certificates, diplomas and tickets stay SD-JWT VC only.
- **Same fields, same validity, same key.** The mdoc `deviceKey` is the SD-JWT `cnf.jwk`. No second holder key is created.
- **Separate issuer signatures.** JOSE/ES256 for SD-JWT, `COSE_Sign1`/ES256 for mdoc, with the same certificate chain resolving to the same trust list entry.
- **One issuance, one status bit.** Each object in the credential response carries the SD-JWT VC and the mdoc (base64url `IssuerSigned`), both bound to the same proof key and the same status list index. The wallet does not store the mdoc until it has cross-checked it against the SD-JWT copy: same issuer certificate, same fields, `deviceKey` equal to `cnf`.

![SD-JWT VC and mdoc compared, field by field](/blog/iso-mdoc-deep-dive/en/fig-formats.png)

## How is an mdoc encoded?

Everything is **CBOR** (RFC 8949), a binary encoding with the same data model as JSON plus byte strings, tags and integer keys. Two tags matter here. Tag 24 means "the following byte string is itself encoded CBOR"; it lets a signer hash exact bytes rather than a re-encoded structure, the same lesson SD-JWT teaches with its disclosure strings ([SD-JWT VC deep dive](/blog/sd-jwt-vc-deep-dive)). Tag 0 marks an RFC 3339 date-time string.

Signatures use **COSE** (RFC 9052), CBOR's counterpart to JOSE. A `COSE_Sign1` is a four-element array: protected header, unprotected header, payload and signature. Tamga's issuer signature has `{1: -7}` (ES256) in the protected header and the certificate chain in `x5chain`.

ADR-0013 records one interoperability caveat. Tamga encodes deterministic CBOR per RFC 8949 §4.2.1 (bytewise lexicographic key order), while ISO 18013-5:2021 refers to the older length-first ordering of RFC 7049. Because digests are taken over tag-24 bytes as issued, verification does not depend on the ordering rule, but the item is tracked for full interoperability.

## What is a data element and how is it hashed?

Each field is an `IssuerSignedItem`: a map with a `digestID`, 16 random bytes, the element name and its value, encoded and wrapped in tag 24. Its digest is the SHA-256 of those tagged bytes.

```cbor-diag title="Simplified example: one IssuerSignedItem (generated with @tamga-network/mdoc)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

SHA-256 of the tagged bytes: c2418dcd28b95cc1…
```

The random value does the job of the SD-JWT salt: without it, the digest of `age_over_18: true` would be the same in every credential and could be guessed. The `digestID` links the item to its entry in the MSO. Tamga assigns digestIDs at random within 31 bits instead of counting 0, 1, 2…, so the IDs a holder reveals say nothing about how many elements exist or where they sat.

Elements live in **namespaces**. Tamga's identity namespace is `tamga.id.1`, and its element names match the SD-JWT claim names one to one: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` and `age_over_18`. All of them are selectively disclosable. There is no portrait element.

## What does the Mobile Security Object contain?

The MSO is the issuer-signed part. It is encoded, wrapped in tag 24 and used as the payload of the issuer's `COSE_Sign1` (`issuerAuth`):

```cbor-diag title="Simplified example: MobileSecurityObject (generated with @tamga-network/mdoc)"
{
  "version": "1.0",
  "digestAlgorithm": "SHA-256",
  "docType": "urn:tamga:id:IdentityAttestation:1",
  "valueDigests": {
    "tamga.id.1": {
      692698667:  h'9852780268ee6d84…',
      1192084209: h'c2418dcd28b95cc1…',
      1688544371: h'195cd811675f41a9…',
      1708359320: h'd67a4825ac901b31…',
      1956174090: h'3dbc0b38db348aef…'
    }
  },
  "deviceKeyInfo": { "deviceKey": { 1: 2, -1: 1, -2: h'…', -3: h'…' } },
  "validityInfo": {
    "signed":     0("2026-10-08T08:00:00Z"),
    "validFrom":  0("2026-10-08T08:00:00Z"),
    "validUntil": 0("2028-10-07T08:00:00Z")
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  }
}
```

The `age_over_18` item above hashes to the value stored under `1192084209`. `deviceKey` is a COSE_Key (`1: 2` is an EC2 key, `-1: 1` is curve P-256, `-2`/`-3` are the coordinates), the same public key as the SD-JWT's `cnf.jwk`. `validityInfo.signed` plays the role of the SD-JWT `iat`: Tamga's time-bound trust checks ask whether the issuer was listed and authorised at that moment. `status` points to the same Token Status List index as the SD-JWT copy, so revoking the identity credential revokes both representations with one bit.

## How does the holder prove it is the device the mdoc was issued to?

Selective disclosure is the easy part: the wallet sends `IssuerSigned` with only the approved items in `nameSpaces` and the untouched `issuerAuth`. Hidden elements stay as digests in the MSO.

Holder binding comes from **device authentication**. The wallet builds:

```cbor-diag title="What the device key signs"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: empty in Tamga's profile /
] >>)
```

and signs it with the device key as a `COSE_Sign1` with a **detached payload**: the payload field is `nil`, and the verifier rebuilds the bytes itself from its own view of the session. The signature travels in `deviceSigned.deviceAuth.deviceSignature` of a `DeviceResponse` (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga does not use device-signed data elements, so `DeviceNameSpaces` is always an empty map.

Everything therefore depends on the **SessionTranscript**: whatever goes into it is what the response is bound to.

## What goes into the session transcript?

| Channel | SessionTranscript | Binds the response to |
|---|---|---|
| In person (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | both ephemeral session keys |
| OpenID4VP via QR or link | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | verifier identity, nonce, encryption key, response address |
| OpenID4VP via the DC API | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | browser origin, nonce, encryption key |

The two online forms come from OpenID4VP 1.0 Final, Annex B.2.6. `client_id` is the full `x509_hash:…` value and `jwkThumbprint` is the RFC 7638 thumbprint of the key the response is encrypted to. A DeviceResponse captured from one request fails in another, because the verifier rebuilds a different transcript and the device signature no longer matches. Tamga's verifier rejects this at step A6.

> **Note:** ADR-0013 still describes the online transcript as a deterministic demo digest with ISO 18013-7 handover "for the pilot". The current `@tamga-network/mdoc` implements the OpenID4VP 1.0 Final handovers shown above, and the OpenID4VP profile requires them.

## How does in-person engagement over QR and Bluetooth work?

![In-person mdoc presentation in four steps](/blog/iso-mdoc-deep-dive/en/fig-engagement.png)

1. **Device engagement.** The wallet creates an ephemeral P-256 key (`EDeviceKey`) and a random BLE service UUID, and shows a QR code containing `mdoc:` followed by base64url of the `DeviceEngagement` structure. It holds no personal data.
2. **Session establishment.** The reader scans the code, creates its own ephemeral key (`EReaderKey`) and derives session keys. Both sides run ECDH, then HKDF-SHA-256 with `SHA-256(SessionTranscriptBytes)` as salt and the info strings `SKReader` and `SKDevice`. The reader sends `SessionEstablishment {eReaderKey, data}`, where `data` is its `DeviceRequest` encrypted under SKReader.
3. **Request and consent.** The wallet decrypts the request, shows the requested elements, and the person approves with the phone's lock or declines.
4. **Response.** The wallet sends the `DeviceResponse` in a `SessionData` message encrypted under SKDevice, and ends the session with status `20`.

```cbor-diag title="Simplified example: DeviceEngagement inside the QR code"
{
  0: "1.0",
  1: [1, 24(<< EDeviceKey as COSE_Key >>)],     / cipher suite 1 /
  2: [[2, 1, {                                  / BLE, version 1 /
        0: true,                                / peripheral server mode /
        1: false,                               / central client mode /
        10: h'…16-byte service UUID…'
      }]]
}
```

Session messages use AES-256-GCM with a 12-byte IV made of an 8-byte identifier (all zeros for the reader, `…01` for the device) and a 4-byte message counter that starts at 1. Over BLE the phone acts as a GATT server; each message is split into chunks whose first byte is `0x01` when more follow and `0x00` on the last one.

Status today: the protocol core (engagement, session encryption, BLE framing) is implemented and tested in `@tamga-network/mdoc`, and the BLE radio is supplied by the wallet app. Device testing is still in progress. NFC is not used; engagement always starts from the QR code. Reader authentication is not included yet, so the wallet tells the person the reader is not verified. Online mdoc presentation over OpenID4VP uses the same request flow as SD-JWT VC.

## How does a verifier check an mdoc?

1. Parse the `DeviceResponse` and confirm `docType` is the one requested.
2. Verify `issuerAuth`: ES256 only, `x5chain` resolving to an issuer in the signed trust list, the same anchor used for SD-JWT credentials.
3. For each disclosed item, hash the tag-24 bytes and compare with `valueDigests[namespace][digestID]`.
4. Check `validityInfo` against the current time.
5. Rebuild the SessionTranscript for this request or session, rebuild `DeviceAuthenticationBytes`, and verify `deviceSignature` with `deviceKey`.
6. Read the status bit, then run the same trust, revocation and policy layers as for SD-JWT VC.

The result is the same three-valued outcome: accepted, rejected, or indeterminate when infrastructure can't be reached. The result object never contains raw CBOR or undisclosed elements.

In an OpenID4VP request the mdoc is chosen with DCQL ([OpenID4VP and DCQL deep dive](/blog/openid4vp-dcql-deep-dive)): `format: "mso_mdoc"`, `meta.doctype_value`, and claim paths of the form `[namespace, element]`:

```json title="DCQL query for an age check over mdoc"
{
  "credentials": [{
    "id": "identity",
    "format": "mso_mdoc",
    "meta": { "doctype_value": "urn:tamga:id:IdentityAttestation:1" },
    "claims": [{ "path": ["tamga.id.1", "age_over_18"], "values": [true] }]
  }]
}
```

The mdoc identity credential is also the input to Tamga's zero-knowledge age proof, which works over ordinary ES256-signed mdocs ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)). The check is live on Tamga Verify; how it works is in [Zero-knowledge in Tamga](/blog/zero-knowledge-in-tamga).

## Frequently asked questions

### Is an mdoc the same as an mDL?

No. An mDL (mobile driving licence) is one document type that uses the mdoc format. Tamga's identity credential is an mdoc with its own docType and namespace, and Tamga's "driving licence information" credential is SD-JWT VC only, not an mDL.

### Why are digestIDs random and not sequential?

Sequential IDs would let a verifier infer how many elements a credential has and which positions were withheld. Random 31-bit IDs carry no order.

### Can I verify a Tamga mdoc with another ISO 18013-5 library?

The structures are standard ISO 18013-5 and OpenID4VP 1.0. Two points to check: the library must hash tag-24 bytes as received rather than re-encode, and it must support the OpenID4VP handover for online presentations.

## Sources

- [ISO/IEC 18013-5:2021, Mobile driving licence (mDL) application, ISO](https://www.iso.org/standard/69084.html)
- [OpenID for Verifiable Presentations 1.0, Final, 9 July 2025 (Annex B: ISO mdoc)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 December 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 8949: Concise Binary Object Representation (CBOR), IETF](https://www.rfc-editor.org/rfc/rfc8949)
- [RFC 9052: CBOR Object Signing and Encryption (COSE), IETF](https://www.rfc-editor.org/rfc/rfc9052)
- [ADR-0013: mdoc for the identity credential, Tamga Network docs](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity)
- [`@tamga-network/mdoc`, Tamga Network docs](https://docs.tamga.network/packages/mdoc)
- [OpenID4VP profile (SPEC-PROTO-0002), Tamga Network docs](https://docs.tamga.network/specifications/openid4vp)
- [Presentation, Tamga Network docs](https://docs.tamga.network/concepts/presentation)

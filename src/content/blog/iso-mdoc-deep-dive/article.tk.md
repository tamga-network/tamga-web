---
title: "ISO mdoc-a çuňňur seredilişi: CBOR, COSE, MSO we engagement"
slug: iso-mdoc-deep-dive
description: ISO/IEC 18013-5 mdoc nähili gurulýar we barlanýar - CBOR we COSE, MSO we baha heşleri, enjam tanamasy, sessiýa ýazgylary, QR we BLE.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Sources: ADR-0013 v1.0.0 (accepted 2026-09-26; MD1–MD5; docType/namespace; CBOR determinism note; Safari/Chrome DC API facts as recorded in the ADR); SPEC-PROTO-0001 PR16 (mdoc in the same credential response, same proof key, same status bit, wallet cross-check); SPEC-PROTO-0002 §4.5, §5.2, PV11 (DCQL mso_mdoc, DeviceResponse, OpenID4VPHandover); @tamga-network/mdoc README + src (mdoc.ts: tag-24 items, random 31-bit digestIDs, 16-byte random, MSO fields, status in MSO, empty DeviceNameSpaces, OpenID4VPHandover + OpenID4VPDCAPIHandover; proximity.ts: DeviceEngagement QR "mdoc:", cipher suite 1, BLE peripheral server mode, SessionTranscript [DE, EReaderKey, null], HKDF SKReader/SKDevice, AES-256-GCM IV, status 20, BLE chunk prefix); identity type metadata urn:tamga:id:IdentityAttestation:1 (11 elements, sd always, no portrait); concepts/presentation (BLE implemented, device testing pending). Example mdoc generated with @tamga-network/mdoc for this post (fake values). ISO/IEC 18013-5:2021 public catalogue entry; OpenID4VP 1.0 Final Annex B.2.6; HAIP 1.0 Final §6. -->

**mdoc** ykjam sürüjilik şahadatnamalary üçin standart bolan ISO/IEC 18013-5:2021-de kesgitlenen ykjam resminama formatydyr. Ol COSE bilen gol çekilen CBOR-dyr: beriji her maglumat elementiniň heşini we eýesiniň enjam açaryny sanaýan **Mobile Security Object-a (MSO)** gol çekýär, eýesi diňe okaýjynyň soran elementlerini iberýär we **sessiýa ýazgysynyň** (session transcript) üstünden enjam goly jogaby şol ýeke sessiýa baglaýar. Tamga öz şahsyýet resminamasyny SD-JWT VC-niň ýanynda mdoc hökmünde hem berýär.

> **Bellik:** Mysallar bu ýazgy üçin açyk `@tamga-network/mdoc` paketi bilen, ýasama bahalar ulanylyp döredildi. Heşler gysgaldylan we sertifikat zynjyry aýrylan.

## Näme üçin Tamga şahsyýet resminamasyny iki formatda berýär?

2026-njy ýylyň 26-njy sentýabrynda kabul edilen [ADR-0013](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity) üç sebäp görkezýär. ÝB-niň sanly şahsyýet gapjyklary üçin arhitekturasy adamy tanadýan maglumatlar (PID) üçin mdoc-y talap edýär we SD-JWT VC-ä hökmany däl diýip garaýar. ISO 18013-5 boýunça ýüzbe-ýüz görkeziş mdoc-y göterýär. Karar kabul edilende bolsa Safari-niň Digital Credentials API-si diňe mdoc-y kabul edýärdi, Chrome bolsa iki formaty hem kabul edýärdi.

Şol karardan gelip çykýan düzgünler:

- **SD-JWT VC esasy bolup galýar.** mdoc şol bir resminamanyň ikinji görnüşi we diňe şahsyýet resminamasy (`urn:tamga:id:IdentityAttestation:1`) üçin. Talyp şahadatnamalary, diplomlar we biletler diňe SD-JWT VC bolup galýar.
- **Şol bir meýdanlar, şol bir möhlet, şol bir açar.** mdoc `deviceKey` SD-JWT `cnf.jwk`-dir. Ikinji eýe açary döredilmeýär.
- **Aýry beriji gollary.** SD-JWT üçin JOSE/ES256, mdoc üçin `COSE_Sign1`/ES256, şol bir sertifikat zynjyry şol bir ynam sanawy ýazgysyna gelýär.
- **Bir beriş, bir ýagdaý biti.** Resminama jogabyndaky her obýekt ikisi hem şol bir subutnama açaryna we şol bir ýagdaý sanawy indeksine baglanan SD-JWT VC-ni we mdoc-y (base64url `IssuerSigned`) göterýär. Gapjyk mdoc-y SD-JWT nusgasy bilen deňeşdirip barlamaýança saklamaýar: şol bir beriji sertifikaty, şol bir meýdanlar, `cnf`-e deň `deviceKey`.

![SD-JWT VC we mdoc meýdanma-meýdan deňeşdirilende](/blog/iso-mdoc-deep-dive/en/fig-formats.png)

## mdoc nähili kodlanýar?

Hemme zat **CBOR** (RFC 8949), ýagny JSON bilen şol bir maglumat modeli we goşmaça baýt setirleri, tegler hem-de bitin san açarlary bolan ikilik kodlamadyr. Bu ýerde iki teg möhüm. 24-nji teg "indiki baýt setiriniň özi kodlanan CBOR" diýmekdir; ol gol çekijä täzeden kodlanan gurluşyň däl-de, takyk baýtlaryň heşini almaga mümkinçilik berýär; SD-JWT-iň disclosure setirleri bilen öwredýän şol bir sapagy ([SD-JWT VC-ä çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). 0-njy teg RFC 3339 sene-wagt setirini belleýär.

Gollar CBOR-yň JOSE-a meňzeşi bolan **COSE**-ny (RFC 9052) ulanýar. `COSE_Sign1` dört elementli toplumdyr: goralan başlyk, goralmadyk başlyk, mazmun we gol. Tamga-nyň beriji golunyň goralan başlygynda `{1: -7}` (ES256), `x5chain`-de bolsa sertifikat zynjyry bar.

ADR-0013 bir özara işleşik duýduryşyny ýazga alýar. Tamga RFC 8949 §4.2.1 boýunça kesgitli CBOR-y (açarlaryň baýtma-baýt leksikografik tertibi) kodlaýar, ISO 18013-5:2021 bolsa RFC 7049-yň has köne, ilki uzynlyga görä tertibine salgylanýar. Heşler berlişi ýaly 24-nji tegli baýtlardan alynýandygy sebäpli barlag tertip düzgünine bagly däl, ýöne doly özara işleşik üçin bu mesele yzarlanýar.

## Maglumat elementi näme we onuň heşi nähili alynýar?

Her meýdan `IssuerSignedItem`-dir: `digestID`, 16 tötänleýin baýt, element ady we onuň bahasy bolan, kodlanan we 24-nji tege oralan map. Onuň heşi şol tegli baýtlaryň SHA-256-sydyr.

```cbor-diag title="Ýönekeýleşdirilen mysal: bir IssuerSignedItem (@tamga-network/mdoc bilen döredilen)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

SHA-256 of the tagged bytes: c2418dcd28b95cc1…
```

Tötänleýin baha SD-JWT duzunyň işini edýär: ol bolmasa, `age_over_18: true`-nyň heşi her resminamada birmeňzeş bolardy we ony çaklap bolardy. `digestID` elementi onuň MSO-daky ýazgysyna baglaýar. Tamga digestID-leri 0, 1, 2… diýip sanamagyň ýerine 31 bitiň içinde tötänleýin berýär, şeýlelikde eýesiniň açýan ID-leri näçe elementiň bardygy ýa-da olaryň nirede durandygy hakda hiç zat aýtmaýar.

Elementler **at giňişliklerinde** (namespace) ýaşaýar. Tamga-nyň şahsyýet at giňişligi `tamga.id.1`, onuň element atlary bolsa SD-JWT meýdan atlaryna birme-bir gabat gelýär: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` we `age_over_18`. Olaryň hemmesi saýlap açylyp bilinýär. Surat elementi ýok.

## Mobile Security Object-da näme bar?

MSO beriji tarapyndan gol çekilen bölekdir. Ol kodlanýar, 24-nji tege oralýar we berijiniň `COSE_Sign1`-iniň (`issuerAuth`) mazmuny hökmünde ulanylýar:

```cbor-diag title="Ýönekeýleşdirilen mysal: MobileSecurityObject (@tamga-network/mdoc bilen döredilen)"
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
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/c7d41e" }
  }
}
```

Ýokardaky `age_over_18` elementiniň heşi `1192084209` astynda saklanýan bahadyr. `deviceKey` COSE_Key-dir (`1: 2` EC2 açary, `-1: 1` P-256 egrisi, `-2`/`-3` koordinatalar), SD-JWT-iň `cnf.jwk`-i bilen şol bir açyk açar. `validityInfo.signed` SD-JWT `iat`-ynyň roluny oýnaýar: Tamga-nyň wagta bagly ynam barlaglary berijiniň şol pursatda sanawda we ygtyýarly bolandygyny soraýar. `status` SD-JWT nusgasy bilen şol bir indeksi ulanýar, ýöne şol bir Token Status List-iň öz açyk däl salgysyndaky CWT görnüşine (`application/statuslist+cwt`) salgylanýar, şeýlelikde mdoc okaýjysyna hiç haçan JWT analizatory gerek däl. Iki görnüş hem şol bir bitleri göterýär we şol bir çap edilişde gol çekilýär, şonuň üçin şahsyýet resminamasyny ýatyrmak iki görnüşi hem birbada ýatyrýar ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)).

## Eýesi özüniň mdoc berlen enjamdygyny nähili subut edýär?

Saýlap açmak aňsat bölegi: gapjyk `nameSpaces`-de diňe tassyklanan elementler we degilmedik `issuerAuth` bilen `IssuerSigned` iberýär. Gizlin elementler MSO-da heş bolup galýar.

Eýesine baglylyk **enjam tanamasyndan** (device authentication) gelýär. Gapjyk şuny gurýar:

```cbor-diag title="Enjam açarynyň nämä gol çekýändigi"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: empty in Tamga's profile /
] >>)
```

we oňa enjam açary bilen **aýrylan mazmunly** (detached payload) `COSE_Sign1` hökmünde gol çekýär: mazmun meýdany `nil`, barlaýjy baýtlary sessiýany öz görşi boýunça özi täzeden gurýar. Gol `DeviceResponse`-yň (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`) `deviceSigned.deviceAuth.deviceSignature` meýdanynda gidýär. Tamga enjam tarapyndan gol çekilen maglumat elementlerini ulanmaýar, şonuň üçin `DeviceNameSpaces` hemişe boş map.

Şonuň üçin hemme zat **SessionTranscript**-e bagly: oňa näme girse, jogap şoňa baglanýar.

## Sessiýa ýazgysyna näme girýär?

| Kanal | SessionTranscript | Jogaby nämä baglaýar |
|---|---|---|
| Ýüzbe-ýüz (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | iki wagtlaýyn sessiýa açaryna |
| QR ýa-da salgy arkaly OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | barlaýjynyň şahsyýetine, nonce-a, şifrlemek açaryna, jogap salgysyna |
| DC API arkaly OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | brauzeriň gelip çykyşyna, nonce-a, şifrlemek açaryna |

Iki onlaýn görnüş OpenID4VP 1.0 Final-yň B.2.6 goşundysyndan gelýär. `client_id` doly `x509_hash:…` bahasy, `jwkThumbprint` bolsa jogabyň şifrlenýän açarynyň RFC 7638 thumbprint-idir. Bir haýyşdan ele salnan DeviceResponse başga haýyşda şowsuz bolýar, sebäbi barlaýjy başga ýazgyny täzeden gurýar we enjam goly indi gabat gelmeýär. Tamga-nyň barlaýjysy muny A6 ädiminde ret edýär.

> **Bellik:** ADR-0013 onlaýn ýazgyny henizem "pilot üçin" ISO 18013-7 handover-y bilen kesgitli demo heşi hökmünde beýan edýär. Häzirki `@tamga-network/mdoc` ýokarda görkezilen OpenID4VP 1.0 Final handover-lerini durmuşa geçirýär we OpenID4VP profili olary talap edýär.

## QR we Bluetooth arkaly ýüzbe-ýüz engagement nähili işleýär?

![Ýüzbe-ýüz mdoc görkezişi dört ädimde](/blog/iso-mdoc-deep-dive/en/fig-engagement.png)

1. **Enjam engagement-i.** Gapjyk wagtlaýyn P-256 açaryny (`EDeviceKey`) we tötänleýin BLE hyzmat UUID-sini döredýär we `mdoc:` hem-de ondan soň `DeviceEngagement` gurluşynyň base64url-ini öz içine alýan QR koduny görkezýär. Onda şahsy maglumat ýok.
2. **Sessiýany gurmak.** Okaýjy kody skanirleýär, öz wagtlaýyn açaryny (`EReaderKey`) döredýär we sessiýa açarlaryny çykarýar. Iki tarap hem ECDH-ny, soňra duz hökmünde `SHA-256(SessionTranscriptBytes)` we `SKReader` hem-de `SKDevice` maglumat setirleri bilen HKDF-SHA-256-ny işledýär. Okaýjy `SessionEstablishment {eReaderKey, data}` iberýär, bu ýerde `data` SKReader bilen şifrlenen onuň `DeviceRequest`-idir.
3. **Haýyş we razylyk.** Gapjyk haýyşyň şifrini açýar, soralan elementleri görkezýär we adam telefonyň gulpy bilen tassyklaýar ýa-da ret edýär.
4. **Jogap.** Gapjyk `DeviceResponse`-y SKDevice bilen şifrlenen `SessionData` habarynda iberýär we sessiýany `20` ýagdaýy bilen tamamlaýar.

```cbor-diag title="Ýönekeýleşdirilen mysal: QR kodunyň içindäki DeviceEngagement"
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

Sessiýa habarlary 8 baýtlyk belgiden (okaýjy üçin hemmesi nol, enjam üçin `…01`) we 1-den başlaýan 4 baýtlyk habar sanaýjysyndan ybarat 12 baýtlyk IV bilen AES-256-GCM-i ulanýar. BLE arkaly telefon GATT serweri hökmünde hereket edýär; her habar böleklere bölünýär, olaryň birinji baýty ýene bölek bar bolsa `0x01`, soňkusynda bolsa `0x00`.

Häzirki ýagdaý: protokol özeni (engagement, sessiýa şifrlemesi, BLE çarçuwalamasy) `@tamga-network/mdoc`-da durmuşa geçirildi we synagdan geçirildi, BLE radiosyny bolsa gapjyk programmasy üpjün edýär. Enjam synagy henizem garaşylýar. NFC ulanylmaýar; engagement hemişe QR kodundan başlaýar. 0.6.0 paketlerinden bäri okaýjy öz haýyşyna gol çekýär (okaýjy tanamasy) we gapjyk ony gol çekilen ynam sanawyndaky labyrlar bilen barlaýar; 0.7.0-dan bäri hasaba alyş sertifikaty bolmadyk haýyş onlaýn ýaly ýüzbe-ýüz hem ret edilýär. OpenID4VP arkaly onlaýn mdoc görkezişi SD-JWT VC bilen şol bir haýyş akymyny ulanýar.

## Barlaýjy mdoc-y nähili barlaýar?

1. `DeviceResponse`-y açyň we `docType`-yň soralan görnüşdigini tassyklaň.
2. `issuerAuth`-y barlaň: diňe ES256, gol çekilen ynam sanawyndaky berijä gelýän `x5chain`, SD-JWT resminamalary üçin ulanylýan şol bir labyr.
3. Açylan her element üçin 24-nji tegli baýtlaryň heşini alyň we `valueDigests[namespace][digestID]` bilen deňeşdiriň.
4. `validityInfo`-ny häzirki wagt bilen barlaň.
5. Şu haýyş ýa-da sessiýa üçin SessionTranscript-i täzeden guruň, `DeviceAuthenticationBytes`-i täzeden guruň we `deviceSignature`-y `deviceKey` bilen barlaň.
6. Ýagdaý bitini okaň, soňra SD-JWT VC üçin ulanylýan şol bir ynam, ýatyrylyş we syýasat gatlaklaryny işlediň.

Netije şol bir üç bahaly netijedir: kabul edildi, ret edildi ýa-da infrastruktura ýetip bolmasa kesgitsiz. Netije obýektinde hiç haçan çig CBOR ýa-da açylmadyk elementler bolmaýar.

OpenID4VP haýyşynda mdoc DCQL bilen saýlanýar ([OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive)): `format: "mso_mdoc"`, `meta.doctype_value` we `[namespace, element]` görnüşindäki meýdan ýollary:

```json title="mdoc arkaly ýaş barlagy üçin DCQL soragy"
{
  "credentials": [{
    "id": "identity",
    "format": "mso_mdoc",
    "meta": { "doctype_value": "urn:tamga:id:IdentityAttestation:1" },
    "claims": [{ "path": ["tamga.id.1", "age_over_18"], "values": [true] }]
  }]
}
```

mdoc şahsyýet resminamasy adaty ES256 bilen gol çekilen mdoc-lar üstünde işleýän Tamga-nyň zero-knowledge ýaş subutnamasynyň hem girişidir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)). Barlag Tamga Verify-da işleýär; onuň nähili işleýändigi [Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga) ýazgysynda.

## Köp berilýän soraglar

### mdoc we mDL birmeňzeşmi?

Ýok. mDL (ykjam sürüjilik şahadatnamasy) mdoc formatyny ulanýan bir resminama görnüşidir. Tamga-nyň şahsyýet resminamasy öz docType-y we at giňişligi bolan mdoc-dyr, Tamga-nyň "sürüjilik şahadatnamasy maglumatlary" resminamasy bolsa mDL däl-de, diňe SD-JWT VC.

### Näme üçin digestID-ler yzygiderli däl-de tötänleýin?

Yzygiderli ID-ler barlaýja resminamada näçe element bardygyny we haýsy orunlaryň saklanandygyny çaklamaga mümkinçilik bererdi. Tötänleýin 31 bitlik ID-lerde tertip ýok.

### Tamga mdoc-yny başga ISO 18013-5 kitaphanasy bilen barlap bolýarmy?

Gurluşlar standart ISO 18013-5 we OpenID4VP 1.0. Iki nokady barlaň: kitaphana 24-nji tegli baýtlaryň heşini täzeden kodlamazdan, alnyşy ýaly almaly we onlaýn görkezişler üçin OpenID4VP handover-yny goldamaly.

## Çeşmeler

- [ISO/IEC 18013-5:2021, Mobile driving licence (mDL) application, ISO](https://www.iso.org/standard/69084.html)
- [OpenID for Verifiable Presentations 1.0, Final, 2025-nji ýylyň 9-njy iýuly (B goşundy: ISO mdoc)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 8949: Concise Binary Object Representation (CBOR), IETF](https://www.rfc-editor.org/rfc/rfc8949)
- [RFC 9052: CBOR Object Signing and Encryption (COSE), IETF](https://www.rfc-editor.org/rfc/rfc9052)
- [ADR-0013: şahsyýet resminamasy üçin mdoc, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity)
- [`@tamga-network/mdoc`, Tamga Network dokumentasiýasy](https://docs.tamga.network/packages/mdoc)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/openid4vp)
- [Görkeziş, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/presentation)

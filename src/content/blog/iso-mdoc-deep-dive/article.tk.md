---
title: "ISO mdoc-a çuňňur seredilişi: CBOR, COSE, MSO we engagement"
slug: iso-mdoc-deep-dive
description: ISO/IEC 18013-5 mdoc-yň nähili gurulýandygyny we barlanýandygyny düşündirýäris; CBOR we COSE, MSO we baha heşleri, enjam tanamasy, sessiýa ýazgysy, QR we BLE.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Sources: ADR-0013 v1.0.0 (accepted 2026-09-26; MD1–MD5; docType/namespace; CBOR determinism note; Safari/Chrome DC API facts as recorded in the ADR); SPEC-PROTO-0001 PR16 (mdoc in the same credential response, same proof key, same status bit, wallet cross-check); SPEC-PROTO-0002 §4.5, §5.2, PV11 (DCQL mso_mdoc, DeviceResponse, OpenID4VPHandover); @tamga-network/mdoc README + src (mdoc.ts: tag-24 items, random 31-bit digestIDs, 16-byte random, MSO fields, status in MSO, empty DeviceNameSpaces, OpenID4VPHandover + OpenID4VPDCAPIHandover; proximity.ts: DeviceEngagement QR "mdoc:", cipher suite 1, BLE peripheral server mode, SessionTranscript [DE, EReaderKey, null], HKDF SKReader/SKDevice, AES-256-GCM IV, status 20, BLE chunk prefix); identity type metadata urn:tamga:id:IdentityAttestation:1 (11 elements, sd always, no portrait); concepts/presentation (BLE implemented, device testing pending). Example mdoc generated with @tamga-network/mdoc for this post (fake values). ISO/IEC 18013-5:2021 public catalogue entry; OpenID4VP 1.0 Final Annex B.2.6; HAIP 1.0 Final §6. -->

**mdoc** mobil sürüjilik şahadatnamasynyň standarty bolan ISO/IEC 18013-5:2021-iň kesgitleýän mobil resminama formatydyr we COSE bilen gol çekilen CBOR maglumatyndan ybarat. Edara her maglumat elementiniň heşini we resminama eýesiniň enjam açaryny sanaýan **Mobile Security Object (MSO)** gol çekýär. Resminamanyň eýesi okyja diňe soralýan elementleri iberýär. **Sessiýa ýazgysynyň** (session transcript) üstünden goýulýan enjam goly bolsa jogaby diňe şol sessiýa baglaýar. Tamga şahsyýet resminamasyny SD-JWT VC bilen bilelikde mdoc görnüşinde hem berýär.

> **Bellik:** Mysallary bu ýazgy üçin açyk çeşmeli `@tamga-network/mdoc` paketi we galp bahalar bilen taýýarladyk. Heşler gysgaldyldy, sertifikat zynjyry bolsa görkezilmeýär.

## Näme üçin Tamga şahsyýet resminamasyny iki formatda berýär?

2026-njy ýylyň 26-njy sentýabrynda kabul edilen [ADR-0013](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity) munuň üç sebäbini sanaýar. ÝB-niň sanly şahsyýet gapjygynyň arhitekturasy adamy tanadýan maglumatlar üçin mdoc-y hökmany hasaplaýar, SD-JWT VC-ni bolsa islege bagly goýýar. ISO 18013-5 boýunça geçirilýän ýüzbe-ýüz görkeziş hem mdoc bilen işleýär. Mundan başga-da, karar kabul edilen wagty Safari-niň Digital Credentials API-si diňe mdoc kabul edýärdi, Chrome bolsa iki formaty hem kabul edýärdi.

Bu karardan şu düzgünler gelip çykýar:

- **SD-JWT VC esasy format bolup galýar.** mdoc şol bir resminamanyň ikinji görnüşi bolup, diňe şahsyýet resminamasy (`urn:tamga:id:IdentityAttestation:1`) üçin ulanylýar. Talyp resminamasy, diplom we bilet diňe SD-JWT VC görnüşinde berilýär.
- **Meýdanlar, güýjünde bolýan möhleti we açar birmeňzeş.** mdoc-daky `deviceKey` SD-JWT-däki `cnf.jwk` bilen şol bir açardyr we ikinji enjam açary döredilmeýär.
- **Edaranyň gollary aýry.** SD-JWT üçin JOSE/ES256, mdoc üçin `COSE_Sign1`/ES256 ulanylýar. Iki golyň sertifikat zynjyry hem ynam sanawynda şol bir ýazga barýar.
- **Resminama bir gezek berilýär we bir ýagdaý bitini göterýär.** Resminama jogabyndaky her obýekt SD-JWT VC-ni we mdoc-y (base64url `IssuerSigned`) bilelikde göterýär. Ikisi hem şol bir subutnama açaryna we ýagdaý sanawyndaky şol bir indekse bagly. Gapjyk mdoc-y SD-JWT nusgasy bilen deňeşdirmezden saklamaýar. Edaranyň sertifikatynyň we meýdanlaryň birmeňzeşdigine, `deviceKey` bahasynyň hem `cnf` bilen gabat gelýändigine seredýär.

![SD-JWT VC we mdoc meýdanma-meýdan deňeşdirilende](/blog/iso-mdoc-deep-dive/en/fig-formats.png)

## mdoc nähili kodlanýar?

mdoc-daky ähli zat **CBOR** (RFC 8949) bilen kodlanýar. CBOR JSON bilen şol bir maglumat modelini ulanýan we oňa baýt setirlerini, bellikleri (tag) we bitin san açarlaryny goşýan ikilik kodlamadyr. Bu ýerde iki bellik möhüm. 24-nji bellik "bu baýt setiriniň içinde hem kodlanan CBOR bar" diýmegi aňladýar. Şu bellik sebäpli gol çekiji gurluşy täzeden kodlamagyň deregine edil şol baýtlaryň heşini alyp bilýär. SD-JWT hem şol bir meseläni disclosure setirleri bilen çözýär ([SD-JWT VC-a çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). 0-njy bellik bolsa RFC 3339 formatyndaky sene-wagt setirini belleýär.

Gollar JOSE-niň CBOR-daky deňi bolan **COSE** (RFC 9052) bilen goýulýar. `COSE_Sign1` dört elementli massiw bolup, goralýan başlygy, goralmaýan başlygy, mazmuny we goly göterýär. Tamga-nyň edara golunda goralýan başlykda `{1: -7}` (ES256) bolýar, sertifikat zynjyry bolsa `x5chain` meýdanynda durýar.

ADR-0013 özara işleşik bilen bagly bir bellik hem ýazga geçirýär. Tamga kesgitli CBOR-y RFC 8949 §4.2.1 boýunça, ýagny açarlary baýt tertibinde düzüp kodlaýar. ISO 18013-5:2021 bolsa RFC 7049-daky köne "ilki uzynlyk" tertibine salgylanýar. Heşler resminama berlişi ýaly 24-nji belligiň baýtlarynyň üstünden alynýandygy üçin barlag bu tertip düzgünine bagly däl. Şeýle-de bolsa doly laýyklyk üçin bu mesele açyk iş hökmünde yzarlanýar.

## Maglumat elementi näme we onuň heşi nähili alynýar?

Her meýdan `IssuerSignedItem` görnüşinde saklanýar. Bu `digestID`-den, 16 tötänleýin baýtdan, elementiň adyndan we bahasyndan ybarat kartadyr (map). Karta kodlanýar we 24-nji bellige dolanýar. Elementiň heşi hem şu bellikli baýtlaryň SHA-256 bahasydyr.

```cbor-diag title="Ýönekeýleşdirilen mysal: bir IssuerSignedItem (@tamga-network/mdoc bilen döredilen)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

SHA-256 of the tagged bytes: c2418dcd28b95cc1…
```

Tötänleýin baha SD-JWT-däki duzuň (salt) işini edýär. Ol bolmasa, `age_over_18: true` bahasynyň heşi her resminamada birmeňzeş bolardy we aňsatlyk bilen çaklanyp bilnerdi. `digestID` bolsa elementi MSO-daky ýazgysyna baglaýar. Tamga digestID-leri 0, 1, 2 diýip sanamagyň deregine 31 bitlik aralykdan tötänleýin saýlaýar. Şeýlelikde resminama eýesiniň görkezýän belgileri resminamada näçe element bardygy ýa-da elementleriň nirede durýandygy barada hiç zat aýtmaýar.

Elementler **at giňişliklerinde** (namespace) ýerleşýär. Tamga-nyň şahsyýet at giňişligi `tamga.id.1` we bu ýerdäki element atlary SD-JWT-däki meýdan atlary bilen doly gabat gelýär: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` we `age_over_18`. Olaryň hemmesi saýlap açylyp bilner. Portret elementi bolsa ýok.

## Mobile Security Object-da näme bar?

MSO resminamanyň edara tarapyndan gol çekilýän bölegidir. Ol kodlanýar, 24-nji bellige dolanýar we edaranyň `COSE_Sign1` golunyň (`issuerAuth`) mazmuny hökmünde ulanylýar:

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

Ýokardaky `age_over_18` elementiniň heşi `1192084209` açarynyň aşagynda saklanýan bahadyr. `deviceKey` COSE_Key-dir. Bu ýerde `1: 2` açaryň EC2 görnüşlidigini, `-1: 1` P-256 egrisini, `-2` we `-3` bolsa koordinatalary görkezýär. Bu SD-JWT-däki `cnf.jwk` bilen şol bir açyk açardyr. `validityInfo.signed` SD-JWT-däki `iat` meýdanynyň ornuny tutýar. Tamga-nyň wagta bagly ynam barlaglary hem edaranyň edil şol pursatda sanawda bolandygyny we ygtyýarlydygyny barlaýar. `status` meýdany SD-JWT nusgasy bilen şol bir indeksi ulanýar, ýöne şol bir Token Status List-iň CWT görnüşine (`application/statuslist+cwt`) salgylanýar we bu görnüş öz aýdyň däl salgysynda ýerleşýär. Şonuň netijesinde mdoc okyjysynyň JWT derňewçisini götermegi gerek bolmaýar. Iki görnüş hem şol bir bitleri göterýär we şol bir çap edilişde gol çekilýär, şonuň üçin şahsyýet resminamasy ýatyrylanda iki görnüşi hem bilelikde ýatyrylýar ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)).

## Eýesi özüniň mdoc berlen enjamdygyny nähili subut edýär?

Saýlap açmak işiň aňsat bölegidir. Gapjyk `IssuerSigned` gurluşyny `nameSpaces` içinde diňe tassyklanan elementler we hiç degilmedik `issuerAuth` bilen iberýär. Görkezilmeýän elementler MSO-da diňe heş görnüşinde galýar.

Resminamanyň enjama baglydygyny bolsa **enjam tanamasy** (device authentication) görkezýär. Gapjyk ilki şu gurluşy düzýär:

```cbor-diag title="Enjam açarynyň nämä gol çekýändigi"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: empty in Tamga's profile /
] >>)
```

Soňra ony enjam açary bilen **aýrylan mazmunly** (detached payload) `COSE_Sign1` hökmünde gol çekýär. Bu golda mazmun meýdany `nil` bolýar we barlaýjy baýtlary sessiýany özüniň görşi ýaly täzeden gurýar. Gol `DeviceResponse` içindäki `deviceSigned.deviceAuth.deviceSignature` meýdanynda iberilýär (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga enjamyň gol çekýän maglumat elementlerini ulanmaýandygy üçin `DeviceNameSpaces` hemişe boş kartadyr.

Şonuň üçin ähli zat **SessionTranscript** gurluşyna bagly. Jogap bu gurluşa näme giren bolsa, şoňa baglanan bolýar.

## Sessiýa ýazgysyna näme girýär?

| Kanal | SessionTranscript | Jogaby nämä baglaýar |
|---|---|---|
| Ýüzbe-ýüz (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | iki wagtlaýyn sessiýa açaryna |
| QR ýa-da salgy arkaly OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | barlaýjynyň şahsyýetine, nonce-a, şifrlemek açaryna, jogap salgysyna |
| DC API arkaly OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | brauzeriň gelip çykyşyna (origin), nonce-a, şifrlemek açaryna |

Iki onlaýn görnüş OpenID4VP 1.0 Final-yň B.2.6 goşundysyndan gelýär. `client_id` doly `x509_hash:…` bahasydyr, `jwkThumbprint` bolsa jogabyň şifrlenen açarynyň RFC 7638 boýunça hasaplanan barmak yzydyr. Bir haýyşdan ele salnan DeviceResponse başga haýyşda işe ýaramaýar, sebäbi barlaýjy başga ýazgy gurýar we enjam goly indi gabat gelmeýär. Tamga barlaýjysy şeýle jogaby A6 ädiminde ret edýär.

> **Bellik:** ADR-0013 onlaýn ýazgyny entek hem kesgitli demo heşi we "pilot üçin" ISO 18013-7 el gysyşmasy hökmünde beýan edýär. Häzirki `@tamga-network/mdoc` paketi bolsa ýokardaky OpenID4VP 1.0 Final el gysyşmalaryny ulanýar we biziň OpenID4VP profilimiz hem olary şert edip goýýar.

## QR we Bluetooth arkaly ýüzbe-ýüz baglanyşyk nähili gurulýar?

![Ýüzbe-ýüz mdoc görkezişi dört ädimde](/blog/iso-mdoc-deep-dive/en/fig-engagement.png)

1. **Enjamy tanyşdyrmak (device engagement).** Gapjyk wagtlaýyn P-256 açaryny (`EDeviceKey`) we tötänleýin BLE hyzmat UUID-sini döredýär. Soňra `mdoc:` bilen başlaýan we `DeviceEngagement` gurluşynyň base64url görnüşini göterýän QR kody görkezýär. Bu kodda şahsy maglumat ýok.
2. **Sessiýany gurmak.** Okyjy kody skanirleýär, öz wagtlaýyn açaryny (`EReaderKey`) döredýär we sessiýa açarlaryny alýar. Munuň üçin iki tarap ilki ECDH, soňra HKDF-SHA-256 işledýär. HKDF-de duz hökmünde `SHA-256(SessionTranscriptBytes)`, maglumat setiri hökmünde bolsa `SKReader` we `SKDevice` ulanylýar. Okyjy `SessionEstablishment {eReaderKey, data}` habaryny iberýär. Bu ýerdäki `data` SKReader bilen şifrlenen `DeviceRequest` gurluşydyr.
3. **Haýyş we razylyk.** Gapjyk haýyşy açýar we soralýan elementleri adama görkezýär. Adam telefonyň gulpy bilen tassyklaýar ýa-da haýyşy ret edýär.
4. **Jogap.** Gapjyk `DeviceResponse` gurluşyny SKDevice bilen şifrlenen `SessionData` habarynda iberýär we sessiýany `20` ýagdaý kody bilen ýapýar.

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

Sessiýa habarlary AES-256-GCM bilen şifrlenýär. 12 baýtlyk IV 8 baýtlyk belgiden we 1-den başlaýan 4 baýtlyk habar sanagyjysyndan ybarat. Belgi okyjy üçin doly nollardan ybarat, enjam üçin bolsa `…01` bilen gutarýar. BLE-de telefon GATT serweriniň roluny ýerine ýetirýär. Her habar böleklere bölünýär we yzyndan başga bölek gelýän bolsa, bölegiň ilkinji baýty `0x01`, iň soňky bölekde bolsa `0x00` bolýar.

Häzirki ýagdaýa gelsek, protokolyň özeni (enjamy tanyşdyrmak, sessiýa şifrlemesi, BLE bölmek) `@tamga-network/mdoc` içinde ýazyldy we synagdan geçirildi. BLE radiosyny gapjyk programmasy üpjün edýär. Hakyky enjamlarda geçiriljek synaglar bolsa entek tamamlanmady. NFC ulanylmaýar we baglanyşyk hemişe QR koddan başlaýar. Paketleriň 0.6.0 wersiýasyndan bäri okyjy öz haýyşyna gol çekýär (okyjy tanamasy) we gapjyk bu goly gol çekilen ynam sanawyndaky ýakorlar bilen barlaýar. 0.7.0 wersiýasyndan bäri bolsa hasaba alyş sertifikaty bolmadyk haýyş onlaýn görkezişde bolşy ýaly ýüzbe-ýüz görkezişde hem ret edilýär. OpenID4VP arkaly onlaýn mdoc görkezişi SD-JWT VC bilen şol bir haýyş akymyny ulanýar.

## Barlaýjy mdoc-y nähili barlaýar?

1. `DeviceResponse` gurluşyny derňäň we `docType` bahasynyň isleýän görnüşiňiz bilen birmeňzeşdigini barlaň.
2. `issuerAuth` goluny barlaň. Diňe ES256 kabul edilýär we `x5chain` gol çekilen ynam sanawyndaky edara barmaly. Bu ýerde SD-JWT resminamalarynda ulanylýan ýakoryň edil özi ulanylýar.
3. Görkezilen her element üçin 24-nji belligiň baýtlarynyň heşini alyň we ony `valueDigests[at giňişligi][digestID]` bahasy bilen deňeşdiriň.
4. `validityInfo` meýdanyny häzirki wagta görä barlaň.
5. Bu haýyşyň ýa-da sessiýanyň SessionTranscript gurluşyny özüňiz guruň, `DeviceAuthenticationBytes` bahasyny täzeden dörediň we `deviceSignature` goluny `deviceKey` bilen barlaň.
6. Ýagdaý bitini okaň, soňra SD-JWT VC-de ulanylýan ynam, ýatyrylyş we syýasat gatlaklaryny edil şonuň ýaly işlediň.

Netije bu ýerde hem üç bahanyň biri bolýar. Resminama kabul edilýär, ret edilýär ýa-da infrastruktura baryp bolmasa "häzir barlap bolmady" netijesi berilýär. Netije obýektinde hiç haçan çig CBOR ýa-da görkezilmedik element bolmaýar.

OpenID4VP haýyşynda mdoc DCQL bilen saýlanýar ([OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive)). Munuň üçin `format: "mso_mdoc"`, `meta.doctype_value` we `[at giňişligi, element]` görnüşli meýdan ýollary ulanylýar:

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

mdoc görnüşli şahsyýet resminamasy Tamga-nyň nol bilimli ýaş subutnamasynyň hem girişidir we subutnama adaty ES256 bilen gol çekilen mdoc-larda işleýär ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)). Bu barlag Tamga Verify-da eýýäm işleýär. Onuň nähili işleýändigini [Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga) ýazgysynda düşündirdik.

## Köp berilýän soraglar

### mdoc we mDL birmeňzeşmi?

Ýok. mDL (mobil sürüjilik şahadatnamasy) mdoc formatyny ulanýan resminama görnüşleriniň diňe biridir. Tamga-nyň şahsyýet resminamasy öz docType-y we at giňişligi bolan mdoc-dyr. Tamga-nyň "sürüjilik şahadatnamasy maglumaty" resminamasy bolsa diňe SD-JWT VC görnüşinde berilýär we mDL däl.

### Näme üçin digestID-ler yzygiderli däl-de tötänleýin?

Belgiler yzygiderli bolsa, barlaýjy resminamada näçe element bardygyny we haýsy orunlaryň gizlenendigini çykaryp bilerdi. 31 bitlik tötänleýin belgiler bolsa hiç hili tertip maglumatyny göterenok.

### Tamga mdoc-yny başga ISO 18013-5 kitaphanasy bilen barlap bolýarmy?

Gurluşlar standart ISO 18013-5 we OpenID4VP 1.0 gurluşlarydyr. Şeýle-de bolsa iki zada üns bermeli. Kitaphana 24-nji belligiň baýtlarynyň heşini olary täzeden kodlamazdan, gelşi ýaly almaly. Onlaýn görkeziş üçin hem OpenID4VP el gysyşmasyny goldamaly.

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

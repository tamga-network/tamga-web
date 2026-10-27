---
title: "Tamga-da zero-knowledge: Longfellow, zynjyrlar, ynam sanawy"
slug: zero-knowledge-in-tamga
description: "Tamga Network-yň “18 ýaşdan uly” maglumatyny Longfellow zero-knowledge subutnamasy bilen nähili barlaýandygyny, zynjyrlaryň näme üçin gol çekilen ynam sanawynda durýandygyny we häzir nämäniň işleýändigini düşündirýäris."
date: 2026-10-08
lang: tk
updated: 2026-10-19
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Sources: ADR-0032 1.0.0 (plain summary; context: Longfellow open source Apache-2.0, foundation, EU age-verification profile and TS13 built on it, no trusted setup, v8 binds docType not namespace; Stage 1 measurements 518 ms / 211 ms / ~343 KB, negative tests; K1 longfellow-libzk-v1 ≥ v8; K2 circuits by digest in lotl.jws, update = list update + CHANGELOG; K3 first predicate age_over_18, equality predicates next, ranges and hiding the institution out of scope; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB not in QR; K5 fallback batch copies; K6 no revocation, short-lived, accept_unrevocable_zk; K7 device key signature over SessionTranscript, public key hidden; K8/ZK6 unique attribute names; Stage 2b Android libraries built 2026-10-07, iOS pending; Stage 2c wallet wiring, proving off until phone libraries; Stage 3 verifier WASM 889 KB pinned d5e6be77, ~3 s desktop; native backend 0.2–0.3 s; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README (entry points, circuit files ~300 KB checked against list SHA-256, iOS available() false, any wallet). guides/verify-on-server (policy example, Z1, NOT_APPLICABLE, fallback age-over-18-mdoc). SPEC-API-0001 Z1 and INDETERMINATE list. ARF architecture §2.6, §2.8. Tamga Verify policy set age-over-18-zk with accept_unrevocable_zk: true. Live 2026-10-08: verify.tamga.network/policies lists age-over-18-zk; trust.tamga.network/lotl.json zk_circuits entry (id 5a8938…3c9291, v8, 1 attribute, ACTIVE, sha256 f44ab1…0d83); zk/<id>.zst 299,999 bytes, SHA-256 matches. External: Longfellow ZK GitHub (several independent security reviews), IACR ePrint 2024/2010 "Anonymous credentials from ECDSA", Google announcement of open-sourcing, EU TS13 (exploratory; to ETSI TS 119 476-2), EU age verification blueprint. -->

Zero-knowledge subutnamasy (zero-knowledge proof) gapjyga resminama barada haýsydyr bir tassyklamany, mysal üçin "bu adam 18 ýaşdan uly" diýen tassyklamany, resminamanyň özüni görkezmezden subut etmäge mümkinçilik berýär. Tamga Network-da barlaýjy diňe hasaba alnan guramanyň şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny bilýär. Doglan senesini, beýleki meýdanlary, guramanyň goluny ýa-da enjam açaryny görmeýär. Şol bir adamyň eden iki görkezişini hem biri-birine baglanyşdyryp bolmaýar. Tamga munuň üçin Longfellow ZK-ny guramanyň eýýäm berýän [ISO mdoc](/blog/iso-mdoc-deep-dive) resminamasynyň üstünde ulanýar, şonuň üçin gurama hiç zady üýtgetmeli bolmaýar. Barlaýjy tarapy Tamga Verify-da `age-over-18-zk` syýasaty bilen eýýäm işleýär we kabul edilen subutnama zynjyrlary gol çekilen ynam sanawynda çap edilýär. Gapjyk tarapynda bolsa Android üçin ýerli kitaphana taýýar, iOS kitaphanasyna entek garaşylýar.

## Subutnama hakykatdan näme subut edýär?

18 ýaş maglumatynyň adaty görkezilişi hem doglan senesini eýýäm gizleýär, sebäbi gapjyk diňe `age_over_18` meýdanyny açýar we başga hiç zady görkezmeýär. Bu usulyň gizläp bilmeýän zady guramanyň şol meýdanyň üstünden goýan goludyr. Şol bir nusga her gezek görkezilende bu gol hem birmeňzeş galýar. Tamga her resminamany 10 nusga görnüşinde berýändigi üçin dürli barlaýjylar dürli gollary görýär. Bu usul işe ýaraýar, ýöne nusgalar wagtyň geçmegi bilen gutarýar we olary täzelemeli bolýar.

Zero-knowledge subutnamasy bolsa goly doly görünmeýän edýär. Gapjyk elindäki resminamanyň üstünde hasaplama geçirýär we bu hasaplamanyň dogry netije berendigini görkezýän subutnama döredýär. Longfellow zynjyrynyň 8-nji wersiýasynda subutnama şu maglumatlara baglanýar:

![Zero-knowledge görkezişiniň näme görkezýändigi we näme gizleýändigi](/blog/zero-knowledge-in-tamga/en/fig-gosterir.png)

- guramanyň açyk açaryna; barlaýjy bu açary ynam sanawy bilen gabat getirýär;
- resminama görnüşine (mdoc docType);
- meýdanyň adyna we bahasyna, bu mysalda `age_over_18` we `true`;
- enjam açarynyň şu sessiýanyň ýazgysynyň üstünden goýan goluna; şeýlelikde subutnama şu barlaýja we şu haýyşa baglanýar, enjamyň açyk açary bolsa gizlin galýar;
- resminamanyň subutnama döredilen pursatyndaky güýjünde bolmagyna.

Subutnamanyň baglamaýan ýeke-täk zady resminamanyň içindäki at giňişligidir (namespace). Subutnama "bu guramanyň bu görnüşdäki resminamasynda at giňişlikleriniň birinde `age_over_18 = true` ýazylan" diýen ýaly bolýar. Tamga bu boşlugy katalog düzgüni bilen ýapýar. Bir resminama görnüşinde meýdan ady diňe bir at giňişliginde bolup bilýär we shema katalogy muny gurlanda barlaýar (ZK6 düzgüni).

## Näme üçin Longfellow ZK?

Bu iş üçin birnäçe dürli çemeleşme bar. Tamga üçin kesgitleýji sorag guramalaryň resminama gol çekiş usulyny üýtgetmeli bolup-bolmajakdygydy. Karar ýazgysy saýlawlara şeýle baha berýär ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)):

| Saýlaw | Netije | Näme üçin |
|---|---|---|
| Longfellow ZK | kabul edildi | guramalar ES256 mdoc gollaryny saklaýar; ynamly gurnama (trusted setup) gerek däl; açyk çeşmeli; garaşsyz gözden geçirildi; ÝB-niň ýaş barlagy boýunça işi hem şonuň üstünde gurlan |
| BBS gollary | ret edildi | guramalar açarlaryny we gol formatyny üýtgetmeli bolardy; ÝB-niň tassyklanan sanawynda ýok |
| Diňe nusga bukjalary | ätiýaçlyk ýol hökmünde galdy | häzir işleýär, ýöne nusgalar gutarýar we her nusgada gol gaýtalanýar |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk) ECDSA bilen gol çekilen mdoc resminamalary baradaky tassyklamalary subut etmäge mümkinçilik berýär. Ol Apache-2.0 ygtyýarnamasy bilen açyk çeşme hökmünde çap edildi ([habarnama](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) makalasynda beýan edildi we birnäçe garaşsyz howpsuzlyk barlagyndan geçdi. Ynamly gurnamany talap etmeýändigi üçin kimdir biriniň gizlin bahany ýok edendigine ynanmagyňyzy talap edýän dabara hem ýok. ÝB-niň gapjyklarda arifmetik zynjyrlara esaslanýan subutnamalar üçin taýýarlan tehniki spesifikasiýa taslamasy [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) hem şol bir çemeleşmäniň üstünde guruldy. Bu spesifikasiýa entek gözleg tapgyrynda we onuň üstündäki iş ETSI-de dowam eder.

## Näme üçin zynjyrlar gol çekilen ynam sanawynda durýar?

Zynjyr subutnamanyň üstünde gurlan programmasydyr. Islendik zynjyry kabul edýän barlaýja onuň soranyndan başga zadyň subutnamasy görkezilip bilnerdi. Şonuň üçin Tamga barlaýjysy diňe toruň gözden geçiren we gol çekilen sanawlaryň sanawynda heşi we `ACTIVE` ýagdaýy bilen çap eden zynjyrlaryny kabul edýär. Näbelli ýa-da işjeň bolmadyk zynjyr ret edilýär (ZK2 düzgüni).

2026-njy ýylyň 8-nji oktýabryndaky janly ýazgy şeýle:

```json title="trust.tamga.network/lotl.json → zk_circuits (işleýär, 2026-njy ýylyň 8-nji oktýabry)"
{
  "circuit_id": "5a8938159603876eb537a117cfe9e2eaec5a01a042b316a8e57e52e4bb3c9291",
  "system": "longfellow-libzk-v1",
  "version": 8,
  "attributes": 1,
  "sha256": "f44ab1a415f284251ea6ad5451d2588c1e7011eb9ba46091116e8caa4c8e0d83",
  "status": "ACTIVE"
}
```

Zynjyr faýly sanawlar bilen bilelikde `trust.tamga.network/zk/<circuit_id>.zst` salgysynda çap edilýär. Faýl takmynan 300 KB tutýar we şahsy maglumat saklamaýar. Gapjyk faýly programmanyň içinde getirip ýa-da ýükläp alyp biler. Iki ýagdaýda hem faýly ulanmazdan öň gol çekilen sanawdaky `sha256` bahasy bilen deňeşdirýär. Şeýlelikde faýlyň nireden gelendigi nämä ynanylýandygyny üýtgetmeýär. Ýokardaky senede çap edilen faýly sanaw bilen deňeşdirdik we heşler gabat gelýär.

![Berkidilen kök barmak yzyndan kabul edilen subutnama çenli](/blog/zero-knowledge-in-tamga/en/fig-zincir.png)

Zynjyryň täzelenmegi sanawyň täzelenmegi diýmekdir. Munuň üçin täze arhitektura karary gerek däl, ýöne sanawdaky her üýtgeşmede bolşy ýaly täze gol çekilen sanaw wersiýasy çap edilýär we üýtgeşme açyk üýtgeşmeler ýazgysyna ýazylýar ([Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)).

## Barlaýjy subutnamany nähili barlaýar?

Barlaýjy paketi Longfellow-yň diňe barlag koduny WebAssembly-ä gurýar. Modul 889 KB tutýar, daşarky baglylygy ýok, berkidilen çeşme wersiýasyndan döredilýär we şol bir netijäni berjek görnüşde täzeden gurlup bilinýär. WebAssembly bilen bir barlag iş stoly kompýuterinde takmynan 3 sekunt dowam edýär. Köp mukdar üçin şol bir çeşmeden gurlan ýerli backend hem bar we barlagy takmynan 0,2–0,3 sekuntda geçirýär. Tamga Verify bu backend-i ulanýar we ýerli proses jogap bermese WebAssembly-ä geçýär. Iki ýolda hem ýalňyşlyk hiç haçan "dogry" netijesi hökmünde hasaplanmaýar.

Barlag tertibinde bu ädimiň ady `Z1` we ädim dört soraga jogap gözleýär. Zynjyr gol çekilen sanawdamy we faýlyň heşi gabat gelýärmi? Diňe soralan elementler we bir at giňişliginden açyldymy? Wagt belligi rugsat berlen aralygyň içindemi? Subutnama dogrumy? Guramanyň goly, enjam goly we güýjünde bolýan möhlet barlaglary bolsa subutnamanyň içinde geçirilýär. `Z1` ädiminden öň barlaýjy ýene jogaby açýar, docType bahasyny barlaýar we guramany ynam sanawyndan tapmak üçin guramanyň sertifikat zynjyryny okaýar ([verification API](https://docs.tamga.network/specifications/verification-api)).

## Netije haçan INDETERMINATE we haçan REJECTED bolýar?

Tamga zero-knowledge subutnamalarynda hem üç bahaly netijäni saklaýar. Barlaýjynyň tarapynda bir zat ýetmeýär diýip hiç bir resminama galp diýlip yglan edilmeýär.

![Zero-knowledge görkezişiniň netijeleri, ýagdaý boýunça](/blog/zero-knowledge-in-tamga/en/fig-sonuc.png)

| Ýagdaý | Netije |
|---|---|
| Zynjyr gol çekilen sanawda ýok ýa-da `ACTIVE` ýagdaýynda däl | `REJECTED` |
| Subutnama üýtgedilen, guramanyň açary nädogry, başga sessiýa ýa-da başga barlaýja degişli | `REJECTED` |
| Barlaýjynyň tarapynda zynjyr faýly ýa-da WebAssembly ýok | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| Subutnama dogry, syýasatda `accept_unrevocable_zk: false` | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| Subutnama dogry, syýasatda `accept_unrevocable_zk: true` | `ACCEPTED`, sebäbi bilen `NOT_APPLICABLE` ýagdaýy |

Ikinji setirdäki ret ýagdaýlary ilkinji iş stoly synagynda bilkastlaýyn barlandy. Üýtgedilen baha, nädogry gurama açary, başga sessiýanyň nonce-y, başga barlaýjy, "false" ýazylan resminamadan edilen "true" tassyklamasy, başga docType we bozulan subutnama synanyldy we olaryň hemmesi barlagdan geçip bilmedi.

## Näme üçin zero-knowledge görkezişi ýatyrylyş ýagdaýyny görkezip bilmeýär?

Ýatyrylyş ýagdaýyny barlamak üçin barlaýjy resminamanyň guramanyň [ýagdaý sanawyndaky](/blog/status-list-privacy) ornuny bilmeli. Bu orun her resminama üçin hemişelik bolany üçin, ony açmak iki görkezişi ýene-de biri-birine baglanyşdyryp bolýan ederdi. Subutnamanyň öňüni almak isleýän zady hem edil şu. Şonuň üçin zynjyr ýatyrylyş ýagdaýyny barlamaýar (ZK4 düzgüni).

Tamga-nyň bu meselä jogaby iki bölekden ybarat. Karar ÝB ARF-iniň gysga ömürli attestasiýa ýoluna eýerýär ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Zero-knowledge subutnamasy bilen edilýän görkezişler diňe şahsyýet resminamasynyň gysga ömürli nusgalary bilen geçirilýär. Bu nusgalar iň köp 24 sagat güýjünde we gapjyk olary özi täzeleýär. Resminama ýatyrylanda täze nusga berilmeýär, şonuň üçin iň soňky nusga hem iň giç bir günüň içinde ulanyp bolmaýan ýagdaýa gelýär. **Täzelenme, 2026-njy ýylyň 19-njy oktýabry:** Bu usul indi ulanylýar (paketler 0.4.0, 2026-njy ýylyň 9-njy oktýabry). Zero-knowledge subutnamasy bilen edilýän görkezişler aýry görnüşdäki gysga ömürli nusgalar bilen geçirilýär we Tamga Verify-yň `age-over-18-zk` syýasaty bu nusgalary goşmaça sazlamasyz kabul edýär. Uzak ömürli resminamanyň üstündäki subutnamalarda bolsa syýasat ýatyrylyş ýagdaýyny barlap bolmaýan görkezişi kabul edýändigini ýa-da etmeýändigini ýene aç-açan görkezmeli. Bu meýdan ýazylmasa, onuň bahasy `false` hasaplanýar. Aşakdaky köne mysalda hem ýagdaý şeýle:

```ts title="Zero-knowledge subutnamasy bilen 18 ýaşdan uly barlagy üçin syýasat"
const policy: Policy = {
  policy_id: "age-over-18-zk",
  purpose: { "en-US": "Over-18 check, yes/no only" },
  credentials: [{
    id: "identity",
    vct_values: ["urn:tamga:id:IdentityAttestation:1"],
    format: "mso_mdoc_zk",
    namespace: "tamga.id.1",
    required_claims: ["age_over_18"],
    constraints: { age_over_18: true }, // diňe deňlik
    accept_unrevocable_zk: true,        // bilip kabul et: ýatyrylyşy barlap bolmaýar
  }],
  trust: { /* … */ },
  freshness: { /* … */ },
};
```

Ýatyrylyş ýagdaýy hökman barlanmaly saýt munuň deregine adaty `mso_mdoc` syýasatyny ulanýar. Ýatyrylyşy gizlinligi bozmazdan subut etjek subutnama üçin bolsa ÝB TS13-däki ýatyrylyş tertibini anyklanda aýratyn karar kabul ediler.

## Saýt subutnamany nähili soraýar?

Haýyş [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) arkaly, TS13-däki ýaly formaty `mso_mdoc_zk` bolan DCQL soragy bilen geçirilýär. Ikinji daşaýyş ýoly brauzeriň Digital Credentials API-sidir. Barlaýjy tarapy bu ýola hem taýýar, ýöne gapjyklar entek oňa birikdirilmedi. Subutnama takmynan 350 KB tutýandygy üçin QR koduna sygmaýar. Bluetooth arkaly geçiriljek ýüzbe-ýüz barlaglar üçin bolsa karar enjamlarda geçiriljek ölçeglere garaşýar.

Tamga Verify-da zero-knowledge barlagy bilen adaty barlag iki aýry syýasat hökmünde kesgitlenen we ikisi hem `verify.tamga.network/policies` salgysynda sanalýar. Bular `age-over-18-zk` we `age-over-18-mdoc`. Adamyň gapjygy subutnama döredip bilmese, saýt bu ýola rugsat berýän bolsa, şol bir soragy adaty syýasat bilen täzeden berip biler. Adaty ýol hem diňe `age_over_18` meýdanyny açýar. Goşmaça görkezýän ýeke-täk zady adamyň nusgalarynyň birindäki guramanyň golydyr. Muny saýta nähili birikdirmelidigini [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda düşündirdik.

## Gapjyk tarapy häzir nirede?

Subutnama döretmek toruň açyk çeşmeli paketleriniň biri bolan `@tamga-network/zk` içinde ýerleşýär. Şonuň netijesinde tordaky her gapjyk şol bir subut edijini ulanýar we subutnama döretmek bir gapjygyň aýratynlygy bolmaýar. Paketiň üç giriş nokady bar. Arassa TypeScript bilen ýazylan özen DCQL soragyny subut ediljek meýdanlara öwürýär, ynam sanawyndan zynjyry saýlaýar we zynjyry heşi bilen barlaýar. React Native üçin enjamda işleýän subut ediji we synaglar hem-de laýyklyk barlaglary üçin iş stoly subut edijisi hem bar.

Gapjyk ilki sessiýa üçin adaty enjam goly bilen jogabyny döredýär. Munuň üçin enjam açary we telefonyň gulpy hemişeki ýaly ulanylýar. Subut ediji bu jogaby giriş hökmünde alýar we telefondan daşaryk diňe subutnama çykýar.

| Bölek | 2026-njy ýylyň 8-nji oktýabryndaky ýagdaýy |
|---|---|
| Barlaýjy (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | işleýär |
| Gol çekilen ynam sanawynda kabul edilen zynjyr | işleýär |
| Subut ediji paket, TypeScript özeni we iş stoly subut edijisi | taýýar |
| Android ýerli kitaphanasy (arm64-v8a, armeabi-v7a, x86_64) | guruldy |
| iOS kitaphanasy | garaşylýar; ony gurmak üçin macOS gerek |
| Enjam synaglary we enjamdaky ölçegler | programma dükanyndaky wersiýa bilen bilelikde |

iOS kitaphanasy çykýança bu paketi öz içine alýan iOS programmasy adaty görnüşde gurulýar, subut edijiniň ýokdugyny habar berýär we gapjyk resminamany adaty ýol bilen görkezýär. Tordaky gapjyklaryň biri bolan Tamga Wallet-e subut ediji goşuldy. Programmanyň Android wersiýasy subutnamany döredýär, iPhone-da bolsa iOS kitaphanasy çykýança diňe hawa/ýok meýdany iberilýär (täzelenme, 2026-njy ýylyň 19-njy oktýabry).

Göz öňüne getirmek üçin aýtsak, iş stoly kompýuterinde geçirilen ilkinji synagda subutnamany döretmek 518 ms, ony ýerli barlamak bolsa 211 ms dowam etdi. Subutnamanyň ululygy takmynan 343 KB boldy. Telefonlardaky görkezijiler enjam synaglaryndan soň çap ediler.

## Ol entek näme edip bilmeýär?

- **Diňe deňlik barlanýar.** Häzirki predikatlar `age_over_18 = true` we `age_over_15 = true` we ikisi hem şol bir zynjyr bilen subut edilýär ([ADR-0064](https://docs.tamga.network/adr/0064-age-over-15-threshold)). Nobatda `age_over_21`, raýatlyk we bilim resminamalarynda okuwa kabul edilmek ýa-da uçurym bolmak maglumaty bar we olaryň hemmesi hem deňlik barlagydyr. "Şu seneden öň doglan" ýaly aralyk barlaglary bolsa Longfellow-da entek ýok.
- **Gurama görünýän bolup galýar.** Barlaýjy resminamany haýsy guramanyň berendigini ýene bilýär. Guramanyň adyny aýtmazdan "akkreditirlenen gurama" diýmek häzirlikçe gerimden daşarda.
- **Ýatyrylyş barlagy ýok.** Ýokarda düşündirişimiz ýaly, munuň deregine iň köp 24 sagat güýjünde bolan gysga ömürli nusgalar ulanylýar (2026-njy ýylyň oktýabrynda durmuşa geçirildi). Ýatyrylyşy gizlinligi bozmazdan subut etjek subutnama bolsa ÝB-niň kararyna garaşýar.
- **Ululyk.** Her subutnama üçin takmynan 350 KB QR koduny ulanmagy aradan aýyrýar.
- **iOS** entek taýýar däl.

## Köp berilýän soraglar

### Zero-knowledge subutnamasy üçin gurama bir zady üýtgetmelimi?

Ýok. Gurama mdoc resminamalaryna öňküsi ýaly ES256 bilen gol çekmegini dowam etdirýär. Zero-knowledge subutnamasy diňe gapjykda we barlaýjyda işe girýär (ZK1 düzgüni).

### Barlaýjy 18 ýaş subutnamasyndan näme bilýär?

Hasaba alnan guramanyň şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny we subutnamanyň şu sessiýa üçin döredilendigini bilýär. Mundan başga hiç zat bilmeýär. Doglan senesini, başga meýdany, gol bahasyny ýa-da enjam açaryny görmeýär.

### Iki saýt şol bir adamyň ikisine hem ýaşyny subut edendigini bilip bilermi?

Subutnama seredip bilip bilmez. Her subutnama täzeden döredilýär we görkezişleriň arasynda gaýtalanýan hemişelik bahany saklamaýar.

### Zero-knowledge barlagy eýýäm işleýärmi?

Barlaýjy tarapy Tamga Verify-da `age-over-18-zk` syýasaty bilen işleýär. Gapjyklara bolsa subut ediji gerek. Android kitaphanasy taýýar, iOS kitaphanasyna garaşylýar.

### Gapjygym subutnama döredip bilmese näme bolýar?

Saýt rugsat berýän bolsa, şol bir soragy adaty barlag bilen täzeden berýär. Bu ýagdaýda gapjygyňyz nusgalaryňyzyň birinden diňe `age_over_18` meýdanyny açýar.

## Çeşmeler

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [Anonymous credentials from ECDSA (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Ýaş barlagy üçin zero-knowledge subutnama kitaphanalarynyň açyk çeşmä çykarylmagy (yglan)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [ÝB tehniki spesifikasiýasy TS13: arifmetiki zynjyrlara esaslanýan zero-knowledge subutnamalary (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [ÝB ýaş barlagy taslamasy](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: zero-knowledge subutnamalary](https://docs.tamga.network/adr/0032-zk-mdoc-presentation) · [Serweriňizde barlaň: zero-knowledge ýaş barlagy](https://docs.tamga.network/guides/verify-on-server) · [Verification API](https://docs.tamga.network/specifications/verification-api)
- [Tamga ARF: arhitektura (§2.6, §2.8)](https://arf.tamga.network/architecture) · [Zero-knowledge subutnamalary](/learn/zero-knowledge-proofs) · [Baglanyşyksyzlyk](/learn/unlinkability)

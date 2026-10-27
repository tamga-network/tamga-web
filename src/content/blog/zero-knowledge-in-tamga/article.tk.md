---
title: "Tamga-da zero-knowledge: Longfellow, zynjyrlar, ynam sanawy"
slug: zero-knowledge-in-tamga
description: "Tamga Network “18 ýaşdan uly” barlagyny Longfellow zero-knowledge subutnamasy bilen nähili geçirýär, zynjyrlar näme üçin gol çekilen ynam sanawynda durýar we häzir näme işleýär."
date: 2026-10-08
lang: tk
updated: 2026-10-19
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Sources: ADR-0032 1.0.0 (plain summary; context: Longfellow open source Apache-2.0, foundation, EU age-verification profile and TS13 built on it, no trusted setup, v8 binds docType not namespace; Stage 1 measurements 518 ms / 211 ms / ~343 KB, negative tests; K1 longfellow-libzk-v1 ≥ v8; K2 circuits by digest in lotl.jws, update = list update + CHANGELOG; K3 first predicate age_over_18, equality predicates next, ranges and hiding the institution out of scope; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB not in QR; K5 fallback batch copies; K6 no revocation, short-lived, accept_unrevocable_zk; K7 device key signature over SessionTranscript, public key hidden; K8/ZK6 unique attribute names; Stage 2b Android libraries built 2026-10-07, iOS pending; Stage 2c wallet wiring, proving off until phone libraries; Stage 3 verifier WASM 889 KB pinned d5e6be77, ~3 s desktop; native backend 0.2–0.3 s; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README (entry points, circuit files ~300 KB checked against list SHA-256, iOS available() false, any wallet). guides/verify-on-server (policy example, Z1, NOT_APPLICABLE, fallback age-over-18-mdoc). SPEC-API-0001 Z1 and INDETERMINATE list. ARF architecture §2.6, §2.8. Tamga Verify policy set age-over-18-zk with accept_unrevocable_zk: true. Live 2026-10-08: verify.tamga.network/policies lists age-over-18-zk; trust.tamga.network/lotl.json zk_circuits entry (id 5a8938…3c9291, v8, 1 attribute, ACTIVE, sha256 f44ab1…0d83); zk/<id>.zst 299,999 bytes, SHA-256 matches. External: Longfellow ZK GitHub (several independent security reviews), IACR ePrint 2024/2010 "Anonymous credentials from ECDSA", Google announcement of open-sourcing, EU TS13 (exploratory; to ETSI TS 119 476-2), EU age verification blueprint. -->

Zero-knowledge subutnamasy (nol bilimli subutnama) gapjyga resminamanyň özüni görkezmezden ol hakda "bu adam 18 ýaşdan uly" ýaly bir tassyklamany subut etmäge mümkinçilik berýär. Tamga Network-da barlaýjy diňe hasaba alnan guramanyň şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny öwrenýär. Ol doglan senesini, beýleki meýdanlary, guramanyň goluny ýa-da enjam açaryny görmeýär we şol bir adamyň iki görkezişini baglanyşdyryp bolmaýar. Tamga Longfellow ZK-ny guramanyň bar bolan [ISO mdoc](/blog/iso-mdoc-deep-dive) resminamasynyň üstünde ulanýar, şonuň üçin gurama hiç zady üýtgetmeýär. Barlaýjy tarapy Tamga Verify-da işleýär (`age-over-18-zk` syýasaty); kabul edilen subutnama zynjyrlary gol çekilen ynam sanawynda çap edilen; gapjyk tarapynda Android ýerli kitaphanasy taýýar, iOS kitaphanasy garaşylýar.

## Subutnama hakykatdan näme subut edýär?

18 ýaşdan uly meýdanynyň adaty görkezişi doglan senesini eýýäm gizleýär: gapjyk bir meýdany, `age_over_18`-i açýar we başga hiç zady açmaýar. Onuň gizläp bilmeýän zady guramanyň şol meýdanyň üstündäki golydyr we şol bir nusga her görkezilende ol gol birmeňzeşdir. Tamga her resminamany 10 nusga hökmünde berýär, şonuň üçin dürli barlaýjylar dürli gollary görýär. Bu işleýär, ýöne nusgalar gutarýar we olary täzelemeli bolýar.

Zero-knowledge subutnamasy goly gözden doly aýyrýar. Gapjyk özündäki resminamanyň üstünde hasaplama geçirýär we hasaplamanyň dogry çykandygynyň subutnamasyny döredýär. Longfellow zynjyrynyň 8-nji wersiýasy bilen subutnama şulary baglaýar:

![Zero-knowledge görkezişiniň näme görkezýändigi we näme gizleýändigi](/blog/zero-knowledge-in-tamga/en/fig-gosterir.png)

- guramanyň açyk açary, barlaýjy ony ynam sanawy bilen gabat getirýär;
- resminama görnüşi (mdoc docType);
- meýdanyň ady we bahasy, bu ýerde `age_over_18` we `true`;
- şu sessiýanyň ýazgysynyň (transcript) üstünden enjam açarynyň goly, şeýlelikde subutnama şu barlaýja we şu haýyşa baglanýar, enjamyň açyk açarynyň özi bolsa gizlin galýar;
- subut edilýän pursatda resminamanyň güýjünde bolmagy.

Onuň baglamaýan zady resminamanyň içindäki at giňişligidir (namespace). Subutnama "bu guramanyň şu görnüşdäki resminamasynda haýsydyr bir at giňişliginde `age_over_18 = true` bar" diýýär. Tamga bu boşlugy katalog düzgüni bilen ýapýar: bir resminama görnüşiniň içinde meýdan ady diňe bir at giňişliginde bolup biler we shema katalogy muny gurlanda barlaýar (ZK6 düzgüni).

## Näme üçin Longfellow ZK?

Birnäçe çemeleşme bar. Tamga üçin çözüji sorag guramalaryň gol çekiş usulyny üýtgetmeli bolup-bolmajakdygydy. Karar ýazgysy olary deňeşdirýär ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)):

| Görnüş | Netije | Näme üçin |
|---|---|---|
| Longfellow ZK | kabul edildi | guramalar ES256 mdoc gollaryny saklaýar; ynamly gurnama (trusted setup) ýok; açyk çeşmeli; garaşsyz gözden geçirilen; ÝB-niň ýaş barlagy boýunça işi onuň üstünde gurulýar |
| BBS gollary | ret edildi | guramalar açarlary we gol formatyny üýtgetmeli bolardy; ÝB-niň tassyklanan sanawynda ýok |
| Diňe toplum nusgalary | ätiýaçlyk hökmünde saklandy | häzir işleýär, ýöne nusgalar gutarýar we gol her nusgada gaýtalanýar |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk) ECDSA bilen gol çekilen mdoc resminamalary hakda tassyklamalary subut edýär. Ol Apache-2.0 boýunça açyk çeşme hökmünde çykaryldy ([yglan](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) makalasynda beýan edilen we birnäçe garaşsyz howpsuzlyk gözden geçirişinden geçdi. Oňa ynamly gurnama gerek däl, şonuň üçin kimiňdir ony ýok edendigine ynanmaly gizlin dabara ýok. ÝB-niň gapjyklarda arifmetiki zynjyr subutnamalary üçin taslama tehniki spesifikasiýasy [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) şol bir çemeleşmäniň töwereginde ýazylan we henizem gözleg häsiýetinde; onuň indiki işi ETSI-ä geçýär.

## Näme üçin zynjyrlar gol çekilen ynam sanawynda sanalýar?

Zynjyr (circuit) subutnamanyň degişli bolan programmasydyr. Islendik zynjyry kabul edýän barlaýja onuň soranyndan başga bir zadyň subutnamasyny görkezip bolardy. Şonuň üçin Tamga barlaýjysy diňe toruň gözden geçiren we gol çekilen ynam sanawlarynyň sanawynda heşi bilen, `ACTIVE` ýagdaýynda çap eden zynjyrlaryny kabul edýär. Näbelli ýa-da işjeň däl zynjyr ret edilýär (ZK2 düzgüni).

2026-njy ýylyň 8-nji oktýabryndaky işleýän ýazgy şu:

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

Zynjyr faýlynyň özi sanawlaryň ýanynda `trust.tamga.network/zk/<circuit_id>.zst` salgysynda çap edilen, takmynan 300 KB we onda şahsy maglumat ýok. Gapjyk ony programmanyň içinde berip ýa-da ýükläp biler; islendik ýagdaýda ulanmazdan öň faýly gol çekilen sanawdaky `sha256` bilen barlaýar, şonuň üçin faýlyň nireden gelendigi nämä ynanylýandygyny üýtgetmeýär. Biz ýokarky senede çap edilen faýly sanaw bilen barladyk we heşler gabat gelýär.

![Berkidilen kök barmak yzyndan kabul edilen subutnama çenli](/blog/zero-knowledge-in-tamga/en/fig-zincir.png)

Zynjyry täzelemek sanawy täzelemekdir. Oňa täze arhitektura karary gerek däl, ýöne ol sanawdaky beýleki üýtgeşmeler ýaly täze gol çekilen sanaw wersiýasy hökmünde çap edilýär we açyk üýtgeşme žurnalyna ýazylýar ([Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)).

## Barlaýjy subutnamany nähili barlaýar?

Barlaýjy paketi Longfellow-yň diňe barlag koduny WebAssembly-ä terjime edýär. Modul 889 KB, daşarky baglylygy ýok, berkidilen esasy çeşme commit-inden gurulýar we ony gaýtadan birmeňzeş gurup bolýar. WebAssembly-de barlag iş stoly kompýuterinde takmynan 3 sekunt alýar. Köp mukdar üçin şol bir çeşmeden gurlan, takmynan 0,2–0,3 sekunt alýan ýerli (native) backend bar; Tamga Verify ony ulanýar we ýerli proses jogap bermese WebAssembly-ä geçýär. Islendik ýolda ýalňyşlyk hiç haçan "dogry" hasaplanmaýar.

Barlag hatarynda bu `Z1` ädimidir. Ol dört zady soraýar: zynjyr gol çekilen sanawdamy we faýlyň heşi gabat gelýärmi; diňe soralan elementler bir at giňişliginden açyldymy; wagt belligi öz aralygynyň içindemi; subutnama dogrumy. Guramanyň golunyň, enjam golunyň we güýjünde bolýan döwrüň adaty barlaglary subutnamanyň içinde geçirilýär. `Z1`-den öň barlaýjy henizem jogaby açýar, docType-y barlaýar we guramany ynam sanawynda tapmak üçin guramanyň sertifikat zynjyryny okaýar ([verification API](https://docs.tamga.network/specifications/verification-api)).

## Netije haçan INDETERMINATE we haçan REJECTED bolýar?

Tamga zero-knowledge üçin hem üç bahaly netijäni saklaýar: barlaýjynyň tarapynda bir zat ýetmändigi üçin resminama hiç haçan galp diýilmeýär.

![Zero-knowledge görkezişiniň netijeleri, ýagdaý boýunça](/blog/zero-knowledge-in-tamga/en/fig-sonuc.png)

| Ýagdaý | Netije |
|---|---|
| Zynjyr gol çekilen sanawda ýok ýa-da `ACTIVE` däl | `REJECTED` |
| Subutnama üýtgedilen, guramanyň açary nädogry, başga sessiýa ýa-da başga barlaýjy | `REJECTED` |
| Barlaýjynyň tarapynda zynjyr faýly ýa-da WebAssembly ýok | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| Dogry subutnama, syýasatda `accept_unrevocable_zk: false` | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| Dogry subutnama, syýasatda `accept_unrevocable_zk: true` | `ACCEPTED`, sebäbi bilen `NOT_APPLICABLE` ýagdaýy |

Ikinji setirdäki ret etmeler ilkinji iş stoly synagynda bilkastlaýyn synagdan geçirildi: üýtgedilen baha, nädogry gurama açary, başga sessiýanyň nonce bahasy, başga barlaýjy, "false" diýen resminamadan "true" talap etmek, başga docType we zaýalanan subutnama — hemmesi şowsuz boldy.

## Näme üçin zero-knowledge görkezişi ýatyrylyşy görkezip bilmeýär?

Ýatyrylyşy barlamak üçin barlaýja resminamanyň guramanyň [ýagdaý sanawyndaky](/blog/status-list-privacy) orny gerek. Ol orun her resminama üçin kesgitli, şonuň üçin ony açmak iki görkezişi ýene baglanyşdyrylýan ederdi; subutnama hut şonuň öňüni almak üçin bar. Şonuň üçin zynjyr ýatyrylyşy barlamaýar (ZK4 düzgüni).

Tamga-nyň jogaby iki bölekden ybarat. Karar ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies), ÝB ARF-iň gysga ömürli attestasiýa ýoly) zero-knowledge görkezişiniň diňe şahsyýet resminamasynyň iň köp 24 sagat güýjünde bolan we gapjygyň özi tarapyndan täzelenýän gysga ömürli nusgalaryny ulanmagydyr; resminama ýatyrylandan soň täze nusga berilmeýär, şonuň üçin soňkusy bir günüň içinde işlemegini bes edýär. **Täzelenme, 2026-njy ýylyň 19-njy oktýabry:** bu indi durmuşa geçirildi (0.4.0 paketleri, 2026-njy ýylyň 9-njy oktýabry). Zero-knowledge görkezişleri aýry resminama görnüşiniň gysga ömürli nusgalaryny ulanýar we Tamga Verify-yň `age-over-18-zk` syýasaty olary goşmaça baýdaksyz kabul edýär. Uzak ömürli resminamanyň üstündäki subutnama üçin syýasat henizem ýatyrylyşyny barlap bolmaýan görkezişi kabul edýändigini ýa-da etmeýändigini aç-açan aýtmaly; meýdan ýazylmasa, şu öňki mysaldaky ýaly `false` hasaplanýar:

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

Ýatyrylyş barlanmaly saýt onuň ýerine adaty `mso_mdoc` syýasatyny ulanýar. Gizlin ýatyrylyş subutnamasy ÝB TS13 üçin ýatyrylyş shemasyny kesgitländen soň öz kararyny alar.

## Saýt subutnamany nähili soraýar?

Haýyş TS13-däki ýaly formaty `mso_mdoc_zk` bolan DCQL soragy bilen [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)-ni ulanýar; brauzeriň Digital Credentials API-si ikinji ulag ýoludyr (barlaýjy tarapynda taýýar; gapjyklar oňa entek birikdirilmedi). Subutnama takmynan 350 KB, şonuň üçin ony QR kodunda göterip bolmaýar. Bluetooth arkaly ýüzbe-ýüz barlaglar üçin karar enjamdaky ölçeglere garaşýar.

Tamga Verify-da zero-knowledge we adaty barlaglar iki aýry syýasatdyr, ikisi hem `verify.tamga.network/policies` salgysynda sanalýar: `age-over-18-zk` we `age-over-18-mdoc`. Adamyň gapjygy subutnama döredip bilmese, saýt bu ýola rugsat berýän bolsa, adaty syýasat bilen ýene sorap biler. Şol adaty ýol hem diňe `age_over_18` meýdanyny açýar; onuň goşýan zady adamyň nusgalarynyň biriniň üstündäki guramanyň golydyr. Muny saýta nähili birikdirmelidigi [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda.

## Gapjyk tarapy häzir nirede?

Subutnama döretmek açyk tor paketi bolan `@tamga-network/zk`-dir, şeýlelikde toruň her gapjygy şol bir subut edijini ulanýar; bu bir gapjygyň aýratynlygy däl. Paketiň üç giriş nokady bar: DCQL soragyny subut ediljek meýdanlara öwürýän, ynam sanawyndan zynjyry saýlaýan we ony heş bilen barlaýan arassa TypeScript özeni; React Native üçin enjamdaky subut ediji; synaglar we laýyklyk barlaglary üçin iş stoly subut edijisi.

Gapjyk ilki sessiýa üçin hemişeki ýaly enjam açary we telefon gulpy bilen adaty enjam gol çekilen jogabyny döredýär. Subut ediji şol jogaby giriş hökmünde alýar we telefondan diňe subutnama çykýar.

| Bölek | 2026-njy ýylyň 8-nji oktýabryndaky ýagdaýy |
|---|---|
| Barlaýjy (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | işleýär |
| Gol çekilen ynam sanawyndaky kabul edilen zynjyr | işleýär |
| Subut ediji paket, TypeScript özeni we iş stoly subut edijisi | taýýar |
| Android ýerli kitaphanasy (arm64-v8a, armeabi-v7a, x86_64) | guruldy |
| iOS kitaphanasy | garaşylýar; ony gurmak üçin macOS gerek |
| Enjam synagy we enjamdaky ölçegler | programma dükanyna çykarylanda |

iOS kitaphanasy bolýança, paketli iOS programmasy adaty gurulýar we subut edijiniň ýokdugyny habar berýär, gapjyk bolsa adaty ýol bilen görkezýär. Toruň gapjyklarynyň biri bolan Tamga Wallet-de subut ediji birikdirilen; onuň Android gurluşy subutnamany döredýär, iPhone-da bolsa iOS kitaphanasy bolýança diňe hawa/ýok meýdanyny iberýär (täzelenme, 2026-njy ýylyň 19-njy oktýabry).

Ululyk barada düşünje bermek üçin: iş stoly kompýuterindäki ilkinji synagda subutnamany döretmek 518 ms, ony ýerli barlamak 211 ms aldy, subutnama takmynan 343 KB boldy. Telefon görkezijileri enjam synaglaryndan soň çap ediler.

## Ol entek näme edip bilmeýär?

- **Diňe deňlik.** Häzirki şertler (predicate) şol bir zynjyr bilen subut edilýän `age_over_18 = true` we `age_over_15 = true` ([ADR-0064](https://docs.tamga.network/adr/0064-age-over-15-threshold)). Indiki nobatda `age_over_21`, raýatlyk we bilim resminamalarynda okaýandygy ýa-da uçurandygy, hemmesi deňlik barlaglary. Aralyklar ("şu seneden öň doglan") entek Longfellow-da ýok.
- **Gurama görünýär.** Barlaýjy resminamany haýsy guramanyň berendigini henizem öwrenýär. "Haýsydyr bir akkreditasiýaly gurama" diýip, ony atlandyrman subut etmek häzirlikçe gerimden daşarda.
- **Ýatyrylyş barlagy ýok**, ýokarda düşündirilişi ýaly; onuň ornuny iň köp 24 sagatlyk gysga ömürli nusgalar tutýar (2026-njy ýylyň oktýabrynda durmuşa geçirildi), gizlin ýatyrylyş subutnamasy bolsa ÝB-ä garaşýar.
- **Ululyk.** Her subutnama üçin takmynan 350 KB QR kodlaryny aradan aýyrýar.
- **iOS** entek taýýar däl.

## Köp berilýän soraglar

### Zero-knowledge subutnamalary üçin gurama bir zady üýtgetmelimi?

Ýok. Gurama öňküsi ýaly mdoc resminamalaryna ES256 bilen gol çekmegini dowam etdirýär. Zero-knowledge diňe gapjykda we barlaýjyda ýaşaýar (ZK1 düzgüni).

### Barlaýjy 18 ýaşdan uly subutnamasyndan näme öwrenýär?

Hasaba alnan guramanyň şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny we subutnamanyň şu sessiýa üçin edilendigini. Başga hiç zat: doglan senesi ýok, başga meýdan ýok, gol bahasy ýok, enjam açary ýok.

### Iki saýt şol bir adamyň ikisine hem ýaşyny subut edendigini bilip bilermi?

Subutnamadan bilip bilmez. Her subutnama täze we onda görkezişleriň arasynda gaýtalanýan kesgitli baha ýok.

### Zero-knowledge barlagy işleýärmi?

Barlaýjy tarapy Tamga Verify-da `age-over-18-zk` syýasaty bilen işleýär. Gapjyklara subut ediji gerek: Android kitaphanasy taýýar, iOS garaşylýar.

### Gapjygym subutnama döredip bilmese näme bolýar?

Saýt rugsat berýän bolsa, ol adaty barlag bilen ýene soraýar. Şonda gapjygyňyz nusgalaryňyzyň birinden diňe `age_over_18` meýdanyny açýar.

## Çeşmeler

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [Anonymous credentials from ECDSA (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Ýaş barlagy üçin zero-knowledge subutnama kitaphanalarynyň açyk çeşmä çykarylmagy (yglan)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [ÝB tehniki spesifikasiýasy TS13: arifmetiki zynjyrlara esaslanýan zero-knowledge subutnamalary (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [ÝB ýaş barlagy taslamasy](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: zero-knowledge subutnamalary](https://docs.tamga.network/adr/0032-zk-mdoc-presentation) · [Serweriňizde barlaň: zero-knowledge ýaş barlagy](https://docs.tamga.network/guides/verify-on-server) · [Verification API](https://docs.tamga.network/specifications/verification-api)
- [Tamga ARF: arhitektura (§2.6, §2.8)](https://arf.tamga.network/architecture) · [Zero-knowledge subutnamalary](/learn/zero-knowledge-proofs) · [Baglanyşyksyzlyk](/learn/unlinkability)

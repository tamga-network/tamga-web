---
title: "Gol çekilen ynam sanawy nähili işleýär: hasaba alnyşdan barlaga çenli"
slug: how-trust-lists-work
description: "Tamga Network-yň gol çekilen ynam sanawlaryny düşündirýäris: iki derejäni, goly, çap ediş tertibini, täzeligi, labyr žurnalyny we barlaýjynyň ädimme-ädim näme barlaýandygyny."
date: 2026-10-08
lang: tk
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Sources: SPEC-TRUST-0001 1.0.0 (§1 principles: JWS ES256 x5c, .json for humans only, version + previous_version_hash, next_update ≤ 90 days, change within 24 h, anchors hourly; §2 file layout; §3 lotl fields; §4 tl fields, issuer entry, status vocabulary, record never removed; §5 anchor log, checkpoint at 500 lines; §6 loader order, environment, YES/NO/UNKNOWN; §8 TL1–TL12; security notes: single operator signature, public log, CHANGELOG, quarterly transparency report, audit; open issues: ETSI XML export, ≥2 rolling keys + KMS before the pilot). SPEC-API-0001 §1 (A3b issuerId from certificate, C1/C2 at iat, C2 cannot be skipped, C3, D5 anchor check), §2.1 three results. Guides join-as-institution (registrar, 24 h, WRPRC), sandbox (environment: sandbox). Live files checked 2026-10-08 and 2026-10-23 (anchor_signing_keys: one ACTIVE entry): lotl.json/tl-tr.json list_format_version 1.0, operator.status provisional, next_update 90 days after issued_at, one anchor signing key. External: EU LOTL XML, CID (EU) 2015/1505, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List draft. -->

Gol çekilen ynam sanawy sanaw operatorynyň gol çeken faýlydyr. Haýsy guramanyň haýsy resminama görnüşini berip biljekdigi, haýsy barlaýjylaryň hasaba alnandygy we haýsy gapjyk üpjün edijileriniň ykrar edilýändigi şu faýlda ýazylýar. Tamga Network bu sanawlary iki derejede çap edýär. Ýokarda sanawlaryň sanawy (`lotl.jws`), aşakda bolsa Türkiýe üçin ýurt sanawy (`tl-tr.jws`) ýerleşýär. Barlaýjy başda diňe bir kök barmak yzyna ynanýar. Sanawlaryň goluny, wersiýa zynjyryny we täzeligini barlandan soň her resminama üçin bir sorag berýär: Bu gurama resminama gol çeken pursaty hasaba alnanmydy we şu resminama görnüşini bermäge ygtyýarlymydy?

## Sanawlaryň iki derejesi näme?

Bu model ÝB-den gelýär. Ýewropa Komissiýasy agza döwletleriň ynam sanawlaryny görkezýän sanawy çap edýär ([ÝB LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)). Her döwlet hem öz milli sanawyny [(ÝB) 2015/1505 Ýerine ýetiriş kararynda](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) we ETSI TS 119 612-de kesgitlenen formatda çap edýär. Tamga hem şol gurluşy ulanýar:

| Sanaw | Içinde näme bar | Salgy |
|---|---|---|
| Ynam sanawlarynyň sanawy (LOTL) | ýurt sanawlarynyň salgylary we gol açarlary, gapjyk üpjün edijiler, shema katalogy, kabul edilen zero-knowledge zynjyrlary (circuit) | `trust.tamga.network/lotl.jws` |
| Ýurt sanawy | şol ýurduň kök sertifikatlary, guramalary we barlaýjylary | `trust.tamga.network/tl-tr.jws` |

![Berkidilen kök barmak yzyndan LOTL we ýurt sanawy arkaly gurama ýazgysyna we resminama çenli](/blog/how-trust-lists-work/en/fig-zincir.png)

Zynjyr barlaýjynyň elinde eýýäm bar bolan maglumat bilen başlaýar. Bu LOTL-a gol çekýän sertifikatyň SHA-256 barmak yzy bolup, ol barlaýjynyň sazlamalaryna girizilen. Barmak yzy [tamga.network/trust-anchor](https://tamga.network/trust-anchor) salgysynda hem çap edilýär. Sanaw serweriniň özüne bolsa ynanylmaýar. Sanawyň kabul edilmegi üçin onuň dogry salgydan ýüklenmegi ýeterlik däl, onuň goly hem şu barmak yzyna gabat gelmeli.

LOTL hem her ýurt sanawyna kimiň gol çekýändigini görkezýär. Häzir işjeň ýeke-täk sanaw Türkiýe sanawy we Tamga ony milli edaranyň adyndan wagtlaýyn dolandyrýar. Maglumat gurluşlarynda beýleki döwletler üçin hem eýýäm ýer bölünip goýuldy.

## Guramanyň ýazgysynda näme bar?

> **Bellik:** Aşakdaky mysal ýönekeýleşdirildi. Gurama hakyky däl, belgiler we barmak yzlary gysgaldyldy we käbir meýdanlar aýryldy. Hakyky formaty [ynam sanawy spesifikasiýasynda](https://docs.tamga.network/specifications/trust-lists) tapyp bilersiňiz.

```json title="Ýönekeýleşdirilen mysal: tl-tr-däki bir gurama ýazgysy"
{
  "issuer_id": "0x5be1…",
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "cert_fingerprint_sha256": "a41f…",
  "status": "ACTIVE",
  "valid_from": "2026-10-01T00:00:00Z",
  "valid_until": "2028-10-01T00:00:00Z",
  "status_history": [
    { "status": "ACTIVE", "since": "2026-10-01T00:00:00Z", "reason": "initial-registration" }
  ],
  "schema_authorizations": [
    {
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "allowed": true,
      "valid_from": "2026-10-01T00:00:00Z",
      "valid_until": null
    }
  ],
  "status_list_base": "https://status.tamga.network/"
}
```

Bu ýazgyda esasy işi birnäçe meýdan ýerine ýetirýär:

- `issuer_id` guramanyň sertifikatynyň barmak yzyndan hasaplanýar. Şonuň üçin gurama bu bahany özi saýlap bilmeýär, başga biri hem ony göçürip bilmeýär.
- `class` guramanyň haýsy görnüşli resminama berýändigini görkezýär. Döwlet edarasynyň resminamasy üçin `PUB`, kwalifisirlenen resminama üçin `QUALIFIED`, adaty attestasiýa üçin `EAA` ulanylýar. `assurance` bolsa guramanyň `I1`-den `I3`-e çenli ynamlylyk derejesidir.
- `schema_authorizations` guramanyň berip bilýän resminama görnüşlerini olaryň her biriniň öz wagt aralygy bilen sanaýar. Güýjünde ýazgysy bolan bilet satyjy hem barlagdan geçjek diplom berip bilmeýär.
- `status_history` meýdanyna diňe täze setir goşulýar we köne setirler hiç haçan üýtgedilmeýär.

Ýazgyda bolmadyk maglumatlar hem bilkastlaýyn daşarda galdyryldy. Ýazgyda talybyň ady, resminamanyň heşi ýa-da resminamalaryň sany ýok. Düzgüne görä hiç bir sanawda, labyr žurnalynda ýa-da üýtgeşmeler ýazgysynda şahsy maglumat bolup bilmez (TL11).

## Gurama sanawa nähili girýär?

Gurama hasaba alyş maglumatlaryny we sertifikata gol çekmek haýyşyny iberip ýüz tutýar. Hasaba alyş edarasy arzany barlaýar we ýetmeýän meýdanlaryň hemmesini bir gezekde habar berýär. Soňra kök sertifikat edarasy guramanyň sertifikatyna gol çekýär, gurama sanawa goşulýar we sanawa täzeden gol çekilýär. Üýtgeşme 24 sagadyň içinde güýje girýär. Bu ädimleri guramanyň nukdaýnazaryndan [Gurama Tamga Network-a nähili goşulýar](/blog/join-as-an-institution) ýazgysynda düşündirdik.

Çap ediji her çap edilişde her barlaýjy ulanylyşy we her gurama üçin hasaba alyş sertifikatyny (ETSI TS 119 475) hem döredýär we olary `trust.tamga.network/wrprc/` bölüminde ýerleşdirýär. Bu sertifikatlaryň mazmuny diňe gol çekilen sanawdan gelýändigi üçin gapjyk barlaýjynyň hasaba alnyşyny şu sertifikat bilen hem barlap bilýär. 2026-njy ýylyň 29-njy oktýabryndan bäri her sertifikat öz syýasatyny hem atlandyrýar (öz belgisi bilen [hasaba alyş sertifikatynyň syýasaty](https://arf.tamga.network/policies/registration-certificate)) we her sagatda täzeden gol çekilýän bir bitlik ýagdaý sanawyna salgylanýar: `trust.tamga.network/status/wrprc/1`. Gapjyk ýatyrylan sertifikaty ret edýär, ýagdaýy barlap bolmasa adamy duýdurýar.

## Sanawa nähili gol çekilýär we ol nähili çap edilýär?

Her sanaw ES256 bilen gol çekilen ykjam JWS bolup, onuň başlygyndaky `x5c` meýdanynda operatoryň sertifikaty bolýar. Sanawyň ýanynda adamlaryň okap bilmegi üçin `.json` nusgasy hem durýar. Programma üpjünçiligi bolsa diňe `.jws` faýlyny ulanýar.

Sanawyň taryhyny dogruçyl saklaýan üç düzgün bar:

1. **Wersiýa belgisi diňe artýar.** Köne wersiýany täze ýaly edip ýene hödürläp bolmaýar.
2. **Her wersiýa öňküsiniň heşini göterýär** (`previous_version_hash`). Şeýlelikde wersiýalar zynjyr emele getirýär we aradaky boşluk ýa-da soňra edilen üýtgeşme derrew görünýär.
3. **Hiç zat pozulmaýar.** Tordan çykan gurama sanawda täze ýagdaý bilen galmagyny dowam etdirýär, köne wersiýalar bolsa `archive/` bölüminde saklanýar.

![Her faýlyň haçan çap edilýändigi we oňa degişli düzgün](/blog/how-trust-lists-work/en/fig-yayin.png)

Sanawlara hiç zat üýtgemese-de iň giç 90 günden bir täzeden gol çekilýär. Şeýlelikde okaýan adam uzak wagtlap üýtgemedik sanawy taşlanan sanawdan tapawutlandyryp bilýär. Şol ýerde duran açyk `CHANGELOG.md` faýly hem her çap edilişi ýazga geçirýär.

## Labyr žurnaly näme üçin gerek?

Käbir maglumatlar şeýle ýygy üýtgeýär welin, her üýtgeşmede tutuş sanawa täzeden gol çekmek kyn bolardy. Olaryň başynda guramalaryň çap edýän ýatyrylyş sanawlary durýar. Bu maglumatlar labyr žurnalyna, ýagny `anchors.jsonl` faýlyna ýazylýar. Žurnalda her waka üçin gol çekilen bir setir bolýar we her setir öňki setire onuň heşi arkaly baglanýar.

Mysal üçin, setir guramanyň ýatyrylyş sanawynyň N-nji wersiýasyny belli bir mazmun heşi bilen çap edendigini ýazga alýar. Barlaýjy soňra şol ýatyrylyş sanawyny okanda sanawyň heşini labyrdaky heş bilen deňeşdirýär. Heş gabat gelmese ýa-da wersiýa yza giden bolsa, resminama barlagdan geçmeýär. Barlaýjynyň elindäki nusga diňe iň täze labyrdan köne bolsa, netije nusga täzelenýänçä "häzir barlap bolmady" bolýar. Barlaýjy ýatyrylyş sanawynyň hakykatdan hem guramadan gelendigini we köne wersiýa bilen çalşyrylmandygyny şu ýol bilen bilýär.

Žurnala sagatda azyndan bir setir ýazylýar we şol sagatda başga waka bolmadyk bolsa, bu setir ýaşaýyş alamaty (heartbeat) setiri bolýar. Žurnal 500 setirden geçende operator setirleri arhiwe geçirýär we täze žurnaly gol çekilen gözegçilik nokady bilen başlaýar. Bu gözegçilik nokady arhiwiň iň soňky setirine we arhiw faýlynyň heşine baglanýar. Hiç bir setir pozulmaýandygy üçin tutuş taryhy arhiwlerden täzeden dikeldip bolýar.

## Sanaw näçe täze bolmaly?

Her sanaw `next_update` senesini göterýär. Hyzmatlar sanawlary yzygiderli aralyklarda täzeden ýükleýär, barlaýjylar bolsa ýatyrylyş sanawlaryny öňünden ýükläp, keşde saklaýar. Barlag pursatynda hiç zat ýüklenmeýär we guramanyň öz resminamalarynyň nirede görkezilýändigini hiç haçan bilip bilmeýändiginiň sebäbi hem şudur ([Yzarlamasyz ýatyrylyş](/blog/status-list-privacy)).

Sanawy alyp bolmasa ýa-da `next_update` senesi geçen bolsa, barlaýjy çaklama etmeýär. Bu ýagdaýda netije "häzir barlap bolmady" (`INDETERMINATE`) bolýar we resminama ne kabul edilen, ne-de ret edilen hasaplanýar (TL5). Serwere baryp bolmady diýip hiç bir diplom galp diýlip yglan edilmeýär.

## Barlaýjy ädimme-ädim näme barlaýar?

Barlaglar iki topara bölünýär. Birinji topar sanawlar ýüklenende geçirilýär:

![Ynam sanawy ýüklenende näme barlanýar we şowsuz bolsa näme bolýar](/blog/how-trust-lists-work/en/fig-denetim.png)

Tor barlagy esasan synaglar üçin möhüm. Sandbox-yň sanawlarynda `"environment": "sandbox"` ýazylýar we hakyky tor üçin sazlanan barlaýjy bu sanawy görende saklanýar. Şonuň üçin sandbox-da alnan resminama hakyky barlaýjydan geçip bilmeýär.

Ikinji topar her resminama üçin işleýär. Barlag tertibiniň ynam gatlagy ([verification API](https://docs.tamga.network/specifications/verification-api)) şu soraglary berýär:

| Ädim | Sorag |
|---|---|
| A3b | Bu haýsy gurama? Gurama resminama gol çeken sertifikatdan kesgitlenýär; resminamanyň özi hakda aýdýanlaryna seredilmeýär |
| C1 | Resminama berlen pursatynda gurama kabul ederlikli ýagdaýdamydy? |
| C2 | Gurama şol pursatda şu resminama görnüşini bermäge ygtyýarlymydy? Bu ädimi öçürip bolmaýar |
| C3 | Barlaýjynyň ýurdy guramanyň ýurduny ykrar edýärmi? |
| D5 | Ýatyrylyş sanawy žurnaldaky labyryna gabat gelýärmi? |

C1 we C2 ädimleri häzirki ýagdaýa däl-de, resminamanyň berlen pursatyna seredýär. Uniwersitetiň ýazgysy soňra pensiýa çykarylsa, onuň işjeň döwründe beren diplomlary güýjünde galýar. Guramanyň açary ele salnan bolsa, ýazgy `invalidates_from` senesi bilen ýatyrylýar we diňe şol seneden soň berlen resminamalar barlagdan geçmeýär. Barlag geçmişe seredýär we kesgitleýji zat resminamanyň berlen günündäki sanawdyr.

Kod sanaw faýllaryny hiç haçan öz başyna düşündirmeýär. `@tamga-network/trust` paketi bir interfeýs hödürleýär. `TrustSource` atly bu interfeýs `YES`, `NO` ýa-da `UNKNOWN` jogabyny berýär we `UNKNOWN` netijede `INDETERMINATE` hökmünde görünýär. Ony nähili ulanmalydygyny [Ynam sanawlaryny okaň](https://docs.tamga.network/guides/read-trust-lists) gollanmasynda düşündirdik.

## Häzirki dogruçyl çäkler haýsylar?

- **Bir gol çekiji.** Ynam ýakory häzir bir operatoryň goluna daýanýar. Operator bilen gurama bilelikde hereket etse, dürli okyjylara sanawyň dürli wersiýalaryny görkezip bilerler. Açyk žurnal, üýtgeşmeler ýazgysy, çärýekde bir gezek çap edilýän açyklyk hasabaty we garaşsyz audit munuň öňüni alýar, ýöne ony düýbünden mümkin däl etmeýär. Bu boşlugy azyndan iki garaşsyz operatory talap edýän umumy kitap (ledger) ýapar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).
- **Häzirlikçe bir açar.** Düzgünler azyndan iki nobatlaşýan gol sertifikatyny we 30 gün öňünden yglan edilýän açar çalşygyny talap edýär. Janly sanawlar bolsa häzir bir açary ulanýar (2026-10-23-de barlandy). Düzgünler ikinji açaryň goşulmagyny we gol açarynyň açar dolandyryş hyzmatynda saklanmagyny pilotdan öň şert edip goýýar.
- **ETSI XML: sandboxda işleýär, hakyky torda soňra.** Sandbox ýurt sanawyny şu gün ETSI TS 119 612 XML görnüşinde hem çap edýär; görnüş şol bir gol çekilen sanawdan, şol wersiýa bilen döredilýär we XAdES-B-B bilen gol çekilýär ([trust.sandbox.tamga.network/tl-tr.xml](https://trust.sandbox.tamga.network/tl-tr.xml); salgylaryň manysy [ETSI ynam sanawy sahypasynda](https://docs.tamga.network/concepts/etsi-trusted-list)). Hakyky toruň XML sanawy sanawy dolandyrjak gazna döredilende açylar; şeýdip sanawda hemişelik operator we onuň salgysy bolar. Sanaw ÝB manysynda "hünärli" ýa-da "habar berlen" diýen talap etmeýär. Gapjyk üpjün edijileri üçin ETSI TS 119 602 görnüşleri hem işjeňleşdirilende çap edilip bilner.

## Köp berilýän soraglar

### Ynam sanawyny özüm okap bilerinmi?

Hawa. `trust.tamga.network/tl-tr.json` we `lotl.json` faýllary okalyp bilinýän nusgalardyr. Programma üpjünçiligi bolsa gol çekilen `.jws` faýllaryny `TrustSource` arkaly ýüklemeli, sebäbi goly, zynjyry we täzeligi şu interfeýs barlaýar.

### Ynam sanawynda şahsy maglumat barmy?

Ýok. Sanawda guramalaryň we barlaýjylaryň atlary, sertifikatlaryň barmak yzlary, ýagdaýlar, seneler, salgylar we resminama görnüşleri bolýar. Adamlar, resminamalaryň mazmuny we resminamalaryň heşleri sanawda ýok.

### Gurama tordan çykanda näme bolýar?

Guramanyň ýazgysy pozulmaýar. Onuň ýagdaýy üýtgeýär (mysal üçin, `RETIRED` ýa-da `REVOKED` bolýar) we bu üýtgeşme ýazgynyň taryhyna goşulýar. Şeýlelikde öň berlen resminamalara berlen günündäki sanaw esasynda baha berilmegi dowam edýär.

### Sanaw näçe ýygy täzelenýär?

Üýtgeşme 24 sagadyň içinde çap edilýär we her sanawa iň giç 90 günden bir täzeden gol çekilýär. Labyr žurnalyna hem sagatda azyndan bir setir goşulýar.

### Bu ÝB ynam sanawy bilen birmeňzeşmi?

Sanaw şol bir iki derejeli modele eýerýär we onuň meýdanlary ETSI TS 119 612-ä laýyklaşdyrylýar. Şeýle-de bolsa ol ÝB sanawy hasaplanmaýar, sebäbi ony ÝB edarasy çap etmeýär we Tamga sanaw üçin ÝB derejesini talap etmeýär.

## Çeşmeler

- [ÝB ynam sanawlarynyň sanawy (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [Komissiýanyň (ÝB) 2015/1505 Ýerine ýetiriş karary: ynam sanawy formatlary](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Trusted Lists](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth iş toparynyň taslamasy)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: ynam sanawy spesifikasiýasy](https://docs.tamga.network/specifications/trust-lists) · [Ynam sanawlary we federasiýa](https://docs.tamga.network/concepts/trust-lists) · [Ynam sanawlaryny okaň](https://docs.tamga.network/guides/read-trust-lists)
- [Ynam sanawlary](/learn/trust-lists) · [Federasiýa](/learn/federation)

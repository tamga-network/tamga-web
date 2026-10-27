---
title: "Gol çekilen ynam sanawy nähili işleýär: hasaba alnyşdan barlaga çenli"
slug: how-trust-lists-work
description: "Tamga Network-yň gol çekilen ynam sanawlary nähili işleýär: iki dereje, gol çekmek, çap ediş tertibi, täzelik, labyr žurnaly we barlaýjynyň näme barlaýandygy."
date: 2026-10-08
lang: tk
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Sources: SPEC-TRUST-0001 1.0.0 (§1 principles: JWS ES256 x5c, .json for humans only, version + previous_version_hash, next_update ≤ 90 days, change within 24 h, anchors hourly; §2 file layout; §3 lotl fields; §4 tl fields, issuer entry, status vocabulary, record never removed; §5 anchor log, checkpoint at 500 lines; §6 loader order, environment, YES/NO/UNKNOWN; §8 TL1–TL12; security notes: single operator signature, public log, CHANGELOG, quarterly transparency report, audit; open issues: ETSI XML export, ≥2 rolling keys + KMS before the pilot). SPEC-API-0001 §1 (A3b issuerId from certificate, C1/C2 at iat, C2 cannot be skipped, C3, D5 anchor check), §2.1 three results. Guides join-as-institution (registrar, 24 h, WRPRC), sandbox (environment: sandbox). Live files checked 2026-10-08 and 2026-10-23 (anchor_signing_keys: one ACTIVE entry): lotl.json/tl-tr.json list_format_version 1.0, operator.status provisional, next_update 90 days after issued_at, one anchor signing key. External: EU LOTL XML, CID (EU) 2015/1505, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List draft. -->

Gol çekilen ynam sanawy sanaw operatorynyň gol çeken faýlydyr: ol haýsy guramalaryň haýsy resminama görnüşlerini berip biljekdigini, haýsy barlaýjylaryň hasaba alnandygyny we haýsy gapjyk üpjün edijileriň ykrar edilendigini aýdýar. Tamga Network olaryň iki derejesini çap edýär: ynam sanawlarynyň sanawy (`lotl.jws`) we Türkiýe üçin ýurt sanawy (`tl-tr.jws`). Barlaýjy öňünden bir kök barmak yzyna ynanýar, sanawlaryň gollaryny, wersiýa zynjyryny we täzeligini barlaýar, soňra her resminama barada bir sorag berýär: bu gurama oňa gol çeken pursatynda hasaba alnanmy we şu resminama görnüşi üçin ygtyýarlymy?

## Sanawlaryň iki derejesi näme?

Model ÝB-niňki. Ýewropa Komissiýasy agza döwletleriň ynam sanawlarynyň sanawyny çap edýär ([EU LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)), her döwlet hem [Komissiýanyň (ÝB) 2015/1505 Ýerine ýetiriş karary](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) we ETSI TS 119 612 bilen kesgitlenen formatda öz milli sanawyny çap edýär. Tamga şol bir görnüşe eýerýär:

| Sanaw | Içinde näme bar | Salgy |
|---|---|---|
| Ynam sanawlarynyň sanawy (LOTL) | ýurt sanawlarynyň salgylary we gol açarlary, gapjyk üpjün edijiler, shema katalogy, kabul edilen zero-knowledge zynjyrlary (circuit) | `trust.tamga.network/lotl.jws` |
| Ýurt sanawy | şol ýurduň kök sertifikatlary, guramalary we barlaýjylary | `trust.tamga.network/tl-tr.jws` |

![Berkidilen kök barmak yzyndan LOTL we ýurt sanawy arkaly gurama ýazgysyna we resminama çenli](/blog/how-trust-lists-work/en/fig-zincir.png)

Zynjyr barlaýjyda eýýäm bar bolan zatdan başlaýar: LOTL-a gol çekýän sertifikatyň onuň sazlamalaryna girizilen SHA-256 barmak yzy. Barmak yzy [tamga.network/trust-anchor](https://tamga.network/trust-anchor) salgysynda çap edilen. Sanaw serweriniň özüne ynanylmaýar. Sanawy dogry salgydan ýüklemek ýeterlik däl; onuň goly şol barmak yzyna gabat gelmeli.

Soňra LOTL her ýurt sanawynyň gol çekijisini görkezýär. Häzir işjeň ýeke-täk sanaw Türkiýe sanawy bolup, ony milli ygtyýarly edaranyň adyndan wagtlaýyn Tamga işledýär; maglumat gurluşlarynda beýleki döwletler üçin ýer eýýäm bar.

## Guramanyň ýazgysynda näme bar?

> **Bellik:** Ýönekeýleşdirilen mysal. Gurama oýlanyp tapylan, belgiler we barmak yzlary gysgaldylan, käbir meýdanlar aýrylan. Hakyky format [ynam sanawy spesifikasiýasynda](https://docs.tamga.network/specifications/trust-lists).

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

Agramyň köpüsini birnäçe meýdan göterýär:

- `issuer_id` guramanyň sertifikatynyň barmak yzyndan hasaplanýar, şonuň üçin ony saýlap ýa-da göçürip bolmaýar.
- `class` guramanyň nähili resminama berýändigini aýdýar: döwlet edarasynyň resminamasy (`PUB`), kwalifisirlenen resminama (`QUALIFIED`) ýa-da adaty attestasiýa (`EAA`). `assurance` onuň ynamlylyk derejesi, `I1`-den `I3`-e çenli.
- `schema_authorizations` guramanyň berip biljek resminama görnüşlerini sanaýar, her biri öz wagt aralygy bilen. Dogry ýazgysy bolan bilet satyjy hem barlagdan geçýän diplom berip bilmeýär.
- `status_history`-e diňe goşulýar, ol hiç haçan täzeden ýazylmaýar.

Ýazgyda bolmadyk zatlar hem bilkastlaýyn şeýle: talyplaryň atlary ýok, resminama heşleri ýok, sanlar ýok. Düzgün şeýle: hiç bir sanaw, labyr žurnaly ýa-da üýtgeşme žurnaly şahsy maglumat saklamaýar (TL11).

## Gurama sanawa nähili girýär?

Gurama hasaba alyş maglumatlary we sertifikata gol çekmek haýyşy (CSR) bilen ýüz tutýar. Hasaba alyjy arzany barlaýar we ähli ýetmeýän meýdanlary birbada habar berýär; kök sertifikat edarasy guramanyň sertifikatyna gol çekýär; gurama goşulýar we sanawa täzeden gol çekilýär. Üýtgeşme 24 sagadyň içinde güýje girýär. Guramanyň tarapyndan ädimler [Gurama Tamga Network-a nähili goşulýar](/blog/join-as-an-institution) ýazgysynda.

Her çap edilende çap ediji her barlaýjy ulanyşy we her resminama berýän gurama üçin `trust.tamga.network/wrprc/` astynda hasaba alyş sertifikatyny (ETSI TS 119 475) hem döredýär. Onuň mazmuny diňe gol çekilen sanawdan gelýär, şonuň üçin gapjyk barlaýjynyň hasaba alnandygyny onuň bilen hem barlap biler.

## Sanawa nähili gol çekilýär we ol nähili çap edilýär?

Her sanaw ES256 bilen gol çekilen, `x5c` başlygynda operatoryň sertifikaty bolan compact JWS-dir. Onuň ýanynda adamlar okar ýaly `.json` nusgasy durýar; programma üpjünçiligi diňe `.jws`-i ulanýar.

Taryhy dogruçyl saklaýan üç düzgün bar:

1. **Wersiýa diňe ulalýar.** Köne wersiýany täze ýaly gaýtadan hödürläp bolmaýar.
2. **Her wersiýa öňküsiniň heşini göterýär** (`previous_version_hash`), şonuň üçin wersiýalar zynjyr emele getirýär we boşluk ýa-da täzeden ýazmak duýulýar.
3. **Hiç zat pozulmaýar.** Çykarylan gurama täze ýagdaý bilen sanawda galýar; öňki wersiýalar `archive/` içinde galýar.

![Her faýlyň haçan çap edilýändigi we oňa degişli düzgün](/blog/how-trust-lists-work/en/fig-yayin.png)

Hiç zat üýtgemedik hem bolsa sanawlara azyndan her 90 günden täzeden gol çekilýär; şeýlelikde okaýjy ümsüm sanawy taşlanan sanawdan hemişe tapawutlandyryp biler. Şol ýerdäki açyk `CHANGELOG.md` her gurluşy ýazga alýar.

## Labyr žurnaly näme üçin gerek?

Käbir zatlar her gezek tutuş sanawa täzeden gol çeker ýaly gaty ýygy üýtgeýär; ilkinji nobatda guramalaryň çap edýän ýatyrylyş sanawlary. Olar labyr žurnaly bolan `anchors.jsonl` faýlyna girýär: her waka üçin bir gol çekilen setir, her biri öňki setire onuň heşi arkaly baglanyşykly.

Mysal üçin, setir guramanyň belli bir mazmun heşi bilen öz ýatyrylyş sanawynyň N wersiýasyny çap edendigini ýazga alýar. Barlaýjy soňra şol ýatyrylyş sanawyny okanda heşi labyr bilen deňeşdirýär. Heş gabat gelmese ýa-da wersiýa yza gitse, resminama barlagdan geçmeýär; eger barlaýjynyň keşdäki nusgasy diňe iň täze labyrdan köne bolsa, netije ol täzelenýänçä "häzir barlap bolmaýar" bolýar. Barlaýjy ýatyrylyş sanawynyň hakykatdan guramadan gelýändigini we köne sanaw bilen çalşyrylmandygyny şeýdip bilýär.

Žurnala sagatda azyndan bir setir goşulýar; başga hiç zat bolmadyk bolsa, ýürek urgusy setiri. Ol 500 setirden geçende operator setirleri arhiwe geçirýär we täze žurnaly arhiwiň soňky setirine we arhiw faýlynyň heşine baglanyşykly gol çekilen barlag nokady bilen başlaýar. Hiç bir setir hiç haçan pozulmaýar we tutuş taryhy arhiwlerden täzeden gurup bolýar.

## Sanaw näçe täze bolmaly?

Her sanaw `next_update` göterýär. Hyzmatlar sanawlary yzygiderli aralyklarda täzeden ýükleýär, barlaýjylar bolsa ýatyrylyş sanawlaryny öňünden alýar we keşde saklaýar. Barlag pursatynda hiç zat ýüklenmeýär; guramanyň öz resminamalarynyň nirede görkezilýändigini hiç haçan bilmeýändiginiň sebäbi hem şu ([Yzarlamasyz ýatyrylyş](/blog/status-list-privacy)).

Sanawy alyp bolmasa ýa-da onuň `next_update` wagty geçen bolsa, barlaýjy çaklamaýar. Netije "häzir barlap bolmaýar" (`INDETERMINATE`) bolýar, hiç haçan kabul edilmeýär we hiç haçan ret edilmeýär (TL5). Serwere ýetip bolmandygy üçin diplom galp diýlip yglan edilmeýär.

## Barlaýjy ädimme-ädim näme barlaýar?

Barlaglar iki topara bölünýär. Ilki sanawlar ýüklenende:

![Ynam sanawy ýüklenende näme barlanýar we şowsuz bolsa näme bolýar](/blog/how-trust-lists-work/en/fig-denetim.png)

Tor barlagy synag üçin möhümdir: sandbox-yň sanawlarynda `"environment": "sandbox"` ýazylýar we hakyky tor üçin sazlanan barlaýjy olarda saklanýar. Sandbox resminamasy hakyky barlaýjyda geçip bilmeýär.

Soňra her resminama üçin barlag hatarynyň ynam gatlagy ([verification API](https://docs.tamga.network/specifications/verification-api)) şulary soraýar:

| Ädim | Sorag |
|---|---|
| A3b | Bu haýsy gurama? Resminama gol çeken sertifikatdan alynýar; resminamanyň özi hakda aýdýanlary hasaba alynmaýar |
| C1 | Resminama berlen pursatynda gurama kabul ederlikli bolupmy? |
| C2 | Şol pursatda ol şu resminama görnüşi üçin ygtyýarly bolupmy? Bu ädimi öçürip bolmaýar |
| C3 | Barlaýjynyň ýurdy guramanyň ýurduny ykrar edýärmi? |
| D5 | Ýatyrylyş sanawy žurnaldaky labyryna gabat gelýärmi? |

C1 we C2 şu güne däl, resminamanyň berlen wagtyna seredýär. Uniwersitetiň ýazgysy soňra işden aýrylsa (retire), ol işjeň wagtynda beren diplomlary güýjünde galýar. Eger onuň açary ele salnan bolsa, ýazgy `invalidates_from` senesi bilen ýatyrylýar we diňe şol seneden başlap berlen resminamalar geçmeýär. Barlag geçmiş hakda: hasaba alynýan zat berlen günündäki sanawyň ýagdaýydyr.

Kod sanaw faýllaryny hiç haçan göni düşündirmeýär. `@tamga-network/trust` paketi `YES`, `NO` ýa-da `UNKNOWN` jogap berýän bir interfeýsi, `TrustSource`-y hödürleýär; `UNKNOWN` `INDETERMINATE` bolýar. Ony nähili ulanmaly: [Ynam sanawlaryny okaň](https://docs.tamga.network/guides/read-trust-lists).

## Häzirki dogruçyl çäkler haýsylar?

- **Bir gol çekiji.** Labyr ýeke operatoryň goluna daýanýar. Operator we gurama bilelikde hereket etse, olar dürli okyjylara dürli wersiýalary görkezip bilerdi. Açyk žurnal, üýtgeşme žurnaly, çärýeklik açyklyk hasabaty we garaşsyz audit muňa päsgel berýär, ýöne ony mümkin däl etmeýär. Bu boşlugy azyndan iki garaşsyz operatory talap edýän umumy kitap ýapýar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).
- **Häzirlikçe bir açar.** Düzgünler azyndan iki aýlanýan gol sertifikatyny we çalşyklaryň 30 gün öňünden yglan edilmegini talap edýär. Işleýän sanawlar birini ulanýar (2026-10-23-de barlandy); düzgünler pilotdan öň ikinji açary we gol açarynyň açar dolandyryş hyzmatynda (KMS) saklanmagyny talap edýär.
- **Entek ETSI XML ýok.** Meýdanlar ETSI TS 119 612-ä gabat gelýär we ýagdaýlaryň ETSI gabatlygy bar, ýöne XML eksporty entek açyk meseleler sanawynda. Gapjyk üpjün edijiler üçin ETSI TS 119 602 görnüşleri işjeňleşdirilende çap edilip bilner.

## Köp berilýän soraglar

### Ynam sanawyny özüm okap bilerinmi?

Hawa. `trust.tamga.network/tl-tr.json` we `lotl.json` okalýan nusgalardyr. Programma üpjünçiligi gol çekilen `.jws` faýllaryny goly, zynjyry we täzeligi barlaýan `TrustSource` arkaly ýüklemeli.

### Ynam sanawynda şahsy maglumat barmy?

Ýok. Onda guramalaryň we barlaýjylaryň atlary, sertifikat barmak yzlary, ýagdaýlar, seneler, salgylar we resminama görnüşleri bar. Adamlar, resminamalaryň mazmuny we resminama heşleri onda ýok.

### Gurama tordan çykanda näme bolýar?

Onuň ýazgysy aýrylmaýar. Ýagdaý üýtgeýär (mysal üçin `RETIRED` ýa-da `REVOKED`) we üýtgeşme onuň taryhyna goşulýar; şeýlelikde öň berlen resminamalara henizem berlen senesindäki sanawyň ýagdaýy boýunça baha berip bolýar.

### Sanaw näçe ýygy täzelenýär?

Üýtgeşme 24 sagadyň içinde çap edilýär we her sanawa azyndan her 90 günden täzeden gol çekilýär. Labyr žurnalyna azyndan her sagatda täze setir goşulýar.

### Bu ÝB ynam sanawy bilen birmeňzeşmi?

Ol şol bir iki derejeli modele eýerýär we onuň meýdanlary ETSI TS 119 612-ä gabat gelýär. Ol ÝB sanawy däl: ony hiç bir ÝB edarasy çap etmeýär we Tamga onuň ÝB ýagdaýy bar diýip öňe sürmeýär.

## Çeşmeler

- [ÝB ynam sanawlarynyň sanawy (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [Komissiýanyň (ÝB) 2015/1505 Ýerine ýetiriş karary: ynam sanawy formatlary](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Trusted Lists](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth iş toparynyň taslamasy)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: ynam sanawy spesifikasiýasy](https://docs.tamga.network/specifications/trust-lists) · [Ynam sanawlary we federasiýa](https://docs.tamga.network/concepts/trust-lists) · [Ynam sanawlaryny okaň](https://docs.tamga.network/guides/read-trust-lists)
- [Ynam sanawlary](/learn/trust-lists) · [Federasiýa](/learn/federation)

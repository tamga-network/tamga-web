---
title: Tamga Network-yň hiç haçan görmeýän zatlary
slug: what-the-network-never-sees
description: Tamga Network-yň sanawlarynda we žurnallarynda nämeleriň hiç haçan bolmaýandygyny, wagtlaýyn hyzmatlarynyň şahsy maglumata nirede degýändigini we operatorlaryň nämä girip bilýändigini düşündirýäris.
date: 2026-10-08
lang: tk
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Sources: SPEC-TRUST-0001 TL11 (no personal data, credential or credential hash in any list, anchor log or change log); SPEC-BC-0001 DP1 (ledger later: no personal data, content or hash); ADR-0020 K2 + AS1–AS4 (no register of persons; data read from the authentic source at signing and dropped; persistent only subject_ref and keyed digest; Tamga never gets a contact address); ADR-0041 TI3–TI5 (trial register only in the sandbox); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (values once, deleted ≤ 5 min); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (identity service, data controller, ≤ 30 days provider image retention by contract, 10 copies, 730 days), §9.1 erasure; ADR-0011 (provisional until a state PID provider; Tamga data controller under KVKK); ADR-0022 (non-qualified, I2); ADR-0031 PS1–PS3 and "known weakening" with mitigations; ARF architecture §2.7 (deletion by resetting the wallet), §4.5 item 4 (no IP), §7.2 items 1, 6, 7 (no images at Tamga; statistics only in aggregate, groups ≥ 50); ARF rulebook RB-GEN-05 (no IP raw, hashed or truncated; debug logs ≤ 7 days); ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1 (no wallet operated). SPEC-TRUST-0001 security notes (single operator, quarterly transparency report, audit). Live check 2026-10-08: lotl.json / tl-tr.json fields and anchors.jsonl payloads contain no personal data. -->

Tamga Network adamlaryň resminamalarynyň mazmunyny sanawlarynda, žurnallarynda ýa-da labyr žurnalynda hiç haçan görmeýär. Adamlar bilen bagly ýazgy saklamaýar, resminamanyň nirede ýa-da kime görkezilendigini bilmeýär we IP salgylaryny ýazga almaýar. Şeýle-de bolsa tor şahsy maglumata gysga wagtlap degýän birnäçe wagtlaýyn hyzmaty işledýär. Şahsyýet hyzmaty şahsyýet barlagy wagtynda, ýerleşdirilen resminama beriş hyzmaty gol çekilýän pursatda, ýerleşdirilen barlaýjy bolsa saýt ony ulanmagy saýlanda şahsy maglumat bilen duşuşýar. Düzgünler bu hyzmatlaryň her biri üçin nämäniň näçe wagt saklanyp bilinjekdigini we nämäniň hiç haçan saklanyp bilinmejekdigini kesgitleýär.

## Açyk ynam sanawlarynda we labyr žurnalynda näme bar?

`trust.tamga.network` salgysyndaky gol çekilen ynam sanawlary guramalary, barlaýjylary we gapjyk üpjün edijilerini görkezýär. Ýazgyda hukuky at, sertifikatyň barmak yzy, ýagdaý we ýagdaý taryhy, seneler, salgylar we guramanyň berip bilýän ýa-da barlaýjynyň sorap bilýän resminama görnüşleri bolýar. Düzgün örän gysga. Hiç bir sanawda, labyr žurnalynda ýa-da üýtgeşmeler ýazgysynda şahsy maglumat, resminama, hatda resminamanyň heşi hem bolup bilmez (TL11 düzgüni).

![Toruň her açyk böleginde näme bar](/blog/what-the-network-never-sees/en/fig-katman.png)

Labyr žurnaly guramanyň ýagdaý sanawynyň her çap edilişini gol çekilen setir hökmünde ýazga alýar. Bu setirde haýsy sanawyň, haýsy wersiýasynyň we haýsy heş bilen çap edilendigi ýazylýar. Hiç bir setir adam barada maglumat bermeýär we hiç bir setirde ýagdaý sanawyndaky orun ýok. Tor ýazgylaryny geljekde umumy kitaba geçirende şol düzgün hem onuň bilen bilelikde geçer we hiç bir şertnama şahsy maglumaty, resminamanyň mazmunyny ýa-da resminamanyň heşini saklamaz (DP1). Muny özüňiz hem barlap bilersiňiz, sebäbi sanawlaryň okalýan nusgalary `trust.tamga.network/lotl.json` we `tl-tr.json` salgylarynda dur ([Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)).

## Adamlaryň resminamalary nirede saklanýar?

Resminamalar adamyň özünde saklanýar we toruň hiç bir ýerinde bolmaýar. Resminama guramanyň ulgamyndan göni adamyň gapjygyna gidýär. Tamga adamlar bilen bagly ýazgy saklamaýar. Ýerleşdirilen resminama berişde maglumatlar gol çekilýän pursatda guramanyň öz ulgamyndan, ýagny ygtyýarly çeşmeden okalýar we resminama berlenden soň ýatdan pozulýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Bu işde diňe iki maglumat saklanýar. Birinjisi, guramanyň adam üçin ulanýan we öz-özünden many götermeýän belgisidir. Gurama şunuň netijesinde resminamany soňra ýatyryp ýa-da täzeläp bilýär. Ikinjisi, adamyň şahsyýetine baglanan teklip barada gürrüň gidýän bolsa, gabat getirmekde ulanylýan maglumatlaryň açarly heşidir. Şahsyýet belgisiniň özi bolsa hiç haçan saklanmaýar. Tamga teklip üçin adamyň e-poçta salgysyny ýa-da telefon belgisini hem hiç haçan almaýar, sebäbi teklip salgysyny guramanyň özi iberýär.

Institution Console-da synaglar üçin ulanylýan "nusga çeşme" sanawy bar. Bu sanaw diňe sandbox-da, synag guramalary üçin bar we her gije pozulýar. Hakyky torda bolsa asla açylyp bilinmeýär.

## Görkezişi kim görýär?

Adaty ýagdaýda görkezişi diňe gapjyk we barlaýjy görýär. Görkeziş göni gapjykdan barlaýja gidýär. Ýagdaý sanawlary we shema katalogy öňünden we toplumlaýyn ýüklenýändigi üçin resminama görkezilen pursatda ne guramadan, ne-de tordan hiç zat soralmaýar ([Yzarlamasyz ýatyrylyş](/blog/status-list-privacy)). Adamyň görkeziş taryhy telefonda galýar we hiç haçan serwere ýa-da ätiýaçlyk nusga gitmeýär. Bu taryh enjamdan diňe adamyň özüniň edýän, parol bilen goralýan eksporty arkaly çykyp bilýär (WL4 düzgüni). Ýaş barlagynda barlaýjy has hem az zat görüp biler. Nol bilimli subutnama ulanylanda ol diňe adamyň 18 ýaşdan uludygyny bilýär ([Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga)).

Öz barlag programmasyny işletmek islemeýän saýt ýerleşdirilen barlaýjy bolan Tamga Verify-ny ulanyp biler. Bu ýagdaýda Tamga Verify adamyň paýlaşmaga razy bolan meýdanlaryny görýär, sebäbi olary saýtyň adyndan barlaýar. Düzgünler bu ýagdaýy hem çäklendirýär. Bahalar diňe haýyşy açan hasaba alnan saýta we iň köp bir gezek berilýär. Netijeden iň giç bäş minut soň bolsa ýatdan pozulýar ([ADR-0017](https://docs.tamga.network/adr/0017-hosted-verifier-result-access)). Barlag netijesiniň özi bolsa meýdanlaryň bahalaryny däl-de, diňe atlaryny göterýär we hiç haçan ýagdaý sanawyndaky orny öz içine almaýar (AP3, AP4).

## Şahsyýet hyzmaty näme görýär?

Döwlet şahsyýet üpjün edijisini bellenýänçä Tamga wagtlaýyn şahsyýet hyzmatyny işledýär. Bu hyzmat adamy uzakdan barlaýar we onuň gapjygyna şahsyýet resminamasyny berýär ([ADR-0011](https://docs.tamga.network/adr/0011-provisional-identity-attestation-provider)). Hyzmat kwalifisirlenmedik hyzmat hökmünde hasaba alnan. "Kwalifisirlenen" sözi hukuky derejedir we Tamga-nyň entek ýok garaşsyz bahalandyrmasyny talap edýär. Barlag wagtynda şular bolýar:

- ygtyýarnamaly uzakdan barlag üpjün edijisi adamyň şahsyýet resminamasyny we ýüzüni görýär; bu işlemegiň maglumatlara jogapkäri Tamga we adam barlag başlamazdan öň maglumat beriş tekstini okap, aç-açan razylyk berýär;
- şahsyýet hyzmaty adamyň maglumatlaryny diňe resminama berilýänçä saklaýar;
- resminama berlenden soň diňe öz-özünden many götermeýän belgini, resminama belgisiniň açarly heşini, güýjünde bolýan möhletini we nusgalaryň ýagdaý sanawyndaky orunlaryny saklaýar;
- resminamanyň suratlary, selfi, wideo we resminamadan okalan çig tekst Tamga-da hiç haçan saklanmaýar; üpjün edijiniň suratlary saklaýan möhleti bolsa şertnama bilen iň köp 30 gün bilen çäklendirilýär ([şahsyýet barlagy, §8 we §9](https://docs.tamga.network/specifications/identity-proofing)).

![Şahsy maglumat nireden geçýär we ol näçe wagt galýar](/blog/what-the-network-never-sees/en/fig-gecis.png)

Adam hasap açmagyň zerurlygy bolmazdan öz ýazgysyny pozdurup biler. Gapjyk eýeçiligiň subutnamasy hökmünde şahsyýet hyzmatynyň beren resminamalaryny görkezýär. Hyzmat hem ýazgyny we oňa bagly waka žurnalynyň setirlerini pozýar, ähli nusgalary ýatyrýar we üpjün edijiden sessiýany pozmagy soraýar. Gapjygy arassalamak hem şol netijäni berýär we gapjygyň öz üpjün edijisindäki ýazgysy hem pozulýar.

## Web saýtlara girmek üçin ulanylýan lakamlar barada näme?

"Tamga bilen gir" her saýta özüne degişli we üýtgemeýän lakam berýär. Şeýlelikde iki saýt şol bir adamy biri-biri bilen gabat getirip bilmeýär ([ADR-0031](https://docs.tamga.network/adr/0031-per-site-pseudonyms)). Lakam gapjykda tohumdan (seed) alynýar. Tohum bolsa şahsyýet hyzmatynda adamyň üýtgemeýän şahsyýetinden aýratyn açar bilen alynýar. Gapjyga hiç bir saýta görkezilmeýän resminama görnüşiniň içinde berilýär we hyzmat ony saklamaýar.

Karar ýazgysy bu usulyň çägini aç-açan ýazýar we biz hem şu ýerde gaýtalaýarys. Şol açary hem, adamyň şahsyýet belgisini hem elinde saklaýan kişi, mysal üçin saýt bilen ylalaşan şahsyýet hyzmatynyň operatory, şol adamyň şol saýtdaky lakamyny hasaplap biler. Muňa garşy görülýän çäreler goralýan açar ammary, ýazga alynýan açar girişleri, açyklyk hasabatynda çap edilýän açar ulanyş sanlary we açary döwlet şahsyýet üpjün edijisine tabşyryp bolmak mümkinçiligidir. Bu dizaýndan öň bolsa her saýt her kesi biri-biri bilen gabat getirip bilýärdi.

## Toruň žurnallarynda näme bar?

Toruň žurnallarynda web hyzmatlarynyň köpüsiniň saklaýanyndan has az maglumat bar. Hiç bir Tamga hyzmaty IP salgysyny ne bolşy ýaly, ne heş görnüşinde, ne-de gysgaldylan görnüşde ýazga alýar. Kemçilik gözleýiş žurnallary iň köp ýedi gün saklanýar ([Tamga ARF düzgünler kitaby, RB-GEN-05](https://arf.tamga.network/rulebook)). Žurnallarda we netijelerde meýdan bahalary, şahsyýet belgileri we ýagdaý sanawynyň orunlary bolmaýar. Şahsyýet hyzmaty wakanyň görnüşini, öz-özünden many götermeýän sessiýa belgisini we derejäni ýazýar, ýöne hiç haçan at, resminama belgisi ýa-da bal ýazmaýar. Ulanyş statistikasy bolsa diňe jemleýji görnüşde we azyndan 50 adamlyk toparlar boýunça çap edilýär ([ARF §7.2](https://arf.tamga.network/architecture)).

## Sandbox nähili aýry saklanýar?

`sandbox.tamga.network` salgysyndaky sandbox öz kök sertifikaty we öz sanawlary bolan aýry synag torudyr ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Hakyky toruň açarlary ol ýerde hiç zada gol çekmeýär. Sandbox sanawlary özlerini synag sanawy hökmünde belleýär we hakyky tor üçin sazlanan gapjyk ýa-da barlaýjy bu sanawlary ret edýär. Şonuň üçin sandbox-da alnan resminama hakyky barlaýjydan hiç haçan geçmeýär.

Sandbox adaty ýagdaýda şahsyýet belgileri nädogry görnüşde ýazylan oýlanyp tapylan adamlary ulanýar. Hakyky resminama bilen şahsyýet barlagyny synap görmek isleýänler üçin islege bagly ýol hem bar. Adam başlamazdan öň aýdyň synag duýduryşyny tassyklaýar. Resminama diňe at, familiýa we doglan senesi girýär, şahsyýet belgisi we resminama belgisi bolsa hiç haçan girmeýär. Üpjün edijidäki sessiýa derrew pozulýar we ähli zat gijeki arassalamada aýrylýar ([ADR-0040](https://docs.tamga.network/adr/0040-sandbox-invited-real-identity)). Synag guramalary türk şahsyýet belgisiniň barlag jemi düzgüninden geçýän 11 sanly belgini saklaýan ýazgyny saklap bilmeýär.

## Operatorlar nämä girip bilýär we nämä girip bilmeýär?

![Toruň operatorlarynyň girip bilýän we girip bilmeýän zatlary](/blog/what-the-network-never-sees/en/fig-isletmeci.png)

| Operatorlar girip bilýär | Operatorlar girip bilmeýär |
|---|---|
| ýerleşdirilen hyzmat işleýän wagty geçýän maglumata: gol çekilýän pursatda, şahsyýet barlagy wagtynda we Tamga Verify-da iň köp bäş minut | resminama berlenden soň resminamalaryň mazmunyna |
| şahsyýet hyzmatynyň ýazgylaryna: öz-özünden many götermeýän belgiler, resminama belgisiniň heşleri, güýjünde bolýan möhleti, ýagdaý orunlary | telefonda galýan şahsy görkeziş taryhyna |
| guramanyň ýerleşdirilen resminama beriş hyzmaty arkaly eden ýatyrylyşlaryna | resminamanyň nirede, haçan we kime görkezilendigine |
| IP salgysy bolmadyk serwer giriş žurnallaryna | adamlaryň telefonlaryndaky açarlara ýa-da gapjyklaryň öz ýazgylaryna (tor gapjyk işletmeýär) |

Sag sütündäki çäkler dizaýn arkaly üpjün edilýär, sebäbi bu maglumatlar torda asla ýok. Çep sütündäkiler bolsa operatoryň düzgünlere eýermegine daýanýar. Şonuň üçin çep sütün gysga saklandy, möhlet bilen çäklendirildi we ýazga geçirildi.

## Dogruçyl çäkler haýsylar?

- **Şahsyýet hyzmaty ynam nokadydyr.** Barlag wagtynda şahsyýet maglumatlaryny görýär we lakam açaryny saklaýar. Bu hyzmat dizaýny boýunça wagtlaýyn we onuň roluny döwlet şahsyýet üpjün edijisine geçirmek meýilleşdirilýär.
- **Häzir bir operator bar.** Sanawlary, labyr žurnalyny we ýerleşdirilen hyzmatlary bir wagtlaýyn operator alyp barýar. Açyk žurnal, üýtgeşmeler ýazgysy, düzgünleriň göz öňünde tutýan çärýeklik açyklyk hasabaty we garaşsyz auditler hyýanatçylykly ulanylyşyň öňüni alýar, ýöne ony mümkin däl etmeýär. Bu çäk garaşsyz operatorlar kitaby bilelikde saklanda aýrylar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).
- **Ýerleşdirilen hyzmatlar işleýän maglumatlaryny görýär.** Tordan hiç hili maglumatyň geçmegini islemeýän gurama ýa-da saýt açyk çeşmeli resminama beriş we barlag paketlerini öz serwerlerinde işledip biler.

## Köp berilýän soraglar

### Tamga Network meniň diplomymy ýa-da şahsyýet maglumatlarymy saklaýarmy?

Ýok. Resminamalaryňyz telefonyňyzda saklanýar we sanawlarda diňe guramalara we barlaýjylara degişli maglumatlar bar. Şahsyýet hyzmaty resminama berlenden soň öz-özünden many götermeýän belgini we resminama belgiňiziň açarly heşini saklaýar. Resminamaňyzyň suratlaryny bolsa hiç haçan saklamaýar.

### Tamga resminamalarymy nirede ulanýandygymy görüp bilýärmi?

Ýok. Barlaýjylar ýagdaý sanawlaryny öňünden ýükleýär we görkezişler göni gapjygyňyzdan barlaýja gidýär. Saýt Tamga Verify-ny ulanýan bolsa, Tamga Verify diňe paýlaşmaga razy bolan meýdanlaryňyzy we iň köp bäş minutlap görýär.

### Tamga meniň IP salgymy ýazga alýarmy?

Ýok. Hiç bir Tamga hyzmaty IP salgysyny ne bolşy ýaly, ne heş görnüşinde, ne-de gysgaldylan görnüşde ýazga alýar.

### Maglumatlarymy pozdurup bilerinmi?

Hawa. Gapjygyňyz şahsyýet hyzmatynyň beren resminamalaryny görkezip, hyzmatdan ýazgyňyzy pozmagy sorap biler we gapjygy arassalamak hem şol netijäni berýär. Gurama ýa-da barlaýja hem gapjykdan pozmak haýyşyny iberip bilersiňiz.

### Sandbox-y hakyky şahsyýetim bilen synap görmek howpsuzmy?

Bu ýol islege bagly we çäklendirilen. Synag resminamasyna diňe adyňyz we doglan seneňiz girýär, üpjün edijidäki sessiýa derrew pozulýar we ähli zat her gije arassalanýar. Sandbox adaty ýagdaýda oýlanyp tapylan adamlary ulanýar.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(ÝB) 2016/679 Regulamenti (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arhitektura (§2.7, §4.5, §7.2)](https://arf.tamga.network/architecture) · [Tamga ARF: rulebook](https://arf.tamga.network/rulebook)
- [Tamga Network: gizlinlik](https://docs.tamga.network/concepts/privacy) · [Şahsyýet barlagy](https://docs.tamga.network/specifications/identity-proofing) · [Ynam sanawlary](https://docs.tamga.network/specifications/trust-lists)
- [ADR-0020: ygtyýarly çeşme guramada](https://docs.tamga.network/adr/0020-authentic-source-at-institution) · [ADR-0031: her saýt üçin lakam](https://docs.tamga.network/adr/0031-per-site-pseudonyms) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox)
- [Maglumatlary azaltmak](/learn/data-minimisation) · [Razylyk we gözegçilik](/learn/consent-and-control) · [Ynam tory näme?](/blog/what-is-a-trust-network)

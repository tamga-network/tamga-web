---
title: Tamga Network-yň hiç haçan görmeýän zatlary
slug: what-the-network-never-sees
description: Tamga Network-yň sanawlarynda, žurnallarynda we hyzmatlarynda hiç haçan bolmaýan zatlar, wagtlaýyn hyzmatlarynyň şahsy maglumata nirede degýändigi we operatorlaryň näme görüp, näme görüp bilmeýändigi.
date: 2026-10-08
lang: tk
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Sources: SPEC-TRUST-0001 TL11 (no personal data, credential or credential hash in any list, anchor log or change log); SPEC-BC-0001 DP1 (ledger later: no personal data, content or hash); ADR-0020 K2 + AS1–AS4 (no register of persons; data read from the authentic source at signing and dropped; persistent only subject_ref and keyed digest; Tamga never gets a contact address); ADR-0041 TI3–TI5 (trial register only in the sandbox); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (values once, deleted ≤ 5 min); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (identity service, data controller, ≤ 30 days provider image retention by contract, 10 copies, 730 days), §9.1 erasure; ADR-0011 (provisional until a state PID provider; Tamga data controller under KVKK); ADR-0022 (non-qualified, I2); ADR-0031 PS1–PS3 and "known weakening" with mitigations; ARF architecture §2.7 (deletion by resetting the wallet), §4.5 item 4 (no IP), §7.2 items 1, 6, 7 (no images at Tamga; statistics only in aggregate, groups ≥ 50); ARF rulebook RB-GEN-05 (no IP raw, hashed or truncated; debug logs ≤ 7 days); ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1 (no wallet operated). SPEC-TRUST-0001 security notes (single operator, quarterly transparency report, audit). Live check 2026-10-08: lotl.json / tl-tr.json fields and anchors.jsonl payloads contain no personal data. -->

Tamga Network adamlaryň resminamalarynyň mazmunyny öz sanawlarynda, žurnallarynda ýa-da labyr žurnalynda hiç haçan görmeýär. Onuň adamlaryň hasaba alyş kitaby ýok, ol resminamanyň nirede ýa-da kime görkezilýändigini bilmeýär we IP salgylaryny ýazga almaýar. Tor gysga wagtlap şahsy maglumata degýän birnäçe wagtlaýyn hyzmaty işledýär: şahsyýet barlagy wagtynda şahsyýet hyzmaty, gol çekilýän pursatda ýerleşdirilen resminama beriş hyzmaty we saýt ony ulanmagy saýlanda ýerleşdirilen barlaýjy. Olaryň her biri üçin düzgünler näme saklanyp bilinjekdigini, näçe wagtlap we nämäniň hiç haçan saklanyp bilinmejekdigini aýdýar.

## Açyk ynam sanawlarynda we labyr žurnalynda näme bar?

`trust.tamga.network` salgysyndaky gol çekilen ynam sanawlary guramalary, barlaýjylary we gapjyk üpjün edijileri görkezýär. Ýazgyda hukuky at, sertifikat barmak yzy, ýagdaý we onuň taryhy, seneler, salgylar hem-de guramanyň berip ýa-da barlaýjynyň sorap biljek resminama görnüşleri bar. Düzgün gysga: hiç bir sanawda, labyr žurnalynda ýa-da üýtgeşme žurnalynda şahsy maglumat, resminama, hatda resminamanyň heşi hem ýok (TL11 düzgüni).

![Toruň her açyk böleginde näme bar](/blog/what-the-network-never-sees/en/fig-katman.png)

Labyr žurnaly guramanyň ýagdaý sanawynyň (status list) her çap edilişini gol çekilen setir hökmünde ýazga alýar: haýsy sanaw, haýsy wersiýa, haýsy heş. Hiç bir setir adam hakda hiç zat aýtmaýar we hiç bir setirde ýagdaý sanawyndaky orun ýok. Tor soňra öz ýazgylaryny umumy kitaba geçirende şol bir düzgün hem onuň bilen geçýär: hiç bir kontrakt şahsy maglumaty, resminamanyň mazmunyny ýa-da resminamanyň heşini saklamaýar (DP1). Muny özüňiz barlap bilersiňiz; sanawlaryň `trust.tamga.network/lotl.json` we `tl-tr.json` salgylarynda okalýan nusgalary bar ([Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)).

## Adamlaryň resminamalary nirede saklanýar?

Adamda, torda hiç ýerde däl. Resminama guramanyň ulgamyndan adamyň gapjygyna gidýär. Tamga adamlaryň hasaba alyş kitabyny saklamaýar: ýerleşdirilen resminama berişde maglumatlar gol çekilýän pursatda guramanyň öz ulgamyndan, onuň ygtyýarly çeşmesinden okalýar we resminama berlenden soň ýatdan aýrylýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Iki zat saklanýar we diňe şu ikisi. Guramanyň adam üçin açyk bolmadyk salgylanmasy, şeýlelikde ol soňra resminamany ýatyryp ýa-da täzeläp biler. Adamyň şahsyýetine baglanan teklip üçin bolsa gabat getiriş açarlarynyň açarly heşi, hiç haçan açyk şahsyýet belgisi däl. Tamga teklip üçin adamyň e-poçta salgysyny ýa-da telefon belgisini hiç haçan almaýar: salgyny guramanyň özi iberýär.

Institution Console-da synap görmek üçin "nusga çeşme" ýazgylary bar. Ol diňe sandbox-da, synag guramalary üçin bar we her gije arassalanýar; ony hakyky torda açyp bolmaýar.

## Görkezişi kim görýär?

Adaty ýagdaýda gapjyk we barlaýjy, başga hiç kim. Görkeziş gapjykdan göni barlaýja gidýär. Ýagdaý sanawlary we shema katalogy öňünden, toplumlaýyn alynýar, şonuň üçin resminama görkezilýän pursatda guramadan ýa-da tordan hiç zat soralmaýar ([Yzarlamasyz ýatyrylyş](/blog/status-list-privacy)). Adamyň görkeziş taryhy telefonda galýar; ol hiç haçan serwere ýa-da ätiýaçlyk nusga girmeýär we enjamdan diňe adamyň özüniň edýän parol bilen goralan eksporty bilen çykýar (WL4 düzgüni). Ýaş barlagynda barlaýjy hatda has az görüp biler: zero-knowledge subutnamasy bilen ol diňe adamyň 18 ýaşdan uludygyny öwrenýär ([Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga)).

Öz barlag programma üpjünçiligini işletmek islemeýän saýt ýerleşdirilen barlaýjyny, Tamga Verify-ny ulanyp biler. Şonda Tamga Verify adamyň paýlaşmaga razy bolan meýdanlaryny görýär, sebäbi ol olary saýtyň adyndan barlaýar. Düzgünler bu açyklygy çäklendirýär: bahalar diňe haýyşy açan hasaba alnan saýta, iň köp bir gezek berilýär we netijeden iň köp bäş minut soň ýatdan pozulýar ([ADR-0017](https://docs.tamga.network/adr/0017-hosted-verifier-result-access)). Barlag netijesiniň özünde bahalar däl-de meýdan atlary bar we hiç haçan ýagdaý sanawyndaky orun ýok (AP3, AP4).

## Şahsyýet hyzmaty näme görýär?

Döwlet şahsyýet üpjün edijisi bellenýänçä Tamga adamy uzakdan barlaýan we onuň gapjygyna şahsyýet resminamasyny berýän wagtlaýyn şahsyýet hyzmatyny işledýär ([ADR-0011](https://docs.tamga.network/adr/0011-provisional-identity-attestation-provider)). Ol kwalifisirlenmedik hyzmat hökmünde hasaba alnan; "kwalifisirlenen" Tamga-nyň entek ýok garaşsyz bahalandyrmasyny talap edýän hukuky atdyr. Barlag wagtynda:

- ygtyýarnamaly uzakdan barlag üpjün edijisi adamyň şahsyýet resminamasyny we ýüzüni görýär; bu işlemek üçin maglumatlara jogapkär Tamga-dyr, adam bolsa barlag başlamazdan öň habarnamany okaýar we aç-açan razylyk berýär;
- şahsyýet hyzmaty adamyň meýdanlaryny diňe resminama berilýänçä saklaýar;
- soňra ol açyk bolmadyk salgylanmany, resminama belgisiniň açarly heşini, möhletini we nusgalaryň ýagdaý sanawyndaky orunlaryny saklaýar, başga hiç zady saklamaýar;
- resminamanyň suratlary, selfi, wideo we resminamadan alnan çig tekst Tamga-da hiç haçan saklanmaýar; üpjün edijiniň suratlary öz saklamagy şertnama bilen iň köp 30 gün bilen çäklendirilen ([şahsyýet barlagy, §8 we §9](https://docs.tamga.network/specifications/identity-proofing)).

![Şahsy maglumat nireden geçýär we ol näçe wagt galýar](/blog/what-the-network-never-sees/en/fig-gecis.png)

Adam hasapsyz öz ýazgysyny pozup biler. Gapjyk eýeçiligiň subutnamasy hökmünde şahsyýet hyzmatynyň öz beren resminamalaryny görkezýär; hyzmat soňra ýazgyny we onuň waka žurnalyndaky setirlerini pozýar, ähli nusgalary ýatyrýar we üpjün edijiden öz sessiýasyny pozmagy haýyş edýär. Gapjygy täzeden gurmak (reset) hem gapjygyň öz üpjün edijisindäki ýazgysy bilen bilelikde şol bir zady edýär.

## Web saýtlara girmek üçin ulanylýan lakamlar barada näme?

"Sign in with Tamga" her web saýta öz durnukly lakamyny berýär we iki web saýt şol bir adamy gabat getirip bilmeýär ([ADR-0031](https://docs.tamga.network/adr/0031-per-site-pseudonyms)). Lakam gapjykda tohum bahasyndan (seed) alynýar. Tohum şahsyýet hyzmatynda adamyň üýtgemeýän şahsyýetinden aýry açar bilen alynýar, gapjyga hiç haçan saýta görkezilmeýän resminama görnüşinde gowşurylýar we hyzmat tarapyndan saklanmaýar.

Karar ýazgysy çägi aç-açan aýdýar, şonuň üçin biz ony bu ýerde gaýtalaýarys. Şol açar hem, adamyň şahsyýet belgisi hem elinde bolan biri, mysal üçin web saýt bilen ylalaşan şahsyýet hyzmatynyň operatory, şol adamyň şol web saýtdaky lakamyny hasaplap biler. Muny ýeňletmek üçin goralan açar ammary, açara girişiň žurnala ýazylmagy, açaryň ulanyş sanynyň açyklyk hasabatynda görkezilmegi we açary döwlet şahsyýet üpjün edijisine tabşyrmak mümkinçiligi bar. Bu taslamadan öň her saýt hemmäni gabat getirip bilýärdi.

## Toruň žurnallarynda näme bar?

Web hyzmatlarynyň köpüsiniň saklaýanyndan az. Hiç bir Tamga hyzmaty IP salgylaryny ýazga almaýar: çig görnüşde hem, heşlenen görnüşde hem, gysgaldylan görnüşde hem. Kemçilik gözleýiş (debug) žurnallary iň köp ýedi gün saklanýar ([Tamga ARF rulebook, RB-GEN-05](https://arf.tamga.network/rulebook)). Žurnallarda we netijelerde meýdan bahalary, şahsyýet belgileri we ýagdaý sanawyndaky orunlar ýok; şahsyýet hyzmaty waka görnüşini, açyk bolmadyk sessiýa salgylanmasyny we derejäni žurnala ýazýar, hiç haçan ady, resminama belgisini ýa-da baly däl. Ulanyş statistikasy diňe jemlenen görnüşde, azyndan 50-den ybarat toparlarda çap edilýär ([ARF §7.2](https://arf.tamga.network/architecture)).

## Sandbox nähili aýry saklanýar?

`sandbox.tamga.network` salgysyndaky sandbox öz kök sertifikaty we öz sanawlary bolan aýry synag torudyr ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Hakyky toruň açarlary ol ýerde hiç zada gol çekmeýär, sandbox sanawlary özlerini synag diýip belleýär we hakyky tor üçin sazlanan gapjyk ýa-da barlaýjy olary ret edýär. Şonuň üçin sandbox resminamasy hakyky barlaýjyda hiç haçan geçmeýär.

Adatça sandbox nädogry formatdaky şahsyýet belgileri bolan oýlanyp tapylan adamlary ulanýar. Hakyky resminama bilen şahsyýet barlagyny synap görmek üçin goşmaça ýol bar. Ol başlamazdan öň adam aýdyň synag duýduryşyny tassyklaýar; resminama diňe ady, familiýasy we doglan senesi girýär, hiç haçan şahsyýet belgisi ýa-da resminama belgisi däl; üpjün edijiniň sessiýasy derrew pozulýar we hemme zat gijeki täzeden başlamakda arassalanýar ([ADR-0040](https://docs.tamga.network/adr/0040-sandbox-invited-real-identity)). Synag guramalary Türk şahsyýet belgisiniň barlag jemini geçýän 11 sanly belgi bolan ýazgyny saklap bilmeýär.

## Operatorlar nämä girip bilýär we nämä girip bilmeýär?

![Toruň operatorlarynyň girip bilýän we girip bilmeýän zatlary](/blog/what-the-network-never-sees/en/fig-isletmeci.png)

| Operatorlar girip bilýär | Operatorlar girip bilmeýär |
|---|---|
| ýerleşdirilen hyzmat işlände geçýän maglumatlar: gol çekilende, şahsyýet barlagy wagtynda we Tamga Verify-da bäş minuda çenli | berlenden soň resminamalaryň mazmuny |
| şahsyýet hyzmatynyň ýazgylary: açyk bolmadyk salgylanmalar, resminama belgisiniň heşleri, möhlet, ýagdaý orunlary | telefonda galýan adamyň görkeziş taryhy |
| guramanyň ýerleşdirilen resminama beriş hyzmaty arkaly edýän ýatyrmalary | resminamanyň nirede, haçan ýa-da kime görkezilýändigi |
| IP salgysy bolmadyk serwere giriş žurnallary | adamlaryň telefonlaryndaky açarlar ýa-da gapjyklaryň öz ýazgylary (tor gapjyk işletmeýär) |

Sag sütün taslama bilen üpjün edilýär: maglumat ol ýerde ýok. Çep sütün operatoryň düzgünlere eýermegine bagly, şonuň üçin ol gysga, wagt bilen çäklendirilen we ýazylan.

## Dogruçyl çäkler haýsylar?

- **Şahsyýet hyzmaty ynam nokadydyr.** Ol barlag wagtynda şahsyýet maglumatlaryny görýär we lakam açaryny saklaýar. Ol taslama boýunça wagtlaýyn we onuň roly döwlet şahsyýet üpjün edijisine geçmeli.
- **Häzir bir operator.** Sanawlary, labyr žurnalyny we ýerleşdirilen hyzmatlary ýeke, wagtlaýyn operator işledýär. Açyk žurnal, üýtgeşme žurnaly, düzgünleriň talap edýän çärýeklik açyklyk hasabaty we garaşsyz auditler hyýanatçylygyň öňüni alýar; olar ony mümkin däl etmeýär. Bu çäk garaşsyz operatorlar kitaby paýlaşanda aýrylýar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).
- **Ýerleşdirilen hyzmatlar işleýän zatlaryny görýär.** Tordan hiç zadyň geçmegini islemeýän gurama ýa-da saýt açyk çeşmeli resminama beriş we barlag paketlerini öz serwerlerinde işledip biler.

## Köp berilýän soraglar

### Tamga Network meniň diplomymy ýa-da şahsyýet maglumatlarymy saklaýarmy?

Ýok. Resminamalaryňyz telefonyňyzda. Sanawlarda diňe guramalaryň we barlaýjylaryň maglumatlary bar. Şahsyýet hyzmaty resminama berlenden soň açyk bolmadyk salgylanmany we resminama belgiňiziň açarly heşini saklaýar, hiç haçan resminamaňyzyň suratlaryny däl.

### Tamga resminamalarymy nirede ulanýandygymy görüp bilýärmi?

Ýok. Barlaýjylar ýagdaý sanawlaryny öňünden ýükleýär, görkezişler bolsa gapjygyňyzdan göni barlaýja gidýär. Saýt Tamga Verify-ny ulanýan bolsa, ol diňe siziň paýlaşmaga razy bolan meýdanlaryňyzy iň köp bäş minutlap görýär.

### Tamga meniň IP salgymy žurnala ýazýarmy?

Hiç bir Tamga hyzmaty IP salgylaryny çig, heşlenen ýa-da gysgaldylan görnüşde ýazga almaýar.

### Maglumatlarymy pozdurup bilerinmi?

Hawa. Gapjygyňyz şahsyýet hyzmatynyň resminamalaryny görkezip, ondan ýazgyňyzy pozmagy haýyş edip biler; gapjygy täzeden gurmak hem şol bir zady edýär. Gapjykdan guruma ýa-da barlaýja pozmak haýyşyny hem iberip bilersiňiz.

### Sandbox-y hakyky şahsyýetim bilen synap görmek howpsuzmy?

Bu goşmaça we çäklendirilen: synag resminamasyna diňe adyňyz we doglan seneňiz girýär, üpjün edijiniň sessiýasy derrew pozulýar we hemme zat her gije arassalanýar. Adatça sandbox oýlanyp tapylan adamlary ulanýar.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(ÝB) 2016/679 Regulamenti (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [EU Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arhitektura (§2.7, §4.5, §7.2)](https://arf.tamga.network/architecture) · [Tamga ARF: rulebook](https://arf.tamga.network/rulebook)
- [Tamga Network: gizlinlik](https://docs.tamga.network/concepts/privacy) · [Şahsyýet barlagy](https://docs.tamga.network/specifications/identity-proofing) · [Ynam sanawlary](https://docs.tamga.network/specifications/trust-lists)
- [ADR-0020: ygtyýarly çeşme guramada](https://docs.tamga.network/adr/0020-authentic-source-at-institution) · [ADR-0031: her saýt üçin lakam](https://docs.tamga.network/adr/0031-per-site-pseudonyms) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox)
- [Maglumatlary azaltmak](/learn/data-minimisation) · [Razylyk we gözegçilik](/learn/consent-and-control) · [Ynam tory näme?](/blog/what-is-a-trust-network)

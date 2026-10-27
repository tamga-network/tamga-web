---
title: Näme üçin Tamga Network girdeji gazanmaýar we fonda geçmeli
slug: network-as-a-foundation
description: Tamga Network hyzmat satmaýar we gapjyk işletmeýär, onuň işledilişi bolsa fonda geçer. Bitaraplyk näme üçin möhüm we tabşyryş nähili bolup geçýär.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Sources: tamga-network README ("Tamga Network is non-profit; operation will later be handed over to a foundation"); Tamga ARF §8.3 (governance body formed when one or two states are willing; Tamga provisional operator until then; operation passes to the foundation; the network sells no product or commercial service; service providers outside, same terms), §1.6 principles P1 (each state sole author of its national records; council membership by two-thirds of member states), P4 (every state role Tamga holds is designed to be handed over), P7 (powers not limited by code are limited by policy, a measurable hand-over threshold and a transparency report); ADR-0035 (known tension: list operator selling services = conflict of interest; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; the Tamga team's company gets no different treatment), ADR-0042 (NW1–NW4; wallet.tamga.network removed 2026-10-06; Tamga Wallet's provider operated by the wallet's operator at provider.tamgawallet.com), ADR-0002 (three governance layers; removal does not invalidate citizens' credentials; right to exit), ADR-0009 (ledger with ≥2 independent operators); SPEC-TRUST-0001 (operator.status provisional, on_behalf_of; hand-over changes only the operator field; TDT-first slots; security notes: public log, CHANGELOG, quarterly transparency report, audit); learn/governance (succession agreement: domain, roots, archive, keys); home page gov section. Live tl-tr.json/lotl.json operator fields (2026-10-08). External: eIDAS 2.0 Regulation (EU) 2024/1183, EU ARF, EU trusted lists. -->

Tamga Network girdeji gazanmak maksady bolmadyk tordur we onuň işledilişi fonda tabşyrylar, sebäbi ynam tory diňe oňa daýanýanlaryň hemmesi sanawy saklaýanyň hiç kime artykmaçlyk bermeýändigine ynanyp bilseler işleýär. Döwletler, guramalar, birnäçe gapjyk we bäsdeş hyzmat kompaniýalary şol bir sanawy okaýar. Şonuň üçin tor hyzmat satmaýar, gapjyk işletmeýär we hiç kime aýratyn hukuk bermeýär, häzir wagtlaýyn saklaýan her roly bolsa tabşyrar ýaly taslanan. Döwletler goşulanda işledilişi geňeş ýa-da fond öz üstüne alýar, her döwlet hem öz sanawyny öz üstüne alýar.

## Näme üçin ynam sanawyny saklaýan bitarap bolmaly?

Ynam sanawy kime ynanylýandygyny kesgitleýär. Sanawdaky gurama barlaýjylaryň kabul edýän resminamalaryny berip biler; sanawdaky barlaýjy gapjyklardan maglumat sorap biler; sanawdaky gapjyk üpjün edijisi resminama alyp biler. Sanawy saklaýan tarap integrasiýa hem satsa, gapjyk hem işletse ýa-da tölegli goldaw hem hödürlese, sanawa goşmak baradaky her karar şu soraga açyk bolardy: bu düzgünler boýunça tassyklandymy ýa-da sanawy saklaýanyň işine peýdaly bolany üçinmi?

ÝB şol bir sebäp bilen bu rollary aýyrýar. eIDAS 2.0 modelinde ([(ÝB) 2024/1183 Regulamenti](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) agza döwletler gözegçilik edýär we ynam sanawlaryny çap edýär, gapjyk üpjün edijiler gapjyklary işledýär, daýanýan taraplar hasaba durýar; roller biri-birinden aýry saklanýar. Tamga öz ornuny kesgitlände, ýazga bu belli dartgynlylyk hökmünde girizildi: hyzmat satýan sanaw operatorynda bähbitler gapma-garşylygy bar ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Soňra bu aýrylyk aç-açan kesgitlendi ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)).

## "Girdeji gazanmaýan" amalda näme aňladýar?

Üç hökmany düzgün:

- **Tor hyzmat satmaýar** (PO5). Onuň resminamalarynda we saýtlarynda baha we satuw dili ýok. Integrasiýany, goldawy, şertnamalaýyn ýerleşdirmegi we maslahaty tordan daşardaky kompaniýalar öz atlary bilen hödürleýär.
- **Hemme kes üçin birmeňzeş şertler** (PO6). Salgylanma hyzmatlary we hasaba alyş tertibi ähli gatnaşyjylar üçin birmeňzeş şertlerde açyk. Hiç bir hyzmat üpjün edijisi ileri tutulmaýar we kararda munuň Tamga toparynyň esaslandyran kompaniýasyna hem degişlidigi aç-açan aýdylýar.
- **Salgylanma hyzmatlary tor işlesin diýip bar.** Ynam sanawyny çap ediji, ýerleşdirilen barlaýjy, Institution Console bilen ýerleşdirilen resminama beriş, wagtlaýyn şahsyýet hyzmaty we sandbox guramalar goşulyp bilsin we her kim düzgünleri synap görüp bilsin diýip bar. Olar önüm däl.

Tamga ARF muny öz dolandyryş bölüminde aýdýar: Tamga Network girdeji gazanmaýar, onuň işledilişi fonda tabşyrylar, ol hiç bir önüm satmaýar we hiç bir täjirçilik hyzmatyny hödürlemeýär ([Tamga ARF](https://arf.tamga.network/architecture); çarçuwanyň nähili gurlandygy [Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk](/blog/tamga-arf) ýazgysynda).

## Näme üçin tor gapjyk işletmeýär?

Sebäbi sanawdaky gapjyklaryň birini hem işledýän sanaw beýlekilere garşy bitarap däl. ÝB modelinde her gapjygy ony hödürleýän gurama, ýagny onuň gapjyk üpjün edijisi işledýär, ynam çarçuwasy bolsa diňe gapjyk üpjün edijileri sanawa goşýar.

Tamga Network şol modele eýerýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- Ol hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini, web saýtyny ýa-da goldaw hyzmatyny işletmeýär we ýerleşdirmeýär.
- Toruň domen atlarynyň astynda hiç bir gapjyk hyzmaty işlemeýär. Öň `wallet.tamga.network` salgysynda işleýän gapjyk hyzmatlary 2026-njy ýylyň 6-njy oktýabrynda tordan aýryldy.
- Toruň interfeýsleri we paketleri gapjygyň adyny berk ýazmaýar; "gapjygyňyzda açyň" diýlip ýazylýar, gapjygyň ady gerek bolsa onuň sanawdaky ýazgysyndan gelýär.
- Bir sandbox bar we ol tora degişli. Gapjyk işläp düzüjiler öz üpjün edijisini şol ýerde hasaba aldyrýar we beýlekiler bilen şol bir guramalara, şahsyýet hyzmatyna we barlaýja garşy synag geçirýär.

Toruň gapjyklarynyň biri we aýry önüm bolan Tamga Wallet hem şol ýoldan gidýär. Onuň gapjyk üpjün edijisini tor däl-de, gapjygyň öz operatory gapjygyň öz domeniniň astynda işledýär. Onuň üpjün ediji ýazgysy (`TAMGA-WP-1`) 2026-njy ýylyň 14-nji oktýabryndan bäri beýleki gapjyklaryňky ýaly şol operatoryň beren sertifikaty bilen sanawda işjeň.

## Sanawlar kime degişli?

Döwletlere. Dolandyryşyň üç gatlagy bar we her birinde başga tarap karar berýär ([ADR-0002](https://docs.tamga.network/adr/0002-sovereignty-first-governance)):

| Gatlak | Sorag | Kim karar berýär |
|---|---|---|
| Tora agzalyk | Täze döwlet goşulýarmy? | geňeş döredilenden soň agza döwletler üçden iki ses bilen |
| Milli sanaw | Döwlet haýsy guramalary we barlaýjylary hasaba alýar? | diňe şol döwlet |
| Ykrar etmek | Döwlet başga döwletiň resminamalaryny kabul edýärmi? | her döwlet özi üçin |

Bu ýerden iki netije çykýar. Döwlet hiç kimiň sesisiz çykyp biler. Döwleti aýyrmak bolsa onuň raýatlarynyň gapjyklaryndaky resminamalary güýjüni ýitirmeýär; ol diňe täze ýazgylary togtadýar. Geňeş döredilenden soň hem ol toruň umumy düzgünlerini dolandyrýar we döwletiň öz guramalary barada karar berip bilmeýär.

## Şu günden fonda çenli ýol nähili?

![Şu günki wagtlaýyn operatordan geňeşe ýa-da fonda we umumy kitaba çenli](/blog/network-as-a-foundation/en/fig-yol.png)

**Häzir** Tamga wagtlaýyn operatordyr. Ol Türkiýe sanawyny milli ygtyýarly edaranyň adyndan çap edýär we muny sanawyň özünde aýdýar: `operator` meýdanynda `"status": "provisional"` we hiç haçan boş galdyrylmaýan `on_behalf_of` bahasy bar. Hiç kime gerek bolmazdan öň agyr gurama döredilmeýär.

**Bir ýa-da iki döwlet goşulmaga isleg bildirende** dolandyryş edarasy döredilýär: agza döwletleriň geňeşi we işledilişi öz üstüne aljak fond ýa-da sekretariat. Sanawlar öz eýelerine tabşyrylýar, agza kabul etmek ýa-da umumy resminama görnüşini goşmak ýaly tor derejesindäki kararlar bolsa bilelikde kabul edilýär.

**Azyndan iki garaşsyz operator bolanda** ýazgylar hem rugsatly umumy kitaba geçýär, şeýlelikde hiç bir tarap olary ýeke özi üýtgedip bilmez. Bir operatoryň saklaýan kitaby çykdajy goşar, ýöne ynam goşmaz, şonuň üçin ol garaşýar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).

## Operator resminamalary bozmazdan nähili çalşyp biler?

Sebäbi belgiler operatora degişli däl. Guramanyň `issuer_id`-i onuň öz sertifikatyndan hasaplanýar, resminama görnüşleri üýtgemeýän URN-ler bilen atlandyrylýar we sanaw formatynda her döwlet üçin ýer we rollaryň doly toplumy eýýäm bar. Tabşyrmak `operator` meýdanyny, sanawyň salgysyny we gol çekijisini üýtgedýär. Gapjyklar we barlaýjylar üçin diňe salgy we gol çekiji üýtgeýär; adamlaryň gapjyklaryndaky resminamalar güýjünde galýar.

Domen ady, kök sertifikatlar, sanaw arhiwi we açarlar ýaly kodyň geçirip bilmeýän bölekleri ýazmaça mirasdüşerlik şertnamasy bilen geçýär. Munuň aňyrsyndaky düzgün şeýle: kodyň çäklendirip bilmeýän her ygtyýary (ýerleşdirmek, domen, ýazgy saklamak, statistika) syýasat, ölçenip bilinýän tabşyryş çägi we açyklyk hasabaty bilen çäklendirilýär (P7 ýörelgesi).

## Oňa çenli wagtlaýyn operatory dogruçyl saklaýan näme?

Diňe gowy niýet däl. Sanawlar gol çekilen, wersiýaly we heş-zynjyrly, hiç zat hiç haçan pozulmaýar. Her ýatyrylyş sanawynyň çap edilmegi açyk, sagatlaýyn labyr žurnalyna girýär. Her gurluş `trust.tamga.network` salgysyndaky açyk üýtgeşme žurnalyna ýazylýar. Düzgünler çärýeklik açyklyk hasabatyny we garaşsyz auditi goşýar; hasabatyň sahypasy entek çap edilmedi.

Munuň nirede togtaýandygyny hem aýdýarys. Häzir labyr bir operatoryň goluna daýanýar we açyk ýazgylar hyýanatçylygy mümkin däl etmeýär, diňe onuň öňüni alýar. Ikinji garaşsyz operator we ondan soňky umumy kitap hut şol boşlugy ýapmak üçin bar. Jikme-jiklik: [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work).

## Bu her gatnaşyjy üçin näme aňladýar?

![Kim näme işledýär: tor, döwletler, gapjyklar we hyzmat kompaniýalary](/blog/network-as-a-foundation/en/fig-ayrim.png)

- **Guramalar** integrasiýada olara haýsy hyzmat kompaniýasy kömek etse-de (ýa-da hiç biri kömek etmese-de) birmeňzeş şertlerde hasaba durýar.
- **Gapjyklar** ady boýunça däl, ýazgysy we düzgünlere laýyklygy boýunça ykrar edilýär.
- **Hyzmat kompaniýalary** tordan daşarda bäsleşýär; toruň düzgünleri olaryň hemmesi üçin birmeňzeş.
- **Döwletler** öz sanawlary barada ýeke-täk söz hukugyny saklaýar we häzir Tamga-nyň Türkiýe üçin wagtlaýyn saklaýan rollaryny taýýar bolan wagty öz üstüne alyp biler ([Döwletler üçin](/learn/for-states)).

## Köp berilýän soraglar

### Fond döredildimi?

Entek ýok. Dolandyryş edarasy bir ýa-da iki döwlet goşulmaga isleg bildirende döredilýär. Oňa çenli Tamga wagtlaýyn operatordyr we sanawlar muny aýdýar.

### Kompaniýa ileri tutulmak ýa-da has gowy ýazgy üçin töläp bilermi?

Ýok. Tor hyzmat satmaýar, onuň salgylanma hyzmatlary we hasaba alyş tertibi ähli gatnaşyjylar üçin birmeňzeş şertlerde açyk. Hiç bir kompaniýa başgaça garalmaýar.

### Tamga Wallet-iň torda aýratyn orny barmy?

Ýok. Ol toruň gapjyklarynyň biri, ony öz operatory işledýär we ol beýleki gapjyklar ýaly sanawa goşulýar.

### Döwlet tordan çykanda adamlaryň resminamalaryna näme bolýar?

Olar güýjünde galýar. Çykmak döwletiň täze ýazgylary ýazmagyny togtadýar; berlen zatlary ýatyrmaýar. Beýleki döwletleriň şol resminamalary kabul etmegi dowam etdirjekdigi her döwletiň öz ykrar ediş kararydyr.

### Bir döwlet tory eýeläp bilermi?

Her döwlet diňe öz sanawyny ýazýar, täze agzany kabul etmek üçin agza döwletleriň üçden ikisi gerek, ykrar etmek baradaky karary bolsa her döwlet özi üçin berýär. Hiç bir döwlet başgasynyň sanawyny dolandyrmaýar.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arhitektura we dolandyryş](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework)
- [ADR-0002: özygtyýarlylyga esaslanýan dolandyryş](https://docs.tamga.network/adr/0002-sovereignty-first-governance) · [ADR-0037: tor diňe tordur](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [ADR-0009: zynjyrsyz beta we zynjyr çägi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [Dolandyryş](/learn/governance) · [Biz barada](/about) · [Ýol kartasy](/roadmap)

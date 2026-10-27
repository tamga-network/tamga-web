---
title: "eIDAS 2.0 we ARF: türki dünýäsi üçin näme aňladýar?"
slug: eidas-arf-for-the-turkic-world
description: ÝB-niň eIDAS 2.0 we salgylanma çarçuwasy bilen näme gurandygyny, munuň haçandan ulanylýandygyny, ÝB-den daşardaky döwletler üçin näme üçin möhümdigini we onuň çäklerini düşündirýäris.
date: 2026-10-08
lang: tk
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Sources: Regulation (EU) 2024/1183 (EUR-Lex, checked 2026-10-08): adopted 11.4.2024, OJ 30.4.2024, in force 20.5.2024; amended Regulation 910/2014 Art. 5a (wallets; 5a(1) 24 months after the implementing acts; 5a(2) provided by, under mandate from or recognised by a member state), 5b (wallet-relying parties: registration), 5c (certification), 5d (list of certified wallets), 5f (cross-border reliance; 5f(2) 36 months), 14(1) (third-country trust services recognised as equivalent to qualified trust services through implementing acts or an agreement under Art. 218 TFEU), 22 (trusted lists), 45b-45h (electronic attestations of attributes, qualified, public-sector). Implementing Regulations (EUR-Lex headers): 2024/2977 PID and EAA, 2024/2979 integrity and core functionalities, 2024/2980 notifications on the wallet ecosystem, 2024/2981 certification, 2024/2982 protocols and interfaces (all 28.11.2024, OJ 4.12.2024; note 2024/2978 is unrelated); 2025/848 registration of wallet-relying parties and 2025/849 list of certified wallets (6.5.2025, OJ 7.5.2025); 2025/1569 QEAA and public-sector EAA (29.7.2025, OJ 30.7.2025); 2026/1731 amending 2024/2977, 2979, 2980, 2982 as regards standards and specifications (15.7.2026, OJ 22.7.2026). EU ARF v3.0.0 GitHub release 2026-07-23. Commission page "EUDI Wallet implementation": four large-scale pilots (EWC, POTENTIAL, NOBID, DC4EU) launched April 2023, over 350 entities from 26 member states, Norway, Iceland and Ukraine. Second-wave pilots WE BUILD and APTITUDE (2025): public consortium pages and press. ETSI TS 119 602 (LoTE). OTS: Digital Economy Partnership Agreement signed 6.11.2024 in Bishkek, Türkiye's ratification law in the Official Gazette 23.6.2026 (press); Turkistan informal summit 15.5.2026, declaration calls for completing consideration of a draft Agreement on the Mutual Recognition of Electronic Digital Signatures (press; OTS PDF not machine-readable from here). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3 (TDT member and observer slots), §1.4 (Art. 14), §6 (three interoperability levels), §6.1 (external lists, LoTE); ADR-0035 (EU-compatible, PO1-PO4), ADR-0036 (external lists; none added); live lotl.json (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved), checked 2026-10-08. -->

eIDAS 2.0 ÝB-niň her agza döwletini 2026-njy ýylyň ahyryna çenli sanly şahsyýet gapjygyny hödürlemäge borçly edýän regulamentidir. Architecture and Reference Framework (ARF) bolsa şu regulamentiň aňyrsyndaky tehniki taslamadyr. Ikisi bilelikde doly ynam ulgamyny kesgitleýär. Bu ulgama gapjyk, döwletiň berýän şahsyýet maglumatlary, diplom ýaly attestasiýalar, gol çekilen ynam sanawlary, maglumat soraýan her hyzmatyň hasaba alynmagy we sertifikatlaşdyrma girýär. Regulament türki dünýäsine degişli däl, ýöne onuň standartlary ÝB-däki banklaryň, uniwersitetleriň we iş berijileriň okajak umumy diline öwrülýär. ÝB-den daşardaky döwlet bu dili häzirden kabul edip biler. ÝB-niň bu resminamalary ykrar etmegi bolsa aýry ädimdir we ol ädimi hökümetler ädýär.

## ÝB eIDAS 2.0 bilen näme gurdy?

eIDAS 2.0 ady bilen tanalýan (ÝB) 2024/1183 Regulamenti 2014-nji ýylyň eIDAS regulamentini üýtgedýär ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014-nji ýylyň teksti esasan milli elektron şahsyýet ulgamlary we elektron gol bilen baglydy. 2024-nji ýylyň teksti bulara telefondaky gapjygyň töwereginde gurlan tutuş ekoulgamy goşýar. Bu ekoulgam alty gurluşyk blokuna daýanýar:

![eIDAS 2.0-yň alty gurluşyk bloky: gapjyk, PID, attestasiýalar, ynam sanawlary, daýanýan taraplaryň hasaba alynmagy, sertifikatlaşdyrma](/blog/eidas-arf-for-the-turkic-world/en/fig-yapi-taslari.png)

| Gurluşyk bloky | Näme üçin gerek | Hukuky esasy |
|---|---|---|
| **European Digital Identity Wallet** | Adamyň şahsyýet maglumatlaryny we resminamalaryny saklaýan we olary adamyň gözegçiligi astynda paýlaşýan programma | 5a madda |
| **PID** (adamy tanadýan maglumatlar) | Döwletiň ýa-da döwletiň adyndan bir edaranyň ýokary ynamlylyk derejesinde berýän esasy şahsyýet maglumatlary | 5a madda, 2024/2977 Ýerine ýetiriş regulamenti |
| **Häsiýetleriň elektron attestasiýalary** | Diplom, ygtyýarnama, agzalyk ýaly galan ähli resminamalar. *Kwalifisirlenen* attestasiýany (QEAA) kwalifisirlenen ynam hyzmatlaryny üpjün ediji, döwlet pudagynyň attestasiýasyny (PuB-EAA) bolsa ygtyýarly çeşmä jogapkär döwlet edarasy berýär | 45b–45h maddalar, 2025/1569 Ýerine ýetiriş regulamenti |
| **Ynam sanawlary** | Haýsy üpjün edijä haýsy iş üçin ynanylýandygyny görkezýän gol çekilen sanawlar | 22 madda; ETSI TS 119 612 we ETSI TS 119 602 |
| **Daýanýan taraplaryň hasaba alynmagy** | Gapjykdan maglumat soramak isleýän her hyzmat agza döwletde hasaba durýar we näme we näme üçin soraýandygyny yglan edýär | 5b madda, 2025/848 Ýerine ýetiriş regulamenti |
| **Sertifikatlaşdyrma** | Gapjyklar ulanylmaga berilmezden öň laýyklygy bahalandyrýan edaralar tarapyndan sertifikatlaşdyrylýar | 5c madda, 2024/2981 Ýerine ýetiriş regulamenti |

Bu tablisada iki zat aňsatlyk bilen üns merkezinden düşüp biler. Ulgamy serhetleriň aňyrsynda işledýän zat ynam sanawlarydyr. Bir ýurtdaky barlaýjynyň başga ýurtdaky her uniwersitet bilen aýratyn ylalaşyk baglaşmagy gerek däl, sebäbi bir gol çekilen sanawy okamak ýeterlik ([gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)). Daýanýan taraplaryň hasaba alynmagy hem adamy iň bolmanda gol ýaly goraýar. Gapjyk hyzmatyň soraýan meýdanlaryny onuň hasaba alyşda yglan edenleri bilen deňeşdirip bilýär we artygy soralanda adamy duýdurýar.

## ARF näme we onuň regulament bilen baglanyşygy nähili?

Regulament borçlary kesgitleýär. Ýerine ýetiriş regulamentleri tehniki jikme-jiklikleri düzgünleşdirýär we standartlara salgylanýar. ARF bolsa bularyň hemmesini bir arhitekturada birleşdirýän salgylanma resminamasydyr. Rollary, akymlary, maglumat modelini, ynam modelini, her rol üçin ýokary derejeli talaplary we her resminama görnüşiniň düzgünler kitabyny (rulebook) şu ýerde tapýarsyňyz. Ýewropa Komissiýasy ARF-i GitHub-da açyk çap edýär. Häzirki wersiýasy 3.0.0 we ol 2026-njy ýylyň 23-nji iýulynda çykdy ([ARF wersiýasy](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Bu gurluşyň aşagynda her kimiň ulanyp bilýän açyk standartlary ýatýar. Resminamalar üçin IETF SD-JWT VC we ISO/IEC 18013-5 mdoc, resminamalary bermek we görkezmek üçin HAIP profili bilen bilelikde OpenID4VCI we OpenID4VP, ýatyrmak üçin IETF Token Status List, guramalar üçin X.509 sertifikatlary we ETSI-niň ynam sanawy formatlary ulanylýar. ETSI TS 119 602 ynamly subýektleriň sanawlaryny (LoTE, lists of trusted entities) kesgitleýär. Gapjyk üpjün edijileri, PID üpjün edijileri we kwalifisirlenen ynam hyzmatlaryny üpjün ediji bolmadyk beýleki subýektler üçin ulanylýan JSON sanaw formaty hem şudur ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartlaryň hiç biri diňe ÝB bilen çäklenmeýär we ÝB-den daşardakylar üçin mümkinçilik hem edil şu ýerde döreýär.

## Her bölek haçandan ulanylýar?

![2024-nji ýyldaky regulamentden 2027-nji ýylyň ahyrynda gapjyklary kabul etmek borjuna çenli eIDAS 2.0 senenamasy](/blog/eidas-arf-for-the-turkic-world/en/fig-takvim.png)

| Sene | Waka | Çeşme |
|---|---|---|
| 2024-nji ýylyň 20-nji maýy | (ÝB) 2024/1183 Regulamenti güýje girýär | regulamentiň 2-nji maddasy |
| 2024-nji ýylyň 24-nji dekabry | Ilkinji bäş ýerine ýetiriş regulamenti güýje girýär: 2024/2977 (PID we attestasiýalar), 2024/2979 (gapjygyň bitewiligi we esasy funksiýalary), 2024/2980 (habarnamalar), 2024/2981 (sertifikatlaşdyrma), 2024/2982 (protokollar we interfeýsler) | 2024-nji ýylyň 28-nji noýabrynda kabul edildi, 2024-nji ýylyň 4-nji dekabrynda çap edildi |
| 2025-nji ýylyň 7-nji maýy | 2025/848 (daýanýan taraplaryň hasaba alynmagy) we 2025/849 (sertifikatlaşdyrylan gapjyklaryň sanawy) çap edildi | 2025-nji ýylyň 6-njy maýynda kabul edildi |
| 2025-nji ýylyň 30-njy iýuly | 2025/1569 (kwalifisirlenen we döwlet pudagynyň attestasiýalary) çap edildi | 2025-nji ýylyň 29-njy iýulynda kabul edildi |
| 2026-njy ýylyň 22-nji iýuly | Ilkinji namalaryň dördüsiniň salgylanýan standartlaryny täzeleýän 2026/1731 çap edildi | 2026-njy ýylyň 15-nji iýulynda kabul edildi |
| 2026-njy ýylyň 23-nji iýuly | ARF 3.0.0 çykaryldy | GitHub |
| 2026-njy ýylyň ahyry | Her agza döwlet azyndan bir gapjyk hödürleýär | 5a(1) madda: ýerine ýetiriş namalaryndan 24 aý soň |
| 2027-nji ýylyň ahyry | Güýçli tanamany ulanmaly hususy hyzmatlar (bank, ulag, energiýa, saglyk, bilim, telekommunikasiýa we beýlekiler) ulanyjy haýyş edende gapjygy kabul edýär | 5f(2) madda: 36 aý |

Barlaýjylar üçin iň möhüm setir iň soňkusydyr. 2027-nji ýylyň ahyryndan başlap ÝB-däki bank adam haýyş etse, gapjyk bilen geçirilen tanamany kabul etmäge borçly bolar. Şol seneleriň ädimme-ädim düşündirişini [Ýewropa senenamasy](/learn/eu-timeline) sahypasynda tapyp bilersiňiz.

## Möhletden öň ol nähili synagdan geçirildi?

Komissiýa ARF-i hakyky hyzmatlarda işledýän uly göwrümli pilot taslamalary maliýeleşdirdi. Olaryň dördüsi 2023-nji ýylyň aprelinde başlady. EWC syýahat resminamalaryny, POTENTIAL döwlet hyzmatlaryny, bank işini, telekommunikasiýany, sürüjilik şahadatnamalaryny, goly we saglygy, NOBID tölegleri, DC4EU bolsa bilimi we durmuş üpjünçiligini synagdan geçirdi. Komissiýanyň maglumatyna görä, bu pilotlar 26 agza döwletden, Norwegiýadan, Islandiýadan we Ukrainadan 350-den gowrak döwlet we hususy guramany bir ýere jemledi ([Komissiýa: EUDI Wallet implementation](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). WE BUILD we APTITUDE atly ýene iki pilot 2025-nji ýylda başlady.

Bu sanawda Ukrainanyň hem bolmagy üns çekiji, sebäbi ÝB-den daşardaky ýurt ulgamy agza döwletler bilen bilelikde synagdan geçirdi. Pilot taslamalara gatnaşmak hukuky ykrar etmegi döretmeýär, ýöne tehniki işiň goňşy ýurtlara açykdygyny görkezýär. DC4EU bilim resminamalaryny hem synagdan geçirdi. Türki döwletler bilen Ýewropanyň arasynda gatnaýan talyplar we uçurymlar üçin iň möhüm resminamalar hem şulardyr.

## Näme üçin laýyklyk ÝB-den daşardaky ýurt üçin möhüm?

Adamlar, harytlar we diplomlar serhedi eýýäm geçýär we serhediň bir tarapynda resminamalar ýakyn wagtda sanly bolar. Munuň täsiri has köp üç ugurda görünýär:

- **Bilim.** Bişkekden bir uçurym Germaniýada magistratura okuwyna arza berýär. Diplomy ÝB-niň ulanýan formatynda gol çekilen resminama bolsa, kabul ediş bölüminiň programmasy ony birnäçe sekuntda barlaýar. Diplom skanirlenen PDF bolsa, kimdir biri e-poçta ýazyp jogaba garaşmaly bolýar.
- **Iş we hereketlilik.** Daşkentden bir inžener Mýunhene göçýär. ÝB-däki iş berijiler we banklar gapjykdaky resminamalary okamaga taýýarlanýar. Şol formatdaky resminama hem bu işe göni girip biler.
- **Söwda.** Bakudaky kompaniýa öz hasaba alnyşyny, ygtyýarnamalaryny ýa-da sertifikatlaryny ÝB-däki hyzmatdaşyna subut edýär. Şahsy resminamalary göterýän sanawlar we formatlar kompaniýanyň resminamalaryny hem göterip biler.

Bu mysallaryň her birinde iki aýry şert ýerine ýetirilmeli. Resminamanyň *okalyp bilinmegi* formatlara we protokollara bagly. Resminamany berijiniň *ynamly* hasaplanmagy bolsa sanawlara we ykrar etmäge bagly. Şonuň üçin Tamga Trust Framework özara işleşigi üç derejä bölýär:

![Özara işleşigiň üç derejesi: göçürip bolmak we ynam tehniki, hukuky ykrar etmek syýasy](/blog/eidas-arf-for-the-turkic-world/en/fig-uc-seviye.png)

1. **Göçürip bolmak.** Iki tarap hem şol bir formatlary we protokollary ulanýar, şonuň üçin ÝB gapjygy ýa-da barlaýjysy resminamany tehniki taýdan işläp bilýär. Bu derejä häzirden inženerçilik işi bilen ýetip bolýar.
2. **Ynam.** Ynam sanawlary biri-birine salgylanýar we her sanaw diňe kesgitlenen gerim üçin kepil geçip bilýär. Bu dereje hem tehniki, ýöne iki tarap hem haýsy sanawa ynanjakdygyny çözmeli.
3. **Hukuky ykrar etmek.** Döwlet ýa-da ÝB başga tarapyň resminamalaryny hukuky netije döredýän resminama hökmünde kabul edýär. Bu karary hökümetler kanun ýa-da ylalaşyk arkaly berýär.

Ilkinji iki derejäni üçünjiden öň gurup bolýar we ir başlamagyň manysy hem şunda. Iki hökümet biri-biriniň resminamalaryny ykrar etmegi karar edende, şol resminamalary göterýän ulgamlar eýýäm laýyk bolýar. Şeýlelikde hiç kim diňe format üýtgedi diýip diplomyny täzeden almaly bolmaýar.

## Türki dünýäsi sanly ynam babatda häzir näme edýär?

Türki Döwletleriň Guramasy sanly hyzmatdaşlygy gün tertibine goýdy. Agza döwletler 2024-nji ýylyň 6-njy noýabrynda Bişkek sammitinde Sanly ykdysadyýet hyzmatdaşlygy ylalaşygyna gol çekdi. Ylalaşyk elektron söwdany, kagyzsyz söwdany, elektron goly, maglumatlary goramagy we kiberhowpsuzlygy öz içine alýar. Türkiýäniň tassyklaýyş kanuny hem 2026-njy ýylyň iýunynda Resmi Gazetde çap edildi ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 2026-njy ýylyň 15-nji maýynda Türkistanda geçirilen resmi däl sammitiň temasy emeli aň we sanly ösüşdi. Metbugatyň habaryna görä, sammitiň jarnamasy agza döwletleri elektron sanly gollaryň özara ykrar edilmegi baradaky ylalaşyk taslamasyna seredip gutarmaga çagyrýar. Gazagystanyň Prezidenti hem sanly gollaryň we elektron resminamalaryň özara ykrar edilmegini teklip etdi ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

Gollaryň özara ykrar edilmegi ýokardaky modeliň hukuky derejesine gabat gelýär. Umumy ynam gatlagy bolsa onuň aşagyndaky tehniki derejedir. Tamga Network-yň Türki Döwletleriň Guramasy ýa-da onuň agza döwletleriniň haýsydyr biri bilen ylalaşygy ýok. Tehniki derejäni döwletler ulanmak islände taýýar bolsun diýip gurýarys.

## Tamga Network ÝB modelinden näme alýar?

Tamga Network ÝB modeliniň tehniki gatlagyny bolşy ýaly alýar. Biziň düzgünimiz resminama, protokol we ynam sanawy formatlarynyň ÝB standartlaryndan aýrylmazlygydyr. Tamga-a mahsus her goşundy standartyň hödürleýän giňeltme nokady arkaly edilýär we standart müşderileri bozmaýar ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

| ÝB elementi | Tamga Network-da |
|---|---|
| SD-JWT VC we ISO mdoc | şol bir; şahsyýet resminamalary iki formatda |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | şol bir |
| Token Status List | şol bir |
| LOTL we milli ynam sanawlary | şol bir iki derejeli model; her türki döwlet üçin ýer |
| LoTE (ETSI TS 119 602) | daşarky sanawlar üçin okalýan ilkinji format |
| Daýanýan taraplaryň hasaba alynmagy we hasaba alyş sertifikatlary | ÝB-niň umumy hasaba alyş maglumat toplumy we sertifikat modeli |
| ARF rollar toplumy | her roluň, boş bolanda hem, her milli sanawda ýeri bar |

Dolandyryş gatlagyny bolsa türki dünýäsi üçin ýazýarys. Her döwlet öz sanawynyň ýeke-täk awtorydyr we döwletleriň arasyndaky ykrar etmek baradaky karary her döwlet özi berýär. Gabat getirmäniň doly görnüşini we Tamga düzgünleriniň ÝB düzgünlerinden nirede we näme üçin tapawutlanýandygyny [Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk](/blog/tamga-arf) ýazgysynda düşündirdik.

Toruň sanawlar sanawynda eýýäm Türki Döwletleriň Guramasynyň her agza döwleti we iki synçy döwlet üçin bölünip goýlan ýer bar we her döwlet öz sanawyny kabul edip alyp biler ([tor näme üçin gaznä geçiriler](/blog/network-as-a-foundation)). Häzirki wagtda diňe Türkiýe sanawy işjeň. Tamga bu sanawy milli edaranyň adyndan wagtlaýyn çap edýär we sanawyň özi hem muny görkezýär. Beýleki ýerler bölünip goýlan. Janly sanawy `trust.tamga.network` salgysynda okap bilersiňiz.

## Dogruçyl çäkler haýsylar?

- **Tamga Network-y ÝB ykrar etmedi.** Tor ÝB bilen laýyk, ýagny şol bir standartlary ulanýar we muny synaglar bilen görkezýär. "EUDI Wallet" bolsa agza döwletiň hödürleýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlaşdyrylan gapjyklaryna berilýän hukuky derejedir. ÝB-den daşarda hiç bir tor ýa-da gapjyk häzir bu derejäni ulanyp bilmeýär.
- **Regulamentde gysga ýol ýok.** eIDAS-yň 14-nji maddasy üçünji ýurtdaky ynam hyzmatlaryna ÝB-däki kwalifisirlenen ynam hyzmatlaryna deň garamaga rugsat berýär. Munuň üçin bolsa ýa ÝB ýerine ýetiriş namasy, ýa-da TFEU-nyň 218-nji maddasy boýunça ÝB bilen şol ýurduň arasynda baglaşylan ylalaşyk gerek. Bu hökümetleriň arasynda geçirilýän gepleşikdir. Tamga tehniki tarapy taýýarlap biler, ýöne bu işi başlap ýa-da tamamlap bilmez.
- **Entek hiç bir daşarky sanaw goşulmady.** Başga döwletiň ýa-da ÝB-niň sanawyny gol çekijisi berkidilen we gerimi kesgitlenen görnüşde görkezmäge mümkinçilik berýän mehanizm taýýar ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Ýöne her goşundy aýratyn we ýazga geçirilýän karary talap edýär we häzire çenli şeýle karar kabul edilmedi.
- **Ynam ýakory häzir bir operatora daýanýar.** Sanawlara gol çekilýär, olar wersiýalanýar we açyk žurnalda ýazga alynýar. Şeýle-de bolsa ikinji garaşsyz operator goşulýança tor ýeke gola daýanýar we çarçuwa muny belli çäk hökmünde ýazýar ([Tamga ARF](https://arf.tamga.network/architecture)).
- **Türki döwletleriň arasynda ykrar etmek hem syýasy karar.** Gazagystandaky barlaýjynyň Türkiýedäki uniwersitete ynanjakdygyny ýa-da ynanmajakdygyny Gazagystan çözýär. Tor bu kararyň programma üpjünçiliginde aňsat aňladylmagyny we ulanylmagyny üpjün edýär, ýöne karary özi bermeýär.

## Köp berilýän soraglar

### eIDAS 2.0 Türkiýä ýa-da Merkezi Aziýa döwletlerine degişlimi?

Ýok. Regulament ÝB agza döwletlerini we onuň ÝB-niň içinde öz içine alýan hyzmatlaryny borçly edýär. Standartlary bolsa açyk we islendik döwlet ýa-da edara olary ulanyp biler. ÝB-de hyzmat hödürleýän kompaniýalar öz borçlaryny hukukçy bilen anyklamaly.

### Türkiýede berlen resminama ÝB-de kabul edilip bilnermi?

Resminama şol bir formatlary ulanýan bolsa, ÝB-däki programmalar ony okap bilýär we Tamga resminamalary şol formatlary ulanýar. Resminamanyň hukuky netije döredýän görnüşde ynamly hasaplanmagy üçin bolsa ony beren edara ykrar edilmeli. Bu ykrar etmek ynam sanawlary bilen, kwalifisirlenen derejesi üçin bolsa 14-nji madda boýunça ylalaşyk ýa-da ýerine ýetiriş namasy bilen üpjün edilýär.

### Regulament bilen ARF-iň arasynda näme tapawut bar?

Regulament we ýerine ýetiriş namalary hukuky tekstlerdir. ARF bolsa Komissiýanyň taýýarlan tehniki salgylanma resminamasy bolup, şol namalaryň daýanýan arhitekturasyny, rollaryny we talaplaryny beýan edýär. Häzirki wersiýasy 2026-njy ýylyň 23-nji iýulynda çykan 3.0.0.

### Tamga Network Türki Döwletleriň Guramasy bilen işleşýärmi?

Ýok. Gurama ýa-da onuň agza döwletleri bilen ylalaşygymyz ýok. Tor bu döwletleriň her biri üçin sanawda ýer bölüp goýýar we her döwletiň öz sanawyny islän wagty kabul edip alyp biljek görnüşinde taslandy.

### Ykrar etmek hökümetlere bagly bolsa, näme üçin häzir gurýarys?

Tehniki derejeleri gurmak wagt alýar we bu iş syýasy karara bagly däl. Bu derejeler taýýar bolsa, soňra kabul ediljek ykrar etmek karary adamlaryň elindäki resminamalara olary täzeden bermezden ulanylyp biler.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h maddalar
- Ýerine ýetiriş regulamentleri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Ýewropa Komissiýasy: EUDI Wallet implementation we uly göwrümli pilotlar](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [ÝB ynam sanawlaryny gözden geçiriji](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDG Sanly ykdysadyýet hyzmatdaşlygy ylalaşygy](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türkistan resmi däl sammiti](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [ADR-0035: orun kesgitlemek](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: ynam federasiýasy](https://docs.tamga.network/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Döwletler üçin](/learn/for-states) · [Manifest](/manifesto)

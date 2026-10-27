---
title: "eIDAS 2.0 we ARF: türki dünýäsi üçin näme aňladýar"
slug: eidas-arf-for-the-turkic-world
description: ÝB eIDAS 2.0 we onuň salgylanma çarçuwasy bilen näme gurdy, ol haçan ulanylýar, ÝB-den daşardaky döwletler üçin laýyklyk näme üçin möhüm we onuň çäkleri nirede.
date: 2026-10-08
lang: tk
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Sources: Regulation (EU) 2024/1183 (EUR-Lex, checked 2026-10-08): adopted 11.4.2024, OJ 30.4.2024, in force 20.5.2024; amended Regulation 910/2014 Art. 5a (wallets; 5a(1) 24 months after the implementing acts; 5a(2) provided by, under mandate from or recognised by a member state), 5b (wallet-relying parties: registration), 5c (certification), 5d (list of certified wallets), 5f (cross-border reliance; 5f(2) 36 months), 14(1) (third-country trust services recognised as equivalent to qualified trust services through implementing acts or an agreement under Art. 218 TFEU), 22 (trusted lists), 45b-45h (electronic attestations of attributes, qualified, public-sector). Implementing Regulations (EUR-Lex headers): 2024/2977 PID and EAA, 2024/2979 integrity and core functionalities, 2024/2980 notifications on the wallet ecosystem, 2024/2981 certification, 2024/2982 protocols and interfaces (all 28.11.2024, OJ 4.12.2024; note 2024/2978 is unrelated); 2025/848 registration of wallet-relying parties and 2025/849 list of certified wallets (6.5.2025, OJ 7.5.2025); 2025/1569 QEAA and public-sector EAA (29.7.2025, OJ 30.7.2025); 2026/1731 amending 2024/2977, 2979, 2980, 2982 as regards standards and specifications (15.7.2026, OJ 22.7.2026). EU ARF v3.0.0 GitHub release 2026-07-23. Commission page "EUDI Wallet implementation": four large-scale pilots (EWC, POTENTIAL, NOBID, DC4EU) launched April 2023, over 350 entities from 26 member states, Norway, Iceland and Ukraine. Second-wave pilots WE BUILD and APTITUDE (2025): public consortium pages and press. ETSI TS 119 602 (LoTE). OTS: Digital Economy Partnership Agreement signed 6.11.2024 in Bishkek, Türkiye's ratification law in the Official Gazette 23.6.2026 (press); Turkistan informal summit 15.5.2026, declaration calls for completing consideration of a draft Agreement on the Mutual Recognition of Electronic Digital Signatures (press; OTS PDF not machine-readable from here). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3 (TDT member and observer slots), §1.4 (Art. 14), §6 (three interoperability levels), §6.1 (external lists, LoTE); ADR-0035 (EU-compatible, PO1-PO4), ADR-0036 (external lists; none added); live lotl.json (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved), checked 2026-10-08. -->

eIDAS 2.0 her agza döwletiň 2026-njy ýylyň ahyryna çenli sanly şahsyýet gapjygyny hödürlemegini talap edýän ÝB kanunydyr. Architecture and Reference Framework (ARF) onuň aňyrsyndaky tehniki taslamadyr. Olar bilelikde doly ynam ulgamyny kesgitleýär: gapjyk, döwletiň berýän şahsyýet maglumatlary, diplom ýaly attestasiýalar, gol çekilen ynam sanawlary, maglumat soraýan her hyzmatyň hasaba alynmagy we sertifikatlaşdyrma. Türki dünýäsi üçin kanunyň özi ulanylmaýar, ýöne onuň standartlary ÝB banklarynyň, uniwersitetleriniň we iş berijileriniň okajak umumy diline öwrülýär. ÝB-den daşardaky döwlet bu dili häzir kabul edip biler. ÝB tarapyndan ykrar edilmek aýry ädimdir we ony hökümetler ädýär.

## ÝB eIDAS 2.0 bilen näme gurdy?

eIDAS 2.0 diýlip atlandyrylýan (ÝB) 2024/1183 Regulamenti 2014-nji ýylyň eIDAS regulamentine üýtgeşme girizýär ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014-nji ýylyň teksti esasan milli eID shemalary we elektron gollar bilen meşgullanýardy. 2024-nji ýylyň teksti telefondaky gapjygyň töwereginde doly ekoulgam goşýar. Ony alty gurluşyk bloky göterýär:

![eIDAS 2.0-yň alty gurluşyk bloky: gapjyk, PID, attestasiýalar, ynam sanawlary, daýanýan taraplaryň hasaba alynmagy, sertifikatlaşdyrma](/blog/eidas-arf-for-the-turkic-world/en/fig-yapi-taslari.png)

| Gurluşyk bloky | Ol näme | Hukuky esasy |
|---|---|---|
| **European Digital Identity Wallet** | Adamyň şahsyýet maglumatlaryny we resminamalaryny saklaýan we olary adamyň gözegçiligi astynda paýlaşýan programma | 5a madda |
| **PID** (adamy tanadýan maglumatlar) | Döwlet tarapyndan ýa-da döwlet üçin ýokary ynamlylyk derejesinde berilýän esasy şahsyýet maglumatlary | 5a madda, 2024/2977 Ýerine ýetiriş regulamenti |
| **Häsiýetleriň elektron attestasiýalary** | Beýleki ähli resminamalar: diplomlar, ygtyýarnamalar, agzalyklar. *Kwalifisirlenen* attestasiýa (QEAA) kwalifisirlenen ynam hyzmatlaryny üpjün edijiden gelýär; döwlet pudagynyň attestasiýasy (PuB-EAA) ygtyýarly çeşmä jogapkär edaradan gelýär | 45b–45h maddalar, 2025/1569 Ýerine ýetiriş regulamenti |
| **Ynam sanawlary** | Haýsy üpjün edijileriň nämä ynanylýandygyny aýdýan gol çekilen sanawlar | 22 madda; ETSI TS 119 612 we ETSI TS 119 602 |
| **Daýanýan taraplaryň hasaba alynmagy** | Gapjykdan maglumat soramak isleýän her hyzmat agza döwletde hasaba durýar we näme soraýandygyny hem-de näme üçin soraýandygyny yglan edýär | 5b madda, 2025/848 Ýerine ýetiriş regulamenti |
| **Sertifikatlaşdyrma** | Gapjyklar hödürlenmezden öň laýyklygy bahalandyrýan edaralar tarapyndan sertifikatlaşdyrylýar | 5c madda, 2024/2981 Ýerine ýetiriş regulamenti |

Iki nokady üns bermän geçip bolýar. Birinjiden, ulgamy serhetleriň üstünden işledýän zat ynam sanawlarydyr. Bir ýurtdaky barlaýja başga ýurtdaky her uniwersitet bilen hususy ylalaşyk gerek däl; ol bir gol çekilen sanawy okaýar ([gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work)). Ikinjiden, daýanýan taraplaryň hasaba alynmagy adamy gol ýaly goraýar: gapjyk hyzmatyň soraýan zadyny onuň soramak üçin hasaba alnan zady bilen deňeşdirip we haýyş artyk bolanda duýduryp biler.

## ARF näme we ol kanun bilen nähili baglanyşykly?

Regulament borçlary kesgitleýär. Ýerine ýetiriş regulamentleri tehniki jikme-jiklikleri kesgitleýär we standartlara salgylanýar. ARF bularyň hemmesini bir arhitektura birleşdirýän salgylanma resminamasydyr: rollar, akymlar, maglumat modeli, ynam modeli, her rol üçin ýokary derejeli talaplar we her resminama görnüşi üçin rulebook-lar. Ýewropa Komissiýasy ony GitHub-da açyk çap edýär. Onuň häzirki 3.0.0 wersiýasy 2026-njy ýylyň 23-nji iýulynda çykaryldy ([ARF wersiýasy](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Onuň aşagynda her kimiň ulanyp biljek açyk standartlary bar: resminamalar üçin IETF SD-JWT VC we ISO/IEC 18013-5 mdoc, olary bermek we görkezmek üçin HAIP profili bilen OpenID4VCI we OpenID4VP, ýatyrylyş üçin IETF Token Status List, guramalar üçin X.509 sertifikatlary we ETSI ynam sanawy formatlary. ETSI TS 119 602 gapjyk üpjün edijiler, PID üpjün edijiler we kwalifisirlenen ynam hyzmatlaryny üpjün ediji bolmadyk beýleki subýektler üçin ulanylýan JSON sanaw formaty bolan ynamly subýektleriň sanawlaryny (LoTE) kesgitleýär ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartlaryň hiç biri ÝB bilen çäklendirilmeýär. Bu beýlekiler üçin açylýan mümkinçilikdir.

## Her bölek haçan ulanylýar?

![2024-nji ýyldaky regulamentden 2027-nji ýylyň ahyrynda gapjyklary kabul etmek borjuna çenli eIDAS 2.0 senenamasy](/blog/eidas-arf-for-the-turkic-world/en/fig-takvim.png)

| Sene | Waka | Çeşme |
|---|---|---|
| 2024-nji ýylyň 20-nji maýy | (ÝB) 2024/1183 Regulamenti güýje girýär | regulamentiň 2-nji maddasy |
| 2024-nji ýylyň 24-nji dekabry | Ilkinji bäş ýerine ýetiriş regulamenti güýje girýär: 2024/2977 (PID we attestasiýalar), 2024/2979 (gapjygyň bitewiligi we esasy funksiýalary), 2024/2980 (habarnamalar), 2024/2981 (sertifikatlaşdyrma), 2024/2982 (protokollar we interfeýsler) | 2024-nji ýylyň 28-nji noýabrynda kabul edildi, 2024-nji ýylyň 4-nji dekabrynda çap edildi |
| 2025-nji ýylyň 7-nji maýy | 2025/848 (daýanýan taraplaryň hasaba alynmagy) we 2025/849 (sertifikatlaşdyrylan gapjyklaryň sanawy) çap edildi | 2025-nji ýylyň 6-njy maýynda kabul edildi |
| 2025-nji ýylyň 30-njy iýuly | 2025/1569 (kwalifisirlenen we döwlet pudagynyň attestasiýalary) çap edildi | 2025-nji ýylyň 29-njy iýulynda kabul edildi |
| 2026-njy ýylyň 22-nji iýuly | Ilkinji namalaryň dördüsinde salgylanylýan standartlary täzeleýän 2026/1731 çap edildi | 2026-njy ýylyň 15-nji iýulynda kabul edildi |
| 2026-njy ýylyň 23-nji iýuly | ARF 3.0.0 çykaryldy | GitHub |
| 2026-njy ýylyň ahyry | Her agza döwlet azyndan bir gapjyk üpjün edýär | 5a(1) madda: ýerine ýetiriş namalaryndan 24 aý soň |
| 2027-nji ýylyň ahyry | Güýçli tanamany ulanmaly hususy hyzmatlar (bank, ulag, energiýa, saglyk, bilim, telekommunikasiýa we beýlekiler) ulanyjy haýyş edende gapjygy kabul edýär | 5f(2) madda: 36 aý |

Barlaýjy üçin iň möhümi soňky setirdir. 2027-nji ýylyň ahyryndan başlap ÝB-däki bank adam haýyş edende gapjyk bilen tanamagy kabul etmeli. Şol bir seneler ädimme-ädim [Ýewropa senenamasy](/learn/eu-timeline) sahypasynda.

## Möhletden öň ol nähili synagdan geçirildi?

Komissiýa ARF-i hakyky hyzmatlarda işledýän uly göwrümli pilotlary maliýeleşdirdi. Olaryň dördüsi 2023-nji ýylyň aprelinde başlady: EWC (syýahat resminamalary), POTENTIAL (döwlet hyzmatlary, bank, telekommunikasiýa, sürüjilik şahadatnamalary, gollar we saglyk), NOBID (tölegler) we DC4EU (bilim we durmuş üpjünçiligi). Komissiýanyň maglumatyna görä, olar 26 agza döwletden, Norwegiýadan, Islandiýadan we Ukrainadan 350-den gowrak döwlet we hususy guramany birleşdirdi ([Komissiýa: EUDI Wallet implementation](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). Ýene iki pilot, WE BUILD we APTITUDE, 2025-nji ýylda başlady.

Ukrainanyň şol sanawdaky orny üns bermäge mynasyp. ÝB-den daşardaky ýurt agza döwletler bilen bilelikde ulgamy synagdan geçirmäge gatnaşdy. Pilotlara gatnaşmak hukuky ykrar etmegi döretmeýär. Ýöne bu tehniki işiň goňşulara açykdygyny görkezýär. DC4EU bilim resminamalaryny hem synagdan geçirdi; bu türki döwletler bilen Ýewropanyň arasynda hereket edýän talyplar we uçurymlar üçin iň möhüm görnüşdir.

## Näme üçin laýyklyk ÝB-den daşardaky ýurt üçin möhüm?

Sebäbi adamlar, harytlar we kärler eýýäm serhetden geçýär, resminamalar bolsa onuň bir tarapynda sanly bolmagyň öňünde dur. Üç ýagdaý gaýtalanýar:

- **Bilim.** Bişkekden bir uçurym Germaniýada magistratura ýüz tutýar. Diplom ÝB formatynda gol çekilen resminama bolsa, kabul ediş bölüminiň programma üpjünçiligi ony birnäçe sekuntda barlap biler. Ol skanirlenen PDF bolsa, kimdir biri e-poçta ýazýar we garaşýar.
- **Iş we hereket.** Daşkentden bir inžener Münhene göçýär. ÝB-däki iş berijiler we banklar gapjyk resminamalaryny okamak üçin sazlanar; şol bir formatdaky resminama şol bir işe gabat gelýär.
- **Söwda.** Bakudaky kompaniýa öz hasaba alnyşyny, ygtyýarnamalaryny ýa-da sertifikatlaryny ÝB-däki hyzmatdaşyna subut edýär. Şahsy resminamalary göterýän şol bir sanawlar we formatlar şol attestasiýalary hem göterýär.

Her ýagdaýda iki dürli zat dogry bolmaly. Resminama *okalýan* bolmaly, bu formatlar we protokollar meselesi. Onuň berijisine bolsa *ynanylmaly*, bu sanawlar we ykrar etmek meselesi. Tamga Trust Framework özara işleşigi şu sebäpli üç derejä bölýär:

![Özara işleşigiň üç derejesi: göçürip bolmak we ynam tehniki, hukuky ykrar etmek syýasy](/blog/eidas-arf-for-the-turkic-world/en/fig-uc-seviye.png)

1. **Göçürip bolmak (portability).** Şol bir formatlar we protokollar. ÝB gapjygy ýa-da barlaýjysy resminamany tehniki taýdan işläp biler. Muňa şu gün inženerçilik bilen ýetip bolýar.
2. **Ynam.** Biri-birine salgylanýan ynam sanawlary, her sanaw diňe kesgitlenen gerim üçin kepil geçip bilýär. Bu hem tehniki, ýöne her tarapda haýsy sanawlara ynanmalydygy barada karar gerek.
3. **Hukuky ykrar etmek.** Döwlet ýa-da ÝB beýlekiniň resminamalaryny hukuky güýji bar diýip kabul edýär. Muny kanun ýa-da ylalaşyk arkaly hökümetler kesgitleýär.

Ilkinji iki derejäni üçünjiden öň gurup bolýar we ir gurmagyň manysy hem şunda. Iki hökümet biri-biriniň resminamalaryny ykrar etmegi karar edende, olary göterýän ulgamlar eýýäm laýyk. Format üýtgändigi üçin hiç kim diplomy täzeden bermeli bolmaýar.

## Türki dünýäsi sanly ynam babatda eýýäm näme edýär?

Türki Döwletleriň Guramasy sanly hyzmatdaşlygy öz gün tertibine goýdy. Onuň agza döwletleri 2024-nji ýylyň 6-njy noýabrynda Bişkek sammitinde elektron söwdany, kagyzsyz söwdany, elektron gollary, maglumatlary goramagy we kiberhowpsuzlygy öz içine alýan Sanly ykdysadyýet hyzmatdaşlygy ylalaşygyna gol çekdiler; Türkiýäniň tassyklama kanuny 2026-njy ýylyň iýunynda Resmi Gazetde çap edildi ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 2026-njy ýylyň 15-nji maýynda Türkistanda geçirilen resmi däl sammit emeli aňy we sanly ösüşi özüne tema edip aldy. Habar berlişi ýaly, onuň jarnamasy agza döwletleri elektron sanly gollary özara ykrar etmek baradaky ylalaşygyň taslamasyna garamagy tamamlamaga çagyrýar, Gazagystanyň prezidenti bolsa sanly gollary we elektron resminamalary özara ykrar etmegi teklip etdi ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

Gollary özara ykrar etmek ýokardaky modeliň hukuky derejesidir. Umumy ynam gatlagy onuň aşagyndaky tehniki derejedir. Tamga Network-yň Türki Döwletleriň Guramasy ýa-da onuň agza döwletleriniň hiç biri bilen ylalaşygy ýok; ol döwletler ulanmak islese taýýar bolsun diýip tehniki derejäni gurýar.

## Tamga Network ÝB modelinden näme alýar?

Tehniki gatlagy, üýtgetmän. Tamga-nyň düzgüni onuň resminama, protokol we ynam sanawy formatlarynyň ÝB standartlaryndan daşlaşmazlygy we Tamga mahsus islendik goşmaçanyň standart müşderileri bozmazdan standart giňeltme nokady arkaly geçmegidir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

| ÝB elementi | Tamga Network-da |
|---|---|
| SD-JWT VC we ISO mdoc | şol bir; şahsyýet resminamalary iki formatda |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | şol bir |
| Token Status List | şol bir |
| LOTL we milli ynam sanawlary | şol bir iki derejeli model; her türki döwlet üçin ýer |
| LoTE (ETSI TS 119 602) | daşarky sanawlar üçin okalýan ilkinji format |
| Daýanýan taraplaryň hasaba alynmagy we hasaba alyş sertifikatlary | ÝB-niň umumy hasaba alyş maglumat toplumy we sertifikat modeli |
| ARF rollar toplumy | her roluň, boş bolanda hem, her milli sanawda ýeri bar |

Dolandyryş gatlagy türki dünýäsi üçin ýazylan: her döwlet öz sanawynyň ýeke-täk awtorydyr we döwletleriň arasynda ykrar etmek baradaky karary her döwlet özi üçin berýär. Doly gabatlyk we Tamga-nyň düzgünleriniň ÝB-niňkiden nirede we näme üçin tapawutlanýandygy [Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk](/blog/tamga-arf) ýazgysynda.

Toruň ynam sanawlarynyň sanawynda Türki Döwletleriň Guramasynyň her agza döwleti we iki synçy döwlet üçin eýýäm ýer bar we her döwlet öz sanawyny öz üstüne alyp biler ([näme üçin tor fonda geçmeli](/blog/network-as-a-foundation)). Häzir diňe Türkiýe sanawy işjeň we sanawyň özünde aýdylyşy ýaly, Tamga ony milli ygtyýarly edaranyň adyndan wagtlaýyn çap edýär. Beýlekiler bellenen. Işleýän sanawy `trust.tamga.network` salgysynda okap bilersiňiz.

## Dogruçyl çäkler haýsylar?

- **Tamga Network ÝB tarapyndan ykrar edilmedi.** Ol ÝB bilen laýyk: şol bir standartlarda gürleýär we muny synaglar bilen görkezýär. "EUDI Wallet" agza döwletiň berýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlaşdyrylan gapjyklary üçin hukuky ýagdaýdyr. Şu gün ÝB-den daşardaky hiç bir tor ýa-da gapjyk ony talap edip bilmez.
- **Regulament arkaly gysga ýol ýok.** eIDAS-yň 14-nji maddasy üçünji ýurtdan gelýän ynam hyzmatlaryna ÝB-niň kwalifisirlenen ynam hyzmatlaryna deň garamaga rugsat berýär, ýöne diňe ÝB ýerine ýetiriş namasy ýa-da TFEU-nyň 218-nji maddasy boýunça ÝB bilen şol ýurduň arasyndaky ylalaşyk arkaly. Bu hökümetleriň arasyndaky gepleşikdir. Tamga tehniki tarapy taýýarlap biler; ol bu prosesi başlap ýa-da tamamlap bilmez.
- **Entek hiç bir daşarky sanaw goşulmady.** Başga döwletiň sanawyna ýa-da ÝB sanawyna salgylanmak mehanizmi berkidilen gol çekiji we kesgitlenen gerim bilen taýýar ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Her goşmaça aýry, ýazga alnan karardyr we heniz hiç biri kabul edilmedi.
- **Häzir ynam labyry bir operatora daýanýar.** Sanawlar gol çekilen, wersiýaly we açyk žurnala ýazylýar, ýöne ikinji garaşsyz operator goşulýança tor ýeke gola daýanýar. Bu çarçuwada belli çäk hökmünde aýdylýar ([Tamga ARF](https://arf.tamga.network/architecture)).
- **Türki döwletleriň arasynda ykrar etmek hem syýasydyr.** Gazak barlaýjysynyň türk uniwersitetine ynanmagy Gazagystanyň kararydyr. Tor bu karary aňlatmagy we programma üpjünçiliginde ýerine ýetirmegi aňsatlaşdyrýar; ol karary bermeýär.

## Köp berilýän soraglar

### eIDAS 2.0 Türkiýä ýa-da Merkezi Aziýa döwletlerine degişlimi?

Ýok. Ol ÝB agza döwletlerini we ÝB-de gurşalan hyzmatlary borçlandyrýar. Onuň standartlary açyk, şonuň üçin islendik döwlet ýa-da gurama olary ulanyp biler, ÝB-de hyzmat hödürleýän kompaniýalar bolsa öz borçlaryny hukukçy bilen barlamaly.

### Türkiýede berlen resminama ÝB-de kabul edilip bilnermi?

Ol şol bir formatlary ulanýan bolsa, ÝB programma üpjünçiligi ony okap biler, Tamga resminamalary bolsa şeýle. Hukuky güýç bilen ynanylmak üçin onuň berijisiniň ynam sanawlary arkaly, kwalifisirlenen ýagdaý üçin bolsa 14-nji madda boýunça ylalaşyk ýa-da ýerine ýetiriş namasy arkaly ykrar edilmegi gerek.

### Regulament bilen ARF-iň arasynda näme tapawut bar?

Regulament we onuň ýerine ýetiriş namalary kanundyr. ARF Komissiýanyň şol namalaryň daýanýan arhitekturasyny, rollaryny we talaplaryny beýan edýän tehniki salgylanmasydyr. 2026-njy ýylyň 23-nji iýulynda çykarylan 3.0.0 wersiýasy häzirki wersiýadyr.

### Tamga Network Türki Döwletleriň Guramasy bilen işleşýärmi?

Ýok. Gurama ýa-da onuň agza döwletleri bilen ylalaşyk ýok. Tor olaryň her biri üçin sanaw ýerini saklaýar we döwlet islän wagty öz sanawyny öz üstüne alyp biler ýaly taslanan.

### Ykrar etmek hökümetlere bagly bolsa näme üçin häzir gurmaly?

Sebäbi tehniki derejeler wagt alýar we syýasy karara bagly däl. Olar taýýar bolsa, soňky ykrar ediş karary adamlaryň eýýäm saklaýan resminamalaryna olary täzeden bermezden ulanylýar.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h maddalar
- Ýerine ýetiriş regulamentleri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Ýewropa Komissiýasy: EUDI Wallet implementation we uly göwrümli pilotlar](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [ÝB ynam sanawlaryny gözden geçiriji](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDG Sanly ykdysadyýet hyzmatdaşlygy ylalaşygy](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türkistan resmi däl sammiti](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [ADR-0035: orun kesgitlemek](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: ynam federasiýasy](https://docs.tamga.network/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Döwletler üçin](/learn/for-states) · [Manifest](/manifesto)

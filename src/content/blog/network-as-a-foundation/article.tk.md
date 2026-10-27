---
title: Näme üçin Tamga Network girdeji gazanmaýar we fonda geçýär?
slug: network-as-a-foundation
description: Tamga Network hyzmat satmaýar we gapjyk işletmeýär, onuň dolandyrylyşy bolsa fonda tabşyrylar. Bitaraplygyň näme üçin möhümdigini we tabşyryşyň nähili işleýändigini düşündirýäris.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Sources: tamga-network README ("Tamga Network is non-profit; operation will later be handed over to a foundation"); Tamga ARF §8.3 (governance body formed when one or two states are willing; Tamga provisional operator until then; operation passes to the foundation; the network sells no product or commercial service; service providers outside, same terms), §1.6 principles P1 (each state sole author of its national records; council membership by two-thirds of member states), P4 (every state role Tamga holds is designed to be handed over), P7 (powers not limited by code are limited by policy, a measurable hand-over threshold and a transparency report); ADR-0035 (known tension: list operator selling services = conflict of interest; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; the Tamga team's company gets no different treatment), ADR-0042 (NW1–NW4; wallet.tamga.network removed 2026-10-06; Tamga Wallet's provider operated by the wallet's operator at provider.tamgawallet.com), ADR-0002 (three governance layers; removal does not invalidate citizens' credentials; right to exit), ADR-0009 (ledger with ≥2 independent operators); SPEC-TRUST-0001 (operator.status provisional, on_behalf_of; hand-over changes only the operator field; TDT-first slots; security notes: public log, CHANGELOG, quarterly transparency report, audit); learn/governance (succession agreement: domain, roots, archive, keys); home page gov section. Live tl-tr.json/lotl.json operator fields (2026-10-08). External: eIDAS 2.0 Regulation (EU) 2024/1183, EU ARF, EU trusted lists. -->

Tamga Network girdeji gazanmak maksady bolmadyk tordur we onuň dolandyrylyşy geljekde fonda tabşyrylar. Munuň sebäbi, ynam torunyň diňe oňa daýanýanlaryň hemmesi sanawy saklaýan tarapyň hiç kime artykmaçlyk bermeýändigine ynanýança işläp bilýändigidir. Şol bir sanawy döwletler, guramalar, birnäçe gapjyk we biri-biri bilen bäsleşýän hyzmat kompaniýalary okaýar. Şonuň üçin tor hyzmat satmaýar, gapjyk işletmeýär we hiç kime aýratyn hukuk bermeýär. Häzir wagtlaýyn üstüne alan her roly hem tabşyrylyp bilinjek görnüşde taslandy. Döwletler goşulanda dolandyryşy geňeş ýa-da fond, her ýurduň sanawyny bolsa şol ýurduň özi kabul edip alar.

## Näme üçin ynam sanawyny saklaýan tarap bitarap bolmaly?

Ynam sanawy kime ynanmalydygyny kesgitleýär. Sanawdaky gurama barlaýjylaryň kabul edýän resminamalaryny berip bilýär. Sanawdaky barlaýjy gapjyklardan maglumat sorap bilýär, sanawdaky gapjyk üpjün edijisi hem resminama alyp bilýär. Sanawy saklaýan tarap şol bir wagtda integrasiýa satsa, gapjyk işletse ýa-da tölegli goldaw berse, onuň her hasaba alyş karary şübhe döreder. Her kes bu ýazgynyň düzgünlere görä ýa-da sanawy saklaýanyň işine ýaraýandygy üçin tassyklanandygyny sorardy.

ÝB hem bu rollary şol sebäpden biri-birinden aýyrýar. eIDAS 2.0 modelinde ([(ÝB) 2024/1183 Regulamenti](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) ynam sanawlaryna agza döwletler gözegçilik edýär we olary çap edýär. Gapjyklary gapjyk üpjün edijileri işledýär, daýanýan taraplar bolsa hasaba durýar. Tamga öz ornuny kesgitläninde muny belli dartgynlylyk hökmünde ýazga geçirdi, sebäbi sanawy işledýän tarap hyzmat satsa, bähbitler çaknyşygy ýüze çykýar ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Soňra bu aýratynlyk aýry karar bilen aç-açan ýazyldy ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)).

## "Girdeji gazanmaýan" amalda näme aňladýar?

Munuň üç hökmany düzgüni bar:

- **Tor hyzmat satmaýar** (PO5). Toruň resminamalarynda we saýtlarynda baha maglumaty ýa-da satuw dili bolmaýar. Integrasiýa, goldaw, şertnama esasynda ýerleşdirmek we maslahat ýaly işleri toruň daşyndaky kompaniýalar öz atlary bilen hödürleýär.
- **Hemmeler üçin şol bir şertler güýjünde** (PO6). Salgylanma hyzmatlary we hasaba alyş işi ähli gatnaşyjylar üçin şol bir şertlerde açyk. Hiç bir hyzmat üpjün edijä artykmaçlyk berilmeýär we kararda Tamga toparynyň esaslandyran kompaniýasynyň hem bu düzgüne degişlidigi aç-açan ýazylýar.
- **Salgylanma hyzmatlary toruň işlemegi üçin bar.** Ynam sanawyny çap ediji, ýerleşdirilen barlaýjy, Institution Console bilen bilelikde ýerleşdirilen resminama beriş hyzmaty, wagtlaýyn şahsyýet hyzmaty we sandbox guramalar tora goşulyp bilsin we her kim düzgünleri synap görüp bilsin diýip döredildi. Olaryň hiç biri satylýan önüm däl.

Tamga ARF-iň dolandyryş bölümi hem muny aç-açan ýazýar. Tamga Network girdeji gazanmaýar, onuň dolandyrylyşy geljekde fonda tabşyrylar, ol hiç hili önüm satmaýar we täjirçilik hyzmatyny hödürlemeýär ([Tamga ARF](https://arf.tamga.network/architecture)). Çarçuwanyň nähili gurlandygyny [Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk](/blog/tamga-arf) ýazgysynda düşündirdik.

## Näme üçin tor gapjyk işletmeýär?

Sanawdaky gapjyklaryň birini özi işledýän sanaw beýleki gapjyklara garşy bitarap galyp bilmez. ÝB modelinde hem her gapjygy ony hödürleýän gurama, ýagny şol gapjygyň üpjün edijisi işledýär we ynam çarçuwasy diňe gapjyk üpjün edijilerini sanawa girizýär.

Tamga Network hem şu modele eýerýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- Tor hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini, saýtyny ýa-da goldaw hyzmatyny işletmeýär we ýerleşdirmeýär.
- Toruň domen atlarynyň aşagynda hiç bir gapjyk hyzmaty işlemeýär. Öň `wallet.tamga.network` salgysynda işleýän gapjyk hyzmatlary 2026-njy ýylyň 6-njy oktýabrynda tordan aýryldy.
- Toruň interfeýsleri we paketleri hiç bir gapjygyň adyny koda ýazmaýar. Interfeýsde "gapjykda aç" sözlemi ulanylýar. Gapjygyň ady gerek bolanda bu at gapjygyň sanawdaky ýazgysyndan alynýar.
- Bir sandbox bar we ol hem tora degişli. Gapjyk işläp düzüjileri öz üpjün edijilerini şol ýerde hasaba aldyrýar we beýlekiler bilen şol bir guramalara, şol bir şahsyýet hyzmatyna we şol bir barlaýja garşy synag geçirýär.

Tordaky gapjyklaryň biri bolan Tamga Wallet hem aýry önüm hökmünde şol bir ýoldan gidýär. Bu gapjygyň üpjün edijisini tor däl-de, gapjygyň öz operatory öz domeniniň aşagynda işledýär. Üpjün edijiniň sanawdaky ýazgysy (`TAMGA-WP-1`) 2026-njy ýylyň 14-nji oktýabryndan bäri işjeň we onuň sertifikatyny, beýleki gapjyklarda bolşy ýaly, şol operator berdi.

## Sanawlar kime degişli?

Sanawlar döwletlere degişli. Dolandyryş üç gatlakdan ybarat we her gatlakda karary başga tarap berýär ([ADR-0002](https://docs.tamga.network/adr/0002-sovereignty-first-governance)):

| Gatlak | Sorag | Kim karar berýär |
|---|---|---|
| Tora agzalyk | Täze döwlet goşulýarmy? | geňeş döredilenden soň agza döwletler üçden iki ses bilen |
| Milli sanaw | Döwlet haýsy guramalary we barlaýjylary hasaba alýar? | diňe şol döwlet |
| Ykrar etmek | Döwlet başga döwletiň resminamalaryny kabul edýärmi? | her döwlet özi üçin |

Mundan iki netije gelip çykýar. Döwlet hiç kimiň sesine mätäç bolmazdan tordan çykyp biler. Döwletiň tordan çykarylmagy hem onuň raýatlarynyň gapjyklaryndaky resminamalary güýjünden düşürmeýär, diňe şol döwletiň täze ýazgy ýazmagyny togtadýar. Geňeş döredilenden soň hem ol diňe toruň umumy düzgünlerini dolandyrýar we döwletiň öz guramalary barada karar berip bilmeýär.

## Şu günden fonda çenli ýol nähili?

![Şu günki wagtlaýyn operatordan geňeşe ýa-da fonda we umumy kitaba çenli](/blog/network-as-a-foundation/en/fig-yol.png)

**Häzir** Tamga wagtlaýyn operator hökmünde işleýär. Türkiýe sanawyny milli edaranyň adyndan çap edýär we muny sanawyň özünde hem görkezýär. Sanawyň `operator` meýdanynda `"status": "provisional"` bahasy we hiç haçan boş goýulmaýan `on_behalf_of` bahasy bolýar. Entek hiç kime gerek bolmadyk agyr gurama gurmaýarys.

**Bir ýa-da iki döwlet goşulmaga taýýar bolanda** dolandyryş edarasy döredilýär. Bu edara agza döwletlerden ybarat geňeşden we dolandyryşy kabul edip aljak fonddan ýa-da sekretariatdan ybarat bolar. Sanawlar eýelerine tabşyrylar. Täze agzany kabul etmek ýa-da umumy resminama görnüşini goşmak ýaly tor derejesindäki kararlar hem bilelikde kabul ediler.

**Azyndan iki garaşsyz operator bolanda** ýazgylar rugsatly umumy kitaba hem geçiriler we şeýlelikde hiç bir tarap olary ýeke özi üýtgedip bilmez. Bir operatoryň saklaýan kitaby çykdajyny artdyrýar, ýöne ynamy artdyrmaýar. Kitabyň garaşmagynyň sebäbi hem şunda ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).

## Operator çalşanda resminamalar näme üçin bozulmaýar?

Belgiler operatora degişli däldigi üçin resminamalar bozulmaýar. Guramanyň `issuer_id` bahasy guramanyň öz sertifikatyndan hasaplanýar, resminama görnüşleri hemişelik URN-ler bilen atlandyrylýar we sanaw formatynda eýýäm her döwlet üçin ýer we ähli rollar kesgitlenen. Tabşyrylanda `operator` meýdany, sanawyň salgysy we gol çekijisi üýtgeýär. Gapjyklar we barlaýjylar üçin diňe salgy we gol çekiji üýtgän bolýar, adamlaryň gapjyklaryndaky resminamalar bolsa güýjünde galýar.

Domen ady, kök sertifikatlar, sanaw arhiwi we açarlar ýaly koduň geçirip bilmeýän bölekleri ýazmaça mirasdüşerlik şertnamasy bilen tabşyrylýar. Munuň aňyrsynda şeýle düzgün bar: Ýerleşdirmek, domen ady, ýazgy ýöretmek we statistika ýaly kod bilen çäklendirip bolmaýan her ygtyýar syýasat, ölçenip bilinýän tabşyryş çägi we açyklyk hasabaty bilen çäklendirilýär (P7 ýörelgesi).

## Oňa çenli wagtlaýyn operatory dogruçyl saklaýan näme?

Muny diňe hoş niýete goýmaýarys. Sanawlara gol çekilýär, olar wersiýalanýar we heşler arkaly biri-birine zynjyrlanýar. Sanawlardan hiç zat pozulmaýar. Ýatyrylyş sanawynyň her çap edilişi açyk we sagatda azyndan bir gezek ýazylýan labyr žurnalyna girýär. Her çap ediliş hem `trust.tamga.network` salgysyndaky açyk üýtgeşmeler ýazgysyna geçýär. Düzgünler bulara çärýekde bir gezek çap ediljek açyklyk hasabatyny we garaşsyz auditi goşýar, ýöne hasabatyň sahypasy entek çap edilmedi.

Bu çäreleriň nirede ýeterlik däldigini hem aç-açan aýdýarys. Häzir ynam ýakory bir operatoryň goluna daýanýar we açyk ýazgylar hyýanatçylykly ulanylyşy mümkin däl etmeýär, diňe onuň öňüni alýar. Bu boşlugy ikinji garaşsyz operator we ondan soň geljek umumy kitap ýapar. Jikme-jiklikleri [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work) ýazgysynda tapyp bilersiňiz.

## Bu her gatnaşyjy üçin näme aňladýar?

![Kim näme işledýär: tor, döwletler, gapjyklar we hyzmat kompaniýalary](/blog/network-as-a-foundation/en/fig-ayrim.png)

- **Guramalar** integrasiýada haýsy hyzmat kompaniýasyndan kömek alsalar-da, hatda hiç kömek almasalar-da, şol bir şertlerde hasaba durýar.
- **Gapjyklar** atlary bilen däl-de, sanawdaky ýazgylary we düzgünlere laýyklygy bilen ykrar edilýär.
- **Hyzmat kompaniýalary** toruň daşynda bäsleşýär we toruň düzgünleri olaryň hemmesi üçin birmeňzeş.
- **Döwletler** öz sanawlarynyň üstünden ýeke-täk söz eýesi bolup galýar. Tamga-nyň häzir Türkiýe üçin wagtlaýyn üstüne alan rollaryny hem taýýar bolanlarynda kabul edip alyp bilerler ([Döwletler üçin](/learn/for-states)).

## Köp berilýän soraglar

### Fond döredildimi?

Entek döredilmedi. Dolandyryş edarasy bir ýa-da iki döwlet goşulmaga taýýar bolanda dörediler. Oňa çenli Tamga wagtlaýyn operator hökmünde işleýär we sanawlar hem muny aç-açan ýazýar.

### Kompaniýa töleg edip artykmaçlyk ýa-da has gowy ýazgy alyp bilermi?

Ýok. Tor hyzmat satmaýar we salgylanma hyzmatlary bilen hasaba alyş işi ähli gatnaşyjylar üçin şol bir şertlerde açyk. Hiç bir kompaniýa başgaça garalmaýar.

### Tamga Wallet-iň torda aýratyn orny barmy?

Ýok. Tamga Wallet tordaky gapjyklaryň biri, ony öz operatory işledýär we ol sanawa beýleki gapjyklar bilen şol bir ýoldan girýär.

### Döwlet tordan çyksa, adamlaryň resminamalaryna näme bolýar?

Resminamalar güýjünde galýar. Çykmak döwletiň täze ýazgy ýazmagyny togtadýar, ýöne öň berlen resminamalary ýatyrmaýar. Beýleki döwletleriň bu resminamalary kabul etmegi dowam etdirjekdigi ýa-da etdirmejekdigi bolsa her döwletiň öz ykrar ediş kararyna bagly.

### Bir döwlet tory eýeläp bilermi?

Ýok. Her döwlet diňe öz sanawyny ýazýar, täze agzany kabul etmek agza döwletleriň üçden ikisiniň sesini talap edýär we ykrar ediş karary her döwletiň özi tarapyndan berilýär. Şonuň üçin hiç bir döwlet başga döwletiň sanawyna gözegçilik edip bilmeýär.

## Çeşmeler

- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arhitektura we dolandyryş](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework)
- [ADR-0002: özygtyýarlylyga esaslanýan dolandyryş](https://docs.tamga.network/adr/0002-sovereignty-first-governance) · [ADR-0037: tor diňe tordur](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [ADR-0009: zynjyrsyz beta we zynjyr çägi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [Dolandyryş](/learn/governance) · [Biz barada](/about) · [Ýol kartasy](/roadmap)

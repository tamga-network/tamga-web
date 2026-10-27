---
title: Ynam tory näme we Tamga Network näme edýär?
slug: what-is-a-trust-network
description: Ynam tory sanly resminamalary kimiň berip we barlap biljekdigini görkezýän gol çekilen sanawlary çap edýär. Tamga Network näme edýär, näme etmeýär, nireden başlamaly.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Sources: tamga-network README (non-profit, foundation, runs no wallet, packages: 0.7.2 test release on npm, stable 1.0.0 when ready); ADR-0035 (EU-compatible, not "EUDI Wallet"; recognises wallets by rules), ADR-0037 K1 (the network's jobs: rules, trust, catalogue, open code, reference services, not sold), ADR-0042 (runs no wallet, lists them), ADR-0020 (no register of people, authentic source), ADR-0009 (ledger with ≥2 independent operators), ADR-0036 (external lists, none added yet), ADR-0038/0041 (sandbox, self-service test institutions); concepts/trust-lists, concepts/revocation (prefetching); SPEC-TRUST-0001 (TL11 no personal data; operator provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK verification in the verifier package); sandbox guide (age-zk example verifier); ARF §8.3 (non-profit, foundation). Live: trust.tamga.network/tl-tr.json operator.status provisional, on_behalf_of "TR national authority (to be designated)" (checked 2026-10-08). External: EU trusted lists browser, EU ARF GitHub. -->

Ynam tory hiç kime jaň etmezden, sanly resminamanyň ony bermäge hukugy bolan hakyky guramadan gelýändigini islendik adama barlamaga mümkinçilik berýän umumy gatlakdyr. Tamga Network Türkiýe we türki dünýäsi üçin şol gatlakdyr we ÝB-niň eIDAS 2.0 standartlarynyň üstünde gurlandyr. Ol düzgünleri ýazýar, gol çekilen ynam sanawlaryny çap edýär, resminama görnüşleriniň katalogyny saklaýar, açyk çeşmeli paketleri we salgylanma barlaýjyny çap edýär hem-de synag toruny işledýär. Ol adamlaryň resminamalaryny saklamaýar, gapjyk işletmeýär we kimiň kime näme görkezýändigini görmeýär.

## Gol çekilen resminama näme üçin tor gerek?

Sanly gol belli bir açaryň resminama gol çekendigini subut edýär. Ýöne şol açaryň kime degişlidigini subut etmeýär. Diplom dogry gol bilen gelende hem barlaýjynyň iki soragy galýar: gol çeken hakykatdan uniwersitetmi we onuň diplom bermäge hukugy barmy?

Muňa her gurama üçin aýratyn jogap bermek giňeltmäge ukyply däl. Her iş beriji her mekdebiň açarlaryny öz faýlynda saklamaly we ony elde täzeläp durmaly bolardy. Ynam tory şol hususy faýllaryň ýerine hemmäniň birmeňzeş okaýan bir açyk, gol çekilen jogabyny goýýar. ÝB şol bir meseläni şol bir pikir bilen çözdi: Ýewropa Komissiýasy ynam sanawlarynyň sanawyny çap edýär, her agza döwlet hem öz milli sanawyny çap edýär ([ÝB ynam sanawlary](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Ynam toruna kimler gatnaşýar?

Üç rol bar we üçüsi hem şol bir sanawy okaýar:

![Gurama berýär, adam saklaýar, barlaýjy barlaýar; üçüsi hem şol bir gol çekilen ynam sanawyna salgylanýar](/blog/what-is-a-trust-network/en/fig-ucgen.png)

- **Gurama (resminama berýän gurama, issuer).** Uniwersitet, hassahana, palata, döwlet edarasy ýa-da çäre gurnaýjy resminamalara öz açary bilen gol çekýär. Açar hiç haçan guramadan çykmaýar.
- **Adam (eýesi, holder).** Resminamany telefonyndaky gapjykda saklaýar we haýsy meýdanlary paýlaşjakdygyny özi kesgitleýär.
- **Barlaýjy.** Iş beriji, web saýt ýa-da gapy goly barlaýar, guramany ynam sanawynda tapýar we öňünden ýükläp alan ýatyrylyş sanawyny okaýar.

Tor bu üçüsiniň gapdalynda durýar. Resminama berlende ýa-da görkezilende ol ýoluň üstünde däl. Sanaw çap edilenden soň bermek we barlamak taraplaryň arasynda göni bolup geçýär; ynam toruny platformadan tapawutlandyrýan zat hem şudur.

## Tamga Network hakykatdan näme edýär?

Alty iş, hemmesi açyk ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)):

1. **Düzgünler.** Tamga ARF (Architecture and Reference Framework), Trust Framework we rulebook-lar her roluň näme etmelidigini aýdýar. Her düzgün belgilenen we [arf.tamga.network](https://arf.tamga.network) salgysynda çap edilen.
2. **Gol çekilen ynam sanawlary.** Ynam sanawlarynyň sanawy we Türkiýe sanawy hasaba alnan guramalary we olaryň her biriniň berip biljek resminama görnüşlerini, hasaba alnan barlaýjylary we olaryň her biriniň näme sorap biljekdigini hem-de ykrar edilen gapjyk üpjün edijilerini görkezýär. Olar `trust.tamga.network` salgysynda wersiýaly, heş-zynjyrly we gol çekilen görnüşde çap edilýär. Mehanizmi [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work) ýazgysynda.
3. **Shema katalogy.** Talyp resminamasy, diplom, çäre bileti we şahsyýet attestasiýasy ýaly resminama görnüşleri `schemas.tamga.network` salgysyndaky açyk katalogda bir gezek beýan edilýär; şeýlelikde her gapjyk we barlaýjy diplomy birmeňzeş okaýar.
4. **Açyk paketler.** `@tamga-network/*` paketleri ynam sanawlaryny, SD-JWT VC-ni, ISO mdoc-y, bermegi, barlamagy, gapjyk özenini we zero-knowledge subutnamalaryny öz içine alýar. Olar Apache-2.0 açyk çeşmeli we npm-de 0.7.2 synag wersiýasy hökmünde çap edilen; durnukly 1.0.0 hemme zat taýýar bolanda gelýär. Synag wersiýalarynda API üýtgäp biler.
5. **Salgylanma hyzmatlary.** Ynam sanawyny çap ediji we hasaba alyş guraly, Institution Console bilen ýerleşdirilen resminama beriş hyzmaty, ýerleşdirilen barlaýjy (Tamga Verify) we wagtlaýyn şahsyýet hyzmaty. Olar tor işlesin we guramalar goşulyp bilsin diýip bar. Olar satylmaýar.
6. **Sandbox.** [sandbox.tamga.network](https://sandbox.tamga.network) salgysyndaky synag tory hakyky tordan doly aýry, öz synag kök sertifikaty, nusga guramalary we oýlanyp tapylan adamlary bilen. Gurama ol ýerde birnäçe minutda synag guramasyny özi açyp biler.

![Tamga Network-yň edýän we etmeýän işleri](/blog/what-is-a-trust-network/en/fig-yapar.png)

## Tamga Network bilkastlaýyn näme etmeýär?

Çäkler işler ýaly möhümdir we olar hökmany düzgünler hökmünde ýazylandyr.

**Ol resminama saklamaýar.** Resminamalar guramanyň ulgamyndan adamyň telefonyna gidýär. Toruň adamlaryň hasaba alyş kitaby ýok; resminama berlende maglumatlar guramanyň öz ulgamyndan, onuň ygtyýarly çeşmesinden okalýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)). Hiç bir sanaw, žurnal ýa-da kitap şahsy maglumaty, resminamanyň mazmunyny, hatda resminamanyň heşini hem saklamaýar.

**Ol gapjyk işletmeýär.** Tor gapjyklary sanawa goşýar. Ol hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini ýa-da web saýtyny işletmeýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)). Çap edilen düzgünlere eýerýän we laýyklyk synaglaryndan geçýän islendik gapjyk sanawa goşulyp biler. Toruň ilkinji gapjygy bolan [Tamga Wallet](https://tamgawallet.com/en) aýry önümdir we sanawa beýlekiler ýaly girýär; onuň üpjün ediji ýazgysy 2026-njy ýylyň 14-nji oktýabryndan bäri işjeň.

**Ol kimiň kime näme görkezýändigini görmeýär.** Barlaýjylar ýatyrylyş sanawlaryny öňünden ýükläp alýar we keşde saklaýar; şonuň üçin barlag pursatynda guramadan ýa-da tordan hiç zat soralmaýar. Gurama öz resminamalarynyň nirede görkezilýändigini bilip bilmeýär, biz hem bilip bilmeýäris.

**Ol döwletiň ýerine karar bermeýär.** Her döwlet öz sanawynyň ýeke-täk awtorydyr. Häzir Tamga Türkiýe sanawyny milli ygtyýarly edaranyň adyndan wagtlaýyn çap edýär we sanaw muny öz `operator` meýdanynda aýdýar. Döwlet öz sanawyny çap edende toruň ynam sanawlarynyň sanawy oňa salgylanýar; resminamalar we gapjyklar üýtgemeýär.

**Ol hiç zat satmaýar.** Tamga Network girdeji gazanmak maksady bolmadyk tordur we onuň işledilişi fonda tabşyryljak. Integrasiýa, goldaw we maslahat tordan daşardaky kompaniýalardan gelýär; olaryň hemmesi şol bir şertlerde goşulýar.

## Tamga Network ÝB-niň sanly şahsyýet gapjygy bilen nähili baglanyşykly?

Ol şol bir gurluşyk bloklaryny ulanýar: resminamalar üçin SD-JWT VC we ISO/IEC 18013-5 mdoc, bermek we görkezmek üçin HAIP profili bilen OpenID4VCI we OpenID4VP, ýatyrylyş üçin IETF Token Status List, guramalar üçin X.509 sertifikatlary we ETSI formatlaryna gabat gelýän ynam sanawlary. Bular ÝB-niň Architecture and Reference Framework-ynyň görkezýän formatlarydyr ([GitHub-da ÝB ARF](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Onuň talap edip bilmeýän zady bir ady. "EUDI Wallet" ÝB agza döwletiniň berýän ýa-da ykrar edýän gapjyklary üçin hukuky ýagdaýdyr. ÝB-den daşardaky tor ýa-da gapjyk ÝB bilen laýyk bolup biler, ýagny şol bir standartlarda gürläp we muny synaglar bilen subut edip biler; Tamga özüni hut şeýle beýan edýär ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

Ýurt sanawlary hem beýleki sanawlaryň ýanynda durar ýaly gurlandyr. Başga döwletden ýa-da ÝB-den gelýän ETSI formatyndaky daşarky sanaw berkidilen gol çekiji we kesgitlenen gerim bilen toruň ynam sanawlarynyň sanawyna goşulyp biler; her biri aýry tassyklama bilen ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Entek hiç biri goşulmady.

## Tamga Network blokçeýnmi?

Ýok. Häzir ynam labyry gol çekilen, wersiýaly, heş-zynjyrly sanawlar we açyk, sagatlaýyn labyr žurnalydyr; bu ÝB-niň modelidir. Rugsatly kitap diňe azyndan iki garaşsyz operator gatnaşanda goşulýar, sebäbi bir operatoryň saklaýan kitaby ynam goşmaýar. Sanawyň her meýdany eýýäm kitap ýazgysyna gabat gelýär, şonuň üçin geçiş gapjyklar we barlaýjylar üçin hiç zady üýtgetmez. Sebäpleri [Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet) ýazgysynda.

## Häzir näme işleýär, näme işlemeýär?

| Bölek | 2026-njy ýylyň 23-nji oktýabryndaky ýagdaýy |
|---|---|
| Gol çekilen ynam sanawlary we labyr žurnaly | `trust.tamga.network` salgysynda işleýär |
| Shema katalogy | `schemas.tamga.network` salgysynda işleýär |
| Ýerleşdirilen barlaýjy (Tamga Verify) | `verify.tamga.network` salgysynda işleýär |
| Zero-knowledge ýaş barlagy | Tamga Verify-da işleýär (`age-over-18-zk` syýasaty); gapjyk tarapynda Android subutnama kitaphanasy taýýar, iOS garaşylýar |
| Synag guramalaryny özüň açyp bolýan sandbox | `sandbox.tamga.network` salgysynda işleýär |
| Hakyky sanawdaky gapjyk üpjün edijiler | 2026-njy ýylyň 14-nji oktýabryndan bäri bir işjeň (Tamga Wallet-iňki) |
| `@tamga-network/*` paketleri | npm-de 0.7.2 synag wersiýasy; durnukly 1.0.0 hemme zat taýýar bolanda |
| Daşarky sanawlar (beýleki döwletler, ÝB) | taslamasy taýýar; hiç biri goşulmady |
| Umumy kitap | ikinji garaşsyz operatora garaşýar |

Synag we görkeziş guramalary diňe sandbox-da ýaşaýar. Sandbox resminamasy hakyky barlaýjyda geçmeýär, sebäbi hakyky tor sandbox köküne ynanmaýar.

## Nireden başlamaly?

- **Resminama bermek isleýän gurama:** [Gurama Tamga Network-a nähili goşulýar](/blog/join-as-an-institution), soňra işläp düzüjiler üçin gollanma [Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution).
- **Resminamalary barlamak isleýän saýt ýa-da programma:** [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site).
- **Gapjyk işläp düzüji:** [gapjyk gollanmasy](https://docs.tamga.network/guides/build-a-wallet) we [sandbox gollanmasy](https://docs.tamga.network/guides/sandbox).
- **Döwlet edarasy ýa-da döwlet:** [Döwletler üçin](/learn/for-states) we [Trust Framework](https://arf.tamga.network/trust-framework).
- **Noldan başlaýanlar:** Öwren bölümindäki [Tamga Network näme?](/learn/what-is-tamga-network).

## Köp berilýän soraglar

### Tamga Network meniň diplomymy ýa-da şahsyýet maglumatlarymy saklaýarmy?

Ýok. Resminamalar guramadan adamyň telefonyna gidýär. Sanawlarda diňe guramalaryň atlary, sertifikat barmak yzlary, ýagdaýlar, seneler we salgylar bar: şahsy maglumat we resminama heşleri ýok.

### Men Tamga Wallet-i ulanmalymy?

Ýok. Toruň gapjyk düzgünlerine eýerýän we üpjün edijisi sanawda bolan islendik gapjyk Tamga resminamalaryny alyp we görkezip biler. Tamga Wallet toruň gapjyklarynyň biridir, ýeke-täki däl.

### Haýsy guramalaryň sanawda boljakdygyny kim kesgitleýär?

Hasaba alyjy guramalary we olaryň her biriniň berip biljek resminama görnüşlerini ýazga alýar. Häzir Tamga muny Türkiýe üçin döwletiň adyndan wagtlaýyn edýär; döwlet öz sanawyny çap edende karary şol döwlet berýär. Tor diplom bermek üçin hukuky ygtyýar bermeýär; ol guramany dolandyrýan kanundan gelýär.

### Başga ýurtdan gelen resminama kabul edilip bilnermi?

Hawa, barlaýjynyň ýurdy beýleki ýurduň sanawyny ykrar edýän bolsa. Her döwlet ykrar etmek baradaky karary özi berýär we bu barlag her barlamada geçirilýär.

### Ynam sanawyny alyp bolmasa näme bolýar?

Barlaýjy hiç haçan "ret edildi" diýmeýär, "häzir barlap bolmaýar" diýýär. Infrastruktura elýeterli bolmandygy üçin resminama galp hasap edilmeýär.

## Çeşmeler

- [ÝB ynam sanawlaryny gözden geçiriji (Ýewropa Komissiýasy)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network dokumentasiýasy: ynam sanawlary we federasiýa](https://docs.tamga.network/concepts/trust-lists)
- [ADR-0037: Tamga Network diňe tordur](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network) · [Tora goşul](/join) · [Öwren](/learn/what-is-tamga-network)

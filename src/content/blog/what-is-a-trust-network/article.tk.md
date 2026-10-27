---
title: Ynam tory näme we Tamga Network näme edýär?
slug: what-is-a-trust-network
description: Ynam tory sanly resminamalary kimiň berip, kimiň barlap biljekdigini gol çekilen sanawlar bilen çap edýär. Tamga Network-yň näme edip, näme etmeýändigini we nireden başlamalydygyny düşündirýäris.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Sources: tamga-network README (non-profit, foundation, runs no wallet, packages: 0.7.2 test release on npm, stable 1.0.0 when ready); ADR-0035 (EU-compatible, not "EUDI Wallet"; recognises wallets by rules), ADR-0037 K1 (the network's jobs: rules, trust, catalogue, open code, reference services, not sold), ADR-0042 (runs no wallet, lists them), ADR-0020 (no register of people, authentic source), ADR-0009 (ledger with ≥2 independent operators), ADR-0036 (external lists, none added yet), ADR-0038/0041 (sandbox, self-service test institutions); concepts/trust-lists, concepts/revocation (prefetching); SPEC-TRUST-0001 (TL11 no personal data; operator provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK verification in the verifier package); sandbox guide (age-zk example verifier); ARF §8.3 (non-profit, foundation). Live: trust.tamga.network/tl-tr.json operator.status provisional, on_behalf_of "TR national authority (to be designated)" (checked 2026-10-08). External: EU trusted lists browser, EU ARF GitHub. -->

Ynam tory sanly resminamanyň hakykydygyny we ony bermäge ygtyýarly guramadan gelendigini hiç kime jaň etmezden barlamaga mümkinçilik berýän umumy gatlakdyr. Tamga Network Türkiýe we türki dünýäsi üçin bu gatlagy gurýar we ÝB-niň eIDAS 2.0 standartlaryna daýanýar. Ol düzgünleri ýazýar, gol çekilen ynam sanawlaryny çap edýär, resminama görnüşleriniň katalogyny saklaýar, açyk çeşmeli paketleri we salgylanma barlaýjyny hödürleýär, şeýle hem synag toruny işledýär. Adamlaryň resminamalaryny saklamaýar, gapjyk işletmeýär we kimiň nämäni kime görkezýändigini görmeýär.

## Gol çekilen resminama näme üçin tor gerek?

Sanly gol resminama belli bir açaryň gol çekendigini subut edýär, ýöne şol açaryň kime degişlidigini subut etmeýär. Güýjünde goly bolan diplom gelende barlaýjynyň öňünde ýene iki sorag galýar. Gol çeken hakykatdan uniwersitetmi we onuň diplom bermäge ygtyýary barmy?

Bu soraglara her gurama üçin aýratynlykda jogap bermek guramalaryň sany artdygyça işlemeýär. Her iş beriji ähli mekdepleriň açarlaryny öz faýlynda saklamaly we bu faýly elde täze saklamaly bolardy. Ynam tory bu aýry-aýry faýllaryň ornuna hemmeleriň şol bir görnüşde okaýan, açyk we gol çekilen ýeke-täk jogabyny goýýar. ÝB hem şol bir meseläni şol bir pikir bilen çözdi. Ýewropa Komissiýasy sanawlaryň sanawyny çap edýär, her agza döwlet bolsa öz milli sanawyny çap edýär ([ÝB ynam sanawlary](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Ynam toruna kimler gatnaşýar?

Torda üç rol bar we üçüsi hem şol bir sanawa seredýär:

![Gurama berýär, adam saklaýar, barlaýjy barlaýar; üçüsi hem şol bir gol çekilen ynam sanawyna salgylanýar](/blog/what-is-a-trust-network/en/fig-ucgen.png)

- **Gurama (resminama beriji).** Uniwersitet, hassahana, hünär palatasy, döwlet edarasy ýa-da çäre guramaçysy resminama öz açary bilen gol çekýär. Bu açar guramadan hiç haçan çykmaýar.
- **Adam (resminama eýesi).** Adam resminamany telefonyndaky gapjykda saklaýar we haýsy meýdanlary paýlaşjakdygyny özi çözýär.
- **Barlaýjy.** Iş beriji, web saýt ýa-da giriş gapysy goly barlaýar, guramany ynam sanawyndan tapýar we öňünden ýükläp alan ýatyrylyş sanawyna seredýär.

Tor bu üç tarapyň ýanynda durýar, ýöne resminama berlende ýa-da görkezilende araçy bolmaýar. Sanaw çap edilenden soň resminama bermek we barlamak gönüden-göni taraplaryň arasynda bolup geçýär. Ynam toruny platformadan tapawutlandyrýan zat hem şudur.

## Tamga Network hakykatdan näme edýär?

Toruň alty wezipesi bar we olaryň hemmesi açyk ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)):

1. **Düzgünler.** Tamga ARF (Architecture and Reference Framework), Trust Framework we rulebook-lar her roluň näme etmelidigini kesgitleýär. Her düzgün belgilenen we [arf.tamga.network](https://arf.tamga.network) salgysynda çap edilýär.
2. **Gol çekilen ynam sanawlary.** Sanawlaryň sanawy we Türkiýe sanawy hasaba alnan guramalary we her guramanyň berip bilýän resminama görnüşlerini, hasaba alnan barlaýjylary we olaryň her biriniň sorap bilýän meýdanlaryny, ykrar edilen gapjyk üpjün edijilerini görkezýär. Sanawlar `trust.tamga.network` salgysynda wersiýalanan, heşler arkaly biri-birine zynjyrlanan we gol çekilen görnüşde çap edilýär. Olaryň nähili işleýändigini [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work) ýazgysynda düşündirdik.
3. **Shema katalogy.** Talyp resminamasy, diplom, çäre bileti we şahsyýet resminamasy ýaly resminama görnüşleri `schemas.tamga.network` salgysyndaky açyk katalogda bir gezek kesgitlenýär. Şeýlelikde her gapjyk we her barlaýjy diplomy şol bir görnüşde okaýar.
4. **Açyk paketler.** `@tamga-network/*` paketleri ynam sanawlaryny, SD-JWT VC-ni, ISO mdoc-y, resminama bermegi, barlagy, gapjyk özenini we nol bilimli subutnamalary öz içine alýar. Paketler Apache-2.0 ygtyýarnamaly açyk çeşmeli bolup, npm-de 0.7.2 synag wersiýasy hökmünde çap edilýär. Durnukly 1.0.0 wersiýasy hemme zat taýýar bolanda çykar. Synag wersiýalarynda API üýtgäp biler.
5. **Salgylanma hyzmatlary.** Ynam sanawyny çap ediji we hasaba alyş guraly, Institution Console bilen bilelikde ýerleşdirilen resminama beriş hyzmaty, ýerleşdirilen barlaýjy (Tamga Verify) we wagtlaýyn şahsyýet hyzmaty şu topara girýär. Bu hyzmatlar toruň işlemegi we guramalaryň oňa goşulyp bilmegi üçin bar we satylmaýar.
6. **Sandbox.** [sandbox.tamga.network](https://sandbox.tamga.network) salgysynda hakyky tordan doly aýry synag tory işleýär. Bu toruň öz synag kök sertifikaty, nusga guramalary we oýlanyp tapylan adamlary bar. Gurama ol ýerde birnäçe minudyň içinde öz synag guramasyny açyp bilýär.

![Tamga Network-yň edýän we etmeýän işleri](/blog/what-is-a-trust-network/en/fig-yapar.png)

## Tamga Network bilkastlaýyn näme etmeýär?

Toruň çäkleri hem wezipeleri ýaly möhüm we bu çäkler hökmany düzgünler hökmünde ýazylan.

**Resminama saklamaýar.** Resminamalar guramanyň ulgamyndan göni adamyň telefonyna gidýär. Tor adamlar bilen bagly hiç hili ýazgy saklamaýar. Resminama berlende maglumatlar guramanyň öz ulgamyndan, ýagny ygtyýarly çeşmeden okalýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)). Hiç bir sanawda, žurnalda ýa-da kitapda şahsy maglumat, resminamanyň mazmuny, hatda resminamanyň heşi hem bolmaýar.

**Gapjyk işletmeýär.** Tor gapjyklary diňe sanawa girizýär we hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini ýa-da saýtyny işletmeýär ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)). Çap edilen düzgünlere eýerýän we laýyklyk synaglaryndan geçýän her gapjyk sanawa girip biler. Tordaky ilkinji gapjyk bolan [Tamga Wallet](https://tamgawallet.com/en) aýry önüm bolup, sanawa beýleki gapjyklar bilen şol bir ýoldan girýär. Onuň üpjün edijisiniň ýazgysy 2026-njy ýylyň 14-nji oktýabryndan bäri işjeň.

**Kimiň nämäni kime görkezýändigini görmeýär.** Barlaýjylar ýatyrylyş sanawlaryny öňünden ýükläp, keşde saklaýar. Şonuň üçin barlag pursatynda ne gurama, ne-de tora haýyş gidýär. Gurama öz resminamalarynyň nirede görkezilýändigini bilip bilmeýär, biz hem bilip bilmeýäris.

**Döwletiň ýerine karar bermeýär.** Her döwlet öz sanawynyň ýeke-täk awtorydyr. Häzir Türkiýe sanawyny Tamga milli edaranyň adyndan wagtlaýyn çap edýär we sanaw muny `operator` meýdanynda aç-açan ýazýar. Döwlet öz sanawyny çap edende toruň sanawlar sanawy şol sanawy görkezer. Bu üýtgeşme resminamalara we gapjyklara täsir etmez.

**Hiç zat satmaýar.** Tamga Network girdeji gazanmak maksady bolmadyk tordur we onuň dolandyrylyşy geljekde fonda tabşyrylar. Integrasiýa, goldaw we maslahat ýaly hyzmatlary toruň daşyndaky kompaniýalar hödürleýär we bu kompaniýalaryň hemmesi tora şol bir şertlerde goşulýar.

## Tamga Network ÝB-niň sanly şahsyýet gapjygy bilen nähili baglanyşykly?

Tamga Network şol bir esasy bölekleri ulanýar. Resminamalar üçin SD-JWT VC we ISO/IEC 18013-5 mdoc, resminama bermek we görkezmek üçin HAIP profili bilen bilelikde OpenID4VCI we OpenID4VP, ýatyrmak üçin IETF Token Status List, guramalar üçin X.509 sertifikatlary we ETSI formatlaryna laýyklaşdyrylan ynam sanawlary ulanylýar. Bular ÝB-niň Architecture and Reference Framework-ynda görkezilen formatlardyr ([ÝB ARF, GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Tamga-nyň ulanyp bilmejek zady bolsa derejedir. "EUDI Wallet" ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna berilýän hukuky derejedir. ÝB-den daşardaky tor ýa-da gapjyk bolsa ÝB bilen laýyk bolup biler, ýagny şol bir standartlary ulanyp we muny synaglar bilen subut edip biler. Tamga hem özüni şeýle häsiýetlendirýär ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

Ýurt sanawlary başga sanawlar bilen ýanaşyk ulanylyp bilinjek görnüşde guruldy. Başga döwletiň ýa-da ÝB-niň ETSI formatyndaky sanawy gol çekijisi berkidilip we gerimi kesgitlenip toruň sanawlar sanawyna goşulyp bilner we her goşundy aýratyn tassyklamany talap edýär ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Häzire çenli şeýle sanaw goşulmady.

## Tamga Network blokçeýnmi?

Ýok. Häzir ynam ýakory gol çekilen, wersiýalanan we heşler arkaly biri-birine zynjyrlanan sanawlardan we sagatda azyndan bir gezek ýazylýan açyk labyr žurnalyndan ybarat. ÝB modeli hem şeýle işleýär. Rugsatly kitap diňe azyndan iki garaşsyz operator goşulanda goşular, sebäbi bir operatoryň saklaýan kitaby täze ynam döretmeýär. Sanawlardaky her meýdan eýýäm kitap ýazgysyna gabat gelýär, şonuň üçin geçiş gapjyklar we barlaýjylar üçin hiç zady üýtgetmez. Sebäplerini [Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet) ýazgysynda düşündirdik.

## Häzir näme işleýär, näme işlemeýär?

| Bölek | 2026-njy ýylyň 23-nji oktýabryndaky ýagdaýy |
|---|---|
| Gol çekilen ynam sanawlary we labyr žurnaly | `trust.tamga.network` salgysynda işleýär |
| Shema katalogy | `schemas.tamga.network` salgysynda işleýär |
| Ýerleşdirilen barlaýjy (Tamga Verify) | `verify.tamga.network` salgysynda işleýär |
| Nol bilimli ýaş barlagy | Tamga Verify-da işleýär (`age-over-18-zk` syýasaty); gapjyk tarapynda Android subutnama kitaphanasy taýýar, iOS-a garaşylýar |
| Guramalaryň öz synag guramasyny açyp bilýän sandbox-y | `sandbox.tamga.network` salgysynda işleýär |
| Hakyky sanawdaky gapjyk üpjün edijiler | 2026-njy ýylyň 14-nji oktýabryndan bäri bir işjeň ýazgy (Tamga Wallet-iň ýazgysy) |
| `@tamga-network/*` paketleri | npm-de 0.7.2 synag wersiýasy; durnukly 1.0.0 hemme zat taýýar bolanda |
| Daşarky sanawlar (beýleki döwletler, ÝB) | taslandy; entek goşulany ýok |
| Umumy kitap | ikinji garaşsyz operatora garaşýar |

Synag we görkeziş guramalary diňe sandbox-da ýerleşýär. Sandbox-da alnan resminama hakyky barlaýjydan geçip bilmeýär, sebäbi hakyky tor sandbox-yň kök sertifikatyny ykrar etmeýär.

## Nireden başlamaly?

- **Resminama bermek isleýän gurama:** [Gurama Tamga Network-a nähili goşulýar?](/blog/join-as-an-institution) ýazgysyndan başlap, [Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution) atly işläp düzüjiler gollanmasyna geçip biler.
- **Resminamalary barlamak isleýän saýt ýa-da programma:** [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysyny okap biler.
- **Gapjyk düzýän topar:** [gapjyk gollanmasyna](https://docs.tamga.network/guides/build-a-wallet) we [sandbox gollanmasyna](https://docs.tamga.network/guides/sandbox) seredip biler.
- **Döwlet edarasy ýa-da döwlet:** [Döwletler üçin](/learn/for-states) sahypasyny we [Trust Framework](https://arf.tamga.network/trust-framework)-y okap biler.
- **Mowzuga noldan başlaýan adam:** Öwren bölümindäki [Tamga Network näme?](/learn/what-is-tamga-network) sahypasyndan başlap biler.

## Köp berilýän soraglar

### Tamga Network meniň diplomymy ýa-da şahsyýet maglumatlarymy saklaýarmy?

Ýok. Resminama guramadan göni adamyň telefonyna gidýär. Sanawlarda diňe guramalaryň atlary, sertifikatlaryň barmak yzlary, ýagdaýlar, seneler we salgylar bolýar. Şahsy maglumat ýa-da resminamanyň heşi sanawlarda ýok.

### Tamga Wallet-i ulanmak hökmanymy?

Ýok. Toruň gapjyk düzgünlerine eýerýän we üpjün edijisi sanawda hasaba alnan her gapjyk Tamga resminamalaryny alyp we görkezip biler. Tamga Wallet tordaky gapjyklaryň diňe biridir.

### Haýsy guramalaryň sanawda boljakdygyny kim kesgitleýär?

Hasaba alyş edarasy guramalary we her guramanyň berip bilýän resminama görnüşlerini ýazga geçirýär. Häzir bu işi Türkiýe üçin döwletiň adyndan wagtlaýyn Tamga edýär. Döwlet öz sanawyny çap edende karar şol döwlete geçer. Diplom bermek hukugyny tor bermeýär, bu hukuk guramanyň tabyn bolan kanunyndan gelýär.

### Başga ýurduň resminamasy kabul edilip bilnermi?

Barlaýjynyň ýurdy şol ýurduň sanawyny ykrar edýän bolsa, kabul edilýär. Ykrar ediş kararyny her döwlet özi berýär we bu barlag her gezek geçirilýär.

### Ynam sanawyny şol pursat alyp bolmasa näme bolýar?

Barlaýjy "häzir barlap bolmady" netijesini berýär we resminamany ret etmeýär. Infrastruktura baryp bolmandygy üçin hiç bir resminama galp hasaplanmaýar.

## Çeşmeler

- [ÝB ynam sanawlaryny gözden geçiriji (Ýewropa Komissiýasy)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [EU Digital Identity Wallet: Architecture and Reference Framework (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(ÝB) 2024/1183 Regulamenti (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network dokumentasiýasy: ynam sanawlary we federasiýa](https://docs.tamga.network/concepts/trust-lists)
- [ADR-0037: Tamga Network diňe tordur](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: tor gapjyk işletmeýär](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network) · [Tora goşul](/join) · [Öwren](/learn/what-is-tamga-network)

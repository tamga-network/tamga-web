---
title: Gurama Tamga Network-a nähili goşulýar?
slug: join-as-an-institution
description: "Guramanyň Tamga Network-a nähili goşulýandygyny düşündirýäris: sandbox-da synap görmek, hasaba alyş maglumatlary we CSR bilen ýüz tutmak, ynam sanawyna girmek we ilkinji resminama."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Sources: GUIDE-0007 join-as-institution 1.0.0 (roles and classes, application JSON, ADR-0024 mandatory data, two P-256 keys, CSR, HSM/KMS, certificate 2 years / max 3, registrar reports all gaps at once, live within 24 h, issuer_id from certificate, WRPRC, per-type authorisation, ended authorisation not deleted, hosted vs own server, identity proofing SPEC-ID-0003, statuses table, status at time of issuance); GUIDE-0013 sandbox §9 (test institution: made-up name, "(TEST)" added, no email/phone/person name, real names and official words refused, passkey invite, CSV up to 200 rows, ID-number checksum refused, desk issuance QR + PIN, verify at example verifiers; limits 30 / 10 per 10 min / 200 records / 100 offers per hour; nightly deletion; education type only today); ADR-0041; ADR-0019 (Institution Console: passkey, records, revocation, API keys, users); ADR-0016 (scoped API key); ADR-0020 (authentic source, no register of people); tamga-web join page (participation agreement, DPA when hosted, privacy notice, proof of entitlement, lookup endpoint OpenAPI, statistics never personal data, partners@tamga.network, 6 steps: scope, type, legal, registration, integration, pilot then live). External: CIR (EU) 2025/848, ETSI TS 119 475. -->

Gurama Tamga Network-a iki tapgyrda goşulýar. Ilki bilen tutuş işi sandbox-da synap görýär. Ol ýerde birnäçe minudyň içinde öz synag guramasyny açýar we oýlanyp tapylan ýazgylardan gapjyga resminama berýär. Soňra hasaba alyş maglumatlaryny we sertifikata gol çekmek haýyşyny iberip, hakyky tora ýüz tutýar. Hasaba alyş edarasy faýly barlaýar, kök sertifikat edarasy guramanyň sertifikatyna gol çekýär we gurama 24 sagadyň içinde gol çekilen ynam sanawyna girýär. Sanawda onuň haýsy resminama görnüşlerini bermäge ygtyýarlydygy hem ýazylýar. Mundan soň gurama resminamalaryny ýerleşdirilen hyzmat we Institution Console arkaly ýa-da öz serwerinden berip bilýär.

![Sandbox synagyndan ilkinji resminama çenli dört ädim](/blog/join-as-an-institution/en/fig-yol.png)

## Haýsy guramalar goşulyp biler?

Adamlaryň bir zady subut etmek üçin zerur tapýan resminamalaryny berýän her gurama goşulyp biler. Uniwersitetler we mekdepler, hassahanalar we hünär palatalary, döwlet edaralary, işgär we ygtyýarlyk resminamalaryny berýän kompaniýalar we adama bagly bilet satýan çäre guramaçylary munuň mysallarydyr. Sanawda her guramanyň bir ugry (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) we bir synpy bolýar:

| Synp | Manysy |
|---|---|
| `PUB` | döwlet edarasynyň beren resminamasy |
| `QUALIFIED` | kwalifisirlenen resminama |
| `EAA` | talyp resminamasy ýa-da bilet ýaly adaty elektron attestasiýa |

Tora goşulmak guramany ýazga geçirýär, ýöne oňa öň bolmadyk ygtyýary bermeýär. Mysal üçin, diplom bermek hukugy uniwersitetiň tabyn bolan kanunyndan gelýär. Tor bolsa bu hukugyň maşyn tarapyndan barlanyp bilinmegini üpjün edýär.

Resminama bermegiň deregine resminamalary barlamak isleýän guramalar, mysal üçin iş berijiler, web saýtlar ýa-da giriş gapylary, tora hasaba alnan barlaýjy hökmünde goşulýar. Bu ýoly [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda düşündirdik.

## Gurama ýüz tutmazdan öň nähili synap görüp biler?

Gurama hemme zady toruň aýry synag gurşawy bolan sandbox-da synap görüp biler: [sandbox.tamga.network](https://sandbox.tamga.network). Ol ýerdäki hiç bir amal hakyky tora täsir etmeýär. Sandbox-yň öz synag kök sertifikaty bar, sanawlary synag sanawy hökmünde bellenýär we hakyky barlaýjy ondan alnan resminamalary kabul etmeýär.

Synag birnäçe minut alýar ([sandbox gollanmasy, §9](https://docs.tamga.network/guides/sandbox)):

1. Sandbox sahypasynda **Try your institution** düwmesini saýlaň we oýlanyp tapylan gurama adyny ýazyň. Adyň soňuna "(TEST)" goşulýar. Sizden e-poçta, telefon belgisi ýa-da şahsy at soralmaýar. Hakyky guramalaryň atlary we resmi edaralary ýatladýan sözler kabul edilmeýär.
2. Synag guramasy derrew sandbox-yň ynam sanawyna goşulýar. Guramanyň gol sertifikatyny sandbox-yň synag guramalary üçin bölünip berlen sertifikat edarasy berýär.
3. Bir gezeklik çakylyk salgysy bilen Institution Console-y açyň we passkey dörediň.
4. Ýazgylary bir-birden giriziň ýa-da iň köp 200 setirlik CSV faýlyny ýükläň. Türk şahsyýet belgisiniň barlag jemini (checksum) geçýän belgini saklaýan ýazgylar ret edilýär, şonuň üçin ulgama diňe bilkastlaýyn nädogry ýazylan belgiler girip bilýär.
5. Ýazgynyň ýanyndaky **Issue at the desk** düwmesini saýlaň, sandbox-a birikdirilen gapjyk bilen QR kody skanirläň we PIN-i giriziň.
6. Resminamany sandbox sahypasyndaky "Diploma check" ýa-da "Student discount" nusga barlaýjysyna görkeziň.

Häzir synag guramasy bilim guramasy hökmünde açylýar we talyp resminamasy bilen diplom berip bilýär. Gurama, onuň hasaby, ýazgylary we sertifikatlary her gije pozulýar. Gurşawyň hemmeler üçin ulanmaga ýaramly galmagy üçin käbir çäkler hem bar. Bir wagtda iň köp 30 synag guramasy açylyp bilner, olaryň her birinde iň köp 200 ýazgy bolup biler we sagatda iň köp 100 teklip döredilip bilner.

> **Bellik:** Sandbox-a diňe oýlanyp tapylan maglumat giriziň. Sandbox synag torudyr, hyzmat borçnamasy ýok we her gije Türkiýe wagty bilen sagat 03:30-da arassalanýar.

## Hakyky tora ýüz tutmakda näme bar?

Arza bir faýldan ybarat we üç görnüşli maglumaty göterýär. Faýl guramanyň kimdigini, haýsy resminamalary berjekdigini we şol resminamalardaky maglumatlaryň nireden geljekdigini düşündirýär.

![Guramanyň arzasy üçin taýýarlamaly zatlary](/blog/join-as-an-institution/en/fig-gerekenler.png)

Hasaba alyş maglumatlary ÝB-niň gatnaşyjylar üçin kesgitlän umumy maglumat toplumyndan ybarat. Bular hukuky we söwda ady, resmi belgi (salgyt belgisi ýa-da söwda sanawynyň belgisi), poçta salgysy, habarlaşmak üçin maglumat we adamlaryň arz edip bilýän maglumatlary goramak edarasydyr ([ADR-0024](https://docs.tamga.network/adr/0024-participant-registration-data)). ÝB hem gapjyga daýanýan taraplar üçin şol bir modeli [(ÝB) 2025/848 Ýerine ýetiriş regulamenti](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) bilen ulanýar. Bir meýdan ýetmese, ýazgy edilmeýär we hasaba alyş edarasy ähli kemçilikleri bir gezekde habar berýär.

```json title="Gysgaldylan mysal: arza faýly (oýlanyp tapylan gurama)"
{
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "vcts": ["urn:tamga:edu:StudentCredential:1", "urn:tamga:edu:DiplomaCredential:1"],
  "authentic_source": { "name": "Example University Student Information System", "mode": "REMOTE" },
  "identifiers": [{ "scheme": "TR-VKN", "value": "TR0000000000" }],
  "contact": { "support_uri": "https://example.edu.tr/support" },
  "supervisory_authority": { "name": "Kişisel Verileri Koruma Kurumu (KVKK)", "country": "TR" }
}
```

Mysalyň doly görnüşini [Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution) atly işläp düzüjiler gollanmasynda tapyp bilersiňiz.

Faýldaky iki setir toruň nähili işleýändigini gowy görkezýär. `vcts` guramanyň bermek isleýän resminama görnüşlerini sanaýar. Bu görnüşler açyk [shema katalogyndan](https://docs.tamga.network/specifications/schema-catalog) saýlanýar we täze görnüş goşuljak bolsa, ilki öz tassyklaýyş işinden geçýär. `authentic_source` bolsa maglumatlaryň hakykatda gelýän ulgamynyň adyny görkezýär. Tor adamlar bilen bagly hiç hili ýazgy saklamaýar. Resminama berlende maglumatlar guramanyň öz ulgamyndan, guramanyň gözegçilik edýän nokady arkaly okalýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Faýl bilen bilelikde hukuky resminamalar hem iberilýär. Bular gatnaşyk şertnamasy, ýerleşdirilen hyzmat ulanyljak bolsa maglumatlary işlemek baradaky şertnama, resminama beriljek adamlar üçin täzelenen gizlinlik habarnamasy we guramanyň bu resminamany bermäge ygtyýarlydygyny görkezýän subutnamadyr. Ýerleşdirilen hyzmat ulanylsa-da, maglumatlara jogapkär gurama bolup galýar.

## Näme üçin guramanyň açary hiç haçan guramadan çykmaýar?

Resminamany guramanyň resminamasy edýän zat guramanyň açarydyr. Açary elinde saklaýan islendik adam gurama adyndan gol çekip bilýändigi üçin açar her ädimde guramada galýar.

Gurama iki P-256 açar jübütini döredýär. Olaryň biri resminamalara, beýlekisi bolsa guramanyň ýatyrylyş sanawyna gol çekýär. Gurama daşaryk her açar üçin diňe sertifikata gol çekmek haýyşyny (CSR) iberýär:

```bash title="Açar we sertifikata gol çekmek haýyşyny döretmek"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

Hakyky gurşawda açaryň ýeri enjam howpsuzlyk moduly (HSM) ýa-da bulutdaky açar dolandyryş hyzmatydyr (KMS). Hasaba alyş edarasy CSR-iň goluny barlaýar we gurama kök sertifikat edarasynyň gol çeken, iki ýyl (iň köp üç ýyl) güýjünde bolan sertifikatyny iberýär.

## Gurama hasaba alnanda näme bolýar?

Hasaba alyş edarasy guramany Türkiýe sanawyna goşýar we sanawa täzeden gol çekýär. Ýazgy 24 sagadyň içinde `trust.tamga.network` salgysynda çap edilýär. Ýazgyda sertifikatyň barmak yzyndan hasaplanan `issuer_id`, guramanyň synpy we ynamlylyk derejesi, bermäge ygtyýarly resminama görnüşleri, ýagdaýy we ýagdaý taryhy bolýar. Her çap edilişde awtomatik usulda hasaba alyş sertifikaty (ETSI TS 119 475) hem döredilýär we gapjyklar ýazgyny şu sertifikat bilen hem barlap bilýär. Ýazgynyň nähili görünýändigini we barlaýjynyň ony nähili okaýandygyny [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work) ýazgysynda düşündirdik.

Ygtyýar her resminama görnüşi üçin aýratyn berilýär. Soňra täze görnüş goşulyp ýa-da haýsydyr bir görnüşiň ygtyýary tamamlanyp bilner. Tamamlanan ygtyýaryň ýazgysy pozulmaýar we ygtyýar gutarmazdan öň berlen resminamalar barlanmagyny dowam etdirýär.

## Gurama ilkinji resminamasyny nähili berýär?

Munuň iki ýoly bar we iki ýolda hem döreýän resminama birmeňzeş. Resminama guramanyň adyndan berilýär we guramanyň açary bilen gol çekilýär.

| | Ýerleşdirilen hyzmat | Öz serweriňiz |
|---|---|---|
| Ony näme işledýär | Tamga-nyň resminama beriş hyzmaty we Institution Console | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Nähili birikýärsiňiz | konsol arkaly ýa-da ulgamyňyzdan gerimi çäklendirilen API açary bilen | öz ýerleşdirişiňiz |
| Kime amatly | çalt başlamak isleýänler, stolda resminama berýänler, kiçi toparlar | hemme zady öz içinde saklamak isleýän guramalar |

Ýerleşdirilen hyzmat ulanylanda hem açar guramada galýar. Hyzmat guramanyň uzakdan gol çekiş hyzmatyna (CSC API v2) diňe heş iberýär we goly yzyna alýar ([ADR-0057](https://docs.tamga.network/adr/0057-hosted-issuance-remote-signing)).

[Institution Console](https://docs.tamga.network/adr/0019-institution-console-and-database) gurama işgärleriniň öz işlerini edýän ýeridir. Işgärler konsola passkey bilen girýär we ýazgylary dolandyrýar. Stolda resminama berenlerinde QR kody we aýratyn berilýän PIN-i ulanýarlar. Resminamalary ýatyryp ýa-da togtadyp, resminama beriş statistikasyny hem görüp bilýärler. Bu statistikada hiç haçan şahsy maglumat bolmaýar. Guramanyň öz ulgamlary hem şol işleri gurama bagly we gerimi çäklendirilen API açary bilen edip bilýär ([ADR-0016](https://docs.tamga.network/adr/0016-hosted-issuer-api-access)).

Gurama her resminamadan öň adamyň şahsyýetini şol resminama görnüşiniň talap edýän derejesinde barlaýar. Adam işi gapjygyndan hem başlap biler. Gapjykda guramany saýlaýar, gurama hem ony gapjygyndaky tassyklanan şahsyýet resminamasy arkaly öz ýazgylary bilen gabat getirýär.

Diplom hem goşulyp, her resminama her biri aýry açara bagly 10 nusgalyk bukja görnüşinde berilýär. Şeýlelikde gapjyk her görkezişde täze nusgany ulanyp bilýär we iki barlaýjy şol bir adamy gaýtalanýan baha arkaly gabat getirip bilmeýär ([OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive)). Resminama üpjün edijisi ynam sanawynda hasaba alnan islendik gapjyga iberilip bilner. Gurama resminama berýän adamlarynyň adyndan gapjyk saýlamaýar.

## Goşulandan soň näme üýtgäp biler?

![Gurama ýazgysynyň dört ýagdaýy we olaryň her biriniň manysy](/blog/join-as-an-institution/en/fig-durumlar.png)

Ähli ýagdaýlarda şol bir düzgün güýjünde. Barlaýjy resminama guramanyň häzirki ýagdaýyna görä däl-de, resminamanyň berlen günündäki ýagdaýyna görä baha berýär. Şonuň üçin resminama bermegi bes eden gurama uçurymlarynyň diplomlaryny güýjünden düşürmeýär. Guramanyň açary ele salnan bolsa, ýazgy belli bir sene bilen ýatyrylýar we diňe şol seneden soň berlen resminamalar barlagdan geçip bilmeýär.

## Hakyky goşulyş taslamasy nähili geçýär?

[Tora goşul](/join) sahypasynda alty ädim bar. Ilki gerim kesgitlenýär, ýagny haýsy resminamalaryň beriljekdigi we haýsy pilot topar bilen başlanjakdygy çözülýär. Soňra resminama görnüşi saýlanýar ýa-da bilelikde taýýarlanýar. Şertnamalara gol çekilýär we gizlinlik habarnamasy täzelenýär. Ondan soň hasaba alyş geçirilýär, integrasiýa gurulýar we hemme zat sandbox-da başdan-aýak synagdan geçirilýär. Iň soňunda bolsa ilki kiçi topar bilen hakyky ulanyşa geçilýär. Başlamak üçin guramaňyzyň adyny we resminama bermek, barlamak ýa-da ikisini hem isleýändigiňizi partners@tamga.network salgysyna ýazyp bilersiňiz.

## Köp berilýän soraglar

### Gurama öz talyp ýa-da agza maglumatlar binýadyny tabşyrmalymy?

Ýok. Tor adamlar bilen bagly hiç hili ýazgy saklamaýar. Maglumatlar resminama berlen pursatynda guramanyň öz ulgamyndan okalýar we göni adamyň telefonyna gidýär.

### Guramanyň öz serwerleri gerekmi?

Ýok. Başlamak üçin ýerleşdirilen resminama beriş hyzmaty we Institution Console ýeterlik. Resminama beriş işini özi alyp barmak isleýän guramalar açyk çeşmeli `@tamga-network/issuer` paketini ulanyp biler.

### Sandbox synag guramasyny hakyky tora geçirip bolýarmy?

Ýok. Sandbox-daky guramalar, ýazgylar we sertifikatlar her gije pozulýar we sandbox-yň kök sertifikaty hakyky torda ykrar edilmeýär. Hakyky tor üçin aýry arza we aýry açarlar gerek.

### Guramanyň resminamalaryny haýsy gapjyklar alyp biler?

Üpjün edijisi ynam sanawynda hasaba alnan we toruň gapjyk düzgünlerine eýerýän her gapjyk bu resminamalary alyp biler. Tamga Wallet tordaky gapjyklaryň diňe biridir.

### Guramanyň gol açary ogurlansa näme bolýar?

Guramanyň ýazgysy `invalidates_from` senesi bilen ýatyrylýar. Şol pursatdan soň gol çekilen resminamalar barlagdan geçip bilmeýär, öň gol çekilenlere bolsa täsir etmeýär. Gurama mundan soň täze sertifikaty hasaba aldyrýar.

## Çeşmeler

- [(ÝB) 2025/848 Ýerine ýetiriş regulamenti: gapjyklara daýanýan taraplaryň hasaba alynmagy](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: relying party attributes and registration certificates](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/guides/sandbox) · [Resminama bermek](https://docs.tamga.network/guides/issue-credentials)
- [ADR-0024: gatnaşyjylaryň hasaba alyş maglumatlary](https://docs.tamga.network/adr/0024-participant-registration-data) · [ADR-0041: sandbox synag guramalary](https://docs.tamga.network/adr/0041-sandbox-institution-test-accounts)
- [Tamga Rulebook (gatnaşmak düzgünleri)](https://arf.tamga.network/rulebook) · [Tora goşul](/join) · [Resminama berýän gurama hökmünde goşulmak](/learn/join-as-issuer)

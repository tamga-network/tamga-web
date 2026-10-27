---
title: Gurama Tamga Network-a nähili goşulýar
slug: join-as-an-institution
description: "Gurama Tamga Network-a nähili goşulýar: sandbox-da synap görmek, hasaba alyş maglumatlary we CSR bilen ýüz tutmak, sanawa girmek, ilkinji resminamany bermek."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Sources: GUIDE-0007 join-as-institution 1.0.0 (roles and classes, application JSON, ADR-0024 mandatory data, two P-256 keys, CSR, HSM/KMS, certificate 2 years / max 3, registrar reports all gaps at once, live within 24 h, issuer_id from certificate, WRPRC, per-type authorisation, ended authorisation not deleted, hosted vs own server, identity proofing SPEC-ID-0003, statuses table, status at time of issuance); GUIDE-0013 sandbox §9 (test institution: made-up name, "(TEST)" added, no email/phone/person name, real names and official words refused, passkey invite, CSV up to 200 rows, ID-number checksum refused, desk issuance QR + PIN, verify at example verifiers; limits 30 / 10 per 10 min / 200 records / 100 offers per hour; nightly deletion; education type only today); ADR-0041; ADR-0019 (Institution Console: passkey, records, revocation, API keys, users); ADR-0016 (scoped API key); ADR-0020 (authentic source, no register of people); tamga-web join page (participation agreement, DPA when hosted, privacy notice, proof of entitlement, lookup endpoint OpenAPI, statistics never personal data, partners@tamga.network, 6 steps: scope, type, legal, registration, integration, pilot then live). External: CIR (EU) 2025/848, ETSI TS 119 475. -->

Gurama Tamga Network-a iki tapgyrda goşulýar. Ilki ol tutuş akymy sandbox-da synap görýär: ol ýerde birnäçe minutda synag guramasyny özi açyp, oýlanyp tapylan ýazgylardan gapjyga resminama berip bilýär. Soňra ol hasaba alyş maglumatlary we sertifikata gol çekmek haýyşy bilen hakyky tora ýüz tutýar; hasaba alyjy faýly barlaýar, kök sertifikat edarasy guramanyň sertifikatyna gol çekýär we gurama 24 sagadyň içinde belli resminama görnüşleri üçin ygtyýarly bolup gol çekilen ynam sanawynda peýda bolýar. Şondan soň ol resminamalary ýerleşdirilen hyzmat we Institution Console arkaly ýa-da öz serwerinden berýär.

![Sandbox synagyndan ilkinji resminama çenli dört ädim](/blog/join-as-an-institution/en/fig-yol.png)

## Haýsy guramalar goşulyp biler?

Adamlaryň bir zady subut etmek üçin gerek bolan resminamalaryny berýän islendik gurama: uniwersitetler we mekdepler, hassahanalar we hünär palatalary, döwlet edaralary, kompaniýalar (işgär we ygtyýarnama resminamalary) we çäre gurnaýjylar (adama baglanan biletler). Sanawda her guramanyň ugry (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) we synpy bar:

| Synp | Manysy |
|---|---|
| `PUB` | döwlet edarasynyň beren resminamasy |
| `QUALIFIED` | kwalifisirlenen resminama |
| `EAA` | talyp resminamasy ýa-da bilet ýaly adaty elektron attestasiýa |

Goşulmak guramany ýazga alýar; oňa öňden bolmadyk hukuklary bermeýär. Diplom bermek hukugy uniwersiteti dolandyrýan kanundan gelýär. Toruň işi şol hukugy maşyn bilen barlap bolar ýaly etmekdir.

Resminama bermegiň ýerine ony barlamak isleýän guramalar (iş berijiler, web saýtlar, gapylar) hasaba alnan barlaýjy hökmünde goşulýar. Ol ýol [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda.

## Gurama ýüz tutmazdan öň ony nähili synap görüp biler?

Sandbox-da, ýagny toruň [sandbox.tamga.network](https://sandbox.tamga.network) salgysyndaky aýry synag gurşawynda. Ol ýerdäki hiç zat hakyky tora degmeýär: onuň öz synag kök sertifikaty bar, sanawlary synag sanawy diýlip bellenen we hakyky barlaýjy onuň resminamalaryny kabul etmeýär.

Synag birnäçe minut alýar ([sandbox gollanmasy, §9](https://docs.tamga.network/guides/sandbox)):

1. Sandbox sahypasynda **Try your institution** düwmesini saýlaň we oýlanyp tapylan gurama adyny ýazyň; oňa "(TEST)" goşulýar. E-poçta, telefon belgisi ýa-da şahsy at soralmaýar. Hakyky guramalaryň atlary we resmi edara sözleri ret edilýär.
2. Synag guramasy sandbox-yň synag guramalary sertifikat edarasyndan alnan öz gol sertifikaty bilen sandbox ynam sanawyna derrew goşulýar.
3. Bir gezeklik çakylyk salgysy bilen Institution Console-y açyň we passkey dörediň.
4. Ýazgylary bir-birden giriziň ýa-da CSV faýlyny ýükläň (200 setire çenli). Türk şahsyýet belgisiniň barlag jemini (checksum) geçýän belgi bolan ýazgy ret edilýär, şonuň üçin diňe bilkastlaýyn nädogry belgiler girýär.
5. Ýazgynyň ýanyndaky **Issue at the desk** saýlaň, sandbox-a birikdirilen gapjyk bilen QR koduny skanirläň we PIN-i giriziň.
6. Resminamany sandbox sahypasyndaky "Diploma check" ýa-da "Student discount" nusga barlaýjysyna görkeziň.

Häzir synag guramasy bilim guramasydyr (talyp resminamasy we diplom). Hemme zat (gurama, onuň hasaby, ýazgylary we sertifikatlary) her gije pozulýar. Çäkler adalatlylygy saklaýar: bir wagtda iň köp 30 synag guramasy, her birinde 200 ýazgy we sagatda 100 teklip.

> **Bellik:** Sandbox-a diňe oýlanyp tapylan maglumatlary giriziň. Bu synag tory: onuň hyzmat borçnamasy ýok we her gije Türkiýe wagty bilen 03:30-da täzeden başlaýar.

## Hakyky tora ýüz tutmakda näme bar?

Arza üç görnüşli mazmuny bolan bir faýldyr: gurama kim, ol näme berer we onuň maglumatlary nireden gelýär.

![Guramanyň arzasy üçin taýýarlamaly zatlary](/blog/join-as-an-institution/en/fig-gerekenler.png)

Hasaba alyş maglumatlary ÝB-niň gatnaşyjylar üçin umumy maglumat toplumydyr: hukuky we söwda ady, resmi belgisi (salgyt belgisi ýa-da söwda sanawynyň belgisi), poçta salgysy, habarlaşmak üçin maglumat we adamlaryň arz edip biljek maglumatlary goramak edarasy ([ADR-0024](https://docs.tamga.network/adr/0024-participant-registration-data)). Şol bir model [(ÝB) 2025/848 Ýerine ýetiriş regulamentinde](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) ÝB gapjyklaryna daýanýan taraplar üçin ulanylýar. Bir meýdan ýetmese ýazgy edilmeýär we hasaba alyjy ähli boşluklary birbada sanaýar.

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

Doly nusga işläp düzüjiler üçin gollanmada: [Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution).

Şol faýldaky iki setir toruň nähili işleýändigi barada köp zat aýdýar. `vcts` guramanyň bermek isleýän resminama görnüşlerini sanaýar; olar açyk [shema katalogyndan](https://docs.tamga.network/specifications/schema-catalog) saýlanýar; täze görnüş ilki öz tassyklamasyndan geçýär. `authentic_source` maglumatlaryň hakykatdan gelýän ulgamyny görkezýär. Toruň adamlaryň hasaba alyş kitaby ýok: resminama berlende maglumatlar guramanyň öz ulgamyndan, guramanyň özüniň dolandyrýan nokady arkaly okalýar ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Faýl bilen bilelikde hukuky bölekler gelýär: gatnaşmak şertnamasy, ýerleşdirilen hyzmat ulanylsa maglumatlary işlemek şertnamasy (gurama maglumatlara jogapkär bolup galýar), resminama berýän adamlary üçin täzelenen gizlinlik beýannamasy we guramanyň resminamany bermäge hukugynyň bardygynyň subutnamasy.

## Näme üçin guramanyň açary hiç haçan guramadan çykmaýar?

Sebäbi resminamany guramanyň öz resminamasy edýän zat açardyr. Kimde açar bar bolsa, şol guramanyň adyndan gol çekip biler, şonuň üçin ol her ädimde guramada galýar.

Gurama iki P-256 açar jübütini döredýär: biri resminamalara gol çekýär, beýlekisi onuň ýatyrylyş sanawyna gol çekýär. Ol her biri üçin diňe sertifikata gol çekmek haýyşyny (CSR) iberýär:

```bash title="Açar we sertifikata gol çekmek haýyşyny döretmek"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

Hakyky işde açar enjam howpsuzlyk modulynda (HSM) ýa-da bulut açar dolandyryş hyzmatynda (KMS) saklanmaly. Hasaba alyjy CSR-iň goluny barlaýar we kök sertifikat edarasyndan iki ýyl (iň köp üç ýyl) güýjünde bolan sertifikaty yzyna berýär.

## Gurama hasaba alnanda näme bolýar?

Hasaba alyjy guramany Türkiýe sanawyna goşýar we oňa täzeden gol çekýär. 24 sagadyň içinde ýazgy `trust.tamga.network` salgysynda işläp başlaýar. Onda sertifikatyň barmak yzyndan hasaplanan `issuer_id`, synp, ynamlylyk derejesi, ygtyýarly resminama görnüşleri, ýagdaý we onuň taryhy bar. Her çap edilende hasaba alyş sertifikaty (ETSI TS 119 475) awtomatik döredilýär, şonuň üçin gapjyklar ýazgyny şol ýol bilen hem barlap biler. Ýazgynyň nähili görünýändigi we barlaýjylaryň ony nähili okaýandygy: [Gol çekilen ynam sanawy nähili işleýär](/blog/how-trust-lists-work).

Ygtyýarnama resminama görnüşi boýunça berilýär. Görnüş soňra goşulyp ýa-da tamamlanyp bilner. Tamamlanan ygtyýarnama pozulmaýar, şonuň üçin tamamlanmazdan öň berlen resminamalar barlagdan geçmegini dowam etdirýär.

## Gurama ilkinji resminamasyny nähili berýär?

Iki ýol bar we ikisinde hem resminama birmeňzeş: guramanyň adyndan berlen we onuň açary bilen gol çekilen.

| | Ýerleşdirilen hyzmat | Öz serweriňiz |
|---|---|---|
| Ony näme işledýär | Tamga-nyň resminama beriş hyzmaty we Institution Console | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Nähili birikýärsiňiz | konsol ýa-da ulgamyňyzdan çäklendirilen API açary | öz ýerleşdirişiňiz |
| Kime amatly | çalt başlamak, stolda bermek, kiçi toparlar | hemme zady öz içinde saklamak isleýän guramalar |

Ýerleşdirilen hyzmatda hem açar guramada galýar: hyzmat guramanyň uzakdan gol çekiş hyzmatyna (CSC API v2) diňe gysgaça heşi (digest) iberýär we goly yzyna alýar ([ADR-0057](https://docs.tamga.network/adr/0057-hosted-issuance-remote-signing)).

[Institution Console](https://docs.tamga.network/adr/0019-institution-console-and-database) işgärleriň işleýän ýeri: olar passkey bilen girýär, ýazgylary dolandyrýar, QR kody we aýratyn berlen PIN bilen stolda resminama berýär, resminamalary ýatyrýar ýa-da togtadýar we beriş statistikasyny görýär. Statistikada hiç haçan şahsy maglumat bolmaýar. Ulgamlar şol bir zady guruma baglanan we gerimi çäklendirilen API açary arkaly edip biler ([ADR-0016](https://docs.tamga.network/adr/0016-hosted-issuer-api-access)).

Her resminamadan öň gurama adamyň şahsyýetini şol resminama görnüşiniň talap edýän derejesinde barlaýar. Adam gapjykdan hem başlap biler: ol guramany saýlaýar, gurama bolsa ony gapjygynda eýýäm bar bolan barlanan şahsyýet resminamasy arkaly tanaýar.

Her resminama, şol sanda diplom, aýry açarly 10 nusgadan ybarat toplum hökmünde berilýär; şeýlelikde gapjyk her gezek täze nusga görkezip biler we iki barlaýjy şol bir adamy gaýtalanýan baha arkaly baglanyşdyryp bilmez ([OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive)). Resminama üpjün edijisi ynam sanawynda bolan islendik gapjyga gidip biler. Gurama öz adamlary üçin gapjyk saýlamaýar.

## Goşulandan soň näme üýtgäp biler?

![Gurama ýazgysynyň dört ýagdaýy we olaryň her biriniň manysy](/blog/join-as-an-institution/en/fig-durumlar.png)

Olaryň ählisinde bir düzgün hereket edýär: barlaýjy resminama guramanyň şu günki ýagdaýy boýunça däl, resminama berlen günündäki ýagdaýy boýunça baha berýär. Resminama bermegi bes eden gurama öz uçurymlarynyň diplomlaryny hem özi bilen aýyrmaýar. Açar ele salnan bolsa, ýazgy sene bilen ýatyrylýar we diňe şol seneden başlap berlen resminamalar barlagdan geçmegini bes edýär.

## Hakyky goşulyş taslamasy nähili geçýär?

[Tora goşul](/join) sahypasy alty ädimi sanaýar: gerimi ylalaşmak (haýsy resminamalar, haýsy pilot topary), resminama görnüşini saýlamak ýa-da taslamak, şertnamalara gol çekmek we gizlinlik beýannamasyny täzelemek, hasaba durmak, sandbox-da birikdirmek we başdan-aýak synagdan geçirmek, soňra ilki kiçi topar bilen işe girizmek. Başlamak üçin guramanyň adyny we onuň resminama bermek, barlamak ýa-da ikisini hem isleýändigini ýazyp partners@tamga.network salgysyna ýazyň.

## Köp berilýän soraglar

### Gurama öz talyp ýa-da agza maglumatlar bazasyny tabşyrmalymy?

Ýok. Toruň adamlaryň hasaba alyş kitaby ýok. Maglumatlar resminama berlen pursatynda guramanyň öz ulgamyndan okalýar we göni adamyň telefonyna gidýär.

### Guramanyň öz serwerleri gerekmi?

Ýok. Başlamak üçin ýerleşdirilen resminama beriş hyzmaty we Institution Console ýeterlik. Resminama bermegi özi işletmegi makul bilýän guramalar açyk çeşmeli `@tamga-network/issuer` paketini ulanyp biler.

### Sandbox synag guramasyny hakyky tora geçirip bolýarmy?

Ýok. Sandbox guramalary, ýazgylary we sertifikatlary her gije pozulýar we sandbox köküne hakyky torda ynanylmaýar. Hakyky tor üçin aýry arza we açarlar gerek.

### Guramanyň resminamalaryny haýsy gapjyklar alyp biler?

Üpjün edijisi ynam sanawynda hasaba alnan we toruň gapjyk düzgünlerine eýerýän islendik gapjyk. Tamga Wallet toruň gapjyklarynyň biridir, ýeke-täki däl.

### Guramanyň gol açary ogurlansa näme bolýar?

Ýazgy `invalidates_from` senesi bilen ýatyrylýar. Şol pursatdan başlap gol çekilen resminamalar barlagdan geçmeýär; öňküler täsir astyna düşmeýär. Soňra gurama täze sertifikaty hasaba aldyrýar.

## Çeşmeler

- [(ÝB) 2025/848 Ýerine ýetiriş regulamenti: gapjyklara daýanýan taraplaryň hasaba alynmagy](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: relying party attributes and registration certificates](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Tora gurama hökmünde goşulmak](https://docs.tamga.network/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/guides/sandbox) · [Resminama bermek](https://docs.tamga.network/guides/issue-credentials)
- [ADR-0024: gatnaşyjylaryň hasaba alyş maglumatlary](https://docs.tamga.network/adr/0024-participant-registration-data) · [ADR-0041: sandbox synag guramalary](https://docs.tamga.network/adr/0041-sandbox-institution-test-accounts)
- [Tamga Rulebook (gatnaşmak düzgünleri)](https://arf.tamga.network/rulebook) · [Tora goşul](/join) · [Resminama berýän gurama hökmünde goşulmak](/learn/join-as-issuer)

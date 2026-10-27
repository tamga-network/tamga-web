---
title: "Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk"
slug: tamga-arf
description: Tamga ARF 1.0 ÝB-niň salgylanma çarçuwasyna eýerýär - onda näme bar, näme birmeňzeş galýar, näme tapawutlanýar we näme üçin, döwletler we guramalar oňa nähili gatnaşýar.
date: 2026-10-08
lang: tk
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Sources: Tamga ARF set (framework README: document set, versions 1.0.0 Active, first release 2026-10-02, Turkish source and English official translation, CC BY 4.0, compiles decisions and creates none, every rule traces to an ADR/spec/invariant); FW-ARF-0001 §1.3 (structure), §1.4 (relation to eIDAS 2.0 and EU ARF, EUDI Wallet is a legal title), §1.5 (three layers), §1.6 (P1-P7), §1.7 (out of scope incl. PID), §3 (role table: TLSO, registrar, national root CA, access/registration certificate provider provisional; PID provider empty; provisional identity attestation provider), §4.1 (sandbox single, network's), §5.1-5.4, §6.1-6.6 (LOTL and country lists, federation, list rules, registration, assurance levels, known limit), §7.3 (conformance), §8.1-8.4 (phases, ledger, governance body, standards map). FW-TF-0001 §0 (binding for institutions signing the participation agreement; World Bank five-layer model), §1.3 (scope: TDT members and observers), §1.6 (organs, council two-thirds), §2.4 and §4.1-4.3 (light conformity, mixed regime, open conformance vectors), §6 (three interoperability levels), §6.1 (external lists FD1-FD5, LoTE first), §7 (hand-over plan). FW-RB-0001 (rule format RB-<ROLE>-<NN>, RFC 2119, branching rulebooks, RB-GEN-03, list phase note). FW-ONB-0001 §5 (state steps). ADR-0009 (chainless, ledger with two independent operators), ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (sandbox SB1-SB5), ADR-0041 (self-service test institutions), D-GOV-5 (TDT-first: slots, full role set, operator provisional, on_behalf_of; hand-over changes only operator). Live lotl.json checked 2026-10-08 (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved; TR roles tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). EU: ARF v3.0.0 (2026-07-23), CIR 2025/848, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF Tamga Network-yň düzgünler kitabydyr: Ýewropa sanly şahsyýet gapjygy üçin ÝB ARF-i bilen şol bir gurluşda gurlan Architecture and Reference Framework ([eIDAS 2.0 we ÝB ARF näme](/blog/eidas-arf-for-the-turkic-world)). 1.0 wersiýasy 2026-njy ýylyň 2-nji oktýabrynda [arf.tamga.network](https://arf.tamga.network) salgysynda iňlis we türk dillerinde çap edildi. Onuň tehniki gatlagy ÝB-niňki bilen birmeňzeş: şol bir resminama formatlary, protokollar, ynam sanawy modeli we rollar toplumy. Tapawutlanýan zat dolandyryş gatlagydyr; ol ÝB-de bolmadyk we entek öz sanawlary bolmadyk döwletler üçin ýazylan. Tamga wagtlaýyn operator hökmünde hereket edýär, her türki döwlet üçin bellenen ýer, açyk sandbox bar we ikinji garaşsyz operator goşulýança umumy kitap ýok.

## Tamga ARF-de näme bar?

![Tamga ARF resminamalar toplumy we olaryň ÝB-däki gabatlary](/blog/tamga-arf/en/fig-yapi.png)

ÝB çarçuwasy ýaly Tamga ARF hem goşundylary bolan bir esasy resminamadyr ([Tamga ARF](https://arf.tamga.network/architecture)):

| Resminama | Nämäni öz içine alýar | ÝB-däki gabaty |
|---|---|---|
| Esasy resminama | Ulanyş ýagdaýlary, rollar, arhitektura, maglumat modeli, ynam modeli, howpsuzlyk, dolandyryş | EUDI ARF esasy resminamasy |
| A goşundy: Trust Framework | Dolandyryş, her rol üçin giriş derwezeleri, laýyklyk, şertnamalar, tabşyryş meýilnamasy | ýerine ýetiriş regulamentleri we milli ynam shemalary |
| B goşundy: Tamga Rulebook | Her rol üçin belgilenen, hökmany düzgünler | ARF 2-nji goşundy, ýokary derejeli talaplar |
| C goşundy: Rulebook-lar | Bilim (talyp resminamasy, diplom), Şahsyýet (şahsyýet attestasiýasy, sürüjilik şahadatnamasy attestasiýasy), Çäre bileti | attestasiýa rulebook-lary |
| D we E goşundylar | Kesgitlemeler; standartlar, kararlar we düzgün çeşmeleri | ARF 1-nji goşundy we salgylanmalar |
| Okaýyş ýoly, Rollar, Goşulmak | Her rol üçin okaýyş tertibi, her roluň näme edýändigi, goşulmagyň ädimleri | |

Okamazdan öň toplum barada üç zady bilmek peýdaly.

**Ol jemleýär; karar bermeýär.** Çarçuwadaky her düzgün ýazga alnan karardan (ADR), spesifikasiýadan ýa-da üýtgemeýän düzgünden gelýär we salgylanmalar goşundysy her biriniň çeşmesini görkezýär. Çeşmesi bolmadyk düzgün düzgün hökmünde ýazylmaýar. Düzgüni üýtgetmek üçin ilki onuň aňyrsyndaky karar üýtgeýär, çarçuwa bolsa şol bir işiň içinde oňa eýerýär.

**Düzgünler belgilenen we görnüşlere bölünen.** Her düzgüniň `RB-<ROLE>-<NN>` görnüşindäki kody bar we ol MUST, MUST NOT, SHOULD we MAY sözlerini RFC 2119 manysynda ulanýar. Mysal üçin, RB-GEN-03 ynam çeşmesi köne ýa-da elýeterli bolmasa netijäniň hiç haçan "kabul edildi" ýa-da "ret edildi" däl-de, "kesgitsiz" bolmalydygyny aýdýar. Auditor ýa-da integrator takyk düzgüne salgylanyp biler.

**Resminama rulebook-lary esasy rulebook-dan şahalanýar.** Bilim, Şahsyýet we Çäre bileti rulebook-lary ähli umumy düzgünleri miras alýar we diňe öz görnüşine mahsus zatlary goşýar: ony kim berýär, nähili şahsyýet barlagy bilen, haýsy meýdanlar, ol näçe wagt güýjünde we nähili ýatyrylýar. Täze ugur diňe ýedi nokatly barlag sanawy tamamlanandan soň täze rulebook bolýar ([Rulebook-lar](https://arf.tamga.network/rulebook)).

Türkçe tekst çeşmedir, iňlisçe tekst bolsa şol bir wersiýanyň resmi terjimesidir; ikisi hem hemişe şol bir wersiýada. Resminamalar CC BY 4.0 boýunça çap edilýär we her üýtgeşme çarçuwanyň [What changed](https://arf.tamga.network/changes) sahypasynda sanalýar.

## ÝB bilen näme birmeňzeş galýar?

Düzgün boýunça tehniki gatlak. Tamga-nyň orun kararynda onuň resminama, protokol we ynam sanawy formatlarynyň ÝB standartlaryndan daşlaşmaýandygy, Tamga mahsus islendik goşmaçanyň bolsa standart müşderileri bozmaýan standart giňeltme nokadyny ulanýandygy aýdylýar ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Amalda:

- **Resminama formatlary:** her resminama görnüşi üçin IETF SD-JWT VC we ýüzbe-ýüz görkeziş hem-de zero-knowledge subutnamalary üçin şahsyýet resminamasynyň ikinji görnüşi hökmünde ISO/IEC 18013-5 mdoc.
- **Protokollar:** resminama bermek üçin OpenID4VCI 1.0, görkeziş üçin DCQL bilen OpenID4VP 1.0, ikisi hem HAIP 1.0 profili astynda.
- **Ýatyrylyş:** IETF Token Status List.
- **Guramanyň şahsyýeti:** milli köke baglanýan X.509 sertifikatlary.
- **Ynam modeli:** milli sanawlara salgylanýan ynam sanawlarynyň sanawy (LOTL), ÝB-däki ýaly iki dereje. Sanawlar wersiýaly, heş-zynjyrly we gol çekilen, ynam sanawynyň meýdanlary bolsa ETSI TS 119 612 we ETSI TS 119 602-ä gabat gelýär.
- **Daşarky sanawlar:** başga biriniň, başga döwletiň ýa-da ÝB-niň işledýän sanawy berkidilen gol çekiji we kesgitlenen gerim bilen ETSI TS 119 602 formatynda (LoTE, lists of trusted entities) okalýar ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)).
- **Daýanýan taraplaryň hasaba alynmagy:** barlaýjylar ÝB-niň umumy hasaba alyş maglumat toplumy bilen hasaba durýar we (ÝB) 2025/848 Ýerine ýetiriş regulamentiniň we ETSI TS 119 475-iň modelinde hasaba alyş sertifikatlaryny alýar; gapjyk her haýyşy sertifikat bilen deňeşdirýär.
- **Gapjyk howpsuzlygy:** gapjyk üpjün edijisinden gapjyk nusgasynyň attestasiýalary we açar attestasiýalary, açarlar enjamyň howpsuz enjamynda.
- **Ynamlylyk atlary:** şahsyýet barlagy üçin Low, Substantial we High, resminamalar üçin EAA we QEAA adalgalary.
- **Rollar toplumy:** ynam sanawy shemasynyň operatoryndan daýanýan tarap araçysyna çenli ARF-iň rollary, olaryň her biriniň her milli sanawda ýeri bar.

Maksat ÝB ekoulgamy üçin ýazylan programma üpjünçiliginiň Tamga resminamasyny Tamga mahsus kod ýolsuz işläp bilmegidir. Bu ýerde "ÝB bilen laýyk" şuny aňladýar we bu bellik bilen däl, synaglar bilen görkezilýär.

## Näme tapawutlanýar we näme üçin?

![Tehniki gatlak ÝB-niňki bilen birmeňzeş; dolandyryş gatlagy türki dünýäsi üçin ýazylan](/blog/tamga-arf/en/fig-ayni-farkli.png)

ÝB çarçuwasy regulamenti, ygtyýarly edaralary bar bolan agza döwletleri we sertifikatlaşdyryş ulgamyny göz öňünde tutýar. Tamga ARF bularyň hiç biri ÝB-den daşarda bolmazdan öň işlemeli. Mundan alty tapawut gelip çykýar.

### 1. Wagtlaýyn operator we ol muny aýdýar

ÝB-de her agza döwlet öz ynam sanawyny işledýär. Tamga Network-da entek hiç bir döwlet bu roly öz üstüne almady, şonuň üçin Tamga Türkiýe sanawyny milli ygtyýarly edaranyň adyndan wagtlaýyn çap edýär. Sanaw muny öz maglumatlarynda ýazga alýar, şonuň üçin hiç kim muňa ynanmaga mejbur däl:

```json title="Türkiýe sanawynyň operatory (işleýän ynam sanawlarynyň sanawy, 2026-njy ýylyň 8-nji oktýabry)"
{
  "state_code": "TR",
  "status": "ACTIVE",
  "operator": {
    "name": "Tamga Network",
    "status": "provisional",
    "on_behalf_of": "TR national authority (to be designated)"
  }
}
```

Tamga-nyň şeýle saklaýan rollary ynam sanawynyň operatory, hasaba alyjy, milli kök sertifikat edarasy we giriş sertifikaty üpjün edijisidir. Olaryň her biri tabşyrar ýaly taslanan. Tabşyrmak operator meýdanyny, sanawyň salgysyny we gol çekijisini üýtgedýär; guramalaryň belgileri, resminama görnüşleriniň belgileri we eýýäm berlen resminamalar üýtgemeýär.

### 2. Ilkinji günden her türki döwlet üçin ýer

Çarçuwada hiç zat ýeke operatory göz öňünde tutmaýar. Ynam sanawlarynyň sanawynda Türki Döwletleriň Guramasynyň her agza döwleti (Azerbaýjan, Gazagystan, Gyrgyzystan, Türkiýe, Özbegistan) we synçy döwletler Wengriýa hem-de Türkmenistan üçin eýýäm ýer bar. Häzir diňe Türkiýe işjeň, beýlekiler bellenen. Her milli sanaw, rol boş bolan ýerinde hem, ARF-iň doly rollar toplumyny göterýär. Bu düzgün soňra goşulýan döwlet täzeden taslamagy talap etmesin diýip "TDT-first" ýörelgesi hökmünde ir kesgitlendi.

### 3. Bilkastlaýyn PID ýok

ÝB-niň gapjygy döwletiň berýän adamy tanadýan maglumatlaryna, PID-e daýanýar. Tamga bu roly öz üstüne almaýar. Her milli sanawda PID üpjün edijisiniň ýeri döwlet üçin bellenen. Döwlet ony doldurýança wagtlaýyn şahsyýet hyzmaty uzakdan şahsyýet barlagyndan soň şahsyýet attestasiýasyny berýär. Bu attestasiýa PID däl-de, häsiýetleriň attestasiýasydyr we onuň rulebook-y PID üpjün edijisi gelende geçiş ýumşak bolar ýaly ÝB-niň PID rulebook-ynyň nusgasyna eýerýär.

### 4. Sertifikatlaşdyrmadan öň laýyklyk

ÝB-de gapjyklary 2024/2981 Ýerine ýetiriş regulamenti boýunça laýyklygy bahalandyrýan edaralar sertifikatlaşdyrýar. Tamga ARF garyşyk düzgüni ulanýar: her roluň işe girizmezden öň öz programma üpjünçiligi bilen işledýän açyk, wersiýaly laýyklyk synag wektorlary we borçnama synaglary, iň ýokary beriji synpy üçin öňünden bahalandyrma we beýlekiler üçin soňky barlaglar. Garaşsyz bahalandyryş edaralary we milli sertifikatlaşdyrma döwletler goşulanda goşulýar ([Trust Framework](https://arf.tamga.network/trust-framework)).

### 5. Bir açyk sandbox

ÝB-de salgylanma durmuşa geçirişleri we pilotlar bar. Tamga Network [sandbox.tamga.network](https://sandbox.tamga.network) salgysynda tor tarapyndan şol bir düzgünler boýunça işledilýän, öz synag köki, öz sanawlary, nusga guramalary we oýlanyp tapylan adamlary bolan ýeke synag toruny goşýar ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Gurama ol ýerde synag guramasyny özi açyp biler, gapjyk işläp düzüjiler bolsa öz gapjyk üpjün edijisini şol ýerde hasaba aldyrýar. Hiç bir hakyky gapjyk ýa-da barlaýjy sandbox köküne ynanmaýar, şonuň üçin sandbox resminamasy hakyky torda hiç haçan geçmeýär.

### 6. Entek umumy kitap ýok

Häzir ynam gol çekilen sanawlardan we açyk, sagatlaýyn labyr žurnalyndan gelýär; bu ÝB-niň modelidir. Rugsatly kitap meýilnamanyň bir bölegi, ýöne diňe azyndan iki garaşsyz operator gatnaşanda, sebäbi bir operatoryň saklaýan kitaby çykdajy goşýar, ýöne ynam goşmaýar ([ADR-0009](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çarçuwa çägi aç-açan aýdýar: oňa çenli labyr bir operatoryň goluna daýanýar we açyk žurnallar hyýanatçylygy mümkin däl etmeýär, diňe onuň öňüni alýar. Has giňişleýin [Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet) ýazgysynda.

Hukuky esas hem tapawutlanýar. ÝB-de düzgünler regulament şeýle aýdýandygy üçin hökmany. Tamga Network-da Trust Framework gatnaşmak şertnamasyna gol çeken her gurama üçin hökmany we döwletler goşulandan soň dolandyryş üçden iki köplük bilen karar berýän agza döwletleriň geňeşine geçýär ([Näme üçin Tamga Network girdeji gazanmaýar we fonda geçmeli](/blog/network-as-a-foundation)).

## Döwlet nähili gatnaşýar?

![Döwletiň öz rollaryny öz üstüne alýan ädimleri](/blog/tamga-arf/en/fig-devlet.png)

Döwlet täze ulgamy kabul etmeli däl. Ol üstünde eýýäm öz ady bolan rollary öz üstüne alýar ([Goşulmak](https://arf.tamga.network/onboarding)):

1. **Niýet.** Döwlet goşulmak isleýändigini aýdýar. Ilkinji döwlet operatory hakyky işe başlanda geňeş döredilýär.
2. **Kök sertifikat.** Döwletiň kök sertifikaty oflaýn dabarada döredilýär we wagtlaýyn sertifikatyň ýanyna çalşyk (rollover) hökmünde goşulýar.
3. **Sanawy işletmek we hasaba alyjy.** Milli sanawyň operator meýdany döwlete geçýär, hasaba almak hem şeýle. Şondan soň wagtlaýyn operator şol döwletde hiç kimi hasaba alyp bilmeýär.
4. **PID üpjün edijisi.** Döwlet öz PID üpjün edijisini belleýär we wagtlaýyn şahsyýet attestasiýasy oňa tabşyrylýar.

Bu ädimleriň hiç biri hiç bir resminamany, ýazgyny ýa-da belgini güýjünden düşürmeýär. Her döwlet öz sanawynyň ýeke-täk awtory bolup galýar we başga döwletiň sanawyny ykrar etmek her döwletiň özi üçin berýän kararydyr. Milli sanawy çap etmegiň tehniki ädimleri işläp düzüjiler üçin [Milli sanawy çap etmek](https://docs.tamga.network/guides/publish-national-list) gollanmasynda.

## Gurama nähili gatnaşýar?

Ilki sandbox arkaly, soňra Trust Framework-yň giriş derwezeleri arkaly. Uniwersitet, palata, döwlet edarasy ýa-da bilet satyjy doly akymy sandbox-da synap görýär, laýyklyk synaglaryny işledýär we soňra üç beriji derejesiniň birinde hasaba durýar: hasaba alnan, şertnamaly ýa-da akkreditasiýaly. Her resminama görnüşi aýratyn ygtyýarlandyrylýar we adatça ýapyk. Barlaýjylar umumy hasaba alyş maglumat toplumy bilen hasaba durýar we her ulanyş üçin hasaba alyş sertifikatyny alýar. Hasaba durmak hukuky ygtyýarnama däl: diplom bermek hukugy henizem guramany dolandyrýan kanundan gelýär. Ädimler [Gurama Tamga Network-a nähili goşulýar](/blog/join-as-an-institution) ýazgysynda.

## Okamaga nireden başlamaly?

Çarçuwada her rol üçin [okaýyş ýoly](https://arf.tamga.network/reading-path) bar. Gysgaça:

- **Döwlet ýa-da düzgünleşdiriji:** esasy resminamanyň rollar we dolandyryş baradaky bölümleri, soňra Trust Framework-yň tabşyryş meýilnamasy.
- **Resminama berýän gurama:** Rollar sahypasy, Tamga Rulebook-yň beriji düzgünleri we resminama görnüşiňiziň rulebook-y, mysal üçin [Education Rulebook](https://arf.tamga.network/rulebooks/education).
- **Barlaýjy ýa-da gapjyk işläp düzüji:** Tamga Rulebook-yň rolyňyz üçin düzgünleri, soňra `docs.tamga.network` salgysyndaky işläp düzüji dokumentasiýasy we laýyklyk synaglary.

## Köp berilýän soraglar

### Tamga ARF ÝB ARF-iň şahasy (fork) mydyr?

Ol ÝB ARF-iň gurluşyna eýerýär we şol bir standartlary ulanýar, ýöne ol öz dolandyryşy bolan aýry çarçuwadyr. ÝB düzgüni regulamente ýa-da agza döwletiň ygtyýarly edarasyna bagly bolan ýerinde Tamga ARF-iň olarsyz işleýän düzgüni bar we ol şu gün şol roly kimiň saklaýandygyny aýdýar.

### ÝB täze ARF wersiýasyny çap edende näme bolýar?

Tamga ÝB düzgünlerini peýda bolşy ýaly yzarlaýar we üýtgeşmeleri ilki öz kararlaryna, soňra çarçuwa ýazýar. Üýtgeşme çarçuwanyň täze wersiýasy bolýar we What changed sahypasynda sanalýar.

### Tamga ARF-e eýermek gapjygy EUDI Wallet edýärmi?

Ýok. "EUDI Wallet" ÝB agza döwletiniň berýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlaşdyrylan gapjyklary üçin hukuky ýagdaýdyr. Tamga ARF-e eýermek gapjygy ÝB bilen laýyk edýär we onuň Tamga Network-da sanawa goşulmagyna mümkinçilik berýär.

### Döwlet düzgünleri üýtgedip bilermi?

Her döwlet öz sanawyny we hasaba alyşlaryny dolandyrýar. Agza kabul etmek ýa-da umumy resminama görnüşini goşmak ýaly tutuş tor boýunça düzgünler geňeş döredilenden soň agza döwletleriň geňeşi tarapyndan üçden iki ses bilen kabul edilýär.

### Çarçuwany mugt ulanyp bolýarmy?

Hawa. Resminamalar CC BY 4.0 boýunça çap edilýär, toruň paketleri bolsa Apache-2.0 boýunça açyk çeşmeli.

## Çeşmeler

- [Tamga ARF 1.0](https://arf.tamga.network) · [Arhitektura](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/rulebook) · [Rollar](https://arf.tamga.network/roles) · [Goşulmak](https://arf.tamga.network/onboarding) · [What changed](https://arf.tamga.network/changes)
- [ADR-0035: orun kesgitlemek](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: ynam federasiýasy](https://docs.tamga.network/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox) · [ADR-0009: zynjyrsyz beta we zynjyr çägi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: özygtyýarlylyga esaslanýan dolandyryş](https://docs.tamga.network/adr/0002-sovereignty-first-governance)
- [Federasiýa](https://docs.tamga.network/concepts/federation) · [Milli sanawy çap etmek](https://docs.tamga.network/guides/publish-national-list) · [Laýyklyk](https://docs.tamga.network/guides/conformance)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Komissiýanyň (ÝB) 2025/848 Ýerine ýetiriş regulamenti: gapjyklara daýanýan taraplaryň hasaba alynmagy](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(ÝB) 2024/2981 Ýerine ýetiriş regulamenti: gapjyklaryň sertifikatlaşdyrylmagy](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Düzgünler we rulebook-lar](/learn/rules-and-rulebooks) · [Döwletler üçin](/learn/for-states) · [Whitepaper](/whitepaper)

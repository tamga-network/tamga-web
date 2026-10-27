---
title: "Tamga ARF: Ýewropa çarçuwasyny nähili uýgunlaşdyrdyk?"
slug: tamga-arf
description: Tamga ARF 1.0 ÝB-niň salgylanma çarçuwasyna eýerýär. Onda näme bardygyny, ÝB bilen nämäniň birmeňzeş galyp, nämäniň tapawutlanýandygyny, döwletiň we guramanyň nähili goşulýandygyny düşündirýäris.
date: 2026-10-08
lang: tk
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Sources: Tamga ARF set (framework README: document set, versions 1.0.0 Active, first release 2026-10-02, Turkish source and English official translation, CC BY 4.0, compiles decisions and creates none, every rule traces to an ADR/spec/invariant); FW-ARF-0001 §1.3 (structure), §1.4 (relation to eIDAS 2.0 and EU ARF, EUDI Wallet is a legal title), §1.5 (three layers), §1.6 (P1-P7), §1.7 (out of scope incl. PID), §3 (role table: TLSO, registrar, national root CA, access/registration certificate provider provisional; PID provider empty; provisional identity attestation provider), §4.1 (sandbox single, network's), §5.1-5.4, §6.1-6.6 (LOTL and country lists, federation, list rules, registration, assurance levels, known limit), §7.3 (conformance), §8.1-8.4 (phases, ledger, governance body, standards map). FW-TF-0001 §0 (binding for institutions signing the participation agreement; World Bank five-layer model), §1.3 (scope: TDT members and observers), §1.6 (organs, council two-thirds), §2.4 and §4.1-4.3 (light conformity, mixed regime, open conformance vectors), §6 (three interoperability levels), §6.1 (external lists FD1-FD5, LoTE first), §7 (hand-over plan). FW-RB-0001 (rule format RB-<ROLE>-<NN>, RFC 2119, branching rulebooks, RB-GEN-03, list phase note). FW-ONB-0001 §5 (state steps). ADR-0009 (chainless, ledger with two independent operators), ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (sandbox SB1-SB5), ADR-0041 (self-service test institutions), D-GOV-5 (TDT-first: slots, full role set, operator provisional, on_behalf_of; hand-over changes only operator). Live lotl.json checked 2026-10-08 (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved; TR roles tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). EU: ARF v3.0.0 (2026-07-23), CIR 2025/848, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF Tamga Network-yň düzgünler kitabydyr. Ol ÝB-niň Ýewropa sanly şahsyýet gapjygy üçin taýýarlan ARF-i bilen şol bir gurluşda gurlan Architecture and Reference Framework-dyr ([eIDAS 2.0 we ÝB ARF näme](/blog/eidas-arf-for-the-turkic-world)). 1.0 wersiýasy 2026-njy ýylyň 2-nji oktýabrynda [arf.tamga.network](https://arf.tamga.network) salgysynda iňlis we türk dillerinde çap edildi. Çarçuwanyň tehniki gatlagy ÝB-niňki bilen birmeňzeş. Ol şol bir resminama formatlaryny, protokollary, ynam sanawy modelini we rollar toplumyny ulanýar. Tapawutly zat dolandyryş gatlagydyr. Bu gatlak ÝB-niň agzasy bolmadyk we entek öz sanawy bolmadyk döwletler üçin ýazyldy. Tamga wagtlaýyn operator hökmünde işleýär, her türki döwlet üçin bölünip goýlan ýer bar, açyk sandbox bar we ikinji garaşsyz operator goşulýança umumy kitap ulanylmaýar.

## Tamga ARF-de näme bar?

![Tamga ARF resminamalar toplumy we olaryň ÝB-däki gabatlary](/blog/tamga-arf/en/fig-yapi.png)

ÝB çarçuwasynda bolşy ýaly, Tamga ARF hem esasy resminamadan we goşundylardan ybarat ([Tamga ARF](https://arf.tamga.network/architecture)):

| Resminama | Nämäni öz içine alýar | ÝB-däki gabaty |
|---|---|---|
| Esasy resminama | Ulanyş ýagdaýlary, rollar, arhitektura, maglumat modeli, ynam modeli, howpsuzlyk, dolandyryş | EUDI ARF esasy resminamasy |
| A goşundy: Trust Framework | Dolandyryş, her rol üçin goşulyş şertleri, laýyklyk, şertnamalar, tabşyryş meýilnamasy | ýerine ýetiriş regulamentleri we milli ynam shemalary |
| B goşundy: Tamga Rulebook | Her rol üçin belgilenen we hökmany düzgünler | ARF 2-nji goşundy, ýokary derejeli talaplar |
| C goşundy: Rulebook-lar | Bilim (talyp resminamasy, diplom), Şahsyýet (şahsyýet resminamasy, sürüjilik şahadatnamasy resminamasy), Çäre bileti | attestasiýa rulebook-lary |
| D we E goşundylar | Kesgitlemeler; standartlar, kararlar we düzgün çeşmeleri | ARF 1-nji goşundy we salgylanmalar |
| Okaýyş ýoly, Rollar, Goşulmak | Her rol üçin okaýyş tertibi, her roluň wezipesi, goşulmagyň ädimleri | |

Okap başlamazdan öň bu resminamalar toplumy barada üç zady bilmek peýdaly.

**Çarçuwa kararlary jemleýär, özi karar bermeýär.** Çarçuwadaky her düzgün ýazga geçirilen karardan (ADR), spesifikasiýadan ýa-da üýtgewsiz düzgünden gelýär we salgylanmalar goşundysy her düzgüniň çeşmesini görkezýär. Çeşmesi bolmadyk bent düzgün hökmünde ýazylmaýar. Düzgüni üýtgetmek üçin ilki onuň aňyrsyndaky karar üýtgemeli we çarçuwa hem şol bir işiň dowamynda bu üýtgeşmä eýerýär.

**Düzgünler belgilenýär we olaryň görnüşi belli.** Her düzgüniň `RB-<ROL>-<NN>` görnüşinde kody bar we düzgünlerde MUST, MUST NOT, SHOULD we MAY sözleri RFC 2119-daky manylarynda ulanylýar. Mysal üçin, RB-GEN-03 ynam çeşmesi gaty köne bolsa ýa-da elýeterli bolmasa, netijäniň "kesgitsiz" bolmalydygyny aýdýar. Bu ýagdaýda netije hiç haçan "kabul" ýa-da "ret" bolup bilmeýär. Şeýlelikde auditor ýa-da integrasiýany alyp barýan topar edil haýsy düzgüne seredýändigini görkezip bilýär.

**Resminama görnüşleriniň rulebook-lary esasy rulebook-dan şahalanýar.** Bilim, Şahsyýet we Çäre bileti rulebook-lary ähli umumy düzgünleri miras alýar we diňe öz görnüşlerine mahsus meseleleri goşýar. Bular resminamany kimiň berýändigi, haýsy şahsyýet barlagynyň geçirilýändigi, haýsy meýdanlaryň bardygy, resminamanyň näçe wagt güýjündedigi we nähili ýatyrylýandygydyr. Täze ugur üçin rulebook ýazmak ýedi bentlik barlag sanawy tamamlanandan soň mümkin bolýar ([Rulebook](https://arf.tamga.network/rulebook)).

Türk dilindäki tekst çeşme tekstdir, iňlis dilindäki tekst bolsa şol wersiýanyň resmi terjimesidir we ikisi hemişe şol bir wersiýada saklanýar. Resminamalar CC BY 4.0 ygtyýarnamasy bilen çap edilýär we her üýtgeşme çarçuwanyň [Näme üýtgedi](https://arf.tamga.network/changes) sahypasynda sanalýar.

## ÝB bilen näme birmeňzeş galýar?

Düzgüne görä tehniki gatlak ÝB bilen birmeňzeş galýar. Tamga-nyň orun kesgitleýiş karary resminama, protokol we ynam sanawy formatlarynyň ÝB standartlaryndan aýrylmajakdygyny aýdýar. Tamga-a mahsus her goşundy hem standart müşderileri bozmaýan giňeltme nokady arkaly edilýär ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Amalda bu şeýle görünýär:

- **Resminama formatlary:** ähli resminama görnüşleri üçin IETF SD-JWT VC; şahsyýet resminamasynyň ikinji görnüşi hökmünde, ýüzbe-ýüz görkeziş we nol bilimli subutnama üçin ISO/IEC 18013-5 mdoc.
- **Protokollar:** resminama bermek üçin OpenID4VCI 1.0, görkezmek üçin DCQL bilen bilelikde OpenID4VP 1.0; ikisi hem HAIP 1.0 profili boýunça.
- **Ýatyrylyş:** IETF Token Status List.
- **Guramanyň şahsyýeti:** milli köke baglanýan X.509 sertifikatlary.
- **Ynam modeli:** milli sanawlary görkezýän sanawlaryň sanawy (LOTL), ýagny ÝB-däki iki derejeli gurluşyň edil özi. Sanawlar wersiýalanýar, heşler arkaly biri-birine zynjyrlanýar we olara gol çekilýär. Ynam sanawynyň meýdanlary ETSI TS 119 612 we ETSI TS 119 602 bilen gabat getirilýär.
- **Daşarky sanawlar:** başga döwletiň ýa-da ÝB-niň dolandyrýan sanawy ETSI TS 119 602 formatynda (LoTE, ynamly subýektleriň sanawlary), gol çekijisi berkidilen we gerimi kesgitlenen görnüşde okalýar ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)).
- **Daýanýan taraplaryň hasaba alynmagy:** barlaýjylar ÝB-niň umumy hasaba alyş maglumat toplumy bilen hasaba durýar we (ÝB) 2025/848 Ýerine ýetiriş regulamentine hem-de ETSI TS 119 475 modeline laýyk hasaba alyş sertifikatyny alýar. Gapjyk hem her haýyşy şu sertifikat bilen deňeşdirýär.
- **Gapjyk howpsuzlygy:** gapjyk üpjün edijisinden alynýan gapjyk nusgasynyň attestasiýasy we açar attestasiýasy; açarlar enjamyň howpsuz enjam modulynda saklanýar.
- **Ynamlylyk derejeleriniň atlary:** şahsyýeti barlamak üçin Low, Substantial we High; resminamalar üçin EAA we QEAA adalgalary.
- **Rollar toplumy:** ynam sanawy operatoryndan araçy barlaýja çenli ARF-däki ähli rollar; olaryň her biriniň her milli sanawda ýeri bar.

Maksat, ÝB ekoulgamy üçin ýazylan programma üpjünçiliginiň Tamga resminamasyny Tamga-a mahsus kod goşmazdan işläp bilmegidir. Bu ýerde "ÝB bilen laýyk" diýen söz şuny aňladýar we bu laýyklygy bellik bilen däl-de, synaglar bilen görkezýäris.

## Näme tapawutlanýar we näme üçin?

![Tehniki gatlak ÝB-niňki bilen birmeňzeş; dolandyryş gatlagy türki dünýäsi üçin ýazylan](/blog/tamga-arf/en/fig-ayni-farkli.png)

ÝB çarçuwasy regulamentiň, edaralary döredilen agza döwletleriň we sertifikatlaşdyryş ulgamynyň bardygyny çak edýär. Tamga ARF bolsa ÝB-den daşarda bularyň hiç biri bolmasa-da işläp bilmeli. Bu ýagdaý alty tapawuda getirýär.

### 1. Wagtlaýyn operator bar we bu aç-açan ýazylýar

ÝB-de her agza döwlet öz ynam sanawyny dolandyrýar. Tamga Network-da bolsa entek hiç bir döwlet bu roly öz üstüne almady. Şonuň üçin Türkiýe sanawyny Tamga milli edaranyň adyndan wagtlaýyn çap edýär. Sanaw muny öz maglumatynda hem ýazýar, şeýlelikde hiç kim bu babatda dilden berlen kepillige daýanmaly bolmaýar:

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

Tamga-nyň şeýle görnüşde öz üstüne alan rollary ynam sanawy operatory, hasaba alyş edarasy, milli kök sertifikat edarasy we giriş sertifikatyny üpjün edijidir. Olaryň her biri tabşyrylyp bilinjek görnüşde taslandy. Tabşyrylanda operator meýdany, sanawyň salgysy we gol çekijisi üýtgeýär. Guramalaryň belgileri, resminama görnüşleriniň belgileri we eýýäm berlen resminamalar bolsa üýtgemeýär.

### 2. Ilkinji günden her türki döwlet üçin ýer bölünip goýuldy

Çarçuwadaky hiç bir gurluş ýeke operatory çak etmeýär. Sanawlaryň sanawynda eýýäm Türki Döwletleriň Guramasynyň her agza döwleti (Azerbaýjan, Gazagystan, Gyrgyzystan, Türkiýe, Özbegistan) we synçy döwletler Wengriýa bilen Türkmenistan üçin ýer bar. Häzir diňe Türkiýe işjeň, beýleki ýerler bölünip goýlan. Her milli sanaw boş galýan rollar hem goşulyp, ARF-däki ähli rollar toplumyny göterýär. Soňra goşulýan döwlet täzeden taslamagy talap etmez ýaly, bu düzgün ir tapgyrda "ilki TDG" ýörelgesi hökmünde goýuldy.

### 3. Taslama boýunça PID ýok

ÝB-niň gapjygy döwletiň berýän adamy tanadýan maglumatlaryna (PID) daýanýar. Tamga bu roly öz üstüne almaýar we her milli sanawda PID üpjün edijisiniň ýeri döwlete bölünip goýlan. Döwlet bu ýeri doldurýança wagtlaýyn şahsyýet hyzmaty uzakdan şahsyýet barlagyndan soň şahsyýet resminamasyny berýär. Bu resminama häsiýetleriň attestasiýasy bolup, PID hasaplanmaýar. Resminamanyň rulebook-y bolsa ÝB-niň PID rulebook-ndaky gurluşa eýerýär, şeýlelikde PID üpjün edijisi gelende geçiş aňsat bolýar.

### 4. Sertifikatlaşdyrmadan öň laýyklyk gelýär

ÝB-de gapjyklar 2024/2981 Ýerine ýetiriş regulamentine laýyklykda laýyklygy bahalandyrýan edaralar tarapyndan sertifikatlaşdyrylýar. Tamga ARF bolsa garyşyk usuly ulanýar. Her rol hakyky ulanyşa geçmezden öň öz programma üpjünçiligi bilen açyk we wersiýalanan laýyklyk synag wektorlaryny we borçnama synaglaryny işledýär. Iň ýokary resminama beriji synpy öňünden barlanýar, beýlekiler bolsa soňra barlanýar. Garaşsyz bahalandyryş edaralary we milli sertifikatlaşdyryş döwletler goşulanda ulgama goşular ([Trust Framework](https://arf.tamga.network/trust-framework)).

### 5. Bir açyk sandbox bar

ÝB-niň salgylanma programmalary we pilot taslamalary bar. Tamga Network bulara goşmaça, toruň şol bir düzgünler bilen dolandyrýan bir synag toruny hödürleýär: [sandbox.tamga.network](https://sandbox.tamga.network). Sandbox-yň öz synag köki, öz sanawlary, nusga guramalary we oýlanyp tapylan adamlary bar ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Gurama ol ýerde özbaşdak synag guramasyny açyp bilýär, gapjyk işläp düzüjileri hem öz gapjyk üpjün edijilerini şol ýerde hasaba aldyryp bilýär. Hiç bir hakyky gapjyk ýa-da barlaýjy sandbox köküne ynanmaýandygy üçin sandbox-da alnan resminama hakyky torda hiç haçan barlagdan geçmeýär.

### 6. Entek umumy kitap ýok

Häzir ynam gol çekilen sanawlardan we sagatda azyndan bir gezek ýazylýan açyk labyr žurnalyndan gelýär we ÝB modeli hem şeýle işleýär. Rugsatly kitap meýilnamanyň bir bölegi, ýöne diňe azyndan iki garaşsyz operator goşulanda işe girizer, sebäbi bir operatoryň saklaýan kitaby çykdajyny artdyrýar, ynamy bolsa artdyrmaýar ([ADR-0009](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çarçuwa bu çägi aç-açan ýazýar. Oňa çenli ynam ýakory bir operatoryň goluna daýanýar we açyk ýazgylar hyýanatçylykly ulanylyşyň öňüni doly almaýar, diňe ondan saklandyrýar. Jikme-jiklikleri [Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet) ýazgysynda tapyp bilersiňiz.

Hukuky esas hem tapawutly. ÝB-de düzgünler regulament şeýle diýýändigi üçin hökmany. Tamga Network-da bolsa Trust Framework gatnaşyk şertnamasyna gol çeken her guramany borçly edýär. Döwletler goşulanda dolandyryş kararlaryny üçden iki ses köplügi bilen kabul edýän agza döwletleriň geňeşine geçer ([Näme üçin Tamga Network girdeji gazanmaýar we fonda geçýär?](/blog/network-as-a-foundation)).

## Döwlet nähili goşulýar?

![Döwletiň öz rollaryny öz üstüne alýan ädimleri](/blog/tamga-arf/en/fig-devlet.png)

Döwletiň täze ulgamy kabul etmegi gerek däl. Üstünde eýýäm öz ady ýazylan rollary kabul edip almagy ýeterlik ([Goşulmak](https://arf.tamga.network/onboarding)):

1. **Niýet.** Döwlet goşulmak isleýändigini habar berýär. Ilkinji döwlet operatory hakyky işe geçende geňeş döredilýär.
2. **Kök sertifikat.** Döwletiň kök sertifikaty onlaýn däl dabarada döredilýär we wagtlaýyn kök sertifikatyň ýanyna, wagtyň geçmegi bilen onuň ornuny tutjak görnüşde goşulýar.
3. **Sanawy dolandyrmak we hasaba alyş edarasy.** Milli sanawyň operator meýdany döwlete geçýär we hasaba alyş ygtyýary hem oňa berilýär. Mundan soň wagtlaýyn operator şol döwletde hiç kimi hasaba alyp bilmeýär.
4. **PID üpjün edijisi.** Döwlet öz PID üpjün edijisini belleýär we wagtlaýyn şahsyýet resminamasy oňa tabşyrylýar.

Bu ädimleriň hiç biri resminamany, ýazgyny ýa-da belgini güýjünden düşürmeýär. Her döwlet öz sanawynyň ýeke-täk awtory bolup galýar we başga döwletiň sanawyny ykrar etmek ýa-da etmezlik baradaky karary özi berýär. Milli sanawy çap etmegiň tehniki ädimlerini [Milli sanawy çap etmek](https://docs.tamga.network/guides/publish-national-list) atly işläp düzüjiler gollanmasynda tapyp bilersiňiz.

## Gurama nähili goşulýar?

Gurama ilki sandbox-dan, soňra Trust Framework-yň goşulyş şertlerinden geçip goşulýar. Uniwersitet, hünär palatasy, döwlet edarasy ýa-da bilet satyjy tutuş işi sandbox-da synap görýär, laýyklyk synaglaryny işledýär we soňra üç resminama beriji derejesiniň birinde hasaba durýar. Bu derejeler hasaba alnan, şertnamaly we akkreditirlenen. Her resminama görnüşi üçin aýratyn ygtyýar berilýär we ygtyýar adaty ýagdaýda ýapyk gelýär. Barlaýjylar umumy hasaba alyş maglumat toplumy bilen hasaba durýar we her ulanyş üçin hasaba alyş sertifikatyny alýar. Hasaba alynmak hukuky ygtyýarnama diýmek däl. Mysal üçin, diplom bermek hukugy ýene-de guramanyň tabyn bolan kanunyndan gelýär. Ädimleri [Gurama Tamga Network-a nähili goşulýar?](/blog/join-as-an-institution) ýazgysynda düşündirdik.

## Okamaga nireden başlamaly?

Çarçuwada her rol üçin [okaýyş ýoly](https://arf.tamga.network/reading-path) bar. Gysgaça aýtsak:

- **Döwlet ýa-da düzgünleşdiriji edara:** esasy resminamanyň rollar we dolandyryş bölümlerinden başlap, Trust Framework-yň tabşyryş meýilnamasyna geçip biler.
- **Resminama berýän gurama:** Rollar sahypasyny, Tamga Rulebook-daky resminama beriji düzgünlerini we resminama görnüşiniň rulebook-yny, mysal üçin [Bilim Rulebook-yny](https://arf.tamga.network/rulebooks/education) okap biler.
- **Barlaýjy ýa-da gapjyk işläp düzüjisi:** Tamga Rulebook-da öz roluna degişli düzgünleri okap, soňra `docs.tamga.network` salgysyndaky işläp düzüjiler resminamalaryna we laýyklyk synaglaryna geçip biler.

## Köp berilýän soraglar

### Tamga ARF ÝB ARF-iň göçürmesimi?

Tamga ARF ÝB ARF-iň gurluşyna eýerýär we şol bir standartlary ulanýar, ýöne öz dolandyryşy bolan aýry çarçuwadyr. ÝB düzgüni regulamente ýa-da agza döwletiň edarasyna daýanýan bolsa, Tamga ARF-de olarsyz hem işleýän düzgün bar we şol roly häzir kimiň öz üstüne alandygy ýazylýar.

### ÝB täze ARF wersiýasyny çap edende näme bolýar?

Tamga ÝB düzgünlerini çap edilişine görä yzarlaýar. Üýtgeşmeler ilki öz kararlaryna, soňra bolsa çarçuwa girizilýär. Her üýtgeşme täze çarçuwa wersiýasy hökmünde çykýar we Näme üýtgedi sahypasynda sanalýar.

### Tamga ARF-e eýerýän gapjyk EUDI Wallet bolýarmy?

Ýok. "EUDI Wallet" ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlaşdyrylan gapjyklaryna berilýän hukuky derejedir. Tamga ARF-e eýermek gapjygy ÝB bilen laýyk edýär we onuň Tamga Network-da sanawa girizilmegine mümkinçilik berýär.

### Döwlet düzgünleri üýtgedip bilermi?

Her döwlet öz sanawyny we hasaba alyşlaryny dolandyrýar. Täze agzany kabul etmek ýa-da umumy resminama görnüşini goşmak ýaly tor derejesindäki düzgünler barada bolsa döredilenden soň agza döwletleriň geňeşi üçden iki ses bilen karar berer.

### Çarçuwany mugt ulanyp bolýarmy?

Hawa. Resminamalar CC BY 4.0 ygtyýarnamasy bilen çap edilýär we toruň paketleri Apache-2.0 ygtyýarnamaly açyk çeşmeli programmalardyr.

## Çeşmeler

- [Tamga ARF 1.0](https://arf.tamga.network) · [Arhitektura](https://arf.tamga.network/architecture) · [Trust Framework](https://arf.tamga.network/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/rulebook) · [Rollar](https://arf.tamga.network/roles) · [Goşulmak](https://arf.tamga.network/onboarding) · [What changed](https://arf.tamga.network/changes)
- [ADR-0035: orun kesgitlemek](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: ynam federasiýasy](https://docs.tamga.network/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox) · [ADR-0009: zynjyrsyz beta we zynjyr çägi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: özygtyýarlylyga esaslanýan dolandyryş](https://docs.tamga.network/adr/0002-sovereignty-first-governance)
- [Federasiýa](https://docs.tamga.network/concepts/federation) · [Milli sanawy çap etmek](https://docs.tamga.network/guides/publish-national-list) · [Laýyklyk](https://docs.tamga.network/guides/conformance)
- [EUDI Wallet Architecture and Reference Framework, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Komissiýanyň (ÝB) 2025/848 Ýerine ýetiriş regulamenti: gapjyklara daýanýan taraplaryň hasaba alynmagy](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(ÝB) 2024/2981 Ýerine ýetiriş regulamenti: gapjyklaryň sertifikatlaşdyrylmagy](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Düzgünler we rulebook-lar](/learn/rules-and-rulebooks) · [Döwletler üçin](/learn/for-states) · [Whitepaper](/whitepaper)

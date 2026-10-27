---
title: "Yzarlamasyz ýatyrylyş: ýagdaý sanawynda gizlinlik"
slug: status-list-privacy
description: Tamga Network-yň ýagdaý sanawlary barlaýja resminamanyň nirede görkezilendigini resminama berýän gurama aýtmazdan ýatyrylyşy barlamaga nähili mümkinçilik berýär we bu gizlinlik nirede gutarýar.
date: 2026-10-08
lang: tk
updated: 2026-10-23
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (2026-10-09: interval 2 min, revocation effective within a few minutes, list valid 6 h; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. ADR-0044 (ZK short-lived copies ≤ 24 h, implemented in packages 0.4.0). -->

Ýagdaý sanawy (status list) barlaýja resminamany beren gurama ýüz tutmazdan onuň ýatyrylandygyny ýa-da ýatyrylmandygyny bilmäge mümkinçilik berýär. Tamga Network-da her gurama IETF Token Status List formatynda bir uly, gol çekilen bit setirini çap edýär; her resminama onuň içindäki tötänleýin orna salgylanýar. Barlaýjylar tutuş sanawlary öňünden ýükleýär we bit bahasyny öz nusgasyndan okaýar; şonuň üçin gurama resminamanyň haçan, nirede ýa-da kime görkezilendigini hiç haçan bilmeýär.

## Näme üçin ýatyrylyş barlagy yzarlaýyş kanalyna öwrülip biler?

Ýatyrylyşy barlamagyň iň äşgär ýoly soramakdyr: barlaýjy resminamanyň tertip belgisini berijä iberýär we "güýjünde" ýa-da "ýatyryldy" jogabyny alýar. Webde sertifikat barlagy ençeme ýyl şeýle işledi. Munuň adamlar üçin möhüm bolan bir täsiri bar. Her barlag berijä kimdir biriniň şu pursatda, şu tor salgysyndan şu adamyň resminamasyna seredýändigini aýdýar.

Diplom üçin bu uniwersitetiň her uçurymyň haýsy iş berijilere ýüz tutandygyny görüp biljekdigini aňladýar. Kagyz diplom uniwersitete beýle zat hiç haçan aýtmaýardy. Sanly diplom hem aýtmaly däl. Tamga-nyň ýagdaý sanawy spesifikasiýasy muny özüniň ilkinji gizlinlik düzgüni hasaplaýar: barlaýjy barlag pursatynda sanawy almaly däl ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## Token Status List nähili işleýär?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) beriji tarapyndan gol çekilen, gysylan kiçi sanlar toplumydyr. 2026-njy ýylyň oktýabryndan bäri bitleriň sany resminama görnüşine bagly (ADR-0048, 0.6.0 paketleri). Şahsyýet hyzmatynyň resminamalaryny togtadyp bolmaýar we olaryň sanawlary bir bit ulanýar: `0` güýjünde, `1` ýatyrylan. Guramalaryň sanawlary iki bit ulanýar: `0` güýjünde, `1` hemişelik ýatyrylan, `2` togtadylan (aýryp bolýar) we `3` ulanylmaýar, barlaýjy ony ýatyrylan hasaplaýar. `2` bahasy diňe diplom ýaly shemasy togtatmaga rugsat berýän görnüşler üçin ulanylýar. Togtatmak uniwersitet derňew wagtynda diplomy doly ýatyrman saklap bilsin diýip bar.

Her resminama sanawa salgylanma göterýär. Salgylanma saýlap açylyp bilinmeýär: ol her görkeziş bilen bilelikde gidýär, sebäbi ol barlaýja gerek.

> **Bellik:** Ýönekeýleşdirilen mysal. Salgy we indeks oýlanyp tapylan. Hakyky format [ýagdaý sanawy spesifikasiýasynda](https://docs.tamga.network/specifications/status-list).

```json title="Ýönekeýleşdirilen mysal: resminamanyň içindäki ýagdaý meýdany"
{
  "status": {
    "status_list": {
      "idx": 48213,
      "uri": "https://status.tamga.network/3f9c1a7e5b20d846"
    }
  }
}
```

Barlaýjy `uri` salgysyndaky tokeni alýar, onuň goluny guramanyň [gol çekilen ynam sanawyndaky](/blog/how-trust-lists-work) ýazgysy bilen barlaýar, onuň heşini labyr žurnaly bilen deňeşdirýär, ony açýar we `idx` ornundaky ýazgyny okaýar. Sanawyň özi resminamalara gol çekýän açardan aýry bolan ýagdaý açary bilen gol çekilýär; şonuň üçin ogurlanan ýagdaý açary bilen ýalan ýagdaýlary çap edip bolýar, ýöne diplomy galplaşdyryp bolmaýar.

## Süri gizlinligi näme we süri näçe uly?

Ýüklenen sanaw barlaýjynyň onuň haýsy ýazgysy bilen gyzyklanýandygy hakda hiç zat aýtmaýar. Bu süri gizlinligidir (herd privacy): siziň resminamaňyz şol sanawdaky beýlekileriň hemmesiniň arasynda gizlenýär. Süri diňe uly bolsa we siziň ornuňyz hiç zat bilen tapawutlanmasa peýdalydyr. Tamga-nyň düzgünleri ikisini hem dogry etmek üçin ýazylan:

![Ýagdaý sanawynyň resminamanyň kime degişlidigini açmagynyň öňüni alýan düzgünler](/blog/status-list-privacy/en/fig-suru.png)

- **Uly sanawlar.** Her sanawda azyndan 100 000 ýazgy üçin ýer bar. 80%-i paýlananda täze sanaw açylýar. Köplenç noldan ybarat sanaw gysylanda birnäçe ýüz baýt bolýar, şonuň üçin ululyk hiç zada düşmeýär.
- **Tötänleýin orunlar.** Indeks tutuş sanawdan tötänleýin saýlanýar. Sanaýjy (counter) ulanmak gadagan: yzygiderli belgiler bilen 12-nji indeks ýylyň on ikinji uçurymy bolardy we iki uçurymyň indeksleri, uçuran senesi hiç haçan açylmadyk hem bolsa, olaryň biri-birinden näçe wagt aralykda uçurandygyny görkezerdi.
- **Açyk bolmadyk salgylar.** Sanawyň salgysy tötänleýin setirdir. `.../edu-2026` ýa-da `.../medicine` ýaly salgy her görkezişde ýyly ýa-da fakulteti açardy, adam bolsa hut şol meýdany gizlände.
- **Diňe görnüş boýunça bölmek.** Sanawlar resminama görnüşi boýunça aýrylyp bilner, sebäbi ol eýýäm görünýär. Olar ýyl, fakultet ýa-da topar boýunça bölünip bilinmez, sebäbi diňe "2026 sanawynda" bolmagyň özi hem açyş bolardy.

Bu düzgünler diňe kagyzda däl, açyk paketlerde hem bar. Beriji kitaphanasy 100 000 ýazgydan kiçi sanawy ret edýär, 80%-den geçip paýlamagy ret edýär we her indeksi kriptografiki tötänleýin san generatory bilen saýlaýar.

## Näme üçin barlaýjy sanawy öňünden ýükleýär?

Sebäbi barlag pursatynda ýüklemek hut ýokarda beýan edilen yzarlaýyş kanalydyr. Tamga barlaýjysy özüne gerek her ýagdaý sanawyny tertip boýunça täzeleýär we keşden barlaýar:

```ts title="@tamga-network/verifier bilen ýagdaý sanawlaryny öňünden almak"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // tertip boýunça, hiç haçan her barlagda däl
```

Barlaýjy paketinde barlag ýagdaýy diňe şu keşden okaýar. Ýerleşdirilen barlaýjy Tamga Verify hem şeýle işleýär.

Her sanaw tokeninde iki wagt çägi bar. `ttl` täzelik maksadydyr: nusga täzelenmezden öň näçe wagt ulanylyp bilner. `exp` berk çäkdir, ondan soň nusgany asla ulanyp bolmaýar. Keşdäki nusga barlaýjynyň syýasaty üçin gaty köne bolsa, netije hiç haçan "ýatyryldy" däl-de, "häzir barlap bolmaýar" (`INDETERMINATE`) bolýar. "Bu diplom ýatyryldy" bilen "häzir barlap bilemok" arasyndaky tapawut kimdir biriniň işe alnyp-alynmajagydyr, şonuň üçin ikisi başgaça görkezilýär ([barlagyň muny nähili dolandyrýandygy](/blog/add-verification-to-your-site)).

## Hiç zat üýtgemedik bolsa näme üçin sanaw täzeden çap edilýär?

Gurama diňe bir zady ýatyranda täzeden çap eden bolsa, çap edilişiň özi habar bolardy: "Example University-de 14:00 bilen 15:00 aralygynda ýatyrylyş boldy". Daşarky maglumat, mysal üçin düzgün-nyzam kararynyň senesi bilen birleşdirilende, bu bir adama çenli daraldyp biler.

Şonuň üçin her sanaw bir zat üýtgese-de, üýtgemese-de kesgitli aralykda täzeden çap edilýär. Daşyndan seredeniňde her aralyk birmeňzeş görünýär: täze wersiýa bar. Aralyk 2 minut, şonuň üçin ýagdaý serweri işläp durka ýatyrylyş barlaýjylara birnäçe minudyň içinde ýetýär; çap edilen her sanaw 6 sagat güýjünde bolýar ([ARF §5.4](https://arf.tamga.network/architecture)).

![Ýagdaý sanawynyň bir çap ediliş aýlawy](/blog/status-list-privacy/en/fig-dongu.png)

Aýlawdan daşarda bilkastlaýyn "gyssagly" çap ediş ýok; aýlawdan daşary bir çap ediş goragy hemme kes üçin ýok ederdi. Bir zat derrew togtadylmaly bolsa, mysal üçin gol açary ogurlananda, dogry gural ýagdaý sanawy däl-de, ynam sanawynda guramanyň sertifikatyny togtatmakdyr.

Her çap ediliş ynam sanawyny çap edijiniň açyk labyr žurnalyna hem ýazylýar. Barlaýjy sanawyň heşini we wersiýasyny şol ýazgy bilen deňeşdirýär; bu guramanyň ýatyrylan resminamany ümsümlik bilen yzyna "güýjünde" ýagdaýyna getirmeginiň öňüni alýar. Labyr žurnalynda sanaw belgileri, wersiýalar we heşler bar, hiç haçan sanawdaky orun ýok.

## Nusgalar iki barlaýjynyň adamy gabat getirmeginiň öňüni nähili alýar?

Indeks resminamanyň tutuş ömrüne kesgitli. Adam şol bir resminamany iki barlaýja görkezse we ikisi maglumat alyşsa, birmeňzeş `idx` we `uri` olara munuň şol bir adamdygyny aýdardy. Spesifikasiýa muny Token Status List-iň gurluş çägi hökmünde görkezýär.

Jogap toplumlaýyn bermekdir. Her resminama, şol sanda diplom, 10 nusga hökmünde berilýär we her nusganyň öz enjam açary we öz tötänleýin indeksi bar. Gapjyk şol bir barlaýja şol bir nusgany, her başga barlaýja bolsa başga nusgany görkezýär (WL5 düzgüni). Nusgalar bilen indeksleriň arasyndaky gabatlyk berijiniň maglumatlar bazasynda galýar we ondan hiç haçan çykmaýar (PR10). Resminama ýatyrylanda onuň ähli nusgalarynyň bitleri şol aralykda üýtgän beýleki zatlar bilen bilelikde şol bir tertipli çap edilişde üýtgeýär.

Zero-knowledge görkezişi bir ädim öňe gidýär: ol asla indeks açmaýar. Munuň bahasy barlaýjynyň ýatyrylyşy barlap bilmeýändigidir. Karar zero-knowledge bilen diňe iň köp 24 sagat güýjünde bolan we resminama ýatyrylandan soň täzelenmeýän gysga ömürli nusgalary görkezmekdir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Bu 0.4.0 paketlerinden bäri işleýär: gysga ömür ýatyrylyş barlagynyň ornuny tutýar we şeýle nusga esaslanmaýan zero-knowledge görkezişi diňe barlaýjynyň syýasaty muňa aç-açan rugsat berse kabul edilýär ([Tamga-da zero-knowledge subutnamalary](/blog/zero-knowledge-in-tamga)).

## Kim näme görüp bilýär?

![Her tarapyň ýagdaý sanawyndan näme öwrenip bilýändigi we bilmeýändigi](/blog/status-list-privacy/en/fig-kim.png)

| Tarap | Görüp bilýär | Görüp bilmeýär |
|---|---|---|
| Resminama berýän gurama | özüniň edýän ýatyrmalaryny we togtatmalaryny | resminamanyň nirede, haçan ýa-da kime görkezilýändigini |
| Barlaýjy | özüne görkezilen nusganyň şu günki we soňky ýagdaýyny | şol bir resminamanyň beýleki nusgalaryny |
| Ýagdaý sanawyny ýerleşdiriji | barlaýjynyň sanawy täze saklaýandygyny | haýsy resminamanyň ýa-da haçan barlanýandygyny |
| Sanawy okaýan islendik adam | her aralykda täze wersiýany; wersiýalaryň arasynda haýsy bitleriň tapawutlanýandygyny | bitiň kimiň resminamasyna degişlidigini |

Hiç bir Tamga hyzmaty IP salgylaryny ýazga almaýar we hiç bir ýazgyda, žurnalda ýa-da netijede ýagdaý sanawyndaky orun ýok ([ARF §4.5](https://arf.tamga.network/architecture)).

## Bu gizlinlik nirede gutarýar?

Käbir çäkler spesifikasiýa kabul edilen çäkler hökmünde ýazylan we olary aç-açan aýtmak gerek.

- **Kiçi guramalaryň sürüsi kiçi.** 100 000 ýazgyly sanawda 300 uçurymy bolan kollejiň sanawy uly, ýöne sürüsi 300, sebäbi resminama berijisini her niçigem bolsa görkezýär. Munuň tehniki çözgüdi ýok; ol kabul edilen çäk hökmünde ýazylan.
- **Barlaýjy özüniň gören nusgasyny yzarlap biler.** Barlaýjy şol nusganyň indeksini bilýär, şonuň üçin ol soňra şol nusganyň ýatyrylandygyny görüp biler. Bu ýagdaý sanawynyň maksadydyr, ýöne bu hem maglumatdyr. Nusgalar ony adamy eýýäm tanaýan ýeke barlaýjy bilen çäklendirýär.
- **Wagt bulanyklaşdyrylýar, ýöne öçürilmeýär.** Kesgitli aralyk ýatyrylyşyň takyk pursatyny aralygyň içinde gizleýär. Ol esasy wakanyň senesini eýýäm bilýän we üýtgän biti yzarlap bilýän adamdan ýatyrylyşy gizlemeýär.
- **Ýerleşdirilen ýagdaý hyzmaty özüniň çap edýän ýatyrmalaryny görýär.** Gurama öz ýagdaý hyzmatyny işledip ýa-da toruň ýerleşdirilen resminama beriş hyzmatyny ulanyp biler. Ikinji ýagdaýda operator şol guramanyň ýatyrmalaryny çap edýär we şonuň üçin olary görýär. Spesifikasiýa muny hakyky merkezleşme nokady hökmünde atlandyrýar we ony ýok ýaly görkezmegiň ýerine dolandyryş düzgünlerine baglaýar.
- **Häzir labyr bir gol çekijä daýanýar.** Labyr žurnalyna ýeke, wagtlaýyn operator gol çekýär. Bu çägi aýyrýan umumy kitap ikinji garaşsyz operatora garaşýar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).

## Köp berilýän soraglar

### Resminamamy görkezenimde beriji muny bilýärmi?

Ýok. Barlaýjylar ýagdaý sanawlaryny öňünden ýükleýär we öz nusgasyndan barlaýar. Barlag pursatynda guruma hiç hili haýyş ýetmeýär.

### Kimdir biri sanawdan kimiň ýatyrylandygyny bilip bilermi?

Olar iki wersiýanyň arasynda käbir orunlaryň üýtgändigini görüp biler. Olar şol orunlaryň kimiň resminamalaryna degişlidigini bilip bilmeýär, sebäbi orunlar tötänleýin we gabatlyk berijide galýar.

### Ýatyrylyş näçe çalt güýje girýär?

Bir çap ediliş aralygy we barlaýjynyň täzelemesi bilen. Sanawlar her 2 minutdan täzeden çap edilýär, şonuň üçin ýagdaý serweri işläp durka bu birnäçe minut bolýar.

### Sanawy ýükläp bolmasa näme bolýar?

Barlaýjy soňky dogry nusgasyny ol möhleti gutarýança, ýagny çap edilenden 6 sagat soňa çenli ulanmagy dowam etdirýär. Ondan soň netije "ýatyryldy" däl-de, "häzir barlap bolmaýar" bolýar.

### Gyssagly ýagdaýda näme üçin derrew çap etmeli däl?

Aýlawdan daşary çap ediş bir zadyň bolandygyny açardy. Gyssagly ýagdaýlar onuň ýerine ynam sanawynda guramanyň sertifikatyny togtatmak bilen çözülýär.

## Çeşmeler

- [IETF Token Status List (OAuth iş toparynyň taslamasy)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: ýagdaý sanawy spesifikasiýasy](https://docs.tamga.network/specifications/status-list) · [Ýatyrylyş we täzelik](https://docs.tamga.network/concepts/revocation) · [Gizlinlik](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: arhitektura (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP we Token Status List](/blog/haip-and-token-status-list) · [Ýatyrylyş](/learn/revocation) · [Baglanyşyksyzlyk](/learn/unlinkability)

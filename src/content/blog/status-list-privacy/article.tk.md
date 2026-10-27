---
title: "Yzarlamasyz ýatyrylyş: ýagdaý sanawynda gizlinlik"
slug: status-list-privacy
description: Tamga Network-yň ýagdaý sanawlary bilen ýatyrylyş barlagynyň resminamanyň nirede görkezilendigi gurama aýdylmazdan nähili geçirilýändigini we bu gizlinligiň nirede gutarýandygyny düşündirýäris.
date: 2026-10-08
lang: tk
updated: 2026-10-23
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (2026-10-09: interval 2 min, revocation effective within a few minutes, list valid 6 h; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. ADR-0044 (ZK short-lived copies ≤ 24 h, implemented in packages 0.4.0). -->

Ýagdaý sanawy (status list) barlaýja resminamanyň ýatyrylandygyny ýa-da ýatyrylmandygyny resminamany beren guramadan hiç zat soramazdan bilmäge mümkinçilik berýär. Tamga Network-da her gurama IETF Token Status List formatynda uly we gol çekilen bit setirini çap edýär we her resminama bu setirde tötänleýin saýlanan orna salgylanýar. Barlaýjylar sanawlary doly görnüşde öňünden ýükleýär we gerek biti öz nusgalaryndan okaýar. Şonuň üçin gurama resminamanyň haçan, nirede we kime görkezilendigini hiç haçan bilip bilmeýär.

## Näme üçin ýatyrylyş barlagy yzarlaýyş kanalyna öwrülip biler?

Ýatyrylyşy barlamagyň ilkinji pikire gelýän ýoly guramadan soramakdyr. Barlaýjy resminamanyň seriýa belgisini gurama iberýär we "güýjünde" ýa-da "ýatyryldy" jogabyny alýar. Internetde sertifikatlar ýyllarboýy şu usul bilen barlandy. Emma bu usulyň adamlar üçin möhüm goşmaça täsiri bar. Her sorag gurama kimdir biriniň edil şol pursatda, belli bir tor salgysyndan şol adamyň resminamasyna seredýändigini aýdýar.

Diplom barada gürrüň edilende bu, uniwersitetiň her uçurymynyň haýsy iş berijilere ýüz tutandygyny görüp bilmegini aňladýar. Kagyz diplom uniwersitete şeýle maglumat bermeýärdi we sanly diplom hem bermeli däl. Tamga-nyň ýagdaý sanawy spesifikasiýasy muny ilkinji gizlinlik düzgüni hökmünde ýazýar. Barlaýjy sanawy barlag pursatynda ýükläp bilmez ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## Token Status List nähili işleýär?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) resminamany beren guramanyň gol çeken we kiçi sanlardan ybarat gysylan massiwidir. 2026-njy ýylyň oktýabryndan bäri her ýazgynyň näçe bit tutýandygy resminama görnüşine bagly (ADR-0048, paketler 0.6.0). Şahsyýet hyzmatynyň resminamalaryny togtadyp bolmaýandygy üçin bu resminamalaryň sanawlary bir bit ulanýar. Bu sanawlarda `0` güýjünde, `1` ýatyryldy diýmegi aňladýar. Guramalaryň sanawlary bolsa iki bit ulanýar. Bu sanawlarda `0` güýjünde, `1` hemişelik ýatyryldy, `2` togtadyldy we yzyna gaýtaryp bolýar diýmegi aňladýar. `3` bahasy ulanylmaýar we barlaýjy ony ýatyrylan hökmünde bahalandyrýar. `2` bahasy diňe shemasy togtatmaga rugsat berýän görnüşlerde, mysal üçin diplomda ulanylýar. Togtatmak uniwersitetiň derňew dowam edýärkä diplomy hemişelik ýatyrmagyň deregine garaşdyryp bilmegi üçin bar.

Her resminama sanawdaky ornuny görkezýän salgy göterýär. Bu salgyny saýlap açmak arkaly gizläp bolmaýar we ol her görkezişde resminama bilen bilelikde gidýär, sebäbi barlaýja ol gerek.

> **Bellik:** Aşakdaky mysal ýönekeýleşdirildi. Salgy we indeks oýlanyp tapylan bahalardyr. Hakyky formaty [ýagdaý sanawy spesifikasiýasynda](https://docs.tamga.network/specifications/status-list) tapyp bilersiňiz.

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

Barlaýjy `uri` salgysyndaky sanawy alýar we onuň goluny guramanyň [gol çekilen ynam sanawyndaky](/blog/how-trust-lists-work) ýazgysyna görä barlaýar. Soňra sanawyň heşini labyr žurnalyndaky ýazgy bilen deňeşdirýär, sanawy açýar we `idx` ornundaky ýazgyny okaýar. Sanawa resminamalara gol çekýän açardan aýry ýagdaý açary bilen gol çekilýär. Şonuň üçin ýagdaý açary ogurlansa, galp ýagdaý çap edip bolar, ýöne galp diplom döredip bolmaz.

## Süri gizlinligi näme we süri näçe uly?

Ýüklenen sanaw barlaýjynyň sanawdaky haýsy ýazgy bilen gyzyklanýandygy barada hiç zat aýtmaýar. Süri gizlinligi (herd privacy) diýilýän zat şudur. Resminamaňyz şol bir sanawdaky beýleki ähli resminamalaryň arasynda gizlenýär. Emma süri diňe ýeterlik uly bolsa we sanawdaky ornuňyz hiç hili göze ilmeýän bolsa işe ýaraýar. Tamga-nyň düzgünleri bu iki şerti hem üpjün etmek üçin ýazyldy:

![Ýagdaý sanawynyň resminamanyň kime degişlidigini açmagynyň öňüni alýan düzgünler](/blog/status-list-privacy/en/fig-suru.png)

- **Uly sanawlar.** Her sanawda azyndan 100 000 ýazgy üçin ýer bolýar we ýazgylaryň 80%-i dolanda täze sanaw açylýar. Ýazgylarynyň köpüsi nol bolan sanaw gysylanda bary-ýogy birnäçe ýüz baýt tutýar, ýagny sanawyň ululygy çykdajy döretmeýär.
- **Tötänleýin orunlar.** Indeks tutuş sanawdan tötänleýin saýlanýar we sanagyç ulanmaga rugsat berilmeýär. Indeksler yzygiderli berilse, 12-nji indeks şol ýylyň on ikinji uçurymy bolardy. Iki uçurymyň indeksleriniň arasyndaky tapawut hem, uçuryş senesi asla paýlaşylmasa-da, olaryň arasynda näçe wagt bolandygyny görkezerdi.
- **Manysyz salgylar.** Sanawyň salgysy tötänleýin setirden ybarat. `.../edu-2026` ýa-da `.../medicine` ýaly salgy adamyň aýratyn gizlän ýylyny ýa-da fakultetini her görkezişde açyp görkezerdi.
- **Diňe görnüşe görä bölmek.** Sanawlary resminama görnüşine görä aýyrmak bolýar, sebäbi görnüş eýýäm görünýär. Emma olary ýyla, fakultete ýa-da döwre görä bölüp bolmaýar, sebäbi "2026 sanawynda" bolmak hem öz-özünden maglumat berýär.

Bu düzgünler diňe kagyz ýüzünde galmaýar, açyk paketlerde hem ulanylýar. Resminama beriş kitaphanasy 100 000 ýazgydan kiçi sanawy kabul etmeýär, 80%-den artyk ýer bölüp bermeýär we her indeksi kriptografik tötänleýin san generatory bilen saýlaýar.

## Näme üçin barlaýjy sanawy öňünden ýükleýär?

Sanawy barlag pursatynda ýüklemek ýokarda düşündiren yzarlaýyş kanalymyzy açmak diýmekdir. Şonuň üçin Tamga barlaýjysy özüne gerek her ýagdaý sanawyny belli bir tertip boýunça täzeleýär we barlagy keşden geçirýär:

```ts title="@tamga-network/verifier bilen ýagdaý sanawlaryny öňünden almak"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // tertip boýunça, hiç haçan her barlagda däl
```

Barlaýjy paketinde barlag resminamanyň ýagdaýyny diňe şu keşden okaýar. Ýerleşdirilen barlaýjy Tamga Verify hem şeýle işleýär.

Her sanaw iki wagt çägini göterýär. `ttl` täzelik maksadydyr we nusgany täzelemezden näçe wagt ulanyp boljakdygyny görkezýär. `exp` bolsa berk çäkdir we şu pursatdan soň nusgany asla ulanyp bolmaýar. Keşdäki nusga barlaýjynyň syýasatyna görä gaty köne bolsa, netije hiç haçan "ýatyryldy" bolmaýar, "häzir barlap bolmady" (`INDETERMINATE`) bolýar. "Bu diplom ýatyryldy" bilen "häzir barlap bilemok" arasyndaky tapawut kimdir biriniň işe alnyp-alynmajagyny kesgitläp biler. Şonuň üçin iki netije dürli görkezilýär ([barlagyň muny nähili dolandyrýandygy](/blog/add-verification-to-your-site)).

## Hiç zat üýtgemedik bolsa näme üçin sanaw täzeden çap edilýär?

Gurama diňe resminamany ýatyranda çap edýän bolsa, çap edilişiň özi habara öwrülerdi. Mysal üçin, "Nusga Uniwersitetinde sagat 14:00 bilen 15:00 aralygynda ýatyrylyş boldy" diýen maglumat ýüze çykardy. Bu maglumat düzgün-nyzam kararynyň senesi ýaly daşyndan belli bolan maglumat bilen birleşende bir adamy görkezip biler.

Şonuň üçin her sanaw içinde üýtgeşme bolsa-da, bolmasa-da kesgitli aralyklarda täzeden çap edilýär. Daşyndan seredýän adam üçin her aralyk birmeňzeş görünýär, sebäbi her aralykda täze wersiýa çykýar. Bu aralyk 2 minut. Ýagdaý serweri işleýän wagty ýatyrylyş barlaýjylara birnäçe minudyň içinde ýetýär we çap edilen her sanaw 6 sagat güýjünde galýar ([ARF §5.4](https://arf.tamga.network/architecture)).

![Ýagdaý sanawynyň bir çap ediliş aýlawy](/blog/status-list-privacy/en/fig-dongu.png)

Aýlawdan daşary "gyssagly" çap edilişiň bolmazlygy bilkastlaýyn saýlawdyr, sebäbi aýlawdan daşary bir çap ediliş hem goragy hemmeler üçin bozardy. Bir zady derrew togtatmak gerek bolsa, mysal üçin gol açary ogurlanan bolsa, dogry gural ýagdaý sanawy däl. Bu ýagdaýda guramanyň ynam sanawyndaky sertifikaty togtadylýar.

Her çap ediliş ynam sanawyny çap edijiniň açyk labyr žurnalyna hem ýazylýar. Barlaýjy sanawyň heşini we wersiýa belgisini şu ýazgy bilen deňeşdirýär. Şeýlelikde gurama ýatyran resminamasyny sessiz-üýnsüz täzeden "güýjünde" ýagdaýyna gaýtaryp bilmeýär. Labyr žurnalynda sanaw belgileri, wersiýalar we heşler bolýar, ýöne sanawdaky hiç bir orun ýok.

## Nusgalar iki barlaýjynyň adamy gabat getirmeginiň öňüni nähili alýar?

Resminamanyň indeksi resminamanyň tutuş ömrüniň dowamynda üýtgemeýär. Adam şol bir resminamany iki barlaýja görkezse we bu iki barlaýjy elindäki maglumatlary deňeşdirse, şol bir `idx` we `uri` bahalary olara garşysyndakynyň şol bir adamdygyny aýdardy. Spesifikasiýa muny Token Status List-iň gurluşyndan gelýän çäk hökmünde aç-açan ýazýar.

Bu meseläniň çözgüdi resminamalary bukja görnüşinde bermekdir. Diplom hem goşulyp, her resminama 10 nusga görnüşinde berilýär we her nusganyň öz enjam açary we öz tötänleýin indeksi bolýar. Gapjyk şol bir barlaýja her gezek şol bir nusgany, dürli barlaýjylara bolsa dürli nusgalary görkezýär (WL5 düzgüni). Nusgalar bilen indeksleriň arasyndaky gabat gelme resminamany beren guramanyň maglumatlar binýadynda galýar we hiç haçan daşaryk çykmaýar (PR10). Resminama ýatyrylanda onuň ähli nusgalarynyň bitleri şol bir meýilleşdirilen çap edilişde, şol aralykda üýtgän beýleki ähli ýazgylar bilen bilelikde üýtgeýär.

Nol bilimli subutnama bilen geçirilýän görkeziş bir ädim öňe gidýär we hiç bir indeksi açmaýar. Munuň bahasy barlaýjynyň ýatyrylyş ýagdaýyny barlap bilmezligidir. Şonuň üçin nol bilimli subutnama diňe gysga ömürli nusgalar bilen hödürlenýär. Bu nusgalar iň köp 24 sagat güýjünde we resminama ýatyrylanda täzelenmeýär ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Paketleriň 0.4.0 wersiýasyndan bäri şeýle işleýär we gysga ömür ýatyrylyş barlagynyň ornuny tutýar. Şeýle nusga esaslanmaýan nol bilimli görkezişi barlaýjy diňe onuň syýasaty muňa aç-açan rugsat berse kabul edýär ([Tamga-da nol bilimli subutnamalar](/blog/zero-knowledge-in-tamga)).

## Kim näme görüp bilýär?

![Her tarapyň ýagdaý sanawyndan näme öwrenip bilýändigi we bilmeýändigi](/blog/status-list-privacy/en/fig-kim.png)

| Tarap | Görüp bilýär | Görüp bilmeýär |
|---|---|---|
| Resminama berýän gurama | özüniň edýän ýatyrmalaryny we togtatmalaryny | resminamanyň nirede, haçan we kime görkezilýändigini |
| Barlaýjy | özüne görkezilen nusganyň şu günki we soňky ýagdaýyny | şol bir resminamanyň beýleki nusgalaryny |
| Sanawy ýerleşdirýän tarap | barlaýjynyň sanawy täze saklaýandygyny | haýsy resminamanyň haçan barlanandygyny |
| Sanawy okaýan islendik adam | her aralykda çykýan täze wersiýany we wersiýalaryň arasynda üýtgän bitleri | bitiň kimiň resminamasyna degişlidigini |

Hiç bir Tamga hyzmaty IP salgylaryny ýazga almaýar. Hiç bir ýazgyda, žurnalda ýa-da netijede ýagdaý sanawyndaky orun ýok ([ARF §4.5](https://arf.tamga.network/architecture)).

## Bu gizlinlik nirede gutarýar?

Käbir çäkler spesifikasiýada kabul edilen çäkler hökmünde ýazylan we olary aç-açan aýtmak gerek.

- **Kiçi guramalaryň sürüsi hem kiçi.** 300 uçurymy bolan kollejiň resminamalary 100 000 ýazgyly sanawda dursa-da, süri 300 adamdan ybarat bolýar, sebäbi resminama eýýäm ony beren guramany görkezýär. Munuň tehniki çözgüdi ýok we spesifikasiýada kabul edilen çäk hökmünde ýazga alyndy.
- **Barlaýjy gören nusgasyny yzarlap biler.** Barlaýjy şol nusganyň indeksini bilýändigi üçin nusganyň soňra ýatyrylandygyny ýa-da ýatyrylmandygyny görüp biler. Ýagdaý sanawynyň maksady hem şu, ýöne bu hem maglumat hasaplanýar. Nusgalar bu maglumaty adamy eýýäm tanaýan bir barlaýjy bilen çäklendirýär.
- **Wagt maglumaty bulaşýar, ýöne doly pozulmaýar.** Kesgitli çap ediş aralygy ýatyrylyşyň takyk pursatyny şol aralygyň içinde gizleýär. Emma hakyky wakanyň senesini eýýäm bilýän we üýtgejek bite garaşýan adamdan ýatyrylyşy gizläp bilmeýär.
- **Ýerleşdirilen ýagdaý hyzmaty çap edýän ýatyrylyşlaryny görýär.** Gurama öz ýagdaý hyzmatyny işledip ýa-da toruň ýerleşdirilen resminama beriş hyzmatyny ulanyp biler. Ikinji ýagdaýda guramanyň ýatyrylyşlaryny operator çap edýär we şonuň üçin bu ýatyrylyşlary görýär. Spesifikasiýa muny hakyky merkezleşdiriliş nokady hökmünde atlandyrýar we dolandyryş düzgünlerine baglaýar.
- **Ynam ýakory häzir bir gol çekijä daýanýar.** Labyr žurnalyna bir wagtlaýyn operator gol çekýär. Bu çägi aýyrjak umumy kitap bolsa ikinji garaşsyz operatoryň goşulmagyna garaşýar ([Näme üçin blokçeýnsiz başlaýarys](/blog/why-no-blockchain-yet)).

## Köp berilýän soraglar

### Resminamamy görkezenimde gurama muny bilýärmi?

Ýok. Barlaýjylar ýagdaý sanawlaryny öňünden ýükleýär we barlagy öz nusgalaryndan geçirýär. Barlag pursatynda gurama hiç hili haýyş gitmeýär.

### Sanawa seredýän adam kimiň resminamasynyň ýatyrylandygyny bilip bilermi?

Iki wersiýanyň arasynda käbir orunlaryň üýtgändigini görüp biler. Emma bu orunlaryň kimiň resminamasyna degişlidigini bilip bilmez, sebäbi orunlar tötänleýin paýlanýar we gabat gelme resminamany beren guramada galýar.

### Ýatyrylyş näçe wagtda güýje girýär?

Bir çap ediş aralygynyň we barlaýjynyň sanawy täzeleýän wagtynyň dowamynda güýje girýär. Sanawlar 2 minutdan bir täzeden çap edilýändigi üçin ýagdaý serweri işleýärkä bu wagt birnäçe minutdan geçmeýär.

### Sanawy ýükläp bolmasa näme bolýar?

Barlaýjy elindäki iň soňky güýjündäki nusgany onuň möhleti gutarýança ulanýar. Bu möhlet nusga çap edilenden 6 sagat soň gutarýar. Ondan soň netije "ýatyryldy" bolmaýar, "häzir barlap bolmady" bolýar.

### Gyssagly ýagdaýda näme üçin derrew çap edilmeýär?

Aýlawdan daşary geçirilen çap ediliş bir zadyň bolandygyny açyp görkezerdi. Şonuň üçin gyssagly ýagdaýlarda munuň deregine guramanyň ynam sanawyndaky sertifikaty togtadylýar.

## Çeşmeler

- [IETF Token Status List (OAuth iş toparynyň taslamasy)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: ýagdaý sanawy spesifikasiýasy](https://docs.tamga.network/specifications/status-list) · [Ýatyrylyş we täzelik](https://docs.tamga.network/concepts/revocation) · [Gizlinlik](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: arhitektura (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP we Token Status List](/blog/haip-and-token-status-list) · [Ýatyrylyş](/learn/revocation) · [Baglanyşyksyzlyk](/learn/unlinkability)

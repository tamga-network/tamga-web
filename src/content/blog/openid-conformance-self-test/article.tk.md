---
title: "OpenID laýyklyk synaglaryndan geçende öwrenenlerimiz we açyk çeşmeli eden toplumymyz"
slug: openid-conformance-self-test
description: OpenID Foundation-yň issuer we verifier synag meýilnamalaryny (OpenID4VCI, OpenID4VP, HAIP, FAPI 2.0) sandbox-da işletdik, ýigrimä golaý tapyndyny düzetdik we toplumy çap etdik.
date: 2026-10-27
lang: tk
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, trusting-a-wallet, page:/sdk
---

<!-- Sources: same as the English article (OpenID self-test results ledger and module notes; issuer plan 63 modules, final run 2026-10-23: 0 FAILED, 2 WARNING, 4 REVIEW, 4 SKIPPED; round 2 29/22/5; verifier plan 14 modules, round 1: 0 FAILED, 6 REVIEW, 7 WARNING, 1 SKIPPED; round 2 logs: 7 PASSED, 6 REVIEW, 1 SKIPPED; tamga-network CHANGELOG 0.7.2 and 0.7.3; ADR-0059…0062; kit README, CONTRIBUTING, common-failures). -->

2026-njy ýylyň 21–27-nji oktýabry aralygynda OpenID Foundation-yň iki laýyklyk synag meýilnamasyny Tamga-nyň sandbox gurşawynda işletdik: şahsyýet hyzmatyna garşy **issuer** meýilnamasy (HAIP we FAPI 2.0 Security Profile bilen OpenID4VCI 1.0 Final, 63 modul) we Tamga Verify-a garşy **verifier** meýilnamasy (HAIP bilen OpenID4VP 1.0 Final, 14 modul). Issuer meýilnamasynyň soňky gaýtalamasynda şowsuz modul galmady, verifier meýilnamasynyň soňky tapgyrynda bolsa ne şowsuz modul, ne-de duýduryş bar. Oňa ýetmek üçin ýigrimä golaý kod üýtgeşmesi gerek boldy we olaryň her biri spesifikasiýanyň bir bendine daýanýar. Bizden soň şol synaglardan geçjek toparlar az kynçylyk çeksin diýip, öwrenenlerimizi [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) atly açyk çeşmeli toplumda (Apache-2.0) jemledik.

> **Möhüm:** Bu OpenID Foundation-yň öz synag guraly bilen geçirilen öz-synagdyr. OpenID sertifikaty däl; synag meýilnamalaryny gural içinde çap etmedik (sebäbi aşakda).

## ÝB bilen laýyk tor üçin laýyklyk synagy näme üçin möhüm?

Iki önüm OpenID4VP-ä harpma-harp eýerip, ýene-de biri-biri bilen düşünişip bilmezligi mümkin, sebäbi spesifikasiýa köp ýerde birnäçe saýlawa ýol berýär. Ýokary kepillikli özara işleşme profili [HAIP](/blog/haip-and-token-status-list) bir saýlaw toplumyny berkidip, bu boşluklaryň köpüsini ýapýar; Ýewropanyň sanly şahsyýet ulgamy hem oňa daýanýar. Tamga özüni ÝB bilen laýyk diýip tanyşdyrýar. Bu tassyklamany diňe öz synaglarymyz bilen barlasak, öz öý işimize özümiz baha beren bolarys.

Öz synaglarymyz we laýyklyk wektorlarymyz kody spesifikasiýalary biziň okaýşymyz boýunça barlaýar. OpenID Foundation-yň [conformance suite](https://gitlab.com/openid/conformance-suite) guraly bolsa başga biriniň okaýşy boýunça barlaýar: Gaznanyň taýýarlan, protokolyň beýleki tarapyny oýnaýan we üns bermeýän ulgamyň ýalňyşjak ýüzlerçe zadyny synap görýän açyk çeşmeli gural. Gaznanyň [sertifikatlaşdyryş maksatnamasynyň](https://openid.net/certification/) aňyrsynda hem şu gural durýar. Gural biziň bilen ylalaşmasa, ikimizden biri ýalňyşýar; haýsymyzdygyny tapmak işiň peýdaly bölegi.

## Nämäni, nämä garşy synadyk?

| | Issuer meýilnamasy | Verifier meýilnamasy |
|---|---|---|
| Meýilnama | `oid4vci-1_0-issuer-haip-test-plan` | `oid4vp-1final-verifier-haip-test-plan` |
| Spesifikasiýalar | OpenID4VCI 1.0 Final, HAIP 1.0, FAPI 2.0 Security Profile | OpenID4VP 1.0 Final, HAIP 1.0 |
| Biziň hyzmatymyz | şahsyýet hyzmaty, `id.sandbox.tamga.network` | Tamga Verify, `verify.sandbox.tamga.network` |
| Görnüş | SD-JWT VC, gapjygyň başlatýan rugsat kody akymy, müşderi tassyklamasy, DPoP | SD-JWT VC, `direct_post.jwt`, `x509_hash`, gol çekilen `request_uri` |
| Guralyň roly | gapjyk; öz gapjyk tassyklamasy we açar tassyklamasy bilen | gapjyk; öz synag açary bilen gol çekilen ýasama ÝB PID-ini (`urn:eudi:pid:1`) hödürleýär |
| Modul | 63: 23 OpenID4VCI we 40 FAPI 2.0 | 14 |

![Iki meýilnama: gural ikisinde-de gapjygy oýnaýar](/blog/openid-conformance-self-test/en/fig-plans.png)

Guralyň `demo.certification.openid.net` salgysyndaky ýerleşdirilen görnüşini ulandyk. Guralyň gol sertifikatlaryny diňe sandbox ynam sanawyna goşduk. Gapjyk tassyklamasynyň gol çekijisi ol ýerde synag gapjyk üpjün edijisi hökmünde, PID gol çekijisi bolsa aýratyn synag sanawynda durýar. Hakyky toruň sanawlary üýtgemedi.

Iki amaly saýlaw meýilnamalary kesgitledi. Issuer meýilnamasy guramanyň issuer hyzmatyna däl-de, şahsyýet hyzmatyna garşy işledildi, sebäbi guramanyň rugsat ädimi adamdan ilki şahsyýet resminamasyny görkezmegi talap edýär we gural muny edip bilmeýär. Mundan başga-da, guralyň öz tassyklamalarynda syýasatymyzyň talap edýän iki meýdany ýok: gapjyk tassyklamasyndaky ýatyrylyş ýazgysy we açar tassyklamasyndaky açaryň saklanyş ýagdaýy. Şonuň üçin sandbox bu meýdanlary hökmany däl diýip hasaplaýar, hakyky torda bolsa ikisi-de hökmany bolmagynda galýar.

## Netijeler nähili boldy?

Issuer meýilnamasy 21–23-nji oktýabr aralygynda üç tapgyr we bir gaýtadan işledilişde tamamlandy. Birinji tapgyrda 63 modulyň 42-si işledildi we ýalňyşlaryň köpüsi şu tapgyrda ýüze çykdy. Ikinji tapgyrda 63 modulyň hemmesi işledildi: 29-sy geçdi, 22-si duýduryş berdi, 5-si şowsuz boldy. Üçünji tapgyr we soňky gaýtalama galan meseleleri ýapdy.

| Meýilnama | Tapgyr | Geçdi | Duýduryş | Şowsuz | Gözden geçirme | Geçirildi |
|---|---|---|---|---|---|---|
| Issuer (63) | soňky gaýtalama, 23-nji oktýabr | 53 | 2 | 0 | 4 | 4 |
| Verifier (14) | 1-nji tapgyr, 27-nji oktýabr | 0 | 7 | 0 | 6 | 1 |
| Verifier (14) | 2-nji tapgyr, 27-nji oktýabr | 7 | 0 | 0 | 6 | 1 |

Verifier-iň birinji tapgyrynda "duýduryş" alan ýedi modul aslynda esasy barlagdan geçipdi, sebäbi Tamga bozuk hödürlemäni ret edipdi. Ýedisinde-de şol bir duýduryş bardy we ony şol gün düzetdik.

"Geçdi" bolmadyk her setiriň sebäbi bar:

- **Iki duýduryş (issuer metamaglumaty, ýönekeý we gol çekilen).** Metamaglumatymyzda ETSI TS 119 472-3-iň kesgitleýän we ÝB ARF-iniň ulanýan toplumlaýyn bermek we gaýtadan ulanmak syýasaty `credential_reuse_policy` bar. Guralyň shemasy `credential_metadata` içinde goşmaça meýdanlara rugsat bermeýär. Şonuň üçin bir kanuny giňeltme shemanyň tutuş bir şahasyny ýykýar we gural soňra standart meýdanlary (`scope`, `proof_types_supported` we beýlekiler) näbelli diýip habar berýär. Rugsat sanawy giňeltmäniň adyny ümsüm edip bilýär, bu zynjyry bolsa ýok. Meýdan ÝB standarty, şonuň üçin galýar. Meseläni gaýtalap görkezmek ädimleri we iki mümkin çözgüt bilen bilelikde guralyň toparyna habar berdik.
- **Gözden geçirme.** Käbir ýaramaz synaglar "ekran suratyny ýükläň" bilen gutarýar, sebäbi gural serwerimiziň adama görkezýän ýalňyşlyk sahypasyny görüp bilmeýär we bu sahypany adam tassyklamaly. Verifier meýilnamasynda Tamga Verify-yň hödürlemäni kabul eden ýa-da netije sahypasynda ret eden (nädogry resminama görnüşi, ýatyrylan resminama) her ýagdaýy şol sebäpden gözden geçirme bilen gutarýar. Barlaýjynyň jogaby gönüden-göni HTTP 400 bilen ret eden ýagdaýlary öz-özünden geçýär.
- **Geçirildi.** Üç issuer moduly şifrlenen resminama jogabyny synaýar. HAIP muny hökmany etmeýär we metamaglumatymyz bu saýlawy hödürlemeýär. Biri täzeleme tokenini synaýar; şahsyýet hyzmatymyz täzeleme tokenini diňe gysga ömürli nol bilim nusgalary üçin berýär ([ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)). Guralyň haýyşy şol scope-y soramaýandygy üçin token berilmeýär we modul geçirilýär. Verifier meýilnamasynda `request_uri_method=post` saýlawyny hödürlemeýändigimiz üçin ol modul geçirilýär.

## Synaglar näme tapdy, biz nämäni üýtgetdik?

Aşakda ýigrimä golaý üýtgeşmäni mowzuk boýunça topardyk. Her biri ony talap edýän bendi görkezýär, ýaýyň içindäki şert atlary bolsa guralyň žurnallarynda görünýän atlardyr.

![Mowzuk boýunça düzedenlerimiz](/blog/openid-conformance-self-test/en/fig-fixes.png)

### Metamaglumat we görkeziliş

- **Müşderi tassyklamasynyň algoritmleri.** Rugsat serweriniň metamaglumaty `attest_jwt_client_auth` hödürleýärdi, emma `client_attestation_signing_alg_values_supported` we `client_attestation_pop_signing_alg_values_supported` sanawlaryny bermeýärdi (attestation-based client authentication §10.1). Indi ikisi-de `["ES256"]`.
- **Final wersiýanyň görnüşleri.** Her resminama konfigurasiýasynda henizem ýokary derejede `display` bardy we görkeziliş obýektleri `lang` ulanýardy. OpenID4VCI 1.0 Final (§12.2.4) görkezilişi `credential_metadata.display` astynda goýýar we meýdany `locale` diýip atlandyrýar. Muny diňe issuer metamaglumatynda düzetdik; SD-JWT VC görnüş metamaglumaty `lang`-y saklaýar, sebäbi öz spesifikasiýasynyň sözi şol.
- **Dil bellikleri.** Täze barlag dil belliklerini tassyklaýar. Biziňkiler dogrydy, ýöne sanawdaky `EN-us` ýaly bahany ýa-da gaýtalanýan dili saklaýan hiç zat ýokdy. Görkeziliş bahalary indi kanoniki BCP 47 bellikleri, her dil üçin bir ýazgy (paketler 0.7.3).

### Nusgalary baglanyşdyryp biljek wagt meýdanlary

- **Tegelenen `iat` we `exp`.** Resminamalar berlen pursadyny sekunda çenli göterýärdi; toplumyň on nusgasy ýa-da bir adama berlen iki resminama wagt arkaly baglanyşdyrylyp bilinýärdi (RFC 9901 §10.1). Beriliş we möhlet wagtlary indi sagada çenli aşak tegelenýär, mdoc möhlet meýdanlary hem olar bilen bilelikde.
- Iki täze toplum barlagy, umumy sanawda tapawutly we çaklap bolmaýan ýagdaý indeksleri, eýýäm geçýärdi; olar üçin regressiýa synaglaryny goşduk.

### DPoP, PAR we rugsat serweri

DPoP elýeterlilik tokenini müşderiniň elindäki açara baglaýan usuldyr. PAR (pushed authorization request) bolsa rugsat haýyşynyň parametrlerini brauzerden geçirmezden göni serwere iberýär.

- **PAR-da DPoP.** Pushed authorization request DPoP subutnamasyny `dpop_jkt` bilen deňeşdirmezden kabul edýärdi, token endpoint-i bolsa PAR-dakydan tapawutly DPoP açaryny kabul edýärdi (RFC 9449 §10). Subutnama indi PAR-da barlanýar, kod şol açara baglanýar, token endpoint-inde başga açar `invalid_grant` alýar.
- **`htu` kadalaşdyrmasy.** `htu`-synda host ady baş harp bilen ýa-da aç-açan `:443` bilen gelen DPoP subutnamasy ret edilýärdi; RFC 9449 §4.3 ilki RFC 3986 kadalaşdyrmasyny talap edýär. Shema we host indi harp ululygyna garamazdan deňeşdirilýär, adaty port aýrylýar.
- **Synagdan öň ýapanlarymyz.** Birinji tapgyrdan öň henüz işledilmedik FAPI 2.0 modullaryny okadyk we tapjak zatlaryny öňünden ýapdyk: PAR POST däl usullara 405 gaýtarýar (RFC 9126 §2.3); gaýtalanýan parametrler we PAR içindäki `request_uri` `invalid_request` alýar; diňe `response_type=code` kabul edilýär; `plain` PKCE ret edilýär; tassyklanan müşderiden tapawutly `client_id` `invalid_client` alýar; kod berlenden soň `request_uri` gaýtadan ulanylyp bilinmeýär (RFC 9126 §4). Bu modullaryň hemmesi ilkinji işledilişde geçdi.

### TLS

- **Şifr toplumlary.** TLS 1.2 henizem CBC/SHA-1 toplumyny kabul edýärdi. FAPI 2.0 (§5.2.2, BCP 195 bilen) diňe maslahat berilýän toplumlara rugsat berýär; serwer indi diňe ECDHE bilen AES-GCM hödürleýär.

### Tokenler

- **Access token-iň gaýtadan ulanylmagy.** Access token-lerimiz bir gezeklikdi. FAPI synaglarynyň adaty ssenarisi bolsa şol bir token bilen birnäçe resminama haýyşyny iberýär we şonuň üçin şowsuz boldy. Spesifikasiýalar gaýtadan ulanmaga rugsat berýändigi üçin düzgüni [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests) bilen üýtgetdik. Token indi öz ömri (iň köp bäş minut) dowamynda birnäçe haýyşda ulanylyp bilner, ýöne diňe öz içine alýan konfigurasiýalary üçin, jemi iň köp on nusga we her gezek şol bir DPoP açary bilen.
- **Kodyň gaýtadan ulanylmagy.** Rugsat kody ikinji gezek ulanylanda, ilkinji ulanylyşdan berlen tokenler indi işlemeýär (RFC 6749 §4.1.2, RFC 9700 §4.5).
- **Täzeleme tokeniniň baglanyşygy.** Täzeleme tokenlerini DPoP açaryna baglaýardyk; gural täze DPoP açary we şol bir müşderi bilen täzeleýär. RFC 9449 §5 we attestation-based client authentication §10.3 täzeleme tokenini müşderiniň nusgasyna baglaýar. [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding) ony gapjyk tassyklamasyndaky nusga açaryna baglaýar, şeýlelikde DPoP açary üýtgese-de token işlemegini dowam etdirýär.
- **Ilkinji resminamadan öň täzeleme.** Gural token jogabyndan derrew soň, resminama soramazdan täzeleýär; täzeleme tokeniniň görkezýän ýazgysy heniz döremänligi üçin muny ret edýärdik. RFC 6749 §6 täzeleme tokeniniň berlen pursadyndan ulanylmagyna rugsat berýär; indi ulanylyp bilinýär.

### Ýalňyşlyk kodlary we sözbaşylar

- Näbelli `credential_identifier` umumy `invalid_credential_request` ýerine `unknown_credential_identifier` gaýtarýar (OpenID4VCI §8.3.1.2).
- `code_verifier`-siz token haýyşy `invalid_grant` gaýtarýar we kod ýanýar (RFC 7636 §4.6).
- Token endpoint-iniň ýalňyşlyklar bilen bilelikde her jogabynda `Cache-Control: no-store` bar (RFC 6749 §5.1).
- Resminama endpoint-inden gelýän 401 ýalňyşlygy we kabul edilýän algoritmi aýdýan `WWW-Authenticate: DPoP` sözbaşysyny göterýär (RFC 9449 §7.1). Bu bent issuer tapgyrlaryndan soň geçiren protokol gözden geçirişimizden geldi.
- Başga müşderiniň `request_uri`-sini açan adam çig JSON ýerine HTML ýalňyşlyk sahypasyny görýär.

### Resminama jogabynyň görnüşi

- Resminama jogabymyz her saýt üçin aýratyn lakam döretmekde ulanylýan tohumy goşmaça meýdan hökmünde göterýärdi. Gural resminama jogaplaryndaky näbelli meýdanlary belleýär. Spesifikasiýada giňeltmäni gadagan edýän zat ýokdugy üçin bu çözgüt bize bagly meseledi, ýöne has arassa, standart ýol bardy. [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration) tohumy öz resminama konfigurasiýasy edýär; ikinji standart resminama haýyşy bilen alynýar. Tohumy gurşap alýan gizlinlik düzgünleri üýtgemedi.

### Barlaýjy

- **Haýyşdaky `purpose`.** Gol çekilen haýyş obýekti OpenID4VP 1.0-yň (§5.1) kesgitlemeýän `purpose` parametrini göterýärdi (`CheckForUnexpectedParametersInVpAuthorizationRequest`). Bu parametri aýyrdyk. Gapjygyň görkezýän maksady eýýäm `verifier_info` içindäki hasaba alyş sertifikatyndan (ETSI TS 119 475) we ynam sanawyndaky hasaba alnan ulanyşdan gelýärdi.
- **`direct_post` jogaby.** Kabul edilen hödürlemeden soň jogap endpoint-i `redirect_uri` bilen bilelikde `show_url`-y hem gaýtarýardy (`ValidateDirectPostResponse`, OpenID4VP §8.2). Indi diňe `redirect_uri` gaýtarýar; ýüzbe-ýüz barlag görnüşiniň açary şu salgynyň içinde.
- **Barlag wagtynda alynýan ýagdaý sanawlary.** Tamga barlaýjylary ýagdaý sanawlaryny öňünden ýükleýär we keşden barlaýar; şeýlelikde gurama resminamanyň haçan barlanandygyny bilmeýär. Gural her synagda täze sanaw salgysyny berýär we barlaýjynyň ony alandygyny barlaýar. Şonuň üçin barlag wagtynda ýetmeýän sanawy almaga mümkinçilik berýän saýlaw goşduk. Saýlaw adaty ýagdaýda öçük we diňe aç-açan açylanda işleýär; sanaw hem diňe guramanyň yglan eden ýagdaý hostundan, şol bir tor barlaglaryndan geçip alynýar. Bu saýlaw diňe sandbox-yň öz-synag syýasatynda açyk. Şol iş hakyky boşlugy hem ýapdy, sebäbi daşary guramanyň ýagdaý sanawynyň salgysy indi ilkinji görlen pursady öwrenilýär we bu hakyky ÝB PID-leriniň barlagyna hem kömek edýär.
- **Haýyş obýektiniň meýdanlary.** Haýyş obýektiniň esasy bölegi indi sözbaşy bilen bir hatarda `aud` we `iat` hem göterýär.
- HAIP boýunça täze barlag jogap şifrleme açaryny gaýtadan ulanýan barlaýjyny ýykýar. Biziňki eýýäm her haýyşda täze açar döredýär, şonda-da munuň üçin regressiýa synaglaryny goşduk.

### Koddan daşarda: sazlama we synag ädimleri

Käbir tapyndylar biziňkidi, ýöne kodda däldi. Ýerleşdiriş wagtynda täzeden başlan hyzmat üç modula 502 gaýtardy, şonuň üçin synaglar dowam edýärkä ýerleşdiriş geçirilmeli däl. Ikinji müşderiniň yzyna gaýtaryş salgysynda sorag setiri bar we sandbox-yň rugsat sanawy ony saklamaýardy. Birnäçe modul bolsa synag edýänden belli bir ädimi takyk ýerine ýetirmegi talap edýär. Ret synagynda Tassyklamak ýerine Ýatyrmak düwmesine basmak, `request_uri` gaýtadan ulanyş synagynda ilkinji açylyşda hiç zat etmezlik, on minutlyk möhletiň gutarmagyna garaşmak, dogry ekran suratyny ýüklemek we bir alias bilen bir wagtda diňe bir synag işletmek şolaryň käbiridir. Olaryň her biri bize bir gezek gaýtadan işletmäge düşdi.

## Nämäni düzetmelidigini nädip çözdük?

Başdan ahyra çenli bir düzgüne eýerdik. Kody diňe spesifikasiýanyň bir bendi talap edende üýtgetdik, synag guralynyň özüne mahsus garaşmalary üçin üýtgetmedik we bilkastlaýyn galdyran her tapawudymyzy ýazga geçirdik. Koda degmezden öň her tapyndyny aşakdaky klaslaryň birine goýduk.

| Klas | Manysy | Näme etdik |
|---|---|---|
| ýalňyşlyk | spesifikasiýadaky ýa-da profildäki MUST başgaça aýdýar | düzetdik, regressiýa synagy bilen |
| maslahat berilýän | SHOULD ýa-da gizlinlik ýa-da howpsuzlyk maslahaty | ýazmaça sebäp ýok bolsa düzetdik |
| sazlama | guralyň sazlamasy, synag gurşawy ýa-da synag edýäniň ädimi | sazlamany ýa-da tertibi düzetdik |
| garaşylýan | goldamaýan görnüşimiz ýa-da resminamalaşdyrylan giňeltme | bolşy ýaly goýduk we ýazga aldyk |
| karar | spesifikasiýa rugsat berýär, ýöne gural başga ýola garaşýar | taslama ýolbaşçylygy ADR bilen karar berdi |
| gural çägi | gural hiç bir spesifikasiýanyň talap etmeýän zadyny barlaýar | dogry kody sakladyk, meseläni guralyň toparyna habar berdik |

![Toparlamak: žurnal setirinden düzedişe](/blog/openid-conformance-self-test/en/fig-triage.png)

Dört tapyndy ýapylan kararlara degýärdi, şonuň üçin ilki ADR-lerden geçdi (0059–0062) we taslama ýolbaşçylygy olaryň her birini kod üýtgemezden öň tassyklady. Bir giňeltmäni (`credential_reuse_policy`) bilkastlaýyn sakladyk, beýlekisini bolsa arassa standart görnüş bolanlygy üçin şol görnüşe geçirdik. Arassa netije üçin ÝB-niň kesgitlän meýdanyny aýryp bilerdik, ýöne onda synagdan geçýän, emma standarta has az laýyk gelýän hyzmatymyz bolardy.

## Öz-synag nämäni görkezmeýär?

- **Sertifikat däl.** OpenID sertifikatlaşdyryşy Gazna bilen alnyp barylýan aýratyn işdir; biziň üçin hem aýratyn karar.
- **Meýilnamalary çap etmedik.** Guralda meýilnamany çap etmek onuň netijelerini hemmä açýar, meýilnamanyň sazlamasynda bolsa gurala beren synag gizlin açarlarymyz (tassyklama gol çekijisi, ýasama PID-iň gol açary) bar. Eksport edilen žurnallary we ekran suratlaryny özümizde saklaýarys.
- **Sandbox-y, iki hyzmaty we olaryň her biriniň bir görnüşini öz içine alýar.** Gapjyk meýilnamalary enjam üçin aýratyn gurluşy talap edýänligi üçin işledilmedi. Barlaýjynyň mdoc görnüşi işledilmedi. Guramanyň issuer hyzmaty bu meýilnama bilen synalmady.
- **Käbir düzedişler heniz npm-de däl.** npm-däki paketler 0.7.2; 27-nji oktýabrdaky iki barlaýjy düzedişi we dil belligi üýtgeşmesi 0.7.3-de we sandbox-da işleýär.
- **Diňe protokoly synaýar.** Gural habarlaryň dogry görnüşdedigini we talap edilýän barlaglaryň geçirilýändigini synaýar. Guramanyň diplom bermäge ygtyýarlydygy ýa-da däldigi ynam sanawynyň işi, hukuk taýdan ykrar edilmek bolsa hukugyň işi.

## Toplumda näme bar?

Toplum ilkinji doly synag tapgyrynyň öwredenlerini islendik OpenID4VCI issuer ýa-da OpenID4VP verifier üçin ýazylan görnüşde jemleýär. Toplumda hiç bir önüm ýa-da host ady ýok, mysallarda bolsa `example.com` ulanylýar.

| Bölek | Näme edýär |
|---|---|
| Iş akymy | meýilnama we görnüşler, sazlama, işlediliş tertibi, brauzer ädimleri we gözden geçirme suratlary, žurnallar, tapyndylary toparlamak, düzetmek, gaýtadan işletmek |
| Issuer meýilnamasy boýunça salgylanma | her OpenID4VCI moduly: nämäni barlaýar, spesifikasiýa bendi, adaty ýalňyşlyk, düzediş |
| FAPI 2.0 salgylanmasy | issuer meýilnamasynyň içinde işleýän 40 FAPI 2.0 Security Profile moduly |
| Verifier meýilnamasy boýunça salgylanma | her modul we 400 bilen 200 jogaplarynyň geçdi we gözden geçirmä nähili gabat gelýändigi |
| Ýygy ýalňyşlyklar | alamat → şert → sebäp → düzediş, her tapyndynyň klasy bilen |
| Sazlama nusgalary | iki meýilnama üçin açarlary aýrylan suite JSON, meýdanma-meýdan |
| Synag PKI | synag köki, tassyklama gol çekijisi we ýasama PID açarlary üçin openssl resepti |
| Deslapky barlag sanawy | ilkinji işledilişden öň kodda seredilmeli zatlar |
| Žurnal jemleýji | modul boýunça netije we her şowsuz, duýduryş we gözden geçirme setiri; açarsyz we hasap maglumatsyz |

Toplum emeli aň kodlaşdyryş kömekçisi üçin goşmaça hökmünde gaplandy; gurnamak buýruklary [README](https://github.com/tamga-network/oidf-conformance-kit#install) faýlynda. Içindäki zatlaryň hemmesi ýönekeý Markdown we diňe standart kitaphanany ulanýan Python skripti, şonuň üçin kömekçisiz hem işleýär:

```bash title="Salgylanmalary we žurnal jemleýjini göni ulanmak"
git clone https://github.com/tamga-network/oidf-conformance-kit
cd oidf-conformance-kit
# meýilnamaňyzyň žurnallaryny guraldan eksport ediň, soňra:
python scripts/oidf-log-summary.py ./logs --latest
python scripts/oidf-log-summary.py ./logs --latest --format markdown --redact -o summary.md
```

> **Bellik:** Laýyklyk žurnallary gurala beren gizlin açarlaryňyzy we eksport edijiniň hasabyny öz içine alýar. Žurnallary we doldurylan sazlamalary wersiýa gözegçiligine goýmaň. Jemleýji diňe rugsat berlen meýdanlary ýazýar; `--redact` host atlaryňyzy hem gizleýär.

## Nädip goşant goşup bilersiňiz?

Gural çalt üýtgeýär. Täze modullar goşulýar, käbiriniň ady üýtgeýär, käbirleri bolsa täze bir zady barlap başlaýar. Toplumdaky modul atlaryny guralyň 2026-njy ýylyň 26-njy oktýabryndaky esasy şahasy bilen deňeşdirdik, ýöne bu maglumatlar wagtyň geçmegi bilen köneler. Iň köp kömek edýän üç goşant:

- goşulan ýa-da üýtgän modul ýa-da şert, barlan gural commit-iňiz bilen;
- duş gelen we düzeden ýalňyşlygyňyz: şert ady, sebäp, düzediş we ony talap edýän bent;
- gural çägi: hiç bir spesifikasiýanyň bu hereketi näme üçin talap etmeýändigi we guralyň mesele ýazgysyna salgy.

Toplumdaky her düzediş spesifikasiýa salgylanmaly, ýeke-täk çeşmesi gural bolan tapyndy bolsa çäk hökmünde girýär. Gapjyk meýilnamalary heniz öz içine alynmaýar; iň uly boşluk şol. Issue we pull request-ler [github.com/tamga-network/oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) salgysynda garşylanýar.

## Ýygy berilýän soraglar

### Tamga OpenID sertifikatly mi?

Ýok. Gaznanyň synag guralyny sandbox-da özümiz işletdik. Sertifikatlaşdyryş aýratyn iş we oňa ýüz tutulmady.

### Näme üçin käbir modullar "geçdi" däl-de, "gözden geçirme" bilen gutarýar?

Sebäbi gural adama görkezilýän sahypany görüp bilmeýär. Barlaýjymyz netijäni öz sahypasynda görkezende ýa-da serwerimiz ýalňyşlyk sahypasyny görkezende gural ekran suratyny soraýar we adam tassyklaýar. Bu modullaryň adaty soňy şeýle.

### Diňe guraly razy etmek üçin kody üýtgetdiňizmi?

Ýok. Her kod üýtgeşmesi spesifikasiýa ýa-da profil bendine daýanýar. Guralyň hiç bir spesifikasiýanyň talap etmeýän zadyna garaşan ýerinde kodumyzy sakladyk we tapawudy ýazga aldyk.

### Toplumy Tamga bilen baglanyşygy bolmadyk issuer ýa-da verifier üçin ulanyp bilerinmi?

Hawa. Salgylanmalar umumy; žurnal jemleýji bu iki meýilnamanyň eksport edilen islendik žurnalynda işleýär.

## Çeşmeler

- [OpenID for Verifiable Credential Issuance 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [FAPI 2.0 Security Profile](https://openid.net/specs/fapi-security-profile-2_0-final.html)
- [OpenID Foundation conformance suite](https://gitlab.com/openid/conformance-suite) we [sertifikatlaşdyryş](https://openid.net/certification/)
- [OAuth 2.0 Attestation-Based Client Authentication](https://datatracker.ietf.org/doc/draft-ietf-oauth-attestation-based-client-auth/)
- [RFC 9449 (DPoP)](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9126 (PAR)](https://www.rfc-editor.org/rfc/rfc9126), [RFC 6749 (OAuth 2.0)](https://www.rfc-editor.org/rfc/rfc6749), [RFC 9700 (OAuth security BCP)](https://www.rfc-editor.org/rfc/rfc9700), [RFC 9901 (SD-JWT)](https://www.rfc-editor.org/rfc/rfc9901)
- [ADR-0059](https://docs.tamga.network/adr/0059-access-token-multiple-credential-requests), [ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding), [ADR-0061](https://docs.tamga.network/adr/0061-pseudonym-seed-separate-configuration), [ADR-0062](https://docs.tamga.network/adr/0062-zk-copy-refresh-scope)
- [Tamga OpenID4VP profili](https://docs.tamga.network/specifications/openid4vp) we [OpenID4VCI profili](https://docs.tamga.network/specifications/openid4vci)
- [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) (Apache-2.0)

---
title: "HAIP we Token Status List: yzarlamazdan ýokary ynamlylyk"
slug: haip-and-token-status-list
description: HAIP 1.0-yň näme kesgitleýändigini we Tamga-nyň ony nähili ulanýandygyny, Token Status List-iň bolsa resminamany beriji edara onuň nirede ulanylýandygyny aýtmazdan nähili ýatyrýandygyny düşündirýäris.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Sources: HAIP 1.0 Final (24 Dec 2025) §3–8 (flows, FAPI2/PKCE/PAR, DPoP + DPoP-Nonce, scope, signed metadata, wallet attestation shared sub, key attestations, x509_hash, DCQL, ECDH-ES P-256, A128GCM+A256GCM, ephemeral keys, aki, JAR request_uri, direct_post.jwt, same-device rules, dc_api.jwt, mso_mdoc / dc+sd-jwt, x5c without trust anchor, status_list, unique unpredictable index, KB-JWT always, ES256 / -7 -9, SHA-256). ADR-0034 (K1–K5, CI1–CI6, renewal order). draft-ietf-oauth-status-list-21 (21 Jun 2026; RFC Editor queue per datatracker 2026-10-08; title "Token Status List (TSL)"): §4 bit packing LSB-first, DEFLATE/ZLIB, bits 1/2/4/8, JWT claims sub/iat/exp/ttl/status_list, aggregation_uri, §7 status types (0x03 application specific), §12 herd privacy. SPEC-CRED-0003 v1.0.0 (cites draft-20): bits=2, 100,000 min, 80% fill, random idx, opaque URI, split by type only, 2-min fixed cadence, no emergency publish, exp = iat + 6 h, ttl 120 (2026-10-09: 1% noise rule removed), prefetch, aggregation recommended, separate status key, Ş1–Ş10, S1–S14, anchors.jsonl today. SPEC-API-0001 D1–D6, INDETERMINATE reasons, ZK NOT_APPLICABLE. ADR-0048 (bits per credential type, identity 1, institutions 2, suspension only where the schema allows; CWT form for mdoc; packages 0.6.0). ADR-0044 implemented in packages 0.4.0. Compression figures computed for this post with zlib level 9 (same call as @tamga-network/sd-jwt). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0 OpenID4VCI, OpenID4VP, SD-JWT VC we ISO mdoc-yň açyk goýan köp saýlawlaryndan ýokary ynamlylyk talap edilýän ulanyş üçin bir toplum kesgitleýär. Her tarapyň haýsy formatlary, algoritmleri, müşderi belgilerini, şifrleme usullaryny we tassyklamalary goldamalydygy şu toplumda ýazylan. **Token Status List** bolsa bu toplumyň daýanýan ýatyryş usulydyr. Her resminama uly, gol çekilen we gysylan bit sanawyndaky bir orna salgylanýar we barlaýjylar bu sanawy öňünden ýükleýär. Şonuň üçin resminamany barlamak ony beren edara resminamanyň nirede we haçan görkezilendigini hiç haçan aýtmaýar.

HAIP 1.0 2025-nji ýylyň 24-nji dekabrynda Final boldy. Token Status List taslamasy 21-nji wersiýasyna ýetdi (2026-njy ýylyň 21-nji iýuny). Taslamanyň ady indi "Token Status List (TSL)" we tekst RFC Editor nobatynda garaşýar.

## HAIP esasy spesifikasiýalaryň açyk goýan nämesini kesgitleýär?

OpenID4VP-a harpma-harp eýerýän iki önüm hem biri-biri bilen düşünişip bilmezligi mümkin. Mysal üçin, biri haýyşlara `x509_san_dns` bilen gol çekýän bolsa, beýlekisi diňe DID kabul edip biler, ýa-da biri jogaby şifrleýän bolsa, beýlekisi şifrlemezligi mümkin. HAIP bu boşluklary üç akym we iki format üçin ýapýar. Akymlar resminama bermek, gönükdirme bilen görkezmek we brauzeriň Digital Credentials API-si bilen görkezmekdir. Esasy düzgünler şulardyr:

| Ugur | HAIP 1.0 talaby |
|---|---|
| Formatlar | IETF SD-JWT VC (`dc+sd-jwt`) ýa-da ISO mdoc (`mso_mdoc`); haýsysynyň gerekdigini ekoulgam kesgitleýär |
| Algoritmler | her kim azyndan ES256 (COSE -7 ýa-da -9) we SHA-256 goldaýar |
| Resminama bermek | FAPI 2.0 arkaly PKCE (S256) we PAR bilen ygtyýarlandyryş kody akymy; DPoP-a bagly tokenler; her resminama konfigurasiýasy üçin `scope`; resminama açara bagly bolsa `nonce_endpoint` |
| Gapjyga ynam | PAR we token nokatlarynda `sub` bahasy ähli gurnamalarda birmeňzeş bolan gapjyk tassyklamasy; açar tassyklamalary |
| Barlaýjynyň şahsyýeti | gol çekilen haýyşlar `x509_hash` müşderi belgisini ulanýar |
| Sorag | DCQL, `aki` görnüşli `trusted_authorities` hem goşulyp |
| Jogap | şifrlenen: P-256-da ECDH-ES; barlaýjy A128GCM-i hem, A256GCM-i hem sanawa goşýar; her haýyş üçin täze açar |
| Gönükdirme akymy | `request_uri` bilen JAR, `direct_post.jwt`, şol bir enjamda haýyşy başlan sessiýa yzyna dolanmak |
| Brauzer akymy | `dc_api.jwt` bilen Digital Credentials API |
| Başlykdaky açarlar | edaranyň gollary, gol çekilen metamaglumat we ýagdaý sanawy tokenleri üçin `x5c`; ynam ýakory goşulmaýar, öz-özüne gol çekilen sertifikat ulanylmaýar |
| SD-JWT VC | resminama enjama bagly bolsa KB-JWT hemişe bar; `status` meýdany `status_list` ulanýar |
| Ýagdaý | her resminamanyň özüne degişli, gaýtalanmaýan we çaklap bolmaýan orny bolýar |

Tamga-nyň profilleri bu düzgünleriň hemmesine eýerýär we birnäçe ýerde has hem öňe gidýär. Rugsat berilýän ýeke-täk gol algoritmi ES256 we her resminama enjama bagly bolany üçin KB-JWT hemişe talap edilýär. Protokolyň jikme-jikliklerini [OpenID4VCI](/blog/openid4vci-deep-dive) we [OpenID4VP we DCQL](/blog/openid4vp-dcql-deep-dive) ýazgylarynda düşündirdik.

![HAIP düzgünleri we Tamga-nyň saýlawlary](/blog/haip-and-token-status-list/en/fig-haip.png)

## Haýsy HAIP düzgünleri Tamga-nyň dizaýnyny üýtgetdi?

HAIP talaplaryny bir-birden öz düzgünlerimiz bilen deňeşdirenimizde, olaryň ikisiniň öň ýapylan kararlara degýändigini gördük. Şonuň üçin ikisi hem [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) bilen çözüldi we taslama ýolbaşçylygy bu ADR-i 2026-njy ýylyň 1-nji oktýabrynda tassyklady.

**Barlaýjynyň şahsyýeti indi `x509_hash`.** HAIP §5 bu barada aýdyň: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". ADR-den öň Tamga barlaýjylary `x509_san_dns:<domen>` ulanýardy we ynam sanawyndaky ýazgylar hem şu setir boýunça saklanýardy. Üýtgeşmeden soň düzgünler şeýle:

- barlaýjynyň `client_id` bahasy giriş sertifikatyndan hasaplanýar we hiç bir sazlama faýlyna elde ýazylmaýar;
- gapjyk diňe `x509_hash` kabul edýär we heş ýaprak sertifikata gabat gelmese haýyşy ret edýär; jogap salgysynyň sertifikatyň SAN meýdanyndaky domende bolmagyny hem talap etmegini dowam etdirýär;
- sertifikat her täzelenende heş üýtgeýändigi üçin her barlaýjy ýazgysy hemişelik `dns_name` göterýär; nusgalary aýyrmak, saýta mahsus lakamlar, geçiş kartlary we görkeziş žurnaly ýaly täzelemeden täsirlenmeli däl zatlaryň hemmesi şu ada baglanýar.

Munuň iş ýüzündäki netijesi ädimleriň belli bir tertipde ädilmelidigidir. Sertifikat täzelenende ilki täze sertifikat hasaba alyş çeşmesine girizilýär we ynam sanawy täzeden çap edilýär. Barlaýjy täze sertifikata diňe şondan soň geçýär. Ir geçse, gapjyklar tanamaýan `client_id`-ni görýär we haýyşy ret edýär.

**Gapjyk tassyklamasynyň subýekti umumy.** HAIP §4.4.1 boýunça tassyklamadaky `sub` "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation" we PAR-daky `client_id` hem şu bahadyr. Tordaky gapjyklaryň biri bolan Tamga Wallet-iň üpjün edijisi öň bu meýdana her amalda täzeden döredilýän açaryň barmak yzyny ýazýardy. Indi gapjyk önüminiň belgisini ýazýar. Gurnamalar ýene-de diňe her amalda täze döredilýän `cnf` açary we biri-birine baglanyşdyryp bolmaýan täze ýagdaý ýazgysy bilen tapawutlandyrylýar. Şeýlelikde edaranyň ýazga alýan maglumaty gapjyk önümini görkezýär we telefon barada hiç zat aýtmaýar.

## Token Status List ýagdaýy nähili kodlaýar?

Resminama sanawdaky ornuny görkezýän salgy göterýär, bitler bolsa sanawda bolýar:

```json title="Resminamanyň içinde (SD-JWT VC mazmuny ýa-da mdoc üçin MSO)"
"status": {
  "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
}
```

```json title="Ýönekeýleşdirilen mysal: Status List Token (başlyk we mazmun)"
{ "alg": "ES256", "typ": "statuslist+jwt", "kid": "sl-2026-a", "x5c": ["MIIB…"] }
{
  "iss": "https://issuer.tamga.network/example-university",
  "sub": "https://status.tamga.network/3f9a2c",
  "iat": 1791446400,
  "exp": 1791468000,
  "ttl": 120,
  "status_list": { "bits": 2, "lst": "eNrt…" }
}
```

`sub` bahasy resminamadaky `uri` bilen birmeňzeş bolmaly. Şol bir resminamanyň mdoc nusgasy şol bir `idx` bahasyny ulanýar, ýöne sanawyň CWT görnüşine (`application/statuslist+cwt`) salgylanýar we bu görnüş öz aýdyň däl salgysynda ýerleşýär. Iki görnüş hem şol bir bitleri göterýär we şol bir çap edilişde gol çekilýär ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). `lst` meýdany taslamanyň kesgitleýän üç ädimi bilen düzülýär. Ilki her resminama üçin `bits` sany bit baýt massiwine ýazylýar we her baýt **iň kiçi derejeli bitden** başlap doldurylýar. Soňra massiw ZLIB formatynda DEFLATE bilen gysylýar we netije base64url bilen kodlanýar.

Kiçijik bir mysal alalyň. Edaranyň 16 ýazgyly we `bits: 2` bolan sanawynda 1-nji indeks ýatyrylan, 2-nji indeks togtadylan we 6-njy indeks ýatyrylan bolsun:

```text title="2 bitlik ýagdaýlary gaplamak (bu ýazgy üçin hasaplandy)"
byte 0 = idx 3..0  → 00 10 01 00 → 0x24
byte 1 = idx 7..4  → 00 01 00 00 → 0x10
byte 2 = idx 11..8 → 0x00
byte 3 = idx 15..12 → 0x00

zlib(level 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` bolan sanawda `idx` indeksini okamak üçin `idx >> 2` belgili baýt alynýar we `(idx & 3) × 2` bit saga süýşürilýär. `idx` 48213 üçin bu 12053-nji baýtyň 2-nji we 3-nji bitlerine gabat gelýär. `bits: 1` bolan sanawda bolsa `idx >> 3` belgili baýtyň `idx & 7`-nji bitine seredilýär. Sanawyň ululygy hem kynçylyk döretmeýär. Tamga sanawynda azyndan 100 000 ýazgy bolýar we bu sanaw gysylmadyk ýagdaýda iki bit bilen 25 000 baýt, bir bit bilen 12 500 baýt tutýar. Bu ýazgy üçin geçiren synagymyzda zlib 9-njy derejede ähli ýazgylary güýjünde bolan sanawy 46 baýta, şol sanawyň 200 sany dargynyk ýatyrylyşly görnüşini bolsa 439 baýta gysdy.

![Resminamanyň ýagdaýyny dört ädimde okamak](/blog/haip-and-token-status-list/en/fig-bits.png)

## Tamga-da ýagdaý bahalary näme aňladýar?

| Baha | Taslamadaky ady | Tamga-da |
|---|---|---|
| `0x00` | VALID | güýjünde |
| `0x01` | INVALID | ýatyrylan, hemişelik |
| `0x02` | SUSPENDED | togtadylan, yzyna gaýtaryp bolýar; diňe shemasy rugsat berýän görnüşlerde |
| `0x03` | programma mahsus | ulanylmaýar; ýatyrylan hasaplanýar |

Taslama `bits` üçin 1, 2, 4 ýa-da 8 bahasyna rugsat berýär. Tamga bu bahany paketleriň 0.6.0 wersiýasyndan bäri resminama görnüşine görä kesgitleýär ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). Şahsyýet hyzmatynyň resminamalaryny ÝB-niň adamy tanadýan maglumatlar üçin goýan düzgünine laýyklykda togtadyp bolmaýar. Şonuň üçin bu resminamalaryň sanawlary bir bit ulanýar, ýagny resminama ýa güýjünde, ýa-da ýatyrylan we ýatyrylyş hemişelik. Edaralaryň sanawlary bolsa iki bit ulanýar, sebäbi togtatmagyň aýratyn baha mätäçligi bar. Diplom barada derňew başlan edara derňew dowam edýärkä diplomy wagtlaýyn togtatmak isläp biler. Edara sanawlarynda hem `0x02` diňe shemasy togtatmaga rugsat berýän görnüşler üçin ýazylýar (`suspension_allowed`, häzir diplom). Başga görnüşde togtatma bahasy görülse, sanaw bozuk hasaplanýar we ret edilýär. Dört ýa-da sekiz bit sanawy hiç hili peýda bermezden iki ýa-da dört esse ulaldardy. Barlaýjy `0x00`-dan başga her bahany ret hökmünde bahalandyrýar, ýöne "togtadylan" we "ýatyrylan" netijelerini ulanyja aýratynlykda görkezýär.

## Ýagdaý sanawy yzarlaýyş kanalyna öwrülmekden nähili gaçýar?

Ýagdaý sanawynyň gizlinligi märekeden gelýär. Sanawy ýükleýän barlaýjy onuň islendik ýazgysyny barlaýan bolup biler. Tamga-nyň düzgünleri bu märekäniň hakykatdan hem emele gelmegini üpjün edýär. Şol düzgünleriň adamyň nukdaýnazaryndan düşündirişini [Yzarlamasyz ýatyrylyş](/blog/status-list-privacy) ýazgysynda tapyp bilersiňiz.

- **Uly sanawlar.** Her sanawda azyndan 100 000 ýazgy bolýar we ýazgylaryň 80%-i paýlananda täze sanaw açylýar. Ulanylmaýan orunlar hem güýjündäki resminamalar bilen şol bir `0x00` bahasyny göterýändigi üçin daşyndan seredýän adam näçe ornuň ulanylýandygyny görüp bilmeýär.
- **Tötänleýin indeksler.** `idx` sanawyň sygymynyň içinden tötänleýin saýlanýar. Yzygiderli belgi, `awarding_date` gizlin galsa-da, hasaba alyş tertibini we takmynan senäni açyp görkezerdi. HAIP hem her resminamanyň özüne degişli, gaýtalanmaýan we çaklap bolmaýan ornunyň bolmagyny talap edýär.
- **Manysyz salgylar.** Sanawyň salgysy her görkezişde görünýändigi üçin ol hem maglumat meýdany hasaplanýar. `/sl/2026-engineering` ýaly salgy ýyly we fakulteti açyp görkezerdi. Şonuň üçin Tamga-da sanaw belgileri tötänleýin setirlerden ybarat we haýsy belginiň nämä gabat gelýändigini diňe edara bilýär.
- **Diňe görnüşe görä bölmek.** Täze sanaw öňki sanaw dolanda açylýar. Sanawlar hiç haçan ýyla ýa-da bölüme görä bölünmeýär.
- **Nusgalar indeksi paýlaşmaýar.** Bukjadaky on nusganyň her biriniň öz tötänleýin indeksi bar. Şonuň üçin iki barlaýjy görkezişleri `idx` arkaly biri-birine baglanyşdyryp bilmeýär.

Bu usulyň gurluşyndan gelýän bir çägi bar we biz ony açyk ýazýarys. Kiçi edarada märeke şol edaranyň öz beren resminamalarynyň sany ýalydyr, sebäbi `iss` meýdany edarany eýýäm ady bilen görkezýär.

Gizlinligiň beýleki ýarysy sanawyň haçan ýüklenýändigi bilen bagly. Barlaýjy sanawy her barlagda täzeden ýükläp alsa, edara şol pursat kimdir biriniň öz resminamalarynyň birini barlaýandygyny bilerdi. Haýyşyň gelen IP salgysy hem köplenç munuň kimdigini aýdardy. Şonuň üçin Tamga barlaýjylary sanawlary belli aralyklarda **öňünden ýükleýär** we barlagy keşden geçirýär. `@tamga-network/verifier` muny adaty ýagdaýda edýär we her barlagda ýüklemek diňe aç-açan işjeňleşdirilende işleýär. Taslamanyň islege bagly `aggregation_uri` meýdany edaranyň ähli ýagdaý sanawlaryny bir salgyda sanaýar. Öňünden ýüklemegi aňsatlaşdyrýandygy üçin Tamga bu meýdany ulanmagy maslahat berýär.

## Sanaw näçe ýygy çap edilýär we nusga näçe wagt güýjünde?

| Düzgün | Tamga bahasy | Näme üçin |
|---|---|---|
| Çap ediş aralygy | kesgitli, 2 minut; hiç zat üýtgemese-de saklanýar | diňe ýatyrylanda çap etmek "häzir ýatyrylyş boldy" diýen maglumaty açardy; gysga aralyk ýatyrylyşyň birnäçe minudyň içinde görünmegini üpjün edýär |
| Gyssagly çap ediş | edilmeýär | kesgitli ritmi bozardy; gyssagly ýagdaýlarda edaranyň sertifikaty togtadylýar ýa-da shema ýatyrylýar |
| `ttl` | 120 s (çap ediş aralygy) | barlaýjynyň elindäki nusgany täzeden ýüklemezden ulanyp bilýän wagty |
| `exp` | `iat` + 6 sagat | berk ýokarky çäk; ýagdaý serwerindäki gysga bökdençlik barlagy togtatmaz ýaly; salgylanma barlaýjy syýasatlaryndaky iň uly token ýaşyna deň |
| Keş başlyklary | `exp` we `ttl` bar bolanda hasaba alynmaýar | kesgitleýji tokeniň öz meýdanlarydyr |
| Gol açary | resminama açaryndan aýry, şol bir X.509 zynjyrynda | ýagdaý açary syzsa, galp ýagdaý çap edip bolar, ýöne galp diplom berip bolmaz |

Her çap ediliş ilki ýagdaý serwerine ýazylýar, soňra çap edilişiň heşi ýazga geçirilýär. Häzir bu ýazgy ynam sanawyny çap edijiniň ýakor žurnalynda saklanýar, kitaby (ledger) ulanmak bolsa soňky tapgyryň işi ([näme üçin entek blokçeýn ýok](/blog/why-no-blockchain-yet)). Barlaýjy tokeniň heşiniň ýazgydaky heş bilen gabat gelýändigini we wersiýa belgisiniň yza gitmeýändigini barlaýar. Şeýlelikde edara ýatyran resminamasyny güýjünde görkezmek üçin sanawyny sessiz-üýnsüz köne wersiýa gaýtaryp bilmeýär.

## Barlap bilmese barlaýjy nähili netijä gelýär?

Ýatyrylyş barlagy Tamga-nyň barlag tertibinde D1–D6 ädimleri bilen geçirilýär. Barlaýjy ilki `status.status_list` meýdanyny okaýar we tokeni öňünden ýüklenen keşden alýar. Tokeniň goluny ynam sanawynda şol edara üçin hasaba alnan ýagdaý açary bilen barlaýar. Soňra `sub` bahasyny, sanawyň täzeligini we ýazga alnan heşi barlaýar we iň soňunda bitleri okaýar. Sanawy ýükläp bolmadyk bolsa ýa-da `exp` möhleti geçen bolsa, netije **INDETERMINATE** bolýar we onuň ýanynda `STATUS_UNREACHABLE` ýa-da `STATUS_STALE` ýaly sebäp görkezilýär. "Bu diplom ýatyryldy" bilen "häzir barlap bilemok" adam barada dürli kararlara getirýär, şonuň üçin olar dürli görkezilmeli. Onlaýn bolmadyk wagty barlaýjy keşdäki token we iň soňky belli ýazgy bilen işi dowam etdirip biler. Bu ýagdaýda iň soňky sinhronlaşdyrmanyň wagtyny görkezýär we netijäni "onlaýn däl barlandy" diýip belleýär.

Nol bilimli ýaş subutnamalary indeksi bolmadyk ýeke-täk ýagdaýdyr. Subutnama sanawda orny kesgitläp biljek hiç bir maglumaty açmaýandygy üçin ýagdaý "degişli däl" diýip habar berilýär. Şonuň üçin nol bilimli subutnama diňe gysga ömürli nusgalar bilen hödürlenýär. Bu nusgalar iň köp 24 sagat güýjünde we resminama ýatyrylanda täzelenmeýär ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Paketleriň 0.4.0 wersiýasyndan bäri şeýle işleýär. Nusgalar ýagdaý sanawynda ýazgy göterenok, gapjyk olary adamdan soramazdan täzeleýär we olaryň gysga ömri ýatyrylyş barlagynyň ornuny tutýar. Şeýle nusga esaslanmaýan nol bilimli subutnamany barlaýjy diňe onuň syýasaty muňa aç-açan rugsat berse kabul edýär ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

## Köp berilýän soraglar

### HAIP kanunmy?

Ýok. HAIP OpenID Foundation-yň çap eden spesifikasiýasydyr. Ýewropanyň sanly şahsyýet ekoulgamy dürli öndürijileriň gapjyklary, edaralary we barlaýjylary bilelikde işläp bilsin diýip şu spesifikasiýa daýanýar.

### Näme üçin barlaýjy edaradan "bu resminama heniz güýjündemi" diýip soramaýar?

Maglumat edil şu soragyň özi bilen syzardy. Edara haýsy resminamanyň, haçan we köplenç kim tarapyndan barlanandygyny bilerdi. Ýagdaý sanawy ulanylanda barlaýjy her kesiň ýagdaýynyň nusgasyny elinde saklaýar we hiç kimden hiç zat soramaýar.

### Togtatma öz-özünden gutarýarmy?

Ýok. Togtadylan resminama edara bitleri täzeden güýjünde bahasyna gaýtarýança ýa-da resminamany ýatyrýança togtadylan bolup galýar. Barlaýjy diňe şol pursatdaky bahany okaýar.

### Barlaýjy on nusganyň şol bir adama degişlidigini bilip bilermi?

Ýagdaý sanawyna seredip bilip bilmez. Her nusganyň öz tötänleýin indeksi bar we nusgalaryň arasyndaky gabat gelme edaranyň maglumatlar binýadynda galýar. Resminama ýatyrylanda on indeksiň hemmesi şol bir meýilleşdirilen çap edilişde üýtgeýär we şol aralykda üýtgän beýleki ýazgylaryň hemmesi bilen bilelikde görünýär.

## Çeşmeler

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, 2026-njy ýylyň iýuny](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 2025-nji ýylyň 9-njy iýuly](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 laýyklygy, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Ýatyrylyş we ýagdaý sanawy (SPEC-CRED-0003), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/status-list)
- [ADR-0008: ýagdaý sanawynyň ýerleşişi, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0008-status-list-placement)
- [Ýatyrylyş we täzelik, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/revocation)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)

---
title: "HAIP we Token Status List: yzarlamasyz ýokary ynamlylyk"
slug: haip-and-token-status-list
description: HAIP 1.0 näme kesgitleýär we Tamga ony nähili ulanýar hem-de Token Status List resminamalary nirede ulanylýandygyny berijä aýtmazdan nähili ýatyrýar.
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Sources: HAIP 1.0 Final (24 Dec 2025) §3–8 (flows, FAPI2/PKCE/PAR, DPoP + DPoP-Nonce, scope, signed metadata, wallet attestation shared sub, key attestations, x509_hash, DCQL, ECDH-ES P-256, A128GCM+A256GCM, ephemeral keys, aki, JAR request_uri, direct_post.jwt, same-device rules, dc_api.jwt, mso_mdoc / dc+sd-jwt, x5c without trust anchor, status_list, unique unpredictable index, KB-JWT always, ES256 / -7 -9, SHA-256). ADR-0034 (K1–K5, CI1–CI6, renewal order). draft-ietf-oauth-status-list-21 (21 Jun 2026; RFC Editor queue per datatracker 2026-10-08; title "Token Status List (TSL)"): §4 bit packing LSB-first, DEFLATE/ZLIB, bits 1/2/4/8, JWT claims sub/iat/exp/ttl/status_list, aggregation_uri, §7 status types (0x03 application specific), §12 herd privacy. SPEC-CRED-0003 v1.0.0 (cites draft-20): bits=2, 100,000 min, 80% fill, random idx, opaque URI, split by type only, 2-min fixed cadence, no emergency publish, exp = iat + 6 h, ttl 120 (2026-10-09: 1% noise rule removed), prefetch, aggregation recommended, separate status key, Ş1–Ş10, S1–S14, anchors.jsonl today. SPEC-API-0001 D1–D6, INDETERMINATE reasons, ZK NOT_APPLICABLE. ADR-0048 (bits per credential type, identity 1, institutions 2, suspension only where the schema allows; CWT form for mdoc; packages 0.6.0). ADR-0044 implemented in packages 0.4.0. Compression figures computed for this post with zlib level 9 (same call as @tamga-network/sd-jwt). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0 OpenID4VCI, OpenID4VP, SD-JWT VC we ISO mdoc-daky köp görnüşleri alýar we ýokary ynamlylyk üçin bir toplumy kesgitleýär: her tarapyň haýsy formatlary, algoritmleri, müşderi belgilerini, şifrlemäni we attestasiýalary goldamalydygyny. **Token Status List** şol toplumyň daýanýan ýatyrylyş mehanizmidir: her resminama barlaýjylaryň öňünden ýükleýän uly, gol çekilen, gysylan bit sanawyndaky bir orna salgylanýar, şonuň üçin resminamany barlamak berijä onuň nirede ýa-da haçan görkezilendigini hiç haçan aýtmaýar.

HAIP 1.0 2025-nji ýylyň 24-nji dekabrynda Final boldy. Token Status List taslamasy 21-nji wersiýada (2026-njy ýylyň 21-nji iýuny), indi "Token Status List (TSL)" diýlip atlandyrylýar we RFC Editor nobatynda dur.

## HAIP esasy spesifikasiýalaryň açyk goýan näme zadyny kesgitleýär?

Iki önüm OpenID4VP-a harpma-harp eýerip, şonda-da biri-biri bilen gürleşip bilmezligi mümkin: biri haýyşlara `x509_san_dns` bilen gol çekýär, beýlekisi diňe DID-leri kabul edýär; biri jogaplary şifrleýär, beýlekisi şifrlemeýär. HAIP üç akym (resminama bermek, ugrukdyrmalar bilen görkeziş, brauzeriň Digital Credentials API-si arkaly görkeziş) we iki format üçin şol boşluklary ýapýar. Esasy düzgünler:

| Ugur | HAIP 1.0 talaby |
|---|---|
| Formatlar | IETF SD-JWT VC (`dc+sd-jwt`) ýa-da ISO mdoc (`mso_mdoc`); haýsysydygyny ekoulgamlar aýdýar |
| Algoritmler | hemmeler azyndan ES256-ny (COSE -7 ýa-da -9) we SHA-256-ny goldaýar |
| Resminama bermek | FAPI 2.0 arkaly PKCE (S256) we PAR bilen ygtyýarlandyryş kody akymy; DPoP-a baglanan tokenler; her resminama konfigurasiýasy üçin `scope`; resminamalar açara baglanan bolsa `nonce_endpoint` |
| Gapjyga ynam | PAR we token nokatlarynda ähli gurnalyşlar üçin umumy `sub` bilen gapjyk attestasiýasy; açar attestasiýalary |
| Barlaýjynyň şahsyýeti | gol çekilen haýyşlar `x509_hash` müşderi belgisini ulanýar |
| Sorag | `aki` görnüşli `trusted_authorities` hem goşulyp, DCQL |
| Jogap | şifrlenen: P-256-da ECDH-ES; barlaýjylar A128GCM-i we A256GCM-i sanaýar; her haýyş üçin täze açar |
| Ugrukdyrma akymy | `request_uri` bilen JAR, `direct_post.jwt`, şol bir enjamda başlan sessiýa gaýdyp ugrukdyrma |
| Brauzer akymy | `dc_api.jwt` bilen Digital Credentials API |
| Başlyklardaky açarlar | beriji gollary, gol çekilen metamaglumatlar we ýagdaý sanawy tokenleri üçin ynam labyrysyz `x5c`, hiç haçan öz-özüne gol çekilen däl |
| SD-JWT VC | resminama eýesine baglanan bolsa KB-JWT hemişe bar; `status` `status_list`-i ulanýar |
| Ýagdaý | her resminama öz ýeke-täk, çaklap bolmaýan indeksini alýar |

Tamga-nyň profilleri bularyň ählisine eýerýär we birnäçe ýerde has hem öňe gidýär: ES256 rugsat berlen ýeke-täk gol algoritmi we her resminama eýesine baglanan, şonuň üçin KB-JWT hemişe talap edilýär. Protokol jikme-jiklikleri [OpenID4VCI](/blog/openid4vci-deep-dive) we [OpenID4VP we DCQL](/blog/openid4vp-dcql-deep-dive) çuňňur seredilişlerinde.

![HAIP düzgünleri we Tamga-nyň saýlawlary](/blog/haip-and-token-status-list/en/fig-haip.png)

## HAIP-iň haýsy düzgünleri Tamga-nyň taslamasyny üýtgetdi?

HAIP talaplary birme-bir gabatlaşdyrylanda olaryň ikisi ýapylan kararlara degdi, şonuň üçin olar 2026-njy ýylyň 1-nji oktýabrynda proýekt dolandyryşy tarapyndan tassyklanan [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)-den geçdi.

**Barlaýjynyň şahsyýeti `x509_hash`.** HAIP §5: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". ADR-den öň Tamga barlaýjylary `x509_san_dns:<domain>` ulanýardy we ynam sanawy ýazgylary şol setir boýunça açarlanýardy. Indi:

- barlaýjynyň `client_id`-i onuň giriş sertifikatyndan hasaplanýar, hiç haçan sazlama faýlyna ýazylmaýar;
- gapjyk diňe `x509_hash`-y kabul edýär we heş ýaprak sertifikata gabat gelmese haýyşy ret edýär, şol bir wagtda jogap salgysynyň sertifikatyň SAN-yndaky domende bolmagyny henizem talap edýär;
- sertifikat täzelenende heş üýtgeýändigi sebäpli her daýanýan tarap ýazgysy hemişelik `dns_name` göterýär we täzelenmeden sag galmaly hemme zat şoňa baglanýar: nusgalaryň aýrylyşy, her saýt üçin lakamlar, geçiş kartalary we görkeziş žurnaly.

Amaly netije amallaryň tertibidir. Täzelenende täze sertifikat sanawyň çeşmesine girýär we ilki ynam sanawy täzeden çap edilýär; diňe şondan soň barlaýjy geçýär. Ir geçse, gapjyklar näbelli `client_id` görýär we ret edýär.

**Gapjyk attestasiýasynyň subýekti umumy.** HAIP §4.4.1 attestasiýanyň `sub`-ynyň "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation" diýýär we PAR `client_id` şol bahadyr. Toruň gapjyklarynyň biri bolan Tamga Wallet-iň üpjün edijisi öň ol ýere her amal üçin açaryň barmak yzyny goýýardy. Indi ol gapjyk çözgüdiniň belgisini ulanýar. Nusgalar henizem diňe her amal üçin täze `cnf` açary we täze, baglanyşdyryp bolmaýan ýagdaý ýazgysy bilen tapawutlandyrylýar, şonuň üçin guramanyň ýazga alýan zady gapjyk önümini tanadýar we telefon hakda hiç zat aýtmaýar.

## Token Status List ýagdaýy nähili kodlaýar?

Resminama salgylanma göterýär, sanaw bolsa bitleri göterýär:

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

`sub` resminamadaky `uri` bilen deň bolmaly. Şol bir resminamanyň mdoc nusgasy şol bir `idx`-i ulanýar, ýöne sanawyň öz açyk däl salgysyndaky CWT görnüşine (`application/statuslist+cwt`) salgylanýar; iki görnüş hem şol bir bitleri göterýär we şol bir çap edilişde gol çekilýär ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). `lst` taslamada kesgitlenen üç ädimde gurulýar: her resminama üçin `bits` biti baýt toplumyna her baýtyň **iň kiçi bitinden** başlap ýazmak; toplumy ZLIB formatynda DEFLATE bilen gysmak; netijäni base64url bilen kodlamak.

Kiçijik işlenen mysal: 16 ýazgyly we `bits: 2` bolan guramanyň sanawy, bu ýerde 1-nji indeks ýatyrylan, 2-nji indeks togtadylan we 6-njy indeks ýatyrylan:

```text title="2 bitlik ýagdaýlary gaplamak (bu ýazgy üçin hasaplandy)"
byte 0 = idx 3..0  → 00 10 01 00 → 0x24
byte 1 = idx 7..4  → 00 01 00 00 → 0x10
byte 2 = idx 11..8 → 0x00
byte 3 = idx 15..12 → 0x00

zlib(level 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` bilen `idx` indeksini okamak üçin: `idx >> 2` baýty alyň we ony `(idx & 3) × 2` saga süýşüriň. 48213 `idx` üçin bu 12053-nji baýt, 2-nji we 3-nji bitler. `bits: 1` bilen bu `idx >> 3` baýt, `idx & 7` bit. Ululyk alada däl: Tamga sanawynda azyndan 100 000 ýazgy bar, iki bit bilen gysylmadyk ýagdaýda 25 000 baýt (bir bit bilen 12 500). Bu ýazgy üçin geçiren synagymyzda 9-njy derejeli zlib bilen hemmesi güýjünde bolan sanaw 46 baýta, şol bir sanaw 200 sany dargynyk ýatyrylyş bilen bolsa 439 baýta çenli gysyldy.

![Resminamanyň ýagdaýyny dört ädimde okamak](/blog/haip-and-token-status-list/en/fig-bits.png)

## Tamga-da ýagdaý bahalary näme aňladýar?

| Baha | Taslamadaky ady | Tamga-da |
|---|---|---|
| `0x00` | VALID | güýjünde |
| `0x01` | INVALID | ýatyrylan, hemişelik |
| `0x02` | SUSPENDED | togtadylan, yzyna gaýtaryp bolýar; diňe shemasy rugsat berýän görnüşlerde |
| `0x03` | programma mahsus | ulanylmaýar; ýatyrylan hasaplanýar |

Taslama `bits` üçin 1, 2, 4 ýa-da 8-e rugsat berýär. 0.6.0 paketlerinden bäri Tamga ony resminama görnüşi boýunça kesgitleýär ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). Şahsyýet hyzmatynyň resminamalaryny ÝB-niň adamy tanadýan maglumatlar baradaky düzgünine eýerip togtadyp bolmaýar, şonuň üçin olaryň sanawlary bir bit ulanýar: güýjünde ýa-da ýatyrylan, ýatyrylyş bolsa soňky. Guramalaryň sanawlary iki bit ulanýar, sebäbi togtatmak üçin aýry baha gerek: diplomy derňeýän gurama derňew dowam edýärkä ony saklamak isleýär. Şol ýerde hem `0x02` diňe shemasy togtatmaga rugsat berýän görnüşler (`suspension_allowed`, häzir diplom) üçin ýazylýar; başga islendik görnüşdäki togtatma bahasy bozuk sanaw hökmünde ret edilýär. Dört ýa-da sekiz bit sanawy hiç bir peýdasyz iki ýa-da dört esse ulaldardy. Barlaýjy `0x00`-dan başga islendik zady ret etmek hasaplaýar we "togtadylan"-y "ýatyrylan"-dan aýry görkezýär.

## Ýagdaý sanawy yzarlaýyş kanalyna öwrülmekden nähili gaça durýar?

Ýagdaý sanawynyň gizlinligi süriden gelýär: sanawy ýükleýän barlaýjy onuň islendik ýazgysyny barlaýan bolup biler. Tamga-nyň düzgünleri sürini hakyky edýär; adamyň tarapyndan görlen şol bir düzgünler [Yzarlamasyz ýatyrylyş](/blog/status-list-privacy) ýazgysynda.

- **Uly sanawlar.** Azyndan 100 000 ýazgy we 80%-i paýlananda täze sanaw. Ulanylmaýan orunlar güýjünde bolan resminamalar bilen şol bir `0x00`-y göterýär, şonuň üçin daşyndan seredýän hiç kim näçe ornuň paýlanandygyny bilip bilmeýär.
- **Tötänleýin indeksler.** `idx` sanawyň sygymynyň içinde tötänleýin saýlanýar. Yzygiderli indeks `awarding_date` gizlin galsa-da, ýazylyş tertibini we takmynan senäni açardy. HAIP hem her resminamanyň öz ýeke-täk, çaklap bolmaýan indeksiniň bolmagyny talap edýär.
- **Açyk däl URI-ler.** Sanawyň URI-si her görkezişde görünýär, şonuň üçin ol hem bir meýdandyr. `/sl/2026-engineering` ýyly we fakulteti açardy; Tamga sanaw belgileri tötänleýin setirler we gabatlyk berijide galýar.
- **Diňe görnüş boýunça bölmek.** Täze sanaw öňkisi dolanda açylýar, hiç haçan her ýyl ýa-da her bölüm üçin däl.
- **Nusgalaryň umumy indeksi ýok.** On toplum nusgasynyň her biriniň öz tötänleýin indeksi bar, şonuň üçin iki barlaýjy görkezişleri `idx` arkaly baglanyşdyryp bilmeýär.

Bir çäk gurluş taýdan bar we şeýle hem ýazylan: kiçi gurama üçin süri diňe şol guramanyň öz resminamalar toplumy ýaly uly, sebäbi `iss` ony her niçigem bolsa atlandyrýar.

Gizlinlik hekaýasynyň beýleki ýarysy almakdyr. Barlaýjy sanawy her barlagda ýüklän bolsa, beriji "kimdir biri häzir meniň resminamalarymyň birini barlaýar" diýip öwrenerdi, çeşme IP bolsa köplenç kimdigini aýdardy. Şonuň üçin Tamga barlaýjylary sanawlary tertip boýunça **öňünden alýar** we keşden barlaýar; `@tamga-network/verifier` muny adatça edýär, her barlagda almak bolsa aç-açan açylmaly. Taslamanyň berijiniň ähli ýagdaý sanawlaryny bir salgyda sanaýan goşmaça `aggregation_uri`-si Tamga-da maslahat berilýär, sebäbi ol öňünden almagy amaly edýär.

## Sanaw näçe ýygy çap edilýär we nusga näçe wagt güýjünde bolýar?

| Düzgün | Tamga bahasy | Näme üçin |
|---|---|---|
| Çap ediş aralygy | kesgitli 2 minut, hiç zat üýtgemese-de saklanýar | diňe ýatyrylanda çap etmek "häzir ýatyrylyş boldy" diýip açardy; gysga aralyk ýatyrylyşy birnäçe minudyň içinde görünýän edýär |
| Gyssagly çap ediş | edilmeýär | ol kesgitli ritmi bozardy; gyssagly ýagdaýlar beriji sertifikatyny togtatmagy ýa-da shemany ýatyrmagy ulanýar |
| `ttl` | 120 s (aralyk) | barlaýjynyň täzeden almazdan öň öz nusgasyny näçe wagt ulanyp biljekdigi |
| `exp` | `iat` + 6 sagat | gysga ýagdaý serweri bökdençligi barlagy togtatmaz ýaly absolýut çäk; ol salgylanma barlaýjy syýasatlarynyň iň uly token ýaşyna deň |
| Keş başlyklary | `exp` we `ttl` peýdasyna hasaba alynmaýar | tokeniň öz meýdanlary kesgitleýär |
| Gol açary | resminama açaryndan aýry, şol bir X.509 zynjyry | syzan ýagdaý açary bilen diplomy däl-de, ýagdaýy galplaşdyryp bolýar |

Her çap ediliş ilki ýagdaý serwerine ýazylýar, ikinji bolup onuň heşi ýazga alynýar. Häzir şol ýazgy ynam sanawyny çap edijiniň labyr žurnalydyr; kitap soňky tapgyr ([näme üçin entek blokçeýn ýok](/blog/why-no-blockchain-yet)). Barlaýjy tokeniň heşiniň ýazga alnan heş bilen gabat gelýändigini we onuň wersiýasynyň yza gitmändigini barlaýar, şonuň üçin beriji ýatyrylan resminamany güýjünde ýaly görkezmek üçin sanawy ümsümlik bilen yza aýlap bilmeýär.

## Barlaýjy barlap bilmese näme netije çykarýar?

Ýatyrylyş barlaglary Tamga hatarynyň D1–D6 ädimleri hökmünde işleýär: `status.status_list`-i okamak, tokeni öňünden alnan keşden almak, onuň goluny ynam sanawynda şol gurama üçin hasaba alnan ýagdaý açary bilen barlamak, `sub`-y, täzeligi we ýazga alnan heşi barlamak, soňra bitleri okamak. Sanawy alyp bolmasa ýa-da `exp` geçen bolsa, netije `STATUS_UNREACHABLE` ýa-da `STATUS_STALE` ýaly sebäp bilen **INDETERMINATE** bolýar. "Bu diplom ýatyryldy" bilen "häzir barlap bilemok" adam barada dürli kararlara getirýär we başgaça görkezilmeli. Oflaýn ýagdaýda barlaýjy keşdäki tokeni we soňky belli ýazgysy bilen dowam edip, soňky sinhronlaşdyrmanyň wagtyny görkezip we netijäni oflaýn barlanan diýip belläp biler.

Zero-knowledge ýaş subutnamalary indekssiz ýeke-täk ýagdaýdyr: subutnama sanawdaky orny tanadyp biljek hiç zady açmaýar, şonuň üçin ýagdaý degişli däl diýlip habar berilýär. Karar zero-knowledge bilen diňe iň köp 24 sagat güýjünde bolan we resminama ýatyrylandan soň täzelenmeýän gysga ömürli nusgalary görkezmekdir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Bu 0.4.0 paketlerinden bäri işleýär: nusgalarda ýagdaý ýazgysy ýok, gapjyk olary soramazdan täzeleýär we olaryň gysga ömri ýatyrylyş barlagynyň ornuny tutýar. Şeýle nusga esaslanmaýan zero-knowledge subutnamasy diňe barlaýjynyň syýasaty muny aç-açan aýdanda kabul edilýär ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

## Köp berilýän soraglar

### HAIP kanunmy?

Ýok. Bu OpenID Foundation spesifikasiýasydyr. Ýewropanyň sanly şahsyýet ekoulgamy dürli öndürijileriň gapjyklary, berijileri we barlaýjylary bilelikde işlesin diýip oňa daýanýar.

### Näme üçin barlaýja berijiden "bu resminama henizem güýjündemi" diýip soramaga rugsat bermeli däl?

Sebäbi soragyň özi syzmakdyr: beriji haýsy resminamanyň, haçan we köplenç kim tarapyndan barlanýandygyny öwrenerdi. Ýagdaý sanawy bilen barlaýjyda hemmäniň ýagdaýynyň nusgasy bar we ol hiç kimden soramaýar.

### Togtatma öz-özünden gutarýarmy?

Ýok. Togtadylan resminama beriji bitleri yzyna güýjünde ýagdaýyna getirýänçä ýa-da ony ýatyrýança togtadylan bolup galýar. Barlaýjy diňe häzirki bahany okaýar.

### Barlaýjy on nusganyň şol bir adama degişlidigini bilip bilermi?

Ýagdaý sanawy arkaly bilip bilmez. Her nusganyň öz tötänleýin indeksi bar we nusgalar bilen indeksleriň arasyndaky gabatlyk berijiniň maglumatlar bazasynda galýar. Ýatyrylanda on indeksiň hemmesi şol aralykda üýtgän beýleki zatlar bilen bilelikde şol bir tertipli çap edilişde üýtgeýär.

## Çeşmeler

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, 2026-njy ýylyň iýuny](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 2025-nji ýylyň 9-njy iýuly](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 laýyklygy, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Ýatyrylyş we ýagdaý sanawy (SPEC-CRED-0003), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/status-list)
- [ADR-0008: ýagdaý sanawynyň ýerleşişi, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0008-status-list-placement)
- [Ýatyrylyş we täzelik, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/revocation)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)

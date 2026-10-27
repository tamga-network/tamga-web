---
title: "SD-JWT VC-ä çuňňur seredilişi: gol, disclosure-lar, KB-JWT"
slug: sd-jwt-vc-deep-dive
description: SD-JWT VC-niň baýtma-baýt nähili gurulýandygyny we barlanýandygyny Tamga profili bilen düşündirýäris; duzly heşler, _sd, cnf, KB-JWT we sd_hash, vct#integrity we status.
date: 2026-10-08
lang: tk
updated: 2026-10-19
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Sources: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9 (Tamga constraints, disclosure, hash-the-string rule, _sd sorted, decoys forbidden, x5c, typ, cnf, KB-JWT, sd_hash, Ş1–Ş10, C1–C18); SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b issuerId from leaf cert); SPEC-CRED-0003 (status claim); schema-catalog (vct URN, W3C SRI integrity string, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vector v2, fake person data; issuer URL replaced with an example path); live catalogue entry for urn:tamga:edu:DiplomaCredential:1 (content_hash = vector vct#integrity, checked 2026-10-08). RFC 9901 (Nov 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Aug 2026, IESG evaluation; iat may be disclosable, vct#integrity optional, status JWT list). HAIP 1.0 Final §6 (x5c, KB-JWT always with holder binding). -->

SD-JWT VC guramanyň gol çeken JWT-sidir we meýdan bahalarynyň deregine olaryň duzlanan SHA-256 heşlerini göterýär. JWT-niň ýanynda `~` belgisi bilen birleşdirilen **disclosure**-lar gelýär. Disclosure-lar duzlanan bahalaryň özüdir. Resminama eýesi meýdany görkezmek isläninde şol meýdanyň disclosure-ny iberýär, gizlemek isläninde ibermeýär. Her görkezişiň soňuna resminama eýesiniň enjam açary bilen gol çeken **KB-JWT**-si goşulýar.

Bu ýerde iki standart bar. **SD-JWT** usulyň özüdir we IETF ony 2025-nji ýylyň noýabrynda RFC 9901 hökmünde çap etdi. **SD-JWT VC** bolsa munuň üstünde gurlan resminama profilidir (`draft-ietf-oauth-sd-jwt-vc`) we onuň 19-njy wersiýasy (2026-njy ýylyň 31-nji awgusty) IESG bahalandyrmasynda. Tamga-nyň baýt derejesindäki profili [SPEC-CRED-0002](https://docs.tamga.network/specifications/sd-jwt-vc) resminamasynda ýazylan.

> **Bellik:** Aşakdaky mysallaryň hemmesini Tamga-nyň açyk laýyklyk wektory bolan `sd-jwt/diploma-basic`-den aldyk. Wektordaky şahsy maglumatlar galp we onda gizlin açar ýok. Guramanyň salgysyny mysal ýol bilen çalşyrdyk we sertifikatlary gysgaltdyk. Gollar görkezilmeýändigi üçin mysallary ýönekeýleşdirilen hasaplaň.

## Gurama hakykatda nämä gol çekýär?

Gol çekilen JWT-niň adaty JOSE başlygy we mazmuny bolýar. Mazmunda gizlenip bilinýän meýdanlaryň ýerinde olaryň heşleri durýar:

```json title="Ýönekeýleşdirilen mysal: beriji tarapyndan gol çekilen JWT-niň başlygy we mazmuny"
{
  "alg": "ES256",
  "typ": "dc+sd-jwt",
  "x5c": ["MIICCzCCAbCgAwIBAgIC…"]
}
{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=",
  "iat": 1790619528,
  "cnf": {
    "jwk": {
      "kty": "EC", "crv": "P-256",
      "x": "hFEM1avAMSadeciYwVO0nJ6aMEM8YDCTigu_GO4tqgM",
      "y": "R-5AIVbUthAPOiJm4-2U8aB1Oppfyjl84HhDZrLqdfU"
    }
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  },
  "_sd_alg": "sha-256",
  "_sd": [
    "5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo",
    "9xI8VcNCjl8OcW6W0n30e_LGJ4lm3ah3SAEVEI4pM38",
    "FJqsIjUpFitVLNSAhwL-3LcB-_4YoIupLGFhC5WhdMs",
    "IpStBdfeq4pqVfpP9xFH2ZM46lojLf7cqcEpDBk9OV4",
    "JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4",
    "kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI",
    "…6 more, sorted"
  ]
}
```

Açyk galýan meýdanlar barlaýjynyň başga bir zady okap bilmegi üçin ilki bilmeli meýdanlarydyr. Tamga-da bu meýdanlar görnüş metamaglumatynda `sd: "never"` hökmünde bellenýär we hiç haçan gizlenip bilinmeýär:

| Meýdan | Näme üçin açyk galýar |
|---|---|
| `iss` | hasaba alnan gurama bilen gabat gelşini barlamak üçin |
| `vct`, `vct#integrity` | görnüşi kesgitlemek we berkitmek üçin |
| `iat` | ynam barlaglary şu pursata görä geçirilýändigi üçin |
| `cnf` | KB-JWT-ni barlamak üçin |
| `status` | ýatyrylyş ýagdaýyny soramak üçin |
| `_sd_alg`, `_sd` | usulyň özi bolandyklary üçin |
| `exp` | görnüşde bar bolsa |

19-njy taslama guramanyň `iat` meýdanyny hem saýlap açylýan etmegine rugsat berýär. Tamga bu meýdany açyk saklaýar, sebäbi barlaýjy ynam gatlagyndan guramanyň bu görnüşi şu gün berip bilýändigini däl-de, `iat` pursatynda berip bilendigini soraýar.

Başlykdaky `x5c` meýdany guramanyň sertifikat zynjyryny göterýär. Zynjyrda ilki ýaprak sertifikat gelýär, kök sertifikat bolsa goşulmaýar. HAIP 1.0 açaryň `x5c` arkaly tapylmagyny hökmany edýär we Tamga-da `x5c` bolmadyk resminama barlagdan geçmeýär. Barlaýjy guramanyň şahsyýetini `iss` meýdanyndan däl-de, **ýaprak sertifikatyň barmak yzyndan** alýar. `iss` meýdanyna ynansa, şol bir kök astynda güýjünde sertifikaty bolan islendik gurama `iss` meýdanyna başga uniwersitetiň salgysyny ýazyp, resminama öz açary bilen gol çekip bilerdi.

`typ` bahasy `dc+sd-jwt`. Taslama 2024-nji ýylyň noýabryna çenli `vc+sd-jwt` ulanýardy we bu baha W3C media görnüşi bilen çaknyşmazlygy üçin üýtgedildi. Tamga guramalary diňe `dc+sd-jwt` döredýär we barlaýjy `vc+sd-jwt` bahasyny ret edýär. Daşarky ekoulgamlardan gelýän resminamalar üçin laýyklyk saýlawy bar, ýöne bu saýlaw adaty ýagdaýda öçük.

## Disclosure nähili gurulýar we näme üçin setiriň heşi alynýar?

Disclosure `[duz, at, baha]` görnüşindäki üç elementli JSON massiwidir. Massiw UTF-8 bilen, soňra bolsa doldurmasyz base64url bilen kodlanýar. Duz 16 tötänleýin baýtdan (128 bit) ybarat we her disclosure üçin täzeden döredilýär. Wektordaky görkezişde şu dört disclosure bar:

```text title="Laýyklyk wektoryndan disclosure-lar, açylan görnüşde, heşleri bilen"
WyJJY3NEZDFmdmh6bS1mcVpTNDJLb1p3IiwiZXFmX2xldmVsIiw2XQ
  → ["IcsDd1fvhzm-fqZS42KoZw","eqf_level",6]
  → 5O0ow4w1pES5PcWsRp0I7b5-Y6-C1HSLuKtPC2IdFRo

WyJoY0FvdmV4bmpkTFd3aF9sN1hkM1ZBIiwiaXNfZ3JhZHVhdGUiLHRydWVd
  → ["hcAovexnjdLWwh_l7Xd3VA","is_graduate",true]
  → kA0R62-bxuHSJj4MRsE0x98cmZRcbiJ_iyYD60jfJwI

WyJSc3ZSUXY2cDhGM3NfRXRBSXFQTnpnIiwiZmFtaWx5X25hbWUiLCLDlnJuZWsiXQ
  → ["RsvRQv6p8F3s_EtAIqPNzg","family_name","Örnek"]
  → JtA0TsH7O4ImtZ4Ks60seDP4TGfHvP3hByuCG5fkvX4

WyJjazFtMktWejdVWEg2cTlMNEJad1BRIiwiZ2l2ZW5fbmFtZSIsIlZla3TDtnIiXQ
  → ["ck1m2KVz7UXH6q9L4BZwPQ","given_name","Vektör"]
  → sHl3d9xOXRVt7kU78VQvmAjq4kZzrWjyyJV1sBfRA1M
```

Heş `base64url(SHA-256(disclosure setiriniň ASCII baýtlary))` formulasy bilen hasaplanýar. Ýokardaky dört heşiň hemmesi mazmundaky `_sd` massiwinde bar.

SD-JWT kodunda iň köp duş gelýän ýalňyşlyk disclosure-ny açyp, massiwi täzeden JSON-a öwürmek we soňra onuň heşini almakdyr. JSON-yň ýazylyşy ýeke-täk görnüşli däl. Otudan soň boşluk goýmak ýa-da `ö` harpyny `ö` görnüşinde ýazmak başga baýtlary we şonuň üçin başga heşi döredýär. Tamga-nyň spesifikasiýasy muny `given_name: "Ayşe"` üçin gurlan disclosure arkaly görkezýär. Massiw boşluksyz we gaçyş nyşanlarysyz täzeden ýazylanda `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo` heşi `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU` bolýar. Barlaýjylar üçin düzgün ýönekeý: **ilki setiriň heşini gelşi ýaly alyň, soňra setiri açyň.** Bu tertip hiç haçan tersine öwrülmeýär.

![Meýdandan gol çekilen mazmundaky heşe çenli dört ädim](/blog/sd-jwt-vc-deep-dive/en/fig-disclosure.png)

## Näme üçin `_sd` massiwi tertiplenýär we näme üçin galp heşler ýok?

Tamga `_sd` massiwini artýan baýt tertibinde düzýär. Massiw tertiplenmedik bolsa, heşler guramanyň meýdanlary işleýän tertibinde durardy we bu tertip köplenç shemadaky tertipdir. Barlaýjy hem gizlin heşleri shemadaky meýdan sanawy bilen ýanaşyk goýup, haýsy meýdanlaryň gizlenendigini anyklap bilerdi.

RFC 9901 näçe meýdanyň gizlenendigini bulaşdyrmak üçin **galp heşleri** (decoy) goşmaga hem rugsat berýär. Bular hiç bir disclosure-a gabat gelmeýän ýazgylardyr. Tamga bolsa galp heşleri gadagan edýär. `vct` açyk we görnüş metamaglumaty ähli meýdanlary sanaýar, ýagny meýdanlaryň sany eýýäm hemmä belli. Guramadan gurama üýtgeýän galp heş sany hem öz-özünden barmak yzyna öwrülerdi. Mundan başga-da, her galp heş QR koduna 43 nyşan goşýar. Hakyky maglumat syzmasy görkezilýän disclosure toplumynyň üýtgemeginden ýüze çykýar. Şonuň üçin Tamga-nyň gapjyk düzgünleri tordaky gapjyklaryň şol bir barlaýja şol bir görnüş üçin her gezek şol bir toplumy görkezmegini talap edýär.

Profilde ýene iki çäk bar. Içleýin saýlap açmak iň köp iki derejä rugsat berýär, massiw elementlerini aýratynlykda gizlemek bolsa häzirlikçe ulanylmaýar.

## Eýesine baglamak nähili işleýär we KB-JWT nämä gol çekýär?

`cnf.jwk` resminama berlende telefonyň howpsuz enjam modulynda döredilýän P-256 açarynyň açyk ýarysydyr. Gurama bu açary gapjygyň iberen eýeçilik subutnamasyndan göçürýär ([OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive)). Açaryň gizlin ýarysy enjamdan hiç haçan çykmaýar. Tamga-da `cnf` bolmadyk resminama hem, KB-JWT bolmadyk görkeziş hem güýjünde däl. Standart açara baglamagy islege goýýar. HAIP bolsa resminama enjama bagly bolsa her görkezişde KB-JWT talap edýär we Tamga her resminamany enjama baglaýar.

Görkeziş wagtynda gapjyk diňe barlaýjynyň soran we adamyň tassyklan disclosure-laryny galdyrýar we soňuna KB-JWT goşýar:

![Gapjykda näme saklanýar we barlaýja näme iberilýär](/blog/sd-jwt-vc-deep-dive/en/fig-anatomy.png)

```json title="Laýyklyk wektoryndan KB-JWT (başlyk we mazmun)"
{ "alg": "ES256", "typ": "kb+jwt" }
{
  "nonce": "conf-nonce-0001",
  "aud": "x509_hash:9OGMDF0OXzjg3FX8kOjh9tUnI7A5VhSc1mweK1ElZ_Q",
  "iat": 1790705928,
  "sd_hash": "-SOR78_i6a2u-_oX-jovk7jVjCrsZYIe35q4lixd8NE"
}
```

`nonce` barlaýjynyň diňe bir gezek ulanylyp bilinýän çagyryş bahasydyr. Şonuň netijesinde ýazga alnan görkezişi gaýtadan ulanyp bolmaýar. `aud` barlaýjynyň prefiksi bilen bilelikde **doly** müşderi belgisidir. OpenID4VP-de bu baha `x509_hash:` prefiksinden we barlaýjynyň giriş sertifikatynyň barmak yzyndan ybarat ([OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive)). `iat` bolsa barlaýjynyň sagadyndan iň köp 300 sekunt tapawutly bolup biler.

Aradaky biriniň disclosure-ny pozmagynyň öňüni `sd_hash` alýar:

```text title="sd_hash-a näme girýär"
sd_hash = base64url( SHA-256( ASCII bytes of
  "<issuer-signed JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Hasaba diňe görkezilen disclosure-lar girýär we soňundaky `~` hem hasaba goşulýar. `sd_hash` bolmasa, kimdir biri diplom görkezişinden `grade` disclosure-ny aýryp bilerdi we iki gol hem ýene güýjünde görnerdi.

Bu usulyň gerimini hem ýatladalyň. Güýjündäki KB-JWT resminama bagly açaryň elde saklanýandygyny subut edýär. Telefony haýsy adamyň tutýandygyny bolsa subut etmeýär.

## `vct` we `vct#integrity` näme üçin gerek?

`vct` resminamanyň görnüşini atlandyrýar. Tamga munuň üçin `urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa>` görnüşli URN-leri ulanýar. Şeýlelikde domen ady üýtgese-de, görnüşiň belgisi üýtgemeýär. Görnüş metamaglumaty (Type Metadata) açyk katalogyň URN-den gabat getirýän HTTPS salgysynda ýerleşýär. 19-njy taslama bu usuly "sanawdan kesgitlemek" diýip atlandyrýar (§5.3.2). Diplom üçin `https://schemas.tamga.network/v1/catalogue.json` `urn:tamga:edu:DiplomaCredential:1` görnüşini metamaglumat faýlyna we `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` mazmun heşine gabat getirýär. Bu baha wektordaky `vct#integrity` meýdany bilen şol bir setirdir.

Bitewilik bahasy W3C Subresource Integrity formatyny ulanýar. Baha `sha256-` prefiksi bilen başlaýar we resminamanyň çig baýtlarynyň base64 görnüşindäki SHA-256 heşi bilen dowam edýär. Şonuň üçin çap edilen faýl baýtma-baýt üýtgewsiz galmaly we hiç bir aralyk serwer ony täzeden formatlap bilmez. Standart `vct#integrity` meýdanyny islege goýýar, Tamga bolsa hökmany edýär. Şeýlelikde barlaýja guramanyň resminama gol çekende daýanan kesgitlemesinden başga görnüş kesgitlemesi berlip bilinmeýär. Her meýdanyň `sd` syýasaty (`always`, `allowed`, `never`) hem görnüş metamaglumatynda ýazylýar we Tamga guramalary gizlenmegine rugsat berlen her meýdany gizleýär.

## `status` meýdany nämä salgylanýar?

`status.status_list` indeksi (`idx`) we Token Status List salgysyny göterýär. Barlaýjy öňünden ýükläp alan gol çekilen we gysylan sanawynda şol indeksdäki bahany okaýar. `0` güýjünde, `1` ýatyrylan diýmegi aňladýar. Shemasy togtatmaga rugsat berýän görnüşlerde `2` togtadylan diýmekdir. `3` bolsa ulanylmaýar we ýatyrylan hökmünde bahalandyrylýar. Tamga indeksleri tötänleýin paýlaýar, sanaw salgylaryny manysyz setirlerden döredýär we barlaýjylaryň sanawlary belli aralyklarda öňünden ýüklemegini talap edýär. Şeýlelikde gurama resminamanyň haçan barlanandygyny hiç haçan bilip bilmeýär. 19-njy taslama salgylanylýan ýagdaý sanawynyň JWT görnüşinde bolmagyny talap edýär. Işleýiş tertibini we gizlinlik düzgünlerini [HAIP we Token Status List](/blog/haip-and-token-status-list) ýazgysynda düşündirdik.

## Barlaýjy SD-JWT VC-ni haýsy tertipde barlamaly?

Tamga her barlag ädimine hemişelik kod berýär we barlaýjy ilkinji şowsuz ädimiň koduny `failed_step` meýdanynda gaýtarýar. Ilki işleýän gatlak format gatlagydyr:

| Kod | Barlag |
|---|---|
| A1 | `~` boýunça böl; soňky bölek boş bolmaly däl, KB-JWT bolmaly |
| A2 | başlyk: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` bar |
| A3 | zynjyr sanawdaky köküň birine ýetýär, aralyk sertifikatlar CA, JWT goly güýjünde |
| A3b | guramanyň şahsyýeti `iss` meýdanyndan däl-de, ýaprak sertifikatyň barmak yzyndan alynýar |
| A3c | ýaprak sertifikat ýatyrylmadyk |
| A3d | `cnf` bar |
| A4 | `_sd_alg` = `sha-256` |
| A5 | her disclosure üçin ilki setiriň heşini al, `_sd` içinde tap, soňra aç |
| A6 | KB-JWT: `cnf` bilen gol, `aud`, `nonce`, ±300 s içinde `iat`, `sd_hash` |
| A7 | `exp` geçmedik, `nbf` wagty geldi |
| A8 | şol bir heş iki gezek ulanylmadyk, açyk meýdanyň üstüne ýazýan disclosure ýok |

Bulardan ikisi aýratyn düşündirmäge mynasyp. A5 heşi `_sd` içinde bolmadyk her disclosure-ny ret edýär. Ony kabul etse, her kim guramanyň hiç haçan gol çekmedik meýdanlaryny resminama goşup bilerdi. A8 bolsa ady, mysal üçin, `iss` ýa-da `vct` bolan disclosure-ny ret edýär, sebäbi şeýle disclosure açyk meýdanyň üstüne ýazardy.

Format gatlagyndan soň shema barlaglary gelýär (B1–B6). Bu ädimlerde `vct` kesgitlenýär, bitewilik heşi katalog bilen deňeşdirilýär we `extends` zynjyry yzarlanýar. Soňra gol çekilen ynam sanawyna garşy ynam barlaglary (C1–C4) geçirilýär we guramanyň `iat` pursatynda sanawda bolandygyna we bu görnüş üçin ygtyýarlydygyna seredilýär. Ondan soň ýatyrylyş barlagy (D1–D6) we barlaýjynyň öz syýasaty (E1–E4) işleýär. Netije üç bahanyň biri bolýar. Resminama kabul edilýär, ret edilýär ýa-da ýagdaý sanawy ýaly infrastruktura baryp bolmasa "häzir barlap bolmady" netijesi berilýär. "Häzir barlap bilemok" ýagdaýy hiç haçan "güýjünde däl" diýlip habar berilmeýär. Kodlaryň doly sanawyny [barlag tertibi](https://docs.tamga.network/specifications/verification-api) resminamasynda tapyp bilersiňiz.

Bu barlaglaryň hemmesini biziň ulanýan baýtlarymyz bilen özüňiz işledip bilersiňiz. Wektor, bäş ýaramaz ýagdaý we olary işledýän programma açyk ammaryň [conformance bukjasynda](https://github.com/tamga-network/tamga-network/tree/main/conformance) dur. Ýaramaz ýagdaýlar KB-JWT-niň ýoklugy, nädogry nonce, `iat` bahasynyň 301 sekunt süýşmegi, gabat gelmeýän disclosure we möhleti geçen resminamadyr.

## Tamga profili standart bilen deňeşdirilende näme üýtgedýär?

| Mowzuk | Standart | Tamga |
|---|---|---|
| Gol | birnäçe algoritm | diňe ES256 |
| `_sd_alg` | birnäçe saýlaw | `sha-256`, aç-açan ýazylýar |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` adaty ýagdaýda ret edilýär |
| Guramanyň açary | `iss` metamaglumaty, `x5c` ýa-da başga ýol | `x5c` hökmany, kök sertifikat goşulmaýar |
| Açara baglamak | islege bagly | her resminamada hökmany |
| Galp heşler | rugsat berilýär | gadagan |
| `_sd` tertibi | kesgitlenmedik | tertiplenen |
| `vct#integrity` | islege bagly | hökmany |
| Içleýin disclosure | rugsat berilýär | iň köp iki dereje |

Bulardan başga ähli meselede Tamga RFC 9901-e we 19-njy taslama eýerýär. Tamga barlaýjysy Tamga-nyň öz guramalaryndan tapawutly görnüşde ýazylan disclosure-lary hem barlap bilýär, sebäbi massiwleriň däl-de, setirleriň heşini alýar.

## Köp berilýän soraglar

### Tamga resminamalaryny umumy SD-JWT kitaphanasy bilen barlap bilerinmi?

Kitaphana disclosure setirleriniň heşini gelşi ýaly alýan bolsa we açara baglamagy hökmany etmäge mümkinçilik berýän bolsa, barlap bilersiňiz. Munuň üstüne Tamga profiliniň barlaglaryny hem goşmaly. Diňe ES256 kabul edilmeli, `x5c` zynjyry sanawdaky köküň birine ýetmeli, guramanyň şahsyýeti ýaprak sertifikatdan alynmaly, KB-JWT we `vct#integrity` hem hökmany bolmaly. `@tamga-network/sd-jwt` we `@tamga-network/verifier` paketleri bularyň hemmesini edýär.

### Näme üçin `aud` diňe host ady däl-de, doly müşderi belgisi?

Gapjygyň barlan bahasy müşderi belgisidir. OpenID4VP-de barlaýjy `x509_hash:` prefiksi we sertifikatynyň barmak yzy bilen tanalýar. KB-JWT-ni edil şu baha baglamak görkezişi başga her kim üçin peýdasyz edýär.

### Meýdany gizlemek guramanyň goluny üýtgedýärmi?

Ýok. Meýdany gizlemek şol meýdanyň disclosure-ny `~` bilen birleşdirilen setirden aýyrmak diýmekdir. Gol çekilen JWT hiç haçan täzeden gol çekilmeýär we üýtgedilmeýär.

### Näme üçin 128 bitlik duz ulanylýar?

Duz bolmasa, doglan senesi ýaly mümkin bahalary az bolan meýdanyň heşini ähli mümkin seneleri synap tapyp bolardy. Her disclosure üçin täzeden döredilýän 16 baýtlyk duz muny amalda mümkin däl edýär. Şol bir meýdanyň iki dürli resminamada şol bir heşi döretmeginiň hem öňüni alýar.

## Çeşmeler

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, 2025-nji ýylyň noýabry](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, 2026-njy ýylyň awgusty](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/sd-jwt-vc)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)
- [Shema katalogy (Type Metadata, vct#integrity), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/schema-catalog)
- [Laýyklyk wektorlary we işlediji, Tamga Network ammary](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network dokumentasiýasy](https://docs.tamga.network/packages/sd-jwt)

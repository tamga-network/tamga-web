---
title: "SD-JWT VC-ä çuňňur seredilişi: gol, disclosure-lar, KB-JWT"
slug: sd-jwt-vc-deep-dive
description: SD-JWT VC baýtma-baýt nähili gurulýar we barlanýar - duzly heşler, _sd, cnf, KB-JWT we sd_hash, vct#integrity we status - Tamga profili bilen.
date: 2026-10-08
lang: tk
updated: 2026-10-19
category: standards
draft: false
related: openid4vci-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, iso-mdoc-deep-dive, learn:selective-disclosure
---

<!-- Sources: SPEC-CRED-0002 v1.0.0 (2026-10-02) §1–9 (Tamga constraints, disclosure, hash-the-string rule, _sd sorted, decoys forbidden, x5c, typ, cnf, KB-JWT, sd_hash, Ş1–Ş10, C1–C18); SPEC-API-0001 v1.0.0 §1 (A1–A8, B1–B6, A3b issuerId from leaf cert); SPEC-CRED-0003 (status claim); schema-catalog (vct URN, W3C SRI integrity string, catalogue.json); conformance/vectors/sd-jwt/diploma-basic.json (vector v2, fake person data; issuer URL replaced with an example path); live catalogue entry for urn:tamga:edu:DiplomaCredential:1 (content_hash = vector vct#integrity, checked 2026-10-08). RFC 9901 (Nov 2025); draft-ietf-oauth-sd-jwt-vc-19 (31 Aug 2026, IESG evaluation; iat may be disclosable, vct#integrity optional, status JWT list). HAIP 1.0 Final §6 (x5c, KB-JWT always with holder binding). -->

SD-JWT VC beriji tarapyndan gol çekilen JWT bolup, onda meýdan bahalarynyň ýerine duzly (salted) SHA-256 heşleri, ýanynda bolsa `~` bilen birleşdirilip iberilýän **disclosure-laryň** (duzly bahalaryň özleriniň) sanawy bar. Eýesi meýdany onuň disclosure-yny iberip açýar we disclosure-y goşman gizleýär, eýesiniň enjam açary bilen gol çekilen **KB-JWT** bolsa her görkezişi tamamlaýar.

Iki standart gatnaşýar. **SD-JWT** mehanizmdir, ony IETF 2025-nji ýylyň noýabrynda RFC 9901 hökmünde çap etdi. **SD-JWT VC** onuň üstündäki resminama profilidir, `draft-ietf-oauth-sd-jwt-vc`; 19-njy wersiýa (2026-njy ýylyň 31-nji awgusty) IESG bahalandyrmasynda. Tamga-nyň baýt derejesindäki profili [SPEC-CRED-0002](https://docs.tamga.network/specifications/sd-jwt-vc).

> **Bellik:** Aşakdaky her mysal Tamga-nyň açyk laýyklyk wektory `sd-jwt/diploma-basic`-den alnan (ýasama şahsy maglumatlar, hususy açarlar ýok). Berijiniň salgysyny nusga ýoly bilen çalyşdyk we sertifikatlary gysgaltdyk. Gollar aýryldy, şonuň üçin mysallara ýönekeýleşdirilen diýip garaň.

## Beriji hakykatdan nämä gol çekýär?

Beriji tarapyndan gol çekilen JWT-niň adaty JOSE başlygy we gizlenip bilinýän meýdanlary heşler bilen çalşyrylan mazmuny (payload) bar:

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

Açyk duran meýdanlar barlaýja başga zatlary okamazdan öň gerek bolanlardyr. Tamga-da olar görnüş metamaglumatlarynda `sd: "never"` diýlip bellenýär we olary hiç haçan gizläp bolmaýar:

| Meýdan | Näme üçin görünýän galýar |
|---|---|
| `iss` | hasaba alnan beriji bilen gabatlygy barlamak |
| `vct`, `vct#integrity` | görnüşi kesgitlemek we berkitmek |
| `iat` | ynam barlaglary şu wagta baglanýar |
| `cnf` | KB-JWT-ni barlamak üçin gerek |
| `status` | ýatyrylyşy gözlemek |
| `_sd_alg`, `_sd` | mehanizmiň özi |
| `exp` | görnüşde bar bolsa |

19-njy taslama berijä `iat`-y saýlap açylýan etmäge rugsat berýär. Tamga ony görünýän saklaýar, sebäbi barlaýjy ynam gatlagyndan "bu beriji şu görnüşi bermäge şu gün rugsatlymy" däl-de, "bu beriji şu görnüşi `iat` **wagtynda** bermäge rugsatlymydy?" diýip soraýar.

Başlyk berijiniň sertifikat zynjyryny `x5c` içinde, ilki ýaprak (leaf), köksüz göterýär. HAIP 1.0 açary `x5c` arkaly kesgitlemegi talap edýär, Tamga bolsa `x5c`-ni hökmany edýär. Barlaýjy berijiniň şahsyýetini hiç haçan `iss`-den däl, **ýaprak sertifikatyň barmak yzyndan** alýar. Eger ol `iss`-e ynansa, şol bir kök astynda dogry sertifikaty bolan islendik gurama `iss`-e başga uniwersitetiň salgysyny ýazyp, öz açary bilen gol çekip bilerdi.

`typ` `dc+sd-jwt`. Taslama 2024-nji ýylyň noýabryna çenli `vc+sd-jwt` ulanýardy we W3C media görnüşi bilen çaknyşmazlyk üçin ony üýtgetdi. Tamga berijileri diňe `dc+sd-jwt` döredýär, barlaýjy bolsa daşarky resminamalar üçin gabatlyk baýdagy açylmasa (adatça ýapyk) `vc+sd-jwt`-ni ret edýär.

## Disclosure nähili gurulýar we näme üçin setiriň heşini almaly?

Disclosure üç elementli JSON toplumydyr `[salt, name, value]`, UTF-8 bilen kodlanýar, soňra doldurgyçsyz base64url bilen kodlanýar. Duz (salt) 16 tötänleýin baýt (128 bit), her disclosure üçin täze. Ine wektoryň görkezişindäki dört disclosure:

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

Heş `base64url(SHA-256(disclosure setiriniň ASCII baýtlary))`-dyr. Ýokarky dört heşiň her biri mazmunyň `_sd` toplumynda bar.

SD-JWT kodunda iň köp duş gelýän ýalňyşlyk disclosure-y açmak, toplumy täzeden serializasiýa etmek we netijäniň heşini almakdyr. JSON serializasiýasy kesgitli däl: otudan soňky boşluk ýa-da `ö`-niň `ö` görnüşinde ýazylmagy başga baýtlar we başga heş berýär. Tamga-nyň spesifikasiýasy muny `given_name: "Ayşe"` üçin disclosure bilen görkezýär: boşluklarsyz ýa-da escape-siz täzeden serializasiýa etmek `nM_EESmLJt3b0fzNu1paGyiAfSLs4Npf2yEjUn0upSo`-y `c94D71JDfX8hzanT-ZpRWBn5oNX_RkStfSfkvTmY_kU`-a öwürýär. Barlaýjylar üçin düzgün ýönekeý: **setiriň heşini alnyşy ýaly alyň, soňra ony açyň.** Hiç haçan tersine däl.

![Meýdandan gol çekilen mazmundaky heşe çenli dört ädim](/blog/sd-jwt-vc-deep-dive/en/fig-disclosure.png)

## Näme üçin `_sd` toplumy tertiplenen we näme üçin ýalan heşler ýok?

Tamga `_sd`-ni baýtlaryň ösýän tertibinde tertipleýär. Tertiplenmedik ýagdaýynda heşler berijiniň meýdanlary işlän tertibinde, köplenç shema boýunça durardy. Şonda barlaýjy gizlin heşleri shemanyň meýdan sanawy bilen deňeşdirip, haýsy meýdanlaryň saklanandygyny bilip bilerdi.

RFC 9901 näçe meýdanyň gizlenendigini bulanyklaşdyrmak üçin hiç bir disclosure-a gabat gelmeýän ýalan ýazgylar bolan **ýalan heşlere (decoy digest)** hem rugsat berýär. Tamga olary gadagan edýär. `vct` açyk we görnüş metamaglumatlary her meýdany sanaýar, şonuň üçin san her niçigem bolsa açyk. Berijileriň arasynda ýalan heşleriň dürli sany özi barmak yzyna öwrülerdi we her ýalan heş QR koduna 43 nyşan goşýar. Hakyky gapdal kanal üýtgeýän disclosure toplumydyr, şonuň üçin Tamga-nyň gapjyk düzgünleri toruň gapjyklaryndan munuň ýerine toplumy her barlaýjy we görnüş üçin durnukly saklamagy talap edýär.

Profiliň ýene iki çägi: içki saýlap açmak iki dereje bilen çäklendirilen we toplumyň aýry elementlerini gizlemek entek ulanylmaýar.

## Eýesine baglamak nähili işleýär we KB-JWT nämä gol çekýär?

`cnf.jwk` resminama berlende telefonyň howpsuz enjamynda döredilen P-256 açarynyň açyk ýarysydyr (beriji ony gapjygyň açar subutnamasyndan göçürýär; [OpenID4VCI-a çuňňur seredilişi](/blog/openid4vci-deep-dive) ýazgysyna serediň). Hususy ýarysy hiç haçan enjamdan çykmaýar. Tamga-da `cnf`-siz resminama nädogry, KB-JWT-siz görkeziş hem şeýle. Standart açara baglamagy hökmany etmeýär; HAIP resminamada eýesine baglylyk bar wagty KB-JWT-ni talap edýär, Tamga bolsa her resminamany baglaýar.

Görkeziş wagtynda gapjyk diňe barlaýjynyň soran we adamyň tassyklan disclosure-laryny saklaýar, soňra KB-JWT goşýar:

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

`nonce` barlaýjynyň bir gezeklik çagyryşydyr, şonuň üçin ýazgy edilen görkezişi gaýtadan ulanyp bolmaýar. `aud` barlaýjynyň öňki goşulmasy bilen **doly** müşderi belgisidir (client identifier); OpenID4VP arkaly ol `x509_hash:` we onuň giriş sertifikatynyň barmak yzydyr ([OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive)). `iat` barlaýjynyň sagadyndan 300 sekundyň içinde bolmaly.

`sd_hash` araçynyň disclosure-y pozmagynyň öňüni alýan zatdyr:

```text title="sd_hash-a näme girýär"
sd_hash = base64url( SHA-256( ASCII bytes of
  "<issuer-signed JWT>~<disclosure 1>~<disclosure 2>~…~<disclosure n>~"
))
```

Diňe görkezilen disclosure-lar goşulýar we soňky `~` hem girişiň bir bölegi. `sd_hash` bolmasa, kimdir biri diplom görkezişinden `grade` disclosure-yny aýryp biler we iki gol hem barlagdan geçerdi.

Gerimi ýatlatmak: dogry KB-JWT resminama baglanan açary dolandyrýandygyňy subut edýär. Ol telefony haýsy adamyň saklaýandygyny subut etmeýär.

## `vct` we `vct#integrity` näme üçin gerek?

`vct` resminama görnüşini atlandyrýar. Tamga `urn:tamga:<domain>:<Type>:<major>` görnüşindäki URN-leri ulanýar, şeýlelikde domen ady üýtgese hem belgi üýtgemeýär. Görnüş metamaglumat resminamasy açyk katalogyň URN-den gabatlaşdyrýan HTTPS salgysynda ýerleşýär; 19-njy taslama muny "sanawdan (registry)" kesgitlemek diýip atlandyrýar (§5.3.2). Diplom üçin `https://schemas.tamga.network/v1/catalogue.json` `urn:tamga:edu:DiplomaCredential:1`-i onuň metamaglumat faýlyna we wektordaky `vct#integrity` bilen birmeňzeş setir bolan `sha256-Vu/H8v+3kpCQBmre8A8It13M6+pUpUqcLc08P57aKKw=` mazmun heşine gabatlaşdyrýar.

Bitewilik (integrity) bahasy W3C Subresource Integrity formatyny ulanýar: `sha256-` we ondan soň resminamanyň çig baýtlarynyň base64 SHA-256-sy. Çap edilen faýl baýtma-baýt birmeňzeş galmaly; hiç bir proksi ony täzeden formatlap bilmez. Standart `vct#integrity`-ni hökmany etmeýär. Tamga ony hökmany edýär, şeýlelikde barlaýja hiç haçan berijiniň gol çekende esaslanan görnüş kesgitlemesinden başga kesgitleme berlip bilinmez. Görnüş metamaglumatlary her meýdanyň `sd` syýasatynyň (`always`, `allowed`, `never`) ýazylýan ýeri hem bolup, Tamga berijileri gizlenmäge rugsat berlen her meýdany gizleýär.

## `status` meýdany nämä salgylanýar?

`status.status_list` indeksi (`idx`) we Token Status List-iň URI-sini saklaýar. Barlaýjy şol indeksdäki ýazgyny öňünden alan gol çekilen, gysylan sanawyndan okaýar: `0` güýjünde, `1` ýatyrylan we diňe shemasy togtatmaga rugsat berýän görnüşler üçin `2` togtadylan; `3` ulanylmaýar we ýatyrylan hasaplanýar. Tamga indeksleri tötänleýin paýlaýar, sanaw URI-lerini açyk däl görnüşde saklaýar we barlaýjylardan sanawlary tertip boýunça öňünden almagy garaşýar, şeýlelikde beriji resminamanyň haçan barlanýandygyny hiç haçan bilmeýär. 19-njy taslama salgylanýan ýagdaý sanawynyň JWT görnüşinde bolmagyny talap edýär. Mehanizm we gizlinlik düzgünleri [HAIP we Token Status List](/blog/haip-and-token-status-list) ýazgysynda.

## Barlaýjy SD-JWT VC-ni haýsy tertipde barlamaly?

Tamga her barlag ädimine hemişelik kod berýär we onuň barlaýjysy ilkinji şowsuz kody `failed_step` hökmünde gaýtarýar. Format gatlagy ilki işleýär:

| Kod | Barlag |
|---|---|
| A1 | `~` boýunça bölmek; soňky bölek boş däl-de KB-JWT bolmaly |
| A2 | başlyk: `alg` = `ES256`, `typ` = `dc+sd-jwt`, `x5c` bar |
| A3 | sanawdaky köke zynjyr, aralykdakylar CA, JWT goly dogry |
| A3b | berijiniň şahsyýeti `iss`-den däl, ýaprak sertifikatyň barmak yzyndan |
| A3c | ýaprak sertifikat ýatyrylmadyk |
| A3d | `cnf` bar |
| A4 | `_sd_alg` = `sha-256` |
| A5 | her disclosure: setiriň heşini al, ony `_sd`-de tap, soňra aç |
| A6 | KB-JWT: `cnf` bilen gol, `aud`, `nonce`, ±300 s içinde `iat`, `sd_hash` |
| A7 | `exp` geçmedik, `nbf` gelen |
| A8 | hiç bir heş iki gezek talap edilmedik, hiç bir disclosure görünýän meýdanyň üstünden ýazmaýar |

Olaryň ikisine ýene bir gezek seretmek gerek. A5 heşi `_sd`-de bolmadyk islendik disclosure-y ret edýär, sebäbi ony kabul etmek islendik adama berijiniň hiç haçan gol çekmedik meýdanlaryny goşmaga mümkinçilik bererdi. A8, mysal üçin, `iss` ýa-da `vct` atly disclosure-y ret edýär, sebäbi ol görünýän meýdanyň üstünden ýazardy.

Format gatlagyndan soň shema barlaglary (B1–B6: `vct`-ni kesgitlemek, bitewilik heşini katalog bilen deňeşdirmek, `extends`-e eýermek), gol çekilen ynam sanawyna garşy ynam barlaglary (C1–C4: beriji `iat` wagtynda sanawdamydy we şu görnüş üçin ygtyýarlymydy), ýatyrylyş (D1–D6) we barlaýjynyň öz syýasaty (E1–E4) gelýär. Netijäniň üç bahasy bar: kabul edildi, ret edildi ýa-da ýagdaý sanawy ýaly infrastruktura ýetip bolmasa kesgitsiz. "Häzir barlap bilemok" hiç haçan "nädogry" diýlip habar berilmeýär. Doly sanaw [barlag hatarynda](https://docs.tamga.network/specifications/verification-api).

Bularyň ählisini biziň ulanýan şol bir baýtlarymyza garşy işledip bilersiňiz: wektor, onuň bäş negatiw ýagdaýy (KB-JWT ýok, nädogry nonce, 301 sekunt tapawutly `iat`, gabat gelmeýän disclosure, möhleti geçen resminama) we işlediji açyk ammaryň [conformance bukjasynda](https://github.com/tamga-network/tamga-network/tree/main/conformance).

## Tamga profili standart bilen deňeşdirilende näme üýtgedýär?

| Tema | Standart | Tamga |
|---|---|---|
| Gol | birnäçe algoritm | diňe ES256 |
| `_sd_alg` | birnäçe | `sha-256`, aç-açan ýazylan |
| `typ` | `dc+sd-jwt` | `dc+sd-jwt`; `vc+sd-jwt` adatça ret edilýär |
| Beriji açary | `iss` metamaglumatlary, `x5c` ýa-da başga | `x5c` hökmany, kök goşulmaýar |
| Açara baglamak | hökmany däl | her resminama üçin hökmany |
| Ýalan heşler | rugsat berilýär | gadagan |
| `_sd` tertibi | kesgitlenmedik | tertiplenen |
| `vct#integrity` | hökmany däl | hökmany |
| Içki disclosure | rugsat berilýär | iň köp iki dereje |

Galan hemme zat RFC 9901-e we 19-njy taslama eýerýär we Tamga barlaýjysy Tamga-nyň öz berijisinden başgaça serializasiýa edilen disclosure-lary hem barlaýar, sebäbi ol toplumlaryň däl, setirleriň heşini alýar.

## Köp berilýän soraglar

### Tamga resminamalaryny barlamak üçin umumy SD-JWT kitaphanasyny ulanyp bolýarmy?

Hawa, eger ol disclosure setirleriniň heşini alnyşy ýaly alýan bolsa we açara baglamagy talap etmäge mümkinçilik berýän bolsa. Onuň üstüne Tamga-nyň profil barlaglaryny goşuň: diňe ES256, sanawdaky köke `x5c` zynjyry, ýaprak sertifikatdan berijiniň şahsyýeti, hökmany KB-JWT we `vct#integrity`. `@tamga-network/sd-jwt` we `@tamga-network/verifier` paketleri bularyň ählisini edýär.

### Näme üçin `aud` diňe host ady däl-de, doly müşderi belgisi?

Sebäbi gapjygyň barlan zady müşderi belgisidir. OpenID4VP arkaly barlaýjy `x509_hash:` we onuň sertifikat barmak yzy bilen tanalýar we KB-JWT-ni takyk şol baha baglamak görkezişiň başga hiç kime peýdasynyň ýokdugyny aňladýar.

### Meýdany gizlemek berijiniň goluny üýtgedýärmi?

Ýok. Gizlemek disclosure-y `~` bilen birleşdirilen setirden aýyrmagy aňladýar. Gol çekilen JWT-ä hiç haçan täzeden gol çekilmeýär we ol üýtgedilmeýär.

### Näme üçin 128 bitlik duzlar?

Doglan senesi ýaly entropiýasy pes bahanyň heşini başga ýagdaýda her mümkin seneni synap tapyp bolardy. Her disclosure üçin täze 16 baýtlyk duz muny mümkin däl edýär we şol bir meýdanyň iki resminamada şol bir heşi bermeginiň hem öňüni alýar.

## Çeşmeler

- [RFC 9901: Selective Disclosure for JSON Web Tokens, IETF, 2025-nji ýylyň noýabry](https://www.rfc-editor.org/rfc/rfc9901)
- [draft-ietf-oauth-sd-jwt-vc-19: SD-JWT-based Verifiable Digital Credentials, IETF, 2026-njy ýylyň awgusty](https://datatracker.ietf.org/doc/draft-ietf-oauth-sd-jwt-vc/)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [SD-JWT VC profili (SPEC-CRED-0002), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/sd-jwt-vc)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)
- [Shema katalogy (Type Metadata, vct#integrity), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/schema-catalog)
- [Laýyklyk wektorlary we işlediji, Tamga Network ammary](https://github.com/tamga-network/tamga-network/tree/main/conformance)
- [`@tamga-network/sd-jwt`, Tamga Network dokumentasiýasy](https://docs.tamga.network/packages/sd-jwt)

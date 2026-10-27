---
title: "OpenID4VP we DCQL-a çuňňur seredilişi: haýyşdan karara çenli"
slug: openid4vp-dcql-deep-dive
description: "Barlaýjy OpenID4VP 1.0 bilen resminamalary nähili soraýar we barlaýar: x509_hash bilen gol çekilen haýyşlar, DCQL, şifrlenen direct_post.jwt, A–E hatary."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Sources: OpenID4VP 1.0 Final (9 Jul 2025): client identifier prefixes §5.9.3 (x509_hash = base64url SHA-256 of leaf DER; origin reserved, wallet MUST NOT accept), DCQL §6 (credentials, claims, values, claim_sets, credential_sets, trusted_authorities), response encryption §8.3 (default enc A128GCM), Annex A (DC API, aud origin:), Annex B.2.6. HAIP 1.0 Final (24 Dec 2025) §5: x509_hash for signed requests, DCQL, ECDH-ES P-256, verifiers list A128GCM + A256GCM, wallets SHOULD use A256GCM, ephemeral keys per request, aki trusted_authorities, JAR with request_uri, direct_post.jwt, same-device redirect rules, DC API dc_api.jwt. SPEC-PROTO-0002 v1.0.0: PV1–PV14, over-asking, credential_sets limits, wallet selection behaviour, error table. SPEC-API-0001: A–E codes, three outcomes, AP3. ADR-0034 (x509_hash, SAN check, dns_name). concepts/presentation (channels: QR/link live, DC API verifier ready / no wallet connection yet). Code: packages/verifier request.ts (request_uri QR, aud self-issued, RESPONSE_ENC both), wallet-core jwe.ts (A256GCM preferred), apps/verify (redirect_uri after response). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0 barlaýjynyň gapjykdan resminamalary soraýan we gol çekilen, eýesine baglanan görkezişi yzyna alýan usulydyr. Tamga-da barlaýjy özüni sertifikatynyň heşi (`x509_hash`) bilen tanadýan, näme isleýändigini **DCQL** soragy bilen aýdýan we bir gezeklik şifrlemek açaryny berýän **gol çekilen haýyş obýektini** iberýär; gapjyk barlaýja iberilýän şifrlenen `vp_token` bilen jogap berýär (`direct_post.jwt`). Soňra barlaýjy format, shema, ynam, ýatyrylyş we syýasat barlaglarynyň kesgitli hataryny işledýär we üç netijäniň birine gelýär.

OpenID4VP 1.0 2025-nji ýylyň 9-njy iýulynda, HAIP 1.0 2025-nji ýylyň 24-nji dekabrynda Final boldy. Tamga-nyň profili [SPEC-PROTO-0002](https://docs.tamga.network/specifications/openid4vp). Öňki taslamalardaky Presentation Exchange (`presentation_definition`) goldanmaýar: ony göterýän haýyş ret edilýär.

> **Bellik:** Ýönekeýleşdirilen mysallar. Hostlar nusga, JWT-ler gysgaldylan, gollar we açarlar aýrylan.

## Haýyş gapjyga nähili ýetýär?

Başga enjamda barlaýjy QR koduny görkezýär; şol bir telefonda ol salgyny açýar. Islendik ýagdaýda mazmun kiçi, sebäbi haýyş obýektiniň özi salgylanma arkaly alynýar (HAIP-iň talap edişi ýaly `request_uri` bilen JAR):

```text title="QR kodunyň ýa-da salgynyň göterýän zady"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Gapjyk `request_uri`-ni alýar we `typ: oauth-authz-req+jwt`, `alg: ES256` hem-de `x5c`-de barlaýjynyň sertifikat zynjyry bolan JWT alýar:

```json title="Ýönekeýleşdirilen mysal: gol çekilen haýyş obýektiniň mazmuny"
{
  "aud": "https://self-issued.me/v2",
  "iat": 1791446400,
  "exp": 1791446700,
  "client_id": "x509_hash:Uvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk",
  "response_type": "vp_token",
  "response_mode": "direct_post.jwt",
  "response_uri": "https://verifier.example.org/vp/response",
  "nonce": "n-0S6_WzA2Mj",
  "state": "af0ifjsldkj",
  "dcql_query": { "credentials": ["… see below …"] },
  "client_metadata": {
    "jwks": { "keys": [{ "kty": "EC", "crv": "P-256", "use": "enc", "alg": "ECDH-ES", "kid": "r1", "x": "…", "y": "…" }] },
    "encrypted_response_enc_values_supported": ["A128GCM", "A256GCM"],
    "vp_formats_supported": {
      "dc+sd-jwt": { "sd-jwt_alg_values": ["ES256"], "kb-jwt_alg_values": ["ES256"] },
      "mso_mdoc": { "issuerauth_alg_values": [-7], "deviceauth_alg_values": [-7] }
    }
  }
}
```

`client_metadata.jwks`-däki şifrlemek açary HAIP-iň talap edişi ýaly wagtlaýyn, diňe şu haýyş üçin döredilen. `nonce`-yň azyndan 128 bit entropiýasy bar we ol bir gezek kabul edilýär. HAIP barlaýjylardan `A128GCM`-i hem, `A256GCM`-i hem sanamagy talap edýär; ikisini hem goldaýan gapjyk `A256GCM`-i saýlamaly.

## `x509_hash` näme we gapjyk näme barlaýar?

`x509_hash` müşderi belgisi haýyşa gol çeken DER kodly **ýaprak** sertifikatyň base64url SHA-256-sydyr (OpenID4VP 1.0 §5.9.3). HAIP ony gol çekilen haýyşlar üçin barlaýjynyň ulanmaly we gapjygyň kabul etmeli ýeke-täk öňki goşulmasy edýär; Tamga-nyň munuň üçin öz taslamasyny näme üçin üýtgedendigi [HAIP we Token Status List](/blog/haip-and-token-status-list) ýazgysynda. Ony özüňiz hasaplap bilersiňiz:

```bash title="x509_hash müşderi belgisini hasaplamak"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Adama bir zat görkezmezden öň Tamga-nyň düzgünlerine eýerýän gapjyk (salgylanma kitaphanasy `@tamga-network/wallet-core`):

1. haýyşyň goluny we `x5c` zynjyryny barlaýar we `client_id`-däki heşiň ýaprak sertifikata gabat gelýändigini barlaýar;
2. `response_uri`-niň domeniniň sertifikatyň SAN atlarynyň biridigini barlaýar; bu köne `x509_san_dns` öňki goşulmasynyň howpsuzlyk häsiýetini saklaýar;
3. `exp`-i (hökmany, geçmedik), `iat`-y (geljekde 60 sekuntdan köp däl) we `aud`-y barlaýar;
4. barmak yzyny gol çekilen ynam sanawyndan gözleýär. Tamga-nyň daýanýan tarap ýazgylarynda `client_id` bilen şol bir baha we hemişelik `dns_name` bar, sebäbi sertifikat täzelenende heş üýtgeýär;
5. soralan her meýdany barlaýjynyň hasaba alnan gerimi bilen deňeşdirýär.

Sanawda bolmadyk barlaýjy akymy bökdeýän duýduryş ekranyny alýar. Geriminden daşardaky meýdany soraýan sanawdaky barlaýjy gerimden daşardaky meýdanlar bellenen we paýlaş düwmesi üç sekunt gijikdirilen artyk soramak duýduryşyny alýar. Iki ýagdaý hem doly gadagan edilmeýär: gapjyk adamyň wekili, onuň gapy sakçysy däl. `redirect_uri` öňki goşulmaly (gol çekilmedik) haýyşlar, şeýle hem [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) boýunça `x509_san_dns` haýyşlary ret edilýär.

![Gol çekilen haýyşdan şifrlenen jogaba çenli](/blog/openid4vp-dcql-deep-dive/en/fig-request.png)

## DCQL soragyny nähili ýazmaly?

DCQL (Digital Credentials Query Language) barlaýjynyň isleýän resminamalaryny we olaryň her biri üçin meýdanlary sanaýar. Talyp arzanladyşyna bir meýdan gerek:

```json title="DCQL: talyp arzanladyşy"
{
  "credentials": [{
    "id": "student",
    "format": "dc+sd-jwt",
    "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
    "claims": [{ "path": ["is_enrolled"], "values": [true] }]
  }]
}
```

`meta.vct_values` görnüşi atlandyrýar; Tamga onsuz `dc+sd-jwt` soragyny ret edýär. `values` meýdany şerte öwürýär: resminama diňe `is_enrolled` `true` bolsa gabat gelýär. Gapjyk `is_enrolled`-i açýar we başga hiç zady açmaýar.

Işe ýüz tutmak diplomy **ýa-da** häzirki talyp şahadatnamasyny kabul edip we goşmaça meýdany sorap biler:

```json title="DCQL: credential_sets bilen alternatiwalar we claim_sets bilen goşmaça meýdan"
{
  "credentials": [
    {
      "id": "diploma",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:DiplomaCredential:1"] },
      "claims": [
        { "id": "g", "path": ["is_graduate"], "values": [true] },
        { "id": "q", "path": ["qualification_title"] },
        { "id": "t", "path": ["thesis_title"] }
      ],
      "claim_sets": [["g", "q", "t"], ["g", "q"]]
    },
    {
      "id": "student",
      "format": "dc+sd-jwt",
      "meta": { "vct_values": ["urn:tamga:edu:StudentCredential:1"] },
      "claims": [{ "path": ["is_enrolled"], "values": [true] }]
    }
  ],
  "credential_sets": [
    { "options": [["diploma"], ["student"]], "required": true }
  ]
}
```

`@tamga-network/wallet-core` muny OpenID4VP §6.4 boýunça nähili okaýar:

- Hökmany toplumda ol barlaýjynyň tertibinde kanagatlandyryp bilýän **ilkinji** görnüşini teklip edýär; adam kanagatlandyrylýan başga görnüşi saýlap biler. Diňe saýlanan görnüş iberilýär.
- Hökmany däl toplum (`required: false`) adatça öçük we diňe adam ony açsa paýlaşylýar.
- `claim_sets` bilen resminamanyň kanagatlandyryp bilýän diňe ilkinji utgaşmasy açylýar. Bu ýerde dissertasiýa ady bolan diplom üç meýdan, ady bolmadyk diplom bolsa iki meýdan iberýär.
- Resminama soralan meýdany ýetmezçilik bilen **hiç haçan** iberilmeýär. Eger `thesis_title` ýönekeý `claims` sanawynda bolsa, dissertasiýasyz diplom asla gabat gelmezdi; `claim_sets` hut şonuň üçin bar.
- Haýyşda iň köp üç resminama we iki `credential_sets` ýazgysy bolup biler, şeýlelikde razylyk ekrany düşnükli galýar.

mdoc üçin ýol `[namespace, element]`, görnüş bolsa `meta.doctype_value`-a ýazylýar ([ISO mdoc-a çuňňur seredilişi](/blog/iso-mdoc-deep-dive)). HAIP `aki` görnüşli `trusted_authorities`-iň goldawyny hem talap edýär; ol resminama soragyny zynjyrynda belli Authority Key Identifier bolan berijiler bilen çäklendirýär. Tamga-nyň barlaýjysy we gapjygy ikisi hem muny durmuşa geçirýär.

## Gapjyk yzyna näme iberýär?

`vp_token` her DCQL `id`-den görkezişleriň toplumyna gabatlykdyr:

```json title="Ýönekeýleşdirilen mysal: şifrlemezden öň vp_token"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Her SD-JWT VC görkezişi `aud`-y **doly** müşderi belgisi (`x509_hash:Uvo3…`), `nonce`-y haýyşyň nonce-y bolan we `sd_hash`-y takyk görkezilen disclosure-lary öz içine alýan KB-JWT bilen gutarýar ([SD-JWT VC-ä çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). mdoc üçin baha enjam goly OpenID4VP handover-yny öz içine alýan base64url `DeviceResponse`-dir.

`direct_post.jwt` bilen tutuş obýekt barlaýjynyň wagtlaýyn açaryna JWE hökmünde şifrlenýär (P-256-da `alg: ECDH-ES`, `enc: A256GCM` ýa-da `A128GCM`) we forma meýdany hökmünde iberilýär:

```http title="Ýönekeýleşdirilen mysal: şifrlenen jogap"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS eýýäm bar wagty näme üçin şifrlemeli? Görkeziş şahsy maglumat göterýär, TLS nokady bilen programmanyň arasynda bolsa haýyşlaryň mazmunyny görüp bilýän ters proksiler, gorag diwarlary we žurnallar bar. JWE bilen ony diňe wagtlaýyn açaryň eýesi okap biler. Tamga şifrlenmedik jogap görnüşini ulanmaýar.

Adam ret etse, gapjyk sebäpsiz `access_denied` gaýtarýar. "Bu resminama mende ýok" bilen "men ony paýlaşmazlygy saýladym" birmeňzeş görünmeli, ýogsam barlaýjy dürli soraglary iberip, adamda näme bardygynyň kartasyny düzüp bilerdi.

## Barlaýjy karara nähili gelýär?

Tamga-nyň barlaýjysy ädimleri kesgitli tertipde işledýär we ilkinji şowsuzlykda durup, onuň hemişelik koduny `failed_step` hökmünde gaýtarýar:

| Gatlak | Kodlar | Näme barlanýar |
|---|---|---|
| A, format | A1–A8 | beriji goly we zynjyry, ýaprak sertifikatdan berijiniň şahsyýeti, disclosure heşleri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), möhlet |
| B, shema | B1–B6 | `vct` kesgitlendi, `vct#integrity` katalog bilen gabat gelýär, `extends` zynjyry |
| C, ynam | C1–C4 | beriji resminamanyň `iat` wagtynda sanawda we şu görnüş üçin ygtyýarly |
| D, ýatyrylyş | D1–D6 | öňünden alnan keşden ýagdaý sanawy, gol, täzelik, labyr, `idx`-däki bitler |
| E, syýasat | E1–E4 | ynamlylyk çägi, her soralan meýdan açyldy, gerimden geçilmedi, audit ýazgysy |

Netije `ACCEPTED`, `REJECTED` ýa-da `INDETERMINATE`. Üçünjisi infrastruktura ýetip bolmandygyny (mysal üçin köne ýagdaý sanawy) aňladýar we resminama garşy hiç zat aýtmaýar; ol ret edilmekden başgaça görkezilmeli. Netije obýekti açylan meýdanlaryň diňe **atlaryny** sanaýar, hiç haçan bahalaryny däl, sebäbi ol audit žurnalyna girýär. Doly sanaw [barlag hatarynda](https://docs.tamga.network/specifications/verification-api).

![Bäş barlag gatlagy](/blog/openid4vp-dcql-deep-dive/en/fig-pipeline.png)

## Şol bir enjammy ýa-da enjamlar arasymy?

| | Şol bir enjam | Enjamlar arasy |
|---|---|---|
| Nähili başlaýar | telefonyň öz brauzerindäki salgy ýa-da düwme | başga ekrandaky QR kody |
| Jogapdan soň | barlaýjy `redirect_uri` gaýtarýar, gapjyk oňa eýerýär | beýleki ekrandaky sahypa netijäni öz arka tarapyndan alýar |
| Fişinge garşy durnuklylyk | ugrukdyrma haýyşy başlan sessiýa gaýdyp gelýär | has gowşak: QR koduny başga birine geçirip bolýar |

HAIP iki tarapdan hem şol bir enjam akymyny goldamagy talap edýär we barlaýjy sessiýa baglanyşygyna daýanmaýan bolmasa ony maslahat berýär. Şol akymda ugrukdyrma hiç haçan gaýdyp gelmese ýa-da başga sessiýa gelse, barlaýjy görkezişi ret etmeli. Tamga-nyň ýerleşdirilen barlaýjysy her jogapdan soň `redirect_uri` gaýtarýar we toruň gapjyklary oňa eýerýär. Saýtyň protokolyň özüni ýazmazdan muny nähili birikdirýändigi [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda.

## Brauzeriň Digital Credentials API-si barada näme?

W3C Digital Credentials API bilen brauzeriň özi `response_mode: dc_api.jwt` ulanyp, haýyşy gapjyga we jogaby yzyna eltýär. Şonda görkezişiň auditoriýasy `origin:https://verifier.example.org` görnüşinde ýazylan sahypanyň gelip çykyşy (origin) bolýar we ony brauzeriň özi berýär: fişing saýty başga saýtyň gelip çykyşyny talap edip bilmeýär. Gapjyk haýyşyň içinde `origin:`-i müşderi belgisi hökmünde hiç haçan kabul etmeli däl. Tamga bu akymda hem `x509_hash` bilen gol çekilen haýyşy maslahat berýär, sebäbi gelip çykyşa baglamak fişingi çözýär, `x509_hash` bolsa sanawdan gözlemegi we artyk soramak barlagyny mümkin edýär.

Häzirki ýagdaý: QR we salgy arkaly görkeziş işleýär. Tamga barlaýjysy ony goldaýan brauzerlerde adatça Digital Credentials API-ni ulanýar, iş stolunda bolsa ätiýaçlyk hökmünde QR kody bar. Gapjyk tarapynda Tamga Wallet-iň munuň üçin Android kody ýazyldy, ýöne entek programma girizilmedi we enjamda synagdan geçirilmedi; iPhone goldawy entek ýok.

## Köp berilýän soraglar

### Näme üçin köp öňki ýerleşdirmeler ýaly `x509_san_dns`-i ulanmaly däl?

HAIP 1.0 gol çekilen haýyşlar üçin `x509_hash`-y talap edýär we HAIP-a eýerýän gapjyk ony kabul etmeli. Tamga `x509_san_dns`-iň peýdaly bölegini saklaýar: jogap salgysy gol sertifikatynda sanalan domende bolmaly.

### Barlaýjy meniň haýsy meýdanlary ret edendigimi öwrenýärmi?

Ol haýsy meýdanlaryň gelendigini öwrenýär. Hökmany toplumy kanagatlandyryp bolmasa ýa-da adam ret etse, gapjyk sebäbini aýtman `access_denied` gaýtarýar.

### Birnäçe shema wersiýasyny henizem sorap bolýarmy?

Hawa. Kabul edilen her wersiýany `vct_values`-a goýuň, mysal üçin `urn:tamga:edu:DiplomaCredential:1` we `:2`. Ikinji wersiýa peýda bolandan soň Tamga azyndan ikisini sanamagy maslahat berýär, şeýlelikde öňki eýeler çetde galmaz.

### `transaction_data` goldanýarmy?

Entek ýok. Görkezişi belli bir geleşige baglamak maliýe we ygtyýarlandyryş ssenariýalary üçin meýilleşdirilýär; bilim ssenariýalaryna bu gerek däl.

## Çeşmeler

- [OpenID for Verifiable Presentations 1.0, Final, 2025-nji ýylyň 9-njy iýuly](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/openid4vp)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)
- [ADR-0034: HAIP 1.0 laýyklygy, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Görkeziş, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/presentation)
- [Serwerde barlamak, Tamga Network dokumentasiýasy](https://docs.tamga.network/guides/verify-on-server)

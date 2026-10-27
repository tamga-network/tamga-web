---
title: "OpenID4VP we DCQL-a çuňňur seredilişi: haýyşdan karara çenli"
slug: openid4vp-dcql-deep-dive
description: "Barlaýjynyň OpenID4VP 1.0 bilen resminamalary nähili soraýandygyny we barlaýandygyny düşündirýäris: x509_hash bilen gol çekilen haýyş, DCQL, şifrlenen direct_post.jwt we A–E barlag tertibi."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: add-verification-to-your-site, sd-jwt-vc-deep-dive, iso-mdoc-deep-dive, haip-and-token-status-list, openid4vci-deep-dive
---

<!-- Sources: OpenID4VP 1.0 Final (9 Jul 2025): client identifier prefixes §5.9.3 (x509_hash = base64url SHA-256 of leaf DER; origin reserved, wallet MUST NOT accept), DCQL §6 (credentials, claims, values, claim_sets, credential_sets, trusted_authorities), response encryption §8.3 (default enc A128GCM), Annex A (DC API, aud origin:), Annex B.2.6. HAIP 1.0 Final (24 Dec 2025) §5: x509_hash for signed requests, DCQL, ECDH-ES P-256, verifiers list A128GCM + A256GCM, wallets SHOULD use A256GCM, ephemeral keys per request, aki trusted_authorities, JAR with request_uri, direct_post.jwt, same-device redirect rules, DC API dc_api.jwt. SPEC-PROTO-0002 v1.0.0: PV1–PV14, over-asking, credential_sets limits, wallet selection behaviour, error table. SPEC-API-0001: A–E codes, three outcomes, AP3. ADR-0034 (x509_hash, SAN check, dns_name). concepts/presentation (channels: QR/link live, DC API verifier ready / no wallet connection yet). Code: packages/verifier request.ts (request_uri QR, aud self-issued, RESPONSE_ENC both), wallet-core jwe.ts (A256GCM preferred), apps/verify (redirect_uri after response). -->

OpenID4VP (OpenID for Verifiable Presentations) 1.0 barlaýjynyň gapjykdan resminama soramak üçin ulanýan protokolydyr. Barlaýjy bu protokol arkaly gol çekilen we resminama eýesiniň enjamyna bagly görkezişi alýar. Tamga-da barlaýjy gapjyga **gol çekilen haýyş obýektini** iberýär. Bu obýektde ol özüni sertifikatynyň heşi (`x509_hash`) bilen tanyşdyrýar, näme isleýändigini **DCQL** soragy bilen aýdýar we bir gezeklik şifrleme açaryny berýär. Gapjyk hem şifrlenen `vp_token` bilen jogap berýär we bu jogaby göni barlaýja iberýär (`direct_post.jwt`). Soňra barlaýjy format, shema, ynam, ýatyrylyş we syýasat barlaglaryndan ybarat kesgitli tertibi işledýär we üç netijäniň birine gelýär.

OpenID4VP 1.0 2025-nji ýylyň 9-njy iýulynda, HAIP 1.0 bolsa 2025-nji ýylyň 24-nji dekabrynda Final boldy. Tamga-nyň profili [SPEC-PROTO-0002](https://docs.tamga.network/specifications/openid4vp) resminamasynda ýazylan. Köne taslamalardaky Presentation Exchange (`presentation_definition`) goldanmaýar we bu meýdany göterýän haýyşlar ret edilýär.

> **Bellik:** Mysallar ýönekeýleşdirildi. Salgylar mysal bahalardyr, JWT-ler gysgaldyldy, gollar we açarlar bolsa görkezilmeýär.

## Haýyş gapjyga nähili ýetýär?

Adam başga enjamda bolsa, barlaýjy QR kody görkezýär, şol bir telefonda bolsa salgyny açýar. Iki ýagdaýda hem geçirilýän maglumat kiçi bolýar, sebäbi haýyş obýektiniň özi aýry salgydan alynýar. HAIP-iň talap edişi ýaly munuň üçin `request_uri` bilen JAR ulanylýar:

```text title="QR kodunyň ýa-da salgynyň göterýän zady"
openid4vp://?client_id=x509_hash%3AUvo3HtuIxuhC92rShpgqcT3YXwrqRxWEviRiA0OZszk
            &request_uri=https%3A%2F%2Fverifier.example.org%2Frequest%2F7Kc2
```

Gapjyk `request_uri` salgysyna ýüzlenýär we JWT alýar. Bu JWT-niň `typ` bahasy `oauth-authz-req+jwt`, `alg` bahasy `ES256` bolýar we barlaýjynyň sertifikat zynjyry `x5c` meýdanynda ýerleşýär:

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

`client_metadata.jwks` içindäki şifrleme açary wagtlaýyn bolup, HAIP-iň talap edişi ýaly diňe şu haýyş üçin döredilýär. `nonce` azyndan 128 bitlik tötänleýinligi göterýär we diňe bir gezek kabul edilýär. HAIP barlaýjynyň hem `A128GCM`-i, hem `A256GCM`-i sanawa goşmagyny talap edýär. Ikisini hem goldaýan gapjyk `A256GCM`-i saýlamaly.

## `x509_hash` näme we gapjyk näme barlaýar?

`x509_hash` müşderi belgisi haýyşa gol çeken **ýaprak** sertifikatyň DER kodlamasynyň SHA-256 heşiniň base64url görnüşidir (OpenID4VP 1.0 §5.9.3). HAIP gol çekilen haýyşlarda barlaýjynyň ulanmaly we gapjygyň kabul etmeli ýeke-täk prefiksi hökmünde muny kesgitleýär. Tamga-nyň şu sebäpli dizaýnyny nähili üýtgedendigini [HAIP we Token Status List](/blog/haip-and-token-status-list) ýazgysynda düşündirdik. Bu bahany özüňiz hem hasaplap bilersiňiz:

```bash title="x509_hash müşderi belgisini hasaplamak"
openssl x509 -in verifier-leaf.pem -outform DER \
  | openssl dgst -sha256 -binary \
  | basenc --base64url | tr -d '=' \
  | sed 's/^/x509_hash:/'
```

Tamga-nyň düzgünlerine eýerýän gapjyk adama bir zat görkezmezden öň aşakdaky barlaglary geçirýär. Bu düzgünleriň salgylanma kitaphanasy `@tamga-network/wallet-core`.

1. Haýyşyň goluny we `x5c` zynjyryny barlaýar, `client_id` içindäki heşiň ýaprak sertifikat bilen gabat gelýändigine seredýär.
2. `response_uri` salgysyndaky domeniň sertifikatyň SAN meýdanyndaky atlaryň biridigini barlaýar. Şeýlelikde köne `x509_san_dns` prefiksiniň üpjün edýän howpsuzlygy saklanýar.
3. `exp` bahasynyň bardygyna we geçmändigine, `iat` bahasynyň iň köp 60 sekunt öňde bolmagyna we `aud` bahasynyň dogrudygyna seredýär.
4. Barmak yzyny gol çekilen ynam sanawynda gözleýär. Tamga-daky barlaýjy ýazgylary `client_id` bilen şol bir bahany göterýär. Sertifikat her täzelenende heş üýtgeýändigi üçin ýazgylarda goşmaça hemişelik `dns_name` hem bolýar.
5. Soralýan her meýdany barlaýjynyň hasaba alnan gerimi bilen deňeşdirýär.

Sanawda ýok barlaýjy işi ýarym ýolda kesýän duýduryş ekrany bilen garşylanýar. Sanawda bolup, geriminden daşary meýdan soraýan barlaýjy üçin hem artykmaç maglumat haýyşy barada duýduryş çykýar. Bu ýagdaýda gerimden daşary meýdanlar aýratyn bellenýär we paýlaş düwmesi üç sekuntdan soň işjeňleşýär. Iki ýagdaýda hem paýlaşmak doly gadagan edilmeýär, sebäbi gapjyk adamyň ýerine karar berýän garawul däl-de, onuň adyndan hereket edýän guraldyr. `redirect_uri` prefiksi bilen gelýän gol çekilmedik haýyşlar bolsa ret edilýär. [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) boýunça `x509_san_dns` prefiksli haýyşlar hem ret edilýär.

![Gol çekilen haýyşdan şifrlenen jogaba çenli](/blog/openid4vp-dcql-deep-dive/en/fig-request.png)

## DCQL soragyny nähili ýazmaly?

DCQL (Digital Credentials Query Language) barlaýjynyň isleýän resminamalaryny we her resminamadan haýsy meýdanlary isleýändigini sanaýar. Talyp arzanladyşy üçin bir meýdan ýeterlik:

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

`meta.vct_values` resminama görnüşini görkezýär we Tamga bu meýdan bolmazdan gelen `dc+sd-jwt` soragyny ret edýär. `values` bolsa meýdany şerte öwürýär. Resminama diňe `is_enrolled` bahasy `true` bolanda gabat gelýär. Gapjyk hem diňe `is_enrolled` meýdanyny açýar, başga hiç bir meýdany açmaýar.

Işe ýüz tutmakda bolsa diplom **ýa-da** güýjündäki talyp resminamasy kabul edilip we islege bagly meýdan hem soralyp bilner:

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

`@tamga-network/wallet-core` bu soragy OpenID4VP §6.4 boýunça şeýle düşündirýär:

- Hökmany toplumda barlaýjynyň görkezen tertibi boýunça kanagatlandyryp bilýän **ilkinji** saýlawyny teklip edýär. Adam kanagatlandyrylyp bilinýän başga saýlawy hem saýlap biler. Barlaýja diňe saýlanan saýlaw iberilýär.
- Islege bagly toplum (`required: false`) adaty ýagdaýda ýapyk we diňe adam ony açanda paýlaşylýar.
- `claim_sets` bar bolsa, resminamanyň kanagatlandyryp bilýän ilkinji meýdan utgaşmasy açylýar. Bu mysalda dissertasiýa ady bolan diplom üç meýdany, dissertasiýa ady bolmadyk diplom bolsa iki meýdany iberýär.
- Soralýan meýdanlaryň biri ýetmeýän resminama **hiç haçan** iberilmeýär. `thesis_title` adaty `claims` sanawynda bolsady, dissertasiýasyz diplom soraga asla gabat gelmezdi. `claim_sets` edil şu ýagdaý üçin bar.
- Razylyk ekranynyň düşnükli bolmagy üçin bir haýyşda iň köp üç resminama we iki `credential_sets` ýazgysy bolup biler.

mdoc-da meýdan ýoly `[at giňişligi, element]` görnüşinde bolýar we resminama görnüşi `meta.doctype_value` meýdanyna ýazylýar ([ISO mdoc-a çuňňur seredilişi](/blog/iso-mdoc-deep-dive)). HAIP goşmaça `aki` görnüşli `trusted_authorities` goldawyny hem talap edýär. Bu meýdan resminama soragyny sertifikat zynjyrynda belli bir Authority Key Identifier bolan guramalar bilen çäklendirýär. Tamga-nyň barlaýjysy hem, gapjyk kitaphanasy hem muny goldaýar.

## Gapjyk yzyna näme iberýär?

`vp_token` her DCQL `id` bahasyny görkezişler massiwi bilen gabat getirýän kartadyr:

```json title="Ýönekeýleşdirilen mysal: şifrlemezden öň vp_token"
{
  "vp_token": {
    "student": ["eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~eyJhbGciOiJFUzI1NiIsInR5cCI6ImtiK2p3dCJ9…"]
  },
  "state": "af0ifjsldkj"
}
```

Her SD-JWT VC görkezişi KB-JWT bilen gutarýar. Bu KB-JWT-niň `aud` bahasy **doly** müşderi belgisidir (`x509_hash:Uvo3…`), `nonce` bahasy haýyşyň nonce bahasydyr we `sd_hash` bahasy hem edil görkezilen disclosure-lary öz içine alýar ([SD-JWT VC-a çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). mdoc-da bolsa baha base64url görnüşindäki `DeviceResponse` gurluşydyr we bu gurluşdaky enjam goly OpenID4VP el gysyşmasyny öz içine alýar.

`direct_post.jwt` ulanylanda obýektiň tutuşlygyna barlaýjynyň wagtlaýyn açaryna görä JWE hökmünde şifrlenýär. Bu ýerde `alg: ECDH-ES` (P-256) we `enc: A256GCM` ýa-da `A128GCM` ulanylýar. Şifrlenen obýekt forma meýdany hökmünde iberilýär:

```http title="Ýönekeýleşdirilen mysal: şifrlenen jogap"
POST /vp/response HTTP/1.1
Host: verifier.example.org
Content-Type: application/x-www-form-urlencoded

response=eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkdDTSIsImtpZCI6InIxIiwiZXBrIjp7…

HTTP/1.1 200 OK
Content-Type: application/json

{ "redirect_uri": "https://verifier.example.org/p/9f3c?st=…" }
```

TLS eýýäm bar bolsa-da, jogaby aýratyn şifrlemegimiziň sebäbi bar. Görkeziş şahsy maglumat göterýär we TLS baglanyşygynyň gutarýan nokady bilen programmanyň arasynda haýyşyň mazmunyny görüp bilýän ters proksi serwerler, firewall-lar we žurnallar bolýar. JWE ulanylanda görkezişi diňe wagtlaýyn açaryň eýesi okap bilýär. Tamga şifrlenmedik jogap görnüşini ulanmaýar.

Adam paýlaşmakdan ýüz öwürse, gapjyk sebäbini görkezmezden `access_denied` gaýtarýar. "Bu resminama mende ýok" bilen "paýlaşmazlygy saýladym" jogaplary birmeňzeş görünmeli. Ýogsam barlaýjy dürli soraglar iberip, adamyň elinde haýsy resminamalaryň bardygyny anyklap bilerdi.

## Barlaýjy karara nähili gelýär?

Tamga-nyň barlaýjysy ädimleri hemişe şol bir tertipde işledýär. Ilkinji şowsuz ädimde saklanýar we şol ädimiň hemişelik koduny `failed_step` meýdanynda gaýtarýar:

| Gatlak | Kodlar | Näme barlanýar |
|---|---|---|
| A, format | A1–A8 | guramanyň goly we zynjyry, ýaprak sertifikatdan alynýan guramanyň şahsyýeti, disclosure heşleri, KB-JWT (`aud`, `nonce`, `iat`, `sd_hash`), güýjünde bolýan möhleti |
| B, shema | B1–B6 | `vct` kesgitlenýär, `vct#integrity` katalog bilen gabat gelýär, `extends` zynjyry barlanýar |
| C, ynam | C1–C4 | gurama resminamanyň `iat` pursatynda sanawda we şu görnüş üçin ygtyýarly |
| D, ýatyrylyş | D1–D6 | öňünden ýüklenen ýagdaý sanawy, gol, täzelik, labyr, `idx` ornundaky bitler |
| E, syýasat | E1–E4 | ynamlylyk çägi, soralan her meýdanyň açylmagy, gerimden geçilmezligi, audit ýazgysy |

Netije `ACCEPTED`, `REJECTED` ýa-da `INDETERMINATE` bolýar. Üçünji netije, mysal üçin, ýagdaý sanawy gaty köne bolany üçin infrastruktura baryp bolmandygyny görkezýär we resminama barada ýaramaz hiç zat aýtmaýar. Şonuň üçin ony ret jogabyndan tapawutly görkezmeli. Netije obýekti audit ýazgysyna girýändigi üçin açylan meýdanlaryň diňe **atlaryny** göterýär we olaryň bahalaryny hiç haçan göterenok. Kodlaryň doly sanawyny [barlag tertibi](https://docs.tamga.network/specifications/verification-api) resminamasynda tapyp bilersiňiz.

![Bäş barlag gatlagy](/blog/openid4vp-dcql-deep-dive/en/fig-pipeline.png)

## Şol bir enjammy ýa-da enjamlar arasymy?

| | Şol bir enjam | Enjamlar arasy |
|---|---|---|
| Nähili başlaýar | telefonyň öz brauzerindäki salgy ýa-da düwme bilen | başga ekranda görkezilýän QR kody bilen |
| Jogapdan soň | barlaýjy `redirect_uri` gaýtarýar we gapjyk şol salga geçýär | beýleki ekrandaky sahypa netijäni öz serwerinden alýar |
| Fişinge garşy durnuklylyk | gönükdirme haýyşy başlan sessiýa gaýdyp gelýär | has gowşak, sebäbi QR kody başga birine geçirip bolýar |

HAIP iki tarapyň hem şol bir enjam akymyny goldamagyny talap edýär we barlaýjy sessiýa baglanyşyga daýanmaýan bolsa, bu akymy maslahat berýär. Bu akymda gönükdirme asla yzyna gaýtmasa ýa-da başga sessiýa gaýtsa, barlaýjy görkezişi ret etmeli. Tamga-nyň ýerleşdirilen barlaýjysy her jogapdan soň `redirect_uri` gaýtarýar we tordaky gapjyklar şol salga geçýär. Saýtyň protokoly özi ýazmazdan muny nähili gurup biljekdigini [Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň](/blog/add-verification-to-your-site) ýazgysynda düşündirdik.

## Brauzeriň Digital Credentials API-si nähili ýagdaýda?

W3C Digital Credentials API ulanylanda haýyşy gapjyga, jogaby bolsa yzyna göterýän brauzeriň özüdir. Bu akymda `response_mode: dc_api.jwt` ulanylýar. Görkezişiň alyjysy hem sahypanyň gelip çykyşy (origin) bolýar we `origin:https://verifier.example.org` görnüşinde ýazylýar. Bu bahany brauzer özi berýändigi üçin fişing saýty başga saýtyň gelip çykyşyny öz gelip çykyşy hökmünde görkezip bilmeýär. Gapjyk hem haýyşyň içinde müşderi belgisi hökmünde gelýän `origin:` bahasyny hiç haçan kabul etmeli däl. Tamga bu akymda hem `x509_hash` bilen gol çekilen haýyşy ulanmagy maslahat berýär. Gelip çykyşa baglamak fişing meselesini çözýär, ýöne ynam sanawyndaky ýazgynyň tapylmagyny we artykmaç maglumat haýyşynyň barlanmagyny mümkin edýän zat `x509_hash`.

Häzirki ýagdaýa seretsek, QR kody we salgy arkaly görkeziş eýýäm işleýär. Tamga-nyň barlaýjysy goldaýan brauzerlerde Digital Credentials API-ni adaty ýagdaýda ulanýar we iş stolunda QR kody ätiýaçlyk ýol hökmünde hödürleýär. Gapjyk tarapynda Tamga Wallet-iň Android kody ýazyldy, ýöne entek programma goşulmady we hakyky enjamda synagdan geçirilmedi. iPhone goldawy bolsa entek ýok.

## Köp berilýän soraglar

### Näme üçin köp öňki ýerleşdirmelerdäki ýaly `x509_san_dns` ulanylmaýar?

HAIP 1.0 gol çekilen haýyşlarda `x509_hash`-i talap edýär we HAIP-e eýerýän gapjyk bu prefiksi kabul etmeli. Tamga `x509_san_dns`-iň peýdaly bölegini hem saklaýar. Jogap salgysy gol çeken sertifikatda ýazylan domenleriň birinde bolmaly.

### Barlaýjy haýsy meýdanlary paýlaşmandygymy bilýärmi?

Barlaýjy diňe haýsy meýdanlaryň gelendigini bilýär. Hökmany toplumy kanagatlandyryp bolmasa ýa-da adam paýlaşmakdan ýüz öwürse, gapjyk sebäbini aýtmazdan `access_denied` gaýtarýar.

### Birnäçe shema wersiýasyny sorap bilerinmi?

Hawa. Kabul edýän her wersiýaňyzy `vct_values` meýdanyna ýazyň, mysal üçin `urn:tamga:edu:DiplomaCredential:1` we `:2`. Ikinji wersiýa çykanda Tamga azyndan iki wersiýany bilelikde ýazmagy maslahat berýär, şeýlelikde köne wersiýadaky resminamanyň eýeleri daşarda galmaýar.

### `transaction_data` goldanýarmy?

Entek goldanmaýar. Görkezişi belli bir amala baglamak maliýe we ygtyýarlandyryş ssenariýalary üçin meýilleşdirilýär. Bilim ssenariýalarynda munuň zerurlygy ýok.

## Çeşmeler

- [OpenID for Verifiable Presentations 1.0, Final, 2025-nji ýylyň 9-njy iýuly](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [W3C Digital Credentials API](https://www.w3.org/TR/digital-credentials/)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/openid4vp)
- [Barlag hatary we API (SPEC-API-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/verification-api)
- [ADR-0034: HAIP 1.0 laýyklygy, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Görkeziş, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/presentation)
- [Serwerde barlamak, Tamga Network dokumentasiýasy](https://docs.tamga.network/guides/verify-on-server)

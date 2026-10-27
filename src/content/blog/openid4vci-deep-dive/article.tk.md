---
title: "OpenID4VCI-a çuňňur seredilişi: teklipler, DPoP, subutnamalar, toplumlar"
slug: openid4vci-deep-dive
description: "Tamga-da OpenID4VCI 1.0 bilen resminama bermegi düşündirýäris: teklipler we tx_code, PAR we PKCE, DPoP, nonce nokady, açar subutnamalary, gapjyk attestasiýasy we 10 nusgaly toplum."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Sources: OpenID4VCI 1.0 Final (16 Sep 2025): Nonce Endpoint §7 (c_nonce only, no-store), proofs §8.2, deferred §9 (HTTP 202 + transaction_id + interval), notification events §11, signed metadata typ openidvci-issuer-metadata+jwt, key attestation typ key-attestation+jwt (App. D), batch_size ≥ 2. HAIP 1.0 Final (24 Dec 2025) §4: authorization code flow, FAPI2 PKCE S256 + PAR, DPoP + DPoP-Nonce, scope per configuration, wallet attestation shared sub, key attestations, nonce_endpoint when binding. SPEC-PROTO-0001 v1.0.0 (2026-10-08): flows, tx_code rules PR1/PR12, offer classes, PR3, DPoP PR17, WUA/WIA §11.1, KA §11.1.1, PAR flow §11.2 PR13–PR15, batch §8 PR6, diploma 10 copies (2026-10-08), deferred §9, errors §13. Code: @tamga-network/issuer oid4vci.ts (metadata, scope = vct, config id = vct, reuse policy, authServerMetadata), wallet-core authcode.ts (scope in PAR), dpop.ts (use_dpop_nonce), oid4vci.ts (proofs or key_attestation), platform issuer (c_nonce TTL 300 s). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0 gapjygyň guramadan resminama almak üçin ulanýan OAuth esasly protokolydyr. Gapjyk token nokadyndan giriş tokenini, **nonce nokadyndan** bolsa täze `c_nonce` alýar. Soňra açarlarynyň eýeçilik subutnamalaryny **resminama nokadyna** iberýär we bu nokat eýeçiligi subut edilen her açar üçin bir resminama gaýtarýar. Tamga munuň üstünden HAIP 1.0 profilini ulanýar. Bu profilde tokenler DPoP-a bagly, ygtyýarlandyryş kody akymynda PAR we PKCE ulanylýar, token nokady gapjyk attestasiýasyny (wallet attestation) talap edýär, açar attestasiýalary (key attestation) goldanýar we resminama 10 dürli açara bagly 10 nusgaly toplum görnüşinde berilýär.

OpenID4VCI 1.0 2025-nji ýylyň 16-njy sentýabrynda Final boldy. Taslamalara görä ýazylan kodda iki üýtgeşme henizem kynçylyk döredýär. `c_nonce` indi token jogabyndan däl-de, nonce nokadyndan gelýär. Açar subutnamalary hem ýeke `proof` meýdanynyň deregine massiwlerden ybarat obýekt bolan `proofs` içinde iberilýär. Tamga-nyň profili [SPEC-PROTO-0001](https://docs.tamga.network/specifications/openid4vci) resminamasynda ýazylan.

![Tamga-da resminama bermegiň başlaýan iki ýoly](/blog/openid4vci-deep-dive/en/fig-flows.png)

> **Bellik:** Mysallar ýönekeýleşdirildi. Salgylar we belgiler mysal bahalardyr, JWT-ler gysgaldyldy we gollar görkezilmeýär.

## Gapjyk başlamazdan öň näme okaýar?

Her Tamga guramasy ýerleşdirilen issuer hyzmatynyň aşagynda bir ýol hökmünde ýerleşýär. Şonuň üçin guramanyň metamaglumat salgysy well-known salgynyň ýola goşulan görnüşini ulanýar:

```http title="Beriji metamaglumat haýyşy (nusga gurama)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` başlygy bilen haýyş edilende gurama **gol çekilen metamaglumaty** gaýtarýar. Bu metamaglumatyň `typ` bahasy `openidvci-issuer-metadata+jwt` bolýar we gurama oňa sertifikaty `x5c` meýdanynda duran resminama gol açary bilen gol çekýär. Gapjyk gol çeken sertifikatyň barmak yzyny ynam sanawyndaky gurama ýazgysy bilen deňeşdirýär. Barmak yzy gabat gelmese, metamaglumat ulanylmaýar. Başlyksyz haýyş bolsa adaty JSON gaýtarýar:

```json title="Ýönekeýleşdirilen mysal: resminama berijiniň metamaglumatlary"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "authorization_servers": ["https://issuer.tamga.network/example-university"],
  "credential_endpoint": "https://issuer.tamga.network/example-university/credential",
  "nonce_endpoint": "https://issuer.tamga.network/example-university/nonce",
  "batch_credential_issuance": { "batch_size": 10 },
  "credential_configurations_supported": {
    "urn:tamga:edu:DiplomaCredential:1": {
      "format": "dc+sd-jwt",
      "scope": "urn:tamga:edu:DiplomaCredential:1",
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "cryptographic_binding_methods_supported": ["jwk"],
      "credential_signing_alg_values_supported": ["ES256"],
      "proof_types_supported": {
        "jwt": {
          "proof_signing_alg_values_supported": ["ES256"],
          "key_attestations_required": { "key_storage": ["iso_18045_moderate", "iso_18045_high"] }
        }
      },
      "credential_metadata": {
        "credential_reuse_policy": {
          "id": "arf_annex_ii",
          "options": [{
            "details": ["per-relying-party", "once_only"],
            "batch_size": 10,
            "reissue_trigger_unused": 2,
            "reissue_trigger_lifetime_left": 604800
          }]
        }
      }
    }
  }
}
```

Bu metamaglumatda birnäçe zada üns bermeli. Her konfigurasiýa `scope` bahasyny göterýär, sebäbi HAIP her konfigurasiýa üçin gerim talap edýär we gapjyk bu bahany ygtyýarlandyryş haýyşynda ulanýar. Tamga `vct` URN-ni hem konfigurasiýa belgisi, hem gerim hökmünde ulanýar. Resminamalar açara baglydygy üçin `nonce_endpoint` hem görkezilýär. `key_attestations_required` guramanyň kabul edýän açar saklaýyş derejelerini sanaýar. Gaýtadan ulanyş syýasaty bolsa gapjyga her barlaýjy üçin aýry nusga ulanmagy, iki nusga galanda ýa-da resminamanyň möhletiniň gutarmagyna ýedi gün galanda täze toplum almagy aýdýar.

`/.well-known/oauth-authorization-server/example-university` salgysyndaky ygtyýarlandyryş serweriniň metamaglumaty (RFC 8414) oňa birnäçe meýdan hem goşýar. Bular `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]` we içinde `attest_jwt_client_auth` bolan `token_endpoint_auth_methods_supported` meýdanlarydyr. Gapjykdan başlanýan resminama berliş işjeň bolsa, metamaglumatda `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` we `code_challenge_methods_supported: ["S256"]` meýdanlary hem bolýar.

## Guramanyň başlan teklibi nähili işleýär?

Gurama **resminama teklibini** (credential offer) döredýär we ony QR kody ýa-da salgy görnüşinde görkezýär. QR kodunyň kiçi bolmagy üçin Tamga diňe `credential_offer_uri` bahasyny iberýär we gapjyk teklip obýektini şu salgydan alýar. Salgy diňe bir gezek ulanylyp bilner we bäş minutdan soň güýjünden düşýär. Salgy ikinji gezek soralanda 404 jogaby gaýdýar.

```json title="Ýönekeýleşdirilen mysal: öňünden ygtyýarlandyrylan kodly teklip"
{
  "credential_issuer": "https://issuer.tamga.network/example-university",
  "credential_configuration_ids": ["urn:tamga:edu:DiplomaCredential:1"],
  "grants": {
    "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
      "pre-authorized_code": "oaKazRN8I0IbtZ0C7JuMn5",
      "tx_code": { "input_mode": "numeric", "length": 6 }
    }
  }
}
```

`tx_code` QR kodunyň suratyny adamyň egninden aşyp alýan kişä garşy ikinji gorag gatlagydyr. Tamga-da öňünden ygtyýarlandyrylan akymda bu kody geçip bolmaýar. Kod alty sanly, üç nädogry synanyşyk teklibi güýjünden düşürýär we kod hiç haçan teklip bilen şol bir kanaldan iberilmeýär:

| Teklip synpy | Nirede görünýär | Ömri | Adam özüdigini nähili görkezýär |
|---|---|---|---|
| ekranda | portal ekranynda, adam içeri girende | 5 min, bir gezeklik | sessiýada görkezilýän `tx_code` bilen |
| kanaldan daşary | e-poçta ýa-da SMS arkaly iberilýän QR ýa-da salgy | iň köp 72 sagat, bir gezeklik | *beýleki* kanal arkaly guramanyň ýazgylaryndaky salga iberilýän `tx_code` bilen |
| şahsyýete baglanan | guramanyň öz kanaly arkaly iberilýän salgy | 7 gün, bir gezeklik | şahsyýet resminamasyny görkezmek bilen (ygtyýarlandyryş kody, `issuer_state`) |

## Token haýyşy nähili görünýär we DPoP näme üçin gerek?

```http title="Ýönekeýleşdirilen mysal: DPoP we gapjyk attestasiýasy bilen token haýyşy"
POST /example-university/token HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7…fX0…
OAuth-Client-Attestation: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24rand0Ii…
OAuth-Client-Attestation-PoP: eyJ0eXAiOiJvYXV0aC1jbGllbnQtYXR0ZXN0YXRpb24tcG9wK2p3dCJ9…

grant_type=urn:ietf:params:oauth:grant-type:pre-authorized_code
&pre-authorized_code=oaKazRN8I0IbtZ0C7JuMn5
&tx_code=493812
```

```json title="Token jogaby"
{ "access_token": "eyJ0eXAiOiJhdCtqd3QiLCJhbGciOiJFUzI1NiJ9…", "token_type": "DPoP", "expires_in": 300 }
```

**DPoP** (RFC 9449) giriş tokenini açara baglaýar. Gapjyk her resminama berliş üçin wagtlaýyn P-256 açaryny döredýär we `jwk`, `jti`, `htm`, `htu` we `iat` meýdanlaryny göterýän `dpop+jwt` subutnamasyna gol çekýär. Gurama tokeni şu açaryň barmak yzyna baglaýar. Şeýlelikde ogurlanan token açarsyz işe ýaramaýar. Resminama nokadyna gidýän haýyşlar `Authorization: DPoP <token>` başlygyny we tokeniň SHA-256 heşi bolan `ath` meýdanyny göterýän täze subutnamany öz içine alýar. Serwer `DPoP-Nonce` başlygy bilen bilelikde `use_dpop_nonce` jogabyny berse, gapjyk haýyşy şol nonce bilen ýene bir gezek gaýtalaýar. HAIP gapjyklaryň munuň üçin taýýar bolmagyny isleýär. Tamga-da giriş tokenleri bäş minut güýjünde.

Iki `OAuth-Client-Attestation` başlygy **gapjyk attestasiýasyny** göterýär. Bu HAIP-iň ulanýan we OAuth-da attestasiýa esaslanýan müşderi tanamasy hökmünde bilinýän usulydyr. Birinji başlyk gapjyk üpjün edijisiniň gol çeken we üpjün edijiniň sertifikatyny `x5c` meýdanynda göterýän JWT-sidir. Ikinjisi bolsa attestasiýadaky `cnf` açary bilen gol çekilen we `aud` bahasy gurama bolan eýeçilik subutnamasydyr. Gurama gol çeken sertifikatyň ynam sanawyndaky gapjyk üpjün edijisine degişlidigini barlaýar. Degişli bolmasa, token bermeýär we `invalid_client` ýalňyşlygyny gaýtarýar. HAIP boýunça attestasiýadaky `sub` bahasy gapjyk önüminiň ähli gurnamalarynda birmeňzeş bolmaly, şonuň üçin bu meýdan telefona mahsus baha göterenok. Tordaky gapjyklaryň biri bolan Tamga Wallet bu ýerde öz önüminiň belgisini ulanýar. Gysga ömürli Wallet Instance Attestation bolsa 24 sagatdan az dowam edýär we her amalda täze açar hem täze ýatyrylyş ýazgysy bilen döredilýär. Bu attestasiýa `client_status` meýdanyny hem göterýär we gurama bu meýdany gapjyk üpjün edijisiniň ýagdaý sanawy bilen barlaýar. Guramanyň bu attestasiýalara näme üçin ynanýandygyny [Gapjyga nähili ynanmaly?](/blog/trusting-a-wallet) ýazgysynda düşündirdik.

## Gapjykdan başlanýan akym PAR we PKCE-ni nähili ulanýar?

Adam programmadaky sanawdan gurama saýlanda gapjyk ygtyýarlandyryş kody akymyny başlaýar. Bu sanaw aýry katalog serwerinden däl-de, ynam sanawyndan okalýar:

```http title="Ýönekeýleşdirilen mysal: iteklenen ygtyýarlandyryş haýyşy (PAR)"
POST /example-university/par HTTP/1.1
Host: issuer.tamga.network
Content-Type: application/x-www-form-urlencoded
OAuth-Client-Attestation: eyJ…
OAuth-Client-Attestation-PoP: eyJ…

client_id=example-wallet-solution
&response_type=code
&scope=urn%3Atamga%3Aedu%3ADiplomaCredential%3A1
&redirect_uri=…
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
&code_challenge_method=S256
&state=af0ifjsldkj
```

PAR (RFC 9126) ygtyýarlandyryş haýyşynyň parametrlerini brauzeriň deregine arka kanal arkaly gidýän haýyşa geçirýär. S256 usuly bilen ulanylýan PKCE (RFC 7636) hem ygtyýarlandyryş kodyny akymy başlan gapjyga baglaýar. HAIP FAPI 2.0 arkaly ikisini hem talap edýär. `client_id` gapjyk attestasiýasyndaky `sub` bahasydyr. `redirect_uri` PAR haýyşynda berkidilýär we hasaba alnan salgy bilen doly gabat gelmeli. Şahsyýete baglanan teklipde gapjyk `issuer_state` bahasyny hem iberýär.

`/authorize` ädiminde Tamga guramasy tora mahsus bir iş edýär. Adama giriş sahypasyny görkezmegiň deregine, adamyň şahsyýet resminamasyny soraýan gol çekilen OpenID4VP haýyşyny gaýtarýar. Gapjyk adaty görkeziş ädimlerini ýerine ýetirýär. Gurama görkezişi barlag tertibiniň ähli ädimlerinden geçirýär we adamy öz ýazgylary bilen gabat getirýär. Bu şowly bolsa, adamy iň köp 60 sekunt güýjünde bolan we bir gezeklik `code` bilen yzyna gönükdirýär. Ondan soň gelýän token haýyşy `grant_type=authorization_code` bahasyny, `code` we `code_verifier` bahalaryny, şol bir `redirect_uri` salgysyny we şol bir gapjyk attestasiýasyny göterýär.

## Açar subutnamalary we 10 nusgaly toplum nähili iberilýär?

Gapjyk ilki nonce soraýar. Bu nokat token talap etmeýär we jogaby `Cache-Control: no-store` başlygy bilen gaýtarýar:

```http title="Nonce nokady"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Her `c_nonce` diňe bir gezek we bölünmeýän amal bilen ulanylýar. "Ilki barla, soň poz" ýaly iki ädimli amal aradaky ýaryş ýagdaýynda şol bir subutnamanyň iki gezek ulanylmagyna getirip bilerdi. Soňra gapjyk enjam açarlaryny howpsuz enjam modulynda döredýär we resminama haýyşyny iberýär:

```http title="Ýönekeýleşdirilen mysal: on subutnamaly resminama haýyşy"
POST /example-university/credential HTTP/1.1
Host: issuer.tamga.network
Authorization: DPoP eyJ0eXAiOiJhdCtqd3Qi…
DPoP: eyJ0eXAiOiJkcG9wK2p3dCIs…
Content-Type: application/json

{
  "credential_configuration_id": "urn:tamga:edu:DiplomaCredential:1",
  "proofs": {
    "jwt": [
      "<openid4vci-proof+jwt signed with key 1>",
      "<… key 2 …>",
      "…",
      "<… key 10 …>"
    ]
  }
}
```

Her subutnamanyň başlygynda `typ: openid4vci-proof+jwt`, `alg: ES256` we `jwk` içinde açyk açar bolýar. Mazmunynda bolsa `aud` (guramanyň belgisi), `iat` we `nonce` meýdanlary ýerleşýär. Gurama her subutnamany barlaýar we on açaryň **hemmesiniň biri-birinden tapawutlydygyna** seredýär. Soňra on resminama berýär we her nusganyň `cnf` meýdanyna şol nusganyň subutnamasyndaky açary ýazýar:

```json title="Resminama jogaby (gysgaldylan)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… nine more …"
  ]
}
```

Her setir boş `~` bilen gutarýar, sebäbi KB-JWT diňe gapjyk resminamany görkezende goşulýar ([SD-JWT VC-a çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). Şahsyýet resminamasynda her obýekt goşmaça şol bir açara bagly `mso_mdoc` hem göterýär ([ISO mdoc-a çuňňur seredilişi](/blog/iso-mdoc-deep-dive)).

![On açar, on subutnama, on nusga](/blog/openid4vci-deep-dive/en/fig-batch.png)

On dürli açaryň ulanylmagynyň sebäbi bar. Her nusga şol bir `cnf` bahasyny göterse, maglumat paýlaşýan iki barlaýjy nusgalary biri-birine baglanyşdyryp bilerdi we toplum hiç zady goramazdy. Her nusga ýagdaý sanawynda hem öz tötänleýin indeksini alýar, şonuň üçin nusgalary `idx` arkaly hem biri-birine baglap bolmaýar. Resminama ýatyrylanda gurama ähli nusgalaryň indekslerini bilelikde belleýär. Haýsy nusganyň haýsy indekse gabat gelýändigi bolsa diňe guramanyň öz maglumatlar binýadynda saklanýar. Bu düzgün diplom hem goşulyp, ähli resminama görnüşlerinde güýjünde.

**Açar attestasiýasy** (key attestation) ulanylanda toplumy bir subutnama bilen hem sorap bolýar. Bu ýagdaýda subutnamanyň başlygy `key_attestation` meýdanyny göterýär. Bu meýdan gapjyk üpjün edijisiniň gol çeken, `attested_keys` sanawyny we açarlaryň saklanyş derejesini bildirýän JWT-sidir. Subutnama hem sanawdaky ilkinji açar bilen gol çekilýär. Gurama açar attestasiýasyny, onuň ýatyrylyş ýagdaýyny we nonce bahasyny barlaýar, guramanyň talap edýän iň pes açar saklaýyş derejesini ulanýar we sanawdaky her açara bir nusga baglaýar. OpenID4VCI 1.0 bu formaty D goşundysynda kesgitleýär.

## Tamga gijikdirilen resminama berişi ulanýarmy?

Profil gijikdirilen resminama berişi (deferred issuance) diňe bir ýagdaý üçin beýan edýär. Bu ýagdaý uçurym karary entek tassyklanmadyk diplomdyr. Onuň öz düzgünleri hem bar. `transaction_id` iň köp 30 gün güýjünde, barlag aralygy (`interval`) azyndan 300 sekunt we gapjyk garaşmak wagtyny her gezek birnäçe esse artdyrýar. Munuň sebäbi yzygiderli aralyklarda geçirilýän barlagyň gurama "bu adam henizem garaşýar" diýen maglumaty bermegidir. Häzir hiç bir Tamga guramasy gijikdirilen resminama berişi hödürlemeýär. Metamaglumatda `deferred_credential_endpoint` ýok we diplom diňe gol çekip boljak ýagdaýynda teklip edilýär. OpenID4VCI 1.0 Final-da gijikdirilen jogap `transaction_id` we `interval` göterýän HTTP 202 jogabydyr. Henizem garaşýan gijikdirilen haýyş hem ýene HTTP 202 alýar. Köne taslamalar boýunça ýazylan programmalar bolsa munuň deregine `issuance_pending` ýalňyşlygyna garaşýar.

## Gapjyk haýsy ýalňyşlyklary dolandyrmaly?

| Ýalňyşlyk | Manysy | Gapjyk näme edýär |
|---|---|---|
| `invalid_proof` | subutnama ýok, nädogry ýa-da nonce göterenok | täze `c_nonce` alýar we gaýtadan synanyşýar |
| `invalid_nonce` | nonce köne ýa-da ulanylan | täze `c_nonce` alýar we gaýtadan synanyşýar |
| `invalid_credential_request` | haýyş nädogry düzülen | ýagdaýy habar berýär, gaýtadan synanyşmaýar |
| `unknown_credential_configuration` | konfigurasiýa hödürlenmeýär | metamaglumaty täzeleýär |
| `credential_request_denied` | ygtyýar ýok ýa-da ygtyýar yzyna alnan | gaýtadan synanyşmaýar |
| `invalid_client` (token) | gapjyk attestasiýasy ýok, nädogry ýa-da ýatyrylan | amaly togtadýar |
| `invalid_token` | giriş tokeniniň möhleti gutardy | akymy täzeden başlaýar |

Ýalňyşlyk jogaplarynda şahsy maglumat bolmaýar. Mysal üçin, "bu adama degişli ýazgy ýok" ýagdaýy `credential_request_denied` ýalňyşlygy bilen habar berilýär we jikme-jiklik guramanyň öz audit ýazgysynda galýar.

## Köp berilýän soraglar

### Näme üçin `tx_code` hiç haçan QR kodunyň içinde bolmaýar?

QR kody başga biri görüp ýa-da suratyny alyp biler. Kod QR bilen bilelikde iberilse, şol adam resminamany öz gapjygyna alyp bilerdi. Olary aýry kanallardan ibermek resminamany ele salmak isleýän adamdan iki kanaly hem ele salmagy talap edýär.

### HAIP öňünden ygtyýarlandyrylan kod akymyny talap edýärmi?

Ýok. HAIP ygtyýarlandyryş kody akymyny talap edýär. Tamga bolsa iki akymy hem goldaýar. Portaly adamy eýýäm tanaýan guramalar üçin öňünden ygtyýarlandyrylan teklibi, gapjykdan başlanýan haýyşlar üçin bolsa PAR, PKCE we şahsyýet görkezişi bolan ygtyýarlandyryş kody akymyny ulanýar.

### Gurama nusganyň haýsy barlaýjyda ulanylandygyny bilip bilermi?

Ýok. Gurama görkezişleri görmeýär we nusgalar ne açary, ne-de ýagdaý indeksini paýlaşýar. Şonuň üçin maglumat paýlaşýan barlaýjylar hem nusgalary resminama arkaly biri-birine baglap bilmeýär.

### Nusgalar gutaranda näme bolýar?

Iki nusga galanda gapjyk bir gezeklik täzeleme tokeni bilen täze toplum soraýar. Bu token resminama berlende ulanylan gapjyk attestasiýasynyň açaryna bagly. Gapjyk hem muny şol açar üçin döredilen täze attestasiýa bilen görkezýär, DPoP açary bolsa üýtgäp biler ([ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding)). Gapjyk öň duşan barlaýjysynda şol barlaýjy üçin aýran nusgasyny ulanmagyny dowam etdirýär. Täze barlaýjyda bolsa nusgany gaýtadan ulanmazdan öň adamdan soraýar.

## Çeşmeler

- [OpenID for Verifiable Credential Issuance 1.0, Final, 2025-nji ýylyň 16-njy sentýabry](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 2025-nji ýylyň 24-nji dekabry](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 9449: OAuth 2.0 Demonstrating Proof of Possession (DPoP), IETF](https://www.rfc-editor.org/rfc/rfc9449)
- [RFC 9126: OAuth 2.0 Pushed Authorization Requests, IETF](https://www.rfc-editor.org/rfc/rfc9126)
- [OpenID4VCI profili (SPEC-PROTO-0001), Tamga Network dokumentasiýasy](https://docs.tamga.network/specifications/openid4vci)
- [Resminama bermek, Tamga Network dokumentasiýasy](https://docs.tamga.network/concepts/issuance)
- [ADR-0025: gapjyk nusgasy we açar attestasiýalary, Tamga Network dokumentasiýasy](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)
- [Gurama hökmünde resminama bermek, Tamga Network dokumentasiýasy](https://docs.tamga.network/guides/issue-credentials)
- [`@tamga-network/issuer`, Tamga Network dokumentasiýasy](https://docs.tamga.network/packages/issuer)

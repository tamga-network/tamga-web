---
title: "OpenID4VCI-a çuňňur seredilişi: teklipler, DPoP, subutnamalar, toplumlar"
slug: openid4vci-deep-dive
description: "Tamga-da OpenID4VCI 1.0 bilen resminama bermek: teklipler we tx_code, PAR we PKCE, DPoP, nonce nokady, açar subutnamalary, gapjyk attestasiýasy, 10 nusgaly toplumlar."
date: 2026-10-08
updated: 2026-10-23
lang: tk
category: standards
draft: false
related: trusting-a-wallet, sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, haip-and-token-status-list, join-as-an-institution
---

<!-- Sources: OpenID4VCI 1.0 Final (16 Sep 2025): Nonce Endpoint §7 (c_nonce only, no-store), proofs §8.2, deferred §9 (HTTP 202 + transaction_id + interval), notification events §11, signed metadata typ openidvci-issuer-metadata+jwt, key attestation typ key-attestation+jwt (App. D), batch_size ≥ 2. HAIP 1.0 Final (24 Dec 2025) §4: authorization code flow, FAPI2 PKCE S256 + PAR, DPoP + DPoP-Nonce, scope per configuration, wallet attestation shared sub, key attestations, nonce_endpoint when binding. SPEC-PROTO-0001 v1.0.0 (2026-10-08): flows, tx_code rules PR1/PR12, offer classes, PR3, DPoP PR17, WUA/WIA §11.1, KA §11.1.1, PAR flow §11.2 PR13–PR15, batch §8 PR6, diploma 10 copies (2026-10-08), deferred §9, errors §13. Code: @tamga-network/issuer oid4vci.ts (metadata, scope = vct, config id = vct, reuse policy, authServerMetadata), wallet-core authcode.ts (scope in PAR), dpop.ts (use_dpop_nonce), oid4vci.ts (proofs or key_attestation), platform issuer (c_nonce TTL 300 s). RFC 9449, RFC 9126, RFC 7636. -->

OpenID4VCI (OpenID for Verifiable Credential Issuance) 1.0 gapjygyň berijiden resminama almak üçin ulanýan OAuth esasly protokolydyr. Gapjyk token nokadynda giriş tokenini (access token), **nonce nokadyndan** täze `c_nonce` alýar we açar subutnamalaryny **resminama nokadyna** iberýär, ol bolsa subut edilen her açar üçin bir resminama gaýtarýar. Tamga onuň üstünde HAIP 1.0 profiline eýerýär: DPoP-a baglanan tokenler, ygtyýarlandyryş kody akymynda PAR we PKCE, token nokadynda gapjyk attestasiýasy, açar attestasiýalary we 10 dürli açara baglanan 10 nusgaly toplum.

OpenID4VCI 1.0 2025-nji ýylyň 16-njy sentýabrynda Final boldy. Taslamalardan iki üýtgeşme olara garşy ýazylan kody henizem büdredýär: `c_nonce` indi token jogabyndan däl, nonce nokadyndan gelýär we açar subutnamalary `proof`-da däl, `proofs`-da (toplumlardan ybarat obýekt) gidýär. Tamga-nyň profili [SPEC-PROTO-0001](https://docs.tamga.network/specifications/openid4vci).

![Tamga-da resminama bermegiň başlaýan iki ýoly](/blog/openid4vci-deep-dive/en/fig-flows.png)

> **Bellik:** Ýönekeýleşdirilen mysallar. Hostlar we belgiler nusga, JWT-ler gysgaldylan, gollar aýrylan.

## Gapjyk başlamazdan öň näme okaýar?

Her Tamga guramasy ýerleşdirilen berijiniň astynda bir ýol (path), şonuň üçin onuň metamaglumatlary well-known salgysynyň ýol goşmak görnüşini ulanýar:

```http title="Beriji metamaglumat haýyşy (nusga gurama)"
GET /.well-known/openid-credential-issuer/example-university HTTP/1.1
Host: issuer.tamga.network
Accept: application/jwt
```

`Accept: application/jwt` bilen beriji **gol çekilen metamaglumatlary** gaýtarýar (`typ` `openidvci-issuer-metadata+jwt`, `x5c`-däki guramanyň resminama gol sertifikaty bilen gol çekilen). Gapjyk gol çekijiniň barmak yzyny guramanyň ynam sanawyndaky ýazgysy bilen deňeşdirýär; gabat gelmese, metamaglumatlar ulanylmaýar. Ýönekeý haýyş JSON gaýtarýar:

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

Üns bermeli nokatlar. Her konfigurasiýa `scope` yglan edýär, sebäbi HAIP muny her konfigurasiýa üçin talap edýär we gapjyk ony ygtyýarlandyryş haýyşynda ulanýar; Tamga `vct` URN-ini hem konfigurasiýa belgisi, hem scope hökmünde ulanýar. `nonce_endpoint` bar, sebäbi resminamalar açara baglanan. `key_attestations_required` guramanyň kabul edýän açar ammary derejelerini sanaýar. Gaýtadan ulanyş syýasaty gapjyga her barlaýjy üçin aýry nusga ulanmagy we iki nusga galanda ýa-da möhletiň gutarmagyna ýedi gün galanda täze toplum almagy aýdýar.

`/.well-known/oauth-authorization-server/example-university` salgysyndaky ygtyýarlandyryş serweriniň metamaglumatlary (RFC 8414) `token_endpoint`, `dpop_signing_alg_values_supported: ["ES256"]`, `attest_jwt_client_auth`-y öz içine alýan `token_endpoint_auth_methods_supported` we gapjykdan başlanýan resminama beriş açyk bolsa, `pushed_authorization_request_endpoint`, `require_pushed_authorization_requests: true` hem-de `code_challenge_methods_supported: ["S256"]` goşýar.

## Berijiden başlanýan teklip nähili işleýär?

Gurama **resminama teklibini** (credential offer) döredýär we ony QR kody ýa-da salgy hökmünde görkezýär. QR kody kiçi saklamak üçin Tamga diňe `credential_offer_uri` iberýär; gapjyk teklip obýektini şondan alýar. URI bir gezeklik we bäş minutdan soň möhleti gutarýar; ikinji gezek almak 404 gaýtarýar.

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

`tx_code` QR koduny adamyň egniniň üstünden suratyna düşürýän birine garşy ikinji faktordyr. Tamga-da ony öňünden ygtyýarlandyrylan akymda geçip bolmaýar, ol alty sanly, üç nädogry synanyşyk teklibi ýatyrýar we ol hiç haçan teklip bilen şol bir kanalda gitmeýär:

| Teklip synpy | Nirede görünýär | Ömri | Adam özüdigini nähili subut edýär |
|---|---|---|---|
| ekranda | portal ekrany, adam içeri giren | 5 min, bir gezeklik | içeri girilen sessiýada görkezilýän `tx_code` |
| kanaldan daşary | e-poçta ýa-da SMS arkaly QR ýa-da salgy | 72 sagada çenli, bir gezeklik | guramanyň ýazgylaryndaky salga *beýleki* kanal arkaly `tx_code` |
| şahsyýete baglanan | guramanyň öz kanaly arkaly salgy | 7 gün, bir gezeklik | şahsyýet resminamasyny görkezmek (ygtyýarlandyryş kody grant-y, `issuer_state`) |

## Token haýyşy nähili görünýär we näme üçin DPoP?

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

**DPoP** (RFC 9449) giriş tokenini açara baglaýar. Her resminama beriş akymy üçin gapjyk wagtlaýyn P-256 açaryny döredýär we `jwk`, `jti`, `htm`, `htu` hem-de `iat` göterýän `dpop+jwt` subutnamasyna gol çekýär. Beriji tokeni açaryň thumbprint-ine baglaýar, şonuň üçin ogurlanan token açarsyz peýdasyz. Resminama nokadyna edilýän haýyşlar `Authorization: DPoP <token>` we tokeniň SHA-256-sy bolan `ath` bilen täze subutnamany göterýär. Serwer `DPoP-Nonce` başlygy bilen `use_dpop_nonce` jogap berse, gapjyk HAIP-iň gapjyklardan taýýar bolmagy talap edişi ýaly şol nonce bilen bir gezek gaýtadan synanyşýar. Tamga-nyň giriş tokenleri bäş minut ýaşaýar.

Iki `OAuth-Client-Attestation` başlygy **gapjyk attestasiýasydyr**, ýagny HAIP-iň ulanýan OAuth attestasiýa esasly müşderi tanamasydyr. Birinjisi `x5c`-de üpjün edijiniň sertifikaty bilen gapjyk üpjün edijisiniň gol çeken JWT-sidir; ikinjisi attestasiýanyň `cnf`-indäki açar bilen gol çekilen, `aud`-y berijä bellenen eýeçilik subutnamasydyr. Beriji gol sertifikatynyň ynam sanawynda sanalan gapjyk üpjün edijisine degişlidigini barlaýar, degişli bolmasa tokeni ret edýär (`invalid_client`). HAIP boýunça attestasiýanyň `sub`-y gapjyk önüminiň her gurnalyşy üçin birmeňzeş bolmaly, şonuň üçin onda telefona mahsus baha ýok; toruň gapjyklarynyň biri bolan Tamga Wallet öz çözgüt belgisini ulanýar. Gysga ömürli Wallet Instance Attestation (24 sagatdan az, her amal üçin täze açar we täze ýatyrylyş ýazgysy) hem berijiniň gapjyk üpjün edijisiniň ýagdaý sanawy bilen barlaýan `client_status`-yny göterýär. Guramanyň bu attestasiýalara näme üçin ynanýandygy [Gapjyga nädip ynanmaly?](/blog/trusting-a-wallet) ýazgysynda.

## Gapjykdan başlanýan akym PAR we PKCE-ni nähili ulanýar?

Adam programmanyň içindäki sanawdan (aýry katalog serwerinden däl, ynam sanawyndan okalýan) guramany saýlanda gapjyk ygtyýarlandyryş kody akymyny başlaýar:

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

PAR (RFC 9126) ygtyýarlandyryş parametrlerini arka kanal haýyşyna geçirýär, S256 bilen PKCE (RFC 7636) bolsa kody akymy başlan gapjyga baglaýar; HAIP ikisini hem FAPI 2.0 arkaly talap edýär. `client_id` gapjyk attestasiýasynyň `sub`-ydyr. `redirect_uri` PAR-da kesgitlenýär we hasaba alnan salga gabat gelmeli. Şahsyýete baglanan teklip üçin gapjyk `issuer_state` hem iberýär.

`/authorize` nokadynda Tamga berijisi tora mahsus bir zat edýär: giriş sahypasynyň ýerine ol adamyň şahsyýet resminamasy üçin gol çekilen OpenID4VP haýyşyny gaýtarýar. Gapjyk adaty görkeziş akymyny işledýär, beriji görkezişi doly hatar arkaly barlaýar we adamy guramanyň öz ýazgylary bilen gabat getirýär, üstünlikli bolsa iň köp 60 sekunt güýjünde bolan bir gezeklik `code` bilen ugrukdyrýar. Soňra token haýyşy `grant_type=authorization_code`, `code`, `code_verifier`, şol bir `redirect_uri` we şol bir gapjyk attestasiýasyny göterýär.

## Açar subutnamalary we 10 nusgaly toplum nähili iberilýär?

Ilki gapjyk nonce soraýar. Nokada token gerek däl we ol `Cache-Control: no-store` bilen jogap berýär:

```http title="Nonce nokady"
POST /example-university/nonce HTTP/1.1
Host: issuer.tamga.network

HTTP/1.1 200 OK
Cache-Control: no-store

{ "c_nonce": "wKI4LT-mMoScTmxmQaMbtcMbtcpaSl" }
```

Her `c_nonce` bir gezek, atomlaýyn sarp edilýär: "barla, soňra poz" bäsleşigi bir subutnamanyň iki gezek ulanylmagyna ýol açardy. Soňra gapjyk enjam açarlaryny howpsuz enjamda döredýär we resminama haýyşyny iberýär:

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

Her subutnamada `typ: openid4vci-proof+jwt`, `alg: ES256` we `jwk` başlygynda açyk açar bar, mazmunynda bolsa `aud` (resminama berijiniň belgisi), `iat` we `nonce` bar. Beriji her subutnamany barlaýar, on açaryň **hemmesiniň dürlüdigini** barlaýar we her subutnamanyň açaryny şol nusganyň `cnf`-ine goýup, on resminama berýär:

```json title="Resminama jogaby (gysgaldylan)"
{
  "credentials": [
    { "credential": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRjK3NkLWp3dCJ9…~WyJ…~WyJ…~" },
    "… nine more …"
  ]
}
```

Her setir boş `~` bilen gutarýar: gapjyk ony görkezýänçä KB-JWT ýok ([SD-JWT VC-ä çuňňur seredilişi](/blog/sd-jwt-vc-deep-dive)). Şahsyýet resminamasy üçin her obýekt şol bir açara baglanan `mso_mdoc` hem göterýär ([ISO mdoc-a çuňňur seredilişi](/blog/iso-mdoc-deep-dive)).

![On açar, on subutnama, on nusga](/blog/openid4vci-deep-dive/en/fig-batch.png)

Näme üçin on dürli açar? Her nusga şol bir `cnf` göterse, maglumat alyşýan iki barlaýjy nusgalary baglanyşdyryp bilerdi we toplum hiç zady goramazdy. Her nusga öz tötänleýin ýagdaý sanawy indeksini hem alýar, şonuň üçin nusgalary `idx` arkaly hem baglanyşdyryp bolmaýar. Resminama ýatyrylanda beriji onuň ähli nusgalarynyň indekslerini bilelikde belleýär; nusgalar bilen indeksleriň arasyndaky gabatlyk berijiniň öz maglumatlar bazasynda galýar. Bu diplomlar hem goşulyp, her resminama görnüşine degişli.

**Açar attestasiýasy** bilen toplumy onuň ýerine ýeke subutnama bilen soramak bolýar. Subutnamanyň başlygy `key_attestation`-y, ýagny `attested_keys`-i sanaýan we olaryň ammar derejesini aýdýan gapjyk üpjün edijisiniň gol çeken JWT-sini göterýär, subutnama bolsa ilkinji attestasiýa edilen açar bilen gol çekilýär. Beriji attestasiýany, onuň ýatyrylyş ýagdaýyny we nonce-y barlaýar, guramanyň iň pes açar ammary derejesini ulanýar we her attestasiýa edilen açara bir nusga baglaýar. OpenID4VCI 1.0 bu formaty özüniň D goşundysynda kesgitleýär.

## Tamga gijikdirilen resminama berişi ulanýarmy?

Profil ony bir ýagdaý üçin, ýagny uçurmak karary entek tassyklanmadyk diplom üçin öz düzgünleri bilen beýan edýär: `transaction_id` iň köp 30 gün ýaşaýar, sorag (polling) `interval`-y azyndan 300 sekunt we gapjyk eksponensial yza çekilýär, sebäbi yzygiderli soramak berijä "bu adam henizem garaşýar" diýýär. Häzir hiç bir Tamga berijisi muny hödürlemeýär: metamaglumatlarda `deferred_credential_endpoint` ýok, şonuň üçin diplom diňe oňa gol çekip bolanda teklip edilýär. OpenID4VCI 1.0 Final-da gijikdirilen jogap `transaction_id` we `interval` bilen HTTP 202, henizem garaşylýan gijikdirilen haýyş bolsa ýene HTTP 202 alýar; köne taslamalardan gurlan durmuşa geçirişler onuň ýerine `issuance_pending` ýalňyşlygyna garaşýar.

## Gapjyk haýsy ýalňyşlyklary dolandyrmaly?

| Ýalňyşlyk | Manysy | Gapjygyň hereketi |
|---|---|---|
| `invalid_proof` | subutnama ýok, nädogry ýa-da nonce-syz | täze `c_nonce` al, gaýtadan synan |
| `invalid_nonce` | nonce köne ýa-da ulanylan | täze `c_nonce` al, gaýtadan synan |
| `invalid_credential_request` | nädogry düzülen haýyş | habar ber, gaýtadan synanma |
| `unknown_credential_configuration` | konfigurasiýa hödürlenmeýär | metamaglumatlary täzele |
| `credential_request_denied` | ygtyýarly däl ýa-da ygtyýar yzyna alnan | gaýtadan synanma |
| `invalid_client` (token) | gapjyk attestasiýasy ýok, nädogry ýa-da ýatyrylan | dur |
| `invalid_token` | giriş tokeniniň möhleti gutardy | akymy täzeden başla |

Ýalňyşlyk jogaplarynda şahsy maglumat ýok. "Bu adam üçin ýazgy tapylmady" `credential_request_denied` hökmünde gaýtarylýar; jikme-jiklik berijiniň öz audit žurnalynda galýar.

## Köp berilýän soraglar

### Näme üçin `tx_code` hiç haçan QR kodunda ýok?

Sebäbi QR koduny başga biri görüp ýa-da suratyna düşürip biler. Kod onuň bilen bilelikde gitse, şol adam resminamany öz gapjygyna alyp bilerdi. Olary kanallara bölmek ikisini hem ele salmagy talap edýär.

### HAIP öňünden ygtyýarlandyrylan kod akymyny talap edýärmi?

Ýok. HAIP ygtyýarlandyryş kody akymyny talap edýär. Tamga ikisini hem goldaýar: portaly adamy eýýäm tanaýan guramalar üçin öňünden ygtyýarlandyrylan teklipler we gapjykdan başlanýan haýyşlar üçin PAR, PKCE we şahsyýet görkezişi bilen ygtyýarlandyryş kody akymy.

### Beriji nusganyň haýsy barlaýjy bilen ulanylandygyny bilip bilermi?

Ýok. Beriji görkezişleri görmeýär, nusgalaryň umumy açary ýa-da ýagdaý indeksi ýok, şonuň üçin ylalaşan barlaýjylar hem olary resminama arkaly baglanyşdyryp bilmeýär.

### Nusgalar gutaranda näme bolýar?

Iki nusga galanda gapjyk bir gezeklik täzeleme tokenini (refresh token) ulanyp, täze toplum soraýar. Token resminama berlende ulanylan gapjyk attestasiýasynyň açaryna baglanan we gapjyk muny şol açar üçin täze attestasiýa bilen subut edýär; DPoP açary üýtgäp biler ([ADR-0060](https://docs.tamga.network/adr/0060-refresh-token-client-instance-binding)). Eýýäm tanaýan barlaýjysynda ol şol barlaýjynyň nusgasyny ulanmagy dowam etdirýär; täze barlaýjyda nusgany gaýtadan ulanmazdan öň adamdan soraýar.

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

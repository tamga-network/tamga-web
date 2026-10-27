---
title: Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň
slug: add-verification-to-your-site
description: "Tamga resminamalaryny saýtyňyzda ýa-da programmaňyzda barlamagyň iki ýoly: sahypa toplumy bilen ýerleşdirilen barlaýjy ýa-da @tamga-network/verifier bilen öz serweriňiz."
date: 2026-10-08
lang: tk
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Sources: GUIDE-0001 sign-in-with-tamga 1.0.0 (hosted verifier Tamga Verify; RP assertion signed with the access-certificate key, ≤60 s, single use; POST /presentations → presentation_id, qr_payload, expires_at, status_token; page kit tamga-verifier.js, TamgaVerifier.mount, /web subpath; kit does not verify and sees no values; claims given once, 410 on second read, deleted 5 min after the result; 404 for others; pseudonym per site; passkeys; policy names agreed with Tamga; sample site in the sandbox). GUIDE-0002 verify-on-server 1.0.0 (policy → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; three outcomes; checks_performed; nonce single use; ZK: mso_mdoc_zk, WASM ~3 s desktop, native ~0.2–0.3 s, accept_unrevocable_zk, Z1, fallback to mso_mdoc; wallet-side Android prover ready, iOS pending). GUIDE-0008 register-verifier (dns_name, access certificate, scopes, WRPRC, out-of-scope warning, pseudonym not accepted without registration). SPEC-API-0001 §2–§4 (result object, AP2–AP6, policy → DCQL, claims endpoint). Code examples page: packages 0.7.2 test release on npm, stable 1.0.0 when ready. examples/01-web-login/server.ts. Sandbox guide §6 (example verifiers incl. age-zk). External: OpenID4VP 1.0, HAIP 1.0, ISO/IEC 18013-5. -->

Web saýta ýa-da programma "Tamga bilen barla" goşmagyň iki ýoly bar. Has çalt ýoly Tamga-nyň ýerleşdirilen barlaýjysyny, Tamga Verify-ny ulanýar: siz QR kody ýa-da "gapjygyňyzda açyň" düwmesini görkezýän kiçi sahypa toplumyny we haýyşy açýan hem-de tassyklanan meýdanlary ýygnaýan iki gysga serwer nokadyny goşýarsyňyz. Beýleki ýol tutuş barlagy açyk çeşmeli `@tamga-network/verifier` paketi bilen öz serweriňizde işledýär: size näme gerekdigini syýasatda (policy) beýan edýärsiňiz, gol çekilen OpenID4VP haýyşyny iberýärsiňiz, gapjygyň şifrlenen jogabyny açýarsyňyz we üç netijäniň birini alýarsyňyz. Haýsy ýoly saýlasaňyz hem, ilki barlaýjy hökmünde hasaba durýarsyňyz; şeýlelikde gapjyklar kimiň we näme üçin soraýandygyny bilýär.

> **Bellik:** `@tamga-network/*` paketleri npm-de 0.7.2 synag wersiýasy hökmünde çap edilen; durnukly 1.0.0 hemme zat taýýar bolanda gelýär. Synag wersiýalarynda API üýtgäp biler. Aşakdaky kod şol wersiýanyň API-sidir.

## Kod ýazmazdan öň size näme gerek?

Ynam sanawynda barlaýjy ýazgysy. Haýyş gelende gapjyk üç zady barlaýar: ony kim iberýär, iberiji hasaba alnan we işjeňmi, soralýan meýdanlar hasaba alnan gerimiň içindemi. Hasaba alynmadyk saýt hem gapjyga ýetýär, ýöne onuň soraýan her meýdany "hasaba alnan gerimden daşarda" duýduryşy bilen görkezilýär we ondan gelen lakam (pseudonym) haýyşy göni ret edilýär.

Hasaba durmak hasaba alyja şulary bermegi aňladýar ([Barlaýjy hökmünde hasaba durmak](https://docs.tamga.network/guides/register-verifier)):

- domen adyňyz, ol siziň hemişelik şahsyýetiňiz bolýar;
- haýyşlara gol çekjek açaryňyz üçin sertifikata gol çekmek haýyşy (açar sizde galýar); müşderi belgiňiz (client identifier) alnan giriş sertifikatyndan (access certificate) çykarylýar;
- her niýetlenen ulanyş üçin bir **gerim** (scope): ýönekeý sözler bilen maksat, bir resminama görnüşi we şol maksada gerek bolan iň az meýdanlar, üstesine gizlinlik syýasatynyň salgysy;
- ÝB-niň umumy hasaba alyş maglumatlary: söwda ady, resmi belgisi, salgysy, habarlaşmak üçin maglumat, maglumatlary goramak edarasy.

Mysal üçin, talyp arzanladyşyny hödürleýän dükan talyp resminamasyndan diňe `is_enrolled` soraýar: ady däl, mekdebi däl, talyp belgisi däl. Gerimleri şeýle dar saklaň, şonda gapjygyň razylyk ekrany gysga bolar.

Hasaba durmazdan öň synap görmek üçin sandbox-y ulanyň: [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) salgysynda içeri girmek, ýaş, diplom, talyp arzanladyşy we çäre gapylary üçin nusga barlaýjylar hem-de [/sample-site](https://verify.sandbox.tamga.network/sample-site) salgysynda işleýän nusga saýt bar.

## Haýsy ýoly saýlamaly?

![Ýerleşdirilen barlaýjy ýa-da öz serweriňiz: paket, kim barlaýar, bahalar nirä gidýär, sanawlary kim saklaýar](/blog/add-verification-to-your-site/en/fig-iki-yol.png)

Ýerleşdirilen barlaýjy hasaba durmak we içeri girmek üçin hem-de çalt başlamak isleýän toparlar üçin amatly. Öz serweriňiz resminama bahalarynyň hiç bir araçynyň üstünden geçmegini islemeýän ýa-da eýýäm köp barlag geçirýän infrastrukturasy bolan guramalar üçin amatly. Ikisi hem şol bir barlag hataryny işledýär; `verify.tamga.network` salgysyndaky salgylanma barlaýjy siziň gurnajak kitaphanaňyzyň üstünde gurlan.

## Ýerleşdirilen barlaýjy nähili işleýär?

Dört hereket we bahalar diňe siziň serweriňize ýetýär:

1. **Serweriňiz görkezişi (presentation) açýar.** Ol barlaýjyny syýasat ady we giriş sertifikatyňyzyň açary bilen gol çekilen gysga möhletli beýannama bilen çagyrýar (iň köp 60 sekunt güýjünde, bir gezeklik). Aýry parol ýok.
2. **Sahypa haýyşy görkezýär.** Kompýuterde QR kody, telefonda "gapjygyňyzda açyň" düwmesi. Adam diňe soralýan meýdanlary görýär we tassyklaýar.
3. **Barlaýjy resminamany barlaýar** (gol, ynam sanawy, ýatyrylyş, eýesine baglylyk) we sahypa toplumy netijäni öwrenýär.
4. **Serweriňiz netijäni** we kabul edilen bolsa tassyklanan meýdanlary bir gezek **alýar**.

```http title="Ýerleşdirilen barlaýjyda görkezişi açmak"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <statement signed with your access-certificate key>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Jogapda `presentation_id`, `qr_payload`, `expires_at` we `status_token` bar; serweriňiz olary sahypa geçirýär. Sahypa toplumyny barlaýjy hödürleýär:

```html title="Hasaba duruş sahypaňyzdaky sahypa toplumy"
<script src="https://verify.tamga.network/tamga-verifier.js"></script>
<div id="tamga"></div>
<script>
  TamgaVerifier.mount(document.getElementById("tamga"), {
    verifier: "https://verify.tamga.network",
    policy: "site-signup",
    start: () => fetch("/tamga/start", { method: "POST" }).then((r) => r.json()),
    onResult: (presentationId) =>
      fetch("/tamga/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ presentation_id: presentationId }),
      }).then(() => location.reload()),
  });
</script>
```

Toplum hiç zat barlamaýar we hiç haçan baha görmeýär; ol diňe ýagdaýy yzarlaýar. Karar siziň serweriňizde berilýär:

```ts title="Serweriňiz: ilki netijäni, soňra tassyklanan meýdanlary okaň"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "gaýtadan synanyşyň", "ret edildi" däl

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // bahalar bir gezek berilýär
const { claims } = await res.json(); // mysal üçin claims.pseudonym, claims.given_name
```

Görkezişiň netijesini diňe ony açan saýt okap bilýär; beýlekiler `404` alýar. Bahalar bir gezek berilýär we netijeden bäş minut soň pozulýar, şonuň üçin olary derrew işläň. Ýerleşdirilen barlaýjyda syýasat atlary we olaryň meýdan toplumlary tor bilen ylalaşylýar (mysal üçin, 18 ýaşdan uly barlagy diňe `age_over_18` meýdanyny ulanýar). Hasaba durandan soňky passkey-ler hem goşulyp, doly gollanma [“Sign in with Tamga” goşmak](https://docs.tamga.network/guides/sign-in-with-tamga) sahypasynda.

## Öz serweriňizde nähili barlamaly?

`@tamga-network/verifier` we `@tamga-network/trust` bilen. Ilkinji haýyşdan öň ynam sanawlaryny `TrustSource` arkaly ýükläň ([sanawlar nähili barlanýar](/blog/how-trust-lists-work)) we ýatyrylyş sanawlaryny taýmer bilen öňünden almaga başlaň; barlag pursatynda hiç zat ýüklenmeli däl. Soňra:

```ts title="Öz serweriňiz: haýyş et, şifri aç, barla"
import { dcqlFromPolicy, createPresentationRequest, decryptResponse, verifyPresentation,
         pemRpSigner, PrefetchStatusCache, type Policy } from "@tamga-network/verifier";

const signer = await pemRpSigner(RP_KEY_PEM, RP_CERT_PEM); // client_id sertifikatdan gelýär
const req = await createPresentationRequest({ signer, dcql: dcqlFromPolicy(policy),
  responseUri: "https://shop.example.com/vp/response", requestUriBase: "https://shop.example.com/vp/req",
  registrationCert: WRPRC_JWT }); // hasaba alyş sertifikatyňyz (trust.tamga.network/wrprc/); 0.7.0-dan bäri gapjyklar onsuz haýyşlary ret edýär
// req.qrPayload → QR kody ýa-da deep link; onda şahsy maglumat ýok

// gapjyk şifrlenen jogaby responseUri-a POST edýär
const answer = await decryptResponse(jweBody, req.encPrivateKey);
const { result, claims } = await verifyPresentation({ presentation: answer.vp_token["student"][0],
  aud: signer.clientId, nonce: req.nonce, policy, policyCredentialId: "student",
  trust, statusCache, rootCertsDer, rp: trust.relyingParty(signer.clientId) });
```

`verifyPresentation`-yň aňyrsyndaky ädimler kesgitli we belgilenen: format we gol (A), resminama görnüşi (B), ynam (C), ýatyrylyş (D) we siziň öz syýasatyňyz (E). Olar [verification API](https://docs.tamga.network/specifications/verification-api) sahypasynda sanalýar. Bu koduň synagdan geçen, işledip bolýan görnüşi [kod mysallarynyň](https://docs.tamga.network/guides/code-examples) arasynda; gollanma [Serweriňizde barlaň](https://docs.tamga.network/guides/verify-on-server).

## Syýasat näme we näme üçin ol kod däl?

Syýasat size näme gerekdigini aýdýar: haýsy resminama görnüşi, haýsy meýdanlar, haýsy ynamlylyk derejesi, sanawlar näçe täze bolmaly. Gapjygyň görýän haýyşy (DCQL soragy) syýasatdan döredilýär, hiç haçan elde ýazylmaýar. Şonuň üçin has köp soramak kod üýtgeşmesini däl-de, syýasat üýtgeşmesini talap edýär we syýasat hiç haçan hasaba alyşyňyzdaky gerimden artyk sorap bilmeýär (AP6 düzgüni). Haýyşyň we şifrlenen jogabyň nähili gurulýandygy [OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive) ýazgysynda.

## Netijäni nähili okamaly?

![Üç netije, olaryň her biriniň manysy we ulanyja näme aýtmaly](/blog/add-verification-to-your-site/en/fig-sonuclar.png)

Dogry düşünmeli netije üçünjisidir. `INDETERMINATE` barlaýjynyň häzir barlap bilmändigini aňladýar: sanawy alyp bolmady ýa-da ol gaty köne. Resminama doly dogry bolup biler. "Häzir barlap bolmaýar, gaýtadan synanyşyň" diýip görkeziň we ony hiç haçan `REJECTED` bilen bir sebede salmaň (AP2 düzgüni). "Bu diplom galp" bilen "häzir barlap bilemok" arasyndaky tapawut kimdir biriniň işe alnyp-alynmajagyny kesgitläp biler.

Netije obýekti geçirilen we geçirilmedik barlaglary sanaýar, olary audit üçin saklap bilersiňiz. Onda meýdan atlary bar, hiç haçan bahalar ýok. Şahsy maglumatlary, şol sanda atlary we açarlary žurnala ýazmaň.

## Doglan senesini görmezden ýaşy barlap bolýarmy?

Hawa we bu Tamga Verify-da `age-over-18-zk` syýasaty hökmünde işleýär. `mso_mdoc_zk` formatyndaky syýasat zero-knowledge subutnamasyny soraýar: gapjyk hasaba alnan guramanyň şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny subut edýär, siz bolsa başga hiç zat öwrenmeýärsiňiz. Siz resminamany, doglan senesini, guramanyň goluny ýa-da enjam açaryny görmeýärsiňiz we şol bir adamdan gelen iki subutnamany baglanyşdyryp bolmaýar ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

Gollanmadan birnäçe amaly bellik:

- Barlag goşulan WebAssembly-de işleýär, iş stoly kompýuterinde her subutnama üçin takmynan 3 sekunt. Köp mukdar üçin ýerli (native) gurluş takmynan 0,2–0,3 sekunt alýar.
- Diňe gol çekilen ynam sanawynda sanalan zynjyrlar (circuit) kabul edilýär.
- ZK görkezişinde ýatyrylyş indeksi ýok, şonuň üçin syýasat `accept_unrevocable_zk: true` diýip aç-açan aýtmaly. Ýatyrylyş barlagy gerek bolsa, adaty `mso_mdoc` syýasatyny ulanyň.
- Gapjyk tarapynda Android subutnama kitaphanasy taýýar, iOS heniz garaşylýar. Subut edip bilmeýän gapjyk, syýasatyňyz rugsat berse, diňe `age_over_18`-i açýan adaty mdoc barlagyna geçýär. Ikisini hem hödürläň.

Sandbox-yň `age-zk` nusga barlaýjysy akymy başdan-aýak görkezýär. Zynjyrlar, ynam sanawynyň roly we çäkler [Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga) ýazgysynda.

## Köp berilýän soraglar

### Saýtym adamyň tutuş resminamasyny görýärmi?

Ýok. Ol diňe adamyň tassyklan meýdanlaryny alýar we ol meýdanlar siziň hasaba alnan geriminiziň içinde bolmaly. Zero-knowledge syýasaty bilen ol diňe "hawa" ýa-da "ýok" alýar.

### Resminamany beren gurama biziň ony barlandygymyzy görüp bilýärmi?

Ýok. Ýatyrylyş sanawlary öňünden alynýar we keşde saklanýar; barlag pursatynda guramadan ýa-da tordan hiç zat soralmaýar.

### Bu diňe Tamga Wallet bilen işleýärmi?

Ýok. Üpjün edijisi ynam sanawynda bolan we toruň gapjyk düzgünlerine eýerýän islendik gapjyk haýyşyňyza jogap berip biler.

### Içeri girilenden soň näme saklamaly?

Şahsy maglumat däl, hasap açary. Nusga saýt saýta mahsus lakamyň açarly heşini saklaýar; başga saýt şol bir adam üçin başga lakam görýändigi sebäpli ony gabat getirip bilmeýär.

### Hasaba durmazdan synap bolýarmy?

Hawa, sandbox-da. Onuň nusga barlaýjylary we nusga saýty sandbox-yň nusga guramalarynyň resminamalary bilen işleýär. Hakyky resminamalar üçin hakyky torda hasaba alnan barlaýjy gerek.

## Çeşmeler

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açyk çeşmeli subutnama ulgamy)](https://github.com/google/longfellow-zk)
- [Tamga Network: “Sign in with Tamga” goşmak](https://docs.tamga.network/guides/sign-in-with-tamga) · [Serweriňizde barlaň](https://docs.tamga.network/guides/verify-on-server) · [Barlaýjy hökmünde hasaba durmak](https://docs.tamga.network/guides/register-verifier)
- [Kod mysallary](https://docs.tamga.network/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/packages/verifier) · [API salgylanmasy](https://docs.tamga.network/api/)
- [SDK-lar](/sdk) · [Barlaýjy hökmünde goşulmak](/learn/join-as-verifier)

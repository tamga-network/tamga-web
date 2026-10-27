---
title: Web saýtyňyza ýa-da programmaňyza "Tamga bilen barla" goşuň
slug: add-verification-to-your-site
description: "Tamga resminamalaryny saýtyňyzda ýa-da programmaňyzda iki ýol bilen barlap bilersiňiz: sahypa toplumy bilen ýerleşdirilen barlaýjyny ulanýarsyňyz ýa-da barlagy @tamga-network/verifier bilen öz serweriňizde geçirýärsiňiz."
date: 2026-10-08
lang: tk
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Sources: GUIDE-0001 sign-in-with-tamga 1.0.0 (hosted verifier Tamga Verify; RP assertion signed with the access-certificate key, ≤60 s, single use; POST /presentations → presentation_id, qr_payload, expires_at, status_token; page kit tamga-verifier.js, TamgaVerifier.mount, /web subpath; kit does not verify and sees no values; claims given once, 410 on second read, deleted 5 min after the result; 404 for others; pseudonym per site; passkeys; policy names agreed with Tamga; sample site in the sandbox). GUIDE-0002 verify-on-server 1.0.0 (policy → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; three outcomes; checks_performed; nonce single use; ZK: mso_mdoc_zk, WASM ~3 s desktop, native ~0.2–0.3 s, accept_unrevocable_zk, Z1, fallback to mso_mdoc; wallet-side Android prover ready, iOS pending). GUIDE-0008 register-verifier (dns_name, access certificate, scopes, WRPRC, out-of-scope warning, pseudonym not accepted without registration). SPEC-API-0001 §2–§4 (result object, AP2–AP6, policy → DCQL, claims endpoint). Code examples page: packages 0.7.3 test release on npm, stable 1.0.0 when ready. examples/01-web-login/server.ts. Sandbox guide §6 (example verifiers incl. age-zk). External: OpenID4VP 1.0, HAIP 1.0, ISO/IEC 18013-5. -->

Web saýta ýa-da programma "Tamga bilen barla" goşmagyň iki ýoly bar. Has çalt ýolda Tamga-nyň ýerleşdirilen barlaýjysyny, Tamga Verify-ny ulanýarsyňyz. Sahypaňyza QR kody ýa-da "gapjykda aç" düwmesini görkezýän kiçi sahypa toplumyny, serweriňize bolsa haýyşy açýan we tassyklanan meýdanlary alýan iki gysga nokady goşmak ýeterlik. Beýleki ýolda tutuş barlagy açyk çeşmeli `@tamga-network/verifier` paketi bilen öz serweriňizde geçirýärsiňiz. Size näme gerekdigini syýasatda (policy) beýan edýärsiňiz, gol çekilen OpenID4VP haýyşyny iberýärsiňiz, gapjygyň şifrlenen jogabyny açýarsyňyz we üç netijäniň birini alýarsyňyz. Haýsy ýoly saýlasaňyz hem, ilki barlaýjy hökmünde hasaba durmaly, sebäbi gapjyk kimiň we haýsy maksat bilen soraýandygyny şu ýazgydan bilýär.

> **Bellik:** `@tamga-network/*` paketleri npm-de 0.7.3 synag wersiýasy hökmünde çap edilýär; durnukly 1.0.0 wersiýasy hemme zat taýýar bolanda çykar. Synag wersiýalarynda API üýtgäp biler. Aşakdaky kod şol wersiýanyň API-sini ulanýar.

## Kod ýazmazdan öň näme gerek?

Ilki bilen ynam sanawynda barlaýjy ýazgyňyz bolmaly. Haýyş gelende gapjyk üç zada seredýär. Haýyşy kimiň iberýändigini, iberijiniň hasaba alnandygyny we işjeňdigini, soralýan meýdanlaryň hasaba alnan gerimiň (scope) içinde bolup-bolmaýandygyny barlaýar. Hasaba alynmadyk saýt hem gapjyga ýetip biler, ýöne onuň soraýan her meýdany "hasaba alnan gerimden daşarda" duýduryşy bilen görkezilýär. Şeýle saýtdan gelen lakam (pseudonym) haýyşy bolsa asla kabul edilmeýär.

Hasaba durmak üçin hasaba alyş edarasyna şu maglumatlary berýärsiňiz ([Barlaýjy hökmünde hasaba durmak](https://docs.tamga.network/guides/register-verifier)):

- domen adyňyz; bu at siziň hemişelik şahsyýetiňiz bolýar;
- haýyşlara gol çekjek açaryňyz üçin sertifikata gol çekmek haýyşy (açar sizde galýar); müşderi belgiňiz (client identifier) şu haýyşdan çykan giriş sertifikatyndan (access certificate) alynýar;
- her ulanyş maksady üçin aýratyn **gerim**, ýagny ýönekeý dilde ýazylan maksat, bir resminama görnüşi, şol maksada gerek bolan iň az meýdanlar we gizlinlik syýasatyňyzyň salgysy;
- ÝB-niň umumy hasaba alyş maglumatlary: söwda ady, resmi belgisi, salgysy, habarlaşmak üçin maglumat we degişli maglumatlary goramak edarasy.

Mysal üçin, talyp arzanladyşyny berýän dükan talyp resminamasyndan diňe `is_enrolled` meýdanyny soraýar. Oňa talybyň ady, mekdebi ýa-da talyp belgisi gerek däl. Gerimleri şeýle dar saklasaňyz, gapjygyň razylyk ekrany hem gysga bolar.

Hasaba durmazdan öň hemme zady sandbox-da synap görüp bilersiňiz. [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) salgysynda içeri girmek, ýaş, diplom, talyp arzanladyşy we çärä giriş üçin nusga barlaýjylar, [/sample-site](https://verify.sandbox.tamga.network/sample-site) salgysynda bolsa işleýän nusga saýt bar.

## Haýsy ýoly saýlamaly?

![Ýerleşdirilen barlaýjy ýa-da öz serweriňiz: paket, kim barlaýar, bahalar nirä gidýär, sanawlary kim saklaýar](/blog/add-verification-to-your-site/en/fig-iki-yol.png)

Ýerleşdirilen barlaýjy hasaba duruş we içeri giriş sahypalary üçin, şeýle hem çalt başlamak isleýän toparlar üçin amatly. Resminama bahalarynyň hiç bir araçynyň üstünden geçmegini islemeýän ýa-da eýýäm köp barlag geçirýän infrastruktura işledýän guramalar bolsa adatça barlagy öz serwerlerinde geçirýär. Iki ýol hem şol bir barlag tertibini işledýär. `verify.tamga.network` salgysyndaky salgylanma barlaýjy hem siziň gurnajak kitaphanaňyzyň üstünde gurlan.

## Ýerleşdirilen barlaýjy nähili işleýär?

Iş dört ädimden ybarat we resminama bahalary diňe siziň serweriňize ýetýär:

1. **Serweriňiz görkezişi (presentation) açýar.** Ol barlaýjyny syýasat ady bilen çagyrýar we haýyşa giriş sertifikatyňyzyň açary bilen gol çekilen gysga möhletli beýannamany goşýar. Beýannama iň köp 60 sekunt güýjünde we diňe bir gezek ulanylyp bilner, şonuň üçin aýratyn parol gerek däl.
2. **Sahypa haýyşy görkezýär.** Kompýuterdäki adam QR kody, telefondaky adam bolsa "gapjykda aç" düwmesini görýär. Gapjyk oňa diňe soralýan meýdanlary görkezýär we adam tassyklaýar.
3. **Barlaýjy resminamany barlaýar.** Ol gola, ynam sanawyna, ýatyrylyş ýagdaýyna we resminamanyň ony görkezýän adama baglydygyna seredýär. Sahypa toplumy hem netijäni şu wagt öwrenýär.
4. **Serweriňiz netijäni alýar.** Resminama kabul edilen bolsa, tassyklanan meýdanlary hem alýar, ýöne diňe bir gezek.

```http title="Ýerleşdirilen barlaýjyda görkezişi açmak"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <statement signed with your access-certificate key>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Jogapda `presentation_id`, `qr_payload`, `expires_at` we `status_token` bahalary gelýär we serweriňiz olary sahypa geçirýär. Sahypa toplumyny barlaýjynyň özi hödürleýär:

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

Toplum hiç zady barlamaýar we hiç bir bahany görmeýär. Ol diňe görkezişiň ýagdaýyny yzarlaýar we karary siziň serweriňize goýýar:

```ts title="Serweriňiz: ilki netijäni, soňra tassyklanan meýdanlary okaň"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "gaýtadan synanyşyň", "ret edildi" däl

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // bahalar bir gezek berilýär
const { claims } = await res.json(); // mysal üçin claims.pseudonym, claims.given_name
```

Görkezişiň netijesini diňe ony açan saýt okap bilýär, başga biri synanyşsa `404` alýar. Bahalar bir gezek berilýär we netijeden bäş minut soň pozulýar. Şonuň üçin olary derrew işlemeli. Ýerleşdirilen barlaýjyda syýasat atlary we her syýasatyň haýsy meýdanlary soraýandygy tor bilen bilelikde kesgitlenýär. Mysal üçin, 18 ýaş barlagy diňe `age_over_18` meýdanyny ulanýar. Hasaba durandan soň passkey goşmak hem içinde, ähli ädimler [“Sign in with Tamga” goşmak](https://docs.tamga.network/guides/sign-in-with-tamga) gollanmasynda bar.

## Öz serweriňizde nähili barlamaly?

Munuň üçin `@tamga-network/verifier` we `@tamga-network/trust` paketlerini ulanýarsyňyz. Ilkinji haýyşdan öň ynam sanawlaryny `TrustSource` arkaly ýükläň ([sanawlar nähili barlanýar](/blog/how-trust-lists-work)) we ýatyrylyş sanawlaryny taýmer bilen öňünden ýüklemäge başlaň, sebäbi barlag pursatynda hiç zat ýüklenmeli däl. Soňra haýyşy gurýarsyňyz, jogaby açýarsyňyz we görkezişi barlaýarsyňyz:

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

`verifyPresentation` her gezek şol bir belgili ädimleri şol bir tertipde işledýär. Ilki formaty we goly (A), soňra resminama görnüşini (B), ynamy (C) we ýatyrylyş ýagdaýyny (D) barlaýar, iň soňunda bolsa siziň syýasatyňyzy (E) ulanýar. Ädimleriň hemmesi [verification API](https://docs.tamga.network/specifications/verification-api) sahypasynda ýazylan. Bu koduň synagdan geçen, işleýän görnüşi [kod mysallarynyň](https://docs.tamga.network/guides/code-examples) arasynda, giňişleýin düşündirişi bolsa [Serweriňizde barlaň](https://docs.tamga.network/guides/verify-on-server) gollanmasynda.

## Syýasat näme we näme üçin ol kod görnüşinde ýazylmaýar?

Syýasat size näme gerekdigini aýdýar. Haýsy resminama görnüşini, haýsy meýdanlary we haýsy ynamlylyk derejesini isleýändigiňizi, sanawlaryň iň köp näçe köne bolup biljekdigini şu ýerde görkezýärsiňiz. Gapjygyň görýän haýyşy (DCQL soragy) şu syýasatdan döredilýär we ony hiç kim elde ýazmaýar. Şonuň üçin has köp meýdan soramak üçin kody üýtgetmek gerek däl, syýasaty üýtgetmek ýeterlik. Syýasat hasaba alyşyňyzdaky gerimden artyk hiç zat sorap bilmeýär (AP6 düzgüni). Haýyşyň we şifrlenen jogabyň nähili gurulýandygyny [OpenID4VP we DCQL-a çuňňur seredilişi](/blog/openid4vp-dcql-deep-dive) ýazgysynda düşündirdik.

## Netijäni nähili okamaly?

![Üç netije, olaryň her biriniň manysy we ulanyja näme aýtmaly](/blog/add-verification-to-your-site/en/fig-sonuclar.png)

Üç netijäniň iň üns bermeli bolany üçünjisidir. `INDETERMINATE` barlaýjynyň şol pursat barlagy tamamlap bilmändigini görkezýär. Sanawy alyp bolmandyr ýa-da ol rugsat berlenden köne bolup biler, ýöne resminamanyň özi doly dogry bolup biler. Ulanyja "Häzir barlap bolmady, gaýtadan synanyşyň" diýiň we bu netijäni hiç haçan `REJECTED` bilen deň tutmaň (AP2 düzgüni). "Bu diplom galp" diýmek bilen "häzir barlap bilemok" diýmegiň arasyndaky tapawut kimdir biriniň işe alnyp-alynmajagyny kesgitläp biler.

Netije obýekti haýsy barlaglaryň geçirilendigini we haýsylarynyň geçirilmändigini sanaýar. Ony audit ýazgysy hökmünde saklap bilersiňiz, sebäbi onda diňe meýdan atlary bar we bahalar hiç haçan ýok. Žurnallaryňyza atlary we açarlary hem goşmak bilen hiç hili şahsy maglumat ýazmaň.

## Doglan senesini görmezden ýaşy barlap bolýarmy?

Hawa. Tamga Verify-da bu barlag `age-over-18-zk` syýasaty bilen eýýäm işleýär. `mso_mdoc_zk` formatyndaky syýasat gapjykdan zero-knowledge subutnamasyny soraýar. Gapjyk hasaba alnan guramanyň beren şahsyýet resminamasynda `age_over_18 = true` ýazylandygyny subut edýär we siz mundan başga hiç zat öwrenmeýärsiňiz. Resminamanyň özüni, doglan senesini, guramanyň goluny ýa-da enjam açaryny görmeýärsiňiz. Şol bir adamyň taýýarlan iki subutnamasyny hem biri-birine baglanyşdyryp bolmaýar ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

Gollanmada bu barada birnäçe amaly bellik bar:

- Barlag pakete goşulan WebAssembly bilen geçirilýär we iş stoly kompýuterinde her subutnama üçin takmynan 3 sekunt dowam edýär. Köp mukdarda işlejek bolsaňyz, ýerli (native) gurluş bu wagty 0,2–0,3 sekunda çenli azaldýar.
- Diňe gol çekilen ynam sanawynda bar bolan zynjyrlar (circuit) kabul edilýär.
- ZK görkezişi ýatyrylyş indeksini göterenok. Şonuň üçin syýasatyňyzda `accept_unrevocable_zk: true` bahasyny aç-açan ýazmaly. Ýatyrylyş barlagy siziň üçin hökmany bolsa, adaty `mso_mdoc` syýasatyny ulanyň.
- Gapjyk tarapynda Android üçin subutnama kitaphanasy taýýar, iOS wersiýasyna bolsa heniz garaşylýar. Subutnama döredip bilmeýän gapjyk, syýasatyňyz rugsat berse, adaty mdoc barlagyna geçýär we bu ýolda hem diňe `age_over_18` meýdany açylýar. Şonuň üçin iki ýoly hem bile hödürlemegi maslahat berýäris.

Sandbox-daky `age-zk` nusga barlaýjysy bu işi başdan-aýak görkezýär. Zynjyrlary, ynam sanawynyň bu ýerdäki roluny we usulyň çäklerini [Tamga-da zero-knowledge](/blog/zero-knowledge-in-tamga) ýazgysynda düşündirdik.

## Köp berilýän soraglar

### Saýtymyz adamyň tutuş resminamasyny görýärmi?

Ýok. Saýtyňyz diňe adamyň tassyklan meýdanlaryny alýar we ol meýdanlar hasaba alnan geriminiziň içinde bolmaly. Zero-knowledge syýasaty bilen bolsa diňe "hawa" ýa-da "ýok" jogabyny alýarsyňyz.

### Resminamany beren gurama biziň ony barlandygymyzy görüp bilýärmi?

Ýok. Ýatyrylyş sanawlary öňünden ýüklenýär we keşde saklanýar, şonuň üçin barlag pursatynda ne gurama, ne-de tora haýyş gidýär.

### Bu diňe Tamga Wallet bilen işleýärmi?

Ýok. Üpjün edijisi ynam sanawynda bolan we toruň gapjyk düzgünlerine eýerýän islendik gapjyk haýyşyňyza jogap berip biler.

### Içeri girilenden soň näme saklamaly?

Şahsy maglumat saklamagyň zerurlygy ýok, hasap açary ýeterlik. Nusga saýt saýta mahsus lakamyň açarly heşini saklaýar. Başga saýt şol bir adamy başga lakam bilen görýändigi üçin bu heşi öz ýazgylary bilen gabat getirip bilmeýär.

### Hasaba durmazdan synap bolýarmy?

Hawa, sandbox-da synap bilersiňiz. Ondaky nusga barlaýjylar we nusga saýt sandbox-yň nusga guramalarynyň beren resminamalary bilen işleýär. Hakyky resminamalary barlamak üçin bolsa hakyky torda hasaba alnan barlaýjy bolmaly.

## Çeşmeler

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açyk çeşmeli subutnama ulgamy)](https://github.com/google/longfellow-zk)
- [Tamga Network: “Sign in with Tamga” goşmak](https://docs.tamga.network/guides/sign-in-with-tamga) · [Serweriňizde barlaň](https://docs.tamga.network/guides/verify-on-server) · [Barlaýjy hökmünde hasaba durmak](https://docs.tamga.network/guides/register-verifier)
- [Kod mysallary](https://docs.tamga.network/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/packages/verifier) · [API salgylanmasy](https://docs.tamga.network/api/)
- [SDK-lar](/sdk) · [Barlaýjy hökmünde goşulmak](/learn/join-as-verifier)

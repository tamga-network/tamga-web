---
title: "Saytınıza və ya tətbiqinizə \"Tamga ilə yoxla\" əlavə edin"
slug: add-verification-to-your-site
description: "Tamga rəqəmsal sənədlərini saytda və ya tətbiqdə yoxlamağın iki yolu: səhifə dəsti ilə host edilən yoxlayan tərəf və ya @tamga-network/verifier ilə öz serveriniz."
date: 2026-10-08
lang: az
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Sources: GUIDE-0001 sign-in-with-tamga 1.0.0 (hosted verifier Tamga Verify; RP assertion signed with the access-certificate key, ≤60 s, single use; POST /presentations → presentation_id, qr_payload, expires_at, status_token; page kit tamga-verifier.js, TamgaVerifier.mount, /web subpath; kit does not verify and sees no values; claims given once, 410 on second read, deleted 5 min after the result; 404 for others; pseudonym per site; passkeys; policy names agreed with Tamga; sample site in the sandbox). GUIDE-0002 verify-on-server 1.0.0 (policy → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; three outcomes; checks_performed; nonce single use; ZK: mso_mdoc_zk, WASM ~3 s desktop, native ~0.2–0.3 s, accept_unrevocable_zk, Z1, fallback to mso_mdoc; wallet-side Android prover ready, iOS pending). GUIDE-0008 register-verifier (dns_name, access certificate, scopes, WRPRC, out-of-scope warning, pseudonym not accepted without registration). SPEC-API-0001 §2–§4 (result object, AP2–AP6, policy → DCQL, claims endpoint). Code examples page: packages 0.7.2 test release on npm, stable 1.0.0 when ready. examples/01-web-login/server.ts. Sandbox guide §6 (example verifiers incl. age-zk). External: OpenID4VP 1.0, HAIP 1.0, ISO/IEC 18013-5. -->

Vebsayta və ya tətbiqə "Tamga ilə yoxla" funksiyasını əlavə etməyin iki yolu var. Daha sürətli yol Tamga-nın host etdiyi yoxlayan tərəfdən, yəni Tamga Verify-dan istifadə edir: QR kod və ya "rəqəmsal cüzdanınızda açın" düyməsini göstərən kiçik səhifə dəsti, həmçinin sorğunu açan və təsdiqlənmiş sahələri toplayan iki qısa server endpoint-i əlavə edirsiniz. Digər yolda bütün yoxlama açıq mənbəli `@tamga-network/verifier` paketi ilə sizin öz serverinizdə aparılır: nəyə ehtiyacınız olduğunu siyasətdə (policy) təsvir edirsiniz, imzalanmış OpenID4VP sorğusu göndərirsiniz, rəqəmsal cüzdanın şifrələnmiş cavabını deşifrə edirsiniz və üç nəticədən birini alırsınız. Hər iki halda əvvəlcə yoxlayan tərəf kimi qeydiyyatdan keçirsiniz ki, rəqəmsal cüzdanlar kimin və nə üçün soruşduğunu bilsin.

> **Qeyd:** `@tamga-network/*` paketləri npm-də 0.7.2 test buraxılışı kimi dərc olunub; sabit 1.0.0 versiyası hər şey hazır olduqda çıxacaq. Test buraxılışlarında API dəyişə bilər. Aşağıdakı kod həmin buraxılışın API-sinə aiddir.

## Kod yazmazdan əvvəl nəyə ehtiyacınız var?

Etibar siyahısında yoxlayan tərəf qeydi. Sorğu daxil olduqda rəqəmsal cüzdan üç şeyi yoxlayır: sorğunu kimin göndərdiyini, həmin göndərənin qeydiyyatda olub-olmadığını və aktiv olduğunu, habelə istənilən sahələrin qeydiyyatdan keçmiş əhatə dairəsinə daxil olub-olmadığını. Qeydiyyatda olmayan sayt da rəqəmsal cüzdana sorğu göndərə bilir, lakin onun istədiyi hər bir sahə "qeydiyyatdan keçmiş əhatə dairəsindən kənar" xəbərdarlığı ilə göstərilir, belə saytdan gələn psevdonim sorğusu isə birbaşa rədd edilir.

Qeydiyyat qeydiyyatçıya ([Yoxlayan tərəf kimi qeydiyyat](https://docs.tamga.network/guides/register-verifier)) aşağıdakıları təqdim etmək deməkdir:

- domen adınız; bu, sizin daimi kimliyiniz olur;
- sorğuları imzalayacağınız açar üçün sertifikat imzalama sorğusu (açar sizdə qalır); müştəri identifikatorunuz (client identifier) nəticədə verilən giriş sertifikatından əldə edilir;
- hər nəzərdə tutulan istifadə üçün bir **əhatə dairəsi (scope)**: sadə sözlərlə ifadə olunmuş məqsəd, bir rəqəmsal sənəd növü və həmin məqsəd üçün lazım olan ən az sahə, üstəlik məxfilik siyasətinin linki;
- Avropa İttifaqının (Aİ) ümumi qeydiyyat məlumatları: ticarət adı, rəsmi identifikator, ünvan, əlaqə məlumatları, məlumatların qorunması üzrə nəzarət orqanı.

Məsələn, tələbə endirimi təklif edən mağaza tələbə rəqəmsal sənədindən yalnız `is_enrolled` tələb edir: adı, məktəbi, tələbə nömrəsini yox. Əhatə dairələrini bu qədər dar saxlasanız, rəqəmsal cüzdanın razılıq ekranı da qısa qalır.

Qeydiyyatdan əvvəl sınamaq üçün sandbox mühitindən istifadə edin: [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) ünvanında giriş, yaş, diplom, tələbə endirimi və tədbirə giriş üçün nümunə yoxlayan tərəflər, [/sample-site](https://verify.sandbox.tamga.network/sample-site) ünvanında isə işlək nümunə sayt var.

## Hansı yolu seçməlisiniz?

![Host edilən yoxlayan tərəf, yoxsa öz serveriniz: paket, kim yoxlayır, dəyərlər hara gedir, siyahıları kim saxlayır](/blog/add-verification-to-your-site/en/fig-iki-yol.png)

Host edilən yoxlayan tərəf qeydiyyat və giriş üçün, eləcə də tez başlamaq istəyən komandalar üçün uyğundur. Öz serveriniz isə rəqəmsal sənəd dəyərlərinin heç bir vasitəçidən keçməsini istəməyən və ya artıq intensiv yoxlama infrastrukturu işlədən təşkilatlara uyğundur. Hər ikisi eyni yoxlama prosesini icra edir; `verify.tamga.network` ünvanındakı istinad yoxlayan tərəfi də sizin quraşdıracağınız eyni kitabxana üzərində qurulub.

## Host edilən yoxlayan tərəf necə işləyir?

Dörd addım, dəyərlər isə yalnız sizin serverinizə çatır:

1. **Serveriniz təqdimat açır.** O, siyasət adı və giriş sertifikatınızın açarı ilə imzalanmış qısamüddətli bəyanatla (ən çoxu 60 saniyə etibarlı, birdəfəlik) yoxlayan tərəfə müraciət edir. Ayrıca parol yoxdur.
2. **Səhifə sorğunu göstərir.** Kompüterdə QR kod, telefonda "rəqəmsal cüzdanınızda açın" düyməsi. Şəxs yalnız tələb olunan sahələri görür və təsdiqləyir.
3. **Yoxlayan tərəf rəqəmsal sənədi yoxlayır** (imza, etibar siyahısı, ləğv, sənəd sahibinə bağlılıq), səhifə dəsti isə nəticəni öyrənir.
4. **Serveriniz nəticəni götürür**, qəbul edilibsə, təsdiqlənmiş sahələri də bir dəfə alır.

```http title="Opening a presentation at the hosted verifier"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <statement signed with your access-certificate key>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Cavabda `presentation_id`, `qr_payload`, `expires_at` və `status_token` olur; serveriniz bunları səhifəyə ötürür. Səhifə dəsti yoxlayan tərəf tərəfindən təqdim edilir:

```html title="The page kit on your sign-up page"
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

Dəst heç nəyi yoxlamır və heç bir dəyəri görmür; o, yalnız vəziyyəti izləyir. Qərar sizin serverinizdə verilir:

```ts title="Your server: read the result, then the approved fields"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "try again", not "rejected"

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // values are handed out once
const { claims } = await res.json(); // e.g. claims.pseudonym, claims.given_name
```

Təqdimatın nəticəsini yalnız onu açan sayt oxuya bilər; başqa hər kəs `404` alır. Dəyərlər bir dəfə verilir və nəticədən beş dəqiqə sonra silinir, ona görə də onları dərhal emal edin. Host edilən yoxlayan tərəfdə siyasət adları və onların sahə dəstləri şəbəkə ilə razılaşdırılır (məsələn, 18 yaşdan yuxarı yoxlaması yalnız `age_over_18` sahəsindən istifadə edir). Qeydiyyatdan sonrakı passkey-lər daxil olmaqla tam təlimat ["Tamga ilə daxil ol" funksiyasını əlavə edin](https://docs.tamga.network/guides/sign-in-with-tamga) bələdçisindədir.

## Öz serverinizdə necə yoxlamaq olar?

`@tamga-network/verifier` və `@tamga-network/trust` ilə. İlk sorğudan əvvəl etibar siyahılarını `TrustSource` vasitəsilə yükləyin ([siyahılar necə yoxlanılır](/blog/how-trust-lists-work)) və ləğv siyahılarını taymerlə əvvəlcədən yükləməyə başlayın; yoxlama anında heç nə endirilməməlidir. Sonra:

```ts title="Your own server: request, decrypt, verify"
import { dcqlFromPolicy, createPresentationRequest, decryptResponse, verifyPresentation,
         pemRpSigner, PrefetchStatusCache, type Policy } from "@tamga-network/verifier";

const signer = await pemRpSigner(RP_KEY_PEM, RP_CERT_PEM); // client_id comes from the certificate
const req = await createPresentationRequest({ signer, dcql: dcqlFromPolicy(policy),
  responseUri: "https://shop.example.com/vp/response", requestUriBase: "https://shop.example.com/vp/req",
  registrationCert: WRPRC_JWT }); // qeydiyyat sertifikatınız (trust.tamga.network/wrprc/); 0.7.0-dan bəri rəqəmsal cüzdanlar onsuz sorğunu rədd edir
// req.qrPayload → QR code or deep link; it carries no personal data

// the wallet POSTs an encrypted answer to responseUri
const answer = await decryptResponse(jweBody, req.encPrivateKey);
const { result, claims } = await verifyPresentation({ presentation: answer.vp_token["student"][0],
  aud: signer.clientId, nonce: req.nonce, policy, policyCredentialId: "student",
  trust, statusCache, rootCertsDer, rp: trust.relyingParty(signer.clientId) });
```

`verifyPresentation` arxasındakı addımlar sabit və nömrələnmişdir: format və imza (A), rəqəmsal sənəd növü (B), etibar (C), ləğv (D) və öz siyasətiniz (E). Onlar [yoxlama API-si](https://docs.tamga.network/specifications/verification-api) sənədində sadalanır. Bu kodun sınaqdan keçirilmiş, işlək versiyası [kod nümunələri](https://docs.tamga.network/guides/code-examples) arasındadır; bələdçi isə [Serverinizdə yoxlayın](https://docs.tamga.network/guides/verify-on-server) səhifəsindədir.

## Siyasət nədir və niyə kod deyil?

Siyasət nəyə ehtiyacınız olduğunu müəyyən edir: hansı rəqəmsal sənəd növü, hansı sahələr, hansı etibarlılıq səviyyəsi, siyahılar nə dərəcədə təzə olmalıdır. Rəqəmsal cüzdanın gördüyü sorğu (DCQL sorğusu) heç vaxt əllə yazılmır, siyasətdən yaradılır. Buna görə daha çox məlumat istəmək kod dəyişikliyi deyil, siyasət dəyişikliyi tələb edir və siyasət heç vaxt qeydiyyatınızdakı əhatə dairəsindən artığını tələb edə bilməz (AP6 qaydası). Sorğunun və şifrələnmiş cavabın necə qurulduğu [OpenID4VP və DCQL-ə ətraflı baxış](/blog/openid4vp-dcql-deep-dive) yazısında izah olunur.

## Nəticəni necə oxumaq lazımdır?

![Üç nəticə, hər birinin mənası və istifadəçiyə nə deməli](/blog/add-verification-to-your-site/en/fig-sonuclar.png)

Düzgün işlənməli olan üçüncü nəticədir. `INDETERMINATE` o deməkdir ki, yoxlayan tərəf hazırda yoxlama apara bilmədi: siyahını əldə etmək mümkün olmadı və ya siyahı çox köhnədir. Rəqəmsal sənəd tamamilə etibarlı ola bilər. "Hazırda yoxlamaq mümkün deyil, zəhmət olmasa yenidən cəhd edin" mesajını göstərin və bunu heç vaxt `REJECTED` ilə eyni kateqoriyaya salmayın (AP2 qaydası). "Bu diplom saxtadır" ilə "hazırda yoxlaya bilmirəm" arasındakı fərq kiminsə işə götürülüb-götürülməyəcəyini həll edə bilər.

Nəticə obyekti icra edilən və buraxılan yoxlamaları sadalayır; bunları audit üçün saxlaya bilərsiniz. Orada sahə adları olur, dəyərlər isə heç vaxt. Adlar və açarlar da daxil olmaqla fərdi məlumatları loglara yazmayın.

## Doğum tarixini görmədən yaşı yoxlamaq olarmı?

Bəli, və bu, Tamga Verify-da `age-over-18-zk` siyasəti kimi artıq işləyir. `mso_mdoc_zk` formatındakı siyasət sıfır biliklə sübut (zero-knowledge proof) tələb edir: rəqəmsal cüzdan qeydiyyatdan keçmiş qurumun verdiyi şəxsiyyət rəqəmsal sənədində `age_over_18 = true` göstərildiyini sübut edir, siz isə başqa heç nə öyrənmirsiniz. Siz rəqəmsal sənədi, doğum tarixini, qurumun imzasını və ya cihaz açarını görmürsünüz, eyni şəxsin iki sübutunu isə bir-biri ilə əlaqələndirmək mümkün deyil ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

Bələdçidən bir neçə praktik məqam:

- Yoxlama paketə daxil olan WebAssembly üzərində işləyir və masaüstü kompüterdə hər sübut üçün təxminən 3 saniyə çəkir. Yüksək həcm üçün yerli (native) yığım təxminən 0,2–0,3 saniyə çəkir.
- Yalnız imzalanmış etibar siyahısında göstərilən sxemlər (circuits) qəbul edilir.
- ZK təqdimatında ləğv indeksi olmur, ona görə də siyasətdə `accept_unrevocable_zk: true` açıq şəkildə göstərilməlidir. Ləğv yoxlamasına ehtiyacınız varsa, klassik `mso_mdoc` siyasətindən istifadə edin.
- Rəqəmsal cüzdan tərəfində Android üçün sübut kitabxanası hazırdır, iOS isə hələ gözlənilir. Sübut yarada bilməyən rəqəmsal cüzdan, siyasətiniz icazə verirsə, yalnız `age_over_18` açıqlayan klassik mdoc yoxlamasına keçir. Hər ikisini təklif edin.

Sandbox-dakı `age-zk` nümunə yoxlayan tərəfi axını əvvəldən sona qədər göstərir. Sxemlər, etibar siyahısının rolu və məhdudiyyətlər [Tamga-da sıfır bilik (zero-knowledge)](/blog/zero-knowledge-in-tamga) yazısında izah olunur.

## Tez-tez verilən suallar

### Saytım şəxsin bütün rəqəmsal sənədini görürmü?

Xeyr. Sayt yalnız şəxsin təsdiqlədiyi sahələri alır və bu sahələr qeydiyyatdakı əhatə dairənizin daxilində olmalıdır. Sıfır bilik siyasəti ilə isə yalnız "bəli" və ya "xeyr" cavabı alır.

### Sənədi verən qurum rəqəmsal sənədi yoxladığımızı görə bilərmi?

Xeyr. Ləğv siyahıları əvvəlcədən əldə edilir və keşdə saxlanılır; yoxlama anında nə quruma, nə də şəbəkəyə heç bir sorğu getmir.

### Bu, yalnız Tamga Wallet ilə işləyirmi?

Xeyr. Cüzdan provayderi etibar siyahısında olan və şəbəkənin rəqəmsal cüzdan qaydalarına əməl edən istənilən rəqəmsal cüzdan sorğunuza cavab verə bilər.

### Girişdən sonra nəyi saxlamalıyıq?

Fərdi məlumatlar deyil, hesab açarı. Nümunə sayt sayta xas psevdonimin açarlı heşini saxlayır; başqa sayt bu heşi uyğunlaşdıra bilməz, çünki o, eyni şəxs üçün fərqli psevdonim görür.

### Qeydiyyatdan keçmədən sınaq aparmaq olarmı?

Bəli, sandbox-da. Onun nümunə yoxlayan tərəfləri və nümunə saytı sandbox-ın nümunə qurumlarının verdiyi rəqəmsal sənədlərlə işləyir. Real rəqəmsal sənədlər üçün real şəbəkədə qeydiyyatdan keçmiş yoxlayan tərəf lazımdır.

## Mənbələr

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açıq mənbəli sübut sistemi)](https://github.com/google/longfellow-zk)
- [Tamga Network: "Tamga ilə daxil ol" funksiyasını əlavə edin](https://docs.tamga.network/guides/sign-in-with-tamga) · [Serverinizdə yoxlayın](https://docs.tamga.network/guides/verify-on-server) · [Yoxlayan tərəf kimi qeydiyyat](https://docs.tamga.network/guides/register-verifier)
- [Kod nümunələri](https://docs.tamga.network/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/packages/verifier) · [API arayışı](https://docs.tamga.network/api/)
- [SDK-lar](/sdk) · [Yoxlayan tərəf kimi qoşulma](/learn/join-as-verifier)

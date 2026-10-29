---
title: "Saytınıza və ya tətbiqinizə \"Tamga ilə yoxla\" əlavə edin"
slug: add-verification-to-your-site
description: "Tamga sənədlərini saytınızda və ya tətbiqinizdə iki yolla yoxlaya bilərsiniz: səhifə dəsti ilə host edilən yoxlayan tərəfdən istifadə edirsiniz və ya yoxlamanı @tamga-network/verifier ilə öz serverinizdə aparırsınız."
date: 2026-10-08
lang: az
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Sources: GUIDE-0001 sign-in-with-tamga 1.0.0 (hosted verifier Tamga Verify; RP assertion signed with the access-certificate key, ≤60 s, single use; POST /presentations → presentation_id, qr_payload, expires_at, status_token; page kit tamga-verifier.js, TamgaVerifier.mount, /web subpath; kit does not verify and sees no values; claims given once, 410 on second read, deleted 5 min after the result; 404 for others; pseudonym per site; passkeys; policy names agreed with Tamga; sample site in the sandbox). GUIDE-0002 verify-on-server 1.0.0 (policy → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; three outcomes; checks_performed; nonce single use; ZK: mso_mdoc_zk, WASM ~3 s desktop, native ~0.2–0.3 s, accept_unrevocable_zk, Z1, fallback to mso_mdoc; wallet-side Android prover ready, iOS pending). GUIDE-0008 register-verifier (dns_name, access certificate, scopes, WRPRC, out-of-scope warning, pseudonym not accepted without registration). SPEC-API-0001 §2–§4 (result object, AP2–AP6, policy → DCQL, claims endpoint). Code examples page: packages 0.7.4 test release on npm, stable 1.0.0 when ready. examples/01-web-login/server.ts. Sandbox guide §6 (example verifiers incl. age-zk). External: OpenID4VP 1.0, HAIP 1.0, ISO/IEC 18013-5. -->

Vebsayta və ya tətbiqə "Tamga ilə yoxla" əlavə etməyin iki yolu var. Daha sürətli yolda Tamga-nın host etdiyi yoxlayan tərəfdən, Tamga Verify-dan istifadə edirsiniz. Səhifənizə QR kodu və ya "cüzdanda aç" düyməsini göstərən kiçik səhifə dəsti, serverinizə isə sorğunu açan və təsdiqlənmiş sahələri alan iki qısa endpoint əlavə etmək kifayətdir. Digər yolda bütün yoxlamanı açıq mənbəli `@tamga-network/verifier` paketi ilə öz serverinizdə aparırsınız. Nəyə ehtiyacınız olduğunu siyasətdə (policy) təsvir edir, imzalanmış OpenID4VP sorğusu göndərir, cüzdanın şifrələnmiş cavabını açır və üç nəticədən birini alırsınız. Hansı yolu seçsəniz də, əvvəlcə yoxlayan tərəf kimi qeydiyyatdan keçməlisiniz, çünki cüzdan kimin və hansı məqsədlə soruşduğunu bu qeyddən öyrənir.

> **Qeyd:** `@tamga-network/*` paketləri npm-də 0.7.4 test buraxılışı kimi dərc olunur; sabit 1.0.0 versiyası hər şey hazır olanda çıxacaq. Test buraxılışlarında API dəyişə bilər. Aşağıdakı kod həmin buraxılışın API-sindən istifadə edir.

## Kod yazmazdan əvvəl nə lazımdır?

Əvvəlcə etibar siyahısında yoxlayan tərəf qeydiniz olmalıdır. Sorğu gələndə cüzdan üç şeyə baxır. Sorğunu kimin göndərdiyini, göndərənin qeydiyyatda və aktiv olub-olmadığını və istənilən sahələrin qeydiyyatdakı əhatə dairəsinə (scope) düşüb-düşmədiyini yoxlayır. Qeydiyyatsız sayt da cüzdana çata bilər, amma onun istədiyi hər sahə "qeydiyyatdakı əhatə dairəsindən kənar" xəbərdarlığı ilə göstərilir. Belə saytdan gələn psevdonim sorğusu isə ümumiyyətlə qəbul edilmir.

Qeydiyyat üçün qeydiyyat orqanına bu məlumatları verirsiniz ([Yoxlayan tərəf kimi qeydiyyat](https://docs.tamga.network/guides/register-verifier)):

- domen adınız; bu ad sizin daimi kimliyiniz olur;
- sorğuları imzalayacağınız açar üçün sertifikat imzalama sorğusu (açar sizdə qalır); müştəri identifikatorunuz (client identifier) bu sorğudan çıxan giriş sertifikatından alınır;
- hər istifadə məqsədi üçün ayrıca **əhatə dairəsi**, yəni sadə dillə yazılmış məqsəd, bir sənəd növü, bu məqsəd üçün lazım olan ən az sahə və məxfilik siyasətinizin linki;
- Aİ-nin ümumi qeydiyyat məlumatları: ticarət adı, rəsmi identifikator, ünvan, əlaqə məlumatı və tabe olduğunuz məlumatların qorunması orqanı.

Məsələn, tələbə endirimi edən mağaza tələbə sənədindən yalnız `is_enrolled` sahəsini istəyir. Tələbənin adına, məktəbinə və ya tələbə nömrəsinə ehtiyacı yoxdur. Əhatə dairələrini bu qədər dar saxlasanız, cüzdanın razılıq ekranı da qısa olur.

Qeydiyyatdan əvvəl hər şeyi sandbox-da sınaya bilərsiniz. [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) ünvanında giriş, yaş, diplom, tələbə endirimi və tədbirə giriş üçün nümunə yoxlayan tərəflər, [/sample-site](https://verify.sandbox.tamga.network/sample-site) ünvanında isə işlək nümunə sayt var.

## Hansı yolu seçməlisiniz?

![Host edilən yoxlayan tərəf, yoxsa öz serveriniz: paket, kim yoxlayır, dəyərlər hara gedir, siyahıları kim saxlayır](/blog/add-verification-to-your-site/en/fig-iki-yol.png)

Host edilən yoxlayan tərəf qeydiyyat və giriş səhifələri, eləcə də tez başlamaq istəyən komandalar üçün uyğundur. Sənəd dəyərlərinin heç bir vasitəçidən keçməsini istəməyən və ya artıq intensiv yoxlama aparan infrastruktur işlədən təşkilatlar isə adətən yoxlamanı öz serverlərində edir. Hər iki yol eyni yoxlama ardıcıllığını işlədir. `verify.tamga.network` ünvanındakı istinad yoxlayan tərəfi də sizin quraşdıracağınız kitabxananın üzərində qurulub.

## Host edilən yoxlayan tərəf necə işləyir?

Proses dörd addımdan ibarətdir və sənəd dəyərləri yalnız sizin serverinizə çatır:

1. **Serveriniz təqdimat açır.** Yoxlayan tərəfnı siyasət adı ilə çağırır və sorğuya giriş sertifikatınızın açarı ilə imzalanmış qısamüddətli bəyanat əlavə edir. Bəyanat ən çoxu 60 saniyə etibarlıdır və bir dəfə istifadə oluna bilər, ona görə ayrıca parola ehtiyac qalmır.
2. **Səhifə sorğunu göstərir.** Kompüterdə olan şəxs QR kod, telefonda olan şəxs isə "cüzdanda aç" düyməsini görür. Cüzdan ona yalnız istənilən sahələri göstərir və şəxs təsdiqləyir.
3. **Yoxlayan tərəf sənədi yoxlayır.** İmzaya, etibar siyahısına, ləğv vəziyyətinə və sənədin onu təqdim edən şəxsə bağlı olub-olmamasına baxır. Səhifə dəsti də nəticəni bu zaman öyrənir.
4. **Serveriniz nəticəni alır.** Sənəd qəbul edilibsə, təsdiqlənmiş sahələri də alır, amma yalnız bir dəfə.

```http title="Opening a presentation at the hosted verifier"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <statement signed with your access-certificate key>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Cavabda `presentation_id`, `qr_payload`, `expires_at` və `status_token` dəyərləri gəlir və serveriniz onları səhifəyə ötürür. Səhifə dəstini yoxlayan tərəfin özü təqdim edir:

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

Dəst heç nəyi yoxlamır və heç bir dəyəri görmür. O, yalnız təqdimatın vəziyyətini izləyir və qərarı sizin serverinizə buraxır:

```ts title="Your server: read the result, then the approved fields"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "try again", not "rejected"

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // values are handed out once
const { claims } = await res.json(); // e.g. claims.pseudonym, claims.given_name
```

Təqdimatın nəticəsini yalnız onu açan sayt oxuya bilər, başqası cəhd etsə `404` alır. Dəyərlər bir dəfə verilir və nəticədən beş dəqiqə sonra silinir. Ona görə onları dərhal emal etməlisiniz. Host edilən yoxlayan tərəfdə siyasət adları və hər siyasətin hansı sahələri istədiyi şəbəkə ilə birlikdə müəyyən edilir. Məsələn, 18 yaş yoxlaması yalnız `age_over_18` sahəsindən istifadə edir. Qeydiyyatdan sonra passkey əlavə etmək də daxil olmaqla bütün addımlar ["Tamga ilə daxil ol" funksiyasını əlavə edin](https://docs.tamga.network/guides/sign-in-with-tamga) bələdçisindədir.

## Öz serverinizdə necə yoxlayırsınız?

Bunun üçün `@tamga-network/verifier` və `@tamga-network/trust` paketlərindən istifadə edirsiniz. İlk sorğudan əvvəl etibar siyahılarını `TrustSource` vasitəsilə yükləyin ([siyahılar necə yoxlanılır](/blog/how-trust-lists-work)) və ləğv siyahılarını taymerlə əvvəlcədən endirməyə başlayın, çünki yoxlama anında heç nə endirilməməlidir. Sonra sorğunu qurur, cavabı açır və təqdimatı yoxlayırsınız:

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

`verifyPresentation` hər dəfə eyni nömrəli addımları eyni ardıcıllıqla işlədir. Əvvəlcə formatı və imzanı (A), sonra sənəd növünü (B), etibarı (C) və ləğv vəziyyətini (D) yoxlayır, sonda isə sizin siyasətinizi (E) tətbiq edir. Addımların hamısı [yoxlama API-si](https://docs.tamga.network/specifications/verification-api) sənədində yazılıb. Bu kodun sınaqdan keçmiş, işlək versiyası [kod nümunələri](https://docs.tamga.network/guides/code-examples) arasındadır, ətraflı izahı isə [Serverinizdə yoxlayın](https://docs.tamga.network/guides/verify-on-server) bələdçisindədir.

## Siyasət nədir və niyə kod kimi yazılmır?

Siyasət nəyə ehtiyacınız olduğunu deyir. Hansı sənəd növünü, hansı sahələri və hansı etibar səviyyəsini istədiyinizi, siyahıların ən çoxu nə qədər köhnə ola biləcəyini burada göstərirsiniz. Cüzdanın gördüyü sorğu (DCQL sorğusu) bu siyasətdən yaradılır və heç kim onu əllə yazmır. Ona görə daha çox sahə istəmək üçün kodu dəyişmək lazım deyil, siyasəti dəyişmək kifayətdir. Siyasət qeydiyyatınızdakı əhatə dairəsindən artıq heç nə istəyə bilməz (AP6 qaydası). Sorğunun və şifrələnmiş cavabın necə qurulduğunu [OpenID4VP və DCQL-ə ətraflı baxış](/blog/openid4vp-dcql-deep-dive) yazısında izah etmişik.

## Nəticəni necə oxumalı?

![Üç nəticə, hər birinin mənası və istifadəçiyə nə deməli](/blog/add-verification-to-your-site/en/fig-sonuclar.png)

Üç nəticədən ən diqqətli yanaşma tələb edəni üçüncüsüdür. `INDETERMINATE` yoxlayan tərəfin həmin an yoxlamanı başa çatdıra bilmədiyini göstərir. Siyahı alına bilməyib və ya icazə veriləndən köhnə ola bilər, amma sənədin özü tamamilə etibarlı ola bilər. İstifadəçiyə "Hazırda yoxlamaq mümkün olmadı, zəhmət olmasa yenidən cəhd edin" deyin və bu nəticəni heç vaxt `REJECTED` ilə bir tutmayın (AP2 qaydası). "Bu diplom saxtadır" demək ilə "hazırda yoxlaya bilmirəm" demək arasındakı fərq kiminsə işə götürülüb-götürülməməsini həll edə bilər.

Nəticə obyekti hansı yoxlamaların aparıldığını və hansılarının buraxıldığını sadalayır. Onu audit qeydi kimi saxlaya bilərsiniz, çünki orada yalnız sahə adları olur və dəyərlər heç vaxt yer almır. Loglarınıza adlar və açarlar da daxil olmaqla heç bir fərdi məlumat yazmayın.

## Doğum tarixini görmədən yaşı yoxlamaq olarmı?

Bəli. Tamga Verify-da bu yoxlama `age-over-18-zk` siyasəti ilə artıq işləyir. `mso_mdoc_zk` formatındakı siyasət cüzdandan sıfır bilikli sübut (zero-knowledge proof) istəyir. Cüzdan qeydiyyatdakı qurumun verdiyi şəxsiyyət sənədində `age_over_18 = true` yazıldığını sübut edir və siz bundan başqa heç nə öyrənmirsiniz. Sənədin özünü, doğum tarixini, qurumun imzasını və ya cihaz açarını görmürsünüz. Eyni şəxsin hazırladığı iki sübutu da bir-biri ilə əlaqələndirmək olmur ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

Bələdçidə bu barədə bir neçə praktik qeyd var:

- Yoxlama paketə daxil edilmiş WebAssembly ilə aparılır və masaüstü kompüterdə hər sübut üçün təxminən 3 saniyə çəkir. Yüksək həcmdə işləyəcəksinizsə, yerli (native) yığım bu müddəti 0,2–0,3 saniyəyə endirir.
- Yalnız imzalanmış etibar siyahısında olan sxemlər (circuits) qəbul edilir.
- ZK təqdimatı ləğv indeksi daşımır. Ona görə siyasətinizdə `accept_unrevocable_zk: true` dəyərini açıq yazmalısınız. Ləğv yoxlaması sizin üçün şərtdirsə, klassik `mso_mdoc` siyasətindən istifadə edin.
- Cüzdan tərəfində Android üçün sübut kitabxanası hazırdır, iOS versiyası isə hələ gözlənilir. Sübut yarada bilməyən cüzdan, siyasətiniz icazə verirsə, klassik mdoc yoxlamasına keçir və bu yolda da yalnız `age_over_18` sahəsi açılır. Ona görə hər iki yolu birlikdə təklif etməyi tövsiyə edirik.

Sandbox-dakı `age-zk` nümunə yoxlayan tərəfi bu prosesi əvvəldən axıra qədər göstərir. Sxemləri, etibar siyahısının buradakı rolunu və üsulun məhdudiyyətlərini [Tamga-da sıfır bilik (zero-knowledge)](/blog/zero-knowledge-in-tamga) yazısında izah etmişik.

## Tez-tez verilən suallar

### Saytımız şəxsin bütün sənədini görürmü?

Xeyr. Saytınız yalnız şəxsin təsdiqlədiyi sahələri alır və bu sahələr qeydiyyatdakı əhatə dairənizin daxilində olmalıdır. Sıfır bilik siyasəti ilə isə yalnız "bəli" və ya "xeyr" cavabı alırsınız.

### Sənədi verən qurum onu yoxladığımızı görə bilərmi?

Xeyr. Ləğv siyahıları əvvəlcədən endirilir və keşdə saxlanılır, ona görə yoxlama anında nə quruma, nə də şəbəkəyə sorğu getmir.

### Bu, yalnız Tamga Wallet ilə işləyirmi?

Xeyr. Provayderi etibar siyahısında olan və şəbəkənin cüzdan qaydalarına əməl edən istənilən cüzdan sorğunuza cavab verə bilər.

### Girişdən sonra nəyi saxlamalıyıq?

Fərdi məlumat saxlamağa ehtiyac yoxdur, hesab açarı kifayətdir. Nümunə sayt sayta xas psevdonimin açarlı heşini saxlayır. Başqa sayt eyni şəxsi fərqli psevdonimlə gördüyü üçün bu heşi öz qeydləri ilə uyğunlaşdıra bilməz.

### Qeydiyyatdan keçmədən sınaya bilərikmi?

Bəli, sandbox-da sınaya bilərsiniz. Oradakı nümunə yoxlayan tərəflər və nümunə sayt sandbox-ın nümunə qurumlarının verdiyi sənədlərlə işləyir. Real sənədləri yoxlamaq üçün isə real şəbəkədə qeydiyyatdan keçmiş yoxlayan tərəf olmalısınız.

## Mənbələr

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açıq mənbəli sübut sistemi)](https://github.com/google/longfellow-zk)
- [Tamga Network: "Tamga ilə daxil ol" funksiyasını əlavə edin](https://docs.tamga.network/guides/sign-in-with-tamga) · [Serverinizdə yoxlayın](https://docs.tamga.network/guides/verify-on-server) · [Yoxlayan tərəf kimi qeydiyyat](https://docs.tamga.network/guides/register-verifier)
- [Kod nümunələri](https://docs.tamga.network/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/packages/verifier) · [API arayışı](https://docs.tamga.network/api/)
- [SDK-lar](/sdk) · [Yoxlayan tərəf kimi qoşulma](/learn/join-as-verifier)

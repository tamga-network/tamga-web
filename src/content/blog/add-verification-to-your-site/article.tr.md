---
title: Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin
slug: add-verification-to-your-site
description: Tamga belgelerini sitenizde ya da uygulamanızda denetlemenin iki yolu: sayfa kitiyle barındırılan doğrulayıcı ya da kendi sunucunuz.
date: 2026-10-08
lang: tr
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Kaynak: GUIDE-0001 sign-in-with-tamga 1.0.0 (Tamga Verify; erişim sertifikası anahtarıyla imzalı kısa ömürlü beyan, ≤60 sn, tek kullanım; POST /presentations → presentation_id, qr_payload, expires_at, status_token; sayfa kiti tamga-verifier.js, TamgaVerifier.mount, /web; kit doğrulamaz ve değer görmez; değerler bir kez, ikinci okumada 410, sonuçtan 5 dk sonra silinir; başkasına 404; siteye özel takma ad; passkey; politika adları Tamga ile belirlenir; sandbox örnek site). GUIDE-0002 verify-on-server 1.0.0 (politika → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; üç sonuç; checks_performed; nonce tek kullanım; ZK: mso_mdoc_zk, WASM masaüstünde ~3 sn, yerel ~0,2–0,3 sn, accept_unrevocable_zk, Z1, mso_mdoc'a dönüş). GUIDE-0008 register-verifier (dns_name, erişim sertifikası, kapsamlar, WRPRC, kapsam dışı uyarısı, kayıtsız takma ad isteği kabul edilmez). SPEC-API-0001 §2–§4 (AP2–AP6). Kod örnekleri sayfası: paketler npm'de 0.3.0 deneme sürümü, kararlı 1.0.0 hazır olunca. Sandbox rehberi §6 (age-zk dahil örnek doğrulayıcılar). Dış: OpenID4VP 1.0, HAIP 1.0. -->

Bir web sitesine ya da uygulamaya "Tamga ile doğrula" eklemenin iki yolu var. Daha hızlı olanı Tamga'nın barındırılan doğrulayıcısı Tamga Verify'ı kullanır: sayfanıza QR kod ya da "cüzdanında aç" düğmesi gösteren küçük bir sayfa kiti, sunucunuza da isteği açan ve onaylanan alanları alan iki kısa uç eklersiniz. Öbür yolda bütün denetim, açık kaynak `@tamga-network/verifier` paketiyle kendi sunucunuzda yapılır: neye ihtiyacınız olduğunu bir politikayla tarif eder, imzalı bir OpenID4VP isteği gönderir, cüzdanın şifreli yanıtını çözer ve üç sonuçtan birini alırsınız. İki yolda da önce doğrulayıcı olarak kaydolursunuz; böylece cüzdan kimin, ne için sorduğunu bilir.

> **Not:** `@tamga-network/*` paketleri npm'de 0.3.0 deneme sürümüyle yayımlanır; kararlı 1.0.0 hazır olunca gelir. Deneme sürümünde arayüz değişebilir. Aşağıdaki kod bu sürümün API'sidir.

## Kod yazmadan önce ne gerekiyor?

Güven listesinde bir doğrulayıcı kaydı. İstek geldiğinde cüzdan üç şeye bakar: isteği kim gönderiyor, bu gönderen kayıtlı ve etkin mi, istenen alanlar kayıtlı kapsamın içinde mi. Kayıtsız bir site de cüzdana ulaşır ama istediği her alan "kayıtlı kapsamın dışında" uyarısıyla gösterilir, takma ad isteği ise hiç kabul edilmez.

Kayıt için kayıt makamına şunları verirsiniz ([Doğrulayıcı olarak kayıt](https://docs.tamga.network/tr/guides/register-verifier)):

- kalıcı kimliğiniz olacak alan adınız;
- istekleri imzalayacağınız anahtar için bir sertifika imzalama isteği (anahtar sizde kalır); istemci tanımlayıcınız ortaya çıkan erişim sertifikasından türetilir;
- her kullanım amacı için bir **kapsam**: sade bir dille yazılmış amaç, tek bir belge türü ve o amacın gerektirdiği en az alan, bir de gizlilik politikası bağlantısı;
- AB ortak kayıt bilgileri: ticari ad, resmî tanımlayıcı, adres, iletişim, veri koruma makamı.

Örneğin öğrenci indirimi sunan bir mağaza öğrenci belgesinden yalnız `is_enrolled` alanını ister; adı, okulu, öğrenci numarasını istemez. Kapsamları bu kadar dar tutarsanız cüzdanın onay ekranı da kısa kalır.

Kayıttan önce denemek için sandbox'ı kullanın: [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) adresinde giriş, yaş, diploma, öğrenci indirimi ve etkinlik kapısı için örnek doğrulayıcılar ve [/sample-site](https://verify.sandbox.tamga.network/sample-site) adresinde çalışan bir örnek site var.

## Hangi yolu seçmelisiniz?

![Barındırılan doğrulayıcı mı, kendi sunucunuz mu: paket, kim doğrular, değerler nereye gider, listeleri kim tutar](/blog/add-verification-to-your-site/tr/fig-iki-yol.png)

Barındırılan doğrulayıcı kayıt ve giriş için ve hızlı başlamak isteyen ekipler için uygundur. Kendi sunucunuz, belge değerlerinin hiçbir aracıdan geçmesini istemeyen ya da zaten yoğun doğrulama altyapısı işleten kurumlar içindir. İkisi de aynı doğrulama hattını çalıştırır; `verify.tamga.network` adresindeki referans doğrulayıcı sizin kuracağınız kütüphanenin üzerine kuruludur.

## Barındırılan doğrulayıcı nasıl çalışır?

Dört hamle var ve değerler yalnız sizin sunucunuza ulaşır:

1. **Sunucunuz bir sunum açar.** Doğrulayıcıyı bir politika adıyla ve erişim sertifikanızın anahtarıyla imzalanmış kısa ömürlü bir beyanla çağırır (en çok 60 saniye geçerli, tek kullanımlık). Ayrı bir parola yoktur.
2. **Sayfa isteği gösterir.** Bilgisayarda QR kod, telefonda "cüzdanında aç" düğmesi. Kişi yalnız istenen alanları görür ve onaylar.
3. **Doğrulayıcı belgeyi denetler** (imza, güven listesi, iptal, sahiplik bağı) ve sayfa kiti sonucu öğrenir.
4. **Sunucunuz sonucu alır** ve kabul edildiyse onaylanan alanları, bir kez.

```http title="Barındırılan doğrulayıcıda sunum açmak"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <erişim sertifikası anahtarınızla imzalanmış beyan>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Yanıtta `presentation_id`, `qr_payload`, `expires_at` ve bir `status_token` gelir; sunucunuz bunları sayfaya iletir. Sayfa kitini doğrulayıcı sunar:

```html title="Kayıt sayfanızdaki sayfa kiti"
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

Kit hiçbir şeyi doğrulamaz ve hiçbir değeri görmez; yalnız durumu izler. Karar sizin sunucunuzda verilir:

```ts title="Sunucunuz: önce sonucu, sonra onaylanan alanları okuyun"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "tekrar deneyin", "ret" değil

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // değerler bir kez verilir
const { claims } = await res.json(); // ör. claims.pseudonym, claims.given_name
```

Bir sunumun sonucunu yalnız onu açan site okuyabilir; başkası `404` alır. Değerler bir kez verilir ve sonuçtan beş dakika sonra silinir, bu yüzden onları hemen işleyin. Barındırılan doğrulayıcıda politika adları ve alan setleri ağla birlikte belirlenir (örneğin 18 yaş kontrolü yalnız `age_over_18` alanını kullanır). Kayıttan sonra passkey dahil bütün adımlar: ["Tamga ile giriş" ekleme](https://docs.tamga.network/tr/guides/sign-in-with-tamga).

## Kendi sunucunuzda nasıl doğrularsınız?

`@tamga-network/verifier` ve `@tamga-network/trust` ile. İlk istekten önce güven listelerini `TrustSource` üzerinden yükleyin ([listeler nasıl denetlenir](/blog/how-trust-lists-work)) ve iptal listelerini bir zamanlayıcıyla önceden indirmeye başlayın; kontrol anında hiçbir şey indirilmemeli. Sonra:

```ts title="Kendi sunucunuz: istek, çözme, doğrulama"
import { dcqlFromPolicy, createPresentationRequest, decryptResponse, verifyPresentation,
         pemRpSigner, PrefetchStatusCache, type Policy } from "@tamga-network/verifier";

const signer = await pemRpSigner(RP_KEY_PEM, RP_CERT_PEM); // client_id sertifikadan gelir
const req = await createPresentationRequest({ signer, dcql: dcqlFromPolicy(policy),
  responseUri: "https://magaza.example.com/vp/response", requestUriBase: "https://magaza.example.com/vp/req" });
// req.qrPayload → QR kod ya da bağlantı; kişisel veri taşımaz

// cüzdan şifreli yanıtı responseUri adresine POST eder
const answer = await decryptResponse(jweBody, req.encPrivateKey);
const { result, claims } = await verifyPresentation({ presentation: answer.vp_token["student"][0],
  aud: signer.clientId, nonce: req.nonce, policy, policyCredentialId: "student",
  trust, statusCache, rootCertsDer, rp: trust.relyingParty(signer.clientId) });
```

`verifyPresentation`'ın arkasındaki adımlar sabit ve numaralıdır: biçim ve imza (A), belge türü (B), güven (C), iptal (D) ve sizin politikanız (E). Hepsi [doğrulama API'sinde](https://docs.tamga.network/tr/specifications/verification-api) yazılı. Bu kodun test edilmiş, çalışan sürümü [kod örnekleri](https://docs.tamga.network/tr/guides/code-examples) arasında; rehberi [Kendi sunucunuzda doğrulama](https://docs.tamga.network/tr/guides/verify-on-server).

## Politika nedir, neden kod değildir?

Politika neye ihtiyacınız olduğunu söyler: hangi belge türü, hangi alanlar, hangi güvence düzeyi, listeler ne kadar taze olmalı. Cüzdanın gördüğü istek (bir DCQL sorgusu) politikadan üretilir, elle yazılmaz. Bu yüzden daha fazlasını istemek kod değil politika değişikliği gerektirir ve bir politika kaydınızdaki kapsamın ötesini hiçbir zaman isteyemez (AP6 kuralı). İsteğin ve şifreli yanıtın nasıl kurulduğu [OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive) yazısında.

## Sonuç nasıl okunur?

![Üç sonuç, her birinin anlamı ve kullanıcıya ne söyleneceği](/blog/add-verification-to-your-site/tr/fig-sonuclar.png)

Doğru kurulması gereken üçüncü sonuç. `INDETERMINATE`, doğrulayıcının şu an denetleyemediği anlamına gelir: bir liste alınamamıştır ya da fazla eskidir. Belge pekâlâ geçerli olabilir. "Şu an doğrulanamadı, lütfen tekrar deneyin" deyin ve bunu hiçbir zaman `REJECTED` ile aynı kefeye koymayın (AP2 kuralı). "Bu diploma sahte" ile "şu an kontrol edemiyorum" arasındaki fark birinin işe alınıp alınmamasını belirleyebilir.

Sonuç nesnesi yapılan ve atlanan kontrolleri sayar; bunları denetim için saklayabilirsiniz. İçinde alan adları vardır, değerler hiçbir zaman yoktur. Günlüklere adlar ve anahtarlar dahil kişisel veri yazmayın.

## Doğum tarihini görmeden yaş denetlenebilir mi?

Evet; bu, Tamga Verify'da `age-over-18-zk` politikasıyla canlıda. `mso_mdoc_zk` biçimindeki bir politika sıfır bilgi ispatı ister: cüzdan, kayıtlı bir kurumun verdiği kimlik belgesinde `age_over_18 = true` yazdığını kanıtlar ve siz başka hiçbir şey öğrenmezsiniz. Belgeyi, doğum tarihini, kurumun imzasını ya da cihaz anahtarını görmezsiniz; aynı kişinin iki ispatı birbirine bağlanamaz ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)).

Rehberden birkaç pratik not:

- Doğrulama pakete gömülü WebAssembly ile çalışır; bir masaüstünde ispat başına yaklaşık 3 saniye. Yüksek hacim için yerel derleme yaklaşık 0,2 ile 0,3 saniye sürer.
- Yalnız imzalı güven listesinde yer alan devreler kabul edilir.
- ZK sunumu iptal indeksi taşımaz; bu yüzden politikanın `accept_unrevocable_zk: true` ifadesini açıkça yazması gerekir. İptal kontrolü şartsa klasik `mso_mdoc` politikasını kullanın.
- Cüzdan tarafında Android ispat kütüphanesi hazır, iOS henüz bekliyor. İspat üretemeyen cüzdan, politikanız izin veriyorsa klasik mdoc denetimine döner; bu yol da yalnız `age_over_18` alanını açar. İkisini birlikte sunun.

Sandbox'taki `age-zk` örnek doğrulayıcısı akışı uçtan uca gösterir. Devreler, güven listesinin rolü ve sınırlar [Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga) yazısında.

## Sık sorulan sorular

### Sitemiz kişinin bütün belgesini görür mü?

Hayır. Yalnız kişinin onayladığı alanları alır ve bu alanlar kayıtlı kapsamınızın içinde olmak zorundadır. Sıfır bilgi politikasıyla yalnız bir evet ya da hayır alır.

### Belgeyi veren kurum, belgeyi denetlediğimizi görebilir mi?

Hayır. İptal listeleri önceden indirilip saklanır; kontrol anında ne kuruma ne ağa bir istek gider.

### Yalnız Tamga Wallet ile mi çalışır?

Hayır. Sağlayıcısı güven listesinde kayıtlı olan ve ağın cüzdan kurallarına uyan her cüzdan isteğinize yanıt verebilir.

### Bir girişten sonra ne saklamalıyız?

Kişisel veri değil, bir hesap anahtarı. Örnek site siteye özel takma adın anahtarlı bir özetini saklar. Başka bir site aynı kişi için farklı bir takma ad gördüğünden bunu eşleştiremez.

### Kayıt olmadan deneyebilir miyiz?

Evet, sandbox'ta. Örnek doğrulayıcılar ve örnek site, sandbox'ın örnek kurumlarından alınan belgelerle çalışır. Gerçek belgeler için gerçek ağda kayıtlı bir doğrulayıcı gerekir.

## Kaynaklar

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açık kaynak ispat sistemi)](https://github.com/google/longfellow-zk)
- [Tamga Network: "Tamga ile giriş" ekleme](https://docs.tamga.network/tr/guides/sign-in-with-tamga) · [Kendi sunucunuzda doğrulama](https://docs.tamga.network/tr/guides/verify-on-server) · [Doğrulayıcı olarak kayıt](https://docs.tamga.network/tr/guides/register-verifier)
- [Kod örnekleri](https://docs.tamga.network/tr/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/tr/packages/verifier) · [API başvurusu](https://docs.tamga.network/api/)
- [SDK'lar](/sdk) · [Doğrulayıcı olarak katılım](/learn/join-as-verifier)

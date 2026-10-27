---
title: Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin
slug: add-verification-to-your-site
description: Tamga belgelerini sitenizde ya da uygulamanızda iki yoldan biriyle denetleyebilirsiniz; sayfa kitiyle barındırılan doğrulayıcıyı kullanır ya da denetimi kendi sunucunuzda yaparsınız.
date: 2026-10-08
lang: tr
category: network
draft: false
related: openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, how-trust-lists-work, join-as-an-institution, learn:join-as-verifier
---

<!-- Kaynak: GUIDE-0001 sign-in-with-tamga 1.0.0 (Tamga Verify; erişim sertifikası anahtarıyla imzalı kısa ömürlü beyan, ≤60 sn, tek kullanım; POST /presentations → presentation_id, qr_payload, expires_at, status_token; sayfa kiti tamga-verifier.js, TamgaVerifier.mount, /web; kit doğrulamaz ve değer görmez; değerler bir kez, ikinci okumada 410, sonuçtan 5 dk sonra silinir; başkasına 404; siteye özel takma ad; passkey; politika adları Tamga ile belirlenir; sandbox örnek site). GUIDE-0002 verify-on-server 1.0.0 (politika → dcqlFromPolicy → createPresentationRequest → decryptResponse → verifyPresentation; üç sonuç; checks_performed; nonce tek kullanım; ZK: mso_mdoc_zk, WASM masaüstünde ~3 sn, yerel ~0,2–0,3 sn, accept_unrevocable_zk, Z1, mso_mdoc'a dönüş). GUIDE-0008 register-verifier (dns_name, erişim sertifikası, kapsamlar, WRPRC, kapsam dışı uyarısı, kayıtsız takma ad isteği kabul edilmez). SPEC-API-0001 §2–§4 (AP2–AP6). Kod örnekleri sayfası: paketler npm'de 0.7.2 deneme sürümü, kararlı 1.0.0 hazır olunca. Sandbox rehberi §6 (age-zk dahil örnek doğrulayıcılar). Dış: OpenID4VP 1.0, HAIP 1.0. -->

Bir web sitesine ya da uygulamaya "Tamga ile doğrula" eklemenin iki yolu var. Daha hızlı olan yolda Tamga'nın barındırılan doğrulayıcısı Tamga Verify'ı kullanırsınız. Sayfanıza QR kodu ya da "cüzdanında aç" düğmesini gösteren küçük bir sayfa kiti, sunucunuza da isteği açan ve onaylanan alanları alan iki kısa uç eklemeniz yeterli. Öbür yolda bütün denetimi açık kaynak `@tamga-network/verifier` paketiyle kendi sunucunuzda yaparsınız. Neye ihtiyacınız olduğunu bir politikada tarif eder, imzalı bir OpenID4VP isteği gönderir, cüzdanın şifreli yanıtını çözer ve üç sonuçtan birini alırsınız. Hangi yolu seçerseniz seçin önce doğrulayıcı olarak kaydolmanız gerekir, çünkü cüzdan kimin ve ne amaçla sorduğunu bu kayıttan öğrenir.

> **Not:** `@tamga-network/*` paketleri npm'de 0.7.2 deneme sürümüyle yayımlanıyor; kararlı 1.0.0 sürümü her şey hazır olduğunda gelecek. Deneme sürümlerinde arayüz değişebilir. Aşağıdaki kod bu sürümün API'sini kullanıyor.

## Kod yazmadan önce ne gerekiyor?

Önce güven listesinde bir doğrulayıcı kaydınızın olması gerekir. Cüzdan bir istek aldığında üç şeye bakar. İsteği kimin gönderdiğini, bu gönderenin kayıtlı ve etkin olup olmadığını ve istenen alanların kayıtlı kapsamın içinde kalıp kalmadığını denetler. Kayıtsız bir site de cüzdana ulaşabilir, ama istediği her alan "kayıtlı kapsamın dışında" uyarısıyla gösterilir. Böyle bir siteden gelen takma ad isteği ise hiç kabul edilmez.

Kaydolmak için kayıt makamına şu bilgileri verirsiniz ([Doğrulayıcı olarak kayıt](https://docs.tamga.network/tr/guides/register-verifier)):

- alan adınız; bu ad kalıcı kimliğiniz olur;
- istekleri imzalayacağınız anahtar için bir sertifika imzalama isteği (anahtar sizde kalır); istemci tanımlayıcınız bu istekten çıkan erişim sertifikasından türetilir;
- her kullanım amacı için ayrı bir **kapsam**, yani sade bir dille yazılmış amaç, tek bir belge türü, bu amacın gerektirdiği en az sayıda alan ve gizlilik politikanızın bağlantısı;
- AB'nin ortak kayıt bilgileri: ticari ad, resmî tanımlayıcı, adres, iletişim bilgisi ve bağlı olduğunuz veri koruma makamı.

Öğrenci indirimi yapan bir mağaza, örneğin, öğrenci belgesinden yalnız `is_enrolled` alanını ister. Öğrencinin adını, okulunu ya da öğrenci numarasını istemesine gerek yoktur. Kapsamları bu kadar dar tutarsanız cüzdanın onay ekranı da kısa kalır.

Kaydolmadan önce her şeyi sandbox'ta deneyebilirsiniz. [verify.sandbox.tamga.network](https://verify.sandbox.tamga.network) adresinde giriş, yaş, diploma, öğrenci indirimi ve etkinlik girişi için örnek doğrulayıcılar, [/sample-site](https://verify.sandbox.tamga.network/sample-site) adresinde de çalışan bir örnek site bulunuyor.

## Hangi yolu seçmelisiniz?

![Barındırılan doğrulayıcı mı, kendi sunucunuz mu: paket, kim doğrular, değerler nereye gider, listeleri kim tutar](/blog/add-verification-to-your-site/tr/fig-iki-yol.png)

Barındırılan doğrulayıcı, kayıt ve giriş sayfaları için ve hızlı başlamak isteyen ekipler için uygundur. Belge değerlerinin hiçbir aracıdan geçmesini istemeyen ya da zaten yoğun doğrulama yapan bir altyapı işleten kurumlar ise denetimi kendi sunucularında yapmayı tercih eder. İki yol da aynı doğrulama hattını çalıştırır. `verify.tamga.network` adresindeki referans doğrulayıcı da sizin kuracağınız kütüphanenin üzerine kurulu.

## Barındırılan doğrulayıcı nasıl çalışır?

Süreç dört adımdan oluşur ve belge değerleri yalnız sizin sunucunuza ulaşır:

1. **Sunucunuz bir sunum açar.** Doğrulayıcıyı bir politika adıyla çağırır ve isteğe, erişim sertifikanızın anahtarıyla imzalanmış kısa ömürlü bir beyan ekler. Bu beyan en çok 60 saniye geçerlidir ve yalnız bir kez kullanılabilir, bu yüzden ayrıca bir parolaya gerek kalmaz.
2. **Sayfa isteği gösterir.** Kişi bilgisayardaysa bir QR kod, telefondaysa "cüzdanında aç" düğmesi görür. Cüzdan ona yalnız istenen alanları gösterir ve kişi onaylar.
3. **Doğrulayıcı belgeyi denetler.** İmzaya, güven listesine, iptal durumuna ve belgenin sunan kişiye bağlı olup olmadığına bakar. Sayfa kiti de sonucu bu sırada öğrenir.
4. **Sunucunuz sonucu alır.** Belge kabul edildiyse onaylanan alanları da alır, ama yalnız bir kez.

```http title="Barındırılan doğrulayıcıda sunum açmak"
POST /presentations HTTP/1.1
Host: verify.tamga.network
Authorization: Bearer <erişim sertifikası anahtarınızla imzalanmış beyan>
Content-Type: application/json

{ "policy_id": "site-signup" }
```

Yanıtta `presentation_id`, `qr_payload`, `expires_at` ve `status_token` değerleri gelir ve sunucunuz bunları sayfaya iletir. Sayfa kitini doğrulayıcının kendisi sunar:

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

Kit hiçbir şeyi doğrulamaz ve hiçbir değeri görmez. Yalnız sunumun durumunu izler ve kararı sizin sunucunuza bırakır:

```ts title="Sunucunuz: önce sonucu, sonra onaylanan alanları okuyun"
import { createRpAssertion } from "@tamga-network/verifier";

const auth = async () => ({ authorization: `Bearer ${await createRpAssertion(rp, VERIFIER)}` });

const result = await fetch(`${VERIFIER}/presentations/${id}`, { headers: await auth() }).then((r) => r.json());
if (result.outcome !== "ACCEPTED") return; // INDETERMINATE → "tekrar deneyin", "ret" değil

const res = await fetch(`${VERIFIER}/presentations/${id}/claims`, { headers: await auth() });
if (res.status === 410) return; // değerler bir kez verilir
const { claims } = await res.json(); // ör. claims.pseudonym, claims.given_name
```

Bir sunumun sonucunu yalnız o sunumu açan site okuyabilir, başka biri denediğinde `404` alır. Değerler bir kez verilir ve sonuçtan beş dakika sonra silinir. Bu yüzden onları hemen işlemeniz gerekir. Barındırılan doğrulayıcıda politika adları ve her politikanın hangi alanları istediği ağla birlikte belirlenir. 18 yaş kontrolü, örneğin, yalnız `age_over_18` alanını kullanır. Kayıttan sonra passkey eklemek dahil bütün adımları ["Tamga ile giriş" ekleme](https://docs.tamga.network/tr/guides/sign-in-with-tamga) rehberinde bulabilirsiniz.

## Kendi sunucunuzda nasıl doğrularsınız?

Bunun için `@tamga-network/verifier` ve `@tamga-network/trust` paketlerini kullanırsınız. İlk istekten önce güven listelerini `TrustSource` üzerinden yükleyin ([listeler nasıl denetlenir](/blog/how-trust-lists-work)) ve iptal listelerini bir zamanlayıcıyla önceden indirmeye başlayın. Kontrol anında hiçbir şeyin indirilmemesi gerekir. Ardından isteği kurar, yanıtı çözer ve sunumu doğrularsınız:

```ts title="Kendi sunucunuz: istek, çözme, doğrulama"
import { dcqlFromPolicy, createPresentationRequest, decryptResponse, verifyPresentation,
         pemRpSigner, PrefetchStatusCache, type Policy } from "@tamga-network/verifier";

const signer = await pemRpSigner(RP_KEY_PEM, RP_CERT_PEM); // client_id sertifikadan gelir
const req = await createPresentationRequest({ signer, dcql: dcqlFromPolicy(policy),
  responseUri: "https://magaza.example.com/vp/response", requestUriBase: "https://magaza.example.com/vp/req",
  registrationCert: WRPRC_JWT }); // kayıt sertifikanız (trust.tamga.network/wrprc/); 0.7.0'dan beri cüzdanlar onsuz isteği reddeder
// req.qrPayload → QR kod ya da bağlantı; kişisel veri taşımaz

// cüzdan şifreli yanıtı responseUri adresine POST eder
const answer = await decryptResponse(jweBody, req.encPrivateKey);
const { result, claims } = await verifyPresentation({ presentation: answer.vp_token["student"][0],
  aud: signer.clientId, nonce: req.nonce, policy, policyCredentialId: "student",
  trust, statusCache, rootCertsDer, rp: trust.relyingParty(signer.clientId) });
```

`verifyPresentation` her seferinde aynı sırayla, numaralı adımlarla çalışır. Önce biçimi ve imzayı (A), sonra belge türünü (B), güveni (C) ve iptal durumunu (D) denetler, en son da sizin politikanızı (E) uygular. Adımların hepsi [doğrulama API'sinde](https://docs.tamga.network/tr/specifications/verification-api) yazılı. Bu kodun test edilmiş ve çalışan bir sürümünü [kod örnekleri](https://docs.tamga.network/tr/guides/code-examples) arasında, ayrıntılı anlatımını da [Kendi sunucunuzda doğrulama](https://docs.tamga.network/tr/guides/verify-on-server) rehberinde bulabilirsiniz.

## Politika nedir, neden kod olarak yazılmaz?

Politika neye ihtiyacınız olduğunu söyler. Hangi belge türünü, hangi alanları ve hangi güvence düzeyini istediğinizi, listelerin en fazla ne kadar eski olabileceğini burada belirtirsiniz. Cüzdanın gördüğü istek (bir DCQL sorgusu) bu politikadan üretilir ve kimse onu elle yazmaz. Bu yüzden daha fazla alan istemek için kodu değiştirmeniz gerekmez, politikayı değiştirmeniz yeterlidir. Bir politika da kaydınızdaki kapsamın ötesinde bir şey isteyemez (AP6 kuralı). İsteğin ve şifreli yanıtın nasıl kurulduğunu [OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive) yazısında anlattık.

## Sonuç nasıl okunur?

![Üç sonuç, her birinin anlamı ve kullanıcıya ne söyleneceği](/blog/add-verification-to-your-site/tr/fig-sonuclar.png)

Üç sonuçtan en dikkatli ele alınması gereken üçüncüsü. `INDETERMINATE`, doğrulayıcının o an denetimi yapamadığını gösterir. Bir liste alınamamış ya da izin verilenden daha eski olabilir, ama belge pekâlâ geçerli olabilir. Kullanıcıya "Şu an doğrulanamadı, lütfen tekrar deneyin" deyin ve bu sonucu hiçbir zaman `REJECTED` ile bir tutmayın (AP2 kuralı). "Bu diploma sahte" demekle "şu an kontrol edemiyorum" demek arasındaki fark, birinin işe alınıp alınmamasını belirleyebilir.

Sonuç nesnesi hangi kontrollerin yapıldığını ve hangilerinin atlandığını listeler. Bu listeyi denetim kaydı olarak saklayabilirsiniz, çünkü içinde yalnız alan adları bulunur ve değerler hiçbir zaman yer almaz. Günlüklerinize adlar ve anahtarlar dahil hiçbir kişisel veri yazmayın.

## Doğum tarihini görmeden yaş denetlenebilir mi?

Evet. Tamga Verify'da bu denetim `age-over-18-zk` politikasıyla canlıda çalışıyor. `mso_mdoc_zk` biçimindeki bir politika cüzdandan sıfır bilgi ispatı ister. Cüzdan, kayıtlı bir kurumun verdiği kimlik belgesinde `age_over_18 = true` yazdığını kanıtlar ve siz bunun dışında hiçbir şey öğrenmezsiniz. Belgenin kendisini, doğum tarihini, kurumun imzasını ya da cihaz anahtarını görmezsiniz. Aynı kişinin ürettiği iki ispat da birbiriyle ilişkilendirilemez ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)).

Rehberde bu konuda birkaç pratik not var:

- Doğrulama pakete gömülü WebAssembly ile yapılır ve bir masaüstü bilgisayarda ispat başına yaklaşık 3 saniye sürer. Yüksek hacimde çalışacaksanız yerel derleme bu süreyi 0,2 ile 0,3 saniyeye indirir.
- Yalnız imzalı güven listesinde yer alan devreler kabul edilir.
- ZK sunumu iptal indeksi taşımaz. Bu yüzden politikanızda `accept_unrevocable_zk: true` değerini açıkça yazmanız gerekir. İptal kontrolü sizin için şartsa klasik `mso_mdoc` politikasını kullanın.
- Cüzdan tarafında Android için ispat kütüphanesi hazır, iOS sürümü ise henüz bekleniyor. İspat üretemeyen bir cüzdan, politikanız izin veriyorsa klasik mdoc denetimine geçer ve bu yolda da yalnız `age_over_18` alanı açılır. Bu yüzden iki yolu birlikte sunmanızı öneriyoruz.

Sandbox'taki `age-zk` örnek doğrulayıcısı bu süreci baştan sona gösteriyor. Devreleri, güven listesinin buradaki rolünü ve yöntemin sınırlarını [Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga) yazısında anlattık.

## Sık sorulan sorular

### Sitemiz kişinin bütün belgesini görür mü?

Hayır. Siteniz yalnız kişinin onayladığı alanları alır ve bu alanların kayıtlı kapsamınızın içinde olması gerekir. Sıfır bilgi politikası kullanıyorsanız yalnız bir evet ya da hayır yanıtı alırsınız.

### Belgeyi veren kurum, belgeyi denetlediğimizi görebilir mi?

Hayır. İptal listeleri önceden indirilip önbellekte tutulur, bu yüzden kontrol anında ne kuruma ne de ağa bir istek gider.

### Yalnız Tamga Wallet ile mi çalışır?

Hayır. Sağlayıcısı güven listesinde kayıtlı olan ve ağın cüzdan kurallarına uyan her cüzdan isteğinize yanıt verebilir.

### Bir girişten sonra ne saklamalıyız?

Kişisel veri saklamanız gerekmez, bir hesap anahtarı yeterlidir. Örnek site, siteye özel takma adın anahtarlı bir özetini saklıyor. Başka bir site aynı kişiyi farklı bir takma adla gördüğü için bu özeti kendi kayıtlarıyla eşleştiremez.

### Kayıt olmadan deneyebilir miyiz?

Evet, sandbox'ta deneyebilirsiniz. Oradaki örnek doğrulayıcılar ve örnek site, sandbox'ın örnek kurumlarından alınan belgelerle çalışır. Gerçek belgeleri doğrulamak için ise gerçek ağda kayıtlı bir doğrulayıcı olmanız gerekir.

## Kaynaklar

- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Longfellow ZK (açık kaynak ispat sistemi)](https://github.com/google/longfellow-zk)
- [Tamga Network: "Tamga ile giriş" ekleme](https://docs.tamga.network/tr/guides/sign-in-with-tamga) · [Kendi sunucunuzda doğrulama](https://docs.tamga.network/tr/guides/verify-on-server) · [Doğrulayıcı olarak kayıt](https://docs.tamga.network/tr/guides/register-verifier)
- [Kod örnekleri](https://docs.tamga.network/tr/guides/code-examples) · [@tamga-network/verifier](https://docs.tamga.network/tr/packages/verifier) · [API başvurusu](https://docs.tamga.network/api/)
- [SDK'lar](/sdk) · [Doğrulayıcı olarak katılım](/learn/join-as-verifier)

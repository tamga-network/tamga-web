---
title: "Tamga'da sıfır bilgi: Longfellow, devreler, güven listesi"
slug: zero-knowledge-in-tamga
description: Tamga Network "18 yaş üstü"nü Longfellow sıfır bilgi ispatıyla nasıl doğrular, devreler neden imzalı güven listesinde, bugün ne çalışıyor?
date: 2026-10-08
lang: tr
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Kaynak: ADR-0032 1.0.0 (sade özet; bağlam: Longfellow açık kaynak Apache-2.0, vakıf, AB yaş doğrulama profili ve TS13 onun üzerine, güvenilir kurulum yok, v8 docType'ı bağlar ad alanını bağlamaz; 1. aşama ölçümleri 518 ms / 211 ms / ~343 KB, olumsuz testler; K1 longfellow-libzk-v1 ≥ v8; K2 devreler lotl.jws'de özetle, güncelleme = liste güncellemesi + CHANGELOG; K3 ilk yüklem age_over_18, sonra eşitlik yüklemleri, aralık ve kurumu gizleme kapsam dışı; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB QR'a sığmaz; K5 geri düşüş toplu kopya; K6 iptal yok, kısa ömür, accept_unrevocable_zk; K7 SessionTranscript üzerinde cihaz anahtarı imzası, açık anahtar gizli; K8/ZK6 tekil alan adları; 2b Android kütüphaneleri 2026-10-07, iOS bekliyor; 2c cüzdan bağlantısı, telefon kütüphaneleri gelene kadar ispat kapalı; 3. aşama doğrulayıcı WASM 889 KB, sabit d5e6be77, masaüstünde ~3 sn; yerel arka uç 0,2–0,3 sn; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README. guides/verify-on-server. SPEC-API-0001 Z1. ARF mimari §2.6, §2.8. Tamga Verify policy set age-over-18-zk, accept_unrevocable_zk: true. Canlı 2026-10-08: verify.tamga.network/policies age-over-18-zk; lotl.json zk_circuits kaydı; zk/<id>.zst 299.999 bayt, SHA-256 eşleşiyor. Dış: Longfellow ZK GitHub (birkaç bağımsız güvenlik incelemesi), IACR ePrint 2024/2010, açık kaynak duyurusu, AB TS13 (keşif niteliğinde; ETSI TS 119 476-2'ye), AB yaş doğrulama planı. -->

Sıfır bilgi ispatı (zero-knowledge proof), cüzdanın bir belge hakkında bir önermeyi, örneğin "bu kişi 18 yaşından büyük" önermesini, belgenin kendisini göstermeden kanıtlamasını sağlar. Tamga Network'te doğrulayıcı yalnızca kayıtlı bir kurumun kimlik belgesinde `age_over_18 = true` yazdığını öğrenir. Doğum tarihini, öteki alanları, kurumun imzasını ya da cihaz anahtarını görmez; aynı kişinin iki sunumu birbirine bağlanamaz. Tamga, kurumun mevcut [ISO mdoc](/blog/iso-mdoc-deep-dive) belgesi üzerinde Longfellow ZK kullanır; kurum hiçbir şeyi değiştirmez. Doğrulayıcı tarafı Tamga Verify'da canlıdır (`age-over-18-zk` politikası); kabul edilen ispat devreleri imzalı güven listesinde yayımlanır; cüzdan tarafında Android yerel kütüphanesi hazır, iOS kütüphanesi bekliyor.

## İspat tam olarak neyi kanıtlar?

18 yaş bilgisinin klasik sunumu doğum tarihini zaten gizler: cüzdan yalnız bir alanı, `age_over_18`'i açar, başka hiçbir şeyi açmaz. Gizleyemediği şey kurumun o alan üzerindeki imzasıdır ve aynı kopya her gösterildiğinde bu imza aynıdır. Tamga her belgeyi 10 kopya olarak verir; böylece farklı doğrulayıcılar farklı imzalar görür. Bu çalışır ama kopyalar tükenir ve yenilenmesi gerekir.

Sıfır bilgi ispatı imzayı görüş alanından tamamen çıkarır. Cüzdan elindeki belge üzerinde bir hesaplama yapar ve bu hesaplamanın doğru sonuç verdiğine dair bir ispat üretir. Longfellow devresinin 8. sürümünde ispat şunlara bağlıdır:

![Sıfır bilgi sunumunun gösterdikleri ve gizledikleri](/blog/zero-knowledge-in-tamga/tr/fig-gosterir.png)

- kurumun açık anahtarına (doğrulayıcı bunu güven listesiyle eşler);
- belge türüne (mdoc docType);
- alan adına ve değerine, burada `age_over_18` ve `true`;
- cihaz anahtarının bu oturumun dökümü üzerindeki imzasına; böylece ispat bu doğrulayıcıya ve bu isteğe bağlanır, cihazın açık anahtarı ise gizli kalır;
- belgenin ispat anındaki geçerliliğine.

Bağlamadığı şey belgenin içindeki ad alanıdır (namespace). İspat şunu söyler: "bu kurumun bu türdeki belgesinde, bir ad alanında `age_over_18 = true`". Tamga bu boşluğu bir katalog kuralıyla kapatır: bir belge türünde bir alan adı yalnız bir ad alanında bulunabilir; şema kataloğu bunu derlenirken denetler (ZK6 kuralı).

## Neden Longfellow ZK?

Birkaç yaklaşım var. Tamga için belirleyici soru, kurumların imza atma biçimini değiştirmek zorunda kalıp kalmayacağıydı. Karar kaydı seçenekleri şöyle tartar ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)):

| Seçenek | Sonuç | Neden |
|---|---|---|
| Longfellow ZK | kabul | kurumlar ES256 mdoc imzalarını korur; güvenilir kurulum yok; açık kaynak; bağımsız incelenmiş; AB'nin yaş doğrulama çalışması bunun üzerine kurulu |
| BBS imzaları | ret | kurumların anahtar ve imza biçimini değiştirmesi gerekir; AB'nin onaylı listesinde yok |
| Yalnız toplu kopya | geri düşüş olarak kalır | bugün çalışıyor ama kopyalar tükenir ve imza her kopyada tekrar eder |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk), ECDSA ile imzalanmış mdoc belgeleri hakkında önermeleri kanıtlar. Apache-2.0 lisansıyla açık kaynak olarak yayımlandı ([duyuru](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) makalesinde anlatılır ve birkaç bağımsız güvenlik incelemesinden geçmiştir. Güvenilir kurulum (trusted setup) gerektirmez; yani birinin gizli bir anahtarı yok ettiğine güvenmeniz gereken bir tören yoktur. AB'nin cüzdanlarda aritmetik devre tabanlı ispatlar için hazırladığı taslak teknik şartname [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) aynı yaklaşım etrafında yazılmıştır ve hâlâ keşif niteliğindedir; devamı ETSI'de sürecek.

## Devreler neden imzalı güven listesinde?

Devre, ispatın konusu olan programdır. Her devreyi kabul eden bir doğrulayıcıya, istediğinden başka bir şeyin ispatı gösterilebilir. Bu yüzden Tamga doğrulayıcısı yalnız ağın incelediği ve imzalı listelerin listesinde özetiyle, `ACTIVE` durumuyla yayımladığı devreleri kabul eder. Bilinmeyen ya da etkin olmayan devre reddedilir (ZK2 kuralı).

8 Ekim 2026'daki canlı kayıt:

```json title="trust.tamga.network/lotl.json → zk_circuits (canlı, 8 Ekim 2026)"
{
  "circuit_id": "5a8938159603876eb537a117cfe9e2eaec5a01a042b316a8e57e52e4bb3c9291",
  "system": "longfellow-libzk-v1",
  "version": 8,
  "attributes": 1,
  "sha256": "f44ab1a415f284251ea6ad5451d2588c1e7011eb9ba46091116e8caa4c8e0d83",
  "status": "ACTIVE"
}
```

Devre dosyası listelerin yanında, `trust.tamga.network/zk/<circuit_id>.zst` adresinde yayımlanır; yaklaşık 300 KB'tır ve kişisel veri içermez. Cüzdan dosyayı uygulamayla birlikte getirebilir ya da indirebilir; her iki durumda da kullanmadan önce imzalı listedeki `sha256` ile karşılaştırır. Böylece dosyanın nereden geldiği, neye güvenildiğini değiştirmez. Yukarıdaki tarihte yayımlanan dosyayı listeyle karşılaştırdık; özetler eşleşiyor.

![Sabitlenmiş kök parmak izinden kabul edilen bir ispata](/blog/zero-knowledge-in-tamga/tr/fig-zincir.png)

Devre güncellemesi bir liste güncellemesidir. Yeni bir mimari karar gerektirmez ama listedeki her değişiklik gibi yeni bir imzalı liste sürümüyle yayımlanır ve herkese açık değişiklik kaydına yazılır ([İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)).

## Doğrulayıcı bir ispatı nasıl denetler?

Doğrulayıcı paketi, Longfellow'un yalnız doğrulama kodunu WebAssembly'e derler. Modül 889 KB'tır, dış bağımlılığı yoktur, sabitlenmiş bir üst kaynak sürümünden üretilir ve yeniden üretilebilir biçimde derlenebilir. WebAssembly ile bir doğrulama masaüstünde yaklaşık 3 saniye sürer. Yüksek hacim için aynı kaynaktan derlenen yerel bir arka uç var; yaklaşık 0,2 ile 0,3 saniye sürer. Tamga Verify bunu kullanır ve yerel süreç cevap vermezse WebAssembly'e döner. İki yolda da bir hata hiçbir zaman "geçerli" sayılmaz.

Doğrulama hattında bu adımın adı `Z1`'dir. Dört şey sorar: devre imzalı listede mi ve dosya özeti eşleşiyor mu; yalnız istenen öğeler, tek bir ad alanından mı açıldı; zaman damgası penceresinin içinde mi; ispat geçerli mi. Kurum imzası, cihaz imzası ve geçerlilik süresi denetimleri ispatın içinde yapılır. `Z1`'den önce doğrulayıcı yine yanıtı çözer, docType'ı denetler ve kurumu güven listesinde bulmak için kurumun sertifika zincirini okur ([doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)).

## Sonuç ne zaman INDETERMINATE, ne zaman REJECTED?

Tamga sıfır bilgide de üç değerli sonucu korur: doğrulayıcı tarafında bir şey eksik diye bir belge sahte ilan edilmez.

![Sıfır bilgi sunumunun sonuçları, durum durum](/blog/zero-knowledge-in-tamga/tr/fig-sonuc.png)

| Durum | Sonuç |
|---|---|
| Devre imzalı listede değil ya da `ACTIVE` değil | `REJECTED` |
| İspatla oynanmış, kurum anahtarı yanlış, başka oturum ya da başka doğrulayıcı | `REJECTED` |
| Doğrulayıcı tarafında devre dosyası ya da WebAssembly eksik | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| İspat geçerli, politikada `accept_unrevocable_zk: false` | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| İspat geçerli, politikada `accept_unrevocable_zk: true` | `ACCEPTED`, durum `NOT_APPLICABLE` ve gerekçesi |

İkinci satırdaki retler ilk masaüstü denemesinde bilerek sınandı: değiştirilmiş değer, yanlış kurum anahtarı, başka oturumun nonce'u, başka doğrulayıcı, "false" diyen bir belgeden "true" iddiası, başka docType ve bozulmuş ispat; hepsi geçmedi.

## Sıfır bilgi sunumu iptal durumunu neden gösteremez?

İptali denetlemek için doğrulayıcının belgenin, kurumun [durum listesindeki](/blog/status-list-privacy) konumunu bilmesi gerekir. Bu konum her belge için sabittir; onu açmak iki sunumu yeniden birbirine bağlanabilir kılar, ki ispatın önlemek istediği tam olarak budur. Bu yüzden devre iptali denetlemez (ZK4 kuralı).

Tamga'nın şimdilik cevabı iki parçalı. Kurallar bu yolla gösterilen belgelerin kısa ömürlü olmasını ister; böylece iptal edilmiş bir belge kısa sürede kullanılamaz hâle gelir (ZK4). Ayrıca doğrulayıcının politikası, iptali denetlenemeyen bir sunumu kabul edip etmediğini açıkça söylemek zorundadır:

```ts title="Sıfır bilgi ispatıyla 18 yaş denetimi politikası"
const policy: Policy = {
  policy_id: "age-over-18-zk",
  purpose: { "tr-TR": "18 yaş üstü denetimi, yalnız evet/hayır" },
  credentials: [{
    id: "identity",
    vct_values: ["urn:tamga:id:IdentityAttestation:1"],
    format: "mso_mdoc_zk",
    namespace: "tamga.id.1",
    required_claims: ["age_over_18"],
    constraints: { age_over_18: true }, // yalnız eşitlik
    accept_unrevocable_zk: true,        // bilerek kabul: iptal denetlenemez
  }],
  trust: { /* … */ },
  freshness: { /* … */ },
};
```

İptalin mutlaka denetlenmesi gereken bir site bunun yerine klasik `mso_mdoc` politikasını kullanır. Gizli iptal ispatı için, AB TS13'ün iptal düzenini netleştirdiğinde ayrı bir karar alınacak.

## Bir site ispatı nasıl ister?

İstek [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) ile, biçimi TS13'teki gibi `mso_mdoc_zk` olan bir DCQL sorgusuyla yapılır; ikinci taşıma yolu tarayıcının Digital Credentials API'sidir (doğrulayıcı tarafı hazır; cüzdanlar henüz ona bağlı değil). Bir ispat yaklaşık 350 KB'tır, QR koda sığmaz. Bluetooth ile yüz yüze denetim için karar, cihaz üzerindeki ölçümleri bekliyor.

Tamga Verify'da sıfır bilgi ve klasik denetim iki ayrı politikadır ve ikisi de `verify.tamga.network/policies` adresinde listelenir: `age-over-18-zk` ve `age-over-18-mdoc`. Kişinin cüzdanı ispat üretemezse site, bu yola izin veriyorsa, aynı soruyu klasik politikayla yeniden sorabilir. Klasik yol da yalnız `age_over_18` alanını açar; ek olarak gösterdiği, kişinin kopyalarından birindeki kurum imzasıdır. Bunu bir siteye nasıl bağlayacağınız [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında.

## Cüzdan tarafı bugün nerede?

İspat üretimi açık bir ağ paketidir, `@tamga-network/zk`; ağdaki her cüzdan aynı ispatlayıcıyı kullansın diye. Tek bir cüzdanın özelliği değildir. Paketin üç giriş noktası var: DCQL sorgusunu kanıtlanacak alanlara çeviren, güven listesinden devreyi seçen ve özetle denetleyen saf TypeScript çekirdeği; React Native için cihaz üzerinde çalışan ispatlayıcı; testler ve uyum koşuları için masaüstü ispatlayıcı.

Cüzdan önce oturum için her zamanki cihaz imzalı yanıtını üretir; donanım anahtarı ve telefon kilidi her zamanki gibi. İspatlayıcı bu yanıtı girdi olarak alır ve telefondan yalnız ispat çıkar.

| Parça | 8 Ekim 2026'daki durum |
|---|---|
| Doğrulayıcı (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | canlı |
| İmzalı güven listesinde kabul edilen devre | canlı |
| İspatlayıcı paketi, TypeScript çekirdeği ve masaüstü ispatlayıcı | tamam |
| Android yerel kütüphanesi (arm64-v8a, armeabi-v7a, x86_64) | derlendi |
| iOS kütüphanesi | bekliyor; derlemek için macOS gerekiyor |
| Cihaz testi ve cihaz üzerinde ölçüm | uygulama mağazası sürümüyle |

iOS kütüphanesi çıkana kadar paketi içeren bir iOS uygulaması normal derlenir, ispatlayıcı olmadığını bildirir ve cüzdan klasik yolla sunar. Ağdaki cüzdanlardan Tamga Wallet'ta ispatlayıcı bağlıdır; telefon kütüphaneleri ve devre dosyaları yerine oturana kadar ispat kapalı kalır.

Ölçek vermek için: masaüstündeki ilk denemede bir ispatın üretimi 518 ms, yerel doğrulaması 211 ms sürdü; ispat yaklaşık 343 KB'tı. Telefon değerleri cihaz testlerinden sonra yayımlanacak.

## Henüz neyi yapamıyor?

- **Yalnız eşitlik.** Bugünkü ilk ve tek yüklem `age_over_18 = true`. Sırada `age_over_21`, uyruk ve eğitim belgelerinde kayıt ya da mezuniyet var; hepsi eşitlik denetimi. Aralıklar ("şu tarihten önce doğmuş") henüz Longfellow'da yok.
- **Kurum görünür kalır.** Doğrulayıcı belgeyi hangi kurumun verdiğini yine öğrenir. "Akredite bir kurum" diyip adını söylememek şimdilik kapsam dışı.
- **İptal denetimi yok**, yukarıda anlatıldığı gibi; gizli iptal ispatına karar verilene kadar kurallar kısa ömre dayanıyor.
- **Boyut.** İspat başına yaklaşık 350 KB, QR kodu dışarıda bırakır.
- **iOS** henüz hazır değil.

## Sık sorulan sorular

### Sıfır bilgi ispatı için kurumun bir şeyi değiştirmesi gerekir mi?

Hayır. Kurum mdoc belgelerini eskisi gibi ES256 ile imzalar. Sıfır bilgi yalnız cüzdanda ve doğrulayıcıdadır (ZK1 kuralı).

### Doğrulayıcı bir 18 yaş ispatından ne öğrenir?

Kayıtlı bir kurumun kimlik belgesinde `age_over_18 = true` yazdığını ve ispatın bu oturum için üretildiğini. Başka hiçbir şeyi: ne doğum tarihini, ne başka bir alanı, ne imza değerini, ne cihaz anahtarını.

### İki site aynı kişinin ikisine de yaşını kanıtladığını anlayabilir mi?

İspattan anlayamaz. Her ispat yenidir ve sunumlar arasında tekrar eden sabit bir değer içermez.

### Sıfır bilgi denetimi canlı mı?

Doğrulayıcı tarafı Tamga Verify'da `age-over-18-zk` politikasıyla canlı. Cüzdanların ispatlayıcıya ihtiyacı var: Android kütüphanesi hazır, iOS bekliyor.

### Cüzdanım ispat üretemezse ne olur?

Site izin veriyorsa aynı soruyu klasik denetimle yeniden sorar. Cüzdanınız bu durumda kopyalarınızdan birinden yalnız `age_over_18` alanını açar.

## Kaynaklar

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [Anonymous credentials from ECDSA (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Yaş doğrulama için sıfır bilgi ispatı kütüphanelerinin açık kaynak yapılması (duyuru)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [AB teknik şartnamesi TS13: aritmetik devre tabanlı sıfır bilgi ispatları (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [AB yaş doğrulama planı](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: sıfır bilgi ispatları](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation) · [Sunucuda doğrulama: sıfır bilgiyle yaş denetimi](https://docs.tamga.network/tr/guides/verify-on-server) · [Doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)
- [Tamga ARF: mimari (§2.6, §2.8)](https://arf.tamga.network/tr/architecture) · [Sıfır bilgi ispatları](/learn/zero-knowledge-proofs) · [Bağlanamazlık](/learn/unlinkability)

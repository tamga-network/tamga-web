---
title: "Tamga'da sıfır bilgi: Longfellow, devreler, güven listesi"
slug: zero-knowledge-in-tamga
description: Tamga Network'ün "18 yaşından büyük" bilgisini Longfellow sıfır bilgi ispatıyla nasıl doğruladığını, devrelerin neden imzalı güven listesinde durduğunu ve bugün neyin çalıştığını anlatıyoruz.
date: 2026-10-08
lang: tr
updated: 2026-10-19
category: privacy
draft: false
related: status-list-privacy, iso-mdoc-deep-dive, openid4vp-dcql-deep-dive, add-verification-to-your-site
---

<!-- Kaynak: ADR-0032 1.0.0 (sade özet; bağlam: Longfellow açık kaynak Apache-2.0, vakıf, AB yaş doğrulama profili ve TS13 onun üzerine, güvenilir kurulum yok, v8 docType'ı bağlar ad alanını bağlamaz; 1. aşama ölçümleri 518 ms / 211 ms / ~343 KB, olumsuz testler; K1 longfellow-libzk-v1 ≥ v8; K2 devreler lotl.jws'de özetle, güncelleme = liste güncellemesi + CHANGELOG; K3 ilk yüklem age_over_18, sonra eşitlik yüklemleri, aralık ve kurumu gizleme kapsam dışı; K4 DCQL mso_mdoc_zk (TS13) + DC API, ~350 KB QR'a sığmaz; K5 geri düşüş toplu kopya; K6 iptal yok, kısa ömür, accept_unrevocable_zk; K7 SessionTranscript üzerinde cihaz anahtarı imzası, açık anahtar gizli; K8/ZK6 tekil alan adları; 2b Android kütüphaneleri 2026-10-07, iOS bekliyor; 2c cüzdan bağlantısı, telefon kütüphaneleri gelene kadar ispat kapalı; 3. aşama doğrulayıcı WASM 889 KB, sabit d5e6be77, masaüstünde ~3 sn; yerel arka uç 0,2–0,3 sn; INDETERMINATE SDK_VERSION_MISMATCH; ZK1–ZK6). @tamga-network/zk README. guides/verify-on-server. SPEC-API-0001 Z1. ARF mimari §2.6, §2.8. Tamga Verify policy set age-over-18-zk, accept_unrevocable_zk: true. Canlı 2026-10-08: verify.tamga.network/policies age-over-18-zk; lotl.json zk_circuits kaydı; zk/<id>.zst 299.999 bayt, SHA-256 eşleşiyor. Dış: Longfellow ZK GitHub (birkaç bağımsız güvenlik incelemesi), IACR ePrint 2024/2010, açık kaynak duyurusu, AB TS13 (keşif niteliğinde; ETSI TS 119 476-2'ye), AB yaş doğrulama planı. -->

Sıfır bilgi ispatı (zero-knowledge proof), cüzdanın bir belge hakkındaki bir önermeyi, örneğin "bu kişi 18 yaşından büyük" önermesini, belgenin kendisini göstermeden kanıtlamasını sağlar. Tamga Network'te doğrulayıcı yalnız kayıtlı bir kurumun kimlik belgesinde `age_over_18 = true` yazdığını öğrenir. Doğum tarihini, öbür alanları, kurumun imzasını ya da cihaz anahtarını görmez. Aynı kişinin yaptığı iki gösterim de birbiriyle ilişkilendirilemez. Tamga bunun için Longfellow ZK'yi, kurumun zaten verdiği [ISO mdoc](/blog/iso-mdoc-deep-dive) belgesi üzerinde kullanıyor, bu yüzden kurumun hiçbir şeyi değiştirmesi gerekmiyor. Doğrulayıcı tarafı Tamga Verify'da `age-over-18-zk` politikasıyla canlıda çalışıyor ve kabul edilen ispat devreleri imzalı güven listesinde yayımlanıyor. Cüzdan tarafında ise Android için yerel kütüphane hazır, iOS kütüphanesi henüz bekleniyor.

## İspat tam olarak neyi kanıtlar?

18 yaş bilgisinin klasik yolla gösterilmesi de doğum tarihini zaten gizler, çünkü cüzdan yalnız `age_over_18` alanını açar ve başka hiçbir şey göstermez. Bu yöntemin gizleyemediği şey, kurumun o alan üzerine attığı imzadır. Aynı kopya her gösterildiğinde bu imza da aynı kalır. Tamga her belgeyi 10 kopya olarak verdiği için farklı doğrulayıcılar farklı imzalar görür. Bu yöntem işe yarıyor, ama kopyalar zamanla tükeniyor ve yenilenmeleri gerekiyor.

Sıfır bilgi ispatı ise imzayı tamamen görünmez kılar. Cüzdan elindeki belge üzerinde bir hesaplama yapar ve bu hesaplamanın doğru sonuç verdiğini gösteren bir ispat üretir. Longfellow devresinin 8. sürümünde ispat şu bilgilere bağlanır:

![Sıfır bilgi sunumunun gösterdikleri ve gizledikleri](/blog/zero-knowledge-in-tamga/tr/fig-gosterir.png)

- kurumun açık anahtarına; doğrulayıcı bu anahtarı güven listesiyle eşleştirir;
- belge türüne (mdoc docType);
- alanın adına ve değerine, bu örnekte `age_over_18` ve `true`;
- cihaz anahtarının bu oturumun dökümü üzerine attığı imzaya; böylece ispat bu doğrulayıcıya ve bu isteğe bağlanır, cihazın açık anahtarı ise gizli kalır;
- belgenin ispatın üretildiği andaki geçerliliğine.

İspatın bağlamadığı tek şey, belgenin içindeki ad alanıdır (namespace). İspat, "bu kurumun bu türdeki belgesinde, ad alanlarından birinde `age_over_18 = true` yazıyor" demiş olur. Tamga bu boşluğu bir katalog kuralıyla kapatıyor. Bir belge türünde bir alan adı yalnız tek bir ad alanında bulunabiliyor ve şema kataloğu bunu derlenirken denetliyor (ZK6 kuralı).

## Neden Longfellow ZK?

Bu iş için birkaç farklı yaklaşım var. Tamga için belirleyici soru, kurumların belge imzalama biçimini değiştirmek zorunda kalıp kalmayacağıydı. Karar kaydı seçenekleri şöyle değerlendiriyor ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)):

| Seçenek | Sonuç | Neden |
|---|---|---|
| Longfellow ZK | kabul edildi | kurumlar ES256 mdoc imzalarını korur; güvenilir kurulum gerekmez; açık kaynaktır; bağımsız olarak incelenmiştir; AB'nin yaş doğrulama çalışması da bunun üzerine kurulu |
| BBS imzaları | reddedildi | kurumların anahtarlarını ve imza biçimlerini değiştirmesi gerekir; AB'nin onaylı listesinde yer almıyor |
| Yalnız toplu kopyalar | yedek yol olarak kaldı | bugün çalışıyor, ama kopyalar tükeniyor ve her kopyada imza tekrar ediyor |

[Longfellow ZK](https://github.com/longfellow-zk/longfellow-zk), ECDSA ile imzalanmış mdoc belgeleri hakkındaki önermeleri kanıtlamaya yarıyor. Apache-2.0 lisansıyla açık kaynak olarak yayımlandı ([duyuru](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)), [Anonymous credentials from ECDSA](https://eprint.iacr.org/2024/2010) adlı makalede anlatılıyor ve birkaç bağımsız güvenlik incelemesinden geçti. Güvenilir kurulum (trusted setup) gerektirmediği için birinin gizli bir değeri yok ettiğine güvenmenizi gerektiren bir tören de yok. AB'nin cüzdanlarda aritmetik devre tabanlı ispatlar için hazırladığı taslak teknik şartname [TS13](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) de aynı yaklaşım üzerine kurulu. Bu şartname henüz keşif aşamasında ve çalışmanın devamı ETSI'de yürüyecek.

## Devreler neden imzalı güven listesinde?

Devre, ispatın üzerine kurulduğu programdır. Her devreyi kabul eden bir doğrulayıcıya, istediği şeyden başka bir şeyin ispatı gösterilebilirdi. Bu yüzden Tamga doğrulayıcısı yalnız ağın incelediği ve imzalı listelerin listesinde özetiyle ve `ACTIVE` durumuyla yayımladığı devreleri kabul ediyor. Bilinmeyen ya da etkin olmayan bir devre reddediliyor (ZK2 kuralı).

8 Ekim 2026 itibarıyla canlı kayıt şu:

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

Devre dosyası listelerle birlikte `trust.tamga.network/zk/<circuit_id>.zst` adresinde yayımlanıyor. Dosya yaklaşık 300 KB tutuyor ve kişisel veri içermiyor. Cüzdan dosyayı uygulamanın içinde getirebilir ya da indirebilir. Her iki durumda da dosyayı kullanmadan önce imzalı listedeki `sha256` değeriyle karşılaştırır. Böylece dosyanın nereden geldiği, neye güvenildiğini değiştirmez. Yukarıdaki tarihte yayımlanan dosyayı listeyle karşılaştırdık ve özetler eşleşiyor.

![Sabitlenmiş kök parmak izinden kabul edilen bir ispata](/blog/zero-knowledge-in-tamga/tr/fig-zincir.png)

Bir devrenin güncellenmesi, listenin güncellenmesi anlamına geliyor. Bunun için yeni bir mimari karar gerekmiyor, ama listedeki her değişiklikte olduğu gibi yeni bir imzalı liste sürümü yayımlanıyor ve değişiklik herkese açık değişiklik kaydına yazılıyor ([İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)).

## Doğrulayıcı bir ispatı nasıl denetler?

Doğrulayıcı paketi, Longfellow'un yalnız doğrulama kodunu WebAssembly'ye derliyor. Modül 889 KB tutuyor, dış bağımlılığı yok, sabitlenmiş bir kaynak sürümünden üretiliyor ve aynı sonucu verecek biçimde yeniden derlenebiliyor. WebAssembly ile bir doğrulama masaüstü bir bilgisayarda yaklaşık 3 saniye sürüyor. Yüksek hacim için aynı kaynaktan derlenen yerel bir arka uç da var ve doğrulamayı yaklaşık 0,2 ile 0,3 saniyede yapıyor. Tamga Verify bu arka ucu kullanıyor ve yerel süreç yanıt vermezse WebAssembly'ye geçiyor. İki yolda da bir hata hiçbir zaman "geçerli" sonucu olarak sayılmıyor.

Doğrulama hattında bu adımın adı `Z1` ve adım dört soruya yanıt arıyor. Devre imzalı listede mi ve dosyanın özeti eşleşiyor mu? Yalnız istenen öğeler ve tek bir ad alanından mı açıldı? Zaman damgası izin verilen aralığın içinde mi? İspat geçerli mi? Kurum imzası, cihaz imzası ve geçerlilik süresi denetimleri ise ispatın içinde yapılıyor. `Z1` adımından önce doğrulayıcı yine yanıtı çözüyor, docType değerini denetliyor ve kurumu güven listesinde bulmak için kurumun sertifika zincirini okuyor ([doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)).

## Sonuç ne zaman INDETERMINATE, ne zaman REJECTED?

Tamga sıfır bilgi ispatlarında da üç değerli sonucu koruyor. Doğrulayıcı tarafında bir şey eksik diye hiçbir belge sahte ilan edilmiyor.

![Sıfır bilgi sunumunun sonuçları, durum durum](/blog/zero-knowledge-in-tamga/tr/fig-sonuc.png)

| Durum | Sonuç |
|---|---|
| Devre imzalı listede değil ya da `ACTIVE` durumunda değil | `REJECTED` |
| İspat değiştirilmiş, kurum anahtarı yanlış, başka bir oturuma ya da başka bir doğrulayıcıya ait | `REJECTED` |
| Doğrulayıcı tarafında devre dosyası ya da WebAssembly eksik | `INDETERMINATE` (`SDK_VERSION_MISMATCH`) |
| İspat geçerli, politikada `accept_unrevocable_zk: false` | `INDETERMINATE` (`STATUS_UNREACHABLE`) |
| İspat geçerli, politikada `accept_unrevocable_zk: true` | `ACCEPTED`, durum `NOT_APPLICABLE` ve gerekçesi |

İkinci satırdaki ret durumları ilk masaüstü denemesinde bilerek sınandı. Değiştirilmiş bir değer, yanlış bir kurum anahtarı, başka bir oturumun nonce'u, başka bir doğrulayıcı, "false" yazan bir belgeden yapılan "true" iddiası, başka bir docType ve bozulmuş bir ispat denendi ve hepsi doğrulamadan geçemedi.

## Sıfır bilgi sunumu iptal durumunu neden gösteremez?

İptal durumunu denetlemek için doğrulayıcının, belgenin kurumun [durum listesindeki](/blog/status-list-privacy) konumunu bilmesi gerekir. Bu konum her belge için sabit olduğundan, onu açığa çıkarmak iki gösterimi yeniden birbirine bağlanabilir kılardı. İspatın önlemek istediği de tam olarak bu. Bu yüzden devre iptal durumunu denetlemiyor (ZK4 kuralı).

Tamga'nın bu soruna yanıtı iki parçadan oluşuyor. Karar, AB ARF'nin kısa ömürlü belge yolunu izliyor ([ADR-0044](https://docs.tamga.network/tr/adr/0044-zk-short-lived-copies)). Sıfır bilgi ispatıyla yapılan gösterimler yalnız kimlik belgesinin kısa ömürlü kopyalarıyla yapılıyor. Bu kopyalar en çok 24 saat geçerli ve cüzdan onları kendiliğinden yeniliyor. Belge iptal edildiğinde yeni kopya verilmiyor, bu yüzden son kopya da en geç bir gün içinde kullanılamaz hâle geliyor. **Güncelleme, 19 Ekim 2026:** Bu yöntem artık uygulanıyor (paketler 0.4.0, 9 Ekim 2026). Sıfır bilgi ispatıyla yapılan gösterimler ayrı bir türdeki kısa ömürlü kopyalarla yapılıyor ve Tamga Verify'ın `age-over-18-zk` politikası bu kopyaları ek bir ayar olmadan kabul ediyor. Uzun ömürlü bir belge üzerindeki ispatlarda ise politikanın, iptal durumu denetlenemeyen bir gösterimi kabul edip etmediğini yine açıkça belirtmesi gerekiyor. Bu alan yazılmazsa değeri `false` sayılıyor. Aşağıdaki eski örnekte de durum bu:

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

İptal durumunun mutlaka denetlenmesi gereken bir site, bunun yerine klasik `mso_mdoc` politikasını kullanır. İptali gizliliği bozmadan kanıtlayacak bir ispat için ise, AB TS13'teki iptal düzenini netleştirdiğinde ayrı bir karar alınacak.

## Bir site ispatı nasıl ister?

İstek [OpenID4VP](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html) üzerinden, TS13'teki gibi biçimi `mso_mdoc_zk` olan bir DCQL sorgusuyla yapılıyor. İkinci taşıma yolu, tarayıcının Digital Credentials API'si. Doğrulayıcı tarafı bu yola da hazır, ama cüzdanlar henüz ona bağlanmadı. Bir ispat yaklaşık 350 KB tuttuğu için QR koda sığmıyor. Bluetooth ile yapılacak yüz yüze denetimler için ise karar, cihazlar üzerinde yapılacak ölçümleri bekliyor.

Tamga Verify'da sıfır bilgi denetimi ile klasik denetim iki ayrı politika olarak tanımlı ve ikisi de `verify.tamga.network/policies` adresinde listeleniyor. Bunlar `age-over-18-zk` ve `age-over-18-mdoc`. Kişinin cüzdanı ispat üretemezse, site bu yola izin veriyorsa aynı soruyu klasik politikayla yeniden sorabiliyor. Klasik yol da yalnız `age_over_18` alanını açıyor. Ek olarak gösterdiği tek şey, kişinin kopyalarından birindeki kurum imzası. Bunu bir siteye nasıl bağlayacağınızı [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında anlattık.

## Cüzdan tarafı bugün nerede?

İspat üretimi, ağın açık kaynak paketlerinden biri olan `@tamga-network/zk` içinde yer alıyor. Bu sayede ağdaki her cüzdan aynı ispatlayıcıyı kullanıyor ve ispat üretimi tek bir cüzdanın özelliği olmuyor. Paketin üç giriş noktası var. Saf TypeScript ile yazılmış çekirdek, DCQL sorgusunu kanıtlanacak alanlara çeviriyor, güven listesinden devreyi seçiyor ve devreyi özetiyle denetliyor. React Native için cihaz üzerinde çalışan bir ispatlayıcı ve testler ile uyum çalışmaları için bir masaüstü ispatlayıcı da bulunuyor.

Cüzdan önce oturum için her zamanki cihaz imzalı yanıtını üretiyor. Bunun için donanım anahtarı ve telefon kilidi her zamanki gibi kullanılıyor. İspatlayıcı bu yanıtı girdi olarak alıyor ve telefondan dışarı yalnız ispat çıkıyor.

| Parça | 8 Ekim 2026'daki durumu |
|---|---|
| Doğrulayıcı (`@tamga-network/verifier/zk`, Tamga Verify `age-over-18-zk`) | canlı |
| İmzalı güven listesinde kabul edilen devre | canlı |
| İspatlayıcı paketi, TypeScript çekirdeği ve masaüstü ispatlayıcı | tamamlandı |
| Android yerel kütüphanesi (arm64-v8a, armeabi-v7a, x86_64) | derlendi |
| iOS kütüphanesi | bekliyor; derlemek için macOS gerekiyor |
| Cihaz testleri ve cihaz üzerinde ölçüm | uygulama mağazası sürümüyle birlikte |

iOS kütüphanesi çıkana kadar bu paketi içeren bir iOS uygulaması normal biçimde derleniyor, ispatlayıcının bulunmadığını bildiriyor ve cüzdan belgeyi klasik yolla gösteriyor. Ağdaki cüzdanlardan biri olan Tamga Wallet'a ispatlayıcı eklendi. Uygulamanın Android sürümü ispatı üretiyor, iPhone'da ise iOS kütüphanesi çıkana kadar yalnız evet/hayır alanı gönderiliyor (güncelleme, 19 Ekim 2026).

Bir fikir vermesi için, masaüstü bilgisayarda yapılan ilk denemede bir ispatın üretilmesi 518 ms, yerel olarak doğrulanması da 211 ms sürdü. İspatın boyutu yaklaşık 343 KB'tı. Telefonlardaki değerler cihaz testlerinden sonra yayımlanacak.

## Henüz neyi yapamıyor?

- **Yalnız eşitlik denetleniyor.** Bugünkü yüklemler `age_over_18 = true` ve `age_over_15 = true` ve ikisi de aynı devreyle ispatlanıyor ([ADR-0064](https://docs.tamga.network/tr/adr/0064-age-over-15-threshold)). Sırada `age_over_21`, uyruk ve eğitim belgelerinde kayıt ya da mezuniyet bilgisi var ve bunların hepsi de eşitlik denetimi. "Şu tarihten önce doğmuş" gibi aralık denetimleri ise Longfellow'da henüz yok.
- **Kurum görünür kalıyor.** Doğrulayıcı belgeyi hangi kurumun verdiğini yine öğreniyor. Kurumun adını vermeden "akredite bir kurum" demek şimdilik kapsam dışında.
- **İptal denetimi yok.** Yukarıda anlattığımız gibi bunun yerine en çok 24 saat geçerli kısa ömürlü kopyalar kullanılıyor (Ekim 2026'da uygulandı). İptali gizliliği bozmadan kanıtlayacak bir ispat ise AB'nin kararını bekliyor.
- **Boyut.** İspat başına yaklaşık 350 KB, QR kod kullanımını dışarıda bırakıyor.
- **iOS** henüz hazır değil.

## Sık sorulan sorular

### Sıfır bilgi ispatı için kurumun bir şeyi değiştirmesi gerekir mi?

Hayır. Kurum mdoc belgelerini eskisi gibi ES256 ile imzalamaya devam ediyor. Sıfır bilgi ispatı yalnız cüzdanda ve doğrulayıcıda devreye giriyor (ZK1 kuralı).

### Doğrulayıcı bir 18 yaş ispatından ne öğrenir?

Kayıtlı bir kurumun kimlik belgesinde `age_over_18 = true` yazdığını ve ispatın bu oturum için üretildiğini öğrenir. Bunun dışında hiçbir şey öğrenmez. Doğum tarihini, başka bir alanı, imza değerini ya da cihaz anahtarını görmez.

### İki site aynı kişinin ikisine de yaşını kanıtladığını anlayabilir mi?

İspata bakarak anlayamaz. Her ispat yeniden üretilir ve gösterimler arasında tekrar eden sabit bir değer içermez.

### Sıfır bilgi denetimi canlı mı?

Doğrulayıcı tarafı Tamga Verify'da `age-over-18-zk` politikasıyla canlı. Cüzdanların ise ispatlayıcıya ihtiyacı var. Android kütüphanesi hazır, iOS kütüphanesi bekleniyor.

### Cüzdanım ispat üretemezse ne olur?

Site izin veriyorsa aynı soruyu klasik denetimle yeniden sorar. Bu durumda cüzdanınız, kopyalarınızdan birinden yalnız `age_over_18` alanını açar.

## Kaynaklar

- [Longfellow ZK (GitHub)](https://github.com/longfellow-zk/longfellow-zk) · [Anonymous credentials from ECDSA (IACR ePrint 2024/2010)](https://eprint.iacr.org/2024/2010)
- [Yaş doğrulama için sıfır bilgi ispatı kütüphanelerinin açık kaynak yapılması (duyuru)](https://blog.google/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)
- [AB teknik şartnamesi TS13: aritmetik devre tabanlı sıfır bilgi ispatları (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts13-zksnarks.md) · [AB yaş doğrulama planı](https://ageverification.dev/)
- [OpenID for Verifiable Presentations 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0032: sıfır bilgi ispatları](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation) · [Sunucuda doğrulama: sıfır bilgiyle yaş denetimi](https://docs.tamga.network/tr/guides/verify-on-server) · [Doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)
- [Tamga ARF: mimari (§2.6, §2.8)](https://arf.tamga.network/tr/architecture) · [Sıfır bilgi ispatları](/learn/zero-knowledge-proofs) · [Bağlanamazlık](/learn/unlinkability)

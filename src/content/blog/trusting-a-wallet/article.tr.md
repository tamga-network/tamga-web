---
title: "Cüzdana nasıl güvenilir? Cüzdan ve anahtar kanıtları"
slug: trusting-a-wallet
description: Tamga Network'te bir kurumun belge vereceği cüzdana nasıl güvendiğini anlatıyoruz; cüzdan kanıtı, anahtar kanıtı, donanım kanıtı ve güven listesi.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Kaynak: ADR-0025 1.0.0 (AB TS3 modeli; K1 birim kaydı, birim anahtarı kuruma gösterilmez, birim kaydında kişisel veri yok; K2 WIA Ek E, TS3 §2.3.1 alanları, ömür < 24 sa (23 sa), client_status ≥ 31 gün (60), her işlemde yeni PoP anahtarı ve yeni iptal girişi, kurum başına yeniden kullanım yok; K3 KA Ek D, attested_keys, key_storage / user_authentication ISO 18045, certification, depo türü başına ortak key_storage_status girişi (TS3 Seçenek 1), jwt proof başlığında, tek kullanım; K4 güven listesinde kayıtlı anahtarla imzalı iki iptal listesi, "bu cüzdanı iptal et", kayıp cihaz sonra; K5 PAR/token ve credential ucunda denetimler, KA seviyesi ile kurum asgarisi, pilot öncesine kadar KA'sız geçiş (ADR-0025 K5; kod 2026-10-23'te bakıldı: KA'sız proof kurumun min_key_storage'ına karşı yazılım sayılır); uygulama notları: anahtar telefon kilidine bağlı, Play Integrity zorunlu değil, zorunlu yapmak ayrı ADR; WIA1–WIA4; ADR-0042 değişiklik notu). ADR-0034 (WIA sub bütün örneklerde ortak, HAIP §4.4.1). ADR-0042 (K1–K6, NW1–NW4; uygulama notu: TAMGA-WP-1 gerçek ve sandbox listede aynı kayıt, sertifikaya kadar RESERVED; kayıt elle, onayla; kendi kendine kayıt ayrı karar). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers. guides/build-a-wallet §4. ARF mimari §3, §7.1, §2.8. Canlı 2026-10-08: gerçek LOTL'de tek cüzdan sağlayıcı kaydı RESERVED, imza anahtarı yok; sandbox LOTL'de ağın kendi test sağlayıcısı ACTIVE. Dış: AB TS3, OpenID4VCI 1.0 Ek D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Bir kurum bir cüzdana, cüzdanın kendisi hakkında söylediklerine bakarak değil, imzalı kanıtlardan oluşan bir zincire bakarak güvenir. Bunun için önce cüzdanın sağlayıcısının (wallet provider) Tamga Network'ün imzalı güven listesinde kayıtlı olması gerekir. Sağlayıcı her belge isteğinde cüzdana kısa ömürlü ve imzalı iki beyan verir. Bunlardan biri, kurulumun cüzdanın gerçek ve iptal edilmemiş bir kurulumu olduğunu söyleyen cüzdan örneği kanıtıdır (WIA). Öbürü ise belge anahtarlarının nerede saklandığını bildiren anahtar kanıtıdır (KA). Sağlayıcı bir anahtarın donanımda saklandığını ancak bunu telefon platformunun kendi kanıtıyla, yani Android anahtar kanıtıyla ya da Apple App Attest ile doğruladıysa yazabilir. Kurum da belge vermeden önce bütün bunları güven listesine göre denetler. Ağın kendisi cüzdan işletmez, yalnız cüzdan sağlayıcılarını listeler.

## Bir kurum belgeyi hangi cüzdana verdiğini neden önemser?

Bir Tamga belgesi kişinin cihazındaki bir anahtara bağlıdır ve o anahtar kimdeyse belgeyi o gösterebilir. Anahtar sıradan uygulama verileri arasında dursaydı, belgeyle birlikte başka bir telefona kopyalanabilirdi ve belge artık pek bir şey kanıtlamazdı. Uygulama değiştirilmiş bir kopya olsaydı, onay ekranını atlayabilir ya da saklamaması gereken gösterimleri saklayabilirdi.

Bu yüzden kurum bir diplomayı ya da kimlik belgesini imzalamadan önce üç sorunun yanıtını bilmek ister. Cüzdanın ağın kurallarına uyup uymadığını, bu kurulumun hâlâ geçerli olup olmadığını ve belgeyi bağlaması istenen anahtarların gerçekten güvenli donanımda bulunup bulunmadığını sorar. AB çerçevesi de aynı soruları soruyor ve onları aynı iki kanıtla yanıtlıyor. Bu kanıtlar, Komisyon'un teknik şartnamesi [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)'te anlatılıyor. Tamga da bu modeli izliyor ([ADR-0025](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations)).

## Kim neye kefil olur?

Zincirin her halkası yalnız gerçekten görebildiği şeye kefil olur:

![Telefon platformundan verilen belgeye kadar kanıt zinciri](/blog/trusting-a-wallet/tr/fig-zincir.png)

1. **Telefon platformu** (Google'ın donanım kanıtı kökü ve Apple'ın App Attest kökü), bir anahtarın cihazın güvenli donanımında üretildiğine ve isteğin bilinen bir uygulamadan geldiğine kefil olur.
2. **Cüzdan sağlayıcısı** bu kanıtı, kurulum kaydolurken bir kez doğrular ve o andan sonra bu kurulum için kanıtlar imzalar.
3. **Güven listesi** cüzdan sağlayıcısını ve onun imza sertifikasını gösterir. Sağlayıcının listede etkin bir kaydı yoksa kanıtları hiçbir şey ifade etmez.
4. **Kurumun belge verme servisi** kanıtları denetler, belgeyi kanıtlanmış anahtarlara bağlar ve imzalar.

Ağ bu zincirde yalnız üçüncü halkada yer alır. Her sağlayıcının uyması gereken kuralları yazar ve listeyi yayımlar. Telefon kaydetmez, kanıt imzalamaz ve hiçbir cihaz verisini tutmaz.

## Cüzdan örneği kanıtında ne var?

WIA, [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) Ek E'deki biçime göre imzalanmış bir JWT'dir ve alanları TS3'ten gelir:

> **Not:** Aşağıdaki örnek sadeleştirildi. Değerler kısaltıldı ya da uyduruldu. Gerçek kuralları [ADR-0025](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations) ve [cüzdan rehberinde](https://docs.tamga.network/tr/guides/build-a-wallet) bulabilirsiniz.

```json title="Sadeleştirilmiş örnek: cüzdan örneği kanıtının içeriği"
{
  "iss": "https://provider.wallet.example",
  "sub": "example-wallet",
  "wallet_name": "example-wallet",
  "wallet_version": "1.0.0",
  "wallet_link": "https://wallet.example/",
  "client_status": {
    "status": { "status_list": { "idx": 7341, "uri": "https://provider.wallet.example/status/wia" } },
    "exp": 1797000000
  },
  "cnf": { "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" } },
  "iat": 1791800000,
  "exp": 1791882800
}
```

Gizliliği asıl sağlayan üç ayrıntı var:

- **`sub` her telefonda aynıdır.** Bu alan kurulumu değil, cüzdan ürününü adlandırır. [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili bunu şart koşuyor ve Tamga da bu kuralı benimsedi ([ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)).
- **Ömrü 24 saatten kısadır.** Tamga'da bu süre 23 saat.
- **Her belge isteği için yeni bir kanıt alınır.** Yeni kanıt, `cnf` içinde yeni bir sahiplik anahtarı ve sağlayıcının iptal listesinde birbirine bağlanamayan yeni bir konum taşır. Bir WIA ikinci bir kurumda hiçbir zaman kullanılmaz. Bu sayede bilgilerini karşılaştıran iki kurum, aynı telefonun ikisiyle de iletişim kurduğunu anlayamaz. Sağlayıcı da bir cüzdanın kaç kurumla iş yaptığını öğrenmez.

Kurulumun uzun ömürlü kendi anahtarı olan birim anahtarı ise yalnız cüzdanla sağlayıcısı arasında kullanılır ve hiçbir zaman bir kuruma gösterilmez.

## Anahtar kanıtı ne ekler?

WIA kurulumun gerçek olduğunu söyler. OpenID4VCI Ek D'deki biçimde ayrı bir JWT olan anahtar kanıtı ise belgenin bağlanacağı anahtarlar hakkında bilgi verir:

- `attested_keys`: bir paketteki bütün anahtarlar; her belge 10 kopya olarak verildiği ve her kopyanın kendi anahtarı olduğu için;
- `key_storage` ve `user_authentication`: TS3'ün kullandığı ISO 18045 terimleriyle anahtarın saklanma ve kullanıcı doğrulama düzeyleri;
- `key_storage_status`: sağlayıcının iptal edebileceği bir iptal listesi girişi.

Bu giriş bilinçli olarak kaba tutuluyor. Her saklama türü (yazılım deposu, Secure Enclave, StrongBox) için tek bir ortak giriş bulunuyor ve bu, TS3'ün izin verdiği ilk seçenek. Bir saklama türünün güvenli olmadığı ortaya çıkarsa sağlayıcı onu herkes için tek seferde geri çekebiliyor. Anahtar kanıtı da kurulumu tanıtacak hiçbir bilgiyi açığa çıkarmıyor. Her anahtar tam olarak bir anahtar kanıtında yer alıyor, her anahtar kanıtı yalnız bir kez kullanılıyor ve kanıt, cüzdanın kuruma gönderdiği sahiplik kanıtının başlığında taşınıyor.

Bu yapıyı dürüst tutan kural WIA3. Anahtar kanıtındaki saklama düzeyi gerçeği yansıtmak zorunda ve doğrulanmamış bir beyan anahtar kanıtına hiçbir zaman yazılmıyor.

## Sağlayıcı anahtarın donanımda olduğunu nereden bilir?

Sağlayıcı bunu platformun imzalı kanıtından öğrenir ve uygulamanın kendisi hakkında söylediklerine hiçbir zaman dayanmaz ([cüzdan rehberi §4](https://docs.tamga.network/tr/guides/build-a-wallet)):

![Cüzdan sağlayıcısının platform kanıtında denetledikleri](/blog/trusting-a-wallet/tr/fig-kanit.png)

| Platform | Kanıt | Ne denetlenir |
|---|---|---|
| Android | [anahtar kanıtı](https://developer.android.com/privacy-and-security/security-key-attestation) zinciri (key attestation) | Google'ın donanım köküne bağlanması; tek kullanımlık meydan okuma değeri; güvenlik düzeyi (TEE ya da StrongBox); doğrulanmış açılış; uygulamanın paket adı |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple'ın köküne bağlanması; uygulama kimliği (Team ID ve Bundle ID); istemci verisinin birim anahtarının parmak izini taşıması |

Kanıt doğrulanana kadar kurulum yazılım düzeyinde sayılır ve bunun ne anlama geldiğini ağın cüzdan kuralları belirler. Cüzdanlar üç düzeyde sınıflandırılıyor. W1 yazılım anahtarı, W2 cihazın güvenli bölgesi (Secure Enclave ya da StrongBox), W3 ise devlet aşaması için sertifikalı bir güvenli öğe anlamına geliyor. En düşük kabul edilen düzey W2. Yazılım anahtarı kullanan cüzdanlar desteklenmiyor. Bunun tek istisnası, ağın sandbox listesinde kendi tanıtım senaryoları için tuttuğu test anahtarı (WL3 kuralı).

Donanım anahtarları telefonun kilidine de bağlıdır. Bir belge anahtarı yalnız telefonun kilidi açıkken kullanılabilir ve her gösterim cihazın biyometrik doğrulamasıyla ya da parolasıyla onaylanır (WL11 kuralı).

Android'de sağlayıcı ayrıca, uygulamanın mağazadan yüklendiğini gösteren bir [Play Integrity](https://developer.android.com/google/play/integrity) sonucu da gönderebilir. W2 düzeyinde bu isteğe bağlıdır. Bu sonuç anahtar kanıtından gelen düzeyi hiçbir zaman düşürmez ve sonucun olmaması da kaydı engellemez. En yüksek düzey olan W3'te ise sağlayıcının, bir birimi etkinleştirmeden önce ve W3 düzeyini beyan eden her anahtar kanıtından önce platformun cihaz kanıtını doğrulaması gerekir (RB-WP-17).

## Kurum belge vermeden önce neyi denetler?

![Belge verme servisinin sırayla denetledikleri](/blog/trusting-a-wallet/tr/fig-denetim.png)

Yetkilendirme ve token uçlarında belge verme servisi WIA'yı doğrular. İmzayı denetler ve imza anahtarının, güven listesinde kaydı `ACTIVE` olan bir cüzdan sağlayıcısına ait olduğuna bakar. Ardından geçerlilik süresini, `cnf` anahtarının sahiplik kanıtını ve `client_status` değerinin iptal edilmemiş olduğunu denetler.

Belge ucunda ise anahtar kanıtını doğrular. Kanıtın imzasını ve sağlayıcının anahtarını denetler. Cüzdanın gönderdiği sahiplik kanıtının, listedeki ilk anahtarla ve kurumun verdiği taze nonce üzerinden imzalandığına bakar. `key_storage_status` değerinin iptal edilmemiş olduğunu ve saklama düzeyinin kurumun kendi belirlediği en düşük düzeyi karşıladığını da denetler. Ancak bundan sonra belgeyi imzalar ve her kopyayı kanıtlanmış anahtarlardan birine bağlar. Belge verme servisi iptal edilmiş bir WIA ya da anahtar kanıtıyla hiçbir zaman belge vermez (WIA4 kuralı). Bu adımların protokol tarafını [OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive) yazısında anlattık.

Bir geçiş dönemi kuralını da açıkça yazıyoruz. Pilota kadar belge verme servisi, anahtar kanıtı içermeyen bir sahiplik kanıtını da kabul ediyor. Böyle bir kanıt yazılım deposunda saklanan anahtar olarak değerlendiriliyor, bu yüzden en düşük düzeyi yazılımın üzerinde olan bir kurum onu bugün de reddediyor. Bu yol pilottan önce kaldırılacak.

## Bir cüzdan, ya da bütün bir cüzdan ürünü nasıl geri çekilir?

Dardan genişe doğru üç düzey var:

| Ne geri çekilir | Kim yapar | Etkisi |
|---|---|---|
| Tek bir kurulum | cüzdan sağlayıcısı, kişinin isteğiyle (örneğin telefonu başkasına vermeden önce "bu cüzdanı iptal et") | o kuruluma verilmiş bütün WIA girişleri iptal edilir |
| Bir anahtar saklama türü | cüzdan sağlayıcısı | o saklama türü için verilmiş her anahtar kanıtı iptal denetiminden geçemez |
| Bütün bir cüzdan sağlayıcısı | kayıt makamı, güven listesi üzerinden | sağlayıcının kaydı `SUSPENDED` ya da `REVOKED` olur ve kanıtları artık geçerli sayılmaz |

Telefonda zaten bulunan belgeler bundan ayrıdır. Onları, belgeyi veren kurumlar kendi [durum listeleri](/blog/status-list-privacy) üzerinden geri çeker. Bir kurulumun iptal edilmesi ise o kurulumun yeni belge almasını durdurur.

Kaybolan ya da çalınan bir telefonu uzaktan geri çekmek için kişinin o telefon olmadan kim olduğunu kanıtlayabileceği bir yol gerekir. Karar bu konuyu sonraki bir adıma bırakıyor.

## Tamga Network neden cüzdan işletmez?

Cüzdan işleten bir ağ, kendi ürününü kendisi değerlendirmiş olurdu. AB modelinde de her cüzdanı onu sunan kuruluş işletiyor ve güven çerçevesi yalnız cüzdan sağlayıcılarını listeliyor. Tamga Network de aynı ayrımı izliyor ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)):

- ağ hiçbir cüzdan uygulamasını, cüzdan sağlayıcısını ya da cüzdan sitesini işletmez ve ağın alan adları altında hiçbir cüzdan hizmeti çalışmaz;
- bir cüzdanı yalnız güven listesindeki kaydıyla tanır ve yayımlanmış kurallara uyan her sağlayıcı bu kaydı alabilir;
- arayüzleri ve paketleri hiçbir cüzdanın adını koda gömmez;
- tek bir sandbox var ve ağa ait; cüzdan geliştiricisi kendi sağlayıcısını işletir ve onu sandbox listesine kaydettirir.

[Tamga Wallet](https://tamgawallet.com/tr) ağdaki cüzdanlardan biri. Ayrı bir ürün olarak öbür cüzdanlarla aynı yoldan listeye giriyor. Sağlayıcısının (`TAMGA-WP-1`) gerçek listede bir kaydı ve sandbox listesinde aynı kaydı bulunuyor. İki kayıt da 14 Ekim 2026'dan beri `ACTIVE`. O gün cüzdanın işletmecisi sağlayıcı servisini cüzdanın kendi alan adı altında açtı ve kendi sertifikasını sağladı. Sandbox listesinde ayrıca ağın kendi tanıtım senaryoları için tuttuğu bir test sağlayıcısı da var. Kayıtlar bugün elle ve proje yönetiminin onayıyla yapılıyor. Cüzdan sağlayıcılarının kendi kendilerini kaydedebilmesi ise ayrı bir karar gerektiriyor.

## Bugünkü dürüst sınırlar neler?

- **Cihaz testleri bekliyor.** Donanım anahtarları ve cihaz kanıtı uygulandı. Gerçek telefonlarla yapılacak testler uygulama mağazası sürümünden önce yapılacak ([ARF §2.8](https://arf.tamga.network/tr/architecture)).
- **Şimdilik tek bir etkin cüzdan sağlayıcısı var.** Gerçek listede yalnız yukarıda anlatılan Tamga Wallet kaydı bulunuyor.
- **Play Integrity W3'ün altında isteğe bağlı.** Anahtar kanıtı içermeyen sahiplik kanıtlarını kabul eden geçiş kuralı da pilota kadar sürüyor.
- **Kaybolan bir telefonun iptali** bir hesap gerektirmiyor, ama kişinin, sağlayıcının etkinleştirme sırasında bir kez gösterdiği iptal kodunu saklamasına dayanıyor (RB-WP-15).
- **Henüz sertifikalı bir güvenli öğe yok.** W3 düzeyi devlet aşamasına ait.
- **Kanıtlar kişiyi değil, yazılımı ve anahtarları kanıtlıyor.** Kişinin kim olduğu ayrı bir soru ve bu sorunun yanıtını kurumda yapılan kimlik doğrulama veriyor.

## Sık sorulan sorular

### Her cüzdan Tamga Network'e katılabilir mi?

Sağlayıcısı yayımlanmış kurallara uyan ve uyum testlerinden geçen her cüzdan listeye girebilir. Ağ cüzdanları adlarıyla değil, güven listesindeki kayıtlarıyla tanır.

### Cüzdan sağlayıcısı hangi kurumları kullandığımı öğrenir mi?

Hayır. Her belge isteğinde yeni bir anahtar ve yeni bir iptal konumu taşıyan taze bir kanıt kullanılır. Bu yüzden sağlayıcı bir cüzdanın kaç kurumla iletişim kurduğunu göremez, kurumlar da aynı telefonu kendi aralarında eşleştiremez.

### Telefonumda güvenli donanım yoksa ne olur?

Kurulum yazılım düzeyinde kalır ve ağın kuralları gerçek belgeler için yazılım anahtarı kullanan cüzdanları desteklemez. Cüzdanın bunu kişiye açıkça söylemesi ve sessizce devam etmemesi gerekir.

### Bir cüzdan ürünü ağdan çıkarılabilir mi?

Evet. Kayıt makamı, sağlayıcının güven listesindeki kaydını askıya alabilir ya da iptal edebilir. O andan sonra sağlayıcının kanıtları hiçbir belge verme servisinden geçmez.

## Kaynaklar

- [AB teknik şartnamesi TS3: cüzdan birimi kanıtı (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [AB Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [OpenID for Verifiable Credential Issuance 1.0 (Ek D anahtar kanıtı, Ek E cüzdan kanıtı)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android anahtar kanıtı](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: cüzdan ve anahtar kanıtı](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 uyumu](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [Tamga uyumlu cüzdan geliştirme](https://docs.tamga.network/tr/guides/build-a-wallet) · [Cüzdan şartnamesi](https://docs.tamga.network/tr/specifications/wallet)
- [Cüzdan geliştirmek](/learn/build-a-wallet) · [İlk cüzdan](/learn/first-wallet) · [Dijital cüzdanlar](/learn/digital-wallets)

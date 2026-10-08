---
title: "Cüzdana nasıl güvenilir? Cüzdan ve anahtar kanıtları"
slug: trusting-a-wallet
description: Tamga Network'te bir kurum belge vereceği cüzdana nasıl güvenir: cüzdan kanıtı, anahtar kanıtı, donanım kanıtı ve güven listesi.
date: 2026-10-08
lang: tr
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Kaynak: ADR-0025 1.0.0 (AB TS3 modeli; K1 birim kaydı, birim anahtarı kuruma gösterilmez, birim kaydında kişisel veri yok; K2 WIA Ek E, TS3 §2.3.1 alanları, ömür < 24 sa (23 sa), client_status ≥ 31 gün (60), her işlemde yeni PoP anahtarı ve yeni iptal girişi, kurum başına yeniden kullanım yok; K3 KA Ek D, attested_keys, key_storage / user_authentication ISO 18045, certification, depo türü başına ortak key_storage_status girişi (TS3 Seçenek 1), jwt proof başlığında, tek kullanım; K4 güven listesinde kayıtlı anahtarla imzalı iki iptal listesi, "bu cüzdanı iptal et", kayıp cihaz sonra; K5 PAR/token ve credential ucunda denetimler, KA seviyesi ile kurum asgarisi, pilota kadar KA'sız geçiş; uygulama notları: anahtar telefon kilidine bağlı, Play Integrity zorunlu değil, zorunlu yapmak ayrı ADR; WIA1–WIA4; ADR-0042 değişiklik notu). ADR-0034 (WIA sub bütün örneklerde ortak, HAIP §4.4.1). ADR-0042 (K1–K6, NW1–NW4; uygulama notu: TAMGA-WP-1 gerçek ve sandbox listede aynı kayıt, sertifikaya kadar RESERVED; kayıt elle, onayla; kendi kendine kayıt ayrı karar). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers. guides/build-a-wallet §4. ARF mimari §3, §7.1, §2.8. Canlı 2026-10-08: gerçek LOTL'de tek cüzdan sağlayıcı kaydı RESERVED, imza anahtarı yok; sandbox LOTL'de ağın kendi test sağlayıcısı ACTIVE. Dış: AB TS3, OpenID4VCI 1.0 Ek D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Bir kurum bir cüzdana, cüzdanın kendi beyanıyla değil, imzalı kanıtlardan oluşan bir zincirle güvenir. Cüzdanın sağlayıcısı (wallet provider) Tamga Network'ün imzalı güven listesinde kayıtlı olmalıdır. Sağlayıcı her belge isteğinde cüzdana kısa ömürlü, imzalı iki beyan verir: "bu, cüzdanımızın gerçek ve iptal edilmemiş bir kurulumu" diyen cüzdan örneği kanıtı (WIA) ve belge anahtarlarının nerede durduğunu söyleyen anahtar kanıtı (KA). Sağlayıcı, donanımda saklandığını ancak telefon platformunun kendi kanıtından, yani Android anahtar kanıtından ya da Apple App Attest'ten doğruladığı anahtarlar için söyleyebilir. Kurum bütün bunları belge vermeden önce güven listesine göre denetler. Ağın kendisi cüzdan işletmez; cüzdan sağlayıcılarını listeler.

## Bir kurum belgeyi hangi cüzdana verdiğini neden önemser?

Tamga belgesi kişinin cihazındaki bir anahtara bağlıdır. O anahtar kimdeyse belgeyi o gösterebilir. Anahtar sıradan uygulama deposunda dursaydı belgeyle birlikte başka bir telefona kopyalanabilir, belge artık pek bir şey kanıtlamazdı. Uygulama değiştirilmiş bir kopya olsaydı rıza ekranını atlayabilir ya da tutmaması gereken sunumları tutabilirdi.

Bu yüzden bir diplomayı ya da kimlik belgesini imzalamadan önce kurum üç sorunun cevabını ister. Bu, ağın kurallarına uyan bir cüzdan mı? Bu kurulum hâlâ geçerli mi? Belgeyi bağlamamı istediği anahtarlar gerçekten güvenli donanımda mı? AB çerçevesi de aynı soruları sorar ve aynı iki kanıtla cevaplar; bunlar Komisyon'un teknik şartnamesi [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)'te anlatılır. Tamga bu modeli izler ([ADR-0025](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations)).

## Kim neye kefil olur?

Zincirin her halkası yalnız gerçekten görebildiği şeye kefil olur:

![Telefon platformundan verilen belgeye kadar kanıt zinciri](/blog/trusting-a-wallet/tr/fig-zincir.png)

1. **Telefon platformu** (Google'ın donanım kanıtı kökü, Apple'ın App Attest kökü), bir anahtarın cihazın güvenli donanımında üretildiğine ve isteğin bilinen bir uygulamadan geldiğine kefil olur.
2. **Cüzdan sağlayıcısı** bu kanıtı kurulum kaydolurken bir kez doğrular ve o andan sonra bu kurulum için kanıt imzalar.
3. **Güven listesi** cüzdan sağlayıcısını ve imza sertifikasını adlandırır. Etkin bir kaydı yoksa sağlayıcının kanıtları hiçbir şey ifade etmez.
4. **Kurumun belge verme servisi** kanıtları denetler, belgeyi kanıtlanmış anahtarlara bağlar ve imzalar.

Ağ yalnız üçüncü halkadadır. Her sağlayıcının uyması gereken kuralları yazar ve listeyi yayımlar; telefon kaydetmez, kanıt imzalamaz, cihaz verisi tutmaz.

## Cüzdan örneği kanıtında ne var?

WIA, [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) Ek E biçiminde imzalı bir JWT'dir. Alanlar TS3'ten gelir:

> **Not:** Sadeleştirilmiş örnek. Değerler kısaltıldı ya da uyduruldu. Gerçek kurallar [ADR-0025](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations) ve [cüzdan rehberinde](https://docs.tamga.network/tr/guides/build-a-wallet).

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

Gizliliğin çoğunu üç ayrıntı taşır:

- **`sub` her telefonda aynıdır.** Kurulumu değil, cüzdan çözümünü adlandırır. [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili bunu şart koşar, Tamga da benimsedi ([ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)).
- **Ömrü 24 saatten kısadır** (Tamga'da 23 saat).
- **Her belge isteğinde yenisi alınır**; `cnf` içinde yeni bir sahiplik kanıtı anahtarı ve sağlayıcının iptal listesinde yeni, bağlanamaz bir konumla. Bir WIA ikinci bir kurumda hiç kullanılmaz. Bilgilerini karşılaştıran iki kurum, aynı telefonun ikisiyle de konuştuğunu anlayamaz; sağlayıcı da bir cüzdanın kaç kurumla iş yaptığını öğrenmez.

Kurulumun kendi uzun ömürlü anahtarı, birim anahtarı, yalnız cüzdanla sağlayıcısı arasında kullanılır. Hiçbir zaman bir kuruma gösterilmez.

## Anahtar kanıtı ne ekler?

WIA kurulumun gerçek olduğunu söyler. OpenID4VCI Ek D biçiminde ayrı bir JWT olan anahtar kanıtı ise belgenin bağlanacağı anahtarlar hakkında bir şey söyler:

- `attested_keys`: bir paketteki bütün anahtarlar; her belge 10 kopya olarak verilir ve her kopyanın kendi anahtarı vardır;
- `key_storage` ve `user_authentication`: TS3'ün kullandığı ISO 18045 terimleriyle depolama ve kullanıcı doğrulama seviyeleri;
- `key_storage_status`: sağlayıcının iptal edebileceği bir iptal listesi girişi.

Bu giriş bilerek kabadır. Depo türü başına (yazılım deposu, Secure Enclave, StrongBox) tek bir ortak giriş vardır; TS3'ün izin verdiği ilk seçenek bu. Bir depo türünün bozuk olduğu anlaşılırsa sağlayıcı onu herkes için tek seferde geri çekebilir ve anahtar kanıtı kurulumu tanıtan hiçbir şey açmaz. Her anahtar tam olarak bir anahtar kanıtında yer alır, her anahtar kanıtı bir kez kullanılır ve kanıt cüzdanın kuruma gönderdiği proof'un başlığında taşınır.

Bunu dürüst tutan kural WIA3'tür: anahtar kanıtındaki depo seviyesi gerçeği söyler; doğrulanmamış bir beyan anahtar kanıtına hiç yazılmaz.

## Sağlayıcı anahtarın donanımda olduğunu nereden bilir?

Platformun imzalı kanıtından; uygulamanın kendisi hakkında söylediğinden asla ([cüzdan rehberi §4](https://docs.tamga.network/tr/guides/build-a-wallet)):

![Cüzdan sağlayıcısının platform kanıtında denetledikleri](/blog/trusting-a-wallet/tr/fig-kanit.png)

| Platform | Kanıt | Ne denetlenir |
|---|---|---|
| Android | [anahtar kanıtı](https://developer.android.com/privacy-and-security/security-key-attestation) zinciri (key attestation) | Google donanım köküne bağlı; tek kullanımlık meydan okuma; güvenlik seviyesi (TEE ya da StrongBox); doğrulanmış açılış; uygulama paket adı |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple köküne bağlı; uygulama kimliği (Team ID ve Bundle ID); istemci verisi birim anahtarının parmak izini taşır |

Kanıt doğrulanana kadar kurulum yazılım seviyesinde sayılır. Bunun ne anlama geldiğini ağın cüzdan kuralları belirler. Cüzdanlar W1 (yazılım anahtarı), W2 (cihazın güvenli bölgesi: Secure Enclave ya da StrongBox) ve W3 (sertifikalı güvenli öğe, devlet aşaması için) olarak derecelenir. Asgari seviye W2'dir. Yazılım anahtarlı cüzdan desteklenmez; tek istisna, ağın sandbox listesinde kendi deneme sahneleri için tuttuğu test anahtarıdır (WL3 kuralı).

Donanım anahtarları telefon kilidine de bağlıdır. Belge anahtarı yalnız telefonun kilidi açıkken kullanılabilir ve her sunum cihazın biyometrisi ya da parolasıyla onaylanır (WL11 kuralı).

Android'de sağlayıcı ayrıca uygulamanın mağazadan geldiğini gösteren bir [Play Integrity](https://developer.android.com/google/play/integrity) sonucu gönderebilir. Bugün bu isteğe bağlıdır: anahtar kanıtından gelen seviyeyi hiçbir zaman düşürmez ve yokluğu kaydı engellemez. Zorunlu yapmak kararı değiştirir ve ayrı bir karar kaydı gerektirir.

## Kurum belge vermeden önce neyi denetler?

![Belge verme servisinin sırayla denetledikleri](/blog/trusting-a-wallet/tr/fig-denetim.png)

Yetkilendirme ve token uçlarında belge verme servisi WIA'yı doğrular: imzasını, imza anahtarının güven listesinde kaydı `ACTIVE` olan bir cüzdan sağlayıcısına ait olduğunu, geçerlilik süresini, `cnf` anahtarının sahiplik kanıtını ve `client_status`'un iptal edilmemiş olduğunu.

Belge ucunda anahtar kanıtını doğrular: imzasını ve sağlayıcı anahtarını, cüzdanın proof'unun ilk kanıtlanmış anahtarla ve kurumun taze nonce'u üzerinden imzalandığını, `key_storage_status`'un iptal edilmemiş olduğunu ve depo seviyesinin kurumun kendi asgarisini karşıladığını. Ancak bundan sonra imzalar ve her kopyayı kanıtlanmış anahtarlardan birine bağlar. Belge verme servisi iptal edilmiş bir WIA ya da anahtar kanıtıyla hiçbir zaman belge vermez (WIA4 kuralı). Bu adımların protokol tarafı [OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive) yazısında.

Bir geçiş açıkça yazılı: pilota kadar belge verme servisi anahtar kanıtı olmayan bir cüzdan proof'unu da kabul eder. Bu yol pilotta kaldırılır.

## Bir cüzdan, ya da bütün bir cüzdan ürünü nasıl geri çekilir?

Dardan genişe üç seviye var:

| Ne geri çekilir | Kim yapar | Etkisi |
|---|---|---|
| Tek bir kurulum | cüzdan sağlayıcısı, kişinin isteğiyle ("bu cüzdanı iptal et", örneğin telefonu devretmeden önce) | o kuruluma verilmiş bütün WIA girişleri iptal olur |
| Bir anahtar deposu türü | cüzdan sağlayıcısı | o depo türü için her anahtar kanıtı iptal denetiminden geçemez |
| Bütün bir cüzdan sağlayıcısı | kayıt makamı, güven listesi üzerinden | sağlayıcının kaydı `SUSPENDED` ya da `REVOKED` olur; kanıtları artık sayılmaz |

Telefonda zaten duran belgeler bundan ayrıdır: onları, veren kurumlar kendi [durum listeleriyle](/blog/status-list-privacy) geri çeker. Bir kurulumun iptali, o kurulumun yeni belge almasını durdurur.

Kaybolan ya da çalınan bir telefonu uzaktan geri çekmek, kişinin o telefon olmadan kim olduğunu kanıtlamasının bir yolunu gerektirir. Karar bunu sonraki bir adıma bırakıyor.

## Tamga Network neden cüzdan işletmez?

Çünkü cüzdan işleten bir ağ kendi ürününü değerlendirmiş olurdu. AB modelinde her cüzdanı onu sunan kuruluş işletir; güven çerçevesi yalnız cüzdan sağlayıcılarını listeler. Tamga Network de aynı ayrımı izler ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)):

- ağ hiçbir cüzdan uygulamasını, cüzdan sağlayıcısını ya da cüzdan sitesini işletmez; ağın alan adlarında hiçbir cüzdan hizmeti çalışmaz;
- bir cüzdanı yalnız güven listesindeki kaydıyla tanır; yayımlanmış kurallara uyan her sağlayıcı bu kaydı alabilir;
- arayüzleri ve paketleri hiçbir cüzdanın adını sabit yazmaz;
- tek bir sandbox var ve ağa ait: cüzdan geliştiricisi kendi sağlayıcısını işletir ve sandbox listesine kaydeder.

Tamga Wallet ağdaki cüzdanlardan biridir. Ayrı bir üründür ve listeye her cüzdan gibi girer. 8 Ekim 2026'da sağlayıcısının (`TAMGA-WP-1`) gerçek listede bir kaydı, sandbox listesinde de aynı kaydı var; ikisi de `RESERVED`. Yer ayrılmış ama cüzdanın işletmecisi kendi sertifikasını verene kadar kayıtta imza anahtarı yok; dolayısıyla henüz bu kayda karşı hiçbir kanıt geçemez. Sandbox listesinde ayrıca ağın kendi deneme sahneleri için test sağlayıcısı bulunur. Kayıt bugün elle ve proje yönetimi onayıyla yapılıyor; cüzdan sağlayıcılarının kendi kendine kaydı ayrı bir karar gerektiriyor.

## Bugünkü dürüst sınırlar neler?

- **Cihaz testi hâlâ önde.** Donanım anahtarları ve cihaz kanıtı uygulandı; gerçek cihazlarda test uygulama mağazası sürümüyle gelecek ([ARF §2.8](https://arf.tamga.network/tr/architecture)).
- **Gerçek listede henüz etkin bir cüzdan sağlayıcısı yok.** Tek kayıt, yukarıda anlatıldığı gibi ayrılmış durumda.
- **Play Integrity isteğe bağlı**; anahtar kanıtı olmayan proof'u kabul eden geçiş de pilota kadar sürüyor.
- **Kaybolan telefonun uzaktan geri çekilmesi** sonraki bir adımı bekliyor.
- **Henüz sertifikalı güvenli öğe yok.** W3 devlet aşamasına ait.
- **Kanıtlar yazılımı ve anahtarları kanıtlar, kişiyi değil.** Kişinin kim olduğu ayrı bir sorudur ve kurumdaki kimlik doğrulamayla cevaplanır.

## Sık sorulan sorular

### Her cüzdan Tamga Network'e katılabilir mi?

Sağlayıcısı yayımlanmış kurallara uyan ve uyum testlerinden geçen her cüzdan listelenebilir. Ağ cüzdanları adlarıyla değil, güven listesindeki kayıtlarıyla tanır.

### Cüzdan sağlayıcısı hangi kurumları kullandığımı öğrenir mi?

Hayır. Her belge isteği yeni anahtarlı ve yeni iptal konumlu, taze bir kanıt kullanır. Sağlayıcı bir cüzdanın kaç kurumla konuştuğunu görmez, kurumlar da aynı telefonu birbirleri arasında eşleştiremez.

### Telefonumda güvenli donanım yoksa ne olur?

Kurulum yazılım seviyesinde kalır ve ağın kuralları gerçek belgeler için yazılım anahtarlı cüzdanı desteklemez. Cüzdan bunu kişiye açıkça söylemeli, sessizce devam etmemeli.

### Bir cüzdan ürünü ağdan çıkarılabilir mi?

Evet. Kayıt makamı sağlayıcının güven listesindeki kaydını askıya alabilir ya da iptal edebilir; o andan itibaren kanıtları hiçbir belge verme servisinden geçmez.

## Kaynaklar

- [AB teknik şartnamesi TS3: cüzdan birimi kanıtı (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [AB Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [OpenID for Verifiable Credential Issuance 1.0 (Ek D anahtar kanıtı, Ek E cüzdan kanıtı)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android anahtar kanıtı](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: cüzdan ve anahtar kanıtı](https://docs.tamga.network/tr/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 uyumu](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [Tamga uyumlu cüzdan geliştirme](https://docs.tamga.network/tr/guides/build-a-wallet) · [Cüzdan şartnamesi](https://docs.tamga.network/tr/specifications/wallet)
- [Cüzdan geliştirmek](/learn/build-a-wallet) · [İlk cüzdan](/learn/first-wallet) · [Dijital cüzdanlar](/learn/digital-wallets)

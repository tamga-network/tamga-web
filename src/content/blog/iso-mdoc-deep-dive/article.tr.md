---
title: "ISO mdoc ayrıntılı: CBOR, COSE, MSO ve bağlantı kurma"
slug: iso-mdoc-deep-dive
description: Bir ISO/IEC 18013-5 mdoc nasıl kurulur ve doğrulanır; CBOR ve COSE, MSO ve özetler, cihaz imzası, oturum dökümü, QR ve Bluetooth.
date: 2026-10-08
lang: tr
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Kaynak: ADR-0013 v1.0.0 (2026-09-26 kabul; MD1–MD5; docType/ad alanı; CBOR belirlenimcilik notu; Safari/Chrome DC API bilgisi ADR'deki kayıttan); SPEC-PROTO-0001 PR16; SPEC-PROTO-0002 §4.5, §5.2, PV11; @tamga-network/mdoc README + kaynak (mdoc.ts, proximity.ts); kimlik tür tanımı urn:tamga:id:IdentityAttestation:1 (11 öğe, sd always, portre yok); concepts/presentation (BLE yazıldı, cihaz testi sürüyor). Örnek mdoc bu yazı için @tamga-network/mdoc ile sahte değerlerle üretildi. ISO/IEC 18013-5:2021 katalog kaydı; OpenID4VP 1.0 Final Ek B.2.6; HAIP 1.0 Final §6. -->

**mdoc**, mobil sürücü belgesi standardı ISO/IEC 18013-5:2021'in tanımladığı mobil belge biçimidir. COSE ile imzalanmış CBOR'dur: kurum, her veri öğesinin özetini ve belge sahibinin cihaz anahtarını listeleyen bir **Mobile Security Object (MSO)** imzalar; belge sahibi yalnız okuyucunun istediği öğeleri gönderir; bir **oturum dökümü** (session transcript) üzerine atılan cihaz imzası da yanıtı o tek oturuma bağlar. Tamga kimlik belgesini SD-JWT VC'nin yanında mdoc olarak da verir.

> **Not:** Örnekler bu yazı için açık `@tamga-network/mdoc` paketiyle, sahte değerlerle üretildi. Özetler kısaltıldı, sertifika zinciri gösterilmiyor.

## Tamga kimlik belgesini neden iki biçimde veriyor?

26 Eylül 2026'da kabul edilen [ADR-0013](https://docs.tamga.network/tr/adr/0013-mdoc-dual-format-for-identity) üç gerekçe sayar. AB'nin dijital kimlik cüzdanı mimarisi kişi kimlik verisi için mdoc'u zorunlu, SD-JWT VC'yi isteğe bağlı tutar. ISO 18013-5'e göre yüz yüze gösterim mdoc taşır. Karar alındığında Safari'nin Digital Credentials API'si yalnız mdoc kabul ediyordu, Chrome ise iki biçimi de.

Bu karardan çıkan kurallar:

- **SD-JWT VC birincil kalır.** mdoc aynı belgenin ikinci gösterimidir ve yalnız kimlik belgesi için vardır (`urn:tamga:id:IdentityAttestation:1`). Öğrenci belgesi, diploma ve bilet yalnız SD-JWT VC'dir.
- **Aynı alanlar, aynı geçerlilik, aynı anahtar.** mdoc'un `deviceKey`'i SD-JWT'nin `cnf.jwk`'sidir. İkinci bir cihaz anahtarı üretilmez.
- **Ayrı kurum imzaları.** SD-JWT için JOSE/ES256, mdoc için `COSE_Sign1`/ES256; aynı sertifika zinciri güven listesinde aynı kayda varır.
- **Tek ihraç, tek durum biti.** Belge yanıtındaki her nesne SD-JWT VC'yi ve mdoc'u (base64url `IssuerSigned`) birlikte taşır; ikisi de aynı kanıt anahtarına ve aynı durum listesi sırasına bağlıdır. Cüzdan mdoc'u, SD-JWT kopyasıyla karşılaştırmadan saklamaz: aynı kurum sertifikası, aynı alanlar, `cnf`'ye eşit `deviceKey`.

![SD-JWT VC ve mdoc, alan alan karşılaştırma](/blog/iso-mdoc-deep-dive/tr/fig-formats.png)

## mdoc nasıl kodlanır?

Her şey **CBOR**'dur (RFC 8949): JSON'la aynı veri modeline bayt dizgileri, etiketler ve tamsayı anahtarlar ekleyen ikili bir kodlama. Burada iki etiket önemli. Etiket 24 "bu bayt dizgisinin içi de kodlanmış CBOR'dur" demektir; imzacının tam o baytları özetlemesini sağlar. SD-JWT'nin disclosure dizgileriyle öğrettiği ders burada da geçerli ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). Etiket 0 ise RFC 3339 tarih-saat dizgisini işaretler.

İmzalar **COSE** ile atılır (RFC 9052), JOSE'nin CBOR karşılığı. `COSE_Sign1` dört elemanlı bir dizidir: korumalı başlık, korumasız başlık, yük ve imza. Tamga'nın kurum imzasında korumalı başlıkta `{1: -7}` (ES256), sertifika zinciri de `x5chain`'de durur.

ADR-0013 bir birlikte çalışabilirlik notu düşer. Tamga belirlenimci CBOR'u RFC 8949 §4.2.1'e göre (anahtarlar bayt sırasıyla) kodlar; ISO 18013-5:2021 ise RFC 7049'un eski "önce uzunluk" sıralamasına atıf yapar. Özetler, verildiği hâliyle etiket 24 baytları üzerinden alındığı için doğrulama sıralama kuralına bağlı değil; yine de tam uyum için madde açık tutuluyor.

## Veri öğesi nedir, özeti nasıl alınır?

Her alan bir `IssuerSignedItem`'dır: `digestID`, 16 rastgele bayt, öğe adı ve değerinden oluşan, kodlanıp etiket 24'e sarılmış bir harita. Özeti, bu etiketli baytların SHA-256'sıdır.

```cbor-diag title="Sadeleştirilmiş örnek: bir IssuerSignedItem (@tamga-network/mdoc ile üretildi)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

Etiketli baytların SHA-256'sı: c2418dcd28b95cc1…
```

Rastgele değer SD-JWT'deki tuzun işini görür: o olmasa `age_over_18: true` değerinin özeti her belgede aynı olur, tahmin edilebilirdi. `digestID` öğeyi MSO'daki kaydına bağlar. Tamga digestID'leri 0, 1, 2 diye saymak yerine 31 bit içinde rastgele verir; böylece gösterilen kimlikler, öğe sayısı ya da öğelerin yeri hakkında bir şey söylemez.

Öğeler **ad alanlarında** (namespace) durur. Tamga'nın kimlik ad alanı `tamga.id.1`'dir ve öğe adları SD-JWT'deki alan adlarıyla birebir aynıdır: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` ve `age_over_18`. Hepsi seçici paylaşılabilir. Portre öğesi yoktur.

## Mobile Security Object'te ne var?

MSO kurumun imzaladığı parçadır. Kodlanır, etiket 24'e sarılır ve kurumun `COSE_Sign1`'inin (`issuerAuth`) yükü olur:

```cbor-diag title="Sadeleştirilmiş örnek: MobileSecurityObject (@tamga-network/mdoc ile üretildi)"
{
  "version": "1.0",
  "digestAlgorithm": "SHA-256",
  "docType": "urn:tamga:id:IdentityAttestation:1",
  "valueDigests": {
    "tamga.id.1": {
      692698667:  h'9852780268ee6d84…',
      1192084209: h'c2418dcd28b95cc1…',
      1688544371: h'195cd811675f41a9…',
      1708359320: h'd67a4825ac901b31…',
      1956174090: h'3dbc0b38db348aef…'
    }
  },
  "deviceKeyInfo": { "deviceKey": { 1: 2, -1: 1, -2: h'…', -3: h'…' } },
  "validityInfo": {
    "signed":     0("2026-10-08T08:00:00Z"),
    "validFrom":  0("2026-10-08T08:00:00Z"),
    "validUntil": 0("2028-10-07T08:00:00Z")
  },
  "status": {
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  }
}
```

Yukarıdaki `age_over_18` öğesinin özeti `1192084209` altında saklanan değerdir. `deviceKey` bir COSE_Key'dir (`1: 2` EC2 anahtar, `-1: 1` P-256 eğrisi, `-2`/`-3` koordinatlar); SD-JWT'deki `cnf.jwk` ile aynı açık anahtar. `validityInfo.signed`, SD-JWT'deki `iat`'ın yerini tutar: Tamga'nın zamana bağlı güven denetimleri kurumun o anda listede ve yetkili olup olmadığını sorar. `status`, SD-JWT kopyasıyla aynı Token Status List sırasını gösterir; kimlik belgesini iptal etmek tek bitle iki gösterimi birden iptal eder.

## Belge sahibi, mdoc'un verildiği cihaz olduğunu nasıl kanıtlar?

Seçici paylaşım işin kolay kısmı: cüzdan `IssuerSigned`'ı, `nameSpaces`'te yalnız onaylanan öğelerle ve dokunulmamış `issuerAuth` ile gönderir. Gizli öğeler MSO'da özet olarak kalır.

Cihaz bağlama **cihaz kimlik doğrulamasından** (device authentication) gelir. Cüzdan şunu kurar:

```cbor-diag title="Cihaz anahtarının imzaladığı"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: Tamga profilinde boş /
] >>)
```

ve bunu cihaz anahtarıyla, **ayrık yüklü** (detached payload) bir `COSE_Sign1` olarak imzalar: yük alanı `nil`dir, doğrulayıcı baytları oturumu kendi gördüğü hâliyle yeniden kurar. İmza bir `DeviceResponse`'un `deviceSigned.deviceAuth.deviceSignature` alanında gider (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga cihazın imzaladığı veri öğesi kullanmaz; `DeviceNameSpaces` hep boş haritadır.

Yani her şey **SessionTranscript**'e bağlı: içine ne girerse yanıt ona bağlanır.

## Oturum dökümüne ne girer?

| Kanal | SessionTranscript | Yanıtı neye bağlar |
|---|---|---|
| Yüz yüze (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | iki geçici oturum anahtarına |
| QR ya da bağlantıyla OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | doğrulayıcı kimliği, nonce, şifreleme anahtarı, yanıt adresi |
| DC API ile OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | tarayıcı kaynağı (origin), nonce, şifreleme anahtarı |

İki çevrim içi biçim OpenID4VP 1.0 Final'in Ek B.2.6'sından gelir. `client_id` tam `x509_hash:…` değeridir; `jwkThumbprint`, yanıtın şifrelendiği anahtarın RFC 7638 parmak izidir. Bir istekten yakalanan DeviceResponse başka bir istekte geçmez: doğrulayıcı farklı bir döküm kurar ve cihaz imzası tutmaz. Tamga doğrulayıcısı bunu A6 adımında reddeder.

> **Not:** ADR-0013 çevrim içi dökümü hâlâ belirlenimci bir demo özeti ve "pilotta" ISO 18013-7 el sıkışması olarak anlatıyor. Güncel `@tamga-network/mdoc` yukarıdaki OpenID4VP 1.0 Final el sıkışmalarını uyguluyor; OpenID4VP profili de bunları şart koşuyor.

## QR ve Bluetooth ile yüz yüze bağlantı nasıl kurulur?

![Yüz yüze mdoc gösterimi dört adımda](/blog/iso-mdoc-deep-dive/tr/fig-engagement.png)

1. **Cihaz tanıtımı (device engagement).** Cüzdan geçici bir P-256 anahtarı (`EDeviceKey`) ve rastgele bir BLE hizmet UUID'si üretir; `mdoc:` ve ardından `DeviceEngagement` yapısının base64url hâlini taşıyan bir QR kod gösterir. İçinde kişisel veri yoktur.
2. **Oturum kurulumu.** Okuyucu kodu tarar, kendi geçici anahtarını (`EReaderKey`) üretir ve oturum anahtarlarını türetir. İki taraf ECDH, ardından tuz olarak `SHA-256(SessionTranscriptBytes)` ve bilgi dizgileri `SKReader` ile `SKDevice` kullanan HKDF-SHA-256 çalıştırır. Okuyucu `SessionEstablishment {eReaderKey, data}` gönderir; `data`, SKReader ile şifrelenmiş `DeviceRequest`'tir.
3. **İstek ve onay.** Cüzdan isteği çözer, istenen öğeleri gösterir; kişi telefon kilidiyle onaylar ya da reddeder.
4. **Yanıt.** Cüzdan `DeviceResponse`'u SKDevice ile şifrelenmiş bir `SessionData` iletisinde gönderir ve oturumu `20` durum koduyla kapatır.

```cbor-diag title="Sadeleştirilmiş örnek: QR koddaki DeviceEngagement"
{
  0: "1.0",
  1: [1, 24(<< COSE_Key olarak EDeviceKey >>)],  / şifre takımı 1 /
  2: [[2, 1, {                                    / BLE, sürüm 1 /
        0: true,                                  / peripheral server modu /
        1: false,                                 / central client modu /
        10: h'…16 baytlık hizmet UUID'si…'
      }]]
}
```

Oturum iletileri AES-256-GCM kullanır; 12 baytlık IV, 8 baytlık bir kimlikten (okuyucu için hepsi sıfır, cihaz için `…01`) ve 1'den başlayan 4 baytlık ileti sayacından oluşur. BLE'de telefon GATT sunucusudur; her ileti parçalara bölünür, devamı varsa parçanın ilk baytı `0x01`, son parçada `0x00`'dır.

Bugünkü durum: protokol çekirdeği (tanıtım, oturum şifrelemesi, BLE parçalama) `@tamga-network/mdoc` içinde yazıldı ve test edildi; BLE radyosunu cüzdan uygulaması sağlar. Cihaz testleri sürüyor. NFC kullanılmaz; bağlantı her zaman QR koddan başlar. Okuyucu kimlik doğrulaması henüz yok; bu yüzden cüzdan kişiye okuyucunun doğrulanmadığını söyler. OpenID4VP üzerinden çevrim içi mdoc gösterimi, SD-JWT VC ile aynı istek akışını kullanır.

## Doğrulayıcı bir mdoc'u nasıl denetler?

1. `DeviceResponse`'u ayrıştırın, `docType`'ın istenenle aynı olduğunu doğrulayın.
2. `issuerAuth`'u doğrulayın: yalnız ES256, `x5chain` imzalı güven listesindeki bir kuruma varmalı; SD-JWT belgeleriyle aynı çapa.
3. Gösterilen her öğe için etiket 24 baytlarının özetini alın, `valueDigests[ad alanı][digestID]` ile karşılaştırın.
4. `validityInfo`'yu şimdiki zamana göre denetleyin.
5. Bu isteğin ya da oturumun SessionTranscript'ini kendiniz kurun, `DeviceAuthenticationBytes`'ı yeniden oluşturun, `deviceSignature`'ı `deviceKey` ile doğrulayın.
6. Durum bitini okuyun; sonra SD-JWT VC'deki güven, iptal ve politika katmanlarını aynen çalıştırın.

Sonuç yine üç değerlidir: kabul, ret ya da altyapıya ulaşılamadığında "şu an doğrulanamıyor". Sonuç nesnesinde ham CBOR ya da gösterilmemiş öğe bulunmaz.

Bir OpenID4VP isteğinde mdoc DCQL ile seçilir ([OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive)): `format: "mso_mdoc"`, `meta.doctype_value` ve `[ad alanı, öğe]` biçiminde alan yolları:

```json title="mdoc üzerinden yaş kontrolü için DCQL sorgusu"
{
  "credentials": [{
    "id": "identity",
    "format": "mso_mdoc",
    "meta": { "doctype_value": "urn:tamga:id:IdentityAttestation:1" },
    "claims": [{ "path": ["tamga.id.1", "age_over_18"], "values": [true] }]
  }]
}
```

mdoc kimlik belgesi, Tamga'nın sıfır bilgili yaş ispatının da girdisidir; ispat sıradan ES256 imzalı mdoc'lar üzerinde çalışır ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)). Bu denetim Tamga Verify'da canlıda; işleyişi [Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga) yazısında.

## Sık sorulan sorular

### mdoc ile mDL aynı şey mi?

Hayır. mDL (mobil sürücü belgesi), mdoc biçimini kullanan belge türlerinden biridir. Tamga kimlik belgesi kendi docType'ı ve ad alanı olan bir mdoc'tur; Tamga'nın "sürücü belgesi bilgisi" belgesi ise yalnız SD-JWT VC'dir, mDL değildir.

### digestID'ler neden sıralı değil de rastgele?

Sıralı kimliklerle doğrulayıcı belgede kaç öğe olduğunu ve hangi sıraların saklandığını çıkarabilirdi. 31 bitlik rastgele kimlikler sıra taşımaz.

### Tamga mdoc'unu başka bir ISO 18013-5 kütüphanesiyle doğrulayabilir miyim?

Yapılar standart ISO 18013-5 ve OpenID4VP 1.0'dır. İki noktaya bakın: kütüphane etiket 24 baytlarının özetini yeniden kodlamadan, geldiği gibi almalı ve çevrim içi gösterim için OpenID4VP el sıkışmasını desteklemeli.

## Kaynaklar

- [ISO/IEC 18013-5:2021, Mobile driving licence (mDL) application, ISO](https://www.iso.org/standard/69084.html)
- [OpenID for Verifiable Presentations 1.0, Final, 9 Temmuz 2025 (Ek B: ISO mdoc)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 8949: Concise Binary Object Representation (CBOR), IETF](https://www.rfc-editor.org/rfc/rfc8949)
- [RFC 9052: CBOR Object Signing and Encryption (COSE), IETF](https://www.rfc-editor.org/rfc/rfc9052)
- [ADR-0013: Kimlik belgesi için mdoc, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0013-mdoc-dual-format-for-identity)
- [`@tamga-network/mdoc`, Tamga Network belgeleri](https://docs.tamga.network/tr/packages/mdoc)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/openid4vp)
- [Gösterim, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/presentation)

---
title: "ISO mdoc ayrıntılı: CBOR, COSE, MSO ve bağlantı kurma"
slug: iso-mdoc-deep-dive
description: Bir ISO/IEC 18013-5 mdoc'un nasıl kurulduğunu ve doğrulandığını anlatıyoruz; CBOR ve COSE, MSO ve özetler, cihaz imzası, oturum dökümü, QR ve Bluetooth.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Kaynak: ADR-0013 v1.0.0 (2026-09-26 kabul; MD1–MD5; docType/ad alanı; CBOR belirlenimcilik notu; Safari/Chrome DC API bilgisi ADR'deki kayıttan); SPEC-PROTO-0001 PR16; SPEC-PROTO-0002 §4.5, §5.2, PV11; @tamga-network/mdoc README + kaynak (mdoc.ts, proximity.ts); kimlik tür tanımı urn:tamga:id:IdentityAttestation:1 (11 öğe, sd always, portre yok); concepts/presentation (BLE yazıldı, cihaz testi sürüyor). Örnek mdoc bu yazı için @tamga-network/mdoc ile sahte değerlerle üretildi. ISO/IEC 18013-5:2021 katalog kaydı; OpenID4VP 1.0 Final Ek B.2.6; HAIP 1.0 Final §6. -->

**mdoc**, mobil sürücü belgesi standardı ISO/IEC 18013-5:2021'in tanımladığı mobil belge biçimidir ve COSE ile imzalanmış CBOR verisinden oluşur. Kurum, her veri öğesinin özetini ve belge sahibinin cihaz anahtarını listeleyen bir **Mobile Security Object (MSO)** imzalar. Belge sahibi okuyucuya yalnız istenen öğeleri gönderir. Bir **oturum dökümü** (session transcript) üzerine atılan cihaz imzası da yanıtı yalnız o oturuma bağlar. Tamga kimlik belgesini SD-JWT VC'nin yanında mdoc olarak da veriyor.

> **Not:** Örnekleri bu yazı için açık kaynak `@tamga-network/mdoc` paketiyle ve sahte değerlerle ürettik. Özetler kısaltıldı, sertifika zinciri de gösterilmiyor.

## Tamga kimlik belgesini neden iki biçimde veriyor?

26 Eylül 2026'da kabul edilen [ADR-0013](https://docs.tamga.network/tr/adr/0013-mdoc-dual-format-for-identity) bunun üç gerekçesini sayıyor. AB'nin dijital kimlik cüzdanı mimarisi, kişi kimlik verisi için mdoc'u zorunlu tutuyor ve SD-JWT VC'yi isteğe bağlı bırakıyor. ISO 18013-5'e göre yapılan yüz yüze gösterim de mdoc ile çalışıyor. Ayrıca karar alındığı sırada Safari'nin Digital Credentials API'si yalnız mdoc kabul ediyordu, Chrome ise iki biçimi de kabul ediyordu.

Bu karardan şu kurallar çıkıyor:

- **SD-JWT VC birincil biçim olarak kalır.** mdoc aynı belgenin ikinci bir gösterimidir ve yalnız kimlik belgesi (`urn:tamga:id:IdentityAttestation:1`) için kullanılır. Öğrenci belgesi, diploma ve bilet yalnız SD-JWT VC olarak verilir.
- **Alanlar, geçerlilik ve anahtar aynıdır.** mdoc'taki `deviceKey`, SD-JWT'deki `cnf.jwk` ile aynı anahtardır ve ikinci bir cihaz anahtarı üretilmez.
- **Kurum imzaları ayrıdır.** SD-JWT için JOSE/ES256, mdoc için `COSE_Sign1`/ES256 kullanılır. İki imzanın sertifika zinciri de güven listesinde aynı kayda ulaşır.
- **Belge bir kez verilir ve tek bir durum biti taşır.** Belge yanıtındaki her nesne SD-JWT VC'yi ve mdoc'u (base64url `IssuerSigned`) birlikte taşır. İkisi de aynı kanıt anahtarına ve durum listesinde aynı sıraya bağlıdır. Cüzdan, mdoc'u SD-JWT kopyasıyla karşılaştırmadan saklamaz. Kurum sertifikasının ve alanların aynı olduğuna, `deviceKey` değerinin de `cnf` ile eşleştiğine bakar.

![SD-JWT VC ve mdoc, alan alan karşılaştırma](/blog/iso-mdoc-deep-dive/tr/fig-formats.png)

## mdoc nasıl kodlanır?

mdoc'taki her şey **CBOR** (RFC 8949) ile kodlanır. CBOR, JSON ile aynı veri modelini kullanan ve buna bayt dizgileri, etiketler ve tamsayı anahtarlar ekleyen ikili bir kodlamadır. Burada iki etiket önemli. Etiket 24, "bu bayt dizgisinin içinde de kodlanmış CBOR var" anlamına gelir. Bu etiket sayesinde imzacı, yapıyı yeniden kodlamak yerine tam o baytların özetini alabilir. SD-JWT de aynı sorunu disclosure dizgileriyle çözüyor ([SD-JWT VC ayrıntılı](/blog/sd-jwt-vc-deep-dive)). Etiket 0 ise RFC 3339 biçimindeki bir tarih-saat dizgisini işaretler.

İmzalar, JOSE'nin CBOR'daki karşılığı olan **COSE** (RFC 9052) ile atılır. `COSE_Sign1` dört elemanlı bir dizidir ve korumalı başlığı, korumasız başlığı, yükü ve imzayı taşır. Tamga'nın kurum imzasında korumalı başlıkta `{1: -7}` (ES256) yer alır, sertifika zinciri de `x5chain` alanında durur.

ADR-0013 birlikte çalışabilirlikle ilgili bir notu da kayda geçiriyor. Tamga belirlenimci CBOR'u RFC 8949 §4.2.1'e göre, yani anahtarları bayt sırasına dizerek kodluyor. ISO 18013-5:2021 ise RFC 7049'daki eski "önce uzunluk" sıralamasına atıf yapıyor. Özetler, belge verildiği hâliyle etiket 24 baytları üzerinden alındığı için doğrulama bu sıralama kuralına bağlı değil. Yine de tam uyum için bu madde açık bir iş olarak izleniyor.

## Veri öğesi nedir, özeti nasıl alınır?

Her alan bir `IssuerSignedItem` olarak tutulur. Bu, `digestID`, 16 rastgele bayt, öğenin adı ve değerinden oluşan bir haritadır. Harita kodlanır ve etiket 24'e sarılır. Öğenin özeti de bu etiketli baytların SHA-256 değeridir.

```cbor-diag title="Sadeleştirilmiş örnek: bir IssuerSignedItem (@tamga-network/mdoc ile üretildi)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

Etiketli baytların SHA-256'sı: c2418dcd28b95cc1…
```

Rastgele değer, SD-JWT'deki tuzun (salt) gördüğü işi görür. O olmasaydı `age_over_18: true` değerinin özeti her belgede aynı olurdu ve kolayca tahmin edilebilirdi. `digestID` ise öğeyi MSO'daki kaydına bağlar. Tamga digestID'leri 0, 1, 2 diye saymak yerine 31 bitlik bir aralıktan rastgele seçiyor. Böylece belge sahibinin gösterdiği kimlikler, belgede kaç öğe olduğu ya da öğelerin nerede durduğu hakkında hiçbir şey söylemiyor.

Öğeler **ad alanlarında** (namespace) bulunur. Tamga'nın kimlik ad alanı `tamga.id.1` ve buradaki öğe adları SD-JWT'deki alan adlarıyla birebir aynı: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` ve `age_over_18`. Bunların hepsi seçici olarak paylaşılabilir. Portre öğesi ise yok.

## Mobile Security Object'te ne var?

MSO, belgenin kurum tarafından imzalanan parçasıdır. Kodlanır, etiket 24'e sarılır ve kurumun `COSE_Sign1` imzasının (`issuerAuth`) yükü olarak kullanılır:

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
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/c7d41e" }
  }
}
```

Yukarıdaki `age_over_18` öğesinin özeti, `1192084209` anahtarının altında saklanan değerdir. `deviceKey` bir COSE_Key'dir. Burada `1: 2` anahtarın EC2 türünde olduğunu, `-1: 1` P-256 eğrisini, `-2` ve `-3` de koordinatları gösterir. Bu, SD-JWT'deki `cnf.jwk` ile aynı açık anahtardır. `validityInfo.signed`, SD-JWT'deki `iat` alanının yerini tutar. Tamga'nın zamana bağlı güven denetimleri de kurumun tam o anda listede ve yetkili olup olmadığına bakar. `status` alanı SD-JWT kopyasıyla aynı sırayı kullanır, ama aynı Token Status List'in CWT biçimini (`application/statuslist+cwt`) gösterir ve bu biçim kendi opak adresinde durur. Bu sayede mdoc okuyucusunun bir JWT ayrıştırıcısı taşımasına gerek kalmaz. İki biçim de aynı bitleri taşır ve aynı yayında imzalanır, bu yüzden kimlik belgesi iptal edildiğinde iki gösterim birden iptal edilmiş olur ([ADR-0048](https://docs.tamga.network/tr/adr/0048-identity-no-suspension-mdoc-cwt-status)).

## Belge sahibi, mdoc'un verildiği cihaz olduğunu nasıl kanıtlar?

Seçici paylaşım işin kolay kısmı. Cüzdan `IssuerSigned` yapısını, `nameSpaces` içinde yalnız onaylanan öğelerle ve hiç dokunulmamış `issuerAuth` ile gönderir. Gösterilmeyen öğeler MSO'da yalnız özet olarak kalır.

Belgenin cihaza bağlı olduğunu ise **cihaz kimlik doğrulaması** (device authentication) gösterir. Cüzdan önce şu yapıyı kurar:

```cbor-diag title="Cihaz anahtarının imzaladığı"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: Tamga profilinde boş /
] >>)
```

Ardından bunu cihaz anahtarıyla, **ayrık yüklü** (detached payload) bir `COSE_Sign1` olarak imzalar. Bu imzada yük alanı `nil` olur ve doğrulayıcı baytları, oturumu kendi gördüğü hâliyle yeniden kurar. İmza, bir `DeviceResponse` içindeki `deviceSigned.deviceAuth.deviceSignature` alanında gönderilir (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga cihazın imzaladığı veri öğelerini kullanmadığı için `DeviceNameSpaces` her zaman boş bir haritadır.

Bu yüzden her şey **SessionTranscript** yapısına bağlı. Yanıt, bu yapıya ne girdiyse ona bağlanmış olur.

## Oturum dökümüne ne girer?

| Kanal | SessionTranscript | Yanıtı neye bağlar |
|---|---|---|
| Yüz yüze (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | iki geçici oturum anahtarına |
| QR ya da bağlantıyla OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | doğrulayıcı kimliği, nonce, şifreleme anahtarı, yanıt adresi |
| DC API ile OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | tarayıcı kaynağı (origin), nonce, şifreleme anahtarı |

İki çevrim içi biçim, OpenID4VP 1.0 Final'in Ek B.2.6 bölümünden geliyor. `client_id` tam `x509_hash:…` değeridir, `jwkThumbprint` de yanıtın şifrelendiği anahtarın RFC 7638'e göre hesaplanmış parmak izidir. Bir istekten ele geçirilen bir DeviceResponse başka bir istekte işe yaramaz, çünkü doğrulayıcı farklı bir döküm kurar ve cihaz imzası artık uyuşmaz. Tamga doğrulayıcısı böyle bir yanıtı A6 adımında reddeder.

> **Not:** ADR-0013, çevrim içi dökümü hâlâ belirlenimci bir demo özeti ve "pilot için" ISO 18013-7 el sıkışması olarak anlatıyor. Güncel `@tamga-network/mdoc` paketi ise yukarıdaki OpenID4VP 1.0 Final el sıkışmalarını uyguluyor ve OpenID4VP profilimiz de bunları şart koşuyor.

## QR ve Bluetooth ile yüz yüze bağlantı nasıl kurulur?

![Yüz yüze mdoc gösterimi dört adımda](/blog/iso-mdoc-deep-dive/tr/fig-engagement.png)

1. **Cihaz tanıtımı (device engagement).** Cüzdan geçici bir P-256 anahtarı (`EDeviceKey`) ve rastgele bir BLE hizmet UUID'si üretir. Ardından `mdoc:` ile başlayan ve `DeviceEngagement` yapısının base64url hâlini taşıyan bir QR kod gösterir. Bu kodda kişisel veri bulunmaz.
2. **Oturum kurulumu.** Okuyucu kodu tarar, kendi geçici anahtarını (`EReaderKey`) üretir ve oturum anahtarlarını türetir. Bunun için iki taraf önce ECDH, sonra HKDF-SHA-256 çalıştırır. HKDF'de tuz olarak `SHA-256(SessionTranscriptBytes)`, bilgi dizgisi olarak da `SKReader` ve `SKDevice` kullanılır. Okuyucu `SessionEstablishment {eReaderKey, data}` iletisini gönderir. Buradaki `data`, SKReader ile şifrelenmiş `DeviceRequest` yapısıdır.
3. **İstek ve onay.** Cüzdan isteği çözer ve istenen öğeleri kişiye gösterir. Kişi telefonun kilidiyle onaylar ya da isteği reddeder.
4. **Yanıt.** Cüzdan `DeviceResponse` yapısını SKDevice ile şifrelenmiş bir `SessionData` iletisinde gönderir ve oturumu `20` durum koduyla kapatır.

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

Oturum iletileri AES-256-GCM ile şifrelenir. 12 baytlık IV, 8 baytlık bir kimlik ile 1'den başlayan 4 baytlık bir ileti sayacından oluşur. Kimlik okuyucu için tamamen sıfırdır, cihaz için `…01` ile biter. BLE'de telefon GATT sunucusu rolünü üstlenir. Her ileti parçalara bölünür ve ardından başka parça geliyorsa parçanın ilk baytı `0x01`, son parçada ise `0x00` olur.

Bugünkü duruma gelince, protokolün çekirdeği (cihaz tanıtımı, oturum şifrelemesi, BLE parçalama) `@tamga-network/mdoc` içinde yazıldı ve test edildi. BLE radyosunu cüzdan uygulaması sağlıyor. Gerçek cihazlarla yapılacak testler ise henüz tamamlanmadı. NFC kullanılmıyor ve bağlantı her zaman QR koddan başlıyor. Paketlerin 0.6.0 sürümünden beri okuyucu isteğini imzalıyor (okuyucu kimlik doğrulaması) ve cüzdan bu imzayı imzalı güven listesindeki çapalara karşı denetliyor. 0.7.0 sürümünden beri de kayıt sertifikası olmayan bir istek, çevrim içinde olduğu gibi yüz yüze gösterimde de reddediliyor. OpenID4VP üzerinden yapılan çevrim içi mdoc gösterimi, SD-JWT VC ile aynı istek akışını kullanıyor.

## Doğrulayıcı bir mdoc'u nasıl denetler?

1. `DeviceResponse` yapısını ayrıştırın ve `docType` değerinin istediğiniz türle aynı olduğunu doğrulayın.
2. `issuerAuth` imzasını doğrulayın. Yalnız ES256 kabul edilir ve `x5chain`, imzalı güven listesindeki bir kuruma ulaşmalıdır. Burada SD-JWT belgelerinde kullanılan çapanın aynısı kullanılır.
3. Gösterilen her öğe için etiket 24 baytlarının özetini alın ve `valueDigests[ad alanı][digestID]` değeriyle karşılaştırın.
4. `validityInfo` alanını şimdiki zamana göre denetleyin.
5. Bu isteğin ya da oturumun SessionTranscript yapısını kendiniz kurun, `DeviceAuthenticationBytes` değerini yeniden oluşturun ve `deviceSignature` imzasını `deviceKey` ile doğrulayın.
6. Durum bitini okuyun ve ardından SD-JWT VC'de kullanılan güven, iptal ve politika katmanlarını aynen çalıştırın.

Sonuç burada da üç değerden biridir. Belge kabul edilir, reddedilir ya da altyapıya ulaşılamadığında "şu an doğrulanamadı" sonucu verilir. Sonuç nesnesinde hiçbir zaman ham CBOR ya da gösterilmemiş öğe bulunmaz.

Bir OpenID4VP isteğinde mdoc, DCQL ile seçilir ([OpenID4VP ve DCQL ayrıntılı](/blog/openid4vp-dcql-deep-dive)). Bunun için `format: "mso_mdoc"`, `meta.doctype_value` ve `[ad alanı, öğe]` biçimindeki alan yolları kullanılır:

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

mdoc biçimindeki kimlik belgesi, Tamga'nın sıfır bilgili yaş ispatının da girdisidir ve ispat sıradan ES256 imzalı mdoc'lar üzerinde çalışır ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)). Bu denetim Tamga Verify'da canlıda çalışıyor. Nasıl işlediğini [Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga) yazısında anlattık.

## Sık sorulan sorular

### mdoc ile mDL aynı şey mi?

Hayır. mDL (mobil sürücü belgesi), mdoc biçimini kullanan belge türlerinden yalnız biridir. Tamga'nın kimlik belgesi, kendi docType'ı ve ad alanı olan bir mdoc'tur. Tamga'nın "sürücü belgesi bilgisi" belgesi ise yalnız SD-JWT VC olarak veriliyor ve bir mDL değil.

### digestID'ler neden sıralı değil de rastgele?

Kimlikler sıralı olsaydı doğrulayıcı, belgede kaç öğe bulunduğunu ve hangi sıraların gizlendiğini çıkarabilirdi. 31 bitlik rastgele kimlikler ise hiçbir sıra bilgisi taşımaz.

### Tamga mdoc'unu başka bir ISO 18013-5 kütüphanesiyle doğrulayabilir miyim?

Yapılar standart ISO 18013-5 ve OpenID4VP 1.0 yapılarıdır. Yine de iki noktaya dikkat etmeniz gerekir. Kütüphane etiket 24 baytlarının özetini, onları yeniden kodlamadan, geldikleri gibi almalı. Çevrim içi gösterim için de OpenID4VP el sıkışmasını desteklemeli.

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

---
title: "ISO mdoc-a dərindən baxış: CBOR, COSE, MSO və əlaqə qurma"
slug: iso-mdoc-deep-dive
description: "ISO/IEC 18013-5 mdoc-un necə qurulduğunu və yoxlandığını izah edirik: CBOR və COSE, MSO və dəyər heşləri, cihaz autentifikasiyası, sessiya transkripti, QR və BLE."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Sources: ADR-0013 v1.0.0 (accepted 2026-09-26; MD1–MD5; docType/namespace; CBOR determinism note; Safari/Chrome DC API facts as recorded in the ADR); SPEC-PROTO-0001 PR16 (mdoc in the same credential response, same proof key, same status bit, wallet cross-check); SPEC-PROTO-0002 §4.5, §5.2, PV11 (DCQL mso_mdoc, DeviceResponse, OpenID4VPHandover); @tamga-network/mdoc README + src (mdoc.ts: tag-24 items, random 31-bit digestIDs, 16-byte random, MSO fields, status in MSO, empty DeviceNameSpaces, OpenID4VPHandover + OpenID4VPDCAPIHandover; proximity.ts: DeviceEngagement QR "mdoc:", cipher suite 1, BLE peripheral server mode, SessionTranscript [DE, EReaderKey, null], HKDF SKReader/SKDevice, AES-256-GCM IV, status 20, BLE chunk prefix); identity type metadata urn:tamga:id:IdentityAttestation:1 (11 elements, sd always, no portrait); concepts/presentation (BLE implemented, device testing pending). Example mdoc generated with @tamga-network/mdoc for this post (fake values). ISO/IEC 18013-5:2021 public catalogue entry; OpenID4VP 1.0 Final Annex B.2.6; HAIP 1.0 Final §6. -->

**mdoc** mobil sürücülük vəsiqəsi standartı olan ISO/IEC 18013-5:2021-in müəyyən etdiyi mobil sənəd formatıdır və COSE ilə imzalanmış CBOR məlumatından ibarətdir. Qurum hər məlumat elementinin heşini və sənəd sahibinin cihaz açarını sadalayan **Mobile Security Object (MSO)** imzalayır. Sənəd sahibi oxuyucuya yalnız istənilən elementləri göndərir. **Sessiya transkripti** (session transcript) üzərində qoyulan cihaz imzası isə cavabı yalnız həmin sessiyaya bağlayır. Tamga şəxsiyyət sənədini SD-JWT VC ilə yanaşı mdoc kimi də verir.

> **Qeyd:** Nümunələri bu yazı üçün açıq mənbəli `@tamga-network/mdoc` paketi ilə və saxta dəyərlərlə hazırlamışıq. Heşlər qısaldılıb, sertifikat zənciri isə göstərilmir.

## Tamga şəxsiyyət sənədini niyə iki formatda verir?

26 sentyabr 2026-cı ildə qəbul edilmiş [ADR-0013](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity) bunun üç səbəbini sadalayır. Aİ-nin rəqəmsal şəxsiyyət cüzdanı arxitekturası şəxsi identifikasiya məlumatları üçün mdoc-u məcburi sayır, SD-JWT VC-ni isə istəyə bağlı saxlayır. ISO 18013-5-ə əsasən aparılan əyani təqdimat da mdoc ilə işləyir. Bundan əlavə, qərar qəbul edilərkən Safari-nin Digital Credentials API-si yalnız mdoc qəbul edirdi, Chrome isə hər iki formatı qəbul edirdi.

Bu qərardan aşağıdakı qaydalar irəli gəlir:

- **SD-JWT VC əsas format olaraq qalır.** mdoc eyni sənədin ikinci təqdimatıdır və yalnız şəxsiyyət sənədi (`urn:tamga:id:IdentityAttestation:1`) üçün istifadə olunur. Tələbə sənədi, diplom və bilet yalnız SD-JWT VC kimi verilir.
- **Sahələr, etibarlılıq müddəti və açar eynidir.** mdoc-dakı `deviceKey` SD-JWT-dəki `cnf.jwk` ilə eyni açardır və ikinci cihaz açarı yaradılmır.
- **Qurum imzaları ayrıdır.** SD-JWT üçün JOSE/ES256, mdoc üçün `COSE_Sign1`/ES256 istifadə olunur. Hər iki imzanın sertifikat zənciri etibar siyahısında eyni qeydə gedib çıxır.
- **Sənəd bir dəfə verilir və bir status biti daşıyır.** Sənəd cavabındakı hər obyekt SD-JWT VC-ni və mdoc-u (base64url `IssuerSigned`) birlikdə daşıyır. Hər ikisi eyni sübut açarına və status siyahısında eyni indeksə bağlıdır. Cüzdan mdoc-u SD-JWT nüsxəsi ilə tutuşdurmadan saxlamır. Qurum sertifikatının və sahələrin eyni olduğunu, `deviceKey` dəyərinin də `cnf` ilə üst-üstə düşdüyünü yoxlayır.

![SD-JWT VC və mdoc-un sahə-sahə müqayisəsi](/blog/iso-mdoc-deep-dive/en/fig-formats.png)

## mdoc necə kodlaşdırılır?

mdoc-dakı hər şey **CBOR** (RFC 8949) ilə kodlaşdırılır. CBOR JSON ilə eyni məlumat modelindən istifadə edən və buna bayt sətirləri, teqlər və tam ədəd açarlar əlavə edən ikili kodlaşdırmadır. Burada iki teq vacibdir. 24 nömrəli teq "bu bayt sətrinin içində də kodlaşdırılmış CBOR var" deməkdir. Bu teq sayəsində imzalayan strukturu yenidən kodlaşdırmaq əvəzinə məhz həmin baytların heşini götürə bilir. SD-JWT də eyni problemi disclosure sətirləri ilə həll edir ([SD-JWT VC-yə dərindən baxış](/blog/sd-jwt-vc-deep-dive)). 0 nömrəli teq isə RFC 3339 formatındakı tarix-vaxt sətrini işarələyir.

İmzalar JOSE-nin CBOR-dakı qarşılığı olan **COSE** (RFC 9052) ilə qoyulur. `COSE_Sign1` dörd elementli massivdir və qorunan başlığı, qorunmayan başlığı, faydalı yükü və imzanı daşıyır. Tamga-nın qurum imzasında qorunan başlıqda `{1: -7}` (ES256) olur, sertifikat zənciri isə `x5chain` sahəsində yerləşir.

ADR-0013 qarşılıqlı uyğunluqla bağlı bir qeydi də qeydə alır. Tamga deterministik CBOR-u RFC 8949 §4.2.1-ə əsasən, yəni açarları bayt sırası ilə düzərək kodlaşdırır. ISO 18013-5:2021 isə RFC 7049-dakı köhnə "əvvəlcə uzunluq" sıralamasına istinad edir. Heşlər sənəd verildiyi kimi 24 nömrəli teqin baytları üzərindən götürüldüyü üçün yoxlama bu sıralama qaydasından asılı deyil. Yenə də tam uyğunluq üçün bu məsələ açıq iş kimi izlənilir.

## Məlumat elementi nədir və heşi necə götürülür?

Hər sahə `IssuerSignedItem` kimi saxlanılır. Bu, `digestID`, 16 təsadüfi bayt, elementin adı və dəyərindən ibarət xəritədir. Xəritə kodlaşdırılır və 24 nömrəli teqə bükülür. Elementin heşi də bu teqli baytların SHA-256 dəyəridir.

```cbor-diag title="Simplified example: one IssuerSignedItem (generated with @tamga-network/mdoc)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

SHA-256 of the tagged bytes: c2418dcd28b95cc1…
```

Təsadüfi dəyər SD-JWT-dəki duzun (salt) gördüyü işi görür. O olmasaydı, `age_over_18: true` dəyərinin heşi hər sənəddə eyni olardı və asanlıqla təxmin edilə bilərdi. `digestID` isə elementi MSO-dakı qeydinə bağlayır. Tamga digestID-ləri 0, 1, 2 deyə saymaq əvəzinə 31 bitlik aralıqdan təsadüfi seçir. Beləliklə sənəd sahibinin göstərdiyi identifikatorlar sənəddə neçə element olduğu və ya elementlərin harada durduğu barədə heç nə demir.

Elementlər **ad sahələrində** (namespace) yerləşir. Tamga-nın şəxsiyyət ad sahəsi `tamga.id.1`-dir və buradakı element adları SD-JWT-dəki sahə adları ilə tam eynidir: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` və `age_over_18`. Onların hamısı seçici şəkildə açıqlana bilər. Portret elementi isə yoxdur.

## Mobile Security Object nələrdən ibarətdir?

MSO sənədin qurum tərəfindən imzalanan hissəsidir. O, kodlaşdırılır, 24 nömrəli teqə bükülür və qurumun `COSE_Sign1` imzasının (`issuerAuth`) faydalı yükü kimi istifadə olunur:

```cbor-diag title="Simplified example: MobileSecurityObject (generated with @tamga-network/mdoc)"
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

Yuxarıdakı `age_over_18` elementinin heşi `1192084209` açarı altında saxlanılan dəyərdir. `deviceKey` COSE_Key-dir. Burada `1: 2` açarın EC2 tipində olduğunu, `-1: 1` P-256 əyrisini, `-2` və `-3` isə koordinatları göstərir. Bu, SD-JWT-dəki `cnf.jwk` ilə eyni açıq açardır. `validityInfo.signed` SD-JWT-dəki `iat` sahəsinin rolunu oynayır. Tamga-nın zamana bağlı etibar yoxlamaları da qurumun məhz həmin anda siyahıda olub-olmadığına və səlahiyyətli olub-olmadığına baxır. `status` sahəsi SD-JWT nüsxəsi ilə eyni indeksdən istifadə edir, amma eyni Token Status List-in CWT formasına (`application/statuslist+cwt`) işarə edir və bu forma öz qeyri-şəffaf ünvanında yerləşir. Bunun sayəsində mdoc oxuyucusunun JWT təhlilçisi daşımasına ehtiyac qalmır. Hər iki forma eyni bitləri daşıyır və eyni dərcdə imzalanır, ona görə şəxsiyyət sənədi ləğv ediləndə hər iki təqdimat birlikdə ləğv olunur ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)).

## Sənəd sahibi mdoc-un məhz ona verildiyi cihaz olduğunu necə sübut edir?

Seçici açıqlama işin asan hissəsidir. Cüzdan `IssuerSigned` strukturunu `nameSpaces` daxilində yalnız təsdiqlənmiş elementlərlə və heç toxunulmamış `issuerAuth` ilə göndərir. Göstərilməyən elementlər MSO-da yalnız heş kimi qalır.

Sənədin cihaza bağlı olduğunu isə **cihaz autentifikasiyası** (device authentication) göstərir. Cüzdan əvvəlcə bu strukturu qurur:

```cbor-diag title="What the device key signs"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: empty in Tamga's profile /
] >>)
```

Sonra onu cihaz açarı ilə **ayrılmış faydalı yüklü** (detached payload) `COSE_Sign1` kimi imzalayır. Bu imzada faydalı yük sahəsi `nil` olur və yoxlayan tərəf baytları sessiyanı özünün gördüyü kimi yenidən qurur. İmza `DeviceResponse` daxilindəki `deviceSigned.deviceAuth.deviceSignature` sahəsində göndərilir (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga cihazın imzaladığı məlumat elementlərindən istifadə etmədiyi üçün `DeviceNameSpaces` həmişə boş xəritədir.

Ona görə hər şey **SessionTranscript** strukturundan asılıdır. Cavab bu struktura nə daxil olubsa, ona bağlanmış olur.

## Sessiya transkriptinə nə daxildir?

| Kanal | SessionTranscript | Cavabı nəyə bağlayır |
|---|---|---|
| Əyani (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | hər iki müvəqqəti sessiya açarına |
| QR və ya keçid vasitəsilə OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | yoxlayan tərəfin kimliyi, nonce, şifrələmə açarı, cavab ünvanı |
| DC API vasitəsilə OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | brauzer mənşəyi (origin), nonce, şifrələmə açarı |

İki onlayn forma OpenID4VP 1.0 Final-ın B.2.6 əlavəsindən gəlir. `client_id` tam `x509_hash:…` dəyəridir, `jwkThumbprint` isə cavabın şifrələndiyi açarın RFC 7638-ə əsasən hesablanmış barmaq izidir. Bir sorğudan ələ keçirilmiş DeviceResponse başqa sorğuda işə yaramır, çünki yoxlayan tərəf fərqli transkript qurur və cihaz imzası artıq uyğun gəlmir. Tamga yoxlayan tərəfi belə cavabı A6 addımında rədd edir.

> **Qeyd:** ADR-0013 onlayn transkripti hələ də deterministik demo heşi və "pilot üçün" ISO 18013-7 əl sıxma prosedurası kimi təsvir edir. Cari `@tamga-network/mdoc` paketi isə yuxarıdakı OpenID4VP 1.0 Final əl sıxma prosedurlarını tətbiq edir və OpenID4VP profilimiz də onları şərt qoyur.

## QR və Bluetooth vasitəsilə əyani əlaqə necə qurulur?

![Dörd addımda əyani mdoc təqdimatı](/blog/iso-mdoc-deep-dive/en/fig-engagement.png)

1. **Cihazın təqdim olunması (device engagement).** Cüzdan müvəqqəti P-256 açarı (`EDeviceKey`) və təsadüfi BLE xidmət UUID-si yaradır. Sonra `mdoc:` ilə başlayan və `DeviceEngagement` strukturunun base64url formasını daşıyan QR kod göstərir. Bu kodda fərdi məlumat olmur.
2. **Sessiyanın qurulması.** Oxuyucu kodu skan edir, öz müvəqqəti açarını (`EReaderKey`) yaradır və sessiya açarlarını əldə edir. Bunun üçün hər iki tərəf əvvəlcə ECDH, sonra HKDF-SHA-256 işlədir. HKDF-də duz kimi `SHA-256(SessionTranscriptBytes)`, məlumat sətri kimi isə `SKReader` və `SKDevice` istifadə olunur. Oxuyucu `SessionEstablishment {eReaderKey, data}` mesajını göndərir. Buradakı `data` SKReader ilə şifrələnmiş `DeviceRequest` strukturudur.
3. **Sorğu və razılıq.** Cüzdan sorğunu açır və istənilən elementləri şəxsə göstərir. Şəxs telefonun kilidi ilə təsdiqləyir və ya sorğunu rədd edir.
4. **Cavab.** Cüzdan `DeviceResponse` strukturunu SKDevice ilə şifrələnmiş `SessionData` mesajında göndərir və sessiyanı `20` status kodu ilə bağlayır.

```cbor-diag title="Simplified example: DeviceEngagement inside the QR code"
{
  0: "1.0",
  1: [1, 24(<< EDeviceKey as COSE_Key >>)],     / cipher suite 1 /
  2: [[2, 1, {                                  / BLE, version 1 /
        0: true,                                / peripheral server mode /
        1: false,                               / central client mode /
        10: h'…16-byte service UUID…'
      }]]
}
```

Sessiya mesajları AES-256-GCM ilə şifrələnir. 12 baytlıq IV 8 baytlıq identifikatordan və 1-dən başlayan 4 baytlıq mesaj sayğacından ibarətdir. İdentifikator oxuyucu üçün tamamilə sıfırlardan ibarətdir, cihaz üçün isə `…01` ilə bitir. BLE-də telefon GATT serveri rolunu oynayır. Hər mesaj hissələrə bölünür və ardınca başqa hissə gəlirsə, hissənin ilk baytı `0x01`, sonuncu hissədə isə `0x00` olur.

Bugünkü vəziyyətə gəlincə, protokolun nüvəsi (cihazın təqdim olunması, sessiya şifrələməsi, BLE bölgüsü) `@tamga-network/mdoc` daxilində yazılıb və sınaqdan keçirilib. BLE radiosunu cüzdan tətbiqi təmin edir. Real cihazlarla aparılacaq sınaqlar isə hələ başa çatmayıb. NFC istifadə olunmur və əlaqə həmişə QR koddan başlayır. Paketlərin 0.6.0 versiyasından bəri oxuyucu öz sorğusunu imzalayır (oxuyucu autentifikasiyası) və cüzdan bu imzanı imzalanmış etibar siyahısındakı lövbərlərlə yoxlayır. 0.7.0 versiyasından bəri isə qeydiyyat sertifikatı olmayan sorğu onlayn olduğu kimi əyani təqdimatda da rədd edilir. OpenID4VP üzərindən onlayn mdoc təqdimatı SD-JWT VC ilə eyni sorğu axınından istifadə edir.

## Yoxlayan tərəf mdoc-u necə yoxlayır?

1. `DeviceResponse` strukturunu təhlil edin və `docType` dəyərinin istədiyiniz növlə eyni olduğunu yoxlayın.
2. `issuerAuth` imzasını yoxlayın. Yalnız ES256 qəbul edilir və `x5chain` imzalanmış etibar siyahısındakı quruma gedib çıxmalıdır. Burada SD-JWT sənədlərində istifadə edilən lövbərin eynisindən istifadə olunur.
3. Göstərilən hər element üçün 24 nömrəli teqin baytlarının heşini götürün və onu `valueDigests[ad sahəsi][digestID]` dəyəri ilə müqayisə edin.
4. `validityInfo` sahəsini cari vaxta görə yoxlayın.
5. Bu sorğunun və ya sessiyanın SessionTranscript strukturunu özünüz qurun, `DeviceAuthenticationBytes` dəyərini yenidən yaradın və `deviceSignature` imzasını `deviceKey` ilə yoxlayın.
6. Status bitini oxuyun, sonra SD-JWT VC-də istifadə olunan etibar, ləğv və siyasət qatlarını eynilə işlədin.

Nəticə burada da üç dəyərdən biridir. Sənəd qəbul edilir, rədd edilir və ya infrastruktura çatmaq mümkün olmayanda "hazırda yoxlamaq mümkün olmadı" nəticəsi verilir. Nəticə obyektində heç vaxt xam CBOR və ya göstərilməmiş element olmur.

OpenID4VP sorğusunda mdoc DCQL ilə seçilir ([OpenID4VP və DCQL-ə ətraflı baxış](/blog/openid4vp-dcql-deep-dive)). Bunun üçün `format: "mso_mdoc"`, `meta.doctype_value` və `[ad sahəsi, element]` formasında sahə yolları istifadə olunur:

```json title="DCQL query for an age check over mdoc"
{
  "credentials": [{
    "id": "identity",
    "format": "mso_mdoc",
    "meta": { "doctype_value": "urn:tamga:id:IdentityAttestation:1" },
    "claims": [{ "path": ["tamga.id.1", "age_over_18"], "values": [true] }]
  }]
}
```

mdoc formatındakı şəxsiyyət sənədi Tamga-nın sıfır bilikli yaş sübutunun da girişidir və sübut adi ES256 ilə imzalanmış mdoc-lar üzərində işləyir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)). Bu yoxlama Tamga Verify-da artıq işləyir. Necə işlədiyini [Tamga-da sıfır bilik (zero-knowledge)](/blog/zero-knowledge-in-tamga) yazısında izah etmişik.

## Tez-tez verilən suallar

### mdoc ilə mDL eyni şeydirmi?

Xeyr. mDL (mobil sürücülük vəsiqəsi) mdoc formatından istifadə edən sənəd növlərindən yalnız biridir. Tamga-nın şəxsiyyət sənədi öz docType-ı və ad sahəsi olan mdoc-dur. Tamga-nın "sürücülük vəsiqəsi məlumatı" sənədi isə yalnız SD-JWT VC kimi verilir və mDL deyil.

### digestID-lər niyə ardıcıl deyil, təsadüfidir?

İdentifikatorlar ardıcıl olsaydı, yoxlayan tərəf sənəddə neçə element olduğunu və hansı mövqelərin gizlədildiyini çıxara bilərdi. 31 bitlik təsadüfi identifikatorlar isə heç bir sıra məlumatı daşımır.

### Tamga mdoc-unu başqa ISO 18013-5 kitabxanası ilə yoxlamaq olarmı?

Strukturlar standart ISO 18013-5 və OpenID4VP 1.0 strukturlarıdır. Yenə də iki məqama diqqət etməlisiniz. Kitabxana 24 nömrəli teqin baytlarının heşini onları yenidən kodlaşdırmadan, gəldiyi kimi götürməlidir. Onlayn təqdimat üçün də OpenID4VP əl sıxma prosedurasını dəstəkləməlidir.

## Mənbələr

- [ISO/IEC 18013-5:2021, Mobil sürücülük vəsiqəsi (mDL) tətbiqi, ISO](https://www.iso.org/standard/69084.html)
- [OpenID for Verifiable Presentations 1.0, Final, 9 iyul 2025 (B əlavəsi: ISO mdoc)](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [RFC 8949: Concise Binary Object Representation (CBOR), IETF](https://www.rfc-editor.org/rfc/rfc8949)
- [RFC 9052: CBOR Object Signing and Encryption (COSE), IETF](https://www.rfc-editor.org/rfc/rfc9052)
- [ADR-0013: şəxsiyyət rəqəmsal sənədi üçün mdoc, Tamga Network sənədləri](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity)
- [`@tamga-network/mdoc`, Tamga Network sənədləri](https://docs.tamga.network/packages/mdoc)
- [OpenID4VP profili (SPEC-PROTO-0002), Tamga Network sənədləri](https://docs.tamga.network/specifications/openid4vp)
- [Təqdimat, Tamga Network sənədləri](https://docs.tamga.network/concepts/presentation)

---
title: "ISO mdoc-a dərindən baxış: CBOR, COSE, MSO və əlaqə qurma"
slug: iso-mdoc-deep-dive
description: "ISO/IEC 18013-5 mdoc-un necə qurulduğu və yoxlandığı: CBOR və COSE, MSO və dəyər heşləri, cihaz autentifikasiyası, sessiya transkriptləri, QR və BLE."
date: 2026-10-08
lang: az
category: standards
draft: false
related: sd-jwt-vc-deep-dive, openid4vp-dcql-deep-dive, zero-knowledge-in-tamga, openid4vci-deep-dive, haip-and-token-status-list
---

<!-- Sources: ADR-0013 v1.0.0 (accepted 2026-09-26; MD1–MD5; docType/namespace; CBOR determinism note; Safari/Chrome DC API facts as recorded in the ADR); SPEC-PROTO-0001 PR16 (mdoc in the same credential response, same proof key, same status bit, wallet cross-check); SPEC-PROTO-0002 §4.5, §5.2, PV11 (DCQL mso_mdoc, DeviceResponse, OpenID4VPHandover); @tamga-network/mdoc README + src (mdoc.ts: tag-24 items, random 31-bit digestIDs, 16-byte random, MSO fields, status in MSO, empty DeviceNameSpaces, OpenID4VPHandover + OpenID4VPDCAPIHandover; proximity.ts: DeviceEngagement QR "mdoc:", cipher suite 1, BLE peripheral server mode, SessionTranscript [DE, EReaderKey, null], HKDF SKReader/SKDevice, AES-256-GCM IV, status 20, BLE chunk prefix); identity type metadata urn:tamga:id:IdentityAttestation:1 (11 elements, sd always, no portrait); concepts/presentation (BLE implemented, device testing pending). Example mdoc generated with @tamga-network/mdoc for this post (fake values). ISO/IEC 18013-5:2021 public catalogue entry; OpenID4VP 1.0 Final Annex B.2.6; HAIP 1.0 Final §6. -->

**mdoc** mobil sürücülük vəsiqələri üçün standart olan ISO/IEC 18013-5:2021-də müəyyən edilmiş mobil sənəd formatıdır. Bu, COSE ilə imzalanmış CBOR-dur: sənədi verən qurum hər bir məlumat elementinin heşini və sənəd sahibinin cihaz açarını sadalayan **Mobile Security Object (MSO)** obyektini imzalayır, sənəd sahibi yalnız oxuyucunun istədiyi elementləri göndərir, **sessiya transkripti** (session transcript) üzərində cihaz imzası isə cavabı məhz həmin bir sessiyaya bağlayır. Tamga rəqəmsal şəxsiyyət sənədini SD-JWT VC ilə yanaşı mdoc kimi də verir.

> **Qeyd:** Nümunələr bu yazı üçün açıq `@tamga-network/mdoc` paketi ilə, saxta dəyərlərdən istifadə edilərək yaradılıb. Heşlər qısaldılıb, sertifikat zənciri isə göstərilməyib.

## Tamga rəqəmsal şəxsiyyət sənədini niyə iki formatda verir?

[ADR-0013](https://docs.tamga.network/adr/0013-mdoc-dual-format-for-identity) 26 sentyabr 2026-cı ildə qəbul edilib və üç səbəb göstərir. Avropa İttifaqı (Aİ)-nin rəqəmsal şəxsiyyət üçün rəqəmsal cüzdanlar arxitekturası şəxsin identifikasiya məlumatları üçün mdoc formatını tələb edir, SD-JWT VC-ni isə ixtiyari sayır. ISO 18013-5 üzrə əyani təqdimat mdoc ilə aparılır. Qərar qəbul edilən vaxt isə Safari-nin Digital Credentials API-si (rəqəmsal sənədlər üçün API) yalnız mdoc-u qəbul edirdi, Chrome isə hər iki formatı qəbul edirdi.

Bu qərardan irəli gələn qaydalar:

- **SD-JWT VC əsas format olaraq qalır.** mdoc eyni rəqəmsal sənədin ikinci təqdimatıdır və yalnız rəqəmsal şəxsiyyət sənədi (`urn:tamga:id:IdentityAttestation:1`) üçün tətbiq olunur. Tələbə sertifikatları, diplomlar və biletlər yalnız SD-JWT VC formatında qalır.
- **Eyni sahələr, eyni etibarlılıq müddəti, eyni açar.** mdoc-dakı `deviceKey` SD-JWT-dəki `cnf.jwk` ilə eynidir. İkinci sənəd sahibi açarı yaradılmır.
- **Ayrı-ayrı sənədi verən qurum imzaları.** SD-JWT üçün JOSE/ES256, mdoc üçün `COSE_Sign1`/ES256; hər ikisində eyni sertifikat zənciri etibar siyahısındakı eyni qeydə gətirib çıxarır.
- **Bir verilmə, bir status biti.** Rəqəmsal sənəd cavabındakı hər obyekt SD-JWT VC-ni və mdoc-u (base64url `IssuerSigned`) daşıyır; hər ikisi eyni sübut açarına və eyni status siyahısı indeksinə bağlıdır. Rəqəmsal cüzdan mdoc-u SD-JWT nüsxəsi ilə tutuşdurmayınca onu saxlamır: eyni sənədi verən qurum sertifikatı, eyni sahələr, `deviceKey` dəyəri `cnf` dəyərinə bərabər.

![SD-JWT VC və mdoc-un sahə-sahə müqayisəsi](/blog/iso-mdoc-deep-dive/en/fig-formats.png)

## mdoc necə kodlaşdırılır?

Hər şey **CBOR** (RFC 8949) formatındadır — JSON ilə eyni məlumat modelinə malik, üstəlik bayt sətirləri, teqlər və tam ədəd açarları olan ikili kodlaşdırma. Burada iki teq önəmlidir. Teq 24 "ardınca gələn bayt sətri özü kodlaşdırılmış CBOR-dur" deməkdir; bu, imzalayana yenidən kodlaşdırılmış struktur əvəzinə dəqiq baytları heşləməyə imkan verir — SD-JWT-nin açıqlama (disclosure) sətirləri ilə öyrətdiyi eyni dərs ([SD-JWT VC-yə dərindən baxış](/blog/sd-jwt-vc-deep-dive)). Teq 0 RFC 3339 tarix-vaxt sətrini işarələyir.

İmzalar **COSE** (RFC 9052) ilə verilir — CBOR-un JOSE qarşılığı. `COSE_Sign1` dörd elementli massivdir: qorunan başlıq, qorunmayan başlıq, faydalı yük (payload) və imza. Tamga-nın sənədi verən qurum imzasında qorunan başlıqda `{1: -7}` (ES256), `x5chain` sahəsində isə sertifikat zənciri olur.

ADR-0013 qarşılıqlı uyğunluqla bağlı bir qeyd-şərti qeydə alır. Tamga deterministik CBOR-u RFC 8949 §4.2.1-ə uyğun (açarların bayt üzrə leksikoqrafik sırası) kodlaşdırır, ISO 18013-5:2021 isə RFC 7049-un köhnə, əvvəlcə uzunluğa görə sıralama qaydasına istinad edir. Heşlər tag-24 baytları üzərindən, verildiyi kimi hesablandığı üçün yoxlama sıralama qaydasından asılı deyil, lakin tam qarşılıqlı uyğunluq üçün bu məsələ izlənilir.

## Məlumat elementi nədir və necə heşlənir?

Hər sahə bir `IssuerSignedItem` elementidir: `digestID`, 16 təsadüfi bayt, element adı və onun dəyərindən ibarət xəritə (map); bu xəritə kodlaşdırılır və teq 24-ə bükülür. Onun heşi həmin teqlənmiş baytların SHA-256 dəyəridir.

```cbor-diag title="Simplified example: one IssuerSignedItem (generated with @tamga-network/mdoc)"
24(<< {
  "digestID": 1192084209,
  "random": h'fe3f2636f3f4a9fa0b315de1f14e8dcd',
  "elementIdentifier": "age_over_18",
  "elementValue": true
} >>)

SHA-256 of the tagged bytes: c2418dcd28b95cc1…
```

Təsadüfi dəyər SD-JWT-dəki duzun (salt) funksiyasını yerinə yetirir: o olmasaydı, `age_over_18: true` heşi hər rəqəmsal sənəddə eyni olardı və təxmin edilə bilərdi. `digestID` elementi MSO-dakı müvafiq qeydə bağlayır. Tamga digestID-ləri 0, 1, 2… şəklində saymaq əvəzinə 31 bit daxilində təsadüfi təyin edir; beləliklə, sənəd sahibinin açıqladığı ID-lər nə elementlərin sayı, nə də onların yeri barədə heç nə demir.

Elementlər **ad sahələrində** (namespaces) yerləşir. Tamga-nın şəxsiyyət ad sahəsi `tamga.id.1` adlanır, element adları isə SD-JWT iddia (claim) adlarına bir-bir uyğun gəlir: `family_name`, `given_name`, `birth_date`, `nationality`, `personal_administrative_number`, `document_type`, `document_number_hash`, `issuing_country`, `document_chip_verified`, `verification_method` və `age_over_18`. Onların hamısı seçici paylaşım (selective disclosure) ilə açıqlana bilər. Portret elementi yoxdur.

## Mobile Security Object nələrdən ibarətdir?

MSO sənədi verən qurumun imzaladığı hissədir. O, kodlaşdırılır, teq 24-ə bükülür və sənədi verən qurumun `COSE_Sign1` strukturunun (`issuerAuth`) faydalı yükü kimi istifadə olunur:

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
    "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
  }
}
```

Yuxarıdakı `age_over_18` elementinin heşi `1192084209` altında saxlanan dəyərə bərabərdir. `deviceKey` COSE_Key-dir (`1: 2` EC2 açarı, `-1: 1` P-256 əyrisi, `-2`/`-3` isə koordinatlardır) və SD-JWT-dəki `cnf.jwk` ilə eyni açıq açardır. `validityInfo.signed` SD-JWT-dəki `iat` rolunu oynayır: Tamga-nın zamana bağlı etibar yoxlamaları sənədi verən qurumun həmin anda siyahıda olub-olmadığını və səlahiyyətli olub-olmadığını soruşur. `status` SD-JWT nüsxəsi ilə eyni Token Status List indeksinə işarə edir, buna görə də rəqəmsal şəxsiyyət sənədinin ləğvi bir bitlə hər iki təqdimatı ləğv edir.

## Sənəd sahibi mdoc-un məhz ona verildiyi cihaz olduğunu necə sübut edir?

Seçici paylaşım (selective disclosure) asan hissədir: rəqəmsal cüzdan `IssuerSigned` göndərir; `nameSpaces` hissəsində yalnız təsdiqlənmiş elementlər olur, `issuerAuth` isə dəyişdirilmədən qalır. Gizli elementlər MSO-da heş kimi qalır.

Sənəd sahibinə bağlılıq (holder binding) **cihaz autentifikasiyası** ilə təmin edilir. Rəqəmsal cüzdan aşağıdakı strukturu qurur:

```cbor-diag title="What the device key signs"
DeviceAuthenticationBytes = 24(<< [
  "DeviceAuthentication",
  SessionTranscript,
  "urn:tamga:id:IdentityAttestation:1",
  24(<< {} >>)              / DeviceNameSpaces: empty in Tamga's profile /
] >>)
```

və onu cihaz açarı ilə **ayrılmış faydalı yüklü** (detached payload) `COSE_Sign1` kimi imzalayır: faydalı yük sahəsi `nil` olur, yoxlayan tərəf isə baytları sessiyanı özü necə görürsə, ona əsasən yenidən qurur. İmza `DeviceResponse` strukturunun `deviceSigned.deviceAuth.deviceSignature` sahəsində ötürülür (`version "1.0"`, `documents[0]` = `{docType, issuerSigned, deviceSigned}`). Tamga cihaz tərəfindən imzalanmış məlumat elementlərindən istifadə etmir, buna görə də `DeviceNameSpaces` həmişə boş xəritədir.

Deməli, hər şey **SessionTranscript**-dən asılıdır: ona nə daxil edilirsə, cavab da məhz ona bağlanır.

## Sessiya transkriptinə nə daxildir?

| Kanal | SessionTranscript | Cavabı nəyə bağlayır |
|---|---|---|
| Əyani (ISO 18013-5, QR + BLE) | `[DeviceEngagementBytes, EReaderKeyBytes, null]` | hər iki müvəqqəti sessiya açarı |
| QR və ya keçid vasitəsilə OpenID4VP | `[null, null, ["OpenID4VPHandover", sha256(cbor([client_id, nonce, jwkThumbprint, response_uri]))]]` | yoxlayan tərəfin identikliyi, nonce, şifrələmə açarı, cavab ünvanı |
| DC API vasitəsilə OpenID4VP | `[null, null, ["OpenID4VPDCAPIHandover", sha256(cbor([origin, nonce, jwkThumbprint]))]]` | brauzer mənşəyi (origin), nonce, şifrələmə açarı |

İki onlayn forma OpenID4VP 1.0 Final, Annex B.2.6-dan götürülüb. `client_id` tam `x509_hash:…` dəyəridir, `jwkThumbprint` isə cavabın şifrələndiyi açarın RFC 7638 barmaq izidir (thumbprint). Bir sorğudan ələ keçirilmiş DeviceResponse başqa sorğuda uğursuz olur, çünki yoxlayan tərəf fərqli transkript qurur və cihaz imzası artıq uyğun gəlmir. Tamga-nın yoxlayan tərəfi bunu A6 addımında rədd edir.

> **Qeyd:** ADR-0013 onlayn transkripti hələ də "pilot üçün" ISO 18013-7 handover ilə deterministik demo heşi kimi təsvir edir. Hazırkı `@tamga-network/mdoc` yuxarıda göstərilən OpenID4VP 1.0 Final handover-lərini tətbiq edir və OpenID4VP profili onları tələb edir.

## QR və Bluetooth üzərindən əyani əlaqə qurma necə işləyir?

![Dörd addımda əyani mdoc təqdimatı](/blog/iso-mdoc-deep-dive/en/fig-engagement.png)

1. **Cihazla əlaqə qurma (device engagement).** Rəqəmsal cüzdan müvəqqəti P-256 açarı (`EDeviceKey`) və təsadüfi BLE xidmət UUID-si yaradır, sonra `mdoc:` və ardınca `DeviceEngagement` strukturunun base64url kodundan ibarət QR kodu göstərir. Bu kodda heç bir fərdi məlumat yoxdur.
2. **Sessiyanın qurulması.** Oxuyucu kodu skan edir, öz müvəqqəti açarını (`EReaderKey`) yaradır və sessiya açarlarını törədir. Hər iki tərəf ECDH, ardınca isə duz kimi `SHA-256(SessionTranscriptBytes)` və info sətirləri `SKReader` və `SKDevice` ilə HKDF-SHA-256 icra edir. Oxuyucu `SessionEstablishment {eReaderKey, data}` göndərir; burada `data` oxuyucunun SKReader ilə şifrələnmiş `DeviceRequest` sorğusudur.
3. **Sorğu və razılıq.** Rəqəmsal cüzdan sorğunu deşifrə edir, istənilən elementləri göstərir, şəxs isə telefonun kilidi ilə təsdiqləyir və ya imtina edir.
4. **Cavab.** Rəqəmsal cüzdan `DeviceResponse` cavabını SKDevice ilə şifrələnmiş `SessionData` mesajında göndərir və sessiyanı `20` statusu ilə bitirir.

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

Sessiya mesajları AES-256-GCM ilə şifrələnir; 12 baytlıq IV 8 baytlıq identifikatordan (oxuyucu üçün tamamilə sıfırlar, cihaz üçün `…01`) və 1-dən başlayan 4 baytlıq mesaj sayğacından ibarətdir. BLE üzərindən telefon GATT serveri kimi çıxış edir; hər mesaj hissələrə bölünür, ardınca başqa hissələr gəlirsə hissənin birinci baytı `0x01`, sonuncu hissədə isə `0x00` olur.

Hazırkı vəziyyət: protokolun nüvəsi (əlaqə qurma, sessiya şifrələnməsi, BLE çərçivələnməsi) `@tamga-network/mdoc` daxilində reallaşdırılıb və test edilib, BLE radiosu isə rəqəmsal cüzdan tətbiqi tərəfindən təmin olunur. Cihazlar üzərində testlər hələ davam edir. NFC istifadə olunmur; əlaqə qurma həmişə QR kodundan başlayır. Oxuyucunun autentifikasiyası hələ daxil edilməyib, buna görə də rəqəmsal cüzdan şəxsə oxuyucunun yoxlanılmadığını bildirir. OpenID4VP üzərindən onlayn mdoc təqdimatı SD-JWT VC ilə eyni sorğu axınından istifadə edir.

## Yoxlayan tərəf mdoc-u necə yoxlayır?

1. `DeviceResponse` strukturunu təhlil edin və `docType` dəyərinin istənilən dəyər olduğunu təsdiqləyin.
2. `issuerAuth` imzasını yoxlayın: yalnız ES256; `x5chain` imzalanmış etibar siyahısındakı sənədi verən quruma — SD-JWT rəqəmsal sənədləri üçün istifadə olunan eyni etibar nöqtəsinə (anchor) — gətirib çıxarmalıdır.
3. Hər açıqlanmış element üçün tag-24 baytlarını heşləyin və `valueDigests[namespace][digestID]` ilə müqayisə edin.
4. `validityInfo` dəyərini cari vaxtla yoxlayın.
5. Bu sorğu və ya sessiya üçün SessionTranscript-i yenidən qurun, `DeviceAuthenticationBytes` strukturunu yenidən qurun və `deviceSignature` imzasını `deviceKey` ilə yoxlayın.
6. Status bitini oxuyun, sonra SD-JWT VC-də olduğu kimi eyni etibar, ləğv və siyasət qatlarını işə salın.

Nəticə eyni üç dəyərli nəticədir: qəbul edildi, rədd edildi və ya infrastruktura çatmaq mümkün olmadıqda qeyri-müəyyən. Nəticə obyektində heç vaxt xam CBOR və ya açıqlanmamış elementlər olmur.

OpenID4VP sorğusunda mdoc DCQL ilə seçilir ([OpenID4VP və DCQL-ə dərindən baxış](/blog/openid4vp-dcql-deep-dive)): `format: "mso_mdoc"`, `meta.doctype_value` və `[namespace, element]` formatında iddia yolları:

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

mdoc formatındakı şəxsiyyət rəqəmsal sənədi həm də Tamga-nın sıfır bilikli (zero-knowledge) yaş sübutu üçün giriş məlumatıdır; bu sübut adi ES256 ilə imzalanmış mdoc-lar üzərində işləyir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)). Bu yoxlama artıq Tamga Verify-da işləyir; necə işlədiyi [Tamga-da sıfır bilik (zero-knowledge)](/blog/zero-knowledge-in-tamga) məqaləsində izah olunur.

## Tez-tez verilən suallar

### mdoc ilə mDL eyni şeydirmi?

Xeyr. mDL (mobil sürücülük vəsiqəsi) mdoc formatından istifadə edən sənəd növlərindən yalnız biridir. Tamga-nın şəxsiyyət rəqəmsal sənədi öz docType-ı və ad sahəsi (namespace) olan mdoc-dur, Tamga-nın "sürücülük vəsiqəsi məlumatları" rəqəmsal sənədi isə yalnız SD-JWT VC formatındadır, mDL deyil.

### digestID-lər niyə ardıcıl deyil, təsadüfidir?

Ardıcıl ID-lər yoxlayan tərəfə rəqəmsal sənəddə neçə element olduğunu və hansı mövqelərin gizlədildiyini təxmin etməyə imkan verərdi. Təsadüfi 31 bitlik ID-lər heç bir sıra məlumatı daşımır.

### Tamga mdoc-unu başqa ISO 18013-5 kitabxanası ilə yoxlamaq olarmı?

Strukturlar standart ISO 18013-5 və OpenID4VP 1.0 strukturlarıdır. İki məqamı yoxlamaq lazımdır: kitabxana tag-24 baytlarını yenidən kodlaşdırmadan, alındığı kimi heşləməlidir və onlayn təqdimatlar üçün OpenID4VP handover mexanizmini dəstəkləməlidir.

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

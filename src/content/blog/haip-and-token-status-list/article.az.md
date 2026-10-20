---
title: "HAIP və Token Status List: izləmədən yüksək təminat"
slug: haip-and-token-status-list
description: "HAIP 1.0 nəyi müəyyənləşdirir, Tamga onu necə tətbiq edir və Token Status List rəqəmsal sənədləri harada istifadə olunduqlarını sənədi verən quruma bildirmədən necə ləğv edir."
date: 2026-10-08
lang: az
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Sources: HAIP 1.0 Final (24 Dec 2025) §3–8 (flows, FAPI2/PKCE/PAR, DPoP + DPoP-Nonce, scope, signed metadata, wallet attestation shared sub, key attestations, x509_hash, DCQL, ECDH-ES P-256, A128GCM+A256GCM, ephemeral keys, aki, JAR request_uri, direct_post.jwt, same-device rules, dc_api.jwt, mso_mdoc / dc+sd-jwt, x5c without trust anchor, status_list, unique unpredictable index, KB-JWT always, ES256 / -7 -9, SHA-256). ADR-0034 (K1–K5, CI1–CI6, renewal order). draft-ietf-oauth-status-list-21 (21 Jun 2026; RFC Editor queue per datatracker 2026-10-08; title "Token Status List (TSL)"): §4 bit packing LSB-first, DEFLATE/ZLIB, bits 1/2/4/8, JWT claims sub/iat/exp/ttl/status_list, aggregation_uri, §7 status types (0x03 application specific), §12 herd privacy. SPEC-CRED-0003 v1.0.0 (cites draft-20): bits=2, 100,000 min, 80% fill, random idx, opaque URI, split by type only, 2-min fixed cadence, no emergency publish, exp = iat + 6 h, ttl 120 (2026-10-09: 1% noise rule removed), prefetch, aggregation recommended, separate status key, Ş1–Ş10, S1–S14, anchors.jsonl today. SPEC-API-0001 D1–D6, INDETERMINATE reasons, ZK NOT_APPLICABLE. Compression figures computed for this post with zlib level 9 (same call as @tamga-network/sd-jwt). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0 OpenID4VCI, OpenID4VP, SD-JWT VC və ISO mdoc-dakı çoxsaylı seçimlərdən yüksək təminat tələb edən istifadə üçün vahid bir dəst müəyyənləşdirir: hər tərəfin hansı formatları, alqoritmləri, müştəri identifikatorlarını, şifrələməni və attestasiyaları dəstəkləməli olduğunu. **Token Status List** bu dəstin əsaslandığı ləğv mexanizmidir: hər rəqəmsal sənəd yoxlayan tərəflərin əvvəlcədən endirdiyi böyük, imzalanmış, sıxılmış bit siyahısındakı bir mövqeyə işarə edir, buna görə də sənədin yoxlanması sənədi verən quruma onun harada və nə vaxt təqdim olunduğunu heç vaxt bildirmir.

HAIP 1.0 24 dekabr 2025-ci ildə yekun (Final) statusu aldı. Token Status List layihəsi 21-ci versiyadadır (21 iyun 2026), indi "Token Status List (TSL)" adlanır və RFC Editor növbəsində gözləyir.

## HAIP baza spesifikasiyaların açıq buraxdığı hansı məsələləri müəyyənləşdirir?

İki məhsulun hər biri OpenID4VP-yə hərfi-hərfinə əməl edə və yenə də bir-biri ilə əlaqə qura bilməyə bilər: biri sorğuları `x509_san_dns` ilə imzalayır, digəri yalnız DID-ləri qəbul edir; biri cavabları şifrələyir, digəri şifrələmir. HAIP bu boşluqları üç axın (rəqəmsal sənədin verilməsi, yönləndirmələrlə təqdimat, brauzerin Digital Credentials API-si üzərindən təqdimat) və iki format üçün bağlayır. Əsas qaydalar:

| Sahə | HAIP 1.0 tələbi |
|---|---|
| Formatlar | IETF SD-JWT VC (`dc+sd-jwt`) və ya ISO mdoc (`mso_mdoc`); hansının istifadə olunacağını ekosistemlər müəyyən edir |
| Alqoritmlər | hamı ən azı ES256 (COSE -7 və ya -9) və SHA-256-nı dəstəkləyir |
| Verilmə | FAPI 2.0 vasitəsilə PKCE (S256) və PAR ilə authorization code axını; DPoP-a bağlı tokenlər; hər rəqəmsal sənəd konfiqurasiyası üçün `scope`; rəqəmsal sənədlər açara bağlı olduqda `nonce_endpoint` |
| Cüzdana etibar | PAR və token endpoint-lərində bütün quraşdırmaların paylaşdığı `sub` ilə cüzdan attestasiyası; açar attestasiyaları |
| Yoxlayan tərəfin kimliyi | imzalanmış sorğular `x509_hash` müştəri identifikatorundan istifadə edir |
| Sorğu | DCQL, o cümlədən `aki` tipli `trusted_authorities` |
| Cavab | şifrələnmiş: P-256 üzərində ECDH-ES; yoxlayan tərəflər həm A128GCM, həm də A256GCM göstərir; hər sorğu üçün yeni açar |
| Yönləndirmə axını | `request_uri`, `direct_post.jwt` ilə JAR, eyni cihazda ilkin sessiyaya geri yönləndirmə |
| Brauzer axını | `dc_api.jwt` ilə Digital Credentials API |
| Başlıqlarda açarlar | sənədi verən qurumun imzaları, imzalanmış metadata və status siyahısı tokenləri üçün `x5c`, etibar ankeri daxil edilmədən, heç vaxt öz-özünə imzalanmış deyil |
| SD-JWT VC | rəqəmsal sənəd sənəd sahibinə bağlı olduqda KB-JWT həmişə mövcuddur; `status` `status_list` istifadə edir |
| Status | hər rəqəmsal sənəd öz unikal, proqnozlaşdırılmaz indeksini alır |

Tamga-nın profilləri bunların hamısına əməl edir, bəzi yerlərdə isə daha irəli gedir: icazə verilən yeganə imza alqoritmi ES256-dır və hər rəqəmsal sənəd sənəd sahibinə bağlıdır, buna görə də KB-JWT həmişə tələb olunur. Protokol təfərrüatları [OpenID4VCI](/blog/openid4vci-deep-dive) və [OpenID4VP və DCQL](/blog/openid4vp-dcql-deep-dive) üzrə ətraflı yazılardadır.

![HAIP qaydaları və Tamga-nın seçimləri](/blog/haip-and-token-status-list/en/fig-haip.png)

## Hansı HAIP qaydaları Tamga-nın dizaynını dəyişdi?

HAIP tələbləri bir-bir tutuşdurulanda onlardan ikisi artıq qəbul edilmiş qərarlara toxundu, buna görə də onlar layihə rəhbərliyi tərəfindən 1 oktyabr 2026-cı ildə təsdiqlənmiş [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) prosesindən keçdi.

**Yoxlayan tərəfin kimliyi: `x509_hash`.** HAIP §5: "İmzalanmış sorğular üçün Yoxlayan tərəf `x509_hash` Client Identifier Prefix-dən istifadə ETMƏLİ, Cüzdan isə onu qəbul ETMƏLİDİR". ADR-dən əvvəl Tamga yoxlayan tərəfləri `x509_san_dns:<domain>` istifadə edirdi və etibar siyahısı qeydləri bu sətrə əsasən açarlanırdı. İndi:

- yoxlayan tərəfin `client_id` dəyəri konfiqurasiya faylına əl ilə yazılmır, onun giriş sertifikatından hesablanır;
- rəqəmsal cüzdan yalnız `x509_hash` qəbul edir və hash son (leaf) sertifikatla uyğun gəlmədikdə sorğunu rədd edir; bununla yanaşı, cavab ünvanının sertifikatın SAN sahəsindəki domenlərdən birində olmasını yenə də tələb edir;
- sertifikat hər dəfə yeniləndikdə hash dəyişdiyi üçün hər etibar edən tərəf qeydində daimi `dns_name` saxlanılır və yenilənmədən sonra da qorunmalı olan hər şey ona bağlanır: nüsxələrin ayrılması, hər sayt üçün ayrıca psevdonimlər, keçid kartları və təqdimat jurnalı.

Bunun əməliyyat nəticəsi müəyyən ardıcıllıqdır. Yeniləmə zamanı əvvəlcə yeni sertifikat reyestr mənbəyinə əlavə edilir və etibar siyahısı yenidən dərc olunur; yalnız bundan sonra yoxlayan tərəf keçid edir. Əgər tez keçid etsə, rəqəmsal cüzdanlar naməlum `client_id` görür və imtina edir.

**Cüzdan attestasiyasının subyekti ortaqdır.** HAIP §4.4.1 bildirir ki, attestasiyanın `sub` dəyəri "mövcud cüzdan implementasiyası tipindən istifadə edən bütün Cüzdan instansiyaları tərəfindən paylaşılan dəyər OLMALIDIR", PAR `client_id` isə məhz həmin dəyərdir. Şəbəkədəki rəqəmsal cüzdanlardan biri olan Tamga Wallet-ın provayderi əvvəllər ora hər əməliyyat üçün yaradılan açarın barmaq izini yazırdı. İndi cüzdan həllinin identifikatorundan istifadə edir. İnstansiyalar hələ də yalnız hər əməliyyat üçün yeni `cnf` açarı və yeni, əlaqələndirilə bilməyən status qeydi ilə bir-birindən fərqləndirilir, buna görə də qurumun qeydə aldığı məlumat cüzdan məhsulunu müəyyən edir və telefon haqqında heç nə demir.

## Token Status List statusu necə kodlaşdırır?

Rəqəmsal sənəd göstərici daşıyır, siyahı isə bitləri:

```json title="In the credential (SD-JWT VC payload, or the MSO for mdoc)"
"status": {
  "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
}
```

```json title="Simplified example: Status List Token (header and payload)"
{ "alg": "ES256", "typ": "statuslist+jwt", "kid": "sl-2026-a", "x5c": ["MIIB…"] }
{
  "iss": "https://issuer.tamga.network/example-university",
  "sub": "https://status.tamga.network/3f9a2c",
  "iat": 1791446400,
  "exp": 1791468000,
  "ttl": 120,
  "status_list": { "bits": 2, "lst": "eNrt…" }
}
```

`sub` rəqəmsal sənəddəki `uri` ilə eyni olmalıdır. `lst` layihədə müəyyən edilmiş üç addımda qurulur: hər rəqəmsal sənəd üçün `bits` bit bayt massivinə yazılır, hər baytın **ən kiçik mərtəbəli bitindən** başlayaraq doldurulur; massiv ZLIB formatında DEFLATE ilə sıxılır; nəticə base64url ilə kodlaşdırılır.

16 qeyd və `bits: 2` ilə kiçik bir nümunə; burada 1-ci indeks ləğv edilib, 2-ci indeks dayandırılıb, 6-cı indeks isə ləğv edilib:

```text title="Packing 2-bit statuses (computed for this post)"
byte 0 = idx 3..0  → 00 10 01 00 → 0x24
byte 1 = idx 7..4  → 00 01 00 00 → 0x10
byte 2 = idx 11..8 → 0x00
byte 3 = idx 15..12 → 0x00

zlib(level 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` ilə `idx` indeksini oxumaq üçün: `idx >> 2` baytını götürün və `(idx & 3) × 2` qədər sağa sürüşdürün. `idx` 48213 üçün bu, 12053-cü bayt, 2-ci və 3-cü bitlərdir. Ölçü problem deyil: Tamga siyahısında ən azı 100 000 qeyd olur, sıxılmamış halda 25 000 bayt. Bu yazı üçün apardığımız testdə zlib 9-cu səviyyədə tamamilə etibarlı siyahını 46 bayta, 200 səpələnmiş ləğv olan eyni siyahını isə 439 bayta sıxdı.

![Rəqəmsal sənədin statusunun dörd addımda oxunması](/blog/haip-and-token-status-list/en/fig-bits.png)

## Status dəyərləri Tamga-da nə deməkdir?

| Dəyər | Layihədəki ad | Tamga-da |
|---|---|---|
| `0x00` | VALID | etibarlı |
| `0x01` | INVALID | ləğv edilib, həmişəlik |
| `0x02` | SUSPENDED | dayandırılıb, geri qaytarıla bilər |
| `0x03` | tətbiqə xas | istifadə olunmur; ləğv edilmiş kimi qəbul edilir |

Layihə `bits` üçün 1, 2, 4 və ya 8 dəyərinə icazə verir. Tamga həmişə 2-dən istifadə edir, çünki dayandırma üçün ayrıca dəyər lazımdır: diplomu araşdıran qurum araşdırma davam etdiyi müddətdə onu dayandırmaq istəyir. Bir bitlə o, ya əsassız ləğv etməli, ya da heç nə etməməli olardı. Dörd və ya səkkiz bit heç bir fayda vermədən siyahını iki və ya dörd dəfə böyüdərdi. Yoxlayan tərəf `0x00` dəyərindən fərqli istənilən dəyəri rədd kimi qəbul edir və "dayandırılıb" statusunu "ləğv edilib" statusundan ayrıca göstərir.

## Status siyahısı izləmə kanalına çevrilməkdən necə qorunur?

Status siyahısının məxfiliyini kütlə təmin edir: siyahını endirən yoxlayan tərəf onun qeydlərindən istənilən birini yoxlaya bilər. Tamga-nın qaydaları bu kütləni real edir; eyni qaydaların şəxsin tərəfindən necə göründüyü [İzləmədən ləğv](/blog/status-list-privacy) yazısında izah olunur.

- **Böyük siyahılar.** Ən azı 100 000 qeyd və qeydlərin 80%-i ayrıldıqdan sonra yeni siyahı. İstifadə olunmamış mövqelər etibarlı rəqəmsal sənədlərlə eyni `0x00` dəyərini daşıyır, buna görə də kənardan baxan heç kim neçə mövqenin ayrıldığını müəyyən edə bilməz.
- **Təsadüfi indekslər.** `idx` siyahının tutumu daxilində təsadüfi seçilir. Ardıcıl indeks, `awarding_date` gizli qalsa belə, qeydiyyat sırasını və təxmini tarixi üzə çıxarardı. HAIP də hər rəqəmsal sənədin öz unikal, proqnozlaşdırılmaz indeksinin olmasını tələb edir.
- **Qeyri-şəffaf URI-lər.** Siyahının URI-si hər təqdimatda görünür, yəni o da bir iddiadır (claim). `/sl/2026-engineering` ili və fakültəni ifşa edərdi; Tamga siyahı identifikatorları təsadüfi sətirlərdir, uyğunluq cədvəli isə sənədi verən qurumda qalır.
- **Yalnız tipə görə bölünmə.** Yeni siyahı əvvəlki dolduqda açılır, heç vaxt ilə və ya şöbəyə görə yox.
- **Nüsxələr indeksi paylaşmır.** On paket nüsxəsinin hər birinin öz təsadüfi indeksi var, buna görə də iki yoxlayan tərəf təqdimatları `idx` vasitəsilə əlaqələndirə bilməz.

Bir məhdudiyyət strukturdur və elə bu şəkildə də qeyd olunub: kiçik qurum üçün kütlə yalnız həmin qurumun öz rəqəmsal sənədləri qədər böyükdür, çünki `iss` onsuz da onun adını göstərir.

Məxfiliyin digər yarısı siyahının əldə edilməsi ilə bağlıdır. Əgər yoxlayan tərəf hər yoxlamada siyahını endirsəydi, sənədi verən qurum "kimsə hazırda mənim rəqəmsal sənədlərimdən birini yoxlayır" məlumatını öyrənərdi, mənbə IP ünvanı isə çox vaxt bunun kim olduğunu göstərərdi. Buna görə də Tamga yoxlayan tərəfləri siyahıları cədvəl üzrə **əvvəlcədən endirir** (prefetch) və yoxlamanı keşdən aparır; `@tamga-network/verifier` bunu standart olaraq edir, hər yoxlamada endirmə isə açıq şəkildə aktivləşdirilməlidir. Layihədəki ixtiyari `aggregation_uri` sənədi verən qurumun bütün status siyahılarını bir ünvanda sadalayır və Tamga-da tövsiyə olunur, çünki əvvəlcədən endirməni praktik edir.

## Siyahı nə qədər tez-tez dərc olunur və nüsxə nə qədər müddət etibarlıdır?

| Qayda | Tamga dəyəri | Səbəb |
|---|---|---|
| Dərc intervalı | 2 dəqiqəyə sabitlənib, heç nə dəyişmədikdə belə saxlanılır | yalnız ləğv zamanı dərc etmək "indicə ləğv baş verdi" məlumatını sızdırardı; qısa interval ləğvi bir neçə dəqiqə ərzində görünən edir |
| Təcili dərc | edilmir | sabit ritmi pozardı; təcili hallarda sənədi verən qurumun sertifikatının dayandırılması və ya sxemin ləğvi tətbiq olunur |
| `ttl` | 120 san (interval) | yoxlayan tərəfin yenidən yükləməzdən əvvəl öz nüsxəsindən nə qədər istifadə edə biləcəyi |
| `exp` | `iat` + 6 saat | mütləq hədd; status serverinin qısamüddətli nasazlığı yoxlamanı dayandırmasın deyə; istinad yoxlayan tərəf siyasətlərindəki maksimum token yaşına bərabərdir |
| Keş başlıqları | `exp` və `ttl` xeyrinə nəzərə alınmır | qərarı tokenin öz iddiaları (claims) verir |
| İmza açarı | rəqəmsal sənəd açarından ayrı, eyni X.509 zənciri | sızan status açarı ilə statusu saxtalaşdırmaq olar, diplomu yox |

Hər dərc əvvəlcə status serverinə yazılır, sonra isə onun heşi qeydə alınır. Bu gün həmin qeyd etibar siyahısını dərc edən tərəfin lövbər jurnalıdır (anchor log); ledger isə sonrakı mərhələdir ([niyə hələ blokçeyn yoxdur](/blog/why-no-blockchain-yet)). Yoxlayan tərəf tokenin heşinin qeydə alınmış heşlə üst-üstə düşdüyünü və versiyasının geriyə getmədiyini yoxlayır; beləliklə, sənədi verən qurum ləğv edilmiş rəqəmsal sənədi etibarlı göstərmək üçün siyahını xəlvətcə geri qaytara bilməz.

## Yoxlaya bilmədikdə yoxlayan tərəf hansı nəticəyə gəlir?

Ləğv yoxlamaları Tamga-nın emal ardıcıllığının (pipeline) D1–D6 addımları kimi icra olunur: `status.status_list` oxunur, token ilkin yükləmə keşindən götürülür, onun imzası etibar siyahısında həmin qurum üçün qeydiyyata alınmış status açarı ilə yoxlanılır, `sub`, aktuallıq və qeydə alınmış heş yoxlanılır, sonra bitlər oxunur. Siyahı yüklənə bilmədikdə və ya `exp` keçdikdə nəticə `STATUS_UNREACHABLE` və ya `STATUS_STALE` kimi səbəblə **INDETERMINATE** olur. "Bu diplom ləğv edilib" və "Hazırda yoxlaya bilmirəm" şəxs barədə fərqli qərarlara aparır və fərqli göstərilməlidir. Oflayn rejimdə yoxlayan tərəf keşdəki token və son məlum qeyd əsasında davam edə, son sinxronizasiya vaxtını göstərə və nəticəni oflayn yoxlanılmış kimi işarələyə bilər.

Sıfır bilikli (zero-knowledge) yaş sübutları indeksi olmayan yeganə haldır: sübut siyahıdakı mövqeyi müəyyən edə biləcək heç nəyi açıqlamır, ona görə də status "tətbiq olunmur" kimi bildirilir. Qərar belədir: sıfır biliklə yalnız qısamüddətli nüsxələr təqdim edilir; onlar ən çoxu 24 saat etibarlıdır və rəqəmsal sənəd ləğv edildikdən sonra yenilənmir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)); bu tətbiq olunana qədər yoxlayan tərəf belə sübutu yalnız öz siyasəti bunu açıq şəkildə nəzərdə tutduqda qəbul edir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

## Tez-tez verilən suallar

### HAIP qanundurmu?

Xeyr. Bu, OpenID Foundation-un spesifikasiyasıdır. Avropa rəqəmsal şəxsiyyət ekosistemi müxtəlif istehsalçıların rəqəmsal cüzdanlarının, sənədi verən qurumlarının və yoxlayan tərəflərinin birlikdə işləməsi üçün ona əsaslanır.

### Niyə yoxlayan tərəf sənədi verən qurumdan "bu rəqəmsal sənəd hələ də etibarlıdırmı" deyə soruşmur?

Çünki sualın özü sızmadır: sənədi verən qurum hansı rəqəmsal sənədin, nə vaxt və çox vaxt kim tərəfindən yoxlandığını öyrənərdi. Status siyahısı ilə yoxlayan tərəfdə hamının statusunun nüsxəsi olur və o, heç kimdən soruşmur.

### Dayandırma öz-özünə başa çatırmı?

Xeyr. Dayandırılmış rəqəmsal sənəd sənədi verən qurum bitləri yenidən etibarlı vəziyyətə qaytarana və ya onu ləğv edənə qədər dayandırılmış qalır. Yoxlayan tərəf yalnız cari dəyəri oxuyur.

### Yoxlayan tərəf on nüsxənin eyni şəxsə məxsus olduğunu müəyyən edə bilərmi?

Status siyahısı vasitəsilə yox. Hər nüsxənin öz təsadüfi indeksi var, nüsxələr arasındakı uyğunluq isə sənədi verən qurumun verilənlər bazasında qalır. Ləğv zamanı on indeksin hamısı eyni planlı dərcdə, həmin intervalda dəyişən digər hər şeylə birlikdə dəyişir.

## Mənbələr

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, iyun 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 9 iyul 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 uyğunluğu, Tamga Network sənədləri](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Ləğv və status siyahısı (SPEC-CRED-0003), Tamga Network sənədləri](https://docs.tamga.network/specifications/status-list)
- [ADR-0008: Status siyahısının yerləşdirilməsi, Tamga Network sənədləri](https://docs.tamga.network/adr/0008-status-list-placement)
- [Ləğv və aktuallıq, Tamga Network sənədləri](https://docs.tamga.network/concepts/revocation)
- [Yoxlama ardıcıllığı və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)

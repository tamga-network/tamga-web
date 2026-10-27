---
title: "HAIP və Token Status List: izləmədən yüksək təminat"
slug: haip-and-token-status-list
description: "HAIP 1.0-ın nəyi sabitlədiyini və Tamga-nın onu necə tətbiq etdiyini, Token Status List-in isə sənədi harada istifadə olunduğunu verən quruma bildirmədən necə ləğv etdiyini izah edirik."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Sources: HAIP 1.0 Final (24 Dec 2025) §3–8 (flows, FAPI2/PKCE/PAR, DPoP + DPoP-Nonce, scope, signed metadata, wallet attestation shared sub, key attestations, x509_hash, DCQL, ECDH-ES P-256, A128GCM+A256GCM, ephemeral keys, aki, JAR request_uri, direct_post.jwt, same-device rules, dc_api.jwt, mso_mdoc / dc+sd-jwt, x5c without trust anchor, status_list, unique unpredictable index, KB-JWT always, ES256 / -7 -9, SHA-256). ADR-0034 (K1–K5, CI1–CI6, renewal order). draft-ietf-oauth-status-list-21 (21 Jun 2026; RFC Editor queue per datatracker 2026-10-08; title "Token Status List (TSL)"): §4 bit packing LSB-first, DEFLATE/ZLIB, bits 1/2/4/8, JWT claims sub/iat/exp/ttl/status_list, aggregation_uri, §7 status types (0x03 application specific), §12 herd privacy. SPEC-CRED-0003 v1.0.0 (cites draft-20): bits=2, 100,000 min, 80% fill, random idx, opaque URI, split by type only, 2-min fixed cadence, no emergency publish, exp = iat + 6 h, ttl 120 (2026-10-09: 1% noise rule removed), prefetch, aggregation recommended, separate status key, Ş1–Ş10, S1–S14, anchors.jsonl today. SPEC-API-0001 D1–D6, INDETERMINATE reasons, ZK NOT_APPLICABLE. ADR-0048 (bits per credential type, identity 1, institutions 2, suspension only where the schema allows; CWT form for mdoc; packages 0.6.0). ADR-0044 implemented in packages 0.4.0. Compression figures computed for this post with zlib level 9 (same call as @tamga-network/sd-jwt). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0 OpenID4VCI, OpenID4VP, SD-JWT VC və ISO mdoc-un açıq buraxdığı çoxsaylı seçimlərdən yüksək təminat tələb edən istifadə üçün vahid dəst müəyyən edir. Hər tərəfin hansı formatları, alqoritmləri, müştəri identifikatorlarını, şifrələmə üsullarını və attestasiyaları dəstəkləməli olduğu bu dəstdə yazılıb. **Token Status List** isə bu dəstin söykəndiyi ləğv mexanizmidir. Hər sənəd böyük, imzalanmış və sıxılmış bit siyahısında bir mövqeyə işarə edir və yoxlayan tərəflər bu siyahını əvvəlcədən endirir. Ona görə sənədin yoxlanması onu verən quruma sənədin harada və nə vaxt göstərildiyini heç vaxt bildirmir.

HAIP 1.0 24 dekabr 2025-ci ildə Final oldu. Token Status List layihəsi 21-ci versiyaya çatıb (21 iyun 2026). Layihənin adı artıq "Token Status List (TSL)"-dir və mətn RFC Editor növbəsində gözləyir.

## HAIP əsas spesifikasiyaların açıq buraxdığı nəyi sabitləyir?

OpenID4VP-yə hərfi-hərfinə əməl edən iki məhsul yenə də bir-biri ilə anlaşa bilməyə bilər. Məsələn, biri sorğuları `x509_san_dns` ilə imzalayarkən digəri yalnız DID qəbul edə bilər, ya da biri cavabı şifrələyərkən digəri şifrələməyə bilər. HAIP bu boşluqları üç axın və iki format üçün bağlayır. Axınlar sənədin verilməsi, yönləndirmə ilə təqdimat və brauzerin Digital Credentials API-si ilə təqdimatdır. Əsas qaydalar bunlardır:

| Sahə | HAIP 1.0 tələbi |
|---|---|
| Formatlar | IETF SD-JWT VC (`dc+sd-jwt`) və ya ISO mdoc (`mso_mdoc`); hansının lazım olduğunu ekosistem müəyyən edir |
| Alqoritmlər | hər kəs ən azı ES256 (COSE -7 və ya -9) və SHA-256 dəstəkləyir |
| Sənədin verilməsi | FAPI 2.0 vasitəsilə PKCE (S256) və PAR ilə avtorizasiya kodu axını; DPoP-a bağlı tokenlər; hər sənəd konfiqurasiyası üçün `scope`; sənəd açara bağlıdırsa, `nonce_endpoint` |
| Cüzdana etibar | PAR və token endpoint-lərində `sub` dəyəri bütün quraşdırmalarda eyni olan cüzdan attestasiyası; açar attestasiyaları |
| Yoxlayan tərəfin kimliyi | imzalanmış sorğular `x509_hash` müştəri identifikatorundan istifadə edir |
| Sorğu | DCQL, `aki` tipli `trusted_authorities` daxil olmaqla |
| Cavab | şifrələnmiş: P-256 üzərində ECDH-ES; yoxlayan tərəf həm A128GCM, həm də A256GCM-i siyahıya alır; hər sorğu üçün yeni açar |
| Yönləndirmə axını | `request_uri` ilə JAR, `direct_post.jwt`, eyni cihazda sorğunu başladan sessiyaya geri qayıtma |
| Brauzer axını | `dc_api.jwt` ilə Digital Credentials API |
| Başlıqdakı açarlar | qurum imzaları, imzalanmış metaməlumat və status siyahısı tokenləri üçün `x5c`; etibar lövbəri əlavə edilmir, özünü imzalayan sertifikatdan istifadə olunmur |
| SD-JWT VC | sənəd cihaza bağlıdırsa, KB-JWT həmişə olur; `status` sahəsi `status_list` istifadə edir |
| Status | hər sənədin özünə məxsus, unikal və təxmin edilə bilməyən mövqeyi olur |

Tamga profilləri bu qaydaların hamısına əməl edir və bir neçə yerdə daha irəli gedir. İcazə verilən yeganə imza alqoritmi ES256-dır və hər sənəd cihaza bağlı olduğu üçün KB-JWT həmişə tələb olunur. Protokolun təfərrüatlarını [OpenID4VCI](/blog/openid4vci-deep-dive) və [OpenID4VP və DCQL](/blog/openid4vp-dcql-deep-dive) yazılarında izah etmişik.

![HAIP qaydaları və Tamga-nın seçimləri](/blog/haip-and-token-status-list/en/fig-haip.png)

## Hansı HAIP qaydaları Tamga-nın dizaynını dəyişdi?

HAIP tələblərini bir-bir öz qaydalarımızla tutuşdurduqda onlardan ikisinin əvvəl bağlanmış qərarlara toxunduğunu gördük. Ona görə hər ikisi [ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) ilə həll edildi və layihə rəhbərliyi bu ADR-i 1 oktyabr 2026-cı ildə təsdiqlədi.

**Yoxlayan tərəfin kimliyi artıq `x509_hash`-dır.** HAIP §5 bu barədə aydın danışır: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". ADR-dən əvvəl Tamga yoxlayan tərəfləri `x509_san_dns:<domen>` istifadə edirdi və etibar siyahısındakı qeydlər də bu sətrə görə saxlanılırdı. Dəyişiklikdən sonra qaydalar belədir:

- yoxlayan tərəfin `client_id` dəyəri giriş sertifikatından hesablanır və heç bir konfiqurasiya faylına əllə yazılmır;
- cüzdan yalnız `x509_hash` qəbul edir və heş yarpaq sertifikatla uyğun gəlmirsə, sorğunu rədd edir; cavab ünvanının sertifikatın SAN sahəsindəki domendə olmasını da tələb etməyə davam edir;
- sertifikat hər yenilənəndə heş dəyişdiyi üçün hər yoxlayan tərəf qeydi daimi `dns_name` daşıyır; nüsxələrin ayrılması, sayta xas psevdonimlər, keçid kartları və təqdimat jurnalı kimi yenilənmədən təsirlənməməli olan hər şey bu ada bağlanır.

Bunun istismar tərəfindəki nəticəsi addımların müəyyən ardıcıllıqla atılmasıdır. Sertifikat yenilənəndə əvvəlcə yeni sertifikat reyestr mənbəyinə daxil edilir və etibar siyahısı yenidən dərc olunur. Yoxlayan tərəf yeni sertifikata yalnız bundan sonra keçir. Tez keçsə, cüzdanlar tanımadıqları `client_id` görür və sorğunu rədd edir.

**Cüzdan attestasiyasının subyekti ortaqdır.** HAIP §4.4.1-ə görə attestasiyadakı `sub` "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation" və PAR-dakı `client_id` də bu dəyərdir. Şəbəkədəki cüzdanlardan biri olan Tamga Wallet-in provayderi əvvəllər bu sahəyə hər əməliyyatda yenidən yaradılan açarın barmaq izini yazırdı. İndi cüzdan məhsulunun identifikatorunu yazır. Quraşdırmalar yenə də yalnız hər əməliyyatda yeni yaradılan `cnf` açarı və bir-biri ilə əlaqələndirilə bilməyən yeni status qeydi ilə fərqləndirilir. Beləliklə qurumun qeydə aldığı məlumat cüzdan məhsulunu göstərir və telefon haqqında heç nə demir.

## Token Status List statusu necə kodlaşdırır?

Sənəd siyahıdakı yerini göstərən işarə daşıyır, bitlər isə siyahıdadır:

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

`sub` dəyəri sənəddəki `uri` ilə eyni olmalıdır. Eyni sənədin mdoc nüsxəsi eyni `idx` dəyərindən istifadə edir, amma siyahının CWT formasına (`application/statuslist+cwt`) işarə edir və bu forma öz qeyri-şəffaf ünvanında yerləşir. Hər iki forma eyni bitləri daşıyır və eyni dərcdə imzalanır ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). `lst` sahəsi layihənin müəyyən etdiyi üç addımla qurulur. Əvvəlcə hər sənəd üçün `bits` qədər bit bayt massivinə yazılır və hər bayt **ən kiçik dərəcəli bitdən** başlayaraq doldurulur. Sonra massiv ZLIB formatında DEFLATE ilə sıxılır və nəticə base64url ilə kodlaşdırılır.

Kiçik bir nümunə götürək. Qurumun 16 qeydli və `bits: 2` olan siyahısında 1-ci indeks ləğv edilib, 2-ci indeks dayandırılıb və 6-cı indeks ləğv edilib:

```text title="Packing 2-bit statuses (computed for this post)"
byte 0 = idx 3..0  → 00 10 01 00 → 0x24
byte 1 = idx 7..4  → 00 01 00 00 → 0x10
byte 2 = idx 11..8 → 0x00
byte 3 = idx 15..12 → 0x00

zlib(level 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` olan siyahıda `idx` indeksini oxumaq üçün `idx >> 2` nömrəli bayt götürülür və `(idx & 3) × 2` bit sağa sürüşdürülür. `idx` 48213 üçün bu, 12053-cü baytın 2-ci və 3-cü bitlərinə uyğun gəlir. `bits: 1` olan siyahıda isə `idx >> 3` nömrəli baytın `idx & 7`-ci bitinə baxılır. Siyahının ölçüsü də problem yaratmır. Tamga siyahısında ən azı 100 000 qeyd olur və bu siyahı sıxılmadan iki bitlə 25 000 bayt, bir bitlə 12 500 bayt tutur. Bu yazı üçün apardığımız sınaqda zlib 9-cu səviyyədə bütün qeydləri etibarlı olan siyahını 46 bayta, eyni siyahının 200 səpələnmiş ləğv olan halını isə 439 bayta sıxdı.

![Sənədin statusunu dörd addımda oxumaq](/blog/haip-and-token-status-list/en/fig-bits.png)

## Status dəyərləri Tamga-da nə deməkdir?

| Dəyər | Layihədəki ad | Tamga-da |
|---|---|---|
| `0x00` | VALID | etibarlı |
| `0x01` | INVALID | ləğv edilib, həmişəlik |
| `0x02` | SUSPENDED | dayandırılıb, geri qaytarıla bilər; yalnız sxemi icazə verən növlərdə |
| `0x03` | tətbiqə xas | istifadə olunmur; ləğv edilmiş kimi qəbul edilir |

Layihə `bits` üçün 1, 2, 4 və ya 8 dəyərinə icazə verir. Tamga bu dəyəri paketlərin 0.6.0 versiyasından bəri sənəd növünə görə müəyyən edir ([ADR-0048](https://docs.tamga.network/adr/0048-identity-no-suspension-mdoc-cwt-status)). Şəxsiyyət xidmətinin sənədləri Aİ-nin şəxsi identifikasiya məlumatları üçün qoyduğu qaydaya uyğun olaraq dayandırıla bilməz. Ona görə bu sənədlərin siyahıları bir bitdən istifadə edir, yəni sənəd ya etibarlıdır, ya da ləğv edilib və ləğv həmişəlikdir. Qurumların siyahıları isə iki bitdən istifadə edir, çünki dayandırmanın ayrıca dəyərə ehtiyacı var. Diplom barədə araşdırma başladan qurum araşdırma davam edərkən diplomu müvəqqəti dayandırmaq istəyə bilər. Qurum siyahılarında da `0x02` yalnız sxemi dayandırmaya icazə verən növlər üçün yazılır (`suspension_allowed`, bu gün diplom). Başqa növdə dayandırma dəyəri görünsə, siyahı pozulmuş sayılır və rədd edilir. Dörd və ya səkkiz bit siyahını heç bir fayda vermədən iki və ya dörd dəfə böyüdərdi. Yoxlayan tərəf `0x00`-dan başqa hər dəyəri rədd kimi qiymətləndirir, amma "dayandırılıb" və "ləğv edilib" nəticələrini istifadəçiyə ayrı-ayrı göstərir.

## Status siyahısı izləmə kanalına çevrilməkdən necə qorunur?

Status siyahısının məxfiliyi kütlədən gəlir. Siyahını endirən yoxlayan tərəf onun istənilən qeydini yoxlayır ola bilər. Tamga qaydaları bu kütlənin həqiqətən yaranmasını təmin edir. Eyni qaydaların şəxsin baxış bucağından izahını [İzləmədən ləğv](/blog/status-list-privacy) yazısında tapa bilərsiniz.

- **Böyük siyahılar.** Hər siyahıda ən azı 100 000 qeyd olur və qeydlərin 80%-i paylananda yeni siyahı açılır. İstifadə olunmayan mövqelər də etibarlı sənədlərlə eyni `0x00` dəyərini daşıdığı üçün kənardan baxan şəxs neçə mövqenin istifadədə olduğunu görə bilmir.
- **Təsadüfi indekslər.** `idx` siyahının tutumu daxilində təsadüfi seçilir. Ardıcıl nömrə, `awarding_date` gizli qalsa belə, qeydiyyat sırasını və təxmini tarixi üzə çıxarardı. HAIP də hər sənədin özünə məxsus, unikal və təxmin edilə bilməyən mövqeyi olmasını tələb edir.
- **Mənasız ünvanlar.** Siyahı ünvanı hər təqdimatda göründüyü üçün o da məlumat sahəsi sayılır. `/sl/2026-engineering` kimi ünvan ili və fakültəni üzə çıxarardı. Ona görə Tamga-da siyahı identifikatorları təsadüfi sətirlərdən ibarətdir və hansı identifikatorun nəyə uyğun gəldiyini yalnız qurum bilir.
- **Yalnız növə görə bölmə.** Yeni siyahı əvvəlki siyahı dolanda açılır. Siyahılar heç vaxt ilə və ya şöbəyə görə ayrılmır.
- **Nüsxələr indeksi bölüşmür.** Paketdəki on nüsxənin hər birinin öz təsadüfi indeksi var. Ona görə iki yoxlayan tərəf təqdimatları `idx` üzərindən bir-biri ilə əlaqələndirə bilmir.

Bu üsulun quruluşundan gələn bir məhdudiyyəti var və biz onu açıq yazırıq. Kiçik qurumda kütlə həmin qurumun özünün verdiyi sənədlərin sayı qədərdir, çünki `iss` sahəsi qurumu onsuz da adı ilə göstərir.

Məxfiliyin digər yarısı siyahının nə vaxt endirildiyi ilə bağlıdır. Yoxlayan tərəf siyahını hər yoxlamada yenidən endirsəydi, qurum həmin an kiminsə onun sənədlərindən birini yoxladığını öyrənərdi. Sorğunun gəldiyi IP ünvanı da çox vaxt bunun kim olduğunu deyərdi. Ona görə Tamga yoxlayan tərəfləri siyahıları müəyyən fasilələrlə **əvvəlcədən endirir** və yoxlamanı keşdən aparır. `@tamga-network/verifier` bunu standart olaraq edir və hər yoxlamada endirmə yalnız açıq şəkildə aktivləşdirildikdə işə düşür. Layihənin istəyə bağlı `aggregation_uri` sahəsi qurumun bütün status siyahılarını bir ünvanda sadalayır. Əvvəlcədən endirməni asanlaşdırdığı üçün Tamga bu sahədən istifadəni tövsiyə edir.

## Siyahı nə qədər tez-tez dərc olunur və nüsxə nə qədər etibarlıdır?

| Qayda | Tamga dəyəri | Səbəb |
|---|---|---|
| Dərc intervalı | sabit, 2 dəqiqə; heç nə dəyişməsə də saxlanılır | yalnız ləğv olanda dərc etmək "indicə ləğv baş verdi" məlumatını sızdırardı; qısa interval ləğvin bir neçə dəqiqə ərzində görünməsini təmin edir |
| Təcili dərc | edilmir | sabit ritmi pozardı; təcili hallarda qurumun sertifikatı dayandırılır və ya sxem ləğv edilir |
| `ttl` | 120 san (dərc intervalı) | yoxlayan tərəfin əlindəki nüsxədən yenidən endirmədən istifadə edə biləcəyi müddət |
| `exp` | `iat` + 6 saat | mütləq yuxarı hədd; status serverindəki qısa fasilə yoxlamanı dayandırmasın deyə; istinad yoxlayan tərəf siyasətlərindəki ən yüksək token yaşına bərabərdir |
| Keş başlıqları | `exp` və `ttl` olduqda nəzərə alınmır | qərarı tokenin öz sahələri verir |
| İmza açarı | sənəd açarından ayrı, eyni X.509 zəncirində | status açarı sızarsa, saxta status dərc etmək olar, amma saxta diplom vermək olmaz |

Hər dərc əvvəlcə status serverinə yazılır, sonra isə dərcin heşi qeydə alınır. Bu gün həmin qeyd etibar siyahısı nəşriyyatçısının lövbər jurnalında saxlanılır, reyestrdən (ledger) istifadə isə sonrakı mərhələnin işidir ([niyə hələ blokçeyn yoxdur](/blog/why-no-blockchain-yet)). Yoxlayan tərəf tokenin heşinin qeyddəki heşlə üst-üstə düşdüyünü və versiya nömrəsinin geri getmədiyini yoxlayır. Beləliklə qurum ləğv etdiyi sənədi etibarlı göstərmək üçün siyahısını səssizcə köhnə versiyaya qaytara bilmir.

## Yoxlaya bilmədikdə yoxlayan tərəf hansı nəticəyə gəlir?

Ləğv yoxlaması Tamga-nın yoxlama ardıcıllığında D1–D6 addımları ilə aparılır. Yoxlayan tərəf əvvəlcə `status.status_list` sahəsini oxuyur və tokeni əvvəlcədən endirilmiş keşdən götürür. Tokenin imzasını etibar siyahısında həmin qurum üçün qeydə alınmış status açarı ilə yoxlayır. Sonra `sub` dəyərini, siyahının təzəliyini və qeydə alınmış heşi yoxlayır və sonda bitləri oxuyur. Siyahı endirilə bilməyibsə və ya `exp` müddəti keçibsə, nəticə **INDETERMINATE** olur və yanında `STATUS_UNREACHABLE` və ya `STATUS_STALE` kimi səbəb göstərilir. "Bu diplom ləğv edilib" və "hazırda yoxlaya bilmirəm" insan barəsində fərqli qərarlara gətirib çıxarır, ona görə ikisi fərqli göstərilməlidir. Oflayn olanda yoxlayan tərəf keşdəki tokenlə və bilinən son qeydlə işi davam etdirə bilər. Bu halda son sinxronizasiyanın vaxtını göstərir və nəticəni "oflayn yoxlanılıb" kimi işarələyir.

Sıfır bilikli yaş sübutları indeksi olmayan yeganə haldır. Sübut siyahıda mövqeyi müəyyən edə biləcək heç bir məlumatı açmadığı üçün status "tətbiq olunmur" kimi bildirilir. Ona görə sıfır bilikli sübut yalnız qısaömürlü nüsxələrlə təqdim olunur. Bu nüsxələr ən çoxu 24 saat etibarlıdır və sənəd ləğv ediləndə yenilənmir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Paketlərin 0.4.0 versiyasından bəri belə işləyir. Nüsxələr status siyahısında qeyd daşımır, cüzdan onları şəxsdən soruşmadan yeniləyir və qısa ömürləri ləğv yoxlamasını əvəz edir. Belə nüsxəyə əsaslanmayan sıfır bilikli sübutu yoxlayan tərəf yalnız siyasəti buna açıq icazə verdikdə qəbul edir ([ADR-0032](https://docs.tamga.network/adr/0032-zk-mdoc-presentation)).

## Tez-tez verilən suallar

### HAIP qanundurmu?

Xeyr. HAIP OpenID Foundation-ın dərc etdiyi spesifikasiyadır. Avropa rəqəmsal şəxsiyyət ekosistemi müxtəlif istehsalçıların cüzdanları, qurumları və yoxlayan tərəfləri birlikdə işləyə bilsin deyə bu spesifikasiyaya söykənir.

### Yoxlayan tərəf niyə quruma "bu sənəd hələ də etibarlıdırmı" deyə soruşmur?

Məlumat elə bu sualın özü ilə sızardı. Qurum hansı sənədin, nə vaxt və çox vaxt kim tərəfindən yoxlandığını öyrənərdi. Status siyahısı istifadə edildikdə yoxlayan tərəf hər kəsin statusunun nüsxəsini əlində saxlayır və heç kimdən heç nə soruşmur.

### Dayandırma öz-özünə bitirmi?

Xeyr. Dayandırılmış sənəd qurum bitləri yenidən etibarlı dəyərə qaytarana və ya sənədi ləğv edənə qədər dayandırılmış qalır. Yoxlayan tərəf yalnız həmin anki dəyəri oxuyur.

### Yoxlayan tərəf on nüsxənin eyni şəxsə aid olduğunu anlaya bilərmi?

Status siyahısına baxaraq anlaya bilməz. Hər nüsxənin öz təsadüfi indeksi var və nüsxələr arasındakı uyğunluq qurumun verilənlər bazasında qalır. Sənəd ləğv ediləndə on indeksin hamısı eyni planlı dərcdə dəyişir və həmin intervalda dəyişən bütün digər qeydlərlə birlikdə görünür.

## Mənbələr

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 dekabr 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, iyun 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 9 iyul 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 uyğunluğu, Tamga Network sənədləri](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)
- [Ləğv və status siyahısı (SPEC-CRED-0003), Tamga Network sənədləri](https://docs.tamga.network/specifications/status-list)
- [ADR-0008: Status siyahısının yerləşdirilməsi, Tamga Network sənədləri](https://docs.tamga.network/adr/0008-status-list-placement)
- [Ləğv və aktuallıq, Tamga Network sənədləri](https://docs.tamga.network/concepts/revocation)
- [Yoxlama ardıcıllığı və API (SPEC-API-0001), Tamga Network sənədləri](https://docs.tamga.network/specifications/verification-api)

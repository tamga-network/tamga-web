---
title: "İmzalı etibar siyahısı necə işləyir: qeydiyyatdan yoxlamaya qədər"
slug: how-trust-lists-work
description: "Tamga Network-un imzalı etibar siyahıları necə işləyir: iki səviyyə, imzalama, dərc tezliyi, aktuallıq, anker jurnalı və yoxlayan tərəfin nələri yoxladığı."
date: 2026-10-08
lang: az
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Sources: SPEC-TRUST-0001 1.0.0 (§1 principles: JWS ES256 x5c, .json for humans only, version + previous_version_hash, next_update ≤ 90 days, change within 24 h, anchors hourly; §2 file layout; §3 lotl fields; §4 tl fields, issuer entry, status vocabulary, record never removed; §5 anchor log, checkpoint at 500 lines; §6 loader order, environment, YES/NO/UNKNOWN; §8 TL1–TL12; security notes: single operator signature, public log, CHANGELOG, quarterly transparency report, audit; open issues: ETSI XML export, ≥2 rolling keys + KMS before the pilot). SPEC-API-0001 §1 (A3b issuerId from certificate, C1/C2 at iat, C2 cannot be skipped, C3, D5 anchor check), §2.1 three results. Guides join-as-institution (registrar, 24 h, WRPRC), sandbox (environment: sandbox). Live files checked 2026-10-08: lotl.json/tl-tr.json list_format_version 1.0, operator.status provisional, next_update 90 days after issued_at, one anchor signing key. External: EU LOTL XML, CID (EU) 2015/1505, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List draft. -->

İmzalı etibar siyahısı siyahı operatorunun imzaladığı fayldır; o, hansı qurumların hansı növ rəqəmsal sənədləri verə biləcəyini, hansı yoxlayan tərəflərin qeydiyyatda olduğunu və hansı cüzdan provayderlərinin tanındığını göstərir. Tamga Network bu siyahıları iki səviyyədə dərc edir: etibarlı siyahılar siyahısı (`lotl.jws`) və Türkiyə üçün ölkə siyahısı (`tl-tr.jws`). Yoxlayan tərəf əvvəlcədən bir kök barmaq izinə etibar edir, siyahıların imzalarını, versiya zəncirini və aktuallığını yoxlayır, sonra isə hər rəqəmsal sənəd barədə bir sual verir: bu qurum həmin sənədi imzaladığı zaman qeydiyyatda idimi və bu növ rəqəmsal sənəd üçün səlahiyyətli idimi?

## Siyahıların iki səviyyəsi hansılardır?

Model Avropa İttifaqından (Aİ) götürülüb. Avropa Komissiyası üzv dövlətlərin etibarlı siyahılarının siyahısını ([Aİ LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)) dərc edir, hər dövlət isə öz milli siyahısını [Komissiyanın (Aİ) 2015/1505 saylı İcra Qərarı](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) və ETSI TS 119 612 ilə müəyyən edilmiş formatda dərc edir. Tamga da eyni quruluşu izləyir:

| Siyahı | Nəyi ehtiva edir | Ünvan |
|---|---|---|
| Etibarlı siyahılar siyahısı (LOTL) | ölkə siyahılarının ünvanları və imza açarları, cüzdan provayderləri, sxemlər kataloqu, qəbul edilmiş sıfır bilik sübutu dövrələri (zero-knowledge circuits) | `trust.tamga.network/lotl.jws` |
| Ölkə siyahısı | həmin ölkənin kök sertifikatları, qurumları və yoxlayan tərəfləri | `trust.tamga.network/tl-tr.jws` |

![Sabitlənmiş kök barmaq izindən LOTL və ölkə siyahısı vasitəsilə qurum qeydinə və rəqəmsal sənədə qədər](/blog/how-trust-lists-work/en/fig-zincir.png)

Zəncir yoxlayan tərəfdə artıq olan bir şeydən başlayır: onun konfiqurasiyasına daxil edilmiş, LOTL-u imzalayan sertifikatın SHA-256 barmaq izi. Barmaq izi [tamga.network/trust-anchor](https://tamga.network/trust-anchor) ünvanında dərc olunub. Siyahı serverinin özünə etibar edilmir. Siyahını düzgün ünvandan yükləmək kifayət deyil; onun imzası həmin barmaq izinə uyğun gəlməlidir.

Daha sonra LOTL hər ölkə siyahısını kimin imzaladığını göstərir. Hazırda yeganə aktiv siyahı Türkiyə siyahısıdır və onu milli orqan adından müvəqqəti olaraq Tamga idarə edir; məlumat strukturlarında digər dövlətlər üçün artıq yer nəzərdə tutulub.

## Qurumun qeydində nə var?

> **Qeyd:** Sadələşdirilmiş nümunə. Qurum uydurmadır, identifikatorlar və barmaq izləri qısaldılıb, bəzi sahələr isə çıxarılıb. Real format [etibar siyahısı spesifikasiyasında](https://docs.tamga.network/specifications/trust-lists) verilib.

```json title="Simplified example: one institution entry in tl-tr"
{
  "issuer_id": "0x5be1…",
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "cert_fingerprint_sha256": "a41f…",
  "status": "ACTIVE",
  "valid_from": "2026-10-01T00:00:00Z",
  "valid_until": "2028-10-01T00:00:00Z",
  "status_history": [
    { "status": "ACTIVE", "since": "2026-10-01T00:00:00Z", "reason": "initial-registration" }
  ],
  "schema_authorizations": [
    {
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "allowed": true,
      "valid_from": "2026-10-01T00:00:00Z",
      "valid_until": null
    }
  ],
  "status_list_base": "https://status.tamga.network/"
}
```

Əsas yükü bir neçə sahə daşıyır:

- `issuer_id` qurumun sertifikatının barmaq izindən hesablanır, ona görə də onu seçmək və ya kopyalamaq mümkün deyil.
- `class` qurumun hansı növ rəqəmsal sənəd verdiyini göstərir: dövlət orqanının rəqəmsal sənədi (`PUB`), ixtisaslı rəqəmsal sənəd (`QUALIFIED`) və ya adi attestasiya (`EAA`). `assurance` onun təminat səviyyəsidir, `I1` ilə `I3` arasında.
- `schema_authorizations` qurumun verə biləcəyi rəqəmsal sənəd növlərini sadalayır, hər birinin öz zaman çərçivəsi var. Etibarlı qeydi olan bilet satıcısı belə yoxlamadan keçən diplom verə bilməz.
- `status_history` yalnız əlavə olunur, heç vaxt yenidən yazılmır.

Qeydin nəyi ehtiva etmədiyi də eyni dərəcədə düşünülmüşdür: tələbə adları yoxdur, rəqəmsal sənəd heşləri yoxdur, saylar yoxdur. Qayda belədir: heç bir siyahı, anker jurnalı və ya dəyişiklik jurnalı fərdi məlumatlar daşımır (TL11).

## Qurum siyahıya necə daxil olur?

Qurum qeydiyyat məlumatları və sertifikat imzalama sorğusu ilə müraciət edir. Qeydiyyatçı müraciəti yoxlayır və bütün çatışmayan sahələri bir dəfəyə bildirir; kök sertifikat orqanı qurumun sertifikatını imzalayır; qurum siyahıya əlavə edilir və siyahı yenidən imzalanır. Dəyişiklik 24 saat ərzində qüvvəyə minir. Qurum tərəfindən atılan addımlar [Qurum Tamga Network-a necə qoşulur](/blog/join-as-an-institution) məqaləsində təsvir olunub.

Hər dərc zamanı dərc edən tərəf həmçinin yoxlayan tərəfin hər istifadə halı və hər sənədi verən qurum üçün `trust.tamga.network/wrprc/` altında qeydiyyat sertifikatı (ETSI TS 119 475) yaradır. Onun məzmunu yalnız imzalı siyahıdan götürülür, buna görə də rəqəmsal cüzdan yoxlayan tərəfin qeydiyyatını onunla da yoxlaya bilər.

## Siyahı necə imzalanır və dərc olunur?

Hər siyahı ES256 ilə imzalanmış kompakt JWS-dir, operatorun sertifikatı `x5c` başlığında yerləşir. Yanında insanların oxuması üçün `.json` nüsxəsi var; proqram təminatı yalnız `.jws` faylından istifadə edir.

Tarixçənin dürüst qalmasını üç qayda təmin edir:

1. **Versiya yalnız artır.** Köhnə versiyanı yenisi kimi yenidən təqdim etmək olmaz.
2. **Hər versiya əvvəlkinin heşini daşıyır** (`previous_version_hash`), beləliklə versiyalar zəncir yaradır və boşluq və ya yenidən yazılma üzə çıxır.
3. **Heç nə silinmir.** Geri çəkilmiş qurum yeni statusla siyahıda qalır; əvvəlki versiyalar `archive/` daxilində saxlanılır.

![Hər faylın nə vaxt dərc olunduğu və ona tətbiq olunan qayda](/blog/how-trust-lists-work/en/fig-yayin.png)

Heç nə dəyişməsə belə, siyahılar ən azı 90 gündə bir yenidən imzalanır ki, oxucu sakit siyahını tərk edilmiş siyahıdan həmişə ayıra bilsin. Eyni yerdə yerləşən açıq `CHANGELOG.md` hər yığımı (build) qeydə alır.

## Anker jurnalı nə üçündür?

Bəzi məlumatlar hər dəfə bütün siyahını yenidən imzalamaq üçün çox tez-tez dəyişir; ilk növbədə qurumların dərc etdiyi ləğv siyahıları. Onlar `anchors.jsonl`, yəni anker jurnalına (anchor log) düşür: hər hadisə üçün bir imzalı sətir, hər sətir heş vasitəsilə əvvəlki sətirlə əlaqələndirilir.

Sətir, məsələn, hansısa qurumun müəyyən məzmun heşi ilə ləğv siyahısının N versiyasını dərc etdiyini qeydə alır. Yoxlayan tərəf sonradan həmin ləğv siyahısını oxuyanda heşi anker ilə müqayisə edir. Heş uyğun gəlmirsə və ya versiya geriyə gedibsə, rəqəmsal sənəd yoxlamadan keçmir; yoxlayan tərəfin keşdəki nüsxəsi sadəcə ən yeni ankerdən köhnədirsə, nüsxə yenilənənə qədər nəticə "hazırda yoxlamaq mümkün deyil" olur. Yoxlayan tərəf ləğv siyahısının həqiqətən qurumdan gəldiyini və köhnə versiya ilə əvəz edilmədiyini məhz belə bilir.

Jurnala saatda ən azı bir sətir əlavə olunur; başqa heç nə baş verməyibsə, nəbz (heartbeat) sətri yazılır. Jurnal 500 sətri keçəndə operator sətirləri arxivə köçürür və yeni jurnalı arxivin son sətrinə və arxiv faylının heşinə istinad edən imzalı nəzarət nöqtəsi ilə başladır. Heç bir sətir heç vaxt silinmir və bütün tarixçəni arxivlərdən bərpa etmək mümkündür.

## Siyahı nə dərəcədə aktual olmalıdır?

Hər siyahıda `next_update` var. Xidmətlər siyahıları müntəzəm aralıqlarla yenidən yükləyir, yoxlayan tərəflər isə ləğv siyahılarını əvvəlcədən endirib keşdə saxlayır. Yoxlama anında heç nə endirilmir; qurumun öz rəqəmsal sənədlərinin harada təqdim olunduğunu heç vaxt öyrənməməsinin səbəbi də budur ([İzləmədən ləğv](/blog/status-list-privacy)).

Siyahını əldə etmək mümkün deyilsə və ya onun `next_update` vaxtı keçibsə, yoxlayan tərəf təxmin etmir. Nəticə "hazırda yoxlamaq mümkün deyil" (`INDETERMINATE`) olur, heç vaxt nə qəbul, nə də rədd (TL5). Server əlçatan olmadığına görə diplom saxta elan edilmir.

## Yoxlayan tərəf addım-addım nəyi yoxlayır?

Yoxlamalar iki qrupa bölünür. Əvvəlcə, siyahılar yüklənəndə:

![Etibar siyahısı yüklənəndə nə yoxlanılır və uğursuz olduqda nə baş verir](/blog/how-trust-lists-work/en/fig-denetim.png)

Şəbəkə yoxlaması test üçün vacibdir: sınaq mühitinin (sandbox) siyahılarında `"environment": "sandbox"` göstərilir və real şəbəkə üçün qurulmuş yoxlayan tərəf onlarda dayanır. Sınaq mühitinin rəqəmsal sənədi real yoxlayan tərəfdə yoxlamadan keçə bilməz.

Sonra hər rəqəmsal sənəd üçün yoxlama prosesinin etibar qatı ([yoxlama API-si](https://docs.tamga.network/specifications/verification-api)) soruşur:

| Addım | Sual |
|---|---|
| A3b | Bu hansı qurumdur? Rəqəmsal sənədi imzalayan sertifikatdan müəyyən edilir; rəqəmsal sənədin özü haqqında iddia etdikləri nəzərə alınmır |
| C1 | Rəqəmsal sənəd verildiyi anda qurum qəbul edilə bilən idimi? |
| C2 | Qurum həmin anda bu növ rəqəmsal sənəd üçün səlahiyyətli idimi? Bu addımı söndürmək olmaz |
| C3 | Yoxlayan tərəfin ölkəsi qurumun ölkəsini tanıyırmı? |
| D5 | Ləğv siyahısı jurnaldakı ankerə uyğun gəlirmi? |

C1 və C2 bugünə deyil, rəqəmsal sənədin verilmə vaxtına baxır. Universitetin qeydi sonradan istifadədən çıxarılarsa, onun aktiv olduğu dövrdə verdiyi diplomlar etibarlı qalır. Açarı ələ keçirilibsə, qeyd `invalidates_from` tarixi ilə ləğv edilir və yalnız həmin tarixdən etibarən verilmiş rəqəmsal sənədlər yoxlamadan keçmir. Yoxlama keçmişə aiddir: əsas olan verilmə günü siyahının vəziyyətidir.

Kod siyahı fayllarını heç vaxt birbaşa şərh etmir. `@tamga-network/trust` paketi tək bir interfeys – `TrustSource` təqdim edir; o, `YES`, `NO` və ya `UNKNOWN` cavabını verir; `UNKNOWN` nəticəsi `INDETERMINATE` olur. İstifadə qaydası: [Etibar siyahılarını oxuyun](https://docs.tamga.network/guides/read-trust-lists).

## Bu gün açığını desək, hansı məhdudiyyətlər var?

- **Bir imzalayan.** Anker bir operatorun imzasına əsaslanır. Operator və qurum birlikdə hərəkət etsəydi, müxtəlif oxuculara müxtəlif versiyalar göstərə bilərdilər. Açıq jurnal, dəyişiklik jurnalı, rüblük şəffaflıq hesabatı və müstəqil audit bundan çəkindirir, lakin bunu qeyri-mümkün etmir. Bu boşluğu ən azı iki müstəqil operator tələb edən ortaq reyestr (ledger) bağlayır ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).
- **Hələlik bir açar.** Qaydalar ən azı iki növbəli imza sertifikatı və rotasiyaların 30 gün əvvəldən elan edilməsini tələb edir. Canlı siyahılar birindən istifadə edir; ikinci açar və açar idarəetmə xidməti pilotdan əvvələ planlaşdırılıb.
- **Hələ ETSI XML yoxdur.** Sahələr ETSI TS 119 612-yə uyğunlaşdırılıb və statusların ETSI qarşılığı var, lakin XML ixracı hələ də açıq məsələlər siyahısındadır. Cüzdan provayderləri üçün ETSI TS 119 602 görünüşləri aktivləşdirildikdə dərc oluna bilər.

## Tez-tez verilən suallar

### Etibar siyahısını özüm oxuya bilərəmmi?

Bəli. `trust.tamga.network/tl-tr.json` və `lotl.json` oxunaqlı nüsxələrdir. Proqram təminatı imzalı `.jws` fayllarını imzanı, zənciri və aktuallığı yoxlayan `TrustSource` vasitəsilə yükləməlidir.

### Etibar siyahısında fərdi məlumatlar varmı?

Xeyr. Orada qurumların və yoxlayan tərəflərin adları, sertifikat barmaq izləri, statuslar, tarixlər, ünvanlar və rəqəmsal sənəd növləri saxlanılır. Şəxslər, rəqəmsal sənədlərin məzmunu və rəqəmsal sənədlərin heşləri orada yoxdur.

### Qurum şəbəkədən çıxdıqda nə baş verir?

Onun qeydi silinmir. Status dəyişir (məsələn, `RETIRED` və ya `REVOKED` olaraq) və bu dəyişiklik onun tarixçəsinə əlavə olunur. Beləliklə, əvvəllər verilmiş rəqəmsal sənədlər yenə də verildikləri tarixdə siyahının vəziyyətinə əsasən qiymətləndirilə bilər.

### Siyahı nə qədər tez-tez yenilənir?

Dəyişiklik 24 saat ərzində dərc olunur və hər siyahı ən azı 90 gündən bir yenidən imzalanır. Lövbər jurnalına (anchor log) ən azı saatda bir dəfə yeni sətir əlavə olunur.

### Bu, Aİ-nin etibar siyahısı ilə eynidirmi?

O, eyni iki səviyyəli modelə əsaslanır və sahələri ETSI TS 119 612 standartına uyğunlaşdırılıb. Lakin bu, Aİ siyahısı deyil: onu heç bir Aİ orqanı dərc etmir və Tamga onun Aİ statusuna malik olduğunu iddia etmir.

## Mənbələr

- [Aİ etibar siyahılarının siyahısı (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [Komissiyanın İcra Qərarı (Aİ) 2015/1505: etibar siyahılarının formatları](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Etibar siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth işçi qrupunun layihəsi)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: etibar siyahısının spesifikasiyası](https://docs.tamga.network/specifications/trust-lists) · [Etibar siyahıları və federasiya](https://docs.tamga.network/concepts/trust-lists) · [Etibar siyahılarını oxuyun](https://docs.tamga.network/guides/read-trust-lists)
- [Etibar siyahıları](/learn/trust-lists) · [Federasiya](/learn/federation)

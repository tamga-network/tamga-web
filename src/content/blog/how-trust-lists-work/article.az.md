---
title: "İmzalı etibar siyahısı necə işləyir: qeydiyyatdan yoxlamaya qədər"
slug: how-trust-lists-work
description: "Tamga Network-un imzalı etibar siyahılarını izah edirik: iki səviyyəni, imzanı, dərc qaydasını, aktuallığı, anker jurnalını və yoxlayan tərəfin addım-addım nələri yoxladığını."
date: 2026-10-08
lang: az
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Sources: SPEC-TRUST-0001 1.0.0 (§1 principles: JWS ES256 x5c, .json for humans only, version + previous_version_hash, next_update ≤ 90 days, change within 24 h, anchors hourly; §2 file layout; §3 lotl fields; §4 tl fields, issuer entry, status vocabulary, record never removed; §5 anchor log, checkpoint at 500 lines; §6 loader order, environment, YES/NO/UNKNOWN; §8 TL1–TL12; security notes: single operator signature, public log, CHANGELOG, quarterly transparency report, audit; open issues: ETSI XML export, ≥2 rolling keys + KMS before the pilot). SPEC-API-0001 §1 (A3b issuerId from certificate, C1/C2 at iat, C2 cannot be skipped, C3, D5 anchor check), §2.1 three results. Guides join-as-institution (registrar, 24 h, WRPRC), sandbox (environment: sandbox). Live files checked 2026-10-08 and 2026-10-23 (anchor_signing_keys: one ACTIVE entry): lotl.json/tl-tr.json list_format_version 1.0, operator.status provisional, next_update 90 days after issued_at, one anchor signing key. External: EU LOTL XML, CID (EU) 2015/1505, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List draft. -->

İmzalı etibar siyahısı siyahı operatorunun imzaladığı fayldır. Hansı qurumun hansı sənəd növünü verə biləcəyi, hansı yoxlayan tərəflərin qeydiyyatda olduğu və hansı cüzdan provayderlərinin tanındığı bu faylda yazılır. Tamga Network bu siyahıları iki səviyyədə dərc edir. Yuxarıda siyahılar siyahısı (`lotl.jws`), aşağıda isə Türkiyə üçün ölkə siyahısı (`tl-tr.jws`) yerləşir. Yoxlayan tərəf əvvəlcədən yalnız bir kök barmaq izinə etibar edir. Siyahıların imzasını, versiya zəncirini və aktuallığını yoxladıqdan sonra hər sənəd üçün bir sual verir: Bu qurum sənədi imzaladığı anda qeydiyyatda idimi və bu sənəd növünü verməyə səlahiyyəti var idimi?

## Siyahıların iki səviyyəsi hansılardır?

Bu model Aİ-dən gəlir. Avropa Komissiyası üzv dövlətlərin etibar siyahılarını göstərən siyahı dərc edir ([Aİ LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)). Hər dövlət də öz milli siyahısını [(Aİ) 2015/1505 saylı İcra Qərarı](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) və ETSI TS 119 612-də müəyyən edilmiş formatda dərc edir. Tamga da eyni quruluşdan istifadə edir:

| Siyahı | Nəyi ehtiva edir | Ünvan |
|---|---|---|
| Etibarlı siyahılar siyahısı (LOTL) | ölkə siyahılarının ünvanları və imza açarları, cüzdan provayderləri, sxemlər kataloqu, qəbul edilmiş sıfır bilik sübutu sxemləri (zero-knowledge circuits) | `trust.tamga.network/lotl.jws` |
| Ölkə siyahısı | həmin ölkənin kök sertifikatları, qurumları və yoxlayan tərəfləri | `trust.tamga.network/tl-tr.jws` |

![Sabitlənmiş kök barmaq izindən LOTL və ölkə siyahısı vasitəsilə qurum qeydinə və rəqəmsal sənədə qədər](/blog/how-trust-lists-work/en/fig-zincir.png)

Zəncir yoxlayan tərəfin artıq əlində olan məlumatla başlayır. Bu, LOTL-u imzalayan sertifikatın SHA-256 barmaq izidir və yoxlayan tərəfin konfiqurasiyasına daxil edilib. Barmaq izi [tamga.network/trust-anchor](https://tamga.network/trust-anchor) ünvanında da dərc olunur. Siyahı serverinin özünə isə etibar edilmir. Siyahının qəbul edilməsi üçün onun düzgün ünvandan endirilməsi kifayət deyil, imzası da bu barmaq izi ilə uyğun gəlməlidir.

LOTL da hər ölkə siyahısını kimin imzaladığını göstərir. Bu gün aktiv olan yeganə siyahı Türkiyə siyahısıdır və Tamga onu milli orqan adından müvəqqəti olaraq idarə edir. Məlumat strukturlarında digər dövlətlər üçün də artıq yer ayrılıb.

## Qurumun qeydində nə var?

> **Qeyd:** Aşağıdakı nümunə sadələşdirilib. Qurum real deyil, identifikatorlar və barmaq izləri qısaldılıb, bəzi sahələr çıxarılıb. Real formatı [etibar siyahısının spesifikasiyasında](https://docs.tamga.network/specifications/trust-lists) tapa bilərsiniz.

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

Bu qeyddə əsas işi bir neçə sahə görür:

- `issuer_id` qurumun sertifikatının barmaq izindən hesablanır. Ona görə qurum bu dəyəri özü seçə bilmir, başqası da onu köçürə bilmir.
- `class` qurumun hansı növ sənəd verdiyini göstərir. Dövlət qurumunun sənədi üçün `PUB`, kvalifikasiyalı sənəd üçün `QUALIFIED`, adi attestasiya üçün `EAA` istifadə olunur. `assurance` isə qurumun `I1`-dən `I3`-ə qədər olan etibarlılıq səviyyəsidir.
- `schema_authorizations` qurumun verə biləcəyi sənəd növlərini hər birinin öz zaman aralığı ilə birlikdə sadalayır. Etibarlı qeydi olan bilet satıcısı belə yoxlamadan keçəcək diplom verə bilməz.
- `status_history` sahəsinə yalnız yeni sətir əlavə olunur və köhnə sətirlər heç vaxt dəyişdirilmir.

Qeyddə olmayan məlumatlar da bilərəkdən kənarda saxlanılıb. Qeyddə tələbə adı, sənəd heşi və ya sənəd sayı yoxdur. Qaydaya görə heç bir siyahıda, anker jurnalında və ya dəyişiklik qeydində fərdi məlumat ola bilməz (TL11).

## Qurum siyahıya necə daxil olur?

Qurum qeydiyyat məlumatlarını və sertifikat imzalama sorğusunu göndərərək müraciət edir. Qeydiyyat orqanı müraciəti yoxlayır və çatışmayan bütün sahələri bir dəfəyə bildirir. Sonra kök sertifikat orqanı qurumun sertifikatını imzalayır, qurum siyahıya əlavə edilir və siyahı yenidən imzalanır. Dəyişiklik 24 saat ərzində qüvvəyə minir. Bu addımları qurumun baxış bucağından [Qurum Tamga Network-a necə qoşulur](/blog/join-as-an-institution) yazısında izah etmişik.

Nəşriyyatçı hər dərcdə hər yoxlayan tərəf istifadəsi və hər qurum üçün qeydiyyat sertifikatı (ETSI TS 119 475) da yaradır və onları `trust.tamga.network/wrprc/` altında yerləşdirir. Bu sertifikatların məzmunu yalnız imzalanmış siyahıdan gəldiyi üçün cüzdan yoxlayan tərəfin qeydiyyatını bu sertifikatla da yoxlaya bilər. 29 oktyabr 2026-cı ildən hər sertifikat öz siyasətini də adlandırır (öz identifikatoru ilə [qeydiyyat sertifikatı siyasəti](https://arf.tamga.network/az/policies/registration-certificate)) və saatda bir yenidən imzalanan bir bitlik status siyahısına istinad edir: `trust.tamga.network/status/wrprc/1`. Cüzdan ləğv edilmiş sertifikatı rədd edir, status yoxlana bilmirsə şəxsi xəbərdar edir.

## Siyahı necə imzalanır və dərc olunur?

Hər siyahı ES256 ilə imzalanmış kompakt JWS-dir və başlığındakı `x5c` sahəsində operatorun sertifikatı olur. Siyahının yanında insanların oxuya bilməsi üçün `.json` nüsxəsi də durur. Proqram təminatı isə yalnız `.jws` faylından istifadə edir.

Siyahının tarixçəsini dürüst saxlayan üç qayda var:

1. **Versiya nömrəsi yalnız artır.** Köhnə versiya yeni kimi bir daha təqdim edilə bilməz.
2. **Hər versiya əvvəlkinin heşini daşıyır** (`previous_version_hash`). Beləliklə versiyalar zəncir yaradır və aradakı boşluq və ya sonradan edilən dəyişiklik dərhal görünür.
3. **Heç nə silinmir.** Şəbəkədən çıxan qurum siyahıda yeni statusla qalmağa davam edir, köhnə versiyalar isə `archive/` altında saxlanılır.

![Hər faylın nə vaxt dərc olunduğu və ona tətbiq olunan qayda](/blog/how-trust-lists-work/en/fig-yayin.png)

Siyahılar heç nə dəyişməsə belə, ən geci 90 gündən bir yenidən imzalanır. Beləliklə oxuyan şəxs uzun müddət dəyişməmiş siyahını tərk edilmiş siyahıdan ayıra bilir. Eyni yerdə duran açıq `CHANGELOG.md` faylı da hər dərci qeydə alır.

## Anker jurnalı nə üçündür?

Bəzi məlumatlar o qədər tez-tez dəyişir ki, hər dəyişiklikdə bütün siyahını yenidən imzalamaq çətin olardı. Bunların başında qurumların dərc etdiyi ləğv siyahıları gəlir. Bu məlumatlar anker jurnalına, yəni `anchors.jsonl` faylına yazılır. Jurnalda hər hadisə üçün imzalanmış bir sətir olur və hər sətir əvvəlki sətrə onun heşi ilə bağlanır.

Məsələn, sətir qurumun ləğv siyahısının N-ci versiyasını müəyyən məzmun heşi ilə dərc etdiyini qeydə alır. Yoxlayan tərəf sonra həmin ləğv siyahısını oxuyanda siyahının heşini ankerdəki heşlə müqayisə edir. Heş uyğun gəlmirsə və ya versiya geri gedibsə, sənəd yoxlamadan keçmir. Yoxlayan tərəfin əlindəki nüsxə sadəcə ən yeni ankerdən köhnədirsə, nəticə nüsxə yenilənənə qədər "hazırda yoxlamaq mümkün olmadı" olur. Yoxlayan tərəf ləğv siyahısının həqiqətən qurumdan gəldiyini və köhnə versiya ilə əvəz edilmədiyini bu yolla bilir.

Jurnala saatda ən azı bir sətir yazılır və həmin saatda başqa hadisə olmayıbsa, bu sətir həyat siqnalı (heartbeat) sətridir. Jurnal 500 sətri keçəndə operator sətirləri arxivə köçürür və yeni jurnalı imzalanmış nəzarət nöqtəsi ilə başladır. Bu nəzarət nöqtəsi arxivin son sətrinə və arxiv faylının heşinə bağlanır. Heç bir sətir silinmədiyi üçün bütün tarixçəni arxivlərdən yenidən qurmaq olar.

## Siyahı nə dərəcədə aktual olmalıdır?

Hər siyahı `next_update` tarixi daşıyır. Xidmətlər siyahıları müntəzəm fasilələrlə yenidən yükləyir, yoxlayan tərəflər isə ləğv siyahılarını əvvəlcədən endirib keşdə saxlayır. Yoxlama anında heç nə endirilmir və qurumun sənədlərinin harada göstərildiyini heç vaxt öyrənə bilməməsinin səbəbi də budur ([İzləmədən ləğv](/blog/status-list-privacy)).

Siyahı alına bilmirsə və ya `next_update` tarixi keçibsə, yoxlayan tərəf təxmin etmir. Bu halda nəticə "hazırda yoxlamaq mümkün olmadı" (`INDETERMINATE`) olur və sənəd nə qəbul, nə də rədd edilmiş sayılır (TL5). Serverə çatmaq mümkün olmadı deyə heç bir diplom saxta elan edilmir.

## Yoxlayan tərəf addım-addım nəyi yoxlayır?

Yoxlamalar iki qrupa bölünür. Birinci qrup siyahılar yüklənəndə aparılır:

![Etibar siyahısı yüklənəndə nə yoxlanılır və uğursuz olduqda nə baş verir](/blog/how-trust-lists-work/en/fig-denetim.png)

Şəbəkə yoxlaması xüsusilə testlər üçün vacibdir. Sandbox siyahılarında `"environment": "sandbox"` yazılır və real şəbəkə üçün qurulmuş yoxlayan tərəf bu siyahını görəndə dayanır. Ona görə sandbox-da alınmış sənəd real yoxlayan tərəfdən keçə bilmir.

İkinci qrup hər sənəd üçün işləyir. Yoxlama ardıcıllığının etibar qatı ([yoxlama API-si](https://docs.tamga.network/specifications/verification-api)) bu sualları verir:

| Addım | Sual |
|---|---|
| A3b | Bu hansı qurumdur? Qurum sənədi imzalayan sertifikatdan müəyyən edilir; sənədin özü haqqında dediklərinə baxılmır |
| C1 | Sənəd verildiyi anda qurum qəbul edilə bilən vəziyyətdə idimi? |
| C2 | Qurum həmin anda bu növ sənədi verməyə səlahiyyətli idimi? Bu addımı söndürmək olmaz |
| C3 | Yoxlayan tərəfin ölkəsi qurumun ölkəsini tanıyırmı? |
| D5 | Ləğv siyahısı jurnaldakı ankerə uyğun gəlirmi? |

C1 və C2 addımları bugünkü vəziyyətə deyil, sənədin verildiyi ana baxır. Universitetin qeydi sonradan təqaüdə çıxarılsa, onun aktiv olduğu dövrdə verdiyi diplomlar etibarlı qalır. Qurumun açarı ələ keçirilibsə, qeyd `invalidates_from` tarixi ilə ləğv edilir və yalnız həmin tarixdən sonra verilmiş sənədlər yoxlamadan keçmir. Yoxlama keçmişə baxır və həlledici olan sənədin verildiyi gündəki siyahıdır.

Kod siyahı fayllarını heç vaxt özü şərh etmir. `@tamga-network/trust` paketi bir interfeys təqdim edir. `TrustSource` adlı bu interfeys `YES`, `NO` və ya `UNKNOWN` cavabı verir və `UNKNOWN` nəticədə `INDETERMINATE` kimi görünür. Ondan necə istifadə edildiyini [Etibar siyahılarını oxuyun](https://docs.tamga.network/guides/read-trust-lists) bələdçisində izah etmişik.

## Bu gün açığını desək, hansı məhdudiyyətlər var?

- **Bir imzalayan.** Etibar lövbəri bu gün bir operatorun imzasına söykənir. Operator ilə qurum birlikdə hərəkət etsə, müxtəlif oxuculara siyahının müxtəlif versiyalarını göstərə bilərlər. Açıq jurnal, dəyişiklik qeydi, rübdə bir dərc olunan şəffaflıq hesabatı və müstəqil audit bunun qarşısını alır, amma tamamilə qeyri-mümkün etmir. Bu boşluğu ən azı iki müstəqil operator tələb edən ortaq reyestr bağlayacaq ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).
- **Hələlik bir açar.** Qaydalar ən azı iki növbəli imza sertifikatı və 30 gün əvvəlcədən elan edilən açar dəyişikliyi tələb edir. Canlı siyahılar isə hazırda bir açardan istifadə edir (2026-10-23-də yoxlanılıb). Qaydalar ikinci açarın əlavə edilməsini və imza açarının açar idarəetmə xidmətində saxlanılmasını pilotdan əvvəl şərt qoyur.
- **ETSI XML: sandbox-da canlı, real şəbəkədə sonra.** Sandbox ölkə siyahısını bu gün ETSI TS 119 612 XML görünüşü ilə də dərc edir; görünüş eyni imzalı siyahıdan, eyni versiya ilə yaradılır və XAdES-B-B ilə imzalanır ([trust.sandbox.tamga.network/tl-tr.xml](https://trust.sandbox.tamga.network/tl-tr.xml); ünvanların mənası [ETSI etibar siyahısı səhifəsində](https://docs.tamga.network/az/concepts/etsi-trusted-list)). Real şəbəkənin XML siyahısı siyahını idarə edəcək fond yaradılanda açılacaq; beləliklə siyahıda daimi operator və onun ünvanı olacaq. Siyahı Aİ mənasında "ixtisaslı" və ya "bildirilmiş" iddiası daşımır. Cüzdan provayderləri üçün ETSI TS 119 602 görünüşləri də aktivləşdiriləndə dərc oluna bilər.

## Tez-tez verilən suallar

### Etibar siyahısını özüm oxuya bilərəmmi?

Bəli. `trust.tamga.network/tl-tr.json` və `lotl.json` faylları oxuna bilən nüsxələrdir. Proqram təminatı isə imzalanmış `.jws` fayllarını `TrustSource` vasitəsilə yükləməlidir, çünki imzanı, zənciri və aktuallığı bu interfeys yoxlayır.

### Etibar siyahısında fərdi məlumatlar varmı?

Xeyr. Siyahıda qurum və yoxlayan tərəf adları, sertifikat barmaq izləri, statuslar, tarixlər, ünvanlar və sənəd növləri olur. Şəxslər, sənədlərin məzmunu və sənəd heşləri siyahıda yer almır.

### Qurum şəbəkədən çıxdıqda nə baş verir?

Qurumun qeydi silinmir. Statusu dəyişir (məsələn, `RETIRED` və ya `REVOKED` olur) və bu dəyişiklik qeydin tarixçəsinə əlavə edilir. Beləliklə əvvəl verilmiş sənədlər verildikləri gündəki siyahıya əsasən qiymətləndirilməyə davam edir.

### Siyahı nə qədər tez-tez yenilənir?

Dəyişiklik 24 saat ərzində dərc olunur və hər siyahı ən geci 90 gündən bir yenidən imzalanır. Anker jurnalına da saatda ən azı bir sətir əlavə olunur.

### Bu, Aİ-nin etibar siyahısı ilə eynidirmi?

Siyahı eyni iki səviyyəli modeli izləyir və sahələri ETSI TS 119 612-yə uyğunlaşdırılır. Yenə də Aİ siyahısı sayılmır, çünki onu Aİ qurumu dərc etmir və Tamga siyahı üçün Aİ statusu iddia etmir.

## Mənbələr

- [Aİ etibar siyahılarının siyahısı (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [Komissiyanın İcra Qərarı (Aİ) 2015/1505: etibar siyahılarının formatları](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Etibar siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth işçi qrupunun layihəsi)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: etibar siyahısının spesifikasiyası](https://docs.tamga.network/specifications/trust-lists) · [Etibar siyahıları və federasiya](https://docs.tamga.network/concepts/trust-lists) · [Etibar siyahılarını oxuyun](https://docs.tamga.network/guides/read-trust-lists)
- [Etibar siyahıları](/learn/trust-lists) · [Federasiya](/learn/federation)

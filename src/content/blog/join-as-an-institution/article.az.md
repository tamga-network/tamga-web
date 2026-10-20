---
title: Qurum Tamga Network-a necə qoşulur
slug: join-as-an-institution
description: "Qurum Tamga Network-a necə qoşulur: sınaq mühitində yoxlayır, qeydiyyat məlumatları və CSR ilə müraciət edir, siyahıya düşür, ilk rəqəmsal sənədi verir."
date: 2026-10-08
lang: az
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Sources: GUIDE-0007 join-as-institution 1.0.0 (roles and classes, application JSON, ADR-0024 mandatory data, two P-256 keys, CSR, HSM/KMS, certificate 2 years / max 3, registrar reports all gaps at once, live within 24 h, issuer_id from certificate, WRPRC, per-type authorisation, ended authorisation not deleted, hosted vs own server, identity proofing SPEC-ID-0003, statuses table, status at time of issuance); GUIDE-0013 sandbox §9 (test institution: made-up name, "(TEST)" added, no email/phone/person name, real names and official words refused, passkey invite, CSV up to 200 rows, ID-number checksum refused, desk issuance QR + PIN, verify at example verifiers; limits 30 / 10 per 10 min / 200 records / 100 offers per hour; nightly deletion; education type only today); ADR-0041; ADR-0019 (Institution Console: passkey, records, revocation, API keys, users); ADR-0016 (scoped API key); ADR-0020 (authentic source, no register of people); tamga-web join page (participation agreement, DPA when hosted, privacy notice, proof of entitlement, lookup endpoint OpenAPI, statistics never personal data, partners@tamga.network, 6 steps: scope, type, legal, registration, integration, pilot then live). External: CIR (EU) 2025/848, ETSI TS 119 475. -->

Qurum Tamga Network-a iki mərhələdə qoşulur. Əvvəlcə bütün prosesi sınaq mühitində (sandbox) yoxlayır: burada bir neçə dəqiqəyə özü test qurumu aça və uydurma qeydlər əsasında rəqəmsal cüzdana rəqəmsal sənədlər verə bilər. Sonra qeydiyyat məlumatları və sertifikat imzalama sorğusu ilə real şəbəkəyə müraciət edir; qeydiyyatçı faylı yoxlayır, kök sertifikat orqanı qurumun sertifikatını imzalayır və qurum 24 saat ərzində müəyyən rəqəmsal sənəd növləri üçün səlahiyyətli olaraq imzalanmış etibar siyahısında görünür. Bu andan etibarən qurum rəqəmsal sənədləri host edilən xidmət və Qurum Konsolu vasitəsilə, ya da öz serverindən verir.

![Sınaq mühitində yoxlamadan ilk rəqəmsal sənədə qədər dörd addım](/blog/join-as-an-institution/en/fig-yol.png)

## Hansı qurumlar qoşula bilər?

İnsanların nəyisə sübut etmək üçün ehtiyac duyduğu sənədləri verən istənilən qurum: universitetlər və məktəblər, xəstəxanalar və peşə palataları, dövlət qurumları, şirkətlər (işçi və səlahiyyət sənədləri) və tədbir təşkilatçıları (şəxsə bağlı biletlər). Siyahıda hər qurumun domeni (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) və sinfi var:

| Sinif | Mənası |
|---|---|
| `PUB` | dövlət qurumunun verdiyi rəqəmsal sənəd |
| `QUALIFIED` | kvalifikasiyalı rəqəmsal sənəd |
| `EAA` | tələbə sənədi və ya bilet kimi adi elektron attestasiya |

Qoşulma qurumu qeydə alır; ona əvvəlcədən malik olmadığı hüquqlar vermir. Diplom vermək hüququ universitetin fəaliyyətini tənzimləyən qanundan irəli gəlir. Şəbəkənin vəzifəsi bu hüququ maşın tərəfindən yoxlanıla bilən etməkdir.

Rəqəmsal sənəd vermək deyil, onları yoxlamaq istəyən qurumlar (işəgötürənlər, veb-saytlar, giriş keçidləri) qeydiyyatlı yoxlayan tərəf kimi qoşulur. Bu yol [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) məqaləsində təsvir olunub.

## Qurum müraciət etməzdən əvvəl bunu necə yoxlaya bilər?

Sınaq mühitində — şəbəkənin [sandbox.tamga.network](https://sandbox.tamga.network) ünvanındakı ayrıca test mühitində. Oradakı heç nə real şəbəkəyə toxunmur: onun öz test kök sertifikatı var, siyahıları test siyahısı kimi işarələnib və real yoxlayan tərəf onun rəqəmsal sənədlərini qəbul etmir.

Sınaq bir neçə dəqiqə çəkir ([sınaq mühiti bələdçisi, §9](https://docs.tamga.network/guides/sandbox)):

1. Sınaq mühiti səhifəsində **Try your institution** seçin və uydurma qurum adı yazın; ona "(TEST)" əlavə olunur. E-poçt, telefon nömrəsi və ya şəxs adı soruşulmur. Real qurum adları və rəsmi orqanlara aid sözlər qəbul edilmir.
2. Test qurumu dərhal sınaq mühitinin etibar siyahısına əlavə olunur və sınaq mühitinin test qurumları üçün sertifikat orqanından öz imza sertifikatını alır.
3. Birdəfəlik dəvət linki ilə Qurum Konsolunu açın və passkey yaradın.
4. Qeydləri bir-bir daxil edin və ya CSV faylı yükləyin (200 sətrə qədər). Türkiyə şəxsiyyət nömrəsinin yoxlama cəmi (checksum) qaydasından keçən nömrə olan qeyd qəbul edilmir, buna görə yalnız qəsdən etibarsız edilmiş nömrələr daxil ola bilər.
5. Qeydin yanında **Issue at the desk** seçin, sınaq mühitinə qoşulmuş rəqəmsal cüzdanla QR kodu skan edin və PIN-i daxil edin.
6. Rəqəmsal sənədi sınaq mühiti səhifəsindəki "Diploma check" və ya "Student discount" nümunə yoxlayan tərəfinə təqdim edin.

Hazırda test qurumu təhsil qurumudur (tələbə sənədi və diplom). Hər şey (qurum, onun hesabı, qeydləri və sertifikatları) hər gecə silinir. Limitlər istifadəni ədalətli saxlayır: eyni anda ən çoxu 30 test qurumu, hər birində 200 qeyd və saatda 100 təklif.

> **Qeyd:** Sınaq mühitinə yalnız uydurma məlumatlar daxil edin. Bu test şəbəkəsidir: heç bir xidmət öhdəliyi yoxdur və hər gecə Türkiyə vaxtı ilə saat 03:30-da sıfırlanır.

## Real şəbəkəyə müraciətdə nələr olur?

Müraciət üç növ məzmundan ibarət bir fayldır: qurumun kim olduğu, nə verəcəyi və məlumatlarının haradan gəldiyi.

![Qurumun müraciəti üçün hazırlamalı olduğu sənədlər](/blog/join-as-an-institution/en/fig-gerekenler.png)

Qeydiyyat məlumatları Avropa İttifaqının (Aİ) iştirakçılar üçün ümumi məlumat dəstidir: hüquqi və kommersiya adı, rəsmi identifikator (vergi nömrəsi və ya ticarət reyestri nömrəsi), poçt ünvanı, əlaqə məlumatları və insanların şikayət edə biləcəyi məlumatların mühafizəsi orqanı ([ADR-0024](https://docs.tamga.network/adr/0024-participant-registration-data)). Eyni model [İcra Reqlamenti (Aİ) 2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) ilə Aİ-də rəqəmsal cüzdana etibar edən tərəflər (relying parties) üçün də istifadə olunur. Hər hansı sahə boşdursa, qeyd yaradılmır və qeydiyyatçı bütün çatışmazlıqları birdəfəyə sadalayır.

```json title="Shortened example: an application file (made-up institution)"
{
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "vcts": ["urn:tamga:edu:StudentCredential:1", "urn:tamga:edu:DiplomaCredential:1"],
  "authentic_source": { "name": "Example University Student Information System", "mode": "REMOTE" },
  "identifiers": [{ "scheme": "TR-VKN", "value": "TR0000000000" }],
  "contact": { "support_uri": "https://example.edu.tr/support" },
  "supervisory_authority": { "name": "Kişisel Verileri Koruma Kurumu (KVKK)", "country": "TR" }
}
```

Tam nümunə tərtibatçı bələdçisindədir: [Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution).

Həmin fayldakı iki sətir şəbəkənin necə işlədiyi barədə çox şey deyir. `vcts` qurumun vermək istədiyi rəqəmsal sənəd növlərini açıq [sxem kataloqundan](https://docs.tamga.network/specifications/schema-catalog) seçilmiş şəkildə sadalayır; yeni növ əvvəlcə ayrıca təsdiq prosesindən keçir. `authentic_source` məlumatların faktiki olaraq gəldiyi sistemi göstərir. Şəbəkə insanların reyestrini saxlamır: sənəd verilərkən məlumatlar qurumun öz sistemindən, qurumun nəzarətində olan endpoint vasitəsilə oxunur ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Faylla yanaşı hüquqi sənədlər də təqdim olunur: iştirak müqaviləsi, host edilən xidmətdən istifadə edilirsə məlumatların emalı müqaviləsi (qurum məlumatların nəzarətçisi olaraq qalır), sənəd verdiyi şəxslər üçün yenilənmiş məxfilik bildirişi və rəqəmsal sənədi vermək hüququna malik olduğunu sübut edən sənəd.

## Qurumun açarı nə üçün heç vaxt qurumdan kənara çıxmır?

Çünki rəqəmsal sənədi məhz qurumun özünə məxsus edən açardır. Açar kimdədirsə, qurumun adından imza ata bilər, buna görə o, hər mərhələdə qurumda qalır.

Qurum iki P-256 açar cütü yaradır: biri rəqəmsal sənədləri, digəri isə ləğv siyahısını imzalayır. Hər biri üçün yalnız sertifikat imzalama sorğusu (CSR) göndərir:

```bash title="Generating a key and a certificate signing request"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

İstismar mühitində açar aparat təhlükəsizlik modulunda (HSM) və ya bulud açar idarəetmə xidmətində (KMS) saxlanmalıdır. Qeydiyyatçı CSR-in imzasını yoxlayır və kök sertifikat orqanından iki il (ən çoxu üç il) etibarlı sertifikat qaytarır.

## Qurum qeydiyyata alındıqda nə baş verir?

Qeydiyyatçı qurumu Türkiyə siyahısına əlavə edir və siyahını yenidən imzalayır. 24 saat ərzində qeyd `trust.tamga.network` ünvanında aktiv olur. Qeyddə sertifikatın barmaq izindən hesablanmış `issuer_id`, sinif, etibarlılıq səviyyəsi, səlahiyyət verilmiş rəqəmsal sənəd növləri, status və onun tarixçəsi yer alır. Hər dərc zamanı avtomatik olaraq qeydiyyat sertifikatı (ETSI TS 119 475) yaradılır, beləliklə rəqəmsal cüzdanlar qeydi bu yolla da yoxlaya bilər. Qeydin necə göründüyü və yoxlayan tərəflərin onu necə oxuduğu: [İmzalanmış etibar siyahısı necə işləyir](/blog/how-trust-lists-work).

Səlahiyyət hər rəqəmsal sənəd növü üzrə ayrıca verilir. Növ sonradan əlavə edilə və ya dayandırıla bilər. Dayandırılmış səlahiyyət silinmir, buna görə dayandırılmadan əvvəl verilmiş rəqəmsal sənədlər yoxlamadan keçməyə davam edir.

## Qurum ilk rəqəmsal sənədini necə verir?

İki yol var və hər ikisində rəqəmsal sənəd eynidir: qurumun adından verilir və onun açarı ilə imzalanır.

| | Host edilən xidmət | Öz serveriniz |
|---|---|---|
| Nə işlədir | Tamga-nın sənəd vermə xidməti və Qurum Konsolu | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Necə qoşulursunuz | konsol vasitəsilə və ya sisteminizdən məhdud səlahiyyətli API açarı ilə | öz yerləşdirməniz |
| Nə üçün uyğundur | sürətli başlanğıc, yerində sənəd vermə, kiçik komandalar | hər şeyi daxildə saxlamaq istəyən qurumlar |

[Qurum Konsolu](https://docs.tamga.network/adr/0019-institution-console-and-database) əməkdaşların işlədiyi yerdir: onlar passkey ilə daxil olur, qeydləri idarə edir, QR kod və ayrıca verilən PIN ilə yerində sənəd verir, rəqəmsal sənədləri ləğv edir və ya dayandırır, sənəd vermə statistikasına baxırlar. Statistikada heç vaxt fərdi məlumatlar olmur. Sistemlər eyni əməliyyatları quruma bağlı və əhatəsi məhdud API açarı vasitəsilə yerinə yetirə bilər ([ADR-0016](https://docs.tamga.network/adr/0016-hosted-issuer-api-access)).

Hər rəqəmsal sənəddən əvvəl qurum həmin sənəd növünün tələb etdiyi səviyyədə şəxsin kimliyini yoxlayır. Şəxs prosesə rəqəmsal cüzdandan da başlaya bilər: qurumu seçir, qurum isə onu rəqəmsal cüzdanında artıq olan yoxlanılmış şəxsiyyət sənədi vasitəsilə uyğunlaşdırır.

Diplom da daxil olmaqla hər rəqəmsal sənəd ayrı açarlara malik 10 nüsxədən ibarət paket şəklində verilir, beləliklə rəqəmsal cüzdan hər dəfə yeni nüsxə təqdim edə bilir və iki yoxlayan tərəf təkrarlanan dəyər vasitəsilə eyni şəxsi əlaqələndirə bilmir ([OpenID4VCI-yə ətraflı baxış](/blog/openid4vci-deep-dive)). Rəqəmsal sənəd provayderi etibar siyahısında olan istənilən rəqəmsal cüzdana göndərilə bilər. Qurum öz insanları üçün rəqəmsal cüzdan seçmir.

## Qoşulduqdan sonra nə dəyişə bilər?

![Qurum qeydinin dörd vəziyyəti və hər birinin mənası](/blog/join-as-an-institution/en/fig-durumlar.png)

Bütün vəziyyətlər üçün bir qayda keçərlidir: yoxlayan tərəf rəqəmsal sənədi qurumun bugünkü statusuna görə deyil, sənədin verildiyi gündəki statusuna görə qiymətləndirir. Sənəd verməyi dayandıran qurum məzunlarının diplomlarını da özü ilə birlikdə etibarsız etmir. Açar ələ keçirilərsə, qeyd tarix göstərilməklə ləğv edilir və yalnız həmin tarixdən sonra verilmiş rəqəmsal sənədlər yoxlamadan keçmir.

## Real qoşulma layihəsi necə həyata keçirilir?

[Qoşulma səhifəsində](/join) altı addım sadalanır: əhatə dairəsini razılaşdırmaq (hansı rəqəmsal sənədlər, hansı pilot qrup), rəqəmsal sənəd növünü seçmək və ya hazırlamaq, müqavilələri imzalamaq və məxfilik bildirişini yeniləmək, qeydiyyatdan keçmək, inteqrasiya etmək və sınaq mühitində başdan-sona test etmək, sonra əvvəlcə kiçik qrupla istismara başlamaq. Başlamaq üçün qurumun adını və sənəd vermək, yoxlamaq və ya hər ikisini istədiyini qeyd edərək partners@tamga.network ünvanına yazın.

## Tez-tez verilən suallar

### Qurum tələbə və ya üzv bazasını təhvil verməlidirmi?

Xeyr. Şəbəkə insanlar barədə heç bir reyestr saxlamır. Məlumatlar sənədin verildiyi anda qurumun öz sistemindən oxunur və birbaşa şəxsin telefonuna göndərilir.

### Qurumun öz serverləri olmalıdırmı?

Xeyr. Başlamaq üçün idarə olunan (hosted) sənəd vermə xidməti və Institution Console (Qurum Konsolu) kifayətdir. Sənəd verilməsini özü həyata keçirmək istəyən qurumlar açıq mənbəli `@tamga-network/issuer` paketindən istifadə edə bilər.

### Sandbox-dakı test qurumunu real şəbəkəyə keçirmək olarmı?

Xeyr. Sandbox-dakı qurumlar, qeydlər və sertifikatlar hər gecə silinir, sandbox-un kök sertifikatına isə real şəbəkədə etibar edilmir. Real şəbəkə üçün ayrıca müraciət və ayrıca açarlar tələb olunur.

### Qurumun rəqəmsal sənədlərini hansı rəqəmsal cüzdanlar qəbul edə bilər?

Provayderi etibar siyahısında qeydiyyatdan keçmiş və şəbəkənin rəqəmsal cüzdan qaydalarına əməl edən istənilən rəqəmsal cüzdan. Tamga Wallet şəbəkədəki rəqəmsal cüzdanlardan biridir, yeganəsi deyil.

### Qurumun imza açarı oğurlanarsa, nə baş verir?

Qeyd `invalidates_from` tarixi ilə ləğv edilir. Həmin andan etibarən imzalanmış rəqəmsal sənədlər yoxlamadan keçmir; ondan əvvəlkilərə isə təsir olmur. Bundan sonra qurum yeni sertifikatı qeydiyyatdan keçirir.

## Mənbələr

- [İcra Reqlamenti (Aİ) 2025/848: rəqəmsal cüzdana etibar edən tərəflərin qeydiyyatı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: etibar edən tərəfin atributları və qeydiyyat sertifikatları](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/guides/sandbox) · [Rəqəmsal sənədlərin verilməsi](https://docs.tamga.network/guides/issue-credentials)
- [ADR-0024: iştirakçıların qeydiyyat məlumatları](https://docs.tamga.network/adr/0024-participant-registration-data) · [ADR-0041: sandbox test qurumları](https://docs.tamga.network/adr/0041-sandbox-institution-test-accounts)
- [Tamga Rulebook (iştirak qaydaları)](https://arf.tamga.network/rulebook) · [Şəbəkəyə qoşulun](/join) · [Sənədi verən qurum kimi qoşulma](/learn/join-as-issuer)

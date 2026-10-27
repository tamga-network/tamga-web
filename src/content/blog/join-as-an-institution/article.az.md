---
title: Qurum Tamga Network-a necə qoşulur?
slug: join-as-an-institution
description: "Qurumun Tamga Network-a necə qoşulduğunu izah edirik: sınaq mühitində yoxlama, qeydiyyat məlumatları və CSR ilə müraciət, etibar siyahısına daxil olma və ilk sənəd."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Sources: GUIDE-0007 join-as-institution 1.0.0 (roles and classes, application JSON, ADR-0024 mandatory data, two P-256 keys, CSR, HSM/KMS, certificate 2 years / max 3, registrar reports all gaps at once, live within 24 h, issuer_id from certificate, WRPRC, per-type authorisation, ended authorisation not deleted, hosted vs own server, identity proofing SPEC-ID-0003, statuses table, status at time of issuance); GUIDE-0013 sandbox §9 (test institution: made-up name, "(TEST)" added, no email/phone/person name, real names and official words refused, passkey invite, CSV up to 200 rows, ID-number checksum refused, desk issuance QR + PIN, verify at example verifiers; limits 30 / 10 per 10 min / 200 records / 100 offers per hour; nightly deletion; education type only today); ADR-0041; ADR-0019 (Institution Console: passkey, records, revocation, API keys, users); ADR-0016 (scoped API key); ADR-0020 (authentic source, no register of people); tamga-web join page (participation agreement, DPA when hosted, privacy notice, proof of entitlement, lookup endpoint OpenAPI, statistics never personal data, partners@tamga.network, 6 steps: scope, type, legal, registration, integration, pilot then live). External: CIR (EU) 2025/848, ETSI TS 119 475. -->

Qurum Tamga Network-a iki mərhələdə qoşulur. Əvvəlcə bütün prosesi sınaq mühitində (sandbox) yoxlayır. Orada bir neçə dəqiqə ərzində öz test qurumunu açır və uydurma qeydlərdən cüzdana sənəd verir. Sonra qeydiyyat məlumatlarını və sertifikat imzalama sorğusunu göndərərək real şəbəkəyə müraciət edir. Qeydiyyat orqanı faylı yoxlayır, kök sertifikat orqanı qurumun sertifikatını imzalayır və qurum 24 saat ərzində imzalanmış etibar siyahısına daxil olur. Siyahıda onun hansı sənəd növlərini verməyə səlahiyyətli olduğu da yazılır. Bundan sonra qurum sənədlərini host edilən xidmət və Qurum Konsolu vasitəsilə və ya öz serverindən verə bilər.

![Sınaq mühitində yoxlamadan ilk rəqəmsal sənədə qədər dörd addım](/blog/join-as-an-institution/en/fig-yol.png)

## Hansı qurumlar qoşula bilər?

İnsanların nəyisə sübut etmək üçün ehtiyac duyduğu sənədləri verən hər qurum qoşula bilər. Universitetlər və məktəblər, xəstəxanalar və peşə palataları, dövlət qurumları, işçi və səlahiyyət sənədləri verən şirkətlər və şəxsə bağlı bilet satan tədbir təşkilatçıları buna nümunədir. Siyahıda hər qurumun bir sahəsi (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) və bir sinfi olur:

| Sinif | Mənası |
|---|---|
| `PUB` | dövlət qurumunun verdiyi sənəd |
| `QUALIFIED` | kvalifikasiyalı sənəd |
| `EAA` | tələbə sənədi və ya bilet kimi adi elektron attestasiya |

Şəbəkəyə qoşulmaq qurumu qeydə alır, amma ona əvvəl malik olmadığı səlahiyyət vermir. Məsələn, diplom vermək hüququ universitetin tabe olduğu qanundan gəlir. Şəbəkə isə bu hüququn maşın tərəfindən yoxlanıla bilməsini təmin edir.

Sənəd vermək əvəzinə sənədləri yoxlamaq istəyən qurumlar, məsələn işəgötürənlər, vebsaytlar və ya giriş qapıları, şəbəkəyə qeydiyyatlı yoxlayan tərəf kimi qoşulur. Bu yolu [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) yazısında izah etmişik.

## Qurum müraciət etməzdən əvvəl necə yoxlaya bilər?

Qurum hər şeyi şəbəkənin ayrıca test mühiti olan sandbox-da yoxlaya bilər: [sandbox.tamga.network](https://sandbox.tamga.network). Oradakı heç bir əməliyyat real şəbəkəyə təsir etmir. Sandbox-ın öz test kök sertifikatı var, siyahıları test siyahısı kimi işarələnir və real yoxlayan tərəf oradan alınmış sənədləri qəbul etmir.

Sınaq bir neçə dəqiqə çəkir ([sınaq mühiti bələdçisi, §9](https://docs.tamga.network/guides/sandbox)):

1. Sandbox səhifəsində **Try your institution** seçin və uydurma qurum adı yazın. Adın sonuna "(TEST)" əlavə olunur. Sizdən e-poçt, telefon nömrəsi və ya şəxs adı istənilmir. Real qurum adları və rəsmi orqanları xatırladan sözlər qəbul edilmir.
2. Test qurumu dərhal sandbox-ın etibar siyahısına əlavə olunur. Qurumun imza sertifikatını sandbox-ın test qurumları üçün ayrılmış sertifikat orqanı verir.
3. Birdəfəlik dəvət linki ilə Qurum Konsolunu açın və passkey yaradın.
4. Qeydləri bir-bir daxil edin və ya ən çoxu 200 sətirlik CSV faylı yükləyin. Türkiyə şəxsiyyət nömrəsinin yoxlama cəmi (checksum) qaydasından keçən nömrəni ehtiva edən qeydlər rədd edilir, ona görə sistemə yalnız bilərəkdən etibarsız yazılmış nömrələr daxil ola bilər.
5. Qeydin yanındakı **Issue at the desk** seçiminə klikləyin, sandbox-a qoşulmuş cüzdanla QR kodu skan edin və PIN-i daxil edin.
6. Sənədi sandbox səhifəsindəki "Diploma check" və ya "Student discount" nümunə yoxlayan tərəfinə təqdim edin.

Hazırda test qurumu təhsil qurumu kimi açılır və tələbə sənədi ilə diplom verə bilir. Qurum, onun hesabı, qeydləri və sertifikatları hər gecə silinir. Mühitin hamı üçün istifadəyə yararlı qalması üçün bəzi limitlər də var. Eyni anda ən çoxu 30 test qurumu açıla bilər, hər birində ən çoxu 200 qeyd ola bilər və saatda ən çoxu 100 təklif yaradıla bilər.

> **Qeyd:** Sandbox-a yalnız uydurma məlumat daxil edin. Sandbox test şəbəkəsidir, xidmət öhdəliyi yoxdur və hər gecə Türkiyə vaxtı ilə 03:30-da sıfırlanır.

## Real şəbəkəyə müraciətdə nələr olur?

Müraciət bir fayldan ibarətdir və üç növ məlumat daşıyır. Fayl qurumun kim olduğunu, hansı sənədləri verəcəyini və bu sənədlərdəki məlumatların haradan gələcəyini izah edir.

![Qurumun müraciəti üçün hazırlamalı olduğu sənədlər](/blog/join-as-an-institution/en/fig-gerekenler.png)

Qeydiyyat məlumatları Aİ-nin iştirakçılar üçün müəyyən etdiyi ümumi məlumat dəstindən ibarətdir. Bunlar hüquqi və ticarət adı, rəsmi identifikator (vergi nömrəsi və ya ticarət reyestri nömrəsi), poçt ünvanı, əlaqə məlumatı və insanların şikayət edə biləcəyi məlumatların qorunması orqanıdır ([ADR-0024](https://docs.tamga.network/adr/0024-participant-registration-data)). Aİ də cüzdana etibar edən tərəflər üçün eyni modeldən [(Aİ) 2025/848 saylı İcra Reqlamenti](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) ilə istifadə edir. Sahə çatışmırsa, qeyd aparılmır və qeydiyyat orqanı bütün çatışmazlıqları bir dəfəyə bildirir.

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

Nümunənin tam versiyasını [Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution) adlı tərtibatçı bələdçisində tapa bilərsiniz.

Fayldakı iki sətir şəbəkənin necə işlədiyini yaxşı göstərir. `vcts` qurumun vermək istədiyi sənəd növlərini sadalayır. Bu növlər açıq [sxemlər kataloqundan](https://docs.tamga.network/specifications/schema-catalog) seçilir və yeni növ əlavə ediləcəksə, əvvəlcə öz təsdiq prosesindən keçir. `authentic_source` isə məlumatların əslində gəldiyi sistemin adını göstərir. Şəbəkə şəxslərlə bağlı heç bir qeyd saxlamır. Sənəd verilərkən məlumatlar qurumun öz sistemindən, qurumun nəzarət etdiyi endpoint vasitəsilə oxunur ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Faylla birlikdə hüquqi sənədlər də göndərilir. Bunlar iştirak müqaviləsi, host edilən xidmətdən istifadə olunacaqsa məlumatların emalı müqaviləsi, sənəd veriləcək şəxslər üçün yenilənmiş məxfilik bildirişi və qurumun bu sənədi verməyə səlahiyyətli olduğunu göstərən sübutdur. Host edilən xidmətdən istifadə olunsa da, məlumat nəzarətçisi qurum olaraq qalır.

## Qurumun açarı niyə heç vaxt qurumdan kənara çıxmır?

Sənədi qurumun sənədi edən qurumun açarıdır. Açarı əlində saxlayan hər kəs qurum adından imza ata bildiyi üçün açar hər addımda qurumda qalır.

Qurum iki P-256 açar cütü yaradır. Onlardan biri sənədləri, digəri isə qurumun ləğv siyahısını imzalayır. Qurum kənara hər açar üçün yalnız sertifikat imzalama sorğusu (CSR) göndərir:

```bash title="Generating a key and a certificate signing request"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

Real mühitdə açarın yeri aparat təhlükəsizlik modulu (HSM) və ya buludda açar idarəetmə xidmətidir (KMS). Qeydiyyat orqanı CSR-in imzasını yoxlayır və quruma kök sertifikat orqanının imzaladığı, iki il (ən çoxu üç il) etibarlı sertifikat göndərir.

## Qurum qeydiyyata alındıqda nə baş verir?

Qeydiyyat orqanı qurumu Türkiyə siyahısına əlavə edir və siyahını yenidən imzalayır. Qeyd 24 saat ərzində `trust.tamga.network` ünvanında dərc olunur. Qeyddə sertifikatın barmaq izindən hesablanmış `issuer_id`, qurumun sinfi və etibarlılıq səviyyəsi, verməyə səlahiyyətli olduğu sənəd növləri, statusu və status tarixçəsi olur. Hər dərcdə avtomatik olaraq qeydiyyat sertifikatı (ETSI TS 119 475) da yaradılır və cüzdanlar qeydi bu sertifikatla da yoxlaya bilər. Qeydin necə göründüyünü və yoxlayan tərəfin onu necə oxuduğunu [İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work) yazısında izah etmişik.

Səlahiyyət hər sənəd növü üçün ayrıca verilir. Sonradan yeni növ əlavə oluna və ya hər hansı növün səlahiyyətinə son qoyula bilər. Sona çatmış səlahiyyətin qeydi silinmir və səlahiyyət bitməzdən əvvəl verilmiş sənədlər yoxlanılmağa davam edir.

## Qurum ilk sənədini necə verir?

Bunun iki yolu var və hər iki yolda yaranan sənəd eynidir. Sənəd qurumun adından verilir və qurumun açarı ilə imzalanır.

| | Host edilən xidmət | Öz serveriniz |
|---|---|---|
| Nə işlədir | Tamga-nın sənəd vermə xidməti və Qurum Konsolu | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Necə qoşulursunuz | konsol vasitəsilə və ya sisteminizdən məhdud səlahiyyətli API açarı ilə | öz yerləşdirməniz |
| Kimə uyğundur | tez başlamaq istəyənlər, yerində sənəd verənlər, kiçik komandalar | hər şeyi öz daxilində saxlamaq istəyən qurumlar |

Host edilən xidmətdən istifadə olunanda da açar qurumda qalır. Xidmət qurumun uzaqdan imza xidmətinə (CSC API v2) yalnız heş göndərir və imzanı geri alır ([ADR-0057](https://docs.tamga.network/adr/0057-hosted-issuance-remote-signing)).

[Qurum Konsolu](https://docs.tamga.network/adr/0019-institution-console-and-database) qurum işçilərinin işlərini gördüyü yerdir. İşçilər konsola passkey ilə daxil olur və qeydləri idarə edir. Yerində sənəd verərkən QR koddan və ayrıca təqdim olunan PIN-dən istifadə edirlər. Sənədləri ləğv edə və ya dayandıra, sənəd vermə statistikasını da görə bilərlər. Bu statistikada heç vaxt fərdi məlumat olmur. Qurumun öz sistemləri də eyni işləri quruma bağlı və səlahiyyəti məhdud API açarı ilə görə bilər ([ADR-0016](https://docs.tamga.network/adr/0016-hosted-issuer-api-access)).

Qurum hər sənəddən əvvəl şəxsin kimliyini həmin sənəd növünün tələb etdiyi səviyyədə yoxlayır. Şəxs prosesi cüzdanından da başlada bilər. Cüzdanda qurumu seçir, qurum da onu cüzdanındakı təsdiqlənmiş şəxsiyyət sənədi vasitəsilə öz qeydləri ilə uyğunlaşdırır.

Diplom da daxil olmaqla hər sənəd, hər biri ayrı açara bağlı 10 nüsxəlik paket kimi verilir. Beləliklə cüzdan hər təqdimatda yeni nüsxədən istifadə edə bilir və iki yoxlayan tərəf eyni şəxsi təkrarlanan dəyər vasitəsilə uyğunlaşdıra bilmir ([OpenID4VCI-yə ətraflı baxış](/blog/openid4vci-deep-dive)). Sənəd provayderi etibar siyahısında qeydiyyatda olan istənilən cüzdana göndərilə bilər. Qurum sənəd verdiyi şəxslər adından cüzdan seçmir.

## Qoşulduqdan sonra nə dəyişə bilər?

![Qurum qeydinin dörd vəziyyəti və hər birinin mənası](/blog/join-as-an-institution/en/fig-durumlar.png)

Bütün vəziyyətlərdə eyni qayda keçərlidir. Yoxlayan tərəf sənədi qurumun bugünkü statusuna görə deyil, sənədin verildiyi gündəki statusuna görə qiymətləndirir. Ona görə sənəd verməyi dayandıran qurum məzunlarının diplomlarını etibarsız etmir. Qurumun açarı ələ keçirilərsə, qeyd müəyyən tarixlə ləğv edilir və yalnız həmin tarixdən sonra verilmiş sənədlər yoxlamadan keçə bilmir.

## Real qoşulma layihəsi necə həyata keçirilir?

[Şəbəkəyə qoşulun](/join) səhifəsində altı addım var. Əvvəlcə əhatə dairəsi müəyyən edilir, yəni hansı sənədlərin veriləcəyinə və hansı pilot qrupla başlanacağına qərar verilir. Sonra sənəd növü seçilir və ya birlikdə hazırlanır. Müqavilələr imzalanır və məxfilik bildirişi yenilənir. Daha sonra qeydiyyat aparılır, inteqrasiya qurulur və hər şey sandbox-da əvvəldən axıra qədər sınaqdan keçirilir. Sonda isə əvvəlcə kiçik qrupla real istifadəyə keçilir. Başlamaq üçün qurumunuzun adını və sənəd vermək, yoxlamaq və ya hər ikisini istədiyinizi partners@tamga.network ünvanına yaza bilərsiniz.

## Tez-tez verilən suallar

### Qurum tələbə və ya üzv bazasını təhvil verməlidirmi?

Xeyr. Şəbəkə şəxslərlə bağlı heç bir qeyd saxlamır. Məlumatlar sənəd verildiyi anda qurumun öz sistemindən oxunur və birbaşa şəxsin telefonuna gedir.

### Qurumun öz serverləri olmalıdırmı?

Xeyr. Başlamaq üçün host edilən sənəd vermə xidməti və Qurum Konsolu kifayətdir. Sənəd vermə işini özü aparmaq istəyən qurumlar açıq mənbəli `@tamga-network/issuer` paketindən istifadə edə bilər.

### Sandbox-dakı test qurumunu real şəbəkəyə keçirmək olarmı?

Xeyr. Sandbox-dakı qurumlar, qeydlər və sertifikatlar hər gecə silinir və sandbox-ın kök sertifikatı real şəbəkədə tanınmır. Real şəbəkə üçün ayrıca müraciət və ayrıca açarlar lazımdır.

### Qurumun sənədlərini hansı cüzdanlar qəbul edə bilər?

Provayderi etibar siyahısında qeydiyyatda olan və şəbəkənin cüzdan qaydalarına əməl edən hər cüzdan bu sənədləri qəbul edə bilər. Tamga Wallet şəbəkədəki cüzdanlardan yalnız biridir.

### Qurumun imza açarı oğurlanarsa, nə baş verir?

Qurumun qeydi `invalidates_from` tarixi ilə ləğv edilir. Həmin andan sonra imzalanmış sənədlər yoxlamadan keçə bilmir, əvvəl imzalananlara isə təsir olmur. Qurum bundan sonra yeni sertifikat qeydiyyatdan keçirir.

## Mənbələr

- [İcra Reqlamenti (Aİ) 2025/848: rəqəmsal cüzdana etibar edən tərəflərin qeydiyyatı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: etibar edən tərəfin atributları və qeydiyyat sertifikatları](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/guides/sandbox) · [Rəqəmsal sənədlərin verilməsi](https://docs.tamga.network/guides/issue-credentials)
- [ADR-0024: iştirakçıların qeydiyyat məlumatları](https://docs.tamga.network/adr/0024-participant-registration-data) · [ADR-0041: sandbox test qurumları](https://docs.tamga.network/adr/0041-sandbox-institution-test-accounts)
- [Tamga Rulebook (iştirak qaydaları)](https://arf.tamga.network/rulebook) · [Şəbəkəyə qoşulun](/join) · [Sənədi verən qurum kimi qoşulma](/learn/join-as-issuer)

---
title: Tamga Network-un heç vaxt görmədikləri
slug: what-the-network-never-sees
description: "Tamga Network-un siyahılarında və jurnallarında nəyin heç vaxt olmadığını, müvəqqəti xidmətlərinin fərdi məlumatlara harada toxunduğunu və operatorların nəyə çıxışı olduğunu izah edirik."
date: 2026-10-08
lang: az
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Sources: SPEC-TRUST-0001 TL11 (no personal data, credential or credential hash in any list, anchor log or change log); SPEC-BC-0001 DP1 (ledger later: no personal data, content or hash); ADR-0020 K2 + AS1–AS4 (no register of persons; data read from the authentic source at signing and dropped; persistent only subject_ref and keyed digest; Tamga never gets a contact address); ADR-0041 TI3–TI5 (trial register only in the sandbox); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (values once, deleted ≤ 5 min); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (identity service, data controller, ≤ 30 days provider image retention by contract, 10 copies, 730 days), §9.1 erasure; ADR-0011 (provisional until a state PID provider; Tamga data controller under KVKK); ADR-0022 (non-qualified, I2); ADR-0031 PS1–PS3 and "known weakening" with mitigations; ARF architecture §2.7 (deletion by resetting the wallet), §4.5 item 4 (no IP), §7.2 items 1, 6, 7 (no images at Tamga; statistics only in aggregate, groups ≥ 50); ARF rulebook RB-GEN-05 (no IP raw, hashed or truncated; debug logs ≤ 7 days); ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1 (no wallet operated). SPEC-TRUST-0001 security notes (single operator, quarterly transparency report, audit). Live check 2026-10-08: lotl.json / tl-tr.json fields and anchors.jsonl payloads contain no personal data. -->

Tamga Network insanların sənədlərinin məzmununu siyahılarında, jurnallarında və ya lövbər jurnalında heç vaxt görmür. Şəxslərlə bağlı qeyd saxlamır, sənədin harada və ya kimə göstərildiyini öyrənmir və IP ünvanlarını qeydə almır. Bununla belə şəbəkə fərdi məlumatlara qısa müddət ərzində toxunan bir neçə müvəqqəti xidmət idarə edir. Şəxsiyyət xidməti şəxsiyyət yoxlaması zamanı, host edilən sənəd vermə xidməti imza anında, host edilən yoxlayan tərəf isə sayt ondan istifadə etməyi seçəndə fərdi məlumatla qarşılaşır. Qaydalar bu xidmətlərin hər biri üçün nəyin nə qədər müddət saxlanıla biləcəyini və nəyin heç vaxt saxlanıla bilməyəcəyini müəyyən edir.

## Açıq etibar siyahılarında və lövbər jurnalında nə var?

`trust.tamga.network` ünvanındakı imzalanmış etibar siyahıları qurumları, yoxlayan tərəfləri və cüzdan provayderlərini göstərir. Qeyddə hüquqi ad, sertifikat barmaq izi, status və status tarixçəsi, tarixlər, ünvanlar və qurumun verə biləcəyi və ya yoxlayan tərəfin istəyə biləcəyi sənəd növləri olur. Qayda çox qısadır. Heç bir siyahıda, lövbər jurnalında və ya dəyişiklik qeydində fərdi məlumat, sənəd, hətta sənədin heşi belə ola bilməz (TL11 qaydası).

![Şəbəkənin hər bir açıq hissəsində nə var](/blog/what-the-network-never-sees/en/fig-katman.png)

Lövbər jurnalı qurumun status siyahısının hər dərcini imzalanmış sətir kimi qeydə alır. Bu sətirdə hansı siyahının, hansı versiyasının və hansı heşlə dərc edildiyi yazılır. Heç bir sətir şəxs haqqında məlumat vermir və heç bir sətirdə status siyahısındakı mövqe yer almır. Şəbəkə qeydlərini gələcəkdə ortaq reyestrə köçürəndə eyni qayda da onunla birlikdə köçəcək və heç bir müqavilə fərdi məlumat, sənəd məzmunu və ya sənəd heşi saxlamayacaq (DP1). Bunu özünüz də yoxlaya bilərsiniz, çünki siyahıların oxuna bilən nüsxələri `trust.tamga.network/lotl.json` və `tl-tr.json` ünvanlarındadır ([İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## İnsanların sənədləri harada saxlanılır?

Sənədlər şəxsin özündə saxlanılır və şəbəkənin heç bir yerində olmur. Sənəd qurumun sistemindən birbaşa şəxsin cüzdanına gedir. Tamga şəxslərlə bağlı qeyd saxlamır. Host edilən sənəd vermədə məlumatlar imza anında qurumun öz sistemindən, yəni səlahiyyətli mənbədən oxunur və sənəd verildikdən sonra yaddaşdan silinir ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Bu prosesdə yalnız iki məlumat saxlanılır. Birincisi, qurumun şəxs üçün istifadə etdiyi və təkbaşına məna daşımayan identifikatordur. Qurum bunun sayəsində sənədi sonradan ləğv edə və ya yeniləyə bilir. İkincisi, şəxsin kimliyinə bağlı təklif söhbətindədirsə, uyğunlaşdırmada istifadə olunan məlumatların açarlı heşidir. Şəxsiyyət nömrəsinin özü isə heç vaxt saxlanılmır. Tamga təklif üçün şəxsin e-poçt ünvanını və ya telefon nömrəsini də heç vaxt almır, çünki təklif keçidini qurumun özü göndərir.

Qurum Konsolunda sınaqlar üçün istifadə olunan "nümunə mənbə" reyestri var. Bu reyestr yalnız sandbox-da, test qurumları üçün mövcuddur və hər gecə silinir. Real şəbəkədə isə ümumiyyətlə açıla bilmir.

## Təqdimatı kim görür?

Adi halda təqdimatı yalnız cüzdan və yoxlayan tərəf görür. Təqdimat birbaşa cüzdandan yoxlayan tərəfə gedir. Status siyahıları və sxem kataloqu əvvəlcədən və toplu şəkildə endirildiyi üçün sənəd göstərildiyi anda nə qurumdan, nə də şəbəkədən heç nə istənilmir ([İzləmədən ləğv](/blog/status-list-privacy)). Şəxsin təqdimat tarixçəsi telefonda qalır və heç vaxt serverə və ya ehtiyat nüsxəyə getmir. Bu tarixçə cihazdan yalnız şəxsin özünün etdiyi, parolla qorunan ixracla çıxa bilər (WL4 qaydası). Yaş yoxlamasında yoxlayan tərəf daha da az görə bilər. Sıfır bilikli sübut istifadə olunanda yalnız şəxsin 18 yaşdan yuxarı olduğunu öyrənir ([Tamga-da sıfır bilik](/blog/zero-knowledge-in-tamga)).

Öz yoxlama proqramını idarə etmək istəməyən sayt host edilən yoxlayan tərəf olan Tamga Verify-dan istifadə edə bilər. Bu halda Tamga Verify şəxsin paylaşmağa razı olduğu sahələri görür, çünki onları sayt adından yoxlayır. Qaydalar bu vəziyyəti də məhdudlaşdırır. Dəyərlər yalnız sorğunu açan qeydiyyatlı sayta və ən çoxu bir dəfə verilir. Nəticədən ən geci beş dəqiqə sonra isə yaddaşdan silinir ([ADR-0017](https://docs.tamga.network/adr/0017-hosted-verifier-result-access)). Yoxlama nəticəsinin özü isə sahələrin dəyərlərini deyil, yalnız adlarını daşıyır və heç vaxt status siyahısı mövqeyini ehtiva etmir (AP3, AP4).

## Şəxsiyyət xidməti nəyi görür?

Dövlət şəxsiyyət provayderi təyin edənə qədər Tamga müvəqqəti şəxsiyyət xidməti idarə edir. Bu xidmət şəxsi uzaqdan yoxlayır və onun cüzdanına şəxsiyyət sənədi verir ([ADR-0011](https://docs.tamga.network/adr/0011-provisional-identity-attestation-provider)). Xidmət kvalifikasiyalı olmayan xidmət kimi qeydiyyatdadır. "Kvalifikasiyalı" sözü hüquqi statusdur və Tamga-nın hələ malik olmadığı müstəqil qiymətləndirmə tələb edir. Yoxlama zamanı bunlar baş verir:

- lisenziyalı uzaqdan yoxlama provayderi şəxsin şəxsiyyət sənədini və üzünü görür; bu emalın məlumat nəzarətçisi Tamga-dır və şəxs yoxlama başlamazdan əvvəl məlumatlandırma mətnini oxuyub açıq razılıq verir;
- şəxsiyyət xidməti şəxsin məlumatlarını yalnız sənəd verilənə qədər saxlayır;
- sənəd verildikdən sonra yalnız təkbaşına məna daşımayan identifikatoru, sənəd nömrəsinin açarlı heşini, etibarlılıq müddətini və nüsxələrin status siyahısındakı mövqelərini saxlayır;
- sənəd şəkilləri, selfi, video və sənəddən oxunan xam mətn Tamga-da heç vaxt saxlanılmır; provayderin şəkilləri saxlama müddəti isə müqavilə ilə ən çoxu 30 günlə məhdudlaşdırılıb ([şəxsiyyətin yoxlanılması, §8 və §9](https://docs.tamga.network/specifications/identity-proofing)).

![Fərdi məlumatlar haradan keçir və nə qədər qalır](/blog/what-the-network-never-sees/en/fig-gecis.png)

Şəxs hesab açmağa ehtiyac olmadan öz qeydini sildirə bilər. Cüzdan sahibliyin sübutu kimi şəxsiyyət xidmətinin verdiyi sənədləri göstərir. Xidmət də qeydi və ona bağlı hadisə jurnalı sətirlərini silir, bütün nüsxələri ləğv edir və provayderdən sessiyanı silməsini istəyir. Cüzdanı sıfırlamaq da eyni nəticəni verir və cüzdanın öz provayderindəki qeydi də silinir.

## Saytlara daxil olmaq üçün istifadə olunan psevdonimlər necə?

"Tamga ilə daxil ol" hər sayta özünə məxsus və dəyişməyən psevdonim verir. Beləliklə iki sayt eyni şəxsi bir-biri ilə uyğunlaşdıra bilmir ([ADR-0031](https://docs.tamga.network/adr/0031-per-site-pseudonyms)). Psevdonim cüzdanda toxumdan (seed) əldə edilir. Toxum isə şəxsiyyət xidmətində şəxsin dəyişməyən kimliyindən ayrıca açarla əldə edilir. Cüzdana heç bir sayta göstərilməyən sənəd növü daxilində verilir və xidmət onu saxlamır.

Qərar qeydi bu üsulun məhdudiyyətini açıq yazır və biz də burada təkrarlayırıq. Həm həmin açarı, həm də şəxsin şəxsiyyət nömrəsini əlində saxlayan kimsə, məsələn saytla əlbir olan şəxsiyyət xidmətinin operatoru, həmin şəxsin həmin saytdakı psevdonimini hesablaya bilər. Buna qarşı görülən tədbirlər qorunan açar anbarı, qeydə alınan açar girişləri, şəffaflıq hesabatında dərc olunan açar istifadəsi sayları və açarı dövlət şəxsiyyət provayderinə təhvil vermək imkanıdır. Bu dizayndan əvvəl isə hər sayt hər kəsi bir-biri ilə uyğunlaşdıra bilirdi.

## Şəbəkənin jurnallarında nə olur?

Şəbəkənin jurnalları əksər veb xidmətlərin saxladığından daha az məlumat ehtiva edir. Heç bir Tamga xidməti IP ünvanını nə olduğu kimi, nə heş şəklində, nə də qısaldılmış formada qeydə alır. Sazlama jurnalları ən çoxu yeddi gün saxlanılır ([Tamga ARF qaydalar kitabı, RB-GEN-05](https://arf.tamga.network/rulebook)). Jurnallarda və nəticələrdə sahə dəyərləri, şəxsiyyət nömrələri və status siyahısı mövqeləri olmur. Şəxsiyyət xidməti hadisənin növünü, təkbaşına məna daşımayan sessiya identifikatorunu və səviyyəni yazır, amma heç vaxt ad, sənəd nömrəsi və ya bal yazmır. İstifadə statistikası isə yalnız toplu şəkildə və ən azı 50 nəfərlik qruplar halında dərc olunur ([ARF §7.2](https://arf.tamga.network/architecture)).

## Sandbox necə ayrı saxlanılır?

`sandbox.tamga.network` ünvanındakı sandbox öz kök sertifikatı və öz siyahıları olan ayrıca test şəbəkəsidir ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Real şəbəkənin açarları orada heç nə imzalamır. Sandbox siyahıları özlərini test siyahısı kimi işarələyir və real şəbəkə üçün qurulmuş cüzdan və ya yoxlayan tərəf bu siyahıları rədd edir. Ona görə sandbox-da alınmış sənəd real yoxlayan tərəfdən heç vaxt keçmir.

Sandbox standart olaraq şəxsiyyət nömrələri etibarsız formatda yazılmış uydurma şəxslərdən istifadə edir. Real sənədlə şəxsiyyət yoxlamasını sınamaq istəyənlər üçün istəyə bağlı yol da var. Şəxs başlamazdan əvvəl aydın test xəbərdarlığını təsdiqləyir. Sənədə yalnız ad, soyad və doğum tarixi daxil olur, şəxsiyyət nömrəsi və sənəd nömrəsi isə heç vaxt daxil olmur. Provayderdəki sessiya dərhal silinir və hər şey gecə aparılan sıfırlamada təmizlənir ([ADR-0040](https://docs.tamga.network/adr/0040-sandbox-invited-real-identity)). Test qurumları Türkiyə şəxsiyyət nömrəsinin yoxlama cəmi qaydasından keçən 11 rəqəmli ədədi ehtiva edən qeydi saxlaya bilmir.

## Operatorlar nəyə çıxış əldə edə bilir, nəyə yox?

![Şəbəkə operatorlarının nəyə çıxışı var, nəyə yox](/blog/what-the-network-never-sees/en/fig-isletmeci.png)

| Operatorların çıxışı var | Operatorların çıxışı yoxdur |
|---|---|
| host edilən xidmət işləyərkən keçən məlumatlara: imza anında, şəxsiyyət yoxlaması zamanı və Tamga Verify-da ən çoxu beş dəqiqə | sənəd verildikdən sonra sənədlərin məzmununa |
| şəxsiyyət xidmətinin qeydlərinə: təkbaşına məna daşımayan identifikatorlar, sənəd nömrəsi heşləri, etibarlılıq müddəti, status mövqeləri | telefonda qalan şəxsi təqdimat tarixçəsinə |
| qurumun host edilən sənəd vermə xidməti vasitəsilə etdiyi ləğvlərə | sənədin harada, nə vaxt və kimə göstərildiyinə |
| IP ünvanı olmayan server giriş jurnallarına | insanların telefonlarındakı açarlara və ya cüzdanların öz qeydlərinə (şəbəkə cüzdan idarə etmir) |

Sağ sütundakı məhdudiyyətlər dizayn sayəsində təmin olunur, çünki bu məlumatlar şəbəkədə ümumiyyətlə olmur. Sol sütundakılar isə operatorun qaydalara əməl etməsinə söykənir. Ona görə sol sütun qısa saxlanılıb, müddətlə məhdudlaşdırılıb və yazıya alınıb.

## Dürüst məhdudiyyətlər hansılardır?

- **Şəxsiyyət xidməti etibar nöqtəsidir.** Yoxlama zamanı şəxsiyyət məlumatlarını görür və psevdonim açarını saxlayır. Bu xidmət dizayn etibarilə müvəqqətidir və onun rolunun dövlət şəxsiyyət provayderinə keçməsi planlaşdırılıb.
- **Bu gün bir operator var.** Siyahıları, lövbər jurnalını və host edilən xidmətləri bir müvəqqəti operator idarə edir. Açıq jurnal, dəyişiklik qeydi, qaydaların nəzərdə tutduğu rüblük şəffaflıq hesabatı və müstəqil auditlər sui-istifadənin qarşısını alır, amma onu qeyri-mümkün etmir. Bu məhdudiyyət müstəqil operatorlar reyestri birlikdə saxlayanda aradan qalxacaq ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).
- **Host edilən xidmətlər emal etdikləri məlumatları görür.** Şəbəkədən heç bir məlumatın keçməsini istəməyən qurum və ya sayt açıq mənbəli sənəd vermə və yoxlama paketlərini öz serverlərində işlədə bilər.

## Tez-tez verilən suallar

### Tamga Network diplomumu və ya şəxsiyyət məlumatlarımı saxlayırmı?

Xeyr. Sənədləriniz telefonunuzda saxlanılır və siyahılarda yalnız qurumlara və yoxlayan tərəflərə aid məlumatlar olur. Şəxsiyyət xidməti sənəd verildikdən sonra təkbaşına məna daşımayan identifikatoru və sənəd nömrənizin açarlı heşini saxlayır. Sənəd şəkillərinizi isə heç vaxt saxlamır.

### Tamga sənədlərimdən harada istifadə etdiyimi görə bilərmi?

Xeyr. Yoxlayan tərəflər status siyahılarını əvvəlcədən endirir və təqdimatlar birbaşa cüzdanınızdan yoxlayan tərəfə gedir. Sayt Tamga Verify-dan istifadə edirsə, Tamga Verify yalnız paylaşmağa razı olduğunuz sahələri və ən çoxu beş dəqiqə ərzində görür.

### Tamga IP ünvanımı qeydə alırmı?

Xeyr. Heç bir Tamga xidməti IP ünvanını nə olduğu kimi, nə heş şəklində, nə də qısaldılmış formada qeydə alır.

### Məlumatlarımın silinməsini tələb edə bilərəmmi?

Bəli. Cüzdanınız şəxsiyyət xidmətinin verdiyi sənədləri göstərərək xidmətdən qeydinizi silməsini istəyə bilər və cüzdanı sıfırlamaq da eyni nəticəni verir. Quruma və ya yoxlayan tərəfə də cüzdandan silmə sorğusu göndərə bilərsiniz.

### Sandbox-ı real şəxsiyyətimlə sınamaq təhlükəsizdirmi?

Bu yol istəyə bağlı və məhduddur. Test sənədinə yalnız adınız və doğum tarixiniz daxil olur, provayderdəki sessiya dərhal silinir və hər şey hər gecə təmizlənir. Sandbox standart olaraq uydurma şəxslərdən istifadə edir.

## Mənbələr

- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(Aİ) 2016/679 saylı Reqlament (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Aİ Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arxitektura (§2.7, §4.5, §7.2)](https://arf.tamga.network/architecture) · [Tamga ARF: qaydalar toplusu](https://arf.tamga.network/rulebook)
- [Tamga Network: məxfilik](https://docs.tamga.network/concepts/privacy) · [Şəxsiyyətin təsdiqi](https://docs.tamga.network/specifications/identity-proofing) · [Etibar siyahıları](https://docs.tamga.network/specifications/trust-lists)
- [ADR-0020: qurumda mötəbər mənbə](https://docs.tamga.network/adr/0020-authentic-source-at-institution) · [ADR-0031: hər sayt üçün ayrıca təxəllüslər](https://docs.tamga.network/adr/0031-per-site-pseudonyms) · [ADR-0038: sınaq mühiti](https://docs.tamga.network/adr/0038-sandbox)
- [Məlumatların minimuma endirilməsi](/learn/data-minimisation) · [Razılıq və nəzarət](/learn/consent-and-control) · [Etibar şəbəkəsi nədir?](/blog/what-is-a-trust-network)

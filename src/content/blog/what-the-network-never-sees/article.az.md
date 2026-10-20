---
title: Tamga Network-un heç vaxt görmədikləri
slug: what-the-network-never-sees
description: "Tamga Network-un siyahılarında, jurnallarında və xidmətlərində nə olmur, müvəqqəti xidmətlər fərdi məlumatlara harada toxunur, operatorlar nəyə çıxış əldə edə bilir, nəyə yox."
date: 2026-10-08
lang: az
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Sources: SPEC-TRUST-0001 TL11 (no personal data, credential or credential hash in any list, anchor log or change log); SPEC-BC-0001 DP1 (ledger later: no personal data, content or hash); ADR-0020 K2 + AS1–AS4 (no register of persons; data read from the authentic source at signing and dropped; persistent only subject_ref and keyed digest; Tamga never gets a contact address); ADR-0041 TI3–TI5 (trial register only in the sandbox); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (values once, deleted ≤ 5 min); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (identity service, data controller, ≤ 30 days provider image retention by contract, 10 copies, 730 days), §9.1 erasure; ADR-0011 (provisional until a state PID provider; Tamga data controller under KVKK); ADR-0022 (non-qualified, I2); ADR-0031 PS1–PS3 and "known weakening" with mitigations; ARF architecture §2.7 (deletion by resetting the wallet), §4.5 item 4 (no IP), §7.2 items 1, 6, 7 (no images at Tamga; statistics only in aggregate, groups ≥ 50); ARF rulebook RB-GEN-05 (no IP raw, hashed or truncated; debug logs ≤ 7 days); ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1 (no wallet operated). SPEC-TRUST-0001 security notes (single operator, quarterly transparency report, audit). Live check 2026-10-08: lotl.json / tl-tr.json fields and anchors.jsonl payloads contain no personal data. -->

Tamga Network insanların rəqəmsal sənədlərinin məzmununu nə siyahılarında, nə jurnallarında, nə də lövbər jurnalında görür. Şəbəkə insanların reyestrini aparmır, rəqəmsal sənədin harada və kimə təqdim edildiyini öyrənmir və IP ünvanlarını qeydə almır. Bununla belə, şəbəkə fərdi məlumatlara qısa müddət toxunan bir neçə müvəqqəti xidmət işlədir: şəxsiyyətin yoxlanılması zamanı şəxsiyyət xidməti, imzalama anında host edilən sənədvermə xidməti və sayt ondan istifadə etməyi seçdikdə host edilən yoxlayan tərəf. Bunların hər biri üçün qaydalar nəyin, nə qədər müddətə saxlanıla biləcəyini və nəyin heç vaxt saxlanıla bilməyəcəyini müəyyən edir.

## Açıq etibar siyahılarında və lövbər jurnalında nə var?

`trust.tamga.network` ünvanındakı imzalanmış etibar siyahıları qurumları, yoxlayan tərəfləri və cüzdan provayderlərini göstərir. Hər qeyddə hüquqi ad, sertifikatın barmaq izi (fingerprint), status və onun tarixçəsi, tarixlər, ünvanlar, həmçinin qurumun verə biləcəyi və ya yoxlayan tərəfin tələb edə biləcəyi rəqəmsal sənəd növləri olur. Qayda qısadır: heç bir siyahı, lövbər jurnalı və ya dəyişikliklər jurnalı fərdi məlumatları, rəqəmsal sənədi, hətta rəqəmsal sənədin heşini belə ehtiva etmir (TL11 qaydası).

![Şəbəkənin hər bir açıq hissəsində nə var](/blog/what-the-network-never-sees/en/fig-katman.png)

Lövbər jurnalı qurumun status siyahısının hər dərcini imzalanmış sətir kimi qeydə alır: hansı siyahı, hansı versiya, hansı daycest (digest). Heç bir sətir şəxs haqqında heç nə demir və heç bir sətirdə status siyahısındakı mövqe olmur. Şəbəkə gələcəkdə qeydlərini ortaq reyestrə (ledger) köçürəndə eyni qayda da onunla birlikdə keçəcək: heç bir müqavilə fərdi məlumatları, rəqəmsal sənədin məzmununu və ya heşini saxlamır (DP1). Bunu özünüz yoxlaya bilərsiniz; siyahıların oxunaqlı nüsxələri `trust.tamga.network/lotl.json` və `tl-tr.json` ünvanlarındadır ([İmzalanmış etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## İnsanların rəqəmsal sənədləri harada saxlanılır?

Şəxsin özündə — şəbəkənin heç bir yerində yox. Rəqəmsal sənəd qurumun sistemindən şəxsin rəqəmsal cüzdanına ötürülür. Tamga insanların reyestrini aparmır: host edilən sənədvermədə məlumatlar imzalama anında qurumun öz sistemindən, yəni onun mötəbər mənbəyindən oxunur və rəqəmsal sənəd verildikdən sonra yaddaşdan silinir ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)).

Yalnız iki şey saxlanılır, başqa heç nə. Birincisi, qurumun şəxs üçün qeyri-şəffaf istinadı — sonradan rəqəmsal sənədi ləğv edə və ya yeniləyə bilməsi üçün. İkincisi, şəxsin şəxsiyyətinə bağlanmış təklif üçün uyğunlaşdırma açarlarının açarlı daycesti; açıq şəxsiyyət nömrəsi isə heç vaxt saxlanılmır. Tamga təklif üçün şəxsin e-poçt ünvanını və ya telefon nömrəsini heç vaxt almır: keçidi qurum özü göndərir.

Qurum Konsolunda (Institution Console) sınaq üçün "nümunə mənbə" reyestri var. O, yalnız sınaq mühitində (sandbox), test qurumları üçün mövcuddur və hər gecə silinir; real şəbəkədə onu açmaq mümkün deyil.

## Təqdimatı kim görür?

Rəqəmsal cüzdan və yoxlayan tərəf — adi halda başqa heç kim. Təqdimat birbaşa rəqəmsal cüzdandan yoxlayan tərəfə gedir. Status siyahıları və sxem kataloqu əvvəlcədən, toplu şəkildə yüklənir, buna görə rəqəmsal sənəd təqdim edilən anda nə quruma, nə də şəbəkəyə heç bir sorğu göndərilmir ([İzləmədən ləğv](/blog/status-list-privacy)). Şəxsin təqdimat tarixçəsi telefonda qalır; heç vaxt serverə və ya ehtiyat nüsxəyə düşmür və cihazdan yalnız şəxsin özünün etdiyi, parolla qorunan ixrac vasitəsilə çıxır (WL4 qaydası). Yaş yoxlamasında yoxlayan tərəf daha da az görə bilər: sıfır bilikli sübut (zero-knowledge proof) ilə o, yalnız şəxsin 18 yaşdan böyük olduğunu öyrənir ([Tamga-da sıfır bilikli sübut](/blog/zero-knowledge-in-tamga)).

Öz yoxlama proqram təminatını işlətmək istəməyən sayt host edilən yoxlayan tərəfdən — Tamga Verify-dan istifadə edə bilər. Bu halda Tamga Verify şəxsin paylaşmağa razılıq verdiyi sahələri həqiqətən görür, çünki onları saytın adından yoxlayır. Qaydalar bu çıxışı məhdudlaşdırır: dəyərlər yalnız sorğunu açan qeydiyyatdan keçmiş sayta, ən çoxu bir dəfə verilir və nəticədən ən geci beş dəqiqə sonra yaddaşdan silinir ([ADR-0017](https://docs.tamga.network/adr/0017-hosted-verifier-result-access)). Yoxlama nəticəsinin özündə dəyərlər deyil, sahə adları olur və heç vaxt status siyahısındakı mövqe olmur (AP3, AP4).

## Şəxsiyyət xidməti nəyi görür?

Dövlət şəxsiyyət provayderi təyin edilənədək Tamga şəxsi uzaqdan yoxlayan və onun rəqəmsal cüzdanına şəxsiyyət rəqəmsal sənədi verən müvəqqəti şəxsiyyət xidməti işlədir ([ADR-0011](https://docs.tamga.network/adr/0011-provisional-identity-attestation-provider)). Bu xidmət qeyri-kvalifikasiyalı xidmət kimi qeydiyyatdadır; "kvalifikasiyalı" müstəqil qiymətləndirmə tələb edən hüquqi statusdur və Tamga-da hələ belə qiymətləndirmə yoxdur. Yoxlama zamanı:

- lisenziyalı uzaqdan yoxlama provayderi şəxsin şəxsiyyət sənədini və üzünü görür; bu emal üzrə məlumat nəzarətçisi Tamga-dır və şəxs yoxlama başlamazdan əvvəl bildirişi oxuyur və açıq razılıq verir;
- şəxsiyyət xidməti şəxsin sahələrini yalnız rəqəmsal sənəd verilənədək saxlayır;
- bundan sonra o, qeyri-şəffaf istinadı, sənəd nömrəsinin açarlı heşini, etibarlılıq müddətinin bitmə tarixini və nüsxələrin status siyahısındakı mövqelərini saxlayır, başqa heç nə;
- sənəd təsvirləri, selfilər, video və sənəddən çıxarılmış xam mətn heç vaxt Tamga-da saxlanılmır; provayderin təsvirləri öz tərəfində saxlaması müqavilə ilə ən çoxu 30 günlə məhdudlaşdırılır ([şəxsiyyətin təsdiqi, §8 və §9](https://docs.tamga.network/specifications/identity-proofing)).

![Fərdi məlumatlar haradan keçir və nə qədər qalır](/blog/what-the-network-never-sees/en/fig-gecis.png)

Şəxs hesab olmadan öz qeydini silə bilər. Rəqəmsal cüzdan sahiblik sübutu kimi şəxsiyyət xidmətinin özünün verdiyi rəqəmsal sənədləri təqdim edir; bundan sonra xidmət qeydi və onun hadisə jurnalı sətirlərini silir, bütün nüsxələri ləğv edir və provayderdən öz sessiyasını silməyi xahiş edir. Rəqəmsal cüzdanı sıfırlamaq da eyni nəticəni verir, üstəlik cüzdanın öz provayderindəki qeydi də silinir.

## Bəs saytlara daxil olmaq üçün istifadə olunan psevdonimlər necə?

"Sign in with Tamga" hər sayta özünəməxsus sabit psevdonim verir və iki sayt eyni şəxsi bir-biri ilə uyğunlaşdıra bilmir ([ADR-0031](https://docs.tamga.network/adr/0031-per-site-pseudonyms)). Psevdonim rəqəmsal cüzdanda toxumdan (seed) əldə edilir. Toxum isə şəxsiyyət xidmətində şəxsin dəyişməz şəxsiyyət məlumatlarından ayrıca açarla əldə edilir, rəqəmsal cüzdana heç vaxt sayta göstərilməyən rəqəmsal sənəd növü ilə çatdırılır və xidmət tərəfindən saxlanılmır.

Qərar sənədi bu məhdudiyyəti açıq şəkildə qeyd edir, ona görə də biz də onu burada təkrarlayırıq. Həm həmin açara, həm də şəxsin şəxsiyyət nömrəsinə sahib olan biri, məsələn, saytla sövdələşən şəxsiyyət xidmətinin operatoru, həmin şəxsin həmin saytdakı psevdonimini hesablaya bilər. Riskləri azaldan tədbirlər bunlardır: qorunan açar anbarı, açara girişin qeydiyyatı, şəffaflıq hesabatında açardan istifadə saylarının dərc edilməsi və açarın dövlət şəxsiyyət provayderinə təhvil verilməsi imkanı. Bu dizayndan əvvəl hər sayt hər kəsi uyğunlaşdıra bilirdi.

## Şəbəkənin jurnallarında nə olur?

Əksər veb-xidmətlərin saxladığından daha az. Heç bir Tamga xidməti IP ünvanlarını qeydə almır: nə xam, nə heşlənmiş, nə də qısaldılmış şəkildə. Sazlama (debug) jurnalları ən çoxu yeddi gün saxlanılır ([Tamga ARF qaydalar toplusu, RB-GEN-05](https://arf.tamga.network/rulebook)). Jurnallarda və nəticələrdə iddia (claim) dəyərləri, şəxsiyyət nömrələri və status siyahısındakı mövqelər olmur; şəxsiyyət xidməti hadisə növünü, qeyri-şəffaf sessiya istinadını və səviyyəni qeydə alır — heç vaxt adı, sənəd nömrəsini və ya balı yox. İstifadə statistikası yalnız ən azı 50 nəfərlik qruplar üzrə ümumiləşdirilmiş şəkildə dərc olunur ([ARF §7.2](https://arf.tamga.network/architecture)).

## Sınaq mühiti necə ayrı saxlanılır?

`sandbox.tamga.network` ünvanındakı sınaq mühiti (sandbox) öz kök sertifikatı və öz siyahıları olan ayrıca test şəbəkəsidir ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Real şəbəkənin açarları orada heç nə imzalamır, sınaq mühitinin siyahıları özlərini test kimi işarələyir, real şəbəkə üçün qurulmuş rəqəmsal cüzdan və ya yoxlayan tərəf isə onları rədd edir. Buna görə sınaq mühitinin rəqəmsal sənədi real yoxlayan tərəfdə heç vaxt keçərli sayılmır.

Defolt olaraq sınaq mühitində etibarsız formatlı şəxsiyyət nömrələri olan uydurma şəxslərdən istifadə olunur. Real sənədlə şəxsiyyətin yoxlanılmasını sınamaq üçün istəyə bağlı yol da var. Başlamazdan əvvəl şəxs aydın test xəbərdarlığını təsdiqləyir; rəqəmsal sənədə yalnız ad, soyad və doğum tarixi daxil edilir, şəxsiyyət nömrəsi və ya sənəd nömrəsi heç vaxt; provayderin sessiyası dərhal silinir; gecə sıfırlamasında isə hər şey silinir ([ADR-0040](https://docs.tamga.network/adr/0040-sandbox-invited-real-identity)). Test qurumları Türkiyə şəxsiyyət nömrəsinin nəzarət cəmi (checksum) yoxlamasından keçən 11 rəqəmli nömrə daşıyan qeydi saxlaya bilmir.

## Operatorlar nəyə çıxış əldə edə bilir, nəyə yox?

![Şəbəkə operatorlarının nəyə çıxışı var, nəyə yox](/blog/what-the-network-never-sees/en/fig-isletmeci.png)

| Operatorların çıxışı var | Operatorların çıxışı yoxdur |
|---|---|
| host edilən xidmət işləyərkən ötürülən məlumatlar: imzalama anında, şəxsiyyətin yoxlanılması zamanı və Tamga Verify-da beş dəqiqəyədək | verildikdən sonra rəqəmsal sənədlərin məzmunu |
| şəxsiyyət xidmətinin qeydləri: qeyri-şəffaf istinadlar, sənəd nömrələrinin heşləri, bitmə tarixi, status mövqeləri | şəxsin telefonda qalan təqdimat tarixçəsi |
| qurumun host edilən sənədvermə xidməti vasitəsilə etdiyi ləğvlər | rəqəmsal sənədin harada, nə vaxt və ya kimə təqdim edildiyi |
| IP ünvanları olmayan server giriş jurnalları | insanların telefonlarındakı açarlar və ya rəqəmsal cüzdanların öz qeydləri (şəbəkə heç bir rəqəmsal cüzdan işlətmir) |

Sağ sütun dizaynla təmin olunur: məlumatlar sadəcə orada yoxdur. Sol sütun operatorun qaydalara əməl etməsindən asılıdır və məhz buna görə qısadır, müddətlə məhdudlaşdırılıb və yazılı şəkildə müəyyən edilib.

## Dürüst məhdudiyyətlər hansılardır?

- **Şəxsiyyət xidməti etibar nöqtəsidir.** O, yoxlama zamanı şəxsiyyət məlumatlarını görür və psevdonim açarını saxlayır. O, dizayn etibarilə müvəqqətidir və onun rolunun dövlət şəxsiyyət provayderinə keçməsi nəzərdə tutulur.
- **Hazırda bir operator.** Siyahıları, lövbər jurnalını və host edilən xidmətləri tək, müvəqqəti operator idarə edir. İctimai jurnal, dəyişikliklər jurnalı, qaydaların tələb etdiyi rüblük şəffaflıq hesabatı və müstəqil auditlər sui-istifadənin qarşısını alır, lakin onu qeyri-mümkün etmir. Bu məhdudiyyət müstəqil operatorlar reyestri birlikdə idarə etməyə başladıqda aradan qalxır ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).
- **Host edilən xidmətlər emal etdikləri məlumatları görür.** Şəbəkədən heç nəyin keçməsini istəməyən qurum və ya sayt açıq mənbəli sənəd vermə və yoxlama paketlərini öz serverlərində işlədə bilər.

## Tez-tez verilən suallar

### Tamga Network diplomumu və ya şəxsiyyət məlumatlarımı saxlayırmı?

Xeyr. Rəqəmsal sənədləriniz telefonunuzdadır. Siyahılarda yalnız qurum və yoxlayan tərəf məlumatları var. Şəxsiyyət xidməti sənəd verildikdən sonra yalnız qeyri-şəffaf istinadı və sənəd nömrənizin açarlı hash-ini saxlayır, sənədlərinizin təsvirlərini isə heç vaxt saxlamır.

### Tamga rəqəmsal sənədlərimdən harada istifadə etdiyimi görə bilərmi?

Xeyr. Yoxlayan tərəflər status siyahılarını əvvəlcədən yükləyir, təqdimatlar isə birbaşa rəqəmsal cüzdanınızdan yoxlayan tərəfə gedir. Sayt Tamga Verify-dan istifadə edirsə, o, yalnız paylaşmağa razılıq verdiyiniz sahələri, ən çox beş dəqiqə ərzində görür.

### Tamga IP ünvanımı qeydə alırmı?

Heç bir Tamga xidməti IP ünvanlarını nə açıq, nə hash edilmiş, nə də qısaldılmış şəkildə qeydə almır.

### Məlumatlarımın silinməsini tələb edə bilərəmmi?

Bəli. Rəqəmsal cüzdanınız öz rəqəmsal sənədlərini təqdim etməklə şəxsiyyət xidmətindən qeydinizin silinməsini istəyə bilər; cüzdanı sıfırlamaq da eyni nəticəni verir. Siz həmçinin cüzdandan quruma və ya yoxlayan tərəfə silinmə sorğusu göndərə bilərsiniz.

### Sınaq mühitini real şəxsiyyətimlə yoxlamaq təhlükəsizdirmi?

Bu, könüllü və məhduddur: test rəqəmsal sənədinə yalnız adınız və doğum tarixiniz daxil edilir, provayder sessiyası dərhal silinir və hər gecə bütün məlumatlar təmizlənir. Sınaq mühiti standart olaraq uydurma şəxslərdən istifadə edir.

## Mənbələr

- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(Aİ) 2016/679 saylı Reqlament (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [Aİ Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arxitektura (§2.7, §4.5, §7.2)](https://arf.tamga.network/architecture) · [Tamga ARF: qaydalar toplusu](https://arf.tamga.network/rulebook)
- [Tamga Network: məxfilik](https://docs.tamga.network/concepts/privacy) · [Şəxsiyyətin təsdiqi](https://docs.tamga.network/specifications/identity-proofing) · [Etibar siyahıları](https://docs.tamga.network/specifications/trust-lists)
- [ADR-0020: qurumda mötəbər mənbə](https://docs.tamga.network/adr/0020-authentic-source-at-institution) · [ADR-0031: hər sayt üçün ayrıca təxəllüslər](https://docs.tamga.network/adr/0031-per-site-pseudonyms) · [ADR-0038: sınaq mühiti](https://docs.tamga.network/adr/0038-sandbox)
- [Məlumatların minimuma endirilməsi](/learn/data-minimisation) · [Razılıq və nəzarət](/learn/consent-and-control) · [Etibar şəbəkəsi nədir?](/blog/what-is-a-trust-network)

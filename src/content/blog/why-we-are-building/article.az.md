---
title: "Sənədlər rəqəmsaldır, etibar isə hələ kağız üzərindədir: Tamga Network-u niyə qururuq"
slug: why-we-are-building
description: Rəqəmsal sənədlər başqa ölkədə hələ də telefon zəngləri və apostil ilə yoxlanılır. Tamga Network-u niyə qurduğumuzu, necə işlədiyini və bu gün nəyin hazır olduğunu izah edirik.
date: 2026-10-29
lang: az
category: announcements
draft: false
related: learn:what-is-tamga-network, a-pdf-is-not-a-document, why-no-blockchain-yet, how-trust-lists-work, page:/manifesto
---

<!-- Sources: same as the English article (site home; live list of lists at trust.tamga.network: TR ACTIVE with provisional operator, AZ/KZ/KG/UZ reserved as TDT members, HU/TM reserved as observers, TAMGA-WP-1 ACTIVE since 2026-10-14; brand page; manifesto v1.0 revised edition 2026-10-27; CHANGELOG 1.0.0; npm 0.7.4 (2026-10-29); OpenID self-test article; ADR-0009, ADR-0042, ADR-0051; Regulation (EU) 2024/1183 Art. 5a). -->

Tamga Network bir qurumun verdiyi rəqəmsal sənədin başqa bir qurumda, hətta başqa ölkədə bir neçə saniyə ərzində yoxlanılmasına imkan verən ortaq qaydalar və imzalı siyahılardan ibarətdir. Yoxlayan tərəf sənədi verən quruma müraciət etmir, sənədin sahibi isə yalnız soruşulan məlumatı paylaşır. Şəbəkəni türk dünyası üçün, Avropanın rəqəmsal şəxsiyyət sistemi ilə eyni standartlardan istifadə edərək qururuq. Bu yazıda niyə başladığımızı, şəbəkənin necə işlədiyini, adımızın haradan gəldiyini, hansı prinsiplərə söykəndiyimizi və bu gün nəyin hazır olub-olmadığını izah edirik.

## Bu gün sənəd necə yoxlanılır?

Almatıdakı bir qurum Bakıda verilmiş sənədi yoxlamaq istəyəndə telefon zəngləri, e-poçtlar, apostil və həftələr lazım olur. Qurumun əlində adətən skan edilmiş PDF və ya surət olur. Hər ikisini asanlıqla dəyişmək olur və həqiqisini saxtasından ayırmaq üçün mütəxəssis lazımdır.

Problemin şəxsə aid tərəfi də var. Yaşınızı sübut etmək üçün şəxsiyyət vəsiqənizin hamısını, məzun olduğunuzu sübut etmək üçün bütün qiymət cədvəlinizi təqdim edirsiniz. Bu surətlərin hər biri başqasının serverində qalır. Üstəlik, hər ölkə öz rəqəmsal sistemini qurur. Bu sistemlər bir-birini tanımadığı üçün bir ölkədə rəqəmsal olan sənəd digər ölkədə yenidən kağıza çevrilir.

Sənədlər rəqəmsallaşıb, amma onlara olan etibarımız hələ də kağız üzərində işləyir. Bu problemləri [PDF sənəd deyil](/blog/a-pdf-is-not-a-document) yazımızda bir-bir nəzərdən keçiririk.

## Tamga Network necə işləyir?

Prosesdə üç tərəf iştirak edir: sənədi verən qurum, sənədi daşıyan şəxs və sənədi yoxlayan tərəf. Üçü də eyni imzalı siyahıya əsaslanır.

![Üç addım: qurum imzalayır, şəxs sənədi daşıyır, yoxlayan tərəf bir neçə saniyədə əmin olur](/blog/why-we-are-building/en/fig-steps.png)

1. **Qurum sənədi imzalayır.** Universitet, xəstəxana və ya ticarət palatası sənədi öz açarı ilə rəqəmsal imzalayır və şəxsin cüzdanına göndərir. Qurumun açarı dövlətin imzalı etibar siyahısında qeydiyyatdadır.
2. **Şəxs sənədi daşıyır.** Sənəd telefonda saxlanılır. Kimsə məlumat istəyəndə şəxs kimin, nəyi və niyə istədiyini görür və yalnız təsdiq etdiyi məlumatı göstərir.
3. **Yoxlayan tərəf bir neçə saniyədə əmin olur.** İmzanı və qurumun siyahıdakı qeydini yoxlayır. Mənbəyə müraciət etmir və cavab gözləmir.

Bütün sistem yoxlayan tərəfin quruma müraciət etməməsinə əsaslanır. İmza sənədin həmin qurumdan gəldiyini və üzərində bir hərfin belə dəyişmədiyini sübut edir. Etibar siyahısı isə imzalayanın həqiqətən həmin qurum olduğunu təsdiqləyir. Bu ikisi birlikdə telefon zənglərini, e-poçtları və apostili əvəz edir.

## Etibar siyahıları nəyə lazımdır?

Hər kəs açar yaradıb nəyisə imzalaya bilər. Buna görə də etibarlı imza imzalayanın həqiqi universitet olub-olmadığını tək başına göstərmir. Bu suala etibar siyahıları cavab verir. Siyahılar hər halqanın növbətini imzaladığı bir zəncir yaradır.

![Etibar zənciri: siyahılar siyahısı, Türkiyə siyahısı, qurum sertifikatı, sənəd](/blog/why-we-are-building/en/fig-chain.png)

Ən yuxarıda **siyahılar siyahısı** dayanır və hansı ölkə siyahılarının etibarlı olduğunu göstərir. Hər dövlətin **öz siyahısı** həmin ölkədə sənəd verməyə səlahiyyətli qurumları sadalayır. **Qurum sertifikatı** qurumun açarını tanıdır, **sənəd** isə həmin açarla imzalanır. Avropa İttifaqı da eyni modeldən istifadə edir.

Hər dövlət öz siyahısını özü dərc edir. Siyahıların bugünkü vəziyyəti belədir:

| Siyahı | Vəziyyət |
|---|---|
| Türkiyə | Dərc olunub. Tamga onu dövlət adından müvəqqəti idarə edir. |
| Azərbaycan, Qazaxıstan, Qırğızıstan, Özbəkistan | Türk Dövlətləri Təşkilatının bu üzv dövlətləri üçün yer ayrılıb; hər dövlət öz siyahısını özü dərc edəcək. |
| Macarıstan, Türkmənistan | Təşkilatın müşahidəçi dövlətləri üçün yer ayrılıb. |
| Avropa İttifaqı | Şəbəkə Aİ siyahılarını xarici siyahı kimi oxuya bilir; bu gün qoşulmuş Aİ siyahısı yoxdur. |

## Adımız niyə Tamgadır?

Tamğa türk və monqol xalqlarının qədim möhürüdür. Onu heyvanlara, silahlara, xalçalara, məzar daşlarına və sənədlərə vururdular. Tamğa bir şeyin kimə məxsus olduğunu, sözün kimdən gəldiyini və səlahiyyətin həqiqi olduğunu göstərirdi. Hər tayfanın öz tamğası var idi və o, eyni zamanda şəxsiyyət, imza və mülkiyyət sənədi rolunu oynayırdı.

Yoxlanıla bilən rəqəmsal sənəd bu gün eyni işi görür, sadəcə nişan kəsici alətlə deyil, riyaziyyatla vurulur. Loqomuz da eyni fikirdən gəlir. Nişan iç-içə keçmiş T hərfidir: xarici T şəbəkəni, daxili iki qol isə şəbəkəyə qoşulan dövlətləri və qurumları təmsil edir. O, möhür kimi bir xətt qalınlığı və bir bucaqla, heç bir əyri xətt olmadan kəsilib.

## Şəbəkə hansı prinsiplərə söykənir?

| Prinsip | Nə deməkdir |
|---|---|
| Şəxs mərkəzdədir | Sənəd şəxsin cüzdanında qalır və nəyin göstəriləcəyinə şəxs özü qərar verir. |
| Şəbəkə heç kimin mülkü deyil | Şəbəkə xidmət satmır və heç kimə üstünlük vermir. Məqsəd müstəqil fonddur. |
| Siyahı dövlətindir | Hər dövlət öz etibar siyahısının sahibidir və kimi tanıyacağına özü qərar verir. |
| Şəbəkədə şəxsi məlumat yoxdur | Siyahılarda, qeydlərdə və jurnallarda şəxsi məlumat, hətta onun heşi belə olmur. |
| Açıq qayda, açıq kod | Hər qayda nömrələnib və hamıya açıqdır, kod isə GitHub-dadır. |

Hər prinsip qaydalar kitabımız olan Tamga ARF-də nömrəli qaydalara çevrilir. Məsələn, "şəbəkədə şəxsi məlumat yoxdur" prinsipi etibar siyahılarında, jurnallarda və gələcəkdə qurulacaq ortaq reyestrdə sənədin məzmununun və ya heşinin olmamasını tələb edir.

## Niyə indi?

Avropa İttifaqı hər üzv dövlətdən 2026-cı ilin sonuna qədər vətəndaşlarına rəqəmsal şəxsiyyət cüzdanı təqdim etməyi tələb edir. Bu cüzdan ətrafındakı standartlar formalaşır; sənəd formatları, protokollar və etibar siyahıları artıq müəyyən olunub. Manifestimiz vəziyyəti belə ifadə edir: bu dəyişikliyin baş verib-verməyəcəyi artıq sual deyil, əsl sual onu kimin quracağı və kimin sadəcə satın alacağıdır.

Yeni modeli kənardan ala və ya eyni açıq standartlarla öz infrastrukturumuzu qura bilərdik. Biz qurmağı seçdik. Avropa ilə eyni sənəd formatlarından və protokollardan istifadə edirik, qaydalar və siyahılar isə türk dünyası dövlətlərinə məxsusdur. Beləliklə, şəbəkə həm Avropa ilə uyğun, həm də müstəqil qalır. Avropa tarixlərinin təfərrüatı [Aİ təqvimi](/learn/eu-timeline) səhifəsindədir.

## Bu gün nə hazırdır, nə hələ yoxdur?

| Bu gün hazırdır | Hələ yoxdur |
|---|---|
| Qaydalar: Tamga ARF 1.0 və qaydalar kitabları (arf.tamga.network) | Real şəbəkədə sənəd verən qurum yoxdur; ilk qurum pilotla qoşulacaq |
| İngilis və türk dillərində tərtibatçı sənədləri (docs.tamga.network) | Siyahıdakı cüzdanların heç biri hələ tətbiq mağazalarında deyil |
| İmzalı etibar siyahıları (trust.tamga.network); ilk cüzdan provayderi də siyahıdadır | İstehsalda ortaq reyestr yoxdur; kodu yazılıb və sınaqdan keçib, amma ən azı iki müstəqil operator onu işlədənə qədər bağlı qalacaq |
| Tamga Verify: yoxlama kodunu özü işlətmək istəməyənlər üçün yoxlama xidməti | Heç bir dövlətin və ya Avropa İttifaqının tanınması yoxdur |
| Uydurma şəxslərlə başdan-sona sınaq aparılan test şəbəkəsi və npm-də açıq paketlər (@tamga-network, versiya 0.7.4) | Xarici təhlükəsizlik auditi hələ aparılmayıb |
| OpenID Foundation-ın uyğunluq test aləti ilə aparılan və uğursuz modul qalmadan bitən özünü yoxlama | |

Bu məhdudiyyətləri açıq yazırıq, çünki məhdudiyyətlərini gizlədən etibar infrastrukturu etibara layiq deyil. Ortaq reyestrin niyə hələ olmadığını [Niyə blokçeyn olmadan başlayırıq](/blog/why-no-blockchain-yet) yazısında izah etdik: ən azı iki müstəqil operator olmadan reyestr sadəcə daha yavaş verilənlər bazasıdır. Uyğunluq testlərinin təfərrüatı [OpenID uyğunluq testlərindən öyrəndiklərimiz](/blog/openid-conformance-self-test) yazısındadır.

## Haradan başlamalı?

- **Anlayışlar sizin üçün yenidirsə,** [öyrənmə bölməsi](/learn) rəqəmsal şəxsiyyətdən Tamga Network-a addım-addım aparır.
- **Qurumunuz sənəd verir və ya yoxlayırsa,** [qoşulma səhifəsi](/join) necə iştirak edəcəyinizi izah edir.
- **Tərtibatçısınızsa,** [sandbox bələdçisi](https://docs.tamga.network/guides/sandbox) hər addımı test şəbəkəsində necə sınayacağınızı göstərir.

## Tez-tez verilən suallar

### Tamga Network blokçeyndirmi?

Xeyr. Bu gün etibar imzalı və versiyalanan siyahılardan gəlir. Ortaq reyestrin kodu yazılıb və sınaqdan keçib, amma yalnız ən azı iki müstəqil operator onu işlətdikdə açılacaq.

### Tamga Network kimə məxsusdur?

Şəbəkə xidmət satmır və heç kimə üstünlük vermir. Bu gün onu müvəqqəti operator idarə edir, məqsəd isə müstəqil fonddur.

### Sənədim harada saxlanılır?

Öz telefonunuzdakı cüzdanda. Şəbəkənin siyahılarında, qeydlərində və jurnallarında şəxsi məlumat olmur.

### Bu gün istifadə edə biləcəyim cüzdan varmı?

Şəbəkə cüzdan işlətmir, cüzdanları siyahıya alır. Siyahıdakı ilk cüzdan olan Tamga Wallet hələ tətbiq mağazalarında deyil. Siyahıdakı cüzdanlardan biri mağazaya çıxana qədər bütün addımları test şəbəkəsində sınamaq olar.

## Mənbələr

- [Tamga Network nədir](/learn/what-is-tamga-network)
- [Etibar siyahıları](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network)
- [Manifest](/manifesto)
- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

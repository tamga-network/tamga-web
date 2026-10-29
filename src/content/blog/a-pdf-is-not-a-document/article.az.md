---
title: "PDF sənəd deyil: bu gün sənədlərin dörd problemi"
slug: a-pdf-is-not-a-document
description: Skan edilmiş PDF nə sənədi kimin verdiyini, nə də sənədin hələ etibarlı olub-olmadığını sübut edir. Sənədlərin dörd problemi və yoxlanıla bilən sənədin onlara cavabı.
date: 2026-10-29
lang: az
category: network
draft: false
related: why-we-are-building, learn:paper-to-digital, learn:selective-disclosure, how-trust-lists-work, zero-knowledge-in-tamga
---

<!-- Sources: same as the English article (site home why.problems and tech texts; learn pages; Tamga ARF 1.0 §4.4 and §8.4; whitepaper §9 and docs concepts/revocation; docs concepts/privacy; live list of lists: TR ACTIVE, AZ/KZ/KG/UZ reserved as TDT members, HU/TM as observers; manifesto v1.0 revised edition 2026-10-27; Regulation (EU) 2024/1183 Art. 5a). -->

Skan edilmiş PDF sənədin şəklidir. O nə sənədi kimin verdiyini, nə də sənədin hələ etibarlı olub-olmadığını sübut edir. Bu gün sənədlərin dörd problemi var: saxtasını düzəltmək asandır, yoxlanılması yavaşdır, lazım olandan artıq məlumat açır və hər ölkənin sistemi ayrıdır. Yoxlanıla bilən rəqəmsal sənəd bu dörd problemin hamısına cavab verir. Bu yazıda problemləri ardıcıllıqla nəzərdən keçirir, hər birinin bu gün necə yaşandığını və yoxlanıla bilən sənədin onu necə həll etdiyini izah edir, sonra isə bir diplomun Bakıdan Almatıya yolunu izləyirik.

![Sənədlərin dörd problemi, bu gün və yoxlanıla bilən sənədlə](/blog/a-pdf-is-not-a-document/en/fig-problems.png)

## 1. Saxta sənəd düzəltmək niyə bu qədər asandır?

PDF-in və ya surətin üzərindəki mətni dəyişmək bir neçə dəqiqə çəkir. Qiyməti, tarixi və ya adı dəyişdirilmiş sənəd ilk baxışda həqiqisindən seçilmir. Dəyişikliyi görmək üçün möhürü, imzanı, kağızı və şrifti tanıyan mütəxəssis lazımdır. Əksər qurumların nə buna vaxtı, nə də belə mütəxəssisi var. Buna görə də qurumlar ya sənədlərə kor-koranə etibar edir, ya da heç etibar etmir.

Yoxlanıla bilən sənəddə qurum sənədi öz açarı ilə rəqəmsal imzalayır. İmza sənədin məzmunundan hesablandığı üçün bir hərf belə dəyişsə, hesab tutmur və sənəd yoxlamadan keçmir. Dəyişikliyi görmək üçün mütəxəssis gözünə ehtiyac qalmır, çünki bunu riyaziyyat göstərir.

Bir sual qalır: imzalayan həqiqətən həmin qurumdurmu? Açar yaradan hər kəs nəyisə imzalaya bildiyi üçün yoxlayan tərəf imza ilə yanaşı dövlətin imzalı etibar siyahısına da baxır. Qurumun açarı həmin siyahıda qeydiyyatda deyilsə, sənəd qəbul edilmir. Saxta universitet riyazi baxımdan etibarlı imza ata bilər, amma siyahıda olmadığı üçün onun sənədi yenə rədd edilir.

## 2. Yoxlama niyə həftələrlə çəkir?

İşəgötürən başqa ölkədən gələn namizədin diplomunu yoxlamaq istəyəndə universitetə yazır və cavab gözləyir. Sənəd xaricdə istifadə olunacaqsa, üstəlik apostil lazımdır. Bütün bunlar həftələrlə çəkir, çünki yoxlamağın yeganə yolu sənədi verən quruma müraciət etməkdir. Universitet tətildədirsə, arxivi bağlıdırsa və ya qurum artıq mövcud deyilsə, proses dayanır.

Yoxlanıla bilən sənəddə yoxlayan tərəf mənbəyə müraciət etmir. İmzanı və qurumun siyahıdakı qeydini özü yoxlayır və bu bir neçə saniyə çəkir. Yoxlayan tərəflər etibar siyahılarını və ləğv siyahılarını əvvəlcədən yükləyir. Buna görə də sənəd yoxlandığı anda quruma heç bir sorğu getmir və qurum sənədin harada, nə vaxt göstərildiyini öyrənmir. Qurumun serverləri həmin an bağlı olsa belə, sənədi yoxlamaq mümkündür.

Hər yoxlama üç nəticədən biri ilə bitir.

![Yoxlamanın üç nəticəsi: qəbul, rədd, hazırda yoxlamaq mümkün deyil](/blog/a-pdf-is-not-a-document/en/fig-outcomes.png)

| Nəticə | Nə vaxt | Nə deməkdir |
|---|---|---|
| Qəbul | İmza düzgündür, qurum siyahıdadır və sənəd ləğv edilməyib | Sənəd etibarlıdır |
| Rədd | İmza pozulub, qurum siyahıda deyil və ya sənəd ləğv edilib | Sənəd etibarlı deyil |
| Hazırda yoxlamaq mümkün deyil | Lazım olan siyahını həmin an əldə etmək olmur | Qərar vermək mümkün deyil, sənəd saxta sayılmır |

Üçüncü nəticənin səbəbi sadədir: əlçatmaz server sənədi saxta etmir. Bu nəticə olmasaydı, şəxs sənədi ilə heç bir əlaqəsi olmayan nasazlığa görə geri qaytarıla bilərdi.

## 3. Niyə lazım olandan artıq məlumat veririk?

Yaşınızı sübut etmək üçün şəxsiyyət vəsiqənizin hamısını, məzun olduğunuzu sübut etmək üçün bütün qiymət cədvəlinizi göstərirsiniz. Qapıdakı işçi yalnız 18 yaşdan böyük olub-olmadığınızı bilmək istəyərkən doğum tarixinizi, ünvanınızı və şəxsiyyət nömrənizi də görür. Hər surət başqasının serverində qalır və hər biri yeni sızma imkanına çevrilir.

Yoxlanıla bilən sənəddə hər sahə ayrıca möhürlənir. Şəxs yalnız soruşulan sahəni açır, digərləri bağlı qalır. Yoxlayan tərəf açılan sahəni və imzanı yoxlayır, bağlı sahələri isə görə bilmir.

![Yoxlayan tərəfin gördüyü: yalnız soruşulan sahə açıqdır, digərləri gizlidir](/blog/a-pdf-is-not-a-document/en/fig-what-is-seen.png)

Rəqəmsal cüzdan daha bir addım ataraq hər yoxlayan tərəfə sənədin ayrıca nüsxəsini göstərir. Beləliklə, iki yoxlayan tərəf qeydlərini müqayisə edib eyni şəxsi eyniləşdirə bilmir. Sıfır bilik sübutu isə yaş sualına doğum tarixini heç işə qatmadan cavab verə bilir. Bunun necə işlədiyini [Tamga-da sıfır bilik sübutu](/blog/zero-knowledge-in-tamga) yazısında izah edirik.

## 4. Niyə hər ölkə öz sistemini qurur?

Hər ölkə öz rəqəmsal sistemini qurur və bu sistemlər bir-birini tanımır. Bir ölkədə verilmiş rəqəmsal sənəd başqa ölkədə yenidən kağıza çevrilir, çünki qarşı tərəf nə sənədin formatını oxuya bilir, nə də imzalayana etibar edib-etməyəcəyini bilir.

Bunun həlli ortaq standartlar və ortaq etibar strukturudur. Tamga Network Avropanın rəqəmsal şəxsiyyət sistemindəki standartlardan istifadə edir:

| Səviyyə | Standart | Nə işə yarayır |
|---|---|---|
| Sənəd formatı (onlayn) | SD-JWT VC | Sahələri bir-bir açıla bilən imzalı sənəd |
| Sənəd formatı (üz-üzə) | ISO mdoc (ISO/IEC 18013-5) | Telefondan üz-üzə göstərilən sənəd |
| Sənədin verilməsi | OpenID4VCI | Sənədi qurumdan cüzdana ötürür |
| Sənədin təqdimatı | OpenID4VP | Seçilmiş sahələri cüzdandan yoxlayan tərəfə göndərir |
| Etibar | İmzalı etibar siyahıları (ETSI) | Hansı qurumun nəyi verməyə səlahiyyətli olduğunu qeyd edir |

Hər dövlət öz etibar siyahısını özü dərc edir və siyahılar siyahılar siyahısında birləşir. Bu gün Türkiyə siyahısı dərc olunub. Türk Dövlətləri Təşkilatının digər üzv dövlətləri (Azərbaycan, Qazaxıstan, Qırğızıstan və Özbəkistan) və müşahidəçi dövlətləri Macarıstan və Türkmənistan üçün də yer ayrılıb.

## Diplom Bakıdan Almatıya necə gedər?

Bakıdakı universitetin məzunu Almatıda işə müraciət edir. Bu gün işəgötürən diplomun skan edilmiş surətini alır, universitetə yazır və həftələrlə cavab gözləyir. Ortaq etibar strukturu ilə eyni yoxlama belə işləyir:

1. Məzun diplomu telefonundakı cüzdandan göstərir və yalnız ixtisasını və məzun olduğu ili açır.
2. İşəgötürən imzanı yoxlayır və universitetin Azərbaycan siyahısında qeydiyyatda olduğunu görür.
3. İşəgötürən Bakıya zəng etmədən və cavab gözləmədən bir neçə saniyə ərzində əmin olur.

Bu nümunədə Azərbaycan siyahısının dərc olunduğunu fərz edirik, halbuki bu gün yalnız onun yeri ayrılıb. Hər dövlət öz siyahısını dərc etdikdə bu yoxlama ölkələr arasında həqiqətən işləməyə başlayır.

## Avropadakı irəliləyiş türk dünyası üçün nə deməkdir?

Avropa İttifaqı hər üzv dövlətdən 2026-cı ilin sonuna qədər vətəndaşlarına rəqəmsal şəxsiyyət cüzdanı təqdim etməyi tələb edir. Diplom, sürücülük vəsiqəsi və üzvlük kimi sənədlər cüzdana köçür və eyni standartlarla yoxlanılır. Ortaq etibar strukturu olmasa, türk dünyasının sənədləri bu sistemdən kənarda qalar. Sənədlər Avropadakı yoxlayan tərəflərin oxuya bildiyi formatda verilməz, onları verən qurumlar da Avropanın baxdığı siyahılarda yer almaz.

Manifestimiz də eyni nöqtədən başlayır. Bu dəyişikliyin baş verib-verməyəcəyi artıq sual deyil; əsl sual onu kimin quracağı və kimin sadəcə satın alacağıdır. Tamga Network-un cavabı eyni standartlarla qurulan, qaydaları və siyahıları türk dünyası dövlətlərinə məxsus olan şəbəkədir. Avropa tarixlərinin təfərrüatı [Aİ təqvimi](/learn/eu-timeline) səhifəsindədir.

## Tez-tez verilən suallar

### Yoxlanıla bilən sənəd nədir?

Bu, qurumun rəqəmsal imzaladığı sənəddir. O, şəxsin cüzdanında saxlanılır və hər kəs onu verən quruma müraciət etmədən yoxlaya bilər. Üzərində bir hərf belə dəyişsə, imza artıq uyğun gəlmir.

### Yoxlayan tərəf niyə sənədi verən quruma müraciət etmir?

Lazım olan hər şey imzada və dövlətin etibar siyahısındadır. Yoxlayan tərəf imzanı yoxlayır və qurumun siyahıda qeydiyyatda olduğunu görür.

### Qurumun serveri bağlıdırsa, nə olur?

Sənədi yenə yoxlamaq olar, çünki yoxlayan tərəflər siyahıları əvvəlcədən yükləyir. Lazım olan siyahını heç cür əldə etmək mümkün deyilsə, nəticə "hazırda yoxlamaq mümkün deyil" olur.

### Skan edilmiş PDF aradan qalxırmı?

Xeyr. PDF oxumaq və arxivləşdirmək üçün faydalı olaraq qalacaq. Sənədin həqiqi olduğunu sübut etmək lazım olanda isə bu işi imzalı, yoxlanıla bilən sənəd görür.

## Mənbələr

- [Kağızdan rəqəmsala](/learn/paper-to-digital)
- [Rəqəmsal imza](/learn/digital-signatures)
- [Seçici paylaşım](/learn/selective-disclosure)
- [Etibar siyahıları](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network), §4.4 (təqdimat və yoxlama) və §8.4 (standartlar xəritəsi)
- [Manifest](/manifesto)
- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

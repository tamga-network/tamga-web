---
title: Niyə blokçeyn olmadan başlayırıq
slug: why-no-blockchain-yet
description: "Tək operatorun idarə etdiyi reyestr sadəcə daha yavaş verilənlər bazasıdır. Tamga Aİ modeli olan imzalı etibar siyahıları ilə başlayır, reyestri isə müstəqil operatorlar qoşulduqda əlavə edir."
date: 2026-09-27
lang: az
category: network
draft: false
related: how-trust-lists-work, network-as-a-foundation, learn:trust-lists, learn:why-not-blockchain-yet, page:/whitepaper
---

Əvvəlki yazılarımızda icazəli (permissioned) blokçeyni Tamga-nın etibar dayağı kimi təqdim etmişdik. 24 sentyabr 2026-cı ildə biz hədəfi deyil, ardıcıllığı dəyişdik. Səbəbi aşağıdadır.

## Reyestr üçün bir əl kifayət deyil

Blokçeyn yalnız bir neçə **müstəqil** tərəf eyni qeydi saxladıqda və heç biri onu təkbaşına yenidən yaza bilmədikdə özünü doğruldur. Hazırda yalnız bir operator var: dövlətlər adından müvəqqəti fəaliyyət göstərən Tamga. Tək validatorlu zəncir xərci və mürəkkəbliyi artırır, lakin əlavə etibar yaratmır.

## Bunun əvəzinə nə edirik

Biz [imzalı etibar siyahıları](/learn/trust-lists) dərc edirik — bu, Avropa İttifaqının (Aİ) öz etibarlı siyahıları üçün istifadə etdiyi modeldir. Siyahılar versiyalanır və heş zənciri ilə bir-birinə bağlanır, heç nə silinmir, hər ləğv siyahısının dərci və hər sxem dəyişikliyi ictimai, saatlıq **lövbər jurnalına** (anchor log) yazılır. Geri qaytarılmış və ya yenidən yazılmış siyahını istənilən şəxs aşkar edə bilər ([imzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## Nə dəyişmir

- Qurum və sənəd növü identifikatorları müqavilələrin hesabladığı qaydada eynilə hesablanır.
- Siyahının hər sahəsi müqavilədəki bir qeydə uyğun gəlir; siyahının tarixçəsi reyestrdə təkrar icra oluna bilər və hər ikisinin eyni nəticələri verdiyi sınaqdan keçirilir.
- Rəqəmsal cüzdanlar, yoxlayan tərəflər və rəqəmsal sənədlər etibar məlumatını vahid interfeys vasitəsilə oxuyur; keçid onlar üçün heç nəyi dəyişmir.

## Reyestr nə vaxt gələcək

İcazəli Besu/QBFT reyestri ən azı iki müstəqil validator operatoru yazılı razılıq verdikdən sonra işə salınacaq. O vaxta qədər bunu açıq deyirik ([şəbəkə niyə fonda doğru gedir](/blog/network-as-a-foundation)): etibar dayağı bir operatorun imzasına əsaslanır; ictimai jurnal, şəffaflıq hesabatı və auditlər sui-istifadəni çətinləşdirir, lakin onu qeyri-mümkün etmir. Ətraflı məlumat [whitepaper v1.0](/whitepaper) sənədindədir.

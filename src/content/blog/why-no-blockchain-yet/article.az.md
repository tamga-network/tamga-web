---
title: Niyə blokçeyn olmadan başlayırıq
slug: why-no-blockchain-yet
description: "Bir operatorun saxladığı reyestr sadəcə daha yavaş verilənlər bazasıdır. Tamga Aİ modeli olan imzalanmış etibar siyahıları ilə başlayır və reyestri müstəqil operatorlar qoşulanda əlavə edəcək."
date: 2026-09-27
lang: az
category: network
draft: false
related: how-trust-lists-work, network-as-a-foundation, learn:trust-lists, learn:why-not-blockchain-yet, page:/whitepaper
---

Əvvəlki yazılarımızda icazəli blokçeyni Tamga-nın etibar lövbəri kimi təsvir edirdik. 24 sentyabr 2026-cı ildə məqsədimizi dəyişmədən ora hansı ardıcıllıqla gedəcəyimizi dəyişdik. Bu yazıda bunun səbəbini izah edirik.

## Reyestri niyə bir əl saxlaya bilməz?

Blokçeyn eyni qeydi bir neçə **müstəqil** tərəf saxlayanda və onlardan heç biri bu qeydi təkbaşına dəyişə bilməyəndə öz xərcinə dəyir. Bu gün isə bir operator var və bu operator dövlətlər adından müvəqqəti olaraq işləyən Tamga-dır. Bir validatoru olan zəncir xərci və mürəkkəbliyi artırır, amma etibarı heç artırmır.

## Bunun əvəzinə nə edirik?

[İmzalanmış etibar siyahıları](/learn/trust-lists) dərc edirik. Aİ də öz etibar siyahıları üçün bu modeldən istifadə edir. Siyahılar versiyalanır, heşlərlə bir-birinə zəncirlənir və onlardan heç nə silinmir. Ləğv siyahısının hər dərci və sxemin hər dəyişikliyi saatda ən azı bir dəfə yazılan açıq **lövbər jurnalına** düşür. Ona görə köhnə versiyaya qaytarılmış və ya sonradan dəyişdirilmiş siyahını hər kəs aşkar edə bilər ([imzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work)).

## Nə dəyişməyəcək?

- Qurum və sənəd növü identifikatorları ağıllı müqavilələrin hesabladığı kimi hesablanır.
- Siyahılardakı hər sahə müqavilə qeydinə uyğun gəlir. Siyahının tarixçəsini reyestrə əvvəldən yazmaq olar və testlər hər ikisinin eyni cavabı verdiyini təsdiqləyir.
- Cüzdanlar, yoxlayan tərəflər və sənədlər etibar məlumatını bir interfeysdən oxuyur, ona görə keçid onlar üçün heç nəyi dəyişməyəcək.

## Reyestr nə vaxt gələcək?

İcazəli Besu/QBFT reyestri ən azı iki müstəqil validator operatoru bunu yazılı şəkildə qəbul edəndə işə salınacaq. O vaxta qədər vəziyyəti açıq deyirik ([şəbəkə niyə fonda doğru gedir](/blog/network-as-a-foundation)). Etibar lövbəri bir operatorun imzasına söykənir. Açıq jurnal, şəffaflıq hesabatı və auditlər sui-istifadənin qarşısını alır, amma onu qeyri-mümkün etmir. Təfərrüatları [whitepaper v1.0](/whitepaper) sənədində tapa bilərsiniz.

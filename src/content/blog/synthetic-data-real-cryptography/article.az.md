---
title: "Real kriptoqrafiya, bu gün işləyir: Tamga-nın ilk buraxılışı"
slug: synthetic-data-real-cryptography
description: "Bu gün nəyin başdan sona işlədiyi (diplomlar, ləğv, şəxsiyyət, keçidlər, biletlər, sayta giriş) və hələ də etdiyimiz bütün güzəştlər — açıq siyahı ilə."
date: 2026-09-27
lang: az
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Biz universitetin həqiqətən istifadə edəcəyi sistemi qurduq, sonra onu uydurma tələbələr üzərində işlətdik. Bütün kriptoqrafiya realdır; yalnız insanlar və bəzi əməliyyat hissələri real deyil.

## Bu gün nə işləyir

- Universitet diplomu və ya tələbə biletini rəqəmsal cüzdana on nüsxə şəklində verir; hər nüsxə fərqli cihaz açarına bağlıdır.
- İşəgötürən iki sahə istəyir və məhz həmin ikisini alır — saniyələr ərzində yoxlanılmış şəkildə.
- Ləğv növbəti sabit dərc zamanı bütün yoxlayan tərəflərə çatır; universitetin fəaliyyəti dayandırıldıqda yeni sənəd verilməsi dayanır, əvvəl verilmiş diplomlar isə etibarlı qalır.
- Rəqəmsal sənədin ekran görüntüsü rədd edilir; başqa telefonun açarı ilə təqdim edilən nüsxə də rədd edilir.
- Şəxsiyyət yoxlaması şəxsiyyət sənədi yaradır, həm də ISO mdoc formatında: yaş yoxlaması yalnız “18 yaşdan yuxarı” məlumatını alır.
- Kampus turniketləri və tədbir girişləri 60 saniyəlik QR keçidini qəbul edir; bilet yalnız bir dəfə işləyir.
- Veb-sayt şəxsi rəqəmsal cüzdan vasitəsilə qeydiyyatdan keçirir, sonra isə hər gün passkey ilə daxil olmağa imkan verir.

## Hələ nə güzəştlə işləyir

Hər bir sadələşdirmə qeydə alınır və pilotdan əvvəl aradan qaldırılır: tələbə qeydləri nümunədir, açarlar telefonun təhlükəsiz çipində deyil, proqram təminatında saxlanılır, universitetin imza açarı Tamga-da saxlanılır, cüzdan provayderi tətbiqin öz platforması barədə verdiyi məlumatı qəbul etmir (hər rəqəmsal cüzdan proqram təminatı səviyyəsində sayılır; App Store və Google Play-də buraxılışla App Attest / Play Integrity məcburi olacaq) və yalnız bir operator var. Veb-sayta giriş hələ də qeydiyyat zamanı bütün saytlar üçün eyni hesab dəyərindən istifadə edir; hər sayt üçün ayrıca təxəllüs yol xəritəsindədir. *(Yeniləmə, 2026-10-06: hər sayt üçün ayrıca təxəllüslər artıq işləyir. Şəbəkə heç bir cüzdan provayderini idarə etmir: hər rəqəmsal cüzdan öz provayderini idarə edir (ADR-0042). Real şəbəkədə Tamga qurumların imza açarlarını saxlamır (Tamga ARF §3).)*

> **Qeyd:** Yeniləmə, 8 oktyabr 2026: rəqəmsal cüzdan versiyalarında açarlar artıq telefonun təhlükəsiz aparat modulunda saxlanılır, aparat attestasiyası olmayan cüzdanlar isə canlı xidmətdə cüzdan attestasiyası almır. App Attest və Android açar attestasiyasından istifadə olunur; Play Integrity əlavə, könüllü yoxlamadır. Baxın: [Rəqəmsal cüzdana necə etibar etmək olar?](/blog/trusting-a-wallet).

## Bütün bunları niyə deyirik

Çünki öz məhdudiyyətlərini gizlədən etibar infrastrukturu etibarlı deyil. Şəbəkənin nə etdiyi və nə etmədiyi [Etibar şəbəkəsi nədir](/blog/what-is-a-trust-network) yazısındadır; niyə ledger olmadan başladığı isə [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet) yazısında izah olunur. Avropa İttifaqı (Aİ) arxitekturası ilə yanaşı müqayisə (eyni, körpü ilə bağlanan, planlaşdırılan) [rollar və terminlər](/learn/roles) səhifəsindədir; plan isə [ağ kitabda](/whitepaper) verilib.

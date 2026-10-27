---
title: "Real kriptoqrafiya, bu gün işləyir: Tamga-nın ilk buraxılışı"
slug: synthetic-data-real-cryptography
description: "Bu gün başdan sona nəyin işlədiyini (diplomlar, ləğv, şəxsiyyət, keçidlər, biletlər, sayta giriş) və hələ də istifadə etdiyimiz bütün sadələşdirmələri açıq yazırıq."
date: 2026-09-27
lang: az
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Universitetin həqiqətən istifadə edəcəyi sistemi qurduq və onu uydurma tələbələrlə işlətdik. Kriptoqrafiya ilə bağlı hər şey realdır. Real olmayan yalnız insanlar və istismarla bağlı bəzi hissələrdir.

## Bu gün nə işləyir?

- Universitet cüzdana diplom və ya tələbə sənədi verir. Sənəd hər biri fərqli cihaz açarına bağlı on nüsxə kimi gəlir.
- İşəgötürən iki sahə istəyir və məhz bu iki sahəni saniyələr ərzində yoxlanılmış şəkildə alır.
- Ləğv növbəti sabit dərcdə bütün yoxlayan tərəflərə çatır. Universitetin fəaliyyəti dayandırılanda o yeni sənəd verə bilmir, amma əvvəl verdiyi diplomlar etibarlı qalır.
- Sənədin ekran görüntüsü rədd edilir. Başqa telefonun açarı ilə təqdim edilən nüsxə də rədd edilir.
- Şəxsiyyət yoxlamasının sonunda şəxsiyyət sənədi yaradılır və bu sənəd ISO mdoc formatında da verilir. Yaşı yoxlayan tərəf isə yalnız "18 yaşdan yuxarıdır" məlumatını alır.
- Kampus turniketləri və tədbir girişləri 60 saniyə etibarlı QR keçidini qəbul edir. Bilet isə yalnız bir dəfə istifadə oluna bilər.
- Vebsayt şəxsi cüzdan vasitəsilə qeydiyyatdan keçirir və sonra hər gün passkey ilə daxil olmasına imkan verir.

## Hələ hansı sadələşdirmələrdən istifadə edirik?

Hər sadələşdirmə qeydə alınıb və pilotdan əvvəl aradan qaldırılacaq. Tələbə qeydləri nümunə məlumatlardan ibarətdir və açarlar telefonun təhlükəsiz çipində deyil, proqram təminatında saxlanılır. Universitetin imza açarını Tamga saxlayır. Cüzdan provayderi tətbiqin öz platforması barədə verdiyi bəyanatı qəbul etmir. Ona görə hər cüzdan proqram təminatı səviyyəsində sayılır və App Store ilə Google Play buraxılışı ilə birlikdə App Attest / Play Integrity məcburi olacaq. Bundan əlavə, hazırda bir operator var. Vebsayta giriş qeydiyyat zamanı bütün saytlarda eyni hesab dəyərindən istifadə edir və hər sayt üçün ayrıca psevdonim yol xəritəsindədir. *(Yeniləmə, 2026-10-06: Hər sayt üçün ayrıca psevdonim artıq işləyir. Şəbəkə heç bir cüzdan provayderini idarə etmir və hər cüzdan öz provayderini idarə edir (ADR-0042). Real şəbəkədə qurumların imza açarlarını Tamga saxlamır (Tamga ARF §3).)*

> **Qeyd:** Yeniləmə, 8 oktyabr 2026: Cüzdan versiyalarında açarlar artıq telefonun təhlükəsiz aparat modulunda saxlanılır. Canlı xidmətdə aparat attestasiyası olmayan cüzdanlara cüzdan attestasiyası verilmir. App Attest və Android açar attestasiyasından istifadə olunur, Play Integrity isə istəyə bağlı əlavə yoxlamadır. Təfərrüatlar üçün [Rəqəmsal cüzdana necə etibar etmək olar?](/blog/trusting-a-wallet) yazısına baxa bilərsiniz.

## Bütün bunları niyə izah edirik?

Öz məhdudiyyətlərini gizlədən etibar infrastrukturu etibara layiq deyil. Şəbəkənin nəyi edib nəyi etmədiyini [Etibar şəbəkəsi nədir](/blog/what-is-a-trust-network) yazısında, niyə reyestr olmadan başladığını isə [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet) yazısında izah etmişik. Aİ arxitekturası ilə yanaşı müqayisəni (eyni, körpü ilə bağlanan, planlaşdırılan) [rollar və terminlər](/learn/roles) səhifəsində, planı isə [ağ kitabda](/whitepaper) tapa bilərsiniz.

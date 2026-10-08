---
title: "Gerçek kriptografi, bugün çalışıyor: Tamga ilk sürümü"
slug: synthetic-data-real-cryptography
description: Bugün uçtan uca çalışanlar (diploma, iptal, kimlik, geçiş kartı, bilet, web girişi) ve hâlâ kullandığımız her kestirme, açıkça.
date: 2026-09-27
lang: tr
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Bir üniversitenin gerçekten kullanacağı sistemi kurduk, sonra onu uydurma öğrencilerle çalıştırdık. Kriptografik olan her şey gerçek; yalnızca kişiler ve bazı işletim parçaları değil.

## Bugün çalışanlar

- Üniversite cüzdana diploma ya da öğrenci belgesi verir: her biri farklı bir cihaz anahtarına bağlı on kopya.
- İşveren iki alan ister ve tam olarak o ikisini, saniyeler içinde doğrulanmış olarak alır.
- İptal bir sonraki sabit yayında her doğrulayıcıya ulaşır; üniversitenin askıya alınması yeni belge vermeyi durdurur, önceki diplomalar geçerli kalır.
- Belgenin ekran görüntüsü reddedilir; başka bir telefonun anahtarıyla sunulan kopya da.
- Kimlik kontrolü bir kimlik belgesi üretir, ISO mdoc olarak da: yaş kontrolü yalnızca “18 yaş üstü”nü alır.
- Kampüs turnikeleri ve etkinlik kapıları 60 saniyelik bir QR geçiş kartını kabul eder; bilet bir kez çalışır.
- Bir web sitesi kişiyi cüzdanla kaydeder, sonra her gün passkey ile içeri alır.

## Hâlâ kestirme olanlar

Her kestirme kayıt altındadır ve pilottan önce kapanır: öğrenci kayıtları örnektir, anahtarlar telefonun güvenli çipinde değil yazılımda durur, üniversitenin imza anahtarını Tamga tutar, cüzdan sağlayıcısı uygulamanın kendi platform beyanını kabul etmez (her cüzdan yazılım seviyesinde sayılır; App Store ve Google Play sürümüyle App Attest / Play Integrity zorunlu olur) ve tek bir operatör vardır. Web girişi kayıt anında siteler arasında aynı hesap değerini kullanır; site başına takma ad yol haritasındadır. *(Güncelleme, 2026-10-06: site başına takma ad artık çalışıyor. Ağ cüzdan sağlayıcısı işletmez: her cüzdan kendininkini işletir (ADR-0042). Gerçek ağda kurumların imza anahtarını Tamga tutmaz (Tamga ARF §3).)*

> **Not:** Güncelleme, 8 Ekim 2026: cüzdan derlemelerinde anahtarlar artık telefonun güvenli donanımında duruyor; canlı hizmette donanım kanıtı olmayan cüzdana cüzdan kanıtı verilmiyor. App Attest ve Android anahtar kanıtı kullanılıyor; Play Integrity isteğe bağlı ek bir denetim. Bkz. [Cüzdana nasıl güvenilir?](/blog/trusting-a-wallet).

## Bunları neden söylüyoruz

Çünkü sınırlarını saklayan bir güven altyapısı güvenilir değildir. Ağın ne yaptığı ve ne yapmadığı [Güven ağı nedir](/blog/what-is-a-trust-network) yazısında; neden defter olmadan başladığı [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında. AB mimarisiyle yan yana kıyas (aynı, köprü, planlı) [roller ve terimler](/learn/roles) sayfasında; plan [whitepaper](/whitepaper)’da.

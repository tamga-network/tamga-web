---
title: "Gerçek kriptografi, bugün çalışıyor: Tamga ilk sürümü"
slug: synthetic-data-real-cryptography
description: Bugün uçtan uca çalışanları (diploma, iptal, kimlik, geçiş kartı, bilet, web girişi) ve hâlâ kullandığımız her kestirme yolu açıkça yazıyoruz.
date: 2026-09-27
lang: tr
category: announcements
draft: false
related: why-no-blockchain-yet, learn:roles, page:/whitepaper
---

Bir üniversitenin gerçekten kullanacağı sistemi kurduk ve onu uydurma öğrencilerle çalıştırdık. Kriptografiyle ilgili her şey gerçek. Gerçek olmayan yalnız kişiler ve işletmeyle ilgili bazı parçalar.

## Bugün neler çalışıyor?

- Üniversite cüzdana diploma ya da öğrenci belgesi veriyor. Belge, her biri farklı bir cihaz anahtarına bağlı on kopya olarak geliyor.
- İşveren iki alan istiyor ve tam olarak bu iki alanı, saniyeler içinde doğrulanmış olarak alıyor.
- Bir iptal, bir sonraki sabit yayında bütün doğrulayıcılara ulaşıyor. Bir üniversite askıya alındığında yeni belge veremiyor, ama daha önce verdiği diplomalar geçerli kalıyor.
- Bir belgenin ekran görüntüsü reddediliyor. Başka bir telefonun anahtarıyla sunulan bir kopya da reddediliyor.
- Kimlik kontrolünün sonunda bir kimlik belgesi üretiliyor ve bu belge ISO mdoc olarak da veriliyor. Yaşı denetleyen taraf ise yalnız "18 yaşından büyük" bilgisini alıyor.
- Kampüs turnikeleri ve etkinlik girişleri 60 saniye geçerli bir QR geçiş kartını kabul ediyor. Bilet ise yalnız bir kez kullanılabiliyor.
- Bir web sitesi kişiyi cüzdanla kaydediyor ve sonra her gün passkey ile içeri alıyor.

## Hâlâ hangi kestirme yolları kullanıyoruz?

Her kestirme yol kayıt altında ve pilottan önce kapatılacak. Öğrenci kayıtları örnek veriden oluşuyor ve anahtarlar telefonun güvenli çipinde değil, yazılımda duruyor. Üniversitenin imza anahtarını Tamga tutuyor. Cüzdan sağlayıcısı, uygulamanın kendi platformu hakkında verdiği beyanı kabul etmiyor. Bu yüzden her cüzdan yazılım düzeyinde sayılıyor ve App Store ile Google Play sürümüyle birlikte App Attest / Play Integrity zorunlu olacak. Ayrıca şu an tek bir işletmeci var. Web girişi, kayıt sırasında bütün sitelerde aynı hesap değerini kullanıyor ve her site için ayrı takma ad yol haritasında yer alıyor. *(Güncelleme, 2026-10-06: Her site için ayrı takma ad artık çalışıyor. Ağ hiçbir cüzdan sağlayıcısını işletmiyor ve her cüzdan kendi sağlayıcısını işletiyor (ADR-0042). Gerçek ağda kurumların imza anahtarlarını Tamga tutmuyor (Tamga ARF §3).)*

> **Not:** Güncelleme, 8 Ekim 2026: Cüzdan derlemelerinde anahtarlar artık telefonun güvenli donanımında duruyor. Canlı hizmette, donanım kanıtı olmayan cüzdanlara cüzdan kanıtı verilmiyor. App Attest ve Android anahtar kanıtı kullanılıyor, Play Integrity ise isteğe bağlı ek bir denetim. Ayrıntılar için [Cüzdana nasıl güvenilir?](/blog/trusting-a-wallet) yazısına bakabilirsiniz.

## Bunları neden anlatıyoruz?

Sınırlarını saklayan bir güven altyapısı güveni hak etmez. Ağın neyi yapıp neyi yapmadığını [Güven ağı nedir](/blog/what-is-a-trust-network) yazısında, neden bir defter olmadan başladığını da [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında anlattık. AB mimarisiyle yan yana karşılaştırmayı (aynı, köprüyle bağlanan, planlanan) [roller ve terimler](/learn/roles) sayfasında, planı da [whitepaper](/whitepaper)'da bulabilirsiniz.

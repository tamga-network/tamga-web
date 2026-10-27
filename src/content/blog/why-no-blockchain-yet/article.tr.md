---
title: Neden zincirsiz başlıyoruz
slug: why-no-blockchain-yet
description: Tek işletmecinin tuttuğu bir defter, yalnız daha yavaş bir veritabanıdır. Tamga AB'nin modeli olan imzalı güven listeleriyle başlıyor ve defteri bağımsız işletmeciler katıldığında ekleyecek.
date: 2026-09-27
lang: tr
category: network
draft: false
related: how-trust-lists-work, network-as-a-foundation, learn:trust-lists, learn:why-not-blockchain-yet, page:/whitepaper
---

Önceki yazılarımızda izinli bir blockchain'i Tamga'nın güven çapası olarak anlatıyorduk. 24 Eylül 2026'da hedefimizi değiştirmeden oraya hangi sırayla gideceğimizi değiştirdik. Bu yazıda bunun nedenini anlatıyoruz.

## Bir defter neden tek elle tutulmaz?

Bir blockchain, aynı kaydı birden çok **bağımsız** taraf tuttuğunda ve hiçbiri bu kaydı tek başına değiştiremediğinde maliyetine değer. Bugün ise tek bir işletmeci var ve bu işletmeci, devletler adına geçici olarak çalışan Tamga. Tek doğrulayıcısı olan bir zincir maliyeti ve karmaşıklığı artırır, ama güveni hiç artırmaz.

## Bunun yerine ne yapıyoruz?

[İmzalı güven listeleri](/learn/trust-lists) yayımlıyoruz. AB de kendi güven listeleri için bu modeli kullanıyor. Listeler sürümlüdür, özetlerle birbirine zincirlenir ve listelerden hiçbir şey silinmez. Her iptal listesi yayını ve her şema değişikliği, saatte en az bir kez yazılan herkese açık bir **çapa günlüğüne** geçer. Bu yüzden eski bir sürüme döndürülmüş ya da sonradan değiştirilmiş bir listeyi herkes fark edebilir ([imzalı güven listesi nasıl çalışır](/blog/how-trust-lists-work)).

## Ne değişmeyecek?

- Kurum ve belge türü kimlikleri, akıllı sözleşmelerin hesapladığı biçimde hesaplanıyor.
- Listelerdeki her alan bir sözleşme kaydına karşılık geliyor. Liste geçmişi deftere baştan yazılabiliyor ve testler ikisinin aynı yanıtı verdiğini doğruluyor.
- Cüzdanlar, doğrulayıcılar ve belgeler güven bilgisini tek bir arayüzden okuyor, bu yüzden geçiş onlar için hiçbir şeyi değiştirmeyecek.

## Defter ne zaman gelecek?

İzinli bir Besu/QBFT defteri, en az iki bağımsız doğrulayıcı işletmecisi bunu yazılı olarak kabul ettiğinde başlatılacak. O zamana kadar durumu açıkça söylüyoruz ([ağ neden vakfa gidiyor](/blog/network-as-a-foundation)). Güven çapası tek bir işletmecinin imzasına dayanıyor. Herkese açık günlük, şeffaflık raporu ve denetimler kötüye kullanımı caydırıyor, ama imkânsız kılmıyor. Ayrıntıları [whitepaper v1.0](/whitepaper)'da bulabilirsiniz.

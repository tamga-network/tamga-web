---
title: Neden zincirsiz başlıyoruz
slug: why-no-blockchain-yet
description: Tek operatörlü defter, daha yavaş bir veritabanıdır. Tamga AB'nin modeli olan imzalı güven listeleriyle başlar; defter bağımsız operatörlerle gelir.
date: 2026-09-27
lang: tr
category: network
draft: false
related: how-trust-lists-work, network-as-a-foundation, learn:trust-lists, learn:why-not-blockchain-yet, page:/whitepaper
---

Önceki yazılarımız izinli bir blockchain’i Tamga’nın güven çapası olarak anlatıyordu. 24 Eylül 2026’da hedefi değil, sırayı değiştirdik. Nedeni şu.

## Bir defter tek elle olmaz

Blockchain, birden çok **bağımsız** taraf aynı kaydı tuttuğunda ve hiçbiri onu tek başına yeniden yazamadığında değer katar. Bugün tek bir operatör var: devletler adına geçici olarak çalışan Tamga. Tek doğrulayıcılı bir zincir maliyet ve karmaşa ekler, ama ek güven eklemez.

## Bunun yerine ne yapıyoruz

[İmzalı güven listeleri](/learn/trust-lists) yayımlıyoruz; AB’nin kendi güven listeleri için kullandığı model bu. Listeler sürümlü ve hash-zincirlidir, hiçbir şey silinmez; her iptal listesi yayını ve şema değişikliği herkese açık, saatlik bir **çapa günlüğüne** yazılır. Geri sarılmış ya da yeniden yazılmış bir listeyi herkes fark edebilir ([imzalı güven listesi nasıl çalışır](/blog/how-trust-lists-work)).

## Değişmeyen

- Kurum ve belge tipi kimlikleri kontratların hesapladığı gibi hesaplanır.
- Her liste alanı bir kontrat kaydına eşlenir; liste geçmişi deftere yeniden oynatılabilir ve ikisinin aynı cevabı verdiği test edilir.
- Cüzdanlar, doğrulayıcılar ve belgeler güveni tek bir arayüzden okur; geçiş onlar için hiçbir şeyi değiştirmez.

## Defter ne zaman gelir

İzinli bir Besu/QBFT defteri, en az iki bağımsız validator operatörü yazılı kabul verdiğinde başlatılır. O zamana kadar açıkça söylüyoruz ([ağ neden vakfa gidiyor](/blog/network-as-a-foundation)): çapa tek operatörün imzasına dayanır; herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır ama imkânsız kılmaz. Ayrıntı [whitepaper v1.0](/whitepaper)’da.

---
title: "PDF bir belge değildir: bugün belgelerin dört sorunu"
slug: a-pdf-is-not-a-document
description: Taranmış bir PDF ne belgeyi kimin verdiğini ne de belgenin hâlâ geçerli olup olmadığını kanıtlar. Belgelerin dört sorunu ve doğrulanabilir belgenin bunlara cevabı.
date: 2026-10-29
lang: tr
category: network
draft: false
related: why-we-are-building, learn:paper-to-digital, learn:selective-disclosure, how-trust-lists-work, zero-knowledge-in-tamga
---

<!-- Kaynaklar: İngilizce yazının kaynak notuyla aynı (ana sayfa why.problems ve tech metinleri; learn sayfaları; Tamga ARF 1.0 §4.4 ve §8.4; whitepaper §9 ve docs concepts/revocation: doğrulayıcı durum listelerini önceden indirir, doğrulama anında kuruma istek gitmez, INDETERMINATE ret değildir; docs concepts/privacy: her doğrulayıcıya ayrı kopya; canlı listelerin listesi: TR ACTIVE, AZ/KZ/KG/UZ TDT üyesi, HU/TM gözlemci olarak ayrılmış; manifesto v1.0 gözden geçirilmiş baskı 2026-10-27; Tüzük (AB) 2024/1183 Md. 5a). -->

Taranmış bir PDF, bir belgenin görüntüsüdür. Ne belgeyi kimin verdiğini ne de belgenin hâlâ geçerli olup olmadığını kanıtlar. Bugün belgelerin dört sorunu var: sahtesi kolay yapılıyor, doğrulanması yavaş, gereğinden fazla bilgi açığa çıkarıyor ve her ülkenin sistemi ayrı. Doğrulanabilir dijital belge bu dört sorunun hepsine cevap veriyor. Bu yazıda sorunları sırayla ele alıyor, her birinin bugün nasıl yaşandığını ve doğrulanabilir belgenin onu nasıl çözdüğünü anlatıyor, sonra bir diplomanın Bakü'den Almatı'ya yolculuğunu izliyoruz.

![Belgelerin dört sorunu, bugün ve doğrulanabilir belgeyle](/blog/a-pdf-is-not-a-document/tr/fig-problems.png)

## 1. Sahte belge yapmak neden bu kadar kolay?

Bir PDF'in ya da fotokopinin üzerindeki yazıyı değiştirmek birkaç dakika sürer. Notu, tarihi ya da adı değiştirilmiş bir belge ilk bakışta gerçeğinden ayırt edilemez. Değişikliği fark etmek için mührü, imzayı, kâğıdı ve yazı tipini tanıyan bir uzman gerekir. Çoğu kurumun ne buna ayıracak vakti ne de böyle bir uzmanı var. Bu yüzden kurumlar ya belgelere körü körüne güveniyor ya da hiç güvenmiyor.

Doğrulanabilir belgede kurum, belgeyi kendi anahtarıyla dijital olarak imzalar. İmza belgenin içeriğinden hesaplandığı için tek bir harf değişse bile hesap tutmaz ve belge doğrulamadan geçemez. Değişikliği görmek için uzman gözüne gerek kalmaz, çünkü bunu matematik gösterir.

Geriye bir soru kalıyor: imzalayan gerçekten o kurum mu? Anahtar üreten herkes bir şey imzalayabildiği için doğrulayan, imzanın yanında devletin imzalı güven listesine de bakar. Kurumun anahtarı o listede kayıtlı değilse belge kabul edilmez. Sahte bir üniversite matematiksel olarak geçerli bir imza atabilir, ama listede olmadığı için belgesi yine reddedilir.

## 2. Doğrulama neden haftalar sürüyor?

Bir işveren, başka bir ülkeden gelen adayın diplomasını kontrol etmek istediğinde üniversiteye yazar ve cevap bekler. Belge yurt dışında kullanılacaksa bir de apostil gerekir. Bütün bunlar haftalar sürer, çünkü kontrol etmenin tek yolu belgeyi veren kuruma sormaktır. Üniversite tatildeyse, arşivi kapalıysa ya da kurum artık yoksa süreç tıkanır.

Doğrulanabilir belgede doğrulayan kaynağa sormaz. İmzayı ve kurumun listedeki kaydını kendisi kontrol eder ve bu birkaç saniye sürer. Doğrulayıcılar güven listelerini ve iptal listelerini önceden indirir. Bu yüzden belge kontrol edildiği anda kuruma hiçbir istek gitmez ve kurum belgenin nerede, ne zaman gösterildiğini öğrenmez. Kurumun sunucuları o an kapalı olsa bile belge doğrulanabilir.

Her doğrulama üç sonuçtan biriyle biter.

![Bir doğrulamanın üç sonucu: kabul, ret, şu an doğrulanamıyor](/blog/a-pdf-is-not-a-document/tr/fig-outcomes.png)

| Sonuç | Ne zaman | Ne anlama gelir |
|---|---|---|
| Kabul | İmza doğru, kurum listede ve belge iptal edilmemiş | Belge geçerli |
| Ret | İmza bozuk, kurum listede değil ya da belge iptal edilmiş | Belge geçerli değil |
| Şu an doğrulanamıyor | Gereken bir liste o an alınamıyor | Karar verilemez, belge sahte sayılmaz |

Üçüncü sonucun nedeni basit: erişilemeyen bir sunucu belgeyi sahte yapmaz. Bu sonuç olmasaydı, kişi belgesiyle hiç ilgisi olmayan bir arıza yüzünden geri çevrilebilirdi.

## 3. Neden gereğinden fazla bilgi veriyoruz?

Yaşınızı kanıtlamak için kimlik kartınızın tamamını, mezun olduğunuzu kanıtlamak için bütün not dökümünüzü gösteriyorsunuz. Kapıdaki görevli yalnız 18 yaşından büyük olup olmadığınızı bilmek isterken doğum tarihinizi, adresinizi ve kimlik numaranızı da görüyor. Her kopya başka birinin sunucusunda kalıyor ve her biri yeni bir sızıntı fırsatı oluyor.

Doğrulanabilir belgede her alan ayrı ayrı mühürlenir. Kişi yalnız istenen alanı açar, diğerleri kapalı kalır. Doğrulayan açılan alanı ve imzayı kontrol eder, kapalı alanları ise göremez.

![Doğrulayanın gördüğü: yalnız istenen alan açık, diğerleri gizli](/blog/a-pdf-is-not-a-document/tr/fig-what-is-seen.png)

Cüzdan bir adım daha atar ve her doğrulayıcıya belgenin ayrı bir kopyasını gösterir. Böylece iki doğrulayıcı kayıtlarını karşılaştırıp aynı kişiyi eşleştiremez. Sıfır bilgi ispatı ise yaş sorusunu doğum tarihi hiç işin içine girmeden cevaplayabilir. Bunun nasıl çalıştığını [Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga) yazısında anlatıyoruz.

## 4. Neden her ülke kendi sistemini kuruyor?

Her ülke kendi dijital sistemini kuruyor ve bu sistemler birbirini tanımıyor. Bir ülkede verilen dijital belge başka bir ülkede yeniden kâğıda dönüyor, çünkü karşı taraf ne belgenin biçimini okuyabiliyor ne de imzalayana güvenip güvenmeyeceğini bilebiliyor.

Bunun çözümü ortak standartlar ve ortak bir güven yapısı. Tamga Network, Avrupa'nın dijital kimlik düzenindeki standartları kullanıyor:

| Katman | Standart | Ne işe yarar |
|---|---|---|
| Belge biçimi (çevrimiçi) | SD-JWT VC | Alanları tek tek açılabilen imzalı belge |
| Belge biçimi (yüz yüze) | ISO mdoc (ISO/IEC 18013-5) | Telefondan yüz yüze gösterilen belge |
| Belge alma | OpenID4VCI | Belgeyi kurumdan cüzdana aktarır |
| Belge gösterme | OpenID4VP | Seçilen alanları cüzdandan doğrulayana gönderir |
| Güven | İmzalı güven listeleri (ETSI) | Hangi kurumun neyi vermeye yetkili olduğunu kaydeder |

Her devlet kendi güven listesini kendisi yayınlıyor ve listeler bir listelerin listesinde bir araya geliyor. Bugün Türkiye listesi yayında. Türk Devletleri Teşkilatı'nın diğer üye devletleri (Azerbaycan, Kazakistan, Kırgızistan ve Özbekistan) ile gözlemci devletleri Macaristan ve Türkmenistan için de yer ayrıldı.

## Bir diploma Bakü'den Almatı'ya nasıl gider?

Bakü'deki bir üniversitenin mezunu Almatı'da bir işe başvuruyor. Bugün işveren diplomanın taranmış hâlini alıyor, üniversiteye yazıyor ve haftalarca cevap bekliyor. Ortak bir güven yapısıyla aynı kontrol şöyle işler:

1. Mezun diplomayı telefonundaki cüzdandan gösterir ve yalnız bölümünü ve mezuniyet yılını açar.
2. İşveren imzayı kontrol eder ve üniversitenin Azerbaycan listesinde kayıtlı olduğunu görür.
3. İşveren Bakü'yü aramadan ve cevap beklemeden birkaç saniye içinde emin olur.

Bu örnekte Azerbaycan listesinin yayında olduğunu varsayıyoruz, oysa bugün yalnız onun yeri ayrılmış durumda. Her devlet kendi listesini yayınladığında bu kontrol ülkeler arasında gerçekten işlemeye başlar.

## Avrupa'daki gelişme Türk dünyası için ne anlama geliyor?

Avrupa Birliği, her üye devletin 2026 sonuna kadar vatandaşlarına bir dijital kimlik cüzdanı sunmasını zorunlu kıldı. Diploma, ehliyet ve üyelik gibi belgeler cüzdana taşınıyor ve aynı standartlarla doğrulanıyor. Ortak bir güven yapısı olmazsa Türk dünyasının belgeleri bu düzenin dışında kalır. Belgeler Avrupa'daki doğrulayıcıların okuyabildiği biçimde verilmez, onları veren kurumlar da Avrupa'nın baktığı listelerde yer almaz.

Manifestomuz da aynı noktadan yola çıkıyor. Bu dönüşümün olup olmayacağı artık soru olmaktan çıktı; asıl soru onu kimin kuracağı ve kimin yalnızca satın alacağı. Tamga Network'ün cevabı, aynı standartlarla kurulan ve kuralları ile listeleri Türk dünyasının devletlerine ait olan bir ağ. Avrupa'daki tarihlerin ayrıntısı [AB takvimi](/learn/eu-timeline) sayfasında.

## Sık sorulan sorular

### Doğrulanabilir belge nedir?

Kurumun dijital olarak imzaladığı belgedir. Kişinin cüzdanında durur ve herkes onu belgeyi veren kuruma sormadan doğrulayabilir. Üzerinde tek bir harf değişirse imza artık tutmaz.

### Doğrulayan neden belgeyi veren kuruma sormuyor?

Gereken her şey imzada ve devletin güven listesinde var. Doğrulayan imzayı kontrol eder ve kurumun listede kayıtlı olduğunu görür.

### Kurumun sunucusu kapalıysa ne olur?

Belge yine doğrulanabilir, çünkü doğrulayıcılar listeleri önceden indirir. Gereken bir liste hiç alınamıyorsa sonuç "şu an doğrulanamıyor" olur.

### Taranmış PDF ortadan mı kalkıyor?

Hayır. PDF okumak ve arşivlemek için işe yaramaya devam edecek. Bir belgenin gerçek olduğunu kanıtlamak gerektiğinde ise bu işi imzalı, doğrulanabilir belge görür.

## Kaynaklar

- [Kâğıttan dijitale](/learn/paper-to-digital)
- [Dijital imza](/learn/digital-signatures)
- [Seçici paylaşım](/learn/selective-disclosure)
- [Güven listeleri](/learn/trust-lists)
- [Tamga ARF 1.0](https://arf.tamga.network), §4.4 (sunum ve doğrulama) ve §8.4 (standartlar haritası)
- [Manifesto](/manifesto)
- [Tüzük (AB) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)

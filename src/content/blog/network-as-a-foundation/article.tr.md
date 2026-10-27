---
title: Tamga Network neden kâr amacı gütmüyor ve vakfa gidiyor?
slug: network-as-a-foundation
description: Tamga Network hizmet satmıyor ve cüzdan işletmiyor, işletmeciliği de bir vakfa devredilecek. Tarafsızlığın neden önemli olduğunu ve devrin nasıl işlediğini anlatıyoruz.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Kaynak: tamga-network README ("Tamga Network kâr amacı gütmez; işletmecilik ileride bir vakfa devredilir"); Tamga ARF §8.3 (bir ya da iki devlet istekli olunca konsey ya da vakıf; o zamana kadar Tamga geçici işletmeci; işletmecilik vakfa devredilir; ağ ürün satmaz, ticari hizmet sunmaz; hizmet sağlayıcılar dışarıda, aynı koşullarla), §1.6 ilkeler P1 (her devlet kendi kayıtlarının tek yazarı; konsey kurulunca üyelik üçte iki oyla), P4 (devredilebilir roller), P7 (kodla sınırlanamayan yetki politika, ölçülebilir devir eşiği ve şeffaflık raporuyla sınırlanır); ADR-0035 (bilinen gerilim: listeyi işleten hizmet satarsa çıkar çatışması; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; Tamga ekibinin şirketi farklı muamele görmez), ADR-0042 (NW1–NW4; wallet.tamga.network 2026-10-06'da kaldırıldı; Tamga Wallet'ın sağlayıcısını cüzdanın işletmecisi provider.tamgawallet.com'da işletir), ADR-0002 (üç katman; çıkarılan devletin vatandaşlarının belgeleri geçersiz olmaz; çıkış hakkı), ADR-0009 (≥2 bağımsız işletmeciyle defter); SPEC-TRUST-0001 (operator provisional, on_behalf_of; devirde yalnız operator alanı; güvenlik notları); learn/governance (halefiyet sözleşmesi). Canlı tl-tr.json/lotl.json operator alanları (2026-10-08). Dış: (AB) 2024/1183, AB ARF. -->

Tamga Network kâr amacı gütmüyor ve işletmeciliği ileride bir vakfa devredilecek. Bunun nedeni, bir güven ağının ancak ona dayanan herkes listeyi tutan tarafın kimseyi kayırmadığına inandığı sürece çalışabilmesi. Aynı listeyi devletler, kurumlar, birden çok cüzdan ve birbiriyle rekabet eden hizmet şirketleri okuyor. Bu yüzden ağ hizmet satmıyor, cüzdan işletmiyor ve kimseye ayrıcalık tanımıyor. Bugün geçici olarak üstlendiği her rol de devredilebilecek biçimde tasarlandı. Devletler katıldığında işletmeciliği bir konsey ya da vakıf devralacak, her ülkenin listesini de o ülkenin kendisi üstlenecek.

## Güven listesini tutan neden tarafsız olmalı?

Güven listesi kime inanılacağını belirler. Listedeki bir kurum, doğrulayıcıların kabul ettiği belgeleri verebilir. Listedeki bir doğrulayıcı cüzdanlardan veri isteyebilir, listedeki bir cüzdan sağlayıcısı da belge alabilir. Listeyi tutan taraf aynı zamanda entegrasyon satsaydı, bir cüzdan işletseydi ya da ücretli destek verseydi, verdiği her kayıt kararı sorgulanırdı. Herkes bu kaydın kurallara göre mi onaylandığını, yoksa listeyi tutanın işine yaradığı için mi onaylandığını sorardı.

AB de bu rolleri aynı nedenle birbirinden ayırıyor. eIDAS 2.0 modelinde ([(AB) 2024/1183 sayılı Tüzük](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) güven listelerini üye devletler denetliyor ve yayımlıyor. Cüzdanları cüzdan sağlayıcıları işletiyor, güvenen taraflar da kayıt yaptırıyor. Tamga konumunu belirlerken bunu bilinen bir gerilim olarak kayda geçirdi, çünkü listeyi işleten taraf hizmet satarsa çıkar çatışması doğar ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)). Ardından bu ayrım ayrı bir kararla açıkça yazıldı ([ADR-0037](https://docs.tamga.network/tr/adr/0037-network-only)).

## "Kâr amacı gütmez" pratikte ne demek?

Bunun üç bağlayıcı kuralı var:

- **Ağ hizmet satmaz** (PO5). Ağın belgelerinde ve sitelerinde fiyat bilgisi ya da satış dili bulunmaz. Entegrasyon, destek, sözleşmeli barındırma ve danışmanlık gibi işleri ağın dışındaki şirketler kendi adlarıyla sunar.
- **Herkes için aynı koşullar geçerlidir** (PO6). Referans servisler ve kayıt süreci bütün katılımcılara aynı koşullarla açıktır. Hiçbir hizmet sağlayıcıya öncelik tanınmaz ve karar, Tamga ekibinin kurduğu şirketin de bu kurala dahil olduğunu açıkça yazar.
- **Referans servisler ağın çalışması için vardır.** Güven listesi yayıncısı, barındırılan doğrulayıcı, Kurum Konsolu ile birlikte barındırılan belge verme servisi, geçici kimlik servisi ve sandbox, kurumlar ağa katılabilsin ve herkes kuralları deneyebilsin diye kuruldu. Bunların hiçbiri satılan bir ürün değil.

Tamga ARF'nin yönetişim bölümü de bunu açıkça yazıyor. Tamga Network kâr amacı gütmüyor, işletmeciliği ileride bir vakfa devredilecek, hiçbir ürün satmıyor ve ticari hizmet sunmuyor ([Tamga ARF](https://arf.tamga.network/tr/architecture)). Çerçevenin nasıl kurulduğunu [Tamga ARF: Avrupa çerçevesini nasıl uyarladık?](/blog/tamga-arf) yazısında anlattık.

## Ağ neden cüzdan işletmiyor?

Listedeki cüzdanlardan birini kendisi işleten bir liste, öbür cüzdanlara karşı tarafsız kalamaz. AB modelinde de her cüzdanı onu sunan kuruluş, yani o cüzdanın sağlayıcısı işletiyor ve güven çerçevesi yalnız cüzdan sağlayıcılarını listeliyor.

Tamga Network de bu modeli izliyor ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)):

- Ağ hiçbir cüzdanın uygulamasını, cüzdan sağlayıcısını, sitesini ya da destek hizmetini işletmez veya barındırmaz.
- Ağın alan adları altında hiçbir cüzdan hizmeti çalışmaz. Daha önce `wallet.tamga.network` adresinde çalışan cüzdan hizmetleri 6 Ekim 2026'da ağdan kaldırıldı.
- Ağın arayüzleri ve paketleri hiçbir cüzdanın adını koda gömmez. Arayüzde "cüzdanında aç" ifadesi kullanılır. Bir cüzdanın adı gerektiğinde bu ad, cüzdanın listedeki kaydından alınır.
- Tek bir sandbox var ve o da ağa ait. Cüzdan geliştiricileri kendi sağlayıcılarını orada kaydettirir ve herkesle aynı kurumlara, aynı kimlik servisine ve aynı doğrulayıcıya karşı test yapar.

Ağdaki cüzdanlardan biri olan Tamga Wallet da ayrı bir ürün olarak aynı yolu izliyor. Bu cüzdanın sağlayıcısını ağ değil, cüzdanın kendi işletmecisi kendi alan adı altında işletiyor. Sağlayıcının listedeki kaydı (`TAMGA-WP-1`) 14 Ekim 2026'dan beri etkin ve sertifikasını, öbür cüzdanlarda olduğu gibi, o işletmeci sağladı.

## Listeler kimin?

Listeler devletlerin. Yönetişim üç katmandan oluşuyor ve her katmanda kararı başka bir taraf veriyor ([ADR-0002](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance)):

| Katman | Soru | Kim karar verir |
|---|---|---|
| Ağ üyeliği | Yeni bir devlet katılıyor mu? | konsey kurulduktan sonra üye devletler, üçte iki oyla |
| Ulusal kayıt | Bir devlet hangi kurumları ve doğrulayıcıları kaydeder? | yalnız o devlet |
| Tanıma | Bir devlet başka bir devletin belgelerini kabul eder mi? | her devlet kendisi |

Bundan iki sonuç çıkıyor. Bir devlet, kimsenin oyuna gerek kalmadan ağdan ayrılabilir. Bir devletin ağdan çıkarılması da vatandaşlarının cüzdanlarındaki belgeleri geçersiz kılmaz, yalnız o devletin yeni kayıt yazmasını durdurur. Konsey kurulduktan sonra bile yalnız ağın ortak kurallarını yönetir ve bir devletin kendi kurumları hakkında karar veremez.

## Bugünden vakfa giden yol nasıl?

![Bugünkü geçici işletmeciden konsey ya da vakfa ve ortak deftere](/blog/network-as-a-foundation/tr/fig-yol.png)

**Bugün** Tamga geçici işletmeci olarak çalışıyor. Türkiye listesini ulusal makam adına yayımlıyor ve bunu listenin içinde de belirtiyor. Listenin `operator` alanında `"status": "provisional"` değeri ve hiçbir zaman boş bırakılmayan bir `on_behalf_of` değeri yer alıyor. Henüz kimsenin ihtiyacı yokken ağır bir kurumsal yapı kurmuyoruz.

**Bir ya da iki devlet katılmaya istekli olduğunda** bir yönetişim kurumu kurulacak. Bu kurum, üye devletlerden oluşan bir konseyden ve işletmeciliği devralacak bir vakıf ya da sekretaryadan oluşacak. Listeler sahiplerine devredilecek. Yeni bir üyenin kabulü ya da ortak bir belge türünün eklenmesi gibi ağ düzeyindeki kararlar da birlikte alınacak.

**En az iki bağımsız işletmeci olduğunda** kayıtlar izinli bir ortak deftere de taşınacak ve böylece hiçbir taraf onları tek başına değiştiremeyecek. Tek bir işletmecinin tuttuğu bir defter maliyeti artırır ama güveni artırmaz. Defterin beklemesinin nedeni de bu ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).

## İşletmeci değişince belgeler nasıl bozulmuyor?

Tanımlayıcılar işletmeciye ait olmadığı için belgeler bozulmaz. Bir kurumun `issuer_id` değeri kurumun kendi sertifikasından hesaplanır, belge türleri sabit URN'lerle adlandırılır ve liste biçiminde bugünden her devlet için bir yer ve bütün roller tanımlıdır. Devir sırasında `operator` alanı, listenin adresi ve imzacısı değişir. Cüzdanlar ve doğrulayıcılar için yalnız adres ve imzacı değişmiş olur, kişilerin cüzdanlarındaki belgeler de geçerli kalır.

Alan adı, kök sertifikalar, liste arşivi ve anahtarlar gibi kodun taşıyamadığı parçalar yazılı bir halefiyet sözleşmesiyle devredilir. Bunun arkasında şu kural var: Barındırma, alan adı, kayıt tutma ve istatistik gibi kodla sınırlanamayan her yetki bir politikayla, ölçülebilir bir devir eşiğiyle ve bir şeffaflık raporuyla sınırlanır (P7 ilkesi).

## O zamana kadar geçici işletmeciyi dürüst tutan ne?

Bunu yalnız iyi niyete bırakmıyoruz. Listeler imzalı, sürümlü ve özetlerle birbirine zincirli. Listelerden hiçbir şey silinmiyor. Her iptal listesi yayını herkese açık ve saatte en az bir kez yazılan bir çapa günlüğüne giriyor. Her yayın da `trust.tamga.network` adresindeki herkese açık değişiklik kaydına geçiyor. Kurallar buna üç ayda bir yayımlanacak bir şeffaflık raporunu ve bağımsız denetimi ekliyor, ama raporun sayfası henüz yayımlanmadı.

Bu önlemlerin nerede yetersiz kaldığını da açıkça söylüyoruz. Bugün güven çapası tek bir işletmecinin imzasına dayanıyor ve herkese açık kayıtlar kötüye kullanımı imkânsız kılmıyor, yalnız caydırıyor. Bu boşluğu ikinci bağımsız işletmeci ve onun ardından gelecek ortak defter kapatacak. Ayrıntıları [İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work) yazısında bulabilirsiniz.

## Bu her katılımcı için ne anlama geliyor?

![Kim neyi işletir: ağ, devletler, cüzdanlar ve hizmet şirketleri](/blog/network-as-a-foundation/tr/fig-ayrim.png)

- **Kurumlar**, entegrasyonda hangi hizmet şirketinden yardım alırlarsa alsınlar, hatta hiç yardım almasalar bile, aynı koşullarla kaydolur.
- **Cüzdanlar** adlarıyla değil, listedeki kayıtları ve kurallara uyumlarıyla tanınır.
- **Hizmet şirketleri** ağın dışında rekabet eder ve ağın kuralları hepsi için aynıdır.
- **Devletler** kendi listeleri üzerindeki tek söz sahibi olarak kalır. Tamga'nın bugün Türkiye için geçici olarak üstlendiği rolleri de hazır olduklarında devralabilirler ([Devletler için](/learn/for-states)).

## Sık sorulan sorular

### Vakıf kuruldu mu?

Henüz kurulmadı. Yönetişim kurumu, bir ya da iki devlet katılmaya istekli olduğunda kurulacak. O zamana kadar Tamga geçici işletmeci olarak çalışıyor ve listeler de bunu açıkça yazıyor.

### Bir şirket ücret ödeyerek öncelik ya da daha iyi bir kayıt alabilir mi?

Hayır. Ağ hizmet satmıyor ve referans servisleriyle kayıt süreci bütün katılımcılara aynı koşullarla açık. Hiçbir şirkete farklı davranılmıyor.

### Tamga Wallet'ın ağda özel bir yeri var mı?

Hayır. Tamga Wallet ağdaki cüzdanlardan biri, kendi işletmecisi tarafından işletiliyor ve listeye öbür cüzdanlarla aynı yoldan giriyor.

### Bir devlet ağdan ayrılırsa insanların belgelerine ne olur?

Belgeler geçerli kalır. Ayrılmak, bir devletin yeni kayıt yazmasını durdurur ama daha önce verilmiş belgeleri iptal etmez. Başka devletlerin bu belgeleri kabul etmeye devam edip etmeyeceği ise her devletin kendi tanıma kararına bağlıdır.

### Tek bir devlet ağı ele geçirebilir mi?

Her devlet yalnız kendi listesini yazar, yeni bir üyenin kabulü üye devletlerin üçte ikisinin oyunu gerektirir ve tanıma kararını her devlet kendisi verir. Bu yüzden hiçbir devlet bir başkasının listesini denetleyemez.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [AB Dijital Kimlik Cüzdanı: Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: mimari ve yönetişim](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework)
- [ADR-0002: egemenlik öncelikli yönetişim](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance) · [ADR-0037: ağ yalnız bir ağdır](https://docs.tamga.network/tr/adr/0037-network-only) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [ADR-0009: zincirsiz beta ve zincir eşiği](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [Yönetişim](/learn/governance) · [Hakkında](/about) · [Yol haritası](/roadmap)

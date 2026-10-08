---
title: Tamga Network neden kâr amacı gütmüyor ve vakfa gidiyor?
slug: network-as-a-foundation
description: Tamga Network hizmet satmaz, cüzdan işletmez; işletmeciliği bir vakfa devredilecek. Tarafsızlık neden önemli, devir nasıl işliyor.
date: 2026-10-08
lang: tr
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Kaynak: tamga-network README ("Tamga Network kâr amacı gütmez; işletmecilik ileride bir vakfa devredilir"); Tamga ARF §8.3 (bir ya da iki devlet istekli olunca konsey ya da vakıf; o zamana kadar Tamga geçici işletmeci; işletmecilik vakfa devredilir; ağ ürün satmaz, ticari hizmet sunmaz; hizmet sağlayıcılar dışarıda, aynı koşullarla), §1.6 ilkeler P1 (her devlet kendi kayıtlarının tek yazarı; konsey kurulunca üyelik üçte iki oyla), P4 (devredilebilir roller), P7 (kodla sınırlanamayan yetki politika, ölçülebilir devir eşiği ve şeffaflık raporuyla sınırlanır); ADR-0035 (bilinen gerilim: listeyi işleten hizmet satarsa çıkar çatışması; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; Tamga ekibinin şirketi farklı muamele görmez), ADR-0042 (NW1–NW4; wallet.tamga.network 2026-10-06'da kaldırıldı; Tamga Wallet'ın sağlayıcısını cüzdanın işletmecisi provider.tamgawallet.com'da işletir), ADR-0002 (üç katman; çıkarılan devletin vatandaşlarının belgeleri geçersiz olmaz; çıkış hakkı), ADR-0009 (≥2 bağımsız işletmeciyle defter); SPEC-TRUST-0001 (operator provisional, on_behalf_of; devirde yalnız operator alanı; güvenlik notları); learn/governance (halefiyet sözleşmesi). Canlı tl-tr.json/lotl.json operator alanları (2026-10-08). Dış: (AB) 2024/1183, AB ARF. -->

Tamga Network kâr amacı gütmez ve işletmeciliği ileride bir vakfa devredilecek. Nedeni basit: bir güven ağı, ona dayanan herkes listeyi tutanın kimseyi kayırmadığına inanabildiği sürece çalışır. Devletler, kurumlar, birden çok cüzdan ve birbiriyle yarışan hizmet şirketleri aynı listeyi okur. Bu yüzden ağ hizmet satmaz, cüzdan işletmez, kimseye ayrıcalık tanımaz ve bugün geçici olarak üstlendiği her rol devredilecek biçimde tasarlanmıştır. Devletler katıldığında işletmeciliği bir konsey ya da vakıf, her ülkenin listesini de o ülkenin kendisi devralır.

## Güven listesini tutan neden tarafsız olmalı?

Güven listesi kime inanılacağına karar verir. Listedeki bir kurum doğrulayıcıların kabul ettiği belgeler verebilir; listedeki bir doğrulayıcı cüzdanlardan veri isteyebilir; listedeki bir cüzdan sağlayıcı belge alabilir. Listeyi tutan taraf aynı zamanda entegrasyon satsa, bir cüzdan işletse ya da ücretli destek verseydi her kayıt kararı şu soruya açık olurdu: bu kurallara göre mi onaylandı, yoksa listeyi tutanın işine yaradığı için mi?

AB bu rolleri aynı nedenle ayırır. eIDAS 2.0 modelinde ([(AB) 2024/1183 sayılı Tüzük](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) güven listelerini üye devletler denetler ve yayımlar, cüzdanları cüzdan sağlayıcılar işletir, güvenen taraflar kayıt yaptırır; roller birbirinden ayrı tutulur. Tamga konumlanmasını belirlerken bunu bilinen bir gerilim olarak kayda geçirdi: listeyi işleten taraf hizmet satarsa çıkar çatışması doğar ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)). Ayrım sonra açıkça yapıldı ([ADR-0037](https://docs.tamga.network/tr/adr/0037-network-only)).

## "Kâr amacı gütmez" pratikte ne demek?

Üç bağlayıcı kural:

- **Ağ hizmet satmaz** (PO5). Belgelerinde ve sitelerinde fiyat ya da satış dili yoktur. Entegrasyon, destek, sözleşmeli barındırma ve danışmanlık, ağın dışındaki şirketlerin kendi adlarıyla sunduğu işlerdir.
- **Herkese aynı koşullar** (PO6). Referans servisler ve kayıt süreci bütün katılımcılara aynı koşullarla açıktır. Hiçbir hizmet sağlayıcı öncelik almaz; karar, Tamga ekibinin kurduğu şirketin de buna dahil olduğunu açıkça yazar.
- **Referans servisler ağ çalışsın diye var.** Güven listesi yayıncısı, barındırılan doğrulayıcı, Kurum Konsolu ile birlikte barındırılan belge verme, geçici kimlik servisi ve sandbox; kurumlar katılabilsin ve herkes kuralları deneyebilsin diye vardır. Ürün değildir.

Tamga ARF yönetişim bölümünde bunu açıkça söyler: Tamga Network kâr amacı gütmez, işletmeciliği ileride bir vakfa devredilir, hiçbir ürün satmaz ve ticari hizmet sunmaz ([Tamga ARF](https://arf.tamga.network/tr/architecture); çerçevenin nasıl kurulduğu [Tamga ARF: Avrupa çerçevesini nasıl uyarladık?](/blog/tamga-arf) yazısında).

## Ağ neden cüzdan işletmiyor?

Çünkü listedeki cüzdanlardan birini kendisi işleten bir liste, öbürlerine karşı tarafsız değildir. AB modelinde her cüzdanı onu sunan kuruluş, yani cüzdan sağlayıcısı işletir; güven çerçevesi yalnız cüzdan sağlayıcıları listeler.

Tamga Network bu modeli izler ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)):

- Hiçbir cüzdanın uygulamasını, cüzdan sağlayıcısını, sitesini ya da destek hizmetini işletmez, barındırmaz.
- Ağın alan adları altında hiçbir cüzdan hizmeti çalışmaz. Eskiden `wallet.tamga.network` adresinde çalışan cüzdan hizmetleri 6 Ekim 2026'da ağdan kaldırıldı.
- Ağın arayüzleri ve paketleri bir cüzdanın adını koda gömmez. Kullanılan ifade "cüzdanında aç"tır; bir cüzdanın adı gerekiyorsa listedeki kaydından gelir.
- Tek bir sandbox var ve ağa ait. Cüzdan geliştiriciler kendi sağlayıcılarını orada kaydettirir ve herkesle aynı kurumlar, kimlik servisi ve doğrulayıcıyla test eder.

Ağdaki cüzdanlardan biri olan Tamga Wallet, ayrı bir ürün olarak aynı yoldan gider. Cüzdan sağlayıcısını ağ değil, cüzdanın kendi işletmecisi kendi alan adı altında işletir. Listedeki sağlayıcı kaydı (`TAMGA-WP-1`) bugün ayrılmış durumda ve henüz anahtarı yok; o sağlayıcı servisi açılınca, her cüzdanda olduğu gibi sertifikası eklenir.

## Listeler kimin?

Devletlerin. Yönetişim üç katmandır ve her katmanda başka bir taraf karar verir ([ADR-0002](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance)):

| Katman | Soru | Kim karar verir |
|---|---|---|
| Ağ üyeliği | Yeni bir devlet katılıyor mu? | konsey kurulduktan sonra üye devletler, üçte iki oyla |
| Ulusal kayıt | Bir devlet hangi kurumları ve doğrulayıcıları kaydeder? | yalnız o devlet |
| Tanıma | Bir devlet başka bir devletin belgelerini kabul eder mi? | her devlet kendisi |

Bundan iki sonuç çıkar. Bir devlet kimsenin oyuna gerek kalmadan ayrılabilir. Bir devletin çıkarılması da vatandaşlarının cüzdanındaki belgeleri geçersiz kılmaz; yalnız yeni kayıt yazmasını durdurur. Konsey kurulduktan sonra bile konsey yalnız ağın ortak kurallarını yönetir, bir devletin kendi kurumları hakkında karar veremez.

## Bugünden vakfa giden yol nasıl?

![Bugünkü geçici işletmeciden konsey ya da vakfa ve ortak deftere](/blog/network-as-a-foundation/tr/fig-yol.png)

**Bugün** Tamga geçici işletmecidir. Türkiye listesini ulusal makam adına yayımlar ve bunu listenin içinde yazar: `operator` alanında `"status": "provisional"` ve hiçbir zaman boş bırakılmayan bir `on_behalf_of` değeri bulunur. Kimsenin ihtiyacı yokken ağır bir kurum kurulmaz.

**Bir ya da iki devlet katılmaya istekli olduğunda** bir yönetişim kurumu kurulur: üye devletlerden oluşan bir konsey ve işletmeciliği devralacak bir vakıf ya da sekretarya. Listeler sahiplerine devredilir; yeni üye kabulü ya da ortak bir belge türü eklemek gibi ağ düzeyindeki kararlar birlikte alınır.

**En az iki bağımsız işletmeci olduğunda** kayıtlar izinli bir ortak deftere de taşınır; böylece hiçbir taraf onları tek başına değiştiremez. Tek işletmecinin tuttuğu defter maliyet ekler ama güven eklemez; beklemesinin nedeni bu ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).

## İşletmeci değişince belgeler nasıl bozulmuyor?

Çünkü tanımlayıcılar işletmeciye ait değil. Bir kurumun `issuer_id` değeri kendi sertifikasından hesaplanır, belge türleri sabit URN'lerle adlandırılır ve liste biçiminde bugünden her devlet için bir yer ve bütün roller tanımlıdır. Devir `operator` alanını, listenin adresini ve imzacısını değiştirir. Cüzdanlar ve doğrulayıcılar için yalnız adres ve imzacı değişir; kişilerin cüzdanındaki belgeler geçerli kalır.

Kodun taşıyamadığı parçalar, yani alan adı, kök sertifikalar, liste arşivi ve anahtarlar, yazılı bir halefiyet sözleşmesiyle devredilir. Arkasındaki kural şu: kodla sınırlanamayan her yetki (barındırma, alan adı, kayıt tutma, istatistik) bir politika, ölçülebilir bir devir eşiği ve bir şeffaflık raporuyla sınırlanır (P7 ilkesi).

## O zamana kadar geçici işletmeciyi dürüst tutan ne?

Yalnız iyi niyet değil. Listeler imzalı, sürümlü ve özet zincirlidir; hiçbir şey silinmez. Her iptal listesi yayını herkese açık, saatlik bir çapa günlüğüne girer. Her yayın `trust.tamga.network` adresindeki herkese açık değişiklik kaydına yazılır. Kurallar buna üç ayda bir şeffaflık raporu ve bağımsız denetimi ekler; raporun sayfası henüz yayımlanmadı.

Bunun nerede durduğunu da söylüyoruz. Bugün çapa tek bir işletmecinin imzasına dayanıyor; herkese açık kayıtlar kötüye kullanımı imkânsız kılmaz, caydırır. Bu boşluğu kapatmak ikinci bağımsız işletmecinin ve ardından gelecek ortak defterin işi. Ayrıntısı: [İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)

## Bu her katılımcı için ne anlama geliyor?

![Kim neyi işletir: ağ, devletler, cüzdanlar ve hizmet şirketleri](/blog/network-as-a-foundation/tr/fig-ayrim.png)

- **Kurumlar**, entegrasyonda hangi hizmet şirketinden yardım alırlarsa alsınlar ya da hiç almasınlar, aynı koşullarla kaydolur.
- **Cüzdanlar** adlarıyla değil, kayıtları ve kurallara uyumlarıyla tanınır.
- **Hizmet şirketleri** ağın dışında yarışır; ağın kuralları hepsi için aynıdır.
- **Devletler** kendi listeleri üzerinde tek söz sahibi olarak kalır ve Tamga'nın bugün Türkiye için geçici olarak üstlendiği rolleri hazır olduklarında devralabilir ([Devletler için](/learn/for-states)).

## Sık sorulan sorular

### Vakıf kuruldu mu?

Henüz değil. Yönetişim kurumu bir ya da iki devlet katılmaya istekli olduğunda kurulur. O zamana kadar Tamga geçici işletmecidir ve listeler bunu açıkça yazar.

### Bir şirket ücret ödeyerek öncelik ya da daha iyi bir kayıt alabilir mi?

Hayır. Ağ hizmet satmaz; referans servisleri ve kayıt süreci bütün katılımcılara aynı koşullarla açıktır. Hiçbir şirkete farklı davranılmaz.

### Tamga Wallet'ın ağda özel bir yeri var mı?

Hayır. Ağdaki cüzdanlardan biridir, kendi işletmecisi tarafından işletilir ve listeye herhangi bir cüzdan gibi girer.

### Bir devlet ağdan ayrılırsa insanların belgelerine ne olur?

Geçerli kalırlar. Ayrılmak bir devletin yeni kayıt yazmasını durdurur; verilmiş olanı iptal etmez. Başka devletlerin bu belgeleri kabul etmeye devam edip etmeyeceği her devletin kendi tanıma kararıdır.

### Tek bir devlet ağı ele geçirebilir mi?

Her devlet yalnız kendi listesini yazar, yeni üye kabulü üye devletlerin üçte ikisini gerektirir ve tanımaya her devlet kendisi karar verir. Hiçbir devlet bir başkasının listesini denetleyemez.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [AB Dijital Kimlik Cüzdanı: Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: mimari ve yönetişim](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework)
- [ADR-0002: egemenlik öncelikli yönetişim](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance) · [ADR-0037: ağ yalnız bir ağdır](https://docs.tamga.network/tr/adr/0037-network-only) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [ADR-0009: zincirsiz beta ve zincir eşiği](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [Yönetişim](/learn/governance) · [Hakkında](/about) · [Yol haritası](/roadmap)

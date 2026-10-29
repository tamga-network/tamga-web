---
title: Güven ağı nedir, Tamga Network tam olarak ne yapar?
slug: what-is-a-trust-network
description: Güven ağı, dijital belgeleri kimin verip kimin denetleyebileceğini imzalı listelerle yayımlar. Tamga Network'ün ne yapıp ne yapmadığını ve nereden başlanacağını anlatıyoruz.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Kaynak: tamga-network README (kâr amacı gütmez, vakıf, cüzdan işletmez, paketler npm'de 0.7.4 deneme sürümü, kararlı 1.0.0 hazır olunca); ADR-0035 (AB uyumlu, "EUDI Wallet" unvanı yok; cüzdanları kurala göre tanır), ADR-0037 K1 (ağın işleri: kurallar, güven, katalog, açık kod, referans servisler; satılmaz), ADR-0042 (cüzdan işletmez, listeler), ADR-0020 (kişi kaydı yok, yetkili kaynak), ADR-0009 (defter ≥2 bağımsız işletmeciyle), ADR-0036 (dış listeler, henüz eklenen yok), ADR-0038/0041 (sandbox, kendi kendine test kurumu); concepts/trust-lists, concepts/revocation (önceden indirme); SPEC-TRUST-0001 (TL11 kişisel veri yok; işletmeci provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK doğrulama pakette); sandbox rehberi (age-zk örnek doğrulayıcı); ARF §8.3. Canlı: trust.tamga.network/tl-tr.json operator.status provisional (2026-10-08). Dış: AB güven listeleri, AB ARF GitHub. -->

Güven ağı, bir dijital belgenin gerçek ve o belgeyi vermeye yetkili bir kurumdan geldiğini kimseyi arayıp sormadan denetlemeyi sağlayan ortak katmandır. Tamga Network, Türkiye ve Türk dünyası için bu katmanı kuruyor ve AB'nin eIDAS 2.0 standartlarına dayanıyor. Kuralları yazıyor, imzalı güven listelerini yayımlıyor, belge türlerinin kataloğunu tutuyor, açık kaynak paketler ve bir referans doğrulayıcı sunuyor, bir de test ağı işletiyor. Kişilerin belgelerini tutmuyor, cüzdan işletmiyor ve kimin neyi kime gösterdiğini görmüyor.

## İmzalı bir belgenin neden bir ağa ihtiyacı var?

Dijital imza, bir belgeyi belli bir anahtarın imzaladığını kanıtlar, ama o anahtarın kime ait olduğunu kanıtlamaz. Geçerli bir imza taşıyan bir diploma geldiğinde doğrulayıcının önünde hâlâ iki soru vardır. İmzalayan gerçekten bir üniversite mi, ve diploma vermeye yetkili mi?

Bu soruları her kurum için ayrı ayrı yanıtlamak, kurum sayısı arttıkça işlemez hâle gelir. Her işverenin bütün okulların anahtarlarını kendi dosyasında tutması ve bu dosyayı elle güncel tutması gerekirdi. Güven ağı bu ayrı ayrı dosyaların yerine, herkesin aynı biçimde okuduğu, herkese açık ve imzalı tek bir yanıt koyar. AB de aynı sorunu aynı fikirle çözdü. Avrupa Komisyonu bir listelerin listesini yayımlıyor, her üye devlet de kendi ulusal listesini yayımlıyor ([AB güven listeleri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Bir güven ağında kimler var?

Ağda üç rol var ve üçü de aynı listeye bakıyor:

![Kurum belge verir, kişi taşır, doğrulayıcı denetler; üçü de aynı imzalı güven listesine bakar](/blog/what-is-a-trust-network/tr/fig-ucgen.png)

- **Kurum (belge veren).** Üniversite, hastane, meslek odası, kamu kurumu ya da etkinlik düzenleyicisi, belgeyi kendi anahtarıyla imzalar. Bu anahtar kurumdan hiçbir zaman çıkmaz.
- **Kişi (belge sahibi).** Belgeyi telefonundaki cüzdanda saklar ve hangi alanları paylaşacağına kendisi karar verir.
- **Doğrulayıcı.** İşveren, web sitesi ya da giriş kapısı imzayı denetler, kurumu güven listesinde bulur ve daha önce indirdiği iptal listesine bakar.

Ağ bu üç tarafın yanında durur, ama belge verilirken ya da gösterilirken araya girmez. Liste yayımlandıktan sonra belge verme ve doğrulama doğrudan taraflar arasında gerçekleşir. Bir güven ağını bir platformdan ayıran da budur.

## Tamga Network tam olarak ne yapar?

Ağın altı görevi var ve hepsi herkese açık ([ADR-0037](https://docs.tamga.network/tr/adr/0037-network-only)):

1. **Kurallar.** Tamga ARF (Mimari ve Referans Çerçevesi), Güven Çerçevesi (Trust Framework) ve kural kitapları her rolün ne yapması gerektiğini belirler. Her kural numaralıdır ve [arf.tamga.network](https://arf.tamga.network/tr/) adresinde yayımlanır.
2. **İmzalı güven listeleri.** Listelerin listesi ve Türkiye listesi, kayıtlı kurumları ve her kurumun verebileceği belge türlerini, kayıtlı doğrulayıcıları ve her birinin isteyebileceği alanları, tanınan cüzdan sağlayıcılarını gösterir. Listeler `trust.tamga.network` adresinde sürümlü, özetlerle birbirine zincirlenmiş ve imzalı olarak yayımlanır. Nasıl işlediklerini [İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work) yazısında anlattık.
3. **Şema kataloğu.** Öğrenci belgesi, diploma, etkinlik bileti ve kimlik belgesi gibi belge türleri, `schemas.tamga.network` adresindeki herkese açık katalogda bir kez tanımlanır. Böylece her cüzdan ve her doğrulayıcı bir diplomayı aynı biçimde okur.
4. **Açık paketler.** `@tamga-network/*` paketleri güven listelerini, SD-JWT VC'yi, ISO mdoc'u, belge vermeyi, doğrulamayı, cüzdan çekirdeğini ve sıfır bilgi ispatlarını kapsar. Paketler Apache-2.0 lisanslı açık kaynaktır ve npm'de 0.7.4 deneme sürümüyle yayımlanıyor. Kararlı 1.0.0 sürümü her şey hazır olduğunda gelecek. Deneme sürümlerinde arayüz değişebilir.
5. **Referans servisler.** Güven listesi yayıncısı ve kayıt aracı, Kurum Konsolu ile birlikte barındırılan belge verme servisi, barındırılan doğrulayıcı (Tamga Verify) ve geçici kimlik servisi bu gruba giriyor. Bu servisler, ağın çalışması ve kurumların ağa katılabilmesi için var ve satılmıyor.
6. **Sandbox.** [sandbox.tamga.network](https://sandbox.tamga.network) adresinde, gerçek ağdan tamamen ayrı bir test ağı çalışıyor. Bu ağın kendi test kök sertifikası, örnek kurumları ve uydurma kişileri var. Bir kurum orada birkaç dakika içinde kendi test kurumunu açabiliyor.

![Tamga Network'ün yaptığı ve yapmadığı işler](/blog/what-is-a-trust-network/tr/fig-yapar.png)

## Tamga Network bilerek neyi yapmaz?

Ağın sınırları da görevleri kadar önemli ve bu sınırlar bağlayıcı kurallar olarak yazılı.

**Belge tutmaz.** Belgeler kurumun sisteminden doğrudan kişinin telefonuna gider. Ağ kişilerle ilgili hiçbir kayıt tutmaz. Belge verilirken bilgiler kurumun kendi sisteminden, yani yetkili kaynaktan okunur ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)). Hiçbir listede, günlükte ya da defterde kişisel veri, belge içeriği, hatta bir belgenin özeti bile bulunmaz.

**Cüzdan işletmez.** Ağ cüzdanları yalnız listeler ve hiçbir cüzdanın uygulamasını, cüzdan sağlayıcısını ya da sitesini işletmez ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)). Yayımlanmış kurallara uyan ve uyum testlerinden geçen her cüzdan listeye girebilir. Ağdaki ilk cüzdan olan [Tamga Wallet](https://tamgawallet.com/tr) ayrı bir ürün ve listeye öbür cüzdanlarla aynı yoldan giriyor. Sağlayıcısının kaydı 14 Ekim 2026'dan beri etkin.

**Kimin neyi kime gösterdiğini görmez.** Doğrulayıcılar iptal listelerini önceden indirip önbellekte tutar. Bu yüzden kontrol anında ne kuruma ne de ağa bir istek gider. Kurum belgelerinin nerede gösterildiğini öğrenemez, biz de öğrenemeyiz.

**Bir devletin yerine karar vermez.** Her devlet kendi listesinin tek yazarıdır. Bugün Türkiye listesini Tamga, ulusal makam adına geçici olarak yayımlıyor ve liste bunu `operator` alanında açıkça yazıyor. Devlet kendi listesini yayımladığında ağın listelerin listesi o listeyi gösterecek. Bu değişiklik belgeleri ve cüzdanları etkilemeyecek.

**Hiçbir şey satmaz.** Tamga Network kâr amacı gütmüyor ve işletmeciliği ileride bir vakfa devredilecek. Entegrasyon, destek ve danışmanlık gibi hizmetleri ağın dışındaki şirketler sunuyor ve bu şirketlerin hepsi ağa aynı koşullarla katılıyor.

## Tamga Network'ün AB dijital kimlik cüzdanıyla ilişkisi ne?

Tamga Network aynı yapı taşlarını kullanıyor. Belgeler için SD-JWT VC ve ISO/IEC 18013-5 mdoc, belge verme ve gösterme için HAIP profiliyle birlikte OpenID4VCI ve OpenID4VP, iptal için IETF Token Status List, kurumlar için X.509 sertifikaları ve ETSI biçimlerine eşlenen güven listeleri kullanılıyor. Bunlar AB'nin Mimari ve Referans Çerçevesi'nde yer alan biçimler ([AB ARF, GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Tamga'nın kullanamayacağı şey ise bir unvan. "EUDI Wallet", bir AB üye devletinin sağladığı ya da tanıdığı cüzdanlara verilen yasal bir unvandır. AB dışındaki bir ağ ya da cüzdan ise AB uyumlu olabilir, yani aynı standartları kullanabilir ve bunu testlerle kanıtlayabilir. Tamga kendini de bu şekilde tanımlıyor ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)).

Ülke listeleri, başka listelerle yan yana kullanılabilecek biçimde kuruldu. Başka bir devletin ya da AB'nin ETSI biçimindeki bir listesi, imzacısı sabitlenerek ve kapsamı tanımlanarak ağın listelerin listesine eklenebilir ve her ekleme ayrı bir onay gerektirir ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)). Bugüne kadar böyle bir liste eklenmedi.

## Tamga Network bir blockchain mi?

Hayır. Bugün güven çapası imzalı, sürümlü ve özetlerle birbirine zincirlenmiş listelerden ve saatte en az bir kez yazılan herkese açık bir çapa günlüğünden oluşuyor. AB modeli de böyle çalışıyor. İzinli bir defter ancak en az iki bağımsız işletmeci katıldığında eklenecek, çünkü tek bir işletmecinin tuttuğu defter yeni bir güven sağlamaz. Listelerdeki her alan bugünden bir defter kaydına karşılık geliyor, bu yüzden geçiş cüzdanlar ve doğrulayıcılar için hiçbir şeyi değiştirmeyecek. Gerekçesini [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında anlattık.

## Bugün ne çalışıyor, ne çalışmıyor?

| Parça | 23 Ekim 2026 itibarıyla durumu |
|---|---|
| İmzalı güven listeleri ve çapa günlüğü | `trust.tamga.network` adresinde canlı |
| Şema kataloğu | `schemas.tamga.network` adresinde canlı |
| Barındırılan doğrulayıcı (Tamga Verify) | `verify.tamga.network` adresinde canlı |
| Sıfır bilgi ispatıyla yaş kontrolü | Tamga Verify'da canlı (`age-over-18-zk` politikası); cüzdan tarafında Android ispat kütüphanesi hazır, iOS bekleniyor |
| Kurumların kendi test kurumunu açabildiği sandbox | `sandbox.tamga.network` adresinde canlı |
| Gerçek listedeki cüzdan sağlayıcıları | 14 Ekim 2026'dan beri bir etkin kayıt (Tamga Wallet'ın kaydı) |
| `@tamga-network/*` paketleri | npm'de 0.7.4 deneme sürümü; kararlı 1.0.0 her şey hazır olunca |
| Dış listeler (başka devletler, AB) | tasarlandı; henüz eklenen yok |
| Ortak defter | ikinci bağımsız işletmeciyi bekliyor |

Test ve tanıtım kurumları yalnız sandbox'ta bulunuyor. Sandbox'ta alınan bir belge gerçek bir doğrulayıcıdan geçemez, çünkü gerçek ağ sandbox'ın kök sertifikasını tanımıyor.

## Nereden başlamalı?

- **Belge vermek isteyen bir kurum:** [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution) yazısıyla başlayıp [Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution) adlı geliştirici rehberine geçebilir.
- **Belge denetlemek isteyen bir site ya da uygulama:** [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısını okuyabilir.
- **Cüzdan geliştiren bir ekip:** [cüzdan rehberine](https://docs.tamga.network/tr/guides/build-a-wallet) ve [sandbox rehberine](https://docs.tamga.network/tr/guides/sandbox) bakabilir.
- **Bir kamu kurumu ya da devlet:** [Devletler için](/learn/for-states) sayfasını ve [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework)'ni okuyabilir.
- **Konuya sıfırdan başlayan biri:** Öğren bölümündeki [Tamga Network nedir?](/learn/what-is-tamga-network) sayfasından başlayabilir.

## Sık sorulan sorular

### Tamga Network diplomamı ya da kimlik bilgilerimi saklıyor mu?

Hayır. Belge kurumdan doğrudan kişinin telefonuna gidiyor. Listelerde yalnız kurum adları, sertifika parmak izleri, durumlar, tarihler ve adresler bulunuyor. Kişisel veri ya da belge özeti listelerde yer almıyor.

### Tamga Wallet kullanmak zorunlu mu?

Hayır. Ağın cüzdan kurallarına uyan ve sağlayıcısı listede kayıtlı olan her cüzdan Tamga belgelerini alabilir ve gösterebilir. Tamga Wallet ağdaki cüzdanlardan yalnız biri.

### Listede hangi kurumların olacağına kim karar veriyor?

Kayıt makamı kurumları ve her kurumun verebileceği belge türlerini kayda geçiriyor. Bugün bu işi Türkiye için devlet adına geçici olarak Tamga yapıyor. Bir devlet kendi listesini yayımladığında karar o devlete geçecek. Diploma verme hakkını ağ vermiyor, bu hak kurumun bağlı olduğu yasadan geliyor.

### Başka bir ülkenin belgesi kabul edilir mi?

Doğrulayıcının ülkesi o ülkenin listesini tanıyorsa kabul edilir. Tanıma kararını her devlet kendisi veriyor ve bu kontrol her doğrulamada yapılıyor.

### Güven listesi o an alınamazsa ne olur?

Doğrulayıcı "şu an doğrulanamadı" sonucunu verir ve belgeyi reddetmez. Altyapıya ulaşılamadığı için hiçbir belge sahte sayılmaz.

## Kaynaklar

- [AB güven listeleri (Avrupa Komisyonu)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [AB Dijital Kimlik Cüzdanı: Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network belgeleri: güven listeleri ve federasyon](https://docs.tamga.network/tr/concepts/trust-lists)
- [ADR-0037: Tamga Network yalnız bir ağdır](https://docs.tamga.network/tr/adr/0037-network-only) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network/tr/) · [Ağa katıl](/join) · [Öğren](/learn/what-is-tamga-network)

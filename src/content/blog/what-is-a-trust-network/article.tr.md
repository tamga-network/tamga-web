---
title: Güven ağı nedir, Tamga Network tam olarak ne yapar?
slug: what-is-a-trust-network
description: Güven ağı, dijital belgeyi kimin verip kimin denetleyebileceğini imzalı listelerle yayımlar. Tamga Network ne yapar, ne yapmaz, nereden başlanır.
date: 2026-10-08
lang: tr
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Kaynak: tamga-network README (kâr amacı gütmez, vakıf, cüzdan işletmez, paketler npm'de 0.2.0 deneme sürümü, kararlı 1.0.0 hazır olunca); ADR-0035 (AB uyumlu, "EUDI Wallet" unvanı yok; cüzdanları kurala göre tanır), ADR-0037 K1 (ağın işleri: kurallar, güven, katalog, açık kod, referans servisler; satılmaz), ADR-0042 (cüzdan işletmez, listeler), ADR-0020 (kişi kaydı yok, yetkili kaynak), ADR-0009 (defter ≥2 bağımsız işletmeciyle), ADR-0036 (dış listeler, henüz eklenen yok), ADR-0038/0041 (sandbox, kendi kendine test kurumu); concepts/trust-lists, concepts/revocation (önceden indirme); SPEC-TRUST-0001 (TL11 kişisel veri yok; işletmeci provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK doğrulama pakette); sandbox rehberi (age-zk örnek doğrulayıcı); ARF §8.3. Canlı: trust.tamga.network/tl-tr.json operator.status provisional (2026-10-08). Dış: AB güven listeleri, AB ARF GitHub. -->

Güven ağı, bir dijital belgenin gerçek ve yetkili bir kurumdan geldiğini kimseye telefon açmadan denetlemeyi sağlayan ortak katmandır. Tamga Network, Türkiye ve Türk dünyası için bu katmandır ve AB'nin eIDAS 2.0 standartları üzerine kuruludur. Kuralları yazar, imzalı güven listelerini yayımlar, belge türü kataloğunu tutar, açık kaynak paketleri ve bir referans doğrulayıcıyı sunar, bir de test ağı işletir. Kişilerin belgelerini tutmaz, cüzdan işletmez, kimin neyi kime gösterdiğini görmez.

## İmzalı bir belgenin neden bir ağa ihtiyacı var?

Dijital imza, belgeyi belli bir anahtarın imzaladığını kanıtlar. O anahtarın kime ait olduğunu kanıtlamaz. Geçerli imzalı bir diploma geldiğinde doğrulayıcının iki sorusu kalır: imzalayan gerçekten bir üniversite mi, diploma vermeye yetkili mi?

Bu soruyu her kurum için ayrı ayrı yanıtlamak büyüdükçe işlemez. Her işverenin bütün okulların anahtarlarını kendi dosyasında tutması ve bunu elle güncellemesi gerekirdi. Güven ağı bu özel dosyaların yerine herkesin aynı biçimde okuduğu tek, herkese açık ve imzalı bir yanıt koyar. AB de aynı sorunu aynı fikirle çözdü: Avrupa Komisyonu bir listelerin listesi yayımlar, her üye devlet kendi ulusal listesini ([AB güven listeleri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Bir güven ağında kimler var?

Üç rol var ve üçü de aynı listeye bakar:

![Kurum belge verir, kişi taşır, doğrulayıcı denetler; üçü de aynı imzalı güven listesine bakar](/blog/what-is-a-trust-network/tr/fig-ucgen.png)

- **Kurum (belge veren).** Üniversite, hastane, oda, kamu kurumu ya da etkinlik düzenleyicisi belgeyi kendi anahtarıyla imzalar. Anahtar kurumdan hiç çıkmaz.
- **Kişi (belge sahibi).** Belgeyi telefonundaki cüzdanda tutar ve hangi alanları paylaşacağına kendisi karar verir.
- **Doğrulayıcı.** İşveren, web sitesi ya da giriş kapısı imzayı denetler, kurumu güven listesinde bulur ve önceden indirdiği iptal listesine bakar.

Ağ bu üçünün yanında durur. Belge verilirken ya da gösterilirken arada değildir. Liste yayımlandıktan sonra belge verme ve doğrulama doğrudan taraflar arasında olur. Bir güven ağını bir platformdan ayıran da budur.

## Tamga Network tam olarak ne yapar?

Altı iş, hepsi herkese açık ([ADR-0037](https://docs.tamga.network/tr/adr/0037-network-only)):

1. **Kurallar.** Tamga ARF (Mimari ve Referans Çerçevesi), Güven Çerçevesi (Trust Framework) ve kural kitapları her rolün ne yapacağını söyler. Her kural numaralıdır ve [arf.tamga.network](https://arf.tamga.network/tr/)'te yayımlanır.
2. **İmzalı güven listeleri.** Listelerin listesi ve Türkiye listesi; kayıtlı kurumları ve her birinin verebileceği belge türlerini, kayıtlı doğrulayıcıları ve her birinin isteyebileceği alanları, tanınan cüzdan sağlayıcıları sayar. `trust.tamga.network` adresinde sürümlü, özet zincirli ve imzalı olarak yayımlanır. İşleyişi: [İmzalı bir güven listesi nasıl çalışır?](/blog/how-trust-lists-work)
3. **Şema kataloğu.** Öğrenci belgesi, diploma, etkinlik bileti, kimlik doğrulama belgesi gibi belge türleri `schemas.tamga.network` adresindeki herkese açık katalogda bir kez tanımlanır. Böylece her cüzdan ve doğrulayıcı bir diplomayı aynı biçimde okur.
4. **Açık paketler.** `@tamga-network/*` paketleri güven listelerini, SD-JWT VC'yi, ISO mdoc'u, belge vermeyi, doğrulamayı, cüzdan çekirdeğini ve sıfır bilgi ispatını kapsar. Apache-2.0 lisanslı açık kaynaktır; npm'de 0.2.0 deneme sürümüyle yayımlanır, kararlı 1.0.0 hazır olunca gelir. Deneme sürümünde arayüz değişebilir.
5. **Referans servisler.** Güven listesi yayıncısı ve kayıt aracı, Kurum Konsolu ile birlikte barındırılan belge verme servisi, barındırılan doğrulayıcı (Tamga Verify) ve geçici kimlik servisi. Ağın çalışması ve kurumların katılabilmesi için vardır; satılmaz.
6. **Sandbox.** Gerçek ağdan tamamen ayrı bir test ağı: [sandbox.tamga.network](https://sandbox.tamga.network). Kendi test kök sertifikası, örnek kurumları ve uydurma kişileri vardır. Bir kurum orada birkaç dakikada kendi test kurumunu açabilir.

![Tamga Network'ün yaptığı ve yapmadığı işler](/blog/what-is-a-trust-network/tr/fig-yapar.png)

## Tamga Network bilerek neyi yapmaz?

Sınırlar da işler kadar önemli ve bağlayıcı kural olarak yazılı.

**Belge tutmaz.** Belge, kurumun sisteminden kişinin telefonuna gider. Ağ kişi kaydı tutmaz; belge verilirken bilgiler kurumun kendi sisteminden, yani yetkili kaynaktan okunur ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)). Hiçbir listede, günlükte ya da defterde kişisel veri, belge içeriği, hatta belgenin özeti bile yoktur.

**Cüzdan işletmez.** Ağ cüzdanları listeler. Hiçbir cüzdanın uygulamasını, cüzdan sağlayıcısını ya da sitesini işletmez ([ADR-0042](https://docs.tamga.network/tr/adr/0042-network-and-wallets)). Yayımlanan kurallara uyan ve uyum testlerini geçen her cüzdan listeye girebilir. Tamga Wallet ağdaki ilk cüzdan, ayrı bir ürün; listeye herhangi bir cüzdan gibi girer. Sağlayıcı kaydı bugün ayrılmış durumda, anahtarı sağlayıcı servisi açılınca eklenir.

**Kimin neyi kime gösterdiğini görmez.** Doğrulayıcılar iptal listelerini önceden indirip saklar. Kontrol anında ne kuruma ne ağa bir istek gider. Kurum belgelerinin nerede gösterildiğini öğrenemez, biz de öğrenemeyiz.

**Bir devletin yerine karar vermez.** Her devlet kendi listesinin tek yazarıdır. Bugün Türkiye listesini Tamga geçici olarak, ulusal makam adına yayımlıyor ve liste bunu `operator` alanında açıkça yazıyor. Devlet kendi listesini yayımladığında ağın listelerin listesi o listeyi gösterir; belgeler ve cüzdanlar değişmez.

**Hiçbir şey satmaz.** Tamga Network kâr amacı gütmez, işletmeciliği ileride bir vakfa devredilir. Entegrasyon, destek ve danışmanlık ağın dışındaki şirketlerden gelir; hepsi ağa aynı koşullarla katılır.

## Tamga Network'ün AB dijital kimlik cüzdanıyla ilişkisi ne?

Aynı yapı taşlarını kullanır: belgeler için SD-JWT VC ve ISO/IEC 18013-5 mdoc, belge verme ve gösterme için HAIP profiliyle OpenID4VCI ve OpenID4VP, iptal için IETF Token Status List, kurumlar için X.509 sertifikaları ve ETSI biçimlerine eşlenen güven listeleri. Bunlar AB'nin Mimari ve Referans Çerçevesi'nin saydığı biçimlerdir ([AB ARF, GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Sahiplenemeyeceği şey bir unvandır. "EUDI Wallet", bir AB üye devletinin sağladığı ya da tanıdığı cüzdanların yasal unvanıdır. AB dışındaki bir ağ ya da cüzdan AB uyumlu olabilir: aynı standartları konuşur ve bunu testlerle kanıtlar. Tamga kendini böyle tanımlar ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)).

Ülke listeleri başka listelerle yan yana durabilecek biçimde kuruldu. Başka bir devletin ya da AB'nin ETSI biçimindeki bir listesi, imzacısı sabitlenerek ve kapsamı tanımlanarak ağın listelerin listesine eklenebilir; her ekleme ayrı bir onayla olur ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)). Bugüne kadar eklenen yok.

## Tamga Network bir blockchain mi?

Hayır. Bugün güven çapası imzalı, sürümlü, özet zincirli listeler ve herkese açık, saatlik bir çapa günlüğüdür. AB'nin modeli de budur. İzinli bir defter ancak en az iki bağımsız işletmeci katıldığında eklenir, çünkü tek işletmecinin tuttuğu defter yeni bir güven eklemez. Her liste alanı bugünden bir defter kaydına karşılık gelir; geçiş cüzdanlar ve doğrulayıcılar için bir şey değiştirmeyecek. Gerekçesi [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında.

## Bugün ne çalışıyor, ne çalışmıyor?

| Parça | 8 Ekim 2026 itibarıyla |
|---|---|
| İmzalı güven listeleri ve çapa günlüğü | `trust.tamga.network` adresinde canlı |
| Şema kataloğu | `schemas.tamga.network` adresinde canlı |
| Barındırılan doğrulayıcı (Tamga Verify) | `verify.tamga.network` adresinde canlı |
| Sıfır bilgi ispatıyla yaş kontrolü | Tamga Verify'da canlı (`age-over-18-zk` politikası); cüzdan tarafında Android ispat kütüphanesi hazır, iOS bekliyor |
| Kendi test kurumunu açabilen sandbox | `sandbox.tamga.network` adresinde canlı |
| `@tamga-network/*` paketleri | npm'de 0.2.0 deneme sürümü; kararlı 1.0.0 hazır olunca |
| Dış listeler (başka devletler, AB) | tasarlandı; eklenen yok |
| Ortak defter | ikinci bağımsız işletmeciyi bekliyor |

Test ve gösterim kurumları yalnız sandbox'ta. Sandbox'ta alınan bir belge gerçek bir doğrulayıcıdan geçmez, çünkü gerçek ağ sandbox kökünü tanımaz.

## Nereden başlamalı?

- **Belge vermek isteyen kurum:** [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution), ardından geliştirici rehberi [Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution).
- **Belge denetlemek isteyen site ya da uygulama:** [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site).
- **Cüzdan geliştiren ekip:** [cüzdan rehberi](https://docs.tamga.network/tr/guides/build-a-wallet) ve [sandbox rehberi](https://docs.tamga.network/tr/guides/sandbox).
- **Kamu kurumu ya da devlet:** [Devletler için](/learn/for-states) ve [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework).
- **Sıfırdan başlayan:** Öğren bölümünde [Tamga Network nedir?](/learn/what-is-tamga-network)

## Sık sorulan sorular

### Tamga Network diplomamı ya da kimlik bilgilerimi saklıyor mu?

Hayır. Belge kurumdan kişinin telefonuna gider. Listelerde yalnız kurum adları, sertifika parmak izleri, durumlar, tarihler ve adresler var; kişisel veri ve belge özeti yok.

### Tamga Wallet kullanmak zorunlu mu?

Hayır. Ağın cüzdan kurallarına uyan ve sağlayıcısı listede kayıtlı her cüzdan Tamga belgelerini alıp gösterebilir. Tamga Wallet ağdaki cüzdanlardan biridir, tek değildir.

### Listede hangi kurumların olacağına kim karar veriyor?

Kayıt makamı kurumları ve her birinin verebileceği belge türlerini kayda geçirir. Bugün bunu Türkiye için devlet adına geçici olarak Tamga yapıyor; bir devlet kendi listesini yayımladığında karar o devletindir. Diploma verme hakkını ağ vermez; bu hak kurumu yöneten yasadan gelir.

### Başka bir ülkenin belgesi kabul edilir mi?

Evet, doğrulayıcının ülkesi o ülkenin listesini tanıyorsa. Tanımaya her devlet kendisi karar verir ve bu kontrol her doğrulamada çalışır.

### Güven listesi o an alınamazsa ne olur?

Doğrulayıcı "şu an doğrulanamadı" sonucunu verir, "ret" demez. Altyapıya ulaşılamadı diye bir belge sahte sayılmaz.

## Kaynaklar

- [AB güven listeleri (Avrupa Komisyonu)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [AB Dijital Kimlik Cüzdanı: Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network belgeleri: güven listeleri ve federasyon](https://docs.tamga.network/tr/concepts/trust-lists)
- [ADR-0037: Tamga Network yalnız bir ağdır](https://docs.tamga.network/tr/adr/0037-network-only) · [ADR-0042: ağ cüzdan işletmez](https://docs.tamga.network/tr/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network/tr/) · [Ağa katıl](/join) · [Öğren](/learn/what-is-tamga-network)

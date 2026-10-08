---
title: "Tamga ARF: Avrupa çerçevesini nasıl uyarladık?"
slug: tamga-arf
description: Tamga ARF 1.0, AB'nin referans çerçevesini izler. İçinde ne var, AB ile aynı kalan ve farklı olan ne, bir devlet ya da kurum nasıl katılır.
date: 2026-10-08
lang: tr
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Kaynak: Tamga ARF belge seti (README: set, 1.0.0 Active, ilk yayın 2026-10-02, Türkçe kaynak ve İngilizce resmî çeviri, CC BY 4.0, karar üretmez derler, her kuralın kaynağı ADR/spec/değişmez); FW-ARF-0001 §1.3, §1.4, §1.5, §1.6, §1.7, §3 (rol tablosu), §4.1 (sandbox tek ve ağın), §5, §6.1-6.6, §7.3, §8.1-8.4; FW-TF-0001 §0 (katılım sözleşmesini imzalayan kurum için bağlayıcı), §1.3, §1.6 (konsey üçte iki), §2.4, §4.1-4.3, §6, §6.1 (FD1-FD5, LoTE), §7; FW-RB-0001 (RB-<ROL>-<NN>, RFC 2119, dallanan rulebook'lar, RB-GEN-03); FW-ONB-0001 §5; ADR-0009, ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (SB1-SB5), ADR-0041, D-GOV-5 (TDT-first). Canlı lotl.json 2026-10-08 (TR etkin; AZ, KZ, KG, UZ ayrılmış; HU, TM gözlemci; TR rolleri tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). AB: ARF v3.0.0 (2026-07-23), CIR 2025/848, CIR 2024/2981, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF, Tamga Network'ün kural kitabıdır: AB'nin Avrupa Dijital Kimlik Cüzdanı için yazdığı ARF ile aynı yapıda kurulmuş bir Mimari ve Referans Çerçevesi ([eIDAS 2.0 ve AB ARF nedir](/blog/eidas-arf-for-the-turkic-world)). 1.0 sürümü 2 Ekim 2026'da [arf.tamga.network](https://arf.tamga.network/tr/) adresinde, Türkçe ve İngilizce olarak yayımlandı. Teknik katmanı AB'ninkiyle aynıdır: aynı belge biçimleri, protokoller, güven listesi modeli ve rol seti. Farklı olan yönetişim katmanıdır; AB'de olmayan ve henüz kendi listesi bulunmayan devletler için yazılmıştır. Tamga geçici işletmeci olarak çalışır, her Türk devleti için ayrılmış bir yer vardır, herkese açık bir sandbox vardır ve ikinci bağımsız işletmeci katılana kadar ortak defter yoktur.

## Tamga ARF'de neler var?

![Tamga ARF belge seti ve AB'deki karşılıkları](/blog/tamga-arf/tr/fig-yapi.png)

AB çerçevesi gibi Tamga ARF de bir ana belge ve eklerden oluşur ([Tamga ARF](https://arf.tamga.network/tr/architecture)):

| Belge | İçerik | AB'deki karşılığı |
|---|---|---|
| Ana belge | Kullanım durumları, roller, mimari, veri modeli, güven modeli, güvenlik, yönetişim | EUDI ARF ana belgesi |
| Ek A: Trust Framework | Yönetişim, rol başına katılım kapıları, uyum, sözleşmeler, devir planı | uygulama tüzükleri ve ulusal güven şemaları |
| Ek B: Tamga Rulebook | Her rol için numaralı, bağlayıcı kurallar | ARF Ek 2, üst düzey gereksinimler |
| Ek C: Rulebook'lar | Eğitim (öğrenci belgesi, diploma), Kimlik (kimlik belgesi, ehliyet belgesi), Etkinlik Bileti | belge türü rulebook'ları |
| Ek D ve E | Tanımlar; standartlar, kararlar ve kural kaynakları | ARF Ek 1 ve kaynaklar |
| Okuma yolu, Roller, Katılım süreci | Rol başına okuma sırası, her rolün işi, katılım adımları | |

Okumaya başlamadan önce bu set hakkında bilinmesi gereken üç şey var.

**Derler, karar üretmez.** Çerçevedeki her kural kayda geçmiş bir karardan (ADR), bir spesifikasyondan ya da bir değişmezden gelir; kaynaklar eki her birinin kaynağını yazar. Kaynağı olmayan bir madde kural olarak yazılmaz. Bir kuralı değiştirmek için önce arkasındaki karar değişir, çerçeve aynı çalışmada onu izler.

**Kurallar numaralı ve türlüdür.** Her kuralın `RB-<ROL>-<NN>` biçiminde bir kodu vardır ve MUST, MUST NOT, SHOULD, MAY ifadeleri RFC 2119 anlamında kullanılır. Örneğin RB-GEN-03, güven kaynağı bayat ya da erişilemez olduğunda sonucun "belirsiz" olması gerektiğini söyler; asla "kabul", asla "red" değil. Bir denetçi ya da entegratör tam olarak hangi kurala baktığını gösterebilir.

**Belge türü rulebook'ları ana rulebook'tan dallanır.** Eğitim, Kimlik ve Etkinlik Bileti rulebook'ları ortak kuralların hepsini devralır ve yalnız o türe özgü olanı ekler: kim verir, hangi kimlik doğrulamasıyla, hangi alanlarla, ne kadar süre geçerli, nasıl iptal edilir. Yeni bir alan, yedi maddelik bir kontrol listesi tamamlandıktan sonra yeni bir rulebook olarak eklenir ([Rulebook](https://arf.tamga.network/tr/rulebook)).

Türkçe metin kaynaktır, İngilizce metin aynı sürümün resmî çevirisidir; ikisi her zaman aynı sürümdedir. Belgeler CC BY 4.0 lisansıyla yayımlanır ve her değişiklik çerçevenin [Ne değişti](https://arf.tamga.network/tr/changes) sayfasında listelenir.

## AB ile aynı kalan ne?

Teknik katman, kural gereği. Tamga'nın konumlanma kararı, belge, protokol ve güven listesi biçimlerinin AB standartlarından ayrılmayacağını ve Tamga'ya özgü her ekin standart istemcileri bozmayan bir uzantı noktasıyla yapılacağını söyler ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)). Pratikte:

- **Belge biçimleri:** bütün belge türleri için IETF SD-JWT VC; kimlik belgesinin ikinci temsili olarak, yüz yüze gösterme ve sıfır bilgi ispatı için ISO/IEC 18013-5 mdoc.
- **Protokoller:** belge verme için OpenID4VCI 1.0, gösterme için DCQL ile OpenID4VP 1.0; ikisi de HAIP 1.0 profiliyle.
- **İptal:** IETF Token Status List.
- **Kurum kimliği:** ulusal köke bağlanan X.509 sertifikaları.
- **Güven modeli:** ulusal listeleri gösteren bir listelerin listesi (LOTL); AB'deki iki katmanın aynısı. Listeler sürümlü, özet zincirli ve imzalıdır; güven listesi alanları ETSI TS 119 612 ve ETSI TS 119 602'ye eşlenir.
- **Dış listeler:** başkasının, yani başka bir devletin ya da AB'nin işlettiği bir liste ETSI TS 119 602 biçiminde (LoTE, güvenilen kuruluş listeleri), sabitlenmiş bir imzacı ve tanımlı bir kapsamla okunur ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)).
- **Güvenen taraf kaydı:** doğrulayıcılar AB'nin ortak kayıt veri setiyle kaydolur ve (AB) 2025/848 sayılı Uygulama Tüzüğü ile ETSI TS 119 475 modelinde kayıt sertifikası alır; cüzdan her isteği bu sertifikayla karşılaştırır.
- **Cüzdan güvenliği:** cüzdan sağlayıcısından cüzdan örneği kanıtı ve anahtar kanıtı; anahtarlar cihazın güvenli donanımında.
- **Güvence adları:** kimlik doğrulama için Low, Substantial ve High; belgeler için EAA ve QEAA terimleri.
- **Rol seti:** güven listesi işletmecisinden aracı doğrulayıcıya kadar ARF'nin rolleri; her birinin her ulusal listede bir yeri var.

Amaç, AB ekosistemi için yazılmış yazılımın bir Tamga belgesini Tamga'ya özgü bir kod yolu olmadan işleyebilmesidir. Burada "AB uyumlu" bunu anlatır ve bir etiketle değil, testlerle gösterilir.

## Farklı olan ne, neden?

![Teknik katman AB'ninkiyle aynı; yönetişim katmanı Türk dünyası için yazıldı](/blog/tamga-arf/tr/fig-ayni-farkli.png)

AB çerçevesi bir tüzüğü, makamları hazır üye devletleri ve bir sertifikasyon sistemini varsayar. Tamga ARF'nin bunların hiçbiri AB dışında yokken de çalışması gerekir. Buradan altı fark çıkar.

### 1. Geçici bir işletmeci ve bunu açıkça yazması

AB'de her üye devlet kendi güven listesini işletir. Tamga Network'te henüz hiçbir devlet bu rolü üstlenmedi; bu yüzden Türkiye listesini Tamga ulusal makam adına geçici olarak yayımlar. Liste bunu kendi verisinde yazar, kimsenin sözlü güvenceye dayanması gerekmez:

```json title="Türkiye listesinin işletmecisi (canlı listelerin listesi, 8 Ekim 2026)"
{
  "state_code": "TR",
  "status": "ACTIVE",
  "operator": {
    "name": "Tamga Network",
    "status": "provisional",
    "on_behalf_of": "TR national authority (to be designated)"
  }
}
```

Tamga'nın bu biçimde üstlendiği roller güven listesi işletmecisi, kayıt kurumu, ulusal kök sertifika makamı ve erişim sertifikası sağlayıcısıdır. Her biri devredilecek biçimde tasarlanmıştır. Devir işletmeci alanını, listenin adresini ve imzacısını değiştirir; kurum kimlikleri, belge türü kimlikleri ve verilmiş belgeler değişmez.

### 2. İlk günden her Türk devleti için bir yer

Çerçevede hiçbir şey tek işletmeci varsaymaz. Listelerin listesinde bugünden Türk Devletleri Teşkilatı'nın her üye devleti (Azerbaycan, Kazakistan, Kırgızistan, Türkiye, Özbekistan) ve gözlemci devletler Macaristan ile Türkmenistan için bir yer var. Bugün yalnız Türkiye etkin, diğerleri ayrılmış durumda. Her ulusal liste, boş kalan roller dahil ARF'nin bütün rol setini taşır. Bu kural, sonradan katılan bir devlet yeniden tasarım gerektirmesin diye erkenden "önce TDT" ilkesi olarak konuldu.

### 3. Tasarım gereği PID yok

AB cüzdanı, devletin verdiği kişi kimlik verisine (PID) dayanır. Tamga bu rolü üstlenmez. Her ulusal listede PID sağlayıcısının yeri devlete ayrılmıştır. Devlet bu yeri doldurana kadar geçici bir kimlik servisi, uzaktan kimlik doğrulamasından sonra bir kimlik belgesi verir. Bu belge bir öznitelik belgesidir, PID değildir; rulebook'u AB'nin PID rulebook'unun desenini izler, böylece bir PID sağlayıcısı geldiğinde geçiş kolay olur.

### 4. Sertifikasyondan önce uyum

AB'de cüzdanlar 2024/2981 sayılı Uygulama Tüzüğü uyarınca uygunluk değerlendirme kuruluşlarınca sertifikalanır. Tamga ARF karma bir rejim kullanır: her rolün canlıya çıkmadan önce kendi yazılımıyla çalıştırdığı açık ve sürümlü uyum test vektörleri ve taahhüt testleri, en yüksek belge veren sınıfı için önceden denetim, diğerleri için sonradan denetim. Bağımsız değerlendirme kuruluşları ve ulusal sertifikasyon devletler katıldığında eklenir ([Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework)).

### 5. Herkese açık tek bir sandbox

AB'nin referans uygulamaları ve pilotları var. Tamga Network buna ağın aynı kurallarla işlettiği tek bir test ağı ekler: [sandbox.tamga.network](https://sandbox.tamga.network). Kendi test kökü, kendi listeleri, örnek kurumları ve uydurma kişileri vardır ([ADR-0038](https://docs.tamga.network/tr/adr/0038-sandbox)). Bir kurum orada kendi başına test kurumu açabilir, cüzdan geliştiricileri kendi cüzdan sağlayıcılarını orada kaydettirir. Gerçek hiçbir cüzdan ya da doğrulayıcı sandbox köküne güvenmez; sandbox belgesi gerçek ağda hiçbir zaman geçmez.

### 6. Henüz ortak defter yok

Bugün güven imzalı listelerden ve herkese açık, saatlik bir çapa günlüğünden gelir; AB modeli de budur. İzinli bir defter planın parçasıdır, ama yalnız en az iki bağımsız işletmeci katıldığında; çünkü tek işletmecinin tuttuğu defter maliyet ekler, güven eklemez ([ADR-0009](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çerçeve sınırı açıkça yazar: o zamana kadar çapa tek bir işletmecinin imzasına dayanır ve herkese açık kayıtlar kötüye kullanımı önlemez, caydırır. Ayrıntısı [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında.

Hukuki dayanak da farklıdır. AB'de kurallar bir tüzük öyle dediği için bağlar. Tamga Network'te Trust Framework, katılım sözleşmesini imzalayan her kurumu bağlar; devletler katıldığında yönetişim, üçte iki çoğunlukla karar veren üye devletler konseyine geçer ([Tamga Network neden kâr amacı gütmüyor ve vakfa gidiyor?](/blog/network-as-a-foundation)).

## Bir devlet nasıl katılır?

![Bir devletin rollerini devraldığı adımlar](/blog/tamga-arf/tr/fig-devlet.png)

Bir devletin yeni bir sistem benimsemesi gerekmez. Üzerinde zaten kendi adı yazan rolleri devralır ([Katılım süreci](https://arf.tamga.network/tr/onboarding)):

1. **Niyet.** Devlet katılmak istediğini bildirir. İlk devlet işletmecisi üretime geçtiğinde konsey kurulur.
2. **Kök sertifika.** Devletin kök sertifikası çevrimdışı bir törenle üretilir ve geçici olanın yanına kaydırmalı olarak eklenir.
3. **Liste işletmeciliği ve kayıt kurumu.** Ulusal listenin işletmeci alanı devlete geçer, kayıt yetkisi de. Bundan sonra geçici işletmeci o devlette kimseyi kaydedemez.
4. **PID sağlayıcısı.** Devlet PID sağlayıcısını atar; geçici kimlik belgesi ona devredilir.

Bu adımların hiçbiri bir belgeyi, kaydı ya da kimliği geçersiz kılmaz. Her devlet kendi listesinin tek yazarı olarak kalır; başka bir devletin listesini tanımaya her devlet kendisi karar verir. Ulusal listeyi yayımlamanın teknik adımları geliştirici rehberindedir: [Ulusal listeyi yayımlamak](https://docs.tamga.network/tr/guides/publish-national-list).

## Bir kurum nasıl katılır?

Önce sandbox'tan, sonra Trust Framework'ün katılım kapılarından. Bir üniversite, bir oda, bir kamu kurumu ya da bir bilet satıcısı bütün akışı sandbox'ta dener, uyum testlerini çalıştırır ve ardından üç belge veren seviyesinden birinde kaydolur: kayıtlı, sözleşmeli ya da akredite. Her belge türü için ayrı yetki verilir ve yetki varsayılan olarak kapalıdır. Doğrulayıcılar ortak kayıt veri setiyle kaydolur ve her kullanım için bir kayıt sertifikası alır. Kayıt yasal bir izin değildir: diploma verme yetkisi yine kurumu düzenleyen yasadan gelir. Adımlar [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution) yazısında.

## Okumaya nereden başlamalı?

Çerçevenin her rol için bir [okuma yolu](https://arf.tamga.network/tr/reading-path) var. Kısaca:

- **Bir devlet ya da düzenleyici:** ana belgenin roller ve yönetişim bölümleri, ardından Trust Framework'ün devir planı.
- **Belge veren bir kurum:** Roller sayfası, Tamga Rulebook'un belge veren kuralları ve belge türünüzün rulebook'u, örneğin [Eğitim Rulebook'u](https://arf.tamga.network/tr/rulebooks/education).
- **Bir doğrulayıcı ya da cüzdan geliştiricisi:** Tamga Rulebook'ta rolünüzün kuralları, ardından `docs.tamga.network` adresindeki geliştirici belgeleri ve uyum testleri.

## Sık sorulan sorular

### Tamga ARF, AB ARF'sinin bir kopyası mı?

AB ARF'sinin yapısını izler ve aynı standartları kullanır, ama kendi yönetişimi olan ayrı bir çerçevedir. Bir AB kuralı tüzüğe ya da bir üye devlet makamına dayanıyorsa Tamga ARF'de onsuz da işleyen bir kural vardır ve o rolü bugün kimin üstlendiği yazılıdır.

### AB yeni bir ARF sürümü yayımlayınca ne olur?

Tamga AB kurallarını çıktıkça izler; değişiklikler önce kendi kararlarına, sonra çerçeveye işlenir. Değişiklik yeni bir çerçeve sürümü olur ve Ne değişti sayfasında listelenir.

### Tamga ARF'ye uyan bir cüzdan EUDI Wallet olur mu?

Hayır. "EUDI Wallet", bir AB üye devletinin sunduğu ya da tanıdığı ve AB kurallarına göre sertifikalanan cüzdanların hukuki unvanıdır. Tamga ARF'ye uymak bir cüzdanı AB uyumlu kılar ve Tamga Network'te listelenmesini sağlar.

### Bir devlet kuralları değiştirebilir mi?

Her devlet kendi listesini ve kayıtlarını yönetir. Üye kabulü ya da ortak bir belge türü eklemek gibi ağ geneli kurallara, kurulduktan sonra üye devletler konseyi üçte iki oyla karar verir.

### Çerçeveyi kullanmak ücretsiz mi?

Evet. Belgeler CC BY 4.0 ile yayımlanır; ağın paketleri Apache-2.0 lisanslı açık kaynaktır.

## Kaynaklar

- [Tamga ARF 1.0](https://arf.tamga.network/tr/) · [Mimari](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/tr/rulebook) · [Roller](https://arf.tamga.network/tr/roles) · [Katılım süreci](https://arf.tamga.network/tr/onboarding) · [Ne değişti](https://arf.tamga.network/tr/changes)
- [ADR-0035: konumlanma](https://docs.tamga.network/tr/adr/0035-positioning-three-layers) · [ADR-0036: güven federasyonu](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/tr/adr/0038-sandbox) · [ADR-0009: zincirsiz beta ve zincir eşiği](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: egemenlik öncelikli yönetişim](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance)
- [Federasyon](https://docs.tamga.network/tr/concepts/federation) · [Ulusal listeyi yayımlamak](https://docs.tamga.network/tr/guides/publish-national-list) · [Uyum testleri](https://docs.tamga.network/tr/guides/conformance)
- [AB Dijital Kimlik Cüzdanı Mimari ve Referans Çerçevesi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [(AB) 2025/848 sayılı Uygulama Tüzüğü: güvenen tarafların kaydı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(AB) 2024/2981 sayılı Uygulama Tüzüğü: cüzdan sertifikasyonu](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: güvenilen kuruluş listeleri](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Kurallar ve rulebook'lar](/learn/rules-and-rulebooks) · [Devletler için](/learn/for-states) · [Whitepaper](/whitepaper)

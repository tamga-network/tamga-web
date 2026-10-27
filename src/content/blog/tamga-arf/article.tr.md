---
title: "Tamga ARF: Avrupa çerçevesini nasıl uyarladık?"
slug: tamga-arf
description: Tamga ARF 1.0 AB'nin referans çerçevesini izliyor. İçinde ne olduğunu, AB ile neyin aynı kalıp neyin farklılaştığını ve bir devletin ya da kurumun nasıl katıldığını anlatıyoruz.
date: 2026-10-08
lang: tr
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Kaynak: Tamga ARF belge seti (README: set, 1.0.0 Active, ilk yayın 2026-10-02, Türkçe kaynak ve İngilizce resmî çeviri, CC BY 4.0, karar üretmez derler, her kuralın kaynağı ADR/spec/değişmez); FW-ARF-0001 §1.3, §1.4, §1.5, §1.6, §1.7, §3 (rol tablosu), §4.1 (sandbox tek ve ağın), §5, §6.1-6.6, §7.3, §8.1-8.4; FW-TF-0001 §0 (katılım sözleşmesini imzalayan kurum için bağlayıcı), §1.3, §1.6 (konsey üçte iki), §2.4, §4.1-4.3, §6, §6.1 (FD1-FD5, LoTE), §7; FW-RB-0001 (RB-<ROL>-<NN>, RFC 2119, dallanan rulebook'lar, RB-GEN-03); FW-ONB-0001 §5; ADR-0009, ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (SB1-SB5), ADR-0041, D-GOV-5 (TDT-first). Canlı lotl.json 2026-10-08 (TR etkin; AZ, KZ, KG, UZ ayrılmış; HU, TM gözlemci; TR rolleri tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). AB: ARF v3.0.0 (2026-07-23), CIR 2025/848, CIR 2024/2981, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF, Tamga Network'ün kural kitabıdır. AB'nin Avrupa Dijital Kimlik Cüzdanı için hazırladığı ARF ile aynı yapıda kurulmuş bir Mimari ve Referans Çerçevesidir ([eIDAS 2.0 ve AB ARF nedir](/blog/eidas-arf-for-the-turkic-world)). 1.0 sürümü 2 Ekim 2026'da [arf.tamga.network](https://arf.tamga.network/tr/) adresinde Türkçe ve İngilizce olarak yayımlandı. Çerçevenin teknik katmanı AB'ninkiyle aynı. Aynı belge biçimlerini, protokolleri, güven listesi modelini ve rol setini kullanıyor. Farklı olan, yönetişim katmanı. Bu katman AB üyesi olmayan ve henüz kendi listesi bulunmayan devletler için yazıldı. Tamga geçici işletmeci olarak çalışıyor, her Türk devleti için ayrılmış bir yer var, herkese açık bir sandbox bulunuyor ve ikinci bağımsız işletmeci katılana kadar ortak bir defter kullanılmıyor.

## Tamga ARF'de neler var?

![Tamga ARF belge seti ve AB'deki karşılıkları](/blog/tamga-arf/tr/fig-yapi.png)

AB çerçevesinde olduğu gibi Tamga ARF de bir ana belgeden ve eklerden oluşuyor ([Tamga ARF](https://arf.tamga.network/tr/architecture)):

| Belge | İçerik | AB'deki karşılığı |
|---|---|---|
| Ana belge | Kullanım durumları, roller, mimari, veri modeli, güven modeli, güvenlik, yönetişim | EUDI ARF ana belgesi |
| Ek A: Trust Framework | Yönetişim, her rol için katılım koşulları, uyum, sözleşmeler, devir planı | uygulama tüzükleri ve ulusal güven şemaları |
| Ek B: Tamga Rulebook | Her rol için numaralı ve bağlayıcı kurallar | ARF Ek 2, üst düzey gereksinimler |
| Ek C: Rulebook'lar | Eğitim (öğrenci belgesi, diploma), Kimlik (kimlik belgesi, ehliyet belgesi), Etkinlik Bileti | belge türü rulebook'ları |
| Ek D ve E | Tanımlar; standartlar, kararlar ve kural kaynakları | ARF Ek 1 ve kaynaklar |
| Okuma yolu, Roller, Katılım süreci | Her rol için okuma sırası, her rolün görevi, katılım adımları | |

Okumaya başlamadan önce bu belge seti hakkında üç şeyi bilmekte yarar var.

**Çerçeve kararları derler, kendisi karar üretmez.** Çerçevedeki her kural kayda geçmiş bir karardan (ADR), bir şartnameden ya da bir değişmezden gelir ve kaynaklar eki her kuralın kaynağını gösterir. Kaynağı olmayan bir madde kural olarak yazılmaz. Bir kuralı değiştirmek için önce arkasındaki kararın değişmesi gerekir ve çerçeve de aynı çalışma içinde bu değişikliği izler.

**Kurallar numaralıdır ve türleri bellidir.** Her kuralın `RB-<ROL>-<NN>` biçiminde bir kodu vardır ve kurallarda MUST, MUST NOT, SHOULD ve MAY ifadeleri RFC 2119'daki anlamlarıyla kullanılır. Örneğin RB-GEN-03, güven kaynağı fazla eskimişse ya da erişilemiyorsa sonucun "belirsiz" olması gerektiğini söyler. Bu durumda sonuç hiçbir zaman "kabul" ya da "ret" olamaz. Böylece bir denetçi ya da entegrasyonu yapan ekip, tam olarak hangi kurala baktığını gösterebilir.

**Belge türü rulebook'ları ana rulebook'tan türetilir.** Eğitim, Kimlik ve Etkinlik Bileti rulebook'ları bütün ortak kuralları devralır ve yalnız kendi türlerine özgü konuları ekler. Bunlar belgeyi kimin verdiği, hangi kimlik doğrulamasının yapıldığı, hangi alanların bulunduğu, belgenin ne kadar geçerli olduğu ve nasıl iptal edildiğidir. Yeni bir alan için rulebook yazılması, yedi maddelik bir kontrol listesi tamamlandıktan sonra mümkün oluyor ([Rulebook](https://arf.tamga.network/tr/rulebook)).

Türkçe metin kaynak metin, İngilizce metin ise aynı sürümün resmî çevirisidir ve ikisi her zaman aynı sürümde tutulur. Belgeler CC BY 4.0 lisansıyla yayımlanıyor ve her değişiklik çerçevenin [Ne değişti](https://arf.tamga.network/tr/changes) sayfasında listeleniyor.

## AB ile aynı kalan ne?

Kural gereği teknik katman AB ile aynı kalıyor. Tamga'nın konumlanma kararı, belge, protokol ve güven listesi biçimlerinin AB standartlarından ayrılmayacağını söylüyor. Tamga'ya özgü her ek de standart istemcileri bozmayan bir uzantı noktası üzerinden yapılıyor ([ADR-0035](https://docs.tamga.network/tr/adr/0035-positioning-three-layers)). Pratikte bu şu anlama geliyor:

- **Belge biçimleri:** bütün belge türleri için IETF SD-JWT VC; kimlik belgesinin ikinci gösterimi olarak, yüz yüze gösterim ve sıfır bilgi ispatı için ISO/IEC 18013-5 mdoc.
- **Protokoller:** belge vermek için OpenID4VCI 1.0, göstermek için DCQL ile birlikte OpenID4VP 1.0; ikisi de HAIP 1.0 profiline göre.
- **İptal:** IETF Token Status List.
- **Kurum kimliği:** ulusal bir köke bağlanan X.509 sertifikaları.
- **Güven modeli:** ulusal listeleri gösteren bir listelerin listesi (LOTL), yani AB'deki iki katmanlı yapının aynısı. Listeler sürümlüdür, özetlerle birbirine zincirlenir ve imzalanır. Güven listesi alanları ETSI TS 119 612 ve ETSI TS 119 602'ye eşlenir.
- **Dış listeler:** başka bir devletin ya da AB'nin işlettiği bir liste ETSI TS 119 602 biçiminde (LoTE, güvenilen kuruluş listeleri), imzacısı sabitlenmiş ve kapsamı tanımlanmış olarak okunur ([ADR-0036](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists)).
- **Güvenen taraf kaydı:** doğrulayıcılar AB'nin ortak kayıt veri setiyle kaydolur ve (AB) 2025/848 sayılı Uygulama Tüzüğü ile ETSI TS 119 475 modeline uygun bir kayıt sertifikası alır. Cüzdan da her isteği bu sertifikayla karşılaştırır.
- **Cüzdan güvenliği:** cüzdan sağlayıcısından alınan cüzdan örneği kanıtı ve anahtar kanıtı; anahtarlar cihazın güvenli donanımında tutulur.
- **Güvence düzeyi adları:** kimlik doğrulama için Low, Substantial ve High; belgeler için EAA ve QEAA terimleri.
- **Rol seti:** güven listesi işletmecisinden aracı doğrulayıcıya kadar ARF'deki bütün roller; her birinin her ulusal listede bir yeri var.

Amaç, AB ekosistemi için yazılmış bir yazılımın Tamga belgelerini Tamga'ya özgü bir kod eklemeden işleyebilmesi. Burada "AB uyumlu" sözü bunu anlatıyor ve bu uyumu bir etiketle değil, testlerle gösteriyoruz.

## Farklı olan ne, neden?

![Teknik katman AB'ninkiyle aynı; yönetişim katmanı Türk dünyası için yazıldı](/blog/tamga-arf/tr/fig-ayni-farkli.png)

AB çerçevesi bir tüzüğün, makamları kurulmuş üye devletlerin ve bir sertifikasyon sisteminin var olduğunu varsayıyor. Tamga ARF ise AB dışında bunların hiçbiri yokken de çalışabilmeli. Bu durum altı farka yol açıyor.

### 1. Geçici bir işletmeci var ve bu açıkça yazılıyor

AB'de her üye devlet kendi güven listesini işletiyor. Tamga Network'te ise henüz hiçbir devlet bu rolü üstlenmedi. Bu yüzden Türkiye listesini Tamga, ulusal makam adına geçici olarak yayımlıyor. Liste bunu kendi verisinde de yazıyor, böylece kimsenin bu konuda sözlü bir güvenceye dayanması gerekmiyor:

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

Tamga'nın bu şekilde üstlendiği roller güven listesi işletmecisi, kayıt makamı, ulusal kök sertifika makamı ve erişim sertifikası sağlayıcısıdır. Bunların her biri devredilebilecek biçimde tasarlandı. Devir sırasında işletmeci alanı, listenin adresi ve imzacısı değişir. Kurum kimlikleri, belge türü kimlikleri ve daha önce verilmiş belgeler ise değişmez.

### 2. İlk günden her Türk devleti için bir yer ayrıldı

Çerçevedeki hiçbir yapı tek bir işletmeci varsaymıyor. Listelerin listesinde bugünden Türk Devletleri Teşkilatı'nın her üye devleti (Azerbaycan, Kazakistan, Kırgızistan, Türkiye, Özbekistan) ve gözlemci devletler Macaristan ile Türkmenistan için bir yer bulunuyor. Şu an yalnız Türkiye etkin, diğer yerler ayrılmış durumda. Her ulusal liste, boş kalan roller dahil ARF'deki bütün rol setini taşıyor. Sonradan katılan bir devletin yeniden tasarım gerektirmemesi için bu kural erkenden "önce TDT" ilkesi olarak konuldu.

### 3. Tasarım gereği PID yok

AB'nin cüzdanı, devletin verdiği kişi kimlik verisine (PID) dayanıyor. Tamga bu rolü üstlenmiyor ve her ulusal listede PID sağlayıcısının yeri devlete ayrılmış durumda. Devlet bu yeri doldurana kadar geçici bir kimlik servisi, uzaktan kimlik doğrulamasından sonra bir kimlik belgesi veriyor. Bu belge bir öznitelik belgesi ve PID sayılmıyor. Belgenin rulebook'u ise AB'nin PID rulebook'undaki yapıyı izliyor, böylece bir PID sağlayıcısı geldiğinde geçiş kolay oluyor.

### 4. Sertifikasyondan önce uyum geliyor

AB'de cüzdanlar 2024/2981 sayılı Uygulama Tüzüğü uyarınca uygunluk değerlendirme kuruluşları tarafından sertifikalandırılıyor. Tamga ARF ise karma bir yöntem kullanıyor. Her rol canlıya geçmeden önce kendi yazılımıyla açık ve sürümlü uyum test vektörlerini ve taahhüt testlerini çalıştırıyor. En yüksek belge veren sınıfı önceden denetleniyor, diğerleri ise sonradan denetleniyor. Bağımsız değerlendirme kuruluşları ve ulusal sertifikasyon, devletler katıldığında sisteme eklenecek ([Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework)).

### 5. Herkese açık tek bir sandbox var

AB'nin referans uygulamaları ve pilot projeleri var. Tamga Network bunlara ek olarak, ağın aynı kurallarla işlettiği tek bir test ağı sunuyor: [sandbox.tamga.network](https://sandbox.tamga.network). Sandbox'ın kendi test kökü, kendi listeleri, örnek kurumları ve uydurma kişileri var ([ADR-0038](https://docs.tamga.network/tr/adr/0038-sandbox)). Bir kurum orada kendi başına bir test kurumu açabiliyor, cüzdan geliştiricileri de kendi cüzdan sağlayıcılarını orada kaydettirebiliyor. Hiçbir gerçek cüzdan ya da doğrulayıcı sandbox köküne güvenmediği için sandbox'ta alınan bir belge gerçek ağda hiçbir zaman doğrulamadan geçmiyor.

### 6. Henüz ortak bir defter yok

Bugün güven, imzalı listelerden ve saatte en az bir kez yazılan herkese açık bir çapa günlüğünden geliyor ve AB modeli de böyle çalışıyor. İzinli bir defter planın parçası, ama ancak en az iki bağımsız işletmeci katıldığında devreye girecek, çünkü tek bir işletmecinin tuttuğu defter maliyeti artırır ama güveni artırmaz ([ADR-0009](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çerçeve bu sınırı açıkça yazıyor. O zamana kadar güven çapası tek bir işletmecinin imzasına dayanıyor ve herkese açık kayıtlar kötüye kullanımı engellemiyor, yalnız caydırıyor. Ayrıntıları [Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet) yazısında bulabilirsiniz.

Hukuki dayanak da farklı. AB'de kurallar, bir tüzük öyle söylediği için bağlayıcı. Tamga Network'te ise Trust Framework, katılım sözleşmesini imzalayan her kurumu bağlıyor. Devletler katıldığında yönetişim, kararlarını üçte iki çoğunlukla alan üye devletler konseyine geçecek ([Tamga Network neden kâr amacı gütmüyor ve vakfa gidiyor?](/blog/network-as-a-foundation)).

## Bir devlet nasıl katılır?

![Bir devletin rollerini devraldığı adımlar](/blog/tamga-arf/tr/fig-devlet.png)

Bir devletin yeni bir sistem benimsemesi gerekmiyor. Üzerinde zaten kendi adı yazılı olan rolleri devralması yetiyor ([Katılım süreci](https://arf.tamga.network/tr/onboarding)):

1. **Niyet.** Devlet katılmak istediğini bildirir. İlk devlet işletmecisi canlı ortama geçtiğinde konsey kurulur.
2. **Kök sertifika.** Devletin kök sertifikası çevrim dışı bir törenle üretilir ve geçici kök sertifikanın yanına, onun yerini zamanla alacak biçimde eklenir.
3. **Liste işletmeciliği ve kayıt makamı.** Ulusal listenin işletmeci alanı devlete geçer ve kayıt yetkisi de ona devredilir. Bundan sonra geçici işletmeci o devlette kimseyi kaydedemez.
4. **PID sağlayıcısı.** Devlet kendi PID sağlayıcısını atar ve geçici kimlik belgesi ona devredilir.

Bu adımların hiçbiri bir belgeyi, kaydı ya da kimliği geçersiz kılmıyor. Her devlet kendi listesinin tek yazarı olarak kalıyor ve başka bir devletin listesini tanıyıp tanımayacağına kendisi karar veriyor. Ulusal bir listeyi yayımlamanın teknik adımlarını [Ulusal listeyi yayımlamak](https://docs.tamga.network/tr/guides/publish-national-list) adlı geliştirici rehberinde bulabilirsiniz.

## Bir kurum nasıl katılır?

Kurum önce sandbox'tan, ardından Trust Framework'ün katılım koşullarından geçerek katılıyor. Bir üniversite, bir meslek odası, bir kamu kurumu ya da bir bilet satıcısı bütün süreci sandbox'ta deniyor, uyum testlerini çalıştırıyor ve ardından üç belge veren düzeyinden birinde kaydoluyor. Bu düzeyler kayıtlı, sözleşmeli ve akredite. Her belge türü için ayrı yetki veriliyor ve yetki varsayılan olarak kapalı geliyor. Doğrulayıcılar ortak kayıt veri setiyle kaydoluyor ve her kullanım için bir kayıt sertifikası alıyor. Kayıt yasal bir izin anlamına gelmiyor. Diploma verme yetkisi, örneğin, yine kurumun bağlı olduğu yasadan geliyor. Adımları [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution) yazısında anlattık.

## Okumaya nereden başlamalı?

Çerçevede her rol için bir [okuma yolu](https://arf.tamga.network/tr/reading-path) bulunuyor. Kısaca özetlersek:

- **Bir devlet ya da düzenleyici kurum:** ana belgenin roller ve yönetişim bölümleriyle başlayıp Trust Framework'ün devir planına geçebilir.
- **Belge veren bir kurum:** Roller sayfasını, Tamga Rulebook'taki belge veren kurallarını ve belge türünün rulebook'unu, örneğin [Eğitim Rulebook'unu](https://arf.tamga.network/tr/rulebooks/education) okuyabilir.
- **Bir doğrulayıcı ya da cüzdan geliştiricisi:** Tamga Rulebook'ta kendi rolüne ait kuralları okuyup ardından `docs.tamga.network` adresindeki geliştirici belgelerine ve uyum testlerine geçebilir.

## Sık sorulan sorular

### Tamga ARF, AB ARF'sinin bir kopyası mı?

Tamga ARF, AB ARF'sinin yapısını izliyor ve aynı standartları kullanıyor, ama kendi yönetişimi olan ayrı bir çerçeve. Bir AB kuralı tüzüğe ya da bir üye devlet makamına dayanıyorsa, Tamga ARF'de bunlar olmadan da işleyen bir kural bulunuyor ve o rolü bugün kimin üstlendiği yazıyor.

### AB yeni bir ARF sürümü yayımlayınca ne olur?

Tamga AB kurallarını yayımlandıkça izliyor. Değişiklikler önce kendi kararlarına, ardından çerçeveye işleniyor. Her değişiklik yeni bir çerçeve sürümü olarak çıkıyor ve Ne değişti sayfasında listeleniyor.

### Tamga ARF'ye uyan bir cüzdan EUDI Wallet olur mu?

Hayır. "EUDI Wallet", bir AB üye devletinin sunduğu ya da tanıdığı ve AB kurallarına göre sertifikalandırılmış cüzdanlara verilen hukuki bir unvan. Tamga ARF'ye uymak bir cüzdanı AB uyumlu kılıyor ve Tamga Network'te listelenmesini sağlıyor.

### Bir devlet kuralları değiştirebilir mi?

Her devlet kendi listesini ve kayıtlarını yönetiyor. Yeni bir üyenin kabulü ya da ortak bir belge türünün eklenmesi gibi ağ genelindeki kurallara ise, kurulduktan sonra üye devletler konseyi üçte iki oyla karar verecek.

### Çerçeveyi kullanmak ücretsiz mi?

Evet. Belgeler CC BY 4.0 lisansıyla yayımlanıyor ve ağın paketleri Apache-2.0 lisanslı açık kaynak yazılımlar.

## Kaynaklar

- [Tamga ARF 1.0](https://arf.tamga.network/tr/) · [Mimari](https://arf.tamga.network/tr/architecture) · [Güven Çerçevesi](https://arf.tamga.network/tr/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/tr/rulebook) · [Roller](https://arf.tamga.network/tr/roles) · [Katılım süreci](https://arf.tamga.network/tr/onboarding) · [Ne değişti](https://arf.tamga.network/tr/changes)
- [ADR-0035: konumlanma](https://docs.tamga.network/tr/adr/0035-positioning-three-layers) · [ADR-0036: güven federasyonu](https://docs.tamga.network/tr/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/tr/adr/0038-sandbox) · [ADR-0009: zincirsiz beta ve zincir eşiği](https://docs.tamga.network/tr/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: egemenlik öncelikli yönetişim](https://docs.tamga.network/tr/adr/0002-sovereignty-first-governance)
- [Federasyon](https://docs.tamga.network/tr/concepts/federation) · [Ulusal listeyi yayımlamak](https://docs.tamga.network/tr/guides/publish-national-list) · [Uyum testleri](https://docs.tamga.network/tr/guides/conformance)
- [AB Dijital Kimlik Cüzdanı Mimari ve Referans Çerçevesi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [(AB) 2025/848 sayılı Uygulama Tüzüğü: güvenen tarafların kaydı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(AB) 2024/2981 sayılı Uygulama Tüzüğü: cüzdan sertifikasyonu](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: güvenilen kuruluş listeleri](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Kurallar ve rulebook'lar](/learn/rules-and-rulebooks) · [Devletler için](/learn/for-states) · [Whitepaper](/whitepaper)

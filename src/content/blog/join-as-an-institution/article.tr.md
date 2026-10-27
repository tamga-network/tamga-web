---
title: Bir kurum Tamga Network'e nasıl katılır?
slug: join-as-an-institution
description: Bir kurumun Tamga Network'e nasıl katıldığını anlatıyoruz; sandbox'ta deneme, kayıt bilgileri ve CSR ile başvuru, güven listesine giriş ve ilk belge.
date: 2026-10-08
updated: 2026-10-23
lang: tr
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Kaynak: GUIDE-0007 join-as-institution 1.0.0 (alan ve sınıflar, başvuru JSON'u, ADR-0024 zorunlu bilgiler, iki P-256 anahtar, CSR, HSM/KMS, sertifika 2 yıl / en çok 3, kayıt makamı eksikleri bir kerede bildirir, 24 saatte yayında, issuer_id sertifikadan, WRPRC, tür başına yetki, biten yetki silinmez, barındırılan / kendi sunucu, SPEC-ID-0003 kimlik doğrulama, durumlar, veriliş anındaki durum); GUIDE-0013 sandbox §9 (test kurumu: uydurma ad, "(TEST)" eklenir, e-posta/telefon/kişi adı sorulmaz, gerçek adlar ve resmî kelimeler reddedilir, passkey daveti, en çok 200 satır CSV, TCKN sağlama kontrolü reddedilir, masada belge verme QR + PIN, örnek doğrulayıcılar; sınırlar 30 / 10 dakikada 10 / 200 kayıt / saatte 100 teklif; gece silinir; bugün yalnız eğitim); ADR-0041; ADR-0019 (Kurum Konsolu); ADR-0016 (kapsamlı API anahtarı); ADR-0020 (yetkili kaynak); tamga-web katılım sayfası (katılım sözleşmesi, barındırılan serviste veri işleme sözleşmesi, aydınlatma metni, yetki kanıtı, OpenAPI sorgu ucu, istatistikte kişisel veri yok, partners@tamga.network, 6 adım). Dış: (AB) 2025/848 sayılı Uygulama Tüzüğü, ETSI TS 119 475. -->

Bir kurum Tamga Network'e iki aşamada katılır. Önce bütün süreci sandbox'ta dener. Orada birkaç dakika içinde kendi test kurumunu açar ve uydurma kayıtlardan bir cüzdana belge verir. Ardından kayıt bilgilerini ve bir sertifika imzalama isteğini göndererek gerçek ağa başvurur. Kayıt makamı dosyayı inceler, kök sertifika makamı kurumun sertifikasını imzalar ve kurum 24 saat içinde imzalı güven listesine girer. Listede, hangi belge türlerini vermeye yetkili olduğu da yazılıdır. Kurum bundan sonra belgelerini barındırılan servis ve Kurum Konsolu üzerinden ya da kendi sunucusundan verebilir.

![Sandbox denemesinden ilk belgeye dört adım](/blog/join-as-an-institution/tr/fig-yol.png)

## Hangi kurumlar katılabilir?

İnsanların bir şeyi kanıtlamak için ihtiyaç duyduğu belgeleri veren her kurum katılabilir. Üniversiteler ve okullar, hastaneler ve meslek odaları, kamu kurumları, çalışan ve yetki belgeleri veren şirketler ve kişiye bağlı bilet satan etkinlik düzenleyicileri bunlara örnek. Listede her kurumun bir alanı (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) ve bir sınıfı bulunur:

| Sınıf | Anlamı |
|---|---|
| `PUB` | kamu kurumunun verdiği belge |
| `QUALIFIED` | nitelikli belge |
| `EAA` | öğrenci belgesi ya da bilet gibi sıradan elektronik belge |

Ağa katılmak, kurumu kayda geçirir ama ona daha önce sahip olmadığı bir yetki vermez. Diploma verme hakkı, örneğin, üniversitenin bağlı olduğu yasadan gelir. Ağ ise bu hakkın bir makine tarafından denetlenebilmesini sağlar.

Belge vermek yerine belgeleri denetlemek isteyen kurumlar, örneğin işverenler, web siteleri ya da giriş kapıları, ağa kayıtlı doğrulayıcı olarak katılır. Bu yolu [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında anlattık.

## Bir kurum başvurmadan önce nasıl dener?

Kurum her şeyi, ağın ayrı test ortamı olan sandbox'ta deneyebilir: [sandbox.tamga.network](https://sandbox.tamga.network). Oradaki hiçbir işlem gerçek ağı etkilemez. Sandbox'ın kendi test kök sertifikası vardır, listeleri test listesi olarak işaretlenir ve gerçek bir doğrulayıcı oradan alınan belgeleri kabul etmez.

Deneme birkaç dakika sürer ([sandbox rehberi, §9](https://docs.tamga.network/tr/guides/sandbox)):

1. Sandbox sayfasında **Kurumunu dene** seçeneğine tıklayın ve uydurma bir kurum adı yazın. Adın sonuna "(TEST)" eklenir. Sizden e-posta, telefon numarası ya da kişi adı istenmez. Gerçek kurum adları ve resmî kurumları çağrıştıran kelimeler kabul edilmez.
2. Test kurumu hemen sandbox güven listesine eklenir. Kurumun imza sertifikasını sandbox'ın test kurumlarına ayrılmış sertifika makamı verir.
3. Tek kullanımlık davet bağlantısıyla Kurum Konsolu'nu açın ve bir passkey oluşturun.
4. Kayıtları tek tek girin ya da en çok 200 satırlık bir CSV dosyası yükleyin. T.C. kimlik numarasının sağlama kontrolünden geçen bir numara içeren kayıtlar reddedilir, bu yüzden sisteme yalnız bilerek geçersiz yazılmış numaralar girebilir.
5. Bir kaydın yanındaki **Masada ver** seçeneğine tıklayın, sandbox'a bağlı bir cüzdanla QR kodu okutun ve PIN'i girin.
6. Belgeyi sandbox sayfasındaki "Diploma kontrolü" ya da "Öğrenci indirimi" örnek doğrulayıcısına gösterin.

Bugün test kurumu bir eğitim kurumu olarak açılıyor ve öğrenci belgesiyle diploma verebiliyor. Kurum, hesabı, kayıtları ve sertifikaları her gece siliniyor. Ortamın herkes için kullanılabilir kalması için bazı sınırlar da var. Aynı anda en çok 30 test kurumu açılabiliyor, her birinde en çok 200 kayıt bulunabiliyor ve saatte en çok 100 teklif oluşturulabiliyor.

> **Not:** Sandbox'a yalnız uydurma veri girin. Sandbox bir test ağıdır, hizmet taahhüdü yoktur ve her gece Türkiye saatiyle 03.30'da sıfırlanır.

## Gerçek ağa başvuruda ne var?

Başvuru tek bir dosyadan oluşur ve üç tür bilgi taşır. Dosya kurumun kim olduğunu, hangi belgeleri vereceğini ve bu belgelerdeki bilgilerin nereden geleceğini anlatır.

![Bir kurumun başvurusu için hazırlaması gerekenler](/blog/join-as-an-institution/tr/fig-gerekenler.png)

Kayıt bilgileri, AB'nin katılımcılar için tanımladığı ortak veri setinden oluşur. Bunlar resmî ve ticari ad, resmî tanımlayıcı (vergi numarası ya da MERSİS numarası), posta adresi, iletişim bilgisi ve kişilerin şikâyette bulunabileceği veri koruma makamıdır ([ADR-0024](https://docs.tamga.network/tr/adr/0024-participant-registration-data)). AB de cüzdana güvenen taraflar için aynı modeli [(AB) 2025/848 sayılı Uygulama Tüzüğü](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) ile kullanıyor. Bir alan eksikse kayıt yapılmaz ve kayıt makamı eksiklerin hepsini tek seferde bildirir.

```json title="Kısaltılmış örnek: başvuru dosyası (uydurma kurum)"
{
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "vcts": ["urn:tamga:edu:StudentCredential:1", "urn:tamga:edu:DiplomaCredential:1"],
  "authentic_source": { "name": "Example University Student Information System", "mode": "REMOTE" },
  "identifiers": [{ "scheme": "TR-VKN", "value": "TR0000000000" }],
  "contact": { "support_uri": "https://example.edu.tr/support" },
  "supervisory_authority": { "name": "Kişisel Verileri Koruma Kurumu (KVKK)", "country": "TR" }
}
```

Örneğin tamamını [Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution) adlı geliştirici rehberinde bulabilirsiniz.

Dosyadaki iki satır, ağın nasıl çalıştığını iyi gösteriyor. `vcts`, kurumun vermek istediği belge türlerini listeler. Bu türler herkese açık [şema kataloğundan](https://docs.tamga.network/tr/specifications/schema-catalog) seçilir ve yeni bir tür eklenecekse önce kendi onay sürecinden geçer. `authentic_source` ise bilgilerin gerçekte geldiği sistemin adını verir. Ağ kişilerle ilgili hiçbir kayıt tutmaz. Belge verilirken bilgiler kurumun kendi sisteminden, kurumun denetlediği bir uç üzerinden okunur ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)).

Dosyayla birlikte hukuki belgeler de gönderilir. Bunlar katılım sözleşmesi, barındırılan servis kullanılacaksa veri işleme sözleşmesi, belge verilecek kişiler için güncellenmiş aydınlatma metni ve kurumun bu belgeyi vermeye yetkili olduğunu gösteren kanıttır. Barındırılan servis kullanılsa da veri sorumlusu kurum olarak kalır.

## Kurumun anahtarı neden kurumdan hiç çıkmaz?

Bir belgeyi kurumun belgesi yapan şey, kurumun anahtarıdır. Anahtarı elinde tutan herkes kurum adına imza atabileceği için anahtar her adımda kurumda kalır.

Kurum iki P-256 anahtar çifti üretir. Bunlardan biri belgeleri, öbürü de kurumun iptal listesini imzalar. Kurum dışarıya her anahtar için yalnız bir sertifika imzalama isteği (CSR) gönderir:

```bash title="Anahtar ve sertifika imzalama isteği üretmek"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

Canlı ortamda anahtarın yeri bir donanım güvenlik modülü (HSM) ya da bulut üzerindeki bir anahtar yönetim servisidir (KMS). Kayıt makamı CSR'nin imzasını denetler ve kuruma kök sertifika makamının imzaladığı, iki yıl (en çok üç yıl) geçerli bir sertifika gönderir.

## Kurum kayda geçince ne olur?

Kayıt makamı kurumu Türkiye listesine ekler ve listeyi yeniden imzalar. Kayıt 24 saat içinde `trust.tamga.network` adresinde yayına girer. Kayıtta sertifikanın parmak izinden hesaplanan bir `issuer_id`, kurumun sınıfı ve güvence düzeyi, vermeye yetkili olduğu belge türleri, durumu ve durum geçmişi bulunur. Her yayında kendiliğinden bir kayıt sertifikası (ETSI TS 119 475) da üretilir ve cüzdanlar kaydı bu sertifikayla da denetleyebilir. Kaydın neye benzediğini ve doğrulayıcının onu nasıl okuduğunu [İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work) yazısında anlattık.

Yetki her belge türü için ayrı verilir. Sonradan yeni bir tür eklenebilir ya da bir türün yetkisi sona erdirilebilir. Sona eren yetkinin kaydı silinmez ve yetki bitmeden önce verilen belgeler doğrulanmaya devam eder.

## Kurum ilk belgesini nasıl verir?

Bunun iki yolu var ve iki yolda da ortaya çıkan belge aynıdır. Belge kurumun adına verilir ve kurumun anahtarıyla imzalanır.

| | Barındırılan servis | Kendi sunucunuz |
|---|---|---|
| Ne çalıştırır | Tamga'nın belge verme servisi ve Kurum Konsolu | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Nasıl bağlanırsınız | konsoldan ya da sisteminizden kapsamı sınırlı bir API anahtarıyla | kendi kurulumunuz |
| Kime uygun | hızlı başlamak isteyenler, masada belge verenler, küçük ekipler | her şeyi kendi bünyesinde tutmak isteyen kurumlar |

Barındırılan servis kullanıldığında da anahtar kurumda kalır. Servis, kurumun uzaktan imza hizmetine (CSC API v2) yalnız bir özet gönderir ve imzayı geri alır ([ADR-0057](https://docs.tamga.network/tr/adr/0057-hosted-issuance-remote-signing)).

[Kurum Konsolu](https://docs.tamga.network/tr/adr/0019-institution-console-and-database), kurum çalışanlarının işlerini yaptığı yerdir. Çalışanlar konsola passkey ile girer ve kayıtları yönetir. Masada belge verirken QR kodu ve ayrıca iletilen bir PIN kullanırlar. Belgeleri iptal edebilir ya da askıya alabilir, belge verme istatistiklerini de görebilirler. Bu istatistiklerde hiçbir zaman kişisel veri yer almaz. Kurumun kendi sistemleri de aynı işleri, kuruma bağlı ve kapsamı sınırlı bir API anahtarıyla yapabilir ([ADR-0016](https://docs.tamga.network/tr/adr/0016-hosted-issuer-api-access)).

Kurum her belgeden önce kişinin kimliğini, o belge türünün gerektirdiği düzeyde doğrular. Kişi işe cüzdanından da başlayabilir. Cüzdanda kurumu seçer, kurum da onu cüzdanındaki doğrulanmış kimlik belgesi üzerinden kendi kayıtlarıyla eşleştirir.

Diploma dahil her belge, her biri ayrı bir anahtara bağlı 10 kopyalık bir paket olarak verilir. Böylece cüzdan her gösterimde yeni bir kopya kullanabilir ve iki doğrulayıcı aynı kişiyi tekrar eden bir değer üzerinden eşleştiremez ([OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive)). Belge, sağlayıcısı güven listesinde kayıtlı olan her cüzdana gönderilebilir. Kurum, belge verdiği kişiler adına bir cüzdan seçmez.

## Katıldıktan sonra ne değişebilir?

![Bir kurum kaydının dört durumu ve her birinin anlamı](/blog/join-as-an-institution/tr/fig-durumlar.png)

Bütün durumlarda aynı kural geçerli. Doğrulayıcı bir belgeyi, kurumun bugünkü durumuna göre değil, belgenin verildiği gündeki durumuna göre değerlendirir. Bu yüzden belge vermeyi bırakan bir kurum, mezunlarının diplomalarını geçersiz hâle getirmez. Kurumun anahtarı ele geçirilirse kayıt belli bir tarihle iptal edilir ve yalnız o tarihten sonra verilen belgeler doğrulamadan geçemez.

## Gerçek bir katılım projesi nasıl yürür?

[Ağa katıl](/join) sayfasında altı adım yer alıyor. Önce kapsam belirlenir, yani hangi belgelerin verileceğine ve hangi pilot grupla başlanacağına karar verilir. Ardından belge türü seçilir ya da birlikte tasarlanır. Sözleşmeler imzalanır ve aydınlatma metni güncellenir. Sonra kayıt yapılır, entegrasyon kurulur ve her şey sandbox'ta baştan sona test edilir. En son, önce küçük bir grupla canlıya geçilir. Başlamak için kurumunuzun adını ve belge mi vermek, doğrulamak mı yoksa ikisini birden mi yapmak istediğinizi partners@tamga.network adresine yazabilirsiniz.

## Sık sorulan sorular

### Kurum öğrenci ya da üye veritabanını teslim etmek zorunda mı?

Hayır. Ağ kişilerle ilgili hiçbir kayıt tutmaz. Bilgiler belge verildiği anda kurumun kendi sisteminden okunur ve doğrudan kişinin telefonuna gider.

### Kurumun kendi sunucusu olması gerekir mi?

Hayır. Başlamak için barındırılan belge verme servisi ve Kurum Konsolu yeterlidir. Belge verme işini kendisi yürütmek isteyen kurumlar açık kaynak `@tamga-network/issuer` paketini kullanabilir.

### Sandbox'taki test kurumu gerçek ağa taşınabilir mi?

Hayır. Sandbox'taki kurumlar, kayıtlar ve sertifikalar her gece silinir ve sandbox'ın kök sertifikası gerçek ağda tanınmaz. Gerçek ağ için ayrı bir başvuru ve ayrı anahtarlar gerekir.

### Kurumun belgelerini hangi cüzdanlar alabilir?

Sağlayıcısı güven listesinde kayıtlı olan ve ağın cüzdan kurallarına uyan her cüzdan bu belgeleri alabilir. Tamga Wallet ağdaki cüzdanlardan yalnız biridir.

### Kurumun imza anahtarı çalınırsa ne olur?

Kurumun kaydı bir `invalidates_from` tarihiyle iptal edilir. O andan sonra imzalanan belgeler doğrulamadan geçemez, daha önce imzalananlar ise etkilenmez. Kurum ardından yeni bir sertifika kaydettirir.

## Kaynaklar

- [(AB) 2025/848 sayılı Uygulama Tüzüğü: cüzdana güvenen tarafların kaydı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: güvenen taraf öznitelikleri ve kayıt sertifikaları](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/tr/guides/sandbox) · [Belge verme](https://docs.tamga.network/tr/guides/issue-credentials)
- [ADR-0024: katılımcı kayıt bilgileri](https://docs.tamga.network/tr/adr/0024-participant-registration-data) · [ADR-0041: sandbox test kurumları](https://docs.tamga.network/tr/adr/0041-sandbox-institution-test-accounts)
- [Tamga Kural Kitabı (katılım kuralları)](https://arf.tamga.network/tr/rulebook) · [Ağa katıl](/join) · [Belge veren olarak katılım](/learn/join-as-issuer)

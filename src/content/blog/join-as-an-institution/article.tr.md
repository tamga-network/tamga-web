---
title: Bir kurum Tamga Network'e nasıl katılır?
slug: join-as-an-institution
description: Bir kurum Tamga Network'e nasıl katılır: sandbox'ta deneme, kayıt bilgileri ve CSR ile başvuru, güven listesine giriş ve ilk belge.
date: 2026-10-08
lang: tr
category: network
draft: false
related: what-is-a-trust-network, how-trust-lists-work, add-verification-to-your-site, openid4vci-deep-dive, page:/join
---

<!-- Kaynak: GUIDE-0007 join-as-institution 1.0.0 (alan ve sınıflar, başvuru JSON'u, ADR-0024 zorunlu bilgiler, iki P-256 anahtar, CSR, HSM/KMS, sertifika 2 yıl / en çok 3, kayıt makamı eksikleri bir kerede bildirir, 24 saatte yayında, issuer_id sertifikadan, WRPRC, tür başına yetki, biten yetki silinmez, barındırılan / kendi sunucu, SPEC-ID-0003 kimlik doğrulama, durumlar, veriliş anındaki durum); GUIDE-0013 sandbox §9 (test kurumu: uydurma ad, "(TEST)" eklenir, e-posta/telefon/kişi adı sorulmaz, gerçek adlar ve resmî kelimeler reddedilir, passkey daveti, en çok 200 satır CSV, TCKN sağlama kontrolü reddedilir, masada belge verme QR + PIN, örnek doğrulayıcılar; sınırlar 30 / 10 dakikada 10 / 200 kayıt / saatte 100 teklif; gece silinir; bugün yalnız eğitim); ADR-0041; ADR-0019 (Kurum Konsolu); ADR-0016 (kapsamlı API anahtarı); ADR-0020 (yetkili kaynak); tamga-web katılım sayfası (katılım sözleşmesi, barındırılan serviste veri işleme sözleşmesi, aydınlatma metni, yetki kanıtı, OpenAPI sorgu ucu, istatistikte kişisel veri yok, partners@tamga.network, 6 adım). Dış: (AB) 2025/848 sayılı Uygulama Tüzüğü, ETSI TS 119 475. -->

Bir kurum Tamga Network'e iki aşamada katılır. Önce bütün akışı sandbox'ta dener: orada birkaç dakikada kendi test kurumunu açar ve uydurma kayıtlardan bir cüzdana belge verir. Sonra kayıt bilgileri ve bir sertifika imzalama isteğiyle gerçek ağa başvurur. Kayıt makamı dosyayı denetler, kök sertifika makamı kurumun sertifikasını imzalar ve kurum 24 saat içinde, belli belge türleri için yetkili olarak imzalı güven listesinde yer alır. Bu noktadan sonra belgeyi barındırılan servis ve Kurum Konsolu üzerinden ya da kendi sunucusundan verir.

![Sandbox denemesinden ilk belgeye dört adım](/blog/join-as-an-institution/tr/fig-yol.png)

## Hangi kurumlar katılabilir?

İnsanların bir şeyi kanıtlamak için ihtiyaç duyduğu belgeleri veren her kurum: üniversiteler ve okullar, hastaneler ve meslek odaları, kamu kurumları, şirketler (çalışan ve yetki belgeleri) ve etkinlik düzenleyicileri (kişiye bağlı biletler). Listede her kurumun bir alanı (`EDUCATION`, `HEALTH`, `GOVERNMENT`, `FINANCE`, `LOGISTICS`, `EVENTS`, `IDENTITY`, `OTHER`) ve bir sınıfı vardır:

| Sınıf | Anlamı |
|---|---|
| `PUB` | kamu kurumunun verdiği belge |
| `QUALIFIED` | nitelikli belge |
| `EAA` | öğrenci belgesi ya da bilet gibi sıradan elektronik belge |

Katılmak bir kurumu kayda geçirir; ona zaten sahip olmadığı bir yetki vermez. Diploma verme hakkı üniversiteyi yöneten yasadan gelir. Ağın işi bu hakkı bir makinenin denetleyebileceği hâle getirmektir.

Belge vermek değil denetlemek isteyen kurumlar (işverenler, web siteleri, giriş kapıları) kayıtlı doğrulayıcı olarak katılır. O yol [Sitenize ya da uygulamanıza "Tamga ile doğrula" ekleyin](/blog/add-verification-to-your-site) yazısında.

## Bir kurum başvurmadan önce nasıl dener?

Ağın ayrı test ortamı sandbox'ta: [sandbox.tamga.network](https://sandbox.tamga.network). Oradaki hiçbir şey gerçek ağa dokunmaz. Kendi test kök sertifikası vardır, listeleri test listesi olarak işaretlidir ve gerçek bir doğrulayıcı oradaki belgeleri kabul etmez.

Deneme birkaç dakika sürer ([sandbox rehberi, §9](https://docs.tamga.network/tr/guides/sandbox)):

1. Sandbox sayfasında **Kurumunu dene**'yi seçin ve uydurma bir kurum adı yazın; ada "(TEST)" eklenir. E-posta, telefon ya da kişi adı sorulmaz. Gerçek kurum adları ve resmî kurum kelimeleri kabul edilmez.
2. Test kurumu hemen sandbox güven listesine, sandbox'ın test kurumları sertifika makamından alınan kendi imza sertifikasıyla eklenir.
3. Tek kullanımlık davet bağlantısıyla Kurum Konsolu'nu açın ve bir passkey oluşturun.
4. Kayıtları tek tek girin ya da bir CSV dosyası yükleyin (en çok 200 satır). T.C. kimlik numarası sağlama kontrolünden geçen bir numara içeren kayıt reddedilir; içeri yalnız bilerek geçersiz yazılmış numaralar girer.
5. Bir kaydın yanında **Masada ver**'i seçin, sandbox'a bağlı bir cüzdanla QR kodu okutun ve PIN'i girin.
6. Belgeyi sandbox sayfasındaki "Diploma kontrolü" ya da "Öğrenci indirimi" örnek doğrulayıcısına gösterin.

Bugün test kurumu bir eğitim kurumudur (öğrenci belgesi ve diploma). Kurum, hesabı, kayıtları ve sertifikaları her gece silinir. Sınırlar ortamı herkese açık tutar: aynı anda en çok 30 test kurumu, her birinde 200 kayıt ve saatte 100 teklif.

> **Not:** Sandbox'a yalnız uydurma veri girin. Orası bir test ağıdır; hizmet taahhüdü yoktur ve her gece Türkiye saatiyle 03.30'da sıfırlanır.

## Gerçek ağa başvuruda ne var?

Başvuru tek bir dosyadır ve üç tür bilgi taşır: kurum kim, ne verecek, bilgileri nereden gelecek.

![Bir kurumun başvurusu için hazırlaması gerekenler](/blog/join-as-an-institution/tr/fig-gerekenler.png)

Kayıt bilgileri, AB'nin katılımcılar için ortak veri setidir: resmî ve ticari ad, resmî tanımlayıcı (vergi numarası ya da MERSİS numarası), posta adresi, iletişim ve kişilerin şikâyet edebileceği veri koruma makamı ([ADR-0024](https://docs.tamga.network/tr/adr/0024-participant-registration-data)). AB'de cüzdana güvenen taraflar için aynı model [(AB) 2025/848 sayılı Uygulama Tüzüğü](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) ile kullanılıyor. Bir alan eksikse kayıt yapılmaz; kayıt makamı eksiklerin hepsini bir kerede bildirir.

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

Tam örnek geliştirici rehberinde: [Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution).

Dosyadaki iki satır ağın nasıl çalıştığını iyi anlatır. `vcts`, kurumun vermek istediği belge türlerini sayar; türler herkese açık [şema kataloğundan](https://docs.tamga.network/tr/specifications/schema-catalog) seçilir, yeni bir tür önce kendi onay sürecinden geçer. `authentic_source`, bilgilerin gerçekte geldiği sistemi adlandırır. Ağ kişi kaydı tutmaz: belge verilirken bilgiler kurumun kendi sisteminden, kurumun denetlediği bir uç üzerinden okunur ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)).

Dosyanın yanında hukuki parçalar da gelir: katılım sözleşmesi, barındırılan servis kullanılıyorsa veri işleme sözleşmesi (veri sorumlusu kurum olarak kalır), belge verilen kişiler için güncellenmiş aydınlatma metni ve kurumun bu belgeyi vermeye yetkili olduğunun kanıtı.

## Kurumun anahtarı neden kurumdan hiç çıkmaz?

Çünkü belgeyi kurumun belgesi yapan o anahtardır. Anahtarı elinde tutan, kurum adına imza atabilir. Bu yüzden anahtar her adımda kurumda kalır.

Kurum iki P-256 anahtar çifti üretir: biri belgeleri, öbürü iptal listesini imzalar. Her biri için yalnız bir sertifika imzalama isteği (CSR) gönderir:

```bash title="Anahtar ve sertifika imzalama isteği üretmek"
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key.pem
openssl req -new -key issuer.key.pem \
  -subj "/CN=Example University/O=Example University/C=TR" -out issuer.csr.pem
```

Canlıda anahtarın yeri bir donanım güvenlik modülü (HSM) ya da bulut anahtar yönetim servisidir (KMS). Kayıt makamı CSR'nin imzasını denetler ve kök sertifika makamından iki yıl (en çok üç yıl) geçerli bir sertifika döner.

## Kurum kayda geçince ne olur?

Kayıt makamı kurumu Türkiye listesine ekler ve listeyi yeniden imzalar. Kayıt 24 saat içinde `trust.tamga.network` adresinde yayındadır. Kayıtta sertifikanın parmak izinden hesaplanan bir `issuer_id`, sınıf, güvence düzeyi, yetkili belge türleri, durum ve durum geçmişi bulunur. Her yayında otomatik olarak bir kayıt sertifikası (ETSI TS 119 475) da üretilir; cüzdanlar kaydı bununla da denetleyebilir. Kaydın neye benzediği ve doğrulayıcının onu nasıl okuduğu: [İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)

Yetki belge türü başına verilir. Sonradan yeni bir tür eklenebilir ya da bir tür sona erdirilebilir. Sona eren yetkinin kaydı silinmez; bitişten önce verilen belgeler doğrulanmaya devam eder.

## Kurum ilk belgesini nasıl verir?

İki yolu var ve belge ikisinde de aynıdır: kurumun adına verilir ve kurumun anahtarıyla imzalanır.

| | Barındırılan servis | Kendi sunucunuz |
|---|---|---|
| Ne çalıştırır | Tamga'nın belge verme servisi ve Kurum Konsolu | `@tamga-network/issuer` paketi (OpenID4VCI) |
| Nasıl bağlanırsınız | konsoldan ya da sisteminizden kapsamlı bir API anahtarıyla | kendi kurulumunuz |
| Kime uygun | hızlı başlamak, masada belge vermek, küçük ekipler | her şeyi kendi bünyesinde tutmak isteyen kurumlar |

[Kurum Konsolu](https://docs.tamga.network/tr/adr/0019-institution-console-and-database) çalışanların işini yaptığı yerdir: passkey ile girerler, kayıtları yönetirler, masada QR kod ve ayrıca verilen bir PIN'le belge verirler, belgeleri iptal eder ya da askıya alırlar, belge verme istatistiklerini görürler. İstatistiklerde hiçbir zaman kişisel veri yoktur. Kurumun sistemleri aynı işleri kuruma bağlı ve kapsamı sınırlı bir API anahtarıyla da yapabilir ([ADR-0016](https://docs.tamga.network/tr/adr/0016-hosted-issuer-api-access)).

Kurum her belgeden önce kişinin kimliğini, o belge türünün istediği düzeyde doğrular. Kişi işe cüzdandan da başlayabilir: kurumu seçer, kurum da kişiyi cüzdanındaki doğrulanmış kimlik belgesiyle eşleştirir.

Diploma dahil her belge, ayrı anahtarlarla 10 kopyalık bir paket olarak verilir. Böylece cüzdan her gösterimde yeni bir kopya kullanır ve iki doğrulayıcı aynı kişiyi tekrar eden bir değerden eşleştiremez ([OpenID4VCI ayrıntılı](/blog/openid4vci-deep-dive)). Belge, sağlayıcısı güven listesinde kayıtlı her cüzdana gidebilir. Kurum, kişileri adına bir cüzdan seçmez.

## Katıldıktan sonra ne değişebilir?

![Bir kurum kaydının dört durumu ve her birinin anlamı](/blog/join-as-an-institution/tr/fig-durumlar.png)

Hepsinde geçerli bir kural var: doğrulayıcı bir belgeyi kurumun bugünkü durumuna göre değil, belgenin verildiği gündeki durumuna göre değerlendirir. Belge vermeyi bırakan bir kurum, mezunlarının diplomalarını da beraberinde götürmez. Anahtar ele geçirilirse kayıt bir tarihle iptal edilir ve yalnız o tarihten sonraki belgeler geçmez olur.

## Gerçek bir katılım projesi nasıl yürür?

[Ağa katıl](/join) sayfası altı adım sayar: kapsamı belirlemek (hangi belgeler, hangi pilot grup), belge türünü seçmek ya da birlikte tasarlamak, sözleşmeleri imzalamak ve aydınlatma metnini güncellemek, kayıt, entegrasyon ve sandbox'ta uçtan uca test, sonra önce küçük bir grupla canlıya geçmek. Başlamak için kurumunuzun adını ve belge mi vermek, doğrulamak mı yoksa ikisini birden mi istediğinizi partners@tamga.network adresine yazın.

## Sık sorulan sorular

### Kurum öğrenci ya da üye veritabanını teslim etmek zorunda mı?

Hayır. Ağ kişi kaydı tutmaz. Bilgiler belge verildiği anda kurumun kendi sisteminden okunur ve doğrudan kişinin telefonuna gider.

### Kurumun kendi sunucusu olması gerekir mi?

Hayır. Başlamak için barındırılan belge verme servisi ve Kurum Konsolu yeterli. Belge vermeyi kendisi işletmek isteyen kurumlar açık kaynak `@tamga-network/issuer` paketini kullanabilir.

### Sandbox'taki test kurumu gerçek ağa taşınabilir mi?

Hayır. Sandbox kurumları, kayıtları ve sertifikaları her gece silinir; sandbox kökü gerçek ağda tanınmaz. Gerçek ağ kendi başvurusunu ve kendi anahtarlarını ister.

### Kurumun belgelerini hangi cüzdanlar alabilir?

Sağlayıcısı güven listesinde kayıtlı olan ve ağın cüzdan kurallarına uyan her cüzdan. Tamga Wallet ağdaki cüzdanlardan biridir, tek cüzdan değildir.

### Kurumun imza anahtarı çalınırsa ne olur?

Kayıt bir `invalidates_from` tarihiyle iptal edilir. O andan sonra imzalanan belgeler doğrulamadan geçmez; öncekiler etkilenmez. Kurum ardından yeni bir sertifika kaydettirir.

## Kaynaklar

- [(AB) 2025/848 sayılı Uygulama Tüzüğü: cüzdana güvenen tarafların kaydı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj)
- [ETSI TS 119 475 V1.1.1: güvenen taraf öznitelikleri ve kayıt sertifikaları](https://www.etsi.org/deliver/etsi_ts/119400_119499/119475/01.01.01_60/ts_119475v010101p.pdf)
- [Tamga Network: Kurum olarak ağa katılım](https://docs.tamga.network/tr/guides/join-as-institution) · [Sandbox](https://docs.tamga.network/tr/guides/sandbox) · [Belge verme](https://docs.tamga.network/tr/guides/issue-credentials)
- [ADR-0024: katılımcı kayıt bilgileri](https://docs.tamga.network/tr/adr/0024-participant-registration-data) · [ADR-0041: sandbox test kurumları](https://docs.tamga.network/tr/adr/0041-sandbox-institution-test-accounts)
- [Tamga Kural Kitabı (katılım kuralları)](https://arf.tamga.network/tr/rulebook) · [Ağa katıl](/join) · [Belge veren olarak katılım](/learn/join-as-issuer)

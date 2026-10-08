---
title: "İmzalı güven listesi nasıl çalışır: kayıttan doğrulamaya"
slug: how-trust-lists-work
description: Tamga Network'ün imzalı güven listeleri: iki katman, imza, yayın düzeni, tazelik, çapa günlüğü ve doğrulayıcının adım adım denetledikleri.
date: 2026-10-08
lang: tr
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Kaynak: SPEC-TRUST-0001 1.0.0 (§1 ilkeler: JWS ES256 x5c, .json yalnız insan için, sürüm + previous_version_hash, next_update ≤ 90 gün, değişiklik 24 saatte, çapa saatlik; §2 dosya düzeni; §3 lotl; §4 tl alanları, kurum kaydı, durum sözlüğü, kayıt silinmez; §5 çapa günlüğü, 500 satırda kontrol noktası; §6 yükleyici sırası, environment, YES/NO/UNKNOWN; §8 TL1–TL12; güvenlik notları: tek işletmeci imzası, açık günlük, CHANGELOG, üç aylık şeffaflık raporu, denetim; açık konular: ETSI XML, ≥2 dönen anahtar + KMS pilottan önce). SPEC-API-0001 §1 (A3b, C1/C2 iat ile, C2 atlanamaz, C3, D5). Rehberler join-as-institution (kayıt makamı, 24 saat, WRPRC), sandbox (environment: sandbox). Canlı dosyalar 2026-10-08: list_format_version 1.0, operator.status provisional, next_update issued_at + 90 gün, tek çapa imza anahtarı. Dış: AB LOTL XML, 2015/1505 sayılı Karar, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List taslağı. -->

İmzalı güven listesi, liste işletmecisinin imzaladığı ve hangi kurumun hangi belge türünü verebileceğini, hangi doğrulayıcıların kayıtlı olduğunu, hangi cüzdan sağlayıcıların tanındığını söyleyen bir dosyadır. Tamga Network bunu iki katmanda yayımlar: listelerin listesi (`lotl.jws`) ve Türkiye için ülke listesi (`tl-tr.jws`). Doğrulayıcı baştan tek bir kök parmak izine güvenir; listelerin imzasını, sürüm zincirini ve tazeliğini denetler, sonra her belge için tek bir soru sorar: bu kurum, belgeyi imzaladığı anda kayıtlı ve bu belge türü için yetkili miydi?

## Listenin iki katmanı ne?

Model AB'nin modeli. Avrupa Komisyonu üye devletlerin güven listelerinin bir listesini yayımlar ([AB LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)); her devlet de [(AB) 2015/1505 sayılı Uygulama Kararı](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) ve ETSI TS 119 612'de tanımlanan biçimde kendi ulusal listesini yayımlar. Tamga aynı yapıyı izler:

| Liste | İçinde ne var | Adres |
|---|---|---|
| Listelerin listesi (LOTL) | ülke listelerinin adresleri ve imza anahtarları, cüzdan sağlayıcılar, şema kataloğu, kabul edilen sıfır bilgi devreleri | `trust.tamga.network/lotl.jws` |
| Ülke listesi | o ülkenin kök sertifikaları, kurumları ve doğrulayıcıları | `trust.tamga.network/tl-tr.jws` |

![Sabitlenmiş kök parmak izinden LOTL ve ülke listesi üzerinden kurum kaydına ve belgeye](/blog/how-trust-lists-work/tr/fig-zincir.png)

Zincir, doğrulayıcının zaten elinde olan bir şeyle başlar: LOTL'yi imzalayan sertifikanın yapılandırmaya gömülü SHA-256 parmak izi. Parmak izi [tamga.network/trust-anchor](https://tamga.network/trust-anchor) adresinde yayımlanır. Liste sunucusunun kendisine güvenilmez. Bir listenin kabul edilmesi için doğru adresten indirilmiş olması yetmez; imzasının o parmak iziyle eşleşmesi gerekir.

LOTL de her ülke listesinin imzacısını gösterir. Bugün etkin olan tek liste Türkiye listesi; onu Tamga ulusal makam adına geçici olarak işletiyor. Veri yapılarında başka devletler için yer bugünden ayrılmış durumda.

## Bir kurumun kaydında ne var?

> **Not:** Sadeleştirilmiş örnek. Kurum uydurmadır, tanımlayıcılar ve parmak izleri kısaltıldı, bazı alanlar çıkarıldı. Gerçek biçim [güven listesi şartnamesinde](https://docs.tamga.network/tr/specifications/trust-lists).

```json title="Sadeleştirilmiş örnek: tl-tr içinde bir kurum kaydı"
{
  "issuer_id": "0x5be1…",
  "slug": "example-uni",
  "legal_name": "Example University",
  "category": "EDUCATION",
  "class": "EAA",
  "assurance": "I2",
  "cert_fingerprint_sha256": "a41f…",
  "status": "ACTIVE",
  "valid_from": "2026-10-01T00:00:00Z",
  "valid_until": "2028-10-01T00:00:00Z",
  "status_history": [
    { "status": "ACTIVE", "since": "2026-10-01T00:00:00Z", "reason": "initial-registration" }
  ],
  "schema_authorizations": [
    {
      "vct": "urn:tamga:edu:DiplomaCredential:1",
      "allowed": true,
      "valid_from": "2026-10-01T00:00:00Z",
      "valid_until": null
    }
  ],
  "status_list_base": "https://status.tamga.network/"
}
```

Yükün çoğunu birkaç alan taşır:

- `issuer_id` kurumun sertifikasının parmak izinden hesaplanır; seçilemez, kopyalanamaz.
- `class` kurumun ne tür belge verdiğini söyler: kamu kurumu belgesi (`PUB`), nitelikli belge (`QUALIFIED`) ya da sıradan belge (`EAA`). `assurance` kurumun güvence düzeyidir, `I1` ile `I3` arası.
- `schema_authorizations` kurumun verebileceği belge türlerini, her birinin kendi zaman aralığıyla sayar. Geçerli kaydı olan bir bilet satıcısı yine de doğrulamadan geçecek bir diploma veremez.
- `status_history` yalnız eklenir, hiçbir zaman yeniden yazılmaz.

Kayıtta olmayanlar da bilinçli: öğrenci adı yok, belge özeti yok, sayı yok. Kural açık: hiçbir listede, çapa günlüğünde ya da değişiklik kaydında kişisel veri bulunmaz (TL11).

## Bir kurum listeye nasıl girer?

Kurum kayıt bilgileri ve bir sertifika imzalama isteğiyle başvurur. Kayıt makamı başvuruyu denetler ve eksik alanların hepsini bir kerede bildirir; kök sertifika makamı kurumun sertifikasını imzalar; kurum listeye eklenir ve liste yeniden imzalanır. Değişiklik 24 saat içinde yayında olur. Kurumun tarafından adımlar [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution) yazısında.

Yayıncı her yayında, her doğrulayıcı kullanımı ve her kurum için bir kayıt sertifikası (ETSI TS 119 475) da üretir ve `trust.tamga.network/wrprc/` altına koyar. İçeriği yalnız imzalı listeden gelir; cüzdan bir doğrulayıcının kaydını bununla da denetleyebilir.

## Liste nasıl imzalanır ve yayımlanır?

Her liste ES256 ile imzalanmış, başlığında (`x5c`) işletmeci sertifikası bulunan kompakt bir JWS'tir. Yanında insanların okuması için bir `.json` kopyası durur; yazılım yalnız `.jws`'i kullanır.

Geçmişi dürüst tutan üç kural var:

1. **Sürüm yalnız artar.** Eski bir sürüm yeniymiş gibi yeniden sunulamaz.
2. **Her sürüm bir öncekinin özetini taşır** (`previous_version_hash`). Sürümler bir zincir oluşturur; bir boşluk ya da yeniden yazım hemen görünür.
3. **Hiçbir şey silinmez.** Ayrılan kurum listede yeni bir durumla kalır; eski sürümler `archive/` altında durur.

![Hangi dosyanın ne zaman yayımlandığı ve hangi kurala bağlı olduğu](/blog/how-trust-lists-work/tr/fig-yayin.png)

Listeler hiçbir şey değişmese de en geç 90 günde bir yeniden imzalanır. Böylece okuyan kişi sessiz bir listeyi terk edilmiş bir listeden ayırabilir. Aynı yerdeki herkese açık `CHANGELOG.md` her yayını kaydeder.

## Çapa günlüğü ne işe yarar?

Bazı şeyler her seferinde bütün listeyi yeniden imzalamak için fazla sık değişir; başta kurumların yayımladığı iptal listeleri. Bunlar `anchors.jsonl` dosyasına, yani çapa günlüğüne yazılır: her olay için imzalı bir satır, her satır bir öncekine özetiyle bağlı.

Bir satır örneğin bir kurumun iptal listesinin N. sürümünü şu içerik özetiyle yayımladığını kaydeder. Doğrulayıcı sonra o iptal listesini okuduğunda özeti çapayla karşılaştırır. Özet tutmazsa ya da sürüm geriye gittiyse belge geçmez; doğrulayıcının elindeki kopya yalnızca en yeni çapadan eskiyse sonuç, kopya yenilenene kadar "şu an doğrulanamadı" olur. Doğrulayıcı iptal listesinin gerçekten kurumdan geldiğini ve eski bir sürümle değiştirilmediğini böyle bilir.

Günlüğe saatte en az bir satır yazılır; başka bir şey olmadıysa bir kalp atışı satırı. Günlük 500 satırı geçince işletmeci satırları arşive taşır ve yeni günlüğü, arşivin son satırına ve arşiv dosyasının özetine bağlanan imzalı bir kontrol noktasıyla başlatır. Hiçbir satır silinmez; bütün geçmiş arşivlerden yeniden kurulabilir.

## Bir liste ne kadar taze olmalı?

Her liste bir `next_update` tarihi taşır. Servisler listeleri düzenli aralıklarla yeniden yükler; doğrulayıcılar iptal listelerini önceden indirip saklar. Kontrol anında hiçbir şey indirilmez. Kurumun, belgelerinin nerede gösterildiğini hiç öğrenememesinin nedeni de bu ([İzlemeden iptal](/blog/status-list-privacy)).

Bir liste alınamıyorsa ya da `next_update` geçmişse doğrulayıcı tahmin yürütmez. Sonuç "şu an doğrulanamadı"dır (`INDETERMINATE`); ne kabul ne ret (TL5). Bir sunucuya ulaşılamadı diye bir diploma sahte ilan edilmez.

## Doğrulayıcı adım adım neyi denetler?

Denetimler iki gruptur. Önce listeler yüklenirken:

![Bir güven listesi yüklenirken denetlenenler ve tutmazsa ne olduğu](/blog/how-trust-lists-work/tr/fig-denetim.png)

Ağ denetimi test için önemli: sandbox'ın listelerinde `"environment": "sandbox"` yazar ve gerçek ağa göre kurulmuş bir doğrulayıcı bu listede durur. Sandbox'ta alınmış bir belge gerçek bir doğrulayıcıdan geçemez.

Sonra her belge için doğrulama hattının güven katmanı ([doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)) şunları sorar:

| Adım | Soru |
|---|---|
| A3b | Bu hangi kurum? Belgeyi imzalayan sertifikadan çıkarılır; belgenin kendisi hakkında söylediğine bakılmaz |
| C1 | Kurum, belge verildiği anda kabul edilebilir miydi? |
| C2 | O anda bu belge türü için yetkili miydi? Bu adım kapatılamaz |
| C3 | Doğrulayıcının ülkesi kurumun ülkesini tanıyor mu? |
| D5 | İptal listesi günlükteki çapasıyla eşleşiyor mu? |

C1 ve C2 bugüne değil, belgenin veriliş zamanına bakar. Bir üniversitenin kaydı sonradan emekliye ayrılırsa, etkin olduğu sırada verdiği diplomalar geçerli kalır. Anahtarı ele geçirildiyse kayıt bir `invalidates_from` tarihiyle iptal edilir ve yalnız o tarihten sonraki belgeler düşer. Doğrulama geçmişe bakan bir iştir: belirleyici olan, veriliş günündeki listedir.

Kod liste dosyalarını hiçbir zaman kendisi yorumlamaz. `@tamga-network/trust` paketi tek bir arayüz sunar, `TrustSource`; yanıtı `YES`, `NO` ya da `UNKNOWN`'dır ve `UNKNOWN` sonuçta `INDETERMINATE` olur. Kullanımı: [Güven listelerini okuma](https://docs.tamga.network/tr/guides/read-trust-lists).

## Bugünkü dürüst sınırlar neler?

- **Tek imzacı.** Çapa bugün tek bir işletmecinin imzasına dayanıyor. İşletmeci ve bir kurum birlikte hareket ederse farklı okuyuculara farklı sürümler gösterebilirler. Herkese açık günlük, değişiklik kaydı, üç ayda bir şeffaflık raporu ve bağımsız denetim bunu caydırır; imkânsız kılmaz. Bu boşluğu en az iki bağımsız işletmeci gerektiren ortak defter kapatır ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).
- **Şimdilik tek anahtar.** Kurallar en az iki dönen imza sertifikası ve 30 gün önceden duyurulan anahtar değişimi ister. Canlı listeler bir anahtar kullanıyor; ikinci anahtar ve anahtar yönetim servisi pilottan önceye planlı.
- **Henüz ETSI XML yok.** Alanlar ETSI TS 119 612'ye, durumlar ETSI karşılıklarına eşlenir ama XML dışa aktarımı hâlâ açık konular listesinde. Cüzdan sağlayıcıları için ETSI TS 119 602 görünümleri etkinleştirildiğinde yayımlanabilir.

## Sık sorulan sorular

### Güven listesini kendim okuyabilir miyim?

Evet. `trust.tamga.network/tl-tr.json` ve `lotl.json` okunabilir kopyalardır. Yazılım ise imzalı `.jws` dosyalarını, imzayı, zinciri ve tazeliği denetleyen `TrustSource` üzerinden yüklemeli.

### Güven listesinde kişisel veri var mı?

Hayır. Kurum ve doğrulayıcı adları, sertifika parmak izleri, durumlar, tarihler, adresler ve belge türleri var. Kişiler, belge içerikleri ve belge özetleri yok.

### Bir kurum ağdan ayrılınca ne olur?

Kaydı silinmez. Durumu değişir (örneğin `RETIRED` ya da `REVOKED`) ve değişiklik geçmişine eklenir. Böylece daha önce verilmiş belgeler, veriliş günündeki listeye göre değerlendirilmeye devam eder.

### Liste ne sıklıkla güncelleniyor?

Değişiklik 24 saat içinde yayımlanır; her liste en geç 90 günde bir yeniden imzalanır. Çapa günlüğüne saatte en az bir satır eklenir.

### Bu bir AB güven listesiyle aynı şey mi?

Aynı iki katmanlı modeli izler ve alanları ETSI TS 119 612'ye eşlenir. Bir AB listesi değildir: onu bir AB kurumu yayımlamaz ve Tamga bunun için AB statüsü iddia etmez.

## Kaynaklar

- [AB listelerin listesi (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [(AB) 2015/1505 sayılı Komisyon Uygulama Kararı: güven listesi biçimleri](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Trusted Lists](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth çalışma grubu taslağı)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: güven listesi şartnamesi](https://docs.tamga.network/tr/specifications/trust-lists) · [Güven listeleri ve federasyon](https://docs.tamga.network/tr/concepts/trust-lists) · [Güven listelerini okuma](https://docs.tamga.network/tr/guides/read-trust-lists)
- [Güven listeleri](/learn/trust-lists) · [Federasyon](/learn/federation)

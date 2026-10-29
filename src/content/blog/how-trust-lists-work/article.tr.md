---
title: "İmzalı güven listesi nasıl çalışır: kayıttan doğrulamaya"
slug: how-trust-lists-work
description: Tamga Network'ün imzalı güven listelerini anlatıyoruz; iki katmanı, imzayı, yayın düzenini, tazeliği, çapa günlüğünü ve doğrulayıcının adım adım neleri denetlediğini.
date: 2026-10-08
lang: tr
category: network
draft: false
related: what-is-a-trust-network, join-as-an-institution, add-verification-to-your-site, why-no-blockchain-yet
---

<!-- Kaynak: SPEC-TRUST-0001 1.0.0 (§1 ilkeler: JWS ES256 x5c, .json yalnız insan için, sürüm + previous_version_hash, next_update ≤ 90 gün, değişiklik 24 saatte, çapa saatlik; §2 dosya düzeni; §3 lotl; §4 tl alanları, kurum kaydı, durum sözlüğü, kayıt silinmez; §5 çapa günlüğü, 500 satırda kontrol noktası; §6 yükleyici sırası, environment, YES/NO/UNKNOWN; §8 TL1–TL12; güvenlik notları: tek işletmeci imzası, açık günlük, CHANGELOG, üç aylık şeffaflık raporu, denetim; açık konular: ETSI XML, ≥2 dönen anahtar + KMS pilottan önce). SPEC-API-0001 §1 (A3b, C1/C2 iat ile, C2 atlanamaz, C3, D5). Rehberler join-as-institution (kayıt makamı, 24 saat, WRPRC), sandbox (environment: sandbox). Canlı dosyalar 2026-10-08 ve 2026-10-23 (anchor_signing_keys: tek ACTIVE kayıt): list_format_version 1.0, operator.status provisional, next_update issued_at + 90 gün, tek çapa imza anahtarı. Dış: AB LOTL XML, 2015/1505 sayılı Karar, ETSI TS 119 612 v2.3.1, ETSI TS 119 602 v1.1.1, IETF Token Status List taslağı. -->

İmzalı güven listesi, liste işletmecisinin imzaladığı bir dosyadır. Hangi kurumun hangi belge türünü verebileceği, hangi doğrulayıcıların kayıtlı olduğu ve hangi cüzdan sağlayıcılarının tanındığı bu dosyada yazar. Tamga Network bu listeleri iki katmanda yayımlıyor. Üstte listelerin listesi (`lotl.jws`), altta da Türkiye için ülke listesi (`tl-tr.jws`) bulunuyor. Doğrulayıcı en başta yalnız tek bir kök parmak izine güvenir. Listelerin imzasını, sürüm zincirini ve tazeliğini denetledikten sonra her belge için tek bir soru sorar: Bu kurum, belgeyi imzaladığı anda kayıtlı mıydı ve bu belge türünü vermeye yetkili miydi?

## Listenin iki katmanı ne?

Bu model AB'den geliyor. Avrupa Komisyonu üye devletlerin güven listelerini gösteren bir liste yayımlıyor ([AB LOTL](https://ec.europa.eu/tools/lotl/eu-lotl.xml)). Her devlet de kendi ulusal listesini [(AB) 2015/1505 sayılı Uygulama Kararı](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj) ve ETSI TS 119 612'de tanımlanan biçimde yayımlıyor. Tamga da aynı yapıyı kullanıyor:

| Liste | İçinde ne var | Adres |
|---|---|---|
| Listelerin listesi (LOTL) | ülke listelerinin adresleri ve imza anahtarları, cüzdan sağlayıcıları, şema kataloğu, kabul edilen sıfır bilgi devreleri | `trust.tamga.network/lotl.jws` |
| Ülke listesi | o ülkenin kök sertifikaları, kurumları ve doğrulayıcıları | `trust.tamga.network/tl-tr.jws` |

![Sabitlenmiş kök parmak izinden LOTL ve ülke listesi üzerinden kurum kaydına ve belgeye](/blog/how-trust-lists-work/tr/fig-zincir.png)

Zincir, doğrulayıcının zaten elinde olan bir bilgiyle başlar. Bu bilgi, LOTL'yi imzalayan sertifikanın SHA-256 parmak izidir ve doğrulayıcının yapılandırmasına gömülüdür. Parmak izi [tamga.network/trust-anchor](https://tamga.network/trust-anchor) adresinde de yayımlanıyor. Liste sunucusunun kendisine ise güvenilmez. Bir listenin kabul edilmesi için doğru adresten indirilmiş olması yetmez, imzasının da bu parmak iziyle eşleşmesi gerekir.

LOTL de her ülke listesini kimin imzaladığını gösterir. Bugün etkin olan tek liste Türkiye listesi ve Tamga bu listeyi ulusal makam adına geçici olarak işletiyor. Veri yapılarında başka devletler için de bugünden yer ayrılmış durumda.

## Bir kurumun kaydında ne var?

> **Not:** Aşağıdaki örnek sadeleştirildi. Kurum gerçek değil, tanımlayıcılar ve parmak izleri kısaltıldı ve bazı alanlar çıkarıldı. Gerçek biçimi [güven listesi şartnamesinde](https://docs.tamga.network/tr/specifications/trust-lists) bulabilirsiniz.

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

Bu kayıtta asıl işi birkaç alan görüyor:

- `issuer_id`, kurumun sertifikasının parmak izinden hesaplanır. Bu yüzden kurum bu değeri kendisi seçemez, başkası da onu kopyalayamaz.
- `class`, kurumun ne tür belge verdiğini gösterir. Kamu kurumu belgesi için `PUB`, nitelikli belge için `QUALIFIED`, sıradan öznitelik belgesi için `EAA` kullanılır. `assurance` ise kurumun `I1` ile `I3` arasındaki güvence düzeyidir.
- `schema_authorizations`, kurumun verebileceği belge türlerini her birinin kendi zaman aralığıyla birlikte listeler. Geçerli bir kaydı olan bir bilet satıcısı bile doğrulamadan geçecek bir diploma veremez.
- `status_history` alanına yalnız yeni satır eklenir ve eski satırlar hiçbir zaman değiştirilmez.

Kayıtta bulunmayan bilgiler de bilinçli olarak dışarıda bırakıldı. Kayıtta öğrenci adı, belge özeti ya da belge sayısı yer almıyor. Kurala göre hiçbir listede, çapa günlüğünde ya da değişiklik kaydında kişisel veri bulunamaz (TL11).

## Bir kurum listeye nasıl girer?

Kurum, kayıt bilgilerini ve bir sertifika imzalama isteğini göndererek başvurur. Kayıt makamı başvuruyu inceler ve eksik alanların hepsini tek seferde bildirir. Ardından kök sertifika makamı kurumun sertifikasını imzalar, kurum listeye eklenir ve liste yeniden imzalanır. Değişiklik 24 saat içinde yayına girer. Bu adımları kurumun gözünden [Bir kurum Tamga Network'e nasıl katılır?](/blog/join-as-an-institution) yazısında anlattık.

Yayıncı her yayında, her doğrulayıcı kullanımı ve her kurum için bir kayıt sertifikası (ETSI TS 119 475) da üretir ve bunları `trust.tamga.network/wrprc/` altına koyar. Bu sertifikaların içeriği yalnız imzalı listeden geldiği için cüzdan bir doğrulayıcının kaydını bu sertifikayla da denetleyebilir. 29 Ekim 2026'dan beri her sertifika kendi politikasını da adlandırır (kendi tanımlayıcısıyla [kayıt sertifikası politikası](https://arf.tamga.network/tr/policies/registration-certificate)) ve saatte bir yeniden imzalanan, bir bitlik bir durum listesine işaret eder: `trust.tamga.network/status/wrprc/1`. Cüzdan iptal edilmiş bir sertifikayı reddeder, durum denetlenemiyorsa kişiyi uyarır.

## Liste nasıl imzalanır ve yayımlanır?

Her liste, ES256 ile imzalanmış kompakt bir JWS'tir ve başlığındaki `x5c` alanında işletmecinin sertifikası bulunur. Listenin yanında, insanların okuyabilmesi için bir `.json` kopyası da durur. Yazılım ise yalnız `.jws` dosyasını kullanır.

Listenin geçmişini dürüst tutan üç kural var:

1. **Sürüm numarası yalnız artar.** Eski bir sürüm, yeniymiş gibi bir daha sunulamaz.
2. **Her sürüm bir öncekinin özetini taşır** (`previous_version_hash`). Böylece sürümler bir zincir oluşturur ve aradaki bir boşluk ya da sonradan yapılan bir değişiklik hemen fark edilir.
3. **Hiçbir şey silinmez.** Ağdan ayrılan bir kurum listede yeni bir durumla kalmaya devam eder, eski sürümler de `archive/` altında saklanır.

![Hangi dosyanın ne zaman yayımlandığı ve hangi kurala bağlı olduğu](/blog/how-trust-lists-work/tr/fig-yayin.png)

Listeler hiçbir şey değişmese bile en geç 90 günde bir yeniden imzalanır. Böylece okuyan kişi, uzun süredir değişmemiş bir listeyi terk edilmiş bir listeden ayırt edebilir. Aynı yerde duran herkese açık `CHANGELOG.md` dosyası da her yayını kayda geçirir.

## Çapa günlüğü ne işe yarar?

Bazı bilgiler, her değişiklikte bütün listeyi yeniden imzalamayı zorlaştıracak kadar sık değişir. Bunların başında kurumların yayımladığı iptal listeleri geliyor. Bu bilgiler çapa günlüğüne, yani `anchors.jsonl` dosyasına yazılır. Günlükte her olay için imzalı bir satır bulunur ve her satır, bir önceki satıra onun özetiyle bağlanır.

Bir satır, örneğin, bir kurumun iptal listesinin N. sürümünü belli bir içerik özetiyle yayımladığını kaydeder. Doğrulayıcı daha sonra bu iptal listesini okuduğunda listenin özetini çapadaki özetle karşılaştırır. Özet uyuşmazsa ya da sürüm geriye gitmişse belge doğrulamadan geçmez. Doğrulayıcının elindeki kopya yalnız en yeni çapadan daha eskiyse sonuç, kopya yenilenene kadar "şu an doğrulanamadı" olur. Doğrulayıcı, iptal listesinin gerçekten kurumdan geldiğini ve eski bir sürümle değiştirilmediğini bu yolla anlar.

Günlüğe saatte en az bir satır yazılır ve o saatte başka bir olay olmadıysa bu satır bir yaşam belirtisi (heartbeat) satırıdır. Günlük 500 satırı geçtiğinde işletmeci satırları arşive taşır ve yeni günlüğü imzalı bir kontrol noktasıyla başlatır. Bu kontrol noktası arşivin son satırına ve arşiv dosyasının özetine bağlanır. Hiçbir satır silinmediği için bütün geçmiş arşivlerden yeniden kurulabilir.

## Bir liste ne kadar taze olmalı?

Her liste bir `next_update` tarihi taşır. Servisler listeleri düzenli aralıklarla yeniden yükler, doğrulayıcılar da iptal listelerini önceden indirip önbellekte tutar. Kontrol anında hiçbir şey indirilmez ve kurumun, belgelerinin nerede gösterildiğini hiçbir zaman öğrenememesinin nedeni de bu ([İzlemeden iptal](/blog/status-list-privacy)).

Bir liste alınamazsa ya da `next_update` tarihi geçmişse doğrulayıcı tahmin yürütmez. Bu durumda sonuç "şu an doğrulanamadı" (`INDETERMINATE`) olur ve belge ne kabul ne de reddedilmiş sayılır (TL5). Bir sunucuya ulaşılamadı diye hiçbir diploma sahte ilan edilmez.

## Doğrulayıcı adım adım neyi denetler?

Denetimler iki gruba ayrılıyor. İlk grup, listeler yüklenirken yapılır:

![Bir güven listesi yüklenirken denetlenenler ve tutmazsa ne olduğu](/blog/how-trust-lists-work/tr/fig-denetim.png)

Ağ denetimi özellikle testler için önemli. Sandbox'ın listelerinde `"environment": "sandbox"` yazar ve gerçek ağ için kurulmuş bir doğrulayıcı bu listeyi görünce durur. Bu yüzden sandbox'ta alınmış bir belge gerçek bir doğrulayıcıdan geçemez.

İkinci grup her belge için çalışır. Doğrulama hattının güven katmanı ([doğrulama API'si](https://docs.tamga.network/tr/specifications/verification-api)) şu soruları sorar:

| Adım | Soru |
|---|---|
| A3b | Bu hangi kurum? Kurum, belgeyi imzalayan sertifikadan belirlenir; belgenin kendisi hakkında söylediklerine bakılmaz |
| C1 | Kurum, belgenin verildiği anda kabul edilebilir durumda mıydı? |
| C2 | Kurum o anda bu belge türünü vermeye yetkili miydi? Bu adım kapatılamaz |
| C3 | Doğrulayıcının ülkesi, kurumun ülkesini tanıyor mu? |
| D5 | İptal listesi günlükteki çapasıyla eşleşiyor mu? |

C1 ve C2 adımları bugünün durumuna bakmaz, belgenin verildiği ana bakar. Bir üniversitenin kaydı sonradan emekliye ayrılırsa, etkin olduğu dönemde verdiği diplomalar geçerli kalır. Kurumun anahtarı ele geçirildiyse kayıt bir `invalidates_from` tarihiyle iptal edilir ve yalnız o tarihten sonra verilen belgeler doğrulamadan geçemez. Doğrulama geçmişe bakar ve belirleyici olan, belgenin verildiği gündeki listedir.

Kod, liste dosyalarını hiçbir zaman kendi başına yorumlamaz. `@tamga-network/trust` paketi tek bir arayüz sunar. `TrustSource` adlı bu arayüz `YES`, `NO` ya da `UNKNOWN` yanıtını verir ve `UNKNOWN` sonuçta `INDETERMINATE` olarak görünür. Nasıl kullanılacağını [Güven listelerini okuma](https://docs.tamga.network/tr/guides/read-trust-lists) rehberinde anlattık.

## Bugünkü dürüst sınırlar neler?

- **Tek imzacı.** Güven çapası bugün tek bir işletmecinin imzasına dayanıyor. İşletmeci ile bir kurum birlikte hareket ederse farklı okuyuculara listenin farklı sürümlerini gösterebilirler. Herkese açık günlük, değişiklik kaydı, üç ayda bir yayımlanan şeffaflık raporu ve bağımsız denetim bunu caydırıyor, ama tamamen imkânsız kılmıyor. Bu boşluğu en az iki bağımsız işletmeci gerektiren ortak defter kapatacak ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).
- **Şimdilik tek anahtar.** Kurallar en az iki dönüşümlü imza sertifikası ve 30 gün önceden duyurulan anahtar değişimi istiyor. Canlı listeler ise şu an bir anahtar kullanıyor (2026-10-23'te bakıldı). Kurallar, ikinci anahtarın eklenmesini ve imza anahtarının bir anahtar yönetim servisinde tutulmasını pilottan önce şart koşuyor.
- **ETSI XML: sandbox'ta canlı, gerçek ağda sonra.** Sandbox ülke listesini bugün ETSI TS 119 612 XML görünümüyle de yayımlıyor; görünüm aynı imzalı listeden, aynı sürümle üretilip XAdES-B-B ile imzalanıyor ([trust.sandbox.tamga.network/tl-tr.xml](https://trust.sandbox.tamga.network/tl-tr.xml); adreslerin anlamı [ETSI güven listesi sayfasında](https://docs.tamga.network/tr/concepts/etsi-trusted-list)). Gerçek ağın XML listesi, listeyi işletecek vakıf kurulunca açılacak; böylece listede kalıcı işletmeci ve onun adresi yer alacak. Liste AB anlamında "nitelikli" ya da "bildirilmiş" iddiası taşımıyor. Cüzdan sağlayıcıları için ETSI TS 119 602 görünümleri de etkinleştirildiğinde yayımlanabilir.

## Sık sorulan sorular

### Güven listesini kendim okuyabilir miyim?

Evet. `trust.tamga.network/tl-tr.json` ve `lotl.json` dosyaları okunabilir kopyalardır. Yazılımın ise imzalı `.jws` dosyalarını `TrustSource` üzerinden yüklemesi gerekir, çünkü imzayı, zinciri ve tazeliği bu arayüz denetler.

### Güven listesinde kişisel veri var mı?

Hayır. Listede kurum ve doğrulayıcı adları, sertifika parmak izleri, durumlar, tarihler, adresler ve belge türleri bulunur. Kişiler, belge içerikleri ve belge özetleri listede yer almaz.

### Bir kurum ağdan ayrılınca ne olur?

Kurumun kaydı silinmez. Durumu değişir (örneğin `RETIRED` ya da `REVOKED` olur) ve bu değişiklik kaydın geçmişine eklenir. Böylece daha önce verilmiş belgeler, verildikleri gündeki listeye göre değerlendirilmeye devam eder.

### Liste ne sıklıkla güncelleniyor?

Bir değişiklik 24 saat içinde yayımlanır ve her liste en geç 90 günde bir yeniden imzalanır. Çapa günlüğüne de saatte en az bir satır eklenir.

### Bu bir AB güven listesiyle aynı şey mi?

Liste aynı iki katmanlı modeli izliyor ve alanları ETSI TS 119 612'ye eşleniyor. Yine de bir AB listesi sayılmaz, çünkü onu bir AB kurumu yayımlamıyor ve Tamga liste için AB statüsü iddia etmiyor.

## Kaynaklar

- [AB listelerin listesi (LOTL, XML)](https://ec.europa.eu/tools/lotl/eu-lotl.xml)
- [(AB) 2015/1505 sayılı Komisyon Uygulama Kararı: güven listesi biçimleri](https://eur-lex.europa.eu/eli/dec_impl/2015/1505/oj)
- [ETSI TS 119 612 V2.3.1: Trusted Lists](https://www.etsi.org/deliver/etsi_ts/119600_119699/119612/02.03.01_60/ts_119612v020301p.pdf)
- [ETSI TS 119 602 V1.1.1: Lists of trusted entities](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [IETF Token Status List (OAuth çalışma grubu taslağı)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [Tamga Network: güven listesi şartnamesi](https://docs.tamga.network/tr/specifications/trust-lists) · [Güven listeleri ve federasyon](https://docs.tamga.network/tr/concepts/trust-lists) · [Güven listelerini okuma](https://docs.tamga.network/tr/guides/read-trust-lists)
- [Güven listeleri](/learn/trust-lists) · [Federasyon](/learn/federation)

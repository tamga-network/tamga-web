---
title: "HAIP ve Token Status List: izlenmeden yüksek güvence"
slug: haip-and-token-status-list
description: HAIP 1.0 neyi sabitler, Tamga onu nasıl uygular; Token Status List belgeyi, kuruma nerede kullanıldığını söylemeden nasıl iptal eder.
date: 2026-10-08
lang: tr
category: standards
draft: false
related: status-list-privacy, openid4vp-dcql-deep-dive, openid4vci-deep-dive, sd-jwt-vc-deep-dive, why-no-blockchain-yet
---

<!-- Kaynak: HAIP 1.0 Final (24 Aralık 2025) §3–8; ADR-0034 (K1–K5, CI1–CI6, yenileme sırası); draft-ietf-oauth-status-list-21 (21 Haziran 2026; datatracker'a göre RFC Editor kuyruğunda, 2026-10-08; başlık "Token Status List (TSL)") §4, §7, §12; SPEC-CRED-0003 v1.0.0 (taslak 20'ye atıf yapıyor); SPEC-API-0001 D1–D6. Sıkıştırma rakamları bu yazı için zlib düzey 9 ile hesaplandı (@tamga-network/sd-jwt ile aynı çağrı). -->

**HAIP** (OpenID4VC High Assurance Interoperability Profile) 1.0, OpenID4VCI, OpenID4VP, SD-JWT VC ve ISO mdoc'taki birçok seçeneği alır ve yüksek güvence gereken kullanım için tek bir küme sabitler: her tarafın desteklemesi gereken biçimler, algoritmalar, istemci kimlikleri, şifreleme ve doğrulamalar. **Token Status List** bu kümenin dayandığı iptal yöntemidir: her belge, doğrulayıcıların önceden indirdiği büyük, imzalı, sıkıştırılmış bir bit listesinde bir sırayı gösterir; böylece belgeyi denetlemek kuruma onun nerede ve ne zaman gösterildiğini hiç söylemez.

HAIP 1.0, 24 Aralık 2025'te Final oldu. Token Status List taslağı 21. sürümde (21 Haziran 2026); adı artık "Token Status List (TSL)" ve RFC Editor kuyruğunda.

## HAIP, temel şartnamelerin açık bıraktığı neyi sabitler?

İki ürün OpenID4VP'yi harfiyen izleyip yine de anlaşamayabilir: biri istekleri `x509_san_dns` ile imzalar, öbürü yalnız DID kabul eder; biri yanıtı şifreler, öbürü şifrelemez. HAIP bu boşlukları üç akış (belge verme, yönlendirmeli gösterim, tarayıcının Digital Credentials API'siyle gösterim) ve iki biçim için kapatır. Başlıca kurallar:

| Alan | HAIP 1.0 kuralı |
|---|---|
| Biçimler | IETF SD-JWT VC (`dc+sd-jwt`) ya da ISO mdoc (`mso_mdoc`); hangisi gerektiğini ekosistem söyler |
| Algoritmalar | herkes en az ES256 (COSE -7 ya da -9) ve SHA-256 destekler |
| Belge verme | FAPI 2.0 üzerinden PKCE (S256) ve PAR'lı yetkilendirme kodu akışı; DPoP'a bağlı belirteçler; her belge yapılandırması için bir `scope`; belge anahtara bağlıysa `nonce_endpoint` |
| Cüzdana güven | PAR ve token uçlarında, `sub`'ı bütün kurulumlarda aynı olan cüzdan doğrulaması; anahtar kanıtları |
| Doğrulayıcı kimliği | imzalı istekler `x509_hash` istemci kimliğini kullanır |
| Sorgu | DCQL, `aki` türünde `trusted_authorities` dahil |
| Yanıt | şifreli: P-256 üzerinde ECDH-ES; doğrulayıcı A128GCM ve A256GCM'nin ikisini de ilan eder; her istek için yeni anahtar |
| Yönlendirmeli akış | `request_uri` ile JAR, `direct_post.jwt`, aynı cihazda isteği başlatan oturuma geri yönlendirme |
| Tarayıcı akışı | `dc_api.jwt` ile Digital Credentials API |
| Başlıktaki anahtarlar | kurum imzaları, imzalı metadata ve durum listesi belirteçleri için `x5c`; güven çapası dahil değil, kendinden imzalı değil |
| SD-JWT VC | belge cihaza bağlıysa KB-JWT her zaman var; `status` alanı `status_list` kullanır |
| Durum | her belgenin kendine ait, benzersiz, tahmin edilemez bir sırası olur |

Tamga profilleri bunların hepsini izler, birkaç yerde de ileri gider: izin verilen tek imza algoritması ES256'dır; her belge cihaza bağlıdır, yani KB-JWT her zaman istenir. Protokol ayrıntısı [OpenID4VCI](/blog/openid4vci-deep-dive) ve [OpenID4VP ve DCQL](/blog/openid4vp-dcql-deep-dive) yazılarında.

![HAIP kuralları ve Tamga'nın seçimleri](/blog/haip-and-token-status-list/tr/fig-haip.png)

## Hangi HAIP kuralları Tamga'nın tasarımını değiştirdi?

HAIP gereklilikleri tek tek eşlenince ikisi kapatılmış kararlara dokundu; bu yüzden ikisi de 1 Ekim 2026'da proje yönetiminin onayladığı [ADR-0034](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub) ile ele alındı.

**Doğrulayıcı kimliği `x509_hash`'tir.** HAIP §5: "For signed requests, the Verifier MUST use, and the Wallet MUST accept the Client Identifier Prefix `x509_hash`". ADR'den önce Tamga doğrulayıcıları `x509_san_dns:<alan adı>` kullanıyordu, güven listesi kayıtları da bu dizgiye göre tutuluyordu. Şimdi:

- doğrulayıcının `client_id`'si erişim sertifikasından hesaplanır, hiçbir yapılandırma dosyasına elle yazılmaz;
- cüzdan yalnız `x509_hash` kabul eder, özet yaprak sertifikayla tutmazsa isteği reddeder; yanıt adresinin sertifikanın SAN'ındaki bir alan adında olmasını da yine ister;
- sertifika her yenilendiğinde özet değiştiği için her doğrulayıcı kaydı kalıcı bir `dns_name` taşır; yenilemeden etkilenmemesi gereken her şey ona bağlanır: kopya ayrımı, siteye özel takma adlar, geçiş kartları ve gösterim kaydı.

İşletim tarafında bunun sonucu bir sıralamadır. Yenilemede önce yeni sertifika kayıt kaynağına girer ve güven listesi yeniden yayımlanır; doğrulayıcı ancak sonra yeni sertifikaya geçer. Erken geçerse cüzdanlar tanımadıkları bir `client_id` görür ve reddeder.

**Cüzdan doğrulamasının öznesi ortaktır.** HAIP §4.4.1'e göre doğrulamanın `sub`'ı "MUST be a value that is shared by all Wallet instances using the present type of wallet implementation"; PAR'daki `client_id` de bu değerdir. Ağdaki cüzdanlardan Tamga Wallet'ın sağlayıcısı oraya her işlemde yeni üretilen bir anahtarın parmak izini yazıyordu. Artık cüzdan ürününün kimliğini yazıyor. Kurulumlar yine yalnız her işlemdeki yeni `cnf` anahtarı ve yeni, bağlanamayan bir durum kaydıyla ayrılır; kurumun kaydettiği şey cüzdan ürününü gösterir, telefon hakkında bir şey söylemez.

## Token Status List durumu nasıl kodlar?

Belge bir gösterge taşır, liste de bitleri:

```json title="Belgede (SD-JWT VC gövdesinde ya da mdoc'ta MSO'da)"
"status": {
  "status_list": { "idx": 48213, "uri": "https://status.tamga.network/3f9a2c" }
}
```

```json title="Sadeleştirilmiş örnek: Status List Token (başlık ve gövde)"
{ "alg": "ES256", "typ": "statuslist+jwt", "kid": "sl-2026-a", "x5c": ["MIIB…"] }
{
  "iss": "https://issuer.tamga.network/example-university",
  "sub": "https://status.tamga.network/3f9a2c",
  "iat": 1791446400,
  "exp": 1791626400,
  "ttl": 3600,
  "status_list": { "bits": 2, "lst": "eNrt…" }
}
```

`sub`, belgedeki `uri` ile aynı olmalıdır. `lst` taslağın tanımladığı üç adımla kurulur: her belge için `bits` kadar bit bir bayt dizisine yazılır ve her bayt **en düşük anlamlı bitten** başlayarak doldurulur; dizi ZLIB biçiminde DEFLATE ile sıkıştırılır; sonuç base64url ile kodlanır.

16 kayıtlık, `bits: 2` olan küçük bir örnek: 1. sıra iptal, 2. sıra askıda, 6. sıra iptal:

```text title="2 bitlik durumları paketlemek (bu yazı için hesaplandı)"
bayt 0 = sıra 3..0   → 00 10 01 00 → 0x24
bayt 1 = sıra 7..4   → 00 01 00 00 → 0x10
bayt 2 = sıra 11..8  → 0x00
bayt 3 = sıra 15..12 → 0x00

zlib (düzey 9), base64url → eNpTEWBgAAAAxAA1
```

`bits: 2` ile `idx` sırasını okumak için `idx >> 2` numaralı bayt alınır ve `(idx & 3) × 2` kadar sağa kaydırılır. `idx` 48213 için bu, 12053. baytın 2. ve 3. bitleridir. Boyut sorun değil: bir Tamga listesinde en az 100.000 kayıt olur, sıkıştırılmadan 25.000 bayt. Bu yazı için yaptığımız denemede zlib düzey 9 ile hepsi geçerli bir liste 46 bayta, aynı listenin 200 dağınık iptalli hâli 439 bayta sıkıştı.

![Bir belgenin durumunu dört adımda okumak](/blog/haip-and-token-status-list/tr/fig-bits.png)

## Durum değerleri Tamga'da ne anlama gelir?

| Değer | Taslaktaki adı | Tamga'da |
|---|---|---|
| `0x00` | VALID | geçerli |
| `0x01` | INVALID | kalıcı olarak iptal |
| `0x02` | SUSPENDED | askıda, geri alınabilir |
| `0x03` | uygulamaya özgü | kullanılmaz; iptal sayılır |

Taslak `bits` için 1, 2, 4 ya da 8'e izin verir. Tamga hep 2 kullanır, çünkü askıya almanın kendi değeri olmalı: bir diploma hakkında inceleme açan kurum inceleme sürerken onu durdurmak ister. Tek bitle ya gerekçesiz iptal eder ya hiçbir şey yapamazdı. Dört ya da sekiz bit, hiçbir yarar sağlamadan listeyi iki ya da dört katına çıkarırdı. Doğrulayıcı `0x00` dışındaki her değeri ret sayar ve "askıda"yı "iptal"den ayrı gösterir.

## Durum listesi bir izleme kanalına dönüşmekten nasıl kaçınır?

Durum listesinin gizliliği sürüden gelir: listeyi indiren doğrulayıcı, içindeki kayıtlardan herhangi birini denetliyor olabilir. Tamga'nın kuralları sürüyü gerçek kılar; aynı kuralların kişinin gözünden anlatımı [İzlemeden iptal](/blog/status-list-privacy) yazısında.

- **Büyük listeler.** En az 100.000 kayıt; kayıtların %80'i dağıtılınca yeni liste. Liste oluşturulurken kapasitenin %1'i rastgele sıralarda, geçerli değerle "dağıtılmış" işaretlenir; yeni listedeki ilk belge yalnız kalmaz.
- **Rastgele sıralar.** `idx` listenin kapasitesi içinde rastgele çekilir. Sıralı numara kayıt sırasını ve aşağı yukarı tarihi ele verirdi, `awarding_date` gizli kalsa bile. HAIP de her belgenin kendine ait, benzersiz ve tahmin edilemez bir sırası olmasını ister.
- **Anlamsız adresler.** Liste adresi her gösterimde görünür, yani o da bir alandır. `/sl/2026-muhendislik` yılı ve fakülteyi sızdırırdı; Tamga liste kimlikleri rastgele dizgilerdir, eşleşme kurumda kalır.
- **Yalnız türe göre bölme.** Yeni liste, öncekisi dolunca açılır; yıla ya da bölüme göre asla.
- **Kopyalar sıra paylaşmaz.** Paketteki on kopyanın her biri kendi rastgele sırasını taşır; iki doğrulayıcı gösterimleri `idx` üzerinden bağlayamaz.

Bir sınır yapısaldır ve öyle yazılmıştır: küçük bir kurumda sürü, o kurumun kendi belgeleri kadardır; çünkü `iss` kurumu zaten açıkça adlandırır.

Gizliliğin öbür yarısı indirmedir. Doğrulayıcı her denetimde listeyi indirseydi kurum "şu an biri benim belgelerimden birini denetliyor" bilgisini öğrenir, kaynak IP de çoğu zaman kim olduğunu söylerdi. Bu yüzden Tamga doğrulayıcıları listeleri belli aralıklarla **önceden indirir** ve önbellekten doğrular; `@tamga-network/verifier` bunu varsayılan olarak yapar, her denetimde indirme ancak açıkça açılırsa olur. Taslağın isteğe bağlı `aggregation_uri` alanı, bir kurumun bütün durum listelerini tek adreste sayar; önceden indirmeyi kolaylaştırdığı için Tamga onu önerir.

## Liste ne sıklıkla yayımlanır, bir kopya ne kadar geçerlidir?

| Kural | Tamga değeri | Neden |
|---|---|---|
| Yayın aralığı | sabit; hiçbir şey değişmese de korunur | yalnız iptalde yayımlamak "az önce bir iptal oldu" diye sızdırırdı |
| Acil yayın | yapılmaz | sabit ritmi bozardı; acil durumda kurum sertifikası askıya alınır ya da şema iptal edilir |
| `ttl` | 3600 sn | doğrulayıcının kopyasını yeniden indirmeden kullanabileceği süre |
| `exp` | `iat` + 50 saat | kesin sınır; bir hafta sonu kesintisi doğrulamayı durdurmasın |
| Önbellek başlıkları | `exp` ve `ttl` karşısında yok sayılır | belirtecin kendi alanları belirler |
| İmza anahtarı | belge anahtarından ayrı, aynı X.509 zinciri | sızan durum anahtarı sahte durum yayımlar, sahte diploma değil |

Her yayın önce durum sunucusuna yazılır, sonra özeti kaydedilir. Bugün bu kayıt güven listesi yayıncısının çapa günlüğüdür; defter (ledger) sonraki bir aşamadır ([neden henüz blockchain yok](/blog/why-no-blockchain-yet)). Doğrulayıcı belirtecin özetinin kayıttakiyle tuttuğuna ve sürümünün geri gitmediğine bakar; böylece bir kurum, iptal ettiği bir belgeyi geçerli göstermek için listesini sessizce geri saramaz.

## Doğrulayıcı denetleyemediğinde ne sonuca varır?

İptal denetimleri Tamga hattının D1–D6 adımlarıdır: `status.status_list` okunur, belirteç önceden indirilmiş önbellekten alınır, imzası güven listesinde o kurum için kayıtlı durum anahtarına karşı doğrulanır; `sub`, tazelik ve kayıtlı özet denetlenir, sonra bitler okunur. Liste indirilemiyorsa ya da `exp` geçmişse sonuç `STATUS_UNREACHABLE` ya da `STATUS_STALE` gibi bir gerekçeyle **INDETERMINATE**'tir. "Bu diploma iptal edildi" ile "şu an denetleyemiyorum" bir insan hakkında farklı kararlara yol açar; farklı gösterilmelidir. Çevrim dışında doğrulayıcı önbellekteki belirteç ve bilinen son kayıtla devam edebilir; son eşitleme zamanını gösterir ve sonucu "çevrim dışı doğrulandı" diye işaretler.

Sıfır bilgili yaş ispatı sırası olmayan tek durumdur: ispat, bir liste sırasını belirleyebilecek hiçbir şey açmaz; durum "uygulanamaz" diye bildirilir ve ispat bunun yerine kısa ömürlü bir belgeye dayanır ([ADR-0032](https://docs.tamga.network/tr/adr/0032-zk-mdoc-presentation)).

## Sık sorulan sorular

### HAIP bir yasa mı?

Hayır. OpenID Foundation'ın bir şartnamesidir. Avrupa dijital kimlik ekosistemi, farklı üreticilerin cüzdan, kurum ve doğrulayıcılarının birlikte çalışması için ona dayanır.

### Doğrulayıcı neden kuruma "bu belge hâlâ geçerli mi" diye sormuyor?

Çünkü sızıntı sorunun kendisidir: kurum hangi belgenin, ne zaman ve çoğu zaman kim tarafından denetlendiğini öğrenirdi. Durum listesiyle doğrulayıcı herkesin durumunun bir kopyasını tutar ve kimseye sormaz.

### Askıya alma kendiliğinden biter mi?

Hayır. Askıdaki belge, kurum bitleri yeniden geçerliye çekene ya da iptal edene kadar askıda kalır. Doğrulayıcı yalnız güncel değeri okur.

### Doğrulayıcı on kopyanın aynı kişiye ait olduğunu anlayabilir mi?

Durum listesi üzerinden anlayamaz. Her kopyanın kendi rastgele sırası var, kopyalar arasındaki eşleşme kurumun veritabanında kalır. İptalde on sıranın hepsi aynı planlı yayında, o aralıkta değişen başka her şeyle birlikte değişir.

## Kaynaklar

- [OpenID4VC High Assurance Interoperability Profile 1.0, Final, 24 Aralık 2025](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [draft-ietf-oauth-status-list-21: Token Status List (TSL), IETF, Haziran 2026](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID for Verifiable Presentations 1.0, Final, 9 Temmuz 2025](https://openid.net/specs/openid-4-verifiable-presentations-1_0.html)
- [ADR-0034: HAIP 1.0 uyumu, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0034-haip-client-id-and-wia-sub)
- [İptal ve durum listesi (SPEC-CRED-0003), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/status-list)
- [ADR-0008: Durum listesinin yeri, Tamga Network belgeleri](https://docs.tamga.network/tr/adr/0008-status-list-placement)
- [İptal ve tazelik, Tamga Network belgeleri](https://docs.tamga.network/tr/concepts/revocation)
- [Doğrulama hattı ve API (SPEC-API-0001), Tamga Network belgeleri](https://docs.tamga.network/tr/specifications/verification-api)

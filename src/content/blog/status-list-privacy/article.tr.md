---
title: "İzlemeden iptal: durum listesinde gizlilik"
slug: status-list-privacy
description: Tamga Network'ün durum listeleriyle iptal denetiminin, belgenin nerede gösterildiği kuruma söylenmeden nasıl yapıldığını ve bu gizliliğin nerede bittiğini anlatıyoruz.
date: 2026-10-08
lang: tr
updated: 2026-10-23
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Kaynak: SPEC-CRED-0003 1.0.0 (§2 status claim'i sd never; §3.3 bits=2 ve değerler; §3.4 ayrı status anahtarı; §5.1 değişiklik olmasa da sabit aralık, §5.3 aralık dışı yayın yok, acil durumda sertifika askısı; §6.1 rastgele idx; §6.2 kapasite ≥100.000, doluluk ≤%80; §6.3 opak URI; §6.4 yalnız türe göre bölme; §7.1 geçersiz / doğrulanamadı ayrımı; §9.1 doğrulama başına çekim yasak, SDK'da ön çekim varsayılan; §9.3 sürü mahremiyeti ve küçük kurum sorunu; §9.4 idx korelasyonu → toplu kopya; §10.2 barındırılan status tüm iptalleri görür; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opak). concepts/revocation (status.tamga.network/{opak}, PrefetchStatusCache, INDETERMINATE). ARF mimari §5.4 (2026-10-09: aralık 2 dk, iptal birkaç dakikada etkili, liste 6 sa geçerli; adres kurumu, yılı, grubu göstermez), §4.5 (IP kaydı yok, kayıtlarda liste konumu yok), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Canlı çapa günlüğü anchors.jsonl "status_list" satırları 2026-10-08'de bakıldı. Dış: IETF Token Status List taslağı (sürü mahremiyeti bölümü), HAIP 1.0. ADR-0044 (ZK için ≤ 24 sa kısa ömürlü kopyalar, uygulama sırada). -->

Durum listesi (status list), doğrulayıcının bir belgenin iptal edilip edilmediğini, belgeyi veren kuruma hiç sormadan öğrenmesini sağlar. Tamga Network'te her kurum, IETF Token Status List biçiminde büyük ve imzalı bir bit dizisi yayımlıyor ve her belge bu dizide rastgele seçilmiş bir konumu gösteriyor. Doğrulayıcılar listelerin tamamını önceden indiriyor ve ilgili biti kendi kopyalarından okuyor. Bu yüzden kurum, belgenin ne zaman, nerede ve kime gösterildiğini hiçbir zaman öğrenemiyor.

## İptal denetimi neden bir izleme kanalına dönüşebilir?

İptali denetlemenin ilk akla gelen yolu kuruma sormaktır. Doğrulayıcı belgenin seri numarasını kuruma gönderir ve "geçerli" ya da "iptal edildi" yanıtını alır. Web'de sertifikalar yıllarca bu yöntemle denetlendi. Ama bu yöntemin kişiler için önemli bir yan etkisi var. Her sorgu, kuruma birinin tam o anda, belli bir ağ adresinden o kişinin belgesine baktığını söyler.

Diploma söz konusu olduğunda bu, üniversitenin her mezununun hangi işverenlere başvurduğunu görebilmesi anlamına gelir. Kâğıt diploma üniversiteye böyle bir bilgi vermezdi ve dijital diplomanın da vermemesi gerekir. Tamga'nın durum listesi şartnamesi bunu ilk gizlilik kuralı olarak yazıyor. Doğrulayıcı listeyi doğrulama anında indiremez ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/tr/specifications/status-list)).

## Token Status List nasıl çalışır?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/), belgeyi veren kurumun imzaladığı ve sıkıştırılmış küçük sayılardan oluşan bir dizidir. Ekim 2026'dan beri her girdinin kaç bit tuttuğu belge türüne göre değişiyor (ADR-0048, paketler 0.6.0). Kimlik servisinin belgeleri askıya alınamadığı için bu belgelerin listeleri tek bit kullanıyor. Bu listelerde `0` geçerli, `1` iptal edildi anlamına geliyor. Kurumların listeleri ise iki bit kullanıyor. Bu listelerde `0` geçerli, `1` kalıcı olarak iptal edildi, `2` askıya alındı ve geri alınabilir anlamına geliyor. `3` değeri kullanılmıyor ve doğrulayıcı bu değeri iptal olarak değerlendiriyor. `2` değeri yalnız şeması askıya almaya izin veren türlerde, örneğin diplomada kullanılıyor. Askıya alma, bir üniversitenin soruşturma sürerken diplomayı kalıcı olarak iptal etmek yerine bekletebilmesi için var.

Her belge, listedeki yerini gösteren bir işaret taşır. Bu işaret seçici paylaşımla gizlenemez ve her gösterimde belgeyle birlikte gider, çünkü doğrulayıcının ona ihtiyacı vardır.

> **Not:** Aşağıdaki örnek sadeleştirildi. Adres ve sıra numarası uydurma değerlerdir. Gerçek biçimi [durum listesi şartnamesinde](https://docs.tamga.network/tr/specifications/status-list) bulabilirsiniz.

```json title="Sadeleştirilmiş örnek: belgedeki status claim'i"
{
  "status": {
    "status_list": {
      "idx": 48213,
      "uri": "https://status.tamga.network/3f9c1a7e5b20d846"
    }
  }
}
```

Doğrulayıcı `uri` adresindeki listeyi alır ve imzasını, kurumun [imzalı güven listesindeki](/blog/how-trust-lists-work) kaydına göre denetler. Ardından listenin özetini çapa günlüğündeki kayıtla karşılaştırır, listeyi açar ve `idx` konumundaki girdiyi okur. Liste, belgeleri imzalayan anahtardan ayrı bir durum anahtarıyla imzalanır. Bu yüzden durum anahtarı çalınırsa sahte bir durum yayımlanabilir, ama sahte bir diploma üretilemez.

## Sürü gizliliği nedir, sürü ne kadar büyük?

İndirilen bir liste, doğrulayıcının listedeki hangi girdiyle ilgilendiği hakkında hiçbir şey söylemez. Sürü gizliliği (herd privacy) denen şey budur. Belgeniz, aynı listedeki bütün öbür belgelerin arasında saklanır. Ama sürü ancak yeterince büyükse ve listedeki konumunuz hiçbir şekilde göze batmıyorsa işe yarar. Tamga'nın kuralları bu iki koşulu da sağlamak için yazıldı:

![Durum listesinin bir belgenin kime ait olduğunu sızdırmasını önleyen kurallar](/blog/status-list-privacy/tr/fig-suru.png)

- **Büyük listeler.** Her listede en az 100.000 girdilik yer bulunur ve girdilerin %80'i dolduğunda yeni bir liste açılır. Çoğu girdisi sıfır olan bir liste sıkıştırıldığında yalnız birkaç yüz bayt tutar, yani listenin büyüklüğü bir maliyet yaratmaz.
- **Rastgele konumlar.** Sıra numarası listenin tamamından rastgele seçilir ve sayaç kullanılmasına izin verilmez. Sıra numaraları art arda verilseydi, 12 numara o yılın on ikinci mezunu olurdu. İki mezunun numaraları arasındaki fark da, mezuniyet tarihi hiç paylaşılmamış olsa bile, aralarında ne kadar zaman olduğunu gösterirdi.
- **Anlamsız adresler.** Liste adresi rastgele bir dizgiden oluşur. `.../edu-2026` ya da `.../tip` gibi bir adres, kişinin özellikle gizlediği yılı ya da fakülteyi her gösterimde açığa çıkarırdı.
- **Yalnız türe göre bölme.** Listeler belge türüne göre ayrılabilir, çünkü tür zaten görünür. Ama yıla, fakülteye ya da döneme göre bölünemez, çünkü "2026 listesinde" bulunmak bile tek başına bir bilgi verir.

Bu kurallar yalnız kâğıt üzerinde kalmıyor, açık paketlerde de uygulanıyor. Belge verme kütüphanesi 100.000 girdiden küçük bir listeyi kabul etmiyor, %80'in ötesinde yer ayırmıyor ve her sıra numarasını kriptografik bir rastgele sayı üreteciyle seçiyor.

## Doğrulayıcı listeyi neden önceden indirir?

Listeyi doğrulama anında indirmek, yukarıda anlattığımız izleme kanalını açmak demektir. Bu yüzden Tamga doğrulayıcısı ihtiyaç duyduğu her durum listesini belli bir takvime göre yeniler ve doğrulamayı önbellekten yapar:

```ts title="@tamga-network/verifier ile durum listelerini önceden çekme"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // takvimle; asla doğrulama başına değil
```

Doğrulayıcı paketinde doğrulama, belgenin durumunu yalnız bu önbellekten okur. Barındırılan doğrulayıcı Tamga Verify de aynı şekilde çalışıyor.

Her liste iki zaman sınırı taşır. `ttl` tazelik hedefidir ve bir kopyanın yenilenmeden ne kadar süre kullanılabileceğini gösterir. `exp` ise kesin sınırdır ve bu andan sonra kopya hiç kullanılamaz. Önbellekteki kopya doğrulayıcının politikasına göre fazla eskiyse, sonuç hiçbir zaman "iptal edildi" olmaz, "şu an doğrulanamadı" (`INDETERMINATE`) olur. "Bu diploma iptal edildi" ile "şu an denetleyemiyorum" arasındaki fark birinin işe alınıp alınmamasını belirleyebilir. Bu yüzden iki sonuç farklı gösterilir ([doğrulamanın bunu nasıl ele aldığı](/blog/add-verification-to-your-site)).

## Hiçbir şey değişmediğinde liste neden yeniden yayımlanır?

Bir kurum yalnız bir belgeyi iptal ettiğinde yayın yapsaydı, yayının kendisi bir haber olurdu. Örneğin "Örnek Üniversitesi'nde saat 14.00 ile 15.00 arasında bir iptal oldu" bilgisi ortaya çıkardı. Bu bilgi, bir disiplin kararının tarihi gibi dışarıdan bilinen bir bilgiyle birleştiğinde tek bir kişiyi işaret edebilir.

Bu yüzden her liste, içinde bir değişiklik olsa da olmasa da sabit aralıklarla yeniden yayımlanıyor. Dışarıdan bakan biri için her aralık aynı görünüyor, çünkü her aralıkta yeni bir sürüm çıkıyor. Bu aralık 2 dakika. Durum sunucusu çalıştığı sürece bir iptal doğrulayıcılara birkaç dakika içinde ulaşıyor ve yayımlanan her liste 6 saat geçerli kalıyor ([ARF §5.4](https://arf.tamga.network/tr/architecture)).

![Bir durum listesinin tek yayın döngüsü](/blog/status-list-privacy/tr/fig-dongu.png)

Döngünün dışında "acil" bir yayın yapılmaması bilinçli bir tercih, çünkü döngü dışındaki tek bir yayın bile korumayı herkes için bozardı. Bir şeyin hemen durdurulması gerekiyorsa, örneğin bir imza anahtarı çalındıysa, doğru araç durum listesi değildir. Bu durumda kurumun güven listesindeki sertifikası askıya alınır.

Her yayın, güven listesi yayıncısının herkese açık çapa günlüğüne de yazılır. Doğrulayıcı listenin özetini ve sürüm numarasını bu kayıtla karşılaştırır. Böylece bir kurum, iptal ettiği bir belgeyi sessizce yeniden "geçerli" duruma döndüremez. Çapa günlüğünde liste kimlikleri, sürümler ve özetler bulunur, ama listedeki hiçbir konum yer almaz.

## Kopyalar iki doğrulayıcının bir kişiyi eşleştirmesini nasıl önler?

Bir belgenin sıra numarası, belgenin ömrü boyunca değişmez. Bir kişi aynı belgeyi iki doğrulayıcıya gösterse ve bu iki doğrulayıcı ellerindeki bilgileri karşılaştırsa, aynı `idx` ve `uri` değerleri onlara karşılarındakinin aynı kişi olduğunu söylerdi. Şartname bunu Token Status List'in yapısından gelen bir sınır olarak açıkça yazıyor.

Bu sorunun çözümü belgeleri paket hâlinde vermek. Diploma dahil her belge 10 kopya olarak veriliyor ve her kopyanın kendi cihaz anahtarı ve kendi rastgele sıra numarası bulunuyor. Cüzdan aynı doğrulayıcıya her seferinde aynı kopyayı, farklı doğrulayıcılara ise farklı kopyaları gösteriyor (WL5 kuralı). Kopyalarla sıra numaraları arasındaki eşleşme belgeyi veren kurumun veritabanında kalıyor ve hiçbir zaman dışarı çıkmıyor (PR10). Belge iptal edildiğinde bütün kopyalarının bitleri aynı planlı yayında, o aralıkta değişen bütün öbür kayıtlarla birlikte değişiyor.

Sıfır bilgi ispatıyla yapılan bir gösterim bir adım daha ileri gidiyor ve hiçbir sıra numarasını açığa çıkarmıyor. Bunun bedeli, doğrulayıcının iptal durumunu denetleyememesi. Bu yüzden sıfır bilgi ispatı yalnız kısa ömürlü kopyalarla sunuluyor. Bu kopyalar en çok 24 saat geçerli ve belge iptal edildiğinde yenilenmiyor ([ADR-0044](https://docs.tamga.network/tr/adr/0044-zk-short-lived-copies)). Paketlerin 0.4.0 sürümünden beri böyle çalışıyor ve kısa ömür iptal denetiminin yerini tutuyor. Böyle bir kopyaya dayanmayan bir sıfır bilgi gösterimini doğrulayıcı ancak politikası buna açıkça izin veriyorsa kabul ediyor ([Tamga'da sıfır bilgi ispatları](/blog/zero-knowledge-in-tamga)).

## Kim neyi görebilir?

![Her tarafın durum listesinden öğrenebildikleri ve öğrenemedikleri](/blog/status-list-privacy/tr/fig-kim.png)

| Taraf | Görebilir | Göremez |
|---|---|---|
| Belgeyi veren kurum | kendi yaptığı iptalleri ve askıya almaları | belgenin nerede, ne zaman ve kime gösterildiğini |
| Doğrulayıcı | kendisine gösterilen kopyanın bugünkü ve sonraki durumunu | aynı belgenin öbür kopyalarını |
| Listeyi barındıran taraf | bir doğrulayıcının listeyi güncel tuttuğunu | hangi belgenin ne zaman denetlendiğini |
| Listeyi okuyan herkes | her aralıkta çıkan yeni sürümü ve sürümler arasında değişen bitleri | bir bitin kimin belgesine ait olduğunu |

Hiçbir Tamga hizmeti IP adresi kaydetmiyor. Hiçbir kayıtta, günlükte ya da sonuçta durum listesindeki bir konum yer almıyor ([ARF §4.5](https://arf.tamga.network/tr/architecture)).

## Bu gizlilik nerede biter?

Bazı sınırlar şartnamede kabul edilmiş sınırlar olarak yazılı ve bunları açıkça söylemek gerekiyor.

- **Küçük kurumların sürüsü de küçüktür.** 300 mezunu olan bir yüksekokulun belgeleri 100.000 girdilik bir listede dursa bile sürü 300 kişiden oluşur, çünkü belge zaten kendisini veren kurumu gösterir. Bunun teknik bir çözümü yok ve şartnamede kabul edilmiş bir sınır olarak kayıtlı.
- **Doğrulayıcı gördüğü kopyayı izleyebilir.** Doğrulayıcı o kopyanın sıra numarasını bildiği için kopyanın sonradan iptal edilip edilmediğini görebilir. Durum listesinin amacı da zaten bu, ama bu da bir bilgi sayılır. Kopyalar bu bilgiyi, kişiyi zaten tanıyan tek bir doğrulayıcıyla sınırlıyor.
- **Zaman bilgisi bulanıklaşır, ama tamamen silinmez.** Sabit yayın aralığı, iptalin tam anını o aralığın içinde gizler. Ama asıl olayın tarihini zaten bilen ve değişecek bir biti bekleyen birinden iptali gizleyemez.
- **Barındırılan durum servisi yayımladığı iptalleri görür.** Bir kurum kendi durum servisini işletebilir ya da ağın barındırılan belge verme servisini kullanabilir. İkinci durumda kurumun iptallerini işletmeci yayımlar ve dolayısıyla bu iptalleri görür. Şartname bunu gerçek bir merkezîleşme noktası olarak adlandırıyor ve yönetişim kurallarına bağlıyor.
- **Güven çapası bugün tek bir imzacıya dayanıyor.** Çapa günlüğünü tek ve geçici bir işletmeci imzalıyor. Bu sınırı kaldıracak ortak defter ise ikinci bağımsız işletmecinin katılmasını bekliyor ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).

## Sık sorulan sorular

### Belgemi gösterdiğimde kurum bunu öğrenir mi?

Hayır. Doğrulayıcılar durum listelerini önceden indiriyor ve denetimi kendi kopyalarından yapıyor. Doğrulama anında kuruma hiçbir istek gitmiyor.

### Listeye bakan biri kimin belgesinin iptal edildiğini anlayabilir mi?

İki sürüm arasında bazı konumların değiştiğini görebilir. Ama bu konumların kimin belgesine ait olduğunu anlayamaz, çünkü konumlar rastgele dağıtılıyor ve eşleşme belgeyi veren kurumda kalıyor.

### Bir iptal ne kadar sürede etkili olur?

Bir yayın aralığı ve doğrulayıcının listeyi yenileme süresi içinde etkili olur. Listeler 2 dakikada bir yeniden yayımlandığı için durum sunucusu çalışırken bu süre birkaç dakikayı geçmez.

### Liste indirilemezse ne olur?

Doğrulayıcı elindeki son geçerli kopyayı, o kopyanın süresi dolana kadar kullanır. Bu süre, kopyanın yayımlanmasından 6 saat sonra doluyor. Ondan sonra sonuç "iptal edildi" olmaz, "şu an doğrulanamadı" olur.

### Acil bir durumda neden hemen yayın yapılmıyor?

Döngü dışında yapılan bir yayın, bir şey olduğunu ortaya koyardı. Bu yüzden acil durumlarda bunun yerine kurumun güven listesindeki sertifikası askıya alınıyor.

## Kaynaklar

- [IETF Token Status List (OAuth çalışma grubu taslağı)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: durum listesi şartnamesi](https://docs.tamga.network/tr/specifications/status-list) · [İptal ve tazelik](https://docs.tamga.network/tr/concepts/revocation) · [Gizlilik](https://docs.tamga.network/tr/concepts/privacy)
- [Tamga ARF: mimari (§4.5, §5.4, §7.2)](https://arf.tamga.network/tr/architecture)
- [HAIP ve Token Status List](/blog/haip-and-token-status-list) · [İptal](/learn/revocation) · [Bağlanamazlık](/learn/unlinkability)

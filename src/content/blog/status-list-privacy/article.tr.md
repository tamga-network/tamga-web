---
title: "İzlemeden iptal: durum listesinde gizlilik"
slug: status-list-privacy
description: Tamga Network'ün durum listeleri, belgenin nerede gösterildiğini kuruma söylemeden iptal denetimini nasıl yapar, bu gizlilik nerede biter?
date: 2026-10-08
lang: tr
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Kaynak: SPEC-CRED-0003 1.0.0 (§2 status claim'i sd never; §3.3 bits=2 ve değerler; §3.4 ayrı status anahtarı; §5.1 değişiklik olmasa da sabit aralık, §5.3 aralık dışı yayın yok, acil durumda sertifika askısı; §6.1 rastgele idx; §6.2 kapasite ≥100.000, doluluk ≤%80; §6.3 opak URI; §6.4 yalnız türe göre bölme; §7.1 geçersiz / doğrulanamadı ayrımı; §9.1 doğrulama başına çekim yasak, SDK'da ön çekim varsayılan; §9.3 sürü mahremiyeti ve küçük kurum sorunu; §9.4 idx korelasyonu → toplu kopya; §10.2 barındırılan status tüm iptalleri görür; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opak). concepts/revocation (status.tamga.network/{opak}, PrefetchStatusCache, INDETERMINATE). ARF mimari §5.4 (pilotta aralık 60 dk, etkisi en geç 90 dk; adres kurumu, yılı, grubu göstermez), §4.5 (IP kaydı yok, kayıtlarda liste konumu yok), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Canlı çapa günlüğü anchors.jsonl "status_list" satırları 2026-10-08'de bakıldı. Dış: IETF Token Status List taslağı (sürü mahremiyeti bölümü), HAIP 1.0. Aralık değeri yalnız ARF'den (pilot değeri), bugünkü kurulumdan değil. -->

Durum listesi (status list), doğrulayıcının bir belgenin iptal edilip edilmediğini, belgeyi veren kuruma hiç sormadan öğrenmesini sağlar. Tamga Network'te her kurum, IETF Token Status List biçiminde imzalı ve büyük bir bit dizisi yayımlar; her belge bu dizide rastgele bir konumu gösterir. Doğrulayıcılar listelerin tamamını önceden indirir ve biti kendi kopyalarından okur. Böylece kurum, belgenin ne zaman, nerede ve kime gösterildiğini hiçbir zaman öğrenemez.

## İptal denetimi neden bir izleme kanalına dönüşebilir?

İptali denetlemenin akla gelen ilk yolu sormaktır: doğrulayıcı belgenin seri numarasını kuruma gönderir, "geçerli" ya da "iptal" cevabını alır. Web'de sertifika denetimi yıllarca böyle çalıştı. Bunun kişiler açısından önemli bir yan etkisi var. Her sorgu kuruma şunu söyler: şu anda, şu ağ adresinden biri bu kişinin belgesine bakıyor.

Diploma için bu, üniversitenin her mezununun hangi işverenlere başvurduğunu görebilmesi demektir. Kâğıt diploma üniversiteye böyle bir şey söylemezdi; dijital diploma da söylememeli. Tamga'nın durum listesi şartnamesi bunu ilk gizlilik kuralı sayar: doğrulayıcı listeyi doğrulama anında çekemez ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/tr/specifications/status-list)).

## Token Status List nasıl çalışır?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/), belgeyi verenin imzaladığı, sıkıştırılmış bir küçük sayı dizisidir. Tamga her girdi için hep iki bit kullanır; bu da dört değer verir: `0` geçerli, `1` kalıcı iptal, `2` askıda (geri alınabilir), `3` kullanılmaz; doğrulayıcı bu değeri iptal sayar. Tek bit yerine iki bit seçilmesinin nedeni şu: bir üniversite soruşturma sürerken diplomayı kalıcı iptal etmek yerine askıya alabilsin.

Her belge listedeki yerini gösteren bir işaret taşır. Bu işaret seçici açıklamayla gizlenemez; her sunumda belgeyle birlikte gider, çünkü doğrulayıcının ona ihtiyacı vardır.

> **Not:** Sadeleştirilmiş örnek. Adres ve sıra numarası uydurmadır. Gerçek biçim [durum listesi şartnamesinde](https://docs.tamga.network/tr/specifications/status-list).

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

Doğrulayıcı `uri` adresindeki listeyi alır, imzasını kurumun [imzalı güven listesindeki](/blog/how-trust-lists-work) kaydına göre denetler, özetini çapa günlüğüyle karşılaştırır, listeyi açar ve `idx` konumundaki iki biti okur. Listenin kendisi, belgeleri imzalayan anahtardan ayrı bir durum anahtarıyla imzalanır. Durum anahtarı çalınırsa sahte durum yayımlanabilir ama sahte diploma üretilemez.

## Sürü mahremiyeti nedir, sürü ne kadar büyük?

İndirilen bir liste, doğrulayıcının hangi girdiyle ilgilendiği hakkında hiçbir şey söylemez. Sürü mahremiyeti (herd privacy) budur: belgeniz aynı listedeki bütün öteki belgelerin arasında saklanır. Sürü ancak büyükse ve konumunuz hiçbir şekilde göze batmıyorsa işe yarar. Tamga'nın kuralları ikisini de sağlamak için yazıldı:

![Durum listesinin bir belgenin kime ait olduğunu sızdırmasını önleyen kurallar](/blog/status-list-privacy/tr/fig-suru.png)

- **Büyük listeler.** Her listede en az 100.000 girdilik yer vardır. Girdilerin %80'i dolunca yeni liste açılır. Çoğu sıfır olan bir liste sıkıştırılınca birkaç yüz bayt tutar; boyutun maliyeti yoktur.
- **Rastgele konum.** Sıra numarası listenin tamamından rastgele çekilir. Sayaç kullanılamaz: sıralı numarada 12 numara o yılın on ikinci mezunu olurdu; iki mezunun numarası arasındaki fark, mezuniyet tarihi hiç açıklanmamış olsa bile aralarındaki zaman farkını gösterirdi.
- **Opak adres.** Liste adresi rastgele bir dizedir. `.../edu-2026` ya da `.../tip` gibi bir adres, kişinin tam da gizlediği yılı ya da fakülteyi her sunumda açık ederdi.
- **Yalnız türe göre bölme.** Listeler belge türüne göre ayrılabilir; tür zaten görünür. Yıla, fakülteye ya da döneme göre bölünemez, çünkü "2026 listesinde" olmak tek başına bir açıklamadır.

Bu kurallar yalnız kâğıt üzerinde değil, açık paketlerde de var. Belge verme kütüphanesi 100.000 girdiden küçük listeyi reddeder, %80'in ötesinde yer ayırmaz ve her sıra numarasını kriptografik rastgele sayı üreteciyle seçer.

## Doğrulayıcı listeyi neden önceden indirir?

Çünkü doğrulama anında indirmek, yukarıda anlatılan izleme kanalının ta kendisidir. Tamga doğrulayıcısı ihtiyaç duyduğu her durum listesini bir takvime göre yeniler ve doğrulamayı önbellekten yapar:

```ts title="@tamga-network/verifier ile durum listelerini önceden çekme"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // takvimle; asla doğrulama başına değil
```

Doğrulayıcı paketinde doğrulama, durumu yalnız bu önbellekten okur. Barındırılan doğrulayıcı Tamga Verify de aynı şekilde çalışır.

Her liste iki zaman sınırı taşır. `ttl` tazelik hedefidir: bir kopyanın yenilenmeden ne kadar kullanılabileceği. `exp` kesin sınırdır: o andan sonra kopya hiç kullanılamaz. Önbellekteki kopya doğrulayıcının politikasına göre fazla eskiyse sonuç "şu an doğrulanamadı"dır (`INDETERMINATE`), asla "iptal edilmiş" değil. "Bu diploma iptal edilmiş" ile "şu an denetleyemiyorum" arasındaki fark birinin işe alınıp alınmamasıdır; bu yüzden ikisi farklı gösterilir ([doğrulamanın bunu nasıl ele aldığı](/blog/add-verification-to-your-site)).

## Hiçbir şey değişmediğinde liste neden yeniden yayımlanır?

Bir kurum yalnız iptal yaptığında yayın yapsaydı, yayının kendisi haber olurdu: "Örnek Üniversitesi'nde 14.00 ile 15.00 arasında bir iptal oldu." Dışarıdan bir bilgiyle, örneğin bir disiplin kararının tarihiyle birleşince bu, tek bir kişiye kadar daralabilir.

Bu yüzden her liste, bir şey değişsin değişmesin, sabit aralıklarla yeniden yayımlanır. Dışarıdan bakınca her aralık aynı görünür: yeni bir sürüm var. Aralığı ve bir iptalin doğrulayıcılara en geç ne zaman ulaşacağını Tamga ARF belirler ([ARF §5.4](https://arf.tamga.network/tr/architecture)).

![Bir durum listesinin tek yayın döngüsü](/blog/status-list-privacy/tr/fig-dongu.png)

Döngü dışında "acil" yayın bilerek yoktur; döngü dışı tek bir yayın, korumayı herkes için bozar. Bir şeyin hemen durması gerekiyorsa, örneğin imza anahtarı çalındıysa, doğru araç durum listesi değil, kurumun güven listesindeki sertifikasının askıya alınmasıdır.

Her yayın, güven listesi yayıncısının herkese açık çapa günlüğüne de yazılır. Doğrulayıcı listenin özetini ve sürümünü bu kayıtla karşılaştırır; böylece bir kurum iptal ettiği bir belgeyi sessizce "geçerli"ye geri çeviremez. Çapa günlüğünde liste kimlikleri, sürümler ve özetler bulunur; listedeki hiçbir konum bulunmaz.

## Kopyalar iki doğrulayıcının bir kişiyi eşleştirmesini nasıl önler?

Sıra numarası belgenin ömrü boyunca değişmez. Bir kişi aynı belgeyi iki doğrulayıcıya gösterse ve bu ikisi bilgilerini karşılaştırsa, aynı `idx` ve `uri` onlara bunun aynı kişi olduğunu söylerdi. Şartname bunu Token Status List'in yapısal bir sınırı olarak açıkça yazar.

Cevap toplu belge vermedir. Diploma dahil her belge 10 kopya olarak verilir; her kopyanın kendi cihaz anahtarı ve kendi rastgele sıra numarası vardır. Cüzdan aynı doğrulayıcıya hep aynı kopyayı, her farklı doğrulayıcıya farklı bir kopyayı gösterir (WL5 kuralı). Kopyalarla sıra numaraları arasındaki eşleme belgeyi verenin veritabanında kalır, hiçbir zaman dışarı çıkmaz (PR10). Belge iptal edilince bütün kopyalarının bitleri aynı planlı yayında, o aralıkta değişen başka her şeyle birlikte değişir.

Sıfır bilgi ispatıyla yapılan sunum bir adım daha ileri gider: hiçbir sıra numarası açmaz. Bedeli, doğrulayıcının iptali denetleyememesidir; bu yüzden bu yolla gösterilen belgeler kısa ömürlü tutulur ([Tamga'da sıfır bilgi ispatları](/blog/zero-knowledge-in-tamga)).

## Kim neyi görebilir?

![Her tarafın durum listesinden öğrenebildikleri ve öğrenemedikleri](/blog/status-list-privacy/tr/fig-kim.png)

| Taraf | Görebilir | Göremez |
|---|---|---|
| Belgeyi veren kurum | kendi yaptığı iptal ve askılar | belgenin nerede, ne zaman, kime gösterildiği |
| Doğrulayıcı | kendisine gösterilen kopyanın durumu, bugün ve sonra | aynı belgenin öteki kopyaları |
| Listeyi barındıran | bir doğrulayıcının listeyi taze tuttuğu | hangi belgenin, ne zaman denetlendiği |
| Listeyi okuyan herkes | her aralıkta yeni sürüm; sürümler arasında hangi bitlerin değiştiği | bir bitin kimin belgesine ait olduğu |

Hiçbir Tamga hizmeti IP adresi kaydetmez; hiçbir kayıtta, günlükte ya da sonuçta durum listesindeki bir konum yer almaz ([ARF §4.5](https://arf.tamga.network/tr/architecture)).

## Bu gizlilik nerede biter?

Bazı sınırlar şartnamede kabul edilmiş olarak yazılıdır ve açıkça söylenmeye değer.

- **Küçük kurumun sürüsü küçüktür.** 300 mezunu olan bir yüksekokul 100.000 girdilik bir listede büyük bir listeye ama 300 kişilik bir sürüye sahiptir, çünkü belge zaten kendisini vereni söyler. Bunun teknik bir çözümü yok; kabul edilmiş sınır olarak kayıtlı.
- **Doğrulayıcı gördüğü kopyayı izleyebilir.** Doğrulayıcı o kopyanın sıra numarasını bilir; kopyanın sonradan iptal edilip edilmediğini görebilir. Durum listesinin amacı da budur, ama bu yine bir bilgidir. Kopyalar bu bilgiyi, kişiyi zaten tanıyan tek doğrulayıcıyla sınırlar.
- **Zaman bulanıklaşır, silinmez.** Sabit aralık, iptalin tam anını aralığın içinde gizler. Asıl olayın tarihini zaten bilen ve değişen bir biti bekleyen birinden iptali gizlemez.
- **Barındırılan durum hizmeti yayımladığı iptalleri görür.** Kurum kendi durum hizmetini işletebilir ya da ağın barındırılan belge verme hizmetini kullanabilir. İkinci durumda o kurumun iptallerini işletmeci yayımlar, dolayısıyla görür. Şartname bunu gerçek bir merkezîleşme noktası olarak adlandırır ve yönetişim kurallarına bağlar.
- **Çapa bugün tek imzacıya dayanıyor.** Çapa günlüğünü tek ve geçici bir işletmeci imzalıyor. Bu sınırı kaldıracak ortak defter, ikinci bağımsız işletmeciyi bekliyor ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).

## Sık sorulan sorular

### Belgemi gösterdiğimde kurum bunu öğrenir mi?

Hayır. Doğrulayıcılar durum listelerini önceden indirir ve kendi kopyalarından denetler. Doğrulama anında kuruma hiçbir istek gitmez.

### Listeye bakan biri kimin iptal edildiğini anlayabilir mi?

İki sürüm arasında bazı konumların değiştiğini görebilir. Bu konumların kimin belgesine ait olduğunu anlayamaz; konumlar rastgeledir ve eşleme belgeyi verende kalır.

### Bir iptal ne kadar sürede etkili olur?

Bir yayın aralığı artı doğrulayıcının yenileme süresi içinde. Listeler sabit aralıklarla yayımlanır; Tamga ARF bir iptalin doğrulayıcılara ulaşması için bir üst sınır koyar.

### Liste indirilemezse ne olur?

Doğrulayıcı son geçerli kopyasını, o kopyanın süresi bitene kadar kullanır. Sonrasında sonuç "iptal edilmiş" değil, "şu an doğrulanamadı"dır.

### Acil bir durumda neden hemen yayımlanmıyor?

Döngü dışı bir yayın bir şey olduğunu açık ederdi. Acil durumlar bunun yerine kurumun güven listesindeki sertifikasının askıya alınmasıyla çözülür.

## Kaynaklar

- [IETF Token Status List (OAuth çalışma grubu taslağı)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: durum listesi şartnamesi](https://docs.tamga.network/tr/specifications/status-list) · [İptal ve tazelik](https://docs.tamga.network/tr/concepts/revocation) · [Gizlilik](https://docs.tamga.network/tr/concepts/privacy)
- [Tamga ARF: mimari (§4.5, §5.4, §7.2)](https://arf.tamga.network/tr/architecture)
- [HAIP ve Token Status List](/blog/haip-and-token-status-list) · [İptal](/learn/revocation) · [Bağlanamazlık](/learn/unlinkability)

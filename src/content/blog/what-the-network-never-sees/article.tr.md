---
title: Tamga Network'ün hiç görmediği şeyler
slug: what-the-network-never-sees
description: Tamga Network'ün listelerinde ve günlüklerinde neler hiç bulunmaz, geçici hizmetleri kişisel veriye nerede dokunur, işletmeciler neye erişebilir?
date: 2026-10-08
lang: tr
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Kaynak: SPEC-TRUST-0001 TL11 (hiçbir liste, çapa günlüğü, değişiklik kaydında kişisel veri, belge ya da belge özeti yok); SPEC-BC-0001 DP1 (ileride defter: kişisel veri, içerik, özet yok); ADR-0020 K2 + AS1–AS4 (kişi kaydı yok; veri imza anında yetkili kaynaktan okunur, bırakılır; kalıcı yalnız subject_ref ve anahtarlı özet; Tamga iletişim adresi almaz); ADR-0041 TI3–TI5 (deneme kayıt defteri yalnız sandbox'ta); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (değer bir kez, ≤ 5 dk'da silinir); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (kimlik servisi, veri sorumlusu, sağlayıcıda görüntü sözleşmeyle ≤ 30 gün), §9.1 silme; ADR-0011; ADR-0022; ADR-0031 PS1–PS3 ve "bilinen zayıflama"; ARF mimari §2.7, §4.5 madde 4, §7.2 madde 1, 6, 7; ARF kural kitabı RB-GEN-05; ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1. SPEC-TRUST-0001 güvenlik notları (tek işletmeci, üç aylık şeffaflık raporu, denetim). Canlı bakış 2026-10-08: lotl.json / tl-tr.json alanları ve anchors.jsonl satırları kişisel veri içermiyor. -->

Tamga Network, kişilerin belgelerinin içeriğini listelerinde, günlüklerinde ya da çapa günlüğünde hiçbir zaman görmez. Kişi kaydı tutmaz, bir belgenin nerede ya da kime gösterildiğini öğrenmez, IP adresi kaydetmez. Ağ, kişisel veriye kısa bir süre dokunan birkaç geçici hizmet işletir: kimlik doğrulama sırasında kimlik servisi, imza anında barındırılan belge verme hizmeti ve bir site onu kullanmayı seçtiğinde barındırılan doğrulayıcı. Kurallar bunların her biri için neyin, ne kadar süre tutulabileceğini ve neyin hiç tutulamayacağını söyler.

## Herkese açık güven listelerinde ve çapa günlüğünde ne var?

`trust.tamga.network` adresindeki imzalı güven listeleri kurumları, doğrulayıcıları ve cüzdan sağlayıcılarını adlandırır. Bir kayıtta tüzel ad, sertifika parmak izi, durum ve geçmişi, tarihler, adresler ve bir kurumun verebileceği ya da bir doğrulayıcının isteyebileceği belge türleri bulunur. Kural kısadır: hiçbir listede, çapa günlüğünde ya da değişiklik kaydında kişisel veri, belge, hatta bir belgenin özeti bulunmaz (TL11 kuralı).

![Ağın herkese açık her parçasında ne bulunduğu](/blog/what-the-network-never-sees/tr/fig-katman.png)

Çapa günlüğü, bir kurumun durum listesinin her yayınını imzalı bir satır olarak kaydeder: hangi liste, hangi sürüm, hangi özet. Hiçbir satır bir kişi hakkında bir şey söylemez, hiçbir satırda durum listesindeki bir konum bulunmaz. Ağ kayıtlarını ileride ortak bir deftere taşıdığında aynı kural da onunla birlikte gider: hiçbir sözleşme kişisel veri, belge içeriği ya da belge özeti saklamaz (DP1). Bunu kendiniz de denetleyebilirsiniz; listelerin okunabilir kopyaları `trust.tamga.network/lotl.json` ve `tl-tr.json` adreslerinde ([İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)).

## Kişilerin belgeleri nerede durur?

Kişinin kendisinde; ağın hiçbir yerinde değil. Belge kurumun sisteminden kişinin cüzdanına gider. Tamga kişi kaydı tutmaz: barındırılan belge vermede veri, imza anında kurumun kendi sisteminden, yani yetkili kaynaktan okunur ve belge verilince bellekten bırakılır ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)).

İki şey tutulur, yalnız bu ikisi. Kurumun kişi için kullandığı opak kimlik; kurum belgeyi sonra iptal edebilsin ya da yenileyebilsin diye. Bir de kişinin kimliğine bağlı bir teklifte, eşleştirme anahtarlarının anahtarlı özeti; düz kimlik numarası asla. Tamga bir teklif için kişinin e-posta adresini ya da telefon numarasını hiç almaz: bağlantıyı kurum kendisi gönderir.

Kurum Konsolu'nda deneme amaçlı bir "örnek kaynak" kayıt defteri var. Yalnız sandbox'ta, test kurumları için bulunur ve her gece silinir; gerçek ağda açılamaz.

## Bir sunumu kim görür?

Olağan durumda cüzdan ve doğrulayıcı, başka kimse. Sunum doğrudan cüzdandan doğrulayıcıya gider. Durum listeleri ve şema kataloğu önceden ve toplu indirilir; böylece belge gösterildiği anda ne kurumdan ne ağdan bir şey istenir ([İzlemeden iptal](/blog/status-list-privacy)). Kişinin sunum geçmişi telefonda kalır; sunucuya ya da yedeğe hiç gitmez, cihazdan yalnız kişinin kendi yaptığı, parolayla korunan bir dışa aktarmada çıkar (WL4 kuralı). Yaş kontrolünde doğrulayıcı daha da azını görebilir: sıfır bilgi ispatıyla yalnız kişinin 18 yaşından büyük olduğunu öğrenir ([Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga)).

Kendi doğrulama yazılımını işletmek istemeyen bir site barındırılan doğrulayıcı Tamga Verify'ı kullanabilir. O zaman Tamga Verify, kişinin paylaşmayı kabul ettiği alanları görür; çünkü onları site adına denetler. Kurallar bu açıklığı sınırlar: değerler yalnız isteği açan kayıtlı siteye, en fazla bir kez verilir ve sonuçtan en geç beş dakika sonra bellekten silinir ([ADR-0017](https://docs.tamga.network/tr/adr/0017-hosted-verifier-result-access)). Doğrulama sonucunun kendisi alan değerlerini değil adlarını taşır ve hiçbir zaman durum listesi konumu içermez (AP3, AP4).

## Kimlik servisi ne görür?

Devlet bir kimlik sağlayıcısı atayana kadar Tamga, kişiyi uzaktan doğrulayan ve cüzdanına bir kimlik belgesi veren geçici bir kimlik servisi işletir ([ADR-0011](https://docs.tamga.network/tr/adr/0011-provisional-identity-attestation-provider)). Servis nitelikli olmayan bir hizmet olarak kayıtlıdır; "nitelikli", Tamga'nın henüz sahip olmadığı bağımsız bir değerlendirme gerektiren hukuki bir unvandır. Doğrulama sırasında:

- lisanslı bir uzaktan doğrulama sağlayıcısı kişinin kimlik belgesini ve yüzünü görür; bu işlemenin veri sorumlusu Tamga'dır ve kişi doğrulama başlamadan önce aydınlatma metnini okur ve açık rıza verir;
- kimlik servisi kişinin alanlarını yalnız belge verilene kadar tutar;
- sonrasında opak bir kimlik, belge numarasının anahtarlı özeti, geçerlilik süresi ve kopyaların durum listesi konumlarını tutar; başka hiçbir şeyi;
- belge görüntüleri, özçekim, video ve belgeden okunan ham metin Tamga'da hiçbir zaman saklanmaz; sağlayıcının görüntüleri saklama süresi sözleşmeyle en çok 30 günle sınırlıdır ([kimlik doğrulama, §8 ve §9](https://docs.tamga.network/tr/specifications/identity-proofing)).

![Kişisel verinin nereden geçtiği ve ne kadar kaldığı](/blog/what-the-network-never-sees/tr/fig-gecis.png)

Kişi, hesap açmadan kaydını sildirebilir. Cüzdan sahipliğin kanıtı olarak kimlik servisinin kendi belgelerini gösterir; servis kaydı ve ona bağlı olay günlüğü satırlarını siler, bütün kopyaları iptal eder ve sağlayıcıdan oturumunu silmesini ister. Cüzdanı sıfırlamak da aynı şeyi yapar; cüzdanın kendi sağlayıcısındaki kaydıyla birlikte.

## Sitelere girişte kullanılan takma adlar ne olacak?

"Tamga ile giriş yap" her siteye kendine ait, kalıcı bir takma ad verir; iki site aynı kişiyi eşleştiremez ([ADR-0031](https://docs.tamga.network/tr/adr/0031-per-site-pseudonyms)). Takma ad cüzdanda bir tohumdan türetilir. Tohum, kimlik servisinde kişinin değişmeyen kimliğinden ayrı bir anahtarla türetilir, cüzdana hiçbir siteye gösterilmeyen bir belge türüyle verilir ve servis tarafından saklanmaz.

Karar kaydı sınırı açıkça yazar; biz de burada tekrarlıyoruz. Hem o anahtarı hem bir kişinin kimlik numarasını elinde tutan biri, örneğin bir siteyle iş birliği yapan kimlik servisi işletmecisi, o kişinin o sitedeki takma adını hesaplayabilir. Önlemler korumalı bir anahtar deposu, kayda geçen anahtar erişimi, şeffaflık raporunda anahtar kullanım sayıları ve anahtarı bir devlet kimlik sağlayıcısına devretme imkânıdır. Bu tasarımdan önce her site herkesi eşleştirebiliyordu.

## Ağın günlüklerinde ne var?

Çoğu web hizmetinin tuttuğundan daha azı. Hiçbir Tamga hizmeti IP adresi kaydetmez: ne düz, ne özetlenmiş, ne de kısaltılmış. Hata ayıklama günlükleri en çok yedi gün tutulur ([Tamga ARF kural kitabı, RB-GEN-05](https://arf.tamga.network/tr/rulebook)). Günlüklerde ve sonuçlarda alan değeri, kimlik numarası ve durum listesi konumu bulunmaz; kimlik servisi olay türünü, opak bir oturum kimliğini ve seviyeyi yazar, hiçbir zaman ad, belge numarası ya da puan yazmaz. Kullanım istatistikleri yalnız toplu olarak ve en az 50 kişilik gruplar hâlinde yayımlanır ([ARF §7.2](https://arf.tamga.network/tr/architecture)).

## Sandbox nasıl ayrı tutulur?

`sandbox.tamga.network` adresindeki sandbox, kendi kök sertifikası ve kendi listeleri olan ayrı bir test ağıdır ([ADR-0038](https://docs.tamga.network/tr/adr/0038-sandbox)). Gerçek ağın anahtarları orada hiçbir şey imzalamaz, sandbox listeleri kendilerini test olarak işaretler ve gerçek ağ için kurulmuş bir cüzdan ya da doğrulayıcı onları reddeder. Bu yüzden sandbox belgesi gerçek bir doğrulayıcıdan hiçbir zaman geçmez.

Sandbox varsayılan olarak, kimlik numaraları geçersiz biçimde olan uydurma kişiler kullanır. Gerçek bir belgeyle kimlik doğrulamayı denemek için isteğe bağlı bir yol var. Başlamadan önce kişi açık bir test uyarısını onaylar; belgeye yalnız ad, soyad ve doğum tarihi girer, kimlik numarası ve belge numarası asla; sağlayıcıdaki oturum hemen silinir ve her şey gece sıfırlamasında silinir ([ADR-0040](https://docs.tamga.network/tr/adr/0040-sandbox-invited-real-identity)). Test kurumları, T.C. kimlik numarası sağlama kuralını geçen 11 haneli bir sayı taşıyan kaydı saklayamaz.

## İşletmeciler neye erişebilir, neye erişemez?

![Ağ işletmecilerinin erişebildikleri ve erişemedikleri](/blog/what-the-network-never-sees/tr/fig-isletmeci.png)

| İşletmeciler erişebilir | İşletmeciler erişemez |
|---|---|
| barındırılan bir hizmet çalışırken geçen veri: imza anında, kimlik doğrulama sırasında ve Tamga Verify'da en çok beş dakika | belge verildikten sonra belgelerin içeriği |
| kimlik servisinin kayıtları: opak kimlikler, belge numarası özetleri, süre, durum konumları | telefonda kalan kişisel sunum geçmişi |
| bir kurumun barındırılan belge verme hizmetiyle yaptığı iptaller | bir belgenin nerede, ne zaman, kime gösterildiği |
| IP adresi içermeyen sunucu erişim günlükleri | kişilerin telefonlarındaki anahtarlar ya da cüzdanların kendi kayıtları (ağ cüzdan işletmez) |

Sağ sütun tasarımla sağlanır: veri orada yoktur. Sol sütun işletmecinin kurallara uymasına dayanır; bu yüzden kısa, süreyle sınırlı ve yazılıdır.

## Dürüst sınırlar neler?

- **Kimlik servisi bir güven noktasıdır.** Doğrulama sırasında kimlik verisini görür ve takma ad anahtarını tutar. Tasarımı gereği geçicidir ve rolü bir devlet kimlik sağlayıcısına geçmek üzere kurgulanmıştır.
- **Bugün tek işletmeci.** Listeleri, çapa günlüğünü ve barındırılan hizmetleri tek ve geçici bir işletmeci yürütür. Herkese açık günlük, değişiklik kaydı, kuralların öngördüğü üç aylık şeffaflık raporu ve bağımsız denetimler kötüye kullanımı caydırır; imkânsız kılmaz. Bu sınır, bağımsız işletmeciler defteri paylaştığında kalkar ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).
- **Barındırılan hizmetler işledikleri veriyi görür.** Ağdan hiçbir şey geçmesini istemeyen bir kurum ya da site, açık kaynak belge verme ve doğrulama paketlerini kendi sunucularında çalıştırabilir.

## Sık sorulan sorular

### Tamga Network diplomamı ya da kimlik bilgilerimi saklıyor mu?

Hayır. Belgeleriniz telefonunuzda. Listelerde yalnız kurum ve doğrulayıcı bilgisi var. Kimlik servisi belge verildikten sonra opak bir kimlik ve belge numaranızın anahtarlı özetini tutar; belge görüntülerinizi asla.

### Tamga belgelerimi nerede kullandığımı görebilir mi?

Hayır. Doğrulayıcılar durum listelerini önceden indirir, sunumlar da doğrudan cüzdanınızdan doğrulayıcıya gider. Bir site Tamga Verify kullanıyorsa, yalnız paylaşmayı kabul ettiğiniz alanları en çok beş dakika görür.

### Tamga IP adresimi kaydediyor mu?

Hiçbir Tamga hizmeti IP adresi kaydetmez; ne düz, ne özetlenmiş, ne kısaltılmış.

### Verilerimi sildirebilir miyim?

Evet. Cüzdanınız kimlik servisinin belgelerini göstererek kaydınızın silinmesini isteyebilir; cüzdanı sıfırlamak da aynı şeyi yapar. Bir kuruma ya da doğrulayıcıya da cüzdandan silme isteği gönderebilirsiniz.

### Sandbox'ı gerçek kimliğimle denemek güvenli mi?

İsteğe bağlı ve sınırlı: test belgesine yalnız adınız ve doğum tarihiniz girer, sağlayıcı oturumu hemen silinir ve her şey her gece silinir. Sandbox varsayılan olarak uydurma kişiler kullanır.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(AB) 2016/679 sayılı Tüzük (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [AB Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: mimari (§2.7, §4.5, §7.2)](https://arf.tamga.network/tr/architecture) · [Tamga ARF: kural kitabı](https://arf.tamga.network/tr/rulebook)
- [Tamga Network: gizlilik](https://docs.tamga.network/tr/concepts/privacy) · [Kimlik doğrulama](https://docs.tamga.network/tr/specifications/identity-proofing) · [Güven listeleri](https://docs.tamga.network/tr/specifications/trust-lists)
- [ADR-0020: yetkili kaynak kurumda](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution) · [ADR-0031: site başına takma ad](https://docs.tamga.network/tr/adr/0031-per-site-pseudonyms) · [ADR-0038: sandbox](https://docs.tamga.network/tr/adr/0038-sandbox)
- [Veri en aza indirme](/learn/data-minimisation) · [Rıza ve denetim](/learn/consent-and-control) · [Güven ağı nedir?](/blog/what-is-a-trust-network)

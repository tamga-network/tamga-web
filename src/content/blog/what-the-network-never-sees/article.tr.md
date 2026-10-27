---
title: Tamga Network'ün hiç görmediği şeyler
slug: what-the-network-never-sees
description: Tamga Network'ün listelerinde ve günlüklerinde nelerin hiç bulunmadığını, geçici hizmetlerinin kişisel veriye nerede dokunduğunu ve işletmecilerin neye erişebildiğini anlatıyoruz.
date: 2026-10-08
lang: tr
category: privacy
draft: false
related: status-list-privacy, trusting-a-wallet, what-is-a-trust-network, zero-knowledge-in-tamga
---

<!-- Kaynak: SPEC-TRUST-0001 TL11 (hiçbir liste, çapa günlüğü, değişiklik kaydında kişisel veri, belge ya da belge özeti yok); SPEC-BC-0001 DP1 (ileride defter: kişisel veri, içerik, özet yok); ADR-0020 K2 + AS1–AS4 (kişi kaydı yok; veri imza anında yetkili kaynaktan okunur, bırakılır; kalıcı yalnız subject_ref ve anahtarlı özet; Tamga iletişim adresi almaz); ADR-0041 TI3–TI5 (deneme kayıt defteri yalnız sandbox'ta); SPEC-API-0001 AP3, AP4, AP7; ADR-0017 HV1–HV3 (değer bir kez, ≤ 5 dk'da silinir); SPEC-WALLET-0001 WL4, WL9; SPEC-ID-0003 §3 IP4/IP11, §8 IDP3, IDP4, IDP9, IDP11, §9 (kimlik servisi, veri sorumlusu, sağlayıcıda görüntü sözleşmeyle ≤ 30 gün), §9.1 silme; ADR-0011; ADR-0022; ADR-0031 PS1–PS3 ve "bilinen zayıflama"; ARF mimari §2.7, §4.5 madde 4, §7.2 madde 1, 6, 7; ARF kural kitabı RB-GEN-05; ADR-0038 SB1–SB5; ADR-0040 RI3–RI6; ADR-0041 TI4; ADR-0042 NW1. SPEC-TRUST-0001 güvenlik notları (tek işletmeci, üç aylık şeffaflık raporu, denetim). Canlı bakış 2026-10-08: lotl.json / tl-tr.json alanları ve anchors.jsonl satırları kişisel veri içermiyor. -->

Tamga Network, kişilerin belgelerinin içeriğini listelerinde, günlüklerinde ya da çapa günlüğünde hiçbir zaman görmez. Kişilerle ilgili bir kayıt tutmaz, bir belgenin nerede ya da kime gösterildiğini öğrenmez ve IP adresi kaydetmez. Bununla birlikte ağ, kişisel veriye kısa bir süre için dokunan birkaç geçici hizmet işletiyor. Kimlik servisi kimlik doğrulaması sırasında, barındırılan belge verme hizmeti imza anında, barındırılan doğrulayıcı da bir site onu kullanmayı seçtiğinde kişisel veriyle karşılaşıyor. Kurallar bu hizmetlerin her biri için neyin ne kadar süre tutulabileceğini ve neyin hiçbir zaman tutulamayacağını belirliyor.

## Herkese açık güven listelerinde ve çapa günlüğünde ne var?

`trust.tamga.network` adresindeki imzalı güven listeleri kurumları, doğrulayıcıları ve cüzdan sağlayıcılarını gösterir. Bir kayıtta tüzel ad, sertifika parmak izi, durum ve durum geçmişi, tarihler, adresler ve bir kurumun verebileceği ya da bir doğrulayıcının isteyebileceği belge türleri bulunur. Kural çok kısa. Hiçbir listede, çapa günlüğünde ya da değişiklik kaydında kişisel veri, belge, hatta bir belgenin özeti bile bulunamaz (TL11 kuralı).

![Ağın herkese açık her parçasında ne bulunduğu](/blog/what-the-network-never-sees/tr/fig-katman.png)

Çapa günlüğü, bir kurumun durum listesini her yayımlayışını imzalı bir satır olarak kaydeder. Bu satırda hangi listenin, hangi sürümünün ve hangi özetle yayımlandığı yazar. Hiçbir satır bir kişi hakkında bilgi vermez ve hiçbir satırda durum listesindeki bir konum yer almaz. Ağ kayıtlarını ileride ortak bir deftere taşıdığında aynı kural da onunla birlikte taşınacak ve hiçbir sözleşme kişisel veri, belge içeriği ya da belge özeti saklamayacak (DP1). Bunu kendiniz de denetleyebilirsiniz, çünkü listelerin okunabilir kopyaları `trust.tamga.network/lotl.json` ve `tl-tr.json` adreslerinde duruyor ([İmzalı güven listesi nasıl çalışır?](/blog/how-trust-lists-work)).

## Kişilerin belgeleri nerede durur?

Belgeler kişinin kendisinde durur ve ağın hiçbir yerinde bulunmaz. Belge, kurumun sisteminden doğrudan kişinin cüzdanına gider. Tamga kişilerle ilgili bir kayıt tutmuyor. Barındırılan belge vermede veriler imza anında kurumun kendi sisteminden, yani yetkili kaynaktan okunuyor ve belge verildikten sonra bellekten siliniyor ([ADR-0020](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution)).

Bu süreçte yalnız iki bilgi saklanıyor. Birincisi, kurumun kişi için kullandığı ve tek başına bir anlam taşımayan kimlik. Kurum bu sayede belgeyi daha sonra iptal edebiliyor ya da yenileyebiliyor. İkincisi, kişinin kimliğine bağlı bir teklif söz konusuysa, eşleştirmede kullanılan bilgilerin anahtarlı özeti. Kimlik numarasının kendisi ise hiçbir zaman saklanmıyor. Tamga bir teklif için kişinin e-posta adresini ya da telefon numarasını da hiçbir zaman almıyor, çünkü teklif bağlantısını kurum kendisi gönderiyor.

Kurum Konsolu'nda denemeler için kullanılan bir "örnek kaynak" kayıt defteri var. Bu defter yalnız sandbox'ta, test kurumları için bulunuyor ve her gece siliniyor. Gerçek ağda ise hiç açılamıyor.

## Bir gösterimi kim görür?

Olağan durumda bir gösterimi yalnız cüzdan ve doğrulayıcı görür. Gösterim doğrudan cüzdandan doğrulayıcıya gider. Durum listeleri ve şema kataloğu önceden ve toplu olarak indirildiği için belge gösterildiği anda ne kurumdan ne de ağdan bir şey istenir ([İzlemeden iptal](/blog/status-list-privacy)). Kişinin gösterim geçmişi telefonda kalır ve hiçbir zaman bir sunucuya ya da yedeğe gitmez. Bu geçmiş cihazdan yalnız kişinin kendi yaptığı, parolayla korunan bir dışa aktarmayla çıkabilir (WL4 kuralı). Yaş kontrolünde doğrulayıcı daha da azını görebilir. Sıfır bilgi ispatı kullanıldığında yalnız kişinin 18 yaşından büyük olduğunu öğrenir ([Tamga'da sıfır bilgi](/blog/zero-knowledge-in-tamga)).

Kendi doğrulama yazılımını işletmek istemeyen bir site, barındırılan doğrulayıcı Tamga Verify'ı kullanabilir. Bu durumda Tamga Verify, kişinin paylaşmayı kabul ettiği alanları görür, çünkü onları site adına denetler. Kurallar bu durumu da sınırlıyor. Değerler yalnız isteği açan kayıtlı siteye ve en fazla bir kez veriliyor. Sonuçtan en geç beş dakika sonra da bellekten siliniyor ([ADR-0017](https://docs.tamga.network/tr/adr/0017-hosted-verifier-result-access)). Doğrulama sonucunun kendisi ise alanların değerlerini değil, yalnız adlarını taşıyor ve hiçbir zaman bir durum listesi konumu içermiyor (AP3, AP4).

## Kimlik servisi ne görür?

Devlet bir kimlik sağlayıcısı atayana kadar Tamga geçici bir kimlik servisi işletiyor. Bu servis kişiyi uzaktan doğruluyor ve cüzdanına bir kimlik belgesi veriyor ([ADR-0011](https://docs.tamga.network/tr/adr/0011-provisional-identity-attestation-provider)). Servis, nitelikli olmayan bir hizmet olarak kayıtlı. "Nitelikli" sıfatı hukuki bir unvan ve Tamga'nın henüz sahip olmadığı bağımsız bir değerlendirme gerektiriyor. Doğrulama sırasında olanlar şunlar:

- lisanslı bir uzaktan doğrulama sağlayıcısı kişinin kimlik belgesini ve yüzünü görür; bu işlemenin veri sorumlusu Tamga'dır ve kişi doğrulama başlamadan önce aydınlatma metnini okuyup açık rıza verir;
- kimlik servisi kişinin bilgilerini yalnız belge verilene kadar tutar;
- belge verildikten sonra yalnız tek başına anlam taşımayan bir kimliği, belge numarasının anahtarlı özetini, geçerlilik süresini ve kopyaların durum listesindeki konumlarını saklar;
- belge görüntüleri, özçekim, video ve belgeden okunan ham metin Tamga'da hiçbir zaman saklanmaz; sağlayıcının görüntüleri saklama süresi ise sözleşmeyle en çok 30 günle sınırlıdır ([kimlik doğrulama, §8 ve §9](https://docs.tamga.network/tr/specifications/identity-proofing)).

![Kişisel verinin nereden geçtiği ve ne kadar kaldığı](/blog/what-the-network-never-sees/tr/fig-gecis.png)

Kişi, bir hesap açmasına gerek kalmadan kaydını sildirebilir. Cüzdan, sahipliğin kanıtı olarak kimlik servisinin verdiği belgeleri gösterir. Servis de kaydı ve kayda bağlı olay günlüğü satırlarını siler, bütün kopyaları iptal eder ve sağlayıcıdan oturumu silmesini ister. Cüzdanı sıfırlamak da aynı sonucu doğurur ve cüzdanın kendi sağlayıcısındaki kaydı da silinir.

## Sitelere girişte kullanılan takma adlar ne olacak?

"Tamga ile giriş yap" her siteye kendine ait ve değişmeyen bir takma ad verir. Böylece iki site aynı kişiyi birbiriyle eşleştiremez ([ADR-0031](https://docs.tamga.network/tr/adr/0031-per-site-pseudonyms)). Takma ad, cüzdanda bir tohumdan türetilir. Tohum ise kimlik servisinde, kişinin değişmeyen kimliğinden ayrı bir anahtarla türetilir. Cüzdana, hiçbir siteye gösterilmeyen bir belge türü içinde verilir ve servis onu saklamaz.

Karar kaydı bu yöntemin sınırını açıkça yazıyor ve biz de burada tekrarlıyoruz. Hem o anahtarı hem de bir kişinin kimlik numarasını elinde tutan biri, örneğin bir siteyle iş birliği yapan kimlik servisi işletmecisi, o kişinin o sitedeki takma adını hesaplayabilir. Buna karşı alınan önlemler korumalı bir anahtar deposu, kayda geçen anahtar erişimleri, şeffaflık raporunda yayımlanan anahtar kullanım sayıları ve anahtarı bir devlet kimlik sağlayıcısına devredebilme seçeneği. Bu tasarımdan önce ise her site herkesi birbiriyle eşleştirebiliyordu.

## Ağın günlüklerinde ne var?

Ağın günlükleri, çoğu web hizmetinin tuttuğundan daha az bilgi içeriyor. Hiçbir Tamga hizmeti IP adresini ne olduğu gibi, ne özet olarak, ne de kısaltılmış hâliyle kaydediyor. Hata ayıklama günlükleri en çok yedi gün saklanıyor ([Tamga ARF kural kitabı, RB-GEN-05](https://arf.tamga.network/tr/rulebook)). Günlüklerde ve sonuçlarda alan değerleri, kimlik numaraları ve durum listesi konumları bulunmuyor. Kimlik servisi olayın türünü, tek başına anlam taşımayan bir oturum kimliğini ve düzeyi yazıyor, ama hiçbir zaman ad, belge numarası ya da puan yazmıyor. Kullanım istatistikleri ise yalnız toplu olarak ve en az 50 kişilik gruplar hâlinde yayımlanıyor ([ARF §7.2](https://arf.tamga.network/tr/architecture)).

## Sandbox nasıl ayrı tutulur?

`sandbox.tamga.network` adresindeki sandbox, kendi kök sertifikası ve kendi listeleri olan ayrı bir test ağıdır ([ADR-0038](https://docs.tamga.network/tr/adr/0038-sandbox)). Gerçek ağın anahtarları orada hiçbir şey imzalamaz. Sandbox listeleri kendilerini test listesi olarak işaretler ve gerçek ağ için kurulmuş bir cüzdan ya da doğrulayıcı bu listeleri reddeder. Bu yüzden sandbox'ta alınan bir belge gerçek bir doğrulayıcıdan hiçbir zaman geçmez.

Sandbox varsayılan olarak, kimlik numaraları geçersiz biçimde yazılmış uydurma kişileri kullanıyor. Gerçek bir belgeyle kimlik doğrulamayı denemek isteyenler için isteğe bağlı bir yol da var. Kişi başlamadan önce açık bir test uyarısını onaylıyor. Belgeye yalnız ad, soyad ve doğum tarihi giriyor, kimlik numarası ve belge numarası ise hiçbir zaman girmiyor. Sağlayıcıdaki oturum hemen siliniyor ve her şey gece yapılan sıfırlamada temizleniyor ([ADR-0040](https://docs.tamga.network/tr/adr/0040-sandbox-invited-real-identity)). Test kurumları, T.C. kimlik numarasının sağlama kuralından geçen 11 haneli bir sayı içeren bir kaydı saklayamıyor.

## İşletmeciler neye erişebilir, neye erişemez?

![Ağ işletmecilerinin erişebildikleri ve erişemedikleri](/blog/what-the-network-never-sees/tr/fig-isletmeci.png)

| İşletmeciler erişebilir | İşletmeciler erişemez |
|---|---|
| barındırılan bir hizmet çalışırken geçen veriye: imza anında, kimlik doğrulaması sırasında ve Tamga Verify'da en çok beş dakika | belge verildikten sonra belgelerin içeriğine |
| kimlik servisinin kayıtlarına: tek başına anlam taşımayan kimlikler, belge numarası özetleri, geçerlilik süresi, durum konumları | telefonda kalan kişisel gösterim geçmişine |
| bir kurumun barındırılan belge verme hizmetiyle yaptığı iptallere | bir belgenin nerede, ne zaman ve kime gösterildiğine |
| IP adresi içermeyen sunucu erişim günlüklerine | kişilerin telefonlarındaki anahtarlara ya da cüzdanların kendi kayıtlarına (ağ cüzdan işletmez) |

Sağ sütundaki sınırlar tasarım gereği sağlanıyor, çünkü bu veriler ağda hiç bulunmuyor. Sol sütundakiler ise işletmecinin kurallara uymasına dayanıyor. Bu yüzden sol sütun kısa tutuldu, süreyle sınırlandırıldı ve yazıya geçirildi.

## Dürüst sınırlar neler?

- **Kimlik servisi bir güven noktasıdır.** Doğrulama sırasında kimlik verisini görür ve takma ad anahtarını tutar. Bu servis tasarımı gereği geçicidir ve rolünün bir devlet kimlik sağlayıcısına geçmesi planlandı.
- **Bugün tek bir işletmeci var.** Listeleri, çapa günlüğünü ve barındırılan hizmetleri tek ve geçici bir işletmeci yürütüyor. Herkese açık günlük, değişiklik kaydı, kuralların öngördüğü üç aylık şeffaflık raporu ve bağımsız denetimler kötüye kullanımı caydırıyor, ama imkânsız kılmıyor. Bu sınır, bağımsız işletmeciler defteri ortaklaşa tuttuğunda kalkacak ([Neden zincirsiz başlıyoruz](/blog/why-no-blockchain-yet)).
- **Barındırılan hizmetler işledikleri veriyi görür.** Ağdan hiçbir verinin geçmesini istemeyen bir kurum ya da site, açık kaynak belge verme ve doğrulama paketlerini kendi sunucularında çalıştırabilir.

## Sık sorulan sorular

### Tamga Network diplomamı ya da kimlik bilgilerimi saklıyor mu?

Hayır. Belgeleriniz telefonunuzda duruyor ve listelerde yalnız kurumlara ve doğrulayıcılara ait bilgiler bulunuyor. Kimlik servisi, belge verildikten sonra tek başına anlam taşımayan bir kimliği ve belge numaranızın anahtarlı özetini saklıyor. Belge görüntülerinizi ise hiçbir zaman saklamıyor.

### Tamga belgelerimi nerede kullandığımı görebilir mi?

Hayır. Doğrulayıcılar durum listelerini önceden indiriyor ve gösterimler doğrudan cüzdanınızdan doğrulayıcıya gidiyor. Bir site Tamga Verify kullanıyorsa, Tamga Verify yalnız paylaşmayı kabul ettiğiniz alanları ve en çok beş dakika boyunca görüyor.

### Tamga IP adresimi kaydediyor mu?

Hayır. Hiçbir Tamga hizmeti IP adresini ne olduğu gibi, ne özet olarak, ne de kısaltılmış hâliyle kaydediyor.

### Verilerimi sildirebilir miyim?

Evet. Cüzdanınız, kimlik servisinin verdiği belgeleri göstererek servisten kaydınızı silmesini isteyebilir ve cüzdanı sıfırlamak da aynı sonucu doğurur. Bir kuruma ya da doğrulayıcıya da cüzdandan silme isteği gönderebilirsiniz.

### Sandbox'ı gerçek kimliğimle denemek güvenli mi?

Bu yol isteğe bağlı ve sınırlı. Test belgesine yalnız adınız ve doğum tarihiniz giriyor, sağlayıcıdaki oturum hemen siliniyor ve her şey her gece temizleniyor. Sandbox varsayılan olarak uydurma kişileri kullanıyor.

## Kaynaklar

- [(AB) 2024/1183 sayılı Tüzük (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj) · [(AB) 2016/679 sayılı Tüzük (GDPR)](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- [AB Mimari ve Referans Çerçevesi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: mimari (§2.7, §4.5, §7.2)](https://arf.tamga.network/tr/architecture) · [Tamga ARF: kural kitabı](https://arf.tamga.network/tr/rulebook)
- [Tamga Network: gizlilik](https://docs.tamga.network/tr/concepts/privacy) · [Kimlik doğrulama](https://docs.tamga.network/tr/specifications/identity-proofing) · [Güven listeleri](https://docs.tamga.network/tr/specifications/trust-lists)
- [ADR-0020: yetkili kaynak kurumda](https://docs.tamga.network/tr/adr/0020-authentic-source-at-institution) · [ADR-0031: site başına takma ad](https://docs.tamga.network/tr/adr/0031-per-site-pseudonyms) · [ADR-0038: sandbox](https://docs.tamga.network/tr/adr/0038-sandbox)
- [Veri en aza indirme](/learn/data-minimisation) · [Rıza ve denetim](/learn/consent-and-control) · [Güven ağı nedir?](/blog/what-is-a-trust-network)

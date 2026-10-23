---
title: Etibar şəbəkəsi nədir və Tamga Network nə edir?
slug: what-is-a-trust-network
description: "Etibar şəbəkəsi rəqəmsal sənədləri kimin verə və yoxlaya biləcəyini göstərən imzalı siyahılar dərc edir. Tamga Network nə edir, nə etmir, haradan başlamalı."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Sources: tamga-network README (non-profit, foundation, runs no wallet, packages: 0.7.1 test release on npm, stable 1.0.0 when ready); ADR-0035 (EU-compatible, not "EUDI Wallet"; recognises wallets by rules), ADR-0037 K1 (the network's jobs: rules, trust, catalogue, open code, reference services, not sold), ADR-0042 (runs no wallet, lists them), ADR-0020 (no register of people, authentic source), ADR-0009 (ledger with ≥2 independent operators), ADR-0036 (external lists, none added yet), ADR-0038/0041 (sandbox, self-service test institutions); concepts/trust-lists, concepts/revocation (prefetching); SPEC-TRUST-0001 (TL11 no personal data; operator provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK verification in the verifier package); sandbox guide (age-zk example verifier); ARF §8.3 (non-profit, foundation). Live: trust.tamga.network/tl-tr.json operator.status provisional, on_behalf_of "TR national authority (to be designated)" (checked 2026-10-08). External: EU trusted lists browser, EU ARF GitHub. -->

Etibar şəbəkəsi elə ortaq qatdır ki, hər kəs heç kimə zəng etmədən rəqəmsal sənədin onu verməyə səlahiyyəti olan real qurumdan gəldiyini yoxlaya bilir. Tamga Network Türkiyə və türk dünyası üçün məhz bu qatdır və Avropa İttifaqının (Aİ) eIDAS 2.0 standartları üzərində qurulub. O, qaydaları yazır, imzalı etibar siyahılarını dərc edir, rəqəmsal sənəd növlərinin kataloqunu aparır, açıq mənbəli paketləri və istinad yoxlama xidmətini dərc edir, həmçinin test şəbəkəsini idarə edir. O, insanların sənədlərini saxlamır, rəqəmsal cüzdanları idarə etmir və kimin kimə nə göstərdiyini görmür.

## İmzalı rəqəmsal sənədə ümumiyyətlə şəbəkə nə üçün lazımdır?

Rəqəmsal imza sənədi müəyyən bir açarın imzaladığını sübut edir. Lakin bu açarın kimə məxsus olduğunu sübut etmir. Etibarlı imzası olan diplom gəldikdə yoxlayan tərəfin hələ də iki sualı qalır: imzalayan həqiqətən universitetdirmi və onun diplom verməyə icazəsi varmı?

Bu suala hər dəfə ayrıca bir qurum üzrə cavab vermək miqyaslana bilmir. Hər işəgötürən hər məktəbin açarlarından ibarət öz faylını saxlamalı və onu əl ilə aktual saxlamalı olardı. Etibar şəbəkəsi bu şəxsi faylları hər kəsin eyni cür oxuduğu vahid, açıq və imzalı cavabla əvəz edir. Aİ eyni problemi eyni ideya ilə həll edib: Avropa Komissiyası etibar siyahılarının siyahısını, hər üzv dövlət isə öz milli siyahısını dərc edir ([Aİ etibar siyahıları](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Etibar şəbəkəsində kimlər iştirak edir?

Üç rol var və üçü də eyni siyahını oxuyur:

![Qurum verir, şəxs saxlayır, yoxlayan tərəf yoxlayır; üçü də eyni imzalı etibar siyahısına müraciət edir](/blog/what-is-a-trust-network/en/fig-ucgen.png)

- **Qurum (sənədi verən qurum).** Universitet, xəstəxana, palata, dövlət qurumu və ya tədbir təşkilatçısı rəqəmsal sənədləri öz açarı ilə imzalayır. Açar heç vaxt qurumdan kənara çıxmır.
- **Şəxs (sənəd sahibi).** Rəqəmsal sənədi telefonundakı rəqəmsal cüzdanda saxlayır və hansı sahələri paylaşacağına özü qərar verir.
- **Yoxlayan tərəf.** İşəgötürən, veb-sayt və ya giriş qapısı imzanı yoxlayır, qurumu etibar siyahısında tapır və əvvəlcədən yüklədiyi ləğv siyahısını oxuyur.

Şəbəkə bu üç tərəfin yanında dayanır. Rəqəmsal sənəd verilərkən və ya təqdim edilərkən o, prosesin içində deyil. Siyahı dərc edildikdən sonra vermə və yoxlama birbaşa tərəflər arasında baş verir; etibar şəbəkəsini platformadan fərqləndirən də məhz budur.

## Tamga Network əslində nə edir?

Altı vəzifə, hamısı açıq ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)):

1. **Qaydalar.** Tamga ARF (Arxitektura və İstinad Çərçivəsi), Etibar Çərçivəsi və qaydalar toplusu hər rolun nə etməli olduğunu müəyyən edir. Hər qayda nömrələnib və [arf.tamga.network](https://arf.tamga.network) ünvanında dərc olunub.
2. **İmzalı etibar siyahıları.** Etibar siyahılarının siyahısı və Türkiyə siyahısı qeydiyyatdan keçmiş qurumları və hər birinin verə biləcəyi rəqəmsal sənəd növlərini, qeydiyyatdan keçmiş yoxlayan tərəfləri və hər birinin nə tələb edə biləcəyini, eləcə də tanınmış cüzdan provayderlərini göstərir. Onlar `trust.tamga.network` ünvanında dərc olunur, versiyalanır, heş-zəncirlə bağlanır və imzalanır. Mexanizm [İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work) yazısında izah olunub.
3. **Sxem kataloqu.** Tələbə sənədi, diplom, tədbir bileti və şəxsiyyət attestasiyası kimi rəqəmsal sənəd növləri `schemas.tamga.network` ünvanındakı açıq kataloqda bir dəfə təsvir olunur ki, hər rəqəmsal cüzdan və yoxlayan tərəf diplomu eyni cür oxusun.
4. **Açıq paketlər.** `@tamga-network/*` paketləri etibar siyahılarını, SD-JWT VC, ISO mdoc, vermə, yoxlama, rəqəmsal cüzdan nüvəsini və sıfır bilikli sübutları əhatə edir. Onlar Apache-2.0 lisenziyalı açıq mənbəlidir və npm-də 0.7.1 test buraxılışı kimi dərc olunub; sabit 1.0.0 versiyası hər şey hazır olduqda çıxacaq. Test buraxılışlarında API dəyişə bilər.
5. **İstinad xidmətləri.** Etibar siyahısı dərc edən və qeydiyyat aləti, Institution Console ilə birlikdə yerləşdirilmiş vermə xidməti, yerləşdirilmiş yoxlama xidməti (Tamga Verify) və müvəqqəti şəxsiyyət xidməti. Onlar şəbəkənin işləməsi və qurumların qoşula bilməsi üçün mövcuddur. Satılmır.
6. **Sınaq mühiti (sandbox).** [sandbox.tamga.network](https://sandbox.tamga.network) ünvanında real şəbəkədən tamamilə ayrı, öz test kök sertifikatı, nümunə qurumları və uydurma şəxsləri olan test şəbəkəsi. Qurum orada bir neçə dəqiqə ərzində özü test qurumu aça bilər.

![Tamga Network nə edir və nə etmir](/blog/what-is-a-trust-network/en/fig-yapar.png)

## Tamga Network nəyi qəsdən etmir?

Hədlər vəzifələr qədər vacibdir və onlar məcburi qaydalar kimi yazılıb.

**Heç bir sənəd saxlamır.** Rəqəmsal sənədlər qurumun sistemindən şəxsin telefonuna ötürülür. Şəbəkə insanların reyestrini aparmır; vermə zamanı məlumatlar qurumun öz sistemindən, yəni onun mötəbər mənbəyindən oxunur ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)). Heç bir siyahı, jurnal və ya reyestr fərdi məlumatları, rəqəmsal sənədin məzmununu, hətta onun heşini belə daşımır.

**Heç bir rəqəmsal cüzdan idarə etmir.** Şəbəkə rəqəmsal cüzdanları siyahıya alır. O, heç bir cüzdanın tətbiqini, cüzdan provayderini və ya veb-saytını idarə etmir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)). Dərc olunmuş qaydalara əməl edən və uyğunluq testlərindən keçən istənilən rəqəmsal cüzdan siyahıya daxil edilə bilər. Şəbəkədəki ilk rəqəmsal cüzdan olan [Tamga Wallet](https://tamgawallet.com/en) ayrıca məhsuldur və siyahıya digərləri kimi eyni qaydada daxil olur; onun provayder qeydi 14 oktyabr 2026-cı ildən bəri aktivdir.

**Kimin kimə nə göstərdiyini görmür.** Yoxlayan tərəflər ləğv siyahılarını əvvəlcədən yükləyir və keşdə saxlayır, ona görə də yoxlama anında nə quruma, nə də şəbəkəyə heç bir sorğu getmir. Qurum öz rəqəmsal sənədlərinin harada təqdim olunduğunu öyrənə bilmir, biz də öyrənə bilmirik.

**Dövlətin yerinə qərar vermir.** Hər dövlət öz siyahısının yeganə müəllifidir. Bu gün Tamga Türkiyə siyahısını milli orqan adından müvəqqəti olaraq dərc edir və siyahı bunu `operator` sahəsində bildirir. Dövlət öz siyahısını dərc etdikdə şəbəkənin etibar siyahılarının siyahısı ona istinad edəcək; rəqəmsal sənədlər və rəqəmsal cüzdanlar dəyişmir.

**Heç nə satmır.** Tamga Network qeyri-kommersiyadır və onun idarə edilməsi fonda təhvil veriləcək. İnteqrasiya, dəstək və məsləhət xidmətlərini şəbəkədən kənar şirkətlər göstərir və onların hamısı eyni şərtlərlə qoşulur.

## Tamga Network-un Aİ rəqəmsal şəxsiyyət cüzdanı ilə əlaqəsi nədir?

O, eyni tikinti bloklarından istifadə edir: rəqəmsal sənədlər üçün SD-JWT VC və ISO/IEC 18013-5 mdoc, vermə və təqdimat üçün HAIP profili ilə OpenID4VCI və OpenID4VP, ləğv üçün IETF Token Status List, qurumlar üçün X.509 sertifikatları və ETSI formatlarına uyğunlaşdırılmış etibar siyahıları. Bunlar Aİ-nin Arxitektura və İstinad Çərçivəsində göstərilən formatlardır ([GitHub-da Aİ ARF](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Onun iddia edə bilmədiyi isə bir titul var. "EUDI Wallet" Aİ üzv dövləti tərəfindən təqdim edilən və ya tanınan rəqəmsal cüzdanlar üçün hüquqi statusdur. Aİ-dən kənardakı şəbəkə və ya rəqəmsal cüzdan Aİ ilə uyğun ola bilər, yəni eyni standartlardan istifadə edib bunu testlərlə sübut edə bilər; Tamga özünü məhz belə təsvir edir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

Ölkə siyahıları da digər siyahılarla yanaşı mövcud olmaq üçün qurulub. Başqa dövlətdən və ya Aİ-dən olan ETSI formatlı xarici siyahı sabitlənmiş imzalayan və müəyyən edilmiş əhatə dairəsi ilə, hər biri ayrıca təsdiqlə şəbəkənin etibar siyahılarının siyahısına əlavə edilə bilər ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Hələ heç biri əlavə edilməyib.

## Tamga Network blokçeyndirmi?

Xeyr. Bu gün etibar lövbəri imzalı, versiyalanmış, heş-zəncirlə bağlanmış siyahılar və açıq, saatlıq lövbər jurnalından ibarətdir; bu, Aİ modelidir. İcazəli reyestr yalnız ən azı iki müstəqil operator iştirak etdikdən sonra əlavə olunur, çünki bir operatorun apardığı reyestr etibara heç nə əlavə etmir. Hər siyahı sahəsi artıq reyestr qeydinə uyğunlaşdırılıb, ona görə də keçid rəqəmsal cüzdanlar və yoxlayan tərəflər üçün heç nəyi dəyişməyəcək. Əsaslandırma [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet) yazısındadır.

## Bu gün nə işləyir, nə işləmir?

| Hissə | 23 oktyabr 2026-cı il tarixinə vəziyyət |
|---|---|
| İmzalı etibar siyahıları və lövbər jurnalı | `trust.tamga.network` ünvanında işləyir |
| Sxem kataloqu | `schemas.tamga.network` ünvanında işləyir |
| Yerləşdirilmiş yoxlama xidməti (Tamga Verify) | `verify.tamga.network` ünvanında işləyir |
| Sıfır bilikli yaş yoxlaması | Tamga Verify-da işləyir (siyasət `age-over-18-zk`); rəqəmsal cüzdan tərəfində Android sübut kitabxanası hazırdır, iOS gözləmədədir |
| Özünəxidmət test qurumları olan sınaq mühiti | `sandbox.tamga.network` ünvanında işləyir |
| İstehsal siyahısındakı cüzdan provayderləri | 14 oktyabr 2026-cı ildən bəri bir aktiv qeyd (Tamga Wallet-in) |
| `@tamga-network/*` paketləri | npm-də 0.7.1 test buraxılışı; sabit 1.0.0 hər şey hazır olduqda |
| Xarici siyahılar (digər dövlətlər, Aİ) | layihələndirilib; heç biri əlavə edilməyib |
| Ortaq reyestr | ikinci müstəqil operatoru gözləyir |

Test və nümayiş qurumları yalnız sınaq mühitində mövcuddur. Sınaq mühitinə aid rəqəmsal sənəd real yoxlayan tərəfdə qəbul olunmur, çünki real şəbəkə sınaq mühitinin kökünə etibar etmir.

## Haradan başlamalıyam?

- **Rəqəmsal sənəd vermək istəyən qurum:** [Qurum Tamga Network-a necə qoşulur](/blog/join-as-an-institution), sonra isə tərtibatçı bələdçisi [Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution).
- **Rəqəmsal sənədləri yoxlamaq istəyən sayt və ya tətbiq:** [Veb-saytınıza və ya tətbiqinizə "Tamga ilə yoxla" funksiyasını əlavə edin](/blog/add-verification-to-your-site).
- **Rəqəmsal cüzdan tərtibatçısı:** [cüzdan bələdçisi](https://docs.tamga.network/guides/build-a-wallet) və [sınaq mühiti bələdçisi](https://docs.tamga.network/guides/sandbox).
- **Dövlət qurumu və ya dövlət:** [Dövlətlər üçün](/learn/for-states) və [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework).
- **Sıfırdan başlayanlar:** Öyrənmə bölməsində [Tamga Network nədir?](/learn/what-is-tamga-network).

## Tez-tez verilən suallar

### Tamga Network diplomumu və ya şəxsiyyət məlumatlarımı saxlayırmı?

Xeyr. Rəqəmsal sənədlər qurumdan şəxsin telefonuna ötürülür. Siyahılarda yalnız qurum adları, sertifikat barmaq izləri, statuslar, tarixlər və ünvanlar olur: heç bir fərdi məlumat və rəqəmsal sənəd heşi yoxdur.

### Tamga Wallet-dan istifadə etmək məcburidirmi?

Xeyr. Şəbəkənin rəqəmsal cüzdan qaydalarına əməl edən və provayderi siyahıda olan istənilən rəqəmsal cüzdan Tamga rəqəmsal sənədlərini qəbul edə və təqdim edə bilər. Tamga Wallet şəbəkədəki rəqəmsal cüzdanlardan biridir, yeganəsi deyil.

### Hansı qurumların siyahıda olacağına kim qərar verir?

Qeydiyyatçı qurumları və hər birinin verə biləcəyi rəqəmsal sənəd növlərini qeydə alır. Hazırda Tamga bunu Türkiyə üçün müvəqqəti olaraq, dövlət adından həyata keçirir; dövlət öz siyahısını dərc etdikdə qərarı həmin dövlət verir. Şəbəkə diplom vermək üçün hüquqi səlahiyyət vermir; bu səlahiyyət qurumu tənzimləyən qanundan irəli gəlir.

### Başqa ölkədən verilmiş rəqəmsal sənəd qəbul edilə bilərmi?

Bəli, yoxlayan tərəfin ölkəsi digər ölkənin siyahısını tanıyırsa. Hər dövlət tanınma barədə qərarı müstəqil verir və bu yoxlama hər doğrulamada aparılır.

### Etibar siyahısını əldə etmək mümkün olmadıqda nə baş verir?

Yoxlayan tərəf heç vaxt "rədd edildi" deyil, "hazırda yoxlamaq mümkün deyil" cavabını qaytarır. İnfrastruktura əlçatan olmadığı üçün rəqəmsal sənəd saxta hesab edilmir.

## Mənbələr

- [Avropa İttifaqı (Aİ) etibar siyahıları brauzeri (Avropa Komissiyası)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Aİ Rəqəmsal Şəxsiyyət Cüzdanı: Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network sənədləri: etibar siyahıları və federasiya](https://docs.tamga.network/concepts/trust-lists)
- [ADR-0037: Tamga Network yalnız şəbəkədir](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network) · [Şəbəkəyə qoşulun](/join) · [Öyrənin](/learn/what-is-tamga-network)

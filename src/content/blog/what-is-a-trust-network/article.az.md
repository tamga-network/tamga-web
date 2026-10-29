---
title: Etibar şəbəkəsi nədir və Tamga Network nə edir?
slug: what-is-a-trust-network
description: "Etibar şəbəkəsi rəqəmsal sənədləri kimin verib kimin yoxlaya biləcəyini imzalanmış siyahılarla dərc edir. Tamga Network-un nə edib nə etmədiyini və haradan başlamaq lazım olduğunu izah edirik."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: network
draft: false
related: how-trust-lists-work, join-as-an-institution, network-as-a-foundation, why-no-blockchain-yet
---

<!-- Sources: tamga-network README (non-profit, foundation, runs no wallet, packages: 0.7.4 test release on npm, stable 1.0.0 when ready); ADR-0035 (EU-compatible, not "EUDI Wallet"; recognises wallets by rules), ADR-0037 K1 (the network's jobs: rules, trust, catalogue, open code, reference services, not sold), ADR-0042 (runs no wallet, lists them), ADR-0020 (no register of people, authentic source), ADR-0009 (ledger with ≥2 independent operators), ADR-0036 (external lists, none added yet), ADR-0038/0041 (sandbox, self-service test institutions); concepts/trust-lists, concepts/revocation (prefetching); SPEC-TRUST-0001 (TL11 no personal data; operator provisional, on_behalf_of); SPEC-API-0001 (C3, INDETERMINATE); guides/verify-on-server (ZK verification in the verifier package); sandbox guide (age-zk example verifier); ARF §8.3 (non-profit, foundation). Live: trust.tamga.network/tl-tr.json operator.status provisional, on_behalf_of "TR national authority (to be designated)" (checked 2026-10-08). External: EU trusted lists browser, EU ARF GitHub. -->

Etibar şəbəkəsi rəqəmsal sənədin həqiqi və həmin sənədi verməyə səlahiyyətli qurumdan gəldiyini heç kimə zəng etmədən yoxlamağa imkan verən ortaq qatdır. Tamga Network Türkiyə və türk dünyası üçün bu qatı qurur və Aİ-nin eIDAS 2.0 standartlarına söykənir. Qaydaları yazır, imzalanmış etibar siyahılarını dərc edir, sənəd növlərinin kataloqunu saxlayır, açıq mənbəli paketlər və istinad yoxlayan tərəfi təqdim edir, həmçinin test şəbəkəsi idarə edir. İnsanların sənədlərini saxlamır, cüzdan idarə etmir və kimin nəyi kimə göstərdiyini görmür.

## İmzalanmış sənədə şəbəkə niyə lazımdır?

Rəqəmsal imza sənədi müəyyən açarın imzaladığını sübut edir, amma həmin açarın kimə məxsus olduğunu sübut etmir. Etibarlı imzası olan diplom gələndə yoxlayan tərəfin qarşısında yenə iki sual qalır. İmzalayan həqiqətən universitetdirmi və diplom verməyə səlahiyyəti varmı?

Bu sualları hər qurum üçün ayrı-ayrılıqda cavablandırmaq qurumların sayı artdıqca işləməz olur. Hər işəgötürən bütün məktəblərin açarlarını öz faylında saxlamalı və bu faylı əllə aktual saxlamalı olardı. Etibar şəbəkəsi bu ayrı-ayrı faylların yerinə hamının eyni şəkildə oxuduğu, açıq və imzalanmış vahid cavab qoyur. Aİ də eyni problemi eyni ideya ilə həll edib. Avropa Komissiyası siyahılar siyahısını dərc edir, hər üzv dövlət isə öz milli siyahısını dərc edir ([Aİ etibar siyahıları](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)).

## Etibar şəbəkəsində kimlər iştirak edir?

Şəbəkədə üç rol var və üçü də eyni siyahıya baxır:

![Qurum verir, şəxs saxlayır, yoxlayan tərəf yoxlayır; üçü də eyni imzalı etibar siyahısına müraciət edir](/blog/what-is-a-trust-network/en/fig-ucgen.png)

- **Qurum (sənədi verən).** Universitet, xəstəxana, peşə palatası, dövlət qurumu və ya tədbir təşkilatçısı sənədi öz açarı ilə imzalayır. Bu açar qurumdan heç vaxt çıxmır.
- **Şəxs (sənəd sahibi).** Şəxs sənədi telefonundakı cüzdanda saxlayır və hansı sahələri paylaşacağına özü qərar verir.
- **Yoxlayan tərəf.** İşəgötürən, vebsayt və ya giriş qapısı imzanı yoxlayır, qurumu etibar siyahısında tapır və əvvəlcədən endirdiyi ləğv siyahısına baxır.

Şəbəkə bu üç tərəfin yanında dayanır, amma sənəd veriləndə və ya göstəriləndə araya girmir. Siyahı dərc olunduqdan sonra sənədin verilməsi və yoxlanılması birbaşa tərəflər arasında baş verir. Etibar şəbəkəsini platformadan fərqləndirən də budur.

## Tamga Network əslində nə edir?

Şəbəkənin altı vəzifəsi var və hamısı açıqdır ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)):

1. **Qaydalar.** Tamga ARF (Arxitektura və İstinad Çərçivəsi), Etibar Çərçivəsi (Trust Framework) və qaydalar topluları hər rolun nə etməli olduğunu müəyyən edir. Hər qayda nömrələnib və [arf.tamga.network](https://arf.tamga.network) ünvanında dərc olunur.
2. **İmzalanmış etibar siyahıları.** Siyahılar siyahısı və Türkiyə siyahısı qeydiyyatdakı qurumları və hər qurumun verə biləcəyi sənəd növlərini, qeydiyyatdakı yoxlayan tərəfləri və onların hər birinin istəyə biləcəyi sahələri, tanınmış cüzdan provayderlərini göstərir. Siyahılar `trust.tamga.network` ünvanında versiyalanmış, heşlərlə bir-birinə zəncirlənmiş və imzalanmış şəkildə dərc olunur. Necə işlədiklərini [İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work) yazısında izah etmişik.
3. **Sxem kataloqu.** Tələbə sənədi, diplom, tədbir bileti və şəxsiyyət sənədi kimi sənəd növləri `schemas.tamga.network` ünvanındakı açıq kataloqda bir dəfə müəyyən edilir. Beləliklə hər cüzdan və hər yoxlayan tərəf diplomu eyni şəkildə oxuyur.
4. **Açıq paketlər.** `@tamga-network/*` paketləri etibar siyahılarını, SD-JWT VC-ni, ISO mdoc-u, sənədin verilməsini, yoxlamanı, cüzdan nüvəsini və sıfır bilikli sübutları əhatə edir. Paketlər Apache-2.0 lisenziyalı açıq mənbəlidir və npm-də 0.7.4 test buraxılışı kimi dərc olunur. Sabit 1.0.0 versiyası hər şey hazır olanda çıxacaq. Test buraxılışlarında API dəyişə bilər.
5. **İstinad xidmətləri.** Etibar siyahısı nəşriyyatçısı və qeydiyyat aləti, Qurum Konsolu ilə birlikdə host edilən sənəd vermə xidməti, host edilən yoxlayan tərəf (Tamga Verify) və müvəqqəti şəxsiyyət xidməti bu qrupa daxildir. Bu xidmətlər şəbəkənin işləməsi və qurumların ona qoşula bilməsi üçün mövcuddur və satılmır.
6. **Sandbox.** [sandbox.tamga.network](https://sandbox.tamga.network) ünvanında real şəbəkədən tamamilə ayrı test şəbəkəsi işləyir. Bu şəbəkənin öz test kök sertifikatı, nümunə qurumları və uydurma şəxsləri var. Qurum orada bir neçə dəqiqə ərzində öz test qurumunu aça bilər.

![Tamga Network nə edir və nə etmir](/blog/what-is-a-trust-network/en/fig-yapar.png)

## Tamga Network nəyi bilərəkdən etmir?

Şəbəkənin hüdudları da vəzifələri qədər vacibdir və bu hüdudlar məcburi qaydalar kimi yazılıb.

**Sənəd saxlamır.** Sənədlər qurumun sistemindən birbaşa şəxsin telefonuna gedir. Şəbəkə şəxslərlə bağlı heç bir qeyd saxlamır. Sənəd verilərkən məlumatlar qurumun öz sistemindən, yəni səlahiyyətli mənbədən oxunur ([ADR-0020](https://docs.tamga.network/adr/0020-authentic-source-at-institution)). Heç bir siyahıda, jurnalda və ya reyestrdə fərdi məlumat, sənədin məzmunu, hətta sənədin heşi belə olmur.

**Cüzdan idarə etmir.** Şəbəkə cüzdanları yalnız siyahıya alır və heç bir cüzdanın tətbiqini, cüzdan provayderini və ya saytını idarə etmir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)). Dərc olunmuş qaydalara əməl edən və uyğunluq testlərindən keçən hər cüzdan siyahıya düşə bilər. Şəbəkədəki ilk cüzdan olan [Tamga Wallet](https://tamgawallet.com/en) ayrıca məhsuldur və siyahıya digər cüzdanlarla eyni yolla daxil olur. Onun provayderinin qeydi 14 oktyabr 2026-cı ildən aktivdir.

**Kimin nəyi kimə göstərdiyini görmür.** Yoxlayan tərəflər ləğv siyahılarını əvvəlcədən endirib keşdə saxlayır. Ona görə yoxlama anında nə quruma, nə də şəbəkəyə sorğu getmir. Qurum sənədlərinin harada göstərildiyini öyrənə bilmir, biz də öyrənə bilmirik.

**Dövlətin yerinə qərar vermir.** Hər dövlət öz siyahısının yeganə müəllifidir. Bu gün Türkiyə siyahısını Tamga milli orqan adından müvəqqəti olaraq dərc edir və siyahı bunu `operator` sahəsində açıq yazır. Dövlət öz siyahısını dərc edəndə şəbəkənin siyahılar siyahısı həmin siyahını göstərəcək. Bu dəyişiklik sənədlərə və cüzdanlara təsir etməyəcək.

**Heç nə satmır.** Tamga Network qeyri-kommersiya şəbəkəsidir və onun idarə olunması gələcəkdə fonda veriləcək. İnteqrasiya, dəstək və məsləhət kimi xidmətləri şəbəkədən kənardakı şirkətlər göstərir və bu şirkətlərin hamısı şəbəkəyə eyni şərtlərlə qoşulur.

## Tamga Network-un Aİ rəqəmsal şəxsiyyət cüzdanı ilə əlaqəsi nədir?

Tamga Network eyni əsas komponentlərdən istifadə edir. Sənədlər üçün SD-JWT VC və ISO/IEC 18013-5 mdoc, sənədin verilməsi və təqdim olunması üçün HAIP profili ilə birlikdə OpenID4VCI və OpenID4VP, ləğv üçün IETF Token Status List, qurumlar üçün X.509 sertifikatları və ETSI formatlarına uyğunlaşdırılmış etibar siyahıları istifadə olunur. Bunlar Aİ-nin Arxitektura və İstinad Çərçivəsində göstərilən formatlardır ([Aİ ARF, GitHub](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)).

Tamga-nın istifadə edə bilməyəcəyi şey isə statusdur. "EUDI Wallet" Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı cüzdanlara verilən hüquqi statusdur. Aİ-dən kənardakı şəbəkə və ya cüzdan isə Aİ ilə uyğun ola bilər, yəni eyni standartlardan istifadə edə və bunu testlərlə sübut edə bilər. Tamga da özünü məhz belə təsvir edir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

Ölkə siyahıları başqa siyahılarla yanaşı istifadə oluna biləcək şəkildə qurulub. Başqa dövlətin və ya Aİ-nin ETSI formatındakı siyahısı imzalayanı sabitlənərək və əhatə dairəsi müəyyən edilərək şəbəkənin siyahılar siyahısına əlavə edilə bilər və hər əlavə ayrıca təsdiq tələb edir ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). İndiyədək belə siyahı əlavə edilməyib.

## Tamga Network blokçeyndirmi?

Xeyr. Bu gün etibar lövbəri imzalanmış, versiyalanmış və heşlərlə bir-birinə zəncirlənmiş siyahılardan və saatda ən azı bir dəfə yazılan açıq lövbər jurnalından ibarətdir. Aİ modeli də belə işləyir. İcazəli reyestr yalnız ən azı iki müstəqil operator qoşulanda əlavə ediləcək, çünki bir operatorun saxladığı reyestr yeni etibar yaratmır. Siyahılardakı hər sahə artıq reyestr qeydinə uyğun gəlir, ona görə keçid cüzdanlar və yoxlayan tərəflər üçün heç nəyi dəyişməyəcək. Səbəblərini [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet) yazısında izah etmişik.

## Bu gün nə işləyir, nə işləmir?

| Hissə | 23 oktyabr 2026-cı il tarixinə vəziyyəti |
|---|---|
| İmzalanmış etibar siyahıları və lövbər jurnalı | `trust.tamga.network` ünvanında işləyir |
| Sxem kataloqu | `schemas.tamga.network` ünvanında işləyir |
| Host edilən yoxlayan tərəf (Tamga Verify) | `verify.tamga.network` ünvanında işləyir |
| Sıfır bilikli yaş yoxlaması | Tamga Verify-da işləyir (`age-over-18-zk` siyasəti); cüzdan tərəfində Android sübut kitabxanası hazırdır, iOS gözlənilir |
| Qurumların öz test qurumunu aça bildiyi sandbox | `sandbox.tamga.network` ünvanında işləyir |
| Real siyahıdakı cüzdan provayderləri | 14 oktyabr 2026-cı ildən bəri bir aktiv qeyd (Tamga Wallet-in qeydi) |
| `@tamga-network/*` paketləri | npm-də 0.7.4 test buraxılışı; sabit 1.0.0 hər şey hazır olanda |
| Xarici siyahılar (digər dövlətlər, Aİ) | layihələndirilib; hələ əlavə edilən yoxdur |
| Ortaq reyestr | ikinci müstəqil operatoru gözləyir |

Test və nümayiş qurumları yalnız sandbox-da yerləşir. Sandbox-da alınmış sənəd real yoxlayan tərəfdən keçə bilməz, çünki real şəbəkə sandbox-ın kök sertifikatını tanımır.

## Haradan başlamalı?

- **Sənəd vermək istəyən qurum:** [Qurum Tamga Network-a necə qoşulur?](/blog/join-as-an-institution) yazısından başlayıb [Şəbəkəyə qurum kimi qoşulun](https://docs.tamga.network/guides/join-as-institution) adlı tərtibatçı bələdçisinə keçə bilər.
- **Sənədləri yoxlamaq istəyən sayt və ya tətbiq:** [Saytınıza və ya tətbiqinizə "Tamga ilə yoxla" əlavə edin](/blog/add-verification-to-your-site) yazısını oxuya bilər.
- **Cüzdan hazırlayan komanda:** [cüzdan bələdçisinə](https://docs.tamga.network/guides/build-a-wallet) və [sandbox bələdçisinə](https://docs.tamga.network/guides/sandbox) baxa bilər.
- **Dövlət qurumu və ya dövlət:** [Dövlətlər üçün](/learn/for-states) səhifəsini və [Etibar Çərçivəsini](https://arf.tamga.network/trust-framework) oxuya bilər.
- **Mövzuya sıfırdan başlayan:** Öyrən bölməsindəki [Tamga Network nədir?](/learn/what-is-tamga-network) səhifəsindən başlaya bilər.

## Tez-tez verilən suallar

### Tamga Network diplomumu və ya şəxsiyyət məlumatlarımı saxlayırmı?

Xeyr. Sənəd qurumdan birbaşa şəxsin telefonuna gedir. Siyahılarda yalnız qurum adları, sertifikat barmaq izləri, statuslar, tarixlər və ünvanlar olur. Fərdi məlumat və ya sənəd heşi siyahılarda yer almır.

### Tamga Wallet-dən istifadə etmək məcburidirmi?

Xeyr. Şəbəkənin cüzdan qaydalarına əməl edən və provayderi siyahıda qeydiyyatda olan hər cüzdan Tamga sənədlərini ala və göstərə bilər. Tamga Wallet şəbəkədəki cüzdanlardan yalnız biridir.

### Hansı qurumların siyahıda olacağına kim qərar verir?

Qeydiyyat orqanı qurumları və hər qurumun verə biləcəyi sənəd növlərini qeydə alır. Bu gün bu işi Türkiyə üçün dövlət adından müvəqqəti olaraq Tamga görür. Dövlət öz siyahısını dərc edəndə qərar həmin dövlətə keçəcək. Diplom vermək hüququnu şəbəkə vermir, bu hüquq qurumun tabe olduğu qanundan gəlir.

### Başqa ölkənin sənədi qəbul edilə bilərmi?

Yoxlayan tərəfin ölkəsi həmin ölkənin siyahısını tanıyırsa, qəbul edilir. Tanınma qərarını hər dövlət özü verir və bu yoxlama hər dəfə aparılır.

### Etibar siyahısını həmin an əldə etmək mümkün olmasa, nə baş verir?

Yoxlayan tərəf "hazırda yoxlamaq mümkün olmadı" nəticəsini verir və sənədi rədd etmir. İnfrastruktura çatmaq mümkün olmadığı üçün heç bir sənəd saxta sayılmır.

## Mənbələr

- [Avropa İttifaqı (Aİ) etibar siyahıları brauzeri (Avropa Komissiyası)](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Aİ Rəqəmsal Şəxsiyyət Cüzdanı: Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Tamga Network sənədləri: etibar siyahıları və federasiya](https://docs.tamga.network/concepts/trust-lists)
- [ADR-0037: Tamga Network yalnız şəbəkədir](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ARF](https://arf.tamga.network) · [Şəbəkəyə qoşulun](/join) · [Öyrənin](/learn/what-is-tamga-network)

---
title: "eIDAS 2.0 və ARF: Türk dünyası üçün nə deməkdir?"
slug: eidas-arf-for-the-turkic-world
description: "Aİ-nin eIDAS 2.0 və istinad çərçivəsi ilə nə qurduğunu, bunun nə vaxtdan tətbiq olunduğunu, Aİ-dən kənar dövlətlər üçün niyə vacib olduğunu və hüdudlarını izah edirik."
date: 2026-10-08
lang: az
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Sources: Regulation (EU) 2024/1183 (EUR-Lex, checked 2026-10-08): adopted 11.4.2024, OJ 30.4.2024, in force 20.5.2024; amended Regulation 910/2014 Art. 5a (wallets; 5a(1) 24 months after the implementing acts; 5a(2) provided by, under mandate from or recognised by a member state), 5b (wallet-relying parties: registration), 5c (certification), 5d (list of certified wallets), 5f (cross-border reliance; 5f(2) 36 months), 14(1) (third-country trust services recognised as equivalent to qualified trust services through implementing acts or an agreement under Art. 218 TFEU), 22 (trusted lists), 45b-45h (electronic attestations of attributes, qualified, public-sector). Implementing Regulations (EUR-Lex headers): 2024/2977 PID and EAA, 2024/2979 integrity and core functionalities, 2024/2980 notifications on the wallet ecosystem, 2024/2981 certification, 2024/2982 protocols and interfaces (all 28.11.2024, OJ 4.12.2024; note 2024/2978 is unrelated); 2025/848 registration of wallet-relying parties and 2025/849 list of certified wallets (6.5.2025, OJ 7.5.2025); 2025/1569 QEAA and public-sector EAA (29.7.2025, OJ 30.7.2025); 2026/1731 amending 2024/2977, 2979, 2980, 2982 as regards standards and specifications (15.7.2026, OJ 22.7.2026). EU ARF v3.0.0 GitHub release 2026-07-23. Commission page "EUDI Wallet implementation": four large-scale pilots (EWC, POTENTIAL, NOBID, DC4EU) launched April 2023, over 350 entities from 26 member states, Norway, Iceland and Ukraine. Second-wave pilots WE BUILD and APTITUDE (2025): public consortium pages and press. ETSI TS 119 602 (LoTE). OTS: Digital Economy Partnership Agreement signed 6.11.2024 in Bishkek, Türkiye's ratification law in the Official Gazette 23.6.2026 (press); Turkistan informal summit 15.5.2026, declaration calls for completing consideration of a draft Agreement on the Mutual Recognition of Electronic Digital Signatures (press; OTS PDF not machine-readable from here). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3 (TDT member and observer slots), §1.4 (Art. 14), §6 (three interoperability levels), §6.1 (external lists, LoTE); ADR-0035 (EU-compatible, PO1-PO4), ADR-0036 (external lists; none added); live lotl.json (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved), checked 2026-10-08. -->

eIDAS 2.0 Avropa İttifaqının (Aİ) hər bir üzv dövləti 2026-cı ilin sonunadək rəqəmsal şəxsiyyət cüzdanı təqdim etməyə borclu edən reqlamentidir. Arxitektura və İstinad Çərçivəsi (Architecture and Reference Framework, ARF) isə bu reqlamentin arxasında dayanan texniki plandır. İkisi birlikdə tam etibar sistemini müəyyən edir. Bu sistemə cüzdan, dövlətin verdiyi şəxsiyyət məlumatları, diplom kimi attestasiyalar, imzalanmış etibar siyahıları, məlumat istəyən hər xidmətin qeydiyyatı və sertifikatlaşdırma daxildir. Reqlament Türk dünyasına şamil edilmir, amma onun standartları Aİ-dəki bankların, universitetlərin və işəgötürənlərin oxuyacağı ortaq dilə çevrilir. Aİ-dən kənar dövlət bu dili indidən qəbul edə bilər. Aİ-nin bu sənədləri tanıması isə ayrıca addımdır və həmin addımı hökumətlər atır.

## Aİ eIDAS 2.0 ilə nə qurdu?

eIDAS 2.0 adı ilə tanınan (Aİ) 2024/1183 saylı Reqlament 2014-cü il eIDAS reqlamentini dəyişir ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014-cü il mətni daha çox milli elektron şəxsiyyət sistemləri və elektron imza ilə bağlı idi. 2024-cü il mətni bunlara telefondakı cüzdan ətrafında qurulan bütöv ekosistem əlavə edir. Bu ekosistem altı əsas komponentə söykənir:

![eIDAS 2.0-ın altı əsas komponenti: rəqəmsal cüzdan, PID, attestasiyalar, etibar siyahıları, etibar edən tərəflərin qeydiyyatı, sertifikatlaşdırma](/blog/eidas-arf-for-the-turkic-world/en/fig-yapi-taslari.png)

| Komponent | Nə işə yarayır | Hüquqi əsas |
|---|---|---|
| **Avropa Rəqəmsal Şəxsiyyət Cüzdanı** | Şəxsin şəxsiyyət məlumatlarını və sənədlərini saxlayan və onları şəxsin nəzarəti altında paylaşan tətbiq | Mad. 5a |
| **PID** (şəxsi identifikasiya məlumatları) | Dövlətin və ya dövlət adından bir qurumun yüksək etibarlılıq səviyyəsində verdiyi əsas şəxsiyyət məlumatları | Mad. 5a, İcra Reqlamenti 2024/2977 |
| **Atributların elektron attestasiyaları** | Diplom, lisenziya, üzvlük kimi qalan bütün sənədlər. *Kvalifikasiyalı* attestasiyanı (QEAA) kvalifikasiyalı etibar xidməti provayderi, dövlət sektorunun attestasiyasını (PuB-EAA) isə səlahiyyətli mənbəyə cavabdeh dövlət qurumu verir | Mad. 45b–45h, İcra Reqlamenti 2025/1569 |
| **Etibar siyahıları** | Hansı provayderə hansı iş üçün etibar edildiyini göstərən imzalanmış siyahılar | Mad. 22; ETSI TS 119 612 və ETSI TS 119 602 |
| **Etibar edən tərəfin qeydiyyatı** | Cüzdandan məlumat istəmək istəyən hər xidmət üzv dövlətdə qeydiyyatdan keçir və nəyi, niyə istəyəcəyini bəyan edir | Mad. 5b, İcra Reqlamenti 2025/848 |
| **Sertifikatlaşdırma** | Cüzdanlar istifadəyə verilməzdən əvvəl uyğunluğu qiymətləndirən orqanlar tərəfindən sertifikatlaşdırılır | Mad. 5c, İcra Reqlamenti 2024/2981 |

Bu cədvəldə iki məqam asanlıqla diqqətdən yayına bilər. Sistemi sərhədlərdən o yana işlədən etibar siyahılarıdır. Bir ölkədəki yoxlayan tərəfin başqa ölkədəki hər universitetlə ayrıca razılaşma bağlamasına ehtiyac yoxdur, çünki bir imzalanmış siyahını oxumaq kifayətdir ([imzalanmış etibar siyahısı necə işləyir](/blog/how-trust-lists-work)). Etibar edən tərəfin qeydiyyatı da şəxsi ən azı imza qədər qoruyur. Cüzdan xidmətin istədiyi sahələri onun qeydiyyatda bəyan etdikləri ilə müqayisə edə bilir və artığı istənəndə şəxsi xəbərdar edir.

## ARF nədir və reqlamentlə əlaqəsi nədir?

Reqlament öhdəlikləri müəyyən edir. İcra reqlamentləri texniki təfərrüatları tənzimləyir və standartlara istinad edir. ARF isə bunların hamısını vahid arxitekturada birləşdirən istinad sənədidir. Rolları, axınları, məlumat modelini, etibar modelini, hər rol üçün yüksək səviyyəli tələbləri və hər sənəd növünün qaydalar kitabını (rulebook) burada tapırsınız. Avropa Komissiyası ARF-ni GitHub-da açıq şəkildə dərc edir. Cari versiya 3.0.0-dır və 23 iyul 2026-cı ildə buraxılıb ([ARF buraxılışı](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Bu quruluşun altında hər kəsin istifadə edə biləcəyi açıq standartlar dayanır. Sənədlər üçün IETF SD-JWT VC və ISO/IEC 18013-5 mdoc, sənədlərin verilməsi və təqdim olunması üçün HAIP profili ilə birlikdə OpenID4VCI və OpenID4VP, ləğv üçün IETF Token Status List, qurumlar üçün X.509 sertifikatları və ETSI-nin etibar siyahısı formatları istifadə olunur. ETSI TS 119 602 etibarlı subyektlərin siyahılarını (LoTE, lists of trusted entities) müəyyən edir. Cüzdan provayderləri, PID provayderləri və kvalifikasiyalı etibar xidməti provayderi olmayan digər subyektlər üçün istifadə edilən JSON siyahı formatı da budur ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartların heç biri yalnız Aİ ilə məhdudlaşmır və Aİ-dən kənarda olanlar üçün imkan da məhz burada yaranır.

## Hər hissə nə vaxtdan tətbiq olunur?

![2024-cü ildəki reqlamentdən 2027-ci ilin sonunda rəqəmsal cüzdanları qəbul etmək öhdəliyinə qədər eIDAS 2.0 xronologiyası](/blog/eidas-arf-for-the-turkic-world/en/fig-takvim.png)

| Tarix | Hadisə | Mənbə |
|---|---|---|
| 20 may 2024 | (Aİ) 2024/1183 saylı Reqlament qüvvəyə minir | Reqlamentin 2-ci maddəsi |
| 24 dekabr 2024 | İlk beş icra reqlamenti qüvvəyə minir: 2024/2977 (PID və attestasiyalar), 2024/2979 (cüzdanın bütövlüyü və əsas funksiyaları), 2024/2980 (bildirişlər), 2024/2981 (sertifikatlaşdırma), 2024/2982 (protokollar və interfeyslər) | qəbul: 28 noyabr 2024, dərc: 4 dekabr 2024 |
| 7 may 2025 | 2025/848 (etibar edən tərəflərin qeydiyyatı) və 2025/849 (sertifikatlaşdırılmış cüzdanların siyahısı) dərc olunur | qəbul: 6 may 2025 |
| 30 iyul 2025 | 2025/1569 (kvalifikasiyalı və dövlət sektoru attestasiyaları) dərc olunur | qəbul: 29 iyul 2025 |
| 22 iyul 2026 | İlk aktlardan dördünün istinad etdiyi standartları yeniləyən 2026/1731 dərc olunur | qəbul: 15 iyul 2026 |
| 23 iyul 2026 | ARF 3.0.0 buraxılır | GitHub |
| 2026-cı ilin sonu | Hər üzv dövlət ən azı bir cüzdan təqdim edir | Maddə 5a(1): icra aktlarından 24 ay sonra |
| 2027-ci ilin sonu | Gücləndirilmiş autentifikasiyadan istifadə etməli olan özəl xidmətlər (bankçılıq, nəqliyyat, enerji, səhiyyə, təhsil, telekommunikasiya və digərləri) istifadəçi istəyəndə cüzdanı qəbul edir | Maddə 5f(2): 36 ay |

Yoxlayan tərəflər üçün ən vacib sətir sonuncusudur. 2027-ci ilin sonundan etibarən Aİ-dəki bank şəxs istəsə, cüzdanla aparılan identifikasiyanı qəbul etməyə borclu olacaq. Eyni tarixlərin addım-addım izahını [Avropa xronologiyası](/learn/eu-timeline) səhifəsində tapa bilərsiniz.

## Son tarixdən əvvəl necə sınaqdan keçirildi?

Komissiya ARF-ni real xidmətlərdə işlədən genişmiqyaslı pilot layihələri maliyyələşdirdi. Onlardan dördü 2023-cü ilin aprelində başladı. EWC səyahət sənədlərini, POTENTIAL dövlət xidmətlərini, bankçılığı, telekommunikasiyanı, sürücülük vəsiqələrini, imzanı və səhiyyəni, NOBID ödənişləri, DC4EU isə təhsili və sosial təminatı sınaqdan keçirdi. Komissiyanın məlumatına görə bu pilotlar 26 üzv dövlətdən, Norveçdən, İslandiyadan və Ukraynadan 350-dən çox dövlət və özəl təşkilatı bir araya gətirdi ([Komissiya: EUDI Wallet tətbiqi](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). WE BUILD və APTITUDE adlı daha iki pilot 2025-ci ildə başladı.

Bu siyahıda Ukraynanın da olması diqqətəlayiqdir, çünki Aİ-dən kənar ölkə sistemi üzv dövlətlərlə birlikdə sınaqdan keçirmiş oldu. Pilot layihələrdə iştirak hüquqi tanınma yaratmır, amma texniki işin qonşu ölkələrə açıq olduğunu göstərir. DC4EU təhsil sənədlərini də sınaqdan keçirdi. Türk dövlətləri ilə Avropa arasında gedib-gələn tələbələr və məzunlar üçün ən vacib sənədlər də məhz bunlardır.

## Aİ-dən kənar ölkə üçün uyğunlaşma niyə vacibdir?

İnsanlar, mallar və diplomlar sərhədi onsuz da keçir və sərhədin bir tərəfində sənədlər tezliklə rəqəmsal olacaq. Bunun təsiri ən çox üç sahədə görünür:

- **Təhsil.** Bişkekdən olan məzun Almaniyada magistratura proqramına müraciət edir. Diplomu Aİ-nin istifadə etdiyi formatda imzalanmış sənəddirsə, qəbul ofisinin proqramı onu saniyələr ərzində yoxlayır. Diplom skan edilmiş PDF-dirsə, kimsə e-poçt yazıb cavab gözləməli olur.
- **İş və mobillik.** Daşkənddən olan mühəndis Münhenə köçür. Aİ-dəki işəgötürənlər və banklar cüzdandakı sənədləri oxumağa hazırlaşır. Eyni formatdakı sənəd də bu prosesə birbaşa daxil ola bilər.
- **Ticarət.** Bakıdakı şirkət qeydiyyatını, lisenziyalarını və ya sertifikatlarını Aİ-dəki tərəfdaşına sübut edir. Şəxsi sənədləri daşıyan siyahılar və formatlar şirkət sənədlərini də daşıya bilər.

Bu nümunələrin hər birində iki ayrı şərt ödənməlidir. Sənədin *oxuna bilən* olması formatlardan və protokollardan asılıdır. Sənədi verənin *etibarlı* sayılması isə siyahılardan və tanınmadan asılıdır. Tamga Trust Framework buna görə qarşılıqlı uyğunluğu üç səviyyəyə ayırır:

![Qarşılıqlı uyğunluğun üç səviyyəsi: portativlik və etibar texniki, hüquqi tanınma isə siyasi məsələdir](/blog/eidas-arf-for-the-turkic-world/en/fig-uc-seviye.png)

1. **Portativlik.** İki tərəf eyni formatlardan və protokollardan istifadə edir, beləliklə Aİ cüzdanı və ya yoxlayan tərəfi sənədi texniki cəhətdən emal edə bilir. Bu səviyyəyə bu gün mühəndislik işi ilə çatmaq olar.
2. **Etibar.** Etibar siyahıları bir-birinə istinad edir və hər siyahı yalnız müəyyən əhatə dairəsi üçün zəmanət verə bilər. Bu səviyyə də texnikidir, amma hər iki tərəf hansı siyahıya etibar edəcəyinə qərar verməlidir.
3. **Hüquqi tanınma.** Dövlət və ya Aİ başqa tərəfin sənədlərini hüquqi nəticə doğuran sənəd kimi qəbul edir. Bu qərarı hökumətlər qanun və ya saziş yolu ilə verir.

İlk iki səviyyə üçüncüdən əvvəl qurula bilər və erkən başlamağın mənası da budur. İki hökumət bir-birinin sənədlərini tanımağa qərar verəndə həmin sənədləri daşıyan sistemlər artıq uyğun olur. Beləliklə heç kim yalnız format dəyişdiyinə görə diplomunu yenidən almalı olmur.

## Türk dünyası rəqəmsal etibar sahəsində bu gün nə edir?

Türk Dövlətləri Təşkilatı rəqəmsal əməkdaşlığı gündəminə salıb. Üzv dövlətlər 6 noyabr 2024-cü ildə Bişkek sammitində Rəqəmsal İqtisadiyyat Tərəfdaşlığı Sazişini imzaladı. Saziş elektron ticarəti, kağızsız ticarəti, elektron imzanı, məlumatların qorunmasını və kibertəhlükəsizliyi əhatə edir. Türkiyənin təsdiq qanunu da 2026-cı ilin iyununda Rəsmi Qəzetdə dərc olundu ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 15 may 2026-cı ildə Türküstanda keçirilən qeyri-rəsmi sammitin mövzusu süni intellekt və rəqəmsal inkişaf idi. Mətbuatın yazdığına görə sammit bəyannaməsi üzv dövlətləri elektron rəqəmsal imzaların qarşılıqlı tanınması haqqında saziş layihəsinin nəzərdən keçirilməsini başa çatdırmağa çağırır. Qazaxıstan Prezidenti də rəqəmsal imzaların və elektron sənədlərin qarşılıqlı tanınmasını təklif etdi ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

İmzaların qarşılıqlı tanınması yuxarıdakı modelin hüquqi səviyyəsinə uyğun gəlir. Ortaq etibar qatı isə onun altındakı texniki səviyyədir. Tamga Network-un Türk Dövlətləri Təşkilatı və ya onun üzv dövlətlərindən hər hansı biri ilə sazişi yoxdur. Texniki səviyyəni dövlətlər istifadə etmək istəyəndə hazır olsun deyə qururuq.

## Tamga Network Aİ modelindən nəyi götürür?

Tamga Network Aİ modelinin texniki qatını olduğu kimi götürür. Qaydamız sənəd, protokol və etibar siyahısı formatlarının Aİ standartlarından ayrılmamasıdır. Tamga-ya xas hər əlavə standartın təklif etdiyi genişlənmə nöqtəsi vasitəsilə edilir və standart müştəriləri pozmur ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

| Aİ elementi | Tamga Network-da |
|---|---|
| SD-JWT VC və ISO mdoc | eynidir; şəxsiyyət sənədləri hər iki formatda |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | eynidir |
| Token Status List | eynidir |
| LOTL və milli etibar siyahıları | eyni iki səviyyəli model; hər türk dövləti üçün ayrıca yer |
| LoTE (ETSI TS 119 602) | xarici siyahılar üçün ilk oxunan format |
| Etibar edən tərəflərin (relying party) qeydiyyatı və qeydiyyat sertifikatları | Aİ-nin ümumi qeydiyyat məlumat dəsti və sertifikat modeli |
| ARF rollar dəsti | hər rolun, boş olsa belə, hər milli siyahıda yeri var |

İdarəetmə qatını isə Türk dünyası üçün yazırıq. Hər dövlət öz siyahısının yeganə müəllifidir və dövlətlər arasında tanınmaya hər dövlət özü qərar verir. Uyğunluğun tam xəritəsini və Tamga qaydalarının Aİ qaydalarından harada, niyə fərqləndiyini [Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq](/blog/tamga-arf) yazısında izah etmişik.

Şəbəkənin siyahılar siyahısında artıq Türk Dövlətləri Təşkilatının hər üzv dövləti və iki müşahidəçi dövlət üçün ayrılmış yer var və hər dövlət öz siyahısını təhvil ala bilər ([şəbəkə niyə fonda veriləcək](/blog/network-as-a-foundation)). Hazırda yalnız Türkiyə siyahısı aktivdir. Tamga bu siyahını milli orqan adından müvəqqəti olaraq dərc edir və siyahının özü də bunu göstərir. Digər yerlər ayrılmış vəziyyətdədir. Canlı siyahını `trust.tamga.network` ünvanında oxuya bilərsiniz.

## Dürüst məhdudiyyətlər hansılardır?

- **Tamga Network Aİ tərəfindən tanınmayıb.** Şəbəkə Aİ ilə uyğundur, yəni eyni standartlardan istifadə edir və bunu testlərlə göstərir. "EUDI Wallet" isə üzv dövlətin təqdim etdiyi və ya tanıdığı və Aİ qaydalarına əsasən sertifikatlaşdırılmış cüzdanlara verilən hüquqi statusdur. Aİ-dən kənarda heç bir şəbəkə və ya cüzdan bu gün bu statusdan istifadə edə bilməz.
- **Reqlamentdə qısa yol yoxdur.** eIDAS-ın 14-cü maddəsi üçüncü ölkədəki etibar xidmətlərinin Aİ-dəki kvalifikasiyalı etibar xidmətlərinə ekvivalent sayılmasına icazə verir. Bunun üçün isə ya Aİ icra aktı, ya da Aİ ilə həmin ölkə arasında Aİ-nin Fəaliyyəti haqqında Müqavilənin (TFEU) 218-ci maddəsinə əsasən bağlanmış saziş lazımdır. Bu, hökumətlər arasında aparılan danışıqlardır. Tamga texniki tərəfi hazırlaya bilər, amma bu prosesi başlada və ya yekunlaşdıra bilməz.
- **Hələ heç bir xarici siyahı əlavə edilməyib.** Başqa dövlətin və ya Aİ-nin siyahısını imzalayanı sabitlənmiş və əhatə dairəsi müəyyən edilmiş şəkildə göstərməyə imkan verən mexanizm hazırdır ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Amma hər əlavə ayrıca və qeydə alınan qərar tələb edir və indiyədək belə qərar verilməyib.
- **Etibar lövbəri bu gün bir operatora söykənir.** Siyahılar imzalanır, versiyalanır və açıq jurnalda qeydə alınır. Yenə də ikinci müstəqil operator qoşulana qədər şəbəkə tək imzaya söykənir və çərçivə bunu məlum məhdudiyyət kimi qeyd edir ([Tamga ARF](https://arf.tamga.network/architecture)).
- **Türk dövlətləri arasında tanınma da siyasi qərardır.** Qazaxıstandakı yoxlayan tərəfin Türkiyədəki universitetə etibar edib-etməyəcəyinə Qazaxıstan qərar verir. Şəbəkə bu qərarın proqram təminatında asanlıqla ifadə olunmasını və tətbiq edilməsini təmin edir, amma qərarı özü vermir.

## Tez-tez verilən suallar

### eIDAS 2.0 Türkiyəyə və ya Mərkəzi Asiya dövlətlərinə şamil olunurmu?

Xeyr. Reqlament Aİ üzv dövlətlərini və onun Aİ daxilində əhatə etdiyi xidmətləri bağlayır. Standartları isə açıqdır və istənilən dövlət və ya qurum onlardan istifadə edə bilər. Aİ daxilində xidmət göstərən şirkətlər öz öhdəliklərini hüquqşünasla dəqiqləşdirməlidir.

### Türkiyədə verilmiş sənəd Aİ-də qəbul oluna bilərmi?

Sənəd eyni formatlardan istifadə edirsə, Aİ-dəki proqramlar onu oxuya bilər və Tamga sənədləri bu formatlardan istifadə edir. Sənədin hüquqi nəticə doğuracaq şəkildə etibarlı sayılması üçün isə onu verən qurum tanınmalıdır. Bu tanınma etibar siyahıları ilə, kvalifikasiyalı status üçün isə 14-cü maddəyə əsasən saziş və ya icra aktı ilə təmin olunur.

### Reqlament ilə ARF arasında fərq nədir?

Reqlament və icra aktları hüquqi mətnlərdir. ARF isə Komissiyanın hazırladığı texniki istinad sənədidir və bu aktların söykəndiyi arxitekturanı, rolları və tələbləri təsvir edir. Cari versiya 23 iyul 2026-cı ildə buraxılmış 3.0.0-dır.

### Tamga Network Türk Dövlətləri Təşkilatı ilə əməkdaşlıq edirmi?

Xeyr. Təşkilatla və ya onun üzv dövlətləri ilə sazişimiz yoxdur. Şəbəkə bu dövlətlərin hər biri üçün siyahıda yer ayırır və hər dövlətin öz siyahısını istədiyi vaxt təhvil ala biləcəyi şəkildə qurulub.

### Tanınma hökumətlərdən asılıdırsa, niyə indidən qururuq?

Texniki səviyyələri qurmaq vaxt aparır və bu iş siyasi qərardan asılı deyil. Bu səviyyələr hazır olsa, sonradan verilən tanınma qərarı insanların əlindəki sənədlərə onları yenidən vermədən tətbiq oluna bilər.

## Mənbələr

- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): Maddə 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h
- İcra Reqlamentləri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [EUDI Wallet (rəqəmsal cüzdan) Arxitektura və İstinad Çərçivəsi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Avropa Komissiyası: EUDI Wallet (rəqəmsal cüzdan) tətbiqi və genişmiqyaslı pilot layihələr](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [Aİ etibar siyahıları brauzeri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDT Rəqəmsal İqtisadiyyat Tərəfdaşlığı Sazişi](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türküstan qeyri-rəsmi sammiti](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework) · [ADR-0035: mövqeləndirmə](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: etibar federasiyası](https://docs.tamga.network/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Dövlətlər üçün](/learn/for-states) · [Manifest](/manifesto)

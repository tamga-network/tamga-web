---
title: "eIDAS 2.0 və ARF: Türk dünyası üçün nə deməkdir"
slug: eidas-arf-for-the-turkic-world
description: "Aİ-nin eIDAS 2.0 və onun istinad çərçivəsi ilə nə qurduğu, nə vaxtdan tətbiq olunduğu, uyğunlaşmanın Aİ-dən kənar dövlətlər üçün niyə vacib olduğu və hüdudları."
date: 2026-10-08
lang: az
category: europe
draft: false
related: tamga-arf, how-trust-lists-work, network-as-a-foundation, learn:eidas, learn:for-states
---

<!-- Sources: Regulation (EU) 2024/1183 (EUR-Lex, checked 2026-10-08): adopted 11.4.2024, OJ 30.4.2024, in force 20.5.2024; amended Regulation 910/2014 Art. 5a (wallets; 5a(1) 24 months after the implementing acts; 5a(2) provided by, under mandate from or recognised by a member state), 5b (wallet-relying parties: registration), 5c (certification), 5d (list of certified wallets), 5f (cross-border reliance; 5f(2) 36 months), 14(1) (third-country trust services recognised as equivalent to qualified trust services through implementing acts or an agreement under Art. 218 TFEU), 22 (trusted lists), 45b-45h (electronic attestations of attributes, qualified, public-sector). Implementing Regulations (EUR-Lex headers): 2024/2977 PID and EAA, 2024/2979 integrity and core functionalities, 2024/2980 notifications on the wallet ecosystem, 2024/2981 certification, 2024/2982 protocols and interfaces (all 28.11.2024, OJ 4.12.2024; note 2024/2978 is unrelated); 2025/848 registration of wallet-relying parties and 2025/849 list of certified wallets (6.5.2025, OJ 7.5.2025); 2025/1569 QEAA and public-sector EAA (29.7.2025, OJ 30.7.2025); 2026/1731 amending 2024/2977, 2979, 2980, 2982 as regards standards and specifications (15.7.2026, OJ 22.7.2026). EU ARF v3.0.0 GitHub release 2026-07-23. Commission page "EUDI Wallet implementation": four large-scale pilots (EWC, POTENTIAL, NOBID, DC4EU) launched April 2023, over 350 entities from 26 member states, Norway, Iceland and Ukraine. Second-wave pilots WE BUILD and APTITUDE (2025): public consortium pages and press. ETSI TS 119 602 (LoTE). OTS: Digital Economy Partnership Agreement signed 6.11.2024 in Bishkek, Türkiye's ratification law in the Official Gazette 23.6.2026 (press); Turkistan informal summit 15.5.2026, declaration calls for completing consideration of a draft Agreement on the Mutual Recognition of Electronic Digital Signatures (press; OTS PDF not machine-readable from here). Tamga: ARF §1.4-1.5, §6.2, §7.3, §8.4; Trust Framework §1.3 (TDT member and observer slots), §1.4 (Art. 14), §6 (three interoperability levels), §6.1 (external lists, LoTE); ADR-0035 (EU-compatible, PO1-PO4), ADR-0036 (external lists; none added); live lotl.json (TR active; AZ, KZ, KG, UZ reserved; HU, TM observer slots reserved), checked 2026-10-08. -->

eIDAS 2.0 hər bir üzv dövlətin 2026-cı ilin sonunadək rəqəmsal şəxsiyyət cüzdanı təqdim etməsini tələb edən Avropa İttifaqı (Aİ) qanunudur. Arxitektura və İstinad Çərçivəsi (Architecture and Reference Framework, ARF) onun arxasında dayanan texniki plandır. Birlikdə onlar tam etibar sistemini müəyyən edir: rəqəmsal cüzdan, dövlətin verdiyi şəxsiyyət məlumatları, diplom kimi attestasiyalar, imzalanmış etibar siyahıları, məlumat tələb edən hər bir xidmətin qeydiyyatı və sertifikatlaşdırma. Qanunun özü Türk dünyasına şamil edilmir, lakin onun standartları Aİ banklarının, universitetlərinin və işəgötürənlərinin oxuyacağı ortaq dilə çevrilir. Aİ-dən kənar dövlət bu dili indidən qəbul edə bilər. Aİ tərəfindən tanınma isə ayrıca addımdır və bu addımı hökumətlər atır.

## Aİ eIDAS 2.0 ilə nə qurdu?

eIDAS 2.0 adlanan (Aİ) 2024/1183 saylı Reqlament 2014-cü il eIDAS reqlamentinə dəyişikliklər edir ([EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)). 2014-cü il mətni əsasən milli eID sxemləri və elektron imzalarla bağlı idi. 2024-cü il mətni isə telefondakı rəqəmsal cüzdan ətrafında tam ekosistem əlavə edir. Bu ekosistem altı əsas komponentə söykənir:

![eIDAS 2.0-ın altı əsas komponenti: rəqəmsal cüzdan, PID, attestasiyalar, etibar siyahıları, etibar edən tərəflərin qeydiyyatı, sertifikatlaşdırma](/blog/eidas-arf-for-the-turkic-world/en/fig-yapi-taslari.png)

| Komponent | Nədir | Hüquqi əsas |
|---|---|---|
| **Avropa Rəqəmsal Şəxsiyyət Cüzdanı** | Şəxsin şəxsiyyət məlumatlarını və rəqəmsal sənədlərini saxlayan və onları şəxsin nəzarəti altında paylaşan tətbiq | Mad. 5a |
| **PID** (şəxsi identifikasiya məlumatları) | Dövlət tərəfindən və ya dövlət adından yüksək etibarlılıq səviyyəsində verilən əsas şəxsiyyət məlumatları | Mad. 5a, İcra Reqlamenti 2024/2977 |
| **Atributların elektron sənədləri** | Bütün digər rəqəmsal sənədlər: diplomlar, lisenziyalar, üzvlüklər. *Kvalifikasiyalı* atribut sənədi (QEAA) kvalifikasiyalı etibar xidməti provayderindən gəlir; dövlət sektorunun atribut sənədi (PuB-EAA) səlahiyyətli mənbəyə cavabdeh olan qurumdan gəlir | Mad. 45b–45h, İcra Reqlamenti 2025/1569 |
| **Etibar siyahıları** | Hansı provayderlərin nə üçün etibarlı olduğunu göstərən imzalanmış siyahılar | Mad. 22; ETSI TS 119 612 və ETSI TS 119 602 |
| **Etibar edən tərəfin qeydiyyatı** | Rəqəmsal cüzdandan məlumat istəmək istəyən hər bir xidmət üzv dövlətdə qeydiyyatdan keçir və nə istəyəcəyini və nə üçün istəyəcəyini bəyan edir | Mad. 5b, İcra Reqlamenti 2025/848 |
| **Sertifikatlaşdırma** | Rəqəmsal cüzdanlar təqdim edilməzdən əvvəl uyğunluğun qiymətləndirilməsi orqanları tərəfindən sertifikatlaşdırılır | Mad. 5c, İcra Reqlamenti 2024/2981 |

İki məqamı gözdən qaçırmaq asandır. Birincisi, sistemi sərhədlərarası işlək edən məhz etibar siyahılarıdır. Bir ölkədəki yoxlayan tərəfin başqa ölkədəki hər bir universitetlə ayrıca razılaşmaya ehtiyacı yoxdur; o, bir imzalanmış siyahını oxuyur ([imzalanmış etibar siyahısı necə işləyir](/blog/how-trust-lists-work)). İkincisi, etibar edən tərəflərin qeydiyyatı şəxsi imza qədər qoruyur: rəqəmsal cüzdan xidmətin tələb etdiyi məlumatları onun tələb etmək üçün qeydiyyatdan keçirdiyi məlumatlarla müqayisə edə və sorğu bundan kənara çıxdıqda xəbərdarlıq edə bilər.

## ARF nədir və qanunla necə əlaqəlidir?

Avropa İttifaqı (Aİ) reqlamenti öhdəlikləri müəyyən edir. İcra reqlamentləri texniki təfərrüatları müəyyənləşdirir və standartlara istinad edir. ARF isə bütün bunları vahid arxitekturada birləşdirən istinad sənədidir: rollar, axınlar, məlumat modeli, etibar modeli, hər rol üçün yüksək səviyyəli tələblər və hər rəqəmsal sənəd növü üçün qaydalar toplusu. Avropa Komissiyası onu GitHub-da açıq şəkildə dərc edir. Onun cari 3.0.0 versiyası 23 iyul 2026-cı ildə buraxılıb ([ARF buraxılışı](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)).

Bunların əsasında hər kəsin istifadə edə biləcəyi açıq standartlar dayanır: rəqəmsal sənədlər üçün IETF SD-JWT VC və ISO/IEC 18013-5 mdoc, onların verilməsi və təqdim edilməsi üçün HAIP profili ilə OpenID4VCI və OpenID4VP, ləğv üçün IETF Token Status List, qurumlar üçün X.509 sertifikatları və ETSI etibar siyahısı formatları. ETSI TS 119 602 etibarlı subyektlərin siyahılarını (LoTE) müəyyən edir — bu, cüzdan provayderləri, PID provayderləri və kvalifikasiyalı etibar xidməti provayderi olmayan digər subyektlər üçün istifadə olunan JSON siyahı formatıdır ([ETSI TS 119 602](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)).

Bu standartların heç biri Aİ ilə məhdudlaşmır. Qalan hamı üçün imkan da məhz buradadır.

## Hər bir hissə nə vaxtdan tətbiq olunur?

![2024-cü ildəki reqlamentdən 2027-ci ilin sonunda rəqəmsal cüzdanları qəbul etmək öhdəliyinə qədər eIDAS 2.0 xronologiyası](/blog/eidas-arf-for-the-turkic-world/en/fig-takvim.png)

| Tarix | Hadisə | Mənbə |
|---|---|---|
| 20 may 2024 | (Aİ) 2024/1183 saylı Reqlament qüvvəyə minir | Reqlamentin 2-ci maddəsi |
| 24 dekabr 2024 | İlk beş icra reqlamenti qüvvəyə minir: 2024/2977 (PID və attestasiyalar), 2024/2979 (rəqəmsal cüzdanın bütövlüyü və əsas funksiyaları), 2024/2980 (bildirişlər), 2024/2981 (sertifikatlaşdırma), 2024/2982 (protokollar və interfeyslər) | 28 noyabr 2024-cü ildə qəbul edilib, 4 dekabr 2024-cü ildə dərc olunub |
| 7 may 2025 | 2025/848 (etibar edən tərəflərin qeydiyyatı) və 2025/849 (sertifikatlaşdırılmış rəqəmsal cüzdanların siyahısı) dərc olunur | 6 may 2025-ci ildə qəbul edilib |
| 30 iyul 2025 | 2025/1569 (kvalifikasiyalı və dövlət sektoru attestasiyaları) dərc olunur | 29 iyul 2025-ci ildə qəbul edilib |
| 22 iyul 2026 | İlk aktlardan dördündə istinad edilən standartları yeniləyən 2026/1731 dərc olunur | 15 iyul 2026-cı ildə qəbul edilib |
| 23 iyul 2026 | ARF 3.0.0 buraxılır | GitHub |
| 2026-cı ilin sonu | Hər bir üzv dövlət ən azı bir rəqəmsal cüzdan təqdim edir | Maddə 5a(1): icra aktlarından 24 ay sonra |
| 2027-ci ilin sonu | Gücləndirilmiş autentifikasiyadan istifadə etməli olan özəl xidmətlər (bankçılıq, nəqliyyat, enerji, səhiyyə, təhsil, telekommunikasiya və digərləri) istifadəçi istədikdə rəqəmsal cüzdanı qəbul edir | Maddə 5f(2): 36 ay |

Yoxlayan tərəf üçün ən vacibi sonuncu sətirdir. 2027-ci ilin sonundan etibarən Aİ-dəki bank şəxs istədikdə rəqəmsal cüzdanla identifikasiyanı qəbul etməlidir. Eyni tarixlər [Avropa xronologiyası](/learn/eu-timeline) yazısında addım-addım verilib.

## Son tarixdən əvvəl necə sınaqdan keçirildi?

Avropa Komissiyası ARF-i real xidmətlərdə sınaqdan keçirən genişmiqyaslı pilot layihələri maliyyələşdirib. Onlardan dördü 2023-cü ilin aprelində başlayıb: EWC (səyahət sənədləri), POTENTIAL (dövlət xidmətləri, bankçılıq, telekommunikasiya, sürücülük vəsiqələri, imzalar və səhiyyə), NOBID (ödənişlər) və DC4EU (təhsil və sosial təminat). Komissiyanın məlumatına görə, bu layihələr 26 Aİ üzv dövlətindən, Norveç, İslandiya və Ukraynadan 350-dən çox dövlət və özəl təşkilatı bir araya gətirib ([Komissiya: EUDI Wallet (rəqəmsal cüzdan) tətbiqi](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)). Daha iki pilot layihə — WE BUILD və APTITUDE — 2025-ci ildə başlayıb.

Ukraynanın bu siyahıda yer alması diqqətəlayiqdir. Aİ-dən kənar bir ölkə sistemin sınaqdan keçirilməsində üzv dövlətlərlə yanaşı iştirak etdi. Pilot layihələrdə iştirak hüquqi tanınma yaratmır. Lakin bu, texniki işin qonşular üçün açıq olduğunu göstərir. DC4EU həmçinin təhsil üzrə rəqəmsal sənədləri sınaqdan keçirdi — Türk dövlətləri ilə Avropa arasında hərəkət edən tələbələr və məzunlar üçün ən vacib olan məhz bu növdür.

## Uyğunlaşma Aİ-dən kənar ölkə üçün niyə vacibdir?

Çünki insanlar, mallar və kvalifikasiyalar artıq sərhədi keçir, sənədləşmə isə sərhədin bir tərəfində rəqəmsallaşmaq üzrədir. Üç vəziyyət təkrarlanır:

- **Təhsil.** Bişkekdən olan məzun Almaniyada magistratura proqramına müraciət edir. Diplom Aİ formatında imzalanmış rəqəmsal sənəddirsə, qəbul ofisinin proqram təminatı onu saniyələr içində yoxlaya bilər. Skan edilmiş PDF-dirsə, kimsə e-poçt yazır və cavab gözləyir.
- **İş və mobillik.** Daşkənddən olan mühəndis Münhenə köçür. Aİ-dəki işəgötürənlər və banklar rəqəmsal cüzdandakı sənədləri oxumağa hazır olacaq; eyni formatda olan rəqəmsal sənəd eyni prosesə asanlıqla daxil olur.
- **Ticarət.** Bakıdakı şirkət qeydiyyatını, lisenziyalarını və ya sertifikatlarını Aİ-dəki tərəfdaşına sübut edir. Fərdi rəqəmsal sənədləri daşıyan eyni siyahılar və formatlar bu attestasiyaları da daşıyır.

Hər bir halda iki fərqli şərt ödənməlidir. Rəqəmsal sənəd *oxuna bilən* olmalıdır — bu, formatlar və protokollar məsələsidir. Sənədi verən qurum isə *etibarlı* olmalıdır — bu, siyahılar və tanınma məsələsidir. Məhz buna görə Tamga Trust Framework qarşılıqlı uyğunluğu üç səviyyəyə ayırır:

![Qarşılıqlı uyğunluğun üç səviyyəsi: portativlik və etibar texniki, hüquqi tanınma isə siyasi məsələdir](/blog/eidas-arf-for-the-turkic-world/en/fig-uc-seviye.png)

1. **Portativlik.** Eyni formatlar və protokollar. Aİ-dəki rəqəmsal cüzdan və ya yoxlayan tərəf rəqəmsal sənədi texniki baxımdan emal edə bilir. Buna bu gün mühəndislik yolu ilə nail olmaq mümkündür.
2. **Etibar.** Bir-birinə istinad edən etibar siyahıları; hər siyahı yalnız müəyyən edilmiş əhatə dairəsi üçün zəmanət verə bilər. Bu da texniki məsələdir, lakin hər tərəfin hansı siyahılara etibar edəcəyi barədə qərar qəbul etməsini tələb edir.
3. **Hüquqi tanınma.** Dövlət və ya Aİ digərinin rəqəmsal sənədlərini hüquqi qüvvəyə malik kimi qəbul edir. Bu barədə qərarı hökumətlər qanun və ya saziş vasitəsilə verir.

İlk iki səviyyəni üçüncüdən əvvəl qurmaq olar və erkən qurmağın mənası da məhz budur. İki hökumət bir-birinin rəqəmsal sənədlərini tanımaq qərarına gəldikdə, onları daşıyan sistemlər artıq uyğun olur. Heç kim format dəyişdiyi üçün diplomu yenidən vermək məcburiyyətində qalmır.

## Türk dünyası rəqəmsal etibar sahəsində artıq nə edir?

Türk Dövlətləri Təşkilatı rəqəmsal əməkdaşlığı gündəminə daxil edib. Üzv dövlətlər 6 noyabr 2024-cü ildə Bişkek sammitində elektron ticarət, kağızsız ticarət, elektron imzalar, məlumatların qorunması və kibertəhlükəsizliyi əhatə edən Rəqəmsal İqtisadiyyat üzrə Tərəfdaşlıq Sazişini imzalayıb; Türkiyənin ratifikasiya qanunu 2026-cı ilin iyununda Rəsmi Qəzetdə dərc olunub ([Daily Sabah](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal)). 15 may 2026-cı ildə Türküstanda keçirilən qeyri-rəsmi sammitin mövzusu süni intellekt və rəqəmsal inkişaf olub. Məlumata görə, sammitin bəyannaməsi üzv dövlətləri elektron rəqəmsal imzaların qarşılıqlı tanınması haqqında saziş layihəsinin nəzərdən keçirilməsini başa çatdırmağa çağırır, Qazaxıstan Prezidenti isə rəqəmsal imzaların və elektron sənədlərin qarşılıqlı tanınmasını təklif edib ([The Astana Times](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)).

İmzaların qarşılıqlı tanınması yuxarıdakı modelin hüquqi səviyyəsidir. Ortaq etibar qatı isə onun altındakı texniki səviyyədir. Tamga Network-un Türk Dövlətləri Təşkilatı və ya onun hər hansı üzv dövləti ilə heç bir sazişi yoxdur; o, texniki səviyyəni dövlətlər istifadə etmək istədikləri təqdirdə hazır olsun deyə qurur.

## Tamga Network Aİ modelindən nəyi götürür?

Texniki qatı — dəyişdirmədən. Tamga-nın qaydası belədir: rəqəmsal sənəd, protokol və etibar siyahısı formatları Aİ standartlarından kənara çıxmır, Tamga-ya xas istənilən əlavə isə standart klient proqramlarını pozmadan standart genişləndirmə nöqtəsi vasitəsilə həyata keçirilir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)).

| Aİ elementi | Tamga Network-da |
|---|---|
| SD-JWT VC və ISO mdoc | eynidir; şəxsiyyət rəqəmsal sənədləri hər iki formatda |
| OpenID4VCI, OpenID4VP, HAIP 1.0 | eynidir |
| Token Status List | eynidir |
| LOTL və milli etibar siyahıları | eyni iki səviyyəli model; hər türk dövləti üçün ayrıca yer |
| LoTE (ETSI TS 119 602) | xarici siyahılar üçün ilk oxunan format |
| Etibar edən tərəflərin (relying party) qeydiyyatı və qeydiyyat sertifikatları | Aİ-nin ümumi qeydiyyat məlumat dəsti və sertifikat modeli |
| ARF rollar dəsti | hər rolun, boş olsa belə, hər milli siyahıda yeri var |

İdarəetmə qatı türk dünyası üçün yazılıb: hər dövlət öz siyahısının yeganə müəllifidir, dövlətlər arasında tanınma barədə isə hər dövlət özü qərar verir. Tam uyğunluq xəritəsi, eləcə də Tamga qaydalarının Aİ qaydalarından harada və niyə fərqləndiyi [Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq](/blog/tamga-arf) məqaləsində verilib.

Şəbəkənin etibarlı siyahılar siyahısında artıq Türk Dövlətləri Təşkilatının hər üzv dövləti və iki müşahidəçi dövlət üçün yer ayrılıb və hər dövlət öz siyahısını idarəsinə götürə bilər ([şəbəkənin niyə fonda keçəcəyi](/blog/network-as-a-foundation)). Bu gün yalnız Türkiyə siyahısı aktivdir və siyahının özündə qeyd olunduğu kimi, Tamga onu milli səlahiyyətli orqan adından müvəqqəti olaraq dərc edir. Digərləri ehtiyatda saxlanılır. Canlı siyahını `trust.tamga.network` ünvanında oxuya bilərsiniz.

## Dürüst məhdudiyyətlər hansılardır?

- **Tamga Network Aİ tərəfindən tanınmır.** O, Aİ ilə uyğundur: eyni standartlardan istifadə edir və bunu testlərlə göstərir. "EUDI Wallet" üzv dövlət tərəfindən təqdim edilən və ya tanınan və Aİ qaydalarına əsasən sertifikatlaşdırılan cüzdanlar üçün hüquqi statusdur. Bu gün Aİ-dən kənarda heç bir şəbəkə və ya rəqəmsal cüzdan bu statusu iddia edə bilməz.
- **Reqlamentdən yan keçən qısa yol yoxdur.** eIDAS-ın 14-cü maddəsi üçüncü ölkənin etibar xidmətlərinin Aİ-nin kvalifikasiyalı etibar xidmətlərinə ekvivalent sayılmasına imkan verir, lakin yalnız Aİ-nin icra aktı və ya Aİ-nin Fəaliyyəti haqqında Müqavilənin (TFEU) 218-ci maddəsinə əsasən Aİ ilə həmin ölkə arasında bağlanan saziş vasitəsilə. Bu, hökumətlər arasında danışıqlardır. Tamga texniki tərəfi hazırlaya bilər; həmin prosesi nə başlada, nə də yekunlaşdıra bilər.
- **Hələ heç bir xarici siyahı əlavə edilməyib.** Başqa dövlətin siyahısına və ya Aİ siyahısına istinad mexanizmi sabitlənmiş imzalayan və müəyyən edilmiş əhatə dairəsi ilə artıq mövcuddur ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)). Hər əlavə ayrıca, qeydə alınan qərardır və hələ heç biri qəbul edilməyib.
- **Etibar lövbəri bu gün bir operatora əsaslanır.** Siyahılar imzalanır, versiyalanır və açıq şəkildə jurnallaşdırılır, lakin ikinci müstəqil operator qoşulana qədər şəbəkə tək imzaya söykənir. Bu, çərçivədə məlum məhdudiyyət kimi qeyd olunub ([Tamga ARF](https://arf.tamga.network/architecture)).
- **Türk dövlətləri arasında tanınma həm də siyasi məsələdir.** Qazaxıstandakı yoxlayan tərəfin Türkiyədəki universitetə etibar etməsi Qazaxıstanın qərarıdır. Şəbəkə bu qərarı ifadə etməyi və proqram təminatında tətbiq etməyi asanlaşdırır; qərarı özü vermir.

## Tez-tez verilən suallar

### eIDAS 2.0 Türkiyəyə və ya Mərkəzi Asiya dövlətlərinə şamil olunurmu?

Xeyr. O, Aİ üzv dövlətləri və Aİ-də əhatə olunan xidmətlər üçün məcburidir. Onun standartları açıqdır, buna görə istənilən dövlət və ya qurum onlardan istifadə edə bilər; Aİ daxilində xidmət göstərən şirkətlər isə öz öhdəliklərini hüquqşünasla dəqiqləşdirməlidir.

### Türkiyədə verilmiş rəqəmsal sənəd Aİ-də qəbul oluna bilərmi?

Eyni formatlardan istifadə edərsə, Aİ proqram təminatı onu oxuya bilər — Tamga rəqəmsal sənədləri də belədir. Hüquqi qüvvə ilə etibar qazanması üçün isə sənədi verən qurum tanınmalıdır: etibar siyahıları vasitəsilə, kvalifikasiyalı status üçün isə 14-cü maddəyə əsasən saziş və ya icra aktı ilə.

### Reqlament ilə ARF arasında fərq nədir?

Reqlament və onun icra aktları hüquqi normadır. ARF isə Komissiyanın bu aktların əsaslandığı arxitekturanı, rolları və tələbləri təsvir edən texniki istinad sənədidir. Hazırkı versiya 23 iyul 2026-cı ildə buraxılmış 3.0.0 versiyasıdır.

### Tamga Network Türk Dövlətləri Təşkilatı ilə əməkdaşlıq edirmi?

Xeyr. Təşkilatla və ya onun üzv dövlətləri ilə heç bir saziş yoxdur. Şəbəkə onların hər biri üçün siyahıda yer ayırır və elə qurulub ki, dövlət istədiyi vaxt öz siyahısını idarəsinə götürə bilsin.

### Tanınma hökumətlərdən asılıdırsa, niyə indidən qurmaq lazımdır?

Çünki texniki səviyyələrin qurulması vaxt tələb edir və siyasi qərardan asılı deyil. Onlar hazır olarsa, sonradan qəbul edilən tanınma qərarı insanların artıq sahib olduğu rəqəmsal sənədlərə onları yenidən vermədən şamil olunur.

## Mənbələr

- [(Aİ) 2024/1183 saylı Reqlament (eIDAS 2.0), EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1183/oj): Maddə 5a, 5b, 5c, 5d, 5f, 14, 22, 45b–45h
- İcra Reqlamentləri [2024/2977](https://eur-lex.europa.eu/eli/reg_impl/2024/2977/oj) · [2024/2979](https://eur-lex.europa.eu/eli/reg_impl/2024/2979/oj) · [2024/2980](https://eur-lex.europa.eu/eli/reg_impl/2024/2980/oj) · [2024/2981](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj) · [2024/2982](https://eur-lex.europa.eu/eli/reg_impl/2024/2982/oj) · [2025/848](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [2025/849](https://eur-lex.europa.eu/eli/reg_impl/2025/849/oj) · [2025/1569](https://eur-lex.europa.eu/eli/reg_impl/2025/1569/oj) · [2026/1731](https://eur-lex.europa.eu/eli/reg_impl/2026/1731/oj)
- [EUDI Wallet (rəqəmsal cüzdan) Arxitektura və İstinad Çərçivəsi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Avropa Komissiyası: EUDI Wallet (rəqəmsal cüzdan) tətbiqi və genişmiqyaslı pilot layihələr](https://digital-strategy.ec.europa.eu/en/policies/eudi-wallet-implementation)
- [ETSI TS 119 602: etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf) · [Aİ etibar siyahıları brauzeri](https://eidas.ec.europa.eu/efda/trust-services/browse/eidas/tls)
- [Daily Sabah: TDT Rəqəmsal İqtisadiyyat Tərəfdaşlığı Sazişi](https://www.dailysabah.com/business/economy/turkic-states-edge-closer-in-digital-trade-as-turkiye-ratifies-deal) · [The Astana Times: Türküstan qeyri-rəsmi sammiti](https://astanatimes.com/2026/05/tokayev-proposes-turkic-ai-network-and-digital-integration-at-turkic-states-summit/)
- [Tamga ARF](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework) · [ADR-0035: mövqeləndirmə](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: etibar federasiyası](https://docs.tamga.network/adr/0036-trust-federation-external-lists)
- [eIDAS 2.0](/learn/eidas) · [Dövlətlər üçün](/learn/for-states) · [Manifest](/manifesto)

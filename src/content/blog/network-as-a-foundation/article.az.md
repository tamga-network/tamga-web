---
title: Tamga Network niyə qeyri-kommersiyadır və fonda keçəcək
slug: network-as-a-foundation
description: "Tamga Network heç bir xidmət satmır, rəqəmsal cüzdan idarə etmir və onun fəaliyyəti fonda veriləcək. Neytrallıq niyə vacibdir və təhvil necə həyata keçirilir."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Sources: tamga-network README ("Tamga Network is non-profit; operation will later be handed over to a foundation"); Tamga ARF §8.3 (governance body formed when one or two states are willing; Tamga provisional operator until then; operation passes to the foundation; the network sells no product or commercial service; service providers outside, same terms), §1.6 principles P1 (each state sole author of its national records; council membership by two-thirds of member states), P4 (every state role Tamga holds is designed to be handed over), P7 (powers not limited by code are limited by policy, a measurable hand-over threshold and a transparency report); ADR-0035 (known tension: list operator selling services = conflict of interest; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; the Tamga team's company gets no different treatment), ADR-0042 (NW1–NW4; wallet.tamga.network removed 2026-10-06; Tamga Wallet's provider operated by the wallet's operator at provider.tamgawallet.com), ADR-0002 (three governance layers; removal does not invalidate citizens' credentials; right to exit), ADR-0009 (ledger with ≥2 independent operators); SPEC-TRUST-0001 (operator.status provisional, on_behalf_of; hand-over changes only the operator field; TDT-first slots; security notes: public log, CHANGELOG, quarterly transparency report, audit); learn/governance (succession agreement: domain, roots, archive, keys); home page gov section. Live tl-tr.json/lotl.json operator fields (2026-10-08). External: eIDAS 2.0 Regulation (EU) 2024/1183, EU ARF, EU trusted lists. -->

Tamga Network qeyri-kommersiya xarakterlidir və onun idarə olunması fonda təhvil veriləcək, çünki etibar şəbəkəsi yalnız ona güvənən hər kəs siyahını saxlayan tərəfin heç kimə üstünlük vermədiyinə inana bildikdə işləyir. Dövlətlər, qurumlar, bir neçə rəqəmsal cüzdan və rəqabət aparan xidmət şirkətləri eyni siyahını oxuyur. Buna görə şəbəkə xidmət satmır, rəqəmsal cüzdan idarə etmir və heç kimə imtiyaz vermir; bu gün müvəqqəti əsasda daşıdığı hər rol təhvil verilmək üçün nəzərdə tutulub. Dövlətlər qoşulduqda idarəetməni şura və ya fond öz üzərinə götürür, hər dövlət isə öz siyahısını idarə etməyə başlayır.

## Etibar siyahısını saxlayan tərəf niyə neytral olmalıdır?

Etibar siyahısı kimə inanılacağını müəyyən edir. Siyahıdakı qurum yoxlayan tərəflərin qəbul etdiyi rəqəmsal sənədlər verə bilər; siyahıdakı yoxlayan tərəf rəqəmsal cüzdanlardan məlumat tələb edə bilər; siyahıdakı cüzdan provayderi rəqəmsal sənədlər qəbul edə bilər. Siyahını saxlayan tərəf eyni zamanda inteqrasiya satsaydı, rəqəmsal cüzdan idarə etsəydi və ya ödənişli dəstək təklif etsəydi, siyahıya hər daxiletmə qərarı belə bir suala açıq olardı: bu, qaydalara əsasən təsdiqlənib, yoxsa siyahını saxlayan tərəfin biznesinə xeyir verdiyi üçün?

Avropa İttifaqı (Aİ) də bu rolları eyni səbəbdən ayırır. eIDAS 2.0 modelində ([Reqlament (Aİ) 2024/1183](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) üzv dövlətlər etibar siyahılarına nəzarət edir və onları dərc edir, cüzdan provayderləri rəqəmsal cüzdanları idarə edir, etibar edən tərəflər isə qeydiyyatdan keçir; rollar bir-birindən ayrı saxlanılır. Tamga öz mövqeyini müəyyənləşdirərkən qərar qeydində bu, məlum gərginlik kimi göstərildi: xidmət satan siyahı operatorunda maraqlar toqquşması yaranır ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Sonra bu ayrılıq açıq şəkildə təsbit edildi ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)).

## "Qeyri-kommersiya" praktikada nə deməkdir?

Üç məcburi qayda:

- **Şəbəkə xidmət satmır** (PO5). Onun sənədlərində və saytlarında qiymətlər və satış dili yoxdur. İnteqrasiya, dəstək, müqavilə əsasında hostinq və konsaltinq şəbəkədən kənar şirkətlər tərəfindən, öz adları ilə təklif olunur.
- **Hamı üçün eyni şərtlər** (PO6). İstinad xidmətləri və qeydiyyat prosesi bütün iştirakçılara eyni şərtlərlə açıqdır. Heç bir xidmət provayderi üstünlük almır və qərarda açıq şəkildə qeyd olunur ki, buna Tamga komandasının təsis etdiyi şirkət də daxildir.
- **İstinad xidmətləri şəbəkənin işləməsi üçün mövcuddur.** Etibar siyahısını dərc edən xidmət, host edilən yoxlayan tərəf, Institution Console ilə host edilən sənəd verilməsi, müvəqqəti şəxsiyyət xidməti və sınaq mühiti (sandbox) qurumların qoşula bilməsi və hər kəsin qaydaları sınaya bilməsi üçündür. Onlar məhsul deyil.

Tamga ARF bunu idarəetmə bölməsində açıq şəkildə bildirir: Tamga Network qeyri-kommersiya xarakterlidir, onun fəaliyyəti fonda təhvil veriləcək, o, heç bir məhsul satmır və kommersiya xidməti təklif etmir ([Tamga ARF](https://arf.tamga.network/architecture); çərçivənin necə qurulduğu barədə [Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq](/blog/tamga-arf) yazısına baxın).

## Şəbəkə niyə rəqəmsal cüzdan idarə etmir?

Çünki siyahıdakı cüzdanlardan birini özü də idarə edən siyahı digərlərinə qarşı neytral deyil. Aİ modelində hər rəqəmsal cüzdanı onu təklif edən təşkilat, yəni onun cüzdan provayderi idarə edir, etibar çərçivəsi isə yalnız cüzdan provayderlərini siyahıya alır.

Tamga Network bu modeli izləyir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- O, heç bir rəqəmsal cüzdanın tətbiqini, cüzdan provayderini, veb-saytını və ya dəstək xidmətini idarə etmir və host etmir.
- Şəbəkənin domen adları altında heç bir cüzdan xidməti işləmir. Əvvəllər `wallet.tamga.network` ünvanında işləyən cüzdan xidmətləri 6 oktyabr 2026-cı ildə şəbəkədən çıxarıldı.
- Şəbəkənin interfeyslərində və paketlərində heç bir cüzdanın adı sabit kodla yazılmır; ifadə "rəqəmsal cüzdanınızda açın" şəklindədir, cüzdanın adı isə lazım olduqda onun siyahıdakı qeydindən götürülür.
- Yalnız bir sınaq mühiti var və o, şəbəkəyə məxsusdur. Cüzdan tərtibatçıları orada öz provayderlərini qeydiyyatdan keçirir və hamı kimi eyni qurumlar, şəxsiyyət xidməti və yoxlayan tərəflə sınaq aparırlar.

Şəbəkədəki rəqəmsal cüzdanlardan biri və ayrıca məhsul olan Tamga Wallet da eyni yolu izləyir. Onun cüzdan provayderini şəbəkə deyil, cüzdanın öz operatoru cüzdanın öz domeni altında idarə edir. Onun provayder qeydi (`TAMGA-WP-1`) 14 oktyabr 2026-cı ildən bəri siyahıda aktivdir; sertifikatı, istənilən digər cüzdanda olduğu kimi, həmin operator təqdim edib.

## Siyahılar kimə məxsusdur?

Dövlətlərə. İdarəetmə üç səviyyədən ibarətdir və hər birində qərarı fərqli tərəf verir ([ADR-0002](https://docs.tamga.network/adr/0002-sovereignty-first-governance)):

| Səviyyə | Sual | Kim qərar verir |
|---|---|---|
| Şəbəkə üzvlüyü | Yeni dövlət qoşulurmu? | üzv dövlətlər, şura yaradıldıqdan sonra üçdə iki səs çoxluğu ilə |
| Milli qeydiyyat | Dövlət hansı qurumları və yoxlayan tərəfləri qeydiyyata alır? | yalnız həmin dövlət |
| Tanınma | Dövlət başqa dövlətin rəqəmsal sənədlərini qəbul edirmi? | hər dövlət özü üçün |

Bundan iki nəticə çıxır. Dövlət heç kimin səsverməsi olmadan çıxa bilər. Dövlətin çıxarılması isə onun vətəndaşlarının rəqəmsal cüzdanlarındakı rəqəmsal sənədləri etibarsız etmir; yalnız yeni qeydləri dayandırır. Şura yaradıldıqdan sonra belə, o, şəbəkənin ortaq qaydalarını idarə edir və dövlətin öz qurumları barədə qərar verə bilməz.

## Bugündən fonda qədər yol necədir?

![Bu günkü müvəqqəti operatordan şuraya və ya fonda, eləcə də ortaq reyestrə doğru](/blog/network-as-a-foundation/en/fig-yol.png)

**Bu gün** Tamga müvəqqəti operatordur. O, Türkiyə siyahısını milli səlahiyyətli orqan adından dərc edir və bunu siyahının özündə də göstərir: `operator` sahəsində `"status": "provisional"` yazılır, `on_behalf_of` dəyəri isə heç vaxt boş buraxılmır. Hələ heç kimə lazım olmadan ağır bir qurum yaradılmır.

**Bir və ya iki dövlət qoşulmağa hazır olduqda** idarəetmə orqanı yaradılır: üzv dövlətlərin şurası və idarəetməni öz üzərinə götürəcək fond və ya katiblik. Siyahılar sahiblərinə təhvil verilir, şəbəkə səviyyəsindəki qərarlar isə, məsələn, üzvün qəbulu və ya ortaq rəqəmsal sənəd növünün əlavə edilməsi, birgə qəbul edilir.

**Ən azı iki müstəqil operator olduqdan sonra** qeydlər icazəli ortaq reyestrə də köçürülür ki, heç bir tərəf onları tək başına dəyişə bilməsin. Bir operatorun apardığı reyestr etibar deyil, yalnız xərc artırardı; buna görə də o gözləyir ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).

## Operator rəqəmsal sənədləri pozmadan necə dəyişə bilər?

Çünki identifikatorlar operatora məxsus deyil. Qurumun `issuer_id` identifikatoru onun öz sertifikatından hesablanır, rəqəmsal sənəd növləri sabit URN-lərlə adlandırılır, siyahı formatında isə artıq hər dövlət və rolların tam dəsti üçün yer var. Təhvil `operator` sahəsini, siyahının ünvanını və onu imzalayanı dəyişir. Rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan və imzalayan dəyişir; insanların rəqəmsal cüzdanlarında artıq olan rəqəmsal sənədlər etibarlı qalır.

Kodun köçürə bilmədiyi hissələr, məsələn, domen adı, kök sertifikatlar, siyahı arxivi və açarlar yazılı varislik müqaviləsi əsasında təhvil verilir. Bunun arxasındakı qayda belədir: kodun məhdudlaşdıra bilmədiyi hər səlahiyyət (hostinq, domen, qeydlərin aparılması, statistika) siyasət, ölçülə bilən təhvil həddi və şəffaflıq hesabatı ilə məhdudlaşdırılır (P7 prinsipi).

## O vaxta qədər müvəqqəti operatoru dürüst saxlayan nədir?

Təkcə yaxşı niyyət deyil. Siyahılar imzalanır, versiyalanır və hash zənciri ilə bağlanır, heç nə heç vaxt silinmir. Hər ləğv siyahısının dərci açıq, saatlıq lövbər jurnalına düşür. Hər yığım (build) `trust.tamga.network` ünvanındakı açıq dəyişiklik jurnalında qeyd olunur. Qaydalar rüblük şəffaflıq hesabatını və müstəqil auditi də nəzərdə tutur; hesabatın səhifəsi hələ dərc olunmayıb.

Bunun harada bitdiyini də deyirik. Bu gün lövbər bir operatorun imzasına əsaslanır və açıq qeydlər sui-istifadəni qeyri-mümkün etmir, yalnız ondan çəkindirir. Bu boşluğu bağlamaq məhz ikinci müstəqil operatorun, ondan sonra isə ortaq reyestrin vəzifəsidir. Ətraflı: [İmzalanmış etibar siyahısı necə işləyir](/blog/how-trust-lists-work).

## Bu, hər iştirakçı üçün nə deməkdir?

![Kim nəyi idarə edir: şəbəkə, dövlətlər, rəqəmsal cüzdanlar və xidmət şirkətləri](/blog/network-as-a-foundation/en/fig-ayrim.png)

- **Qurumlar** inteqrasiyada onlara hansı xidmət şirkətinin kömək etməsindən (əgər edirsə) asılı olmayaraq eyni şərtlərlə qeydiyyatdan keçir.
- **Rəqəmsal cüzdanlar** adlarına görə deyil, siyahıdakı qeydlərinə və qaydalara uyğunluqlarına görə tanınır.
- **Xidmət şirkətləri** şəbəkədən kənarda rəqabət aparır; şəbəkənin qaydaları onların hamısı üçün eynidir.
- **Dövlətlər** öz siyahıları üzərində yeganə söz sahibi olaraq qalır və Tamga-nın bu gün Türkiyə üçün müvəqqəti daşıdığı rolları hazır olduqları istənilən vaxt öz üzərinə götürə bilərlər ([Dövlətlər üçün](/learn/for-states)).

## Tez-tez verilən suallar

### Fond artıq yaradılıbmı?

Hələ yox. İdarəetmə orqanı bir və ya iki dövlət qoşulmağa hazır olduqda yaradılır. O vaxta qədər Tamga müvəqqəti operatordur və siyahılarda bu göstərilir.

### Şirkət üstünlük və ya siyahıda daha yaxşı yer üçün pul ödəyə bilərmi?

Xeyr. Şəbəkə xidmət satmır, onun istinad xidmətləri və qeydiyyat prosesi bütün iştirakçılara eyni şərtlərlə açıqdır. Heç bir şirkətə fərqli münasibət göstərilmir.

### Tamga Wallet-ın şəbəkədə xüsusi mövqeyi varmı?

Xeyr. O, şəbəkədəki rəqəmsal cüzdanlardan biridir, öz operatoru tərəfindən idarə olunur və istənilən digər rəqəmsal cüzdan kimi eyni qaydada siyahıya alınır.

### Dövlət şəbəkədən çıxsa, insanların rəqəmsal sənədləri ilə nə baş verir?

Onlar etibarlı qalır. Çıxış dövlətin yeni qeydlər yazmasını dayandırır; verilmiş sənədləri ləğv etmir. Digər dövlətlərin həmin rəqəmsal sənədləri qəbul etməyə davam edib-etməməsi hər dövlətin öz tanınma qərarıdır.

### Bir dövlət şəbəkəni ələ keçirə bilərmi?

Hər dövlət yalnız öz siyahısını yazır, yeni üzvün qəbulu üçün üzv dövlətlərin üçdə ikisinin razılığı tələb olunur, tanınma barədə qərarı isə hər dövlət özü verir. Heç bir dövlət digərinin siyahısına nəzarət etmir.

## Mənbələr

- [Reqlament (Aİ) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Aİ Rəqəmsal Şəxsiyyət Cüzdanı: Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arxitektura və idarəetmə](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework)
- [ADR-0002: suverenliyi önə qoyan idarəetmə](https://docs.tamga.network/adr/0002-sovereignty-first-governance) · [ADR-0037: şəbəkə yalnız şəbəkədir](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [ADR-0009: blokçeynsiz beta və blokçeyn həddi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [İdarəetmə](/learn/governance) · [Haqqımızda](/about) · [Yol xəritəsi](/roadmap)

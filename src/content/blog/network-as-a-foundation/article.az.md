---
title: Tamga Network niyə qeyri-kommersiyadır və fonda keçəcək?
slug: network-as-a-foundation
description: "Tamga Network xidmət satmır və cüzdan idarə etmir, onun idarə olunması isə fonda veriləcək. Neytrallığın niyə vacib olduğunu və təhvilin necə işlədiyini izah edirik."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: network
draft: false
related: what-is-a-trust-network, tamga-arf, how-trust-lists-work, why-no-blockchain-yet, learn:governance
---

<!-- Sources: tamga-network README ("Tamga Network is non-profit; operation will later be handed over to a foundation"); Tamga ARF §8.3 (governance body formed when one or two states are willing; Tamga provisional operator until then; operation passes to the foundation; the network sells no product or commercial service; service providers outside, same terms), §1.6 principles P1 (each state sole author of its national records; council membership by two-thirds of member states), P4 (every state role Tamga holds is designed to be handed over), P7 (powers not limited by code are limited by policy, a measurable hand-over threshold and a transparency report); ADR-0035 (known tension: list operator selling services = conflict of interest; PO2–PO4), ADR-0037 (K1–K4, PO5, PO6; the Tamga team's company gets no different treatment), ADR-0042 (NW1–NW4; wallet.tamga.network removed 2026-10-06; Tamga Wallet's provider operated by the wallet's operator at provider.tamgawallet.com), ADR-0002 (three governance layers; removal does not invalidate citizens' credentials; right to exit), ADR-0009 (ledger with ≥2 independent operators); SPEC-TRUST-0001 (operator.status provisional, on_behalf_of; hand-over changes only the operator field; TDT-first slots; security notes: public log, CHANGELOG, quarterly transparency report, audit); learn/governance (succession agreement: domain, roots, archive, keys); home page gov section. Live tl-tr.json/lotl.json operator fields (2026-10-08). External: eIDAS 2.0 Regulation (EU) 2024/1183, EU ARF, EU trusted lists. -->

Tamga Network qeyri-kommersiya şəbəkəsidir və onun idarə olunması gələcəkdə fonda veriləcək. Bunun səbəbi etibar şəbəkəsinin yalnız ona söykənən hər kəs siyahını saxlayan tərəfin heç kimə üstünlük vermədiyinə inandığı müddətcə işləyə bilməsidir. Eyni siyahını dövlətlər, qurumlar, bir neçə cüzdan və bir-biri ilə rəqabət aparan xidmət şirkətləri oxuyur. Ona görə şəbəkə xidmət satmır, cüzdan idarə etmir və heç kimə imtiyaz vermir. Bu gün müvəqqəti olaraq üzərinə götürdüyü hər rol da təhvil verilə biləcək şəkildə qurulub. Dövlətlər qoşulanda idarəetməni şura və ya fond, hər ölkənin siyahısını isə həmin ölkənin özü təhvil alacaq.

## Etibar siyahısını saxlayan tərəf niyə neytral olmalıdır?

Etibar siyahısı kimə inanılacağını müəyyən edir. Siyahıdakı qurum yoxlayan tərəflərin qəbul etdiyi sənədlər verə bilər. Siyahıdakı yoxlayan tərəf cüzdanlardan məlumat istəyə bilər, siyahıdakı cüzdan provayderi də sənəd ala bilər. Siyahını saxlayan tərəf eyni zamanda inteqrasiya satsaydı, cüzdan idarə etsəydi və ya ödənişli dəstək göstərsəydi, onun hər qeydiyyat qərarı şübhə altına düşərdi. Hamı bu qeydin qaydalara görə, yoxsa siyahını saxlayanın işinə yaradığı üçün təsdiqləndiyini soruşardı.

Aİ də bu rolları eyni səbəbdən bir-birindən ayırır. eIDAS 2.0 modelində ([(Aİ) 2024/1183 saylı Reqlament](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)) etibar siyahılarına üzv dövlətlər nəzarət edir və onları dərc edir. Cüzdanları cüzdan provayderləri idarə edir, etibar edən tərəflər isə qeydiyyatdan keçir. Tamga öz mövqeyini müəyyən edərkən bunu məlum gərginlik kimi qeydə aldı, çünki siyahını idarə edən tərəf xidmət satarsa, maraqlar toqquşması yaranır ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Sonra bu ayrılıq ayrıca qərarla açıq şəkildə yazıldı ([ADR-0037](https://docs.tamga.network/adr/0037-network-only)).

## "Qeyri-kommersiya" praktikada nə deməkdir?

Bunun üç məcburi qaydası var:

- **Şəbəkə xidmət satmır** (PO5). Şəbəkənin sənədlərində və saytlarında qiymət məlumatı və ya satış dili olmur. İnteqrasiya, dəstək, müqavilə əsasında hostinq və məsləhət kimi işləri şəbəkədən kənardakı şirkətlər öz adları ilə təklif edir.
- **Hamı üçün eyni şərtlər keçərlidir** (PO6). İstinad xidmətləri və qeydiyyat prosesi bütün iştirakçılar üçün eyni şərtlərlə açıqdır. Heç bir xidmət təminatçısına üstünlük verilmir və qərarda Tamga komandasının qurduğu şirkətin də bu qaydaya daxil olduğu açıq yazılıb.
- **İstinad xidmətləri şəbəkənin işləməsi üçün mövcuddur.** Etibar siyahısı nəşriyyatçısı, host edilən yoxlayan tərəf, Qurum Konsolu ilə birlikdə host edilən sənəd vermə xidməti, müvəqqəti şəxsiyyət xidməti və sandbox qurumlar şəbəkəyə qoşula bilsin və hər kəs qaydaları sınaya bilsin deyə yaradılıb. Bunların heç biri satılan məhsul deyil.

Tamga ARF-in idarəetmə bölməsi də bunu açıq yazır. Tamga Network qeyri-kommersiya şəbəkəsidir, onun idarə olunması gələcəkdə fonda veriləcək, heç bir məhsul satmır və kommersiya xidməti göstərmir ([Tamga ARF](https://arf.tamga.network/architecture)). Çərçivənin necə qurulduğunu [Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq](/blog/tamga-arf) yazısında izah etmişik.

## Şəbəkə niyə cüzdan idarə etmir?

Siyahıdakı cüzdanlardan birini özü idarə edən siyahı digər cüzdanlara qarşı neytral qala bilməz. Aİ modelində də hər cüzdanı onu təklif edən təşkilat, yəni həmin cüzdanın provayderi idarə edir və etibar çərçivəsi yalnız cüzdan provayderlərini siyahıya alır.

Tamga Network də bu modeli izləyir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- Şəbəkə heç bir cüzdanın tətbiqini, cüzdan provayderini, saytını və ya dəstək xidmətini idarə etmir və ya host etmir.
- Şəbəkənin domen adları altında heç bir cüzdan xidməti işləmir. Əvvəllər `wallet.tamga.network` ünvanında işləyən cüzdan xidmətləri 6 oktyabr 2026-cı ildə şəbəkədən çıxarıldı.
- Şəbəkənin interfeysləri və paketləri heç bir cüzdanın adını koda yazmır. İnterfeysdə "cüzdanda aç" ifadəsi işlədilir. Cüzdanın adı lazım olanda bu ad cüzdanın siyahıdakı qeydindən götürülür.
- Bir sandbox var və o da şəbəkəyə məxsusdur. Cüzdan tərtibatçıları öz provayderlərini orada qeydiyyatdan keçirir və hamı ilə eyni qurumlara, eyni şəxsiyyət xidmətinə və eyni yoxlayan tərəfə qarşı sınaq aparır.

Şəbəkədəki cüzdanlardan biri olan Tamga Wallet da ayrıca məhsul kimi eyni yolu izləyir. Bu cüzdanın provayderini şəbəkə deyil, cüzdanın öz operatoru öz domeni altında idarə edir. Provayderin siyahıdakı qeydi (`TAMGA-WP-1`) 14 oktyabr 2026-cı ildən aktivdir və onun sertifikatını, digər cüzdanlarda olduğu kimi, həmin operator təqdim edib.

## Siyahılar kimə məxsusdur?

Siyahılar dövlətlərə məxsusdur. İdarəetmə üç səviyyədən ibarətdir və hər səviyyədə qərarı başqa tərəf verir ([ADR-0002](https://docs.tamga.network/adr/0002-sovereignty-first-governance)):

| Səviyyə | Sual | Kim qərar verir |
|---|---|---|
| Şəbəkə üzvlüyü | Yeni dövlət qoşulurmu? | üzv dövlətlər, şura yaradıldıqdan sonra üçdə iki səs çoxluğu ilə |
| Milli qeydiyyat | Dövlət hansı qurumları və yoxlayan tərəfləri qeydiyyata alır? | yalnız həmin dövlət |
| Tanınma | Dövlət başqa dövlətin sənədlərini qəbul edirmi? | hər dövlət özü üçün |

Bundan iki nəticə çıxır. Dövlət heç kimin səsinə ehtiyac olmadan şəbəkədən çıxa bilər. Dövlətin şəbəkədən çıxarılması da onun vətəndaşlarının cüzdanlarındakı sənədləri etibarsız etmir, yalnız həmin dövlətin yeni qeyd yazmasını dayandırır. Şura yaradıldıqdan sonra belə, o yalnız şəbəkənin ortaq qaydalarını idarə edir və dövlətin öz qurumları barədə qərar verə bilməz.

## Bugündən fonda qədər yol necədir?

![Bu günkü müvəqqəti operatordan şuraya və ya fonda, eləcə də ortaq reyestrə doğru](/blog/network-as-a-foundation/en/fig-yol.png)

**Bu gün** Tamga müvəqqəti operator kimi işləyir. Türkiyə siyahısını milli orqan adından dərc edir və bunu siyahının özündə də göstərir. Siyahının `operator` sahəsində `"status": "provisional"` dəyəri və heç vaxt boş qoyulmayan `on_behalf_of` dəyəri olur. Hələ heç kimin ehtiyacı yoxkən ağır institusional quruluş yaratmırıq.

**Bir və ya iki dövlət qoşulmağa hazır olanda** idarəetmə orqanı yaradılacaq. Bu orqan üzv dövlətlərdən ibarət şuradan və idarəetməni təhvil alacaq fond və ya katiblikdən ibarət olacaq. Siyahılar sahiblərinə təhvil veriləcək. Yeni üzvün qəbulu və ya ortaq sənəd növünün əlavə edilməsi kimi şəbəkə səviyyəsindəki qərarlar da birlikdə qəbul ediləcək.

**Ən azı iki müstəqil operator olanda** qeydlər icazəli ortaq reyestrə də köçürüləcək və beləliklə heç bir tərəf onları təkbaşına dəyişə bilməyəcək. Bir operatorun saxladığı reyestr xərci artırır, amma etibarı artırmır. Reyestrin gözləməsinin səbəbi də budur ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).

## Operator dəyişəndə sənədlər niyə pozulmur?

İdentifikatorlar operatora məxsus olmadığı üçün sənədlər pozulmur. Qurumun `issuer_id` dəyəri qurumun öz sertifikatından hesablanır, sənəd növləri sabit URN-lərlə adlandırılır və siyahı formatında artıq hər dövlət üçün yer və bütün rollar müəyyən edilib. Təhvil zamanı `operator` sahəsi, siyahının ünvanı və imzalayanı dəyişir. Cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan və imzalayan dəyişmiş olur, insanların cüzdanlarındakı sənədlər isə etibarlı qalır.

Domen adı, kök sertifikatlar, siyahı arxivi və açarlar kimi kodun köçürə bilmədiyi hissələr yazılı varislik müqaviləsi ilə təhvil verilir. Bunun arxasında belə bir qayda dayanır: Hostinq, domen adı, qeyd aparma və statistika kimi kodla məhdudlaşdırıla bilməyən hər səlahiyyət siyasətlə, ölçülə bilən təhvil həddi ilə və şəffaflıq hesabatı ilə məhdudlaşdırılır (P7 prinsipi).

## O vaxta qədər müvəqqəti operatoru dürüst saxlayan nədir?

Bunu yalnız xoş niyyətə buraxmırıq. Siyahılar imzalanır, versiyalanır və heşlərlə bir-birinə zəncirlənir. Siyahılardan heç nə silinmir. Ləğv siyahısının hər dərci açıq və saatda ən azı bir dəfə yazılan anker jurnalına düşür. Hər dərc də `trust.tamga.network` ünvanındakı açıq dəyişiklik qeydinə yazılır. Qaydalar buna rübdə bir dərc olunacaq şəffaflıq hesabatını və müstəqil auditi əlavə edir, amma hesabatın səhifəsi hələ dərc olunmayıb.

Bu tədbirlərin harada kifayət etmədiyini də açıq deyirik. Bu gün etibar lövbəri bir operatorun imzasına söykənir və açıq qeydlər sui-istifadəni qeyri-mümkün etmir, yalnız onun qarşısını alır. Bu boşluğu ikinci müstəqil operator və ondan sonra gələcək ortaq reyestr bağlayacaq. Təfərrüatları [İmzalı etibar siyahısı necə işləyir](/blog/how-trust-lists-work) yazısında tapa bilərsiniz.

## Bu, hər iştirakçı üçün nə deməkdir?

![Kim nəyi idarə edir: şəbəkə, dövlətlər, rəqəmsal cüzdanlar və xidmət şirkətləri](/blog/network-as-a-foundation/en/fig-ayrim.png)

- **Qurumlar** inteqrasiyada hansı xidmət şirkətindən kömək almasından asılı olmayaraq, hətta heç kömək almasalar belə, eyni şərtlərlə qeydiyyatdan keçir.
- **Cüzdanlar** adları ilə deyil, siyahıdakı qeydləri və qaydalara uyğunluqları ilə tanınır.
- **Xidmət şirkətləri** şəbəkədən kənarda rəqabət aparır və şəbəkənin qaydaları hamısı üçün eynidir.
- **Dövlətlər** öz siyahıları üzərində yeganə söz sahibi olaraq qalır. Tamga-nın bu gün Türkiyə üçün müvəqqəti olaraq üzərinə götürdüyü rolları da hazır olanda təhvil ala bilərlər ([Dövlətlər üçün](/learn/for-states)).

## Tez-tez verilən suallar

### Fond yaradılıbmı?

Hələ yaradılmayıb. İdarəetmə orqanı bir və ya iki dövlət qoşulmağa hazır olanda yaradılacaq. O vaxta qədər Tamga müvəqqəti operator kimi işləyir və siyahılar da bunu açıq yazır.

### Şirkət pul ödəyərək üstünlük və ya daha yaxşı qeyd əldə edə bilərmi?

Xeyr. Şəbəkə xidmət satmır və istinad xidmətləri ilə qeydiyyat prosesi bütün iştirakçılar üçün eyni şərtlərlə açıqdır. Heç bir şirkətə fərqli münasibət göstərilmir.

### Tamga Wallet-in şəbəkədə xüsusi yeri varmı?

Xeyr. Tamga Wallet şəbəkədəki cüzdanlardan biridir, öz operatoru tərəfindən idarə olunur və siyahıya digər cüzdanlarla eyni yolla daxil olur.

### Dövlət şəbəkədən çıxsa, insanların sənədlərinə nə olur?

Sənədlər etibarlı qalır. Çıxmaq dövlətin yeni qeyd yazmasını dayandırır, amma əvvəl verilmiş sənədləri ləğv etmir. Digər dövlətlərin bu sənədləri qəbul etməyə davam edib-etməyəcəyi isə hər dövlətin öz tanınma qərarından asılıdır.

### Bir dövlət şəbəkəni ələ keçirə bilərmi?

Xeyr. Hər dövlət yalnız öz siyahısını yazır, yeni üzvün qəbulu üzv dövlətlərin üçdə ikisinin səsini tələb edir və tanınma qərarını hər dövlət özü verir. Ona görə heç bir dövlət başqasının siyahısına nəzarət edə bilmir.

## Mənbələr

- [Reqlament (Aİ) 2024/1183 (eIDAS 2.0)](https://eur-lex.europa.eu/eli/reg/2024/1183/oj)
- [Aİ Rəqəmsal Şəxsiyyət Cüzdanı: Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Tamga ARF: arxitektura və idarəetmə](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework)
- [ADR-0002: suverenliyi önə qoyan idarəetmə](https://docs.tamga.network/adr/0002-sovereignty-first-governance) · [ADR-0037: şəbəkə yalnız şəbəkədir](https://docs.tamga.network/adr/0037-network-only) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [ADR-0009: blokçeynsiz beta və blokçeyn həddi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)
- [İdarəetmə](/learn/governance) · [Haqqımızda](/about) · [Yol xəritəsi](/roadmap)

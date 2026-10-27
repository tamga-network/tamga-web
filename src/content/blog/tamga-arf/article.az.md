---
title: "Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq?"
slug: tamga-arf
description: "Tamga ARF 1.0 Aİ-nin istinad çərçivəsini izləyir. Onda nə olduğunu, Aİ ilə nəyin eyni qalıb nəyin fərqləndiyini, dövlətin və qurumun necə qoşulduğunu izah edirik."
date: 2026-10-08
lang: az
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Mənbələr: Tamga ARF toplusu (çərçivə README: sənəd toplusu, versiyalar 1.0.0 Active, ilk buraxılış 2026-10-02, türkcə mənbə və rəsmi ingiliscə tərcümə, CC BY 4.0, qərarları toplayır və yeni qərar yaratmır, hər qayda ADR/spesifikasiya/invariant ilə əsaslandırılır); FW-ARF-0001 §1.3 (struktur), §1.4 (eIDAS 2.0 və Avropa İttifaqı (Aİ) ARF ilə əlaqə, EUDI Wallet hüquqi addır, hər rəqəmsal cüzdan bu adı daşıya bilməz), §1.5 (üç qat), §1.6 (P1-P7), §1.7 (əhatə dairəsindən kənar, o cümlədən PID), §3 (rollar cədvəli: TLSO, qeydiyyatçı, milli kök CA, giriş/qeydiyyat sertifikatı provayderi müvəqqəti; PID provayderi boş; müvəqqəti şəxsiyyət attestasiyası provayderi), §4.1 (sandbox vahiddir, şəbəkəyə məxsusdur), §5.1-5.4, §6.1-6.6 (LOTL və ölkə siyahıları, federasiya, siyahı qaydaları, qeydiyyat, etibar səviyyələri, məlum məhdudiyyət), §7.3 (uyğunluq), §8.1-8.4 (mərhələlər, ledger, idarəetmə orqanı, standartlar xəritəsi). FW-TF-0001 §0 (iştirak müqaviləsini imzalayan qurumlar üçün məcburi; Dünya Bankının beş qatlı modeli), §1.3 (əhatə: TDT üzvləri və müşahidəçiləri), §1.6 (orqanlar, şura üçdə iki), §2.4 və §4.1-4.3 (yüngül uyğunluq, qarışıq rejim, açıq uyğunluq vektorları), §6 (üç qarşılıqlı işləkliyi səviyyəsi), §6.1 (xarici siyahılar FD1-FD5, əvvəlcə LoTE), §7 (təhvil planı). FW-RB-0001 (qayda formatı RB-<ROLE>-<NN>, RFC 2119, şaxələnən rulebook-lar, RB-GEN-03, siyahı mərhələsi qeydi). FW-ONB-0001 §5 (dövlət addımları). ADR-0009 (zəncirsiz, iki müstəqil operatorlu ledger), ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (sandbox SB1-SB5), ADR-0041 (özünəxidmət test qurumları), D-GOV-5 (TDT-first: slotlar, tam rol dəsti, operator müvəqqəti, on_behalf_of; təhvil yalnız operatoru dəyişir). Canlı lotl.json 2026-10-08 tarixində yoxlanılıb (TR aktiv; AZ, KZ, KG, UZ rezerv; HU, TM müşahidəçi slotları rezerv; TR rolları tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). Aİ: ARF v3.0.0 (2026-07-23), CIR 2025/848, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF Tamga Network-un qaydalar kitabıdır. O, Aİ-nin Avropa Rəqəmsal Şəxsiyyət Cüzdanı üçün hazırladığı ARF ilə eyni quruluşda qurulmuş Arxitektura və İstinad Çərçivəsidir ([eIDAS 2.0 və Aİ ARF nədir](/blog/eidas-arf-for-the-turkic-world)). 1.0 versiyası 2 oktyabr 2026-cı ildə [arf.tamga.network](https://arf.tamga.network) ünvanında ingilis və türk dillərində dərc olundu. Çərçivənin texniki qatı Aİ-ninki ilə eynidir. Eyni sənəd formatlarından, protokollardan, etibar siyahısı modelindən və rollar dəstindən istifadə edir. Fərqli olan idarəetmə qatıdır. Bu qat Aİ üzvü olmayan və hələ öz siyahısı olmayan dövlətlər üçün yazılıb. Tamga müvəqqəti operator kimi işləyir, hər türk dövləti üçün ayrılmış yer var, açıq sandbox mövcuddur və ikinci müstəqil operator qoşulana qədər ortaq reyestrdən istifadə edilmir.

## Tamga ARF-də nələr var?

![Tamga ARF sənəd dəsti və onun Aİ-dəki qarşılıqları](/blog/tamga-arf/en/fig-yapi.png)

Aİ çərçivəsində olduğu kimi Tamga ARF də əsas sənəddən və əlavələrdən ibarətdir ([Tamga ARF](https://arf.tamga.network/architecture)):

| Sənəd | Nəyi əhatə edir | Aİ-dəki qarşılığı |
|---|---|---|
| Əsas sənəd | İstifadə ssenariləri, rollar, arxitektura, məlumat modeli, etibar modeli, təhlükəsizlik, idarəetmə | EUDI ARF əsas sənədi |
| Əlavə A: Etibar Çərçivəsi | İdarəetmə, hər rol üçün qoşulma şərtləri, uyğunluq, müqavilələr, təhvil planı | icra aktları və milli etibar sxemləri |
| Əlavə B: Tamga Rulebook | Hər rol üçün nömrələnmiş və məcburi qaydalar | ARF Əlavə 2, yüksək səviyyəli tələblər |
| Əlavə C: Qaydalar topluları | Təhsil (tələbə sənədi, diplom), Şəxsiyyət (şəxsiyyət sənədi, sürücülük vəsiqəsi sənədi), Tədbir bileti | attestasiya qaydalar topluları |
| Əlavə D və E | Təriflər; standartlar, qərarlar və qayda mənbələri | ARF Əlavə 1 və istinadlar |
| Oxu yolu, Rollar, Qoşulma | Hər rol üçün oxu ardıcıllığı, hər rolun vəzifəsi, qoşulma addımları | |

Oxumağa başlamazdan əvvəl bu sənəd dəsti barədə üç şeyi bilmək faydalıdır.

**Çərçivə qərarları toplayır, özü qərar vermir.** Çərçivədəki hər qayda qeydə alınmış qərardan (ADR), spesifikasiyadan və ya invariantdan gəlir və istinadlar əlavəsi hər qaydanın mənbəyini göstərir. Mənbəyi olmayan bənd qayda kimi yazılmır. Qaydanı dəyişmək üçün əvvəlcə onun arxasındakı qərar dəyişməlidir və çərçivə də eyni iş daxilində bu dəyişikliyi izləyir.

**Qaydalar nömrələnir və növləri bəllidir.** Hər qaydanın `RB-<ROL>-<NN>` formasında kodu var və qaydalarda MUST, MUST NOT, SHOULD və MAY ifadələri RFC 2119-dakı mənalarında işlədilir. Məsələn, RB-GEN-03 etibar mənbəyi çox köhnədirsə və ya əlçatan deyilsə, nəticənin "qeyri-müəyyən" olmalı olduğunu deyir. Bu halda nəticə heç vaxt "qəbul" və ya "rədd" ola bilməz. Beləliklə auditor və ya inteqrasiyanı aparan komanda məhz hansı qaydaya baxdığını göstərə bilir.

**Sənəd növlərinin qaydalar topluları əsas qaydalar kitabından törəyir.** Təhsil, Şəxsiyyət və Tədbir bileti qaydalar topluları bütün ortaq qaydaları miras alır və yalnız öz növlərinə xas məsələləri əlavə edir. Bunlar sənədi kimin verdiyi, hansı şəxsiyyət yoxlamasının aparıldığı, hansı sahələrin olduğu, sənədin nə qədər etibarlı olduğu və necə ləğv edildiyidir. Yeni sahə üçün qaydalar toplusunun yazılması yeddi bəndlik yoxlama siyahısı tamamlandıqdan sonra mümkündür ([Rulebook](https://arf.tamga.network/rulebook)).

Türk dilindəki mətn mənbə mətndir, ingilis dilindəki mətn isə eyni versiyanın rəsmi tərcüməsidir və ikisi həmişə eyni versiyada saxlanılır. Sənədlər CC BY 4.0 lisenziyası ilə dərc olunur və hər dəyişiklik çərçivənin [Nə dəyişdi](https://arf.tamga.network/changes) səhifəsində sadalanır.

## Aİ ilə nə eyni qalır?

Qaydaya görə texniki qat Aİ ilə eyni qalır. Tamga-nın mövqeləndirmə qərarı sənəd, protokol və etibar siyahısı formatlarının Aİ standartlarından ayrılmayacağını deyir. Tamga-ya xas hər əlavə də standart müştəriləri pozmayan genişlənmə nöqtəsi vasitəsilə edilir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Praktikada bu belə görünür:

- **Sənəd formatları:** bütün sənəd növləri üçün IETF SD-JWT VC; şəxsiyyət sənədinin ikinci forması kimi, əyani təqdimat və sıfır bilikli sübut üçün ISO/IEC 18013-5 mdoc.
- **Protokollar:** sənəd vermək üçün OpenID4VCI 1.0, təqdim etmək üçün DCQL ilə birlikdə OpenID4VP 1.0; hər ikisi HAIP 1.0 profilinə görə.
- **Ləğv:** IETF Token Status List.
- **Qurumun kimliyi:** milli kökə bağlanan X.509 sertifikatları.
- **Etibar modeli:** milli siyahıları göstərən siyahılar siyahısı (LOTL), yəni Aİ-dəki iki səviyyəli quruluşun eynisi. Siyahılar versiyalanır, heşlərlə bir-birinə zəncirlənir və imzalanır. Etibar siyahısının sahələri ETSI TS 119 612 və ETSI TS 119 602-yə uyğunlaşdırılır.
- **Xarici siyahılar:** başqa dövlətin və ya Aİ-nin idarə etdiyi siyahı ETSI TS 119 602 formatında (LoTE, etibarlı subyektlərin siyahıları), imzalayanı sabitlənmiş və əhatə dairəsi müəyyən edilmiş şəkildə oxunur ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)).
- **Etibar edən tərəfin qeydiyyatı:** yoxlayan tərəflər Aİ-nin ümumi qeydiyyat məlumat dəsti ilə qeydiyyatdan keçir və (Aİ) 2025/848 saylı İcra Reqlamenti ilə ETSI TS 119 475 modelinə uyğun qeydiyyat sertifikatı alır. Cüzdan da hər sorğunu bu sertifikatla müqayisə edir.
- **Cüzdan təhlükəsizliyi:** cüzdan provayderindən alınan cüzdan nüsxəsi attestasiyası və açar attestasiyası; açarlar cihazın təhlükəsiz aparat modulunda saxlanılır.
- **Etibarlılıq səviyyələrinin adları:** şəxsiyyətin yoxlanılması üçün Low, Substantial və High; sənədlər üçün EAA və QEAA terminləri.
- **Rollar dəsti:** etibar siyahısı operatorundan vasitəçi yoxlayan tərəfə qədər ARF-dəki bütün rollar; onların hər birinin hər milli siyahıda yeri var.

Məqsəd Aİ ekosistemi üçün yazılmış proqram təminatının Tamga sənədini Tamga-ya xas kod əlavə etmədən emal edə bilməsidir. Burada "Aİ ilə uyğun" ifadəsi bunu bildirir və bu uyğunluğu etiketlə deyil, testlərlə göstəririk.

## Nə fərqlənir və niyə?

![Texniki qat Aİ-ninki ilə eynidir; idarəetmə qatı türk dünyası üçün yazılıb](/blog/tamga-arf/en/fig-ayni-farkli.png)

Aİ çərçivəsi reqlamentin, orqanları qurulmuş üzv dövlətlərin və sertifikatlaşdırma sisteminin mövcud olduğunu fərz edir. Tamga ARF isə Aİ-dən kənarda bunların heç biri olmadan da işləməlidir. Bu vəziyyət altı fərqə gətirib çıxarır.

### 1. Müvəqqəti operator var və bu açıq yazılır

Aİ-də hər üzv dövlət öz etibar siyahısını idarə edir. Tamga Network-da isə hələ heç bir dövlət bu rolu üzərinə götürməyib. Ona görə Türkiyə siyahısını Tamga milli orqan adından müvəqqəti olaraq dərc edir. Siyahı bunu öz məlumatında da yazır, beləliklə heç kim bu barədə şifahi təminata söykənməli olmur:

```json title="The operator of the Türkiye list (live list of trusted lists, 8 October 2026)"
{
  "state_code": "TR",
  "status": "ACTIVE",
  "operator": {
    "name": "Tamga Network",
    "status": "provisional",
    "on_behalf_of": "TR national authority (to be designated)"
  }
}
```

Tamga-nın bu şəkildə üzərinə götürdüyü rollar etibar siyahısı operatoru, qeydiyyat orqanı, milli kök sertifikat orqanı və giriş sertifikatı provayderidir. Bunların hər biri təhvil veriləcək şəkildə qurulub. Təhvil zamanı operator sahəsi, siyahının ünvanı və imzalayanı dəyişir. Qurum identifikatorları, sənəd növü identifikatorları və artıq verilmiş sənədlər isə dəyişmir.

### 2. İlk gündən hər türk dövləti üçün yer ayrılıb

Çərçivədə heç bir quruluş bir operatorun olacağını fərz etmir. Siyahılar siyahısında artıq Türk Dövlətləri Təşkilatının hər üzv dövləti (Azərbaycan, Qazaxıstan, Qırğızıstan, Türkiyə, Özbəkistan) və müşahidəçi dövlətlər Macarıstan və Türkmənistan üçün yer var. Hazırda yalnız Türkiyə aktivdir, digər yerlər ayrılmış vəziyyətdədir. Hər milli siyahı boş qalan rollar da daxil olmaqla ARF-dəki bütün rollar dəstini daşıyır. Sonradan qoşulan dövlət yenidən layihələndirmə tələb etməsin deyə bu qayda erkən mərhələdə "əvvəlcə TDT" prinsipi kimi qoyuldu.

### 3. Dizayna görə PID yoxdur

Aİ-nin cüzdanı dövlətin verdiyi şəxsi identifikasiya məlumatlarına (PID) söykənir. Tamga bu rolu üzərinə götürmür və hər milli siyahıda PID provayderinin yeri dövlətə ayrılıb. Dövlət bu yeri doldurana qədər müvəqqəti şəxsiyyət xidməti uzaqdan şəxsiyyət yoxlamasından sonra şəxsiyyət sənədi verir. Bu sənəd atribut attestasiyasıdır və PID sayılmır. Sənədin qaydalar toplusu isə Aİ-nin PID qaydalar toplusundakı quruluşu izləyir, beləliklə PID provayderi gələndə keçid asan olur.

### 4. Sertifikatlaşdırmadan əvvəl uyğunluq gəlir

Aİ-də cüzdanlar 2024/2981 saylı İcra Reqlamentinə əsasən uyğunluğu qiymətləndirən orqanlar tərəfindən sertifikatlaşdırılır. Tamga ARF isə qarışıq üsuldan istifadə edir. Hər rol canlı istifadəyə keçməzdən əvvəl öz proqram təminatı ilə açıq və versiyalanmış uyğunluq test vektorlarını və öhdəlik testlərini işlədir. Ən yüksək sənəd verən sinfi əvvəlcədən yoxlanılır, digərləri isə sonradan yoxlanılır. Müstəqil qiymətləndirmə orqanları və milli sertifikatlaşdırma dövlətlər qoşulanda sistemə əlavə olunacaq ([Etibar Çərçivəsi](https://arf.tamga.network/trust-framework)).

### 5. Bir açıq sandbox var

Aİ-nin istinad tətbiqləri və pilot layihələri var. Tamga Network bunlara əlavə olaraq şəbəkənin eyni qaydalarla idarə etdiyi bir test şəbəkəsi təklif edir: [sandbox.tamga.network](https://sandbox.tamga.network). Sandbox-ın öz test kökü, öz siyahıları, nümunə qurumları və uydurma şəxsləri var ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Qurum orada özü test qurumu aça bilər, cüzdan tərtibatçıları da öz cüzdan provayderlərini orada qeydiyyatdan keçirə bilər. Heç bir real cüzdan və ya yoxlayan tərəf sandbox köklərinə etibar etmədiyi üçün sandbox-da alınmış sənəd real şəbəkədə heç vaxt yoxlamadan keçmir.

### 6. Hələ ortaq reyestr yoxdur

Bu gün etibar imzalanmış siyahılardan və saatda ən azı bir dəfə yazılan açıq anker jurnalından gəlir və Aİ modeli də belə işləyir. İcazəli reyestr planın bir hissəsidir, amma yalnız ən azı iki müstəqil operator qoşulanda işə düşəcək, çünki bir operatorun saxladığı reyestr xərci artırır, etibarı isə artırmır ([ADR-0009](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çərçivə bu məhdudiyyəti açıq yazır. O vaxta qədər etibar lövbəri bir operatorun imzasına söykənir və açıq qeydlər sui-istifadənin qarşısını tam almır, yalnız çəkindirir. Təfərrüatları [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet) yazısında tapa bilərsiniz.

Hüquqi əsas da fərqlidir. Aİ-də qaydalar reqlament belə dediyi üçün məcburidir. Tamga Network-da isə Etibar Çərçivəsi iştirak müqaviləsini imzalayan hər qurumu bağlayır. Dövlətlər qoşulanda idarəetmə qərarlarını üçdə iki səs çoxluğu ilə qəbul edən üzv dövlətlər şurasına keçəcək ([Tamga Network niyə qeyri-kommersiyadır və fonda keçəcək?](/blog/network-as-a-foundation)).

## Dövlət necə qoşulur?

![Dövlətin öz rollarını üzərinə götürmə mərhələləri](/blog/tamga-arf/en/fig-devlet.png)

Dövlətin yeni sistem qəbul etməsinə ehtiyac yoxdur. Üzərində artıq öz adı yazılmış rolları təhvil alması kifayətdir ([Qoşulma](https://arf.tamga.network/onboarding)):

1. **Niyyət.** Dövlət qoşulmaq istədiyini bildirir. İlk dövlət operatoru canlı mühitə keçəndə şura yaradılır.
2. **Kök sertifikat.** Dövlətin kök sertifikatı oflayn mərasimdə yaradılır və müvəqqəti kök sertifikatın yanına, zamanla onu əvəz edəcək şəkildə əlavə olunur.
3. **Siyahının idarə olunması və qeydiyyat orqanı.** Milli siyahının operator sahəsi dövlətə keçir və qeydiyyat səlahiyyəti də ona verilir. Bundan sonra müvəqqəti operator həmin dövlətdə heç kimi qeydiyyata ala bilmir.
4. **PID provayderi.** Dövlət öz PID provayderini təyin edir və müvəqqəti şəxsiyyət sənədi ona təhvil verilir.

Bu addımların heç biri sənədi, qeydi və ya identifikatoru etibarsız etmir. Hər dövlət öz siyahısının yeganə müəllifi olaraq qalır və başqa dövlətin siyahısını tanıyıb-tanımamağa özü qərar verir. Milli siyahının dərci ilə bağlı texniki addımları [Milli siyahının dərci](https://docs.tamga.network/guides/publish-national-list) adlı tərtibatçı bələdçisində tapa bilərsiniz.

## Qurum necə qoşulur?

Qurum əvvəlcə sandbox-dan, sonra isə Etibar Çərçivəsinin qoşulma şərtlərindən keçərək qoşulur. Universitet, peşə palatası, dövlət qurumu və ya bilet satıcısı bütün prosesi sandbox-da sınayır, uyğunluq testlərini işlədir və sonra üç sənəd verən səviyyəsindən birində qeydiyyatdan keçir. Bu səviyyələr qeydiyyatlı, müqaviləli və akkreditasiyalıdır. Hər sənəd növü üçün ayrıca səlahiyyət verilir və səlahiyyət standart olaraq bağlı gəlir. Yoxlayan tərəflər ümumi qeydiyyat məlumat dəsti ilə qeydiyyatdan keçir və hər istifadə üçün qeydiyyat sertifikatı alır. Qeydiyyat hüquqi lisenziya demək deyil. Məsələn, diplom vermək hüququ yenə də qurumun tabe olduğu qanundan gəlir. Addımları [Qurum Tamga Network-a necə qoşulur?](/blog/join-as-an-institution) yazısında izah etmişik.

## Oxumağa haradan başlamalı?

Çərçivədə hər rol üçün [oxu yolu](https://arf.tamga.network/reading-path) var. Qısaca desək:

- **Dövlət və ya tənzimləyici qurum:** əsas sənədin rollar və idarəetmə bölmələrindən başlayıb Etibar Çərçivəsinin təhvil planına keçə bilər.
- **Sənəd verən qurum:** Rollar səhifəsini, Tamga Rulebook-dakı sənəd verən qaydalarını və sənəd növünün qaydalar toplusunu, məsələn [Təhsil qaydalar toplusunu](https://arf.tamga.network/rulebooks/education) oxuya bilər.
- **Yoxlayan tərəf və ya cüzdan tərtibatçısı:** Tamga Rulebook-da öz roluna aid qaydaları oxuyub sonra `docs.tamga.network` ünvanındakı tərtibatçı sənədlərinə və uyğunluq testlərinə keçə bilər.

## Tez-tez verilən suallar

### Tamga ARF Aİ ARF-nin surətidirmi?

Tamga ARF Aİ ARF-nin quruluşunu izləyir və eyni standartlardan istifadə edir, amma öz idarəetməsi olan ayrıca çərçivədir. Aİ qaydası reqlamentə və ya üzv dövlət orqanına söykənirsə, Tamga ARF-də onlarsız da işləyən qayda var və həmin rolu bu gün kimin üzərinə götürdüyü yazılır.

### Aİ yeni ARF versiyası dərc edəndə nə baş verir?

Tamga Aİ qaydalarını dərc olunduqca izləyir. Dəyişikliklər əvvəlcə öz qərarlarına, sonra isə çərçivəyə daxil edilir. Hər dəyişiklik yeni çərçivə versiyası kimi çıxır və Nə dəyişdi səhifəsində sadalanır.

### Tamga ARF-ə əməl edən cüzdan EUDI Wallet olurmu?

Xeyr. "EUDI Wallet" Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı və Aİ qaydalarına əsasən sertifikatlaşdırılmış cüzdanlara verilən hüquqi statusdur. Tamga ARF-ə əməl etmək cüzdanı Aİ ilə uyğun edir və onun Tamga Network-da siyahıya alınmasına imkan verir.

### Dövlət qaydaları dəyişə bilərmi?

Hər dövlət öz siyahısını və qeydiyyatlarını idarə edir. Yeni üzvün qəbulu və ya ortaq sənəd növünün əlavə edilməsi kimi şəbəkə səviyyəsindəki qaydalar barədə isə yaradıldıqdan sonra üzv dövlətlər şurası üçdə iki səslə qərar verəcək.

### Çərçivədən istifadə pulsuzdurmu?

Bəli. Sənədlər CC BY 4.0 lisenziyası ilə dərc olunur və şəbəkənin paketləri Apache-2.0 lisenziyalı açıq mənbəli proqramlardır.

## Mənbələr

- [Tamga ARF 1.0](https://arf.tamga.network) · [Arxitektura](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/rulebook) · [Rollar](https://arf.tamga.network/roles) · [Qoşulma](https://arf.tamga.network/onboarding) · [Nə dəyişdi](https://arf.tamga.network/changes)
- [ADR-0035: mövqeləndirmə](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: etibar federasiyası](https://docs.tamga.network/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox) · [ADR-0009: zəncirsiz beta və zəncir həddi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: suverenliyi önə çəkən idarəetmə](https://docs.tamga.network/adr/0002-sovereignty-first-governance)
- [Federasiya](https://docs.tamga.network/concepts/federation) · [Milli siyahının dərci](https://docs.tamga.network/guides/publish-national-list) · [Uyğunluq](https://docs.tamga.network/guides/conformance)
- [EUDI Wallet Arxitektura və İstinad Çərçivəsi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Komissiyanın (Aİ) 2025/848 saylı İcra Reqlamenti: cüzdana etibar edən tərəflərin qeydiyyatı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(Aİ) 2024/2981 saylı İcra Reqlamenti: rəqəmsal cüzdanların sertifikatlaşdırılması](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Qaydalar və qaydalar topluları](/learn/rules-and-rulebooks) · [Dövlətlər üçün](/learn/for-states) · [Ağ kitab (Whitepaper)](/whitepaper)

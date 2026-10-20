---
title: "Tamga ARF: Avropa çərçivəsini necə uyğunlaşdırdıq"
slug: tamga-arf
description: "Tamga ARF 1.0 Aİ-nin istinad çərçivəsinə əsaslanır: nələri əhatə edir, nə eyni qalır, nə fərqlənir və niyə, dövlətlər və qurumlar necə iştirak edir."
date: 2026-10-08
lang: az
category: europe
draft: false
related: eidas-arf-for-the-turkic-world, join-as-an-institution, network-as-a-foundation, learn:rules-and-rulebooks, learn:for-states
---

<!-- Mənbələr: Tamga ARF toplusu (çərçivə README: sənəd toplusu, versiyalar 1.0.0 Active, ilk buraxılış 2026-10-02, türkcə mənbə və rəsmi ingiliscə tərcümə, CC BY 4.0, qərarları toplayır və yeni qərar yaratmır, hər qayda ADR/spesifikasiya/invariant ilə əsaslandırılır); FW-ARF-0001 §1.3 (struktur), §1.4 (eIDAS 2.0 və Avropa İttifaqı (Aİ) ARF ilə əlaqə, EUDI Wallet hüquqi addır, hər rəqəmsal cüzdan bu adı daşıya bilməz), §1.5 (üç qat), §1.6 (P1-P7), §1.7 (əhatə dairəsindən kənar, o cümlədən PID), §3 (rollar cədvəli: TLSO, qeydiyyatçı, milli kök CA, giriş/qeydiyyat sertifikatı provayderi müvəqqəti; PID provayderi boş; müvəqqəti şəxsiyyət attestasiyası provayderi), §4.1 (sandbox vahiddir, şəbəkəyə məxsusdur), §5.1-5.4, §6.1-6.6 (LOTL və ölkə siyahıları, federasiya, siyahı qaydaları, qeydiyyat, etibar səviyyələri, məlum məhdudiyyət), §7.3 (uyğunluq), §8.1-8.4 (mərhələlər, ledger, idarəetmə orqanı, standartlar xəritəsi). FW-TF-0001 §0 (iştirak müqaviləsini imzalayan qurumlar üçün məcburi; Dünya Bankının beş qatlı modeli), §1.3 (əhatə: TDT üzvləri və müşahidəçiləri), §1.6 (orqanlar, şura üçdə iki), §2.4 və §4.1-4.3 (yüngül uyğunluq, qarışıq rejim, açıq uyğunluq vektorları), §6 (üç qarşılıqlı işləkliyi səviyyəsi), §6.1 (xarici siyahılar FD1-FD5, əvvəlcə LoTE), §7 (təhvil planı). FW-RB-0001 (qayda formatı RB-<ROLE>-<NN>, RFC 2119, şaxələnən rulebook-lar, RB-GEN-03, siyahı mərhələsi qeydi). FW-ONB-0001 §5 (dövlət addımları). ADR-0009 (zəncirsiz, iki müstəqil operatorlu ledger), ADR-0035 (PO1-PO4), ADR-0036, ADR-0037, ADR-0038 (sandbox SB1-SB5), ADR-0041 (özünəxidmət test qurumları), D-GOV-5 (TDT-first: slotlar, tam rol dəsti, operator müvəqqəti, on_behalf_of; təhvil yalnız operatoru dəyişir). Canlı lotl.json 2026-10-08 tarixində yoxlanılıb (TR aktiv; AZ, KZ, KG, UZ rezerv; HU, TM müşahidəçi slotları rezerv; TR rolları tlso/registrar/access_ca PROVISIONAL, pid_provider RESERVED). Aİ: ARF v3.0.0 (2026-07-23), CIR 2025/848, ETSI TS 119 602, ETSI TS 119 475. -->

Tamga ARF Tamga Network-un qaydalar toplusudur: Avropa İttifaqının (Aİ) Avropa Rəqəmsal Şəxsiyyət Cüzdanı üçün hazırladığı ARF ilə eyni struktur üzərində qurulmuş Arxitektura və İstinad Çərçivəsi ([eIDAS 2.0 və Aİ ARF nədir](/blog/eidas-arf-for-the-turkic-world)). 1.0 versiyası 2 oktyabr 2026-cı ildə [arf.tamga.network](https://arf.tamga.network) ünvanında ingilis və türk dillərində dərc olunub. Onun texniki qatı Aİ-ninki ilə eynidir: eyni rəqəmsal sənəd formatları, protokollar, etibar siyahısı modeli və rollar dəsti. Fərqli olan idarəetmə qatıdır: bu qat Aİ-yə daxil olmayan və hələ öz siyahıları olmayan dövlətlər üçün yazılıb. Tamga müvəqqəti operator kimi çıxış edir, hər türk dövləti üçün ayrılmış yer və hamıya açıq sınaq mühiti (sandbox) var, ikinci müstəqil operator qoşulana qədər isə ortaq reyestr (ledger) yoxdur.

## Tamga ARF nələri əhatə edir?

![Tamga ARF sənəd dəsti və onun Aİ-dəki qarşılıqları](/blog/tamga-arf/en/fig-yapi.png)

Aİ çərçivəsi kimi, Tamga ARF də bir əsas sənəddən və əlavələrdən ibarətdir ([Tamga ARF](https://arf.tamga.network/architecture)):

| Sənəd | Nəyi əhatə edir | Aİ-dəki qarşılığı |
|---|---|---|
| Əsas sənəd | İstifadə ssenariləri, rollar, arxitektura, məlumat modeli, etibar modeli, təhlükəsizlik, idarəetmə | EUDI ARF əsas sənədi |
| Əlavə A: Etibar Çərçivəsi | İdarəetmə, hər rol üçün qoşulma şərtləri, uyğunluq, müqavilələr, təhvil planı | icra aktları və milli etibar sxemləri |
| Əlavə B: Tamga Rulebook | Hər rol üçün nömrələnmiş, məcburi qaydalar | ARF Əlavə 2, yüksək səviyyəli tələblər |
| Əlavə C: Qaydalar toplusu | Təhsil (tələbə sənədi, diplom), Şəxsiyyət (şəxsiyyət təsdiqi, sürücülük vəsiqəsi təsdiqi), Tədbir bileti | təsdiq (attestation) qaydalar toplusu |
| Əlavə D və E | Təriflər; standartlar, qərarlar və qayda mənbələri | ARF Əlavə 1 və istinadlar |
| Oxu yolu, Rollar, Qoşulma | Hər rol üçün oxu ardıcıllığı, hər rolun nə etdiyi, qoşulma addımları | |

Dəsti oxumazdan əvvəl onun haqqında üç şeyi bilmək faydalıdır.

**O, qərar vermir, mövcud qərarları toplayır.** Çərçivədəki hər qayda qeydə alınmış qərardan (ADR), spesifikasiyadan və ya invariantdan götürülür və istinadlar əlavəsi hər birinin mənbəyini göstərir. Mənbəyi olmayan müddəa qayda kimi yazılmır. Qaydanı dəyişmək üçün əvvəlcə onun əsasındakı qərar dəyişir, çərçivə isə eyni iş çərçivəsində buna uyğunlaşdırılır.

**Qaydalar nömrələnir və növə görə fərqləndirilir.** Hər qaydanın `RB-<ROLE>-<NN>` formasında kodu var və MUST, MUST NOT, SHOULD və MAY ifadələri RFC 2119-dakı mənada işlədilir. Məsələn, RB-GEN-03 deyir ki, etibar mənbəyi köhnəlibsə və ya əlçatan deyilsə, nəticə "qeyri-müəyyən" olmalıdır, heç vaxt "qəbul edildi" və ya "rədd edildi" yox. Auditor və ya inteqrator konkret qaydaya istinad edə bilər.

**Rəqəmsal sənəd qaydalar toplusu əsas qaydalar toplusundan törəyir.** Təhsil, Şəxsiyyət və Tədbir bileti qaydalar toplusu bütün ümumi qaydaları miras alır və yalnız öz növünə xas olanı əlavə edir: sənədi kim verir, şəxsiyyət hansı üsulla təsdiqlənir, hansı sahələr var, nə qədər etibarlıdır və necə ləğv edilir. Yeni sahə yalnız yeddi bəndlik yoxlama siyahısı tamamlandıqdan sonra ayrıca qaydalar toplusuna çevrilir ([Qaydalar toplusu](https://arf.tamga.network/rulebook)).

Türkcə mətn mənbə, ingiliscə mətn isə eyni versiyanın rəsmi tərcüməsidir; hər ikisi həmişə eyni versiyada olur. Sənədlər CC BY 4.0 lisenziyası ilə dərc olunur və hər dəyişiklik çərçivənin [Nə dəyişdi](https://arf.tamga.network/changes) səhifəsində göstərilir.

## Aİ ilə nə eyni qalır?

Qayda olaraq texniki qat. Tamga-nın mövqeləndirmə qərarına görə, onun rəqəmsal sənəd, protokol və etibar siyahısı formatları Aİ standartlarından kənara çıxmır, Tamga-ya xas istənilən əlavə isə standart müştəri proqramlarını pozmayan standart genişlənmə nöqtəsindən istifadə edir ([ADR-0035](https://docs.tamga.network/adr/0035-positioning-three-layers)). Praktikada:

- **Rəqəmsal sənəd formatları:** bütün rəqəmsal sənəd növləri üçün IETF SD-JWT VC, şəxsiyyət sənədinin ikinci təqdimatı kimi isə üzbəüz təqdimat və sıfır biliklə sübut (zero-knowledge proof) üçün ISO/IEC 18013-5 mdoc.
- **Protokollar:** sənəd vermək üçün OpenID4VCI 1.0, təqdimat üçün DCQL ilə OpenID4VP 1.0, hər ikisi HAIP 1.0 profili çərçivəsində.
- **Ləğv:** IETF Token Status List.
- **Qurumun kimliyi:** milli kök sertifikatına bağlanan X.509 sertifikatları.
- **Etibar modeli:** milli siyahılara istinad edən etibarlı siyahılar siyahısı (LOTL), Aİ-də olduğu kimi iki səviyyə. Siyahılar versiyalanır, hash zənciri ilə bağlanır və imzalanır, etibar siyahısı sahələri isə ETSI TS 119 612 və ETSI TS 119 602 ilə uyğunlaşdırılır.
- **Xarici siyahılar:** başqasının — başqa dövlətin və ya Aİ-nin — idarə etdiyi siyahı ETSI TS 119 602 formatında (LoTE, etibarlı subyektlər siyahıları), sabitlənmiş imzalayan və müəyyən edilmiş əhatə dairəsi ilə oxunur ([ADR-0036](https://docs.tamga.network/adr/0036-trust-federation-external-lists)).
- **Etibar edən tərəflərin qeydiyyatı:** yoxlayan tərəflər Aİ-nin ümumi qeydiyyat məlumat dəsti ilə qeydiyyatdan keçir və (Aİ) 2025/848 saylı İcra Reqlamenti və ETSI TS 119 475 modelində qeydiyyat sertifikatları alır; rəqəmsal cüzdan hər sorğunu sertifikatla müqayisə edir.
- **Rəqəmsal cüzdan təhlükəsizliyi:** cüzdan provayderindən cüzdan nüsxəsi təsdiqləri və açar təsdiqləri, açarlar isə cihazın təhlükəsiz aparat modulunda.
- **Etibarlılıq səviyyələrinin adları:** şəxsiyyətin təsdiqi üçün Low, Substantial və High, rəqəmsal sənədlər üçün isə EAA və QEAA terminləri.
- **Rollar dəsti:** etibarlı siyahı sxeminin operatorundan etibar edən tərəfin vasitəçisinə qədər ARF rolları, hər birinin hər milli siyahıda öz yeri var.

Məqsəd odur ki, Aİ ekosistemi üçün yazılmış proqram təminatı Tamga rəqəmsal sənədini Tamga-ya xas kod yolu olmadan emal edə bilsin. Burada "Aİ ilə uyğun" ifadəsi məhz bunu bildirir və bu, etiketlə deyil, testlərlə göstərilir.

## Nə fərqlənir və niyə?

![Texniki qat Aİ-ninki ilə eynidir; idarəetmə qatı türk dünyası üçün yazılıb](/blog/tamga-arf/en/fig-ayni-farkli.png)

Aİ çərçivəsi reqlamentin, səlahiyyətli orqanları formalaşmış üzv dövlətlərin və sertifikatlaşdırma sisteminin mövcudluğunu nəzərdə tutur. Tamga ARF isə Aİ-dən kənarda bunların heç biri hələ yaranmamışdan əvvəl işləməlidir. Buradan altı fərq irəli gəlir.

### 1. Müvəqqəti operator — və bu, açıq bildirilir

Aİ-də hər üzv dövlət öz etibarlı siyahısını idarə edir. Tamga Network-da isə hələ heç bir dövlət bu rolu üzərinə götürməyib, ona görə də Tamga Türkiyə siyahısını milli orqan adından müvəqqəti olaraq dərc edir. Siyahı bunu öz məlumatlarında qeyd edir ki, heç kim buna sadəcə etibar etmək məcburiyyətində qalmasın:

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

Tamga-nın bu şəkildə icra etdiyi rollar etibarlı siyahı operatoru, qeydiyyatçı, milli kök sertifikat orqanı və giriş sertifikatı provayderidir. Hər biri təhvil verilmək üçün nəzərdə tutulub. Təhvil zamanı operator sahəsi, siyahının ünvanı və onun imzalayanı dəyişir; qurum identifikatorları, rəqəmsal sənəd növlərinin identifikatorları və artıq verilmiş rəqəmsal sənədlər dəyişmir.

### 2. İlk gündən hər türk dövləti üçün yer

Çərçivədə heç nə tək operatorun olacağını nəzərdə tutmur. Etibarlı siyahılar siyahısında artıq Türk Dövlətləri Təşkilatının hər üzv dövləti (Azərbaycan, Qazaxıstan, Qırğızıstan, Türkiyə, Özbəkistan) və müşahidəçi dövlətlər olan Macarıstan və Türkmənistan üçün yer var. Hazırda yalnız Türkiyə aktivdir, digərləri isə ehtiyatda saxlanılır. Hər milli siyahı, hətta bəzi rollar boş olsa belə, ARF rollarının tam dəstini ehtiva edir. Bu qayda erkən mərhələdə "TDT-first" prinsipi kimi məhz ona görə müəyyən edildi ki, sonradan qoşulan dövlət sistemin yenidən layihələndirilməsinə səbəb olmasın.

### 3. PID yoxdur — bu, qəsdən belədir

Avropa İttifaqının (Aİ) rəqəmsal cüzdanı PID-ə, yəni dövlətin verdiyi şəxsin identifikasiya məlumatlarına əsaslanır. Tamga bu rolu öz üzərinə götürmür. Hər milli siyahıda PID provayderi yeri dövlət üçün ayrılıb. Dövlət bu yeri tutana qədər müvəqqəti şəxsiyyət xidməti məsafədən şəxsiyyət yoxlamasından sonra şəxsiyyət attestasiyası verir. Bu attestasiya PID deyil, atributların attestasiyasıdır və onun qaydalar toplusu Aİ-nin PID qaydalar toplusunun nümunəsini izləyir ki, PID provayderi gəldikdə keçid rahat olsun.

### 4. Sertifikatlaşdırmadan əvvəl uyğunluq

Aİ-də rəqəmsal cüzdanlar 2024/2981 saylı İcra Reqlamentinə əsasən uyğunluğu qiymətləndirən qurumlar tərəfindən sertifikatlaşdırılır. Tamga ARF qarışıq rejim tətbiq edir: hər rolun canlı istifadəyə keçməzdən əvvəl öz proqram təminatı ilə icra etdiyi açıq, versiyalaşdırılmış uyğunluq test vektorları və öhdəlik testləri, sənədi verən qurumların ən yüksək sinfi üçün ilkin qiymətləndirmə, digərləri üçün isə sonradan aparılan yoxlamalar. Müstəqil qiymətləndirmə qurumları və milli sertifikatlaşdırma dövlətlər qoşulduqda əlavə olunur ([Etibar Çərçivəsi](https://arf.tamga.network/trust-framework)).

### 5. Vahid açıq sandbox

Aİ-nin istinad tətbiqləri və pilot layihələri var. Tamga Network buna əlavə olaraq [sandbox.tamga.network](https://sandbox.tamga.network) ünvanında vahid test şəbəkəsi təqdim edir: onu eyni qaydalar əsasında şəbəkənin özü idarə edir, onun öz test kökü, öz siyahıları, nümunə qurumları və uydurma şəxsləri var ([ADR-0038](https://docs.tamga.network/adr/0038-sandbox)). Qurum orada test qurumunu müstəqil şəkildə aça bilər, cüzdan tərtibatçıları isə öz cüzdan provayderlərini orada qeydiyyatdan keçirirlər. Heç bir real rəqəmsal cüzdan və ya yoxlayan tərəf sandbox kökünə etibar etmir, ona görə də sandbox rəqəmsal sənədi real şəbəkədə heç vaxt yoxlamadan keçmir.

### 6. Hələlik ortaq reyestr yoxdur

Bu gün etibar imzalanmış siyahılardan və hər saat yenilənən açıq lövbər jurnalından (anchor log) gəlir — bu, Aİ modelidir. İcazəli (permissioned) reyestr plana daxildir, lakin yalnız ən azı iki müstəqil operator iştirak etdikdən sonra, çünki bir operatorun apardığı reyestr xərc əlavə edir, etibar isə əlavə etmir ([ADR-0009](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold)). Çərçivə bu məhdudiyyəti açıq bildirir: o vaxta qədər lövbər bir operatorun imzasına əsaslanır, açıq jurnallar isə sui-istifadənin qarşısını almır, yalnız ondan çəkindirir. Ətraflı: [Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet).

Hüquqi əsas da fərqlidir. Aİ-də qaydalar reqlament belə müəyyən etdiyi üçün məcburidir. Tamga Network-da isə Etibar Çərçivəsi iştirak müqaviləsini imzalayan hər bir qurum üçün məcburidir, dövlətlər qoşulduqdan sonra isə idarəetmə üçdə iki səs çoxluğu ilə qərar qəbul edən üzv dövlətlər şurasına keçir ([Tamga Network niyə qeyri-kommersiyadır və niyə fonda çevrilir](/blog/network-as-a-foundation)).

## Dövlət necə iştirak edir?

![Dövlətin öz rollarını üzərinə götürmə mərhələləri](/blog/tamga-arf/en/fig-devlet.png)

Dövlətin yeni sistem qəbul etməsinə ehtiyac yoxdur. O, artıq öz adına ayrılmış rolları üzərinə götürür ([Qoşulma](https://arf.tamga.network/onboarding)):

1. **Niyyət.** Dövlət qoşulmaq istədiyini bildirir. İlk dövlət operatoru istismara keçdikdə şura yaradılır.
2. **Kök sertifikat.** Dövlətin kök sertifikatı oflayn mərasimdə yaradılır və müvəqqəti sertifikatın yanına keçid (rollover) kimi əlavə olunur.
3. **Siyahının idarə olunması və qeydiyyatçı.** Milli siyahının operator sahəsi dövlətə keçir, qeydiyyat da həmçinin. Bundan sonra müvəqqəti operator həmin dövlətdə heç kəsi qeydiyyata ala bilməz.
4. **PID provayderi.** Dövlət öz PID provayderini təyin edir və müvəqqəti şəxsiyyət attestasiyası ona təhvil verilir.

Bu mərhələlərin heç biri hər hansı rəqəmsal sənədi, qeydi və ya identifikatoru etibarsız etmir. Hər dövlət öz siyahısının yeganə müəllifi olaraq qalır, başqa dövlətin siyahısını tanımaq isə hər dövlətin özünün qəbul etdiyi qərardır. Milli siyahının dərc edilməsinin texniki addımları tərtibatçı bələdçisindədir: [Milli siyahının dərci](https://docs.tamga.network/guides/publish-national-list).

## Qurum necə iştirak edir?

Əvvəlcə sandbox vasitəsilə, sonra Etibar Çərçivəsinin giriş mərhələləri ilə. Universitet, palata, dövlət orqanı və ya bilet satıcısı bütün axını sandbox-da sınaqdan keçirir, uyğunluq testlərini icra edir və sonra sənədi verən qurumun üç səviyyəsindən birində qeydiyyatdan keçir: qeydiyyatlı, müqaviləli və ya akkreditasiyalı. Hər rəqəmsal sənəd növü ayrıca icazələndirilir və standart olaraq bağlıdır. Yoxlayan tərəflər ümumi qeydiyyat məlumat dəsti ilə qeydiyyatdan keçir və hər istifadə halı üçün qeydiyyat sertifikatı alır. Qeydiyyat hüquqi lisenziya deyil: diplom vermək hüququ yenə də qurumun fəaliyyətini tənzimləyən qanundan irəli gəlir. Addımlar [Qurum Tamga Network-a necə qoşulur](/blog/join-as-an-institution) məqaləsindədir.

## Oxumağa haradan başlamalıyam?

Çərçivədə hər rol üçün [oxu yolu](https://arf.tamga.network/reading-path) var. Qısaca:

- **Dövlət və ya tənzimləyici orqan:** əsas sənədin rollar və idarəetmə bölmələri, sonra Etibar Çərçivəsinin təhvil planı.
- **Rəqəmsal sənəd verən qurum:** Rollar səhifəsi, Tamga Rulebook-un sənədi verən qurumlar üçün qaydaları və rəqəmsal sənəd növünüz üzrə qaydalar toplusu, məsələn, [Təhsil qaydalar toplusu](https://arf.tamga.network/rulebooks/education).
- **Yoxlayan tərəf və ya cüzdan tərtibatçısı:** Tamga Rulebook-un rolunuz üzrə qaydaları, sonra `docs.tamga.network` ünvanındakı tərtibatçı sənədləri və uyğunluq testləri.

## Tez-tez verilən suallar

### Tamga ARF Aİ ARF-nin törəməsidirmi (fork)?

O, Aİ ARF-nin strukturunu izləyir və eyni standartlardan istifadə edir, lakin öz idarəetməsi olan ayrıca çərçivədir. Aİ qaydası reqlamentdən və ya üzv dövlət orqanından asılı olduqda, Tamga ARF-də onlarsız işləyən qayda var və həmin rolu bu gün kimin daşıdığı göstərilir.

### Aİ yeni ARF versiyası dərc etdikdə nə baş verir?

Tamga Aİ qaydalarını dərc olunduqca izləyir və dəyişiklikləri əvvəlcə öz qərarlarına, sonra çərçivəyə daxil edir. Dəyişiklik çərçivənin yeni versiyası olur və Nə dəyişdi səhifəsində qeyd edilir.

### Tamga ARF-a əməl etmək rəqəmsal cüzdanı EUDI Wallet edirmi?

Xeyr. "EUDI Wallet" Aİ üzv dövləti tərəfindən təqdim edilən və ya tanınan və Aİ qaydalarına əsasən sertifikatlaşdırılan rəqəmsal cüzdanlar üçün hüquqi statusdur. Tamga ARF-ə əməl etmək rəqəmsal cüzdanı Aİ ilə uyğun edir və onun Tamga Network-da siyahıya alınmasına imkan verir.

### Dövlət qaydaları dəyişə bilərmi?

Hər dövlət öz siyahısına və qeydiyyatlarına nəzarət edir. Üzvün qəbulu və ya ortaq rəqəmsal sənəd növünün əlavə edilməsi kimi bütün şəbəkəyə aid qaydalar barədə qərarı, yaradıldıqdan sonra, üzv dövlətlər şurası üçdə iki səs çoxluğu ilə qəbul edir.

### Çərçivədən istifadə pulsuzdurmu?

Bəli. Sənədlər CC BY 4.0 lisenziyası ilə dərc olunur, şəbəkənin paketləri isə Apache-2.0 lisenziyası ilə açıq mənbəlidir.

## Mənbələr

- [Tamga ARF 1.0](https://arf.tamga.network) · [Arxitektura](https://arf.tamga.network/architecture) · [Etibar Çərçivəsi](https://arf.tamga.network/trust-framework) · [Tamga Rulebook](https://arf.tamga.network/rulebook) · [Rollar](https://arf.tamga.network/roles) · [Qoşulma](https://arf.tamga.network/onboarding) · [Nə dəyişdi](https://arf.tamga.network/changes)
- [ADR-0035: mövqeləndirmə](https://docs.tamga.network/adr/0035-positioning-three-layers) · [ADR-0036: etibar federasiyası](https://docs.tamga.network/adr/0036-trust-federation-external-lists) · [ADR-0038: sandbox](https://docs.tamga.network/adr/0038-sandbox) · [ADR-0009: zəncirsiz beta və zəncir həddi](https://docs.tamga.network/adr/0009-phase-b-chainless-beta-and-chain-threshold) · [ADR-0002: suverenliyi önə çəkən idarəetmə](https://docs.tamga.network/adr/0002-sovereignty-first-governance)
- [Federasiya](https://docs.tamga.network/concepts/federation) · [Milli siyahının dərci](https://docs.tamga.network/guides/publish-national-list) · [Uyğunluq](https://docs.tamga.network/guides/conformance)
- [EUDI Wallet Arxitektura və İstinad Çərçivəsi, v3.0.0 (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/releases/tag/v3.0.0)
- [Komissiyanın (Aİ) 2025/848 saylı İcra Reqlamenti: cüzdana etibar edən tərəflərin qeydiyyatı](https://eur-lex.europa.eu/eli/reg_impl/2025/848/oj) · [(Aİ) 2024/2981 saylı İcra Reqlamenti: rəqəmsal cüzdanların sertifikatlaşdırılması](https://eur-lex.europa.eu/eli/reg_impl/2024/2981/oj)
- [ETSI TS 119 602: etibarlı subyektlərin siyahıları](https://www.etsi.org/deliver/etsi_ts/119600_119699/119602/01.01.01_60/ts_119602v010101p.pdf)
- [Qaydalar və qaydalar topluları](/learn/rules-and-rulebooks) · [Dövlətlər üçün](/learn/for-states) · [Ağ kitab (Whitepaper)](/whitepaper)

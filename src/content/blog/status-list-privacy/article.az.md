---
title: "İzləmədən ləğv: status siyahısında məxfilik"
slug: status-list-privacy
description: Tamga Network-un status siyahıları yoxlayan tərəfə ləğvi sənədin harada təqdim olunduğunu sənədi verən quruma bildirmədən yoxlamağa necə imkan verir və bu məxfiliyin hüdudları.
date: 2026-10-08
lang: az
updated: 2026-10-19
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (2026-10-09: interval 2 min, revocation effective within a few minutes, list valid 6 h; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. ADR-0044 (ZK short-lived copies ≤ 24 h, implementation pending). -->

Status siyahısı yoxlayan tərəfə rəqəmsal sənədin ləğv edilib-edilmədiyini onu verən quruma müraciət etmədən öyrənməyə imkan verir. Tamga Network-da hər qurum IETF Token Status List formatında böyük, imzalanmış bir bit sətri dərc edir; hər rəqəmsal sənəd bu sətirdə təsadüfi bir mövqeyə işarə edir. Yoxlayan tərəflər siyahıları əvvəlcədən tam şəkildə yükləyir və biti öz nüsxələrindən oxuyur, beləliklə qurum rəqəmsal sənədin nə vaxt, harada və kimə göstərildiyini heç vaxt öyrənmir.

## Ləğv yoxlaması niyə izləmə kanalına çevrilə bilər?

Ləğvi yoxlamağın ən aşkar yolu soruşmaqdır: yoxlayan tərəf rəqəmsal sənədin seriya nömrəsini sənədi verən quruma göndərir və cavab olaraq "etibarlıdır" və ya "ləğv edilib" alır. Vebdə sertifikatların yoxlanması illərlə məhz belə işləyib. Bunun insanlar üçün əhəmiyyətli bir yan təsiri var. Hər yoxlama sənədi verən quruma bildirir ki, kimsə məhz bu anda, bu şəbəkə ünvanından bu şəxsin rəqəmsal sənədinə baxır.

Diplom üçün bu o deməkdir ki, universitet hər məzunun hansı işəgötürənlərə müraciət etdiyini görə bilərdi. Kağız diplom universitetə belə bir şey heç vaxt bildirmirdi. Rəqəmsal diplom da bildirməməlidir. Tamga-nın status siyahısı spesifikasiyası bunu ilk məxfilik qaydası kimi müəyyən edir: yoxlayan tərəf siyahını yoxlama anında yükləməməlidir ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## Token Status List necə işləyir?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) sənədi verən qurumun imzaladığı, kiçik ədədlərdən ibarət sıxılmış massivdir. 2026-cı ilin oktyabrından bitlərin sayı rəqəmsal sənədin növündən asılıdır (ADR-0048, paketlər 0.6.0). Şəxsiyyət xidmətinin rəqəmsal sənədləri dayandırıla bilməz və onların siyahıları bir bit istifadə edir: `0` etibarlıdır, `1` ləğv edilib. Qurumların siyahıları iki bit istifadə edir: `0` etibarlıdır, `1` birdəfəlik ləğv edilib, `2` dayandırılıb (bərpa oluna bilər) və `3` istifadə olunmur — yoxlayan tərəf bunu ləğv edilmiş kimi qəbul edir. `2` dəyəri yalnız sxemi dayandırmaya icazə verən növlər, məsələn, diplom üçün istifadə olunur. Dayandırma ona görə mövcuddur ki, universitet araşdırma zamanı diplomu birbaşa ləğv etmək əvəzinə müvəqqəti saxlaya bilsin.

Hər rəqəmsal sənəd siyahıya işarə edən bir göstərici daşıyır. Bu göstərici seçici paylaşımla (selective disclosure) gizlədilə bilməz: o, hər təqdimatla birlikdə ötürülür, çünki yoxlayan tərəfə lazımdır.

> **Qeyd:** Sadələşdirilmiş nümunə. Ünvan və indeks uydurmadır. Real format [status siyahısı spesifikasiyasında](https://docs.tamga.network/specifications/status-list) verilib.

```json title="Simplified example: the status claim inside a credential"
{
  "status": {
    "status_list": {
      "idx": 48213,
      "uri": "https://status.tamga.network/3f9c1a7e5b20d846"
    }
  }
}
```

Yoxlayan tərəf `uri` ünvanındakı tokeni yükləyir, onun imzasını [imzalanmış etibar siyahısında](/blog/how-trust-lists-work) qurumun qeydi ilə yoxlayır, həzmini (digest) lövbər jurnalı ilə müqayisə edir, onu açır və `idx` mövqeyindəki qeydi oxuyur. Siyahının özü rəqəmsal sənədləri imzalayan açardan ayrı olan status açarı ilə imzalanır; buna görə oğurlanmış status açarı ilə saxta statuslar dərc etmək mümkündür, lakin diplomu saxtalaşdırmaq mümkün deyil.

## Kütlə məxfiliyi nədir və kütlə nə qədər böyükdür?

Yüklənmiş siyahı yoxlayan tərəfin onun hansı qeydləri ilə maraqlandığı barədə heç nə demir. Bu, kütlə məxfiliyidir (herd privacy): Sizin rəqəmsal sənədiniz eyni siyahıdakı bütün digər sənədlər arasında gizlənir. Kütlə yalnız böyük olduqda və Sizin mövqeyinizlə bağlı heç nə seçilmədikdə faydalıdır. Tamga-nın qaydaları hər ikisini təmin etmək üçün yazılıb:

![Status siyahısının rəqəmsal sənədin kimə məxsus olduğunu sızdırmasına imkan verməyən qaydalar](/blog/status-list-privacy/en/fig-suru.png)

- **Böyük siyahılar.** Hər siyahıda ən azı 100 000 qeyd üçün yer var. Qeydlərin 80%-i ayrıldıqda yeni siyahı açılır. Əsasən sıfırlardan ibarət siyahı sıxıldıqda cəmi bir neçə yüz bayt tutur, buna görə ölçü heç bir xərc yaratmır.
- **Təsadüfi mövqelər.** İndeks bütün siyahı üzrə təsadüfi seçilir. Sayğaca icazə verilmir: ardıcıl nömrələrlə 12 nömrəli indeks ilin on ikinci məzunu olardı, iki məzunun indeksləri isə məzuniyyət tarixi heç vaxt açıqlanmasa belə, onların bir-birindən nə qədər fərqli vaxtda məzun olduğunu göstərərdi.
- **Qeyri-şəffaf ünvanlar.** Siyahının ünvanı təsadüfi sətirdir. `.../edu-2026` və ya `.../medicine` kimi ünvan, şəxs məhz həmin sahəni gizlətdiyi halda, hər təqdimatda ili və ya fakültəni açıqlayardı.
- **Yalnız növə görə bölgü.** Siyahılar onsuz da görünən rəqəmsal sənəd növünə görə ayrıla bilər. İlə, fakültəyə və ya qrupa görə bölünə bilməz, çünki sadəcə "2026-cı il siyahısında" olmaq özü bir açıqlama olardı.

Bu qaydalar yalnız kağız üzərində deyil, açıq paketlərdə də mövcuddur. Sənədi verən qurumun kitabxanası 100 000 qeyddən kiçik siyahını qəbul etmir, 80%-dən artıq ayırmaya icazə vermir və hər indeksi kriptoqrafik təsadüfi ədəd generatoru ilə seçir.

## Yoxlayan tərəf siyahını niyə əvvəlcədən yükləyir?

Çünki yoxlama anında yükləmə məhz yuxarıda təsvir olunan izləmə kanalıdır. Tamga-nın yoxlayan tərəfi ehtiyac duyduğu hər status siyahısını cədvəl üzrə yeniləyir və yoxlamanı keşdən aparır:

```ts title="Prefetching status lists with @tamga-network/verifier"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // on a schedule, never per verification
```

Yoxlayan tərəf paketində yoxlama statusu yalnız bu keşdən oxuyur. Host edilən yoxlama xidməti Tamga Verify də eyni qaydada işləyir.

Hər siyahı tokeni iki vaxt həddi daşıyır. `ttl` təzəlik hədəfidir: nüsxənin yenilənənədək nə qədər istifadə oluna biləcəyi. `exp` isə sərt həddir; ondan sonra nüsxə ümumiyyətlə istifadə oluna bilməz. Keşdəki nüsxə yoxlayan tərəfin siyasəti üçün çox köhnədirsə, nəticə "hazırda yoxlamaq mümkün deyil" (`INDETERMINATE`) olur, heç vaxt "ləğv edilib" yox. "Bu diplom ləğv edilib" ilə "hazırda yoxlaya bilmirəm" arasındakı fərq kiminsə işə qəbul olunub-olunmamasını həll edir, buna görə ikisi fərqli göstərilir ([yoxlamanın bunu necə idarə etdiyi](/blog/add-verification-to-your-site)).

## Heç nə dəyişmədikdə siyahı niyə yenidən dərc olunur?

Qurum siyahını yalnız nəyisə ləğv etdikdə yenidən dərc etsəydi, dərcin özü xəbər olardı: "Example University-də 14:00 ilə 15:00 arasında ləğv baş verib". Xarici məlumatla, məsələn, intizam qərarının tarixi ilə birləşdikdə bu, dairəni bir nəfərə qədər daralda bilər.

Buna görə hər siyahı nəyinsə dəyişib-dəyişməməsindən asılı olmayaraq sabit intervalla yenidən dərc olunur. Kənardan hər interval eyni görünür: yeni versiya var. Interval 2 dəqiqədir, buna görə status serveri işlədiyi müddətdə ləğv yoxlayan tərəflərə bir neçə dəqiqə ərzində çatır; hər dərc olunmuş siyahı 6 saat etibarlıdır ([ARF §5.4](https://arf.tamga.network/architecture)).

![Status siyahısının bir dərc dövrü](/blog/status-list-privacy/en/fig-dongu.png)

Dövrdən kənar "təcili" dərc qəsdən nəzərdə tutulmayıb; dövrdən kənar bir dərc hamı üçün qorumanı aradan qaldırardı. Nəyisə dərhal dayandırmaq lazım olduqda, məsələn, imza açarı oğurlandıqda, düzgün vasitə status siyahısı deyil, qurumun etibar siyahısındakı sertifikatının dayandırılmasıdır.

Hər dərc həmçinin etibar siyahısını dərc edənin açıq lövbər jurnalında qeydə alınır. Yoxlayan tərəf siyahının həzmini və versiyasını həmin qeydlə müqayisə edir; bu, qurumun ləğv edilmiş rəqəmsal sənədi gizlicə yenidən "etibarlı" vəziyyətinə qaytarmasının qarşısını alır. Lövbər jurnalında siyahı identifikatorları, versiyalar və həzmlər saxlanılır, siyahıdakı mövqe isə heç vaxt.

## Nüsxələr iki yoxlayan tərəfin bir şəxsi uyğunlaşdırmasının qarşısını necə alır?

İndeks rəqəmsal sənədin bütün ömrü boyu sabitdir. Şəxs eyni rəqəmsal sənədi iki yoxlayan tərəfə göstərsə və onlar məlumatlarını müqayisə etsələr, eyni `idx` və `uri` onlara bunun eyni şəxs olduğunu deyərdi. Spesifikasiya bunu Token Status List-in struktur məhdudiyyəti kimi açıq qeyd edir.

Həll paket şəklində verilmədir. Hər rəqəmsal sənəd, o cümlədən diplom, 10 nüsxə şəklində verilir və hər nüsxənin öz cihaz açarı və öz təsadüfi indeksi var. Rəqəmsal cüzdan eyni yoxlayan tərəfə eyni nüsxəni, hər fərqli yoxlayan tərəfə isə fərqli nüsxəni göstərir (WL5 qaydası). Nüsxələrlə indekslər arasındakı uyğunluq sənədi verən qurumun verilənlər bazasında qalır və oradan heç vaxt çıxmır (PR10). Rəqəmsal sənəd ləğv edildikdə onun bütün nüsxələrinin bitləri həmin intervalda dəyişən digər hər şeylə birlikdə eyni planlı dərcdə dəyişir.

Sıfır biliklə təqdimat bir addım irəli gedir: heç bir indeks açıqlamır. Bunun bədəli odur ki, yoxlayan tərəf ləğvi yoxlaya bilmir. Qərar budur ki, sıfır biliklə yalnız qısamüddətli nüsxələr təqdim olunsun: onlar ən çoxu 24 saat etibarlıdır və rəqəmsal sənəd ləğv edildikdən sonra yenilənmir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Bu həyata keçirilənədək yoxlayan tərəf belə təqdimatı yalnız siyasəti buna açıq şəkildə icazə verdikdə qəbul edir ([Tamga-da sıfır bilik sübutları](/blog/zero-knowledge-in-tamga)).

## Kim nəyi görə bilər?

![Hər tərəfin status siyahısından nəyi öyrənə bildiyi və nəyi öyrənə bilmədiyi](/blog/status-list-privacy/en/fig-kim.png)

| Tərəf | Görə bilər | Görə bilməz |
|---|---|---|
| Sənədi verən qurum | özünün etdiyi ləğvləri və dayandırmaları | rəqəmsal sənədin harada, nə vaxt və ya kimə göstərildiyini |
| Yoxlayan tərəf | ona göstərilən nüsxənin bu gün və sonrakı statusunu | eyni rəqəmsal sənədin digər nüsxələrini |
| Status siyahısının hostu | yoxlayan tərəfin siyahını təzə saxladığını | hansı rəqəmsal sənədin və ya nə vaxt yoxlandığını |
| Siyahını oxuyan hər kəs | hər intervalda yeni versiyanı; versiyalar arasında hansı bitlərin fərqləndiyini | bitin kimin rəqəmsal sənədinə aid olduğunu |

Heç bir Tamga xidməti IP ünvanlarını qeydə almır və heç bir qeyd, jurnal və ya nəticə status siyahısındakı mövqeyi ehtiva etmir ([ARF §4.5](https://arf.tamga.network/architecture)).

## Bu məxfilik harada bitir?

Bəzi məhdudiyyətlər spesifikasiyada qəbul edilmiş kimi yazılıb və onları açıq şəkildə qeyd etmək lazımdır.

- **Kiçik qurumların anonimlik kütləsi də kiçikdir.** 100 000 qeydlik siyahıda 300 məzunu olan kollecin siyahısı böyükdür, lakin kütləsi cəmi 300 nəfərdir, çünki rəqəmsal sənəddə onu verən qurumun adı hər halda göstərilir. Bunun texniki həlli yoxdur; bu, qəbul edilmiş məhdudiyyət kimi qeydə alınıb.
- **Yoxlayan tərəf gördüyü nüsxəni izləyə bilər.** Yoxlayan tərəf həmin nüsxənin indeksini bilir, ona görə də sonradan həmin nüsxənin ləğv edilib-edilmədiyini görə bilər. Status siyahısının məqsədi elə budur, lakin bu, həm də məlumatdır. Nüsxələr bu məlumatı həmin şəxsi onsuz da tanıyan yeganə yoxlayan tərəflə məhdudlaşdırır.
- **Zaman bulanıqlaşdırılır, silinmir.** Sabit interval ləğvin dəqiq anını həmin interval daxilində gizlədir. Lakin əsas hadisənin tarixini artıq bilən və dəyişən biti izləyə bilən şəxsdən ləğvi gizlətmir.
- **Host edilən status xidməti dərc etdiyi ləğvləri görür.** Qurum öz status xidmətini işlədə və ya şəbəkənin host edilən sənəd vermə xidmətindən istifadə edə bilər. İkinci halda həmin qurumun ləğvlərini operator dərc edir və deməli, onları görür. Spesifikasiya bunu real mərkəzləşmə nöqtəsi kimi açıq göstərir və onu yox saymaq əvəzinə idarəetmə qaydalarına bağlayır.
- **Lövbər bu gün bir imzalayana söykənir.** Lövbər jurnalı tək, müvəqqəti operator tərəfindən imzalanır. Bu məhdudiyyəti aradan qaldıran ortaq reyestr ikinci müstəqil operatoru gözləyir ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).

## Tez-tez verilən suallar

### Rəqəmsal sənədimi təqdim etdiyim zaman sənədi verən qurum bundan xəbər tutur?

Xeyr. Yoxlayan tərəflər status siyahılarını əvvəlcədən yükləyir və yoxlamanı öz nüsxələri üzərindən aparır. Yoxlama anında quruma heç bir sorğu getmir.

### Siyahıya baxaraq kimin rəqəmsal sənədinin ləğv edildiyini müəyyən etmək olarmı?

İki versiya arasında bəzi mövqelərin dəyişdiyini görmək mümkündür. Lakin həmin mövqelərin kimin rəqəmsal sənədlərinə aid olduğunu müəyyən etmək olmur, çünki mövqelər təsadüfi seçilir və onların uyğunluğu yalnız sənədi verən qurumda saxlanılır.

### Ləğv nə qədər tez qüvvəyə minir?

Bir dərc intervalı və yoxlayan tərəfin yeniləmə müddəti ərzində. Siyahılar hər 2 dəqiqədən bir yenidən dərc olunur, buna görə də status serveri işlək olduqda bu, bir neçə dəqiqə çəkir.

### Siyahını yükləmək mümkün olmasa nə baş verir?

Yoxlayan tərəf son etibarlı nüsxədən onun müddəti bitənədək, yəni dərc olunduqdan 6 saat sonrayadək istifadə etməyə davam edir. Bundan sonra nəticə "ləğv edilib" deyil, "hazırda yoxlamaq mümkün deyil" olur.

### Təcili halda niyə dərhal dərc edilmir?

Qrafikdən kənar dərc nəyinsə baş verdiyini üzə çıxarardı. Təcili hallarda bunun əvəzinə qurumun sertifikatı etibar siyahısında dayandırılır.

## Mənbələr

- [IETF Token Status List (OAuth işçi qrupunun layihəsi)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: status siyahısı spesifikasiyası](https://docs.tamga.network/specifications/status-list) · [Ləğv və aktuallıq](https://docs.tamga.network/concepts/revocation) · [Məxfilik](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: arxitektura (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP və Token Status List](/blog/haip-and-token-status-list) · [Ləğv](/learn/revocation) · [Əlaqələndirilməzlik](/learn/unlinkability)

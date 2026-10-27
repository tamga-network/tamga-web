---
title: "İzləmədən ləğv: status siyahısında məxfilik"
slug: status-list-privacy
description: "Tamga Network-un status siyahıları ilə ləğv yoxlamasının sənədin harada göstərildiyi quruma bildirilmədən necə aparıldığını və bu məxfiliyin harada bitdiyini izah edirik."
date: 2026-10-08
lang: az
updated: 2026-10-23
category: privacy
draft: false
related: haip-and-token-status-list, how-trust-lists-work, zero-knowledge-in-tamga, what-the-network-never-sees
---

<!-- Sources: SPEC-CRED-0003 1.0.0 (§2 status claim sd never; §3.3 bits=2, values; §3.4 separate status key; §5.1 fixed cadence even without change, §5.3 no emergency publish, suspend certificate instead; §6.1 random idx; §6.2 capacity ≥100,000, fill ≤80%; §6.3 opaque URI; §6.4 split by type only; §7.1 invalid vs cannot verify; §9.1 per-verification fetch forbidden, SDK prefetch default; §9.3 herd privacy and small-institution problem; §9.4 idx correlation → batch copies; §10.2 hosted status sees all revocations; S1–S14). @tamga-network/sd-jwt status list module (MIN_CAPACITY, MAX_FILL, IndexAllocator randomInt, newListId opaque). concepts/revocation (status.tamga.network/{opaque}, PrefetchStatusCache, INDETERMINATE). ARF architecture §5.4 (2026-10-09: interval 2 min, revocation effective within a few minutes, list valid 6 h; addresses reveal neither institution, year nor group), §4.5 (no IP records, no list positions in records), §7.2. SPEC-WALLET-0001 WL5; SPEC-PROTO-0001 PR6, PR10; SPEC-API-0001 AP4. ADR-0032 ZK4/K6. Live anchor log anchors.jsonl kind "status_list" lines checked 2026-10-08. External: IETF Token Status List draft (herd privacy section), HAIP 1.0. ADR-0044 (ZK short-lived copies ≤ 24 h, implemented in packages 0.4.0). -->

Status siyahısı (status list) yoxlayan tərəfə sənədin ləğv edilib-edilmədiyini sənədi verən quruma heç nə soruşmadan öyrənməyə imkan verir. Tamga Network-da hər qurum IETF Token Status List formatında böyük və imzalanmış bit sətri dərc edir və hər sənəd bu sətirdə təsadüfi seçilmiş mövqeyə işarə edir. Yoxlayan tərəflər siyahıları tamamilə əvvəlcədən endirir və lazım olan biti öz nüsxələrindən oxuyur. Ona görə qurum sənədin nə vaxt, harada və kimə göstərildiyini heç vaxt öyrənə bilmir.

## Ləğv yoxlaması niyə izləmə kanalına çevrilə bilər?

Ləğvi yoxlamağın ilk ağla gələn yolu qurumdan soruşmaqdır. Yoxlayan tərəf sənədin seriya nömrəsini quruma göndərir və "etibarlıdır" və ya "ləğv edilib" cavabını alır. Vebdə sertifikatlar illərlə bu üsulla yoxlanılıb. Amma bu üsulun insanlar üçün vacib yan təsiri var. Hər sorğu quruma kiminsə məhz həmin anda, müəyyən şəbəkə ünvanından həmin şəxsin sənədinə baxdığını bildirir.

Diplom söhbəti gedəndə bu, universitetin hər məzununun hansı işəgötürənlərə müraciət etdiyini görə bilməsi deməkdir. Kağız diplom universitetə belə məlumat vermirdi və rəqəmsal diplom da verməməlidir. Tamga-nın status siyahısı spesifikasiyası bunu ilk məxfilik qaydası kimi yazır. Yoxlayan tərəf siyahını yoxlama anında endirə bilməz ([SPEC-CRED-0003 §9.1](https://docs.tamga.network/specifications/status-list)).

## Token Status List necə işləyir?

[IETF Token Status List](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/) sənədi verən qurumun imzaladığı və kiçik ədədlərdən ibarət sıxılmış massivdir. 2026-cı ilin oktyabrından bəri hər girişin neçə bit tutduğu sənəd növündən asılıdır (ADR-0048, paketlər 0.6.0). Şəxsiyyət xidmətinin sənədləri dayandırıla bilmədiyi üçün bu sənədlərin siyahıları bir bitdən istifadə edir. Bu siyahılarda `0` etibarlı, `1` ləğv edilib deməkdir. Qurumların siyahıları isə iki bitdən istifadə edir. Bu siyahılarda `0` etibarlı, `1` həmişəlik ləğv edilib, `2` dayandırılıb və geri qaytarıla bilər deməkdir. `3` dəyəri istifadə olunmur və yoxlayan tərəf onu ləğv kimi qiymətləndirir. `2` dəyəri yalnız sxemi dayandırmaya icazə verən növlərdə, məsələn diplomda istifadə olunur. Dayandırma universitetin araşdırma davam edərkən diplomu həmişəlik ləğv etmək əvəzinə gözlətməsi üçün mövcuddur.

Hər sənəd siyahıdakı yerini göstərən işarə daşıyır. Bu işarə seçici açıqlama ilə gizlədilə bilməz və hər təqdimatda sənədlə birlikdə gedir, çünki yoxlayan tərəfin ona ehtiyacı var.

> **Qeyd:** Aşağıdakı nümunə sadələşdirilib. Ünvan və indeks uydurma dəyərlərdir. Real formatı [status siyahısı spesifikasiyasında](https://docs.tamga.network/specifications/status-list) tapa bilərsiniz.

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

Yoxlayan tərəf `uri` ünvanındakı siyahını alır və onun imzasını qurumun [imzalanmış etibar siyahısındakı](/blog/how-trust-lists-work) qeydinə görə yoxlayır. Sonra siyahının heşini anker jurnalındakı qeydlə müqayisə edir, siyahını açır və `idx` mövqeyindəki girişi oxuyur. Siyahı sənədləri imzalayan açardan ayrı status açarı ilə imzalanır. Ona görə status açarı oğurlanarsa, saxta status dərc etmək olar, amma saxta diplom yaratmaq olmaz.

## Kütlə məxfiliyi nədir və kütlə nə qədər böyükdür?

Endirilmiş siyahı yoxlayan tərəfin siyahıdakı hansı girişlə maraqlandığı barədə heç nə demir. Kütlə məxfiliyi (herd privacy) adlanan budur. Sənədiniz eyni siyahıdakı bütün digər sənədlərin arasında gizlənir. Amma kütlə yalnız kifayət qədər böyükdürsə və siyahıdakı mövqeyiniz heç bir şəkildə gözə çarpmırsa işə yarayır. Tamga-nın qaydaları bu iki şərti təmin etmək üçün yazılıb:

![Status siyahısının rəqəmsal sənədin kimə məxsus olduğunu sızdırmasına imkan verməyən qaydalar](/blog/status-list-privacy/en/fig-suru.png)

- **Böyük siyahılar.** Hər siyahıda ən azı 100 000 giriş üçün yer olur və girişlərin 80%-i dolanda yeni siyahı açılır. Girişlərinin çoxu sıfır olan siyahı sıxılanda cəmi bir neçə yüz bayt tutur, yəni siyahının ölçüsü xərc yaratmır.
- **Təsadüfi mövqelər.** İndeks bütün siyahıdan təsadüfi seçilir və sayğacdan istifadəyə icazə verilmir. İndekslər ardıcıl verilsəydi, 12 nömrəli indeks həmin ilin on ikinci məzunu olardı. İki məzunun indeksləri arasındakı fərq də, məzuniyyət tarixi heç paylaşılmasa belə, onların arasında nə qədər vaxt olduğunu göstərərdi.
- **Mənasız ünvanlar.** Siyahının ünvanı təsadüfi sətirdən ibarətdir. `.../edu-2026` və ya `.../medicine` kimi ünvan şəxsin xüsusi olaraq gizlətdiyi ili və ya fakültəni hər təqdimatda üzə çıxarardı.
- **Yalnız növə görə bölmə.** Siyahılar sənəd növünə görə ayrıla bilər, çünki növ onsuz da görünür. Amma ilə, fakültəyə və ya dövrə görə bölünə bilməz, çünki "2026 siyahısında" olmaq belə özlüyündə məlumat verir.

Bu qaydalar yalnız kağız üzərində qalmır, açıq paketlərdə də tətbiq olunur. Sənəd vermə kitabxanası 100 000 girişdən kiçik siyahını qəbul etmir, 80%-dən artıq yer ayırmır və hər indeksi kriptoqrafik təsadüfi ədəd generatoru ilə seçir.

## Yoxlayan tərəf siyahını niyə əvvəlcədən endirir?

Siyahını yoxlama anında endirmək yuxarıda izah etdiyimiz izləmə kanalını açmaq deməkdir. Ona görə Tamga yoxlayan tərəfi ehtiyac duyduğu hər status siyahısını müəyyən cədvələ görə yeniləyir və yoxlamanı keşdən aparır:

```ts title="Prefetching status lists with @tamga-network/verifier"
import { PrefetchStatusCache } from "@tamga-network/verifier";

const statusCache = new PrefetchStatusCache();
await statusCache.refresh(listUris); // on a schedule, never per verification
```

Yoxlayan tərəf paketində yoxlama sənədin statusunu yalnız bu keşdən oxuyur. Host edilən yoxlayan tərəf Tamga Verify də eyni şəkildə işləyir.

Hər siyahı iki vaxt həddi daşıyır. `ttl` aktuallıq hədəfidir və nüsxədən yenilənmədən nə qədər istifadə oluna biləcəyini göstərir. `exp` isə qəti həddir və bu andan sonra nüsxədən ümumiyyətlə istifadə etmək olmaz. Keşdəki nüsxə yoxlayan tərəfin siyasətinə görə çox köhnədirsə, nəticə heç vaxt "ləğv edilib" olmur, "hazırda yoxlamaq mümkün olmadı" (`INDETERMINATE`) olur. "Bu diplom ləğv edilib" ilə "hazırda yoxlaya bilmirəm" arasındakı fərq kiminsə işə götürülüb-götürülməməsini həll edə bilər. Ona görə iki nəticə fərqli göstərilir ([yoxlamanın bunu necə idarə etdiyi](/blog/add-verification-to-your-site)).

## Heç nə dəyişmədikdə siyahı niyə yenidən dərc olunur?

Qurum yalnız sənədi ləğv edəndə dərc etsəydi, dərcin özü xəbərə çevrilərdi. Məsələn, "Nümunə Universitetində saat 14:00 ilə 15:00 arasında ləğv baş verdi" məlumatı üzə çıxardı. Bu məlumat intizam qərarının tarixi kimi kənardan bilinən məlumatla birləşəndə bir şəxsi göstərə bilər.

Ona görə hər siyahı daxilində dəyişiklik olub-olmamasından asılı olmayaraq sabit fasilələrlə yenidən dərc olunur. Kənardan baxan şəxs üçün hər fasilə eyni görünür, çünki hər fasilədə yeni versiya çıxır. Bu fasilə 2 dəqiqədir. Status serveri işlədiyi müddətdə ləğv yoxlayan tərəflərə bir neçə dəqiqə ərzində çatır və dərc olunan hər siyahı 6 saat etibarlı qalır ([ARF §5.4](https://arf.tamga.network/architecture)).

![Status siyahısının bir dərc dövrü](/blog/status-list-privacy/en/fig-dongu.png)

Dövrdən kənar "təcili" dərcin olmaması bilərəkdən edilmiş seçimdir, çünki dövrdən kənar bir dərc belə qorumanı hamı üçün pozardı. Nəyisə dərhal dayandırmaq lazımdırsa, məsələn imza açarı oğurlanıbsa, düzgün vasitə status siyahısı deyil. Bu halda qurumun etibar siyahısındakı sertifikatı dayandırılır.

Hər dərc etibar siyahısı nəşriyyatçısının açıq anker jurnalına da yazılır. Yoxlayan tərəf siyahının heşini və versiya nömrəsini bu qeydlə müqayisə edir. Beləliklə qurum ləğv etdiyi sənədi səssizcə yenidən "etibarlı" vəziyyətinə qaytara bilmir. Anker jurnalında siyahı identifikatorları, versiyalar və heşlər olur, amma siyahıdakı heç bir mövqe yer almır.

## Nüsxələr iki yoxlayan tərəfin bir şəxsi uyğunlaşdırmasının qarşısını necə alır?

Sənədin indeksi sənədin bütün ömrü boyu dəyişmir. Şəxs eyni sənədi iki yoxlayan tərəfə göstərsə və bu iki tərəf əllərindəki məlumatları müqayisə etsə, eyni `idx` və `uri` dəyərləri onlara qarşılarındakının eyni şəxs olduğunu deyərdi. Spesifikasiya bunu Token Status List-in quruluşundan gələn məhdudiyyət kimi açıq yazır.

Bu problemin həlli sənədləri paket şəklində verməkdir. Diplom da daxil olmaqla hər sənəd 10 nüsxə kimi verilir və hər nüsxənin öz cihaz açarı və öz təsadüfi indeksi olur. Cüzdan eyni yoxlayan tərəfə hər dəfə eyni nüsxəni, fərqli yoxlayan tərəflərə isə fərqli nüsxələri göstərir (WL5 qaydası). Nüsxələrlə indekslər arasındakı uyğunluq sənədi verən qurumun verilənlər bazasında qalır və heç vaxt kənara çıxmır (PR10). Sənəd ləğv ediləndə onun bütün nüsxələrinin bitləri eyni planlı dərcdə, həmin fasilədə dəyişən bütün digər qeydlərlə birlikdə dəyişir.

Sıfır bilikli sübutla aparılan təqdimat bir addım da irəli gedir və heç bir indeksi açmır. Bunun bədəli yoxlayan tərəfin ləğv vəziyyətini yoxlaya bilməməsidir. Ona görə sıfır bilikli sübut yalnız qısaömürlü nüsxələrlə təqdim olunur. Bu nüsxələr ən çoxu 24 saat etibarlıdır və sənəd ləğv ediləndə yenilənmir ([ADR-0044](https://docs.tamga.network/adr/0044-zk-short-lived-copies)). Paketlərin 0.4.0 versiyasından bəri belə işləyir və qısa ömür ləğv yoxlamasını əvəz edir. Belə nüsxəyə əsaslanmayan sıfır bilikli təqdimatı yoxlayan tərəf yalnız siyasəti buna açıq icazə verdikdə qəbul edir ([Tamga-da sıfır bilikli sübutlar](/blog/zero-knowledge-in-tamga)).

## Kim nəyi görə bilər?

![Hər tərəfin status siyahısından nəyi öyrənə bildiyi və nəyi öyrənə bilmədiyi](/blog/status-list-privacy/en/fig-kim.png)

| Tərəf | Görə bilər | Görə bilməz |
|---|---|---|
| Sənədi verən qurum | özünün etdiyi ləğvləri və dayandırmaları | sənədin harada, nə vaxt və kimə göstərildiyini |
| Yoxlayan tərəf | ona göstərilən nüsxənin bugünkü və sonrakı statusunu | eyni sənədin digər nüsxələrini |
| Siyahını host edən tərəf | yoxlayan tərəfin siyahını aktual saxladığını | hansı sənədin nə vaxt yoxlandığını |
| Siyahını oxuyan hər kəs | hər fasilədə çıxan yeni versiyanı və versiyalar arasında dəyişən bitləri | bitin kimin sənədinə aid olduğunu |

Heç bir Tamga xidməti IP ünvanlarını qeydə almır. Heç bir qeyddə, jurnalda və ya nəticədə status siyahısındakı mövqe yer almır ([ARF §4.5](https://arf.tamga.network/architecture)).

## Bu məxfilik harada bitir?

Bəzi məhdudiyyətlər spesifikasiyada qəbul edilmiş məhdudiyyətlər kimi yazılıb və onları açıq demək lazımdır.

- **Kiçik qurumların kütləsi də kiçikdir.** 300 məzunu olan kollecin sənədləri 100 000 girişlik siyahıda dursa belə, kütlə 300 nəfərdən ibarət olur, çünki sənəd onsuz da onu verən qurumu göstərir. Bunun texniki həlli yoxdur və spesifikasiyada qəbul edilmiş məhdudiyyət kimi qeydə alınıb.
- **Yoxlayan tərəf gördüyü nüsxəni izləyə bilər.** Yoxlayan tərəf həmin nüsxənin indeksini bildiyi üçün nüsxənin sonradan ləğv edilib-edilmədiyini görə bilər. Status siyahısının məqsədi də elə budur, amma bu da məlumat sayılır. Nüsxələr bu məlumatı şəxsi onsuz da tanıyan bir yoxlayan tərəflə məhdudlaşdırır.
- **Vaxt məlumatı bulanıqlaşır, amma tamamilə silinmir.** Sabit dərc fasiləsi ləğvin dəqiq anını həmin fasilənin içində gizlədir. Amma əsl hadisənin tarixini onsuz da bilən və dəyişəcək biti gözləyən şəxsdən ləğvi gizlədə bilməz.
- **Host edilən status xidməti dərc etdiyi ləğvləri görür.** Qurum öz status xidmətini işlədə və ya şəbəkənin host edilən sənəd vermə xidmətindən istifadə edə bilər. İkinci halda qurumun ləğvlərini operator dərc edir və deməli bu ləğvləri görür. Spesifikasiya bunu real mərkəzləşmə nöqtəsi kimi adlandırır və idarəetmə qaydalarına bağlayır.
- **Etibar lövbəri bu gün bir imzalayana söykənir.** Anker jurnalını bir müvəqqəti operator imzalayır. Bu məhdudiyyəti aradan qaldıracaq ortaq reyestr isə ikinci müstəqil operatorun qoşulmasını gözləyir ([Niyə blokçeynsiz başlayırıq](/blog/why-no-blockchain-yet)).

## Tez-tez verilən suallar

### Sənədimi göstərəndə qurum bunu öyrənirmi?

Xeyr. Yoxlayan tərəflər status siyahılarını əvvəlcədən endirir və yoxlamanı öz nüsxələrindən aparır. Yoxlama anında quruma heç bir sorğu getmir.

### Siyahıya baxan şəxs kimin sənədinin ləğv edildiyini anlaya bilərmi?

İki versiya arasında bəzi mövqelərin dəyişdiyini görə bilər. Amma bu mövqelərin kimin sənədinə aid olduğunu anlaya bilməz, çünki mövqelər təsadüfi paylanır və uyğunluq sənədi verən qurumda qalır.

### Ləğv nə qədər müddətə qüvvəyə minir?

Bir dərc fasiləsi və yoxlayan tərəfin siyahını yeniləmə müddəti ərzində qüvvəyə minir. Siyahılar 2 dəqiqədən bir yenidən dərc olunduğu üçün status serveri işləyərkən bu müddət bir neçə dəqiqəni keçmir.

### Siyahı endirilə bilməsə, nə baş verir?

Yoxlayan tərəf əlindəki son etibarlı nüsxədən onun müddəti bitənə qədər istifadə edir. Bu müddət nüsxənin dərc edilməsindən 6 saat sonra bitir. Bundan sonra nəticə "ləğv edilib" olmur, "hazırda yoxlamaq mümkün olmadı" olur.

### Təcili halda niyə dərhal dərc edilmir?

Dövrdən kənar aparılan dərc nəyinsə baş verdiyini üzə çıxarardı. Ona görə təcili hallarda bunun əvəzinə qurumun etibar siyahısındakı sertifikatı dayandırılır.

## Mənbələr

- [IETF Token Status List (OAuth işçi qrupunun layihəsi)](https://datatracker.ietf.org/doc/draft-ietf-oauth-status-list/)
- [OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Tamga Network: status siyahısı spesifikasiyası](https://docs.tamga.network/specifications/status-list) · [Ləğv və aktuallıq](https://docs.tamga.network/concepts/revocation) · [Məxfilik](https://docs.tamga.network/concepts/privacy)
- [Tamga ARF: arxitektura (§4.5, §5.4, §7.2)](https://arf.tamga.network/architecture)
- [HAIP və Token Status List](/blog/haip-and-token-status-list) · [Ləğv](/learn/revocation) · [Əlaqələndirilməzlik](/learn/unlinkability)

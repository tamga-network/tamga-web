---
title: "Rəqəmsal cüzdana necə etibar edilir? Attestasiyalar və aparat açarları"
slug: trusting-a-wallet
description: "Tamga Network-da qurum rəqəmsal cüzdana sənəd verməyin təhlükəsiz olduğuna necə qərar verir: cüzdan və açar attestasiyaları, aparat sübutları və etibar siyahısı."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Sources: ADR-0025 1.0.0 (EU TS3 model; K1 unit registration, unit key never shown to institutions, unit record without personal data; K2 WIA Annex E, TS3 §2.3.1 fields, lifetime < 24 h (23 h), client_status ≥ 31 days (60), new PoP key and new status entry per transaction, no per-institution reuse; K3 KA Annex D, attested_keys, key_storage / user_authentication ISO 18045, certification, key_storage_status one shared entry per storage type (TS3 Option 1), in the jwt proof header, used once; K4 two status lists signed with a key registered in the trust list, WIA list ≥ 10,000 entries, "revoke this wallet", lost device needs an account later; K5 issuer checks at PAR/token and credential endpoint, KA level vs institution minimum, transition without KA until the pilot; implementation notes: keys bound to phone lock, Play Integrity not mandatory, making it mandatory needs a separate ADR; WIA1–WIA4; change note ADR-0042). ADR-0034 (WIA sub shared by all instances, HAIP §4.4.1; x509_hash). ADR-0042 (K1–K6, NW1–NW4; implementation note: TAMGA-WP-1 same entry in production and sandbox, RESERVED until certificate; registration by hand with approval; self-registration separate decision). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers (ACTIVE only; RESERVED not used). guides/build-a-wallet §4 (Android key attestation checks; App Attest checks; until verified the unit counts as software; Play Integrity added at the store release). ARF architecture §3 roles, §7.1, §2.8 (hardware keys and device attestation implemented, device testing with the store release). Live 2026-10-08: production lotl wallet_providers one entry RESERVED with no signing keys; sandbox lotl adds the network's own test provider (ACTIVE). External: EU TS3, OpenID4VCI 1.0 Annexes D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Qurum rəqəmsal cüzdana cüzdanın öz sözünə görə deyil, imzalanmış sübutlar zənciri vasitəsilə etibar edir. Cüzdanın provayderi Tamga Network-un imzalanmış etibar siyahısında olmalıdır. Hər rəqəmsal sənəd sorğusu üçün provayder cüzdana qısamüddətli, imzalanmış iki bəyanat verir: «bu, cüzdanımızın orijinal, ləğv edilməmiş quraşdırmasıdır» deyən cüzdan nüsxəsi attestasiyası (WIA) və rəqəmsal sənəd açarlarının harada saxlandığını bildirən açar attestasiyası (KA). Provayder yalnız telefon platformasının öz sübutları — Android açar attestasiyası və ya Apple App Attest — əsasında yoxladığı aparat yaddaşını iddia edə bilər. Qurum heç nə verməzdən əvvəl bütün bunları etibar siyahısı ilə tutuşdurur. Şəbəkənin özü heç bir rəqəmsal cüzdan idarə etmir; o, cüzdan provayderlərini siyahıya alır.

## Qurum üçün sənədi hansı rəqəmsal cüzdana verdiyi niyə vacibdir?

Tamga rəqəmsal sənədi şəxsin cihazındakı açara bağlanır. Həmin açar kimdədirsə, rəqəmsal sənədi o təqdim edə bilər. Açar adi tətbiq yaddaşında saxlansaydı, onu rəqəmsal sənədlə birlikdə başqa telefona köçürmək mümkün olardı və rəqəmsal sənəd artıq çox şey sübut etməzdi. Tətbiq dəyişdirilmiş nüsxə olsaydı, razılıq ekranını ötürə və ya saxlamamalı olduğu təqdimatları saxlaya bilərdi.

Buna görə də diplomu və ya şəxsiyyət sənədini imzalamazdan əvvəl qurum üç suala cavab almaq istəyir. Bu, şəbəkənin qaydalarına əməl edən rəqəmsal cüzdandırmı? Bu konkret quraşdırma hələ də etibarlı vəziyyətdədirmi? Bağlamağımı istədiyi açarlar həqiqətən təhlükəsiz aparatdadırmı? Avropa İttifaqı (Aİ) çərçivəsi də eyni sualları verir və onlara Komissiyanın texniki spesifikasiyasında [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) təsvir olunan həmin iki attestasiya ilə cavab verir. Tamga bu modeli izləyir ([ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)).

## Kim nəyə zəmanət verir?

Zəncirin hər halqası yalnız həqiqətən görə bildiyi şeyə zəmanət verir:

![Telefon platformasından verilmiş rəqəmsal sənədə qədər sübutlar zənciri](/blog/trusting-a-wallet/en/fig-zincir.png)

1. **Telefon platforması** (Google-un aparat attestasiyası kökü, Apple-ın App Attest kökü) açarın cihazın təhlükəsiz aparatında yaradıldığına və sorğunun tanınmış tətbiqdən gəldiyinə zəmanət verir.
2. **Cüzdan provayderi** bu sübutu bir dəfə, quraşdırma qeydiyyatdan keçəndə yoxlayır və bundan sonra həmin quraşdırma üçün attestasiyaları imzalayır.
3. **Etibar siyahısı** cüzdan provayderini və onun imza sertifikatını göstərir. Aktiv qeyd olmadan provayderin attestasiyalarının heç bir dəyəri yoxdur.
4. **Qurumun sənəd verən sistemi** attestasiyaları yoxlayır, rəqəmsal sənədi attestasiya edilmiş açarlara bağlayır və onu imzalayır.

Şəbəkə yalnız üçüncü halqada yer alır. O, hər provayderin əməl etməli olduğu qaydaları yazır və siyahını dərc edir; telefonları qeydiyyata almır, attestasiyaları imzalamır və heç bir cihaz məlumatı saxlamır.

## Cüzdan nüsxəsi attestasiyasında nə var?

WIA [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) Əlavə E formatında imzalanmış JWT-dir. Sahələr TS3-dən götürülüb:

> **Qeyd:** Sadələşdirilmiş nümunə. Dəyərlər qısaldılıb və ya uydurulub. Real qaydalar [ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) və [cüzdan bələdçisində](https://docs.tamga.network/guides/build-a-wallet) verilib.

```json title="Simplified example: the payload of a wallet instance attestation"
{
  "iss": "https://provider.wallet.example",
  "sub": "example-wallet",
  "wallet_name": "example-wallet",
  "wallet_version": "1.0.0",
  "wallet_link": "https://wallet.example/",
  "client_status": {
    "status": { "status_list": { "idx": 7341, "uri": "https://provider.wallet.example/status/wia" } },
    "exp": 1797000000
  },
  "cnf": { "jwk": { "kty": "EC", "crv": "P-256", "x": "…", "y": "…" } },
  "iat": 1791800000,
  "exp": 1791882800
}
```

Məxfiliyin əsas hissəsini üç detal təmin edir:

- **`sub` hər telefonda eynidir.** O, konkret quraşdırmanı deyil, cüzdan həllini adlandırır. Bunu [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili tələb edir və Tamga bu yanaşmanı qəbul edib ([ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)).
- **Onun ömrü 24 saatdan azdır** (Tamga-da 23 saat).
- **Hər rəqəmsal sənəd sorğusu üçün yenisi verilir**: `cnf` daxilində yeni sahiblik sübutu (proof-of-possession) açarı və provayderin status siyahısında yeni, əlaqələndirilə bilməyən mövqe ilə. WIA heç vaxt ikinci qurum üçün təkrar istifadə olunmur. Məlumatlarını müqayisə edən iki qurum eyni telefonun hər ikisi ilə əlaqə saxladığını müəyyən edə bilməz, provayder isə cüzdanın neçə qurumla işlədiyini öyrənmir.

Quraşdırmanın öz uzunmüddətli açarı — vahid açarı (unit key) — yalnız rəqəmsal cüzdan ilə onun provayderi arasında istifadə olunur. O, heç vaxt quruma göstərilmir.

## Açar attestasiyası nə əlavə edir?

WIA quraşdırmanın orijinal olduğunu bildirir. Açar attestasiyası — OpenID4VCI Əlavə D formatında ayrıca JWT — rəqəmsal sənədin bağlanacağı açarlar haqqında məlumat verir:

- `attested_keys`: paketdəki hər açar, çünki hər rəqəmsal sənəd 10 nüsxədə verilir və hər nüsxənin öz açarı var;
- `key_storage` və `user_authentication`: TS3-ün istifadə etdiyi ISO 18045 terminləri ilə yaddaş və istifadəçi doğrulaması səviyyələri;
- `key_storage_status`: provayderin ləğv edə biləcəyi status siyahısı qeydi.

Status qeydi qəsdən ümumi saxlanılır. Hər yaddaş növü (proqram yaddaşı, Secure Enclave, StrongBox) üçün bir ortaq qeyd var — bu, TS3-ün icazə verdiyi birinci variantdır. Yaddaş növlərindən birinin etibarsız olduğu üzə çıxsa, provayder onu hamı üçün birdən geri çəkə bilər, açar attestasiyası isə quraşdırmanı müəyyən edən heç nə açıqlamır. Hər açar dəqiq bir açar attestasiyasında yer alır, hər açar attestasiyası bir dəfə istifadə olunur və attestasiya cüzdanın quruma göndərdiyi sübutun başlığında ötürülür.

Bunu dürüst saxlayan qayda WIA3-dür: açar attestasiyasındakı yaddaş səviyyəsi həqiqəti əks etdirir və yoxlanılmamış iddia heç vaxt ona yazılmır.

## Provayder açarın aparatda olduğunu haradan bilir?

Platformanın imzalanmış sübutundan; heç vaxt tətbiqin özü haqqında dediklərindən yox ([cüzdan bələdçisi, §4](https://docs.tamga.network/guides/build-a-wallet)):

![Cüzdan provayderinin platforma sübutunda yoxladıqları](/blog/trusting-a-wallet/en/fig-kanit.png)

| Platforma | Sübut | Nə yoxlanılır |
|---|---|---|
| Android | [açar attestasiyası](https://developer.android.com/privacy-and-security/security-key-attestation) zənciri | Google-un aparat kökünə aparır; birdəfəlik çağırış (challenge); təhlükəsizlik səviyyəsi (TEE və ya StrongBox); təsdiqlənmiş yükləmə (verified boot); tətbiq paketinin adı |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple-ın kökünə aparır; tətbiqin kimliyi (Team ID və Bundle ID); müştəri məlumatlarında vahid açarın barmaq izi var |

Sübut yoxlanılana qədər quraşdırma proqram səviyyəsində sayılır. Bunun nə demək olduğunu isə şəbəkənin rəqəmsal cüzdan qaydaları müəyyən edir. Rəqəmsal cüzdanlar W1 (proqram açarları), W2 (cihazın təhlükəsiz sahəsi: Secure Enclave və ya StrongBox) və W3 (dövlət mərhələsi üçün sertifikatlaşdırılmış təhlükəsiz element) kimi dərəcələndirilir. Minimum səviyyə W2-dir. Proqram açarlı rəqəmsal cüzdan dəstəklənmir; yeganə istisna şəbəkənin nümayiş ssenariləri üçün istifadə etdiyi, sınaq (sandbox) siyahısındakı öz test açarıdır (WL3 qaydası).

Aparat açarları həm də telefonun kilidinə bağlıdır. Rəqəmsal sənəd açarından yalnız telefonun kilidi açıq olduqda istifadə etmək mümkündür və hər təqdimat cihazın biometrik məlumatları və ya parolu ilə təsdiqlənir (WL11 qaydası).

Android-də provayder əlavə olaraq tətbiqin mağazadan yükləndiyini göstərən [Play Integrity](https://developer.android.com/google/play/integrity) nəticəsini də göndərə bilər. W2 səviyyəsində bu, könüllüdür: o, açar attestasiyasından götürülən səviyyəni heç vaxt aşağı salmır və onun olmaması qeydiyyata mane olmur. Ən yüksək səviyyə olan W3-də provayder vahidi aktivləşdirərkən və W3 bəyan edən hər açar attestasiyasından əvvəl platformanın cihaz attestasiyasını yoxlamalıdır (RB-WP-17).

## Qurum sənədi verməzdən əvvəl nəyi yoxlayır?

![Sənədi verən qurumun yoxladıqları, ardıcıllıqla](/blog/trusting-a-wallet/en/fig-denetim.png)

Avtorizasiya və token son nöqtələrində sənədi verən qurum WIA-nı yoxlayır: imzasını, imza açarının etibar siyahısındakı qeydi `ACTIVE` olan cüzdan provayderinə məxsus olmasını, etibarlılıq müddətini, `cnf` açarına sahiblik sübutunu və `client_status` qeydinin ləğv edilmədiyini.

Rəqəmsal sənəd son nöqtəsində o, açar attestasiyasını yoxlayır: imzasını və provayder açarını, cüzdanın sübutunun sənədi verən qurumun təzə nonce dəyəri üzərində birinci attestasiya edilmiş açarla imzalandığını, `key_storage_status` qeydinin ləğv edilmədiyini və yaddaş səviyyəsinin qurumun öz minimum tələbinə cavab verdiyini. Yalnız bundan sonra o, hər nüsxəni attestasiya edilmiş açarlardan birinə bağlayaraq imzalayır. Sənədi verən qurum heç vaxt ləğv edilmiş WIA və ya açar attestasiyası əsasında sənəd vermir (WIA4 qaydası). Bu addımların protokol baxımından izahı [OpenID4VCI üzrə ətraflı yazıdadır](/blog/openid4vci-deep-dive).

Bir keçid dövrü açıq şəkildə qeyd olunub: pilot mərhələyə qədər sənədi verən qurum açar attestasiyası olmayan cüzdan sübutunu da qəbul edir. Bu yol pilot mərhələdə aradan qaldırılır.

## Rəqəmsal cüzdan və ya bütöv cüzdan məhsulu necə geri çəkilir?

Darından genişə doğru üç səviyyə var:

| Nə geri çəkilir | Kim edir | Nəticə |
|---|---|---|
| Bir quraşdırma | cüzdan provayderi, şəxsin istəyi ilə («bu rəqəmsal cüzdanı ləğv et», məsələn, telefonu başqasına verməzdən əvvəl) | həmin quraşdırmaya verilmiş bütün WIA qeydləri ləğv edilir |
| Açar yaddaşının bir növü | cüzdan provayderi | həmin yaddaş növü üçün hər açar attestasiyası status yoxlamasından keçmir |
| Bütöv cüzdan provayderi | qeydiyyatçı, etibar siyahısı vasitəsilə | provayderin qeydi `SUSPENDED` və ya `REVOKED` olur; onun attestasiyaları artıq nəzərə alınmır |

Telefonda artıq olan rəqəmsal sənədlər bundan ayrıdır: onları verən qurumlar öz [status siyahıları](/blog/status-list-privacy) vasitəsilə geri çəkir. Quraşdırmanın ləğvi onun yeni rəqəmsal sənədlər almasının qarşısını alır.

İtirilmiş və ya oğurlanmış telefonu uzaqdan geri çəkmək üçün şəxsin həmin telefon olmadan kimliyini sübut etməsinin hansısa yolu lazımdır. Qərar bunu sonrakı mərhələyə saxlayır.

## Tamga Network niyə rəqəmsal cüzdanları özü idarə etmir?

Çünki rəqəmsal cüzdan idarə edən şəbəkə öz məhsulunu qiymətləndirmiş olardı. Aİ modelində hər rəqəmsal cüzdanı onu təklif edən təşkilat idarə edir, etibar çərçivəsi isə yalnız cüzdan provayderlərini siyahıya alır. Tamga Network da eyni bölgünü izləyir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- şəbəkə heç bir rəqəmsal cüzdan tətbiqi, cüzdan provayderi və ya cüzdan veb-saytı idarə etmir və şəbəkənin domen adları altında heç bir cüzdan xidməti işləmir;
- şəbəkə rəqəmsal cüzdanı yalnız etibar siyahısındakı qeydinə görə tanıyır; bu qeydi istənilən provayder dərc olunmuş qaydalara əməl etməklə əldə edə bilər;
- şəbəkənin interfeyslərində və paketlərində heç bir cüzdanın adı sabit kodlaşdırılmayıb;
- yalnız bir sınaq mühiti (sandbox) var və o, şəbəkəyə məxsusdur: cüzdan tərtibatçısı öz provayderini işlədir və onu sandbox siyahısında qeydiyyatdan keçirir.

[Tamga Wallet](https://tamgawallet.com/en) şəbəkədəki rəqəmsal cüzdanlardan biridir. O, ayrıca məhsuldur və siyahıya digər cüzdanlarla eyni yolla daxil olur. Onun provayderinin (`TAMGA-WP-1`) istehsal siyahısında bir qeydi, sandbox siyahısında isə eyni qeydi var və hər ikisi 14 oktyabr 2026-cı ildən bəri `ACTIVE`-dir: həmin gün cüzdanın operatoru provayder xidmətini cüzdanın öz domeni altında açdı və öz sertifikatını təqdim etdi. Sandbox siyahısında həmçinin şəbəkənin öz ssenariləri üçün test provayderi var. Qeydiyyat hazırda əl ilə, layihə rəhbərliyinin təsdiqi ilə aparılır; cüzdan provayderlərinin özlərini qeydiyyatdan keçirməsi ayrıca qərar tələb edir.

## Bu gün açığını desək, hansı məhdudiyyətlər var?

- **Real cihazlarda sınaq davam edir.** Aparat açarları və cihaz attestasiyası həyata keçirilib; real telefonlarda sınaq başlayıb və tətbiq mağazalarında buraxılışdan əvvəl başa çatacaq ([ARF §2.8](https://arf.tamga.network/architecture)).
- **Hələlik yalnız bir aktiv cüzdan provayderi var.** İstehsal siyahısında yalnız yuxarıda təsvir edilən Tamga Wallet qeydi var.
- **Play Integrity W3-dən aşağıda məcburi deyil**, açar attestasiyası olmadan sübutları qəbul edən keçid dövrü isə pilota qədər davam edir.
- **İtirilmiş telefonun ləğvi** hesab tələb etmir, lakin şəxsin provayderin aktivləşdirmə zamanı bir dəfə göstərdiyi ləğv kodunu saxlamasına əsaslanır (RB-WP-15).
- **Hələ sertifikatlaşdırılmış təhlükəsiz element yoxdur.** W3 dövlət mərhələsinə aiddir.
- **Attestasiyalar şəxsi deyil, proqram təminatını və açarları sübut edir.** Şəxsin kim olduğu ayrıca sualdır və ona qurumda aparılan şəxsiyyət yoxlaması cavab verir.

## Tez-tez verilən suallar

### İstənilən rəqəmsal cüzdan Tamga Network-a qoşula bilərmi?

Provayderi dərc olunmuş qaydalara əməl edən və uyğunluq testlərindən keçən istənilən rəqəmsal cüzdan siyahıya daxil edilə bilər. Şəbəkə cüzdanları adına görə deyil, etibar siyahısındakı qeydinə görə tanıyır.

### Cüzdan provayderi hansı qurumlardan istifadə etdiyimi öyrənirmi?

Xeyr. Hər rəqəmsal sənəd sorğusunda yeni açar və yeni status mövqeyi ilə yeni attestasiya istifadə olunur, buna görə provayder cüzdanın neçə qurumla əlaqə saxladığını görmür, qurumlar isə eyni telefonu öz aralarında əlaqələndirə bilmirlər.

### Telefonumda təhlükəsiz aparat təminatı yoxdursa, nə baş verir?

Quraşdırma proqram səviyyəsində qalır və şəbəkənin qaydaları real rəqəmsal sənədlər üçün proqram açarlı cüzdanları dəstəkləmir. Cüzdan səssizcə davam etmək əvəzinə bunu şəxsə aydın şəkildə bildirməlidir.

### Rəqəmsal cüzdan məhsulu şəbəkədən çıxarıla bilərmi?

Bəli. Qeydiyyatçı provayderin etibar siyahısındakı qeydini dayandıra və ya ləğv edə bilər və həmin andan etibarən onun attestasiyaları heç bir sənədi verən qurumda yoxlamadan keçmir.

## Mənbələr

- [Aİ texniki spesifikasiyası TS3: cüzdan vahidinin attestasiyası (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [Aİ Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Yoxlanıla bilən rəqəmsal sənədlərin verilməsi üçün OpenID 1.0 (Əlavə D – açar attestasiyası, Əlavə E – cüzdan attestasiyası)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android açar attestasiyası](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: cüzdan və açar attestasiyaları](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 uyğunluğu](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ilə uyğun rəqəmsal cüzdan yaradın](https://docs.tamga.network/guides/build-a-wallet) · [Rəqəmsal cüzdan spesifikasiyası](https://docs.tamga.network/specifications/wallet)
- [Rəqəmsal cüzdanın qurulması](/learn/build-a-wallet) · [İlk rəqəmsal cüzdan](/learn/first-wallet) · [Rəqəmsal cüzdanlar](/learn/digital-wallets)

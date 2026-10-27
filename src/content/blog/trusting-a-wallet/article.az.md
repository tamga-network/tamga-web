---
title: "Rəqəmsal cüzdana necə etibar edilir? Attestasiyalar və aparat açarları"
slug: trusting-a-wallet
description: "Tamga Network-da qurumun sənəd verəcəyi cüzdana necə etibar etdiyini izah edirik: cüzdan attestasiyası, açar attestasiyası, aparat sübutu və etibar siyahısı."
date: 2026-10-08
updated: 2026-10-23
lang: az
category: privacy
draft: false
related: openid4vci-deep-dive, haip-and-token-status-list, how-trust-lists-work, what-the-network-never-sees
---

<!-- Sources: ADR-0025 1.0.0 (EU TS3 model; K1 unit registration, unit key never shown to institutions, unit record without personal data; K2 WIA Annex E, TS3 §2.3.1 fields, lifetime < 24 h (23 h), client_status ≥ 31 days (60), new PoP key and new status entry per transaction, no per-institution reuse; K3 KA Annex D, attested_keys, key_storage / user_authentication ISO 18045, certification, key_storage_status one shared entry per storage type (TS3 Option 1), in the jwt proof header, used once; K4 two status lists signed with a key registered in the trust list, WIA list ≥ 10,000 entries, "revoke this wallet", lost device needs an account later; K5 issuer checks at PAR/token and credential endpoint, KA level vs institution minimum, transition without KA until before the pilot (ADR-0025 K5; code checked 2026-10-23: a proof without KA counts as software key storage against the institution's min_key_storage); implementation notes: keys bound to phone lock, Play Integrity not mandatory, making it mandatory needs a separate ADR; WIA1–WIA4; change note ADR-0042). ADR-0034 (WIA sub shared by all instances, HAIP §4.4.1; x509_hash). ADR-0042 (K1–K6, NW1–NW4; implementation note: TAMGA-WP-1 same entry in production and sandbox, RESERVED until certificate; registration by hand with approval; self-registration separate decision). SPEC-WALLET-0001 §2.2 W1/W2/W3, WL3, WL11. SPEC-PROTO-0001 PR11, PR19. SPEC-TRUST-0001 §3 wallet_providers (ACTIVE only; RESERVED not used). guides/build-a-wallet §4 (Android key attestation checks; App Attest checks; until verified the unit counts as software; Play Integrity added at the store release). ARF architecture §3 roles, §7.1, §2.8 (hardware keys and device attestation implemented, device testing with the store release). Live 2026-10-08: production lotl wallet_providers one entry RESERVED with no signing keys; sandbox lotl adds the network's own test provider (ACTIVE). External: EU TS3, OpenID4VCI 1.0 Annexes D/E, HAIP 1.0, Android key attestation, Apple App Attest, Play Integrity. -->

Qurum cüzdana cüzdanın özü haqqında dediklərinə görə deyil, imzalanmış sübutlardan ibarət zəncirə görə etibar edir. Bunun üçün əvvəlcə cüzdanın provayderi (wallet provider) Tamga Network-un imzalanmış etibar siyahısında qeydiyyatda olmalıdır. Provayder hər sənəd sorğusunda cüzdana qısaömürlü və imzalanmış iki bəyanat verir. Onlardan biri quraşdırmanın cüzdanın həqiqi və ləğv edilməmiş quraşdırması olduğunu deyən cüzdan nüsxəsi attestasiyasıdır (WIA). Digəri isə sənəd açarlarının harada saxlandığını bildirən açar attestasiyasıdır (KA). Provayder açarın aparatda saxlandığını yalnız bunu telefon platformasının öz sübutu ilə, yəni Android açar attestasiyası və ya Apple App Attest ilə yoxladıqda yaza bilər. Qurum da sənəd verməzdən əvvəl bütün bunları etibar siyahısına görə yoxlayır. Şəbəkənin özü cüzdan idarə etmir, yalnız cüzdan provayderlərini siyahıya alır.

## Qurum üçün sənədi hansı cüzdana verdiyi niyə vacibdir?

Tamga sənədi şəxsin cihazındakı açara bağlıdır və həmin açar kimdədirsə, sənədi o göstərə bilər. Açar adi tətbiq məlumatları arasında saxlansaydı, sənədlə birlikdə başqa telefona köçürülə bilərdi və sənəd artıq çox şey sübut etməzdi. Tətbiq dəyişdirilmiş nüsxə olsaydı, razılıq ekranını ötürə və ya saxlamamalı olduğu təqdimatları saxlaya bilərdi.

Ona görə qurum diplomu və ya şəxsiyyət sənədini imzalamazdan əvvəl üç sualın cavabını bilmək istəyir. Cüzdanın şəbəkənin qaydalarına əməl edib-etmədiyini, bu quraşdırmanın hələ də etibarlı olub-olmadığını və sənədin bağlanması istənilən açarların həqiqətən təhlükəsiz aparatda olub-olmadığını soruşur. Aİ çərçivəsi də eyni sualları verir və onlara eyni iki attestasiya ilə cavab verir. Bu attestasiyalar Komissiyanın texniki spesifikasiyası [TS3](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md)-də təsvir olunub. Tamga da bu modeli izləyir ([ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)).

## Kim nəyə zəmanət verir?

Zəncirin hər halqası yalnız həqiqətən görə bildiyi şeyə zəmanət verir:

![Telefon platformasından verilmiş rəqəmsal sənədə qədər sübutlar zənciri](/blog/trusting-a-wallet/en/fig-zincir.png)

1. **Telefon platforması** (Google-un aparat attestasiyası kökü və Apple-ın App Attest kökü) açarın cihazın təhlükəsiz aparatında yaradıldığına və sorğunun tanınmış tətbiqdən gəldiyinə zəmanət verir.
2. **Cüzdan provayderi** bu sübutu quraşdırma qeydiyyatdan keçəndə bir dəfə yoxlayır və həmin andan sonra bu quraşdırma üçün attestasiyalar imzalayır.
3. **Etibar siyahısı** cüzdan provayderini və onun imza sertifikatını göstərir. Provayderin siyahıda aktiv qeydi yoxdursa, onun attestasiyaları heç nə ifadə etmir.
4. **Qurumun sənəd vermə xidməti** attestasiyaları yoxlayır, sənədi sübut olunmuş açarlara bağlayır və imzalayır.

Şəbəkə bu zəncirdə yalnız üçüncü halqada yer alır. Hər provayderin əməl etməli olduğu qaydaları yazır və siyahını dərc edir. Telefonları qeydiyyata almır, attestasiya imzalamır və heç bir cihaz məlumatı saxlamır.

## Cüzdan nüsxəsi attestasiyasında nə var?

WIA [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) E əlavəsindəki formata əsasən imzalanmış JWT-dir və onun sahələri TS3-dən gəlir:

> **Qeyd:** Aşağıdakı nümunə sadələşdirilib. Dəyərlər qısaldılıb və ya uydurulub. Real qaydaları [ADR-0025](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations)-də və [cüzdan bələdçisində](https://docs.tamga.network/guides/build-a-wallet) tapa bilərsiniz.

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

Məxfiliyi əsasən üç təfərrüat təmin edir:

- **`sub` hər telefonda eynidir.** Bu sahə quraşdırmanı deyil, cüzdan məhsulunu adlandırır. [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html) profili bunu tələb edir və Tamga da bu qaydanı qəbul edib ([ADR-0034](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub)).
- **Ömrü 24 saatdan azdır.** Tamga-da bu müddət 23 saatdır.
- **Hər sənəd sorğusu üçün yeni attestasiya alınır.** Yeni attestasiya `cnf` daxilində yeni sahiblik açarı və provayderin status siyahısında bir-biri ilə əlaqələndirilə bilməyən yeni mövqe daşıyır. WIA heç vaxt ikinci qurumda istifadə olunmur. Bunun sayəsində məlumatlarını müqayisə edən iki qurum eyni telefonun hər ikisi ilə əlaqə saxladığını anlaya bilmir. Provayder də cüzdanın neçə qurumla iş gördüyünü öyrənmir.

Quraşdırmanın uzunömürlü öz açarı olan vahid açarı isə yalnız cüzdanla onun provayderi arasında istifadə olunur və heç vaxt quruma göstərilmir.

## Açar attestasiyası nə əlavə edir?

WIA quraşdırmanın həqiqi olduğunu deyir. OpenID4VCI D əlavəsindəki formatda ayrıca JWT olan açar attestasiyası isə sənədin bağlanacağı açarlar haqqında məlumat verir:

- `attested_keys`: paketdəki bütün açarlar; hər sənəd 10 nüsxə kimi verildiyi və hər nüsxənin öz açarı olduğu üçün;
- `key_storage` və `user_authentication`: TS3-ün istifadə etdiyi ISO 18045 terminləri ilə açarın saxlanma və istifadəçi yoxlaması səviyyələri;
- `key_storage_status`: provayderin ləğv edə biləcəyi status siyahısı girişi.

Bu giriş bilərəkdən kobud saxlanılır. Hər saxlama növü (proqram yaddaşı, Secure Enclave, StrongBox) üçün bir ortaq giriş var və bu, TS3-ün icazə verdiyi ilk seçimdir. Saxlama növlərindən birinin təhlükəsiz olmadığı üzə çıxsa, provayder onu hamı üçün birdəfəyə geri çəkə bilər. Açar attestasiyası da quraşdırmanı tanıda biləcək heç bir məlumatı açmır. Hər açar dəqiq bir açar attestasiyasında yer alır, hər açar attestasiyası yalnız bir dəfə istifadə olunur və attestasiya cüzdanın quruma göndərdiyi sahiblik sübutunun başlığında daşınır.

Bu quruluşu dürüst saxlayan qayda WIA3-dür. Açar attestasiyasındakı saxlama səviyyəsi həqiqəti əks etdirməlidir və yoxlanılmamış bəyanat heç vaxt açar attestasiyasına yazılmır.

## Provayder açarın aparatda olduğunu haradan bilir?

Provayder bunu platformanın imzalanmış sübutundan öyrənir və tətbiqin özü haqqında dediklərinə heç vaxt söykənmir ([cüzdan bələdçisi §4](https://docs.tamga.network/guides/build-a-wallet)):

![Cüzdan provayderinin platforma sübutunda yoxladıqları](/blog/trusting-a-wallet/en/fig-kanit.png)

| Platforma | Sübut | Nə yoxlanılır |
|---|---|---|
| Android | [açar attestasiyası](https://developer.android.com/privacy-and-security/security-key-attestation) zənciri | Google-un aparat kökünə bağlanması; birdəfəlik çağırış dəyəri; təhlükəsizlik səviyyəsi (TEE və ya StrongBox); yoxlanılmış yükləmə; tətbiqin paket adı |
| iOS | [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) | Apple-ın kökünə bağlanması; tətbiqin kimliyi (Team ID və Bundle ID); müştəri məlumatlarının vahid açarının barmaq izini daşıması |

Sübut yoxlanılana qədər quraşdırma proqram təminatı səviyyəsində sayılır və bunun nə demək olduğunu şəbəkənin cüzdan qaydaları müəyyən edir. Cüzdanlar üç səviyyədə təsnif olunur. W1 proqram açarı, W2 cihazın təhlükəsiz zonası (Secure Enclave və ya StrongBox), W3 isə dövlət mərhələsi üçün sertifikatlaşdırılmış təhlükəsiz element deməkdir. Qəbul edilən ən aşağı səviyyə W2-dir. Proqram açarından istifadə edən cüzdanlar dəstəklənmir. Bunun yeganə istisnası şəbəkənin sandbox siyahısında öz nümayiş ssenariləri üçün saxladığı test açarıdır (WL3 qaydası).

Aparat açarları telefonun kilidinə də bağlıdır. Sənəd açarı yalnız telefonun kilidi açıq olanda istifadə oluna bilər və hər təqdimat cihazın biometrik yoxlaması və ya parolu ilə təsdiqlənir (WL11 qaydası).

Android-də provayder əlavə olaraq tətbiqin mağazadan yükləndiyini göstərən [Play Integrity](https://developer.android.com/google/play/integrity) nəticəsini də göndərə bilər. W2 səviyyəsində bu istəyə bağlıdır. Bu nəticə açar attestasiyasından gələn səviyyəni heç vaxt aşağı salmır və nəticənin olmaması qeydiyyata mane olmur. Ən yüksək səviyyə olan W3-də isə provayder vahidi aktivləşdirməzdən əvvəl və W3 səviyyəsini bəyan edən hər açar attestasiyasından əvvəl platformanın cihaz attestasiyasını yoxlamalıdır (RB-WP-17).

## Qurum sənəd verməzdən əvvəl nəyi yoxlayır?

![Sənədi verən qurumun yoxladıqları, ardıcıllıqla](/blog/trusting-a-wallet/en/fig-denetim.png)

Avtorizasiya və token endpoint-lərində sənəd vermə xidməti WIA-nı yoxlayır. İmzanı yoxlayır və imza açarının etibar siyahısında qeydi `ACTIVE` olan cüzdan provayderinə məxsus olduğuna baxır. Sonra etibarlılıq müddətini, `cnf` açarının sahiblik sübutunu və `client_status` dəyərinin ləğv edilmədiyini yoxlayır.

Sənəd endpoint-ində isə açar attestasiyasını yoxlayır. Attestasiyanın imzasını və provayderin açarını yoxlayır. Cüzdanın göndərdiyi sahiblik sübutunun siyahıdakı ilk açarla və qurumun verdiyi təzə nonce üzərindən imzalandığına baxır. `key_storage_status` dəyərinin ləğv edilmədiyini və saxlama səviyyəsinin qurumun özünün müəyyən etdiyi ən aşağı səviyyəyə cavab verdiyini də yoxlayır. Yalnız bundan sonra sənədi imzalayır və hər nüsxəni sübut olunmuş açarlardan birinə bağlayır. Sənəd vermə xidməti ləğv edilmiş WIA və ya açar attestasiyası ilə heç vaxt sənəd vermir (WIA4 qaydası). Bu addımların protokol tərəfini [OpenID4VCI ətraflı](/blog/openid4vci-deep-dive) yazısında izah etmişik.

Keçid dövrü üçün bir qaydanı da açıq yazırıq. Pilota qədər sənəd vermə xidməti açar attestasiyası olmayan sahiblik sübutunu da qəbul edir. Belə sübut proqram yaddaşında saxlanılan açar kimi qiymətləndirilir, ona görə ən aşağı səviyyəsi proqram təminatından yuxarı olan qurum onu bu gün də rədd edir. Bu yol pilotdan əvvəl ləğv ediləcək.

## Cüzdan və ya bütöv cüzdan məhsulu necə geri çəkilir?

Dardan genişə doğru üç səviyyə var:

| Nə geri çəkilir | Kim edir | Nəticə |
|---|---|---|
| Bir quraşdırma | cüzdan provayderi, şəxsin istəyi ilə (məsələn, telefonu başqasına verməzdən əvvəl "bu cüzdanı ləğv et") | həmin quraşdırmaya verilmiş bütün WIA girişləri ləğv edilir |
| Açar saxlamasının bir növü | cüzdan provayderi | həmin saxlama növü üçün verilmiş hər açar attestasiyası status yoxlamasından keçmir |
| Bütöv cüzdan provayderi | qeydiyyat orqanı, etibar siyahısı vasitəsilə | provayderin qeydi `SUSPENDED` və ya `REVOKED` olur və onun attestasiyaları artıq etibarlı sayılmır |

Telefonda artıq olan sənədlər bundan ayrı məsələdir. Onları sənədi verən qurumlar öz [status siyahıları](/blog/status-list-privacy) vasitəsilə geri çəkir. Quraşdırmanın ləğvi isə həmin quraşdırmanın yeni sənəd almasını dayandırır.

İtmiş və ya oğurlanmış telefonu uzaqdan geri çəkmək üçün şəxsin həmin telefon olmadan kim olduğunu sübut edə biləcəyi yol lazımdır. Qərar bu məsələni sonrakı addıma buraxır.

## Tamga Network niyə cüzdan idarə etmir?

Cüzdan idarə edən şəbəkə öz məhsulunu özü qiymətləndirmiş olardı. Aİ modelində də hər cüzdanı onu təklif edən təşkilat idarə edir və etibar çərçivəsi yalnız cüzdan provayderlərini siyahıya alır. Tamga Network də eyni bölgünü izləyir ([ADR-0042](https://docs.tamga.network/adr/0042-network-and-wallets)):

- şəbəkə heç bir cüzdan tətbiqini, cüzdan provayderini və ya cüzdan saytını idarə etmir və şəbəkənin domen adları altında heç bir cüzdan xidməti işləmir;
- cüzdanı yalnız etibar siyahısındakı qeydi ilə tanıyır və dərc olunmuş qaydalara əməl edən hər provayder bu qeydi ala bilər;
- interfeysləri və paketləri heç bir cüzdanın adını koda yazmır;
- bir sandbox var və o, şəbəkəyə məxsusdur; cüzdan tərtibatçısı öz provayderini idarə edir və onu sandbox siyahısında qeydiyyatdan keçirir.

[Tamga Wallet](https://tamgawallet.com/en) şəbəkədəki cüzdanlardan biridir. Ayrıca məhsul kimi siyahıya digər cüzdanlarla eyni yolla daxil olur. Onun provayderinin (`TAMGA-WP-1`) real siyahıda bir qeydi və sandbox siyahısında eyni qeydi var. Hər iki qeyd 14 oktyabr 2026-cı ildən `ACTIVE` vəziyyətdədir. Həmin gün cüzdanın operatoru provayder xidmətini cüzdanın öz domeni altında açdı və öz sertifikatını təqdim etdi. Sandbox siyahısında həmçinin şəbəkənin öz nümayiş ssenariləri üçün saxladığı test provayderi var. Qeydiyyat bu gün əllə və layihə rəhbərliyinin təsdiqi ilə aparılır. Cüzdan provayderlərinin özlərini qeydiyyatdan keçirə bilməsi isə ayrıca qərar tələb edir.

## Bu gün açığını desək, hansı məhdudiyyətlər var?

- **Cihaz sınaqları gözləyir.** Aparat açarları və cihaz attestasiyası tətbiq edilib. Real telefonlarla sınaqlar tətbiq mağazası buraxılışından əvvəl aparılacaq ([ARF §2.8](https://arf.tamga.network/architecture)).
- **Hələlik bir aktiv cüzdan provayderi var.** Real siyahıda yalnız yuxarıda təsvir olunan Tamga Wallet qeydi var.
- **Play Integrity W3-dən aşağı səviyyələrdə istəyə bağlıdır.** Açar attestasiyası olmayan sahiblik sübutlarını qəbul edən keçid qaydası da pilota qədər qüvvədədir.
- **İtmiş telefonun ləğvi** hesab tələb etmir, amma şəxsin provayderin aktivləşdirmə zamanı bir dəfə göstərdiyi ləğv kodunu saxlamasına söykənir (RB-WP-15).
- **Hələ sertifikatlaşdırılmış təhlükəsiz element yoxdur.** W3 səviyyəsi dövlət mərhələsinə aiddir.
- **Attestasiyalar şəxsi deyil, proqram təminatını və açarları sübut edir.** Şəxsin kim olduğu ayrıca sualdır və onun cavabını qurumda aparılan şəxsiyyət yoxlaması verir.

## Tez-tez verilən suallar

### İstənilən cüzdan Tamga Network-a qoşula bilərmi?

Provayderi dərc olunmuş qaydalara əməl edən və uyğunluq testlərindən keçən hər cüzdan siyahıya düşə bilər. Şəbəkə cüzdanları adları ilə deyil, etibar siyahısındakı qeydləri ilə tanıyır.

### Cüzdan provayderi hansı qurumlardan istifadə etdiyimi öyrənirmi?

Xeyr. Hər sənəd sorğusunda yeni açar və yeni status mövqeyi daşıyan təzə attestasiyadan istifadə olunur. Ona görə provayder cüzdanın neçə qurumla əlaqə saxladığını görə bilmir, qurumlar da eyni telefonu öz aralarında uyğunlaşdıra bilmir.

### Telefonumda təhlükəsiz aparat yoxdursa, nə baş verir?

Quraşdırma proqram təminatı səviyyəsində qalır və şəbəkənin qaydaları real sənədlər üçün proqram açarından istifadə edən cüzdanları dəstəkləmir. Cüzdan bunu şəxsə açıq deməli və səssizcə davam etməməlidir.

### Cüzdan məhsulu şəbəkədən çıxarıla bilərmi?

Bəli. Qeydiyyat orqanı provayderin etibar siyahısındakı qeydini dayandıra və ya ləğv edə bilər. Həmin andan sonra provayderin attestasiyaları heç bir sənəd vermə xidmətindən keçmir.

## Mənbələr

- [Aİ texniki spesifikasiyası TS3: cüzdan vahidinin attestasiyası (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/blob/main/docs/technical-specifications/ts3-wallet-unit-attestation.md) · [Aİ Arxitektura və İstinad Çərçivəsi (GitHub)](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework)
- [Yoxlanıla bilən rəqəmsal sənədlərin verilməsi üçün OpenID 1.0 (Əlavə D – açar attestasiyası, Əlavə E – cüzdan attestasiyası)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) · [HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0.html)
- [Android açar attestasiyası](https://developer.android.com/privacy-and-security/security-key-attestation) · [Apple App Attest](https://developer.apple.com/documentation/devicecheck/establishing-your-app-s-integrity) · [Play Integrity API](https://developer.android.com/google/play/integrity)
- [ADR-0025: cüzdan və açar attestasiyaları](https://docs.tamga.network/adr/0025-wallet-instance-and-key-attestations) · [ADR-0034: HAIP 1.0 uyğunluğu](https://docs.tamga.network/adr/0034-haip-client-id-and-wia-sub) · [ADR-0042: şəbəkə heç bir rəqəmsal cüzdan idarə etmir](https://docs.tamga.network/adr/0042-network-and-wallets)
- [Tamga ilə uyğun rəqəmsal cüzdan yaradın](https://docs.tamga.network/guides/build-a-wallet) · [Rəqəmsal cüzdan spesifikasiyası](https://docs.tamga.network/specifications/wallet)
- [Rəqəmsal cüzdanın qurulması](/learn/build-a-wallet) · [İlk rəqəmsal cüzdan](/learn/first-wallet) · [Rəqəmsal cüzdanlar](/learn/digital-wallets)

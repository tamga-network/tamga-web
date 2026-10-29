// Tamga Network — Whitepaper v1.0 (az). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-az.typ ../public/whitepaper-az.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "az",
  title: [Türkiyə və Türk Dünyası üçün \ Rəqəmsal Etibar İnfrastrukturu],
  subtitle: [Avropa İttifaqının (Aİ) EUDI profilləri əsasında suveren istinad arxitekturası. Qurumlar X.509 sertifikatı daşıyır, etibar bu gün imzalı siyahılara əsaslanır, müstəqil operatorlar qoşulduqda icazəli reyestr əlavə olunur.],
  labels: (abstract: "İcmal", contents: "Mündəricat", version: "WHITEPAPER · VERSİYA 1.0"),
  date: "2026-10-29",
  edition: "Yenidən baxılmış nəşr · ilk nəşr 2026-10-03",
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network rəqəmsal etibar infrastrukturudur. Qurum diplom, tələbə bileti, şəxsiyyət sənədi və ya bilet kimi sənədi birbaşa şəxsin telefonuna verir. Şəxs yalnız yoxlayan tərəfin istədiyi sahələri paylaşır, yoxlayan tərəf isə quruma müraciət etmədən sənədi saniyələr ərzində yoxlayır.

    Texniki qat Avropa İttifaqının qatıdır və olduğu kimi istifadə olunur: SD-JWT VC və ISO 18013-5 mdoc sənədləri, OpenID4VCI və OpenID4VP, qurumlar üçün X.509 sertifikatları və ETSI modelində imzalı etibar siyahıları. Tamga bunun üstünə türk dünyası üçün yazılmış idarəetmə qatı əlavə edir. Hər siyahıda, identifikatorda və rolda hər üzv dövlət üçün yer var; Tamga operator rolunu yalnız müvəqqəti olaraq, dövlətlərin adından və bir dövlət onu təhvil alana qədər yerinə yetirir.

    Etibar bu gün hamıya açıq lövbər jurnalı ilə birlikdə versiyalı və hash zəncirli etibar siyahılarına əsaslanır. İcazəli Besu/QBFT reyestrinin kodu yazılıb və test edilib, lakin reyestr yalnız imzalı siyahıları əks etdirir və ən azı iki müstəqil operator onu birlikdə idarə etməyə başlayana qədər söndürülmüş qalır. Siyahılara, jurnallara və ya reyestrə heç bir fərdi məlumat yazılmır, hətta hash-i belə yazılmır. Xidmətlər real kriptoqrafiya ilə başdan sona işləyir, açıq paketlər npm-də sınaq buraxılışı kimi dərc olunub, sənəd verən və yoxlayan tərəf isə 2026-cı ilin oktyabrında OpenID Foundation-ın uyğunluq test planlarını öz-sınaq kimi icra edib uğursuz modul qalmadan tamamladı; yoxlayan tərəf o vaxtdan dəyişib və onun planı yenidən icra ediləcək. Bu sənəd nəyin işlədiyini, nəyin planlaşdırıldığını və nəyin hələ tədqiqat olduğunu bildirir.

  ],
)

= Problem: sənəd surəti dövrünün sonu

Onilliklər boyu kim olduğumuzu surət təqdim edərək sübut etdik. Diplomun surəti işəgötürənə, şəxsiyyət vəsiqəsinin surəti banka gedir və hər surət sahibinin bir daha heç görmədiyi bir serverdə yaşamağa başlayır. Hər bank, işəgötürən və universitet eyni yoxlamanı yenidən qurur; sənədin həqiqi olub-olmaması isə surətin nə qədər inandırıcı göründüyündən asılı qalır.

Yeni model bunu tərsinə çevirir. Sənəd şəxsdə qalır, yalnız lazım olan sübut paylaşılır və yoxlayan tərəf mənbəyə müraciət etmək əvəzinə kriptoqrafik imzanı yoxlayır. Bu sənədin qalan hissəsi Tamga-nın bu modeli Türkiyə və türk dünyası üçün necə qurduğunu izah edir; arxa plan #link("https://tamga.network/az/learn/paper-to-digital")[niyə yeni model] səhifəsindədir.

= Vizyon: eIDAS 2.0-dan türk dünyasına

eIDAS 2.0 ilə Aİ-nin hər üzv dövləti öz vətəndaşlarına Avropa Rəqəmsal Şəxsiyyət Cüzdanı təqdim etməlidir. Arxasındakı arxitektura (ARF) və sabitlədiyi profillər Aİ-dən çox-çox kənarda rəqəmsal etibarın ortaq dilinə çevrilir, çünki bu profillər üzərində qurulan cüzdanlar, sənəd verənlər və yoxlayan tərəflər bir-biri ilə danışa bilir.

Türk dünyası ortaq bir dil ailəsini, mədəniyyəti və uzun bir tarixi paylaşır. Bir dövlətdə verilmiş diplom digərində yoxlana bilməli, bir qurumun kimliyinə sərhədin o tayında da etibar edilə bilməlidir. Tamga bu ortaq zəmini eyni standartlar üzərində qurur və hər dövləti öz qeydiyyatının suvereni kimi saxlayan idarəetmə qatı əlavə edir.

Tamga hər biri müstəqil dayana bilən üç qat üzərində qurulub. Təməldə sənədlər, protokollar və etibar siyahıları Aİ standartlarına uyğundur; buna görə başqa yerdən gələn uyğun cüzdan və ya yoxlayan tərəf Tamga qurumu ilə işləyə bilir. Onun üstündə Tamga Network yüngül federasiyadır: hər dövlətin etibar siyahısını toplayır və dövlətlərin bir-birini tanımasını təmin edir. Bu gün Türkiyənin siyahısını Tamga müvəqqəti olaraq dərc edir; bir dövlət öz siyahısını dərc etdikdə şəbəkə onu göstərir. Şəbəkənin üstündə isə onun qaydalarına uyan cüzdanlar və xidmətlər işləyir. Şəbəkə öz cüzdanını idarə etmir. Cüzdan provayderlərini etibar siyahısında sıralayır və dərc olunmuş qaydalara uyan hər provayder siyahıya daxil ola bilər. Siyahıya daxil olan ilk cüzdan Tamga Wallet-dir; öz provayder xidməti olan ayrıca məhsuldur və qeydi 2026-cı il 14 oktyabrdan bəri siyahıda aktivdir. Tamga Wallet Aİ ilə uyğundur; “EUDI Wallet” adı isə Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı cüzdanlar üçün ayrılmışdır. Şəbəkə heç nə satmır. Qaydaları, etibar siyahılarını, açıq kodu və Qurum Konsolu, Tamga Verify kimi istinad xidmətlərini idarə edir; kommersiya xidmətlərini şəbəkədən kənar şirkətlər təqdim edir.

= Prinsiplər

- *Əvvəlcə suverenlik.* Hər dövlət öz qeydiyyatının yeganə müəllifidir; şəbəkəyə üzvlük üçdə iki səslə qərara alınır; sərhədlərarası tanınma hər dövlətin birtərəfli qərarıdır.
- *Heç bir ortaq qeyddə fərdi məlumat yoxdur.* Siyahılar, jurnallar və reyestr fərdi məlumat daşımır, hətta hash-ini belə daşımır.
- *Uyğun, amma müstəqil.* Aİ-nin texniki qatı olduğu kimi istifadə olunur; idarəetmə qatı türk dünyası üçün yazılır.
- *Bir neçə dövlət üçün.* Heç bir identifikator, rol və ya məlumat strukturu Tamga-nı yeganə operator kimi nəzərdə tutmur. Tamga hər yerdə qeydə alınmış müvəqqəti əvəzedicidir.
- *Reyestr saxlama seçimi deyil, imzalayanların seçimidir.* Bu gün imzalı siyahılar; müstəqil operatorlar birlikdə imzaladıqda reyestr.
- *İstisnasız cihaz bağlılığı.* Sənədin hər nüsxəsi şəxsin cihazındakı bir açara bağlıdır; buna görə nüsxə təkrar istifadə edilə bilməz.
- *Təhvil verilmək üçün dizayn.* Hər müvəqqəti səlahiyyətin ölçülə bilən təhvil nöqtəsi var; şəbəkənin idarəsinin bir fonda təhvili indidən yazılıb və məşq edilib.

= Rollar

Aİ arxitekturasının hər rolu Tamga-da mövcuddur. Dövlət hələ qoşulmayıbsa, rolu Tamga müvəqqəti və qeydə alınmış şəkildə öz üzərinə götürür: etibar siyahısı operatoru, qeydiyyat orqanı və “TR National Root CA (müvəqqəti operator: Tamga)”. Qurumlar sənəd provayderləridir. İşəgötürənlər, vebsaytlar və giriş qapıları qeydiyyatdan keçmiş yoxlayan tərəflərdir; hər birinin təşkilatı və dəstək ünvanını göstərən giriş sertifikatı var və bu sertifikat ETSI TS 119 411-8 profilinə uyğundur. PID provayderinin yeri bir dövlət onu doldurana qədər boş qalır. O vaxta qədər şəxsiyyət sənədi şəxsin şəxsiyyət sənədini və canlılığını yoxlayan Tamga şəxsiyyət xidmətindən gəlir; bu sənəd dövlət PID-i sayılmır, attestasiya sənədidir və dövlətin PID-i gəldikdə onun yerini alır. Şəbəkə cüzdan seçmir, cüzdanları sıralayır. Hər cüzdan öz cüzdan provayderini idarə edir; provayder cüzdan vahidlərini qeydə alır və cüzdan ilə açar attestasiyalarını verir. Şəbəkə heç birini idarə etmir. Bu gün Türkiyə siyahısında yeganə aktiv sənəd verən müvəqqəti şəxsiyyət xidmətidir; demolarda istifadə olunan test qurumları ləğv edilib, ilk real qurum hazırlanır. Hələ validator operatoru yoxdur, buna görə reyestr də yoxdur. Yan-yana cədvəl #link("https://tamga.network/az/learn/roles")[rollar və terminlər] səhifəsindədir.

#chapter()
= Etibar modeli: imzalı etibar siyahıları

İmza kimin imzaladığını sübut edir. Etibar siyahısı isə imzalayanın real qurum olub-olmadığını, hansı sənəd növlərini nə vaxtdan verə bildiyini və cari vəziyyətini bildirir. Tamga-nın siyahıları imzalı JWS fayllarıdır; versiyalı və hash zəncirlidir, yəni hər versiya özündən əvvəlkini göstərir. Heç bir versiya silinmir və hər biri növbəti yenilənmə tarixini daşıyır. Yoxlayan tərəf siyahının imzalayanını ayrıca kanalla dərc edilmiş kök barmaq izi ilə müqayisə edir. Hər siyahı versiyası, hər ləğv siyahısı dərci və hər sxem dəyişikliyi həmçinin ən azı saatda bir dəfə hamıya açıq lövbər jurnalına yazılır; beləliklə geri çevrilmiş siyahı aşkar edilir. Ətraflı #link("https://tamga.network/az/learn/trust-lists")[etibar siyahıları] səhifəsindədir.

#kvtable("Dərc edilən fayllar — trust.tamga.network", (("lotl.jws", "siyahıların siyahısı: milli siyahılar, xarici siyahılar, sxemlər, cüzdan provayderləri, qəbul edilmiş ZK sxemləri"), ("tl-tr.jws", "Türkiyə: kök sertifikat mərkəzləri, səlahiyyətləri ilə birlikdə sənəd verən qurumlar, yoxlayan tərəflər, cüzdan provayderləri"), ("tl-<cc>.jws", "digər hər üzv dövlət (AZ, KZ, KG, UZ) və müşahidəçilər (HU, TM) üçün ayrılmış yer; bu gün yalnız TR aktivdir"), ("anchors.jsonl", "lövbər jurnalı: hər hadisə üçün imzalı bir sətir, ən azı saatda bir dəfə"), ("keys/", "kök barmaq izləri (ayrıca kanalla dərc edilən etibar lövbəri)"), ("archive/", "keçmiş hər versiya, heç vaxt silinmir"),), mono: false)

İdentifikatorlar əl ilə təyin edilmir, sertifikatlardan və növ adlarından törədilir; buna görə təhvil zamanı da, reyestr gəldikdə də dəyişmir:

#kvtable("İdentifikatorlar", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(qurum sertifikatı))"), ("vct", "urn:tamga:<sahə>:<Növ>:<əsas versiya>, məs. urn:tamga:edu:DiplomaCredential:1 (şəbəkə növü)"), ("vct (milli)", "urn:tamga:<cc>:<sahə>:<Növ>:<əsas versiya>; bir dövlətin öz ad sahəsində qeydə aldığı növ"), ("schema_id", "keccak256(vct)"), ("şəxs", "identifikator yoxdur; sənədin hər nüsxəsi üçün bir cihaz açarı"),), mono: true)

*Federasiya.* Siyahıların siyahısı başqa operatorun dərc etdiyi siyahını da göstərə bilər: bir dövlətin, onun səlahiyyət verdiyi qurumun və ya Aİ-nin siyahısını. Hər biri üçün ünvanını, Tamga-nın öz imzalı siyahılar siyahısında sabitlənmiş imzalayanını və hansı rollara və sənəd növlərinə zəmanət verə biləcəyini bildirən əhatə dairəsini qeydə alır. Siyahı sahibində qalır. Bir dövlət öz siyahısını dərc etdikdə cüzdan və yoxlayan tərəf üçün yalnız ünvan və imzalayan dəyişir. Oxunan ilk xarici format ETSI TS 119 602-dir; beləliklə Tamga yoxlayıcısı Aİ şəxsiyyət sənədini (PID) və mobil sürücülük vəsiqəsini (mDL) də tanıya bilər. Bu gün siyahıların siyahısında xarici siyahı yoxdur; hər biri qeydə alınan razılıqla əlavə olunur. Sandbox Türkiyə siyahısını imzalı və imzalı siyahı ilə eyni versiyada ETSI TS 119 612 XML görünüşü kimi də dərc edir; real şəbəkənin XML siyahısı siyahını idarə edəcək fond yaradıldıqdan sonra gələcək. Bax: #link("https://tamga.network/az/learn/federation")[federasiya].

= Sənədlər: SD-JWT VC və mdoc

Əsas format SD-JWT VC-dir (IETF, #raw("dc+sd-jwt"), ES256). Hər sahə salted hash arxasında gizlidir və yalnız sənəd sahibinin razılığı ilə açılır. Başlıq qurumun X.509 zəncirini daşıyır, #raw("cnf") sahəsi nüsxəni cihazdakı açara bağlayır. Şəxsiyyət sənədi eyni sahib açarı ilə ISO 18013-5 mdoc kimi də verilir; beləliklə yalnız mdoc anlayan brauzer və ya yaş qapısı da ondan istifadə edə bilir. Hər iki format #raw("age_over_15") və #raw("age_over_18") yaş sahələrini daşıyır; bu sahələr verilmə anında doğum tarixindən törədilir və birini istəyən yoxlayan tərəf yalnız bəli və ya xeyr alır. Yaş hədləri toplusu qapalıdır və yalnız qeydə alınmış qərarla dəyişir. Sənəd növləri sabit URN-lərdir. Təsvirləri hamıya açıq kataloqda durur və hər sənəd öz təsvirinin hash-ini daşıyır; beləliklə cüzdan təsvirin dəyişdiyini anlayır. Üzv dövlətin qeydə aldığı milli növ öz ad sahəsindən istifadə edir (#raw("urn:tamga:<cc>:…")), buna görə milli ad şəbəkə miqyaslı adla heç vaxt toqquşmur. Bax: #link("https://tamga.network/az/learn/verifiable-credentials")[sənədlər].

#codeblock("SD-JWT VC formatında diplom (açılmış, qısaldılmış)", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-…\",
  \"iat\": 1790000000,
  \"cnf\": { \"jwk\": { … } },
  \"status\": { \"status_list\": {
    \"idx\": 48213,
    \"uri\": \"https://status.tamga.network/…\" } },
  \"_sd\": [ \"…\", \"…\" ]
}")

#kvtable("", (("cnf.jwk", "bu nüsxənin cihaz açarı"), ("_sd", "gizli sahələr, salted hash şəklində"), ("başlıq · x5c", "qurumun X.509 sertifikat zənciri"),), mono: false)

Milli şəxsiyyət nömrəsi yalnız şəxsiyyət sənədində və yalnız seçmə ilə açıqlanan sahə kimi olur. Heç bir diplom, kart və ya bilet onu daşımır.

= Sənədin verilməsi və təqdim edilməsi

- *Vermə (OpenID4VCI).* Qurum eyni ekranda QR kod və PIN göstərir; PIN heç vaxt keçidin içində göndərilmir. Və ya cüzdan qurumlar kataloqundan başlayır və şəxsiyyət sənədini təqdim edərək əvvəlcə şəxsin kimliyini sübut edir. Cüzdan hər biri fərqli cihaz açarına bağlı on nüsxə alır. Giriş tokeni beş dəqiqəlik ömrü ərzində bir neçə sənəd sorğusunda istifadə oluna bilər, lakin yalnız əhatə etdiyi sənəd konfiqurasiyaları üçün, cəmi on nüsxə ilə və həmişə eyni DPoP açarı ilə.
- *Yalnız real cüzdanlar.* Qurum sənədi verməzdən əvvəl cüzdan provayderinin verdiyi qısamüddətli cüzdan nüsxəsi attestasiyasını və açar attestasiyasını yoxlayır. Hər ikisi etibar siyahısındakı provayderdən gəlir, öz ləğv qeydini daşıyır və açarın necə saxlandığını bildirir.
- *Təqdimetmə (OpenID4VP, DCQL).* Yoxlayan tərəfin sorğusu onun qeydiyyat sertifikatı ilə imzalanır və qeydiyyat sertifikatını daşıyır. Cüzdan hər ikisini etibar siyahısı ilə yoxlayır, tam olaraq nəyin tələb olunduğunu göstərir və qeydiyyatdakı əhatə dairəsindən kənar hər şey barədə xəbərdarlıq edir. Yoxlayan tərəf seçimlər təklif edirsə (#raw("credential_sets"), #raw("claim_sets")), cüzdan onları seçim kimi göstərir. Tələb olunan sahəni daşımayan sənəd heç vaxt göndərilmir; cüzdan sorğunun niyə yerinə yetirilə bilmədiyini şəxsə bildirir. Cavab şifrələnir və yalnız təsdiqlənmiş sahələri və açarın bu telefonda olduğunun sübutunu daşıyır. Sorğunun hər çəkilişi yeni dəyərlərlə öz sorğu obyektini alır və imtina yalnız onu bağlayır; beləliklə QR kodu görən biri saxta imtina ilə şəxsin təqdimatını ləğv edə bilmir. Qeydiyyat sertifikatı öz siyasətini adlandırır və status siyahısına istinad edir; cüzdan ləğv edilmiş sertifikatı rədd edir, status yoxlana bilmirsə şəxsi xəbərdar edir.
- *Brauzerdən.* Vebsayt sənədi QR kod əvəzinə brauzerin Digital Credentials API-si ilə də istəyə bilər. İstinad yoxlayıcısı bunu təqdim edir, cüzdan nüvəsi isə ISO/IEC 18013-7 Əlavə C-dəki mdoc sorğusuna cavab verir. Tamga Wallet-də Android modulu yazılıb, lakin hələ cihazda sınaqdan keçirilməyib; iOS versiyası hələ yoxdur.
- *Vebsaytlar.* Sayt şəxsi cüzdanla bir dəfə, yalnız həmin sayta aid psevdonimlə qeydiyyata alır. Cüzdan psevdonimi saytın qeydiyyatdakı domen adından törədir; buna görə iki sayt şəxsi uyğunlaşdıra bilməz, yenilənən sertifikat psevdonimi dəyişdirmir və yeni telefonda kimlik yoxlandıqda eyni psevdonimlər geri qayıdır. Gündəlik giriş bundan sonra passkey ilə olur və heç bir sahə paylaşılmır. Bax: #link("https://tamga.network/az/learn/unlinkability")[Tamga ilə giriş].

= Yoxlama: beş addım, üç nəticə

Hər yoxlama eyni xətti eyni ardıcıllıqla icra edir və ilk xətada dayanır. Hər addımın daimi kodu var; buna görə rədd həmişə səbəbini bildirir.

#kvtable("Yoxlama xətti", (("T0", "sorğu və cavab bir-birinə aiddir (nonce, ünvanlanan tərəf, şifrələmə)"), ("A · format", "imza, sertifikat zənciri, cihaz sübutu, gizli sahələr pozulmayıb"), ("B · növ", "sənəd növü qeydiyyatdadır; təsvirin hash-i kataloqdakı ilə eynidir"), ("C · etibar", "qurum bu növ üçün verilmə tarixində səlahiyyətli idi; kateqoriya uyğundur"), ("D · status", "ləğv edilməyib və dayandırılmayıb; siyahı aktualdır və lövbərlənib"), ("E · siyasət", "tələb olunan sahələr var; yoxlayan tərəfin əhatə dairəsindən kənar heç nə yoxdur"), ("→ nəticə", "ACCEPTED (qəbul) · REJECTED (rədd, hansı addımda) · INDETERMINATE (yoxlanıla bilmədi)"),), mono: false)

INDETERMINATE (qeyri-müəyyən) heç vaxt REJECTED (rədd) kimi bildirilmir. Siyahıya çatmaq mümkün olmadıqda və ya siyahı aktual olmadıqda yoxlayan tərəf hazırda yoxlaya bilmədiyini bildirir, çünki “bu diplom saxtadır” ilə “yoxlaya bilmirəm” arasındakı fərq kiminsə işə götürülüb-götürülməməsinə qərar verə bilər. Səlahiyyət verilmə tarixinə görə qiymətləndirilir: universitet aktiv olarkən verilmiş diplom universitet dayandırıldıqdan sonra da etibarlı qalır, yeni sənəd verilməsi isə dərhal dayanır.

2026-cı ilin oktyabrında şəxsiyyət xidməti və Tamga Verify OpenID Foundation-ın uyğunluq test planlarını sandbox-da icra etdi: HAIP və FAPI 2.0 ilə OpenID4VCI (63 modul) və HAIP ilə OpenID4VP (14 modul). Sənəd verən planının son icrasında uğursuz modul qalmadı; yoxlayan tərəf planının son turunda nə uğursuz modul, nə də xəbərdarlıq var idi. Bu yoxlama icrası sorğunun işlənməsinin dəyişdiyi 29 oktyabrdan əvvəl olub (hər çəkiliş indi öz sorğusunu alır); plan o vaxtdan yenidən icra edilməyib. Bu işdən iyirmiyə yaxın dəyişiklik çıxdı, hər biri spesifikasiyanın bir maddəsinə əsaslanır və dördü əvvəlki qərarları qeydə alınmış ADR-lərlə dəyişdirdi. Bu Foundation-ın öz aləti ilə aparılan öz-sınaq idi; sertifikatlaşdırma ayrıca prosesdir. İlk tam icranın öyrətdikləri açıq mənbəli #link("https://github.com/tamga-network/oidf-conformance-kit")[oidf-conformance-kit] kimi dərc edilib; tam hekayə #link("https://tamga.network/az/blog/openid-conformance-self-test")[bloqdadır].

= Ləğv və həyat dövrü

Ləğv IETF Token Status List ilə həyata keçirilir. Sənədin hər nüsxəsinin siyahıda təsadüfi mövqedə status qeydi var. Şəxsiyyət xidmətinin siyahıları qeyd başına bir bit istifadə edir; sənəd etibarlıdır və ya ləğv edilib, dayandırma yoxdur. Qurum siyahıları iki bit istifadə edir və “dayandırılıb” dəyəri yalnız növün sxemi dayandırmaya icazə verdikdə görünür; bu gün bu növ diplomdur. Qurum siyahını tələb üzrə deyil, sabit intervalla dərc edir; beləliklə vaxt şəxs haqqında heç nə açıqlamır və hər dərc lövbərlənir. Yoxlayan tərəflər siyahıları əvvəlcədən yükləyir; sənədi yoxlamaq nə quruma, nə də telefona zəng edir. Siyahılar hər 2 dəqiqədən bir yenidən dərc olunur və hər biri 6 saat etibarlıdır: status serveri işləyərkən ləğv bir neçə dəqiqəyə yoxlayan tərəflərə çatır, qısa kəsinti isə yoxlamanı dayandırmır.

Nüsxələr dizayna görə tükənir. Sənəd yeniləmə tokeni ilə gəlibsə, cüzdan nüsxələri qurumun elan etdiyi həddə arxa planda yeniləyir və yeniləmə yeni məlumat paylaşmır. Yeniləmə tokeni tək bir daşıma açarına deyil, cüzdan nüsxəsinin attestasiya açarına bağlıdır; OAuth attestasiya profili bunu tələb edir və cüzdan beləliklə DPoP açarlarını dəyişsə də yeniləyə bilir. Şəxsiyyət sənədi təqdim edilərək yenilənən sənədlər isə şəxsin razılığını və PIN-ini tələb edir. Bax: #link("https://tamga.network/az/learn/revocation")[ləğv].

#chapter()
= Dizayndan gələn məxfilik

- *Hər yoxlayan tərəf üçün ayrı nüsxə.* Hər yoxlayan tərəf fərqli açara bağlı fərqli nüsxə alır; yoxlayan tərəflər aldıqlarını müqayisə edərək şəxsi uyğunlaşdıra bilməz. Verilmə və bitmə vaxtları saata yuvarlaqlaşdırılır, buna görə nüsxələr vaxt möhürü ilə də uyğunlaşdırıla bilməz.
- Defolt olaraq *seçici paylaşım*; sual əsas məlumat olmadan cavablandırıla bilirsə #raw("age_over_15") və #raw("age_over_18") kimi bəli/xeyr sahələri.
- *Şəxsiyyət yoxlaması təcrid olunub.* Şəxsiyyəti təsdiqləyən provayderlə yalnız şəxsiyyət xidməti əlaqə saxlayır. Sənədi verdikdən sonra foto saxlamır; yalnız qeyri-şəffaf qeyd (şəxs istinadı və sənəd nömrəsinin hash-i) saxlayır. Qurumlar şəxsi provayder vasitəsilə deyil, şəxsiyyət sənədi vasitəsilə uyğunlaşdırır.
- *Jurnallarda və hamıya açıq ünvanlarda fərdi məlumat yoxdur.* Ləğv siyahısı ünvanları qurumu açıqlamır; jurnallar nə baş verdiyini yazır, kimin başına gəldiyini heç vaxt yazmır.
- *Vebsaytlar* hesab açarı kimi sayta xas psevdonim alır. Nə şəxsiyyət sənədinin nömrəsi, nə də onun hash-i heç vaxt göndərilmir; psevdonimlərin törədildiyi toxum cüzdana ayrıca sənəd kimi çatır və serverdə saxlanmır.

#notebox[Açıq bildirilən qalıq risk: bir qurum bir neçə yoxlayan tərəflə əməkdaşlıq edərsə, verdiyi imzalar vasitəsilə şəxsi yenə də uyğunlaşdıra bilər. Sıfır bilik sübutu ilə təqdimetmə bu boşluğu aradan qaldırır; cüzdan tərəfində mağaza versiyasından sonra gəlir (sıfır bilik sübutu bölməsinə bax).]

= Yaxın məsafə: keçid kartları və yaş yoxlaması

Turniket və tədbir girişləri üçün Tamga keçid kartından istifadə edir. Şəxs standart təqdimetmə ilə bir dəfə qeydiyyatdan keçir; sonra cüzdan 60 saniyəlik imzalı tokeni QR kod kimi göstərir. Tokendə fərdi məlumat yoxdur, təkrar istifadə rədd edilir və bilet birdəfəlik ola bilər. 2026-cı ilin oktyabrından bəri hər qapı özünü yoxlama xidmətinə operatorun verdiyi terminal açarı ilə təqdim edir; beləliklə QR kodun şəklini çəkən şəxs bileti sahibi qapıya çatmazdan əvvəl xərcləyə bilməz. Qapılar etibar siyahısında dərc olunan qruplara aiddir; hər qrup qapıları idarə edən qurumu və qəbul edə biləcəkləri keçid kartlarını göstərir. Qrupu siyahıdan çıxan və ya siyahısı köhnə olan qapı rədd edilir. Şəxsdən şəxsə yoxlamada rollar tərsinə dönür: cüzdan qısamüddətli sorğu ünvanı göstərir, yoxlayanın tətbiqi standart OpenID4VP sorğusu başladır. Hər ikisi versiyalı körpüdür. Hədəf Bluetooth və NFC üzərindən ISO 18013-5-dir; Bluetooth yolu cüzdanda kodlaşdırılıb və cihaz testlərini gözləyir.

#chapter()
= Siyahılardan reyestrə

Reyestr yalnız bir neçə müstəqil tərəf onu idarə etdikdə fayda verir. Buna görə Tamga siyahılarla başlayır və QBFT konsensuslu icazəli Hyperledger Besu şəbəkəsini yalnız ən azı iki müstəqil validator operatoru yazılı razılıq verdikdə əlavə edir. Həmin şəbəkənin müqavilələri yazılıb, kompilyasiya edilib və test olunub; siyahı naşiri siyahı hash-lərini lokal inkişaf zəncirinə artıq göndərə bilir. Qərara görə zəncir imzalı siyahıların proyeksiyasıdır: yalnız hər siyahı versiyasının hash-ini (versiya, məzmun hash-i, əvvəlki hash, dərc vaxtı) və lövbər jurnalının son sətrinin hash-ini qeydə alır. Məzmun, qeyd, sənəd və ya fərdi məlumat saxlamır. Hash yalnız hədd sayda müstəqil yazıcı eyni dəyəri göndərdikdə təsdiqlənmiş sayılır; yazıcılar bir versiya barədə razılaşmasa, ilk gələnin dəyəri kilidlənmir, ziddiyyət qeydə alınır. Zəncirin cavabı yoxlama üçün heç vaxt tələb olunmur; imzalı siyahı ilə ziddiyyət təşkil etdikdə siyahı etibarlıdır. İstehsalatda bu funksiya ikinci müstəqil operator meydana çıxana qədər söndürülmüş qalır.

Reyestrdəki idarəetmə prinsipləri izləyir. Validatorlar bərabər səsli dövlətlərdir; yeni üzvlər üçdə iki səslə qoşulur; hər dövlət öz qurumlarını təkbaşına qeydiyyata alır və ya dayandırır və hansı xarici qurumları tanıyacağına özü qərar verir. Protokol yeniləməsi həddə çatdıqdan sonra ən azı yeddi gün gözləyir; beləliklə razı olmayan dövlət qüvvəyə minməzdən əvvəl çıxa bilər. Milli sxem adları öz ad sahəsində durur, qurum yalnız öz dövlətinin kök sertifikatına bağlana bilər və reyestrdəki status siyahısı qeydiyyatı hər siyahını öz bit sayı ilə qəbul edir. Keçiddən əvvəl siyahı tarixçəsi müqavilələrə yenidən oynadılır və hər ikisinin eyni cavabları verməsi lazımdır. Komponentlər etibarı tək bir interfeys vasitəsilə oxuyur; buna görə sənədlər, cüzdanlar və yoxlama xətti dəyişmir. Bax: #link("https://tamga.network/az/learn/what-is-blockchain")[blockchain nədir, nə deyil].

= Sıfır bilik sübutu və tədqiqat istiqamətləri

*Sıfır bilik sübutu ilə təqdimetmə (qərar qəbul edilib, qismən qurulub).* Cüzdan qurumun imzaladığı və heç dəyişməyən mdoc haqqında “18 yaşdan yuxarı” və ya “15 yaşdan yuxarı” kimi ifadəni açıq mənbəli Longfellow ZK sistemi ilə sübut edir; Aİ-nin yaş yoxlaması üzrə işi də bu sistem üzərində qurulub. Yoxlayan tərəf yalnız ifadənin doğru olduğunu və sənədi hansı qurumun verdiyini öyrənir; iki təqdimat bir-birinə bağlana bilməz. Yalnız nəzərdən keçirilmiş və identifikatoru imzalı etibar siyahısında dərc edilmiş sxemlər qəbul edilir. Sübut status siyahısı mövqeyini açmadığı üçün ləğv sübutun içində yoxlanıla bilməz; buna görə sübut ən çox 24 saat etibarlı qısamüddətli nüsxə üzərindən aparılır və sənəd ləğv edildikdə şəxsiyyət xidməti bu nüsxəni yeniləməyi dayandırır. Yoxlayan tərəf hissəsi işləyir. Yerli sübut generatoru Android üçün kompilyasiya edilib və real sübutlar masaüstü generatorla test edilib; telefonda sübut yaratmaq mağaza versiyasından sonra gəlir, sübut mümkün olmadıqda adi təqdimetmə davam edir. Bax: #link("https://tamga.network/az/learn/zero-knowledge-proofs")[sıfır bilik sübutu].

*Tədqiqat istiqaməti: dəyər qatı.* Təsdiqlənmiş tərəflər arasında səlahiyyətləndirmə; pul hərəkəti tənzimlənən ödəniş sistemlərində qalır. İlk versiyanın və ya pilotun hissəsi deyil və hər hansı istifadədən əvvəl müstəqil təhlükəsizlik yoxlamasından keçəcək.

#chapter()
= Vəziyyət və yol xəritəsi

*Bu gün işləyən (ilk versiya, real kriptoqrafiya):* diplom və tələbə biletinin verilməsi və təqdim edilməsi; ləğv və qurumun dayandırılması; şəxsiyyət yoxlaması və iki yaş sahəsi daşıyan, mdoc kimi də verilən şəxsiyyət sənədi; kimliyi təsdiqlənmiş qapılarla kampus və tədbir keçid kartları, birdəfəlik biletlər; sayta xas psevdonimlə vebsaytda qeydiyyat və passkey ilə giriş; yoxlayan tərəfdə sıfır bilik sübutu ilə yaş yoxlaması; qurumun imza açarının qurumda qaldığı və xidmətin imzalamaq üçün quruma yalnız hash göndərdiyi hostinqli sənəd vermə xidməti (Cloud Signature Consortium API). Doqquz açıq mənbəli paket npm-də 0.7.4 sınaq buraxılışındadır; bu versiya saxta imtinadan qorumanı, qeydiyyat sertifikatının statusunu, etibar siyahısındakı keçid qruplarını və ETSI XML siyahı görünüşünü gətirir. Real şəbəkənin Türkiyə siyahısı işləyir və yeganə aktiv sənəd verəni şəxsiyyət xidmətidir; ilk real qurum, bir universitet, hazırlanır.

#kvtable("Mərhələlər", (("Siyahı mərhələsi (bu gün)", "imzalı etibar siyahıları və lövbər jurnalı · Tamga müvəqqəti operator · sandbox işləyir · paketlər npm-də sınaq buraxılışı · OpenID öz-sınağı aparılıb"), ("Pilot", "sənədi verən ilk qurum bir universitetdir · qurumun açarı qurumda qalır (uzaqdan imza) · cüzdanlar mağazalarda · real telefonlarda Bluetooth və Digital Credentials API · siyahılar var, reyestr yoxdur"), ("Təhvil", "şəbəkənin idarəsi bir fonda keçir; addım yazılıb və məşq edilib · identifikatorlar dəyişmir"), ("Faza 0", "ən azı 2 müstəqil validator operatoru imzaladıqda icazəli Besu/QBFT reyestri · müqavilələr yazılıb və test edilib; zəncir imzalı siyahıları əks etdirir"), ("Faza 1", "üzv dövlətlərin siyahıları · oxuyucunun autentifikasiyası ilə NFC üzərindən yaxın məsafə"),), mono: false)

İlk versiyanın məlum məhdudiyyətləri aşağıda qeydə alınıb və pilotdan əvvəl aradan qaldırılır. Pilotun uğur və dayandırma meyarları əvvəlcədən müəyyən edilib. Siyahıya daxil olan ilk cüzdan Tamga Wallet Android sınaq qurulumundadır; mağaza buraxılışları ilə Bluetooth və Digital Credentials API cihaz testləri cüzdan tərəfindəki növbəti addımlardır və şəbəkənin deyil, cüzdanın işidir.

Real şəbəkədən ayrı test şəbəkəsi, sandbox.tamga.network, 2026-cı ilin oktyabrından bəri işləyir: öz test kökü və siyahıları, nümunə qurumlar, saxta şəxslər və hər növdən nümunə sənədlər, sürətli sınaqla yanaşı gündəlik və aylıq limitli istəyə bağlı real şəxsiyyət yoxlaması, test qurumu hesabları və öz terminal açarları olan sınaq qapısı. Real şəbəkədəki heç bir cüzdan və ya yoxlayan tərəf ona etibar etmir. Cüzdan, qurum və yoxlayan tərəf tərtibatçılarının hamısı orada sınaqdan keçirir; cüzdan tərtibatçısı öz cüzdan provayderini sandbox siyahısında qeydə aldırır və cüzdanını nümunə qurumlar, şəxsiyyət xidməti və yoxlayıcı ilə sınayır. OpenID öz-sınağı da orada icra edildi; test alətinin sertifikatları yalnız sandbox siyahılarına əlavə olundu. Bax: #link("https://docs.tamga.network/guides/sandbox")[sandbox bələdçisi].

= Məlum məhdudiyyətlər

- Bu mərhələdə etibar lövbəri bir operatorun imzasına əsaslanır. Hamıya açıq lövbər jurnalı, şəffaflıq hesabatı və auditlər sui-istifadənin qarşısını alır; onu qeyri-mümkün edə bilmir. Bu məhdudiyyəti yalnız ikinci müstəqil siyahı yazıcısı, sonra isə reyestr aradan qaldırır.
- Status serveri işləyərkən ləğv bir neçə dəqiqəyə qüvvəyə minir (2 dəqiqəlik dərc intervalı ilə yoxlayan tərəfin əvvəlcədən yükləmə intervalı).
- Sıfır bilik sübutu ilə təqdim edilən sənədin ləğvi sübutun içində yoxlanıla bilməz. Qısamüddətli nüsxə bu boşluğu 24 saatla məhdudlaşdırır, aradan qaldırmır.
- Sıfır bilik sübutu ilə təqdimetmə cüzdana gələnə qədər qurum tərəfindən uyğunlaşdırma riski qalır.
- Şəxsiyyət xidməti nəzəri olaraq şəxsin müəyyən saytdakı psevdonimini hesablaya bilər. Açarın qorunması, ayrıca konfiqurasiya edilən toxum və audit bunu məhdudlaşdırır; sıfır bilik sübutu isə gələcəkdə aradan qaldırır.
- Cüzdan tətbiq mağazalarında dərc edilənə qədər telefonun “təhlükəsiz aparat təminatındayam” bəyanatı qəbul edilmir. Cüzdanın mağaza versiyası ilə App Attest və Play Integrity məcburi olur.
- OpenID uyğunluq icrası sandbox-da, hər planın tək bir variantı ilə aparılan öz-sınaq idi. Sertifikatlaşdırma ayrıca prosesdir; cüzdan planları cihaz qurulumu tələb etdiyi üçün icra edilməyib. Yoxlayan tərəf planı sorğunun işlənməsi 29 oktyabrda dəyişməzdən əvvəl icra edilib və yenidən icra edilməlidir.
- Hostinqli sənəd vermə xidmətinin uzaqdan imza yolu yazılıb və test edilib, lakin real şəbəkədə hələ heç bir qurum ondan istifadə etmir; real şəbəkə faylda saxlanan qurum açarını rədd edir.

= Qaydalar, açıq mənbə və ətraflı oxu

Şəbəkənin qaydaları Tamga ARF 1.0 kimi dərc edilir: əsas sənəd, Trust Framework, Tamga Rulebook və ondan hər sənəd növü üçün ayrılan rulebook-lar (Education, Identity və Event Ticket) #link("https://arf.tamga.network")[arf.tamga.network] ünvanındadır. Həmçinin bax: #link("https://tamga.network/az/learn/rules-and-rulebooks")[qaydalar və rulebook-lar].

Kod Apache-2.0, sənədlər CC BY 4.0 lisenziyası ilədir. #raw("@tamga-network/*") paketləri etibar siyahılarını, sənəd formatlarını, sənədin verilməsini, yoxlamanı, sıfır bilik sübutunu və cüzdan nüvəsini əhatə edir. İnteqrasiya bələdçiləri və spesifikasiyalar #link("https://docs.tamga.network")[tərtibatçı sənədlərindədir]; bu sənəddə istinad edilən hər qərar orada ADR kimi dərc olunub. Anlayışlar #link("https://tamga.network/az/learn")[Öyrən] bölməsində sıfırdan izah edilir; #link("https://docs.tamga.network/glossary")[lüğət] sürətli istinad, #link("https://tamga.network/az/manifesto")[manifest] isə “niyə” sualının cavabıdır.

#notebox[Bu canlı sənəddir. Elana qədər versiya 1.0-da qalır və qərarlar yetişdikcə yerində yenilənir; bu nəşr 29 oktyabr 2026 tarixlidir, ilk nəşr 3 oktyabr 2026-da dərc edilib. Daimi olan etibar modelidir.]

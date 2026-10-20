// Tamga Network — Whitepaper v1.0 (az). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-az.typ ../public/whitepaper-az.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "az",
  title: [Türkiyə və Türk Dünyası üçün \ Rəqəmsal Etibar İnfrastrukturu],
  subtitle: [Avropa İttifaqının (Aİ) EUDI profilləri əsasında suveren istinad arxitekturası — X.509 qurumlar, bu gün imzalı etibar siyahıları, müstəqil operatorlar qoşulduqda isə icazəli reyestr.],
  labels: (abstract: "İcmal", contents: "Mündəricat", version: "WHITEPAPER · VERSİYA 1.0"),
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network *Rəqəmsal Etibar İnfrastrukturudur*: qurumlar sənədləri — diplom, tələbə bileti, şəxsiyyət sənədi, bilet — şəxsin telefonuna verir, şəxs yalnız yoxlayan tərəfin ehtiyac duyduğu sahələri paylaşır, yoxlayan tərəf isə sənədi verən quruma müraciət etmədən onları saniyələr ərzində yoxlayır.

    Tamga Aİ-nin texniki qatını dəyişmədən istifadə edir: *SD-JWT VC* və *ISO 18013-5 mdoc* sənədləri, *OpenID4VCI/VP*, *X.509* qurumlar və ETSI modelində *imzalı etibar siyahıları*. Onun öz qatı türk dünyası üçün idarəetmədir: hər strukturda hər üzv dövlət üçün yer var və Tamga yalnız onların adından müvəqqəti operator kimi çıxış edir.

    Bu gün etibar hamıya açıq lövbər jurnalı ilə birlikdə versiyalı və hash zəncirli etibar siyahılarına əsaslanır; icazəli *Besu/QBFT* reyestri yalnız ən azı iki müstəqil operator qoşulduqda əlavə olunur. Siyahılara, jurnallara və ya reyestrə heç bir fərdi məlumat — hətta onun hash-i belə — yazılmır. Bütün axın bu gün real kriptoqrafiya ilə başdan sona işləyir; bu sənəd nəyin işlədiyini, nəyin planlaşdırıldığını və nəyin hələ tədqiqat mərhələsində olduğunu bildirir.

  ],
)

= Problem: “sənəd surəti” dövrünün sonu

Onilliklər boyu kim olduğumuzu surət təqdim edərək sübut etdik. Surətlər serverlərdə toplanır və nəzarətdən çıxır; hər bank, işəgötürən və universitet eyni yoxlamanı yenidən qurur; sənədin həqiqiliyi isə surətin inandırıcılığından asılı qalır.

Yeni model bunu tərsinə çevirir: sənəd şəxsdə qalır, yalnız lazım olan sübut paylaşılır və yoxlama mənbəyə müraciət etmədən kriptoqrafik üsulla aparılır. Bax: #link("https://tamga.network/az/learn/paper-to-digital")[niyə yeni model].

= Vizyon: eIDAS 2.0-dan türk dünyasına

*eIDAS 2.0* ilə Aİ-nin hər üzv dövləti öz vətəndaşlarına *Avropa Rəqəmsal Şəxsiyyət Cüzdanı* təqdim etməlidir. Bu cüzdanın arxitekturası (ARF) və profilləri rəqəmsal etibarın faktiki standartına çevrilir.

Türk dünyası dili, mədəniyyəti və tarixi paylaşır. Bir dövlətdə verilmiş diplom digərində yoxlana bilməli, bir qurumun kimliyinə sərhədlərin o tayında da etibar edilə bilməlidir. Tamga bu ortaq zəmini eyni standartlar üzərində, hər dövlətin suverenliyini qoruyan idarəetmə ilə qurur.

Tamga hər biri müstəqil dayana bilən üç qat üzərində qurulub. Təməl: sənədlər, protokollar və etibar siyahıları Aİ standartlarına uyğundur; beləliklə uyğun cüzdanlar və yoxlayan tərəflər Tamga-dakı qurumlarla işləyə bilər. Onun üstündə *Tamga Network* dayanır — hər dövlətin etibar siyahısını toplayan və dövlətlərin bir-birini tanımasını təmin edən yüngül federasiya. Bu gün Türkiyə siyahısını Tamga müvəqqəti olaraq dərc edir; dövlət öz siyahısını dərc etdikdə şəbəkə onu göstərir. Bu zəmində şəbəkənin ilk cüzdanı olan və ayrıca məhsul kimi inkişaf edən *Tamga Wallet* (Aİ ilə uyğundur; “EUDI Wallet” Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı cüzdanlara aid statusdur) və şəbəkənin qaydalarına əməl edən xidmət provayderləri işləyir; onlar şəbəkənin hissəsi deyil, iştirakçılarıdır. Şəbəkə heç nə satmır: qaydaları, etibar siyahılarını, açıq kodu və Kurum Konsolu, Tamga Verify kimi istinad xidmətlərini idarə edir; kommersiya xidmətlərini şəbəkədən kənar şirkətlər təqdim edir.

= Prinsiplər

- *Əvvəlcə suverenlik* — hər dövlət öz qeydiyyatının yeganə müəllifidir; şəbəkəyə üzvlük 2/3 səslə; sərhədlərarası tanınma hər dövlət tərəfindən birtərəfli müəyyən edilir.
- *Heç bir ortaq qeydiyyatda fərdi məlumat yoxdur* — nə siyahıda, nə jurnalda, nə də reyestrdə; hətta hash-i belə.
- *Uyğun, amma müstəqil* — Aİ-nin texniki qatı olduğu kimi; idarəetmə qatı türk dünyası üçün yazılır.
- *Bir neçə dövlət üçün* — heç bir identifikator və ya rol Tamga-nı yeganə operator kimi nəzərdə tutmur; Tamga hər yerdə müvəqqəti əvəzedicidir.
- *Reyestr saxlama yeri deyil, imzalayanların seçimidir* — bu gün siyahılar; müstəqil operatorlar qoşulduqda reyestr.
- *İstisnasız cihaz bağlılığı* — sənədin hər nüsxəsi cihazdakı bir açara bağlıdır; nüsxə təkrar istifadə edilə bilməz.
- *Təhvil verilmək üçün dizayn* — hər müvəqqəti səlahiyyətin ölçülə bilən təhvil nöqtəsi var.

= Rollar

Aİ arxitekturasının hər rolu Tamga-da mövcuddur. Dövlət hələ qoşulmayıbsa, rolu Tamga müvəqqəti və qeydə alınmış şəkildə öz üzərinə götürür: etibar siyahısı operatoru, qeydiyyat orqanı və “TR National Root CA (müvəqqəti operator: Tamga)”. Qurumlar sənəd provayderləridir; işəgötürənlər, vebsaytlar və giriş qapıları qeydiyyatdan keçmiş yoxlayan tərəflərdir. PID provayderi yeri bir dövlət onu doldurana qədər boşdur; bu müddətdə şəxsiyyət sənədi Tamga şəxsiyyət xidmətindən gəlir (sənəd və canlılıq yoxlaması). Şəbəkə cüzdanları seçmir, tanıyır: dərc edilmiş qaydalara əməl edən və uyğunluq testlərindən keçən hər cüzdan provayderi siyahıya daxil ola bilər; ilki Tamga Wallet-dır. Hər cüzdan öz cüzdan provayderini idarə edir; şəbəkə heç birini idarə etmir. Hələ validator operatoru yoxdur — buna görə reyestr də yoxdur. Yan-yana: #link("https://tamga.network/az/learn/roles")[rollar və terminlər].

#chapter()
= Etibar modeli: imzalı etibar siyahıları

İmza kimin imzaladığını sübut edir; *etibar siyahısı* isə imzalayanın real qurum olub-olmadığını, hansı sənəd növlərini nə vaxtdan verə biləcəyini və cari vəziyyətini bildirir. Siyahılar imzalı JWS fayllarıdır, *versiyalı və hash zəncirlidir*, silinmir və növbəti yenilənmə tarixini daşıyır; yoxlayan tərəf imzalayanı ayrıca kanalla dərc edilmiş kök barmaq izi ilə müqayisə edir. Hər ləğv siyahısı dərci və sxem dəyişikliyi əlavə olaraq ən azı saatda bir dəfə hamıya açıq *lövbər jurnalına* yazılır; beləliklə geri qaytarılmış siyahı aşkar edilir. Ətraflı: #link("https://tamga.network/az/learn/trust-lists")[etibar siyahıları].

#kvtable("Dərc edilən fayllar — trust.tamga.network", (("lotl.jws", "siyahıların siyahısı — milli siyahılar, xarici siyahılar, sxemlər, cüzdan provayderləri, qəbul edilmiş ZK sxemləri"), ("tl-tr.jws", "Türkiyə — kök sertifikat mərkəzləri, sənədi verən qurumlar (+ səlahiyyətlər), yoxlayan tərəflər"), ("tl-az · kz · kg · uz", "digər üzv dövlətlər üçün ayrılmış yerlər"), ("anchors.jsonl", "lövbər jurnalı — hər hadisə üçün imzalı bir sətir, ən azı saatda bir dəfə"), ("keys/", "kök barmaq izləri (ayrıca kanalla dərc edilən etibar lövbəri)"), ("archive/", "keçmiş hər versiya, heç vaxt silinmir"),), mono: false)

İdentifikatorlar təyin edilmir, törədilir; təhvil zamanı və ya reyestr gəldikdə dəyişmir:

#kvtable("İdentifikatorlar", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(qurum sertifikatı))"), ("vct", "urn:tamga:<sahə>:<Növ>:<əsas versiya> — məs. urn:tamga:edu:DiplomaCredential:1"), ("schema_id", "keccak256(vct)"), ("şəxs", "identifikator yoxdur — sənədin hər nüsxəsi üçün bir cihaz açarı"),), mono: true)

*Federasiya.* Siyahıların siyahısı başqa operatorun — bir dövlətin, onun səlahiyyət verdiyi qurumun və ya Aİ-nin — dərc etdiyi siyahını da göstərə bilər: onun ünvanını, Tamga-nın imzalı siyahılar siyahısında sabitlənmiş imzalayanını və hansı rollara və sənəd növlərinə zəmanət verə biləcəyini bildirən əhatə dairəsini. Siyahı sahibində qalır; dövlət öz siyahısını dərc etdikdə cüzdan və yoxlayan tərəf üçün yalnız ünvan və imzalayan dəyişir. İlk oxunan format ETSI TS 119 602-dir; beləliklə yoxlayan tərəf Aİ şəxsiyyət sənədini (PID) və mobil sürücülük vəsiqəsini (mDL) də tanıya bilər. Bu gün siyahılar siyahısında xarici siyahı yoxdur; hər biri qeydə alınan təsdiqlə əlavə edilir. Bax: #link("https://tamga.network/az/learn/federation")[federasiya].

= Sənədlər: SD-JWT VC və mdoc

Əsas format *SD-JWT VC*-dir (IETF, #raw("dc+sd-jwt"), ES256). Hər sahə salted hash arxasında gizlidir və yalnız sənəd sahibinin razılığı ilə açılır; başlıq qurumun X.509 zəncirini daşıyır; #raw("cnf") nüsxəni cihaz açarına bağlayır. Şəxsiyyət sənədi həmçinin *ISO 18013-5 mdoc* kimi verilir; beləliklə yaş yoxlaması #raw("age_over_18") sahəsini alır və başqa heç nə almır. Sənəd növləri sabit URN-lərdir; onların təsvirləri hamıya açıq kataloqda saxlanılır və hər sənəd öz təsvirinin hash-ini daşıyır. Bax: #link("https://tamga.network/az/learn/verifiable-credentials")[sənədlər].

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

Milli şəxsiyyət nömrəsi yalnız şəxsiyyət sənədində olur; heç bir diplom, kart və ya bilet onu daşımır.

= Sənədin verilməsi və təqdim edilməsi

- *Vermə (OpenID4VCI).* Qurum QR kod və eyni ekranda PIN göstərir — PIN heç vaxt keçidin içində göndərilmir. Və ya cüzdan qurumlar kataloqundan başlayır və əvvəlcə şəxsin kimliyini sübut edir. Cüzdan hər biri fərqli cihaz açarına bağlı *on nüsxə* alır.
- *Yalnız real cüzdanlar.* Qurumlar cüzdan provayderindən qısamüddətli *cüzdan attestasiyası* (WUA) tələb edir.
- *Təqdimetmə (OpenID4VP, DCQL).* Yoxlayan tərəfin sorğusu onun qeydiyyat sertifikatı ilə imzalanır. Cüzdan onu etibar siyahısı ilə yoxlayır, tam olaraq nəyin tələb olunduğunu göstərir və qeydiyyatdakı əhatə dairəsindən kənar hər şey barədə xəbərdarlıq edir. Yoxlayan tərəf seçimlər təklif edirsə (#raw("credential_sets"), #raw("claim_sets")), cüzdan onları seçim kimi göstərir; tələb olunan sahəni daşımayan sənəd heç vaxt göndərilmir və cüzdan sorğunun niyə yerinə yetirilə bilmədiyini şəxsə bildirir. Cavab şifrələnir; yalnız təsdiqlənmiş sahələri və açarın bu telefonda olduğunun sübutunu daşıyır.
- *Vebsaytlar.* Sayt şəxsi bir dəfə cüzdanla, həmin sayta xas psevdonimlə qeydiyyata alır: cüzdan hər sayt üçün ayrıca və sabit psevdonim törədir; iki sayt şəxsi uyğunlaşdıra bilməz, yeni telefonda kimlik yenidən təsdiqləndikdə eyni psevdonimlər geri qayıdır. Gündəlik giriş bundan sonra *passkey* ilə olur və heç bir sahə paylaşılmır. Bax: #link("https://tamga.network/az/learn/unlinkability")[Tamga ilə daxil olun].

= Yoxlama: beş səviyyə, üç nəticə

Hər yoxlama eyni xətti eyni ardıcıllıqla icra edir və ilk xətada dayanır. Hər addımın daimi kodu var; buna görə rədd həmişə səbəbini bildirir.

#kvtable("Yoxlama xətti", (("T0", "sorğu və cavab bir-birinə aiddir (nonce, ünvanlanan tərəf, şifrələmə)"), ("A · format", "imza, sertifikat zənciri, cihaz sübutu, gizli sahələr pozulmayıb"), ("B · növ", "sənəd növü qeydiyyatdadır; təsvirin hash-i kataloqdakı ilə eynidir"), ("C · etibar", "qurum bu növ üçün verilmə tarixində səlahiyyətli idi; kateqoriya uyğundur"), ("D · status", "ləğv edilməyib və dayandırılmayıb; siyahı aktualdır və lövbərlənib"), ("E · siyasət", "tələb olunan sahələr var; yoxlayan tərəfin əhatə dairəsindən kənar heç nə yoxdur"), ("→ nəticə", "ACCEPTED (qəbul) · REJECTED (rədd, hansı addımda) · INDETERMINATE (yoxlanıla bilmədi)"),), mono: false)

*INDETERMINATE* (qeyri-müəyyən) heç vaxt REJECTED (rədd) kimi bildirilmir. Siyahıya çatmaq mümkün olmadıqda və ya siyahı aktual olmadıqda yoxlayan tərəf “hazırda yoxlanıla bilmədi” deyir — “bu diplom saxtadır” ilə “yoxlaya bilmirəm” arasındakı fərq kiminsə işə götürülüb-götürülməməsidir. Səlahiyyət *verilmə tarixinə* görə qiymətləndirilir: universitet aktiv olarkən verilmiş diplom dayandırmadan sonra da etibarlı qalır, yeni sənədlərin verilməsi isə dərhal dayanır.

= Ləğv və həyat dövrü

Ləğv *IETF Token Status List* ilə həyata keçirilir: sənədin hər nüsxəsinin *təsadüfi* mövqedə status qeydi var. Şəxsiyyət xidmətinin sənədlərində bu qeyd bir bitdir — etibarlı və ya ləğv edilmiş, dayandırma yoxdur; qurum siyahıları iki bit istifadə edir və “dayandırılıb” dəyəri yalnız növün sxemi dayandırmaya icazə verdikdə görünür. Qurum siyahını *sabit intervalla* dərc edir, heç vaxt sorğu əsasında yox; beləliklə vaxt şəxs haqqında heç nə açmır; hər dərc lövbərlənir. Yoxlayan tərəflər siyahıları əvvəlcədən yükləyir; sənədin yoxlanılması nə quruma, nə də telefona müraciət etmir. Siyahılar hər 2 dəqiqədən bir yenidən dərc edilir və hər biri 6 saat etibarlıdır: status serveri işləyərkən ləğv bir neçə dəqiqəyə yoxlayan tərəflərə çatır, qısa fasilə isə yoxlamanı dayandırmır. Nüsxələr dizayn etibarilə tükənir; yeniləmə tokeni ilə verilən sənədlərdə cüzdan qurumun elan etdiyi həddə yeni nüsxələri arxa planda avtomatik alır və yeniləmə heç bir yeni məlumat paylaşmır. Şəxsiyyət sənədi təqdim edilərək yenilənən sənədlər isə şəxsin razılığı və PIN-i ilə yenilənir. Bax: #link("https://tamga.network/az/learn/revocation")[ləğv].

#chapter()
= Dizayndan gələn məxfilik

- *Hər yoxlayan tərəf üçün ayrı nüsxə.* Hər yoxlayan tərəf fərqli açara bağlı fərqli nüsxə alır; yoxlayan tərəflər aldıqlarını müqayisə edərək şəxsi uyğunlaşdıra bilməz.
- Defolt olaraq *seçici paylaşım*; format icazə verdikdə #raw("age_over_18") kimi predikatlar.
- *Şəxsiyyət yoxlaması təcrid olunub.* Şəxsiyyəti təsdiqləyən provayderlə yalnız şəxsiyyət xidməti əlaqə saxlayır; sənədi verdikdən sonra foto saxlamır, yalnız qeyri-şəffaf və hash-lənmiş qeyd (şəxs istinadı və sənəd nömrəsinin hash-i) saxlayır. Qurumlar şəxsi provayder vasitəsilə deyil, şəxsiyyət sənədi vasitəsilə uyğunlaşdırır.
- *Jurnallarda və hamıya açıq ünvanlarda fərdi məlumat yoxdur.* Ləğv siyahısı ünvanları qurumu açıqlamır; jurnallar nə baş verdiyini yazır, kimin başına gəldiyini heç vaxt yazmır.
- *Vebsaytlar* hesab açarı kimi sayta xas psevdonim alır; nə şəxsiyyət sənədinin nömrəsi, nə də onun hash-i göndərilir; saytlar şəxsi uyğunlaşdıra bilməz.

#notebox[Açıq bildirilən qalıq risk: eyni qurum bir neçə yoxlayan tərəflə əməkdaşlıq edərsə, şəxsi yenə də uyğunlaşdıra bilər. Sıfır bilik sübutu ilə təqdimetmə bunu aradan qaldırır; cüzdan tərəfində mağaza versiyasından sonra gəlir (aşağıda sıfır bilik sübutuna bax).]

= Yaxın məsafə: keçid kartları və yaş yoxlaması

Turniket və tədbir girişləri üçün Tamga *keçid kartından* istifadə edir: standart təqdimetmə ilə bir dəfə qeydiyyat, sonra QR kimi göstərilən 60 saniyəlik imzalı token — tokendə fərdi məlumat yoxdur, təkrar istifadə rədd edilir və biletlər birdəfəlik ola bilər. Şəxsdən şəxsə yoxlamada OpenID4VP tərsinə başladılır: yoxlayanın tətbiqi standart sorğu başladır. Hər ikisi versiyalı keçid həllidir; hədəf NFC/BLE üzərindən ISO 18013-5-dir.

#chapter()
= Siyahılardan reyestrə

Reyestr yalnız bir neçə müstəqil tərəf onu idarə etdikdə fayda verir. Buna görə Tamga siyahılarla başlayır və *QBFT* konsensuslu (consensus) icazəli *Hyperledger Besu* şəbəkəsini yalnız ən azı iki müstəqil validator operatoru yazılı razılıq verdikdə əlavə edir. Hər siyahı sahəsi müqavilə qeydinə uyğunlaşdırılır; siyahı tarixçəsi müqavilələrdə yenidən icra edilir və hər ikisinin eyni cavabı verdiyi test olunur. Komponentlər etibarı vahid interfeys vasitəsilə oxuyur; sənədlər, cüzdanlar və yoxlama xətti dəyişmir. Bax: #link("https://tamga.network/az/learn/what-is-blockchain")[blokçeyn nədir — və nə deyil].

Reyestrdəki idarəetmə prinsipləri izləyir: validatorlar bərabər səsli dövlətlərdir; yeni üzvlər 2/3 səslə; hər dövlət öz qurumlarını təkbaşına qeydiyyata alır və ya dayandırır; xarici qurumların tanınmasına hər dövlət özü qərar verir.

= Sıfır bilik sübutu və tədqiqat istiqamətləri

*Sıfır bilik sübutu ilə təqdimetmə (qərar qəbul edilib).* Cüzdan qurumun imzaladığı və heç dəyişməyən mdoc haqqında “18 yaşdan yuxarıyam” kimi faktı açıq mənbəli Longfellow ZK sistemi ilə sübut edir — Avropanın yaş yoxlaması üzrə işləri də bu sistem üzərində qurulub. Yoxlayan tərəf yalnız ifadənin doğru olduğunu və sənədi hansı qurumun verdiyini görür; iki təqdimat bir-biri ilə əlaqələndirilə bilməz. Yalnız yoxlanılmış və identifikatoru imzalı etibar siyahısında dərc edilmiş sübut sxemləri qəbul edilir. Yoxlayan tərəf hissəsi hazırdır; telefonda sübutun yaradılması mağaza versiyasından sonra gəlir; sübut yaradıla bilmədikdə adi təqdimetmə davam edir. Bax: #link("https://tamga.network/az/learn/zero-knowledge-proofs")[sıfır bilik sübutu].

*Tədqiqat istiqaməti: dəyər qatı.* Təsdiqlənmiş tərəflər arasında səlahiyyətləndirmə; pul hərəkəti tənzimlənən ödəniş sistemlərində qalır. İlk versiyanın və ya pilotun hissəsi deyil; hər hansı istifadədən əvvəl müstəqil təhlükəsizlik yoxlamasından keçəcək.

#chapter()
= Vəziyyət və yol xəritəsi

*Bu gün işləyən (ilk versiya, real kriptoqrafiya):* diplom və tələbə biletinin verilməsi və təqdim edilməsi; ləğv və qurumun dayandırılması; şəxsiyyət yoxlaması və şəxsiyyət sənədi, həm də mdoc kimi; kampus və tədbir keçid kartları, birdəfəlik biletlər; sayta xas psevdonimlə vebsaytda qeydiyyat və passkey ilə giriş; yoxlayan tərəfdə sıfır bilik sübutu ilə yaş yoxlaması; doqquz açıq mənbəli paket. Telefonda sınaqdan keçirilib.

#kvtable("Mərhələlər", (("Siyahı mərhələsi (bu gün)", "imzalı etibar siyahıları + lövbər jurnalı · Tamga = müvəqqəti operator"), ("Pilot", "sənədi verən ilk qurum bir universitetdir · qurumun açarı universitetdədir · real telefonlarda Bluetooth və Digital Credentials API · siyahılar var, reyestr yoxdur"), ("Faza 0", "ən azı 2 müstəqil validator operatoru imzaladıqda icazəli Besu/QBFT reyestri"), ("Faza 1", "üzv dövlətlərin siyahıları · oxuyucunun autentifikasiyası ilə NFC üzərindən yaxın məsafə"),), mono: false)

İlk versiyanın məlum məhdudiyyətləri qeydə alınıb və pilotdan əvvəl aradan qaldırılır. Pilotun uğur və dayandırma meyarları əvvəlcədən müəyyən edilib.

Real şəbəkədən tamamilə ayrı test şəbəkəsi — *sandbox.tamga.network* — işləyir: öz test kökü və siyahıları, nümunə qurumlar, saxta şəxslər və hər növdən nümunə sənədlər, sürətli sınaqla yanaşı istəyə bağlı real şəxsiyyət yoxlaması (gündəlik və aylıq limitlə) və test qurumu hesabları. Real şəbəkədəki heç bir cüzdan və ya yoxlayan tərəf ona etibar etmir. Cüzdan, qurum və yoxlayan tərəf tərtibatçılarının hamısı orada sınaq aparır: cüzdan tərtibatçısı öz cüzdan provayderini sandbox siyahısında qeydiyyata aldırır və cüzdanını nümunə qurumlar, şəxsiyyət xidməti və yoxlayan tərəflə sınaqdan keçirir. Bax: #link("https://docs.tamga.network/guides/sandbox")[sandbox bələdçisi].

= Məlum məhdudiyyətlər

- Bu mərhələdə etibar lövbəri bir operatorun imzasına əsaslanır. Hamıya açıq jurnal, şəffaflıq hesabatı və audit sui-istifadənin qarşısını alır, lakin onu qeyri-mümkün etmir.
- Status serveri işləyərkən ləğv bir neçə dəqiqəyə qüvvəyə minir (2 dəqiqəlik dərc intervalı \+ yoxlayan tərəfin əvvəlcədən yükləmə intervalı).
- Sıfır bilik sübutu ilə təqdim edilən şəxsiyyət sənədinin ləğvi təqdimetmə zamanı yoxlanıla bilməz. Bunun əvəzinə sübut ən çox 24 saat etibarlı olan və sənəd ləğv edildikdə yenilənməyən qısamüddətli nüsxə üzərindən aparılır (ADR-0044, tətbiq edilib): ləğv belə təqdimata ən gec 24 saata əks olunur.
- Sıfır bilik sübutu ilə təqdimetmə cüzdana gələnə qədər qurum tərəfindən uyğunlaşdırma riski qalır.
- Şəxsiyyət xidməti nəzəri olaraq şəxsin müəyyən saytdakı psevdonimini hesablaya bilər; açarın qorunması və audit bunu məhdudlaşdırır, sıfır bilik sübutu isə gələcəkdə aradan qaldırır.
- Şəbəkədəki cüzdanlar (ilki Tamga Wallet) tətbiq mağazalarında dərc edilənə qədər telefonun “təhlükəsiz aparat təminatındayam” bəyanatı qəbul edilmir; cüzdanın mağaza versiyası ilə App Attest / Play Integrity məcburi olur.

= Qaydalar, açıq mənbə və ətraflı oxu

Şəbəkənin qaydaları *Tamga ARF 1.0* kimi dərc edilir: əsas sənəd, Trust Framework, *Tamga Rulebook* və ondan hər sənəd növü üçün ayrılan rulebook-lar — Education, Identity və Event Ticket — #link("https://arf.tamga.network")[arf.tamga.network] ünvanındadır. Həmçinin bax: #link("https://tamga.network/az/learn/rules-and-rulebooks")[qaydalar və rulebook-lar].

Kod Apache-2.0, sənədlər CC BY 4.0 lisenziyası ilədir. #raw("@tamga-network/*") paketləri etibar siyahılarını, sənəd formatlarını, sənədin verilməsini, yoxlamanı və cüzdan nüvəsini əhatə edir; inteqrasiya bələdçiləri və spesifikasiyalar #link("https://docs.tamga.network")[tərtibatçı sənədlərindədir]. Anlayışlar #link("https://tamga.network/az/learn")[Öyrən] bölməsində sıfırdan izah edilir; #link("https://docs.tamga.network/glossary")[lüğət] tez müraciət üçündür, #link("https://tamga.network/az/manifesto")[manifest] isə “niyə” sualının cavabıdır.

#notebox[Bu canlı sənəddir (v1.0). Qərarlar yetişdikcə dəyişir; daimi olan etibar modelidir.]

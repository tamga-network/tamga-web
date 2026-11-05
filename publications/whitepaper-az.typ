// WP-AZ — Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "az")
#let sekil = sekil.with(dil: "az")

#show: conf.with(
  lang: "az",
  dizi: "Tamga Network Whitepaper",
  baslik: "Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu",
  altbaslik: "Genişləndirilmiş nəşr: necə işləyir, niyə belə seçilib, hara gedir",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "Noyabr 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. Bu əsər Creative Commons Attribution 4.0 International (CC BY 4.0) lisenziyası ilə nəşr olunub: mənbə göstərilməklə paylaşıla və uyğunlaşdırıla bilər. https://creativecommons.org/licenses/by/4.0/deed.az",
  anahtar: ("rəqəmsal etibar infrastrukturu", "etibar siyahıları", "eIDAS 2.0", "EUDI ARF", "SD-JWT VC", "mdoc", "OpenID4VCI", "OpenID4VP", "seçici paylaşım", "əlaqələndirilməzlik", "suverenlik", "Türk dünyası",),
  atif: "Tamga Network (2026). Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu. Whitepaper, versiya 1.0. https://tamga.network/whitepaper-az.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Tamga Network Türkiyə və Türk dünyası üçün layihələndirilmiş, Avropa İttifaqının rəqəmsal şəxsiyyət sistemi ilə eyni texniki dildə danışan etibar şəbəkəsidir. Şəbəkədə sənədi qurum verir, şəxs onu telefonundakı cüzdanda daşıyır və kimə göstərəcəyinə özü qərar verir, yoxlayan tərəf isə sənədi verən quruma müraciət etmədən onu bir neçə saniyədə yoxlayır. Sənədlər Aİ-nin seçdiyi açıq standartlarla kodlaşdırılır (SD-JWT VC və ISO\/IEC 18013-5 mdoc); vermə və təqdimetmə OpenID4VCI və OpenID4VP profilləri ilə aparılır; hər sənəd cihazın təhlükəsiz aparat təminatındakı bir açara bağlıdır və şəxs yalnız tələb olunan sahələri göstərir. Etibarın mənbəyi bu gün hər kəsin yükləyib yoxlaya bildiyi imzalı etibar siyahıları və saatbasaat irəliləyən lövbər jurnalıdır. Ortaq reyestrin kodu yazılıb və test edilib; lakin o, istehsalatda yoxdur, söndürülüb və ən azı iki müstəqil operator olmadan işə salınmır. Ortaq qeydlərin heç birində fərdi məlumat yoxdur.

Sənəd bu strukturun necə işlədiyini, hər mühüm seçimin niyə edildiyini və şəbəkənin hara getdiyini iyirmi dörd bölmədə izah edir. Etibar siyahıları, qurum sertifikatları, sənəd formatları, vermə və təqdimetmə axınları, yoxlama xətti, ləğv, cüzdan qaydaları, müvəqqəti şəxsiyyət xidməti, məxfilik mühəndisliyi və təhdid modeli bir-bir açılır; hər seçim onu bağlayan qərar qeydi və nəzərdən keçirilmiş alternativlərlə birlikdə verilir. Suverenlik dizaynın əvvəldən qoyduğu şərtdir. Hər dövlət öz qeydiyyatının yeganə müəllifidir və bu gün dövlət adından müvəqqəti icra edilən hər rol heç bir sənədi, qurum identifikatorunu və ya sənəd növünü dəyişdirmədən təhvil verilə biləcək şəkildə qurulub. Bu gün siyahılarda yalnız Türkiyə üçün yer aktivdir; digər dövlətlər üçün yalnız yer ayrılıb.

Mətn hər iddianın vəziyyətini açıq deyir: işləyən, qərarı qəbul edilmiş, lakin hələ canlı olmayan və tədqiqat mərhələsində olan funksiyalar bir-birindən ayrılır, yol xəritəsi təqvimlə deyil, şərtlərlə verilir. Son bölmələr qərarların hamısını, bəyan edilmiş qalıq riskləri və açıq sualları bir yerdə təqdim edir. Sənəd hüquqi rəy və ya sertifikat iddiası deyil, heç bir dövlət və ya qurumla bağlanmış razılaşma barədə bildiriş də deyil.
  ],
)

#heading(level: 1, numbering: none)[Oxu bələdçisi]

Bu sənəd Tamga Network-ü əvvəldən sona izah edir: necə işlədiyini, hər mühüm seçimin niyə edildiyini və şəbəkənin hara getdiyini. Hər kəsin hər bölməni oxuması lazım deyil. Dövlət idarəçisinin axtardığı ilə cüzdan tərtibatçısının axtardığı fərqlidir; Cədvəl 1 hər oxucu qrupu üçün qısa yol təklif edir. Bu təklif məhdudiyyət deyil. Bölmələr bir-birinə bölmə nömrəsi ilə istinad edir və oxucu anlayışı ilk dəfə gördüyü yerdən geriyə və ya irəliyə keçə bilər.

#kutu("onemli", [Bu sənəd nə deyil])[
Bu sənəd hüquqi rəy deyil; KVKK \[9\], eIDAS və ya başqa qanunvericilik barədə cümlələri hüquqşünasın qiymətləndirməsini əvəz etmir. Sertifikat iddiası da daşımır; Tamga-nın uyğunluq testləri öz-sınaqdır və heç bir qurumun təsdiqi demək deyil. Heç bir dövlət və ya qurumla bağlanmış razılaşma və ya davam edən danışıqlar barədə bildiriş deyil; mətndə adı çəkilən dövlətlər üçün siyahılarda yalnız yer ayrılıb. Sənəd canlı mətndir və 1.0 versiyası daxilində yerində yenilənir. Mənbə sənədlərlə ziddiyyət olarsa, mənbə qüvvədədir: əvvəlcə qərar qeydləri, sonra spesifikasiyalar, sonra çərçivə sənədləri.
]

#tablo([#{strong[Cədvəl 1.]} Oxucu qruplarına görə tövsiyə olunan oxu yolları.], (31fr, 46fr, 19fr), ([Oxucu], [Nə axtarır], [Tövsiyə olunan bölmələr],), (
  ([Dövlət idarəçisi, tənzimləyici, dövlət nümayəndəsi], [suverenlik, təhvil, Aİ ilə münasibət, hüquqi hədd], [1–4, 18, 20, 22–23],),
  ([Qurum (universitet, peşə təşkilatı, bilet satıcısı)], [necə qoşuluram, qoşulmağın faydası nədir, imza açarı kimdə qalır], [1–2, 5, 7–9, 12, 17],),
  ([Yoxlayan tərəf, vebsayt], [necə yoxlayıram, nəyi görürəm, öhdəliyim nədir], [5, 10–11, 15],),
  ([Cüzdan tərtibatçısı], [siyahıya necə daxil oluram, hansı sübutlar tələb olunur, qaydalar nədir], [5, 13, 17, 20],),
  ([Akademik, tədqiqatçı, təhlükəsizlik mütəxəssisi], [modelin əsaslandırılması, təhdidlər, qalıq risklər], [3, 6, 11, 15–16, 19, 21, 23],),
  ([Jurnalist, geniş oxucu], [nə həll olunur, niyə vacibdir], [Xülasə, 1–2, 4, 15, 24],),
))

Sənəddəki hər iddia üç vəziyyətdən birinə aiddir və mətn bunu hər yerdə açıq deyir. Funksiyanın adının yanında qalın şriftlə yazılmış vəziyyət etiketi görsəniz, onu Cədvəl 2-dəki mənada oxuyun. Bütün funksiyaların vəziyyəti Bölmə 22-də tək cədvəldə toplanır.

#tablo([#{strong[Cədvəl 2.]} Vəziyyət etiketləri.], (19fr, 42fr, 45fr), ([Etiket​​​​​​​​​], [Mənası], [Nümunə],), (
  ([#{strong[İşləyir]}], [Real şəbəkədə və ya sandbox-da canlıdır və mənbə ilə göstərilə bilər], [imzalı etibar siyahıları, Tamga Verify, sandbox],),
  ([#{strong[Planlaşdırılıb]}], [Qərara bağlıdır, kodu və ya dizaynı var, lakin canlı deyil], [Bluetooth ilə yaxın məsafədən təqdimetmə, real şəbəkədə XML etibar siyahısı],),
  ([#{strong[Tədqiqat]}], [Qərar yoxdur və ya qərar dayandırılıb], [sıfır bilik sübutu ilə psevdonim törətmə, dəyər qatı],),
))

Qərarlar qərar qeydləri (ADR, #{emph[Architecture Decision Record]}), texniki qaydalar spesifikasiyalar (SPEC), çərçivə qaydaları isə Tamga Arxitektura və İstinad Çərçivəsinin sənədləri (FW) ilə istinad olunur. Mətndə "ADR-0042" gördüyünüz yerdə qərarın tam mətni #{raw("docs.tamga.network/tr/adr/")} altında, "SPEC-TRUST-0001 §5" gördüyünüz yerdə spesifikasiyanın müvafiq bölməsi #{raw("docs.tamga.network/tr/specifications/")} altında, "FW-ARF-0001 §6.1" gördüyünüz yerdə çərçivə sənədi #{raw("arf.tamga.network/tr/")} altındadır. İdentifikatorların ünvan uyğunluğu Əlavə E-dədir \[63, 64, 65\]. İdentifikatorlar daimidir: sənədin başlığı və ya yeri dəyişsə də, identifikatoru eyni qalır.

Bu nəşrin hazırlandığı tarixdə Tamga-nın açıq paketləri npm-də 0.8.2 sınaq versiyası ilə dərc olunub; çərçivə sənədləri 1.0 versiyasındadır. Versiyaya bağlı hər cümlə bu tarixə görə yazılıb.

= Giriş: Surətdən Sübuta

== Bir müraciət səhnəsi

Bu silsilənin ilk yazısında \[67\] Bakıda bakalavr təhsilini bitirib İstanbulda magistratura oxumaq istəyən Aynurla tanış olmuşduq. Aynur indi məzun olub və İstanbulda bir şirkətin elanına müraciət edir. Elan aydındır: namizəddən diplom, qiymət cədvəli və şəxsiyyət sənədi tələb olunur. Şirkətin işə qəbul üzrə məsul şəxsi Timur müraciətlər arasında Aynurun CV-sini bəyənir və onu müsahibəyə dəvət edir.

Müsahibədən əvvəl sənədlər gəlir. Aynur diplomunun skan edilmiş surətini e-poçtla göndərir; Timur Azərbaycan dilindəki mətni oxuya bilmədiyi üçün notarial təsdiqli tərcümə istəyir. Aynur tərcümə bürosu tapır, notariusa növbə alır, bir neçə gün və müəyyən qədər pul xərcləyir. Nəticədə Timurun əlində iki kağız var: diplomun surəti və həmin surətin tərcüməsi. Lakin Timurun əsas sualı hələ də cavabsızdır. Bu diplom həqiqidirmi?

Timur bunu öyrənmək üçün Bakıdakı universitetin tələbə işləri şöbəsinə e-poçt yazır. E-poçt bir müddət gözləyir; bəlkə doğru şəxsə çatır, bəlkə çatmır. Cavab gəlsə, həftələr sonra gəlir; gəlməsə, Timur ya surətə etibar etmək, ya da namizədi itirmək arasında seçim edir. Bu arada Aynurun diplomu, şəxsiyyət vəsiqəsinin surəti və qiymət cədvəli şirkətin işə qəbul qovluğunda, e-poçt serverində və bəlkə də namizəd izləmə sistemində qalır. Aynur bu surətlərin harada, nə qədər müddətə və kimin girişi ilə saxlandığını heç vaxt öyrənməyəcək.

Bu səhnədə heç kəs pis niyyətli deyil. Aynur dürüstdür, Timur diqqətlidir, universitet köməyə hazırdır. Problem sənədlərin daşındığı yoldadır. Kağız dünyasından miras aldığımız qayda üç şeyi eyni anda pis edir. Surət əslinin həqiqi olduğunu sübut etmir, çünki faylı redaktə etmək möhürü saxtalaşdırmaqdan qat-qat asandır. Yoxlama mənbənin cavab verməsindən asılıdır; mənbə ləngdirsə, başqa dildə danışırsa və ya heç cavab vermirsə, yoxlama da dayanır. Və hər müraciət şəxsin məlumatının daha bir surətini yaradır: Timur diplomdakı yalnız bir neçə məlumata ehtiyac duyduğu halda sənədin hamısını, üstəlik şəxsiyyət vəsiqəsi ilə birlikdə alır.

== Tamga-nın qısa cavabı

Eyni müraciəti Tamga Network-ün layihələndirdiyi yolla da izləyək (Şəkil 1).

Aynurun universiteti diplomu #{strong[rəqəmsal imzalı sənəd]} kimi verir və bu sənəd Aynurun telefonundakı #{strong[cüzdana]}, yəni sənədləri saxlayan və göstərən tətbiqə yerləşir. Bu sənəd adi fayldan fərqlidir: onun içi universitetin açarı ilə imzalanıb və Aynurun telefonunun təhlükəsiz aparat təminatında yaradılmış bir açara bağlıdır. Bu bağ sənədin başqa telefona köçürülüb orada istifadə edilməsinin qarşısını alır (Bölmə 8).

Timurun şirkəti Aynurdan sənəd istədikdə şirkətin saytı #{strong[sorğu]} yaradır. Sorğu imzalıdır və şirkətin kim olduğunu, qeydiyyatdakı məqsədini və hansı sahələri istədiyini daşıyır: tutaq ki, "diplomun dərəcəsi, ixtisası və məzuniyyət ili". Aynurun cüzdanı əvvəlcə şirkətin həqiqətən qeydiyyatlı yoxlayan tərəf olub-olmadığını yoxlayır, sonra sorğunu Aynura göstərir: kim istəyir, niyə istəyir, hansı sahələri istəyir. Aynur PIN kodu və ya barmaq izi ilə təsdiqləyir. Telefonundan yalnız bu üç sahə çıxır; orta bal, doğum tarixi və ya şəxsiyyət nömrəsi çıxmır.

Timurun yoxlama proqramı bir neçə saniyə ərzində dörd suala cavab axtarır. Sənəd həqiqətən imzalanıbmı və imzadan sonra heç nə dəyişməyibmi? İmzalayan həqiqətən universitetdirmi və diplom verməyə səlahiyyəti varmı; sənəd verildiyi gün səlahiyyətli idimi? Universitet bu sənədi sonradan ləğv edibmi? Sənədi təqdim edən telefon sənədin bağlı olduğu telefondurmu? Bu sualların heç biri üçün universitetə zəng etməyə ehtiyac yoxdur. İkinci sualın cavabı hər kəsin yükləyib yoxlaya bildiyi #{strong[imzalı etibar siyahısında]}, üçüncüsünün cavabı isə universitetin əvvəlcədən dərc etdiyi #{strong[ləğv siyahısında]} durur (Bölmə 6 və 12). Universitet də Aynurun diplomunu kimə, nə vaxt göstərdiyini öyrənmir.

#kutu("teknik", [Eyni səhnənin protokol dilində xülasəsi])[
Aşağıdakı cədvəl səhnədəki mesajları ardıcıllıqla göstərir. Təfərrüatları Bölmə 10 (təqdimetmə) və Bölmə 11 (yoxlama xətti) izah edir; burada yalnız skeleti veririk.

#adimlar((
  ("Timur → Aynur", [#{strong[Sorğu.]} Şirkətin yoxlayıcısı imzalı OpenID4VP sorğusu yaradır; sorğu QR kod və ya keçid kimi Aynura çatır.], $"müştəri identifikatoru" = "x509_hash"$),
  ("Aynurun cüzdanı", [#{strong[Yoxlama və təsdiq.]} Cüzdan yoxlayan tərəfin etibar siyahısındakı qeydini və qeydiyyat sertifikatını yoxlayır, tələb olunan sahələri göstərir, təsdiq alır.], $"qeydiyyat sertifikatı yoxdur" => "rədd"$),
  ("Aynur → Timur", [#{strong[Cavab.]} Cüzdan yalnız təsdiqlənmiş sahələri və bu sorğuya bağlı cihaz imzasını şifrələnmiş şəkildə göndərir.], $"vp_token" = "SD-JWT VC" + "açıqlanan sahələr" + "cihaz imzası"$),
  ("Timurun yoxlayıcısı", [#{strong[Yoxlama xətti.]} İmza, sənəd növü, etibar siyahısı, ləğv vəziyyəti və siyasət ardıcıllıqla yoxlanılır.], $"nəticə" in {"qəbul", "rədd", "yoxlanıla bilmədi"}$),
))

Cədvəldəki terminlərin hər biri ilk keçdiyi bölmələrdə açılır: OpenID4VP \[31\] Bölmə 3.4 və 10-da, qeydiyyat sertifikatı Bölmə 7.5-də, SD-JWT VC \[16\] Bölmə 8-də, üç dəyərli nəticə Bölmə 11-də.
]

Bu səhnənin bir dizaynı təsvir etdiyini açıq demək lazımdır. Tamga Network-ün strukturunda hər ölkənin öz etibar siyahısı üçün yer var, lakin bu gün yalnız Türkiyə siyahısı aktivdir. Azərbaycan üçün siyahılarda yalnız yer ayrılıb; bu, razılaşma və ya danışıqlar barədə bildiriş deyil, yalnız bir dövlət qoşulduqda öz siyahısını dərc edə biləcəyi boş yerdir. Aynurun Bakıdakı universitetinin bu yolla sənəd verə bilməsi üçün həmin yerin dolması lazımdır (Bölmə 6.2). Türkiyə siyahısında da bu nəşrin hazırlandığı tarixdə yeganə aktiv sənəd verən şəbəkənin müvəqqəti şəxsiyyət xidmətidir (Bölmə 14); qurum sənədləri ilk qurumlar qoşulduqca eyni yolla veriləcək. Axının bütünü bu gün sandbox-da, yəni real şəbəkədən tamamilə ayrı test şəbəkəsində, nümunə qurumlarla sınaqdan keçirilə bilər (Bölmə 17). Hansı funksiyanın bu gün işlədiyi Bölmə 22-də bir-bir göstərilir.

#sekil(1, [Köhnə yol və yeni yol: surətlər zənciri və mənbəyə müraciət etmədən yoxlama], "figures/wp-az/sekil-1.svg", yarim: false)

== Bu sənədin töhfəsi və planı

Tamga Network-ü əvvəllər qısa whitepaper ilə \[62\] təqdim etmişdik; bu genişləndirilmiş nəşr onu əvəz edir. Manifest və tərtibatçı sənədləri onun yanında qalır. Bu nəşr üç suala birlikdə və ətraflı cavab vermək üçün yazılıb.

Birinci sual #{strong[necə işlədiyidir]}. Sənədin verilməsindən yoxlanmasına, ləğvindən cüzdandakı həyatına qədər hər addımı heç bir ilkin bilik fərz etmədən izah edirik. Texniki təfərrüatı buraxmırıq, lakin onu ayrıca qutulara yerləşdiririk; qutuları ötürən oxucu da mətni izləyə bilər. İkinci sual #{strong[niyə belə seçildiyidir]}. Şəbəkənin hər mühüm qərarı bir qərar qeydinə bağlıdır və bu qeydlər nəyin seçildiyi ilə yanaşı hansı variantların niyə kənara qoyulduğunu da yazır. Sənəd boyu bir seçimi izah edərkən onun qərar qeydini və alternativlərini birlikdə veririk. Üçüncü sual #{strong[hara getdiyidir]}. Bu gün nəyin işlədiyini, nəyin qərara alınıb hələ canlı olmadığını və nəyin hələ də tədqiqat olduğunu ayırırıq; təqvim əvəzinə şərt veririk.

Sənəd altı hissədən ibarətdir. #{strong[I Hissə]} (Bölmə 1–4) problemi, Avropa İttifaqının bu problemə verdiyi cavabı və Tamga-nın dizayn prinsiplərini izah edir. #{strong[II Hissə]} (Bölmə 5–8) etibarın strukturunu qurur: rollar, etibar siyahıları, qurum sertifikatları və sənəd formatları. #{strong[III Hissə]} (Bölmə 9–12) axınları izləyir: sənədin verilməsi, təqdimetmə, yoxlama və ləğv. #{strong[IV Hissə]} (Bölmə 13–16) şəxsin tərəfinə keçir: cüzdan qaydaları, müvəqqəti şəxsiyyət xidməti, məxfilik mühəndisliyi və təhlükəsizlik modeli. #{strong[V Hissə]} (Bölmə 17–20) ekosistemi və idarəetməni izah edir: sandbox və açıq paketlər, suverenlik və təhvil, ortaq reyestrin niyə bu gün olmadığı və Aİ ilə münasibət. #{strong[VI Hissə]} (Bölmə 21–24) qərarları bir yerdə təqdim edir, yol xəritəsini və açıq sualları verir. Əlavələr lüğəti, qərarlar göstəricisini, standartlar göstəricisini və sənədlər toplusu göstəricisini ehtiva edir.

Bu sənədi dərc edən şəbəkə həm də yazılar silsiləsi dərc edir. Seçici paylaşım, əlaqələndirilməzlik, etibar siyahıları və ya ləğv kimi bir anlayışı bütün dərinliyi ilə öyrənmək istəyən oxucuya mətndə silsilənin müvafiq yazısını göstəririk; burada anlayışı yalnız Tamga-nı anlamaq üçün kifayət edəcək qədər açırıq.

== Ad: tamğa

Orta Asiyanın türk boyları sürülərinə, əşyalarına və qayalara #{emph[tamğa]} adlanan işarələr vururdu. Atın sağrısındakı tamğa sahibini tanımayan birinə belə atın hansı boya aid olduğunu deyirdi. Silsilənin ilk yazısı bu işarənin daşıdığı ideyanı ətraflı izah edir: icmada hamının tanıdığı işarə sənə tanımadığın biri haqqında etibarlı məlumat verir.

Yoxlanıla bilən rəqəmsal sənəd bu ideyanın müasir qarşılığıdır, lakin iki məqamda ondan fərqlənir. Birincisi, qədim tamğanı saxtalaşdırmaq mümkün idi; rəqəmsal imza isə imzalayanın gizli açarı olmadan yaradıla bilməz. İkincisi, tamğanı tanımaq üçün onu əvvəlcədən bilmək lazım idi; rəqəmsal dünyada isə hansı işarənin kimə aid olduğunu deyən imzalı siyahı var və bu siyahı hamıya açıqdır. Şəbəkənin adı bu iki ideyanı birləşdirir: hər kəsin tanıya bildiyi möhür və həmin möhürün kimə aid olduğunu deyən, hər kəsin yoxlaya bildiyi qeyd.

= Problem Sahəsi və Tələblər

== Surət iqtisadiyyatının bədəli

Aynurun müraciətindəki problem tək bir şəxsin bəxtsizliyi deyil; sənədlərin surət kimi dolaşdığı qaydanın adi nəticəsidir. Bu qaydanın bədəlini heç kim tək bir hesab-fakturada görmür, amma hər kəs onun bir hissəsini ödəyir. Bu bölmədə bədəli kimin nəyi ödədiyi üzərindən izah edirik və rəqəm vermirik, çünki etibarlı və müqayisə edilə bilən rəqəm vermək bu sənədin əhatəsini aşır, mənbəsiz statistika yazmamağı isə prinsip kimi qəbul edirik.

İlk bədəl #{strong[saxtakarlıqdır]}. Diplomun skan edilmiş surəti şəkil redaktoru ilə bir neçə dəqiqəyə dəyişdirilə bilər. Surəti alan tərəf əslini görmədikcə bunu sezə bilməz. Saxtakarlıq nə qədər asandırsa, dürüst namizədə olan etibar da bir o qədər azalır: Timur Aynurun diplomunun həqiqi olduğuna inansa belə, bunu sübut edə bilmir.

İkinci bədəl #{strong[təkrarlanan yoxlamadır]}. Aynurun diplomu işəgötürəndə, bankda, magistratura proqramında və təqaüd müraciətində ayrı-ayrılıqda yoxlanılır. Hər qurum eyni sualı sıfırdan verir və eyni qeyri-müəyyənliklə yaşayır. Yoxlamanın bir dəfə aparılıb hamının ondan yararlana biləcəyi infrastruktur yoxdur.

Üçüncü bədəl #{strong[məlumatın sahibindən qopmasıdır]}. Hər müraciət şəxsin məlumatının bir surətini şəxsin görə bilmədiyi bir serverdə qoyur. Şəxs bu surətin nə vaxt silinəcəyini, kimlərin görəcəyini və ya məlumat sızması zamanı hara gedəcəyini bilmir. Sənədi sübut etmək üçün şəxs sənədin hamısını verir, halbuki qarşı tərəfə çox vaxt yalnız bir-iki məlumat lazımdır.

Dördüncü bədəl #{strong[mənbənin üzərindəki yükdür]}. Universitetlərin tələbə işləri şöbələri məzunlarının sənədləri barədə gələn e-poçtlara, zənglərə və rəsmi məktublara cavab verir. Bu iş nə qədər çoxdursa, mənbənin cavabı bir o qədər gecikir; cavab nə qədər gecikirsə, surətə etibar etmək təzyiqi bir o qədər artır.

== Sərhəddə ilişən etibar

Bu bədəllər sərhəd keçildikdə qat-qat artır. Türk dünyası ortaq dil ailəsini, mədəniyyəti və uzun tarixi bölüşür; tələbələr, işçilər və ailələr bu ölkələr arasında getdikcə daha çox hərəkət edir. Lakin bir ölkənin qurumuna digərində etibar etməyin bu gün qısa yolu yoxdur. İstanbuldakı işəgötürən Bakıdakı universitetin həqiqətən universitet olduğunu haradan biləcək? Daşkənddəki xəstəxana Qazaxıstanda verilmiş peşə sənədinin hələ də etibarlı olub-olmadığını necə öyrənəcək?

Bu gün bu sualların cavabı əsasən kağız və vasitəçilərlə verilir: tərcümələr, notarial təsdiqlər, təsdiq zəncirləri, qurumdan quruma yazışmalar. Hər vasitəçi gecikmə və xərc əlavə edir, lakin heç biri əsas suala, yəni "bu sənədi imzalayan həqiqətən səlahiyyətli qurumdurmu?" sualına riyazi cavab vermir. Tamga-nın Trust Framework-ü öz baxışını bu boşluğa görə yazır: Türk Dövlətləri Təşkilatının üzv və müşahidəçi dövlətlərinin, onların qurumlarının və vətəndaşlarının bir-birinin sənədlərini mənbəyə müraciət etmədən yoxlaya bildiyi ortaq etibar infrastrukturu (FW-TF-0001 §1.1). Bu cümlə hədəfdir; bu gün heç bir dövlət şəbəkəyə qoşulmayıb və bu sənəd heç bir dövlətlə razılaşma və ya danışıqlar barədə bildiriş vermir. Problem sahəsini təsvir edərkən ölkə adlarından problemin gündəlik üzünü konkretləşdirmək üçün istifadə edirik.

== Məxfiliyin ikinci problemi

Surəti imzalı rəqəmsal sənədlə əvəz etmək birinci problemi həll edir, lakin diqqətlə layihələndirilməsə, yeni problem yaradır. Rəqəmsal yoxlama kağızın heç vaxt bacarmadığı şəkildə #{strong[iz qoya bilər]}. Bu izlərin dörd növü var və hər biri ayrıca dizayn tədbiri tələb edir.

Birincisi, yoxlayan tərəf hər yoxlamada sənədi verənə müraciət edərsə, sənədi verən qurum şəxsin sənədini harada və nə vaxt istifadə etdiyini öyrənir. Bu, rəqəmsal şəxsiyyət ədəbiyyatında "evə zəng etmə" adlanan problemdir. İkincisi, yoxlayan tərəf ehtiyacından artığını istəyə bilər: yaşınızı yoxlamaq istəyən sayt doğum tarixinizi, adınızı və ünvanınızı birlikdə ala bilər. Üçüncüsü, fərqli yoxlayan tərəflər aldıqları məlumatları birləşdirərsə, bir-birindən xəbərsiz sanılan ziyarətlərdə şəxs eyni şəxs kimi uyğunlaşdırıla bilər; eyni sənəd hər dəfə eyni imza və eyni identifikatorla təqdim edilirsə, bu uyğunlaşdırma asanlaşır. Dördüncüsü, ortaq qeydlər (siyahılar, jurnallar, mümkün reyestr) fərdi məlumat və ya sənəd hash-i daşıyarsa, bu qeydlər hər kəsin oxuya bildiyi izləmə alətinə çevrilir.

Bu dörd iz silsilənin seçici paylaşım və əlaqələndirilməzlik yazılarının \[68, 70\] mövzusudur. Tamga-nın əsas çərçivə sənədi bunlara qarşı yeddi tədbir sayır (FW-ARF-0001 §7.2): ortaq qeydlərdə fərdi məlumatın olmaması, hər yoxlayan tərəfə ayrıca nüsxə və sayt üçün ayrıca psevdonim, sıfır bilik sübutu, sabit intervalla dərc edilən ləğv siyahıları, hər təqdimatda razılıq və həddindən artıq tələb barədə xəbərdarlıq, şəxsiyyətin təsdiqində təsvirlərin saxlanmaması və istifadə statistikasının yalnız ən azı əlli nəfərlik qruplar şəklində dərc edilməsi. Bunlar Bölmə 15-də bir-bir izah olunur. Burada yalnız bunu vurğulayırıq: məxfilik sonradan əlavə edilən xüsusiyyət ola bilməz. Hansı məlumatın hansı qeydə düşəcəyi arxitekturanın ilk gündən verdiyi qərardır.

== Suverenlik sualı

Dünya daşına bilən rəqəmsal sənədlərə keçərkən ölkənin qarşısında təxminən iki yol var. Birincisi, bu transformasiyanı kənardan almaqdır: başqa ölkənin və ya şirkətin infrastrukturundan, qaydalarından və açarlarından istifadə etmək. İkincisi, eyni açıq standartlar üzərində öz infrastrukturunu qurmaq və açarlarını öz əlində saxlamaqdır. Tamga ikinci yolu seçir və bunu manifestində "eyni standartlar, öz şəbəkəmiz" deyə ümumiləşdirir.

Lakin "öz şəbəkəmiz" demək tək bir hakimiyyət istəmək demək deyil. Bir neçə dövlətin qoşulacağı şəbəkədə əsas sual kimin nəyə qərar verəcəyidir. Tamga-nın idarəetmə qərarı bu sualı sadə bir nümunə ilə verir: dövlət öz universitetini sənəd verən kimi qeydiyyata alarkən niyə başqa dövlətin səsini gözləməlidir? (ADR-0002). Gözləməməlidir. Avropa İttifaqında da hər üzv dövlət öz etibar siyahısını müstəqil dərc edir və heç bir dövlət başqasının hansı qurumu siyahıya daxil edəcəyinə səs vermir. Tamga bu presedenti izləyir: hər dövlət öz qeydiyyatının yeganə müəllifidir, transsərhəd tanınma hər dövlətin öz qərarıdır və dövlətin şəbəkədən çıxması vətəndaşlarının sənədlərini etibarsız etmir. Bu prinsiplərin təfərrüatı Bölmə 18-dədir.

Suverenlik sualının bu günə baxan tərəfi də var. Bu gün heç bir dövlət şəbəkəyə qoşulmadığı üçün dövlətə aid rolları (etibar siyahısını idarə etmək, qurumları qeydiyyata almaq, kök sertifikatı saxlamaq) şəbəkənin müvəqqəti operatoru dövlət adından icra edir. Bu vəziyyət suverenlik prinsipinə zidd görünə bilər; buna görə hər müvəqqəti rolun necə təhvil veriləcəyi əvvəldən yazılır və təhvil zamanı heç bir sənədin, qeydin və ya identifikatorun dəyişməməsi dizaynın şərtinə çevrilir (Bölmə 4.1, P4 prinsipi).

== Tələblər

İndiyə qədər deyilənləri etibar şəbəkəsinin qarşılamalı olduğu on iki tələbə çevirə bilərik. Cədvəl 3 onları sıralayır və hər birinin bu sənəddə harada qarşılandığını göstərir. Sənədin qalan hissəsi bu cədvələ tez-tez qayıdır; dizayn seçimini izah edərkən onun hansı tələbi qarşıladığını deyirik.

#tablo([#{strong[Cədvəl 3.]} Tələblər və onların qarşılandığı bölmələr.], (11fr, 27fr, 48fr, 15fr), ([\#​​​​​​​​], [Tələb], [Səbəb], [Harada qarşılanır​​],), (
  ([G1], [Mənbəyə müraciət etmədən yoxlama], [Mənbənin yükü və gecikməsi; "evə zəng etmə"], [6, 11, 12],),
  ([G2], [Seçici paylaşım], [Yoxlayan tərəf yalnız ehtiyac duyduğunu görməlidir], [8, 10],),
  ([G3], [Əlaqələndirilməzlik], [Yoxlayan tərəflər şəxsi bir-birinə "danışa" bilməməlidir], [9\.5, 13, 15],),
  ([G4], [Fərdi məlumatsız ortaq qeyd], [Siyahılar və jurnallar izləmə alətinə çevrilməməlidir], [6, 12, 15.5, 19],),
  ([G5], [Cihaza bağlı sənəd], [Sənəd başqasının telefonunda istifadə edilə bilməməlidir], [8\.2, 13],),
  ([G6], [Ləğvin izlənmədən dərci], [Geri çəkmə şəxsin harada yoxlandığını üzə çıxarmamalıdır], [12],),
  ([G7], [Dövlət suverenliyi], [Hər dövlət öz qeydiyyatının yeganə müəllifi olmalıdır], [4\.1, 18],),
  ([G8], [Tək operator fərziyyəsinin olmaması və təhvil verilə bilmə], [Müvəqqəti rollar təhvil verilə bilməlidir; təhvildə identifikatorlar dəyişməməlidir], [4\.4, 6.7, 18.4],),
  ([G9], [Aİ standartları ilə birgə işləmə], [Eyni dildə danışan cüzdan və yoxlayan tərəflərlə işləyə bilmək], [3, 20],),
  ([G10], [Açıq kod və asılılığın olmaması], [Heç bir qurum tək istehsalçıdan asılı qalmamalıdır], [5\.3, 17],),
  ([G11], ["Yoxlanıla bilmədi" ilə "etibarsız"ın ayrılması], [Kəsinti dürüst sənədi saxta kimi göstərməməlidir], [11\.4],),
  ([G12], [Test şəbəkəsi və uyğunluq sübutu], [İştirakçılar real şəbəkəyə daxil olmadan sınaqdan keçirə bilməlidir; uyğunluq göstərilə bilməlidir], [16\.5, 17, 20.5],),
))

Cədvəlin bir xüsusiyyətinə diqqət çəkmək istəyirik. Tələblərin bir qismi bir-biri ilə gərginlik içindədir. Seçici paylaşım və əlaqələndirilməzlik (G2, G3) şəxsin mümkün qədər az iz qoymasını tələb edir; lakin yoxlayan tərəfin sənədi yoxlaya bilməsi üçün sənədin imzalı və ləğv edilə bilən olması, yəni haradasa izlənilə bilən struktur daşıması lazımdır (G1, G6). Suverenlik (G7) hər dövlətin öz qaydalarını qoymasını tələb edir; birgə işləmə (G9) isə hamının eyni qaydalarla danışmasını. Tamga dizaynının mühüm hissəsi bu gərginliklərin necə tarazlaşdırıldığını izah edir. Şəkil 2 maraqlı tərəfləri və onlar arasındakı əsas gərginlikləri bir yerdə göstərir.

#sekil(2, [Maraqlı tərəflər və gərginliklər], "figures/wp-az/sekil-2.svg", yarim: false)

= Arxa Plan: eIDAS 2.0, EUDI ARF və Açıq Standartlar

Tamga Network boşluqda layihələndirilməyib. Onun texniki qatı Avropa İttifaqının son on ildə qurduğu rəqəmsal şəxsiyyət sisteminin üzərində dayanır. Bu bölmə həmin sistemi Tamga-nı anlamaq üçün kifayət edəcək qədər izah edir. Aİ hüququnu bütün təfərrüatı ilə öyrənmək istəyən oxucu üçün silsilənin eIDAS 2.0 \[2\] yazısı ayrıca mənbədir.

== eIDAS-dan eIDAS 2.0-a

Avropa İttifaqının elektron identifikasiya və etibar xidmətləri haqqında reqlamenti, qısa adı ilə #{strong[eIDAS]}, 910\/2014 \[1\] nömrəsi ilə 2014-cü ildə qəbul edildi. Reqlament iki dayaq üzərində qurulmuşdu. Birinci dayaq elektron identifikasiya idi: üzv dövlət öz elektron identifikasiya sistemini bildirərsə, digər üzv dövlətlərin dövlət xidmətləri həmin sistemi tanımağa borclu idi. İkinci dayaq etibar xidmətləri idi: elektron imza, elektron möhür, vaxt möhürü və bunları təqdim edən təşkilatların nəzarəti. Tamga-nın etibar modelinin əsaslandığı #{strong[etibar siyahıları]} bu ikinci dayağın məhsuludur: hər üzv dövlət nəzarət etdiyi kvalifikasiyalı etibar xidməti provayderlərini imzalı siyahıda dərc edir.

Elektron identifikasiya dayağı gözlənilən yayğınlığa çatmadı. Şəxslər sənəd daşımırdı, hər girişdə öz ölkələrinin identifikasiya sisteminə yönləndirilirdi; bu, silsilənin ilk yazısında \[67\] federasiya dövrü adlandırdığımız modeldir. Komissiya 2021-ci ildə reqlamentin dəyişdirilməsini təklif etdi və həmin gün üzv dövlətləri ortaq texniki çərçivə üzərində işləməyə çağırdı \[3\]. Dəyişiklik 11 aprel 2024-cü il tarixli #{strong[2024\/1183 saylı Reqlament]} kimi qəbul edildi və 20 may 2024-cü ildə qüvvəyə mindi. Bu mətn bu gün #{strong[eIDAS 2.0]} adlanır.

eIDAS 2.0-ın mahiyyəti keçiddir: şəxsin hər dəfə şəxsiyyət provayderinə yönləndirildiyi modeldən sənədlərini öz cüzdanında daşıdığı modelə. Reqlament hər üzv dövlətin öz vətəndaşlarına ən azı bir #{strong[Avropa Rəqəmsal Şəxsiyyət Cüzdanı]} (#{emph[European Digital Identity Wallet]}, EUDI Wallet) təqdim etməsini məcburi edir. Öhdəlik dövlətin üzərindədir; şəxslər üçün cüzdandan istifadə könüllüdür və ödənişsizdir. Reqlament həmçinin cüzdandan məlumat istəyən qurumların əvvəlcə qeydiyyatdan keçməsini, cüzdanın müstəqil təşkilatlar tərəfindən sertifikatlaşdırılmasını və dövlət qurumları ilə müəyyən özəl sektor təşkilatlarının cüzdanı qəbul etməsini nəzərdə tutur.

Reqlamentin özü prinsipləri, rolları və öhdəlikləri müəyyən edir; lakin Fransa cüzdanının Almaniya bankı ilə danışa bilməsi üçün lazım olan texniki qaydaları yazmır. Bu qaydalar Komissiyanın qəbul etdiyi #{strong[İcra Reqlamentlərində]} (#{emph[Commission Implementing Regulation]}, CIR) yer alır. Cüzdana aid ilk beş İcra Reqlamenti (2024\/2977–2982 \[5\]) 28 noyabr 2024-cü ildə qəbul edildi və 24 dekabr 2024-cü ildə qüvvəyə mindi; reqlamentin cüzdan üçün nəzərdə tutduğu 24 aylıq müddət bu tarixdən işləməyə başladı. 2025-ci ilin mayında relying party-lərin qeydiyyatını da əhatə edən ikinci paket (2025\/846–849 \[6\]), 2026-cı ilin iyulunda isə istinad edilən standartları yeniləyən dəyişdirici reqlamentlər (2026\/1730 \[7\], 2026\/1731, 2026\/1735) dərc olundu. İcra Reqlamenti çox vaxt standartı köçürmür, ona istinad edir; buna görə Aİ-də məcburi olan texniki qayda çox vaxt reqlamentin istinad etdiyi standartın müəyyən versiyasıdır.

== Sənəd növləri: PID, EAA, QEAA, PuB-EAA

eIDAS 2.0 cüzdanda daşınan sənədləri iki böyük qrupa ayırır. Birinci qrup #{strong[şəxsiyyət məlumatlarıdır]} (#{emph[Person Identification Data]}, #{strong[PID]}): ad, soyad, doğum tarixi, vətəndaşlıq kimi şəxsin kimliyini müəyyən edən məlumat. PID-i yalnız dövlət və ya dövlətin səlahiyyət verdiyi təşkilat verə bilər və o, cüzdanın əsasını təşkil edir. İkinci qrup #{strong[atributların elektron attestasiyalarıdır]} (#{emph[Electronic Attestation of Attributes]}, #{strong[EAA]}): diplom, tələbə arayışı, peşə sənədi, üzvlük kartı, bilet; qısası, PID-dən başqa hər sənəd.

Reqlament EAA-ları da kimin verdiyinə və hansı təminatı daşıdığına görə üçə bölür. Kvalifikasiyalı etibar xidməti provayderinin verdiyi #{strong[kvalifikasiyalı atribut attestasiyası]} (QEAA) kağız üzərindəki qarşılığı ilə eyni hüquqi təsirə malikdir. Səlahiyyətli mənbəyə cavabdeh dövlət qurumunun və ya onun adından təyin edilmiş qurumun verdiyi #{strong[dövlət qurumu attestasiyası]} (PuB-EAA) ayrıca sinifdir. Bunlardan kənarda qalan hər kəs, məsələn universitet, bilet satıcısı və ya idman klubu, #{strong[kvalifikasiyalı olmayan atribut attestasiyası]} verə bilər. Bu bölgü hüquqi təsiri müəyyən edir; texniki format isə çox vaxt eynidir.

Tamga-nın bu anlayışlarla münasibətində ilk qayda şəbəkənin #{strong[PID verməməsidir]}. Əsas çərçivə sənədi PID verilməsini əhatədən kənar sayır və bu rolu dövlətə ayırır (FW-ARF-0001 §1.7). Etibar siyahısında PID provayderləri üçün yer var, lakin bu yer bu gün boşdur. Şəxsin kimliyini təsdiqləyən sənədə yenə də ehtiyac olduğu üçün şəbəkə dövlətin PID provayderi təyin edilənə qədər #{strong[müvəqqəti şəxsiyyət sənədi provayderi]} idarə edir; bu xidmətin verdiyi sənəd PID deyil, kvalifikasiyalı olmayan EAA-dır və dövlətin PID-i gəldikdə yerini ona verir (ADR-0011, ADR-0022; Bölmə 14). Cədvəl 4 dörd anlayışı və onların Tamga-dakı qarşılıqlarını yan-yana qoyur.

#tablo([#{strong[Cədvəl 4.]} Aİ sənəd anlayışları və onların Tamga-dakı qarşılıqları.], (20fr, 32fr, 31fr, 48fr), ([Anlayış], [Kim verir (Aİ)], [Təminat və hüquqi təsir], [Tamga-dakı qarşılığı],), (
  ([PID], [Dövlət və ya dövlətin səlahiyyət verdiyi təşkilat], [Ən yüksək təminat; cüzdanın əsası], [Verilmir; siyahıda yer ayrılıb və boşdur. Müvəqqəti şəxsiyyət xidməti PID-i əvəz etmir],),
  ([EAA (kvalifikasiyalı olmayan)], [İstənilən qurum], [Hüquqi təsiri ümumi qaydalara görədir], [Qurum sənəd növləri (tələbə arayışı, diplom, bilet) və müvəqqəti şəxsiyyət sənədi],),
  ([QEAA], [Kvalifikasiyalı etibar xidməti provayderi], [Kağız qarşılığı ilə eyni hüquqi təsir], [Bu gün yoxdur; "kvalifikasiyalı" status müstəqil qiymətləndirmə və nəzarət tələb edir (ADR-0022)],),
  ([PuB-EAA], [Səlahiyyətli mənbəyə cavabdeh dövlət qurumu], [Dövlət mənbəyinə əsaslanır], [Qurum siniflərində dövlət sinfi (PUB) üçün yer var; bu gün sənəd verən dövlət qurumu yoxdur],),
))

== ARF-in rolları və etibar siyahıları

Komissiyanın 2021-ci il çağırışı ilə üzv dövlətlərin ekspertləri və Komissiya cüzdan ekosisteminin texniki çərçivəsini birlikdə yazmağa başladılar. Bu çərçivənin adı #{strong[Arxitektura və İstinad Çərçivəsidir]} (#{emph[Architecture and Reference Framework]}, #{strong[ARF]} \[11\]). ARF məcburi hüquqi mətn deyil; açıq şəkildə hazırlanan və müntəzəm yenilənən texniki sənəddir. Lakin İcra Reqlamentləri ARF-dəki işə əsaslanır; praktikada ARF növbəti reqlamentdə nəyin məcburi olacağını əvvəlcədən göstərir. Bu nəşrin hazırlandığı tarixdə ARF-in aktual versiyası 23 iyul 2026-cı il tarixli 3.0.0-dır.

ARF-in ən davamlı töhfələrindən biri #{strong[rollar toplusudur]}. Hər rolun nə etdiyi və kimin qarşısında cavabdeh olduğu bəllidir:

- #{strong[Cüzdan provayderi]} (#{emph[Wallet Provider]}) cüzdan tətbiqini təqdim edir və cüzdanın real, təhlükəsiz cüzdan olduğunu sübut edən imzalı bəyanatları yaradır.
- #{strong[PID provayderi]} şəxsiyyət məlumatlarını, #{strong[atribut attestasiyası provayderləri]} isə digər sənədləri verir.
- #{strong[Relying party]}, yəni yoxlayan tərəf, cüzdandan sənəd istəyir. Relying party adından işləyən #{strong[vasitəçi]} (#{emph[intermediary]}) də bu rolun bir növüdür.
- #{strong[Qeydiyyat qurumu]} (#{emph[Registrar]}) relying party-ləri və onların hansı məqsədlə hansı məlumatları istəyə biləcəyini qeydiyyata alır.
- #{strong[Giriş sertifikatı orqanı]} (#{emph[Access Certificate Authority]}) relying party-lərə özlərini cüzdana təqdim edəcəkləri sertifikatları verir; #{strong[qeydiyyat sertifikatı provayderi]} isə qeydiyyatdakı əhatə dairəsini daşıyan imzalı sənədi yaradır.
- #{strong[Etibar siyahısı provayderi]} bu rolları kimlərin öz üzərinə götürdüyünü imzalı siyahılarda dərc edir.

Bu rolların hamısının üstündə eIDAS-ın 2014-cü ildən bəri işləyən etibar siyahısı arxitekturası dayanır. Hər üzv dövlət öz #{strong[milli etibar siyahısını]} imzalayıb dərc edir; Komissiya da bu siyahıların ünvanlarını və imzalayanlarını göstərən #{strong[siyahıların siyahısını]} (#{emph[List of Trusted Lists]}, LOTL) dərc edir. eIDAS 2.0 ilə bu arxitektura cüzdan ekosisteminin yeni rollarına genişlənir: hansı təşkilatların cüzdan provayderi, PID provayderi və ya giriş sertifikatı orqanı olduğu da oxşar siyahılarla bildirilir.

Bu qaydanın bir nəticəsi yoxlamanın #{strong[ikitərəfli]} olmasıdır. Yoxlayan tərəf sənədi yoxlayarkən cüzdan da yoxlayan tərəfi yoxlayır: sorğunu imzalayan təşkilat həqiqətən qeydiyyatdadırmı, istədiyi sahələr qeydiyyatının əhatə dairəsindədirmi? Bölmə 1.2-dəki səhnədə Aynurun cüzdanının Timurun şirkətini yoxlaması bu prinsipin tətbiqidir. Şəkil 3 rolları Aİ-nin terminləri ilə göstərir.

#sekil(3, [EUDI ekosistemində rollar (Aİ terminləri ilə, sadələşdirilmiş)], "figures/wp-az/sekil-3.svg", yarim: false)

== Texniki standartlar xəritəsi

ARF tək bir texnologiyaya bağlanmaq əvəzinə müxtəlif standartlaşdırma təşkilatlarının yazdığı yetkin standartlardan bir toplu seçir. Bu standartları Aİ yazmır; IETF, ISO, OpenID Foundation, ETSI və W3C kimi təşkilatlar yazır. Aİ-nin etdiyi bu standartlar arasından seçim etmək və onların variantlarını daraldan #{strong[profillər]} müəyyənləşdirməkdir. Tamga bu seçimdən və profillərdən olduğu kimi istifadə edir. Cədvəl 5 standartları qatlarına görə sıralayır; hər birinin Tamga-da necə istifadə edildiyi müvafiq bölmədə izah olunur. Şəkil 4 eyni standartları qatlar şəklində göstərir.

#tablo([#{strong[Cədvəl 5.]} Tamga-nın əsaslandığı əsas standartlar.], (21fr, 28fr, 29fr, 48fr, 21fr), ([Qat​​​​​​​​​​​​​​], [Standart], [Müəllif​​​​​​​​​​​​​​​​], [Nəyə xidmət edir], [Sənəddə​​​​​​​​​​],), (
  ([Sənəd formatı], [SD-JWT (RFC 9901) və SD-JWT VC (IETF layihəsi)], [IETF], [Sahələri bir-bir gizlədilə bilən imzalı JSON sənəd], [Bölmə 8],),
  ([Sənəd formatı], [ISO\/IEC 18013-5 mdoc], [ISO\/IEC], [Mobil sürücülük vəsiqəsi üçün hazırlanmış ikili (CBOR) format; yaxın məsafə], [Bölmə 8.3, 10.8],),
  ([Sənədin verilməsi], [OpenID4VCI 1.0], [OpenID Foundation], [Qurumun cüzdana sənəd verməsi], [Bölmə 9],),
  ([Təqdimetmə], [OpenID4VP 1.0 və DCQL sorğu dili], [OpenID Foundation], [Yoxlayan tərəfin cüzdandan sənəd istəməsi], [Bölmə 10],),
  ([Profil], [HAIP 1.0], [OpenID Foundation], [Yüksək təminat üçün OpenID4VC variantlarını daraldan profil], [Bölmə 9, 10],),
  ([Brauzer], [Digital Credentials API; ISO\/IEC 18013-7], [W3C; ISO\/IEC], [Vebsaytın sənədi brauzer vasitəsilə istəməsi], [Bölmə 10.6],),
  ([Ləğv], [Token Status List (IETF layihəsi)], [IETF], [Sənədin ləğv edilib-edilmədiyini sənədi verənə müraciət etmədən öyrənmək], [Bölmə 12],),
  ([Etibar], [ETSI TS 119 612 və TS 119 602], [ETSI], [Etibar siyahıları və etibarlı subyektlər siyahıları], [Bölmə 6],),
  ([Qurum şəxsiyyəti], [X.509 (RFC 5280); ETSI TS 119 412-6, TS 119 411-8, TS 119 475], [IETF; ETSI], [Qurum, yoxlayan tərəf və qeydiyyat sertifikatlarının profilləri], [Bölmə 7],),
  ([Şəxsiyyətin təsdiqi], [ETSI TS 119 461], [ETSI], [Məsafədən şəxsiyyət təsdiqinin siyasət və təhlükəsizlik tələbləri], [Bölmə 14],),
))

Cədvəldəki "layihə" ifadəsi standartın yetkinlik mərhələsini göstərir. SD-JWT-nin özü 2025-ci ildə RFC 9901 \[15\] kimi dərc edildi; onun üzərində qurulan SD-JWT VC \[16\] və Token Status List \[17\] isə IETF-də son mərhələdədir. Aİ İcra Reqlamentlərində bu layihələrin müəyyən versiyalarına istinad edir; Tamga da bu versiyaları izləyir. OpenID4VP 1.0 \[31\] 2025-ci ilin iyulunda, OpenID4VCI 1.0 \[30\] 2025-ci ilin sentyabrında, HAIP 1.0 \[32\] isə 2025-ci ilin dekabrında son versiya kimi dərc edildi.

#kutu("teknik", [Standartın "profili" nə deməkdir?])[
Ümumi təyinatlı standart müxtəlif istifadə hallarına xidmət etmək üçün bir çox yerdə variant saxlayır: bir neçə imza alqoritmi, bir neçə müştəri identifikatoru formatı, açarı bağlamağın bir neçə yolu. Variantların bolluğu çeviklik verir, lakin birgə işləməni çətinləşdirir. A cüzdanı bir variantı, B yoxlayıcısı başqa variantı tətbiq edərsə, hər ikisi standarta uyğun olur, amma bir-birini anlamır. #{strong[Profil]} bu variantlardan bir alt toplu seçib onu məcburi edən sənəddir. HAIP 1.0 OpenID4VCI və OpenID4VP-nin yüksək təminat tələb edən istifadələr üçün profilidir. Tamga-nın bu profilə uyğunluğunu qərara bağlayan qeyd (ADR-0034) iki nümunə verir: yoxlayan tərəf imzalı sorğuda müştəri identifikatoru kimi yalnız öz giriş sertifikatının hash-ini (#{raw("x509_hash")}) istifadə edir və cüzdan yalnız onu qəbul edir; cüzdanın provayderindən aldığı sübutdakı #{raw("sub")} dəyəri də eyni cüzdan həllindən istifadə edən bütün quraşdırmalarda ortaqdır. İkinci qaydanın əsası HAIP-in açıq müddəasıdır, lakin qayda məxfilik nəticəsi də doğurur: sübutun "kim" sahəsi tək bir telefona xas dəyər daşımır, yalnız cüzdan həllinin adını daşıyır.
]

#sekil(4, [Standartların qatları], "figures/wp-az/sekil-4.svg", yarim: false)

== Aİ-dən kənardan baxanda

Aİ-dən kənar ölkədə bu standartlardan istifadə edən biri üçün ilk sual özünü necə adlandıra biləcəyidir. "EUDI Wallet" və ya Avropa Rəqəmsal Şəxsiyyət Cüzdanı texniki tərif deyil, #{strong[hüquqi addır]}: Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı və Aİ qaydalarına görə sertifikatlaşdırılan cüzdanı ifadə edir. Aİ-dən kənar təşkilatın cüzdanı bu adı ala bilməz, Aİ-nin cüzdan etibar nişanından da istifadə edə bilməz (FW-ARF-0001 §1.4). Tamga-nın hamıya açıq mətnlərdə istifadə etdiyi ifadə buna görə "Aİ ilə uyğun"dur: eyni sənəd formatlarından, eyni protokollardan və eyni etibar modelindən istifadə etmək və bunu testlərlə göstərmək.

İkinci sual Aİ ilə uyğun sənədin Aİ-də etibarlı olub-olmayacağıdır. Bu sualın cavabı texnikanın deyil, hüququn sahəsindədir və şəbəkənin əlində deyil. Tamga-nın mövqeləndirmə qərarına əlavə edilmiş hüquqi qeyd bunu açıq yazır (ADR-0035): reqlamentin dövlət və özəl sektora cüzdanı qəbul etmək öhdəliyi qoyan 5f maddəsi Aİ-dən kənar cüzdanı və ya siyahını tanımaq yolu deyil. Aİ-dən kənar üçün açıq əsas etibar xidmətləri baxımından İttifaqla həmin ölkə arasında bağlanacaq sazişi nəzərdə tutan 14-cü maddədir və bu sazişin tərəfləri dövlətlərdir. Şəbəkənin rolu texniki hazırlıqdır: ETSI formatında siyahılar, ETSI profilli sertifikatlar və təhvil verilə bilən dövlət rolları. Qısa müddətdə Aİ yoxlayıcısı Tamga sənədlərini yalnız öz istəyi ilə, Tamga-nın etibar siyahısını öz etibar mənbəyinə əlavə etməklə qəbul edə bilər; bu, hüquqi tanınma deyil və belə təqdim edilmir. Tanınma məsələsinin bütünü Bölmə 20-dədir.

= Dizayn Prinsipləri və Mövqeləndirmə

Arxitekturanı anlamağın qısa yolu onu quranların heç vaxt nə etməyəcəklərini dedikləri yerə baxmaqdır. Tamga-nın əsas çərçivə sənədi bu qaydaları yeddi prinsipdə toplayır (FW-ARF-0001 §1.6). Bu bölmə əvvəlcə bu prinsipləri, sonra şəbəkənin özünü necə mövqeləndirdiyini, nə etmədiyini və bu gün kimin əli ilə idarə edildiyini izah edir.

== Yeddi prinsip

#{strong[P1. Hər dövlət öz milli qeydiyyatlarının yeganə müəllifidir.]} Dövlətin hansı qurumu sənəd verən kimi qeydiyyata alacağına heç bir başqa dövlət səs vermir. Şəbəkəyə üzvlük şura yaradıldıqda üzv dövlətlərin üçdə iki səsi ilə olur; transsərhəd tanınma isə hər dövlətin birtərəfli qərarıdır. Niyə? Çünki heç bir dövlət öz daxili institusional qərarlarının başqalarının səsindən asılı olduğu və ya bir gün şəbəkədən çıxarılarsa vətəndaşlarının sənədlərinin dəyərsizləşəcəyi struktura daxil olmaz (ADR-0002). Suverenlik təminatı iştirakın ilkin şərtidir.

#{strong[P2. Heç bir ortaq qeyddə fərdi məlumat yoxdur.]} Etibar siyahısında, lövbər jurnalında, mümkün ortaq reyestrdə və qeydlərdə fərdi məlumat yoxdur; nə sənədin məzmunu, nə də sənədin hash-i. Niyə hətta hash belə? Çünki hash sənədi bilən biri üçün sənədin özü qədər identifikasiyaedicidir: əlində diplom olan şəxs onun hash-ini hesablayıb hamıya açıq qeyddə axtara bilər. Ortaq qeydlərin izləmə alətinə çevrilməməsinin yeganə etibarlı yolu onlara heç bir fərdi məlumat qoymamaqdır.

#{strong[P3. Texniki qat Aİ standartları ilə eynidir.]} Tamga-ya xas hər əlavə standartın genişlənmə nöqtəsi ilə edilir və standart müştəriləri pozmur. Birgə işləmənin dəyəri heç kimin xüsusi uyğunlaşdırma yazmağa məcbur qalmamasından gəlir. Aİ ilə uyğun cüzdan Tamga qurumundan sənəd ala bilməli, Tamga yoxlayıcısı da Aİ ilə uyğun cüzdandan gələn sənədi emal edə bilməlidir.

#{strong[P4. Heç bir identifikator, rol və ya struktur tək operator fərziyyəsi daşımır.]} Şəbəkənin bu gün müvəqqəti olaraq öz üzərinə götürdüyü hər dövlət rolu təhvil verilə bilən şəkildə layihələndirilir. Niyə? Çünki struktur tək operatora görə qurularsa, təhvil günü hər şeyi yenidən yazmaq lazım gəlir: qurum identifikatorları dəyişir, sənədlər etibarsızlaşır, cüzdanlar yenilənir. Tamga-da təhvil yalnız siyahının operator sahəsini və imzalayanını dəyişir; qurumların identifikatorları, sənəd növləri və verilmiş sənədlər eyni qalır (Bölmə 6.7, 18.4).

#{strong[P5. Ortaq reyestr saxlama seçimi deyil, imzalayanların seçimidir.]} Bu gün etibar imzalı siyahılardan gəlir. Ən azı iki müstəqil operator olduqda ortaq reyestr qurulur. Niyə? Çünki tək operatorun idarə etdiyi dörd qovşaqlı zəncir eyni operatorun imzaladığı siyahıdan artıq etibar yaratmır (ADR-0009). Reyestri dəyərli edən qeydlərin bir-birindən asılı olmayan tərəflərin ortaq imzası ilə saxlanmasıdır. Buna görə Tamga-da zəncirin kodu yazılıb və test edilib, lakin istehsalatda yoxdur və söndürülüb; ikinci müstəqil operator olmadan işə salınmır və işə salındıqda da yalnız imzalı siyahıların hash-ini daşıyır (ADR-0051; Bölmə 19).

#{strong[P6. Hər sənəd cihazın təhlükəsiz zonasındakı bir açara bağlıdır.]} Sənəd köçürülə və başqasına verilə bilməz. Bağı olmayan sənədi onu ələ keçirən hər kəs təqdim edə bilər; diplomun faylını götürən biri sahibi kimi davrana bilər. Cihaz bağı olmadan rəqəmsal sənəd kağız surətin zəifliyini daşımağa davam edir (ADR-0006; Bölmə 8.2).

#{strong[P7. Kodla məhdudlaşdırıla bilməyən hər səlahiyyət siyasətlə, ölçülə bilən təhvil həddi ilə və şəffaflıq hesabatı ilə məhdudlaşdırılır.]} Hostinq, domen adı, qeyd aparma və statistika kimi səlahiyyətlərin qarşısını kodla almaq olmur; lakin onlardan sui-istifadə edilə bilər. Trust Framework bu prinsipi "yumşaq güc də məhdudlaşdırılır" adlandırır (FW-TF-0001 §1.2, G-B). Niyə? Çünki şəbəkənin neytrallığı yazdığı qaydalarla yanaşı operatorun qaydalardan kənarda qalan gücləri ilə də sınanır. Məsələn, host edilən sənəd verənlərin payı müəyyən həddi aşarsa, məsələ idarəetmənin gündəliyinə gəlir və şəffaflıq hesabatı rübdə bir dərc edilir (Bölmə 18.5).

Trust Framework bu yeddi prinsipə idarəetməyə xas daha bir qayda əlavə edir və onu "qeydiyyat səlahiyyətləndirmə deyil" adlandırır (FW-TF-0001 §1.2, G-A). Şəbəkədə qeydiyyatdan keçmək quruma sənəd vermək səlahiyyəti vermir; universitetin diplom vermək səlahiyyəti şəbəkədən kənardan, öz qanunvericiliyindən gəlir. Şəbəkə yalnız şəbəkə daxilindəki əhatə dairəsini, yəni qurumun hansı sənəd növlərini hansı sahələrlə verə biləcəyini saxlayır. Cədvəl 6 prinsipləri Bölmə 2.5-dəki tələblərə və onları təfərrüatlandıran bölmələrə bağlayır.

#tablo([#{strong[Cədvəl 6.]} Prinsiplər, qarşıladıqları tələblər və təfərrüat bölmələri.], (14fr, 41fr, 10fr, 11fr), ([Prinsip​​​​], [Mahiyyəti], [Tələb​​​], [Təfərrüat],), (
  ([P1], [Hər dövlət öz qeydiyyatının yeganə müəllifidir], [G7], [6\.2, 18.1],),
  ([P2], [Ortaq qeydlərdə fərdi məlumat yoxdur], [G4, G6], [6, 12.4, 15.5, 19.3],),
  ([P3], [Texniki qat Aİ standartları ilə eynidir], [G9, G10], [3, 8–10, 20],),
  ([P4], [Tək operator fərziyyəsi yoxdur, rollar təhvil verilə bilər], [G8], [6\.7, 7.2, 18.4],),
  ([P5], [Reyestr imzalayanların seçimidir; ən azı iki müstəqil operator], [G8, G4], [6\.4, 19],),
  ([P6], [Hər sənəd cihaz açarına bağlıdır], [G5], [8\.2, 13],),
  ([P7], [Yumşaq güc siyasətlə və hədlə məhdudlaşdırılır], [G8], [18\.5],),
))

== Üç qat

Tamga-nın mövqeləndirmə qərarı (ADR-0035) strukturu bir-birinin üzərində dayanan üç qata ayırır və hər qatın təkbaşına dəyər daşımasını şərt qoyur (Şəkil 5).

#{strong[Təməl: Aİ ilə uyğunluq.]} Sənədlər, protokollar və etibar siyahıları Aİ standartlarındadır. Şəbəkə heç böyüməsə, tək bir dövlət belə qoşulmasa, bu qat qurumlar və cüzdanlar üçün yenə dəyər daşıyır: qurum Tamga-nın açıq paketləri ilə Aİ ilə uyğun sənəd verə, yoxlayan tərəf isə Aİ ilə uyğun sənədləri yoxlaya bilər.

#{strong[Tamga Network: yüngül etibar federasiyası.]} Şəbəkənin əsas işi ölkə etibar siyahılarını bir araya gətirmək və onları bir-birinə tanıtmaqdır. "Federasiya" burada hər siyahının öz sahibi tərəfindən idarə edildiyi və ortaq siyahılar siyahısında göstərildiyi modeli ifadə edir. Şəbəkə dərc edilmiş qaydalara uyan hər cüzdan provayderini tanıyır; cüzdanları seçmir. Bu gün Türkiyə siyahısını şəbəkə müvəqqəti olaraq, dövlət adından idarə edir. Dövlət öz siyahısını dərc etdikdə siyahıların siyahısı həmin siyahının ünvanını və imzalayanını göstərir. Ağır institut ilk gündən qurulmur: bir və ya iki dövlət qoşulmağa maraq göstərdikdə şura və ya fond yaradılır, siyahılar təhvil verilir və ortaq reyestr gəlir.

#{strong[Şəbəkənin üstündəkilər.]} Şəbəkənin qaydalarına uyan cüzdanlar və xidmət provayderləri bu qatdadır. Onlar şəbəkənin hissəsi sayılmır; şəbəkənin iştirakçıları və ya istifadəçiləridir. Bu qat ilk qərarda "məhsullar və xidmətlər" kimi təsvir edilmişdi; o zaman şəbəkənin özünün xidmət göstərdiyi struktur nəzərdə tutulurdu. Eyni qərar qeydi bunun gərginlik daşıdığını da qeyd etmişdi: Aİ modelində siyahını idarə edən tərəfin xidmət satması maraqlar toqquşması sayılır. Növbəti qərar bu gərginliyi aradan qaldırdı və şəbəkənin yalnız şəbəkə olduğunu, kommersiya xidmətlərinin isə şəbəkədən kənar şirkətlər tərəfindən öz adları ilə təqdim edildiyini qərara bağladı (ADR-0037). Ondan sonra gələn qərar cüzdanların da şəbəkədən kənarda olduğunu dəqiqləşdirdi (ADR-0042; Bölmə 5.4).

Niyə üç qat? Qərar qeydi üç yolu nəzərdən keçirir. Birincisi, yalnız Aİ ilə uyğun cüzdan və onun ətrafındakı xidmətlər idi; bu yol sürətlidir, lakin Türk dünyası üçün ortaq etibar zəmini qurmur və dövlət cüzdanları gəldikdə fərqləndirici heç nə saxlamır. İkincisi, əvvəlcə Aİ-yə bənzər ağır institut qurmaq idi; lakin dövlətlər qoşulmadan belə institutu qurmaq həm tez, həm də əsassız olardı. Üçüncü yol, qatlı struktur, ilk ikisinin yaxşı tərəflərini birləşdirir: təməl dərhal dəyər yaradır, federasiya qatı dövlətlər qoşulduqca böyüyür və dövlət siyahıları gəldikdə dəyər itmir, əksinə federasiyanın dəyəri artır.

#sekil(5, [Tamga-nın üç qatı], "figures/wp-az/sekil-5.svg", yarim: false)

== Şəbəkə nə deyil

Strukturu təsvir etməyin bir yolu da onun nə olmadığını deməkdir. Tamga Network-ün qərarları şəbəkənin öz üzərinə götürməyəcəyi işləri açıq sayır; bu hədlər şəbəkənin neytrallığını və təhvil verilə bilməsini qoruyur.

Şəbəkə #{strong[məhsul və ya xidmət satmır]}. Qaydaları yazır, etibar siyahılarını dərc edir, açıq kodu və şəbəkənin işləməsi üçün lazım olan istinad xidmətlərini idarə edir; bunların heç biri satılmır. İnteqrasiya, dəstək və ya konsaltinq kimi kommersiya xidmətləri şəbəkədən kənar şirkətlər tərəfindən öz adları ilə təqdim edilir, şəbəkənin istinad xidmətləri və qeydiyyat prosesi isə bütün iştirakçılara eyni şərtlərlə açıqdır (ADR-0037).

Şəbəkə #{strong[cüzdan idarə etmir]}. Heç bir cüzdanın tətbiqini, cüzdan provayderini, saytını və ya dəstək xidmətini idarə etmir; cüzdanları yalnız etibar siyahısındakı qeydləri ilə tanıyır (ADR-0042).

Şəbəkə #{strong[PID vermir]}. Bu rol dövlətə ayrılıb. Şəbəkənin müvəqqəti şəxsiyyət xidməti PID olmayan, müvəqqəti şəxsiyyət sənədi verir (Bölmə 3.2, 14).

Şəbəkə #{strong[ödəniş emal etmir və token buraxmır]}. Şəbəkənin erkən dizaynında mümkün reyestrin üzərində qurula biləcək dəyər qatı üçün bəzi yerlər ayrılmışdı. Bu yerlər məcburi olmaqdan çıxarıldı və dayandırılmış tədqiqat istiqaməti kimi qaldı; onun yenidən açılması idarəetmə orqanının qərarını, müstəqil təhlükəsizlik yoxlamasını və yeni qərar qeydini tələb edir (ADR-0072). Əsas çərçivə sənədi də ödənişi və dəyər köçürməsini əhatədən kənar sayır (FW-ARF-0001 §1.7).

Şəbəkə #{strong[fərdi qeyd aparmır]}. Şəxslərin sənədləri qurumların öz sistemlərindən oxunur və şəxsin cüzdanında daşınır; şəbəkənin ortaq qeydlərində fərdi məlumat yoxdur (P2). Bunun yeganə dar istisnası müvəqqəti şəxsiyyət xidmətidir: bu xidmət şəxsiyyətini təsdiqlədiyi şəxslər üçün məlumat nəzarətçisidir və saxladığı məlumatı qısa və müəyyən edilmiş müddətlərlə məhdudlaşdırır (Bölmə 14.7).

Əsas çərçivə sənədinin əhatədən kənar siyahısı bundan əlavə qurumların sənəd sahibi olduğu qurum cüzdanını, W3C VCDM \[37\] formatında ikinci sənəd təqdimatını və kvalifikasiyalı elektron imzanı sayır. Bunlar həmişəlik istisna edilməyib; hər biri yalnız ayrıca qərarla açıla bilər.

== Qeyri-kommersiya şəbəkə, fond və müvəqqəti operatorluq

Tamga Network qeyri-kommersiya etibar şəbəkəsi kimi layihələndirilib və onun daimi yeri fonddur. Lakin şəbəkənin, şirkətdən fərqli olaraq, öz-özünə hüquqi şəxs statusu yoxdur və fond hələ yaradılmayıb. Digər tərəfdən bəzi işlər bu gündən hüquqi şəxs tələb edir: sertifikatın subyekt sahəsinə yazılacaq qurum identifikasiya nömrəsi, domen adının qeydiyyatı, fərdi məlumatlar haqqında qanunvericilik qarşısında məlumat nəzarətçisi kimi qeydiyyat, qoşulma müqavilələri.

Bu boşluq bir qərarla doldurulub (ADR-0070). Fond hüquqi şəxs statusu qazanana qədər şəbəkənin öz xidmətlərini, yəni siyahıların dərcini, qeydiyyat qurumu rolunun dövlət adından icrasını, şəxsiyyət xidmətini, Tamga Verify-ı, saytları və domen adlarını #{strong[müvəqqəti operator]} "Tamga Network adından" idarə edir. Hüquqi şəxs tələb edən hər əməliyyat onun adı ilə və bu qeydlə aparılır; qoşulma müqavilələri fonda keçidi nəzərdə tutan hüquq varisliyi maddəsi daşıyır. Etibar siyahılarında isə siyahı operatorunun adı həmişə "Tamga Network"dür və statusu "müvəqqəti" (#{raw("provisional")}) kimi işarələnir.

Qərarın nəzərdən keçirdiyi variantlar bu dizaynın niyə seçildiyini göstərir. Siyahılarda operator adı kimi birbaşa şirkətin adını yazmaq rədd edildi, çünki siyahının sahibliyi şəbəkəyə məxsusdur və təhvil zamanı siyahının kimliyi dəyişərdi. Hüquqi şəxs tələb edən hər işi fond yaradılana qədər gözlətmək də rədd edildi; şəxsiyyət xidməti, yoxlayan tərəfin qeydiyyatı və mağaza yoxlaması bu gündən hüquqi şəxs tələb edirdi. Məlumatları hər qeyddə ayrı-ayrılıqda saxlamaq da dağınıq və yoxlanılmaz olduğu üçün rədd edildi. Seçilmiş yolda müvəqqəti operatorun məlumatları tək bir konfiqurasiya dəyərindən gəlir və siyahı naşiri hər dərcdən əvvəl onu yoxlayır; məlumatlar uyğunsuzdursa, dərc dayanır. Fonda təhvil yalnız bu dəyəri və ona bağlı qeydlərlə sertifikatları dəyişir; siyahı operatorunun adı, kök sertifikatın identifikatoru, sənəd növlərinin identifikatorları və qurumların daimi identifikatorları dəyişmir.

Müvəqqəti operatorun başqa məhsulları olsa belə, onlar şəbəkədə ayrıca iştirakçılardır və heç bir imtiyaz əldə etmir. Maliyyələşmə məsələsində şəbəkənin prinsipi də qısadır: şəbəkə qeyri-kommersiyadır, müvəqqəti dövrdə heç bir iştirakçıdan, yəni sənəd verən qurumdan, yoxlayan tərəfdən, cüzdan provayderindən və ya şəxsdən ödəniş almır və şəxslər üçün həmişə ödənişsizdir (ADR-0071; FW-TF-0001 §5.5). Maliyyələşmənin idarəetmə ilə əlaqəsi Bölmə 18.7-dədir.

= Rollar və Komponentlər

Bölmə 3 Aİ-nin rollar toplusunu izah etdi. Bu bölmə eyni toplunu Tamga-nın içindən göstərir: bu gün hər rolu kim öz üzərinə götürür, dövlət qoşulduqda kim götürəcək, hansı xidmət harada işləyir və məlumat hansı istiqamətdə axır.

== Rollar toplusu

Tamga-nın rollar toplusu Aİ ARF-indən \[11\] götürülüb və bir qayda ilə başlayır: hər ölkə siyahısı bu rolların hər biri üçün yer ayırır; yer boş qalsa da, mövcuddur (FW-ARF-0001 §3). Bunun praktik mənası belədir: dövlət qoşulduqda struktura yeni sahə əlavə edilmir, mövcud yer dolur. Cədvəl 7 rolları bugünkü və dövlət qoşulduqdan sonrakı sahibləri ilə birlikdə verir.

#tablo([#{strong[Cədvəl 7.]} Rollar: bu gün və dövlət qoşulduqda.], (31fr, 48fr, 30fr, 22fr), ([Rol (Aİ adı)], [Nə edir], [Bu gün], [Dövlət qoşulduqda],), (
  ([Etibar siyahısı operatoru (#{emph[Trusted List Scheme Operator]})], [Ölkə siyahısını tərtib edir, imzalayır, dərc edir], [Şəbəkə, dövlət adından müvəqqəti], [Milli orqan və ya onun səlahiyyət verdiyi qurum],),
  ([Qeydiyyat qurumu (#{emph[Registrar]})], [Sənəd verənləri, yoxlayan tərəfləri və cüzdan provayderlərini qeydiyyata alır; qanuni səlahiyyət vermir], [Şəbəkə, dövlət adından müvəqqəti], [Dövlətin qeydiyyat qurumu],),
  ([Milli kök sertifikat orqanı], [Qurum sertifikatlarının kökü], [Şəbəkə, müvəqqəti; kökün identifikatoru təhvildə dəyişmir], [Dövlətin kökü və ya səlahiyyətli sertifikat provayderi],),
  ([Giriş və qeydiyyat sertifikatı provayderi], [Yoxlayan tərəflərə giriş və qeydiyyat sertifikatı verir], [Şəbəkə, müvəqqəti], [Dövlət],),
  ([PID provayderi], [Şəxsiyyət məlumatlarını ən yüksək təminatla verir], [#{strong[Boş]}; şəbəkə bu rolu öz üzərinə götürmür], [Dövlət],),
  ([Müvəqqəti şəxsiyyət sənədi provayderi], [PID provayderi olmadıqda məsafədən şəxsiyyət təsdiqi ilə şəxsiyyət sənədi verir], [Şəbəkənin şəxsiyyət xidməti], [PID provayderi əvəz edir],),
  ([Sənəd verən (#{emph[Attestation Provider]})], [Atribut attestasiyası verir və lazım olduqda ləğv edir], [Qurumlar (universitet, bilet satıcısı kimi)], [Qurumlar və dövlət qurumları],),
  ([Səlahiyyətli mənbə (#{emph[Authentic Source]})], [Məlumatın əsl qeydini saxlayır], [Qurumun öz qeydiyyat sistemi], [Eyni; əlavə olaraq dövlət mənbələri],),
  ([Cüzdan provayderi (#{emph[Wallet Provider]})], [Cüzdanı təqdim edir; cüzdan və açar attestasiyalarını imzalayır], [Cüzdanı təqdim edən təşkilatlar; şəbəkə idarə etmir, siyahıya alır], [Qaydalara uyan hər provayder],),
  ([Yoxlayan tərəf (#{emph[Relying Party]})], [Sənəd istəyir və yoxlayır; qeydiyyatlıdır və əhatə dairəsi məhduddur], [İşəgötürən, vebsayt, giriş qapısı], [Eyni],),
  ([Vasitəçi yoxlayan tərəf (#{emph[Intermediary]})], [Yoxlayan tərəf adından sənəd istəyir və yoxlayır], [Tamga Verify], [Eyni],),
  ([Sənəd sahibi (#{emph[Holder]})], [Sənədi daşıyır, kimə göstərəcəyinə qərar verir], [Tələbə, məzun, istifadəçi], [Vətəndaş],),
  ([Reyestr operatoru], [Ortaq reyestrin bir qovşağını idarə edir], [#{strong[Yoxdur]}], [Ən azı iki müstəqil qurum],),
))

Cədvəlin üç sətri ayrıca izaha layiqdir. #{strong[PID provayderi]} sətri boşdur və bu, şüurlu boşluqdur: şəbəkə dövlətə aid bu rolu doldurmur, yalnız onun yerini saxlayır. #{strong[Müvəqqəti şəxsiyyət sənədi provayderi]} bu boşluğun yaratdığı ehtiyacı müvəqqəti olaraq qarşılayır; verdiyi sənəd PID deyil və dövlətin PID provayderi təyin edildikdə yerini ona verir (ADR-0011). #{strong[Vasitəçi yoxlayan tərəf]} öz yoxlama proqramını işlətmək istəməyən yoxlayan tərəfin adından işi görən xidmətdir; cüzdan şəxsə əsl yoxlayan tərəfin adını göstərir. Şəbəkənin host etdiyi Tamga Verify bu roldadır (Bölmə 11.5).

Bir qurum bir neçə rolu öz üzərinə götürə bilər. Məsələn, bilet satıcısı həm bileti verən, həm də giriş qapısında yoxlayan tərəfdir; hər rol üçün ayrıca qeydiyyatdan keçir və həmin rolun qaydalarına ayrı-ayrılıqda əməl edir (FW-ROLE-0001 §1). Cədvəldə görünməyən bir rol da #{strong[auditordur]}. Bu gün uyğunluq öz bəyanı və açıq uyğunluq testləri ilə göstərilir; dövlətlər qoşulduqda müstəqil uyğunluğu qiymətləndirmə orqanları və milli akkreditasiya gəlir (FW-ROLE-0001 §10; Bölmə 18.6).

#kutu("teknik", [Siyahıların siyahısında ölkə yeri])[
Rolların "boş olsa da, yeri var" qaydası siyahıların siyahısındakı hər ölkə qeydində görünür. Aşağıdakı nümunə şəbəkənin siyahı naşirinin mənbə faylından qısaldılıb; dəyərlər nümunə xarakterlidir və dərc edilən siyahıda format imzalı JWS kimidir.

#kod("json", "{
  \"national_lists\": [
    {
      \"state_code\": \"TR\",
      \"status\": \"ACTIVE\",
      \"membership\": \"TDT_MEMBER\",
      \"list_url\": \"https://trust.tamga.network/tl-tr.jws\",
      \"operator\": {
        \"name\": \"Tamga Network\",
        \"status\": \"provisional\",
        \"on_behalf_of\": \"TR national authority (to be designated)\"
      },
      \"roles\": {
        \"registrar\":        { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"tlso\":             { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"access_ca\":        { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"national_root_ca\": { \"status\": \"ACTIVE\", \"operated_by\": \"Tamga Network (provisional)\" },
        \"pid_provider\":     { \"status\": \"RESERVED\" }
      },
      \"recognition\": { \"mode\": \"unilateral\", \"recognizes\": [\"TR\"] }
    },
    { \"state_code\": \"AZ\", \"status\": \"RESERVED\", \"membership\": \"TDT_MEMBER\" },
    …
  ]
}", baslik: "Nümunə: siyahıların siyahısında Türkiyə üçün yer və ayrılmış yer (qısaldılmış)")

Üç təfərrüat diqqəti çəkir. Operator bloku (#{raw("operator")}) şəbəkənin bu siyahını hələ təyin edilməmiş milli orqan adından müvəqqəti olaraq idarə etdiyini bildirir; siyahı mərhələsi boyu bu sahə boş saxlanıla bilməz (SPEC-TRUST-0001 §3, §8 TL1). PID provayderinin yeri #{raw("RESERVED")} kimi qalır; şəbəkə bu yeri doldurmur (SPEC-TRUST-0001 §8, TL8). Tanınma rejimi #{raw("unilateral")}, yəni birtərəflidir: ölkənin hansı ölkələrin sənədlərini tanıyacağı onun öz qərarıdır. Azərbaycan sətri isə yalnız ayrılmış yerdir; onun içində siyahı ünvanı, imzalayan və ya rol yoxdur. Eyni şəkildə ayrılmış yerlər Qazaxıstan, Qırğızıstan və Özbəkistan (Türk Dövlətləri Təşkilatının üzvləri), həmçinin Macarıstan və Türkmənistan (müşahidəçilər) üçün də var. Bu yerlər heç bir dövlətlə razılaşma və ya danışıqlar barədə bildiriş deyil.
]

== Rolların ayrılması qaydaları

Rolların kimdə olması qədər hansı rolun nəyi edə bilməyəcəyi də vacibdir. Tamga-nın çərçivə sənədləri üç ayırma qaydası qoyur.

Birinci qayda #{strong[qurumun imza açarının qurumda qalmasıdır]}. Şəbəkə host etdiyi heç bir xidmətdə qurumun imza açarını saxlamır; sənəd vermə xidməti şəbəkənin serverində işləsə belə, sənədin imza açarı quruma məxsusdur (FW-ARF-0001 §3; FW-ROLE-0001 §1). Bu qayda host edilən xidmətin rahatlığı ilə qurumun suverenliyi arasındakı gərginliyi həll edir. Qərar qeydi bunun necə ediləcəyini yazır (ADR-0057): qurumun açarı onun öz aparat təhlükəsizlik modulunda və ya seçdiyi etibar xidməti provayderində durur; host edilən xidmət imzanı Cloud Signature Consortium-un \[54\] məsafədən imza interfeysi ilə istəyir və qarşı tərəfə yalnız imzalanacaq məlumatın SHA-256 hash-ini göndərir. Sənədin məzmunu və fərdi məlumat imza xidmətinə getmir. Qayıdan imza qurumun etibar siyahısındakı sertifikatı ilə lokal olaraq yoxlanılır; yoxlanılmasa, sənəd verilmir. Real şəbəkədə qurum açarının xidmət serverində fayldan oxunması konfiqurasiya səviyyəsində rədd edilir. Vəziyyət: məsafədən imzanın kodu və testləri hazırdır, lakin real şəbəkədə ondan istifadə edən qurum hələ yoxdur (#{strong[Planlaşdırılıb]}; təfərrüat Bölmə 7.6).

İkinci qayda #{strong[qeydiyyatın səlahiyyətləndirmə sayılmamasıdır]}. Qeydiyyat qurumu qeydə alır, təsdiq etmir (FW-TF-0001 §1.2, G-A). Universitetin diplom vermək səlahiyyətini ali təhsil qanunvericiliyi, peşə təşkilatının sənəd vermək səlahiyyətini isə onun öz qanunu verir; şəbəkə bu səlahiyyəti nə verir, nə də yoxlayır. Şəbəkənin saxladığı şəbəkə daxilindəki əhatə dairəsidir: bu qurum hansı sənəd növlərini hansı sahələrlə verə bilər? Bu ayrım şəbəkəni hüquqi hakimiyyət kimi davranmaqdan qoruyur və hər dövlətin öz səlahiyyət sistemini olduğu kimi saxlayır.

Üçüncü qaydaya görə #{strong[səlahiyyətli mənbə qurumdadır]}. Sənəddəki məlumatın əsl qeydi, məsələn tələbənin proqramı və ya məzuniyyət tarixi, qurumun öz qeydiyyat sistemində durur. Host edilən sənəd vermə xidməti bu məlumatı saxlamır; sənəd imzalanacağı anda onu qurumun sorğu nöqtəsindən oxuyur, sənəd veriləndən sonra yaddaşdan silir (ADR-0020). Qərar iki yolu müəyyən edir. Birinci yolda qurum şəxsin kimliyinə bağlı təklif yaradır və keçidi özü göndərir; şəxs cüzdanda şəxsiyyət sənədini təqdim edir, kimlik təkliflə uyğun gəlirsə, sənəd verilir. İkinci yolda şəxs cüzdandan qurumu seçir və şəxsiyyət sənədini təqdim edir; xidmət imzalı sorğu ilə qurumun sorğu nöqtəsinə müraciət edir. Hər iki yolda şəbəkə şəxs qeydi saxlamır. Nəzərdən keçirilmiş alternativ şəxs qeydlərini şəbəkənin qurum konsolunda saxlamaq idi; bu yol rədd edildi və konsoldakı qeydiyyat dəftəri yalnız sandbox-dakı sınaq mənbəyi kimi qaldı. Axının təfərrüatı Bölmə 9.2-dədir.

== Komponentlər və xidmət ünvanları

Rolların arxasında işləyən proqram komponentləri iki qrupa bölünür. Bir qrup #{strong[açıq mənbəli kitabxanalardır]}: sənəd formatlarını oxuyan və yazan, etibar siyahılarını yoxlayan, sənəd verən və yoxlayan paketlər. Onlar Apache-2.0 lisenziyası ilə hamıya açıqdır və qurum öz sənəd vermə və ya yoxlama proqramını bu paketlərlə qura bilər. Digər qrup #{strong[host edilən istinad xidmətləridir]}: şəbəkənin özünün idarə etdiyi sənəd vermə xidməti, Qurum Konsolu, Tamga Verify, şəxsiyyət xidməti, siyahı naşiri və kataloq. Kitabxanalar açıqdır, host edilən xidmətlər operatordadır; lakin qaydalar hər ikisi üçün eynidir (FW-ARF-0001 §4.1). Qurum host edilən xidmətdən istifadə etməyə borclu deyil.

Cədvəl 8 xidmətləri ünvanları ilə birlikdə verir. Bu nəşrin hazırlandığı tarixdə cədvəldəki xidmətlərin hamısı canlıdır (#{strong[İşləyir]}); #{raw("*.sandbox.tamga.network")} altındakı test nüsxələri də.

#tablo([#{strong[Cədvəl 8.]} Komponentlər, onların vəzifələri və xidmət ünvanları.], (17fr, 45fr, 48fr), ([Komponent], [Vəzifə], [Ünvan​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​],), (
  ([Tanıtım saytı], [Şəbəkənin təqdimatı; kök açarların barmaq izləri], [#{raw("tamga.network")} (#{raw("/trust-anchor")})],),
  ([Çərçivə sənədləri], [Tamga ARF və onun əlavələri], [#{raw("arf.tamga.network")}],),
  ([Tərtibatçı sənədləri], [Bələdçilər, anlayışlar, spesifikasiyalar, qərar qeydləri], [#{raw("docs.tamga.network")}],),
  ([Etibar siyahısı naşiri], [Siyahıların siyahısı, ölkə siyahıları, lövbər jurnalı, arxiv], [#{raw("trust.tamga.network")}],),
  ([Sənəd növləri kataloqu], [Sənəd növlərinin təsvirləri və sxemləri, dəyişməz fayllar], [#{raw("schemas.tamga.network")}],),
  ([Host edilən sənəd vermə xidməti], [Qurumlar adından OpenID4VCI ilə sənəd vermə, ləğv siyahısının dərci], [#{raw("issuer.tamga.network/{qurum}")}],),
  ([Ləğv siyahıları], [Sənəd status siyahıları], [#{raw("status.tamga.network")}],),
  ([Qurum Konsolu], [Qurum əməkdaşlarının sənədləri, qeydləri, açarları idarə etdiyi ekran], [#{raw("console.tamga.network")}],),
  ([Tamga Verify], [Host edilən vasitəçi yoxlayan tərəf], [#{raw("verify.tamga.network")}],),
  ([Şəxsiyyət xidməti], [Müvəqqəti şəxsiyyət sənədi; psevdonim toxumu], [#{raw("id.tamga.network")}],),
  ([Sandbox], [Eyni xidmətlərin ayrıca köklə işləyən test nüsxələri], [#{raw("*.sandbox.tamga.network")}],),
))

Cədvəlin altına bir qayda əlavə etmək lazımdır. #{strong[Domen adı xidmətin ünvanıdır, identifikator deyil]} (FW-ARF-0001 §4.2). Qurum host edilən xidmətdən öz domen adındakı xidmətə keçdikdə etibar siyahısındakı qeydində yalnız ünvan dəyişir; qurumun identifikatoru və verdiyi sənədlər dəyişmir. Qurumun identifikatoru qurumun sertifikatından törədilir (Bölmə 6.7). Bu qayda iki şeyi birdən qoruyur. Qurumu host edilən xidmətdən asılı olmaqdan xilas edir (G10) və şəbəkənin domen adlarının bir gün fonda təhvil verilməsinin heç bir sənədə təsir etməməsini təmin edir (G8).

Şəkil 6 komponentləri və onlar arasındakı axınları göstərir. Oxların üzərindəki protokol adları sonrakı bölmələrdə bir-bir açılır.

#sekil(6, [Komponentlər və məlumat axını], "figures/wp-az/sekil-6.svg", yarim: false)

== Şəbəkə və cüzdanlar

Etibar şəbəkəsinin cüzdanlarla münasibəti kənardan baxan üçün çox vaxt ən çaşdırıcı mövzudur. Tamga-nın bu mövzudakı qərarı bir cümləyə sığır: şəbəkə cüzdan idarə etmir, #{strong[cüzdanları siyahıya alır]} (ADR-0042).

Şəbəkənin cüzdanlarla münasibəti üç şeydən ibarətdir. Birincisi qaydalardır: cüzdanın açarları necə saxlayacağı, razılıq ekranında nəyi göstərəcəyi, tarixçəni harada saxlayacağı kimi qaydalar spesifikasiyada və çərçivə sənədlərində yazılıb (Bölmə 13). İkincisi açıq paketlərdir: cüzdan tərtibatçısı sənəd almaq, lokal yoxlama aparmaq və sənəd təqdim etmək üçün şəbəkənin cüzdan nüvəsi paketindən istifadə edə bilər. Üçüncüsü etibar siyahısındakı #{strong[cüzdan provayderi qeydidir]}. Siyahıların siyahısındakı #{raw("wallet_providers[]")} sahəsi tanınan hər cüzdan provayderinin identifikatorunu, imza sertifikatlarını və cüzdan həllərini daşıyır. Sənəd verən sənədi verməzdən əvvəl cüzdanın təqdim etdiyi sübutun bu siyahıdakı provayderdən gəlib-gəlmədiyini yoxlayır; siyahıda olmayan provayderin cüzdanına sənəd verilmir (Bölmə 9.3).

Niyə şəbəkə öz cüzdanını idarə etmir? Qərar qeydi bunu Aİ-nin rol bölgüsü ilə əsaslandırır: Aİ strukturunda hər cüzdanı onu təqdim edən təşkilat idarə edir, etibar çərçivəsi isə cüzdan provayderlərini yalnız siyahıya alır. Şəbəkə cüzdanın provayderini özü idarə etsəydi, neytrallığı pozulardı; fonda təhvil günü də cüzdanın xidməti şəbəkədən asılı qalardı. Nəzərdən keçirilmiş digər variant cüzdanlar üçün ayrıca test mühiti qurmaq idi; bu da rədd edildi, çünki eyni qurumlar, yoxlayan tərəf və qaydalar iki dəfə qurulmuş olardı. Sandbox təkdir və şəbəkəyə məxsusdur: cüzdan tərtibatçısı öz provayderini sandbox siyahısında qeydə aldırır və cüzdanını oradakı nümunə qurumlarla, şəxsiyyət xidməti və yoxlayan tərəflə sınaqdan keçirir. Şəbəkənin domen adlarında cüzdana aid heç bir xidmət işləmir.

Şəbəkənin etibar siyahısına daxil olan ilk cüzdan Tamga Wallet-dir; ayrıca məhsul kimi öz deposunda inkişaf edir, provayder xidmətini öz domen adında idarə edir və siyahıya hər digər cüzdanın daxil olacağı yolla, eyni qaydalarla daxil olub. Provayder qeydi real şəbəkə və sandbox siyahılarında aktivdir (#{strong[İşləyir]}; FW-ARF-0001 §2.8). Şəbəkənin interfeysləri və sənədləri tək bir cüzdanı önə çəkmir; bu sənəd də bundan sonra cüzdanları ümumi adla çəkir.

Siyahıya alınmanın şəxsə görünən qarşılığı da var. Aİ-nin cüzdanlar üçün müəyyən etdiyi etibar nişanı Aİ-dən kənarda istifadə edilə bilmədiyi üçün şəbəkə öz siyahısındakı cüzdanlar üçün yazılı göstərici müəyyən edir: "Tamga Network-da siyahıdadır" (ADR-0049). Göstəricinin loqosu yoxdur; Aİ ulduzları, Aİ rəngləri və ya "etibar nişanı" sözü istifadə edilmir. Şəxs göstəriciyə toxunduqda imzalı siyahıdakı provayder qeydini görür; cüzdan vahidi ləğv edilərsə və ya provayder siyahıdan çıxarsa, göstərici gizlədilir (Bölmə 13.6).

== İstiqamət qaydaları

Komponentlərin bir-birinə necə bağlandığı qədər məlumatın hansı istiqamətdə axdığı da təhlükəsizlik və məxfilik qərarıdır. Əsas çərçivə sənədi bunu dörd qısa qayda ilə sabitləyir (FW-ARF-0001 §4.5).

+ #{strong[Etibar siyahılarına yalnız siyahı naşiri yazır.]} Sənəd vermə xidmətləri siyahıya yaza bilməz; yalnız lövbər jurnalına qeyd əlavə edilməsini istəyə bilər. Bu qayda sənəd vermə xidməti ələ keçirilsə belə, hücumçunun özünü siyahıya səlahiyyətli qurum kimi əlavə edə bilməməsini təmin edir.
+ #{strong[Oxuyanlar siyahını yoxlamadan istifadə etmir.]} Yoxlayan tərəflər və cüzdanlar heç bir siyahı qeydini imzasını, versiya zəncirini və aktuallığını yoxlamadan istifadə etmir. Açıq paketlər bu yoxlamaları hazır tətbiq edir; bütün müştərilər etibar suallarını tək bir interfeys vasitəsilə verir (ADR-0015; Bölmə 6.6). Beləliklə siyahının geri çevrilmiş köhnə versiyası və ya imzasız nüsxəsi səssizcə qəbul edilə bilməz.
+ #{strong[Ləğv siyahısı hər yoxlamada yüklənmir.]} Yoxlayan tərəf ləğv siyahılarını əvvəlcədən və toplu şəkildə yükləyir. Bu qayda Bölmə 2.3-dəki "evə zəng etmə" probleminin arxitekturadakı cavabıdır: yoxlayan tərəf sənədi yoxlayarkən sənədi verənə və ya onun serverinə həmin sənəd üçün sorğu göndərmir, buna görə sənədi verən qurum hansı sənədin nə vaxt yoxlandığını öyrənə bilmir (Bölmə 12.4).
+ #{strong[Heç bir Tamga xidməti IP ünvanı qeyd etmir.]} Qeydlərdə sənəd sahələrinin dəyərləri və sənədin ləğv siyahısındakı mövqeyi də yer almır. Bu qayda P2-nin xidmət jurnallarına tətbiqidir: jurnal şəxsi müəyyən etməyə yetəcək heç bir iz daşımamalıdır.

Bu dörd qayda birlikdə oxunduqda şəbəkənin bütün arxitekturasının xülasəsini verir. Etibar tək istiqamətdən, imzalı dərclərdən gəlir. Oxuyan tərəf hər şeyi özü yoxlayır. Yoxlama zamanı mənbəyə müraciət edilmir. Və ortaq qeydlər şəxsi tanımır. Sonrakı bölmələr bu skeletin hər hissəsini təfərrüatlandırır: Bölmə 6 etibar siyahılarını və lövbər jurnalını, Bölmə 7 qurum sertifikatlarını, Bölmə 8 isə sənəd formatlarını izah edir.

= Etibar Modeli: İmzalı Etibar Siyahıları və Lövbər Jurnalı

Timur İstanbulda bir şirkətin işə qəbul üzrə məsul şəxsidir. Masasına müraciət gəlir; müraciət edən Aynur diplomunu kağız şəklində deyil, telefonundan göndərib. Timurun proqramı sənədi açır və imzanın etibarlı olduğunu bildirir. Lakin Timurun ağlına gələn ilk sual imza ilə bağlı deyil: "Bu imzanı atan Nümunə Universiteti həqiqətən universitetdirmi, diplom verməyə səlahiyyəti varmı, bu gün hələ də fəaliyyətdədirmi?" Bu bölmə Tamga Network-ün bu suala necə cavab verdiyini izah edir. Cavabın mərkəzində iki struktur durur: hər kəsin yükləyib yoxlaya bildiyi imzalı #{strong[etibar siyahıları]} (#{emph[trust lists]}) və bu siyahıların yanında saxlanılan, saatbasaat irəliləyən #{strong[lövbər jurnalı]} (#{emph[anchor log]}). Bu gün şəbəkədəki bütün etibar bu iki struktura əsaslanır; ortaq reyestrin (zəncirin) kodu yazılıb və test edilib, lakin istehsalatda yoxdur və söndürülüb, ikinci müstəqil operator olmadan da işə salınmır (Bölmə 19).

== İmza nəyi sübut edir, siyahı nəyi sübut edir

Rəqəmsal imza yalnız bir şeyi sübut edir: sənəd müəyyən gizli açarın sahibi tərəfindən imzalanıb və o andan bəri dəyişməyib. İmzanı yoxlayan proqramın əlində yalnız açıq açar var; bu açarın "Nümunə Universiteti"nə məxsus olduğunu imzanın özü deyə bilməz. Hücumçu da imzanı sındırmağa çalışmır; yoxlayan tərəfi öz açarını düzgün açar kimi qəbul etməyə məcbur etməyə çalışır. Buna görə hər etibar infrastrukturuna ikinci qat lazımdır: açar ilə qurum arasındakı bağı quran və həmin qurumun nəyə səlahiyyətli olduğunu bildirən qeyd. Silsilənin altıncı yazısı \[71\] bu problemin tarixini və Aİ-dəki həllini ətraflı izah edir; burada Tamga-nın seçdiyi yolu izləyirik.

Tamga-da bu qeyd imzalı siyahıdır. Siyahı deyir: "bu sertifikatın sahibi bu qurumdur, bu növləri bu tarixdən bəri verməyə səlahiyyətlidir, bugünkü vəziyyəti belədir". Yoxlayan tərəf quruma zəng etmir; siyahını əvvəlcədən yükləyib. Qayda Aİ-nin etibar siyahısı modeli ilə eynidir (FW-ARF-0001 §6.1); fərq ondadır ki, Tamga-da bu gün siyahını dövlət adından müvəqqəti olaraq şəbəkə dərc edir və bu, siyahıda açıq yazılır.

== Siyahıların siyahısı və ölkə siyahıları

Etibar ikiqatlı fayl strukturunda durur (Şəkil 7). Dərc edilən fayllar Cədvəl 9-da toplanıb. Ən yuxarıda #{strong[siyahıların siyahısı]} (#{raw("lotl")}, #{emph[List of Trusted Lists]}) var. Bu fayl hər ölkə siyahısının ünvanını, həmin siyahını imzalamağa səlahiyyətli açarları və ölkənin tanınma parametrlərini göstərir. Şəbəkə səviyyəsində ortaq olan qeydlər də buradadır: şəbəkənin ortaq sənəd növləri və kataloq ünvanı, tanınan cüzdan provayderləri, qəbul edilmiş sıfır bilik sübutu sxemləri və kateqoriya lüğəti. Şəxsiyyət məlumatları provayderlərinə (PID) ayrılmış sahə boşdur; Tamga PID vermir (SPEC-TRUST-0001 §3, TL8).

Aşağıda #{strong[ölkə siyahıları]} (#{raw("tl-<cc>")}) var. Ölkə siyahısı həmin ölkənin kök sertifikatlarını, sənəd verənlərini (sinifləri, təminat səviyyələri və hansı növləri verməyə səlahiyyətli olmaları ilə birlikdə), qeydiyyatlı yoxlayan tərəflərini və milli sənəd növlərini daşıyır (SPEC-TRUST-0001 §4). Hər ölkə yeri Aİ arxitekturasındakı rolların hər biri üçün ayrıca yer saxlayır: siyahı operatoru, qeydiyyat qurumu, şəxsiyyət məlumatları provayderi, giriş sertifikatı provayderi və milli kök sertifikat orqanı. Rol boş qalsa da, yeri var.

Bu gün yalnız Türkiyə üçün yer aktivdir. Türk Dövlətləri Təşkilatının üzvləri Azərbaycan, Qazaxıstan, Qırğızıstan və Özbəkistan, həmçinin müşahidəçilər Macarıstan və Türkmənistan üçün siyahıların siyahısında yalnız yer ayrılıb; bu, heç bir dövlətlə razılaşma və ya danışıqlar barədə bildiriş deyil. Aynurun Bakıda aldığı bakalavr diplomu buna görə bu gün şəbəkə vasitəsilə yoxlanıla bilməz; Azərbaycan üçün yer bir dövlət qoşulub öz siyahısını dərc etdikdə dolur. Türkiyə siyahısının #{raw("operator")} sahəsi operatorun müvəqqəti olduğunu (#{raw("status: \"provisional\"")}) və kimin adından işlədiyini (#{raw("on_behalf_of")}) qeydə alır; bu sahə boş saxlanıla bilməz (TL1). Hər siyahı həmçinin #{raw("environment")} sahəsində #{raw("production")} və ya #{raw("sandbox")} yazır; real şəbəkəyə bağlı cüzdan sandbox siyahısını yükləmir (ADR-0038).

#sekil(7, [Siyahıların siyahısı, ölkə siyahıları və qeydlər], "figures/wp-az/sekil-7.svg", yarim: false)

#tablo([#{strong[Cədvəl 9.]} #{raw("trust.tamga.network")} ünvanında dərc edilən əsas fayllar (SPEC-TRUST-0001 §2).], (48fr, 48fr, 18fr), ([Fayl​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Məzmun], [Vəziyyət],), (
  ([#{raw("lotl.jws")} (#{raw("lotl.json")} oxunaqlı nüsxə)], [siyahıların siyahısı: ölkə yerləri və imzalayanları, ortaq növlər, cüzdan provayderləri, ZK sxemləri], [işləyir],),
  ([#{raw("tl-tr.jws")} (#{raw("tl-tr.json")})], [Türkiyə: kök sertifikat, sənəd verənlər və onların səlahiyyətləri, yoxlayan tərəflər və giriş qapısı qrupları], [işləyir],),
  ([#{raw("tl-<cc>.jws")}], [digər ölkə yerləri; bu gün boşdur, yalnız yer ayrılıb], [ayrılıb],),
  ([#{raw("anchors.jsonl")}], [lövbər jurnalı: hər sətir ayrıca imzalıdır, ən azı saatda bir sətir], [işləyir],),
  ([#{raw("keys/root-fingerprints.json")}], [siyahıların siyahısını imzalayan sertifikatın və milli kökün barmaq izləri], [işləyir],),
  ([#{raw("wrprc/")}, #{raw("status/wrprc/")}], [qeydiyyat sertifikatları və onların 1 bitlik status siyahısı (Bölmə 7.5)], [işləyir],),
  ([#{raw("zk/<sxem>")}], [siyahıda adı çəkilən ZK sxem faylları], [işləyir],),
  ([#{raw("lote/<növ>.jws")}], [ETSI TS 119 602 görünüşləri (Bölmə 6.8)], [planlaşdırılıb (generator hazırdır, dərc parametrlə açılır)],),
  ([#{raw("tl-<cc>.xml")}, #{raw("tl-<cc>.sha2")}], [ETSI TS 119 612 XML görünüşü (Bölmə 6.8)], [sandbox-da işləyir, real şəbəkədə planlaşdırılıb],),
  ([#{raw("archive/")}], [hər köhnə siyahı versiyası və jurnal arxivi; heç nə silinmir], [işləyir],),
  ([#{raw("CHANGELOG.md")}], [hamıya açıq dəyişikliklər jurnalı], [işləyir],),
))

#kutu("teknik", [Sənəd verən qeydi necə görünür])[
Ölkə siyahısındakı hər sənəd verən qeydi bir sıra sabit sahə daşıyır: qurumun identifikatoru və sertifikatın barmaq izi, sinfi və təminat səviyyəsi, hansı sənəd növlərinə hansı tarix aralığında səlahiyyətli olduğu, ləğv siyahılarının ünvan kökü və status tarixçəsi. Aİ-nin ortaq qeydiyyat məlumatları toplusu (rəsmi ad, identifikasiya nömrəsi, ünvan, əlaqə, məlumatların qorunması orqanı) da eyni qeyddədir (ADR-0024). Aşağıdakı nümunə uydurma Nümunə Universiteti üçündür və qısaldılıb. #{raw("issuer_id")} və barmaq izi bu sənəd üçün yaradılmış nümunə P-256 sertifikatından həqiqətən hesablanıb; #{raw("schema_id")} dəyərləri yazı günündəki kataloqdan götürülüb və yenidən hesablanaraq yoxlanılıb. Dəyərlər nümunədir.

#kod("json", "{
  \"issuer_id\": \"0xe41abbb087864814f3de55b27c9ce923537485bcc08e349c7c0b2209e8db1b60\",
  \"slug\": \"example-university\",
  \"legal_name\": \"Örnek Üniversitesi\",
  \"category\": \"EDUCATION\",
  \"assurance\": \"I2\",
  \"class\": \"EAA\",
  \"cert_fingerprint_sha256\": \"fb58ea8de393d34d2b73ce7672a08c3e2908028edbd5fce9a4c10fb4ad2577ce\",
  \"issuer_url\": \"https://issuer.tamga.network/example-university\",
  \"status\": \"ACTIVE\",
  \"valid_from\": \"2026-09-01T00:00:00Z\",
  \"status_history\": [
    { \"status\": \"ACTIVE\", \"since\": \"2026-09-01T00:00:00Z\", \"reason\": \"initial-registration\" }
  ],
  \"schema_authorizations\": [
    { \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
      \"schema_id\": \"0x9d6d0e873ee0466cf1cdc8a8bd73f9435022635f0b6e46cd478e70f6e6aed26b\",
      \"allowed\": true, \"valid_from\": \"2026-09-01T00:00:00Z\", \"valid_until\": null }
  ],
  \"identifiers\": [ { \"scheme\": \"TR-VKN\", \"value\": \"…\" } ],
  \"delegate_keys\": [ { \"fingerprint_sha256\": \"…\", \"purpose\": \"status_list\", \"status\": \"ACTIVE\" } ]
}", baslik: "Nümunə: tl-tr daxilindən qısaldılmış sənəd verən qeydi")

Səlahiyyət #{strong[zaman pəncərəlidir]}: #{raw("schema_authorizations")} hər növ üçün başlanğıc və istəyə bağlı bitmə tarixi daşıyır. Yoxlayan tərəf qurumun sənədi verdiyi anda (#{raw("iat")}) bu növə səlahiyyətli olub-olmadığına baxır. Bağlanan universitetin əvvəllər verdiyi diplom buna görə etibarlı qalır; yeni sənəd verilməsi isə qurumun statusu dəyişdiyi anda dayanır (SPEC-TRUST-0001 §4; Bölmə 11.3).
]

== Siyahı qaydaları

İmzalı olmaq kifayət deyil; oxucu əlindəki versiyanın ən aktual və həqiqi versiya olduğuna əmin ola bilməlidir. Siyahılar bunun üçün bir neçə sadə qaydaya əməl edir (FW-ARF-0001 §6.3; SPEC-TRUST-0001 §1, §8). Hər siyahının #{strong[versiya nömrəsi]} var və bu nömrə yalnız artır. Hər yeni versiya özündən əvvəlkinin imzalı faylının SHA-256 hash-ini #{raw("previous_version_hash")} sahəsində daşıyır; versiyalar beləliklə zəncir kimi bir-birinə bağlanır. Siyahı qeydi #{strong[silmir]}: qurum dayandırıldıqda və ya siyahıdan çıxarıldıqda onun qeydi yerində qalır, yalnız status dəyişikliyi #{raw("status_history")} tarixçəsinə əlavə olunur. Köhnə sənədlər yalnız belə öz verildikləri tarixə görə qiymətləndirilə bilər.

Siyahıların #{strong[aktuallıq təqvimi]} var. Hər siyahı növbəti yenilənmə tarixini (#{raw("next_update")}) daşıyır və bu tarix ən çoxu 90 gün sonradır; dəyişiklik olmasa da, siyahı bu müddət ərzində yenidən imzalanır. Dəyişiklik isə ən gec 24 saat ərzində dərc edilir. Müddəti keçmiş və ya əlçatmaz siyahı ilə aparılan yoxlama nə "qəbul", nə də "rədd" verir; nəticə "yoxlanıla bilmədi"dir (TL5); Timur üçün "bu diplom saxtadır" ilə "hazırda yoxlaya bilmirəm" eyni şey deyil (Bölmə 11.4). Yükləyici tanımadığı format versiyasında da dayanır, səssizcə səhv şərh etmir (TL6).

Siyahı və lövbər jurnalı imzası üçün qayda #{strong[ən azı iki növbəli sertifikat]} tələb edir: açar dəyişikliyi ən azı 30 gün əvvəlcədən elan edilir və yeni açar köhnəsi ilə imzalanaraq təqdim olunur (TL3). Yazı günündə dərcdəki siyahılarda tək imza sertifikatı aktivdir; ikinci sertifikatın istifadəyə verilməsi və imza açarının aparat açar anbarına köçürülməsi spesifikasiyada açıq iş kimi qeydə alınıb (SPEC-TRUST-0001, Açıq Məsələlər 3). #{emph[Vəziyyət: planlaşdırılıb.]} Hər dəyişiklik həmçinin hamıya açıq dəyişikliklər jurnalına yazılır.

#kutu("teknik", [Versiya zənciri və geri çevirmənin aşkarlanması])[
Yoxlayan tərəf hər siyahının ən son qəbul etdiyi versiyasını və həmin versiyanın hash-ini yadda saxlayır. Yeni gələn versiya üç qaydaya görə qiymətləndirilir (paketlərdəki #{raw("TrustSource")} yükləyicisi, TL2):

#formul[$ h_n &= "SHA-256"("siyahı"_n ".jws") \
"prev"("siyahı"_(n+1)) &= h_n \
v_"gələn" < v_"bilinən" &=> "rədd (geri çevirmə)" \
v_"gələn" = v_"bilinən" " və " h_"gələn" != h_"bilinən" &=> "rədd (eyni versiya, fərqli məzmun)" $]

Hash siyahıda #{raw("sha256:")} prefiksli onaltılıq sətir kimi yazılır. Hücumçu yoxlayan tərəfə köhnə siyahını, məsələn qurumun hələ dayandırılmadığı versiyanı təqdim edərsə, versiya nömrəsi geridə qaldığı üçün siyahı rədd edilir. Versiya nömrəsini dəyişmək imzanı pozur; imzanı yenidən atmaq üçün isə siyahıların siyahısının imza açarı lazımdır.
]

== Lövbər jurnalı

Şəbəkədə siyahılardan qat-qat tez-tez dəyişən iki şey var: bir neçə dəqiqədən bir yenidən dərc edilən qurumların ləğv siyahıları (Bölmə 12.5) və sənəd növlərinin təsvirləri. Bunları ölkə siyahısına yazmaq siyahını şişirdərdi; Tamga buna görə ikinci struktur saxlayır: #{strong[lövbər jurnalı]} (#{raw("anchors.jsonl")}).

Jurnalın hər sətri öz-özlüyündə imzalı JWS-dir. Sətir sıra nömrəsi (#{raw("seq")}), əvvəlki sətrin SHA-256 hash-i (#{raw("previous_hash")}), vaxt möhürü və növ daşıyır. Dörd növ var (SPEC-TRUST-0001 §5): ləğv siyahısının dərci (#{raw("status_list")}: hansı qurumun hansı siyahısı, neçənci versiya, məzmunun hash-i), sənəd növü təsvirinin hash-i (#{raw("schema")}), saatlıq həyat siqnalı (#{raw("heartbeat")}) və arxivləmə zamanı yazılan nəzarət nöqtəsi (#{raw("checkpoint")}). Jurnala saatda ən azı bir sətir düşür; dəyişiklik olmasa belə, həyat siqnalı yazılır. Sətirlər silinmir, jurnal hamıya açıqdır və sətirlərdə fərdi məlumat və ya sənəd hash-i olmur (TL11). Jurnalın imza açarları da siyahıların siyahısında dərc edilir.

Jurnalın fayda verdiyi yer ləğv siyahılarının geri çevrilməsidir. Tutaq ki, kimsə ləğv edilmiş sənəddən istifadə etmək üçün yoxlayan tərəfə həmin ləğvdən əvvəlki ləğv siyahısını təqdim edir. Siyahı qurumun imzasını daşıdığı üçün imza etibarlıdır. Lakin lövbər jurnalı həmin siyahının son versiyasının nömrəsini və məzmun hash-ini qeydə alıb; yoxlayan tərəf aldığı siyahının hash-ini jurnaldakı hash ilə müqayisə edir və uyğun gəlməyən siyahıdan istifadə etmir (SPEC-TRUST-0001 §5; yoxlama xəttində D addımı). Jurnalın özü də saatlıq ritmlə köhnəlməyə qarşı qorunur: son sətri çox köhnə olan jurnal siyahını köhnəlmiş sayır (Şəkil 8).

Jurnal böyüdükcə yükləmə müddəti uzanır. Buna görə müəyyən həddə sətirlər arxivə köçürülür və yeni jurnal arxivin son sətrinə və arxiv faylının hash-inə bağlı, arxivin yaratdığı son vəziyyəti daşıyan imzalı nəzarət nöqtəsi ilə başlayır. Zəncir qırılmır, sətir silinmir, tam tarixçə arxivlərdən yenidən qurula bilər (TL12). #{emph[Vəziyyət: işləyir.]}

#sekil(8, [Hash zəncirli siyahı versiyaları və lövbər jurnalı: geri çevrilmiş dərc necə aşkarlanır], "figures/wp-az/sekil-8.svg", yarim: false)

#kutu("teknik", [Lövbər jurnalından bir sətir])[
Aşağıdakı sətir qurumun ləğv siyahısı dərcinin jurnala necə yazıldığını göstərir. Format real jurnaldakı ilə eynidir; dəyərlər nümunədir və qısaldılıb. Siyahının ünvanı (#{raw("list_uri")}) qeyri-şəffafdır: qurumu, ili və ya tələbə qrupunu üzə çıxarmır (S8).

#kod("json", "{
  \"seq\": 51588,
  \"previous_hash\": \"sha256:73f6842108c0…a694c408\",
  \"ts\": \"2026-11-03T23:10:06Z\",
  \"kind\": \"status_list\",
  \"list_id\": \"0x…4101234c731b7165\",
  \"issuer_id\": \"0xe41abbb0…e8db1b60\",
  \"list_uri\": \"https://status.tamga.network/4101234c731b7165\",
  \"content_hash\": \"sha256:f037c5749daa…e9f4851d50\",
  \"list_version\": 15294
}", baslik: "Nümunə: lövbər jurnalında ləğv siyahısının dərci (JWS yükü, açılmış)")
]

== Ayrıca kanallı etibar lövbəri

Bütün bu zəncirin başlanğıc nöqtəsi olmalıdır. Cüzdan və yoxlayan tərəf əvvəldən yalnız #{strong[bir şeyə]} etibar edir: siyahıların siyahısını imzalayan sertifikatın barmaq izinə. Bu dəyər #{strong[etibar lövbəri]} (#{emph[trust anchor]}) adlanır. Qalan hər şeyi, yəni ölkə siyahılarının imzalayanlarını, qurumları, yoxlayan tərəfləri və cüzdan provayderlərini imzası bu lövbərə bağlanan siyahılar bildirir.

Lövbər siyahıların özündən ayrıca kanalla (#{emph[out-of-band]}) dərc edilir. Eyni dəyər üç yerdə eyni şəkildə görünür: tanıtım saytının etibar lövbəri səhifəsi (#{raw("tamga.network/trust-anchor")}), etibar siyahısı saytındakı açar faylı (#{raw("keys/root-fingerprints.json")}) və qoşulma müqavilələri (FW-ARF-0001 §6.1); üç yeri birdən dəyişmək tək yeri dəyişməkdən qat-qat çətindir. Siyahıdakı cüzdanlar bu barmaq izini tətbiqin içində sabitləyir. Sandbox-un ayrıca kökü var və real şəbəkədəki heç bir cüzdan və ya yoxlayan tərəf ona etibar etmir (ADR-0038).

== Tək interfeys: TrustSource

Siyahıları oxumaq imza, versiya zənciri, aktuallıq, format versiyası və lövbər jurnalı qaydalarının birlikdə tətbiq edilməsini tələb edir; bunları hər müştəridə ayrıca yazmaq bir-birindən ayrılan tətbiqlər yaradır. Tamga buna görə bütün etibar suallarının tək bir interfeys vasitəsilə verilməsini qərara bağladı (ADR-0015): #{raw("TrustSource")}. Sənəd vermə xidməti, yoxlayan tərəf, şəxsiyyət xidməti və cüzdan eyni sualları eyni interfeysə verir: "Bu qurum bu sənədi verdiyi tarixdə qəbul edilə bilərdimi?", "Bu növə səlahiyyətli idimi?", "Bu yoxlayan tərəfin qeydi nədir?", "Bu açar siyahıdakı cüzdan provayderinə məxsusdurmu?", "Siyahılar nə qədər aktualdır?" (SPEC-TRUST-0001 §6). İnterfeysdən kənarda heç bir komponent siyahı fayllarını şərh etmir (TL4).

İnterfeysin cavabı üç dəyərlidir: #{raw("YES")}, #{raw("NO")} və ya #{raw("UNKNOWN")}. Naməlum cavab yoxlamada "yoxlanıla bilmədi" nəticəsinə çevrilir; heç vaxt rədd kimi göstərilmir. İnterfeysin ikinci qazancı gələcəyə yönəlib: bu gün onun arxasında imzalı siyahılar durur, ortaq reyestr qurularsa, eyni interfeysin arxasına reyestr keçir və cüzdanın, yoxlayan tərəfin və ya sənəd vermə kodunun heç biri dəyişmir (Bölmə 19.8).

Qərar qəbul edilərkən üç alternativ çəkildi: cüzdanın siyahını öz kodunda ayrıca yoxlaması (iki tətbiq zamanla ayrılardı), cüzdana server kitabxanalarını daşıyan uyğunlaşdırmalar əlavə etmək (kövrək idi) və cüzdanın hər etibar sualını şəbəkənin serverinə verməsi. Sonuncusu ən asanı idi və rədd edildi: həmin server hansı cüzdanın hansı qurumu nə vaxt soruşduğunu öyrənərdi. Seçilmiş yolda yoxlama nüvəsi platformadan asılı olmayan alt paketdir və siyahılar toplu yüklənir; müştəri şəbəkəyə şəxslə əlaqələndirilə biləcək çağırış etmir (ADR-0015, TS3 \[12\]).

== İdentifikatorlar

Etibar şəbəkəsində adlar dəyişə, domen adları əldən-ələ keçə, operatorlar təhvil verilə bilər. İdentifikatorlar bundan təsirlənməməlidir. Tamga-dakı daimi identifikatorlar buna görə sertifikatların və növ adlarının özündən törədilir; qurumun adı və ya şəbəkənin domen adı bu hesablamaya daxil olmur (FW-ARF-0001 §5.3; SPEC-ID-0002 §2).

#kutu("teknik", [İdentifikatorların törədilməsi])[
Kök sertifikat və qurum identifikatorları ölkə kodunun UTF-8 baytları ilə sertifikatın DER kodlamasının SHA-256 hash-i ardıcıl birləşdirilib Keccak-256 ilə hash-lənərək alınır. Sənəd növünün identifikatoru növ adının (#{raw("vct")}) özünün Keccak-256 hash-idir:

#formul[$ "ca_id" &= "keccak256"("utf8"("cc") || "SHA-256"("DER"("kök sertifikat"))) \
"issuer_id" &= "keccak256"("utf8"("cc") || "SHA-256"("DER"("qurum sertifikatı"))) \
"schema_id" &= "keccak256"("utf8"("vct")) $]

Burada $||$ ardıcıl birləşdirmə deməkdir. Nümunə dəyərlərlə: Bölmə 6.2-dəki qeyddə qurum sertifikatının barmaq izi #{raw("fb58ea8d…2577ce")}, ölkə kodu #{raw("TR")} olduqda #{raw("issuer_id = 0xe41abbb0…e8db1b60")} alınır. Diplom növünün adı #{raw("urn:tamga:edu:DiplomaCredential:1")} üçün #{raw("schema_id = 0x9d6d0e87…e6aed26b")} alınır; bu dəyər kataloqdakı qeydlə eynidir.

Niyə SHA-256 deyil, Keccak-256? Ortaq reyestr qurulduqda identifikatorlar müqavilələrdəki qeydlərin açarı olacaq, EVM mühitində daxili hash funksiyası isə Keccak-256-dır. Siyahı mərhələsində törədilən identifikator reyestr mərhələsində heç dəyişmədən eyni qeydin açarı olur (SPEC-TRUST-0001 §7; Bölmə 19).
]

#tablo([#{strong[Cədvəl 10.]} İdentifikatorlar: necə yaranır, nə vaxt dəyişir (FW-ARF-0001 §5.3).], (32fr, 35fr, 41fr), ([İdentifikator], [Necə yaranır], [Nə vaxt dəyişir],), (
  ([Kök sertifikatın identifikatoru (#{raw("ca_id")})], [ölkə kodu + kök sertifikatın barmaq izi], [kök dəyişərsə],),
  ([Qurumun identifikatoru (#{raw("issuer_id")})], [ölkə kodu + qurum sertifikatının barmaq izi], [sertifikat yeniləndikdə; yeni qeyd köhnəsinə varis (#{raw("successor_id")}) kimi bağlanır],),
  ([Sənəd növünün identifikatoru (#{raw("vct")}, #{raw("schema_id")})], [#{raw("urn:tamga:<sahə>:<Növ>:<əsas versiya>")} və onun hash-i], [yalnız əsas versiya dəyişdikdə],),
  ([Yoxlayan tərəfin müştəri identifikatoru (#{raw("client_id")})], [giriş sertifikatının hash-i (#{raw("x509_hash")})], [sertifikat yeniləndikdə],),
  ([Yoxlayan tərəfin daimi qeydi (#{raw("dns_name")})], [qeydiyyatdakı domen adı], [dəyişmir; nüsxələr və psevdonimlər ona bağlıdır],),
  ([Şəxs], [qlobal identifikator yoxdur], [hər sənəd üçün cihaz açarı, hər yoxlayan tərəf üçün nüsxə, hər sayt üçün psevdonim],),
))

Sertifikat yeniləndikdə qurum identifikatorunun dəyişməsi identifikatorun saxtalaşdırıla bilməməsinin bədəlidir; davamlılıq varislik bağı ilə təmin edilir və köhnə sertifikatla verilmiş sənədlər köhnə qeydə görə yoxlanılmağa davam edir (SPEC-ID-0002, XC2). Təhvil zamanı yalnız siyahının #{raw("operator")} sahəsi dəyişir; kök, qurum və növ identifikatorları sabit qalır (SPEC-TRUST-0001 §1). Domen adı xidmətin ünvanıdır, identifikator deyil (FW-ARF-0001 §4.2).

== ETSI görünüşləri

Aİ-nin etibar siyahısı ekosistemi illərdir ETSI standartları ilə işləyir. Tamga-nın səlahiyyətli mənbəyi öz JSON siyahılarıdır; lakin eyni məzmunu Aİ alətlərinin oxuya biləcəyi formatlarda da təqdim etmək şəbəkənin Aİ ilə birgə işləyə bilməsinin texniki şərtidir. İki görünüş müəyyən edilib.

#{strong[ETSI TS 119 602 \[42\] (LoTE).]} Aİ cüzdan rolları üçün (cüzdan provayderləri, sənəd verənlər, giriş sertifikatı provayderləri) JSON əsaslı "Lists of Trusted Entities" formatından istifadə edir. Siyahı naşiri Tamga siyahılarından bu formatda üç görünüş yarada bilər; "üzv dövlət tərəfindən bildirilmiş" mənasını daşıyan ETSI ünvanları əvəzinə Tamga-nın öz ünvan kökündən istifadə edir və kvalifikasiyalı olmayan sənəd verən üçün ETSI-də qarşılıq olmadığından öz növ ünvanını yazır (SPEC-ID-0002 §8.1.1). Dərc mənbədə parametrlə açılır. #{emph[Vəziyyət: generator hazırdır; dərc planlaşdırılıb.]}

#{strong[ETSI TS 119 612 \[41\] (XML).]} Aİ-nin imza yoxlama alətləri və Aİ-dən kənar ölkələr üçün açılan aralıq yol milli siyahını bu XML formatında, XAdES \[53\] imzası ilə tələb edir. Tamga bu görünüşü eyni imzalı ölkə siyahısından və #{strong[eyni versiya nömrəsi ilə]} yaradır; XML-də JSON-da olmayan heç bir qeyd ola bilməz və ikisi ziddiyyət təşkil edərsə, JSON qüvvədədir (ADR-0066, TX1). XML-də Aİ mənasında "kvalifikasiyalı" və ya "bildirilmiş" iddiası daşıyan heç bir ETSI ünvanı istifadə edilmir; siyahı növü, status və qayda ünvanları Tamga kökündəndir və hər XML faylı "910\/2014 \[1\] çərçivəsində bildirilmiş siyahı deyil; siyahıda kvalifikasiyalı etibar xidməti yoxdur" xəbərdarlığını daşıyır (TX2). XML-i ayrıca imza sertifikatı imzalayır; bu sertifikat ETSI-nin siyahı imzası profilinə uyğundur və JSON siyahılarını imzalaya bilməz. Yoxlayan tərəflər XML-ə daxil edilmir, çünki onlar etibar xidməti provayderi deyil; onların qeydləri JSON siyahısında və qeydiyyat sertifikatlarındadır.

Rədd edilmiş variantlar bunlar idi: dərci təxirə salmağa davam etmək (dövlətə alət təqdim etmək vədi boş qalardı), XML-i ayrıca qeydiyyat dəftərindən yaratmaq (iki mənbə bir-birindən ayrılardı) və ETSI-nin "kvalifikasiyalı" status ünvanlarından istifadə etmək (Tamga-nın bəyan edə bilməyəcəyi iddia). Tamga-nın XML siyahısı Aİ-nin üçüncü ölkə siyahılarına daxil olmur; o siyahılar dövlətlərin nəzarət etdiyi imza və möhür xidmətləri üçündür. Qazanc ondadır ki, Türk dövlətlərindən biri öz siyahısını dərc etmək istədikdə sınaqdan keçmiş alət və şablon hazır olur (ADR-0066). #{emph[Vəziyyət: sandbox-da dərcdədir (#{raw("trust.sandbox.tamga.network/tl-tr.xml")}, "TEST" işarəli yer tutucu ünvanlarla); real şəbəkədə siyahını idarə edəcək fond, poçt ünvanları və imzalayanı ilə birlikdə planlaşdırılıb.]} Hüquqi tanınma sualı Bölmə 20-dədir.

== Federasiya: başqasının siyahısı

Tamga-nın ölkə siyahısının sahibi olması vacib deyil. Dövlət, dövlətin səlahiyyət verdiyi qurum və ya Aİ öz siyahısını dərc etdikdə siyahıların siyahısı həmin siyahını #{strong[göstərici]} kimi göstərə bilər (ADR-0036; FW-TF-0001 §6.1). Göstərici dörd məlumat daşıyır: siyahının orijinal ünvanı, siyahını imzalayan sertifikatların Tamga-nın imzaladığı siyahıların siyahısında #{strong[sabitlənmiş]} barmaq izləri, siyahının hansı rollara və hansı sənəd növlərinə zəmanət verə biləcəyini bildirən #{strong[əhatə dairəsi]} və siyahının hansı qərarla əlavə edildiyini göstərən #{strong[təsdiq]} qeydi (Şəkil 9).

Qaydalar qısa və sərtdir. İmzalayanı sabitlənmiş barmaq izi ilə uyğun gəlməyən xarici siyahı yüklənmir (FD1). Xarici siyahı öz əhatə dairəsindən kənara çıxa bilməz: yalnız şəxsiyyət provayderlərinə zəmanət verən siyahı diplom verən qurum əlavə edə bilməz, əlavə etsə belə, həmin qeyd nəzərə alınmır (FD2). Hər xarici siyahının aktuallığı ayrıca izlənir: biri əskik və ya köhnəlmiş olsa belə, Tamga siyahıları təsirlənmir, yalnız həmin siyahıya bağlı suallar "naməlum" qaytarır (FD3). Xarici siyahının əlavə edilməsi, dəyişdirilməsi və ya çıxarılması layihə rəhbərliyinin təsdiqi ilə olur və qeyddə yazılır (FD4). Şəbəkənin öz növlərində növ təsvirinin bütövlük hash-i məcburidir; xarici növlərdə (Aİ şəxsiyyət məlumatları və ya mobil sürücülük vəsiqəsi kimi) növün etibarı xarici siyahının imzalı qeydindən gəlir (FD5).

Seçilmiş yol Aİ-nin öz modelidir. Xarici qeydləri Tamga siyahısına köçürmək onları Tamga-nın imzası ilə göstərər, sahibliyi və təhvili bulanıqlaşdırardı; hər yoxlayan tərəfin xarici siyahıları özünün seçməsi isə tək etibar lövbərini aradan qaldırardı (ADR-0036). Paketlər ETSI TS 119 602 və 119 612 formatındakı xarici siyahıları oxuyur və Aİ şəxsiyyət məlumatları ilə mobil sürücülük vəsiqəsi növlərini tanıyır. Mexanizmin hazır olması ilə müəyyən siyahıya etibar edilməsi ayrı-ayrı qərarlardır. #{emph[Vəziyyət: mexanizm işləyir; bu gün siyahıların siyahısında xarici siyahı yoxdur.]}

#sekil(9, [Federasiya: başqasının siyahısı siyahıların siyahısında göstəricidir], "figures/wp-az/sekil-9.svg", yarim: false)

= Qurum Şəxsiyyəti və Sertifikatlar

Elif Nümunə Universitetinin tələbə işləri şöbəsində çalışır. Universitet şəbəkəyə qoşularkən Elifin komandasına açar cütü yaratmaq və yalnız sertifikat sorğusu göndərmək tapşırılır; gizli açar universitetin aparat təhlükəsizlik modulundan heç vaxt çıxmayacaq. Bir neçə gün sonra universitetin Türkiyə kök sertifikatına bağlı sertifikatı olur və sertifikatın barmaq izi ölkə siyahısına daxil olur. Bu bölmə bu sertifikatın niyə X.509 \[28\] olduğunu, içində nə yazıldığını, yoxlayan tərəflərin və qeydiyyat qurumunun hansı sertifikatlardan istifadə etdiyini və host edilən xidmətin qurumun açarına toxunmadan imzanı necə aldığını izah edir.

== Niyə X.509, niyə DID deyil

Qurum şəxsiyyəti üçün iki namizəd var idi: şəbəkəyə xas mərkəzləşdirilməmiş identifikator (#{raw("did:tamga")}) profili və qurumların artıq istifadə etdiyi X.509 sertifikatları. Layihə rəhbərliyi X.509-u seçdi və DID qurum profilini qüvvədən saldı (ADR-0004). Qurumlar elektron möhür və imza üçün onsuz da X.509-dan istifadə edir və onların tənzimləyici qeydləri var. "Kimlik kvalifikasiyalı sertifikatla təsdiqləndi" cümləsinin qanunvericilikdə qarşılığı var; "DID ilə təsdiqləndi" cümləsinin hələ yoxdur. Aİ-nin kvalifikasiyalı sertifikat və kvalifikasiyalı imza yaratma qurğusu sistemi də X.509 üzərində qurulub; eyni zəmindən istifadə etmək Aİ ilə uyğunluğu asanlaşdırır.

Eyni qərar şəxslər üçün əks istiqamətdə prinsip qoyur: #{strong[şəxsə qlobal identifikator verilmir.]} Sabit identifikasiya nömrəsi şəxsin təhsil, səhiyyə və iş münasibətlərini bir sapa düzərdi. Şəxs hər münasibətdə başqa açarla, başqa nüsxə ilə və lazım gəldikdə başqa psevdonimlə görünür (Cədvəl 10, son sətir; Bölmə 15). Qurumların şəxsiyyəti isə əksinə, hər kəsin yoxlaya biləcəyi qədər açıq və sabitdir.

== Milli kök və müvəqqəti operatorluq

Hər dövlətin öz milli kök sertifikatı var və qurum sertifikatları bu kökə bağlanır. Yoxlayan tərəf sənəddəki imzadan qurum sertifikatına, oradan kökə çatır; kökün barmaq izini ölkə siyahısında axtarır (SPEC-ID-0002 §1). Bu gün Türkiyə kökünü şəbəkənin müvəqqəti operatoru idarə edir və bu vəziyyət siyahıda rolun yanında açıq yazılır. Kökün adı təhvildə sabit qalır: dövlət ya eyni kökün idarəsini təhvil alır, ya da öz kökünü növbəli olaraq əlavə edir və köhnə kök təqaüdə çıxır (FW-TF-0001 §7, addım 3).

Kök sertifikat da sonsuz deyil. Müddəti bitərkən və ya açar gücləndiriləcəkdə #{strong[növbələmə]} (#{emph[rollover]}) tətbiq olunur: yeni kök qeydə alınır, köhnə kökün statusu #{raw("ROLLING_OVER")} olur və üst-üstə düşmə dövründə hər iki kök qəbul edilir; qurumlar sertifikatlarını yeni kökə keçirir, dövrün sonunda köhnə kök #{raw("RETIRED")} olur. Təqaüdə çıxmış kök öz dövründə verilmiş sənədlərin yoxlanmasında qəbul edilməyə davam edir. Kök ələ keçirilərsə, vəziyyət fərqlidir: kök #{raw("REVOKED")} olur və ona bağlı bütün sertifikatlar etibarsızlaşır (SPEC-ID-0002 §4). Üst-üstə düşmə müddətinin uzunluğu (təklif 12 ay) və dövlətlərin aralıq sertifikat orqanından istifadə edib-etməyəcəyi spesifikasiyada açıq sual kimi qeydə alınıb (Şəkil 10).

#sekil(10, [Sertifikat ağacı: kim kimi imzalayır], "figures/wp-az/sekil-10.svg", yarim: false)

== Sənəd verənin sertifikat profili

Sertifikatın içində nə yazıldığı onu oxuyan alətlərin qurumu tanıyıb-tanımayacağını müəyyən edir. Aİ-nin şəxsiyyət sənədi, cüzdan və atribut attestasiyası provayderləri üçün yazdığı sertifikat profili ETSI TS 119 412-6-dır \[43\]; subyekt hüquqi şəxs olduqda EN 319 412-3 \[44\] tətbiq edilir. Tamga-da sənəd verən qurumların, şəxsiyyət xidməti daxil olmaqla, sənəd imza və ləğv siyahısı imza sertifikatları bu profilə görə yazılır (ADR-0050).

Profilin ən vacib sahəsi subyekt bölməsindəki #{strong[qurum identifikasiya nömrəsidir]} (#{raw("organizationIdentifier")}). Bu sahə qurumun vergi və ya reyestr nömrəsindən törədilən və qeydiyyat sertifikatındakı nömrə ilə eyni olan semantik identifikator daşıyır; Türkiyədə vergi identifikasiya nömrəsi üçün #{raw("VATTR-…")}, ticarət reyestri üçün #{raw("NTRTR-…")} formatı istifadə olunur. Bu uyğunluq sayəsində Aİ tərəfindəki yoxlayan tərəf sənədi imzalayan qurumu qeydiyyat məlumatı ilə əlaqələndirə bilər. Açardan istifadə məcburi (#{emph[critical]}) işarəli genişlənmədir və #{strong[tək növlüdür]}: yalnız #{raw("digitalSignature")}. Eyni sertifikat mdoc sənəd imzasında da istifadə edildiyi üçün ISO 18013-5-in \[34\] tələb etdiyi növ budur. Subyekt və orqan açar identifikatorları (SKI, AKI) məcburidir; yoxlayan tərəf sorğularındakı etibar orqanı uyğunluğu bu identifikatora əsaslanır. Alqoritm P-256 ilə ECDSA SHA-256-dır və sertifikat ən çoxu 3 il etibarlıdır.

Nəzərdən keçirilmiş variantlardan biri qurum nömrəsini yalnız etibar siyahısında saxlamaq idi; rədd edildi, çünki siyahıdan kənar Aİ alətləri sertifikatın özünə baxır. Açardan istifadəyə məzmuna bağlılıq (#{raw("nonRepudiation")}) əlavə etmək də mdoc profili ilə ziddiyyət təşkil etdiyi üçün rədd edildi. Kvalifikasiyalı və ya dövlət sinfindən olan sənəd verənlər üçün lazım olan əlavə sahələr (səlahiyyətə çıxış məlumatı, kvalifikasiyalı sertifikat bəyanatları) həmin sinif açıldıqda ayrıca qərarla gələcək; bu gün şəbəkədəki bütün sənəd verənlər kvalifikasiyalı olmayan atribut attestasiyası verir (ADR-0022, ADR-0050).

== Yoxlayan tərəfin giriş sertifikatı

Yoxlayan tərəf cüzdandan sənəd istəyərkən sorğusunu öz #{strong[giriş sertifikatı ilə]} imzalayır. Bu sertifikatın profili ETSI TS 119 411-8-dir və Aİ-nin relying party qeydiyyatına dair İcra Reqlamenti ona istinad edir (ADR-0058). Sertifikatın subyekt sahəsində qurum identifikasiya nömrəsi, rəsmi ad və ölkə olur. Ümumi ad (#{raw("CN")}) sahəsi şəxsin tanıyacağı ticarət adı və ya xidmət adıdır; Aynurun razılıq ekranında Timurun şirkəti tanış adı ilə görünür. Sertifikatın alternativ ad bölməsi iki şey daşıyır: qeydiyyatdakı domen adı və ən azı bir #{strong[əlaqə məlumatı]}, Tamga-da qeydiyyatdakı dəstək ünvanı. Dəstək ünvanı olmayan yoxlayan tərəfə real şəbəkədə giriş sertifikatı verilmir (AC1). Eyni qurum müxtəlif xidmətlər üçün ayrıca sertifikat istəsə, hər sertifikat xidmətin identifikatorunu ayrıca sahədə daşıyır (AC2).

İki təfərrüat şəbəkənin dürüstlük xəttini göstərir. ETSI-nin Aİ etibar xidməti provayderlərinə aid siyasət identifikatoru giriş sertifikatına yazılmır, çünki həmin identifikator sertifikatın nəzarət edilən Aİ etibar xidməti provayderi tərəfindən verildiyi barədə bəyanatdır və Tamga bunu bəyan edə bilməz (AC3). Şəbəkənin öz siyasət identifikatoru və sertifikat tətbiqi bəyanatı fondun yaradılması ilə əlavə ediləcək. #{emph[Vəziyyət: planlaşdırılıb.]} İkinci təfərrüat identifikatorlarla bağlıdır: sertifikat yeniləndikdə yoxlayan tərəfin müştəri identifikatoru (#{raw("x509_hash")}) dəyişir, daimi qeyd olan domen adı isə dəyişmir. 2026-cı ilin oktyabrında real və sandbox yoxlayan tərəflərinin sertifikatları eyni açarla yenidən verildikdə saytlardakı psevdonimlər buna görə təsirlənmədi; psevdonim domen adından törədilir (ADR-0058; Bölmə 15.3).

== Qeydiyyat sertifikatı

Giriş sertifikatı "bu sorğu bu qurumdan gəlir" deyir; cüzdanın əsas sualı isə bu qurumun #{strong[nə istəyə biləcəyidir]}. Aİ bunun üçün ikinci sənəd nəzərdə tutur: qeydiyyat sertifikatı (#{emph[registration certificate]}), ETSI TS 119 475 \[46\]. Tamga Türkiyə adından müvəqqəti qeydiyyat qurumu kimi hər yoxlayan tərəf istifadəsi və hər sənəd verən üçün qeydiyyat sertifikatı yaradır (ADR-0026). Sertifikatın məzmunu yalnız imzalı etibar siyahısındakı qeyddən gəlir: yoxlayan tərəfin məqsədi, hansı sənəd növündən hansı sahələri istəyə biləcəyi, məxfilik siyasəti, qurum identifikasiya nömrəsi. Sertifikat JWT formatındadır (#{raw("rc-wrp+jwt")}), siyahı imza açarından ayrı #{strong[qeydiyyat qurumu açarı ilə]} imzalanır və ən çoxu 12 ay etibarlıdır. Açarın barmaq izi siyahıların siyahısında dərc edilir.

Yoxlayan tərəf qeydiyyat sertifikatını sorğusuna əlavə edir; cüzdan imzanı, müddəti, sertifikatdakı qurum nömrəsinin sorğunu imzalayan giriş sertifikatındakı nömrə ilə eyni olduğunu və tələb olunan sahələrin sertifikatın icazə verdiyi sahələr daxilində qaldığını yoxlayır. Qeydiyyat sertifikatı daşımayan sorğu bu gün rədd edilir (ADR-0056; FW-ARF-0001 §2.2); artıq sahə istəyən sorğuda cüzdan şəxsi xəbərdar edir (Bölmə 10.3). Qeydiyyat sertifikatları həmçinin Tamga-nın öz siyasət identifikatorunu, siyasət sənədinin ünvanını və status girişini daşıyır; qeydiyyat qurumu 1 bitlik status siyahısı saxlayır və qeyd və ya məzmun dəyişdikdə köhnə sertifikat avtomatik ləğv olur. Cüzdan ləğv edilmiş sertifikatlı sorğunu rədd edir, statusu yoxlaya bilmirsə, xəbərdar edir (ADR-0068; FW-POL-0003). Cədvəl 11 bu bölmədə izah edilən sertifikat növlərini bir yerdə verir. #{emph[Vəziyyət: qeydiyyat sertifikatları, siyasət sahələri və status siyahısı real şəbəkədə və sandbox-da işləyir.]}

#tablo([#{strong[Cədvəl 11.]} Sertifikat növləri: kim verir, nə daşıyır, harada yoxlanılır.], (33fr, 25fr, 44fr, 24fr, 34fr), ([Növ], [Kim verir], [Nə daşıyır], [Profil], [Harada yoxlanılır],), (
  ([Qurumun sənəd imza və ləğv siyahısı imza sertifikatı], [milli kök (bu gün müvəqqəti operator)], [qurum identifikasiya nömrəsi, rəsmi ad, ölkə; yalnız #{raw("digitalSignature")}], [ETSI TS 119 412-6, EN 319 412-3], [yoxlayan tərəfdə (struktur və etibar addımları), cüzdanda],),
  ([Yoxlayan tərəfin giriş sertifikatı], [milli kök], [qurum identifikasiya nömrəsi, ticarət adı, domen adı, dəstək ünvanı], [ETSI TS 119 411-8], [cüzdanda, imzalı sorğu alındıqda],),
  ([Qeydiyyat sertifikatı], [qeydiyyat qurumu (bu gün müvəqqəti)], [istifadə məqsədi, istənilə bilən sahələr, siyasət, status girişi], [ETSI TS 119 475], [cüzdanda, tələb olunan sahələrlə müqayisə],),
  ([Siyahı imza sertifikatları (JSON və ayrıca XML imzalayanı)], [müvəqqəti operator], [siyahıların imzası], [Tamga JWS; XML üçün ETSI TS 119 612 §5.7.1], [siyahını yükləyən hər müştəridə],),
  ([Cüzdan provayderinin sertifikatı], [cüzdan provayderi, siyahıda qeydiyyatlı], [WIA və açar attestasiyasının imzası], [ETSI TS 119 412-6 (cüzdan növü)], [sənəd verəndə (Bölmə 9.3)],),
))

== Qurumun açarı qurumdadır: məsafədən imza

Şəbəkənin host etdiyi heç bir xidmət qurumların imza açarını saxlamır (FW-ARF-0001 §3); lakin host edilən xidmətlə verilən sənədlər də qurumun açarı ilə imzalanmalıdır. Bu ikisini bir yerdə saxlayan yol məsafədən imzadır (ADR-0057). Qurumun sənəd və ləğv siyahısı imza açarları qurumun öz aparat təhlükəsizlik modulunda və ya qurumun müqavilə bağladığı etibar xidməti provayderində yaradılır və orada qalır. Host edilən xidmət imzanı Aİ-də məsafədən imza və möhür üçün yerləşmiş interfeys olan Cloud Signature Consortium \[54\] API-nin 2-ci versiyası ilə istəyir.

Xidmətə gedən yeganə şey imzalanacaq məlumatın SHA-256 hash-idir. Sənədin məzmunu, fərdi məlumat və ya şəxsin açarı imza xidmətinə getmir; imza xidməti hansı şəxsə sənəd verildiyini öyrənmir (RS2). Qayıdan imza qurumun etibar siyahısındakı sertifikatı ilə lokal olaraq yoxlanılır; yoxlanılmayan imza ilə sənəd verilmir (RS3). Real şəbəkədə qurum açarının xidmət serverində fayldan oxunması konfiqurasiya səviyyəsində rədd edilir; fayl açarı yalnız lokal inkişaf, testlər və sandbox üçündür (RS4). Qurum imza səlahiyyətini istədiyi an geri ala bilər; imza xidmətindəki müştəri identifikatorunu bağlaması host edilən xidmətin həmin qurum adından sənəd verməsini dərhal dayandırır.

#kutu("teknik", [Məsafədən imzanın addımları])[
Host edilən xidmət sənədi imzalayacağı hər dəfə üç çağırış və iki lokal addım tətbiq edir (CSC API v2; ADR-0057 K1–K3). Alqoritm identifikatorları SHA-256 üçün #{raw("2.16.840.1.101.3.4.2.1")}, imza üçün #{raw("ecdsa-with-SHA256")} (#{raw("1.2.840.10045.4.3.2")}) olur.

#adimlar((
  ("Sənəd vermə xidməti → İmza xidməti", [#{strong[Giriş.]} Qurumun müəyyən etdiyi müştəri identifikatoru ilə qısaömürlü giriş tokeni alır (#{raw("client_credentials")}).], $"token" <- "imza xidməti"$),
  ("Sənəd vermə xidməti", [#{strong[Hash.]} İmzalanacaq məlumatın (JWS imza girişi və ya COSE strukturu) yalnız hash-ini hesablayır.], $h = "SHA-256"("imza girişi")$),
  ("Sənəd vermə xidməti → İmza xidməti", [#{strong[Səlahiyyət.]} Tək bir imza üçün bu hash-ə bağlı imza səlahiyyəti istəyir (#{raw("credentials/authorize")}).], $"SAD" <- "səlahiyyət"(h)$),
  ("Sənəd vermə xidməti → İmza xidməti", [#{strong[İmza.]} Hash-i imzalatdırır (#{raw("signatures/signHash")}).], $sigma <- "imzala"_("qurum") (h)$),
  ("Sənəd vermə xidməti", [#{strong[Yoxlama.]} İmzanı siyahıdakı qurum sertifikatının açıq açarı ilə lokal olaraq yoxlayır; uyğun gəlmirsə, sənədi vermir.], $"yoxla"(sigma, h, "pk"_"siyahı") attach(=, t: ?) "bəli"$),
))

İmza xidmətinə çatmaq mümkün olmasa, sənəd verilmir və şəxs sonra yenidən cəhd edir; eynilə qurumun səlahiyyətli mənbəyinə çatmaq mümkün olmadığı halda olduğu kimi (Bölmə 9.2).
]

Rədd edilmiş variantlar: açarı serverdə fayl kimi saxlamaq (şəbəkənin qaydasına ziddir), tək bir bulud provayderinin açar xidmətinə bağlanmaq (qurumu bir provayderə bağlayır) və şəbəkəyə xas yeni imza interfeysi (standart onsuz da var). Qurumun sənəd vermə proqramını açıq paketlərlə öz serverində işlətməsi ikinci yol kimi açıq qalır (ADR-0016, ADR-0057). #{emph[Vəziyyət: host edilən xidmətdə kod və testlər hazırdır; real şəbəkədə bu yoldan istifadə edən qurum hələ yoxdur, planlaşdırılıb.]}

= Sənədlər: Formatlar, Növlər və Kataloq

Aynur Nümunə Universitetində magistratura təhsilini bitirdi və diplomunu cüzdanına aldı. Telefonunda gördüyü bir kartdır: universitetin adı, dərəcə, məzuniyyət tarixi. Kartın arxasında isə bir-birinə sıx bağlı bir neçə struktur var: qurumun imzaladığı nüvə, hər biri ayrıca açıla bilən sahələr, telefondakı bir açara bağ və sənədin növünü təsvir edən kataloq qeydi. Bu bölmə bu strukturları bir-bir açır. Seçici paylaşımın özü silsilənin üçüncü yazısının \[68\] mövzusudur; burada Tamga profilinin onu necə daralttığına və niyə belə daralttığına diqqət yetiririk.

== SD-JWT VC-nin anatomiyası

Tamga sənədlərinin əsas formatı SD-JWT VC-dir \[16\] (IETF RFC 9901 \[15\] üzərində qurulan SD-JWT əsaslı sənəd formatı; ADR-0006). Bu format Aİ arxitekturasının əsas formatıdır, JSON əsaslıdır və seçici paylaşımı öz strukturunun içində daşıyır. SD-JWT VC tilda (#{raw("~")}) ilə ayrılmış üç hissədən ibarətdir (Şəkil 11): qurumun imzaladığı JWT, hər biri tək bir sahəni daşıyan #{strong[disclosure-lar]} (#{emph[disclosures]}) və təqdimat anında cüzdanın əlavə etdiyi #{strong[açar bağı JWT-si]} (#{emph[KB-JWT]}). Qurum sənədi verərkən sətir son tilda ilə bitir, çünki açar bağı hələ yoxdur. Aynur sənədi təqdim edərkən göstərmək istəmədiyi disclosure-ları sətirdən #{strong[çıxarır]} və sona açar bağını əlavə edir. JWT dəyişmir, qurumun imzası etibarlı qalır. Gizlətmək nəsə əlavə etmək deyil, çıxarmaqdır (SPEC-CRED-0002 §2).

Qurumun imzaladığı JWT açıqlana bilən sahələrin özünü deyil, yalnız onların #{strong[salted hash-lərini]} (#{raw("_sd")} massivi) daşıyır. Hər sahə üçün təsadüfi salt yaradılır; salt, sahənin adı və dəyəri JSON massivi kimi yazılır, Base64URL ilə kodlaşdırılır və bu sətrin SHA-256 hash-i JWT-yə daxil olur. Yoxlayan tərəf gələn disclosure-un hash-ini yenidən hesablayır və JWT-dəki massivdə axtarır. Salt olmasaydı, doğum tarixi kimi təxmin edilə bilən sahənin hash-i lüğət hücumu ilə açıla bilərdi; salt bunun qarşısını alır.

#sekil(11, [SD-JWT VC qatları: hansı hissə kimdən gəlir], "figures/wp-az/sekil-11.svg", yarim: false)

#kutu("teknik", [Disclosure-un və onun hash-inin hesablanması])[
Tamga profili standartın saxladığı variantları daraldır (SPEC-CRED-0002 §1): imza alqoritmi yalnız ES256, #{raw("typ")} yalnız #{raw("dc+sd-jwt")}, hash alqoritmi (#{raw("_sd_alg")}) yalnız #{raw("sha-256")}, salt 128 bit, qurumun sertifikat zənciri (#{raw("x5c")}) məcburidir və kök sertifikat zəncirə qoyulmur, açar bağı istisnasız məcburidir, saxta hash (#{emph[decoy digest]}) qadağandır, iç-içə seçici paylaşım ən çoxu iki səviyyədir və #{raw("_sd")} massivi həmişə bayt üzrə artan sıradadır. Disclosure belə hesablanır:

#formul[$ A &= "BASE64URL"("UTF-8"("JSON"(["salt", "ad", "dəyər"]))) \
d &= "BASE64URL"("SHA-256"("ASCII"(A))) \
"qəbul" &<=> d in "_sd" $]

Qurumlar massivi sabit qaydaya görə yazır: elementlər arasında vergül və bir boşluq, ASCII-dən kənar simvollar #{raw("\\uXXXX")} ilə qaçırılır. Aşağıdakı dəyərlər bu qayda ilə həqiqətən hesablanıb; saltlar bu nümunə üçün seçilib, dəyərlər nümunədir.

#kod("text", "Salt (16 bayt, onaltılıq)  : 9c41e07b2fd35a8816c4be72031d9fa5
Salt (Base64URL)           : nEHgey_TWogWxL5yAx2fpQ
JSON massivi               : [\"nEHgey_TWogWxL5yAx2fpQ\", \"given_name\", \"Aynur\"]
Disclosure (Base64URL)     : WyJuRUhnZXlfVFdvZ1d4TDV5QXgyZnBRIiwgImdpdmVuX25hbWUiLCAiQXludXIiXQ
Hash (_sd-yə daxil olan)   : Ib6OYL63r2BOsXDxfg3agTb5ZL4vjI3nD2Ya5WBqyxs

Salt (Base64URL)           : Wy6P0QR6yT5mELfUL-hcGQ
JSON massivi               : [\"Wy6P0QR6yT5mELfUL-hcGQ\", \"family_name\", \"Məmmədova\"]
Disclosure (Base64URL)     : WyJXeTZQMFFSNnlUNW1FTGZVTC1oY0dRIiwgImZhbWlseV9uYW1lIiwgIk1cdTAyNTltbVx1MDI1OWRvdmEiXQ
Hash (_sd-yə daxil olan)   : 31B1ZwTB5I8Vvg3TjV3_YVjNlgO-dZ39Ftfl_nQhTiA", baslik: "Nümunə: Aynurun diplomundan iki disclosure")

#{strong[Yenidən seriyalaşdırma tələsi.]} Hash disclosure #{emph[sətrinin]} hash-idir, massivin yenidən yazılmış formasının deyil. Eyni soyad massivini boşluqsuz və #{raw("ə")} hərfini qaçırmadan yazsaq (#{raw("[\"Wy6P0QR6yT5mELfUL-hcGQ\",\"family_name\",\"Məmmədova\"]")}), məlumat eyni qalır, lakin hash #{raw("wCd6pAztppTpS9k8d-IPbCifKlRIJFHE_t_eCV_ySa8")} olur və JWT-dəki ilə uyğun gəlmir. Yoxlayan tərəf buna görə disclosure-u #{strong[əvvəlcə hash-ləyir, sonra açır]}; açıb yenidən yazan tətbiq öz yaratdığı sənədi belə yoxlaya bilməz (SPEC-CRED-0002 §3.3, §3.5). Qayda yalnız yaratma üçündür; yoxlayan tərəf başqa qayda ilə yazılmış xarici sənədləri də yoxlayır.

#{strong[Saxta hash niyə qadağandır?]} Standart gizli sahələrin sayını qeyri-müəyyən etmək üçün qarşılığı olmayan hash-lərə icazə verir. Tamga-da növ təsviri açıqdır və sahələrin sayını onsuz da deyir; qurumdan quruma dəyişən saxta hash sayı isə özü barmaq izinə çevrilərdi. Yan kanala qarşı həll cüzdanın eyni yoxlayan tərəfə ardıcıl disclosure toplusu təqdim etməsidir (SPEC-CRED-0002 §4.4).
]

Təqdimat anında cüzdan sona açar bağı JWT-si əlavə edir. Bu kiçik JWT sənədin bağlı olduğu cihaz açarı ilə imzalanır və dörd sahə daşıyır: yoxlayan tərəfin verdiyi birdəfəlik dəyər (#{raw("nonce")}), hədəf yoxlayan tərəf (#{raw("aud")}), təqdimat anı (#{raw("iat")}) və təqdim edilən sətrin hash-i (#{raw("sd_hash")}). İlk üçü təkrar istifadənin qarşısını alır: qeydə alınmış təqdimat başqa yoxlayan tərəfə və ya başqa sorğuya yenidən təqdim edilə bilməz. Dördüncüsü araya girən birinin təqdim edilən disclosure-lardan bəzilərini səssizcə çıxarmasının qarşısını alır (SPEC-CRED-0002 §6).

#kutu("teknik", [Açar bağının hesablanması])[
#{raw("sd_hash")}, açar bağı istisna olmaqla, təqdim edilən sətrin hamısının hash-idir; son disclosure-dan sonrakı tilda daxildir və yalnız təqdim edilən disclosure-lar daxil olur:

#formul[$ "sd_hash" &= "BASE64URL"("SHA-256"("JWT" || "~" || A_1 || "~" || dots.c || A_k || "~")) \
"KB-JWT" &= "imza"_("cnf") ("nonce", "aud", "iat", "sd_hash") $]

Yoxlayan tərəf açar bağının imzasını sənəddəki #{raw("cnf")} açarı ilə yoxlayır, #{raw("aud")} dəyərinin özü, #{raw("nonce")} dəyərinin isə özünün verdiyi dəyər olduğunu yoxlayır, #{raw("iat")} üçün ±300 saniyəlik pəncərə tətbiq edir və #{raw("sd_hash")}-i özü hesablayıb müqayisə edir (SPEC-CRED-0002 §8, Ş8; C17). Tamga növlərində açar bağı olmayan təqdimat rədd edilir (C8).
]

Aşağıdakı nümunə Aynurun diplomunun qurumun imzaladığı gövdəsini disclosure-lar açılmış halda göstərir. Təqdimatda bu sahələrin yalnız bir hissəsi açılır (Şəkil 12).

#kod("json", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-7Dcy7bWeg5CURNEE+veGmjOE3HWb95ZGJBWX/ZrZgtI=\",
  \"iat\": 1782896400,
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"…\", \"y\": \"…\" } },
  \"status\": { \"status_list\": { \"idx\": 48213, \"uri\": \"https://status.tamga.network/…\" } },
  \"given_name\": \"Aynur\",
  \"family_name\": \"Məmmədova\",
  \"qualification_title\": { \"tr-TR\": \"Bilgisayar Mühendisliği Yüksek Lisans Diploması\",
                           \"en-US\": \"Master of Science in Computer Engineering\" },
  \"eqf_level\": 7,
  \"isced_f_code\": \"0613\",
  \"awarding_body_name\": { \"tr-TR\": \"Örnek Üniversitesi\", \"en-US\": \"Example University\" },
  \"awarding_date\": \"2026-06-30\",
  \"grade\": \"3.71\",
  \"thesis_title\": { \"tr-TR\": \"…\" },
  \"is_graduate\": true
}", baslik: "Nümunə: açılmış diplom gövdəsi (disclosure-lar yerinə qoyulub, qısaldılıb; dəyərlər nümunədir)")

Nümunədə üç təfərrüat var. #{raw("iat")} saata yuvarlaqlaşdırılıb ki, nüsxələr verilmə anına görə uyğunlaşdırıla bilməsin (paketlərin versiya qeydləri; Bölmə 15.2). Diplomun #{raw("exp")} sahəsi yoxdur; yeniləmə məcburiyyəti məzunu ömür boyu universitetə bağlayardı. Qiymət və dissertasiyanın adı növ təsvirində "həmişə gizlədilə bilən" kimi işarələnib: Aynur diplomunu qiymətini göstərmədən təqdim edə bilər, kağız diplomda isə üzərindəki hər şey görünür (SPEC-SCHEMA-0002 §3.3).

#sekil(12, [Seçici paylaşım: dörd sahəli sənəddən iki sahənin göstərilməsi], "figures/wp-az/sekil-12.svg", yarim: false)

== Cihaz bağı niyə istisnasızdır

Spesifikasiyalarda "universitet ideyasındakı gizli səhv" adlanan yanlış fərziyyə var: "Tələbə universitetin təsdiqi ilə sənəd alırsa, sənədi daşıyan həmin tələbədir." Universitet tələbənin mövcud olduğunu təsdiqləyir; lakin sənədin daxil olduğu cüzdanın həmin tələbəyə məxsus olduğunu təsdiqləmir. Bağ yoxdursa, sənəd dostun cüzdanına aldırıla və ya bir neçə cüzdana alınıb satıla bilər; sistem səhv vermir, səssizcə yanlış deyir (SPEC-CRED-0001 §3).

Tamga-da hər sənəd verildiyi anda şəxsin cihazında yaradılmış açara bağlanır: açarın açıq hissəsi sənədin #{raw("cnf")} sahəsinə yazılır, gizli hissəsi cihazın təhlükəsiz zonasından çıxmır. Təqdimatda cüzdan bu açarla açar bağını imzalayır. Bağ istisnasız məcburidir (ADR-0006). Onun sübut etdiyi şey sənədi təqdim edənin sənəd verilərkən bağlanan gizli açarı hazırda əlində saxlamasıdır; qarşıdakı insanın sənəddə adı çəkilən şəxs olduğunu sübut etmir. Sənəd sahibi telefonunu və kilid kodunu başqasına verərsə, heç bir addım səhv vermir. Bağ yanlış cüzdana yazılmanın və başqasına verilmənin qarşısını alır, könüllü cihaz paylaşımının qarşısını almır (SPEC-CRED-0001 §3). Şəxsin özünü bağlamaq üçün şəxsiyyət sənədinə ehtiyac var: qurumlar sənəd verərkən şəxsin şəxsiyyət sənədi təqdimatını öz qeydləri ilə uyğunlaşdırır (Bölmə 9.2; Bölmə 14).

== mdoc: ikinci təqdimat forması

Tamga-nın şəxsiyyət sənədi SD-JWT VC ilə yanaşı ISO\/IEC 18013-5 \[34\] #{strong[mdoc]} formatında da verilir (ADR-0013). mdoc mobil sürücülük vəsiqəsi üçün hazırlanmış, CBOR \[29\] kodlaşdırması və COSE imzasından istifadə edən formatdır. Üç əsas var: brauzerdən sənəd istəyən Digital Credentials API-nin \[36\] Safari və iOS tərəfi yalnız mdoc qəbul edir; ADR-0013-ün qeyd etdiyi kimi Aİ arxitekturası şəxsiyyət məlumatları üçün mdoc-u məcburi saxlayır; yaxın məsafədə ISO 18013-5 mdoc daşıyır (Bölmə 10.8). Yalnız SD-JWT VC ilə qalmaq brauzer girişini və Aİ ilə uyğunlaşmanı itirərdi; tamamilə mdoc-a keçmək mövcud xətti pozar və veb üçün daha sadə formatı tərk edərdi.

Qaydalar iki təqdimat formasını sıx saxlayır. mdoc yalnız SD-JWT VC-nin ikinci formasıdır; eyni sahələri, eyni verilmə və bitmə vaxtlarını daşıyır və #{strong[eyni cihaz açarına]} bağlıdır: SD-JWT-dəki #{raw("cnf")} ilə mdoc-dakı #{raw("deviceKey")} eyni açardır (MD1, MD2). İki forma tək vermə axınında yaradılır və eyni ləğv bitini bölüşür. mdoc-un #{raw("docType")} dəyəri növ adı ilə (#{raw("urn:tamga:id:IdentityAttestation:1")}) eynidir, ad sahəsi #{raw("tamga.id.1")}-dir. Sahə adları və onların kodlaşdırılması Aİ şəxsiyyət məlumatları üzrə İcra Reqlamenti (Aİ 2026\/1731 \[7\]) ilə sabitlənmiş kodlaşdırmaya görədir: SD-JWT-də #{raw("birthdate")} və #{raw("nationalities")} massivi, mdoc-da #{raw("birth_date")} və massiv dəyərli #{raw("nationality")} (ADR-0045). Şəxsiyyət sənədindən başqa növlər bu gün yalnız SD-JWT VC-dir. Sıfır bilik sübutu üçün istifadə edilən qısaömürlü nüsxə də mdoc-dur (Bölmə 15.4).

#kutu("teknik", [mdoc-da seçici paylaşım])[
mdoc-da hər sahə ayrıca #{raw("IssuerSignedItem")} strukturudur: təsadüfi identifikator (#{raw("digestID")}), 16 baytlıq təsadüfi dəyər (#{raw("random")}), sahənin adı və dəyəri. Struktur CBOR ilə kodlaşdırılır, 24 nömrəli CBOR teqi ilə bükülür və bu baytların SHA-256 hash-i qurumun imzaladığı #{strong[Mobile Security Object]} (MSO) içinə yazılır. Cüzdan təqdimatda yalnız seçdiyi strukturları göndərir; yoxlayan tərəf hash-ləri MSO ilə, MSO-nun imzasını qurum sertifikatı ilə, cihaz imzasını isə sessiyaya bağlı transkript üzərində yoxlayır.

#formul[$ "element" &= "CBOR"("tag 24"("CBOR"({"digestID", "random", "elementIdentifier", "elementValue"}))) \
"MSO.valueDigests"["tamga.id.1"]["digestID"] &= "SHA-256"("element") $]

#{raw("age_over_18 = true")} elementi #{raw("1438205713")} identifikatoru və #{raw("8d1f6a20c43b97e5512a0ff6b8c3d471")} təsadüfi dəyəri ilə kodlaşdırıldıqda 87 baytlıq ardıcıllıq alınır və onun hash-i #{raw("b42af3a67628a8e5…a0536d4d")} olur. Hesablama şəbəkənin mdoc paketinin kodlayıcısı ilə aparılıb; dəyərlər nümunədir. İdentifikatorlar ardıcıl deyil, təsadüfidir; ardıcıl olsaydı, açıqlanan sahələrin nömrələri gizlədilən sahələrin sayını və sırasını üzə çıxarardı.

#kod("text", "{
  \"version\": \"1.0\",
  \"digestAlgorithm\": \"SHA-256\",
  \"docType\": \"urn:tamga:id:IdentityAttestation:1\",
  \"valueDigests\": { \"tamga.id.1\": { 1438205713: h'b42af3a6…a0536d4d', 902114467: h'…', … } },
  \"deviceKeyInfo\": { \"deviceKey\": { 1: 2, -1: 1, -2: h'…', -3: h'…' } },
  \"validityInfo\": { \"signed\": 0(\"2026-07-01T09:00:00Z\"),
                    \"validFrom\": 0(\"2026-07-01T09:00:00Z\"),
                    \"validUntil\": 0(\"2028-07-01T09:00:00Z\") },
  \"status\": { \"status_list\": { \"idx\": 7310, \"uri\": \"https://…\" } }
}", baslik: "Nümunə: şəxsiyyət sənədinin MSO-su (CBOR diaqnostik yazılışına yaxın, qısaldılmış; dəyərlər nümunədir)")

mdoc-un ləğv girişi eyni məntiqi siyahının CWT formasına işarə edir; JWT və CWT formaları eyni bitləri daşıyır (ADR-0048). MSO qurumun sertifikatı ilə COSE\_Sign1 imzası daşıyır və sertifikat zənciri imzanın içindədir; SD-JWT ilə eyni etibar lövbərinə bağlanır (MD3). Cədvəl 12 iki formatı yan-yana qoyur.
]

#tablo([#{strong[Cədvəl 12.]} SD-JWT VC ilə mdoc-un müqayisəsi (FW-ARF-0001 §5.1; ADR-0013).], (18fr, 23fr, 31fr), ([], [SD-JWT VC], [ISO\/IEC 18013-5 mdoc],), (
  ([Kodlaşdırma və imza], [JSON, JOSE (ES256)], [CBOR, COSE\_Sign1 (ES256)],),
  ([Növ identifikatoru], [#{raw("vct")} (URN)], [#{raw("docType")} (eyni URN)],),
  ([Seçici paylaşım], [salted hash-lər (#{raw("_sd")}) və disclosure-lar], [#{raw("IssuerSignedItem")} hash-ləri (MSO)],),
  ([Cihaz bağı], [#{raw("cnf")} + açar bağı JWT-si], [#{raw("deviceKey")} + sessiya transkripti üzərində cihaz imzası],),
  ([Ləğv], [Token Status List (JWT forması)], [eyni siyahı, CWT forması],),
  ([Tamga-da istifadə], [bütün növlər; məsafədən təqdimat], [şəxsiyyət sənədi; brauzer, yaxın məsafə, ZK],),
))

== Sənəd növünün identifikatoru və kataloq

Sənədin "diplom" olduğunu deyən şey sənədin #{raw("vct")} sahəsindəki növ adıdır. Tamga-da bu ad URN-dir: #{raw("urn:tamga:<sahə>:<Növ>:<əsas versiya>")}, məsələn #{raw("urn:tamga:edu:DiplomaCredential:1")} (ADR-0010). Növün mənası, yəni hansı sahələri daşıdığı, ekranda hansı dillərdə necə göstəriləcəyi və hansı sahələrin gizlədilə biləcəyi #{strong[növ təsvirində]} (#{emph[Type Metadata]}) yazılır; məlumat qaydaları ayrıca JSON Schema \[39\] faylındadır. Təsvirlər #{raw("schemas.tamga.network")} ünvanındakı kataloqda dəyişməz fayllar kimi dərc edilir (SPEC-SCHEMA-0001).

Bu ilk qərar deyildi. İlk sxem qərarı növ adını sabit HTTPS ünvanı etmişdi (ADR-0007, Qərar 1); iki həftə sonra dəyişdirildi. Səbəb idarəetmə ilə bağlı idi: bir neçə dövlətin qoşulacağı şəbəkədə növ identifikatoru bir fondun domen adına bağlı ola bilməz. HTTPS variantı standarta uyğun idi, lakin domen adını əbədi olaraq identifikatorun hissəsinə çevirirdi. Aİ-nin #{raw("urn:eudi:pid:1")} və kataloq quruluşu da eyni nümunədir. Standartdan kənar #{raw(".well-known")} yolu və DID əsaslı növ identifikatoru da rədd edildi (ADR-0010). Bədəli qeydə alındı: şəbəkənin kataloqunu bilməyən yoxlayan tərəf URN-dən təsvirə çata bilməz; kataloq ünvanı buna görə siyahıların siyahısında və paketlərdə daşınır.

Təsvirin harada durduğunu kataloqdakı #{raw("metadata_url")} bildirir; domen adı dəyişərsə, yalnız bu ünvanlar dəyişir. Hər sənəd nəzərdə tutduğu təsvirin hash-ini #{raw("vct#integrity")} sahəsində daşıyır və bu sahə Tamga-da məcburidir (ETSI TS 119 472-1 \[49\]; IETF layihəsində istəyə bağlıdır). Kataloq serveri ələ keçirilsə belə, sahənin mənası səssizcə dəyişdirilə bilməz; hash məzmunu təkbaşına müəyyən etdiyi üçün cüzdan təsviri bir dəfə yükləyib oflayn rejimdə də istifadə edə bilər.

#kutu("teknik", [Kataloq qeydi, bütövlük hash-i və təyinetmə])[
Bütövlük hash-i W3C Subresource Integrity \[38\] formatındadır: #{raw("sha256-")} prefiksi və faylın xam baytlarının SHA-256 hash-inin Base64 kodlaşdırması. Hash serverin qaytardığı bayt ardıcıllığı üzərindən alınır; fayl yenidən formatlanmır, sətir sonları LF, kodlaşdırma BOM-suz UTF-8-dir (SPEC-SCHEMA-0001 §3). Aşağıdakı qeyd yazı günündəki kataloqdan götürülüb və yenidən hesablanaraq yoxlanılıb: diplom təsvirinin 4.536 baytlıq faylının hash-i kataloqdakı #{raw("content_hash")} ilə, növ adının Keccak-256 hash-i isə #{raw("schema_id")} ilə eynidir. İnkişaf mərhələsində təsvirlər yerində düzəldilə bildiyi üçün (aşağıda) dəyərlər dəyişə bilər; nümunə kimi oxunmalıdır.

#kod("json", "{
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"schema_id\": \"0x9d6d0e873ee0466cf1cdc8a8bd73f9435022635f0b6e46cd478e70f6e6aed26b\",
  \"metadata_url\": \"https://schemas.tamga.network/v1/edu/DiplomaCredential/1.0.0/metadata.json\",
  \"content_hash\": \"sha256-7Dcy7bWeg5CURNEE+veGmjOE3HWb95ZGJBWX/ZrZgtI=\",
  \"version\": \"1.0.0\",
  \"layer\": \"NETWORK\",
  \"status\": \"ACTIVE\"
}", baslik: "Nümunə: kataloqdakı diplom qeydi")

#kod("json", "{
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"extends\": \"urn:tamga:core:TamgaBaseCredential:1\",
  \"extends#integrity\": \"sha256-8ZCjtH26C7Bh0u+Lox3zJA+JLfP4JYtcQPW+8fxoyPU=\",
  \"schema_uri\": \"https://schemas.tamga.network/v1/edu/DiplomaCredential/1.0.0/schema.json\",
  \"schema_uri#integrity\": \"sha256-AJXIk9o4DlyVFC3PyCeH/4XEeZnh+dYTWVFlvjQjonc=\",
  \"display\": [ { \"lang\": \"tr-TR\", \"name\": \"Diploma\", \"description\": \"Yükseköğretim mezuniyet belgesi\" },
               { \"lang\": \"en-US\", \"name\": \"Diploma\", \"description\": \"Higher education degree\" } ],
  \"claims\": [ { \"path\": [\"grade\"], \"sd\": \"always\",
                \"display\": [ { \"lang\": \"tr-TR\", \"label\": \"Not ortalaması\" } ] },
              { \"path\": [\"is_graduate\"], \"sd\": \"allowed\" } ],
  \"tamga\": { \"tier\": \"NETWORK\", \"issuer_categories\": [\"EDUCATION\"], \"uses_status_list\": true,
             \"suspension_allowed\": true, \"min_issuer_assurance\": \"I2\", \"min_binding_level\": \"T2\" }
}", baslik: "Nümunə: diplom növü təsvirindən bir parça (qısaldılmış)")

#{raw("schema_uri")} və onun hash-i IETF layihəsinin aktual versiyasında yoxdur; Tamga bunları öz əlavəsi kimi saxlayır və standart oxuyucu tanımadığı sahəni nəzərə almır. Yoxlayan tərəfin növ addımı ardıcıllıqla bunları edir (ADR-0010 K2; SPEC-SCHEMA-0001 §7): #{raw("vct")} və #{raw("vct#integrity")} yoxdursa, rədd; növün kataloq qeydi yoxdursa və ya geri çəkilibsə, rədd; təsviri keşdən, yoxdursa #{raw("metadata_url")} ünvanından al; alınan baytların hash-i həm sənəddəki dəyərlə, həm də kataloq qeydi ilə uyğun gəlmirsə, rədd; təsvirdəki #{raw("vct")} sənəddəki ilə eyni deyilsə, rədd; üst növ zəncirini (#{raw("extends")}) ən çoxu beş səviyyə və dövrsüz aç; sənədi JSON Schema ilə yoxla; sonda qurumun sənədin verildiyi tarixdə bu növə səlahiyyətli olub-olmadığını siyahıdan soruş. Təsvir heç bir yerdən alına bilməzsə, nəticə rədd deyil, "yoxlanıla bilmədi"dir.
]

Əsas versiya URN-in hissəsidir; uyğunluğu pozan dəyişiklik yeni URN deməkdir. Aralıq və düzəliş versiyaları eyni URN altında yeni #{raw("metadata_url")} və yeni hash ilə dərc edilir; sənəddəki #{raw("vct#integrity")} hansının nəzərdə tutulduğunu dəqiqləşdirir. İstifadədən çıxarılmış (#{raw("DEPRECATED")}) növ artıq #{strong[verilə bilməz]}, lakin onunla verilmiş sənədlər #{strong[yoxlanılmağa davam edir]}; 2027-ci ildə verilmiş diplom növün yeni əsas versiyası çıxdıqda da yoxlanıla bilən qalmalıdır (ADR-0007 Qərar 7; ADR-0010 K4). Milli sənəd növləri öz ad sahəsindən istifadə edir: #{raw("urn:tamga:<cc>:<sahə>:<Növ>:<əsas versiya>")}; şəbəkə növü bu formada ola bilməz, beləliklə milli ad şəbəkə miqyaslı adla heç vaxt toqquşmur (ADR-0054).

Bu gün şəbəkə #{strong[inkişaf mərhələsindədir]}: beta buraxılışına qədər növ təsvirləri yerində düzəldilir, sınaq sənədləri yenidən alınır; dərc edilmiş təsvirin dəyişməzliyi beta ilə başlayır (ADR-0029). Diplomun təsvirinə dayandırma icazəsi əlavə edildikdə hash dəyişdi və əvvəlki sınaq diplomları yenidən verildi (SPEC-SCHEMA-0002 §3.1); real istifadəçi olmadığı üçün geriyə uyğunluq kodu yazılmadı.

== Bugünkü növlər

#tablo([#{strong[Cədvəl 13.]} Kataloqdakı sənəd növləri (yazı günü; #{raw("packages/schemas")} kataloqu, SPEC-SCHEMA-0002\/0003, FW-RB-0002…0005).], (43fr, 14fr, 48fr), ([Növ (#{raw("vct")}, #{raw("urn:tamga:")} prefiksi buraxılıb)], [Görünən adı], [Format · ləğv · dayandırma · minimum səviyyə · rulebook],), (
  ([#{raw("edu:StudentCredential:1")}], [tələbə arayışı], [SD-JWT VC · ləğv siyahısı yoxdur, ən çoxu 90 gün · dayandırma yoxdur · T1 · FW-RB-0002],),
  ([#{raw("edu:DiplomaCredential:1")}], [diplom], [SD-JWT VC · Status List, 2 bit · dayandırma var · T2 · FW-RB-0002],),
  ([#{raw("id:IdentityAttestation:1")}], [şəxsiyyət sənədi], [PID deyil · SD-JWT VC + mdoc · Status List, 1 bit · dayandırma yoxdur · T2 · FW-RB-0003],),
  ([#{raw("contact:EmailAddress:1")}, #{raw("contact:PhoneNumber:1")}], [e-poçt, telefon], [təsdiqlənmiş əlaqə məlumatı · SD-JWT VC · Status List, 1 bit · dayandırma yoxdur · T0 · FW-RB-0005],),
  ([#{raw("tkt:EventTicket:1")}], [tədbir bileti], [SD-JWT VC · Status List · dayandırma yoxdur · T0 · FW-RB-0004],),
  ([#{raw("id:DrivingLicenceAttestation:1")}], [sürücülük vəsiqəsi məlumatı], [rəsmi sənəd deyil · SD-JWT VC · Status List, 1 bit · dayandırma yoxdur · T2 · FW-RB-0003],),
  ([#{raw("id:PseudonymSeed:1")}], [psevdonim toxumu], [heç bir yoxlayan tərəfə göstərilmir · SD-JWT VC · ləğv siyahısı yoxdur · T2 · ADR-0031, ADR-0061],),
  ([#{raw("id:ShortLivedIdentityAttestation:1")}], [ZK nüsxəsi], [mdoc · ləğv siyahısı yoxdur, ən çoxu 24 saat · dayandırma yoxdur · T2 · ADR-0044],),
))

Tələbə arayışı ləğv siyahısından istifadə etmir; qısa ömür ləğvi əvəz edir. Diplom müddətsizdir və ləğv siyahısından istifadə edir; plagiat və ya saxta qeyd kimi nadir, lakin real ləğv səbəbləri var. Diplom kodlu sahələri ilə Avropa Təlim Modelinə (ELM \[61\]) uyğunlaşdırılır: Avropa İxtisaslar Çərçivəsinin səviyyəsi (EQF) və ISCED-F sahə kodu. Almaniyadakı işəgötürənin "Bilgisayar Mühendisliği" ifadəsini oxuması lazım deyil; #{raw("0613")} sahə kodunu və 7-ci səviyyəni anlayır (SPEC-SCHEMA-0001 §8.3). Sürücülük vəsiqəsi məlumatı nə rəsmi sürücülük vəsiqəsi, nə də mobil sürücülük vəsiqəsidir; yol nəzarətində keçmir və bunu kartın üzərində açıq deyir (ADR-0039). Milli şəxsiyyət nömrəsi yalnız şəxsiyyət sənədində və yalnız seçici açıla bilən sahə kimi olur; heç bir diplom, kart və ya bilet onu daşımır (FW-ARF-0001 §5.1). Şəxsiyyət sənədindən törəyən növlərin təfərrüatı Bölmə 14-dədir.

== Kateqoriya siqnalı və təminat

Aİ hüququnda kvalifikasiyalı atribut attestasiyaları və dövlət mənbəyi adından verilən atribut attestasiyaları sənədin içində avtomatik emal edilə bilən kateqoriya göstəricisi daşıyır; kvalifikasiyalı olmayanlar daşımır. Tamga bu strukturu öz kontekstində əks etdirir (ADR-0010 K5). Sənəd verən qeydinin sinfi #{raw("PUB")}-dursa, sənəd #{raw("category")} sahəsində #{raw("urn:tamga:eaa:pub")}, #{raw("QUALIFIED")}-dirsə, #{raw("urn:tamga:eaa:qualified")} daşıyır; sinfi #{raw("EAA")} olan, yəni qeydiyyatlı və ya müqaviləli səviyyədəki sənəd verənlər kateqoriya daşımır. Qurum yalnız qeydiyyatdakı sinfinin siqnalını qoya bilər; yoxlayan tərəf etibar addımında sənəddəki kateqoriyanı siyahı ilə müqayisə edir və uyğunsuzluqda sənədi rədd edir (C4). Saxta siqnal beləliklə işə yaramır. Aİ-nin öz kateqoriya adlarından (#{raw("urn:etsi:esi:eaa:eu:*")}) istifadə edilmir; şəbəkə Aİ kontekstindən kənardadır.

İkinci qayda şəxslə bağlıdır: #{strong[şəxsin şəxsiyyət təsdiqi səviyyəsi heç vaxt sənədə yazılmır]} (C18). Səviyyə növün ilkin şərtidir; diplom yalnız ən azı T2 bağlama ilə verilir (Cədvəl 13) və bağlama üsulu yalnız sənəd verənin audit qeydinə yazılır (PR7). Aİ də səviyyəni sənədə yazmır (ADR-0010, alternativ E).

Bugünkü mənzərə sadədir: şəbəkədəki bütün sənəd verənlər kvalifikasiyalı olmayan atribut attestasiyası verir və heç bir sənəd kateqoriya sahəsi daşımır. Şəxsiyyət xidməti də kvalifikasiyalı deyil; Aİ-də bu status müstəqil uyğunluğu qiymətləndirmə və nəzarət tələb edir (ADR-0022). Sənədə ayrıca "kvalifikasiyalı deyil" göstəricisi də yazılmır (ADR-0047). Diplomda ən yüksək qurum səviyyəsinin (I3) nə vaxt açılacağı pilotdan sonraya saxlanıldı.

= Sənədin Verilməsi: OpenID4VCI Profili

Aynurun magistr diplomu hazırdır. Elif universitetin tələbə məlumat sistemində məzuniyyət qeydini təsdiqlədikdən sonra Aynura həmin sistemdən keçid gedir. Aynur keçidi telefonunda açır, cüzdan şəxsiyyət sənədini soruşmaq üçün razılıq istəyir, sonra bir neçə saniyə ərzində diplom kartı görünür. Həmin bir neçə saniyədə cüzdanla universitetin sənəd vermə xidməti arasında bir sıra mesaj gedib-gəlir. Bu bölmə həmin mesajları izah edir. Protokol OpenID Foundation-ın OpenID for Verifiable Credential Issuance 1.0 (OpenID4VCI \[30\]) sənədidir; Tamga onun üzərində sərt profil qurur (SPEC-PROTO-0001). Silsilənin səkkizinci yazısı \[73\] protokolun özünü sıfırdan izah edir; burada profilin seçimlərinə və onların əsaslarına baxırıq.

== İki başlanğıc

Sənəd iki yolla istənilə bilər (FW-ARF-0001 §2.1). #{strong[Qurumun başlatdığı]} yolda qurum #{strong[təklif]} (#{emph[credential offer]}) yaradır və onu şəxsə QR kod və ya keçid kimi ötürür. #{strong[Cüzdanın başlatdığı]} yolda şəxs cüzdanda qurumu seçir və sənədini istəyir; cüzdan qurumlar kataloqunu etibar siyahısından oxuyur, ayrıca serverə müraciət etmir (PR15). Hər iki yolda qurum əvvəlcə özünü təqdim edir: hər sənəd vermə xidməti standart təqdimat sənədi (#{emph[issuer metadata]}) dərc edir. Cüzdan bu sənədi imzalı şəkildə istəyir; imzalayan qurumun siyahıdakı sertifikatı deyilsə, ondan istifadə etmir. Sənəd qurumun qeydiyyat sertifikatını da daşıyır; cüzdan tələb olunan növün qeydiyyatda olduğunu əvvəlcədən yoxlayır (SPEC-PROTO-0001 §2.1).

Təklif QR kodun içinə yerləşdirilmir; QR kod yalnız təklifin ünvanını (#{raw("credential_offer_uri")}) daşıyır və ünvan #{strong[birdəfəlikdir]} (PR3). İstifadə edilmiş təklif ikinci dəfə oxudulduqda cüzdan "bu dəvət istifadə olunub" deyir; Aynur "QR kodum işləmir" dediyi anda sızma aşkar edilir. Qurumun başlatdığı yolda təkliflər üç sinfə bölünür (Cədvəl 14).

#tablo([#{strong[Cədvəl 14.]} Təklif sinifləri və qorunma (SPEC-PROTO-0001 §3.3).], (48fr, 32fr, 17fr, 38fr, 48fr), ([Sinif​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Harada görünür], [Ömür], [İkinci faktor], [Əlavə qayda],), (
  ([#{raw("on-screen")}], [şəxsin sessiya açdığı qurum ekranında], [5 dəqiqə, birdəfəlik], [6 rəqəmli əməliyyat kodu, eyni sessiyada], [3 səhv cəhddə təklif yanır],),
  ([#{raw("out-of-band")}], [e-poçt və ya qısa mesajla gedən QR kod], [ən çoxu 72 saat, birdəfəlik], [6 rəqəmli əməliyyat kodu, #{strong[başqa kanaldan]}], [kanal ünvanı yalnız qurumun qeydiyyatdakı məlumatından; verildikdən sonra hər iki kanala "cüzdana əlavə edildi" bildirişi],),
  ([#{raw("identity-bound")}], [qurumun öz kanalı ilə göndərdiyi keçid], [7 gün, birdəfəlik], [əməliyyat kodu yoxdur; şəxs şəxsiyyət sənədini təqdim edir], [təklif şəxsin kimliyinə bağlıdır (Bölmə 9.2)],),
))

Əməliyyat kodu (#{raw("tx_code")}) ekrana çiyin üstündən baxan və ya QR kodun şəklini çəkən birinə qarşı ikinci faktordur və əvvəlcədən səlahiyyətləndirilmiş axında buraxıla bilməz (PR1). Kod təklifin içində getmir. Kimliyə bağlı təklif isə əməliyyat koduna heç ehtiyac duymur, çünki sənəd yalnız təklifdə adı çəkilən şəxsə verilə bilər.

#kutu("teknik", [Kimliyə bağlı təklif obyekti])[
Kimliyə bağlı təklif standartın avtorizasiya kodu axınından istifadə edir; təklifdə əvvəlcədən səlahiyyətləndirilmiş kod yoxdur, yalnız təklifin identifikatorunu daşıyan #{raw("issuer_state")} dəyəri var. Cüzdan bu dəyəri avtorizasiya sorğusuna qoyur və sənəd verən təklifin etibarlı, istifadə edilməmiş və eyni sənəd növü üçün olduğunu yoxlayır (SPEC-PROTO-0001 §3.4). Dəyərlər nümunədir.

#kod("json", "{
  \"credential_issuer\": \"https://issuer.tamga.network/example-university\",
  \"credential_configuration_ids\": [\"urn:tamga:edu:DiplomaCredential:1\"],
  \"grants\": { \"authorization_code\": { \"issuer_state\": \"b3f1c2…\" } }
}", baslik: "Nümunə: Aynurun diplomu üçün kimliyə bağlı təklif")

#kod("text", "openid-credential-offer://?credential_offer_uri=
  https%3A%2F%2Fissuer.tamga.network%2Fexample-university%2Foffers%2F8a3f9c21", baslik: "Nümunə: QR kodun daşıdığı ünvan")

Təqdimat sənədində hər sənəd konfiqurasiyasının identifikatoru və əhatəsi (#{raw("scope")}) növün URN-idir; format həmişə #{raw("dc+sd-jwt")}, imza və sübut alqoritmi yalnız ES256, toplu vermə həcmi isə 10-dur. Təxirə salınmış vermə nöqtəsi və bildiriş nöqtəsi bu gün elan edilmir (§2.1, §9, §10).
]

== Səlahiyyətli mənbə qurumdadır

Diplomun içindəki məlumat kimindir? Tamga-nın cavabı qətidir: məlumat qurumun öz sistemindədir və orada qalır. Host edilən sənəd vermə xidmətində belə şəbəkə şəxs qeydi saxlamır; sənəd məlumatları imza anında qurumun #{strong[səlahiyyətli mənbəyindən]} (#{emph[authentic source]}) oxunur və sənəd veriləndən sonra yaddaşdan silinir (ADR-0020). Layihə rəhbərliyinin bu qərardakı istiqaməti aydın idi: tələbələrin toplu yüklənməsi yoxdur, təklif e-poçtunu qurum özü göndərir, şəbəkənin şəxs məlumatı ilə işi yoxdur. Aİ-də də sənəd provayderi atributu səlahiyyətli mənbədən alır və vasitəçinin mənbə məlumatını daimi saxlaması gözlənilmir.

İki yol müəyyən edilib (Şəkil 13). #{strong[A yolunda]} qurum başladır: qurumun sistemi şəbəkənin API-sinə sənəd növünü, qurumun şəxs üçün istifadə etdiyi qeyri-şəffaf istinadı (#{raw("subject_ref")}) və iki uyğunlaşdırma açarını, yəni şəxsin şəxsiyyət nömrəsini və doğum tarixini göndərir. Xidmət bu açarları açıq şəkildə saxlamır; hər qurum üçün açarlı hash (HMAC-SHA-256 \[26\]) saxlayır. Keçidi şəxsə qurum özü göndərir; şəbəkə şəxsin əlaqə ünvanını görmür (AS3). Aynur keçidi açdıqda cüzdan şəxsiyyət sənədini təqdim edir; təqdim edilən sənəddəki şəxsiyyət nömrəsi və doğum tarixinin hash-i təklifdəki hash ilə uyğun gəlməzsə, sənəd verilmir. Keçidi başqası ələ keçirsə belə, sənədi ala bilməz (AS2). #{strong[B yolunda]} şəxs başladır: Aynur cüzdanda universiteti seçir və şəxsiyyət sənədini təqdim edir; sənəd vermə xidməti imzalı, qısaömürlü sorğu ilə qurumun sorğu nöqtəsinə müraciət edir. Qeyd varsa, sənəd verilir, yoxdursa, "qurumun qeydiyyatında tapılmadı" cavabı qayıdır və cavab saxlanmır. Daimi olan yalnız qurumun qeyri-şəffaf şəxs istinadı (ləğv və yeniləmə üçün) və kimliyə bağlı təklifdəki açarlı hash-dir (AS1).

Şəbəkənin öz qeydiyyat dəftərini saxlaması (şəxs məlumatını şəbəkəyə daşıyır) yalnız sınaq mühitinə saxlanıldı; təklif e-poçtunu şəbəkənin göndərməsi (şəbəkəyə əlaqə ünvanını göstərir) rədd edildi; kimlik bağı olmadan yalnız əməliyyat koduna əsaslanmaq şəxsiyyət sənədi olmayanlar üçün ehtiyat kimi qaldı (ADR-0020). #{emph[Vəziyyət: hər iki yol host edilən xidmətdə işləyir.]}

#sekil(13, [Səlahiyyətli mənbə qurumdadır: A yolu və B yolu], "figures/wp-az/sekil-13.svg", yarim: false)

#kutu("teknik", [Cüzdanın başlatdığı vermə])[
Cüzdanın başlatdığı yolda avtorizasiya kodu axını OAuth-un təhlükəsizlik genişlənmələri ilə birlikdə işləyir: avtorizasiya sorğusu əvvəlcə arxa kanaldan ötürülür (PAR \[21\], RFC 9126), kod mübadiləsi PKCE \[22\] (S256) ilə qorunur və müştəri identifikatoru parol deyil, cüzdan nüsxəsi attestasiyasıdır (PR13). Şəxsin kimliyi qurumun sənəd vermə xidmətinə edilən standart təqdimatla uyğunlaşdırılır (SPEC-PROTO-0001 §11.2).

#adimlar((
  ("Cüzdan → Sənəd verən", [#{strong[PAR.]} Tələb olunan növü (#{raw("scope")} = növün URN-i), qayıdış ünvanını, PKCE dəyərini və varsa #{raw("issuer_state")}-i arxa kanaldan ötürür; sorğuya cüzdan nüsxəsi attestasiyası və onun sahiblik sübutu əlavə edilir.], $"request_uri" <- "PAR"(s, "code_challenge", "WIA")$),
  ("Cüzdan → Sənəd verən", [#{strong[Avtorizasiya.]} Avtorizasiya nöqtəsini çağırır; sənəd verən şəxsiyyət sənədini istəyən imzalı təqdimat sorğusu qaytarır (şəxsiyyət nömrəsi, doğum tarixi, ad, soyad).], $"sorğu" <- "authorize"("request_uri")$),
  ("Cüzdan → Sənəd verən", [#{strong[Təqdimat.]} Standart təqdimat axınını işlədir; sənəd verən təqdimatı tam yoxlama xəttindən keçirir.], $"vp_token" -> "T0 + A…E"$),
  ("Sənəd verən", [#{strong[Uyğunlaşdırma.]} Şəxsiyyət nömrəsini və doğum tarixini təklifdəki hash ilə və ya qurumun mənbəyindəki qeydlə uyğunlaşdırır; uyğun gəlmirsə, #{raw("access_denied")}.], $"HMAC"_k ("şəxsiyyət no", "doğum t.") attach(=, t: ?) "təklif hash-i"$),
  ("Cüzdan → Sənəd verən", [#{strong[Token.]} Avtorizasiya kodunu PKCE sirri ilə tokenə çevirir; kod birdəfəlikdir və ən çoxu 60 saniyəlikdir.], $"access_token" <- ("code", v)$),
  ("Cüzdan → Sənəd verən", [#{strong[Sənəd.]} Nonce, açar sübutları (#{raw("proof")}) və sənəd sorğusu; addımlar qurumun başlatdığı axınla eynidir (Bölmə 9.4).], $"proofs" -> "credential"$),
))

İstifadə edilmiş avtorizasiya kodu ikinci dəfə gələrsə, sənəd verən həmin koddan verilmiş tokenləri əvvəlcə geri alır. Bu, kodun sızdığı şübhəsi olduqda şəxsin sessiyasını bağlamağı hücumçunun koddan istifadəsinin qarşısını almaqdan önə qoyan şüurlu seçimdir (RFC 9700 \[23\] §4.5; SPEC-PROTO-0001 §11.2).
]

== Yalnız real cüzdanlara

Sənəd verən qarşısındakının siyahıda tanınan cüzdan, yoxsa saxta müştəri olduğunu bilmək istəyir. Aİ modelində cavab cüzdan provayderinin imzaladığı iki sübutdur (ADR-0025; FW-POL-0002). #{strong[Cüzdan nüsxəsi attestasiyası]} (#{emph[Wallet Instance Attestation]}, WIA) cüzdanın siyahıda qeydiyyatlı provayderin həlli olduğunu bildirir. Onun ömrü 24 saatdan qısadır və hər əməliyyatda yeni açar və yeni ləğv girişi ilə alınır; iki qurum eyni WIA-nı görmür, provayder də cüzdanın neçə qurumla əlaqə saxladığını öyrənmir. #{strong[Açar attestasiyası]} (#{emph[key attestation]}, KA) isə sənədin bağlanacağı açarların hansı anbarda durduğunu, proqram təminatında, yoxsa telefonun təhlükəsiz zonasında olduğunu bildirir; onun səviyyəsi həqiqəti deməyə borcludur, təsdiqlənməmiş bəyan sübuta yazılmır (WIA3).

Sənəd verən WIA-nın imzasını, imzalayanın siyahıdakı cüzdan provayderinə məxsus olduğunu, müddətini, sahiblik sübutunu və ləğv statusunu yoxlayır; KA-nın imzasını, ləğv statusunu və anbar səviyyəsinin qurumun minimum həddini qarşıladığını yoxlayır. Siyahıda olmayan provayderin cüzdanına sənəd verilmir; ləğv edilmiş sübutla da verilmir (PR11, PR19). Qurumlar minimum həddi öz siyasətləri ilə yüksəldə bilər. Real şəbəkədə şəxsiyyət xidməti yalnız açar attestasiyalı sorğunu qəbul edir və təhlükəsiz zona səviyyəsini minimum hədd kimi tətbiq edir; sandbox və lokal inkişaf proqram təminatı səviyyəsini qəbul etməyə davam edir (SPEC-PROTO-0001 §11.1.1). Köhnə model 30 gün etibarlı olan və hər quruma eyni göstərilən tək cüzdan sübutu idi; əlaqələndirilə bildiyi və ləğv edilə bilmədiyi üçün ondan imtina edildi (ADR-0025). Təfərrüat Bölmə 13-dədir.

== DPoP, nonce və açar sübutu

Sənəd vermə axınında üç ayrı mexanizm üç ayrı suala cavab verir. Birincisi tokenlə bağlıdır: giriş tokeni oğurlanarsa nə olur? Tamga-da giriş tokeni #{strong[DPoP]} \[20\] ilə göndərənə bağlıdır (RFC 9449). Cüzdan müvəqqəti P-256 açarı ilə imzalanmış sübut göndərir və sənəd verən tokeni bu açarın barmaq izinə bağlayır; tokeni oğurlayan şəxs açar onda olmadığı üçün ondan istifadə edə bilmir. Sübut birdəfəlikdir və ±5 dəqiqəlik pəncərəyə malikdir; tokenin ömrü 5 dəqiqədir (PR9, PR17).

İkincisi aktuallıqla bağlıdır: cüzdanın sübutu indicə yaradılıb, yoxsa başqa yerdən köçürülüb? Sənəd verənin #{strong[nonce nöqtəsi]} 5 dəqiqə etibarlı, birdəfəlik dəyər (#{raw("c_nonce")}) verir və dəyər #{strong[atomik]} şəkildə istifadə olunur; "əvvəlcə yoxla, sonra sil" deyə iki addımda aparılan istifadə eyni sübutun iki dəfə istifadəsinə yol açan yarış vəziyyəti yaradardı (PR4). OpenID4VCI 1.0-da bu dəyər yalnız nonce nöqtəsindən gəlir.

Üçüncüsü açarla bağlıdır: sənədin bağlanacağı açar həqiqətən cüzdandadırmı? Cüzdan bu açarla kiçik JWT imzalayır: #{strong[açar sübutu]} (#{raw("proof")}, növü #{raw("openid4vci-proof+jwt")}); içində sübutun hansı sənəd verən üçün olduğu (#{raw("aud")}), yaradılma anı (#{raw("iat")}) və indicə alınmış #{raw("nonce")} olur. Sübutun başlığındakı açıq açar sənədin #{raw("cnf")} sahəsinə daxil olacaq açardır; KA da bu başlıqda daşınır. Sübutda yalnız ES256 qəbul edilir (PR5).

#kutu("teknik", [DPoP bağı və qurumun başlatdığı vermənin addımları])[
DPoP bağında token sübutdakı açıq açarın RFC 7638 \[24\] barmaq izinə bağlanır. Barmaq izi açarın məcburi sahələrinin əlifba sırası ilə və boşluqsuz yazılmış JSON-unun SHA-256 hash-idir. Sənəd nöqtəsində hər sorğu həmçinin tokenin hash-ini (#{raw("ath")}) daşıyır:

#formul[$ "jkt" &= "BASE64URL"("SHA-256"("JSON"({"crv", "kty", "x", "y"}))) \
"token.cnf.jkt" &attach(=, t: ?) "jkt"("DPoP sübutundakı jwk") \
"ath" &= "BASE64URL"("SHA-256"("giriş tokeni")) $]

Spesifikasiyadakı nümunə P-256 açarı (#{raw("x = f83OJ3D2…VEU")}, #{raw("y = x_FEzRu9…I5a0")}) üçün barmaq izi #{raw("oKIywvGUpTVTyxMQ3bwIIeQUudfr_CkLMjCE19ECD-U")} alınır; dəyərlər nümunədir. Qurumun başlatdığı, əvvəlcədən səlahiyyətləndirilmiş kodlu axın bu addımlarla irəliləyir (SPEC-PROTO-0001 §1–§8; Şəkil 14):

#adimlar((
  ("Qurum → Aynur", [#{strong[Təklif.]} Ekranda QR kod və ayrıca 6 rəqəmli əməliyyat kodu göstərir; təklif ünvanı birdəfəlikdir.], $"offer_uri", "tx_code"$),
  ("Cüzdan → Sənəd verən", [#{strong[Təklif və təqdimat.]} Təklifi və imzalı təqdimat sənədini yükləyir; imzalayanı siyahıdakı qurum sertifikatı ilə uyğunlaşdırır.], $"metadata" -> "siyahı"$),
  ("Cüzdan → Sənəd verən", [#{strong[Token.]} Əvvəlcədən səlahiyyətləndirilmiş kodu və əməliyyat kodunu DPoP sübutu və cüzdan nüsxəsi attestasiyası ilə göndərir.], $"access_token" <- ("code", "tx_code", "DPoP", "WIA")$),
  ("Cüzdan → Sənəd verən", [#{strong[Nonce.]} Nonce nöqtəsindən təzə dəyər alır.], $"c_nonce" <- "nonce nöqtəsi"$),
  ("Cüzdan", [#{strong[Açarlar.]} On nüsxə üçün on ayrı açar yaradır; provayderdən açar attestasiyası (KA) alır və açar sübutunu imzalayır.], $k_1 dots.c k_(10) quad pi = "imza"("aud", "iat", "c_nonce")$),
  ("Cüzdan → Sənəd verən", [#{strong[Sənəd sorğusu.]} #{raw("Authorization: DPoP")} başlığı, eyni açarla yeni DPoP sübutu (#{raw("ath")} daxil) və başlığında KA daşıyan açar sübutu.], $"POST /credential"$),
  ("Sənəd verən", [#{strong[Yoxlamalar.]} Token və əhatə; sübutun imzası, #{raw("aud")}, #{raw("iat")}; nonce-u atomik istifadə et; açarların fərqliliyi; növ səlahiyyəti hələ də qüvvədədirmi.], $"nonce" in "təzə toplu" => "sil"$),
  ("Sənəd verən", [#{strong[İmza.]} Məlumatı səlahiyyətli mənbədən oxuyur, hər nüsxəni ayrı açara bağlayır, hər nüsxəyə ləğv siyahısında təsadüfi yer ayırır və qurumun açarı ilə imzalayır.], $"cnf"_i = k_i quad "idx"_i <- "təsadüfi"$),
  ("Sənəd verən → Cüzdan", [#{strong[Cavab.]} Nüsxələri qaytarır; hər biri SD-JWT VC sətridir və son tilda ilə bitir.], $"credentials"[1 dots.c 10]$),
))

Növ səlahiyyətinin sənəd nöqtəsində yenidən soruşulması lazımsız görünə bilər; təqdimat sənədi yaradılarkən o, artıq yoxlanılmışdı (PR2). Lakin səlahiyyət təqdimat sənədi keşə alındıqdan sonra geri çəkilmiş ola bilər; bu ucuz yoxlamadır, səhv sənəd yaratmağın bədəli isə yüksəkdir (SPEC-PROTO-0001 §7.3).
]

Xəta kodları standartın öz kodlarıdır və fərdi məlumat ehtiva etmir: "Aynur Məmmədova üçün qeyd tapılmadı" deyilmir, #{raw("credential_request_denied")} deyilir (PR8). Axının bəzi təfərrüatları 2026-cı ilin oktyabrında OpenID Foundation-ın uyğunluq test aləti ilə sandbox-da aparılan öz-sınaqdan çıxdı (ADR-0059, ADR-0060); bu öz-sınaqdır, sertifikatlaşdırma ayrıca prosesdir (Bölmə 16.5).

#sekil(14, [Qurumun başlatdığı sənəd vermə: ardıcıllıq diaqramı], "figures/wp-az/sekil-14.svg", yarim: false)

== Toplu vermə: on nüsxə, on açar

Aynur diplomunu Timura, sonra başqa işəgötürənə, sonra təqaüd təşkilatına göstərə bilər. Hər dəfə eyni nüsxəni göstərsəydi, bu qurumlar eyni #{raw("cnf")} açarından və eyni ləğv yerindən üçünün də eyni şəxslə əlaqə saxladığını anlaya bilərdi. Həll hər təqdimatda fərqli nüsxədən istifadə etməkdir (SPEC-PROTO-0001 §8.1). Tamga-da bir vermə əməliyyatında #{strong[on nüsxə]} verilir və hər nüsxə #{strong[fərqli cihaz açarına]} bağlanır (PR6). Sənəd verən bir sorğuda eyni açarla iki sübut gələrsə, sorğunu rədd edir. Cüzdan hər yoxlayan tərəfə ayrıca nüsxə göstərir və eyni yoxlayan tərəfə eyni nüsxəni göstərməyə davam edir (Bölmə 13.4).

On rəqəmi tarazlıqdır: tək nüsxə əlaqələndirilmə imkanını açıq qoyur, əlli nüsxə israf yaradır; dəyər pilot məlumatları ilə yenidən tənzimlənəcək (SPEC-PROTO-0001 §8.3, Açıq Məsələlər 4). Hər diplom nüsxəsi ləğv siyahısında #{strong[ayrıca yer]} tutur. Diplom ləğv edildikdə on yerin hamısı işarələnir; hansı yerlərin eyni diploma aid olduğunu yalnız qurum öz verilənlər bazasında bilir və bu uyğunluq heç vaxt kənara çıxmır (PR10). On bitin eyni anda dəyişməsi kənardan siqnal ola bilərdi; lakin ləğv siyahıları dəyişiklik olsa da, olmasa da sabit intervalla dərc edildiyi üçün hansı bitlərin birlikdə dəyişdiyi görünmür (Bölmə 12.4).

Giriş tokeni 5 dəqiqəlik ömrü ərzində bir neçə sənəd sorğusunda istifadə edilə bilər; lakin yalnız əhatə etdiyi konfiqurasiya üçün, cəmi on nüsxəyə qədər və həmişə bağlı olduğu DPoP açarı ilə. Təkrar istifadə ömrü uzatmır (ADR-0059, AT1–AT3). Birdəfəlik token Aİ-nin istinad sənəd verənindən fərqlənir və şəbəkə kəsildikdə yeni səlahiyyət tələb edirdi; məhdudiyyətsiz təkrar istifadə isə ləğv yerlərini tükəndirə bilərdi. Bilet və ZK nüsxəsi tək paket kimi qalır.

== Səssiz yeniləmə

Nüsxələr dizayna görə tükənir. Qurum sənədlərində (tələbə arayışı və diplom; biletlər istisna olmaqla) nüsxələr azaldıqda və ya müddəti bitmək üzrə olduqda cüzdan şəxsdən soruşmadan yeni nüsxə ala bilər (ADR-0023). Hədləri sənəd verən elan edir: iki istifadə edilməmiş nüsxə qaldıqda və ya yeddi günlük ömür qaldıqda (SPEC-PROTO-0001 §2.1). Cüzdan yeniləməni tətbiq ön planda olarkən və təsadüfi gecikmə ilə edir.

Yeniləmə ilk vermə əməliyyatında verilən #{strong[yeniləmə tokeni]} ilə aparılır. Token birdəfəlikdir, hər istifadədə yenisi ilə əvəz edilir və sənəd verən yalnız onun hash-ini saxlayır. Yeniləmədə sənəd verən qeydi səlahiyyətli mənbədən yenidən oxuyur; şəxs mənbədə yoxdursa, token etibarsız olur və sənəd verilmir (PR18). Tokenin nəyə bağlı olduğu bir dəfə dəyişdi. İlk qərarda token ilk əməliyyatdakı DPoP açarına bağlı idi. OAuth-un cüzdan attestasiyası ilə müştəri autentifikasiyası profili isə bağın #{strong[müştəri nüsxəsinin açarına]}, yəni ilk əməliyyatdakı cüzdan nüsxəsi attestasiyasının #{raw("cnf")} açarına qurulmasını və DPoP açarının dəyişə bilməsini tələb edir. Tamga bağı buna uyğun dəyişdi (ADR-0060). Cüzdan hər əməliyyatda yeni WIA açarından istifadə etdiyi üçün bağın açarı yalnız həmin sənədlə saxlanılır və yeniləmədə provayderdən bu açar üçün təzə WIA istənilir; açarı yalnız həmin qurum görür. Tək daimi nüsxə açarı daha sadə olardı və bütün qurumlar eyni açarı görəcəyi üçün rədd edildi.

Şəxs məlumatını saxlamayan növlərdə səssiz yeniləmə yoxdur: şəxsiyyət sənədi və əlaqə sənədləri yeniləmə tokeni vermir və yeniləmə şəxsin hərəkəti ilə olur. Şəxsiyyət xidmətinin yeganə istisnası sıfır bilik sübutu üçün istifadə edilən qısaömürlü nüsxələrdir; onların tokeni şəxsiyyət sənədini yeniləmir, yalnız qısaömürlü nüsxə alır və yalnız cüzdan bu əhatəni ayrıca istədikdə verilir (ADR-0044, ADR-0062; Bölmə 15.4). #{emph[Vəziyyət: səssiz yeniləmə və müştəri nüsxəsi bağı işləyir (paketlərdə 0.7.2-dən bəri).]}

== Bildiriş və "siz deyilsinizsə"

Sənəd vermə axınının son addımı şəxslə bağlıdır. Şəbəkənin arxitektura sənədi sənəd cüzdana əlavə edildikdə şəxsə "sənədiniz cüzdana əlavə edildi; siz deyilsinizsə, bildirin" mesajının getməsini nəzərdə tutur (FW-ARF-0001 §4.3). E-poçt və ya qısa mesajla gedən təkliflərdə bu mesaj sənəd veriləndən sonra hər iki kanala gedir (SPEC-PROTO-0001 §3.3). Şəxsin xəbəri olmadan cüzdana alınan sənəd beləliklə aşkar edilir; istifadə edilmiş təklif xəbərdarlığı ilə birlikdə bu, ələ keçirilmiş keçidin izini sürən ikinci işarədir.

Bundan ayrı olaraq OpenID4VCI cüzdanın sənədi qəbul etdiyini sənəd verənə bildirdiyi #{strong[bildiriş nöqtəsi]} müəyyən edir. Tamga sənəd verənləri bu nöqtəni bu gün elan etmir (SPEC-PROTO-0001 §10). Nöqtə əlavə edilərsə, bildirişlər yalnız sayğac kimi istifadə ediləcək, şəxs üzrə saxlanmayacaq; cüzdan sənədin sonradan silindiyini heç bir sənəd verənə bildirmir. Təxirə salınmış vermə nöqtəsi də təqdim edilmir: qeyd hazır deyilsə, sorğu rədd edilir və qurum sonra yeni təklif yaradır (SPEC-PROTO-0001 §9). #{emph[Vəziyyət: şəxsə bildiriş qaydası müəyyən edilib; standart bildiriş nöqtəsi və təxirə salınmış vermə təqdim edilmir.]}

Aynurun diplomu artıq cüzdanındadır, on nüsxə şəklində, hər biri ayrı açara bağlı. Timurun ondan necə soruşacağı, cüzdanın nəyi göstərəcəyi və yoxlayan tərəfin hansı ardıcıllıqla nəyi yoxlayacağı sonrakı bölmələrin mövzusudur.

= Təqdimetmə: OpenID4VP, DCQL və Yaxın Məsafə

Aynur uydurma Nümunə Holdinqin elanına müraciət edir. Bakıdakı diplomu üçün bu gün bu yol açıq deyil: şəbəkədə yalnız Türkiyə siyahısı aktivdir, Azərbaycan üçün yalnız yer ayrılıb (bu, heç bir dövlətlə razılaşma və ya danışıqlar barədə bildiriş deyil). Buna görə nümunəni Aynurun Türkiyə siyahısındakı uydurma Nümunə Universitetindən aldığı diplom üzərində qururuq. İşə qəbul üzrə məsul şəxs Timurun ekranında QR kod görünür; Aynur onu oxudur, cüzdanı ona kimin nə istədiyini deyir, Aynur təsdiqləyir və bir neçə saniyə sonra ekranda "qəbul" yazılır. Diplom bir dəfə verilir, lakin onlarla dəfə təqdim edilir və hər təqdimatda üç sual var: Kim istəyir? Nə istəyir və niyə? Cavab yalnız ona çatırmı? Tamga bu suallara Aİ-nin seçdiyi protokolla, #{strong[OpenID4VP 1.0]} \[31\] (#{emph[OpenID for Verifiable Presentations]}, yoxlanıla bilən təqdimat protokolu) və onun Aİ-dəki yüksək təminat profili #{strong[HAIP 1.0]} \[32\] ilə cavab verir (SPEC-PROTO-0002). Protokolun əsasları silsilənin səkkizinci yazısında izah edildi; burada Tamga-nın nəyi niyə seçdiyinə diqqət yetiririk.

== İmzalı sorğu və yoxlayan tərəfin kimliyi

QR kodun içində sənəd yoxdur, fərdi məlumat da yoxdur; yalnız sorğunun yüklənəcəyi ünvan (#{raw("request_uri")}) var. Cüzdan bu ünvandan #{strong[imzalı sorğu obyekti]} yükləyir. Sorğu yoxlayan tərəfin (#{emph[verifier]}) giriş sertifikatı ilə imzalanmış JWT-dir; başlığında sertifikat zənciri (#{raw("x5c")}) olur. İmzasız sorğu rədd edilir (PV6); imza olmadan cüzdan qarşısındakının kim olduğunu bilə bilməz, şəxsi həddindən artıq tələbə qarşı da xəbərdar edə bilməz.

Yoxlayan tərəf özünü #{strong[müştəri identifikatoru]} (#{emph[client identifier]}) ilə təqdim edir. HAIP 1.0 §5 imzalı sorğularda yoxlayan tərəfin #{raw("x509_hash")} prefiksindən istifadə etməsini və cüzdanın onu qəbul etməsini məcburi edir. Dəyər sorğunu imzalayan son sertifikatın hash-indən hesablanır. Tamga yalnız bu prefiksi qəbul edir; əvvəllər istifadə edilən domen adına əsaslanan prefiks (#{raw("x509_san_dns")}) və imzasız #{raw("redirect_uri")} prefiksi rədd edilir (ADR-0034). Domen adı qaydasının təhlükəsizlik tərəfi qorunur: cavab ünvanının domen adı sorğunu imzalayan sertifikatın SAN sahəsində yazılmalıdır.

#kutu("teknik", [Müştəri identifikatoru necə hesablanır, niyə ikinci identifikator lazımdır])[
#{raw("x509_hash")} dəyəri son sertifikatın DER kodlaşdırmasının SHA-256 hash-inin base64url yazılışıdır (OpenID4VP 1.0 §5.9.3):

#formul[$ "client_id" = "x509_hash:" ‖ "base64url"("SHA-256"("DER"("son sertifikat"))) $]

Siyahı naşiri eyni dəyəri yoxlayan tərəfin giriş sertifikatından hesablayıb etibar siyahısındakı qeydə yazır. Cüzdan sorğudakı dəyəri siyahıdakı qeydlə uyğunlaşdırır və yoxlayan tərəfin qeydiyyatdakı adını, əhatə dairəsini və statusunu tapır. Dəyər əl ilə verilmir; paketlər onu sertifikatdan hesablayır (ADR-0034 CI1).

Bu identifikatorun zəif tərəfi var: sertifikat yeniləndikdə hash də dəyişir. Psevdonimlər, sənəd nüsxələrinin uyğunluğu və keçid kartları bu dəyərə bağlansaydı, hər yeniləmədə şəxsin hesabları və kartları itərdi. Buna görə hər yoxlayan tərəf qeydi həmçinin #{strong[daimi identifikator]} daşıyır: sertifikatın SAN sahəsindəki domen adı (#{raw("dns_name")}). Sertifikatdan asılı olmamalı olan hər şey bu sahəyə bağlanır (ADR-0034 CI3, CI4). Daimi identifikator kimi #{raw("rp_id")} də nəzərdən keçirildi, lakin o da sertifikatdan törədiyi üçün seçilmədi.
]

Sorğu daha bir şey daşıyır: yoxlayan tərəfin həmin istifadə üçün aldığı #{strong[qeydiyyat sertifikatı]} (#{emph[registration certificate]}, ETSI TS 119 475 \[46\]). Giriş sertifikatı "kim olduğumu", qeydiyyat sertifikatı isə "nəyi, hansı məqsədlə istəmək üçün qeydiyyatda olduğumu" deyir. Sertifikat sorğunun #{raw("verifier_info")} sahəsində gəlir; yalnız etibar siyahısındakı qeyddən yaradılır və qeydiyyat qurumunun ayrıca açarı ilə imzalanır (ADR-0026). Cüzdan dörd şeyi ardıcıllıqla yoxlayır: imzanın siyahıların siyahısındakı qeydiyyat qurumu açarına məxsus olduğunu, müddəti (ən çoxu 12 ay), sertifikatdakı qurum identifikasiya nömrəsinin (#{raw("sub")}) giriş sertifikatındakı #{raw("organizationIdentifier")} ilə eyni olduğunu və tələb olunan sahələrin sertifikatın əhatə dairəsində qaldığını. İlk üçündən biri uyğun gəlməzsə, cüzdan məlumat göndərmir (ADR-0026 WRC4).

Aİ-nin 2026\/1731 \[7\] saylı İcra Reqlamenti bu yoxlamanı cüzdanda 2028-08-11-dən etibarən məcburi edir. Tamga o tarixə qədər xəbərdarlıqla keçid dövrü nəzərdə tutmuşdu; 2026-10-19-da keçid dövrü ləğv edildi və qeydiyyat sertifikatı daşımayan sorğu bu gündən, şəxsdən soruşulmadan rədd edilir (ADR-0056 K10). Xəbərdarlıq qeydiyyatsız istifadəyə qapı açıq qoyurdu və uyğunluğu pozan dəyişikliyin ən ucuz anı cüzdanlar yayılmamışdan əvvəl idi. Qeydiyyat sertifikatları 2026-10-29-dan bəri siyasət identifikatoru və qeydiyyat qurumunun 1 bitlik ləğv siyahısında giriş də daşıyır; cüzdan ləğv edilmiş sertifikatlı sorğuya məlumat göndərmir (ADR-0068, FW-POL-0003). #{strong[Vəziyyət:]} işləyir (real şəbəkə və sandbox).

== DCQL ilə nə istənilir

Yoxlayan tərəf nə istədiyini #{strong[DCQL]} (#{emph[Digital Credentials Query Language]}, rəqəmsal sənəd sorğu dili) ilə bildirir. OpenID4VP-nin köhnə layihələrindəki Presentation Exchange Tamga-da ümumiyyətlə dəstəklənmir; #{raw("presentation_definition")} daşıyan sorğu rədd edilir (PV1). İki sorğu mühərrikini birlikdə saxlamaq köhnə yükü olmayan şəbəkə üçün yalnız hücum səthi demək idi.

DCQL-in ən konkret faydası ən kiçik sualı verə bilməkdir. Tələbə endirimi soruşan kinoteatr yalnız "tələbədirmi" deyə soruşur.

#kod("json", "{
  \"credentials\": [
    {
      \"id\": \"student\",
      \"format\": \"dc+sd-jwt\",
      \"meta\": { \"vct_values\": [\"urn:tamga:edu:StudentCredential:1\"] },
      \"claims\": [ { \"path\": [\"is_enrolled\"], \"values\": [true] } ]
    }
  ]
}", baslik: "Nümunə: tələbə endirimi üçün ən kiçik DCQL sorğusu (dəyərlər nümunədir)")

Kinoteatr bu sorğu ilə adı, universiteti, ixtisası və qəbul ilini görmür. Timurun işə qəbul siyasəti isə diplom üçün səkkiz sahə istəyir (məzuniyyət, dərəcə, səviyyə, sahə kodu, verən qurum, tarix, ad, soyad); orta bal və dissertasiyanın adı sorğuda olmadığı üçün cüzdandan çıxmır. #{raw("vct_values")} massivdir və yoxlayan tərəfə ən azı iki sxem versiyasını birlikdə qəbul etmək tövsiyə olunur; əks halda sxemin yenilənməsi köhnə məzunları kənarda qoyur (SPEC-PROTO-0002 §4.2).

Sorğu variantlar da təklif edə bilər (#{raw("credential_sets")}: "diplom və ya tələbə arayışı"; #{raw("claim_sets")}: "əvvəlcə dissertasiyalı, olmazsa dissertasiyasız"). Hər variant şəxsin razılıq ekranında anlamalı olduğu mürəkkəblikdir; buna görə bir sorğuda ən çoxu üç sənəd və iki #{raw("credential_sets")} girişi ola bilər (PV9). Həddin təxmini olduğu və istifadəçi testi ilə tənzimlənəcəyi spesifikasiyada yazılıb. İstəyə bağlı toplu standart olaraq paylaşılmır; tələb olunan sahələrdən birini daşımayan sənəd ümumiyyətlə göndərilmir (PV12). mdoc \[34\] formatındakı şəxsiyyət sənədində yaş soruşan yoxlayan tərəf yalnız #{raw("[\"tamga.id.1\", \"age_over_18\"]")} yolunu istəyir və yalnız #{raw("true")} görür.

== Razılıq ekranı və həddindən artıq tələb

Razılıq ekranı şəxsin gördüyü yeganə üzdür və onun ardıcıllığı qayda ilə müəyyən edilib: kim istəyir (siyahıdakı qeydiyyatlı ad və qeydiyyat işarəsi), nə üçün (qeydiyyat sertifikatındakı məqsəd mətni), nə paylaşılacaq (sahə-sahə, dəyərləri ilə), nə paylaşılmayacaq (gizli qalan sahələrin yalnız adları), sonra razılıq və ya imtina (SPEC-WALLET-0001 §5.1). Dördüncü bənd qeyri-adidir. "Orta balınız paylaşılmayacaq" sətri seçici paylaşımın işlədiyini şəxsə göstərir; görünməyən qorunma şəxs üçün yox kimidir.

Sorğu qeydiyyatdakı əhatə dairəsini aşarsa, nə olur? Burada iki yol var idi: cüzdan sorğunu bloklaya bilər və ya şəxsi xəbərdar edib qərarı ona buraxa bilər. Tamga xəbərdar etməyi seçdi. Cüzdan şəxsin alətidir; şəxs bilərəkdən qeydiyyatsız tədqiqatçıya və ya testə sənəd göstərmək istəyə bilər. Lakin xəbərdarlıq həqiqətən görünməlidir. Razılıq düyməsinin yanındakı kiçik boz yazı bunu təmin etmir; qayda ayrıca vizual blok və gec aktivləşən düymə tələb edir (WL8). Xəbərdarlıq yorğunluğunun qarşısını almaq üçün adi axında heç bir xəbərdarlıq yoxdur (Cədvəl 15).

#tablo([#{strong[Cədvəl 15.]} Sorğunun vəziyyətinə görə cüzdanın davranışı.], (48fr, 48fr, 20fr), ([Vəziyyət], [Cüzdan nə edir], [Mənbə],), (
  ([Yoxlayan tərəf qeydiyyatdadır, bütün sahələr əhatə daxilindədir], [Adi razılıq ekranı, xəbərdarlıq yoxdur], [SPEC-WALLET-0001 §5.2],),
  ([Qeydiyyatdadır, lakin bəzi sahələr əhatədən kənardadır], [Əhatədən kənar sahələr ayrıca blokda və fərqli rəngdə; razılıq düyməsi 3 saniyə gecikmə ilə], [WL8],),
  ([Yoxlayan tərəf siyahıda qeydiyyatda deyil], [Axını kəsən ayrıca ekran: "Kim olduğunu təsdiqləyə bilmirik" → Davam \/ Ləğv], [SPEC-PROTO-0002 §6.1],),
  ([Sorğuda qeydiyyat sertifikatı yoxdur, sertifikat etibarsızdır və ya ləğv edilib], [Şəxsdən soruşulmadan rədd; məlumat getmir], [ADR-0026, ADR-0056 K10, ADR-0068],),
  ([Sənəd verənin paylaşım qaydası ödənmir və ya qiymətləndirilə bilmir], [Ayrıca xəbərdarlıq bloku, varsa "Qaydanı oxu"; standart düymə "Paylaşma", "Yenə də paylaş" gecikmə ilə], [ADR-0046],),
  ([Eyni yoxlayan tərəfdən 24 saatda 3-dən çox fərqli sorğu], [Şəxsə məlumat: "Bu yoxlayan tərəf bu gün 4 fərqli sənəd soruşdu"], [SPEC-WALLET-0001 §5.3],),
))

Beşinci sətir sənəd verənin səsidir: qurum növün yalnız müəyyən yoxlayan tərəflərə göstərilməsini istəyə bilər (Aİ ARF \[11\] Mövzu 43). Qayda sənədin içinə qoyulmadı; sənəd formatı dəyişməsin, qayda yoxlayan tərəfə açılmasın və təqdimatda şəbəkə sorğusu lazım olmasın deyə qurumun imzalı sənəd vermə məlumatında (#{emph[Credential Issuer metadata]}) dəyər kimi dərc edilir, cüzdan onu sənədlə birlikdə saxlayır (ADR-0046). Qayda ödənməzsə, son qərarı yenə şəxs verir; qəti blok eyni sənədin Aİ cüzdanında fərqli davranmasına səbəb olacağı üçün rədd edildi. Son sətir isə yoxlayan tərəfin fərqli sorğularla şəxsin hansı sənədlərə sahib olduğunun xəritəsini çıxarmasını görünən edir.

== Cavab və şifrələmə

Aynur təsdiqlədikdə cüzdan yalnız tələb olunan sahələrin disclosure-larını (#{emph[disclosure]}) seçir və onlara #{strong[KB-JWT]} (#{emph[Key Binding JWT]}, cihaz bağı imzası) əlavə edir. KB-JWT sənədin bağlı olduğu cihaz açarı ilə imzalanır və üç şeyi bir-birinə bağlayır: yoxlayan tərəfin müştəri identifikatorunun hamısını (#{raw("aud")}, prefiksi ilə birlikdə; PV7), sorğunun birdəfəlik dəyərini (#{raw("nonce")}) və göndərilən sətrin hash-ini (#{raw("sd_hash")}; hesablanması Bölmə 8-də). Beləliklə qeydə alınmış təqdimat nə başqa yoxlayan tərəfə, nə də eyni yoxlayan tərəfin başqa sorğusuna yenidən təqdim edilə bilər.

#kutu("teknik", [Birdəfəlik dəyər niyə 128 bitdir, mdoc-da bağ necə qurulur])[
Sorğudakı #{raw("nonce")} və #{raw("state")} ən azı 128 bit təsadüfidir (SPEC-PROTO-0002 §3). Hücumçunun bir cəhddə düzgün dəyəri tapma ehtimalı belədir:

#formul[$ P = 2^(-128) approx 2.9 dot 10^(-39) $]

mdoc formatında eyni bağ cihaz imzasının üzərində qurulduğu sessiya transkripti (#{emph[SessionTranscript]}) ilə təmin edilir. OpenID4VP 1.0 Əlavə B.2.6.1-ə görə transkript müştəri identifikatorunu, #{raw("nonce")}-u, cavabın şifrələndiyi açarın RFC 7638 \[24\] barmaq izini və cavab ünvanını birlikdə hash-ləyir:

#formul[$ "SessionTranscript" = ["null", "null", ["OpenID4VPHandover", "SHA-256"("CBOR"(["client_id", "nonce", "jwkThumbprint", "response_uri"]))]] $]

Başqa sorğuya daşınan cihaz cavabı yoxlamanın A6 addımında rədd edilir (PV11).
]

Təqdimat fərdi məlumat daşıyır. Buna görə cavab həmişə şifrələnir: sorğu obyektindəki yoxlayan tərəf açarı ilə JWE kimi (#{raw("ECDH-ES")}, #{raw("A128GCM")} və ya #{raw("A256GCM")}; HAIP §5) cavab ünvanına göndərilir (#{raw("direct_post.jwt")}). Şifrələnməmiş cavab rejimlərindən ümumiyyətlə istifadə edilmir (PV3). Nəqliyyat qatının şifrələməsi kifayət deyil; cavab ünvanının qarşısındakı əks proksi, təhlükəsizlik divarı və ya jurnal sistemi məzmunu görə bilər. Cavab nöqtəsi etibarlı cavaba yalnız qayıdış ünvanı verir; başqa heç nə qaytarmır (OpenID4VP 1.0 §8.2).

Aynur verməməyi seçərsə, cüzdan yalnız "vermədi" deyir (#{raw("access_denied")}) və səbəbini bildirmir (PV5). "Şəxsin bu sənədi yoxdur" ilə "şəxs vermək istəmədi" arasındakı fərq yoxlayan tərəfə sızarsa, yoxlayan tərəf sorğular verərək şəxsin hansı sənədlərə sahib olduğunu çıxara bilər. Aşağıdakı addımlar və Şəkil 15 axının bütününü göstərir.

#adimlar((
  ("Timurun serveri", [#{strong[Təqdimatı aç.]} Siyasətdən DCQL yaradır, birdəfəlik dəyərlərlə sorğu obyektini hazırlayır; QR-a yalnız ünvan daxil olur.], $"nonce", "state" <- "təsadüfi"_(>= 128 "bit")$),
  ("Cüzdan → Yoxlayan tərəf", [#{strong[Sorğunu yüklə.]} Ünvandan imzalı sorğu obyektini yükləyir; hər çəkiliş ayrıca qoldur (§10.5).], $"GET request_uri"$),
  ("Cüzdan", [#{strong[Yoxla.]} İmza və zəncir, müştəri identifikatorunun siyahıdakı qeydi, qeydiyyat sertifikatı və onun statusu, paylaşım qaydası, əhatə.], $"client_id" attach(=, t: ?) "qeyd.client_id"$),
  ("Aynur", [#{strong[Təsdiqlə.]} Ekranda kimin, nə üçün, hansı sahələri istədiyini görür; cihazın biometriyası və ya parolu ilə təsdiqləyir.], $"istifadəçinin təsdiqi"$),
  ("Cüzdan", [#{strong[Cavabı qur.]} Yalnız tələb olunan disclosure-ları seçir, KB-JWT-ni imzalayır.], $"aud" = "client_id", quad "sd_hash"$),
  ("Cüzdan → Yoxlayan tərəf", [#{strong[Göndər.]} Cavabı yoxlayan tərəfin açarı ilə şifrələyib cavab ünvanına göndərir.], $"JWE"("vp_token")$),
  ("Yoxlayan tərəf", [#{strong[Yoxla.]} Cavabı açır və yoxlama xəttini (Bölmə 11) işlədir; nəticəni üç dəyərdən biri kimi verir.], $"T0" -> "A" -> "B" -> "C" -> "D" -> "E"$),
))

#sekil(15, [Məsafədən təqdimetmə: imzalı sorğu, razılıq və şifrələnmiş cavab], "figures/wp-az/sekil-15.svg", yarim: false)

== Saxta imtinaya qarşı çəkiliş qolları

2026-10-29-da bağlanan bir boşluq standartın bir çatışmazlığını yaxşı göstərir. OpenID4VP 1.0-da cüzdanın imtina cavabı imzasızdır və şifrələnmədən göndərilə bilər; imtinanı təqdimata bağlayan yeganə şey #{raw("state")} dəyəridir. Tamga-da #{raw("state")} imzalı sorğu obyektində idi və sorğu obyekti QR-dakı ünvandan hər kəs tərəfindən, autentifikasiya olmadan yüklənə bilirdi. Timurun ekranındakı QR-ı qonşu masadan görən biri obyekti yükləyib "şəxs imtina etdi" deyə saxta cavab göndərə və Aynurun müraciətini poza bilərdi. Fərdi məlumat sızmazdı, lakin əməliyyat əngəllənərdi.

Həll sorğu ünvanının hər çəkilişində yeni #{strong[çəkiliş qolu]} açmaqdır (ADR-0067). Hər çəkiliş eyni məzmunla yenidən imzalanmış sorğu obyekti alır; lakin #{raw("state")}, #{raw("nonce")} və cavabın şifrələmə açarı hər qolda təzədir. QR-ı görən şəxs yalnız öz qolunun #{raw("state")}-ini öyrənir. Onun saxta imtinası yalnız öz qolunu bağlayır; Aynurun cüzdanı öz qolunda təqdimatı tamamlayır. Təqdimat bütövlükdə yalnız tək çəkilişi varsa və həmin qol bağlanıbsa, rədd edilmiş sayılır; bir neçə çəkiliş varsa, müddəti bitənə qədər açıq qalır və ilk etibarlı təqdimat qalib gəlir (Cədvəl 16).

#tablo([#{strong[Cədvəl 16.]} Saxta imtina problemi üçün nəzərdən keçirilmiş variantlar (ADR-0067).], (38fr, 18fr, 48fr), ([Variant], [Nəticə​​​​​​​​], [Səbəb],), (
  ([İlk imtina təqdimatı bağlayır (geniş yayılmış tətbiq)], [rədd], [QR-ı görən hər kəs real şəxsin əməliyyatını poza bilər],),
  ([Cüzdan imtinanı cihaz açarı ilə imzalayır], [rədd], [Standartdan kənardır; imtinanın kimin cihazından gəldiyini yoxlayan tərəfə bağlayır və "imtina səbəbi sızmır" prinsipi ilə ziddiyyət təşkil edir],),
  ([İmtina təqdimatı heç vaxt bağlamır], [rədd], [Adi axında şəxs "vermədim" dedikdə yoxlayan tərəf müddət bitənə qədər gözləyir],),
  ([Hər çəkiliş ayrı qoldur, imtina yalnız öz qolunu bağlayır], [#{strong[seçildi]}], [Standart daxilində qalır; HAIP-in "hər sorğuda efemer açar" qaydasının daha sərt qarşılığıdır],),
))

Qolların yaddaş bədəli var. İlk dizayndakı sabit hədd (təqdimat başına 10 qol) özü əngəlləmə yolu idi; bu gün 10-u aşan çəkiliş heç cavab almamış və ən azı 120 saniyəlik ən köhnə qolun yerini tutur, 32-də yaş şərti düşür, cavabı emal edilən qol heç vaxt atılmır. Sahiblik sübutuna çatmayan cavablar qol üzrə sayılır və beşincidə yalnız həmin qol bağlanır. Qalan risk qeydə alınıb: QR-ı real cüzdandan əvvəl yükləyib dərhal imtina edən biri tək qollu təqdimatı bağlaya bilər; bu, cihazlararası axının məlum həddidir (OpenID4VP 1.0 §14) və yoxlayan tərəf yeni təqdimat açır. #{strong[Vəziyyət:]} işləyir (paketlərdə 0.7.4-dən bəri) (Şəkil 16).

#sekil(16, [Saxta imtina hücumu və çəkiliş qolları], "figures/wp-az/sekil-16.svg", yarim: false)

== Brauzerdən təqdimetmə

Aynur müraciəti telefonundan, şirkətin saytında etsəydi, QR-a ehtiyac qalmazdı. W3C-nin #{strong[Digital Credentials API]} \[36\]-si (rəqəmsal sənəd interfeysi) brauzerin cüzdanı birbaşa çağırmasına imkan verir; cavab rejimi #{raw("dc_api.jwt")} olur (OpenID4VP 1.0 Əlavə A). Bu yolun güclü tərəfi var: təqdimatın hədəfi brauzerin özünün verdiyi mənşə (#{emph[origin]}) dəyəridir. Saxta sayt öz mənşəyindən başqasını iddia edə bilməz; bu, fişinqə qarşı güclü bağdır. Lakin mənşə təkbaşına yoxlayan tərəfin nəyi istəməyə səlahiyyətli olduğunu demir. Tamga buna görə bu yolda da imzalı sorğu obyektindən istifadə edir: mənşə fişinqi, #{raw("x509_hash")} isə səlahiyyət yoxlamasını həll edir (SPEC-PROTO-0002 §7.2).

Bəzi brauzerlər OpenID4VP-ni bu interfeys vasitəsilə daşımır və mdoc-u ISO\/IEC 18013-7 \[35\] Əlavə C ilə istəyir. Bu halda yoxlayan tərəf eyni təqdimat üçün ikinci sorğu yaradır; cavab HPKE \[25\] (RFC 9180) ilə şifrələnir və sessiya transkripti səhifənin mənşəyini ehtiva edir. Masaüstündə brauzer interfeysi varsa, standart yol odur; QR ehtiyat kimi yanında qalır. #{strong[Vəziyyət:]} yoxlayan tərəf hissəsi işləyir; cüzdan hissəsi planlaşdırılıb (şəbəkədəki ilk cüzdanda Android kodu yazılıb, hələ kompilyasiya edilməyib və cihazda sınaqdan keçirilməyib; iOS yoxdur; FW-ARF-0001 §2.8).

== Vebsaytlara giriş

Dilnoza bir saytın tərtibatçısıdır və saytına "Tamga ilə daxil ol" düyməsi qoymaq istəyir (məhsul adı ADR-0030). Bu axın da eyni OpenID4VP sorğusudur; fərq saytın hesab açarı kimi #{strong[sayt üçün ayrıca psevdonim]} almasıdır, sənəd dəyərlərinin heç biri hesab açarı olmur (ADR-0031). Qeydiyyatda sayt yalnız siyasətində icazə verilən sahələri (məsələn, ad və soyad) və həmin sayta xas psevdonim açarını görür. İki fərqli sayt eyni şəxsi uyğunlaşdıra bilməz; şəxs telefonunu dəyişib kimliyini yenidən təsdiqlədikdə eyni psevdonimlər geri qayıdır. Gündəlik giriş saytın öz passkey-i ilə edilir və heç bir sənəd sahəsi paylaşılmır. Psevdonimin necə törədildiyi, qalan risk (şəxsiyyət xidmətinin psevdonimi nəzəri olaraq törədə bilməsi) və onun sıfır bilik sübutu ilə aradan qaldırılması hədəfi Bölmə 15-də izah edilir. #{strong[Vəziyyət:]} işləyir.

== Yaxın məsafə: körpülər və hədəf

Məsafədən təqdimetmədə QR-ı yoxlayan tərəf göstərir, cüzdan oxuyur. Giriş qapısında, kassada və ya əməkdaşın qarşısında isə əksi lazımdır: QR-ı cüzdan göstərir. ARF bu sahəni ISO\/IEC 18013-5 ilə həll edir. Cüzdanın göstərdiyi QR yalnız tanışlıqdır (#{emph[device engagement]}); əsas sorğu və cavab Bluetooth və ya NFC üzərindən, sessiya şifrələməsi ilə gedir və sənəd mdoc formatındadır (silsilənin doqquzuncu yazısı \[74\]).

Tamga bu hədəfi kodlaşdırıb, lakin hələ cihazlarda sınaqdan keçirməyib. O günə qədər iki körpü yolundan istifadə olunur (ADR-0012). Hər ikisinin əsaslandığı prinsip belədir: #{strong[yoxlama üçün birdəfəlik dəyəri əmin olmaq istəyən tərəf yaradır.]} Cüzdan QR göstərirsə, ya ikinci kanal açılır (ISO 18013-5), ya da qısa zaman pəncərəsi və təkrar siyahısı ilə kifayətlənilir. Tək QR-ın daşıya biləcəyi təxminən 2,9 KB SD-JWT \[15\] VC-ni və sertifikat zəncirini daşımağa yetmir; QR ya müraciət ünvanı, ya da kiçik, imzalı, fərdi məlumatsız token daşıyır.

- #{strong[B, keçid kartı.]} Şəxs sənədini bir dəfə, adi məsafədən axınla qeydiyyatlı yoxlayan tərəfə göstərir və bunun müqabilində keçid hüququ alır. Sonra hər keçiddə cüzdan 60 saniyəlik, fərdi məlumat ehtiva etməyən imzalı token göstərir (§10.9).
- #{strong[C, üzbəüz yoxlama.]} Şəxs yoxlamanı cüzdandan özü başladır; təqdimat adi məsafədən yolla Tamga Verify-a gedir. Qəbul zamanı cüzdana qayıdan ünvan beş dəqiqə etibarlı baxış açarı daşıyır; cüzdan onu QR kimi göstərir, əməkdaş oxutduqda nəticəni görür (SPEC-PROTO-0002 §5.4). Şəxs sahələri təqdimatdan əvvəl təsdiqləyib.
- #{strong[Hədəf, ISO\/IEC 18013-5.]} Bluetooth üzərindən mdoc. Oxuyucu qeydiyyat sertifikatını sorğunun içində CBOR \[29\] formatında göndərir və sorğunu öz sertifikatı ilə imzalayır; cüzdan məsafədən axındakı yoxlamaları burada da aparır və oxuyucu sertifikatının siyahıya bağlandığını əlavə olaraq yoxlayır (SPEC-PROTO-0002 §7.5). NFC bu mərhələdə yoxdur.

Körpülər standartı təqlid etmir: C standart OpenID4VP-dir, B isə standartdan kənar olduğu açıq yazılmış, versiyalı tokendir. "Göstər" ekranı üç yolda eynidir; Bluetooth gəldikdə yalnız QR-ın arxasındakı nəqliyyat dəyişir (Şəkil 17) (Cədvəl 17).

#tablo([#{strong[Cədvəl 17.]} Təqdimetmə kanalları və onların bugünkü vəziyyəti.], (19fr, 21fr, 28fr, 29fr), ([Kanal], [QR-ı kim göstərir​​​​​​​​​], [Mexanizm], [Vəziyyət],), (
  ([Eyni cihaz (keçid)], [yoxdur], [OpenID4VP, #{raw("direct_post.jwt")}], [İşləyir],),
  ([Fərqli cihaz (QR)], [yoxlayan tərəf], [OpenID4VP, #{raw("direct_post.jwt")}, çəkiliş qolları], [İşləyir],),
  ([Brauzer (Digital Credentials API, 18013-7 Əlavə C)], [yoxdur], [OpenID4VP #{raw("dc_api.jwt")}; mdoc üçün Əlavə C], [Yoxlayan tərəf işləyir; cüzdan planlaşdırılıb],),
  ([Keçid kartı (B)], [cüzdan], [60 san imzalı token + terminal açarı], [İşləyir (sandbox; real şəbəkədə bu gün giriş qapısı siyasəti yoxdur)],),
  ([Üzbəüz yoxlama (C)], [cüzdan], [Adi təqdimat + 5 dəq baxış açarı], [İşləyir (Tamga Verify)],),
  ([Bluetooth (ISO\/IEC 18013-5)], [cüzdan], [Tanışlıq QR-ı + BLE sessiyası, mdoc], [Planlaşdırılıb (kodlaşdırılıb, cihaz testini gözləyir)],),
  ([NFC], [—], [—], [Bu mərhələdə yoxdur],),
))

#sekil(17, [Yaxın məsafədə üç yol: keçid kartı, üzbəüz yoxlama və ISO\/IEC 18013-5 hədəfi], "figures/wp-az/sekil-17.svg", yarim: false)

== Giriş qapısı və bilet

Nurlan konsertə gedir. Bileti bilet satıcısının verdiyi sənəddir və fərdi məlumat daşımır: tədbir, məkan, bilet sinfi, oturacaq və satıcının bilet nömrəsinin hash-i var, ad yoxdur (FW-RB-0004). Bilet cihaz açarına bağlıdır; Nurlan onu dostunun telefonuna köçürə bilməz.

Nurlan bileti konsertdən əvvəl bir dəfə giriş qapısının yoxlayan tərəfinə göstərir və keçid hüququ alır. Qapıda cüzdan token imzalayır və onu QR kimi göstərir. Tokenin içində yalnız qeyri-şəffaf keçid identifikatoru, hədəf yoxlayan tərəf, vaxt sahələri və təkrar identifikatoru var; QR 400 baytı keçmir. Ekranda canlı saat və 60 saniyəlik geri sayım olur; ekran görüntüsü müddət bitdikdə işə yaramır.

#adimlar((
  ("Nurlan → Yoxlayan tərəf", [#{strong[Qeydiyyat.]} Bileti adi məsafədən axınla bir dəfə göstərir; yoxlayan tərəf yalnız qəbul nəticəsindən keçid hüququ verir.], $"pass_grant" <- "ACCEPTED"$),
  ("Cüzdan", [#{strong[Token.]} Qapıda nüsxə açarı ilə qısaömürlü tokeni imzalayır; QR-a yalnız token daxil olur.], $"exp" - "iat" <= 60 "san"$),
  ("Qapı → Tamga Verify", [#{strong[Yoxlama sorğusu.]} Tokeni terminal qrupuna bağlı terminal açarı ilə göndərir.], $"Authorization: Bearer" "tk_"…$),
  ("Tamga Verify", [#{strong[Yoxlama.]} Açarı, qrupun siyahıda aktiv olduğunu, imzanı, müddəti, təkrar identifikatorunu və biletin istifadə edilmədiyini yoxlayır.], $"jti" in.not "təkrar siyahısı"$),
  ("Tamga Verify → Qapı", [#{strong[Keçid.]} Qəbul zamanı bileti istifadə edilmiş sayır; eyni biletlə ikinci keçid rədd edilir.], $"istifadə edilib" = 1$),
))

Eyni tokenin iki dəfə oxudulmasına qarşı terminal qrupunun qapıları token identifikatorlarını (#{raw("jti")}) ortaq siyahıda saxlayır. Eyni biletin iki dəfə istifadəsinə qarşı bilet ləğv siyahısındakı bir bitlə "istifadə edilib" kimi işarələnir; siyahı sabit intervalla dərc edildiyi üçün (Bölmə 12) interval daxilindəki ikinci keçidi qapıların ortaq "istifadə edilib" siyahısı dayandırır. Oflayn qapı yalnız müddəti yoxlayır və 60 saniyə ərzində köçürülən QR-ın başqa qapıdan keçməsi riskini qəbul edir (ADR-0012 K3).

2026-10-26-dakı təhlükəsizlik yoxlaması qapıların sorğu göndərdiyi nöqtənin autentifikasiya tələb etmədiyini aşkar etdi: QR-ı görən biri tokeni özü göndərib bileti istifadə edə və real qapıda Nurlanı dayandıra bilərdi. Qərar hər terminal qrupunun operatordan aldığı 192 bitlik #{strong[terminal açarı ilə]} özünü təsdiqləməsidir; açarsız sorğu tokenə ümumiyyətlə toxunmur, server isə yalnız açarın hash-ini saxlayır (ADR-0065). Qarşılıqlı TLS və qapı sertifikatı hədəf kimi qaldı; giriş sertifikatının şəxsi açarını hər qapı cihazına paylamaq rədd edildi. 2026-10-29-dan bəri qapı qrupları imzalı siyahıda, yoxlayan tərəf qeydinin altında, qapıları idarə edən qurum və qəbul edilən siyasətlərlə birlikdə durur; qurum yalnız öz qapılarının açarlarını idarə edir, siyahıdan çıxarılan qrupun qapıları dərhal dayanır (ADR-0069).

Təşkilatçı həm sənəd verən, həm də yoxlayan tərəf olduğu üçün biletdə əlaqələndirilməzlik mənasızdır və bu qəbul edilib. Keçid kartı hər təqdimatda biometriya soruşmur; bu, qeydiyyatda verilən müddətli (ən çoxu təxminən 6 ay) və əhatəsi müəyyən razılığa əsaslanır, hər təqdimat cüzdanın tarixçəsinə yazılır və razılıq istənilən an geri götürülə bilər (WL13, WL14). #{strong[Vəziyyət:]} sandbox-da işləyir; real şəbəkədə bu gün müəyyən edilmiş giriş qapısı siyasəti yoxdur; sertifikatlı və oflayn qapı identifikasiyası üçün sahə və oxuyucu hazırdır, istifadə edilmir (planlaşdırılıb).

= Yoxlama Xətti: Beş Qat, Üç Nəticə

Timurun ekranında "qəbul" yazılmazdan əvvəl onun serverində otuzdan çox kiçik yoxlama ardıcıllıqla işlədi. Sənədi yoxlamaq "imza uyğun gəlirmi" sualından ibarət deyil. İmza etibarlı ola bilər, lakin sənədi imzalayan qurum həmin növü verməyə səlahiyyətli olmaya bilər; səlahiyyətli ola bilər, lakin sənəd ləğv edilmiş ola bilər; hər şey yerində ola bilər, lakin yoxlayan tərəf istədiyindən artığını almış ola bilər.

== Niyə sabit xətt

Tamga yoxlamanı tək normativ ardıcıllığa bağlayır və hər addıma daimi kod verir (SPEC-API-0001 §1). Bunun üç səbəbi var. Birincisi ardıcıllıqdır: eyni sənəd hansı yoxlayan tərəfdə, hansı paketlə yoxlanılırsa yoxlanılsın, eyni nəticəni almalıdır. İkincisi izah edilə bilməkdir: "yoxlama uğursuz oldu" əvəzinə "C2-də dayandı, qurum bu növü verməyə səlahiyyətli deyil" demək olar. Üçüncüsü auditdir: nəticələr audit qeydlərində illərlə saxlanılır. Buna görə addım kodunun mənası heç vaxt dəyişmir; yeni addım yeni kod alır, ləğv edilmiş kod yenidən istifadə edilmir (AP1). C2-nin mənası 2029-cu ildə dəyişsəydi, 2027-ci ilin qeydləri səhv oxunardı.

Addımlar ardıcıllıqla işləyir və ilk uğursuzluqda dayanılır; yalnız audit qeydi (E4) hər halda yazılır. HTTP status kodu nəticəni daşımır: rədd edilmiş sənəd uğurlu API çağırışıdır və 200 qaytarır, 4xx yalnız sorğu xətasıdır (AP5). Bunlar qarışdırılsa, müştərilər şəbəkə xətasını etibarsız sənəddən ayıra bilməz, monitorinq sistemləri də rədd edilmiş sənədləri nasazlıq sayar.

== Qatlar

Cədvəl 18 qatları və hər birinin seçilmiş addımlarını verir.

#tablo([#{strong[Cədvəl 18.]} Yoxlama xəttinin qatları və seçilmiş addım kodları (tam siyahı SPEC-API-0001 §1).], (9fr, 33fr, 48fr), ([Qat], [Verdiyi sual], [Seçilmiş addımlar],), (
  ([T0 İlkin şərt], [Əlimdəki etibar siyahısı aktualdırmı?], [Siyahı köhnəlibsə və ya əlçatmazdırsa, siyasətin aktuallıq hədləri əskikdirsə: yoxlanıla bilmədi],),
  ([A Format], [Sənəd pozulmayıbmı, imzalıdırmı, bu sorğuya aiddirmi?], [A2 başlıq (#{raw("ES256")}, #{raw("dc+sd-jwt")}, #{raw("x5c")}) · A3 zəncir kökə çatır · #{strong[A3b]} qurumun identifikatoru sertifikatdan · A3d cihaz bağı (#{raw("cnf")}) var · A5 hər disclosure-un hash-i sənəddədir · A6 KB-JWT (#{raw("aud")}, #{raw("nonce")}, #{raw("sd_hash")}) · A7 müddət],),
  ([Z1 Sıfır bilik yolu], [Sübut etibarlıdırmı?], [Sxem siyahıdadır və fayl hash-i uyğundur; yalnız tələb olunan elementlər açıqlanıb (Bölmə 15)],),
  ([B Növ], [Sənəd növü tanınırmı?], [B2 növ qeydiyyatdadır və geri çəkilməyib · B4 növ təsvirinin hash-i #{raw("vct#integrity")} ilə eynidir · B6 JSON Schema-ya uyğunluq],),
  ([C Etibar], [Qurum siyahıdadırmı, bu növə səlahiyyətlidirmi?], [C1 qurum sənədin verildiyi anda qəbul edilə bilərdimi · #{strong[C2]} qurum bu növə səlahiyyətli idimi (buraxıla bilməz) · C3 tanınma · C4 kateqoriya göstəricisi qeydlə uyğundur],),
  ([D Status], [Sənəd ləğv edilib və ya dayandırılıbmı?], [D2 ləğv siyahısı əvvəlcədən yükləmə keşindən · D3 siyahının imzalayanı qurumun qeydiyyatdakı ləğv açarıdır · D4 aktuallıq · D5 lövbər jurnalı ilə uyğunluq, versiya geri getməyib · D6 bit dəyəri],),
  ([E Siyasət], [Yoxlayan tərəfin istədikləri ödənirmi?], [E1 qurum sinfinin həddi · E2 tələb olunan sahələr açıqlanıb · E3 qeydiyyatdakı əhatə aşılmayıb · E4 audit qeydi yazıldı],),
))

İki addım cədvəlin içində itməməlidir. #{strong[A3b]} qurumun identifikatorunu sənədin #{raw("iss")} sahəsindən deyil, imzalayan son sertifikatın barmaq izindən törədir. Bunun niyə vacib olduğu bir hücumla görünür: yoxlayan tərəf identifikatoru #{raw("iss")}-dən oxusaydı, eyni kök altında etibarlı sertifikatı olan istənilən qurum #{raw("iss")} sahəsinə başqa universitetin ünvanını yazıb onun adından sənəd yarada bilərdi. İmza öz sertifikatı ilə etibarlı, zəncir etibarlı, #{raw("iss")} isə saxta olardı. #{raw("iss")} buna görə yalnız uyğunluq yoxlamasında istifadə edilir (AP12). İdentifikatorun necə törədildiyi Bölmə 6-dadır.

#{strong[C2]} isə heç bir konfiqurasiya ilə buraxıla bilməz (AP8). Yoxlayan tərəf siyasəti istədiyi qədər yumşalda bilər, lakin "bu qurum bu sənəd növünü verməyə səlahiyyətli idimi" sualını bağlaya bilməz. Bağlaya bilsəydi, siyahıdakı hər qurum istənilən sənədi etibarlı kimi göstərə bilərdi.

Paketlər bu ardıcıllığı tək funksiyada tətbiq edir və təhlükəsizlik girişlərinin unudulmasına imkan vermir. Etibar lövbəri, yoxlayan tərəf qeydi və ya ləğv siyahısının imzalayanı verilməzsə, funksiya rədd edir; yoxlamanı bilərəkdən buraxmaq istəyən bunu açıq #{raw("\"none\"")} dəyəri ilə yazmağa məcburdur və buraxılan addım nəticədə görünür (ADR-0056 MR1). Unutmaq artıq rədd deməkdir; bilərəkdən buraxmaq isə koda yazılmış, yoxlamada görünən qərardır.

== Zamana bağlı səlahiyyət

C1 və C2 sənədin verildiyi anı soruşur: qurum sənədin #{raw("iat")} anında siyahıda aktiv və bu növə səlahiyyətli idimi (AP11)? Bunun əvəzinə "qurum bu gün sənəd verə bilərmi" soruşulsaydı, iki səssiz xəta yaranardı. Bağlanan qurumun əvvəllər verdiyi bütün diplomlar bir gecədə etibarsız görünərdi. Növ yeni versiyaya keçib köhnəsi geri planlaşdırıldıqda köhnə versiya ilə verilmiş hər sənəd rədd edilərdi. Hətta planlı sertifikat yeniləməsi də sənədləri yıxardı. Yoxlama keçmişə yönəlik əməliyyatdır: sənəd keçmişdə verilib və həlledici olan həmin günün vəziyyətidir (FW-ARF-0001 §4.4).

Bu qaydanın həddi var və o hədd ləğvdir. Qurum sənədin verildiyi gün səlahiyyətli idisə, sənəd C qatından keçir; lakin sənəd sonradan ləğv edilibsə, D qatında dayanır. Zaman oxu etibar üçün keçmişə, status üçün bu günə baxır.

== Üç dəyərli nəticə

Xəttin nəticəsi üç dəyərdən biridir: #{strong[qəbul]} (#{raw("ACCEPTED")}), #{strong[rədd]} (#{raw("REJECTED")}) və #{strong[yoxlanıla bilmədi]} (#{raw("INDETERMINATE")}). Üçüncüsü hökm deyil; infrastruktura çatmağın mümkün olmadığını və ya məlumatın köhnəldiyini bildirir. "Bu diplom saxtadır" ilə "hazırda yoxlaya bilmirəm" arasındakı fərq insanın işə götürülüb-götürülməməsidir. Buna görə "yoxlanıla bilmədi" nəticəsi rədd ilə eyni səbətə qoyulmur və istifadəçi interfeysində ayrıca göstərilir (AP2). "Yoxlanıla bilmədi" nəticəsinin səbəbi məcburi sahədə gəlir: növ təsvirinə çatmaq mümkün olmadı, ləğv siyahısına çatmaq mümkün olmadı, ləğv siyahısı köhnəlib, ləğv siyahısındakı dəyərin müəyyən mənası yoxdur, etibar siyahısı köhnəlib və s.

#kutu("teknik", [Nəticə necə birləşir])[
Xəttin addımlarını sabit ardıcıllıqla $s_1, s_2, dots, s_n$ kimi yazaq (T0, A1 … E3). Hər addımın çıxışı "keçdi", "rədd" və ya "yoxlanıla bilmədi"dir. Xətt ilk uğursuzluqda dayandığı üçün nəticə keçməyən ilk addımın çıxışıdır; belə addım yoxdursa, qəbuldur:

#formul[$ k^* &= min (k : s_k != "keçdi") \
"nəticə" &= s_(k^*) quad "(belə addım yoxdursa, ACCEPTED)" $]

Bu qaydanın bir nəticəsi var: etibar siyahısı köhnəlibsə (T0), nəticə "yoxlanıla bilmədi" olur və sonrakı addımlar heç işləmir; sənəd saxta olsa belə, "rədd" deyilmir. Köhnəlmiş siyahı ilə verilən rədd siyahıya yeni əlavə edilmiş qurumun düzgün sənədini də rədd edə bilərdi. Gözlənilməz proqram xətası da eyni qayda ilə "yoxlanıla bilmədi" verir, rədd vermir.

Nəticə obyektində iki şey heç vaxt olmur. Açıqlanan sahələrin #{strong[dəyərləri]} nəticə obyektinə daxil olmur, yalnız adları daxil olur (AP3); dəyərlər ayrıca nöqtədən, ayrıca səlahiyyətləndirmə ilə alınır. Ləğv siyahısındakı mövqe (#{raw("idx")}) isə heç bir cavabda və qeyddə yer almır (AP4). Nəticə obyekti audit qeydinə yazılır və uzun müddət saxlanılır; bu iki qayda həmin qeydin izləmə alətinə çevrilməsinin qarşısını alır.
]

#kod("json", "{
  \"verification_id\": \"vrf_01J8XKQ2M4\",
  \"outcome\": \"ACCEPTED\",
  \"failed_step\": null,
  \"indeterminate_reason\": null,
  \"spec_version\": \"SPEC-API-0001@1.0.0\",
  \"sdk_version\": \"@tamga-network/verifier@0.8.2\",
  \"checks_performed\": [\"T0\", \"A1\", \"A2\", \"A3\", \"A3b\", \"…\", \"D6\", \"E1\", \"E2\", \"E3\", \"E4\"],
  \"checks_skipped\": [],
  \"issuer\": { \"issuer_id\": \"0x7f3a…\", \"state_code\": \"TR\", \"category\": \"EDUCATION\", \"assurance\": \"I2\" },
  \"schema\": { \"vct\": \"urn:tamga:edu:DiplomaCredential:1\", \"status\": \"ACTIVE\" },
  \"disclosed_claims\": [\"is_graduate\", \"qualification_title\", \"eqf_level\", \"isced_f_code\",
                       \"awarding_body_name\", \"awarding_date\", \"family_name\", \"given_name\"],
  \"status\": { \"value\": \"VALID\", \"token_age_sec\": 1830 },
  \"evaluated_at\": \"2026-11-04T09:12:44Z\"
}", baslik: "Nümunə: qısaldılmış nəticə obyekti; dəyər yoxdur, idx yoxdur (dəyərlər nümunədir)")

#{raw("checks_skipped")} boş deyilsə, yoxlayan tərəf bunu görünən etməlidir; yoxlamanın buraxıldığını səssizcə qəbul etmək onun buraxılmasının məqsədini puça çıxarır (Şəkil 18).

#sekil(18, [Yoxlama xətti: altı qapı, üç çıxış], "figures/wp-az/sekil-18.svg", yarim: false)

== Host edilən yoxlayan tərəf

Hər yoxlayan tərəf bu xətti öz serverində işlədə bilər; paketlər açıqdır və dəyərlər heç bir vasitəçidən keçmir. Öz infrastrukturunu qurmaq istəməyənlər üçün şəbəkənin host etdiyi yoxlayan tərəf #{strong[Tamga Verify]}-dır (ADR-0030). Vasitəçi yeni risk gətirir və bu risk ADR-0017 ilə daraldıldı. İlk dizaynda dəyər nöqtələri təqdimat identifikatorunu bilən hər kəsə cavab verirdi; identifikator brauzer tarixçəsində və ya ekran paylaşımında görünə bilərdi. Bu gün dəyər qaytaran hər nöqtə yalnız təqdimatı açan yoxlayan tərəfə açıqdır. Yoxlayan tərəf kimliyini siyahıda qeydiyyatlı giriş sertifikatının açarı ilə imzaladığı ən çoxu 60 saniyəlik, təkrarlana bilməyən bəyanatla sübut edir; yeni sirr lazım deyil. Dəyərlər bir dəfə oxunur və ən gec beş dəqiqə sonra yaddaşdan silinir; brauzerə gedən heç bir token dəyər oxumaq səlahiyyəti daşımır (ADR-0017 HV1–HV5). Sayt üçün statik API açarı, ayrıca OAuth serveri və qarşılıqlı TLS eyni təminatı daha çox sirr və ya istismar yükü ilə verdiyi üçün seçilmədi. Tamga Verify yoxlayan tərəf adından sorğu açdıqda cüzdan #{strong[əsl yoxlayan tərəfin]} qeydiyyatdakı adını göstərir, vasitəçini ayrıca qeyd edir və əhatəni əsl yoxlayan tərəfin qeydinə görə yoxlayır; vasitəçilik əlaqəsi hər iki qeyddə yazılmayıbsa, sorğu rədd edilir (PV14). #{strong[Vəziyyət:]} işləyir.

= Ləğv və Həyat Dövrü

Elif Nümunə Universitetinin tələbə işləri şöbəsində çalışır. Bir səhər bir məzunun dissertasiyasında plagiat şübhəsi olduğu barədə məktub gəlir. Araşdırma həftələrlə çəkəcək. Elifin əlində yalnız iki pis seçim olsaydı, ya diplomu haqsız yerə birdəfəlik ləğv edəcək, ya da araşdırma bitənə qədər heç nə etməyəcəkdi. Bu bölmə sənədin sonradan necə geri alındığını və ya dayandırıldığını, bunun isə niyə heç kimi izləmədən edilməli olduğunu izah edir. Mövzunun əsası seriyanın yeddinci yazısında \[72\] izah edilib.

== İzləmədən geri almaq

Qurumun "bu sənəd artıq etibarlı deyil" deyə bilməsi üçün yoxlayan tərəf haradasa baxmalıdır. Ən asan yol hər yoxlamada quruma müraciət etməkdir; lakin onda qurum məzunlarının hansı işəgötürənlərə nə vaxt müraciət etdiyini öyrənir və kağız diplomda olmayan izləmə kanalı yaranır.

Tamga-nın cavabı IETF-in #{strong[Token Status List]} \[17\] layihəsidir (ləğv siyahısı, status siyahısı; Aİ-nin 2026\/1731 \[7\] ilə sabitlədiyi draft-20 versiyası izlənilir; SPEC-CRED-0003). Qurum hər sənədə böyük bit massivində təsadüfi mövqe verir. Sənəd ləğv edildikdə həmin mövqedəki dəyər dəyişir. Massiv sıxılır, imzalanır və sabit intervallarla dərc edilir. Yoxlayan tərəf massivi əvvəlcədən yükləyir və sənədi gördükdə heç kimə müraciət etmədən öz nüsxəsinə baxır. Qurum sənədin harada və nə vaxt göstərildiyini öyrənə bilmir.

#kutu("teknik", [Sənədin statusunu oxumaq])[
Sənəd #{raw("status.status_list")} daxilində öz mövqeyini (#{raw("idx")}) və siyahının ünvanını (#{raw("uri")}) daşıyır; bu sahə seçici paylaşım ilə gizlədilə bilməz. Siyahı hər sənəd üçün $b$ bit istifadə edir (Tamga-da 1 və ya 2). Sıra nömrəsi kiçik olan sənəd baytın ən kiçik dəyərli bitinə yerləşir. Açılmış massivin $n$-ci baytını $D[n]$ ilə işarə etsək:

#formul[$ n &= floor((i dot b) / 8) \
k &= (i dot b) mod 8 \
"status" &= floor(D[n] / 2^k) mod 2^b $]

Nümunə dəyərlərlə, iki bitlik qurum siyahısında mövqeyi 48213 olan diplom:

#formul[$ i dot b &= 48213 dot 2 = 96426 \
n &= floor(96426 / 8) = 12053, quad k = 96426 mod 8 = 2 \
"status" &= floor(D[12053] / 4) mod 4 $]

Eyni mövqe bir bitlik şəxsiyyət xidməti siyahısında olsaydı, $n = floor(48213 / 8) = 6026$, $k = 48213 mod 8 = 5$ olardı və tək bit oxunardı. Siyahının ölçüsü də asan hesablanır. Minimal tutum olan 100.000 mövqe ilə:

#formul[$ "2 bit:" quad & 100.000 dot 2 = 200.000 "bit" = 25.000 "bayt" \
"1 bit:" quad & 100.000 dot 1 = 100.000 "bit" = 12.500 "bayt" $]

Siyahı əsasən sıfırlardan ibarət olduğu üçün sıxılmış ölçüsü adətən bir neçə yüz bayt olur (SPEC-CRED-0003 §3.3).
]

Şəkil 19 eyni nümunəni sənəddən bitə qədər izləyir.

#sekil(19, [Ləğv siyahısı: sənəddən mövqeyə, mövqedən bitə], "figures/wp-az/sekil-19.svg", yarim: false)

== Niyə zəncirdə deyil

Bu qərarın ilk forması bir ziddiyyətdən doğdu. 2026-09-09-da depo auditində spesifikasiya "siyahı zəncirdən kənarda, göstərici zəncirdə" deyirdi; müqavilə kodu isə bit massivini zəncirdə saxlayırdı və hər ləğv bir zəncir əməliyyatı idi. ADR-0008 ziddiyyəti zəncirdən kənar siyahının xeyrinə bağladı. Əsas əsaslandırma məxfilikdir. İcazəli reyestrdə hər əməliyyat hər validator qovşağına vaxt möhürü ilə birlikdə görünür. "Filan universitet filan gün, filan saatda, filan mövqedəki sənədi ləğv etdi" məlumatı tək başına şəxsi göstərmir. Lakin intizam qərarının tarixi, işdən çıxma günü və ya bir fakültənin bağlanması bu möhürlə birləşdikdə şəxs dairəsini daraldır (Cədvəl 19).

#tablo([#{strong[Cədvəl 19.]} Ləğv siyahısının yeri üçün nəzərdən keçirilən variantlar (ADR-0008).], (35fr, 13fr, 48fr), ([Variant], [Nəticə], [Səbəb],), (
  ([Bit massivi tamamilə zəncirdə], [rədd], [Ləğv anı bütün qovşaqlara sızır; daimi zəncir vəziyyəti böyüyür; standartın daşıma modelindən kənara çıxır],),
  ([Kriptoqrafik akkumulyator və ya sıfır biliklə ləğv], [təxirə salındı (tədqiqat)], [Ən güclü məxfilik; lakin yetkin kitabxana və cüzdan dəstəyi yoxdur],),
  ([Qısaömürlü sənəd, ləğv yoxdur], [qismən qəbul edildi], [Tələbə sənədində (ən çox 90 gün) doğrudur; müddətsiz diplomda yanlışdır],),
  ([Təcili ləğv zəncirdə, adi ləğv kənarda], [rədd], [Zəncirə yazılan ləğv məhz ən həssas olanıdır; sızmanı cəmləşdirir],),
  ([İmzalı siyahı zəncirdən kənarda, yalnız hash-i lövbərlənir], [#{strong[seçildi]}], [Ləğv anı görünmür; standartın öz modelidir; yoxlayan tərəf aqressiv keşləyir],),
))

Xərc də eyni istiqaməti göstərirdi. 100.000 mövqeli bir bitlik siyahı 12,5 KB-dır; təxminən 200 ali təhsil müəssisəsi üçün bu daimi zəncir vəziyyətində 2,5 MB edir və hər ləğv bir əməliyyatdır (ADR-0008). Bu gün lövbər siyahı naşirinin lövbər jurnalıdır; ortaq reyestr gəlsə, ona yalnız dərclərin hash-i yazılır (Bölmə 19).

== Bit sayı və dayandırma

Standart hər sənəd üçün 1, 2, 4 və ya 8 bitə icazə verir. Tamga iki dəyərdən istifadə edir və hansının istifadə ediləcəyini növün mənası müəyyən edir (ADR-0048) (Cədvəl 20).

#tablo([#{strong[Cədvəl 20.]} Status dəyərləri və hansı növdə istifadə olunduqları.], (13fr, 11fr, 24fr, 27fr), ([Dəyər​​​​​], [Standart adı​​], [Tamga-da mənası], [Harada],), (
  ([#{raw("0x00")}], [VALID], [Etibarlı], [Bütün siyahılar],),
  ([#{raw("0x01")}], [INVALID], [Daimi ləğv; geri dönüşü yoxdur], [Bütün siyahılar],),
  ([#{raw("0x02")}], [SUSPENDED], [Müvəqqəti dayandırma; geri alına bilər], [Yalnız 2 bitlik qurum siyahılarında və yalnız sxemi dayandırmaya icazə verən növdə (bu gün diplom)],),
  ([#{raw("0x03")}], [ehtiyatda], [İstifadə edilmir; oxunarsa rədd], [—],),
))

Şəxsiyyət xidmətinin növləri (şəxsiyyət sənədi, sürücülük vəsiqəsi məlumatı, e-poçt və telefon sənədləri) 1 bitlik siyahılarla dərc edilir və dayandırma yoxdur. Bu, Aİ-nin şəxsiyyət məlumatı (PID) qaydasına uyğunlaşmadır: 2026\/1731 ilə dəyişdirilmiş 2024\/2979 \[5\] saylı reqlamentin II Əlavəsi PID-də statusu yalnız "ləğv edilib \/ ləğv edilməyib" kimi müəyyən edir. Tamga-nın şəxsiyyət sənədi PID deyil, lakin Aİ PID-inin adlarından istifadə edir və dövlətin PID-i gəldikdə onun yerini almağa ən yaxın növdür. Şəxsiyyət haqqında "araşdırma müddətində müvəqqəti olaraq etibarsızdır" deyiləcək vəziyyət də yaranmır; şübhə olduqda sənəd ləğv edilir və şəxs yenidən yoxlanılır.

Qurum siyahıları 2 bitlikdir; dayandırma isə yalnız sxemində #{raw("suspension_allowed: true")} yazılan növlərdə istifadə olunur. Elifin problemi burada həll olunur: diplomu araşdırma müddətində dayandırır, araşdırma bitdikdə ya dayandırmanı aradan qaldırır, ya da onu ləğvə çevirir. Qurum Konsolu "Dayandır" düyməsini yalnız bu növlərdə göstərir. Dayandırma icazəsinin qurum üzrə deyil, növ üzrə verilməsi şüurlu seçimdir; dayandırma növün mənasına bağlıdır və sxem hamı üçün eyni qaydanı bildirir.

Sənəd mdoc \[34\] kimi də verilibsə, eyni məntiqi siyahı iki təsvirlə, ayrı və qeyri-şəffaf ünvanlarda dərc edilir: SD-JWT \[15\] nüsxəsi JWT təsvirinə, mdoc nüsxəsi CWT təsvirinə istinad edir. İki təsvir eyni bitləri daşıyır və eyni dövrdə eyni açarla imzalanır; beləliklə mdoc oxuyucusu JWT təhlilçisi daşımaq məcburiyyətində qalmır.

== Məxfilik qaydaları

Ləğv siyahısının məxfilik faydası bir neçə yerdə asanlıqla pozula bilər. Spesifikasiya bu yerləri bir-bir bağlayır (SPEC-CRED-0003 §5–§6, §9).

- #{strong[Mövqe təsadüfidir.]} Mövqe hər təqdimatda görünür; ardıcıl paylansaydı, məzuniyyət sırası və iki məzun arasındakı vaxt fərqi mövqedən oxunar, seçici paylaşım ilə gizlədilən tarix sızardı.
- #{strong[Tutum böyükdür.]} Hər siyahı ən azı 100.000 mövqelidir və ən çox %80 doldurulur.
- #{strong[Ünvan qeyri-şəffafdır və bölgü yalnız növə görədir.]} #{raw("…/edu-2026-a")} kimi ünvan və ya "2026 məzunları A siyahısındadır" kimi düzən gizlədilmiş məzuniyyət ilini özü deyərdi; ünvan #{raw("…/7f3a9c21")} kimi mənasız sətirdir.
- #{strong[Hər yoxlamada yükləmə qadağandır.]} Yoxlayan tərəf siyahıları planlaşdırılmış toplu əvvəlcədən yükləmə ilə alır; paketlər bunu defolt edir.
- #{strong[Siyahının imzalayanı sabitlənir.]} Ləğv siyahısı sənəd açarından ayrı açarla imzalanır; yoxlayan tərəf imzanı yoxlamazdan əvvəl imzalayanı qurumun siyahıdakı qeydə alınmış ləğv açarına sabitləyir (ADR-0056 K6). Bu açar ələ keçirilsə belə saxta diplom yaratmaq mümkün deyil.

#kutu("teknik", [Təsadüfi mövqe nəyi gizlədir, nəyi gizlətmir])[
Ardıcıl paylamada iki sənədin mövqe sırası onların verilmə sırası ilə həmişə eynidir. Təsadüfi paylamada bu əlaqə qırılır. Tutaq ki, A sənədi B-dən əvvəl verilib; mövqelər tutum daxilindən müstəqil və bərabər paylanmaqla seçildikdə:

#formul[$ "ardıcıl:" quad & P("idx"_A < "idx"_B) = 1 \
"təsadüfi:" quad & P("idx"_A < "idx"_B) = 1 / 2 $]

Yəni mövqelərin sırasına baxan biri püşk atmaqdan yaxşı təxmin edə bilməz. İstifadə edilməmiş mövqenin biti ilə etibarlı sənədin biti eynidir (#{raw("0x00")}); kənardan baxan biri siyahıda neçə sənəd olduğunu belə görə bilmir. Buna görə boş mövqeləri "dolu" göstərməyə çalışan başlanğıc küyü qaydası müşahidə edilə bilən qoruma vermədiyi üçün 2026-10-09-da ləğv edildi.

Təsadüfi mövqenin gizlədə bilmədiyi iki şey var. Birincisi qurumun özüdür: 300 məzunu olan ali məktəb 100.000 mövqeli siyahıda 300 dolu mövqe deməkdir; siyahı böyükdür, lakin "sürü" qurumla məhdudlaşır və #{raw("iss")} sahəsi qurumu onsuz da göstərir. Bu, spesifikasiyada qəbul edilmiş həddir. İkincisi eyni sənədin təkrar göstərilməsidir: mövqe və ünvan bir nüsxədə sabitdir, iki yoxlayan tərəf eyni nüsxəni görüb razılaşsa, uyğunlaşdıra bilər. Həll hər yoxlayan tərəfə fərqli mövqeli ayrı nüsxə göstərməkdir (§13.4, Bölmə 9).
]

== Aktuallıq və qüvvəyə minmə müddəti

Siyahı dəyişiklik olsa da, olmasa da sabit intervalla dərc edilir; bu gün bu interval #{strong[2 dəqiqədir]}. Yalnız ləğv olduqda dərc edilsəydi, yeni versiyanın meydana çıxması "filan dəqiqədə ləğv oldu" demək olardı. İnterval xaricində "təcili" dərc də edilmir; təcili halda düzgün vasitə qurumun dayandırılması və ya sertifikatının ləğvidir (SPEC-CRED-0003 §5.3). ADR-0008 intervalı bir saat təklif etmişdi; spesifikasiya ləğvlərin bir neçə dəqiqəyə görünməsi üçün qısa intervalı və kəsintiyə davam gətirmək üçün uzun etibarlılığı birlikdə seçdi (layihə rəhbərliyinin təsdiqi ilə, 2026-10-09).

Siyahı tokenində iki vaxt sahəsi var. #{raw("ttl")} yoxlayan tərəfin yenisini yükləməzdən əvvəl gözləyə biləcəyi müddətdir və dərc intervalına bərabərdir (120 saniyə). #{raw("exp")} tokenin qəti son anıdır: dərcdən #{strong[6 saat]} sonra. Status serveri kəsintiyə uğrasa, yoxlayan tərəf əlindəki son siyahı ilə 6 saata qədər yoxlamağa davam edir; nəticə dərhal "yoxlanıla bilmədi" vəziyyətinə düşmür.

#kutu("teknik", [Ləğv nə vaxt qüvvəyə minir])[
Ləğv əvvəlcə növbəti dərci, sonra yoxlayan tərəfin növbəti əvvəlcədən yükləməsini gözləyir. Dərc intervalı $Delta_"dərc"$, əvvəlcədən yükləmə intervalı $Delta_"önyükləmə"$ olarsa, ən pis gecikmə:

#formul[$ t_"qüvvədə" lt.eq Delta_"dərc" + Delta_"önyükləmə" $]

Dərc intervalı 120 saniyədirsə və yoxlayan tərəf tövsiyə edildiyi kimi #{raw("ttl")} intervalında yükləyirsə:

#formul[$ t_"qüvvədə" lt.eq 120 + 120 = 240 "san" = 4 "dəqiqə" $]

Yoxlayan tərəf siyahını beş dəqiqədən bir yükləyirsə, hədd $120 + 300 = 420$ saniyə, yəni yeddi dəqiqə olur. Kəsinti tərəfində pəncərə $"exp" - "iat" = 6 "saat" = 21.600 "san"$-dir; bu, istinad siyasətlərindəki maksimal token yaşı ilə (#{raw("max_status_token_age_sec = 21600")}) eynidir.

Yoxlayan tərəf öz riskinə görə daha sərt davrana bilər. Tutaq ki, token 09:00-da dərc edilib və yoxlama 10:30-da aparılır:

#formul[$ "yaş" = "1,5 saat" = 5.400 "san" $]

Aşağı riskli yoxlayan tərəf (hədd 21.600 san) bu siyahı ilə yoxlayır. Rəsmi əməliyyat kimi yüksək riskli yoxlayan tərəf (hədd 600 san) isə eyni vəziyyətdə "yoxlanıla bilmədi, siyahı köhnədir" deyir və yeni siyahını gözləyir (SPEC-CRED-0003 §8.2).
]

Uzun #{raw("exp")}-in bir qiyməti var və bu qiymət də hesablanıb. Şəbəkə yolunu ələ keçirən biri köhnə, amma imzalı tokeni təqdim edərək ləğvi ən çox 6 saat gizlədə bilər. Lövbər yoxlaması bu pəncərəni daraldır: hər dərcin hash-i lövbər jurnalına yazılır və yoxlayan tərəf əlindəki tokenin versiyasının geri getmədiyini yoxlayır (D5). Əvvəlcədən yükləmə lövbərdən əvvəl edilibsə nəticə "yoxlanıla bilmədi", sonra edilibsə rədd olur; beləliklə qurumun ləğv etdiyi sənədi öz serverində səssizcə yenidən "etibarlı" göstərməsi də aşkarlanır (Şəkil 20).

#sekil(20, [Dərc dövrü: dəyişiklik olsa da, olmasa da sabit interval], "figures/wp-az/sekil-20.svg", yarim: false)

== Ləğv siyasəti

Kimin, hansı şərtlə ləğv edə biləcəyi bir siyasət sənədində toplanır (FW-POL-0001; Aİ ARF \[11\] VCR\_05). Siyasət yeni qayda qoymur, növlərin rulebook-larını və qərarları bir yerə yığır. Ümumi şərtlər ləğv edilə bilən hər növdə qüvvədədir: şəxs razılığını geri alarsa, şəxs "sənədiniz cüzdana əlavə edildi" bildirişinə etiraz edərsə, sənəd səhvən verilibsə, eyni şəxsə eyni növün yeni nüsxə dəsti verilərsə (köhnə dəst ləğv edilir) və qurumun imza açarı sızıbsa. Növə xas şərtlər də yazılıb: diplomda saxtakarlıq və ya məhkəmə qərarı, biletdə geri qaytarma, tədbirin ləğvi və girişdə keçid, şəxsiyyət sənədində şəxsin silmə tələbi və ya sənədin itirildiyi barədə bildiriş.

Siyasət ləğv səbəbi #{strong[olmayanları]} da sadalayır və bu siyahı ən azı birincisi qədər vacibdir. Qurumun dayandırılması və ya siyahıdan çıxarılması onun köhnə sənədlərini etibarsız etmir; yalnız yeni sənəd verilməsini dayandırır. Qurumun sertifikat yeniləməsi və sənəd növünün yeni versiyaya keçməsi də sənədləri ləğv etmir (§11.3). Sənədi yalnız sənəd verən ləğv edir; şəbəkənin operatoru sənəd ləğv etmir, lazım gələrsə qurumu dayandırır.

Qurum istəsə öz əlavə şərtlərini öz səhifəsində dərc edə bilər; keçid etibar siyahısındakı qeydinin #{raw("revocation_policy_uri")} sahəsində durur və cüzdan onu qurum səhifəsində göstərir. Əlavə şərtlər ümumi siyasəti daralda bilməz, yalnız ona əlavə edir (ADR-0047 K2).

Ləğv səbəbi siyahıda və sənəddə yer almır; siyahı fərdi məlumat daşımır və heç bir qeyd mövqe məlumatını saxlamır. Qurumun API-si ləğv sorğusuna "növbəyə alındı, bu andan sonra qüvvəyə minir" cavabını verir; dərhal ləğv yoxdur və API bunu açıq deyir, beləliklə çağıranın gözləntisi əvvəldən düzgün qurulur (SPEC-API-0001 §5.3).

== Cüzdan vahidinin ləğvi

Telefon itdikdə nə ləğv edilməlidir? Aİ-nin ARF-i cüzdan vahidi ləğv edildikdə sənəd verənlərin öz sənədlərini də ləğv etməsini PID provayderi üçün məcburi, digərləri üçün isə ixtiyari saxlayır. Tamga-nın qaydası belədir (ADR-0047 K1): şəxsiyyət xidməti vahidi ən gec 24 saat ərzində yoxlayır və həmin vahiddəki öz sənədlərini ləğv edir; qurum sənədləri isə ləğv edilmir.

Qurum sənədləri yenə də istifadəyə yararsız olur: hər nüsxə ixrac edilə bilməyən cihaz açarına bağlıdır və hər göstərilmə istifadəçi yoxlaması tələb edir; ləğv edilmiş vahidə heç bir qurum yeni sənəd və ya yeniləmə vermir; ləğvi görən cüzdan sənədlərini silir; qısaömürlü növlərin müddəti bitdikdə onlar sona çatır. Zəncirvari ləğv isə hər sənəd qeydinə cüzdan identifikatoru yazmağı tələb edərdi. Qalıq risk qeydə alınıb: telefonu və kilid açma məlumatını birlikdə ələ keçirən biri, telefon şəbəkəyə qoşulmadıqca müddəti bitməmiş qurum sənədini göstərə bilər; şəxs bunun üçün qurumdan ləğv tələb edir. Zəncirvari ləğv bu riski aradan qaldırmazdı, çünki şəbəkəyə qoşulmayan telefon ləğvdən də xəbər tutmur. Vahidin telefonsuz ləğvi Bölmə 13.5-dədir.

= Cüzdan: Qaydalar, Açarlar və Sübutlar

Aynurun diplomunun dəyəri telefonundakı bir açara bağlıdır. Açar başqa yerə köçürülə bilsəydi, diplom da köçürülə bilərdi; açar itsəydi, diplom da göstərilə bilməzdi. Bu bölmə cüzdanın şəbəkənin gözündə necə tanındığını, açarlarını harada və necə saxladığını, bunu sənəd verənə necə sübut etdiyini və şəxsin öz məlumatı üzərindəki nəzarətini izah edir. Cüzdan təhlükəsizliyinin ümumi çərçivəsi seriyanın onuncu yazısındadır \[75\].

== Şəbəkənin cüzdana baxışı

Tamga Network heç bir cüzdanın tətbiqini, cüzdan provayderini və ya saytını idarə etmir (ADR-0042). Şəbəkənin cüzdanlarla əlaqəsi üç şeydən ibarətdir: qaydalar (SPEC-WALLET-0001, Tamga ARF), açıq paketlər (#{raw("@tamga-network/wallet-core")} və digərləri) və etibar siyahısındakı #{strong[cüzdan provayderi]} qeydi (#{raw("wallet_providers[]")}: ünvan, sübut imza sertifikatı, həllin adı). Aİ-də də hər cüzdanı onu təqdim edən təşkilat idarə edir; etibar çərçivəsi provayderləri yalnız siyahıya alır. Şəbəkənin öz provayderini host etməsi nəzərdən keçirildi və rədd edildi, çünki şəbəkənin neytrallığını pozar və fonda təhvil zamanı bir cüzdanın xidmətini şəbəkədən asılı qoyardı.

Cüzdanın siyahıya daxil olması dörd addımdır (FW-ONB-0001 §4): cüzdan həlli bəyannaməsi (platformalar, təhlükəsiz aparat səviyyəsi, PIN və biometriya, ehtiyat nüsxə modeli), provayder müqaviləsi (sübutlar, yeniləmə və ləğv müddətləri, bərpa açarının saxlanılmaması), uyğunluq testləri və siyahıya daxil olma. Cüzdan tərtibatçısı əvvəlcə öz provayderini sandbox siyahısında qeydə aldırır və cüzdanını oradakı nümunə qurumlarla sınayır. Siyahıya daxil olan ilk cüzdan, Tamga Wallet, ayrıca məhsuldur və bu yolla, hər cüzdanla eyni şərtlərlə daxil olub. Şəbəkənin interfeysləri cüzdanı ümumi adla çəkir; cüzdanın adı lazım olduqda siyahıdakı qeyd məlumatından gəlir (ADR-0042 NW4).

== Açar arxitekturası və səviyyələr

Cüzdan spesifikasiyası bir ziddiyyətin həlli ilə başlayır (SPEC-WALLET-0001 §1). Sənəd açarı təhlükəsiz zonadan heç vaxt çıxmamalı idi; ilk layihə qeydlərində isə "24 sözlük toxumla ehtiyat nüsxə" ideyası var idi. Toxum cüzdanı istifadəyə yararlı vəziyyətdə bərpa edirsə, deməli açarları da bərpa edir. Açarları toxumdan törətmək cəlbedici idi, lakin cihaz bağlılığını puça çıxarardı: toxum paylaşıla bilirsə, sənəd başqasına ötürülə bilər və sənəd verilərkən bağlanan "tələbə sənədini dostunun cüzdanına aldırmaq" boşluğu bərpa anında yenidən açılır. Platformaların cihazlar arasında sinxronlaşan açarları da rədd edildi; etibar Apple və Google hesabına keçir, eyni hesabdakı başqa cihaz açarı ala bilər və Aİ bu sinfi ən yüksək cüzdan səviyyəsi saymır.

Qərar: sənəd sahibinin açarları toxumdan törədilmir və təhlükəsiz zonadan heç vaxt çıxmır (WL1); ehtiyat nüsxə sənədləri və onların siyahısını daşıyır, açarları daşımır (WL2). Yeni telefonda bərpa edilən sənəd oxuna bilər, amma göstərilə bilməz, qurumdan yenidən alınır; toxumun işi şəxsə "bu dörd sənədi yenidən istə" deyən, bir toxunuşla işləyən siyahı təqdim etməkdir. Şəbəkə və ya provayder şəxsin adından heç bir şəraitdə bərpa açarı saxlamır (WL10); saxlasaydı, bütün cüzdanları aça bilən mərkəz yaranardı (Cədvəl 21).

#tablo([#{strong[Cədvəl 21.]} Cüzdanın təminat səviyyələri (SPEC-WALLET-0001 §2.2, FW-ARF-0001 §6.5).], (20fr, 33fr, 33fr, 16fr), ([Səviyyə​​​​​​​​​], [Açar anbarı], [Şəbəkədəki yeri], [Cihaz sübutu],), (
  ([W1], [Proqram təminatı], [Dəstəklənmir; sənəd verilmir (yalnız sandbox-da şəbəkənin öz sınaq açarı)], [—],),
  ([W2], [Cihazın təhlükəsiz zonası (Secure Enclave, StrongBox, ən azı TEE)], [Bugünkü minimal səviyyə], [İxtiyari; provayderin qərarı],),
  ([W3], [Sertifikatlı təhlükəsiz aparat təminatı], [Dövlət mərhələsində], [Məcburi (ADR-0047 K5)],),
))

Hər təqdimat istifadəçi yoxlaması tələb edir (WL11). Təhlükəsiz aparat açarı olan cihazda sənəd açarı telefonun kilidinə bağlıdır və təqdimatın təsdiqi əməliyyat sisteminin biometriya və ya cihaz parolu sorğusudur; tətbiqin ayarları bunu söndürə bilməz. Şəxs sorğudan imtina edərsə, ehtiyat yol yoxdur, təqdimat edilmir. Beləliklə açıq cüzdanın arxa planda səssizcə təqdimat etməsinin qarşısı alınır.

#kutu("teknik", [PIN məhdudiyyətlərinin hesabı])[
Tətbiqin PIN-i ən azı 6 rəqəmlidir; 5 səhv cəhddən sonra 30 saniyə gözlənilir, 10-cu cəhddə cüzdan kilidlənir və toxum tələb olunur (SPEC-WALLET-0001 §2.3). Telefonu ələ keçirən birinin kilidlənmədən əvvəl PIN-i təsadüfi təxminlə tapma ehtimalı:

#formul[$ P_"təxmin" lt.eq 10 / 10^6 = 10^(-5) = "%0,001" $]

Bu məhdudiyyətin də bir qiyməti var: eyni şəxs 10 dəfə səhv daxil etməklə cüzdanı kilidləyə bilər. Spesifikasiya bunu qəbul edilmiş risk kimi yazır; alternativ PIN-i kobud gücə açıq qoymaqdır.
]

== WIA və KA

Qurum sənəd verməzdən əvvəl qarşısındakı tətbiqin siyahıda tanınan cüzdan olduğunu və açarların təhlükəsiz aparat təminatında durduğunu bilmək istəyir. İlk dizaynda cüzdan 30 gün etibarlı tək bir sübutu hər quruma göstərirdi; qurumlar eyni cüzdanı bir-biri ilə əlaqələndirə bilərdi və sübutun ləğv yolu yox idi. Tamga bunu Aİ-nin TS3 \[12\] modeli ilə əvəz etdi (ADR-0025).

- #{strong[WIA]} (#{emph[Wallet Instance Attestation]}, cüzdan nüsxəsi attestasiyası) cüzdanın özünü təqdim edir. Ömrü 24 saatdan qısadır və #{strong[hər sənəd əməliyyatında yenisi]} alınır: yeni sahiblik açarı və ləğv siyahısında yeni, bir-biri ilə əlaqələndirilə bilməyən qeydlə. Qurum üzrə təkrar istifadə variantından bilərəkdən istifadə edilmədi; edilsəydi, provayder cüzdanın neçə qurumla əlaqə saxladığını öyrənərdi.
- #{strong[KA]} (#{emph[key attestation]}, açar attestasiyası) sənəd açarlarının hansı anbarda və hansı istifadəçi yoxlaması ilə qorunduğunu bildirir. Bir paketdəki bütün sənəd açarlarını daşıyır və bir dəfə istifadə olunur. Ləğvi açar anbarının #{strong[növü]} üzrə ortaq qeydlə aparılır; beləliklə vahidin kimliyini KA-dan çıxarmaq mümkün olmur.

HAIP 1.0 \[32\] §4.4.1 daha bir qayda gətirir: WIA-nın "kim" sahəsi (#{raw("sub")}) eyni cüzdan həllindən istifadə edən bütün nüsxələrdə ortaq dəyər olmalıdır. Tamga-da bu, həllin adıdır; telefona xas dəyər daşımır (ADR-0034 CI6). Qurumun gördüyü şəxsə deyil, həllə işarə edir.

#kod("json", "{
  \"iss\": \"https://saglayici.example\",
  \"sub\": \"ornek-cuzdan-cozumu\",
  \"iat\": 1795000000,
  \"exp\": 1795082800,
  \"wallet_name\": \"Örnek Cüzdan\",
  \"wallet_version\": \"1.4.0\",
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"…\", \"y\": \"…\" } },
  \"client_status\": {
    \"status\": { \"status_list\": { \"idx\": 5127, \"uri\": \"https://saglayici.example/status/wia/3\" } },
    \"exp\": 1800184000
  }
}", baslik: "Nümunə: WIA-nın qısaldılmış məzmunu; sahə strukturu sadələşdirilib (dəyərlər nümunədir)")

#kutu("teknik", [WIA-nın ömrü və əlaqələndirilməzlik])[
Nümunədəki dəyərlərlə WIA-nın ömrü və ləğv xidmət müddəti belə hesablanır:

#formul[$ "exp" - "iat" &= 1.795.082.800 - 1.795.000.000 = 82.800 "san" = 23 "saat" < 24 "saat" \
"client_status.exp" - "iat" &= 5.184.000 "san" = 60 "gün" gt.eq 31 "gün" $]

23 saat Tamga-nın seçdiyi ömürdür, 60 gün adi xidmət müddətidir; qurum daha uzun müddət elan etsə, provayder öz yuxarı həddinə qədər verir. Əlaqələndirilməzlik qaydası isə bir sətirdir: $i$ və $j$ iki ayrı sənəd əməliyyatıdırsa

#formul[$ "cnf"_i != "cnf"_j quad "və" quad "idx"_i != "idx"_j $]

Yəni iki qurum eyni cüzdandan gələn sübutlarda ortaq açar və ya ortaq ləğv qeydi görmür. WIA və KA ləğv siyahılarının hər biri ən azı 10.000 qeydlidir (2024\/2979 \[5\] saylı reqlamentin Ib Əlavəsi); qurum bu həddən aşağı siyahıya əsaslanan sübutu qəbul etmir.
]

Qurum sənəd verməzdən əvvəl WIA-nın imzasını, provayderin siyahıda olduğunu, müddəti, sahiblik sübutunu və ləğv statusunu yoxlayır; sənəd ucunda KA-nı və açar anbarı səviyyəsinin öz minimal həddinə cavab verdiyini yoxlayır. Ləğv edilmiş WIA və ya KA ilə sənəd verilmir (ADR-0025 WIA4). Siyahıda olmayan provayderin cüzdanına da sənəd verilmir.

KA-nın ən vacib qaydası "səviyyə həqiqəti deyir" qaydasıdır (ADR-0025 WIA3): yoxlanılmamış bəyan KA-ya yazılmır. Cihaz sübutu (Apple App Attest, Android açar attestasiyası, Play Integrity) bu həqiqətin mənbəyidir. Şəbəkənin qaydası cihaz sübutunu yalnız ən yüksək səviyyədə məcburi edir: W3 bəyan edən hər KA-dan əvvəl provayder cihaz sübutunu yoxlayır, W2-də isə bu, provayderin qərarıdır (ADR-0047 K5). Onu hər səviyyədə məcburi etmək nəzərdən keçirildi; cihaz sübutu hər platformada və hər cihazda olmadığı üçün W2 cüzdanlarını kənarda qoyacağından rədd edildi. #{strong[Status:]} WIA və KA formatı və yoxlaması işləyir; aparat açarları və cihaz sübutu kodlaşdırılıb, cihaz testini gözləyir (planlaşdırılıb; FW-ARF-0001 §2.8); yoxlanıla bilməyən aparat bəyanı KA-ya daxil olmur (Şəkil 21).

#sekil(21, [Cüzdan vahidi, cüzdan provayderi və sübutlar], "figures/wp-az/sekil-21.svg", yarim: false)

== Nüsxələr

Qurum sənədləri on nüsxə şəklində verilir; hər nüsxə ayrı cihaz açarına və ləğv siyahısında ayrı mövqeyə bağlıdır (Bölmə 9). Nüsxələrin necə istifadə ediləcəyi iki istiqamətli qaydaya bağlanıb: bir yoxlayan tərəfə #{strong[həmişə eyni]} nüsxə, fərqli yoxlayan tərəflərə #{strong[fərqli]} nüsxələr göstərilir (WL5). Eyni yoxlayan tərəfə fərqli nüsxə göstərmək heç nə qazandırmır; Timur Aynuru onsuz da müraciətindən tanıyır, fərqli nüsxə yalnız nüsxə xərcləyir. Fərqli yoxlayan tərəflərə fərqli nüsxə isə iki yoxlayan tərəfin cihaz açarı və ya ləğv mövqeyi üzərindən razılaşıb Aynuru uyğunlaşdırmasının qarşısını alır. Uyğunlaşdırmanın açarı yoxlayan tərəfin daimi kimliyidir (#{raw("dns_name")}); sertifikat yenilənsə də pozulmur.

Eyni yoxlayan tərəfə eyni növ üçün edilən təkrar təqdimatlarda açıqlanan sahələr dəsti də ardıcıl qalır (WL6). İlk təqdimatda səkkiz, ikincidə altı sahə açıqlansaydı, yoxlayan tərəf aradakı fərqdən gizlədilən sahələr haqqında nəsə çıxara bilərdi. Yoxlayan tərəf daha az istəsə, cüzdan artığını göndərmir, lakin şəxsə "bu yoxlayan tərəfə əvvəllər bu sahələri vermişdiniz" məlumatını göstərir.

Nüsxələr tükənir. Tanış yoxlayan tərəfdə bu problem deyil; yeni yoxlayan tərəfdə şəxs ya yeniləyir, ya da bir nüsxəni əlaqələndirilə bilmə xəbərdarlığı ilə təkrar istifadə edir. Cüzdan qurumun elan etdiyi həddlərdə nüsxələri şəxsdən soruşmadan da yeniləyir (ADR-0023): yeniləmə tokeni olan qurum sənədlərində, tətbiq ön planda və kilid açıq olarkən, təsadüfi gecikmə ilə. Köhnə "avtomatik yeniləmə yoxdur" qaydası Aİ ARF-in \[11\] təkrar vermənin mümkün qədər istifadəçi əməliyyatı tələb etməməsi şərtinə görə dəyişdi. Şəxsiyyət və əlaqə sənədləri əhatədən kənardır; şəxsiyyət xidməti sənədi verdikdən sonra şəxs sahələrini saxlamır.

#kutu("teknik", [Səssiz yeniləmənin qalan izi])[
Qurum bu gün on nüsxəlik paket verir və iki istifadə edilməmiş nüsxə qaldıqda yeniləməni işə salır. Eyni yoxlayan tərəfə təkrar təqdimat nüsxə xərcləmədiyi üçün bir paket bu qədər #{strong[yeni]} yoxlayan tərəfə çatır:

#formul[$ 10 - 2 = 8 "yeni yoxlayan tərəf" $]

Qurum yeniləmə sorğularının tezliyindən sənədin təxminən neçə yeni yoxlayan tərəfə göstərildiyini çıxara bilər: hər səkkiz yeni yoxlayan tərəfdə bir sorğu. Bu iz qəbul edilmiş balansdır və dörd tədbirlə daraldılır: eyni yoxlayan tərəfə eyni nüsxə, 0 ilə 6 saat arası təsadüfi gecikmə, yeniləmə sorğusunun hansı yoxlayan tərəf üçün edildiyini heç ehtiva etməməsi və şəxsin ayarı söndürə bilməsi (ADR-0023 K6). Sənədin müddətinin bitməsinə 7 gün qalmış da yeniləmə işə düşür.
]

== Şəxsin nəzarəti

Cüzdan hər təqdimatı yerli olaraq qeydə alır: nə vaxt, hansı yoxlayan tərəf, hansı sahələr, həddindən artıq tələb olubmu. Bu qeyd cihazda qalır və heç bir serverə göndərilmir; göndərilsəydi, məhz qorunmaq istənilən davranış profili bir mərkəzdə toplanardı (SPEC-PROTO-0002 PV8, SPEC-WALLET-0001 WL4). Hansı yoxlayan tərəfə hansı nüsxənin göstərildiyini saxlayan uyğunluq cədvəli də eyni qaydaya tabedir və ehtiyat nüsxəyə daxil olmur.

Aİ isə şəxsin əməliyyat jurnalını və sənədlərinin siyahısını ixrac edə bilməsini məcburi edir (2024\/2979 saylı reqlament, TS10). Jurnalın serverdə şifrəli ehtiyat nüsxəsi (metaməlumat yenə toplanır) və sadə JSON ixracı (paylaşım tətbiqlərində açıq qalır) rədd edildi. Qərar: jurnal cihazdan yalnız şəxsin özünün başlatdığı və öz parolu ilə şifrələdiyi faylda çıxır; fayla sənəd dəyərləri, nüsxələr və açarlar daxil olmur (ADR-0027) (Cədvəl 22).

#tablo([#{strong[Cədvəl 22.]} Şəxsin hüquqları və onların cüzdandakı qarşılıqları.], (27fr, 48fr, 20fr), ([Hüquq və ya ehtiyac], [Cüzdandakı qarşılığı], [Mənbə],), (
  ([Kimə nə göstərdiyimi bilmək], [Cihazdakı tarixçə: vaxt, yoxlayan tərəf, sahə adları, həddindən artıq tələb], [WL4, FW-ARF-0001 §2.7],),
  ([Məlumatımı almaq və daşımaq], [Şəxsin başlatdığı, parollu TS10 faylı (daşıma siyahısı və jurnal)], [ADR-0027],),
  ([Tarixçənin nə qədər saxlanacağını seçmək], [30 \/ 90 \/ 180 \/ 365 gün və ya müddətsiz; silmədən əvvəl xəbərdarlıq], [SPEC-WALLET-0001 §5.7],),
  ([Hər şeyi silmək], ["Cüzdanı sıfırla və məlumatlarımı sil": şəxsiyyət xidmətindəki qeyd, provayderdəki vahid qeydi, cihazdakı hər şey], [SPEC-WALLET-0001 §7.6],),
  ([Qurumdan məlumatımı silməsini istəmək], [Tarixçədən "Məlumatlarımı silməsini istə"], [FW-ARF-0001 §2.7],),
  ([Şikayət etmək], [Yoxlayan tərəfin tabe olduğu məlumatların qorunması orqanına aparan yol], [FW-ARF-0001 §2.7],),
  ([Telefonum itəndə cüzdanı bağlamaq], [Telefonsuz, hesabsız ləğv yolu (quraşdırmada verilən ləğv sirri)], [ADR-0047 K3],),
  ([Cüzdanımın ləğv edildiyini öyrənmək], [Cüzdandan kənar ən azı bir yol], [ADR-0047 K4],),
))

Silmənin ardıcıllığı vacibdir: əvvəlcə şəxsiyyət xidməti (cüzdan sahə açmadan sahiblik təqdimatı ilə silmə tələb edir; xidmət qeydi silir, nüsxələri ləğv edir, məsafədən şəxsiyyət yoxlaması provayderindəki sessiyanı sildirir), sonra cüzdan provayderi (vahid ləğv edilir, qeydi silinir), ən sonda cihaz. Şəbəkə yoxdursa, cihazdakı silmə yenə aparılır və şəxsə qalan addımlar göstərilir.

İtən telefon üçün Aİ-nin ARF-i provayderdə istifadəçi hesabı nəzərdə tutur; Tamga-da hesab yoxdur. Buna görə hər provayder telefon olmadan və hesab açmadan işləyən ləğv yolu təqdim etməyə borcludur: vahid aktivləşdirilərkən yaradılan və şəxsə bir dəfə göstərilən ləğv sirri, provayderdə yalnız yavaş hash-i ilə (ADR-0047 K3). Bu, ARF-dən açıq yazılmış kənarlaşmadır; SMS ilə bildiriş isə itmiş telefona gedəcəyi və fərdi məlumat tələb edəcəyi üçün şəbəkə qaydası kimi rədd edildi.

== "Tamga Network-da siyahıdadır"

Aİ-nin sertifikatlı cüzdanlar üçün etibar nişanı var; forması və rəngləri reqlamentlə müəyyən edilib və yalnız üzv dövlətin təqdim etdiyi və ya tanıdığı sertifikatlı cüzdan üçündür. Şəbəkədəki heç bir cüzdan Aİ cüzdanı deyil və bu nişandan istifadə edə bilməz. Lakin nişanın həll etdiyi ehtiyac burada da var: şəxs telefonundakı tətbiqin qaydalara uyan və siyahıda qeydə alınmış cüzdan olub-olmadığını bilmək istəyir.

Tamga-nın cavabı yazılı göstəricidir: #{strong["Tamga Network-da siyahıdadır"]} (ADR-0049). Loqo, nişan və ya möhür yoxdur; Aİ ulduzları və rəngləri, "etibar nişanı" və ya "sertifikatlı" sözü istifadə edilmir. Göstəriciyə toxunduqda cüzdan imzası yoxlanılmış siyahıdakı öz provayder qeydini göstərir: rəsmi adı, qeydin statusu, səviyyəsi və siyahının dərc vaxtı. Göstərici yoxlanıla bilən bəyandır, bəzək deyil. Vahid ləğv edilibsə, provayder və ya həll qeydi aktiv deyilsə, siyahı yoxlanıla bilmirsə və ya köhnədirsə, yaxud cüzdan yalnız sandbox siyahısına bağlıdırsa, göstərici gizlədilir. Öz loqosu olan "Tamga etibar nişanı" da nəzərdən keçirildi; adı Aİ nişanını xatırlatdığı və loqo yoxlanıla bilən heç nə demədiyi üçün rədd edildi. #{strong[Status:]} işləyir (paketlər 0.6.0-dan bəri).

== Yaş həddi yoxdur

eIDAS 2.0 \[2\] Avropa Rəqəmsal Şəxsiyyət Cüzdanı üçün minimal yaş nəzərdə tutmur və Tamga da yaş həddi qoymur: nə cüzdanların siyahıya qeydi üçün, nə də şəxsiyyət xidmətinin şəxsiyyət sənədi verməsi üçün (ADR-0043). Yeganə şərt etibarlı şəxsiyyət sənədi ilə şəxsiyyətin yoxlanılmasıdır. Sənədi kimin ala biləcəyini həmin sənədi verən müəyyən edir; tələbə sənədini yalnız qeydiyyatlı tələbəyə universitet verir. Yaşla bağlı xidmət də yoxlayan tərəf kimi yalnız lazımi məlumatı istəyir (#{raw("age_over_18")} kimi; Bölmə 14). Şəbəkə miqyasında 18 və ya 13–16 yaş həddi nəzərdən keçirildi; birincisi tələbə, idmançı və tədbir kimi azyaşlıların da istifadə etdiyi sənədləri kənarda qoyacağı, ikincisi isə yaş həddi deyil, razılığa əsaslanan xidmətlərdə valideyn razılığı qaydası olduğu üçün rədd edildi.

Açıq qalan iş valideyn razılığıdır. GDPR-ın \[8\] 8-ci maddəsi razılığa əsaslanan informasiya cəmiyyəti xidmətlərində 16 yaşdan aşağı şəxslər üçün valideyn razılığı tələb edir (üzv dövlətlər bu yaşı 13-ə endirə bilər); KVKK \[9\] xüsusi yaş müəyyən etmir. Şəxsiyyət xidmətinin razılıq axını üçün lazım olan qayda hüquqi araşdırmadan sonra ayrıca qərarla həll ediləcək; məsafədən şəxsiyyət yoxlaması provayderinin azyaşlılar üçün şərti də təsdiq gözləyir. #{strong[Status:]} yaş həddinin olmaması işləyir; valideyn razılığı axını açıq işdir.

= Şəxsiyyət: Müvəqqəti Şəxsiyyət Sənədi Provayderi

Aynur İstanbulda bir işə müraciət etməzdən əvvəl bitirdiyi qurumdan sənədini cüzdanına almaq istəyir. Qurum ona tək bir sual verir: "Həqiqətən sənsən?" Bu sualı hər qurumun ayrı-ayrılıqda verməsi hər dəfə şəxsiyyət vəsiqəsinin fotosunu, selfi və gözləmə müddəti tələb etməsi deməkdir. Avropa İttifaqında bu suala dövlətin verdiği şəxsiyyət məlumatı (PID) cavab verir: şəxs PID-ini cüzdanında göstərir, qurum onu öz qeydi ilə uyğunlaşdırır və sənədi verir. Bu gün Türkiyədə və türk dünyasının heç bir ölkəsində belə dövlət provayderi yoxdur. Bu bölmə şəbəkənin bu boşluğu necə və hansı hədlərlə doldurduğunu izah edir.

== PID olmadıqda nə etməli

Üç yol var idi. Dövlətin PID provayderini gözləmək, lakin bunun tarixi yox idi. Şəxsiyyətin yoxlanılmasını hər qurumun öz sənəd vermə xidmətinə həvalə etmək; bu halda şəxs hər qurumda yenidən yoxlanılır və hər qurum ayrıca provayder inteqrasiyası qurur. Və ya şəxsiyyəti bir yerdə yoxlayıb nəticəni şəxsin cüzdanına daşına bilən sənəd kimi vermək. Layihə rəhbərliyi üçüncü yolu seçdi (ADR-0011): şəbəkənin şəxsiyyət xidməti (#{raw("id.tamga.network")}) şəxsi bir dəfə məsafədən yoxlayır və ona özünün imzaladığı #{strong[şəxsiyyət sənədi]} verir. Şəxs bu sənədlə istədiyi quruma gedir; qurum sənədi təqdimat yolu ilə alır, öz qeydi ilə uyğunlaşdırır və öz sənədini verir.

Bu sənəd PID deyil; Aİ-nin dilində kvalifikasiyalı olmayan elektron atribut attestasiyasıdır (EAA). Etibar siyahısında PID provayderlərinin yeri (#{raw("pid_providers[]")}) bilərəkdən boş saxlanılır və şəxsiyyət xidməti adi sənəd verən qeydidir (kateqoriya #{raw("IDENTITY")}). Bu fərqin praktik nəticəsi təhvildə görünür: dövlət PID provayderi təyin etdikdə şəxsiyyət xidmətinin qeydi varis göstəricisi (#{raw("successor_id")}) ilə təhvil verilir, yeni sənəd verilmir, verilmiş sənədlər isə müddətləri bitənə qədər yoxlanıla bilən qalır (FW-RB-0003 §4.7). Sahə adları Aİ PID-i ilə eyni olduğu üçün qurumların uyğunlaşdırma kodu dəyişmir; yalnız imzalayan dəyişir. Bu, ARF-in \[11\] "PID təqdimatı ilə EAA vermə" nümunəsinin eynisidir (FW-TF-0001 §3.5). #{emph[Status: işləyir.]} Real şəbəkənin Türkiyə siyahısında bu gün yeganə aktiv sənəd verən şəxsiyyət xidmətidir (Şəkil 22).

#sekil(22, [Şəxsiyyət zənciri: bir dəfə yoxla, hər quruma eyni sənədlə get], "figures/wp-az/sekil-22.svg", yarim: false)

== Məsafədən şəxsiyyət yoxlaması

Məsafədən şəxsiyyət yoxlaması üç yoxlamanın birləşməsidir: şəxsiyyət sənədinin skan edilib həqiqiliyinin araşdırılması, kameranın qarşısındakı şəxsin canlı olduğunun müəyyənləşdirilməsi (canlılıq) və üzün sənəddəki fotoşəkillə uyğunlaşdırılması. Bu işi lisenziyalı məsafədən şəxsiyyət yoxlaması provayderi görür. Dizayn müəyyən provayderə bağlı deyil: şəxsiyyət xidməti provayderlə dar adapter interfeysi üzərindən danışır (sessiya aç, qərarı al, bildirişi yoxla) və ikinci provayder eyni interfeysin arxasına əlavə edilə bilər (SPEC-ID-0003 §6). İkinci, yerli provayderin əlavə edilməsi açıq məsələdir (SPEC-ID-0003, Açıq Məsələlər 3).

Provayder şəbəkənin ən çox görmə səlahiyyəti olan xarici hissəsidir; şəxsin sənədini və üzünü görür. Buna görə onun ətrafına sərt qaydalar çəkilib (SPEC-ID-0003 §3, §8). Provayderlə yalnız şəxsiyyət xidməti danışır; qurumlar, cüzdanlar və yoxlayan tərəflər danışmır. Provayder sessiyası şəxsə şəxsiyyət xidmətinin verdiyi qeyri-şəffaf istinadla bağlanır; bu sahəyə ad, şəxsiyyət nömrəsi və ya e-poçt yazılmır. İş axınında yalnız sənəd, canlılıq və üz uyğunlaşdırması açıqdır; çirkli pulların yuyulması üzrə yoxlama və əlaqə məlumatlarının yoxlanılması bağlıdır, çünki məqsəd yalnız sənəd verilməsinin ilkin şərtini təmin etməkdir. Provayderin bildirişi (webhook) imza və vaxt möhürü ilə yoxlanılır, lakin yalnız tətikdir; qərar həmişə provayderin qərar ucundan yenidən alınır. Sənəd təsviri, portret, video və simvol tanıma nəticəsi şəxsiyyət xidmətində saxlanmır; xidmətin saxladığı nəticənin qısa xülasəsidir. Jurnallara hadisə növü, sessiya istinadı və səviyyə yazılır; ad, sənəd nömrəsi və uyğunluq balı yazılmır.

Xəta halları da təhlükəsiz istiqamətdə qurulub. "Baxılır" və ya "rədd edildi" qərarında sənəd verilmir və şəxsə provayderin əsaslandırması ötürülmür; provayderdə kəsinti səviyyəni aşağı salmır, yalnız sənəd verilməsini dayandırır. Şəxs provayderə keçməzdən əvvəl məlumatlandırma mətnini görür və açıq razılığını verir; razılıq yoxdursa, yoxlama başlamır.

Bu addımın bir zəif tərəfi açıq deyilməlidir: canlılıq və üz uyğunlaşdırması süni yaradılmış üzlərə və video axınına müdaxilə yolu ilə edilən hücumlara (deepfake və inyeksiya hücumları \[55\]) qarşı yalnız provayderin aşkarlama gücü qədər güclüdür. Şəbəkə bu riski iki qayda ilə daraldır: ən yüksək səviyyə (T3) heç bir məsafədən üz yoxlaması ilə verilmir və provayderlə bağlanan müqavilə ETSI TS 119 461-ə \[47\] istinad edir (FW-TF-0001 §3.5). Mövzu seriyanın "Deepfake Çağında Kimlik Doğrulama" \[78\] yazısında ətraflı işıqlandırılır.

#kutu("teknik", [Şəxsiyyət sənədinin alınması axını])[
Şəxsiyyət sənədini qurum deyil, cüzdan başladır; axın OpenID4VCI-nin \[30\] avtorizasiya kodu yoludur (Bölmə 9.1) və SPEC-ID-0003 §9 ilə SPEC-PROTO-0001 §11.2-də müəyyən edilib. Cüzdan hər addımda siyahıdakı cüzdan provayderinin verdiyi cüzdan nüsxəsi attestasiyasını (WIA) daşıyır (Bölmə 13.3).

#adimlar((
  ("Cüzdan → Şəxsiyyət xidməti", [#{strong[Avtorizasiya sorğusu.]} Sorğu PAR ilə qoyulur; müştəri identifikatoru WIA-dır, PKCE kodu əlavə edilir. Şəxsiyyət sənədi əhatəsi ilə yanaşı ZK nüsxəsi əhatəsi də istənilə bilər.], $"code_challenge" = "SHA-256"("code_verifier")$),
  ("Şəxsiyyət xidməti → Şəxs", [#{strong[Məlumatlandırma və razılıq.]} Brauzerdə məlumatlandırma mətni göstərilir, açıq razılıq alınır; razılıq yoxdursa, axın #{raw("access_denied")} ilə bitir.], []),
  ("Şəxsiyyət xidməti → Provayder", [#{strong[Sessiya.]} Qeyri-şəffaf şəxs istinadı ilə sessiya açılır; şəxs sənədini skan edir, canlılıq və üz uyğunlaşdırması aparılır.], $"vendor_data" = "subject_ref"$),
  ("Şəxsiyyət xidməti", [#{strong[Qərar.]} Bildiriş gəlsə də, qərar provayderin qərar ucundan alınır; üç yoxlamadan keçibsə, səviyyə T2 olur.], $"T2" <== "sənəd" ∧ "canlılıq" ∧ "yüz"$),
  ("Şəxsiyyət xidməti → Cüzdan", [#{strong[Avtorizasiya kodu və token.]} Birdəfəlik kod PKCE yoxlaması və WIA ilə giriş tokeninə çevrilir; token DPoP açarına bağlıdır.], $"jkt" = "SHA-256"("JWK"_"dpop")$),
  ("Cüzdan → Şəxsiyyət xidməti", [#{strong[Sənəd sorğusu.]} Hər nüsxə üçün ayrı cihaz açarı ilə açar sübutu və açar attestasiyası (KA) göndərilir.], $"cnf"_i != "cnf"_j quad (i != j)$),
  ("Şəxsiyyət xidməti → Cüzdan", [#{strong[Vermə.]} SD-JWT VC və mdoc formatında 10 nüsxə; istənibsə, qısaömürlü ZK nüsxələri; ardından eyni tokenlə ayrıca sorğuda psevdonim toxumu.], []),
  ("Şəxsiyyət xidməti", [#{strong[Təmizləmə.]} Şəxs sahələri yaddaşdan silinir; daimi qeyddə yalnız qeyri-şəffaf istinad, sənəd nömrəsinin açarlı hash-i, müddət və ləğv siyahısı mövqeləri qalır.], $"document_number_hash" = "HMAC-SHA256"(k_"doc", "ölkə" ‖ "növ" ‖ "no")$),
))

Toxumun ayrıca sorğuda verilməsi standarta uyğunluq qərarıdır: OpenID4VCI 1.0 sənəd cavabına əlavə sahə qoymağa icazə vermir, buna görə toxum ayrıca sənəd konfiqurasiyası kimi elan edilir və şəxsiyyət sənədini verən tokenlə yalnız bir dəfə istənilə bilər (ADR-0061).
]

== Səviyyələr

Şəbəkə etibarı iki müstəqil ox üzrə ölçür (ADR-0005). Birinci ox şəxsin kimliyinin nə qədər güclü yoxlandığıdır: T0-dan T3-ə. İkinci ox sənəd verənin nə qədər yoxlanıldığıdır: I1-dən I3-ə (Bölmə 18.6). Yoxlayan tərəfin etibarı ikisinin cəmi deyil, hasilidir; çox yaxşı yoxlanılmış şəxs yoxlanılmamış qurumun sənədini daşıyırsa və ya akkreditə olunmuş bir qurum, şəxsiyyəti heç yoxlanılmamış birinə sənəd veribsə, nəticə dəyərsizdir. Şəxs tərəfindəki səviyyələr eIDAS təminat səviyyələri \[4\] və şəxsiyyətin yoxlanılması üçün ETSI TS 119 461-in səviyyələri ilə birə-bir uyğunlaşdırılır; beləliklə şəbəkə öz ölçüsündən istifadə edərkən Aİ ilə eyni dildə danışır (Cədvəl 23).

#tablo([#{strong[Cədvəl 23.]} Şəxsin təminat səviyyələri və uyğunluqları (ADR-0005; SPEC-ID-0003 §1; FW-ARF-0001 §6.5).], (20fr, 23fr, 14fr, 48fr, 25fr), ([Səviyyə​​​​​​​​​], [eIDAS səviyyəsi​​​​​​​​​], [ETSI TS 119 461​​​​​​], [Tipik yol], [Şəxsiyyət xidmətində],), (
  ([T0], [yoxdur], [yoxdur], [cihaz açarı, e-poçt və ya telefon kodu; şəxsiyyət iddiası yoxdur], [əlaqə sənədləri],),
  ([T1], [Low], [Baseline], [ayrıca kanaldan gələn kod, xətt və ya hesab sahibliyi], [istifadə edilmir],),
  ([T2], [Substantial], [Substantial], [məsafədən sənəd + canlılıq + üz uyğunlaşdırması və ya üzbəüz qeydiyyat masası], [şəxsiyyət sənədi bu gün bu səviyyədədir],),
  ([T3], [High], [High], [kvalifikasiyalı elektron imza ilə nonce imzalanması; dövlət mərhələsində PID], [məsafədən üz yoxlaması ilə verilmir],),
))

İki qayda cədvəli tamamlayır. Birincisi, səviyyə sənədə yazılmır. Sənəd növü minimal səviyyəni ilkin şərt kimi daşıyır; qurum bu səviyyəni sənəd verməzdən əvvəl təmin edir və hansı yolla təmin etdiyini öz audit qeydinə yazır (SPEC-ID-0003, Əhatə). Sənədə "təminat" sahəsi qoyulsaydı, hər yoxlayan tərəf şəxsin hansı yoldan keçdiyini öyrənərdi. İkincisi, NFC ilə çip oxunmuş olsa belə nəticə hüquqi baxımdan T3 sayılmır; sənəd bu faktı #{raw("document_chip_verified")} sahəsi ilə yalnız fakt kimi daşıyır (FW-RB-0003 §4.3). Səviyyələr zamanla aşına da bilər: cihaz dəyişikliyi və ya uzun müddət istifadə edilməmə kimi hadisələr səviyyəni aşağı salır (ADR-0005, qərar 4).

== Sinif: kvalifikasiyalı deyil

Şəxsiyyət xidməti etibar siyahısına əvvəlcə ən yuxarı sinifdə qeydə alınmışdı. Sonra aparılan Aİ boşluq təhlili bunun müdafiə edilə bilməyəcəyini göstərdi (ADR-0022). eIDAS 2.0-da \[2\] "kvalifikasiyalı" hüquqi statusdur; müstəqil uyğunluğu qiymətləndirmə orqanının auditini və nəzarət orqanının nəzarətini tələb edir. Halbuki şəbəkə bu xidmətdə həm siyahı operatoru, həm qeydiyyat orqanı, həm də sənəd verəndir; özünü ən yuxarı sinfə özü yazmış olardı. Nəzərdən keçirilən dörd variantdan "kvalifikasiyalı olmayan EAA, I2" qəbul edildi: real vəziyyəti əks etdirir və Aİ-də kvalifikasiyalı olmayan EAA-nı hər kəs verə bilər. I1 də rədd edildi, çünki şəxsiyyət yoxlaması və açar idarəetməsi I2 şərtlərinə cavab verirdi.

Sənəddə bunun görünən izi var, daha doğrusu, izin yoxluğu. ETSI TS 119 472-1 \[49\] kvalifikasiyalı olmayan və dövlət mənbəli olmayan EAA-da hüquqi kateqoriya sahəsinin olmamasını tələb edir; buna görə şəxsiyyət sənədi #{raw("category")} sahəsi daşımır və sənədin sinfi sənəd verənin siyahıdakı qeydindən oxunur (FW-RB-0003 §2.1). İki invariant bu qərarı qoruyur: şəbəkənin özünün idarə etdiyi xidmət müstəqil qiymətləndirmə olmadan kvalifikasiyalı və ya I3 kimi qeydə alınmır və sinif yüksəldilənə qədər heç bir siyasət şəxsiyyət sənədi üçün I3 tələb etmir. Müstəqil qiymətləndirmədən sonra sinif yeni ADR ilə yüksəldilə bilər. #{emph[Status: yüksəltmə planlaşdırılıb.]}

== Sahələr

Şəxsiyyət sənədi Aİ PID-inin sahə adlarından və kodlaşdırmasından istifadə edir (ADR-0045; İcra Reqlamenti (Aİ) 2026\/1731 \[7\]). Ad və kodlaşdırma fərqləri Aİ-nin öz fərqləridir: SD-JWT VC-də \[16\] doğum tarixi #{raw("birthdate")}, mdoc-da \[34\] isə #{raw("birth_date")} kimi, ISO tarix teqi ilə yazılır. Növ və ad sahəsi (#{raw("urn:tamga:id:IdentityAttestation:1")}, #{raw("tamga.id.1")}) şəbəkəyə məxsusdur; Aİ-nin PID növü və ad sahəsi istifadə edilmir, çünki sənəd PID deyil. Bu seçimin alternativi şəbəkəyə xas adları saxlayıb hər yoxlayan tərəfə uyğunluq cədvəli vermək idi; rədd edildi, çünki hər Aİ yoxlayan tərəfini şəbəkənin adlarını öyrənməyə məcbur edərdi (Cədvəl 24).

#tablo([#{strong[Cədvəl 24.]} Şəxsiyyət sənədinin sahələri (FW-RB-0003 §2.2, §3.1, §3.2). Bütün şəxs sahələri ayrı-ayrılıqda açıqlana bilər; portret, ünvan və təminat səviyyəsi sahəsi yoxdur.], (48fr, 33fr, 20fr, 26fr), ([SD-JWT VC adı​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [mdoc elementi​​​​​​​​​​​​​​​​​​], [Nə daşıyır], [Qeyd],), (
  ([#{raw("given_name")}, #{raw("family_name")}], [eyni], [ad, soyad], [Aİ PID adı],),
  ([#{raw("birthdate")}], [#{raw("birth_date")}], [doğum tarixi], [Aİ PID kodlaşdırması],),
  ([#{raw("nationalities")}], [#{raw("nationality")}], [vətəndaşlıqlar massivi], [hər element ayrıca açıqlanır],),
  ([#{raw("personal_administrative_number")}], [eyni], [milli şəxsiyyət nömrəsi], [yalnız bu növdə olur],),
  ([#{raw("issuing_country")}], [eyni], [Aİ mənasında sənədi verən provayderin ölkəsi], [bu gün skan edilən şəxsiyyət sənədini verən ölkə],),
  ([#{raw("document_type")}], [eyni], [yoxlanılan sənədin növü], [şəxsiyyət vəsiqəsi, pasport, yaşayış icazəsi, sürücülük vəsiqəsi],),
  ([#{raw("document_number_hash")}], [eyni], [sənəd nömrəsinin açarlı hash-i], [nömrənin özü yoxdur],),
  ([#{raw("document_chip_verified")}], [eyni], [NFC çip oxunubmu], [faktdır, səviyyə deyil],),
  ([#{raw("verification_method")}], [eyni], [yoxlama yolu], [məsafədən, NFC ilə məsafədən, üzbəüz],),
  ([#{raw("age_over_18")}, #{raw("age_over_15")}], [eyni], [yaş həddi keçilibmi], [törədilmiş bəli\/xeyr],),
))

Şəxsiyyət nömrəsi bilərəkdən yalnız bu sənəddə durur və yalnız qeydiyyatdakı əhatəsində bu sahə olan yoxlayan tərəfə açılır (SPEC-ID-0003 §8). Nömrənin olmaması da sınaqdan keçirildi: yalnız ad və doğum tarixi ilə uyğunlaşdırma adaşlarda qeyri-müəyyən olur və qurumların imtinaları artır; bu variant rədd edildi (ADR-0011).

Yaş sahələrində yoxlayan tərəfin çox vaxt doğum tarixinə ehtiyacı yoxdur; həddin keçilib-keçilmədiyini bilməsi kifayətdir. Şəxsiyyət xidməti bu cavabı sənədi verdiyi anda doğum tarixindən törədir və imzalayır; cüzdan həddi özü hesablamır, çünki onda sənəd verənin imzası nəticəni əhatə etməzdi. Adlar ISO\/IEC 18013-5-in #{raw("age_over_NN")} nümunəsini izləyir və hədlər toplusu qapalıdır: bu gün 15 və 18; yeni hədd yalnız ADR ilə əlavə edilir (ADR-0064). 15 yaş həddinin əsaslarından biri Türkiyədə 7578 saylı Qanunla \[10\] sosial şəbəkə provayderləri üçün gətirilən və 1 noyabr 2026-da qüvvəyə minən 15 yaş qaydasıdır. Bu hüquqi rəy deyil; platformanın öhdəliyini necə yerinə yetirəcəyini müəyyən etmir, yalnız şəbəkənin şəxsiyyət sənədinin bu suala ən az məlumatla cavab verə bilməsini təmin edir.

#kutu("teknik", [Yaş sahələrinin törədilməsi])[
Törətmə sənədin verildiyi gün, xidmət saatının UTC təqvim gününə görə aparılır. Şəxs N-ci ad gününün başladığı gün həddi keçir; 29 fevralda doğulanlar uzun olmayan illərdə 1 martda (ADR-0064, K1):

#formul[$ "age_over_N" &= ("doğum_tarixi" + N "il" <= "verilmə_günü") quad quad N in {15, 18} \
"nümunə:" quad "1998-05-17" + 18 "il" &= "2016-05-17" <= "2026-11-04" quad => quad "age_over_18" = "true" $]

Dəyərlər nümunədir. Yoxlayan tərəf yalnız bəli və ya xeyr görür. İki həddi birlikdə açmaq yaş aralığını ələ verə biləcəyi üçün (biri bəli, digəri xeyrdirsə, şəxs 15 ilə 17 yaş arasındadır) şəbəkənin yoxlayan tərəf siyasətləri tək hədd tələb edir; iki həddi birlikdə istəyən əhatə yoxlayan tərəfin qeydiyyatında ayrıca əsaslandırılmalıdır (ADR-0064, K3).
]

== Şəxsiyyətdən doğan sənədlər

Şəxsiyyət xidməti eyni infrastrukturla daha üç sənəd növü verir. Hər biri ayrı qərardan doğdu və hamısında eyni sual verildi: bu məlumat şəxsiyyət sənədinin içinə qoyulmalıdır, yoxsa ayrıca sənəd olmalıdır? Hər dəfə cavab "ayrıca sənəd" oldu, çünki ayrı sənədlər ayrı göstərilir, ayrı yaşayır və ayrı ləğv edilir (Cədvəl 25).

#tablo([#{strong[Cədvəl 25.]} Şəxsiyyət xidmətinin verdiyi növlər.], (30fr, 24fr, 35fr, 20fr, 26fr, 25fr, 30fr), ([Növ​​​​​​​​​​​​​​​​​​​​​], [Nəyi sübut edir], [İlkin şərt​​​​​​​​​​​​​​​​​​​​​​​​], [Etibarlılıq], [Format​​​​​​​​​​​​​​​], [Qərar​​​​​​​​​​​​​​​], [Status],), (
  ([Şəxsiyyət sənədi], [kim olduğunu], [məsafədən şəxsiyyət yoxlaması (T2)], [ən çox 2 il], [SD-JWT VC + mdoc], [ADR-0011, ADR-0013], [işləyir],),
  ([ZK nüsxəsi], [yalnız yaş hədləri], [şəxsiyyət sənədi], [ən çox 24 saat], [mdoc], [ADR-0044], [şəxsiyyət xidmətində işləyir; cüzdan tərəfi planlaşdırılıb],),
  ([Psevdonim toxumu], [heç nə; göstərilmir], [şəxsiyyət sənədi], [şəxsiyyət sənədi ilə eyni], [SD-JWT VC], [ADR-0031, ADR-0061], [işləyir],),
  ([E-poçt, telefon], [ünvanın həmin cüzdanın əlində olduğunu], [birdəfəlik kod (T0)], [ən çox 1 il], [SD-JWT VC], [ADR-0021], [e-poçt işləyir; real SMS göndərilməsi planlaşdırılıb],),
  ([Sürücülük vəsiqəsi məlumatı], [kartda yazılan kateqoriyalar və tarixlər], [şəxsiyyət sənədinin göstərilməsi], [kartın bitmə tarixi və ya 1 il, hansı əvvəldirsə], [SD-JWT VC], [ADR-0039], [sandbox-da; real şəxslərə hüquqi araşdırmadan sonra],),
))

Əlaqə sənədləri şəxsin kim olduğunu demir; yalnız "bu ünvan sənədin verildiyi anda bu cüzdanın əlində idi" deyir. Buna görə şəxsiyyət yoxlaması tələb etmir və şəxsiyyət məlumatı daşımır. Ünvan yalnız axın müddətində yaddaşda durur, sənəd verildikdən sonra silinir; verilənlər bazasına yalnız açarlı hash-i yazılır, jurnala nə ünvan, nə kod yazılır (ADR-0021). Nömrələr və ünvanlar zamanla başqasına keçə bildiyi üçün etibarlılıq bir illə məhdudlaşdırılır.

Sürücülük vəsiqəsi məlumatı ən çox hədlə əhatə olunmuş növdür. Avtomobil icarəsi və ya kuryer işə götürülməsi kimi işlərdə qarşı tərəfin verdiyi "hansı kateqoriyada etibarlı vəsiqən var?" sualına cavab verir, lakin rəsmi sürücülük vəsiqəsi deyil və mobil sürücülük vəsiqəsi (mDL) də deyil. Bunu dörd yerdə açıq deyir: təqdimat məlumatında, hər yoxlayan tərəfin gördüyü və heç vaxt gizlədilə bilməyən #{raw("not_official_licence: true")} sahəsində, cüzdandakı kartın ön üzündə və yoxlayan tərəf ekranlarında (ADR-0039). Kartın bu gün dayandırılıb-dayandırılmadığını göstərmir; şəbəkənin rəsmi qeydiyyata çıxışı yoxdur. Milli şəxsiyyət nömrəsi, məhdudiyyət və sağlamlıq kodları sənədə daxil olmur. Kartla şəxsiyyət sənədi arasındakı uyğunluq provayderə ad göndərilmədən, şəxsiyyət xidmətində açarlı hash ilə qurulur. Bir ölkənin səlahiyyətli orqanı rəqəmsal sürücülük vəsiqəsi verməyə başladıqda şəbəkə həmin ölkə üçün bu növü verməyi dayandırır.

Psevdonim toxumu isə heç vaxt göstərilməyən yeganə növdür. Onun vəzifəsi Bölmə 15.3-də izah edilir.

== Saxlama və silmə

Şəxsiyyət xidməti bu məlumat üçün məlumat nəzarətçisidir (FW-TF-0001 §3.6). Buna görə şəbəkənin əvvəllər istifadə etdiyi "Tamga heç bir fərdi məlumat görmür" cümləsi daraldıldı: şəbəkə şəxsiyyət yoxlaması məlumatını görür, təhsil və sektor sənədlərinin məzmununu görmür (ADR-0011, K4). Sənəd verildikdən sonra şəxs sahələri saxlanmır; daimi qeyddə yalnız qeyri-şəffaf şəxs istinadı, sənəd nömrəsinin açarlı hash-i, müddətlər və ləğv siyahısı mövqeləri qalır (SPEC-ID-0003 §8). Qeydlər və hadisə jurnalları qısa və müəyyən müddətlərlə saxlanılır; bu müddətlər hüquqi araşdırma ilə dəqiqləşəcək. Provayder tərəfindəki təsvir saxlama müddəti müqavilə ilə minimuma endirilir.

Silmə tələbi maraqlı bir dizayn problemini həll edir: şəxsin hesabı yoxdur, onda "bu qeyd mənimdir" deyəni xidmət necə tanıyır? Cavab xidmətin verdiyi sənədlərin özüdür. Şəxs silmə ucuna bir və ya bir neçə şəxsiyyət sənədinin təqdimatını göndərir; heç bir sahə açılmır, yalnız imza və cihaz bağlılığı yoxlanılır. Qeyd ləğv siyahısındakı mövqedən tapılır. Nəticədə qeydin bütün nüsxələri etibarsız olur, qeyd və ona bağlı jurnal sətirləri silinir, provayderdən sessiyanın silinməsi tələb olunur (SPEC-ID-0003 §9.1). Ləğv siyahısında yalnız bitlər qalır. Psevdonim toxumu xidmət tərəfində heç saxlanmadığı üçün onun silinəcək heç nəyi yoxdur.

== Mağaza baxışı kodu

Cüzdan tətbiqi tətbiq mağazasına daxil olmazdan əvvəl yoxlayıcılar onun bütün axınlarını sınamaq istəyir. Şəxsiyyət axını real şəxsiyyət sənədi və üz skanı tələb etdiyi üçün yoxlayıcı bunu edə bilmir. Daimi "sınaq rejimi" rədd edildi: real istifadəçi də onu aça bilər və saxta sənədlər həqiqi kimi görünə bilər. Qəbul edilən həll müddətli və birdəfəlik baxış kodudur (ADR-0033). Kod ən azı 128 bit təsadüfidir, yalnız hash-i ilə saxlanılır, ən çox 14 gün etibarlıdır və məlumatlandırma səhifəsindəki kiçik sahəyə daxil edilir. Etibarlı kodla həmin sessiya üçün saxta yoxlama istifadə olunur və sənəd ayrıca sınaq imzalayanı ilə imzalanır. Bu imzalayan siyahıda ən aşağı sinifdə (I1) durur; real siyasətlərin hamısı I2 tələb etdiyi üçün sınaq sənədi heç bir real yoxlamadan keçmir. Kod şəbəkənin xidmətidir və siyahıdakı hər cüzdana eyni şərtlərlə açıqdır. #{emph[Status: planlaşdırılıb.]} Kod hazırdır; sınaq imzalayanının siyahı qeydi gözləyən müraciət kimi durur və qeyd dərc edilənə qədər baxış yolu "aktiv deyil" cavabı verir.

= Məxfilik Mühəndisliyi

Timur bir şirkətdə işə qəbulla məşğuldur və Aynurun diplomunu yoxlayır. Həmin axşam Aynur Dilnozanın hazırladığı bir sayta "Tamga ilə daxil ol" düyməsi ilə qeydiyyatdan keçir. Növbəti həftə Timurun şirkəti ilə Dilnozanın saytı müştəri siyahılarını müqayisə etməyə qərar versə, nə olar? İki qeyddə ortaq dəyər varsa (açar, nömrə və ya eyni saniyəyə düşən vaxt möhürü), Aynurun iki həyatı bir-birinə bağlanır. Məxfilik yalnız "hansı sahəni göstərdim" sualı deyil; "göstərdiklərim başqaları ilə birləşdirilə bilərmi" sualıdır. Bu bölmə şəbəkənin bu ikinci suala verdiyi mühəndislik cavablarını sıralayır. Anlayışın özü seriyanın "Əlaqələndirilməzlik" yazısında ətraflı izah edilir.

== Təhdid kimi əlaqələndirilə bilmə

Əlaqələndirilə bilmə bir neçə ayrı kanaldan yaranır və hər kanalın öz tədbiri var. Eyni sənədin eyni nüsxəsi iki yoxlayan tərəfə göstərilərsə, imza və cihaz açarı hər iki yerdə eynidir. Sənədin verilmə saniyəsi az qala barmaq izi kimidir. Ləğv siyahısındakı mövqe sənədə xasdır. Sayta giriş üçün istifadə olunan identifikator hər saytda eynidirsə, saytlar birləşir. Nəhayət, sənədi verən qurum öz imzasını tanıyır; qurum yoxlayan tərəflə əməkdaşlıq edərsə, şəxsi yenə tapa bilər. Şəbəkə sonuncunu bu gün tam bağlaya bilmir və bunu qalıq risk L3 kimi yazır (FW-ARF-0001 §7.4) (Şəkil 23).

#sekil(23, [Əlaqələndirilə bilmənin kanalları və hər birinin tədbiri], "figures/wp-az/sekil-23.svg", yarim: false)

== Hər yoxlayan tərəf üçün nüsxə və yuvarlaqlaşdırılmış vaxt

Cüzdan sənədi tək nüsxə kimi deyil, on nüsxə kimi alır və hər nüsxə ayrı cihaz açarına bağlıdır (SPEC-PROTO-0001 §8). Qayda sənəd verən tərəfdə də məcburi tətbiq edilir: eyni açarla gələn sübutlar rədd edilir, çünki eyni açar nüsxələri yenidən bir-birinə bağlayardı. Cüzdan hər yoxlayan tərəfə ayrı nüsxə göstərir və eyni yoxlayan tərəfə həmişə eyni nüsxəni göstərir (yapışqan nüsxə qaydası, Bölmə 13.4). Beləliklə iki yoxlayan tərəf əllərindəki imzaları müqayisə etsə də, ortaq dəyər tapa bilmir. Nüsxələr azaldıqca qurum sənədləri səssizcə yenilənir (ADR-0023).

İkinci tədbir vaxtdır. Sənədin verilmə və bitmə anları saniyəsinə qədər yazılsaydı, eyni nüsxə paketindəki sənədlər və ya eyni gün verilən az saylı sənəd vaxt möhüründən fərqləndirilə bilərdi. Buna görə sənəd vermə paketi #{raw("iat")} və #{raw("exp")} dəyərlərini saat başına aşağı yuvarlaqlaşdırır; eyni paketdəki bütün nüsxələr eyni dəyərləri alır. Yuvarlaqlaşdırma sənədin yoxlanıla bilməsini pozacaqsa (məsələn, imza sertifikatı həmin saatın içində başlayıbsa), real an qalır: yoxlanıla bilmə əlaqələndirilməzlikdən önəmlidir. #{emph[Status: işləyir.]}

== Sayt üzrə psevdonim

"Tamga ilə daxil ol" ilk versiyasında hər sayta şəxsiyyət sənədindəki sənəd nömrəsinin hash-ini göndərirdi. Sayt dəyəri olduğu kimi saxlamırdı, lakin iki sayt razılaşsa, eyni dəyəri görüb eyni şəxsi tapardı. Üstəlik şəxs şəxsiyyət vəsiqəsini yenilədikdə sənəd nömrəsi dəyişdiyi üçün saytdakı hesab da itirdi. ADR-0031 bu iki problemi birlikdə həll etmək üçün beş variantı müqayisə etdi.

Cüzdanın öz təsadüfi sirrindən açar törətmək tam əlaqələndirilməzlik verərdi, lakin telefon dəyişdikdə bütün hesablar itərdi. Sənəd verənin hər sayt üçün identifikator yaratması hesabları qoruyardı, lakin şəxsiyyət xidməti şəxsin hansı sayta daxil olduğunu öyrənərdi. Passkey tək başına şəxsiyyət daşımır; gündəlik giriş üçün qaldı. Sıfır bilik sübutu ilə törədilən identifikator düzgün uzunmüddətli həldir, lakin bu gün mağaza qurulumu və ZK kitabxanası tələb edir. Seçilən yol şəxsiyyətdən törədilən toxumdur.

Şəxsiyyət xidməti şəxsiyyət sənədini verərkən şəxsin dəyişməyən identifikatorundan (Türkiyə üçün şəxsiyyət nömrəsindən) toxum törədir. Toxum ayrıca və heç vaxt göstərilməyən sənəd növü ilə cüzdana gəlir və serverdə saxlanmır; hər yoxlamada eyni girişdən yenidən hesablanır. Cüzdan bu toxumdan hər sayt üçün ayrı açar törədir. Sayt şəxsi həmin açarın barmaq izi ilə tanıyır. İki sayt fərqli açarlar gördüyü üçün şəxsi uyğunlaşdıra bilmir; şəxs yeni telefonda kimliyini yenidən yoxladıqda eyni toxum, deməli, eyni psevdonimlər geri qayıdır. Defolt olaraq bir saytda bir psevdonim olur, bu da saxta çoxsaylı hesabları çətinləşdirir; sayt istəsə qeydiyyatında birdən çox psevdonimə icazə verə bilər. Sayta qeydiyyatda yalnız siyasətdə icazə verilən sahələr (məsələn, ad, soyad), girişdə isə heç bir sənəd sahəsi getmir. #{emph[Status: işləyir.]}

#kutu("teknik", [Psevdonimin törədilməsi])[
Törətmə iki mərhələlidir (ADR-0031, K1 və K2; SPEC-WALLET-0001 §5.4). Etiket versiya sətridir; sabitlər qısaldılıb:

#formul[$ "seed" &= "HMAC-SHA256"(k_"ps", quad "etiket" ‖ "ölkə" ‖ "şəxsiyyət_no") \
d_"sayt" &= "HKDF-SHA256"("seed", quad "info" = "etiket" ‖ "dns_name" ‖ "sıra") mod n \
Q_"sayt" &= d_"sayt" dot G quad ("P-256") \
"psevdonim" &= "RFC7638-barmaq-izi"(Q_"sayt") $]

Birinci sətir şəxsiyyət xidmətində, digər üçü cüzdanda, PIN və ya biometriya təsdiqindən sonra hesablanır; törədilən gizli açar saxlanmır. $k_"ps"$ sənəd nömrəsi hash-inin açarından ayrı açardır və yalnız şəxsiyyət xidmətində durur. Saytın identifikatoru yoxlayan tərəfin etibar siyahısındakı daimi qeydi olan domen adıdır (#{raw("dns_name")}); sertifikatdan törəyən müştəri identifikatoru istifadə edilmir, çünki sertifikat yeniləndikdə dəyişir və psevdonimi də dəyişərdi (ADR-0034). İki saytın açarları niyə müstəqildir? HKDF-in \[27\] fərqli #{raw("info")} dəyərləri üçün verdiyi çıxışlar toxumu bilməyən biri üçün bir-biri ilə əlaqəsiz təsadüfi dəyərlər kimidir; psevdonimdən nə toxumu, nə də şəxsiyyəti bərpa etmək olar. Sayta gedən psevdonim açarı ilə imzalanmış qısa token (#{raw("aud")} = sayt, #{raw("nonce")}) və ləğv edilməmiş cüzdan vahidindən gəldiyini göstərən yeni WIA-dır.
]

Bu dizaynın məlum zəifliyi var və ADR-də açıq yazılıb: toxum açarına və şəxsin şəxsiyyət nömrəsinə birlikdə sahib olan biri, məsələn, şəxsiyyət xidmətini idarə edən tərəf bir saytla əməkdaşlıq edərək, həmin şəxsin həmin saytdakı psevdonimini hesablaya bilər. Tədbirlər açarın pilotda aparat təhlükəsizlik moduluna köçürülməsi, giriş jurnalı, şəffaflıq hesabatında açar istifadəsinin sayılması və açarın gələcəkdə dövlət provayderinə təhvil verilə bilməsidir. Daimi həll sıfır bilik sübutu ilə törətmədir. #{emph[Status: tədqiqat.]} Bu zəifliyə baxmayaraq yeni vəziyyət köhnədən xeyli yaxşıdır: əvvəllər hər sayt hər kəsi uyğunlaşdıra bilirdi, indi bunu yalnız bu iki hissəni birlikdə saxlayan biri edə bilər (Şəkil 24).

#sekil(24, [Psevdonim törətmə ağacı: bir toxum, saytlar arasında əlaqəsi olmayan açarlar], "figures/wp-az/sekil-24.svg", yarim: true)

== Sıfır bilik sübutu

Seçici paylaşım şəxsin yalnız lazımi sahəni göstərməsini təmin edir, lakin göstərilən sahənin imzası yenə qurumun imzasıdır; qurum ilə yoxlayan tərəfin əməkdaşlığı (L3) bu imza üzərindən işləyir. Sıfır bilik sübutu bu son kanalı bağlayır: cüzdan "qurumun imzaladığı sənəddə #{raw("age_over_18")} sahəsi doğrudur" ifadəsini sənədi, imzanı və doğum tarixini göstərmədən sübut edir. Şəbəkə bunun üçün Longfellow \[56, 57\] ZK sistemini seçdi (ADR-0032). BBS ailəsi imzaları rədd edildi, çünki qurumların imza açarını və formatını dəyişməsini tələb edir və Aİ-nin təsdiqlənmiş mexanizmlər siyahısında yer almır. Longfellow qurumun bugünkü ES256 imzalı mdoc \[34\] sənədinə toxunmur, etibarlı quraşdırma tələb etmir və Aİ-nin yaş yoxlaması profili ilə bağlı texniki spesifikasiyası (TS13 \[12\]) eyni sistem üzərində qurulub. Toplu nüsxə üsulu ləğv edilmədi; sübut yaradıla bilmədikdə ehtiyat yol kimi davam edir.

İki əlavə qayda bu yolu təhlükəsiz edir. Yoxlayan tərəf yalnız siyahıların siyahısında dərc edilən və aktiv olan sxem hash-lərini qəbul edir. ZK təqdimatında ləğv siyahısı mövqeyi də açılmır, çünki açılsaydı, iki təqdimat yenidən bir-birinə bağlanardı. İkinci qayda bir problem yaradır: ləğv edilmiş şəxsiyyət sənədi ZK ilə göstərilərsə, yoxlayan tərəf bunu görə bilmir. ADR-0044 Aİ ARF-in \[11\] qısaömürlü sənəd yolunu seçdi: ZK ilə yalnız şəxsiyyət xidmətinin ayrıca verdiyi, ən çox 24 saat etibarlı və ləğv siyahısı daşımayan ZK nüsxələri göstərilir. Cüzdan bu nüsxələri kiçik paketlər şəklində alır və şəxsdən soruşmadan yeniləyir; əsas sənəd ləğv edilibsə, yeni nüsxə verilmir və ləğv ZK təqdimatında ən gec 24 saata qüvvəyə minir. Yeddi günlük nüsxələr rədd edildi, çünki ARF-in "ləğv tələb olunmur" həddi 24 saatdır.

#{emph[Status:]} yoxlayan tərəf hissəsi işləyir; cüzdan hissəsi planlaşdırılıb. Sübut generatoru şəbəkənin açıq paketidir (#{raw("@tamga-network/zk")}) və cüzdana qoşulub; Android yerli kitabxanası kompilyasiya edilib, iOS kitabxanası gözləyir və telefonda ölçmə hələ aparılmayıb (FW-ARF-0001 §2.8).

#kutu("teknik", [ZK ilə yaşın sübutu])[
Yoxlayan tərəf DCQL \[31\] sorğusunda #{raw("mso_mdoc_zk")} formatını istəyir. Axının əsas xətləri (ADR-0032, ADR-0044; SPEC-WALLET-0001 §4.5):

#adimlar((
  ("Yoxlayan tərəf → Cüzdan", [#{strong[Sorğu.]} İmzalı OpenID4VP sorğusu; DCQL-də #{raw("mso_mdoc_zk")} formatı və tək element: #{raw("age_over_18 = true")}.], $"nonce", "aud"$),
  ("Cüzdan", [#{strong[Nüsxənin seçilməsi.]} Etibarlı ZK nüsxəsi seçilir; nüsxə yoxdursa, ZK sorğusu ödənilmir, klassik variant təklif olunur.], $"validUntil" - "validFrom" <= 24 "sa"$),
  ("Cüzdan (təhlükəsiz aparat)", [#{strong[Adi cihaz imzası.]} Sessiya transkripti cihaz açarı ilə adi qaydada imzalanır; açar aparatdan çıxmır.], $sigma_"cihaz" = "Sign"(d_"cihaz", "SessionTranscript")$),
  ("Cüzdan (sübut generatoru)", [#{strong[Sübut.]} Sxem siyahıdan seçilir və baytları dərc edilmiş hash ilə müqayisə edilir; sübut yaradılır.], $"SHA-256"("sxem") = "combined_hash"$),
  ("Cüzdan → Yoxlayan tərəf", [#{strong[Cavab.]} Cavabda yalnız sübut olur; sənəd, imzalar və salt-lar getmir.], []),
  ("Yoxlayan tərəf", [#{strong[Yoxlama.]} Sxemin hash-i siyahıdadırmı və aktivdirmi; qurum açarı siyahıdan; sübut yoxlanılır; sübutun bağladığı növ ZK nüsxəsidirsə, ləğv yoxlaması lazım deyil.], $"status" = "NOT_APPLICABLE"$),
))

Sxemin içində qurumun imzası, sahənin hash-i, dəyərin #{raw("true")} olduğu, etibarlılıq müddəti və cihaz imzası yoxlanılır; təfərrüatlar seriyanın "Sıfır Bilgi İspatları ve Kimlik" \[69\] yazısındadır. ADR-0032-dəki masaüstü ölçməsində sübut təxminən yarım saniyəyə yaradıldı, təxminən 343 KB tutdu və saniyənin beşdə birində yoxlandı; bu ölçüyə görə sübut QR ilə daşınmır. Bir təfərrüat sənəd sxemi qaydasına çevrildi: istifadə edilən sxem versiyası qurum açarını, sənəd növünü, sahə adını və dəyəri bağlayır, lakin ad sahəsini bağlamır. Buna görə bir sənəd növündə eyni sahə adı yalnız bir ad sahəsində ola bilər və kataloq bunu kompilyasiya zamanı yoxlayır (ADR-0032, K8). Eyni sxem bərabərlik sübutudur, hədd sxemdə sabit deyil; buna görə #{raw("age_over_15")} üçün yeni sxem lazım olmadı (ADR-0064, K4).
]

Şəkil 25 klassik seçici paylaşım ilə sıfır bilik təqdimatında yoxlayan tərəfin gördüklərini müqayisə edir.

#sekil(25, [ZK təqdimatı: nə gizlədilir, nə görünür], "figures/wp-az/sekil-25.svg", yarim: false)

== Ortaq qeydlərdə məlumat yoxdur

Etibar siyahıları, lövbər jurnalı, gələcəkdə yaranacaq ortaq reyestr və xidmət jurnalları şəbəkənin hamıya açıq və ya paylaşılan qeydləridir. Bu qeydlərin heç birində fərdi məlumat olmur; nə sənəd məzmunu, nə də sənədin hash-i yazılır (FW-ARF-0001 §1.6, P2 prinsipi). Hash yazmamaq şüurlu seçimdir: sənədin hash-i fərdi məlumat deyilmiş kimi görünür, lakin sənədi əlində saxlayan hər kəs onu qeyddə tapıb "bu sənəd indi filan əməliyyatda istifadə olundu" nəticəsinə gələ bilər. Xidmətlər IP ünvanı qeydə almır; jurnallarda sənəd sahələrinin dəyərləri və ləğv siyahısı mövqeyi yer almır (FW-ARF-0001 §4.5). Ləğv siyahıları dəyişiklik olsa da, olmasa da sabit intervalla dərc edilir, beləliklə ləğvin anı sızmır (Bölmə 12.4). İstifadə statistikası yalnız toplu şəkildə və ən azı 50 nəfərlik qruplar halında dərc edilir (FW-TF-0001 §1.7). Yoxlama nəticəsi obyekti sahələrin dəyərlərini deyil, yalnız adlarını daşıyır və ləğv mövqeyini ümumiyyətlə daşımır; beləliklə uzun müddət saxlanan bu obyektin izləmə səthinə çevrilməsinin qarşısı alınır (SPEC-API-0001 §7) (Cədvəl 26).

#tablo([#{strong[Cədvəl 26.]} Məxfilik tədbirləri, bağladıqları təhdid və statusları.], (36fr, 31fr, 19fr, 18fr), ([Tədbir], [Bağladığı təhdid], [Qərar və ya qayda], [Status],), (
  ([Seçici paylaşım, yaş hədləri], [artıq məlumat], [ADR-0006, ADR-0064], [işləyir],),
  ([Hər yoxlayan tərəf üçün ayrı açarlı nüsxə], [yoxlayan tərəflər arası uyğunlaşdırma], [SPEC-PROTO-0001 §8], [işləyir],),
  ([Saata yuvarlaqlaşdırılan vaxt], [vaxt möhürü ilə uyğunlaşdırma], [issuer paketi], [işləyir],),
  ([Hər əməliyyatda yeni WIA açarı], [cüzdan sübutu ilə uyğunlaşdırma], [ADR-0025], [işləyir],),
  ([Sayt üzrə psevdonim], [saytlar arası hesab uyğunlaşdırması], [ADR-0031, ADR-0061], [işləyir],),
  ([Təsadüfi ləğv mövqeyi, toplu əvvəlcədən yükləmə, sabit intervallı dərc], [ləğv siyahısı ilə izləmə], [SPEC-CRED-0003], [işləyir],),
  ([Sıfır bilik sübutu və qısaömürlü nüsxə], [qurum ilə yoxlayan tərəfin əməkdaşlığı (L3)], [ADR-0032, ADR-0044], [yoxlayan tərəf hissəsi işləyir, cüzdan hissəsi planlaşdırılıb],),
  ([Ortaq qeydlərdə fərdi məlumat və hash yoxdur, IP qeydi yoxdur], [ortaq qeyddən nəticə çıxarma], [FW-ARF-0001 §1.6, §4.5], [işləyir],),
  ([Provayderin yalnız şəxsiyyət xidməti ilə danışması], [provayderin şəxsi qurumlar arasında izləməsi], [SPEC-ID-0003 §8], [işləyir],),
  ([ZK ilə psevdonim törətmə], [şəxsiyyət xidmətinin nəzəri törətməsi], [ADR-0031, E variantı], [tədqiqat],),
))

== Hüquqi çərçivə

Şəbəkənin məxfilik qaydaları texniki olduğu qədər hüquqidir. Türkiyədə əsas 6698 saylı Fərdi Məlumatların Qorunması Qanunudur \[9\]; Aİ ilə münasibətdə Ümumi Məlumatların Qorunması Reqlamenti \[8\] (GDPR) həlledicidir. Trust Framework rolları belə bölür (FW-TF-0001 §3.6): sənədi verən qurum və səlahiyyətli mənbə öz məlumatlarının nəzarətçisidir; şəbəkə host etdiyi sənəd vermə xidmətində müqavilə əsasında məlumatları emal edən, şəxsiyyət xidmətində isə məlumat nəzarətçisidir; cüzdan provayderi cihazdakı məlumata çıxış əldə etmir; yoxlayan tərəf aldığı sahələrə görə məsuliyyət daşıyır. Şəxsin hüquqları cüzdanda konkret ifadə tapır: təqdimat tarixçəsi cihazda saxlanılır, məlumatların qorunması orqanına şikayət yolu cüzdanda görünür və razılığın geri alınması sənədin ləğvi deməkdir. Şəxsiyyət yoxlamasından əvvəl məlumatlandırma aparılır və açıq razılıq alınır.

Çərçivə müqavilə əlavələri ilə birlikdə pilotdan əvvəl Fərdi Məlumatların Qorunması Qanunu və 5070 saylı Elektron İmza Qanunu baxımından hüquqi araşdırmadan keçir (FW-TF-0001 §1.4). Bu bölmədəki rol bölgüsü şəbəkənin öz qaydalarının xülasəsidir; hüquqi rəy deyil. Azyaşlılar üçün valideyn razılığı axını açıq məsələdir: şəbəkə yaş həddi qoymur (ADR-0043), GDPR-ın 8-ci maddəsi razılığa əsaslanan xidmətdə azyaşlılar üçün valideyn razılığı tələb edir və bunun şəbəkədəki qarşılığı hüquqi araşdırmadan sonra ayrıca qərarla həll ediləcək.

== Qalan məxfilik riskləri

Bu gün üç risk açıq qalır. Birincisi L3-dür: eyni qurumun sənədləri fərqli yoxlayan tərəflərdə birləşdirilərsə, şəxs uyğunlaşdırıla bilər; sıfır bilik sübutu cüzdanlara çatdıqca bu risk aradan qalxır. İkincisi psevdonim törətmənin məlum zəifliyidir; açarın qorunması və şəffaflıqla məhdudlaşdırılır, daimi həlli tədqiqat mərhələsindədir. Üçüncüsü qısaömürlü ZK nüsxələrinin yenilənmə tezliyidir: şəxsiyyət xidməti cüzdanın aktiv olduğunu təxminən gündə bir dəfə edilən yeniləmədən öyrənə bilər; hansı yoxlayan tərəfə nə göstərildiyini öyrənmir. Təsadüfi gecikmə və şəxsin söndürə biləcəyi avtomatik yeniləmə ayarı bunu azaldır (ADR-0044, Nəticələr). Bu risklər Bölmə 23-dəki qalıq risklər cədvəlində aradan qalxma şərtləri ilə birlikdə toplanır.

= Təhlükəsizlik Modeli və Təhdidlər

Nurlan bir konsertin girişində növbə gözləyir. Telefonundakı bilet keçid kartına çevrilib, ekranda 60 saniyəlik QR kod durur. Arxasındakı biri ekranın şəklini çəkir. Bu şəkillə nə etmək olar? Təhlükəsizlik modeli məhz bu cür sualları əvvəlcədən vermək deməkdir: nəyi qoruyuruq, kimə etibar edirik, kim nəyi sınaya bilər və sınasa nə olar? Bu bölmə şəbəkənin bu suallara verdiyi cavabı bir yerdə toplayır.

== Aktivlər və etibar fərziyyələri

Qorunacaq açarların hər birinin ayrıca yeri və şərti var (FW-TF-0001 §2.3). Kök sertifikat oflayn mərasimdə, iki şəxsin iştirakı və protokolla yaradılır. Siyahının imza açarı qayda olaraq ən azı iki növbəli sertifikatla, aparat qorumalı mühitdə saxlanılır; SECURITY.md-yə \[66\] görə bu gün siyahı tək imza açarı ilə dərc edilir və ikinci açar pilotdan əvvəl əlavə ediləcək. Sənəd verənin imza açarı qurumun nəzarətindədir; real şəbəkə fayldan oxunan qurum açarını qəbul etmir (ADR-0057). Sənəd sahibinin açarı cihazın təhlükəsiz zonasında yaradılır, ixrac edilə bilmir və bərpa toxumundan törədilmir. Şəxsiyyət xidmətində sənəd imza açarı, sənəd nömrəsi hash-inin açarı və psevdonim toxumunun açarı bir-birindən ayrıdır.

Cüzdanlar və yoxlayan tərəflər tək bir şeyə etibar edir: siyahıların siyahısını imzalayan kökə. Siyahı serverinə, bağlantıya və ya domen adına etibar edilmir; imza, versiya zənciri və aktuallıq yoxlanılmadan heç bir qeyd istifadə olunmur (FW-ARF-0001 §4.5). Sənəd verənə yalnız öz sənədləri üçün, şəxsiyyət yoxlaması provayderinə yalnız şəxsiyyət yoxlaması qərarı üçün etibar edilir və həmin qərar hər dəfə yenidən təsdiqlənir (Şəkil 26).

#sekil(26, [Etibar sərhədləri və sərhədlərdən keçən sübutlar], "figures/wp-az/sekil-26.svg", yarim: false)

#kutu("onemli", [Bu gün etibarın yeganə lövbəri])[
Bu gün etibarın lövbəri tək bir operatorun imzasıdır (qalıq risk L1; FW-ARF-0001 §6.6). Operator ilə bir sənəd verən birlikdə hərəkət etsə, siyahıda uyğunsuz qeyd dərc edilə bilər. Hamıya açıq lövbər jurnalı geri çevirməni görünən edir, şəffaflıq hesabatı və audit bundan çəkindirir, lakin heç biri bunu qeyri-mümkün etmir. Bu hədd yalnız bir neçə müstəqil imzalayan və ortaq reyestrlə aradan qalxır (Bölmə 19).
]

== Hücumçu modelləri

Model səkkiz hücumçunu ayrı-ayrılıqda nəzərdən keçirir: saxta sənəd yaradan, telefonu oğurlayan, tətbiqi kopyalayan, lazım olandan çox istəyən və ya başqaları ilə məlumat birləşdirən yoxlayan tərəf, QR kodu izləyən, siyahını geri çevirən, operatorla birlikdə hərəkət edən qurum və şəxsiyyət yoxlamasında saxta üz və ya sənəddən istifadə edən. Hər birinin əlindəki imkan fərqlidir; Cədvəl 27 hər biri üçün tədbiri və qalıq riski verir.

== Təhdid cədvəli

#tablo([#{strong[Cədvəl 27.]} Təhdid modeli: təhdid, tədbir, əsas və qalıq risk.], (30fr, 48fr, 20fr, 45fr), ([Təhdid], [Tədbir], [Əsas], [Qalıq risk],), (
  ([Saxta qurum adından sənəd], [qurum şəxsiyyəti #{raw("iss")} sahəsindən deyil, X.509 sertifikatından törədilir; növ səlahiyyəti (C2) heç bir ayarla keçilə bilməz], [ADR-0004; SPEC-API-0001 §7], [qurum açarının oğurlanması; insident prosesi və ləğv],),
  ([Sənədin başqa cüzdana köçürülməsi], [cihaz bağlılığı istisnasız məcburidir; hər göstərilmə cihaz açarı ilə imza tələb edir], [ADR-0006], [yox dərəcəsində az; açar ixrac edilə bilmir],),
  ([Telefonun oğurlanması], [hər göstərilmədə PIN və ya biometriya; hesabsız, ləğv sirri ilə cüzdan vahidinin ləğvi; ləğvi cüzdandan kənarda öyrənmək mümkündür], [ADR-0047], [telefon və kilid məlumatı birlikdə olduqda, şəbəkəyə qoşulmayan telefonda müddəti bitməmiş qurum sənədi],),
  ([Saxta və ya kopyalanmış cüzdan], [siyahıdakı provayderin WIA və KA-sı; proqram açarlı cüzdana sənəd verilmir; cihaz sübutu ən yüksək səviyyədə məcburidir], [ADR-0025, ADR-0047], [aparat açarı və cihaz sübutu planlaşdırılıb; cihazda hələ sınaqdan keçirilməyib],),
  ([Həddindən artıq tələb edən yoxlayan tərəf], [imzalı sorğu, qeydiyyat sertifikatı, əhatə yoxlaması, şəxsə xəbərdarlıq; sertifikatsız sorğu rədd edilir], [ADR-0026, ADR-0056], [son qərar şəxsdədir; xəbərdarlığa məhəl qoymaya bilər],),
  ([Əməkdaşlıq edən yoxlayan tərəflər], [ayrı nüsxə, yuvarlaqlaşdırılmış vaxt, psevdonim, ZK], [ADR-0031, ADR-0032], [L3, ZK cüzdanlara çatana qədər],),
  ([Təkrar oynatma], [#{raw("nonce")}, #{raw("aud")}, KB-JWT, DPoP, birdəfəlik kod], [SPEC-PROTO-0001; SPEC-PROTO-0002], [yox dərəcəsində az],),
  ([QR-ı görən birinin saxta imtinası], [sorğunun hər çəkilişi təzə #{raw("state")}, #{raw("nonce")} və şifrələmə açarı ilə ayrıca qoldur; imtina yalnız öz qolunu bağlayır], [ADR-0067], [yox dərəcəsində az; hücumçu yalnız öz qolunu bağlayır],),
  ([QR-ı görən birinin bileti xərcləməsi], [qapı özünü terminal açarı ilə təqdim edir; açarsız sorğu tokenə toxunmur; qapı qrupları siyahıdadır], [ADR-0065, ADR-0069], [terminal açarının sızması; ləğv edilir; sertifikatlı qapı planlaşdırılıb],),
  ([Siyahının geri çevrilməsi], [versiya zənciri, əvvəlki versiyanın hash-i, lövbər jurnalı; geri çevirmədən qoruma defolt olaraq aktivdir], [SPEC-TRUST-0001; ADR-0056], [tək imzalayan (L1)],),
  ([Operator ilə qurumun əməkdaşlığı], [hamıya açıq dəyişiklik və lövbər jurnalı, şəffaflıq hesabatı], [FW-ARF-0001 §6.6], [L1; ortaq reyestrlə aradan qalxır],),
  ([Host edilən xidmətdə qurum açarı], [məsafədən imza: xidmətə yalnız hash gedir, imza yerli olaraq yoxlanılır; real şəbəkə fayldakı qurum açarını rədd edir], [ADR-0057], [planlaşdırılıb; real şəbəkədə istifadə edən qurum yoxdur],),
  ([Ləğv edilmiş şəxsiyyətlə ZK təqdimatı], [yalnız qısaömürlü ZK nüsxəsi; əsas sənəd ləğv edilibsə, yeni nüsxə verilmir], [ADR-0044], [ləğv ən gec 24 saata qüvvəyə minir],),
  ([Saxta üz və ya sənədlə şəxsiyyət yoxlaması], [canlılıq və üz uyğunlaşdırması; sənəddə portret yoxdur; T3 məsafədən üzlə verilmir], [SPEC-ID-0003 §1, §8], [provayderin aşkarlama gücündən asılıdır],),
  ([İnteqratorun yoxlamanı səhvən söndürməsi], [təhlükəsiz defolt dəyərlər; keçmək üçün açıq #{raw("\"none\"")} dəyəri], [ADR-0056], [bilərəkdən keçilən yoxlama],),
))

Qapı hücumu bir hücumun necə aşkarlanıb bağlandığını yaxşı göstərir (Şəkil 27). Qapı keçid tokenini yoxlama xidmətinə göndərirdi və xidmət qapının kim olduğunu soruşmurdu. Şəkli çəkən şəxs tokeni əvvəlcə özü göndərib birdəfəlik bileti xərcləyə bilər, Nurlan qapıya çatdıqda isə bilet "istifadə edilib" görünərdi. İndi qapı operatorun həmin qapı qrupu üçün verdiyi terminal açarı ilə özünü təqdim edir; açarsız sorğu tokenə ümumiyyətlə toxunmur (ADR-0065). Qapı qrupları etibar siyahısında dərc edilir və hər qrup qapıları idarə edən qurumu adlandırır; qurum yalnız öz qapılarının açarlarını görür və ləğv edir (ADR-0069). Saxta imtina hücumu eyni ailədəndir və Bölmə 10.5-də izah edilir. #{emph[Status: işləyir.]}

#sekil(27, [Saxta bilet xərcləmə hücumu: terminal açarından əvvəl və sonra], "figures/wp-az/sekil-27.svg", yarim: false)

== Təhlükəsiz defolt dəyərlər

Kitabxananın təhlükəsizliyi ondan istifadə edən tərtibatçı ən asan yolu seçdikdə nə baş verdiyindən asılıdır. Paketlərin 0.7.0 versiyasında bu prinsip qərara bağlandı (ADR-0056): etibar lövbəri, qayıdış ünvanlarının icazə siyahısı, ləğv sorğusu və yoxlayan tərəf qeydi məcburi giriş parametrlərinə çevrildi. Yoxlamanı keçmək hələ də mümkündür, lakin yalnız açıq şəkildə #{raw("\"none\"")} yazmaqla; unudaraq keçmək mümkün deyil. Eyni qərar qeydiyyat sertifikatı daşımayan sorğuları, Aİ daha uzun keçid müddəti tanısa da, bu gündən rədd etdi; cihaz açarı olmayan mdoc-u \[34\] etibarsız saydı; etibar siyahısının geri çevirmədən qorunmasını defolt olaraq aktivləşdirdi. Nəzərdən keçirilən alternativ yumşaq defolt dəyərləri saxlayıb xəbərdarlıq dövrü ilə keçmək idi; rədd edildi. Paketlərin 0.8.0 versiyasında eyni prinsip bir addım irəli getdi: yoxlayan tərəf paketi indi sorğunun hər çəkilişinə ayrıca qol açmağı defolt edir və ortaq sorğu obyekti yaratmır (CHANGELOG 0.8.0). #{emph[Status: işləyir.]}

== Uyğunluq və sınaq

Şəbəkənin bugünkü uyğunluq rejimi "yüngül uyğunluq"dur (FW-TF-0001 §2.4, §4.3). Hamıya açıq uyğunluq test vektorları dondurulmuş girişləri və gözlənilən çıxışları daşıyır; mənfi halların hər biri (cihaz bağlılığı sübutu yoxdur, yanlış #{raw("nonce")}, müddəti keçmiş sənəd…) rədd edilməlidir. Öhdəlik testləri ən azı üç şey tələb edir: köhnə siyahı "yoxlanıla bilmədi" nəticəsi verir, naməlum formatda əməliyyat dayanır, imza xətasında əməliyyat dayanır. #{raw("INDETERMINATE")} gözlənilərkən #{raw("REJECTED")} qaytaran tətbiq uyğunsuz sayılır (GUIDE-0009).

2026-cı ilin oktyabrında şəxsiyyət xidməti və Tamga Verify OpenID Foundation-ın uyğunluq test planları \[33\] ilə sandbox üzərində öz-sınaqdan keçirildi; əhatəsi və nəticələri Bölmə 20.5-dədir. Bu öz-sınaq idi, sertifikatlaşdırma ayrıca prosesdir. Bu işdən iyirmiyə yaxın dəyişiklik çıxdı və onlardan dördü əvvəlki qərarları qeydə alınmış ADR-lərlə dəyişdirdi (məsələn, ADR-0061 və ADR-0062).

Şəbəkə indiyə qədər öz təhlükəsizlik yoxlamalarını apardı; qapı boşluğu 2026-cı ilin oktyabrındakı təhlükəsizlik turunda bu yolla tapıldı və bağlandı. SECURITY.md-də göstərildiyi kimi, şəbəkə hələ müstəqil xarici auditdən keçməyib; xarici yoxlama üçün əhatəni, təhdid modelini, məlumat axınlarını, invariantlar kataloqunu və test nəticələrini ehtiva edən paket depoda hazır saxlanılır. Paketlərdə quraşdırmadan sonrakı skript yoxdur; doqquz paketdən səkkizi yalnız davamlı inteqrasiyadan, mənşə sübutu ilə dərc edilir, sübut generatoru paketi isə telefon kitabxanaları hələ orada kompilyasiya edilə bilmədiyi üçün əl ilə dərc edilir.

== İnsidentlərə cavab və məsuliyyətli bildiriş

Trust Framework insidentləri əhəmiyyətinə görə təsnif edir (FW-TF-0001 §4.6). Etibarın özünü təhlükəyə atan insidentlər (sənəd verənin imza açarının sızması, siyahı açarına şübhə, cüzdan həllində boşluq) ən gec 4 saata, bir xidmətə və ya iştirakçıya təsir edənlər isə ən gec 24 saata bildirilir. Açarı sızan sənəd verən dayandırılır, sertifikatı və təsirə məruz qalan sənədlər ləğv edilir; siyahı açarına şübhə olduqda növbəli ikinci sertifikata keçilir. Fərdi məlumatların pozulması 72 saat ərzində KVKK-ya \[9\] bildirilir. Qaydaları pozan iştirakçı üçün xəbərdarlıqdan çıxarılmaya qədər uzanan sanksiya pilləkəni var və çıxarılma köhnə sənədləri etibarsız etmir (Bölmə 18.6).

Təhlükəsizlik boşluqları #{raw("security@tamga.network")} ünvanına bildirilir; şəbəkə 72 saat ərzində cavab verir və 90 günlük koordinasiyalı açıqlama pəncərəsi tətbiq edir. Siyahıda yer alan cüzdanlar əhatədən kənardır və öz operatorlarına bildirilir (SECURITY.md). Eyni sənəd bilərəkdən qəbul edilmiş hədləri də sadalayır; onların təsirini göstərən tapıntı da məmnuniyyətlə qarşılanır.

= Sandbox, Açıq Paketlər və İstinad Xidmətləri

Elif Nümunə Universitetinin tələbə işləri şöbəsində çalışır və diplomlarının cüzdanda necə görünəcəyi, işəgötürənin nə görəcəyi ilə maraqlanır. Dilnoza isə saytına "Tamga ilə daxil ol" düyməsini əlavə etmək istəyir. Hər ikisi real şəxsin məlumatına toxunmadan, real şəbəkəni çirkləndirmədən və heç kimdən icazə gözləmədən sınamaq istəyir. Şəbəkənin nə qədər açıq olduğu ona qoşulmaq istəyənin ilk sınağı nə qədər asan edə bildiyi ilə ölçülür. Bu bölmə həmin ilk addımın vasitələrini izah edir.

== Sandbox

Sandbox real şəbəkədən tamamilə ayrı test şəbəkəsidir (ADR-0038). Xidmətləri real şəbəkədəki ilə eyni koddur və ünvan quruluşunu #{raw("sandbox")} alt adı ilə təkrarlayır; cüzdan və ya yoxlayan tərəf yalnız ünvanları və etibar lövbərini dəyişməklə keçid edir. Onun öz test kökü, öz açarları və özünü açıq şəkildə test kimi işarələyən siyahıları var. Real şəbəkənin kökü sandbox-da heç nə imzalamır, sandbox kökü real şəbəkənin heç bir siyahısında yer almır və real şəbəkə üçün konfiqurasiya edilmiş proqram sandbox siyahısını qəbul etmir. Məlumatlar hər gecə ilkin vəziyyətinə qayıdır. Yalnız lokal inkişaf mühiti (telefon və başqa serverlər ona çata bilmir) və real şəbəkədə sınaq qurumları (test sənədləri real yoxlayan tərəflərdə etibarlı olardı) variantları rədd edildi.

Sandbox-da nümunə qurumlar, müxtəlif ölkələrdən və müxtəlif vəziyyətlərdə on üç saxta şəxs və hər növdən nümunə sənədlər var. Bəzi şəxslər mənfi nəticələri sınamaq üçün hazırlanıb: diplomu verilən kimi ləğv edilən, dayandırılan, 17 yaşında olan, heç bir qurumda qeydi olmayan. Nümunə şəxslərin şəxsiyyət nömrələri bilərəkdən etibarsız formatdadır (GUIDE-0013). Şəxsiyyət yoxlaması defolt olaraq saxta provayderlə aparılır. Real şəxsiyyət yoxlaması addımlarını görmək istəyənlər üçün ayrıca real yol da var (ADR-0040); bu yol limitli və məhduddur. Şəxs skan etməzdən əvvəl açıq test mühiti xəbərdarlığını təsdiqləyir, sənədə yalnız ad, soyad və doğum tarixi keçir, şəxsiyyət və sənəd nömrəsinin yerinə təsadüfi və açıq şəkildə test olduğu bilinən dəyər yazılır; beləliklə sandbox sənədi real şəbəkədəki sənədlər və psevdonimlərlə əlaqələndirilə bilmir. Bu yol real şəbəkənin provayder hesabını paylaşır; bunun gətirdiyi risklər və onların azaldılması ADR-0040-da yazılıb.

Qurumlar sandbox-da öz test qurumlarını da aça bilər (ADR-0041). Elif uydurma qurum adı və növü yazır; e-poçt, telefon və ya şəxs adı tələb olunmur. Qurum sandbox siyahısına "test qurumu" işarəsi ilə dərhal əlavə edilir; Elif sandbox-dakı Qurum Konsoluna passkey ilə daxil olur, uydurma qeydlərini yükləyir və masada sənəd verir. Şəxsiyyət nömrəsinin yoxlama qaydasından keçən rəqəm daşıyan qeyd rədd edilir, çünki real şəxsə aid ola bilər. Test qurumlarının sertifikatlarını birbaşa sandbox kökü vermir; kökün imzaladığı və yalnız bir səviyyə aşağı sertifikat verə bilən ayrıca aralıq sertifikat orqanı verir. Kökün gizli açarı heç bir serverdə durmur; aralıq orqan ələ keçirilsə, yalnız o ləğv edilir və yenisi imzalanır. Cüzdan tərtibatçıları öz cüzdan provayderlərini sandbox siyahısında bu gün layihə rəhbərliyinə müraciət edərək qeydə aldırır; şəbəkə sandbox-da da cüzdan provayderi idarə etmir (ADR-0042). #{emph[Status: işləyir.]} Cədvəl 28 sandbox-ı real şəbəkə ilə müqayisə edir.

#tablo([#{strong[Cədvəl 28.]} Sandbox və real şəbəkə.], (13fr, 26fr, 35fr), ([Mövzu], [Real şəbəkə], [Sandbox],), (
  ([Etibar kökü və siyahılar], [real kök, #{raw("trust.tamga.network")}], [ayrıca test kökü, #{raw("trust.sandbox.tamga.network")}, siyahıda test işarəsi],),
  ([Şəxslər], [real şəxslər], [saxta şəxslər; istəyə bağlı, limitli real şəxsiyyət yolu],),
  ([Şəxsiyyət yoxlaması], [məsafədən şəxsiyyət yoxlaması provayderi], [defolt saxta provayder],),
  ([Qurumlar], [qoşulma qapılarından keçən qurumlar], [nümunə qurumlar və özləri açılan test qurumları],),
  ([Davamlılıq], [qeyd silinmir, dəyişiklik jurnala əlavə edilir], [hər gecə sıfırlanır],),
  ([Qapı açarları], [operator verir], [sınaq açarları hamıya açıqdır],),
  ([Qarşılıqlı etibar], [sandbox-a etibar etmir], [real şəbəkəyə qarışmır],),
))

== Doqquz paket

Şəbəkənin qaydaları yalnız sənədlərdə durmur; kod kimi də paylanır. #{raw("@tamga-network/*")} adı ilə doqquz açıq mənbəli paket var. Kodun lisenziyası Apache-2.0, sənədlərin lisenziyası CC BY 4.0-dır. Paketlər npm-də 0.8.2 sınaq versiyası ilə dərc edilib; sabit 1.0.0 versiyasına qədər interfeyslər dəyişə bilər (README) (Cədvəl 29).

#tablo([#{strong[Cədvəl 29.]} Açıq paketlər.], (48fr, 48fr, 26fr), ([Paket​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Vəzifə], [Platforma qeydi],), (
  ([#{raw("@tamga-network/core")}], [hash-lər, identifikatorlar, sertifikat köməkçiləri, Aİ PID adları cədvəli], [React Native üçün ayrıca alt yollar],),
  ([#{raw("@tamga-network/trust")}], [imzalı siyahıları yükləyir və yoxlayır; tək oxuma interfeysi #{raw("TrustSource")}], [#{raw("/core")} platformadan asılı deyil, React Native daxil],),
  ([#{raw("@tamga-network/schemas")}], [sənəd növləri kataloqu: Type Metadata, JSON Schema, bütövlük hash-ləri], [hər yerdə, React Native daxil],),
  ([#{raw("@tamga-network/sd-jwt")}], [SD-JWT VC: seçici paylaşım, cihaz bağlılığı, ləğv siyahısı], [],),
  ([#{raw("@tamga-network/mdoc")}], [ISO\/IEC 18013-5 mdoc: CBOR, COSE, vermə və yoxlama], [təmiz TypeScript, React Native ilə uyğun],),
  ([#{raw("@tamga-network/issuer")}], [sənəd vermə (OpenID4VCI) və ləğv siyahısının dərci; host edilən xidmət müştərisi], [server],),
  ([#{raw("@tamga-network/verifier")}], [yoxlama xətti və OpenID4VP; səhifə dəsti; ZK yoxlaması], [server; #{raw("/web")} səhifə dəsti],),
  ([#{raw("@tamga-network/wallet-core")}], [cüzdan nüvəsi: açarlar, sənəd alma, yerli yoxlamalar, göstərmə], [Node və React Native],),
  ([#{raw("@tamga-network/zk")}], [mdoc üçün cüzdan tərəfində sıfır bilik sübutu generatoru], [nüvə hər yerdə; telefonda yerli generator],),
))

Paketlərin ən vacib dizayn qərarı vahid etibar interfeysidir (ADR-0015). Cüzdan daxil hər müştəri etibar suallarını eyni interfeysdən soruşur; beləliklə eyni qayda iki dəfə, iki fərqli formada yazılmır. İnterfeysin arxasında bu gün imzalı siyahılar durur; ortaq reyestr gəldikdə interfeys dəyişmədən onun arxasına keçir (Bölmə 6.6 və 19.8). Cüzdan React Native üzərində işlədiyi üçün yoxlama nüvəsi fayl sisteminə və platformaya xas kitabxanalara bağlı olmayan alt yola ayrılıb.

#kod("typescript", "import { fetchTrustSource } from \"@tamga-network/wallet-core\";
import { verifyPresentation } from \"@tamga-network/verifier\";

// Güven çapası: uygulamaya gömülü kök parmak izleri; liste sunucusuna güvenilmez
const { source: trust } = await fetchTrustSource(\"https://trust.sandbox.tamga.network\", http, {
  pins: { lotlSigners: [SANDBOX_LOTL_SIGNER_FINGERPRINT], environment: \"sandbox\" },
});

// Cüzdandan gelen şifreli yanıt çözüldükten sonra (istek dalı ve state denetimiyle)
const { result, claims } = await verifyPresentation({
  presentation, aud: clientId, nonce: branch.nonce, policy, policyCredentialId: \"diploma\",
  trust, statusCache, rootCertsDer,
  rp: trust.relyingParty(clientId),   // kayıt zorunlu; bilerek atlamak için \"none\"
  audit: (entry) => log(entry),       // denetim kaydı
});
// result.outcome: \"ACCEPTED\", \"REJECTED\" ya da \"INDETERMINATE\"", baslik: "Nümunə: təqdimatı öz serverinizdə yoxlamaq (qısaldılmış, 0.8.2 sınaq versiyası)")

Nümunə qısaldılıb və dəyərlər nümunədir; sorğunun hər çəkilişinə ayrıca qol açan tam axın davamlı inteqrasiyada real paketlərə qarşı işləyən nümunə layihələrdədir (#{raw("examples/02-verify-own-server")}). Öz yoxlayıcısını yazmaq istəməyən host edilən Tamga Verify-dan istifadə edə bilər.

== İstinad xidmətləri

Şəbəkə dörd istinad xidmətini idarə edir (ADR-0037): host edilən sənəd vermə xidməti, Qurum Konsolu, Tamga Verify və şəxsiyyət xidməti. Bunlar şəbəkənin işləyə bilməsi, sınana bilməsi və qurumların qoşula bilməsi üçündür; satılmır və hamıya eyni şərtlərlə açıqdır. Xarici qurum host edilən sənəd vermə xidmətinə öz serverindən, icarəçiyə bağlı və səlahiyyət əhatəli API ilə çıxış əldə edir; tək paylaşılan administrator açarı rədd edildi (ADR-0016). Qurum Konsolu əməkdaşların dəvətlə hesab açıb passkey ilə daxil olduğu, sənədləri, ləğvi və dayandırmanı, qeydiyyat reyestrini idarə etdiyi yeganə yerdir; köhnə tələbə portalı ləğv edildi, çünki şəxs sənədi artıq cüzdandan istəyir (ADR-0019). Tamga Verify-da nəticəyə və açıqlanan sahələrə yalnız təqdimatı açan yoxlayan tərəf, siyahıdakı açarı ilə imzalanmış qısaömürlü bəyanla və yalnız bir dəfə çıxış əldə edir (ADR-0017).

Hər xidmət üçün eyni cümlə keçərlidir: öz proqram təminatınızı eyni qaydalarla qura bilərsiniz (FW-ARF-0001 §4.1). Qurum öz sənəd vermə xidmətini, yoxlayan tərəf öz yoxlama proqramını işlədə bilər; şəbəkənin xidmətindən istifadə etmək şərt deyil (Şəkil 28).

#sekil(28, [Tərtibatçının yolu: sandbox-dan real şəbəkəyə], "figures/wp-az/sekil-28.svg", yarim: false)

== Sənədlərin üç qapısı

Şəbəkənin xaricə yönəlmiş sənədləri Aİ-dəki quruluşa bənzər şəkildə üç ayrı qapıdan dərc edilir (ADR-0018). Ümumi izah tamga.network-dədir; tərtibatçı sənədləri, bələdçilər, spesifikasiyalar və qərar qeydləri docs.tamga.network-də; arxitektura və istinad çərçivəsi (Tamga ARF) və onun əlavələri arf.tamga.network-dədir. Oxucu özünə uyğun qapını seçir: qurum rəhbəri anlayışlarla, tərtibatçı bələdçi ilə, tənzimləyici isə çərçivə ilə başlayır. Tamga ARF türk və ingilis dillərində dərc edilir; türkcə mətn mənbədir, ingiliscə mətn eyni versiyanın rəsmi tərcüməsidir və iki dil arasındakı versiya sürüşməsi qurulum zamanı aşkarlanır. Bu sənəddə verilən ADR, SPEC və FW nömrələrinin hamısını bu qapılardan hamıya açıq şəkildə tapmaq olar.

= İdarəetmə və Suverenlik

Təsəvvür edək ki, iki dövlət bu şəbəkəyə qoşulub. Birincisi öz ölkəsindəki peşə təşkilatını sənəd verən kimi siyahıya əlavə etmək istəyir. İkinci dövlətin səsini gözləmək lazımdırmı? Lazımdırsa, heç bir dövlət belə şəbəkəyə daxil olmaz; öz daxili qərarlarını başqasının təsdiqinə bağlamış olar. Lazım deyilsə, şəbəkənin ortaq tərəfi qalırmı? Bu bölmə Tamga Network-un bu iki ucun arasında seçdiyi yolu, bu gün kimin nəyə qərar verdiyini və bu qaydanın necə əl dəyişəcəyini izah edir.

Əvvəlcə bugünkü vəziyyət. Siyahılarda bu gün yalnız Türkiyə bölməsi aktivdir. Türk Dövlətləri Təşkilatının (TDT) üzvləri Azərbaycan, Qazaxıstan, Qırğızıstan və Özbəkistan, həmçinin müşahidəçilər Macarıstan və Türkmənistan üçün yer ayrılıb (FW-TF-0001 §1.3). Bu yerlər boş yuvalardır; heç bir dövlətlə saziş və ya danışıq barədə bildiriş deyil. Aşağıda "dövlət qoşulduqda" deyə izah edilən hər şey, o gün gələrsə, işləyəcək qaydalardır.

== Üç qatlı suverenlik

Avropa İttifaqı bu suala öz etibar siyahıları ilə cavab verdi: hər üzv dövlət öz siyahısını müstəqil dərc edir, Komissiya yalnız bu siyahıları bir yerə toplayan siyahıların siyahısını saxlayır və heç bir dövlət başqasının hansı qurumu siyahıya alacağına səs vermir. Tamga Network bu presedenti izləyir və idarəetməni hər birində qərarın fərqli aktorda olduğu üç qata bölür (ADR-0002; Şəkil 29).

#{strong[Şəbəkəyə üzvlük.]} Masada hansı dövlətin oturduğu ortaq qərardır. Yeni dövlətin qəbulu, dövlətin çıxarılması və ortaq protokolun yenilənməsi üzv dövlətlərin üçdə iki səsi ilə olur. Yekdillik bilərəkdən seçilmədi; bu, tək bir dövlətin şəbəkənin böyüməsini bloklaya bilməsi demək idi.

#{strong[Milli qeydiyyatlar.]} Dövlətin sənəd verənləri, yoxlayan tərəfləri və kök sertifikatları yalnız həmin dövlətin səlahiyyətindədir; xarici səs yoxdur. Prinsip FW-ARF-0001 §1.6-da P1 kimi yazılıb: hər dövlət öz milli qeydiyyatlarının yeganə müəllifidir. Siyahı mərhələsində bu qayda imza ilə qorunur: milli siyahı yalnız həmin qeydiyyatın imza açarı ilə imzalanır. Reyestr mərhələsində eyni qayda reyestrin özündə məcburi tətbiq edilir və xoş niyyət vədi olmaqdan çıxır (ADR-0002 alt qərar 2; ADR-0054 K2).

#{strong[Sərhədlərarası tanınma.]} "X ölkəsinin sənədlərini qəbul edirəmmi?" sualına hər dövlət öz adından və birtərəfli cavab verir. ADR-0002-nin başlanğıc qaydasına görə təsisçi üzvlər bir-birini əvvəldən tanıyır, sonradan qoşulan dövlət isə tanınmanı öz qanunvericiliyinin sürəti ilə özü açır. Beləliklə "ya hamısı, ya heç biri" tələsinə düşülmür.

Bu qatların üstündə iki təminat var. Dövlət səs tələb olunmadan, birtərəfli olaraq #{strong[şəbəkədən çıxa bilər]}. Dövlətin #{strong[çıxarılması da onun vətəndaşlarının sənədlərini etibarsız etmir]}: çıxarılan dövlət yeni qeyd yaza bilməz, lakin cüzdanlardakı sənədlər qalır və onların taleyi digər dövlətlərin tanınma qərarından asılıdır (ADR-0002 alt qərar 4–5; FW-TF-0001 §3.3). Dövlətin şəbəkəyə daxil olarkən verəcəyi ilk sual budur: "Bir gün ayrılsam, vətəndaşlarım nə itirər?"

#sekil(29, [Suverenliyin üç qatı: kim qərar verir?], "figures/wp-az/sekil-29.svg", yarim: false)

#kutu("teknik", [Səsvermə qaydaları])[
Tutaq ki, $n$ qərar anındakı aktiv üzvlərin sayı, $e$ isə "hə" səslərinin sayıdır. Həddi tam ədədlərlə yazmaq yuvarlaqlaşdırma sualını aradan qaldırır:

#formul[$ "qəbul" &<==> 3 dot e >= 2 dot n \
"çıxarılma": quad n &= n_"aktiv" - 1 quad "(çıxarılanın səsi sayılmır)" \
"yeniləmə": quad t_"növbə" + 7 "gün" &<= t_"tətbiq" <= t_"növbə" + 37 "gün" $]

Dörd üzvlü şəbəkədə qəbul üçün ən azı üç "hə" lazımdır ($3 dot 3 >= 8$); beş üzvdə üç kifayət etmir ($9 < 10$), dörd lazımdır. Yeniləmədə hədd dolduqda təklif növbəyə daxil olur, ən tez yeddi gün sonra tətbiq edilir və tətbiq anında hədd həmin andakı aktiv üzvlərdən yenidən hesablanır (ADR-0055; Bölmə 19.6). Bu gün bu qaydaların heç biri kodda işləmir: siyahı mərhələsində idarəetmə sənəddə yaşayır (ADR-0009 K5).
]

== Bugünkü orqanlar

Bu quruluş dövlətləri nəzərdə tutur, lakin bu gün şəbəkəyə qoşulmuş dövlət yoxdur. Trust Framework (FW-TF-0001) bu boşluğu adı ilə çəkməyi seçir: qurula bilməyən orqan cədvəldə "hələ yoxdur" kimi yazılır, müvəqqəti vəziyyət müvəqqəti adlandırılır (Cədvəl 30).

Bu gün #{strong[müvəqqəti operator]} gündəlik istismarı, infrastrukturu, siyahı operatorluğunu və qeydiyyat orqanı rolunu dövlət adından həyata keçirir. Şəbəkənin hüquqi şəxsiyyəti olmadığı üçün bu iş yaradılacaq qeyri-kommersiya fondu adından görülür; siyahılarda operatorun adı həmişə "Tamga Network" yazılır və statusu #{raw("provisional")} (müvəqqəti) kimi işarələnir (ADR-0070 OP1). #{strong[Texniki şura]} spesifikasiya dəyişikliklərini, qərar qeydlərinin təsdiqini və ortaq sənəd növlərini idarə edir. #{strong[Şura]} yoxdur; üzv dövlət olmadan qurulmur. İdarəetmə orqanı (fond və ya şura) bir və ya iki dövlət qoşulmağa hazır olduqda qurulur və siyahılar ona təhvil verilir (FW-ARF-0001 §8.3).

#tablo([#{strong[Cədvəl 30.]} Orqanlar və onların səlahiyyətləri (FW-TF-0001 §1.6, §4.2).], (36fr, 22fr, 25fr), ([Mövzu], [Bu gün], [Dövlət qoşulduqda],), (
  ([Ölkə siyahısı, qeydiyyat orqanı, kök sertifikat], [Müvəqqəti operator, dövlət adından], [Hər dövlət öz siyahısı üçün],),
  ([Üzv qəbulu, çıxarılma, protokol yeniləməsi], [Yoxdur (üzv dövlət yoxdur)], [Şura, üçdə iki],),
  ([Spesifikasiyalar, qərar qeydləri, ortaq növlər], [Texniki şura], [Şuranın siyasətlərinə tabedir],),
  ([Sxem sahibi və akkreditasiya (ISO\/IEC 17000 \[40\])], [Müvəqqəti operator], [Şura; milli akkreditasiya orqanı],),
  ([Uyğunluğun qiymətləndirilməsi], [Özünübəyan və açıq uyğunluq testləri], [Müstəqil qiymətləndirmə orqanları],),
))

Cədvəlin ən dürüst sətri ikincisidir: bu gün dövlətin səs verəcəyi qərar yoxdur, çünki səs verəcək dövlət yoxdur. Müvəqqəti operatorun və texniki şuranın geniş səlahiyyətləri məhz buna görə yazılı hədlərə, ölçülə bilən həddlərə və şəffaflıq hesabatına bağlanıb (Bölmə 18.5).

== Mərhələlər

Şəbəkənin təkamülü dörd mərhələdə müəyyən edilib və mərhələlər təqvimlə deyil, şərtlə müəyyənləşir (FW-ARF-0001 §8.1; Cədvəl 31, Şəkil 30). Tarix verilmir, çünki hər keçid şəbəkənin təkbaşına təmin edə bilməyəcəyi bir şeyə bağlıdır: müstəqil ikinci operatora və ya dövlətin qoşulma qərarına.

#tablo([#{strong[Cədvəl 31.]} İdarəetmə mərhələləri (FW-ARF-0001 §8.1; ADR-0009 K4).], (28fr, 23fr, 20fr, 28fr, 18fr), ([Mərhələ​​​​​​​​​​​​​​​], [Etibarın lövbəri], [Kim idarə edir​​​​​​​​​​​​], [Keçid şərti], [Status],), (
  ([Siyahı mərhələsi], [İmzalı siyahılar və lövbər jurnalı], [Müvəqqəti operator], [—], [İşləyir],),
  ([Reyestr mərhələsi], [Ortaq reyestr (siyahıların proyeksiyası)], [İlk operatorlar], [Ən azı iki müstəqil operatorun yazılı razılığı; ekvivalentlik testləri], [Planlaşdırılıb (kod hazırdır, söndürülüb)],),
  ([Dövlətin qoşulması], [Ortaq reyestr], [Şura, üçdə iki], [İlk dövlət operatorunun istehsalata keçməsi], [Planlaşdırılıb],),
  ([İnstitusional genişlənmə], [Ortaq reyestr], [Şura], [Şuranın həddləri], [Planlaşdırılıb],),
))

#sekil(30, [İdarəetmə mərhələləri: etibarın lövbəri və idarə edən], "figures/wp-az/sekil-30.svg", yarim: false)

İki keçid fərqli suallara cavab verir. Reyestr mərhələsi etibarın #{strong[neçə imzalayana]} əsaslandığını dəyişir; dövlətin qoşulması isə etibarın #{strong[kimə məxsus]} olduğunu. İkisi fərqli ardıcıllıqla da gələ bilər. Bölmə 19 birincisini, aşağıdakı təhvil planı isə ikincisini nəzərdən keçirir.

== Təhvil planı

Tamga-nın bu gün öz üzərinə götürdüyü hər dövlət rolu təhvil verilmək üçün dizayn edilib (FW-ARF-0001 §1.6 P4: heç bir identifikator, rol və ya struktur tək operator fərziyyəsi daşımır). Bunun izi siyahılarda görünür: kökün adı "TR National Root CA (müvəqqəti operator)" şəklindədir, ad dövlətə məxsusdur və operator ayrıca sahədə yazılır (ADR-0009 K5). Təhvildə bu sahə dəyişir; qurum, kök və sənəd növü identifikatorları dəyişmir.

Təhvil iki ayrı hadisədir. #{strong[Fonda təhvil]} fond hüquqi şəxs statusu qazandıqda şəbəkənin öz xidmətlərinin operatorunu dəyişir. Tək bir konfiqurasiya dəyəri və ona bağlı qeydlər və sertifikatlar yenilənir; siyahı operatorunun adı, kök və sənəd növü identifikatorları, həmçinin qurumların daimi identifikatorları dəyişmir (ADR-0070 K4, OP3). Təhvil hazır alət və yazılı təlimatla aparılır; alət quru məşq rejimində işlədilə bilər. Məlum yeganə yan təsir şəxsiyyət xidmətindədir: sənəd imza sertifikatına qurum identifikasiya nömrəsi fonda təhvil zamanı yeni açarla əlavə ediləcək və şəxsiyyət sənədləri həmin gün bir dəfə yenidən alınacaq; bu təkrar almanı iki dəfə yaşatmamaq üçün belə seçildi (ADR-0058; Bölmə 14).

#{strong[Dövlətə təhvil]} dövlət öz ölkə siyahısını təhvil aldıqda baş verir və altı addımda müəyyən edilib (Cədvəl 32). Ardıcıllıq çevikdir; dövlət əvvəlcə siyahı operatorluğunu alıb qeydiyyat orqanını sonra təhvil ala bilər.

#tablo([#{strong[Cədvəl 32.]} Dövlətə təhvil addımları (FW-TF-0001 §7).], (11fr, 22fr, 48fr), ([Addım​​​​], [Nə təhvil verilir], [Necə],), (
  ([1], [Ölkə siyahısının operatorluğu], [Operator sahəsi dəyişir; dövlətin imza sertifikatı növbəli şəkildə əlavə edilir; identifikatorlar sabit qalır],),
  ([2], [Qeydiyyat orqanı], [Qeydiyyat səlahiyyəti dövlətə keçir; müvəqqəti operator artıq qeydiyyat apara bilmir],),
  ([3], [Milli kök sertifikat], [Adı sabit qalır, operatoru dəyişir; və ya dövlətin kökü növbəli şəkildə əlavə edilir, köhnə kök istifadədən çıxarılır],),
  ([4], [Şəxsiyyət məlumatı (PID) provayderinin yeri], [Dövlət doldurur; yüksək şəxsiyyət yoxlaması səviyyələri PID-ə keçir],),
  ([5], [Ortaq reyestr], [Dövlət operatorları ilə reyestr; siyahı arxivi olduğu kimi köçürülür və ekvivalentlik testindən keçir],),
  ([6], [Trust Framework], [Şuranın mülkiyyətinə keçir; versiya nömrələnməsi davam edir],),
))

Trust Framework cədvəlin altına bir cümlə qoyur: "Təhvil heç bir sənədi, qeydi və ya identifikatoru etibarsız etmir." Cüzdan və yoxlayan tərəf üçün təhvilin bütün təsiri siyahının ünvanının və imzalayanının dəyişməsidir (ADR-0035 PO3). Kodla qorunmayan aktivlər, yəni domen adları, kök sertifikatlar, siyahı arxivi və açarlar yazılı qaydaya bağlıdır: domen adı fond qurulduqda fondun adına qeydiyyatdadır, transfer kilidi və DNSSEC tətbiq edilir, ən azı on il əvvəlcədən yenilənir; ləğvetmə və ya təhvil zamanı bunlar varislik müqaviləsi ilə şuraya və ya qəyyuma keçir (FW-TF-0001 §5.7; ADR-0070 K5).

== Ölçülə bilən həddlər və şəffaflıq

Kodla məhdudlaşdırıla bilən səlahiyyət kodla məhdudlaşdırılır: imza açarı olmayan biri siyahını dəyişə bilməz. Lakin xidmətləri host edən, domen adını saxlayan, qeydiyyat aparan və statistika toplayan operator heç bir qaydanı pozmadan səssiz çəki qazana bilər. Trust Framework buna #{strong[yumşaq güc]} deyir və onu da məhdudlaşdırır (G-B; FW-ARF-0001 §1.6 P7): hər belə səlahiyyət yazılı siyasətə, ölçülə bilən həddə və şəffaflıq hesabatına bağlanır (Cədvəl 33).

#tablo([#{strong[Cədvəl 33.]} Yumşaq səlahiyyətlər və onların hədləri (FW-TF-0001 §1.6–§1.7; FW-RB-0001 RB-OP-09…RB-OP-13).], (22fr, 48fr), ([Səlahiyyət], [Hədd],), (
  ([Sənəd vermə xidmətini host etmək], [Host edilən qurumların siyahısı açıqdır; onların payı %30-u keçərsə, məsələ şuranın gündəliyinə gəlir],),
  ([Reyestr qovşaqlarını idarə etmək], [Dövlət operatorlarının sayı ən azı dörd olduqda ilk operatorun qovşaqları təhvil verilir],),
  ([Siyahıları indeksləmək], [Operator host edilən indeksləmə xidməti təqdim etmir; indeksləmə proqramı açıq mənbəlidir],),
  ([Statistika toplamaq], [Yalnız toplu sayğac; 50-dən kiçik qrup dərc edilmir; qurum və ya sənəd üzrə sayğac yoxdur; xam sayğac ən çox 13 ay],),
  ([Siyahını dəyişmək], [Hamıya açıq dəyişiklik jurnalı (kim, nə vaxt, nə, əsaslandırma); lövbər jurnalı],),
))

Şəffaflıq hesabatı üç ayda bir dərc edilir: siyahı versiyaları və dəyişikliklər, hostinq payı, ən azı 50 nəfərlik qruplarla növ istifadəsi sayğacları, insidentlər və audit tapıntıları; fərdi məlumat ehtiva etmir (FW-TF-0001 §1.7). Bu quruluşun həddi açıqdır və Bölmə 23-də qalıq risk kimi yenidən xatırlanacaq: bu gün etibarın lövbəri tək operatorun imzasıdır. Operator ilə bir sənəd verən birlikdə hərəkət etsə, uyğunsuz qeyd dərc edilə bilər; jurnal, hesabat və audit bundan çəkindirir, lakin onu qeyri-mümkün etmir (FW-ARF-0001 §6.6, L1). Bu həddi aradan qaldıracaq olan Bölmə 19-dakı çoximzalı quruluşdur.

== Qoşulma qapıları və uyğunluq rejimi

Trust Framework-ün ilk prinsipi bir sərhəd çəkir: #{strong[qeydiyyat səlahiyyətləndirmə deyil]} (G-A). Qeydiyyat orqanı qeydə alır, təsdiq etmir. Universitetin diplom verməyə qanuni səlahiyyəti şəbəkədən kənarda, öz ölkəsinin qanunvericiliyində verilir; şəbəkə yalnız şəbəkə daxilindəki əhatəni saxlayır: hansı növü, hansı sahələrlə verə biləcəyini.

Sənəd verənlər üçün dörd qapı var (FW-TF-0001 §3.2). #{strong[I1 (qeydiyyatlı)]} domen adına sahiblik, əlaqə məlumatı və texniki uyğunluq tələb edir və yoxlayan tərəfə "akkreditə olunmayıb" kimi görünür. #{strong[I2 (müqaviləli)]} buna hüquqi şəxsin və imza səlahiyyətli şəxsin təsdiqini, qoşulma müqaviləsini, X.509 \[28\] sertifikatını və fərdi məlumat əlavələrini əlavə edir. #{strong[I3 (akkreditə olunmuş)]} açarların aparat təhlükəsizlik modulunda və ya kvalifikasiyalı elektron möhürdə saxlanılmasını, qeyd aparmağı, insident bildirişi müddətlərini, illik nəzərdən keçirməni və məsuliyyət sığortasını tələb edir. #{strong[Dövlət]} sinfi dövlət qurumları və səlahiyyətli mənbələr üçündür və müvafiq dövlətin qeydiyyat orqanı tərəfindən qeydə alınır. Sənəd növü səlahiyyəti qapıdan asılı deyil: hər növ üçün ayrıca icazə siyahısı var, defolt olaraq bağlıdır. Yoxlayan tərəf və cüzdan provayderi qapıları Bölmə 20.3-də izah edilir. Audit Aİ cüzdan ekosistemində olduğu kimi qarışıq modeldir: kvalifikasiyalı qarşılığı olan sənədlər əvvəlcədən, digərləri sonradan yoxlanılır (Cədvəl 34).

#tablo([#{strong[Cədvəl 34.]} Uyğunluq rejimi (FW-TF-0001 §4.1).], (19fr, 16fr, 48fr), ([Sinif], [Rejim], [Məzmun],), (
  ([I3 \/ kvalifikasiyalı qarşılığı], [Əvvəlcədən audit], [Qeydiyyatdan əvvəl texniki və institusional qiymətləndirmə; illik audit],),
  ([I2], [Sonradan audit], [Özünübəyan, uyğunluq testləri; şikayət və ya insident üzrə audit],),
  ([I1], [Özünübəyan], [Texniki uyğunluq testi; "akkreditə olunmayıb" etiketi],),
  ([Cüzdan provayderi], [Bu gün özünübəyan və uyğunluq testləri], [Dövlət qoşulduqda əvvəlcədən audit, sertifikatlı həll],),
  ([Yoxlayan tərəf], [Sonradan audit], [Əhatənin pozulması və ya həddindən artıq tələb barədə şikayət üzrə],),
))

Qayda pozularsa, beş pilləli sanksiya pilləkəni işə düşür: otuz günlük aradan qaldırma müddəti ilə xəbərdarlıq, növ səlahiyyətinin daraldılması, dayandırma, varis təyin edilməklə çıxarılma və müqavilənin ləğvi (FW-TF-0001 §4.5). Pilləkənin ən vacib qaydası yenə sənədləri qoruyur: çıxarılma köhnə sənədləri etibarsız etmir, çünki etibarlılıq sənədin verildiyi tarixə görə qiymətləndirilir (Bölmə 11.3). Pul cəriməsi yoxdur; şura qurularsa, öz qərarı ilə tətbiq edə bilər. Mübahisə əvvəlcə sxem sahibi qarşısında, sonra müqavilədəki məhkəmədə həll edilir; qurumun yerləşdiyi dövlətin hüququ əsasdır, dövlətlər arasında şura səlahiyyətlidir və ondan yuxarıda instansiya yoxdur (FW-TF-0001 §4.7, §5.8). Çərçivə pilotdan əvvəl Türkiyənin fərdi məlumatlar və elektron imza qanunvericiliyi baxımından hüquqi araşdırmadan keçiriləcək (FW-TF-0001 §1.4); bu sənəd hüquqi rəy deyil.

== Maliyyələşmə prinsipi

Tamga Network qeyri-kommersiya xarakterlidir və məhsul və ya xidmət satmır (ADR-0037). Burada yalnız şəbəkənin neytrallığına təsir edən prinsiplər yazılır (ADR-0071; FW-TF-0001 §5.5). Şəxslər üçün şəbəkə həmişə pulsuzdur. Müvəqqəti dövrdə şəbəkə heç bir iştirakçıdan siyahı qeydiyyatı, sənəd vermə, yoxlama, şəxsiyyət xidməti və ya siyahı xidməti üçün haqq almır. Maliyyə töhfəsi qeydiyyat qərarına, siyahıdakı yerə, qoşulma qapılarına və ya idarəetmədəki səsə təsir etmir. Ödənişli xidmətlər şəbəkədən kənar şirkətlər tərəfindən öz adları ilə təqdim edilir və qeydiyyat qərarı onlara bağlana bilməz. Haqq məsələsi yenidən açılarsa, bu, idarəetmə orqanının qərarını və yeni qərar qeydini tələb edir.

== Rulebook quruluşu

Tamga-nın arxitektura və istinad çərçivəsi (FW-ARF-0001) Aİ-nin ARF-i \[11\] kimi əsas sənəddən və əlavələrdən ibarətdir. A Əlavəsi Trust Framework, B Əlavəsi #{strong[Tamga Rulebook]}-dur (FW-RB-0001): hər rolun riayət edəcəyi nömrələnmiş və məcburi qaydaları toplayır və Aİ ARF-inin yüksək səviyyəli tələblər əlavəsinin qarşılığıdır. Qaydalar #{raw("RB-<ROL>-<NN>")} formatındadır (məs. RB-OP-15: ortaq reyestr ən azı iki müstəqil operatorun yazılı razılığı olmadan qurulmur) və RFC 2119-un MUST, SHOULD, MAY dilindən istifadə edir. Hər sənəd növünün rulebook-u (Education, Identity, Event Ticket, Contact) bu kitabdan şaxələnir, onun bütün qaydalarını miras alır və Aİ-nin Attestation Rulebook \[13\] şablonunu izləyir.

Bu sənədlər qərar yaratmır. Məcburilik ardıcıllığı belədir: qərar qeydləri, spesifikasiyalar, Trust Framework, Tamga Rulebook və müqavilə şablonları; ziddiyyət olduqda yuxarıdakı qüvvədədir (FW-TF-0001 §0). Hər dəyişiklik qərar qeydinə əsaslanır və #{raw("arf.tamga.network")}-də dərc edilir; iştirakçının öhdəliyini dəyişən əsas versiya müqavilələrin yenidən imzalanmasını tələb edir (FW-TF-0001 §8). Qaydalardan hər kənarlaşma əsaslandırması və bağlanma tarixi ilə qeydə alınır; qeydə alınmamış kənarlaşma pozuntudur (RB-ENF-04). Qərarların necə qəbul edildiyi Bölmə 21-dədir.

= Ortaq Reyestr: Niyə İndi Yox, Necə Gələcək

#kutu("onemli", [Bu bölmənin statusu: planlaşdırılıb])[
Bu gün işləyən zəncir yoxdur. İcazəli ortaq reyestrin kodu yazılıb və test edilib; istehsalatda yoxdur və söndürülüb. İkinci müstəqil operator olmadan işə salınmır (ADR-0009, ADR-0051). Aşağıdakılar reyestr işə salınarsa, qüvvədə olacaq qaydalardır. Bu gün etibar Bölmə 6-dakı imzalı siyahılara və lövbər jurnalına əsaslanır və yoxlamanın heç bir addımı zəncirdən asılı deyil.
]

"Blokçeyn haradadır?" sualı Tamga-ya ən çox verilən suallardan biridir, çünki şəbəkənin ilk dizaynı zəncirlə başlayırdı. Bugünkü cavab belədir: zəncir hazırda heç nə qatmır və heç nə qatmadığı dövrdə qurulması etibarı olduğundan böyük göstərir. Bu bölmə bunun əsaslandırmasını, reyestrin hansı qaydalarla gələcəyini və keçidin necə ediləcəyini izah edir. Zəncirin şəxsiyyət sahəsində nə vaxt faydalı olduğunu ümumi şəkildə seriyanın on ikinci yazısı \[77\] müzakirə edir.

== Reyestr nə vaxt nəsə qatır

Ortaq reyestrin vədi bir-birinə tam etibar etməyən bir neçə tərəfin, heç birinin təkbaşına dəyişdirə bilməyəcəyi qeyd saxlamasıdır. Bizans \[58\] xətalarına davamlı konsensus üsulları tərəflərin bir hissəsi xətalı və ya pis niyyətli olsa belə işləyir; lakin qalanlarının bir-birindən müstəqil olmasına əsaslanır.

Köhnə planda ilk mərhələdə dörd blok təsdiqləyicisi (validator) var idi və dördü də eyni operatora məxsus olacaqdı. ADR-0009 sadə bir sual verdi: eyni əlin altındakı dörd qovşaq həmin əlin dürüst olması fərziyyəsindən artıq nə yaradır? Kəsintiyə davamlılıq yaradır, etibar yaratmır. Tək operatorun zənciri etibar baxımından tək operatorun imzaladığı hash zəncirli jurnalla eynidir; ikincisi ucuzdur, ETSI standartıdır və Aİ cüzdan ekosisteminin öz modelidir (ADR-0009 F1).

Bu müşahidə prinsipə çevrildi (FW-ARF-0001 §1.6 P5): #{strong[ortaq reyestr saxlama seçimi deyil, imzalayanların seçimidir.]} Dəyər məlumatın harada durmasından deyil, onu neçə müstəqil tərəfin təsdiqləməsindən gəlir. Başlanğıc həddi buna görə yazılıb: zəncir yalnız müvəqqəti operatordan hüquqi və əməliyyat baxımından müstəqil ən azı bir qurum (ikinci universitet, palata və ya dövlət qurumu kimi) validatoru idarə etməyə yazılı razılıq verdikdə qurulur (ADR-0009 K4; RB-OP-15). Bu gün belə operator yoxdur. Nəzərdən keçirilən alternativlər də qeydə alınıb: zənciri gözləmək təminat qazancı olmadan pilotu infrastruktura bağlayırdı; tək operatorlu "inkişaf zənciri" etibar vermədən zəncir görüntüsü yaradardı; siyahı, sertifikat və ləğv siyahısı olmayan demo isə eyni arxitektura olmadığı üçün keçid zamanı hər şeyin yenidən yazılmasını tələb edərdi.

== Niyə Besu və QBFT

Reyestr bu gün qurulmayacaq olsa da, onun texnologiyası seçilib: Hyperledger Besu \[59\] və QBFT konsensus üsulu (ADR-0001). Şəbəkə icazəli və müstəqil özəl şəbəkədir; öz başlanğıc bloku və zəncir identifikatoru var, heç bir açıq şəbəkəyə bağlı deyil. QBFT-də blok validatorların üçdə ikisindən çoxunun təsdiqi ilə tək blokda yekunlaşır və səs gücü bərabərdir. Dizaynda validatorlar dövlətlərdir, etibarlı qurumlar blok təsdiqləməyən tam qovşaqlar idarə edir; QBFT bir neçə onlarla validatordan sonra çətinləşdiyi üçün bu bölgü miqyas problemini də həll edir (Cədvəl 35).

#tablo([#{strong[Cədvəl 35.]} Reyestr mühərriki üçün nəzərdən keçirilən variantlar (ADR-0001; ADR-0051).], (22fr, 16fr, 48fr), ([Variant], [Nəticə​​​​​​​], [Səbəb],), (
  ([Hyperledger Besu + QBFT], [Seçildi], [İcazəli şəbəkə, bərabər səs, dərhal yekunluq daxilidir; Apache 2.0, fork edilə bilər; EBSI \[60\] də Besu əsaslıdır],),
  ([Cosmos SDK (CometBFT)], [Rədd], [Miqyas və sürət daha yaxşıdır; lakin çoxzəncirli quruluşun üstünlüyü tək ortaq reyestrdə istifadəsiz qalır, EBSI-dən fərqli stekdir],),
  ([Sıfırdan konsensus üsulu], [Rədd], [Risk və müddət yüksəkdir, suverenliyə töhfəsi yoxdur],),
  ([Açıq zəncir və ya onun üzərindəki qat], [Rədd], [Suverenlik itkisi; fərdi məlumat həddi xarici zəncirdə yoxlana bilməz],),
))

ADR-0001-in ilk əsaslandırmaları arasında reyestrin gələcəkdə dəyər köçürməsi daşıya bilməsi də var idi; bu istiqamət bu gün dayandırılıb (Bölmə 19.9). Seçimi ayaqda saxlayan əsaslandırmalar icazəli quruluş, bərabər səs, dərhal yekunluq, suverenlik və Aİ-dəki presedentdir.

== Proyeksiya prinsipi

Reyestr gəlsə, siyahıların yerini tutacaqmı? ADR-0051 ən dar və ən təhlükəsiz cavabı verir: #{strong[zəncir imzalı siyahıların proyeksiyasıdır.]} Mənbə həmişə imzalı siyahılar və lövbər jurnalıdır; zəncir yalnız "bu siyahı versiyası bu hash ilə dərc edildi" deyə şahidlik edən ikinci qeyddir (Şəkil 31).

Zəncirə iki növ qeyd yazılır: hər siyahı versiyasının hash-i (hansı siyahı, neçənci versiya, məzmunun SHA-256 hash-i, əvvəlki versiyanın hash-i, dərc vaxtı) və lövbər jurnalının son sətrinin hash-i. Jurnalın sətirləri bir-birinə hash zənciri ilə bağlı olduğundan son sətir bütün jurnalı bağlayır. Siyahı məzmunu, qeydlər, sənədlər, sənəd hash-ləri və fərdi məlumat zəncirə yazılmır; qeyd sahələri yalnız sabit ölçülü hash-lər və tam ədədlərdir, sərbəst mətn sahəsi yoxdur (ADR-0051 K2, CH2; Cədvəl 36).

#sekil(31, [Proyeksiya: mənbə siyahı, törəmə reyestr], "figures/wp-az/sekil-31.svg", yarim: false)

Proyeksiyanın ən vacib qaydası istiqamətdir. Yoxlama xətti və müştərilərin etibar suallarını verdiyi vahid interfeys (#{raw("TrustSource")}, Bölmə 6.6) yalnız siyahılardan oxuyur; zəncir heç bir addımda lazım deyil və olmayacaq. Yoxlayan tərəf istəsə, öz siyahısının hash-ini zəncirdəki təsdiqlənmiş hash ilə müqayisə edə bilər və üç cavabdan birini alır. #{strong[Bəli]}: təsdiqlənmiş hash eynidir. #{strong[Xeyr]}: eyni versiya üçün təsdiqlənmiş fərqli hash var; bu, iki yoxlayan tərəfə iki fərqli siyahı göstərildiyinin əlamətidir, yoxlama nəticəsini dəyişmir, lakin operatora siqnal verir və şəffaflıq hesabatına düşür. #{strong[Naməlum]}: funksiya söndürülüb və ya zəncirə çatmaq mümkün deyil; nəticə pisləşmir. Ziddiyyətdə siyahı qüvvədədir; zəncir qeydi düzəldilmir, yanına yeni versiya əlavə edilir (ADR-0051 K1, K5, CH1).

#tablo([#{strong[Cədvəl 36.]} Reyestrdə nə var, nə yoxdur (ADR-0051 CH2; ADR-0063 BL2; FW-ARF-0001 §1.6 P2).], (48fr, 40fr), ([Reyestrdə var], [Reyestrdə yoxdur],), (
  ([Siyahı versiyasının nömrəsi, məzmun hash-i, əvvəlki hash, dərc vaxtı], [Siyahının məzmunu; qurum, yoxlayan tərəf və sxem qeydləri],),
  ([Lövbər jurnalının son sətrinin sırası, hash-i, vaxtı], [Sənədlər və sənəd hash-ləri],),
  ([Yazıcıların hansı namizədi dəstəklədiyi, ziddiyyət hadisələri], [Fərdi məlumat, şəxsiyyət nömrəsi, sahə dəyərləri],),
  ([Ləğv siyahısının ünvanı, hash-i, versiyası, ölçüsü, bit sayı], [Ləğv bitləri, siyahıdakı mövqelər, sənəd növünün adı],),
))

Son sətir proyeksiya intizamını yaxşı göstərir. Şəxsiyyət xidmətinin ləğv siyahıları hər qeyd üçün bir, qurum siyahıları iki bit istifadə edir (Bölmə 12.3). Reyestrin köhnə layihəsi yalnız iki biti qəbul edirdi və şəxsiyyət siyahıları ümumiyyətlə lövbərlənə bilməzdi. ADR-0063 qaydanı tərsinə çevirdi: reyestr siyahının özünü necə təsvir etdiyini qeydə alır və IETF Token Status List-in \[17\] icazə verdiyi 1, 2, 4 və ya 8 dəyərlərindən birini qəbul edir. Hansı növün neçə bit istifadə edəcəyi naşirin və yoxlayan tərəfin qaydasıdır; reyestr sənəd növünü bilmir.

== Həddli lövbər və rəqib namizədlər

Zəncirdə hash-in təsdiqlənmiş sayılması üçün tək yazıcının (anchorer) göndərməsi kifayət etmir: hədd qədər fərqli səlahiyyətli yazıcı tam eyni məlumatı göndərməlidir və istehsalatda hədd ən azı ikidir. Tək operator təsdiqlənmiş lövbər yarada bilmir; bu, "ikinci müstəqil operator" qaydasının reyestrdəki qarşılığıdır (ADR-0051 K3, CH3).

Yazıcılar razılaşmasa, nə olar? İlk dizaynda versiyanı ilk açan yazıcı məlumatın nə olacağını müəyyən edir, fərqli məlumat göndərən rədd edilirdi. Təhlükəsizlik yoxlaması bunun iki zəifliyini tapdı: tək yazıcı versiyanı yanlış məlumatla açıb dürüst yazıcıları birdəfəlik bloklaya bilirdi və rədd zəncirdə iz qoymadığı üçün bu kilid görünməz qalırdı. ADR-0053 qaydanı dəyişdi: eyni versiya üçün hər fərqli məlumat #{strong[ayrıca namizəd]} kimi qeydə alınır, ikinci və sonrakı hər fərqli namizəd hamının görə biləcəyi ziddiyyət hadisəsi yayır, həddi ilk dolduran namizəd qalib gəlir (Şəkil 32). Təsdiqdən sonra versiya bağlanır; təsdiqlənmiş qeyd dəyişmir və silinmir. Dəstdən çıxarılan yazıcının dəstəyi sayılmır, beləliklə açarını dəyişən operator eyni versiyaya iki səs verə bilmir; hədd də yazıcıların sayını aşacaq şəkildə tənzimlənə bilməz (ADR-0053 K4).

#sekil(32, [Rəqib namizədlər: eyni versiya üçün iki fərqli hash (hədd k = 2)], "figures/wp-az/sekil-32.svg", yarim: false)

#kutu("teknik", [Həddli təsdiqin qaydası və lövbərin yolu])[
Tutaq ki, $W$ səlahiyyətli yazıcılar dəsti, $k$ hədd, $D(v, a)$ isə $v$ versiyası üçün $a$ namizədini dəstəkləyən səlahiyyətli yazıcılardır (ADR-0051 CH3; ADR-0053 AC1–AC4):

#formul[$ "təsdiq"(v, a) &<==> abs(D(v, a)) >= k \
2 &<= k <= abs(W) quad "(istehsalatda)" \
D(v, a) inter D(v, b) &= emptyset quad "hər" a != b "üçün" $]

Üçüncü sətir yazıcının eyni versiya üçün iki namizədi dəstəkləyə bilməyəcəyini deyir; əks halda tək operator iki fərqli hash-ə dəstək verib ikili danışığı öz içində gizlədə bilərdi. Siyahı versiyasının zəncirə yolu:

#adimlar((
  ("Siyahı naşiri", [#{strong[Dərc.]} Siyahını imzalayır; əvvəlki versiyanın hash-ini siyahıya yazır.], $"prev"_n = "SHA-256"(L_(n-1))$),
  ("Siyahı naşiri", [#{strong[Özünüyoxlama.]} İmzanı, hash zəncirini, aktuallığı yoxlayır; qüsurlu dəst lövbərlənmir.], $"Verify"(L_n) = "etibarlı"$),
  ("Yazıcı → Reyestr", [#{strong[Göndərmə.]} Yalnız hash-i göndərir; bu, səsdir.], $h_n = "SHA-256"(L_n)$),
  ("Reyestr", [#{strong[Namizəd.]} Eyni hash dəstəyi artırır; fərqli hash yeni namizəd açır və ziddiyyət hadisəsi yayır.], $abs(D(n, h_n)) + 1$),
  ("Reyestr", [#{strong[Təsdiq.]} Dəstək həddə çatdıqda versiya bağlanır.], $abs(D(n, h_n)) >= k$),
  ("Yoxlayan tərəf", [#{strong[İstəyə bağlı yoxlama.]} Öz siyahısının hash-ini təsdiqlənmiş lövbərlə müqayisə edir.], $h attach(=, t: ?) h_n$),
))

Funksiya bayrağı defolt olaraq söndürülüb; söndürülü olduqda zəncirə qoşulma olmur. İstehsalatda bayraq ikinci müstəqil operator və ən azı iki hədd olmadan işə salınmır (ADR-0051 CH5).
]

== Ad sahəsi, dövlətlərarası bağlantı, kvotalar

"Milli qeydiyyatlara yalnız həmin dövlət yazır" prinsipi reyestrdə kodun qaydasına çevrilir və ADR-0054 onun üç kənarını bağladı. #{strong[Adlar:]} ortaq növlər #{raw("urn:tamga:<sahə>:<Növ>:<əsas versiya>")}, bir dövlətə xas növlər isə #{raw("urn:tamga:<cc>:<sahə>:<Növ>:<əsas versiya>")} formatındadır (Bölmə 8.4). Milli növ yalnız öz dövlətinin ad sahəsində ola bilər, ortaq növ heç bir dövlətin ad sahəsində ola bilməz; beləliklə dövlət şurada səsə qoyulan ortaq növün adını əvvəlcədən tuta bilmir. #{strong[Bağlantılar:]} qurum yalnız öz dövlətinin kökünə bağlanır və yalnız öz dövlətindən varis göstərir; bir dövlətin dayandırma qərarı başqa dövlətin qurumlarına təsir edə bilməz. #{strong[Kvotalar:]} arzuolunmaz yazmanı məhdudlaşdıran gündəlik limitlər dövlət üzrə və qeyd növü üzrə hesablanır, ləğv siyahısının dərci siyahı üzrə gündə 48 ilə məhdudlaşdırılır (saatlıq dərc və təkrar cəhd payı) və qurum üzrə gündəlik yeni siyahı qeydiyyatı məhdudlaşdırılır; limiti yeni siyahı açmaqla keçmək olmur.

== Yeniləmə üçün gözləmə müddəti

Şəbəkənin qaydalarını dəyişən ən güclü əməliyyat reyestr üzərindəki qeyd proqramlarının (ağıllı müqavilələrin) yenilənməsidir. Bölmə 18.1-dəki çıxış hüququ yeniləmə səsvermədən keçdiyi anda qüvvəyə minərsə, işləmir: etiraz edən dövlət qərar verə bilməmiş yeni qaydalar tətbiq olunmuş olur. Buna görə ADR-0055 yeniləməyə yeddi günlük gözləmə qoyur.

#kutu("teknik", [Protokol yeniləməsinin addımları])[
#adimlar((
  ("Üzv dövlət → Reyestr", [#{strong[Təklif.]} Yeni versiyanı göstərən təklif açılır; sərbəst məlumat daşımır.], $"təklif" = ("hədəf", "yeni versiya")$),
  ("Üzv dövlətlər", [#{strong[Səsvermə.]} Aktiv üzvlər səs verir.], $3 dot e >= 2 dot n$),
  ("Reyestr", [#{strong[Növbə.]} Hədd dolduqda təklif tətbiq edilmir, növbəyə daxil olur.], $"eta" = t_"növbə" + 7 "gün"$),
  ("Üzv dövlətlər", [#{strong[Çıxış pəncərəsi.]} Hər kəs nə olacağını görür; razı olmayan dövlət çıxa bilər.], $t_"növbə" <= t < "eta"$),
  ("Reyestr", [#{strong[Yenidən hesablama.]} Hədd həmin andakı aktiv üzvlərdən yenidən hesablanır; çıxanın səsi düşür.], $3 dot e' >= 2 dot n'$),
  ("Reyestr", [#{strong[Tətbiq.]} Hədd təmin edilirsə, tətbiq edilir; otuz gün ərzində tətbiq edilməsə, təklif düşür.], $"eta" <= t_"tətbiq" <= "eta" + 30 "gün"$),
))

İki gün dövlət qurumlarına reaksiya müddəti qoymur, on dörd gün təcili düzəlişi lüzumsuz uzadır; yeddi gün geniş yayılmış təcrübədir. Ayrıca zaman kilidi proqramı yeni səlahiyyət sahibi yaradacağı üçün rədd edildi. Gözləmə yalnız yeniləməyə tətbiq edilir; üzv qəbulu, çıxarılma və ortaq növün qeydiyyatı gözləməsizdir.
]

Səsə qoyulanın oxuna bilən qalması da qaydadır. Yeniləmə ilə yalnız parametrsiz başlanğıc funksiyası çağırıla bilər; başlanğıc dəyərləri yeni versiyanın kodundadır və səsə qoyulan həmin koddur. Yazıcı əlavə etmək, həddi dəyişmək və ya ortaq növü silmək kimi idarəetmə əməliyyatları növü müəyyən olan ayrıca təkliflərlə aparılır. Ümumi "bu çağırışı icra et" təklifi bilərəkdən qurulmadı: reyestrdə sərbəst məlumat sahəsi açar və dövlətin nəyə səs verdiyini oxumağı çətinləşdirərdi (ADR-0055 GE2, GE3).

== İcazələndirmə və istismar

Reyestr icazəlidir: yalnız təsdiqlənmiş qovşaqlar qoşulur, yalnız təsdiqlənmiş hesablar əməliyyat göndərir. İlk sənədlər bunu Besu-nun zəncirüstü icazə mexanizmi ilə nəzərdə tuturdu; Besu bu mexanizmi 24.12-də köhnəlmiş elan etdi və 25.6.0-da çıxardı. ADR-0052 qalan yolu, hər qovşaqdakı yerli icazə faylını seçdi və bir qayda əlavə etdi: fayl əl ilə yazılmır, reyestrin öz idarəetmə qeydindən yaradılır; hər operator onu özü yaradır, bütün validatorlar eyni siyahını daşıyır və fərq istismar hadisəsi kimi hesabata salınır. İcazə siyahısı ikinci müdafiə xəttidir; yazma səlahiyyətinin əsas nəzarəti reyestrin qaydalarındadır və siyahıdakı xəta həmin səlahiyyəti genişləndirmir. Qovşaqların məsafədən çağırış interfeysi internetə açılmır; xarici çıxış yalnız qarşılıqlı TLS yoxlayan əks proksinin arxasından, müəyyən edilmiş müştərilərə verilir (ADR-0052 LP4, LP5).

== Keçid

Siyahılardan reyestrə keçid yenidən yazma olmayacaq. Keçid siyahı versiyaları arxivinin reyestrə #{strong[yenidən oynadılmasıdır]}: hər versiya ardıcıllıqla işlənir və qeydlərin status tarixçəsindəki vaxtlar qorunur (ADR-0009 K7). Məqsəd budur: bağlanmış qurumun köhnə diplomu verildiyi tarixdə qurum aktiv olduğu üçün etibarlıdır (Bölmə 11.3) və keçiddən sonra da eyni cavabı almalıdır. Qəbul meyarı buna görə yazılıb: pilot boyu qeydə alınan hər etibar sualında siyahıya əsaslanan etibar mənbəyi ilə reyestrə əsaslanan etibar mənbəyi eyni cavabı verməlidir; tək bir sorğuda qəbul ilə rədd ayrılarsa, keçid tamamlanmamış sayılır. Verilmiş sənədlər yenidən verilmir; cüzdan və sənəd vermə xidməti dəyişmir; müştərilər yalnız #{raw("TrustSource")} interfeysinin arxasındakı tətbiqi dəyişir (ADR-0015; FW-ARF-0001 §8.2). Keçiddən geri də dönmək mümkündür və siyahılar reyestr mərhələsində də dərc edilməyə davam edir (ADR-0009 Əsaslandırma 3).

== Dəyər qatı: dayandırılıb

İlk dizaynda reyestrin gələcəkdə dəyər qatı daşıya bilməsi üçün bəzi qərarlar qəbul edilmişdi (ADR-0003). Onlar artıq məcburi deyil və yalnız tədqiqat istiqaməti kimi qeyddə durur (ADR-0072). Tamga Network token və ya koin buraxmır; ödəniş, hesablaşma və ya dəyər köçürməsi emal etmir və bunlar nə ilk versiyanın, nə də pilotun hissəsidir. Reyestr kodu yalnız siyahıların proyeksiyasıdır. Bu istiqamətin yenidən açılması idarəetmə orqanının qərarını, məxfilik tədqiqatını, müstəqil təhlükəsizlik yoxlamasını və yeni qərar qeydini tələb edir.

= Aİ ilə Uyğunluq və Üçüncü Ölkə Tərəfindən Tanınma

Aynur İstanbulda bir işə müraciət edir; işəgötürənin Avropada tərəfdaşı var və o da Aynurun sənədini görmək istəyir. Tərəfdaşın sistemi Aİ cüzdanlarından gələn sənədləri oxuya bilir; Aynurun sənədi də Aİ-nin seçdiyi formatdadır və imzalıdır. Sənəd orada qəbul edilərmi?

Cavabın iki yarısı var. Birinci yarı texnikidir: sənəd oxuna bilərmi, imzası yoxlana bilərmi, onu verən qurumu etibar edilən siyahıdan öyrənmək olarmı? Tamga-nın dizaynı bu yarıya cavab verməyə çalışır. İkinci yarı hüquqidir: oxunan sənədə Avropada hansı dəyər verilir? Bu yarı şəbəkənin əlində deyil. Daha bir qeyd: Aynurun Bakıda aldığı diplom bu gün şəbəkənin siyahılarında yer almır; yalnız Türkiyə siyahısı aktivdir və Azərbaycan üçün ayrılmış yer dövlət qoşulduqda dolacaq boş yuvadır, saziş barədə bildiriş deyil.

== Birgə işləmənin üç səviyyəsi

Trust Framework üç səviyyə müəyyən edir (FW-TF-0001 §6). #{strong[Daşınabilirlik]}: sənədlər SD-JWT VC \[16\] və mdoc \[34\] formatındadır, OpenID4VCI \[30\] və OpenID4VP \[31\] ilə verilir və göstərilir; Aİ cüzdanı Tamga sənədini texniki cəhətdən emal edə bilər. #{strong[Etibar]}: siyahılar ETSI modelindədir, ETSI TS 119 602 \[42\] JSON görünüşü ilə də dərc edilir, kök barmaq izləri ayrıca kanalla elan edilir və siyahıların siyahısında başqalarının siyahıları üçün yer var. #{strong[Hüquqi tanınma]}: sənədin başqa ölkədə hüquqi baxımdan etibarlı sayılması. İlk iki səviyyə şəbəkənin işidir və bu gün əsasən işləyir; üçüncüsü dövlətlərin işidir və şəbəkə bu sazişlərin tərəfi deyil.

== Standartlara uyğunluq xəritəsi

Texniki qatın Aİ-ninki ilə eyni olması FW-ARF-0001 §1.6-da P3 kimi yazılıb: Tamga-ya xas hər əlavə standart genişlənmə nöqtəsi ilə edilir və standart müştəriləri pozmur (ADR-0035 PO1). Cədvəl 37 Aİ ekosisteminin əsaslandığı standartları, onların Tamga-dakı qarşılıqlarını və statuslarını göstərir; "işləyir" real şəbəkədə və ya sandbox-da canlı deməkdir.

#tablo([#{strong[Cədvəl 37.]} Standartlara uyğunluq xəritəsi (FW-ARF-0001 §2.8, §8.4; FW-REF-0001; müvafiq qərar qeydləri).], (17fr, 32fr, 48fr, 21fr), ([Sahə], [Standart və ya Aİ qaydası], [Tamga-dakı qarşılığı], [Status],), (
  ([Etibar siyahısı], [ETSI TS 119 602 (LoTE, JSON)], [Xarici siyahılar bu formatda oxunur (ADR-0036); Tamga siyahılarının LoTE görünüşü (Bölmə 6.8)], [Oxuma işləyir; görünüşlərin dərci planlaşdırılıb],),
  ([Etibar siyahısı], [ETSI TS 119 612 V2.4.1 (XML)], [Eyni imzalı mənbədən, eyni versiya ilə XAdES imzalı görünüş (ADR-0066)], [Sandbox-da işləyir; real şəbəkədə planlaşdırılıb],),
  ([Qurum şəxsiyyəti], [X.509 (RFC 5280), ETSI EN 319 401; TS 119 412-6, EN 319 412-3], [Milli kök və qurum sertifikatları, qurum identifikasiya nömrəsi (ADR-0004, ADR-0050)], [İşləyir],),
  ([Giriş sertifikatı], [ETSI TS 119 411-8], [Ticarət adı, dəstək ünvanı, xidmət identifikatoru (ADR-0058)], [İşləyir; siyasət identifikatoru planlaşdırılıb],),
  ([Sənəd verən siyasəti], [ETSI TS 119 471], [Tamga Rulebook-un sənəd verən qaydaları], [Qaydalara daxil edilib],),
  ([Sənəd formatı], [IETF SD-JWT VC, ETSI TS 119 472-1, ISO\/IEC 18013-5 mdoc], [SD-JWT VC əsasdır; şəxsiyyət əlavə olaraq mdoc (ADR-0006, ADR-0013)], [İşləyir],),
  ([Şəxsiyyət sahələri], [Aİ İcra Reqlamenti 2026\/1731], [Aİ PID sahə adları; sənəd PID deyil (ADR-0045)], [İşləyir],),
  ([Vermə və göstərmə], [OpenID4VCI 1.0, OpenID4VP 1.0, DCQL, HAIP 1.0, ETSI TS 119 472-2\/-3], [Tamga vermə və göstərmə profilləri (Bölmə 9–10; ADR-0034)], [İşləyir],),
  ([Brauzerdən göstərmə], [W3C Digital Credentials API, ISO\/IEC 18013-7], [Yoxlayan tərəf hissəsi], [Yoxlayan tərəf hazırdır; cüzdan planlaşdırılıb],),
  ([Yaxın məsafə], [ISO\/IEC 18013-5 (Bluetooth)], [Hədəf axın; bu gün körpü yollar (ADR-0012)], [Planlaşdırılıb (cihaz testini gözləyir)],),
  ([Cüzdan sübutları], [Aİ texniki spesifikasiyası TS3], [24 saatdan qısa WIA və açar attestasiyası (ADR-0025)], [İşləyir; cihaz sübutu planlaşdırılıb],),
  ([Ləğv], [IETF Token Status List], [Ləğv siyahıları; mdoc üçün CWT (ADR-0008, ADR-0048)], [İşləyir],),
  ([Qeydiyyat], [Aİ İcra Reqlamenti 2025\/848 (2026\/1730 ilə), ETSI TS 119 475], [Ortaq qeydiyyat məlumatları dəsti; qeydiyyat sertifikatı, siyasəti və status siyahısı (ADR-0024, ADR-0026, ADR-0068)], [İşləyir],),
  ([Paylaşma qaydası və psevdonim], [Aİ ARF Mövzu 43 və Mövzu 11], [Daxili açıqlama siyasəti; sayt üzrə psevdonim (ADR-0046, ADR-0031)], [İşləyir],),
  ([Şəxsiyyətin yoxlanılması], [ETSI TS 119 461], [Səviyyələrin uyğunlaşdırılması; provayder müqaviləsi ona istinad edir], [Qaydalara daxil edilib],),
  ([İnsident bildirişi], [Aİ İcra Reqlamenti 2025\/847], [Əhəmiyyət səviyyələri və müddətlər (FW-TF-0001 §4.6)], [Qaydalara daxil edilib],),
  ([Sertifikatlı cüzdanlar siyahısı], [Aİ İcra Reqlamenti 2025\/849], [Qarşılığı dövlət qoşulduqda], [Planlaşdırılıb],),
  ([Sənəd növü qaydaları], [Aİ Attestation Rulebook şablonu 1.5], [Tamga Rulebook-un qolları], [İşləyir],),
  ([Sıfır bilik sübutu], [Longfellow ZK (mdoc)], [Yaşın sübutu; sxemlər siyahıdadır (ADR-0032, ADR-0044)], [Yoxlayan tərəf işləyir; cüzdan planlaşdırılıb],),
  ([Təhsil semantikası], [ELM 3 \/ Europass, ISCED-F, EQF], [Diplom sahələrinin mənası (Education Rulebook)], [İşləyir],),
  ([Etibar nişanı], [Aİ cüzdan etibar nişanı], [İstifadə edilmir; "Tamga Network-da siyahıdadır" göstəricisi (ADR-0049)], [İşləyir],),
))

Cədvəl uyğunluq iddiası daşıyır, sertifikat iddiası daşımır: "işləyir" standartın tətbiq edildiyini və bunun mənbə ilə göstərilə bildiyini deyir; müstəqil təşkilatın onu təsdiqlədiyini demir (Bölmə 20.5).

== Aİ qeydiyyat məlumatları və sertifikatlar

Aİ-nin yanaşmasında cüzdandan məlumat istəyən hər təşkilat əvvəlcə qeydiyyatdan keçir və qeydiyyatda bildirdiyindən artığını istəyə bilməz (eIDAS 2.0 \[2\] 5b maddəsi). Tamga eyni məntiqi öz qeydiyyat orqanı və Aİ-nin öz məlumat dəsti və sertifikat növləri ilə qurur; məqsəd budur ki, dövlət bu rolu təhvil aldıqda və ya Aİ yoxlayan tərəfi bu qeydlərə baxdıqda yad strukturla qarşılaşmasın.

Qeydlər Aİ-nin ortaq qeydiyyat məlumatları dəstini daşıyır (İcra Reqlamenti 2025\/848 \[6\] I Əlavə, 2026\/1730 \[7\] dəyişikliyi ilə): rəsmi və ticarət adı, identifikasiya nömrəsi, ünvan, əlaqə, hər istifadə üçün məqsəd və məxfilik siyasəti, dövlət qurumu olub-olmadığı, vasitəçi əlaqələri və məlumatların qorunması orqanı. Yalnız hüquqi şəxslər qeydiyyatdan keçir; cüzdanın təsdiq ekranı, silmə tələbi və şikayət yolu bu məlumatlara əsaslanır (ADR-0024). Yoxlayan tərəf iki sertifikat daşıyır. #{strong[Giriş sertifikatı]} onun kim olduğunu deyir (ETSI TS 119 411-8 \[45\]; ADR-0058). #{strong[Qeydiyyat sertifikatı]} nəyə qeydiyyatda olduğunu deyir: ETSI TS 119 475 \[46\] formatında, məzmunu yalnız imzalı siyahıdakı qeyddən gələn, ayrıca qeydiyyat orqanı açarı ilə imzalanan və ən çox 12 ay etibarlı sertifikat. Cüzdan istənən sahələri onunla müqayisə edir; sertifikatsız sorğu rədd edilir, ləğv edilmiş sertifikatlı sorğuya məlumat göndərilmir (ADR-0026, ADR-0056, ADR-0068). Cüzdan provayderləri isə öz həllərini bəyan edir, uyğunluq testlərindən keçir və onların sübut imza açarları siyahıların siyahısına əlavə edilir (FW-TF-0001 §3.2).

Aİ ARF-in \[11\] iki mövzusu da eyni yolla götürüldü. Mövzu 43-ə görə sənəd verən sənədinin yalnız müəyyən yoxlayan tərəflərə göstərilməsini istəyə bilər; Tamga-da bu qayda qurumun imzalı təqdimat məlumatında dərc edilir, cüzdan onu yoxlayan tərəfin sertifikatları ilə müqayisə edir, uyğun gəlmədikdə xəbərdarlıq edir və son qərarı şəxsə buraxır (ADR-0046). Mövzu 11-in psevdonim qaydaları sayt üzrə psevdonim quruluşu ilə bənd-bənd uyğunlaşdırılıb (SPEC-WALLET-0001 §5.4.1; Bölmə 15.3).

== Hüquqi tanınma şəbəkənin əlində deyil

Bu bölmənin ən vacib cümləsi belədir: Aİ standartları ilə texniki uyğunluq Aİ-də hüquqi tanınma demək deyil. Seriyanın on birinci yazısı \[76\] bunu reqlamentin mətnindən ətraflı göstərdi; burada Tamga baxımından nəticələrini ümumiləşdiririk (ADR-0035 hüquqi qeydi; FW-ARF-0001 §6.2).

Tez-tez edilən səhv 5f maddəsini üçüncü ölkələrin tanınma yolu hesab etməkdir. 5f maddəsi Aİ daxilindəki təşkilatların #{strong[Aİ cüzdanlarını]} qəbul etmək öhdəliyidir; onun mövzusu reqlamentə əsasən təqdim edilən cüzdanlara Aİ daxilində etibar edilməsidir. Reqlamentdə Aİ-dən kənar ölkənin cüzdanını Avropa Rəqəmsal Şəxsiyyət Cüzdanı sayan və ya onunla ekvivalent tutan müddəa yoxdur.

"Üçüncü ölkə" ifadəsinin keçdiyi əsas maddə "Beynəlxalq aspektlər" adlı 14-cü maddədir və #{strong[etibar xidmətləri]} ilə məhdudlaşır. 14(1) maddəsinə görə üçüncü ölkədə təsis edilmiş etibar xidməti provayderlərinin xidmətləri icra reqlamenti ilə və ya Aİ ilə həmin ölkə arasında Avropa İttifaqının Fəaliyyəti haqqında Müqavilənin 218-ci maddəsinə əsasən bağlanmış sazişlə tanınarsa, Aİ-dəki kvalifikasiyalı etibar xidmətləri ilə hüquqi baxımdan ekvivalent sayılır. 14(2) maddəsi üçüncü ölkədəki provayderlərin Aİ-dəki kvalifikasiyalı provayderlərə tətbiq edilən şərtlərə cavab verməsini və həmin ölkənin tanınmış provayderlərinin etibar siyahısını qurub dərc etməsini tələb edir; 14(3) maddəsi qarşılıqlılıq şərtidir. Bu yolun tərəfləri dövlətlərdir: Türkiyə və ya başqa türk dövləti bu yola çıxa bilər, Tamga Network sazişin tərəfi ola bilməz.

Şəbəkənin rolu #{strong[texniki hazırlıqdır]}: ETSI formatında siyahılar, ETSI profilli sertifikatlar və təhvil verilə bilən dövlət rolları. Dövlət bu yola çıxmaq istəsə, şəbəkə ona sınanmış alət və şablon təqdim edə bilər; siyahının sahibi həmin dövlət olur. ETSI TS 119 612 \[41\] XML görünüşünün əsaslarından biri budur (ADR-0066). Komissiya üçüncü ölkələrin imza və möhür xidmətləri üçün ayrıca aralıq yol \[14\] açıb: üçüncü ölkə etibar siyahılarının siyahısı və ona bağlı beynəlxalq uyğunluq pilotu. Bu yol dövlətin nəzarət etdiyi imza və möhür provayderlərini əhatə edir və hüquqi ekvivalentlik vermir; Tamga-nın siyahısındakı qurumlar bu yolun mövzusu deyil və Tamga dövlət olmadığı üçün onun öz siyahısı ora daxil olmur (ADR-0066) (Şəkil 33).

#sekil(33, [Tanınma yolları: texniki etibar və hüquqi tanınma], "figures/wp-az/sekil-33.svg", yarim: false)

Qısa müddətdə mənzərə belədir. Tamga-nın siyahılar siyahısı Aİ-nin siyahılarını eyni federasiya mexanizmi ilə, əhatəni sənəd növünə görə məhdudlaşdıraraq göstərə bilər (Bölmə 6.9); bu texniki etibardır və bu gün siyahıda xarici siyahı yoxdur. Əks istiqamətdə Aİ-dəki yoxlayan tərəf Tamga sənədlərini yalnız öz istəyi ilə, Tamga-nın siyahısını öz etibar mənbəyinə əlavə etməklə qəbul edə bilər; bu da hüquqi tanınma deyil və belə təqdim edilmir. Aynurun avropalı tərəfdaşı üçün bugünkü cavab budur: sənəd texniki cəhətdən oxuna bilər, lakin ona veriləcək dəyər həmin təşkilatın öz qaydalarından və müvafiq hüquqdan asılıdır.

== Uyğunluğu necə göstəririk

"Aİ ilə uyğun" iddiadır və sübut tələb edir. Bu gün uyğunluq dörd yolla göstərilir; heç biri sertifikat deyil.

#{strong[Açıq uyğunluq testləri.]} Sənəd verənin, yoxlayan tərəfin və cüzdan provayderinin nə ilə sınandığı depoda hamıya açıq və versiyalıdır; vektorlar fərdi məlumat və gizli açar ehtiva etmir. Öhdəlik testləri ən azı bunları sınayır: köhnə siyahı "yoxlanıla bilmədi" nəticəsini verir, naməlum formatda və imza xətasında əməliyyat dayanır. Testlər hər dərcdən əvvəl məcburidir (FW-TF-0001 §4.3; RB-ENF-01).

#{strong[OpenID öz-sınağı.]} 2026-cı ilin oktyabrında şəxsiyyət xidməti və Tamga Verify sandbox-da OpenID Foundation-ın uyğunluq test planlarını \[33\] icra etdi: HAIP \[32\] və FAPI 2.0 ilə OpenID4VCI (63 modul) və HAIP ilə OpenID4VP (14 modul). Sənəd vermə tərəfinin son icrası uğursuz modul olmadan, yoxlayan tərəfinki isə uğursuz modul və xəbərdarlıq olmadan bitdi. Yoxlayan tərəfin icrası sorğunun işlənməsinin 29 oktyabrda dəyişməsindən əvvəl olub və yenidən icra ediləcək; cüzdan planları cihaz qurulumu tələb etdiyi üçün icra edilmədi. Bu, OpenID Foundation-ın öz aləti ilə aparılmış öz-sınaqdır; sertifikatlaşdırma ayrıca prosesdir. Öyrənilənlər açıq mənbəli test dəsti kimi dərc edildi.

#{strong[ETSI siyahısının Aİ aləti ilə oxunması.]} Sandbox-dakı ETSI TS 119 612 XML siyahısı ETSI-nin rəsmi XML sxeminə və Aİ-nin imza yoxlama alətinə (DSS) qarşı yoxlanıldı. Alət imzanı və istinadları düzgün tapdı; imzalayan Aİ-də etibar lövbəri olmadığı üçün nəticə "qeyri-müəyyən" çıxdı və bu, gözlənilən nəticədir (ADR-0066). Yoxlama yalnız formatın düzgün olduğunu sübut edir; tanınma mənası daşımır.

#{strong[Birgə işləmə tədbirləri.]} Aİ-nin birgə işləmə tədbirlərində iştirak çərçivədə nəzərdə tutulub (FW-ARF-0001 §7.3) və #{strong[planlaşdırılıb]} statusundadır. Dövlətlər qoşulduqda bu yüngül uyğunluq quruluşunun üstünə müstəqil qiymətləndirmə orqanları və milli sertifikatlaşdırma əlavə ediləcək (FW-TF-0001 §2.4).

== Ad və nişan

Uyğunluğun dili də uyğunluğun bir hissəsidir. "EUDI Wallet", yəni Avropa Rəqəmsal Şəxsiyyət Cüzdanı Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı və Aİ qaydalarına görə sertifikatlaşdırılan cüzdanın hüquqi adıdır; Aİ-dən kənar təşkilatın cüzdanı bu statusu ala bilməz və Aİ etibar nişanından istifadə edə bilməz (FW-ARF-0001 §1.4; ADR-0035 PO4). Şəbəkə öz siyahısındakı cüzdanlar üçün öz yazılı göstəricisindən istifadə edir: "Tamga Network-da siyahıdadır". Göstəricinin loqosu yoxdur, Aİ ulduzları və rəngləri istifadə edilmir; toxunduqda imzalı siyahıdakı provayder qeydi açılır və qeyd siyahıdan çıxdıqda göstərici yox olur (ADR-0049). Cədvəl 38 hamıya açıq hər mətndə riayət edilən dili ümumiləşdirir.

#tablo([#{strong[Cədvəl 38.]} Nə deyə bilərik, nə deyə bilmərik (ADR-0035 hüquqi qeydi və PO4; ADR-0049; ADR-0066 TX2).], (30fr, 15fr, 44fr), ([İfadə], [İstifadə edilirmi​​​​], [Səbəb],), (
  (["Aİ ilə uyğun", "Aİ standartlarında"], [Bəli], [Eyni formatlar, protokollar və siyahı modeli; testlərlə dəstəklənir],),
  (["OpenID öz-sınağı aparılıb"], [Bəli], [Əhatəsi və tarixi yazılmaqla],),
  (["Tamga Network-da siyahıdadır"], [Bəli], [Şəbəkənin öz yazılı göstəricisi],),
  (["EUDI Wallet", "Avropa Rəqəmsal Şəxsiyyət Cüzdanı"], [Xeyr], [Üzv dövlətə məxsus hüquqi status],),
  (["Aİ etibar nişanı", Aİ ulduzları], [Xeyr], [Aİ-dən kənarda istifadə edilə bilməz],),
  (["Sertifikatlı"], [Xeyr], [Sertifikatlaşdırma ayrıca prosesdir və aparılmayıb],),
  (["Kvalifikasiyalı", "bildirilmiş siyahı"], [Xeyr], [Sənəd verənlər kvalifikasiyalı deyil; siyahı 910\/2014 çərçivəsində bildirilməyib],),
  (["Aİ-də etibarlıdır", "Aİ ilə qarşılıqlı tanınma"], [Xeyr], [Hüquqi tanınma dövlətlərarası saziş tələb edir],),
  (["Milli cüzdan"], [Xeyr], [Şəbəkə cüzdan idarə etmir və heç bir dövlət adından danışmır],),
))

Bu qaydaların məqsədi oxucunu Tamga-nın olduğundan böyük bir şey olduğuna inandırmamaqdır. Şəbəkənin deyə biləcəyi budur ki, o, Avropanın seçdiyi dildə danışır və bunu hər kəsin sınaya biləcəyi şəkildə göstərir. Bu dilin Avropada hüquqi baxımdan nəyə uyğun gələcəyinə dövlətlər qərar verəcək.

= Qərarlar və Onların Əsaslandırması

Bu sənəd boyu hər vacib seçimi qərar qeydinə bağladıq. Oxucu bir seçimin əsaslandırması ilə maraqlandıqda ADR nömrəsindən qərar qeydinin tam mətninə keçə bilər; orada problemin necə yarandığını, hansı variantların ölçülüb-biçildiyini və hansının niyə seçildiyini tapır. Bu bölmə qərarları bir yerdə təqdim edir. Əvvəlcə qərarın necə qəbul edildiyini, sonra on böyük qərarı dərindən, ardından qəbul edilmiş bütün qərarları mövzularına görə və nəhayət, zamanla dəyişən qərarları izah edir.

== Qərar necə qəbul edilir

Tamga-da məcburi seçim yazılı qərar qeydi ilə başlayır. Qayda qısadır və şəbəkənin hər deposunda eyni sözlərlə təkrarlanır: əvvəl qərar qeydi, sonra kod. Qərar qeydi dörd suala cavab verir. Hansı vəziyyət qərar tələb etdi, hansı variantlar nəzərdən keçirildi, hansı seçildi və bunun nəticələri nə oldu? Qeydlərin çoxu bundan əlavə qərarın doğurduğu məcburi qaydaları, yəni invariantları qısa kodlarla sadalayır; məsələn, ADR-0017-nin qaydaları #{raw("HV1")}, #{raw("HV2")} kimi adlandırılır və uyğunluq testləri bu kodlara istinad edir.

Qeyd üç statusdan keçir. #{strong[Təklif]} (#{emph[Proposed]}) mərhələsində qərar yazılıb, lakin məcburi deyil. Layihə rəhbərliyi qərarı qəbul etdikdə qeyd #{strong[qüvvəyə minir]} (#{emph[Active]}) və qəbul tarixi qeydə alınır; təsirə məruz qalan spesifikasiyalar və çərçivə sənədləri eyni iş çərçivəsində yenilənir. Bağlanmış qərar yalnız yeni qərar qeydi ilə dəyişir. Dəyişən qeyd silinmir; #{strong[əvəz olundu]} (#{emph[Superseded]}) kimi işarələnir və ya yeni qeyd köhnə qeydin hansı bəndini dəyişdiyini açıq yazır. Beləliklə qərarın bugünkü forması qədər onun bu formaya necə gəldiyi də oxuna bilir.

Bu nəşrin hazırlandığı tarixdə 72 qərar qeydi var: 70-i qüvvədədir, biri təklif statusundadır (ADR-0028), biri isə yerini başqa qərara verib (ADR-0003). Bütün qeydlərin nömrəsi, başlığı, statusu və qəbul tarixi B Əlavəsindədir.

== On böyük qərar

Qeydlərin hamısı eyni çəkidə deyil. Aşağıdakı on qərar şəbəkənin formasını müəyyən edir; qalanlarının çoxu bunların təfərrüatıdır. Hər biri üçün sualı, variantları, seçimi, əsaslandırmanı və seçimin qiymətini qısaca veririk. Təfərrüatlar müvafiq bölmələrdədir.

#{strong[1\. Sənəd formatı: SD-JWT VC \[16\] və şəxsiyyət üçün əlavə olaraq mdoc \[34\] (ADR-0006, ADR-0013).]} Sual sənədin hansı formatda kodlaşdırılacağı idi. SD-JWT VC seçici paylaşımı daxili olaraq təqdim edir, Aİ-nin əsas formatıdır və JSON-LD əsaslı formatlardan daha sadədir; buna görə əsas format oldu. Şəxsiyyət sənədi üçün tək format kifayət etmədi. iOS brauzeri üzərindən göstərmə və yaxın məsafə mdoc tələb edir, Aİ də şəxsiyyət məlumatını iki formatda müəyyən edir. Nəzərdən keçirilən digər iki yol yalnız SD-JWT VC-də qalmaq və tamamilə mdoc-a keçmək idi; birincisi brauzer yolunu bağlayar, ikincisi veb axınları üçün daha sadə olan xətti pozardı. Qiyməti şəxsiyyət sənədi üçün ikinci vermə və yoxlama kodu və onun testləridir (Bölmə 8).

#{strong[2\. Qurum şəxsiyyəti X.509 \[28\], şəxsə qlobal identifikator yoxdur (ADR-0004).]} Qurumların şəxsiyyəti üçün şəbəkəyə xas mərkəzləşdirilməmiş identifikator profili ilə X.509 sertifikatları arasında seçim edildi. Qurumlar elektron imza və möhür üçün onsuz da X.509-dan istifadə edir, onun qanunvericilikdə qarşılığı var və Aİ-nin kvalifikasiyalı sertifikat sistemi bu zəmindədir; şəbəkəyə xas profil etibarsız sayıldı. Eyni qərar şəxslər üçün əks prinsip qoyur: şəxsə şəbəkə miqyasında sabit identifikator verilmir. Qiyməti sertifikat yeniləndikdə qurumun identifikatorunun da dəyişməsi və davamlılığın varis əlaqəsi ilə qurulmasıdır (Bölmə 6.7, 7.1).

#{strong[3\. Zəncirsiz başlanğıc və iki müstəqil operator həddi (ADR-0009, ADR-0051).]} Sual ortaq reyestrin nə vaxt qurulacağı idi. Variantlar pilotu reyestrin qurulmasına bağlamaq, tək operatorlu inkişaf zənciri ilə başlamaq və reyestri həddə bağlayıb imzalı siyahılarla başlamaq idi. Tək operatorun dörd qovşağı eyni operatorun imzaladığı siyahıdan artıq etibar yaratmadığı üçün üçüncü yol seçildi. Reyestr ən azı iki müstəqil operatorun yazılı razılığı ilə qurulur və qurulduqda da imzalı siyahıların proyeksiyası olur. Qiyməti bu gün etibarın tək imzalayana əsaslanmasıdır; bu qalıq risk Bölmə 23-də L1 kimi yazılıb (Bölmə 19).

#{strong[4\. Ləğv siyahısı zəncirdən kənarda (ADR-0008).]} Ləğv məlumatının bit massivini ortaq reyestrdə saxlamaq daimi və yoxlanıla bilən görünür. Lakin hansı bitin nə vaxt dəyişdiyi hamıya açıq reyestrdə izlənilə bilər; qovşaqları idarə edənlər sənədin ləğv anını öyrənir. Qərar bit massivini sənəd verənin imzaladığı və sabit intervalla dərc etdiyi siyahıda saxlayır; reyestr qurularsa, yalnız siyahının hash-ini daşıyır. Kriptoqrafik akkumulyator və ya sıfır biliklə ləğv təxirə salındı, qısaömürlü sənəd yolu isə qismən qəbul edildi. Qiyməti ləğvin bir dərc intervalı qədər gecikmə ilə qüvvəyə minməsidir (Bölmə 12).

#{strong[5\. Şəbəkə yalnız şəbəkədir və cüzdan idarə etmir (ADR-0037, ADR-0042).]} İlk mövqeləndirmə qərarı şəbəkənin üstündə məhsul və xidmətləri də nəzərdə tuturdu və siyahını idarə edən tərəfin xidmət satmasının gərginlik yaratdığını özü qeyd etmişdi. ADR-0037 bu gərginliyi aradan qaldırdı: kommersiya xidmətlərini şəbəkədən kənar şirkətlər öz adları ilə təqdim edir. ADR-0042 eyni prinsipi cüzdanlara tətbiq etdi; şəbəkənin bir cüzdanın provayder xidmətini idarə etməyə davam etməsi və cüzdanlar üçün ayrıca test mühiti qurulması rədd edildi. Qiyməti şəbəkənin ilk cüzdanının da öz provayderini şəbəkədən kənarda qurmağa məcbur olmasıdır (Bölmə 4.3, 5.4).

#{strong[6\. Müvəqqəti şəxsiyyət sənədi provayderi, kvalifikasiyalı deyil (ADR-0011, ADR-0022).]} Dövlətin şəxsiyyət məlumatı provayderi olmadığı halda qurumların şəxsi etibarlı şəkildə tanıya bilməsi lazım idi. Variantlar hər qurumun öz şəxsiyyət yoxlamasını aparması, dövləti gözləmək və şəxsiyyət nömrəsi daşımayan sənəd idi; birincisi şəxsi hər qurumda yenidən yoxlatdırır, ikincisinin tarixi yoxdur, üçüncüsü adaşlarda uyğunlaşdırmanı qeyri-müəyyən edir. Seçilən yol şəbəkənin müvəqqəti şəxsiyyət xidməti idarə etməsi və PID olmayan sənəd verməsidir. Xidmətin sinfi də ayrıca qərarla kvalifikasiyalı olmayan atribut attestasiyası və I2 kimi sabitləndi; "kvalifikasiyalı" müstəqil qiymətləndirmə tələb edir. Qiyməti şəbəkənin bu xidmət üçün məlumat nəzarətçisi olmasıdır (Bölmə 14).

#{strong[7\. Səlahiyyətli mənbə qurumdadır, imza açarı da qurumdadır (ADR-0020, ADR-0057).]} Host edilən sənəd vermə xidməti qurumlar üçün rahatdır, lakin iki risk daşıyır: şəxs qeydlərinin şəbəkədə toplanması və qurum açarının operatorda durması. ADR-0020 şəxs qeydlərini şəbəkədə saxlamağı rədd etdi; məlumat imza anında qurumun sorğu ucundan oxunur və saxlanmır. ADR-0057 açarı serverdə faylda saxlamağı, tək bulud provayderinə bağlanmağı və şəbəkəyə xas imza ucu müəyyən etməyi rədd etdi; xidmət imzanı CSC API v2 \[54\] ilə istəyir və qarşı tərəfə yalnız hash göndərir. Qiyməti qurumun sorğu ucu və imza xidməti idarə etməsidir (Bölmə 5.2, 7.6, 9.2).

#{strong[8\. Sayt üzrə psevdonim (ADR-0031).]} "Tamga ilə daxil ol" sayta şəxsin kim olduğunu hər dəfə eyni şəkildə deməli idi, lakin iki sayt eyni şəxsi uyğunlaşdıra bilməməli idi. Beş üsul ölçülüb-biçildi: cüzdanın təsadüfi sirri (telefon dəyişdikdə hesablar itir), passkey (şəxsiyyət daşımır), sənəd verənin sayt üzrə identifikator yaratması (hansı sayta daxil olunduğunu öyrənir), şəxsiyyətdən törədilən toxum və sıfır bilik sübutu ilə törətmə. Bu gün dördüncüsü tətbiq edilir; beşincisi hədəfdir. Qiyməti şəxsiyyət xidmətinin toxum açarını və şəxsin şəxsiyyət nömrəsini birlikdə istifadə edərək psevdonimi nəzəri olaraq törədə bilməsidir (Bölmə 15.3).

#{strong[9\. Sıfır bilik sübutu və qısaömürlü nüsxələr (ADR-0032, ADR-0044).]} Qurum ilə yoxlayan tərəf eyni sənədin imzasını müqayisə edərək şəxsi uyğunlaşdıra bilər. Sənədi dəyişmədən onun haqqında sübut yaratmaq bu əlaqəni qırır; ilk predikat yaş həddidir. Lakin sübut ləğv siyahısındakı mövqeyi də gizlətdiyi üçün ləğv təqdimatda yoxlanıla bilmir. Ləğv siyahılı sübut və uzunömürlü nüsxə rədd edildi; ZK təqdimatı ən çox 24 saat etibarlı, səssizcə yenilənən nüsxələrlə aparılır. Qiyməti ləğvin ZK təqdimatında ən gec 24 saata qüvvəyə minməsi və nüsxə yeniləməsinin şəxsiyyət xidmətində aktivlik izi qoymasıdır (Bölmə 15.4).

#{strong[10\. Aİ-nin yolu: WIA və KA, HAIP \[32\], qeydiyyat sertifikatı, təhlükəsiz defolt dəyərlər (ADR-0025, ADR-0034, ADR-0026, ADR-0056).]} Bu dörd qərar eyni prinsipin tətbiqidir: Aİ-nin seçdiyi həll varkən şəbəkəyə xas həll yazılmır. Tək və 30 gün etibarlı cüzdan sübutu əvəzinə Aİ-nin 24 saatdan qısaömürlü və hər əməliyyatda yeni açarlı WIA-sı və açar attestasiyası qəbul edildi. Yoxlayan tərəfin müştəri identifikatoru HAIP-in tələb etdiyi kimi giriş sertifikatının hash-i oldu. Qeydiyyat sertifikatı yaratmamaq Aİ-də ixtiyari idi, lakin Aİ cüzdanlarının Tamga yoxlayan tərəflərinin əhatəsini bilə bilməsi üçün onu yaratmaq seçildi. Paketlərdə yoxlamanı keçən yumşaq defolt dəyərlər də ləğv edildi; keçmək artıq koda açıq yazılmalı olan dəyərdir. Qiyməti inteqratorların hər versiyada daha sərt qaydalara uyğunlaşmasıdır (Bölmə 7.5, 10.1, 13.3, 16.4).

Şəkil 34 bu qərarları və onların arasındakı "əsaslanır" və "dəyişdirir" əlaqələrini mövzulara görə göstərir.

#sekil(34, [Qərarlar xəritəsi: böyük qərarlar və onların arasındakı əlaqələr], "figures/wp-az/sekil-34.svg", yarim: false)

== Bütün qərarlar

Aşağıdakı yeddi cədvəl qüvvədə olan bütün qərarları mövzularına görə sıralayır: etibar və siyahılar (Cədvəl 39), sənəd və sxem (Cədvəl 40), protokol (Cədvəl 41), cüzdan (Cədvəl 42), şəxsiyyət (Cədvəl 43), məxfilik (Cədvəl 44), həmçinin idarəetmə, mövqeləndirmə və reyestr (Cədvəl 45). Hər sətir qərarı bir cümlə ilə, onun əsaslandırmasını və qərar qeydində kənarda qoyulan əsas variantı verir. Əsaslandırma və variant sütunları qərar qeydlərinin "Kontekst" və "Nəzərdən keçirilən variantlar" bölmələrindən ümumiləşdirilib; qərar qeydi variantı açıq müzakirə etmirsə, sütunda yalnız qeydin öz müqayisəsi yazılır.

#tablo([#{strong[Cədvəl 39.]} Etibar və siyahı qərarları.], (48fr, 45fr, 41fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0004.]} Qurum şəxsiyyəti X.509; şəxsə qlobal identifikator yoxdur], [Qurumlar onsuz da sertifikatlıdır; qanunvericilikdə qarşılığı var], [Şəbəkəyə xas DID qurum profili],),
  ([#{strong[ADR-0015.]} Vahid etibar interfeysi (#{raw("TrustSource")}), cüzdan daxil], [Eyni qayda iki dəfə yazılmır; reyestrə keçiddə interfeys sabit qalır], [Cüzdanda ayrıca yoxlama; hər sualı şəbəkənin serverinə vermək],),
  ([#{strong[ADR-0024.]} Qeydlərdə Aİ-nin ortaq qeydiyyat məlumatları dəsti], [Təsdiq ekranı, silmə və şikayət bu məlumatlara əsaslanır], [Köhnə dar qeyd],),
  ([#{strong[ADR-0026.]} Qeydiyyat sertifikatı (ETSI TS 119 475)], [Cüzdan yoxlayan tərəfin əhatəsini yoxlaya bilsin], [Qeydiyyat sertifikatı yaratmamaq; yoxlayan tərəf üzrə tək sertifikat],),
  ([#{strong[ADR-0036.]} Xarici siyahılarla federasiya: ünvan, sabit imzalayan, əhatə, razılıq], [Dövlət siyahılarını və Aİ növlərini tanıya bilmək], [Xarici qeydləri öz siyahısına köçürmək],),
  ([#{strong[ADR-0046.]} Daxili açıqlama siyasəti (Aİ ARF Mövzu 43)], [Qurumun paylaşma qaydası; son qərar şəxsdədir], [Qaydanı sənədin içinə yerləşdirmək; keçidlə yükləmək],),
  ([#{strong[ADR-0050.]} Qurum sertifikatı profili ETSI TS 119 412-6], [Qeydlə uyğun gələn qurum nömrəsi sertifikatdadır], [Nömrəni yalnız siyahıda saxlamaq],),
  ([#{strong[ADR-0058.]} Giriş sertifikatı ETSI TS 119 411-8; şəxsiyyət xidmətinin sertifikatı fonda təhvildə yenilənir], [ETSI profili; birdəfəlik yenidən alma], [Şəxsiyyət xidmətinin sertifikatını dərhal dəyişmək],),
  ([#{strong[ADR-0066.]} ETSI TS 119 612 XML görünüşü, eyni mənbədən və eyni versiya ilə], [Aİ və üçüncü ölkə alətləri XML tələb edir], [Ayrıca qeydiyyat reyestrindən XML; "kvalifikasiyalı" ETSI ünvanları],),
  ([#{strong[ADR-0068.]} Qeydiyyat sertifikatı siyasəti və 1 bitlik status siyahısı], [Sertifikatın geri alına bilməsi], [Statussuz sertifikat],),
))

#tablo([#{strong[Cədvəl 40.]} Sənəd və sxem qərarları.], (48fr, 42fr, 38fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0006.]} SD-JWT VC əsasdır; OpenID4VCI və OpenID4VP; ES256; istisnasız cihaz bağlılığı], [Aİ-nin əsas steki; bağlılıq olmadan sənəd başqasına keçir], [JSON-LD əsaslı format (əsaslandırmada müqayisə edilir)],),
  ([#{strong[ADR-0007.]} Sxem kataloqu zəncirdən kənarda, bütövlük hash-i məcburi, versiyalı], [Yoxlayan tərəf təsvirin dəyişdiyini anlamalıdır], [Sxemin tamamını zəncirdə saxlamaq; sərbəst #{raw("vct")}],),
  ([#{strong[ADR-0010.]} #{raw("vct")} URN-dir, kataloqdan həll edilir; kateqoriya siqnalı], [Növ identifikatoru domen adına bağlanmamalıdır], [#{raw("vct")} sabit HTTPS ünvanı kimi],),
  ([#{strong[ADR-0013.]} Şəxsiyyət sənədi əlavə olaraq mdoc], [Brauzer və yaxın məsafə mdoc tələb edir; Aİ PID presedenti], [Yalnız SD-JWT VC; tamamilə mdoc],),
  ([#{strong[ADR-0014.]} Qurum siniflərinə yalnız tədbir sinfi əlavə edilir], [Real istifadə gəlmədən sinif açılmır], [Nəqliyyat və əlaqə siniflərini də əlavə etmək],),
  ([#{strong[ADR-0021.]} E-poçt və telefon sənədləri; ünvan saxlanmır], [Təsdiqlənmiş əlaqə ehtiyacı], [Ünvanı şəxsiyyət sənədinə əlavə etmək; ikisi bir sənəddə],),
  ([#{strong[ADR-0029.]} İnkişaf mərhələsində sxemlər yerində düzəldilir], [Bu mərhələdə geriyə uyğunluq yükü daşınmır], [Hər düzəlişdə yeni versiya],),
  ([#{strong[ADR-0039.]} Sürücülük vəsiqəsi məlumatı (rəsmi sənəd deyil, mDL deyil)], [Təsdiqlənmiş məlumat ehtiyacı; rəsmi sənədlə qarışmasın], [Rəsmi mDL sənəd növü ilə vermək; məlumatı şəxsiyyət sənədinə əlavə etmək],),
  ([#{strong[ADR-0045.]} Şəxsiyyət sahələri Aİ PID kodlaşdırması ilə], [İcra Reqlamenti 2026\/1731 ilə uyğunlaşma], [Köhnə sahə adları],),
  ([#{strong[ADR-0064.]} #{raw("age_over_15")} əlavə edilir; yaş hədləri qapalı toplu], [15 yaş həddi ehtiyacı (hüquqi rəy deyil)], [Yalnız 18; açıq toplu],),
))

#tablo([#{strong[Cədvəl 41.]} Protokol qərarları.], (48fr, 30fr, 29fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0012.]} Yaxın məsafə üçün körpü yollar; hədəf ISO\/IEC 18013-5], [Bluetooth cihazda hazır olana qədər], [ISO\/IEC 18013-5-i dərhal etmək; tam sənədi QR-a qoymaq],),
  ([#{strong[ADR-0016.]} Host edilən sənəd verməyə icarəçiyə bağlı, əhatəli çıxış], [Qurum öz serverindən çağıra bilsin], [Tək paylaşılan administrator açarı],),
  ([#{strong[ADR-0017.]} Yoxlama nəticəsinə yalnız imzalı bəyanla və tək oxuma ilə çıxış], [Nəticə ünvanı hamıya açıq idi], [İdentifikatoru bilən hər kəsə cavab],),
  ([#{strong[ADR-0034.]} HAIP 1.0: #{raw("x509_hash")} müştəri identifikatoru; WIA #{raw("sub")} ortaq], [HAIP tələbi; daimi qeyd #{raw("dns_name")}], [#{raw("x509_san_dns")}-də qalmaq; iki prefiksi birlikdə qəbul etmək],),
  ([#{strong[ADR-0048.]} Şəxsiyyət növlərində dayandırma yoxdur; mdoc üçün CWT siyahısı], [Aİ PID qaydası], [Şəxsiyyətdə dayandırma],),
  ([#{strong[ADR-0056.]} Paket API-lərində təhlükəsiz defolt dəyərlər], [Yoxlamanı keçən defolt olmasın], [Yumşaq defolt və xəbərdarlıq],),
  ([#{strong[ADR-0059.]} Bir giriş tokeni ilə bir neçə sənəd sorğusu (ən çox 10 nüsxə)], [OpenID4VCI 1.0 və Aİ istinadı], [Birdəfəlik token],),
  ([#{strong[ADR-0060.]} Yeniləmə tokeni müştəri nüsxəsi açarına bağlıdır], [Attestasiya profili; DPoP açarı dəyişə bilər], [DPoP açarına bağlılıq],),
  ([#{strong[ADR-0062.]} ZK nüsxəsi yeniləmə tokeni yalnız əhatəsi istənildikdə], [Əhatə prinsipi (RFC 6749 \[19\] §6)], [Hər şəxsiyyət icazəsində vermək],),
  ([#{strong[ADR-0065.]} Qapı terminalı özünü terminal açarı ilə təqdim edir], [QR-ı görən bileti xərcləyə bilməsin], [İdentifikasiyasız uc],),
  ([#{strong[ADR-0067.]} Sorğu obyektinin hər çəkilişi ayrıca qoldur], [Saxta imtina hücumu], [Tək sorğu obyekti],),
  ([#{strong[ADR-0069.]} Qapı qrupları siyahıdadır; terminal açarı qurum adındandır], [Qurum yalnız öz qapılarını idarə etsin], [Operator miqyaslı açar],),
))

#tablo([#{strong[Cədvəl 42.]} Cüzdan qərarları.], (48fr, 31fr, 33fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0023.]} Nüsxələr səssizcə yenilənir], [Nüsxələr tükənir; Aİ qaydaları], [Hər yeniləmədə şəxsdən soruşmaq],),
  ([#{strong[ADR-0025.]} WIA (24 saatdan qısa) və açar attestasiyası, Aİ TS3 modeli], [Əlaqələndirilməzlik; Aİ modeli], [Tək, 30 günlük cüzdan sübutu],),
  ([#{strong[ADR-0047.]} Vahidin ləğvi, cüzdandan kənar ləğv yolu; cihaz sübutu yalnız ən yüksək səviyyədə məcburidir], [Aİ şablonundakı açıq məsələlər], [Qurum sənədlərində zəncirvari ləğv; hər səviyyədə cihaz sübutu],),
  ([#{strong[ADR-0049.]} "Tamga Network-da siyahıdadır" yazılı göstəricisi], [Aİ etibar nişanı Aİ-dən kənarda istifadə edilə bilməz], [Aİ nişanı və ya loqo],),
))

#tablo([#{strong[Cədvəl 43.]} Şəxsiyyət qərarları.], (48fr, 44fr, 29fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0005.]} İki oxlu təminat (şəxs T0–T3, qurum I1–I3); dövlətsiz başlanğıc], [eIDAS təminat səviyyələri ilə uyğunlaşdırma; dövlət olmadıqda mövcud etibarı mənimsəmək], [Etibarı tək rəqəmlə ölçmək],),
  ([#{strong[ADR-0011.]} PID olmadıqda müvəqqəti şəxsiyyət sənədi provayderi (PID deyil)], [Şəxsiyyətin bir yerdə yoxlanılması; qurumların uyğunlaşdıra bilməsi], [Hər qurumda ayrıca yoxlama; şəxsiyyət nömrəsiz sənəd],),
  ([#{strong[ADR-0020.]} Səlahiyyətli mənbə qurumdadır; şəbəkə şəxs qeydi saxlamır], [Məlumat mənbəyində qalır], [Şəxs qeydini şəbəkədə saxlamaq],),
  ([#{strong[ADR-0022.]} Şəxsiyyət xidməti kvalifikasiyalı deyil, I2], ["Kvalifikasiyalı" müstəqil qiymətləndirmə tələb edir], [Kvalifikasiyalı sinif və ya I3],),
  ([#{strong[ADR-0033.]} Mağaza baxışı üçün birdəfəlik kod], [Real şəxsiyyətsiz baxış; hər cüzdana bərabər], [Tətbiqdə daimi sınaq rejimi],),
  ([#{strong[ADR-0043.]} Yaş həddi yoxdur], [eIDAS 2.0 minimal yaş nəzərdə tutmur], [Yaş həddi qoymaq],),
  ([#{strong[ADR-0057.]} Host edilən vermədə qurum açarı qurumdadır (CSC API v2)], [Açar operatorda qala bilməz], [Açarı xidmətdə faylda saxlamaq],),
))

#tablo([#{strong[Cədvəl 44.]} Məxfilik qərarları.], (48fr, 32fr, 34fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0008.]} Ləğv bit massivi zəncirdən kənarda, imzalı siyahıda], [Ləğv anı qovşaqlara sızmasın], [Bit massivini zəncirdə saxlamaq],),
  ([#{strong[ADR-0027.]} Jurnal yalnız şəxsin başlatdığı şifrəli ixracla çıxır], [Aİ TS10 tələbi və cihazda qalma prinsipi], [Jurnalın heç çıxmaması],),
  ([#{strong[ADR-0031.]} Sayt üzrə psevdonim; şəxsiyyətdən törədilən toxum], [Saytlar uyğunlaşdıra bilmir; yeni telefonda eyni hesab], [Cüzdanın təsadüfi sirri; sənəd verənin yaratdığı identifikator],),
  ([#{strong[ADR-0032.]} Longfellow ZK ilə mdoc təqdimatı; ilk predikat yaş], [Sənəd dəyişmədən əlaqələndirilə bilməyən sübut], [Yalnız toplu nüsxə (ehtiyat kimi qaldı)],),
  ([#{strong[ADR-0044.]} ZK təqdimatı ən çox 24 saatlıq nüsxələrlə], [ZK-da ləğv yoxlanıla bilmir], [Ləğv siyahılı ZK; uzunömürlü nüsxə],),
  ([#{strong[ADR-0061.]} Psevdonim toxumu ayrıca sənəd konfiqurasiyası kimi], [Standarta uyğunluq], [Standartdan kənar cavab sahəsi],),
))

#tablo([#{strong[Cədvəl 45.]} İdarəetmə, mövqeləndirmə və reyestr qərarları.], (48fr, 36fr, 34fr), ([Qərar], [Əsaslandırma], [Kənarda qoyulan variant],), (
  ([#{strong[ADR-0001.]} Reyestr gələrsə, Hyperledger Besu və QBFT], [İcazəli, bərabər səs, dərhal yekunluq; Aİ presedenti], [Cosmos SDK; sıfırdan konsensus; açıq zəncir],),
  ([#{strong[ADR-0002.]} Suverenlik prioritetli üç qatlı idarəetmə], [Hər dövlət öz qeydiyyatının yeganə müəllifidir; çıxış hüququ], [Təsisçi konsorsium və ortaq səsvermə],),
  ([#{strong[ADR-0009.]} Zəncirsiz başlanğıc; zəncir ən azı iki müstəqil operatorla], [Tək operatorun zənciri etibar yaratmır], [Zənciri gözləmək; tək operatorlu inkişaf zənciri],),
  ([#{strong[ADR-0018.]} Sənədlərin üç qapısı; türkcə mənbə, ingiliscə rəsmi tərcümə], [Oxucuya görə bölgü; Aİ quruluşu], [Bütün sənədləri bir saytda toplamaq],),
  ([#{strong[ADR-0019.]} Qurum Konsolu və verilənlər bazası], [Qurum işləri bir yerdə; şəxs cüzdandan istəyir], [Tələbə portalı və fayl əsaslı qeyd],),
  ([#{strong[ADR-0030.]} Məhsul adları], [Ardıcıl ad], [Köhnə məhsul adı],),
  ([#{strong[ADR-0035.]} Üç qatlı mövqeləndirmə], [Hər qat təkbaşına dəyər daşıyır], [Yalnız Aİ ilə uyğun cüzdan; əvvəlcə ağır qurum],),
  ([#{strong[ADR-0037.]} Şəbəkə yalnız şəbəkədir; kommersiya xidmətləri kənardadır], [Neytrallıq; təhvil verilə bilmə], [Xidmətlərin şəbəkə daxilində qalması],),
  ([#{strong[ADR-0038.]} Ayrıca sandbox test şəbəkəsi], [Real şəbəkədən tam ayrılıq], [Real şəbəkədə test qurumları],),
  ([#{strong[ADR-0040.]} Sandbox-da limitli real şəxsiyyət yoxlaması yolu], [Real axının sınana bilməsi], [Yalnız saxta şəxs],),
  ([#{strong[ADR-0041.]} Sandbox-da qurum test hesabları], [Qurumların özləri sınaya bilməsi], [Konsolsuz sandbox],),
  ([#{strong[ADR-0042.]} Şəbəkə cüzdan idarə etmir, siyahıya alır], [Aİ-nin rol bölgüsü; neytrallıq], [Şəbəkənin bir cüzdanın provayderini idarə etməsi; ayrıca cüzdan sandbox-ı],),
  ([#{strong[ADR-0051.]} Zəncir imzalı siyahıların proyeksiyasıdır], [Mənbə təkdir; yoxlama zəncirdən asılı deyil], [Zəncirin mənbə olması],),
  ([#{strong[ADR-0052.]} Besu yerli icazələndirməsi], [Besu 25.6.0 zəncirüstü icazəni çıxardı], [Zəncirüstü icazə müqaviləsi],),
  ([#{strong[ADR-0053.]} Siyahı lövbərində rəqib namizədlər], [İlk yazan kilidləyə bilməsin], [İlk yazanın dəyəri kilidləyir],),
  ([#{strong[ADR-0054.]} Sxem ad sahəsi, dövlətlərarası bağlantı, kvota əhatəsi], [Adın zəbt edilməsi və kvotadan yayınma olmasın], [Ad ayırma; sxem identifikatoruna dövlət kodu qatmaq],),
  ([#{strong[ADR-0055.]} Yeniləmədə 7 gün gözləmə; növü müəyyən qeydiyyat təklifləri], [Razı olmayan dövlətin çıxış hüququ], [Dərhal tətbiq; ümumi çağırış təklifi],),
  ([#{strong[ADR-0063.]} Zəncirdəki ləğv qeydi siyahının bit sayını qəbul edir], [Proyeksiya prinsipi], [Sabit 2 bit],),
  ([#{strong[ADR-0070.]} Fond qurulana qədər müvəqqəti operator; siyahıda ad "Tamga Network"], [Şəbəkənin hüquqi şəxsiyyəti yoxdur; təhvil bir nöqtədən], [Siyahıda operator şirkətin adı; hüquqi şəxs tələb edən işləri gözləmək],),
  ([#{strong[ADR-0071.]} Müvəqqəti dövrdə iştirakçıdan haqq alınmır], [Neytrallıq; maliyyə töhfəsi qeydiyyata təsir etmir], [Qurumdan illik haqq],),
  ([#{strong[ADR-0072.]} Dəyər qatı dayandırılıb, tədqiqat istiqamətidir], [Şəbəkə token və ödəniş emal etmir; zəncir yalnız proyeksiyadır], [ADR-0003 qarmaqlarını məcburi saxlamaq],),
))

== Dəyişən qərarlar

Qərarlar silsiləsinin dürüstlüyü dəyişən qərarlarını gizlətməməsindən bilinir. Tamga-nın qərar qeydlərində altı dəyişiklik xüsusilə ibrətamizdir; hər biri yeni məlumatın, standartın və ya yoxlamanın nəticəsidir.

Birincisi dəyər qatıdır. Şəbəkənin erkən dizaynında mümkün reyestrin gələcəkdə dəyər köçürməsi daşıya bilməsi üçün beş məcburi qayda qoyulmuşdu (ADR-0003). ADR-0072 bu qaydaları məcburi olmaqdan çıxardı və tədqiqat istiqaməti kimi dayandırdı; ADR-0003 bu gün "əvəz olundu" statusundadır. İkincisi sənəd növünün identifikatorudur. İlk dizayn növü sabit HTTPS ünvanı ilə müəyyən edirdi; çoxdövlətli şəbəkədə növ identifikatorunun tək domen adına bağlı qala bilməyəcəyi görüldükdə identifikator URN oldu və təsvir kataloqdan həll edilən hala gəldi (ADR-0010). Üçüncüsü cüzdan sübutudur: tək və 30 gün etibarlı sübut Aİ-nin texniki spesifikasiyası dərc edildikdən sonra qısaömürlü WIA və açar attestasiyası ilə əvəz edildi (ADR-0025).

Dördüncüsü əməliyyat jurnalıdır. Cüzdan qaydaları jurnalın cihazdan heç çıxmamasını tələb edirdi; Aİ isə şəxsin jurnalını ixrac edə bilməsini məcburi edir. Qayda jurnalın yalnız şəxsin özünün başlatdığı və öz parolu ilə şifrələdiyi ixracda çıxa biləcəyi şəkildə daraldıldı (ADR-0027). Beşincisi dayandırmadır: şəxsiyyət xidmətinin sənədlərində dayandırma var idi, Aİ-nin şəxsiyyət məlumatı qaydasına uyğunlaşdırılarkən ləğv edildi (ADR-0048). Altıncısı yeniləmə tokeninin bağlılığıdır. Token əvvəlcə DPoP \[20\] açarına bağlı idi; uyğunluq işində DPoP açarının dəyişə biləcəyi və standartın bağlılığı müştəri nüsxəsinin açarına qurduğu görüldükdə qayda dəyişdi (ADR-0060).

Bu dəyişikliklərin ortaq cəhəti var: heç biri səssiz deyil. Hər biri köhnə qeydi yerində saxlayır, nəyi dəyişdiyini yazır və təsirə məruz qalan spesifikasiyanı eyni iş çərçivəsində yeniləyir.

= Status, Yol Xəritəsi və Açıq Qərarlar

Etibar şəbəkəsinin hansı funksiyanı bu gün təqdim etdiyini, hansını isə yalnız qərara aldığını açıq deməsi ondan istifadə edəcək tərəflərin ilk ehtiyacıdır. Bu bölmə sənəd boyu səpələnmiş şəkildə verilən status etiketlərini bir cədvəldə toplayır, yol xəritəsini mərhələlər və şərtlər kimi verir, təklif statusundakı qərarı və açıq qərarları sadalayır. Tarix verilmir, çünki mərhələlərin hər biri şəbəkənin öz əlində olmayan şərtlərə, müstəqil operatorların, qurumların və dövlətlərin qərarlarına bağlıdır.

== Bu gün nə işləyir

Cədvəl 46 funksiyaları üç status etiketinə görə sıralayır. Etiketlərin mənası oxuma bələdçisindəki kimidir: #{strong[işləyir]} real şəbəkədə və ya sandbox-da canlı deməkdir, #{strong[planlaşdırılıb]} qərara bağlı, lakin canlı olmayan, #{strong[tədqiqat]} isə qərarı olmayan və ya dayandırılmış funksiyadır. Cədvəl bu nəşrin hazırlandığı tarixə görədir və əsas çərçivə sənədinin funksiya statusu cədvəli ilə birlikdə yenilənir (FW-ARF-0001 §2.8).

#tablo([#{strong[Cədvəl 46.]} Funksiyaların statusu.], (36fr, 18fr, 24fr, 15fr), ([Funksiya], [Status], [Qeyd], [Bölmə​​​​​​​],), (
  ([İmzalı etibar siyahıları, siyahıların siyahısı, lövbər jurnalı, arxiv], [İşləyir], [real şəbəkə və sandbox], [6],),
  ([Sənəd növləri kataloqu], [İşləyir], [dəyişməz fayllar, bütövlük hash-i], [8\.4],),
  ([Qurumun və cüzdanın başlatdığı sənəd vermə], [İşləyir], [host edilən xidmətdə iki yol], [9],),
  ([Məsafədən göstərmə, Tamga Verify, yoxlama xətti], [İşləyir], [üç dəyərli nəticə], [10, 11],),
  ([Ləğv siyahıları (JWT; mdoc üçün CWT)], [İşləyir], [sabit intervallı dərc], [12],),
  ([Vebsaytlara giriş və sayt üzrə psevdonim], [İşləyir], [], [10\.7, 15.3],),
  ([Bilet və birdəfəlik qapı keçidi], [İşləyir (sandbox)], [real şəbəkədə müəyyən edilmiş qapı siyasəti yoxdur], [10\.9],),
  ([Məlumatın silinməsi, tarixçə, ixrac], [İşləyir], [], [13\.5],),
  ([Müvəqqəti şəxsiyyət xidməti və şəxsiyyət sənədi], [İşləyir], [real şəbəkədə yeganə aktiv sənəd verən], [14],),
  ([E-poçt sənədi], [İşləyir], [], [14\.6],),
  ([Qeydiyyat sertifikatları, siyasət sahələri və status siyahısı], [İşləyir], [], [7\.5],),
  ([Xarici siyahılarla federasiya mexanizmi], [İşləyir], [bu gün siyahıda xarici siyahı yoxdur], [6\.9],),
  ([Cüzdan provayderinin qeydi], [İşləyir], [siyahıya daxil olan ilk cüzdan, real şəbəkə və sandbox], [5\.4],),
  ([Sıfır bilik sübutu, yoxlayan tərəf hissəsi], [İşləyir], [], [15\.4],),
  ([Sandbox], [İşləyir], [hamıya açıq; şəxsiyyət yoxlaması limitlidir], [17\.1],),
  ([Açıq paketlər], [İşləyir], [npm-də 0.8.2 sınaq versiyası, Apache-2.0], [17\.2],),
  ([ETSI TS 119 612 XML görünüşü], [Sandbox-da işləyir], [real şəbəkədə planlaşdırılıb], [6\.8],),
  ([ETSI TS 119 602 görünüşlərinin dərci], [Planlaşdırılıb], [generator hazırdır], [6\.8],),
  ([İkinci siyahı imza sertifikatı və aparat açar anbarı], [Planlaşdırılıb], [spesifikasiyada açıq iş], [6\.3],),
  ([Bluetooth ilə yaxın məsafə (ISO\/IEC 18013-5)], [Planlaşdırılıb], [kodlaşdırılıb, cihaz testini gözləyir], [10\.8],),
  ([Brauzerdən göstərmə, cüzdan hissəsi], [Planlaşdırılıb], [yoxlayan tərəf hazırdır], [10\.6],),
  ([Sıfır bilik sübutu, cüzdan hissəsi], [Planlaşdırılıb], [cihaz testi yoxdur], [15\.4],),
  ([Aparat açarları və cihaz sübutu], [Planlaşdırılıb], [kodlaşdırılıb, cihaz testini gözləyir], [13\.2],),
  ([Məsafədən imzanın real şəbəkədə ilk istifadəsi], [Planlaşdırılıb], [kod və testlər hazırdır], [7\.6],),
  ([Telefon sənədi üçün real SMS göndərilməsi], [Planlaşdırılıb], [], [14\.6],),
  ([Sürücülük vəsiqəsi məlumatının real şəxslərə açılması], [Planlaşdırılıb], [hüquqi araşdırmadan sonra; bu gün sandbox-da], [14\.6],),
  ([Mağaza baxışı kodu], [Planlaşdırılıb], [kod hazırdır; sınaq imzalayanının siyahı qeydi gözlənilir], [14\.8],),
  ([Şəxsiyyət xidmətinin I3-ə yüksəldilməsi], [Planlaşdırılıb], [müstəqil qiymətləndirmədən sonra, yeni qərarla], [14\.4],),
  ([Giriş sertifikatında siyasət identifikatoru], [Planlaşdırılıb], [sertifikat tətbiqi bəyannaməsi dərc edildikdə], [7\.4],),
  ([Sertifikatlı və oflayn qapı identifikasiyası], [Planlaşdırılıb], [sahə və oxuyucu hazırdır], [10\.9],),
  ([OpenID yoxlayan tərəf planının yenidən icrası; cüzdan planları], [Planlaşdırılıb], [], [20\.5],),
  ([Ortaq reyestr], [Planlaşdırılıb], [kod hazırdır, istehsalatda yoxdur və söndürülüb], [19],),
  ([Fond, şura və siyahıların təhvili], [Planlaşdırılıb], [], [18\.4],),
  ([Aİ birgə işləmə tədbirlərində iştirak], [Planlaşdırılıb], [], [20\.5],),
  ([Sıfır bilik sübutu ilə psevdonim törətmə], [Tədqiqat], [], [15\.3],),
  ([Kriptoqrafik akkumulyator və ya sıfır biliklə ləğv], [Tədqiqat], [təxirə salınıb], [12\.2],),
  ([Kvantdan sonrakı alqoritmlərə keçid], [Tədqiqat], [qərar yoxdur], [23\.3],),
  ([Dəyər qatı], [Tədqiqat], [dayandırılıb; token, koin və ödəniş yoxdur], [19\.9],),
))

Cədvəlin oxunması ilə bağlı bir qeyd əlavə edək. "İşləyir" etiketi funksiyanın mənbə ilə göstərilə bildiyini deyir; hər hansı qurumun real şəbəkədə bu funksiyadan istifadə etdiyini demir. Real şəbəkənin Türkiyə siyahısında bu gün yeganə aktiv sənəd verən şəbəkənin müvəqqəti şəxsiyyət xidmətidir; qurum sənədləri ilk qurumlar qoşulduqca eyni yolla veriləcək.

== Yol xəritəsi

Yol xəritəsi altı addımdan ibarətdir. Hər addım bir şərtə bağlıdır və heç bir addım əvvəlki addımda qurulan identifikatorları dəyişmir (Cədvəl 47). İlk dörd addımın idarəetmə tərəfi Bölmə 18.3-də, reyestr tərəfi Bölmə 19.8-də izah edildi; Şəkil 30 eyni yolu idarəetmə mərhələləri kimi göstərir.

#tablo([#{strong[Cədvəl 47.]} Yol xəritəsinin addımları: şərt, nə dəyişir, nə dəyişmir.], (16fr, 34fr, 48fr, 38fr), ([Addım], [Şərt], [Nə dəyişir], [Nə dəyişmir],), (
  ([1\. Siyahı mərhələsi (bu gün)], [], [imzalı siyahılar və lövbər jurnalı; sandbox; paketlər sınaq versiyasında; OpenID öz-sınağı], [],),
  ([2\. Hazırlıq], [siyahıdakı cüzdanların mağaza versiyaları və cihaz testləri], [cihaz sübutu, Bluetooth və brauzer yolları canlıya keçir; ilk qurumlar real şəbəkəyə qoşulur], [sənəd növləri, kök və qurum identifikatorları],),
  ([3\. Fond], [fondun hüquqi şəxs statusu qazanması], [operatorluq fonda keçir; real şəbəkədə XML siyahı; şəxsiyyət xidmətinin sertifikatı yenilənir], [siyahı operatorunun adı, kökün identifikatoru, sənəd növləri, verilmiş sənədlər],),
  ([4\. Reyestr], [ən azı iki müstəqil operatorun yazılı razılığı və ekvivalentlik testləri], [siyahıların hash-i reyestrə də yazılır], [imzalı siyahılar mənbə olaraq qalır; yoxlama xətti],),
  ([5\. Dövlətin qoşulması], [dövlətin öz siyahısını dərc etməsi], [şura qurulur; PID yeri dolur; müvəqqəti rollar təhvil verilir], [qurum identifikatorları, sənəd növləri, verilmiş sənədlər],),
  ([6\. İnstitusional genişlənmə], [şuranın müəyyən etdiyi həddlər], [yeni sektor sxemləri öz qərarları ilə əlavə edilir], [şəbəkənin prinsipləri],),
))

Cədvəlin ilk sətrində şərt və "nə dəyişmir" sütunları boşdur, çünki bu addım bu gündür. İkinci addımın qurum tərəfi şüurlu şəkildə adsız qoyulub: bu sənəd heç bir qurumla saziş və ya danışıq barədə bildiriş vermir. Beşinci addımın şərti də şəbəkənin əlində deyil; dövlətin qoşulması həmin dövlətin öz qərarıdır.

== Təklif statusundakı qərar

Qüvvədə olmayan yeganə qeyd səhiyyə sahəsindəki sənədlərlə bağlıdır (ADR-0028). Təklif səhiyyə işçiləri üçün bir-birini tamamlayan üç sənəd təsvir edir: peşə fəaliyyəti sənədi, peşə təşkilatına üzvlük sənədi və qurumun öz əməkdaşına verdiyi vəzifə sənədi. Xəstəxana işə qəbul zamanı bu sənədləri yoxlayan tərəf kimi istəyə bilər. Sənədlərdə sağlamlıq məlumatı və şəxsiyyət nömrəsi yoxdur; xəstə tərəfi əhatədən kənardır. Təklif layihə rəhbərliyinin qərarı ilə dayandırılıb: ilk sektor təhsil olduğu üçün onun üzərində işlənilmir, lakin qeyd silinmir. Səhiyyə sahəsi açılarsa, bu təklif yeni məlumatlarla yenidən qiymətləndirilir və qəbul edilərsə, öz qaydaları ilə gəlir.

== Açıq qərarlar və növbəti işlər

Qərar qeydlərinin və spesifikasiyaların "açıq məsələlər" bölmələri hələ qərarı verilməmiş sualları açıq sadalayır. Cədvəl 48 bunların hamıya açıq olanlarını müvafiq mənbə ilə birlikdə verir. Bəziləri texniki ölçmə, bəziləri hüquqi araşdırma, bəziləri isə şəbəkənin növbəti mərhələsini gözləyir.

#tablo([#{strong[Cədvəl 48.]} Açıq qərarlar.], (48fr, 48fr, 20fr), ([Sual], [Niyə açıqdır], [Mənbə],), (
  ([Cihaz dəyişdikdə sənədlərin təsdiqlənmiş ötürülməsi], [Yeni cihazda sənədlər yenidən alınır; qurum şəxsi illər sonra tanımalıdır], [FW-ARF-0001 §7.4 L4; SPEC-WALLET-0001],),
  ([Çoxlu cihaz (telefon və planşet)], [Hər cihaz ayrıca cihaz açarı və ayrıca sənəd vermə deməkdir], [SPEC-WALLET-0001],),
  ([Ən yüksək cüzdan səviyyəsinin dövlət mərhələsində necə müəyyən ediləcəyi], [Cihaz sübutu, yoxsa ayrıca aparat], [SPEC-WALLET-0001],),
  ([Azyaşlılar üçün valideyn razılığı axını], [Hüquqi araşdırma və provayderin azyaşlılar üçün şərti gözlənilir], [ADR-0043; SPEC-ID-0003],),
  ([İkinci şəxsiyyət yoxlaması provayderi], [Tək provayderdən asılılığın qarşısının alınması], [SPEC-ID-0003],),
  ([Ləğv siyahılarının toplanması məcburidirmi; çoxlu status provayderi], [Bu gün "tövsiyə olunur"; açıq yazılması lazım ola bilər], [SPEC-CRED-0003],),
  ([Yoxlayan tərəfin əhatəsinin sənəd növü identifikatorlarına bağlanması], [Hər yeni növdə hər yoxlayan tərəfin yenilənməsi problemi], [SPEC-PROTO-0002],),
  ([Cüzdan provayderi qeydlərinin reyestrdəki qarşılığı], [Reyestr mərhələsində hansı müqavilədə saxlanacağı], [SPEC-TRUST-0001],),
  ([Aİ ZK üçün başqa ləğv üsulu seçərsə], [Qısaömürlü nüsxə qərarı yenidən qiymətləndirilir], [ADR-0044],),
  ([Kök sertifikatın növbəli dəyişdirilməsində üst-üstə düşmə müddəti; aralıq sertifikat orqanı], [Təklif 12 aydır; dövlətlərin seçimindən asılıdır], [SPEC-ID-0002],),
  ([Əhatədən kənar funksiyalar: PID buraxılması, ödəniş, qurum cüzdanı, W3C VCDM təsviri, kvalifikasiyalı elektron imza], [Hər biri yalnız ayrıca qərarla açılır], [FW-ARF-0001 §1.7],),
))

= Hədlər və Açıq Suallar

Hər arxitektura bəzi riskləri aradan qaldırır, bəzilərini azaldır, bəzilərini isə bilərəkdən daşıyır. Bu bölmə üçüncü qrupa baxır: Tamga-nın bu gün bildiyi və qəbul etdiyi risklərə, hələ cavabı olmayan suallara və tədqiqat istiqamətlərinə. Bunları açıq yazmaq zəifliyin etirafından çox, öhdəlikdir. Oxucu şəbəkənin nəyə zəmanət vermədiyini bildikdə, nəyə zəmanət verdiyinə də daha çox etibar edə bilər.

== Bəyan edilmiş qalıq risklər

Əsas çərçivə sənədi beş həddi nömrə ilə sadalayır (FW-ARF-0001 §7.4). Onlara məxfilik, şəxsiyyət və istismar bölmələrində izah edilən bir neçə risk əlavə olunur. Cədvəl 49 hər birini, onun niyə bu gün mövcud olduğunu, nə ilə azaldıldığını və hansı şərtlə aradan qalxacağını verir.

#tablo([#{strong[Cədvəl 49.]} Qalıq risklər.], (48fr, 44fr, 48fr, 46fr), ([Risk], [Niyə bu gün var], [Azaldılması], [Aradan qalxma şərti],), (
  ([L1. Etibar lövbəri tək operatorun imzasına əsaslanır; operator ilə sənəd verən birlikdə hərəkət etsə, uyğunsuz qeyd dərc edilə bilər], [Siyahı mərhələsində tək imzalayan var], [hamıya açıq dəyişiklik və lövbər jurnalı, şəffaflıq hesabatı, audit], [ortaq reyestr və bir neçə müstəqil imzalayan (Bölmə 19)],),
  ([L2. Ləğv bir neçə dəqiqəyə qüvvəyə minir], [ləğv siyahısı sabit intervalla dərc edilir və əvvəlcədən yüklənir], [qısa dərc intervalı (2 dəqiqə), yoxlayan tərəfin tez-tez əvvəlcədən yükləməsi], [aradan qalxmır; şüurlu məxfilik balansıdır (Bölmə 12.5)],),
  ([L3. Eyni qurumun sənədləri fərqli yoxlayan tərəflərdə birləşdirilərsə, şəxs uyğunlaşdırıla bilər], [qurumun imzası nüsxələrdə tanınır], [hər yoxlayan tərəf üçün nüsxə, yuvarlaqlaşdırılmış vaxt], [sıfır bilik sübutunun cüzdanlara çatması (Bölmə 15.4)],),
  ([L4. Cihaz dəyişdikdə sənədlər yenidən alınır], [təsdiqlənmiş ötürmə dizaynı açıq məsələdir], [qurumdan təkrar vermə; səssiz yeniləmə], [təsdiqlənmiş ötürmə qərarı (Cədvəl 48)],),
  ([L5. ZK təqdimatında ləğv yoxlanıla bilmir], [sübut ləğv siyahısındakı mövqeyi gizlədir], [ən çox 24 saatlıq nüsxələr; ləğv edilmiş sənədin nüsxəsi yenilənmir], [Aİ-nin ZK üçün başqa ləğv üsulu seçməsi (ADR-0044)],),
  ([Psevdonim törətmənin məlum zəifliyi], [toxum şəxsiyyət xidmətində şəxsiyyətdən törədilir], [açarın qorunması və şəffaflıq; toxum saxlanmır], [sıfır bilik sübutu ilə törətmə (tədqiqat)],),
  ([ZK nüsxəsi yeniləməsinin aktivlik izi], [nüsxələr təxminən gündə bir dəfə yenilənir], [təsadüfi gecikmə; şəxsin söndürə biləcəyi avtomatik yeniləmə], [daimi həll yoxdur; hansı yoxlayan tərəfə nə göstərildiyi öyrənilmir],),
  ([Məsafədən şəxsiyyət yoxlamasında saxta üz və müdaxilə hücumları; tək provayderdən asılılıq], [yoxlama məsafədən şəxsiyyət yoxlaması provayderinə əsaslanır], [canlılıq və üz uyğunlaşdırması; sənəddə portret yoxdur; ən yüksək səviyyə məsafədən üzlə verilmir], [dövlətin PID-i; ikinci provayder (Cədvəl 48)],),
  ([Tək siyahı imza sertifikatı], [ikinci növbəli sertifikat hələ işə salınmayıb], [30 gün əvvəlcədən elan edilən açar dəyişikliyi qaydası], [ikinci sertifikat və aparat açar anbarı (Bölmə 6.3)],),
  ([Azyaşlıların şəxsiyyət yoxlaması], [yaş həddi yoxdur; valideyn razılığı axını müəyyən edilməyib], [provayderin şərti təsdiq gözləyir], [valideyn razılığı qərarı (Cədvəl 48)],),
  ([Oflayn telefonda müddəti bitməmiş sənəd], [ləğv şəbəkəyə qoşulmayan cihaza çatmır], [vahidin ləğvi, qısa etibarlılıq, yoxlayan tərəfin ləğv yoxlaması], [aradan qalxmır; qısa ömürlə məhdudlaşdırılır],),
))

İlk sətir ayrıca vurğulanmağa layiqdir, çünki şəbəkənin bugünkü etibar modelinin həddini ən aydın şəkildə o çəkir. Dərc edilən siyahılar hər kəsin yükləyə bildiyi, versiyaları bir-birinə bağlı və hər dəyişikliyi jurnala yazılan fayllardır; uyğunsuz qeyd gizlədilə bilməz, lakin dərc edilə bilər. Bu həddi aradan qaldıracaq olan çoximzalı quruluşdur və o quruluş yalnız müstəqil tərəflər qoşulduqda qurulur.

== Hələ cavabı olmayan suallar

Bəzi suallar qərar qeydinin açıq məsələsi olmaqdan kənara çıxır və şəbəkənin uzunmüddətli formasına təsir edir. Onlardan dördünü ayrıca qeyd edirik.

Birincisi sənədin cihazla bağlılığıdır. Cihaz bağlılığı sənədin kopyalanmasının qarşısını alır, lakin eyni şəxsin telefon dəyişməsini də çətinləşdirir. Məzun on il sonra telefonunu dəyişdikdə universitet onu hələ də tanımalıdır. Təsdiqlənmiş ötürmə və çoxlu cihaz təhlükəsizlik ilə istifadə rahatlığı arasındakı bu balansın hələ qurulmamış iki hissəsidir.

İkincisi yoxlayan tərəfin əhatəsidir. Bu gün yoxlayan tərəfin hansı sahələri istəyə biləcəyi qeydiyyat sertifikatında yazılıb. Bu əhatənin sənəd növü identifikatorlarına sıx bağlanması yoxlamanı asanlaşdırır, lakin hər yeni sənəd növündə hər yoxlayan tərəfin qeydinin yenilənməsini tələb edir.

Üçüncüsü şəxsiyyət yoxlamasının mənbəyidir. Müvəqqəti şəxsiyyət xidməti bu gün tək məsafədən şəxsiyyət yoxlaması provayderi ilə işləyir. İkinci provayder, xüsusilə yerli mənbə, asılılığı azaldır; dövlətin şəxsiyyət məlumatı gəldikdə isə bu problemin böyük hissəsi aradan qalxır.

Dördüncüsü azyaşlılardır. eIDAS 2.0 \[2\] minimal yaş nəzərdə tutmur və Tamga da yaş həddi qoymur (ADR-0043). Lakin azyaşlı şəxsin şəxsiyyət yoxlaması üçün valideyn razılığının necə alınacağı və provayderin bu yaşdakı şəxslər üçün şərti hüquqi araşdırma gözləyən suallardır.

== Tədqiqat istiqamətləri

Üç istiqamət bu gün qərarsızdır və elə də adlandırılır. Birincisi #{strong[sıfır bilik sübutu ilə psevdonim törətmədir]}. Bugünkü psevdonim üsulu şəxsiyyət xidmətinin psevdonimi nəzəri olaraq qura bilməsinə imkan verir. Törətmənin sübutla yoxlanılması bu zəifliyi aradan qaldırır; qərar qeydi bunu hədəf kimi yazır, lakin cüzdanlarda sıfır bilik kitabxanası yetkinləşmədən tətbiq edilmir (ADR-0031).

İkincisi #{strong[kvantdan sonrakı alqoritmlərə keçiddir]}. Bugünkü imzalar elliptik əyri kriptoqrafiyasına əsaslanır. Böyük miqyaslı kvant kompüteri bu imzaları sındıra bilər; uzunömürlü sənədlər və kök sertifikatlar buna görə keçidin ən çox əhəmiyyət daşıdığı yerlərdir. Tamga-nın bu mövzuda qərarı yoxdur; mövzu Aİ-nin və standartlaşdırma təşkilatlarının seçimləri izlənərək həll ediləcək sual kimi durur. Seriyanın kvantdan sonrakı dövrü izah edən yazısı \[79\] problemin texniki fonunu verir.

Üçüncüsü #{strong[dəyər qatıdır]}. İlk dizaynda reyestrin gələcəkdə dəyər qatı daşıya bilməsi üçün qəbul edilən qərarlar artıq məcburi deyil və yalnız tədqiqat istiqaməti kimi qeyddə durur (ADR-0072). Tamga Network token və ya koin buraxmır; ödəniş, hesablaşma və ya dəyər köçürməsi emal etmir. Bu istiqamətin yenidən açılması idarəetmə orqanının qərarını, məxfilik tədqiqatını, müstəqil təhlükəsizlik yoxlamasını və yeni qərar qeydini tələb edir (Bölmə 19.9).

= Nəticə

Aynurun müraciəti ilə başlamışdıq. Bakıda aldığı diplomu İstanbuldakı işəgötürənə göstərmək üçün skan edilmiş surətlər, notarial təsdiqli tərcümələr və cavabı həftələrlə çəkən e-poçtlar lazım idi; sonda belə Timur diplomun həqiqi olduğunu sübut edə bilmirdi. Bu sənədin izah etdiyi struktur eyni səhnəni başqa yolla qurur. Universitet diplomu imzalı sənəd kimi verir, Aynur onu telefonunda daşıyır və yalnız istənilən sahələri göstərir, Timurun proqram təminatı isə imzanı, səlahiyyəti, ləğv statusunu və cihaz bağlılığını universitetə zəng etmədən yoxlayır. Universitet diplomun harada göstərildiyini öyrənmir; ortaq qeydlərin heç biri Aynuru tanımır.

Bu yolun Aynur üçün bu gün nə qədər açıq olduğunu da dürüstcə demək lazımdır. Türkiyə siyahısı aktivdir və axının tamamı işləyir; lakin Azərbaycan üçün siyahılarda yalnız yer ayrılıb. Bu, saziş və ya danışıq barədə bildiriş deyil; dövlət qoşulduqda öz siyahısını dərc edə biləcəyi boş yuvadır. Aynurun Bakıdakı universitetinin bu yolla sənəd verə bilməsi həmin yuvanın dolmasından asılıdır. Struktur bunu gözləyəcək şəkildə qurulub: yuva dolduqda yeni sahə əlavə edilmir, mövcud yer dolur.

Sənəd boyu üç seçim dəfələrlə qarşımıza çıxdı. Texniki qat Aİ-ninki ilə eynidir, çünki birgə işləmənin dəyəri heç kimin xüsusi uyğunlaşdırma yazmaq məcburiyyətində qalmamasından gəlir. Etibar bu gün imzalı siyahılardan gəlir, çünki tək operatorun zənciri imzalı siyahıdan artıq etibar yaratmır; ortaq reyestr yalnız müstəqil tərəflər onu birlikdə idarə etdikdə gəlir və o zaman da siyahıların hash-ini daşıyır. Hər dövlət öz qeydiyyatının yeganə müəllifidir və bu gün dövlət adından yerinə yetirilən hər rol heç bir sənədi və identifikatoru dəyişmədən təhvil verilə biləcək şəkildə dizayn edilib.

Yol uzundur və şərtləri şəbəkənin əlində olmayan addımlar ehtiva edir: müstəqil operatorlar, qurumlar, dövlətlər. Buna görə yol xəritəsi tarix deyil, şərt verir. Operatorlar dəyişə bilər, domen adları təhvil verilə bilər, reyestr gələ və ya gecikə bilər. Daimi olan etibar modelidir: hər kəsin yoxlaya bildiyi imzalı qeydlər, mənbəyə müraciət etmədən yoxlama və şəxsi tanımayan ortaq qeydlər.

#heading(level: 1, numbering: none)[Əlavə A — Lüğət]

Terminlər əlifba sırası ilə verilir. Orijinal termin mötərizədə göstərilir; texniki terminlər tərcümə edilmir. Təriflər şəbəkənin lüğəti (FW-DEF-0001) və seriyanın yazıları ilə uyğundur (Cədvəl 50).

#tablo([#{strong[Cədvəl 50.]} Lüğət.], (24fr, 48fr), ([Termin], [Tərif],), (
  ([Açar attestasiyası (#{emph[key attestation]}, KA)], [Cüzdan provayderinin sənədin bağlanacağı açarların cihazın təhlükəsiz aparat təminatında yaradıldığını və qorunduğunu bəyan edən imzalı sənədi.],),
  ([Açar sübutu (#{emph[proof of possession]}, #{raw("proof")})], [Cüzdanın sənəd sorğusuna əlavə etdiyi, sənədin bağlanacağı açarla imzalanmış qısa sübut (OpenID4VCI JWT proof); açarın cüzdanda olduğunu və sorğunun təzə olduğunu (#{raw("aud")}, #{raw("iat")}, #{raw("nonce")}) göstərir. Açar attestasiyası (KA) ilə qarışdırılmamalıdır: KA-nı cüzdan provayderi, sübutu isə cüzdan imzalayır.],),
  ([Ayrıca kanallı etibar lövbəri], [Siyahıların siyahısını imzalayan sertifikatın siyahılardan ayrı kanallarla dərc edilən barmaq izi.],),
  ([Cihaz bağlılığı (#{emph[key binding, holder binding]})], [Sənədin cihazın təhlükəsiz aparat təminatında yaradılmış açara bağlanması; göstərilmədə həmin açarla imza tələb olunur.],),
  ([Cihaz sübutu], [Əməliyyat sisteminin açarın təhlükəsiz zonada yaradıldığını və tətbiqin dəyişdirilmədiyini təsdiq edən imzalı bəyanı.],),
  ([Cüzdan nüsxəsi attestasiyası (#{emph[Wallet Instance Attestation]}, WIA)], [Cüzdan provayderinin cüzdan vahidi üçün imzaladığı, 24 saatdan qısa etibarlı bəyan; hər sənəd əməliyyatında yeni açarla alınır.],),
  ([Cüzdan provayderi (#{emph[wallet provider]})], [Cüzdanı təqdim edən, vahidləri qeydə alan və WIA ilə açar attestasiyasını imzalayan təşkilat.],),
  ([Cüzdan vahidi (#{emph[wallet unit]})], [Cüzdanın konkret cihazdakı quraşdırılması.],),
  ([Çəkiliş qolu], [İmzalı sorğu obyektinin hər çəkilişində açılan, öz #{raw("state")}, #{raw("nonce")} və şifrələmə açarı olan ayrıca sessiya; imtina yalnız öz qolunu bağlayır.],),
  ([Daxili açıqlama siyasəti], [Sənəd verənin sənədinin hansı yoxlayan tərəflərə göstərilə biləcəyini imzalı təqdimat sənədində yazdığı qayda; son qərar şəxsdədir.],),
  ([Dayandırma (#{emph[suspension]})], [Sənədin müvəqqəti olaraq etibarsız sayılması; yalnız sxemi icazə verən qurum sənədlərində var, şəxsiyyət növlərində yoxdur.],),
  ([DCQL], [Yoxlayan tərəfin cüzdandan hansı sənədi və hansı sahələri istədiyini yazdığı sorğu dili (#{emph[Digital Credentials Query Language]}).],),
  ([DPoP], [Giriş tokenini müştərinin açarına bağlayan və hər sorğuda bu açarla imzalanmış sübut tələb edən OAuth genişlənməsi.],),
  ([Etibar lövbəri (#{emph[trust anchor]})], [Yoxlayan tərəfin əvvəldən etibar etdiyi yeganə dəyər: siyahıların siyahısını imzalayan sertifikatın barmaq izi.],),
  ([Etibar siyahısı (#{emph[trust list]})], [Ölkənin kök sertifikatlarını, sənəd verənlərini və yoxlayan tərəflərini daşıyan imzalı siyahı.],),
  ([Əlaqələndirilməzlik (#{emph[unlinkability]})], [Fərqli yoxlayan tərəflərin eyni şəxsin təqdimatlarını bir-biri ilə uyğunlaşdıra bilməməsi.],),
  ([Federasiya], [Ölkə siyahılarının öz sahibləri tərəfindən idarə edildiyi və siyahıların siyahısında bir araya gətirildiyi model.],),
  ([Giriş sertifikatı (#{emph[access certificate]})], [Yoxlayan tərəfin sorğularını imzaladığı X.509 sertifikatı; müştəri identifikatoru bu sertifikatın hash-idir.],),
  ([HAIP], [OpenID4VCI və OpenID4VP-nin yüksək təminat tələb edən istifadələr üçün seçimlərini daraldan profil.],),
  ([HKDF], [Bir açardan başqa açarlar törədən, HMAC əsaslı açar törətmə funksiyası.],),
  ([HMAC], [Gizli açarla hesablanan, açarı bilməyənin yarada bilmədiyi hash.],),
  ([Host edilən sənəd vermə xidməti (#{emph[hosted issuer]})], [Şəbəkənin qurumlar adından idarə etdiyi sənəd vermə xidməti; imza açarı qurumda qalır.],),
  ([İlkin avtorizasiya kodu (#{emph[pre-authorized code]})], [Qurumun başlatdığı sənəd verilməsində şəxsin kimliyi əvvəlcədən məlum olduğu üçün istifadə edilən birdəfəlik kod.],),
  ([Keçid kartı], [Yaxın məsafədə daimi həll gələnə qədər istifadə edilən, qısaömürlü və fərdi məlumat daşımayan imzalı token.],),
  ([Kvalifikasiyalı olmayan atribut attestasiyası (EAA)], [Kvalifikasiyalı etibar xidməti provayderi olmayan istənilən qurumun verdiyi sənəd.],),
  ([Qeydiyyat orqanı (#{emph[registrar]})], [Sənəd verənləri, yoxlayan tərəfləri və cüzdan provayderlərini qeydə alan təşkilat; qanuni səlahiyyət vermir.],),
  ([Qeydiyyat sertifikatı (#{emph[registration certificate]})], [Qeydiyyat orqanının yoxlayan tərəfin istifadəsinin məqsədini və istəyə biləcəyi sahələri daşıyan imzalı sənədi.],),
  ([Ləğv siyahısı (#{emph[status list]})], [Sənəd verənin hər sənədin statusunu bir neçə bitlə saxladığı, imzalayıb dərc etdiyi siyahı; status siyahısı da adlanır.],),
  ([Ləğv (#{emph[revocation]})], [Sənədin daimi olaraq etibarsız sayılması.],),
  ([Lövbər jurnalı (#{emph[anchor log]})], [Ləğv siyahısı dərclərini və sənəd növü hash-lərini saatlıq imzalı sətirlərlə saxlayan, hamıya açıq jurnal.],),
  ([mdoc], [ISO\/IEC 18013-5-in müəyyən etdiyi, CBOR ilə kodlaşdırılan ikili sənəd formatı.],),
  ([Məsafədən imza], [Qurumun açarının öz imza xidmətində qaldığı, host edilən xidmətin yalnız hash göndərib imza aldığı quruluş (CSC API).],),
  ([Müvəqqəti operator (#{emph[provisional operator]})], [Fond qurulana qədər şəbəkənin xidmətlərini "Tamga Network adından" idarə edən hüquqi şəxs.],),
  ([Müvəqqəti şəxsiyyət sənədi], [PID provayderi olmadığı halda şəxsiyyət xidmətinin məsafədən şəxsiyyət yoxlaması ilə verdiyi sənəd; PID deyil.],),
  ([Nüsxə], [Eyni sənədin ayrı açarlara bağlı nümunələrindən biri; cüzdan hər yoxlayan tərəfə ayrı nüsxə göstərir.],),
  ([Ortaq reyestr (#{emph[ledger]})], [Etibar qeydlərinin hash-lərinin bir neçə müstəqil operator tərəfindən saxlanıldığı reyestr (zəncir); bu gün yoxdur.],),
  ([Ölkə siyahısı (#{raw("tl-<cc>")})], [Ölkənin kök sertifikatlarını, sənəd verənlərini, yoxlayan tərəflərini və milli sənəd növlərini daşıyan imzalı siyahı.],),
  ([PAR], [Avtorizasiya sorğusunun əvvəlcə birbaşa serverə göndərildiyi və brauzerdə yalnız istinad ünvanının daşındığı OAuth genişlənməsi.],),
  ([PID], [Şəxsiyyət məlumatı; dövlətin və ya dövlətin səlahiyyət verdiyi təşkilatın verdiyi şəxsiyyət sənədi. Tamga PID vermir.],),
  ([PKCE], [Avtorizasiya kodunun ələ keçirilməsinə qarşı müştərinin birdəfəlik yoxlama dəyərindən istifadə etdiyi OAuth genişlənməsi.],),
  ([Proyeksiya], [Ortaq reyestrin imzalı siyahıların yalnız hash-lərini daşıması; mənbə siyahılardır, ziddiyyətdə siyahı qüvvədədir.],),
  ([Psevdonim toxumu], [Şəxsiyyət xidmətinin şəxsin şəxsiyyətindən saxlamadan törətdiyi və yalnız cüzdanda qalan gizli dəyər.],),
  ([Psevdonim (#{emph[pseudonym]})], [Cüzdanın hər sayt üçün ayrıca yaratdığı, sabit, lakin saytlar arasında uyğunlaşdırıla bilməyən hesab identifikatoru.],),
  ([Reyestr mərhələsi], [Siyahı hash-lərinin bir neçə müstəqil operatorun saxladığı ortaq reyestrə də yazıldığı mərhələ.],),
  ([Sandbox], [Real şəbəkədən ayrı köklə işləyən, hamıya açıq test şəbəkəsi.],),
  ([SD-JWT VC], [Sahələri ayrı-ayrılıqda gizlədilə bilən imzalı JSON sənəd formatı.],),
  ([Seçici paylaşım (#{emph[selective disclosure]})], [Şəxsin sənəddən yalnız istənilən sahələri göstərməsi.],),
  ([Səlahiyyətli mənbə (#{emph[authentic source]})], [Sənəddəki məlumatın əsas qeydini saxlayan sistem; məsələn, universitetin tələbə məlumat sistemi.],),
  ([Sənəd növləri kataloqu], [Sənəd növlərinin təsvirlərinin və sxemlərinin dəyişməz fayllar kimi dərc edildiyi yer.],),
  ([Sənəd sahibi (#{emph[holder]})], [Sənədi cüzdanında daşıyan və onu kimə göstərəcəyinə qərar verən şəxs.],),
  ([Sənəd verən (#{emph[issuer, attestation provider]})], [Sənədi verən qurum: universitet, peşə təşkilatı, bilet satıcısı kimi.],),
  ([Sənəd (#{emph[credential, attestation]})], [Sənəd verənin şəxs haqqında imzaladığı və şəxsin cüzdanında daşınan elektron sənəd.],),
  ([Sıfır bilik sübutu (ZK)], [İfadənin doğru olduğunu, ifadənin əsaslandığı məlumatı göstərmədən sübut edən sübut.],),
  ([Sınaq imzalayanı], [Mağaza baxışı kodu ilə verilən, real ekosistemdə keçməyən sənədlərin imzalayanı.],),
  ([Siyahıların siyahısı (#{emph[List of Trusted Lists]}, LoTL)], [Ölkə siyahılarının ünvanlarını, imzalayanlarını və tanınma statuslarını göstərən imzalı siyahı.],),
  ([Terminal açarı], [Qapı terminalının yoxlama xidmətinə özünü təqdim etdiyi, qurum adından verilən açar.],),
  ([Vahid etibar interfeysi (#{raw("TrustSource")})], [Sənəd verənin, yoxlayan tərəfin və cüzdanın bütün etibar suallarını verdiyi yeganə interfeys.],),
  ([Vasitəçi yoxlayan tərəf (#{emph[intermediary]})], [Yoxlayan tərəf adından cüzdandan sənəd istəyən və onu yoxlayan xidmət; cüzdan əsas yoxlayan tərəfin adını göstərir. Tamga-da Tamga Verify.],),
  ([Yoxlama xətti], [Yoxlayan tərəfin təqdimatı yoxladığı sabit qatlar: ilkin şərt, format, növ, etibar, status, siyasət.],),
  ([Yoxlanıla bilmədi (#{emph[INDETERMINATE]})], [Yoxlamanın hökm verə bilmədiyi nəticə; "etibarsız" mənasını vermir.],),
  ([Yoxlayan tərəf (#{emph[relying party, verifier]})], [Cüzdandan sənəd istəyən və onu yoxlayan qeydiyyatlı təşkilat.],),
  ([ZK nüsxəsi], [Sıfır bilik təqdimatı üçün verilən, ən çox 24 saat etibarlı və ləğv siyahısı daşımayan qısaömürlü mdoc nüsxəsi.],),
))

#heading(level: 1, numbering: none)[Əlavə B — Qərar qeydlərinin göstəricisi]

Cədvəl 51 bütün qərar qeydlərini nömrə ardıcıllığı ilə verir. Tarix qeydin yaradıldığı tarixdir; qüvvədə olan qeydlərdə qəbul tarixi əksər hallarda eynidir, eyni deyilsə, qeyd qəbul tarixini ayrıca yazır. "Bölmə" sütunu qeydin bu sənəddə çəkildiyi əsas bölmələri göstərir. Qeydlərin tam mətni #{raw("docs.tamga.network/tr/adr/")} ünvanındadır.

#tablo([#{strong[Cədvəl 51.]} Qərar qeydləri.], (10fr, 40fr, 12fr, 13fr, 6fr), ([ADR​​​​​], [Başlıq], [Status], [Tarix], [Bölmə],), (
  ([0001], [Besu QBFT reyestri], [Qəbul edildi], [2026-07-29], [19],),
  ([0002], [Suverenlik prioritetli idarəetmə], [Qəbul edildi], [2026-08-05], [2, 4, 18],),
  ([0003], [Dəyər qatı qarmaqları], [Əvəz olundu], [2026-08-06], [19],),
  ([0004], [Qurum şəxsiyyəti: X.509], [Qəbul edildi], [2026-08-06], [7, 16, 20],),
  ([0005], [Təminat modeli və dövlətsiz başlanğıc], [Qəbul edildi], [2026-09-03], [14],),
  ([0006], [Rəqəmsal sənəd formatı: SD-JWT VC], [Qəbul edildi], [2026-09-03], [4, 8, 15],),
  ([0007], [Sxem reyestri], [Qəbul edildi], [2026-09-09], [8],),
  ([0008], [Ləğv siyahısının yeri], [Qəbul edildi], [2026-09-09], [12, 20],),
  ([0009], [Zəncirsiz beta və zəncir həddi], [Qəbul edildi], [2026-09-24], [4, 18, 19],),
  ([0010], [Sənəd növünün identifikatoru (URN)], [Qəbul edildi], [2026-09-24], [8],),
  ([0011], [Müvəqqəti şəxsiyyət sənədi provayderi], [Qəbul edildi], [2026-09-25], [3, 5, 14],),
  ([0012], [Yaxın məsafədə rəqəmsal sənədin göstərilməsi], [Qəbul edildi], [2026-09-25], [10, 20],),
  ([0013], [Şəxsiyyət sənədi üçün mdoc], [Qəbul edildi], [2026-09-26], [8, 14, 20],),
  ([0014], [Tədbir kateqoriyası], [Qəbul edildi], [2026-09-27], [21],),
  ([0015], [Vahid etibar interfeysi], [Qəbul edildi], [2026-09-27], [5, 6, 17],),
  ([0016], [Host edilən rəqəmsal sənəd vermə xidmətinə giriş], [Qəbul edildi], [2026-09-27], [7, 17],),
  ([0017], [Yoxlama nəticəsinə giriş], [Qəbul edildi], [2026-09-27], [11, 17],),
  ([0018], [Sənədlərin üç qapısı], [Qəbul edildi], [2026-09-27], [17],),
  ([0019], [Qurum Konsolu], [Qəbul edildi], [2026-09-28], [17],),
  ([0020], [Səlahiyyətli mənbə qurumdadır], [Qəbul edildi], [2026-09-29], [5, 9],),
  ([0021], [E-poçt və telefon rəqəmsal sənədləri], [Qəbul edildi], [2026-09-29], [14],),
  ([0022], [Şəxsiyyət xidmətinin sinfi], [Qəbul edildi], [2026-09-29], [3, 7, 8],),
  ([0023], [Nüsxələrin avtomatik yenilənməsi], [Qəbul edildi], [2026-09-29], [9, 13, 15],),
  ([0024], [İştirakçı qeydiyyat məlumatları], [Qəbul edildi], [2026-09-29], [6, 20],),
  ([0025], [Rəqəmsal cüzdan və açar attestasiyası], [Qəbul edildi], [2026-09-29], [9, 13, 15],),
  ([0026], [Qeydiyyat sertifikatları], [Qəbul edildi], [2026-09-29], [7, 10, 20],),
  ([0027], [Əməliyyat jurnalının ixracı], [Qəbul edildi], [2026-09-29], [13],),
  ([0028], [Səhiyyə sənədləri], [Təklif], [2026-09-29], [22],),
  ([0029], [İnkişaf mərhələsində sxemlər], [Qəbul edildi], [2026-09-30], [8],),
  ([0030], [Məhsul adları], [Qəbul edildi], [2026-09-30], [10, 11],),
  ([0031], [Sayt üzrə psevdonim], [Qəbul edildi], [2026-10-01], [8, 10, 15],),
  ([0032], [Sıfır bilik sübutu (ZK)], [Qəbul edildi], [2026-10-01], [15, 16, 20],),
  ([0033], [Mağaza baxışı kodu], [Qəbul edildi], [2026-10-01], [14],),
  ([0034], [HAIP 1.0 uyğunluğu], [Qəbul edildi], [2026-10-01], [3, 10, 13],),
  ([0035], [Mövqeləndirmə], [Qəbul edildi], [2026-10-01], [3, 4, 20],),
  ([0036], [Etibar federasiyası], [Qəbul edildi], [2026-10-01], [6, 20],),
  ([0037], [Tamga Network yalnız şəbəkədir], [Qəbul edildi], [2026-10-02], [4, 17, 18],),
  ([0038], [Sandbox: test şəbəkəsi], [Qəbul edildi], [2026-10-03], [6, 17],),
  ([0039], [Sürücülük vəsiqəsi məlumatı: yoxlayan tərəf üçün təsdiqlənmiş rəqəmsal sənəd], [Qəbul edildi], [2026-10-03], [8, 14],),
  ([0040], [Sandbox-da real şəxsiyyətin yoxlanılması], [Qəbul edildi], [2026-10-04], [17],),
  ([0041], [Sandbox-da qurum test hesabları], [Qəbul edildi], [2026-10-04], [17],),
  ([0042], [Şəbəkə və rəqəmsal cüzdanlar: şəbəkə cüzdan idarə etmir], [Qəbul edildi], [2026-10-06], [4, 5, 13],),
  ([0043], [Yaş həddi yoxdur: Aİ yanaşması], [Qəbul edildi], [2026-10-08], [13, 15, 22],),
  ([0044], [ZK təqdimatı üçün qısaömürlü nüsxələr], [Qəbul edildi], [2026-10-09], [8, 9, 15],),
  ([0045], [Şəxsiyyət sənədinin sahə adları: Aİ PID kodlaşdırması], [Qəbul edildi], [2026-10-09], [8, 14, 20],),
  ([0046], [Daxili açıqlama siyasəti], [Qəbul edildi], [2026-10-09], [10, 20],),
  ([0047], [Cüzdan vahidinin ləğvi, cüzdandan kənar ləğv yolu və cihaz sübutu], [Qəbul edildi], [2026-10-12], [12, 13, 16],),
  ([0048], [Şəxsiyyət xidmətinin sənədlərində dayandırma yoxdur; mdoc ləğv siyahısı CWT formatında], [Qəbul edildi], [2026-10-13], [8, 12, 20],),
  ([0049], ["Tamga Network-da siyahıdadır" göstəricisi], [Qəbul edildi], [2026-10-13], [5, 13, 20],),
  ([0050], [Sənədi verən qurumun sertifikat profili], [Qəbul edildi], [2026-10-13], [7, 20],),
  ([0051], [Zəncir imzalanmış siyahıların proyeksiyasıdır], [Qəbul edildi], [2026-10-17], [4, 19],),
  ([0052], [Besu yerli icazələndirməsi], [Qəbul edildi], [2026-10-19], [19],),
  ([0053], [Siyahı lövbərində rəqib namizədlər], [Qəbul edildi], [2026-10-19], [19],),
  ([0054], [Zəncirdə sxem ad sahəsi, dövlətlərarası bağlantı və kvota əhatəsi], [Qəbul edildi], [2026-10-19], [8, 18, 19],),
  ([0055], [İdarəetmə: yeniləmə gözləmə müddəti və qeydiyyat idarəetməsi təklifləri], [Qəbul edildi], [2026-10-19], [18, 19],),
  ([0056], [Paket API-lərində təhlükəsiz defolt dəyərlər], [Qəbul edildi], [2026-10-19], [7, 10, 16],),
  ([0057], [Host edilən rəqəmsal sənəd verilməsində qurumun imza açarı: məsafədən imza (CSC API)], [Qəbul edildi], [2026-10-20], [5, 7, 16],),
  ([0058], [Giriş sertifikatının profili (ETSI TS 119 411-8) və şəxsiyyət xidməti sertifikatının keçid vaxtı], [Qəbul edildi], [2026-10-21], [7, 18, 20],),
  ([0059], [Giriş tokeninin ömrü ərzində bir neçə sənəd sorğusu], [Qəbul edildi], [2026-10-21], [9],),
  ([0060], [Yeniləmə tokeni müştəri nümunəsi açarına bağlıdır], [Qəbul edildi], [2026-10-22], [9],),
  ([0061], [Psevdonim toxumu ayrıca sənəd konfiqurasiyası kimi, standart sənəd sorğusu ilə], [Qəbul edildi], [2026-10-22], [8, 14, 15],),
  ([0062], [ZK nüsxəsi yeniləmə tokeni yalnız ZK nüsxəsi əhatəsi istəndikdə], [Qəbul edildi], [2026-10-23], [9, 16],),
  ([0063], [Zəncirdəki ləğv siyahısı qeydi siyahının öz bit sayını qəbul edir], [Qəbul edildi], [2026-10-23], [19],),
  ([0064], [Şəxsiyyət sənədində yaş həddləri: age\_over\_15 və age\_over\_NN nümunəsi], [Qəbul edildi], [2026-10-23], [14, 15],),
  ([0065], [Giriş terminalları yoxlama xidmətinə özünü təqdim edir: terminal açarı], [Qəbul edildi], [2026-10-26], [10, 16],),
  ([0066], [ETSI TS 119 612 XML siyahı görünüşü], [Qəbul edildi], [2026-10-29], [6, 20],),
  ([0067], [Sorğu obyektinin hər çəkilişi ayrıca qoldur; imtina yalnız öz qolunu bağlayır], [Qəbul edildi], [2026-10-29], [10, 16],),
  ([0068], [Qeydiyyat sertifikatı siyasəti və status siyahısı], [Qəbul edildi], [2026-10-29], [7, 10, 20],),
  ([0069], [Etibar siyahısında giriş qrupları: qurum, siyasət, sertifikat; terminal açarı qurum adından], [Qəbul edildi], [2026-10-29], [10, 16],),
  ([0070], [Müvəqqəti operator zənciri], [Qəbul edildi], [2026-10-30], [4, 18],),
  ([0071], [Müvəqqəti dövrdə şəbəkənin maliyyələşməsi: xidmət haqqı yoxdur; fond qrantlar və dövlət\/üzv töhfələri ilə], [Qəbul edildi], [2026-10-30], [4, 18],),
  ([0072], [Dəyər qatı dayandırılıb: ADR-0003 qarmaqları tədqiqat istiqamətidir], [Qəbul edildi], [2026-10-30], [4, 19, 23],),
))

#heading(level: 1, numbering: none)[Əlavə C — Standartlar göstəricisi]

Cədvəl 52 sənəddə çəkilən xarici standartları və normativ aktları, onların versiyalarını və Tamga-da istifadə olunduqları bölmələri verir. Versiyalar bu nəşrin hazırlandığı tarixə görədir; standartların məzmunu sitat gətirilmir, yalnız istifadə olunduqları yer göstərilir.

#tablo([#{strong[Cədvəl 52.]} Standartlar və normativ aktlar.], (13fr, 33fr, 15fr, 28fr, 21fr), ([Təşkilat], [Sənəd], [Versiya], [Tamga-da], [Bölmə​​​​​​​​​​​​],), (
  ([Aİ], [910\/2014 \[1\] və 2024\/1183 \[2\] saylı reqlamentlər (eIDAS 2.0)], [2024\/1183, 30 aprel 2024], [çərçivə, rollar, sənəd sinifləri], [3, 20],),
  ([Aİ], [İcra Reqlamentləri 2024\/2977–2982 \[5\]], [dekabr 2024; 2026\/1731 ilə dəyişdirilib], [PID və EAA kodlaşdırması, cüzdan funksiyaları], [3, 13, 14],),
  ([Aİ], [İcra Reqlamentləri 2025\/847 \[6\], 2025\/848, 2025\/849], [may 2025; 2025\/848 2026\/1730 ilə dəyişdirilib], [insident bildirişi, yoxlayan tərəfin qeydiyyatı, sertifikatlı cüzdanlar siyahısı], [7, 18, 20],),
  ([Aİ], [İcra Reqlamentləri 2026\/1730 \[7\], 2026\/1731, 2026\/1735], [iyul 2026], [aktual standart istinadları; şəxsiyyət sahələri], [3, 14, 20],),
  ([Aİ], [Architecture and Reference Framework (ARF \[11\])], [3\.0.0, iyul 2026], [rollar dəsti, qaydalar, mövzu başlıqları], [3, 13, 20],),
  ([Aİ], [EUDI texniki spesifikasiyaları (TS3 \[12\], TS10, TS13 …)], [canlı sənədlər], [WIA və KA, ixrac, ZK], [13, 15],),
  ([Aİ], [Attestation Rulebook \[13\] şablonu], [1\.5], [Tamga Rulebook-un qolları], [18\.8],),
  ([IETF], [RFC 9901 \[15\] SD-JWT], [noyabr 2025], [sənəd formatı], [8],),
  ([IETF], [SD-JWT VC \[16\]], [draft-19], [sənəd formatı], [8],),
  ([IETF], [Token Status List \[17\]], [draft-20 (Aİ-nin istinad etdiyi), draft-21], [ləğv siyahıları], [12],),
  ([IETF], [OAuth 2.0 Attestation-Based Client Authentication \[18\]], [layihə], [WIA ilə müştərinin autentifikasiyası], [9, 13],),
  ([IETF], [RFC 9449 DPoP \[20\] · RFC 9126 PAR \[21\] · RFC 7636 PKCE \[22\] · RFC 9700 \[23\]], [dərc edilib], [sənəd vermə profili], [9],),
  ([IETF], [RFC 5280 \[28\] X.509 · RFC 8949 CBOR \[29\] · RFC 7638 \[24\] · RFC 9180 HPKE \[25\]], [dərc edilib], [sertifikatlar, mdoc, açar barmaq izi, cavabın şifrələnməsi], [7, 8, 10],),
  ([OpenID Foundation], [OpenID4VCI 1.0 \[30\]], [Final, sentyabr 2025], [sənəd vermə], [9],),
  ([OpenID Foundation], [OpenID4VP 1.0 \[31\] və DCQL], [Final, iyul 2025], [göstərmə], [10],),
  ([OpenID Foundation], [HAIP 1.0 \[32\]], [Final, dekabr 2025], [yüksək təminat profili], [9, 10],),
  ([ISO\/IEC], [18013-5 \[34\]], [2021], [mdoc, yaxın məsafə], [8\.3, 10.8],),
  ([ISO\/IEC], [TS 18013-7 \[35\]], [2025], [brauzer üzərindən mdoc], [10\.6],),
  ([W3C], [Digital Credentials API \[36\]], [işçi layihə], [brauzerdən göstərmə], [10\.6],),
  ([ETSI], [TS 119 612 \[41\]], [V2.4.1], [XML etibar siyahısı görünüşü], [6\.8],),
  ([ETSI], [TS 119 602 \[42\]], [V1.1.1], [LoTE görünüşləri, xarici siyahılar], [6\.8, 6.9],),
  ([ETSI], [TS 119 412-6 \[43\] və EN 319 412-3 \[44\]], [V1.2.1], [qurum sertifikatı profili], [7\.3],),
  ([ETSI], [TS 119 411-8 \[45\]], [V1.1.1], [yoxlayan tərəfin giriş sertifikatı], [7\.4],),
  ([ETSI], [TS 119 475 \[46\]], [V1.2.1], [qeydiyyat sertifikatı], [7\.5],),
  ([ETSI], [TS 119 461 \[47\]], [V2.1.1], [məsafədən şəxsiyyət yoxlaması], [14],),
  ([ETSI], [TS 119 471 \[48\]; TS 119 472-1 \[49\]; TS 119 472-2 \[50\]; TS 119 472-3 \[51\]], [V1.1.1; V1.2.1; V1.2.1; V1.1.1], [sənəd verən siyasəti, sənəd, vermə və göstərmə profilləri], [8, 9, 10, 20],),
  ([ETSI], [EN 319 401 \[52\]; EN 319 132-1 (XAdES \[53\])], [dərc edilib], [ümumi siyasət; XML imzası], [6\.8, 20],),
  ([Cloud Signature Consortium], [CSC API \[54\]], [v2], [məsafədən imza], [7\.6],),
  ([Longfellow ZK], [sübut sistemi və CFRG layihəsi], [draft-00], [yaşın sübutu], [15\.4],),
  ([Aİ], [European Learning Model \/ Europass \[61\]], [3], [diplom sahələrinin mənası], [8\.5],),
))

#heading(level: 1, numbering: none)[Əlavə D — Abbreviaturalar]

Cədvəl 53 sənəddə keçən abbreviaturaları açır; abbreviaturaların çoxu A Əlavəsində də izah edilib.

#tablo([#{strong[Cədvəl 53.]} Abbreviaturalar.], (15fr, 39fr), ([Abbreviatura], [Açılışı],), (
  ([ADR], [Architecture Decision Record, qərar qeydi],),
  ([ARF], [Architecture and Reference Framework, Arxitektura və İstinad Çərçivəsi],),
  ([CBOR], [Concise Binary Object Representation],),
  ([CIR], [Commission Implementing Regulation, Komissiyanın icra reqlamenti],),
  ([CSC], [Cloud Signature Consortium],),
  ([CWT], [CBOR Web Token],),
  ([DC API], [Digital Credentials API],),
  ([DCQL], [Digital Credentials Query Language],),
  ([DPoP], [Demonstrating Proof of Possession],),
  ([EAA], [Electronic Attestation of Attributes, atributların elektron attestasiyası],),
  ([EBSI], [European Blockchain Services Infrastructure],),
  ([ELM], [European Learning Model],),
  ([ETSI], [European Telecommunications Standards Institute],),
  ([EUDI], [European Digital Identity, Avropa Rəqəmsal Şəxsiyyəti],),
  ([FW], [Tamga çərçivə sənədinin (framework) identifikatoru],),
  ([HAIP], [OpenID4VC High Assurance Interoperability Profile],),
  ([HKDF], [HMAC-based Key Derivation Function],),
  ([HMAC], [Hash-based Message Authentication Code],),
  ([HPKE], [Hybrid Public Key Encryption],),
  ([JWE \/ JWS \/ JWT], [JSON Web Encryption \/ Signature \/ Token],),
  ([KA], [Key Attestation, açar attestasiyası],),
  ([KB-JWT], [Key Binding JWT, cihaz bağlılığı imzası],),
  ([KVKK], [6698 saylı Fərdi Məlumatların Qorunması Qanunu (Türkiyə)],),
  ([LoTE], [Lists of Trusted Entities (ETSI TS 119 602)],),
  ([LoTL], [List of Trusted Lists, siyahıların siyahısı],),
  ([mDL], [mobile Driving Licence],),
  ([OpenID4VCI], [OpenID for Verifiable Credential Issuance],),
  ([OpenID4VP], [OpenID for Verifiable Presentations],),
  ([PAR], [Pushed Authorization Requests],),
  ([PID], [Person Identification Data, şəxsiyyət məlumatı],),
  ([PKCE], [Proof Key for Code Exchange],),
  ([PuB-EAA], [dövlət qurumu tərəfindən verilən atribut attestasiyası],),
  ([QBFT], [Quorum Byzantine Fault Tolerance],),
  ([QEAA], [Qualified EAA, kvalifikasiyalı atribut attestasiyası],),
  ([SD-JWT VC], [Selective Disclosure JWT Verifiable Credential],),
  ([SPEC], [Tamga spesifikasiyasının identifikatoru],),
  ([TDT], [Türk Dövlətləri Təşkilatı],),
  ([TS], [Technical Specification],),
  ([VCDM], [W3C Verifiable Credentials Data Model],),
  ([WIA], [Wallet Instance Attestation, cüzdan nüsxəsi attestasiyası],),
  ([XAdES], [XML Advanced Electronic Signatures],),
  ([ZK], [Zero-Knowledge, sıfır bilik],),
))

#heading(level: 1, numbering: none)[Əlavə E — Sənədlər toplusunun göstəricisi]

Tamga-nın çərçivə sənədləri #{raw("arf.tamga.network/tr/")}, spesifikasiyaları və bələdçiləri isə #{raw("docs.tamga.network/tr/")} ünvanındadır. Cədvəl 54 bu sənəddə çəkilən identifikatorları ünvanları ilə uyğunlaşdırır. Ünvan kökdən sonrakı yoldur; çərçivə sənədləri türk və ingilis dillərində dərc edilir.

#tablo([#{strong[Cədvəl 54.]} Çərçivə sənədləri, spesifikasiyalar və bələdçilər.], (20fr, 20fr, 48fr), ([İdentifikator], [Başlıq], [Ünvan],), (
  ([FW-ARF-0001], [Arxitektura və İstinad Çərçivəsi], [#{raw("arf.tamga.network/tr/architecture")}],),
  ([FW-TF-0001], [A Əlavəsi: Trust Framework], [#{raw("arf.tamga.network/tr/trust-framework")}],),
  ([FW-RB-0001], [B Əlavəsi: Tamga Rulebook], [#{raw("arf.tamga.network/tr/rulebook")}],),
  ([FW-RB-0002], [Education Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/education")}],),
  ([FW-RB-0003], [Identity Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/identity")}],),
  ([FW-RB-0004], [Event Ticket Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/event-ticket")}],),
  ([FW-RB-0005], [Contact Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/contact")}],),
  ([FW-DEF-0001], [D Əlavəsi: Təriflər], [#{raw("arf.tamga.network/tr/definitions")}],),
  ([FW-REF-0001], [E Əlavəsi: Mənbələr], [#{raw("arf.tamga.network/tr/references")}],),
  ([FW-ROLE-0001], [Rollar], [#{raw("arf.tamga.network/tr/roles")}],),
  ([FW-ONB-0001], [Qoşulma prosesi], [#{raw("arf.tamga.network/tr/onboarding")}],),
  ([FW-POL-0001], [Ləğv siyasəti], [#{raw("arf.tamga.network/tr/policies/revocation")}],),
  ([FW-POL-0002], [Cüzdan attestasiyası siyasəti], [#{raw("arf.tamga.network/tr/policies/wallet-attestation")}],),
  ([FW-POL-0003], [Qeydiyyat sertifikatı siyasəti], [#{raw("arf.tamga.network/tr/policies/registration-certificate")}],),
  ([SPEC-TRUST-0001], [Etibar siyahıları], [#{raw("docs.tamga.network/tr/specifications/trust-lists")}],),
  ([SPEC-ID-0002], [Qurum şəxsiyyəti (X.509)], [#{raw("docs.tamga.network/tr/specifications/x509-identity")}],),
  ([SPEC-ID-0003], [Şəxsiyyətin yoxlanılması], [#{raw("docs.tamga.network/tr/specifications/identity-proofing")}],),
  ([SPEC-CRED-0001], [Sənəd formatı və protokollar], [#{raw("docs.tamga.network/tr/specifications/credential-format")}],),
  ([SPEC-CRED-0002], [SD-JWT VC profili], [#{raw("docs.tamga.network/tr/specifications/sd-jwt-vc")}],),
  ([SPEC-CRED-0003], [Ləğv və status siyahısı], [#{raw("docs.tamga.network/tr/specifications/status-list")}],),
  ([SPEC-SCHEMA-0001], [Sxemlər kataloqu], [#{raw("docs.tamga.network/tr/specifications/schema-catalog")}],),
  ([SPEC-SCHEMA-0002], [Təhsil sxemləri], [#{raw("docs.tamga.network/tr/specifications/education-schemas")}],),
  ([SPEC-SCHEMA-0003], [Sektor sxemləri], [#{raw("docs.tamga.network/tr/specifications/sector-schemas")}],),
  ([SPEC-PROTO-0001], [OpenID4VCI profili], [#{raw("docs.tamga.network/tr/specifications/openid4vci")}],),
  ([SPEC-PROTO-0002], [OpenID4VP profili], [#{raw("docs.tamga.network/tr/specifications/openid4vp")}],),
  ([SPEC-API-0001], [Yoxlama xətti və API], [#{raw("docs.tamga.network/tr/specifications/verification-api")}],),
  ([SPEC-WALLET-0001], [Cüzdan qaydaları], [#{raw("docs.tamga.network/tr/specifications/wallet")}],),
  ([GUIDE-0009], [Uyğunluq testləri], [#{raw("docs.tamga.network/tr/guides/conformance")}],),
  ([GUIDE-0013], [Sandbox: test şəbəkəsi], [#{raw("docs.tamga.network/tr/guides/sandbox")}],),
  ([ADR-0001 … ADR-0072], [Qərar qeydləri (B Əlavəsi)], [#{raw("docs.tamga.network/tr/adr/")}],),
))

#heading(level: 1, numbering: none)[Mənbələr]

#kaynak("1")[Avropa Parlamenti və Şurası (2014). #{emph[Daxili bazarda elektron əməliyyatlar üçün elektron identifikasiya və etibar xidmətləri haqqında 910\/2014 saylı Reqlament (Aİ).]} Avropa İttifaqının Rəsmi Jurnalı, L 257, 28 avqust 2014; 2024\/1183 ilə dəyişdirilmiş konsolidə mətn, CELEX 02014R0910-20241018.]

#kaynak("2")[Avropa Parlamenti və Şurası (2024). #{emph[Avropa Rəqəmsal Şəxsiyyət Çərçivəsinin yaradılması baxımından 910\/2014 saylı Reqlamenti dəyişdirən 11 aprel 2024-cü il tarixli 2024\/1183 saylı Reqlament (Aİ).]} Avropa İttifaqının Rəsmi Jurnalı, 30 aprel 2024. http:\/\/data.europa.eu\/eli\/reg\/2024\/1183\/oj]

#kaynak("3")[Avropa Komissiyası (2021). #{emph[Avropa Rəqəmsal Şəxsiyyət Çərçivəsinə əlaqələndirilmiş yanaşma üçün ortaq İttifaq Alətlər Dəsti haqqında 2021\/946 saylı Tövsiyə (Aİ).]} 3 iyun 2021.]

#kaynak("4")[Avropa Komissiyası (2015). #{emph[Elektron identifikasiya vasitələrinin təminat səviyyələri üçün minimal texniki tələbləri və prosedurları müəyyən edən 2015\/1502 saylı İcra Reqlamenti (Aİ).]} Avropa İttifaqının Rəsmi Jurnalı, L 235, 9 sentyabr 2015.]

#kaynak("5")[Avropa Komissiyası (2024). #{emph[2024\/2977, 2024\/2979, 2024\/2980, 2024\/2981 və 2024\/2982 saylı İcra Reqlamentləri (Aİ)]} (Avropa Rəqəmsal Şəxsiyyət Cüzdanları). 28 noyabr 2024; Avropa İttifaqının Rəsmi Jurnalı, 4 dekabr 2024.]

#kaynak("6")[Avropa Komissiyası (2025). #{emph[2025\/846, 2025\/847 (cüzdanlarda təhlükəsizlik pozuntularına reaksiyalar), 2025\/848 (cüzdana etibar edən tərəflərin qeydiyyatı) və 2025\/849 (sertifikatlı cüzdanlar siyahısı) saylı İcra Reqlamentləri (Aİ).]} 6 may 2025; Avropa İttifaqının Rəsmi Jurnalı, 7 may 2025.]

#kaynak("7")[Avropa Komissiyası (2026). #{emph[2026\/1730, 2026\/1731 və 2026\/1735 saylı İcra Reqlamentləri (Aİ)]}, tətbiq ediləcək standartlar və spesifikasiyalar baxımından. 15 iyul 2026; Avropa İttifaqının Rəsmi Jurnalı, 22 iyul 2026.]

#kaynak("8")[Avropa Parlamenti və Şurası (2016). #{emph[Fərdi məlumatların emalı ilə əlaqədar fiziki şəxslərin müdafiəsi və bu məlumatların sərbəst hərəkəti haqqında 2016\/679 saylı Reqlament (Aİ) (Məlumatların Qorunması üzrə Ümumi Reqlament).]} Avropa İttifaqının Rəsmi Jurnalı, L 119, 4 may 2016.]

#kaynak("9")[#{emph[6698 sayılı Kişisel Verilerin Korunması Kanunu]} \[6698 saylı Fərdi Məlumatların Qorunması Qanunu\]. Resmî Gazete, 7 aprel 2016, say 29677.]

#kaynak("10")[#{emph[7578 sayılı Sosyal Hizmetler Kanunu ve Bazı Kanunlarda Değişiklik Yapılmasına Dair Kanun]} \[Sosial Xidmətlər Qanununa və bəzi qanunlara dəyişiklik edilməsi haqqında 7578 saylı Qanun\]. Resmî Gazete, 1 may 2026, say 33240.]

#kaynak("11")[Avropa Komissiyası və eIDAS Ekspert Qrupu (2026). #{emph[European Digital Identity Wallet: Architecture and Reference Framework (ARF)]}, versiya 3.0.0, 23 iyul 2026. https:\/\/eu-digital-identity-wallet.github.io\/eudi-doc-architecture-and-reference-framework\/]

#kaynak("12")[Avropa Komissiyası. #{emph[EUDI Wallet Standards and Technical Specifications]} (TS3 cüzdan vahidi attestasiyaları, TS5 və TS6 etibar edən tərəfin qeydiyyatı, TS9 cüzdandan cüzdana qarşılıqlı əlaqə, TS10 məlumatların daşınabilirliyi, TS13 arifmetik sxemlərlə sıfır bilik sübutu). https:\/\/github.com\/eu-digital-identity-wallet\/eudi-doc-standards-and-technical-specifications]

#kaynak("13")[Avropa Komissiyası. #{emph[EUDI Wallet attestation rulebooks catalog]}: Attestation Rulebook şablonu, versiya 1.5; PID və mDL Rulebook. https:\/\/github.com\/eu-digital-identity-wallet\/eudi-doc-attestation-rulebooks-catalog]

#kaynak("14")[Avropa Komissiyası. #{emph[Pilot for the International Compatibility of Trust Services]} və üçüncü ölkə etibar siyahıları. https:\/\/ec.europa.eu (müraciət: noyabr 2026).]

#kaynak("15")[Fett, D., Yasuda, K. və Campbell, B. (2025). #{emph[Selective Disclosure for JSON Web Tokens (SD-JWT).]} IETF RFC 9901, noyabr 2025.]

#kaynak("16")[Terbu, O., Fett, D. və Campbell, B. #{emph[SD-JWT-based Verifiable Digital Credentials (SD-JWT VC).]} IETF OAuth İşçi Qrupunun internet layihəsi draft-ietf-oauth-sd-jwt-vc-19, 2026. https:\/\/datatracker.ietf.org\/doc\/draft-ietf-oauth-sd-jwt-vc\/]

#kaynak("17")[Looker, T., Bastian, P. və Bormann, C. #{emph[Token Status List.]} IETF OAuth İşçi Qrupunun internet layihəsi draft-ietf-oauth-status-list-20 (20 aprel 2026; Aİ-nin 2026\/1731 ilə istinad etdiyi versiya) və draft-21 (21 iyun 2026). https:\/\/datatracker.ietf.org\/doc\/draft-ietf-oauth-status-list\/]

#kaynak("18")[Looker, T., Bastian, P. və Bormann, C. #{emph[OAuth 2.0 Attestation-Based Client Authentication.]} IETF OAuth İşçi Qrupunun internet layihəsi (draft-ietf-oauth-attestation-based-client-auth).]

#kaynak("19")[Hardt, D. (Red.) (2012). #{emph[The OAuth 2.0 Authorization Framework.]} IETF RFC 6749, oktyabr 2012.]

#kaynak("20")[Fett, D., Campbell, B., Bradley, J., Lodderstedt, T., Jones, M. və Waite, D. (2023). #{emph[OAuth 2.0 Demonstrating Proof of Possession (DPoP).]} IETF RFC 9449, sentyabr 2023.]

#kaynak("21")[Lodderstedt, T., Campbell, B., Sakimura, N., Tonge, D. və Skokan, F. (2021). #{emph[OAuth 2.0 Pushed Authorization Requests.]} IETF RFC 9126, sentyabr 2021.]

#kaynak("22")[Sakimura, N., Bradley, J. və Agarwal, N. (2015). #{emph[Proof Key for Code Exchange by OAuth Public Clients.]} IETF RFC 7636, sentyabr 2015.]

#kaynak("23")[Lodderstedt, T., Bradley, J., Labunets, A. və Fett, D. (2025). #{emph[Best Current Practice for OAuth 2.0 Security.]} IETF RFC 9700, yanvar 2025.]

#kaynak("24")[Jones, M. və Sakimura, N. (2015). #{emph[JSON Web Key (JWK) Thumbprint.]} IETF RFC 7638, sentyabr 2015.]

#kaynak("25")[Barnes, R., Bhargavan, K., Lipp, B. və Wood, C. (2022). #{emph[Hybrid Public Key Encryption.]} IETF RFC 9180, fevral 2022.]

#kaynak("26")[Krawczyk, H., Bellare, M. və Canetti, R. (1997). #{emph[HMAC: Keyed-Hashing for Message Authentication.]} IETF RFC 2104, fevral 1997.]

#kaynak("27")[Krawczyk, H. və Eronen, P. (2010). #{emph[HMAC-based Extract-and-Expand Key Derivation Function (HKDF).]} IETF RFC 5869, may 2010.]

#kaynak("28")[Cooper, D., Santesson, S., Farrell, S., Boeyen, S., Housley, R. və Polk, W. (2008). #{emph[Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.]} IETF RFC 5280, may 2008.]

#kaynak("29")[Bormann, C. və Hoffman, P. (2020). #{emph[Concise Binary Object Representation (CBOR).]} IETF RFC 8949, dekabr 2020.]

#kaynak("30")[Lodderstedt, T., Yasuda, K., Looker, T. və Bastian, P. (2025). #{emph[OpenID for Verifiable Credential Issuance 1.0.]} OpenID Foundation, yekun versiya, 16 sentyabr 2025. https:\/\/openid.net\/specs\/openid-4-verifiable-credential-issuance-1\_0.html]

#kaynak("31")[Terbu, O., Lodderstedt, T., Yasuda, K., Fett, D. və Heenan, J. (2025). #{emph[OpenID for Verifiable Presentations 1.0.]} OpenID Foundation, yekun versiya, 9 iyul 2025. https:\/\/openid.net\/specs\/openid-4-verifiable-presentations-1\_0.html]

#kaynak("32")[Yasuda, K., Lodderstedt, T., Bormann, C. və Heenan, J. (2025). #{emph[OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0.]} OpenID Foundation, yekun versiya, 24 dekabr 2025. https:\/\/openid.net\/specs\/openid4vc-high-assurance-interoperability-profile-1\_0.html]

#kaynak("33")[OpenID Foundation. #{emph[OpenID Conformance Suite]} və öz-sertifikatlaşdırma. https:\/\/openid.net\/certification\/ · Tamga Network, #{emph[oidf-conformance-kit]}. https:\/\/github.com\/tamga-network\/oidf-conformance-kit]

#kaynak("34")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification: ISO-compliant driving licence, Part 5: Mobile driving licence (mDL) application.]} ISO\/IEC JTC 1\/SC 17. https:\/\/www.iso.org\/standard\/69084.html]

#kaynak("35")[ISO\/IEC (2025). #{emph[ISO\/IEC TS 18013-7:2025 Personal identification: ISO-compliant driving licence, Part 7: Mobile driving licence (mDL) add-on functions.]} İkinci nəşr, may 2025.]

#kaynak("36")[Caceres, M., Cappalli, T. və Yosef, M. A. (Red.) (2026). #{emph[Digital Credentials.]} W3C Working Draft, Federated Identity Working Group, 29 oktyabr 2026. https:\/\/www.w3.org\/TR\/digital-credentials\/]

#kaynak("37")[W3C (2025). #{emph[Verifiable Credentials Data Model v2.0.]} W3C Recommendation, 15 may 2025. https:\/\/www.w3.org\/TR\/vc-data-model-2.0\/]

#kaynak("38")[W3C (2016). #{emph[Subresource Integrity.]} W3C Recommendation, iyun 2016. https:\/\/www.w3.org\/TR\/SRI\/]

#kaynak("39")[JSON Schema. #{emph[JSON Schema: A Media Type for Describing JSON Documents]}, draft 2020-12. https:\/\/json-schema.org\/draft\/2020-12]

#kaynak("40")[ISO\/IEC (2020). #{emph[ISO\/IEC 17000:2020 Conformity assessment: Vocabulary and general principles.]}]

#kaynak("41")[ETSI (2025). #{emph[ETSI TS 119 612 V2.4.1: Electronic Signatures and Trust Infrastructures (ESI); Trusted Lists.]} Avqust 2025.]

#kaynak("42")[ETSI (2025). #{emph[ETSI TS 119 602 V1.1.1: Electronic Signatures and Trust Infrastructures (ESI); Lists of Trusted Entities; Data model.]} Noyabr 2025.]

#kaynak("43")[ETSI (2026). #{emph[ETSI TS 119 412-6 V1.2.1: ESI; Certificate Profiles; Part 6: Certificate profile requirements for PID, Wallet, EAA, QEAA and PSBEAA providers.]} Aprel 2026.]

#kaynak("44")[ETSI. #{emph[ETSI EN 319 412-3: ESI; Certificate Profiles; Part 3: Certificate profile for certificates issued to legal persons.]}]

#kaynak("45")[ETSI (2025). #{emph[ETSI TS 119 411-8 V1.1.1: ESI; Policy and security requirements for Trust Service Providers issuing certificates; Part 8: Access Certificate Policy for EUDI Wallet Relying Parties.]} Oktyabr 2025.]

#kaynak("46")[ETSI (2026). #{emph[ETSI TS 119 475 V1.2.1: ESI; Relying party attributes supporting EUDI Wallet user’s authorisation decisions.]} Mart 2026.]

#kaynak("47")[ETSI (2025). #{emph[ETSI TS 119 461 V2.1.1: ESI; Policy and security requirements for trust service components providing identity proofing of trust service subjects.]} Fevral 2025.]

#kaynak("48")[ETSI (2025). #{emph[ETSI TS 119 471 V1.1.1: ESI; Policy and security requirements for providers of electronic attestation of attributes services.]} May 2025.]

#kaynak("49")[ETSI (2026). #{emph[ETSI TS 119 472-1 V1.2.1: ESI; Profiles for Electronic Attestation of Attributes; Part 1: General requirements.]} Fevral 2026.]

#kaynak("50")[ETSI (2026). #{emph[ETSI TS 119 472-2 V1.2.1: ESI; Profiles for Electronic Attestation of Attributes; Part 2: Profiles for EAA\/PID Presentations to Relying Party.]} Mart 2026.]

#kaynak("51")[ETSI (2026). #{emph[ETSI TS 119 472-3 V1.1.1: ESI; Profiles for Electronic Attestation of Attributes; Part 3: Profiles for issuance of EAA or PID.]} Mart 2026.]

#kaynak("52")[ETSI. #{emph[ETSI EN 319 401: ESI; General Policy Requirements for Trust Service Providers.]}]

#kaynak("53")[ETSI. #{emph[ETSI EN 319 132-1: ESI; XAdES digital signatures; Part 1: Building blocks and XAdES baseline signatures.]}]

#kaynak("54")[Cloud Signature Consortium. #{emph[Architectures and protocols for remote signature applications]} (CSC API), versiya 2. https:\/\/cloudsignatureconsortium.org\/]

#kaynak("55")[ENISA (2022). #{emph[Remote Identity Proofing: Attacks & Countermeasures.]} Avropa İttifaqının Kibertəhlükəsizlik Agentliyi, yanvar 2022.]

#kaynak("56")[Frigo, M. və shelat, a. (2024). "Anonymous Credentials from ECDSA." #{emph[Cryptology ePrint Archive]}, Hesabat 2024\/2010.]

#kaynak("57")[Frigo, M. və shelat, a. (2026). #{emph[Longfellow ZK.]} IRTF CFRG internet layihəsi draft-irtf-cfrg-longfellow-00, 19 oktyabr 2026; açıq mənbəli tətbiq https:\/\/github.com\/longfellow-zk\/longfellow-zk]

#kaynak("58")[Lamport, L., Shostak, R. və Pease, M. (1982). "The Byzantine Generals Problem." #{emph[ACM Transactions on Programming Languages and Systems]}, 4(3), 382–401.]

#kaynak("59")[Hyperledger Besu sənədləri: "QBFT", "Local permissioning" və 25.6.0 versiya qeydləri. https:\/\/besu.hyperledger.org (müraciət: noyabr 2026).]

#kaynak("60")[European Blockchain Services Infrastructure (EBSI). Sənədlər. https:\/\/hub.ebsi.eu (müraciət: noyabr 2026).]

#kaynak("61")[Avropa Komissiyası. #{emph[Europass və European Learning Model (ELM)]}, versiya 3. https:\/\/europa.eu\/europass\/]

#kaynak("62")[Tamga Network (2026). #{emph[Kadim mührün çağdaş karşılığını inşa ediyoruz]} \[Qədim möhürün müasir qarşılığını qururuq\] (manifest), versiya 1.0, noyabr 2026. https:\/\/tamga.network\/manifesto-tr.pdf]

#kaynak("63")[Tamga Network (2026). #{emph[Mimari ve Referans Çerçevesi]} \[Arxitektura və İstinad Çərçivəsi\] (FW-ARF-0001) və əlavələri: Trust Framework, Tamga Rulebook və sənəd növü rulebook-ları, Təriflər, Mənbələr, Rollar, Qoşulma, Ləğv, Cüzdan Attestasiyası və Qeydiyyat Sertifikatı siyasətləri; versiya 1.0.0. https:\/\/arf.tamga.network\/tr\/ (identifikatorlar E Əlavəsindədir).]

#kaynak("64")[Tamga Network (2026). #{emph[Şartnameler]} \[Spesifikasiyalar\] (SPEC-TRUST-0001, SPEC-ID-0002\/0003, SPEC-CRED-0001\/0002\/0003, SPEC-SCHEMA-0001\/0002\/0003, SPEC-PROTO-0001\/0002, SPEC-API-0001, SPEC-WALLET-0001), versiya 1.0.0; bələdçilər və anlayış səhifələri. https:\/\/docs.tamga.network\/tr\/]

#kaynak("65")[Tamga Network (2026). #{emph[Mimari karar kayıtları]} \[Arxitektura qərarlarının qeydləri\] ADR-0001…ADR-0072. https:\/\/docs.tamga.network\/tr\/adr\/ (göstərici B Əlavəsindədir).]

#kaynak("66")[Tamga Network (2026). #{emph[tamga-network]} deposu: README, SECURITY.md, CHANGELOG (0.8.2, 5 noyabr 2026) və #{raw("@tamga-network/*")} paketləri, Apache-2.0. https:\/\/github.com\/tamga-network\/tamga-network]

#kaynak("67")[Tamga Network Akademik Çalışmalar A1 (2026). #{emph[Dijital Kimliğin Evrimi: Kullanıcı Adından Kimlik Cüzdanına]} \[Rəqəmsal şəxsiyyətin təkamülü: istifadəçi adından şəxsiyyət cüzdanına\]. https:\/\/tamga.network\/files\/publications\/evolution-of-digital-identity-tr.pdf]

#kaynak("68")[Tamga Network Akademik Çalışmalar A3 (2026). #{emph[Seçici Açıklama: Gerekeni Göster, Gerisi Sende Kalsın]} \[Seçici paylaşım: lazım olanı göstər, qalanı səndə qalsın\]. https:\/\/tamga.network\/files\/publications\/selective-disclosure-tr.pdf]

#kaynak("69")[Tamga Network Akademik Çalışmalar A4 (2026). #{emph[Sıfır Bilgi İspatları ve Kimlik]} \[Sıfır bilik sübutları və şəxsiyyət\]. https:\/\/tamga.network\/files\/publications\/zero-knowledge-proofs-tr.pdf]

#kaynak("70")[Tamga Network Akademik Çalışmalar A5 (2026). #{emph[Bağlanamazlık: Doğrulayıcılar Seni Birbirine Anlatmasın]} \[Əlaqələndirilməzlik: yoxlayan tərəflər səni bir-birinə danışmasın\]. https:\/\/tamga.network\/files\/publications\/unlinkability-tr.pdf]

#kaynak("71")[Tamga Network Akademik Çalışmalar A6 (2026). #{emph[Kime Güveniyoruz? Güven Listeleri ve Dijital Güven Altyapısı]} \[Kimə etibar edirik? Etibar siyahıları və rəqəmsal etibar infrastrukturu\]. https:\/\/tamga.network\/files\/publications\/trust-lists-tr.pdf]

#kaynak("72")[Tamga Network Akademik Çalışmalar A7 (2026). #{emph[İptal: Bir Belgeyi Geri Almak, Kimseyi İzlemeden]} \[Ləğv: sənədi geri almaq, heç kimi izləmədən\]. https:\/\/tamga.network\/files\/publications\/revocation-tr.pdf]

#kaynak("73")[Tamga Network Akademik Çalışmalar A8 (2026). #{emph[Belge Nasıl Verilir, Nasıl Gösterilir]} \[Sənəd necə verilir, necə göstərilir\]. https:\/\/tamga.network\/files\/publications\/issuing-and-presenting-tr.pdf]

#kaynak("74")[Tamga Network Akademik Çalışmalar A9 (2026). #{emph[Yüz Yüze Doğrulama: NFC, Bluetooth ve Mobil Ehliyet]} \[Üzbəüz yoxlama: NFC, Bluetooth və mobil sürücülük vəsiqəsi\]. https:\/\/tamga.network\/files\/publications\/in-person-verification-tr.pdf]

#kaynak("75")[Tamga Network Akademik Çalışmalar A10 (2027, dərc təqviminə görə). #{emph[Cüzdan Güvenliği: Anahtar Nerede Saklanır, Telefon Gerçek mi?]} \[Cüzdan təhlükəsizliyi: açar harada saxlanılır, telefon həqiqidirmi?\] https:\/\/tamga.network\/files\/publications\/wallet-security-tr.pdf]

#kaynak("76")[Tamga Network Akademik Çalışmalar A11 (2027, dərc təqviminə görə). #{emph[eIDAS 2.0’a Hukuk Dışından Bakış]} \[eIDAS 2.0-a hüquqdan kənardan baxış\]. https:\/\/tamga.network\/files\/publications\/eidas-2-explained-tr.pdf]

#kaynak("77")[Tamga Network Akademik Çalışmalar A12 (2027, dərc təqviminə görə). #{emph[Blokzincir ve Dijital Kimlik]} \[Blokçeyn və rəqəmsal şəxsiyyət\]. https:\/\/tamga.network\/files\/publications\/blockchain-and-identity-tr.pdf]

#kaynak("78")[Tamga Network Akademik Çalışmalar A14 (2027, dərc təqviminə görə). #{emph[Deepfake Çağında Kimlik Doğrulama]} \[Deepfake dövründə şəxsiyyətin yoxlanılması\]. https:\/\/tamga.network\/files\/publications\/deepfakes-and-identity-verification-tr.pdf]

#kaynak("79")[Tamga Network Akademik Çalışmalar A15 (2027, dərc təqviminə görə). #{emph[Kuantum Sonrası Dönemde Dijital Kimlik]} \[Kvantdan sonrakı dövrdə rəqəmsal şəxsiyyət\]. https:\/\/tamga.network\/files\/publications\/post-quantum-identity-tr.pdf]

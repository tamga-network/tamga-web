import type { Locale } from "@/i18n/routing";

/*
 * Changelog — ağın sürümleri (sade dille). Sürüm numaraları ağın yayınlarıdır (paket sürümleri npm'de ayrıdır).
 * Kaynak: tamga-network CHANGELOG.md (1.0.0 = 2026-10-02 ilk yayın; öncesi özel arşivde). Yeni sürüm en üste; her metin üç dilde.
 * Duyuruya kadar sürüm 1.0.0 kalır; aynı sürüm içindeki tarihli güncellemeler ayrı kayıt olur ve `id` ile ayrılır.
 */

type L = Record<Locale, string>;
type LL = Record<Locale, string[]>;

export type ReleaseKind = "feature" | "security" | "fix";
export type SectionKind = "added" | "changed" | "fixed" | "security";

export type Release = {
  /** Bağlantı çapası; aynı sürümde birden çok kayıt varsa (ör. "v1.0.0-2026-10-06") */
  id?: string;
  version: string;
  date: string;
  kind: ReleaseKind;
  title: L;
  sections: Partial<Record<SectionKind, LL>>;
  note?: L;
};

export const RELEASE_LABELS: Record<Locale, Record<ReleaseKind, string>> = {
  en: { feature: "Feature", security: "Security", fix: "Fix" },
  tr: { feature: "Özellik", security: "Güvenlik", fix: "Düzeltme" },
  tk: { feature: "Aýratynlyk", security: "Howpsuzlyk", fix: "Düzediş" },
  az: { feature: "Yenilik", security: "Təhlükəsizlik", fix: "Düzəliş" },
};

export const SECTION_LABELS: Record<Locale, Record<SectionKind, string>> = {
  en: {
    added: "Added",
    changed: "Changed",
    fixed: "Fixed",
    security: "Security",
  },
  tr: {
    added: "Eklendi",
    changed: "Değiştirildi",
    fixed: "Düzeltildi",
    security: "Güvenlik",
  },
  tk: {
    added: "Goşuldy",
    changed: "Üýtgedildi",
    fixed: "Düzedildi",
    security: "Howpsuzlyk",
  },
  az: {
    added: "Əlavə edildi",
    changed: "Dəyişdirildi",
    fixed: "Düzəldildi",
    security: "Təhlükəsizlik",
  },
};

export const CHANGELOG_PAGE: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    more: string;
    latest: string;
  }
> = {
  en: {
    title: "Release notes",
    description:
      "Tamga Network releases: rules, documentation, open packages, trust lists and services.",
    eyebrow: "Release notes",
    lead: "Every release of the network, newest first. Package versions are listed separately on npm. Tamga Wallet keeps its own release notes.",
    more: "Package changelog on GitHub",
    latest: "Latest",
  },
  tr: {
    title: "Sürüm notları",
    description:
      "Tamga Network sürümleri: kurallar, belgeler, açık paketler, güven listeleri ve servisler.",
    eyebrow: "Sürüm notları",
    lead: "Ağın her sürümü, en yenisi üstte. Paket sürümleri npm'de ayrıca listelenir. Tamga Wallet kendi sürüm notlarını tutar.",
    more: "GitHub'da paket değişiklikleri",
    latest: "Son sürüm",
  },
  tk: {
    title: "Wersiýa bellikleri",
    description:
      "Tamga Network wersiýalary: düzgünler, resminamalar, açyk paketler, ynam sanawlary we hyzmatlar.",
    eyebrow: "Wersiýa bellikleri",
    lead: "Toruň her wersiýasy, iň täzesi ýokarda. Paket wersiýalary npm-de aýratyn görkezilýär. Tamga Wallet öz wersiýa belliklerini saklaýar.",
    more: "GitHub-da paket üýtgeşmeleri",
    latest: "Iň soňky",
  },
  az: {
    title: "Buraxılış qeydləri",
    description:
      "Tamga Network buraxılışları: qaydalar, sənədlər, açıq paketlər, etibar siyahıları və xidmətlər.",
    eyebrow: "Buraxılış qeydləri",
    lead: "Şəbəkənin hər buraxılışı, ən yenisi yuxarıda. Paket versiyaları npm-də ayrıca göstərilir. Tamga Wallet öz buraxılış qeydlərini ayrıca aparır.",
    more: "GitHub-da paket dəyişiklikləri",
    latest: "Ən son",
  },
};

export const RELEASES: Release[] = [
  {
    id: "v1.0.0-2026-10-21",
    version: "v1.0.0",
    date: "2026-10-21",
    kind: "feature",
    title: {
      en: "Browser sharing with ISO mdoc, stable pseudonyms, packages 0.7.1",
      tr: "Tarayıcıdan ISO mdoc paylaşımı, sabit takma adlar, paketler 0.7.1",
      tk: "Brauzerden ISO mdoc paýlaşmak, durnukly lakamlar, paketler 0.7.1",
      az: "Brauzerdən ISO mdoc paylaşımı, sabit təxəllüslər, paketlər 0.7.1",
    },
    sections: {
      added: {
        en: [
          "The wallet core now answers the browser's ISO/IEC 18013-7 Annex C request (org-iso-mdoc) through the Digital Credentials API; the request must be signed by the reader for the calling site and carry a registration certificate.",
          "Sandbox: a Digital Credentials API test page on the reference verifier (verify.sandbox.tamga.network/dc-api-test).",
        ],
        tr: [
          "Cüzdan çekirdeği artık tarayıcının ISO/IEC 18013-7 Ek C isteğini (org-iso-mdoc) Digital Credentials API üzerinden yanıtlar; istek, çağıran site için okuyucu tarafından imzalanmış olmalı ve kayıt sertifikası taşımalıdır.",
          "Sandbox: referans doğrulayıcıda Digital Credentials API deneme sayfası (verify.sandbox.tamga.network/dc-api-test).",
        ],
        tk: [
          "Gapjyk ýadrosy indi brauzeriň ISO/IEC 18013-7 C goşundysy boýunça haýyşyna (org-iso-mdoc) Digital Credentials API arkaly jogap berýär; haýyş çagyrýan saýt üçin okaýjy tarapyndan gol çekilen bolmaly we hasaba alyş şahadatnamasyny götermeli.",
          "Sandbox: salgylanma barlaýjyda Digital Credentials API synag sahypasy (verify.sandbox.tamga.network/dc-api-test).",
        ],
        az: [
          "Rəqəmsal cüzdan nüvəsi artıq brauzerin ISO/IEC 18013-7 Əlavə C sorğusuna (org-iso-mdoc) Digital Credentials API vasitəsilə cavab verir; sorğu çağıran sayt üçün oxuyucu tərəfindən imzalanmalı və qeydiyyat sertifikatı daşımalıdır.",
          "Sandbox: istinad yoxlayıcısında Digital Credentials API sınaq səhifəsi (verify.sandbox.tamga.network/dc-api-test).",
        ],
      },
      changed: {
        en: [
          "A per-site pseudonym is now always derived from the site's registered domain, never from its access certificate, so renewing a certificate does not change anyone's pseudonym. The packages are on npm as the 0.7.1 test release.",
        ],
        tr: [
          "Siteye özel takma ad artık her zaman sitenin kayıtlı alan adından türetilir, erişim sertifikasından değil; sertifika yenilense de kimsenin takma adı değişmez. Paketler npm'de 0.7.1 deneme sürümünde.",
        ],
        tk: [
          "Saýta degişli lakam indi elmydama saýtyň hasaba alnan domen adyndan alynýar, giriş şahadatnamasyndan däl; şahadatnama täzelense-de hiç kimiň lakamy üýtgemeýär. Paketler npm-de 0.7.1 synag wersiýasynda.",
        ],
        az: [
          "Sayta xas təxəllüs artıq həmişə saytın qeydiyyatdakı domen adından törədilir, giriş sertifikatından yox; sertifikat yenilənsə də heç kimin təxəllüsü dəyişmir. Paketlər npm-də 0.7.1 sınaq buraxılışı kimi mövcuddur.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-20",
    version: "v1.0.0",
    date: "2026-10-20",
    kind: "security",
    title: {
      en: "Safe package defaults, packages 0.7.0",
      tr: "Paketlerde güvenli varsayılanlar, paketler 0.7.0",
      tk: "Paketlerde howpsuz deslapky sazlamalar, paketler 0.7.0",
      az: "Paketlərdə təhlükəsiz standart parametrlər, paketlər 0.7.0",
    },
    sections: {
      security: {
        en: [
          "The @tamga-network/* packages now require every security input that affects the decision (trust anchors, status checks, the relying party's registration, the wallet's approval); a forgotten input is a rejection, and skipping a check has to be written explicitly.",
          "Requests without a registration certificate are now refused by the wallet, remotely and in person (the warning period until 2028 is removed).",
        ],
        tr: [
          "@tamga-network/* paketleri artık karara etki eden her güvenlik girdisini zorunlu ister (güven çapaları, iptal denetimi, güvenen tarafın kaydı, cüzdanın onayı); unutulan girdi ret demektir, bir denetimi atlamak açıkça yazılmalıdır.",
          "Kayıt sertifikası olmayan istekleri cüzdan artık reddeder, uzaktan ve yüz yüze (2028'e kadarki uyarı dönemi kaldırıldı).",
        ],
        tk: [
          "@tamga-network/* paketleri indi karara täsir edýän her bir howpsuzlyk girişini hökmany talap edýär (ynam çapalary, ýatyrma barlagy, ynanýan tarapyň hasaba alnyşy, gapjygyň tassyklamasy); ýatdan çykan giriş ret diýmekdir, barlagy geçmek aç-açan ýazylmalydyr.",
          "Hasaba alyş şahadatnamasy bolmadyk haýyşlary gapjyk indi ret edýär, uzakdan we ýüzbe-ýüz (2028-e çenli duýduryş döwri aýryldy).",
        ],
        az: [
          "@tamga-network/* paketləri artıq qərara təsir edən hər bir təhlükəsizlik girişini məcburi tələb edir (etibar ankerləri, ləğv yoxlaması, etibar edən tərəfin qeydiyyatı, rəqəmsal cüzdanın təsdiqi); unudulmuş giriş rədd deməkdir, yoxlamanı ötürmək isə açıq şəkildə yazılmalıdır.",
          "Qeydiyyat sertifikatı olmayan sorğuları rəqəmsal cüzdan artıq rədd edir, həm uzaqdan, həm də üz-üzə (2028-ci ilədək olan xəbərdarlıq dövrü ləğv edildi).",
        ],
      },
      changed: {
        en: [
          "The @tamga-network/* packages are on npm as the 0.7.0 test release; code written for 0.6.0 needs the new inputs.",
        ],
        tr: [
          "@tamga-network/* paketleri npm'de 0.7.0 deneme sürümünde; 0.6.0'a göre yazılmış kod yeni girdileri vermelidir.",
        ],
        tk: [
          "@tamga-network/* paketleri npm-de 0.7.0 synag wersiýasynda; 0.6.0 üçin ýazylan kod täze girişleri bermelidir.",
        ],
        az: [
          "@tamga-network/* paketləri npm-də 0.7.0 sınaq buraxılışı kimi mövcuddur; 0.6.0 üçün yazılmış kod yeni girişləri verməlidir.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-14",
    version: "v1.0.0",
    date: "2026-10-14",
    kind: "feature",
    title: {
      en: "Tamga Wallet listed, EU alignment, packages 0.6.0",
      tr: "Tamga Wallet listede, AB uyumu, paketler 0.6.0",
      tk: "Tamga Wallet sanawda, ÝB laýyklygy, paketler 0.6.0",
      az: "Tamga Wallet siyahıda, Avropa İttifaqı (Aİ) ilə uyğunlaşma, paketlər 0.6.0",
    },
    sections: {
      added: {
        en: [
          "Tamga Wallet's wallet provider is listed as active in the trust lists of the network and the sandbox — the first listed wallet. The network lists wallets; it runs none.",
          "Browser verification on iPhone and Mac Safari (ISO/IEC 18013-7 Annex C); on desktop the browser path is the default and the QR code stays as a fallback.",
        ],
        tr: [
          "Tamga Wallet'ın cüzdan sağlayıcısı ağın ve sandbox'ın güven listelerinde etkin olarak listelendi — listedeki ilk cüzdan. Ağ cüzdanları listeler, hiçbirini işletmez.",
          "iPhone ve Mac Safari'de tarayıcıdan doğrulama (ISO/IEC 18013-7 Ek C); masaüstünde varsayılan yol tarayıcı, QR yedekte kalır.",
        ],
        tk: [
          "Tamga Wallet-iň gapjyk üpjün edijisi toruň we sandbox-yň ynam sanawlarynda işjeň hökmünde sanawa goşuldy — sanawdaky ilkinji gapjyk. Tor gapjyklary sanawa goşýar, hiç birini işletmeýär.",
          "iPhone we Mac Safari-de brauzerden barlag (ISO/IEC 18013-7 C goşundy); stolüsti kompýuterde esasy ýol brauzer, QR ätiýaçda galýar.",
        ],
        az: [
          "Tamga Wallet-un cüzdan provayderi şəbəkənin və sandbox-un etibar siyahılarında aktiv kimi siyahıya alındı — siyahıdakı ilk rəqəmsal cüzdan. Şəbəkə rəqəmsal cüzdanları siyahıya alır, heç birini idarə etmir.",
          "iPhone və Mac Safari-də brauzer vasitəsilə yoxlama (ISO/IEC 18013-7 Əlavə C); masaüstü kompüterdə əsas yol brauzerdir, QR kod isə ehtiyat variant kimi qalır.",
        ],
      },
      changed: {
        en: [
          "Identity-service credentials can no longer be suspended, only revoked (EU rule for identity credentials); mdoc credentials use the EU status-list format (CWT).",
          'Requests without a registration certificate show a warning and default to "don\'t share"; from 2028-08-11 they are refused.',
          "The @tamga-network/* packages are on npm as the 0.6.0 test release.",
        ],
        tr: [
          "Kimlik servisinin belgeleri artık askıya alınamaz, yalnız iptal edilir (AB'nin kimlik belgesi kuralı); mdoc belgeleri AB iptal listesi biçimini (CWT) kullanır.",
          'Kayıt sertifikası olmayan istekler uyarı gösterir ve "paylaşma" ile başlar; 2028-08-11\'den sonra reddedilir.',
          "@tamga-network/* paketleri npm'de 0.6.0 deneme sürümünde.",
        ],
        tk: [
          "Şahsyýet hyzmatynyň resminamalary indi togtadylyp bilinmeýär, diňe ýatyrylýar (ÝB-niň şahsyýet resminamasy düzgüni); mdoc resminamalary ÝB ýatyrma sanawy görnüşini (CWT) ulanýar.",
          'Hasaba alyş şahadatnamasy bolmadyk haýyşlar duýduryş görkezýär we "paýlaşma" bilen başlaýar; 2028-08-11-den soň ret edilýär.',
          "@tamga-network/* paketleri npm-de 0.6.0 synag wersiýasynda.",
        ],
        az: [
          "Şəxsiyyət xidmətinin rəqəmsal sənədləri artıq dayandırıla bilməz, yalnız ləğv edilə bilər (şəxsiyyət sənədləri üçün Aİ qaydası); mdoc rəqəmsal sənədləri Aİ status siyahısı formatından (CWT) istifadə edir.",
          'Qeydiyyat sertifikatı olmayan sorğular xəbərdarlıq göstərir və "paylaşmayın" seçimi ilə başlayır; 2028-08-11-dən etibarən rədd edilir.',
          "@tamga-network/* paketləri npm-də 0.6.0 sınaq buraxılışı kimi mövcuddur.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-13",
    version: "v1.0.0",
    date: "2026-10-13",
    kind: "security",
    title: {
      en: "EU format alignment and security fixes, packages 0.5.2",
      tr: "AB biçim uyumu ve güvenlik düzeltmeleri, paketler 0.5.2",
      tk: "ÝB görnüş laýyklygy we howpsuzlyk düzedişleri, paketler 0.5.2",
      az: "Aİ format uyğunluğu və təhlükəsizlik düzəlişləri, paketlər 0.5.2",
    },
    sections: {
      changed: {
        en: [
          "Presentation requests follow the EU profile: issued-at time in the signed header, the certificate chain without the root, and one registration certificate per request.",
          "Wallet attestations are read only in the standard EU form.",
        ],
        tr: [
          "Sunum istekleri AB profiline uyar: imzalı başlıkta düzenlenme zamanı, kök sertifikasız zincir ve istek başına tek kayıt sertifikası.",
          "Cüzdan kanıtları yalnız standart AB biçiminde okunur.",
        ],
        tk: [
          "Görkeziş haýyşlary ÝB profiline laýyk: gol çekilen sözbaşyda berlen wagty, kök şahadatnamasyz zynjyr we her haýyşa bir hasaba alyş şahadatnamasy.",
          "Gapjyk subutnamalary diňe standart ÝB görnüşinde okalýar.",
        ],
        az: [
          "Təqdimat sorğuları Aİ profilinə uyğundur: imzalanmış başlıqda verilmə vaxtı, kök sertifikat olmadan sertifikat zənciri və hər sorğu üçün bir qeydiyyat sertifikatı.",
          "Rəqəmsal cüzdan attestasiyaları yalnız standart Aİ formasında oxunur.",
        ],
      },
      security: {
        en: [
          "Revocation-list fetching re-checks every redirect and connects only to the checked address; issuer-controlled addresses can no longer reach internal networks.",
        ],
        tr: [
          "İptal listesi alınırken her yönlendirme yeniden denetlenir ve yalnız denetlenen adrese bağlanılır; belge verenin denetlediği adresler artık iç ağlara ulaşamaz.",
        ],
        tk: [
          "Ýatyrma sanawy alnanda her gönükdirme gaýtadan barlanýar we diňe barlanan salga birikilýär; resminama berijiniň dolandyrýan salgylary indi içki torlara ýetip bilmeýär.",
        ],
        az: [
          "Ləğv siyahısı alınarkən hər yönləndirmə yenidən yoxlanılır və yalnız yoxlanılmış ünvana qoşulma həyata keçirilir; sənədi verən qurumun idarə etdiyi ünvanlar artıq daxili şəbəkələrə çata bilmir.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-12",
    version: "v1.0.0",
    date: "2026-10-12",
    kind: "feature",
    title: {
      en: "EU PID names, short-lived ZK copies, embedded disclosure policy, packages 0.4.0 and 0.5.0",
      tr: "AB kimlik alan adları, kısa ömürlü ZK kopyaları, gömülü paylaşım kuralı, paketler 0.4.0 ve 0.5.0",
      tk: "ÝB şahsyýet meýdan atlary, gysga ömürli ZK nusgalary, goşulan paýlaşma düzgüni, paketler 0.4.0 we 0.5.0",
      az: "Aİ PID adları, qısamüddətli ZK nüsxələri, daxili paylaşım siyasəti, paketlər 0.4.0 və 0.5.0",
    },
    sections: {
      added: {
        en: [
          "Institutions can set who may receive a credential type (embedded disclosure policy, ADR-0046). The wallet checks it offline; if it doesn't match, it warns and starts with \"don't share\".",
          "Zero-knowledge over-18 checks use short-lived copies (at most 24 hours, refreshed silently by the wallet); a revoked identity gets no new copies (ADR-0044).",
          "The trust packages read the EU's trusted-list format (ETSI TS 119 612, XML) and the Attestation Revocation List; the rulebooks follow the EU attestation rulebook template.",
        ],
        tr: [
          'Kurumlar bir belge türünü kimlerin alabileceğini belirleyebilir (gömülü paylaşım kuralı, ADR-0046). Cüzdan bunu internete çıkmadan denetler; uymazsa uyarır ve "paylaşma" ile başlar.',
          "Sıfır bilgi ispatıyla 18+ kontrolü kısa ömürlü kopyalarla yapılır (en çok 24 saat, cüzdan sessizce yeniler); iptal edilen kimlik yeni kopya alamaz (ADR-0044).",
          "Güven paketleri AB güven listesi biçimini (ETSI TS 119 612, XML) ve AB iptal listesini (Attestation Revocation List) okur; kural kitapları AB belge kural kitabı şablonuna uyar.",
        ],
        tk: [
          'Guramalar bir resminama görnüşini kimleriň alyp biljekdigini kesgitläp bilýär (goşulan paýlaşma düzgüni, ADR-0046). Gapjyk muny internete çykman barlaýar; gabat gelmese duýdurýar we "paýlaşma" bilen başlaýar.',
          "Nol bilimli subutnama bilen 18+ barlagy gysga ömürli nusgalar bilen geçirilýär (iň köp 24 sagat, gapjyk sessiz täzeleýär); ýatyrylan şahsyýet täze nusga alyp bilmeýär (ADR-0044).",
          "Ynam paketleri ÝB ynam sanawy görnüşini (ETSI TS 119 612, XML) we ÝB ýatyrma sanawyny (Attestation Revocation List) okaýar; düzgünnamalar ÝB resminama düzgünnamasy şablonyna laýyk.",
        ],
        az: [
          'Qurumlar bir rəqəmsal sənəd növünü kimlərin ala biləcəyini müəyyən edə bilər (daxili paylaşım siyasəti, ADR-0046). Rəqəmsal cüzdan bunu oflayn yoxlayır; uyğun gəlmədikdə xəbərdarlıq edir və "paylaşmayın" seçimi ilə başlayır.',
          "Sıfır bilik sübutu ilə 18 yaşdan yuxarı yoxlamaları qısamüddətli nüsxələrlə aparılır (ən çoxu 24 saat, rəqəmsal cüzdan onları səssizcə yeniləyir); ləğv edilmiş şəxsiyyət yeni nüsxə almır (ADR-0044).",
          "Etibar paketləri Aİ-nin etibar siyahısı formatını (ETSI TS 119 612, XML) və Attestation Revocation List-i oxuyur; qaydalar kitabları Aİ attestasiya qaydalar kitabı şablonuna uyğundur.",
        ],
      },
      changed: {
        en: [
          "The identity credential uses the EU PID attribute names: birthdate, and nationalities as a list (ADR-0045).",
        ],
        tr: [
          "Kimlik belgesi AB kimlik (PID) alan adlarını kullanır: birthdate ve liste olarak nationalities (ADR-0045).",
        ],
        tk: [
          "Şahsyýet resminamasy ÝB şahsyýet (PID) meýdan atlaryny ulanýar: birthdate we sanaw hökmünde nationalities (ADR-0045).",
        ],
        az: [
          "Şəxsiyyət rəqəmsal sənədi Aİ PID atribut adlarından istifadə edir: birthdate və siyahı şəklində nationalities (ADR-0045).",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-09",
    version: "v1.0.0",
    date: "2026-10-09",
    kind: "fix",
    title: {
      en: "OpenID4VCI/VP Final and HAIP alignment, packages 0.3.0 and 0.3.1",
      tr: "OpenID4VCI/VP Final ve HAIP uyumu, paketler 0.3.0 ve 0.3.1",
      tk: "OpenID4VCI/VP Final we HAIP laýyklygy, paketler 0.3.0 we 0.3.1",
      az: "OpenID4VCI/VP Final və HAIP uyğunluğu, paketlər 0.3.0 və 0.3.1",
    },
    sections: {
      changed: {
        en: [
          "Issuance follows OpenID4VCI 1.0 Final: key attestations use the type key-attestation+jwt, error codes match the standard, and the nonce comes only from the nonce endpoint.",
          "Revocation lists stay valid for 6 hours and are republished every 2 minutes: a revocation shows within minutes, and a short server outage does not stop checks. The revocation list endpoints keep no access log.",
        ],
        tr: [
          "Belge verme OpenID4VCI 1.0 Final'e uyar: anahtar kanıtının türü key-attestation+jwt, hata kodları standarttaki gibi, tek kullanımlık değer (nonce) yalnız kendi ucundan alınır.",
          "İptal listeleri 6 saat geçerli, 2 dakikada bir yenilenir: iptal birkaç dakikada görünür, sunucunun kısa kesintisi kontrolleri durdurmaz. İptal listesi uçları erişim kaydı tutmaz.",
        ],
        tk: [
          "Resminama bermek OpenID4VCI 1.0 Final-a laýyk: açar subutnamasynyň görnüşi key-attestation+jwt, ýalňyşlyk kodlary standartdaky ýaly, birgezeklik baha (nonce) diňe öz nokadyndan alynýar.",
          "Ýatyrma sanawlary 6 sagat güýjüne eýe we her 2 minutda täzelenýär: ýatyrma birnäçe minutda görünýär, serweriň gysga kesilmesi barlaglary saklamaýar. Ýatyrma sanawlarynyň nokatlary giriş ýazgysyny saklamaýar.",
        ],
        az: [
          "Rəqəmsal sənədlərin verilməsi OpenID4VCI 1.0 Final-a uyğundur: açar attestasiyaları key-attestation+jwt növündən istifadə edir, xəta kodları standarta uyğundur və nonce yalnız nonce endpoint-indən alınır.",
          "Ləğv siyahıları 6 saat etibarlı qalır və hər 2 dəqiqədən bir yenidən dərc edilir: ləğv bir neçə dəqiqə ərzində görünür, serverin qısa fasiləsi yoxlamaları dayandırmır. Ləğv siyahısı endpoint-ləri giriş jurnalı saxlamır.",
        ],
      },
    },
  },
  {
    id: "v1.0.0-2026-10-06",
    version: "v1.0.0",
    date: "2026-10-06",
    kind: "feature",
    title: {
      en: "Network and wallets separated",
      tr: "Ağ ve cüzdanlar ayrıldı",
      tk: "Tor we gapjyklar aýryldy",
      az: "Şəbəkə və rəqəmsal cüzdanlar ayrıldı",
    },
    sections: {
      changed: {
        en: [
          "Tamga Network runs no wallet (ADR-0042). It lists wallets in its trust list; Tamga Wallet, the network's first wallet, is a separate product and runs its own wallet provider.",
          "One sandbox for everyone: wallet, institution and verifier developers test on sandbox.tamga.network.",
        ],
        tr: [
          "Tamga Network cüzdan işletmez (ADR-0042). Cüzdanları güven listesinde listeler; ağın ilk cüzdanı Tamga Wallet ayrı bir üründür ve kendi cüzdan sağlayıcısını işletir.",
          "Herkes için tek sandbox: cüzdan, kurum ve doğrulayıcı geliştiricileri sandbox.tamga.network'te dener.",
        ],
        tk: [
          "Tamga Network gapjyk işletmeýär (ADR-0042). Gapjyklary ynam sanawynda görkezýär; toruň ilkinji gapjygy Tamga Wallet aýry önüm we öz gapjyk üpjün edijisini işledýär.",
          "Hemmeler üçin bir sandbox: gapjyk, gurama we barlaýjy işläp düzüjileri sandbox.tamga.network-da synaýar.",
        ],
        az: [
          "Tamga Network rəqəmsal cüzdan idarə etmir (ADR-0042). Şəbəkə rəqəmsal cüzdanları öz etibar siyahısına daxil edir; şəbəkənin ilk rəqəmsal cüzdanı olan Tamga Wallet ayrıca məhsuldur və öz cüzdan provayderini idarə edir.",
          "Hamı üçün bir sandbox: rəqəmsal cüzdan, qurum və yoxlayan tərəf tərtibatçıları sandbox.tamga.network-da sınaq aparır.",
        ],
      },
      added: {
        en: [
          "New open package @tamga-network/zk: the wallet side of zero-knowledge proofs for mdoc credentials, made on the device (ADR-0032).",
        ],
        tr: [
          "Yeni açık paket @tamga-network/zk: mdoc belgeleri için sıfır bilgi ispatının cüzdan tarafı, cihazda üretilir (ADR-0032).",
        ],
        tk: [
          "Täze açyk paket @tamga-network/zk: mdoc resminamalary üçin nol bilimli subutnamanyň gapjyk tarapy, enjamda döredilýär (ADR-0032).",
        ],
        az: [
          "Yeni açıq paket @tamga-network/zk: mdoc rəqəmsal sənədləri üçün sıfır bilik sübutlarının cüzdan tərəfi, sübutlar cihazda yaradılır (ADR-0032).",
        ],
      },
    },
  },
  {
    version: "v1.0.0",
    date: "2026-10-02",
    kind: "feature",
    title: {
      en: "First release",
      tr: "İlk yayın",
      tk: "Ilkinji çykyş",
      az: "İlk buraxılış",
    },
    sections: {
      added: {
        en: [
          "Rules: Tamga ARF 1.0 — the Architecture and Reference Framework, the Trust Framework, the Tamga Rulebook and the credential-type rulebooks (Education, Identity, Event Ticket).",
          "Developer documentation in English and Turkish: guides, concepts, specifications, decisions and a glossary.",
          "Open packages: @tamga-network/* on npm as test releases (0.x).",
          "Services: the trust list publisher, Tamga Verify and the network's reference services.",
          "Federation: reading external trust lists (ETSI TS 119 602).",
        ],
        tr: [
          "Kurallar: Tamga ARF 1.0 — Mimari ve Referans Çerçevesi, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları (Education, Identity, Event Ticket).",
          "İngilizce ve Türkçe geliştirici belgeleri: rehberler, kavramlar, şartnameler, kararlar ve sözlük.",
          "Açık paketler: npm'de @tamga-network/*, deneme sürümleri (0.x).",
          "Servisler: güven listesi yayıncısı, Tamga Verify ve ağın referans hizmetleri.",
          "Federasyon: dış güven listelerini okuma (ETSI TS 119 602).",
        ],
        tk: [
          "Düzgünler: Tamga ARF 1.0 — Arhitektura we salgylanma çarçuwasy, Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary (Education, Identity, Event Ticket).",
          "Iňlis we türk dillerinde işläp düzüjiler üçin resminamalar: gollanmalar, düşünjeler, spesifikasiýalar, kararlar we sözlük.",
          "Açyk paketler: npm-de @tamga-network/*, synag wersiýalary (0.x).",
          "Hyzmatlar: ynam sanawyny çap ediji, Tamga Verify we toruň salgylanma hyzmatlary.",
          "Federasiýa: daşky ynam sanawlaryny okamak (ETSI TS 119 602).",
        ],
        az: [
          "Qaydalar: Tamga ARF 1.0 — Arxitektura və İstinad Çərçivəsi (Architecture and Reference Framework), Trust Framework, Tamga Rulebook və rəqəmsal sənəd növlərinin rulebook-ları (Education, Identity, Event Ticket).",
          "İngilis və türk dillərində tərtibatçı sənədləri: bələdçilər, anlayışlar, spesifikasiyalar, qərarlar və lüğət.",
          "Açıq paketlər: npm-də @tamga-network/*, sınaq buraxılışları (0.x).",
          "Xidmətlər: etibar siyahısını dərc edən xidmət, Tamga Verify və şəbəkənin istinad xidmətləri.",
          "Federasiya: xarici etibar siyahılarının oxunması (ETSI TS 119 602).",
        ],
      },
    },
  },
];

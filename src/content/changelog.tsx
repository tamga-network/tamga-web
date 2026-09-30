import type { Locale } from "@/i18n/routing";

/*
 * Changelog — ağın sürümleri (sade dille). Sürüm numaraları ağın yayınlarıdır (paket sürümleri npm'de ayrıdır).
 * Kaynak: tamga-network ve tamga-web CHANGELOG.md, git geçmişi (tarihler). Yeni sürüm en üste; her metin üç dilde.
 */

type L = Record<Locale, string>;
type LL = Record<Locale, string[]>;

export type ReleaseKind = "feature" | "security" | "fix";
export type SectionKind = "added" | "changed" | "fixed" | "security";

export type Release = {
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
    title: "Changelog",
    description:
      "Tamga Network releases: wallet, issuing, verification, trust lists and the website.",
    eyebrow: "Changelog",
    lead: "Every release of the network, newest first. Package versions are listed separately on npm.",
    more: "Package changelog on GitHub",
    latest: "Latest",
  },
  tr: {
    title: "Changelog",
    description:
      "Tamga Network sürümleri: cüzdan, belge verme, doğrulama, güven listeleri ve web sitesi.",
    eyebrow: "Changelog",
    lead: "Ağın her sürümü, en yenisi üstte. Paket sürümleri npm'de ayrıca listelenir.",
    more: "GitHub'da paket değişiklikleri",
    latest: "Son sürüm",
  },
  tk: {
    title: "Changelog",
    description:
      "Tamga Network wersiýalary: gapjyk, resminama bermek, barlag, ynam sanawlary we web saýt.",
    eyebrow: "Changelog",
    lead: "Toruň her wersiýasy, iň täzesi ýokarda. Paket wersiýalary npm-de aýratyn görkezilýär.",
    more: "GitHub-da paket üýtgeşmeleri",
    latest: "Iň soňky",
  },
};

export const RELEASES: Release[] = [
  {
    version: "v0.4.0",
    date: "2026-09-30",
    kind: "feature",
    title: {
      en: "Groundwork for the store app; a new website menu",
      tr: "Mağaza uygulamasına hazırlık; sitede yeni menü",
      tk: "Dükan programmasyna taýýarlyk; saýtda täze menýu",
    },
    sections: {
      added: {
        en: [
          "keys in the phone's secure hardware (Secure Enclave, StrongBox) and device attestation checked by the wallet provider",
          "showing a credential in person over Bluetooth (ISO 18013-5) and from the browser (Digital Credentials API)",
          "build configuration for the App Store and Google Play",
          "API reference at docs.tamga.network/api: issuing API, verifier API and institution lookup endpoint",
          "website: new menus (desktop and phone), SDK page, “Become an issuer”, roadmap, changelog and the known-shortcuts page",
        ],
        tr: [
          "anahtarlar telefonun güvenli donanımında (Secure Enclave, StrongBox); cihaz kanıtını cüzdan sağlayıcı denetler",
          "belgeyi Bluetooth ile yüz yüze (ISO 18013-5) ve tarayıcıdan (Digital Credentials API) gösterme",
          "App Store ve Google Play derleme yapılandırması",
          "API başvurusu: docs.tamga.network/api — belge verme API'si, doğrulayıcı API'si ve kurum sorgu ucu",
          "web sitesi: yeni menüler (masaüstü ve telefon), SDK sayfası, “Kurum olarak katıl”, yol haritası, changelog ve bilinen kısayollar sayfası",
        ],
        tk: [
          "açarlar telefonyň howpsuz enjamynda (Secure Enclave, StrongBox); enjam subutnamasyny gapjyk üpjün edijisi barlaýar",
          "resminamany Bluetooth arkaly ýüzbe-ýüz (ISO 18013-5) we brauzerden (Digital Credentials API) görkezmek",
          "App Store we Google Play üçin gurluş sazlamasy",
          "API salgylanmasy: docs.tamga.network/api — resminama beriş API-si, barlaýjy API-si we gurama gözleg nokady",
          "web saýt: täze menýular (kompýuter we telefon), SDK sahypasy, “Gurama hökmünde goşul”, ýol kartasy, changelog we belli gysga ýollar sahypasy",
        ],
      },
      changed: {
        en: [
          "password-protected move file for a new phone (EU format); the history is exported only when the person asks",
          "student credential: ECTS workload and enrolment date, fields mapped to the European Learning Model",
          "whitepaper and manifesto PDFs re-typeset; tables instead of aligned text in the docs",
        ],
        tr: [
          "yeni telefon için parolayla korunan taşıma dosyası (AB biçimi); geçmiş yalnız kişi isteyince dışa aktarılır",
          "öğrenci belgesi: AKTS iş yükü ve kayıt tarihi; alanlar Avrupa Öğrenme Modeli'ne eşlendi",
          "whitepaper ve manifesto PDF'leri yeniden dizildi; belgelerde hizalı metin yerine tablolar",
        ],
        tk: [
          "täze telefon üçin parol bilen goralan geçiriş faýly (ÝB görnüşi); taryh diňe adam islände eksport edilýär",
          "talyp resminamasy: AKTS iş ýüki we hasaba alnan senesi; meýdanlar Ýewropa Öwreniş Modeline laýyklaşdyryldy",
          "whitepaper we manifest PDF-leri täzeden düzüldi; resminamalarda deňlenen tekstiň ýerine tablisalar",
        ],
      },
    },
    note: {
      en: "Device features are coded and tested with simulated devices; testing on phones follows the first store build.",
      tr: "Cihaz özellikleri kodlandı ve benzetilmiş cihazlarla test edildi; telefonda test ilk mağaza derlemesiyle.",
      tk: "Enjam aýratynlyklary kodlandy we meňzedilen enjamlar bilen synag edildi; telefonda synag ilkinji dükan gurluşy bilen.",
    },
  },
  {
    version: "v0.3.0",
    date: "2026-09-29",
    kind: "feature",
    title: {
      en: "EU registration model; the person's data stays at the institution",
      tr: "AB kayıt modeli; kişinin verisi kurumda kalır",
      tk: "ÝB hasaba alyş modeli; adamyň maglumaty guramada galýar",
    },
    sections: {
      added: {
        en: [
          "identity-bound offers and a lookup endpoint at the institution instead of uploading records",
          "EU registration data for institutions and verifiers; registration certificates checked by the wallet",
          "signed institution metadata; the wallet checks that an institution is registered for a credential type",
          "verified e-mail and phone credentials",
          "wallet: English and Turkish interface, deletion request and complaint to the data protection authority",
        ],
        tr: [
          "toplu kayıt yükleme yerine kimliğe bağlı teklif ve kurumda sorgu ucu",
          "kurumlar ve doğrulayıcılar için AB kayıt verisi; kayıt sertifikalarını cüzdan denetler",
          "imzalı kurum metadata'sı; cüzdan kurumun o belge türü için kayıtlı olduğunu denetler",
          "doğrulanmış e-posta ve telefon belgeleri",
          "cüzdan: İngilizce ve Türkçe arayüz, silme talebi ve veri koruma kurumuna şikâyet",
        ],
        tk: [
          "köpçülikleýin ýazgy ýüklemegiň ýerine şahsyýete baglanan teklip we guramada gözleg nokady",
          "guramalar we barlaýjylar üçin ÝB hasaba alyş maglumatlary; hasaba alyş sertifikatlaryny gapjyk barlaýar",
          "gol çekilen gurama metadata-sy; gapjyk guramanyň şol görnüş üçin hasaba alnandygyny barlaýar",
          "tassyklanan e-poçta we telefon resminamalary",
          "gapjyk: iňlis we türk dilinde interfeýs, pozmak haýyşy we maglumat goraýyş edarasyna şikaýat",
        ],
      },
      security: {
        en: [
          "access tokens bound to the wallet's key (DPoP)",
          "the wallet refreshes used copies on its own, never sharing a copy twice",
        ],
        tr: [
          "erişim belirteçleri cüzdan anahtarına bağlı (DPoP)",
          "cüzdan kullanılan kopyaları kendisi yeniler; bir kopya iki kez paylaşılmaz",
        ],
        tk: [
          "giriş belgileri gapjyk açaryna baglanan (DPoP)",
          "gapjyk ulanylan nusgalary özi täzeleýär; bir nusga iki gezek paýlaşylmaýar",
        ],
      },
    },
  },
  {
    version: "v0.2.0",
    date: "2026-09-28",
    kind: "feature",
    title: {
      en: "Institution Console; packages on npm",
      tr: "Kurum Konsolu; npm'de paketler",
      tk: "Gurama konsoly; npm-de paketler",
    },
    sections: {
      added: {
        en: [
          "Institution Console for issuing, revocation and statistics (console.tamga.network)",
          "open-source @tamga-network packages published as pre-release 0.1.0",
          "gate counters for turnstiles: accepted, rejected and why — numbers only, no personal data",
        ],
        tr: [
          "belge verme, iptal ve istatistik için Kurum Konsolu (console.tamga.network)",
          "açık kaynak @tamga-network paketleri ön sürüm 0.1.0 olarak yayınlandı",
          "turnikeler için kapı sayaçları: kabul, red ve nedeni — yalnız sayı, kişisel veri yok",
        ],
        tk: [
          "resminama bermek, ýatyrmak we statistika üçin Gurama konsoly (console.tamga.network)",
          "açyk çeşmeli @tamga-network paketleri deslapky wersiýa 0.1.0 hökmünde çap edildi",
          "turniketler üçin gapy hasaplaýjylary: kabul, ret we sebäbi — diňe san, şahsy maglumat ýok",
        ],
      },
      changed: {
        en: [
          "the wallet file is encrypted on the device; document numbers are stored only as a keyed hash",
        ],
        tr: [
          "cüzdan dosyası cihazda şifreli; belge numarası yalnız anahtarlı özet olarak tutulur",
        ],
        tk: [
          "gapjyk faýly enjamda şifrlenen; resminama belgisi diňe açarly heş hökmünde saklanýar",
        ],
      },
    },
  },
  {
    version: "v0.1.1",
    date: "2026-09-27",
    kind: "security",
    title: {
      en: "Line-by-line security review",
      tr: "Satır satır güvenlik incelemesi",
      tk: "Setirme-setir howpsuzlyk barlagy",
    },
    sections: {
      fixed: {
        en: [
          "the wallet checks the issuer against the trust list before storing a credential",
          "verifier impersonation and response redirection blocked; revocation lists bound to the trust list",
          "increasing wait after wrong PINs",
        ],
        tr: [
          "cüzdan belgeyi saklamadan önce kurumu güven listesinde denetler",
          "doğrulayıcı taklidi ve yanıt yönlendirmesi engellendi; iptal listeleri güven listesine bağlı",
          "yanlış PIN'de artan bekleme",
        ],
        tk: [
          "gapjyk resminamany saklamazdan öň guramany ynam sanawynda barlaýar",
          "barlaýjynyň öýkünmesi we jogabyň başga ýere ugradylmagy bökdeldi; ýatyrylyş sanawlary ynam sanawyna baglanan",
          "nädogry PIN-de artýan garaşma",
        ],
      },
    },
  },
  {
    version: "v0.1.0",
    date: "2026-09-27",
    kind: "feature",
    title: {
      en: "First public release",
      tr: "İlk açık sürüm",
      tk: "Ilkinji açyk wersiýa",
    },
    sections: {
      added: {
        en: [
          "issuing and presenting student credentials and diplomas; revocation and suspension",
          "identity check and identity credential, also as ISO mdoc",
          "signed trust lists with a public anchor log; public credential-type catalogue",
          "campus and event passes, single-use tickets; website sign-up and passkey sign-in",
          "three doors to the documentation: this site, docs.tamga.network and the Tamga ARF; whitepaper v3.0",
        ],
        tr: [
          "öğrenci belgesi ve diploma verme ve gösterme; iptal ve askıya alma",
          "kimlik doğrulama ve kimlik belgesi, ISO mdoc olarak da",
          "herkese açık çapa günlüğüyle imzalı güven listeleri; herkese açık belge türü kataloğu",
          "kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; web sitesine kayıt ve passkey ile giriş",
          "belgelere üç kapı: bu site, docs.tamga.network ve Tamga ARF; whitepaper v3.0",
        ],
        tk: [
          "talyp resminamasyny we diplomy bermek we görkezmek; ýatyrmak we togtatmak",
          "şahsyýet barlagy we şahsyýet resminamasy, ISO mdoc görnüşinde hem",
          "açyk labyr žurnaly bilen gol çekilen ynam sanawlary; açyk resminama görnüşi katalogy",
          "kampus we çäre geçiş kartalary, bir gezeklik biletler; web saýta hasaba durmak we passkey bilen giriş",
          "resminamalara üç gapy: bu saýt, docs.tamga.network we Tamga ARF; whitepaper v3.0",
        ],
      },
    },
  },
];

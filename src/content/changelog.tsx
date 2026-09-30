import type { Locale } from "@/i18n/routing";

/*
 * Değişiklik günlüğü — kullanıcıya görünen, sade dille. Kaynak: tamga-network ve tamga-web CHANGELOG.md, git geçmişi (tarihler).
 * Yeni kayıt en üste; her kayıt üç dilde. Paket ayrıntısı geliştirici belgelerinde.
 */

export type ChangeKind = "added" | "changed" | "security";
export type ChangeEntry = {
  date: string;
  kind: ChangeKind;
  title: Record<Locale, string>;
  items: Record<Locale, string[]>;
};

export const CHANGE_LABELS: Record<Locale, Record<ChangeKind, string>> = {
  en: { added: "Added", changed: "Changed", security: "Security" },
  tr: { added: "Eklendi", changed: "Değişti", security: "Güvenlik" },
  tk: { added: "Goşuldy", changed: "Üýtgedi", security: "Howpsuzlyk" },
};

export const CHANGELOG_PAGE: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    more: string;
  }
> = {
  en: {
    title: "Changelog",
    description:
      "What changed in Tamga Network: wallet, issuing, verification, trust lists and the website.",
    eyebrow: "Changelog",
    lead: "Notable changes, newest first. Package-level details are in the developer docs.",
    more: "Package changelog on GitHub",
  },
  tr: {
    title: "Değişiklik günlüğü",
    description:
      "Tamga Network'te neler değişti: cüzdan, belge verme, doğrulama, güven listeleri ve web sitesi.",
    eyebrow: "Değişiklik günlüğü",
    lead: "Öne çıkan değişiklikler, en yenisi üstte. Paket ayrıntıları geliştirici belgelerinde.",
    more: "GitHub'da paket değişiklik günlüğü",
  },
  tk: {
    title: "Üýtgeşmeler žurnaly",
    description:
      "Tamga Network-de näme üýtgedi: gapjyk, resminama bermek, barlag, ynam sanawlary we web saýt.",
    eyebrow: "Üýtgeşmeler žurnaly",
    lead: "Esasy üýtgeşmeler, iň täzesi ýokarda. Paket jikme-jiklikleri işläp düzüji resminamalarynda.",
    more: "GitHub-da paket üýtgeşmeler žurnaly",
  },
};

export const CHANGELOG: ChangeEntry[] = [
  {
    date: "2026-09-30",
    kind: "added",
    title: {
      en: "Website: ecosystem menu, roadmap, changelog, “Become an issuer”",
      tr: "Web sitesi: Ekosistem menüsü, yol haritası, değişiklik günlüğü, “Kurum olarak katıl”",
      tk: "Web saýt: Ekoulgam menýusy, ýol kartasy, üýtgeşmeler žurnaly, “Gurama hökmünde goşul”",
    },
    items: {
      en: [
        "all public addresses of the network in one table and in the header menu",
        "tables instead of aligned text in the docs and the whitepaper; whitepaper and manifesto PDFs re-typeset",
      ],
      tr: [
        "ağın bütün herkese açık adresleri tek tabloda ve üst menüde",
        "belgelerde ve whitepaper'da hizalı metin yerine tablolar; whitepaper ve manifesto PDF'leri yeniden dizildi",
      ],
      tk: [
        "toruň ähli açyk salgylary bir tablisada we ýokarky menýuda",
        "resminamalarda we whitepaper-de deňlenen tekstiň ýerine tablisalar; whitepaper we manifest PDF-leri täzeden düzüldi",
      ],
    },
  },
  {
    date: "2026-09-30",
    kind: "added",
    title: {
      en: "Groundwork for the store app",
      tr: "Mağaza uygulaması için altyapı",
      tk: "Dükan programmasy üçin binýat",
    },
    items: {
      en: [
        "keys in the phone's secure hardware (Secure Enclave, StrongBox) and device attestation checked by the wallet provider",
        "showing a credential in person over Bluetooth (ISO 18013-5) and from the browser (Digital Credentials API)",
        "build configuration for the App Store and Google Play; device testing follows with the first build",
      ],
      tr: [
        "anahtarlar telefonun güvenli donanımında (Secure Enclave, StrongBox); cihaz kanıtını cüzdan sağlayıcı denetler",
        "belgeyi Bluetooth ile yüz yüze (ISO 18013-5) ve tarayıcıdan (Digital Credentials API) gösterme",
        "App Store ve Google Play derleme yapılandırması; cihaz testi ilk derlemeyle",
      ],
      tk: [
        "açarlar telefonyň howpsuz enjamynda (Secure Enclave, StrongBox); enjam subutnamasyny gapjyk üpjün edijisi barlaýar",
        "resminamany Bluetooth arkaly ýüzbe-ýüz (ISO 18013-5) we brauzerden (Digital Credentials API) görkezmek",
        "App Store we Google Play üçin gurluş sazlamasy; enjam synagy ilkinji gurluş bilen",
      ],
    },
  },
  {
    date: "2026-09-30",
    kind: "changed",
    title: {
      en: "Moving to a new phone; student credential closer to the EU model",
      tr: "Yeni telefona taşıma; öğrenci belgesi AB modeline daha yakın",
      tk: "Täze telefona geçirmek; talyp resminamasy ÝB modeline has ýakyn",
    },
    items: {
      en: [
        "password-protected move file (EU format); the history is exported only when the person asks",
        "student credential: ECTS workload and enrolment date; fields mapped to the European Learning Model",
      ],
      tr: [
        "parolayla korunan taşıma dosyası (AB biçimi); geçmiş yalnız kişi isteyince dışa aktarılır",
        "öğrenci belgesi: AKTS iş yükü ve kayıt tarihi; alanlar Avrupa Öğrenme Modeli'ne eşlendi",
      ],
      tk: [
        "parol bilen goralan geçiriş faýly (ÝB görnüşi); taryh diňe adam islände eksport edilýär",
        "talyp resminamasy: AKTS iş ýüki we hasaba alnan senesi; meýdanlar Ýewropa Öwreniş Modeline laýyklaşdyryldy",
      ],
    },
  },
  {
    date: "2026-09-29",
    kind: "added",
    title: {
      en: "Registration, signed metadata, verified contact credentials",
      tr: "Kayıt, imzalı metadata, doğrulanmış iletişim belgeleri",
      tk: "Hasaba alyş, gol çekilen metadata, tassyklanan aragatnaşyk resminamalary",
    },
    items: {
      en: [
        "the person's data stays at the institution: identity-bound offers and a lookup endpoint instead of uploads",
        "EU registration data for institutions and verifiers; registration certificates checked by the wallet",
        "signed institution metadata; the wallet checks that an institution is registered for a credential type",
        "verified e-mail and phone credentials; tokens bound to the wallet's key (DPoP)",
      ],
      tr: [
        "kişinin verisi kurumda kalır: toplu yükleme yerine kimliğe bağlı teklif ve sorgu ucu",
        "kurumlar ve doğrulayıcılar için AB kayıt verisi; kayıt sertifikalarını cüzdan denetler",
        "imzalı kurum metadata'sı; cüzdan kurumun o belge türü için kayıtlı olduğunu denetler",
        "doğrulanmış e-posta ve telefon belgeleri; erişim belirteçleri cüzdan anahtarına bağlı (DPoP)",
      ],
      tk: [
        "adamyň maglumaty guramada galýar: köpçülikleýin ýüklemegiň ýerine şahsyýete baglanan teklip we gözleg nokady",
        "guramalar we barlaýjylar üçin ÝB hasaba alyş maglumatlary; hasaba alyş sertifikatlaryny gapjyk barlaýar",
        "gol çekilen gurama metadata-sy; gapjyk guramanyň şol görnüş üçin hasaba alnandygyny barlaýar",
        "tassyklanan e-poçta we telefon resminamalary; giriş belgileri gapjyk açaryna baglanan (DPoP)",
      ],
    },
  },
  {
    date: "2026-09-28",
    kind: "added",
    title: {
      en: "Packages on npm; Institution Console",
      tr: "npm'de paketler; Kurum Konsolu",
      tk: "npm-de paketler; Gurama konsoly",
    },
    items: {
      en: [
        "open-source @tamga-network packages published as pre-release 0.1.0",
        "Institution Console for issuing, revocation and statistics; gate counters without personal data",
      ],
      tr: [
        "açık kaynak @tamga-network paketleri ön sürüm 0.1.0 olarak yayınlandı",
        "belge verme, iptal ve istatistik için Kurum Konsolu; kişisel verisiz kapı sayaçları",
      ],
      tk: [
        "açyk çeşmeli @tamga-network paketleri deslapky wersiýa 0.1.0 hökmünde çap edildi",
        "resminama bermek, ýatyrmak we statistika üçin Gurama konsoly; şahsy maglumatsyz gapy hasaplaýjylary",
      ],
    },
  },
  {
    date: "2026-09-27",
    kind: "security",
    title: {
      en: "Line-by-line security review",
      tr: "Satır satır güvenlik incelemesi",
      tk: "Setirme-setir howpsuzlyk barlagy",
    },
    items: {
      en: [
        "the wallet checks the issuer against the trust list before storing a credential",
        "verifier impersonation and response redirection blocked; revocation lists bound to the trust list",
        "wallet file encrypted on the device; increasing wait after wrong PINs",
      ],
      tr: [
        "cüzdan belgeyi saklamadan önce kurumu güven listesinde denetler",
        "doğrulayıcı taklidi ve yanıt yönlendirmesi engellendi; iptal listeleri güven listesine bağlı",
        "cüzdan dosyası cihazda şifreli; yanlış PIN'de artan bekleme",
      ],
      tk: [
        "gapjyk resminamany saklamazdan öň guramany ynam sanawynda barlaýar",
        "barlaýjynyň öýkünmesi we jogabyň başga ýere ugradylmagy bökdeldi; ýatyrylyş sanawlary ynam sanawyna baglanan",
        "gapjyk faýly enjamda şifrlenen; nädogry PIN-de artýan garaşma",
      ],
    },
  },
  {
    date: "2026-09-27",
    kind: "added",
    title: {
      en: "Three doors to the documentation; whitepaper v3.0",
      tr: "Belgelere üç kapı; whitepaper v3.0",
      tk: "Resminamalara üç gapy; whitepaper v3.0",
    },
    items: {
      en: [
        "general docs on this site, developer docs at docs.tamga.network, the architecture framework at arf.tamga.network",
        "whitepaper v3.0 on the current architecture: signed trust lists, SD-JWT VC and ISO mdoc",
      ],
      tr: [
        "bu sitede genel belgeler, docs.tamga.network'te geliştirici belgeleri, arf.tamga.network'te mimari çerçeve",
        "güncel mimariyle whitepaper v3.0: imzalı güven listeleri, SD-JWT VC ve ISO mdoc",
      ],
      tk: [
        "bu saýtda umumy resminamalar, docs.tamga.network-de işläp düzüji resminamalary, arf.tamga.network-de arhitektura çarçuwasy",
        "häzirki arhitektura bilen whitepaper v3.0: gol çekilen ynam sanawlary, SD-JWT VC we ISO mdoc",
      ],
    },
  },
];

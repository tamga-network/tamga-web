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
};

export const RELEASES: Release[] = [
  {
    id: "v1.0.0-2026-10-14",
    version: "v1.0.0",
    date: "2026-10-14",
    kind: "feature",
    title: {
      en: "Tamga Wallet listed, EU alignment, packages 0.6.0",
      tr: "Tamga Wallet listede, AB uyumu, paketler 0.6.0",
      tk: "Tamga Wallet sanawda, ÝB laýyklygy, paketler 0.6.0",
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
    },
    sections: {
      added: {
        en: [
          'Institutions can set who may receive a credential type (embedded disclosure policy, ADR-0046). The wallet checks it offline; if it doesn\'t match, it warns and starts with "don\'t share".',
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
      },
    },
  },
];

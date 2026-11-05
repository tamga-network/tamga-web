import type { Locale } from "@/i18n/routing";

/*
 * Yol haritası — koşullu aşamalar, tarihsiz (kamuya açık depo: takvim, iş planı yok). Kaynak: whitepaper (2026-11 baskısı)
 * Bölüm 22.2 Tablo 47 (Liste aşaması / Hazırlık / Vakıf / Defter / Devlet katılımı / Kurumsal genişleme), 22.1 Tablo 46
 * (işlev durumları), 22.3 (sağlık önerisi), 23.3 (araştırma yönleri), 18.3 (yönetişim aşamaları); FW-ARF-0001 §8.1.
 * Kurum adı, anlaşma ya da görüşme imâsı yok; devletler için yalnız "yer ayrılmıştır".
 * Kart simgeleri sayfada lucide adlarıyla eşlenir (ICONS). Araştırma bloğu n: "r" (sayfa numara yerine etiket gösterir).
 */

export type RoadmapState = "done" | "progress" | "planned" | "research";
export type RoadmapIcon =
  | "shield"
  | "wallet"
  | "list"
  | "id"
  | "ticket"
  | "building"
  | "package"
  | "smartphone"
  | "cpu"
  | "key"
  | "plug"
  | "bluetooth"
  | "globe"
  | "graduation"
  | "network"
  | "flag"
  | "eye"
  | "user"
  | "briefcase"
  | "test";
export type RoadmapCard = { icon: RoadmapIcon; title: string; desc: string };
export type RoadmapPhase = {
  n: string;
  state: RoadmapState;
  title: string;
  summary: string;
  cards: RoadmapCard[];
};

export type RoadmapContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  phaseLabel: string;
  labels: Record<RoadmapState, string>;
  phases: RoadmapPhase[];
  note: string;
};

const en: RoadmapContent = {
  meta: {
    title: "Roadmap",
    description:
      "The Tamga Network roadmap covers what is live today and the conditional stages that follow: preparation, the foundation, the shared ledger, state participation and institutional expansion.",
  },
  eyebrow: "Roadmap",
  title: "From signed lists to a shared ledger",
  lead: "The roadmap is organised by conditions, not dates. Each stage depends on a condition, several of them outside the network's own hands, and no stage changes the identifiers set up in an earlier one.",
  phaseLabel: "Phase",
  labels: {
    done: "Live",
    progress: "In progress",
    planned: "Planned",
    research: "Research",
  },
  phases: [
    {
      n: "1",
      state: "done",
      title: "List stage (today)",
      summary:
        "The full flow already works end to end in the sandbox, with real cryptography and on the network's live software. “Live” does not mean an institution already uses it: on the real network's Türkiye list the only active issuer today is the network's provisional identity service, and institution credentials will follow the same path as the first institutions join.",
      cards: [
        {
          icon: "shield",
          title: "Issuing and verification",
          desc: "student credentials and diplomas, revocation and suspension",
        },
        {
          icon: "id",
          title: "Identity credential",
          desc: "remote identity check; also as ISO mdoc",
        },
        {
          icon: "list",
          title: "Signed trust lists",
          desc: "institutions, verifiers, gate groups and a public anchor log; an ETSI XML view in the sandbox",
        },
        {
          icon: "ticket",
          title: "Passes and tickets",
          desc: "campus and event gates, single-use tickets",
        },
        {
          icon: "building",
          title: "Institution Console",
          desc: "issuing, revocation and statistics",
        },
        {
          icon: "list",
          title: "Rules 1.0",
          desc: "Tamga ARF 1.0, the Tamga Rulebook and the credential-type rulebooks; docs in two languages",
        },
        {
          icon: "globe",
          title: "Federation",
          desc: "reading external trust lists (ETSI TS 119 602 and the EU's TS 119 612 XML lists)",
        },
        {
          icon: "package",
          title: "Open-source packages",
          desc: "@tamga-network: 0.8.1 test release on npm; the stable 1.0.0 when everything is ready",
        },
        {
          icon: "user",
          title: "Per-site pseudonyms",
          desc: "every website sees a different, stable pseudonym",
        },
        {
          icon: "test",
          title: "Sandbox",
          desc: "one test network for wallet, institution and verifier developers",
        },
        {
          icon: "wallet",
          title: "Listed wallets",
          desc: "the network lists wallet providers; the first, Tamga Wallet's, is active in the trust list",
        },
      ],
    },
    {
      n: "2",
      state: "progress",
      title: "Preparation",
      summary:
        "Condition: store releases and device tests of the listed wallets. Device attestation, Bluetooth and the browser path go live, and the first institutions join the real network. Credential types and the root and institution identifiers do not change.",
      cards: [
        {
          icon: "smartphone",
          title: "Wallets in the stores",
          desc: "wallets on the network in the app stores (the first: Tamga Wallet)",
        },
        {
          icon: "cpu",
          title: "Secure hardware",
          desc: "keys in the phone's secure chip; device attestation required",
        },
        {
          icon: "bluetooth",
          title: "In person and in the browser",
          desc: "Bluetooth and the Digital Credentials API, on real phones",
        },
        {
          icon: "eye",
          title: "Zero-knowledge proofs",
          desc: "age proof without the birth date; verifier ready, phone after the store release",
        },
        {
          icon: "building",
          title: "First institutions",
          desc: "institutions join the real network as issuers, on the path that already works in the sandbox",
        },
        {
          icon: "key",
          title: "Institution's key",
          desc: "the signing key in the institution's own key vault",
        },
        {
          icon: "plug",
          title: "Authentic source",
          desc: "the first link to an institution's own lookup endpoint",
        },
        {
          icon: "test",
          title: "EU cross-testing",
          desc: "EU interoperability events and the OpenID conformance plans",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Foundation",
      summary:
        "Condition: the foundation gaining legal personality. Operation passes to a non-profit foundation; the list operator's name, the root identifier, credential types and credentials already issued stay the same.",
      cards: [
        {
          icon: "building",
          title: "Handover to the foundation",
          desc: "the network is operated by a non-profit foundation; the lists keep their identity",
        },
        {
          icon: "list",
          title: "XML list on the real network",
          desc: "the ETSI TS 119 612 XML view, live in the sandbox today, also on the real network",
        },
        {
          icon: "id",
          title: "Identity service certificate",
          desc: "the provisional identity service's certificate is renewed",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Ledger",
      summary:
        "Condition: written acceptance by at least two independent operators, and equivalence tests. The signed lists remain the source and the verification pipeline does not change.",
      cards: [
        {
          icon: "network",
          title: "Shared ledger",
          desc: "permissioned Besu / QBFT; the digest of the lists is also written to the ledger",
        },
        {
          icon: "key",
          title: "More than one signer",
          desc: "trust no longer rests on a single operator's signature",
        },
      ],
    },
    {
      n: "5",
      state: "planned",
      title: "State participation",
      summary:
        "Condition: a state publishing its own list. That is the state's own decision, not the network's. Institution identifiers, credential types and credentials already issued do not change.",
      cards: [
        {
          icon: "flag",
          title: "State lists",
          desc: "each state publishes its own trust list and the list of lists points to it; today only the Türkiye slot is active, and for other states a place is only reserved (not an agreement or negotiation)",
        },
        {
          icon: "id",
          title: "PID",
          desc: "the state's person identification data fills its reserved place; the provisional identity service does not replace PID",
        },
        {
          icon: "building",
          title: "Council",
          desc: "the council is set up and the provisional roles are handed over",
        },
      ],
    },
    {
      n: "6",
      state: "planned",
      title: "Institutional expansion",
      summary:
        "Condition: thresholds set by the council. New sectors join, each with its own decision; the network's principles do not change.",
      cards: [
        {
          icon: "briefcase",
          title: "New sectors",
          desc: "new sector schemes, each added by its own decision",
        },
        {
          icon: "shield",
          title: "Health (proposed)",
          desc: "credentials for health professionals; the proposal is on hold while education is the first sector",
        },
      ],
    },
    {
      n: "r",
      state: "research",
      title: "Research",
      summary:
        "These directions have no decision today and are named as such. Each one can only be opened by a separate decision.",
      cards: [
        {
          icon: "user",
          title: "Pseudonyms with zero knowledge",
          desc: "deriving per-site pseudonyms with a proof, once zero-knowledge libraries mature in wallets",
        },
        {
          icon: "key",
          title: "Post-quantum algorithms",
          desc: "no decision yet; followed through the choices of the EU and standards bodies",
        },
        {
          icon: "key",
          title: "Qualified e-signature",
          desc: "outside today's scope; only with a separate decision",
        },
        {
          icon: "briefcase",
          title: "Institution wallets",
          desc: "organisations as credential holders; outside today's scope",
        },
      ],
    },
  ],
  note: "You can find the details in the whitepaper's chapters 22, “Status, Roadmap and Open Decisions”, and 23, “Limits and Open Questions”.",
};

const tr: RoadmapContent = {
  meta: {
    title: "Yol haritası",
    description:
      "Tamga Network yol haritası bugün yayında olanları ve ardından gelen koşullu aşamaları anlatır: hazırlık, vakıf, ortak defter, devlet katılımı ve kurumsal genişleme.",
  },
  eyebrow: "Yol haritası",
  title: "İmzalı listelerden ortak deftere",
  lead: "Yol haritası tarihlere göre değil, koşullara göre düzenlendi. Her aşama bir koşula bağlıdır, bu koşulların bir kısmı ağın kendi elinde değildir ve hiçbir aşama önceki aşamada kurulan kimlikleri değiştirmez.",
  phaseLabel: "Aşama",
  labels: {
    done: "Yayında",
    progress: "Devam ediyor",
    planned: "Planlanıyor",
    research: "Araştırma",
  },
  phases: [
    {
      n: "1",
      state: "done",
      title: "Liste aşaması (bugün)",
      summary:
        "Akışın tamamı bugün sandbox'ta, gerçek kriptografiyle ve ağın canlıdaki yazılımıyla uçtan uca çalışıyor. “Yayında” bir kurumun bunu kullandığı anlamına gelmez: gerçek ağın Türkiye listesinde bugün etkin tek belge veren ağın geçici kimlik servisidir; kurum belgeleri ilk kurumlar katıldıkça aynı yoldan verilecek.",
      cards: [
        {
          icon: "shield",
          title: "Belge verme ve doğrulama",
          desc: "öğrenci belgesi ve diploma, iptal ve askıya alma",
        },
        {
          icon: "id",
          title: "Kimlik belgesi",
          desc: "uzaktan kimlik doğrulama; ISO mdoc olarak da",
        },
        {
          icon: "list",
          title: "İmzalı güven listeleri",
          desc: "kurumlar, doğrulayıcılar, kapı grupları ve herkese açık çapa günlüğü; sandbox'ta ETSI XML görünümü",
        },
        {
          icon: "ticket",
          title: "Geçiş kartları ve biletler",
          desc: "kampüs ve etkinlik kapıları, tek kullanımlık biletler",
        },
        {
          icon: "building",
          title: "Kurum Konsolu",
          desc: "belge verme, iptal ve istatistik",
        },
        {
          icon: "list",
          title: "Kurallar 1.0",
          desc: "Tamga ARF 1.0, Tamga Rulebook ve belge türü rulebook'ları; belgeler iki dilde",
        },
        {
          icon: "globe",
          title: "Federasyon",
          desc: "dış güven listelerini okuma (ETSI TS 119 602 ve AB'nin TS 119 612 XML listeleri)",
        },
        {
          icon: "package",
          title: "Açık kaynak paketler",
          desc: "@tamga-network: npm'de 0.8.1 deneme sürümü; kararlı 1.0.0 hazır olunca",
        },
        {
          icon: "user",
          title: "Site başına takma ad",
          desc: "her site farklı ve kalıcı bir takma ad görür",
        },
        {
          icon: "test",
          title: "Sandbox",
          desc: "cüzdan, kurum ve doğrulayıcı geliştiricileri için tek test ağı",
        },
        {
          icon: "wallet",
          title: "Listeli cüzdanlar",
          desc: "ağ cüzdan sağlayıcılarını listeler; ilki, Tamga Wallet'ınki, güven listesinde etkin",
        },
      ],
    },
    {
      n: "2",
      state: "progress",
      title: "Hazırlık",
      summary:
        "Koşul: listeli cüzdanların mağaza sürümleri ve cihaz testleri. Cihaz kanıtı, Bluetooth ve tarayıcı yolları canlıya geçer; ilk kurumlar gerçek ağa katılır. Belge türleri, kök ve kurum kimlikleri değişmez.",
      cards: [
        {
          icon: "smartphone",
          title: "Mağazadaki cüzdanlar",
          desc: "ağdaki cüzdanlar uygulama mağazalarında (ilki Tamga Wallet)",
        },
        {
          icon: "cpu",
          title: "Güvenli donanım",
          desc: "anahtarlar telefonun güvenli çipinde; cihaz kanıtı zorunlu",
        },
        {
          icon: "bluetooth",
          title: "Yüz yüze ve tarayıcıda",
          desc: "Bluetooth ve Digital Credentials API, gerçek telefonlarda",
        },
        {
          icon: "eye",
          title: "Sıfır bilgi ispatı",
          desc: "doğum tarihi olmadan yaş ispatı; doğrulayıcı hazır, telefon mağaza sürümünden sonra",
        },
        {
          icon: "building",
          title: "İlk kurumlar",
          desc: "kurumlar gerçek ağa belge veren olarak, sandbox'ta bugün çalışan yoldan katılır",
        },
        {
          icon: "key",
          title: "Kurumun anahtarı",
          desc: "imza anahtarı kurumun kendi anahtar kasasında",
        },
        {
          icon: "plug",
          title: "Yetkili kaynak",
          desc: "bir kurumun kendi sorgu ucuna ilk bağlantı",
        },
        {
          icon: "test",
          title: "AB ile karşılıklı test",
          desc: "AB birlikte çalışabilirlik etkinlikleri ve OpenID uyum test planları",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Vakıf",
      summary:
        "Koşul: vakfın tüzel kişilik kazanması. İşletmecilik kâr amacı gütmeyen vakfa geçer; liste işletmecisinin adı, kök kimliği, belge türleri ve verilmiş belgeler aynı kalır.",
      cards: [
        {
          icon: "building",
          title: "Vakfa devir",
          desc: "ağı kâr amacı gütmeyen bir vakıf işletir; listeler kimliğini korur",
        },
        {
          icon: "list",
          title: "Gerçek ağda XML liste",
          desc: "bugün sandbox'ta çalışan ETSI TS 119 612 XML görünümü gerçek ağda da",
        },
        {
          icon: "id",
          title: "Kimlik servisi sertifikası",
          desc: "geçici kimlik servisinin sertifikası yenilenir",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Defter",
      summary:
        "Koşul: en az iki bağımsız işletmecinin yazılı kabulü ve eşdeğerlik testleri. İmzalı listeler kaynak kalır, doğrulama hattı değişmez.",
      cards: [
        {
          icon: "network",
          title: "Ortak defter",
          desc: "izinli Besu / QBFT; listelerin özeti deftere de yazılır",
        },
        {
          icon: "key",
          title: "Birden çok imzacı",
          desc: "güven artık tek işletmecinin imzasına dayanmaz",
        },
      ],
    },
    {
      n: "5",
      state: "planned",
      title: "Devlet katılımı",
      summary:
        "Koşul: bir devletin kendi listesini yayınlaması. Bu, ağın değil o devletin kendi kararıdır. Kurum kimlikleri, belge türleri ve verilmiş belgeler değişmez.",
      cards: [
        {
          icon: "flag",
          title: "Devlet listeleri",
          desc: "her devlet kendi güven listesini yayınlar, listelerin listesi onu gösterir; bugün yalnız Türkiye yuvası etkin, öteki devletler için yalnızca yer ayrılmıştır (anlaşma ya da görüşme bildirimi değildir)",
        },
        {
          icon: "id",
          title: "PID",
          desc: "devletin kişi kimlik verisi ayrılmış yerini doldurur; geçici kimlik servisi PID yerine geçmez",
        },
        {
          icon: "building",
          title: "Konsey",
          desc: "konsey kurulur, geçici roller devredilir",
        },
      ],
    },
    {
      n: "6",
      state: "planned",
      title: "Kurumsal genişleme",
      summary:
        "Koşul: konseyin belirlediği eşikler. Yeni sektörler her biri kendi kararıyla katılır; ağın ilkeleri değişmez.",
      cards: [
        {
          icon: "briefcase",
          title: "Yeni sektörler",
          desc: "yeni sektör şemaları, her biri kendi kararıyla",
        },
        {
          icon: "shield",
          title: "Sağlık (öneri)",
          desc: "sağlık meslek mensupları için belgeler; ilk sektör eğitim olduğu için öneri askıda",
        },
      ],
    },
    {
      n: "r",
      state: "research",
      title: "Araştırma",
      summary:
        "Bu yönlerin bugün kararı yok ve öyle anılıyor. Her biri ancak ayrı bir kararla açılabilir.",
      cards: [
        {
          icon: "user",
          title: "Sıfır bilgiyle takma ad",
          desc: "site başına takma adın bir ispatla türetilmesi; cüzdanlarda sıfır bilgi kütüphaneleri olgunlaşınca",
        },
        {
          icon: "key",
          title: "Kuantum sonrası algoritmalar",
          desc: "henüz karar yok; AB'nin ve standart kuruluşlarının seçimleri izleniyor",
        },
        {
          icon: "key",
          title: "Nitelikli e-imza",
          desc: "bugünkü kapsamın dışında; ancak ayrı bir kararla",
        },
        {
          icon: "briefcase",
          title: "Kurum cüzdanları",
          desc: "belge sahibi olarak kurumlar; bugünkü kapsamın dışında",
        },
      ],
    },
  ],
  note: "Ayrıntıları whitepaper'ın 22. “Durum, Yol Haritası ve Açık Kararlar” ve 23. “Sınırlar ve Açık Sorular” bölümlerinde bulabilirsiniz.",
};

const tk: RoadmapContent = {
  meta: {
    title: "Ýol kartasy",
    description:
      "Tamga Network ýol kartasy häzir işleýän zatlary we soňky şertli tapgyrlary düşündirýär: taýýarlyk, gazna, umumy kitap, döwletiň goşulmagy we institusional giňelme.",
  },
  eyebrow: "Ýol kartasy",
  title: "Gol çekilen sanawlardan umumy kitaba",
  lead: "Ýol kartasy senelere görä däl, şertlere görä düzüldi. Her tapgyr bir şerte bagly, bu şertleriň bir bölegi toruň öz elinde däl we hiç bir tapgyr öňki tapgyrda döredilen belgileri üýtgetmeýär.",
  phaseLabel: "Tapgyr",
  labels: {
    done: "Işleýär",
    progress: "Dowam edýär",
    planned: "Meýilleşdirilýär",
    research: "Gözleg",
  },
  phases: [
    {
      n: "1",
      state: "done",
      title: "Sanaw tapgyry (häzir)",
      summary:
        "Akymyň hemmesi häzir sandbox-da, hakyky kriptografiýa bilen we toruň işleýän programma üpjünçiliginde başdan-aýak işleýär. “Işleýär” bir guramanyň muny ulanýandygyny aňlatmaýar: hakyky toruň Türkiýe sanawynda häzir işjeň ýeke-täk resminama beriji toruň wagtlaýyn şahsyýet hyzmatydyr; gurama resminamalary ilkinji guramalar goşuldygyça şol bir ýol bilen berler.",
      cards: [
        {
          icon: "shield",
          title: "Bermek we barlamak",
          desc: "talyp resminamasy we diplom, ýatyrmak we togtatmak",
        },
        {
          icon: "id",
          title: "Şahsyýet resminamasy",
          desc: "uzakdan şahsyýet barlagy; ISO mdoc görnüşinde hem",
        },
        {
          icon: "list",
          title: "Gol çekilen ynam sanawlary",
          desc: "guramalar, barlaýjylar, gapy toparlary we açyk labyr žurnaly; sandbox-da ETSI XML görnüşi",
        },
        {
          icon: "ticket",
          title: "Geçiş kartalary we biletler",
          desc: "kampus we çäre gapylary, bir gezeklik biletler",
        },
        {
          icon: "building",
          title: "Gurama konsoly",
          desc: "resminama bermek, ýatyrmak we statistika",
        },
        {
          icon: "list",
          title: "Düzgünler 1.0",
          desc: "Tamga ARF 1.0, Tamga Rulebook we resminama görnüşleriniň rulebook-lary; resminamalar iki dilde",
        },
        {
          icon: "globe",
          title: "Federasiýa",
          desc: "daşky ynam sanawlaryny okamak (ETSI TS 119 602 we ÝB-niň TS 119 612 XML sanawlary)",
        },
        {
          icon: "package",
          title: "Açyk çeşmeli paketler",
          desc: "@tamga-network: npm-de 0.8.1 synag wersiýasy; durnukly 1.0.0 taýýar bolanda",
        },
        {
          icon: "user",
          title: "Saýt başyna lakam",
          desc: "her saýt başga we hemişelik lakam görýär",
        },
        {
          icon: "test",
          title: "Sandbox",
          desc: "gapjyk, gurama we barlaýjy işläp düzüjileri üçin bir synag tory",
        },
        {
          icon: "wallet",
          title: "Sanawdaky gapjyklar",
          desc: "tor gapjyk üpjün edijilerini sanawa goşýar; birinjisi, Tamga Wallet-iňki, ynam sanawynda işjeň",
        },
      ],
    },
    {
      n: "2",
      state: "progress",
      title: "Taýýarlyk",
      summary:
        "Şert: sanawdaky gapjyklaryň dükan wersiýalary we enjam synaglary. Enjam tassyklamasy, Bluetooth we brauzer ýollary janly bolýar; ilkinji guramalar hakyky tora goşulýar. Resminama görnüşleri, kök we gurama belgileri üýtgemeýär.",
      cards: [
        {
          icon: "smartphone",
          title: "Dükandaky gapjyklar",
          desc: "tordaky gapjyklar programma dükanlarynda (ilkinjisi Tamga Wallet)",
        },
        {
          icon: "cpu",
          title: "Howpsuz enjam",
          desc: "açarlar telefonyň howpsuz çipinde; enjam subutnamasy hökmany",
        },
        {
          icon: "bluetooth",
          title: "Ýüzbe-ýüz we brauzerde",
          desc: "Bluetooth we Digital Credentials API, hakyky telefonlarda",
        },
        {
          icon: "eye",
          title: "Nol bilimli subutnama",
          desc: "doglan senesiz ýaş subutnamasy; barlaýjy taýýar, telefon dükan wersiýasyndan soň",
        },
        {
          icon: "building",
          title: "Ilkinji guramalar",
          desc: "guramalar hakyky tora resminama beriji hökmünde, sandbox-da häzir işleýän ýol bilen goşulýar",
        },
        {
          icon: "key",
          title: "Guramanyň açary",
          desc: "gol açary guramanyň öz açar ammarynda",
        },
        {
          icon: "plug",
          title: "Ygtyýarly çeşme",
          desc: "guramanyň öz gözleg nokadyna ilkinji birikme",
        },
        {
          icon: "test",
          title: "ÝB bilen özara synag",
          desc: "ÝB-niň özara işleşme çäreleri we OpenID laýyklyk synag meýilnamalary",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Gazna",
      summary:
        "Şert: gaznanyň ýuridik şahs bolmagy. Operatorlyk girdeji gazanmagy maksat edinmeýän gaznaga geçýär; sanaw operatorynyň ady, kök belgisi, resminama görnüşleri we berlen resminamalar üýtgemeýär.",
      cards: [
        {
          icon: "building",
          title: "Gaznaga tabşyrmak",
          desc: "tory girdeji gazanmagy maksat edinmeýän gazna dolandyrýar; sanawlar öz belgilerini saklaýar",
        },
        {
          icon: "list",
          title: "Hakyky torda XML sanaw",
          desc: "häzir sandbox-da işleýän ETSI TS 119 612 XML görnüşi hakyky torda hem",
        },
        {
          icon: "id",
          title: "Şahsyýet hyzmatynyň sertifikaty",
          desc: "wagtlaýyn şahsyýet hyzmatynyň sertifikaty täzelenýär",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Kitap",
      summary:
        "Şert: azyndan iki garaşsyz operatoryň ýazmaça razylygy we deňgüýçlilik synaglary. Gol çekilen sanawlar çeşme bolup galýar, barlag hatary üýtgemeýär.",
      cards: [
        {
          icon: "network",
          title: "Umumy kitap",
          desc: "rugsatly Besu / QBFT; sanawlaryň heşi kitaba-da ýazylýar",
        },
        {
          icon: "key",
          title: "Birnäçe gol çekiji",
          desc: "ynam indi ýeke operatoryň golyna daýanmaýar",
        },
      ],
    },
    {
      n: "5",
      state: "planned",
      title: "Döwletiň goşulmagy",
      summary:
        "Şert: döwletiň öz sanawyny çap etmegi. Bu toruň däl, şol döwletiň öz karary. Gurama belgileri, resminama görnüşleri we berlen resminamalar üýtgemeýär.",
      cards: [
        {
          icon: "flag",
          title: "Döwlet sanawlary",
          desc: "her döwlet öz ynam sanawyny çap edýär, sanawlaryň sanawy şony görkezýär; häzir diňe Türkiýe orny işjeň, beýleki döwletler üçin diňe orun goýuldy (ylalaşyk ýa-da gepleşik habary däl)",
        },
        {
          icon: "id",
          title: "PID",
          desc: "döwletiň şahsyýet maglumatlary goýlan ornuny doldurýar; wagtlaýyn şahsyýet hyzmaty PID-iň ornuny tutmaýar",
        },
        {
          icon: "building",
          title: "Maslahat",
          desc: "maslahat döredilýär, wagtlaýyn rollar tabşyrylýar",
        },
      ],
    },
    {
      n: "6",
      state: "planned",
      title: "Institusional giňelme",
      summary:
        "Şert: maslahatyň kesgitlän çäkleri. Täze pudaklar her biri öz karary bilen goşulýar; toruň ýörelgeleri üýtgemeýär.",
      cards: [
        {
          icon: "briefcase",
          title: "Täze pudaklar",
          desc: "täze pudak shemalary, her biri öz karary bilen",
        },
        {
          icon: "shield",
          title: "Saglyk (teklip)",
          desc: "saglyk hünärmenleri üçin resminamalar; ilkinji pudak bilim bolany üçin teklip togtadyldy",
        },
      ],
    },
    {
      n: "r",
      state: "research",
      title: "Gözleg",
      summary:
        "Bu ugurlaryň häzir karary ýok we şeýle diýlip agzalýar. Olaryň her biri diňe aýratyn karar bilen açylyp bilner.",
      cards: [
        {
          icon: "user",
          title: "Nol bilim bilen lakam",
          desc: "saýt başyna lakamy subutnama bilen almak; gapjyklarda nol bilim kitaphanalary kämilleşende",
        },
        {
          icon: "key",
          title: "Kwantdan soňky algoritmler",
          desc: "heniz karar ýok; ÝB-niň we standart guramalarynyň saýlawlary yzarlanýar",
        },
        {
          icon: "key",
          title: "Kwalifisirlenen elektron gol",
          desc: "häzirki gerimiň daşynda; diňe aýratyn karar bilen",
        },
        {
          icon: "briefcase",
          title: "Gurama gapjyklary",
          desc: "resminama eýesi hökmünde guramalar; häzirki gerimiň daşynda",
        },
      ],
    },
  ],
  note: "Jikme-jiklikleri whitepaper-iň 22-nji “Ýagdaý, Ýol Kartasy we Açyk Kararlar” we 23-nji “Çäkler we Açyk Soraglar” bölümlerinde tapyp bilersiňiz.",
};

const az: RoadmapContent = {
  meta: {
    title: "Yol xəritəsi",
    description:
      "Tamga Network-un yol xəritəsi bu gün işlək olanları və ardınca gələn şərti mərhələləri izah edir: hazırlıq, fond, ortaq reyestr, dövlətin qoşulması və institusional genişlənmə.",
  },
  eyebrow: "Yol xəritəsi",
  title: "İmzalı siyahılardan ortaq reyestrə",
  lead: "Yol xəritəsi tarixlərə görə yox, şərtlərə görə qurulub. Hər mərhələ bir şərtə bağlıdır, bu şərtlərin bir hissəsi şəbəkənin öz əlində deyil və heç bir mərhələ əvvəlki mərhələdə qurulan identifikatorları dəyişmir.",
  phaseLabel: "Mərhələ",
  labels: {
    done: "İşləkdir",
    progress: "Davam edir",
    planned: "Planlaşdırılır",
    research: "Tədqiqat",
  },
  phases: [
    {
      n: "1",
      state: "done",
      title: "Siyahı mərhələsi (bu gün)",
      summary:
        "Bütün axın bu gün sandbox-da, real kriptoqrafiya ilə və şəbəkənin işlək proqram təminatı üzərində əvvəldən sona qədər işləyir. “İşləkdir” bir qurumun bundan istifadə etdiyi demək deyil: real şəbəkənin Türkiyə siyahısında bu gün aktiv olan yeganə sənəd verən şəbəkənin müvəqqəti şəxsiyyət xidmətidir; qurum sənədləri ilk qurumlar qoşulduqca eyni yolla veriləcək.",
      cards: [
        {
          icon: "shield",
          title: "Sənəd vermə və yoxlama",
          desc: "tələbə rəqəmsal sənədləri və diplomlar, ləğv və dayandırma",
        },
        {
          icon: "id",
          title: "Şəxsiyyət sənədi",
          desc: "məsafədən şəxsiyyət yoxlaması; ISO mdoc formatında da",
        },
        {
          icon: "list",
          title: "İmzalı etibar siyahıları",
          desc: "qurumlar, yoxlayan tərəflər, keçid qrupları və açıq lövbər jurnalı; sandbox-da ETSI XML görünüşü",
        },
        {
          icon: "ticket",
          title: "Keçid kartları və biletlər",
          desc: "kampus və tədbir girişləri, birdəfəlik biletlər",
        },
        {
          icon: "building",
          title: "Qurum Konsolu",
          desc: "sənəd vermə, ləğv və statistika",
        },
        {
          icon: "list",
          title: "Qaydalar 1.0",
          desc: "Tamga ARF 1.0, Tamga Rulebook və rəqəmsal sənəd növlərinin rulebook-ları; sənədləşmə iki dildə",
        },
        {
          icon: "globe",
          title: "Federasiya",
          desc: "xarici etibar siyahılarının oxunması (ETSI TS 119 602 və Avropa İttifaqının (Aİ) TS 119 612 XML siyahıları)",
        },
        {
          icon: "package",
          title: "Açıq mənbəli paketlər",
          desc: "@tamga-network: npm-də 0.8.1 test buraxılışı; sabit 1.0.0 hər şey hazır olduqda",
        },
        {
          icon: "user",
          title: "Sayta görə təxəllüslər",
          desc: "hər veb-sayt fərqli, sabit təxəllüs görür",
        },
        {
          icon: "test",
          title: "Sandbox",
          desc: "rəqəmsal cüzdan, qurum və yoxlayan tərəf tərtibatçıları üçün vahid test şəbəkəsi",
        },
        {
          icon: "wallet",
          title: "Siyahıdakı cüzdanlar",
          desc: "şəbəkə cüzdan provayderlərini siyahıya alır; birincisi, Tamga Wallet-ın provayderi, etibar siyahısında aktivdir",
        },
      ],
    },
    {
      n: "2",
      state: "progress",
      title: "Hazırlıq",
      summary:
        "Şərt: siyahıdakı cüzdanların mağaza versiyaları və cihaz testləri. Cihaz sübutu, Bluetooth və brauzer yolları canlıya keçir; ilk qurumlar real şəbəkəyə qoşulur. Sənəd növləri, kök və qurum identifikatorları dəyişmir.",
      cards: [
        {
          icon: "smartphone",
          title: "Mağazalarda cüzdanlar",
          desc: "şəbəkədəki rəqəmsal cüzdanlar tətbiq mağazalarında (birincisi: Tamga Wallet)",
        },
        {
          icon: "cpu",
          title: "Təhlükəsiz avadanlıq",
          desc: "açarlar telefonun təhlükəsiz çipində; cihaz attestasiyası tələb olunur",
        },
        {
          icon: "bluetooth",
          title: "Üz-üzə və brauzerdə",
          desc: "Bluetooth və Digital Credentials API, real telefonlarda",
        },
        {
          icon: "eye",
          title: "Sıfır bilikli sübutlar",
          desc: "doğum tarixi olmadan yaş sübutu; yoxlayan tərəf hazırdır, telefon mağaza buraxılışından sonra",
        },
        {
          icon: "building",
          title: "İlk qurumlar",
          desc: "qurumlar real şəbəkəyə sənəd verən kimi, sandbox-da bu gün işləyən yolla qoşulur",
        },
        {
          icon: "key",
          title: "Qurumun açarı",
          desc: "imza açarı qurumun öz açar anbarında",
        },
        {
          icon: "plug",
          title: "Mötəbər mənbə",
          desc: "qurumun öz sorğu nöqtəsi ilə ilk əlaqə",
        },
        {
          icon: "test",
          title: "Aİ ilə qarşılıqlı test",
          desc: "Aİ qarşılıqlı fəaliyyət tədbirləri və OpenID uyğunluq test planları",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Fond",
      summary:
        "Şərt: fondun hüquqi şəxs statusu qazanması. Operatorluq qeyri-kommersiya fonduna keçir; siyahı operatorunun adı, kökün identifikatoru, sənəd növləri və verilmiş sənədlər eyni qalır.",
      cards: [
        {
          icon: "building",
          title: "Fonda təhvil",
          desc: "şəbəkəni qeyri-kommersiya fondu idarə edir; siyahılar öz identifikatorlarını saxlayır",
        },
        {
          icon: "list",
          title: "Real şəbəkədə XML siyahı",
          desc: "bu gün sandbox-da işləyən ETSI TS 119 612 XML görünüşü real şəbəkədə də",
        },
        {
          icon: "id",
          title: "Şəxsiyyət xidmətinin sertifikatı",
          desc: "müvəqqəti şəxsiyyət xidmətinin sertifikatı yenilənir",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Reyestr",
      summary:
        "Şərt: ən azı iki müstəqil operatorun yazılı razılığı və ekvivalentlik testləri. İmzalı siyahılar mənbə olaraq qalır, yoxlama xətti dəyişmir.",
      cards: [
        {
          icon: "network",
          title: "Ortaq reyestr",
          desc: "icazəli Besu / QBFT; siyahıların hash-i reyestrə də yazılır",
        },
        {
          icon: "key",
          title: "Bir neçə imzaçı",
          desc: "etibar artıq tək operatorun imzasına söykənmir",
        },
      ],
    },
    {
      n: "5",
      state: "planned",
      title: "Dövlətin qoşulması",
      summary:
        "Şərt: dövlətin öz siyahısını dərc etməsi. Bu, şəbəkənin deyil, həmin dövlətin öz qərarıdır. Qurum identifikatorları, sənəd növləri və verilmiş sənədlər dəyişmir.",
      cards: [
        {
          icon: "flag",
          title: "Dövlət siyahıları",
          desc: "hər dövlət öz etibar siyahısını dərc edir, siyahılar siyahısı ona istinad edir; bu gün yalnız Türkiyə yeri aktivdir, digər dövlətlər üçün yalnız yer ayrılıb (saziş və ya danışıq bildirişi deyil)",
        },
        {
          icon: "id",
          title: "PID",
          desc: "dövlətin şəxs identifikasiya məlumatları ayrılmış yeri doldurur; müvəqqəti şəxsiyyət xidməti PID-i əvəz etmir",
        },
        {
          icon: "building",
          title: "Şura",
          desc: "şura qurulur, müvəqqəti rollar təhvil verilir",
        },
      ],
    },
    {
      n: "6",
      state: "planned",
      title: "İnstitusional genişlənmə",
      summary:
        "Şərt: şuranın müəyyən etdiyi həddlər. Yeni sektorlar hər biri öz qərarı ilə qoşulur; şəbəkənin prinsipləri dəyişmir.",
      cards: [
        {
          icon: "briefcase",
          title: "Yeni sektorlar",
          desc: "yeni sektor sxemləri, hər biri öz qərarı ilə",
        },
        {
          icon: "shield",
          title: "Səhiyyə (təklif)",
          desc: "səhiyyə mütəxəssisləri üçün sənədlər; ilk sektor təhsil olduğu üçün təklif dayandırılıb",
        },
      ],
    },
    {
      n: "r",
      state: "research",
      title: "Tədqiqat",
      summary:
        "Bu istiqamətlərin bu gün qərarı yoxdur və elə də adlandırılır. Hər biri yalnız ayrıca qərarla açıla bilər.",
      cards: [
        {
          icon: "user",
          title: "Sıfır biliklə psevdonim",
          desc: "sayta görə təxəllüsün sübutla törədilməsi; cüzdanlarda sıfır bilik kitabxanaları yetişdikdə",
        },
        {
          icon: "key",
          title: "Kvantdan sonrakı alqoritmlər",
          desc: "hələ qərar yoxdur; Aİ-nin və standart təşkilatlarının seçimləri izlənilir",
        },
        {
          icon: "key",
          title: "Kvalifikasiyalı elektron imza",
          desc: "bugünkü əhatədən kənarda; yalnız ayrıca qərarla",
        },
        {
          icon: "briefcase",
          title: "Qurum cüzdanları",
          desc: "rəqəmsal sənəd sahibi kimi təşkilatlar; bugünkü əhatədən kənarda",
        },
      ],
    },
  ],
  note: "Ətraflı məlumatı whitepaper-in 22-ci “Status, Yol Xəritəsi və Açıq Qərarlar” və 23-cü “Hədlər və Açıq Suallar” fəsillərində tapa bilərsiniz.",
};

const content: Record<Locale, RoadmapContent> = { en, tr, tk, az };

export function getRoadmapContent(locale: string): RoadmapContent {
  return content[locale as Locale] ?? content.en;
}

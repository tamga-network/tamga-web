import type { Locale } from "@/i18n/routing";

/*
 * Yol haritası — aşamalar, tarihsiz (kamuya açık depo: takvim, iş planı yok). Kaynak: whitepaper v1.0 "Durum ve yol
 * haritası" (Faz B / Pilot / Faz 0 / Faz 1), tamga-network STATUS 42. tur, backlog Z1–Z5, DECISIONS D-BC-6.
 * Kart simgeleri sayfada lucide adlarıyla eşlenir (ICONS).
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
      "Tamga Network roadmap: what is live today, what comes before the pilot, the pilot, and the move from lists to a shared ledger.",
  },
  eyebrow: "Roadmap",
  title: "From signed lists to a shared ledger",
  lead: "Stages, not dates. Each stage completes and strengthens the one before.",
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
      title: "Live today",
      summary:
        "The full flow works end to end with real cryptography, in the sandbox, on the network's live software; the first real institution joins with the pilot.",
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
          desc: "institutions, verifiers and a public anchor log",
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
          desc: "@tamga-network: 0.7.1 test release on npm; the stable 1.0.0 when everything is ready",
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
      title: "Before the pilot",
      summary: "What an institution needs before real people use it.",
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
          icon: "bluetooth",
          title: "In person and in the browser",
          desc: "Bluetooth and the Digital Credentials API, on real phones",
        },
        {
          icon: "eye",
          title: "Zero-knowledge proofs",
          desc: "age proof without the birth date; verifier ready, phone after the store release",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Pilot",
      summary:
        "One university, a limited group, success and stop criteria set in advance.",
      cards: [
        {
          icon: "graduation",
          title: "University pilot",
          desc: "student credential, diploma and campus access",
        },
        {
          icon: "test",
          title: "EU cross-testing",
          desc: "with EU reference wallets and verifiers",
        },
        {
          icon: "globe",
          title: "Europass",
          desc: "a Europass-compatible form of education credentials (under evaluation)",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Network expansion",
      summary: "More operators, more states.",
      cards: [
        {
          icon: "network",
          title: "Shared ledger",
          desc: "permissioned Besu / QBFT once at least two independent operators join",
        },
        {
          icon: "flag",
          title: "Member-state lists",
          desc: "each state publishes its own trust list; Tamga’s list of lists points to it",
        },
        {
          icon: "bluetooth",
          title: "Close range over NFC",
          desc: "with reader authentication",
        },
      ],
    },
    {
      n: "5",
      state: "research",
      title: "Research",
      summary:
        "Studied, not yet planned; independent security review before any use.",
      cards: [
        {
          icon: "key",
          title: "Qualified e-signature",
          desc: "signing from the wallet with a licensed provider",
        },
        {
          icon: "briefcase",
          title: "Institution wallets",
          desc: "organisations as credential holders",
        },
      ],
    },
  ],
  note: "Details: the whitepaper's “Status and roadmap” and “Known limits” sections.",
};

const tr: RoadmapContent = {
  meta: {
    title: "Yol haritası",
    description:
      "Tamga Network yol haritası: bugün yayında olanlar, pilottan önce tamamlanacaklar, pilot ve listelerden ortak deftere geçiş.",
  },
  eyebrow: "Yol haritası",
  title: "İmzalı listelerden ortak deftere",
  lead: "Tarih değil, aşama. Her aşama bir öncekini tamamlar ve güçlendirir.",
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
      title: "Bugün yayında olanlar",
      summary:
        "Akışın tamamı gerçek kriptografiyle, sandbox'ta, ağın canlıdaki yazılımıyla uçtan uca çalışıyor; gerçek ağdaki ilk kurum pilotla katılır.",
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
          desc: "kurumlar, doğrulayıcılar ve herkese açık çapa günlüğü",
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
          desc: "@tamga-network: npm'de 0.7.1 deneme sürümü; kararlı 1.0.0 hazır olunca",
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
      title: "Pilottan önce",
      summary: "Gerçek kişiler kullanmadan önce bir kurumun ihtiyacı olanlar.",
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
          icon: "bluetooth",
          title: "Yüz yüze ve tarayıcıda",
          desc: "Bluetooth ve Digital Credentials API, gerçek telefonlarda",
        },
        {
          icon: "eye",
          title: "Sıfır bilgi ispatı",
          desc: "doğum tarihi olmadan yaş ispatı; doğrulayıcı hazır, telefon mağaza sürümünden sonra",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Pilot",
      summary:
        "Bir üniversite, sınırlı bir grup, başarı ve durdurma ölçütleri önceden belirli.",
      cards: [
        {
          icon: "graduation",
          title: "Üniversite pilotu",
          desc: "öğrenci belgesi, diploma ve kampüs girişi",
        },
        {
          icon: "test",
          title: "AB ile karşılıklı test",
          desc: "AB referans cüzdan ve doğrulayıcılarıyla",
        },
        {
          icon: "globe",
          title: "Europass",
          desc: "eğitim belgelerinin Europass uyumlu biçimi (değerlendiriliyor)",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Ağın genişlemesi",
      summary: "Daha çok operatör, daha çok devlet.",
      cards: [
        {
          icon: "network",
          title: "Ortak defter",
          desc: "en az iki bağımsız operatör katılınca izinli Besu / QBFT",
        },
        {
          icon: "flag",
          title: "Üye devlet listeleri",
          desc: "her devlet kendi güven listesini yayınlar; Tamga’nın listeler listesi onu gösterir",
        },
        {
          icon: "bluetooth",
          title: "NFC ile yakın alan",
          desc: "okuyucu kimlik doğrulamasıyla",
        },
      ],
    },
    {
      n: "5",
      state: "research",
      title: "Araştırma",
      summary:
        "İnceleniyor, henüz planlı değil; her kullanımdan önce bağımsız güvenlik incelemesi.",
      cards: [
        {
          icon: "key",
          title: "Nitelikli e-imza",
          desc: "lisanslı bir sağlayıcıyla cüzdandan imza",
        },
        {
          icon: "briefcase",
          title: "Kurum cüzdanları",
          desc: "belge sahibi olarak kurumlar",
        },
      ],
    },
  ],
  note: "Ayrıntı: whitepaper'ın “Durum ve yol haritası” ve “Bilinen sınırlar” bölümleri.",
};

const tk: RoadmapContent = {
  meta: {
    title: "Ýol kartasy",
    description:
      "Tamga Network ýol kartasy: häzir işleýänler, pilotdan öň tamamlanjaklar, pilot we sanawlardan umumy kitaba geçiş.",
  },
  eyebrow: "Ýol kartasy",
  title: "Gol çekilen sanawlardan umumy kitaba",
  lead: "Sene däl, tapgyr. Her tapgyr öňküsini tamamlaýar we berkidýär.",
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
      title: "Häzir işleýänler",
      summary:
        "Akymyň hemmesi hakyky kriptografiýa bilen, sandbox-da, toruň işleýän programma üpjünçiligi bilen başdan-aýak işleýär; hakyky tordaky ilkinji gurama pilot bilen goşulýar.",
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
          desc: "guramalar, barlaýjylar we açyk labyr žurnaly",
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
          desc: "@tamga-network: npm-de 0.7.1 synag wersiýasy; durnukly 1.0.0 taýýar bolanda",
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
      title: "Pilotdan öň",
      summary: "Hakyky adamlar ulanmazdan öň guramanyň zerur zatlary.",
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
          icon: "bluetooth",
          title: "Ýüzbe-ýüz we brauzerde",
          desc: "Bluetooth we Digital Credentials API, hakyky telefonlarda",
        },
        {
          icon: "eye",
          title: "Nol bilimli subutnama",
          desc: "doglan senesiz ýaş subutnamasy; barlaýjy taýýar, telefon dükan wersiýasyndan soň",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Pilot",
      summary:
        "Bir uniwersitet, çäkli topar, üstünlik we togtatma ölçegleri öňünden kesgitlenen.",
      cards: [
        {
          icon: "graduation",
          title: "Uniwersitet piloty",
          desc: "talyp resminamasy, diplom we kampusa giriş",
        },
        {
          icon: "test",
          title: "ÝB bilen özara synag",
          desc: "ÝB salgylanma gapjyklary we barlaýjylary bilen",
        },
        {
          icon: "globe",
          title: "Europass",
          desc: "bilim resminamalarynyň Europass bilen gabat gelýän görnüşi (seredilýär)",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Toruň giňelmegi",
      summary: "Has köp operator, has köp döwlet.",
      cards: [
        {
          icon: "network",
          title: "Umumy kitap",
          desc: "azyndan iki garaşsyz operator goşulanda rugsatly Besu / QBFT",
        },
        {
          icon: "flag",
          title: "Agza döwletleriň sanawlary",
          desc: "her döwlet öz ynam sanawyny çap edýär; Tamga-nyň sanawlaryň sanawy şony görkezýär",
        },
        {
          icon: "bluetooth",
          title: "NFC arkaly ýakyn aralyk",
          desc: "okaýjynyň şahsyýetini barlamak bilen",
        },
      ],
    },
    {
      n: "5",
      state: "research",
      title: "Gözleg",
      summary:
        "Öwrenilýär, heniz meýilleşdirilmedik; her ulanyşdan öň garaşsyz howpsuzlyk barlagy.",
      cards: [
        {
          icon: "key",
          title: "Kwalifisirlenen elektron gol",
          desc: "ygtyýarly üpjün ediji bilen gapjykdan gol çekmek",
        },
        {
          icon: "briefcase",
          title: "Gurama gapjyklary",
          desc: "resminama eýesi hökmünde guramalar",
        },
      ],
    },
  ],
  note: "Jikme-jiklik: whitepaper-iň “Ýagdaý we ýol kartasy” we “Belli çäkler” bölümleri.",
};

const az: RoadmapContent = {
  meta: {
    title: "Yol xəritəsi",
    description:
      "Tamga Network-un yol xəritəsi: bu gün işlək olanlar, pilotdan əvvəl görüləcəklər, pilot və siyahılardan ortaq reyestrə keçid.",
  },
  eyebrow: "Yol xəritəsi",
  title: "İmzalı siyahılardan ortaq reyestrə",
  lead: "Tarixlər deyil, mərhələlər. Hər mərhələ əvvəlkini tamamlayır və gücləndirir.",
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
      title: "Bu gün işlək olanlar",
      summary:
        "Bütün axın real kriptoqrafiya ilə, sandbox-da, şəbəkənin işlək proqram təminatı üzərində əvvəldən sona qədər işləyir; ilk real qurum pilotla qoşulur.",
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
          desc: "qurumlar, yoxlayan tərəflər və açıq lövbər jurnalı",
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
          desc: "@tamga-network: npm-də 0.7.1 test buraxılışı; sabit 1.0.0 hər şey hazır olduqda",
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
      title: "Pilotdan əvvəl",
      summary: "Real insanlar istifadə etməzdən əvvəl qurumun ehtiyac duyduqları.",
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
          icon: "bluetooth",
          title: "Üz-üzə və brauzerdə",
          desc: "Bluetooth və Digital Credentials API, real telefonlarda",
        },
        {
          icon: "eye",
          title: "Sıfır bilikli sübutlar",
          desc: "doğum tarixi olmadan yaş sübutu; yoxlayan tərəf hazırdır, telefon mağaza buraxılışından sonra",
        },
      ],
    },
    {
      n: "3",
      state: "planned",
      title: "Pilot",
      summary:
        "Bir universitet, məhdud qrup, uğur və dayandırma meyarları əvvəlcədən müəyyən edilir.",
      cards: [
        {
          icon: "graduation",
          title: "Universitet pilotu",
          desc: "tələbə rəqəmsal sənədi, diplom və kampusa giriş",
        },
        {
          icon: "test",
          title: "Aİ ilə qarşılıqlı test",
          desc: "Aİ istinad cüzdanları və yoxlayan tərəfləri ilə",
        },
        {
          icon: "globe",
          title: "Europass",
          desc: "təhsil sənədlərinin Europass ilə uyğun forması (qiymətləndirilir)",
        },
      ],
    },
    {
      n: "4",
      state: "planned",
      title: "Şəbəkənin genişlənməsi",
      summary: "Daha çox operator, daha çox dövlət.",
      cards: [
        {
          icon: "network",
          title: "Ortaq reyestr",
          desc: "ən azı iki müstəqil operator qoşulduqdan sonra icazəli Besu / QBFT",
        },
        {
          icon: "flag",
          title: "Üzv dövlət siyahıları",
          desc: "hər dövlət öz etibar siyahısını dərc edir; Tamga-nın siyahılar siyahısı ona istinad edir",
        },
        {
          icon: "bluetooth",
          title: "NFC ilə yaxın məsafə",
          desc: "oxuyucunun autentifikasiyası ilə",
        },
      ],
    },
    {
      n: "5",
      state: "research",
      title: "Tədqiqat",
      summary:
        "Öyrənilir, hələ planlaşdırılmayıb; istənilən istifadədən əvvəl müstəqil təhlükəsizlik yoxlaması.",
      cards: [
        {
          icon: "key",
          title: "Kvalifikasiyalı elektron imza",
          desc: "lisenziyalı provayderlə rəqəmsal cüzdandan imzalama",
        },
        {
          icon: "briefcase",
          title: "Qurum cüzdanları",
          desc: "rəqəmsal sənəd sahibi kimi təşkilatlar",
        },
      ],
    },
  ],
  note: "Ətraflı: whitepaper-in “Vəziyyət və yol xəritəsi” və “Məlum məhdudiyyətlər” bölmələri.",
};

const content: Record<Locale, RoadmapContent> = { en, tr, tk, az };

export function getRoadmapContent(locale: string): RoadmapContent {
  return content[locale as Locale] ?? content.en;
}

import type { Locale } from "@/i18n/routing";

/*
 * Yol haritası — aşamalar, tarihsiz (kamuya açık depo: takvim, iş planı yok). Kaynak: whitepaper v3.0 "Durum ve yol
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
  lead: "Stages, not dates. Each stage closes the shortcuts of the one before, and what is still a shortcut is written down openly.",
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
      summary: "The full flow works end to end with real cryptography.",
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
          icon: "package",
          title: "Open-source packages",
          desc: "@tamga-network on npm, pre-release 0.1.0",
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
          title: "Store app",
          desc: "Tamga Wallet on the App Store and Google Play",
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
          desc: "each state registers its own institutions",
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
          icon: "eye",
          title: "Zero-knowledge credentials",
          desc: "no tracking even by the issuer",
        },
        {
          icon: "user",
          title: "Per-site pseudonyms",
          desc: "and accountable disclosure",
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
  lead: "Tarih değil, aşama. Her aşama bir öncekinin kestirme yollarını kapatır; hâlâ kestirme olan açıkça yazılır.",
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
      summary: "Akışın tamamı gerçek kriptografiyle uçtan uca çalışıyor.",
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
          icon: "package",
          title: "Açık kaynak paketler",
          desc: "npm'de @tamga-network, ön sürüm 0.1.0",
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
          title: "Mağaza uygulaması",
          desc: "Tamga Wallet App Store ve Google Play'de",
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
          desc: "her devlet kendi kurumlarını kaydeder",
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
          icon: "eye",
          title: "Sıfır bilgili belgeler",
          desc: "belgeyi veren kurum bile izleyemez",
        },
        {
          icon: "user",
          title: "Site başına takma ad",
          desc: "ve hesap verebilir ifşa",
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
  lead: "Sene däl, tapgyr. Her tapgyr öňküsiniň gysga ýollaryny ýapýar; heniz gysga ýol bolan zat açyk ýazylýar.",
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
      summary: "Akymyň hemmesi hakyky kriptografiýa bilen başdan-aýak işleýär.",
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
          icon: "package",
          title: "Açyk çeşmeli paketler",
          desc: "npm-de @tamga-network, deslapky wersiýa 0.1.0",
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
          title: "Dükan programmasy",
          desc: "Tamga Wallet App Store we Google Play-de",
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
          desc: "her döwlet öz guramalaryny hasaba alýar",
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
          icon: "eye",
          title: "Nol bilimli resminamalar",
          desc: "resminamany beren gurama hem yzarlap bilmeýär",
        },
        {
          icon: "user",
          title: "Saýt başyna lakam",
          desc: "we hasabatly açyklama",
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

const content: Record<Locale, RoadmapContent> = { en, tr, tk };

export function getRoadmapContent(locale: string): RoadmapContent {
  return content[locale as Locale] ?? content.en;
}

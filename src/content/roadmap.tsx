import type { Locale } from "@/i18n/routing";

/*
 * Yol haritası — teknik aşamalar, tarihsiz (kamuya açık depo: takvim, iş planı yok). Kaynak: whitepaper v3.0 "Durum ve yol
 * haritası" (Faz B / Pilot / Faz 0 / Faz 1), tamga-network STATUS 42. tur, backlog Z1–Z5, DECISIONS D-BC-6.
 */

export type RoadmapState = "done" | "now" | "next" | "later" | "research";
export type RoadmapStage = {
  state: RoadmapState;
  title: string;
  summary: string;
  items: string[];
};

export type RoadmapContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  labels: Record<RoadmapState, string>;
  stages: RoadmapStage[];
  note: string;
};

const en: RoadmapContent = {
  meta: {
    title: "Roadmap",
    description:
      "Tamga Network roadmap: what works today, what comes before the pilot, the pilot, the move from lists to a ledger, and research directions.",
  },
  eyebrow: "Roadmap",
  title: "From signed lists to a shared ledger",
  lead: "Stages, not dates. Each stage closes the shortcuts of the one before; what is still a shortcut is written down openly.",
  labels: {
    done: "Working",
    now: "In progress",
    next: "Pilot",
    later: "Later",
    research: "Research",
  },
  stages: [
    {
      state: "done",
      title: "Phase B — signed trust lists",
      summary: "The full flow works end to end with real cryptography.",
      items: [
        "issuing and presenting student credentials and diplomas; revocation and suspension",
        "identity check and identity credential, also as ISO mdoc",
        "campus and event passes, single-use tickets; website sign-up and passkey sign-in",
        "Institution Console, signed issuer metadata, registration certificates",
        "open-source packages on npm (pre-release 0.1.0)",
      ],
    },
    {
      state: "now",
      title: "Before the pilot",
      summary: "What an institution needs before real people use it.",
      items: [
        "Tamga Wallet on the App Store and Google Play",
        "keys in the phone's secure hardware; device attestation (App Attest / Play Integrity) required",
        "the institution's signing key in the institution's own key vault",
        "the first connection to an institution's own lookup endpoint",
        "showing credentials in person over Bluetooth and from the browser (coded, device testing next)",
      ],
    },
    {
      state: "next",
      title: "Pilot",
      summary:
        "One university, a limited group, success and stop criteria set in advance.",
      items: [
        "issuer key at the university; lists, no ledger",
        "student credential and diploma; campus access",
        "cross-testing with EU reference wallets and verifiers",
      ],
    },
    {
      state: "later",
      title: "Phase 0 and Phase 1",
      summary: "More operators, more states, more formats.",
      items: [
        "a permissioned Besu / QBFT ledger once at least two independent validator operators sign",
        "member-state trust lists; each state registers its own institutions",
        "close range over NFC; reader authentication",
        "a Europass-compatible representation of education credentials (under evaluation)",
      ],
    },
    {
      state: "research",
      title: "Research directions",
      summary:
        "Studied, not yet planned; independent security review before any use.",
      items: [
        "zero-knowledge credentials against tracking by the issuer",
        "per-site pseudonyms; accountable disclosure",
        "institution wallets (organisations as holders)",
      ],
    },
  ],
  note: "Details: the whitepaper's “Status and roadmap” and “Known limits” sections.",
};

const tr: RoadmapContent = {
  meta: {
    title: "Yol haritası",
    description:
      "Tamga Network yol haritası: bugün çalışanlar, pilottan önce tamamlanacaklar, pilot, listelerden deftere geçiş ve araştırma yönleri.",
  },
  eyebrow: "Yol haritası",
  title: "İmzalı listelerden ortak deftere",
  lead: "Tarih değil, aşama. Her aşama bir öncekinin kestirme yollarını kapatır; hâlâ kestirme olan açıkça yazılır.",
  labels: {
    done: "Çalışıyor",
    now: "Sürüyor",
    next: "Pilot",
    later: "Sonra",
    research: "Araştırma",
  },
  stages: [
    {
      state: "done",
      title: "Faz B — imzalı güven listeleri",
      summary: "Akışın tamamı gerçek kriptografiyle uçtan uca çalışıyor.",
      items: [
        "öğrenci belgesi ve diploma verme ve gösterme; iptal ve askıya alma",
        "kimlik doğrulama ve kimlik belgesi, ISO mdoc olarak da",
        "kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; web sitesine kayıt ve passkey ile giriş",
        "Kurum Konsolu, imzalı kurum metadata'sı, kayıt sertifikaları",
        "npm'de açık kaynak paketler (ön sürüm 0.1.0)",
      ],
    },
    {
      state: "now",
      title: "Pilottan önce",
      summary: "Gerçek kişiler kullanmadan önce bir kurumun ihtiyacı olanlar.",
      items: [
        "Tamga Wallet'ın App Store ve Google Play sürümü",
        "anahtarlar telefonun güvenli donanımında; cihaz kanıtı (App Attest / Play Integrity) zorunlu",
        "kurumun imza anahtarı kurumun kendi anahtar kasasında",
        "bir kurumun kendi sorgu ucuna ilk bağlantı",
        "Bluetooth ile yüz yüze ve tarayıcıdan belge gösterme (kodlandı, sırada cihaz testi)",
      ],
    },
    {
      state: "next",
      title: "Pilot",
      summary:
        "Bir üniversite, sınırlı bir grup, başarı ve durdurma ölçütleri önceden belirli.",
      items: [
        "kurum anahtarı üniversitede; listeler, defter yok",
        "öğrenci belgesi ve diploma; kampüs girişi",
        "AB referans cüzdan ve doğrulayıcılarıyla karşılıklı test",
      ],
    },
    {
      state: "later",
      title: "Faz 0 ve Faz 1",
      summary: "Daha çok operatör, daha çok devlet, daha çok biçim.",
      items: [
        "en az iki bağımsız validator operatörü imzalayınca izinli Besu / QBFT defteri",
        "üye devlet güven listeleri; her devlet kendi kurumlarını kaydeder",
        "NFC ile yakın alan; okuyucu kimlik doğrulaması",
        "eğitim belgelerinin Europass uyumlu bir temsili (değerlendiriliyor)",
      ],
    },
    {
      state: "research",
      title: "Araştırma yönleri",
      summary:
        "İnceleniyor, henüz planlı değil; her kullanımdan önce bağımsız güvenlik incelemesi.",
      items: [
        "kurumun izlemesine karşı sıfır bilgili belgeler",
        "site başına takma ad; hesap verebilir ifşa",
        "kurum cüzdanları (belge sahibi olarak kurumlar)",
      ],
    },
  ],
  note: "Ayrıntı: whitepaper'ın “Durum ve yol haritası” ve “Bilinen sınırlar” bölümleri.",
};

const tk: RoadmapContent = {
  meta: {
    title: "Ýol kartasy",
    description:
      "Tamga Network ýol kartasy: häzir işleýänler, pilotdan öň tamamlanjaklar, pilot, sanawlardan kitaba geçiş we gözleg ugurlary.",
  },
  eyebrow: "Ýol kartasy",
  title: "Gol çekilen sanawlardan umumy kitaba",
  lead: "Sene däl, tapgyr. Her tapgyr öňküsiniň gysga ýollaryny ýapýar; heniz gysga ýol bolan zat açyk ýazylýar.",
  labels: {
    done: "Işleýär",
    now: "Dowam edýär",
    next: "Pilot",
    later: "Soňra",
    research: "Gözleg",
  },
  stages: [
    {
      state: "done",
      title: "B tapgyr — gol çekilen ynam sanawlary",
      summary: "Akymyň hemmesi hakyky kriptografiýa bilen başdan-aýak işleýär.",
      items: [
        "talyp resminamasyny we diplomy bermek we görkezmek; ýatyrmak we togtatmak",
        "şahsyýet barlagy we şahsyýet resminamasy, ISO mdoc görnüşinde hem",
        "kampus we çäre geçiş kartalary, bir gezeklik biletler; web saýta hasaba durmak we passkey bilen giriş",
        "Gurama konsoly, gol çekilen gurama metadata-sy, hasaba alyş sertifikatlary",
        "npm-de açyk çeşmeli paketler (deslapky wersiýa 0.1.0)",
      ],
    },
    {
      state: "now",
      title: "Pilotdan öň",
      summary: "Hakyky adamlar ulanmazdan öň guramanyň zerur zatlary.",
      items: [
        "Tamga Wallet-iň App Store we Google Play wersiýasy",
        "açarlar telefonyň howpsuz enjamynda; enjam subutnamasy (App Attest / Play Integrity) hökmany",
        "guramanyň gol açary guramanyň öz açar ammarynda",
        "guramanyň öz gözleg nokadyna ilkinji birikme",
        "Bluetooth arkaly ýüzbe-ýüz we brauzerden resminama görkezmek (kodlandy, indiki ädim enjam synagy)",
      ],
    },
    {
      state: "next",
      title: "Pilot",
      summary:
        "Bir uniwersitet, çäkli topar, üstünlik we togtatma ölçegleri öňünden kesgitlenen.",
      items: [
        "guramanyň açary uniwersitetde; sanawlar, kitap ýok",
        "talyp resminamasy we diplom; kampusa giriş",
        "ÝB salgylanma gapjyklary we barlaýjylary bilen özara synag",
      ],
    },
    {
      state: "later",
      title: "0 we 1 tapgyrlar",
      summary: "Has köp operator, has köp döwlet, has köp görnüş.",
      items: [
        "azyndan iki garaşsyz validator operatory gol çekende rugsatly Besu / QBFT kitaby",
        "agza döwletleriň ynam sanawlary; her döwlet öz guramalaryny hasaba alýar",
        "NFC arkaly ýakyn aralyk; okaýjynyň şahsyýetini barlamak",
        "bilim resminamalarynyň Europass bilen gabat gelýän görnüşi (seredilýär)",
      ],
    },
    {
      state: "research",
      title: "Gözleg ugurlary",
      summary:
        "Öwrenilýär, heniz meýilleşdirilmedik; her ulanyşdan öň garaşsyz howpsuzlyk barlagy.",
      items: [
        "guramanyň yzarlamagyna garşy nol bilimli resminamalar",
        "saýt başyna lakam; hasabatly açyklama",
        "gurama gapjyklary (resminama eýesi hökmünde guramalar)",
      ],
    },
  ],
  note: "Jikme-jiklik: whitepaper-iň “Ýagdaý we ýol kartasy” we “Belli çäkler” bölümleri.",
};

const content: Record<Locale, RoadmapContent> = { en, tr, tk };

export function getRoadmapContent(locale: string): RoadmapContent {
  return content[locale as Locale] ?? content.en;
}

/**
 * tamga.network ana sayfası (2026-10-02, ikinci tur): ağın sesi, giriş seviyesinden derine. Üç dil aynı yapıda; Türkçe kaynak.
 * Ürün ve hizmet anlatımı yok (ADR-0037). Kaynakta olmayan iddia, rakam, partner ya da etkinlik yok.
 * Terimler: gündelik sözcükler Türkçe; teknik terim gerektiğinde İngilizcesi parantezde.
 */
import type { Locale } from "@/i18n/routing";
import type {
  ChainLabels,
  CredLabels,
  DisclosureLabels,
  FlowLabels,
  PseudoLabels,
  RolesLabels,
  ZkLabels,
} from "@/components/home-diagrams";

export type ListRow = { code: string; name: string; status: string; live?: boolean };
export type Item = { title: string; body: string };
export type Layer = Item & { status: string; future?: boolean };
export type Door = Item & { kicker: string; cta: string; href: "/join" | "/learn/trust-lists" };
export type EuRow = { eu: string; tamga: string; what: string };
export type Topic =
  | { id: "credential"; title: string; what: string; why: string; solves: string; d: CredLabels }
  | { id: "disclosure"; title: string; what: string; why: string; solves: string; d: DisclosureLabels }
  | { id: "zk"; title: string; what: string; why: string; solves: string; d: ZkLabels }
  | { id: "pseudonym"; title: string; what: string; why: string; solves: string; d: PseudoLabels }
  | { id: "chain"; title: string; what: string; why: string; solves: string; d: ChainLabels };

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    listTitle: string;
    listHost: string;
    rows: ListRow[];
    listNote: string;
  };
  partners: { eyebrow: string; title: string; empty: string; join: string; all: string };
  standards: { eyebrow: string; title: string };
  why: { eyebrow: string; title: string; lead: string; problems: Item[]; purposeTitle: string; purpose: string };
  philosophy: { eyebrow: string; title: string; items: Item[] };
  how: { eyebrow: string; title: string; lead: string; flow: FlowLabels; steps: Item[] };
  tech: { eyebrow: string; title: string; lead: string; labels: { what: string; why: string; solves: string }; topics: Topic[] };
  verify: {
    eyebrow: string;
    title: string;
    lead: string;
    button: string;
    how: string;
    sample: string;
    ok: string;
    pending: string;
    fields: [string, string][];
  };
  stack: { eyebrow: string; title: string; cta: string; layers: Layer[] };
  doors: { eyebrow: string; title: string; items: Door[] };
  news: { eyebrow: string; title: string; allPosts: string; allEvents: string; upcoming: string; latest: string; read: string };
  gov: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: (Item & { when: string })[];
    roles: RolesLabels;
    arf: string;
    blog: string;
  };
  dev: { eyebrow: string; title: string; lead: string; npmNote: string; docs: string; github: string; copy: string; copied: string };
  eu: { eyebrow: string; title: string; head: [string, string, string]; rows: EuRow[] };
};

const tr: HomeContent = {
  hero: {
    eyebrow: "Açık güven ağı · Tamga ARF 1.0",
    title: "Türk dünyası için dijital güven ağı.",
    lead: "Bir belgenin gerçek olduğunu kanıtlamak için telefon, apostil ve haftalar gerekmesin. Tamga Network, kurumların verdiği dijital belgelerin sınır tanımadan, saniyeler içinde ve kişinin mahremiyetini koruyarak doğrulanmasını sağlayan ortak kurallar ve imzalı listelerdir.",
    primary: "Ağa katıl",
    secondary: "Kuralları oku",
    listTitle: "Listelerin listesi · LOTL",
    listHost: "trust.tamga.network",
    rows: [
      { code: "TR", name: "Türkiye listesi", status: "Yayında · geçici işletmeci", live: true },
      { code: "AZ", name: "Azerbaycan listesi", status: "Yer ayrıldı" },
      { code: "KZ", name: "Kazakistan listesi", status: "Yer ayrıldı" },
      { code: "KG", name: "Kırgızistan listesi", status: "Yer ayrıldı" },
      { code: "UZ", name: "Özbekistan listesi", status: "Yer ayrıldı" },
      { code: "TM", name: "Türkmenistan listesi", status: "Yer ayrıldı" },
      { code: "EU", name: "AB listeleri (federasyon)", status: "Dış liste olarak okunur" },
    ],
    listNote: "Her devlet kendi listesini kendisi yayınlar. Bugün Türkiye listesini Tamga, devlet adına geçici olarak işletir.",
  },
  partners: {
    eyebrow: "Partnerler",
    title: "Birlikte çalıştığımız kurumlar",
    empty: "İlk partnerlerimizi yakında duyuracağız.",
    join: "Ağa katıl",
    all: "Partnerler",
  },
  standards: {
    eyebrow: "Açık standartlar",
    title: "Dayandığımız standartlar",
  },
  why: {
    eyebrow: "Neden Tamga Network?",
    title: "Bugün belgeler dijital, güven hâlâ kâğıtta.",
    lead: "Okullar, hastaneler, odalar ve şirketler her gün belge veriyor. Ama bir belgenin gerçek olduğunu başka bir ülkede, hatta başka bir kurumda kanıtlamak hâlâ zor.",
    problems: [
      { title: "Belgeler sınırda takılıyor", body: "Bakü'de verilen bir belgeyi Almatı'daki bir kurum doğrulamak istediğinde telefon, e-posta, apostil ve haftalar gerekiyor." },
      { title: "Sahte belge kolay", body: "Taranmış bir PDF ya da fotokopi kolayca değiştirilebiliyor ve gerçeğini sahtesinden ayırmak uzmanlık istiyor." },
      { title: "Gereğinden fazla veri veriliyor", body: "Yaşını kanıtlamak için kimliğin tamamını, mezuniyetini kanıtlamak için bütün not dökümünü göstermek zorunda kalıyorsun." },
      { title: "Her ülkenin sistemi ayrı", body: "Her ülke kendi dijital sistemini kuruyor, ama bu sistemler birbirini tanımıyor ve aynı dili konuşmuyor." },
      { title: "Avrupa ilerliyor, Türk dünyası dışarıda kalabilir", body: "AB, 2026 sonuna kadar her üye ülkenin vatandaşlarına bir dijital kimlik cüzdanı sunmasını zorunlu kıldı. Ortak bir güven yapısı olmazsa Türk dünyasının belgeleri bu düzenin dışında kalır." },
    ],
    purposeTitle: "Amacımız",
    purpose: "Türk dünyasında bir kurumun verdiği belgenin başka bir ülkede de aynı güvenle kabul edilmesini istiyoruz. Bunu tek bir şirketin ya da tek bir devletin elinde olmayan, açık kurallarla işleyen ortak bir ağla yapıyoruz. Belgeler kişinin telefonunda durur ve kişi yalnızca gerekeni gösterir. Doğrulayan da kaynağa sormadan, saniyeler içinde emin olur.",
  },
  philosophy: {
    eyebrow: "Felsefemiz",
    title: "Beş ilke.",
    items: [
      { title: "Kişi merkezde", body: "Belge kişinin cüzdanında durur. Ne gösterileceğine kişi karar verir." },
      { title: "Ağ kimsenin malı değil", body: "Ağ hizmet satmaz ve kimseye ayrıcalık tanımaz. Ulaşmak istediğimiz yer bağımsız bir vakıftır." },
      { title: "Liste devletin", body: "Her devlet kendi güven listesinin sahibidir; kimi tanıyacağına kendisi karar verir." },
      { title: "Kişisel veri ağa yazılmaz", body: "Listelere, kayıtlara ve günlüklere kişisel veri girmez, verinin özeti bile yazılmaz." },
      { title: "Açık kural, açık kod", body: "Her kural numaralı ve herkese açık; her paket açık kaynak." },
    ],
  },
  how: {
    eyebrow: "Nasıl çalışır",
    title: "Üç taraf, bir güven listesi.",
    lead: "Belgeyi veren kurum, belgeyi taşıyan kişi ve belgeyi kontrol eden taraf aynı imzalı listeye bakar. Bu yüzden kimsenin kimseye telefon açması gerekmez.",
    flow: {
      title: "Tamga Network akışı",
      desc: "Belge veren kurum imzalı belgeyi kişinin cüzdanına verir. Kişi doğrulayana yalnızca istenen alanları gösterir ve üç taraf da devletin imzalı güven listesine bakar.",
      issuer: "Belge veren kurum",
      issuerSub: "üniversite · hastane · oda",
      wallet: "Kişinin cüzdanı",
      walletSub: "belgeler telefonda",
      verifier: "Doğrulayan",
      verifierSub: "işveren · site · kapı",
      signed: "imzalı belge",
      only: "yalnız gerekenler",
      trust: "Güven listesi",
      trustSub: "imzalı · devletin",
      checks: "her taraf kurumun gerçek olduğunu buradan kontrol eder",
    },
    steps: [
      { title: "Kurum belgeyi imzalar", body: "Kurum belgeyi kendi anahtarıyla imzalar ve kişinin cüzdanına gönderir. Kurumun anahtarı, devletin listesinde kayıtlıdır." },
      { title: "Kişi belgeyi taşır", body: "Belge telefonda durur. Biri isterse kişi neyin istendiğini görür ve yalnız onayladığı bilgileri gösterir." },
      { title: "Doğrulayan saniyede emin olur", body: "İmzayı ve kurumun listedeki kaydını kontrol eder. Bunun için kaynağa sorması ya da beklemesi gerekmez." },
    ],
  },
  tech: {
    eyebrow: "Teknoloji, sade dille",
    title: "Arkadaki beş fikir.",
    lead: "Tamga Network yeni bir şey icat etmiyor. Avrupa'nın dijital kimlik düzeninde kullanılan ve test edilmiş teknikleri Türk dünyası için bir araya getiriyor.",
    labels: { what: "Nedir", why: "Türk dünyasında neden lazım", solves: "Çözdüğü sorun" },
    topics: [
      {
        id: "credential",
        title: "Doğrulanabilir belge",
        what: "Kurumun dijital olarak imzaladığı belge (credential). Üzerindeki tek bir harf değişirse imza bozulur.",
        why: "Farklı dillerde, farklı sistemlerde verilen belgeler aynı biçimde okunur ve aynı şekilde doğrulanır.",
        solves: "Sahte belge ve haftalarca süren yazışmalar.",
        d: {
          title: "Doğrulanabilir belge",
          desc: "Kurumun imzası ve mührüyle bir dijital belge kartı.",
          issuer: "ÖRNEK ÜNİVERSİTESİ",
          type: "Mezuniyet belgesi",
          fields: [
            ["ad soyad", "Ayşe Yılmaz"],
            ["bölüm", "Bilgisayar Müh."],
            ["tarih", "2026"],
          ],
          seal: "kurum imzası",
          sig: "imza: ES256 · kurum sertifikası",
        },
      },
      {
        id: "disclosure",
        title: "Seçici paylaşım",
        what: "Belgenin her alanı ayrı ayrı kilitlenir (selective disclosure). Kişi yalnız istenen alanı açar; diğerleri kapalı kalır.",
        why: "Bir sınav merkezi, bir banka ya da bir konser kapısı aynı belgeden farklı bilgiler ister ve hiçbirine her şeyi vermek gerekmez.",
        solves: "Gereğinden fazla kişisel veri paylaşımı.",
        d: {
          title: "Seçici paylaşım",
          desc: "Belgenin her biri kendi özetiyle saklanan dört alanı var. Yalnızca 18 yaş üstü bilgisi açılır, doğum tarihi gizli kalır.",
          card: "belgedeki alanlar",
          shared: "doğrulayanın gördüğü",
          hidden: "gizli",
          fields: [
            { k: "18 yaş üstü", v: "18+: evet", show: true },
            { k: "doğum tarihi", v: "", show: false },
            { k: "ad soyad", v: "", show: false },
            { k: "belge no", v: "", show: false },
          ],
        },
      },
      {
        id: "zk",
        title: "Sıfır bilgi ispatı",
        what: "Bir şeyin doğru olduğunu, o şeyin kendisini göstermeden kanıtlamak (zero-knowledge proof). Örneğin doğum tarihini göstermeden 18 yaşından büyük olduğunu.",
        why: "Yaş, üyelik ya da yetki gibi soruların cevabı, kişinin bütün bilgisini açmadan verilebilir.",
        solves: "Bir evet-hayır sorusu için bütün kimliği göstermek.",
        d: {
          title: "Sıfır bilgi ispatı",
          desc: "Doğum tarihi ispatın girdisidir ve ispattan çıkan tek bilgi kişinin 18 yaşından büyük olduğudur. Doğum tarihinin kendisi doğrulayana gitmez.",
          input: "telefonda",
          inputSub: "Doğum tarihi",
          proof: "ispat",
          output: "18 yaşından|büyük",
          never: "doğum tarihi doğrulayana gitmez",
        },
      },
      {
        id: "pseudonym",
        title: "Site başına takma ad",
        what: "\"Tamga ile giriş yap\" her siteye senin için farklı bir kimlik numarası verir (pseudonym). Site seni tanır ama başka sitelerle eşleştiremez.",
        why: "Kişinin hangi siteleri kullandığı, siteler veri paylaşsa bile birbirine bağlanamaz.",
        solves: "Siteler arası izlenme ve profil çıkarılması.",
        d: {
          title: "Site başına takma ad",
          desc: "Aynı kişi üç sitede üç farklı kimlikle görünür ve siteler bu kimlikleri birbirine bağlayamaz.",
          person: "Sen",
          sites: [
            ["bilet sitesi", "k7f2…9a"],
            ["kütüphane", "p91a…3c"],
            ["sınav portalı", "z3c8…e1"],
          ],
          cant: "siteler birbirini eşleştiremez",
        },
      },
      {
        id: "chain",
        title: "Güven zinciri",
        what: "Kurumun gerçekten o kurum olduğu, devletin imzaladığı bir listeden okunur. Listeler de bir üst listeye, listelerin listesine bağlıdır.",
        why: "Her devlet kendi listesinin sahibi kalır; ama listeler aynı biçimde olduğu için birbirini tanır.",
        solves: "\"Bu kurum gerçekten var mı?\" sorusunun ülke ülke ayrı cevaplanması.",
        d: {
          title: "Güven zinciri",
          desc: "Listelerin listesi ülke listesini, ülke listesi kurum sertifikasını, kurum da belgeyi imzalar.",
          steps: [
            ["Listelerin listesi", "LOTL · trust.tamga.network"],
            ["Türkiye listesi", "devletin imzası"],
            ["Kurum sertifikası", "X.509 · kayıtlı kurum"],
            ["Belge", "kurumun imzası"],
          ],
          signs: "imzalar",
        },
      },
    ],
  },
  verify: {
    eyebrow: "Kendiniz deneyin",
    title: "Güven, bir imza kadar açık.",
    lead: "Liste her değişiklikte yeniden imzalanır ve bir önceki sürüme hash ile bağlanır. Herkese açık çapa günlüğüne de en az saatte bir satır eklenir. Bu sayede kimse listeyi sessizce değiştiremez ve herkes doğrulayabilir.",
    button: "İmzayı doğrula",
    how: "Nasıl çalışır",
    sample: "lotl.jws · örnek",
    ok: "İmza geçerli · kök parmak izi eşleşti",
    pending: "Doğrulanmadı",
    fields: [
      ["scheme", "Tamga LOTL"],
      ["version", "[sürüm]"],
      ["issued_at", "[yayın zamanı]"],
      ["next_update", "[en geç 90 gün]"],
      ["operator", "Tamga · provisional, on_behalf_of: TR"],
      ["previous_hash", "sha256:[önceki sürümün özeti]"],
      ["alg · x5c", "ES256 · kök sertifika zinciri"],
    ],
  },
  stack: {
    eyebrow: "Ağın katmanları",
    title: "Kuraldan cüzdana, altı katman.",
    cta: "Tamga ARF'yi aç",
    layers: [
      { title: "Kurallar", body: "Tamga ARF, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları.", status: "Yürürlükte" },
      { title: "Güven listeleri", body: "İmzalı, sürümlü ülke listeleri ve hepsini gösteren listelerin listesi.", status: "Yürürlükte" },
      { title: "Belge biçimleri", body: "SD-JWT VC ve ISO mdoc; OpenID4VCI ile verme, OpenID4VP ile gösterme.", status: "Yürürlükte" },
      { title: "Açık paketler", body: "Doğrulama, belge verme ve cüzdan çekirdeği; herkes kendi sunucusunda çalıştırabilir.", status: "Ön sürüm" },
      { title: "Ağın üstündekiler", body: "Ağın kurallarına uyan cüzdanlar ve hizmet sağlayıcılar. İlk cüzdan Tamga Wallet.", status: "Ağın üstünde" },
      { title: "Ortak defter", body: "En az iki bağımsız işletmeci katıldığında aynı kayıtlar izinli bir deftere taşınır.", status: "İleride", future: true },
    ],
  },
  doors: {
    eyebrow: "Katılım",
    title: "Ağa üç kapıdan girilir.",
    items: [
      { kicker: "Kurumlar", title: "Belge verin, belge doğrulayın.", body: "Kaydınızı yapın, anahtarınızı listeye ekletin, ilk belgenizi verin.", cta: "Kurum olarak katıl", href: "/join" },
      { kicker: "Cüzdan sağlayıcılar", title: "Cüzdanınızı ağa tanıtın.", body: "Ağ cüzdan seçmez, kurallara uyan cüzdanları tanır. Kurallara uyan ve uyum testlerini geçen her cüzdan listeye girer. Cüzdanınızı önce sandbox'ta deneyebilirsiniz.", cta: "Uyum testlerine başla", href: "/join" },
      { kicker: "Devletler", title: "Listenizi kendiniz yayınlayın.", body: "Kendi güven listenizi yayınladığınızda ağ o listeyi gösterir. Cüzdanlar için değişen tek şey adres olur.", cta: "Federasyonu incele", href: "/learn/trust-lists" },
    ],
  },
  news: {
    eyebrow: "Haberler ve etkinlikler",
    title: "Ağdan son gelişmeler.",
    allPosts: "Tüm yazılar",
    allEvents: "Etkinlikler",
    upcoming: "Yaklaşan etkinlik",
    latest: "Son yazı",
    read: "Oku",
  },
  gov: {
    eyebrow: "Yönetişim",
    title: "Bugün geçici işletmeci. Yarın vakıf.",
    lead: "Ağı bugün Tamga işletiyor, ama ağ Tamga'ya ait değil. İzlenecek yol baştan yazıldı. Devletler katıldıkça yönetim ortaklaşacak, iki bağımsız işletmeci olduğunda da kayıtlar ortak deftere taşınacak.",
    steps: [
      { when: "Bugün", title: "Geçici işletmeci", body: "Tamga, Türkiye listesini devlet adına açık kurallarla ve herkese açık çapa günlüğüyle yayınlar." },
      { when: "Devletler katılınca", title: "Konsey ya da vakıf", body: "Listeler sahiplerine devredilir ve ağın kuralları ortak kararla değişir." },
      { when: "İki bağımsız işletmeci", title: "Ortak defter", body: "Kayıtlar izinli bir deftere taşınır ve hiçbir taraf onları tek başına değiştiremez." },
    ],
    roles: {
      title: "Yönetişim rolleri",
      desc: "Ağın kuralları ortadadır. İşletmeci, kayıt kurumu ve devlet listeleri bu kurallara göre çalışır.",
      operator: "İşletmeci",
      registrar: "Kayıt kurumu",
      states: "Devlet listeleri",
      network: "Ağın kuralları|Tamga ARF",
    },
    arf: "Trust Framework'ü oku",
    blog: "Neden henüz blockchain değil?",
  },
  dev: {
    eyebrow: "Geliştiriciler",
    title: "İki paket, beş dakika.",
    lead: "Bir belgeyi kendi sunucunuzda doğrulayın. Barındırılan doğrulayıcıyı kullanırsanız sunucu kodu bile gerekmez.",
    npmNote: "Paketler npm'de 0.7.2 deneme sürümüyle yayımlanır; kararlı 1.0.0 hazır olunca gelir. Deneme sürümünde arayüz değişebilir.",
    docs: "Belgelere git",
    github: "GitHub",
    copy: "Kopyala",
    copied: "Kopyalandı",
  },
  eu: {
    eyebrow: "Avrupa ile uyum",
    title: "AB'nin kurduğu yapının Türk dünyasındaki karşılığı.",
    head: ["Avrupa Birliği", "Tamga Network", "Ne demek"],
    rows: [
      { eu: "eIDAS 2.0 ve uygulama tüzükleri", tamga: "Trust Framework", what: "Kim katılır, kim denetler, nasıl devredilir." },
      { eu: "EU ARF", tamga: "Tamga ARF 1.0", what: "Roller, mimari, güven modeli." },
      { eu: "Yüksek düzey gereksinimler", tamga: "Tamga Rulebook", what: "Her rol için numaralı, bağlayıcı kurallar." },
      { eu: "Attestation rulebook'ları", tamga: "Education · Identity · Event Ticket", what: "Her belge türünün kendi kuralları." },
      { eu: "Güven listeleri (LOTL)", tamga: "Tamga LOTL ve ülke listeleri", what: "Aynı biçim; AB listeleri dış liste olarak okunur." },
    ],
  },
};

const en: HomeContent = {
  hero: {
    eyebrow: "Open trust network · Tamga ARF 1.0",
    title: "The digital trust network for the Turkic world.",
    lead: "Proving that a document is real shouldn't take phone calls, apostilles and weeks. Tamga Network is a set of shared rules and signed lists that lets digital credentials from any institution be verified across borders, in seconds, while protecting the person's privacy.",
    primary: "Join the network",
    secondary: "Read the rules",
    listTitle: "List of lists · LOTL",
    listHost: "trust.tamga.network",
    rows: [
      { code: "TR", name: "Türkiye list", status: "Live · provisional operator", live: true },
      { code: "AZ", name: "Azerbaijan list", status: "Seat reserved" },
      { code: "KZ", name: "Kazakhstan list", status: "Seat reserved" },
      { code: "KG", name: "Kyrgyzstan list", status: "Seat reserved" },
      { code: "UZ", name: "Uzbekistan list", status: "Seat reserved" },
      { code: "TM", name: "Turkmenistan list", status: "Seat reserved" },
      { code: "EU", name: "EU lists (federation)", status: "Read as external lists" },
    ],
    listNote: "Every state publishes its own list. Today Tamga runs the Türkiye list provisionally, on behalf of the state.",
  },
  partners: {
    eyebrow: "Partners",
    title: "Organisations we work with",
    empty: "We will announce our first partners soon.",
    join: "Join the network",
    all: "Partners",
  },
  standards: {
    eyebrow: "Open standards",
    title: "The standards we build on",
  },
  why: {
    eyebrow: "Why Tamga Network?",
    title: "Documents are digital. Trust is still on paper.",
    lead: "Schools, hospitals, chambers and companies issue documents every day. Yet proving that a document is real in another country, or even another institution, is still hard.",
    problems: [
      { title: "Documents get stuck at borders", body: "When an institution in Almaty wants to verify a document issued in Baku, it takes phone calls, emails, apostilles and weeks." },
      { title: "Forgery is easy", body: "A scanned PDF or a photocopy is easy to alter, and telling the real one from a fake takes expertise." },
      { title: "People share too much", body: "To prove your age you show your whole ID; to prove you graduated you show your whole transcript." },
      { title: "Every country has its own system", body: "Each country builds its own digital system, but these systems don't recognise each other or speak the same language." },
      { title: "Europe is moving ahead, and the Turkic world could be left out", body: "The EU requires every member state to offer its citizens a digital identity wallet by the end of 2026. Without a shared trust structure, Turkic-world credentials stay outside that order." },
    ],
    purposeTitle: "Our purpose",
    purpose: "We want a credential issued by an institution in the Turkic world to be accepted with the same confidence in another country. We do it with a shared network that no single company or state owns and that runs on open rules. Credentials stay on the person's phone, and the person shows only what is needed. The verifier can be sure within seconds without asking the source.",
  },
  philosophy: {
    eyebrow: "Our philosophy",
    title: "Five principles.",
    items: [
      { title: "The person at the centre", body: "The credential stays in the person's wallet. The person decides what to show." },
      { title: "Owned by no one", body: "The network sells no services and gives no one privileges. Where we want to end up is an independent foundation." },
      { title: "The list belongs to the state", body: "Every state owns its trust list and decides whom it recognises." },
      { title: "No personal data on the network", body: "No personal data goes into lists, records or logs, not even a hash of it." },
      { title: "Open rules, open code", body: "Every rule is numbered and public; every package is open source." },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Three parties, one trust list.",
    lead: "The institution that issues a credential, the person who carries it and the party that checks it all look at the same signed list, so nobody has to phone anybody.",
    flow: {
      title: "Tamga Network flow",
      desc: "The issuing institution gives a signed credential to the person's wallet. The person shows the verifier only the requested fields, and all three consult the state's signed trust list.",
      issuer: "Issuing institution",
      issuerSub: "university · hospital · chamber",
      wallet: "Person's wallet",
      walletSub: "credentials on the phone",
      verifier: "Verifier",
      verifierSub: "employer · website · gate",
      signed: "signed credential",
      only: "only what's needed",
      trust: "Trust list",
      trustSub: "signed · by the state",
      checks: "every party checks here that the institution is real",
    },
    steps: [
      { title: "The institution signs", body: "The institution signs the credential with its own key and sends it to the person's wallet. Its key is registered in the state's list." },
      { title: "The person carries it", body: "The credential stays on the phone. When someone asks, the person sees what is requested and shows only what they approve." },
      { title: "The verifier is sure in seconds", body: "It checks the signature and the institution's entry in the list without asking the source and without waiting." },
    ],
  },
  tech: {
    eyebrow: "Technology, in plain words",
    title: "Five ideas behind it.",
    lead: "Tamga Network does not invent anything new. It brings together tested techniques from Europe's digital identity framework for the Turkic world.",
    labels: { what: "What it is", why: "Why the Turkic world needs it", solves: "Problem it solves" },
    topics: [
      {
        id: "credential",
        title: "Verifiable credential",
        what: "A document digitally signed by the institution (a credential). Change a single letter and the signature breaks.",
        why: "Documents issued in different languages and systems are read in the same format and verified the same way.",
        solves: "Forgery, and weeks of correspondence.",
        d: {
          title: "Verifiable credential",
          desc: "A digital credential card with the institution's signature and seal.",
          issuer: "EXAMPLE UNIVERSITY",
          type: "Graduation credential",
          fields: [
            ["name", "Ayşe Yılmaz"],
            ["programme", "Computer Eng."],
            ["year", "2026"],
          ],
          seal: "institution signature",
          sig: "signature: ES256 · institution certificate",
        },
      },
      {
        id: "disclosure",
        title: "Selective disclosure",
        what: "Each field of the credential is locked separately. The person opens only the field that is asked for; the rest stay closed.",
        why: "An exam centre, a bank and a concert gate ask for different things from the same credential, and none of them needs everything.",
        solves: "Sharing more personal data than necessary.",
        d: {
          title: "Selective disclosure",
          desc: "The credential has four fields, each stored with its own digest. Only the over-18 fact is revealed, and the birth date stays hidden.",
          card: "fields in the credential",
          shared: "what the verifier sees",
          hidden: "hidden",
          fields: [
            { k: "over 18", v: "18+: yes", show: true },
            { k: "birth date", v: "", show: false },
            { k: "full name", v: "", show: false },
            { k: "document no", v: "", show: false },
          ],
        },
      },
      {
        id: "zk",
        title: "Zero-knowledge proof",
        what: "Proving that something is true without showing the thing itself. For example, that you are over 18 without showing your birth date.",
        why: "Questions about age, membership or authority can be answered without opening all of a person's data.",
        solves: "Showing a whole ID for a yes-or-no question.",
        d: {
          title: "Zero-knowledge proof",
          desc: "The birth date is the input to the proof, and the only thing that comes out is that the person is over 18. The birth date itself never reaches the verifier.",
          input: "on the phone",
          inputSub: "Birth date",
          proof: "proof",
          output: "Over|18",
          never: "the birth date never reaches the verifier",
        },
      },
      {
        id: "pseudonym",
        title: "A pseudonym per site",
        what: "\"Sign in with Tamga\" gives every site a different identifier for you (a pseudonym). The site recognises you but cannot match you with other sites.",
        why: "Which sites a person uses cannot be linked, even if the sites share data.",
        solves: "Cross-site tracking and profiling.",
        d: {
          title: "A pseudonym per site",
          desc: "The same person appears with three different identifiers on three sites, and the sites cannot link them.",
          person: "You",
          sites: [
            ["ticket site", "k7f2…9a"],
            ["library", "p91a…3c"],
            ["exam portal", "z3c8…e1"],
          ],
          cant: "sites cannot match each other",
        },
      },
      {
        id: "chain",
        title: "Chain of trust",
        what: "That an institution really is that institution is read from a list signed by the state. The lists in turn are linked to a list of lists.",
        why: "Every state stays the owner of its list; because the lists share one format, they recognise each other.",
        solves: "Answering \"does this institution really exist?\" separately in every country.",
        d: {
          title: "Chain of trust",
          desc: "The list of lists signs the national list, the national list signs the institution certificate, and the institution signs the credential.",
          steps: [
            ["List of lists", "LOTL · trust.tamga.network"],
            ["Türkiye list", "signed by the state"],
            ["Institution certificate", "X.509 · registered institution"],
            ["Credential", "signed by the institution"],
          ],
          signs: "signs",
        },
      },
    ],
  },
  verify: {
    eyebrow: "Try it yourself",
    title: "Trust, as open as a signature.",
    lead: "The list is re-signed on every change and chained to the previous version by hash. The public anchor log also gets a new line at least every hour, so no one can change the list silently and anyone can verify it.",
    button: "Verify the signature",
    how: "How it works",
    sample: "lotl.jws · sample",
    ok: "Signature valid · root fingerprint matches",
    pending: "Not verified",
    fields: [
      ["scheme", "Tamga LOTL"],
      ["version", "[version]"],
      ["issued_at", "[issue time]"],
      ["next_update", "[within 90 days]"],
      ["operator", "Tamga · provisional, on_behalf_of: TR"],
      ["previous_hash", "sha256:[digest of previous version]"],
      ["alg · x5c", "ES256 · root certificate chain"],
    ],
  },
  stack: {
    eyebrow: "Layers of the network",
    title: "From rules to wallets, six layers.",
    cta: "Open Tamga ARF",
    layers: [
      { title: "Rules", body: "Tamga ARF, the Trust Framework, the Tamga Rulebook and the credential-type rulebooks.", status: "In force" },
      { title: "Trust lists", body: "Signed, versioned national lists and the list of lists that points to them.", status: "In force" },
      { title: "Credential formats", body: "SD-JWT VC and ISO mdoc; issuance with OpenID4VCI, presentation with OpenID4VP.", status: "In force" },
      { title: "Open packages", body: "Verification, issuance and the wallet core, which anyone can run on their own server.", status: "Pre-release" },
      { title: "On top of the network", body: "Wallets and service providers that follow the network's rules. The first wallet is Tamga Wallet.", status: "On top" },
      { title: "Shared ledger", body: "Once at least two independent operators join, the same records move to a permissioned ledger.", status: "Later", future: true },
    ],
  },
  doors: {
    eyebrow: "Join",
    title: "Three doors into the network.",
    items: [
      { kicker: "Institutions", title: "Issue and verify credentials.", body: "Register, get your key on the list, issue your first credential.", cta: "Join as an institution", href: "/join" },
      { kicker: "Wallet providers", title: "Get your wallet recognised.", body: "The network doesn't pick wallets, it recognises the ones that follow the rules. Every wallet that follows the rules and passes the conformance tests is listed. You can test your wallet in the sandbox first.", cta: "Start conformance tests", href: "/join" },
      { kicker: "States", title: "Publish your own list.", body: "When you publish your own trust list, the network points to it. For wallets, only the address changes.", cta: "Explore the federation", href: "/learn/trust-lists" },
    ],
  },
  news: {
    eyebrow: "News and events",
    title: "Latest from the network.",
    allPosts: "All posts",
    allEvents: "Events",
    upcoming: "Upcoming event",
    latest: "Latest post",
    read: "Read",
  },
  gov: {
    eyebrow: "Governance",
    title: "A provisional operator today. A foundation tomorrow.",
    lead: "Tamga runs the network today, but the network does not belong to Tamga. The path was written down from the start. As states join, governance will be shared, and once there are two independent operators the records will move to a shared ledger.",
    steps: [
      { when: "Today", title: "Provisional operator", body: "Tamga publishes the Türkiye list on behalf of the state, with open rules and a public anchor log." },
      { when: "When states join", title: "Council or foundation", body: "Lists are handed over to their owners, and the network's rules change by joint decision." },
      { when: "Two independent operators", title: "Shared ledger", body: "Records move to a permissioned ledger, and no single party can change them alone." },
    ],
    roles: {
      title: "Governance roles",
      desc: "The network's rules sit in the middle, and the operator, the registrar and the state lists work by those rules.",
      operator: "Operator",
      registrar: "Registrar",
      states: "State lists",
      network: "Network rules|Tamga ARF",
    },
    arf: "Read the Trust Framework",
    blog: "Why no blockchain yet?",
  },
  dev: {
    eyebrow: "Developers",
    title: "Two packages, five minutes.",
    lead: "Verify a credential on your own server. With the hosted verifier you don't even need server code.",
    npmNote: "The packages are published on npm as the 0.7.2 test release; the stable 1.0.0 comes when everything is ready. In test releases the API may change.",
    docs: "Go to the docs",
    github: "GitHub",
    copy: "Copy",
    copied: "Copied",
  },
  eu: {
    eyebrow: "EU compatibility",
    title: "The Turkic-world counterpart of what the EU built.",
    head: ["European Union", "Tamga Network", "What it means"],
    rows: [
      { eu: "eIDAS 2.0 and implementing acts", tamga: "Trust Framework", what: "Who joins, who supervises, how it is handed over." },
      { eu: "EU ARF", tamga: "Tamga ARF 1.0", what: "Roles, architecture, trust model." },
      { eu: "High-level requirements", tamga: "Tamga Rulebook", what: "Numbered, binding rules for every role." },
      { eu: "Attestation rulebooks", tamga: "Education · Identity · Event Ticket", what: "Each credential type's own rules." },
      { eu: "Trusted lists (LOTL)", tamga: "Tamga LOTL and national lists", what: "Same format; EU lists are read as external lists." },
    ],
  },
};

const tk: HomeContent = {
  hero: {
    eyebrow: "Açyk ynam tory · Tamga ARF 1.0",
    title: "Türki dünýäsi üçin sanly ynam tory.",
    lead: "Resminamanyň hakykydygyny subut etmek üçin jaňlar, apostil we hepdeler gerek bolmaly däl. Tamga Network guramalaryň berýän sanly resminamalaryny serhet tanaman, birnäçe sekuntda we adamyň şahsy durmuşyny goraýan görnüşde barlamaga mümkinçilik berýän umumy düzgünler we gol çekilen sanawlardyr.",
    primary: "Tora goşul",
    secondary: "Düzgünleri oka",
    listTitle: "Sanawlaryň sanawy · LOTL",
    listHost: "trust.tamga.network",
    rows: [
      { code: "TR", name: "Türkiýäniň sanawy", status: "Işleýär · wagtlaýyn operator", live: true },
      { code: "AZ", name: "Azerbaýjanyň sanawy", status: "Orun goýuldy" },
      { code: "KZ", name: "Gazagystanyň sanawy", status: "Orun goýuldy" },
      { code: "KG", name: "Gyrgyzystanyň sanawy", status: "Orun goýuldy" },
      { code: "UZ", name: "Özbegistanyň sanawy", status: "Orun goýuldy" },
      { code: "TM", name: "Türkmenistanyň sanawy", status: "Orun goýuldy" },
      { code: "EU", name: "ÝB sanawlary (federasiýa)", status: "Daşky sanaw hökmünde okalýar" },
    ],
    listNote: "Her döwlet öz sanawyny özi çap edýär. Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn işledýär.",
  },
  partners: {
    eyebrow: "Hyzmatdaşlar",
    title: "Bilelikde işleýän guramalarymyz",
    empty: "Ilkinji hyzmatdaşlarymyzy ýakyn wagtda yglan ederis.",
    join: "Tora goşul",
    all: "Hyzmatdaşlar",
  },
  standards: {
    eyebrow: "Açyk standartlar",
    title: "Esaslanýan standartlarymyz",
  },
  why: {
    eyebrow: "Näme üçin Tamga Network?",
    title: "Resminamalar sanly, ynam bolsa entek kagyzda.",
    lead: "Mekdepler, hassahanalar, palatalar we kompaniýalar her gün resminama berýär. Emma resminamanyň hakykydygyny başga ýurtda, hatda başga guramada subut etmek henizem kyn.",
    problems: [
      { title: "Resminamalar serhetde saklanýar", body: "Bakuwda berlen resminamany Almatydaky gurama barlamak islände jaňlar, e-poçta, apostil we hepdeler gerek bolýar." },
      { title: "Galp resminama aňsat", body: "Skanirlenen PDF ýa-da nusga aňsat üýtgedilýär we hakykysyny galpyndan aýyrmak tejribe talap edýär." },
      { title: "Gerekdeninden köp maglumat berilýär", body: "Ýaşyňy subut etmek üçin tutuş şahsyýetnamaňy, okuwy gutarandygyňy subut etmek üçin tutuş baha sanawyňy görkezmeli bolýarsyň." },
      { title: "Her ýurduň ulgamy aýry", body: "Her ýurt öz sanly ulgamyny gurýar, ýöne bu ulgamlar biri-birini tanaýanok we bir dilde gürleşenok." },
      { title: "Ýewropa öňe gidýär, türki dünýäsi daşda galyp biler", body: "ÝB her agza ýurduň 2026-njy ýylyň ahyryna çenli raýatlaryna sanly şahsyýet gapjygyny hödürlemegini hökmany etdi. Umumy ynam gurluşy bolmasa, türki dünýäsiniň resminamalary bu tertipden daşda galar." },
    ],
    purposeTitle: "Maksadymyz",
    purpose: "Türki dünýäsinde bir guramanyň beren resminamasynyň başga ýurtda hem şol bir ynam bilen kabul edilmegini isleýäris. Muny hiç bir kompaniýanyň ýa-da hiç bir döwletiň elinde bolmadyk, açyk düzgünler bilen işleýän umumy tor arkaly edýäris. Resminamalar adamyň telefonynda durýar we adam diňe gerek zady görkezýär. Barlaýjy hem çeşmä soramazdan birnäçe sekuntda ynanýar.",
  },
  philosophy: {
    eyebrow: "Pelsepämiz",
    title: "Bäş ýörelge.",
    items: [
      { title: "Adam merkezde", body: "Resminama adamyň gapjygynda durýar. Näme görkeziljekdigini adam özi çözýär." },
      { title: "Tor hiç kimiň eýeçiligi däl", body: "Tor hyzmat satmaýar we hiç kime artykmaçlyk bermeýär. Ýetmek isleýän ýerimiz garaşsyz gaznadyr." },
      { title: "Sanaw döwletiňki", body: "Her döwlet öz ynam sanawynyň eýesidir we kimi ykrar etjegini özi çözýär." },
      { title: "Şahsy maglumat tora ýazylmaýar", body: "Sanawlara, ýazgylara we žurnallara şahsy maglumat girmeýär, onuň hash-i hem ýazylmaýar." },
      { title: "Açyk düzgün, açyk kod", body: "Her düzgün belgilenen we açyk; her paket açyk çeşmeli." },
    ],
  },
  how: {
    eyebrow: "Nähili işleýär",
    title: "Üç tarap, bir ynam sanawy.",
    lead: "Resminamany berýän gurama, ony göterýän adam we ony barlaýan tarap şol bir gol çekilen sanawa seredýär. Şonuň üçin hiç kimiň hiç kime jaň etmegi gerek däl.",
    flow: {
      title: "Tamga Network akymy",
      desc: "Resminama berýän gurama gol çekilen resminamany adamyň gapjygyna berýär. Adam barlaýja diňe soralan meýdanlary görkezýär we üç tarap hem döwletiň gol çekilen ynam sanawyna seredýär.",
      issuer: "Resminama berýän gurama",
      issuerSub: "uniwersitet · hassahana · palata",
      wallet: "Adamyň gapjygy",
      walletSub: "resminamalar telefonda",
      verifier: "Barlaýjy",
      verifierSub: "iş beriji · saýt · gapy",
      signed: "gol çekilen resminama",
      only: "diňe gerekli zat",
      trust: "Ynam sanawy",
      trustSub: "gol çekilen · döwletiňki",
      checks: "her tarap guramanyň hakykydygyny şu ýerden barlaýar",
    },
    steps: [
      { title: "Gurama gol çekýär", body: "Gurama resminama öz açary bilen gol çekýär we ony adamyň gapjygyna iberýär. Onuň açary döwletiň sanawynda hasaba alnandyr." },
      { title: "Adam ony göterýär", body: "Resminama telefonda durýar. Kimdir biri sorasa, adam näme soralýandygyny görýär we diňe tassyklan zadyny görkezýär." },
      { title: "Barlaýjy birnäçe sekuntda ynanýar", body: "Goly we guramanyň sanawdaky ýazgysyny barlaýar. Munuň üçin çeşmä soramagy ýa-da garaşmagy gerek däl." },
    ],
  },
  tech: {
    eyebrow: "Tehnologiýa, ýönekeý dilde",
    title: "Arkasyndaky bäş pikir.",
    lead: "Tamga Network täze bir zat oýlap tapmaýar. Ol Ýewropanyň sanly şahsyýet tertibinde ulanylýan we synagdan geçen usullary türki dünýäsi üçin bir ýere jemleýär.",
    labels: { what: "Bu näme", why: "Türki dünýäsinde näme üçin gerek", solves: "Çözýän meselesi" },
    topics: [
      {
        id: "credential",
        title: "Barlanyp bilinýän resminama",
        what: "Guramanyň sanly gol çeken resminamasy (credential). Bir harp üýtgese, gol bozulýar.",
        why: "Dürli dillerde we ulgamlarda berlen resminamalar bir görnüşde okalýar we şol bir usulda barlanýar.",
        solves: "Galp resminama we hepdeläp dowam edýän hat alyşmalar.",
        d: {
          title: "Barlanyp bilinýän resminama",
          desc: "Guramanyň goly we möhüri bilen sanly resminama kartoçkasy.",
          issuer: "NUSGA UNIWERSITETI",
          type: "Gutaryş resminamasy",
          fields: [
            ["ady", "Aýşe Ýylmaz"],
            ["hünär", "Kompýuter in."],
            ["ýyl", "2026"],
          ],
          seal: "guramanyň goly",
          sig: "gol: ES256 · guramanyň sertifikaty",
        },
      },
      {
        id: "disclosure",
        title: "Saýlap paýlaşmak",
        what: "Resminamanyň her meýdany aýratyn gulplanýar (selective disclosure). Adam diňe soralan meýdany açýar, galanlary ýapyk galýar.",
        why: "Synag merkezi, bank we konsert gapysy şol bir resminamadan dürli zatlary soraýar we olaryň hiç birine hemme zat gerek däl.",
        solves: "Gerekdeninden köp şahsy maglumat paýlaşmak.",
        d: {
          title: "Saýlap paýlaşmak",
          desc: "Resminamanyň her biri öz hash-i bilen saklanýan dört meýdany bar. Diňe 18 ýaşdan uly maglumaty açylýar, doglan senesi gizlin galýar.",
          card: "resminamadaky meýdanlar",
          shared: "barlaýjynyň görýäni",
          hidden: "gizlin",
          fields: [
            { k: "18 ýaşdan uly", v: "18+: hawa", show: true },
            { k: "doglan senesi", v: "", show: false },
            { k: "ady", v: "", show: false },
            { k: "resminama №", v: "", show: false },
          ],
        },
      },
      {
        id: "zk",
        title: "Nol bilim subutnamasy",
        what: "Bir zadyň dogrudygyny, şol zadyň özüni görkezmezden subut etmek (zero-knowledge proof). Mysal üçin, doglan seneňi görkezmezden 18 ýaşdan uludygyňy.",
        why: "Ýaş, agzalyk ýa-da ygtyýar baradaky soraglara adamyň ähli maglumatyny açmazdan jogap berip bolýar.",
        solves: "Hawa-ýok soragy üçin tutuş şahsyýetnamany görkezmek.",
        d: {
          title: "Nol bilim subutnamasy",
          desc: "Doglan senesi subutnamanyň girişidir we subutnamadan çykýan ýeke-täk maglumat adamyň 18 ýaşdan uludygydyr. Doglan senesiniň özi barlaýja ýetmeýär.",
          input: "telefonda",
          inputSub: "Doglan senesi",
          proof: "subutnama",
          output: "18 ýaşdan|uly",
          never: "doglan senesi barlaýja ýetmeýär",
        },
      },
      {
        id: "pseudonym",
        title: "Her saýt üçin lakam",
        what: "\"Tamga bilen gir\" her saýta seniň üçin başga bir kimlik belgisini berýär (pseudonym). Saýt seni tanaýar, emma beýleki saýtlar bilen gabat getirip bilmeýär.",
        why: "Adamyň haýsy saýtlary ulanýandygy, saýtlar maglumat paýlaşsa-da biri-birine baglanyp bilinmeýär.",
        solves: "Saýtlaryň arasynda yzarlamak we profil düzmek.",
        d: {
          title: "Her saýt üçin lakam",
          desc: "Şol bir adam üç saýtda üç dürli kimlik bilen görünýär we saýtlar olary biri-birine baglap bilmeýär.",
          person: "Sen",
          sites: [
            ["bilet saýty", "k7f2…9a"],
            ["kitaphana", "p91a…3c"],
            ["synag portaly", "z3c8…e1"],
          ],
          cant: "saýtlar biri-birini gabat getirip bilmeýär",
        },
      },
      {
        id: "chain",
        title: "Ynam zynjyry",
        what: "Guramanyň hakykatdan hem şol guramadygy döwletiň gol çeken sanawyndan okalýar. Sanawlar hem sanawlaryň sanawyna baglanýar.",
        why: "Her döwlet öz sanawynyň eýesi bolup galýar we sanawlar bir görnüşde bolany üçin biri-birini tanaýar.",
        solves: "\"Bu gurama hakykatdan barmy?\" soragyna her ýurtda aýratyn jogap bermek.",
        d: {
          title: "Ynam zynjyry",
          desc: "Sanawlaryň sanawy ýurt sanawyna, ýurt sanawy guramanyň sertifikatyna, gurama bolsa resminama gol çekýär.",
          steps: [
            ["Sanawlaryň sanawy", "LOTL · trust.tamga.network"],
            ["Türkiýäniň sanawy", "döwletiň goly"],
            ["Guramanyň sertifikaty", "X.509 · hasaba alnan gurama"],
            ["Resminama", "guramanyň goly"],
          ],
          signs: "gol çekýär",
        },
      },
    ],
  },
  verify: {
    eyebrow: "Özüň synap gör",
    title: "Ynam, gol ýaly açyk.",
    lead: "Sanaw her üýtgände täzeden gol çekilýär we öňki wersiýasyna hash bilen baglanýar. Açyk labyr žurnalyna hem azyndan sagatda bir setir goşulýar. Şonuň üçin hiç kim sanawy ýuwaşlyk bilen üýtgedip bilmez we her kim ony barlap biler.",
    button: "Goly barla",
    how: "Nähili işleýär",
    sample: "lotl.jws · nusga",
    ok: "Gol dogry · kök barmak yzy gabat geldi",
    pending: "Barlanmady",
    fields: [
      ["scheme", "Tamga LOTL"],
      ["version", "[wersiýa]"],
      ["issued_at", "[çap wagty]"],
      ["next_update", "[iň gijä 90 gün]"],
      ["operator", "Tamga · provisional, on_behalf_of: TR"],
      ["previous_hash", "sha256:[öňki wersiýanyň hash-i]"],
      ["alg · x5c", "ES256 · kök sertifikat zynjyry"],
    ],
  },
  stack: {
    eyebrow: "Toruň gatlaklary",
    title: "Düzgünden gapjyga, alty gatlak.",
    cta: "Tamga ARF-ny aç",
    layers: [
      { title: "Düzgünler", body: "Tamga ARF, Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary.", status: "Güýjünde" },
      { title: "Ynam sanawlary", body: "Gol çekilen, wersiýaly ýurt sanawlary we olary görkezýän sanawlaryň sanawy.", status: "Güýjünde" },
      { title: "Resminama görnüşleri", body: "SD-JWT VC we ISO mdoc; OpenID4VCI bilen bermek, OpenID4VP bilen görkezmek.", status: "Güýjünde" },
      { title: "Açyk paketler", body: "Barlamak, resminama bermek we gapjyk ýadrosy, olary her kim öz serwerinde işledip biler.", status: "Deslapky" },
      { title: "Toruň üstündäkiler", body: "Toruň düzgünlerine eýerýän gapjyklar we hyzmat üpjün edijiler. Ilkinji gapjyk Tamga Wallet.", status: "Toruň üstünde" },
      { title: "Umumy kitap", body: "Azyndan iki garaşsyz operator goşulanda şol ýazgylar rugsatly kitaba geçirilýär.", status: "Soňra", future: true },
    ],
  },
  doors: {
    eyebrow: "Goşulyş",
    title: "Tora üç gapydan girilýär.",
    items: [
      { kicker: "Guramalar", title: "Resminama beriň we barlaň.", body: "Hasaba duruň, açaryňyzy sanawa goşduryň, ilkinji resminamaňyzy beriň.", cta: "Gurama hökmünde goşul", href: "/join" },
      { kicker: "Gapjyk üpjün edijiler", title: "Gapjygyňyzy tora tanadyň.", body: "Tor gapjyk saýlamaýar, düzgünlere eýerýän gapjyklary ykrar edýär. Düzgünlere eýerýän we laýyklyk synaglaryndan geçen her gapjyk sanawa girýär. Gapjygyňyzy ilki sandbox-da synap bilersiňiz.", cta: "Laýyklyk synaglaryna başla", href: "/join" },
      { kicker: "Döwletler", title: "Sanawyňyzy özüňiz çap ediň.", body: "Öz ynam sanawyňyzy çap edeniňizde tor şol sanawy görkezýär. Gapjyklar üçin diňe salgy üýtgeýär.", cta: "Federasiýany öwren", href: "/learn/trust-lists" },
    ],
  },
  news: {
    eyebrow: "Habarlar we çäreler",
    title: "Tordan iň soňky habarlar.",
    allPosts: "Ähli ýazgylar",
    allEvents: "Çäreler",
    upcoming: "Golaýdaky çäre",
    latest: "Iň soňky ýazgy",
    read: "Oka",
  },
  gov: {
    eyebrow: "Dolandyryş",
    title: "Häzir wagtlaýyn operator. Ertir gazna.",
    lead: "Tory häzir Tamga işledýär, ýöne tor Tamga degişli däl. Gidiljek ýol başdan ýazyldy. Döwletler goşuldygyça dolandyryş umumy bolar, iki garaşsyz operator bolanda bolsa ýazgylar umumy kitaba geçiriler.",
    steps: [
      { when: "Häzir", title: "Wagtlaýyn operator", body: "Tamga Türkiýäniň sanawyny döwletiň adyndan açyk düzgünler we açyk labyr žurnaly bilen çap edýär." },
      { when: "Döwletler goşulanda", title: "Geňeş ýa-da gazna", body: "Sanawlar eýelerine geçirilýär we toruň düzgünleri bilelikdäki karar bilen üýtgeýär." },
      { when: "Iki garaşsyz operator", title: "Umumy kitap", body: "Ýazgylar rugsatly kitaba geçirilýär we hiç bir tarap olary ýeke özi üýtgedip bilmez." },
    ],
    roles: {
      title: "Dolandyryş rollary",
      desc: "Toruň düzgünleri ortada durýar. Operator, hasaba alyş guramasy we döwlet sanawlary şu düzgünlere görä işleýär.",
      operator: "Operator",
      registrar: "Hasaba alyş guramasy",
      states: "Döwlet sanawlary",
      network: "Toruň düzgünleri|Tamga ARF",
    },
    arf: "Trust Framework-y oka",
    blog: "Näme üçin entek blokçeýn däl?",
  },
  dev: {
    eyebrow: "Işläp düzüjiler",
    title: "Iki paket, bäş minut.",
    lead: "Resminamany öz serweriňizde barlaň. Ýerleşdirilen barlaýjyny ulansaňyz, serwer kody hem gerek däl.",
    npmNote: "Paketler npm-de 0.7.2 synag wersiýasy bilen çap edilýär; durnukly 1.0.0 taýýar bolanda geler. Synag wersiýasynda interfeýs üýtgäp biler.",
    docs: "Resminamalara geç",
    github: "GitHub",
    copy: "Göçür",
    copied: "Göçürildi",
  },
  eu: {
    eyebrow: "Ýewropa bilen laýyklyk",
    title: "ÝB-niň guran gurluşynyň türki dünýäsindäki gabatlygy.",
    head: ["Ýewropa Bileleşigi", "Tamga Network", "Bu näme"],
    rows: [
      { eu: "eIDAS 2.0 we ýerine ýetiriş namalary", tamga: "Trust Framework", what: "Kim goşulýar, kim gözegçilik edýär, nähili geçirilýär." },
      { eu: "EU ARF", tamga: "Tamga ARF 1.0", what: "Rollar, arhitektura, ynam modeli." },
      { eu: "Ýokary derejeli talaplar", tamga: "Tamga Rulebook", what: "Her rol üçin belgilenen, hökmany düzgünler." },
      { eu: "Attestation rulebook-lary", tamga: "Education · Identity · Event Ticket", what: "Her resminama görnüşiniň öz düzgünleri." },
      { eu: "Ynam sanawlary (LOTL)", tamga: "Tamga LOTL we ýurt sanawlary", what: "Şol bir görnüş; ÝB sanawlary daşky sanaw hökmünde okalýar." },
    ],
  },
};

const az: HomeContent = {
  hero: {
    eyebrow: "Açıq etibar şəbəkəsi · Tamga ARF 1.0",
    title: "Türk dünyası üçün rəqəmsal etibar şəbəkəsi.",
    lead: "Sənədin həqiqi olduğunu sübut etmək üçün telefon zəngləri, apostil və həftələr tələb olunmamalıdır. Tamga Network istənilən qurumun verdiyi rəqəmsal sənədlərin sərhədlərdən asılı olmayaraq, saniyələr ərzində və şəxsin məxfiliyini qorumaqla yoxlanılmasına imkan verən ortaq qaydalar və imzalanmış siyahılar toplusudur.",
    primary: "Şəbəkəyə qoşulun",
    secondary: "Qaydaları oxuyun",
    listTitle: "Siyahılar siyahısı · LOTL",
    listHost: "trust.tamga.network",
    rows: [
      { code: "TR", name: "Türkiyə siyahısı", status: "Yayımdadır · müvəqqəti operator", live: true },
      { code: "AZ", name: "Azərbaycan siyahısı", status: "Yer ayrılıb" },
      { code: "KZ", name: "Qazaxıstan siyahısı", status: "Yer ayrılıb" },
      { code: "KG", name: "Qırğızıstan siyahısı", status: "Yer ayrılıb" },
      { code: "UZ", name: "Özbəkistan siyahısı", status: "Yer ayrılıb" },
      { code: "TM", name: "Türkmənistan siyahısı", status: "Yer ayrılıb" },
      { code: "EU", name: "Aİ siyahıları (federasiya)", status: "Xarici siyahı kimi oxunur" },
    ],
    listNote: "Hər dövlət öz siyahısını özü dərc edir. Hazırda Türkiyə siyahısını dövlət adından müvəqqəti olaraq Tamga idarə edir.",
  },
  partners: {
    eyebrow: "Tərəfdaşlar",
    title: "Birgə işlədiyimiz qurumlar",
    empty: "İlk tərəfdaşlarımızı tezliklə elan edəcəyik.",
    join: "Şəbəkəyə qoşulun",
    all: "Tərəfdaşlar",
  },
  standards: {
    eyebrow: "Açıq standartlar",
    title: "Əsaslandığımız standartlar",
  },
  why: {
    eyebrow: "Nə üçün Tamga Network?",
    title: "Sənədlər rəqəmsaldır, etibar isə hələ də kağız üzərindədir.",
    lead: "Məktəblər, xəstəxanalar, palatalar və şirkətlər hər gün sənəd verir. Lakin sənədin həqiqi olduğunu başqa ölkədə, hətta başqa qurumda sübut etmək hələ də çətindir.",
    problems: [
      { title: "Sənədlər sərhəddə ilişib qalır", body: "Almatıdakı qurum Bakıda verilmiş sənədi yoxlamaq istədikdə telefon zəngləri, e-poçtlar, apostil və həftələr tələb olunur." },
      { title: "Saxtakarlıq asandır", body: "Skan edilmiş PDF və ya surəti asanlıqla dəyişdirmək olar və həqiqisini saxtasından ayırmaq ekspertiza tələb edir." },
      { title: "İnsanlar həddindən artıq məlumat paylaşır", body: "Yaşınızı sübut etmək üçün bütün şəxsiyyət vəsiqənizi, məzun olduğunuzu sübut etmək üçün isə bütün qiymət cədvəlinizi göstərməli olursunuz." },
      { title: "Hər ölkənin öz sistemi var", body: "Hər ölkə öz rəqəmsal sistemini qurur, amma bu sistemlər bir-birini tanımır və eyni dildə danışmır." },
      { title: "Avropa irəliləyir; Türk dünyası kənarda qala bilər", body: "Avropa İttifaqı (Aİ) hər üzv dövlətdən 2026-cı ilin sonunadək vətəndaşlarına rəqəmsal şəxsiyyət cüzdanı təqdim etməyi tələb edir. Ortaq etibar strukturu olmadan Türk dünyasının rəqəmsal sənədləri bu nizamdan kənarda qalır." },
    ],
    purposeTitle: "Məqsədimiz",
    purpose: "Türk dünyasında bir qurumun verdiyi rəqəmsal sənədin başqa ölkədə də eyni etimadla qəbul edilməsini istəyirik. Bunu heç bir şirkətin və ya dövlətin tək başına sahib olmadığı, açıq qaydalarla işləyən ortaq şəbəkə vasitəsilə edirik. Rəqəmsal sənədlər şəxsin telefonunda saxlanılır və şəxs yalnız lazım olanı göstərir. Yoxlayan tərəf də mənbəyə müraciət etmədən saniyələr ərzində əmin olur.",
  },
  philosophy: {
    eyebrow: "Fəlsəfəmiz",
    title: "Beş prinsip.",
    items: [
      { title: "Şəxs mərkəzdədir", body: "Rəqəmsal sənəd şəxsin rəqəmsal cüzdanında saxlanılır. Nəyin göstəriləcəyinə şəxs özü qərar verir." },
      { title: "Heç kimin mülkiyyəti deyil", body: "Şəbəkə xidmət satmır və heç kimə imtiyaz vermir. Çatmaq istədiyimiz yer müstəqil fonddur." },
      { title: "Siyahı dövlətə məxsusdur", body: "Hər dövlət öz etibar siyahısının sahibidir və kimi tanıyacağına özü qərar verir." },
      { title: "Şəbəkədə fərdi məlumat yoxdur", body: "Siyahılara, qeydlərə və jurnallara fərdi məlumat daxil edilmir, hətta onun hash-i belə yazılmır." },
      { title: "Açıq qaydalar, açıq kod", body: "Hər qayda nömrələnib və hamıya açıqdır, hər paket də açıq mənbəlidir." },
    ],
  },
  how: {
    eyebrow: "Necə işləyir",
    title: "Üç tərəf, bir etibar siyahısı.",
    lead: "Sənədi verən qurum, onu daşıyan şəxs və onu yoxlayan tərəf eyni imzalanmış siyahıya baxır. Ona görə heç kimin heç kimə zəng etməsinə ehtiyac qalmır.",
    flow: {
      title: "Tamga Network axını",
      desc: "Sənədi verən qurum imzalanmış rəqəmsal sənədi şəxsin rəqəmsal cüzdanına verir. Şəxs yoxlayan tərəfə yalnız tələb olunan sahələri göstərir və üç tərəfin hamısı dövlətin imzaladığı etibar siyahısına müraciət edir.",
      issuer: "Sənədi verən qurum",
      issuerSub: "universitet · xəstəxana · palata",
      wallet: "Şəxsin rəqəmsal cüzdanı",
      walletSub: "rəqəmsal sənədlər telefonda",
      verifier: "Yoxlayan tərəf",
      verifierSub: "işəgötürən · sayt · giriş qapısı",
      signed: "imzalanmış rəqəmsal sənəd",
      only: "yalnız lazım olanlar",
      trust: "Etibar siyahısı",
      trustSub: "imzalı · dövlət tərəfindən",
      checks: "hər tərəf qurumun həqiqi olduğunu burada yoxlayır",
    },
    steps: [
      { title: "Qurum imzalayır", body: "Qurum rəqəmsal sənədi öz açarı ilə imzalayır və şəxsin rəqəmsal cüzdanına göndərir. Qurumun açarı dövlətin siyahısında qeydiyyatdadır." },
      { title: "Şəxs onu daşıyır", body: "Rəqəmsal sənəd telefonda saxlanılır. Kimsə tələb etdikdə şəxs nəyin istənildiyini görür və yalnız təsdiqlədiyi məlumatları göstərir." },
      { title: "Yoxlayan tərəf saniyələr ərzində əmin olur", body: "İmzanı və qurumun siyahıdakı qeydini yoxlayır. Bunun üçün mənbəyə müraciət etməyə və ya gözləməyə ehtiyac yoxdur." },
    ],
  },
  tech: {
    eyebrow: "Texnologiya, sadə dillə",
    title: "Arxasında duran beş ideya.",
    lead: "Tamga Network yeni bir şey icad etmir. Avropanın rəqəmsal şəxsiyyət çərçivəsində istifadə olunan və sınaqdan keçmiş üsulları Türk dünyası üçün bir araya gətirir.",
    labels: { what: "Nədir", why: "Türk dünyasına nə üçün lazımdır", solves: "Həll etdiyi problem" },
    topics: [
      {
        id: "credential",
        title: "Yoxlanıla bilən rəqəmsal sənəd",
        what: "Qurumun rəqəmsal imza ilə imzaladığı sənəd (credential). Tək bir hərfi dəyişsəniz, imza pozulur.",
        why: "Müxtəlif dillərdə və sistemlərdə verilmiş sənədlər eyni formatda oxunur və eyni üsulla yoxlanılır.",
        solves: "Saxtakarlıq və həftələrlə davam edən yazışmalar.",
        d: {
          title: "Yoxlanıla bilən rəqəmsal sənəd",
          desc: "Qurumun imzası və möhürü olan rəqəmsal sənəd kartı.",
          issuer: "NÜMUNƏ UNİVERSİTETİ",
          type: "Məzun olma sənədi",
          fields: [
            ["ad soyad", "Ayşe Yılmaz"],
            ["ixtisas", "Kompüter müh."],
            ["il", "2026"],
          ],
          seal: "qurumun imzası",
          sig: "imza: ES256 · qurumun sertifikatı",
        },
      },
      {
        id: "disclosure",
        title: "Seçici paylaşım",
        what: "Rəqəmsal sənədin hər sahəsi ayrıca kilidlənir (selective disclosure). Şəxs yalnız tələb olunan sahəni açır, qalanları qapalı qalır.",
        why: "İmtahan mərkəzi, bank və konsert girişi eyni rəqəmsal sənəddən müxtəlif məlumatlar tələb edir və onların heç birinə hər şey lazım deyil.",
        solves: "Lazım olduğundan artıq fərdi məlumat paylaşmaq.",
        d: {
          title: "Seçici paylaşım",
          desc: "Rəqəmsal sənədin hər biri öz xülasəsi (digest) ilə saxlanılan dörd sahəsi var. Yalnız 18 yaşdan yuxarı olma faktı açılır, doğum tarixi gizli qalır.",
          card: "rəqəmsal sənəddəki sahələr",
          shared: "yoxlayan tərəfin gördüyü",
          hidden: "gizli",
          fields: [
            { k: "18 yaşdan yuxarı", v: "18+: bəli", show: true },
            { k: "doğum tarixi", v: "", show: false },
            { k: "ad soyad", v: "", show: false },
            { k: "sənəd nömrəsi", v: "", show: false },
          ],
        },
      },
      {
        id: "zk",
        title: "Sıfır bilik sübutu",
        what: "Bir şeyin doğru olduğunu həmin şeyin özünü göstərmədən sübut etmək. Məsələn, doğum tarixinizi göstərmədən 18 yaşdan yuxarı olduğunuzu.",
        why: "Yaş, üzvlük və ya səlahiyyət barədə suallara şəxsin bütün məlumatlarını açmadan cavab vermək olar.",
        solves: "Bəli-xeyr sualı üçün bütün şəxsiyyət vəsiqəsini göstərmək.",
        d: {
          title: "Sıfır bilik sübutu",
          desc: "Doğum tarixi sübutun girişidir və sübutdan çıxan yeganə məlumat şəxsin 18 yaşdan yuxarı olmasıdır. Doğum tarixinin özü heç vaxt yoxlayan tərəfə çatmır.",
          input: "telefonda",
          inputSub: "Doğum tarixi",
          proof: "sübut",
          output: "18 yaşdan|yuxarı",
          never: "doğum tarixi heç vaxt yoxlayan tərəfə çatmır",
        },
      },
      {
        id: "pseudonym",
        title: "Hər sayt üçün təxəllüs",
        what: "\"Tamga ilə daxil olun\" hər sayta Sizin üçün fərqli identifikator verir (pseudonym). Sayt Sizi tanıyır, lakin Sizi digər saytlarla uyğunlaşdıra bilmir.",
        why: "Şəxsin hansı saytlardan istifadə etdiyini, saytlar məlumat paylaşsa belə, əlaqələndirmək mümkün deyil.",
        solves: "Saytlararası izləmə və profil yaradılması.",
        d: {
          title: "Hər sayt üçün təxəllüs",
          desc: "Eyni şəxs üç saytda üç fərqli identifikatorla görünür və saytlar onları bir-biri ilə əlaqələndirə bilmir.",
          person: "Siz",
          sites: [
            ["bilet saytı", "k7f2…9a"],
            ["kitabxana", "p91a…3c"],
            ["imtahan portalı", "z3c8…e1"],
          ],
          cant: "saytlar bir-birini uyğunlaşdıra bilmir",
        },
      },
      {
        id: "chain",
        title: "Etibar zənciri",
        what: "Qurumun həqiqətən həmin qurum olduğu dövlətin imzaladığı siyahıdan oxunur. Siyahılar da öz növbəsində siyahılar siyahısına bağlıdır.",
        why: "Hər dövlət öz siyahısının sahibi olaraq qalır və siyahılar eyni formatda olduğu üçün bir-birini tanıyır.",
        solves: "\"Bu qurum həqiqətən mövcuddurmu?\" sualına hər ölkədə ayrıca cavab vermək.",
        d: {
          title: "Etibar zənciri",
          desc: "Siyahılar siyahısı ölkə siyahısını, ölkə siyahısı qurumun sertifikatını, qurum isə rəqəmsal sənədi imzalayır.",
          steps: [
            ["Siyahılar siyahısı", "LOTL · trust.tamga.network"],
            ["Türkiyə siyahısı", "dövlət tərəfindən imzalanıb"],
            ["Qurumun sertifikatı", "X.509 · qeydiyyatlı qurum"],
            ["Rəqəmsal sənəd", "qurum tərəfindən imzalanıb"],
          ],
          signs: "imzalayır",
        },
      },
    ],
  },
  verify: {
    eyebrow: "Özünüz sınayın",
    title: "Etibar imza qədər açıqdır.",
    lead: "Siyahı hər dəyişiklikdə yenidən imzalanır və hash vasitəsilə əvvəlki versiyaya bağlanır. İctimai lövbər jurnalına da ən azı saatda bir yeni sətir əlavə olunur. Buna görə heç kim siyahını xəbərsiz dəyişə bilməz və hər kəs onu yoxlaya bilər.",
    button: "İmzanı yoxlayın",
    how: "Necə işləyir",
    sample: "lotl.jws · nümunə",
    ok: "İmza etibarlıdır · kök barmaq izi uyğundur",
    pending: "Yoxlanılmayıb",
    fields: [
      ["scheme", "Tamga LOTL"],
      ["version", "[versiya]"],
      ["issued_at", "[dərc vaxtı]"],
      ["next_update", "[90 gün ərzində]"],
      ["operator", "Tamga · provisional, on_behalf_of: TR"],
      ["previous_hash", "sha256:[əvvəlki versiyanın xülasəsi]"],
      ["alg · x5c", "ES256 · kök sertifikat zənciri"],
    ],
  },
  stack: {
    eyebrow: "Şəbəkənin qatları",
    title: "Qaydalardan rəqəmsal cüzdanlara, altı qat.",
    cta: "Tamga ARF-ni açın",
    layers: [
      { title: "Qaydalar", body: "Tamga ARF, Trust Framework, Tamga Rulebook və rəqəmsal sənəd növlərinin rulebook-ları.", status: "Qüvvədədir" },
      { title: "Etibar siyahıları", body: "İmzalanmış, versiyalı ölkə siyahıları və onlara istinad edən siyahılar siyahısı.", status: "Qüvvədədir" },
      { title: "Rəqəmsal sənəd formatları", body: "SD-JWT VC və ISO mdoc; OpenID4VCI ilə vermə, OpenID4VP ilə təqdimetmə.", status: "Qüvvədədir" },
      { title: "Açıq paketlər", body: "Yoxlama, sənəd vermə və rəqəmsal cüzdan nüvəsi, onları hər kəs öz serverində işlədə bilər.", status: "İlkin versiya" },
      { title: "Şəbəkənin üzərində", body: "Şəbəkənin qaydalarına əməl edən rəqəmsal cüzdanlar və xidmət provayderləri. İlk rəqəmsal cüzdan Tamga Wallet-dır.", status: "Şəbəkə üzərində" },
      { title: "Ortaq reyestr", body: "Ən azı iki müstəqil operator qoşulduqda eyni qeydlər icazəli reyestrə köçürülür.", status: "Gələcəkdə", future: true },
    ],
  },
  doors: {
    eyebrow: "Qoşulma",
    title: "Şəbəkəyə üç qapıdan daxil olunur.",
    items: [
      { kicker: "Qurumlar", title: "Rəqəmsal sənəd verin və yoxlayın.", body: "Qeydiyyatdan keçin, açarınızı siyahıya əlavə etdirin, ilk rəqəmsal sənədinizi verin.", cta: "Qurum kimi qoşulun", href: "/join" },
      { kicker: "Cüzdan provayderləri", title: "Rəqəmsal cüzdanınızı tanıdın.", body: "Şəbəkə rəqəmsal cüzdan seçmir, qaydalara əməl edən cüzdanları tanıyır. Qaydalara əməl edən və uyğunluq testlərindən keçən hər rəqəmsal cüzdan siyahıya daxil edilir. Rəqəmsal cüzdanınızı əvvəlcə sandbox-da sınaya bilərsiniz.", cta: "Uyğunluq testlərinə başlayın", href: "/join" },
      { kicker: "Dövlətlər", title: "Öz siyahınızı dərc edin.", body: "Öz etibar siyahınızı dərc edəndə şəbəkə həmin siyahını göstərir. Rəqəmsal cüzdanlar üçün yalnız ünvan dəyişir.", cta: "Federasiya ilə tanış olun", href: "/learn/trust-lists" },
    ],
  },
  news: {
    eyebrow: "Xəbərlər və tədbirlər",
    title: "Şəbəkədən son yeniliklər.",
    allPosts: "Bütün yazılar",
    allEvents: "Tədbirlər",
    upcoming: "Qarşıdakı tədbir",
    latest: "Son yazı",
    read: "Oxuyun",
  },
  gov: {
    eyebrow: "İdarəetmə",
    title: "Bu gün müvəqqəti operator. Sabah fond.",
    lead: "Bu gün şəbəkəni Tamga idarə edir, amma şəbəkə Tamga-ya məxsus deyil. Gediləcək yol əvvəldən yazılıb. Dövlətlər qoşulduqca idarəetmə ortaq olacaq, iki müstəqil operator olanda isə qeydlər ortaq reyestrə köçürüləcək.",
    steps: [
      { when: "Bu gün", title: "Müvəqqəti operator", body: "Tamga Türkiyə siyahısını dövlət adından açıq qaydalar və ictimai lövbər jurnalı ilə dərc edir." },
      { when: "Dövlətlər qoşulduqda", title: "Şura və ya fond", body: "Siyahılar sahiblərinə təhvil verilir və şəbəkənin qaydaları birgə qərarla dəyişir." },
      { when: "İki müstəqil operator", title: "Ortaq reyestr", body: "Qeydlər icazəli reyestrə köçürülür və heç bir tərəf onları təkbaşına dəyişə bilməz." },
    ],
    roles: {
      title: "İdarəetmə rolları",
      desc: "Şəbəkənin qaydaları mərkəzdə durur. Operator, qeydiyyat orqanı və dövlət siyahıları bu qaydalara əsasən işləyir.",
      operator: "Operator",
      registrar: "Qeydiyyat orqanı",
      states: "Dövlət siyahıları",
      network: "Şəbəkənin qaydaları|Tamga ARF",
    },
    arf: "Trust Framework-u oxuyun",
    blog: "Niyə hələ blokçeyn yoxdur?",
  },
  dev: {
    eyebrow: "Tərtibatçılar",
    title: "İki paket, beş dəqiqə.",
    lead: "Rəqəmsal sənədi öz serverinizdə yoxlayın. Host edilən yoxlama xidmətindən istifadə etsəniz, server koduna belə ehtiyac yoxdur.",
    npmNote: "Paketlər npm-də 0.7.2 test buraxılışı kimi dərc olunur; sabit 1.0.0 versiyası hər şey hazır olduqda çıxacaq. Test buraxılışlarında API dəyişə bilər.",
    docs: "Dokumentasiyaya keçin",
    github: "GitHub",
    copy: "Kopyalayın",
    copied: "Kopyalandı",
  },
  eu: {
    eyebrow: "Aİ ilə uyğunluq",
    title: "Aİ-nin qurduğu sistemin Türk dünyasındakı qarşılığı.",
    head: ["Avropa İttifaqı", "Tamga Network", "Mənası"],
    rows: [
      { eu: "eIDAS 2.0 və icra aktları", tamga: "Trust Framework", what: "Kim qoşulur, kim nəzarət edir, necə təhvil verilir." },
      { eu: "EU ARF", tamga: "Tamga ARF 1.0", what: "Rollar, arxitektura, etibar modeli." },
      { eu: "Yüksək səviyyəli tələblər", tamga: "Tamga Rulebook", what: "Hər rol üçün nömrələnmiş, məcburi qaydalar." },
      { eu: "Attestation rulebook-ları", tamga: "Education · Identity · Event Ticket", what: "Hər rəqəmsal sənəd növünün öz qaydaları." },
      { eu: "Etibarlı siyahılar (LOTL)", tamga: "Tamga LOTL və ölkə siyahıları", what: "Eyni format; Aİ siyahıları xarici siyahı kimi oxunur." },
    ],
  },
};

const ALL: Record<Locale, HomeContent> = { en, tr, tk, az };

export function getHomeContent(locale: string): HomeContent {
  return ALL[(["en", "tr", "tk", "az"].includes(locale) ? locale : "en") as Locale];
}

/** Kod örneği (docs.tamga.network ana sayfasındaki ile aynı; yorumlar dile göre). */
export function devCode(locale: string): string {
  const c =
    locale === "tr"
      ? ["// 1. Güven listelerini yükle (kök parmak izi: tamga.network/trust-anchor)", "// 2. İmzalı istek oluştur, QR olarak göster"]
      : locale === "tk"
        ? ["// 1. Ynam sanawlaryny ýükle (kök barmak yzy: tamga.network/trust-anchor)", "// 2. Gol çekilen haýyş döret, QR hökmünde görkez"]
        : locale === "az"
          ? ["// 1. Etibar siyahılarını yükləyin (kök barmaq izi: tamga.network/trust-anchor)", "// 2. İmzalı sorğu yaradın, QR kod kimi göstərin"]
        : ["// 1. Load the trust lists (root fingerprint: tamga.network/trust-anchor)", "// 2. Create a signed request, show it as a QR code"];
  return `import { fetchListTrustSource, verifyJws } from "@tamga-network/trust";
import { createPresentationRequest, dcqlFromPolicy } from "@tamga-network/verifier";

${c[0]}
const { source: trust } = await fetchListTrustSource("https://trust.tamga.network", http, {
  rootFingerprints: [ROOT_FINGERPRINT],
  verifyJws,
});

${c[1]}
const req = await createPresentationRequest({
  signer,
  dcql: dcqlFromPolicy(AGE_OVER_18_POLICY),
  responseUri,
  requestUriBase,
});
show(req.qrPayload);`;
}

export const INSTALL_CMD = "npm install @tamga-network/verifier @tamga-network/trust";

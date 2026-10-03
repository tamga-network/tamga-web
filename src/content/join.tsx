import type { Locale } from "@/i18n/routing";

/*
 * "Ağa katıl" sayfası (eski /issuers, 2026-10-02). Üç kapı: kurumlar (belge veren / doğrulayıcı), cüzdan sağlayıcılar,
 * devletler ve ülke listeleri. Kaynak: tamga-network ADR-0016 (barındırılan belge verme API'si), ADR-0020 (yetkili kaynak
 * kurumda), ADR-0024 (katılımcı kayıt verisi), ADR-0025 (cüzdan ve anahtar kanıtı), ADR-0026 (kayıt sertifikaları),
 * ADR-0036 (federasyon: dış listeler, dış cüzdan sağlayıcıları), PM-GOV-0001/G1 (imza anahtarı ağda durmaz).
 * Ücret, takvim ve iş bilgisi yazılmaz (kamuya açık depo).
 */

type Item = { k: string; v: string };
type Door = { title: string; who: string; body: string; items: string[] };

export type JoinContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  principle: { title: string; body: string };
  doorsTitle: string;
  doors: Door[];
  whoTitle: string;
  who: Item[];
  getTitle: string;
  get: Item[];
  needTitle: string;
  need: { title: string; items: string[] }[];
  stepsTitle: string;
  steps: Item[];
  verifierTitle: string;
  verifierBody: string;
  apply: {
    title: string;
    body: string;
    mail: string;
    subject: string;
    docs: string;
    docsLabel: string;
    guide: string;
  };
};

const en: JoinContent = {
  meta: {
    title: "Join the network",
    description:
      "How to join Tamga Network: institutions that issue or verify credentials, wallet providers, and states with their own trust lists. Registration data, legal and technical requirements, and the steps.",
  },
  eyebrow: "Join",
  title: "Join Tamga Network",
  lead: "Tamga Network is a trust network: institutions issue credentials, verifiers check them, wallets carry them, and signed trust lists say who is who. There are three ways in.",
  principle: {
    title: "Data stays with the institution",
    body: "The network does not access an institution's database and does not store people's data. At issuance the details are read through an endpoint the institution controls, signed with the institution's own key and sent to the person's phone.",
  },
  doorsTitle: "Three ways to join",
  doors: [
    {
      title: "Institutions",
      who: "issuers and verifiers",
      body: "Universities, hospitals, chambers, public bodies, companies and event organisers issue credentials; employers, websites and gates verify them.",
      items: [
        "registration data and an X.509 certificate",
        "an entry in the signed trust list",
        "hosted issuance or your own server (open-source packages)",
      ],
    },
    {
      title: "Wallet providers",
      who: "EU-compatible wallets",
      body: "Any wallet that follows the network's wallet rules can carry Tamga credentials. Tamga Wallet is the network's first wallet, not the only one.",
      items: [
        "registration as a wallet provider in the trust list",
        "wallet instance and key attestations",
        "conformance tests against the reference verifier",
      ],
    },
    {
      title: "States and national lists",
      who: "federation",
      body: "A state or trust-list operator keeps its own list. The network reads it with a pinned signer and an agreed scope; it does not copy or overrule it.",
      items: [
        "an external list in the ETSI format (TS 119 602)",
        "a pinned signing certificate and a defined scope",
        "approval through the network's governance",
      ],
    },
  ],
  whoTitle: "Which institutions",
  who: [
    { k: "Education", v: "student credential, diploma, certificates" },
    {
      k: "Health",
      v: "licence to practise, chamber membership, employment credential (in preparation)",
    },
    {
      k: "Public bodies",
      v: "credentials from an authentic source, on behalf of the state",
    },
    {
      k: "Companies",
      v: "employee and authorisation credentials, building access",
    },
    { k: "Events", v: "tickets bound to a person, single-use at the gate" },
  ],
  getTitle: "What joining changes",
  get: [
    {
      k: "No confirmation requests",
      v: "verifiers check the credential themselves; nobody needs to call or write to the institution.",
    },
    {
      k: "No forgeries",
      v: "without the institution's signature and its entry in the signed trust list, no valid credential can exist.",
    },
    {
      k: "Control",
      v: "revoke or suspend at once; issuance statistics in the Institution Console, never personal data.",
    },
    {
      k: "Data minimisation",
      v: "people share only what is asked; the institution never learns to whom a credential was shown.",
    },
    {
      k: "European standards",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 and signed trust lists — the EU wallet's building blocks.",
    },
    {
      k: "Open source",
      v: "the network's packages are Apache-2.0; issuance can also run on the institution's own servers.",
    },
  ],
  needTitle: "What an institution needs",
  need: [
    {
      title: "Registration data",
      items: [
        "legal name and display name",
        "official identifier (tax number, trade register number)",
        "postal address, website, institutional contact",
        "data protection authority; public body or not",
        "privacy policy link (shown in the wallet)",
      ],
    },
    {
      title: "Legal",
      items: [
        "participation agreement",
        "data processing agreement when the hosted service is used: the institution is the controller",
        "updated privacy notice for the people it issues to",
        "proof that it is entitled to issue this credential",
      ],
    },
    {
      title: "Technical",
      items: [
        "a signing key generated in its own key vault (KMS / HSM); only a certificate request (CSR) is sent",
        "a lookup endpoint in front of its records, following the OpenAPI contract, and/or API calls",
        "a revocation process (API or Institution Console)",
        "technical, data-protection and security contacts",
      ],
    },
  ],
  stepsTitle: "How joining works",
  steps: [
    { k: "1 · Scope", v: "which credentials, which pilot group" },
    {
      k: "2 · Credential type",
      v: "choose from the public catalogue or design a new type together",
    },
    { k: "3 · Legal", v: "agreements and privacy notice" },
    {
      k: "4 · Registration",
      v: "registration data, certificate, entry in the trust list",
    },
    {
      k: "5 · Integration",
      v: "lookup endpoint and/or API, tested end to end in the sandbox",
    },
    { k: "6 · Pilot, then live", v: "a small group first, then everyone" },
  ],
  verifierTitle: "Verifying instead of issuing?",
  verifierBody:
    "Employers, websites and gates join as registered verifiers: for each use they register which credential and fields they request, the purpose and a privacy policy. The wallet warns people when a verifier asks for more than it registered.",
  apply: {
    title: "Apply",
    body: "Write to us with your organisation's name and how you want to join: issuing, verifying, as a wallet provider or with a national list. We reply with the full requirements guide.",
    mail: "partners@tamga.network",
    subject: "Joining Tamga Network",
    docs: "https://docs.tamga.network",
    docsLabel: "Developer docs and API references",
    guide: "Step-by-step guide: Joining as an institution (developer docs)",
  },
};

const tr: JoinContent = {
  meta: {
    title: "Ağa katıl",
    description:
      "Tamga Network'e katılım: belge veren ya da doğrulayan kurumlar, cüzdan sağlayıcılar ve kendi güven listesi olan devletler. Kayıt bilgileri, hukuki ve teknik gereksinimler, adımlar.",
  },
  eyebrow: "Katılım",
  title: "Tamga Network'e katılın",
  lead: "Tamga Network bir güven ağıdır: kurumlar belge verir, doğrulayıcılar denetler, cüzdanlar taşır, imzalı güven listeleri kimin kim olduğunu söyler. Ağa üç kapıdan girilir.",
  principle: {
    title: "Veri kurumda kalır",
    body: "Ağ, kurumun veritabanına erişmez, kişilerin bilgilerini saklamaz. Belge verilirken bilgiler kurumun kontrol ettiği bir uçtan okunur, kurumun kendi anahtarıyla imzalanır ve kişinin telefonuna gider.",
  },
  doorsTitle: "Üç katılım yolu",
  doors: [
    {
      title: "Kurumlar",
      who: "belge veren ve doğrulayıcı",
      body: "Üniversiteler, hastaneler, meslek odaları, kamu kurumları, şirketler ve etkinlik düzenleyicileri belge verir; işverenler, web siteleri ve kapılar doğrular.",
      items: [
        "kayıt bilgileri ve X.509 sertifikası",
        "imzalı güven listesinde kayıt",
        "barındırılan belge verme ya da kendi sunucunuz (açık kaynak paketler)",
      ],
    },
    {
      title: "Cüzdan sağlayıcılar",
      who: "AB uyumlu cüzdanlar",
      body: "Ağın cüzdan kurallarına uyan her cüzdan Tamga belgelerini taşıyabilir. Tamga Wallet ağın ilk cüzdanıdır, tek cüzdanı değil.",
      items: [
        "güven listesinde cüzdan sağlayıcı kaydı",
        "cüzdan örneği kanıtı ve anahtar kanıtı",
        "referans doğrulayıcıya karşı uyum testleri",
      ],
    },
    {
      title: "Devletler ve ülke listeleri",
      who: "federasyon",
      body: "Bir devlet ya da güven listesi işleticisi kendi listesini tutar. Ağ bu listeyi sabitlenmiş imzacı ve anlaşılmış kapsamla okur; kopyalamaz, üstüne çıkmaz.",
      items: [
        "ETSI biçiminde dış liste (TS 119 602)",
        "sabitlenmiş imza sertifikası ve tanımlı kapsam",
        "ağın yönetişiminden onay",
      ],
    },
  ],
  whoTitle: "Hangi kurumlar",
  who: [
    { k: "Eğitim", v: "öğrenci belgesi, diploma, sertifikalar" },
    {
      k: "Sağlık",
      v: "meslek icra belgesi, oda üyeliği, kurum görev belgesi (hazırlanıyor)",
    },
    {
      k: "Kamu kurumları",
      v: "yetkili kaynaktan, devlet adına verilen belgeler",
    },
    { k: "Şirketler", v: "çalışan ve yetki belgeleri, bina girişi" },
    { k: "Etkinlikler", v: "kişiye bağlı, kapıda tek kullanımlık biletler" },
  ],
  getTitle: "Katılım neyi değiştirir",
  get: [
    {
      k: "Teyit yazışmaları biter",
      v: "doğrulayıcı belgeyi kendisi denetler; kimse kurumu aramaz, yazı yazmaz.",
    },
    {
      k: "Sahtecilik biter",
      v: "kurumun imzası ve imzalı güven listesindeki kaydı olmadan geçerli belge olamaz.",
    },
    {
      k: "Kontrol kurumda",
      v: "iptal ve askıya alma anında; Kurum Konsolu'nda istatistik, kişisel veri asla.",
    },
    {
      k: "Veri azaltma",
      v: "kişi yalnız istenen alanı paylaşır; belgenin kime gösterildiğini kurum da öğrenmez.",
    },
    {
      k: "Avrupa standartları",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 ve imzalı güven listeleri — AB cüzdanının yapı taşları.",
    },
    {
      k: "Açık kaynak",
      v: "ağın paketleri Apache-2.0; belge verme kurumun kendi sunucusunda da çalışabilir.",
    },
  ],
  needTitle: "Kurumdan istenenler",
  need: [
    {
      title: "Kayıt bilgileri",
      items: [
        "resmî ad ve görünen ad",
        "resmî kimlik numarası (VKN, MERSİS)",
        "posta adresi, web sitesi, kurumsal iletişim",
        "veri koruma kurumu; kamu kurumu olup olmadığı",
        "gizlilik politikası bağlantısı (cüzdanda gösterilir)",
      ],
    },
    {
      title: "Hukuki",
      items: [
        "katılım sözleşmesi",
        "barındırılan hizmet kullanılıyorsa veri işleme sözleşmesi: veri sorumlusu kurum",
        "belge verilen kişiler için güncellenmiş aydınlatma metni",
        "bu belgeyi vermeye yetkili olunduğunun dayanağı",
      ],
    },
    {
      title: "Teknik",
      items: [
        "kurumun kendi anahtar kasasında (KMS / HSM) üretilen imza anahtarı; yalnız sertifika isteği (CSR) gönderilir",
        "kayıtların önünde, OpenAPI sözleşmesine uyan bir sorgu ucu ve/veya API çağrıları",
        "iptal süreci (API ya da Kurum Konsolu)",
        "teknik, veri koruma ve güvenlik iletişim kişileri",
      ],
    },
  ],
  stepsTitle: "Katılım nasıl işler",
  steps: [
    { k: "1 · Kapsam", v: "hangi belgeler, hangi pilot grubu" },
    {
      k: "2 · Belge türü",
      v: "herkese açık katalogdan seçim ya da birlikte yeni tür tasarımı",
    },
    { k: "3 · Hukuk", v: "sözleşmeler ve aydınlatma metni" },
    { k: "4 · Kayıt", v: "kayıt bilgileri, sertifika, güven listesine ekleme" },
    {
      k: "5 · Entegrasyon",
      v: "sorgu ucu ve/veya API; deneme ortamında uçtan uca test",
    },
    { k: "6 · Pilot, sonra canlı", v: "önce küçük bir grup, sonra herkes" },
  ],
  verifierTitle: "Belge vermek değil, doğrulamak mı?",
  verifierBody:
    "İşverenler, web siteleri ve kapılar kayıtlı doğrulayıcı olarak katılır: her kullanım için hangi belgeyi ve alanları istediklerini, amacı ve gizlilik politikalarını kaydederler. Doğrulayıcı kaydından fazlasını isterse cüzdan kişiyi uyarır.",
  apply: {
    title: "Başvuru",
    body: "Kurumunuzun adını ve nasıl katılmak istediğinizi (belge vermek, doğrulamak, cüzdan sağlayıcı ya da ülke listesi) yazarak bize ulaşın. Eksiksiz gereksinim rehberiyle dönüyoruz.",
    mail: "partners@tamga.network",
    subject: "Tamga Network'e katılım",
    docs: "https://docs.tamga.network",
    docsLabel: "Geliştirici belgeleri ve API başvuruları",
    guide: "Adım adım rehber: Kurum olarak katılım (geliştirici belgeleri)",
  },
};

const tk: JoinContent = {
  meta: {
    title: "Tora goşul",
    description:
      "Tamga Network-a goşulmak: resminama berýän ýa-da barlaýan guramalar, gapjyk üpjün edijiler we öz ynam sanawy bolan döwletler. Hasaba alyş maglumatlary, hukuk we tehniki talaplar, ädimler.",
  },
  eyebrow: "Goşulmak",
  title: "Tamga Network-a goşulyň",
  lead: "Tamga Network ynam torudyr: guramalar resminama berýär, barlaýjylar barlaýar, gapjyklar göterýär, gol çekilen ynam sanawlary kimiň kimdigini aýdýar. Tora üç ýol bilen girilýär.",
  principle: {
    title: "Maglumat guramada galýar",
    body: "Tor guramanyň maglumat binýadyna girmeýär, adamlaryň maglumatlaryny saklamaýar. Resminama berlende maglumatlar guramanyň dolandyrýan nokadyndan okalýar, guramanyň öz açary bilen gol çekilýär we adamyň telefonyna gidýär.",
  },
  doorsTitle: "Goşulmagyň üç ýoly",
  doors: [
    {
      title: "Guramalar",
      who: "resminama berijiler we barlaýjylar",
      body: "Uniwersitetler, hassahanalar, hünär palatalary, döwlet edaralary, kompaniýalar we çäre guraýjylar resminama berýär; iş berijiler, web saýtlar we gapylar barlaýar.",
      items: [
        "hasaba alyş maglumatlary we X.509 sertifikaty",
        "gol çekilen ynam sanawynda ýazgy",
        "ýerleşdirilen resminama beriş ýa-da öz serweriňiz (açyk çeşmeli paketler)",
      ],
    },
    {
      title: "Gapjyk üpjün edijiler",
      who: "ÝB bilen gabat gelýän gapjyklar",
      body: "Toruň gapjyk düzgünlerine eýerýän her gapjyk Tamga resminamalaryny göterip biler. Tamga Wallet toruň ilkinji gapjygy, ýeke-täk gapjygy däl.",
      items: [
        "ynam sanawynda gapjyk üpjün ediji ýazgysy",
        "gapjyk nusgasynyň we açaryň subutnamasy",
        "salgylanma barlaýja garşy laýyklyk synaglary",
      ],
    },
    {
      title: "Döwletler we ýurt sanawlary",
      who: "federasiýa",
      body: "Döwlet ýa-da ynam sanawyny işleýän öz sanawyny saklaýar. Tor bu sanawy berkidilen gol çekiji we ylalaşylan gerim bilen okaýar; göçürmeýär, üstünden geçmeýär.",
      items: [
        "ETSI görnüşinde daşky sanaw (TS 119 602)",
        "berkidilen gol sertifikaty we kesgitlenen gerim",
        "toruň dolandyryşyndan tassyklama",
      ],
    },
  ],
  whoTitle: "Haýsy guramalar",
  who: [
    { k: "Bilim", v: "talyp resminamasy, diplom, sertifikatlar" },
    {
      k: "Saglyk",
      v: "hünär işi resminamasy, palata agzalygy, gurama wezipe resminamasy (taýýarlanýar)",
    },
    {
      k: "Döwlet edaralary",
      v: "ygtyýarly çeşmeden, döwletiň adyndan berilýän resminamalar",
    },
    { k: "Kompaniýalar", v: "işgär we ygtyýar resminamalary, binä giriş" },
    { k: "Çäreler", v: "adama baglanan, gapyda bir gezeklik biletler" },
  ],
  getTitle: "Goşulmak nämäni üýtgedýär",
  get: [
    {
      k: "Tassyklama haýyşlary gutarýar",
      v: "barlaýjy resminamany özi barlaýar; hiç kim gurama jaň etmeýär, hat ýazmaýar.",
    },
    {
      k: "Galplyk gutarýar",
      v: "guramanyň golsuz we gol çekilen ynam sanawyndaky ýazgysyz hakyky resminama bolup bilmez.",
    },
    {
      k: "Dolandyryş guramada",
      v: "ýatyrmak we togtatmak derrew; Gurama konsolynda statistika, şahsy maglumat asla.",
    },
    {
      k: "Maglumaty azaltmak",
      v: "adam diňe soralan meýdany paýlaşýar; resminamanyň kime görkezilendigini gurama hem bilmeýär.",
    },
    {
      k: "Ýewropa standartlary",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 we gol çekilen ynam sanawlary — ÝB gapjygynyň gurluş daşlary.",
    },
    {
      k: "Açyk çeşme",
      v: "toruň paketleri Apache-2.0; resminama beriş guramanyň öz serwerinde hem işläp biler.",
    },
  ],
  needTitle: "Guramadan näme gerek",
  need: [
    {
      title: "Hasaba alyş maglumatlary",
      items: [
        "resmi at we görkezilýän at",
        "resmi belgi (salgyt belgisi, söwda sanawy belgisi)",
        "poçta salgysy, web saýt, gurama aragatnaşygy",
        "maglumat goraýyş edarasy; döwlet edarasymy ýa-da däl",
        "gizlinlik syýasatynyň salgysy (gapjykda görkezilýär)",
      ],
    },
    {
      title: "Hukuk",
      items: [
        "gatnaşyk şertnamasy",
        "ýerleşdirilen hyzmat ulanylsa maglumatlary işläp taýýarlamak şertnamasy: jogapkär gurama",
        "resminama berilýän adamlar üçin täzelenen düşündiriş haty",
        "bu resminamany bermäge ygtyýarlydygynyň esasy",
      ],
    },
    {
      title: "Tehniki",
      items: [
        "guramanyň öz açar ammarynda (KMS / HSM) döredilen gol açary; diňe sertifikat haýyşy (CSR) iberilýär",
        "ýazgylaryň öňünde OpenAPI şertnamasyna laýyk gözleg nokady we/ýa-da API çagyryşlary",
        "ýatyrylyş prosesi (API ýa-da Gurama konsoly)",
        "tehniki, maglumat goraýyş we howpsuzlyk aragatnaşyk adamlary",
      ],
    },
  ],
  stepsTitle: "Goşulmak nähili bolýar",
  steps: [
    { k: "1 · Gerim", v: "haýsy resminamalar, haýsy pilot topary" },
    {
      k: "2 · Resminama görnüşi",
      v: "açyk katalogdan saýlamak ýa-da bilelikde täze görnüş taslamak",
    },
    { k: "3 · Hukuk", v: "şertnamalar we düşündiriş haty" },
    {
      k: "4 · Hasaba alyş",
      v: "hasaba alyş maglumatlary, sertifikat, ynam sanawyna goşmak",
    },
    {
      k: "5 · Integrasiýa",
      v: "gözleg nokady we/ýa-da API; synag gurşawynda başdan-aýak synag",
    },
    { k: "6 · Pilot, soňra göni", v: "ilki kiçi topar, soňra hemmeler" },
  ],
  verifierTitle: "Resminama bermek däl-de, barlamakmy?",
  verifierBody:
    "Iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjy hökmünde goşulýar: her ulanyş üçin haýsy resminamany we meýdanlary soraýandyklaryny, maksady we gizlinlik syýasatyny hasaba alýarlar. Barlaýjy hasaba alnanyndan köp sorasa, gapjyk adamy duýdurýar.",
  apply: {
    title: "Ýüz tutmak",
    body: "Guramaňyzyň adyny we nähili goşulmak isleýändigiňizi (resminama bermek, barlamak, gapjyk üpjün ediji ýa-da ýurt sanawy) ýazyp, biz bilen habarlaşyň. Doly talaplar gollanmasy bilen jogap berýäris.",
    mail: "partners@tamga.network",
    subject: "Tamga Network-a goşulmak",
    docs: "https://docs.tamga.network",
    docsLabel: "Işläp düzüji resminamalary we API salgylanmalary",
    guide: "Ädimme-ädim gollanma: Gurama hökmünde goşulmak (işläp düzüjiler üçin resminamalar)",
  },
};

const content: Record<Locale, JoinContent> = { en, tr, tk };

export function getJoinContent(locale: string): JoinContent {
  return content[locale as Locale] ?? content.en;
}

import type { Locale } from "@/i18n/routing";

/*
 * "Kurum olarak katıl" sayfası. Kaynak: tamga-network ADR-0016 (barındırılan belge verme API'si), ADR-0020 (yetkili kaynak
 * kurumda), ADR-0024 (katılımcı kayıt verisi), ADR-0026 (kayıt sertifikaları), PM-GOV-0001/G1 (imza anahtarı Tamga'da durmaz).
 * Ücret, takvim ve iş bilgisi yazılmaz (kamuya açık depo).
 */

type Item = { k: string; v: string };

export type IssuersContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  principle: { title: string; body: string };
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

const en: IssuersContent = {
  meta: {
    title: "Become an issuer",
    description:
      "How an institution issues digital credentials on Tamga: who can join, what you get, what is needed (registration data, legal, technical) and how to apply. The person's data stays at the institution.",
  },
  eyebrow: "For institutions",
  title: "Issue digital credentials with Tamga",
  lead: "Universities, hospitals, chambers, public bodies, companies and event organisers can issue credentials that people carry on their phones and anyone can verify in seconds, without calling you.",
  principle: {
    title: "Your data stays with you",
    body: "Tamga does not access your database and does not store people's data. At issuance the details are read from you, through an endpoint you control, signed with your own key and sent to the person's phone.",
  },
  whoTitle: "Who can join",
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
  getTitle: "What you get",
  get: [
    {
      k: "No more confirmation requests",
      v: "verifiers check the credential themselves; nobody needs to call or write to you.",
    },
    {
      k: "No forgeries",
      v: "without your signature and your entry in the signed trust list, no valid credential can exist.",
    },
    {
      k: "Control",
      v: "revoke or suspend at once; issuance statistics in the Institution Console, never personal data.",
    },
    {
      k: "Data minimisation",
      v: "people share only what is asked; you never learn to whom a credential was shown.",
    },
    {
      k: "European standards",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 and signed trust lists — the EU wallet's building blocks.",
    },
    {
      k: "No lock-in",
      v: "open-source packages (Apache-2.0); you can run the issuing service on your own servers.",
    },
  ],
  needTitle: "What we need from you",
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
        "cooperation agreement",
        "data processing agreement: you are the controller, Tamga the processor",
        "updated privacy notice for the people you issue to",
        "proof that you are entitled to issue this credential",
      ],
    },
    {
      title: "Technical",
      items: [
        "a signing key generated in your own key vault (KMS / HSM); you send only a certificate request (CSR)",
        "a lookup endpoint in front of your records, following our OpenAPI contract, and/or calls to our API",
        "a revocation process (API or Institution Console)",
        "technical, data-protection and security contacts",
      ],
    },
  ],
  stepsTitle: "How joining works",
  steps: [
    { k: "1 · Scope", v: "live demo; which credentials, which pilot group" },
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
    "Employers, websites and gates join as registered verifiers: for each use you register which credential and fields you request, the purpose and a privacy policy. The wallet warns people when a verifier asks for more than it registered.",
  apply: {
    title: "Apply",
    body: "Write to us with your institution's name and the credentials you want to issue or verify. We reply with a demo date and the full requirements guide.",
    mail: "info@tamga.network",
    subject: "Institution application",
    docs: "https://docs.tamga.network",
    docsLabel: "Developer docs and API references",
    guide: "Full requirements guide on request",
  },
};

const tr: IssuersContent = {
  meta: {
    title: "Kurum olarak katıl",
    description:
      "Bir kurumun Tamga'da dijital belge vermesi: kimler katılabilir, kuruma ne kazandırır, neler gerekir (kayıt bilgileri, hukuk, teknik) ve nasıl başvurulur. Kişinin verisi kurumda kalır.",
  },
  eyebrow: "Kurumlar için",
  title: "Tamga ile dijital belge verin",
  lead: "Üniversiteler, hastaneler, meslek odaları, kamu kurumları, şirketler ve etkinlik düzenleyicileri; kişilerin telefonunda taşıdığı ve herkesin sizi aramadan saniyeler içinde doğrulayabildiği belgeler verebilir.",
  principle: {
    title: "Veriniz sizde kalır",
    body: "Tamga veritabanınıza erişmez, kişilerin bilgilerini saklamaz. Belge verilirken bilgiler sizin kontrol ettiğiniz bir uçtan okunur, sizin anahtarınızla imzalanır ve kişinin telefonuna gider.",
  },
  whoTitle: "Kimler katılabilir",
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
  getTitle: "Kurumunuza ne kazandırır",
  get: [
    {
      k: "Teyit yazışmaları biter",
      v: "doğrulayan taraf belgeyi kendisi denetler; kimse sizi aramaz, yazı yazmaz.",
    },
    {
      k: "Sahtecilik biter",
      v: "imzanız ve imzalı güven listesindeki kaydınız olmadan geçerli belge olamaz.",
    },
    {
      k: "Kontrol sizde",
      v: "iptal ve askıya alma anında; Kurum Konsolu'nda istatistik, kişisel veri asla.",
    },
    {
      k: "Veri azaltma",
      v: "kişi yalnız istenen alanı paylaşır; belgenin kime gösterildiğini siz de öğrenmezsiniz.",
    },
    {
      k: "Avrupa standartları",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 ve imzalı güven listeleri — AB cüzdanının yapı taşları.",
    },
    {
      k: "Kilitlenme yok",
      v: "açık kaynak paketler (Apache-2.0); belge verme servisini kendi sunucunuzda da çalıştırabilirsiniz.",
    },
  ],
  needTitle: "Sizden istediklerimiz",
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
        "iş birliği sözleşmesi",
        "veri işleme sözleşmesi: veri sorumlusu siz, veri işleyen Tamga",
        "belge verdiğiniz kişiler için güncellenmiş aydınlatma metni",
        "bu belgeyi vermeye yetkili olduğunuzun dayanağı",
      ],
    },
    {
      title: "Teknik",
      items: [
        "kendi anahtar kasanızda (KMS / HSM) üretilen imza anahtarı; bize yalnız sertifika isteği (CSR) gönderirsiniz",
        "kayıtlarınızın önünde, OpenAPI sözleşmemize uyan bir sorgu ucu ve/veya API çağrıları",
        "iptal süreci (API ya da Kurum Konsolu)",
        "teknik, veri koruma ve güvenlik iletişim kişileri",
      ],
    },
  ],
  stepsTitle: "Katılım nasıl işler",
  steps: [
    { k: "1 · Kapsam", v: "canlı gösterim; hangi belgeler, hangi pilot grubu" },
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
  verifierTitle: "Belge vermek değil, doğrulamak mı istiyorsunuz?",
  verifierBody:
    "İşverenler, web siteleri ve kapılar kayıtlı doğrulayıcı olarak katılır: her kullanım için hangi belgeyi ve alanları istediğinizi, amacı ve gizlilik politikanızı kaydedersiniz. Doğrulayıcı kaydından fazlasını isterse cüzdan kişiyi uyarır.",
  apply: {
    title: "Başvuru",
    body: "Kurumunuzun adını ve vermek ya da doğrulamak istediğiniz belgeleri yazarak bize ulaşın. Gösterim tarihi ve eksiksiz gereksinim rehberiyle dönüyoruz.",
    mail: "info@tamga.network",
    subject: "Kurum başvurusu",
    docs: "https://docs.tamga.network",
    docsLabel: "Geliştirici belgeleri ve API başvuruları",
    guide: "Eksiksiz gereksinim rehberi başvuru üzerine gönderilir",
  },
};

const tk: IssuersContent = {
  meta: {
    title: "Gurama hökmünde goşul",
    description:
      "Guramanyň Tamga-da sanly resminama bermegi: kimler goşulyp biler, guramaňyza näme berýär, näme gerek (hasaba alyş maglumatlary, hukuk, tehniki) we nähili ýüz tutulýar. Adamyň maglumaty guramada galýar.",
  },
  eyebrow: "Guramalar üçin",
  title: "Tamga bilen sanly resminama beriň",
  lead: "Uniwersitetler, hassahanalar, hünär palatalary, döwlet edaralary, kompaniýalar we çäre guraýjylar adamlaryň telefonynda göterýän we islendik kişiniň size jaň etmezden birnäçe sekuntda barlap bilýän resminamalaryny berip bilýär.",
  principle: {
    title: "Maglumatyňyz sizde galýar",
    body: "Tamga maglumat binýadyňyza girmeýär, adamlaryň maglumatlaryny saklamaýar. Resminama berlende maglumatlar siziň dolandyrýan nokadyňyzdan okalýar, öz açaryňyz bilen gol çekilýär we adamyň telefonyna gidýär.",
  },
  whoTitle: "Kimler goşulyp biler",
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
  getTitle: "Guramaňyza näme berýär",
  get: [
    {
      k: "Tassyklama haýyşlary gutarýar",
      v: "barlaýjy resminamany özi barlaýar; hiç kim size jaň etmeýär, hat ýazmaýar.",
    },
    {
      k: "Galplyk gutarýar",
      v: "siziň golsuz we gol çekilen ynam sanawyndaky ýazgyňyzsyz hakyky resminama bolup bilmez.",
    },
    {
      k: "Dolandyryş sizde",
      v: "ýatyrmak we togtatmak derrew; Gurama konsolynda statistika, şahsy maglumat asla.",
    },
    {
      k: "Maglumaty azaltmak",
      v: "adam diňe soralan meýdany paýlaşýar; resminamanyň kime görkezilendigini siz hem bilmeýärsiňiz.",
    },
    {
      k: "Ýewropa standartlary",
      v: "SD-JWT VC, OpenID4VCI / OpenID4VP, X.509 we gol çekilen ynam sanawlary — ÝB gapjygynyň gurluş daşlary.",
    },
    {
      k: "Bagly galmak ýok",
      v: "açyk çeşmeli paketler (Apache-2.0); resminama beriş hyzmatyny öz serweriňizde hem işledip bilersiňiz.",
    },
  ],
  needTitle: "Sizden näme gerek",
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
        "hyzmatdaşlyk şertnamasy",
        "maglumatlary işläp taýýarlamak şertnamasy: jogapkär siz, işläp taýýarlaýjy Tamga",
        "resminama berýän adamlaryňyz üçin täzelenen düşündiriş haty",
        "bu resminamany bermäge ygtyýarlydygyňyzyň esasy",
      ],
    },
    {
      title: "Tehniki",
      items: [
        "öz açar ammaryňyzda (KMS / HSM) döredilen gol açary; bize diňe sertifikat haýyşyny (CSR) iberýärsiňiz",
        "ýazgylaryňyzyň öňünde OpenAPI şertnamamyza laýyk gözleg nokady we/ýa-da API çagyryşlary",
        "ýatyrylyş prosesi (API ýa-da Gurama konsoly)",
        "tehniki, maglumat goraýyş we howpsuzlyk aragatnaşyk adamlary",
      ],
    },
  ],
  stepsTitle: "Goşulmak nähili bolýar",
  steps: [
    {
      k: "1 · Gerim",
      v: "göni görkeziş; haýsy resminamalar, haýsy pilot topary",
    },
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
  verifierTitle: "Resminama bermek däl-de, barlamak isleýärsiňizmi?",
  verifierBody:
    "Iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjy hökmünde goşulýar: her ulanyş üçin haýsy resminamany we meýdanlary soraýandygyňyzy, maksady we gizlinlik syýasatyňyzy hasaba alýarsyňyz. Barlaýjy hasaba alnanyndan köp sorasa, gapjyk adamy duýdurýar.",
  apply: {
    title: "Ýüz tutmak",
    body: "Guramaňyzyň adyny we bermek ýa-da barlamak isleýän resminamalaryňyzy ýazyp, biz bilen habarlaşyň. Görkeziş senesi we doly talaplar gollanmasy bilen jogap berýäris.",
    mail: "info@tamga.network",
    subject: "Gurama arzasy",
    docs: "https://docs.tamga.network",
    docsLabel: "Işläp düzüji resminamalary we API salgylanmalary",
    guide: "Doly talaplar gollanmasy arza boýunça iberilýär",
  },
};

const content: Record<Locale, IssuersContent> = { en, tr, tk };

export function getIssuersContent(locale: string): IssuersContent {
  return content[locale as Locale] ?? content.en;
}

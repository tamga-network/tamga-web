import type { Locale } from "@/i18n/routing";
import type { WalletMockData, FlowNode } from "@/components/scenario-visuals";

export type Scenario = { title: string; body: string };
export type Vertical = {
  id: string;
  icon: string;
  eyebrow: string;
  name: string;
  intro: string;
  scenarios: Scenario[];
  wallet: WalletMockData;
  flow: FlowNode[];
};
export type ScenariosContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  verticals: Vertical[];
};

/* -------------------------------------------------------------------------- */
/*  English                                                                   */
/* -------------------------------------------------------------------------- */

const en: ScenariosContent = {
  meta: {
    title: "Scenarios & use cases",
    description:
      "Real-world scenarios for Tamga Network across education, health, logistics and payments — with wallet mockups and trust-flow diagrams.",
  },
  eyebrow: "Use cases",
  title: "Scenarios: one trust layer, four worlds",
  intro:
    "Education, health, logistics and payments all run on the same shared trust layer — X.509 institutions, people with no global identifier, credentials carried in the wallet. Education (diplomas, student cards, campus passes) and event tickets already run end to end today; health, logistics and payments show where the same layer leads.",
  note: "Screens are illustrative mockups of Tamga Wallet; example values only.",
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Education",
      name: "Education",
      intro:
        "Diplomas, transcripts and academic titles become internationally verifiable credentials — issued once, presented anywhere, without a phone call back to the registrar.",
      scenarios: [
        {
          title: "A diploma issued once, verified anywhere",
          body: "A university (identified by an X.509 certificate) issues the diploma as a signed SD-JWT into the graduate's wallet. An employer checks the issuer against the signed trust list and the revocation status against the university’s published list — in seconds, without ever contacting the university.",
        },
        {
          title: "Show the degree, hide the grades",
          body: "For a job application the graduate reveals only the degree and graduation year; GPA and student number stay hidden as salted hashes. Data minimization by default.",
        },
        {
          title: "Recognized across the Turkic world",
          body: "Because a state can recognize Türkiye's education issuers (cross-recognition), a Turkish diploma is verifiable abroad with no new bureaucracy — and forged diplomas simply do not verify.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CREDENTIAL",
        badge: "VERIFIED",
        title: "University Diploma",
        subtitle: "Example University · X.509 (TR)",
        rows: [
          { k: "degree", v: "Computer Eng.", tone: "disclosed" },
          { k: "graduation", v: "2026", tone: "disclosed" },
          { k: "gpa", v: "hidden", tone: "hidden" },
          { k: "holder", v: "p:8f2…c19", tone: "accent" },
        ],
        action: "Present to employer",
        status: "SD-JWT · selective disclosure",
      },
      flow: [
        { icon: "education", label: "University", sub: "Issuer (X.509)" },
        { icon: "wallet", label: "Graduate", sub: "Holder (Tamga Wallet)" },
        { icon: "verifier", label: "Employer", sub: "Verifier" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Health",
      name: "Health",
      intro:
        "Physician authority, patient consent and health records — verified without exposing the whole medical file.",
      scenarios: [
        {
          title: "Verified physician authority",
          body: "A doctor carries a licence credential issued by the health authority (X.509). A pharmacy verifies that the prescriber is a licensed, currently-authorized physician before dispensing — no forged prescriptions.",
        },
        {
          title: "Consent with minimal disclosure",
          body: "A patient proves 'eligible / over 18 / no conflicting allergy' with a zero-knowledge or selective proof, without handing over their full record or identity.",
        },
        {
          title: "Health records that cross borders",
          body: "Travelling abroad, a patient presents a vaccination or prescription credential that any Tamga-recognized provider can verify — holder-controlled.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CONSENT",
        badge: "VERIFIED",
        title: "Prescription authorization",
        subtitle: "Ministry of Health · X.509 (TR)",
        rows: [
          { k: "prescriber", v: "licensed", tone: "disclosed" },
          { k: "age_over_18", v: "true", tone: "disclosed" },
          { k: "diagnosis", v: "hidden", tone: "hidden" },
          { k: "full_name", v: "hidden", tone: "hidden" },
        ],
        action: "Share with pharmacy",
        status: "ZK proof · consent logged",
      },
      flow: [
        { icon: "health", label: "Health authority", sub: "Issuer (X.509)" },
        { icon: "doctor", label: "Doctor / Patient", sub: "Holder" },
        { icon: "store", label: "Pharmacy", sub: "Verifier" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Logistics",
      name: "Logistics",
      intro:
        "Two worlds, one trust layer: last-mile delivery that a customer confirms from their own wallet, and international freight where trucks, drivers, goods and customs are verified end-to-end and payment releases on proof of delivery.",
      scenarios: [
        {
          title: "Last-mile: the customer confirms receipt",
          body: "A courier delivers a parcel; the customer taps their wallet to sign a 'delivery confirmed' event. Cryptographic proof of receipt — no 'it never arrived' disputes, no paper signature.",
        },
        {
          title: "International freight (TIR)",
          body: "A truck and its driver carry the company's verified authority and the cargo's bill-of-lading credential. At each customs post and port the driver's mandate and the goods' documents are verified in seconds instead of hours.",
        },
        {
          title: "Proof of delivery releases payment",
          body: "When the consignee confirms the goods arrived, the 'delivered' credential triggers an escrow release: the bank pays the seller automatically. The money stays on the bank rail; Tamga only authorizes and triggers.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "DELIVERY",
        badge: "CONFIRMED",
        title: "Shipment TR-5521",
        subtitle: "ABC Lojistik · X.509 (TR)",
        rows: [
          { k: "cargo", v: "bill of lading", tone: "disclosed" },
          { k: "driver", v: "authorized", tone: "disclosed" },
          { k: "consignee", v: "p:3d4…a71", tone: "accent" },
          { k: "escrow", v: "release", tone: "disclosed" },
        ],
        action: "Confirm receipt",
        status: "event anchored · escrow → release",
      },
      flow: [
        { icon: "building", label: "Shipper", sub: "Issuer (X.509)" },
        { icon: "truck", label: "Truck / Driver", sub: "Holder" },
        { icon: "delivered", label: "Consignee / Customs", sub: "Verifier" },
        { icon: "bank", label: "Bank", sub: "Escrow release" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Payments",
      name: "Payments",
      intro:
        "Tamga authorizes the payment — who, mandate, eligibility — while settlement stays on regulated bank / CBDC rails. Not a currency; an authorization layer.",
      scenarios: [
        {
          title: "Payment between verified parties",
          body: "The payer proves KYC and sanction-clearance with a credential-gated check, staying pseudonymous in everyday use. The transfer settles on the bank rail — Tamga proves the who and the mandate, not the money.",
        },
        {
          title: "Escrow trigger",
          body: "'Delivered credential → bank releases payment.' The obligation and its confirmation live on-chain; the funds never do. Minimal legal friction, maximal auditability.",
        },
        {
          title: "AI agent payments with a kill switch",
          body: "A company's AI agent pays customs and vendors within per-transaction caps, a merchant allowlist and an expiry — with liability on the state-verified principal and an instant, unconditional kill switch.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "PAYMENT",
        badge: "AUTHORIZED",
        title: "Authorize payment",
        subtitle: "to: ABC Lojistik · X.509",
        rows: [
          { k: "amount", v: "within cap", tone: "disclosed" },
          { k: "payer", v: "KYC · sanctions ✓", tone: "disclosed" },
          { k: "identity", v: "pseudonymous", tone: "hidden" },
          { k: "settlement", v: "bank rail", tone: "accent" },
        ],
        action: "Authorize",
        status: "Tamga authorizes · bank settles",
      },
      flow: [
        { icon: "wallet", label: "Payer", sub: "Holder" },
        { icon: "verifier", label: "Tamga", sub: "Authorize" },
        { icon: "bank", label: "Bank / CBDC", sub: "Settle" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Türkçe                                                                    */
/* -------------------------------------------------------------------------- */

const tr: ScenariosContent = {
  meta: {
    title: "Senaryolar ve kullanım alanları",
    description:
      "Tamga Network'ün eğitim, sağlık, lojistik ve ödeme alanlarındaki gerçek senaryoları — cüzdan mockup'ları ve güven-akışı şemalarıyla.",
  },
  eyebrow: "Kullanım alanları",
  title: "Senaryolar: tek güven katmanı, dört dünya",
  intro:
    "Eğitim, sağlık, lojistik ve ödeme; hepsi aynı ortak güven katmanı üzerinde çalışır — X.509 kurumlar, küresel tanımlayıcısı olmayan kişiler, cüzdanda taşınan belgeler. Eğitim (diploma, öğrenci belgesi, kampüs geçişi) ve etkinlik biletleri bugün uçtan uca çalışıyor; sağlık, lojistik ve ödeme aynı katmanın nereye uzandığını gösteriyor.",
  note: "Ekranlar Tamga Wallet uygulamasının temsilî mockup'larıdır; yalnızca örnek değerler.",
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Eğitim",
      name: "Eğitim",
      intro:
        "Diplomalar, transkriptler ve akademik unvanlar uluslararası doğrulanabilir credential'lara dönüşür — bir kez verilir, her yerde sunulur, kaynağa tek bir telefon bile gitmeden.",
      scenarios: [
        {
          title: "Bir kez verilen diploma, her yerde doğrulanır",
          body: "Bir üniversite (X.509 sertifikasıyla tanımlı) diplomayı imzalı bir SD-JWT olarak mezunun cüzdanına verir. İşveren, issuer'ı imzalı güven listesinde, iptal durumunu üniversitenin yayınladığı listede kontrol eder — saniyeler içinde, üniversiteye hiç ulaşmadan.",
        },
        {
          title: "Dereceyi göster, notları gizle",
          body: "İş başvurusunda mezun yalnızca dereceyi ve mezuniyet yılını açıklar; not ortalaması ve öğrenci numarası tuzlanmış özet olarak gizli kalır. Varsayılan veri minimizasyonu.",
        },
        {
          title: "Türk dünyasında tanınan diploma",
          body: "Bir devlet Türkiye'nin eğitim issuer'larını tanıdığı için (cross-recognition), bir Türk diploması yurt dışında yeni bir bürokrasi olmadan doğrulanır — sahte diplomalar ise basitçe doğrulanmaz.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CREDENTIAL",
        badge: "VERIFIED",
        title: "Üniversite Diploması",
        subtitle: "Örnek Üniversite · X.509 (TR)",
        rows: [
          { k: "degree", v: "Computer Eng.", tone: "disclosed" },
          { k: "graduation", v: "2026", tone: "disclosed" },
          { k: "gpa", v: "gizli", tone: "hidden" },
          { k: "holder", v: "p:8f2…c19", tone: "accent" },
        ],
        action: "İşverene sun",
        status: "SD-JWT · seçici ifşa",
      },
      flow: [
        { icon: "education", label: "Üniversite", sub: "Issuer (X.509)" },
        { icon: "wallet", label: "Mezun", sub: "Holder (Tamga Wallet)" },
        { icon: "verifier", label: "İşveren", sub: "Verifier" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Sağlık",
      name: "Sağlık",
      intro:
        "Hekim yetkisi, hasta onayı ve sağlık kayıtları — tüm tıbbi dosyayı açığa çıkarmadan doğrulanır.",
      scenarios: [
        {
          title: "Doğrulanmış hekim yetkisi",
          body: "Bir hekim, sağlık otoritesince (X.509) verilmiş bir lisans credential'ı taşır. Eczane, reçeteyi yazanın lisanslı ve o an yetkili bir hekim olduğunu ilaç vermeden önce doğrular — sahte reçete yok.",
        },
        {
          title: "Asgari ifşayla onay",
          body: "Hasta, 'uygun / 18 yaş üstü / çelişen alerji yok' bilgisini sıfır-bilgi veya seçici ispatla kanıtlar; tüm kaydını veya kimliğini vermeden.",
        },
        {
          title: "Sınır ötesi sağlık kayıtları",
          body: "Yurt dışına çıkan bir hasta, Tamga'nın tanıdığı herhangi bir sağlayıcının doğrulayabileceği bir aşı veya reçete credential'ı sunar — holder kontrolünde.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CONSENT",
        badge: "VERIFIED",
        title: "Reçete yetkilendirmesi",
        subtitle: "Sağlık Bakanlığı · X.509 (TR)",
        rows: [
          { k: "prescriber", v: "lisanslı", tone: "disclosed" },
          { k: "age_over_18", v: "true", tone: "disclosed" },
          { k: "diagnosis", v: "gizli", tone: "hidden" },
          { k: "full_name", v: "gizli", tone: "hidden" },
        ],
        action: "Eczaneyle paylaş",
        status: "ZK ispat · onay loglandı",
      },
      flow: [
        { icon: "health", label: "Sağlık otoritesi", sub: "Issuer (X.509)" },
        { icon: "doctor", label: "Hekim / Hasta", sub: "Holder" },
        { icon: "store", label: "Eczane", sub: "Verifier" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Lojistik",
      name: "Lojistik",
      intro:
        "İki dünya, tek güven katmanı: müşterinin kendi cüzdanıyla onayladığı son teslimat, ve TIR'ların, şoförlerin, malın ve gümrüğün uçtan uca doğrulandığı, ödemenin teslim kanıtıyla serbest kaldığı uluslararası taşımacılık.",
      scenarios: [
        {
          title: "Son teslimat: teslimatı müşteri onaylar",
          body: "Kurye kargoyu teslim eder; müşteri cüzdanına dokunarak 'teslim alındı' olayını imzalar. Kriptografik teslim kanıtı — 'hiç gelmedi' anlaşmazlığı yok, kağıt imza yok.",
        },
        {
          title: "Uluslararası taşımacılık (TIR)",
          body: "Bir TIR ve şoförü, şirketin doğrulanmış yetkisini ve malın konşimento credential'ını taşır. Her gümrük noktasında ve limanda şoförün yetkisi ve malın belgeleri saatler yerine saniyeler içinde doğrulanır.",
        },
        {
          title: "Teslim kanıtı ödemeyi serbest bırakır",
          body: "Alıcı malın ulaştığını onayladığında, 'teslim edildi' credential'ı bir escrow serbest bırakımını tetikler: banka, satıcıya otomatik öder. Para banka rayında kalır; Tamga yalnızca yetkilendirir ve tetikler.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "DELIVERY",
        badge: "CONFIRMED",
        title: "Sevkiyat TR-5521",
        subtitle: "ABC Lojistik · X.509 (TR)",
        rows: [
          { k: "cargo", v: "konşimento", tone: "disclosed" },
          { k: "driver", v: "yetkili", tone: "disclosed" },
          { k: "consignee", v: "p:3d4…a71", tone: "accent" },
          { k: "escrow", v: "serbest", tone: "disclosed" },
        ],
        action: "Teslim aldığımı onayla",
        status: "olay çıpalandı · escrow → serbest",
      },
      flow: [
        { icon: "building", label: "Gönderici", sub: "Issuer (X.509)" },
        { icon: "truck", label: "TIR / Şoför", sub: "Holder" },
        { icon: "delivered", label: "Alıcı / Gümrük", sub: "Verifier" },
        { icon: "bank", label: "Banka", sub: "Escrow serbest" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Ödeme",
      name: "Ödeme",
      intro:
        "Tamga ödemeyi yetkilendirir — kim, temsil yetkisi, uygunluk — mutabakat ise düzenlenmiş banka / CBDC raylarında kalır. Para birimi değil; bir yetkilendirme katmanı.",
      scenarios: [
        {
          title: "Kimliği doğrulanmış taraflar arası ödeme",
          body: "Ödeyen, KYC ve yaptırım-temizliğini credential-gated bir kontrolle kanıtlar; günlük kullanımda pseudonym kalır. Transferin kendisi banka rayında mutabakata varır — Tamga kimi ve yetkiyi kanıtlar, parayı değil.",
        },
        {
          title: "Escrow tetikleyici",
          body: "'Teslim edildi credential'ı → banka ödemeyi serbest bırakır.' Yükümlülük ve teyidi zincirde; para asla zincirde değil. Asgari hukuki sürtünme, azami denetlenebilirlik.",
        },
        {
          title: "Kill switch'li AI agent ödemeleri",
          body: "Bir şirketin AI ajanı, işlem başına tavan, satıcı beyaz listesi ve süre sınırı içinde gümrük ve tedarikçilere öder — sorumluluk devletçe doğrulanmış velide ve anında, koşulsuz bir kesme (kill switch) ile.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "PAYMENT",
        badge: "AUTHORIZED",
        title: "Ödemeyi yetkilendir",
        subtitle: "alıcı: ABC Lojistik · X.509",
        rows: [
          { k: "amount", v: "tavan içinde", tone: "disclosed" },
          { k: "payer", v: "KYC · yaptırım ✓", tone: "disclosed" },
          { k: "identity", v: "pseudonym", tone: "hidden" },
          { k: "settlement", v: "banka rayı", tone: "accent" },
        ],
        action: "Yetkilendir",
        status: "Tamga yetkilendirir · banka öder",
      },
      flow: [
        { icon: "wallet", label: "Ödeyen", sub: "Holder" },
        { icon: "verifier", label: "Tamga", sub: "Yetkilendir" },
        { icon: "bank", label: "Banka / CBDC", sub: "Mutabakat" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Türkmençe (özet — native review bekliyor)                                 */
/* -------------------------------------------------------------------------- */

const tk: ScenariosContent = {
  meta: {
    title: "Ssenariýalar we ulanyş ugurlary",
    description:
      "Tamga Network-yň bilim, saglyk, logistika we töleg ugurlaryndaky hakyky ssenariýalary — gapjyk mockup-lary we ynam-akym shemalary bilen.",
  },
  eyebrow: "Ulanyş ugurlary",
  title: "Ssenariýalar: bir ynam gatlagy, dört dünýä",
  intro:
    "Bilim, saglyk, logistika we töleg; hemmesi şol bir umumy ynam gatlagynda işleýär — X.509 guramalar, global belgisi bolmadyk adamlar, gapjykda göterilýän resminamalar. Bilim (diplom, talyp resminamasy, kampus geçişi) we çäre biletleri eýýäm başdan-aýak işleýär; saglyk, logistika we töleg şol bir gatlagyň nirä barýandygyny görkezýär.",
  note: "Ekranlar Tamga Wallet programmasynyň nusgalyk mockup-larydyr; diňe mysal bahalar.",
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Bilim",
      name: "Bilim",
      intro:
        "Diplomlar, transkriptler we akademiki dereželer halkara barlanyp bilinýän credential-lara öwrülýär — bir gezek berilýär, islendik ýerde hödürlenýär.",
      scenarios: [
        {
          title: "Bir gezek berlen diplom, islendik ýerde barlanýar",
          body: "Uniwersitet (X.509 bilen kesgitlenen) diplomy imzalanan SD-JWT hökmünde gapjyga berýär. Iş beriji issuer-i gol çekilen ynam sanawynda, ýatyrylyş ýagdaýyny uniwersitetiň çap eden sanawynda barlaýar — sekuntlarda, uniwersitete ýüz tutman.",
        },
        {
          title: "Dereýi görkez, bahalary gizle",
          body: "Iş üçin mezun diňe dereýi we gutaryş ýylyny açýar; bahalar we talyp belgisi gizlin galýar. Maglumat minimizasiýasy.",
        },
        {
          title: "Türki dünýäsinde ykrar edilýän diplom",
          body: "Bir döwlet Türkiýäniň bilim issuer-lerini ykrar edeni üçin, türk diplomy daşary ýurtda täze býurokratiýasyz barlanýar — galp diplomlar bolsa barlanmaýar.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CREDENTIAL",
        badge: "VERIFIED",
        title: "Uniwersitet diplomy",
        subtitle: "Mysal uniwersitet · X.509 (TR)",
        rows: [
          { k: "degree", v: "Computer Eng.", tone: "disclosed" },
          { k: "graduation", v: "2026", tone: "disclosed" },
          { k: "gpa", v: "gizlin", tone: "hidden" },
          { k: "holder", v: "p:8f2…c19", tone: "accent" },
        ],
        action: "Iş berijä hödürle",
        status: "SD-JWT · saýlama açyklama",
      },
      flow: [
        { icon: "education", label: "Uniwersitet", sub: "Issuer (X.509)" },
        { icon: "wallet", label: "Mezun", sub: "Holder" },
        { icon: "verifier", label: "Iş beriji", sub: "Verifier" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Saglyk",
      name: "Saglyk",
      intro:
        "Lukman ygtyýary, näsag razylygy we saglyk ýazgylary — tutuş lukmançylyk dosýasyny açman barlanýar.",
      scenarios: [
        {
          title: "Barlanan lukman ygtyýary",
          body: "Lukman saglyk edarasyndan (X.509) berlen ygtyýarnama credential-yny göterýär. Dermanhana receti ýazanyň ygtyýarly lukmandygyny barlaýar — galp recet ýok.",
        },
        {
          title: "Iň az açyklama bilen razylyk",
          body: "Näsag 'laýyk / 18 ýaşdan uly' maglumatyny syfyr-bilim ýa-da saýlama subutnama bilen tassyklaýar; tutuş ýazgysyny bermän.",
        },
        {
          title: "Serhetaşa saglyk ýazgylary",
          body: "Daşary ýurda giden näsag, Tamga ykrar eden islendik üpjünçiniň barlap biljek sanjym ýa-da recet credential-yny hödürleýär.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "CONSENT",
        badge: "VERIFIED",
        title: "Recet ygtyýarlandyrma",
        subtitle: "Saglyk ministrligi · X.509 (TR)",
        rows: [
          { k: "prescriber", v: "ygtyýarly", tone: "disclosed" },
          { k: "age_over_18", v: "true", tone: "disclosed" },
          { k: "diagnosis", v: "gizlin", tone: "hidden" },
          { k: "full_name", v: "gizlin", tone: "hidden" },
        ],
        action: "Dermanhana bilen paýlaş",
        status: "ZK subutnama · razylyk loglandy",
      },
      flow: [
        { icon: "health", label: "Saglyk edarasy", sub: "Issuer (X.509)" },
        { icon: "doctor", label: "Lukman / Näsag", sub: "Holder" },
        { icon: "store", label: "Dermanhana", sub: "Verifier" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Logistika",
      name: "Logistika",
      intro:
        "Iki dünýä, bir ynam gatlagy: müşderiniň öz gapjygy bilen tassyklaýan soňky eltip beriş, we TIR-laryň, sürüjileriň, harydyň we gümrügiň uçdan-uca barlanýan halkara daşamak.",
      scenarios: [
        {
          title: "Soňky eltip beriş: müşderi tassyklaýar",
          body: "Kurýer harydy eltýär; müşderi gapjygyna degip 'eltilip berildi' wakasyny imzalaýar. Kriptografik subutnama — 'gelmedi' dawasy ýok, kagyz gol ýok.",
        },
        {
          title: "Halkara daşamak (TIR)",
          body: "TIR we sürüjisi kompaniýanyň ygtyýaryny we harydyň konşimento credential-yny göterýär. Her gümrük nokadynda sürüjiniň ygtyýary we harydyň resminamalary sekuntlarda barlanýar.",
        },
        {
          title: "Eltip beriş subutnamasy tölegi açýar",
          body: "Alyjy harydyň gelendigini tassyklan badyna, 'eltilip berildi' credential-y escrow açylyşyny işe girizýär: bank satyja awtomatik töleýär. Pul bank relsinde galýar; Tamga diňe ygtyýarlandyrýar.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "DELIVERY",
        badge: "CONFIRMED",
        title: "Ýük TR-5521",
        subtitle: "ABC Lojistik · X.509 (TR)",
        rows: [
          { k: "cargo", v: "konşimento", tone: "disclosed" },
          { k: "driver", v: "ygtyýarly", tone: "disclosed" },
          { k: "consignee", v: "p:3d4…a71", tone: "accent" },
          { k: "escrow", v: "açyk", tone: "disclosed" },
        ],
        action: "Aldygymy tassykla",
        status: "waka çyzyklandy · escrow → açyk",
      },
      flow: [
        { icon: "building", label: "Iberiji", sub: "Issuer (X.509)" },
        { icon: "truck", label: "TIR / Sürüji", sub: "Holder" },
        { icon: "delivered", label: "Alyjy / Gümrük", sub: "Verifier" },
        { icon: "bank", label: "Bank", sub: "Escrow açyk" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Töleg",
      name: "Töleg",
      intro:
        "Tamga tölegi ygtyýarlandyrýar — kim, ygtyýar, laýyklyk — hasaplaşyk bolsa düzgünleşdirilen bank / CBDC relslerinde galýar. Pul birligi däl; ygtyýarlandyrma gatlagy.",
      scenarios: [
        {
          title: "Barlanan taraplaryň arasynda töleg",
          body: "Töleýji KYC we sanksiýa-arassalygyny credential-gated barlag bilen subut edýär; gündelik ulanyşda pseudonim galýar. Geçirim bank relsinde amala aşýar — Tamga kimi we ygtyýary subut edýär, puly däl.",
        },
        {
          title: "Escrow işe girizIji",
          body: "'Eltilip berildi credential-y → bank tölegi açýar.' Borç we tassyklama zynjyrda; pul asla zynjyrda däl.",
        },
        {
          title: "Kill switch bilen AI agent tölegleri",
          body: "Kompaniýanyň AI agenti çäkleriň, satyjy ak-sanawyň we möhletiň içinde töleýär — jogapkärçilik döwletçe barlanan eýede we dessine kesiji (kill switch) bilen.",
        },
      ],
      wallet: {
        app: "Tamga Wallet",
        cardLabel: "PAYMENT",
        badge: "AUTHORIZED",
        title: "Tölegi ygtyýarlandyr",
        subtitle: "alyjy: ABC Lojistik · X.509",
        rows: [
          { k: "amount", v: "çäk içinde", tone: "disclosed" },
          { k: "payer", v: "KYC · sanksiýa ✓", tone: "disclosed" },
          { k: "identity", v: "pseudonim", tone: "hidden" },
          { k: "settlement", v: "bank relsi", tone: "accent" },
        ],
        action: "Ygtyýarlandyr",
        status: "Tamga ygtyýarlandyrýar · bank töleýär",
      },
      flow: [
        { icon: "wallet", label: "Töleýji", sub: "Holder" },
        { icon: "verifier", label: "Tamga", sub: "Ygtyýarlandyr" },
        { icon: "bank", label: "Bank / CBDC", sub: "Hasaplaşyk" },
      ],
    },
  ],
};

const content: Record<Locale, ScenariosContent> = { en, tr, tk };

export function getScenariosContent(locale: string): ScenariosContent {
  return content[locale as Locale] ?? en;
}

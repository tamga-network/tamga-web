import type { Locale } from "@/i18n/routing";
import type { WalletMockData, FlowNode } from "@/components/scenario-visuals";

/* Senaryolar (2026-10-06 yeniden yazım, proje yönetimi onayı): eğitim ana senaryo (öğrenci yolculuğu, adım adım durum);
   bugün çalışanlar ARF 1.0 §2.8 "Yayında" listesinden (bilet + tek kullanımlık kapı, siteye giriş + takma ad, yaş kontrolü,
   Tamga Verify); sağlık ADR-0028 (Proposed) → "karar aşamasında"; iş ve kamu → vizyon; lojistik ve ödeme → araştırma
   (whitepaper §13 değer katmanı). Eğitim kaynakları: Education Rulebook, WP §8 (veriliş tarihi kuralı), §9 (iptal ≤ ~90 dk),
   §11 (60 sn geçiş), ADR-0023, partners.ts (pilot ortak). Bugün "çalışıyor" = ağda ve sandbox'ta uçtan uca; gerçek ağda ilk
   kurum pilotla. */

export type StepStatus = "today" | "pilot" | "later";
export type Scenario = { title: string; body: string; status?: StepStatus };
export type VerticalTone = "main" | "today" | "proposed" | "vision" | "research";
export type Vertical = {
  id: string;
  icon: string;
  eyebrow: string;
  name: string;
  intro: string;
  scenarios: Scenario[];
  wallet: WalletMockData;
  flow: FlowNode[];
  /** Başlığın yanındaki durum etiketi (sayfaya çapayla gelen de görsün). */
  badge: string;
  tone: VerticalTone;
  /** İsteğe bağlı bilgi kutusu (ör. pilot ortak). */
  callout?: { title: string; body: string };
};
export type ScenariosContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  note: string;
  statusLabels: Record<StepStatus, string>;
  verticals: Vertical[];
};

/* -------------------------------------------------------------------------- */
/*  English                                                                   */
/* -------------------------------------------------------------------------- */

const en: ScenariosContent = {
  meta: {
    title: "Scenarios & use cases",
    description:
      "How Tamga Network works in practice: education first, from enrolment to the first job; tickets, website sign-in and age checks today; and where the same trust layer can go next.",
  },
  eyebrow: "Use cases",
  title: "Scenarios: education first, one trust layer",
  intro:
    "Education is the network's first and main scenario: a student's documents from enrolment to the first job application. Tickets, website sign-in and age checks run on the same layer today. Health is at the decision stage; work, public services, logistics and payments show where the layer can go. Every scenario carries its status.",
  note: "Screens are illustrative mockups of a wallet on the network; example values only. “Works today” means it runs end to end on the network and in the sandbox; the first real institution joins with the pilot.",
  statusLabels: { today: "Works today", pilot: "With the pilot", later: "Later" },
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Education",
      name: "Education",
      badge: "Main scenario",
      tone: "main",
      intro:
        "A student's documents follow them from the first day to the first job: issued by the university, kept in the student's own wallet and checked by anyone in seconds, without a phone call to the registrar.",
      scenarios: [
        {
          status: "today",
          title: "Enrolment: a student credential in the wallet",
          body: "After registration the university issues a student credential into the student's wallet. It is short-lived (up to 90 days) and renewed while the student stays enrolled. The university's key is in the signed Türkiye trust list, so anyone can check where the credential came from.",
        },
        {
          status: "today",
          title: "The campus gate in a second",
          body: "At the turnstile the student shows a 60-second signed QR pass. The pass carries no personal data, and a copied or replayed code is rejected.",
        },
        {
          status: "today",
          title: "Discounts and the library: only “I'm a student here”",
          body: "A museum, a transport operator or the library asks one question: is this person a student here? The wallet answers it; name, student number and date of birth stay hidden.",
        },
        {
          status: "today",
          title: "Graduation: a diploma that cannot be faked",
          body: "At graduation the university issues the diploma as a signed credential. Change one letter and the signature breaks; a diploma from an institution that is not on the trust list does not verify.",
        },
        {
          status: "today",
          title: "The job application: show the degree, hide the grades",
          body: "The graduate shares only the degree and the graduation year; the grade average stays hidden. The employer verifies in seconds, on its own server or through Tamga Verify, without contacting the university.",
        },
        {
          status: "today",
          title: "When a diploma is withdrawn, and when a university closes",
          body: "If the university revokes a diploma, every verifier learns it within about 90 minutes from the published status list, and the university never learns who checked. If a university is later suspended, diplomas it issued before that date stay valid: authority is judged on the issue date.",
        },
        {
          status: "later",
          title: "A master's degree abroad",
          body: "The diploma follows the EU's learning standards (ELM). Europass alignment and recognition through other Turkic states' own lists are planned steps after the pilot.",
        },
      ],
      callout: {
        title: "Pilot partner: İstanbul Bilgi Üniversitesi",
        body: "We will pilot education with İstanbul Bilgi Üniversitesi. Until the pilot starts, every step above can be tried in the sandbox, where the university appears as a test institution.",
      },
      wallet: {
        app: "Wallet",
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
        { icon: "wallet", label: "Student / graduate", sub: "Holder (their wallet)" },
        { icon: "verifier", label: "Employer, gate, library", sub: "Verifier" },
      ],
    },
    {
      id: "events",
      icon: "ticket",
      eyebrow: "Events",
      name: "Tickets and events",
      badge: "Works today",
      tone: "today",
      intro:
        "A ticket should prove one thing, that it is valid for this event, and nothing about the person holding it.",
      scenarios: [
        {
          title: "A ticket with no personal data",
          body: "The seller issues the ticket into the wallet with the event, the seat and the validity. No name, no ID number.",
        },
        {
          title: "Single use at the gate",
          body: "At the gate the ticket is checked and marked as used. A screenshot or a second copy of the same ticket is rejected.",
        },
        {
          title: "Concerts, cinemas, conferences",
          body: "One ticket type covers them all: the event and the venue are fields, not new formats, so a new organiser joins without new software.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "TICKET",
        badge: "VALID",
        title: "Concert ticket",
        subtitle: "Example ticket seller · X.509 (TR)",
        rows: [
          { k: "event", v: "Example Concert", tone: "disclosed" },
          { k: "seat", v: "B-14", tone: "disclosed" },
          { k: "name", v: "not on the ticket", tone: "hidden" },
          { k: "use", v: "single", tone: "accent" },
        ],
        action: "Show at the gate",
        status: "single use · no personal data",
      },
      flow: [
        { icon: "building", label: "Ticket seller", sub: "Issuer (X.509)" },
        { icon: "wallet", label: "Visitor", sub: "Holder" },
        { icon: "verifier", label: "Gate", sub: "Verifier" },
      ],
    },
    {
      id: "online",
      icon: "online",
      eyebrow: "Online",
      name: "Websites: sign-in and age checks",
      badge: "Works today",
      tone: "today",
      intro:
        "A website can sign people up, let them back in and check their age without collecting more than it needs.",
      scenarios: [
        {
          title: "Sign up with Tamga",
          body: "The site asks only for the fields it registered for. On the consent screen the person sees who is asking, for what and why, and approves field by field.",
        },
        {
          title: "A different pseudonym on every site",
          body: "Each site sees its own pseudonym for the person, so two sites cannot match their users. After a phone change the same pseudonyms come back.",
        },
        {
          title: "Back in with a passkey",
          body: "Later visits use a passkey on the phone. There is no password to forget or to leak.",
        },
        {
          title: "Over 18? Only “yes”",
          body: "An age check asks a single question and the birth date is not shared. A zero-knowledge version of the same proof is ready on the verifier side and comes to the phone with the store release.",
        },
        {
          title: "Verify without your own server code",
          body: "With Tamga Verify a site checks a credential without running verification code itself; the values go only to the site, once, within five minutes.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "REQUEST",
        badge: "CONSENT",
        title: "Sign up · Example Shop",
        subtitle: "Registered verifier · X.509 (TR)",
        rows: [
          { k: "pseudonym", v: "p:3a9…e41", tone: "accent" },
          { k: "age_over_18", v: "true", tone: "disclosed" },
          { k: "birth date", v: "not shared", tone: "hidden" },
          { k: "full identity", v: "not asked", tone: "hidden" },
        ],
        action: "Approve",
        status: "per-site pseudonym · passkey",
      },
      flow: [
        { icon: "building", label: "Identity issuer", sub: "Issuer" },
        { icon: "wallet", label: "Person", sub: "Holder (their wallet)" },
        { icon: "verifier", label: "Website", sub: "Verifier" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Health",
      name: "Health",
      badge: "At the decision stage",
      tone: "proposed",
      intro:
        "Health starts with the people who provide care: the right to practise, chamber membership and a role at a hospital, as three credentials that complement each other. The design is written; the decision and the issuers are still open.",
      scenarios: [
        {
          title: "A doctor's right to practise",
          body: "The authority that licenses health professionals issues a practice credential. A pharmacy or another hospital checks it in seconds instead of making a call.",
        },
        {
          title: "Chamber membership",
          body: "The medical chamber issues a membership credential that shows only what the profession needs to show.",
        },
        {
          title: "A role at a hospital",
          body: "A hospital issues its own staff a role credential with unit, title and start date; access to its systems can rely on it.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "CREDENTIAL",
        badge: "EXAMPLE",
        title: "Right to practise",
        subtitle: "Example health authority · X.509 (TR)",
        rows: [
          { k: "profession", v: "Physician", tone: "disclosed" },
          { k: "specialty", v: "Cardiology", tone: "disclosed" },
          { k: "licence no.", v: "hidden", tone: "hidden" },
          { k: "holder", v: "p:5c1…09b", tone: "accent" },
        ],
        action: "Show at the pharmacy",
        status: "decision stage · example",
      },
      flow: [
        { icon: "building", label: "Health authority", sub: "Issuer" },
        { icon: "wallet", label: "Doctor", sub: "Holder" },
        { icon: "verifier", label: "Pharmacy / hospital", sub: "Verifier" },
      ],
    },
    {
      id: "work",
      icon: "work",
      eyebrow: "Work",
      name: "Work and professions",
      badge: "Vision — not built yet",
      tone: "vision",
      intro:
        "Hiring and professional life repeat the same checks again and again. The same credentials can end that.",
      scenarios: [
        {
          title: "A CV that checks itself",
          body: "A candidate applies with a diploma and other credentials; the employer verifies every line in seconds instead of collecting copies.",
        },
        {
          title: "Chambers and professional associations",
          body: "A chamber or association issues membership credentials, so a client can see that a professional is a member in good standing.",
        },
        {
          title: "Proof of employment without paperwork",
          body: "An employer issues a “currently employed” credential that a bank or a landlord can check, showing only what is asked.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "CREDENTIAL",
        badge: "EXAMPLE",
        title: "Chamber membership",
        subtitle: "Example chamber · X.509 (TR)",
        rows: [
          { k: "member", v: "yes", tone: "disclosed" },
          { k: "standing", v: "active", tone: "disclosed" },
          { k: "registry no.", v: "hidden", tone: "hidden" },
          { k: "holder", v: "p:a07…4d2", tone: "accent" },
        ],
        action: "Present to client",
        status: "vision · example",
      },
      flow: [
        { icon: "building", label: "Chamber / employer", sub: "Issuer" },
        { icon: "wallet", label: "Professional", sub: "Holder" },
        { icon: "verifier", label: "Client / bank", sub: "Verifier" },
      ],
    },
    {
      id: "public",
      icon: "public",
      eyebrow: "Public",
      name: "Public services and travel",
      badge: "Vision — not built yet",
      tone: "vision",
      intro:
        "Public services and travel are where people show documents most often, and where the least should be shared.",
      scenarios: [
        {
          title: "Hotel check-in with only what is required",
          body: "A hotel receives the fields it must record, and nothing more, straight from the wallet instead of photocopying an ID.",
        },
        {
          title: "Municipal and resident services",
          body: "A municipality checks that a person is eligible for a service without asking for a stack of documents.",
        },
        {
          title: "Recognised across the Turkic world",
          body: "When other states run their own lists in the network, a credential issued in Türkiye can be checked in Baku or Almaty with no new bureaucracy, and the other way round.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "REQUEST",
        badge: "CONSENT",
        title: "Check-in · Example Hotel",
        subtitle: "Registered verifier · X.509",
        rows: [
          { k: "name", v: "shared", tone: "disclosed" },
          { k: "document", v: "valid", tone: "disclosed" },
          { k: "other fields", v: "not asked", tone: "hidden" },
          { k: "copy kept", v: "none", tone: "accent" },
        ],
        action: "Approve",
        status: "vision · example",
      },
      flow: [
        { icon: "building", label: "Public authority", sub: "Issuer" },
        { icon: "wallet", label: "Resident / traveller", sub: "Holder" },
        { icon: "verifier", label: "Hotel / municipality", sub: "Verifier" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Logistics",
      name: "Logistics",
      badge: "Research — not built yet",
      tone: "research",
      intro:
        "Deliveries and freight depend on who may carry what and on proof that it arrived. Credentials can carry both; this is a research direction, not part of the network today.",
      scenarios: [
        {
          title: "Last mile: the customer confirms receipt",
          body: "The customer confirms a delivery from their own wallet: a signed proof of receipt instead of a signature on a screen.",
        },
        {
          title: "International freight (TIR)",
          body: "A driver carries the company's mandate and the cargo documents as credentials; at each customs post they are checked in seconds instead of hours.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "DELIVERY",
        badge: "EXAMPLE",
        title: "Shipment 5521",
        subtitle: "Example Logistics · X.509 (TR)",
        rows: [
          { k: "cargo", v: "documents", tone: "disclosed" },
          { k: "driver", v: "authorised", tone: "disclosed" },
          { k: "consignee", v: "p:3d4…a71", tone: "accent" },
        ],
        action: "Confirm receipt",
        status: "research · example",
      },
      flow: [
        { icon: "building", label: "Carrier", sub: "Issuer (X.509)" },
        { icon: "truck", label: "Driver", sub: "Holder" },
        { icon: "delivered", label: "Consignee / customs", sub: "Verifier" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Payments",
      name: "Payments",
      badge: "Research — not built yet",
      tone: "research",
      intro:
        "Tamga would prove who may pay and under what mandate; the money itself stays on regulated bank rails. A research direction, not a currency and not part of the network today.",
      scenarios: [
        {
          title: "Payment between verified parties",
          body: "The payer proves the checks a bank needs with a credential while staying pseudonymous in everyday use; the transfer settles at the bank.",
        },
        {
          title: "AI agents with limits and a kill switch",
          body: "A company's software agent pays within per-payment caps, an approved merchant list and an expiry date, with the responsible person known and an instant way to stop it.",
        },
      ],
      wallet: {
        app: "Wallet",
        cardLabel: "PAYMENT",
        badge: "EXAMPLE",
        title: "Authorise payment",
        subtitle: "to: Example Logistics · X.509",
        rows: [
          { k: "amount", v: "within cap", tone: "disclosed" },
          { k: "payer checks", v: "passed", tone: "disclosed" },
          { k: "identity", v: "pseudonymous", tone: "hidden" },
          { k: "settlement", v: "at the bank", tone: "accent" },
        ],
        action: "Authorise",
        status: "research · example",
      },
      flow: [
        { icon: "wallet", label: "Payer", sub: "Holder" },
        { icon: "verifier", label: "Tamga", sub: "Proves the mandate" },
        { icon: "bank", label: "Bank", sub: "Settles" },
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
      "Tamga Network pratikte nasıl çalışır: önce eğitim, kayıttan ilk işe; bugün bilet, sitelere giriş ve yaş kontrolü; aynı güven katmanının sonra nereye uzanabileceği.",
  },
  eyebrow: "Kullanım alanları",
  title: "Senaryolar: önce eğitim, tek güven katmanı",
  intro:
    "Ağın ilk ve ana senaryosu eğitim: bir öğrencinin belgeleri, kayıttan ilk iş başvurusuna kadar. Bilet, sitelere giriş ve yaş kontrolü bugün aynı katman üzerinde çalışıyor. Sağlık karar aşamasında; iş, kamu hizmetleri, lojistik ve ödeme katmanın nereye uzanabileceğini gösteriyor. Her senaryonun yanında durumu yazıyor.",
  note: "Ekranlar ağdaki bir cüzdanın temsilî tasarımlarıdır; değerler örnektir. “Bugün çalışıyor”, ağda ve sandbox'ta uçtan uca çalıştığı anlamına gelir; gerçek ağdaki ilk kurum pilotla katılır.",
  statusLabels: { today: "Bugün çalışıyor", pilot: "Pilotla", later: "Sonra" },
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Eğitim",
      name: "Eğitim",
      badge: "Ana senaryo",
      tone: "main",
      intro:
        "Öğrencinin belgeleri ilk günden ilk işe kadar onunla gider: üniversite verir, öğrencinin kendi cüzdanında durur, herkes saniyeler içinde doğrular; öğrenci işlerine telefon açmaya gerek kalmaz.",
      scenarios: [
        {
          status: "today",
          title: "Kayıt: cüzdanda öğrenci belgesi",
          body: "Kayıttan sonra üniversite öğrencinin cüzdanına bir öğrenci belgesi verir. Belge kısa ömürlüdür (en çok 90 gün) ve öğrencilik sürdükçe yenilenir. Üniversitenin anahtarı imzalı Türkiye güven listesindedir; belgenin nereden geldiğini herkes denetleyebilir.",
        },
        {
          status: "today",
          title: "Kampüs girişi bir saniyede",
          body: "Turnikede öğrenci 60 saniyelik imzalı bir QR geçişi gösterir. Geçişte kişisel veri yoktur; kopyalanan ya da yeniden kullanılan kod reddedilir.",
        },
        {
          status: "today",
          title: "İndirim ve kütüphane: yalnız “burada öğrenciyim”",
          body: "Müze, ulaşım işletmesi ya da kütüphane tek bir şey sorar: bu kişi burada öğrenci mi? Cüzdan yalnız bunu cevaplar; ad, öğrenci numarası ve doğum tarihi gizli kalır.",
        },
        {
          status: "today",
          title: "Mezuniyet: sahtesi yapılamayan diploma",
          body: "Mezuniyette üniversite diplomayı imzalı bir belge olarak verir. Tek harf değişirse imza bozulur; güven listesinde olmayan bir kurumun diploması doğrulanmaz.",
        },
        {
          status: "today",
          title: "İş başvurusu: dereceyi göster, notları gizle",
          body: "Mezun yalnız bölümünü ve mezuniyet yılını paylaşır; not ortalaması gizli kalır. İşveren saniyeler içinde, kendi sunucusunda ya da Tamga Verify ile doğrular; üniversiteye ulaşmaz.",
        },
        {
          status: "today",
          title: "Diploma geri alınırsa, üniversite kapanırsa",
          body: "Üniversite bir diplomayı iptal ederse her doğrulayıcı bunu yayımlanan durum listesinden en geç yaklaşık 90 dakikada öğrenir; üniversite kimin kontrol ettiğini hiç öğrenmez. Bir üniversitenin yetkisi sonradan askıya alınırsa, o tarihten önce verdiği diplomalar geçerli kalır: yetki, veriliş tarihine göre değerlendirilir.",
        },
        {
          status: "later",
          title: "Yurt dışında yüksek lisans",
          body: "Diploma AB'nin öğrenme standartlarına (ELM) uygundur. Europass uyumu ve diğer Türk devletlerinin kendi listeleriyle tanınma, pilottan sonraki planlı adımlardır.",
        },
      ],
      callout: {
        title: "Pilot ortağımız: İstanbul Bilgi Üniversitesi",
        body: "Eğitim pilotunu İstanbul Bilgi Üniversitesi ile yapacağız. Pilot başlayana kadar yukarıdaki her adım, üniversitenin test kurumu olarak yer aldığı sandbox'ta denenebilir.",
      },
      wallet: {
        app: "Cüzdan",
        cardLabel: "BELGE",
        badge: "DOĞRULANDI",
        title: "Üniversite Diploması",
        subtitle: "Örnek Üniversite · X.509 (TR)",
        rows: [
          { k: "bölüm", v: "Bilgisayar Müh.", tone: "disclosed" },
          { k: "mezuniyet", v: "2026", tone: "disclosed" },
          { k: "not ort.", v: "gizli", tone: "hidden" },
          { k: "sahip", v: "p:8f2…c19", tone: "accent" },
        ],
        action: "İşverene göster",
        status: "SD-JWT · seçici paylaşım",
      },
      flow: [
        { icon: "education", label: "Üniversite", sub: "Belge veren (X.509)" },
        { icon: "wallet", label: "Öğrenci / mezun", sub: "Belge sahibi (kendi cüzdanı)" },
        { icon: "verifier", label: "İşveren, turnike, kütüphane", sub: "Doğrulayan" },
      ],
    },
    {
      id: "events",
      icon: "ticket",
      eyebrow: "Etkinlik",
      name: "Bilet ve etkinlikler",
      badge: "Bugün çalışıyor",
      tone: "today",
      intro:
        "Bir bilet tek bir şeyi kanıtlamalı: bu etkinlik için geçerli olduğunu. Taşıyan kişi hakkında hiçbir şeyi değil.",
      scenarios: [
        {
          title: "Kişisel veri taşımayan bilet",
          body: "Satıcı bileti etkinlik, koltuk ve geçerlilik bilgisiyle cüzdana verir. Ad yok, kimlik numarası yok.",
        },
        {
          title: "Kapıda tek kullanım",
          body: "Kapıda bilet denetlenir ve kullanıldı olarak işaretlenir. Ekran görüntüsü ya da aynı biletin ikinci kopyası reddedilir.",
        },
        {
          title: "Konser, sinema, konferans",
          body: "Hepsi tek bilet türüyle: etkinlik ve mekân birer alandır, yeni biçim değil; yeni bir organizatör yeni yazılım gerekmeden katılır.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "BİLET",
        badge: "GEÇERLİ",
        title: "Konser bileti",
        subtitle: "Örnek bilet satıcısı · X.509 (TR)",
        rows: [
          { k: "etkinlik", v: "Örnek Konser", tone: "disclosed" },
          { k: "koltuk", v: "B-14", tone: "disclosed" },
          { k: "ad", v: "bilette yok", tone: "hidden" },
          { k: "kullanım", v: "tek", tone: "accent" },
        ],
        action: "Kapıda göster",
        status: "tek kullanım · kişisel veri yok",
      },
      flow: [
        { icon: "building", label: "Bilet satıcısı", sub: "Belge veren (X.509)" },
        { icon: "wallet", label: "Ziyaretçi", sub: "Belge sahibi" },
        { icon: "verifier", label: "Kapı", sub: "Doğrulayan" },
      ],
    },
    {
      id: "online",
      icon: "online",
      eyebrow: "Çevrimiçi",
      name: "Web siteleri: giriş ve yaş kontrolü",
      badge: "Bugün çalışıyor",
      tone: "today",
      intro:
        "Bir web sitesi, ihtiyacından fazlasını toplamadan kişiyi kaydedebilir, tekrar içeri alabilir ve yaşını kontrol edebilir.",
      scenarios: [
        {
          title: "Tamga ile kayıt ol",
          body: "Site yalnız kaydında yazan alanları ister. Onay ekranında kişi kimin, neyi, neden istediğini görür ve alan alan onaylar.",
        },
        {
          title: "Her sitede farklı bir takma ad",
          body: "Her site kişiyi kendine özel bir takma adla görür; iki site kullanıcılarını eşleştiremez. Telefon değişince aynı takma adlar geri gelir.",
        },
        {
          title: "Geçiş anahtarıyla tekrar giriş",
          body: "Sonraki girişlerde telefondaki geçiş anahtarı (passkey) kullanılır. Unutulacak ya da sızacak parola yoktur.",
        },
        {
          title: "18 yaşından büyük mü? Yalnız “evet”",
          body: "Yaş kontrolü tek bir soru sorar; doğum tarihi paylaşılmaz. Aynı kanıtın sıfır bilgi ispatıyla yapılan sürümü doğrulayıcı tarafında hazır, telefona mağaza sürümüyle gelir.",
        },
        {
          title: "Kendi sunucu kodun olmadan doğrula",
          body: "Tamga Verify ile bir site, doğrulama kodu çalıştırmadan belge denetler; değerler yalnız siteye, bir kez ve beş dakika içinde gider.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "İSTEK",
        badge: "ONAY",
        title: "Kayıt · Örnek Mağaza",
        subtitle: "Kayıtlı doğrulayıcı · X.509 (TR)",
        rows: [
          { k: "takma ad", v: "p:3a9…e41", tone: "accent" },
          { k: "18+", v: "evet", tone: "disclosed" },
          { k: "doğum tarihi", v: "paylaşılmaz", tone: "hidden" },
          { k: "tam kimlik", v: "istenmedi", tone: "hidden" },
        ],
        action: "Onayla",
        status: "site başına takma ad · geçiş anahtarı",
      },
      flow: [
        { icon: "building", label: "Kimlik belgesini veren", sub: "Belge veren" },
        { icon: "wallet", label: "Kişi", sub: "Belge sahibi (kendi cüzdanı)" },
        { icon: "verifier", label: "Web sitesi", sub: "Doğrulayan" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Sağlık",
      name: "Sağlık",
      badge: "Karar aşamasında",
      tone: "proposed",
      intro:
        "Sağlık, hizmeti verenlerle başlar: meslek icra yetkisi, oda üyeliği ve hastanedeki görev, birbirini tamamlayan üç belge olarak. Tasarım yazıldı; karar ve belgeyi verecek kurumlar henüz açık.",
      scenarios: [
        {
          title: "Hekimin meslek icra yetkisi",
          body: "Sağlık meslek mensuplarına yetki veren makam bir meslek icra belgesi verir. Eczane ya da başka bir hastane, telefon açmak yerine saniyeler içinde denetler.",
        },
        {
          title: "Oda üyeliği",
          body: "Tabip odası, mesleğin göstermesi gerekenden fazlasını içermeyen bir üyelik belgesi verir.",
        },
        {
          title: "Hastanedeki görev",
          body: "Hastane kendi personeline birim, unvan ve başlama tarihini içeren bir görev belgesi verir; sistemlerine erişim buna dayanabilir.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "BELGE",
        badge: "ÖRNEK",
        title: "Meslek icra belgesi",
        subtitle: "Örnek sağlık makamı · X.509 (TR)",
        rows: [
          { k: "meslek", v: "Hekim", tone: "disclosed" },
          { k: "uzmanlık", v: "Kardiyoloji", tone: "disclosed" },
          { k: "belge no", v: "gizli", tone: "hidden" },
          { k: "sahip", v: "p:5c1…09b", tone: "accent" },
        ],
        action: "Eczanede göster",
        status: "karar aşamasında · örnek",
      },
      flow: [
        { icon: "building", label: "Sağlık makamı", sub: "Belge veren" },
        { icon: "wallet", label: "Hekim", sub: "Belge sahibi" },
        { icon: "verifier", label: "Eczane / hastane", sub: "Doğrulayan" },
      ],
    },
    {
      id: "work",
      icon: "work",
      eyebrow: "İş",
      name: "İş ve meslekler",
      badge: "Vizyon — henüz kurulmadı",
      tone: "vision",
      intro:
        "İşe alım ve meslek hayatı aynı kontrolleri tekrar tekrar yapar. Aynı belgeler buna son verebilir.",
      scenarios: [
        {
          title: "Kendini doğrulayan özgeçmiş",
          body: "Aday diploması ve diğer belgeleriyle başvurur; işveren kopya toplamak yerine her satırı saniyeler içinde doğrular.",
        },
        {
          title: "Meslek odaları ve dernekler",
          body: "Oda ya da dernek üyelik belgesi verir; müşteri, bir meslek mensubunun üyeliğinin geçerli olduğunu görür.",
        },
        {
          title: "Kâğıtsız çalışma belgesi",
          body: "İşveren, bankanın ya da ev sahibinin denetleyebileceği bir “çalışıyor” belgesi verir; yalnız sorulan gösterilir.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "BELGE",
        badge: "ÖRNEK",
        title: "Oda üyeliği",
        subtitle: "Örnek meslek odası · X.509 (TR)",
        rows: [
          { k: "üye", v: "evet", tone: "disclosed" },
          { k: "durum", v: "etkin", tone: "disclosed" },
          { k: "sicil no", v: "gizli", tone: "hidden" },
          { k: "sahip", v: "p:a07…4d2", tone: "accent" },
        ],
        action: "Müşteriye göster",
        status: "vizyon · örnek",
      },
      flow: [
        { icon: "building", label: "Oda / işveren", sub: "Belge veren" },
        { icon: "wallet", label: "Meslek mensubu", sub: "Belge sahibi" },
        { icon: "verifier", label: "Müşteri / banka", sub: "Doğrulayan" },
      ],
    },
    {
      id: "public",
      icon: "public",
      eyebrow: "Kamu",
      name: "Kamu hizmetleri ve seyahat",
      badge: "Vizyon — henüz kurulmadı",
      tone: "vision",
      intro:
        "Kamu hizmetleri ve seyahat, insanların en sık belge gösterdiği ve en az paylaşılması gereken yerlerdir.",
      scenarios: [
        {
          title: "Otelde yalnız gerekeni paylaşarak giriş",
          body: "Otel, kaydetmek zorunda olduğu alanları ve fazlasını değil, kimliğin fotokopisi yerine doğrudan cüzdandan alır.",
        },
        {
          title: "Belediye ve yerel hizmetler",
          body: "Belediye, kişinin bir hizmete uygun olduğunu bir dosya dolusu belge istemeden denetler.",
        },
        {
          title: "Türk dünyasında tanınma",
          body: "Diğer devletler ağda kendi listelerini işlettiğinde, Türkiye'de verilen bir belge Bakü'de ya da Almatı'da yeni bir bürokrasi olmadan doğrulanabilir; tersi de.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "İSTEK",
        badge: "ONAY",
        title: "Giriş · Örnek Otel",
        subtitle: "Kayıtlı doğrulayıcı · X.509",
        rows: [
          { k: "ad", v: "paylaşılır", tone: "disclosed" },
          { k: "belge", v: "geçerli", tone: "disclosed" },
          { k: "diğer alanlar", v: "istenmedi", tone: "hidden" },
          { k: "fotokopi", v: "yok", tone: "accent" },
        ],
        action: "Onayla",
        status: "vizyon · örnek",
      },
      flow: [
        { icon: "building", label: "Kamu kurumu", sub: "Belge veren" },
        { icon: "wallet", label: "Vatandaş / yolcu", sub: "Belge sahibi" },
        { icon: "verifier", label: "Otel / belediye", sub: "Doğrulayan" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Lojistik",
      name: "Lojistik",
      badge: "Araştırma — henüz kurulmadı",
      tone: "research",
      intro:
        "Teslimat ve taşımacılık, kimin neyi taşıyabileceğine ve malın ulaştığının kanıtına dayanır. Belgeler ikisini de taşıyabilir; bu bir araştırma yönüdür, bugün ağın parçası değildir.",
      scenarios: [
        {
          title: "Son teslimat: teslimatı müşteri onaylar",
          body: "Müşteri teslimatı kendi cüzdanından onaylar: ekrana atılan imza yerine imzalı bir teslim kanıtı.",
        },
        {
          title: "Uluslararası taşımacılık (TIR)",
          body: "Şoför, şirketin yetkisini ve yükün belgelerini belge olarak taşır; her gümrük noktasında saatler yerine saniyeler içinde denetlenir.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "TESLİMAT",
        badge: "ÖRNEK",
        title: "Sevkiyat 5521",
        subtitle: "Örnek Lojistik · X.509 (TR)",
        rows: [
          { k: "yük", v: "belgeler", tone: "disclosed" },
          { k: "şoför", v: "yetkili", tone: "disclosed" },
          { k: "alıcı", v: "p:3d4…a71", tone: "accent" },
        ],
        action: "Teslimatı onayla",
        status: "araştırma · örnek",
      },
      flow: [
        { icon: "building", label: "Taşıyıcı", sub: "Belge veren (X.509)" },
        { icon: "truck", label: "Şoför", sub: "Belge sahibi" },
        { icon: "delivered", label: "Alıcı / gümrük", sub: "Doğrulayan" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Ödeme",
      name: "Ödeme",
      badge: "Araştırma — henüz kurulmadı",
      tone: "research",
      intro:
        "Tamga, kimin hangi yetkiyle ödeme yapabileceğini kanıtlardı; paranın kendisi düzenlenmiş banka raylarında kalır. Bir araştırma yönüdür: para birimi değildir ve bugün ağın parçası değildir.",
      scenarios: [
        {
          title: "Doğrulanmış taraflar arasında ödeme",
          body: "Ödeyen, bankanın istediği kontrolleri bir belgeyle kanıtlar, günlük kullanımda takma adla kalır; aktarım bankada gerçekleşir.",
        },
        {
          title: "Sınırlı ve durdurulabilir yapay zekâ ajanları",
          body: "Bir şirketin yazılım ajanı ödeme başına tavan, onaylı satıcı listesi ve son kullanma tarihiyle öder; sorumlu kişi bellidir ve ajan anında durdurulabilir.",
        },
      ],
      wallet: {
        app: "Cüzdan",
        cardLabel: "ÖDEME",
        badge: "ÖRNEK",
        title: "Ödemeyi yetkilendir",
        subtitle: "alıcı: Örnek Lojistik · X.509",
        rows: [
          { k: "tutar", v: "tavan içinde", tone: "disclosed" },
          { k: "ödeyen kontrolleri", v: "geçti", tone: "disclosed" },
          { k: "kimlik", v: "takma ad", tone: "hidden" },
          { k: "aktarım", v: "bankada", tone: "accent" },
        ],
        action: "Yetkilendir",
        status: "araştırma · örnek",
      },
      flow: [
        { icon: "wallet", label: "Ödeyen", sub: "Belge sahibi" },
        { icon: "verifier", label: "Tamga", sub: "Yetkiyi kanıtlar" },
        { icon: "bank", label: "Banka", sub: "Aktarır" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Türkmençe                                                                 */
/* -------------------------------------------------------------------------- */

const tk: ScenariosContent = {
  meta: {
    title: "Ssenariýalar we ulanyş ugurlary",
    description:
      "Tamga Network amalda nähili işleýär: ilki bilim, hasaba alnyşdan ilkinji işe çenli; şu gün bilet, saýtlara giriş we ýaş barlagy; şol bir ynam gatlagynyň soňra nirä ýetip biljekdigi.",
  },
  eyebrow: "Ulanyş ugurlary",
  title: "Ssenariýalar: ilki bilim, bir ynam gatlagy",
  intro:
    "Toruň ilkinji we esasy ssenariýasy bilim: talybyň resminamalary, hasaba alnyşdan ilkinji işe ýüz tutmaga çenli. Bilet, saýtlara giriş we ýaş barlagy şu gün şol bir gatlakda işleýär. Saglyk karar tapgyrynda; iş, döwlet hyzmatlary, logistika we töleg gatlagyň nirä ýetip biljekdigini görkezýär. Her ssenariýanyň ýanynda ýagdaýy ýazylýar.",
  note: "Ekranlar tordaky bir gapjygyň şertli dizaýnlarydyr; bahalar mysal. “Şu gün işleýär” — torda we sandbox-da başdan-aýak işleýär diýmekdir; hakyky tordaky ilkinji gurama pilot bilen goşulýar.",
  statusLabels: { today: "Şu gün işleýär", pilot: "Pilot bilen", later: "Soňra" },
  verticals: [
    {
      id: "education",
      icon: "education",
      eyebrow: "Bilim",
      name: "Bilim",
      badge: "Esasy ssenariýa",
      tone: "main",
      intro:
        "Talybyň resminamalary ilkinji günden ilkinji işe çenli onuň bilen bile gidýär: uniwersitet berýär, talybyň öz gapjygynda saklanýar, islendik adam sekuntlarda barlaýar; okuw bölümine jaň etmek gerek däl.",
      scenarios: [
        {
          status: "today",
          title: "Hasaba alnyş: gapjykda talyp resminamasy",
          body: "Hasaba alnandan soň uniwersitet talybyň gapjygyna talyp resminamasyny berýär. Resminama gysga möhletli (iň köp 90 gün) we talyp okaýança täzelenýär. Uniwersitetiň açary gol çekilen Türkiýe ynam sanawynda; resminamanyň nireden gelendigini islendik adam barlap biler.",
        },
        {
          status: "today",
          title: "Kampusa giriş bir sekuntda",
          body: "Turniketde talyp 60 sekuntlyk gol çekilen QR geçişini görkezýär. Geçişde şahsy maglumat ýok; göçürilen ýa-da gaýtadan ulanylan kod ret edilýär.",
        },
        {
          status: "today",
          title: "Arzanladyş we kitaphana: diňe “men şu ýerde talyp”",
          body: "Muzeý, ulag kärhanasy ýa-da kitaphana bir zat soraýar: bu adam şu ýerde talypmy? Gapjyk diňe şoňa jogap berýär; at, talyp belgisi we doglan senesi gizlin galýar.",
        },
        {
          status: "today",
          title: "Uçurym: galp ýasalyp bilinmeýän diplom",
          body: "Uçurymda uniwersitet diplomy gol çekilen resminama hökmünde berýär. Bir harp üýtgese gol bozulýar; ynam sanawynda bolmadyk guramanyň diplomy barlanmaýar.",
        },
        {
          status: "today",
          title: "Işe ýüz tutma: derejäni görkez, bahalary gizle",
          body: "Uçurym diňe hünärini we uçurym ýylyny paýlaşýar; ortaça baha gizlin galýar. Iş beriji sekuntlarda, öz serwerinde ýa-da Tamga Verify bilen barlaýar; uniwersitete ýüz tutmaýar.",
        },
        {
          status: "today",
          title: "Diplom yzyna alnanda, uniwersitet ýapylanda",
          body: "Uniwersitet diplomy ýatyrsa, her barlaýjy muny çap edilen ýagdaý sanawyndan iň giç takmynan 90 minutda bilýär; uniwersitet kimiň barlandygyny hiç haçan bilmeýär. Uniwersitetiň ygtyýary soňra togtadylsa, şol senä çenli beren diplomlary güýjünde galýar: ygtyýar berlen senesine görä bahalandyrylýar.",
        },
        {
          status: "later",
          title: "Daşary ýurtda magistratura",
          body: "Diplom ÝB-niň okuw standartlaryna (ELM) laýyk. Europass bilen ylalaşyk we beýleki türki döwletleriň öz sanawlary arkaly ykrar edilmek pilotdan soňky meýilleşdirilen ädimlerdir.",
        },
      ],
      callout: {
        title: "Pilot hyzmatdaşymyz: İstanbul Bilgi Üniversitesi",
        body: "Bilim pilotyny İstanbul Bilgi Üniversitesi bilen geçireris. Pilot başlaýança ýokardaky her ädimi uniwersitetiň synag guramasy hökmünde ýer alýan sandbox-da synap bolýar.",
      },
      wallet: {
        app: "Gapjyk",
        cardLabel: "RESMINAMA",
        badge: "BARLANDY",
        title: "Uniwersitet diplomy",
        subtitle: "Mysal uniwersitet · X.509 (TR)",
        rows: [
          { k: "hünär", v: "Kompýuter in.", tone: "disclosed" },
          { k: "uçurym", v: "2026", tone: "disclosed" },
          { k: "ortaça baha", v: "gizlin", tone: "hidden" },
          { k: "eýesi", v: "p:8f2…c19", tone: "accent" },
        ],
        action: "Iş berijä görkez",
        status: "SD-JWT · saýlap paýlaşmak",
      },
      flow: [
        { icon: "education", label: "Uniwersitet", sub: "Beriji (X.509)" },
        { icon: "wallet", label: "Talyp / uçurym", sub: "Eýesi (öz gapjygy)" },
        { icon: "verifier", label: "Iş beriji, turniket, kitaphana", sub: "Barlaýjy" },
      ],
    },
    {
      id: "events",
      icon: "ticket",
      eyebrow: "Çäre",
      name: "Biletler we çäreler",
      badge: "Şu gün işleýär",
      tone: "today",
      intro:
        "Bilet diňe bir zady subut etmeli: şu çäre üçin güýjündedigini. Göterýän adam barada hiç zady däl.",
      scenarios: [
        {
          title: "Şahsy maglumatsyz bilet",
          body: "Satyjy bileti çäre, oturgyç we möhlet maglumatlary bilen gapjyga berýär. At ýok, şahsyýet belgisi ýok.",
        },
        {
          title: "Gapyda bir gezek ulanmak",
          body: "Gapyda bilet barlanýar we ulanyldy diýip bellenýär. Ekran suraty ýa-da şol biletiň ikinji nusgasy ret edilýär.",
        },
        {
          title: "Konsert, kino, konferensiýa",
          body: "Hemmesi bir bilet görnüşi bilen: çäre we ýer meýdanlardyr, täze format däl; täze gurnaýjy täze programmasyz goşulýar.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "BILET",
        badge: "GÜÝJÜNDE",
        title: "Konsert bileti",
        subtitle: "Mysal bilet satyjysy · X.509 (TR)",
        rows: [
          { k: "çäre", v: "Mysal konsert", tone: "disclosed" },
          { k: "oturgyç", v: "B-14", tone: "disclosed" },
          { k: "at", v: "biletde ýok", tone: "hidden" },
          { k: "ulanyş", v: "bir gezek", tone: "accent" },
        ],
        action: "Gapyda görkez",
        status: "bir gezek · şahsy maglumat ýok",
      },
      flow: [
        { icon: "building", label: "Bilet satyjysy", sub: "Beriji (X.509)" },
        { icon: "wallet", label: "Myhman", sub: "Eýesi" },
        { icon: "verifier", label: "Gapy", sub: "Barlaýjy" },
      ],
    },
    {
      id: "online",
      icon: "online",
      eyebrow: "Onlaýn",
      name: "Saýtlar: giriş we ýaş barlagy",
      badge: "Şu gün işleýär",
      tone: "today",
      intro:
        "Saýt zerur bolandan artygyny ýygnaman adamy hasaba alyp, gaýtadan içeri goýberip we ýaşyny barlap biler.",
      scenarios: [
        {
          title: "Tamga bilen hasaba dur",
          body: "Saýt diňe hasabynda ýazylan meýdanlary soraýar. Razylyk ekranynda adam kimiň, näme we näme üçin soraýandygyny görýär we meýdanma-meýdan tassyklaýar.",
        },
        {
          title: "Her saýtda başga lakam",
          body: "Her saýt adamy özüne mahsus lakam bilen görýär; iki saýt ulanyjylaryny deňeşdirip bilmeýär. Telefon çalşanda şol lakamlar yzyna gelýär.",
        },
        {
          title: "Geçiş açary bilen gaýtadan giriş",
          body: "Indiki girişlerde telefondaky geçiş açary (passkey) ulanylýar. Ýatdan çykjak ýa-da syzjak parol ýok.",
        },
        {
          title: "18 ýaşdan uly? Diňe “hawa”",
          body: "Ýaş barlagy bir sorag berýär; doglan senesi paýlaşylmaýar. Şol subutnamanyň nol bilimli görnüşi barlaýjy tarapynda taýýar, telefona dükan wersiýasy bilen gelýär.",
        },
        {
          title: "Öz serwer kodyň bolmazdan barla",
          body: "Tamga Verify bilen saýt barlag kodyny işletmezden resminamany barlaýar; bahalar diňe saýta, bir gezek we bäş minudyň içinde gidýär.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "ISLEG",
        badge: "RAZYLYK",
        title: "Hasaba durmak · Mysal dükan",
        subtitle: "Hasaba alnan barlaýjy · X.509 (TR)",
        rows: [
          { k: "lakam", v: "p:3a9…e41", tone: "accent" },
          { k: "18+", v: "hawa", tone: "disclosed" },
          { k: "doglan senesi", v: "paýlaşylmaýar", tone: "hidden" },
          { k: "doly şahsyýet", v: "soralmady", tone: "hidden" },
        ],
        action: "Tassykla",
        status: "saýt başyna lakam · geçiş açary",
      },
      flow: [
        { icon: "building", label: "Şahsyýet resminamasyny beriji", sub: "Beriji" },
        { icon: "wallet", label: "Adam", sub: "Eýesi (öz gapjygy)" },
        { icon: "verifier", label: "Saýt", sub: "Barlaýjy" },
      ],
    },
    {
      id: "health",
      icon: "health",
      eyebrow: "Saglyk",
      name: "Saglyk",
      badge: "Karar tapgyrynda",
      tone: "proposed",
      intro:
        "Saglyk hyzmat berýänlerden başlaýar: hünär bilen meşgullanmak hukugy, palata agzalygy we hassahanadaky wezipe — biri-birini doldurýan üç resminama. Dizaýn ýazyldy; karar we resminamany berjek guramalar entek açyk.",
      scenarios: [
        {
          title: "Lukmanyň hünär hukugy",
          body: "Saglyk hünärmenlerine ygtyýar berýän edara hünär resminamasyny berýär. Dermanhana ýa-da başga hassahana jaň etmegiň ýerine sekuntlarda barlaýar.",
        },
        {
          title: "Palata agzalygy",
          body: "Lukmançylyk palatasy hünäriň görkezmeli zadyndan artygyny saklamaýan agzalyk resminamasyny berýär.",
        },
        {
          title: "Hassahanadaky wezipe",
          body: "Hassahana öz işgärlerine bölüm, wezipe we başlan senesi bilen wezipe resminamasyny berýär; ulgamlaryna giriş şoňa daýanyp biler.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "RESMINAMA",
        badge: "MYSAL",
        title: "Hünär hukugy",
        subtitle: "Mysal saglyk edarasy · X.509 (TR)",
        rows: [
          { k: "hünär", v: "Lukman", tone: "disclosed" },
          { k: "ugry", v: "Kardiologiýa", tone: "disclosed" },
          { k: "ygtyýarnama belgisi", v: "gizlin", tone: "hidden" },
          { k: "eýesi", v: "p:5c1…09b", tone: "accent" },
        ],
        action: "Dermanhanada görkez",
        status: "karar tapgyrynda · mysal",
      },
      flow: [
        { icon: "building", label: "Saglyk edarasy", sub: "Beriji" },
        { icon: "wallet", label: "Lukman", sub: "Eýesi" },
        { icon: "verifier", label: "Dermanhana / hassahana", sub: "Barlaýjy" },
      ],
    },
    {
      id: "work",
      icon: "work",
      eyebrow: "Iş",
      name: "Iş we hünärler",
      badge: "Wizýa — entek gurulmady",
      tone: "vision",
      intro:
        "Işe almak we hünär durmuşy şol bir barlaglary gaýta-gaýta geçirýär. Şol resminamalar muňa soň goýup biler.",
      scenarios: [
        {
          title: "Özüni barlaýan rezýume",
          body: "Dalaşgär diplomy we beýleki resminamalary bilen ýüz tutýar; iş beriji nusga ýygnamagyň ýerine her setiri sekuntlarda barlaýar.",
        },
        {
          title: "Hünär palatalary we birleşikler",
          body: "Palata ýa-da birleşik agzalyk resminamasyny berýär; müşderi hünärmeniň agzalygynyň güýjündedigini görýär.",
        },
        {
          title: "Kagyzsyz iş güwänamasy",
          body: "Iş beriji bankyň ýa-da jaý eýesiniň barlap biljek “işleýär” resminamasyny berýär; diňe soralan görkezilýär.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "RESMINAMA",
        badge: "MYSAL",
        title: "Palata agzalygy",
        subtitle: "Mysal hünär palatasy · X.509 (TR)",
        rows: [
          { k: "agza", v: "hawa", tone: "disclosed" },
          { k: "ýagdaýy", v: "işjeň", tone: "disclosed" },
          { k: "sanaw belgisi", v: "gizlin", tone: "hidden" },
          { k: "eýesi", v: "p:a07…4d2", tone: "accent" },
        ],
        action: "Müşderä görkez",
        status: "wizýa · mysal",
      },
      flow: [
        { icon: "building", label: "Palata / iş beriji", sub: "Beriji" },
        { icon: "wallet", label: "Hünärmen", sub: "Eýesi" },
        { icon: "verifier", label: "Müşderi / bank", sub: "Barlaýjy" },
      ],
    },
    {
      id: "public",
      icon: "public",
      eyebrow: "Döwlet",
      name: "Döwlet hyzmatlary we syýahat",
      badge: "Wizýa — entek gurulmady",
      tone: "vision",
      intro:
        "Döwlet hyzmatlary we syýahat adamlaryň iň köp resminama görkezýän we iň az paýlaşmaly ýerleridir.",
      scenarios: [
        {
          title: "Myhmanhana diňe gereklisini paýlaşyp giriş",
          body: "Myhmanhana hasaba almaga borçly meýdanlaryny, artygyny däl, şahsyýetnamanyň nusgasynyň ýerine gönüden-göni gapjykdan alýar.",
        },
        {
          title: "Häkimlik we ýerli hyzmatlar",
          body: "Häkimlik adamyň bir hyzmata laýykdygyny bir bukja resminama soramazdan barlaýar.",
        },
        {
          title: "Türki dünýäde ykrar edilmek",
          body: "Beýleki döwletler torda öz sanawlaryny işledende, Türkiýede berlen resminama Bakuwda ýa-da Almatyda täze bürokratiýasyz barlanyp bilner; tersine-de.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "ISLEG",
        badge: "RAZYLYK",
        title: "Giriş · Mysal myhmanhana",
        subtitle: "Hasaba alnan barlaýjy · X.509",
        rows: [
          { k: "at", v: "paýlaşylýar", tone: "disclosed" },
          { k: "resminama", v: "güýjünde", tone: "disclosed" },
          { k: "beýleki meýdanlar", v: "soralmady", tone: "hidden" },
          { k: "nusga", v: "ýok", tone: "accent" },
        ],
        action: "Tassykla",
        status: "wizýa · mysal",
      },
      flow: [
        { icon: "building", label: "Döwlet edarasy", sub: "Beriji" },
        { icon: "wallet", label: "Raýat / syýahatçy", sub: "Eýesi" },
        { icon: "verifier", label: "Myhmanhana / häkimlik", sub: "Barlaýjy" },
      ],
    },
    {
      id: "logistics",
      icon: "logistics",
      eyebrow: "Logistika",
      name: "Logistika",
      badge: "Gözleg — entek gurulmady",
      tone: "research",
      intro:
        "Eltip bermek we daşamak kimiň nämäni daşap biljekdigine we ýüküň baryp ýetendiginiň subutnamasyna daýanýar. Resminamalar ikisini hem göterip biler; bu gözleg ugrudyr, şu gün toruň bölegi däl.",
      scenarios: [
        {
          title: "Soňky eltip bermek: alyjy tassyklaýar",
          body: "Alyjy eltip bermegi öz gapjygyndan tassyklaýar: ekrandaky golyň ýerine gol çekilen alnandygynyň subutnamasy.",
        },
        {
          title: "Halkara daşamak (TIR)",
          body: "Sürüji kompaniýanyň ygtyýaryny we ýüküň resminamalaryny resminama hökmünde göterýär; her gümrük nokadynda sagatlaryň ýerine sekuntlarda barlanýar.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "ELTIP BERMEK",
        badge: "MYSAL",
        title: "Ugradyş 5521",
        subtitle: "Mysal logistika · X.509 (TR)",
        rows: [
          { k: "ýük", v: "resminamalar", tone: "disclosed" },
          { k: "sürüji", v: "ygtyýarly", tone: "disclosed" },
          { k: "alyjy", v: "p:3d4…a71", tone: "accent" },
        ],
        action: "Alnandygyny tassykla",
        status: "gözleg · mysal",
      },
      flow: [
        { icon: "building", label: "Daşaýjy", sub: "Beriji (X.509)" },
        { icon: "truck", label: "Sürüji", sub: "Eýesi" },
        { icon: "delivered", label: "Alyjy / gümrük", sub: "Barlaýjy" },
      ],
    },
    {
      id: "payments",
      icon: "payments",
      eyebrow: "Töleg",
      name: "Töleg",
      badge: "Gözleg — entek gurulmady",
      tone: "research",
      intro:
        "Tamga kimiň haýsy ygtyýar bilen töläp biljekdigini subut ederdi; puluň özi düzgünleşdirilen bank relslerinde galýar. Bu gözleg ugrudyr: pul birligi däl we şu gün toruň bölegi däl.",
      scenarios: [
        {
          title: "Barlanan taraplaryň arasynda töleg",
          body: "Töleýji bankyň talap edýän barlaglaryny resminama bilen subut edýär, gündelik ulanyşda lakam bilen galýar; geçirim bankda amala aşýar.",
        },
        {
          title: "Çäkli we togtadylyp bilinýän emeli aň agentleri",
          body: "Kompaniýanyň programma agenti her töleg üçin çäk, tassyklanan satyjy sanawy we möhlet bilen töleýär; jogapkär adam belli we agent derrew togtadylyp bilner.",
        },
      ],
      wallet: {
        app: "Gapjyk",
        cardLabel: "TÖLEG",
        badge: "MYSAL",
        title: "Tölegi ygtyýarlandyr",
        subtitle: "alyjy: Mysal logistika · X.509",
        rows: [
          { k: "möçber", v: "çägiň içinde", tone: "disclosed" },
          { k: "töleýji barlaglary", v: "geçdi", tone: "disclosed" },
          { k: "şahsyýet", v: "lakam", tone: "hidden" },
          { k: "geçirim", v: "bankda", tone: "accent" },
        ],
        action: "Ygtyýarlandyr",
        status: "gözleg · mysal",
      },
      flow: [
        { icon: "wallet", label: "Töleýji", sub: "Eýesi" },
        { icon: "verifier", label: "Tamga", sub: "Ygtyýary subut edýär" },
        { icon: "bank", label: "Bank", sub: "Geçirýär" },
      ],
    },
  ],
};

const content: Record<Locale, ScenariosContent> = { en, tr, tk };

export function getScenariosContent(locale: string): ScenariosContent {
  return content[locale as Locale] ?? en;
}

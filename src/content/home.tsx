import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: ReactNode;
    lead: ReactNode;
    ctaManifesto: string;
    ctaWhitepaper: string;
    ctaDemo: string;
    trustLine: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; body: string }[];
    callout: ReactNode;
  };
  whatWeAre: {
    eyebrow: string;
    title: string;
    description: string;
    principles: { title: string; body: string }[];
  };
  nameOrigin: {
    eyebrow: string;
    title: ReactNode;
    body: ReactNode;
  };
  europe: {
    eyebrow: string;
    title: string;
    description: string;
    body: ReactNode;
  };
  turkicWorld: {
    eyebrow: string;
    title: string;
    body: ReactNode;
    stats: { k: string; v: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    roles: { role: string; label: string; body: string }[];
    codeLabel: string;
    code: string;
    result: ReactNode;
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    description: string;
    tamgaIdTitle: string;
    tamgaIdBody: string;
    verticals: { name: string; body: string }[];
  };
  today: {
    eyebrow: string;
    title: string;
    description: string;
    columns: { label: string; title: string; items: string[] }[];
    note: string;
  };
  positioning: {
    title: string;
    lead: string;
    rows: { k: string; v: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    ctaDocs: string;
    ctaWhitepaper: string;
    ctaManifesto: string;
  };
};

/* -------------------------------------------------------------------------- */
/*  English (default)                                                         */
/* -------------------------------------------------------------------------- */

const en: HomeContent = {
  hero: {
    eyebrow: "Digital Trust Infrastructure",
    title: (
      <>
        The shared infrastructure of{" "}
        <span className="text-primary">trust</span> in the digital world
      </>
    ),
    lead: (
      <>
        Tamga Network is a{" "}
        <strong className="text-foreground">Digital Trust Infrastructure</strong>{" "}
        where individuals, organizations and digital assets can be reliably
        identified and build verifiable relationships. Not a new blockchain — we
        turn the identity and verification problem that every application solves
        again and again into a shared service.
      </>
    ),
    ctaManifesto: "Read the manifesto",
    ctaWhitepaper: "Whitepaper",
    ctaDemo: "See what works today",
    trustLine: "Open standards · SD-JWT VC · ISO mdoc · OpenID4VC · eIDAS 2.0 compatible",
  },
  problem: {
    eyebrow: "The problem",
    title: "The world is leaving the “document copy” era behind",
    description:
      "For decades we proved our identity by handing over copies of documents. This model has three fundamental problems — and the world is moving to a model that reverses it.",
    items: [
      {
        title: "Data piles up everywhere",
        body: "To prove your identity you hand a copy to an institution; that copy is stored on servers, duplicated, and slips out of your control. Privacy and security risk grows.",
      },
      {
        title: "Everyone repeats the same work",
        body: "Every bank, hospital and university builds the same verification from scratch. With no shared trust layer, each application reinvents the wheel.",
      },
      {
        title: "Authenticity is left to the “copy”",
        body: "A document’s validity is often left to how convincing a photocopy looks. We need a proof that can be verified cryptographically, without going back to the source.",
      },
    ],
    callout: (
      <>
        <span className="text-primary">The new model reverses this:</span> data
        stays under the user’s control, only the necessary proof is shared, and
        verification happens cryptographically without contacting the source.
      </>
    ),
  },
  whatWeAre: {
    eyebrow: "What we are",
    title: "Not a new blockchain, but a shared trust layer",
    description:
      "Tamga Network builds a world where digital trust is provided by a shared infrastructure rather than by each application alone. Four principles define this approach.",
    principles: [
      {
        title: "Digital identity is the starting point",
        body: "Trust is the real value the infrastructure produces. Every entity is first represented by an identity: identity first, transaction second.",
      },
      {
        title: "Signed trust lists today, a shared ledger later",
        body: "Trust is anchored in signed, versioned trust lists — the model the EU itself uses. A permissioned ledger is added only when at least two independent operators join. Personal data is never written to either.",
      },
      {
        title: "Users never see the plumbing",
        body: "They only use their wallet. Trust lists, certificates and revocation checks run in the background — no fees, no technical steps.",
      },
      {
        title: "Open standards are essential",
        body: "SD-JWT VC and ISO 18013-5 mdoc, OpenID4VCI/VP, X.509 — the EUDI profiles. Commitment to shared standards, not to a specific vendor.",
      },
    ],
  },
  nameOrigin: {
    eyebrow: "Where our name comes from",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> — an ancient seal, a
        modern proof
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong> is the ancient seal of the Turkic tribes — a
          mark that proved ownership, belonging and authority. A tribe’s tamga
          proved to whom a good belonged and from whom a document came.
        </p>
        <p>
          A verifiable digital document (Verifiable Credential) is precisely its
          modern counterpart: <strong>a digital seal.</strong> A shared tradition
          of the seal is the strongest symbol of a shared digital trust network.
        </p>
      </>
    ),
  },
  europe: {
    eyebrow: "What Europe is doing",
    title: "eIDAS 2.0 and the EUDI Wallet",
    description:
      "This is not just a European regulation; it is a de-facto standard for how identity and trust are established in the digital world.",
    body: (
      <>
        <p>
          The European Union, through the <strong>eIDAS 2.0</strong> framework,
          requires every member state to offer its citizens a{" "}
          <strong>European Digital Identity Wallet (EUDI Wallet)</strong>.
          Citizens carry their identity, diplomas, driving licence and health
          documents on their own phone and present them{" "}
          <strong>selectively</strong>.
        </p>
        <p>
          SD-JWT VC, ISO mdoc, OpenID4VC and selective disclosure are no
          longer academic concepts but continent-scale requirements. The question
          is no longer “will this transformation happen” but{" "}
          <strong>“who will be a producer in it.”</strong>
        </p>
      </>
    ),
  },
  turkicWorld: {
    eyebrow: "The goal",
    title: "Uniting the Turkic world on a shared foundation of trust",
    body: (
      <>
        <p>
          Digital trust need not stay within national borders. A diploma issued
          in one country should be verifiable in another; a company’s identity
          should be trusted across borders.
        </p>
        <p>
          Sharing a common language, culture and history, the{" "}
          <strong>Turkic world of ~300 million people</strong> is a natural and
          vast foundation for cross-border verifiable identity. In the long run
          this vision takes shape as a <strong>Trust Mesh</strong>: each country
          keeps its own trust network while connecting to others through shared
          standards.
        </p>
      </>
    ),
    stats: [
      { k: "~300M", v: "Common ground: population of the Turkic world" },
      { k: "6+", v: "Organization of Turkic States members/observers" },
      { k: "1", v: "Shared, interoperable trust standard" },
      { k: "0", v: "Personal data written to trust lists, logs or ledger" },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "The Issuer — Holder — Verifier trust triangle",
    description:
      "The standard model of eIDAS 2.0 and the EUDI Wallet. The source of authority is always an institution listed in a signed trust list.",
    roles: [
      {
        role: "Issuer",
        label: "Issues",
        body: "The organization that issues a verifiable credential (university, government, hospital).",
      },
      {
        role: "Holder",
        label: "Carries",
        body: "The party that stores and presents the credential in their wallet (TamgaID) — usually the individual.",
      },
      {
        role: "Verifier",
        label: "Verifies",
        body: "The party that verifies the presented credential cryptographically, without going back to the source.",
      },
    ],
    codeLabel: "Selective disclosure — proof of “over 18” without revealing the birth date",
    code: `credential:
  format:      mso_mdoc (ISO 18013-5)
  issuer:      identity provider · X.509 (TR)
  holder:      device key · a copy used for this verifier only
  claims:
    age_over_18:   true      ✓ disclosed
    birth_date:    ▧ not sent
    full_name:     ▧ not sent
    address:       ▧ not sent
  checks:      signature ✓ · trust list ✓ · status ✓  →  ACCEPTED`,
    result: (
      <>
        The result:{" "}
        <span className="text-primary">
          higher trust by sharing less data.
        </span>
      </>
    ),
  },
  ecosystem: {
    eyebrow: "Ecosystem",
    title: "Starts with TamgaID, grows with vertical platforms",
    description:
      "The infrastructure’s first end-user product is TamgaID — the wallet where a user creates their digital identity. On top of it, sector-specific platforms are built, all using the same trust layer. Education runs today; health, logistics and payments show where the same layer leads.",
    tamgaIdTitle: "TamgaID",
    tamgaIdBody:
      "The wallet where a user keeps and presents their credentials. Like an EUDI Wallet: identity and diplomas, selective disclosure, a pass for turnstiles and event gates, and passwordless sign-in to websites. Free for individuals. Qualified e-signature is on the roadmap. TamgaID is not Tamga Network itself — it is the first door that opens onto it.",
    verticals: [
      { name: "Education", body: "Diplomas, transcripts and academic titles produced as internationally verifiable credentials." },
      { name: "Health", body: "Physician credentials, patient consents and digital health records." },
      { name: "Logistics", body: "From a customer confirming last-mile receipt in their wallet to international freight — trucks, drivers, cargo and customs verified end-to-end, with payment released on proof of delivery." },
      { name: "Payments", body: "Authorizing payments between verified parties — settlement stays on regulated bank/CBDC rails, not on Tamga." },
    ],
  },
  today: {
    eyebrow: "Where we are",
    title: "Working today — and honest about the rest",
    description:
      "Tamga is not a slide deck. The full flow runs end to end with real cryptography, and has been tested on a phone.",
    columns: [
      {
        label: "Today",
        title: "Working today",
        items: [
          "Diplomas and student cards issued into the wallet (OpenID4VCI)",
          "Only the requested fields are shared; verified in seconds (OpenID4VP)",
          "Revocation and institution suspension reach every verifier",
          "Remote identity check (document + liveness) → identity credential, also as ISO mdoc for age checks",
          "Turnstile and event-gate pass; single-use tickets",
          "Website sign-up with the wallet, daily sign-in with a passkey",
          "Open-source packages @tamga-network/* (npm release pending)",
        ],
      },
      {
        label: "Next",
        title: "Pilot",
        items: [
          "One foundation university: diplomas and student cards",
          "30–100 volunteer graduates and 2–5 verifiers",
          "The signing key held by the university, not by Tamga",
          "Signed trust lists — no ledger yet",
        ],
      },
      {
        label: "Later",
        title: "Network",
        items: [
          "A permissioned ledger (Besu/QBFT) once at least two independent operators join",
          "Trust lists run by the member states themselves",
          "Close-range presentation (ISO 18013-5 over NFC/BLE) and the browser Digital Credentials API",
        ],
      },
    ],
    note: "Every first-release shortcut — sample records, software keys, a single operator — is listed openly in our deviation log and is closed before the pilot.",
  },
  positioning: {
    title: "The EBSI of the Turkic world",
    lead: "If Europe’s infrastructure layer is EBSI, then Tamga Network is its counterpart for Türkiye and the Turkic world. Not a competitor, but interoperable. The same standards, our own sovereign network.",
    rows: [
      { k: "Layered model", v: "Infrastructure = Tamga Network (like EBSI) · Application = TamgaID (like the EUDI Wallet)." },
      { k: "States with equal power", v: "Target: the states of the Organization of Turkic States run the network with equal votes. Today Tamga operates the trust lists provisionally, on behalf of the states — every structure already has a slot for each member state." },
      { k: "Sovereignty-first governance", v: "Network membership by 2/3 validator vote · national registries governed only by their own state · cross-border recognition set unilaterally." },
      { k: "Accountable privacy", v: "Today: each verifier receives a different copy of your credential, so verifiers cannot link you to each other. Design goal (research): identity resolvable only by a court plus a multi-institution threshold — never by any single actor." },
      { k: "Compatible yet independent", v: "Built on the eIDAS 2.0 / EUDI profiles; data and governance stay in-country, in a sovereign architecture." },
    ],
  },
  cta: {
    eyebrow: "The modern counterpart of the ancient seal",
    title: "We turn digital trust from a problem into an infrastructure",
    description:
      "Read the documentation that explains the project from scratch, review the technical whitepaper, or take a look at our manifesto.",
    ctaDocs: "Read the docs",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
};

/* -------------------------------------------------------------------------- */
/*  Türkçe                                                                    */
/* -------------------------------------------------------------------------- */

const tr: HomeContent = {
  hero: {
    eyebrow: "Digital Trust Infrastructure",
    title: (
      <>
        Dijital dünyada <span className="text-primary">güvenin</span> ortak
        altyapısı
      </>
    ),
    lead: (
      <>
        Tamga Network; bireylerin, kurumların ve dijital varlıkların güvenilir
        biçimde tanımlanıp doğrulanabilir ilişkiler kurabildiği bir{" "}
        <strong className="text-foreground">Dijital Güven Altyapısıdır</strong>.
        Yeni bir blockchain ağı değil; her uygulamanın tekrar tekrar çözdüğü
        kimlik ve doğrulama problemini ortak bir hizmete dönüştürüyoruz.
      </>
    ),
    ctaManifesto: "Manifesto’yu oku",
    ctaWhitepaper: "Whitepaper",
    ctaDemo: "Bugün neler çalışıyor",
    trustLine: "Açık standartlar · SD-JWT VC · ISO mdoc · OpenID4VC · eIDAS 2.0 uyumlu",
  },
  problem: {
    eyebrow: "Sorun",
    title: "Dünya “belge kopyası” çağını geride bırakıyor",
    description:
      "Onlarca yıldır kimliğimizi belgelerin kopyasını teslim ederek kanıtladık. Bu modelin üç temel sorunu var — ve dünya bunu tersine çeviren yeni bir modele geçiyor.",
    items: [
      {
        title: "Veri her yerde birikiyor",
        body: "Kimliğini kanıtlamak için belgenin kopyasını kuruma verirsin; o kopya sunucularda saklanır, çoğaltılır, kontrolünden çıkar. Mahremiyet ve güvenlik riski büyür.",
      },
      {
        title: "Herkes aynı işi tekrar yapıyor",
        body: "Her banka, hastane, üniversite aynı doğrulamayı sıfırdan kuruyor. Ortak bir güven katmanı yok; her uygulama kimlik problemini yeniden çözüyor.",
      },
      {
        title: "Gerçeklik “kopyaya” bırakılmış",
        body: "Belgenin doğruluğu çoğu zaman fotokopinin ikna ediciliğine kalıyor. Kaynağa gitmeden, kriptografik olarak doğrulanabilir bir kanıt gerekiyor.",
      },
    ],
    callout: (
      <>
        <span className="text-primary">Yeni model bunu tersine çeviriyor:</span>{" "}
        veri kullanıcının kontrolünde kalır, yalnızca gerekli olan kanıt
        paylaşılır ve doğrulama kaynağa gitmeden kriptografik olarak yapılır.
      </>
    ),
  },
  whatWeAre: {
    eyebrow: "Biz neyiz",
    title: "Yeni bir blockchain değil, ortak bir güven katmanı",
    description:
      "Tamga Network, dijital güveni tek tek uygulamaların değil, ortak bir altyapının sağladığı bir dünya kurar. Dört ilke bu yaklaşımı tanımlar.",
    principles: [
      {
        title: "Dijital kimlik başlangıç noktasıdır",
        body: "Güven ise altyapının ürettiği asıl değer. Ağdaki her varlık önce bir kimlikle temsil edilir: önce kimlik, sonra işlem.",
      },
      {
        title: "Bugün imzalı güven listeleri, yarın ortak defter",
        body: "Güven; imzalı, sürümlü güven listelerine dayanır — AB'nin kendi kullandığı model. İzinli bir defter (zincir) ancak en az iki bağımsız operatör katıldığında eklenir. Kişisel veri ikisine de asla yazılmaz.",
      },
      {
        title: "Kullanıcı altyapıyı görmez",
        body: "Yalnızca cüzdanını kullanır. Güven listeleri, sertifikalar ve iptal kontrolleri arka planda çalışır — ücret yok, teknik adım yok.",
      },
      {
        title: "Açık standartlar esastır",
        body: "SD-JWT VC ve ISO 18013-5 mdoc, OpenID4VCI/VP, X.509 — EUDI profilleri. Belirli bir üreticiye değil, ortak standartlara bağlılık.",
      },
    ],
  },
  nameOrigin: {
    eyebrow: "İsmimiz nereden geliyor",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> — kadim mühür, çağdaş
        kanıt
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong>, Türk boylarının kadim mührüdür — mülkiyeti,
          aidiyeti ve yetkiyi doğrulayan işaret. Bir boyun tamgası; bir malın
          kime ait olduğunu, bir belgenin kimden geldiğini kanıtlardı.
        </p>
        <p>
          Doğrulanabilir dijital belge (Verifiable Credential) tam olarak bunun
          çağdaş karşılığıdır: <strong>dijital bir mühür.</strong> Ortak bir
          mühür geleneği, ortak bir dijital güven ağının en güçlü sembolüdür.
        </p>
      </>
    ),
  },
  europe: {
    eyebrow: "Avrupa ne yapıyor",
    title: "eIDAS 2.0 ve EUDI Wallet",
    description:
      "Bu yalnızca bir Avrupa yönetmeliği değil; kimliğin ve güvenin dijital dünyada nasıl kurulacağına dair fiilî bir standart.",
    body: (
      <>
        <p>
          Avrupa Birliği, <strong>eIDAS 2.0</strong> çerçevesiyle her üye
          devletin vatandaşına bir{" "}
          <strong>European Digital Identity Wallet (EUDI Wallet)</strong>{" "}
          sunmasını öngörüyor. Vatandaş; kimliğini, diplomasını, ehliyetini ve
          sağlık belgelerini kendi telefonunda taşıyor ve bunları{" "}
          <strong>seçici biçimde</strong> sunuyor.
        </p>
        <p>
          SD-JWT VC, ISO mdoc, OpenID4VC ve seçici ifşa artık akademik
          kavramlar değil, kıtasal ölçekte uygulanan gereksinimlerdir. Soru artık
          “bu dönüşüm olacak mı” değil,{" "}
          <strong>“bu dönüşümde kim üretici olacak”</strong> sorusudur.
        </p>
      </>
    ),
  },
  turkicWorld: {
    eyebrow: "Hedef",
    title: "Türk dünyasını ortak güven zemininde birleştirmek",
    body: (
      <>
        <p>
          Dijital güvenin ulusal sınırlar içinde kalması gerekmez. Bir ülkede
          verilen diploma başka bir ülkede doğrulanabilmeli; bir şirketin kimliği
          sınır ötesinde güvenilir sayılabilmelidir.
        </p>
        <p>
          Ortak dil, kültür ve tarih mirasını paylaşan{" "}
          <strong>~300 milyon nüfuslu Türk dünyası</strong>, sınır ötesi
          doğrulanabilir kimlik için doğal ve büyük bir zemindir. Uzun vadede bu
          vizyon <strong>Trust Mesh</strong> olarak somutlaşır: her ülke kendi
          güven ağını korurken ortak standartlar üzerinden diğer ağlarla güven
          ilişkisi kurar.
        </p>
      </>
    ),
    stats: [
      { k: "~300M", v: "Ortak zemin: Türk dünyası nüfusu" },
      { k: "6+", v: "Türk Devletleri Teşkilatı üye/gözlemci" },
      { k: "1", v: "Ortak, birlikte çalışabilir güven standardı" },
      { k: "0", v: "Güven listesine, günlüğe ya da zincire yazılan kişisel veri" },
    ],
  },
  howItWorks: {
    eyebrow: "Nasıl çalışır",
    title: "Issuer — Holder — Verifier güven üçgeni",
    description:
      "eIDAS 2.0 ve EUDI Wallet’ın standart modeli. Yetkinin kaynağı her zaman imzalı bir güven listesinde kayıtlı bir kurumdur.",
    roles: [
      {
        role: "Issuer",
        label: "Düzenleyen",
        body: "Doğrulanabilir belge veren organizasyon (üniversite, kamu, hastane).",
      },
      {
        role: "Holder",
        label: "Taşıyan",
        body: "Belgeyi cüzdanında (TamgaID) saklayan ve sunan taraf; çoğunlukla birey.",
      },
      {
        role: "Verifier",
        label: "Doğrulayan",
        body: "Sunulan belgeyi kaynağa gitmeden kriptografik olarak doğrulayan taraf.",
      },
    ],
    codeLabel: "Seçici ifşa — “18 yaş üstü” kanıtı, doğum tarihi verilmeden",
    code: `credential:
  format:      mso_mdoc (ISO 18013-5)
  issuer:      identity provider · X.509 (TR)
  holder:      cihaz anahtarı · yalnızca bu doğrulayıcıya ayrılmış kopya
  claims:
    age_over_18:   true      ✓ açıklandı
    birth_date:    ▧ gönderilmedi
    full_name:     ▧ gönderilmedi
    address:       ▧ gönderilmedi
  checks:      signature ✓ · trust list ✓ · status ✓  →  ACCEPTED`,
    result: (
      <>
        Sonuç:{" "}
        <span className="text-primary">
          daha az veri paylaşarak daha yüksek güven.
        </span>
      </>
    ),
  },
  ecosystem: {
    eyebrow: "Ekosistem",
    title: "TamgaID ile başlar, dikey platformlarla büyür",
    description:
      "Altyapının son kullanıcıya açılan ilk ürünü TamgaID’dir — kullanıcının dijital kimliğini oluşturduğu cüzdan. Üzerine, hepsi aynı güven katmanını kullanan sektörel platformlar inşa edilir. Eğitim bugün çalışıyor; sağlık, lojistik ve ödeme aynı katmanın nereye uzandığını gösteriyor.",
    tamgaIdTitle: "TamgaID",
    tamgaIdBody:
      "Kullanıcının belgelerini sakladığı ve sunduğu cüzdan. EUDI Wallet benzeri: kimlik ve diploma, seçici açıklama, turnike ve etkinlik kapısı için geçiş kartı, web sitelerine şifresiz giriş. Kişiler için ücretsiz. Nitelikli e-imza yol haritasında. TamgaID, Tamga Network’ün kendisi değildir — ona açılan ilk kapıdır.",
    verticals: [
      { name: "Education", body: "Diploma, transkript ve akademik unvanların uluslararası doğrulanabilir belgeleri." },
      { name: "Health", body: "Hekim yetkileri, hasta onayları ve dijital sağlık belgeleri." },
      { name: "Logistics", body: "Müşterinin son teslimatı cüzdanıyla onaylamasından uluslararası taşımacılığa — TIR, şoför, mal ve gümrük uçtan uca doğrulanır, ödeme teslim kanıtıyla serbest kalır." },
      { name: "Payments", body: "Kimliği doğrulanmış taraflar arası ödemenin yetkilendirilmesi — mutabakat bankalarda/CBDC’de kalır, Tamga’da değil." },
    ],
  },
  today: {
    eyebrow: "Neredeyiz",
    title: "Bugün çalışıyor — geri kalanı hakkında dürüstüz",
    description:
      "Tamga bir sunum dosyası değil. Akışın tamamı gerçek kriptografiyle uçtan uca çalışıyor ve telefonda test edildi.",
    columns: [
      {
        label: "Bugün",
        title: "Bugün çalışıyor",
        items: [
          "Diploma ve öğrenci belgesi cüzdana verilir (OpenID4VCI)",
          "Yalnızca istenen alanlar paylaşılır; saniyeler içinde doğrulanır (OpenID4VP)",
          "İptal ve kurum askısı her doğrulayıcıya yansır",
          "Uzaktan kimlik doğrulama (belge + canlılık) → kimlik belgesi; yaş kontrolü için ISO mdoc olarak da",
          "Turnike ve etkinlik kapısı için geçiş kartı; tek kullanımlık bilet",
          "Web sitesine cüzdanla kayıt, günlük girişte passkey",
          "Açık kaynak paketler @tamga-network/* (npm yayını bekliyor)",
        ],
      },
      {
        label: "Sıradaki",
        title: "Pilot",
        items: [
          "Bir vakıf üniversitesi: diploma ve öğrenci belgesi",
          "30–100 gönüllü mezun ve 2–5 doğrulayıcı",
          "İmza anahtarı Tamga'da değil, üniversitede",
          "İmzalı güven listeleri — henüz zincir yok",
        ],
      },
      {
        label: "Sonra",
        title: "Ağ",
        items: [
          "En az iki bağımsız operatör katılınca izinli defter (Besu/QBFT)",
          "Güven listelerini üye devletlerin kendisi yayınlar",
          "Yakın alan sunumu (NFC/BLE üzerinden ISO 18013-5) ve tarayıcı Digital Credentials API",
        ],
      },
    ],
    note: "İlk sürümdeki her kestirme — örnek kayıtlar, yazılımda tutulan anahtar, tek operatör — sapma kütüğümüzde açıkça listelenir ve pilottan önce kapatılır.",
  },
  positioning: {
    title: "Türk dünyasının EBSI’si",
    lead: "Avrupa’nın altyapı katmanı EBSI ise, Tamga Network Türkiye ve Türk dünyası için onun karşılığıdır. Rakip değil, birlikte çalışabilir. Aynı standartlar, kendi egemen ağ.",
    rows: [
      { k: "Katmanlı model", v: "Altyapı = Tamga Network (EBSI benzeri) · Uygulama = TamgaID (EUDI benzeri)." },
      { k: "Eşit güçlü devletler", v: "Hedef: ağı Türk Devletleri Teşkilatı devletleri eşit oyla işletir. Bugün Tamga, güven listelerini devletler adına geçici operatör olarak yayınlar — her yapıda her üye devlet için şimdiden bir yer ayrılmıştır." },
      { k: "Egemenlik-öncelikli yönetişim", v: "Ağa üyelik 2/3 validator oyuyla · ulusal kayıtlar yalnızca ilgili devletin yetkisinde · sınır-ötesi tanıma tek taraflı belirlenir." },
      { k: "Hesap-verebilir mahremiyet", v: "Bugün: her doğrulayıcı belgenin farklı bir kopyasını alır; doğrulayıcılar seni birbirleriyle eşleştiremez. Tasarım hedefi (araştırma): kimlik yalnızca mahkeme + çok-kurumlu eşikle çözülebilsin — tek bir aktör asla açamasın." },
      { k: "Uyumlu ama bağımsız", v: "eIDAS 2.0 / EUDI profilleri üzerine kurulu; veri ve yönetişim yurt içinde, egemen mimaride." },
    ],
  },
  cta: {
    eyebrow: "Kadim mührün çağdaş karşılığı",
    title: "Dijital güveni bir problem olmaktan çıkarıp bir altyapıya dönüştürüyoruz",
    description:
      "Projeyi sıfırdan anlatan dokümanları oku, teknik whitepaper’ı incele veya manifestomuza göz at.",
    ctaDocs: "Dokümanları oku",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
};

/* -------------------------------------------------------------------------- */
/*  Türkmençe (ilk taslak — native review gerekir)                            */
/* -------------------------------------------------------------------------- */

const tk: HomeContent = {
  hero: {
    eyebrow: "Digital Trust Infrastructure",
    title: (
      <>
        Sanly dünýäde <span className="text-primary">ynamyň</span> umumy
        infrastrukturasy
      </>
    ),
    lead: (
      <>
        Tamga Network — şahslaryň, guramalaryň we sanly emläkleriň ynamly
        kesgitlenip, barlanyp bilinýän gatnaşyklar gurup bilýän bir{" "}
        <strong className="text-foreground">Sanly Ynam Infrastrukturasydyr</strong>
        . Täze blokçeýn tory däl; her programmanyň gaýta-gaýta çözýän şahsyýet we
        barlag meselesini umumy hyzmata öwürýäris.
      </>
    ),
    ctaManifesto: "Manifesti oka",
    ctaWhitepaper: "Whitepaper",
    ctaDemo: "Häzir näme işleýär",
    trustLine: "Açyk standartlar · SD-JWT VC · ISO mdoc · OpenID4VC · eIDAS 2.0 laýyk",
  },
  problem: {
    eyebrow: "Mesele",
    title: "Dünýä “resminama nusgasy” döwrüni yzda goýýar",
    description:
      "Onlarça ýyllap şahsyýetimizi resminamalaryň nusgasyny tabşyryp subut etdik. Bu modeliň üç esasy meselesi bar — we dünýä muny tersine öwürýän täze modele geçýär.",
    items: [
      {
        title: "Maglumat her ýerde toplanýar",
        body: "Şahsyýetiňi subut etmek üçin resminamanyň nusgasyny gurama berýärsiň; ol nusga serwerlerde saklanýar, köpeldilýär we gözegçiligiňden çykýar. Gizlinlik we howpsuzlyk töwekgelçiligi artýar.",
      },
      {
        title: "Hemmeler şol bir işi gaýtalaýar",
        body: "Her bank, hassahana, uniwersitet şol bir barlagy başdan gurýar. Umumy ynam gatlagy ýok; her programma şahsyýet meselesini täzeden çözýär.",
      },
      {
        title: "Hakykylyk “nusga” bagly galýar",
        body: "Resminamanyň dogrulygy köplenç nusganyň ynandyryjylygyna bagly bolýar. Çeşmä ýüz tutman, kriptografik taýdan barlanyp bilinýän subutnama gerek.",
      },
    ],
    callout: (
      <>
        <span className="text-primary">Täze model muny tersine öwürýär:</span>{" "}
        maglumat ulanyjynyň gözegçiliginde galýar, diňe zerur subutnama
        paýlaşylýar we barlag çeşmä ýüz tutman kriptografik ýagdaýda edilýär.
      </>
    ),
  },
  whatWeAre: {
    eyebrow: "Biz näme",
    title: "Täze blokçeýn däl, umumy ynam gatlagy",
    description:
      "Tamga Network sanly ynamy her programmanyň däl-de, umumy infrastrukturanyň üpjün edýän dünýäsini gurýar. Bu çemeleşmäni dört ýörelge kesgitleýär.",
    principles: [
      {
        title: "Sanly şahsyýet başlangyç nokatdyr",
        body: "Ynam bolsa infrastrukturanyň öndürýän esasy gymmatydyr. Tordaky her subýekt ilki şahsyýet bilen görkezilýär: ilki şahsyýet, soň amal.",
      },
      {
        title: "Häzir gol çekilen ynam sanawlary, soňra umumy kitap",
        body: "Ynam gol çekilen, wersiýaly ynam sanawlaryna daýanýar — ÝB-niň özüniň ulanýan modeli. Rugsatly kitap (zynjyr) diňe azyndan iki garaşsyz operator goşulanda goşulýar. Şahsy maglumat hiç birine ýazylmaýar.",
      },
      {
        title: "Ulanyjy infrastrukturany görmeýär",
        body: "Diňe gapjygyny ulanýar. Ynam sanawlary, sertifikatlar we ýatyrylyş barlaglary fonda işleýär — töleg ýok, tehniki ädim ýok.",
      },
      {
        title: "Açyk standartlar esasdyr",
        body: "SD-JWT VC we ISO 18013-5 mdoc, OpenID4VCI/VP, X.509 — EUDI profilleri. Belli bir öndürijä däl, umumy standartlara ygrarlylyk.",
      },
    ],
  },
  nameOrigin: {
    eyebrow: "Adymyz nireden gelýär",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> — gadymy möhür,
        häzirki zaman subutnama
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong> — türki taýpalaryň gadymy möhüridir; eýeçiligi,
          degişliligi we ygtyýary tassyklaýan belgi. Bir taýpanyň tamgasy; bir
          zadyň kime degişlidigini, bir resminamanyň kimden gelendigini subut
          edýärdi.
        </p>
        <p>
          Barlanyp bilinýän sanly resminama (Verifiable Credential) hut şonuň
          häzirki zaman garşylygydyr: <strong>sanly möhür.</strong> Umumy möhür
          däbi, umumy sanly ynam torunyň iň güýçli nyşanydyr.
        </p>
      </>
    ),
  },
  europe: {
    eyebrow: "Ýewropa näme edýär",
    title: "eIDAS 2.0 we EUDI Wallet",
    description:
      "Bu diňe bir Ýewropa düzgünnamasy däl; şahsyýetiň we ynamyň sanly dünýäde nähili guruljakdygy barada hakyky standart.",
    body: (
      <>
        <p>
          Ýewropa Bileleşigi <strong>eIDAS 2.0</strong> çarçuwasy bilen her agza
          döwletiň raýatyna bir{" "}
          <strong>European Digital Identity Wallet (EUDI Wallet)</strong> hödürlemegini
          talap edýär. Raýat; şahsyýetini, diplomyny, sürüjilik şahadatnamasyny
          we saglyk resminamalaryny öz telefonynda göterýär we olary{" "}
          <strong>saýlama görnüşde</strong> hödürleýär.
        </p>
        <p>
          SD-JWT VC, ISO mdoc, OpenID4VC we saýlama açyklama indi akademiki
          düşünjeler däl, yklym möçberinde ulanylýan talaplardyr. Sowal indi “bu
          özgeriş boljakmy” däl,{" "}
          <strong>“bu özgerişde kim öndüriji bolar”</strong> diýen sowaldyr.
        </p>
      </>
    ),
  },
  turkicWorld: {
    eyebrow: "Maksat",
    title: "Türki dünýäsini umumy ynam binýadynda birleşdirmek",
    body: (
      <>
        <p>
          Sanly ynamyň milli serhetleriň içinde galmagy hökman däl. Bir ýurtda
          berlen diplom başga ýurtda barlanyp bilinmeli; bir kompaniýanyň
          şahsyýeti serhetden aňry ynamly hasaplanyp bilinmeli.
        </p>
        <p>
          Umumy dili, medeniýeti we taryhy mirasy paýlaşýan{" "}
          <strong>~300 million ilatly türki dünýäsi</strong>, serhetaşa barlanyp
          bilinýän şahsyýet üçin tebigy we uly binýatdyr. Uzak möhletde bu
          garaýyş <strong>Trust Mesh</strong> hökmünde göwrümlenýär: her ýurt öz
          ynam toruny saklap, umumy standartlar arkaly beýleki torlar bilen ynam
          gatnaşygyny gurýar.
        </p>
      </>
    ),
    stats: [
      { k: "~300M", v: "Umumy binýat: türki dünýäsiniň ilaty" },
      { k: "6+", v: "Türki Döwletleriň Guramasy agza/synçy" },
      { k: "1", v: "Umumy, bilelikde işleýän ynam standarty" },
      { k: "0", v: "Ynam sanawyna, žurnala ýa-da zynjyra ýazylan şahsy maglumat" },
    ],
  },
  howItWorks: {
    eyebrow: "Nähili işleýär",
    title: "Issuer — Holder — Verifier ynam üçburçlugy",
    description:
      "eIDAS 2.0 we EUDI Wallet-yň standart modeli. Ygtyýaryň çeşmesi hemişe gol çekilen ynam sanawynda hasaba alnan guramadyr.",
    roles: [
      {
        role: "Issuer",
        label: "Beriji",
        body: "Barlanyp bilinýän resminama berýän gurama (uniwersitet, döwlet, hassahana).",
      },
      {
        role: "Holder",
        label: "Göteriji",
        body: "Resminamany gapjygynda (TamgaID) saklaýan we hödürleýän tarap; köplenç şahs.",
      },
      {
        role: "Verifier",
        label: "Barlaýjy",
        body: "Hödürlenen resminamany çeşmä ýüz tutman kriptografik taýdan barlaýan tarap.",
      },
    ],
    codeLabel: "Saýlama açyklama — “18 ýaşdan uly” subutnamasy, doglan senesi berilmän",
    code: `credential:
  format:      mso_mdoc (ISO 18013-5)
  issuer:      identity provider · X.509 (TR)
  holder:      enjam açary · diňe şu barlaýja niýetlenen nusga
  claims:
    age_over_18:   true      ✓ açyldy
    birth_date:    ▧ iberilmedi
    full_name:     ▧ iberilmedi
    address:       ▧ iberilmedi
  checks:      signature ✓ · trust list ✓ · status ✓  →  ACCEPTED`,
    result: (
      <>
        Netije:{" "}
        <span className="text-primary">
          az maglumat paýlaşyp, ýokary ynam.
        </span>
      </>
    ),
  },
  ecosystem: {
    eyebrow: "Ekoulgam",
    title: "TamgaID bilen başlaýar, dik platformalar bilen ösýär",
    description:
      "Infrastrukturanyň soňky ulanyja açylýan ilkinji önümi TamgaID — ulanyjynyň sanly şahsyýetini döredýän gapjygy. Onuň üstünde, ählisi şol bir ynam gatlagyny ulanýan pudaklaýyn platformalar gurulýar. Bilim häzir işleýär; saglyk, logistika we töleg şol bir gatlagyň nirä barýandygyny görkezýär.",
    tamgaIdTitle: "TamgaID",
    tamgaIdBody:
      "Ulanyjynyň resminamalaryny saklaýan we hödürleýän gapjygy. EUDI Wallet ýaly: şahsyýet we diplom, saýlama açyklama, turniket we çäre gapysy üçin geçiş kartasy, web saýtlara parolsyz giriş. Adamlar üçin mugt. Kwalifisirlenen elektron gol ýol kartasynda. TamgaID Tamga Network-yň özi däl — oňa açylýan ilkinji gapydyr.",
    verticals: [
      { name: "Education", body: "Diplomlaryň, transkriptleriň we akademiki dereželeriň halkara barlanyp bilinýän resminamalary." },
      { name: "Health", body: "Lukman ygtyýarlary, näsag razylyklary we sanly saglyk resminamalary." },
      { name: "Logistics", body: "Müşderiniň soňky eltip berişi gapjygy bilen tassyklamagyndan halkara daşamaga çenli — TIR, sürüji, haryt we gümrük uçdan-uca barlanýar, töleg eltip beriş subutnamasy bilen açylýar." },
      { name: "Payments", body: "Şahsyýeti barlanan taraplaryň arasyndaky tölegi ygtyýarlandyrmak — hasaplaşyk banklarda/CBDC-de galýar, Tamga-da däl." },
    ],
  },
  today: {
    eyebrow: "Biz nirede",
    title: "Häzir işleýär — galanlary barada dogruçyl",
    description:
      "Tamga diňe bir prezentasiýa däl. Tutuş akym hakyky kriptografiýa bilen başdan-aýak işleýär we telefonda synagdan geçirildi.",
    columns: [
      {
        label: "Häzir",
        title: "Häzir işleýär",
        items: [
          "Diplom we talyp resminamasy gapjyga berilýär (OpenID4VCI)",
          "Diňe soralan meýdanlar paýlaşylýar; birnäçe sekuntda barlanýar (OpenID4VP)",
          "Ýatyrylyş we guramanyň togtadylmagy her barlaýja ýetýär",
          "Uzakdan şahsyýet barlagy (resminama + janlylyk) → şahsyýet resminamasy; ýaş barlagy üçin ISO mdoc görnüşinde hem",
          "Turniket we çäre gapysy üçin geçiş kartasy; bir gezeklik bilet",
          "Web saýta gapjyk bilen hasaba durmak, gündelik girişde passkey",
          "Açyk çeşmeli paketler @tamga-network/* (npm çykyşy garaşylýar)",
        ],
      },
      {
        label: "Indiki",
        title: "Pilot",
        items: [
          "Bir gaznaly uniwersitet: diplom we talyp resminamasy",
          "30–100 meýletin uçurym we 2–5 barlaýjy",
          "Gol açary Tamga-da däl, uniwersitetde",
          "Gol çekilen ynam sanawlary — heniz zynjyr ýok",
        ],
      },
      {
        label: "Soňra",
        title: "Tor",
        items: [
          "Azyndan iki garaşsyz operator goşulanda rugsatly kitap (Besu/QBFT)",
          "Ynam sanawlaryny agza döwletleriň özi çap edýär",
          "Ýakyn aralyk hödürlemesi (NFC/BLE arkaly ISO 18013-5) we brauzer Digital Credentials API",
        ],
      },
    ],
    note: "Ilkinji wersiýadaky her gysga ýol — nusga ýazgylar, programma üpjünçiliginde saklanýan açar, ýeke operator — gyşarma sanawymyzda açyk görkezilýär we pilotdan öň ýapylýar.",
  },
  positioning: {
    title: "Türki dünýäsiniň EBSI-si",
    lead: "Ýewropanyň infrastruktura gatlagy EBSI bolsa, Tamga Network Türkiýe we türki dünýäsi üçin onuň garşylygydyr. Bäsdeş däl, bilelikde işleýän. Şol bir standartlar, öz özygtyýarly tory.",
    rows: [
      { k: "Gatlakly model", v: "Infrastruktura = Tamga Network (EBSI ýaly) · Programma = TamgaID (EUDI ýaly)." },
      { k: "Deň güýçli döwletler", v: "Maksat: tory Türki Döwletleriň Guramasynyň döwletleri deň ses bilen dolandyrýar. Häzir Tamga ynam sanawlaryny döwletleriň adyndan wagtlaýyn operator hökmünde çap edýär — her gurluşda her agza döwlet üçin eýýäm orun bar." },
      { k: "Özygtyýarlylyga esaslanýan dolandyryş", v: "Tora agzalyk 2/3 validator sesi bilen · milli hasaba alyşlar diňe degişli döwletiň ygtyýarynda · serhetaşa ykrar birtaraplaýyn kesgitlenýär." },
      { k: "Hasabatly gizlinlik", v: "Häzir: her barlaýjy resminamanyň başga nusgasyny alýar; barlaýjylar seni biri-biri bilen baglanyşdyryp bilmeýär. Dizaýn maksady (gözleg): şahsyýet diňe kazyýet + köp-guramaly bosaga bilen çözülip bilsin — hiç bir aktýor ýeke özi açyp bilmesin." },
      { k: "Laýyk ýöne garaşsyz", v: "eIDAS 2.0 / EUDI profillerine esaslanýar; maglumat we dolandyryş ýurt içinde, özygtyýarly arhitekturada." },
    ],
  },
  cta: {
    eyebrow: "Gadymy möhüriň häzirki zaman garşylygy",
    title: "Sanly ynamy meseleden infrastruktura öwürýäris",
    description:
      "Taslamany başdan düşündirýän resminamalary oka, tehniki whitepaper-i gözden geçir ýa-da manifestimize göz aýla.",
    ctaDocs: "Resminamalary oka",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifest",
  },
};

const content: Record<Locale, HomeContent> = { en, tr, tk };

export function getHomeContent(locale: string): HomeContent {
  return content[locale as Locale] ?? en;
}

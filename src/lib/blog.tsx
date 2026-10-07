import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

type LocalizedPost = {
  title: string;
  description: string;
  tag: string;
  readingTime: string;
  body: ReactNode;
};

type Post = {
  slug: string;
  date: string; // ISO
  i18n: { en: LocalizedPost; tr?: LocalizedPost; tk?: LocalizedPost };
};

export type PostMeta = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  readingTime: string;
};

const POSTS: Post[] = [
  {
    slug: "why-no-blockchain-yet",
    date: "2026-09-27",
    i18n: {
      en: {
        title: "Why we start without a blockchain",
        description:
          "A ledger run by one operator is just a slower database. Tamga starts with signed trust lists — the EU’s own model — and adds a ledger when independent operators join.",
        tag: "Architecture",
        readingTime: "4 min",
        body: (
          <>
            <p>
              Our earlier writing described a permissioned blockchain as Tamga’s trust anchor. On 24
              September 2026 we changed the order, not the destination. Here is why.
            </p>
            <h2>A ledger needs more than one hand</h2>
            <p>
              A blockchain earns its keep when several <strong>independent</strong> parties keep the
              same record and none can rewrite it alone. Today there is one operator: Tamga, acting
              provisionally on behalf of the states. A chain with one validator adds cost and
              complexity, but no extra trust.
            </p>
            <h2>What we do instead</h2>
            <p>
              We publish <Link href="/learn/trust-lists">signed trust lists</Link> — the model the EU
              uses for its own trusted lists. They are versioned and hash-chained, nothing is ever
              deleted, and every revocation-list publication and schema change goes into a public,
              hourly <strong>anchor log</strong>. A list that was rolled back or rewritten is
              detectable by anyone.
            </p>
            <h2>What does not change</h2>
            <ul>
              <li>Institution and document-type identifiers are computed exactly as the contracts compute them.</li>
              <li>Every list field maps to a contract record; the list history can be replayed into the ledger and both are tested to give the same answers.</li>
              <li>Wallets, verifiers and credentials read trust through one interface — the switch changes nothing for them.</li>
            </ul>
            <h2>When the ledger comes</h2>
            <p>
              A permissioned Besu/QBFT ledger is started once at least two independent validator
              operators agree in writing. Until then we say it plainly: the anchor rests on one
              operator’s signature; the public log, transparency report and audits deter misuse but
              do not make it impossible. Details in the{" "}
              <Link href="/whitepaper">whitepaper v1.0</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Neden zincirsiz başlıyoruz",
        description:
          "Tek operatörün işlettiği bir defter yalnızca daha yavaş bir veritabanıdır. Tamga, AB’nin kendi modeli olan imzalı güven listeleriyle başlar; bağımsız operatörler katılınca defter ekler.",
        tag: "Mimari",
        readingTime: "4 dk",
        body: (
          <>
            <p>
              Önceki yazılarımız izinli bir blockchain’i Tamga’nın güven çapası olarak anlatıyordu. 24
              Eylül 2026’da hedefi değil, sırayı değiştirdik. Nedeni şu.
            </p>
            <h2>Bir defter tek elle olmaz</h2>
            <p>
              Blockchain, birden çok <strong>bağımsız</strong> taraf aynı kaydı tuttuğunda ve hiçbiri
              onu tek başına yeniden yazamadığında değer katar. Bugün tek bir operatör var: devletler
              adına geçici olarak çalışan Tamga. Tek doğrulayıcılı bir zincir maliyet ve karmaşa
              ekler, ama ek güven eklemez.
            </p>
            <h2>Bunun yerine ne yapıyoruz</h2>
            <p>
              <Link href="/learn/trust-lists">İmzalı güven listeleri</Link> yayınlıyoruz — AB’nin kendi
              güven listeleri için kullandığı model. Listeler sürümlü ve hash-zincirlidir, hiçbir şey
              silinmez; her iptal listesi yayını ve şema değişikliği herkese açık, saatlik bir{" "}
              <strong>çapa günlüğüne</strong> yazılır. Geri sarılmış ya da yeniden yazılmış bir listeyi
              herkes fark edebilir.
            </p>
            <h2>Değişmeyen</h2>
            <ul>
              <li>Kurum ve belge tipi kimlikleri kontratların hesapladığı gibi hesaplanır.</li>
              <li>Her liste alanı bir kontrat kaydına eşlenir; liste geçmişi deftere yeniden oynatılabilir ve ikisinin aynı cevabı verdiği test edilir.</li>
              <li>Cüzdanlar, doğrulayıcılar ve belgeler güveni tek bir arayüzden okur — geçiş onlar için hiçbir şeyi değiştirmez.</li>
            </ul>
            <h2>Defter ne zaman gelir</h2>
            <p>
              İzinli bir Besu/QBFT defteri, en az iki bağımsız validator operatörü yazılı kabul
              verdiğinde başlatılır. O zamana kadar açıkça söylüyoruz: çapa tek operatörün imzasına
              dayanır; herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır ama
              imkânsız kılmaz. Ayrıntı <Link href="/whitepaper">whitepaper v1.0</Link>’da.
            </p>
          </>
        ),
      },
      tk: {
        title: "Näme üçin blokçeýnsiz başlaýarys",
        description:
          "Bir operatoryň dolandyrýan kitaby diňe haýal maglumatlar bazasydyr. Tamga ÝB-niň öz modeli bolan gol çekilen ynam sanawlary bilen başlaýar; garaşsyz operatorlar goşulanda kitap goşýar.",
        tag: "Arhitektura",
        readingTime: "4 min",
        body: (
          <>
            <p>
              Öňki ýazgylarymyz rugsatly blokçeýni Tamga-nyň ynam labyry hökmünde beýan edýärdi.
              2026-njy ýylyň 24-nji sentýabrynda maksady däl, tertibi üýtgetdik. Sebäbi şu.
            </p>
            <h2>Kitap bir el bilen bolmaýar</h2>
            <p>
              Blokçeýn birnäçe <strong>garaşsyz</strong> tarap şol bir ýazgyny saklanda we hiç biri
              ony ýeke özi täzeden ýazyp bilmände gymmat goşýar. Häzir bir operator bar: döwletleriň
              adyndan wagtlaýyn işleýän Tamga. Bir validatorly zynjyr çykdajy we çylşyrymlylyk
              goşýar, ýöne goşmaça ynam goşmaýar.
            </p>
            <h2>Ýerine näme edýäris</h2>
            <p>
              <Link href="/learn/trust-lists">Gol çekilen ynam sanawlaryny</Link> çap edýäris — ÝB-niň
              öz ynam sanawlary üçin ulanýan modeli. Sanawlar wersiýaly we heş-zynjyrly, hiç zat
              pozulmaýar; her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi açyk, sagatlaýyn{" "}
              <strong>labyr žurnalyna</strong> ýazylýar. Yza aýlanan ýa-da täzeden ýazylan sanawy
              islendik adam anyklap biler.
            </p>
            <h2>Üýtgemeýän</h2>
            <ul>
              <li>Gurama we resminama görnüşiniň belgileri kontraktlaryň hasaplaýşy ýaly hasaplanýar.</li>
              <li>Sanawyň her meýdany kontrakt ýazgysyna gabat gelýär; sanawyň taryhy kitaba gaýtadan oýnalyp bilner we ikisiniň şol bir jogaby berýändigi synagdan geçirilýär.</li>
              <li>Gapjyklar, barlaýjylar we resminamalar ynamy bir interfeýsden okaýar — geçiş olar üçin hiç zady üýtgetmeýär.</li>
            </ul>
            <h2>Kitap haçan gelýär</h2>
            <p>
              Rugsatly Besu/QBFT kitaby azyndan iki garaşsyz validator operatory ýazmaça razylyk
              berende başladylýar. Oňa çenli aç-açan aýdýarys: labyr bir operatoryň goluna daýanýar;
              açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar, ýöne ony mümkin
              däl etmeýär. Jikme-jiklik <Link href="/whitepaper">whitepaper v1.0</Link>-da.
            </p>
          </>
        ),
      },
    },
  },
  {
    slug: "synthetic-data-real-cryptography",
    date: "2026-09-27",
    i18n: {
      en: {
        title: "Real cryptography, working today: the Tamga first release",
        description:
          "What runs end to end today — diplomas, revocation, identity, passes, tickets, website sign-in — and every shortcut we still take, listed openly.",
        tag: "Status",
        readingTime: "4 min",
        body: (
          <>
            <p>
              We built the system a university would actually use, then ran it on invented students.
              Everything cryptographic is real; only the people and some operational pieces are not.
            </p>
            <h2>What runs today</h2>
            <ul>
              <li>A university issues a diploma or student card into the wallet — ten copies, each bound to a different device key.</li>
              <li>An employer asks for two fields and gets exactly those two, verified in seconds.</li>
              <li>A revocation reaches every verifier at the next fixed publication; suspending a university stops new issuance while earlier diplomas stay valid.</li>
              <li>A screenshot of a credential is rejected; so is a copy presented with another phone’s key.</li>
              <li>An identity check produces an identity credential, also as an ISO mdoc: an age check receives only “over 18”.</li>
              <li>Campus turnstiles and event gates accept a 60-second QR pass; a ticket works once.</li>
              <li>A website signs a person up with the wallet, then lets them in every day with a passkey.</li>
            </ul>
            <h2>What is still a shortcut</h2>
            <p>
              Every shortcut is recorded and closes before the pilot: the
              student records are samples, keys live in software rather than the phone’s secure chip, the
              university’s signing key is held by Tamga, the wallet provider does not accept the app’s own
              statement about its platform (every wallet counts as software-level; with the App Store and
              Google Play release, App Attest / Play Integrity become mandatory), and there is a single operator. The website sign-in still
              uses one account value across sites at sign-up; a per-site pseudonym is on the roadmap. <em>(Update, 2026-10-06: per-site pseudonyms are now live. The network runs no wallet provider: each wallet runs its own (ADR-0042). On the real network, Tamga does not hold institutions’ signing keys (Tamga ARF §3).)</em>
            </p>
            <h2>Why say all this</h2>
            <p>
              Because trust infrastructure that hides its limits is not trustworthy. The side-by-side
              with the EU architecture — same, bridged, planned — is in{" "}
              <Link href="/learn/roles">roles and terms</Link>; the plan is in
              the <Link href="/whitepaper">whitepaper</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Gerçek kriptografi, bugün çalışıyor: Tamga ilk sürümü",
        description:
          "Bugün uçtan uca çalışanlar — diploma, iptal, kimlik, geçiş kartı, bilet, web girişi — ve hâlâ kullandığımız her kestirme, açıkça listelenmiş hâliyle.",
        tag: "Durum",
        readingTime: "4 dk",
        body: (
          <>
            <p>
              Bir üniversitenin gerçekten kullanacağı sistemi kurduk, sonra onu uydurma öğrencilerle
              çalıştırdık. Kriptografik olan her şey gerçek; yalnızca kişiler ve bazı işletim parçaları
              değil.
            </p>
            <h2>Bugün çalışanlar</h2>
            <ul>
              <li>Üniversite cüzdana diploma ya da öğrenci belgesi verir — her biri farklı bir cihaz anahtarına bağlı on kopya.</li>
              <li>İşveren iki alan ister ve tam olarak o ikisini, saniyeler içinde doğrulanmış olarak alır.</li>
              <li>İptal bir sonraki sabit yayında her doğrulayıcıya ulaşır; üniversitenin askıya alınması yeni belge vermeyi durdurur, önceki diplomalar geçerli kalır.</li>
              <li>Belgenin ekran görüntüsü reddedilir; başka bir telefonun anahtarıyla sunulan kopya da.</li>
              <li>Kimlik kontrolü bir kimlik belgesi üretir, ISO mdoc olarak da: yaş kontrolü yalnızca “18 yaş üstü”nü alır.</li>
              <li>Kampüs turnikeleri ve etkinlik kapıları 60 saniyelik bir QR geçiş kartını kabul eder; bilet bir kez çalışır.</li>
              <li>Bir web sitesi kişiyi cüzdanla kaydeder, sonra her gün passkey ile içeri alır.</li>
            </ul>
            <h2>Hâlâ kestirme olanlar</h2>
            <p>
              Her kestirme kayıt altındadır ve pilottan önce kapanır:
              öğrenci kayıtları örnektir, anahtarlar telefonun güvenli çipinde değil yazılımda durur,
              üniversitenin imza anahtarını Tamga tutar, cüzdan sağlayıcısı uygulamanın kendi platform
              beyanını kabul etmez (her cüzdan yazılım seviyesinde sayılır; App Store ve Google Play sürümüyle
              App Attest / Play Integrity zorunlu olur) ve tek bir operatör vardır. Web girişi kayıt anında siteler arasında aynı
              hesap değerini kullanır; site başına takma ad yol haritasındadır. <em>(Güncelleme, 2026-10-06: site başına takma ad artık çalışıyor. Ağ cüzdan sağlayıcısı işletmez: her cüzdan kendininkini işletir (ADR-0042). Gerçek ağda kurumların imza anahtarını Tamga tutmaz (Tamga ARF §3).)</em>
            </p>
            <h2>Bunları neden söylüyoruz</h2>
            <p>
              Çünkü sınırlarını saklayan bir güven altyapısı güvenilir değildir. AB mimarisiyle yan yana
              kıyas — aynı, köprü, planlı — <Link href="/learn/roles">roller ve terimler</Link>{" "}
              sayfasında; plan <Link href="/whitepaper">whitepaper</Link>’da.
            </p>
          </>
        ),
      },
      tk: {
        title: "Hakyky kriptografiýa, häzir işleýär: Tamga-nyň ilkinji wersiýasy",
        description:
          "Häzir başdan-aýak işleýänler — diplom, ýatyrylyş, şahsyýet, geçiş kartasy, bilet, web giriş — we heniz ulanýan her gysga ýolumyz, açyk görkezilen görnüşde.",
        tag: "Ýagdaý",
        readingTime: "4 min",
        body: (
          <>
            <p>
              Uniwersitetiň hakykatdan ulanjak ulgamyny gurduk, soňra ony oýlanyp tapylan talyplar
              bilen işletdik. Kriptografiki zatlaryň ählisi hakyky; diňe adamlar we käbir iş bölekleri
              hakyky däl.
            </p>
            <h2>Häzir işleýänler</h2>
            <ul>
              <li>Uniwersitet gapjyga diplom ýa-da talyp resminamasyny berýär — her biri başga enjam açaryna baglanan on nusga.</li>
              <li>Iş beriji iki meýdan soraýar we takyk şol ikisini birnäçe sekuntda barlanan görnüşde alýar.</li>
              <li>Ýatyrylyş indiki kesgitli çap edilişde her barlaýja ýetýär; uniwersitetiň togtadylmagy täze resminama bermegi togtadýar, öňki diplomlar güýjünde galýar.</li>
              <li>Resminamanyň ekran suraty ret edilýär; başga telefonyň açary bilen hödürlenen nusga hem.</li>
              <li>Şahsyýet barlagy şahsyýet resminamasyny döredýär, ISO mdoc görnüşinde hem: ýaş barlagy diňe “18 ýaşdan uly”-ny alýar.</li>
              <li>Kampus turniketleri we çäre gapylary 60 sekuntlyk QR geçiş kartasyny kabul edýär; bilet bir gezek işleýär.</li>
              <li>Web saýt adamy gapjyk bilen hasaba alýar, soňra her gün passkey bilen içeri goýberýär.</li>
            </ul>
            <h2>Heniz gysga ýol bolanlar</h2>
            <p>
              Her gysga ýol ýazga alnandyr we pilotdan öň ýapylýar: talyp
              ýazgylary nusgadyr, açarlar telefonyň howpsuz çipinde däl-de programmada durýar, uniwersitetiň gol
              açaryny Tamga saklaýar, gapjyk üpjün edijisi programmanyň öz platforma beýanyny kabul etmeýär (her gapjyk programma derejesinde hasaplanýar; App Store we Google Play wersiýasy bilen App Attest / Play Integrity hökmany bolar)
              we ýeke operator bar. Web giriş hasaba duran pursaty saýtlaryň arasynda şol bir hasap
              bahasyny ulanýar; her saýt üçin lakam ýol kartasynda. <em>(Täzelenme, 2026-10-06: her saýt üçin lakam indi işleýär. Tor gapjyk üpjün edijisini işletmeýär: her gapjyk özüňkini işledýär (ADR-0042). Hakyky torda guramalaryň gol açaryny Tamga saklamaýar (Tamga ARF §3).)</em>
            </p>
            <h2>Näme üçin bulary aýdýarys</h2>
            <p>
              Sebäbi çäklerini gizleýän ynam infrastrukturasy ynamdar däl. ÝB arhitekturasy bilen
              ýanaşyk deňeşdirme — şol bir, köpri, meýilleşdirilen —{" "}
              <Link href="/learn/roles">rollar we adalgalar</Link> sahypasynda; meýilnama{" "}
              <Link href="/whitepaper">whitepaper</Link>-da.
            </p>
          </>
        ),
      },
    },
  },
];

const DEFAULT_LOCALE: Locale = "en";

function pick(post: Post, locale: string): LocalizedPost {
  return post.i18n[locale as Locale] ?? post.i18n.en;
}

export function getPostsMeta(locale: string): PostMeta[] {
  return POSTS.map((p) => {
    const l = pick(p, locale);
    return {
      slug: p.slug,
      date: p.date,
      title: l.title,
      description: l.description,
      tag: l.tag,
      readingTime: l.readingTime,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale: string) {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return undefined;
  const l = pick(post, locale);
  return { slug: post.slug, date: post.date, ...l };
}

export function allSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

const DATE_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  tr: "tr-TR",
  tk: "tk-TM",
};

export function formatDate(iso: string, locale: string): string {
  const tag = DATE_LOCALE[locale as Locale] ?? "en-GB";
  return new Date(iso).toLocaleDateString(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* Blog UI strings */
type BlogUi = {
  eyebrow: string;
  title: string;
  description: string;
  readMore: string;
  allPosts: string;
  footer: ReactNode;
};

const BLOG_UI: Record<Locale, BlogUi> = {
  en: {
    eyebrow: "Blog",
    title: "Writing",
    description:
      "Decisions, technology and vision behind Tamga Network — digital trust, identity and the Turkic world.",
    readMore: "Keep reading",
    allPosts: "All posts",
    footer: (
      <>
        Tamga Network — Digital Trust Infrastructure.{" "}
        <Link href="/learn" className="text-primary link-underline">
          Learn from scratch →
        </Link>
      </>
    ),
  },
  tr: {
    eyebrow: "Blog",
    title: "Yazılar",
    description:
      "Tamga Network’ün ardındaki kararlar, teknoloji ve vizyon — dijital güven, kimlik ve Türk dünyası.",
    readMore: "Okumaya devam et",
    allPosts: "Tüm yazılar",
    footer: (
      <>
        Tamga Network — Dijital Güven Altyapısı.{" "}
        <Link href="/learn" className="text-primary link-underline">
          Sıfırdan öğren →
        </Link>
      </>
    ),
  },
  tk: {
    eyebrow: "Blog",
    title: "Ýazgylar",
    description:
      "Tamga Network-yň aňyrsyndaky kararlar, tehnologiýa we garaýyş — sanly ynam, şahsyýet we türki dünýäsi.",
    readMore: "Okamagy dowam et",
    allPosts: "Ähli ýazgylar",
    footer: (
      <>
        Tamga Network — Sanly Ynam Infrastrukturasy.{" "}
        <Link href="/learn" className="text-primary link-underline">
          Başdan öwren →
        </Link>
      </>
    ),
  },
};

export function getBlogUi(locale: string): BlogUi {
  return BLOG_UI[locale as Locale] ?? BLOG_UI[DEFAULT_LOCALE];
}

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

/** A monospace diagram / formula block for use inside a post body. */
function Fig({ label, children }: { label?: string; children: string }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      {label && (
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
            {label}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.78rem] leading-relaxed text-foreground-muted">
        {children}
      </pre>
    </div>
  );
}

/* Diagrams / formulas are technical artifacts — kept in English across all locales. */
const DIAG = {
  split: `Tamga  =  who · mandate · eligibility · credential
   ↓  (proof of authorization)
Settlement rail  =  bank / CBDC / stablecoin  (existing, regulated)`,
  saltedHash: `for each claim c_i with random salt s_i:
    d_i = H( s_i || c_i )
issuer signs the set  D = { d_1, ..., d_n }

reveal claim i:  holder shows (s_i, c_i)
verify:          H(s_i||c_i) == d_i  AND  d_i in D  AND  Sig_issuer(D) ok`,
  predicate: `issuer signs commitment  C = Commit(birth_date, r)
holder proves in zero knowledge:
    exists (birth_date, r):  C = Commit(...)  AND  today - birth_date >= 18y
verifier learns ONLY the boolean  (range proof: Bulletproofs / BBS+)`,
  dkg: `DKG:    guardians jointly form  PK = g^x ,  x = x_1 + ... + x_n
        no party ever holds x;  guardian i keeps only share x_i
open:   t guardians publish partials  d_i = (g^r)^(x_i)
        combine (Lagrange in the exponent) -> open THIS ciphertext only
        the secret x is NEVER reassembled`,
  x509chain: `National Root CA   (fingerprint anchored on-chain, stateCode = "TR")
   +-- (optional Intermediate CA)
         +-- Institution certificate  (leaf, e.g. a university)

issuerId  = keccak256( stateCode || SHA-256(DER(cert)) )
on-chain  : Root CA anchors + issuer registry (public key, category, status)
off-chain : the credential itself — never on the chain`,
  onOffChain: `ON-CHAIN   (public, non-personal)     OFF-CHAIN (in the wallet)
  Root CA anchors                        the credential itself (SD-JWT)
  issuer public keys / category          personal claims
  revocation status (StatusList)         pairwise pseudonyms`,
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
              We publish <Link href="/docs/trust-lists">signed trust lists</Link> — the model the EU
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
              <Link href="/whitepaper">whitepaper v3.0</Link>.
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
              <Link href="/docs/trust-lists">İmzalı güven listeleri</Link> yayınlıyoruz — AB’nin kendi
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
              imkânsız kılmaz. Ayrıntı <Link href="/whitepaper">whitepaper v3.0</Link>’da.
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
              <Link href="/docs/trust-lists">Gol çekilen ynam sanawlaryny</Link> çap edýäris — ÝB-niň
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
              däl etmeýär. Jikme-jiklik <Link href="/whitepaper">whitepaper v3.0</Link>-da.
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
              Every shortcut is recorded in a public deviation log and closes before the pilot: the
              student records are samples, keys live in software rather than the phone’s secure chip, the
              university’s signing key is held by Tamga, the wallet provider does not accept the app’s own
              statement about its platform (every wallet counts as software-level; with the App Store and
              Google Play release, App Attest / Play Integrity become mandatory), and there is a single operator. The website sign-in still
              uses one account value across sites at sign-up; a per-site pseudonym is on the roadmap.
            </p>
            <h2>Why say all this</h2>
            <p>
              Because trust infrastructure that hides its limits is not trustworthy. The side-by-side
              with the EU architecture — same, bridged, planned — is in{" "}
              <Link href="/docs/eudi-comparison">Tamga and the EUDI architecture</Link>; the plan is in
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
              Her kestirme herkese açık bir sapma kütüğüne kayıtlıdır ve pilottan önce kapanır:
              öğrenci kayıtları örnektir, anahtarlar telefonun güvenli çipinde değil yazılımda durur,
              üniversitenin imza anahtarını Tamga tutar, cüzdan sağlayıcısı uygulamanın kendi platform
              beyanını kabul etmez (her cüzdan yazılım seviyesinde sayılır; App Store ve Google Play sürümüyle
              App Attest / Play Integrity zorunlu olur) ve tek bir operatör vardır. Web girişi kayıt anında siteler arasında aynı
              hesap değerini kullanır; site başına takma ad yol haritasındadır.
            </p>
            <h2>Bunları neden söylüyoruz</h2>
            <p>
              Çünkü sınırlarını saklayan bir güven altyapısı güvenilir değildir. AB mimarisiyle yan yana
              kıyas — aynı, köprü, planlı — <Link href="/docs/eudi-comparison">Tamga ve EUDI mimarisi</Link>{" "}
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
              Her gysga ýol açyk gyşarma sanawynda ýazylandyr we pilotdan öň ýapylýar: talyp
              ýazgylary nusgadyr, açarlar telefonyň howpsuz çipinde däl-de programmada durýar, uniwersitetiň gol
              açaryny Tamga saklaýar, gapjyk üpjün edijisi programmanyň öz platforma beýanyny kabul etmeýär (dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar)
              we ýeke operator bar. Web giriş hasaba duran pursaty saýtlaryň arasynda şol bir hasap
              bahasyny ulanýar; her saýt üçin lakam ýol kartasynda.
            </p>
            <h2>Näme üçin bulary aýdýarys</h2>
            <p>
              Sebäbi çäklerini gizleýän ynam infrastrukturasy ynamdar däl. ÝB arhitekturasy bilen
              ýanaşyk deňeşdirme — şol bir, köpri, meýilleşdirilen —{" "}
              <Link href="/docs/eudi-comparison">Tamga we EUDI arhitekturasy</Link> sahypasynda; meýilnama{" "}
              <Link href="/whitepaper">whitepaper</Link>-da.
            </p>
          </>
        ),
      },
    },
  },
  {
    slug: "roadmap-turkic-world",
    date: "2026-08-06",
    i18n: {
      en: {
        title: "The EBSI of the Turkic world: our roadmap",
        description:
          "How a layered trust infrastructure grows from a single money-free pilot in Türkiye into a Trust Mesh across the Turkic world.",
        tag: "Vision",
        readingTime: "7 min",
        body: (
          <>
            <p>
              Europe built its digital-trust future as two layers: an infrastructure
              layer (<strong>EBSI</strong>) and an application layer (the{" "}
              <strong>EUDI Wallet</strong>). Tamga Network mirrors exactly this model
              for Türkiye and the Turkic world:{" "}
              <strong>Tamga Network is the infrastructure</strong> and{" "}
              <strong>TamgaID is the wallet</strong> that opens onto it. We are not a
              competitor to EBSI — because we rest on the same open standards, we are
              designed to interoperate with it. The difference is sovereignty: data and
              governance stay in-country.
            </p>
            <h2>Why “layered” matters</h2>
            <p>
              A single monolithic product ages badly. By separating the sovereign
              network (the trust anchor), the open standards (VC, SD-JWT, X.509) and the
              applications (wallet and vertical platforms), each layer can evolve on its
              own. States join the network; institutions register issuers; developers
              build apps — without any layer waiting on another.
            </p>
            <h2>The phased plan</h2>
            <ul>
              <li><strong>Phase 0 — Foundations.</strong> A foundation runs the initial validators; the architecture already commits to handing them to states over time (progressive decentralization).</li>
              <li><strong>Phase 1 — Identity + logistics, money-free.</strong> The first pilot proves value without touching payments: verified diplomas, credentials, and last-mile delivery a customer confirms from their own wallet.</li>
              <li><strong>Phase 2 — Vertical platforms.</strong> Education, health and logistics run on the shared trust layer; institutions become full nodes.</li>
              <li><strong>Phase 3 — Turkic world.</strong> States join as equal validators; cross-recognition turns a diploma issued in one country into a credential verifiable in another.</li>
            </ul>
            <p>
              In the long run this vision takes shape as a <strong>Trust Mesh</strong>:
              not one central authority, but a mesh of interoperable, independent
              networks. Read the full picture in the{" "}
              <Link href="/whitepaper">whitepaper</Link> or explore the{" "}
              <Link href="/scenarios">scenarios</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Türk dünyasının EBSI’si: yol haritamız",
        description:
          "Katmanlı bir güven altyapısı, Türkiye’deki parasız tek bir pilottan Türk dünyasına yayılan bir Trust Mesh’e nasıl büyür.",
        tag: "Vizyon",
        readingTime: "7 dk",
        body: (
          <>
            <p>
              Avrupa dijital güven geleceğini iki katman olarak kurdu: bir altyapı
              katmanı (<strong>EBSI</strong>) ve bir uygulama katmanı (
              <strong>EUDI Wallet</strong>). Tamga Network bu modelin Türkiye ve Türk
              dünyası için tam karşılığıdır:{" "}
              <strong>Tamga Network altyapıdır</strong>,{" "}
              <strong>TamgaID ise ona açılan cüzdandır</strong>. EBSI ile rakip değiliz
              — aynı açık standartlara dayandığımız için onunla birlikte çalışacak
              şekilde tasarlandık. Fark egemenliktir: veri ve yönetişim yurt içinde
              kalır.
            </p>
            <h2>“Katmanlı” olmak neden önemli</h2>
            <p>
              Tek parça bir ürün kötü yaşlanır. Egemen ağı (güven çıpası), açık
              standartları (VC, SD-JWT, X.509) ve uygulamaları (cüzdan + dikey
              platformlar) ayırarak her katman kendi başına gelişebilir. Devletler ağa
              katılır; kurumlar issuer kaydolur; geliştiriciler uygulama kurar — hiçbir
              katman diğerini beklemeden.
            </p>
            <h2>Aşamalı plan</h2>
            <ul>
              <li><strong>Faz 0 — Temeller.</strong> Başlangıç validator’larını bir vakıf çalıştırır; mimari, bunları zamanla devletlere devretmeyi baştan taahhüt eder (kademeli ademi merkeziyet).</li>
              <li><strong>Faz 1 — Kimlik + lojistik, parasız.</strong> İlk pilot, ödemeye hiç dokunmadan değer üretir: doğrulanmış diplomalar, credential’lar ve müşterinin kendi cüzdanıyla onayladığı son teslimat.</li>
              <li><strong>Faz 2 — Dikey platformlar.</strong> Eğitim, sağlık ve lojistik aynı güven katmanında çalışır; kurumlar full node olur.</li>
              <li><strong>Faz 3 — Türk dünyası.</strong> Devletler eşit validator olarak katılır; cross-recognition, bir ülkede verilen diplomayı başka ülkede doğrulanabilir bir belgeye çevirir.</li>
            </ul>
            <p>
              Uzun vadede bu vizyon bir <strong>Trust Mesh</strong> olarak somutlaşır:
              tek merkez değil, birlikte çalışabilir, bağımsız ağlardan oluşan bir örgü.
              Tüm resmi <Link href="/whitepaper">whitepaper</Link>’da okuyabilir ya da{" "}
              <Link href="/scenarios">senaryolara</Link> göz atabilirsiniz.
            </p>
          </>
        ),
      },
      tk: {
        title: "Türki dünýäsiniň EBSI-si: ýol kartamyz",
        description:
          "Gatlakly ynam infrastrukturasy Türkiýedäki pulsuz bir pilotdan türki dünýäsine ýaýraýan Trust Mesh-e nähili ösýär.",
        tag: "Garaýyş",
        readingTime: "7 min",
        body: (
          <>
            <p>
              Ýewropa sanly ynam geljegini iki gatlak hökmünde gurdy: infrastruktura
              gatlagy (<strong>EBSI</strong>) we programma gatlagy (
              <strong>EUDI Wallet</strong>). Tamga Network bu modeliň Türkiýe we türki
              dünýäsi üçin edil garşylygydyr:{" "}
              <strong>Tamga Network infrastrukturadyr</strong>,{" "}
              <strong>TamgaID bolsa oňa açylýan gapjykdyr</strong>. EBSI bilen bäsdeş
              däl — şol bir açyk standartlara daýanýandygymyz üçin onuň bilen bilelikde
              işlemäge niýetlenendir. Tapawut özygtyýarlylykdyr: maglumat we dolandyryş
              ýurt içinde galýar.
            </p>
            <h2>“Gatlakly” bolmak näme üçin möhüm</h2>
            <p>
              Bir bitewi önüm erbet garraýar. Özygtyýarly tory (ynam çyzygy), açyk
              standartlary (VC, SD-JWT, X.509) we programmalary (gapjyk + dik
              platformalar) aýryp, her gatlak öz-özünden ösüp bilýär. Döwletler tora
              goşulýar; guramalar issuer hasaba alýar; işläp düzüjiler programma gurýar —
              hiç bir gatlak beýlekisine garaşman.
            </p>
            <h2>Tapgyrlaýyn meýilnama</h2>
            <ul>
              <li><strong>Faza 0 — Binýatlar.</strong> Başlangyç validatorlary bir gaznanyň işledýär; arhitektura olary wagtyň geçmegi bilen döwletlere geçirmegi öňünden borç edinýär.</li>
              <li><strong>Faza 1 — Şahsyýet + logistika, pulsuz.</strong> Ilkinji pilot tölege degmän gymmat öndürýär: barlanan diplomlar, credential-lar we müşderiniň öz gapjygy bilen tassyklaýan soňky eltip berişi.</li>
              <li><strong>Faza 2 — Dik platformalar.</strong> Bilim, saglyk we logistika şol bir ynam gatlagynda işleýär; guramalar doly node bolýar.</li>
              <li><strong>Faza 3 — Türki dünýäsi.</strong> Döwletler deň validator hökmünde goşulýar; cross-recognition bir ýurtda berlen diplomy başga ýurtda barlanýan resminama öwürýär.</li>
            </ul>
            <p>
              Uzak möhletde bu garaýyş <strong>Trust Mesh</strong> hökmünde göwrümlenýär:
              bir merkez däl, bilelikde işleýän garaşsyz torlaryň örümi. Doly suraty{" "}
              <Link href="/whitepaper">whitepaper</Link>-de okap ýa-da{" "}
              <Link href="/scenarios">ssenariýalara</Link> göz aýlap bilersiňiz.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "authorization-not-settlement",
    date: "2026-08-05",
    i18n: {
      en: {
        title: "The value layer: authorization, not settlement",
        description:
          "Tamga does not issue a currency. It authorizes value movement while banks and CBDCs do the settling — and that is a deliberate design choice.",
        tag: "Architecture",
        readingTime: "7 min",
        body: (
          <>
            <p>
              A payment is really two things: <strong>authorization</strong> (“is this
              party allowed, verified, within limits, not sanctioned?”) and{" "}
              <strong>settlement</strong> (money actually changing hands). Tamga’s
              natural strength is authorization. Settlement belongs to banks, central
              banks and licensed institutions — and stepping into it would bring
              central-bank conflict, multi-jurisdiction licensing and a censorship
              problem.
            </p>
            <Fig label="the split">{DIAG.split}</Fig>
            <p>
              This is not “stay out of value forever.” It is “build the hooks, not the
              feature.” Five architectural decisions taken today keep the door open at
              near-zero cost, while remaining impossible to retrofit later:
            </p>
            <ul>
              <li><strong>Smart-contract wallets</strong> from day one (not plain key-addresses).</li>
              <li><strong>Separated keys</strong> — identity, asset and agent keys never mix.</li>
              <li><strong>Scope-generic delegation</strong> — ready for <code>pay:*</code> later.</li>
              <li><strong>Credential-gating</strong> as a reusable primitive.</li>
              <li><strong>No native token</strong>, but permissioned token issuance stays possible.</li>
            </ul>
            <h2>Agents change the picture</h2>
            <p>
              AI agents will transact on our behalf. An agent has no identity of its own
              — only a bounded, revocable delegation from a <strong>state-verified</strong>{" "}
              principal, with per-transaction caps and an instant kill switch. “This
              agent’s responsible party is a real person verified by their state” is a
              guarantee no commercial platform can match. The full reasoning is in the{" "}
              <Link href="/docs/tamga-id">TamgaID docs</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Değer katmanı: yetkilendirme, mutabakat değil",
        description:
          "Tamga para birimi çıkarmaz. Değer hareketini yetkilendirir; mutabakatı bankalar ve CBDC’ler yapar — ve bu bilinçli bir tasarım kararıdır.",
        tag: "Mimari",
        readingTime: "7 dk",
        body: (
          <>
            <p>
              Bir ödeme aslında iki şeydir: <strong>yetkilendirme</strong> (“bu taraf
              yetkili mi, doğrulanmış mı, limit içinde mi, yaptırımda mı?”) ve{" "}
              <strong>mutabakat</strong> (paranın fiilen el değiştirmesi). Tamga’nın
              doğal gücü yetkilendirmededir. Mutabakat bankaların, merkez bankalarının
              ve lisanslı kurumların işidir — oraya girmek merkez-bankası çatışması,
              çok-yargı-alanı lisansı ve bir sansür problemi getirir.
            </p>
            <Fig label="the split">{DIAG.split}</Fig>
            <p>
              Bu “değere hiç girme” değildir. “Özelliği değil, kancaları inşa et”
              demektir. Bugün alınan beş mimari karar, kapıyı neredeyse sıfır maliyetle
              açık tutar; sonradan eklenmesi ise imkânsızdır:
            </p>
            <ul>
              <li>İlk günden <strong>smart-contract cüzdanları</strong> (düz anahtar-adres değil).</li>
              <li><strong>Ayrık anahtarlar</strong> — identity, asset ve agent anahtarları asla karışmaz.</li>
              <li><strong>Scope-generic delegation</strong> — ileride <code>pay:*</code> için hazır.</li>
              <li><strong>Credential-gating</strong> yeniden kullanılabilir bir primitif olarak.</li>
              <li><strong>Kendi token yok</strong>, ama izinli token ihracı mümkün kalır.</li>
            </ul>
            <h2>Ajanlar resmi değiştiriyor</h2>
            <p>
              AI ajanları bizim adımıza işlem yapacak. Ajanın kendi kimliği yoktur —
              yalnızca <strong>devletçe doğrulanmış</strong> bir veliden gelen sınırlı,
              iptal edilebilir bir yetki; işlem başına tavan ve anında bir kill switch
              ile. “Bu ajanın sorumlusu, devletinin doğruladığı gerçek bir kişidir”
              güvencesini hiçbir ticari platform veremez. Tüm gerekçe{" "}
              <Link href="/docs/tamga-id">TamgaID dokümanında</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "Baha gatlagy: ygtyýarlandyrma, hasaplaşyk däl",
        description:
          "Tamga pul birligini çykarmaýar. Baha hereketini ygtyýarlandyrýar; hasaplaşygy banklar we CBDC-ler edýär — bu bolsa bilkastdan saýlanan dizaýn kararydyr.",
        tag: "Arhitektura",
        readingTime: "7 min",
        body: (
          <>
            <p>
              Töleg aslynda iki zatdyr: <strong>ygtyýarlandyrma</strong> (“bu tarap
              ygtyýarlymy, barlananmy, çäk içindemi, sanksiýadamy?”) we{" "}
              <strong>hasaplaşyk</strong> (puluň hakykatdan el çalyşmagy). Tamga-nyň
              tebigy güýji ygtyýarlandyrmada. Hasaplaşyk banklaryň, merkezi banklaryň we
              ygtyýarly guramalaryň işidir — oňa girmek merkezi-bank çaknyşygyny, köp-
              ýurisdiksiýa ygtyýarnamasyny we sensura meselesini getirýär.
            </p>
            <Fig label="the split">{DIAG.split}</Fig>
            <p>
              Bu “baha asla girme” däl. “Aýratynlygy däl, ilmekleri gur” diýmekdir. Şu
              gün alnan bäş arhitektura karary gapyny takmynan nol çykdajy bilen açyk
              saklaýar; soňra goşmak bolsa mümkin däl:
            </p>
            <ul>
              <li>Ilkinji günden <strong>smart-contract gapjyklary</strong> (düz açar-salgy däl).</li>
              <li><strong>Aýrylan açarlar</strong> — identity, asset we agent açarlary asla garyşmaýar.</li>
              <li><strong>Scope-generic delegation</strong> — geljekde <code>pay:*</code> üçin taýýar.</li>
              <li><strong>Credential-gating</strong> gaýtadan ulanylýan primitiw hökmünde.</li>
              <li><strong>Öz token ýok</strong>, ýöne rugsatly token çykaryş mümkin galýar.</li>
            </ul>
            <h2>Agentler suraty üýtgedýär</h2>
            <p>
              AI agentleri biziň adymyzdan amal eder. Agentiň öz şahsyýeti ýok —
              diňe <strong>döwletçe barlanan</strong> bir eýeden çäkli, ýatyrylýan
              ygtyýar; amal başyna çäk we dessine kill switch bilen. “Bu agentiň
              jogapkäri, döwletiniň barlan hakyky adamydyr” diýen kepili hiç bir söwda
              platformasy berip bilmeýär. Doly delil{" "}
              <Link href="/docs/tamga-id">TamgaID resminamasynda</Link>.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "selective-disclosure-zk",
    date: "2026-08-04",
    i18n: {
      en: {
        title: "Selective disclosure and zero-knowledge: show the fact, not the data",
        description:
          "Prove you are over 18 without revealing your birth date. The mathematics behind sharing less while proving more.",
        tag: "Technical",
        readingTime: "6 min",
        body: (
          <>
            <p>
              The most powerful idea in modern digital identity is also the simplest to
              state: <strong>you should share only what a verifier needs, and nothing
              more.</strong> Two layers of cryptography make it real — selective
              disclosure and zero-knowledge proofs.
            </p>
            <h2>Selective disclosure (SD-JWT)</h2>
            <p>
              A credential is a set of claims. Instead of signing the raw values, the
              issuer signs a set of <strong>salted hashes</strong> of them. To reveal a
              claim, the holder discloses its salt and value; the verifier recomputes the
              hash and checks it against the signed set. Undisclosed claims reveal nothing
              — the salt makes them non-invertible.
            </p>
            <Fig label="salted-hash disclosure">{DIAG.saltedHash}</Fig>
            <h2>Zero-knowledge: a fact without the value</h2>
            <p>
              Selective disclosure still shows a revealed field in full. Zero-knowledge
              proofs go further: you prove a <strong>predicate</strong> over a hidden
              value. The classic example — proving “age ≥ 18” without disclosing the
              birth date — becomes a range proof over a signed commitment. The verifier
              learns only a boolean.
            </p>
            <Fig label="predicate proof">{DIAG.predicate}</Fig>
            <p>
              With BBS+ signatures, presentations also become{" "}
              <strong>unlinkable</strong> — two verifiers cannot tell they saw the same
              person. These primitives are on our roadmap and enter as they mature and
              pass audit. More:{" "}
              <Link href="/docs/selective-disclosure">Selective disclosure and SD-JWT</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Seçici ifşa ve sıfır-bilgi: veriyi değil, olguyu göster",
        description:
          "Doğum tarihini vermeden 18 yaşından büyük olduğunu kanıtla. Daha az paylaşıp daha çok kanıtlamanın matematiği.",
        tag: "Teknik",
        readingTime: "6 dk",
        body: (
          <>
            <p>
              Modern dijital kimliğin en güçlü fikri aynı zamanda en yalın ifade
              edilenidir: <strong>bir doğrulayıcıya yalnızca ihtiyacı olanı ver,
              fazlasını değil.</strong> İki kriptografi katmanı bunu gerçek kılar:
              selective disclosure ve zero-knowledge ispatları.
            </p>
            <h2>Selective disclosure (SD-JWT)</h2>
            <p>
              Bir credential, claim’ler kümesidir. Issuer, ham değerleri değil, onların{" "}
              <strong>salted hash</strong>’lerini imzalar. Bir claim’i açmak için holder,
              o claim’in tuzunu (salt) ve değerini gösterir; doğrulayıcı hash’i yeniden
              hesaplayıp imzalı kümeyle karşılaştırır. Açılmayan claim’ler hiçbir şey
              sızdırmaz — salt onları geri-çevrilemez kılar.
            </p>
            <Fig label="salted-hash disclosure">{DIAG.saltedHash}</Fig>
            <h2>Zero-knowledge: değersiz bir olgu</h2>
            <p>
              Selective disclosure yine de açılan alanı tam gösterir. Zero-knowledge
              ispatları bir adım öteye gider: gizli bir değer üzerinde bir{" "}
              <strong>predicate</strong> kanıtlarsın. Klasik örnek — doğum tarihini
              açmadan “yaş ≥ 18” kanıtlamak — imzalı bir commitment üzerinde bir range
              proof’a dönüşür. Doğrulayıcı yalnızca bir boolean öğrenir.
            </p>
            <Fig label="predicate proof">{DIAG.predicate}</Fig>
            <p>
              BBS+ imzalarıyla sunumlar aynı zamanda <strong>unlinkable</strong> hale
              gelir — iki doğrulayıcı aynı kişiyi gördüğünü anlayamaz. Bu primitifler yol
              haritamızda; olgunlaştıkça ve denetimden geçtikçe girer. Daha fazlası:{" "}
              <Link href="/docs/selective-disclosure">Seçici ifşa ve SD-JWT</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "Selective disclosure we zero-knowledge: bahany däl, hakykaty görkez",
        description:
          "Doglan senäni açman 18 ýaşdan uludygyňy subut et. Az paýlaşyp köp subut etmegiň matematikasy.",
        tag: "Tehniki",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Häzirki zaman sanly şahsyýetiň iň güýçli pikiri iň ýönekeý aýdylýanydyr:{" "}
              <strong>barlaýja diňe zerur zady ber, artygyny däl.</strong> Iki
              kriptografiýa gatlagy muny hakykata öwürýär: selective disclosure we
              zero-knowledge subutnamalary.
            </p>
            <h2>Selective disclosure (SD-JWT)</h2>
            <p>
              Credential — claim-leriň toplumydyr. Issuer, çig bahalary däl, olaryň{" "}
              <strong>salted hash</strong>-lerini imzalaýar. Bir claim-i açmak üçin
              holder onuň duzuny (salt) we bahasyny görkezýär; barlaýjy hash-i gaýtadan
              hasaplap imzalanan toplum bilen deňeşdirýär. Açylmadyk claim-ler hiç zat
              syzdyrmaýar — salt olary yzyna öwrülmez edýär.
            </p>
            <Fig label="salted-hash disclosure">{DIAG.saltedHash}</Fig>
            <h2>Zero-knowledge: bahasyz hakykat</h2>
            <p>
              Selective disclosure entek açylan meýdany doly görkezýär. Zero-knowledge
              subutnamalary bir ädim öňe gidýär: gizlin baha barada bir{" "}
              <strong>predicate</strong> subut edýärsiň. Nusga — doglan senäni açman
              “ýaş ≥ 18” subut etmek — imzalanan commitment üstünde range proof-a
              öwrülýär. Barlaýjy diňe bir boolean öwrenýär.
            </p>
            <Fig label="predicate proof">{DIAG.predicate}</Fig>
            <p>
              BBS+ imzalary bilen hödürlemeler hem <strong>unlinkable</strong> bolýar —
              iki barlaýjy şol bir adamy görendigini bilip bilmeýär. Bu primitiwler ýol
              kartamyzda; kämilleşdigiçe we barlagdan geçdigiçe girýär. Köpräk:{" "}
              <Link href="/docs/selective-disclosure">Saýlama açyklama we SD-JWT</Link>.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "accountable-disclosure",
    date: "2026-08-03",
    i18n: {
      en: {
        title: "Accountable disclosure: privacy without impunity",
        description:
          "Not even the state should be able to unmask an identity alone or without a trace. How threshold cryptography makes sovereign access accountable.",
        tag: "Technical",
        readingTime: "7 min",
        body: (
          <>
            <p>
              The hardest question in a state-grade identity system is not “how do we
              hide from the state.” The state can already see identity in the physical
              world. The real question is: how do we prevent{" "}
              <strong>any single actor — the state included — from unmasking a pseudonym
              alone and without a trace</strong>? We call the answer{" "}
              <em>accountable disclosure</em>.
            </p>
            <h2>A separate, encrypted escrow</h2>
            <p>
              In daily life a citizen acts through{" "}
              <Link href="/docs/identity-layers">pairwise pseudonyms</Link> — unlinkable
              across relationships. The mapping between a pseudonym and the root identity
              lives in a separate, <strong>encrypted escrow</strong>, protected by
              threshold cryptography. Crucially, the decryption key is{" "}
              <strong>never reconstructed</strong>.
            </p>
            <Fig label="(t,n) threshold ElGamal over DKG">{DIAG.dkg}</Fig>
            <h2>Who holds the shares</h2>
            <p>
              The guardians are an <strong>institutional set of five</strong> per state —
              judiciary, data-protection authority, civil-registry authority, ombudsman
              and a parliament-appointed member — with a <strong>3-of-5</strong> threshold
              and a rule that at least one approving seat must be{" "}
              <strong>non-executive</strong>. So the executive branch can never open an
              identity on its own. Opening requires a court token (an X.509-signed object,
              not paper) and leaves an immutable audit log.
            </p>
            <p>
              There is an <strong>emergency mode</strong> (2-of-5, with mandatory
              retroactive full-threshold confirmation within 48 hours, else auto-cancel
              and alarm), and cross-border cases use a{" "}
              <strong>“who / what” split key</strong>: your home state opens “who,” the
              state where the event happened opens “what,” and neither can assemble the
              full file alone. Details:{" "}
              <Link href="/docs/accountable-disclosure">Accountable disclosure</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Accountable disclosure: cezasızlık olmadan mahremiyet",
        description:
          "Devlet dahil hiçbir aktör bir kimliği tek başına ve izsiz açamamalı. Threshold kriptografisi egemen erişimi nasıl hesap verebilir kılar.",
        tag: "Teknik",
        readingTime: "7 dk",
        body: (
          <>
            <p>
              Devlet-ölçeğinde bir kimlik sisteminde en zor soru “devletten nasıl
              gizleniriz” değildir. Devlet zaten fiziksel dünyada kimliği görebilir. Asıl
              soru şudur: <strong>devlet dahil hiçbir aktörün bir pseudonym’i tek başına
              ve izsiz açamamasını</strong> nasıl sağlarız? Cevaba{" "}
              <em>accountable disclosure</em> (hesap verebilir ifşa) diyoruz.
            </p>
            <h2>Ayrı, şifreli bir escrow</h2>
            <p>
              Günlük hayatta vatandaş{" "}
              <Link href="/docs/identity-layers">pairwise pseudonym</Link>’lerle hareket
              eder — ilişkiler arası bağlanamaz. Bir pseudonym ile kök kimlik arasındaki
              eşleme ayrı, <strong>şifreli bir escrow</strong>’da tutulur ve threshold
              kriptografisiyle korunur. Kritik nokta: şifre çözme anahtarı{" "}
              <strong>asla yeniden kurulmaz</strong>.
            </p>
            <Fig label="(t,n) threshold ElGamal over DKG">{DIAG.dkg}</Fig>
            <h2>Payları kim tutar</h2>
            <p>
              Guardian’lar devlet başına <strong>kurumsal bir 5’lidir</strong> — yargı,
              veri-koruma otoritesi, nüfus/kimlik otoritesi, ombudsman ve
              parlamento-atamalı bir üye — <strong>3-of-5</strong> eşiğiyle ve en az bir
              onaylayan koltuğun <strong>non-executive (yürütme-dışı)</strong> olması
              kuralıyla. Böylece yürütme erki bir kimliği tek başına açamaz. Açma, bir
              court token (kâğıt değil, X.509 imzalı nesne) gerektirir ve değiştirilemez
              bir audit log bırakır.
            </p>
            <p>
              Bir <strong>emergency mode</strong> vardır (2-of-5, 48 saat içinde zorunlu
              geriye-dönük tam-eşik onayı; yoksa otomatik iptal ve alarm) ve sınır-ötesi
              vakalarda <strong>“who / what” split key</strong> kullanılır: tabiyet
              devletin “who”yu, olayın gerçekleştiği devlet “what”ı açar; hiçbiri tam
              dosyayı tek başına birleştiremez. Ayrıntı:{" "}
              <Link href="/docs/accountable-disclosure">Hesap verebilir ifşa</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "Accountable disclosure: jezasyzlyksyz gizlinlik",
        description:
          "Döwlet hem hiç bir aktýor şahsyýeti ýeke özi we yzsyz açyp bilmeli däl. Threshold kriptografiýa özygtyýarly elýeterliligi nähili hasabatly edýär.",
        tag: "Tehniki",
        readingTime: "7 min",
        body: (
          <>
            <p>
              Döwlet-derejeli şahsyýet ulgamynda iň kyn sowal “döwletden nähili
              gizlenýäris” däl. Döwlet eýýäm fiziki dünýäde şahsyýeti görüp bilýär. Hakyky
              sowal: <strong>döwlet hem hiç bir aktýoryň bir pseudonim-i ýeke özi we yzsyz
              açyp bilmezligini</strong> nähili üpjün edýäris? Jogaba{" "}
              <em>accountable disclosure</em> diýýäris.
            </p>
            <h2>Aýry, şifrlenen escrow</h2>
            <p>
              Gündelik durmuşda raýat{" "}
              <Link href="/docs/identity-layers">pairwise pseudonim</Link>-ler bilen
              hereket edýär — gatnaşyklaryň arasynda baglanmaýar. Pseudonim bilen kök
              şahsyýetiň arasyndaky baglanyşyk aýry, <strong>şifrlenen escrow</strong>-da
              saklanýar we threshold kriptografiýa bilen goralýar. Möhümi: şifr açar açary{" "}
              <strong>asla gaýtadan gurulmaýar</strong>.
            </p>
            <Fig label="(t,n) threshold ElGamal over DKG">{DIAG.dkg}</Fig>
            <h2>Paýlary kim saklaýar</h2>
            <p>
              Guardian-lar döwlet başyna <strong>kurumsal bäşlikdir</strong> — kazyýet,
              maglumat-goragy edarasy, ilat/şahsyýet edarasy, ombudsman we
              parlament-bellenen agza — <strong>3-of-5</strong> eşik bilen we azyndan bir
              tassyklaýan orunlyk <strong>non-executive</strong> bolmaly kadasy bilen.
              Şeýlelikde ýerine ýetiriji häkimiýet şahsyýeti ýeke özi açyp bilmeýär.
              Açmak court token (kagyz däl, X.509 gol çekilen) talap edýär we üýtgedip
              bolmajak audit log galdyrýar.
            </p>
            <p>
              Bir <strong>emergency mode</strong> bar (2-of-5, 48 sagadyň içinde hökmany
              yzyna doly-eşik tassyklamasy; bolmasa awtomatik ýatyrylýar we duýduryş
              berilýär) we serhetaşa işlerde <strong>“who / what” split key</strong>
              ulanylýar: tabyýet döwleti “who”-y, waka bolan döwlet “what”-y açýar;
              hiç biri doly dosýany ýeke özi birleşdirip bilmeýär. Jikme-jiklik:{" "}
              <Link href="/docs/accountable-disclosure">Hasabatly açyklama</Link>.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "sovereignty-first-governance",
    date: "2026-08-02",
    i18n: {
      en: {
        title: "Sovereignty-first governance: no state waits on another",
        description:
          "Why Türkiye should not need Kazakhstan’s vote to register a Turkish university — and how we enforce that in code.",
        tag: "Governance",
        readingTime: "6 min",
        body: (
          <>
            <p>
              A network shared by equal states needs a governance model that is
              deliberately narrow. If every action required a collective vote, the network
              would grind to a halt — and, worse, a state could be blocked from serving
              its own citizens. Our answer is <strong>sovereignty-first governance</strong>,
              split into three layers.
            </p>
            <ul>
              <li><strong>Network membership.</strong> Admitting a new state validator requires a <strong>2/3</strong> vote of validators. This is the only thing the whole network votes on.</li>
              <li><strong>National registries.</strong> A state registers or suspends its own issuers with <strong>no vote at all</strong> — enforced in code as <code>onlyOwnerState</code>. Türkiye does not wait for anyone to register a Turkish university.</li>
              <li><strong>Cross-border recognition.</strong> Each state <strong>unilaterally</strong> decides which foreign issuers and categories it recognizes. Founders recognize each other in full; later joiners start from none and opt in at their own pace.</li>
            </ul>
            <h2>Exit is a right, not a punishment</h2>
            <p>
              Removing or leaving the network <strong>never</strong> invalidates
              already-issued credentials. A citizen’s diploma does not evaporate because of
              a political dispute between states; the right to exit is guaranteed in code.
              This mirrors the EU’s List of Trusted Lists model — cooperation without
              surrendering sovereignty.
            </p>
            <p>
              The open question we are still working through is the concrete institutional
              mapping of governance bodies for each state — the subject of a dedicated
              governance document. Read the decision in{" "}
              <Link href="/docs/how-tamga-works">Architecture and Trust Graph</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Sovereignty-first governance: hiçbir devlet diğerini beklemez",
        description:
          "Türkiye bir Türk üniversitesini kaydetmek için neden Kazakistan’ın oyunu beklemesin — ve bunu kodda nasıl garanti ediyoruz.",
        tag: "Yönetişim",
        readingTime: "6 dk",
        body: (
          <>
            <p>
              Eşit devletlerin paylaştığı bir ağ, bilinçli olarak dar bir yönetişim
              modeli gerektirir. Her eylem ortak oy isteseydi ağ kilitlenirdi — daha
              kötüsü, bir devlet kendi vatandaşına hizmet etmekten alıkonabilirdi.
              Cevabımız üç katmana ayrılmış{" "}
              <strong>sovereignty-first governance</strong> (egemenlik-öncelikli
              yönetişim).
            </p>
            <ul>
              <li><strong>Ağa üyelik.</strong> Yeni bir devlet validator’ının kabulü validator’ların <strong>2/3</strong> oyunu gerektirir. Tüm ağın oyladığı tek şey budur.</li>
              <li><strong>Ulusal kayıtlar.</strong> Bir devlet kendi issuer’larını <strong>hiç oy olmadan</strong> kaydeder/askıya alır — kodda <code>onlyOwnerState</code>. Türkiye bir Türk üniversitesini kaydetmek için kimseyi beklemez.</li>
              <li><strong>Cross-border recognition.</strong> Her devlet hangi yabancı issuer’ları ve kategorileri tanıdığına <strong>tek taraflı</strong> karar verir. Kurucular birbirini tam tanır; sonradan katılanlar sıfırdan başlar ve kendi hızında açar.</li>
            </ul>
            <h2>Çıkış bir ceza değil, bir haktır</h2>
            <p>
              Ağdan çıkarma veya ayrılma, daha önce verilmiş credential’ları{" "}
              <strong>asla</strong> geçersiz kılmaz. Bir vatandaşın diploması, devletler
              arası siyasi bir anlaşmazlık yüzünden buharlaşmaz; çıkış hakkı kod
              garantilidir. Bu, AB’nin List of Trusted Lists modelini yansıtır —
              egemenlikten vazgeçmeden işbirliği.
            </p>
            <p>
              Hâlâ üzerinde çalıştığımız açık konu, her devlet için yönetişim organlarının
              somut kurumsal eşlemesidir — ayrı bir yönetişim dokümanının konusu. Kararı{" "}
              <Link href="/docs/how-tamga-works">Mimari ve Trust Graph</Link>’ta okuyun.
            </p>
          </>
        ),
      },
      tk: {
        title: "Sovereignty-first governance: hiç bir döwlet beýlekisine garaşmaýar",
        description:
          "Türkiýe türk uniwersitetini hasaba almak üçin näme üçin Gazagystanyň sesine garaşmaly däl — we muny kodda nähili kepillendirýäris.",
        tag: "Dolandyryş",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Deň döwletleriň paýlaşýan tory bilkastdan dar dolandyryş modelini talap
              edýär. Her hereket umumy ses talap etse tor doňardy — has erbedi, bir döwlet
              öz raýatyna hyzmat etmekden saklanyp bilnerdi. Jogabymyz üç gatlaga bölünen{" "}
              <strong>sovereignty-first governance</strong>.
            </p>
            <ul>
              <li><strong>Tora agzalyk.</strong> Täze döwlet validatorynyň kabuly validatorlaryň <strong>2/3</strong> sesini talap edýär. Tutuş toruň ses berýän ýeke zady şudur.</li>
              <li><strong>Milli hasaba alyşlar.</strong> Döwlet öz issuer-lerini <strong>ses bermezden</strong> hasaba alýar/togtadýar — kodda <code>onlyOwnerState</code>. Türkiýe türk uniwersitetini hasaba almak üçin hiç kime garaşmaýar.</li>
              <li><strong>Cross-border recognition.</strong> Her döwlet haýsy daşary issuer-leri we kategoriýalary ykrar edýändigini <strong>birtaraplaýyn</strong> çözýär. Esaslandyryjylar biri-birini doly ykrar edýär; soň goşulýanlar noldan başlaýar.</li>
            </ul>
            <h2>Çykyş jeza däl, hukukdyr</h2>
            <p>
              Tordan çykarmak ýa-da çykmak öň berlen credential-lary <strong>asla</strong>{" "}
              güýçden düşürmeýär. Raýatyň diplomy döwletara syýasy dawa sebäpli
              bugarmaýar; çykyş hukugy kodda kepillendirilýär. Bu ÝB-niň List of Trusted
              Lists modelini şöhlelendirýär — özygtyýarlylykdan geçmezden hyzmatdaşlyk.
            </p>
            <p>
              Entek üstünde işleýän açyk mesele, her döwlet üçin dolandyryş edaralarynyň
              anyk kurumsal eşlemesidir — aýratyn dolandyryş resminamasynyň mowzugy.
              Karary{" "}
              <Link href="/docs/how-tamga-works">Arhitektura we Trust Graph</Link>-da okaň.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "why-besu-qbft",
    date: "2026-08-01",
    i18n: {
      en: {
        title: "Why we build on Hyperledger Besu and QBFT",
        description:
          "The choice of blockchain engine is a one-way door. Here is why we picked a sovereign, permissioned EVM chain with states as validators.",
        tag: "Technical",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Choosing a blockchain engine is one of those decisions you only get to make
              once. After comparing frameworks, we accepted a clear architecture decision:
              the engine is <strong>Hyperledger Besu</strong> and the consensus is{" "}
              <strong>QBFT</strong>. Besu is an Apache-2.0 licensed Ethereum client that
              can run as a fully independent, permissioned private network — its own
              genesis, its own chain ID, connected to no public chain.
            </p>
            <h2>Three reasons</h2>
            <ul>
              <li><strong>A local EVM.</strong> A programmable execution layer means the future value scenarios (authorization, escrow triggers, tokenized deposits) are already possible — a capability, not a rebuild.</li>
              <li><strong>The same stack as EBSI.</strong> Europe’s trust infrastructure is built on Besu-family technology. Sharing the stack makes interoperability a design goal rather than an afterthought.</li>
              <li><strong>Single-chain simplicity + full sovereignty.</strong> No bridges, no dependency on an external mainnet, and — thanks to the open licence — no vendor lock-in.</li>
            </ul>
            <h2>States as validators</h2>
            <p>
              The design is deliberate: <strong>validators are states</strong> (equal
              vote) and <strong>full nodes are trusted institutions</strong>. QBFT
              comfortably handles the ~20-validator range a states-only consensus needs. A
              phased model lets a foundation run the validators at first and hand them to
              states over time — progressive decentralization with a committed, transparent
              path. We deliberately rejected writing our own chain from scratch: years of
              work and risk with no gain in sovereignty that Besu does not already give us.
            </p>
          </>
        ),
      },
      tr: {
        title: "Neden Hyperledger Besu ve QBFT üzerine kuruyoruz",
        description:
          "Blockchain motoru seçimi tek yönlü bir kapıdır. Egemen, izinli, devletlerin validator olduğu bir EVM zincirini neden seçtiğimiz.",
        tag: "Teknik",
        readingTime: "6 dk",
        body: (
          <>
            <p>
              Blockchain motoru seçimi, yalnızca bir kez verebileceğin kararlardandır.
              Framework’leri karşılaştırdıktan sonra net bir mimari kararı kabul ettik:
              motor <strong>Hyperledger Besu</strong>, consensus ise <strong>QBFT</strong>.
              Besu, tamamen bağımsız, izinli (permissioned) bir özel ağ olarak çalışabilen
              Apache-2.0 lisanslı bir Ethereum istemcisidir — kendi genesis’i, kendi chain
              ID’si, hiçbir açık zincire bağlı değil.
            </p>
            <h2>Üç gerekçe</h2>
            <ul>
              <li><strong>Yerel EVM.</strong> Programlanabilir bir yürütme katmanı, gelecekteki değer senaryolarını (yetkilendirme, escrow tetikleyicileri, tokenize mevduat) baştan mümkün kılar — bir yeniden-inşa değil, bir yetenek.</li>
              <li><strong>EBSI ile aynı stack.</strong> Avrupa’nın güven altyapısı Besu-ailesi teknolojisi üzerine kurulu. Aynı stack’i paylaşmak, birlikte-çalışabilirliği sonradan akla gelen değil, tasarım hedefi yapar.</li>
              <li><strong>Tek-zincir sadeliği + tam egemenlik.</strong> Köprü yok, dış bir mainnet’e bağımlılık yok ve — açık lisans sayesinde — vendor lock-in yok.</li>
            </ul>
            <h2>Validator olarak devletler</h2>
            <p>
              Tasarım bilinçlidir: <strong>validator’lar devletlerdir</strong> (eşit oy) ve{" "}
              <strong>full node’lar güvenilir kurumlardır</strong>. QBFT, yalnızca-devletler
              consensus’unun ihtiyaç duyduğu ~20 validator aralığını rahatça taşır. Fazlı
              model, başta bir vakfın validator’ları çalıştırıp zamanla devletlere
              devretmesini sağlar — taahhütlü, şeffaf bir yolla kademeli ademi merkeziyet.
              Sıfırdan kendi zincirimizi yazmayı bilinçli olarak reddettik: Besu’nun zaten
              verdiği egemenliğe hiçbir katkı sağlamadan yıllarca emek ve risk.
            </p>
          </>
        ),
      },
      tk: {
        title: "Näme üçin Hyperledger Besu we QBFT üstünde gurýarys",
        description:
          "Blokçeýn hereketlendirijisini saýlamak bir taraplaýyn gapydyr. Özygtyýarly, rugsatly, döwletleriň validator bolýan EVM zynjyryny näme üçin saýladyk.",
        tag: "Tehniki",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Blokçeýn hereketlendirijisini saýlamak diňe bir gezek berip biljek
              kararlaryňdan biridir. Framework-leri deňeşdirenimizden soň aýdyň bir
              arhitektura kararyny kabul etdik: hereketlendiriji{" "}
              <strong>Hyperledger Besu</strong>, consensus bolsa <strong>QBFT</strong>.
              Besu — doly garaşsyz, rugsatly (permissioned) hususy tor hökmünde işläp
              bilýän Apache-2.0 ygtyýarnamaly Ethereum client-idir — öz genesis-i, öz chain
              ID-si, hiç açyk zynjyra baglanmaýar.
            </p>
            <h2>Üç delil</h2>
            <ul>
              <li><strong>Ýerli EVM.</strong> Programmirlenip bilinýän ýerine ýetiriş gatlagy geljekki baha ssenariýalaryny (ygtyýarlandyrma, escrow triggerleri, tokenleşen goýumlar) öňünden mümkin edýär — gaýtadan gurmak däl, ukyp.</li>
              <li><strong>EBSI bilen şol bir stack.</strong> Ýewropanyň ynam infrastrukturasy Besu-maşgala tehnologiýasy üstünde gurlan. Şol bir stack-i paýlaşmak, bilelikde işlemegi dizaýn maksadyna öwürýär.</li>
              <li><strong>Bir zynjyrly ýönekeýlik + doly özygtyýarlylyk.</strong> Köpri ýok, daşarky mainnet-e garaşlylyk ýok we — açyk ygtyýarnama sebäpli — vendor lock-in ýok.</li>
            </ul>
            <h2>Validator hökmünde döwletler</h2>
            <p>
              Dizaýn bilkastdyr: <strong>validatorlar döwletlerdir</strong> (deň ses) we{" "}
              <strong>doly node-lar ynamly guramalardyr</strong>. QBFT, diňe-döwletler
              consensus-ynyň talap edýän ~20 validator aralygyny rahat göterýär. Tapgyrlaýyn
              model başda gaznanyň validatorlary işledip, wagtyň geçmegi bilen döwletlere
              geçirmegine mümkinçilik berýär. Nol-dan öz zynjyrymyzy ýazmagy bilkastdan ret
              etdik: Besu-nyň eýýäm berýän özygtyýarlylygyna hiç goşant goşman ýyllarça zähmet
              we töwekgelçilik.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "x509-institutional-identity",
    date: "2026-07-30",
    i18n: {
      en: {
        title: "X.509, not DID: how we identify institutions",
        description:
          "Institutions are identified with X.509 certificates anchored to national root authorities — regulator-readable by design. Citizens get no global identifier at all.",
        tag: "Technical",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Early on we identified institutions with a custom decentralized identifier.
              We changed course. Today, institutions — universities, ministries, hospitals,
              banks — are identified with <strong>X.509 certificates</strong>, the very
              standard the regulated world already uses (eIDAS qualified certificates,
              QWAC/QSeal).
            </p>
            <h2>Why X.509 for institutions</h2>
            <p>
              The counterparty in most institutional flows is already certified. “Verified
              by a qualified certificate” is a sentence that has a legal meaning; “verified
              by a DID” is not. When money and audits are involved, this
              regulator-readability is decisive. Each member state runs its own{" "}
              <strong>national Root CA</strong>, and Tamga anchors the root’s fingerprint
              on-chain.
            </p>
            <Fig label="trust chain">{DIAG.x509chain}</Fig>
            <h2>Citizens: no global identifier</h2>
            <p>
              A citizen gets <strong>no such certificate and no global identifier at
              all</strong>. Personal relationships use{" "}
              <strong>pairwise pseudonyms</strong> — a different, unlinkable pseudonym per
              relationship. A person’s education, health, logistics and payment traces
              cannot be strung onto a single thread. Chain accounts, meanwhile, are ordinary
              EVM addresses, kept separate from identity. The set of anchored roots and
              registered issuers is our <strong>Trusted List</strong> — the analogue of the
              EU’s List of Trusted Lists. More in{" "}
              <Link href="/docs/did-vc">Identifiers and credentials</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "DID değil X.509: kurumları nasıl tanımlıyoruz",
        description:
          "Kurumlar, ulusal kök otoritelere çıpalanan X.509 sertifikalarıyla tanımlanır — tasarım gereği düzenleyici-okunabilir. Vatandaşa ise hiç küresel kimlik verilmez.",
        tag: "Teknik",
        readingTime: "6 dk",
        body: (
          <>
            <p>
              Başlangıçta kurumları özel bir decentralized identifier (DID) ile
              tanımlıyorduk. Rotayı değiştirdik. Bugün kurumlar — üniversiteler,
              bakanlıklar, hastaneler, bankalar — <strong>X.509 sertifikalarıyla</strong>{" "}
              tanımlanır; bu, düzenlenmiş dünyanın zaten kullandığı standarttır (eIDAS
              qualified certificates, QWAC/QSeal).
            </p>
            <h2>Kurumlar için neden X.509</h2>
            <p>
              Çoğu kurumsal akışta karşı taraf zaten sertifikalıdır. “Nitelikli
              sertifikayla doğrulandı” cümlesinin mevzuatta karşılığı vardır; “DID ile
              doğrulandı” cümlesinin yoktur. Para ve denetim söz konusu olduğunda bu
              düzenleyici-okunabilirlik belirleyicidir. Her üye devlet kendi{" "}
              <strong>national Root CA</strong>’sını işletir; Tamga kökün fingerprint’ini
              zincire çıpalar.
            </p>
            <Fig label="trust chain">{DIAG.x509chain}</Fig>
            <h2>Vatandaş: küresel kimlik yok</h2>
            <p>
              Vatandaş <strong>böyle bir sertifika ve hiçbir küresel kimlik almaz</strong>.
              Kişisel ilişkiler <strong>pairwise pseudonym</strong> kullanır — her ilişkide
              farklı, birbirine bağlanamayan bir takma kimlik. Bir kişinin eğitim, sağlık,
              lojistik ve ödeme izleri tek bir ipe dizilemez. Zincir hesapları ise sıradan
              EVM adresleridir, kimlikten ayrı tutulur. Çıpalı kökler ve kayıtlı issuer’lar
              kümesi bizim <strong>Trusted List</strong>’imizdir — AB’nin List of Trusted
              Lists muadili. Daha fazlası:{" "}
              <Link href="/docs/did-vc">Tanımlayıcılar ve credential</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "DID däl X.509: guramalary nähili kesgitleýäris",
        description:
          "Guramalar milli kök edaralara çyzyklanan X.509 sertifikatlary bilen kesgitlenýär — dizaýn boýunça düzgünleşdiriji-okalýar. Raýata bolsa hiç global şahsyýet berilmeýär.",
        tag: "Tehniki",
        readingTime: "6 min",
        body: (
          <>
            <p>
              Başda guramalary ýörite decentralized identifier (DID) bilen kesgitleýärdik.
              Ugry üýtgetdik. Şu gün guramalar — uniwersitetler, ministrlikler,
              hassahanalar, banklar — <strong>X.509 sertifikatlary</strong> bilen
              kesgitlenýär; bu düzgünleşdirilen dünýäniň eýýäm ulanýan standartydyr (eIDAS
              qualified certificates, QWAC/QSeal).
            </p>
            <h2>Guramalar üçin näme üçin X.509</h2>
            <p>
              Köp kurumsal akymda garşy tarap eýýäm sertifikatlydyr. “Qualified certificate
              bilen barlandy” diýen sözlem kanunda garşylygy bar; “DID bilen barlandy” diýen
              sözlemiň ýok. Pul we barlag bar bolanda bu düzgünleşdiriji-okalýanlyk
              çözgütlidir. Her agza döwlet öz <strong>national Root CA</strong>-syny
              işledýär; Tamga köküň fingerprint-ini zynjyra çyzyklaýar.
            </p>
            <Fig label="trust chain">{DIAG.x509chain}</Fig>
            <h2>Raýat: global şahsyýet ýok</h2>
            <p>
              Raýat <strong>beýle sertifikat we hiç global şahsyýet almaýar</strong>. Şahsy
              gatnaşyklar <strong>pairwise pseudonim</strong> ulanýar — her gatnaşykda
              başga, baglanmaýan lakam. Adamyň bilim, saglyk, logistika we töleg yzlary
              ýeke-täk ýüpe düzülip bilmeýär. Zynjyr hasaplary bolsa adaty EVM salgylarydyr,
              şahsyýetden aýry saklanýar. Çyzyklanan kökler we hasaba alnan issuer-leriň
              toplumy biziň <strong>Trusted List</strong>-imizdir. Köpräk:{" "}
              <Link href="/docs/did-vc">DID we VC</Link>.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "introducing-tamga-network",
    date: "2026-07-25",
    i18n: {
      en: {
        title: "Introducing Tamga Network",
        description:
          "Why and how we are building the modern counterpart of the ancient seal: a shared, sovereign trust infrastructure.",
        tag: "Announcement",
        readingTime: "5 min",
        body: (
          <>
            <p>
              The most repeated yet least solved problem in the digital world is trust.
              Every bank, hospital and university re-verifies identity, authority and
              documents from scratch. <strong>Tamga Network</strong> was born to turn that
              repeated problem into a shared infrastructure — so trust becomes a service,
              like electricity or the internet, rather than something each application
              reinvents.
            </p>
            <p>
              Our name is no coincidence. <em>Tamga</em> was the ancient seal of the Turkic
              tribes — a mark that proved ownership, belonging and authority. A verifiable
              digital credential does exactly the same job today: a digital seal. A shared
              tradition of the seal is the strongest symbol of a shared digital trust
              network.
            </p>
            <h2>Four principles</h2>
            <ul>
              <li><strong>Identity first, transaction second.</strong> Every entity is represented by an identity before it acts.</li>
              <li><strong>Blockchain is a component, not the center.</strong> It holds only non-personal trust anchors; personal data never touches the chain.</li>
              <li><strong>Users don’t use blockchain.</strong> They use their digital identity; keys and fees are hidden.</li>
              <li><strong>Open standards are essential.</strong> X.509, W3C VC, SD-JWT — commitment to shared standards, not a vendor.</li>
            </ul>
            <h2>Why now?</h2>
            <p>
              The EU made the portable-proof model mandatory at continental scale with
              eIDAS 2.0. The question is no longer “will this transformation happen” but{" "}
              <strong>“who will be a producer in it.”</strong> We choose to be a producer
              for Türkiye and the Turkic world. Start with the{" "}
              <Link href="/docs">documentation</Link>, the{" "}
              <Link href="/manifesto">manifesto</Link>, or the{" "}
              <Link href="/whitepaper">whitepaper</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Tamga Network’ü tanıtıyoruz",
        description:
          "Kadim mührün çağdaş karşılığını neden ve nasıl inşa ettiğimiz: ortak, egemen bir güven altyapısı.",
        tag: "Duyuru",
        readingTime: "5 dk",
        body: (
          <>
            <p>
              Dijital dünyada en çok tekrarlanan ama en az çözülen problem güvendir. Her
              banka, hastane ve üniversite kimliği, yetkiyi ve belgeyi sıfırdan yeniden
              doğrular. <strong>Tamga Network</strong>, bu tekrarlanan problemi ortak bir
              altyapıya dönüştürmek için doğdu — böylece güven, her uygulamanın yeniden icat
              ettiği bir şey değil, elektrik ya da internet gibi bir hizmet olur.
            </p>
            <p>
              Adımız tesadüf değil. <em>Tamga</em>, Türk boylarının kadim mührüydü —
              mülkiyeti, aidiyeti ve yetkiyi doğrulayan işaret. Doğrulanabilir dijital belge
              bugün tam olarak aynı işi görür: dijital bir mühür. Ortak bir mühür geleneği,
              ortak bir dijital güven ağının en güçlü sembolüdür.
            </p>
            <h2>Dört ilke</h2>
            <ul>
              <li><strong>Önce kimlik, sonra işlem.</strong> Her varlık, hareket etmeden önce bir kimlikle temsil edilir.</li>
              <li><strong>Blockchain merkez değil, bileşendir.</strong> Yalnızca kişisel olmayan güven çıpalarını tutar; kişisel veri asla zincire dokunmaz.</li>
              <li><strong>Kullanıcı blockchain kullanmaz.</strong> Dijital kimliğini kullanır; anahtar ve ücretler gizlenir.</li>
              <li><strong>Açık standartlar esastır.</strong> X.509, W3C VC, SD-JWT — üreticiye değil ortak standartlara bağlılık.</li>
            </ul>
            <h2>Neden şimdi?</h2>
            <p>
              AB, taşınabilir-kanıt modelini eIDAS 2.0 ile kıtasal ölçekte zorunlu kıldı.
              Soru artık “bu dönüşüm olacak mı” değil,{" "}
              <strong>“bu dönüşümde kim üretici olacak.”</strong> Biz Türkiye ve Türk
              dünyası için üretici olmayı seçiyoruz.{" "}
              <Link href="/docs">Dokümanlar</Link>,{" "}
              <Link href="/manifesto">manifesto</Link> ya da{" "}
              <Link href="/whitepaper">whitepaper</Link> ile başlayın.
            </p>
          </>
        ),
      },
      tk: {
        title: "Tamga Network bilen tanyşdyrýarys",
        description:
          "Gadymy möhüriň häzirki zaman garşylygyny näme üçin we nähili gurýandygymyz: umumy, özygtyýarly ynam infrastrukturasy.",
        tag: "Bildiriş",
        readingTime: "5 min",
        body: (
          <>
            <p>
              Sanly dünýäde iň köp gaýtalanýan ýöne iň az çözülýän mesele ynamdyr. Her
              bank, hassahana we uniwersitet şahsyýeti, ygtyýary we resminamany nol-dan
              gaýtadan barlaýar. <strong>Tamga Network</strong>, bu gaýtalanýan meseläni
              umumy infrastruktura öwürmek üçin döredi — şeýlelikde ynam, her programmanyň
              gaýtadan oýlap tapýan zady däl, elektrik ýa-da internet ýaly hyzmat bolýar.
            </p>
            <p>
              Adymyz tötänlik däl. <em>Tamga</em> türki taýpalaryň gadymy möhüridi —
              eýeçiligi, degişliligi we ygtyýary tassyklaýan belgi. Barlanyp bilinýän sanly
              credential şu gün edil şol bir işi edýär: sanly möhür. Umumy möhür däbi, umumy
              sanly ynam torunyň iň güýçli nyşanydyr.
            </p>
            <h2>Dört ýörelge</h2>
            <ul>
              <li><strong>Ilki şahsyýet, soň amal.</strong> Her subýekt hereket etmezden ozal şahsyýet bilen görkezilýär.</li>
              <li><strong>Blokçeýn merkez däl, bölekdir.</strong> Diňe şahsy däl ynam çyzyklaryny saklaýar; şahsy maglumat asla zynjyra degmeýär.</li>
              <li><strong>Ulanyjy blokçeýn ulanmaýar.</strong> Sanly şahsyýetini ulanýar; açarlar we tölegler gizlenýär.</li>
              <li><strong>Açyk standartlar esasdyr.</strong> X.509, W3C VC, SD-JWT — öndürijä däl, umumy standartlara ygrarlylyk.</li>
            </ul>
            <h2>Näme üçin hut şu wagt?</h2>
            <p>
              ÝB göçme-subutnama modelini eIDAS 2.0 bilen yklym möçberinde hökmany etdi.
              Sowal indi “bu özgeriş boljakmy” däl,{" "}
              <strong>“bu özgerişde kim öndüriji bolar.”</strong> Biz Türkiýe we türki
              dünýäsi üçin öndüriji bolmagy saýlaýarys.{" "}
              <Link href="/docs">Resminamalar</Link>,{" "}
              <Link href="/manifesto">manifest</Link> ýa-da{" "}
              <Link href="/whitepaper">whitepaper</Link> bilen başlaň.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "why-eidas-2-matters",
    date: "2026-07-20",
    i18n: {
      en: {
        title: "Why eIDAS 2.0 concerns all of us",
        description:
          "What looks like a European regulation is actually setting the global standard for digital identity — and it forces a strategic choice.",
        tag: "Vision",
        readingTime: "5 min",
        body: (
          <>
            <p>
              At first glance <strong>eIDAS 2.0</strong> looks like just an EU regulation.
              Its impact is far broader: it sets a de-facto standard for how identity and
              trust are established in the digital world. The framework requires every
              member state to offer its citizens an <strong>EUDI Wallet</strong> — citizens
              carry identity, diplomas and health documents on their phone and share them{" "}
              <Link href="/docs/selective-disclosure">selectively</Link>.
            </p>
            <p>
              W3C Verifiable Credentials and SD-JWT are no longer academic concepts but
              applied, continent-scale requirements. When a standard reaches this scale, it
              stops being optional for everyone who wants to interoperate with that market.
            </p>
            <h2>The strategic choice</h2>
            <p>
              As the world moves to this model, a country has two paths: import the
              transformation from outside, or produce its own <strong>sovereign yet
              compatible</strong> infrastructure. The first path means depending on someone
              else’s roadmap, governance and data policies. The second means building the
              same standards on your own terms.
            </p>
            <p>
              Tamga Network chooses the second — compatible yet independent. We deliberately
              align with eIDAS/EUDI so that when regulation arrives, we are ready; and we
              keep the infrastructure sovereign so that data and governance stay in-country.
              Details: <Link href="/docs/eidas-eudi">eIDAS, EUDI and EBSI</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "eIDAS 2.0 neden hepimizi ilgilendiriyor?",
        description:
          "Bir Avrupa yönetmeliği gibi görünen eIDAS 2.0, aslında dijital kimliğin küresel standardını belirliyor — ve stratejik bir seçimi dayatıyor.",
        tag: "Vizyon",
        readingTime: "5 dk",
        body: (
          <>
            <p>
              <strong>eIDAS 2.0</strong> ilk bakışta yalnızca bir AB düzenlemesi gibi
              görünür. Etkisi çok daha geniştir: kimliğin ve güvenin dijital dünyada nasıl
              kurulacağına dair fiilî bir standart ortaya koyar. Çerçeve, her üye devletin
              vatandaşına bir <strong>EUDI Wallet</strong> sunmasını öngörür — vatandaş
              kimliğini, diplomasını ve sağlık belgelerini telefonunda taşır ve bunları{" "}
              <Link href="/docs/selective-disclosure">seçici biçimde</Link> paylaşır.
            </p>
            <p>
              W3C Verifiable Credentials ve SD-JWT artık akademik kavramlar değil, uygulanan,
              kıtasal ölçekte gereksinimlerdir. Bir standart bu ölçeğe ulaştığında, o pazarla
              birlikte çalışmak isteyen herkes için opsiyonel olmaktan çıkar.
            </p>
            <h2>Stratejik seçim</h2>
            <p>
              Dünya bu modele geçerken bir ülkenin iki yolu vardır: dönüşümü dışarıdan ithal
              etmek ya da kendi <strong>egemen ama uyumlu</strong> altyapısını üretmek. İlk
              yol, başkasının yol haritasına, yönetişimine ve veri politikalarına bağımlı
              olmak demektir. İkincisi, aynı standartları kendi şartlarınla kurmak demektir.
            </p>
            <p>
              Tamga Network ikinci yolu seçiyor — uyumlu ama bağımsız. eIDAS/EUDI’ye bilinçli
              olarak hizalanıyoruz ki regülasyon geldiğinde hazır olalım; ve altyapıyı egemen
              tutuyoruz ki veri ve yönetişim yurt içinde kalsın. Ayrıntılar:{" "}
              <Link href="/docs/eidas-eudi">eIDAS, EUDI ve EBSI</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "eIDAS 2.0 näme üçin hemmämize degişli?",
        description:
          "Ýewropa düzgünnamasy ýaly görünýän eIDAS 2.0, aslynda sanly şahsyýetiň global standartyny kesgitleýär — we strategik saýlawy talap edýär.",
        tag: "Garaýyş",
        readingTime: "5 min",
        body: (
          <>
            <p>
              <strong>eIDAS 2.0</strong> ilkinji seredişde diňe bir ÝB düzgünnamasy ýaly
              görünýär. Täsiri has giň: şahsyýetiň we ynamyň sanly dünýäde nähili
              guruljakdygy barada hakyky standart goýýar. Çarçuwa her agza döwletiň raýatyna
              bir <strong>EUDI Wallet</strong> hödürlemegini talap edýär — raýat şahsyýetini,
              diplomyny we saglyk resminamalaryny telefonynda göterýär we olary{" "}
              <Link href="/docs/selective-disclosure">saýlama görnüşde</Link> paýlaşýar.
            </p>
            <p>
              W3C Verifiable Credentials we SD-JWT indi akademiki düşünjeler däl, ulanylýan,
              yklym möçberinde talaplardyr. Standart bu möçbere ýetende, ol bazar bilen
              bilelikde işlemek isleýän her kes üçin islege bagly bolmagyny bes edýär.
            </p>
            <h2>Strategik saýlaw</h2>
            <p>
              Dünýä bu modele geçende ýurduň iki ýoly bar: özgerişi daşardan getirmek ýa-da
              öz <strong>özygtyýarly ýöne laýyk</strong> infrastrukturasyny öndürmek. Birinji
              ýol başga biriniň ýol kartasyna, dolandyryşyna we maglumat syýasatyna garaşly
              bolmak diýmekdir. Ikinjisi şol bir standartlary öz şertleriňde gurmak.
            </p>
            <p>
              Tamga Network ikinji ýoly saýlaýar — laýyk ýöne garaşsyz. eIDAS/EUDI-ä bilkastdan
              gabat gelýäris, düzgünnama gelende taýýar bolar ýaly; we infrastrukturany
              özygtyýarly saklaýarys, maglumat we dolandyryş ýurt içinde galar ýaly.
              Jikme-jiklik: <Link href="/docs/eidas-eudi">eIDAS, EUDI we EBSI</Link>.
            </p>
          </>
        ),
      },
    },
  },

  {
    slug: "why-no-personal-data-on-chain",
    date: "2026-07-10",
    i18n: {
      en: {
        title: "Why we don’t write personal data to the blockchain",
        description:
          "Blockchain is immutable; data-protection law grants a right to erasure. We reconcile the two by never putting personal data — not even its hash — on the chain.",
        tag: "Technical",
        readingTime: "5 min",
        body: (
          <>
            <p>
              Blockchain often brings to mind “writing everything to the chain.” In Tamga
              Network the opposite is true:{" "}
              <strong>personal data is never written to the chain.</strong> This is not a
              limitation we tolerate — it is a foundational rule.
            </p>
            <p>
              The reason is simple but important: a blockchain is immutable, while
              data-protection law (GDPR/KVKK) grants individuals a{" "}
              <strong>right to erasure</strong>. Putting personal data on an immutable
              ledger conflicts directly with that right. Even an encrypted hash of the data
              is risky, because a hash can be correlated across contexts and used to
              re-identify a person.
            </p>
            <h2>So what is the chain for?</h2>
            <p>
              The chain holds only <strong>non-personal trust data</strong>: which
              institution is authorized to issue credentials, its public key, its
              accreditation and revocation status, schema records. The document itself — the
              diploma, the prescription, the bill of lading — stays in the holder’s wallet.
            </p>
            <Fig label="on-chain / off-chain">{DIAG.onOffChain}</Fig>
            <p>
              A verifier checks a credential with three free, public read queries — is the
              issuer valid, is it recognized, is it revoked — without ever contacting the
              issuer and without any personal data being on the chain. Details:{" "}
              <Link href="/docs/how-tamga-works">Architecture and Trust Graph</Link>.
            </p>
          </>
        ),
      },
      tr: {
        title: "Neden kişisel veriyi blockchain’e yazmıyoruz?",
        description:
          "Blockchain değiştirilemez; KVKK ise silinme hakkı verir. İkisini, kişisel veriyi — hash’ini bile — asla zincire koymayarak bağdaştırıyoruz.",
        tag: "Teknik",
        readingTime: "5 dk",
        body: (
          <>
            <p>
              Blockchain denince akla “her şeyi zincire yazmak” gelir. Tamga Network’te durum
              tam tersidir: <strong>kişisel veri asla zincire yazılmaz.</strong> Bu,
              katlandığımız bir kısıt değil — temel bir kuraldır.
            </p>
            <p>
              Nedeni basit ama önemli: blockchain değiştirilemez, KVKK/GDPR ise bireye{" "}
              <strong>silinme hakkı</strong> verir. Değiştirilemeyen bir deftere kişisel veri
              koymak bu hakla doğrudan çelişir. Hatta verinin hash’i bile risklidir; çünkü bir
              hash, bağlamlar arasında ilişkilendirilip kişiyi yeniden tanımlamak için
              kullanılabilir.
            </p>
            <h2>Peki zincir ne işe yarıyor?</h2>
            <p>
              Zincir yalnızca <strong>kişisel olmayan güven verisini</strong> tutar: hangi
              kurumun belge vermeye yetkili olduğu, public key’i, akreditasyon ve revocation
              durumu, şema kayıtları. Belgenin kendisi — diploma, reçete, konşimento —
              holder’ın cüzdanında durur.
            </p>
            <Fig label="on-chain / off-chain">{DIAG.onOffChain}</Fig>
            <p>
              Bir doğrulayıcı, bir credential’ı üç ücretsiz, herkese açık okuma sorgusuyla
              kontrol eder — issuer geçerli mi, tanınıyor mu, revoke mu — issuer’a hiç
              ulaşmadan ve zincirde hiçbir kişisel veri olmadan. Ayrıntılar:{" "}
              <Link href="/docs/how-tamga-works">Mimari ve Trust Graph</Link>.
            </p>
          </>
        ),
      },
      tk: {
        title: "Näme üçin şahsy maglumaty blokçeýne ýazmaýarys?",
        description:
          "Blokçeýn üýtgedip bolmaýar; maglumat goragy kanuny pozmak hukugyny berýär. Şahsy maglumaty — hash-ini hem — asla zynjyra goýman ikisini sazlaşdyrýarys.",
        tag: "Tehniki",
        readingTime: "5 min",
        body: (
          <>
            <p>
              Blokçeýn diýlende köplenç “ähli zady zynjyra ýazmak” göz öňüne gelýär. Tamga
              Network-de ýagdaý tersine: <strong>şahsy maglumat asla zynjyra ýazylmaýar.</strong>{" "}
              Bu, çydaýan çäklendirmämiz däl — düýpli kadadyr.
            </p>
            <p>
              Sebäbi ýönekeý ýöne möhüm: blokçeýn üýtgedip bolmaýar, maglumat goragy kanuny
              (GDPR/KVKK) bolsa şahsa <strong>pozmak hukugyny</strong> berýär. Üýtgedip
              bolmaýan defter-e şahsy maglumat goýmak bu hukuga göni garşy gelýär. Hatda
              maglumatyň hash-i hem howplydyr; sebäbi hash kontekstleriň arasynda
              baglanyşdyrylyp adamy gaýtadan kesgitlemek üçin ulanylyp bilner.
            </p>
            <h2>Onda zynjyr näme üçin gerek?</h2>
            <p>
              Zynjyr diňe <strong>şahsy däl ynam maglumatyny</strong> saklaýar: haýsy
              guramanyň credential bermäge ygtyýarlydygyny, public key-ini, akkreditasiýa we
              revocation ýagdaýyny, shema ýazgylaryny. Resminamanyň özi — diplom, recet,
              konşimento — holder-yň gapjygynda galýar.
            </p>
            <Fig label="on-chain / off-chain">{DIAG.onOffChain}</Fig>
            <p>
              Barlaýjy credential-y üç mugt, açyk okaýyş soragy bilen barlaýar — issuer
              güýçlümi, ykrar edilýärmi, revoke edilenmi — issuer-e ýüz tutman we zynjyrda
              hiç şahsy maglumat bolman. Jikme-jiklik:{" "}
              <Link href="/docs/how-tamga-works">Arhitektura we Trust Graph</Link>.
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

/** 2026-09-24 kararlarından (Faz B, ADR-0009/0010) önce yazılmış mı. */
export const DESIGN_CUTOFF = "2026-09-24";
export const isEarlierDesign = (date: string) => date < DESIGN_CUTOFF;

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
  earlierDesign: ReactNode;
};

const BLOG_UI: Record<Locale, BlogUi> = {
  en: {
    eyebrow: "Blog",
    title: "Writing",
    description:
      "Decisions, technology and vision behind Tamga Network — digital trust, identity and the Turkic world.",
    readMore: "Keep reading",
    allPosts: "All posts",
    earlierDesign: (
      <>
        Written before the decisions of 24 September 2026. Parts of this post describe an earlier
        design — for example a blockchain as today’s trust anchor, or W3C formats. The current
        architecture is in the <Link href="/whitepaper">whitepaper v3.0</Link> and the{" "}
        <Link href="/docs/how-tamga-works">documentation</Link>.
      </>
    ),
    footer: (
      <>
        Tamga Network — Digital Trust Infrastructure.{" "}
        <Link href="/docs" className="text-primary link-underline">
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
    earlierDesign: (
      <>
        24 Eylül 2026 kararlarından önce yazıldı. Bu yazının bazı kısımları önceki bir tasarımı
        anlatır — örneğin bugünün güven çapası olarak blockchain ya da W3C biçimleri. Güncel mimari{" "}
        <Link href="/whitepaper">whitepaper v3.0</Link>’da ve{" "}
        <Link href="/docs/how-tamga-works">belgelerde</Link>.
      </>
    ),
    footer: (
      <>
        Tamga Network — Dijital Güven Altyapısı.{" "}
        <Link href="/docs" className="text-primary link-underline">
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
    earlierDesign: (
      <>
        2026-njy ýylyň 24-nji sentýabryndaky kararlardan öň ýazyldy. Bu ýazgynyň käbir bölekleri
        öňki dizaýny beýan edýär — meselem, häzirki ynam labyry hökmünde blokçeýn ýa-da W3C
        görnüşleri. Häzirki arhitektura <Link href="/whitepaper">whitepaper v3.0</Link>-da we{" "}
        <Link href="/docs/how-tamga-works">resminamalarda</Link>.
      </>
    ),
    footer: (
      <>
        Tamga Network — Sanly Ynam Infrastrukturasy.{" "}
        <Link href="/docs" className="text-primary link-underline">
          Başdan öwren →
        </Link>
      </>
    ),
  },
};

export function getBlogUi(locale: string): BlogUi {
  return BLOG_UI[locale as Locale] ?? BLOG_UI[DEFAULT_LOCALE];
}

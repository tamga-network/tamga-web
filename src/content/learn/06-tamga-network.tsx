import type { LearnPage } from "./types";
import { Callout, Figure, Term } from "@/components/learn/prose";

/* Bölüm 6 — Tamga Network: ağın ne olduğu, neden Türk dünyası, roller, katmanlar, kurallar, yönetişim, açık kod, ilk cüzdan. */

export const CHAPTER_6: LearnPage[] = [
  /* ------------------------------------------------------------------ 6.1 */
  {
    slug: "what-is-tamga-network",
    chapter: 6,
    order: 1,
    minutes: 5,
    title: { tr: "Tamga Network nedir?", en: "What is Tamga Network?", tk: "Tamga Network näme?" },
    summary: {
      tr: "Türk dünyası için ortak, AB uyumlu bir güven ağı: ne yapar, ne yapmaz.",
      en: "A shared, EU-compatible trust network for the Turkic world: what it does and what it doesn't.",
      tk: "Türki dünýäsi üçin umumy, ÝB bilen laýyk ynam tory: näme edýär we näme etmeýär.",
    },
    diagram: "flow",
    body: {
      tr: (
        <>
          <p>
            Önceki bölümlerde bir dijital belgenin nasıl imzalandığını, cüzdanda nasıl durduğunu ve yalnız gereken bilginin
            nasıl gösterildiğini gördük. Geriye tek bir soru kalıyor: Taşkent’teki bir işveren, Bakü’de verilmiş bir belgeyi
            gördüğünde onu veren kurumun gerçekten var olduğunu ve belge vermeye yetkili olduğunu nereden bilecek? Tamga Network
            bu sorunun ortak cevabıdır.
          </p>
          <h2>Kısaca</h2>
          <p>
            Tamga Network, Türk dünyası için kurulan ortak bir güven ağıdır. Ağ üç şey sağlar: herkesin aynı şekilde uyduğu
            açık kurallar, hangi kurumun güvenilir olduğunu söyleyen imzalı <Term tip="Bir ülkenin belge veren kurumlarını, doğrulayıcılarını ve cüzdan sağlayıcılarını sayan, imzalı ve sürümlü liste." en="trust list">güven listeleri</Term> ve
            bu kuralları uygulayan açık kaynak yazılım. Belgenin kendisi ağa yazılmaz; ağ yalnızca “kime güvenebilirsin”
            sorusunu cevaplar.
          </p>
          <p>
            Biçimler ve protokoller Avrupa Birliği’nin dijital kimlik standartlarıyla aynıdır. Bu yüzden Tamga’da verilen bir
            belge, AB’nin kullandığı dili konuşan cüzdanlarla ve doğrulayıcılarla da çalışabilir.
          </p>
          <h2>Ne yapar?</h2>
          <ul>
            <li>
              <strong>Kuralları yazar ve yayınlar:</strong> kim katılabilir, her rol neye uymak zorundadır, bir belge türü nasıl
              tanımlanır. Bu kurallar Tamga ARF’de toplanır.
            </li>
            <li>
              <strong>Güven listelerini işletir:</strong> her ülkenin listesini ve hepsini gösteren listelerin listesini imzalı,
              sürümlü ve herkese açık olarak yayınlar.
            </li>
            <li>
              <strong>Ortak veriyi tutar:</strong> belge türlerinin kataloğu, alan adları, şemalar.
            </li>
            <li>
              <strong>Açık kod sağlar:</strong> doğrulama, belge verme ve cüzdan çekirdeği paketleri, uyum testleri.
            </li>
          </ul>
          <h2>Ne yapmaz?</h2>
          <p>
            Ağ kişisel veri toplamaz: belgeler kişinin telefonunda durur, listelere ve kayıtlara kişisel veri yazılmaz. Ağ
            kimsenin belgesini onun yerine imzalamaz; imza her zaman belgeyi veren kurumundur. Ve ağ bir şey satmaz: Tamga
            Network bir şirket değil, bir ağdır. Kurumlara entegrasyon ya da destek gibi ticari hizmetler sunmak isteyen
            şirketler bunu ağın dışında, kendi adlarıyla yapar; ağın kuralları herkes için aynıdır.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Ağın asıl işi ülke listelerini bir araya getirmektir. Bugün Türkiye listesini Tamga, devlet adına geçici olarak
              yayınlar. Bir Türk devleti kendi listesini yayınladığında ağ onu gösterir; cüzdanlar ve doğrulayıcılar için yalnız
              listenin adresi değişir.
            </p>
          </Callout>
          <h2>Neden “ağ”?</h2>
          <p>
            Çünkü güven tek bir merkezden gelmez. Belgeyi kurum imzalar, kurumu listesinde devlet ya da onun yetkilendirdiği
            kuruluş tanır, listeyi herkes doğrulayabilir. Ağ bu parçaları birbirine bağlayan ortak kurallar ve ortak dildir.
            Sonraki sayfalarda bu parçaları tek tek göreceğiz.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            In the previous chapters we saw how a digital credential is signed, how it sits in a wallet and how only the
            information that is needed gets shown. One question is left: when an employer in Tashkent sees a credential issued in
            Baku, how do they know that the institution behind it really exists and is allowed to issue it? Tamga Network is the
            shared answer to that question.
          </p>
          <h2>In short</h2>
          <p>
            Tamga Network is a shared trust network for the Turkic world. It provides three things: open rules that everyone
            follows in the same way, signed <Term tip="A signed, versioned list of a country's issuers, verifiers and wallet providers." en="trust list">trust lists</Term> that
            say which institutions can be trusted, and open-source software that applies those rules. The credential itself is
            never written to the network; the network only answers the question “whom can you trust?”.
          </p>
          <p>
            Formats and protocols are the same as the European Union’s digital identity standards. So a credential issued in
            Tamga can also work with wallets and verifiers that speak the EU’s language.
          </p>
          <h2>What it does</h2>
          <ul>
            <li>
              <strong>Writes and publishes the rules:</strong> who can join, what each role must comply with, how a credential type
              is defined. These rules are collected in the Tamga ARF.
            </li>
            <li>
              <strong>Runs the trust lists:</strong> it publishes each country’s list, and the list of lists that points to all of
              them, signed, versioned and open to everyone.
            </li>
            <li>
              <strong>Keeps shared data:</strong> the catalogue of credential types, field names and schemas.
            </li>
            <li>
              <strong>Provides open code:</strong> packages for verification, issuance and the wallet core, plus conformance tests.
            </li>
          </ul>
          <h2>What it doesn’t do</h2>
          <p>
            The network collects no personal data: credentials stay on the person’s phone, and no personal data is written to
            lists or logs. The network never signs anyone’s credential on their behalf; the signature always belongs to the
            issuing institution. And the network sells nothing: Tamga Network is a network, not a company. Companies that want to
            offer commercial services such as integration or support do so outside the network, under their own names; the
            network’s rules are the same for all.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              The network’s real job is to bring the countries’ lists together. Today Tamga publishes Türkiye’s list provisionally,
              on behalf of the state. When a Turkic state publishes its own list, the network points to it; for wallets and
              verifiers only the list’s address changes.
            </p>
          </Callout>
          <h2>Why a “network”?</h2>
          <p>
            Because trust doesn’t come from a single centre. The institution signs the credential, the state or a body it
            authorises recognises the institution in its list, and anyone can verify the list. The network is the shared rules and
            the shared language that tie these pieces together. The next pages look at them one by one.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Öňki bölümlerde sanly resminamanyň nähili gol çekilýändigini, gapjykda nähili durýandygyny we diňe gerek maglumatyň
            nähili görkezilýändigini gördük. Bir sorag galýar: Daşkentdäki iş beriji Bakuda berlen resminamany görende, ony
            beren guramanyň hakykatdan bardygyny we resminama bermäge hukugynyň bardygyny nädip bilýär? Tamga Network bu soraga
            umumy jogapdyr.
          </p>
          <h2>Gysgaça</h2>
          <p>
            Tamga Network türki dünýäsi üçin umumy ynam torudyr. Tor üç zady üpjün edýär: hemmeleriň birmeňzeş eýerýän açyk
            düzgünleri, haýsy guramanyň ynamlydygyny aýdýan gol çekilen <Term tip="Bir ýurduň resminama berijilerini, barlaýjylaryny we gapjyk üpjün edijilerini görkezýän gol çekilen sanaw." en="trust list">ynam sanawlary</Term> we
            bu düzgünleri ulanýan açyk çeşmeli programma. Resminamanyň özi tora ýazylmaýar; tor diňe “kime ynanyp bolar?”
            diýen soraga jogap berýär.
          </p>
          <p>
            Görnüşler we protokollar Ýewropa Bileleşiginiň sanly şahsyýet standartlary bilen birmeňzeş. Şonuň üçin Tamga-da
            berlen resminama ÝB-niň dilinde gürleýän gapjyklar we barlaýjylar bilen hem işläp biler.
          </p>
          <h2>Näme edýär?</h2>
          <ul>
            <li><strong>Düzgünleri ýazýar we çap edýär:</strong> kim goşulyp biler, her rol nämä eýermeli. Düzgünler Tamga ARF-da jemlenýär.</li>
            <li><strong>Ynam sanawlaryny işledýär:</strong> her ýurduň sanawyny we ählisini görkezýän sanawlaryň sanawyny gol çekip, açyk çap edýär.</li>
            <li><strong>Umumy maglumaty saklaýar:</strong> resminama görnüşleriniň katalogy we shemalar.</li>
            <li><strong>Açyk kod berýär:</strong> barlamak, resminama bermek we gapjyk üçin paketler, laýyklyk synaglary.</li>
          </ul>
          <h2>Näme etmeýär?</h2>
          <p>
            Tor şahsy maglumat ýygnamaýar: resminamalar adamyň telefonynda durýar. Tor hiç kimiň resminamasyna onuň ýerine gol
            çekmeýär; gol hemişe resminamany berýän guramanyňkydyr. Tor hiç zat satmaýar: Tamga Network kompaniýa däl, tordur.
            Täjirçilik hyzmatlaryny hödürlemek isleýän kompaniýalar muny toruň daşynda, öz atlary bilen edýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Toruň esasy işi ýurtlaryň sanawlaryny birleşdirmekdir. Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn
              çap edýär. Bir türki döwlet öz sanawyny çap edende tor şony görkezýär; diňe sanawyň salgysy üýtgeýär.
            </p>
          </Callout>
          <h2>Näme üçin “tor”?</h2>
          <p>
            Sebäbi ynam bir merkezden gelmeýär. Resminama gurama gol çekýär, gurama döwletiň sanawynda ykrar edilýär, sanawy
            her kim barlap bilýär. Tor bu bölekleri birleşdirýän umumy düzgünler we umumy dildir.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga Network; açık kurallar, imzalı güven listeleri ve açık kaynak yazılımdan oluşan ortak bir güven ağıdır.",
        en: "Tamga Network is a shared trust network made of open rules, signed trust lists and open-source software.",
        tk: "Tamga Network açyk düzgünlerden, gol çekilen ynam sanawlaryndan we açyk çeşmeli programmadan ybarat umumy ynam torudyr.",
      },
      {
        tr: "Belgeler ve kişisel veri ağa yazılmaz; ağ yalnız “kime güvenebilirsin” sorusunu cevaplar.",
        en: "Credentials and personal data are never written to the network; it only answers “whom can you trust?”.",
        tk: "Resminamalar we şahsy maglumat tora ýazylmaýar; tor diňe “kime ynanyp bolar?” diýen soraga jogap berýär.",
      },
      {
        tr: "Ağ hizmet satmaz ve AB standartlarını kullanır; her Türk devleti kendi listesinin sahibi olabilir.",
        en: "The network sells nothing and uses EU standards; each Turkic state can own its own list.",
        tk: "Tor hiç zat satmaýar we ÝB standartlaryny ulanýar; her türki döwlet öz sanawynyň eýesi bolup biler.",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: mimari", en: "Tamga ARF: architecture", tk: "Tamga ARF: arhitektura" }, href: "architecture", kind: "arf" },
      { label: { tr: "ADR-0037: Tamga Network yalnızca bir ağdır", en: "ADR-0037: Tamga Network is only a network", tk: "ADR-0037: Tamga Network diňe tor" }, href: "/adr/0037-network-only", kind: "docs" },
      { label: { tr: "Kavramlar: güven listeleri", en: "Concepts: trust lists", tk: "Düşünjeler: ynam sanawlary" }, href: "/concepts/trust-lists", kind: "docs" },
    ],
  },

  /* ------------------------------------------------------------------ 6.2 */
  {
    slug: "why-turkic-world",
    chapter: 6,
    order: 2,
    minutes: 4,
    title: { tr: "Neden Türk dünyası?", en: "Why the Turkic world?", tk: "Näme üçin türki dünýäsi?" },
    summary: {
      tr: "Diller, sınırlar, ortak tarih ve Avrupa ile köprü: bu ağın Türk dünyasında neden anlamlı olduğu.",
      en: "Languages, borders, a shared history and a bridge to Europe: why this network makes sense for the Turkic world.",
      tk: "Diller, serhetler, umumy taryh we Ýewropa bilen köpri: bu toruň türki dünýäsinde näme üçin manyly bolýandygy.",
    },
    body: {
      tr: (
        <>
          <p>
            Türk dünyasında insanlar sınırları sık geçer. Almatı’da okuyan bir öğrenci staj için İstanbul’a gelir, Bişkek’ten bir
            mühendis Bakü’de iş bulur, Aşkabat’tan bir doktor Ankara’da uzmanlık yapmak ister. Her seferinde aynı soru çıkar: bu
            belgeyi kim, nasıl doğrulayacak?
          </p>
          <h2>Bugünkü durum</h2>
          <p>
            Her ülkenin kendi kurumları, kendi sistemleri ve kendi kâğıtları var. Bir belge sınırı geçince çoğu zaman yeniden
            onaylatılması, tercüme ettirilmesi ve elden teslim edilmesi gerekir. Doğrulayan kurum belgeyi veren kuruma telefon
            açar ya da e-posta yazar; cevap günler, bazen haftalar sürer. Bu arada sahte belgeler de aynı kâğıtla dolaşır.
          </p>
          <h2>Ortak noktalar</h2>
          <p>
            Türk devletleri arasında zaten güçlü bağlar var: benzer diller, ortak tarih, ekonomik ve kültürel işbirliği,
            Türk Devletleri Teşkilatı gibi ortak kurumlar. Bir güven ağı bu bağlara teknik bir zemin ekler: ülkeler birbirinin
            kurumlarını tanımak için her seferinde yeni bir anlaşma yazmak yerine aynı kuralları ve aynı listeleri kullanır.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Ağ hiçbir ülkeye bir başkasının kurallarını dayatmaz. Her devlet kendi listesini kendisi yönetir ve hangi ülkenin
              kurumlarını tanıyacağına kendisi karar verir. Ortak olan yalnızca dil ve kurallardır.
            </p>
          </Callout>
          <h2>Avrupa ile köprü</h2>
          <p>
            Avrupa Birliği kendi dijital kimlik cüzdanlarını kuruyor ve yakında birçok hizmet bu cüzdanlarla çalışacak. Türk
            dünyası kendi sistemini bu standartlardan ayrı kurarsa, Türk dünyasından gelen belgeler Avrupa’da yine kâğıda
            dönmek zorunda kalır. Tamga Network bu yüzden Avrupa’nın biçimlerini ve protokollerini olduğu gibi kullanır: aynı dili
            konuşan sistemler birbirini daha kolay tanır.
          </p>
          <h2>Kimin işine yarar?</h2>
          <ul>
            <li>Kişiler: belgelerini yanlarında taşır, yalnız gerekeni gösterir, sınırda beklemez.</li>
            <li>Kurumlar: belgeyi bir kez verir, her sorana ayrı ayrı cevap yazmak zorunda kalmaz.</li>
            <li>Doğrulayanlar: saniyeler içinde, kaynağa sormadan, belgenin gerçek olduğunu görür.</li>
            <li>Devletler: kendi listesinin sahibi olur, komşularıyla aynı dili konuşur.</li>
          </ul>
        </>
      ),
      en: (
        <>
          <p>
            People in the Turkic world cross borders often. A student in Almaty comes to Istanbul for an internship, an engineer
            from Bishkek finds a job in Baku, a doctor from Ashgabat wants to specialise in Ankara. Each time the same question
            comes up: who will verify this document, and how?
          </p>
          <h2>Where we are today</h2>
          <p>
            Every country has its own institutions, its own systems and its own paper. When a document crosses a border it often
            has to be certified again, translated and handed over in person. The verifying institution calls or emails the issuer;
            the answer takes days, sometimes weeks. Meanwhile, fake documents travel on the same paper.
          </p>
          <h2>What already connects us</h2>
          <p>
            There are strong ties between the Turkic states already: related languages, a shared history, economic and cultural
            cooperation, and shared bodies such as the Organization of Turkic States. A trust network adds a technical foundation
            to these ties: instead of writing a new agreement each time they want to recognise each other’s institutions, countries
            use the same rules and the same lists.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              The network imposes no country’s rules on another. Each state runs its own list and decides itself which countries’
              institutions it recognises. Only the language and the rules are shared.
            </p>
          </Callout>
          <h2>A bridge to Europe</h2>
          <p>
            The European Union is building its own digital identity wallets, and soon many services will work with them. If the
            Turkic world builds its system apart from these standards, documents from the Turkic world will have to go back to
            paper in Europe. That is why Tamga Network uses Europe’s formats and protocols as they are: systems that speak the same
            language recognise each other more easily.
          </p>
          <h2>Who benefits?</h2>
          <ul>
            <li>People: they carry their credentials, show only what is needed and don’t wait at the border.</li>
            <li>Institutions: they issue a credential once instead of answering every enquiry separately.</li>
            <li>Verifiers: they see within seconds, without asking the source, that a credential is genuine.</li>
            <li>States: they own their list and speak the same language as their neighbours.</li>
          </ul>
        </>
      ),
      tk: (
        <>
          <p>
            Türki dünýäsinde adamlar serhetleri ýygy geçýär. Almatyda okaýan talyp staž üçin Stambula gelýär, Bişkekden inžener
            Bakuda iş tapýar, Aşgabatdan lukman Ankarada hünär ýokarlandyrmak isleýär. Her gezek şol bir sorag ýüze çykýar: bu
            resminamany kim we nädip barlar?
          </p>
          <h2>Häzirki ýagdaý</h2>
          <p>
            Her ýurduň öz guramalary, öz ulgamlary we öz kagyzlary bar. Resminama serhedi geçende köplenç täzeden tassyklanmaly,
            terjime edilmeli we eli bilen tabşyrylmaly. Jogap günler, käte hepdeler alýar. Şol wagt galp resminamalar hem şol bir
            kagyz bilen aýlanýar.
          </p>
          <h2>Umumy zatlar</h2>
          <p>
            Türki döwletleriň arasynda eýýäm güýçli baglanyşyklar bar: meňzeş diller, umumy taryh, Türki Döwletleriň Guramasy
            ýaly umumy edaralar. Ynam tory bu baglanyşyklara tehniki esas goşýar: ýurtlar her gezek täze şertnama ýazmagyň
            deregine şol bir düzgünleri we sanawlary ulanýar.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Tor hiç bir ýurda başga ýurduň düzgünlerini zor bilen ýüklemeýär. Her döwlet öz sanawyny özi dolandyrýar we haýsy
              ýurduň guramalaryny ykrar etjegini özi çözýär.
            </p>
          </Callout>
          <h2>Ýewropa bilen köpri</h2>
          <p>
            Ýewropa Bileleşigi öz sanly şahsyýet gapjyklaryny gurýar. Türki dünýäsi öz ulgamyny bu standartlardan aýry gursa,
            resminamalar Ýewropada ýene kagyza dolanmaly bolar. Şonuň üçin Tamga Network Ýewropanyň görnüşlerini we
            protokollaryny şol durşy bilen ulanýar.
          </p>
          <h2>Kime peýdaly?</h2>
          <ul>
            <li>Adamlara: resminamalaryny ýanynda göterýär, diňe gerek zady görkezýär.</li>
            <li>Guramalara: resminamany bir gezek berýär.</li>
            <li>Barlaýjylara: sekuntlarda resminamanyň hakykydygyny görýär.</li>
            <li>Döwletlere: öz sanawynyň eýesi bolýar.</li>
          </ul>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Türk dünyasında belgeler sınırı sık geçer; bugün doğrulama yavaş, kâğıda bağlı ve sahteciliğe açık.",
        en: "Documents cross borders often in the Turkic world; verification today is slow, paper-bound and open to forgery.",
        tk: "Türki dünýäsinde resminamalar serhedi ýygy geçýär; häzir barlamak haýal we kagyza bagly.",
      },
      {
        tr: "Ağ ülkelere ortak bir dil ve ortak kurallar verir; her devlet kendi listesinin ve kararlarının sahibidir.",
        en: "The network gives countries a shared language and rules; each state owns its list and its decisions.",
        tk: "Tor ýurtlara umumy dil we düzgünler berýär; her döwlet öz sanawynyň eýesidir.",
      },
      {
        tr: "AB standartlarını kullanmak, Türk dünyasının belgelerinin Avrupa’da da tanınmasının yolunu açar.",
        en: "Using EU standards opens the way for Turkic-world credentials to be recognised in Europe too.",
        tk: "ÝB standartlaryny ulanmak resminamalaryň Ýewropada hem ykrar edilmegine ýol açýar.",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: konumlanma", en: "Tamga ARF: positioning", tk: "Tamga ARF: ýerleşiş" }, href: "architecture", kind: "arf" },
      { label: { tr: "ADR-0036: güven federasyonu", en: "ADR-0036: trust federation", tk: "ADR-0036: ynam federasiýasy" }, href: "/adr/0036-trust-federation-external-lists", kind: "docs" },
      { label: { tr: "Senaryolar", en: "Scenarios", tk: "Ssenariler" }, href: "/scenarios", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.3 */
  {
    slug: "roles",
    chapter: 6,
    order: 3,
    minutes: 6,
    title: { tr: "Ağda kim ne yapar?", en: "Who does what", tk: "Torda kim näme edýär?" },
    summary: {
      tr: "İşletmeci, kayıt kurumu, belge veren, yetkili kaynak, doğrulayan, cüzdan sağlayıcısı, kişi ve devlet: her rol sade dille.",
      en: "Operator, registrar, issuer, authentic source, verifier, wallet provider, person and state: each role in plain words.",
      tk: "Operator, hasaba alyş edarasy, resminama beriji, ygtyýarly çeşme, barlaýjy, gapjyk üpjün ediji, adam we döwlet: her rol ýönekeý dilde.",
    },
    diagram: "roles",
    body: {
      tr: (
        <>
          <p>
            Bir ağ, içindeki herkesin ne yaptığı belli olduğunda çalışır. Tamga Network’te sekiz rol var. Bir kurum birden fazla
            rol üstlenebilir; örneğin bir üniversite hem belge verir hem belge doğrular. Her rolün kesin kuralları Tamga ARF’de
            yazılıdır; burada her birini sade dille anlatıyoruz.
          </p>
          <h2>Ağı işletenler</h2>
          <h3>İşletmeci</h3>
          <p>
            Güven listelerini yayınlar, kökteki anahtarları korur, listelerin her sürümünü imzalar ve herkese açık bir kayıt
            günlüğü tutar. Bugün bu rolü Tamga geçici olarak üstlenir. Bir devlet kendi listesini işletmeye başladığında o
            devletin listesi onun işletmecisine devredilir.
          </p>
          <h3>Kayıt kurumu</h3>
          <p>
            Ağa katılmak isteyenlerin başvurusunu alır: kurumun gerçekten var olup olmadığını, resmî kayıt numarasını, iletişim
            bilgilerini ve hangi belgeleri vermek ya da istemek istediğini denetler. Uygun bulursa kaydı listeye işletir.
          </p>
          <h2>Belgeyi üretenler</h2>
          <h3>Belge veren</h3>
          <p>
            Üniversite, hastane, meslek odası, bilet satıcısı gibi bir belgeyi veren kurum. Belgeyi kendi anahtarıyla imzalar ve
            gerekirse iptal eder. Anahtarı kendisinde kalır; ağ bu anahtarı tutmaz.
          </p>
          <h3>Yetkili kaynak</h3>
          <p>
            Belgedeki bilginin asıl kaydını tutan sistem: bir üniversitenin öğrenci bilgi sistemi, bir odanın üye kaydı. Belge
            veren, belgeyi verirken bilgiyi buradan okur. Çoğu zaman belge veren ile yetkili kaynak aynı kurumdur.
          </p>
          <h2>Belgeyi kullananlar</h2>
          <h3>Kişi</h3>
          <p>
            Belgenin sahibi. Belgeyi cüzdanında taşır, kime neyi göstereceğine kendisi karar verir ve her paylaşımı onaylar.
          </p>
          <h3>Doğrulayıcı</h3>
          <p>
            Belge isteyen taraf: bir işveren, bir web sitesi, bir etkinlik kapısı. Avrupa’daki adıyla{" "}
            <Term tip="Bir belgeye dayanarak hizmet veren ve belge isteyen taraf; Türkçe metinlerde çoğunlukla doğrulayıcı denir." en="relying party">relying party</Term>.
            Ağa kayıtlıdır ve yalnız kaydında yazan bilgileri isteyebilir; daha fazlasını isterse cüzdan bunu kişiye gösterir.
          </p>
          <h3>Cüzdan sağlayıcısı</h3>
          <p>
            Cüzdan uygulamasını yapan ve yöneten kuruluş. Ağın cüzdan kurallarına uyduğunu uyum testleriyle gösterir ve listeye
            girer. Her cüzdan kendi cüzdan sağlayıcısını işletir; ağ hiçbirini işletmez (ağın ilk cüzdanı Tamga Wallet da kendisininkini
            işletir). Ağ cüzdan seçmez; kurallara uyan her cüzdan sağlayıcısını tanır.
          </p>
          <h2>Devlet</h2>
          <p>
            Bir ülkenin kendi güven listesinin sahibi. Hangi kurumların listede olacağına, hangi ülkelerin listelerini
            tanıyacağına karar verir. Devlet henüz katılmadığında bu rolü geçici işletmeci devlet adına üstlenir ve devletin
            katılmasıyla rol sahibine geçer.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Aynı kurum farklı ülkelerde farklı rollerde olabilir: Bişkek’teki bir üniversite kendi diplomalarını verirken
              Almatı’daki bir şirket o diplomayı doğrulayıcı olarak ister. Kurallar iki ülkede de aynıdır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            A network works when it is clear what everyone in it does. Tamga Network has eight roles. One institution can take on
            more than one; a university, for example, both issues and verifies credentials. The exact rules for each role are in the
            Tamga ARF; here we explain each one in plain words.
          </p>
          <h2>Running the network</h2>
          <h3>Operator</h3>
          <p>
            Publishes the trust lists, protects the root keys, signs every version of the lists and keeps a public log. Today Tamga
            takes on this role provisionally. When a state starts running its own list, that list is handed over to its operator.
          </p>
          <h3>Registrar</h3>
          <p>
            Receives applications from those who want to join: it checks that the institution really exists, its official
            registration number, its contact details and which credentials it wants to issue or request. If everything is in order,
            it enters the record into the list.
          </p>
          <h2>Producing credentials</h2>
          <h3>Issuer</h3>
          <p>
            The institution that issues a credential: a university, a hospital, a professional chamber, a ticket seller. It signs the
            credential with its own key and revokes it when needed. The key stays with the institution; the network doesn’t hold it.
          </p>
          <h3>Authentic source</h3>
          <p>
            The system that keeps the original record of the information in a credential: a university’s student information system,
            a chamber’s member register. The issuer reads the information from here when it issues. Often the issuer and the
            authentic source are the same institution.
          </p>
          <h2>Using credentials</h2>
          <h3>Person</h3>
          <p>
            The owner of the credential. They carry it in their wallet, decide what to show to whom and approve every sharing.
          </p>
          <h3>Verifier</h3>
          <p>
            The party that asks for a credential: an employer, a website, an event gate. Its European name is{" "}
            <Term tip="The party that asks for a credential and relies on it to provide a service." en="relying party">relying party</Term>.
            It is registered with the network and may ask only for the information in its registration; if it asks for more, the
            wallet shows this to the person.
          </p>
          <h3>Wallet provider</h3>
          <p>
            The organisation that builds and runs a wallet app. It shows through conformance tests that it follows the network’s
            wallet rules and is then listed. Each wallet runs its own wallet provider; the network runs none (Tamga Wallet, the
            network’s first wallet, runs its own too). The network doesn’t pick wallets; it recognises every wallet provider that follows the
            rules.
          </p>
          <h2>State</h2>
          <p>
            The owner of a country’s trust list. It decides which institutions are on the list and which countries’ lists it
            recognises. Until a state joins, the provisional operator takes on this role on its behalf, and the role passes to the
            state when it joins.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              The same institution can play different roles in different countries: a university in Bishkek issues its diplomas
              while a company in Almaty asks for that diploma as a verifier. The rules are the same in both countries.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Tor içindäki her kesiň näme edýändigi belli bolanda işleýär. Tamga Network-da sekiz rol bar. Bir gurama birnäçe rol
            alyp biler. Her roluň takyk düzgünleri Tamga ARF-da ýazylan; bu ýerde olary ýönekeý dilde düşündirýäris.
          </p>
          <h2>Tory işledýänler</h2>
          <h3>Operator</h3>
          <p>
            Ynam sanawlaryny çap edýär, kök açarlaryny goraýar, sanawlaryň her wersiýasyna gol çekýär. Häzir bu rol wagtlaýyn
            Tamga-da. Döwlet öz sanawyny işledip başlanda sanaw oňa geçýär.
          </p>
          <h3>Hasaba alyş edarasy</h3>
          <p>
            Goşulmak isleýänleriň arzasyny kabul edýär: guramanyň bardygyny, resmi belgisini we haýsy resminamalary bermek
            isleýändigini barlaýar. Bolýan bolsa ýazgyny sanawa girizýär.
          </p>
          <h2>Resminamany öndürýänler</h2>
          <h3>Resminama beriji</h3>
          <p>Uniwersitet, hassahana, bilet satyjy ýaly gurama. Resminama öz açary bilen gol çekýär; açar özünde galýar.</p>
          <h3>Ygtyýarly çeşme</h3>
          <p>Maglumatyň asyl ýazgysyny saklaýan ulgam, meselem uniwersitetiň talyp maglumat ulgamy.</p>
          <h2>Resminamany ulanýanlar</h2>
          <h3>Adam</h3>
          <p>Resminamanyň eýesi. Kime näme görkezjegini özi çözýär we her paýlaşmagy tassyklaýar.</p>
          <h3>Barlaýjy</h3>
          <p>
            Resminama soraýan tarap: iş beriji, web sahypa, çäre derwezesi. Ýewropadaky ady{" "}
            <Term tip="Resminama soraýan we oňa daýanyp hyzmat berýän tarap." en="relying party">relying party</Term>. Diňe hasabynda
            ýazylan maglumatlary sorap bilýär.
          </p>
          <h3>Gapjyk üpjün ediji</h3>
          <p>Gapjyk programmasyny edýän gurama. Laýyklyk synaglaryndan geçip sanawa girýär. Her gapjyk öz gapjyk üpjün edijisini işledýär; tor hiç birini işletmeýär (Tamga Wallet hem özüňkini işledýär). Tor düzgünlere eýerýän her gapjygy ykrar edýär.</p>
          <h2>Döwlet</h2>
          <p>
            Ýurduň öz ynam sanawynyň eýesi. Sanawda kimiň boljagyny we haýsy ýurtlaryň sanawlaryny ykrar etjegini çözýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>Şol bir gurama dürli ýurtlarda dürli rollarda bolup biler; düzgünler iki ýurtda hem birmeňzeş.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağı işletmeci ve kayıt kurumu yürütür; belgeyi belge veren üretir, bilgi yetkili kaynaktan gelir.",
        en: "The operator and the registrar run the network; the issuer produces the credential, the data comes from the authentic source.",
        tk: "Tory operator we hasaba alyş edarasy alyp barýar; resminamany beriji öndürýär, maglumat ygtyýarly çeşmeden gelýär.",
      },
      {
        tr: "Kişi belgesinin sahibidir; doğrulayıcı yalnız kaydında yazanı isteyebilir; cüzdan sağlayıcısı uyum testleriyle listeye girer.",
        en: "The person owns the credential; a verifier may ask only for what its registration allows; wallet providers are listed after conformance tests.",
        tk: "Adam resminamanyň eýesi; barlaýjy diňe hasabyndaky zady sorap bilýär; gapjyk üpjün edijiler laýyklyk synaglaryndan soň sanawa girýär.",
      },
      {
        tr: "Her devlet kendi listesinin sahibidir; katılana kadar geçici işletmeci onun adına çalışır.",
        en: "Each state owns its list; until it joins, the provisional operator acts on its behalf.",
        tk: "Her döwlet öz sanawynyň eýesi; goşulýança wagtlaýyn operator onuň adyndan işleýär.",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: roller", en: "Tamga ARF: roles", tk: "Tamga ARF: rollar" }, href: "roles", kind: "arf" },
      { label: { tr: "Tamga Rulebook: her rolün kuralları", en: "Tamga Rulebook: the rules for each role", tk: "Tamga Rulebook: rollaryň düzgünleri" }, href: "rulebook", kind: "arf" },
      { label: { tr: "Katılım süreci", en: "Onboarding", tk: "Goşulyş tertibi" }, href: "onboarding", kind: "arf" },
    ],
  },

  /* ------------------------------------------------------------------ 6.4 */
  {
    slug: "network-layers",
    chapter: 6,
    order: 4,
    minutes: 5,
    title: { tr: "Ağın katmanları", en: "The layers of the network", tk: "Toruň gatlaklary" },
    summary: {
      tr: "Kurallar, listeler, belge biçimleri, açık paketler, cüzdanlar ve ileride ortak defter.",
      en: "Rules, lists, credential formats, open packages, wallets and, later, a shared ledger.",
      tk: "Düzgünler, sanawlar, resminama görnüşleri, açyk paketler, gapjyklar we soňra umumy kitap.",
    },
    diagram: "trust-chain",
    body: {
      tr: (
        <>
          <p>
            Tamga Network’ü üst üste konmuş katmanlar olarak düşünmek işi kolaylaştırır. Her katman bir alttakine dayanır ve
            her katmanın görevi bellidir. Altı katman var; altıncısı bugün değil, ileride gelecek.
          </p>
          <h2>1. Kurallar</h2>
          <p>
            En altta yazılı kurallar durur: Tamga ARF, Trust Framework, Tamga Rulebook ve her belge türünün kendi kural kitabı.
            Diğer bütün katmanlar bu kurallara göre çalışır.
          </p>
          <h2>2. Güven listeleri</h2>
          <p>
            Kuralların “kim güvenilir” sorusuna verdiği cevap. Her ülkenin listesi kurumları, doğrulayıcıları ve cüzdan
            sağlayıcılarını sayar; <Term tip="Bütün ülke listelerini gösteren, en üstteki imzalı liste." en="List of Trusted Lists (LOTL)">listelerin listesi</Term> hepsini
            bir araya getirir. Listeler imzalıdır, her sürüm bir öncekine bağlıdır ve herkes doğrulayabilir.
          </p>
          <h2>3. Belge biçimleri ve protokoller</h2>
          <p>
            Belgenin nasıl yazılacağı ve nasıl taşınacağı: internet için SD-JWT VC, yüz yüze için mdoc; belge almak için
            OpenID4VCI, göstermek için OpenID4VP. Bunlar AB’nin kullandığı standartlardır.
          </p>
          <h2>4. Açık paketler</h2>
          <p>
            Kuralları ve biçimleri uygulayan hazır yazılım: doğrulama hattı, belge verme, cüzdan çekirdeği. Herkes kendi
            sunucusunda çalıştırabilir; aynı kodu kullanan herkes aynı sonuca varır.
          </p>
          <h2>5. Cüzdanlar ve hizmetler</h2>
          <p>
            Ağın üstünde çalışanlar: kişilerin kullandığı cüzdanlar ve kurumlara hizmet veren sağlayıcılar. Bunlar ağın parçası
            değil, ağın katılımcılarıdır. İlk cüzdan Tamga Wallet’tır; kurallara uyan her cüzdan da aynı yere yerleşir.
          </p>
          <h2>6. Ortak defter (ileride)</h2>
          <p>
            En az iki bağımsız işletmeci katıldığında, listelerdeki kayıtlar izinli bir ortak deftere de yazılacak. Defter yeni bir
            güven kaynağı eklemez; aynı kayıtları birden fazla işletmecinin birlikte tutmasını sağlar. Kişisel veri deftere de
            yazılmaz.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Katmanlar birbirinden bağımsız değişebilir. Örneğin yeni bir belge türü eklemek yalnız kurallar ve katalog
              katmanını etkiler; cüzdanların yeniden yazılması gerekmez.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            It helps to picture Tamga Network as layers stacked on top of each other. Each layer rests on the one below, and each
            has a clear job. There are six layers; the sixth comes later, not today.
          </p>
          <h2>1. Rules</h2>
          <p>
            At the bottom are the written rules: the Tamga ARF, the Trust Framework, the Tamga Rulebook and a rulebook for each
            credential type. Every other layer works according to these rules.
          </p>
          <h2>2. Trust lists</h2>
          <p>
            The rules’ answer to “who can be trusted”. Each country’s list names its institutions, verifiers and wallet providers;
            the <Term tip="The signed list at the top that points to every country list." en="List of Trusted Lists (LOTL)">list of lists</Term> brings
            them together. Lists are signed, every version is linked to the previous one and anyone can verify them.
          </p>
          <h2>3. Credential formats and protocols</h2>
          <p>
            How a credential is written and carried: SD-JWT VC for the internet, mdoc for in person; OpenID4VCI to receive a
            credential, OpenID4VP to present it. These are the standards the EU uses.
          </p>
          <h2>4. Open packages</h2>
          <p>
            Ready-made software that applies the rules and formats: the verification pipeline, issuance, the wallet core. Anyone can
            run them on their own server; everyone using the same code reaches the same result.
          </p>
          <h2>5. Wallets and services</h2>
          <p>
            What runs on top of the network: the wallets people use and the providers that serve institutions. They are not part of
            the network; they are its participants. The first wallet is Tamga Wallet; every wallet that follows the rules sits in the
            same place.
          </p>
          <h2>6. Shared ledger (later)</h2>
          <p>
            Once at least two independent operators join, the records in the lists will also be written to a permissioned shared
            ledger. The ledger adds no new source of trust; it lets several operators keep the same records together. No personal
            data goes into the ledger either.
          </p>
          <Callout kind="info" locale="en">
            <p>
              The layers can change independently. Adding a new credential type, for example, touches only the rules and the
              catalogue; wallets don’t need to be rewritten.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Tamga Network-y üst-üstüne goýlan gatlaklar hökmünde göz öňüne getirmek aňsat. Alty gatlak bar; altynjysy soňra geler.</p>
          <h2>1. Düzgünler</h2>
          <p>Iň aşakda ýazylan düzgünler: Tamga ARF, Trust Framework, Tamga Rulebook we her resminama görnüşiniň öz kitaby.</p>
          <h2>2. Ynam sanawlary</h2>
          <p>
            “Kime ynanyp bolar” soragyna jogap. Her ýurduň sanawy guramalary we gapjyk üpjün edijileri görkezýär;{" "}
            <Term tip="Ähli ýurt sanawlaryny görkezýän iň ýokarky gol çekilen sanaw." en="List of Trusted Lists (LOTL)">sanawlaryň sanawy</Term> olary birleşdirýär.
          </p>
          <h2>3. Resminama görnüşleri we protokollar</h2>
          <p>Internet üçin SD-JWT VC, ýüzbe-ýüz üçin mdoc; almak üçin OpenID4VCI, görkezmek üçin OpenID4VP.</p>
          <h2>4. Açyk paketler</h2>
          <p>Düzgünleri ulanýan taýýar programma; her kim öz serwerinde işledip bilýär.</p>
          <h2>5. Gapjyklar we hyzmatlar</h2>
          <p>Toruň üstünde işleýänler. Olar toruň bölegi däl, gatnaşyjylarydyr. Ilkinji gapjyk Tamga Wallet.</p>
          <h2>6. Umumy kitap (soňra)</h2>
          <p>Azyndan iki garaşsyz operator goşulanda ýazgylar rugsatly umumy kitaba hem ýazylar. Şahsy maglumat oňa hem ýazylmaýar.</p>
          <Callout kind="info" locale="tk">
            <p>Gatlaklar biri-birinden garaşsyz üýtgäp bilýär; täze resminama görnüşi gapjyklary täzeden ýazmagy talap etmeýär.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağın altı katmanı var: kurallar, güven listeleri, biçimler ve protokoller, açık paketler, cüzdanlar ve ileride ortak defter.",
        en: "The network has six layers: rules, trust lists, formats and protocols, open packages, wallets and, later, a shared ledger.",
        tk: "Toruň alty gatlagy bar: düzgünler, sanawlar, görnüşler, paketler, gapjyklar we soňra umumy kitap.",
      },
      {
        tr: "Cüzdanlar ve hizmet sağlayıcılar ağın parçası değil, ağın katılımcılarıdır.",
        en: "Wallets and service providers are not part of the network; they are its participants.",
        tk: "Gapjyklar we hyzmat üpjün edijiler toruň bölegi däl, gatnaşyjylarydyr.",
      },
      {
        tr: "Ortak defter en az iki bağımsız işletmeciyle gelir ve yeni bir güven kaynağı eklemez.",
        en: "The shared ledger comes with at least two independent operators and adds no new source of trust.",
        tk: "Umumy kitap azyndan iki garaşsyz operator bilen gelýär.",
      },
    ],
    deeper: [
      { label: { tr: "Bileşen mimarisi", en: "Component architecture", tk: "Komponent arhitekturasy" }, href: "/architecture/components", kind: "docs" },
      { label: { tr: "Tamga ARF: mimari", en: "Tamga ARF: architecture", tk: "Tamga ARF: arhitektura" }, href: "architecture", kind: "arf" },
      { label: { tr: "Neden henüz blockchain yok?", en: "Why no blockchain yet?", tk: "Näme üçin entek blokçeýn ýok?" }, href: "/learn/why-not-blockchain-yet", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.5 */
  {
    slug: "rules-and-rulebooks",
    chapter: 6,
    order: 5,
    minutes: 5,
    title: { tr: "Kurallar ve rulebook'lar", en: "Rules and rulebooks", tk: "Düzgünler we rulebook-lar" },
    summary: {
      tr: "Tamga ARF, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları: hangisi neyi düzenler.",
      en: "Tamga ARF, the Trust Framework, the Tamga Rulebook and the credential-type rulebooks: what each one governs.",
      tk: "Tamga ARF, Trust Framework, Tamga Rulebook we resminama görnüşi rulebook-lary: haýsysy nämäni düzgünleşdirýär.",
    },
    body: {
      tr: (
        <>
          <p>
            Bir ağın güvenilir olması için herkesin aynı kurallara uyması ve bu kuralların açıkça yazılı olması gerekir. Tamga’nın
            kuralları tek bir yerde toplanır: Tamga ARF. Avrupa Birliği’nin kendi cüzdanları için yazdığı çerçeveyle aynı
            düzende kurulmuştur.
          </p>
          <h2>Tamga ARF: ana belge</h2>
          <p>
            ARF, “mimari ve referans çerçevesi” demektir. Ağın kimlerden oluştuğunu, nasıl çalıştığını, güvenin nereden geldiğini
            ve güvenlik ile yönetişimin nasıl düzenlendiğini anlatır. Bir kurum yöneticisi ya da devlet temsilcisi için başlangıç
            noktası budur.
          </p>
          <h2>Trust Framework</h2>
          <p>
            Ağın hukuki ve yönetişim tarafı: kim katılabilir, başvuru nasıl yapılır, kurallara uymayana ne olur, bir rol nasıl
            devredilir. Avrupa’daki eIDAS tüzüğü ve uygulama tüzüklerinin bu ağdaki karşılığıdır.
          </p>
          <h2>Tamga Rulebook</h2>
          <p>
            Her rol için numaralı, bağlayıcı kurallar. Örneğin bir doğrulayıcının yalnız kaydında yazan bilgileri isteyebileceği ya
            da belge verenin anahtarını kendisinde tutması gerektiği burada yazılıdır. Kuralların her birinin bir kodu vardır; böylece
            bir denetimde “hangi kurala uyulmadı” sorusu tek bir satırla cevaplanır.
          </p>
          <h2>Belge türü rulebook’ları</h2>
          <p>
            Her belge türünün kendi kural kitabı vardır ve Tamga Rulebook’tan dallanır: ortak kuralları devralır, yalnız o türe
            özgü kuralları ekler. Bugün üç tane var:
          </p>
          <ul>
            <li><strong>Education Rulebook:</strong> öğrenci belgesi ve diploma.</li>
            <li><strong>Identity Rulebook:</strong> geçici kimlik belgesi.</li>
            <li><strong>Event Ticket Rulebook:</strong> etkinlik bileti.</li>
          </ul>
          <p>
            Yeni bir tür, örneğin bir meslek belgesi, ancak kontrol listesi tamamlandıktan sonra kendi rulebook’uyla gelir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Kurallar Türkçe yazılır ve İngilizceye resmî olarak çevrilir; ikisi her zaman aynı sürümdedir. Bir devlet katıldığında
              bu belgeler konseye devredilir ve kurallar ortak kararla değişir.
            </p>
          </Callout>
          <h2>Kurallar nasıl bağlayıcı olur?</h2>
          <p>
            Bir kurum ağa katılırken katılım sözleşmesiyle bu kurallara uymayı kabul eder. Yani bağlayıcılığı sağlayan katılımdır.
            Teknik ayrıntılar ise geliştirici belgelerindeki şartnamelerde yazılıdır; kurallar neyin yapılacağını, şartnameler nasıl
            yapılacağını söyler.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            For a network to be trustworthy, everyone has to follow the same rules and those rules have to be written down openly.
            Tamga’s rules are collected in one place: the Tamga ARF. It is built in the same order as the framework the European Union
            wrote for its own wallets.
          </p>
          <h2>Tamga ARF: the main document</h2>
          <p>
            ARF stands for “architecture and reference framework”. It describes who makes up the network, how it works, where trust
            comes from and how security and governance are organised. For an institution’s manager or a state representative, this
            is the starting point.
          </p>
          <h2>Trust Framework</h2>
          <p>
            The legal and governance side of the network: who can join, how to apply, what happens to those who break the rules,
            how a role is handed over. It is the network’s counterpart to Europe’s eIDAS regulation and its implementing acts.
          </p>
          <h2>Tamga Rulebook</h2>
          <p>
            Numbered, binding rules for each role. That a verifier may ask only for the information in its registration, or that an
            issuer must keep its own key, is written here. Each rule has a code, so in an audit the question “which rule was broken?”
            is answered in a single line.
          </p>
          <h2>Credential-type rulebooks</h2>
          <p>
            Each credential type has its own rulebook that branches off the Tamga Rulebook: it inherits the common rules and adds
            only the rules specific to that type. There are three today:
          </p>
          <ul>
            <li><strong>Education Rulebook:</strong> student certificate and diploma.</li>
            <li><strong>Identity Rulebook:</strong> the provisional identity credential.</li>
            <li><strong>Event Ticket Rulebook:</strong> event tickets.</li>
          </ul>
          <p>A new type, such as a professional licence, only arrives with its own rulebook once a checklist is complete.</p>
          <Callout kind="turkic" locale="en">
            <p>
              The rules are written in Turkish and officially translated into English; both are always at the same version. When a
              state joins, these documents pass to the council and the rules change by shared decision.
            </p>
          </Callout>
          <h2>How do the rules become binding?</h2>
          <p>
            When an institution joins the network, it accepts these rules through a participation agreement. So it is joining that
            makes them binding. The technical details are in the specifications in the developer docs: the rules say what must be
            done, the specifications say how.
          </p>
        </>
      ),
      tk: (
        <>
          <p>Toruň ynamly bolmagy üçin hemmeler şol bir düzgünlere eýermeli we düzgünler açyk ýazylmaly. Tamga-nyň düzgünleri Tamga ARF-da jemlenýär.</p>
          <h2>Tamga ARF: esasy resminama</h2>
          <p>ARF — “arhitektura we salgylanma çarçuwasy”. Toruň kimden ybaratdygyny, nähili işleýändigini we ynamyň nireden gelýändigini düşündirýär.</p>
          <h2>Trust Framework</h2>
          <p>Toruň hukuk we dolandyryş tarapy: kim goşulyp biler, arza nädip berilýär, düzgünleri bozýana näme bolýar.</p>
          <h2>Tamga Rulebook</h2>
          <p>Her rol üçin belgili, hökmany düzgünler. Her düzgüniň kody bar.</p>
          <h2>Resminama görnüşi rulebook-lary</h2>
          <p>Her görnüşiň öz kitaby bar we Tamga Rulebook-dan şahalanýar. Häzir üçüsi bar:</p>
          <ul>
            <li><strong>Education Rulebook:</strong> talyp resminamasy we diplom.</li>
            <li><strong>Identity Rulebook:</strong> wagtlaýyn şahsyýet resminamasy.</li>
            <li><strong>Event Ticket Rulebook:</strong> çäre bileti.</li>
          </ul>
          <Callout kind="turkic" locale="tk">
            <p>Düzgünler türkçe ýazylýar we iňlis diline resmi terjime edilýär. Döwlet goşulanda resminamalar geňeşe geçýär.</p>
          </Callout>
          <h2>Düzgünler nädip hökmany bolýar?</h2>
          <p>Gurama tora goşulanda gatnaşyk şertnamasy bilen bu düzgünleri kabul edýär. Tehniki jikme-jiklikler işläp düzüjiler üçin resminamalarda.</p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga ARF ağın ana belgesidir; Trust Framework hukuk ve yönetişimi, Tamga Rulebook her rolün kurallarını anlatır.",
        en: "The Tamga ARF is the main document; the Trust Framework covers law and governance, the Tamga Rulebook each role’s rules.",
        tk: "Tamga ARF esasy resminama; Trust Framework hukuk we dolandyryşy, Tamga Rulebook rollaryň düzgünlerini düşündirýär.",
      },
      {
        tr: "Belge türü rulebook’ları (Education, Identity, Event Ticket) Tamga Rulebook’tan dallanır.",
        en: "The credential-type rulebooks (Education, Identity, Event Ticket) branch off the Tamga Rulebook.",
        tk: "Görnüş rulebook-lary (Education, Identity, Event Ticket) Tamga Rulebook-dan şahalanýar.",
      },
      {
        tr: "Kurallar katılım sözleşmesiyle bağlayıcı olur; teknik ayrıntı şartnamelerdedir.",
        en: "The rules become binding through the participation agreement; the technical detail is in the specifications.",
        tk: "Düzgünler gatnaşyk şertnamasy bilen hökmany bolýar.",
      },
    ],
    deeper: [
      { label: { tr: "Okuma yolu: kim neyi okumalı", en: "Reading path: who reads what", tk: "Okaýyş ýoly" }, href: "reading-path", kind: "arf" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework" }, href: "trust-framework", kind: "arf" },
      { label: { tr: "Tamga Rulebook", en: "Tamga Rulebook", tk: "Tamga Rulebook" }, href: "rulebook", kind: "arf" },
      { label: { tr: "Education Rulebook", en: "Education Rulebook", tk: "Education Rulebook" }, href: "rulebooks/education", kind: "arf" },
    ],
  },

  /* ------------------------------------------------------------------ 6.6 */
  {
    slug: "governance",
    chapter: 6,
    order: 6,
    minutes: 5,
    title: { tr: "Yönetişim", en: "Governance", tk: "Dolandyryş" },
    summary: {
      tr: "Bugün geçici işletmeci, devletler katılınca konsey ya da vakıf, sonra ortak defter.",
      en: "A provisional operator today, a council or foundation once states join, then a shared ledger.",
      tk: "Häzir wagtlaýyn operator, döwletler goşulanda geňeş ýa-da gaznaçylyk, soňra umumy kitap.",
    },
    body: {
      tr: (
        <>
          <p>
            Bir ağa güvenmek, onu kimin yönettiğini bilmekle başlar. Tamga Network’ün yönetişimi aşama aşama kurulur: ilk günden
            ağır bir kurum kurulmaz, ama her aşamanın kim tarafından, hangi koşulla devralınacağı baştan yazılıdır.
          </p>
          <h2>Bugün: geçici işletmeci</h2>
          <p>
            Bugün ağı Tamga geçici işletmeci olarak işletir. Türkiye listesini devlet adına yayınlar ve bu durumu açıkça adlandırır:
            listelerde işletmecinin “geçici” olduğu ve kimin adına çalıştığı yazar. Her liste sürümü imzalıdır ve herkese açık bir
            günlüğe işlenir; böylece listenin sessizce değiştirilmediği herkes tarafından denetlenebilir.
          </p>
          <h2>Devletler katılınca: konsey ya da vakıf</h2>
          <p>
            Bir ya da iki devlet katılmaya istekli olduğunda bir yönetişim kurumu kurulur: üye devletlerden oluşan bir konsey ve
            işletmeciliği üstlenecek bir vakıf ya da sekretarya. Listeler sahiplerine devredilir; ağ düzeyindeki kararlar, örneğin
            yeni bir üyenin kabulü ya da ortak bir belge türü, üye devletlerin ortak kararıyla alınır.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Konsey kurulduktan sonra da her devlet kendi listesinde tek söz sahibidir. Konsey yalnız ağın ortak kurallarını
              yönetir; bir devletin kendi kurumları hakkında karar veremez.
            </p>
          </Callout>
          <h2>İki bağımsız işletmeciden sonra: ortak defter</h2>
          <p>
            En az iki bağımsız işletmeci olduğunda kayıtlar izinli bir ortak deftere de yazılır. Böylece tek bir işletmecinin listeyi
            değiştirmesi teknik olarak da zorlaşır. Defter bu aşamaya kadar bilerek ertelenir: tek işletmecinin tuttuğu bir defter
            yeni bir güven eklemez.
          </p>
          <h2>Devir nasıl yapılır?</h2>
          <p>
            Her geçici rolün devri baştan tasarlanmıştır: alan adı, kök sertifikalar, liste arşivi ve anahtarlar yazılı bir halefiyet
            sözleşmesiyle devredilir. Cüzdanlar ve doğrulayıcılar için yalnız adres ve imzacı değişir; kişilerin cüzdanındaki
            belgeler geçerliliğini korur.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Trusting a network starts with knowing who runs it. Tamga Network’s governance is built step by step: no heavy
            institution is set up on day one, but who takes over each stage, and under which conditions, is written down from the
            start.
          </p>
          <h2>Today: a provisional operator</h2>
          <p>
            Today Tamga runs the network as a provisional operator. It publishes Türkiye’s list on behalf of the state and names this
            openly: the lists say that the operator is “provisional” and on whose behalf it acts. Every list version is signed and
            recorded in a public log, so anyone can check that a list was not changed silently.
          </p>
          <h2>Once states join: a council or foundation</h2>
          <p>
            When one or two states are willing to join, a governance body is set up: a council of member states and a foundation or
            secretariat to take over operations. The lists are handed to their owners; network-level decisions, such as admitting a
            new member or a shared credential type, are taken jointly by the member states.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Even after the council is set up, each state has the only say over its own list. The council governs only the network’s
              shared rules; it cannot decide about a state’s own institutions.
            </p>
          </Callout>
          <h2>After two independent operators: a shared ledger</h2>
          <p>
            Once there are at least two independent operators, the records are also written to a permissioned shared ledger. That makes
            it technically harder for a single operator to change a list. The ledger is deliberately postponed until then: a ledger
            kept by a single operator adds no trust.
          </p>
          <h2>How is a hand-over done?</h2>
          <p>
            The hand-over of every provisional role is designed up front: the domain name, the root certificates, the list archive and
            the keys pass under a written succession agreement. For wallets and verifiers only the address and the signer change;
            the credentials in people’s wallets stay valid.
          </p>
        </>
      ),
      tk: (
        <>
          <p>Tora ynanmak ony kimiň dolandyrýandygyny bilmekden başlaýar. Dolandyryş tapgyrlaýyn gurulýar.</p>
          <h2>Häzir: wagtlaýyn operator</h2>
          <p>Häzir tory Tamga wagtlaýyn operator hökmünde işledýär we muny açyk aýdýar. Her sanaw wersiýasy gol çekilýär we açyk ýazga girizilýär.</p>
          <h2>Döwletler goşulanda: geňeş ýa-da gaznaçylyk</h2>
          <p>Bir-iki döwlet goşulmaga taýýar bolanda dolandyryş edarasy döredilýär; sanawlar eýelerine geçýär, umumy kararlar agza döwletleriň bilelikdäki karary bilen kabul edilýär.</p>
          <Callout kind="turkic" locale="tk">
            <p>Geňeş döredilenden soň hem her döwlet öz sanawynda ýeke-täk söz eýesidir.</p>
          </Callout>
          <h2>Iki garaşsyz operatordan soň: umumy kitap</h2>
          <p>Azyndan iki garaşsyz operator bolanda ýazgylar rugsatly umumy kitaba hem ýazylýar.</p>
          <h2>Geçiriş nädip edilýär?</h2>
          <p>Domen ady, kök sertifikatlar we açarlar ýazmaça şertnama bilen geçirilýär; adamlaryň resminamalary hereketde galýar.</p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Bugün Tamga geçici işletmecidir ve bunu listelerde açıkça yazar; her liste sürümü herkese açık bir günlüğe işlenir.",
        en: "Today Tamga is the provisional operator and says so in the lists; every list version is recorded in a public log.",
        tk: "Häzir Tamga wagtlaýyn operator we muny sanawlarda açyk ýazýar.",
      },
      {
        tr: "Devletler katılınca konsey ve vakıf kurulur; her devlet yine kendi listesinin tek sahibidir.",
        en: "Once states join, a council and a foundation are set up; each state still solely owns its list.",
        tk: "Döwletler goşulanda geňeş we gaznaçylyk döredilýär; her döwlet öz sanawynyň eýesi bolup galýar.",
      },
      {
        tr: "Ortak defter en az iki bağımsız işletmeciyle gelir; devirler yazılı sözleşmeyle baştan tasarlanmıştır.",
        en: "The shared ledger arrives with at least two independent operators; hand-overs are designed up front in writing.",
        tk: "Umumy kitap azyndan iki garaşsyz operator bilen gelýär.",
      },
    ],
    deeper: [
      { label: { tr: "Trust Framework: yönetişim", en: "Trust Framework: governance", tk: "Trust Framework: dolandyryş" }, href: "trust-framework", kind: "arf" },
      { label: { tr: "ADR-0009: zincirsiz beta ve zincir eşiği", en: "ADR-0009: chainless beta and chain threshold", tk: "ADR-0009" }, href: "/adr/0009-phase-b-chainless-beta-and-chain-threshold", kind: "docs" },
      { label: { tr: "Bizde neden henüz blockchain yok?", en: "Why no blockchain yet?", tk: "Näme üçin entek blokçeýn ýok?" }, href: "/learn/why-not-blockchain-yet", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.7 */
  {
    slug: "open-source",
    chapter: 6,
    order: 7,
    minutes: 4,
    title: { tr: "Açık kod", en: "Open source", tk: "Açyk kod" },
    summary: {
      tr: "Paketler, lisanslar ve uyum testleri: herkesin aynı kodu kullanıp aynı sonucu alması.",
      en: "Packages, licences and conformance tests: everyone can use the same code and get the same result.",
      tk: "Paketler, ygtyýarnamalar we laýyklyk synaglary: hemmeler şol bir kody ulanyp şol bir netijäni alýar.",
    },
    body: {
      tr: (
        <>
          <p>
            Bir güven ağının kuralları ne kadar açık olursa olsun, onları uygulayan yazılım kapalıysa kimse sonuçtan emin olamaz.
            Tamga Network bu yüzden kodunu açık tutar: herkes okuyabilir, çalıştırabilir, denetleyebilir.
          </p>
          <h2>Paketler</h2>
          <p>
            Ağın yazılımı küçük, ayrı paketlere bölünmüştür. Bir doğrulayıcı yalnız doğrulama paketini, bir cüzdan geliştiricisi
            yalnız cüzdan çekirdeğini kullanabilir:
          </p>
          <ul>
            <li><strong>trust:</strong> imzalı güven listelerini okur ve doğrular.</li>
            <li><strong>verifier:</strong> bir belgenin baştan sona doğrulanması; istek oluşturma.</li>
            <li><strong>issuer:</strong> belge verme ve iptal listesi yayını.</li>
            <li><strong>wallet-core:</strong> cüzdanın çekirdeği: anahtarlar, belge alma, gösterme.</li>
            <li><strong>sd-jwt, mdoc, schemas, core:</strong> belge biçimleri, belge türü kataloğu ve ortak yapı taşları.</li>
          </ul>
          <h2>Lisanslar</h2>
          <p>
            Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. Bu, kurumların ve şirketlerin kodu kendi ürünlerinde serbestçe
            kullanabileceği, değiştirebileceği ve belgeleri kaynak göstererek paylaşabileceği anlamına gelir.
          </p>
          <h2>Uyum testleri</h2>
          <p>
            Aynı kuralları uygulayan iki farklı yazılımın aynı sonuca varması gerekir. Bunun için ağın{" "}
            <Term tip="Bir yazılımın ağın kurallarına uyup uymadığını ölçen, herkesin çalıştırabileceği hazır test kümesi." en="conformance tests">uyum testleri</Term>{" "}
            vardır: hazır örnek belgeler ve beklenen sonuçlar. Bir cüzdan, doğrulayıcı ya da belge veren bu testleri geçerek ağın
            kurallarına uyduğunu gösterir. Testleri geçmek için Tamga’nın paketlerini kullanmak zorunlu değildir; şartnameye uyan her
            uygulama geçebilir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Açık kod, bir devletin bu altyapıyı kendi sunucularında, kendi denetimiyle çalıştırabilmesi demektir. Ağa güvenmek
              için kimsenin sözüne güvenmek gerekmez; kod herkesin önündedir.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            However open a trust network’s rules are, if the software that applies them is closed, nobody can be sure of the outcome.
            That is why Tamga Network keeps its code open: anyone can read it, run it and audit it.
          </p>
          <h2>Packages</h2>
          <p>
            The network’s software is split into small, separate packages. A verifier can use just the verification package, a wallet
            developer just the wallet core:
          </p>
          <ul>
            <li><strong>trust:</strong> reads and verifies the signed trust lists.</li>
            <li><strong>verifier:</strong> end-to-end verification of a credential; building requests.</li>
            <li><strong>issuer:</strong> issuance and status-list publishing.</li>
            <li><strong>wallet-core:</strong> the core of a wallet: keys, receiving and presenting credentials.</li>
            <li><strong>sd-jwt, mdoc, schemas, core:</strong> credential formats, the credential-type catalogue and shared building blocks.</li>
          </ul>
          <h2>Licences</h2>
          <p>
            The code is licensed under Apache-2.0, the documents under CC BY 4.0. Institutions and companies can freely use and
            change the code in their own products and share the documents with attribution.
          </p>
          <h2>Conformance tests</h2>
          <p>
            Two different pieces of software applying the same rules must reach the same result. For that the network has{" "}
            <Term tip="A ready-made test set anyone can run to check whether software follows the network's rules." en="conformance tests">conformance tests</Term>:
            sample credentials and their expected results. A wallet, verifier or issuer shows that it follows the network’s rules by
            passing them. Using Tamga’s packages is not required to pass; any implementation that follows the specification can.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Open code means a state can run this infrastructure on its own servers, under its own control. Trusting the network
              doesn’t require taking anyone’s word for it; the code is there for everyone to see.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Düzgünler näçe açyk bolsa-da, programma ýapyk bolsa hiç kim netijä ynanyp bilmez. Şonuň üçin Tamga Network kodyny açyk saklaýar.</p>
          <h2>Paketler</h2>
          <ul>
            <li><strong>trust:</strong> gol çekilen sanawlary okaýar we barlaýar.</li>
            <li><strong>verifier:</strong> resminamany başdan-aýak barlamak.</li>
            <li><strong>issuer:</strong> resminama bermek.</li>
            <li><strong>wallet-core:</strong> gapjygyň özeni.</li>
            <li><strong>sd-jwt, mdoc, schemas, core:</strong> görnüşler we umumy bölekler.</li>
          </ul>
          <h2>Ygtyýarnamalar</h2>
          <p>Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamasy bilen.</p>
          <h2>Laýyklyk synaglary</h2>
          <p>
            Toruň{" "}
            <Term tip="Programmanyň düzgünlere eýerýändigini barlaýan taýýar synag toplumy." en="conformance tests">laýyklyk synaglary</Term>{" "}
            bar. Synaglardan geçmek üçin Tamga-nyň paketlerini ulanmak hökmany däl.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>Açyk kod döwletiň bu ulgamy öz serwerlerinde, öz gözegçiliginde işledip biljekdigini aňladýar.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağın yazılımı açık kaynaklı, küçük paketlerdir; herkes okuyabilir, çalıştırabilir, denetleyebilir.",
        en: "The network’s software is open-source, in small packages; anyone can read, run and audit it.",
        tk: "Toruň programmasy açyk çeşmeli kiçi paketlerdir.",
      },
      {
        tr: "Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır.",
        en: "Code is Apache-2.0, documents are CC BY 4.0.",
        tk: "Kod Apache-2.0, resminamalar CC BY 4.0.",
      },
      {
        tr: "Uyum testleri, şartnameye uyan her yazılımın aynı sonuca vardığını gösterir.",
        en: "Conformance tests show that any software following the specification reaches the same result.",
        tk: "Laýyklyk synaglary şol bir netijä ýetilýändigini görkezýär.",
      },
    ],
    deeper: [
      { label: { tr: "Paketler", en: "Packages", tk: "Paketler" }, href: "/packages/", kind: "docs" },
      { label: { tr: "Uyum testleri", en: "Conformance tests", tk: "Laýyklyk synaglary" }, href: "/guides/conformance", kind: "docs" },
      { label: { tr: "SDK sayfası", en: "SDK page", tk: "SDK sahypasy" }, href: "/sdk", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.8 */
  {
    slug: "first-wallet",
    chapter: 6,
    order: 8,
    minutes: 4,
    title: { tr: "İlk cüzdan: Tamga Wallet", en: "The first wallet: Tamga Wallet", tk: "Ilkinji gapjyk: Tamga Wallet" },
    summary: {
      tr: "Ağın ilk cüzdanı; ağ onu işletmez, ağın kurallarına her cüzdan gibi uyar, tek cüzdan değildir.",
      en: "The network's first wallet; the network doesn't run it, it follows the network's rules like any other wallet and is not the only one.",
      tk: "Toruň ilkinji gapjygy; tor ony işletmeýär, toruň düzgünlerine beýleki gapjyklar ýaly eýerýär, ýeke-täk gapjyk däl.",
    },
    diagram: "disclosure",
    body: {
      tr: (
        <>
          <p>
            Bir ağın işe yaradığını göstermenin en iyi yolu, onu gerçekten kullanan bir cüzdandır. Tamga Wallet bu ağın ilk
            cüzdanıdır: kişilerin belgelerini telefonlarında taşıması ve yalnız gereken bilgiyi göstermesi için geliştirilen,
            AB uyumlu bir uygulama.
          </p>
          <h2>Ağın parçası değil, katılımcısı</h2>
          <p>
            Tamga Wallet ayrı bir üründür; kendi ekibi, kendi kararları ve kendi sitesi vardır. Ağa diğer her cüzdan gibi katılır:
            cüzdan kurallarına uyduğunu gösterir ve cüzdan sağlayıcısı olarak listeye girer. Ağ ona bir ayrıcalık tanımaz; kurallara
            uyan her cüzdan ağda aynı haklara sahiptir. Ağ cüzdan işletmez: uygulamayı, cüzdan sağlayıcısını ve sitesini Tamga
            Wallet kendisi işletir; cüzdanın tanıtımı kendi sitesindedir.
          </p>
          <h2>Ne işe yarar?</h2>
          <ul>
            <li>Kurumlardan belge almak: QR kodu tarayarak ya da uygulamadan kurumu bularak.</li>
            <li>Belgeleri telefonda saklamak: belgeler sunucuda değil, cihazda durur.</li>
            <li>Yalnız gerekeni göstermek: hangi bilginin gideceğini görmek ve onaylamak.</li>
            <li>Web sitelerine “Tamga ile giriş yap” ile girmek: her site için ayrı bir takma adla.</li>
            <li>Kime neyi gösterdiğini görmek: kayıt yalnız kişinin telefonunda tutulur.</li>
          </ul>
          <Callout kind="info" locale="tr">
            <p>
              Tamga Wallet “AB uyumlu” bir cüzdandır. “EUDI Wallet” unvanı, bir AB üye devletinin sunduğu ya da tanıdığı
              cüzdanlara ayrılmıştır; Tamga Wallet bu unvanı kullanmaz ve ulusal kimlik cüzdanı değildir.
            </p>
          </Callout>
          <h2>İlk cüzdan neden önemli?</h2>
          <p>
            Kurallar kâğıt üzerinde doğru olabilir, ama gerçek bir telefonda, gerçek bir kullanıcıyla çalışmaları gerekir. Tamga
            Wallet bu kuralların uygulanabilir olduğunu gösterir ve başka cüzdan yapmak isteyenlere örnek olur. Cüzdan
            sağlayıcısı olmak isteyen her ekip aynı açık paketleri ve aynı uyum testlerini kullanabilir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Ağın hedefi tek bir cüzdan değil, Türk dünyasının farklı ülkelerinden çıkacak birçok uyumlu cüzdandır. Bir kişi hangi
              cüzdanı seçerse seçsin, belgesi ağın her yerinde aynı şekilde doğrulanır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            The best way to show that a network works is a wallet that actually uses it. Tamga Wallet is this network’s first wallet:
            an EU-compatible app built so that people can carry their credentials on their phones and show only the information
            that is needed.
          </p>
          <h2>A participant, not part of the network</h2>
          <p>
            Tamga Wallet is a separate product with its own team, its own decisions and its own site. It joins the network like any
            other wallet: it shows that it follows the wallet rules and is listed as a wallet provider. The network gives it no
            privilege; every wallet that follows the rules has the same rights on the network. The network runs no wallet: Tamga
            Wallet runs its own app, wallet provider and site, and the wallet is presented on its own site.
          </p>
          <h2>What does it do?</h2>
          <ul>
            <li>Receive credentials from institutions, by scanning a QR code or finding the institution in the app.</li>
            <li>Keep credentials on the phone: they sit on the device, not on a server.</li>
            <li>Show only what is needed: see which information will be shared and approve it.</li>
            <li>Sign in to websites with “Sign in with Tamga”, with a different pseudonym for each site.</li>
            <li>See what was shown to whom: the record is kept only on the person’s phone.</li>
          </ul>
          <Callout kind="info" locale="en">
            <p>
              Tamga Wallet is an “EU-compatible” wallet. The title “EUDI Wallet” is reserved for wallets provided or recognised by an
              EU member state; Tamga Wallet doesn’t use that title and is not a national identity wallet.
            </p>
          </Callout>
          <h2>Why does a first wallet matter?</h2>
          <p>
            Rules can be right on paper, but they have to work on a real phone with a real user. Tamga Wallet shows that these rules
            can be implemented and serves as an example for others who want to build a wallet. Any team that wants to become a wallet
            provider can use the same open packages and the same conformance tests.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              The network’s goal is not a single wallet but many compatible wallets from different countries of the Turkic world.
              Whichever wallet a person chooses, their credential is verified the same way everywhere on the network.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Toruň işleýändigini görkezmegiň iň gowy ýoly ony ulanýan gapjykdyr. Tamga Wallet bu toruň ilkinji gapjygy: ÝB bilen laýyk programma.</p>
          <h2>Toruň bölegi däl, gatnaşyjysy</h2>
          <p>Tamga Wallet aýry önüm; öz topary we öz sahypasy bar. Tora beýleki gapjyklar ýaly goşulýar; tor oňa hiç hili artykmaçlyk bermeýär. Tor gapjyk işletmeýär: programmany, gapjyk üpjün edijini we sahypany Tamga Wallet özi işledýär.</p>
          <h2>Näme üçin gerek?</h2>
          <ul>
            <li>Guramalardan resminama almak.</li>
            <li>Resminamalary telefonda saklamak.</li>
            <li>Diňe gerek zady görkezmek.</li>
            <li>“Tamga bilen gir” arkaly her sahypa üçin aýry lakam bilen girmek.</li>
          </ul>
          <Callout kind="info" locale="tk">
            <p>Tamga Wallet “ÝB bilen laýyk” gapjyk. “EUDI Wallet” ady ÝB agza döwletleriniň gapjyklaryna degişli.</p>
          </Callout>
          <h2>Ilkinji gapjyk näme üçin möhüm?</h2>
          <p>Ol düzgünleriň hakyky telefonda işleýändigini görkezýär. Gapjyk etmek isleýän her topar şol bir paketleri we synaglary ulanyp bilýär.</p>
          <Callout kind="turkic" locale="tk">
            <p>Toruň maksady bir gapjyk däl, türki dünýäsiniň dürli ýurtlaryndan köp laýyk gapjyk.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga Wallet ağın ilk cüzdanıdır; ayrı bir üründür, ağ onu işletmez ve ağa diğer cüzdanlar gibi katılır.",
        en: "Tamga Wallet is the network’s first wallet; it is a separate product, the network doesn’t run it, and it joins like any other wallet.",
        tk: "Tamga Wallet toruň ilkinji gapjygy; aýry önüm, tor ony işletmeýär.",
      },
      {
        tr: "Belgeler telefonda durur; kişi yalnız gerekeni gösterir ve her siteye ayrı takma adla girer.",
        en: "Credentials stay on the phone; the person shows only what is needed and uses a separate pseudonym for each site.",
        tk: "Resminamalar telefonda durýar; adam diňe gerek zady görkezýär.",
      },
      {
        tr: "Tamga Wallet “AB uyumlu” bir cüzdandır; EUDI Wallet ya da ulusal kimlik cüzdanı değildir.",
        en: "Tamga Wallet is an “EU-compatible” wallet; it is not an EUDI Wallet or a national identity wallet.",
        tk: "Tamga Wallet “ÝB bilen laýyk” gapjyk; EUDI Wallet däl.",
      },
    ],
    deeper: [
      { label: { tr: "Cüzdan kuralları", en: "Wallet rules", tk: "Gapjyk düzgünleri" }, href: "/specifications/wallet", kind: "docs" },
      { label: { tr: "Cüzdan geliştirmek", en: "Building a wallet", tk: "Gapjyk düzmek" }, href: "/guides/build-a-wallet", kind: "docs" },
      { label: { tr: "ADR-0030: ürün adları", en: "ADR-0030: product names", tk: "ADR-0030: önüm atlary" }, href: "/adr/0030-product-names", kind: "docs" },
      { label: { tr: "ADR-0042: ağ ve cüzdanlar", en: "ADR-0042: network and wallets", tk: "ADR-0042: tor we gapjyklar" }, href: "/adr/0042-network-and-wallets", kind: "docs" },
    ],
  },
];

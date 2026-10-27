import type { LearnPage } from "./types";
import { Callout, Figure, Term } from "@/components/learn/prose";
import { ExternalLink } from "@/components/external-link";
import { tamgaWalletUrl } from "@/lib/ecosystem";

/* Bölüm 6 — Tamga Network: ağın ne olduğu, neden Türk dünyası, roller, katmanlar, kurallar, yönetişim, açık kod, ilk cüzdan. */

export const CHAPTER_6: LearnPage[] = [
  /* ------------------------------------------------------------------ 6.1 */
  {
    slug: "what-is-tamga-network",
    chapter: 6,
    order: 1,
    minutes: 5,
    title: { tr: "Tamga Network nedir?", en: "What is Tamga Network?", tk: "Tamga Network näme?", az: "Tamga Network nədir?" },
    summary: {
      tr: "Türk dünyası için dijital, AB uyumlu güven ağı: ne yapar, ne yapmaz.",
      en: "The digital, EU-compatible trust network for the Turkic world: what it does and what it doesn't.",
      tk: "Türki dünýäsi üçin sanly, ÝB bilen laýyk ynam tory: näme edýär we näme etmeýär.",
      az: "Türk dünyası üçün rəqəmsal, Aİ ilə uyğun etibar şəbəkəsi: nə edir və nə etmir.",
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
            Tamga Network, Türk dünyası için dijital güven ağıdır. Ağ üç şey sağlar: herkesin aynı şekilde uyduğu
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
            Tamga Network is the digital trust network for the Turkic world. It provides three things: open rules that everyone
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
            Tamga Network türki dünýäsi üçin sanly ynam torudyr. Tor üç zady üpjün edýär: hemmeleriň birmeňzeş eýerýän açyk
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
      az: (
        <>
          <p>
            Əvvəlki fəsillərdə rəqəmsal sənədin necə imzalandığını, rəqəmsal cüzdanda necə saxlandığını və yalnız lazım olan
            məlumatın necə göstərildiyini gördük. Bir sual qalır: Daşkənddəki işəgötürən Bakıda verilmiş rəqəmsal sənədi görəndə
            onun arxasında duran qurumun həqiqətən mövcud olduğunu və sənəd verməyə səlahiyyətli olduğunu haradan bilsin? Tamga
            Network bu suala ortaq cavabdır.
          </p>
          <h2>Qısaca</h2>
          <p>
            Tamga Network Türk dünyası üçün rəqəmsal etibar şəbəkəsidir. O, üç şey təmin edir: hamının eyni şəkildə əməl etdiyi
            açıq qaydalar, hansı qurumlara etibar etmək olduğunu bildirən imzalı <Term tip="Bir ölkənin sənədi verən qurumlarını, yoxlayan tərəflərini və cüzdan provayderlərini sadalayan imzalı, versiyalı siyahı." en="trust list">etibar siyahıları</Term> və
            bu qaydaları tətbiq edən açıq mənbəli proqram təminatı. Rəqəmsal sənədin özü heç vaxt şəbəkəyə yazılmır; şəbəkə
            yalnız “kimə etibar edə bilərsiniz?” sualına cavab verir.
          </p>
          <p>
            Formatlar və protokollar Avropa İttifaqının (Aİ) rəqəmsal şəxsiyyət standartları ilə eynidir. Buna görə Tamga-da
            verilmiş rəqəmsal sənəd Aİ-nin dilində danışan rəqəmsal cüzdanlar və yoxlayan tərəflərlə də işləyə bilər.
          </p>
          <h2>Nə edir?</h2>
          <ul>
            <li>
              <strong>Qaydaları yazır və dərc edir:</strong> kim qoşula bilər, hər rol nəyə əməl etməlidir, rəqəmsal sənəd növü
              necə müəyyən edilir. Bu qaydalar Tamga ARF-də toplanır.
            </li>
            <li>
              <strong>Etibar siyahılarını idarə edir:</strong> hər ölkənin siyahısını və hamısına istinad edən siyahılar
              siyahısını imzalı, versiyalı və hamı üçün açıq şəkildə dərc edir.
            </li>
            <li>
              <strong>Ortaq məlumatları saxlayır:</strong> rəqəmsal sənəd növlərinin kataloqu, sahə adları və sxemlər.
            </li>
            <li>
              <strong>Açıq kod təqdim edir:</strong> yoxlama, sənəd vermə və cüzdan nüvəsi üçün paketlər, həmçinin uyğunluq testləri.
            </li>
          </ul>
          <h2>Nə etmir?</h2>
          <p>
            Şəbəkə fərdi məlumat toplamır: rəqəmsal sənədlər şəxsin telefonunda qalır, siyahılara və jurnallara fərdi
            məlumatlar yazılmır. Şəbəkə heç kimin rəqəmsal sənədini onun əvəzinə imzalamır; imza həmişə sənədi verən quruma
            məxsusdur. Şəbəkə heç nə satmır: Tamga Network şirkət deyil, şəbəkədir. İnteqrasiya və ya dəstək kimi kommersiya
            xidmətləri təklif etmək istəyən şirkətlər bunu şəbəkədən kənarda, öz adları ilə edirlər; şəbəkənin qaydaları hamı
            üçün eynidir.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Şəbəkənin əsas işi ölkələrin siyahılarını bir araya gətirməkdir. Hazırda Türkiyənin siyahısını dövlət adından
              müvəqqəti olaraq Tamga dərc edir. Türk dövlətlərindən biri öz siyahısını dərc etdikdə şəbəkə ona istinad edir;
              rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız siyahının ünvanı dəyişir.
            </p>
          </Callout>
          <h2>Niyə “şəbəkə”?</h2>
          <p>
            Çünki etibar tək bir mərkəzdən gəlmir. Rəqəmsal sənədi qurum imzalayır, qurumu öz siyahısında dövlət və ya onun
            səlahiyyət verdiyi orqan tanıyır, siyahını isə hər kəs yoxlaya bilər. Şəbəkə bu hissələri bir-birinə bağlayan ortaq
            qaydalar və ortaq dildir. Növbəti səhifələrdə onlara bir-bir baxacağıq.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga Network; açık kurallar, imzalı güven listeleri ve açık kaynak yazılımdan oluşan dijital bir güven ağıdır.",
        en: "Tamga Network is a digital trust network made of open rules, signed trust lists and open-source software.",
        tk: "Tamga Network açyk düzgünlerden, gol çekilen ynam sanawlaryndan we açyk çeşmeli programmadan ybarat sanly ynam torudyr.",
        az: "Tamga Network açıq qaydalardan, imzalı etibar siyahılarından və açıq mənbəli proqram təminatından ibarət rəqəmsal etibar şəbəkəsidir.",
      },
      {
        tr: "Belgeler ve kişisel veri ağa yazılmaz; ağ yalnız “kime güvenebilirsin” sorusunu cevaplar.",
        en: "Credentials and personal data are never written to the network; it only answers “whom can you trust?”.",
        tk: "Resminamalar we şahsy maglumat tora ýazylmaýar; tor diňe “kime ynanyp bolar?” diýen soraga jogap berýär.",
        az: "Rəqəmsal sənədlər və fərdi məlumatlar heç vaxt şəbəkəyə yazılmır; şəbəkə yalnız “kimə etibar edə bilərsiniz?” sualına cavab verir.",
      },
      {
        tr: "Ağ hizmet satmaz ve AB standartlarını kullanır; her Türk devleti kendi listesinin sahibi olabilir.",
        en: "The network sells nothing and uses EU standards; each Turkic state can own its own list.",
        tk: "Tor hiç zat satmaýar we ÝB standartlaryny ulanýar; her türki döwlet öz sanawynyň eýesi bolup biler.",
        az: "Şəbəkə heç nə satmır və Aİ standartlarından istifadə edir; hər Türk dövləti öz siyahısının sahibi ola bilər.",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: mimari", en: "Tamga ARF: architecture", tk: "Tamga ARF: arhitektura", az: "Tamga ARF: memarlıq" }, href: "architecture", kind: "arf" },
      { label: { tr: "ADR-0037: Tamga Network yalnızca bir ağdır", en: "ADR-0037: Tamga Network is only a network", tk: "ADR-0037: Tamga Network diňe tor", az: "ADR-0037: Tamga Network yalnız şəbəkədir" }, href: "/adr/0037-network-only", kind: "docs" },
      { label: { tr: "Kavramlar: güven listeleri", en: "Concepts: trust lists", tk: "Düşünjeler: ynam sanawlary", az: "Anlayışlar: etibar siyahıları" }, href: "/concepts/trust-lists", kind: "docs" },
    ],
  },

  /* ------------------------------------------------------------------ 6.2 */
  {
    slug: "why-turkic-world",
    chapter: 6,
    order: 2,
    minutes: 4,
    title: { tr: "Neden Türk dünyası?", en: "Why the Turkic world?", tk: "Näme üçin türki dünýäsi?", az: "Niyə Türk dünyası?" },
    summary: {
      tr: "Diller, sınırlar, ortak tarih ve Avrupa ile köprü: bu ağın Türk dünyasında neden anlamlı olduğu.",
      en: "Languages, borders, a shared history and a bridge to Europe: why this network makes sense for the Turkic world.",
      tk: "Diller, serhetler, umumy taryh we Ýewropa bilen köpri: bu toruň türki dünýäsinde näme üçin manyly bolýandygy.",
      az: "Dillər, sərhədlər, ortaq tarix və Avropa ilə körpü: bu şəbəkənin Türk dünyası üçün niyə məna kəsb etdiyi.",
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
      az: (
        <>
          <p>
            Türk dünyasında insanlar sərhədləri tez-tez keçir. Almatıda oxuyan tələbə təcrübə keçmək üçün İstanbula gəlir,
            Bişkekdən olan mühəndis Bakıda iş tapır, Aşqabaddan olan həkim Ankarada ixtisaslaşmaq istəyir. Hər dəfə eyni sual
            yaranır: bu sənədi kim və necə yoxlayacaq?
          </p>
          <h2>Bugünkü vəziyyət</h2>
          <p>
            Hər ölkənin öz qurumları, öz sistemləri və öz kağızları var. Sənəd sərhədi keçəndə çox vaxt onu yenidən təsdiqlətmək,
            tərcümə etdirmək və şəxsən təhvil vermək lazım gəlir. Yoxlayan qurum sənədi verən quruma zəng edir və ya e-poçt yazır;
            cavab günlərlə, bəzən həftələrlə çəkir. Bu arada saxta sənədlər də eyni kağızla dolaşır.
          </p>
          <h2>Bizi artıq birləşdirənlər</h2>
          <p>
            Türk dövlətləri arasında artıq güclü bağlar var: qohum dillər, ortaq tarix, iqtisadi və mədəni əməkdaşlıq, həmçinin
            Türk Dövlətləri Təşkilatı kimi ortaq qurumlar. Etibar şəbəkəsi bu bağlara texniki zəmin əlavə edir: ölkələr bir-birinin
            qurumlarını tanımaq istədikdə hər dəfə yeni saziş yazmaq əvəzinə eyni qaydalardan və eyni siyahılardan istifadə edirlər.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Şəbəkə heç bir ölkənin qaydalarını digərinə məcbur etmir. Hər dövlət öz siyahısını özü idarə edir və hansı ölkələrin
              qurumlarını tanıyacağına özü qərar verir. Ortaq olan yalnız dil və qaydalardır.
            </p>
          </Callout>
          <h2>Avropa ilə körpü</h2>
          <p>
            Avropa İttifaqı öz rəqəmsal şəxsiyyət cüzdanlarını qurur və tezliklə bir çox xidmət onlarla işləyəcək. Türk dünyası öz
            sistemini bu standartlardan ayrı qursa, Türk dünyasından gələn sənədlər Avropada yenidən kağıza qayıtmalı olacaq. Məhz
            buna görə Tamga Network Avropanın formatlarından və protokollarından olduğu kimi istifadə edir: eyni dildə danışan
            sistemlər bir-birini daha asan tanıyır.
          </p>
          <h2>Kimə fayda verir?</h2>
          <ul>
            <li>İnsanlar: rəqəmsal sənədlərini özləri ilə gəzdirir, yalnız lazım olanı göstərir və sərhəddə gözləmirlər.</li>
            <li>Qurumlar: hər sorğuya ayrıca cavab vermək əvəzinə rəqəmsal sənədi bir dəfə verirlər.</li>
            <li>Yoxlayan tərəflər: mənbəyə müraciət etmədən, saniyələr ərzində rəqəmsal sənədin həqiqi olduğunu görürlər.</li>
            <li>Dövlətlər: öz siyahılarının sahibi olur və qonşuları ilə eyni dildə danışırlar.</li>
          </ul>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Türk dünyasında belgeler sınırı sık geçer; bugün doğrulama yavaş, kâğıda bağlı ve sahteciliğe açık.",
        en: "Documents cross borders often in the Turkic world; verification today is slow, paper-bound and open to forgery.",
        tk: "Türki dünýäsinde resminamalar serhedi ýygy geçýär; häzir barlamak haýal we kagyza bagly.",
        az: "Türk dünyasında sənədlər sərhədləri tez-tez keçir; bu gün yoxlama yavaş, kağızdan asılı və saxtakarlığa açıqdır.",
      },
      {
        tr: "Ağ ülkelere ortak bir dil ve ortak kurallar verir; her devlet kendi listesinin ve kararlarının sahibidir.",
        en: "The network gives countries a shared language and rules; each state owns its list and its decisions.",
        tk: "Tor ýurtlara umumy dil we düzgünler berýär; her döwlet öz sanawynyň eýesidir.",
        az: "Şəbəkə ölkələrə ortaq dil və qaydalar verir; hər dövlət öz siyahısının və qərarlarının sahibidir.",
      },
      {
        tr: "AB standartlarını kullanmak, Türk dünyasının belgelerinin Avrupa yazılımıyla teknik olarak okunmasını sağlar; AB’de hukuki tanınma ise devletler arası anlaşma ister (eIDAS Madde 14).",
        en: "Using EU standards lets European software read Turkic-world credentials; legal recognition in the EU needs an agreement between states (eIDAS Article 14).",
        tk: "ÝB standartlaryny ulanmak resminamalaryň Ýewropa programmalary bilen tehniki taýdan okalmagyny üpjün edýär; ÝB-de hukuky ykrar edilmek üçin döwletleriň arasynda şertnama gerek (eIDAS 14-nji madda).",
        az: "Aİ standartlarından istifadə Avropa proqram təminatına Türk dünyasının rəqəmsal sənədlərini oxumağa imkan verir; Aİ-də hüquqi tanınma isə dövlətlərarası saziş tələb edir (eIDAS 14-cü maddə).",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: konumlanma", en: "Tamga ARF: positioning", tk: "Tamga ARF: ýerleşiş", az: "Tamga ARF: mövqeləndirmə" }, href: "architecture", kind: "arf" },
      { label: { tr: "ADR-0036: güven federasyonu", en: "ADR-0036: trust federation", tk: "ADR-0036: ynam federasiýasy", az: "ADR-0036: etibar federasiyası" }, href: "/adr/0036-trust-federation-external-lists", kind: "docs" },
      { label: { tr: "Senaryolar", en: "Scenarios", tk: "Ssenariler", az: "Ssenarilər" }, href: "/scenarios", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.3 */
  {
    slug: "roles",
    chapter: 6,
    order: 3,
    minutes: 6,
    title: { tr: "Ağda kim ne yapar?", en: "Who does what", tk: "Torda kim näme edýär?", az: "Kim nə edir" },
    summary: {
      tr: "İşletmeci, kayıt kurumu, belge veren, yetkili kaynak, doğrulayan, cüzdan sağlayıcısı, kişi ve devlet: her rol sade dille.",
      en: "Operator, registrar, issuer, authentic source, verifier, wallet provider, person and state: each role in plain words.",
      tk: "Operator, hasaba alyş edarasy, resminama beriji, ygtyýarly çeşme, barlaýjy, gapjyk üpjün ediji, adam we döwlet: her rol ýönekeý dilde.",
      az: "Operator, qeydiyyat orqanı, sənədi verən qurum, mötəbər mənbə, yoxlayan tərəf, cüzdan provayderi, şəxs və dövlət: hər rol sadə dillə.",
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
      az: (
        <>
          <p>
            Şəbəkə onun içindəki hər kəsin nə etdiyi aydın olanda işləyir. Tamga Network-da səkkiz rol var. Bir qurum birdən çox
            rolu öz üzərinə götürə bilər; məsələn, universitet həm rəqəmsal sənəd verir, həm də yoxlayır. Hər rolun dəqiq
            qaydaları Tamga ARF-dədir; burada hər birini sadə dillə izah edirik.
          </p>
          <h2>Şəbəkəni idarə edənlər</h2>
          <h3>Operator</h3>
          <p>
            Etibar siyahılarını dərc edir, kök açarlarını qoruyur, siyahıların hər versiyasını imzalayır və açıq jurnal aparır.
            Hazırda bu rolu müvəqqəti olaraq Tamga öz üzərinə götürür. Dövlət öz siyahısını idarə etməyə başladıqda həmin siyahı
            onun operatoruna təhvil verilir.
          </p>
          <h3>Qeydiyyat orqanı</h3>
          <p>
            Qoşulmaq istəyənlərin müraciətlərini qəbul edir: qurumun həqiqətən mövcud olduğunu, rəsmi qeydiyyat nömrəsini, əlaqə
            məlumatlarını və hansı rəqəmsal sənədləri vermək və ya tələb etmək istədiyini yoxlayır. Hər şey qaydasındadırsa,
            qeydi siyahıya daxil edir.
          </p>
          <h2>Rəqəmsal sənəd yaradanlar</h2>
          <h3>Sənədi verən qurum</h3>
          <p>
            Rəqəmsal sənədi verən qurum: universitet, xəstəxana, peşə palatası, bilet satıcısı. Rəqəmsal sənədi öz açarı ilə
            imzalayır və lazım olduqda ləğv edir. Açar qurumun özündə qalır; şəbəkə onu saxlamır.
          </p>
          <h3>Mötəbər mənbə</h3>
          <p>
            Rəqəmsal sənəddəki məlumatın əsl qeydini saxlayan sistem: universitetin tələbə informasiya sistemi, palatanın üzv
            reyestri. Sənədi verən qurum sənədi verərkən məlumatı buradan oxuyur. Çox vaxt sənədi verən qurum və mötəbər mənbə
            eyni qurumdur.
          </p>
          <h2>Rəqəmsal sənəddən istifadə edənlər</h2>
          <h3>Şəxs</h3>
          <p>
            Rəqəmsal sənədin sahibi. Onu öz rəqəmsal cüzdanında gəzdirir, kimə nə göstərəcəyinə özü qərar verir və hər paylaşımı
            təsdiqləyir.
          </p>
          <h3>Yoxlayan tərəf</h3>
          <p>
            Rəqəmsal sənəd tələb edən tərəf: işəgötürən, veb-sayt, tədbirin giriş qapısı. Avropada ona{" "}
            <Term tip="Rəqəmsal sənəd tələb edən və xidmət göstərmək üçün ona əsaslanan tərəf." en="relying party">relying party</Term> deyilir.
            Şəbəkədə qeydiyyatdadır və yalnız qeydiyyatında göstərilən məlumatları tələb edə bilər; daha çoxunu istəsə, cüzdan
            bunu şəxsə göstərir.
          </p>
          <h3>Cüzdan provayderi</h3>
          <p>
            Cüzdan tətbiqini hazırlayan və idarə edən təşkilat. Şəbəkənin cüzdan qaydalarına əməl etdiyini uyğunluq testləri ilə
            göstərir və bundan sonra siyahıya daxil edilir. Hər cüzdan öz cüzdan provayderini özü idarə edir; şəbəkə heç birini
            idarə etmir (şəbəkənin ilk cüzdanı olan Tamga Wallet da öz provayderini özü idarə edir). Şəbəkə cüzdan seçmir;
            qaydalara əməl edən hər cüzdan provayderini tanıyır.
          </p>
          <h2>Dövlət</h2>
          <p>
            Ölkənin etibar siyahısının sahibi. Siyahıda hansı qurumların olacağına və hansı ölkələrin siyahılarını tanıyacağına
            qərar verir. Dövlət qoşulana qədər bu rolu onun adından müvəqqəti operator yerinə yetirir; dövlət qoşulduqda rol ona
            keçir.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Eyni qurum müxtəlif ölkələrdə müxtəlif rollarda çıxış edə bilər: Bişkekdəki universitet öz diplomlarını verir,
              Almatıdakı şirkət isə yoxlayan tərəf kimi həmin diplomu tələb edir. Qaydalar hər iki ölkədə eynidir.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağı işletmeci ve kayıt kurumu yürütür; belgeyi belge veren üretir, bilgi yetkili kaynaktan gelir.",
        en: "The operator and the registrar run the network; the issuer produces the credential, the data comes from the authentic source.",
        tk: "Tory operator we hasaba alyş edarasy alyp barýar; resminamany beriji öndürýär, maglumat ygtyýarly çeşmeden gelýär.",
        az: "Şəbəkəni operator və qeydiyyat orqanı idarə edir; rəqəmsal sənədi sənədi verən qurum yaradır, məlumat mötəbər mənbədən gəlir.",
      },
      {
        tr: "Kişi belgesinin sahibidir; doğrulayıcı yalnız kaydında yazanı isteyebilir; cüzdan sağlayıcısı uyum testleriyle listeye girer.",
        en: "The person owns the credential; a verifier may ask only for what its registration allows; wallet providers are listed after conformance tests.",
        tk: "Adam resminamanyň eýesi; barlaýjy diňe hasabyndaky zady sorap bilýär; gapjyk üpjün edijiler laýyklyk synaglaryndan soň sanawa girýär.",
        az: "Rəqəmsal sənədin sahibi şəxsdir; yoxlayan tərəf yalnız qeydiyyatının icazə verdiyini tələb edə bilər; cüzdan provayderləri uyğunluq testlərindən sonra siyahıya daxil edilir.",
      },
      {
        tr: "Her devlet kendi listesinin sahibidir; katılana kadar geçici işletmeci onun adına çalışır.",
        en: "Each state owns its list; until it joins, the provisional operator acts on its behalf.",
        tk: "Her döwlet öz sanawynyň eýesi; goşulýança wagtlaýyn operator onuň adyndan işleýär.",
        az: "Hər dövlət öz siyahısının sahibidir; qoşulana qədər onun adından müvəqqəti operator çıxış edir.",
      },
    ],
    deeper: [
      { label: { tr: "Tamga ARF: roller", en: "Tamga ARF: roles", tk: "Tamga ARF: rollar", az: "Tamga ARF: rollar" }, href: "roles", kind: "arf" },
      { label: { tr: "Tamga Rulebook: her rolün kuralları", en: "Tamga Rulebook: the rules for each role", tk: "Tamga Rulebook: rollaryň düzgünleri", az: "Tamga Rulebook: hər rolun qaydaları" }, href: "rulebook", kind: "arf" },
      { label: { tr: "Katılım süreci", en: "Onboarding", tk: "Goşulyş tertibi", az: "Qoşulma prosesi" }, href: "onboarding", kind: "arf" },
    ],
  },

  /* ------------------------------------------------------------------ 6.4 */
  {
    slug: "network-layers",
    chapter: 6,
    order: 4,
    minutes: 5,
    title: { tr: "Ağın katmanları", en: "The layers of the network", tk: "Toruň gatlaklary", az: "Şəbəkənin qatları" },
    summary: {
      tr: "Kurallar, listeler, belge biçimleri, açık paketler, cüzdanlar ve ileride ortak defter.",
      en: "Rules, lists, credential formats, open packages, wallets and, later, a shared ledger.",
      tk: "Düzgünler, sanawlar, resminama görnüşleri, açyk paketler, gapjyklar we soňra umumy kitap.",
      az: "Qaydalar, siyahılar, rəqəmsal sənəd formatları, açıq paketlər, rəqəmsal cüzdanlar və gələcəkdə ortaq reyestr.",
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
      az: (
        <>
          <p>
            Tamga Network-u üst-üstə qoyulmuş qatlar kimi təsəvvür etmək işi asanlaşdırır. Hər qat altındakına söykənir və hər
            birinin aydın vəzifəsi var. Altı qat mövcuddur; altıncısı bu gün yox, gələcəkdə gələcək.
          </p>
          <h2>1. Qaydalar</h2>
          <p>
            Ən altda yazılı qaydalar durur: Tamga ARF, Trust Framework, Tamga Rulebook və hər rəqəmsal sənəd növü üçün ayrıca
            rulebook. Bütün digər qatlar bu qaydalara əsasən işləyir.
          </p>
          <h2>2. Etibar siyahıları</h2>
          <p>
            Qaydaların “kimə etibar etmək olar” sualına cavabı. Hər ölkənin siyahısı onun qurumlarını, yoxlayan tərəflərini və
            cüzdan provayderlərini sadalayır; <Term tip="Bütün ölkə siyahılarına istinad edən ən yuxarıdakı imzalı siyahı." en="List of Trusted Lists (LOTL)">siyahılar siyahısı</Term> onları
            bir araya gətirir. Siyahılar imzalıdır, hər versiya əvvəlkinə bağlıdır və hər kəs onları yoxlaya bilər.
          </p>
          <h2>3. Rəqəmsal sənəd formatları və protokollar</h2>
          <p>
            Rəqəmsal sənədin necə yazıldığı və necə ötürüldüyü: internet üçün SD-JWT VC, üzbəüz istifadə üçün mdoc; rəqəmsal
            sənədi almaq üçün OpenID4VCI, təqdim etmək üçün OpenID4VP. Bunlar Aİ-nin istifadə etdiyi standartlardır.
          </p>
          <h2>4. Açıq paketlər</h2>
          <p>
            Qaydaları və formatları tətbiq edən hazır proqram təminatı: yoxlama xətti, sənəd vermə, cüzdan nüvəsi. Hər kəs onları
            öz serverində işlədə bilər; eyni koddan istifadə edən hər kəs eyni nəticəyə gəlir.
          </p>
          <h2>5. Rəqəmsal cüzdanlar və xidmətlər</h2>
          <p>
            Şəbəkənin üzərində işləyənlər: insanların istifadə etdiyi rəqəmsal cüzdanlar və qurumlara xidmət göstərən
            provayderlər. Onlar şəbəkənin hissəsi deyil, iştirakçılarıdır. İlk cüzdan Tamga Wallet-dır; qaydalara əməl edən hər
            cüzdan eyni yerdə dayanır.
          </p>
          <h2>6. Ortaq reyestr (gələcəkdə)</h2>
          <p>
            Ən azı iki müstəqil operator qoşulduqdan sonra siyahılardakı qeydlər icazəli ortaq reyestrə də yazılacaq. Reyestr yeni
            etibar mənbəyi əlavə etmir; o, bir neçə operatora eyni qeydləri birlikdə saxlamağa imkan verir. Fərdi məlumatlar
            reyestrə də yazılmır.
          </p>
          <Callout kind="info" locale="az">
            <p>
              Qatlar bir-birindən asılı olmadan dəyişə bilər. Məsələn, yeni rəqəmsal sənəd növünün əlavə edilməsi yalnız
              qaydalara və kataloqa toxunur; rəqəmsal cüzdanları yenidən yazmağa ehtiyac yoxdur.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağın altı katmanı var: kurallar, güven listeleri, biçimler ve protokoller, açık paketler, cüzdanlar ve ileride ortak defter.",
        en: "The network has six layers: rules, trust lists, formats and protocols, open packages, wallets and, later, a shared ledger.",
        tk: "Toruň alty gatlagy bar: düzgünler, sanawlar, görnüşler, paketler, gapjyklar we soňra umumy kitap.",
        az: "Şəbəkənin altı qatı var: qaydalar, etibar siyahıları, formatlar və protokollar, açıq paketlər, rəqəmsal cüzdanlar və gələcəkdə ortaq reyestr.",
      },
      {
        tr: "Cüzdanlar ve hizmet sağlayıcılar ağın parçası değil, ağın katılımcılarıdır.",
        en: "Wallets and service providers are not part of the network; they are its participants.",
        tk: "Gapjyklar we hyzmat üpjün edijiler toruň bölegi däl, gatnaşyjylarydyr.",
        az: "Rəqəmsal cüzdanlar və xidmət provayderləri şəbəkənin hissəsi deyil, onun iştirakçılarıdır.",
      },
      {
        tr: "Ortak defter en az iki bağımsız işletmeciyle gelir ve yeni bir güven kaynağı eklemez.",
        en: "The shared ledger comes with at least two independent operators and adds no new source of trust.",
        tk: "Umumy kitap azyndan iki garaşsyz operator bilen gelýär.",
        az: "Ortaq reyestr ən azı iki müstəqil operatorla gəlir və yeni etibar mənbəyi əlavə etmir.",
      },
    ],
    deeper: [
      { label: { tr: "Bileşen mimarisi", en: "Component architecture", tk: "Komponent arhitekturasy", az: "Komponent memarlığı" }, href: "/architecture/components", kind: "docs" },
      { label: { tr: "Tamga ARF: mimari", en: "Tamga ARF: architecture", tk: "Tamga ARF: arhitektura", az: "Tamga ARF: memarlıq" }, href: "architecture", kind: "arf" },
      { label: { tr: "Neden henüz blockchain yok?", en: "Why no blockchain yet?", tk: "Näme üçin entek blokçeýn ýok?", az: "Niyə hələ blockchain yoxdur?" }, href: "/learn/why-not-blockchain-yet", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.5 */
  {
    slug: "rules-and-rulebooks",
    chapter: 6,
    order: 5,
    minutes: 5,
    title: { tr: "Kurallar ve rulebook'lar", en: "Rules and rulebooks", tk: "Düzgünler we rulebook-lar", az: "Qaydalar və rulebook-lar" },
    summary: {
      tr: "Tamga ARF, Trust Framework, Tamga Rulebook ve belge türü rulebook'ları: hangisi neyi düzenler.",
      en: "Tamga ARF, the Trust Framework, the Tamga Rulebook and the credential-type rulebooks: what each one governs.",
      tk: "Tamga ARF, Trust Framework, Tamga Rulebook we resminama görnüşi rulebook-lary: haýsysy nämäni düzgünleşdirýär.",
      az: "Tamga ARF, Trust Framework, Tamga Rulebook və rəqəmsal sənəd növlərinin rulebook-ları: hər biri nəyi tənzimləyir.",
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
          <p>ARF “arhitektura we salgylanma çarçuwasy” diýmekdir. Ol toruň kimden ybaratdygyny, nähili işleýändigini we ynamyň nireden gelýändigini düşündirýär.</p>
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
      az: (
        <>
          <p>
            Şəbəkənin etibarlı olması üçün hamı eyni qaydalara əməl etməli və bu qaydalar açıq şəkildə yazılmalıdır. Tamga-nın
            qaydaları bir yerdə toplanır: Tamga ARF. O, Avropa İttifaqının öz cüzdanları üçün yazdığı çərçivə ilə eyni
            ardıcıllıqla qurulub.
          </p>
          <h2>Tamga ARF: əsas sənəd</h2>
          <p>
            ARF “memarlıq və istinad çərçivəsi” deməkdir. O, şəbəkənin kimlərdən ibarət olduğunu, necə işlədiyini, etibarın
            haradan gəldiyini, təhlükəsizlik və idarəetmənin necə təşkil olunduğunu təsvir edir. Qurum rəhbəri və ya dövlət
            nümayəndəsi üçün başlanğıc nöqtəsi budur.
          </p>
          <h2>Trust Framework</h2>
          <p>
            Şəbəkənin hüquqi və idarəetmə tərəfi: kim qoşula bilər, necə müraciət edilir, qaydaları pozanlarla nə baş verir, rol
            necə təhvil verilir. Bu, Avropanın eIDAS reqlamentinin və onun icra aktlarının şəbəkədəki qarşılığıdır.
          </p>
          <h2>Tamga Rulebook</h2>
          <p>
            Hər rol üçün nömrələnmiş, məcburi qaydalar. Yoxlayan tərəfin yalnız qeydiyyatında göstərilən məlumatları tələb edə
            bilməsi və ya sənədi verən qurumun öz açarını özündə saxlamalı olması burada yazılıb. Hər qaydanın kodu var, buna görə
            yoxlama zamanı “hansı qayda pozulub?” sualına bir sətirlə cavab verilir.
          </p>
          <h2>Rəqəmsal sənəd növlərinin rulebook-ları</h2>
          <p>
            Hər rəqəmsal sənəd növünün Tamga Rulebook-dan şaxələnən öz rulebook-u var: o, ümumi qaydaları miras alır və yalnız
            həmin növə xas qaydaları əlavə edir. Hazırda üç rulebook var:
          </p>
          <ul>
            <li><strong>Education Rulebook:</strong> tələbə arayışı və diplom.</li>
            <li><strong>Identity Rulebook:</strong> müvəqqəti şəxsiyyət sənədi.</li>
            <li><strong>Event Ticket Rulebook:</strong> tədbir biletləri.</li>
          </ul>
          <p>Yeni növ, məsələn peşə lisenziyası, yalnız yoxlama siyahısı tamamlandıqdan sonra öz rulebook-u ilə gəlir.</p>
          <Callout kind="turkic" locale="az">
            <p>
              Qaydalar türk dilində yazılır və ingilis dilinə rəsmi şəkildə tərcümə olunur; hər ikisi həmişə eyni versiyadadır.
              Dövlət qoşulduqda bu sənədlər şuraya keçir və qaydalar ortaq qərarla dəyişir.
            </p>
          </Callout>
          <h2>Qaydalar necə məcburi olur?</h2>
          <p>
            Qurum şəbəkəyə qoşularkən iştirak sazişi vasitəsilə bu qaydaları qəbul edir. Yəni onları məcburi edən qoşulmanın
            özüdür. Texniki təfərrüatlar tərtibatçı sənədlərindəki spesifikasiyalarda yazılıb: qaydalar nəyin edilməli olduğunu,
            spesifikasiyalar isə necə edilməli olduğunu deyir.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga ARF ağın ana belgesidir; Trust Framework hukuk ve yönetişimi, Tamga Rulebook her rolün kurallarını anlatır.",
        en: "The Tamga ARF is the main document; the Trust Framework covers law and governance, the Tamga Rulebook each role’s rules.",
        tk: "Tamga ARF esasy resminama; Trust Framework hukuk we dolandyryşy, Tamga Rulebook rollaryň düzgünlerini düşündirýär.",
        az: "Tamga ARF əsas sənəddir; Trust Framework hüquq və idarəetməni, Tamga Rulebook isə hər rolun qaydalarını əhatə edir.",
      },
      {
        tr: "Belge türü rulebook’ları (Education, Identity, Event Ticket) Tamga Rulebook’tan dallanır.",
        en: "The credential-type rulebooks (Education, Identity, Event Ticket) branch off the Tamga Rulebook.",
        tk: "Görnüş rulebook-lary (Education, Identity, Event Ticket) Tamga Rulebook-dan şahalanýar.",
        az: "Rəqəmsal sənəd növlərinin rulebook-ları (Education, Identity, Event Ticket) Tamga Rulebook-dan şaxələnir.",
      },
      {
        tr: "Kurallar katılım sözleşmesiyle bağlayıcı olur; teknik ayrıntı şartnamelerdedir.",
        en: "The rules become binding through the participation agreement; the technical detail is in the specifications.",
        tk: "Düzgünler gatnaşyk şertnamasy bilen hökmany bolýar.",
        az: "Qaydalar iştirak sazişi vasitəsilə məcburi olur; texniki təfərrüatlar spesifikasiyalardadır.",
      },
    ],
    deeper: [
      { label: { tr: "Okuma yolu: kim neyi okumalı", en: "Reading path: who reads what", tk: "Okaýyş ýoly", az: "Oxu yolu: kim nəyi oxuyur" }, href: "reading-path", kind: "arf" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework", az: "Trust Framework" }, href: "trust-framework", kind: "arf" },
      { label: { tr: "Tamga Rulebook", en: "Tamga Rulebook", tk: "Tamga Rulebook", az: "Tamga Rulebook" }, href: "rulebook", kind: "arf" },
      { label: { tr: "Education Rulebook", en: "Education Rulebook", tk: "Education Rulebook", az: "Education Rulebook" }, href: "rulebooks/education", kind: "arf" },
    ],
  },

  /* ------------------------------------------------------------------ 6.6 */
  {
    slug: "governance",
    chapter: 6,
    order: 6,
    minutes: 5,
    title: { tr: "Yönetişim", en: "Governance", tk: "Dolandyryş", az: "İdarəetmə" },
    summary: {
      tr: "Bugün geçici işletmeci, devletler katılınca konsey ya da vakıf, sonra ortak defter.",
      en: "A provisional operator today, a council or foundation once states join, then a shared ledger.",
      tk: "Häzir wagtlaýyn operator, döwletler goşulanda geňeş ýa-da gaznaçylyk, soňra umumy kitap.",
      az: "Bu gün müvəqqəti operator, dövlətlər qoşulduqda şura və ya fond, sonra ortaq reyestr.",
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
      az: (
        <>
          <p>
            Şəbəkəyə etibar onu kimin idarə etdiyini bilməkdən başlayır. Tamga Network-un idarəetməsi addım-addım qurulur: ilk
            gündən ağır bir qurum yaradılmır, lakin hər mərhələni kimin və hansı şərtlərlə öz üzərinə götürəcəyi əvvəlcədən
            yazılıb.
          </p>
          <h2>Bu gün: müvəqqəti operator</h2>
          <p>
            Hazırda şəbəkəni Tamga müvəqqəti operator kimi idarə edir. O, Türkiyənin siyahısını dövlət adından dərc edir və bunu
            açıq şəkildə bildirir: siyahılarda operatorun “müvəqqəti” olduğu və kimin adından çıxış etdiyi yazılır. Siyahının hər
            versiyası imzalanır və açıq jurnala qeyd olunur, beləliklə hər kəs siyahının xəbərsiz dəyişdirilmədiyini yoxlaya bilər.
          </p>
          <h2>Dövlətlər qoşulduqda: şura və ya fond</h2>
          <p>
            Bir və ya iki dövlət qoşulmağa hazır olduqda idarəetmə orqanı yaradılır: üzv dövlətlərdən ibarət şura və əməliyyatları
            öz üzərinə götürəcək fond və ya katiblik. Siyahılar sahiblərinə təhvil verilir; şəbəkə səviyyəsində qərarlar, məsələn
            yeni üzvün qəbulu və ya ortaq rəqəmsal sənəd növü, üzv dövlətlər tərəfindən birgə qəbul edilir.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Şura yaradıldıqdan sonra da hər dövlət öz siyahısı üzərində yeganə söz sahibidir. Şura yalnız şəbəkənin ortaq
              qaydalarını idarə edir; dövlətin öz qurumları barədə qərar verə bilməz.
            </p>
          </Callout>
          <h2>İki müstəqil operatordan sonra: ortaq reyestr</h2>
          <p>
            Ən azı iki müstəqil operator olduqda qeydlər icazəli ortaq reyestrə də yazılır. Bu, tək bir operatorun siyahını
            dəyişməsini texniki baxımdan çətinləşdirir. Reyestr bu mərhələyə qədər qəsdən təxirə salınır: tək operatorun apardığı
            reyestr heç bir əlavə etibar yaratmır.
          </p>
          <h2>Təhvil necə həyata keçirilir?</h2>
          <p>
            Hər müvəqqəti rolun təhvili əvvəlcədən planlaşdırılıb: domen adı, kök sertifikatlar, siyahı arxivi və açarlar yazılı
            varislik sazişi əsasında təhvil verilir. Rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan və imzalayan
            dəyişir; insanların cüzdanlarındakı rəqəmsal sənədlər etibarlı qalır.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Bugün Tamga geçici işletmecidir ve bunu listelerde açıkça yazar; her liste sürümü herkese açık bir günlüğe işlenir.",
        en: "Today Tamga is the provisional operator and says so in the lists; every list version is recorded in a public log.",
        tk: "Häzir Tamga wagtlaýyn operator we muny sanawlarda açyk ýazýar.",
        az: "Hazırda Tamga müvəqqəti operatordur və bunu siyahılarda bildirir; siyahının hər versiyası açıq jurnala qeyd olunur.",
      },
      {
        tr: "Devletler katılınca konsey ve vakıf kurulur; her devlet yine kendi listesinin tek sahibidir.",
        en: "Once states join, a council and a foundation are set up; each state still solely owns its list.",
        tk: "Döwletler goşulanda geňeş we gaznaçylyk döredilýär; her döwlet öz sanawynyň eýesi bolup galýar.",
        az: "Dövlətlər qoşulduqda şura və fond yaradılır; hər dövlət yenə də öz siyahısının yeganə sahibidir.",
      },
      {
        tr: "Ortak defter en az iki bağımsız işletmeciyle gelir; devirler yazılı sözleşmeyle baştan tasarlanmıştır.",
        en: "The shared ledger arrives with at least two independent operators; hand-overs are designed up front in writing.",
        tk: "Umumy kitap azyndan iki garaşsyz operator bilen gelýär.",
        az: "Ortaq reyestr ən azı iki müstəqil operatorla gəlir; təhvillər əvvəlcədən yazılı şəkildə planlaşdırılıb.",
      },
    ],
    deeper: [
      { label: { tr: "Trust Framework: yönetişim", en: "Trust Framework: governance", tk: "Trust Framework: dolandyryş", az: "Trust Framework: idarəetmə" }, href: "trust-framework", kind: "arf" },
      { label: { tr: "ADR-0009: zincirsiz beta ve zincir eşiği", en: "ADR-0009: chainless beta and chain threshold", tk: "ADR-0009", az: "ADR-0009: zəncirsiz beta və zəncir həddi" }, href: "/adr/0009-phase-b-chainless-beta-and-chain-threshold", kind: "docs" },
      { label: { tr: "Bizde neden henüz blockchain yok?", en: "Why no blockchain yet?", tk: "Näme üçin entek blokçeýn ýok?", az: "Niyə hələ blockchain yoxdur?" }, href: "/learn/why-not-blockchain-yet", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.7 */
  {
    slug: "open-source",
    chapter: 6,
    order: 7,
    minutes: 4,
    title: { tr: "Açık kod", en: "Open source", tk: "Açyk kod", az: "Açıq kod" },
    summary: {
      tr: "Paketler, lisanslar ve uyum testleri: herkesin aynı kodu kullanıp aynı sonucu alması.",
      en: "Packages, licences and conformance tests: everyone can use the same code and get the same result.",
      tk: "Paketler, ygtyýarnamalar we laýyklyk synaglary: hemmeler şol bir kody ulanyp şol bir netijäni alýar.",
      az: "Paketlər, lisenziyalar və uyğunluq testləri: hər kəs eyni koddan istifadə edib eyni nəticəni əldə edə bilər.",
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
      az: (
        <>
          <p>
            Etibar şəbəkəsinin qaydaları nə qədər açıq olsa da, onları tətbiq edən proqram təminatı qapalıdırsa, heç kim nəticəyə
            əmin ola bilməz. Buna görə Tamga Network kodunu açıq saxlayır: hər kəs onu oxuya, işlədə və yoxlaya bilər.
          </p>
          <h2>Paketlər</h2>
          <p>
            Şəbəkənin proqram təminatı kiçik, ayrı-ayrı paketlərə bölünüb. Yoxlayan tərəf yalnız yoxlama paketindən, cüzdan
            tərtibatçısı isə yalnız cüzdan nüvəsindən istifadə edə bilər:
          </p>
          <ul>
            <li><strong>trust:</strong> imzalı etibar siyahılarını oxuyur və yoxlayır.</li>
            <li><strong>verifier:</strong> rəqəmsal sənədin başdan-sona yoxlanması; sorğuların qurulması.</li>
            <li><strong>issuer:</strong> sənəd vermə və status siyahısının dərci.</li>
            <li><strong>wallet-core:</strong> cüzdanın nüvəsi: açarlar, rəqəmsal sənədlərin alınması və təqdim edilməsi.</li>
            <li><strong>sd-jwt, mdoc, schemas, core:</strong> rəqəmsal sənəd formatları, sənəd növləri kataloqu və ortaq tikinti blokları.</li>
          </ul>
          <h2>Lisenziyalar</h2>
          <p>
            Kod Apache-2.0, sənədlər isə CC BY 4.0 lisenziyası ilə yayımlanır. Qurumlar və şirkətlər kodu öz məhsullarında sərbəst
            istifadə edə və dəyişdirə, sənədləri isə mənbəni göstərməklə paylaşa bilərlər.
          </p>
          <h2>Uyğunluq testləri</h2>
          <p>
            Eyni qaydaları tətbiq edən iki fərqli proqram eyni nəticəyə gəlməlidir. Bunun üçün şəbəkənin{" "}
            <Term tip="Proqram təminatının şəbəkə qaydalarına əməl edib-etmədiyini yoxlamaq üçün hər kəsin işlədə biləcəyi hazır test toplusu." en="conformance tests">uyğunluq testləri</Term> var:
            nümunə rəqəmsal sənədlər və onların gözlənilən nəticələri. Rəqəmsal cüzdan, yoxlayan tərəf və ya sənədi verən qurum bu
            testlərdən keçməklə şəbəkənin qaydalarına əməl etdiyini göstərir. Testlərdən keçmək üçün Tamga-nın paketlərindən
            istifadə etmək məcburi deyil; spesifikasiyaya əməl edən istənilən tətbiq keçə bilər.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Açıq kod o deməkdir ki, dövlət bu infrastrukturu öz serverlərində, öz nəzarəti altında işlədə bilər. Şəbəkəyə etibar
              etmək üçün kiminsə sözünə inanmaq lazım deyil; kod hamının gözü önündədir.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağın yazılımı açık kaynaklı, küçük paketlerdir; herkes okuyabilir, çalıştırabilir, denetleyebilir.",
        en: "The network’s software is open-source, in small packages; anyone can read, run and audit it.",
        tk: "Toruň programmasy açyk çeşmeli kiçi paketlerdir.",
        az: "Şəbəkənin proqram təminatı açıq mənbəlidir və kiçik paketlərdən ibarətdir; hər kəs onu oxuya, işlədə və yoxlaya bilər.",
      },
      {
        tr: "Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır.",
        en: "Code is Apache-2.0, documents are CC BY 4.0.",
        tk: "Kod Apache-2.0, resminamalar CC BY 4.0.",
        az: "Kod Apache-2.0, sənədlər CC BY 4.0 lisenziyalıdır.",
      },
      {
        tr: "Uyum testleri, şartnameye uyan her yazılımın aynı sonuca vardığını gösterir.",
        en: "Conformance tests show that any software following the specification reaches the same result.",
        tk: "Laýyklyk synaglary şol bir netijä ýetilýändigini görkezýär.",
        az: "Uyğunluq testləri spesifikasiyaya əməl edən istənilən proqram təminatının eyni nəticəyə gəldiyini göstərir.",
      },
    ],
    deeper: [
      { label: { tr: "Paketler", en: "Packages", tk: "Paketler", az: "Paketlər" }, href: "/packages/", kind: "docs" },
      { label: { tr: "Uyum testleri", en: "Conformance tests", tk: "Laýyklyk synaglary", az: "Uyğunluq testləri" }, href: "/guides/conformance", kind: "docs" },
      { label: { tr: "SDK sayfası", en: "SDK page", tk: "SDK sahypasy", az: "SDK səhifəsi" }, href: "/sdk", kind: "site" },
    ],
  },

  /* ------------------------------------------------------------------ 6.8 */
  {
    slug: "first-wallet",
    chapter: 6,
    order: 8,
    minutes: 4,
    title: { tr: "İlk cüzdan: Tamga Wallet", en: "The first wallet: Tamga Wallet", tk: "Ilkinji gapjyk: Tamga Wallet", az: "İlk rəqəmsal cüzdan: Tamga Wallet" },
    summary: {
      tr: "Ağın ilk cüzdanı; ağ onu işletmez, ağın kurallarına her cüzdan gibi uyar, tek cüzdan değildir.",
      en: "The network's first wallet; the network doesn't run it, it follows the network's rules like any other wallet and is not the only one.",
      tk: "Toruň ilkinji gapjygy; tor ony işletmeýär, toruň düzgünlerine beýleki gapjyklar ýaly eýerýär, ýeke-täk gapjyk däl.",
      az: "Şəbəkənin ilk rəqəmsal cüzdanı; şəbəkə onu idarə etmir, o, şəbəkənin qaydalarına digər cüzdanlar kimi əməl edir və yeganə cüzdan deyil.",
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
            Wallet kendisi işletir; cüzdanın tanıtımı kendi sitesindedir: <ExternalLink href={tamgaWalletUrl("tr")}>tamgawallet.com</ExternalLink>.
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
              Ağ, Türk dünyasının farklı ülkelerinden birçok uyumlu cüzdanın çıkmasını hedefliyor. Bir kişi hangi
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
            Wallet runs its own app, wallet provider and site, and the wallet is presented on its own site: <ExternalLink href={tamgaWalletUrl("en")}>tamgawallet.com</ExternalLink>.
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
              The network aims for many compatible wallets from different countries of the Turkic world.
              Whichever wallet a person chooses, their credential is verified the same way everywhere on the network.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Toruň işleýändigini görkezmegiň iň gowy ýoly ony ulanýan gapjykdyr. Tamga Wallet bu toruň ilkinji gapjygy: ÝB bilen laýyk programma.</p>
          <h2>Toruň bölegi däl, gatnaşyjysy</h2>
          <p>Tamga Wallet aýry önüm; öz topary we öz sahypasy bar. Tora beýleki gapjyklar ýaly goşulýar; tor oňa hiç hili artykmaçlyk bermeýär. Tor gapjyk işletmeýär: programmany, gapjyk üpjün edijini we sahypany Tamga Wallet özi işledýär: <ExternalLink href={tamgaWalletUrl("tk")}>tamgawallet.com</ExternalLink>.</p>
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
            <p>Tor türki dünýäsiniň dürli ýurtlaryndan köp laýyk gapjygyň çykmagyny maksat edinýär.</p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Şəbəkənin işlədiyini göstərməyin ən yaxşı yolu ondan real istifadə edən rəqəmsal cüzdandır. Tamga Wallet bu şəbəkənin
            ilk cüzdanıdır: insanların rəqəmsal sənədlərini telefonlarında gəzdirməsi və yalnız lazım olan məlumatı göstərməsi
            üçün hazırlanmış, Aİ ilə uyğun tətbiq.
          </p>
          <h2>Şəbəkənin hissəsi deyil, iştirakçısı</h2>
          <p>
            Tamga Wallet öz komandası, öz qərarları və öz saytı olan ayrıca məhsuldur. Şəbəkəyə digər cüzdanlar kimi qoşulur:
            cüzdan qaydalarına əməl etdiyini göstərir və cüzdan provayderi kimi siyahıya daxil edilir. Şəbəkə ona heç bir imtiyaz
            vermir; qaydalara əməl edən hər cüzdan şəbəkədə eyni hüquqlara malikdir. Şəbəkə cüzdan idarə etmir: tətbiqi, cüzdan
            provayderini və saytı Tamga Wallet özü idarə edir, cüzdan isə öz saytında təqdim olunur: <ExternalLink href={tamgaWalletUrl("az")}>tamgawallet.com</ExternalLink>.
          </p>
          <h2>Nə edir?</h2>
          <ul>
            <li>Qurumlardan rəqəmsal sənəd almaq: QR kodu skan etməklə və ya qurumu tətbiqdə tapmaqla.</li>
            <li>Rəqəmsal sənədləri telefonda saxlamaq: onlar serverdə deyil, cihazda qalır.</li>
            <li>Yalnız lazım olanı göstərmək: hansı məlumatın paylaşılacağını görmək və təsdiqləmək.</li>
            <li>Veb-saytlara “Tamga ilə daxil olun” vasitəsilə, hər sayt üçün ayrı təxəllüslə daxil olmaq.</li>
            <li>Kimə nə göstərildiyini görmək: qeyd yalnız şəxsin telefonunda saxlanılır.</li>
          </ul>
          <Callout kind="info" locale="az">
            <p>
              Tamga Wallet “Aİ ilə uyğun” rəqəmsal cüzdandır. “EUDI Wallet” adı Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı
              cüzdanlar üçün nəzərdə tutulub; Tamga Wallet bu addan istifadə etmir və milli şəxsiyyət cüzdanı deyil.
            </p>
          </Callout>
          <h2>İlk cüzdan niyə vacibdir?</h2>
          <p>
            Qaydalar kağız üzərində düzgün ola bilər, lakin onlar real telefonda, real istifadəçi ilə işləməlidir. Tamga Wallet bu
            qaydaların tətbiq edilə bildiyini göstərir və cüzdan hazırlamaq istəyən başqaları üçün nümunə rolunu oynayır. Cüzdan
            provayderi olmaq istəyən istənilən komanda eyni açıq paketlərdən və eyni uyğunluq testlərindən istifadə edə bilər.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Şəbəkə Türk dünyasının müxtəlif ölkələrindən çoxlu uyğun cüzdanın çıxmasını hədəfləyir. Şəxs hansı
              cüzdanı seçməsindən asılı olmayaraq, onun rəqəmsal sənədi şəbəkənin hər yerində eyni qaydada yoxlanılır.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tamga Wallet ağın ilk cüzdanıdır; ayrı bir üründür, ağ onu işletmez ve ağa diğer cüzdanlar gibi katılır.",
        en: "Tamga Wallet is the network’s first wallet; it is a separate product, the network doesn’t run it, and it joins like any other wallet.",
        tk: "Tamga Wallet toruň ilkinji gapjygy; aýry önüm, tor ony işletmeýär.",
        az: "Tamga Wallet şəbəkənin ilk rəqəmsal cüzdanıdır; o, ayrıca məhsuldur, şəbəkə onu idarə etmir və o, şəbəkəyə digər cüzdanlar kimi qoşulur.",
      },
      {
        tr: "Belgeler telefonda durur; kişi yalnız gerekeni gösterir ve her siteye ayrı takma adla girer.",
        en: "Credentials stay on the phone; the person shows only what is needed and uses a separate pseudonym for each site.",
        tk: "Resminamalar telefonda durýar; adam diňe gerek zady görkezýär.",
        az: "Rəqəmsal sənədlər telefonda qalır; şəxs yalnız lazım olanı göstərir və hər sayt üçün ayrı təxəllüsdən istifadə edir.",
      },
      {
        tr: "Tamga Wallet “AB uyumlu” bir cüzdandır; EUDI Wallet ya da ulusal kimlik cüzdanı değildir.",
        en: "Tamga Wallet is an “EU-compatible” wallet; it is not an EUDI Wallet or a national identity wallet.",
        tk: "Tamga Wallet “ÝB bilen laýyk” gapjyk; EUDI Wallet däl.",
        az: "Tamga Wallet “Aİ ilə uyğun” rəqəmsal cüzdandır; EUDI Wallet və ya milli şəxsiyyət cüzdanı deyil.",
      },
    ],
    deeper: [
      { label: { tr: "Cüzdan kuralları", en: "Wallet rules", tk: "Gapjyk düzgünleri", az: "Cüzdan qaydaları" }, href: "/specifications/wallet", kind: "docs" },
      { label: { tr: "Cüzdan geliştirmek", en: "Building a wallet", tk: "Gapjyk düzmek", az: "Cüzdan hazırlamaq" }, href: "/guides/build-a-wallet", kind: "docs" },
      { label: { tr: "ADR-0030: ürün adları", en: "ADR-0030: product names", tk: "ADR-0030: önüm atlary", az: "ADR-0030: məhsul adları" }, href: "/adr/0030-product-names", kind: "docs" },
      { label: { tr: "ADR-0042: ağ ve cüzdanlar", en: "ADR-0042: network and wallets", tk: "ADR-0042: tor we gapjyklar", az: "ADR-0042: şəbəkə və cüzdanlar" }, href: "/adr/0042-network-and-wallets", kind: "docs" },
    ],
  },
];

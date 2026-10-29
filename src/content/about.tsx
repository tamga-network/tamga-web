import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

export type AboutContent = {
  meta: { title: string; description: string };
  header: { eyebrow: string; title: string; description: string };
  name: { eyebrow: string; title: ReactNode; body: ReactNode };
  mission: { title: string; body: string };
  vision: { title: string; body: ReactNode };
  positioning: {
    eyebrow: string;
    title: string;
    lead: ReactNode;
    rows: { k: string; v: string }[];
  };
  whyNow: {
    title: string;
    body: ReactNode;
    ctaDocs: string;
    ctaWhitepaper: string;
    ctaManifesto: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { email: string; label: string; note: string }[];
  };
};

const en: AboutContent = {
  meta: {
    title: "About",
    description:
      "What Tamga Network is, where its name comes from, what it does and why. It is an EU-compatible Digital Trust Infrastructure for the Turkic world, built in three layers.",
  },
  header: {
    eyebrow: "About",
    title: "What is Tamga Network, and what does it do and why?",
    description:
      "Tamga Network is a Digital Trust Infrastructure rather than a blockchain network. Digital identity is where it starts, and trust is the value the infrastructure actually produces.",
  },
  name: {
    eyebrow: "Our name",
    title: (
      <>
        What is <span className="italic text-primary">Tamga</span>?
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong> is the ancient seal of the Turkic and Mongolic
          tribes. Struck onto animals, weapons, carpets, gravestones and
          documents, this mark proved <strong>to whom something belonged</strong>,{" "}
          <strong>from whom a word came</strong> and that an authority was{" "}
          <strong>genuine</strong>.
        </p>
        <p>
          Every tribe had its own tamga, and the tamga served as identity,
          signature and title of ownership at the same time. Today a verifiable
          digital credential (Verifiable Credential) does the same job, except
          that it is engraved into mathematics instead of stone.
        </p>
        <p>
          We chose the name <strong>Tamga</strong> because the network is the
          modern, digital counterpart of that ancient tradition of trust.
        </p>
      </>
    ),
  },
  mission: {
    title: "Mission",
    body: "Every application solves identity, authorization and document verification again on its own. Our mission is to turn that repeated work into a shared, open infrastructure, so that trust comes from a common layer that every application can rely on.",
  },
  vision: {
    title: "Vision",
    body: (
      <>
        We picture a <strong className="text-foreground">trust network</strong> that
        starts in Türkiye and opens to the Turkic world. Each country keeps its own
        sovereign trust network and connects to the others through shared
        standards, so that identity, diplomas and documents can be verified across
        borders.
      </>
    ),
  },
  positioning: {
    eyebrow: "Positioning",
    title: "Three layers: EU-compatible, a federation, wallets on the network",
    lead: (
      <>
        Tamga is built in three layers, and each of them can stand on its own. The base is{" "}
        <strong className="text-foreground">compatibility with the EU’s eIDAS 2.0 / EUDI standards</strong>. On top
        of it, <strong className="text-foreground">Tamga Network</strong> brings the trust lists of the Turkic states
        together. <strong className="text-foreground">The wallets on the network</strong> (the first is
        Tamga Wallet) and the network’s reference services run on that foundation.
      </>
    ),
    rows: [
      {
        k: "EU-compatible base",
        v: "Credentials, protocols and trust lists follow EU standards. “EUDI Wallet” is a legal title reserved for wallets that an EU member state provides or recognises, so we describe Tamga Wallet, the network’s first wallet, as EU-compatible. Interoperability will be shown with test results.",
      },
      {
        k: "Tamga Network, a light federation",
        v: "The network collects each state’s trust list and lets the states recognise one another. Today Tamga publishes Türkiye’s list provisionally on behalf of the state, and when the state or a body it authorises publishes its own list, the network will point to that one. The network recognises any wallet that follows the published rules. A governance body and a shared ledger will follow as states join.",
      },
      {
        k: "Wallets on the network and the team that builds it",
        v: "Any wallet that follows the network’s rules works on the network. Tamga Wallet is the first of them, and it is a separate product that the network does not run. The team that builds the network runs the reference services, namely the Institution Console, Tamga Verify and trust-list publication, and publishes the code as open-source packages so that no institution is tied to one app. Operated provisionally by BROS İNŞAAT SANAYİ VE DIŞ TİCARET LİMİTED ŞİRKETİ on behalf of Tamga Network (foundation to be established).",
      },
    ],
  },
  whyNow: {
    title: "Why now?",
    body: (
      <>
        <p>
          With eIDAS 2.0 the European Union made the portable digital proof model
          mandatory across the continent. SD-JWT VC, ISO mdoc, OpenID4VC and
          selective disclosure have moved out of research papers and into
          requirements that are being implemented today.
        </p>
        <p>
          Türkiye has a strong digital public infrastructure (e-Devlet, MERNİS,
          e-signature), but these trust assets are largely centralized and
          disconnected from one another. As the world moves to the portable proof
          model, Türkiye will either import it or{" "}
          <strong>produce its own sovereign, compatible infrastructure.</strong>{" "}
          We are working on the second path.
        </p>
      </>
    ),
    ctaDocs: "Learn from scratch →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "Write to the address that fits your question. We usually reply within a few business days.",
    items: [
      { email: "info@tamga.network", label: "General", note: "Questions about the project and the network." },
      { email: "partners@tamga.network", label: "Membership", note: "Joining the network as an institution, wallet provider or state." },
      { email: "security@tamga.network", label: "Security", note: "Responsible disclosure of vulnerabilities." },
    ],
  },
};

const tr: AboutContent = {
  meta: {
    title: "Hakkında",
    description:
      "Tamga Network’ün ne olduğu, adının nereden geldiği, ne yaptığı ve neden yaptığı. Tamga Network, Türk dünyası için kurulan, AB ile uyumlu ve üç katmandan oluşan bir Dijital Güven Altyapısıdır.",
  },
  header: {
    eyebrow: "Hakkında",
    title: "Tamga Network nedir, neyi neden yapar?",
    description:
      "Tamga Network bir blockchain ağından çok bir Dijital Güven Altyapısıdır. İşe dijital kimlikle başlar, ama altyapının asıl ürettiği değer güvendir.",
  },
  name: {
    eyebrow: "İsmimiz",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> nedir?
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong>, Türk ve Moğol boylarının kadim mührüdür.
          Hayvanlara, silahlara, halılara, mezar taşlarına ve belgelere vurulan
          bu işaret, bir şeyin <strong>kime ait olduğunu</strong>, bir sözün{" "}
          <strong>kimden geldiğini</strong> ve bir yetkinin{" "}
          <strong>gerçek olduğunu</strong> kanıtlardı.
        </p>
        <p>
          Her boyun kendi tamgası vardı ve tamga aynı anda kimlik, imza ve mülkiyet
          belgesi yerine geçerdi. Bugün doğrulanabilir dijital belge (Verifiable
          Credential) aynı işi görüyor. Aradaki fark, bu kez işaretin taşa
          kazınmak yerine matematiğe dayanmasıdır.
        </p>
        <p>
          Ağa <strong>Tamga</strong> adını, bu kadim güven geleneğinin çağdaş ve
          dijital karşılığı olduğu için verdik.
        </p>
      </>
    ),
  },
  mission: {
    title: "Misyon",
    body: "Bugün her uygulama kimlik, yetkilendirme ve belge doğrulama sorununu kendi başına yeniden çözüyor. Amacımız bu tekrarlanan işi ortak ve açık bir altyapıya dönüştürmek ve güveni, bütün uygulamaların dayanabileceği ortak bir katmandan sağlamaktır.",
  },
  vision: {
    title: "Vizyon",
    body: (
      <>
        Türkiye’den başlayıp Türk dünyasına açılan bir{" "}
        <strong className="text-foreground">güven ağı</strong> hayal ediyoruz. Bu
        ağda her ülke kendi egemen güven ağını korur ve ortak standartlarla
        diğerlerine bağlanır. Böylece kimlik, diploma ve belgeler sınırın öbür
        tarafında da doğrulanabilir.
      </>
    ),
  },
  positioning: {
    eyebrow: "Konumlanma",
    title: "Üç katman: AB uyumu, federasyon, ağdaki cüzdanlar",
    lead: (
      <>
        Tamga, her biri tek başına ayakta durabilen üç katman üzerine kuruludur. Tabanı{" "}
        <strong className="text-foreground">AB’nin eIDAS 2.0 / EUDI standartlarıyla uyum</strong> oluşturur. Onun üstünde{" "}
        <strong className="text-foreground">Tamga Network</strong> Türk devletlerinin güven listelerini bir araya
        getirir. <strong className="text-foreground">Ağdaki cüzdanlar</strong> (ilki Tamga Wallet) ve ağın
        referans hizmetleri de bu zeminin üzerinde çalışır.
      </>
    ),
    rows: [
      {
        k: "AB uyumlu taban",
        v: "Belgeler, protokoller ve güven listeleri AB standartlarına uyar. “EUDI Wallet” unvanı yalnızca bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlara verilen hukuki bir unvan olduğu için ağın ilk cüzdanı Tamga Wallet’ı AB uyumlu bir cüzdan olarak anıyoruz. Birlikte çalışabilirliği test sonuçlarıyla göstereceğiz.",
      },
      {
        k: "Tamga Network, hafif bir federasyon",
        v: "Ağ her devletin güven listesini toplar ve devletlerin birbirini tanımasını sağlar. Türkiye listesini bugün Tamga, devlet adına geçici olarak yayınlıyor. Devlet ya da yetkilendirdiği kurum kendi listesini yayınladığında ağ o listeyi gösterecek. Ağ, yayınlanmış kurallara uyan her cüzdanı tanır. Yönetişim kurumu ve ortak defter de devletler katıldıkça kurulacak.",
      },
      {
        k: "Ağdaki cüzdanlar ve ağı geliştiren ekip",
        v: "Ağın kurallarına uyan her cüzdan ağda çalışabilir. Bunların ilki Tamga Wallet’tır ve ağın işletmediği ayrı bir üründür. Ağı geliştiren ekip Kurum Konsolu, Tamga Verify ve güven listesi yayını gibi referans hizmetleri işletir. Kodu da açık kaynak paketler olarak yayınladığı için hiçbir kurum tek bir uygulamaya bağlı kalmaz. Tamga Network (kurulacak vakıf) adına geçici işletmeci: BROS İNŞAAT SANAYİ VE DIŞ TİCARET LİMİTED ŞİRKETİ.",
      },
    ],
  },
  whyNow: {
    title: "Neden şimdi?",
    body: (
      <>
        <p>
          Avrupa Birliği, eIDAS 2.0 ile taşınabilir dijital kanıt modelini bütün
          kıtada zorunlu hâle getirdi. SD-JWT VC, ISO mdoc, OpenID4VC ve seçici
          paylaşım böylece makalelerden çıkıp bugün uygulanan gereksinimlere
          dönüştü.
        </p>
        <p>
          Türkiye güçlü bir dijital kamu altyapısına (e-Devlet, MERNİS, e-imza)
          sahip, ancak bu güven varlıkları büyük ölçüde merkezî ve birbirinden
          kopuk durumda. Dünya taşınabilir kanıt modeline geçerken Türkiye ya bu
          modeli dışarıdan alacak ya da <strong>kendi egemen ve uyumlu altyapısını üretecek.</strong>{" "}
          Biz ikinci yol üzerinde çalışıyoruz.
        </p>
      </>
    ),
    ctaDocs: "Sıfırdan öğren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Bize ulaşın",
    lead: "Sorunuza uyan adrese yazmanız yeterli. Genellikle birkaç iş günü içinde yanıt veriyoruz.",
    items: [
      { email: "info@tamga.network", label: "Genel", note: "Proje ve ağ hakkındaki sorular." },
      { email: "partners@tamga.network", label: "Katılım", note: "Kurum, cüzdan sağlayıcı ya da devlet olarak ağa katılım." },
      { email: "security@tamga.network", label: "Güvenlik", note: "Güvenlik açıklarının sorumlu bildirimi." },
    ],
  },
};

const tk: AboutContent = {
  meta: {
    title: "Biz barada",
    description:
      "Tamga Network-yň näme bolýandygy, adynyň nireden gelýändigi, näme edýändigi we näme üçin edýändigi. Tamga Network türki dünýäsi üçin gurlan, ÝB bilen laýyk we üç gatlakdan ybarat Sanly Ynam Infrastrukturasydyr.",
  },
  header: {
    eyebrow: "Biz barada",
    title: "Tamga Network näme, näme edýär we näme üçin?",
    description:
      "Tamga Network blokçeýn torundan has köp Sanly Ynam Infrastrukturasydyr. Ol işe sanly şahsyýetden başlaýar, ýöne infrastrukturanyň hakyky öndürýän gymmaty ynamdyr.",
  },
  name: {
    eyebrow: "Adymyz",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> näme?
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong> türki we mongol taýpalarynyň gadymy möhüridir.
          Haýwanlara, ýaraglara, halylara, gonamçylyk daşlaryna we resminamalara
          basylan bu belgi, bir zadyň <strong>kime degişlidigini</strong>, bir
          sözüň <strong>kimden gelendigini</strong> we bir ygtyýaryň{" "}
          <strong>hakykydygyny</strong> subut edýärdi.
        </p>
        <p>
          Her taýpanyň öz tamgasy bardy we tamga bir wagtyň özünde şahsyýet, gol
          we eýeçilik resminamasy hökmünde ulanylýardy. Bu gün barlanyp bilinýän
          sanly resminama (Verifiable Credential) şol bir işi edýär. Tapawudy,
          bu gezek belginiň daşa oýulmagynyň deregine matematika daýanmagyndadyr.
        </p>
        <p>
          Tora <strong>Tamga</strong> adyny, ol şu gadymy ynam däbiniň häzirki
          zaman we sanly görnüşi bolany üçin berdik.
        </p>
      </>
    ),
  },
  mission: {
    title: "Wezipe",
    body: "Häzir her programma şahsyýet, ygtyýarlandyrma we resminama barlagy meselesini özbaşdak täzeden çözýär. Maksadymyz bu gaýtalanýan işi umumy we açyk infrastruktura öwürmek we ynamy ähli programmalaryň daýanyp biljek umumy gatlagyndan üpjün etmekdir.",
  },
  vision: {
    title: "Garaýyş",
    body: (
      <>
        Biz Türkiýeden başlap türki dünýäsine açylýan{" "}
        <strong className="text-foreground">ynam toruny</strong> göz öňüne
        getirýäris. Bu torda her ýurt öz özygtyýarly ynam toruny saklaýar we
        umumy standartlar arkaly beýlekilere birikýär. Şeýlelikde şahsyýet,
        diplom we resminamalar serhediň aňyrsynda hem barlanyp bilner.
      </>
    ),
  },
  positioning: {
    eyebrow: "Orun",
    title: "Üç gatlak: ÝB bilen laýyklyk, federasiýa, tordaky gapjyklar",
    lead: (
      <>
        Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Onuň esasyny{" "}
        <strong className="text-foreground">ÝB-niň eIDAS 2.0 / EUDI standartlaryna laýyklyk</strong> düzýär. Onuň
        üstünde <strong className="text-foreground">Tamga Network</strong> türki döwletleriň ynam sanawlaryny bir
        ýere jemleýär. <strong className="text-foreground">Tordaky gapjyklar</strong> (ilkinjisi Tamga
        Wallet) we toruň salgylanma hyzmatlary hem şu esasyň üstünde işleýär.
      </>
    ),
    rows: [
      {
        k: "ÝB bilen laýyk esas",
        v: "Resminamalar, protokollar we ynam sanawlary ÝB standartlaryna eýerýär. “EUDI Wallet” diňe ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna berilýän hukuk ady bolany üçin, toruň ilkinji gapjygy Tamga Wallet-i ÝB bilen laýyk gapjyk hökmünde agzaýarys. Bilelikde işleýşini synag netijeleri bilen görkezeris.",
      },
      {
        k: "Tamga Network, ýeňil federasiýa",
        v: "Tor her döwletiň ynam sanawyny jemleýär we döwletleriň biri-birini ykrar etmegine mümkinçilik berýär. Türkiýäniň sanawyny häzir Tamga döwletiň adyndan wagtlaýyn çap edýär. Döwlet ýa-da onuň ygtyýarlandyran guramasy öz sanawyny çap edende tor şol sanawy görkezer. Tor çap edilen düzgünlere eýerýän her gapjygy ykrar edýär. Dolandyryş guramasy we umumy kitap hem döwletler goşulyşdygyça döredilýär.",
      },
      {
        k: "Tordaky gapjyklar we tory gurýan topar",
        v: "Toruň düzgünlerine eýerýän her gapjyk torda işläp bilýär. Olaryň ilkinjisi Tamga Wallet we ol toruň işletmeýän aýry önümidir. Tory gurýan topar Gurama konsoly, Tamga Verify we ynam sanawynyň çap edilmegi ýaly salgylanma hyzmatlaryny işledýär. Kody hem açyk çeşmeli paketler hökmünde çap edýändigi üçin hiç bir gurama bir programma bagly galmaýar. Tamga Network (dörediljek gazna) adyndan wagtlaýyn işlediji: BROS İNŞAAT SANAYİ VE DIŞ TİCARET LİMİTED ŞİRKETİ.",
      },
    ],
  },
  whyNow: {
    title: "Näme üçin hut şu wagt?",
    body: (
      <>
        <p>
          Ýewropa Bileleşigi eIDAS 2.0 bilen göçme sanly subutnama modelini tutuş
          yklymda hökmany etdi. SD-JWT VC, ISO mdoc, OpenID4VC we saýlap
          paýlaşmak şeýlelikde ylmy makalalardan çykyp, häzir ulanylýan talaplara
          öwrüldi.
        </p>
        <p>
          Türkiýe güýçli sanly döwlet infrastrukturasyna (e-Döwlet, MERNİS,
          elektron gol) eýe, emma bu ynam baýlyklary köplenç merkezleşdirilen we
          biri-birinden üzňe ýagdaýda. Dünýä göçme subutnama modeline geçende
          Türkiýe bu modeli ýa daşardan getirer ýa-da{" "}
          <strong>öz özygtyýarly we laýyk infrastrukturasyny öndürer.</strong> Biz
          ikinji ýoluň üstünde işleýäris.
        </p>
      </>
    ),
    ctaDocs: "Başdan öwren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifest",
  },
  contact: {
    eyebrow: "Habarlaşmak",
    title: "Biz bilen habarlaşyň",
    lead: "Soragyňyza laýyk gelýän salga ýazyň. Adatça birnäçe iş gününiň içinde jogap berýäris.",
    items: [
      { email: "info@tamga.network", label: "Umumy", note: "Taslama we tor barada soraglar." },
      { email: "partners@tamga.network", label: "Goşulmak", note: "Gurama, gapjyk üpjün ediji ýa-da döwlet hökmünde tora goşulmak." },
      { email: "security@tamga.network", label: "Howpsuzlyk", note: "Howpsuzlyk gowşaklyklarynyň jogapkärli habary." },
    ],
  },
};

const az: AboutContent = {
  meta: {
    title: "Haqqımızda",
    description:
      "Tamga Network-un nə olduğu, adının haradan gəldiyi, nə etdiyi və niyə etdiyi. Tamga Network Türk dünyası üçün qurulan, Avropa İttifaqı (Aİ) ilə uyğun və üç qatdan ibarət Rəqəmsal Etibar İnfrastrukturudur.",
  },
  header: {
    eyebrow: "Haqqımızda",
    title: "Tamga Network nədir, nə edir və niyə?",
    description:
      "Tamga Network blokçeyn şəbəkəsindən daha çox Rəqəmsal Etibar İnfrastrukturudur. İşə rəqəmsal şəxsiyyətdən başlayır, amma infrastrukturun əslində yaratdığı dəyər etibardır.",
  },
  name: {
    eyebrow: "Adımız",
    title: (
      <>
        <span className="italic text-primary">Tamga</span> nədir?
      </>
    ),
    body: (
      <>
        <p>
          <strong>Tamga</strong> türk və monqol tayfalarının qədim möhürüdür.
          Heyvanlara, silahlara, xalçalara, məzar daşlarına və sənədlərə vurulan
          bu nişan bir şeyin <strong>kimə məxsus olduğunu</strong>, bir sözün{" "}
          <strong>kimdən gəldiyini</strong> və bir səlahiyyətin{" "}
          <strong>həqiqi olduğunu</strong> sübut edirdi.
        </p>
        <p>
          Hər tayfanın öz tamgası var idi və tamga eyni zamanda şəxsiyyət, imza və
          mülkiyyət sənədi rolunu oynayırdı. Bu gün yoxlanıla bilən rəqəmsal sənəd
          (Verifiable Credential) eyni işi görür. Fərq ondadır ki, bu dəfə nişan
          daşa həkk olunmaq əvəzinə riyaziyyata söykənir.
        </p>
        <p>
          Şəbəkəyə <strong>Tamga</strong> adını bu qədim etibar ənənəsinin müasir
          və rəqəmsal qarşılığı olduğu üçün verdik.
        </p>
      </>
    ),
  },
  mission: {
    title: "Missiya",
    body: "Bu gün hər tətbiq şəxsiyyət, səlahiyyətləndirmə və sənəd yoxlaması problemini öz başına yenidən həll edir. Məqsədimiz bu təkrarlanan işi ortaq və açıq infrastruktura çevirmək və etibarı bütün tətbiqlərin söykənə biləcəyi ortaq bir qatdan təmin etməkdir.",
  },
  vision: {
    title: "Vizyon",
    body: (
      <>
        Türkiyədən başlayıb Türk dünyasına açılan bir{" "}
        <strong className="text-foreground">etibar şəbəkəsi</strong> təsəvvür
        edirik. Bu şəbəkədə hər ölkə öz suveren etibar şəbəkəsini qoruyur və ortaq
        standartlar vasitəsilə digərlərinə qoşulur. Beləliklə şəxsiyyət, diplom və
        sənədlər sərhədin o tayında da yoxlanıla bilir.
      </>
    ),
  },
  positioning: {
    eyebrow: "Mövqe",
    title: "Üç qat: Aİ ilə uyğunluq, federasiya, şəbəkədəki rəqəmsal cüzdanlar",
    lead: (
      <>
        Tamga hər biri müstəqil dayana bilən üç qatda qurulur. Təməli{" "}
        <strong className="text-foreground">Aİ-nin eIDAS 2.0 / EUDI standartları ilə uyğunluq</strong> təşkil edir. Onun üzərində{" "}
        <strong className="text-foreground">Tamga Network</strong> türk dövlətlərinin etibar siyahılarını bir araya
        gətirir. <strong className="text-foreground">Şəbəkədəki rəqəmsal cüzdanlar</strong> (birincisi
        Tamga Wallet) və şəbəkənin istinad xidmətləri də bu təməl üzərində işləyir.
      </>
    ),
    rows: [
      {
        k: "Aİ ilə uyğun təməl",
        v: "Rəqəmsal sənədlər, protokollar və etibar siyahıları Aİ standartlarına əməl edir. “EUDI Wallet” yalnız Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı rəqəmsal cüzdanlara verilən hüquqi ad olduğu üçün şəbəkənin ilk rəqəmsal cüzdanı Tamga Wallet-i Aİ ilə uyğun cüzdan kimi təqdim edirik. Qarşılıqlı işləmə qabiliyyətini test nəticələri ilə göstərəcəyik.",
      },
      {
        k: "Tamga Network, yüngül federasiya",
        v: "Şəbəkə hər dövlətin etibar siyahısını toplayır və dövlətlərin bir-birini tanımasına imkan verir. Türkiyənin siyahısını hazırda Tamga dövlət adından müvəqqəti olaraq dərc edir. Dövlət və ya onun səlahiyyət verdiyi qurum öz siyahısını dərc edəndə şəbəkə həmin siyahını göstərəcək. Şəbəkə dərc olunmuş qaydalara əməl edən istənilən rəqəmsal cüzdanı tanıyır. İdarəetmə orqanı və ortaq reyestr də dövlətlər qoşulduqca formalaşacaq.",
      },
      {
        k: "Şəbəkədəki rəqəmsal cüzdanlar və şəbəkəni quran komanda",
        v: "Şəbəkənin qaydalarına əməl edən istənilən rəqəmsal cüzdan şəbəkədə işləyə bilər. Bunların birincisi Tamga Wallet-dir və o, şəbəkənin idarə etmədiyi ayrıca məhsuldur. Şəbəkəni quran komanda Qurum Konsolu, Tamga Verify və etibar siyahısının dərci kimi istinad xidmətlərini idarə edir. Kodu da açıq mənbəli paketlər kimi dərc etdiyi üçün heç bir qurum bir tətbiqə bağlı qalmır. Tamga Network (yaradılacaq fond) adından müvəqqəti operator: BROS İNŞAAT SANAYİ VE DIŞ TİCARET LİMİTED ŞİRKETİ.",
      },
    ],
  },
  whyNow: {
    title: "Niyə indi?",
    body: (
      <>
        <p>
          Avropa İttifaqı eIDAS 2.0 ilə daşına bilən rəqəmsal sübut modelini bütün
          qitədə məcburi etdi. SD-JWT VC, ISO mdoc, OpenID4VC və seçici paylaşım
          (selective disclosure) beləliklə elmi məqalələrdən çıxıb bu gün tətbiq
          olunan tələblərə çevrildi.
        </p>
        <p>
          Türkiyə güclü rəqəmsal dövlət infrastrukturuna (e-Devlet, MERNİS,
          elektron imza) malikdir, lakin bu etibar aktivləri əsasən
          mərkəzləşdirilmiş və bir-birindən ayrı vəziyyətdədir. Dünya daşına bilən
          sübut modelinə keçdikcə Türkiyə bu modeli ya xaricdən gətirəcək, ya da{" "}
          <strong>öz suveren və uyğun infrastrukturunu yaradacaq.</strong>{" "}
          Biz ikinci yol üzərində çalışırıq.
        </p>
      </>
    ),
    ctaDocs: "Sıfırdan öyrənin →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifest",
  },
  contact: {
    eyebrow: "Əlaqə",
    title: "Bizimlə əlaqə saxlayın",
    lead: "Sualınıza uyğun ünvana yazın. Adətən bir neçə iş günü ərzində cavab veririk.",
    items: [
      { email: "info@tamga.network", label: "Ümumi", note: "Layihə və şəbəkə ilə bağlı suallar." },
      { email: "partners@tamga.network", label: "Üzvlük", note: "Qurum, cüzdan provayderi və ya dövlət kimi şəbəkəyə qoşulma." },
      { email: "security@tamga.network", label: "Təhlükəsizlik", note: "Zəifliklər barədə məsuliyyətli məlumatlandırma." },
    ],
  },
};

const content: Record<Locale, AboutContent> = { en, tr, tk, az };

export function getAboutContent(locale: string): AboutContent {
  return content[locale as Locale] ?? en;
}

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
      "What Tamga Network is, where its name comes from, and what it does and why. The EBSI of the Turkic world: a compatible yet independent Digital Trust Infrastructure.",
  },
  header: {
    eyebrow: "About",
    title: "What is Tamga Network, and what does it do and why?",
    description:
      "Not a blockchain network, but a Digital Trust Infrastructure. Digital identity is the starting point; trust is the real value the infrastructure produces.",
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
          Every tribe had its own tamga; the tamga was identity, signature and
          title of ownership all at once. Today a verifiable digital credential
          (Verifiable Credential) does exactly the same job — only it is engraved
          into mathematics, not stone.
        </p>
        <p>
          That is why our name is <strong>Tamga</strong>: the modern, digital
          counterpart of an ancient tradition of trust.
        </p>
      </>
    ),
  },
  mission: {
    title: "Mission",
    body: "To turn the problem of identity, authorization and document verification — the problem every application solves again and again — into a shared infrastructure service. To build a world where trust is provided by a shared layer, not by each application alone.",
  },
  vision: {
    title: "Vision",
    body: (
      <>
        A <strong className="text-foreground">Trust Mesh</strong> that starts in
        Türkiye and opens to the Turkic world, where each country keeps its own
        sovereign trust network while connecting to others through shared
        standards. Verifiable identity, diplomas and documents across borders.
      </>
    ),
  },
  positioning: {
    eyebrow: "Positioning",
    title: "The EBSI of the Turkic world",
    lead: (
      <>
        The European Union’s infrastructure layer is{" "}
        <strong className="text-foreground">EBSI</strong> (European Blockchain
        Services Infrastructure), and its application layer is the{" "}
        <strong className="text-foreground">EUDI Wallet</strong>. Tamga Network is
        the counterpart of this layered model for the Turkic world — not a
        competitor to EBSI, but interoperable with it.
      </>
    ),
    rows: [
      {
        k: "Layered model",
        v: "Infrastructure = Tamga Network (like EBSI). Application/wallet = TamgaID (like the EUDI Wallet). Two separate but complementary layers.",
      },
      {
        k: "States with equal power",
        v: "Target: the states of the Organization of Turkic States run the network with equal votes. Today Tamga publishes the trust lists provisionally, on behalf of the states — every structure already has a slot for each member state.",
      },
      {
        k: "Compatible yet independent",
        v: "Built on the eIDAS 2.0 / EUDI profiles; identity and trust data are managed in-country, in a sovereign architecture.",
      },
    ],
  },
  whyNow: {
    title: "Why now?",
    body: (
      <>
        <p>
          The European Union made the portable digital proof model mandatory at
          continental scale with eIDAS 2.0. SD-JWT VC, ISO mdoc, OpenID4VC
          and selective disclosure are no longer academic concepts but applied
          requirements.
        </p>
        <p>
          Türkiye has a strong digital public infrastructure (e-Devlet, MERNİS,
          e-signature), but these trust assets are largely centralized and
          disconnected. As the world moves to the portable proof model, Türkiye
          will either import it or{" "}
          <strong>produce its own sovereign, compatible infrastructure.</strong>{" "}
          We are building the second path.
        </p>
      </>
    ),
    ctaDocs: "Learn the concepts from scratch →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "Reach the right desk directly. We usually reply within a few business days.",
    items: [
      { email: "info@tamga.network", label: "General", note: "Questions about the project and the network." },
      { email: "partners@tamga.network", label: "Partnerships", note: "Institutions, states and integration partners." },
      { email: "support@tamga.network", label: "Support", note: "Help with TamgaID and our products." },
      { email: "security@tamga.network", label: "Security", note: "Responsible disclosure of vulnerabilities." },
    ],
  },
};

const tr: AboutContent = {
  meta: {
    title: "Hakkında",
    description:
      "Tamga Network nedir, ismi nereden gelir, neyi neden yapar. Türk dünyasının EBSI’si: uyumlu ama bağımsız bir Dijital Güven Altyapısı.",
  },
  header: {
    eyebrow: "Hakkında",
    title: "Tamga Network nedir, neyi neden yapar?",
    description:
      "Bir blockchain ağı değil, bir Dijital Güven Altyapısı. Dijital kimlik başlangıç noktası, güven ise altyapının ürettiği asıl değerdir.",
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
          <strong>Tamga</strong>; Türk ve Moğol boylarının kadim mührüdür.
          Hayvanlara, silahlara, halılara, mezar taşlarına ve belgelere vurulan
          bu işaret, bir şeyin <strong>kime ait olduğunu</strong>, bir sözün{" "}
          <strong>kimden geldiğini</strong> ve bir yetkinin{" "}
          <strong>gerçek olduğunu</strong> kanıtlardı.
        </p>
        <p>
          Her boyun kendi tamgası vardı; tamga hem kimlikti hem imza hem de
          mülkiyet belgesi. Bugün doğrulanabilir dijital belge (Verifiable
          Credential) tam olarak aynı işi görür — yalnızca taşa değil, matematiğe
          kazınır.
        </p>
        <p>
          Bu yüzden adımız <strong>Tamga</strong>: kadim bir güven geleneğinin
          çağdaş, dijital karşılığı.
        </p>
      </>
    ),
  },
  mission: {
    title: "Misyon",
    body: "Kimlik, yetkilendirme ve belge doğrulama problemini — her uygulamanın tekrar tekrar çözdüğü bu problemi — ortak bir altyapı hizmetine dönüştürmek. Güveni tek tek uygulamaların değil, ortak bir katmanın sağladığı bir dünya kurmak.",
  },
  vision: {
    title: "Vizyon",
    body: (
      <>
        Türkiye’den başlayıp Türk dünyasına açılan; her ülkenin kendi egemen
        güven ağını koruyarak ortak standartlarla birbirine bağlandığı bir{" "}
        <strong className="text-foreground">Trust Mesh</strong>. Sınır ötesinde
        doğrulanabilir kimlik, diploma ve belge.
      </>
    ),
  },
  positioning: {
    eyebrow: "Konumlandırma",
    title: "Türk dünyasının EBSI’si",
    lead: (
      <>
        Avrupa Birliği’nin altyapı katmanı{" "}
        <strong className="text-foreground">EBSI</strong> (European Blockchain
        Services Infrastructure), uygulama katmanı ise{" "}
        <strong className="text-foreground">EUDI Wallet</strong>’tır. Tamga
        Network bu katmanlı modelin Türk dünyası için karşılığıdır — EBSI ile
        rakip değil, birlikte çalışabilir.
      </>
    ),
    rows: [
      {
        k: "Katmanlı model",
        v: "Altyapı = Tamga Network (EBSI benzeri). Uygulama/cüzdan = TamgaID (EUDI benzeri). İkisi ayrı ama tamamlayıcı.",
      },
      {
        k: "Eşit güçlü devletler",
        v: "Hedef: ağı Türk Devletleri Teşkilatı devletleri eşit oyla işletir. Bugün Tamga güven listelerini devletler adına geçici operatör olarak yayınlar — her yapıda her üye devlet için şimdiden bir yer ayrılmıştır.",
      },
      {
        k: "Uyumlu ama bağımsız",
        v: "eIDAS 2.0 / EUDI profilleri üzerine kurulu; kimlik ve güven verisi yurt içinde, egemen bir mimaride yönetilir.",
      },
    ],
  },
  whyNow: {
    title: "Neden şimdi?",
    body: (
      <>
        <p>
          Avrupa Birliği, eIDAS 2.0 ile taşınabilir dijital kanıt modelini
          kıtasal ölçekte zorunlu hâle getirdi. SD-JWT VC, ISO mdoc,
          OpenID4VC ve seçici açıklama artık akademik kavramlar değil, uygulanan
          gereksinimler.
        </p>
        <p>
          Türkiye güçlü bir dijital kamu altyapısına (e-Devlet, MERNİS, e-imza)
          sahip; ancak bu güven varlıkları büyük ölçüde merkezî ve birbirinden
          kopuk. Dünya taşınabilir kanıt modeline geçerken Türkiye ya bunu ithal
          edecek ya da <strong>kendi egemen, uyumlu altyapısını üretecek.</strong>{" "}
          Biz ikinci yolu inşa ediyoruz.
        </p>
      </>
    ),
    ctaDocs: "Kavramları sıfırdan öğren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Bize ulaşın",
    lead: "Doğrudan doğru birime yazın. Genellikle birkaç iş günü içinde yanıt veriyoruz.",
    items: [
      { email: "info@tamga.network", label: "Genel", note: "Proje ve ağ hakkındaki sorular." },
      { email: "partners@tamga.network", label: "İş birlikleri", note: "Kurumlar, devletler ve entegrasyon ortakları." },
      { email: "support@tamga.network", label: "Destek", note: "TamgaID ve ürünlerimiz için yardım." },
      { email: "security@tamga.network", label: "Güvenlik", note: "Güvenlik açıklarının sorumlu bildirimi." },
    ],
  },
};

const tk: AboutContent = {
  meta: {
    title: "Biz barada",
    description:
      "Tamga Network näme, ady nireden gelýär, näme edýär we näme üçin. Türki dünýäsiniň EBSI-si: laýyk ýöne garaşsyz Sanly Ynam Infrastrukturasy.",
  },
  header: {
    eyebrow: "Biz barada",
    title: "Tamga Network näme, näme edýär we näme üçin?",
    description:
      "Blokçeýn tory däl, Sanly Ynam Infrastrukturasy. Sanly şahsyýet başlangyç nokat; ynam bolsa infrastrukturanyň öndürýän esasy gymmaty.",
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
          <strong>Tamga</strong> — türki we mongol taýpalarynyň gadymy möhüridir.
          Haýwanlara, ýaraglara, halylara, gonamçylyk daşlaryna we resminamalara
          basylan bu belgi, bir zadyň <strong>kime degişlidigini</strong>, bir
          sözüň <strong>kimden gelendigini</strong> we bir ygtyýaryň{" "}
          <strong>hakykydygyny</strong> subut edýärdi.
        </p>
        <p>
          Her taýpanyň öz tamgasy bardy; tamga hem şahsyýet, hem gol, hem-de
          eýeçilik resminamasydy. Bu gün barlanyp bilinýän sanly resminama
          (Verifiable Credential) hut şol bir işi edýär — diňe daşa däl,
          matematika ýazylýar.
        </p>
        <p>
          Şonuň üçin adymyz <strong>Tamga</strong>: gadymy ynam däbiniň häzirki
          zaman, sanly garşylygy.
        </p>
      </>
    ),
  },
  mission: {
    title: "Wezipe",
    body: "Şahsyýet, ygtyýarlandyrma we resminama barlagy meselesini — her programmanyň gaýta-gaýta çözýän bu meselesini — umumy infrastruktura hyzmatyna öwürmek. Ynamy her programmanyň däl-de, umumy gatlagyň üpjün edýän dünýäsini gurmak.",
  },
  vision: {
    title: "Garaýyş",
    body: (
      <>
        Türkiýeden başlap türki dünýäsine açylýan; her ýurduň öz özygtyýarly ynam
        toruny saklap, umumy standartlar bilen biri-birine baglanýan{" "}
        <strong className="text-foreground">Trust Mesh</strong>. Serhetden aňry
        barlanyp bilinýän şahsyýet, diplom we resminama.
      </>
    ),
  },
  positioning: {
    eyebrow: "Ýerleşdiriş",
    title: "Türki dünýäsiniň EBSI-si",
    lead: (
      <>
        Ýewropa Bileleşiginiň infrastruktura gatlagy{" "}
        <strong className="text-foreground">EBSI</strong> (European Blockchain
        Services Infrastructure), programma gatlagy bolsa{" "}
        <strong className="text-foreground">EUDI Wallet</strong>-dir. Tamga
        Network bu gatlakly modeliň türki dünýäsi üçin garşylygydyr — EBSI bilen
        bäsdeş däl, bilelikde işleýän.
      </>
    ),
    rows: [
      {
        k: "Gatlakly model",
        v: "Infrastruktura = Tamga Network (EBSI ýaly). Programma/gapjyk = TamgaID (EUDI ýaly). Ikisi aýry ýöne biri-birini doldurýan.",
      },
      {
        k: "Deň güýçli döwletler",
        v: "Maksat: tory Türki Döwletleriň Guramasynyň döwletleri deň ses bilen dolandyrýar. Häzir Tamga ynam sanawlaryny döwletleriň adyndan wagtlaýyn operator hökmünde çap edýär — her gurluşda her agza döwlet üçin eýýäm orun bar.",
      },
      {
        k: "Laýyk ýöne garaşsyz",
        v: "eIDAS 2.0 / EUDI profillerine esaslanýar; şahsyýet we ynam maglumaty ýurt içinde, özygtyýarly arhitekturada dolandyrylýar.",
      },
    ],
  },
  whyNow: {
    title: "Näme üçin hut şu wagt?",
    body: (
      <>
        <p>
          Ýewropa Bileleşigi eIDAS 2.0 bilen göçme sanly subutnama modelini yklym
          möçberinde hökmany etdi. SD-JWT VC, ISO mdoc, OpenID4VC we saýlama
          açyklama indi akademiki düşünjeler däl, ulanylýan talaplardyr.
        </p>
        <p>
          Türkiýe güýçli sanly döwlet infrastrukturasyna (e-Döwlet, MERNİS,
          elektron gol) eýe; emma bu ynam baýlyklary köplenç merkezleşdirilen we
          biri-birinden üzňe. Dünýä göçme subutnama modeline geçende Türkiýe ýa
          muny getirer ýa-da{" "}
          <strong>öz özygtyýarly, laýyk infrastrukturasyny öndürer.</strong> Biz
          ikinji ýoly gurýarys.
        </p>
      </>
    ),
    ctaDocs: "Düşünjeleri başdan öwren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifest",
  },
  contact: {
    eyebrow: "Habarlaşmak",
    title: "Biz bilen habarlaşyň",
    lead: "Göni degişli bölüme ýazyň. Adatça birnäçe iş gününiň içinde jogap berýäris.",
    items: [
      { email: "info@tamga.network", label: "Umumy", note: "Taslama we tor barada soraglar." },
      { email: "partners@tamga.network", label: "Hyzmatdaşlyk", note: "Edaralar, döwletler we integrasiýa hyzmatdaşlary." },
      { email: "support@tamga.network", label: "Goldaw", note: "TamgaID we önümlerimiz üçin kömek." },
      { email: "security@tamga.network", label: "Howpsuzlyk", note: "Howpsuzlyk gowşaklyklarynyň jogapkärli habary." },
    ],
  },
};

const content: Record<Locale, AboutContent> = { en, tr, tk };

export function getAboutContent(locale: string): AboutContent {
  return content[locale as Locale] ?? en;
}

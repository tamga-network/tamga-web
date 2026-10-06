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
      "What Tamga Network is, where its name comes from, and what it does and why. An EU-compatible Digital Trust Infrastructure for the Turkic world, in three layers.",
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
    body: "To turn the problem of identity, authorization and document verification — the problem every application solves again and again — into a shared, open infrastructure. To build a world where trust is provided by a shared layer, not by each application alone.",
  },
  vision: {
    title: "Vision",
    body: (
      <>
        A <strong className="text-foreground">trust network</strong> that starts in
        Türkiye and opens to the Turkic world, where each country keeps its own
        sovereign trust network while connecting to others through shared
        standards. Verifiable identity, diplomas and documents across borders.
      </>
    ),
  },
  positioning: {
    eyebrow: "Positioning",
    title: "Three layers: EU-compatible, a federation, wallets on the network",
    lead: (
      <>
        Tamga is built in three layers that each stand on their own. The base is{" "}
        <strong className="text-foreground">compatibility with the EU’s eIDAS 2.0 / EUDI standards</strong>; on top
        of it, <strong className="text-foreground">Tamga Network</strong> brings the trust lists of the Turkic states
        together; on that base run <strong className="text-foreground">the wallets on the network</strong> (the first is
        Tamga Wallet) and the network’s reference services.
      </>
    ),
    rows: [
      {
        k: "EU-compatible base",
        v: "Credentials, protocols and trust lists follow EU standards. An “EUDI Wallet” is a legal title for wallets that an EU member state provides or recognises; Tamga Wallet, the network’s first wallet, is EU-compatible; interoperability will be shown with test results.",
      },
      {
        k: "Tamga Network — a light federation",
        v: "Collects each state’s trust list and lets the states recognise one another. Today Tamga publishes Türkiye’s list provisionally, on behalf of the state; when the state or the body it authorises publishes its own, the network points to it. The network recognises any wallet that follows the published rules. A governance body and a shared ledger come as states join.",
      },
      {
        k: "Wallets on the network and the team that builds it",
        v: "Any wallet that follows the network’s rules works on the network; Tamga Wallet is the first, a separate product that the network does not run. The team that builds the network runs the reference services — the Institution Console, Tamga Verify, trust-list publication — and publishes the code as open-source packages, so no institution is tied to one app.",
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
    ctaDocs: "Learn from scratch →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    lead: "Reach the right desk directly. We usually reply within a few business days.",
    items: [
      { email: "info@tamga.network", label: "General", note: "Questions about the project and the network." },
      { email: "partners@tamga.network", label: "Membership", note: "Joining the network: institutions, wallet providers and states." },
      { email: "security@tamga.network", label: "Security", note: "Responsible disclosure of vulnerabilities." },
    ],
  },
};

const tr: AboutContent = {
  meta: {
    title: "Hakkında",
    description:
      "Tamga Network nedir, ismi nereden gelir, neyi neden yapar. Türk dünyası için AB uyumlu, üç katmanlı bir Dijital Güven Altyapısı.",
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
    body: "Kimlik, yetkilendirme ve belge doğrulama problemini — her uygulamanın tekrar tekrar çözdüğü bu problemi — ortak ve açık bir altyapıya dönüştürmek. Güveni tek tek uygulamaların değil, ortak bir katmanın sağladığı bir dünya kurmak.",
  },
  vision: {
    title: "Vizyon",
    body: (
      <>
        Türkiye’den başlayıp Türk dünyasına açılan; her ülkenin kendi egemen
        güven ağını koruyarak ortak standartlarla birbirine bağlandığı bir{" "}
        <strong className="text-foreground">güven ağı</strong>. Sınır ötesinde
        doğrulanabilir kimlik, diploma ve belge.
      </>
    ),
  },
  positioning: {
    eyebrow: "Konumlanma",
    title: "Üç katman: AB uyumu, federasyon, ağdaki cüzdanlar",
    lead: (
      <>
        Tamga, her biri tek başına ayakta durabilen üç katmanda kuruludur. Taban,{" "}
        <strong className="text-foreground">AB’nin eIDAS 2.0 / EUDI standartlarıyla uyumdur</strong>; onun üstünde{" "}
        <strong className="text-foreground">Tamga Network</strong> Türk devletlerinin güven listelerini bir araya
        getirir; bu zeminde <strong className="text-foreground">ağdaki cüzdanlar</strong> (ilki Tamga Wallet) ve ağın
        referans hizmetleri çalışır.
      </>
    ),
    rows: [
      {
        k: "AB uyumlu taban",
        v: "Belgeler, protokoller ve güven listeleri AB standartlarındadır. “EUDI Wallet”, bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlar için hukuki bir unvandır; ağın ilk cüzdanı Tamga Wallet AB uyumludur; birlikte çalışabilirlik test sonuçlarıyla gösterilecek.",
      },
      {
        k: "Tamga Network — hafif bir federasyon",
        v: "Her devletin güven listesini toplar ve devletlerin birbirini tanımasını sağlar. Bugün Türkiye listesini Tamga, devlet adına geçici olarak yayınlar; devlet ya da yetkilendirdiği kurum kendi listesini yayınladığında ağ onu gösterir. Ağ, yayınlanmış kurallara uyan her cüzdanı tanır. Yönetişim kurumu ve ortak defter, devletler katıldıkça gelir.",
      },
      {
        k: "Ağdaki cüzdanlar ve ağı geliştiren ekip",
        v: "Ağın kurallarına uyan her cüzdan ağda çalışır; ilki Tamga Wallet’tır; ağın işletmediği ayrı bir üründür. Ağı geliştiren ekip referans hizmetleri işletir — Kurum Konsolu, Tamga Verify, güven listesi yayını — ve kodu açık kaynak paketler olarak yayınlar; hiçbir kurum tek bir uygulamaya bağlı kalmaz.",
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
          OpenID4VC ve seçici paylaşım artık akademik kavramlar değil, uygulanan
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
    ctaDocs: "Sıfırdan öğren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifesto",
  },
  contact: {
    eyebrow: "İletişim",
    title: "Bize ulaşın",
    lead: "Doğrudan doğru birime yazın. Genellikle birkaç iş günü içinde yanıt veriyoruz.",
    items: [
      { email: "info@tamga.network", label: "Genel", note: "Proje ve ağ hakkındaki sorular." },
      { email: "partners@tamga.network", label: "Katılım", note: "Ağa katılım: kurumlar, cüzdan sağlayıcılar ve devletler." },
      { email: "security@tamga.network", label: "Güvenlik", note: "Güvenlik açıklarının sorumlu bildirimi." },
    ],
  },
};

const tk: AboutContent = {
  meta: {
    title: "Biz barada",
    description:
      "Tamga Network näme, ady nireden gelýär, näme edýär we näme üçin. Türki dünýäsi üçin ÝB bilen laýyk, üç gatlakly Sanly Ynam Infrastrukturasy.",
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
    body: "Şahsyýet, ygtyýarlandyrma we resminama barlagy meselesini — her programmanyň gaýta-gaýta çözýän bu meselesini — umumy we açyk infrastruktura öwürmek. Ynamy her programmanyň däl-de, umumy gatlagyň üpjün edýän dünýäsini gurmak.",
  },
  vision: {
    title: "Garaýyş",
    body: (
      <>
        Türkiýeden başlap türki dünýäsine açylýan; her ýurduň öz özygtyýarly ynam
        toruny saklap, umumy standartlar bilen biri-birine baglanýan{" "}
        <strong className="text-foreground">ynam tory</strong>. Serhetden aňry
        barlanyp bilinýän şahsyýet, diplom we resminama.
      </>
    ),
  },
  positioning: {
    eyebrow: "Orun",
    title: "Üç gatlak: ÝB bilen laýyklyk, federasiýa, tordaky gapjyklar",
    lead: (
      <>
        Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Esasy{" "}
        <strong className="text-foreground">ÝB-niň eIDAS 2.0 / EUDI standartlaryna laýyklykdyr</strong>; onuň
        üstünde <strong className="text-foreground">Tamga Network</strong> türki döwletleriň ynam sanawlaryny bir
        ýere jemleýär; şu esasda <strong className="text-foreground">tordaky gapjyklar</strong> (ilkinjisi Tamga
        Wallet) we toruň salgylanma hyzmatlary işleýär.
      </>
    ),
    rows: [
      {
        k: "ÝB bilen laýyk esas",
        v: "Resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk. “EUDI Wallet” ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklary üçin hukuk adydyr; toruň ilkinji gapjygy Tamga Wallet ÝB bilen laýyk; bilelikde işleýşi synag netijeleri bilen görkeziler.",
      },
      {
        k: "Tamga Network — ýeňil federasiýa",
        v: "Her döwletiň ynam sanawyny jemleýär we döwletleriň biri-birini ykrar etmegine mümkinçilik berýär. Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn çap edýär; döwlet ýa-da ygtyýarlandyran guramasy öz sanawyny çap edende tor şony görkezýär. Tor çap edilen düzgünlere eýerýän her gapjygy ykrar edýär. Dolandyryş guramasy we umumy kitap döwletler goşulyşdygyça gelýär.",
      },
      {
        k: "Tordaky gapjyklar we tory gurýan topar",
        v: "Toruň düzgünlerine eýerýän her gapjyk torda işleýär; ilkinjisi Tamga Wallet; tor ony işletmeýär, ol aýry önüm. Tory gurýan topar salgylanma hyzmatlaryny işledýär — Gurama konsoly, Tamga Verify, ynam sanawynyň çap edilmegi — we kody açyk çeşmeli paketler hökmünde çap edýär; hiç bir gurama bir programma bagly galmaýar.",
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
    ctaDocs: "Başdan öwren →",
    ctaWhitepaper: "Whitepaper (PDF)",
    ctaManifesto: "Manifest",
  },
  contact: {
    eyebrow: "Habarlaşmak",
    title: "Biz bilen habarlaşyň",
    lead: "Göni degişli bölüme ýazyň. Adatça birnäçe iş gününiň içinde jogap berýäris.",
    items: [
      { email: "info@tamga.network", label: "Umumy", note: "Taslama we tor barada soraglar." },
      { email: "partners@tamga.network", label: "Goşulmak", note: "Tora goşulmak: guramalar, gapjyk üpjün edijiler we döwletler." },
      { email: "security@tamga.network", label: "Howpsuzlyk", note: "Howpsuzlyk gowşaklyklarynyň jogapkärli habary." },
    ],
  },
};

const content: Record<Locale, AboutContent> = { en, tr, tk };

export function getAboutContent(locale: string): AboutContent {
  return content[locale as Locale] ?? en;
}

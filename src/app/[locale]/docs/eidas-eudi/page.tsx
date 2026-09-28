import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "eIDAS, EUDI and EBSI",
      description:
        "The EU’s digital identity framework: eIDAS 2.0, the EUDI Wallet and EBSI. The layered model and where Tamga Network stands in this picture.",
    },
    eyebrow: "How Tamga works",
    title: "eIDAS, EUDI and EBSI",
    intro:
      "To understand Tamga Network’s position, you need to know Europe’s digital identity architecture. Because we don’t compete with it; we build the same standards for the Turkic world.",
    body: (
      <>
        <h2>eIDAS 2.0 — the framework</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and
          trust Services) is the European Union’s regulation on electronic
          identity and trust services. <strong>eIDAS 2.0</strong> is the updated
          framework that requires every member state to offer its citizens and
          businesses a digital identity wallet.
        </p>

        <h2>EUDI Wallet — the application layer</h2>
        <p>
          The <strong>European Digital Identity Wallet (EUDI Wallet)</strong> is
          the wallet in which a citizen carries their identity data, diplomas,
          driving licence and health documents on their own phone, and presents
          them <Link href="/docs/selective-disclosure">selectively</Link> across
          different services from banks to the public sector. In other words, the
          EUDI Wallet is the <strong>application</strong> in the user’s hands.
        </p>

        <h2>EBSI — the infrastructure layer</h2>
        <p>
          <strong>EBSI (European Blockchain Services Infrastructure)</strong> is
          the <strong>infrastructure</strong> layer that provides trust between
          Europe’s institutions and states. It is a permissioned blockchain
          network (Hyperledger Besu + IBFT) that keeps track of who is authorized
          to issue documents, institutions’ keys and their accreditations.
          Individual credentials are not kept here; only trust registries.
        </p>

        <Callout title="The layered model — the key insight" tone="gold">
          The <strong>infrastructure layer</strong> (EBSI) provides trust between
          states/institutions. The <strong>application layer</strong> (EUDI
          Wallet) puts it into the citizen’s hands. The two are separate but
          complementary — EUDI does not run “on top of” EBSI; they complete each
          other.
        </Callout>

        <h2>So where is Tamga Network?</h2>
        <p>We build the same layered model for Türkiye and the Turkic world:</p>
        <ul>
          <li>
            <strong>Tamga Network = the infrastructure layer</strong> (like EBSI).
            Sovereign trust registries — today signed trust lists, later a permissioned
            ledger once independent operators join.
          </li>
          <li>
            <strong>TamgaID = the application layer</strong> (like the EUDI
            Wallet). The citizen’s wallet.
          </li>
        </ul>
        <p>
          That’s why we summarize our position in one sentence:{" "}
          <strong>“the EBSI of the Turkic world.”</strong> We are not a competitor
          to EBSI; because we rest on the same standards, we are designed to be{" "}
          <strong>interoperable</strong> with it. The difference: data and
          governance stay in-country, in a sovereign architecture.
        </p>

        <Callout title="Why “compatible yet independent”?" tone="accent">
          As the world moves to the portable proof model, a country has two
          options: import this transformation from outside, or produce its own
          sovereign yet compatible infrastructure. Tamga chooses the latter — so a
          verifiable bridge to the European market is built, and identity data is
          not handed over to someone else’s infrastructure.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "eIDAS, EUDI ve EBSI",
      description:
        "Avrupa Birliği’nin dijital kimlik çerçevesi: eIDAS 2.0, EUDI Wallet ve EBSI. Katmanlı model ve Tamga Network’ün bu resimde nerede durduğu.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "eIDAS, EUDI ve EBSI",
    intro:
      "Tamga Network’ün konumunu anlamak için Avrupa’nın dijital kimlik mimarisini bilmek gerekir. Çünkü biz onunla rekabet etmiyoruz; aynı standartları Türk dünyası için kuruyoruz.",
    body: (
      <>
        <h2>eIDAS 2.0 — çerçeve</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and
          trust Services), Avrupa Birliği’nin elektronik kimlik ve güven
          hizmetleri düzenlemesidir. <strong>eIDAS 2.0</strong> ise her üye
          devletin vatandaşına ve işletmesine bir dijital kimlik cüzdanı sunmasını
          zorunlu kılan güncellenmiş çerçevedir.
        </p>

        <h2>EUDI Wallet — uygulama katmanı</h2>
        <p>
          <strong>European Digital Identity Wallet (EUDI Wallet)</strong>,
          vatandaşın kimlik bilgilerini, diplomalarını, ehliyetini ve sağlık
          belgelerini kendi telefonunda taşıdığı; bunları bankalardan kamuya farklı
          hizmetlerde{" "}
          <Link href="/docs/selective-disclosure">seçici biçimde</Link> sunabildiği
          cüzdandır. Yani EUDI Wallet, kullanıcının elindeki{" "}
          <strong>uygulama</strong>dır.
        </p>

        <h2>EBSI — altyapı katmanı</h2>
        <p>
          <strong>EBSI (European Blockchain Services Infrastructure)</strong>,
          Avrupa’nın kurumları ve devletleri arasındaki güveni sağlayan{" "}
          <strong>altyapı</strong> katmanıdır. Kimlerin belge vermeye yetkili
          olduğunu, kurumların anahtarlarını ve akreditasyonlarını tutan izinli bir
          blockchain ağıdır (Hyperledger Besu + IBFT). Bireysel belgeler burada
          tutulmaz; yalnızca güven registry’leri.
        </p>

        <Callout title="Katmanlı model — kilit kavrayış" tone="gold">
          <strong>Altyapı katmanı</strong> (EBSI) devletler/kurumlar arası güveni
          sağlar. <strong>Uygulama katmanı</strong> (EUDI Wallet) bunu vatandaşın
          eline verir. İkisi ayrı ama tamamlayıcıdır — EUDI, EBSI’nin “üstünde”
          çalışmaz; birbirini bütünler.
        </Callout>

        <h2>Peki Tamga Network nerede?</h2>
        <p>Aynı katmanlı modeli Türkiye ve Türk dünyası için kuruyoruz:</p>
        <ul>
          <li>
            <strong>Tamga Network = altyapı katmanı</strong> (EBSI benzeri). Güven
            kayıtları egemen biçimde tutulur — bugün imzalı güven listeleri, bağımsız
            operatörler katılınca izinli bir defter.
          </li>
          <li>
            <strong>TamgaID = uygulama katmanı</strong> (EUDI Wallet benzeri).
            Vatandaşın cüzdanı.
          </li>
        </ul>
        <p>
          Bu yüzden konumumuzu tek cümlede özetliyoruz:{" "}
          <strong>“Türk dünyasının EBSI’si.”</strong> EBSI ile rakip değiliz; aynı
          standartlara dayandığımız için onunla{" "}
          <strong>birlikte çalışabilir</strong> olacak şekilde tasarlanıyoruz. Fark
          şu: veri ve yönetişim yurt içinde, egemen bir mimaride kalır.
        </p>

        <Callout title="Neden “uyumlu ama bağımsız”?" tone="accent">
          Dünya taşınabilir kanıt modeline geçerken bir ülkenin iki seçeneği var:
          bu dönüşümü dışarıdan ithal etmek ya da kendi egemen ama uyumlu
          altyapısını üretmek. Tamga ikincisini seçer — böylece hem Avrupa
          pazarına doğrulanabilir bir köprü kurulur, hem de kimlik verisi bir
          başkasının altyapısına teslim edilmez.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "eIDAS, EUDI we EBSI",
      description:
        "ÝB-niň sanly şahsyýet çarçuwasy: eIDAS 2.0, EUDI Wallet we EBSI. Gatlakly model we Tamga Network-iň bu suratda nirede durýandygy.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "eIDAS, EUDI we EBSI",
    intro:
      "Tamga Network-iň ýagdaýyna düşünmek üçin Ýewropanyň sanly şahsyýet arhitekturasyny bilmeli. Sebäbi biz onuň bilen bäsleşmeýäris; şol bir standartlary türki dünýäsi üçin gurýarys.",
    body: (
      <>
        <h2>eIDAS 2.0 — çarçuwa</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and
          trust Services), Ýewropa Bileleşiginiň elektron şahsyýet we ynam
          hyzmatlary düzgünnamasydyr. <strong>eIDAS 2.0</strong> bolsa her agza
          döwletiň raýatyna we kärhanasyna sanly şahsyýet gapjygyny hödürlemegini
          hökmany edýän täzelenen çarçuwadyr.
        </p>

        <h2>EUDI Wallet — programma gatlagy</h2>
        <p>
          <strong>European Digital Identity Wallet (EUDI Wallet)</strong>,
          raýatyň şahsyýet maglumatlaryny, diplomlaryny, sürüjilik şahadatnamasyny
          we saglyk resminamalaryny öz telefonynda göterýän; olary banklardan
          döwlet edaralaryna dürli hyzmatlarda{" "}
          <Link href="/docs/selective-disclosure">saýlama görnüşde</Link>{" "}
          hödürläp bilýän gapjygydyr. Ýagny EUDI Wallet, ulanyjynyň elindäki{" "}
          <strong>programma</strong>dyr.
        </p>

        <h2>EBSI — infrastruktura gatlagy</h2>
        <p>
          <strong>EBSI (European Blockchain Services Infrastructure)</strong>,
          Ýewropanyň edaralary we döwletleri arasyndaky ynamy üpjün edýän{" "}
          <strong>infrastruktura</strong> gatlagydyr. Kimleriň resminama bermäge
          ygtyýarlydygyny, guramalaryň açarlaryny we akkreditasiýalaryny saklaýan
          rugsatly blokçeýn torudyr (Hyperledger Besu + IBFT). Şahsy resminamalar
          bu ýerde saklanmaýar; diňe ynam registrleri.
        </p>

        <Callout title="Gatlakly model — esasy düşünje" tone="gold">
          <strong>Infrastruktura gatlagy</strong> (EBSI) döwletler/guramalar
          arasyndaky ynamy üpjün edýär. <strong>Programma gatlagy</strong> (EUDI
          Wallet) muny raýatyň eline berýär. Ikisi aýry ýöne biri-birini doldurýan
          — EUDI, EBSI-niň “üstünde” işlemeýär; biri-birini doldurýar.
        </Callout>

        <h2>Onda Tamga Network nirede?</h2>
        <p>Şol bir gatlakly modeli Türkiýe we türki dünýäsi üçin gurýarys:</p>
        <ul>
          <li>
            <strong>Tamga Network = infrastruktura gatlagy</strong> (EBSI ýaly).
            Özygtyýarly ynam hasaplary — häzir gol çekilen ynam sanawlary, garaşsyz
            operatorlar goşulanda rugsatly kitap.
          </li>
          <li>
            <strong>TamgaID = programma gatlagy</strong> (EUDI Wallet ýaly).
            Raýatyň gapjygy.
          </li>
        </ul>
        <p>
          Şonuň üçin ýagdaýymyzy bir sözlemde jemleýäris:{" "}
          <strong>“türki dünýäsiniň EBSI-si.”</strong> EBSI bilen bäsdeş däl; şol
          bir standartlara daýanýandygymyz üçin onuň bilen{" "}
          <strong>bilelikde işleýän</strong> boljak görnüşde taslanýarys. Tapawut
          şu: maglumat we dolandyryş ýurt içinde, özygtyýarly arhitekturada galýar.
        </p>

        <Callout title="Näme üçin “laýyk ýöne garaşsyz”?" tone="accent">
          Dünýä göçme subutnama modeline geçende ýurduň iki saýlawy bar: bu
          özgerişi daşardan getirmek ýa-da öz özygtyýarly ýöne laýyk
          infrastrukturasyny öndürmek. Tamga ikinjisini saýlaýar — şeýlelikde hem
          Ýewropa bazaryna barlanyp bilinýän köpri gurulýar, hem-de şahsyýet
          maglumaty başga biriniň infrastrukturasyna tabşyrylmaýar.
        </Callout>
      </>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale as Locale] ?? CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale as Locale] ?? CONTENT.en;
  return (
    <DocArticle
      href="/docs/eidas-eudi"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

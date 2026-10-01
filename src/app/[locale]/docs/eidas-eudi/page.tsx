import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
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
      title: "eIDAS 2.0 and the EUDI Wallet",
      description:
        "The EU’s digital identity framework — eIDAS 2.0, the EUDI Wallet and the trust lists behind it — and how Tamga builds on the same standards for the Turkic world.",
    },
    eyebrow: "How Tamga works",
    title: "eIDAS 2.0 and the EUDI Wallet",
    intro:
      "Tamga follows the same standards as Europe’s digital identity framework. To see where Tamga stands, it helps to know how that framework works.",
    body: (
      <>
        <h2>eIDAS 2.0 — the framework</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and trust Services) is the European Union’s
          regulation on electronic identity and trust services. <strong>eIDAS 2.0</strong> requires every member state to
          offer its citizens and businesses a digital identity wallet, and defines how institutions issue and verify
          credentials in it.
        </p>

        <h2>The EUDI Wallet</h2>
        <p>
          The <strong>European Digital Identity Wallet (EUDI Wallet)</strong> is the wallet in which a person carries their
          identity, diplomas, driving licence and other credentials on their own phone and presents them{" "}
          <Link href="/docs/selective-disclosure">selectively</Link>. “EUDI Wallet” is a legal title: it belongs to wallets
          that an EU member state provides or recognises and that are certified under EU rules.
        </p>

        <h2>Trust lists — how a wallet knows who is real</h2>
        <p>
          The European Commission publishes a <strong>list of trusted lists (LOTL)</strong>. It points to each member state’s
          trusted list, signed by that state. The national lists name who may issue person identity data (PID providers),
          which wallet providers are approved, and who registers the organisations that ask for data. A wallet or verifier
          trusts one key — the LOTL’s — and learns everything else from the signed lists. Details:{" "}
          <Link href="/docs/trust-lists">trust lists</Link>.
        </p>

        <h2>Where Tamga stands</h2>
        <ul>
          <li>
            <strong>EU-compatible base.</strong> Tamga credentials (SD-JWT VC, ISO mdoc), protocols (OpenID4VCI / OpenID4VP,
            HAIP) and signed trust lists follow these standards.
          </li>
          <li>
            <strong>Tamga Network — a federation for the Turkic world.</strong> Like the Commission’s LOTL, Tamga’s list of
            lists points to each state’s trust list. Today Tamga publishes Türkiye’s list provisionally, on behalf of the
            state.
          </li>
          <li>
            <strong>Tamga Wallet — an EU-compatible wallet.</strong> Outside the EU no wallet can carry the “EUDI Wallet”
            title; Tamga Wallet speaks the same standards and will show it with interoperability tests.
          </li>
        </ul>
        <p>
          Every role in the EU model and who holds it in Tamga today: <Link href="/docs/roles">roles and terms</Link>.
        </p>

        <Callout title="When a state publishes its own list" tone="gold">
          When a state, or a body it authorises, publishes its own trust list, Tamga’s list of lists simply points to it.
          For wallets and verifiers only the address and the signer change; credentials stay valid.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "eIDAS 2.0 ve EUDI Wallet",
      description:
        "AB’nin dijital kimlik çerçevesi — eIDAS 2.0, EUDI Wallet ve arkasındaki güven listeleri — ve Tamga’nın aynı standartlar üzerine Türk dünyası için kurduğu yapı.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "eIDAS 2.0 ve EUDI Wallet",
    intro:
      "Tamga, Avrupa’nın dijital kimlik çerçevesiyle aynı standartları izler. Tamga’nın nerede durduğunu görmek için bu çerçevenin nasıl çalıştığını bilmek yardımcı olur.",
    body: (
      <>
        <h2>eIDAS 2.0 — çerçeve</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and trust Services), Avrupa Birliği’nin
          elektronik kimlik ve güven hizmetleri tüzüğüdür. <strong>eIDAS 2.0</strong> her üye devletin vatandaşlarına ve
          şirketlerine bir dijital kimlik cüzdanı sunmasını ister; kurumların bu cüzdana nasıl belge vereceğini ve nasıl
          doğrulayacağını tanımlar.
        </p>

        <h2>EUDI Wallet</h2>
        <p>
          <strong>Avrupa Dijital Kimlik Cüzdanı (EUDI Wallet)</strong>, kişinin kimliğini, diplomasını, ehliyetini ve diğer
          belgelerini kendi telefonunda taşıdığı ve{" "}
          <Link href="/docs/selective-disclosure">seçerek</Link> gösterdiği cüzdandır. “EUDI Wallet” hukuki bir unvandır:
          bir AB üye devletinin sunduğu ya da tanıdığı ve AB kurallarına göre sertifikalanan cüzdanlara aittir.
        </p>

        <h2>Güven listeleri — cüzdan kimin gerçek olduğunu nereden bilir</h2>
        <p>
          Avrupa Komisyonu bir <strong>listeler listesi (LOTL)</strong> yayınlar. Bu liste, her üye devletin kendi imzaladığı
          güven listesini gösterir. Ulusal listeler kişi kimlik verisini kimin verebileceğini (PID sağlayıcıları), hangi
          cüzdan sağlayıcılarının onaylı olduğunu ve veri isteyen kurumları kimin kaydettiğini söyler. Cüzdan ya da
          doğrulayıcı tek bir anahtara — LOTL’ninkine — güvenir; gerisini imzalı listelerden öğrenir. Ayrıntı:{" "}
          <Link href="/docs/trust-lists">güven listeleri</Link>.
        </p>

        <h2>Tamga nerede duruyor</h2>
        <ul>
          <li>
            <strong>AB uyumlu taban.</strong> Tamga belgeleri (SD-JWT VC, ISO mdoc), protokolleri (OpenID4VCI / OpenID4VP,
            HAIP) ve imzalı güven listeleri bu standartları izler.
          </li>
          <li>
            <strong>Tamga Network — Türk dünyası için bir federasyon.</strong> Komisyon’un LOTL’si gibi, Tamga’nın listeler
            listesi de her devletin güven listesini gösterir. Bugün Türkiye listesini Tamga, devlet adına geçici olarak
            yayınlar.
          </li>
          <li>
            <strong>Tamga Wallet — AB uyumlu bir cüzdan.</strong> AB dışında hiçbir cüzdan “EUDI Wallet” unvanını taşıyamaz;
            Tamga Wallet aynı standartları konuşur ve bunu birlikte çalışabilirlik testleriyle gösterecek.
          </li>
        </ul>
        <p>
          AB modelindeki her rol ve bugün Tamga’da kimde olduğu:{" "}
          <Link href="/docs/roles">roller ve terimler</Link>.
        </p>

        <Callout title="Bir devlet kendi listesini yayınladığında" tone="gold">
          Bir devlet ya da yetkilendirdiği kurum kendi güven listesini yayınladığında, Tamga’nın listeler listesi yalnızca
          onu gösterir. Cüzdan ve doğrulayıcı için yalnız adres ve imzacı değişir; belgeler geçerli kalır.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "eIDAS 2.0 we EUDI Wallet",
      description:
        "ÝB-niň sanly şahsyýet çarçuwasy — eIDAS 2.0, EUDI Wallet we onuň arkasyndaky ynam sanawlary — we Tamga-nyň şol standartlarda türki dünýäsi üçin guran gurluşy.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "eIDAS 2.0 we EUDI Wallet",
    intro:
      "Tamga Ýewropanyň sanly şahsyýet çarçuwasy bilen şol bir standartlara eýerýär. Tamga-nyň nirede durandygyny görmek üçin bu çarçuwanyň nähili işleýändigini bilmek peýdaly.",
    body: (
      <>
        <h2>eIDAS 2.0 — çarçuwa</h2>
        <p>
          <strong>eIDAS</strong> (electronic IDentification, Authentication and trust Services) Ýewropa Bileleşiginiň
          elektron şahsyýet we ynam hyzmatlary baradaky düzgünnamasy. <strong>eIDAS 2.0</strong> her agza döwletden
          raýatlaryna we kompaniýalaryna sanly şahsyýet gapjygyny hödürlemegini talap edýär we guramalaryň oňa resminamany
          nähili berjekdigini we barlajakdygyny kesgitleýär.
        </p>

        <h2>EUDI Wallet</h2>
        <p>
          <strong>Ýewropa Sanly Şahsyýet Gapjygy (EUDI Wallet)</strong> adamyň şahsyýetini, diplomyny, sürüjilik
          şahadatnamasyny we beýleki resminamalaryny öz telefonynda göterýän we{" "}
          <Link href="/docs/selective-disclosure">saýlap</Link> görkezýän gapjygy. “EUDI Wallet” hukuk ady: ÝB agza
          döwletiniň hödürleýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlaşdyrylan gapjyklaryna degişli.
        </p>

        <h2>Ynam sanawlary — gapjyk kimiň hakykydygyny nireden bilýär</h2>
        <p>
          Ýewropa Komissiýasy <strong>sanawlaryň sanawyny (LOTL)</strong> çap edýär. Ol her agza döwletiň özi gol çeken ynam
          sanawyny görkezýär. Milli sanawlar şahsy şahsyýet maglumatyny kimiň berip biljekdigini (PID üpjün edijileri),
          haýsy gapjyk üpjün edijileriň tassyklanandygyny we maglumat soraýan guramalary kimiň hasaba alýandygyny aýdýar.
          Gapjyk ýa-da barlaýjy diňe bir açara — LOTL-iňkä — ynanýar; galanyny gol çekilen sanawlardan öwrenýär.
          Jikme-jiklik: <Link href="/docs/trust-lists">ynam sanawlary</Link>.
        </p>

        <h2>Tamga nirede durýar</h2>
        <ul>
          <li>
            <strong>ÝB bilen laýyk esas.</strong> Tamga resminamalary (SD-JWT VC, ISO mdoc), protokollary (OpenID4VCI /
            OpenID4VP, HAIP) we gol çekilen ynam sanawlary şu standartlara eýerýär.
          </li>
          <li>
            <strong>Tamga Network — türki dünýäsi üçin federasiýa.</strong> Komissiýanyň LOTL-i ýaly, Tamga-nyň sanawlaryň
            sanawy her döwletiň ynam sanawyny görkezýär. Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn çap
            edýär.
          </li>
          <li>
            <strong>Tamga Wallet — ÝB bilen laýyk gapjyk.</strong> ÝB-den daşarda hiç bir gapjyk “EUDI Wallet” adyny
            göterip bilmeýär; Tamga Wallet şol standartlarda gürleýär we muny bilelikde işleýiş synaglary bilen görkezer.
          </li>
        </ul>
        <p>
          ÝB modelindäki her rol we häzir Tamga-da kimde: <Link href="/docs/roles">rollar we adalgalar</Link>.
        </p>

        <Callout title="Döwlet öz sanawyny çap edende" tone="gold">
          Döwlet ýa-da ygtyýarlandyran guramasy öz ynam sanawyny çap edende, Tamga-nyň sanawlaryň sanawy diňe şony
          görkezýär. Gapjyk we barlaýjy üçin diňe salgy we gol çekiji üýtgeýär; resminamalar güýjünde galýar.
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
  return pageMeta(locale, "/docs/eidas-eudi", { title: c.meta.title, description: c.meta.description });
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CodeBlock } from "@/components/doc-article";
import { FlowStrip } from "@/components/scenario-visuals";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

/*
 * Kaynak: D-ID-1 (X.509), D-CRED-1 (SD-JWT VC + mdoc, OpenID4VCI/VP, ES256, cnf zorunlu, Token Status List),
 * D-SCHEMA-4 (vct URN + katalog), ADR-0013 (mdoc), SPEC-WALLET-0001 WL5 (doğrulayıcı başına kopya), PR6 (10 kopya), IDP10.
 * Rota adı "did-vc" eski bağlantılar kırılmasın diye korundu.
 */
const SDJWT = `{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-…",          // type definition in the catalogue
  "iat": 1790000000,
  "cnf": { "jwk": { … } },               // the device key of THIS copy
  "status": { "status_list": { "idx": 48213, "uri": "https://status.tamga.network/…" } },
  "_sd": [ "…", "…", "…" ],              // hidden fields: salted hashes only
  "degree_title": "…"                    // revealed only if you approve
}
header: x5c = the university's X.509 certificate chain`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Credentials: X.509, SD-JWT VC and mdoc",
      description:
        "How institutions are identified (X.509), how people are not tracked (a device key and a separate copy per verifier), and the two credential formats Tamga uses: SD-JWT VC and ISO 18013-5 mdoc.",
    },
    eyebrow: "Concepts",
    title: "Credentials: X.509, SD-JWT VC and mdoc",
    intro:
      "A verifiable credential is a document with a digital seal: a diploma, a student card, an identity document, a ticket. This page explains who is identified how, what a credential contains, and how it travels.",
    body: (
      <>
        <h2>Who is identified, and how</h2>
        <ul>
          <li>
            <strong>Institutions</strong> are identified by <strong>X.509 certificates</strong>{" "}
            chained to a national root authority — the same approach as the EUDI Wallet, and one
            regulators can read. The institution’s identifier is derived from its certificate and
            is listed in the <Link href="/docs/trust-lists">trust list</Link>.
          </li>
          <li>
            <strong>People have no global identifier.</strong> Each copy of a credential is bound
            to a key that lives on your phone. The wallet keeps several copies and gives{" "}
            <strong>each verifier a different one</strong>, so two verifiers cannot match you by
            comparing what they received.
          </li>
          <li>
            Your national ID number exists only inside your <strong>identity credential</strong>,
            and is shared only when a request asks for it and you approve.
          </li>
        </ul>
        <Callout title="What about DIDs?" tone="accent">
          Decentralized Identifiers (DIDs) are common in the W3C credential world. Tamga uses
          X.509 for institutions because the EU’s EUDI architecture does, and because
          certificates already have legal standing. A <code>did:web</code> bridge for
          interoperability is planned; it is not needed to issue or verify.
        </Callout>

        <h2>Two formats, one data model</h2>
        <ul>
          <li>
            <strong>SD-JWT VC</strong> (IETF) — the main format, for online presentation: websites,
            employers, institutions. Each field is hidden behind a salted hash and revealed only if
            you approve it.
          </li>
          <li>
            <strong>ISO 18013-5 mdoc</strong> — the mobile driving licence format, for close-range
            and age checks. Today the identity credential also comes as an mdoc: an age check
            receives <code>age_over_18</code> and nothing else.
          </li>
        </ul>
        <p>
          The document type is a stable name such as{" "}
          <code>urn:tamga:edu:DiplomaCredential:1</code>; its definition sits in a public catalogue,
          and every credential carries a hash of that definition.
        </p>
        <CodeBlock label="An SD-JWT VC diploma (decoded, shortened)" code={SDJWT} />

        <h2>How a credential travels</h2>
        <FlowStrip
          nodes={[
            { label: "Issuer", sub: "OpenID4VCI · 10 copies" },
            { label: "Wallet", sub: "keys on the device" },
            { label: "Verifier", sub: "OpenID4VP · checks A–E" },
          ]}
        />
        <ul>
          <li>
            <strong>Issuance (OpenID4VCI).</strong> The institution shows a QR code; the PIN is
            shown on the same screen but never sent inside the link. Or the wallet starts from the
            institution directory and proves your identity first. The wallet receives ten copies,
            each bound to a different device key.
          </li>
          <li>
            <strong>Presentation (OpenID4VP).</strong> The verifier’s request is signed with its
            registered certificate; the wallet checks it against the trust list, shows what is
            asked, and sends an encrypted answer with only the approved fields plus a proof that
            the key is on this phone.
          </li>
          <li>
            <strong>Checks.</strong> Signature and device proof, document type, issuer authorization
            on the issue date, revocation status, and freshness of the data — then one of three
            answers: accepted, rejected or indeterminate.
          </li>
        </ul>

        <Callout title="Key point" tone="primary">
          The verifier never contacts the issuer. It needs the issuer’s certificate status (from
          the signed trust list) and the revocation list (published by the issuer at a fixed
          interval and cached). A copied screenshot fails: it carries no device proof.
        </Callout>

        <p>
          Next: <Link href="/docs/selective-disclosure">how to share less data</Link> when
          presenting a credential.
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Belgeler: X.509, SD-JWT VC ve mdoc",
      description:
        "Kurumlar nasıl tanımlanır (X.509), kişiler nasıl izlenmez (cihaz anahtarı ve her doğrulayıcıya ayrı kopya) ve Tamga’nın kullandığı iki belge biçimi: SD-JWT VC ve ISO 18013-5 mdoc.",
    },
    eyebrow: "Kavramlar",
    title: "Belgeler: X.509, SD-JWT VC ve mdoc",
    intro:
      "Doğrulanabilir belge, dijital mührü olan bir belgedir: diploma, öğrenci belgesi, kimlik, bilet. Bu sayfa kimin nasıl tanımlandığını, bir belgenin içinde ne olduğunu ve nasıl yol aldığını anlatır.",
    body: (
      <>
        <h2>Kim, nasıl tanımlanır</h2>
        <ul>
          <li>
            <strong>Kurumlar</strong> ulusal kök otoriteye bağlı{" "}
            <strong>X.509 sertifikalarıyla</strong> tanımlanır — EUDI Wallet ile aynı yaklaşım ve
            düzenleyicilerin okuyabildiği bir yapı. Kurumun kimliği sertifikasından türetilir ve{" "}
            <Link href="/docs/trust-lists">güven listesinde</Link> kayıtlıdır.
          </li>
          <li>
            <strong>Kişilerin küresel bir tanımlayıcısı yoktur.</strong> Belgenin her kopyası
            telefonundaki bir anahtara bağlıdır. Cüzdan birkaç kopya tutar ve{" "}
            <strong>her doğrulayıcıya farklı bir kopya</strong> verir; böylece iki doğrulayıcı
            aldıklarını karşılaştırarak seni eşleştiremez.
          </li>
          <li>
            T.C. kimlik numaran yalnızca <strong>kimlik belgenin</strong> içinde bulunur ve ancak
            bir istek onu sorar ve sen onaylarsan paylaşılır.
          </li>
        </ul>
        <Callout title="Peki DID’ler?" tone="accent">
          Merkeziyetsiz tanımlayıcılar (DID), W3C belge dünyasında yaygındır. Tamga kurumlar için
          X.509 kullanır, çünkü AB’nin EUDI mimarisi de bunu kullanır ve sertifikaların zaten
          hukuki karşılığı vardır. Birlikte çalışabilirlik için bir <code>did:web</code> köprüsü
          planlıdır; belge vermek ya da doğrulamak için gerekli değildir.
        </Callout>

        <h2>İki biçim, tek veri modeli</h2>
        <ul>
          <li>
            <strong>SD-JWT VC</strong> (IETF) — ana biçim, çevrimiçi sunum için: web siteleri,
            işverenler, kurumlar. Her alan tuzlanmış bir özetin arkasında gizlidir ve ancak sen
            onaylarsan açılır.
          </li>
          <li>
            <strong>ISO 18013-5 mdoc</strong> — mobil ehliyet biçimi, yakın alan ve yaş kontrolü
            için. Bugün kimlik belgesi mdoc olarak da gelir: yaş kontrolü yalnızca{" "}
            <code>age_over_18</code> alır, başka hiçbir şey almaz.
          </li>
        </ul>
        <p>
          Belge tipi <code>urn:tamga:edu:DiplomaCredential:1</code> gibi sabit bir addır; tanımı
          herkese açık bir katalogda durur ve her belge bu tanımın özetini taşır.
        </p>
        <CodeBlock label="SD-JWT VC biçiminde bir diploma (çözülmüş, kısaltılmış)" code={SDJWT} />

        <h2>Belge nasıl yol alır</h2>
        <FlowStrip
          nodes={[
            { label: "Veren kurum", sub: "OpenID4VCI · 10 kopya" },
            { label: "Cüzdan", sub: "anahtarlar cihazda" },
            { label: "Doğrulayıcı", sub: "OpenID4VP · A–E denetimi" },
          ]}
        />
        <ul>
          <li>
            <strong>Verme (OpenID4VCI).</strong> Kurum bir QR kodu gösterir; PIN aynı ekranda
            görünür ama bağlantının içinde asla gönderilmez. Ya da cüzdan kurum dizininden başlar
            ve önce kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı on kopya
            alır.
          </li>
          <li>
            <strong>Sunum (OpenID4VP).</strong> Doğrulayıcının isteği kayıtlı sertifikasıyla
            imzalıdır; cüzdan onu güven listesine karşı denetler, neyin istendiğini gösterir ve
            yalnızca onaylanan alanlarla, anahtarın bu telefonda olduğunun kanıtıyla birlikte
            şifreli bir cevap gönderir.
          </li>
          <li>
            <strong>Denetimler.</strong> İmza ve cihaz kanıtı, belge tipi, kurumun veriliş tarihindeki
            yetkisi, iptal durumu ve verinin tazeliği — ardından üç cevaptan biri: kabul, red ya da
            belirsiz.
          </li>
        </ul>

        <Callout title="Önemli nokta" tone="primary">
          Doğrulayıcı belgeyi verene hiç ulaşmaz. İhtiyacı olan, kurumun sertifika durumu (imzalı
          güven listesinden) ve iptal listesidir (kurumun sabit aralıkla yayınladığı ve önbelleğe
          alınan liste). Kopyalanmış bir ekran görüntüsü geçmez: cihaz kanıtı taşımaz.
        </Callout>

        <p>
          Sıradaki: bir belgeyi sunarken{" "}
          <Link href="/docs/selective-disclosure">nasıl daha az veri paylaşılır</Link>.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Resminamalar: X.509, SD-JWT VC we mdoc",
      description:
        "Guramalar nähili kesgitlenýär (X.509), adamlar nähili yzarlanmaýar (enjam açary we her barlaýja aýry nusga) we Tamga-nyň ulanýan iki resminama görnüşi: SD-JWT VC we ISO 18013-5 mdoc.",
    },
    eyebrow: "Düşünjeler",
    title: "Resminamalar: X.509, SD-JWT VC we mdoc",
    intro:
      "Barlanyp bilinýän resminama — sanly möhüri bolan resminama: diplom, talyp resminamasy, şahsyýet resminamasy, bilet. Bu sahypa kimiň nähili kesgitlenýändigini, resminamanyň içinde näme bardygyny we onuň nähili ýol geçýändigini düşündirýär.",
    body: (
      <>
        <h2>Kim, nähili kesgitlenýär</h2>
        <ul>
          <li>
            <strong>Guramalar</strong> milli kök edara baglanan{" "}
            <strong>X.509 sertifikatlary</strong> bilen kesgitlenýär — EUDI Wallet bilen şol bir
            çemeleşme we düzgünleşdirijileriň okap bilýän gurluşy. Guramanyň belgisi
            sertifikatyndan alynýar we <Link href="/docs/trust-lists">ynam sanawynda</Link>{" "}
            hasaba alnandyr.
          </li>
          <li>
            <strong>Adamlaryň global belgisi ýok.</strong> Resminamanyň her nusgasy telefonyňdaky
            açara baglanandyr. Gapjyk birnäçe nusga saklaýar we{" "}
            <strong>her barlaýja başga nusga</strong> berýär; şeýlelikde iki barlaýjy alanlaryny
            deňeşdirip seni tanap bilmeýär.
          </li>
          <li>
            Şahsyýet belgiň diňe <strong>şahsyýet resminamaňyň</strong> içinde bar we diňe haýyş
            ony soranda we sen tassyklanyňda paýlaşylýar.
          </li>
        </ul>
        <Callout title="DID-ler barada näme?" tone="accent">
          Merkezleşdirilmedik belgiler (DID) W3C resminama dünýäsinde giňden ýaýrandyr. Tamga
          guramalar üçin X.509 ulanýar, sebäbi ÝB-niň EUDI arhitekturasy hem muny ulanýar we
          sertifikatlaryň eýýäm hukuky güýji bar. Bilelikde işlemek üçin <code>did:web</code>{" "}
          köprüsi meýilleşdirilýär; resminama bermek ýa-da barlamak üçin zerur däl.
        </Callout>

        <h2>Iki görnüş, bir maglumat modeli</h2>
        <ul>
          <li>
            <strong>SD-JWT VC</strong> (IETF) — esasy görnüş, onlaýn hödürleme üçin: web saýtlar,
            iş berijiler, guramalar. Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe sen
            tassyklanyňda açylýar.
          </li>
          <li>
            <strong>ISO 18013-5 mdoc</strong> — mobil sürüjilik şahadatnamasynyň görnüşi, ýakyn
            aralyk we ýaş barlagy üçin. Häzir şahsyýet resminamasy mdoc görnüşinde hem gelýär: ýaş
            barlagy diňe <code>age_over_18</code> alýar, başga hiç zat almaýar.
          </li>
        </ul>
        <p>
          Resminamanyň görnüşi <code>urn:tamga:edu:DiplomaCredential:1</code> ýaly hemişelik
          atdyr; onuň kesgitlemesi açyk katalogda durýar we her resminama bu kesgitlemäniň heşini
          göterýär.
        </p>
        <CodeBlock label="SD-JWT VC görnüşindäki diplom (açylan, gysgaldylan)" code={SDJWT} />

        <h2>Resminama nähili ýol geçýär</h2>
        <FlowStrip
          nodes={[
            { label: "Beriji", sub: "OpenID4VCI · 10 nusga" },
            { label: "Gapjyk", sub: "açarlar enjamda" },
            { label: "Barlaýjy", sub: "OpenID4VP · A–E barlag" },
          ]}
        />
        <ul>
          <li>
            <strong>Bermek (OpenID4VCI).</strong> Gurama QR kody görkezýär; PIN şol ekranda
            görünýär, ýöne baglanyşygyň içinde asla iberilmeýär. Ýa-da gapjyk guramalaryň
            katalogyndan başlaýar we ilki şahsyýetiňi subut edýär. Gapjyk her biri başga enjam
            açaryna baglanan on nusga alýar.
          </li>
          <li>
            <strong>Hödürlemek (OpenID4VP).</strong> Barlaýjynyň haýyşy hasaba alnan sertifikaty
            bilen gol çekilendir; gapjyk ony ynam sanawyna görä barlaýar, näme soralýandygyny
            görkezýär we diňe tassyklanan meýdanlar hem-de açaryň şu telefondadygynyň
            subutnamasy bilen şifrlenen jogap iberýär.
          </li>
          <li>
            <strong>Barlaglar.</strong> Gol we enjam subutnamasy, resminamanyň görnüşi, guramanyň
            berlen senesindäki ygtyýary, ýatyrylyş ýagdaýy we maglumatyň täzeligi — soňra üç
            jogabyň biri: kabul, ret ýa-da kesgitsiz.
          </li>
        </ul>

        <Callout title="Möhüm nokat" tone="primary">
          Barlaýjy berijä asla ýüz tutmaýar. Oňa guramanyň sertifikat ýagdaýy (gol çekilen ynam
          sanawyndan) we ýatyrylyş sanawy (gurama tarapyndan kesgitli aralykda çap edilýän we
          keşlenýän) gerek. Göçürilen ekran suraty geçmeýär: onda enjam subutnamasy ýok.
        </Callout>

        <p>
          Indiki: resminamany hödürlände{" "}
          <Link href="/docs/selective-disclosure">nädip az maglumat paýlaşmaly</Link>.
        </p>
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
    <DocArticle href="/docs/did-vc" eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
      {c.body}
    </DocArticle>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, KeyTable } from "@/components/doc-article";
import { EcosystemTable } from "@/components/ecosystem-table";
import { SplitPanel } from "@/components/doc-visuals";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

/*
 * Kaynak: ARCH (docs/delivery/01-ARCHITECTURE.md), SPEC-API-0001 §1 (A–E adım kayıt defteri, üç değerli sonuç, AP2),
 * D-NAME-1 (alan adları), ADR-0009 (Faz B), ADR-0011 (kimlik servisi), SPEC-CRED-0001 (WUA).
 */


const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Architecture: how Tamga runs",
      description:
        "The services behind Tamga today, what lives in the wallet and what lives in public lists, the five-layer verification pipeline and its three outcomes.",
    },
    eyebrow: "How Tamga works",
    title: "Architecture: how Tamga runs",
    intro:
      "The concepts from the previous pages come together here: a handful of small services, public signed lists, a wallet that holds the documents, and a verifier that decides in five steps.",
    body: (
      <>
        <h2>What lives where</h2>
        <p>
          The rule is simple: <strong>everything personal stays with the person; only
          non-personal trust data is public.</strong>
        </p>
        <SplitPanel
          left={{
            title: "In the wallet · on the phone",
            tone: "gold",
            items: ["Credentials: diploma, student card, identity, ticket", "Device keys — one per copy", "History of what was shared, with whom"],
          }}
          right={{
            title: "Public · signed lists",
            tone: "accent",
            items: ["Institutions, certificates, statuses", "What each institution may issue, and when", "Verifiers and the fields they may ask for", "Revocation lists and the anchor log"],
          }}
        />
        <Callout title="No personal data in lists, logs or ledger" tone="primary">
          Not even a hash of it. Revocation lists hold one random position per credential copy,
          not names; addresses never encode the institution. Service logs record what happened,
          never who it happened to.
        </Callout>

        <h2>The services</h2>
        <EcosystemTable locale="en" groups={["trust", "services"]} />
        <ul>
          <li>
            <strong>One issuing service, many institutions.</strong> Every institution is a tenant
            on its own path. Differences between institutions are configuration, never custom
            code. In the pilot the signing key moves to the university.
          </li>
          <li>
            <strong>Identity check is separate.</strong> Only the identity service talks to the
            identity-verification provider. It issues an identity credential and keeps no photos
            afterwards — only an opaque, hashed record (a subject reference and a document-number
            hash). Universities match your record through that credential,
            not through the provider.
          </li>
          <li>
            <strong>Genuine wallets only.</strong> The wallet provider signs a short-lived
            attestation for real wallet apps; issuers refuse to issue without it.
          </li>
        </ul>

        <h2>The five-layer check</h2>
        <p>
          Every verification runs the same pipeline, in the same order, and stops at the first
          failure. Each step has a permanent code, so a “rejected” always says <em>why</em>.
        </p>
        <KeyTable label="Verification pipeline" rows={[["T0", "request and answer belong together (nonce, audience, encryption)"], ["A · format", "signature, certificate chain, device proof, hidden fields intact"], ["B · type", "document type known, definition hash matches the catalogue"], ["C · trust", "issuer authorized for this type on the issue date (trust list)"], ["D · status", "not revoked or suspended; revocation list fresh and anchored"], ["E · policy", "every requested field present, nothing beyond the verifier's scope"], ["→ outcome", "ACCEPTED · REJECTED (with the failing step) · INDETERMINATE (could not check)"]]} />
        <Callout title="“Could not check” is not “fake”" tone="gold">
          If a list cannot be reached or is out of date, the answer is <strong>INDETERMINATE</strong>,
          shown separately from REJECTED. The difference between “this diploma is fake” and “I
          cannot check right now” decides whether someone is hired.
        </Callout>

        <h2>Lifecycles</h2>
        <ul>
          <li><strong>Revocation</strong> is published at a fixed interval, never ad hoc, so the timing of a revocation reveals nothing about a person.</li>
          <li><strong>Suspending an institution</strong> stops new issuance at once; documents issued earlier stay valid, because authorization is judged on the issue date.</li>
          <li><strong>Copies</strong> run out by design; the wallet asks before it fetches fresh copies — it never refreshes silently.</li>
          <li><strong>Nothing is erased</strong> from the lists: every change is a new, signed version with its history.</li>
        </ul>

        <h2>Principles</h2>
        <ul>
          <li><strong>Privacy and security by design</strong> — <Link href="/docs/selective-disclosure">selective disclosure</Link>, a separate copy per verifier, keys that never leave the device.</li>
          <li><strong>Open standards</strong> — SD-JWT VC, ISO 18013-5 mdoc, OpenID4VCI/VP, X.509, IETF Token Status List, ETSI trust lists.</li>
          <li><strong>Algorithm agility</strong> — algorithms are named in every signed object and can be replaced without changing the architecture.</li>
          <li>
            <strong>Ledger when it adds something</strong> — trust lists today; a permissioned
            Besu/QBFT ledger once at least two independent operators join (
            <Link href="/docs/blockchain">why</Link>).
          </li>
        </ul>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Mimari: Tamga nasıl çalışır",
      description:
        "Bugün Tamga’nın arkasındaki servisler, cüzdanda ne durur ve herkese açık listelerde ne durur, beş katmanlı doğrulama hattı ve üç sonucu.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "Mimari: Tamga nasıl çalışır",
    intro:
      "Önceki sayfalardaki kavramlar burada birleşir: birkaç küçük servis, herkese açık imzalı listeler, belgeleri tutan bir cüzdan ve beş adımda karar veren bir doğrulayıcı.",
    body: (
      <>
        <h2>Ne nerede durur</h2>
        <p>
          Kural basit: <strong>kişisel olan her şey kişide kalır; yalnızca kişisel olmayan güven
          verisi herkese açıktır.</strong>
        </p>
        <SplitPanel
          left={{
            title: "Cüzdanda · telefonda",
            tone: "gold",
            items: ["Belgeler: diploma, öğrenci belgesi, kimlik, bilet", "Cihaz anahtarları — her kopyaya bir tane", "Neyin kiminle paylaşıldığının geçmişi"],
          }}
          right={{
            title: "Herkese açık · imzalı listeler",
            tone: "accent",
            items: ["Kurumlar, sertifikalar, durumlar", "Her kurumun neyi, ne zaman verebileceği", "Doğrulayıcılar ve isteyebilecekleri alanlar", "İptal listeleri ve çapa günlüğü"],
          }}
        />
        <Callout title="Listede, günlükte ya da zincirde kişisel veri yok" tone="primary">
          Özeti bile yok. İptal listeleri isim değil, her belge kopyası için rastgele bir konum
          tutar; adresler kurumu açığa vurmaz. Servis günlükleri ne olduğunu yazar, kimin başına
          geldiğini asla yazmaz.
        </Callout>

        <h2>Servisler</h2>
        <EcosystemTable locale="tr" groups={["trust", "services"]} />
        <ul>
          <li>
            <strong>Tek belge verme servisi, çok kurum.</strong> Her kurum kendi yolunda bir
            kiracıdır. Kurumlar arasındaki farklar yapılandırmadır, asla kuruma özel kod değil.
            Pilotta imza anahtarı üniversiteye geçer.
          </li>
          <li>
            <strong>Kimlik doğrulama ayrıdır.</strong> Kimlik doğrulama sağlayıcısıyla yalnızca
            kimlik servisi konuşur. Bir kimlik belgesi verir ve sonrasında fotoğraf tutmaz —
            yalnızca opak, özetlenmiş bir kayıt (kişi referansı ve belge numarası özeti). Üniversiteler kaydını sağlayıcı üzerinden değil, bu belge üzerinden
            eşleştirir.
          </li>
          <li>
            <strong>Yalnızca gerçek cüzdanlar.</strong> Cüzdan sağlayıcısı gerçek cüzdan
            uygulamaları için kısa ömürlü bir onay imzalar; kurumlar bu olmadan belge vermez.
          </li>
        </ul>

        <h2>Beş katmanlı denetim</h2>
        <p>
          Her doğrulama aynı hattı, aynı sırayla çalıştırır ve ilk hatada durur. Her adımın
          kalıcı bir kodu vardır; bu yüzden bir “red” her zaman <em>nedenini</em> söyler.
        </p>
        <KeyTable label="Doğrulama hattı" rows={[["T0", "istek ve cevap birbirine ait (nonce, hedef, şifreleme)"], ["A · biçim", "imza, sertifika zinciri, cihaz kanıtı, gizli alanlar bozulmamış"], ["B · tür", "belge türü biliniyor, tanımın özeti katalogla aynı"], ["C · güven", "kurum bu tür için veriliş tarihinde yetkili (güven listesi)"], ["D · durum", "iptal edilmemiş ya da askıda değil; iptal listesi güncel ve çapalı"], ["E · politika", "istenen her alan var, doğrulayıcının kapsamı dışında bir şey yok"], ["→ sonuç", "ACCEPTED (kabul) · REJECTED (red, hangi adımda) · INDETERMINATE (denetlenemedi)"]]} />
        <Callout title="“Denetlenemedi”, “sahte” demek değildir" tone="gold">
          Bir listeye ulaşılamazsa ya da liste güncel değilse cevap <strong>INDETERMINATE</strong>{" "}
          (belirsiz) olur ve REJECTED’dan ayrı gösterilir. “Bu diploma sahte” ile “şu an kontrol
          edemiyorum” arasındaki fark, birinin işe alınıp alınmamasıdır.
        </Callout>

        <h2>Yaşam döngüleri</h2>
        <ul>
          <li><strong>İptal</strong> sabit aralıkla yayınlanır, asla anlık değil; böylece iptalin zamanı kişi hakkında hiçbir şey ele vermez.</li>
          <li><strong>Kurumun askıya alınması</strong> yeni belge vermeyi hemen durdurur; daha önce verilen belgeler geçerli kalır, çünkü yetki veriliş tarihine göre değerlendirilir.</li>
          <li><strong>Kopyalar</strong> tasarım gereği tükenir; cüzdan yeni kopya almadan önce sorar — asla sessizce yenilemez.</li>
          <li>Listelerden <strong>hiçbir şey silinmez</strong>: her değişiklik geçmişiyle birlikte yeni, imzalı bir sürümdür.</li>
        </ul>

        <h2>İlkeler</h2>
        <ul>
          <li><strong>Tasarımdan gelen mahremiyet ve güvenlik</strong> — <Link href="/docs/selective-disclosure">seçici açıklama</Link>, her doğrulayıcıya ayrı kopya, cihazdan hiç çıkmayan anahtarlar.</li>
          <li><strong>Açık standartlar</strong> — SD-JWT VC, ISO 18013-5 mdoc, OpenID4VCI/VP, X.509, IETF Token Status List, ETSI güven listeleri.</li>
          <li><strong>Algoritma çevikliği</strong> — algoritma her imzalı nesnede adıyla yazılıdır ve mimari değişmeden değiştirilebilir.</li>
          <li>
            <strong>Zincir, bir şey kattığında</strong> — bugün güven listeleri; en az iki bağımsız
            operatör katılınca izinli Besu/QBFT defteri (<Link href="/docs/blockchain">neden</Link>).
          </li>
        </ul>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Arhitektura: Tamga nähili işleýär",
      description:
        "Häzirki wagtda Tamga-nyň aňyrsyndaky hyzmatlar, gapjykda näme we açyk sanawlarda näme durýar, bäş gatlakly barlag hatary we onuň üç netijesi.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "Arhitektura: Tamga nähili işleýär",
    intro:
      "Öňki sahypalardaky düşünjeler şu ýerde birleşýär: birnäçe kiçi hyzmat, açyk gol çekilen sanawlar, resminamalary saklaýan gapjyk we bäş ädimde karar berýän barlaýjy.",
    body: (
      <>
        <h2>Näme nirede durýar</h2>
        <p>
          Düzgün ýönekeý: <strong>şahsy zatlaryň ählisi adamda galýar; diňe şahsy bolmadyk ynam
          maglumaty açykdyr.</strong>
        </p>
        <SplitPanel
          left={{
            title: "Gapjykda · telefonda",
            tone: "gold",
            items: ["Resminamalar: diplom, talyp resminamasy, şahsyýet, bilet", "Enjam açarlary — her nusga üçin bir", "Nämäniň kim bilen paýlaşylandygynyň taryhy"],
          }}
          right={{
            title: "Açyk · gol çekilen sanawlar",
            tone: "accent",
            items: ["Guramalar, sertifikatlar, ýagdaýlar", "Her guramanyň näme we haçan berip biljekdigi", "Barlaýjylar we olaryň sorap biljek meýdanlary", "Ýatyrylyş sanawlary we labyr žurnaly"],
          }}
        />
        <Callout title="Sanawda, žurnalda ýa-da zynjyrda şahsy maglumat ýok" tone="primary">
          Hatda onuň heşi hem ýok. Ýatyrylyş sanawlary at däl, her resminama nusgasy üçin tötänleýin
          orun saklaýar; salgylar guramany aýan etmeýär. Hyzmat žurnallary näme bolandygyny ýazýar,
          kimiň başyna gelendigini asla ýazmaýar.
        </Callout>

        <h2>Hyzmatlar</h2>
        <EcosystemTable locale="tk" groups={["trust", "services"]} />
        <ul>
          <li>
            <strong>Bir resminama beriş hyzmaty, köp gurama.</strong> Her gurama öz ýolunda
            kärendeçidir. Guramalaryň arasyndaky tapawutlar sazlamadyr, asla gurama üçin aýratyn
            kod däl. Pilotda gol açary uniwersitete geçýär.
          </li>
          <li>
            <strong>Şahsyýet barlagy aýratyn.</strong> Şahsyýet barlag üpjün edijisi bilen diňe
            şahsyýet hyzmaty gürleşýär. Ol şahsyýet resminamasyny berýär we soňra surat saklamaýar —
            diňe açyk däl, heşlenen ýazgy (şahs salgysy we resminama belgisiniň heşi). Uniwersitetler ýazgyňy üpjün ediji arkaly däl, şu resminama
            arkaly deňeşdirýär.
          </li>
          <li>
            <strong>Diňe hakyky gapjyklar.</strong> Gapjyk üpjün edijisi hakyky gapjyk
            programmalary üçin gysga möhletli tassyklama gol çekýär; guramalar munsuz resminama
            bermeýär.
          </li>
        </ul>

        <h2>Bäş gatlakly barlag</h2>
        <p>
          Her barlag şol bir hatary, şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her
          ädimiň hemişelik kody bar; şonuň üçin “ret” hemişe <em>sebäbini</em> aýdýar.
        </p>
        <KeyTable label="Barlag hatary" rows={[["T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"], ["A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"], ["B · görnüş", "resminama görnüşi belli, kesgitlemäniň heşi katalog bilen gabat gelýär"], ["C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly (ynam sanawy)"], ["D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; ýatyrylyş sanawy täze we labyrlanan"], ["E · syýasat", "soralan her meýdan bar, barlaýjynyň çäginden daşary hiç zat ýok"], ["→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"]]} />
        <Callout title="“Barlap bolmady” — “ýasama” diýmek däl" tone="gold">
          Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa jogap <strong>INDETERMINATE</strong>{" "}
          (kesgitsiz) bolýar we REJECTED-den aýratyn görkezilýär. “Bu diplom ýasama” bilen “häzir
          barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny ýa-da alynmazlygyny
          kesgitleýär.
        </Callout>

        <h2>Durmuş aýlawlary</h2>
        <ul>
          <li><strong>Ýatyrylyş</strong> kesgitli aralykda çap edilýär, asla derrew däl; şeýlelikde ýatyrylyşyň wagty adam barada hiç zady aýan etmeýär.</li>
          <li><strong>Guramanyň togtadylmagy</strong> täze resminama bermegi derrew togtadýar; öň berlen resminamalar güýjünde galýar, sebäbi ygtyýar berlen senesine görä bahalandyrylýar.</li>
          <li><strong>Nusgalar</strong> dizaýn boýunça gutarýar; gapjyk täze nusga almazdan öň soraýar — asla ýuwaşlyk bilen täzelemeýär.</li>
          <li>Sanawlardan <strong>hiç zat pozulmaýar</strong>: her üýtgeşme taryhy bilen täze, gol çekilen wersiýadyr.</li>
        </ul>

        <h2>Ýörelgeler</h2>
        <ul>
          <li><strong>Dizaýndan gelýän gizlinlik we howpsuzlyk</strong> — <Link href="/docs/selective-disclosure">saýlama açyklama</Link>, her barlaýja aýry nusga, enjamdan asla çykmaýan açarlar.</li>
          <li><strong>Açyk standartlar</strong> — SD-JWT VC, ISO 18013-5 mdoc, OpenID4VCI/VP, X.509, IETF Token Status List, ETSI ynam sanawlary.</li>
          <li><strong>Algoritm çeýeligi</strong> — algoritm her gol çekilen obýektde ady bilen ýazylýar we arhitektura üýtgemezden çalşyrylyp bilner.</li>
          <li>
            <strong>Zynjyr, bir zat goşanda</strong> — häzir ynam sanawlary; azyndan iki garaşsyz
            operator goşulanda rugsatly Besu/QBFT kitaby (<Link href="/docs/blockchain">näme üçin</Link>).
          </li>
        </ul>
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
  return pageMeta(locale, "/docs/how-tamga-works", { title: c.meta.title, description: c.meta.description });
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
    <DocArticle href="/docs/how-tamga-works" eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
      {c.body}
    </DocArticle>
  );
}

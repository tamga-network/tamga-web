import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout } from "@/components/doc-article";
import { ChainBlocks } from "@/components/doc-visuals";
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
      title: "What blockchain is (and isn’t)",
      description:
        "Blockchain from scratch: block, chain, hash, distributed ledger, consensus. Why in Tamga it is a component, not the center — and why Tamga starts with signed trust lists.",
    },
    eyebrow: "Concepts",
    title: "What blockchain is (and is not)",
    intro:
      "A blockchain is a shared ledger in which agreed-upon records are kept immutably. For Tamga, what matters is not only what it is but what it is NOT.",
    body: (
      <>
        <h2>The simplest definition: a shared, immutable ledger</h2>
        <p>
          Imagine an accounting ledger. Normally this ledger sits with one person
          who can alter the pages. On a blockchain, however,{" "}
          <strong>the same copy of the ledger lives on many computers</strong>{" "}
          (nodes), and once a record is written it{" "}
          <strong>cannot be changed retroactively.</strong>
        </p>

        <h3>Block and chain</h3>
        <p>
          Records are added not one by one but in groups (“blocks”). Each block
          contains the fingerprint (see{" "}
          <Link href="/docs/cryptography">hash</Link>) of the previous block. This
          chains the blocks together: if you try to alter a block, the
          fingerprints of every block after it break, and the tampering is exposed
          instantly.
        </p>

        <ChainBlocks blockLabel="Block" />

        <h3>Consensus</h3>
        <p>
          So how do all these computers agree on what the next block will be? This
          is called a <strong>consensus mechanism</strong>. Bitcoin’s
          energy-intensive “Proof of Work” is the best known; but permissioned
          networks use far more efficient methods — for example the{" "}
          <strong>BFT</strong> (Byzantine Fault Tolerance) family, where specific,
          trusted nodes vote.
        </p>

        <Callout title="What is a permissioned network?" tone="accent">
          Unlike open networks anyone can join (Bitcoin, Ethereum), in a
          permissioned network it is clear who the validators are. The ledger Tamga
          plans is such a network: validators are not random people but trusted
          institutions and, in time, states.
        </Callout>

        <h2>Why is blockchain a “component, not the center” in Tamga?</h2>
        <p>
          This is crucial. Tamga Network{" "}
          <strong>is not a new blockchain network.</strong> Blockchain is only one
          part of Tamga and does a very limited job:
        </p>
        <ul>
          <li>
            <strong>Written to the chain:</strong> only the non-personal data
            needed for trust — which institution is authorized to issue documents,
            institutions’ public keys, accreditation and revocation status.
          </li>
          <li>
            <strong>NEVER written to the chain:</strong> your documents, your
            personal data, your diploma. These stay on your device (in your
            wallet).
          </li>
        </ul>

        <Callout title="Why is personal data not written to the chain?" tone="primary">
          Because a blockchain is immutable — but GDPR/KVKK grant you a “right to
          be forgotten.” Writing personal data to an immutable place conflicts with
          that right. Even an encrypted hash of the data is risky because it can be
          correlated. So the principle is clear:{" "}
          <strong>personal data never sits on the chain.</strong>
        </Callout>

        <p>
          So as a user you never see the blockchain. Wallet, network fees, “gas,”
          tokens — you deal with none of it. You only use your digital identity;
          the blockchain works quietly in the background, only to make trust
          permanent.
        </p>

        <h2>Where Tamga stands today: signed trust lists first</h2>
        <p>
          A ledger only adds something when several <em>independent</em> parties run it.
          Run by one operator, it is just a slower database. So Tamga starts the way the EU
          itself does: with <Link href="/docs/trust-lists">signed trust lists</Link> — versioned,
          hash-chained files that say which institutions may issue which documents, with their
          certificates and status. Every change is also written to a public anchor log.
        </p>
        <ul>
          <li><strong>Today (beta, pilot):</strong> signed trust lists + anchor log. No ledger.</li>
          <li>
            <strong>Ledger (Besu, QBFT):</strong> only once at least two independent validator
            operators agree in writing. The list history is then replayed into the contracts and
            both are tested to give the same answers.
          </li>
          <li>
            <strong>What does not change:</strong> institution and document-type identifiers are
            computed the same way in both, so no credential has to be reissued.
          </li>
        </ul>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Blockchain nedir (ve değildir)",
      description:
        "Blockchain kavramı sıfırdan: blok, zincir, hash, dağıtık defter, consensus. Ve Tamga’da blockchain’in neden merkez değil, yalnızca bir bileşen olduğu.",
    },
    eyebrow: "Kavramlar",
    title: "Blockchain nedir (ve ne değildir)?",
    intro:
      "Blockchain, üzerinde uzlaşılmış kayıtların değiştirilemez biçimde tutulduğu ortak bir defterdir. Tamga için önemli olan, onun ne olduğu kadar ne OLMADIĞIdır.",
    body: (
      <>
        <h2>En basit tanım: ortak, değiştirilemez defter</h2>
        <p>
          Bir muhasebe defteri düşün. Normalde bu defter tek bir kişide durur ve o
          kişi sayfaları değiştirebilir. Blockchain’de ise defterin{" "}
          <strong>aynı kopyası birçok bilgisayarda</strong> (node) bulunur ve bir
          kayıt yazıldıktan sonra <strong>geriye dönük değiştirilemez.</strong>
        </p>

        <h3>Blok ve zincir</h3>
        <p>
          Kayıtlar tek tek değil, gruplar hâlinde (“blok”) eklenir. Her blok, bir
          önceki bloğun parmak izini (bkz.{" "}
          <Link href="/docs/cryptography">hash</Link>) içerir. Böylece bloklar
          birbirine zincirlenir: bir bloğu değiştirmeye kalkarsan, ondan sonraki
          tüm blokların parmak izi bozulur ve sahtekârlık anında ortaya çıkar.
        </p>

        <ChainBlocks blockLabel="Blok" />

        <h3>Consensus (uzlaşı)</h3>
        <p>
          Peki bu kadar bilgisayar bir sonraki bloğun ne olacağında nasıl anlaşır?
          Buna <strong>consensus (uzlaşı) mekanizması</strong> denir. Bitcoin’in
          kullandığı enerji-yoğun “Proof of Work” en bilinenidir; ama izinli
          (permissioned) ağlarda çok daha verimli yöntemler kullanılır — örneğin
          belirli, güvenilir node’ların oy verdiği <strong>BFT</strong>{" "}
          (Byzantine Fault Tolerance) aileleri.
        </p>

        <Callout title="İzinli (permissioned) ağ nedir?" tone="accent">
          Herkesin katılabildiği açık ağların (Bitcoin, Ethereum) aksine, izinli
          bir ağda kimlerin doğrulayıcı (validator) olacağı bellidir. Tamga’nın
          planladığı defter böyle bir ağdır: doğrulayıcılar rastgele kişiler değil,
          güvenilir kurumlar ve zamanla devletlerdir.
        </Callout>

        <h2>Tamga’da blockchain neden “merkez değil, bileşen”?</h2>
        <p>
          Burası kritik. Tamga Network{" "}
          <strong>yeni bir blockchain ağı değildir.</strong> Blockchain, Tamga’nın
          yalnızca bir parçasıdır ve çok sınırlı bir iş yapar:
        </p>
        <ul>
          <li>
            <strong>Zincire yazılan:</strong> yalnızca güven için gereken, kişisel
            OLMAYAN veriler — hangi kurumun belge vermeye yetkili olduğu, kurumların
            açık anahtarları, akreditasyon ve iptal durumları.
          </li>
          <li>
            <strong>Zincire ASLA yazılmayan:</strong> senin belgelerin, kişisel
            verilerin, diploman. Bunlar senin cihazında (cüzdanında) durur.
          </li>
        </ul>

        <Callout title="Neden kişisel veri zincire yazılmaz?" tone="primary">
          Çünkü blockchain değiştirilemez — ama GDPR/KVKK sana “unutulma hakkı”
          verir. Değiştirilemeyen bir yere kişisel veri yazmak bu hakla çelişir.
          Hatta verinin şifreli özeti (hash) bile ilişkilendirilebilir olduğu için
          risklidir. Bu yüzden ilke nettir:{" "}
          <strong>kişisel veri asla zincirde durmaz.</strong>
        </Callout>

        <p>
          Yani kullanıcı olarak sen blockchain’i hiç görmezsin. Cüzdan, ağ ücreti,
          “gas”, token — bunların hiçbiriyle uğraşmazsın. Yalnızca dijital kimliğini
          kullanırsın; blockchain arka planda, sessizce, yalnızca güveni kalıcı
          kılmak için çalışır.
        </p>

        <h2>Tamga bugün nerede: önce imzalı güven listeleri</h2>
        <p>
          Bir defter ancak birden çok <em>bağımsız</em> taraf onu işletirse bir şey katar. Tek
          operatörün işlettiği zincir yalnızca daha yavaş bir veritabanıdır. Bu yüzden Tamga,
          AB’nin kendisinin yaptığı gibi başlar:{" "}
          <Link href="/docs/trust-lists">imzalı güven listeleri</Link> — hangi kurumun hangi
          belgeyi verebileceğini, sertifikalarını ve durumunu söyleyen, sürümlü ve hash-zincirli
          dosyalar. Her değişiklik ayrıca herkese açık bir çapa günlüğüne yazılır.
        </p>
        <ul>
          <li><strong>Bugün (beta, pilot):</strong> imzalı güven listeleri + çapa günlüğü. Zincir yok.</li>
          <li>
            <strong>Zincir (Besu, QBFT):</strong> ancak en az iki bağımsız validator operatörü
            yazılı olarak kabul edince. Liste geçmişi o zaman kontratlara yeniden oynatılır ve
            ikisinin aynı cevabı verdiği test edilir.
          </li>
          <li>
            <strong>Değişmeyen:</strong> kurum ve belge tipi kimlikleri ikisinde de aynı formülle
            hesaplanır; hiçbir belgenin yeniden verilmesi gerekmez.
          </li>
        </ul>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Blokçeýn näme (we däl)",
      description:
        "Blokçeýn başdan: blok, zynjyr, hash, paýlanan depder, consensus. We Tamga-da blokçeýniň näme üçin merkez däl-de, diňe bir bölekdigi.",
    },
    eyebrow: "Düşünjeler",
    title: "Blokçeýn näme (we näme däl)?",
    intro:
      "Blokçeýn, ylalaşylan ýazgylaryň üýtgedip bolmajak görnüşde saklanýan umumy depderidir. Tamga üçin möhüm zat, onuň nämedigi ýaly nämä DÄLdigidir.",
    body: (
      <>
        <h2>Iň ýönekeý kesgitleme: umumy, üýtgedip bolmajak depder</h2>
        <p>
          Bir buhgalter depderini göz öňüne getir. Adatça bu depder ýeke adamda
          durýar we ol sahypalary üýtgedip bilýär. Blokçeýnde bolsa depderiň{" "}
          <strong>şol bir nusgasy köp kompýuterde</strong> (node) bolýar we bir
          ýazgy ýazylandan soň <strong>yza gaýdyp üýtgedip bolmaýar.</strong>
        </p>

        <h3>Blok we zynjyr</h3>
        <p>
          Ýazgylar birin-birin däl, toparlaýyn (“blok”) goşulýar. Her blok, öňki
          blogyň barmak yzyny (seret{" "}
          <Link href="/docs/cryptography">hash</Link>) saklaýar. Şeýlelikde bloklar
          biri-birine zynjyrlanýar: bir blogy üýtgetjek bolsaň, ondan soňky ähli
          bloklaryň barmak yzy bozulýar we galplyk şobada ýüze çykýar.
        </p>

        <ChainBlocks blockLabel="Blok" />

        <h3>Consensus (ylalaşyk)</h3>
        <p>
          Onda bu kadar kompýuter indiki blogyň nähili boljakdygynda nähili
          ylalaşýar? Muňa <strong>consensus (ylalaşyk) mehanizmi</strong> diýilýär.
          Bitcoin-iň ulanýan energiýa-agyr “Proof of Work” iň meşhurydyr; emma
          rugsatly (permissioned) torlarda has netijeli usullar ulanylýar —
          mysal üçin belli, ynamly node-laryň ses berýän <strong>BFT</strong>{" "}
          (Byzantine Fault Tolerance) maşgalalary.
        </p>

        <Callout title="Rugsatly (permissioned) tor näme?" tone="accent">
          Hemmeleriň goşulyp bilýän açyk torlaryndan (Bitcoin, Ethereum)
          tapawutlylykda, rugsatly torda kimleriň barlaýjy (validator)
          boljakdygy bellidir. Tamga-nyň meýilleşdirýän kitaby şeýle tordyr:
          barlaýjylar tötänleýin adamlar däl, ynamly guramalar we wagtyň geçmegi
          bilen döwletlerdir.
        </Callout>

        <h2>Tamga-da blokçeýn näme üçin “merkez däl, bölek”?</h2>
        <p>
          Bu ýer möhüm. Tamga Network{" "}
          <strong>täze blokçeýn tory däldir.</strong> Blokçeýn, Tamga-nyň diňe bir
          bölegidir we örän çäkli iş edýär:
        </p>
        <ul>
          <li>
            <strong>Zynjyra ýazylýan:</strong> diňe ynam üçin gerekli, şahsy DÄL
            maglumatlar — haýsy guramanyň resminama bermäge ygtyýarlydygy,
            guramalaryň açyk açarlary, akkreditasiýa we ýatyrylyş ýagdaýlary.
          </li>
          <li>
            <strong>Zynjyra ASLA ýazylmaýan:</strong> seniň resminamalaryň, şahsy
            maglumatlaryň, diplomyň. Bular seniň enjamyňda (gapjygyňda) durýar.
          </li>
        </ul>

        <Callout title="Näme üçin şahsy maglumat zynjyra ýazylmaýar?" tone="primary">
          Sebäbi blokçeýn üýtgedip bolmaýar — emma GDPR/KVKK saňa “unudylmak
          hukugyny” berýär. Üýtgedip bolmaýan ýere şahsy maglumat ýazmak bu hukuga
          garşy gelýär. Hatda maglumatyň şifrlenen jemi (hash) hem
          baglanyşdyrylyp bilinýändigi üçin howplydyr. Şonuň üçin ýörelge aýdyň:{" "}
          <strong>şahsy maglumat asla zynjyrda durmaýar.</strong>
        </Callout>

        <p>
          Ýagny ulanyjy hökmünde sen blokçeýni asla görmeýärsiň. Gapjyk, tor
          tölegi, “gas”, token — bularyň hiçbiri bilen meşgullanmaýarsyň. Diňe
          sanly şahsyýetiňi ulanýarsyň; blokçeýn arka planda, ýuwaşja, diňe ynamy
          hemişelik etmek üçin işleýär.
        </p>

        <h2>Tamga häzir nirede: ilki gol çekilen ynam sanawlary</h2>
        <p>
          Kitap diňe birnäçe <em>garaşsyz</em> tarap ony dolandyranda bir zat goşýar. Ýeke
          operatoryň dolandyrýan zynjyry diňe haýal maglumatlar bazasydyr. Şonuň üçin Tamga
          ÝB-niň özi ýaly başlaýar:{" "}
          <Link href="/docs/trust-lists">gol çekilen ynam sanawlary</Link> — haýsy guramanyň haýsy
          resminamany berip biljekdigini, sertifikatlaryny we ýagdaýyny görkezýän, wersiýaly we
          heş-zynjyrly faýllar. Her üýtgeşme mundan başga-da açyk labyr žurnalyna ýazylýar.
        </p>
        <ul>
          <li><strong>Häzir (beta, pilot):</strong> gol çekilen ynam sanawlary + labyr žurnaly. Zynjyr ýok.</li>
          <li>
            <strong>Zynjyr (Besu, QBFT):</strong> diňe azyndan iki garaşsyz validator operatory
            ýazmaça razylyk berende. Şonda sanawyň taryhy kontraktlara gaýtadan oýnalýar we
            ikisiniň şol bir jogaby berýändigi synagdan geçirilýär.
          </li>
          <li>
            <strong>Üýtgemeýän:</strong> gurama we resminama görnüşiniň belgileri ikisinde-de şol
            bir formula bilen hasaplanýar; hiç bir resminamany täzeden bermek gerek däl.
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
  return pageMeta(locale, "/docs/blockchain", { title: c.meta.title, description: c.meta.description });
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
      href="/docs/blockchain"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

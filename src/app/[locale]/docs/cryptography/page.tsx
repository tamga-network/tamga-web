import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CodeBlock } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

const HASH_EN = `hash("Hello")  →  185f8db32271fe25...
hash("hello")  →  2cf24dba5fb0a30e...   (one letter → totally different)`;
const HASH_TR = `hash("Merhaba")  →  8b1a9953c4611296...
hash("merhaba")  →  9c1185a5c5e9fc54...   (tek harf → bambaşka sonuç)`;
const HASH_TK = `hash("Salam")  →  185f8db32271fe25...
hash("salam")  →  2cf24dba5fb0a30e...   (bir harp → düýbünden başga netije)`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Cryptography basics",
      description:
        "Hash, public/private key pairs, digital signature and PKI. The math behind verifiable credentials, from scratch and intuitively.",
    },
    eyebrow: "Concepts",
    title: "Cryptography basics",
    intro:
      "The magic of verifiable credentials rests on three simple cryptographic ideas: hash, key pair and digital signature. Let’s explain them with no formulas.",
    body: (
      <>
        <h2>1. Hash — a digital fingerprint</h2>
        <p>
          A <strong>hash function</strong> takes any data (a word, a file, a book)
          and produces a fixed-length “fingerprint” from it. The same data always
          gives the same fingerprint; but if you change even{" "}
          <strong>a single letter</strong> of the data, the fingerprint changes
          completely.
        </p>
        <CodeBlock code={HASH_EN} />
        <p>
          A hash is also <strong>one-way</strong>: you cannot go back from the
          fingerprint to the original data. That’s why a hash is perfect for
          answering “has this document changed?”
        </p>

        <h2>2. Public and private key pair</h2>
        <p>
          In cryptography every identity has <strong>two keys</strong> that are
          mathematically bound to each other:
        </p>
        <ul>
          <li>
            <strong>Private key</strong> — stays only with you, shared with no
            one. Think of it as a seal stamp.
          </li>
          <li>
            <strong>Public key</strong> — is open to everyone. It serves to
            recognize the pattern the stamp leaves.
          </li>
        </ul>
        <p>
          The magic: something “sealed” with the private key can be verified only
          with the corresponding public key. And finding the private key from the
          public key is practically impossible.
        </p>

        <h2>3. Digital signature</h2>
        <p>
          This is exactly where the tamga (seal) becomes digital. When an
          institution issues a document, it:
        </p>
        <ul>
          <li>Takes the <strong>hash</strong> of the document (fingerprint).</li>
          <li>Seals this fingerprint with its own <strong>private key</strong> → digital signature.</li>
          <li>Attaches the signature to the document.</li>
        </ul>
        <p>The party verifying the document then:</p>
        <ul>
          <li>Recomputes the document’s hash.</li>
          <li>Checks the signature with the institution’s <strong>public key</strong>.</li>
          <li>
            If the two fingerprints match: the document really came from that
            institution and <strong>has not been altered at all.</strong>
          </li>
        </ul>

        <Callout title="The digital counterpart of the ancient seal" tone="gold">
          In ancient times you knew a document was genuine from the seal (tamga) on
          it. A digital signature is exactly that — but a seal whose forgery is
          mathematically impossible.
        </Callout>

        <h2>PKI — where does trust come from?</h2>
        <p>
          But how do you know a public key really belongs to “Example
          University”? The system that solves this is called{" "}
          <strong>PKI (Public Key Infrastructure)</strong>. PKI is a chain of trust
          that records which key belongs to which institution and what that
          institution is authorized to do.
        </p>
        <p>
          In Tamga the signed <Link href="/docs/trust-lists">trust lists</Link> do exactly this job today (a
          permissioned ledger may take it over later): they keep institutions’ public keys and
          authorities as a public, tamper-evident{" "}
          <strong>trust registry</strong>. Not the document itself — only the
          information “is this institution trusted, is its key still valid.”
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Kriptografi temelleri",
      description:
        "Hash, açık/özel anahtar çiftleri, dijital imza ve PKI. Doğrulanabilir belgelerin altında yatan matematik, sıfırdan ve sezgisel.",
    },
    eyebrow: "Kavramlar",
    title: "Kriptografi temelleri",
    intro:
      "Doğrulanabilir belgelerin sihri, üç basit kriptografi fikrine dayanır: hash, anahtar çifti ve dijital imza. Hiç formül olmadan anlatalım.",
    body: (
      <>
        <h2>1. Hash — dijital parmak izi</h2>
        <p>
          <strong>Hash fonksiyonu</strong>, herhangi bir veriyi (bir kelime, bir
          dosya, bir kitap) alıp ondan sabit uzunlukta bir “parmak izi” üretir.
          Aynı veri her zaman aynı parmak izini verir; ama verinin{" "}
          <strong>tek bir harfini</strong> bile değiştirirsen parmak izi tamamen
          değişir.
        </p>
        <CodeBlock code={HASH_TR} />
        <p>
          Ayrıca hash <strong>tek yönlüdür</strong>: parmak izinden orijinal
          veriye geri dönemezsin. Bu yüzden hash, “bu belge değişmedi mi?”
          sorusunu yanıtlamak için mükemmeldir.
        </p>

        <h2>2. Açık ve özel anahtar çifti</h2>
        <p>
          Kriptografide her kimliğin birbirine matematiksel olarak bağlı{" "}
          <strong>iki anahtarı</strong> vardır:
        </p>
        <ul>
          <li>
            <strong>Özel anahtar (private key)</strong> — yalnızca sende durur,
            kimseyle paylaşılmaz. Bir mühür kaşesi gibi düşün.
          </li>
          <li>
            <strong>Açık anahtar (public key)</strong> — herkese açıktır. Kaşenin
            bıraktığı deseni tanımaya yarar.
          </li>
        </ul>
        <p>
          Sihir şu: özel anahtarla “mühürlenmiş” bir şey, yalnızca ona karşılık
          gelen açık anahtarla doğrulanabilir. Ve açık anahtardan özel anahtarı
          bulmak pratikte imkânsızdır.
        </p>

        <h2>3. Dijital imza</h2>
        <p>
          İşte tamga (mühür) tam olarak burada dijitalleşir. Bir kurum bir belge
          düzenlerken:
        </p>
        <ul>
          <li>Belgenin <strong>hash’ini</strong> alır (parmak izi).</li>
          <li>Bu parmak izini kendi <strong>özel anahtarıyla</strong> mühürler → dijital imza.</li>
          <li>İmzayı belgeye ekler.</li>
        </ul>
        <p>Belgeyi doğrulayan taraf ise:</p>
        <ul>
          <li>Belgenin hash’ini yeniden hesaplar.</li>
          <li>Kurumun <strong>açık anahtarıyla</strong> imzayı kontrol eder.</li>
          <li>
            İki parmak izi uyuşuyorsa: belge gerçekten o kurumdan gelmiştir ve{" "}
            <strong>hiç değiştirilmemiştir.</strong>
          </li>
        </ul>

        <Callout title="Kadim mührün dijital karşılığı" tone="gold">
          Eski çağda bir belgenin gerçek olduğunu, üzerindeki mühürden (tamga)
          anlardın. Dijital imza tam olarak budur — ama taklidi matematiksel olarak
          imkânsız bir mühür.
        </Callout>

        <h2>PKI — güven kimden geliyor?</h2>
        <p>
          Peki bir açık anahtarın gerçekten “Örnek Üniversite”ye ait olduğunu
          nereden bilirsin? Bunu çözen sisteme{" "}
          <strong>PKI (Public Key Infrastructure — Açık Anahtar Altyapısı)</strong>{" "}
          denir. PKI, hangi anahtarın hangi kuruma ait olduğunu ve o kurumun neye
          yetkili olduğunu kaydeden bir güven zinciridir.
        </p>
        <p>
          Tamga’da bugün bu işi imzalı <Link href="/docs/trust-lists">güven listeleri</Link> görür (ileride
          izinli bir defter devralabilir): kurumların açık anahtarlarını ve yetkilerini herkese
          açık, değişiklikleri fark edilen bir{" "}
          <strong>güven registry’si</strong> olarak tutar. Belgenin kendisini
          değil — yalnızca “bu kurum güvenilir mi, anahtarı hâlâ geçerli mi”
          bilgisini.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Kriptografiýa esaslary",
      description:
        "Hash, açyk/gizlin açar jübütleri, sanly gol we PKI. Barlanyp bilinýän resminamalaryň astyndaky matematika, başdan we düşnükli.",
    },
    eyebrow: "Düşünjeler",
    title: "Kriptografiýa esaslary",
    intro:
      "Barlanyp bilinýän resminamalaryň jadysy üç ýönekeý kriptografik pikire daýanýar: hash, açar jübüti we sanly gol. Hiç formulasyz düşündireliň.",
    body: (
      <>
        <h2>1. Hash — sanly barmak yzy</h2>
        <p>
          <strong>Hash funksiýasy</strong>, islendik maglumaty (bir söz, bir faýl,
          bir kitap) alyp ondan durnukly uzynlykdaky “barmak yzyny” öndürýär. Şol
          bir maglumat hemişe şol bir barmak yzyny berýär; emma maglumatyň{" "}
          <strong>ýeke harpyny</strong> hem üýtgetseň barmak yzy düýbünden üýtgeýär.
        </p>
        <CodeBlock code={HASH_TK} />
        <p>
          Şeýle-de hash <strong>bir taraplaýyn</strong>: barmak yzyndan asyl
          maglumata gaýdyp bolmaýar. Şonuň üçin hash, “bu resminama üýtgänokmy?”
          diýen sowala jogap bermek üçin ajaýyp.
        </p>

        <h2>2. Açyk we gizlin açar jübüti</h2>
        <p>
          Kriptografiýada her şahsyýetiň biri-birine matematik taýdan baglanan{" "}
          <strong>iki açary</strong> bar:
        </p>
        <ul>
          <li>
            <strong>Gizlin açar (private key)</strong> — diňe seniň eliňde durýar,
            hiç kim bilen paýlaşylmaýar. Möhür möhürlemesi ýaly göz öňüne getir.
          </li>
          <li>
            <strong>Açyk açar (public key)</strong> — hemmelere açyk. Möhüriň
            galdyrýan nagşyny tanamaga ýarar.
          </li>
        </ul>
        <p>
          Jady şu: gizlin açar bilen “möhürlenen” zat, diňe oňa laýyk gelýän açyk
          açar bilen barlanyp bilner. We açyk açardan gizlin açary tapmak amalda
          mümkin däl.
        </p>

        <h2>3. Sanly gol</h2>
        <p>
          Ine tamga (möhür) hut şu ýerde sanlaşýar. Bir gurama resminama
          taýýarlanda:
        </p>
        <ul>
          <li>Resminamanyň <strong>hash-ini</strong> alýar (barmak yzy).</li>
          <li>Bu barmak yzyny öz <strong>gizlin açary bilen</strong> möhürleýär → sanly gol.</li>
          <li>Goly resminama goşýar.</li>
        </ul>
        <p>Resminamany barlaýan tarap bolsa:</p>
        <ul>
          <li>Resminamanyň hash-ini täzeden hasaplaýar.</li>
          <li>Guramanyň <strong>açyk açary bilen</strong> goly barlaýar.</li>
          <li>
            Iki barmak yzy gabat gelse: resminama hakykatdan-da şol guramadan
            gelendir we <strong>asla üýtgedilmändir.</strong>
          </li>
        </ul>

        <Callout title="Gadymy möhüriň sanly garşylygy" tone="gold">
          Gadym zamanda bir resminamanyň hakykydygyny, onuň üstündäki möhürden
          (tamga) bilýärdiň. Sanly gol hut şoldur — emma galplygy matematik taýdan
          mümkin bolmadyk möhür.
        </Callout>

        <h2>PKI — ynam kimden gelýär?</h2>
        <p>
          Onda bir açyk açaryň hakykatdan-da “Mysal uniwersitete” degişlidigini
          nireden bilýärsiň? Muny çözýän ulgama{" "}
          <strong>PKI (Public Key Infrastructure — Açyk Açar Infrastrukturasy)</strong>{" "}
          diýilýär. PKI, haýsy açaryň haýsy gurama degişlidigini we ol guramanyň
          nämä ygtyýarlydygyny ýazýan ynam zynjyrydyr.
        </p>
        <p>
          Tamga-da häzir bu işi gol çekilen <Link href="/docs/trust-lists">ynam sanawlary</Link> edýär
          (soňra rugsatly kitap öz üstüne alyp biler): guramalaryň açyk açarlaryny we
          ygtyýarlaryny hemmelere açyk, üýtgeşmeleri anyklanýan{" "}
          <strong>ynam registri</strong> hökmünde saklaýar. Resminamanyň özüni däl
          — diňe “bu gurama ynamlymy, açary heniz hem güýçlümi” maglumatyny.
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
  return pageMeta(locale, "/docs/cryptography", { title: c.meta.title, description: c.meta.description });
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
      href="/docs/cryptography"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

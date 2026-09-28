import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout } from "@/components/doc-article";
import { DisclosureCard } from "@/components/disclosure-card";
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
      title: "Selective disclosure and SD-JWT",
      description:
        "Sharing only the necessary field of a credential without breaking its integrity, via selective disclosure and SD-JWT. The data-minimization principle in practice.",
    },
    eyebrow: "Concepts",
    title: "Selective disclosure and SD-JWT",
    intro:
      "Being able to prove a single required fact without showing the whole document. This is the most powerful idea in modern digital identity.",
    body: (
      <>
        <h2>The problem: “all or nothing”</h2>
        <p>
          When you show your ID, you actually share far more than is needed. To
          enter a bar it’s enough to say “I’m over 18,” yet your ID also reveals
          your name, address, birth date and national ID number. This is a
          wasteful model in terms of privacy.
        </p>

        <h2>The solution: selective disclosure</h2>
        <p>
          <strong>Selective disclosure</strong> is the ability to reveal{" "}
          <strong>only the necessary field</strong> of a document and keep the
          rest hidden. And while doing so the issuer’s signature remains valid —
          i.e. the fields you hide do not break the document’s integrity.
        </p>

        <h3>What makes it possible: SD-JWT</h3>
        <p>
          <strong>SD-JWT (Selective Disclosure JWT)</strong> is a format that
          stores each field of the document separately as a “salted hash.” The
          signature covers all of these hashes. During presentation the holder
          shares the original value of only the fields they want to open; the rest
          stay hidden as hashes, yet the signature still verifies.
        </p>

        <DisclosureCard locale="en" />

        <Callout title="Result" tone="primary">
          <strong>Higher trust by sharing less data.</strong> This is the direct
          application of the “data minimization” and “privacy by design”
          principles.
        </Callout>

        <h2>One step further: zero-knowledge proof (ZKP)</h2>
        <p>
          <strong>Zero-Knowledge Proof (ZKP)</strong> takes this even further: it
          lets you prove something <strong>without giving its value at all</strong>.
          You can prove the claim “I’m over 18” without even showing the field
          that contains your birth date. Tamga’s roadmap includes advanced privacy
          technologies such as ZKP, anonymous credentials and confidential
          computing.
        </p>
        <Callout title="What works today" tone="gold">
          Without zero-knowledge, Tamga already proves “over 18” without a birth date: the identity
          credential also comes as an ISO 18013-5 mdoc in which the issuer has signed a separate{" "}
          <code>age_over_18</code> field. An age check requests that one field and receives nothing
          else.
        </Callout>

        <p>
          The ground is now ready. In the next section we’ll see{" "}
          <Link href="/docs/how-tamga-works">how these pieces come together</Link>{" "}
          in the Tamga Network architecture.
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Seçici ifşa ve SD-JWT",
      description:
        "Selective disclosure (seçici ifşa) ve SD-JWT ile bir belgenin bütünlüğünü bozmadan yalnızca gerekli alanı paylaşmak. Veri minimizasyonu ilkesinin uygulanışı.",
    },
    eyebrow: "Kavramlar",
    title: "Seçici ifşa ve SD-JWT",
    intro:
      "Bir belgenin tamamını göstermeden, yalnızca gereken tek bir bilgiyi kanıtlayabilmek. Modern dijital kimliğin en güçlü fikri budur.",
    body: (
      <>
        <h2>Sorun: “hepsi ya da hiçbiri”</h2>
        <p>
          Kimliğini gösterdiğinde, aslında ihtiyaç duyulandan çok daha fazlasını
          paylaşırsın. Bara girmek için sadece “18 yaşından büyüğüm” demen
          yeterken, kimliğin adını, adresini, doğum tarihini, TC numaranı da açık
          eder. Bu, mahremiyet açısından savurgan bir modeldir.
        </p>

        <h2>Çözüm: seçici ifşa (selective disclosure)</h2>
        <p>
          <strong>Seçici ifşa</strong>, bir belgeden{" "}
          <strong>yalnızca gerekli alanı</strong> açığa çıkarıp geri kalanını
          gizli tutabilme yeteneğidir. Ve bunu yaparken belgenin issuer imzası
          hâlâ geçerli kalır — yani gizlediğin alanlar belgenin bütünlüğünü bozmaz.
        </p>

        <h3>Bunu mümkün kılan: SD-JWT</h3>
        <p>
          <strong>SD-JWT (Selective Disclosure JWT)</strong>, belgenin her alanını
          ayrı ayrı “tuzlanmış özet” (salted hash) olarak saklayan bir formattır.
          İmza bu özetlerin tamamını kapsar. Sunum sırasında holder, yalnızca açmak
          istediği alanların orijinal değerini paylaşır; gerisi özet hâlinde gizli
          kalır ama imza yine de doğrulanır.
        </p>

        <DisclosureCard locale="tr" />

        <Callout title="Sonuç" tone="primary">
          <strong>Daha az veri paylaşarak daha yüksek güven.</strong> Bu, “veri
          minimizasyonu” ve “privacy by design” ilkelerinin doğrudan
          uygulanmasıdır.
        </Callout>

        <h2>Bir adım ötesi: sıfır bilgi ispatı (ZKP)</h2>
        <p>
          <strong>Zero-Knowledge Proof (ZKP)</strong> — sıfır bilgi ispatı — bunu
          daha da ileri götürür: bir şeyi,{" "}
          <strong>o şeyin değerini hiç vermeden</strong> kanıtlamanı sağlar.
          “18’den büyüğüm” iddiasını, doğum tarihini içeren alanı hiç göstermeden
          bile ispatlayabilirsin. Tamga’nın yol haritasında ZKP, anonim
          credential’lar ve confidential computing gibi ileri mahremiyet
          teknolojileri yer alır.
        </p>
        <Callout title="Bugün çalışan" tone="gold">
          Sıfır bilgi olmadan da Tamga bugün doğum tarihini vermeden “18 yaş üstü”nü kanıtlar:
          kimlik belgesi ISO 18013-5 mdoc olarak da gelir ve içinde veren kurumun ayrıca imzaladığı{" "}
          <code>age_over_18</code> alanı vardır. Yaş kontrolü yalnızca bu alanı ister ve başka hiçbir
          şey almaz.
        </Callout>

        <p>
          Artık zemin hazır. Sıradaki bölümde bu parçaların Tamga Network
          mimarisinde{" "}
          <Link href="/docs/how-tamga-works">nasıl bir araya geldiğini</Link>{" "}
          göreceğiz.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Saýlama açyklama we SD-JWT",
      description:
        "Saýlama açyklama we SD-JWT bilen resminamanyň bitewiligini bozman diňe zerur meýdany paýlaşmak. Maglumat minimizasiýasy ýörelgesiniň amaly.",
    },
    eyebrow: "Düşünjeler",
    title: "Saýlama açyklama we SD-JWT",
    intro:
      "Resminamanyň bütinini görkezmän, diňe gerekli ýeke maglumaty subut edip bilmek. Häzirki zaman sanly şahsyýetiň iň güýçli pikiri şudur.",
    body: (
      <>
        <h2>Mesele: “ählisi ýa-da hiçbiri”</h2>
        <p>
          Şahsyýetiňi görkezeniňde, aslynda zerurdan has köpüni paýlaşýarsyň. Bara
          girmek üçin diňe “18 ýaşdan uly” diýmek ýeterlikkä, şahsyýetnamaň adyňy,
          salgyňy, doglan seneňi, şahsy belgiňi hem açyk edýär. Bu, gizlinlik
          taýdan israply modeldir.
        </p>

        <h2>Çözgüt: saýlama açyklama (selective disclosure)</h2>
        <p>
          <strong>Saýlama açyklama</strong>, resminamadan{" "}
          <strong>diňe zerur meýdany</strong> açyp galanyny gizlin saklap bilmek
          ukybydyr. We muny edende resminamanyň issuer goly heniz hem güýçli galýar
          — ýagny gizleýän meýdanlaryň resminamanyň bitewiligini bozmaýar.
        </p>

        <h3>Muny mümkin edýän: SD-JWT</h3>
        <p>
          <strong>SD-JWT (Selective Disclosure JWT)</strong>, resminamanyň her
          meýdanyny aýratyn “duzlanan jem” (salted hash) hökmünde saklaýan
          formatdyr. Gol bu jemleriň ählisini öz içine alýar. Hödürlemekde holder,
          diňe açmak isleýän meýdanlarynyň asyl bahasyny paýlaşýar; galany jem
          görnüşinde gizlin galýar, emma gol ýene-de barlanýar.
        </p>

        <DisclosureCard locale="tk" />

        <Callout title="Netije" tone="primary">
          <strong>Az maglumat paýlaşyp, ýokary ynam.</strong> Bu, “maglumat
          minimizasiýasy” we “privacy by design” ýörelgeleriniň göni amalydyr.
        </Callout>

        <h2>Bir ädim öňe: nol-bilim subutnamasy (ZKP)</h2>
        <p>
          <strong>Zero-Knowledge Proof (ZKP)</strong> — nol-bilim subutnamasy —
          muny has-da öňe alyp gidýär: bir zady,{" "}
          <strong>şol zadyň bahasyny asla bermän</strong> subut etmäge mümkinçilik
          berýär. “18-den uly” dawasyny, doglan seneni saklaýan meýdany asla
          görkezmän hem subut edip bilýärsiň. Tamga-nyň ýol kartasynda ZKP, anonim
          credential-lar we confidential computing ýaly ösen gizlinlik
          tehnologiýalary bar.
        </p>
        <Callout title="Häzir işleýän" tone="gold">
          Nol-bilimsiz hem Tamga häzir doglan senesini bermän “18 ýaşdan uly”-ny subut edýär:
          şahsyýet resminamasy ISO 18013-5 mdoc görnüşinde hem gelýär we onda berijiniň aýratyn
          gol çeken <code>age_over_18</code> meýdany bar. Ýaş barlagy diňe şu meýdany soraýar we başga
          hiç zat almaýar.
        </Callout>

        <p>
          Indi binýat taýýar. Indiki bölümde bu bölekleriň Tamga Network
          arhitekturasynda{" "}
          <Link href="/docs/how-tamga-works">nähili birleşýändigini</Link>{" "}
          göreris.
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
    <DocArticle
      href="/docs/selective-disclosure"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

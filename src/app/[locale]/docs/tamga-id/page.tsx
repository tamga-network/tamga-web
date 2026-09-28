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
      title: "TamgaID and the ecosystem",
      description:
        "The TamgaID wallet and the vertical platforms built on top of it: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay.",
    },
    eyebrow: "How Tamga works",
    title: "TamgaID and the ecosystem",
    intro:
      "The infrastructure is invisible; the user does not use it directly. What the user sees is TamgaID — and the sector platforms built on top of it.",
    body: (
      <>
        <h2>TamgaID — the first product</h2>
        <p>
          <strong>TamgaID</strong> is Tamga Network’s first end-user product: the
          wallet where the user creates, manages and uses their digital identity.
          It is an application like the{" "}
          <Link href="/docs/eidas-eudi">EUDI Wallet</Link> and provides:
        </p>
        <ul>
          <li><strong>Verifiable credentials</strong> — storing and presenting <Link href="/docs/did-vc">VCs</Link>.</li>
          <li><strong>Selective disclosure</strong> — sharing <Link href="/docs/selective-disclosure">only the necessary field</Link>.</li>
          <li><strong>Passes and tickets</strong> — a QR pass for campus turnstiles and event gates; single-use tickets.</li>
          <li><strong>Sign-in</strong> — sign up to websites once, then sign in with a passkey (<Link href="/docs/login-with-tamga">how</Link>).</li>
          <li><strong>E-signature (QES)</strong> — on the roadmap.</li>
          <li><strong>Identity management</strong> — control of keys, credentials and consents stays with the user.</li>
        </ul>

        <Callout title="An important distinction" tone="primary">
          <strong>TamgaID is not Tamga Network itself.</strong> Tamga Network is
          the infrastructure (invisible, inter-institutional trust); TamgaID is
          the first door that opens onto it (the application in the user’s hands).
        </Callout>

        <h2>Vertical platforms</h2>
        <p>
          On top of TamgaID and the shared trust layer, sector-specific{" "}
          <strong>vertical platforms</strong> are built, each using the same
          infrastructure:
        </p>
        <ul>
          <li>
            <strong>TamgaEducation</strong> — diplomas, transcripts and academic
            titles produced as internationally verifiable credentials.
          </li>
          <li>
            <strong>TamgaHealth</strong> — physician credentials, patient consents
            and digital health records.
          </li>
          <li>
            <strong>TamgaLogistics</strong> — last-mile delivery confirmed from the
            customer’s wallet, plus international freight (trucks, drivers, cargo,
            customs) with escrow release on proof of delivery.
          </li>
          <li>
            <strong>TamgaPay</strong> — payments between verified parties,
            tokenization and, later, CBDC.
          </li>
        </ul>

        <h2>Why is this structure powerful?</h2>
        <p>
          Because each platform does not build trust from scratch; it{" "}
          <strong>shares a common trust layer.</strong> An identity verified by
          TamgaEducation is also valid for TamgaHealth. Trust established once is
          reused across the whole ecosystem. This is exactly what “turning digital
          trust into a shared infrastructure” means.
        </p>

        <Callout title="What’s next" tone="gold">
          If you want a quick review of the terms’ definitions, see the{" "}
          <Link href="/docs/glossary">Glossary</Link>. If you want the whole
          picture, the <Link href="/whitepaper">Whitepaper</Link> is ideal.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "TamgaID ve ekosistem",
      description:
        "TamgaID cüzdanı ve üzerine kurulan dikey platformlar: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "TamgaID ve ekosistem",
    intro:
      "Altyapı görünmezdir; kullanıcı onu doğrudan kullanmaz. Kullanıcının gördüğü şey TamgaID’dir — ve onun üzerine kurulan sektörel platformlar.",
    body: (
      <>
        <h2>TamgaID — ilk ürün</h2>
        <p>
          <strong>TamgaID</strong>, Tamga Network’ün son kullanıcıya açılan ilk
          ürünüdür: kullanıcının dijital kimliğini oluşturduğu, yönettiği ve
          kullandığı cüzdan. <Link href="/docs/eidas-eudi">EUDI Wallet</Link>{" "}
          benzeri bir uygulamadır ve şunları sağlar:
        </p>
        <ul>
          <li><strong>Doğrulanabilir belgeler</strong> — <Link href="/docs/did-vc">VC</Link>’lerin saklanması ve sunulması.</li>
          <li><strong>Seçici ifşa</strong> — <Link href="/docs/selective-disclosure">yalnızca gerekli alanın</Link> paylaşılması.</li>
          <li><strong>Geçiş kartı ve bilet</strong> — kampüs turnikesi ve etkinlik kapısı için QR geçiş kartı; tek kullanımlık bilet.</li>
          <li><strong>Giriş</strong> — web sitelerine bir kez kayıt, sonra passkey ile giriş (<Link href="/docs/login-with-tamga">nasıl</Link>).</li>
          <li><strong>E-imza (QES)</strong> — yol haritasında.</li>
          <li><strong>Kimlik yönetimi</strong> — anahtarların, belgelerin ve onayların kontrolü kullanıcıda.</li>
        </ul>

        <Callout title="Önemli ayrım" tone="primary">
          <strong>TamgaID, Tamga Network’ün kendisi değildir.</strong> Tamga
          Network altyapıdır (görünmez, kurumlar arası güven); TamgaID ise o
          altyapıya açılan ilk kapıdır (kullanıcının elindeki uygulama).
        </Callout>

        <h2>Dikey platformlar</h2>
        <p>
          TamgaID’nin ve ortak güven katmanının üzerine, her biri aynı altyapıyı
          kullanan sektörel <strong>dikey platformlar</strong> inşa edilir:
        </p>
        <ul>
          <li>
            <strong>TamgaEducation</strong> — diploma, transkript ve akademik
            unvanların uluslararası doğrulanabilir belgeler olarak üretilmesi.
          </li>
          <li>
            <strong>TamgaHealth</strong> — hekim yetkileri, hasta onayları ve
            dijital sağlık belgeleri.
          </li>
          <li>
            <strong>TamgaLogistics</strong> — müşterinin cüzdanıyla onayladığı son
            teslimat ve uluslararası taşımacılık (TIR, şoför, mal, gümrük); teslim
            kanıtıyla escrow serbest bırakımı.
          </li>
          <li>
            <strong>TamgaPay</strong> — kimliği doğrulanmış taraflar arası ödeme,
            tokenizasyon ve ileride CBDC.
          </li>
        </ul>

        <h2>Neden bu yapı güçlü?</h2>
        <p>
          Çünkü her platform güveni sıfırdan kurmaz;{" "}
          <strong>ortak bir güven katmanını paylaşır.</strong> TamgaEducation’ın
          doğruladığı bir kimlik, TamgaHealth için de geçerlidir. Bir kez kurulan
          güven, tüm ekosistemde yeniden kullanılır. İşte “dijital güveni ortak bir
          altyapıya dönüştürmek” tam olarak bu demektir.
        </p>

        <Callout title="Devamı" tone="gold">
          Kavramların tanımlarını hızlıca gözden geçirmek istersen{" "}
          <Link href="/docs/glossary">Sözlük</Link> sayfasına bak. Bütünsel resmi
          görmek istersen <Link href="/whitepaper">Whitepaper</Link> ideal.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "TamgaID we ekoulgam",
      description:
        "TamgaID gapjygy we onuň üstünde gurulýan dik platformalar: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "TamgaID we ekoulgam",
    intro:
      "Infrastruktura görünmeýär; ulanyjy ony göni ulanmaýar. Ulanyjynyň görýän zady TamgaID-dir — we onuň üstünde gurulýan pudaklaýyn platformalar.",
    body: (
      <>
        <h2>TamgaID — ilkinji önüm</h2>
        <p>
          <strong>TamgaID</strong>, Tamga Network-iň soňky ulanyja açylýan ilkinji
          önümidir: ulanyjynyň sanly şahsyýetini döredýän, dolandyrýan we ulanýan
          gapjygy. <Link href="/docs/eidas-eudi">EUDI Wallet</Link> ýaly programma
          bolup, şulary üpjün edýär:
        </p>
        <ul>
          <li><strong>Barlanyp bilinýän resminamalar</strong> — <Link href="/docs/did-vc">VC</Link>-leriň saklanmagy we hödürlenmegi.</li>
          <li><strong>Saýlama açyklama</strong> — <Link href="/docs/selective-disclosure">diňe zerur meýdanyň</Link> paýlaşylmagy.</li>
          <li><strong>Geçiş kartasy we bilet</strong> — kampus turniketi we çäre gapysy üçin QR geçiş kartasy; bir gezeklik bilet.</li>
          <li><strong>Giriş</strong> — web saýtlara bir gezek hasaba durmak, soň passkey bilen giriş (<Link href="/docs/login-with-tamga">nähili</Link>).</li>
          <li><strong>E-gol (QES)</strong> — ýol kartasynda.</li>
          <li><strong>Şahsyýet dolandyryşy</strong> — açarlaryň, resminamalaryň we razylyklaryň gözegçiligi ulanyjyda.</li>
        </ul>

        <Callout title="Möhüm tapawut" tone="primary">
          <strong>TamgaID Tamga Network-iň özi däl.</strong> Tamga Network
          infrastrukturadyr (görünmeýän, guramalar arasy ynam); TamgaID bolsa şol
          infrastruktura açylýan ilkinji gapydyr (ulanyjynyň elindäki programma).
        </Callout>

        <h2>Dik platformalar</h2>
        <p>
          TamgaID-iň we umumy ynam gatlagynyň üstünde, hersi şol bir
          infrastrukturany ulanýan pudaklaýyn <strong>dik platformalar</strong>{" "}
          gurulýar:
        </p>
        <ul>
          <li>
            <strong>TamgaEducation</strong> — diplomlaryň, transkriptleriň we
            akademiki dereželeriň halkara barlanyp bilinýän resminamalar hökmünde
            öndürilmegi.
          </li>
          <li>
            <strong>TamgaHealth</strong> — lukman ygtyýarlary, näsag razylyklary we
            sanly saglyk resminamalary.
          </li>
          <li>
            <strong>TamgaLogistics</strong> — müşderiniň gapjygy bilen tassyklaýan
            soňky eltip beriş we halkara daşamak (TIR, sürüji, haryt, gümrük); eltip
            beriş subutnamasy bilen escrow açylyşy.
          </li>
          <li>
            <strong>TamgaPay</strong> — şahsyýeti barlanan taraplaryň arasynda
            töleg, tokenleşdirme we geljekde CBDC.
          </li>
        </ul>

        <h2>Näme üçin bu gurluş güýçli?</h2>
        <p>
          Sebäbi her platforma ynamy başdan gurmaýar;{" "}
          <strong>umumy ynam gatlagyny paýlaşýar.</strong> TamgaEducation-yň
          barlan şahsyýeti, TamgaHealth üçin hem güýçlüdir. Bir gezek gurlan ynam,
          tutuş ekoulgamda gaýtadan ulanylýar. Ine “sanly ynamy umumy infrastruktura
          öwürmek” hut şuny aňladýar.
        </p>

        <Callout title="Dowamy" tone="gold">
          Terminleriň kesgitlemelerine çalt göz aýlamak isleseň{" "}
          <Link href="/docs/glossary">Sözlük</Link> sahypasyna seret. Bütewi surady
          görmek isleseň <Link href="/whitepaper">Whitepaper</Link> ideal.
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
      href="/docs/tamga-id"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

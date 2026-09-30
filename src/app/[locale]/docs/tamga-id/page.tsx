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
      title: "Tamga Wallet",
      description:
        "Tamga Wallet, the app where a person keeps and presents their credentials — and why one trust layer serves every sector.",
    },
    eyebrow: "How Tamga works",
    title: "Tamga Wallet",
    intro:
      "The infrastructure is invisible; the user does not use it directly. What the user sees is Tamga Wallet — the app in their hands.",
    body: (
      <>
        <h2>Tamga Wallet — the first product</h2>
        <p>
          <strong>Tamga Wallet</strong> is Tamga Network’s first end-user product:
          the app where a person keeps and presents their credentials. It is an
          application like the <Link href="/docs/eidas-eudi">EUDI Wallet</Link>{" "}
          and provides:
        </p>
        <ul>
          <li><strong>Verifiable credentials</strong> — storing and presenting <Link href="/docs/did-vc">VCs</Link>.</li>
          <li><strong>Selective disclosure</strong> — sharing <Link href="/docs/selective-disclosure">only the necessary field</Link>.</li>
          <li><strong>Passes and tickets</strong> — a QR pass for campus turnstiles and event gates; single-use tickets.</li>
          <li><strong>Sign-in</strong> — “Sign in with Tamga”: sign up to websites once, then sign in with a passkey (<Link href="/docs/login-with-tamga">how</Link>).</li>
          <li><strong>E-signature (QES)</strong> — on the roadmap.</li>
          <li><strong>Identity management</strong> — control of keys, credentials and consents stays with the user.</li>
        </ul>

        <Callout title="An important distinction" tone="primary">
          <strong>Tamga Wallet is not Tamga Network itself.</strong> Tamga Network
          is the infrastructure (invisible, inter-institutional trust); Tamga
          Wallet is the first door that opens onto it (the application in the
          user’s hands).
        </Callout>

        <h2>One trust layer, every sector</h2>
        <p>
          Institutions in different sectors issue their own credentials on the
          same trust layer; the wallet and the verification steps stay the same.
          Education, identity and event tickets run today; health is being
          designed; other sectors show where the same layer leads.
        </p>

        <h2>Why is this structure powerful?</h2>
        <p>
          Because no sector builds trust from scratch; each one{" "}
          <strong>shares a common trust layer.</strong> A verifier that already
          checks a diploma can check a ticket or a licence the same way. Trust
          established once is reused across the whole ecosystem. This is exactly
          what “turning digital trust into a shared infrastructure” means.
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
      title: "Tamga Wallet",
      description:
        "Kişinin belgelerini sakladığı ve sunduğu uygulama Tamga Wallet — ve tek güven katmanının neden her sektöre hizmet ettiği.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "Tamga Wallet",
    intro:
      "Altyapı görünmezdir; kullanıcı onu doğrudan kullanmaz. Kullanıcının gördüğü şey Tamga Wallet’tır — elindeki uygulama.",
    body: (
      <>
        <h2>Tamga Wallet — ilk ürün</h2>
        <p>
          <strong>Tamga Wallet</strong>, Tamga Network’ün son kullanıcıya açılan
          ilk ürünüdür: kişinin belgelerini sakladığı ve sunduğu cüzdan
          uygulaması. <Link href="/docs/eidas-eudi">EUDI Wallet</Link> benzeri
          bir uygulamadır ve şunları sağlar:
        </p>
        <ul>
          <li><strong>Doğrulanabilir belgeler</strong> — <Link href="/docs/did-vc">VC</Link>’lerin saklanması ve sunulması.</li>
          <li><strong>Seçici ifşa</strong> — <Link href="/docs/selective-disclosure">yalnızca gerekli alanın</Link> paylaşılması.</li>
          <li><strong>Geçiş kartı ve bilet</strong> — kampüs turnikesi ve etkinlik kapısı için QR geçiş kartı; tek kullanımlık bilet.</li>
          <li><strong>Giriş</strong> — “Tamga ile giriş yap”: web sitelerine bir kez kayıt, sonra passkey ile giriş (<Link href="/docs/login-with-tamga">nasıl</Link>).</li>
          <li><strong>E-imza (QES)</strong> — yol haritasında.</li>
          <li><strong>Kimlik yönetimi</strong> — anahtarların, belgelerin ve onayların kontrolü kullanıcıda.</li>
        </ul>

        <Callout title="Önemli ayrım" tone="primary">
          <strong>Tamga Wallet, Tamga Network’ün kendisi değildir.</strong> Tamga
          Network altyapıdır (görünmez, kurumlar arası güven); Tamga Wallet ise o
          altyapıya açılan ilk kapıdır (kullanıcının elindeki uygulama).
        </Callout>

        <h2>Tek güven katmanı, her sektör</h2>
        <p>
          Farklı sektörlerdeki kurumlar kendi belgelerini aynı güven katmanında
          verir; cüzdan ve doğrulama adımları değişmez. Eğitim, kimlik ve
          etkinlik bileti bugün çalışıyor; sağlık tasarlanıyor; diğer sektörler
          aynı katmanın nereye uzandığını gösteriyor.
        </p>

        <h2>Neden bu yapı güçlü?</h2>
        <p>
          Çünkü hiçbir sektör güveni sıfırdan kurmaz;{" "}
          <strong>ortak bir güven katmanını paylaşır.</strong> Diplomayı
          doğrulayan bir doğrulayıcı, bileti ya da ruhsatı da aynı yolla
          doğrular. Bir kez kurulan güven, tüm ekosistemde yeniden kullanılır.
          İşte “dijital güveni ortak bir altyapıya dönüştürmek” tam olarak bu
          demektir.
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
      title: "Tamga Wallet",
      description:
        "Adamyň resminamalaryny saklaýan we hödürleýän programmasy Tamga Wallet — we bir ynam gatlagynyň näme üçin ähli pudaklara hyzmat edýändigi.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "Tamga Wallet",
    intro:
      "Infrastruktura görünmeýär; ulanyjy ony göni ulanmaýar. Ulanyjynyň görýän zady Tamga Wallet-dir — elindäki programma.",
    body: (
      <>
        <h2>Tamga Wallet — ilkinji önüm</h2>
        <p>
          <strong>Tamga Wallet</strong>, Tamga Network-iň soňky ulanyja açylýan
          ilkinji önümidir: adamyň resminamalaryny saklaýan we hödürleýän gapjyk
          programmasy. <Link href="/docs/eidas-eudi">EUDI Wallet</Link> ýaly
          programma bolup, şulary üpjün edýär:
        </p>
        <ul>
          <li><strong>Barlanyp bilinýän resminamalar</strong> — <Link href="/docs/did-vc">VC</Link>-leriň saklanmagy we hödürlenmegi.</li>
          <li><strong>Saýlama açyklama</strong> — <Link href="/docs/selective-disclosure">diňe zerur meýdanyň</Link> paýlaşylmagy.</li>
          <li><strong>Geçiş kartasy we bilet</strong> — kampus turniketi we çäre gapysy üçin QR geçiş kartasy; bir gezeklik bilet.</li>
          <li><strong>Giriş</strong> — “Tamga bilen gir”: web saýtlara bir gezek hasaba durmak, soň passkey bilen giriş (<Link href="/docs/login-with-tamga">nähili</Link>).</li>
          <li><strong>E-gol (QES)</strong> — ýol kartasynda.</li>
          <li><strong>Şahsyýet dolandyryşy</strong> — açarlaryň, resminamalaryň we razylyklaryň gözegçiligi ulanyjyda.</li>
        </ul>

        <Callout title="Möhüm tapawut" tone="primary">
          <strong>Tamga Wallet Tamga Network-iň özi däl.</strong> Tamga Network
          infrastrukturadyr (görünmeýän, guramalar arasy ynam); Tamga Wallet bolsa
          şol infrastruktura açylýan ilkinji gapydyr (ulanyjynyň elindäki
          programma).
        </Callout>

        <h2>Bir ynam gatlagy, ähli pudaklar</h2>
        <p>
          Dürli pudaklardaky guramalar öz resminamalaryny şol bir ynam gatlagynda
          berýär; gapjyk we barlag ädimleri üýtgemeýär. Bilim, şahsyýet we çäre
          bileti häzir işleýär; saglyk taslanýar; beýleki pudaklar şol bir
          gatlagyň nirä barýandygyny görkezýär.
        </p>

        <h2>Näme üçin bu gurluş güýçli?</h2>
        <p>
          Sebäbi hiç bir pudak ynamy başdan gurmaýar;{" "}
          <strong>umumy ynam gatlagyny paýlaşýar.</strong> Diplomy barlaýan
          barlaýjy bileti ýa-da ygtyýarnamany hem şol ýol bilen barlaýar. Bir
          gezek gurlan ynam, tutuş ekoulgamda gaýtadan ulanylýar. Ine “sanly ynamy
          umumy infrastruktura öwürmek” hut şuny aňladýar.
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
  return pageMeta(locale, "/docs/tamga-id", { title: c.meta.title, description: c.meta.description });
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

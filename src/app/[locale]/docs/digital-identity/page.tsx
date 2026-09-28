import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
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
      title: "What is digital identity?",
      description:
        "The concept of digital identity from scratch: what identity is, what a digital identity represents, identity vs. role, and self-sovereign identity (SSI).",
    },
    eyebrow: "Concepts",
    title: "What is digital identity?",
    intro:
      "Identity is the verifiable representation of “who” an entity is. Digital identity is its counterpart in the digital world.",
    body: (
      <>
        <h2>First, what is “identity”?</h2>
        <p>
          In everyday life, by identity we usually mean an ID card. But identity
          is actually broader than a card: it is what makes you you, distinguishes
          you from others and shows <strong>continuity</strong> over time. Your
          name can change, your address can change; but “you” remain the same
          person.
        </p>

        <Callout title="Key distinction: identity ≠ document" tone="gold">
          Identity is <em>continuous</em>. Documents (ID card, diploma, driving
          licence) are proofs bound to that identity that change over time. In
          Tamga this distinction is fundamental: identity stays fixed, while the
          documents attached to it come and go.
        </Callout>

        <h2>What does a digital identity represent?</h2>
        <p>
          Digital identity is not only for people. Every entity on the network can
          be represented by an identity:
        </p>
        <ul>
          <li>
            <strong>Person Identity</strong> — represents an individual. A single
            lifelong identity; all documents and relationships attach to it.
          </li>
          <li>
            <strong>Organization Identity</strong> — represents a legal entity: a
            university, hospital, company or public institution.
          </li>
          <li>
            <strong>Asset Identity</strong> — represents a physical or digital
            asset: a vehicle, container, device or sensor.
          </li>
          <li>
            <strong>Agent Identity</strong> (future) — autonomous AI agents acting
            on behalf of an organization.
          </li>
        </ul>

        <h2>Identity vs. role</h2>
        <p>
          Identity says “who you are,” a role says “what you can do.” A university
          can be both an <strong>Issuer</strong> (it issues diplomas) and a{" "}
          <strong>Verifier</strong> (it verifies other documents). Identity stays
          fixed; roles change with context.
        </p>
        <p>
          This distinction yields an important principle:{" "}
          <strong>the source of authority is always an organization.</strong> A
          physician writes a prescription not in their own name, but with the
          verifiable authority granted by the institution they work for.
        </p>

        <h2>Self-sovereign identity (SSI)</h2>
        <p>
          <strong>Self-Sovereign Identity (SSI)</strong> is the approach where
          control of identity belongs not to a central institution but to{" "}
          <strong>the user themselves</strong>. You carry your own documents; you
          decide what to share with whom. Tamga Network embraces this principle;
          in the following pages we’ll see the technologies that make it possible
          (DID, VC, selective disclosure) one by one.
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Dijital Kimlik nedir?",
      description:
        "Dijital kimlik kavramı sıfırdan: kimlik nedir, dijital kimlik neyi temsil eder, kimlik ile rol farkı ve öz-egemen kimlik (SSI).",
    },
    eyebrow: "Kavramlar",
    title: "Dijital Kimlik nedir?",
    intro:
      "Kimlik, bir varlığın “kim olduğunun” doğrulanabilir temsilidir. Dijital kimlik ise bunun dijital ortamdaki karşılığıdır.",
    body: (
      <>
        <h2>Önce “kimlik” nedir?</h2>
        <p>
          Günlük hayatta kimlik derken çoğunlukla kimlik kartını kastederiz. Ama
          kimlik aslında karttan daha geniştir: seni sen yapan, başkalarından
          ayıran ve zaman içinde <strong>süreklilik</strong> gösteren şeydir. Adın
          değişebilir, adresin değişebilir; ama “sen” aynı kişi olarak kalırsın.
        </p>

        <Callout title="Kilit ayrım: kimlik ≠ belge" tone="gold">
          Kimlik <em>süreklidir</em>. Belgeler (kimlik kartı, diploma, ehliyet)
          ise o kimliğe bağlı, zamanla değişen kanıtlardır. Tamga’da bu ayrım
          temeldir: kimlik sabit kalır, ona bağlanan belgeler gelir gider.
        </Callout>

        <h2>Dijital kimlik neyi temsil eder?</h2>
        <p>
          Dijital kimlik yalnızca insanlar için değildir. Ağ üzerindeki her varlık
          bir kimlikle temsil edilebilir:
        </p>
        <ul>
          <li>
            <strong>Person Identity</strong> — bir bireyi temsil eder. Yaşam boyu
            tek kimlik; tüm belgeler ve ilişkiler buna bağlanır.
          </li>
          <li>
            <strong>Organization Identity</strong> — bir tüzel kişiliği temsil
            eder: üniversite, hastane, şirket, kamu kurumu.
          </li>
          <li>
            <strong>Asset Identity</strong> — fiziksel ya da dijital bir varlığı
            temsil eder: araç, konteyner, cihaz, sensör.
          </li>
          <li>
            <strong>Agent Identity</strong> (gelecek) — bir organizasyon adına
            işlem yapan otonom yapay zekâ ajanları.
          </li>
        </ul>

        <h2>Kimlik ile rol farkı</h2>
        <p>
          Kimlik “kim olduğunu”, rol ise “ne yapabileceğini” söyler. Bir üniversite
          hem <strong>Issuer</strong> (diploma verir) hem de{" "}
          <strong>Verifier</strong> (başka belgeleri doğrular) olabilir. Kimlik
          sabit kalır, roller bağlama göre değişir.
        </p>
        <p>
          Bu ayrım önemli bir ilke doğurur:{" "}
          <strong>yetkinin kaynağı her zaman bir organizasyondur.</strong> Bir
          hekim, reçeteyi kendi adına değil, çalıştığı kurumun ona verdiği
          doğrulanabilir yetkiyle yazar.
        </p>

        <h2>Öz-egemen kimlik (SSI)</h2>
        <p>
          <strong>Self-Sovereign Identity (SSI)</strong> — “öz-egemen kimlik” —
          kimliğin kontrolünün merkezî bir kuruma değil,{" "}
          <strong>kullanıcının kendisine</strong> ait olduğu yaklaşımdır.
          Belgelerini sen taşırsın, neyi kiminle paylaşacağına sen karar verirsin.
          Tamga Network bu ilkeyi benimser; sonraki sayfalarda bunu mümkün kılan
          teknolojileri (DID, VC, seçici ifşa) tek tek göreceğiz.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Sanly şahsyýet näme?",
      description:
        "Sanly şahsyýet düşünjesi başdan: şahsyýet näme, sanly şahsyýet nämäni aňladýar, şahsyýet bilen rol tapawudy we öz-özygtyýarly şahsyýet (SSI).",
    },
    eyebrow: "Düşünjeler",
    title: "Sanly şahsyýet näme?",
    intro:
      "Şahsyýet, bir subýektiň “kimdiginiň” barlanyp bilinýän görkezmesidir. Sanly şahsyýet bolsa onuň sanly gurşawdaky garşylygydyr.",
    body: (
      <>
        <h2>Ilki “şahsyýet” näme?</h2>
        <p>
          Gündelik durmuşda şahsyýet diýlende köplenç şahsyýetnamany göz öňünde
          tutýarys. Emma şahsyýet aslynda kartdan has giňdir: seni sen edýän,
          başgalardan tapawutlandyrýan we wagtyň dowamynda{" "}
          <strong>dowamlylyk</strong> görkezýän zatdyr. Adyň üýtgäp biler, salgyň
          üýtgäp biler; emma “sen” şol bir adam bolup galýarsyň.
        </p>

        <Callout title="Esasy tapawut: şahsyýet ≠ resminama" tone="gold">
          Şahsyýet <em>dowamlydyr</em>. Resminamalar (şahsyýetnama, diplom,
          sürüjilik şahadatnamasy) bolsa şol şahsyýete bagly, wagtyň dowamynda
          üýtgeýän subutnamalardyr. Tamga-da bu tapawut esasydyr: şahsyýet
          durnukly galýar, oňa baglanan resminamalar gelip-gidip durýar.
        </Callout>

        <h2>Sanly şahsyýet nämäni aňladýar?</h2>
        <p>
          Sanly şahsyýet diňe adamlar üçin däl. Tordaky her subýekt bir şahsyýet
          bilen görkezilip bilner:
        </p>
        <ul>
          <li>
            <strong>Person Identity</strong> — şahsy aňladýar. Ömürboýy ýeke-täk
            şahsyýet; ähli resminamalar we gatnaşyklar oňa baglanýar.
          </li>
          <li>
            <strong>Organization Identity</strong> — ýuridiki şahsy aňladýar:
            uniwersitet, hassahana, kompaniýa, döwlet edarasy.
          </li>
          <li>
            <strong>Asset Identity</strong> — fiziki ýa-da sanly emlägi aňladýar:
            ulag, konteýner, enjam, datçik.
          </li>
          <li>
            <strong>Agent Identity</strong> (geljek) — gurama adyndan amal edýän
            awtonom emeli aň agentleri.
          </li>
        </ul>

        <h2>Şahsyýet bilen rol tapawudy</h2>
        <p>
          Şahsyýet “kimdigiňi”, rol bolsa “näme edip biljekdigiňi” aýdýar. Bir
          uniwersitet hem <strong>Issuer</strong> (diplom berýär) hem-de{" "}
          <strong>Verifier</strong> (başga resminamalary barlaýar) bolup biler.
          Şahsyýet durnukly galýar, rollar çäge görä üýtgeýär.
        </p>
        <p>
          Bu tapawut möhüm bir ýörelge döredýär:{" "}
          <strong>ygtyýaryň çeşmesi hemişe guramadyr.</strong> Lukman recepti öz
          adyndan däl, işleýän guramasynyň oňa beren barlanyp bilinýän ygtyýary
          bilen ýazýar.
        </p>

        <h2>Öz-özygtyýarly şahsyýet (SSI)</h2>
        <p>
          <strong>Self-Sovereign Identity (SSI)</strong> — “öz-özygtyýarly
          şahsyýet” — şahsyýetiň gözegçiliginiň merkezi gurama däl-de,{" "}
          <strong>ulanyjynyň özüne</strong> degişli bolan çemeleşmesidir.
          Resminamalaryňy özüň göterýärsiň, nämäni kim bilen paýlaşjagyňy özüň
          çözýärsiň. Tamga Network bu ýörelgäni kabul edýär; indiki sahypalarda
          muny mümkin edýän tehnologiýalary (DID, VC, saýlama açyklama) birin-birin
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
      href="/docs/digital-identity"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

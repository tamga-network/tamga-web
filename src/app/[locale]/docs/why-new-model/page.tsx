import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
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
      title: "Why a new model?",
      description:
        "The problems of the “document copy” model in digital identity, and why the world is moving to a portable proof model.",
    },
    eyebrow: "Getting started",
    title: "Why do we need a new model?",
    intro:
      "To understand digital identity, we first need to see what today’s model is and why it falls short.",
    body: (
      <>
        <h2>Today’s model: “hand over a copy of the document”</h2>
        <p>
          What do you do when you need to prove something? You hand over a
          photocopy of your ID card, upload a scan of your diploma, email a PDF of
          your statement. In other words, as proof you deliver{" "}
          <strong>a copy of the document</strong>.
        </p>
        <p>
          That copy is then stored on the other party’s server. This model has
          three fundamental problems:
        </p>
        <ul>
          <li>
            <strong>Data piles up everywhere.</strong> Every institution keeps a
            copy of your data. Scattered across hundreds of places, these copies
            form a huge surface for privacy breaches and leaks.
          </li>
          <li>
            <strong>Everyone repeats the same work.</strong> The bank, the
            hospital and the university all re-verify the same identity. With no
            shared trust layer, everyone reinvents the wheel.
          </li>
          <li>
            <strong>Authenticity is left to the “copy”.</strong> It’s hard to tell
            whether a PDF is real or fake. You can’t spot a Photoshopped document
            with the naked eye.
          </li>
        </ul>

        <Callout title="A concrete example" tone="accent">
          You need to prove your age to enter a bar. You show your ID — but
          alongside your age it also has your name, address, national ID number
          and place of birth. You only meant to say “I’m over 18,” yet you’re
          actually showing <strong>everything about yourself</strong>.
        </Callout>

        <h2>The new model: portable, verifiable proof</h2>
        <p>The new model reverses this logic:</p>
        <ul>
          <li>
            <strong>Data stays with you.</strong> Your documents live on your
            device, under your control; not on institutions’ servers.
          </li>
          <li>
            <strong>Only the necessary proof is shared.</strong> You can present
            proof that you’re “over 18” without ever giving your birth date.
          </li>
          <li>
            <strong>Verification happens without going to the source.</strong> The
            document carries the cryptographic signature of the institution that
            issued it. The verifier checks mathematically that the signature is
            genuine — without asking the institution at all.
          </li>
        </ul>

        <p>
          These three principles — <strong>user control</strong>,{" "}
          <strong>data minimization</strong> and{" "}
          <strong>cryptographic verification</strong> — are the foundation of
          modern digital identity. The European Union made this mandatory at
          continental scale with eIDAS 2.0.
        </p>

        <Callout title="Next step">
          To understand this model, let’s first clarify the concept of “digital
          identity.”
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Neden yeni bir model?",
      description:
        "Dijital kimlikte “belge kopyası” modelinin sorunları ve dünyanın neden taşınabilir kanıt modeline geçtiği.",
    },
    eyebrow: "Başlangıç",
    title: "Neden yeni bir modele ihtiyaç var?",
    intro:
      "Dijital kimliği anlamak için önce bugünkü modelin ne olduğunu ve neden yetersiz kaldığını görmek gerekir.",
    body: (
      <>
        <h2>Bugünkü model: “belgenin kopyasını ver”</h2>
        <p>
          Bir şeyi kanıtlaman gerektiğinde ne yaparsın? Kimlik kartının
          fotokopisini verirsin, diplomanın taranmış hâlini yüklersin, ekstre
          PDF’ini e-postayla gönderirsin. Yani kanıt olarak{" "}
          <strong>belgenin bir kopyasını</strong> teslim edersin.
        </p>
        <p>
          Bu kopya sonra karşı tarafın sunucusunda saklanır. Bu modelin üç temel
          sorunu vardır:
        </p>
        <ul>
          <li>
            <strong>Veri her yerde birikir.</strong> Her kurum senin verinin bir
            kopyasını tutar. Yüzlerce yerde dağılmış bu kopyalar, mahremiyet ve
            veri sızıntısı için dev bir yüzey oluşturur.
          </li>
          <li>
            <strong>Herkes aynı işi tekrar yapar.</strong> Banka da, hastane de,
            üniversite de aynı kimliği yeniden doğrular. Ortak bir güven katmanı
            olmadığı için herkes tekerleği yeniden icat eder.
          </li>
          <li>
            <strong>Gerçeklik “kopyaya” bırakılır.</strong> Bir PDF’in gerçek mi
            sahte mi olduğunu anlamak zordur. Photoshop’la değiştirilmiş bir
            belgeyi gözle ayırt edemezsin.
          </li>
        </ul>

        <Callout title="Somut bir örnek" tone="accent">
          Bir bara girmek için yaşını kanıtlaman gerekiyor. Kimliğini gösteriyorsun
          — ama kimliğinde yaşının yanında adın, adresin, TC numaran, doğum yerin
          de var. Sadece “18 yaşından büyüğüm” demek istiyorken, aslında{" "}
          <strong>her şeyini</strong> gösteriyorsun.
        </Callout>

        <h2>Yeni model: taşınabilir, doğrulanabilir kanıt</h2>
        <p>Yeni model bu mantığı tersine çevirir:</p>
        <ul>
          <li>
            <strong>Veri sende kalır.</strong> Belgelerin senin cihazında, senin
            kontrolünde durur; kurumların sunucusunda değil.
          </li>
          <li>
            <strong>Yalnızca gerekli kanıt paylaşılır.</strong> “18 yaşından
            büyüğüm” kanıtını, doğum tarihini hiç vermeden sunabilirsin.
          </li>
          <li>
            <strong>Doğrulama kaynağa gitmeden yapılır.</strong> Belge, onu veren
            kurumun kriptografik imzasını taşır. Doğrulayan taraf, kuruma hiç
            sormadan imzanın gerçek olduğunu matematiksel olarak kontrol eder.
          </li>
        </ul>

        <p>
          Bu üç ilke — <strong>kullanıcı kontrolü</strong>,{" "}
          <strong>veri minimizasyonu</strong> ve{" "}
          <strong>kriptografik doğrulama</strong> — modern dijital kimliğin
          temelidir. Avrupa Birliği bunu eIDAS 2.0 ile kıtasal ölçekte zorunlu
          hâle getirdi.
        </p>

        <Callout title="Sıradaki adım">
          Bu modeli anlamak için önce “dijital kimlik” kavramını netleştirelim.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Näme üçin täze model?",
      description:
        "Sanly şahsyýetde “resminama nusgasy” modeliniň meseleleri we dünýäniň näme üçin göçme subutnama modeline geçýändigi.",
    },
    eyebrow: "Başlangyç",
    title: "Näme üçin täze model gerek?",
    intro:
      "Sanly şahsyýete düşünmek üçin ilki bu günki modeliň nämedigini we näme üçin ýeterlik däldigini görmeli.",
    body: (
      <>
        <h2>Bu günki model: “resminamanyň nusgasyny ber”</h2>
        <p>
          Bir zady subut etmeli bolanyňda näme edýärsiň? Şahsyýetnamaňyň
          nusgasyny berýärsiň, diplomyňyň skanyny ýükleýärsiň, hasabyňyň PDF-ini
          e-poçta bilen ugradýarsyň. Ýagny subutnama hökmünde{" "}
          <strong>resminamanyň nusgasyny</strong> tabşyrýarsyň.
        </p>
        <p>
          Bu nusga soň garşy tarapyň serwerinde saklanýar. Bu modeliň üç esasy
          meselesi bar:
        </p>
        <ul>
          <li>
            <strong>Maglumat her ýerde toplanýar.</strong> Her gurama seniň
            maglumatyňyň nusgasyny saklaýar. Ýüzlerçe ýerde ýaýran bu nusgalar,
            gizlinlik we maglumat syzmasy üçin uly ýüz döredýär.
          </li>
          <li>
            <strong>Hemmeler şol bir işi gaýtalaýar.</strong> Bank hem, hassahana
            hem, uniwersitet hem şol bir şahsyýeti täzeden barlaýar. Umumy ynam
            gatlagy bolmansoň hemmeler tigiri täzeden oýlap tapýar.
          </li>
          <li>
            <strong>Hakykylyk “nusga” galdyrylýar.</strong> Bir PDF-iň hakykydygyny
            ýa-da galpdygyny bilmek kyn. Photoshop bilen üýtgedilen resminamany göz
            bilen tapawutlandyryp bilmeýärsiň.
          </li>
        </ul>

        <Callout title="Anyk mysal" tone="accent">
          Bara girmek üçin ýaşyňy subut etmeli. Şahsyýetnamaňy görkezýärsiň — emma
          onda ýaşyň bilen bilelikde adyň, salgyň, şahsy belgiň, doglan ýeriň hem
          bar. Diňe “18 ýaşdan uly” diýmek isleýärkäň, aslynda{" "}
          <strong>hemme zadyňy</strong> görkezýärsiň.
        </Callout>

        <h2>Täze model: göçme, barlanyp bilinýän subutnama</h2>
        <p>Täze model bu logikany tersine öwürýär:</p>
        <ul>
          <li>
            <strong>Maglumat seniň eliňde galýar.</strong> Resminamalaryň seniň
            enjamyňda, seniň gözegçiligiňde durýar; guramalaryň serwerinde däl.
          </li>
          <li>
            <strong>Diňe zerur subutnama paýlaşylýar.</strong> “18 ýaşdan uly”
            subutnamasyny, doglan seneňi asla bermän hödürläp bilýärsiň.
          </li>
          <li>
            <strong>Barlag çeşmä gitmän edilýär.</strong> Resminama, ony beren
            guramanyň kriptografik goluny göterýär. Barlaýan tarap, gurama asla
            soraman goluň hakykydygyny matematik taýdan barlaýar.
          </li>
        </ul>

        <p>
          Bu üç ýörelge — <strong>ulanyjy gözegçiligi</strong>,{" "}
          <strong>maglumat minimizasiýasy</strong> we{" "}
          <strong>kriptografik barlag</strong> — häzirki zaman sanly şahsyýetiň
          binýadydyr. Ýewropa Bileleşigi muny eIDAS 2.0 bilen yklym möçberinde
          hökmany etdi.
        </p>

        <Callout title="Indiki ädim">
          Bu modele düşünmek üçin ilki “sanly şahsyýet” düşünjesini aýdyňlaşdyralyň.
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
  return pageMeta(locale, "/docs/why-new-model", { title: c.meta.title, description: c.meta.description });
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
      href="/docs/why-new-model"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

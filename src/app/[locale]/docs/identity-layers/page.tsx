import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { DocArticle, Callout, CodeBlock } from "@/components/doc-article";
import { KeyTree } from "@/components/doc-visuals";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

const LAYERS_EN = `Root Identity      → "who is this?"   (state + guardian threshold)
Pseudonym          → in-app identity  (each app sees only its own)
Credential content → "what / what happened" (only holder decrypts)

No single party can decrypt all three layers at once.`;
const LAYERS_TR = `Kök Kimlik        → "bu kim?"        (devlet + guardian eşiği)
Pseudonym         → app-içi kimlik   (her app kendi pseudonym'ini görür)
Credential içerik → "ne var/ne oldu" (yalnızca holder çözer)

Hiçbir tek taraf üç katmanı birden çözemez.`;
const LAYERS_TK = `Kök Şahsyýet      → "bu kim?"        (döwlet + guardian eşigi)
Pseudonym         → app-içi şahsyýet (her app öz pseudonym'ini görýär)
Credential mazmun → "näme bar/boldy" (diňe holder açýar)

Hiç bir tarap üç gatlagy birden açyp bilmeýär.`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Three-layer identity and pseudonyms",
      description:
        "Tamga’s identity architecture: Root Identity, the Pseudonym layer and Credential content. Cross-application unlinkability and hierarchical deterministic key derivation.",
    },
    eyebrow: "Advanced Architecture",
    title: "Three-layer identity and pseudonyms",
    intro:
      "Instead of a single “user account,” Tamga keeps three separate objects independent of each other. The goal: no single party can answer both “who is this” and “what did this person do.”",
    body: (
      <>
        <Callout title="Design stage" tone="gold">
          The derived pseudonyms on this page are the target design. What protects you today: every verifier receives a different copy of your credential, bound to a different device key, so verifiers cannot match you with each other; websites keep only their own keyed account hash.
        </Callout>

        <Callout title="About this section" tone="gold">
          The design here is an indication of architectural direction and
          feasibility — it is not a production-ready specification. The named
          cryptographic primitives are mature standards; the final protocol must
          pass an independent security audit.
        </Callout>

        <h2>Three layers</h2>
        <p>
          The system keeps three objects separate; each has a different party who
          can access it and a different place where it lives:
        </p>
        <ul>
          <li>
            <strong>Root Identity</strong> — the unique identity record issued by
            the state; it holds the link to the real person. Only the issuer (the
            state) + a guardian threshold can access it. It lives in the state’s
            registry system.
          </li>
          <li>
            <strong>Pseudonym layer</strong> — per-application, mutually unlinkable
            pseudonyms derived from the root. An application sees only its own
            pseudonym. The derived key is on the holder’s device.
          </li>
          <li>
            <strong>Credential content</strong> — real data such as a health
            record, diploma or transaction history. Only the holder (with the
            seed) can decrypt it. It lives on the state server as an{" "}
            <em>encrypted blob</em>, under the blind-storage principle.
          </li>
        </ul>

        <CodeBlock label="Separation of the layers" code={LAYERS_EN} />

        <h2>What is a pseudonym, and why does it matter?</h2>
        <p>
          A <strong>pseudonym</strong> is the same person using separate,{" "}
          <strong>mutually unlinkable</strong> identities in different
          applications. Your identity in TamgaHealth cannot be mathematically
          correlated with your identity in TamgaPay. So the two applications cannot
          combine their data and profile you — this is called{" "}
          <strong>unlinkability</strong>.
        </p>

        <h2>How is it derived? Hierarchical deterministic keys</h2>
        <p>
          Pseudonyms rest on the same mathematical foundation used by hardware
          wallets (Bitcoin/Ethereum) —{" "}
          <strong>BIP32 / SLIP-0010 hierarchical deterministic (HD) key
          derivation</strong>— adapted for identity:
        </p>
        <ul>
          <li>
            The user’s 24 words (<strong>BIP39 mnemonic</strong>) are converted
            into a <strong>seed</strong> (PBKDF2-HMAC-SHA512).
          </li>
          <li>
            From the seed a <strong>master key</strong> (master key + chain code)
            is derived.
          </li>
          <li>
            For each application a separate child key is produced along a fixed{" "}
            <strong>derivation path</strong>; that key’s public key (or{" "}
            <code>did:key</code>) is the pseudonym in that application.
          </li>
        </ul>

        <KeyTree
          root="seed → master key"
          apps={[
            { path: "m/44'/TAMGA'/health'", out: "pseudonym_health" },
            { path: "m/44'/TAMGA'/education'", out: "pseudonym_edu" },
            { path: "m/44'/TAMGA'/pay'", out: "pseudonym_pay" },
          ]}
          note="A separate, unlinkable key per application — one-way derivation means apps cannot compute each other’s identity."
        />

        <Callout title="Critical property: one-wayness" tone="primary">
          Derivation is one-way. The Health app{" "}
          <strong>cannot compute</strong> the Pay app’s pseudonym from its own.
          Only the party who knows the master key — the holder themselves, with the
          seed — can derive all pseudonyms. This gives the user both convenience
          (a single seed) and privacy (cross-app unlinkability).
        </Callout>

        <p>
          But what happens when a court order requires answering “who is this
          pseudonym?” Because derivation is one-way, this needs a separate,
          auditable mechanism. On the next page we cover exactly this —
          accountable disclosure and escrow.
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Üç katmanlı kimlik ve pseudonym",
      description:
        "Tamga’nın kimlik mimarisi: Kök Kimlik, Pseudonym katmanı ve Credential içeriği. Uygulamalar arası bağlanamazlık (unlinkability) ve hiyerarşik deterministik anahtar türetme.",
    },
    eyebrow: "İleri Mimari",
    title: "Üç katmanlı kimlik ve pseudonym",
    intro:
      "Tamga, tek bir “kullanıcı hesabı” yerine üç ayrı objeyi birbirinden bağımsız tutar. Amaç: hiçbir tek taraf hem “bu kim” hem “bu kişi ne yaptı” sorularının ikisini birden yanıtlayamasın.",
    body: (
      <>
        <Callout title="Tasarım aşaması" tone="gold">
          Bu sayfadaki türetilmiş takma adlar hedef tasarımdır. Bugün seni koruyan: her doğrulayıcı belgenin farklı bir cihaz anahtarına bağlı farklı bir kopyasını alır, bu yüzden doğrulayıcılar seni birbirleriyle eşleştiremez; web siteleri yalnızca kendi sırlarıyla üretilmiş hesap özetini tutar.
        </Callout>

        <Callout title="Bu bölüm hakkında" tone="gold">
          Buradaki tasarım, mimari yön ve fizibilite göstergesidir — üretim-hazır
          bir spesifikasyon değildir. İsimlendirilen kriptografik primitifler
          olgunlaşmış standartlardır; nihai protokol bağımsız bir güvenlik
          denetiminden geçmelidir.
        </Callout>

        <h2>Üç katman</h2>
        <p>
          Sistem üç objeyi ayrı tutar; her birinin erişebileni ve durduğu yer
          farklıdır:
        </p>
        <ul>
          <li>
            <strong>Kök Kimlik (Root Identity)</strong> — devletin verdiği tekil
            kimlik kaydı; gerçek kişiyle bağı tutar. Yalnızca issuer (devlet) +
            guardian eşiği erişebilir. Devletin kayıt sisteminde durur.
          </li>
          <li>
            <strong>Pseudonym Katmanı</strong> — her uygulama için kökten
            türetilmiş, birbirine bağlanamayan takma kimlikler. Bir uygulama
            yalnızca kendi pseudonym’ini görür. Türetilmiş anahtar holder’ın
            cihazındadır.
          </li>
          <li>
            <strong>Credential İçeriği</strong> — sağlık kaydı, diploma, işlem
            geçmişi gibi gerçek veri. Yalnızca holder (seed ile) çözebilir. Devlet
            sunucusunda <em>şifreli blob</em> olarak, kör depolama ilkesiyle durur.
          </li>
        </ul>

        <CodeBlock label="Katmanların ayrımı" code={LAYERS_TR} />

        <h2>Pseudonym nedir, neden önemli?</h2>
        <p>
          <strong>Pseudonym</strong> (takma kimlik), aynı kişinin farklı
          uygulamalarda <strong>birbirine bağlanamayan</strong> ayrı kimlikler
          kullanmasıdır. TamgaHealth’teki kimliğinle TamgaPay’deki kimliğin
          matematiksel olarak ilişkilendirilemez. Böylece iki uygulama verilerini
          birleştirip seni profilleyemez — buna <strong>unlinkability</strong>{" "}
          (bağlanamazlık) denir.
        </p>

        <h2>Nasıl türetilir? Hiyerarşik deterministik anahtarlar</h2>
        <p>
          Pseudonym’ler, donanım cüzdanlarının (Bitcoin/Ethereum) kullandığı aynı
          matematiksel temele —{" "}
          <strong>BIP32 / SLIP-0010 hiyerarşik deterministik (HD) anahtar
          türetme</strong>— dayanır, kimliğe uyarlanmış hâliyle:
        </p>
        <ul>
          <li>
            Kullanıcının 24 kelimesi (<strong>BIP39 mnemonic</strong>) bir{" "}
            <strong>seed</strong>’e dönüştürülür (PBKDF2-HMAC-SHA512).
          </li>
          <li>
            Seed’den bir <strong>kök anahtar</strong> (master key + chain code)
            türetilir.
          </li>
          <li>
            Her uygulama için sabit bir <strong>türetme yolu</strong> ile ayrı bir
            alt anahtar üretilir; bu anahtarın açık anahtarı (veya{" "}
            <code>did:key</code>) o uygulamadaki pseudonym’dir.
          </li>
        </ul>

        <KeyTree
          root="seed → master key"
          apps={[
            { path: "m/44'/TAMGA'/health'", out: "pseudonym_health" },
            { path: "m/44'/TAMGA'/education'", out: "pseudonym_edu" },
            { path: "m/44'/TAMGA'/pay'", out: "pseudonym_pay" },
          ]}
          note="Her uygulama için ayrı, bağlanamayan anahtar — türetme tek yönlü olduğundan uygulamalar birbirinin kimliğini hesaplayamaz."
        />

        <Callout title="Kritik özellik: tek yönlülük" tone="primary">
          Türetme tek yönlüdür. Health uygulaması kendi pseudonym’inden Pay
          uygulamasının pseudonym’ini <strong>hesaplayamaz</strong>. Yalnızca kök
          anahtarı bilen taraf — yani holder’ın kendisi, seed ile — tüm
          pseudonym’leri türetebilir. Bu, kullanıcıya hem kolaylık (tek seed) hem
          de gizlilik (uygulamalar arası bağlanamazlık) verir.
        </Callout>

        <p>
          Peki mahkeme kararıyla “bu pseudonym kim?” sorusu gerektiğinde ne olur?
          Türetme tek yönlü olduğu için buna ayrı, denetlenebilir bir mekanizma
          gerekir. Sıradaki sayfada bunu — hesap verebilir ifşayı ve escrow’u — ele
          alıyoruz.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Üç gatlakly şahsyýet we pseudonym",
      description:
        "Tamga-nyň şahsyýet arhitekturasy: Kök Şahsyýet, Pseudonym gatlagy we Credential mazmuny. Programmalar arasy baglanyp bolmazlyk (unlinkability) we ýerarhik deterministik açar türetmesi.",
    },
    eyebrow: "Ösen Arhitektura",
    title: "Üç gatlakly şahsyýet we pseudonym",
    intro:
      "Tamga, ýeke “ulanyjy hasaby” ýerine üç aýry obýekti biri-birinden garaşsyz saklaýar. Maksat: hiç bir tarap hem “bu kim” hem “bu adam näme etdi” sowallarynyň ikisini birden jogaplap bilmesin.",
    body: (
      <>
        <Callout title="Dizaýn tapgyry" tone="gold">
          Bu sahypadaky alnan lakamlar maksat dizaýnydyr. Häzir seni goraýan: her barlaýjy resminamanyň başga enjam açaryna baglanan başga nusgasyny alýar, şonuň üçin barlaýjylar seni biri-biri bilen deňeşdirip bilmeýär; web saýtlar diňe öz syry bilen döredilen hasap heşini saklaýar.
        </Callout>

        <Callout title="Bu bölüm hakda" tone="gold">
          Bu ýerdäki dizaýn, arhitektura ugry we mümkinçilik görkezijisidir —
          önümçilige taýýar spesifikasiýa däl. Ady tutulan kriptografik primitiwler
          kämil standartlardyr; ahyrky protokol garaşsyz howpsuzlyk barlagyndan
          geçmeli.
        </Callout>

        <h2>Üç gatlak</h2>
        <p>
          Ulgam üç obýekti aýry saklaýar; hersiniň girip biljegi we durýan ýeri
          tapawutly:
        </p>
        <ul>
          <li>
            <strong>Kök Şahsyýet (Root Identity)</strong> — döwletiň beren
            ýeke-täk şahsyýet ýazgysy; hakyky adam bilen baglanyşygy saklaýar. Diňe
            issuer (döwlet) + guardian eşigi girip bilýär. Döwletiň hasaba alyş
            ulgamynda durýar.
          </li>
          <li>
            <strong>Pseudonym gatlagy</strong> — her programma üçin kökden alnan,
            biri-birine baglanyp bolmaýan lakam şahsyýetler. Bir programma diňe öz
            pseudonym-ini görýär. Alnan açar holderyň enjamyndadyr.
          </li>
          <li>
            <strong>Credential mazmuny</strong> — saglyk ýazgysy, diplom, amal
            taryhy ýaly hakyky maglumat. Diňe holder (seed bilen) açyp bilýär.
            Döwlet serwerinde <em>şifrlenen blob</em> hökmünde, kör saklaýyş
            ýörelgesi bilen durýar.
          </li>
        </ul>

        <CodeBlock label="Gatlaklaryň bölünişi" code={LAYERS_TK} />

        <h2>Pseudonym näme, näme üçin möhüm?</h2>
        <p>
          <strong>Pseudonym</strong> (lakam şahsyýet), şol bir adamyň dürli
          programmalarda <strong>biri-birine baglanyp bolmaýan</strong> aýry
          şahsyýetler ulanmagydyr. TamgaHealth-däki şahsyýetiň bilen
          TamgaPay-däki şahsyýetiň matematik taýdan baglanyşdyrylyp bilinmeýär.
          Şeýlelikde iki programma maglumatlaryny birleşdirip seni profilläp
          bilmeýär — muňa <strong>unlinkability</strong> (baglanyp bolmazlyk)
          diýilýär.
        </p>

        <h2>Nähili alynýar? Ýerarhik deterministik açarlar</h2>
        <p>
          Pseudonym-ler, apparat gapjyklarynyň (Bitcoin/Ethereum) ulanýan şol bir
          matematik binýadyna —{" "}
          <strong>BIP32 / SLIP-0010 ýerarhik deterministik (HD) açar
          türetmesine</strong>— daýanýar, şahsyýete uýgunlaşdyrylan görnüşi bilen:
        </p>
        <ul>
          <li>
            Ulanyjynyň 24 sözi (<strong>BIP39 mnemonic</strong>) bir{" "}
            <strong>seed</strong>-e öwrülýär (PBKDF2-HMAC-SHA512).
          </li>
          <li>
            Seed-den bir <strong>kök açar</strong> (master key + chain code)
            alynýar.
          </li>
          <li>
            Her programma üçin durnukly <strong>türetme ýoly</strong> bilen aýry
            çaga açar öndürilýär; şol açaryň açyk açary (ýa-da{" "}
            <code>did:key</code>) şol programmadaky pseudonym-dir.
          </li>
        </ul>

        <KeyTree
          root="seed → master key"
          apps={[
            { path: "m/44'/TAMGA'/health'", out: "pseudonym_health" },
            { path: "m/44'/TAMGA'/education'", out: "pseudonym_edu" },
            { path: "m/44'/TAMGA'/pay'", out: "pseudonym_pay" },
          ]}
          note="Her programma üçin aýry, baglanmaýan açar — türetme bir taraplaýyn bolýany üçin programmalar biri-biriniň şahsyýetini hasaplap bilmeýär."
        />

        <Callout title="Möhüm häsiýet: bir taraplaýynlyk" tone="primary">
          Türetme bir taraplaýyn. Health programmasy öz pseudonym-inden Pay
          programmasynyň pseudonym-ini <strong>hasaplap bilmeýär</strong>. Diňe
          kök açary bilýän tarap — ýagny holderyň özi, seed bilen — ähli
          pseudonym-leri türedip bilýär. Bu, ulanyja hem amatlylyk (ýeke seed) hem
          gizlinlik (programmalar arasy baglanyp bolmazlyk) berýär.
        </Callout>

        <p>
          Onda kazyýet karary bilen “bu pseudonym kim?” sowaly gerek bolanda näme
          bolýar? Türetme bir taraplaýyn bolýandygy üçin muňa aýry, barlanyp
          bilinýän mehanizm gerek. Indiki sahypada muny — hasabatly açyklamany we
          escrow-y — ele alýarys.
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
      href="/docs/identity-layers"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

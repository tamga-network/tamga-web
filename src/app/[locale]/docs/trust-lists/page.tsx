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

/* Kaynak: tamga-network SPEC-TRUST-0001 (docs/specifications/0017-trust-lists-phase-b.md), ADR-0009, D-BC-6, D-GOV-5 */
const LAYOUT = `https://trust.tamga.network/
  lotl.jws                    list of lists: national lists, schemas, wallet providers
  tl-tr.jws                   Türkiye: root CAs, issuers, relying parties
  tl-az.jws · tl-kz.jws …     reserved slots for the other member states
  anchors.jsonl               anchor log: one signed line per event, at least hourly
  keys/root-fingerprints.json the root of trust (also at tamga.network/trust-anchor)
  archive/                    every past version, never deleted`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Trust lists",
      description:
        "How a verifier knows an institution is real: signed, versioned, hash-chained trust lists — the same model the EU uses — and a public anchor log.",
    },
    eyebrow: "How Tamga works",
    title: "Trust lists: who may issue what",
    intro:
      "A signature proves who signed a document. It does not prove that the signer is a real university. That second question is answered by a trust list — a signed public register of institutions, their certificates, what they may issue and their current status.",
    body: (
      <>
        <h2>What is in a trust list</h2>
        <ul>
          <li><strong>Root certificate authorities</strong> of each state, with their status.</li>
          <li>
            <strong>Issuers</strong> — universities, public bodies, ticket sellers — with their
            certificate fingerprint, category and assurance class, and the{" "}
            <strong>document types they are authorized for</strong>, each with a time window.
          </li>
          <li>
            <strong>Relying parties</strong> (verifiers) with the fields they may request. Your
            wallet compares every request with this scope and warns if a verifier asks for more.
          </li>
          <li><strong>Wallet providers</strong> whose attestation keys vouch for genuine wallet apps.</li>
          <li>The <strong>document-type catalogue</strong>: each type’s metadata address and content hash.</li>
        </ul>
        <p>
          There is <strong>no personal data</strong> in a trust list — only institutions,
          certificates, statuses, dates and addresses.
        </p>

        <h2>Why you can trust the list itself</h2>
        <ul>
          <li><strong>Signed.</strong> Every list is a signed JWS; verifiers use only the signed file and check the signer against a fixed root fingerprint published out of band.</li>
          <li><strong>Versioned and hash-chained.</strong> Each version carries the hash of the previous one. Nothing is deleted; status changes are appended to a history.</li>
          <li><strong>Always fresh.</strong> Every list carries a “next update” date; a stale list is not trusted.</li>
          <li><strong>Anchor log.</strong> Every status-list publication and schema change is written as a signed line to a public, append-only log, at least hourly. A verifier can detect a list that was rolled back or rewritten.</li>
        </ul>
        <CodeBlock label="Published files" code={LAYOUT} />

        <h2>How a verifier uses it</h2>
        <FlowStrip
          nodes={[
            { label: "Credential", sub: "signed by an institution" },
            { label: "Trust list", sub: "authorized on the issue date?" },
            { label: "Status list", sub: "revoked or suspended?" },
            { label: "Result", sub: "accepted · rejected · indeterminate" },
          ]}
        />
        <p>
          Authorization is checked against the date the credential was issued. A diploma issued
          while the university was active stays valid even if the university is later suspended;
          new issuance stops at once. If the list cannot be reached or is out of date, the
          answer is <strong>indeterminate</strong> — never a false “rejected”.
        </p>

        <Callout title="Built for many states from day one" tone="gold">
          The structure already has a slot for every member state of the Organization of Turkic
          States. Today Tamga signs the lists as a <em>provisional</em> operator, on behalf of the
          states. Handing over changes only the operator field — institution identifiers,
          document types and existing credentials stay the same.
        </Callout>

        <h2>From lists to a ledger</h2>
        <p>
          Trust lists are what the EU itself uses (ETSI TS 119 612, the EUDI trusted lists). Every
          field maps to a smart-contract record, so the same data can later move to a{" "}
          <Link href="/docs/blockchain">permissioned ledger</Link> — once at least two independent
          operators join. The list history is then replayed and both are tested to give the same
          answer.
        </p>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Güven listeleri",
      description:
        "Doğrulayıcı bir kurumun gerçek olduğunu nasıl bilir: imzalı, sürümlü, hash-zincirli güven listeleri — AB’nin kullandığı model — ve herkese açık çapa günlüğü.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "Güven listeleri: kim neyi verebilir",
    intro:
      "İmza, belgeyi kimin imzaladığını kanıtlar. İmzalayanın gerçek bir üniversite olduğunu kanıtlamaz. Bu ikinci soruyu güven listesi cevaplar — kurumların, sertifikalarının, neyi verebileceklerinin ve güncel durumlarının imzalı, herkese açık kaydı.",
    body: (
      <>
        <h2>Güven listesinde ne var</h2>
        <ul>
          <li>Her devletin <strong>kök sertifika otoriteleri</strong> ve durumları.</li>
          <li>
            <strong>Belge verenler</strong> — üniversiteler, kamu kurumları, bilet satıcıları —
            sertifika parmak izi, kategori ve güvence sınıfıyla; ayrıca{" "}
            <strong>yetkili oldukları belge tipleri</strong>, her biri bir zaman aralığıyla.
          </li>
          <li>
            <strong>Doğrulayıcılar</strong> ve isteyebilecekleri alanlar. Cüzdanın her isteği bu
            kapsamla karşılaştırır, fazlası istenirse uyarır.
          </li>
          <li>Gerçek cüzdan uygulamalarına kefil olan <strong>cüzdan sağlayıcıları</strong>.</li>
          <li><strong>Belge tipi kataloğu</strong>: her tipin tanım adresi ve içerik özeti.</li>
        </ul>
        <p>
          Güven listesinde <strong>kişisel veri yoktur</strong> — yalnızca kurumlar, sertifikalar,
          durumlar, tarihler ve adresler.
        </p>

        <h2>Listenin kendisine neden güvenilir</h2>
        <ul>
          <li><strong>İmzalı.</strong> Her liste imzalı bir JWS’tir; doğrulayıcı yalnızca imzalı dosyayı kullanır ve imzalayanı bant dışında yayınlanmış sabit bir kök parmak iziyle karşılaştırır.</li>
          <li><strong>Sürümlü ve hash-zincirli.</strong> Her sürüm bir öncekinin özetini taşır. Hiçbir şey silinmez; durum değişiklikleri geçmişe eklenir.</li>
          <li><strong>Hep taze.</strong> Her listenin bir “sonraki güncelleme” tarihi vardır; bayat listeye güvenilmez.</li>
          <li><strong>Çapa günlüğü.</strong> Her iptal listesi yayını ve şema değişikliği, en az saatte bir, herkese açık ve yalnızca eklenebilen bir günlüğe imzalı satır olarak yazılır. Doğrulayıcı geri sarılmış ya da yeniden yazılmış bir listeyi fark eder.</li>
        </ul>
        <CodeBlock label="Yayınlanan dosyalar" code={LAYOUT} />

        <h2>Doğrulayıcı bunu nasıl kullanır</h2>
        <FlowStrip
          nodes={[
            { label: "Belge", sub: "kurum imzalı" },
            { label: "Güven listesi", sub: "veriliş tarihinde yetkili mi?" },
            { label: "İptal listesi", sub: "iptal ya da askıda mı?" },
            { label: "Sonuç", sub: "kabul · red · belirsiz" },
          ]}
        />
        <p>
          Yetki, belgenin verildiği tarihe göre denetlenir. Üniversite etkinken verilmiş bir
          diploma, üniversite sonradan askıya alınsa da geçerli kalır; yeni belge verme ise hemen
          durur. Listeye ulaşılamazsa ya da liste güncel değilse cevap{" "}
          <strong>belirsiz</strong> olur — asla sahte bir “red” değil.
        </p>

        <Callout title="İlk günden birden çok devlet için" tone="gold">
          Yapıda Türk Devletleri Teşkilatı’nın her üye devleti için şimdiden bir yer var. Bugün
          Tamga listeleri devletler adına <em>geçici</em> operatör olarak imzalar. Devir yalnızca
          operatör alanını değiştirir — kurum kimlikleri, belge tipleri ve verilmiş belgeler aynı
          kalır.
        </Callout>

        <h2>Listelerden deftere</h2>
        <p>
          Güven listeleri AB’nin kendisinin kullandığı yöntemdir (ETSI TS 119 612, EUDI güven
          listeleri). Her alan bir akıllı kontrat kaydına eşlenir; bu yüzden aynı veri, en az iki
          bağımsız operatör katıldığında <Link href="/docs/blockchain">izinli bir deftere</Link>{" "}
          taşınabilir. Liste geçmişi o zaman yeniden oynatılır ve ikisinin aynı cevabı verdiği
          test edilir.
        </p>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Ynam sanawlary",
      description:
        "Barlaýjy guramanyň hakykydygyny nädip bilýär: gol çekilen, wersiýaly, heş-zynjyrly ynam sanawlary — ÝB-niň ulanýan modeli — we açyk labyr žurnaly.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "Ynam sanawlary: kim näme berip biler",
    intro:
      "Gol resminama kimiň gol çekendigini subut edýär. Gol çekeniň hakyky uniwersitetdigini subut etmeýär. Bu ikinji soraga ynam sanawy jogap berýär — guramalaryň, olaryň sertifikatlarynyň, näme berip biljekdikleriniň we häzirki ýagdaýynyň gol çekilen, açyk hasaby.",
    body: (
      <>
        <h2>Ynam sanawynda näme bar</h2>
        <ul>
          <li>Her döwletiň <strong>kök sertifikat edaralary</strong> we olaryň ýagdaýy.</li>
          <li>
            <strong>Resminama berijiler</strong> — uniwersitetler, döwlet edaralary, bilet
            satyjylary — sertifikat barmak yzy, kategoriýa we kepillik synpy bilen; şeýle hem{" "}
            <strong>ygtyýarly bolan resminama görnüşleri</strong>, her biri wagt aralygy bilen.
          </li>
          <li>
            <strong>Barlaýjylar</strong> we olaryň sorap biljek meýdanlary. Gapjygyň her haýyşy bu
            çäk bilen deňeşdirýär, artykmajy soralsa duýduryş berýär.
          </li>
          <li>Hakyky gapjyk programmalaryna kepil geçýän <strong>gapjyk üpjün edijiler</strong>.</li>
          <li><strong>Resminama görnüşleriniň katalogy</strong>: her görnüşiň kesgitleme salgysy we mazmun heşi.</li>
        </ul>
        <p>
          Ynam sanawynda <strong>şahsy maglumat ýok</strong> — diňe guramalar, sertifikatlar,
          ýagdaýlar, seneler we salgylar.
        </p>

        <h2>Sanawyň özüne näme üçin ynanyp bolýar</h2>
        <ul>
          <li><strong>Gol çekilen.</strong> Her sanaw gol çekilen JWS; barlaýjy diňe gol çekilen faýly ulanýar we gol çekijini aýratyn ýol bilen çap edilen hemişelik kök barmak yzy bilen deňeşdirýär.</li>
          <li><strong>Wersiýaly we heş-zynjyrly.</strong> Her wersiýa öňküsiniň heşini göterýär. Hiç zat pozulmaýar; ýagdaý üýtgeşmeleri taryha goşulýar.</li>
          <li><strong>Hemişe täze.</strong> Her sanawyň “indiki täzelenme” senesi bar; köne sanawa ynanylmaýar.</li>
          <li><strong>Labyr žurnaly.</strong> Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi, azyndan sagatda bir gezek, açyk we diňe goşup bolýan žurnala gol çekilen setir hökmünde ýazylýar. Barlaýjy yza aýlanan ýa-da täzeden ýazylan sanawy anyklaýar.</li>
        </ul>
        <CodeBlock label="Çap edilýän faýllar" code={LAYOUT} />

        <h2>Barlaýjy muny nähili ulanýar</h2>
        <FlowStrip
          nodes={[
            { label: "Resminama", sub: "gurama tarapyndan gol çekilen" },
            { label: "Ynam sanawy", sub: "berlen senesinde ygtyýarlymy?" },
            { label: "Ýatyrylyş sanawy", sub: "ýatyrylanmy ýa-da togtadylanmy?" },
            { label: "Netije", sub: "kabul · ret · kesgitsiz" },
          ]}
        />
        <p>
          Ygtyýar resminamanyň berlen senesine görä barlanýar. Uniwersitet işjeň wagtynda berlen
          diplom, uniwersitet soňra togtadylsa-da güýjünde galýar; täze resminama bermek bolsa
          derrew togtaýar. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, jogap{" "}
          <strong>kesgitsiz</strong> bolýar — asla ýalan “ret” däl.
        </p>

        <Callout title="Ilkinji günden köp döwlet üçin" tone="gold">
          Gurluşda Türki Döwletleriň Guramasynyň her agza döwleti üçin eýýäm orun bar. Häzir
          Tamga sanawlary döwletleriň adyndan <em>wagtlaýyn</em> operator hökmünde gol çekýär.
          Tabşyrmak diňe operator meýdanyny üýtgedýär — gurama belgileri, resminama görnüşleri we
          berlen resminamalar şol bir bolup galýar.
        </Callout>

        <h2>Sanawlardan kitaba</h2>
        <p>
          Ynam sanawlary ÝB-niň özüniň ulanýan usulydyr (ETSI TS 119 612, EUDI ynam sanawlary).
          Her meýdan akylly kontrakt ýazgysyna gabat gelýär; şonuň üçin şol bir maglumat azyndan
          iki garaşsyz operator goşulanda <Link href="/docs/blockchain">rugsatly kitaba</Link>{" "}
          geçirilip bilner. Şonda sanawyň taryhy gaýtadan oýnalýar we ikisiniň şol bir jogaby
          berýändigi synagdan geçirilýär.
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
      href="/docs/trust-lists"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

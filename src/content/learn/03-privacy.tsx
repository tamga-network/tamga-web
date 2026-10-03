import type { LearnPage } from "./types";
import { Callout, Figure, Term } from "@/components/learn/prose";

/* Bölüm 3 — Gizlilik tasarımın içinde. Kaynaklar: ADR-0012/0023/0027/0031/0032, SPEC-PROTO-0002 §6 (aşırı talep),
   SPEC-WALLET-0001 WL5 (yapışkan kopya), Tamga ARF §2.7 (kişinin denetimi). */

/* ------------------------------------------------------------------ küçük şemalar (bölüme özel) */

type Row = { label: string; shown: boolean };

/** Veri azaltma: fotokopiyle giden alanlar ile yalnız gereken alan. */
function MinimisationCompare({
  left,
  right,
  rows,
}: {
  left: string;
  right: string;
  rows: Row[];
}) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      role="img"
      aria-label={`${left} / ${right}`}
    >
      {[left, right].map((title, side) => (
        <div
          key={title}
          className="rounded-xl border border-border bg-background p-4"
        >
          <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-foreground-subtle">
            {title}
          </p>
          <ul className="m-0 grid list-none gap-1.5 p-0">
            {rows.map((r) => {
              const on = side === 0 ? true : r.shown;
              return (
                <li
                  key={r.label}
                  className={`flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] ${
                    on
                      ? side === 0 && !r.shown
                        ? "bg-[color:var(--dg-warn,#b45309)]/[0.08] text-foreground"
                        : "bg-primary/[0.07] text-foreground"
                      : "bg-foreground/[0.03] text-foreground-subtle"
                  }`}
                >
                  <span>{r.label}</span>
                  <span aria-hidden className="font-mono text-[11px]">
                    {on ? "●" : "■■■"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Onay ekranı örneği: kim istiyor, ne istiyor, neden istiyor. */
function ConsentMock({
  who,
  whoNote,
  what,
  fields,
  why,
  purpose,
  extra,
  share,
  decline,
}: {
  who: string;
  whoNote: string;
  what: string;
  fields: { label: string; flagged?: boolean }[];
  why: string;
  purpose: string;
  extra: string;
  share: string;
  decline: string;
}) {
  return (
    <div className="mx-auto max-w-sm rounded-2xl border border-border bg-background p-5 shadow-sm">
      <p className="m-0 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground-subtle">
        {who}
      </p>
      <p className="m-0 mt-1 text-[15px] font-semibold text-foreground">
        {whoNote}
      </p>
      <p className="m-0 mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground-subtle">
        {what}
      </p>
      <ul className="m-0 mt-2 grid list-none gap-1.5 p-0">
        {fields.map((f) => (
          <li
            key={f.label}
            className={`flex items-center justify-between rounded-md px-3 py-1.5 text-[13px] ${
              f.flagged
                ? "bg-[color:var(--dg-warn,#b45309)]/[0.1] text-foreground"
                : "bg-primary/[0.07] text-foreground"
            }`}
          >
            <span>{f.label}</span>
            {f.flagged ? (
              <span className="text-[11px] font-medium text-[color:var(--dg-warn,#b45309)]">
                {extra}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground-subtle">
        {why}
      </p>
      <p className="m-0 mt-1 text-[13px] text-foreground-muted">{purpose}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <span className="rounded-lg border border-border py-2 text-center text-[13px] font-medium text-foreground">
          {decline}
        </span>
        <span className="rounded-lg bg-primary py-2 text-center text-[13px] font-semibold text-primary-contrast">
          {share}
        </span>
      </div>
    </div>
  );
}

const ROWS = {
  tr: [
    { label: "Ad soyad", shown: false },
    { label: "Fotoğraf", shown: false },
    { label: "Doğum tarihi", shown: false },
    { label: "Doğum yeri", shown: false },
    { label: "Belge numarası", shown: false },
    { label: "Anne ve baba adı", shown: false },
    { label: "18 yaşından büyük", shown: true },
  ],
  en: [
    { label: "Full name", shown: false },
    { label: "Photo", shown: false },
    { label: "Date of birth", shown: false },
    { label: "Place of birth", shown: false },
    { label: "Document number", shown: false },
    { label: "Parents' names", shown: false },
    { label: "Over 18", shown: true },
  ],
  tk: [
    { label: "Ady we familiýasy", shown: false },
    { label: "Surat", shown: false },
    { label: "Doglan senesi", shown: false },
    { label: "Doglan ýeri", shown: false },
    { label: "Resminama belgisi", shown: false },
    { label: "Ene-atasynyň ady", shown: false },
    { label: "18 ýaşdan uly", shown: true },
  ],
};

/* ------------------------------------------------------------------ sayfalar */

export const CHAPTER_3: LearnPage[] = [
  /* ============================================================ 3.1 Veri azaltma */
  {
    slug: "data-minimisation",
    chapter: 3,
    order: 1,
    minutes: 5,
    title: {
      tr: "Veri azaltma",
      en: "Data minimisation",
      tk: "Maglumaty azaltmak",
    },
    summary: {
      tr: "Bir işlem için gereken bilgiden fazlasını vermemek neden önemli ve nasıl mümkün olur.",
      en: "Why it matters not to give more than a task needs, and how that becomes possible.",
      tk: "Bir iş üçin zerur maglumatdan artykmaç bermezlik näme üçin möhüm we nädip mümkin bolýar.",
    },
    keyPoints: [
      {
        tr: "Her işlemin bir sorusu vardır; cevap için gereken bilgi çoğu zaman tek bir alandır.",
        en: "Every transaction asks one question; answering it usually takes a single field.",
        tk: "Her işiň bir soragy bar; jogap üçin köplenç diňe bir meýdan gerek.",
      },
      {
        tr: "Fazladan verilen her bilgi saklanır, sızabilir ve başka amaçla kullanılabilir.",
        en: "Every extra piece of data is stored, can leak and can be reused for other purposes.",
        tk: "Artykmaç berlen her maglumat saklanýar, syzyp biler we başga maksat üçin ulanylyp biler.",
      },
      {
        tr: "Dijital belge, veri azaltmayı bir kural olmaktan çıkarıp teknik olarak kolay ve varsayılan yapar.",
        en: "Digital credentials turn data minimisation from a rule into the easy, default behaviour.",
        tk: "Sanly resminama maglumaty azaltmagy düzgün bolmakdan çykaryp, aňsat we adaty ýagdaýa öwürýär.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Kavram: Gizlilik",
          en: "Concept: Privacy",
          tk: "Düşünje: Gizlinlik",
        },
        href: "/concepts/privacy",
        kind: "docs",
      },
      {
        label: {
          tr: "Aşırı talep denetimi (OpenID4VP profili)",
          en: "Over-asking check (OpenID4VP profile)",
          tk: "Artykmaç talap barlagy (OpenID4VP)",
        },
        href: "/specifications/openid4vp",
        kind: "docs",
      },
      {
        label: {
          tr: "Tamga Rulebook: doğrulayıcı kuralları",
          en: "Tamga Rulebook: verifier rules",
          tk: "Tamga Rulebook: barlaýjy düzgünleri",
        },
        href: "rulebook",
        kind: "arf",
      },
    ],
    body: {
      tr: (
        <>
          <p>
            Bir konsere giriyorsunuz. Kapıdaki görevlinin tek bir sorusu var:
            "Bu kişi 18 yaşından büyük mü?" Ama bugün bu soruya cevap vermek
            için kimlik kartınızı uzatırsınız. Görevli; adınızı, doğum
            tarihinizi, doğum yerinizi, belge numaranızı, hatta anne ve baba
            adınızı görür. Sorunun cevabı tek bir "evet"ti; siz yedi bilgi
            verdiniz.
          </p>
          <p>
            Bu sayfa, bunun neden önemli olduğunu ve dijital belgelerin bu
            dengesizliği nasıl düzelttiğini anlatıyor. Kavramın adı{" "}
            <Term
              tip="Bir işlem için yalnız gereken kişisel bilginin toplanması ilkesi."
              en="data minimisation"
            >
              veri azaltma
            </Term>
            .
          </p>

          <h2>Her işlemin bir sorusu vardır</h2>
          <p>
            Gündelik hayatta kimlik gösterdiğimiz anların çoğu aslında tek bir
            soruya cevap arar. Otel resepsiyonu "Rezervasyonu yapan siz
            misiniz?" diye sorar. Öğrenci indirimi veren bir müze "Öğrenci
            misiniz?" diye sorar. Bir işveren "Bu diploma gerçek mi ve bu kişiye
            mi ait?" diye sorar. Bir sınır kapısı ise çok daha fazlasını sorar
            ve sormaya da hakkı vardır.
          </p>
          <p>
            Veri azaltmanın özü şudur: soru ne kadar küçükse, verilen bilgi de o
            kadar küçük olmalıdır. Konser kapısının doğum tarihinizi bilmesine
            gerek yoktur; yalnız sonucun, yani "18 yaşından büyük" bilgisinin
            doğru olduğunu bilmesi yeter.
          </p>
          <Figure caption="Solda bugün olan: kimlik kartının bütün alanları görünür. Sağda olması gereken: yalnız sorunun cevabı.">
            <MinimisationCompare
              left="Kimlik kartı ile"
              right="Dijital belge ile"
              rows={ROWS.tr}
            />
          </Figure>

          <h2>Fazla bilgi neden zararlı?</h2>
          <p>
            Fazladan verilen bilgi kaybolmaz. Fotokopisi çekilir, bir dosyaya,
            bir bilgisayara ya da bir kayıt defterine geçer. Saklanan her bilgi
            üç risk taşır:
          </p>
          <ul>
            <li>
              <strong>Sızıntı:</strong> veritabanları saldırıya uğrar. Elinde
              hiç tutmadığı bilgiyi kimse sızdıramaz.
            </li>
            <li>
              <strong>Başka amaçla kullanım:</strong> bir işlem için toplanan
              bilgi, zamanla pazarlamada, profil çıkarmada ya da başka bir
              kurumla paylaşımda kullanılabilir.
            </li>
            <li>
              <strong>Kimlik hırsızlığı:</strong> belge numarası, doğum tarihi
              ve anne adı gibi bilgilerin birlikte ele geçmesi, başkasının adına
              işlem yapmayı kolaylaştırır.
            </li>
          </ul>
          <p>
            Bu yüzden Türkiye'deki{" "}
            <Term
              tip="6698 sayılı Kişisel Verilerin Korunması Kanunu."
              en="KVKK"
            >
              KVKK
            </Term>{" "}
            ve Avrupa'daki{" "}
            <Term
              tip="Avrupa Birliği Genel Veri Koruma Tüzüğü, (AB) 2016/679."
              en="GDPR"
            >
              GDPR
            </Term>{" "}
            gibi yasalar, kişisel verinin amaçla sınırlı ve ölçülü işlenmesini
            ister. Ama yasa tek başına yetmez: kâğıt kimlik kartının bir alanını
            "kapatmak" mümkün değildir. Kural var, araç yok.
          </p>

          <h2>Dijital belge bunu nasıl kolaylaştırır?</h2>
          <p>
            Dijital bir belgede her bilgi ayrı bir alan olarak durur ve alanlar
            birbirinden bağımsız gösterilebilir. Doğrulayan taraf bir istek
            gönderir: "Bana yalnız 18 yaş bilgisini göster." Cüzdan bu isteği
            kişiye gösterir; kişi onaylarsa yalnız o alan gider. Belge yine de
            kurumun imzasını taşıdığı için doğrulayan, gelen tek alanın gerçek
            olduğundan emin olur.
          </p>
          <p>
            Tamga Network bu ilkeyi ağın kurallarına da yazar. Ağa katılan her
            doğrulayıcı, kayıt olurken hangi amaçla hangi bilgileri isteyeceğini
            bildirir. Cüzdan, bir istek bu kaydın dışına taşarsa kişiyi uyarır:
            "Bu kurum, kayıtlı amacının dışında bilgi istiyor." Karar yine
            kişinindir; ama artık bilerek karar verir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Almatı'daki bir şirkete iş başvurusu yapan Taşkentli bir mühendis
              düşünün. Bugün diploma fotokopisi, kimlik fotokopisi ve bazen
              pasaport fotokopisi gönderir; bu kopyalar yıllarca şirketin
              dosyalarında kalır. Dijital belgeyle yalnız "mezuniyet, bölüm ve
              derece" bilgisi gider; kimlik numarası hiç gitmez.
            </p>
          </Callout>

          <h2>Sonraki adım</h2>
          <p>
            "Yalnız bir alanı göstermek" kulağa basit geliyor. Ama imzalı bir
            belgenin bir kısmını gizleyip imzayı nasıl geçerli tutarız? Bir
            sonraki sayfa bunun tekniğini, yani seçici paylaşımı anlatıyor.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            You are walking into a concert. The person at the door has one
            question: "Is this person over 18?" Yet today, to answer it, you
            hand over your ID card. They see your name, date of birth, place of
            birth, document number, even your parents' names. The answer was a
            single "yes"; you gave away seven pieces of information.
          </p>
          <p>
            This page explains why that matters and how digital credentials fix
            the imbalance. The idea is called{" "}
            <Term
              tip="The principle of collecting only the personal data a task actually needs."
              en="data minimisation"
            >
              data minimisation
            </Term>
            .
          </p>

          <h2>Every transaction asks one question</h2>
          <p>
            Most moments when we show an ID are really looking for one answer. A
            hotel desk asks "Are you the person who booked?" A museum with a
            student discount asks "Are you a student?" An employer asks "Is this
            degree real, and is it yours?" A border post asks much more, and it
            has the right to.
          </p>
          <p>
            The core of data minimisation is simple: the smaller the question,
            the smaller the answer should be. The concert door does not need
            your date of birth; it only needs to know that "over 18" is true.
          </p>
          <Figure caption="Left, what happens today: every field on the ID card is visible. Right, what should happen: only the answer to the question.">
            <MinimisationCompare
              left="With an ID card"
              right="With a digital credential"
              rows={ROWS.en}
            />
          </Figure>

          <h2>Why is extra data harmful?</h2>
          <p>
            Data you hand over does not disappear. It is photocopied, filed,
            typed into a computer or written into a register. Every stored piece
            of data carries three risks:
          </p>
          <ul>
            <li>
              <strong>Leaks:</strong> databases get breached. Nobody can leak
              what they never held.
            </li>
            <li>
              <strong>Reuse:</strong> data collected for one purpose drifts into
              marketing, profiling or sharing with others.
            </li>
            <li>
              <strong>Identity theft:</strong> a document number, a date of
              birth and a mother's name together make it easier to act in
              someone else's name.
            </li>
          </ul>
          <p>
            That is why laws such as{" "}
            <Term
              tip="Türkiye's Law No. 6698 on the Protection of Personal Data."
              en="KVKK"
            >
              KVKK
            </Term>{" "}
            in Türkiye and the{" "}
            <Term
              tip="The EU General Data Protection Regulation, (EU) 2016/679."
              en="GDPR"
            >
              GDPR
            </Term>{" "}
            in Europe require personal data to be processed for a stated purpose
            and in proportion. But the law alone is not enough: you cannot
            "cover up" one field of a plastic ID card. The rule exists; the tool
            does not.
          </p>

          <h2>How digital credentials make it easy</h2>
          <p>
            In a digital credential every piece of information is a separate
            field, and fields can be shown independently. The verifier sends a
            request: "Show me only the age information." The wallet shows the
            request to the person; if they agree, only that field leaves the
            phone. Because the credential still carries the issuer's signature,
            the verifier knows the single field it received is genuine.
          </p>
          <p>
            Tamga Network also writes this principle into its rules. Every
            verifier that joins the network declares, when it registers, which
            data it will ask for and why. If a request goes beyond that
            registration, the wallet warns the person: "This organisation is
            asking for more than its registered purpose." The decision is still
            the person's, but now it is an informed one.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Picture an engineer from Tashkent applying to a company in Almaty.
              Today they send a copy of their degree, a copy of their ID,
              sometimes a copy of their passport, and those copies sit in the
              company's files for years. With a digital credential only
              "graduated, field of study, degree" is shared; the ID number never
              travels.
            </p>
          </Callout>

          <h2>Next</h2>
          <p>
            "Show only one field" sounds simple. But how do you hide part of a
            signed document and keep the signature valid? The next page explains
            the technique: selective disclosure.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Konserte girýärsiňiz. Gapydaky işgäriň diňe bir soragy bar: "Bu adam
            18 ýaşdan ulumy?" Emma häzir bu soraga jogap bermek üçin şahsyýet
            kartyňyzy berýärsiňiz. Işgär adyňyzy, doglan seneňizi, doglan
            ýeriňizi, resminama belgiňizi, hatda ene-ataňyzyň adyny görýär.
            Jogap ýeke-täk "hawa" bolmalydy, siz bolsa ýedi maglumat berdiňiz.
          </p>
          <p>
            Bu sahypa munuň näme üçin möhümdigini we sanly resminamalaryň bu
            deňsizligi nädip düzedýändigini düşündirýär. Bu düşünjäniň ady{" "}
            <Term
              tip="Bir iş üçin diňe zerur şahsy maglumatyň ýygnalmagy ýörelgesi."
              en="data minimisation"
            >
              maglumaty azaltmak
            </Term>
            .
          </p>
          <h2>Her işiň bir soragy bar</h2>
          <p>
            Myhmanhana "Bron eden siz mi?", muzeý "Talyp mysyňyz?", iş beriji
            "Bu diplom hakykymy we size degişlimi?" diýip soraýar. Sorag näçe
            kiçi bolsa, berilýän maglumat hem şonça kiçi bolmaly. Konsert
            gapysyna doglan seneňiz däl, diňe "18 ýaşdan uly" diýen netije
            gerek.
          </p>
          <Figure caption="Çepde häzirki ýagdaý: kartyň ähli meýdanlary görünýär. Sagda bolmaly ýagdaý: diňe soragyň jogaby.">
            <MinimisationCompare
              left="Şahsyýet karty bilen"
              right="Sanly resminama bilen"
              rows={ROWS.tk}
            />
          </Figure>
          <h2>Artykmaç maglumat näme üçin zyýanly?</h2>
          <p>
            Berlen maglumat ýitmeýär: nusgasy alynýar, faýla ýa-da kompýutere
            geçýär. Saklanýan her maglumat syzmak, başga maksat üçin ulanylmak
            we başgasynyň adyndan iş etmek howpuny döredýär. Şonuň üçin KVKK we
            GDPR ýaly kanunlar maglumatyň maksada laýyk we çäkli işlenmegini
            talap edýär. Emma plastik kartyň bir meýdanyny "ýapmak" mümkin däl.
          </p>
          <h2>Sanly resminama muny aňsatlaşdyrýar</h2>
          <p>
            Sanly resminamada her maglumat aýratyn meýdan bolup, aýratyn
            görkezilip bilner. Barlaýjy diňe gerek meýdany soraýar; adam razy
            bolsa diňe şol gidýär, gol bolsa onuň hakykydygyny subut edýär.
            Tamga Network-da her barlaýjy haýsy maglumatlary näme üçin
            soraýandygyny hasaba alyşda görkezýär; artykmaç talap bolsa gapjyk
            adamy duýduryp, kararyny özüne goýýar.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Almatydaky kompaniýa işe ýüz tutýan daşkentli inžener häzir
              diplomyň, şahsyýetnamanyň nusgalaryny iberýär. Sanly resminama
              bilen diňe "uçurym, hünär, dereje" gidýär; şahsyýet belgisi asla
              gitmeýär.
            </p>
          </Callout>
          <p>
            Indiki sahypada gol çekilen resminamanyň bir bölegini gizläp, goly
            nädip dogry saklaýandygymyzy göreris.
          </p>
        </>
      ),
    },
  },

  /* ============================================================ 3.2 Seçici paylaşım */
  {
    slug: "selective-disclosure",
    chapter: 3,
    order: 2,
    minutes: 6,
    diagram: "disclosure",
    title: {
      tr: "Seçici paylaşım",
      en: "Selective disclosure",
      tk: "Saýlap paýlaşmak",
    },
    summary: {
      tr: "Belgenin her alanı ayrı mühürlenir; kişi yalnız istenen alanı açar, gerisi kapalı kalır.",
      en: "Each field of a credential is sealed separately; the person opens only the field asked for, the rest stays closed.",
      tk: "Resminamanyň her meýdany aýratyn möhürlenýär; adam diňe soralan meýdany açýar, galany ýapyk galýar.",
    },
    keyPoints: [
      {
        tr: "Kurum her alanı ayrı bir mühürle (salted hash) kapatır ve yalnız mühürlerin listesini imzalar.",
        en: "The issuer seals each field separately (a salted hash) and signs only the list of seals.",
        tk: "Edara her meýdany aýratyn möhür (salted hash) bilen ýapýar we diňe möhürleriň sanawyna gol çekýär.",
      },
      {
        tr: "Kişi yalnız istenen alanların anahtarını gönderir; doğrulayan onları imzalı mühürlerle karşılaştırır.",
        en: "The person sends only the requested fields; the verifier checks them against the signed seals.",
        tk: "Adam diňe soralan meýdanlary iberýär; barlaýjy olary gol çekilen möhürler bilen deňeşdirýär.",
      },
      {
        tr: "Gösterilmeyen alanlar tahmin edilemez; gösterim kişinin cihaz anahtarıyla imzalandığı için kopyalanamaz.",
        en: "Hidden fields cannot be guessed, and because each presentation is signed with the person's device key it cannot be replayed.",
        tk: "Görkezilmedik meýdanlar çaklanyp bilinmeýär; görkeziş adamyň enjam açary bilen gol çekilýänligi üçin gaýtalanyp bilinmeýär.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "SD-JWT VC profili",
          en: "SD-JWT VC profile",
          tk: "SD-JWT VC profili",
        },
        href: "/specifications/sd-jwt-vc",
        kind: "docs",
      },
      {
        label: {
          tr: "Kavram: Belge biçimleri",
          en: "Concept: Credential formats",
          tk: "Düşünje: Resminama görnüşleri",
        },
        href: "/concepts/credential-formats",
        kind: "docs",
      },
      {
        label: {
          tr: "Karar: SD-JWT VC biçimi",
          en: "Decision: the SD-JWT VC format",
          tk: "Karar: SD-JWT VC",
        },
        href: "/adr/0006-credential-format-sd-jwt-vc",
        kind: "docs",
      },
      {
        label: {
          tr: "Ek D: Tanımlar",
          en: "Annex D: Definitions",
          tk: "D goşundy: Kesgitlemeler",
        },
        href: "definitions",
        kind: "arf",
      },
    ],
    body: {
      tr: (
        <>
          <p>
            Önceki sayfada bir sonuca vardık: kişi yalnız gereken bilgiyi
            göstermeli. Burada bir sorun var. Dijital belgenin değeri, kurumun
            imzasından gelir. İmza da belgenin tamamını korur; tek bir harfi
            değiştirseniz imza bozulur. Peki belgenin bir kısmını gizleyip
            imzayı nasıl geçerli tutarız?
          </p>
          <p>
            Cevabın adı{" "}
            <Term
              tip="Belgenin alanlarından yalnız istenenleri gösterip gerisini gizli tutabilme."
              en="selective disclosure"
            >
              selective disclosure
            </Term>
            , Türkçesiyle seçici paylaşım. Fikri bir benzetmeyle anlatalım,
            sonra gerçekte nasıl çalıştığına bakalım.
          </p>

          <h2>Benzetme: zarflar ve mühürlü liste</h2>
          <p>
            Bir üniversitenin size bir diploma verdiğini düşünün; ama kâğıt
            değil, bir dizi küçük zarf. Her zarfın içinde bir bilgi var: adınız,
            bölümünüz, mezuniyet yılınız, not ortalamanız. Üniversite her zarfın
            üzerine o zarfa özgü bir mühür basar ve bu mühürlerin listesini tek
            bir belgeye yazıp imzalar.
          </p>
          <p>
            Bir işveren yalnız bölümünüzü ve mezuniyet yılınızı sorduğunda ona
            imzalı listeyi ve yalnız iki zarfı verirsiniz. İşveren zarfları
            açar, içlerindekinin mühürle eşleştiğini kontrol eder ve listenin
            üniversite tarafından imzalandığını görür. Not ortalamanızın zarfı
            sizde kalır; işveren listede bir mühür görür ama içinde ne olduğunu
            bilemez.
          </p>

          <h2>Gerçekte nasıl çalışır?</h2>
          <p>
            Zarfların teknik karşılığı küçük bir veri paketi, mühürlerin
            karşılığı ise bir parmak izidir:
          </p>
          <ol>
            <li>
              Kurum her alan için rastgele bir değer üretir. Buna <em>salt</em>{" "}
              denir. Alan, salt ile birlikte bir{" "}
              <Term
                tip="Veriden üretilen kısa parmak izi; veri değişirse parmak izi de değişir, parmak izinden veri geri bulunamaz."
                en="hash"
              >
                özete
              </Term>{" "}
              dönüştürülür. Bu yapıya{" "}
              <Term
                tip="Rastgele bir değerle karıştırılarak üretilmiş özet; aynı veri her seferinde başka bir özet verir."
                en="salted hash"
              >
                salted hash
              </Term>{" "}
              denir.
            </li>
            <li>
              Kurum belgeye alanların kendisini değil, yalnız bu özetleri koyar
              ve özetlerin listesini imzalar.
            </li>
            <li>
              Alanların açık hâlleri (salt, alan adı, değer) ayrı küçük paketler
              olarak belgeyle birlikte cüzdana gelir.
            </li>
            <li>
              Gösterim sırasında cüzdan yalnız istenen paketleri gönderir.
              Doğrulayan her paketin özetini kendisi hesaplar ve imzalı
              listedekiyle karşılaştırır.
            </li>
          </ol>
          <p>
            Salt neden gerekli? Doğum tarihi gibi alanların olası değerleri
            sınırlıdır. Salt olmasaydı biri bütün tarihlerin özetini tek tek
            hesaplayıp listedeki özetle eşleşeni bulabilirdi. Rastgele salt bunu
            imkânsız kılar: gizli kalan alanın özeti, onu görmeyen biri için
            anlamsız bir sayıdır.
          </p>

          <h2>Kopyalanıp başkası tarafından kullanılabilir mi?</h2>
          <p>
            Hayır. Belge, verildiği anda kişinin telefonundaki bir{" "}
            <Term
              tip="Telefonun içinde üretilen ve dışarı çıkmayan özel anahtar; belgeyi o cihaza bağlar."
              en="device key"
            >
              cihaz anahtarına
            </Term>{" "}
            bağlanır. Her gösterimde cüzdan, doğrulayanın o an gönderdiği tek
            kullanımlık bir sayıyla ({" "}
            <Term
              tip="Tek kullanımlık rastgele sayı; eski bir cevabın tekrar kullanılmasını engeller."
              en="nonce"
            >
              nonce
            </Term>
            ) birlikte bu anahtarla bir imza atar. Böylece doğrulayan iki şeyden
            emin olur: belge gerçek ve onu gösteren kişi belgenin sahibi.
            Yakalanan eski bir gösterim başka bir yerde işe yaramaz.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Tamga, internet için{" "}
              <Term
                tip="Seçici paylaşımı destekleyen, Avrupa'nın kullandığı belge biçimi."
                en="SD-JWT VC"
              >
                SD-JWT VC
              </Term>{" "}
              biçimini, yüz yüze kullanım için ISO mdoc biçimini kullanır.
              İkisinde de fikir aynıdır: alan alan özet, imzalı liste, yalnız
              istenen alanların açılması.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tr">
            <p>
              Bişkek'te bir otel, yalnız rezervasyon adının pasaporttakiyle aynı
              olduğunu bilmek ister. Seçici paylaşımla ad soyad gider; pasaport
              numarası, doğum tarihi ve uyruk telefonda kalır. Otel, gelen adın
              bir devlet belgesinden geldiğini yine de kanıtlanmış olarak görür.
            </p>
          </Callout>

          <h2>Sınırı nerede?</h2>
          <p>
            Seçici paylaşım, gizlenen alanların içeriğini korur. Ama
            gösterdiğiniz alan yine de bir değerdir: "18 yaşından büyük" yerine
            doğum tarihini istemek mümkündür. Ayrıca aynı belge kopyası iki
            farklı yerde gösterilirse, iki gösterim aynı imzayı ve aynı özetleri
            taşır. Bir sonraki iki sayfa bu iki sınırı ele alıyor: sıfır bilgi
            ispatı ve ilişkilendirilemezlik.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            The previous page reached a conclusion: a person should show only
            what is needed. That creates a puzzle. A digital credential is
            valuable because of the issuer's signature, and a signature protects
            the whole document; change one letter and it breaks. So how do you
            hide part of a signed credential and keep the signature valid?
          </p>
          <p>
            The answer is called{" "}
            <Term
              tip="Showing only the requested fields of a credential and keeping the rest hidden."
              en="selective disclosure"
            >
              selective disclosure
            </Term>
            . Let us start with an analogy and then look at how it really works.
          </p>

          <h2>An analogy: envelopes and a sealed list</h2>
          <p>
            Imagine a university gives you a degree, not as one sheet of paper
            but as a set of small envelopes. Each envelope holds one fact: your
            name, your field of study, your year of graduation, your grade
            average. The university stamps each envelope with a seal unique to
            it, writes the list of seals on a single page and signs that page.
          </p>
          <p>
            When an employer asks only for your field and year, you hand over
            the signed list and just those two envelopes. The employer opens
            them, checks that what is inside matches the seals, and sees that
            the list was signed by the university. The envelope with your grade
            average stays with you; the employer sees a seal on the list but
            cannot tell what is inside.
          </p>

          <h2>How it actually works</h2>
          <p>
            The envelopes are small data packets; the seals are fingerprints:
          </p>
          <ol>
            <li>
              For each field the issuer generates a random value called a{" "}
              <em>salt</em>. The field and its salt are turned into a{" "}
              <Term
                tip="A short fingerprint of data: change the data and the fingerprint changes; you cannot get the data back from it."
                en="hash"
              >
                hash
              </Term>
              . The result is a{" "}
              <Term
                tip="A hash mixed with a random value, so the same data gives a different hash every time."
                en="salted hash"
              >
                salted hash
              </Term>
              .
            </li>
            <li>
              The issuer puts only these hashes into the credential, not the
              fields themselves, and signs the list of hashes.
            </li>
            <li>
              The readable versions of the fields (salt, field name, value) come
              to the wallet as separate small packets.
            </li>
            <li>
              When presenting, the wallet sends only the requested packets. The
              verifier computes each packet's hash itself and compares it with
              the signed list.
            </li>
          </ol>
          <p>
            Why the salt? Fields like a date of birth have a limited set of
            possible values. Without a salt, someone could hash every possible
            date and find the one that matches. A random salt makes that
            impossible: to anyone who has not seen the field, its hash is a
            meaningless number.
          </p>

          <h2>Can someone copy it and use it?</h2>
          <p>
            No. When the credential is issued it is bound to a{" "}
            <Term
              tip="A private key created inside the phone that never leaves it; it ties the credential to that device."
              en="device key"
            >
              device key
            </Term>{" "}
            on the person's phone. At every presentation the wallet signs, with
            that key, a one-time number sent by the verifier (a{" "}
            <Term
              tip="A random number used once; it stops an old answer from being replayed."
              en="nonce"
            >
              nonce
            </Term>
            ). The verifier is then sure of two things: the credential is
            genuine, and the person presenting it is its holder. A captured old
            presentation is useless anywhere else.
          </p>
          <Callout kind="info" locale="en">
            <p>
              Tamga uses{" "}
              <Term
                tip="The credential format with selective disclosure that Europe uses."
                en="SD-JWT VC"
              >
                SD-JWT VC
              </Term>{" "}
              for the internet and ISO mdoc for in-person use. The idea is the
              same in both: a hash per field, a signed list, and only the
              requested fields opened.
            </p>
          </Callout>
          <Callout kind="turkic" locale="en">
            <p>
              A hotel in Bishkek only needs to know that the booking name
              matches the passport. With selective disclosure the full name is
              shared; the passport number, date of birth and nationality stay on
              the phone. The hotel still sees, with proof, that the name comes
              from a state document.
            </p>
          </Callout>

          <h2>Where it stops</h2>
          <p>
            Selective disclosure protects the content of hidden fields. But a
            field you show is still a value: a verifier could ask for the date
            of birth instead of "over 18". And if the same copy of a credential
            is shown in two places, both presentations carry the same signature
            and hashes. The next two pages deal with those limits:
            zero-knowledge proofs and unlinkability.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Sanly resminamanyň gymmaty edaranyň golundan gelýär; gol bolsa
            resminamany doly goraýar. Onda resminamanyň bir bölegini gizläp,
            goly nädip dogry saklamaly? Jogap:{" "}
            <Term
              tip="Resminamanyň diňe soralan meýdanlaryny görkezip, galanyny gizlin saklamak."
              en="selective disclosure"
            >
              selective disclosure
            </Term>
            , ýagny saýlap paýlaşmak.
          </p>
          <h2>Meňzetme: hatlar we möhürli sanaw</h2>
          <p>
            Uniwersitet size diplomy kiçi hatlaryň toplumy görnüşinde berýär
            diýip göz öňüne getiriň: her hatda bir maglumat bar. Her hatyň
            üstünde aýratyn möhür, möhürleriň sanawyna bolsa uniwersitet gol
            çekýär. Iş beriji diňe hünäriňizi soranda, oňa sanawy we diňe şol
            haty berýärsiňiz; galan hatlar sizde galýar.
          </p>
          <h2>Hakykatda nähili işleýär?</h2>
          <ol>
            <li>
              Edara her meýdan üçin tötänleýin <em>salt</em> döredýär we meýdany
              onuň bilen{" "}
              <Term
                tip="Maglumatdan alnan gysga barmak yzy; maglumat üýtgese yz hem üýtgeýär."
                en="salted hash"
              >
                salted hash
              </Term>{" "}
              görnüşine geçirýär.
            </li>
            <li>
              Resminama diňe bu barmak yzlaryny saklaýar; edara olaryň sanawyna
              gol çekýär.
            </li>
            <li>
              Görkezişde gapjyk diňe soralan meýdanlary iberýär; barlaýjy olaryň
              yzyny hasaplap, gol çekilen sanaw bilen deňeşdirýär.
            </li>
          </ol>
          <p>
            Salt bolmasa, doglan sene ýaly meýdanlaryň ähli mümkin bahalaryny
            synap tapmak bolardy; salt muny mümkin däl edýär. Resminama
            telefondaky enjam açaryna baglanýar we her görkeziş barlaýjynyň
            iberen bir gezeklik sanyna (nonce) gol çekilýär, şonuň üçin köne
            görkeziş başga ýerde ulanylyp bilinmeýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Bişkekdäki myhmanhana diňe bron adynyň pasportdaky bilen gabat
              gelýändigini bilmek isleýär: diňe at gidýär, pasport belgisi we
              doglan sene telefonda galýar.
            </p>
          </Callout>
          <p>
            Indiki sahypalarda bu usulyň çäklerini göreris: nol bilimli
            subutnama we baglanyşdyrylmazlyk.
          </p>
        </>
      ),
    },
  },

  /* ============================================================ 3.3 Sıfır bilgi ispatı */
  {
    slug: "zero-knowledge-proofs",
    chapter: 3,
    order: 3,
    minutes: 6,
    diagram: "zk",
    title: {
      tr: "Sıfır bilgi ispatı",
      en: "Zero-knowledge proofs",
      tk: "Nol bilimli subutnama",
    },
    summary: {
      tr: "Doğum tarihini göstermeden 18 yaşından büyük olduğunu kanıtlamak: matematik bunu nasıl yapar?",
      en: "Proving you are over 18 without showing your date of birth: how mathematics makes it possible.",
      tk: "Doglan senäňi görkezmän 18 ýaşdan uludygyňy subut etmek: matematika muny nädip edýär?",
    },
    keyPoints: [
      {
        tr: "Sıfır bilgi ispatı, bir cümlenin doğru olduğunu, cümleyi doğru yapan bilgiyi göstermeden kanıtlar.",
        en: "A zero-knowledge proof shows a statement is true without revealing the data that makes it true.",
        tk: "Nol bilimli subutnama bir tassyklamanyň dogrudygyny, ony dogry edýän maglumaty görkezmän subut edýär.",
      },
      {
        tr: "Tamga'da kurumlar hiçbir şey değiştirmez; ispatı cüzdan, kurumun bugünkü imzalı belgesinden üretir.",
        en: "In Tamga issuers change nothing; the wallet builds the proof from today's signed credential.",
        tk: "Tamga-da edaralar hiç zady üýtgetmeýär; subutnamany gapjyk häzirki gol çekilen resminamadan döredýär.",
      },
      {
        tr: "Doğrulayan yalnız sonucu ve belgeyi veren kurumu görür; iki gösterim birbirine bağlanamaz.",
        en: "The verifier sees only the result and the issuer; two presentations cannot be linked.",
        tk: "Barlaýjy diňe netijäni we resminamany beren edarany görýär; iki görkeziş birleşdirilip bilinmeýär.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Karar: Sıfır bilgi ispatı (ZK)",
          en: "Decision: Zero-knowledge proofs (ZK)",
          tk: "Karar: ZK",
        },
        href: "/adr/0032-zk-mdoc-presentation",
        kind: "docs",
      },
      {
        label: {
          tr: "Kavram: Gizlilik",
          en: "Concept: Privacy",
          tk: "Düşünje: Gizlinlik",
        },
        href: "/concepts/privacy",
        kind: "docs",
      },
      {
        label: {
          tr: "Identity Rulebook",
          en: "Identity Rulebook",
          tk: "Identity Rulebook",
        },
        href: "rulebooks/identity",
        kind: "arf",
      },
    ],
    body: {
      tr: (
        <>
          <p>
            Seçici paylaşımla doğum tarihinizi gösterip adınızı
            gizleyebilirsiniz. Ama ya doğum tarihinizi de göstermek
            istemiyorsanız? Konser kapısının sorusu "Doğum tarihiniz ne?" değil,
            "18 yaşından büyük müsünüz?" idi. Bu sayfa, yalnız bu sorunun
            cevabını kanıtlamanın yolunu anlatıyor.
          </p>

          <h2>Bir şeyi göstermeden kanıtlamak</h2>
          <p>
            Bilinen bir örnek: renk körü bir arkadaşınıza, elinizdeki iki topun
            farklı renkte olduğunu kanıtlamak istiyorsunuz. O topları arkasına
            alıp karıştırıyor ya da karıştırmıyor, sonra size gösteriyor. Siz
            her seferinde "karıştırdın" ya da "karıştırmadın" diye doğru cevap
            veriyorsunuz. Yirmi turdan sonra arkadaşınız topların farklı renkte
            olduğuna ikna olur; ama hâlâ hangi topun hangi renk olduğunu bilmez.
          </p>
          <p>
            Bu,{" "}
            <Term
              tip="Bir cümlenin doğru olduğunu, onu doğru yapan bilgiyi göstermeden kanıtlayan matematiksel yöntem."
              en="zero-knowledge proof"
            >
              sıfır bilgi ispatının
            </Term>{" "}
            ruhudur: karşı taraf cümlenin doğru olduğuna ikna olur, ama cümleyi
            doğru yapan bilgiden hiçbir şey öğrenmez. Bugünkü sistemler bunu
            turlarla değil, tek seferde hesaplanan ve tek seferde doğrulanan bir
            matematiksel ispatla yapar.
          </p>

          <h2>Tamga'da yaş ispatı nasıl çalışır?</h2>
          <ol>
            <li>
              Kurum, kimlik belgesini bugünkü gibi verir ve imzalar. Kurum
              tarafında hiçbir şey değişmez; bu önemli, çünkü ağdaki kurumların
              yeni bir sistem kurmasına gerek kalmaz.
            </li>
            <li>
              Bir site ya da kapı "18 yaşından büyük mü?" diye sorduğunda cüzdan
              bir ispat üretir. İspatın söylediği şudur: "Elimde, bu kurumun
              imzaladığı bir belge var ve o belgedeki doğum tarihi 18 yıldan
              eskidir."
            </li>
            <li>
              Doğrulayan ispatı kontrol eder. Gördüğü yalnız iki şeydir:
              cümlenin doğru olduğu ve belgeyi hangi kurumun verdiği. Doğum
              tarihini, belge numarasını, hatta belgenin kendisini görmez.
            </li>
          </ol>
          <p>
            Tamga bunun için{" "}
            <Term
              tip="Google'ın açık kaynak olarak geliştirdiği, bağımsız güvenlik incelemelerinden geçmiş, mdoc belgeleri üzerinde çalışan sıfır bilgi ispatı sistemi."
              en="Longfellow ZK"
            >
              Longfellow ZK
            </Term>{" "}
            adlı açık kaynak sistemi kullanır. Avrupa'nın yaş doğrulama
            çalışmaları da bu sistem üzerine kurulu. Ağda yalnız incelenmiş ve
            kimliği güven listesinde yayımlanmış ispat devreleri geçerlidir;
            böylece kimse kendi yazdığı bir "ispatla" doğrulayanı kandıramaz.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Sıfır bilgi ispatının bir artısı daha var: aynı kişi aynı siteye
              ya da iki farklı siteye ispat gösterdiğinde, ispatlar birbirine
              benzemez. Bir önceki sayfadaki "aynı imza iki yerde görünür"
              sınırı burada ortadan kalkar.
            </p>
          </Callout>

          <h2>Her yerde çalışır mı?</h2>
          <p>
            İspat üretmek telefonda biraz hesap gücü ister; çok eski cihazlar ya
            da henüz bu yöntemi desteklemeyen doğrulayıcılar olabilir. O durumda
            cüzdan bir yedek yönteme geçer: doğum tarihi yerine yalnız "18
            yaşından büyük: evet" alanını içeren, tek kullanımlık belge
            kopyalarından birini gösterir. Bir sonraki sayfa bu kopyaları
            anlatıyor.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Aşkabat'ta bir öğrenci, İstanbul'daki bir çevrim içi oyun
              platformuna yaşını kanıtlamak zorunda. Bugün kimlik fotoğrafı
              yüklemesi istenir ve bu fotoğraf başka bir ülkedeki bir sunucuda
              durur. Sıfır bilgi ispatıyla platform yalnız "18 yaşından büyük"
              sonucunu görür; öğrencinin adı, doğum tarihi ve belgesi hiç
              gitmez.
            </p>
          </Callout>

          <h2>Neden önemli?</h2>
          <p>
            Yaş doğrulaması internette giderek zorunlu hâle geliyor: alkol,
            kumar, belirli içerikler, bazı platformlar. Kimlik kartı fotoğrafı
            yükletmek hem sızıntı riski taşır hem de insanları izlenebilir
            kılar. Sıfır bilgi ispatı, kuralı uygulamanın kişiyi ifşa etmeden de
            mümkün olduğunu gösterir.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            With selective disclosure you can show your date of birth and hide
            your name. But what if you don't want to show your date of birth
            either? The concert door's question was never "What is your date of
            birth?" but "Are you over 18?" This page explains how to prove just
            that.
          </p>

          <h2>Proving without showing</h2>
          <p>
            A classic example: you want to prove to a colour-blind friend that
            the two balls you hold are different colours. They put the balls
            behind their back, swap them or don't, then show you. Every time,
            you say correctly whether they swapped. After twenty rounds your
            friend is convinced the balls differ, yet still has no idea which
            ball is which colour.
          </p>
          <p>
            That is the spirit of a{" "}
            <Term
              tip="A mathematical method that proves a statement true without revealing the data that makes it true."
              en="zero-knowledge proof"
            >
              zero-knowledge proof
            </Term>
            : the other side becomes convinced the statement is true, but learns
            nothing about the data behind it. Modern systems do this not with
            rounds but with a single mathematical proof that is computed once
            and checked once.
          </p>

          <h2>How the age proof works in Tamga</h2>
          <ol>
            <li>
              The issuer issues and signs the identity credential exactly as
              today. Nothing changes on the issuer's side, which matters:
              institutions on the network do not need to set up anything new.
            </li>
            <li>
              When a site or a gate asks "Over 18?", the wallet produces a
              proof. It says: "I hold a credential signed by this institution,
              and the date of birth in it is more than 18 years ago."
            </li>
            <li>
              The verifier checks the proof. It sees only two things: that the
              statement is true, and which institution issued the credential. It
              does not see the date of birth, the document number or even the
              credential itself.
            </li>
          </ol>
          <p>
            Tamga uses an open-source system called{" "}
            <Term
              tip="An open-source zero-knowledge proof system for mdoc credentials, developed by Google and independently security-reviewed."
              en="Longfellow ZK"
            >
              Longfellow ZK
            </Term>
            , which Europe's age-verification work is also built on. Only
            reviewed proof circuits whose identifiers are published in the trust
            list are accepted, so nobody can fool a verifier with a home-made
            "proof".
          </p>
          <Callout kind="info" locale="en">
            <p>
              There is one more benefit: when the same person shows a proof to
              the same site twice, or to two different sites, the proofs look
              nothing alike. The "same signature seen in two places" limit from
              the previous page disappears.
            </p>
          </Callout>

          <h2>Does it work everywhere?</h2>
          <p>
            Producing a proof takes some computing power on the phone, and some
            older devices or verifiers may not support it yet. Then the wallet
            falls back: instead of the date of birth it shows one of several
            single-use copies of the credential that contain only "over 18:
            yes". The next page explains those copies.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              A student in Ashgabat must prove their age to an online gaming
              platform based in Istanbul. Today they are asked to upload a photo
              of their ID, which then sits on a server in another country. With
              a zero-knowledge proof the platform sees only "over 18"; the
              student's name, date of birth and document never travel.
            </p>
          </Callout>

          <h2>Why it matters</h2>
          <p>
            Age checks are becoming mandatory online: alcohol, gambling, certain
            content, some platforms. Uploading ID photos creates leak risks and
            makes people trackable. Zero-knowledge proofs show that the rule can
            be enforced without exposing the person.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Saýlap paýlaşmak bilen doglan seneňizi görkezip, adyňyzy gizläp
            bilersiňiz. Emma konsert gapysynyň soragy "18 ýaşdan ulumy?" diýen
            sorag. Bu sahypa diňe şu jogaby subut etmegiň ýoluny düşündirýär.
          </p>
          <h2>Görkezmän subut etmek</h2>
          <p>
            <Term
              tip="Bir tassyklamanyň dogrudygyny, ony dogry edýän maglumaty görkezmän subut edýän matematiki usul."
              en="zero-knowledge proof"
            >
              Nol bilimli subutnama
            </Term>{" "}
            garşy tarapy tassyklamanyň dogrudygyna ynandyrýar, emma onuň
            aňyrsyndaky maglumat barada hiç zat öwretmeýär.
          </p>
          <h2>Tamga-da ýaş subutnamasy</h2>
          <ol>
            <li>
              Edara şahsyýet resminamasyny häzirki ýaly berýär; edaranyň
              tarapynda hiç zat üýtgemeýär.
            </li>
            <li>
              Saýt "18 ýaşdan ulumy?" diýip soranda, gapjyk subutnama döredýär:
              "Bu edaranyň gol çeken resminamasy bende bar we ondaky doglan sene
              18 ýyldan köne."
            </li>
            <li>
              Barlaýjy diňe netijäni we edarany görýär; doglan senäni we
              resminamanyň özüni görmeýär.
            </li>
          </ol>
          <p>
            Tamga açyk çeşmeli{" "}
            <Term
              tip="mdoc resminamalary üçin açyk çeşmeli nol bilimli subutnama ulgamy."
              en="Longfellow ZK"
            >
              Longfellow ZK
            </Term>{" "}
            ulgamyny ulanýar; diňe barlanan we ynam sanawynda çap edilen
            zynjyrlar kabul edilýär. Iki görkeziş biri-birine meňzemeýär. Köne
            enjamlarda gapjyk diňe "18 ýaşdan uly: hawa" meýdanly bir gezeklik
            nusga görkezýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Aşgabatly talyp Stambuldaky onlaýn platforma ýaşyny subut etmeli:
              platforma diňe "18 ýaşdan uly" netijesini görýär, talybyň ady we
              resminamasy gitmeýär.
            </p>
          </Callout>
        </>
      ),
    },
  },

  /* ============================================================ 3.4 İlişkilendirilemezlik */
  {
    slug: "unlinkability",
    chapter: 3,
    order: 4,
    minutes: 5,
    diagram: "pseudonym",
    title: {
      tr: "İlişkilendirilemezlik",
      en: "Unlinkability",
      tk: "Baglanyşdyrylmazlyk",
    },
    summary: {
      tr: "Tek kullanımlık kopyalar ve site başına takma ad: farklı yerlerdeki izlerin birleştirilememesi.",
      en: "Single-use copies and a pseudonym per site: traces in different places cannot be joined up.",
      tk: "Bir gezeklik nusgalar we her saýt üçin lakam: dürli ýerlerdäki yzlar birleşdirilip bilinmeýär.",
    },
    keyPoints: [
      {
        tr: "Aynı belge kopyası iki yerde gösterilirse iki gösterim aynı imzayı taşır ve birbirine bağlanabilir.",
        en: "If the same copy is shown in two places, both carry the same signature and can be linked.",
        tk: "Şol bir nusga iki ýerde görkezilse, ikisi hem şol bir goly göterýär we birleşdirilip bilner.",
      },
      {
        tr: "Cüzdan bir belgenin birkaç kopyasını taşır; her doğrulayıcıya hep aynı, başkalarına farklı kopya gider.",
        en: "The wallet holds several copies of a credential; each verifier always gets the same one, others get different ones.",
        tk: "Gapjyk resminamanyň birnäçe nusgasyny saklaýar; her barlaýja hemişe şol bir, beýlekilere başga nusga gidýär.",
      },
      {
        tr: "Tamga ile giriş yaparken her site kişiyi kendine özgü bir takma adla tanır; iki site kişiyi eşleştiremez.",
        en: "With Sign in with Tamga every site knows the person by its own pseudonym; two sites cannot match them.",
        tk: "Tamga bilen girişde her saýt adamy öz lakamy bilen tanaýar; iki saýt adamy deňeşdirip bilmeýär.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Karar: Site başına takma ad",
          en: "Decision: Per-site pseudonyms",
          tk: "Karar: Her saýt üçin lakam",
        },
        href: "/adr/0031-per-site-pseudonyms",
        kind: "docs",
      },
      {
        label: {
          tr: "Cüzdan kuralları (yapışkan kopya)",
          en: "Wallet rules (sticky copy)",
          tk: "Gapjyk düzgünleri",
        },
        href: "/specifications/wallet",
        kind: "docs",
      },
      {
        label: {
          tr: "Karar: Otomatik kopya yenileme",
          en: "Decision: Automatic copy refresh",
          tk: "Karar: Nusgalary awtomatik täzelemek",
        },
        href: "/adr/0023-automatic-copy-refresh",
        kind: "docs",
      },
      {
        label: {
          tr: "Rehber: Tamga ile giriş yap",
          en: "Guide: Sign in with Tamga",
          tk: "Gollanma: Tamga bilen giriş",
        },
        href: "/guides/sign-in-with-tamga",
        kind: "docs",
      },
    ],
    body: {
      tr: (
        <>
          <p>
            Diyelim ki seçici paylaşım ve sıfır bilgi ispatı sayesinde her yerde
            yalnız gereken bilgiyi gösteriyorsunuz. Yine de bir risk kalır:
            farklı yerlerde bıraktığınız izler birleştirilebilir mi? Bir site,
            bir otel ve bir sağlık uygulaması ellerindeki kayıtları
            karşılaştırıp "bu üç kayıt aynı kişiye ait" diyebilir mi?
          </p>
          <p>
            Bunun engellenmesine{" "}
            <Term
              tip="Bir kişinin farklı yerlerdeki gösterimlerinin birbirine bağlanamaması."
              en="unlinkability"
            >
              ilişkilendirilemezlik
            </Term>{" "}
            denir. Tamga bunu iki araçla sağlar: tek kullanımlık belge kopyaları
            ve site başına takma ad.
          </p>

          <h2>Sorun: aynı imza, aynı iz</h2>
          <p>
            İmzalı bir belge, her gösterildiği yerde aynı imzayı ve aynı
            özetleri taşır. Bu imza bir parmak izi gibi davranır. Siz yalnız "18
            yaşından büyük" bilgisini gösterseniz bile, iki farklı doğrulayan
            aynı imzayı gördüğünde ikisinin aynı belgeyi, yani aynı kişiyi
            gördüğünü anlayabilir.
          </p>

          <h2>Çözüm 1: birden çok kopya</h2>
          <p>
            Belgeyi veren kurum, aynı belgenin birkaç kopyasını verir; her kopya
            ayrı imzalanır ve özetleri farklıdır. Cüzdan bu kopyaları akıllıca
            kullanır:
          </p>
          <ul>
            <li>
              Bir doğrulayana <strong>her zaman aynı kopya</strong> gider.
              Doğrulayan sizi zaten tanıyorsa yeni bir şey öğrenmez; ama kopya
              sayısı da boş yere tükenmez.
            </li>
            <li>
              <strong>Farklı doğrulayanlara farklı kopyalar</strong> gider. İki
              doğrulayan ellerindeki imzaları karşılaştırsa da eşleşme bulamaz.
            </li>
            <li>
              Kopyalar azaldığında cüzdan, kurumdan yenilerini{" "}
              <strong>kendiliğinden</strong> ister. Bu istek, kopyanın tükendiği
              anla eşleştirilemesin diye rastgele bir gecikmeyle yapılır.
            </li>
          </ul>

          <h2>Çözüm 2: site başına takma ad</h2>
          <p>
            "Tamga ile giriş yap" ile bir siteye kayıt olduğunuzda site sizi bir
            hesap kimliğiyle tanır. Bu kimlik herkes için aynı olsaydı, iki site
            sizi kolayca eşleştirebilirdi. Bunun yerine cüzdan her site için
            ayrı ama sabit bir{" "}
            <Term
              tip="Bir sitenin sizi tanıdığı, yalnız o siteye özgü kimlik; başka sitelerdeki kimliğinizle bağlanamaz."
              en="pseudonym"
            >
              takma ad
            </Term>{" "}
            üretir:
          </p>
          <ul>
            <li>
              Aynı siteye her girdiğinizde aynı takma ad gider; site sizi tanır,
              hesabınız korunur.
            </li>
            <li>
              Başka bir siteye bambaşka bir takma ad gider; iki site sizi
              birbirine bağlayamaz.
            </li>
            <li>
              Takma adlar kimliğinizden türetilir. Telefonunuzu değiştirip
              kimliğinizi yeniden doğruladığınızda aynı takma adlar geri gelir;
              hesaplarınızı kaybetmezsiniz ve bir sitede iki hesap açılmaz.
            </li>
          </ul>
          <Callout kind="turkic" locale="tr">
            <p>
              Bakü'de yaşayan biri aynı gün bir alışveriş sitesine, bir
              kütüphane sistemine ve bir sağlık randevu platformuna Tamga ile
              giriş yapıyor. Üç sitenin her biri onu kendi takma adıyla tanıyor.
              Üç şirket verilerini birleştirmek istese de ellerinde aynı kişiyi
              gösteren ortak bir anahtar yok.
            </p>
          </Callout>

          <h2>Ne korunur, ne korunmaz?</h2>
          <p>
            İlişkilendirilemezlik, belgenin kendisinin iz bırakmasını engeller.
            Ama siz bir siteye adınızı kendiniz verirseniz site adınızı bilir;
            bunu teknik bir araç engelleyemez. Bu yüzden gizliliğin son halkası
            kişinin kendisidir: ne paylaştığını görmek, onaylamak ya da
            reddetmek. Bölümün son sayfası bunu anlatıyor.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Say that thanks to selective disclosure and zero-knowledge proofs
            you show only what is needed everywhere. A risk remains: can the
            traces you leave in different places be joined up? Could a website,
            a hotel and a health app compare their records and say "these three
            belong to the same person"?
          </p>
          <p>
            Preventing that is called{" "}
            <Term
              tip="The property that a person's presentations in different places cannot be linked to each other."
              en="unlinkability"
            >
              unlinkability
            </Term>
            . Tamga achieves it with two tools: single-use credential copies and
            a pseudonym per site.
          </p>

          <h2>The problem: same signature, same trace</h2>
          <p>
            A signed credential carries the same signature and hashes wherever
            it is shown. That signature behaves like a fingerprint. Even if you
            show only "over 18", two verifiers who see the same signature can
            tell they saw the same credential, and so the same person.
          </p>

          <h2>Solution 1: several copies</h2>
          <p>
            The issuer issues several copies of the same credential, each signed
            separately with different hashes. The wallet uses them carefully:
          </p>
          <ul>
            <li>
              A given verifier <strong>always gets the same copy</strong>. If it
              already knows you it learns nothing new, and copies are not used
              up for nothing.
            </li>
            <li>
              <strong>Different verifiers get different copies</strong>. Even if
              two of them compare signatures, they find no match.
            </li>
            <li>
              When copies run low, the wallet requests new ones from the issuer{" "}
              <strong>automatically</strong>, after a random delay so the
              request cannot be matched to the moment a copy was used.
            </li>
          </ul>

          <h2>Solution 2: a pseudonym per site</h2>
          <p>
            When you register on a site with Sign in with Tamga, the site knows
            you by an account identifier. If that identifier were the same
            everywhere, two sites could easily match you. Instead the wallet
            creates a separate but stable{" "}
            <Term
              tip="An identifier that only one site knows you by; it cannot be linked to your identifier on other sites."
              en="pseudonym"
            >
              pseudonym
            </Term>{" "}
            for each site:
          </p>
          <ul>
            <li>
              Every time you return to the same site, the same pseudonym is
              sent; the site recognises you and your account is safe.
            </li>
            <li>
              Another site gets a completely different pseudonym; the two cannot
              connect you.
            </li>
            <li>
              Pseudonyms are derived from your identity. If you change phones
              and verify your identity again, the same pseudonyms come back: you
              don't lose your accounts, and you can't end up with two accounts
              on one site.
            </li>
          </ul>
          <Callout kind="turkic" locale="en">
            <p>
              Someone in Baku signs in with Tamga to a shopping site, a library
              system and a health appointment platform on the same day. Each of
              the three knows them by its own pseudonym. Even if the three
              companies wanted to merge their data, they share no common key
              pointing to the same person.
            </p>
          </Callout>

          <h2>What is protected, and what is not</h2>
          <p>
            Unlinkability stops the credential itself from leaving a trace. But
            if you type your name into a site yourself, the site knows your
            name; no technical tool can stop that. So the last link in privacy
            is the person: seeing what they share, and agreeing or refusing. The
            final page of this chapter covers that.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Her ýerde diňe gerek maglumaty görkezseňiz hem, dürli ýerlerde
            galdyran yzlaryňyz birleşdirilip bilnermi? Muňa garşy goragyň ady{" "}
            <Term
              tip="Bir adamyň dürli ýerlerdäki görkezişleriniň biri-birine baglanyp bilinmezligi."
              en="unlinkability"
            >
              baglanyşdyrylmazlyk
            </Term>
            . Tamga muny iki gural bilen üpjün edýär.
          </p>
          <h2>1. Birnäçe nusga</h2>
          <p>
            Gol çekilen resminama her ýerde şol bir goly göterýär, ol bolsa
            barmak yzy ýaly işleýär. Şonuň üçin edara resminamanyň birnäçe
            aýratyn gol çekilen nusgasyny berýär. Bir barlaýja hemişe şol bir
            nusga, başga barlaýjylara başga nusgalar gidýär; nusgalar azalanda
            gapjyk tötänleýin gijikme bilen täzelerini özbaşdak soraýar.
          </p>
          <h2>2. Her saýt üçin lakam</h2>
          <p>
            "Tamga bilen giriş" arkaly her saýt sizi diňe özüne degişli, emma
            durnukly{" "}
            <Term
              tip="Diňe bir saýtyň sizi tanaýan belgisi; beýleki saýtlardaky belgiňiz bilen baglanyp bilinmeýär."
              en="pseudonym"
            >
              lakam
            </Term>{" "}
            bilen tanaýar. Iki saýt sizi deňeşdirip bilmeýär. Lakamlar
            şahsyýetiňizden alynýar: telefon çalyşanyňyzda şahsyýetiňizi
            gaýtadan tassyklasaňyz, şol lakamlar yzyna gelýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Bakuwda ýaşaýan adam bir günde söwda saýtyna, kitaphana ulgamyna
              we lukman nobatyna Tamga bilen girýär: üç saýtyň her biri ony öz
              lakamy bilen tanaýar.
            </p>
          </Callout>
          <p>
            Emma adyňyzy saýta özüňiz ýazsaňyz, saýt ony bilýär. Gizlinligiň
            soňky halkasy adamyň özi: näme paýlaşýandygyny görmek we razy bolmak
            ýa-da ret etmek.
          </p>
        </>
      ),
    },
  },

  /* ============================================================ 3.5 Onay ve kontrol */
  {
    slug: "consent-and-control",
    chapter: 3,
    order: 5,
    minutes: 5,
    title: {
      tr: "Onay ve kontrol",
      en: "Consent and control",
      tk: "Razylyk we gözegçilik",
    },
    summary: {
      tr: "Kim ne istedi, ne paylaşıldı: onay ekranı, işlem günlüğü ve silme hakkı (KVKK, GDPR).",
      en: "Who asked for what and what was shared: the consent screen, the transaction log and the right to erasure (GDPR).",
      tk: "Kim näme sorady, näme paýlaşyldy: razylyk ekrany, amallar žurnaly we pozmak hukugy.",
    },
    keyPoints: [
      {
        tr: "Onay ekranı kimin istediğini, neyi istediğini ve neden istediğini gösterir; kayıtlı amacın dışındaki istekler işaretlenir.",
        en: "The consent screen shows who is asking, for what and why; requests beyond the registered purpose are flagged.",
        tk: "Razylyk ekrany kimiň, näme we näme üçin soraýandygyny görkezýär; hasaba alnan maksatdan artyk talaplar bellenýär.",
      },
      {
        tr: "İşlem günlüğü yalnız cüzdanda tutulur; dışarı yalnız kişinin başlattığı, kendi parolasıyla şifreli dosyayla çıkar.",
        en: "The transaction log lives only in the wallet; it leaves only in an encrypted file the person creates with their own password.",
        tk: "Amallar žurnaly diňe gapjykda saklanýar; daşaryk diňe adamyň öz paroly bilen şifrlenen faýl görnüşinde çykýar.",
      },
      {
        tr: "Kişi cüzdanı sıfırlayarak Tamga'daki kaydını siler, kurumlardan silme talebini cüzdandan gönderebilir.",
        en: "The person deletes their records at Tamga by resetting the wallet and can send deletion requests to institutions from it.",
        tk: "Adam gapjygy täzeden düzüp, Tamga-daky ýazgysyny pozýar we edaralara pozmak haýyşyny gapjykdan iberip bilýär.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Mimari: Kişinin denetimi (§2.7)",
          en: "Architecture: the person's control (§2.7)",
          tk: "Arhitektura: adamyň gözegçiligi",
        },
        href: "architecture",
        kind: "arf",
      },
      {
        label: {
          tr: "Karar: İşlem günlüğünü dışa aktarma",
          en: "Decision: Exporting the transaction log",
          tk: "Karar: Žurnaly eksport etmek",
        },
        href: "/adr/0027-user-initiated-log-export",
        kind: "docs",
      },
      {
        label: {
          tr: "Cüzdan kuralları",
          en: "Wallet rules",
          tk: "Gapjyk düzgünleri",
        },
        href: "/specifications/wallet",
        kind: "docs",
      },
      {
        label: {
          tr: "Rehber: Cüzdan kontrol listesi",
          en: "Guide: Wallet checklist",
          tk: "Gollanma: Gapjyk sanawy",
        },
        href: "/guides/wallet-checklist",
        kind: "docs",
      },
    ],
    body: {
      tr: (
        <>
          <p>
            Bu bölümde gördüğümüz bütün teknikler tek bir amaca hizmet ediyor:
            bilgi, kişinin haberi ve isteği olmadan bir yerden bir yere
            gitmesin. Teknik ne kadar iyi olursa olsun, son karar kişinindir. Bu
            sayfa, o kararın verildiği yerleri anlatıyor: onay ekranı, işlem
            günlüğü ve silme hakkı.
          </p>

          <h2>Onay ekranı: üç soru</h2>
          <p>
            Bir doğrulayıcı bilgi istediğinde cüzdan, kişiye hiçbir şey
            göndermeden önce bir ekran gösterir. Bu ekran üç soruya cevap verir:
          </p>
          <ul>
            <li>
              <strong>Kim istiyor?</strong> Doğrulayanın adı, ağın güven
              listesindeki kaydından okunur; site kendine istediği adı veremez.
              Doğrulayan başkası adına çalışıyorsa, yani bir aracıysa, iki ad da
              gösterilir.
            </li>
            <li>
              <strong>Ne istiyor?</strong> Belge ve alanlar tek tek listelenir.
              Kişi bazı alanları kapatabilir ya da tümünü reddedebilir.
            </li>
            <li>
              <strong>Neden istiyor?</strong> Doğrulayanın ağa kayıt olurken
              bildirdiği amaç gösterilir. İstenen bir alan bu amacın dışındaysa
              ekran onu ayrıca işaretler.
            </li>
          </ul>
          <Figure caption="Örnek onay ekranı: doğum tarihi, kayıtlı amacın dışında olduğu için işaretlenmiş.">
            <ConsentMock
              who="İsteyen"
              whoNote="Örnek Konser Salonu · güven listesinde kayıtlı"
              what="İstenen bilgiler"
              fields={[
                { label: "18 yaşından büyük" },
                { label: "Doğum tarihi", flagged: true },
              ]}
              why="Kayıtlı amaç"
              purpose="Etkinliğe giriş için yaş kontrolü"
              extra="Amacın dışında"
              share="Paylaş"
              decline="Reddet"
            />
          </Figure>
          <p>
            Cüzdan kişinin aracıdır, bekçisi değil. Kayıtsız bir doğrulayana ya
            da amacın dışındaki bir isteğe de bilgi vermek mümkündür; ama kişi
            bunu açık bir uyarıyı gördükten sonra, bilerek yapar.
          </p>

          <h2>İşlem günlüğü: kime ne gösterdim?</h2>
          <p>
            Cüzdan, hangi belgenin hangi alanlarının, ne zaman ve kime
            gösterildiğini kaydeder. Bu{" "}
            <Term
              tip="Cüzdanın tuttuğu, kime hangi bilginin ne zaman gösterildiğinin kaydı."
              en="transaction log"
            >
              işlem günlüğü
            </Term>{" "}
            yalnız telefonda durur; Tamga'ya ya da başka bir sunucuya gitmez.
            Kişi isterse günlüğü kendi belirlediği bir parolayla şifrelenmiş bir
            dosya olarak dışarı aktarabilir; örneğin bir şikâyet için kanıt
            olarak. Bu aktarım hiçbir zaman kendiliğinden olmaz.
          </p>

          <h2>Silme hakkı</h2>
          <p>
            KVKK ve GDPR, kişiye verilerinin silinmesini isteme hakkı tanır.
            Tamga'da bu hak üç yerde karşılık bulur:
          </p>
          <ul>
            <li>
              <strong>Cüzdanı sıfırlamak:</strong> kişi cüzdanı sıfırladığında
              cihazdaki bütün veriler ve Tamga hizmetlerindeki kaydı (kimlik
              servisi ve cüzdan sağlayıcısındaki kayıt) silinir.
            </li>
            <li>
              <strong>Kurumdan silme talebi:</strong> kişi, belge gösterdiği bir
              kurumdan verilerini silmesini cüzdan üzerinden isteyebilir.
            </li>
            <li>
              <strong>Şikâyet yolu:</strong> cüzdan, doğrulayanın bağlı olduğu
              veri koruma kurumuna nasıl şikâyet edileceğini de gösterir.
            </li>
          </ul>
          <Callout kind="turkic" locale="tr">
            <p>
              Ankara'daki bir öğrenci, yıllar önce Bişkek'teki bir yaz okuluna
              belge göstermiş olabilir. İşlem günlüğü ona kime ne gösterdiğini
              hatırlatır; isterse o okuldan verilerini silmesini cüzdandan
              ister. Farklı ülkelerin veri koruma kurallarını bilmek zorunda
              kalmadan hakkını kullanır.
            </p>
          </Callout>

          <h2>Bölümün özeti</h2>
          <p>
            Gizlilik tek bir özellik değil, katmanlı bir tasarımdır: önce
            gereken bilgiyi küçültmek (veri azaltma), sonra yalnız onu açmak
            (seçici paylaşım), gerekirse hiç açmadan kanıtlamak (sıfır bilgi
            ispatı), izlerin birleşmesini önlemek (ilişkilendirilemezlik) ve
            sonunda kararı kişiye bırakmak. Bir sonraki bölümde bu fikirlerin
            Avrupa'da nasıl bir yasal ve teknik çerçeveye dönüştüğünü göreceğiz.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Every technique in this chapter serves one goal: information should
            never move without the person knowing and wanting it to. However
            good the technology, the final decision is the person's. This page
            covers where that decision is made: the consent screen, the
            transaction log and the right to erasure.
          </p>

          <h2>The consent screen: three questions</h2>
          <p>
            When a verifier asks for information, the wallet shows a screen
            before sending anything. It answers three questions:
          </p>
          <ul>
            <li>
              <strong>Who is asking?</strong> The verifier's name is read from
              its record in the network's trust list; a site cannot pick its own
              name. If the verifier acts for someone else, as an intermediary,
              both names are shown.
            </li>
            <li>
              <strong>What are they asking for?</strong> The credential and its
              fields are listed one by one. The person can switch off some
              fields or refuse altogether.
            </li>
            <li>
              <strong>Why?</strong> The purpose the verifier declared when it
              registered with the network is shown. A field outside that purpose
              is flagged separately.
            </li>
          </ul>
          <Figure caption="Example consent screen: the date of birth is flagged because it is outside the registered purpose.">
            <ConsentMock
              who="Requested by"
              whoNote="Example Concert Hall · registered in the trust list"
              what="Requested data"
              fields={[
                { label: "Over 18" },
                { label: "Date of birth", flagged: true },
              ]}
              why="Registered purpose"
              purpose="Age check for event entry"
              extra="Outside purpose"
              share="Share"
              decline="Decline"
            />
          </Figure>
          <p>
            The wallet is the person's tool, not their gatekeeper. Sharing with
            an unregistered verifier, or beyond the purpose, is still possible,
            but only after a clear warning, knowingly.
          </p>

          <h2>The transaction log: who did I show what to?</h2>
          <p>
            The wallet records which fields of which credential were shown, when
            and to whom. This{" "}
            <Term
              tip="The wallet's record of which information was shown to whom and when."
              en="transaction log"
            >
              transaction log
            </Term>{" "}
            stays on the phone; it never goes to Tamga or any other server. If
            the person wants, they can export it as a file encrypted with a
            password of their choosing, for example as evidence for a complaint.
            The export never happens on its own.
          </p>

          <h2>The right to erasure</h2>
          <p>
            KVKK and the GDPR give people the right to have their data deleted.
            In Tamga that right shows up in three places:
          </p>
          <ul>
            <li>
              <strong>Resetting the wallet:</strong> all data on the device, and
              the person's records in Tamga's services (the identity service and
              the wallet provider), are deleted.
            </li>
            <li>
              <strong>Deletion requests:</strong> from the wallet, the person
              can ask an institution they shared with to delete their data.
            </li>
            <li>
              <strong>Complaints:</strong> the wallet also shows how to complain
              to the data protection authority the verifier answers to.
            </li>
          </ul>
          <Callout kind="turkic" locale="en">
            <p>
              A student in Ankara may have shown a credential to a summer school
              in Bishkek years ago. The transaction log reminds them what they
              shared and with whom; if they wish, they ask the school from the
              wallet to delete their data. They can use their rights without
              having to know each country's data protection rules.
            </p>
          </Callout>

          <h2>Chapter summary</h2>
          <p>
            Privacy is not one feature but a layered design: first shrink what
            is needed (data minimisation), then open only that (selective
            disclosure), if possible prove without opening anything
            (zero-knowledge proofs), stop traces from joining up
            (unlinkability), and finally leave the decision to the person. The
            next chapter shows how these ideas became a legal and technical
            framework in Europe.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Bu bölümdäki ähli usullar bir maksada hyzmat edýär: maglumat adamyň
            habary we islegi bolmazdan hiç ýere gitmeli däl. Soňky karar
            adamyňkydyr.
          </p>
          <h2>Razylyk ekrany: üç sorag</h2>
          <ul>
            <li>
              <strong>Kim soraýar?</strong> Barlaýjynyň ady ynam sanawyndaky
              ýazgysyndan okalýar.
            </li>
            <li>
              <strong>Näme soraýar?</strong> Meýdanlar birme-bir görkezilýär;
              adam käbirini öçürip ýa-da ret edip biler.
            </li>
            <li>
              <strong>Näme üçin?</strong> Hasaba alnan maksat görkezilýär;
              maksatdan artyk meýdan aýratyn bellenýär.
            </li>
          </ul>
          <Figure caption="Mysal razylyk ekrany: doglan sene maksatdan daşarda bolany üçin bellenen.">
            <ConsentMock
              who="Soraýan"
              whoNote="Mysal konsert zaly · ynam sanawynda hasaba alnan"
              what="Soralýan maglumatlar"
              fields={[
                { label: "18 ýaşdan uly" },
                { label: "Doglan senesi", flagged: true },
              ]}
              why="Hasaba alnan maksat"
              purpose="Çärä giriş üçin ýaş barlagy"
              extra="Maksatdan daşary"
              share="Paýlaş"
              decline="Ret et"
            />
          </Figure>
          <h2>Amallar žurnaly</h2>
          <p>
            Gapjyk kime näme görkezilendigini ýazýar; bu{" "}
            <Term
              tip="Kime haýsy maglumatyň haçan görkezilendiginiň ýazgysy."
              en="transaction log"
            >
              žurnal
            </Term>{" "}
            diňe telefonda durýar we daşaryk diňe adamyň öz paroly bilen
            şifrlenen faýl görnüşinde çykýar.
          </p>
          <h2>Pozmak hukugy</h2>
          <p>
            Gapjygy täzeden düzmek enjamdaky we Tamga hyzmatlaryndaky ýazgyny
            pozýar; adam edaralara pozmak haýyşyny gapjykdan iberip,
            maglumatlary goramak edarasyna şikaýat ýoluny hem görüp bilýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Ankaradaky talyp ýyllar öň Bişkekdäki tomusky mekdebe görkezen
              resminamasyny žurnalda görüp, şol mekdepden maglumatlaryny pozmagy
              gapjykdan haýyş edip bilýär.
            </p>
          </Callout>
          <p>
            Gizlinlik gatlakly dizaýndyr: azaltmak, saýlap paýlaşmak, görkezmän
            subut etmek, yzlary birleşdirmezlik we kararyny adama goýmak. Indiki
            bölümde bu pikirleriň Ýewropada nähili çarçuwa öwrülendigini
            göreris.
          </p>
        </>
      ),
    },
  },
];

import { Callout, Figure, Term } from "@/components/learn/prose";
import type { LearnPage } from "./types";

/* Bölüm 1 — Kimlik ve güven. Sıfırdan başlayan okur için: kimlik nedir, bugün neden sorun var, hangi modeller var, kim kime güvenir. */

/* ------------------------------------------------------------------ küçük şema parçaları (token renkleri: --dg-*) */

type Box = { x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean; dim?: boolean };

function NodeBox({ x, y, w, h, title, sub, accent, dim }: Box) {
  return (
    <g opacity={dim ? 0.55 : 1}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={accent ? "var(--dg-accent-soft)" : "var(--dg-surface)"}
        stroke={accent ? "var(--dg-accent)" : "var(--dg-line)"}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fill="var(--dg-text)"
      >
        {title}
      </text>
      {sub ? (
        <text x={x + w / 2} y={y + h / 2 + 15} textAnchor="middle" fontSize={11.5} fill="var(--dg-muted)">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed }: { x1: number; y1: number; x2: number; y2: number; dashed?: boolean }) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--dg-line-strong)"
      strokeWidth={1.5}
      strokeDasharray={dashed ? "5 5" : undefined}
      markerEnd="url(#l1-arrow)"
    />
  );
}

function Defs() {
  return (
    <defs>
      <marker id="l1-arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="var(--dg-line-strong)" />
      </marker>
      <pattern id="l1-grid" width={24} height={24} patternUnits="userSpaceOnUse">
        <path d="M24 0 H0 V24" fill="none" stroke="var(--dg-grid)" strokeWidth={1} />
      </pattern>
    </defs>
  );
}

/** Kimlik = kimlik bilgileri; her bilginin kanıtını başka bir kurum verir. */
function IdentityDiagram({ l }: { l: { person: string; attrs: [string, string][]; caption: string } }) {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={640} height={260} fill="url(#l1-grid)" />
      <circle cx={110} cy={130} r={46} fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth={1.5} />
      <circle cx={110} cy={116} r={13} fill="none" stroke="var(--dg-accent)" strokeWidth={1.5} />
      <path d="M86 150 C90 136 130 136 134 150" fill="none" stroke="var(--dg-accent)" strokeWidth={1.5} />
      <text x={110} y={200} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--dg-text)">
        {l.person}
      </text>
      {l.attrs.map(([attr, proof], i) => {
        const y = 22 + i * 56;
        return (
          <g key={attr}>
            <Arrow x1={160} y1={130} x2={258} y2={y + 22} />
            <NodeBox x={262} y={y} w={170} h={44} title={attr} />
            <Arrow x1={434} y1={y + 22} x2={466} y2={y + 22} dashed />
            <NodeBox x={470} y={y} w={152} h={44} title={proof} accent />
          </g>
        );
      })}
    </svg>
  );
}

/** Kâğıt yolu (haftalar) ve dijital yol (saniyeler). */
function PaperVsDigital({ l }: { l: { paper: string; digital: string; paperSteps: string[]; digitalSteps: string[]; caption: string } }) {
  const row = (steps: string[], y: number, accent: boolean) => {
    const w = 132;
    const gap = (600 - steps.length * w) / (steps.length - 1);
    return steps.map((s, i) => {
      const x = 20 + i * (w + gap);
      return (
        <g key={s}>
          <NodeBox x={x} y={y} w={w} h={46} title={s} accent={accent && i === steps.length - 1} />
          {i < steps.length - 1 ? <Arrow x1={x + w + 2} y1={y + 23} x2={x + w + gap - 4} y2={y + 23} /> : null}
        </g>
      );
    });
  };
  return (
    <svg viewBox="0 0 640 250" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={640} height={250} fill="url(#l1-grid)" />
      <text x={20} y={30} fontSize={12} fontWeight={600} letterSpacing={1.2} fill="var(--dg-muted)">
        {l.paper}
      </text>
      {row(l.paperSteps, 42, false)}
      <text x={20} y={150} fontSize={12} fontWeight={600} letterSpacing={1.2} fill="var(--dg-accent)">
        {l.digital}
      </text>
      {row(l.digitalSteps, 162, true)}
    </svg>
  );
}

/** Üç model: merkezi hesap, federe giriş, kişinin cüzdanı. */
function ModelsDiagram({ l }: { l: { models: { name: string; a: string; b: string; note: string }[]; caption: string } }) {
  return (
    <svg viewBox="0 0 660 270" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={660} height={270} fill="url(#l1-grid)" />
      {l.models.map((m, i) => {
        const x = 16 + i * 216;
        const accent = i === 2;
        return (
          <g key={m.name}>
            <rect
              x={x}
              y={12}
              width={196}
              height={246}
              rx={16}
              fill={accent ? "var(--dg-accent-soft)" : "var(--dg-surface-2)"}
              stroke={accent ? "var(--dg-accent)" : "var(--dg-line)"}
              strokeWidth={1.5}
            />
            <text x={x + 98} y={40} textAnchor="middle" fontSize={13.5} fontWeight={700} fill="var(--dg-text)">
              {m.name}
            </text>
            <NodeBox x={x + 28} y={62} w={140} h={44} title={m.a} />
            <Arrow x1={x + 98} y1={108} x2={x + 98} y2={142} />
            <NodeBox x={x + 28} y={146} w={140} h={44} title={m.b} accent={accent} />
            <text x={x + 98} y={226} textAnchor="middle" fontSize={11.5} fill="var(--dg-muted)">
              {m.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ şema etiketleri */

const ID_L = {
  tr: {
    person: "Ayşe",
    attrs: [
      ["Adı, doğum tarihi", "Kimlik kartı"],
      ["Öğrenci", "Öğrenci belgesi"],
      ["Mühendis", "Diploma"],
      ["18 yaşından büyük", "Kimlik kartı"],
    ] as [string, string][],
    caption: "Bir kişinin kimliği birçok kimlik bilgisinden oluşur; her birinin kanıtını başka bir kurum verir.",
  },
  en: {
    person: "Ayşe",
    attrs: [
      ["Name, date of birth", "ID card"],
      ["Student", "Student certificate"],
      ["Engineer", "Diploma"],
      ["Over 18", "ID card"],
    ] as [string, string][],
    caption: "A person's identity is made of many attributes; a different institution vouches for each one.",
  },
  tk: {
    person: "Aýşe",
    attrs: [
      ["Ady, doglan güni", "Şahsyýet kartoçkasy"],
      ["Talyp", "Talyp güwänamasy"],
      ["Inžener", "Diplom"],
      ["18 ýaşdan uly", "Şahsyýet kartoçkasy"],
    ] as [string, string][],
    caption: "Adamyň şahsyýeti köp maglumatdan ybarat; her biriniň subutnamasyny başga gurama berýär.",
  },
  az: {
    person: "Ayşe",
    attrs: [
      ["Adı, doğum tarixi", "Şəxsiyyət vəsiqəsi"],
      ["Tələbə", "Tələbə arayışı"],
      ["Mühəndis", "Diplom"],
      ["18 yaşdan yuxarı", "Şəxsiyyət vəsiqəsi"],
    ] as [string, string][],
    caption: "İnsanın şəxsiyyəti bir çox şəxsiyyət məlumatından ibarətdir; onların hər birinə başqa bir qurum zəmanət verir.",
  },
};

const PAPER_L = {
  tr: {
    paper: "KÂĞIT YOLU · HAFTALAR",
    digital: "DİJİTAL YOL · SANİYELER",
    paperSteps: ["Fotokopi", "Noter, apostil", "Tercüme", "E-posta ile sor"],
    digitalSteps: ["Cüzdan", "Onay", "İmzayı denetle", "Geçerli"],
    caption: "Bugün bir belgeyi başka ülkede kanıtlamak haftalar sürer; dijital belgeyle aynı iş saniyelerde biter.",
  },
  en: {
    paper: "PAPER · WEEKS",
    digital: "DIGITAL · SECONDS",
    paperSteps: ["Photocopy", "Notary, apostille", "Translation", "Ask by e-mail"],
    digitalSteps: ["Wallet", "Consent", "Check signature", "Valid"],
    caption: "Proving a document in another country takes weeks today; with a digital credential the same job takes seconds.",
  },
  tk: {
    paper: "KAGYZ ÝOLY · HEPDELER",
    digital: "SANLY ÝOL · SEKUNTLAR",
    paperSteps: ["Nusga", "Notarius, apostil", "Terjime", "E-poçta bilen sora"],
    digitalSteps: ["Gapjyk", "Razylyk", "Goly barla", "Dogry"],
    caption: "Häzir resminamany başga ýurtda subut etmek hepdeläp dowam edýär; sanly resminama bilen sekuntlarda gutarýar.",
  },
  az: {
    paper: "KAĞIZ · HƏFTƏLƏR",
    digital: "RƏQƏMSAL · SANİYƏLƏR",
    paperSteps: ["Surət", "Notarius, apostil", "Tərcümə", "E-poçtla soruşmaq"],
    digitalSteps: ["Cüzdan", "Razılıq", "İmzanı yoxla", "Etibarlı"],
    caption: "Bu gün sənədi başqa ölkədə təsdiqləmək həftələr çəkir; rəqəmsal sənədlə eyni iş saniyələr içində başa çatır.",
  },
};

const MODELS_L = {
  tr: {
    models: [
      { name: "Merkezi hesap", a: "Her sitede şifre", b: "Veriler sitede", note: "Her site ayrı veri tutar" },
      { name: "“X ile giriş yap”", a: "Aracı hesap", b: "Aracı her girişi görür", note: "Kolay ama tek noktaya bağlı" },
      { name: "Kişinin cüzdanı", a: "Belgeler telefonda", b: "Kişi onaylar", note: "Aracı yok, kontrol kişide" },
    ],
    caption: "Dijital kimliğin üç modeli. Avrupa ve Tamga üçüncüsünü seçti.",
  },
  en: {
    models: [
      { name: "Central account", a: "A password per site", b: "Data kept by the site", note: "Every site keeps its own data" },
      { name: "“Sign in with X”", a: "An intermediary", b: "It sees every login", note: "Easy, but one point of control" },
      { name: "The person's wallet", a: "Credentials on the phone", b: "The person consents", note: "No intermediary, the person decides" },
    ],
    caption: "Three models of digital identity. Europe and Tamga chose the third.",
  },
  tk: {
    models: [
      { name: "Merkezi hasap", a: "Her saýtda açar söz", b: "Maglumat saýtda", note: "Her saýt öz maglumatyny saklaýar" },
      { name: "“X bilen gir”", a: "Araçy hasap", b: "Araçy her girişi görýär", note: "Aňsat, ýöne bir nokada bagly" },
      { name: "Adamyň gapjygy", a: "Resminamalar telefonda", b: "Adam razylyk berýär", note: "Araçy ýok, karar adamda" },
    ],
    caption: "Sanly şahsyýetiň üç modeli. Ýewropa we Tamga üçünjisini saýlady.",
  },
  az: {
    models: [
      { name: "Mərkəzi hesab", a: "Hər sayt üçün parol", b: "Məlumat saytda qalır", note: "Hər sayt öz məlumatını saxlayır" },
      { name: "“X ilə daxil ol”", a: "Vasitəçi", b: "Hər girişi görür", note: "Asan, amma tək nəzarət nöqtəsi" },
      { name: "Şəxsin cüzdanı", a: "Sənədlər telefonda", b: "Şəxs razılıq verir", note: "Vasitəçi yoxdur, qərarı şəxs verir" },
    ],
    caption: "Rəqəmsal şəxsiyyətin üç modeli. Avropa və Tamga üçüncüsünü seçdi.",
  },
};

/* ------------------------------------------------------------------ sayfalar */

export const CHAPTER_1: LearnPage[] = [
  {
    slug: "what-is-identity",
    chapter: 1,
    order: 1,
    minutes: 4,
    title: { tr: "Kimlik nedir?", en: "What is identity?", tk: "Şahsyýet näme?", az: "Şəxsiyyət nədir?" },
    summary: {
      tr: "Kimlik, kimlik bilgisi ve kanıt: her gün farkında olmadan yaptığımız kimlik gösterme işinin parçaları.",
      en: "Identity, attributes and proof: the parts of something we do every day without noticing.",
      tk: "Şahsyýet, şahsyýet maglumaty we subutnama: her gün duýman edýän işimiziň bölekleri.",
      az: "Şəxsiyyət, şəxsiyyət məlumatları və sübut: hər gün fərqinə varmadan etdiyimiz bir işin tərkib hissələri.",
    },
    body: {
      tr: (
        <>
          <p>
            Günde kaç kez kimliğinizi gösteriyorsunuz? Bankada hesap açarken, otelde giriş yaparken, sinemada öğrenci
            indirimi isterken, bir sitede yaşınızı onaylarken. Çoğu zaman bunu düşünmeden yaparız. Oysa her birinde aynı
            şey olur: biri sizin hakkınızda bir şeyi bilmek ister, siz de onu kanıtlarsınız.
          </p>
          <h2>Kimlik tek bir şey değil</h2>
          <p>
            &quot;Kimlik&quot; deyince aklımıza kimlik kartı gelir. Ama günlük hayatta kimliğimizin hep küçük parçaları
            sorulur. Otel adınızı ve belge numaranızı ister. Sinema yalnız öğrenci olup olmadığınızı merak eder. Hastane
            karşısındakinin gerçekten doktor olduğunu bilmek ister. Bir alışveriş sitesi ise yalnız 18 yaşından büyük olup
            olmadığınızı öğrenmek ister.
          </p>
          <p>
            Bu parçaların her birine <Term tip="Bir kişi hakkındaki tek bir bilgi: adı, doğum tarihi, mesleği, öğrenci olup olmadığı gibi." en="attribute">kimlik bilgisi</Term>{" "}
            denir. Kimliğiniz, bu bilgilerin toplamıdır.
          </p>
          <Figure caption={ID_L.tr.caption}>
            <IdentityDiagram l={ID_L.tr} />
          </Figure>
          <h2>Söylemek yetmez, kanıt gerekir</h2>
          <p>
            &quot;Öğrenciyim&quot; demek kimseyi ikna etmez. Bir öğrenci kartı gösterirsiniz. &quot;Mühendisim&quot; demek
            de yetmez; diploma istenir. Bu kanıtların değeri, onları kimin verdiğinden gelir. Öğrenci kartını üniversite,
            diplomayı yine üniversite, kimlik kartını devlet verir. Karşı taraf aslında size değil, belgeyi veren kuruma
            güvenir.
          </p>
          <p>Her kimlik gösterme işinde karşı taraf üç soruya cevap arar:</p>
          <ul>
            <li>
              <strong>Ne söyleniyor?</strong> Örneğin &quot;bu kişi Örnek Üniversite&apos;nin öğrencisidir&quot;.
            </li>
            <li>
              <strong>Kim söylüyor?</strong> Belgeyi gerçekten o üniversite mi verdi, yoksa biri mi uydurdu?
            </li>
            <li>
              <strong>Hâlâ geçerli mi?</strong> Öğrencilik bitmiş, belge iptal edilmiş olabilir mi?
            </li>
          </ul>
          <Callout kind="turkic" locale="tr">
            <p>
              Taşkent&apos;te okuyan bir öğrenci yaz okulu için Ankara&apos;ya başvurduğunda bu üç soru zorlaşır. Belge
              başka bir dilde, kurum karşı tarafın tanımadığı bir kurum, geçerliliği sormak için de bir e-posta ya da
              telefon gerekir. Türk dünyasında belgelerin sınırı geçebilmesi için bu üç sorunun her yerde aynı biçimde
              cevaplanması gerekir.
            </p>
          </Callout>
          <h2>Dijitalde ne değişir?</h2>
          <p>
            Dijital kimlikte sorular aynıdır; değişen, cevabı kimin verdiğidir. Bugün bu soruları bir insan, belgeye
            bakarak ve gerekirse telefon açarak cevaplar. Dijital bir belgede ise cevabı bir yazılım saniyeler içinde, kurumu
            aramadan verir. Bunun için belgenin içinde &quot;kim söylüyor&quot; sorusunun kanıtı (bir dijital imza) ve
            &quot;hâlâ geçerli mi&quot; sorusunun cevabını bulmanın yolu yer alır.
          </p>
          <p>
            Sonraki sayfalarda önce bugünkü sorunlara, sonra dijital kimliğin farklı modellerine bakacağız. Bölümün sonunda
            Tamga Network&apos;ün dayandığı &quot;güven üçgeni&quot;ni tanıyacaksınız.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            How many times a day do you prove who you are? Opening a bank account, checking in at a hotel, asking for a
            student discount at the cinema, confirming your age on a website. Most of the time we do it without thinking.
            Yet each time the same thing happens: someone wants to know something about you, and you prove it.
          </p>
          <h2>Identity is not one thing</h2>
          <p>
            When we hear &quot;identity&quot; we think of an ID card. In daily life, though, we are almost always asked for
            small pieces of it. The hotel wants your name and document number. The cinema only cares whether you are a
            student. A hospital needs to know that the person in front of it really is a doctor. A shop online only needs to
            know that you are over 18.
          </p>
          <p>
            Each of these pieces is an{" "}
            <Term tip="A single fact about a person: name, date of birth, profession, whether they are a student.">attribute</Term>.
            Your identity is the sum of your attributes.
          </p>
          <Figure caption={ID_L.en.caption}>
            <IdentityDiagram l={ID_L.en} />
          </Figure>
          <h2>Saying it is not enough</h2>
          <p>
            &quot;I am a student&quot; convinces nobody; you show a student card. &quot;I am an engineer&quot; is not
            enough either; a diploma is requested. The value of these proofs comes from who issued them. The university
            issues the student card and the diploma, the state issues the ID card. The other side does not really trust
            you; it trusts the institution behind the document.
          </p>
          <p>Every time you prove something, the other side looks for three answers:</p>
          <ul>
            <li>
              <strong>What is being claimed?</strong> For example, &quot;this person is a student at Example
              University&quot;.
            </li>
            <li>
              <strong>Who is claiming it?</strong> Did that university really issue the document, or did someone make it
              up?
            </li>
            <li>
              <strong>Is it still valid?</strong> Could the studies have ended, or the document have been withdrawn?
            </li>
          </ul>
          <Callout kind="turkic" locale="en">
            <p>
              When a student from Tashkent applies to a summer school in Ankara, these three questions get harder. The
              document is in another language, the institution is one the other side does not know, and checking validity
              means an e-mail or a phone call. For documents to cross borders in the Turkic world, the three questions must
              be answered the same way everywhere.
            </p>
          </Callout>
          <h2>What changes in the digital world?</h2>
          <p>
            In digital identity the questions stay the same; what changes is who answers them. Today a person answers them
            by looking at a document and, if needed, picking up the phone. With a digital credential, software answers in
            seconds without calling the institution. For that, the credential carries proof of &quot;who is claiming
            it&quot; (a digital signature) and a way to find out whether it is still valid.
          </p>
          <p>
            In the next pages we look at today&apos;s problems, then at the different models of digital identity. By the
            end of this chapter you will know the &quot;trust triangle&quot; that Tamga Network is built on.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Günde näçe gezek kimdigiňizi subut edýärsiňiz? Bankda hasap açanyňyzda, myhmanhana girende, kinoteatrda talyp
            arzanladyşyny soranyňyzda, saýtda ýaşyňyzy tassyklanyňyzda. Her gezek şol bir zat bolýar: kimdir biri siziň
            barada bir zady bilmek isleýär, siz hem ony subut edýärsiňiz.
          </p>
          <h2>Şahsyýet bir zat däl</h2>
          <p>
            Gündelik durmuşda şahsyýetimiziň elmydama kiçi bölekleri soralýar: myhmanhana adyňyzy, kinoteatr talypdygyňyzy,
            hassahana lukmandygyňyzy, onlaýn dükan bolsa 18 ýaşdan uludygyňyzy bilmek isleýär. Bu bölekleriň her biri{" "}
            <Term tip="Adam barada bir maglumat: ady, doglan güni, kärü, talypdygy ýaly." en="attribute">şahsyýet maglumaty</Term>{" "}
            diýlip atlandyrylýar.
          </p>
          <Figure caption={ID_L.tk.caption}>
            <IdentityDiagram l={ID_L.tk} />
          </Figure>
          <h2>Aýtmak ýeterlik däl, subutnama gerek</h2>
          <p>
            Subutnamanyň gymmaty ony kimiň berenliginden gelýär: talyp güwänamasyny uniwersitet, şahsyýet kartoçkasyny
            döwlet berýär. Garşy tarap size däl-de, resminamany beren gurama ynanýar. Her gezek üç soraga jogap gözlenýär:
            näme aýdylýar, kim aýdýar we heniz hem güýjündemi?
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Daşkentde okaýan talyp Ankara tomus mekdebine ýüz tutanda bu üç sorag kynlaşýar: resminama başga dilde,
              gurama tanalmaýar, güýjündedigini barlamak üçin jaň etmeli. Türki dünýäde resminamalaryň serhetden geçmegi
              üçin bu soraglara hemme ýerde birmeňzeş jogap berilmeli.
            </p>
          </Callout>
          <h2>Sanly dünýäde näme üýtgeýär?</h2>
          <p>
            Soraglar şol bir bolup galýar, jogap berýän üýtgeýär. Sanly resminamada &quot;kim aýdýar&quot; soragynyň
            subutnamasy (sanly gol) we güýjündeligi barlamagyň ýoly bar; programma guramadan soraman sekuntlarda jogap
            berýär.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Gün ərzində neçə dəfə kim olduğunuzu sübut edirsiniz? Bankda hesab açarkən, oteldə qeydiyyatdan keçərkən,
            kinoteatrda tələbə endirimi istəyərkən, saytda yaşınızı təsdiqləyərkən. Çox vaxt bunu düşünmədən edirik. Lakin
            hər dəfə eyni şey baş verir: kimsə sizin haqqınızda nəyisə bilmək istəyir, siz də bunu sübut edirsiniz.
          </p>
          <h2>Şəxsiyyət tək bir şey deyil</h2>
          <p>
            &quot;Şəxsiyyət&quot; sözünü eşidəndə ağlımıza şəxsiyyət vəsiqəsi gəlir. Lakin gündəlik həyatda bizdən demək olar
            ki, həmişə onun kiçik hissələri soruşulur. Otel adınızı və sənəd nömrənizi istəyir. Kinoteatrı yalnız tələbə
            olub-olmadığınız maraqlandırır. Xəstəxana qarşısındakı şəxsin həqiqətən həkim olduğunu bilməlidir. Onlayn
            mağazaya isə yalnız 18 yaşdan yuxarı olduğunuzu bilmək kifayətdir.
          </p>
          <p>
            Bu hissələrin hər biri{" "}
            <Term tip="Şəxs haqqında tək bir fakt: adı, doğum tarixi, peşəsi, tələbə olub-olmaması." en="attribute">şəxsiyyət məlumatı</Term>{" "}
            adlanır. Şəxsiyyətiniz bu məlumatların cəmidir.
          </p>
          <Figure caption={ID_L.az.caption}>
            <IdentityDiagram l={ID_L.az} />
          </Figure>
          <h2>Demək kifayət deyil</h2>
          <p>
            &quot;Mən tələbəyəm&quot; demək heç kimi inandırmır; tələbə bileti göstərirsiniz. &quot;Mən mühəndisəm&quot;
            demək də kifayət deyil; diplom tələb olunur. Bu sübutların dəyəri onları kimin verdiyindən irəli gəlir. Tələbə
            biletini və diplomu universitet, şəxsiyyət vəsiqəsini dövlət verir. Qarşı tərəf əslində sizə deyil, sənədin
            arxasında duran quruma etibar edir.
          </p>
          <p>Hər dəfə nəyisə sübut edəndə qarşı tərəf üç suala cavab axtarır:</p>
          <ul>
            <li>
              <strong>Nə iddia olunur?</strong> Məsələn, &quot;bu şəxs Nümunə Universitetinin tələbəsidir&quot;.
            </li>
            <li>
              <strong>Bunu kim iddia edir?</strong> Sənədi həqiqətən həmin universitet verib, yoxsa kimsə onu uydurub?
            </li>
            <li>
              <strong>Hələ də etibarlıdırmı?</strong> Təhsil başa çatmış və ya sənəd geri götürülmüş ola bilərmi?
            </li>
          </ul>
          <Callout kind="turkic" locale="az">
            <p>
              Daşkənddən olan bir tələbə Ankarada yay məktəbinə müraciət etdikdə bu üç sual çətinləşir. Sənəd başqa
              dildədir, qurum qarşı tərəfə tanış deyil, etibarlılığı yoxlamaq isə e-poçt və ya telefon zəngi tələb edir.
              Türk dünyasında sənədlərin sərhədləri keçə bilməsi üçün bu üç suala hər yerdə eyni şəkildə cavab
              verilməlidir.
            </p>
          </Callout>
          <h2>Rəqəmsal dünyada nə dəyişir?</h2>
          <p>
            Rəqəmsal şəxsiyyətdə suallar eyni qalır; dəyişən onlara kimin cavab verməsidir. Bu gün bu suallara insan sənədə
            baxaraq və lazım gələrsə telefonu götürərək cavab verir. Rəqəmsal sənəddə isə proqram təminatı qurumla əlaqə
            saxlamadan saniyələr içində cavab verir. Bunun üçün rəqəmsal sənəd &quot;bunu kim iddia edir&quot; sualının
            sübutunu (rəqəmsal imza) və onun hələ də etibarlı olub-olmadığını öyrənmək yolunu özündə daşıyır.
          </p>
          <p>
            Növbəti səhifələrdə bugünkü problemlərə, sonra isə rəqəmsal şəxsiyyətin müxtəlif modellərinə baxacağıq. Bu
            bölmənin sonunda Tamga Network-un əsaslandığı &quot;etibar üçbucağı&quot; ilə tanış olacaqsınız.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Kimlik tek bir şey değil; adı, yaşı, mesleği gibi kimlik bilgilerinin toplamıdır.",
        en: "Identity is not one thing; it is the sum of attributes such as name, age and profession.",
        tk: "Şahsyýet bir zat däl; ady, ýaşy, käri ýaly maglumatlaryň jemi.",
        az: "Şəxsiyyət tək bir şey deyil; o, ad, yaş və peşə kimi şəxsiyyət məlumatlarının cəmidir.",
      },
      {
        tr: "Bir kanıtın değeri onu veren kurumdan gelir; karşı taraf kuruma güvenir.",
        en: "A proof is worth what its issuer is worth; the other side trusts the institution.",
        tk: "Subutnamanyň gymmaty ony beren guramadan gelýär.",
        az: "Sübutun dəyəri onu verən qurumun dəyəri qədərdir; qarşı tərəf quruma etibar edir.",
      },
      {
        tr: "Her doğrulama üç soruya cevap arar: ne söyleniyor, kim söylüyor, hâlâ geçerli mi.",
        en: "Every check looks for three answers: what is claimed, who claims it, is it still valid.",
        tk: "Her barlag üç soraga jogap gözleýär: näme, kim, heniz güýjündemi.",
        az: "Hər yoxlama üç suala cavab axtarır: nə iddia olunur, bunu kim iddia edir, hələ də etibarlıdırmı.",
      },
    ],
    deeper: [
      { label: { tr: "Sözlük", en: "Glossary", tk: "Sözlük", az: "Lüğət" }, href: "/glossary", kind: "docs" },
      { label: { tr: "Tanımlar (Ek D)", en: "Definitions (Annex D)", tk: "Kesgitlemeler (D goşundy)", az: "Təriflər (Əlavə D)" }, href: "definitions", kind: "arf" },
    ],
  },
  {
    slug: "paper-to-digital",
    chapter: 1,
    order: 2,
    minutes: 5,
    title: { tr: "Kâğıttan dijitale", en: "From paper to digital", tk: "Kagyzdan sanly görnüşe", az: "Kağızdan rəqəmsala" },
    summary: {
      tr: "Bugünkü sorunlar: sahte belge, haftalar süren doğrulama, apostil, fotokopi, gereğinden fazla paylaşılan veri ve sınırda takılan belgeler.",
      en: "Today's problems: forged documents, verification that takes weeks, apostilles, photocopies, oversharing and documents stuck at borders.",
      tk: "Häzirki meseleler: galp resminama, hepdeläp dowam edýän barlag, apostil, nusga, artykmaç paýlaşylýan maglumat we serhetde saklanýan resminamalar.",
      az: "Bugünkü problemlər: saxta sənədlər, həftələrlə çəkən yoxlama, apostillər, surətlər, lazım olandan artıq məlumat paylaşımı və sərhədlərdə ilişib qalan sənədlər.",
    },
    body: {
      tr: (
        <>
          <p>
            Belgelerimizin çoğu artık bilgisayarda üretiliyor. Ama güvenin işleyişi hâlâ kâğıt çağından kalma: belgeyi
            gösteriyoruz, karşı taraf bakıyor, emin olamazsa soruyor. Bu sayfada bu düzenin neden yetmediğine bakıyoruz.
          </p>
          <h2>Beş tanıdık sorun</h2>
          <ul>
            <li>
              <strong>Sahte belge kolay.</strong> Bir PDF&apos;i düzenlemek, bir fotokopiyi değiştirmek birkaç dakika
              sürer. Gözle bakan biri farkı çoğu zaman anlayamaz.
            </li>
            <li>
              <strong>Doğrulama yavaş.</strong> Bir işveren, bir diplomanın gerçek olup olmadığını öğrenmek için
              üniversiteye e-posta yazar, cevap günler, bazen haftalar sürer.
            </li>
            <li>
              <strong>Sınır pahalı.</strong> Belge başka bir ülkede kullanılacaksa noter onayı,{" "}
              <Term tip="Bir resmî belgenin başka bir ülkede tanınması için verilen onay şerhi (Lahey Sözleşmesi)." en="apostille">apostil</Term>{" "}
              ve yeminli tercüme gerekir. Her biri masraf ve zaman demektir.
            </li>
            <li>
              <strong>Gereğinden fazla veri gider.</strong> Yaşınızı kanıtlamak için kimlik kartınızın fotokopisini
              verirsiniz; adınız, doğum yeriniz, belge numaranız da gider. Karşı taraf bunları saklar, bazen kaybeder.
            </li>
            <li>
              <strong>Sistemler birbirini tanımıyor.</strong> Birçok ülkenin barkodlu ya da çevrim içi belge doğrulama
              sistemi var, ama her biri yalnız kendi ülkesinde çalışır. Bir başka ülkenin sistemi onu tanımaz.
            </li>
          </ul>
          <Figure caption={PAPER_L.tr.caption}>
            <PaperVsDigital l={PAPER_L.tr} />
          </Figure>
          <Callout kind="turkic" locale="tr">
            <p>
              Bişkek&apos;te diplomasını almış bir hemşire İstanbul&apos;daki bir hastanede çalışmak istediğinde;
              diplomayı, meslek belgesini ve kimliğini ayrı ayrı onaylatmak, tercüme ettirmek ve sonra hastanenin bunları
              teyit etmesini beklemek zorunda kalır. Belgeler gerçek olsa bile süreç haftalar sürer. Türk dünyasında
              insanların okuduğu, çalıştığı ve seyahat ettiği ülke sayısı arttıkça bu yük de büyüyor.
            </p>
          </Callout>
          <h2>Dijital bir PDF neden yetmez?</h2>
          <p>
            Kâğıdı taramak ya da PDF olarak göndermek sorunu çözmez; yalnızca kâğıdın dijital bir kopyasını üretir. Kopyanın
            kimden geldiği, değiştirilip değiştirilmediği ve hâlâ geçerli olup olmadığı yine anlaşılmaz. Gerçek çözüm, bu üç
            sorunun cevabını belgenin kendisine yerleştirmektir:
          </p>
          <ul>
            <li>Belgeyi veren kurum onu dijital olarak imzalar; imza değişikliği ve sahteliği ortaya çıkarır.</li>
            <li>Doğrulayan, imzayı kuruma sormadan, saniyeler içinde denetler.</li>
            <li>Kişi yalnız istenen bilgiyi gösterir; geri kalanı telefonunda kalır.</li>
            <li>Kurallar ortak olduğu için belge her ülkede aynı biçimde denetlenir.</li>
          </ul>
          <p>
            Bu yaklaşımın adı <Term tip="Veren kurumun dijital imzasını taşıyan, bir yazılımın kurumu aramadan denetleyebildiği dijital belge." en="verifiable credential">doğrulanabilir belge</Term>{" "}
            ve Avrupa Birliği&apos;nin yeni dijital kimlik düzeni de bunun üzerine kuruluyor. Tamga Network aynı düzeni Türk
            dünyası için kurar.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Most of our documents are now produced on a computer. Yet the way trust works is still from the paper age: we
            show the document, the other side looks at it, and if unsure, asks. This page looks at why that is no longer
            enough.
          </p>
          <h2>Five familiar problems</h2>
          <ul>
            <li>
              <strong>Forgery is easy.</strong> Editing a PDF or altering a photocopy takes minutes. Someone looking with
              the naked eye often cannot tell.
            </li>
            <li>
              <strong>Verification is slow.</strong> An employer who wants to know whether a diploma is real e-mails the
              university and waits days, sometimes weeks.
            </li>
            <li>
              <strong>Borders are expensive.</strong> A document used in another country needs a notary, an{" "}
              <Term tip="A certificate that lets a public document be recognised in another country (Hague Convention).">apostille</Term>{" "}
              and a sworn translation. Each costs money and time.
            </li>
            <li>
              <strong>Too much data travels.</strong> To prove your age you hand over a copy of your ID card; your name,
              place of birth and document number go with it. The other side stores them and sometimes loses them.
            </li>
            <li>
              <strong>Systems do not recognise each other.</strong> Many countries have barcode or online document checks,
              but each works only inside its own country. Another country&apos;s system does not recognise it.
            </li>
          </ul>
          <Figure caption={PAPER_L.en.caption}>
            <PaperVsDigital l={PAPER_L.en} />
          </Figure>
          <Callout kind="turkic" locale="en">
            <p>
              A nurse who earned her diploma in Bishkek and wants to work at a hospital in Istanbul has to get her diploma,
              licence and ID notarised and translated separately, then wait for the hospital to confirm them. Even when
              every document is genuine, it takes weeks. As more people in the Turkic world study, work and travel across
              countries, this burden keeps growing.
            </p>
          </Callout>
          <h2>Why a PDF is not enough</h2>
          <p>
            Scanning paper or sending a PDF does not solve the problem; it only produces a digital copy of the paper. Who
            it came from, whether it was changed and whether it is still valid remain unclear. The real solution is to put
            the answers to those questions into the document itself:
          </p>
          <ul>
            <li>The issuing institution signs it digitally; the signature exposes any change or forgery.</li>
            <li>The verifier checks the signature in seconds without contacting the institution.</li>
            <li>The person shows only the requested information; the rest stays on their phone.</li>
            <li>Because the rules are shared, the document is checked the same way in every country.</li>
          </ul>
          <p>
            This is called a{" "}
            <Term tip="A digital document carrying its issuer's digital signature, which software can check without contacting the issuer.">verifiable credential</Term>
            , and the European Union&apos;s new digital identity framework is built on it. Tamga Network builds the same
            framework for the Turkic world.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Resminamalarymyzyň köpüsi kompýuterde döredilýär, emma ynamyň işleýşi heniz kagyz döwründen galan: görkezýäris,
            garşy tarap seredýär, ynanmasa soraýar.
          </p>
          <h2>Bäş tanyş mesele</h2>
          <ul>
            <li>
              <strong>Galp resminama aňsat:</strong> PDF-i üýtgetmek birnäçe minut alýar.
            </li>
            <li>
              <strong>Barlag haýal:</strong> diplomy barlamak üçin uniwersitete hat ýazylýar, jogap hepdeläp garaşylýar.
            </li>
            <li>
              <strong>Serhet gymmat:</strong> notarius,{" "}
              <Term tip="Resmi resminamanyň başga ýurtda ykrar edilmegi üçin berilýän tassyklama." en="apostille">apostil</Term>{" "}
              we terjime gerek.
            </li>
            <li>
              <strong>Artykmaç maglumat gidýär:</strong> ýaşy subut etmek üçin tutuş şahsyýet kartoçkasynyň nusgasy berilýär.
            </li>
            <li>
              <strong>Ulgamlar biri-birini tanamaýar:</strong> her ýurduň barlag ulgamy diňe öz içinde işleýär.
            </li>
          </ul>
          <Figure caption={PAPER_L.tk.caption}>
            <PaperVsDigital l={PAPER_L.tk} />
          </Figure>
          <Callout kind="turkic" locale="tk">
            <p>
              Bişkekde diplom alan şepagat uýasy Stambulda işlemek isläninde diplomyny, kär güwänamasyny we şahsyýetini
              aýratyn tassyklatmaly we terjime etdirmeli. Resminamalar hakyky bolsa-da, iş hepdeläp dowam edýär.
            </p>
          </Callout>
          <h2>PDF näme üçin ýeterlik däl?</h2>
          <p>
            PDF diňe kagyzyň sanly nusgasydyr. Çözgüt jogaplary resminamanyň özüne goýmak: gurama ony sanly gol bilen
            goýýar, barlaýjy sekuntlarda barlaýar, adam diňe soralan maglumaty görkezýär. Muňa{" "}
            <Term tip="Beriji guramanyň sanly goluny göterýän we programmanyň guramadan soraman barlap bilýän resminamasy." en="verifiable credential">barlanyp bilinýän resminama</Term>{" "}
            diýilýär; Tamga Network şu tertibi türki dünýä üçin gurýar.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Sənədlərimizin əksəriyyəti artıq kompüterdə hazırlanır. Lakin etibarın işləmə üsulu hələ də kağız dövründən
            qalıb: sənədi göstəririk, qarşı tərəf ona baxır, əmin olmadıqda isə soruşur. Bu səhifədə bunun niyə artıq
            kifayət etmədiyinə baxırıq.
          </p>
          <h2>Beş tanış problem</h2>
          <ul>
            <li>
              <strong>Saxtakarlıq asandır.</strong> PDF-i redaktə etmək və ya surəti dəyişdirmək bir neçə dəqiqə çəkir.
              Adi gözlə baxan şəxs çox vaxt fərqi görə bilmir.
            </li>
            <li>
              <strong>Yoxlama yavaşdır.</strong> Diplomun həqiqi olub-olmadığını bilmək istəyən işəgötürən universitetə
              e-poçt yazır və günlərlə, bəzən həftələrlə gözləyir.
            </li>
            <li>
              <strong>Sərhədlər bahadır.</strong> Başqa ölkədə istifadə olunacaq sənəd üçün notarius,{" "}
              <Term tip="Rəsmi sənədin başqa ölkədə tanınmasına imkan verən təsdiq qeydi (Haaqa Konvensiyası)." en="apostille">apostil</Term>{" "}
              və andlı tərcümə tələb olunur. Bunların hər biri pul və vaxt deməkdir.
            </li>
            <li>
              <strong>Həddindən artıq məlumat ötürülür.</strong> Yaşınızı sübut etmək üçün şəxsiyyət vəsiqənizin surətini
              təqdim edirsiniz; adınız, doğum yeriniz və sənəd nömrəniz də onunla birlikdə gedir. Qarşı tərəf bunları
              saxlayır, bəzən də itirir.
            </li>
            <li>
              <strong>Sistemlər bir-birini tanımır.</strong> Bir çox ölkədə barkodlu və ya onlayn sənəd yoxlama sistemləri
              var, lakin hər biri yalnız öz ölkəsi daxilində işləyir. Başqa ölkənin sistemi onu tanımır.
            </li>
          </ul>
          <Figure caption={PAPER_L.az.caption}>
            <PaperVsDigital l={PAPER_L.az} />
          </Figure>
          <Callout kind="turkic" locale="az">
            <p>
              Diplomunu Bişkekdə almış və İstanbuldakı xəstəxanada işləmək istəyən tibb bacısı diplomunu, lisenziyasını
              və şəxsiyyət vəsiqəsini ayrı-ayrılıqda notarial qaydada təsdiqlətməli, tərcümə etdirməli, sonra isə
              xəstəxananın onları təsdiqləməsini gözləməlidir. Bütün sənədlər həqiqi olsa belə, bu, həftələr çəkir. Türk
              dünyasında ölkələr arasında təhsil alan, işləyən və səyahət edən insanların sayı artdıqca bu yük də artır.
            </p>
          </Callout>
          <h2>PDF niyə kifayət deyil</h2>
          <p>
            Kağızı skan etmək və ya PDF göndərmək problemi həll etmir; bu, yalnız kağızın rəqəmsal surətini yaradır. Onun
            kimdən gəldiyi, dəyişdirilib-dəyişdirilmədiyi və hələ də etibarlı olub-olmadığı qeyri-müəyyən qalır. Əsl həll
            bu sualların cavablarını sənədin özünə yerləşdirməkdir:
          </p>
          <ul>
            <li>Sənədi verən qurum onu rəqəmsal imzalayır; imza istənilən dəyişikliyi və ya saxtakarlığı üzə çıxarır.</li>
            <li>Yoxlayan tərəf imzanı qurumla əlaqə saxlamadan saniyələr içində yoxlayır.</li>
            <li>Şəxs yalnız tələb olunan məlumatı göstərir; qalanı onun telefonunda qalır.</li>
            <li>Qaydalar ortaq olduğu üçün sənəd hər ölkədə eyni şəkildə yoxlanılır.</li>
          </ul>
          <p>
            Bu yanaşma{" "}
            <Term tip="Sənədi verən qurumun rəqəmsal imzasını daşıyan və proqram təminatının həmin qurumla əlaqə saxlamadan yoxlaya bildiyi rəqəmsal sənəd." en="verifiable credential">yoxlanıla bilən rəqəmsal sənəd</Term>{" "}
            adlanır və Avropa İttifaqının (Aİ) yeni rəqəmsal şəxsiyyət çərçivəsi onun üzərində qurulur. Tamga Network eyni
            çərçivəni Türk dünyası üçün qurur.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Bugünkü düzen sahteciliğe açık, yavaş ve pahalı; belgeler sınırda takılıyor.",
        en: "Today's system is open to forgery, slow and expensive; documents get stuck at borders.",
        tk: "Häzirki tertip galplyga açyk, haýal we gymmat.",
        az: "Bugünkü sistem saxtakarlığa açıq, yavaş və bahadır; sənədlər sərhədlərdə ilişib qalır.",
      },
      {
        tr: "PDF yalnızca kâğıdın kopyasıdır; kimden geldiğini ve geçerliliğini kanıtlamaz.",
        en: "A PDF is just a copy of paper; it proves neither origin nor validity.",
        tk: "PDF diňe kagyzyň nusgasy; gelip çykyşyny subut etmeýär.",
        az: "PDF sadəcə kağızın surətidir; nə mənşəyi, nə də etibarlılığı sübut edir.",
      },
      {
        tr: "Çözüm, kanıtı belgenin içine koymaktır: imzalı, kişiye bağlı, ortak kurallarla denetlenen doğrulanabilir belge.",
        en: "The fix is to put the proof inside the document: a signed, person-bound verifiable credential checked by shared rules.",
        tk: "Çözgüt subutnamany resminamanyň içine goýmak.",
        az: "Həll yolu sübutu sənədin içinə yerləşdirməkdir: imzalanmış, şəxsə bağlı və ortaq qaydalarla yoxlanılan yoxlanıla bilən rəqəmsal sənəd.",
      },
    ],
    deeper: [
      {
        label: { tr: "Kullanım durumları (ARF §2)", en: "Use cases (ARF §2)", tk: "Ulanyş ýagdaýlary (ARF §2)", az: "İstifadə halları (ARF §2)" },
        href: "architecture",
        kind: "arf",
      },
      {
        label: { tr: "Belge biçimleri", en: "Credential formats", tk: "Resminama görnüşleri", az: "Rəqəmsal sənəd formatları" },
        href: "/concepts/credential-formats",
        kind: "docs",
      },
    ],
  },
  {
    slug: "identity-models",
    chapter: 1,
    order: 3,
    minutes: 5,
    title: {
      tr: "Dijital kimliğin üç modeli",
      en: "Three models of digital identity",
      tk: "Sanly şahsyýetiň üç modeli",
      az: "Rəqəmsal şəxsiyyətin üç modeli",
    },
    summary: {
      tr: "Merkezi hesap, \"X ile giriş yap\" ve kişinin cüzdanı: her modelin artısı ve eksisi.",
      en: "The central account, \"sign in with X\" and the person's wallet: the pros and cons of each.",
      tk: "Merkezi hasap, \"X bilen gir\" we adamyň gapjygy: her modeliň artykmaçlygy we kemçiligi.",
      az: "Mərkəzi hesab, \"X ilə daxil ol\" və şəxsin rəqəmsal cüzdanı: hər birinin üstün və zəif cəhətləri.",
    },
    body: {
      tr: (
        <>
          <p>
            İnternette kim olduğunuzu kanıtlamanın üç temel yolu var. Hepsini her gün kullanıyoruz; aralarındaki fark,
            verinin nerede durduğu ve kontrolün kimde olduğu.
          </p>
          <Figure caption={MODELS_L.tr.caption}>
            <ModelsDiagram l={MODELS_L.tr} />
          </Figure>
          <h2>1. Merkezi hesap</h2>
          <p>
            Her site için ayrı bir hesap açarsınız: kullanıcı adı, şifre, bazen kimlik bilgileriniz. Site bu bilgileri
            kendi veritabanında saklar. Basittir, ama her site ayrı bir şifre ve ayrı bir veri yığını demektir. Bir site
            saldırıya uğradığında bilgileriniz de gider. Kimliğinizi kanıtlamanın yolu da çoğu zaman yine bir belge
            fotokopisi yüklemektir.
          </p>
          <h2>2. &quot;X ile giriş yap&quot;</h2>
          <p>
            &quot;Google ile giriş yap&quot; ya da bir devletin e-devlet girişi bu modelin örnekleridir. Bir{" "}
            <Term tip="Sizin adınıza kimliğinizi doğrulayan ve sitelere bildiren hizmet." en="identity provider">kimlik sağlayıcı</Term>{" "}
            sizi tanır ve sitelere &quot;bu kişi o&quot; der. Şifre yükünü azaltır, ama bir bedeli vardır: aracı her
            girişinizi görür, hangi siteye ne zaman girdiğinizi bilir. Aracı devre dışı kalırsa ya da erişimi keserse, ona
            bağlı her şey durur. Ayrıca aracının tanıdığı sınır, genellikle kendi ülkesi ya da kendi şirketidir.
          </p>
          <h2>3. Kişinin cüzdanı</h2>
          <p>
            Üçüncü modelde belgeler kişinin telefonundaki bir{" "}
            <Term tip="Dijital belgeleri ve onları kullanmaya yarayan anahtarları telefonda saklayan uygulama." en="wallet">cüzdanda</Term>{" "}
            durur. Üniversite diplomayı, devlet kimliği, organizatör bileti doğrudan kişiye verir. Bir site ya da kapı bir
            bilgi istediğinde kişi neyin istendiğini görür, onaylarsa yalnız o bilgi gider. Doğrulayan, belgenin imzasını
            denetler; belgeyi veren kuruma sormasına gerek kalmaz. Arada her girişi izleyen bir aracı yoktur.
          </p>
          <p>Bu modelin üç güçlü yanı var:</p>
          <ul>
            <li>
              <strong>Kontrol kişidedir.</strong> Ne paylaşılacağına kişi karar verir.
            </li>
            <li>
              <strong>Veri azdır.</strong> Yalnız gereken bilgi gider; yaş için doğum tarihi bile gerekmeyebilir.
            </li>
            <li>
              <strong>Sınır tanımaz.</strong> Kurallar ortaksa belge her ülkede aynı biçimde denetlenir.
            </li>
          </ul>
          <Callout kind="info" locale="tr">
            <p>
              Avrupa Birliği&apos;nin yeni dijital kimlik düzeni üçüncü modeli seçti. Tamga Network da aynı modeli, aynı
              standartlarla Türk dünyası için kurar. &quot;Tamga ile giriş yap&quot; bile bu modelle çalışır: site sizi
              tanır, ama her site için farklı bir takma ad görür; siteler sizi birbirine bağlayamaz.
            </p>
          </Callout>
          <h2>Modeller birbirini dışlamaz</h2>
          <p>
            Cüzdan modeli diğerlerini bir gecede ortadan kaldırmaz. Bir site yine kendi hesabını tutabilir, ama hesabı
            açarken kimliği fotokopi yerine cüzdandan gelen imzalı bir bilgiyle doğrular. Böylece değişen şey güvenin
            kaynağı olur. Artık bir aracının sözüne ya da bir fotokopiye değil, belgeyi veren kurumun imzasına güvenilir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Türk devletlerinin her birinin kendi e-devlet girişi var ve her biri kendi vatandaşı için iyi çalışıyor.
              Ama Almatı&apos;da verilen bir belgeyi Bakü&apos;deki bir sitenin denetlemesi için bu sistemlerin birbirine
              bağlanması gerekir. Cüzdan modelinde buna gerek kalmaz: ortak kurallar ve imzalı güven listeleri yeter.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            There are three basic ways to prove who you are online. We use all of them every day; what differs is where the
            data lives and who is in control.
          </p>
          <Figure caption={MODELS_L.en.caption}>
            <ModelsDiagram l={MODELS_L.en} />
          </Figure>
          <h2>1. The central account</h2>
          <p>
            You open a separate account for each site: username, password, sometimes your personal details. The site keeps
            them in its own database. It is simple, but every site means another password and another pile of data. When a
            site is breached, your data goes with it. And proving your identity usually still means uploading a photocopy.
          </p>
          <h2>2. &quot;Sign in with X&quot;</h2>
          <p>
            &quot;Sign in with Google&quot; or a government&apos;s e-government login are examples of this model. An{" "}
            <Term tip="A service that verifies who you are and tells websites on your behalf.">identity provider</Term> knows
            you and tells sites &quot;this is that person&quot;. It removes the password burden, but at a price: the
            intermediary sees every login and knows which site you visited when. If it goes down or cuts access, everything
            that depends on it stops. Its reach is usually limited to its own country or company.
          </p>
          <h2>3. The person&apos;s wallet</h2>
          <p>
            In the third model, credentials live in a{" "}
            <Term tip="An app that keeps digital credentials, and the keys needed to use them, on the phone.">wallet</Term> on
            the person&apos;s phone. The university issues the diploma, the state the ID, the organiser the ticket, directly
            to the person. When a site or a gate asks for something, the person sees what is requested and, if they approve,
            only that is shared. The verifier checks the credential&apos;s signature without asking the issuer. No
            intermediary watches each login.
          </p>
          <p>This model has three strengths:</p>
          <ul>
            <li>
              <strong>The person is in control.</strong> They decide what to share.
            </li>
            <li>
              <strong>Less data travels.</strong> Only what is needed; an age check may not even need the birth date.
            </li>
            <li>
              <strong>It crosses borders.</strong> With shared rules, a credential is checked the same way in every country.
            </li>
          </ul>
          <Callout kind="info" locale="en">
            <p>
              The European Union&apos;s new digital identity framework chose the third model. Tamga Network builds the same
              model, with the same standards, for the Turkic world. Even &quot;Sign in with Tamga&quot; works this way: the
              site recognises you, but each site sees a different pseudonym, so sites cannot link you to one another.
            </p>
          </Callout>
          <h2>The models are not mutually exclusive</h2>
          <p>
            The wallet model does not wipe out the others overnight. A site can still keep its own account, but when the
            account is opened, identity is verified with signed information from the wallet instead of a photocopy. What
            changes is the source of trust, which is now the issuer&apos;s signature instead of an intermediary&apos;s word or a copy.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Each Turkic state has its own e-government login, and each works well for its own citizens. But for a site in
              Baku to check a document issued in Almaty, those systems would have to be connected. In the wallet model this
              is unnecessary: shared rules and signed trust lists are enough.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Internetde kimdigiňi subut etmegiň üç esasy ýoly bar; tapawut maglumatyň nirede durýandygynda we kararyň kimdedigindedir.</p>
          <Figure caption={MODELS_L.tk.caption}>
            <ModelsDiagram l={MODELS_L.tk} />
          </Figure>
          <h2>1. Merkezi hasap</h2>
          <p>Her saýt üçin aýratyn hasap we açar söz. Saýt döwülse, maglumatyňyz hem gidýär.</p>
          <h2>2. &quot;X bilen gir&quot;</h2>
          <p>
            Bir <Term tip="Siziň adyňyzdan şahsyýetiňizi tassyklaýan we saýtlara habar berýän hyzmat." en="identity provider">şahsyýet üpjün edijisi</Term>{" "}
            sizi tanaýar. Aňsat, ýöne araçy her girişi görýär we hemme zat oňa bagly.
          </p>
          <h2>3. Adamyň gapjygy</h2>
          <p>
            Resminamalar adamyň telefonyndaky{" "}
            <Term tip="Sanly resminamalary we olary ulanmak üçin açarlary telefonda saklaýan programma." en="wallet">gapjykda</Term>{" "}
            durýar. Adam näme soralýandygyny görýär, razy bolsa diňe şol maglumat gidýär. Barlaýjy goly barlaýar; araçy ýok.
          </p>
          <Callout kind="info" locale="tk">
            <p>Ýewropa Bileleşigi üçünji modeli saýlady; Tamga Network hem şol modeli türki dünýä üçin gurýar.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>
              Her türki döwletiň öz e-hökümet girişi bar. Almatyda berlen resminamany Bakudaky saýtyň barlamagy üçin
              gapjyk modelinde ulgamlary birikdirmek gerek däl: umumy düzgünler we gol çekilen ynam sanawlary ýeterlik.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Onlayn mühitdə kim olduğunuzu sübut etməyin üç əsas yolu var. Hamısından hər gün istifadə edirik; fərq
            məlumatın harada saxlandığında və nəzarətin kimdə olduğundadır.
          </p>
          <Figure caption={MODELS_L.az.caption}>
            <ModelsDiagram l={MODELS_L.az} />
          </Figure>
          <h2>1. Mərkəzi hesab</h2>
          <p>
            Hər sayt üçün ayrıca hesab açırsınız: istifadəçi adı, parol, bəzən də şəxsi məlumatlarınız. Sayt bunları öz
            verilənlər bazasında saxlayır. Bu sadədir, lakin hər yeni sayt yeni bir parol və yeni bir məlumat yığını
            deməkdir. Sayt kiberhücuma məruz qaldıqda məlumatlarınız da sızır. Şəxsiyyətinizi sübut etmək isə adətən yenə də
            surət yükləmək deməkdir.
          </p>
          <h2>2. &quot;X ilə daxil ol&quot;</h2>
          <p>
            &quot;Google ilə daxil ol&quot; və ya dövlətin e-hökumət girişi bu modelin nümunələridir.{" "}
            <Term tip="Kim olduğunuzu yoxlayan və bunu sizin adınızdan saytlara bildirən xidmət." en="identity provider">Şəxsiyyət provayderi</Term>{" "}
            sizi tanıyır və saytlara &quot;bu, həmin şəxsdir&quot; deyir. Bu, parol yükünü aradan qaldırır, lakin bunun
            bir bədəli var: vasitəçi hər girişi görür və hansı sayta nə vaxt daxil olduğunuzu bilir. O, sıradan çıxarsa və
            ya girişi kəsərsə, ondan asılı olan hər şey dayanır. Onun əhatə dairəsi də adətən öz ölkəsi və ya şirkəti ilə
            məhdudlaşır.
          </p>
          <h2>3. Şəxsin rəqəmsal cüzdanı</h2>
          <p>
            Üçüncü modeldə rəqəmsal sənədlər şəxsin telefonundakı{" "}
            <Term tip="Rəqəmsal sənədləri və onlardan istifadə üçün lazım olan açarları telefonda saxlayan tətbiq." en="wallet">rəqəmsal cüzdanda</Term>{" "}
            saxlanılır. Universitet diplomu, dövlət şəxsiyyət vəsiqəsini, təşkilatçı bileti birbaşa şəxsə verir. Sayt və ya
            giriş qapısı nəyisə tələb etdikdə şəxs nəyin istənildiyini görür və razılıq verərsə, yalnız həmin məlumat
            paylaşılır. Yoxlayan tərəf rəqəmsal sənədin imzasını sənədi verən quruma müraciət etmədən yoxlayır. Hər girişi
            izləyən vasitəçi yoxdur.
          </p>
          <p>Bu modelin üç güclü tərəfi var:</p>
          <ul>
            <li>
              <strong>Nəzarət şəxsdədir.</strong> Nəyi paylaşacağına özü qərar verir.
            </li>
            <li>
              <strong>Daha az məlumat ötürülür.</strong> Yalnız lazım olan; yaş yoxlaması üçün hətta doğum tarixi də lazım
              olmaya bilər.
            </li>
            <li>
              <strong>Sərhədləri aşır.</strong> Ortaq qaydalar olduqda rəqəmsal sənəd hər ölkədə eyni şəkildə yoxlanılır.
            </li>
          </ul>
          <Callout kind="info" locale="az">
            <p>
              Avropa İttifaqının (Aİ) yeni rəqəmsal şəxsiyyət çərçivəsi üçüncü modeli seçdi. Tamga Network eyni modeli,
              eyni standartlarla Türk dünyası üçün qurur. Hətta &quot;Tamga ilə daxil ol&quot; da bu şəkildə işləyir: sayt
              sizi tanıyır, lakin hər sayt fərqli bir psevdonim görür, buna görə də saytlar sizi bir-biri ilə
              əlaqələndirə bilmir.
            </p>
          </Callout>
          <h2>Modellər bir-birini istisna etmir</h2>
          <p>
            Rəqəmsal cüzdan modeli digərlərini bir gecədə aradan qaldırmır. Sayt yenə də öz hesabını saxlaya bilər, lakin
            hesab açılarkən şəxsiyyət surət əvəzinə rəqəmsal cüzdandan gələn imzalanmış məlumatla yoxlanılır.
            Beləliklə dəyişən etibarın mənbəyi olur. Artıq vasitəçinin sözünə və ya surətə deyil, sənədi verən qurumun imzasına etibar edilir.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Hər bir türk dövlətinin öz e-hökumət girişi var və hər biri öz vətəndaşları üçün yaxşı işləyir. Lakin
              Bakıdakı bir saytın Almatıda verilmiş sənədi yoxlaya bilməsi üçün bu sistemlər bir-birinə qoşulmalı olardı.
              Rəqəmsal cüzdan modelində buna ehtiyac yoxdur: ortaq qaydalar və imzalanmış etibar siyahıları kifayətdir.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Merkezi hesapta veri her sitede birikir; federe girişte aracı her girişi görür.",
        en: "With central accounts data piles up at every site; with federated login the intermediary sees every login.",
        tk: "Merkezi hasapda maglumat her saýtda ýygnanýar; federe girişde araçy her girişi görýär.",
        az: "Mərkəzi hesablarda məlumat hər saytda toplanır; federativ girişdə isə vasitəçi hər girişi görür.",
      },
      {
        tr: "Cüzdan modelinde belge kişide durur, kişi onaylar, doğrulayan imzayı kuruma sormadan denetler.",
        en: "In the wallet model the person holds the credential and consents; the verifier checks the signature without asking the issuer.",
        tk: "Gapjyk modelinde resminama adamda, barlaýjy goly guramadan soraman barlaýar.",
        az: "Rəqəmsal cüzdan modelində rəqəmsal sənəd şəxsdə saxlanılır və şəxs razılıq verir; yoxlayan tərəf imzanı sənədi verən quruma müraciət etmədən yoxlayır.",
      },
      {
        tr: "AB ve Tamga Network cüzdan modelini seçti; ortak kurallarla belge sınır tanımaz.",
        en: "The EU and Tamga Network chose the wallet model; with shared rules credentials cross borders.",
        tk: "ÝB we Tamga Network gapjyk modelini saýlady.",
        az: "Avropa İttifaqı (Aİ) və Tamga Network rəqəmsal cüzdan modelini seçdi; ortaq qaydalarla rəqəmsal sənədlər sərhədləri aşır.",
      },
    ],
    deeper: [
      { label: { tr: "Belge gösterme", en: "Presentation", tk: "Görkezmek", az: "Təqdimat" }, href: "/concepts/presentation", kind: "docs" },
      {
        label: { tr: "“Tamga ile giriş yap” eklemek", en: "Adding “Sign in with Tamga”", tk: "“Tamga bilen gir” goşmak", az: "“Tamga ilə daxil ol” əlavə etmək" },
        href: "/guides/sign-in-with-tamga",
        kind: "docs",
      },
      { label: { tr: "Mimari (ARF)", en: "Architecture (ARF)", tk: "Arhitektura (ARF)", az: "Arxitektura (ARF)" }, href: "architecture", kind: "arf" },
    ],
  },
  {
    slug: "trust-triangle",
    chapter: 1,
    order: 4,
    minutes: 4,
    diagram: "flow",
    title: { tr: "Güven üçgeni", en: "The trust triangle", tk: "Ynam üçburçlugy", az: "Etibar üçbucağı" },
    summary: {
      tr: "Belge veren, kişi ve doğrulayan: kim kime, neden güveniyor.",
      en: "Issuer, person and verifier: who trusts whom, and why.",
      tk: "Resminama beriji, adam we barlaýjy: kim kime we näme üçin ynanýar.",
      az: "Sənədi verən qurum, şəxs və yoxlayan tərəf: kim kimə və niyə etibar edir.",
    },
    body: {
      tr: (
        <>
          <p>
            Cüzdan modelindeki her işlem üç taraf arasında geçer. Bu üçlüye <strong>güven üçgeni</strong> denir. Tamga
            Network&apos;ün bütün kuralları, bu üç tarafın birbirine nasıl güveneceğini tarif eder.
          </p>
          <h2>Üç taraf</h2>
          <ul>
            <li>
              <strong>
                <Term tip="Belgeyi hazırlayıp imzalayan ve kişiye veren kurum: üniversite, meslek odası, bilet satıcısı, devlet kurumu." en="issuer">Belge veren</Term>
              </strong>
              . Bir bilginin doğruluğundan sorumlu kurum. Diplomayı üniversite, bileti organizatör, meslek belgesini meslek
              odası verir.
            </li>
            <li>
              <strong>
                <Term tip="Belgenin kendisi hakkında olduğu ve belgeyi cüzdanında taşıyan kişi." en="holder">Belge sahibi</Term>
              </strong>
              . Belgeyi cüzdanında taşıyan ve ne zaman, kime göstereceğine karar veren kişi.
            </li>
            <li>
              <strong>
                <Term tip="Bir belgeyi isteyen ve imzasını, geçerliliğini denetleyen taraf: işveren, site, kapı, banka." en="verifier">Doğrulayan</Term>
              </strong>
              . Bir bilgiye ihtiyaç duyan taraf: işe alım yapan şirket, konser kapısı, banka, bir web sitesi.
            </li>
          </ul>
          <h2>Kim kime güveniyor?</h2>
          <p>
            İlginç olan şu: doğrulayan, belge sahibine güvenmek zorunda değil. Belge sahibi bir bilgiyi gösterir, doğrulayan
            imzaya bakar ve şunu sorar: &quot;Bu imza gerçekten belgeyi veren kuruma mı ait?&quot; Yani asıl güven,
            doğrulayan ile belge veren arasındadır. Belge sahibi ise iki şeyden emin olmak ister: belgesini yalnız onayladığı
            kişiye gösterdiğinden ve karşısındakinin gerçekten iddia ettiği kişi olduğundan.
          </p>
          <h2>Dördüncü köşe: güven listesi</h2>
          <p>
            Doğrulayan, dünyadaki her üniversiteyi tek tek tanıyamaz. Bir imzanın gerçekten Örnek Üniversite&apos;ye ait
            olduğunu nereden bilecek? Cevap, herkesin bakabildiği imzalı bir listedir: hangi kurumların belge verebileceğini,
            hangi doğrulayıcıların kayıtlı olduğunu ve hangi cüzdanların kurallara uyduğunu yazan{" "}
            <Term tip="Bir ülkede hangi kurumların belge verebileceğini, hangi doğrulayıcı ve cüzdanların kayıtlı olduğunu yazan imzalı, herkese açık liste." en="trust list">güven listesi</Term>
            . Tamga Network&apos;te bu listeyi her devlet kendisi yayınlar; bugün Türkiye listesini Tamga, devlet adına
            geçici olarak işletir.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Doğrulama anında belgeyi veren kuruma hiç soru gitmez. Doğrulayan imzayı listeye karşı denetler, iptal
              durumunu herkese açık bir iptal listesinden okur. Böylece üniversite, diplomanın kime ve nerede gösterildiğini
              öğrenmez; kişinin gizliliği korunur.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tr">
            <p>
              Türk dünyasında ortak bir ağın anlamı tam olarak budur: Aşkabat&apos;taki bir doğrulayan, Türkiye listesine
              bakarak Ankara&apos;daki bir kurumun imzasını, Kazakistan listesine bakarak Almatı&apos;daki bir kurumun
              imzasını aynı yolla denetleyebilir. Her devlet kendi listesinin sahibidir; ağ, listelerin birbirini bulmasını
              sağlar.
            </p>
          </Callout>
          <p>
            Bu bölümde kimliğin ne olduğunu, bugünkü sorunları, modelleri ve güven üçgenini gördük. Sonraki bölümde
            üçgenin içindeki teknolojiyi açıyoruz: imza, sertifika ve dijital belgenin kendisi.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Every transaction in the wallet model happens between three parties. They form the <strong>trust triangle</strong>.
            All of Tamga Network&apos;s rules describe how these three can trust each other.
          </p>
          <h2>Three parties</h2>
          <ul>
            <li>
              <strong>
                <Term tip="The institution that prepares, signs and issues the credential: a university, a professional chamber, a ticket seller, a public body.">Issuer</Term>
              </strong>
              . The institution responsible for the truth of a piece of information. The university issues the diploma, the
              organiser the ticket, the chamber the licence.
            </li>
            <li>
              <strong>
                <Term tip="The person the credential is about, who carries it in their wallet.">Holder</Term>
              </strong>
              . The person who carries the credential in their wallet and decides when, and to whom, to show it.
            </li>
            <li>
              <strong>
                <Term tip="The party that requests a credential and checks its signature and validity: an employer, a site, a gate, a bank.">Verifier</Term>
              </strong>
              . The party that needs the information: a hiring company, a concert gate, a bank, a website.
            </li>
          </ul>
          <h2>Who trusts whom?</h2>
          <p>
            The interesting part is that the verifier does not have to trust the holder. The holder shows a piece of
            information, the verifier looks at the signature and asks, &quot;Does this signature really belong to the
            issuer?&quot; So the real trust is between the verifier and the issuer. The holder, in turn, wants two
            assurances: that the credential goes only to whom they approved, and that the other side really is who it
            claims to be.
          </p>
          <h2>The fourth corner: the trust list</h2>
          <p>
            A verifier cannot know every university in the world. How would it know that a signature really belongs to
            Example University? The answer is a signed list anyone can read: a{" "}
            <Term tip="A signed, public list of which institutions in a country may issue credentials and which verifiers and wallets are registered.">trust list</Term>{" "}
            that says which institutions may issue credentials, which verifiers are registered and which wallets follow the
            rules. In Tamga Network each state publishes its own list; today Tamga operates the Türkiye list provisionally,
            on behalf of the state.
          </p>
          <Callout kind="info" locale="en">
            <p>
              At the moment of verification no question goes to the issuer. The verifier checks the signature against the
              list and reads the revocation status from a public status list. The university never learns where or to whom
              the diploma was shown, so the person&apos;s privacy is protected.
            </p>
          </Callout>
          <Callout kind="turkic" locale="en">
            <p>
              This is exactly what a shared network means for the Turkic world: a verifier in Ashgabat can check an
              institution&apos;s signature from Ankara against the Türkiye list, and one from Almaty against the Kazakhstan
              list, in the same way. Each state owns its list; the network lets the lists find each other.
            </p>
          </Callout>
          <p>
            In this chapter we covered what identity is, today&apos;s problems, the models and the trust triangle. The next
            chapter opens up the technology inside the triangle: signatures, certificates and the credential itself.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Gapjyk modelindäki her amal üç tarapyň arasynda geçýär; bu <strong>ynam üçburçlugy</strong> diýilýär.
          </p>
          <h2>Üç tarap</h2>
          <ul>
            <li>
              <strong>
                <Term tip="Resminamany taýýarlaýan, gol çekýän we adama berýän gurama." en="issuer">Resminama beriji</Term>
              </strong>
              : uniwersitet, gurnaýjy, kär palatasy.
            </li>
            <li>
              <strong>
                <Term tip="Resminama özi barada bolan we ony gapjygynda saklaýan adam." en="holder">Resminamanyň eýesi</Term>
              </strong>
              : resminamany haçan we kime görkezjegini özi çözýär.
            </li>
            <li>
              <strong>
                <Term tip="Resminamany soraýan we goluny, güýjündeligini barlaýan tarap." en="verifier">Barlaýjy</Term>
              </strong>
              : iş beriji, saýt, gapy, bank.
            </li>
          </ul>
          <h2>Dördünji burç: ynam sanawy</h2>
          <p>
            Barlaýjy her uniwersiteti tanap bilmeýär. Haýsy guramalaryň resminama berip biljekdigini ýazýan, gol çekilen
            açyk{" "}
            <Term tip="Bir ýurtda haýsy guramalaryň resminama berip biljekdigini görkezýän gol çekilen açyk sanaw." en="trust list">ynam sanawy</Term>{" "}
            bar. Tamga Network-da her döwlet öz sanawyny çap edýär.
          </p>
          <Callout kind="info" locale="tk">
            <p>Barlag wagtynda beriji gurama hiç hili sorag gitmeýär; uniwersitet diplomyň nirede görkezilendigini bilmeýär.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>
              Aşgabatdaky barlaýjy Ankara guramasynyň goluny Türkiýe sanawy, Almatynyňkyny Gazagystan sanawy boýunça şol
              bir ýol bilen barlap bilýär. Her döwlet öz sanawynyň eýesi.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Rəqəmsal cüzdan modelində hər əməliyyat üç tərəf arasında baş verir. Onlar <strong>etibar üçbucağını</strong>{" "}
            təşkil edir. Tamga Network-un bütün qaydaları bu üç tərəfin bir-birinə necə etibar edə biləcəyini təsvir edir.
          </p>
          <h2>Üç tərəf</h2>
          <ul>
            <li>
              <strong>
                <Term tip="Rəqəmsal sənədi hazırlayan, imzalayan və verən qurum: universitet, peşə palatası, bilet satıcısı, dövlət orqanı." en="issuer">Sənədi verən qurum</Term>
              </strong>
              . Məlumatın doğruluğuna cavabdeh olan qurum. Diplomu universitet, bileti təşkilatçı, lisenziyanı palata verir.
            </li>
            <li>
              <strong>
                <Term tip="Rəqəmsal sənədin aid olduğu və onu öz rəqəmsal cüzdanında daşıyan şəxs." en="holder">Sənəd sahibi</Term>
              </strong>
              . Rəqəmsal sənədi öz cüzdanında daşıyan və onu nə vaxt, kimə göstərəcəyinə qərar verən şəxs.
            </li>
            <li>
              <strong>
                <Term tip="Rəqəmsal sənədi tələb edən və onun imzasını və etibarlılığını yoxlayan tərəf: işəgötürən, sayt, giriş qapısı, bank." en="verifier">Yoxlayan tərəf</Term>
              </strong>
              . Məlumata ehtiyacı olan tərəf: işə qəbul edən şirkət, konsert girişi, bank, veb-sayt.
            </li>
          </ul>
          <h2>Kim kimə etibar edir?</h2>
          <p>
            Maraqlı məqam budur: yoxlayan tərəf sənəd sahibinə etibar etmək məcburiyyətində deyil. Sənəd sahibi bir məlumat
            göstərir, yoxlayan tərəf imzaya baxır və soruşur: &quot;Bu imza həqiqətən sənədi verən quruma
            məxsusdurmu?&quot; Deməli, əsl etibar yoxlayan tərəflə sənədi verən qurum arasındadır. Sənəd sahibi isə öz
            növbəsində iki şeyə əmin olmaq istəyir: rəqəmsal sənədin yalnız onun razılıq verdiyi tərəfə getdiyinə və qarşı
            tərəfin həqiqətən özünü təqdim etdiyi tərəf olduğuna.
          </p>
          <h2>Dördüncü künc: etibar siyahısı</h2>
          <p>
            Yoxlayan tərəf dünyadakı bütün universitetləri tanıya bilməz. İmzanın həqiqətən Nümunə Universitetinə məxsus
            olduğunu haradan bilsin? Cavab hər kəsin oxuya biləcəyi imzalanmış siyahıdır: hansı qurumların rəqəmsal sənəd
            verə biləcəyini, hansı yoxlayan tərəflərin qeydiyyatda olduğunu və hansı rəqəmsal cüzdanların qaydalara uyğun
            olduğunu göstərən{" "}
            <Term tip="Bir ölkədə hansı qurumların rəqəmsal sənəd verə biləcəyini, hansı yoxlayan tərəflərin və rəqəmsal cüzdanların qeydiyyatda olduğunu göstərən imzalanmış, açıq siyahı." en="trust list">etibar siyahısı</Term>
            . Tamga Network-da hər dövlət öz siyahısını dərc edir; bu gün Türkiyə siyahısını dövlət adından müvəqqəti
            olaraq Tamga idarə edir.
          </p>
          <Callout kind="info" locale="az">
            <p>
              Yoxlama anında sənədi verən quruma heç bir sorğu getmir. Yoxlayan tərəf imzanı siyahı ilə tutuşdurur və ləğv
              statusunu açıq status siyahısından oxuyur. Universitet diplomun harada və kimə göstərildiyini heç vaxt
              öyrənmir, beləliklə şəxsin məxfiliyi qorunur.
            </p>
          </Callout>
          <Callout kind="turkic" locale="az">
            <p>
              Ortaq şəbəkənin Türk dünyası üçün mənası məhz budur: Aşqabaddakı yoxlayan tərəf Ankaradan olan qurumun
              imzasını Türkiyə siyahısı, Almatıdan olanı isə Qazaxıstan siyahısı əsasında eyni şəkildə yoxlaya bilər. Hər
              dövlət öz siyahısının sahibidir; şəbəkə isə siyahıların bir-birini tapmasına imkan verir.
            </p>
          </Callout>
          <p>
            Bu bölmədə şəxsiyyətin nə olduğunu, bugünkü problemləri, modelləri və etibar üçbucağını nəzərdən keçirdik.
            Növbəti bölmə üçbucağın içindəki texnologiyanı açır: imzalar, sertifikatlar və rəqəmsal sənədin özü.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Güven üçgeni: belge veren, belge sahibi ve doğrulayan.",
        en: "The trust triangle: issuer, holder and verifier.",
        tk: "Ynam üçburçlugy: beriji, eýe we barlaýjy.",
        az: "Etibar üçbucağı: sənədi verən qurum, sənəd sahibi və yoxlayan tərəf.",
      },
      {
        tr: "Asıl güven doğrulayan ile belge veren arasındadır; imza bunu taşır.",
        en: "The real trust is between verifier and issuer; the signature carries it.",
        tk: "Esasy ynam barlaýjy bilen berijiniň arasynda; gol ony göterýär.",
        az: "Əsl etibar yoxlayan tərəflə sənədi verən qurum arasındadır; onu imza daşıyır.",
      },
      {
        tr: "Güven listesi dördüncü köşedir: kimin belge verebileceğini herkes aynı listeden okur; kuruma soru gitmez.",
        en: "The trust list is the fourth corner: everyone reads who may issue from the same list; no question goes to the issuer.",
        tk: "Ynam sanawy dördünji burç: hemme şol bir sanawdan okaýar.",
        az: "Etibar siyahısı dördüncü küncdür: rəqəmsal sənədi kimin verə biləcəyini hər kəs eyni siyahıdan oxuyur; sənədi verən quruma heç bir sorğu getmir.",
      },
    ],
    deeper: [
      { label: { tr: "Güven listeleri", en: "Trust lists", tk: "Ynam sanawlary", az: "Etibar siyahıları" }, href: "/concepts/trust-lists", kind: "docs" },
      { label: { tr: "Roller (ARF)", en: "Roles (ARF)", tk: "Rollar (ARF)", az: "Rollar (ARF)" }, href: "roles", kind: "arf" },
      { label: { tr: "Mimari (ARF)", en: "Architecture (ARF)", tk: "Arhitektura (ARF)", az: "Arxitektura (ARF)" }, href: "architecture", kind: "arf" },
    ],
  },
];

import { Callout, Figure, Term } from "@/components/learn/prose";
import type { LearnPage } from "./types";

/* Bölüm 2 — Dijital belgenin yapı taşları: hash ve anahtarlar, imza, sertifika, belge, biçimler, cüzdan, alma/gösterme, iptal. */

/* ------------------------------------------------------------------ küçük şema parçaları (token renkleri: --dg-*) */

function NodeBox({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
  mono,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <g>
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
        fontSize={mono ? 12.5 : 14}
        fontWeight={600}
        fontFamily={mono ? "var(--font-mono, ui-monospace, monospace)" : undefined}
        fill="var(--dg-text)"
      >
        {title}
      </text>
      {sub ? (
        <text
          x={x + w / 2}
          y={y + h / 2 + 15}
          textAnchor="middle"
          fontSize={11.5}
          fontFamily={mono ? "var(--font-mono, ui-monospace, monospace)" : undefined}
          fill="var(--dg-muted)"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--dg-line-strong)" strokeWidth={1.5} markerEnd="url(#l2-arrow)" />
      {label ? (
        <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 8} textAnchor="middle" fontSize={11.5} fill="var(--dg-muted)">
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="l2-arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 Z" fill="var(--dg-line-strong)" />
      </marker>
      <pattern id="l2-grid" width={24} height={24} patternUnits="userSpaceOnUse">
        <path d="M24 0 H0 V24" fill="none" stroke="var(--dg-grid)" strokeWidth={1} />
      </pattern>
    </defs>
  );
}

/** Hash: farklı girdi → tamamen farklı parmak izi. Anahtar çifti: gizli anahtar sende, açık anahtar herkese. */
function HashKeysDiagram({ l }: { l: { hash: string; keys: string; priv: string; pub: string; privNote: string; pubNote: string; caption: string } }) {
  return (
    <svg viewBox="0 0 660 300" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={660} height={300} fill="url(#l2-grid)" />
      <text x={20} y={28} fontSize={12} fontWeight={600} letterSpacing={1.2} fill="var(--dg-muted)">
        {l.hash}
      </text>
      <NodeBox x={20} y={42} w={120} h={40} title="Merhaba" mono />
      <Arrow x1={142} y1={62} x2={196} y2={62} />
      <NodeBox x={200} y={42} w={100} h={40} title="SHA-256" accent />
      <Arrow x1={302} y1={62} x2={346} y2={62} />
      <NodeBox x={350} y={42} w={290} h={40} title="7fdc9f47…8c17c9c058" mono />
      <NodeBox x={20} y={94} w={120} h={40} title="merhaba" mono />
      <Arrow x1={142} y1={114} x2={196} y2={114} />
      <NodeBox x={200} y={94} w={100} h={40} title="SHA-256" accent />
      <Arrow x1={302} y1={114} x2={346} y2={114} />
      <NodeBox x={350} y={94} w={290} h={40} title="4c6bcdd5…8849b4d61b" mono />
      <text x={20} y={180} fontSize={12} fontWeight={600} letterSpacing={1.2} fill="var(--dg-muted)">
        {l.keys}
      </text>
      <NodeBox x={20} y={194} w={300} h={56} title={l.priv} sub={l.privNote} accent />
      <NodeBox x={340} y={194} w={300} h={56} title={l.pub} sub={l.pubNote} />
      <line x1={322} y1={222} x2={338} y2={222} stroke="var(--dg-accent)" strokeWidth={2} />
    </svg>
  );
}

/** İmza: belge + gizli anahtar → imza; doğrulama: açık anahtar → ✓ (değişmemiş, o kurumdan). */
function SignVerifyDiagram({
  l,
}: {
  l: { doc: string; sign: string; signNote: string; signed: string; verify: string; verifyNote: string; ok: string; caption: string };
}) {
  return (
    <svg viewBox="0 0 680 220" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={680} height={220} fill="url(#l2-grid)" />
      <NodeBox x={14} y={82} w={110} h={56} title={l.doc} />
      <Arrow x1={126} y1={110} x2={160} y2={110} />
      <NodeBox x={164} y={74} w={130} h={72} title={l.sign} sub={l.signNote} accent />
      <Arrow x1={296} y1={110} x2={330} y2={110} />
      <NodeBox x={334} y={82} w={120} h={56} title={l.signed} />
      <Arrow x1={456} y1={110} x2={490} y2={110} />
      <NodeBox x={494} y={74} w={110} h={72} title={l.verify} sub={l.verifyNote} />
      <Arrow x1={606} y1={110} x2={626} y2={110} />
      <circle cx={650} cy={110} r={20} fill="var(--dg-accent-soft)" stroke="var(--dg-ok)" strokeWidth={2} />
      <path d="M640 110 L647 117 L660 102" fill="none" stroke="var(--dg-ok)" strokeWidth={2.5} strokeLinecap="round" />
      <text x={650} y={154} textAnchor="middle" fontSize={11.5} fill="var(--dg-muted)">
        {l.ok}
      </text>
    </svg>
  );
}

/** İki biçim: SD-JWT VC (internet) ve mdoc (yüz yüze). */
function FormatsDiagram({
  l,
}: {
  l: { sd: string; sdWhere: string; sdItems: string[]; md: string; mdWhere: string; mdItems: string[]; same: string; caption: string };
}) {
  const card = (x: number, title: string, where: string, items: string[], accent: boolean) => (
    <g>
      <rect
        x={x}
        y={14}
        width={290}
        height={210}
        rx={16}
        fill={accent ? "var(--dg-accent-soft)" : "var(--dg-surface-2)"}
        stroke={accent ? "var(--dg-accent)" : "var(--dg-line)"}
        strokeWidth={1.5}
      />
      <text x={x + 145} y={44} textAnchor="middle" fontSize={16} fontWeight={700} fill="var(--dg-text)">
        {title}
      </text>
      <text x={x + 145} y={64} textAnchor="middle" fontSize={12} fill="var(--dg-muted)">
        {where}
      </text>
      {items.map((it, i) => (
        <NodeBox key={it} x={x + 22} y={80 + i * 46} w={246} h={36} title={it} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 640 270" role="img" aria-label={l.caption} className="h-auto w-full">
      <rect width={640} height={270} fill="url(#l2-grid)" />
      {card(20, l.sd, l.sdWhere, l.sdItems, true)}
      {card(330, l.md, l.mdWhere, l.mdItems, false)}
      <text x={320} y={252} textAnchor="middle" fontSize={12} fill="var(--dg-muted)">
        {l.same}
      </text>
    </svg>
  );
}

/** Cüzdan: belgeler + cihaz anahtarı (güvenli donanım) + cüzdan kanıtı + işlem günlüğü. */
function WalletDiagram({ l }: { l: { creds: string[]; key: string; keyNote: string; wia: string; wiaNote: string; log: string; caption: string } }) {
  return (
    <svg viewBox="0 0 640 330" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={640} height={330} fill="url(#l2-grid)" />
      <rect x={30} y={14} width={200} height={302} rx={30} fill="var(--dg-surface)" stroke="var(--dg-line-strong)" strokeWidth={2} />
      <rect x={96} y={26} width={68} height={6} rx={3} fill="var(--dg-line)" />
      {l.creds.map((c, i) => (
        <g key={c}>
          <rect
            x={48}
            y={50 + i * 52}
            width={164}
            height={42}
            rx={10}
            fill={i === 0 ? "var(--dg-accent)" : "var(--dg-accent-soft)"}
            stroke="var(--dg-accent)"
            strokeWidth={1.2}
          />
          <text
            x={130}
            y={76 + i * 52}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill={i === 0 ? "var(--dg-surface)" : "var(--dg-text)"}
          >
            {c}
          </text>
        </g>
      ))}
      <rect x={48} y={262} width={164} height={40} rx={10} fill="var(--dg-surface-2)" stroke="var(--dg-line)" strokeDasharray="4 4" />
      <text x={130} y={287} textAnchor="middle" fontSize={12} fill="var(--dg-muted)">
        {l.log}
      </text>
      <Arrow x1={232} y1={110} x2={316} y2={80} />
      <NodeBox x={320} y={48} w={300} h={64} title={l.key} sub={l.keyNote} accent />
      <Arrow x1={232} y1={180} x2={316} y2={200} />
      <NodeBox x={320} y={170} w={300} h={64} title={l.wia} sub={l.wiaNote} />
    </svg>
  );
}

/** İptal listesi: her belgeye bir konum; 1 = iptal. Doğrulayan listeyi indirir, kuruma sormaz. */
function StatusListDiagram({ l }: { l: { list: string; slot: string; revoked: string; verifier: string; verifierNote: string; caption: string } }) {
  const bits = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0];
  return (
    <svg viewBox="0 0 640 240" role="img" aria-label={l.caption} className="h-auto w-full">
      <Defs />
      <rect width={640} height={240} fill="url(#l2-grid)" />
      <text x={20} y={30} fontSize={12} fontWeight={600} letterSpacing={1.2} fill="var(--dg-muted)">
        {l.list}
      </text>
      {bits.map((b, i) => {
        const x = 20 + i * 38;
        const mine = i === 7;
        return (
          <g key={i}>
            <rect
              x={x}
              y={44}
              width={32}
              height={40}
              rx={6}
              fill={b ? "var(--dg-accent)" : "var(--dg-surface)"}
              stroke={mine ? "var(--dg-text)" : "var(--dg-line)"}
              strokeWidth={mine ? 2 : 1.2}
            />
            <text
              x={x + 16}
              y={70}
              textAnchor="middle"
              fontSize={13}
              fontFamily="var(--font-mono, ui-monospace, monospace)"
              fill={b ? "var(--dg-surface)" : "var(--dg-muted)"}
            >
              {b}
            </text>
          </g>
        );
      })}
      <line x1={302} y1={86} x2={302} y2={112} stroke="var(--dg-text)" strokeWidth={1.5} />
      <text x={302} y={128} textAnchor="middle" fontSize={12} fill="var(--dg-text)">
        {l.slot}
      </text>
      <text x={302} y={146} textAnchor="middle" fontSize={12} fill="var(--dg-muted)">
        {l.revoked}
      </text>
      <NodeBox x={170} y={164} w={300} h={58} title={l.verifier} sub={l.verifierNote} accent />
    </svg>
  );
}

/* ------------------------------------------------------------------ şema etiketleri */

const HASH_L = {
  tr: {
    hash: "HASH · PARMAK İZİ",
    keys: "ANAHTAR ÇİFTİ",
    priv: "Gizli anahtar",
    privNote: "yalnız sahibinde; imzalar",
    pub: "Açık anahtar",
    pubNote: "herkese açık; imzayı denetler",
    caption: "Tek harf değişince parmak izi tamamen değişir. Gizli anahtar imzalar, açık anahtar imzayı denetler.",
  },
  en: {
    hash: "HASH · FINGERPRINT",
    keys: "KEY PAIR",
    priv: "Private key",
    privNote: "kept by the owner; signs",
    pub: "Public key",
    pubNote: "public; checks signatures",
    caption: "Change one letter and the fingerprint changes completely. The private key signs, the public key checks.",
  },
  tk: {
    hash: "HEŞ · BARMAK YZY",
    keys: "AÇAR JÜBÜTI",
    priv: "Gizlin açar",
    privNote: "diňe eýesinde; gol çekýär",
    pub: "Açyk açar",
    pubNote: "hemmä açyk; goly barlaýar",
    caption: "Bir harp üýtgese barmak yzy düýbünden üýtgeýär. Gizlin açar gol çekýär, açyk açar barlaýar.",
  },
};

const SIGN_L = {
  tr: {
    doc: "Belge",
    sign: "İmzala",
    signNote: "gizli anahtarla",
    signed: "İmzalı belge",
    verify: "Denetle",
    verifyNote: "açık anahtarla",
    ok: "değişmemiş, o kurumdan",
    caption: "Kurum belgeyi gizli anahtarıyla imzalar; herkes açık anahtarla denetler.",
  },
  en: {
    doc: "Document",
    sign: "Sign",
    signNote: "with private key",
    signed: "Signed document",
    verify: "Verify",
    verifyNote: "with public key",
    ok: "unchanged, from that issuer",
    caption: "The institution signs with its private key; anyone verifies with the public key.",
  },
  tk: {
    doc: "Resminama",
    sign: "Gol çek",
    signNote: "gizlin açar bilen",
    signed: "Gol çekilen",
    verify: "Barla",
    verifyNote: "açyk açar bilen",
    ok: "üýtgemedik, şol guramadan",
    caption: "Gurama gizlin açary bilen gol çekýär; her kim açyk açar bilen barlaýar.",
  },
};

const FORMATS_L = {
  tr: {
    sd: "SD-JWT VC",
    sdWhere: "İnternet: siteler, uygulamalar",
    sdItems: ["JSON tabanlı", "Alan alan seçici paylaşım", "Web ve sunucular için kolay"],
    md: "mdoc",
    mdWhere: "Yüz yüze: kapı, gişe, tarayıcı",
    mdItems: ["ISO/IEC 18013-5 (ehliyet)", "Kompakt (CBOR)", "QR ve Bluetooth ile"],
    same: "Aynı belge, aynı kurallar: yalnız taşındığı biçim farklı.",
    caption: "Tamga iki biçimi de destekler: internet için SD-JWT VC, yüz yüze için mdoc.",
  },
  en: {
    sd: "SD-JWT VC",
    sdWhere: "Online: sites and apps",
    sdItems: ["JSON-based", "Field-by-field disclosure", "Easy for the web and servers"],
    md: "mdoc",
    mdWhere: "In person: gates, counters, browsers",
    mdItems: ["ISO/IEC 18013-5 (driving licence)", "Compact (CBOR)", "Over QR and Bluetooth"],
    same: "The same credential, the same rules: only the carrier format differs.",
    caption: "Tamga supports both formats: SD-JWT VC online, mdoc in person.",
  },
  tk: {
    sd: "SD-JWT VC",
    sdWhere: "Internet: saýtlar, programmalar",
    sdItems: ["JSON esasly", "Meýdan-meýdan paýlaşma", "Web üçin aňsat"],
    md: "mdoc",
    mdWhere: "Ýüzbe-ýüz: gapy, kassa",
    mdItems: ["ISO/IEC 18013-5", "Ykjam (CBOR)", "QR we Bluetooth bilen"],
    same: "Şol bir resminama, şol bir düzgünler: diňe görnüşi başga.",
    caption: "Tamga iki görnüşi hem goldaýar.",
  },
};

const WALLET_L = {
  tr: {
    creds: ["Kimlik belgesi", "Diploma", "Konser bileti", "Öğrenci belgesi"],
    key: "Cihaz anahtarı",
    keyNote: "telefonda üretilir, dışarı çıkmaz",
    wia: "Cüzdan kanıtı",
    wiaNote: "bu uygulama kurallara uyan bir cüzdan",
    log: "İşlem günlüğü (yalnız telefonda)",
    caption: "Cüzdan belgeleri, onları kullanmaya yarayan cihaz anahtarlarını ve kendi kanıtını taşır.",
  },
  en: {
    creds: ["Identity credential", "Diploma", "Concert ticket", "Student certificate"],
    key: "Device key",
    keyNote: "made on the phone, never leaves it",
    wia: "Wallet attestation",
    wiaNote: "this app is a compliant wallet",
    log: "Transaction log (on the phone only)",
    caption: "A wallet holds the credentials, the device keys needed to use them, and its own attestation.",
  },
  tk: {
    creds: ["Şahsyýet resminamasy", "Diplom", "Konsert bileti", "Talyp güwänamasy"],
    key: "Enjam açary",
    keyNote: "telefonda döredilýär, daşary çykmaýar",
    wia: "Gapjyk subutnamasy",
    wiaNote: "bu programma düzgünlere eýerýär",
    log: "Amal ýazgysy (diňe telefonda)",
    caption: "Gapjyk resminamalary, enjam açarlaryny we öz subutnamasyny saklaýar.",
  },
};

const STATUS_L = {
  tr: {
    list: "İPTAL LİSTESİ · HER BELGEYE BİR KONUM",
    slot: "Sizin belgenizin konumu: 7",
    revoked: "1 = iptal edilmiş, 0 = geçerli",
    verifier: "Doğrulayan",
    verifierNote: "listeyi indirir; kuruma kim olduğunu sormaz",
    caption: "Kurum iptal ettiği belgenin konumunu 1 yapar ve listeyi imzalayıp yayınlar.",
  },
  en: {
    list: "STATUS LIST · ONE POSITION PER CREDENTIAL",
    slot: "Your credential's position: 7",
    revoked: "1 = revoked, 0 = valid",
    verifier: "Verifier",
    verifierNote: "downloads the list; never asks who you are",
    caption: "The issuer sets a revoked credential's position to 1, then signs and publishes the list.",
  },
  tk: {
    list: "ÝATYRYLAN SANAW · HER RESMINAMA BIR ÝER",
    slot: "Siziň resminamaňyzyň ýeri: 7",
    revoked: "1 = ýatyrylan, 0 = dogry",
    verifier: "Barlaýjy",
    verifierNote: "sanawy göçürýär; guramadan soramaýar",
    caption: "Gurama ýatyran resminamasynyň ýerini 1 edýär we sanawy gol çekip çap edýär.",
  },
};

/* ------------------------------------------------------------------ sayfalar */

export const CHAPTER_2: LearnPage[] = [
  {
    slug: "cryptography-basics",
    chapter: 2,
    order: 1,
    minutes: 5,
    title: { tr: "Kriptografi sade dille", en: "Cryptography in plain words", tk: "Kriptografiýa ýönekeý dilde" },
    summary: {
      tr: "Hash bir parmak izidir, anahtar çifti bir kilit ve anahtardır: dijital güvenin iki temel aracı.",
      en: "A hash is a fingerprint, a key pair is a lock and its key: the two basic tools of digital trust.",
      tk: "Heş barmak yzydyr, açar jübüti gulp we onuň açarydyr: sanly ynamyň iki esasy guraly.",
    },
    body: {
      tr: (
        <>
          <p>
            Dijital güvenin arkasında matematik var, ama onu kullanmak için matematik bilmek gerekmiyor. Bilmeniz gereken
            yalnızca iki araç: <strong>hash</strong> ve <strong>anahtar çifti</strong>. Bu iki araç, bu öğrenme yolunun geri
            kalanındaki her şeyin temelidir.
          </p>
          <Figure caption={HASH_L.tr.caption}>
            <HashKeysDiagram l={HASH_L.tr} />
          </Figure>
          <h2>Hash: verinin parmak izi</h2>
          <p>
            Bir{" "}
            <Term tip="Her boyuttaki veriden sabit uzunlukta bir 'parmak izi' üreten tek yönlü hesap. Tamga'da SHA-256 kullanılır." en="hash">hash</Term>
            , bir veriden kısa ve sabit uzunlukta bir parmak izi üretir. Bir sayfalık metin de, bin sayfalık bir kitap da aynı
            uzunlukta bir parmak izine dönüşür. Üç özelliği vardır:
          </p>
          <ul>
            <li>
              <strong>Aynı veri, aynı iz.</strong> &quot;Merhaba&quot; kelimesinin izi her bilgisayarda aynıdır.
            </li>
            <li>
              <strong>Küçük değişiklik, bambaşka iz.</strong> Yalnız ilk harfi küçültün (&quot;merhaba&quot;), iz tamamen
              değişir. Şekilde iki kelimenin gerçek SHA-256 izlerinin başı ve sonu görünüyor.
            </li>
            <li>
              <strong>Geri dönüş yok.</strong> İzden verinin kendisi bulunamaz; parmak izinden insanın yüzünü çizemezsiniz.
            </li>
          </ul>
          <p>
            Bu yüzden hash, bir belgenin değişmediğini kanıtlamanın en kısa yoludur: belgenin izini saklarsınız, sonra yeniden
            hesaplayıp karşılaştırırsınız. Tek bir harf bile değiştiyse iz tutmaz.
          </p>
          <h2>Anahtar çifti: kilit ve anahtar</h2>
          <p>
            İkinci araç, birbirine bağlı iki anahtardan oluşan bir{" "}
            <Term tip="Birbirine matematiksel olarak bağlı iki anahtar: gizli anahtar imzalar, açık anahtar imzayı denetler." en="key pair">anahtar çiftidir</Term>
            :
          </p>
          <ul>
            <li>
              <strong>Gizli anahtar</strong> yalnızca sahibindedir. Bir kurumun sunucusunda ya da kişinin telefonunun güvenli
              bölgesinde durur ve hiç dışarı çıkmaz.
            </li>
            <li>
              <strong>Açık anahtar</strong> herkese açıktır. Herkes bilebilir, yayınlanabilir, listelere yazılabilir.
            </li>
          </ul>
          <p>
            Gizli anahtarla yapılan bir işlemi yalnızca o çiftin açık anahtarı denetleyebilir. Bir benzetmeyle: gizli anahtar
            bir mühür, açık anahtar o mührün herkesin elindeki örneğidir. Mührü yalnız sahibi basabilir, ama basılan izin o
            mühre ait olup olmadığını herkes karşılaştırabilir.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              &quot;Gizli anahtar çalınırsa ne olur?&quot; Bu yüzden Tamga&apos;nın kuralları anahtarların nerede ve nasıl
              saklanacağını sıkı biçimde belirler: kurumların imza anahtarları kendi kontrollerinde, kişilerin anahtarları
              telefonun güvenli donanımında durur. Anahtar ele geçirilirse ilgili sertifika iptal edilir.
            </p>
          </Callout>
          <h2>İkisi birlikte</h2>
          <p>
            Hash ve anahtar çifti bir araya gelince <strong>dijital imza</strong> ortaya çıkar: belgenin parmak izi gizli
            anahtarla imzalanır, herkes açık anahtarla denetler. Bir sonraki sayfa tam olarak bunu anlatıyor.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Bu araçların hiçbiri bir ülkeye ya da bir dile ait değildir. SHA-256 Bakü&apos;de de, Aşkabat&apos;ta da aynı
              sonucu verir. Ortak bir güven ağı kurmayı mümkün kılan da budur: matematik herkes için aynı çalışır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            Behind digital trust there is mathematics, but you do not need maths to use it. You only need two tools: the{" "}
            <strong>hash</strong> and the <strong>key pair</strong>. Everything else in this learning path is built on them.
          </p>
          <Figure caption={HASH_L.en.caption}>
            <HashKeysDiagram l={HASH_L.en} />
          </Figure>
          <h2>A hash: the fingerprint of data</h2>
          <p>
            A <Term tip="A one-way calculation that turns data of any size into a fixed-length fingerprint. Tamga uses SHA-256.">hash</Term>{" "}
            turns any data into a short, fixed-length fingerprint. One page of text and a thousand-page book both become a
            fingerprint of the same length. It has three properties:
          </p>
          <ul>
            <li>
              <strong>Same data, same fingerprint.</strong> The fingerprint of &quot;Merhaba&quot; is the same on every
              computer.
            </li>
            <li>
              <strong>Small change, completely different fingerprint.</strong> Lowercase just the first letter
              (&quot;merhaba&quot;) and the fingerprint changes completely. The figure shows the start and end of the two
              words&apos; real SHA-256 fingerprints.
            </li>
            <li>
              <strong>No way back.</strong> You cannot recover the data from the fingerprint, just as you cannot draw a face
              from a fingerprint.
            </li>
          </ul>
          <p>
            That makes a hash the shortest way to prove a document has not changed: keep its fingerprint, recompute it later
            and compare. If even one character changed, the fingerprints will not match.
          </p>
          <h2>A key pair: the seal and its imprint</h2>
          <p>
            The second tool is a{" "}
            <Term tip="Two mathematically linked keys: the private key signs, the public key checks the signature.">key pair</Term>
            , two keys that belong together:
          </p>
          <ul>
            <li>
              <strong>The private key</strong> is held only by its owner. It sits on an institution&apos;s server or in the
              secure area of a person&apos;s phone and never leaves.
            </li>
            <li>
              <strong>The public key</strong> is public. Anyone may know it; it can be published and written into lists.
            </li>
          </ul>
          <p>
            Only the public key of the same pair can check what the private key did. Think of the private key as a seal and
            the public key as a sample of its imprint that everyone holds: only the owner can press the seal, but anyone can
            compare an imprint with the sample.
          </p>
          <Callout kind="info" locale="en">
            <p>
              &quot;What if a private key is stolen?&quot; That is why Tamga&apos;s rules are strict about where and how
              keys are stored: institutions keep their signing keys under their own control, people&apos;s keys live in the
              phone&apos;s secure hardware. If a key is compromised, the related certificate is revoked.
            </p>
          </Callout>
          <h2>The two together</h2>
          <p>
            Combine a hash and a key pair and you get a <strong>digital signature</strong>: the document&apos;s fingerprint is
            signed with the private key, and anyone checks it with the public key. The next page explains exactly that.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              None of these tools belongs to one country or one language. SHA-256 gives the same result in Baku and in
              Ashgabat. That is what makes a shared trust network possible: the maths works the same for everyone.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Sanly ynamyň arkasynda matematika bar, ýöne ony ulanmak üçin matematika gerek däl. Iki gural ýeterlik:{" "}
            <strong>heş</strong> we <strong>açar jübüti</strong>.
          </p>
          <Figure caption={HASH_L.tk.caption}>
            <HashKeysDiagram l={HASH_L.tk} />
          </Figure>
          <h2>Heş: maglumatyň barmak yzy</h2>
          <p>
            <Term tip="Islendik maglumatdan hemişe deň uzynlykda barmak yzy döredýän bir taraplaýyn hasap. Tamga SHA-256 ulanýar." en="hash">Heş</Term>{" "}
            maglumatdan gysga barmak yzy döredýär: şol bir maglumat hemişe şol bir yzy berýär, bir harp üýtgese yz düýbünden
            üýtgeýär, yzdan maglumaty yzyna tapyp bolmaýar.
          </p>
          <h2>Açar jübüti</h2>
          <p>
            <Term tip="Biri-birine bagly iki açar: gizlin açar gol çekýär, açyk açar barlaýar." en="key pair">Açar jübüti</Term>{" "}
            iki açardan ybarat: gizlin açar diňe eýesinde durýar, açyk açar hemmä açyk. Gizlin açar möhür, açyk açar bolsa
            möhrüň her kimde bar bolan nusgasy ýalydyr.
          </p>
          <Callout kind="info" locale="tk">
            <p>Tamga düzgünleri açarlaryň nirede saklanmalydygyny berk kesgitleýär; açar ogurlansa sertifikat ýatyrylýar.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>SHA-256 Bakuda-da, Aşgabatda-da şol bir netijäni berýär: matematika hemmeler üçin birmeňzeş işleýär.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Hash, verinin kısa parmak izidir; tek harf değişse iz tamamen değişir.",
        en: "A hash is a short fingerprint of data; change one character and it changes completely.",
        tk: "Heş maglumatyň barmak yzy; bir harp üýtgese yz üýtgeýär.",
      },
      {
        tr: "Anahtar çiftinde gizli anahtar sahibinde kalır, açık anahtar herkese açıktır.",
        en: "In a key pair the private key stays with its owner, the public key is public.",
        tk: "Gizlin açar eýesinde galýar, açyk açar hemmä açyk.",
      },
      {
        tr: "İkisi birlikte dijital imzayı oluşturur.",
        en: "Together they make the digital signature.",
        tk: "Ikisi bilelikde sanly goly emele getirýär.",
      },
    ],
    deeper: [
      { label: { tr: "Sözlük", en: "Glossary", tk: "Sözlük" }, href: "/glossary", kind: "docs" },
      {
        label: { tr: "Belge biçimi ve protokoller", en: "Credential format and protocols", tk: "Resminama görnüşi" },
        href: "/specifications/credential-format",
        kind: "docs",
      },
    ],
  },
  {
    slug: "digital-signatures",
    chapter: 2,
    order: 2,
    minutes: 4,
    title: { tr: "Dijital imza", en: "Digital signatures", tk: "Sanly gol" },
    summary: {
      tr: "Dijital imza iki soruyu cevaplar: bunu kim imzaladı ve imzadan sonra değişti mi?",
      en: "A digital signature answers two questions: who signed this, and has it changed since?",
      tk: "Sanly gol iki soraga jogap berýär: muny kim gol çekdi we goldan soň üýtgedimi?",
    },
    body: {
      tr: (
        <>
          <p>
            Kâğıt üzerindeki ıslak imza taklit edilebilir, taranmış bir imza ise hiçbir şey kanıtlamaz; herkes bir resmi
            başka bir belgeye yapıştırabilir. Dijital imza bunlardan farklıdır: belgenin içeriğine matematiksel olarak
            bağlıdır.
          </p>
          <Figure caption={SIGN_L.tr.caption}>
            <SignVerifyDiagram l={SIGN_L.tr} />
          </Figure>
          <h2>Nasıl imzalanır?</h2>
          <p>
            Bir kurum belge verirken önce belgenin parmak izini (hash) çıkarır, sonra bu izi kendi{" "}
            <Term tip="Kurumun yalnız kendisinde duran ve imza atmaya yarayan anahtar." en="private key">gizli anahtarıyla</Term>{" "}
            imzalar. Ortaya çıkan imza belgeye eklenir. Tamga&apos;da belgeler{" "}
            <Term tip="Yaygın bir eliptik eğri imza algoritması (ECDSA P-256 + SHA-256). AB'nin dijital kimlik düzeninde de kullanılır." en="ES256">ES256</Term>{" "}
            algoritmasıyla imzalanır; AB&apos;nin dijital kimlik düzeni de aynı algoritmayı kullanır.
          </p>
          <h2>Nasıl denetlenir?</h2>
          <p>Doğrulayan üç şey yapar:</p>
          <ul>
            <li>Belgenin parmak izini yeniden hesaplar.</li>
            <li>İmzayı kurumun açık anahtarıyla çözer ve iki izi karşılaştırır.</li>
            <li>Açık anahtarın gerçekten o kuruma ait olduğunu güven listesinden kontrol eder.</li>
          </ul>
          <p>
            İzler tutuyorsa iki soru cevaplanmış olur: belge <strong>imzalandıktan sonra değişmemiştir</strong> ve{" "}
            <strong>o kurum tarafından imzalanmıştır</strong>. Tek bir harf değişse bile iz tutmaz ve imza geçersiz olur.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Dijital imzanın en önemli yanı şudur: denetlemek için kuruma sormak gerekmez. Açık anahtar zaten biliniyorsa
              doğrulama çevrim dışı bile yapılabilir. Bu, hem hızı hem gizliliği sağlar: üniversite, diplomanın nerede
              denetlendiğini öğrenmez.
            </p>
          </Callout>
          <h2>Elektronik imza ile farkı</h2>
          <p>
            Belgelerde gördüğümüz &quot;e-imza&quot;, kişinin bir sözleşmeyi imzalamasıdır; birçok ülkede{" "}
            <Term tip="Kanunda tanımlanan, ıslak imzayla eşdeğer sayılan elektronik imza." en="QES">nitelikli elektronik imza</Term>{" "}
            ıslak imzayla eşdeğer kabul edilir. Doğrulanabilir belgedeki imza ise kurumun &quot;bu bilgi doğrudur&quot;
            demesidir. Teknoloji aynıdır, amaç farklıdır. İkisi de aynı güven listelerine dayanabilir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Türk devletlerinin çoğunda elektronik imza yasası ve sertifika hizmet sağlayıcıları var. Ortak bir ağ, bu
              birikimin üzerine kurulur: imzanın matematiği aynı, eksik olan yalnızca imzalayanların herkesin okuyabildiği
              ortak bir listede yer almasıdır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            A handwritten signature can be forged, and a scanned signature proves nothing; anyone can paste an image into
            another document. A digital signature is different: it is mathematically bound to the content of the document.
          </p>
          <Figure caption={SIGN_L.en.caption}>
            <SignVerifyDiagram l={SIGN_L.en} />
          </Figure>
          <h2>How is it signed?</h2>
          <p>
            When an institution issues a credential, it first takes the document&apos;s fingerprint (hash), then signs that
            fingerprint with its{" "}
            <Term tip="The key held only by the institution, used to sign.">private key</Term>. The signature is attached to
            the document. In Tamga, credentials are signed with{" "}
            <Term tip="A widely used elliptic-curve signature algorithm (ECDSA P-256 + SHA-256), also used in the EU digital identity framework.">ES256</Term>
            , the same algorithm the EU digital identity framework uses.
          </p>
          <h2>How is it checked?</h2>
          <p>The verifier does three things:</p>
          <ul>
            <li>Recomputes the document&apos;s fingerprint.</li>
            <li>Opens the signature with the institution&apos;s public key and compares the two fingerprints.</li>
            <li>Checks in the trust list that the public key really belongs to that institution.</li>
          </ul>
          <p>
            If the fingerprints match, two questions are answered: the document <strong>has not changed since it was signed</strong>{" "}
            and it <strong>was signed by that institution</strong>. Change one character and the fingerprint no longer
            matches; the signature fails.
          </p>
          <Callout kind="info" locale="en">
            <p>
              The most important property of a digital signature: checking it does not require asking the institution. If
              the public key is already known, verification can even work offline. That gives both speed and privacy: the
              university never learns where its diploma was checked.
            </p>
          </Callout>
          <h2>How it differs from an e-signature</h2>
          <p>
            The &quot;e-signature&quot; we see on documents is a person signing, say, a contract; in many countries a{" "}
            <Term tip="An electronic signature defined in law as equivalent to a handwritten one.">qualified electronic signature</Term>{" "}
            counts the same as a handwritten one. The signature in a verifiable credential is the institution saying
            &quot;this information is correct&quot;. Same technology, different purpose; both can rely on the same trust
            lists.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Most Turkic states already have e-signature laws and certificate service providers. A shared network builds on
              that: the maths of the signature is the same; what is missing is a common list, readable by everyone, of who
              may sign.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Kagyz goly galplanyp bilner, skanerlenen gol hiç zady subut etmeýär. Sanly gol resminamanyň mazmunyna
            matematiki taýdan bagly.
          </p>
          <Figure caption={SIGN_L.tk.caption}>
            <SignVerifyDiagram l={SIGN_L.tk} />
          </Figure>
          <h2>Nädip gol çekilýär we barlanýar?</h2>
          <p>
            Gurama resminamanyň barmak yzyny öz{" "}
            <Term tip="Diňe guramada durýan we gol çekmäge hyzmat edýän açar." en="private key">gizlin açary</Term> bilen gol
            çekýär (Tamga-da ES256). Barlaýjy yzy täzeden hasaplaýar, goly açyk açar bilen barlaýar we açaryň şol guramanyňkydygyny
            ynam sanawyndan anyklaýar. Yzlar gabat gelse, resminama üýtgemedik we şol gurama tarapyndan gol çekilen.
          </p>
          <Callout kind="info" locale="tk">
            <p>Barlamak üçin guramadan soramak gerek däl; uniwersitet diplomyň nirede barlanandygyny bilmeýär.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>Türki döwletleriň köpüsinde elektron gol kanuny bar; umumy tor şol tejribäniň üstünde gurulýar.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Dijital imza belgenin içeriğine bağlıdır; tek harf değişse geçersiz olur.",
        en: "A digital signature is bound to the content; change one character and it fails.",
        tk: "Sanly gol mazmuna bagly; bir harp üýtgese ýalňyş bolýar.",
      },
      {
        tr: "Doğrulayan imzayı açık anahtarla, kuruma sormadan denetler.",
        en: "The verifier checks it with the public key, without asking the issuer.",
        tk: "Barlaýjy guramadan soraman barlaýar.",
      },
      {
        tr: "Açık anahtarın kime ait olduğunu güven listesi söyler.",
        en: "The trust list says whose public key it is.",
        tk: "Açyk açaryň kimiňkidigini ynam sanawy aýdýar.",
      },
    ],
    deeper: [
      { label: { tr: "SD-JWT VC profili", en: "SD-JWT VC profile", tk: "SD-JWT VC profili" }, href: "/specifications/sd-jwt-vc", kind: "docs" },
      {
        label: { tr: "Kurum kimliği (X.509)", en: "Institutional identity (X.509)", tk: "Gurama şahsyýeti (X.509)" },
        href: "/specifications/x509-identity",
        kind: "docs",
      },
    ],
  },
  {
    slug: "certificates",
    chapter: 2,
    order: 3,
    minutes: 5,
    diagram: "trust-chain",
    title: {
      tr: "Sertifikalar ve güven zinciri",
      en: "Certificates and the chain of trust",
      tk: "Sertifikatlar we ynam zynjyry",
    },
    summary: {
      tr: "Bir anahtarın gerçekten o kuruma ait olduğunu sertifikalar söyler: kök sertifikadan kurum sertifikasına uzanan zincir.",
      en: "Certificates tell us that a key really belongs to an institution: the chain from a root certificate to an institution's certificate.",
      tk: "Açaryň hakykatdan hem guramanyňkydygyny sertifikatlar aýdýar: kök sertifikatdan gurama sertifikatyna çenli zynjyr.",
    },
    body: {
      tr: (
        <>
          <p>
            Bir açık anahtar kendi başına yalnızca uzun bir sayıdır; üzerinde kimin olduğu yazmaz. Biri &quot;bu benim
            üniversitemin anahtarı&quot; diyerek sahte bir anahtar yayınlayabilir. Bu boşluğu{" "}
            <Term tip="Bir açık anahtarı bir kuruma bağlayan ve bunu daha üstteki bir otoritenin imzaladığı dijital belge. Standardı X.509." en="certificate">sertifikalar</Term>{" "}
            kapatır.
          </p>
          <h2>Sertifika nedir?</h2>
          <p>
            Sertifika, &quot;bu açık anahtar şu kuruma aittir&quot; diyen küçük bir dijital belgedir. İçinde kurumun adı, açık
            anahtarı, geçerlilik tarihleri ve bu bağı onaylayan otoritenin imzası bulunur. Web sitelerindeki kilit simgesi de
            aynı teknolojiyle çalışır; standardın adı <strong>X.509</strong>&apos;dur.
          </p>
          <h2>Güven zinciri</h2>
          <p>
            Sertifikayı kim imzalar? Daha üstteki bir sertifika. Böylece bir zincir oluşur ve zincirin en tepesinde{" "}
            <Term tip="Zincirin en üstündeki, kendisine güvenilen sertifika. Tamga'da her ülkenin kök sertifikası güven listesinde sabitlenir." en="root CA">kök sertifika</Term>{" "}
            durur. Tamga Network&apos;teki zincir şöyledir:
          </p>
          <ol>
            <li>
              <strong>Listelerin listesi</strong> hangi ülke listelerinin olduğunu ve onları kimin imzaladığını söyler.
            </li>
            <li>
              <strong>Ülke listesi</strong> o ülkenin kök sertifikasını ve kayıtlı kurumlarını yazar.
            </li>
            <li>
              <strong>Kurum sertifikası</strong> kök sertifikayla imzalanır ve kurumun belge imzalama anahtarını taşır.
            </li>
            <li>
              <strong>Belge</strong> o anahtarla imzalanır.
            </li>
          </ol>
          <p>
            Doğrulayan zinciri aşağıdan yukarı izler: belgenin imzası kurum sertifikasıyla, kurum sertifikası kök sertifikayla,
            kök sertifika da listedeki kayıtla tutuyorsa zincir tamdır.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Neden tek bir anahtar değil de zincir? Çünkü sorumluluk bölünür. Bir kurumun anahtarı ele geçirilirse yalnız o
              kurumun sertifikası iptal edilir; zincirin geri kalanı çalışmaya devam eder. Kök sertifika ise neredeyse hiç
              kullanılmaz ve bu yüzden çok daha iyi korunur.
            </p>
          </Callout>
          <h2>Kim kök sertifikayı tutar?</h2>
          <p>
            Tamga Network&apos;te her ülkenin kökü, o ülkenin listesinde yer alır. Bugün Türkiye kökünü Tamga devlet adına
            geçici olarak işletiyor. Devlet ya da yetkilendirdiği kurum kendi kökünü ve listesini yayınladığında yalnız
            adres ve imzacı değişir; belgeler ve cüzdanlar aynı kalır.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Her Türk devleti kendi kökünün ve listesinin sahibidir. Hiçbir devlet bir başkasının kurumlarını onaylamak
              zorunda değildir; hangi listeleri tanıyacağına her devlet kendisi karar verir. Zincir yapısı bu egemenliği
              teknik olarak mümkün kılar.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            On its own, a public key is just a long number; it does not say who owns it. Someone could publish a fake key and
            claim it belongs to a university. <Term tip="A digital document binding a public key to an institution, signed by a higher authority. The standard is X.509.">Certificates</Term>{" "}
            close that gap.
          </p>
          <h2>What is a certificate?</h2>
          <p>
            A certificate is a small digital document saying &quot;this public key belongs to this institution&quot;. It holds
            the institution&apos;s name, its public key, validity dates and the signature of the authority vouching for the
            link. The padlock on websites works with the same technology; the standard is called <strong>X.509</strong>.
          </p>
          <h2>The chain of trust</h2>
          <p>
            Who signs the certificate? A certificate higher up. That forms a chain, and at its top sits a{" "}
            <Term tip="The trusted certificate at the top of the chain. In Tamga, each country's root is pinned in the trust list.">root certificate</Term>
            . In Tamga Network the chain looks like this:
          </p>
          <ol>
            <li>
              <strong>The list of trusted lists</strong> says which country lists exist and who signs them.
            </li>
            <li>
              <strong>The country list</strong> holds that country&apos;s root certificate and its registered institutions.
            </li>
            <li>
              <strong>The institution certificate</strong> is signed by the root and carries the institution&apos;s signing
              key.
            </li>
            <li>
              <strong>The credential</strong> is signed with that key.
            </li>
          </ol>
          <p>
            The verifier follows the chain upwards: if the credential&apos;s signature matches the institution certificate, the
            institution certificate matches the root, and the root matches the list entry, the chain is complete.
          </p>
          <Callout kind="info" locale="en">
            <p>
              Why a chain and not one key? Because responsibility is split. If one institution&apos;s key is compromised,
              only that institution&apos;s certificate is revoked; the rest of the chain keeps working. The root is used
              rarely and can therefore be protected far better.
            </p>
          </Callout>
          <h2>Who holds the root?</h2>
          <p>
            In Tamga Network each country&apos;s root sits in that country&apos;s list. Today Tamga operates the Türkiye root
            provisionally, on behalf of the state. When the state or the body it authorises publishes its own root and list,
            only the address and the signer change; credentials and wallets stay the same.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Every Turkic state owns its root and its list. No state has to approve another&apos;s institutions; each decides
              which lists it recognises. The chain structure is what makes that sovereignty technically possible.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Açyk açar özbaşyna diňe uzyn san; onuň kimiňkidigi ýazylmaýar. Bu boşlugy{" "}
            <Term tip="Açyk açary gurama baglaýan we ony ýokarky ygtyýarly tarapyň gol çeken resminamasy (X.509)." en="certificate">sertifikatlar</Term>{" "}
            ýapýar.
          </p>
          <h2>Ynam zynjyry</h2>
          <p>
            Sertifikata ýokarky sertifikat gol çekýär; zynjyryň iň ýokarsynda{" "}
            <Term tip="Zynjyryň iň ýokarsyndaky ynanylýan sertifikat; Tamga-da her ýurduň köki ynam sanawynda berkidilýär." en="root CA">kök sertifikat</Term>{" "}
            durýar: sanawlaryň sanawy → ýurt sanawy → gurama sertifikaty → resminama. Barlaýjy zynjyry aşakdan ýokaryk
            yzarlaýar.
          </p>
          <Callout kind="info" locale="tk">
            <p>Bir guramanyň açary ogurlansa, diňe onuň sertifikaty ýatyrylýar; zynjyryň galan bölegi işleýär.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>Her türki döwlet öz kökünüň we sanawynyň eýesi; haýsy sanawlary ykrar etjegini özi çözýär.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Sertifika bir açık anahtarı bir kuruma bağlar (X.509).",
        en: "A certificate binds a public key to an institution (X.509).",
        tk: "Sertifikat açyk açary gurama baglaýar.",
      },
      {
        tr: "Zincir: listelerin listesi → ülke listesi ve kök → kurum sertifikası → belge.",
        en: "The chain: list of trusted lists → country list and root → institution certificate → credential.",
        tk: "Zynjyr: sanawlaryň sanawy → ýurt sanawy → gurama → resminama.",
      },
      {
        tr: "Her devlet kendi kökünün sahibidir; Tamga bugün Türkiye kökünü geçici olarak işletir.",
        en: "Each state owns its root; today Tamga operates the Türkiye root provisionally.",
        tk: "Her döwlet öz kökünüň eýesi.",
      },
    ],
    deeper: [
      {
        label: { tr: "Kurum kimliği (X.509)", en: "Institutional identity (X.509)", tk: "Gurama şahsyýeti (X.509)" },
        href: "/specifications/x509-identity",
        kind: "docs",
      },
      { label: { tr: "Güven listeleri", en: "Trust lists", tk: "Ynam sanawlary" }, href: "/concepts/trust-lists", kind: "docs" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework" }, href: "trust-framework", kind: "arf" },
    ],
  },
  {
    slug: "verifiable-credentials",
    chapter: 2,
    order: 4,
    minutes: 5,
    diagram: "credential",
    title: { tr: "Doğrulanabilir belge", en: "Verifiable credentials", tk: "Barlanyp bilinýän resminama" },
    summary: {
      tr: "Doğrulanabilir belge (credential) nedir, içinde ne vardır, kâğıt belgeden farkı nedir.",
      en: "What a verifiable credential is, what it contains and how it differs from a paper document.",
      tk: "Barlanyp bilinýän resminama (credential) näme, içinde näme bar we kagyz resminamadan tapawudy näme.",
    },
    body: {
      tr: (
        <>
          <p>
            Önceki sayfalarda hash, anahtar, imza ve sertifikayı gördük. Şimdi bunların hepsini bir araya getiren şeye
            geliyoruz:{" "}
            <Term tip="Bir kurumun bir kişi hakkındaki bilgileri imzalayıp kişinin cüzdanına verdiği dijital belge." en="credential">doğrulanabilir belge</Term>
            . Diploma, öğrenci belgesi, bilet, meslek belgesi, kimlik belgesi: hepsi bu biçimde verilebilir.
          </p>
          <h2>İçinde ne var?</h2>
          <ul>
            <li>
              <strong>Belge veren:</strong> belgeyi hangi kurumun verdiği (ve kurumun sertifikası).
            </li>
            <li>
              <strong>Belge türü:</strong> bunun bir diploma mı, bilet mi olduğu. Tamga&apos;da her türün kalıcı bir adı ve
              kuralları vardır.
            </li>
            <li>
              <strong>Bilgiler:</strong> ad, bölüm, mezuniyet tarihi, koltuk numarası gibi asıl içerik.
            </li>
            <li>
              <strong>Geçerlilik:</strong> ne zaman verildiği, ne zamana kadar geçerli olduğu.
            </li>
            <li>
              <strong>Durum bağlantısı:</strong> iptal edilip edilmediğinin nereden öğrenileceği.
            </li>
            <li>
              <strong>Kişiye bağ:</strong> belgenin bağlı olduğu cüzdan anahtarı.
            </li>
            <li>
              <strong>İmza:</strong> bütün bunların üzerine kurumun dijital imzası.
            </li>
          </ul>
          <h2>Kişiye bağ: kopyalanamayan belge</h2>
          <p>
            Bir PDF&apos;i herkes kopyalayıp başkasına gönderebilir. Doğrulanabilir belge ise verildiği anda kişinin
            telefonundaki bir anahtara bağlanır. Belge gösterilirken cüzdan bu anahtarla küçük bir kanıt daha imzalar:{" "}
            <Term tip="Belgenin, cüzdandaki bir anahtara bağlanması; belgeyi yalnız o anahtarı tutan cüzdan gösterebilir." en="holder binding">holder binding</Term>
            . Belgenin bir kopyası başkasının eline geçse bile o anahtar olmadan gösterilemez.
          </p>
          <h2>Kâğıttan farkı</h2>
          <ul>
            <li>Bir insan değil, yazılım denetler; saniyeler sürer.</li>
            <li>Sahte belge imza denetiminden geçemez.</li>
            <li>Bilgiler tek tek gösterilebilir; bütün belgeyi vermek gerekmez.</li>
            <li>İptal edildiğinde doğrulayan bunu anında öğrenir.</li>
          </ul>
          <Callout kind="info" locale="tr">
            <p>
              Avrupa&apos;da bu belgelere <em>attestation</em> da denir. Kişi kimliği için olanına PID, diğerlerine elektronik
              öznitelik belgesi (EAA) denir. Bu farkları &quot;Avrupa&apos;nın modeli&quot; bölümünde göreceğiz.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tr">
            <p>
              Bir belgenin türü ve alanları bütün ağda aynı tanımlanırsa, Bişkek&apos;te verilmiş bir meslek belgesini
              İstanbul&apos;daki bir hastanenin yazılımı tercümeye gerek kalmadan okuyabilir. Tamga bu yüzden belge türlerini
              herkese açık bir şema kataloğunda yayınlar.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            We have seen hashes, keys, signatures and certificates. Now we reach the thing that brings them all together: the{" "}
            <Term tip="A digital document in which an institution signs information about a person and gives it to the person's wallet.">verifiable credential</Term>
            . A diploma, a student certificate, a ticket, a professional licence, an identity credential: all can be issued
            this way.
          </p>
          <h2>What is inside?</h2>
          <ul>
            <li>
              <strong>Issuer:</strong> which institution issued it (and its certificate).
            </li>
            <li>
              <strong>Type:</strong> whether it is a diploma or a ticket. In Tamga each type has a permanent name and rules.
            </li>
            <li>
              <strong>Claims:</strong> the actual content, such as name, programme, graduation date or seat number.
            </li>
            <li>
              <strong>Validity:</strong> when it was issued and until when it is valid.
            </li>
            <li>
              <strong>Status pointer:</strong> where to find out whether it has been revoked.
            </li>
            <li>
              <strong>Binding to the person:</strong> the wallet key the credential is bound to.
            </li>
            <li>
              <strong>Signature:</strong> the institution&apos;s digital signature over all of it.
            </li>
          </ul>
          <h2>Bound to the person: a credential that cannot be copied</h2>
          <p>
            Anyone can copy a PDF and forward it. A verifiable credential is bound, at issuance, to a key on the person&apos;s
            phone. When the credential is presented, the wallet signs one more small proof with that key:{" "}
            <Term tip="Binding a credential to a key in the wallet, so that only the wallet holding that key can present it.">holder binding</Term>
            . Even if a copy of the credential reaches someone else, it cannot be presented without that key.
          </p>
          <h2>How it differs from paper</h2>
          <ul>
            <li>Software checks it, not a person; it takes seconds.</li>
            <li>A forged credential fails the signature check.</li>
            <li>Claims can be shown one by one; there is no need to hand over the whole document.</li>
            <li>When it is revoked, the verifier finds out immediately.</li>
          </ul>
          <Callout kind="info" locale="en">
            <p>
              In Europe these credentials are also called <em>attestations</em>. The one for personal identity is the PID;
              the others are electronic attestations of attributes (EAA). The chapter on Europe&apos;s model covers the
              differences.
            </p>
          </Callout>
          <Callout kind="turkic" locale="en">
            <p>
              If a credential&apos;s type and fields are defined the same way across the network, the software of a hospital
              in Istanbul can read a professional licence issued in Bishkek without any translation. That is why Tamga
              publishes credential types in a public schema catalogue.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Heş, açar, gol we sertifikat bir ýere jemlenende{" "}
            <Term tip="Guramanyň adam baradaky maglumatlara gol çekip, adamyň gapjygyna berýän sanly resminamasy." en="credential">barlanyp bilinýän resminama</Term>{" "}
            emele gelýär: diplom, talyp güwänamasy, bilet, kär güwänamasy.
          </p>
          <h2>Içinde näme bar?</h2>
          <p>
            Beriji, resminamanyň görnüşi, maglumatlar, güýjündelik möhleti, ýagdaý salgysy, adama baglylyk we guramanyň goly.
          </p>
          <h2>Adama bagly</h2>
          <p>
            Resminama berlende adamyň telefonyndaky açara baglanýar (
            <Term tip="Resminamany gapjykdaky açara baglamak; ony diňe şol açary saklaýan gapjyk görkezip bilýär." en="holder binding">holder binding</Term>
            ). Nusgasy başga birine düşse-de, şol açarsyz görkezilip bilinmeýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Resminama görnüşleri tutuş torda birmeňzeş kesgitlenende, Bişkekde berlen kär güwänamasyny Stambuldaky hassahana
              terjimesiz okap bilýär.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Doğrulanabilir belge; belge veren, tür, bilgiler, geçerlilik, durum bağlantısı, kişiye bağ ve imzadan oluşur.",
        en: "A verifiable credential holds issuer, type, claims, validity, status pointer, binding and signature.",
        tk: "Resminama: beriji, görnüş, maglumatlar, möhlet, ýagdaý, baglylyk we gol.",
      },
      {
        tr: "Belge kişinin cüzdan anahtarına bağlıdır; kopyası başkasının işine yaramaz.",
        en: "It is bound to the person's wallet key; a copy is useless to anyone else.",
        tk: "Adamyň açaryna bagly; nusgasy başga birine peýdasyz.",
      },
      {
        tr: "Ortak belge türleri sayesinde belge her ülkede aynı biçimde okunur.",
        en: "Shared credential types mean it is read the same way in every country.",
        tk: "Umumy görnüşler sebäpli her ýurtda birmeňzeş okalýar.",
      },
    ],
    deeper: [
      { label: { tr: "Belge biçimleri", en: "Credential formats", tk: "Resminama görnüşleri" }, href: "/concepts/credential-formats", kind: "docs" },
      {
        label: { tr: "Belge biçimi ve protokoller", en: "Credential format and protocols", tk: "Görnüş we protokollar" },
        href: "/specifications/credential-format",
        kind: "docs",
      },
      { label: { tr: "Şema kataloğu", en: "Schema catalogue", tk: "Shema katalogy" }, href: "/specifications/schema-catalog", kind: "docs" },
      { label: { tr: "Tamga Rulebook", en: "Tamga Rulebook", tk: "Tamga Rulebook" }, href: "rulebook", kind: "arf" },
    ],
  },
  {
    slug: "credential-formats",
    chapter: 2,
    order: 5,
    minutes: 4,
    title: { tr: "İki biçim: SD-JWT VC ve mdoc", en: "Two formats: SD-JWT VC and mdoc", tk: "Iki görnüş: SD-JWT VC we mdoc" },
    summary: {
      tr: "Aynı belge iki biçimde: internet için SD-JWT VC, yüz yüze için mdoc. Neden ikisi birden?",
      en: "One credential in two formats: SD-JWT VC for the internet, mdoc for in person. Why both?",
      tk: "Bir resminama iki görnüşde: internet üçin SD-JWT VC, ýüzbe-ýüz üçin mdoc. Näme üçin ikisi hem?",
    },
    body: {
      tr: (
        <>
          <p>
            Bir belgenin içeriği aynı kalsa da nasıl paketlendiği önemlidir. Bir mektubu e-postayla da, kargoyla da
            gönderebilirsiniz; mektup aynıdır, zarf farklıdır. Dijital belgelerde de iki yaygın &quot;zarf&quot; var ve Tamga
            ikisini de kullanır.
          </p>
          <Figure caption={FORMATS_L.tr.caption}>
            <FormatsDiagram l={FORMATS_L.tr} />
          </Figure>
          <h2>SD-JWT VC: internet için</h2>
          <p>
            <Term tip="IETF'in belge biçimi: JSON tabanlı, alanları tek tek açılabilen (seçici paylaşım) doğrulanabilir belge." en="SD-JWT VC">SD-JWT VC</Term>
            , web dünyasının diliyle yazılmış bir belgedir. JSON tabanlıdır; siteler, uygulamalar ve sunucular kolayca okur.
            Adındaki &quot;SD&quot; seçici paylaşım anlamına gelir: her alan ayrı mühürlenir, kişi yalnız istenen alanları
            açar. &quot;Tamga ile giriş yap&quot;, bir web sitesinden yapılan başvuru ya da bir uygulamadaki yaş denetimi bu
            biçimle çalışır.
          </p>
          <h2>mdoc: yüz yüze için</h2>
          <p>
            <Term tip="ISO/IEC 18013-5 standardındaki belge biçimi; mobil ehliyet için geliştirildi, yüz yüze QR ve Bluetooth ile gösterilir." en="mdoc">mdoc</Term>
            , mobil ehliyet için geliştirilmiş uluslararası bir standarttır (ISO/IEC 18013-5). Kompakt bir ikili biçim
            kullanır ve yüz yüze durumlarda, internet olmadan bile çalışacak şekilde tasarlanmıştır: konser kapısı, otel
            resepsiyonu, bir gişe. Tarayıcıların yeni dijital kimlik arayüzü de bu biçimi destekler.
          </p>
          <h2>Neden ikisi birden?</h2>
          <p>
            Çünkü belgeler iki farklı dünyada kullanılır. İnternet tarafında esneklik ve web uyumu, yüz yüze tarafta hız ve
            çevrim dışı çalışma önemlidir. AB&apos;nin dijital kimlik düzeni de iki biçimi birlikte ister. Tamga bu yüzden
            kimlik belgesini iki biçimde birden verir; diğer belge türleri ihtiyaca göre birini ya da ikisini kullanır.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Biçim değişse de kurallar değişmez: imza, güven listesi, iptal ve seçici paylaşım iki biçimde de aynı
              mantıkla çalışır. Doğrulayıcı yazılımı ikisini de aynı adımlarla denetler.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tr">
            <p>
              Ortak standart, ortak donanım demektir. Taşkent&apos;teki bir otel ya da Bakü&apos;deki bir stadyum, AB
              ülkelerinde kullanılan mdoc okuyucularıyla aynı cihazı kullanabilir. Türk dünyası için ayrı bir teknoloji
              icat etmeye gerek yoktur.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            Even when a credential&apos;s content stays the same, how it is packaged matters. You can send a letter by e-mail
            or by courier: same letter, different envelope. Digital credentials have two common &quot;envelopes&quot;, and
            Tamga uses both.
          </p>
          <Figure caption={FORMATS_L.en.caption}>
            <FormatsDiagram l={FORMATS_L.en} />
          </Figure>
          <h2>SD-JWT VC: for the internet</h2>
          <p>
            <Term tip="The IETF credential format: JSON-based, with fields that can be revealed one by one (selective disclosure).">SD-JWT VC</Term>{" "}
            is a credential written in the language of the web. It is JSON-based, so sites, apps and servers read it easily.
            The &quot;SD&quot; stands for selective disclosure: each field is sealed separately, and the person opens only
            the fields requested. &quot;Sign in with Tamga&quot;, an online application or an in-app age check all use this
            format.
          </p>
          <h2>mdoc: for in person</h2>
          <p>
            <Term tip="The ISO/IEC 18013-5 credential format, designed for mobile driving licences and shown in person over QR and Bluetooth.">mdoc</Term>{" "}
            is an international standard designed for mobile driving licences (ISO/IEC 18013-5). It uses a compact binary
            encoding and is built for in-person situations, even without internet: a concert gate, a hotel front desk, a
            counter. Browsers&apos; new digital credentials interface supports it too.
          </p>
          <h2>Why both?</h2>
          <p>
            Because credentials are used in two different worlds. Online, flexibility and web compatibility matter; in
            person, speed and offline operation. The EU digital identity framework requires both formats as well. Tamga
            therefore issues the identity credential in both formats at once; other credential types use one or both as
            needed.
          </p>
          <Callout kind="info" locale="en">
            <p>
              The format changes, the rules do not: signatures, trust lists, revocation and selective disclosure work the
              same way in both. Verifier software checks both with the same steps.
            </p>
          </Callout>
          <Callout kind="turkic" locale="en">
            <p>
              A shared standard means shared hardware. A hotel in Tashkent or a stadium in Baku can use the same mdoc readers
              used in EU countries. The Turkic world does not need to invent a separate technology.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Resminamanyň mazmuny şol bir, ýöne gaplanyşy başga bolup biler; Tamga iki görnüşi hem ulanýar.</p>
          <Figure caption={FORMATS_L.tk.caption}>
            <FormatsDiagram l={FORMATS_L.tk} />
          </Figure>
          <h2>SD-JWT VC: internet üçin</h2>
          <p>
            <Term tip="IETF resminama görnüşi: JSON esasly, meýdanlary aýratyn açylýan." en="SD-JWT VC">SD-JWT VC</Term> web
            dilinde ýazylýar; her meýdan aýratyn möhürlenýär, adam diňe soralan meýdany açýar.
          </p>
          <h2>mdoc: ýüzbe-ýüz üçin</h2>
          <p>
            <Term tip="ISO/IEC 18013-5 standarty; ýüzbe-ýüz QR we Bluetooth bilen görkezilýär." en="mdoc">mdoc</Term> mobil
            sürüjilik şahadatnamasy üçin döredilen halkara standart; internetsiz hem işleýär.
          </p>
          <Callout kind="info" locale="tk">
            <p>Görnüş üýtgese-de düzgünler üýtgemeýär; ÝB hem iki görnüşi talap edýär.</p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>Daşkentdäki myhmanhana ÝB-de ulanylýan mdoc okaýjylaryny ulanyp biler.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "SD-JWT VC internet için: JSON tabanlı, alan alan seçici paylaşım.",
        en: "SD-JWT VC is for the internet: JSON-based, field-by-field disclosure.",
        tk: "SD-JWT VC internet üçin.",
      },
      {
        tr: "mdoc yüz yüze için: ISO/IEC 18013-5, QR ve Bluetooth, çevrim dışı.",
        en: "mdoc is for in person: ISO/IEC 18013-5, QR and Bluetooth, offline.",
        tk: "mdoc ýüzbe-ýüz üçin.",
      },
      {
        tr: "Kurallar iki biçimde de aynıdır; AB de ikisini birlikte ister.",
        en: "The rules are the same in both; the EU requires both as well.",
        tk: "Düzgünler ikisinde-de birmeňzeş.",
      },
    ],
    deeper: [
      { label: { tr: "Belge biçimleri", en: "Credential formats", tk: "Resminama görnüşleri" }, href: "/concepts/credential-formats", kind: "docs" },
      { label: { tr: "SD-JWT VC profili", en: "SD-JWT VC profile", tk: "SD-JWT VC profili" }, href: "/specifications/sd-jwt-vc", kind: "docs" },
      {
        label: { tr: "Kimlik belgesi için mdoc (ADR-0013)", en: "mdoc for the identity credential (ADR-0013)", tk: "mdoc (ADR-0013)" },
        href: "/adr/0013-mdoc-dual-format-for-identity",
        kind: "docs",
      },
    ],
  },
  {
    slug: "digital-wallets",
    chapter: 2,
    order: 6,
    minutes: 5,
    title: { tr: "Dijital cüzdan", en: "Digital wallets", tk: "Sanly gapjyk" },
    summary: {
      tr: "Telefondaki cüzdanda ne durur, cihaz anahtarı nedir, telefon kaybolunca ne olur.",
      en: "What a phone wallet holds, what a device key is and what happens when the phone is lost.",
      tk: "Telefondaky gapjykda näme saklanýar, enjam açary näme we telefon ýitende näme bolýar.",
    },
    body: {
      tr: (
        <>
          <p>
            Dijital cüzdan, belgelerinizi telefonunuzda saklayan ve göstermenize yarayan bir uygulamadır. Ama yalnızca bir
            &quot;dosya klasörü&quot; değildir; belgelerin güvenle kullanılabilmesi için gereken anahtarları ve kuralları da
            taşır.
          </p>
          <Figure caption={WALLET_L.tr.caption}>
            <WalletDiagram l={WALLET_L.tr} />
          </Figure>
          <h2>Cüzdanda ne durur?</h2>
          <ul>
            <li>
              <strong>Belgeler:</strong> kimlik belgesi, diploma, bilet, öğrenci belgesi. Çoğu belgenin birkaç tek kullanımlık
              kopyası tutulur; her gösterimde başka bir kopya kullanılır.
            </li>
            <li>
              <strong>
                <Term tip="Telefonda üretilen, belgeleri cüzdana bağlayan ve gösterim anında imza atan anahtar. Telefonun güvenli donanımında tutulması hedeflenir." en="device key">Cihaz anahtarları</Term>
              </strong>
              : belgeleri bu telefona bağlayan anahtarlar. Telefonda üretilir ve dışarı çıkmaz.
            </li>
            <li>
              <strong>
                <Term tip="Cüzdan sağlayıcısının imzaladığı, bu uygulamanın kurallara uyan gerçek bir cüzdan olduğunu söyleyen kanıt." en="wallet attestation">Cüzdan kanıtı</Term>
              </strong>
              : cüzdan sağlayıcısının, &quot;bu uygulama kurallara uyan gerçek bir cüzdandır&quot; diyen imzalı beyanı.
              Belge veren kurum belgeyi vermeden önce buna bakar.
            </li>
            <li>
              <strong>İşlem günlüğü:</strong> hangi belgeyi kime gösterdiğinizin kaydı. Yalnız telefonunuzda durur; isterseniz
              şifreli olarak dışa aktarabilirsiniz.
            </li>
          </ul>
          <h2>Güvenlik nereden gelir?</h2>
          <p>
            Belgelerin kendisi gizli değildir; değerli olan, onları gösterebilmeyi sağlayan anahtarlardır. Bu yüzden anahtarlar
            telefonun güvenli donanım bölgesinde tutulur, uygulama bir kilit (PIN ya da biyometri) ile açılır ve her gösterim
            sizin onayınızı ister. Cüzdan bir belgeyi siz onaylamadan hiçbir yere göndermez.
          </p>
          <h2>Telefon kaybolursa?</h2>
          <p>
            Telefonu bulan biri belgelerinizi kullanamaz: belgeler o telefondaki anahtarlara bağlıdır ve uygulama kilitlidir.
            Kayıp telefondaki cüzdanı uzaktan kapatabilirsiniz. Yeni telefonda kimliğinizi yeniden doğrularsınız; kurumlardan
            belgelerinizi yeniden alırsınız. Sitelerdeki takma adlarınız kimliğinizden türetildiği için aynen geri gelir;
            hesaplarınızı kaybetmezsiniz.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Tamga Network cüzdan seçmez, cüzdanları tanır. Ağın cüzdan kurallarına uyan ve uyum testlerini geçen her cüzdan
              ağda çalışır. Ağın ilk ve örnek cüzdanı Tamga Wallet&apos;tır; ama tek seçenek değildir.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tr">
            <p>
              Bir cüzdanın ağda tanınması için ülkesine bakılmaz, kurallara uyup uymadığına bakılır. Kazakistan&apos;da ya da
              Azerbaycan&apos;da geliştirilen bir cüzdan da aynı testleri geçerek Türkiye listesinde yer alabilir.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            A digital wallet is an app that keeps your credentials on your phone and lets you present them. But it is not
            just a folder of files; it also carries the keys and rules needed to use those credentials safely.
          </p>
          <Figure caption={WALLET_L.en.caption}>
            <WalletDiagram l={WALLET_L.en} />
          </Figure>
          <h2>What does a wallet hold?</h2>
          <ul>
            <li>
              <strong>Credentials:</strong> an identity credential, a diploma, a ticket, a student certificate. For most
              credentials several single-use copies are kept; each presentation uses a different copy.
            </li>
            <li>
              <strong>
                <Term tip="A key made on the phone that binds credentials to the wallet and signs at presentation time. The goal is to keep it in the phone's secure hardware.">Device keys</Term>
              </strong>
              : the keys binding the credentials to this phone. They are made on the phone and never leave it.
            </li>
            <li>
              <strong>
                <Term tip="A statement signed by the wallet provider that this app is a genuine, compliant wallet.">Wallet attestation</Term>
              </strong>
              : the wallet provider&apos;s signed statement that this app is a genuine wallet following the rules. Issuers
              check it before issuing.
            </li>
            <li>
              <strong>Transaction log:</strong> a record of which credential you showed to whom. It stays on your phone; you
              can export it encrypted if you wish.
            </li>
          </ul>
          <h2>Where does security come from?</h2>
          <p>
            The credentials themselves are not secret; what is valuable is the keys that let you present them. So the keys
            live in the phone&apos;s secure hardware, the app opens with a lock (PIN or biometrics), and every presentation
            asks for your consent. The wallet never sends a credential anywhere without your approval.
          </p>
          <h2>What if the phone is lost?</h2>
          <p>
            Whoever finds the phone cannot use your credentials: they are bound to that phone&apos;s keys and the app is
            locked. You can switch off the wallet on the lost phone remotely. On a new phone you verify your identity again
            and collect your credentials from the institutions again. Your pseudonyms on websites are derived from your
            identity, so they come back unchanged; you do not lose your accounts.
          </p>
          <Callout kind="info" locale="en">
            <p>
              Tamga Network does not pick wallets; it recognises them. Any wallet that follows the network&apos;s wallet rules
              and passes the conformance tests works on the network. The network&apos;s first and example wallet is Tamga
              Wallet, but it is not the only choice.
            </p>
          </Callout>
          <Callout kind="turkic" locale="en">
            <p>
              A wallet is recognised by whether it follows the rules, not by its country. A wallet built in Kazakhstan or
              Azerbaijan can pass the same tests and be listed in the Türkiye list.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Sanly gapjyk resminamalary telefonda saklaýan programma; olary howpsuz ulanmak üçin açarlary we düzgünleri hem saklaýar.</p>
          <Figure caption={WALLET_L.tk.caption}>
            <WalletDiagram l={WALLET_L.tk} />
          </Figure>
          <h2>Gapjykda näme bar?</h2>
          <p>
            Resminamalar (birnäçe birgezeklik nusgasy bilen),{" "}
            <Term tip="Telefonda döredilýän we resminamalary gapjyga baglaýan açar." en="device key">enjam açarlary</Term>,{" "}
            <Term tip="Gapjyk üpjün edijisiniň bu programmanyň düzgünlere eýerýändigini tassyklaýan goly." en="wallet attestation">gapjyk subutnamasy</Term>{" "}
            we diňe telefonda durýan amal ýazgysy.
          </p>
          <h2>Telefon ýitse?</h2>
          <p>
            Tapan adam resminamalary ulanyp bilmeýär. Täze telefonda şahsyýetiňizi täzeden tassyklaýarsyňyz, resminamalary
            guramalardan täzeden alýarsyňyz; saýtlardaky lakamlaryňyz yzyna gelýär.
          </p>
          <Callout kind="info" locale="tk">
            <p>Tamga Network gapjyk saýlamaýar, tanaýar. Ilkinji we nusga gapjyk Tamga Wallet, ýöne ýeke-täk däl.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Cüzdan belgeleri, cihaz anahtarlarını, cüzdan kanıtını ve işlem günlüğünü taşır.",
        en: "A wallet holds credentials, device keys, its attestation and a transaction log.",
        tk: "Gapjyk resminamalary, açarlary, subutnamany we ýazgyny saklaýar.",
      },
      {
        tr: "Belgeler telefondaki anahtarlara bağlıdır; telefonu bulan biri onları kullanamaz.",
        en: "Credentials are bound to the phone's keys; a finder cannot use them.",
        tk: "Tapan adam resminamalary ulanyp bilmeýär.",
      },
      {
        tr: "Ağ kurallara uyan her cüzdanı tanır; ilk ve örnek cüzdan Tamga Wallet.",
        en: "The network recognises every compliant wallet; the first and example one is Tamga Wallet.",
        tk: "Tor her düzgünli gapjygy tanaýar.",
      },
    ],
    deeper: [
      { label: { tr: "Cüzdan geliştirmek", en: "Building a wallet", tk: "Gapjyk döretmek" }, href: "/guides/build-a-wallet", kind: "docs" },
      { label: { tr: "Cüzdan kuralları", en: "Wallet rules", tk: "Gapjyk düzgünleri" }, href: "/specifications/wallet", kind: "docs" },
      {
        label: { tr: "Cüzdan ve anahtar kanıtı (ADR-0025)", en: "Wallet and key attestation (ADR-0025)", tk: "Gapjyk subutnamasy (ADR-0025)" },
        href: "/adr/0025-wallet-instance-and-key-attestations",
        kind: "docs",
      },
    ],
  },
  {
    slug: "issuance-and-presentation",
    chapter: 2,
    order: 7,
    minutes: 5,
    diagram: "how-it-works",
    title: { tr: "Belge almak ve göstermek", en: "Receiving and presenting", tk: "Resminama almak we görkezmek" },
    summary: {
      tr: "QR ile teklif, istek, onay ekranı: belgenin kurumdan cüzdana, cüzdandan doğrulayana yolculuğu.",
      en: "A QR offer, a request, a consent screen: the journey from institution to wallet and from wallet to verifier.",
      tk: "QR bilen teklip, haýyş, razylyk ekrany: resminamanyň guramadan gapjyga, gapjykdan barlaýja syýahaty.",
    },
    body: {
      tr: (
        <>
          <p>
            Yukarıdaki hareketli şema, bir belgenin baştan sona yolculuğunu gösteriyor. Bu sayfada iki yarısını ayrı ayrı
            açıyoruz: belge almak ve belge göstermek. Her ikisi de AB&apos;nin seçtiği açık protokollerle yapılır.
          </p>
          <h2>Belge almak</h2>
          <ol>
            <li>
              <strong>Teklif.</strong> Kurum size bir{" "}
              <Term tip="Kurumun, cüzdanı bir belgeyi almaya çağırdığı ileti; genellikle bir QR kod ya da bağlantı." en="credential offer">belge teklifi</Term>{" "}
              gösterir: ekranda bir QR kod ya da telefonunuzda bir bağlantı. Bazen kimliğinizi doğrulamak için ayrı bir kanaldan
              (örneğin SMS) tek kullanımlık bir kod da gelir.
            </li>
            <li>
              <strong>Cüzdan kendini tanıtır.</strong> Cüzdan, kurallara uyan bir cüzdan olduğunu gösteren kanıtını ve
              belgenin bağlanacağı anahtarı sunar.
            </li>
            <li>
              <strong>Kurum belgeyi verir.</strong> Kurum kanıtı güven listesine karşı denetler, belgeyi imzalar ve
              cüzdana birkaç tek kullanımlık kopya halinde gönderir.
            </li>
          </ol>
          <p>
            Bu adımların teknik adı{" "}
            <Term tip="Bir belgenin kurumdan cüzdana güvenle verilmesini tarif eden açık protokol (OpenID Foundation)." en="OpenID4VCI">OpenID4VCI</Term>
            &apos;dır.
          </p>
          <h2>Belge göstermek</h2>
          <ol>
            <li>
              <strong>İstek.</strong> Doğrulayan bir istek gönderir: &quot;18 yaşından büyük mü?&quot; ya da &quot;hangi
              bölümden mezun?&quot;. İstek, doğrulayanın kayıtlı sertifikasıyla imzalıdır.
            </li>
            <li>
              <strong>Onay ekranı.</strong> Cüzdan, kimin istediğini (güven listesindeki kayıtlı adıyla), neyi istediğini ve
              bunu isteme yetkisi olup olmadığını gösterir. Siz onaylarsınız ya da reddedersiniz.
            </li>
            <li>
              <strong>Yanıt.</strong> Yalnız onayladığınız alanlar, belgenin yeni bir kopyasıyla ve cihaz anahtarınızın
              imzasıyla gider.
            </li>
            <li>
              <strong>Denetim.</strong> Doğrulayan imzayı, güven listesindeki kaydı ve iptal durumunu denetler; sonuç
              saniyeler içinde gelir.
            </li>
          </ol>
          <p>
            Bu adımların teknik adı{" "}
            <Term tip="Cüzdandan doğrulayana belge gösterimini tarif eden açık protokol (OpenID Foundation)." en="OpenID4VP">OpenID4VP</Term>
            &apos;dir.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              İki yol vardır. Bilgisayardaki bir sitede ekranda QR görünür, telefonla okutursunuz. Telefondaki bir sitede ise
              &quot;Tamga ile giriş yap&quot;a dokunursunuz, cüzdan açılır, onaylarsınız ve siteye dönersiniz.
            </p>
          </Callout>
          <h2>Doğrulayan her şeyi isteyebilir mi?</h2>
          <p>
            Hayır. Her doğrulayan kayıt olurken hangi amaçla hangi bilgileri isteyeceğini bildirir. Bu bilgi güven listesine
            yazılır. Bir doğrulayan kaydında olmayan bir bilgiyi isterse cüzdan sizi uyarır. Böylece &quot;fazla soran&quot;
            siteler görünür hâle gelir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Protokoller açık ve ortak olduğu için Aşkabat&apos;ta geliştirilmiş bir cüzdan, İstanbul&apos;daki bir
              üniversiteden belge alabilir ve Almatı&apos;daki bir işverene gösterebilir. Kimse kimsenin yazılımını
              kullanmak zorunda değildir; herkes aynı dili konuşur.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            The animated diagram above shows a credential&apos;s journey end to end. This page opens its two halves one by
            one: receiving a credential and presenting it. Both use open protocols the EU has chosen.
          </p>
          <h2>Receiving a credential</h2>
          <ol>
            <li>
              <strong>The offer.</strong> The institution shows you a{" "}
              <Term tip="A message, usually a QR code or a link, by which an issuer invites a wallet to collect a credential.">credential offer</Term>
              : a QR code on screen or a link on your phone. Sometimes a one-time code arrives over a separate channel (such as
              SMS) to confirm it is you.
            </li>
            <li>
              <strong>The wallet introduces itself.</strong> It presents its attestation, showing it is a compliant wallet,
              and the key the credential will be bound to.
            </li>
            <li>
              <strong>The institution issues.</strong> It checks the attestation against the trust list, signs the
              credential and sends it to the wallet as several single-use copies.
            </li>
          </ol>
          <p>
            The technical name for these steps is{" "}
            <Term tip="An open protocol (OpenID Foundation) describing how a credential is issued safely from an institution to a wallet.">OpenID4VCI</Term>
            .
          </p>
          <h2>Presenting a credential</h2>
          <ol>
            <li>
              <strong>The request.</strong> The verifier sends a request: &quot;Is this person over 18?&quot; or &quot;Which
              programme did they graduate from?&quot;. The request is signed with the verifier&apos;s registered certificate.
            </li>
            <li>
              <strong>The consent screen.</strong> The wallet shows who is asking (by their registered name in the trust
              list), what they are asking for, and whether they are allowed to ask for it. You approve or decline.
            </li>
            <li>
              <strong>The response.</strong> Only the fields you approved are sent, using a fresh copy of the credential and a
              signature from your device key.
            </li>
            <li>
              <strong>The check.</strong> The verifier checks the signature, the trust list entry and the revocation status;
              the result arrives in seconds.
            </li>
          </ol>
          <p>
            The technical name for these steps is{" "}
            <Term tip="An open protocol (OpenID Foundation) describing how a wallet presents credentials to a verifier.">OpenID4VP</Term>.
          </p>
          <Callout kind="info" locale="en">
            <p>
              There are two paths. On a site on your computer a QR code appears and you scan it with your phone. On a site on
              your phone you tap &quot;Sign in with Tamga&quot;, the wallet opens, you approve and you return to the site.
            </p>
          </Callout>
          <h2>Can a verifier ask for anything?</h2>
          <p>
            No. When a verifier registers, it declares which information it will request and for what purpose. That goes into
            the trust list. If a verifier asks for something outside its registration, the wallet warns you. Sites that
            overask become visible.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              Because the protocols are open and shared, a wallet built in Ashgabat can receive a credential from a university
              in Istanbul and present it to an employer in Almaty. No one has to use anyone else&apos;s software; everyone speaks
              the same language.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Ýokardaky hereketli shema resminamanyň başdan-aýak syýahatyny görkezýär.</p>
          <h2>Resminama almak</h2>
          <p>
            Gurama{" "}
            <Term tip="Guramanyň gapjygy resminama almaga çagyrýan habary; köplenç QR kod." en="credential offer">resminama teklibini</Term>{" "}
            görkezýär; gapjyk öz subutnamasyny we açaryny hödürleýär; gurama barlap, resminamany birnäçe birgezeklik nusga
            görnüşinde iberýär (OpenID4VCI).
          </p>
          <h2>Resminama görkezmek</h2>
          <p>
            Barlaýjy gol çekilen haýyş iberýär; gapjyk kimiň näme soraýandygyny görkezýär; siz razy bolsaňyz diňe şol meýdanlar
            gidýär; barlaýjy sekuntlarda barlaýar (OpenID4VP). Barlaýjy diňe hasaba alnanda bildiren maglumatyny sorap bilýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>Aşgabatda döredilen gapjyk Stambul uniwersitetinden resminama alyp, Almatydaky iş berijä görkezip biler.</p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Belge almak: teklif → cüzdan kanıtı → imzalı belge, birkaç tek kullanımlık kopya (OpenID4VCI).",
        en: "Receiving: offer → wallet attestation → signed credential, as several single-use copies (OpenID4VCI).",
        tk: "Almak: teklip → subutnama → gol çekilen resminama.",
      },
      {
        tr: "Göstermek: imzalı istek → onay ekranı → yalnız seçilen alanlar → saniyeler içinde denetim (OpenID4VP).",
        en: "Presenting: signed request → consent screen → only chosen fields → checked in seconds (OpenID4VP).",
        tk: "Görkezmek: haýyş → razylyk → diňe saýlanan meýdanlar.",
      },
      {
        tr: "Doğrulayan yalnız kaydında bildirdiği bilgileri isteyebilir; fazlasında cüzdan uyarır.",
        en: "A verifier may ask only for what it registered; the wallet warns about anything more.",
        tk: "Barlaýjy diňe bildireni sorap bilýär.",
      },
    ],
    deeper: [
      { label: { tr: "Belge verme", en: "Issuance", tk: "Resminama bermek" }, href: "/concepts/issuance", kind: "docs" },
      { label: { tr: "Belge gösterme", en: "Presentation", tk: "Görkezmek" }, href: "/concepts/presentation", kind: "docs" },
      { label: { tr: "OpenID4VCI profili", en: "OpenID4VCI profile", tk: "OpenID4VCI profili" }, href: "/specifications/openid4vci", kind: "docs" },
      { label: { tr: "OpenID4VP profili", en: "OpenID4VP profile", tk: "OpenID4VP profili" }, href: "/specifications/openid4vp", kind: "docs" },
    ],
  },
  {
    slug: "revocation",
    chapter: 2,
    order: 8,
    minutes: 4,
    title: { tr: "İptal ve tazelik", en: "Revocation and freshness", tk: "Ýatyrmak we täzelik" },
    summary: {
      tr: "Bir belge geri alınabilir mi, doğrulayan bunu kuruma sormadan nasıl anlar?",
      en: "Can a credential be withdrawn, and how does a verifier find out without asking the institution?",
      tk: "Resminama yzyna alnyp bilnermi we barlaýjy guramadan soraman muny nädip bilýär?",
    },
    body: {
      tr: (
        <>
          <p>
            Belgeler sonsuza kadar geçerli değildir. Bir üyelik biter, bir meslek belgesi askıya alınır, hatalı verilmiş bir
            diploma geri çekilir. Doğrulayanın bunu bilmesi gerekir, ama kuruma her seferinde sormadan; yoksa kurum her
            doğrulamayı, yani kişinin belgeyi nerede kullandığını öğrenirdi.
          </p>
          <Figure caption={STATUS_L.tr.caption}>
            <StatusListDiagram l={STATUS_L.tr} />
          </Figure>
          <h2>İptal listesi nasıl çalışır?</h2>
          <p>
            Kurum, verdiği belgeler için büyük bir{" "}
            <Term tip="Bir kurumun verdiği belgelerin geçerli ya da iptal olduğunu, her belgeye bir konum ayırarak gösteren imzalı liste (IETF Token Status List)." en="status list">iptal listesi</Term>{" "}
            tutar. Listede her belgeye bir konum ayrılır: 0 geçerli, 1 iptal demektir. Belge verilirken içine kendi konumu ve
            listenin adresi yazılır. Kurum bir belgeyi iptal ettiğinde o konumu 1 yapar, listeyi imzalar ve yeniden yayınlar.
          </p>
          <p>
            Doğrulayan, belgeyi denetlerken listeyi indirir ve ilgili konuma bakar. Liste binlerce belgenin konumunu birlikte
            taşıdığı için kurum, doğrulayanın hangi belgeye baktığını öğrenemez. Liste sıkıştırılmıştır; binlerce belge için
            bile küçük bir dosyadır ve önceden indirilip saklanabilir.
          </p>
          <h2>Tazelik: &quot;şu an bilemiyorum&quot; da bir cevaptır</h2>
          <p>
            Liste indirilemezse ya da çok eskiyse ne olur? Tamga&apos;nın kuralı açıktır: doğrulayan böyle bir durumda
            &quot;geçerli&quot; demez, &quot;şu an doğrulanamadı&quot; der. Sonuç üç değerlidir:
          </p>
          <ul>
            <li>
              <strong>Geçerli:</strong> imza, kayıt ve iptal durumu tamam.
            </li>
            <li>
              <strong>Geçersiz:</strong> belge iptal edilmiş, süresi dolmuş ya da imza tutmuyor.
            </li>
            <li>
              <strong>Belirsiz:</strong> listeler bayat ya da ulaşılamıyor; daha sonra yeniden denenmeli.
            </li>
          </ul>
          <Callout kind="caution" locale="tr">
            <p>
              &quot;Belirsiz&quot; sonucun var olması önemlidir. Pek çok sistem emin olamadığında &quot;geçerli&quot; der ve
              sahteciliğe kapı açar. Tamga&apos;da emin olunamayan bir durum hiçbir zaman &quot;geçerli&quot; sayılmaz.
            </p>
          </Callout>
          <h2>Kopyalar ve yenileme</h2>
          <p>
            Cüzdan her belgenin birkaç tek kullanımlık kopyasını taşır. Kopyalar azaldığında ya da süreleri yaklaştığında cüzdan
            kurumdan yeni kopyaları kendiliğinden alır; bunun için size ayrıca bir şey yaptırmaz. Kurum, iptal ettiği bir
            belgenin yeni kopyasını vermez.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              İptal listesi herkese açık bir dosya olduğu için sınır tanımaz. Bakü&apos;deki bir doğrulayan, Ankara&apos;daki bir
              kurumun iptal listesini aynı yolla indirir; kuruma telefon açmasına, ortak bir veritabanına bağlanmasına gerek
              yoktur.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            Credentials are not valid forever. A membership ends, a licence is suspended, a diploma issued by mistake is
            withdrawn. The verifier needs to know, but without asking the institution each time; otherwise the institution
            would learn about every check, that is, everywhere the person used the credential.
          </p>
          <Figure caption={STATUS_L.en.caption}>
            <StatusListDiagram l={STATUS_L.en} />
          </Figure>
          <h2>How does a status list work?</h2>
          <p>
            The institution keeps a large{" "}
            <Term tip="A signed list showing, with one position per credential, whether an issuer's credentials are valid or revoked (IETF Token Status List).">status list</Term>{" "}
            for the credentials it issues. Each credential gets a position: 0 means valid, 1 means revoked. When the credential
            is issued, its position and the list&apos;s address are written into it. When the institution revokes a credential,
            it sets that position to 1, signs the list and republishes it.
          </p>
          <p>
            The verifier downloads the list and looks at the position. Because the list carries thousands of positions
            together, the institution cannot tell which credential the verifier looked at. The list is compressed; even for
            thousands of credentials it is a small file and can be fetched in advance and cached.
          </p>
          <h2>Freshness: &quot;I cannot tell right now&quot; is an answer too</h2>
          <p>
            What if the list cannot be downloaded or is too old? Tamga&apos;s rule is clear: in that case the verifier does not
            say &quot;valid&quot;; it says &quot;cannot be verified right now&quot;. The result has three values:
          </p>
          <ul>
            <li>
              <strong>Valid:</strong> signature, registration and status are all fine.
            </li>
            <li>
              <strong>Invalid:</strong> revoked, expired or the signature does not match.
            </li>
            <li>
              <strong>Indeterminate:</strong> the lists are stale or unreachable; try again later.
            </li>
          </ul>
          <Callout kind="caution" locale="en">
            <p>
              Having an &quot;indeterminate&quot; result matters. Many systems say &quot;valid&quot; when unsure and open the
              door to fraud. In Tamga, a situation that cannot be confirmed is never treated as valid.
            </p>
          </Callout>
          <h2>Copies and refresh</h2>
          <p>
            The wallet carries several single-use copies of each credential. When they run low or approach expiry, the wallet
            fetches fresh copies from the institution on its own, without asking you to do anything. The institution does not
            issue fresh copies of a credential it has revoked.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              A status list is a public file, so it crosses borders. A verifier in Baku downloads the status list of an
              institution in Ankara the same way; no phone call and no shared database are needed.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>Resminamalar hemişelik güýjünde däl; barlaýjy muny guramadan her gezek soraman bilmeli.</p>
          <Figure caption={STATUS_L.tk.caption}>
            <StatusListDiagram l={STATUS_L.tk} />
          </Figure>
          <h2>Ýatyrylan sanaw nädip işleýär?</h2>
          <p>
            Gurama{" "}
            <Term tip="Guramanyň resminamalarynyň güýjündedigini ýa-da ýatyrylandygyny görkezýän gol çekilen sanaw (IETF Token Status List)." en="status list">ýatyrylan sanawy</Term>{" "}
            saklaýar: her resminama bir ýer, 0 dogry, 1 ýatyrylan. Barlaýjy sanawy göçürýär; gurama haýsy resminamanyň
            barlanandygyny bilmeýär.
          </p>
          <h2>Täzelik</h2>
          <p>
            Sanaw köne ýa-da elýeterli bolmasa, barlaýjy &quot;dogry&quot; diýmeýär, &quot;häzir barlap bolmady&quot;
            diýýär. Netije üç bahaly: dogry, nädogry, näbelli.
          </p>
          <Callout kind="caution" locale="tk">
            <p>Tamga-da anyklanyp bilinmeýän ýagdaý hiç haçan &quot;dogry&quot; hasaplanmaýar.</p>
          </Callout>
          <p>Nusgalar azalanda gapjyk täze nusgalary özbaşdak alýar.</p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Kurum iptal ettiği belgenin konumunu iptal listesinde 1 yapar; liste imzalı ve herkese açıktır.",
        en: "The issuer sets a revoked credential's position to 1 in a signed, public status list.",
        tk: "Gurama ýatyran resminamasynyň ýerini 1 edýär.",
      },
      {
        tr: "Doğrulayan listeyi indirir; kurum hangi belgenin denetlendiğini öğrenmez.",
        en: "The verifier downloads the list; the issuer never learns which credential was checked.",
        tk: "Gurama haýsy resminamanyň barlanandygyny bilmeýär.",
      },
      {
        tr: "Emin olunamayan durum 'belirsiz'dir, asla 'geçerli' sayılmaz; cüzdan kopyaları kendiliğinden yeniler.",
        en: "An unconfirmed case is 'indeterminate', never 'valid'; the wallet refreshes copies on its own.",
        tk: "Anyklanmadyk ýagdaý hiç haçan 'dogry' däl.",
      },
    ],
    deeper: [
      { label: { tr: "İptal ve tazelik", en: "Revocation and freshness", tk: "Ýatyrmak we täzelik" }, href: "/concepts/revocation", kind: "docs" },
      { label: { tr: "İptal listesi şartnamesi", en: "Status list specification", tk: "Ýatyrylan sanaw" }, href: "/specifications/status-list", kind: "docs" },
      {
        label: { tr: "Otomatik kopya yenileme (ADR-0023)", en: "Automatic copy refresh (ADR-0023)", tk: "Nusga täzelemek (ADR-0023)" },
        href: "/adr/0023-automatic-copy-refresh",
        kind: "docs",
      },
    ],
  },
];

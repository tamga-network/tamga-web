import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CodeBlock } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

const BLIND_EN = `credential ──AES-256-GCM(DEK)──►  ciphertext
DEK        ──AES-KeyWrap(KEK)──►  wrapped_DEK
KEK        = HKDF(seed, "…kek", salt)   ← derived only on the device

Stored on server: (ciphertext, wrapped_DEK)   → meaningless on its own`;
const BLIND_TR = `credential ──AES-256-GCM(DEK)──►  ciphertext
DEK        ──AES-KeyWrap(KEK)──►  wrapped_DEK
KEK        = HKDF(seed, "…kek", salt)   ← yalnızca cihazda türetilir

Sunucuda duran: (ciphertext, wrapped_DEK)   → tek başına anlamsız`;
const BLIND_TK = `credential ──AES-256-GCM(DEK)──►  ciphertext
DEK        ──AES-KeyWrap(KEK)──►  wrapped_DEK
KEK        = HKDF(seed, "…kek", salt)   ← diňe enjamda alynýar

Serwerde duran: (ciphertext, wrapped_DEK)   → ýeke özi manysyz`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Recovery and revocation",
      description:
        "Protecting credential content with envelope encryption (AES-256-GCM + HKDF), device/key recovery scenarios, and revocation via the IETF Token Status List (working today).",
    },
    eyebrow: "Advanced Architecture",
    title: "Recovery and revocation",
    intro:
      "In SSI the user holds their own key — but what if the device is lost or breaks? And if a key must be invalidated, how is that announced? Two mechanisms: envelope encryption + recovery flows, and status lists.",
    body: (
      <>
        <Callout title="Design stage" tone="gold">
          Envelope encryption and the recovery flows below are the planned design; they are not implemented yet. Revocation (at the end of this page) is working today.
        </Callout>

        <h2>How is credential content protected? Envelope encryption</h2>
        <p>
          The aim: the state server must{" "}
          <strong>never be able to read</strong> credential content (health
          record, diploma); only the holder’s seed can open it. The method is{" "}
          <strong>envelope encryption</strong>, the same model used by password
          managers (1Password, Bitwarden):
        </p>
        <ul>
          <li>
            Each credential is symmetrically encrypted with a random{" "}
            <strong>DEK</strong> (Data Encryption Key): <code>AES-256-GCM</code>.
          </li>
          <li>
            The DEK is wrapped with a <strong>KEK</strong> (Key Encryption Key)
            derived from the holder’s seed: derivation via <code>HKDF</code> +
            AES-KeyWrap.
          </li>
          <li>
            Only <code>(ciphertext, wrapped_DEK)</code> is stored on the server.
            The server never sees the KEK → cannot open the DEK → cannot read the
            content.
          </li>
        </ul>
        <CodeBlock label="Blind storage: the server can never see the content" code={BLIND_EN} />
        <p>
          When the holder enters the seed on a new device, the same KEK is
          re-derived deterministically, <code>wrapped_DEK</code> is opened and the
          credential is decrypted.
        </p>

        <h2>Device scenarios</h2>

        <h3>1) New device, seed known</h3>
        <p>
          The user enters the 24 words; the device derives the keys locally from
          the seed. <strong>No password/PIN is sent to the server</strong>: the
          server sends a nonce (challenge), the device signs it with the derived
          private key, the server verifies with the registered public key —{" "}
          <strong>public-key challenge-response</strong> (FIDO2/WebAuthn logic). If
          verification succeeds, the encrypted blobs are downloaded and decrypted
          locally. Then a PIN is set (stored in a hardware secure area — Secure
          Enclave / StrongBox), and the old device’s key is added to the revocation
          list.
        </p>

        <h3>2) PIN forgotten, seed in hand, device in hand</h3>
        <p>
          The 24 words are requested again, the seed is verified locally, a new PIN
          is set. <strong>No request goes to the server</strong> — a fully
          device-local operation.
        </p>

        <h3>3) Device and seed lost (second tier — principle)</h3>
        <p>
          The exact design of this scenario is not yet mature; it is marked as a{" "}
          <strong>“future phase”</strong> in the whitepaper. The principle:
        </p>
        <ul>
          <li>
            The state’s identity-verification channel is used; biometrics +
            document: the e-ID/passport NFC chip (<strong>ICAO 9303</strong>) is
            read, and a live face scan is matched against the chip photo.
          </li>
          <li>
            Once identity is verified a new seed is generated. A guardian threshold
            (suggested: 2-of-5, <em>no court order needed</em> — this is a
            user-requested recovery, not a criminal process) re-binds the new key
            to the root identity.
          </li>
          <li>
            The old keys are revoked; credentials are re-issued (or re-packaged
            with a new KEK — the exact design of this step is open).
          </li>
        </ul>

        <Callout title="Difference from accountable disclosure" tone="gold">
          Recovery runs at the user’s own request and with a lower threshold
          (suggested 2-of-5, no court order). Identity resolution (
          <Link href="/docs/accountable-disclosure">accountable disclosure</Link>)
          requires a judicial process + a higher threshold (3-of-5). The two
          processes are deliberately separated.
        </Callout>

        <h2>Revocation — IETF Token Status List (working today)</h2>
        <p>
          When a credential must be invalidated, every verifier has to learn it — without the
          issuer learning who is being checked. Tamga uses the <strong>IETF Token Status List</strong>,
          the list type of the EUDI architecture:
        </p>
        <ul>
          <li>Each credential copy has a <strong>random</strong> position in a compressed list; two bits per copy: valid, revoked or suspended.</li>
          <li>The issuer signs and publishes the list at a <strong>fixed interval</strong>, never on demand — so the timing reveals nothing about a person. Every publication is also written to the public anchor log.</li>
          <li>Verifiers <strong>pre-fetch</strong> the lists; checking a credential makes no network call to the issuer or to your phone.</li>
          <li>A revocation reaches every verifier within about 90 minutes at most. If a verifier’s copy of the list is out of date, the answer is <strong>indeterminate</strong>, not “rejected”.</li>
          <li>Suspension is reversible (for example during an investigation); revocation is final.</li>
        </ul>

        <Callout title="Reminder" tone="accent">
          All the cryptographic design on this page is an indication of
          architectural direction and feasibility; it must pass an independent
          security audit before production. The standards (BIP32/39, DKG + threshold ElGamal, HKDF,
          AES-GCM, WebAuthn, ICAO 9303) are mature; the
          combination and parameters must be audited.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Kurtarma ve iptal",
      description:
        "Credential içeriğinin zarf şifrelemeyle (AES-256-GCM + HKDF) korunması, cihaz/anahtar kurtarma senaryoları ve IETF Token Status List ile iptal (bugün çalışıyor).",
    },
    eyebrow: "İleri Mimari",
    title: "Kurtarma ve iptal",
    intro:
      "SSI’de kullanıcı anahtarını kendi tutar — peki cihaz kaybolur ya da kırılırsa? Ve bir anahtar geçersiz kılınacaksa bu nasıl duyurulur? İki mekanizma: zarf şifreleme + kurtarma akışları ve iptal listeleri.",
    body: (
      <>
        <Callout title="Tasarım aşaması" tone="gold">
          Aşağıdaki zarf şifreleme ve kurtarma akışları planlanan tasarımdır; henüz uygulanmadı. İptal (sayfanın sonunda) bugün çalışıyor.
        </Callout>

        <h2>Credential içeriği nasıl korunur? Zarf şifreleme</h2>
        <p>
          Amaç: devlet sunucusu credential içeriğini (sağlık kaydı, diploma){" "}
          <strong>hiçbir koşulda okuyamasın</strong>; yalnızca holder’ın seed’i
          açabilsin. Yöntem, parola yöneticilerinin (1Password, Bitwarden)
          kullandığı <strong>zarf şifrelemedir (envelope encryption)</strong>:
        </p>
        <ul>
          <li>
            Her credential, rastgele bir <strong>DEK</strong> (Data Encryption Key)
            ile simetrik şifrelenir: <code>AES-256-GCM</code>.
          </li>
          <li>
            DEK, holder’ın seed’inden türetilen bir <strong>KEK</strong> (Key
            Encryption Key) ile sarılır: <code>HKDF</code> ile türetme +
            AES-KeyWrap.
          </li>
          <li>
            Sunucuda yalnızca <code>(ciphertext, wrapped_DEK)</code> durur. Sunucu
            KEK’i hiç görmez → DEK’i açamaz → içeriği okuyamaz.
          </li>
        </ul>
        <CodeBlock label="Kör depolama: sunucu içeriği asla göremez" code={BLIND_TR} />
        <p>
          Yeni cihazda holder seed’i girince aynı KEK deterministik olarak yeniden
          türetilir, <code>wrapped_DEK</code> açılır ve credential çözülür.
        </p>

        <h2>Cihaz senaryoları</h2>

        <h3>1) Yeni cihaz, seed biliniyor</h3>
        <p>
          Kullanıcı 24 kelimeyi girer; cihaz seed’den anahtarları yerel türetir.
          Sunucuya <strong>parola/PIN gönderilmez</strong>: sunucu bir nonce
          (challenge) yollar, cihaz türetilmiş özel anahtarla imzalar, sunucu
          kayıtlı açık anahtarla doğrular —{" "}
          <strong>açık anahtar challenge-response</strong> (FIDO2/WebAuthn mantığı).
          Doğrulama başarılıysa şifreli blob’lar indirilir ve yerel çözülür. Sonra
          bir PIN belirlenir (donanım güvenli bölgesinde — Secure Enclave /
          StrongBox saklanır), eski cihazın anahtarı iptal listesine düşer.
        </p>

        <h3>2) PIN unutuldu, seed elde, cihaz elde</h3>
        <p>
          24 kelime tekrar istenir, seed yerel doğrulanır, yeni PIN belirlenir.{" "}
          <strong>Sunucuya hiçbir istek gitmez</strong> — tamamen cihaz-yerel bir
          işlem.
        </p>

        <h3>3) Cihaz ve seed kayıp (ikinci kademe — prensip)</h3>
        <p>
          Bu senaryonun kesin tasarımı henüz olgunlaşmadı; whitepaper’da{" "}
          <strong>“gelecek faz”</strong> olarak işaretlenir. Prensip:
        </p>
        <ul>
          <li>
            Devletin kimlik doğrulama kanalına başvurulur; biyometri + belge:{" "}
            e-kimlik/pasaport NFC çipi (<strong>ICAO 9303</strong>) okunur, canlı
            yüz taraması çip fotoğrafıyla eşleştirilir.
          </li>
          <li>
            Kimlik doğrulanınca yeni bir seed üretilir. Guardian eşiği (öneri:
            2-of-5, <em>mahkeme kararı gerekmez</em> — bu kullanıcı-talepli bir
            kurtarma, ceza süreci değil) yeni anahtarı kök kimliğe yeniden bağlar.
          </li>
          <li>
            Eski anahtarlar iptale düşer; credential’lar yeniden issue edilir (ya
            da yeni KEK ile yeniden paketlenir — bu adımın kesin tasarımı açık).
          </li>
        </ul>

        <Callout title="Hesap verebilir ifşadan farkı" tone="gold">
          Kurtarma, kullanıcının kendi talebiyle ve daha düşük bir eşikle (öneri
          2-of-5, mahkeme kararsız) yürür. Kimlik açma (
          <Link href="/docs/accountable-disclosure">hesap verebilir ifşa</Link>)
          ise yargı süreci + daha yüksek eşik (3-of-5) gerektirir. İki süreç
          bilinçli olarak ayrılmıştır.
        </Callout>

        <h2>İptal — IETF Token Status List (bugün çalışıyor)</h2>
        <p>
          Bir belge geçersiz kılındığında her doğrulayıcının bunu öğrenmesi gerekir — belgeyi verenin
          kimin denetlendiğini öğrenmesine gerek kalmadan. Tamga, EUDI mimarisinin liste türü olan{" "}
          <strong>IETF Token Status List</strong>’i kullanır:
        </p>
        <ul>
          <li>Her belge kopyasının sıkıştırılmış bir listede <strong>rastgele</strong> bir konumu vardır; kopya başına iki bit: geçerli, iptal ya da askıda.</li>
          <li>Veren kurum listeyi <strong>sabit aralıkla</strong> imzalayıp yayınlar, asla istek üzerine değil — böylece zamanlama kişi hakkında hiçbir şey ele vermez. Her yayın ayrıca herkese açık çapa günlüğüne yazılır.</li>
          <li>Doğrulayıcılar listeleri <strong>önceden çeker</strong>; bir belgeyi denetlemek ne kuruma ne de telefonuna ağ çağrısı yapar.</li>
          <li>Bir iptal en geç yaklaşık 90 dakikada her doğrulayıcıya ulaşır. Doğrulayıcının elindeki liste güncel değilse cevap “red” değil <strong>belirsiz</strong> olur.</li>
          <li>Askı geri alınabilir (örneğin bir inceleme sırasında); iptal kesindir.</li>
        </ul>

        <Callout title="Hatırlatma" tone="accent">
          Bu sayfadaki tüm kriptografik tasarım mimari yön ve fizibilite
          göstergesidir; üretim öncesi bağımsız bir güvenlik denetiminden
          geçmelidir. Standartlar (BIP32/39, DKG + threshold ElGamal, HKDF, AES-GCM, WebAuthn, ICAO
          9303) olgun; birleşim ve parametreler denetlenmelidir.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Dikeldiş we ýatyrylyş",
      description:
        "Credential mazmunynyň konwert şifrlemesi (AES-256-GCM + HKDF) bilen goralmagy, enjam/açar dikeldiş ssenariýalary we IETF Token Status List bilen ýatyrylyş (häzir işleýär).",
    },
    eyebrow: "Ösen Arhitektura",
    title: "Dikeldiş we ýatyrylyş",
    intro:
      "SSI-de ulanyjy açaryny özi saklaýar — ýöne enjam ýitse ýa-da döwülse näme? We bir açar güýçden gaçyrylsa bu nähili yglan edilýär? Iki mehanizm: konwert şifrlemesi + dikeldiş akymlary we status listeler.",
    body: (
      <>
        <Callout title="Dizaýn tapgyry" tone="gold">
          Aşakdaky konwert şifrlemesi we dikeldiş akymlary meýilleşdirilen dizaýndyr; heniz amala aşyrylmady. Ýatyrylyş (sahypanyň ahyrynda) häzir işleýär.
        </Callout>

        <h2>Credential mazmuny nähili goralýar? Konwert şifrlemesi</h2>
        <p>
          Maksat: döwlet serweri credential mazmunyny (saglyk ýazgysy, diplom){" "}
          <strong>hiç şertde okap bilmesin</strong>; diňe holderyň seed-i açyp
          bilsin. Usul, parol dolandyryjylarynyň (1Password, Bitwarden) ulanýan{" "}
          <strong>konwert şifrlemesidir (envelope encryption)</strong>:
        </p>
        <ul>
          <li>
            Her credential, tötän bir <strong>DEK</strong> (Data Encryption Key)
            bilen simmetrik şifrlenýär: <code>AES-256-GCM</code>.
          </li>
          <li>
            DEK, holderyň seed-inden alnan bir <strong>KEK</strong> (Key Encryption
            Key) bilen dolanýar: <code>HKDF</code> bilen türetme + AES-KeyWrap.
          </li>
          <li>
            Serwerde diňe <code>(ciphertext, wrapped_DEK)</code> durýar. Serwer
            KEK-i asla görmeýär → DEK-i açyp bilmeýär → mazmuny okap bilmeýär.
          </li>
        </ul>
        <CodeBlock label="Kör saklaýyş: serwer mazmuny asla görüp bilmeýär" code={BLIND_TK} />
        <p>
          Täze enjamda holder seed-i girizende şol bir KEK deterministik ýagdaýda
          gaýtadan alynýar, <code>wrapped_DEK</code> açylýar we credential çözülýär.
        </p>

        <h2>Enjam ssenariýalary</h2>

        <h3>1) Täze enjam, seed bellidir</h3>
        <p>
          Ulanyjy 24 sözi girizýär; enjam seed-den açarlary ýerli alýar. Serwere{" "}
          <strong>parol/PIN ugradylmaýar</strong>: serwer bir nonce (challenge)
          ugradýar, enjam alnan gizlin açar bilen gol çekýär, serwer hasaba alnan
          açyk açar bilen barlaýar — <strong>açyk açar challenge-response</strong>{" "}
          (FIDO2/WebAuthn logikasy). Barlag üstünlikli bolsa şifrlenen bloblar
          ýüklenýär we ýerli çözülýär. Soň bir PIN bellenýär (apparat howpsuz
          zolagynda — Secure Enclave / StrongBox saklanýar), köne enjamyň açary
          ýatyrylyş listesine düşýär.
        </p>

        <h3>2) PIN unudyldy, seed elde, enjam elde</h3>
        <p>
          24 söz gaýtadan soralýar, seed ýerli barlanýar, täze PIN bellenýär.{" "}
          <strong>Serwere hiç haýyş gitmeýär</strong> — düýbünden enjam-ýerli iş.
        </p>

        <h3>3) Enjam we seed ýiten (ikinji tapgyr — ýörelge)</h3>
        <p>
          Bu ssenariýanyň takyk dizaýny heniz kämilleşmedi; whitepaper-de{" "}
          <strong>“geljek tapgyr”</strong> hökmünde bellenýär. Ýörelge:
        </p>
        <ul>
          <li>
            Döwletiň şahsyýet barlag kanalyna ýüz tutulýar; biometrika + resminama:{" "}
            e-şahsyýet/pasport NFC çipi (<strong>ICAO 9303</strong>) okalýar, janly
            ýüz skany çip suraty bilen deňeşdirilýär.
          </li>
          <li>
            Şahsyýet barlanandan soň täze seed öndürilýär. Guardian eşigi (teklip:
            2-of-5, <em>kazyýet karary gerek däl</em> — bu ulanyjy-talapy dikeldiş,
            jenaýat prosesi däl) täze açary kök şahsyýete gaýtadan baglaýar.
          </li>
          <li>
            Köne açarlar ýatyrylýar; credential-lar gaýtadan issue edilýär (ýa-da
            täze KEK bilen gaýtadan gaplanýar — bu ädimiň takyk dizaýny açyk).
          </li>
        </ul>

        <Callout title="Hasabatly açyklamadan tapawudy" tone="gold">
          Dikeldiş, ulanyjynyň öz talaby bilen we has pes eşik bilen (teklip
          2-of-5, kazyýet kararsyz) ýöreýär. Şahsyýet çözmek (
          <Link href="/docs/accountable-disclosure">hasabatly açyklama</Link>) bolsa
          kazyýet prosesi + has ýokary eşik (3-of-5) talap edýär. Iki proses
          bilkastdan aýrylandyr.
        </Callout>

        <h2>Ýatyrylyş — IETF Token Status List (häzir işleýär)</h2>
        <p>
          Resminama güýjüni ýitirende her barlaýjy muny bilmeli — beriji kimiň barlanýandygyny
          bilmezden. Tamga EUDI arhitekturasynyň sanaw görnüşi bolan{" "}
          <strong>IETF Token Status List</strong> ulanýar:
        </p>
        <ul>
          <li>Her resminama nusgasynyň gysylan sanawda <strong>tötänleýin</strong> orny bar; nusga başyna iki bit: güýjünde, ýatyrylan ýa-da togtadylan.</li>
          <li>Beriji sanawy <strong>kesgitli aralykda</strong> gol çekip çap edýär, asla haýyş boýunça däl — şeýlelikde wagty adam barada hiç zady aýan etmeýär. Her çap edilişi açyk labyr žurnalyna hem ýazylýar.</li>
          <li>Barlaýjylar sanawlary <strong>öňünden alýar</strong>; resminamany barlamak ne berijä, ne-de telefonyňa tor çagyryşyny edýär.</li>
          <li>Ýatyrylyş iň giç takmynan 90 minutda her barlaýja ýetýär. Barlaýjydaky sanaw täze bolmasa, jogap “ret” däl, <strong>kesgitsiz</strong> bolýar.</li>
          <li>Togtatma yzyna alnyp bilner (meselem, derňew wagtynda); ýatyrylyş gutarnyklydyr.</li>
        </ul>

        <Callout title="Ýatlatma" tone="accent">
          Bu sahypadaky ähli kriptografik dizaýn arhitektura ugry we mümkinçilik
          görkezijisidir; önümçilikden öň garaşsyz howpsuzlyk barlagyndan geçmeli.
          Standartlar (BIP32/39, DKG + threshold ElGamal, HKDF, AES-GCM, WebAuthn, ICAO 9303) kämil; birleşim we parametrler barlanmaly.
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
  return pageMeta(locale, "/docs/recovery-revocation", { title: c.meta.title, description: c.meta.description });
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
      href="/docs/recovery-revocation"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CodeBlock } from "@/components/doc-article";
import { CodeTabs } from "@/components/code-tools";
import { EXAMPLES } from "@/content/examples.generated";
import { ConsentMock, getSignInConsent } from "@/components/sign-in-tamga";
import { FlowStrip } from "@/components/scenario-visuals";
import type { Locale } from "@/i18n/routing";

type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  body: ReactNode;
};

/* Kaynak: tamga-network/docs/guides/01-web-giris.md (GUIDE-0001) · kod: tamga-network/examples/01-web-login (testli) */
const LOGIN_TABS = [
  { label: "server.ts", code: EXAMPLES.webLoginServer },
  { label: "page.html", code: EXAMPLES.webLoginPage },
];

const PASSKEY_CODE = `import { passkey } from "@tamga-network/verifier/web";
// after sign-up, while the session is open:
const o = await post("/passkey/register/options");
await post("/passkey/register/verify", await passkey.create(o));
// daily sign-in — no wallet, no fields shared:
const { flow, options } = await post("/passkey/login/options");
await post("/passkey/login/verify", { flow, response: await passkey.get(options) });`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Sign in with Tamga",
      description:
        "Sign up to a website once with your wallet — only the fields you approve — then sign in every day with a passkey that shares nothing.",
    },
    eyebrow: "How Tamga works",
    title: "Sign in with Tamga",
    intro:
      "You already know “Sign in with Google”. “Sign in with Tamga” looks the same, but works the other way round: the identity lives in your wallet, the site gets only the fields you approve, and after the first time it gets nothing at all.",
    body: (
      <>
        <h2>Two steps: sign up once, then a passkey</h2>
        <ol>
          <li>
            <strong>Sign up (once).</strong> The site asks for a small set of fields — for example
            first name, last name and an account key. On a computer you scan a QR code; on the
            phone the wallet opens directly. The wallet shows exactly what is asked and who is
            asking; you approve.
          </li>
          <li>
            The verifier checks the presentation — signature, trust list, revocation status and
            the device binding. The site receives the result on its own server and opens your
            account.
          </li>
          <li>
            <strong>Add a passkey.</strong> Right after sign-up the site offers “add a passkey to
            this device”. From then on you sign in with Face ID or a fingerprint:{" "}
            <strong>the wallet does not open and no field is shared</strong>. The passkey only
            works for that one site.
          </li>
          <li>
            <strong>New device, no passkey?</strong> “Sign in with Tamga” asks for the account
            key only, then you add a passkey again.
          </li>
        </ol>

        <FlowStrip
          nodes={[
            { label: "Website", sub: "asks for fields" },
            { label: "Tamga Wallet", sub: "you approve" },
            { label: "Verifier", sub: "checks the proof" },
            { label: "Passkey", sub: "daily sign-in" },
          ]}
        />

        <h2>You approve, field by field</h2>
        <p>
          The site asks only for what it needs; fields you don’t approve are never sent. Some
          facts can be proven instead of revealed — “over 18” without the birth date.
        </p>
        <ConsentMock d={getSignInConsent("en")} />

        <Callout title="What a site can — and cannot — get" tone="primary">
          A site receives <strong>only the fields you approve</strong>. There is no password to
          steal. It cannot ask beyond its registered scope: every relying party is listed in the
          trust list with the fields it may request, and your wallet warns on anything more. The
          account key a site stores is its own keyed hash, so two sites cannot match their
          users by it.
        </Callout>

        <h2>For developers</h2>
        <p>
          The page kit is <code>@tamga-network/verifier/web</code> (also served as a script by the
          verifier). It draws the QR code or the “open in wallet” button and reports the result —
          it does <strong>not</strong> make the decision: browser code can be changed by the user,
          so the decision is always made on your server.
        </p>
        <CodeTabs tabs={LOGIN_TABS} copyLabel="Copy" copiedLabel="Copied" />
        <CodeBlock label="Passkey (WebAuthn)" code={PASSKEY_CODE} copy={["Copy", "Copied"]} />
        <ul>
          <li><strong>One use:</strong> a presentation opens exactly one session.</li>
          <li><strong>Three outcomes:</strong> ACCEPTED, REJECTED or INDETERMINATE. INDETERMINATE means “could not be checked right now — try again”, never “the document is invalid”.</li>
          <li><strong>Cookies:</strong> HttpOnly, SameSite=Lax, Secure, server-side expiry; never log names, keys or passkey IDs.</li>
          <li>WebAuthn does not work on a bare IP address — use <code>localhost</code> or an HTTPS domain.</li>
        </ul>

        <h2>Built on open standards</h2>
        <p>
          Not a proprietary login: presentations use <strong>OpenID for Verifiable Presentations
          (OpenID4VP)</strong> with <Link href="/docs/did-vc">SD-JWT VC</Link> credentials — the
          same profiles as the EU’s EUDI Wallet — and daily sign-in uses standard{" "}
          <strong>WebAuthn passkeys</strong>.
        </p>

        <Callout title="Status today" tone="gold">
          Working end to end on our sample site (sign-up, repeat-use rejection, sign-in, passkey). The
          hosted verifier hands results only to the site that opened the presentation, proven with a
          signature from its trust-list key, and releases the values once. A per-site pseudonymous
          account key issued by the wallet is on the roadmap.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Tamga ile giriş yap",
      description:
        "Web sitesine cüzdanınla bir kez kaydol — yalnızca onayladığın alanlarla — sonra her gün hiçbir şey paylaşmayan bir passkey ile giriş yap.",
    },
    eyebrow: "Tamga nasıl çalışır",
    title: "Tamga ile giriş yap",
    intro:
      "“Google ile giriş yap”ı biliyorsun. “Tamga ile giriş yap” aynı görünür ama tersine çalışır: kimlik senin cüzdanındadır, site yalnızca onayladığın alanları alır ve ilk seferden sonra hiçbir şey almaz.",
    body: (
      <>
        <h2>İki adım: bir kez kayıt, sonra passkey</h2>
        <ol>
          <li>
            <strong>Kayıt (bir kez).</strong> Site az sayıda alan ister — örneğin ad, soyad ve bir
            hesap anahtarı. Bilgisayarda QR kodu okutursun; telefonda cüzdan doğrudan açılır.
            Cüzdan tam olarak neyin, kim tarafından istendiğini gösterir; onaylarsın.
          </li>
          <li>
            Doğrulayıcı sunumu denetler — imza, güven listesi, iptal durumu ve cihaz bağı. Site
            sonucu kendi sunucusunda alır ve hesabını açar.
          </li>
          <li>
            <strong>Passkey ekle.</strong> Kayıttan hemen sonra site “bu cihaza passkey ekle”
            önerir. Bundan sonra Face ID ya da parmak iziyle girersin:{" "}
            <strong>cüzdan açılmaz, hiçbir alan paylaşılmaz</strong>. Passkey yalnızca o siteye
            özeldir.
          </li>
          <li>
            <strong>Yeni cihaz, passkey yok mu?</strong> “Tamga ile giriş yap” yalnızca hesap
            anahtarını ister, sonra yeniden passkey eklersin.
          </li>
        </ol>

        <FlowStrip
          nodes={[
            { label: "Web sitesi", sub: "alan ister" },
            { label: "Tamga Wallet", sub: "sen onaylarsın" },
            { label: "Doğrulayıcı", sub: "kanıtı denetler" },
            { label: "Passkey", sub: "günlük giriş" },
          ]}
        />

        <h2>Alan alan sen onaylarsın</h2>
        <p>
          Site yalnızca ihtiyacı olanı ister; onaylamadığın alan asla gönderilmez. Bazı bilgiler
          açıklanmadan kanıtlanabilir — doğum tarihi vermeden “18 yaş üstü”.
        </p>
        <ConsentMock d={getSignInConsent("tr")} />

        <Callout title="Bir site neyi alabilir — neyi alamaz" tone="primary">
          Site <strong>yalnızca onayladığın alanları</strong> alır. Çalınacak şifre yoktur. Kayıtlı
          kapsamının dışına çıkamaz: her doğrulayıcı, isteyebileceği alanlarla birlikte güven
          listesinde kayıtlıdır ve cüzdanın fazlasını uyarır. Sitenin sakladığı hesap anahtarı
          kendi sırrıyla üretilmiş bir özettir; iki site kullanıcılarını bununla eşleştiremez.
        </Callout>

        <h2>Geliştiriciler için</h2>
        <p>
          Sayfa kiti <code>@tamga-network/verifier/web</code>’dir (doğrulayıcı bunu betik olarak
          da sunar). QR kodunu ya da “cüzdanda aç” düğmesini çizer ve sonucu bildirir — kararı{" "}
          <strong>vermez</strong>: tarayıcı kodu kullanıcı tarafından değiştirilebilir, bu yüzden
          karar her zaman senin sunucunda verilir.
        </p>
        <CodeTabs tabs={LOGIN_TABS} copyLabel="Kopyala" copiedLabel="Kopyalandı" />
        <CodeBlock label="Passkey (WebAuthn)" code={PASSKEY_CODE} copy={["Kopyala", "Kopyalandı"]} />
        <ul>
          <li><strong>Tek kullanım:</strong> bir sunum tam olarak bir oturum açar.</li>
          <li><strong>Üç sonuç:</strong> ACCEPTED, REJECTED ya da INDETERMINATE. INDETERMINATE “şu an denetlenemedi — tekrar dene” demektir, asla “belge geçersiz” değil.</li>
          <li><strong>Çerez:</strong> HttpOnly, SameSite=Lax, Secure, sunucu tarafında süre; ad, anahtar ya da passkey kimliği asla loglanmaz.</li>
          <li>WebAuthn çıplak IP adresinde çalışmaz — <code>localhost</code> ya da HTTPS alan adı kullan.</li>
        </ul>

        <h2>Açık standartlar üzerine</h2>
        <p>
          Kapalı bir giriş sistemi değil: sunumlar <Link href="/docs/did-vc">SD-JWT VC</Link>{" "}
          belgeleriyle <strong>OpenID for Verifiable Presentations (OpenID4VP)</strong> kullanır —
          AB’nin EUDI Wallet’ıyla aynı profiller — günlük giriş ise standart{" "}
          <strong>WebAuthn passkey</strong>’dir.
        </p>

        <Callout title="Bugünkü durum" tone="gold">
          Örnek sitemizde uçtan uca çalışıyor (kayıt, tekrar kullanımın reddi, giriş, passkey).
          Barındırılan doğrulayıcı sonucu yalnızca sunumu açan siteye verir — site bunu güven
          listesindeki anahtarıyla imzalayarak kanıtlar — ve değerleri bir kez teslim eder.
          Cüzdanın her site için ayrı takma ad hesap anahtarı üretmesi yol haritasında.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Tamga bilen gir",
      description:
        "Web saýta gapjygyň bilen bir gezek hasaba dur — diňe tassyklan meýdanlaryň bilen — soňra her gün hiç zat paýlaşmaýan passkey bilen gir.",
    },
    eyebrow: "Tamga nähili işleýär",
    title: "Tamga bilen gir",
    intro:
      "“Google bilen gir” sana tanyş. “Tamga bilen gir” şeýle görünýär, ýöne tersine işleýär: şahsyýet seniň gapjygyňda, saýt diňe tassyklan meýdanlaryňy alýar we ilkinji gezekden soň hiç zat almaýar.",
    body: (
      <>
        <h2>Iki ädim: bir gezek hasaba durmak, soň passkey</h2>
        <ol>
          <li>
            <strong>Hasaba durmak (bir gezek).</strong> Saýt az sanly meýdan soraýar — meselem,
            ady, familiýasy we hasap açary. Kompýuterde QR kody okadýarsyň; telefonda gapjyk göni
            açylýar. Gapjyk nämäniň, kim tarapyndan soralýandygyny takyk görkezýär; sen
            tassyklaýarsyň.
          </li>
          <li>
            Barlaýjy hödürlemäni barlaýar — gol, ynam sanawy, ýatyrylyş ýagdaýy we enjam
            baglanyşygy. Saýt netijäni öz serwerinde alýar we hasabyňy açýar.
          </li>
          <li>
            <strong>Passkey goş.</strong> Hasaba duranyňdan soň saýt “bu enjama passkey goş”
            diýip teklip edýär. Mundan beýläk Face ID ýa-da barmak yzy bilen girýärsiň:{" "}
            <strong>gapjyk açylmaýar, hiç bir meýdan paýlaşylmaýar</strong>. Passkey diňe şol
            saýt üçin işleýär.
          </li>
          <li>
            <strong>Täze enjam, passkey ýokmy?</strong> “Tamga bilen gir” diňe hasap açaryny
            soraýar, soň ýene passkey goşýarsyň.
          </li>
        </ol>

        <FlowStrip
          nodes={[
            { label: "Web saýt", sub: "meýdan soraýar" },
            { label: "Tamga Wallet", sub: "sen tassyklaýarsyň" },
            { label: "Barlaýjy", sub: "subutnamany barlaýar" },
            { label: "Passkey", sub: "gündelik giriş" },
          ]}
        />

        <h2>Meýdan-meýdan sen tassyklaýarsyň</h2>
        <p>
          Saýt diňe zerur zady soraýar; tassyklamadyk meýdanyň asla iberilmeýär. Käbir
          maglumatlar açylman subut edilip bilner — doglan senesi berilmän “18 ýaşdan uly”.
        </p>
        <ConsentMock d={getSignInConsent("tk")} />

        <Callout title="Saýt näme alyp biler — näme alyp bilmez" tone="primary">
          Saýt <strong>diňe tassyklan meýdanlaryňy</strong> alýar. Ogurlanjak parol ýok. Hasaba
          alnan çäginden çykyp bilmez: her barlaýjy soraýan meýdanlary bilen birlikde ynam
          sanawynda hasaba alnandyr we gapjygyň artykmajy barada duýduryş berýär. Saýtyň
          saklaýan hasap açary öz syry bilen döredilen heşdir; iki saýt ulanyjylaryny muňa görä
          deňeşdirip bilmeýär.
        </Callout>

        <h2>Işläp düzüjiler üçin</h2>
        <p>
          Sahypa toplumy <code>@tamga-network/verifier/web</code> (barlaýjy ony skript hökmünde
          hem hödürleýär). QR kody ýa-da “gapjykda aç” düwmesini çekýär we netijäni habar berýär
          — karary <strong>bermeýär</strong>: brauzer kody ulanyjy tarapyndan üýtgedilip bilner,
          şonuň üçin karar hemişe seniň serweriňde berilýär.
        </p>
        <CodeTabs tabs={LOGIN_TABS} copyLabel="Göçür" copiedLabel="Göçürildi" />
        <CodeBlock label="Passkey (WebAuthn)" code={PASSKEY_CODE} copy={["Göçür", "Göçürildi"]} />
        <ul>
          <li><strong>Bir gezek ulanmak:</strong> bir hödürleme takyk bir sessiýa açýar.</li>
          <li><strong>Üç netije:</strong> ACCEPTED, REJECTED ýa-da INDETERMINATE. INDETERMINATE “häzir barlap bolmady — gaýtadan synanyş” diýmekdir, asla “resminama nädogry” däl.</li>
          <li><strong>Kuki:</strong> HttpOnly, SameSite=Lax, Secure, serwer tarapynda möhlet; at, açar ýa-da passkey belgisi asla žurnala ýazylmaýar.</li>
          <li>WebAuthn ýalaňaç IP salgysynda işlemeýär — <code>localhost</code> ýa-da HTTPS domen ulan.</li>
        </ul>

        <h2>Açyk standartlara esaslanýar</h2>
        <p>
          Ýapyk giriş ulgamy däl: hödürlemeler <Link href="/docs/did-vc">SD-JWT VC</Link>{" "}
          resminamalary bilen <strong>OpenID for Verifiable Presentations (OpenID4VP)</strong>{" "}
          ulanýar — ÝB-niň EUDI Wallet-y bilen şol bir profiller — gündelik giriş bolsa standart{" "}
          <strong>WebAuthn passkey</strong>.
        </p>

        <Callout title="Häzirki ýagdaý" tone="gold">
          Nusga saýtymyzda başdan-aýak işleýär (hasaba durmak, gaýtadan ulanmagyň ret edilmegi,
          giriş, passkey). Ýerleşdirilen barlaýjy netijäni diňe hödürlemäni açan saýta berýär —
          saýt muny ynam sanawyndaky açary bilen gol çekip subut edýär — we bahalary bir gezek
          berýär. Gapjygyň her saýt üçin aýry lakam hasap açaryny döretmegi ýol kartasynda.
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
  return pageMeta(locale, "/docs/login-with-tamga", { title: c.meta.title, description: c.meta.description });
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
      href="/docs/login-with-tamga"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

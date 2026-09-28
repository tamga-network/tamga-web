import type { Metadata } from "next";
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

// Language-neutral math (DKG + threshold ElGamal — the key is NEVER reconstructed).
const DKG_MATH = `DKG:    guardians jointly form  PK = g^x ,  x = Σ xᵢ   (NO party ever holds x)
        guardian i keeps only its share xᵢ ,  public hᵢ = g^{xᵢ}

escrow: E = Enc(PK, m) = ( g^r ,  m · PK^r )     // m: pseudonym → identity binding
        + NIZK π : proves E is well-formed  (a pseudonym without a valid
                    escrow receipt is network-invalid)

open:   3 guardians publish partial decryptions  dᵢ = (g^r)^{xᵢ}
        combine (Lagrange in the exponent):  PK^r = ∏ dᵢ^{λᵢ}
        recover  m = c₂ / PK^r
        → the secret x is NEVER reconstructed; only THIS ciphertext is opened`;

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Accountable disclosure (escrow)",
      description:
        "Protecting the pseudonym → root identity mapping with threshold cryptography (DKG + threshold ElGamal, no key reconstruction); auditable opening via a court token and a 3-of-5 institutional guardian threshold with a non-executive rule.",
    },
    eyebrow: "Advanced Architecture",
    title: "Accountable disclosure (escrow)",
    intro:
      "The aim is not to hide from the state; it is to ensure that no single actor — the state included — can reveal an identity alone and without a trace. This is called accountable disclosure.",
    body: (
      <>
        <Callout title="Research" tone="gold">
          Accountable disclosure is a research-stage design (threshold cryptography, court-authorized opening). It is not part of the first release or the pilot and will pass an independent security review before any use.
        </Callout>

        <Callout title="Framing the problem correctly" tone="accent">
          The issue is not “the state must not see”; the state can already see
          legally. The issue is preventing manipulation, data theft, insider abuse
          and single-point-of-failure in systems like e-government. The solution:
          sovereign access is possible, but{" "}
          <strong>no single actor can access alone or without a trace.</strong>
        </Callout>

        <h2>Why is a separate escrow needed?</h2>
        <p>
          <Link href="/docs/identity-layers">Pseudonym derivation</Link> is
          one-way — the question “who is this pseudonym?” cannot be answered by
          going backwards from the derivation. For guardians to answer it (only
          with authority), a separate <strong>mapping record (escrow)</strong>{" "}
          holds the encrypted link between the root identity and the pseudonyms.
          Each time a pseudonym is derived, the wallet uploads this escrow and
          receives a receipt; <strong>a pseudonym without a valid escrow receipt
          is network-invalid</strong> (no escape hatch).
        </p>

        <h2>Threshold cryptography: DKG, not key reconstruction</h2>
        <p>
          The decryption capability never sits in one place — and, crucially, it is{" "}
          <strong>never re-assembled</strong>. Tamga uses:
        </p>
        <ul>
          <li><strong>Distributed Key Generation (DKG)</strong> — guardians jointly create the joint public key; no party ever holds the full private key.</li>
          <li><strong>Threshold ElGamal</strong> — opening is a joint <em>partial decryption</em>: each guardian applies its share to the specific ciphertext, and the results are combined without ever reconstructing the key.</li>
          <li><strong>Verifiable encryption (NIZK)</strong> — the escrow ciphertext carries a proof that it encrypts a well-formed identity binding, so no one can register a “garbage” escrow to escape disclosure.</li>
        </ul>
        <CodeBlock label="DKG + threshold ElGamal (the key is never reconstructed)" code={DKG_MATH} />

        <h3>Setup: an institutional 5, 3-of-5</h3>
        <p>
          The guardians are an <strong>institutional set of five</strong> per state —
          the <strong>judiciary</strong>, the <strong>data-protection authority</strong>,
          the <strong>civil-registry authority</strong>, the <strong>ombudsman</strong>,
          and a <strong>parliament-appointed</strong> member. The threshold is{" "}
          <strong>3-of-5</strong>, with a rule that at least one approving seat must be{" "}
          <strong>non-executive</strong> (so the executive branch can never open an
          identity on its own). The network operator holds no voting seat — resolving a
          state’s own citizen is a matter of that state’s sovereignty.
        </p>

        <h3>Opening: court token + 3 guardians (≥1 non-executive)</h3>
        <p>
          When a <strong>court token</strong> (an X.509-signed cryptographic object,
          not paper) is presented, at least 3 guardians each perform a{" "}
          <strong>partial decryption</strong> with their own share; the partial
          results are combined so that only the{" "}
          <strong>pseudonym → root identity</strong> mapping is revealed — the secret
          key is never reconstructed. The{" "}
          <strong>credential content is never touched</strong>, because it is protected
          with a completely different key (
          <Link href="/docs/recovery-revocation">envelope encryption</Link>) that
          guardians hold no share of. Every opening is written to an immutable audit
          log.
        </p>

        <h3>Emergency mode</h3>
        <p>
          When time is critical, an <strong>emergency mode</strong> allows opening at{" "}
          <strong>2-of-5</strong> — but full-threshold (3-of-5) confirmation must arrive
          within <strong>48 hours</strong>, otherwise access is automatically cancelled
          and an alarm is raised. Speed and accountability are preserved together.
        </p>

        <h3>Cross-border: a “who/what” split key</h3>
        <p>
          For a case that spans states, the key is split by responsibility. The person’s{" "}
          <strong>home state (nationality)</strong> can open the “<strong>who</strong>”
          (the real identity); the <strong>state where the event occurred</strong> can
          open the “<strong>what</strong>”. Neither side can assemble the full file
          alone; if the home state refuses, the identity is not opened — a digital,
          sovereignty-respecting form of mutual legal assistance.
        </p>

        <Callout title="Result: accountable anonymity" tone="primary">
          The state can, through a judicial process, resolve a pseudonym to an
          identity — but it cannot do so alone or silently. The process requires a
          guardian threshold plus a non-executive approval, the court order is a
          cryptographic token (not paper), and every opening is written to an immutable
          audit log. Access is possible, but traceable and distributed.
        </Callout>

        <h2>Open points</h2>
        <p>
          The parts that must still mature are marked clearly: the concrete
          institutional mapping of the five guardian roles and the legal framework of
          the emergency mode (a governance matter), and the specific verifiable-
          encryption / court-token primitives, which must pass an independent
          cryptographic audit before production.
        </p>

        <Callout title="Report a vulnerability" tone="primary">
          Found a security issue in Tamga? Please disclose it responsibly to{" "}
          <a href="mailto:security@tamga.network">security@tamga.network</a> and give
          us reasonable time to investigate and fix it before any public disclosure.
        </Callout>
      </>
    ),
  },
  tr: {
    meta: {
      title: "Hesap verebilir ifşa (escrow)",
      description:
        "Pseudonym → kök kimlik eşlemesinin eşik kriptografiyle (DKG + threshold ElGamal, anahtar yeniden kurulmaz) korunması; mahkeme token'ı ve yürütme-dışı kurallı 3-of-5 kurumsal guardian eşiğiyle denetlenebilir açma.",
    },
    eyebrow: "İleri Mimari",
    title: "Hesap verebilir ifşa (escrow)",
    intro:
      "Amaç devletten gizlemek değil; tek bir aktörün — devlet dahil — izsiz ve tek başına kimlik açamamasını sağlamak. Buna hesap verebilir ifşa (accountable disclosure) denir.",
    body: (
      <>
        <Callout title="Araştırma" tone="gold">
          Hesap verebilir ifşa araştırma aşamasında bir tasarımdır (eşik kriptografisi, mahkeme yetkisiyle açma). İlk sürümün ya da pilotun parçası değildir; herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir.
        </Callout>

        <Callout title="Problemin doğru kurulması" tone="accent">
          Mesele “devlet görmesin” değildir; devlet zaten yasal olarak görebilir.
          Mesele; e-Devlet gibi sistemlerdeki manipülasyonu, veri hırsızlığını,
          içeriden kötüye kullanımı ve tek-nokta-çökmesini önlemektir. Çözüm:
          egemen erişim mümkün olsun, ama{" "}
          <strong>tek aktör tek başına ve izsiz erişemesin.</strong>
        </Callout>

        <h2>Neden ayrı bir escrow gerekir?</h2>
        <p>
          <Link href="/docs/identity-layers">Pseudonym türetmesi</Link> tek
          yönlüdür — “bu pseudonym kim?” sorusu türetmeden geriye giderek
          yanıtlanamaz. Guardian’ların bu soruyu (yalnızca yetkiyle)
          yanıtlayabilmesi için, kök kimlik ile pseudonym’ler arasındaki şifreli
          bağı tutan ayrı bir <strong>eşleme kaydı (escrow)</strong> gerekir. Her
          pseudonym türetildiğinde cüzdan bu escrow’u yükler ve bir makbuz alır;{" "}
          <strong>geçerli escrow makbuzu olmayan pseudonym ağ-geçersizdir</strong>{" "}
          (kaçış yolu yok).
        </p>

        <h2>Eşik kriptografisi: DKG, anahtar yeniden kurma yok</h2>
        <p>
          Şifre çözme yeteneği tek bir yerde durmaz — ve kritik olarak{" "}
          <strong>asla yeniden birleştirilmez</strong>. Tamga şunları kullanır:
        </p>
        <ul>
          <li><strong>Dağıtık Anahtar Üretimi (DKG)</strong> — guardian’lar ortak açık anahtarı birlikte üretir; hiçbir taraf tam özel anahtarı asla elinde tutmaz.</li>
          <li><strong>Threshold ElGamal</strong> — açma bir ortak <em>kısmi çözme</em>dir: her guardian payını ilgili şifreli metne uygular, sonuçlar anahtar hiç yeniden kurulmadan birleştirilir.</li>
          <li><strong>Doğrulanabilir şifreleme (NIZK)</strong> — escrow şifreli metni, iyi biçimli bir kimlik bağını şifrelediğinin kanıtını taşır; böylece kimse ifşadan kaçmak için “çöp” escrow kaydedemez.</li>
        </ul>
        <CodeBlock label="DKG + threshold ElGamal (anahtar asla yeniden kurulmaz)" code={DKG_MATH} />

        <h3>Kurulum: kurumsal 5’li, 3-of-5</h3>
        <p>
          Guardian’lar devlet başına <strong>kurumsal bir 5’lidir</strong> —{" "}
          <strong>yargı</strong>, <strong>veri-koruma otoritesi</strong>,{" "}
          <strong>nüfus/kimlik otoritesi</strong>, <strong>ombudsman</strong> ve{" "}
          <strong>parlamento-atamalı</strong> bir üye. Eşik <strong>3-of-5</strong>’tir
          ve en az bir onaylayan koltuğun <strong>yürütme-dışı</strong> olması kuralı
          vardır (böylece yürütme erki bir kimliği tek başına açamaz). Ağ işletmecisinin
          oy veren bir koltuğu yoktur — bir devletin kendi vatandaşını açması o devletin
          egemenlik meselesidir.
        </p>

        <h3>Açma: mahkeme token’ı + 3 guardian (≥1 yürütme-dışı)</h3>
        <p>
          Bir <strong>mahkeme token’ı</strong> (kâğıt değil, X.509 imzalı kriptografik
          nesne) sunulduğunda en az 3 guardian, kendi payıyla{" "}
          <strong>kısmi çözme</strong> yapar; kısmi sonuçlar birleştirilerek yalnızca{" "}
          <strong>pseudonym → kök kimlik</strong> eşlemesi açığa çıkar — gizli anahtar
          asla yeniden kurulmaz. <strong>Credential içeriğine hiç dokunulmaz</strong>,
          çünkü içerik bambaşka bir anahtarla (
          <Link href="/docs/recovery-revocation">zarf şifreleme</Link>) korunur ve
          guardian’ların o anahtara dair hiçbir payı yoktur. Her açma değiştirilemez bir
          denetim kaydına yazılır.
        </p>

        <h3>Acil durum modu</h3>
        <p>
          Zaman kritikse, bir <strong>acil durum modu</strong>{" "}
          <strong>2-of-5</strong> ile açmaya izin verir — ama tam eşik (3-of-5) onayı{" "}
          <strong>48 saat</strong> içinde gelmelidir; gelmezse erişim otomatik iptal
          edilir ve alarm tetiklenir. Hız ve hesap verebilirlik birlikte korunur.
        </p>

        <h3>Sınır ötesi: “Kim/Ne” ayrık-anahtar</h3>
        <p>
          Birden çok devleti ilgilendiren bir vakada anahtar, sorumluluğa göre ayrılır.
          Kişinin <strong>tabiyet devleti</strong> “<strong>kim</strong>”i (gerçek
          kimlik) açabilir; <strong>olayın gerçekleştiği devlet</strong>{" "}
          “<strong>ne</strong>”yi açabilir. Hiçbir taraf tam dosyayı tek başına
          birleştiremez; tabiyet devleti reddederse kimlik açılmaz — MLAT’ın
          (karşılıklı adli yardım) dijital, egemenliğe saygılı hâli.
        </p>

        <Callout title="Sonuç: hesap verebilir anonimlik" tone="primary">
          Devlet, yargı süreciyle bir pseudonym’i kimliğe çözebilir — ama bunu tek
          başına, sessizce yapamaz. Süreç guardian eşiği + bir yürütme-dışı onay
          gerektirir, mahkeme kararı kriptografik bir token’dır (kâğıt değil) ve her
          açma değiştirilemez bir denetim kaydına yazılır. Erişim mümkün, ama izlenebilir
          ve dağıtılmış.
        </Callout>

        <h2>Açık noktalar</h2>
        <p>
          Olgunlaşması gereken yönler açıkça işaretli: beş guardian rolünün somut
          kurumsal eşlemesi ve acil-mod hukuki çerçevesi (yönetişim konusu), ve
          doğrulanabilir-şifreleme / mahkeme-token primitifleri — bunlar üretim öncesi
          bağımsız bir kriptografik denetimden geçmelidir.
        </p>

        <Callout title="Güvenlik açığı bildir" tone="primary">
          Tamga’da bir güvenlik açığı mı buldunuz? Lütfen sorumlu biçimde{" "}
          <a href="mailto:security@tamga.network">security@tamga.network</a> adresine
          bildirin ve kamuya açıklamadan önce incelemek ve gidermek için bize makul
          bir süre tanıyın.
        </Callout>
      </>
    ),
  },
  tk: {
    meta: {
      title: "Hasabatly açyklama (escrow)",
      description:
        "Pseudonym → kök şahsyýet baglanyşygynyň eşik kriptografiýasy (DKG + threshold ElGamal, açar gaýtadan gurulmaýar) bilen goralmagy; mahkeme token-i we ýerine ýetiriş-daşy kadaly 3-of-5 kurumsal guardian eşigi bilen barlanyp bilinýän açmak.",
    },
    eyebrow: "Ösen Arhitektura",
    title: "Hasabatly açyklama (escrow)",
    intro:
      "Maksat döwletden gizlemek däl; ýeke aktýoryň — döwlet hem — yzsyz we ýeke özi şahsyýeti açyp bilmezligini üpjün etmek. Muňa hasabatly açyklama diýilýär.",
    body: (
      <>
        <Callout title="Gözleg" tone="gold">
          Hasabatly açyklama gözleg tapgyryndaky dizaýndyr (bosaga kriptografiýasy, kazyýetiň ygtyýary bilen açmak). Ol ilkinji wersiýanyň ýa-da pilotyň bölegi däl; islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer.
        </Callout>

        <Callout title="Meseläni dogry goýmak" tone="accent">
          Mesele “döwlet görmesin” däl; döwlet eýýäm kanuny taýdan görüp bilýär.
          Mesele; e-Döwlet ýaly ulgamlardaky manipulýasiýany, maglumat ogurlygyny,
          içerki hyýanatçylygy we ýeke-nokat-çökmesini öňlemekdir. Çözgüt:
          özygtyýarly elýeterlilik mümkin bolsun, ýöne{" "}
          <strong>ýeke aktýor ýeke özi we yzsyz elýeter bolmasyn.</strong>
        </Callout>

        <h2>Näme üçin aýry escrow gerek?</h2>
        <p>
          <Link href="/docs/identity-layers">Pseudonym türetmesi</Link> bir
          taraplaýyn — “bu pseudonym kim?” sowaly türetmeden yza gidip jogaplanyp
          bilinmeýär. Guardian-laryň bu sowaly (diňe ygtyýar bilen) jogaplap bilmegi
          üçin, kök şahsyýet bilen pseudonym-leriň arasyndaky şifrlenen baglanyşygy
          saklaýan aýry <strong>baglanyşyk ýazgysy (escrow)</strong> gerek. Her
          pseudonym türedilende gapjyk bu escrow-y ýükleýär we makbuz alýar;{" "}
          <strong>güýçli escrow makbuzy bolmadyk pseudonym tor-taýdan güýçsüzdir</strong>.
        </p>

        <h2>Eşik kriptografiýasy: DKG, açar gaýtadan gurulmaýar</h2>
        <p>
          Şifr açmak ukyby ýeke ýerde durmaýar — we möhümi, ol{" "}
          <strong>asla gaýtadan birleşdirilmeýär</strong>. Tamga şulary ulanýar:
        </p>
        <ul>
          <li><strong>Paýlanan Açar Öndürmek (DKG)</strong> — guardian-lar umumy açyk açary bilelikde öndürýär; hiç bir tarap doly gizlin açary saklamaýar.</li>
          <li><strong>Threshold ElGamal</strong> — açmak umumy <em>bölekleýin açmakdyr</em>: her guardian öz paýyny degişli şifra ulanýar, netijeler açar hiç gaýtadan gurulman birleşdirilýär.</li>
          <li><strong>Barlanyp bilinýän şifrleme (NIZK)</strong> — escrow şifri, dogry düzülen şahsyýet baglanyşygyny şifrleýändiginiň subutnamasyny göterýär.</li>
        </ul>
        <CodeBlock label="DKG + threshold ElGamal (açar asla gaýtadan gurulmaýar)" code={DKG_MATH} />

        <h3>Gurnama: kurumsal bäşlik, 3-of-5</h3>
        <p>
          Guardian-lar döwlet başyna <strong>kurumsal bäşlikdir</strong> —{" "}
          <strong>kazyýet</strong>, <strong>maglumat-goragy edarasy</strong>,{" "}
          <strong>ilat/şahsyýet edarasy</strong>, <strong>ombudsman</strong> we{" "}
          <strong>parlament-bellenen</strong> agza. Eşik <strong>3-of-5</strong>, we
          azyndan bir tassyklaýan orunlyk <strong>ýerine ýetiriş-daşy</strong> bolmaly.
          Tor operatorynyň ses berýän orny ýok.
        </p>

        <h3>Açmak: mahkeme token-i + 3 guardian (≥1 ýerine ýetiriş-daşy)</h3>
        <p>
          Bir <strong>mahkeme token-i</strong> (kagyz däl, X.509 gol çekilen) hödürlenende
          azyndan 3 guardian, öz paýy bilen <strong>bölekleýin açmak</strong> edýär;
          netijeler birleşdirilip diňe <strong>pseudonym → kök şahsyýet</strong>{" "}
          baglanyşygy açylýar — gizlin açar asla gaýtadan gurulmaýar.{" "}
          <strong>Credential mazmunyna asla degilmeýär</strong>. Her açmak üýtgedip
          bolmajak barlag ýazgysyna ýazylýar.
        </p>

        <h3>Adatdan daşary ýagdaý tertibi</h3>
        <p>
          Wagt möhüm bolanda, <strong>adatdan daşary tertip</strong>{" "}
          <strong>2-of-5</strong> bilen açmaga rugsat berýär — ýöne doly eşik (3-of-5)
          tassyklamasy <strong>48 sagadyň</strong> içinde gelmeli; gelmese elýeterlilik
          awtomatik ýatyrylýar we duýduryş berilýär.
        </p>

        <h3>Serhetaşa: “Kim/Näme” bölünen açar</h3>
        <p>
          Birnäçe döwleti gozgaýan işde açar jogapkärçilige görä bölünýär. Kişiniň{" "}
          <strong>tabyýet döwleti</strong> “<strong>kim</strong>”i açyp bilýär;{" "}
          <strong>waka bolan döwlet</strong> “<strong>näme</strong>”ni açyp bilýär.
          Hiç bir tarap doly dosýany ýeke özi birleşdirip bilmeýär.
        </p>

        <Callout title="Netije: hasabatly anonimlik" tone="primary">
          Döwlet, kazyýet prosesi bilen bir pseudonym-i şahsyýete çözüp bilýär —
          ýöne muny ýeke özi, ümsümlik bilen edip bilmeýär. Proses guardian eşigini +
          bir ýerine ýetiriş-daşy tassyklamany talap edýär, kazyýet karary kriptografik
          token-dir (kagyz däl) we her açmak üýtgedip bolmajak barlag ýazgysyna ýazylýar.
        </Callout>

        <h2>Açyk nokatlar</h2>
        <p>
          Kämilleşmeli taraplar aç-açan bellenýär: bäş guardian rolüniň anyk kurumsal
          eşlemesi we adatdan daşary tertibiň hukuk çarçuwasy (dolandyryş mowzugy), we
          barlanyp bilinýän-şifrleme / mahkeme-token primitiwleri — bular önümçilikden öň
          garaşsyz kriptografik barlagdan geçmeli. (Türkmençe kapsamly terjime bekleýär.)
        </p>

        <Callout title="Howpsuzlyk gowşaklygyny habar beriň" tone="primary">
          Tamga-da howpsuzlyk gowşaklygyny tapdyňyzmy? Haýyş edýäris, ony jogapkärli
          görnüşde{" "}
          <a href="mailto:security@tamga.network">security@tamga.network</a> salgysyna
          habar beriň we köpçülige aýan etmezden öň derňemäge we düzetmäge bize makul
          wagt beriň.
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
      href="/docs/accountable-disclosure"
      eyebrow={c.eyebrow}
      title={c.title}
      intro={c.intro}
    >
      {c.body}
    </DocArticle>
  );
}

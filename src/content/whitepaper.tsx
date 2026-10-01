import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/*
 * Whitepaper v3.0 (2026-09-27). Aynı içerik whitepaper/tamga-whitepaper-{en,tr,tk}.typ (PDF) ile birebir;
 * ikisi de whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme. Kaynaklar: tamga-network DECISIONS §0, ADR-0009…0014, FW-ARF-0001,
 * SPEC-TRUST-0001, SPEC-API-0001, PM-GTM-0001; sapma kütüğü docs/delivery/09 §6.
 */

export type WhitepaperSection = { id: string; n: string; title: string; body: ReactNode };

export type WhitepaperContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  subtitle: string;
  abstractLabel: string;
  abstract: ReactNode;
  tocLabel: string;
  sections: WhitepaperSection[];
  slogan: string;
};

/** Small code/diagram block used inside a section body. */
function Code({ label, code }: { label: string; code: string }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      <div className="border-b border-border px-4 py-2">
        <span className="mono-label">{label}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground-muted">
        {code}
      </pre>
    </div>
  );
}

/** Key / description table (files, identifiers, pipeline steps, phases). */
function KV({ label, rows, mono }: { label: string; rows: string[][]; mono?: boolean }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      {label && (
        <div className="border-b border-border px-4 py-2">
          <span className="mono-label">{label}</span>
        </div>
      )}
      <dl className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="font-mono text-[0.8rem] text-foreground">{k}</dt>
            <dd className={`text-sm leading-relaxed text-foreground-muted ${mono ? "font-mono text-[0.8rem] break-words" : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* --- Language-neutral blocks (shared across locales) --- */

const C_SDJWT = "{\n  \"iss\": \"https://issuer.tamga.network/example-university\",\n  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",\n  \"vct#integrity\": \"sha256-…\",\n  \"iat\": 1790000000,\n  \"cnf\": { \"jwk\": { … } },\n  \"status\": { \"status_list\": {\n    \"idx\": 48213,\n    \"uri\": \"https://status.tamga.network/…\" } },\n  \"_sd\": [ \"…\", \"…\" ]\n}";

const en: WhitepaperContent = {
  meta: { title: "Whitepaper", description: "Tamga Network Whitepaper v3.0 — a Digital Trust Infrastructure for Türkiye and the Turkic world on the EUDI profiles: signed trust lists, SD-JWT VC and ISO mdoc, OpenID4VCI/VP, a five-layer verification pipeline, privacy by design, the path to a ledger, status and limits." },
  eyebrow: "Digital Trust Infrastructure",
  title: "Tamga Network: A Digital Trust Infrastructure for Türkiye and the Turkic World",
  subtitle: "A sovereign reference architecture on the EU’s EUDI profiles — X.509 institutions, signed trust lists today, a permissioned ledger when independent operators join.",
  tocLabel: "Contents",
  abstractLabel: "Executive summary",
  abstract: (
    <>
      <p>Tamga Network is a <strong>Digital Trust Infrastructure</strong>: institutions issue documents — diplomas, student cards, identity credentials, tickets — into a person’s phone, the person shares only the fields a verifier needs, and the verifier checks them in seconds without contacting the issuer.</p>
      <p>Tamga keeps the EU’s technical layer unchanged: <strong>SD-JWT VC</strong> and <strong>ISO 18013-5 mdoc</strong> credentials, <strong>OpenID4VCI/VP</strong>, <strong>X.509</strong> institutions and <strong>signed trust lists</strong> in the ETSI model. Its own layer is governance for the Turkic world: every structure has a slot for each member state, and Tamga acts only as a provisional operator on their behalf.</p>
      <p>Trust is anchored today in versioned, hash-chained trust lists with a public anchor log; a permissioned <strong>Besu/QBFT</strong> ledger is added only when at least two independent operators join. No personal data — not even a hash — is written to lists, logs or ledger. The full flow runs end to end today with real cryptography; this document says what works, what is planned and what is still research.</p>
    </>
  ),
  sections: [
    {
      id: "problem",
      n: "01",
      title: "The problem: the end of the “document copy”",
      body: (
        <>
          <p>For decades people proved who they are by handing over copies. Copies pile up on servers and slip out of control; every bank, employer and university rebuilds the same verification; and authenticity is left to how convincing a copy looks.</p>
          <p>The new model reverses this: the document stays with the person, only the necessary proof is shared, and verification is cryptographic — without asking the source. See <Link href="/docs/why-new-model">why a new model</Link>.</p>
        </>
      ),
    },
    {
      id: "vision",
      n: "02",
      title: "Vision: from eIDAS 2.0 to the Turkic world",
      body: (
        <>
          <p>With <strong>eIDAS 2.0</strong> every EU member state must offer its citizens a <strong>European Digital Identity Wallet</strong>. Its architecture (the ARF) and profiles are becoming the de-facto standard for digital trust.</p>
          <p>The Turkic world shares language, culture and history. A diploma issued in one state should be verifiable in another; an institution’s identity should be trusted across borders. Tamga builds that shared foundation on the same standards, with governance that keeps every state sovereign.</p>
          <p>Tamga is built in three layers that each stand on their own. The base: credentials, protocols and trust lists follow the EU standards, so compatible wallets and verifiers can work with Tamga institutions. Above it, <strong>Tamga Network</strong> is a light federation that collects each state’s trust list and lets states recognise one another — today Tamga publishes Türkiye’s list provisionally, and when a state publishes its own, the network points to it. On that base run <strong>Tamga Wallet</strong>, the network’s first and reference wallet (EU-compatible; “EUDI Wallet” is a title reserved for wallets an EU member state provides or recognises), and services for institutions: the Institution Console and Tamga Verify.</p>
        </>
      ),
    },
    {
      id: "principles",
      n: "03",
      title: "Principles",
      body: (
        <>
          <ul>
            <li><strong>Sovereignty first</strong> — each state is the only writer of its own registry; network membership by a 2/3 vote; cross-border recognition decided unilaterally.</li>
            <li><strong>No personal data in any shared record</strong> — not in lists, logs or ledger; not even a hash.</li>
            <li><strong>Compatible but independent</strong> — the EU’s technical layer as it is; the governance layer written for the Turkic world.</li>
            <li><strong>Built for many states</strong> — no identifier or role assumes Tamga as the only operator; Tamga is always the provisional stand-in.</li>
            <li><strong>A ledger is a choice of signers, not of storage</strong> — lists today; a ledger when independent operators join.</li>
            <li><strong>Holder binding without exception</strong> — every credential copy is bound to a key on the device; a copy cannot be replayed.</li>
            <li><strong>Designed to be handed over</strong> — every provisional power has a measurable handover point.</li>
          </ul>
        </>
      ),
    },
    {
      id: "roles",
      n: "04",
      title: "Roles",
      body: (
        <>
          <p>Every role of the EU architecture exists in Tamga. Where a state has not joined, Tamga holds the role provisionally and on the record: trusted-list operator, registrar, the “TR National Root CA (provisional operator: Tamga)” and the wallet provider. Institutions are attestation providers; employers, websites and gates are registered relying parties. The PID-provider slot is empty until a state fills it; meanwhile an identity credential comes from Tamga’s identity service (document and liveness check). There are no validator operators yet — hence no ledger. Side-by-side: <Link href="/docs/roles">roles and terms</Link>.</p>
        </>
      ),
    },
    {
      id: "trust",
      n: "05",
      title: "Trust model: signed trust lists",
      body: (
        <>
          <p>A signature proves who signed; a <strong>trust list</strong> says whether that signer is a real institution, which document types it may issue, since when, and its current status. Lists are signed JWS files, <strong>versioned and hash-chained</strong>, never deleted, and carry a next-update date; verifiers check the signer against a root fingerprint published out of band. Every revocation-list publication and schema change is also written, at least hourly, to a public <strong>anchor log</strong>, so a rolled-back list can be detected. Details: <Link href="/docs/trust-lists">trust lists</Link>.</p>
          <KV label="Published files — trust.tamga.network" rows={[["lotl.jws", "list of lists — national lists, schemas, wallet providers"], ["tl-tr.jws", "Türkiye — root CAs, issuers (+ authorizations), relying parties"], ["tl-az · kz · kg · uz", "reserved slots for the other member states"], ["anchors.jsonl", "anchor log — one signed line per event, at least hourly"], ["keys/", "root fingerprints (the out-of-band trust anchor)"], ["archive/", "every past version, never deleted"]]} />
          <p>Identifiers are derived, not assigned, and do not change on handover or when the ledger arrives:</p>
          <KV label="Identifiers" rows={[["ca_id", "keccak256(state_code ‖ SHA-256(root certificate))"], ["issuer_id", "keccak256(state_code ‖ SHA-256(issuer certificate))"], ["vct", "urn:tamga:<domain>:<Type>:<major> — e.g. urn:tamga:edu:DiplomaCredential:1"], ["schema_id", "keccak256(vct)"], ["person", "no identifier — a device key per credential copy"]]} mono />
        </>
      ),
    },
    {
      id: "credentials",
      n: "06",
      title: "Credentials: SD-JWT VC and mdoc",
      body: (
        <>
          <p>The main format is <strong>SD-JWT VC</strong> (IETF, <code>dc+sd-jwt</code>, ES256). Each field is hidden behind a salted hash and revealed only with the holder’s approval; the header carries the institution’s X.509 chain; <code>cnf</code> binds the copy to a device key. The identity credential is also issued as an <strong>ISO 18013-5 mdoc</strong>, so an age check can receive <code>age_over_18</code> and nothing else. Document types are stable URNs; their definitions sit in a public catalogue and every credential carries a hash of its definition. See <Link href="/docs/did-vc">credentials</Link>.</p>
          <Code label="An SD-JWT VC diploma (decoded, shortened)" code={C_SDJWT} />
          <KV label="" rows={[["cnf.jwk", "device key of this copy"], ["_sd", "hidden fields, as salted hashes"], ["header · x5c", "the institution's X.509 certificate chain"]]} />
          <p>The national ID number appears only in the identity credential; no diploma, card or ticket carries it.</p>
        </>
      ),
    },
    {
      id: "flows",
      n: "07",
      title: "Issuing and presenting",
      body: (
        <>
          <ul>
            <li><strong>Issuance (OpenID4VCI).</strong> The institution shows a QR code with a PIN on the same screen — the PIN never travels inside the link. Or the wallet starts from the institution directory and proves the person’s identity first. The wallet receives <strong>ten copies</strong>, each bound to a different device key.</li>
            <li><strong>Genuine wallets only.</strong> Issuers require a short-lived <strong>wallet unit attestation</strong> from the wallet provider.</li>
            <li><strong>Presentation (OpenID4VP, DCQL).</strong> The verifier’s request is signed with its registered certificate. The wallet checks it against the trust list, shows exactly what is asked and warns about anything beyond the verifier’s registered scope, then sends an encrypted answer with the approved fields and a proof that the key is on this phone.</li>
            <li><strong>Websites.</strong> A site signs a person up once with the wallet; daily sign-in then uses a <strong>passkey</strong> and shares no fields. See <Link href="/docs/login-with-tamga">sign in with Tamga</Link>.</li>
          </ul>
        </>
      ),
    },
    {
      id: "verification",
      n: "08",
      title: "Verification: five layers, three outcomes",
      body: (
        <>
          <p>Every verification runs the same pipeline in the same order and stops at the first failure. Each step has a permanent code, so a rejection always states why.</p>
          <KV label="Verification pipeline" rows={[["T0", "request and answer belong together (nonce, audience, encryption)"], ["A · format", "signature, certificate chain, device proof, hidden fields intact"], ["B · type", "document type registered; definition hash matches the catalogue"], ["C · trust", "issuer authorized for this type on the issue date; category matches"], ["D · status", "not revoked or suspended; list fresh and anchored"], ["E · policy", "requested fields present; nothing beyond the verifier's scope"], ["→ outcome", "ACCEPTED · REJECTED (failing step) · INDETERMINATE (could not check)"]]} />
          <p><strong>INDETERMINATE</strong> is never reported as REJECTED. If a list cannot be reached or is out of date, the verifier says “could not check right now” — the difference between “this diploma is fake” and “I cannot check” decides whether someone is hired. Authorization is judged on the <strong>issue date</strong>: a diploma issued while a university was active stays valid after a suspension, while new issuance stops at once.</p>
        </>
      ),
    },
    {
      id: "revocation",
      n: "09",
      title: "Revocation and lifecycle",
      body: (
        <>
          <p>Revocation uses the <strong>IETF Token Status List</strong>: two bits per credential copy — valid, revoked or suspended — at a <strong>random</strong> position. The issuer publishes at a <strong>fixed interval</strong>, never on demand, so timing reveals nothing about a person; each publication is anchored. Verifiers pre-fetch the lists, so checking a credential makes no call to the issuer or to the phone. A revocation reaches every verifier within about 90 minutes at most. Copies run out by design; the wallet asks before fetching fresh ones and never refreshes silently. See <Link href="/docs/how-tamga-works">architecture</Link>.</p>
        </>
      ),
    },
    {
      id: "privacy",
      n: "10",
      title: "Privacy by design",
      body: (
        <>
          <ul>
            <li><strong>Per-verifier copies.</strong> Each verifier receives a different copy bound to a different key, so verifiers cannot link a person by comparing what they received.</li>
            <li><strong>Selective disclosure</strong> by default; predicates such as <code>age_over_18</code> where the format allows.</li>
            <li><strong>Identity checks are isolated.</strong> Only the identity service talks to the identity-verification provider; after issuing it keeps no photos, only an opaque hashed record (a subject reference and a document-number hash). Institutions match a person through the identity credential, not through the provider.</li>
            <li><strong>No personal data in logs or public addresses.</strong> Revocation-list addresses never encode the institution; logs record what happened, never to whom.</li>
            <li><strong>Websites</strong> get a separate pseudonym per site as the account key; no document value is sent and sites cannot match a person.</li>
          </ul>
          <p className="text-sm text-foreground-subtle">Residual risk, stated openly: the same issuer colluding with several verifiers could still link a person. Closing this requires zero-knowledge credentials (see research directions).</p>
        </>
      ),
    },
    {
      id: "proximity",
      n: "11",
      title: "Close range: passes and age checks",
      body: (
        <>
          <p>For turnstiles and event gates Tamga uses a <strong>pass</strong>: registration once through a standard presentation, then a 60-second signed token shown as a QR code — no personal data in the token, replay rejected, and tickets can be single-use. A person-to-person check reverses OpenID4VP so the checker’s app starts a standard request. Both are versioned bridges; the target is ISO 18013-5 over NFC/BLE.</p>
        </>
      ),
    },
    {
      id: "ledger",
      n: "12",
      title: "From lists to a ledger",
      body: (
        <>
          <p>A ledger adds something only when several independent parties run it. Tamga therefore starts with lists and adds a permissioned <strong>Hyperledger Besu</strong> network with <strong>QBFT</strong> consensus only once at least two independent validator operators agree in writing. Every list field maps to a contract record; the list history is replayed into the contracts and both are tested to give the same answers. Components read trust through one interface, so documents, wallets and the verification pipeline do not change. See <Link href="/docs/blockchain">what blockchain is — and isn’t</Link>.</p>
          <p>Governance on the ledger follows the principles: validators are states with equal votes; new members by a 2/3 vote; each state alone registers or suspends its own institutions; recognition of foreign institutions is decided by each state.</p>
        </>
      ),
    },
    {
      id: "research",
      n: "13",
      title: "Research directions",
      body: (
        <>
          <p>These are designs under study, not part of the first release or the pilot; each will pass an independent security review before any use.</p>
          <ul>
            <li><strong>Zero-knowledge presentation</strong> — proving a fact such as “over 18” about an unchanged, issuer-signed mdoc with the open-source Longfellow ZK system; the verifier side is ready, proof generation on the phone follows the store release. See <Link href="/docs/selective-disclosure">selective disclosure</Link>.</li>
            <li><strong>The value layer</strong> — authorization between verified parties; settlement stays on regulated rails.</li>
          </ul>
        </>
      ),
    },
    {
      id: "status",
      n: "14",
      title: "Status and roadmap",
      body: (
        <>
          <p><strong>Working today (first release, real cryptography):</strong> issuance and presentation of diplomas and student cards; revocation and institution suspension; identity check and identity credential, also as mdoc; campus and event passes, single-use tickets; website sign-up and passkey sign-in; eight open-source packages. Tested on a phone.</p>
          <KV label="Phases" rows={[["Phase B (today)", "signed trust lists + anchor log · Tamga = provisional operator"], ["Pilot", "one foundation university · issuer key at the university · lists, no ledger"], ["Phase 0", "permissioned Besu/QBFT ledger once at least 2 independent validator operators sign"], ["Phase 1", "member-state lists · close range (NFC/BLE) · Digital Credentials API"]]} />
          <p>Every first-release shortcut — sample records, software keys, the issuer key held by Tamga, a single operator — is listed on the public <Link href="/shortcuts">known-shortcuts page</Link> and closed before the pilot. The pilot’s success and stop criteria are defined in advance.</p>
        </>
      ),
    },
    {
      id: "limits",
      n: "15",
      title: "Known limits",
      body: (
        <>
          <ul>
            <li>In this phase the trust anchor rests on one operator’s signature. The public log, transparency report and audits deter misuse; they cannot make it impossible.</li>
            <li>A revocation takes effect within about 90 minutes at most.</li>
            <li>Issuer linkability remains until zero-knowledge credentials are adopted.</li>
            <li>First release only: keys in software and the issuer key held by Tamga — both close before the pilot.</li>
            <li>Until Tamga Wallet is on the App Store and Google Play, the phone’s own claim of secure hardware is not accepted; with the store release App Attest / Play Integrity become mandatory.</li>
          </ul>
        </>
      ),
    },
    {
      id: "open",
      n: "16",
      title: "Open source and further reading",
      body: (
        <>
          <p>Code is Apache-2.0 and documentation CC BY 4.0. The packages <code>@tamga-network/*</code> cover trust lists, credential formats, issuing, verification and the wallet core; the integration guides are in the <Link href="/docs/developers">developer docs</Link>. Concepts are explained from scratch in the <Link href="/docs">documentation</Link>; the <Link href="/docs/glossary">glossary</Link> is a quick reference and the <Link href="/manifesto">manifesto</Link> gives the “why”.</p>
          <p className="text-sm text-foreground-subtle">This is a living document (v3.0). It changes as decisions mature; the trust model is what stays.</p>
        </>
      ),
    },
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
};

const tr: WhitepaperContent = {
  meta: { title: "Whitepaper", description: "Tamga Network Whitepaper v3.0 — EUDI profilleri üzerinde Türkiye ve Türk dünyası için Dijital Güven Altyapısı: imzalı güven listeleri, SD-JWT VC ve ISO mdoc, OpenID4VCI/VP, beş katmanlı doğrulama hattı, tasarımdan gelen mahremiyet, deftere giden yol, durum ve sınırlar." },
  eyebrow: "Dijital Güven Altyapısı",
  title: "Tamga Network: Türkiye ve Türk Dünyası için Dijital Güven Altyapısı",
  subtitle: "AB’nin EUDI profilleri üzerinde egemen bir referans mimari — X.509 kurumlar, bugün imzalı güven listeleri, bağımsız operatörler katılınca izinli bir defter.",
  tocLabel: "İçindekiler",
  abstractLabel: "Yönetici özeti",
  abstract: (
    <>
      <p>Tamga Network bir <strong>Dijital Güven Altyapısıdır</strong>: kurumlar belgeleri — diploma, öğrenci belgesi, kimlik belgesi, bilet — kişinin telefonuna verir, kişi doğrulayıcının ihtiyaç duyduğu alanları paylaşır ve doğrulayıcı belgeyi verene ulaşmadan saniyeler içinde denetler.</p>
      <p>Tamga, AB’nin teknik katmanını değiştirmeden kullanır: <strong>SD-JWT VC</strong> ve <strong>ISO 18013-5 mdoc</strong> belgeleri, <strong>OpenID4VCI/VP</strong>, <strong>X.509</strong> kurumlar ve ETSI modelinde <strong>imzalı güven listeleri</strong>. Kendi katmanı Türk dünyası için yönetişimdir: her yapıda her üye devlet için bir yer vardır ve Tamga yalnızca onlar adına geçici operatördür.</p>
      <p>Güven bugün, herkese açık bir çapa günlüğüyle birlikte sürümlü ve hash-zincirli güven listelerine dayanır; izinli bir <strong>Besu/QBFT</strong> defteri ancak en az iki bağımsız operatör katıldığında eklenir. Listelere, günlüklere ya da deftere hiçbir kişisel veri — özeti bile — yazılmaz. Akışın tamamı gerçek kriptografiyle bugün uçtan uca çalışıyor; bu belge neyin çalıştığını, neyin planlı olduğunu ve neyin hâlâ araştırma olduğunu söyler.</p>
    </>
  ),
  sections: [
    {
      id: "problem",
      n: "01",
      title: "Sorun: “belge kopyası” çağının sonu",
      body: (
        <>
          <p>Onlarca yıl kim olduğumuzu kopya teslim ederek kanıtladık. Kopyalar sunucularda birikir ve kontrolden çıkar; her banka, işveren ve üniversite aynı doğrulamayı yeniden kurar; belgenin gerçekliği ise kopyanın ikna ediciliğine kalır.</p>
          <p>Yeni model bunu tersine çevirir: belge kişide kalır, yalnızca gerekli kanıt paylaşılır ve doğrulama kaynağa sormadan kriptografik olarak yapılır. Bkz. <Link href="/docs/why-new-model">neden yeni bir model</Link>.</p>
        </>
      ),
    },
    {
      id: "vision",
      n: "02",
      title: "Vizyon: eIDAS 2.0’dan Türk dünyasına",
      body: (
        <>
          <p><strong>eIDAS 2.0</strong> ile her AB üye devleti vatandaşına bir <strong>Avrupa Dijital Kimlik Cüzdanı</strong> sunmak zorundadır. Bu cüzdanın mimarisi (ARF) ve profilleri dijital güvenin fiilî standardı hâline geliyor.</p>
          <p>Türk dünyası dili, kültürü ve tarihi paylaşır. Bir devlette verilen diploma bir diğerinde doğrulanabilmeli; bir kurumun kimliğine sınır ötesinde güvenilebilmelidir. Tamga bu ortak zemini aynı standartlar üzerinde, her devleti egemen tutan bir yönetişimle kurar.</p>
          <p>Tamga, her biri tek başına ayakta durabilen üç katmanda kuruludur. Taban: belgeler, protokoller ve güven listeleri AB standartlarındadır; böylece uyumlu cüzdanlar ve doğrulayıcılar Tamga’daki kurumlarla çalışabilir. Onun üstünde <strong>Tamga Network</strong>, her devletin güven listesini toplayan ve devletlerin birbirini tanımasını sağlayan hafif bir federasyondur — bugün Türkiye listesini Tamga geçici olarak yayınlar; bir devlet kendi listesini yayınladığında ağ onu gösterir. Bu zeminde ağın ilk ve referans cüzdanı <strong>Tamga Wallet</strong> (AB uyumludur; “EUDI Wallet” bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlara ayrılmış bir unvandır) ve kurumlara sunulan hizmetler çalışır: Kurum Konsolu ve Tamga Verify.</p>
        </>
      ),
    },
    {
      id: "principles",
      n: "03",
      title: "İlkeler",
      body: (
        <>
          <ul>
            <li><strong>Önce egemenlik</strong> — her devlet kendi kaydının tek yazarıdır; ağ üyeliği 2/3 oyla; sınır ötesi tanıma tek taraflı belirlenir.</li>
            <li><strong>Hiçbir ortak kayıtta kişisel veri yok</strong> — listede, günlükte ya da defterde yok; özeti bile yok.</li>
            <li><strong>Uyumlu ama bağımsız</strong> — AB’nin teknik katmanı olduğu gibi; yönetişim katmanı Türk dünyası için yazılır.</li>
            <li><strong>Birden çok devlet için</strong> — hiçbir tanımlayıcı ya da rol Tamga’yı tek operatör varsaymaz; Tamga her yerde geçici vekildir.</li>
            <li><strong>Defter bir depolama değil, imzacı seçimidir</strong> — bugün listeler; bağımsız operatörler katılınca defter.</li>
            <li><strong>İstisnasız cihaz bağı</strong> — her belge kopyası cihazdaki bir anahtara bağlıdır; kopya yeniden oynatılamaz.</li>
            <li><strong>Devredilmek üzere tasarım</strong> — her geçici yetkinin ölçülebilir bir devir noktası vardır.</li>
          </ul>
        </>
      ),
    },
    {
      id: "roles",
      n: "04",
      title: "Roller",
      body: (
        <>
          <p>AB mimarisinin her rolü Tamga’da vardır. Bir devlet henüz katılmadıysa rolü Tamga geçici ve kayıtlı olarak üstlenir: güven listesi operatörü, kayıt otoritesi, “TR National Root CA (geçici operatör: Tamga)” ve cüzdan sağlayıcısı. Kurumlar belge sağlayıcılarıdır; işverenler, web siteleri ve kapılar kayıtlı doğrulayıcılardır. PID sağlayıcısı yeri bir devlet doldurana kadar boştur; bu arada kimlik belgesi Tamga kimlik servisinden gelir (belge ve canlılık kontrolü). Henüz validator operatörü yoktur — bu yüzden defter de yoktur. Yan yana: <Link href="/docs/roles">roller ve terimler</Link>.</p>
        </>
      ),
    },
    {
      id: "trust",
      n: "05",
      title: "Güven modeli: imzalı güven listeleri",
      body: (
        <>
          <p>İmza kimin imzaladığını kanıtlar; <strong>güven listesi</strong> ise imzalayanın gerçek bir kurum olup olmadığını, hangi belge tiplerini ne zamandan beri verebileceğini ve güncel durumunu söyler. Listeler imzalı JWS dosyalarıdır, <strong>sürümlü ve hash-zincirlidir</strong>, silinmez ve bir sonraki güncelleme tarihi taşır; doğrulayıcı imzalayanı bant dışında yayınlanmış bir kök parmak iziyle karşılaştırır. Her iptal listesi yayını ve şema değişikliği ayrıca en az saatte bir herkese açık bir <strong>çapa günlüğüne</strong> yazılır; böylece geri sarılmış bir liste fark edilir. Ayrıntı: <Link href="/docs/trust-lists">güven listeleri</Link>.</p>
          <KV label="Yayınlanan dosyalar — trust.tamga.network" rows={[["lotl.jws", "listelerin listesi — ulusal listeler, şemalar, cüzdan sağlayıcıları"], ["tl-tr.jws", "Türkiye — kök sertifika otoriteleri, belge verenler (+ yetkiler), doğrulayıcılar"], ["tl-az · kz · kg · uz", "diğer üye devletler için ayrılmış yerler"], ["anchors.jsonl", "çapa günlüğü — her olay için imzalı bir satır, en az saatte bir"], ["keys/", "kök parmak izleri (bant dışı güven çapası)"], ["archive/", "geçmiş her sürüm, hiç silinmez"]]} />
          <p>Tanımlayıcılar atanmaz, türetilir; devirde ya da defter geldiğinde değişmez:</p>
          <KV label="Tanımlayıcılar" rows={[["ca_id", "keccak256(state_code ‖ SHA-256(kök sertifika))"], ["issuer_id", "keccak256(state_code ‖ SHA-256(kurum sertifikası))"], ["vct", "urn:tamga:<alan>:<Tür>:<ana sürüm> — örn. urn:tamga:edu:DiplomaCredential:1"], ["schema_id", "keccak256(vct)"], ["kişi", "tanımlayıcı yok — her belge kopyası için bir cihaz anahtarı"]]} mono />
        </>
      ),
    },
    {
      id: "credentials",
      n: "06",
      title: "Belgeler: SD-JWT VC ve mdoc",
      body: (
        <>
          <p>Ana biçim <strong>SD-JWT VC</strong>’dir (IETF, <code>dc+sd-jwt</code>, ES256). Her alan tuzlanmış bir özetin arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır; başlık kurumun X.509 zincirini taşır; <code>cnf</code> kopyayı bir cihaz anahtarına bağlar. Kimlik belgesi ayrıca <strong>ISO 18013-5 mdoc</strong> olarak verilir; böylece yaş kontrolü <code>age_over_18</code> alanını alır ve başka hiçbir şey almaz. Belge tipleri sabit URN’lerdir; tanımları herkese açık bir katalogda durur ve her belge kendi tanımının özetini taşır. Bkz. <Link href="/docs/did-vc">belgeler</Link>.</p>
          <Code label="SD-JWT VC biçiminde bir diploma (çözülmüş, kısaltılmış)" code={C_SDJWT} />
          <KV label="" rows={[["cnf.jwk", "bu kopyanın cihaz anahtarı"], ["_sd", "gizli alanlar, tuzlanmış özetler olarak"], ["başlık · x5c", "kurumun X.509 sertifika zinciri"]]} />
          <p>Ulusal kimlik numarası yalnızca kimlik belgesinde bulunur; hiçbir diploma, kart ya da bilet onu taşımaz.</p>
        </>
      ),
    },
    {
      id: "flows",
      n: "07",
      title: "Belge verme ve sunma",
      body: (
        <>
          <ul>
            <li><strong>Verme (OpenID4VCI).</strong> Kurum bir QR kodu ve aynı ekranda bir PIN gösterir — PIN bağlantının içinde asla gitmez. Ya da cüzdan kurum dizininden başlar ve önce kişinin kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı <strong>on kopya</strong> alır.</li>
            <li><strong>Yalnızca gerçek cüzdanlar.</strong> Kurumlar cüzdan sağlayıcısından kısa ömürlü bir <strong>cüzdan onayı</strong> (WUA) ister.</li>
            <li><strong>Sunum (OpenID4VP, DCQL).</strong> Doğrulayıcının isteği kayıtlı sertifikasıyla imzalıdır. Cüzdan onu güven listesine karşı denetler, tam olarak neyin istendiğini gösterir ve kayıtlı kapsamın dışındaki her şey için uyarır; ardından onaylanan alanlarla ve anahtarın bu telefonda olduğunun kanıtıyla şifreli bir cevap gönderir.</li>
            <li><strong>Web siteleri.</strong> Site kişiyi bir kez cüzdanla kaydeder; günlük giriş ardından bir <strong>passkey</strong> ile olur ve hiçbir alan paylaşılmaz. Bkz. <Link href="/docs/login-with-tamga">Tamga ile giriş yap</Link>.</li>
          </ul>
        </>
      ),
    },
    {
      id: "verification",
      n: "08",
      title: "Doğrulama: beş katman, üç sonuç",
      body: (
        <>
          <p>Her doğrulama aynı hattı aynı sırayla çalıştırır ve ilk hatada durur. Her adımın kalıcı bir kodu vardır; bu yüzden bir red her zaman nedenini söyler.</p>
          <KV label="Doğrulama hattı" rows={[["T0", "istek ve cevap birbirine ait (nonce, hedef, şifreleme)"], ["A · biçim", "imza, sertifika zinciri, cihaz kanıtı, gizli alanlar bozulmamış"], ["B · tür", "belge türü kayıtlı; tanımın özeti katalogla aynı"], ["C · güven", "kurum bu tür için veriliş tarihinde yetkili; kategori uyuşuyor"], ["D · durum", "iptal edilmemiş ya da askıda değil; liste güncel ve çapalı"], ["E · politika", "istenen alanlar var; doğrulayıcının kapsamı dışında bir şey yok"], ["→ sonuç", "ACCEPTED (kabul) · REJECTED (red, hangi adımda) · INDETERMINATE (denetlenemedi)"]]} />
          <p><strong>INDETERMINATE</strong> (belirsiz) asla REJECTED (red) olarak bildirilmez. Bir listeye ulaşılamazsa ya da liste güncel değilse doğrulayıcı “şu an denetlenemedi” der — “bu diploma sahte” ile “denetleyemiyorum” arasındaki fark birinin işe alınıp alınmamasıdır. Yetki <strong>veriliş tarihine</strong> göre değerlendirilir: üniversite etkinken verilmiş diploma askıdan sonra da geçerli kalır, yeni belge verme ise hemen durur.</p>
        </>
      ),
    },
    {
      id: "revocation",
      n: "09",
      title: "İptal ve yaşam döngüsü",
      body: (
        <>
          <p>İptal <strong>IETF Token Status List</strong> ile yapılır: her belge kopyası için <strong>rastgele</strong> bir konumda iki bit — geçerli, iptal ya da askıda. Kurum listeyi <strong>sabit aralıkla</strong> yayınlar, asla istek üzerine değil; böylece zamanlama kişi hakkında hiçbir şey ele vermez; her yayın çapalanır. Doğrulayıcılar listeleri önceden çeker; bir belgeyi denetlemek ne kuruma ne telefona çağrı yapar. Bir iptal en geç yaklaşık 90 dakikada her doğrulayıcıya ulaşır. Kopyalar tasarım gereği tükenir; cüzdan yenilerini almadan önce sorar ve asla sessizce yenilemez. Bkz. <Link href="/docs/how-tamga-works">mimari</Link>.</p>
        </>
      ),
    },
    {
      id: "privacy",
      n: "10",
      title: "Tasarımdan gelen mahremiyet",
      body: (
        <>
          <ul>
            <li><strong>Doğrulayıcı başına kopya.</strong> Her doğrulayıcı farklı bir anahtara bağlı farklı bir kopya alır; doğrulayıcılar aldıklarını karşılaştırarak kişiyi eşleştiremez.</li>
            <li>Varsayılan olarak <strong>seçici açıklama</strong>; biçim izin verdiğinde <code>age_over_18</code> gibi yüklemler.</li>
            <li><strong>Kimlik kontrolü yalıtılmıştır.</strong> Kimlik doğrulama sağlayıcısıyla yalnızca kimlik servisi konuşur; belgeyi verdikten sonra fotoğraf tutmaz, yalnızca opak ve özetlenmiş bir kayıt (kişi referansı ve belge numarası özeti) tutar. Kurumlar kişiyi sağlayıcı üzerinden değil, kimlik belgesi üzerinden eşleştirir.</li>
            <li><strong>Günlüklerde ve herkese açık adreslerde kişisel veri yok.</strong> İptal listesi adresleri kurumu açığa vurmaz; günlükler ne olduğunu yazar, kimin başına geldiğini asla yazmaz.</li>
            <li><strong>Web siteleri</strong> hesap anahtarı olarak siteye özel bir takma ad alır; belge değeri gitmez, siteler kişiyi eşleştiremez.</li>
          </ul>
          <p className="text-sm text-foreground-subtle">Açıkça söylenen artık risk: aynı kurum birden çok doğrulayıcıyla işbirliği yaparsa kişiyi hâlâ eşleştirebilir. Bunu kapatmak sıfır bilgili belgeler gerektirir (bkz. araştırma yönleri).</p>
        </>
      ),
    },
    {
      id: "proximity",
      n: "11",
      title: "Yakın alan: geçiş kartları ve yaş kontrolü",
      body: (
        <>
          <p>Turnike ve etkinlik kapıları için Tamga bir <strong>geçiş kartı</strong> kullanır: standart bir sunumla bir kez kayıt, ardından QR olarak gösterilen 60 saniyelik imzalı bir jeton — jetonda kişisel veri yoktur, tekrar kullanım reddedilir ve biletler tek kullanımlık olabilir. Kişiden kişiye kontrolde OpenID4VP tersine başlatılır: kontrol edenin uygulaması standart bir istek başlatır. İkisi de sürümlü köprülerdir; hedef NFC/BLE üzerinden ISO 18013-5’tir.</p>
        </>
      ),
    },
    {
      id: "ledger",
      n: "12",
      title: "Listelerden deftere",
      body: (
        <>
          <p>Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Bu yüzden Tamga listelerle başlar ve <strong>QBFT</strong> mutabakatlı izinli bir <strong>Hyperledger Besu</strong> ağını ancak en az iki bağımsız validator operatörü yazılı kabul verdiğinde ekler. Her liste alanı bir kontrat kaydına eşlenir; liste geçmişi kontratlara yeniden oynatılır ve ikisinin aynı cevabı verdiği test edilir. Bileşenler güveni tek bir arayüz üzerinden okur; belgeler, cüzdanlar ve doğrulama hattı değişmez. Bkz. <Link href="/docs/blockchain">blockchain nedir — ve ne değildir</Link>.</p>
          <p>Defterdeki yönetişim ilkeleri izler: validator’lar eşit oylu devletlerdir; yeni üyeler 2/3 oyla; her devlet kendi kurumlarını yalnız başına kaydeder ya da askıya alır; yabancı kurumların tanınmasına her devlet kendisi karar verir.</p>
        </>
      ),
    },
    {
      id: "research",
      n: "13",
      title: "Araştırma yönleri",
      body: (
        <>
          <p>Bunlar incelenen tasarımlardır; ilk sürümün ya da pilotun parçası değildir ve herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir.</p>
          <ul>
            <li><strong>Sıfır bilgi ispatıyla sunum</strong> — kurumun imzaladığı ve hiç değişmeyen bir mdoc hakkında “18 yaşından büyüğüm” gibi bir olguyu açık kaynak Longfellow ZK ile kanıtlamak; doğrulayıcı tarafı hazır, telefonda ispat üretimi mağaza sürümünden sonra. Bkz. <Link href="/docs/selective-disclosure">seçici açıklama</Link>.</li>
            <li><strong>Değer katmanı</strong> — doğrulanmış taraflar arasında yetkilendirme; mutabakat düzenlenmiş raylarda kalır.</li>
          </ul>
        </>
      ),
    },
    {
      id: "status",
      n: "14",
      title: "Durum ve yol haritası",
      body: (
        <>
          <p><strong>Bugün çalışan (ilk sürüm, gerçek kriptografi):</strong> diploma ve öğrenci belgesi verme ve sunma; iptal ve kurum askısı; kimlik kontrolü ve kimlik belgesi, mdoc olarak da; kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; web sitesine kayıt ve passkey ile giriş; sekiz açık kaynak paket. Telefonda test edildi.</p>
          <KV label="Aşamalar" rows={[["Faz B (bugün)", "imzalı güven listeleri + çapa günlüğü · Tamga = geçici operatör"], ["Pilot", "bir vakıf üniversitesi · kurum anahtarı üniversitede · listeler, defter yok"], ["Faz 0", "en az 2 bağımsız validator operatörü imzalayınca izinli Besu/QBFT defteri"], ["Faz 1", "üye devlet listeleri · yakın alan (NFC/BLE) · Digital Credentials API"]]} />
          <p>İlk sürümdeki her kestirme — örnek kayıtlar, yazılımda anahtar, Tamga’da duran kurum anahtarı, tek operatör — herkese açık <Link href="/shortcuts">bilinen kısayollar</Link> sayfasında listelenir ve pilottan önce kapatılır. Pilotun başarı ve durdurma ölçütleri önceden tanımlıdır.</p>
        </>
      ),
    },
    {
      id: "limits",
      n: "15",
      title: "Bilinen sınırlar",
      body: (
        <>
          <ul>
            <li>Bu aşamada güven çapası tek operatörün imzasına dayanır. Herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır; imkânsız kılamaz.</li>
            <li>Bir iptal en geç yaklaşık 90 dakikada etkili olur.</li>
            <li>Sıfır bilgili belgeler benimsenene kadar kurum eşleştirmesi riski kalır.</li>
            <li>Yalnızca ilk sürümde: anahtarlar yazılımda ve kurum anahtarı Tamga’da — ikisi de pilottan önce kapanır.</li>
            <li>Tamga Wallet App Store ve Google Play’de yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez; mağaza sürümüyle App Attest / Play Integrity zorunlu olur.</li>
          </ul>
        </>
      ),
    },
    {
      id: "open",
      n: "16",
      title: "Açık kaynak ve ayrıntılı okuma",
      body: (
        <>
          <p>Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. <code>@tamga-network/*</code> paketleri güven listelerini, belge biçimlerini, belge vermeyi, doğrulamayı ve cüzdan çekirdeğini kapsar; entegrasyon kılavuzları <Link href="/docs/developers">geliştirici belgelerindedir</Link>. Kavramlar <Link href="/docs">belgelerde</Link> sıfırdan anlatılır; <Link href="/docs/glossary">sözlük</Link> hızlı başvuru, <Link href="/manifesto">manifesto</Link> ise “neden”dir.</p>
          <p className="text-sm text-foreground-subtle">Bu yaşayan bir belgedir (v3.0). Kararlar olgunlaştıkça değişir; kalıcı olan güven modelidir.</p>
        </>
      ),
    },
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
};

const tk: WhitepaperContent = {
  meta: { title: "Whitepaper", description: "Tamga Network Whitepaper v3.0 — EUDI profillerine esaslanýan Türkiýe we türki dünýäsi üçin Sanly Ynam Infrastrukturasy: gol çekilen ynam sanawlary, SD-JWT VC we ISO mdoc, OpenID4VCI/VP, bäş gatlakly barlag hatary, dizaýndan gelýän gizlinlik, kitaba barýan ýol, ýagdaý we çäkler." },
  eyebrow: "Sanly Ynam Infrastrukturasy",
  title: "Tamga Network: Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy",
  subtitle: "ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy — X.509 guramalar, häzir gol çekilen ynam sanawlary, garaşsyz operatorlar goşulanda rugsatly kitap.",
  tocLabel: "Mazmuny",
  abstractLabel: "Gysgaça mazmun",
  abstract: (
    <>
      <p>Tamga Network <strong>Sanly Ynam Infrastrukturasydyr</strong>: guramalar resminamalary — diplom, talyp resminamasy, şahsyýet resminamasy, bilet — adamyň telefonyna berýär, adam barlaýjynyň zerur meýdanlaryny paýlaşýar we barlaýjy berijä ýüz tutman olary birnäçe sekuntda barlaýar.</p>
      <p>Tamga ÝB-niň tehniki gatlagyny üýtgetmän ulanýar: <strong>SD-JWT VC</strong> we <strong>ISO 18013-5 mdoc</strong> resminamalary, <strong>OpenID4VCI/VP</strong>, <strong>X.509</strong> guramalar we ETSI modelinde <strong>gol çekilen ynam sanawlary</strong>. Onuň öz gatlagy türki dünýäsi üçin dolandyryşdyr: her gurluşda her agza döwlet üçin orun bar we Tamga diňe olaryň adyndan wagtlaýyn operatordyr.</p>
      <p>Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş-zynjyrly ynam sanawlaryna daýanýar; rugsatly <strong>Besu/QBFT</strong> kitaby diňe azyndan iki garaşsyz operator goşulanda goşulýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat — hatda heşi hem — ýazylmaýar. Tutuş akym hakyky kriptografiýa bilen häzir başdan-aýak işleýär; bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.</p>
    </>
  ),
  sections: [
    {
      id: "problem",
      n: "01",
      title: "Mesele: “resminama nusgasy” döwrüniň soňy",
      body: (
        <>
          <p>Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Nusgalar serwerlerde toplanýar we gözegçilikden çykýar; her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykylygy bolsa nusganyň ynandyryjylygyna bagly galýar.</p>
          <p>Täze model muny tersine öwürýär: resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlag çeşmä soramazdan kriptografik taýdan edilýär. Serediň: <Link href="/docs/why-new-model">näme üçin täze model</Link>.</p>
        </>
      ),
    },
    {
      id: "vision",
      n: "02",
      title: "Garaýyş: eIDAS 2.0-dan türki dünýäsine",
      body: (
        <>
          <p><strong>eIDAS 2.0</strong> bilen ÝB-niň her agza döwleti raýatyna <strong>Ýewropa Sanly Şahsyýet Gapjygyny</strong> hödürlemäge borçly. Bu gapjygyň arhitekturasy (ARF) we profilleri sanly ynamyň hakyky standartyna öwrülýär.</p>
          <p>Türki dünýäsi dili, medeniýeti we taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli; guramanyň şahsyýetine serhetden aňyrda ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda, her döwleti özygtyýarly saklaýan dolandyryş bilen gurýar.</p>
          <p>Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Esas: resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk; şeýdip laýyk gapjyklar we barlaýjylar Tamga-daky guramalar bilen işläp bilýär. Onuň üstünde <strong>Tamga Network</strong> her döwletiň ynam sanawyny jemleýän we döwletleriň biri-birini ykrar etmegine mümkinçilik berýän ýeňil federasiýadyr — häzir Türkiýäniň sanawyny Tamga wagtlaýyn çap edýär; döwlet öz sanawyny çap edende tor şony görkezýär. Şu esasda toruň ilkinji we salgylanma gapjygy <strong>Tamga Wallet</strong> (ÝB bilen laýyk; “EUDI Wallet” ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna degişli at) we guramalara hyzmatlar işleýär: Gurama konsoly we Tamga Verify.</p>
        </>
      ),
    },
    {
      id: "principles",
      n: "03",
      title: "Ýörelgeler",
      body: (
        <>
          <ul>
            <li><strong>Ilki özygtyýarlylyk</strong> — her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk 2/3 ses bilen; serhetaşa ykrar birtaraplaýyn kesgitlenýär.</li>
            <li><strong>Hiç bir umumy ýazgyda şahsy maglumat ýok</strong> — sanawda, žurnalda ýa-da kitapda ýok; hatda heşi hem ýok.</li>
            <li><strong>Laýyk ýöne garaşsyz</strong> — ÝB-niň tehniki gatlagy bolşy ýaly; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.</li>
            <li><strong>Köp döwlet üçin</strong> — hiç bir belgi ýa-da rol Tamga-ny ýeke-täk operator hasaplamaýar; Tamga hemişe wagtlaýyn wekildir.</li>
            <li><strong>Kitap saklaýyş däl, gol çekijileriň saýlanmasydyr</strong> — häzir sanawlar; garaşsyz operatorlar goşulanda kitap.</li>
            <li><strong>Kadadan çykmasyz enjam baglanyşygy</strong> — resminamanyň her nusgasy enjamdaky açara baglanandyr; nusgany gaýtadan oýnap bolmaýar.</li>
            <li><strong>Tabşyrmak üçin dizaýn</strong> — her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar.</li>
          </ul>
        </>
      ),
    },
    {
      id: "roles",
      n: "04",
      title: "Rollar",
      body: (
        <>
          <p>ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy, “TR National Root CA (wagtlaýyn operator: Tamga)” we gapjyk üpjün edijisi. Guramalar resminama üpjün edijilerdir; iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr. PID üpjün edijisiniň orny döwlet ony doldurýança boş; şol wagt şahsyýet resminamasy Tamga şahsyýet hyzmatyndan gelýär (resminama we janlylyk barlagy). Heniz validator operatory ýok — şonuň üçin kitap hem ýok. Ýanaşyk: <Link href="/docs/roles">rollar we adalgalar</Link>.</p>
        </>
      ),
    },
    {
      id: "trust",
      n: "05",
      title: "Ynam modeli: gol çekilen ynam sanawlary",
      body: (
        <>
          <p>Gol kimiň gol çekendigini subut edýär; <strong>ynam sanawy</strong> bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip biljekdigini we häzirki ýagdaýyny aýdýar. Sanawlar gol çekilen JWS faýllarydyr, <strong>wersiýaly we heş-zynjyrly</strong>, pozulmaýar we indiki täzelenme senesini göterýär; barlaýjy gol çekijini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk <strong>labyr žurnalyna</strong> ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik: <Link href="/docs/trust-lists">ynam sanawlary</Link>.</p>
          <KV label="Çap edilýän faýllar — trust.tamga.network" rows={[["lotl.jws", "sanawlaryň sanawy — milli sanawlar, shemalar, gapjyk üpjün edijileri"], ["tl-tr.jws", "Türkiýe — kök sertifikat edaralary, resminama berijiler (+ ygtyýarlar), barlaýjylar"], ["tl-az · kz · kg · uz", "beýleki agza döwletler üçin goýlan orunlar"], ["anchors.jsonl", "labyr žurnaly — her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"], ["keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"], ["archive/", "öňki her wersiýa, asla pozulmaýar"]]} />
          <p>Belgiler bellenilmeýär, alynýar; tabşyrylanda ýa-da kitap gelende üýtgemeýär:</p>
          <KV label="Belgiler" rows={[["ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"], ["issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"], ["vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa> — meselem urn:tamga:edu:DiplomaCredential:1"], ["schema_id", "keccak256(vct)"], ["adam", "belgi ýok — resminamanyň her nusgasy üçin bir enjam açary"]]} mono />
        </>
      ),
    },
    {
      id: "credentials",
      n: "06",
      title: "Resminamalar: SD-JWT VC we mdoc",
      body: (
        <>
          <p>Esasy görnüş <strong>SD-JWT VC</strong> (IETF, <code>dc+sd-jwt</code>, ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar; sözbaşy guramanyň X.509 zynjyryny göterýär; <code>cnf</code> nusgany enjam açaryna baglaýar. Şahsyýet resminamasy mundan başga-da <strong>ISO 18013-5 mdoc</strong> görnüşinde berilýär; şeýlelikde ýaş barlagy <code>age_over_18</code> meýdanyny alýar we başga hiç zat almaýar. Resminama görnüşleri hemişelik URN-lerdir; olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär. Serediň: <Link href="/docs/did-vc">resminamalar</Link>.</p>
          <Code label="SD-JWT VC görnüşindäki diplom (açylan, gysgaldylan)" code={C_SDJWT} />
          <KV label="" rows={[["cnf.jwk", "şu nusganyň enjam açary"], ["_sd", "gizlin meýdanlar, duzlanan heşler görnüşinde"], ["sözbaşy · x5c", "guramanyň X.509 sertifikat zynjyry"]]} />
          <p>Milli şahsyýet belgisi diňe şahsyýet resminamasynda bar; hiç bir diplom, karta ýa-da bilet ony göterýär däl.</p>
        </>
      ),
    },
    {
      id: "flows",
      n: "07",
      title: "Bermek we hödürlemek",
      body: (
        <>
          <ul>
            <li><strong>Bermek (OpenID4VCI).</strong> Gurama QR kody we şol ekranda PIN görkezýär — PIN baglanyşygyň içinde asla gitmeýär. Ýa-da gapjyk guramalaryň katalogyndan başlaýar we ilki adamyň şahsyýetini subut edýär. Gapjyk her biri başga enjam açaryna baglanan <strong>on nusga</strong> alýar.</li>
            <li><strong>Diňe hakyky gapjyklar.</strong> Guramalar gapjyk üpjün edijisinden gysga möhletli <strong>gapjyk tassyklamasyny</strong> (WUA) talap edýär.</li>
            <li><strong>Hödürlemek (OpenID4VP, DCQL).</strong> Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir. Gapjyk ony ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär; soňra tassyklanan meýdanlar we açaryň şu telefondadygynyň subutnamasy bilen şifrlenen jogap iberýär.</li>
            <li><strong>Web saýtlar.</strong> Saýt adamy bir gezek gapjyk bilen hasaba alýar; soňra gündelik giriş <strong>passkey</strong> bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: <Link href="/docs/login-with-tamga">Tamga bilen gir</Link>.</li>
          </ul>
        </>
      ),
    },
    {
      id: "verification",
      n: "08",
      title: "Barlag: bäş gatlak, üç netije",
      body: (
        <>
          <p>Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar.</p>
          <KV label="Barlag hatary" rows={[["T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"], ["A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"], ["B · görnüş", "resminama görnüşi hasaba alnan; kesgitlemäniň heşi katalog bilen gabat gelýär"], ["C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly; kategoriýa gabat gelýär"], ["D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; sanaw täze we labyrlanan"], ["E · syýasat", "soralan meýdanlar bar; barlaýjynyň çäginden daşary hiç zat ýok"], ["→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"]]} />
          <p><strong>INDETERMINATE</strong> (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy “häzir barlap bolmady” diýýär — “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitleýär. Ygtyýar <strong>berlen senesine</strong> görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar.</p>
        </>
      ),
    },
    {
      id: "revocation",
      n: "09",
      title: "Ýatyrylyş we durmuş aýlawy",
      body: (
        <>
          <p>Ýatyrylyş <strong>IETF Token Status List</strong> bilen edilýär: her resminama nusgasy üçin <strong>tötänleýin</strong> orunda iki bit — güýjünde, ýatyrylan ýa-da togtadylan. Gurama sanawy <strong>kesgitli aralykda</strong> çap edýär, asla haýyş boýunça däl; şeýlelikde wagty adam barada hiç zady aýan etmeýär; her çap edilişi labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak ne gurama, ne-de telefona çagyryş edýär. Ýatyrylyş iň giç takmynan 90 minutda her barlaýja ýetýär. Nusgalar dizaýn boýunça gutarýar; gapjyk täzelerini almazdan öň soraýar we asla ýuwaşlyk bilen täzelemeýär. Serediň: <Link href="/docs/how-tamga-works">arhitektura</Link>.</p>
        </>
      ),
    },
    {
      id: "privacy",
      n: "10",
      title: "Dizaýndan gelýän gizlinlik",
      body: (
        <>
          <ul>
            <li><strong>Barlaýjy başyna nusga.</strong> Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär.</li>
            <li>Adaty ýagdaýda <strong>saýlama açyklama</strong>; görnüş rugsat berende <code>age_over_18</code> ýaly predikatlar.</li>
            <li><strong>Şahsyýet barlagy aýrylandyr.</strong> Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär; resminamany berenden soň surat saklamaýar, diňe açyk däl, heşlenen ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.</li>
            <li><strong>Žurnallarda we açyk salgylarda şahsy maglumat ýok.</strong> Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.</li>
            <li><strong>Web saýtlar</strong> hasap açary hökmünde saýta degişli lakam alýar; resminama bahasy iberilmeýär, saýtlar adamy deňeşdirip bilmeýär.</li>
          </ul>
          <p className="text-sm text-foreground-subtle">Açyk aýdylýan galyndy töwekgelçilik: şol bir gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, adamy heniz tanap biler. Muny ýapmak üçin nol bilimli resminamalar gerek (gözleg ugurlaryna serediň).</p>
        </>
      ),
    },
    {
      id: "proximity",
      n: "11",
      title: "Ýakyn aralyk: geçiş kartalary we ýaş barlagy",
      body: (
        <>
          <p>Turniketler we çäre gapylary üçin Tamga <strong>geçiş kartasyny</strong> ulanýar: standart hödürleme bilen bir gezek hasaba durmak, soňra QR hökmünde görkezilýän 60 sekuntlyk gol çekilen belgi — belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we biletler bir gezeklik bolup biler. Adamdan adama barlagda OpenID4VP tersine başlaýar: barlaýanyň programmasy standart haýyş başlaýar. Ikisi hem wersiýaly köprülerdir; maksat NFC/BLE arkaly ISO 18013-5.</p>
        </>
      ),
    },
    {
      id: "ledger",
      n: "12",
      title: "Sanawlardan kitaba",
      body: (
        <>
          <p>Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we <strong>QBFT</strong> ylalaşykly rugsatly <strong>Hyperledger Besu</strong> toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Sanawyň her meýdany kontrakt ýazgysyna gabat gelýär; sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaby berýändigi synagdan geçirilýär. Bölekler ynamy bir interfeýs arkaly okaýar; resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: <Link href="/docs/blockchain">blokçeýn näme — we näme däl</Link>.</p>
          <p>Kitapdaky dolandyryş ýörelgelere eýerýär: validatorlar deň sesli döwletlerdir; täze agzalar 2/3 ses bilen; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar; daşary ýurt guramalarynyň ykrar edilmegini her döwlet özi kesgitleýär.</p>
        </>
      ),
    },
    {
      id: "research",
      n: "13",
      title: "Gözleg ugurlary",
      body: (
        <>
          <p>Bular öwrenilýän dizaýnlardyr; ilkinji wersiýanyň ýa-da pilotyň bölegi däl we islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer.</p>
          <ul>
            <li><strong>Nol bilimli subutnama bilen hödürlemek</strong> — gurama gol çeken we üýtgemeýän mdoc barada “18 ýaşdan uly” ýaly bir hakykaty açyk çeşmeli Longfellow ZK bilen subut etmek; barlaýjy tarapy taýýar, telefonda subutnama döretmek dükan wersiýasyndan soň. Serediň: <Link href="/docs/selective-disclosure">saýlama açyklama</Link>.</li>
            <li><strong>Baha gatlagy</strong> — barlanan taraplaryň arasynda ygtyýarlandyrma; hasaplaşyk düzgünleşdirilen ýollarda galýar.</li>
          </ul>
        </>
      ),
    },
    {
      id: "status",
      n: "14",
      title: "Ýagdaý we ýol kartasy",
      body: (
        <>
          <p><strong>Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):</strong> diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we şahsyýet resminamasy, mdoc görnüşinde hem; kampus we çäre geçiş kartalary, bir gezeklik biletler; web saýta hasaba durmak we passkey bilen giriş; sekiz açyk çeşmeli paket. Telefonda synagdan geçirildi.</p>
          <KV label="Tapgyrlar" rows={[["B tapgyr (häzir)", "gol çekilen ynam sanawlary + labyr žurnaly · Tamga = wagtlaýyn operator"], ["Pilot", "bir wakf uniwersiteti · guramanyň açary uniwersitetde · sanawlar, kitap ýok"], ["0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby"], ["1 tapgyr", "agza döwletleriň sanawlary · ýakyn aralyk (NFC/BLE) · Digital Credentials API"]]} />
          <p>Ilkinji wersiýadaky her gysga ýol — nusga ýazgylar, programmada açar, Tamga-da duran guramanyň açary, ýeke operator — açyk <Link href="/shortcuts">belli gysga ýollar</Link> sahypasynda görkezilýär we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenendir.</p>
        </>
      ),
    },
    {
      id: "limits",
      n: "15",
      title: "Belli çäkler",
      body: (
        <>
          <ul>
            <li>Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär.</li>
            <li>Ýatyrylyş iň giç takmynan 90 minutda güýje girýär.</li>
            <li>Nol bilimli resminamalar kabul edilýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.</li>
            <li>Diňe ilkinji wersiýada: açarlar programmada we guramanyň açary Tamga-da — ikisi hem pilotdan öň ýapylýar.</li>
            <li>Tamga Wallet App Store we Google Play-de çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär; dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar.</li>
          </ul>
        </>
      ),
    },
    {
      id: "open",
      n: "16",
      title: "Açyk çeşme we giňişleýin okamak",
      body: (
        <>
          <p>Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamalydyr. <code>@tamga-network/*</code> paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy we gapjyk ýadrosyny öz içine alýar; integrasiýa gollanmalary <Link href="/docs/developers">işläp düzüjiler bölüminde</Link>. Düşünjeler <Link href="/docs">resminamalarda</Link> başdan düşündirilýär; <Link href="/docs/glossary">sözlük</Link> çalt salgylanma, <Link href="/manifesto">manifest</Link> bolsa “näme üçin”.</p>
          <p className="text-sm text-foreground-subtle">Bu ýaşaýan resminamadyr (v3.0). Kararlar kämilleşdigiçe üýtgeýär; hemişelik galýan ynam modelidir.</p>
        </>
      ),
    },
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
};

const content: Record<Locale, WhitepaperContent> = { en, tr, tk };

export function getWhitepaperContent(locale: string): WhitepaperContent {
  return content[locale as Locale] ?? content.en;
}

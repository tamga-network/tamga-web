# -*- coding: utf-8 -*-
"""Tamga whitepaper v3.0 — tek kaynak (üretici: generate.py) (en/tr/tk). Satır içi: **kalın**, `kod`, [metin](/docs/yol).
Blok türleri: ("p", str) · ("ul", [str]) · ("code", etiket, KOD_ANAHTARI) · ("table", etiket, TABLO_ANAHTARI) · ("note", str)
Kaynaklar: DECISIONS §0 (D-BC-6, D-GOV-5, D-SCHEMA-4, D-CRED-4), D-CRED-1, D-ID-1, ADR-0009…0014, FW-ARF-0001,
SPEC-TRUST-0001, SPEC-API-0001, PM-GTM-0001 / PRD, sapma kütüğü (delivery/09 §6)."""

CODE = {
    "sdjwt": """{
  "iss": "https://issuer.tamga.network/example-university",
  "vct": "urn:tamga:edu:DiplomaCredential:1",
  "vct#integrity": "sha256-…",
  "iat": 1790000000,
  "cnf": { "jwk": { … } },
  "status": { "status_list": {
    "idx": 48213,
    "uri": "https://status.tamga.network/…" } },
  "_sd": [ "…", "…" ]
}""",
}

# Anahtar / açıklama tabloları (dil başına). TABLE_MONO: değer sütunu da eş aralıklı yazılır.
TABLE_MONO = {"ids"}
TABLES = {
    "trust": {
        "en": [
            ("lotl.jws", "list of lists — national lists, schemas, wallet providers"),
            ("tl-tr.jws", "Türkiye — root CAs, issuers (+ authorizations), relying parties"),
            ("tl-az · kz · kg · uz", "reserved slots for the other member states"),
            ("anchors.jsonl", "anchor log — one signed line per event, at least hourly"),
            ("keys/", "root fingerprints (the out-of-band trust anchor)"),
            ("archive/", "every past version, never deleted"),
        ],
        "tr": [
            ("lotl.jws", "listelerin listesi — ulusal listeler, şemalar, cüzdan sağlayıcıları"),
            ("tl-tr.jws", "Türkiye — kök sertifika otoriteleri, belge verenler (+ yetkiler), doğrulayıcılar"),
            ("tl-az · kz · kg · uz", "diğer üye devletler için ayrılmış yerler"),
            ("anchors.jsonl", "çapa günlüğü — her olay için imzalı bir satır, en az saatte bir"),
            ("keys/", "kök parmak izleri (bant dışı güven çapası)"),
            ("archive/", "geçmiş her sürüm, hiç silinmez"),
        ],
        "tk": [
            ("lotl.jws", "sanawlaryň sanawy — milli sanawlar, shemalar, gapjyk üpjün edijileri"),
            ("tl-tr.jws", "Türkiýe — kök sertifikat edaralary, resminama berijiler (+ ygtyýarlar), barlaýjylar"),
            ("tl-az · kz · kg · uz", "beýleki agza döwletler üçin goýlan orunlar"),
            ("anchors.jsonl", "labyr žurnaly — her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"),
            ("keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"),
            ("archive/", "öňki her wersiýa, asla pozulmaýar"),
        ],
    },
    "ids": {
        "en": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(root certificate))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(issuer certificate))"),
            ("vct", "urn:tamga:<domain>:<Type>:<major> — e.g. urn:tamga:edu:DiplomaCredential:1"),
            ("schema_id", "keccak256(vct)"),
            ("person", "no identifier — a device key per credential copy"),
        ],
        "tr": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifika))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(kurum sertifikası))"),
            ("vct", "urn:tamga:<alan>:<Tür>:<ana sürüm> — örn. urn:tamga:edu:DiplomaCredential:1"),
            ("schema_id", "keccak256(vct)"),
            ("kişi", "tanımlayıcı yok — her belge kopyası için bir cihaz anahtarı"),
        ],
        "tk": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"),
            ("vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa> — meselem urn:tamga:edu:DiplomaCredential:1"),
            ("schema_id", "keccak256(vct)"),
            ("adam", "belgi ýok — resminamanyň her nusgasy üçin bir enjam açary"),
        ],
    },
    "sdjwt_notes": {
        "en": [
            ("cnf.jwk", "device key of this copy"),
            ("_sd", "hidden fields, as salted hashes"),
            ("header · x5c", "the institution's X.509 certificate chain"),
        ],
        "tr": [
            ("cnf.jwk", "bu kopyanın cihaz anahtarı"),
            ("_sd", "gizli alanlar, tuzlanmış özetler olarak"),
            ("başlık · x5c", "kurumun X.509 sertifika zinciri"),
        ],
        "tk": [
            ("cnf.jwk", "şu nusganyň enjam açary"),
            ("_sd", "gizlin meýdanlar, duzlanan heşler görnüşinde"),
            ("sözbaşy · x5c", "guramanyň X.509 sertifikat zynjyry"),
        ],
    },
    "pipeline": {
        "en": [
            ("T0", "request and answer belong together (nonce, audience, encryption)"),
            ("A · format", "signature, certificate chain, device proof, hidden fields intact"),
            ("B · type", "document type registered; definition hash matches the catalogue"),
            ("C · trust", "issuer authorized for this type on the issue date; category matches"),
            ("D · status", "not revoked or suspended; list fresh and anchored"),
            ("E · policy", "requested fields present; nothing beyond the verifier's scope"),
            ("→ outcome", "ACCEPTED · REJECTED (failing step) · INDETERMINATE (could not check)"),
        ],
        "tr": [
            ("T0", "istek ve cevap birbirine ait (nonce, hedef, şifreleme)"),
            ("A · biçim", "imza, sertifika zinciri, cihaz kanıtı, gizli alanlar bozulmamış"),
            ("B · tür", "belge türü kayıtlı; tanımın özeti katalogla aynı"),
            ("C · güven", "kurum bu tür için veriliş tarihinde yetkili; kategori uyuşuyor"),
            ("D · durum", "iptal edilmemiş ya da askıda değil; liste güncel ve çapalı"),
            ("E · politika", "istenen alanlar var; doğrulayıcının kapsamı dışında bir şey yok"),
            ("→ sonuç", "ACCEPTED (kabul) · REJECTED (red, hangi adımda) · INDETERMINATE (denetlenemedi)"),
        ],
        "tk": [
            ("T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"),
            ("A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"),
            ("B · görnüş", "resminama görnüşi hasaba alnan; kesgitlemäniň heşi katalog bilen gabat gelýär"),
            ("C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly; kategoriýa gabat gelýär"),
            ("D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; sanaw täze we labyrlanan"),
            ("E · syýasat", "soralan meýdanlar bar; barlaýjynyň çäginden daşary hiç zat ýok"),
            ("→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"),
        ],
    },
    "phases": {
        "en": [
            ("Phase B (today)", "signed trust lists + anchor log · Tamga = provisional operator"),
            ("Pilot", "one foundation university · issuer key at the university · lists, no ledger"),
            ("Phase 0", "permissioned Besu/QBFT ledger once at least 2 independent validator operators sign"),
            ("Phase 1", "member-state lists · close range (NFC/BLE) · Digital Credentials API"),
        ],
        "tr": [
            ("Faz B (bugün)", "imzalı güven listeleri + çapa günlüğü · Tamga = geçici operatör"),
            ("Pilot", "bir vakıf üniversitesi · kurum anahtarı üniversitede · listeler, defter yok"),
            ("Faz 0", "en az 2 bağımsız validator operatörü imzalayınca izinli Besu/QBFT defteri"),
            ("Faz 1", "üye devlet listeleri · yakın alan (NFC/BLE) · Digital Credentials API"),
        ],
        "tk": [
            ("B tapgyr (häzir)", "gol çekilen ynam sanawlary + labyr žurnaly · Tamga = wagtlaýyn operator"),
            ("Pilot", "bir wakf uniwersiteti · guramanyň açary uniwersitetde · sanawlar, kitap ýok"),
            ("0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby"),
            ("1 tapgyr", "agza döwletleriň sanawlary · ýakyn aralyk (NFC/BLE) · Digital Credentials API"),
        ],
    },
}

IDS = ["problem", "vision", "principles", "roles", "trust", "credentials", "flows", "verification",
       "revocation", "privacy", "proximity", "ledger", "research", "status", "limits", "open"]

EN = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper v3.0 — a Digital Trust Infrastructure for Türkiye and the Turkic world on the EUDI profiles: signed trust lists, SD-JWT VC and ISO mdoc, OpenID4VCI/VP, a five-layer verification pipeline, privacy by design, the path to a ledger, status and limits.",
    "eyebrow": "Digital Trust Infrastructure",
    "title": "Tamga Network: A Digital Trust Infrastructure for Türkiye and the Turkic World",
    "pdf_title": "A Digital Trust Infrastructure \\ for Türkiye and the Turkic World",
    "subtitle": "A sovereign reference architecture on the EU’s EUDI profiles — X.509 institutions, signed trust lists today, a permissioned ledger when independent operators join.",
    "abstract_label": "Executive summary",
    "toc": "Contents",
    "version": "WHITEPAPER · VERSION 3.0",
    "footer": "Whitepaper v3.0",
    "further": "Further reading",
    "abstract": [
        "Tamga Network is a **Digital Trust Infrastructure**: institutions issue documents — diplomas, student cards, identity credentials, tickets — into a person’s phone, the person shares only the fields a verifier needs, and the verifier checks them in seconds without contacting the issuer.",
        "Tamga keeps the EU’s technical layer unchanged: **SD-JWT VC** and **ISO 18013-5 mdoc** credentials, **OpenID4VCI/VP**, **X.509** institutions and **signed trust lists** in the ETSI model. Its own layer is governance for the Turkic world: every structure has a slot for each member state, and Tamga acts only as a provisional operator on their behalf.",
        "Trust is anchored today in versioned, hash-chained trust lists with a public anchor log; a permissioned **Besu/QBFT** ledger is added only when at least two independent operators join. No personal data — not even a hash — is written to lists, logs or ledger. The full flow runs end to end today with real cryptography; this document says what works, what is planned and what is still research.",
    ],
    "sections": {
        "problem": ("The problem: the end of the “document copy”", [
            ("p", "For decades people proved who they are by handing over copies. Copies pile up on servers and slip out of control; every bank, employer and university rebuilds the same verification; and authenticity is left to how convincing a copy looks."),
            ("p", "The new model reverses this: the document stays with the person, only the necessary proof is shared, and verification is cryptographic — without asking the source. See [why a new model](/docs/why-new-model)."),
        ]),
        "vision": ("Vision: from eIDAS 2.0 to the Turkic world", [
            ("p", "With **eIDAS 2.0** every EU member state must offer its citizens a **European Digital Identity Wallet**. Its architecture (the ARF) and profiles are becoming the de-facto standard for digital trust."),
            ("p", "The Turkic world shares language, culture and history. A diploma issued in one state should be verifiable in another; an institution’s identity should be trusted across borders. Tamga builds that shared foundation on the same standards, with governance that keeps every state sovereign."),
        ]),
        "principles": ("Principles", [
            ("ul", [
                "**Sovereignty first** — each state is the only writer of its own registry; network membership by a 2/3 vote; cross-border recognition decided unilaterally.",
                "**No personal data in any shared record** — not in lists, logs or ledger; not even a hash.",
                "**Compatible but independent** — the EU’s technical layer as it is; the governance layer written for the Turkic world.",
                "**Built for many states** — no identifier or role assumes Tamga as the only operator; Tamga is always the provisional stand-in.",
                "**A ledger is a choice of signers, not of storage** — lists today; a ledger when independent operators join.",
                "**Holder binding without exception** — every credential copy is bound to a key on the device; a copy cannot be replayed.",
                "**Designed to be handed over** — every provisional power has a measurable handover point.",
            ]),
        ]),
        "roles": ("Roles", [
            ("p", "Every role of the EU architecture exists in Tamga. Where a state has not joined, Tamga holds the role provisionally and on the record: trusted-list operator, registrar, the “TR National Root CA (provisional operator: Tamga)” and the wallet provider. Institutions are attestation providers; employers, websites and gates are registered relying parties. The PID-provider slot is empty until a state fills it; meanwhile an identity credential comes from Tamga’s identity service (document and liveness check). There are no validator operators yet — hence no ledger. Side-by-side: [Tamga and the EUDI architecture](/docs/eudi-comparison)."),
        ]),
        "trust": ("Trust model: signed trust lists", [
            ("p", "A signature proves who signed; a **trust list** says whether that signer is a real institution, which document types it may issue, since when, and its current status. Lists are signed JWS files, **versioned and hash-chained**, never deleted, and carry a next-update date; verifiers check the signer against a root fingerprint published out of band. Every revocation-list publication and schema change is also written, at least hourly, to a public **anchor log**, so a rolled-back list can be detected. Details: [trust lists](/docs/trust-lists)."),
            ("table", "Published files — trust.tamga.network", "trust"),
            ("p", "Identifiers are derived, not assigned, and do not change on handover or when the ledger arrives:"),
            ("table", "Identifiers", "ids"),
        ]),
        "credentials": ("Credentials: SD-JWT VC and mdoc", [
            ("p", "The main format is **SD-JWT VC** (IETF, `dc+sd-jwt`, ES256). Each field is hidden behind a salted hash and revealed only with the holder’s approval; the header carries the institution’s X.509 chain; `cnf` binds the copy to a device key. The identity credential is also issued as an **ISO 18013-5 mdoc**, so an age check can receive `age_over_18` and nothing else. Document types are stable URNs; their definitions sit in a public catalogue and every credential carries a hash of its definition. See [credentials](/docs/did-vc)."),
            ("code", "An SD-JWT VC diploma (decoded, shortened)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "The national ID number appears only in the identity credential; no diploma, card or ticket carries it."),
        ]),
        "flows": ("Issuing and presenting", [
            ("ul", [
                "**Issuance (OpenID4VCI).** The institution shows a QR code with a PIN on the same screen — the PIN never travels inside the link. Or the wallet starts from the institution directory and proves the person’s identity first. The wallet receives **ten copies**, each bound to a different device key.",
                "**Genuine wallets only.** Issuers require a short-lived **wallet unit attestation** from the wallet provider.",
                "**Presentation (OpenID4VP, DCQL).** The verifier’s request is signed with its registered certificate. The wallet checks it against the trust list, shows exactly what is asked and warns about anything beyond the verifier’s registered scope, then sends an encrypted answer with the approved fields and a proof that the key is on this phone.",
                "**Websites.** A site signs a person up once with the wallet; daily sign-in then uses a **passkey** and shares no fields. See [sign in with Tamga](/docs/login-with-tamga).",
            ]),
        ]),
        "verification": ("Verification: five layers, three outcomes", [
            ("p", "Every verification runs the same pipeline in the same order and stops at the first failure. Each step has a permanent code, so a rejection always states why."),
            ("table", "Verification pipeline", "pipeline"),
            ("p", "**INDETERMINATE** is never reported as REJECTED. If a list cannot be reached or is out of date, the verifier says “could not check right now” — the difference between “this diploma is fake” and “I cannot check” decides whether someone is hired. Authorization is judged on the **issue date**: a diploma issued while a university was active stays valid after a suspension, while new issuance stops at once."),
        ]),
        "revocation": ("Revocation and lifecycle", [
            ("p", "Revocation uses the **IETF Token Status List**: two bits per credential copy — valid, revoked or suspended — at a **random** position. The issuer publishes at a **fixed interval**, never on demand, so timing reveals nothing about a person; each publication is anchored. Verifiers pre-fetch the lists, so checking a credential makes no call to the issuer or to the phone. A revocation reaches every verifier within about 90 minutes at most. Copies run out by design; the wallet asks before fetching fresh ones and never refreshes silently. See [recovery and revocation](/docs/recovery-revocation)."),
        ]),
        "privacy": ("Privacy by design", [
            ("ul", [
                "**Per-verifier copies.** Each verifier receives a different copy bound to a different key, so verifiers cannot link a person by comparing what they received.",
                "**Selective disclosure** by default; predicates such as `age_over_18` where the format allows.",
                "**Identity checks are isolated.** Only the identity service talks to the identity-verification provider; after issuing it keeps no photos, only an opaque hashed record (a subject reference and a document-number hash). Institutions match a person through the identity credential, not through the provider.",
                "**No personal data in logs or public addresses.** Revocation-list addresses never encode the institution; logs record what happened, never to whom.",
                "**Websites** store their own keyed hash of the account key, never the raw value.",
            ]),
            ("note", "Residual risk, stated openly: the same issuer colluding with several verifiers could still link a person. Closing this requires zero-knowledge credentials (see research directions)."),
        ]),
        "proximity": ("Close range: passes and age checks", [
            ("p", "For turnstiles and event gates Tamga uses a **pass**: registration once through a standard presentation, then a 60-second signed token shown as a QR code — no personal data in the token, replay rejected, and tickets can be single-use. A person-to-person check reverses OpenID4VP so the checker’s app starts a standard request. Both are versioned bridges; the target is ISO 18013-5 over NFC/BLE."),
        ]),
        "ledger": ("From lists to a ledger", [
            ("p", "A ledger adds something only when several independent parties run it. Tamga therefore starts with lists and adds a permissioned **Hyperledger Besu** network with **QBFT** consensus only once at least two independent validator operators agree in writing. Every list field maps to a contract record; the list history is replayed into the contracts and both are tested to give the same answers. Components read trust through one interface, so documents, wallets and the verification pipeline do not change. See [what blockchain is — and isn’t](/docs/blockchain)."),
            ("p", "Governance on the ledger follows the principles: validators are states with equal votes; new members by a 2/3 vote; each state alone registers or suspends its own institutions; recognition of foreign institutions is decided by each state."),
        ]),
        "research": ("Research directions", [
            ("p", "These are designs under study, not part of the first release or the pilot; each will pass an independent security review before any use."),
            ("ul", [
                "**Zero-knowledge credentials** (e.g. BBS+) to remove issuer linkability. See [selective disclosure](/docs/selective-disclosure).",
                "**Accountable disclosure** — pseudonyms resolvable only by a court plus a multi-institution threshold (DKG and threshold ElGamal; the key is never reconstructed). See [accountable disclosure](/docs/accountable-disclosure).",
                "**Derived pseudonyms and recovery** — hierarchical keys, envelope encryption, device recovery. See [identity layers](/docs/identity-layers).",
                "**The value layer** — authorization between verified parties; settlement stays on regulated rails.",
            ]),
        ]),
        "status": ("Status and roadmap", [
            ("p", "**Working today (first release, real cryptography):** issuance and presentation of diplomas and student cards; revocation and institution suspension; identity check and identity credential, also as mdoc; campus and event passes, single-use tickets; website sign-up and passkey sign-in; eight open-source packages. Tested on a phone."),
            ("table", "Phases", "phases"),
            ("p", "Every first-release shortcut — sample records, software keys, the issuer key held by Tamga, a single operator — is listed on the public [known-shortcuts page](/shortcuts) and closed before the pilot. The pilot’s success and stop criteria are defined in advance."),
        ]),
        "limits": ("Known limits", [
            ("ul", [
                "In this phase the trust anchor rests on one operator’s signature. The public log, transparency report and audits deter misuse; they cannot make it impossible.",
                "A revocation takes effect within about 90 minutes at most.",
                "Issuer linkability remains until zero-knowledge credentials are adopted.",
                "First release only: keys in software and the issuer key held by Tamga — both close before the pilot.",
                "Until Tamga Wallet is on the App Store and Google Play, the phone’s own claim of secure hardware is not accepted; with the store release App Attest / Play Integrity become mandatory.",
            ]),
        ]),
        "open": ("Open source and further reading", [
            ("p", "Code is Apache-2.0 and documentation CC BY 4.0. The packages `@tamga-network/*` cover trust lists, credential formats, issuing, verification and the wallet core; the integration guides are in the [developer docs](/docs/developers). Concepts are explained from scratch in the [documentation](/docs); the [glossary](/docs/glossary) is a quick reference and the [manifesto](/manifesto) gives the “why”."),
            ("note", "This is a living document (v3.0). It changes as decisions mature; the trust model is what stays."),
        ]),
    },
}

TR = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper v3.0 — EUDI profilleri üzerinde Türkiye ve Türk dünyası için Dijital Güven Altyapısı: imzalı güven listeleri, SD-JWT VC ve ISO mdoc, OpenID4VCI/VP, beş katmanlı doğrulama hattı, tasarımdan gelen mahremiyet, deftere giden yol, durum ve sınırlar.",
    "eyebrow": "Dijital Güven Altyapısı",
    "title": "Tamga Network: Türkiye ve Türk Dünyası için Dijital Güven Altyapısı",
    "pdf_title": "Türkiye ve Türk Dünyası için \\ Dijital Güven Altyapısı",
    "subtitle": "AB’nin EUDI profilleri üzerinde egemen bir referans mimari — X.509 kurumlar, bugün imzalı güven listeleri, bağımsız operatörler katılınca izinli bir defter.",
    "abstract_label": "Yönetici özeti",
    "toc": "İçindekiler",
    "version": "WHITEPAPER · SÜRÜM 3.0",
    "footer": "Whitepaper v3.0",
    "further": "Ayrıntı",
    "abstract": [
        "Tamga Network bir **Dijital Güven Altyapısıdır**: kurumlar belgeleri — diploma, öğrenci belgesi, kimlik belgesi, bilet — kişinin telefonuna verir, kişi doğrulayıcının ihtiyaç duyduğu alanları paylaşır ve doğrulayıcı belgeyi verene ulaşmadan saniyeler içinde denetler.",
        "Tamga, AB’nin teknik katmanını değiştirmeden kullanır: **SD-JWT VC** ve **ISO 18013-5 mdoc** belgeleri, **OpenID4VCI/VP**, **X.509** kurumlar ve ETSI modelinde **imzalı güven listeleri**. Kendi katmanı Türk dünyası için yönetişimdir: her yapıda her üye devlet için bir yer vardır ve Tamga yalnızca onlar adına geçici operatördür.",
        "Güven bugün, herkese açık bir çapa günlüğüyle birlikte sürümlü ve hash-zincirli güven listelerine dayanır; izinli bir **Besu/QBFT** defteri ancak en az iki bağımsız operatör katıldığında eklenir. Listelere, günlüklere ya da deftere hiçbir kişisel veri — özeti bile — yazılmaz. Akışın tamamı gerçek kriptografiyle bugün uçtan uca çalışıyor; bu belge neyin çalıştığını, neyin planlı olduğunu ve neyin hâlâ araştırma olduğunu söyler.",
    ],
    "sections": {
        "problem": ("Sorun: “belge kopyası” çağının sonu", [
            ("p", "Onlarca yıl kim olduğumuzu kopya teslim ederek kanıtladık. Kopyalar sunucularda birikir ve kontrolden çıkar; her banka, işveren ve üniversite aynı doğrulamayı yeniden kurar; belgenin gerçekliği ise kopyanın ikna ediciliğine kalır."),
            ("p", "Yeni model bunu tersine çevirir: belge kişide kalır, yalnızca gerekli kanıt paylaşılır ve doğrulama kaynağa sormadan kriptografik olarak yapılır. Bkz. [neden yeni bir model](/docs/why-new-model)."),
        ]),
        "vision": ("Vizyon: eIDAS 2.0’dan Türk dünyasına", [
            ("p", "**eIDAS 2.0** ile her AB üye devleti vatandaşına bir **Avrupa Dijital Kimlik Cüzdanı** sunmak zorundadır. Bu cüzdanın mimarisi (ARF) ve profilleri dijital güvenin fiilî standardı hâline geliyor."),
            ("p", "Türk dünyası dili, kültürü ve tarihi paylaşır. Bir devlette verilen diploma bir diğerinde doğrulanabilmeli; bir kurumun kimliğine sınır ötesinde güvenilebilmelidir. Tamga bu ortak zemini aynı standartlar üzerinde, her devleti egemen tutan bir yönetişimle kurar."),
        ]),
        "principles": ("İlkeler", [
            ("ul", [
                "**Önce egemenlik** — her devlet kendi kaydının tek yazarıdır; ağ üyeliği 2/3 oyla; sınır ötesi tanıma tek taraflı belirlenir.",
                "**Hiçbir ortak kayıtta kişisel veri yok** — listede, günlükte ya da defterde yok; özeti bile yok.",
                "**Uyumlu ama bağımsız** — AB’nin teknik katmanı olduğu gibi; yönetişim katmanı Türk dünyası için yazılır.",
                "**Birden çok devlet için** — hiçbir tanımlayıcı ya da rol Tamga’yı tek operatör varsaymaz; Tamga her yerde geçici vekildir.",
                "**Defter bir depolama değil, imzacı seçimidir** — bugün listeler; bağımsız operatörler katılınca defter.",
                "**İstisnasız cihaz bağı** — her belge kopyası cihazdaki bir anahtara bağlıdır; kopya yeniden oynatılamaz.",
                "**Devredilmek üzere tasarım** — her geçici yetkinin ölçülebilir bir devir noktası vardır.",
            ]),
        ]),
        "roles": ("Roller", [
            ("p", "AB mimarisinin her rolü Tamga’da vardır. Bir devlet henüz katılmadıysa rolü Tamga geçici ve kayıtlı olarak üstlenir: güven listesi operatörü, kayıt otoritesi, “TR National Root CA (geçici operatör: Tamga)” ve cüzdan sağlayıcısı. Kurumlar belge sağlayıcılarıdır; işverenler, web siteleri ve kapılar kayıtlı doğrulayıcılardır. PID sağlayıcısı yeri bir devlet doldurana kadar boştur; bu arada kimlik belgesi Tamga kimlik servisinden gelir (belge ve canlılık kontrolü). Henüz validator operatörü yoktur — bu yüzden defter de yoktur. Yan yana: [Tamga ve EUDI mimarisi](/docs/eudi-comparison)."),
        ]),
        "trust": ("Güven modeli: imzalı güven listeleri", [
            ("p", "İmza kimin imzaladığını kanıtlar; **güven listesi** ise imzalayanın gerçek bir kurum olup olmadığını, hangi belge tiplerini ne zamandan beri verebileceğini ve güncel durumunu söyler. Listeler imzalı JWS dosyalarıdır, **sürümlü ve hash-zincirlidir**, silinmez ve bir sonraki güncelleme tarihi taşır; doğrulayıcı imzalayanı bant dışında yayınlanmış bir kök parmak iziyle karşılaştırır. Her iptal listesi yayını ve şema değişikliği ayrıca en az saatte bir herkese açık bir **çapa günlüğüne** yazılır; böylece geri sarılmış bir liste fark edilir. Ayrıntı: [güven listeleri](/docs/trust-lists)."),
            ("table", "Yayınlanan dosyalar — trust.tamga.network", "trust"),
            ("p", "Tanımlayıcılar atanmaz, türetilir; devirde ya da defter geldiğinde değişmez:"),
            ("table", "Tanımlayıcılar", "ids"),
        ]),
        "credentials": ("Belgeler: SD-JWT VC ve mdoc", [
            ("p", "Ana biçim **SD-JWT VC**’dir (IETF, `dc+sd-jwt`, ES256). Her alan tuzlanmış bir özetin arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır; başlık kurumun X.509 zincirini taşır; `cnf` kopyayı bir cihaz anahtarına bağlar. Kimlik belgesi ayrıca **ISO 18013-5 mdoc** olarak verilir; böylece yaş kontrolü `age_over_18` alanını alır ve başka hiçbir şey almaz. Belge tipleri sabit URN’lerdir; tanımları herkese açık bir katalogda durur ve her belge kendi tanımının özetini taşır. Bkz. [belgeler](/docs/did-vc)."),
            ("code", "SD-JWT VC biçiminde bir diploma (çözülmüş, kısaltılmış)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "Ulusal kimlik numarası yalnızca kimlik belgesinde bulunur; hiçbir diploma, kart ya da bilet onu taşımaz."),
        ]),
        "flows": ("Belge verme ve sunma", [
            ("ul", [
                "**Verme (OpenID4VCI).** Kurum bir QR kodu ve aynı ekranda bir PIN gösterir — PIN bağlantının içinde asla gitmez. Ya da cüzdan kurum dizininden başlar ve önce kişinin kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı **on kopya** alır.",
                "**Yalnızca gerçek cüzdanlar.** Kurumlar cüzdan sağlayıcısından kısa ömürlü bir **cüzdan onayı** (WUA) ister.",
                "**Sunum (OpenID4VP, DCQL).** Doğrulayıcının isteği kayıtlı sertifikasıyla imzalıdır. Cüzdan onu güven listesine karşı denetler, tam olarak neyin istendiğini gösterir ve kayıtlı kapsamın dışındaki her şey için uyarır; ardından onaylanan alanlarla ve anahtarın bu telefonda olduğunun kanıtıyla şifreli bir cevap gönderir.",
                "**Web siteleri.** Site kişiyi bir kez cüzdanla kaydeder; günlük giriş ardından bir **passkey** ile olur ve hiçbir alan paylaşılmaz. Bkz. [Tamga ile giriş yap](/docs/login-with-tamga).",
            ]),
        ]),
        "verification": ("Doğrulama: beş katman, üç sonuç", [
            ("p", "Her doğrulama aynı hattı aynı sırayla çalıştırır ve ilk hatada durur. Her adımın kalıcı bir kodu vardır; bu yüzden bir red her zaman nedenini söyler."),
            ("table", "Doğrulama hattı", "pipeline"),
            ("p", "**INDETERMINATE** (belirsiz) asla REJECTED (red) olarak bildirilmez. Bir listeye ulaşılamazsa ya da liste güncel değilse doğrulayıcı “şu an denetlenemedi” der — “bu diploma sahte” ile “denetleyemiyorum” arasındaki fark birinin işe alınıp alınmamasıdır. Yetki **veriliş tarihine** göre değerlendirilir: üniversite etkinken verilmiş diploma askıdan sonra da geçerli kalır, yeni belge verme ise hemen durur."),
        ]),
        "revocation": ("İptal ve yaşam döngüsü", [
            ("p", "İptal **IETF Token Status List** ile yapılır: her belge kopyası için **rastgele** bir konumda iki bit — geçerli, iptal ya da askıda. Kurum listeyi **sabit aralıkla** yayınlar, asla istek üzerine değil; böylece zamanlama kişi hakkında hiçbir şey ele vermez; her yayın çapalanır. Doğrulayıcılar listeleri önceden çeker; bir belgeyi denetlemek ne kuruma ne telefona çağrı yapar. Bir iptal en geç yaklaşık 90 dakikada her doğrulayıcıya ulaşır. Kopyalar tasarım gereği tükenir; cüzdan yenilerini almadan önce sorar ve asla sessizce yenilemez. Bkz. [kurtarma ve iptal](/docs/recovery-revocation)."),
        ]),
        "privacy": ("Tasarımdan gelen mahremiyet", [
            ("ul", [
                "**Doğrulayıcı başına kopya.** Her doğrulayıcı farklı bir anahtara bağlı farklı bir kopya alır; doğrulayıcılar aldıklarını karşılaştırarak kişiyi eşleştiremez.",
                "Varsayılan olarak **seçici açıklama**; biçim izin verdiğinde `age_over_18` gibi yüklemler.",
                "**Kimlik kontrolü yalıtılmıştır.** Kimlik doğrulama sağlayıcısıyla yalnızca kimlik servisi konuşur; belgeyi verdikten sonra fotoğraf tutmaz, yalnızca opak ve özetlenmiş bir kayıt (kişi referansı ve belge numarası özeti) tutar. Kurumlar kişiyi sağlayıcı üzerinden değil, kimlik belgesi üzerinden eşleştirir.",
                "**Günlüklerde ve herkese açık adreslerde kişisel veri yok.** İptal listesi adresleri kurumu açığa vurmaz; günlükler ne olduğunu yazar, kimin başına geldiğini asla yazmaz.",
                "**Web siteleri** hesap anahtarının ham değerini değil, kendi sırlarıyla üretilmiş özetini saklar.",
            ]),
            ("note", "Açıkça söylenen artık risk: aynı kurum birden çok doğrulayıcıyla işbirliği yaparsa kişiyi hâlâ eşleştirebilir. Bunu kapatmak sıfır bilgili belgeler gerektirir (bkz. araştırma yönleri)."),
        ]),
        "proximity": ("Yakın alan: geçiş kartları ve yaş kontrolü", [
            ("p", "Turnike ve etkinlik kapıları için Tamga bir **geçiş kartı** kullanır: standart bir sunumla bir kez kayıt, ardından QR olarak gösterilen 60 saniyelik imzalı bir jeton — jetonda kişisel veri yoktur, tekrar kullanım reddedilir ve biletler tek kullanımlık olabilir. Kişiden kişiye kontrolde OpenID4VP tersine başlatılır: kontrol edenin uygulaması standart bir istek başlatır. İkisi de sürümlü köprülerdir; hedef NFC/BLE üzerinden ISO 18013-5’tir."),
        ]),
        "ledger": ("Listelerden deftere", [
            ("p", "Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Bu yüzden Tamga listelerle başlar ve **QBFT** mutabakatlı izinli bir **Hyperledger Besu** ağını ancak en az iki bağımsız validator operatörü yazılı kabul verdiğinde ekler. Her liste alanı bir kontrat kaydına eşlenir; liste geçmişi kontratlara yeniden oynatılır ve ikisinin aynı cevabı verdiği test edilir. Bileşenler güveni tek bir arayüz üzerinden okur; belgeler, cüzdanlar ve doğrulama hattı değişmez. Bkz. [blockchain nedir — ve ne değildir](/docs/blockchain)."),
            ("p", "Defterdeki yönetişim ilkeleri izler: validator’lar eşit oylu devletlerdir; yeni üyeler 2/3 oyla; her devlet kendi kurumlarını yalnız başına kaydeder ya da askıya alır; yabancı kurumların tanınmasına her devlet kendisi karar verir."),
        ]),
        "research": ("Araştırma yönleri", [
            ("p", "Bunlar incelenen tasarımlardır; ilk sürümün ya da pilotun parçası değildir ve herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir."),
            ("ul", [
                "Kurum eşleştirmesini ortadan kaldırmak için **sıfır bilgili belgeler** (ör. BBS+). Bkz. [seçici açıklama](/docs/selective-disclosure).",
                "**Hesap verebilir ifşa** — takma adların yalnızca mahkeme ve çok kurumlu bir eşikle çözülebilmesi (DKG ve eşik ElGamal; anahtar asla yeniden kurulmaz). Bkz. [hesap verebilir ifşa](/docs/accountable-disclosure).",
                "**Türetilmiş takma adlar ve kurtarma** — hiyerarşik anahtarlar, zarf şifreleme, cihaz kurtarma. Bkz. [kimlik katmanları](/docs/identity-layers).",
                "**Değer katmanı** — doğrulanmış taraflar arasında yetkilendirme; mutabakat düzenlenmiş raylarda kalır.",
            ]),
        ]),
        "status": ("Durum ve yol haritası", [
            ("p", "**Bugün çalışan (ilk sürüm, gerçek kriptografi):** diploma ve öğrenci belgesi verme ve sunma; iptal ve kurum askısı; kimlik kontrolü ve kimlik belgesi, mdoc olarak da; kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; web sitesine kayıt ve passkey ile giriş; sekiz açık kaynak paket. Telefonda test edildi."),
            ("table", "Aşamalar", "phases"),
            ("p", "İlk sürümdeki her kestirme — örnek kayıtlar, yazılımda anahtar, Tamga’da duran kurum anahtarı, tek operatör — herkese açık [bilinen kısayollar](/shortcuts) sayfasında listelenir ve pilottan önce kapatılır. Pilotun başarı ve durdurma ölçütleri önceden tanımlıdır."),
        ]),
        "limits": ("Bilinen sınırlar", [
            ("ul", [
                "Bu aşamada güven çapası tek operatörün imzasına dayanır. Herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır; imkânsız kılamaz.",
                "Bir iptal en geç yaklaşık 90 dakikada etkili olur.",
                "Sıfır bilgili belgeler benimsenene kadar kurum eşleştirmesi riski kalır.",
                "Yalnızca ilk sürümde: anahtarlar yazılımda ve kurum anahtarı Tamga’da — ikisi de pilottan önce kapanır.",
                "Tamga Wallet App Store ve Google Play’de yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez; mağaza sürümüyle App Attest / Play Integrity zorunlu olur.",
            ]),
        ]),
        "open": ("Açık kaynak ve ayrıntılı okuma", [
            ("p", "Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. `@tamga-network/*` paketleri güven listelerini, belge biçimlerini, belge vermeyi, doğrulamayı ve cüzdan çekirdeğini kapsar; entegrasyon kılavuzları [geliştirici belgelerindedir](/docs/developers). Kavramlar [belgelerde](/docs) sıfırdan anlatılır; [sözlük](/docs/glossary) hızlı başvuru, [manifesto](/manifesto) ise “neden”dir."),
            ("note", "Bu yaşayan bir belgedir (v3.0). Kararlar olgunlaştıkça değişir; kalıcı olan güven modelidir."),
        ]),
    },
}

TK = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper v3.0 — EUDI profillerine esaslanýan Türkiýe we türki dünýäsi üçin Sanly Ynam Infrastrukturasy: gol çekilen ynam sanawlary, SD-JWT VC we ISO mdoc, OpenID4VCI/VP, bäş gatlakly barlag hatary, dizaýndan gelýän gizlinlik, kitaba barýan ýol, ýagdaý we çäkler.",
    "eyebrow": "Sanly Ynam Infrastrukturasy",
    "title": "Tamga Network: Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy",
    "pdf_title": "Türkiýe we Türki Dünýäsi üçin \\ Sanly Ynam Infrastrukturasy",
    "subtitle": "ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy — X.509 guramalar, häzir gol çekilen ynam sanawlary, garaşsyz operatorlar goşulanda rugsatly kitap.",
    "abstract_label": "Gysgaça mazmun",
    "toc": "Mazmuny",
    "version": "WHITEPAPER · WERSIÝA 3.0",
    "footer": "Whitepaper v3.0",
    "further": "Jikme-jiklik",
    "abstract": [
        "Tamga Network **Sanly Ynam Infrastrukturasydyr**: guramalar resminamalary — diplom, talyp resminamasy, şahsyýet resminamasy, bilet — adamyň telefonyna berýär, adam barlaýjynyň zerur meýdanlaryny paýlaşýar we barlaýjy berijä ýüz tutman olary birnäçe sekuntda barlaýar.",
        "Tamga ÝB-niň tehniki gatlagyny üýtgetmän ulanýar: **SD-JWT VC** we **ISO 18013-5 mdoc** resminamalary, **OpenID4VCI/VP**, **X.509** guramalar we ETSI modelinde **gol çekilen ynam sanawlary**. Onuň öz gatlagy türki dünýäsi üçin dolandyryşdyr: her gurluşda her agza döwlet üçin orun bar we Tamga diňe olaryň adyndan wagtlaýyn operatordyr.",
        "Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş-zynjyrly ynam sanawlaryna daýanýar; rugsatly **Besu/QBFT** kitaby diňe azyndan iki garaşsyz operator goşulanda goşulýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat — hatda heşi hem — ýazylmaýar. Tutuş akym hakyky kriptografiýa bilen häzir başdan-aýak işleýär; bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.",
    ],
    "sections": {
        "problem": ("Mesele: “resminama nusgasy” döwrüniň soňy", [
            ("p", "Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Nusgalar serwerlerde toplanýar we gözegçilikden çykýar; her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykylygy bolsa nusganyň ynandyryjylygyna bagly galýar."),
            ("p", "Täze model muny tersine öwürýär: resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlag çeşmä soramazdan kriptografik taýdan edilýär. Serediň: [näme üçin täze model](/docs/why-new-model)."),
        ]),
        "vision": ("Garaýyş: eIDAS 2.0-dan türki dünýäsine", [
            ("p", "**eIDAS 2.0** bilen ÝB-niň her agza döwleti raýatyna **Ýewropa Sanly Şahsyýet Gapjygyny** hödürlemäge borçly. Bu gapjygyň arhitekturasy (ARF) we profilleri sanly ynamyň hakyky standartyna öwrülýär."),
            ("p", "Türki dünýäsi dili, medeniýeti we taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli; guramanyň şahsyýetine serhetden aňyrda ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda, her döwleti özygtyýarly saklaýan dolandyryş bilen gurýar."),
        ]),
        "principles": ("Ýörelgeler", [
            ("ul", [
                "**Ilki özygtyýarlylyk** — her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk 2/3 ses bilen; serhetaşa ykrar birtaraplaýyn kesgitlenýär.",
                "**Hiç bir umumy ýazgyda şahsy maglumat ýok** — sanawda, žurnalda ýa-da kitapda ýok; hatda heşi hem ýok.",
                "**Laýyk ýöne garaşsyz** — ÝB-niň tehniki gatlagy bolşy ýaly; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.",
                "**Köp döwlet üçin** — hiç bir belgi ýa-da rol Tamga-ny ýeke-täk operator hasaplamaýar; Tamga hemişe wagtlaýyn wekildir.",
                "**Kitap saklaýyş däl, gol çekijileriň saýlanmasydyr** — häzir sanawlar; garaşsyz operatorlar goşulanda kitap.",
                "**Kadadan çykmasyz enjam baglanyşygy** — resminamanyň her nusgasy enjamdaky açara baglanandyr; nusgany gaýtadan oýnap bolmaýar.",
                "**Tabşyrmak üçin dizaýn** — her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar.",
            ]),
        ]),
        "roles": ("Rollar", [
            ("p", "ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy, “TR National Root CA (wagtlaýyn operator: Tamga)” we gapjyk üpjün edijisi. Guramalar resminama üpjün edijilerdir; iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr. PID üpjün edijisiniň orny döwlet ony doldurýança boş; şol wagt şahsyýet resminamasy Tamga şahsyýet hyzmatyndan gelýär (resminama we janlylyk barlagy). Heniz validator operatory ýok — şonuň üçin kitap hem ýok. Ýanaşyk: [Tamga we EUDI arhitekturasy](/docs/eudi-comparison)."),
        ]),
        "trust": ("Ynam modeli: gol çekilen ynam sanawlary", [
            ("p", "Gol kimiň gol çekendigini subut edýär; **ynam sanawy** bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip biljekdigini we häzirki ýagdaýyny aýdýar. Sanawlar gol çekilen JWS faýllarydyr, **wersiýaly we heş-zynjyrly**, pozulmaýar we indiki täzelenme senesini göterýär; barlaýjy gol çekijini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk **labyr žurnalyna** ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik: [ynam sanawlary](/docs/trust-lists)."),
            ("table", "Çap edilýän faýllar — trust.tamga.network", "trust"),
            ("p", "Belgiler bellenilmeýär, alynýar; tabşyrylanda ýa-da kitap gelende üýtgemeýär:"),
            ("table", "Belgiler", "ids"),
        ]),
        "credentials": ("Resminamalar: SD-JWT VC we mdoc", [
            ("p", "Esasy görnüş **SD-JWT VC** (IETF, `dc+sd-jwt`, ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar; sözbaşy guramanyň X.509 zynjyryny göterýär; `cnf` nusgany enjam açaryna baglaýar. Şahsyýet resminamasy mundan başga-da **ISO 18013-5 mdoc** görnüşinde berilýär; şeýlelikde ýaş barlagy `age_over_18` meýdanyny alýar we başga hiç zat almaýar. Resminama görnüşleri hemişelik URN-lerdir; olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär. Serediň: [resminamalar](/docs/did-vc)."),
            ("code", "SD-JWT VC görnüşindäki diplom (açylan, gysgaldylan)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "Milli şahsyýet belgisi diňe şahsyýet resminamasynda bar; hiç bir diplom, karta ýa-da bilet ony göterýär däl."),
        ]),
        "flows": ("Bermek we hödürlemek", [
            ("ul", [
                "**Bermek (OpenID4VCI).** Gurama QR kody we şol ekranda PIN görkezýär — PIN baglanyşygyň içinde asla gitmeýär. Ýa-da gapjyk guramalaryň katalogyndan başlaýar we ilki adamyň şahsyýetini subut edýär. Gapjyk her biri başga enjam açaryna baglanan **on nusga** alýar.",
                "**Diňe hakyky gapjyklar.** Guramalar gapjyk üpjün edijisinden gysga möhletli **gapjyk tassyklamasyny** (WUA) talap edýär.",
                "**Hödürlemek (OpenID4VP, DCQL).** Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir. Gapjyk ony ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär; soňra tassyklanan meýdanlar we açaryň şu telefondadygynyň subutnamasy bilen şifrlenen jogap iberýär.",
                "**Web saýtlar.** Saýt adamy bir gezek gapjyk bilen hasaba alýar; soňra gündelik giriş **passkey** bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: [Tamga bilen gir](/docs/login-with-tamga).",
            ]),
        ]),
        "verification": ("Barlag: bäş gatlak, üç netije", [
            ("p", "Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar."),
            ("table", "Barlag hatary", "pipeline"),
            ("p", "**INDETERMINATE** (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy “häzir barlap bolmady” diýýär — “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitleýär. Ygtyýar **berlen senesine** görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar."),
        ]),
        "revocation": ("Ýatyrylyş we durmuş aýlawy", [
            ("p", "Ýatyrylyş **IETF Token Status List** bilen edilýär: her resminama nusgasy üçin **tötänleýin** orunda iki bit — güýjünde, ýatyrylan ýa-da togtadylan. Gurama sanawy **kesgitli aralykda** çap edýär, asla haýyş boýunça däl; şeýlelikde wagty adam barada hiç zady aýan etmeýär; her çap edilişi labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak ne gurama, ne-de telefona çagyryş edýär. Ýatyrylyş iň giç takmynan 90 minutda her barlaýja ýetýär. Nusgalar dizaýn boýunça gutarýar; gapjyk täzelerini almazdan öň soraýar we asla ýuwaşlyk bilen täzelemeýär. Serediň: [dikeldiş we ýatyrylyş](/docs/recovery-revocation)."),
        ]),
        "privacy": ("Dizaýndan gelýän gizlinlik", [
            ("ul", [
                "**Barlaýjy başyna nusga.** Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär.",
                "Adaty ýagdaýda **saýlama açyklama**; görnüş rugsat berende `age_over_18` ýaly predikatlar.",
                "**Şahsyýet barlagy aýrylandyr.** Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär; resminamany berenden soň surat saklamaýar, diňe açyk däl, heşlenen ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.",
                "**Žurnallarda we açyk salgylarda şahsy maglumat ýok.** Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.",
                "**Web saýtlar** hasap açarynyň çig bahasyny däl, öz syry bilen döredilen heşini saklaýar.",
            ]),
            ("note", "Açyk aýdylýan galyndy töwekgelçilik: şol bir gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, adamy heniz tanap biler. Muny ýapmak üçin nol bilimli resminamalar gerek (gözleg ugurlaryna serediň)."),
        ]),
        "proximity": ("Ýakyn aralyk: geçiş kartalary we ýaş barlagy", [
            ("p", "Turniketler we çäre gapylary üçin Tamga **geçiş kartasyny** ulanýar: standart hödürleme bilen bir gezek hasaba durmak, soňra QR hökmünde görkezilýän 60 sekuntlyk gol çekilen belgi — belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we biletler bir gezeklik bolup biler. Adamdan adama barlagda OpenID4VP tersine başlaýar: barlaýanyň programmasy standart haýyş başlaýar. Ikisi hem wersiýaly köprülerdir; maksat NFC/BLE arkaly ISO 18013-5."),
        ]),
        "ledger": ("Sanawlardan kitaba", [
            ("p", "Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we **QBFT** ylalaşykly rugsatly **Hyperledger Besu** toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Sanawyň her meýdany kontrakt ýazgysyna gabat gelýär; sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaby berýändigi synagdan geçirilýär. Bölekler ynamy bir interfeýs arkaly okaýar; resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: [blokçeýn näme — we näme däl](/docs/blockchain)."),
            ("p", "Kitapdaky dolandyryş ýörelgelere eýerýär: validatorlar deň sesli döwletlerdir; täze agzalar 2/3 ses bilen; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar; daşary ýurt guramalarynyň ykrar edilmegini her döwlet özi kesgitleýär."),
        ]),
        "research": ("Gözleg ugurlary", [
            ("p", "Bular öwrenilýän dizaýnlardyr; ilkinji wersiýanyň ýa-da pilotyň bölegi däl we islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer."),
            ("ul", [
                "Gurama tarapyndan tanalmagy aradan aýyrmak üçin **nol bilimli resminamalar** (meselem, BBS+). Serediň: [saýlama açyklama](/docs/selective-disclosure).",
                "**Hasabatly açyklama** — lakamlaryň diňe kazyýet we köp guramaly bosaga bilen çözülip bilinmegi (DKG we bosaga ElGamal; açar asla täzeden gurulmaýar). Serediň: [hasabatly açyklama](/docs/accountable-disclosure).",
                "**Alnan lakamlar we dikeldiş** — iýerarhiki açarlar, konwert şifrlemesi, enjamy dikeltmek. Serediň: [şahsyýet gatlaklary](/docs/identity-layers).",
                "**Baha gatlagy** — barlanan taraplaryň arasynda ygtyýarlandyrma; hasaplaşyk düzgünleşdirilen ýollarda galýar.",
            ]),
        ]),
        "status": ("Ýagdaý we ýol kartasy", [
            ("p", "**Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):** diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we şahsyýet resminamasy, mdoc görnüşinde hem; kampus we çäre geçiş kartalary, bir gezeklik biletler; web saýta hasaba durmak we passkey bilen giriş; sekiz açyk çeşmeli paket. Telefonda synagdan geçirildi."),
            ("table", "Tapgyrlar", "phases"),
            ("p", "Ilkinji wersiýadaky her gysga ýol — nusga ýazgylar, programmada açar, Tamga-da duran guramanyň açary, ýeke operator — açyk [belli gysga ýollar](/shortcuts) sahypasynda görkezilýär we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenendir."),
        ]),
        "limits": ("Belli çäkler", [
            ("ul", [
                "Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär.",
                "Ýatyrylyş iň giç takmynan 90 minutda güýje girýär.",
                "Nol bilimli resminamalar kabul edilýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.",
                "Diňe ilkinji wersiýada: açarlar programmada we guramanyň açary Tamga-da — ikisi hem pilotdan öň ýapylýar.",
                "Tamga Wallet App Store we Google Play-de çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär; dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar.",
            ]),
        ]),
        "open": ("Açyk çeşme we giňişleýin okamak", [
            ("p", "Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamalydyr. `@tamga-network/*` paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy we gapjyk ýadrosyny öz içine alýar; integrasiýa gollanmalary [işläp düzüjiler bölüminde](/docs/developers). Düşünjeler [resminamalarda](/docs) başdan düşündirilýär; [sözlük](/docs/glossary) çalt salgylanma, [manifest](/manifesto) bolsa “näme üçin”."),
            ("note", "Bu ýaşaýan resminamadyr (v3.0). Kararlar kämilleşdigiçe üýtgeýär; hemişelik galýan ynam modelidir."),
        ]),
    },
}

LANGS = {"en": EN, "tr": TR, "tk": TK}

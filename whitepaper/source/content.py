# -*- coding: utf-8 -*-
"""Tamga whitepaper v1.0 — tek kaynak (üretici: generate.py). İlk baskı 2026-10-03; gözden geçirilmiş baskı 2026-10-27 (sürüm 1.0 kalır,
duyuruya kadar yerinde güncellenir). Diller: en, tr, tk, az (hepsi sitede ve PDF'te). Satır içi: **kalın**, `kod`,
[metin](/learn/yol) ya da [metin](https://…) (tam adres olduğu gibi kalır; dile göre docs/ARF adresi içerikte yazılır).
Blok türleri: ("p", str) · ("ul", [str]) · ("code", etiket, KOD_ANAHTARI) · ("table", etiket, TABLO_ANAHTARI) · ("note", str)
Kaynaklar: DECISIONS §0 (D-BC-6…11, D-GOV-5, D-GOV-9, D-SCHEMA-4, D-CRED-4…9, D-PROX-1/2, D-REG-3, D-ID-6/13/14), ADR-0009…0014,
ADR-0031, ADR-0032, ADR-0035…0038, ADR-0042 (ağ cüzdan işletmez), ADR-0044 (ZK kısa ömürlü kopya), ADR-0048 (bit sayısı),
ADR-0051…0055 (zincir projeksiyon, Besu izin, rakip aday, ad alanı, yönetişim), ADR-0057 (uzaktan imza), ADR-0058 (erişim sertifikası),
ADR-0059…0065 (öz-test düzeltmeleri, age_over_15, terminal anahtarı), Tamga ARF 1.0, SPEC-TRUST-0001, SPEC-API-0001,
SPEC-PROTO-0001/0002; OpenID öz-testi sonuçları (blog: openid-conformance-self-test); STATUS 2026-10-27 (npm 0.7.3).
Yazım: marketing/YAZIM-REHBERI.md (doğal cümle, uzun tire yok, kalın yalnız madde başında)."""

DATE = "2026-10-27"        # bu baskının tarihi (başlık sayfası, site üst satırı)
FIRST_DATE = "2026-10-03"  # ilk baskı

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
            ("lotl.jws", "list of lists: national lists, external lists, schemas, wallet providers, accepted ZK circuits"),
            ("tl-tr.jws", "Türkiye: root CAs, issuers with their authorizations, relying parties, wallet providers"),
            ("tl-<cc>.jws", "a reserved slot for every other member state (AZ, KZ, KG, UZ) and for the observers (HU, TM); only TR is active today"),
            ("anchors.jsonl", "anchor log: one signed line per event, at least hourly"),
            ("keys/", "root fingerprints (the out-of-band trust anchor)"),
            ("archive/", "every past version, never deleted"),
        ],
        "tr": [
            ("lotl.jws", "listelerin listesi: ulusal listeler, dış listeler, şemalar, cüzdan sağlayıcıları, kabul edilen ZK devreleri"),
            ("tl-tr.jws", "Türkiye: kök sertifika otoriteleri, yetkileriyle birlikte belge verenler, doğrulayıcılar, cüzdan sağlayıcıları"),
            ("tl-<cc>.jws", "öteki her üye devlet (AZ, KZ, KG, UZ) ve gözlemciler (HU, TM) için ayrılmış yer; bugün yalnız TR etkin"),
            ("anchors.jsonl", "çapa günlüğü: her olay için imzalı bir satır, en az saatte bir"),
            ("keys/", "kök parmak izleri (bant dışı güven çapası)"),
            ("archive/", "geçmiş her sürüm, hiç silinmez"),
        ],
        "tk": [
            ("lotl.jws", "sanawlaryň sanawy: milli sanawlar, daşky sanawlar, shemalar, gapjyk üpjün edijileri, kabul edilen ZK zynjyrlary"),
            ("tl-tr.jws", "Türkiýe: kök sertifikat edaralary, ygtyýarlary bilen resminama berijiler, barlaýjylar, gapjyk üpjün edijileri"),
            ("tl-<cc>.jws", "beýleki her agza döwlet (AZ, KZ, KG, UZ) we synçylar (HU, TM) üçin goýlan orun; häzir diňe TR işjeň"),
            ("anchors.jsonl", "labyr žurnaly: her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"),
            ("keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"),
            ("archive/", "öňki her wersiýa, asla pozulmaýar"),
        ],
        "az": [
            ("lotl.jws", "siyahıların siyahısı: milli siyahılar, xarici siyahılar, sxemlər, cüzdan provayderləri, qəbul edilmiş ZK sxemləri"),
            ("tl-tr.jws", "Türkiyə: kök sertifikat mərkəzləri, səlahiyyətləri ilə birlikdə sənəd verən qurumlar, yoxlayan tərəflər, cüzdan provayderləri"),
            ("tl-<cc>.jws", "digər hər üzv dövlət (AZ, KZ, KG, UZ) və müşahidəçilər (HU, TM) üçün ayrılmış yer; bu gün yalnız TR aktivdir"),
            ("anchors.jsonl", "lövbər jurnalı: hər hadisə üçün imzalı bir sətir, ən azı saatda bir dəfə"),
            ("keys/", "kök barmaq izləri (ayrıca kanalla dərc edilən etibar lövbəri)"),
            ("archive/", "keçmiş hər versiya, heç vaxt silinmir"),
        ],
    },
    "ids": {
        "en": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(root certificate))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(issuer certificate))"),
            ("vct", "urn:tamga:<domain>:<Type>:<major>, e.g. urn:tamga:edu:DiplomaCredential:1 (network type)"),
            ("vct (national)", "urn:tamga:<cc>:<domain>:<Type>:<major>, registered by one state in its own namespace"),
            ("schema_id", "keccak256(vct)"),
            ("person", "no identifier; a device key per credential copy"),
        ],
        "tr": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifika))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(kurum sertifikası))"),
            ("vct", "urn:tamga:<alan>:<Tür>:<ana sürüm>, örn. urn:tamga:edu:DiplomaCredential:1 (ağ türü)"),
            ("vct (ulusal)", "urn:tamga:<cc>:<alan>:<Tür>:<ana sürüm>; bir devletin kendi ad alanında kaydettiği tür"),
            ("schema_id", "keccak256(vct)"),
            ("kişi", "tanımlayıcı yok; her belge kopyası için bir cihaz anahtarı"),
        ],
        "tk": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"),
            ("vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa>, meselem urn:tamga:edu:DiplomaCredential:1 (tor görnüşi)"),
            ("vct (milli)", "urn:tamga:<cc>:<ugur>:<Görnüş>:<esasy wersiýa>; bir döwletiň öz at meýdanynda hasaba alan görnüşi"),
            ("schema_id", "keccak256(vct)"),
            ("adam", "belgi ýok; resminamanyň her nusgasy üçin bir enjam açary"),
        ],
        "az": [
            ("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"),
            ("issuer_id", "keccak256(state_code ‖ SHA-256(qurum sertifikatı))"),
            ("vct", "urn:tamga:<sahə>:<Növ>:<əsas versiya>, məs. urn:tamga:edu:DiplomaCredential:1 (şəbəkə növü)"),
            ("vct (milli)", "urn:tamga:<cc>:<sahə>:<Növ>:<əsas versiya>; bir dövlətin öz ad sahəsində qeydə aldığı növ"),
            ("schema_id", "keccak256(vct)"),
            ("şəxs", "identifikator yoxdur; sənədin hər nüsxəsi üçün bir cihaz açarı"),
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
            ("_sd", "gizli alanlar, salted hash olarak"),
            ("başlık · x5c", "kurumun X.509 sertifika zinciri"),
        ],
        "tk": [
            ("cnf.jwk", "şu nusganyň enjam açary"),
            ("_sd", "gizlin meýdanlar, duzlanan heşler görnüşinde"),
            ("sözbaşy · x5c", "guramanyň X.509 sertifikat zynjyry"),
        ],
        "az": [
            ("cnf.jwk", "bu nüsxənin cihaz açarı"),
            ("_sd", "gizli sahələr, salted hash şəklində"),
            ("başlıq · x5c", "qurumun X.509 sertifikat zənciri"),
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
            ("→ outcome", "ACCEPTED · REJECTED (with the failing step) · INDETERMINATE (could not check)"),
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
        "az": [
            ("T0", "sorğu və cavab bir-birinə aiddir (nonce, ünvanlanan tərəf, şifrələmə)"),
            ("A · format", "imza, sertifikat zənciri, cihaz sübutu, gizli sahələr pozulmayıb"),
            ("B · növ", "sənəd növü qeydiyyatdadır; təsvirin hash-i kataloqdakı ilə eynidir"),
            ("C · etibar", "qurum bu növ üçün verilmə tarixində səlahiyyətli idi; kateqoriya uyğundur"),
            ("D · status", "ləğv edilməyib və dayandırılmayıb; siyahı aktualdır və lövbərlənib"),
            ("E · siyasət", "tələb olunan sahələr var; yoxlayan tərəfin əhatə dairəsindən kənar heç nə yoxdur"),
            ("→ nəticə", "ACCEPTED (qəbul) · REJECTED (rədd, hansı addımda) · INDETERMINATE (yoxlanıla bilmədi)"),
        ],
    },
    "phases": {
        "en": [
            ("List stage (today)", "signed trust lists and anchor log · Tamga as provisional operator · sandbox live · packages on npm as test releases · OpenID self-test done"),
            ("Pilot", "the first issuing institution is a university · the institution's key stays at the institution (remote signing) · wallets in the app stores · Bluetooth and the Digital Credentials API on real phones · lists, no ledger"),
            ("Handover", "the network's operation passes to a foundation; the step is scripted and rehearsed · identifiers do not change"),
            ("Phase 0", "permissioned Besu/QBFT ledger once at least 2 independent validator operators sign · the contracts are written and tested; the chain mirrors the signed lists"),
            ("Phase 1", "member-state lists · close range over NFC with reader authentication"),
        ],
        "tr": [
            ("Liste aşaması (bugün)", "imzalı güven listeleri ve çapa günlüğü · Tamga geçici operatör · sandbox yayında · paketler npm'de deneme sürümü · OpenID öz-testi yapıldı"),
            ("Pilot", "ilk belge veren kurum bir üniversite · kurumun anahtarı kurumda kalır (uzaktan imza) · cüzdanlar mağazalarda · gerçek telefonlarda Bluetooth ve Digital Credentials API · listeler, defter yok"),
            ("Devir", "ağın işletmesi bir vakfa geçer; adım yazılı ve provası yapılmış · tanımlayıcılar değişmez"),
            ("Faz 0", "en az 2 bağımsız validator operatörü imzalayınca izinli Besu/QBFT defteri · kontratlar yazıldı ve test edildi; zincir imzalı listeleri yansıtır"),
            ("Faz 1", "üye devlet listeleri · okuyucu doğrulamalı NFC ile yakın alan"),
        ],
        "tk": [
            ("Sanaw tapgyry (häzir)", "gol çekilen ynam sanawlary we labyr žurnaly · Tamga wagtlaýyn operator · sandbox işleýär · paketler npm-de synag wersiýasy · OpenID öz-synagy edildi"),
            ("Pilot", "ilkinji resminama beriji gurama uniwersitet · guramanyň açary guramada galýar (uzakdan gol) · gapjyklar dükanlarda · hakyky telefonlarda Bluetooth we Digital Credentials API · sanawlar, kitap ýok"),
            ("Tabşyryş", "toruň dolandyryşy bir gaznaga geçýär; ädim ýazylan we synagdan geçirilen · belgiler üýtgemeýär"),
            ("0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby · kontraktlar ýazyldy we synagdan geçdi; zynjyr gol çekilen sanawlary şöhlelendirýär"),
            ("1 tapgyr", "agza döwletleriň sanawlary · okaýjy barlagly NFC arkaly ýakyn aralyk"),
        ],
        "az": [
            ("Siyahı mərhələsi (bu gün)", "imzalı etibar siyahıları və lövbər jurnalı · Tamga müvəqqəti operator · sandbox işləyir · paketlər npm-də sınaq buraxılışı · OpenID öz-sınağı aparılıb"),
            ("Pilot", "sənədi verən ilk qurum bir universitetdir · qurumun açarı qurumda qalır (uzaqdan imza) · cüzdanlar mağazalarda · real telefonlarda Bluetooth və Digital Credentials API · siyahılar var, reyestr yoxdur"),
            ("Təhvil", "şəbəkənin idarəsi bir fonda keçir; addım yazılıb və məşq edilib · identifikatorlar dəyişmir"),
            ("Faza 0", "ən azı 2 müstəqil validator operatoru imzaladıqda icazəli Besu/QBFT reyestri · müqavilələr yazılıb və test edilib; zəncir imzalı siyahıları əks etdirir"),
            ("Faza 1", "üzv dövlətlərin siyahıları · oxuyucunun autentifikasiyası ilə NFC üzərindən yaxın məsafə"),
        ],
    },
}

IDS = ["problem", "vision", "principles", "roles", "trust", "credentials", "flows", "verification",
       "revocation", "privacy", "proximity", "ledger", "research", "status", "limits", "open"]

EN = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper, version 1.0 (revised 27 October 2026): a digital trust infrastructure for Türkiye and the Turkic world on the EUDI profiles. Signed trust lists, SD-JWT VC and ISO mdoc, OpenID4VCI and OpenID4VP, a five-step verification pipeline, privacy by design, the OpenID self-test, the path to a ledger, and what works today.",
    "masthead": "Whitepaper · v1.0 · revised " + DATE,
    "eyebrow": "Digital Trust Infrastructure",
    "title": "A Digital Trust Infrastructure for Türkiye and the Turkic World",
    "pdf_title": "A Digital Trust Infrastructure \\ for Türkiye and the Turkic World",
    "subtitle": "A sovereign reference architecture on the EU’s EUDI profiles. Institutions hold X.509 certificates, trust rests on signed lists today, and a permissioned ledger is added once independent operators join.",
    "abstract_label": "Executive summary",
    "toc": "Contents",
    "version": "WHITEPAPER · VERSION 1.0",
    "edition": "Revised edition · first published " + FIRST_DATE,
    "footer": "Whitepaper v1.0",
    "further": "Further reading",
    "abstract": [
        "Tamga Network is a digital trust infrastructure. An institution issues a document, such as a diploma, a student card, an identity credential or a ticket, straight into a person’s phone. The person shares only the fields a verifier asks for, and the verifier checks them in seconds without calling the institution.",
        "The technical layer is the European Union’s, unchanged: SD-JWT VC and ISO 18013-5 mdoc credentials, OpenID4VCI and OpenID4VP, X.509 certificates for institutions and signed trust lists in the ETSI model. Tamga adds a governance layer written for the Turkic world. Every list, identifier and role has a slot for each member state, and Tamga holds the operator’s role only provisionally, on their behalf, until a state takes it over.",
        "Trust today rests on versioned, hash-chained trust lists with a public anchor log. The code for a permissioned Besu/QBFT ledger is written and tested, but the ledger only mirrors the signed lists and stays switched off until at least two independent operators run it together. No personal data, not even a hash, is written to lists, logs or ledger. The services run end to end with real cryptography, the open packages are on npm as test releases, and in October 2026 the issuer and the verifier ran the OpenID Foundation’s conformance test plans as a self-test and finished with no failed module. This document says what works, what is planned and what is still research.",
    ],
    "sections": {
        "problem": ("The problem: the end of the document copy", [
            ("p", "For decades people proved who they were by handing over copies. A copy of the diploma goes to the employer, a copy of the ID card goes to the bank, and each copy then lives on a server its owner never sees again. Every bank, employer and university builds the same verification over and over, and whether a document is genuine comes down to how convincing the copy looks."),
            ("p", "The new model turns this around. The document stays with the person, only the proof that is needed is shared, and the verifier checks a cryptographic signature instead of asking the source. The rest of this document explains how Tamga builds that model for Türkiye and the Turkic world; the background is in [why a new model](/learn/paper-to-digital)."),
        ]),
        "vision": ("Vision: from eIDAS 2.0 to the Turkic world", [
            ("p", "With eIDAS 2.0, every EU member state must offer its citizens a European Digital Identity Wallet. The architecture behind it, the ARF, and the profiles it fixes are becoming the common language of digital trust well beyond the EU, because wallets, issuers and verifiers built on them can talk to each other."),
            ("p", "The Turkic world shares a language family, a culture and much history. A diploma issued in one state should be verifiable in another, and an institution’s identity should be trusted across the border. Tamga builds that shared ground on the same standards, with a governance layer that keeps every state sovereign over its own registry."),
            ("p", "Tamga is built in three layers, and each stands on its own. At the base, credentials, protocols and trust lists follow the EU standards, so a compatible wallet or verifier from elsewhere can work with a Tamga institution. Above that, Tamga Network is a light federation: it collects each state’s trust list and lets states recognise one another. Today Tamga publishes Türkiye’s list provisionally; when a state publishes its own, the network points to it. On top of the network run the wallets and services that follow its rules. The network runs no wallet of its own. It lists wallet providers in its trust list, and any provider that follows the published rules can be listed. The first listed wallet is Tamga Wallet, a separate product with its own provider service, and its record has been active in the list since 14 October 2026. Tamga Wallet is EU-compatible; the title “EUDI Wallet” is reserved for wallets an EU member state provides or recognises. The network sells nothing. It runs the rules, the trust lists, the open code and reference services such as the Institution Console and Tamga Verify, while commercial services are offered by companies outside the network."),
        ]),
        "principles": ("Principles", [
            ("ul", [
                "**Sovereignty first.** Each state is the only writer of its own registry; network membership is decided by a two-thirds vote; cross-border recognition is a unilateral decision of each state.",
                "**No personal data in any shared record.** Lists, logs and ledger carry no personal data, not even a hash.",
                "**Compatible but independent.** The EU’s technical layer is used as it is; the governance layer is written for the Turkic world.",
                "**Built for many states.** No identifier, role or data structure assumes that Tamga is the only operator. Tamga is always the provisional stand-in, on the record.",
                "**A ledger is a choice of signers, not of storage.** Signed lists today; a ledger once independent operators sign together.",
                "**Holder binding without exception.** Every credential copy is bound to a key on the person’s device, so a copy cannot be replayed.",
                "**Designed to be handed over.** Every provisional power has a measurable handover point, and the handover of the network’s operation to a foundation is already scripted and rehearsed.",
            ]),
        ]),
        "roles": ("Roles", [
            ("p", "Every role of the EU architecture exists in Tamga. Where a state has not yet joined, Tamga holds the role provisionally and on the record: trusted-list operator, registrar and the “TR National Root CA (provisional operator: Tamga)”. Institutions are attestation providers. Employers, websites and gates are registered relying parties, each with an access certificate that names the organisation and a support contact, following the ETSI TS 119 411-8 profile. The PID-provider slot stays empty until a state fills it. Until then an identity credential comes from Tamga’s identity service, which verifies the person’s identity document and liveness; this credential is an attestation rather than a state PID and will be superseded when a state’s PID arrives. The network does not pick wallets, it lists them. Each wallet runs its own wallet provider, which registers the wallet units and issues the wallet and key attestations, and the network runs none. Today the Türkiye list has one active issuer, the provisional identity service; the test institutions used in the demos have been revoked, and the first real institution is being prepared. There are no validator operators yet, so there is no ledger. A side-by-side table is in [roles and terms](/learn/roles)."),
        ]),
        "trust": ("Trust model: signed trust lists", [
            ("p", "A signature proves who signed. A trust list says whether that signer is a real institution, which document types it may issue, since when, and what its current status is. Tamga’s lists are signed JWS files, versioned and hash-chained, so every version points to the one before it. No version is ever deleted and each carries a next-update date. A verifier checks the list’s signer against a root fingerprint published out of band. Every list version, every revocation-list publication and every schema change is also written, at least hourly, to a public anchor log, so a list that has been rolled back can be detected. Details are in [trust lists](/learn/trust-lists)."),
            ("table", "Published files — trust.tamga.network", "trust"),
            ("p", "Identifiers are derived from certificates and type names rather than assigned by hand, so they survive a handover and the arrival of a ledger unchanged:"),
            ("table", "Identifiers", "ids"),
            ("p", "**Federation.** The list of lists can also point to a list that another operator publishes: a state, an institution it authorises, or the EU. For each such list it records the address, a signer pinned in Tamga’s own signed list of lists, and a scope saying which roles and document types the list may vouch for. The list stays with its owner. When a state publishes its own list, wallets and verifiers see only the address and the signer change. The first external format read is ETSI TS 119 602, so a Tamga verifier can also recognise the EU identity credential (PID) and the mobile driving licence (mDL). No external list is in the list of lists today; each one is added with an approval on the record. See [federation](/learn/federation)."),
        ]),
        "credentials": ("Credentials: SD-JWT VC and mdoc", [
            ("p", "The main format is SD-JWT VC (IETF, `dc+sd-jwt`, ES256). Each field is hidden behind a salted hash and revealed only with the holder’s approval. The header carries the institution’s X.509 chain, and `cnf` binds the copy to a key on the device. The identity credential is also issued as an ISO 18013-5 mdoc with the same holder key, so a browser or an age gate that only understands mdoc can use it. Both forms carry the age flags `age_over_15` and `age_over_18`, derived from the birth date at issuance; a verifier that asks for one of them gets a yes or a no and nothing else. The set of age thresholds is closed and changes only by a recorded decision. Document types are stable URNs. Their definitions sit in a public catalogue and every credential carries a hash of its definition, so a wallet can tell when a definition has changed. A national type that a member state registers uses its own namespace, `urn:tamga:<cc>:…`, so a national name can never collide with a network-wide one. See [credentials](/learn/verifiable-credentials)."),
            ("code", "An SD-JWT VC diploma (decoded, shortened)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "The national ID number appears only in the identity credential, and only as a selectively disclosed field. No diploma, card or ticket carries it."),
        ]),
        "flows": ("Issuing and presenting", [
            ("ul", [
                "**Issuance (OpenID4VCI).** The institution shows a QR code and a PIN on the same screen; the PIN never travels inside the link. Alternatively the wallet starts from the institution directory and first proves the person’s identity by presenting the identity credential. The wallet receives ten copies, each bound to a different device key. An access token may be used for several credential requests within its five-minute lifetime, but only for the configurations it covers, for ten copies in total and always with the same DPoP key.",
                "**Genuine wallets only.** Before issuing, the institution checks a short-lived wallet instance attestation and a key attestation from the wallet provider. Both come from a provider listed in the trust list, carry their own revocation entry, and tell the issuer how the key is stored.",
                "**Presentation (OpenID4VP, DCQL).** The verifier’s request is signed with its registered certificate and carries its registration certificate. The wallet checks both against the trust list, shows exactly what is asked and warns about anything beyond the verifier’s registered scope. Where the verifier offers alternatives (`credential_sets`, `claim_sets`), the wallet shows them as options. A credential missing a requested field is never sent, and the wallet tells the person why a request cannot be met. The answer is encrypted and carries only the approved fields and a proof that the key is on this phone.",
                "**From the browser.** A website can ask for a credential through the browser’s Digital Credentials API instead of a QR code. The reference verifier offers it, and the wallet core answers the ISO/IEC 18013-7 Annex C request for an mdoc. In Tamga Wallet the Android module is written but has not yet been tried on a device, and there is no iOS version yet.",
                "**Websites.** A site signs a person up once with the wallet, under a pseudonym that belongs to that site alone. The wallet derives the pseudonym from the site’s registered domain, so two sites cannot match a person, a renewed certificate does not change it, and the same pseudonyms return on a new phone after the identity check. Daily sign-in then uses a passkey and shares no fields. See [sign in with Tamga](/learn/unlinkability).",
            ]),
        ]),
        "verification": ("Verification: five steps, three outcomes", [
            ("p", "Every verification runs the same pipeline in the same order and stops at the first failure. Each step has a permanent code, so a rejection always says why."),
            ("table", "Verification pipeline", "pipeline"),
            ("p", "INDETERMINATE is never reported as REJECTED. If a list cannot be reached or is out of date, the verifier says that it could not check right now, because the difference between “this diploma is fake” and “I cannot check” can decide whether someone is hired. Authorization is judged on the issue date: a diploma issued while a university was active stays valid after the university is suspended, while new issuance stops at once."),
            ("p", "In October 2026 the identity service and Tamga Verify ran the OpenID Foundation’s conformance test plans on the sandbox: OpenID4VCI with HAIP and FAPI 2.0 (63 modules) and OpenID4VP with HAIP (14 modules). The last issuer run ended with no failed module and the last verifier run with no failed module and no warning. About twenty changes came out of it, each tied to a clause in a specification, and four of them changed earlier decisions through recorded ADRs. This was a self-test with the Foundation’s own tool; certification is a separate process. What a first run teaches is published as the open-source [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit), and the full account is in the [blog](/blog/openid-conformance-self-test)."),
        ]),
        "revocation": ("Revocation and lifecycle", [
            ("p", "Revocation uses the IETF Token Status List. Each credential copy has a status entry at a random position in a list. The identity service’s lists use one bit per entry, so a credential is valid or revoked and never suspended. Institution lists use two bits, and the suspended value appears only where the type’s schema allows suspension, which today is the diploma. The issuer publishes at a fixed interval rather than on demand, so timing reveals nothing about a person, and each publication is anchored. Verifiers fetch the lists in advance, so checking a credential makes no call to the issuer or to the phone. Lists are republished every 2 minutes and each stays valid for 6 hours: while the status server is up, a revocation reaches verifiers within minutes, and a short outage does not stop verification."),
            ("p", "Copies run out by design. When a credential comes with a refresh token, the wallet renews its copies in the background at the threshold the issuer announces, and a renewal shares nothing new. The refresh token is bound to the wallet instance’s attestation key rather than to a single transport key, as the OAuth attestation profile requires, so the wallet can rotate its DPoP keys and still renew. Credentials that are renewed by presenting the identity credential need the person’s approval and PIN. See [revocation](/learn/revocation)."),
        ]),
        "privacy": ("Privacy by design", [
            ("ul", [
                "**Per-verifier copies.** Each verifier receives a different copy bound to a different key, so verifiers cannot link a person by comparing what they received. Issuance and expiry times are rounded to the hour, so copies cannot be linked by timestamp either.",
                "**Selective disclosure** by default, and yes/no flags such as `age_over_15` and `age_over_18` where a question can be answered without the underlying data.",
                "**Identity checks are isolated.** Only the identity service talks to the identity-verification provider. After issuing it keeps no photos, only an opaque record (a subject reference and a hash of the document number). Institutions match a person through the identity credential, never through the provider.",
                "**No personal data in logs or public addresses.** Revocation-list addresses never encode the institution; logs record what happened, never to whom.",
                "**Websites** get a pseudonym per site as the account key. Neither the identity-document number nor its hash is ever sent, and the seed the pseudonyms derive from reaches the wallet as a credential of its own and is never stored on the server.",
            ]),
            ("note", "A residual risk, stated openly: an issuer colluding with several verifiers could still link a person through the signatures it issued. Zero-knowledge presentation closes this gap; on the wallet side it follows the store release (see the section on zero-knowledge proofs)."),
        ]),
        "proximity": ("Close range: passes and age checks", [
            ("p", "For turnstiles and event gates Tamga uses a pass. The person registers once with a standard presentation; afterwards the wallet shows a signed 60-second token as a QR code. The token carries no personal data, replay is rejected, and a ticket can be single-use. Since October 2026 each gate identifies itself to the verification service with a terminal key issued by the operator, so someone who photographs a QR code cannot spend the ticket before its owner reaches the gate. For a person-to-person check the roles are reversed: the wallet shows a short-lived request address and the checker’s app starts a standard OpenID4VP request. Both are versioned bridges. The target is ISO 18013-5 over Bluetooth and NFC; the Bluetooth path is coded in the wallet and waits for device tests."),
        ]),
        "ledger": ("From lists to a ledger", [
            ("p", "A ledger adds something only when several independent parties run it. Tamga therefore starts with lists and will add a permissioned Hyperledger Besu network with QBFT consensus only once at least two independent validator operators agree in writing. The contracts for that network are written, compiled and tested, and the list publisher can already submit list digests to a local development chain. By decision, the chain is a projection of the signed lists: it records only the digest of each list version (version, content hash, previous hash, publication time) and the digest of the anchor log’s last line. It holds no content, no registration, no credential and no personal data. A digest counts as confirmed only when the threshold of independent writers has submitted the same value, and if writers disagree about a version, the conflict is recorded instead of being locked in by whoever came first. The chain’s answer is never required for verification, and where it disagrees with the signed list, the list wins. In production the feature stays switched off until a second independent operator exists."),
            ("p", "Governance on the ledger follows the principles. Validators are states with equal votes; new members join by a two-thirds vote; each state alone registers or suspends its own institutions, and each decides for itself which foreign institutions it recognises. A protocol upgrade waits at least seven days after it reaches the threshold, so a state that disagrees can leave before it takes effect. National schema names live in their own namespace, an institution can anchor only to its own state’s root certificate, and the ledger’s status-list registry accepts each list with its own bit width. Before the switch, the list history is replayed into the contracts and both must give the same answers. Components read trust through one interface, so credentials, wallets and the verification pipeline do not change. See [what blockchain is, and is not](/learn/what-is-blockchain)."),
        ]),
        "research": ("Zero-knowledge proofs and research directions", [
            ("p", "**Zero-knowledge presentation (decided and partly built).** The wallet proves a statement such as “over 18” or “over 15” about an unchanged, issuer-signed mdoc with the open-source Longfellow ZK system, which the EU’s age-verification work also builds on. The verifier learns only that the statement is true and which institution issued the credential, and two presentations cannot be linked. Only reviewed circuits whose identifiers are published in the signed trust list are accepted. Because the proof reveals no status-list index, revocation cannot be checked inside it; the proof is therefore made over a short-lived copy valid for at most 24 hours, which the identity service stops renewing once the credential is revoked. The verifier side is live. The native prover is compiled for Android and real proofs have been tested with a desktop prover; proof generation on the phone follows the store release, and where a proof is not possible the ordinary presentation continues. See [zero-knowledge proofs](/learn/zero-knowledge-proofs)."),
            ("p", "**Research direction: the value layer.** Authorization between verified parties, with settlement staying on regulated rails. It is not part of the first release or the pilot and will pass an independent security review before any use."),
        ]),
        "status": ("Status and roadmap", [
            ("p", "**Working today (first release, real cryptography):** issuance and presentation of diplomas and student cards; revocation and institution suspension; identity check and identity credential, also as mdoc, with two age flags; campus and event passes with authenticated gates and single-use tickets; website sign-up with a per-site pseudonym and passkey sign-in; zero-knowledge age proofs on the verifier side; a hosted issuing service in which the institution’s signing key stays at the institution and the service sends it only a hash to sign (Cloud Signature Consortium API). Nine open-source packages are on npm as the 0.7.3 test release, which carries the verifier fixes from the self-test. The real network’s Türkiye list is live with the identity service as its only active issuer; the first real institution, a university, is being prepared."),
            ("table", "Phases", "phases"),
            ("p", "The known limits of the first release are recorded below and are closed before the pilot. The pilot’s success and stop criteria are defined in advance. Tamga Wallet, the first listed wallet, is in an Android test build; the store releases and the device tests for Bluetooth and the Digital Credentials API are the next steps on the wallet side, and they are the wallet’s work rather than the network’s."),
            ("p", "A separate test network, sandbox.tamga.network, has been live since October 2026: its own test root and lists, sample institutions, fake people and sample credentials of every type, an optional real identity check with daily and monthly caps next to the quick test, test institution accounts and a demo gate with its own terminal keys. No wallet or verifier on the real network trusts it. Wallet, institution and verifier developers all test there; a wallet developer registers their own wallet provider in the sandbox list and tries the wallet against the sample institutions, the identity service and the verifier. The OpenID self-test also ran there, with the test tool’s certificates added to the sandbox lists only. See the [sandbox guide](https://docs.tamga.network/guides/sandbox)."),
        ]),
        "limits": ("Known limits", [
            ("ul", [
                "In this phase the trust anchor rests on one operator’s signature. The public anchor log, the transparency report and audits deter misuse; they cannot make it impossible. Only a second independent list writer, and later the ledger, removes this limit.",
                "While the status server is up, a revocation takes effect within a few minutes (the 2-minute publication interval plus the verifier’s prefetch interval).",
                "A credential presented with a zero-knowledge proof cannot be checked for revocation inside the proof. The short-lived copy limits the exposure to 24 hours; it does not remove it.",
                "Issuer linkability remains until zero-knowledge presentation reaches the wallet.",
                "The identity service could in theory compute a person’s pseudonym at a given site. Key protection, a separately configured seed and audit limit this; zero-knowledge proofs will remove it.",
                "Until a wallet is in the app stores, a phone’s own claim of secure hardware is not accepted. From a wallet’s store release, App Attest and Play Integrity become mandatory.",
                "The OpenID conformance run was a self-test on the sandbox, for one variant of each plan. Certification is a separate process, and the wallet plans need a device build, so they have not been run.",
                "The hosted issuing service’s remote-signing path is implemented and tested, but no institution uses it on the real network yet; the real network refuses an institution key kept in a file.",
            ]),
        ]),
        "open": ("Rules, open source and further reading", [
            ("p", "The network’s rules are published as the Tamga ARF 1.0: the main document, the Trust Framework, the Tamga Rulebook and the rulebooks that branch from it for each document type (Education, Identity and Event Ticket) at [arf.tamga.network](https://arf.tamga.network). See also [rules and rulebooks](/learn/rules-and-rulebooks)."),
            ("p", "Code is Apache-2.0 and documentation CC BY 4.0. The packages `@tamga-network/*` cover trust lists, credential formats, issuing, verification, zero-knowledge proofs and the wallet core. Integration guides and specifications are in the [developer documentation](https://docs.tamga.network), and every decision this document refers to is published there as an ADR. Concepts are explained from scratch in [Learn](/learn); the [glossary](https://docs.tamga.network/glossary) is a quick reference and the [manifesto](/manifesto) gives the why."),
            ("note", "This is a living document. It stays at version 1.0 until the public announcement and is revised in place as decisions mature; this edition is dated 27 October 2026, and the first was published on 3 October 2026. The trust model is what stays."),
        ]),
    },
}

TR = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper, sürüm 1.0 (gözden geçirilmiş baskı, 27 Ekim 2026): EUDI profilleri üzerinde Türkiye ve Türk dünyası için dijital güven altyapısı. İmzalı güven listeleri, SD-JWT VC ve ISO mdoc, OpenID4VCI ve OpenID4VP, beş adımlı doğrulama hattı, tasarımdan gelen mahremiyet, OpenID öz-testi, deftere giden yol ve bugün ne çalışıyor.",
    "masthead": "Whitepaper · v1.0 · gözden geçirilmiş " + DATE,
    "eyebrow": "Dijital Güven Altyapısı",
    "title": "Türkiye ve Türk Dünyası için Dijital Güven Altyapısı",
    "pdf_title": "Türkiye ve Türk Dünyası için \\ Dijital Güven Altyapısı",
    "subtitle": "AB’nin EUDI profilleri üzerinde egemen bir referans mimari. Kurumlar X.509 sertifikası taşır, güven bugün imzalı listelere dayanır, bağımsız operatörler katılınca izinli bir defter eklenir.",
    "abstract_label": "Yönetici özeti",
    "toc": "İçindekiler",
    "version": "WHITEPAPER · SÜRÜM 1.0",
    "edition": "Gözden geçirilmiş baskı · ilk baskı " + FIRST_DATE,
    "footer": "Whitepaper v1.0",
    "further": "Ayrıntı",
    "abstract": [
        "Tamga Network bir dijital güven altyapısıdır. Kurum, diploma, öğrenci belgesi, kimlik belgesi ya da bilet gibi bir belgeyi doğrudan kişinin telefonuna verir. Kişi yalnızca doğrulayıcının istediği alanları paylaşır, doğrulayıcı da kurumu aramadan belgeyi saniyeler içinde denetler.",
        "Teknik katman Avrupa Birliği’nin katmanıdır ve olduğu gibi kullanılır: SD-JWT VC ve ISO 18013-5 mdoc belgeleri, OpenID4VCI ve OpenID4VP, kurumlar için X.509 sertifikaları ve ETSI modelinde imzalı güven listeleri. Tamga bunun üstüne Türk dünyası için yazılmış bir yönetişim katmanı ekler. Her listede, tanımlayıcıda ve rolde her üye devlet için bir yer vardır; Tamga operatör rolünü yalnızca geçici olarak, devletler adına ve bir devlet devralana kadar üstlenir.",
        "Güven bugün herkese açık bir çapa günlüğüyle birlikte sürümlü ve hash zincirli güven listelerine dayanır. İzinli bir Besu/QBFT defterinin kodu yazıldı ve test edildi, ama defter yalnızca imzalı listeleri yansıtır ve en az iki bağımsız operatör onu birlikte işletmeye başlayana kadar kapalı kalır. Listelere, günlüklere ya da deftere hiçbir kişisel veri yazılmaz, özeti bile yazılmaz. Servisler gerçek kriptografiyle uçtan uca çalışıyor, açık paketler npm’de deneme sürümü olarak yayında ve belge veren ile doğrulayıcı Ekim 2026’da OpenID Foundation’ın uyum test planlarını öz-test olarak çalıştırıp başarısız modül kalmadan tamamladı. Bu belge neyin çalıştığını, neyin planlandığını ve neyin hâlâ araştırma olduğunu söyler.",
    ],
    "sections": {
        "problem": ("Sorun: belge kopyası çağının sonu", [
            ("p", "Onlarca yıl kim olduğumuzu kopya teslim ederek kanıtladık. Diplomanın kopyası işverene, kimlik kartının kopyası bankaya gider ve her kopya, sahibinin bir daha hiç görmediği bir sunucuda yaşamaya başlar. Her banka, işveren ve üniversite aynı doğrulamayı yeniden kurar; belgenin gerçek olup olmadığı da kopyanın ne kadar ikna edici göründüğüne kalır."),
            ("p", "Yeni model bunu tersine çevirir. Belge kişide kalır, yalnızca gereken kanıt paylaşılır ve doğrulayıcı kaynağa sormak yerine kriptografik imzayı denetler. Bu belgenin geri kalanı Tamga’nın bu modeli Türkiye ve Türk dünyası için nasıl kurduğunu anlatır; arka plan [neden yeni bir model](/learn/paper-to-digital) sayfasında."),
        ]),
        "vision": ("Vizyon: eIDAS 2.0’dan Türk dünyasına", [
            ("p", "eIDAS 2.0 ile her AB üye devleti vatandaşına bir Avrupa Dijital Kimlik Cüzdanı sunmak zorunda. Arkasındaki mimari (ARF) ve sabitlediği profiller AB’nin çok ötesinde dijital güvenin ortak dili hâline geliyor, çünkü bu profiller üzerine kurulan cüzdanlar, belge verenler ve doğrulayıcılar birbiriyle konuşabiliyor."),
            ("p", "Türk dünyası ortak bir dil ailesini, kültürü ve uzun bir tarihi paylaşır. Bir devlette verilen diploma bir diğerinde doğrulanabilmeli, bir kurumun kimliğine sınırın öte yanında da güvenilebilmeli. Tamga bu ortak zemini aynı standartlar üzerinde kurar ve her devleti kendi kaydının egemeni bırakan bir yönetişim katmanı ekler."),
            ("p", "Tamga her biri tek başına ayakta duran üç katmanda kuruludur. Tabanda belgeler, protokoller ve güven listeleri AB standartlarına uyar; bu yüzden başka yerden gelen uyumlu bir cüzdan ya da doğrulayıcı bir Tamga kurumuyla çalışabilir. Onun üstünde Tamga Network hafif bir federasyondur: her devletin güven listesini toplar ve devletlerin birbirini tanımasını sağlar. Bugün Türkiye listesini Tamga geçici olarak yayınlıyor; bir devlet kendi listesini yayınladığında ağ onu gösterir. Ağın üstünde de kurallarına uyan cüzdanlar ve hizmetler çalışır. Ağ kendi cüzdanını işletmez. Cüzdan sağlayıcılarını güven listesinde listeler ve yayınlanmış kurallara uyan her sağlayıcı listeye girebilir. Listeye giren ilk cüzdan Tamga Wallet’tır; kendi sağlayıcı servisi olan ayrı bir üründür ve kaydı 14 Ekim 2026’dan beri listede etkindir. Tamga Wallet AB uyumludur; “EUDI Wallet” unvanı ise bir AB üye devletinin sunduğu ya da tanıdığı cüzdanlara ayrılmıştır. Ağ bir şey satmaz. Kuralları, güven listelerini, açık kodu ve Kurum Konsolu ile Tamga Verify gibi referans hizmetleri işletir; ticari hizmetleri ağın dışındaki şirketler sunar."),
        ]),
        "principles": ("İlkeler", [
            ("ul", [
                "**Önce egemenlik.** Her devlet kendi kaydının tek yazarıdır; ağ üyeliğine üçte iki oyla karar verilir; sınır ötesi tanıma her devletin tek taraflı kararıdır.",
                "**Hiçbir ortak kayıtta kişisel veri yok.** Listeler, günlükler ve defter kişisel veri taşımaz, özetini bile taşımaz.",
                "**Uyumlu ama bağımsız.** AB’nin teknik katmanı olduğu gibi kullanılır; yönetişim katmanı Türk dünyası için yazılır.",
                "**Birden çok devlet için.** Hiçbir tanımlayıcı, rol ya da veri yapısı Tamga’yı tek operatör varsaymaz. Tamga her yerde kayıtlı bir geçici vekildir.",
                "**Defter bir depolama seçimi değil, imzacı seçimidir.** Bugün imzalı listeler; bağımsız operatörler birlikte imzalayınca defter.",
                "**İstisnasız cihaz bağı.** Her belge kopyası kişinin cihazındaki bir anahtara bağlıdır; bu yüzden kopya yeniden oynatılamaz.",
                "**Devredilmek üzere tasarım.** Her geçici yetkinin ölçülebilir bir devir noktası vardır; ağın işletmesinin bir vakfa devri şimdiden yazılı ve provası yapılmış durumda.",
            ]),
        ]),
        "roles": ("Roller", [
            ("p", "AB mimarisinin her rolü Tamga’da vardır. Bir devlet henüz katılmadıysa rolü Tamga geçici ve kayıtlı olarak üstlenir: güven listesi operatörü, kayıt otoritesi ve “TR National Root CA (geçici operatör: Tamga)”. Kurumlar belge sağlayıcılarıdır. İşverenler, web siteleri ve kapılar kayıtlı doğrulayıcılardır; her birinin kuruluşu ve bir destek adresini gösteren bir erişim sertifikası vardır ve bu sertifika ETSI TS 119 411-8 profiline uyar. PID sağlayıcısının yeri bir devlet doldurana kadar boş kalır. O güne kadar kimlik belgesi, kişinin kimlik belgesini ve canlılığını doğrulayan Tamga kimlik servisinden gelir; bu belge bir devlet PID’i sayılmaz, bir onaylama belgesidir ve devletin PID’i geldiğinde onun yerini alır. Ağ cüzdan seçmez, cüzdanları listeler. Her cüzdan kendi cüzdan sağlayıcısını işletir; sağlayıcı cüzdan birimlerini kaydeder ve cüzdan ile anahtar kanıtlarını verir. Ağ hiçbirini işletmez. Bugün Türkiye listesinde tek etkin belge veren geçici kimlik servisidir; demolarda kullanılan test kurumları iptal edildi, ilk gerçek kurum hazırlanıyor. Henüz validator operatörü yok, bu yüzden defter de yok. Yan yana tablo [roller ve terimler](/learn/roles) sayfasında."),
        ]),
        "trust": ("Güven modeli: imzalı güven listeleri", [
            ("p", "İmza kimin imzaladığını kanıtlar. Güven listesi ise imzalayanın gerçek bir kurum olup olmadığını, hangi belge türlerini ne zamandan beri verebildiğini ve güncel durumunu söyler. Tamga’nın listeleri imzalı JWS dosyalarıdır; sürümlü ve hash zincirlidir, yani her sürüm bir öncekini gösterir. Hiçbir sürüm silinmez ve her biri bir sonraki güncelleme tarihini taşır. Doğrulayıcı listenin imzacısını bant dışında yayınlanmış bir kök parmak iziyle karşılaştırır. Her liste sürümü, her iptal listesi yayını ve her şema değişikliği ayrıca en az saatte bir herkese açık bir çapa günlüğüne yazılır; böylece geri sarılmış bir liste fark edilir. Ayrıntı [güven listeleri](/learn/trust-lists) sayfasında."),
            ("table", "Yayınlanan dosyalar — trust.tamga.network", "trust"),
            ("p", "Tanımlayıcılar elle atanmaz, sertifikalardan ve tür adlarından türetilir; bu yüzden devirde de defter geldiğinde de değişmez:"),
            ("table", "Tanımlayıcılar", "ids"),
            ("p", "**Federasyon.** Listelerin listesi başka bir işletmecinin yayınladığı bir listeyi de gösterebilir: bir devletin, onun yetkilendirdiği bir kurumun ya da AB’nin listesini. Her biri için adresi, Tamga’nın kendi imzalı listeler listesinde sabitlenmiş imzacısını ve hangi rollere ve belge türlerine kefil olabileceğini söyleyen kapsamını kaydeder. Liste sahibinde kalır. Bir devlet kendi listesini yayınladığında cüzdan ve doğrulayıcı için yalnızca adres ve imzacı değişir. İlk okunan dış biçim ETSI TS 119 602’dir; böylece bir Tamga doğrulayıcısı AB kimlik belgesini (PID) ve mobil ehliyeti (mDL) de tanıyabilir. Bugün listeler listesinde dış liste yoktur; her biri kayda geçen bir onayla eklenir. Bkz. [federasyon](/learn/federation)."),
        ]),
        "credentials": ("Belgeler: SD-JWT VC ve mdoc", [
            ("p", "Ana biçim SD-JWT VC’dir (IETF, `dc+sd-jwt`, ES256). Her alan bir salted hash’in arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır. Başlık kurumun X.509 zincirini taşır, `cnf` alanı kopyayı cihazdaki bir anahtara bağlar. Kimlik belgesi aynı sahip anahtarıyla ISO 18013-5 mdoc olarak da verilir; böylece yalnızca mdoc anlayan bir tarayıcı ya da yaş kapısı da onu kullanabilir. İki biçim de `age_over_15` ve `age_over_18` yaş alanlarını taşır; bu alanlar veriliş anında doğum tarihinden türetilir ve birini isteyen doğrulayıcı yalnızca evet ya da hayır alır. Yaş eşikleri kümesi kapalıdır ve yalnızca kayıtlı bir kararla değişir. Belge türleri sabit URN’lerdir. Tanımları herkese açık bir katalogda durur ve her belge kendi tanımının özetini taşır; böylece cüzdan tanımın değiştiğini anlar. Bir üye devletin kaydettiği ulusal tür kendi ad alanını kullanır (`urn:tamga:<cc>:…`), bu yüzden bir ulusal ad ağ geneli bir adla asla çakışmaz. Bkz. [belgeler](/learn/verifiable-credentials)."),
            ("code", "SD-JWT VC biçiminde bir diploma (çözülmüş, kısaltılmış)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "Ulusal kimlik numarası yalnızca kimlik belgesinde ve yalnızca seçici açıklanan bir alan olarak bulunur. Hiçbir diploma, kart ya da bilet onu taşımaz."),
        ]),
        "flows": ("Belge verme ve sunma", [
            ("ul", [
                "**Verme (OpenID4VCI).** Kurum aynı ekranda bir QR kodu ve bir PIN gösterir; PIN bağlantının içinde asla gitmez. Ya da cüzdan kurum dizininden başlar ve kimlik belgesini sunarak önce kişinin kimliğini kanıtlar. Cüzdan, her biri farklı bir cihaz anahtarına bağlı on kopya alır. Bir erişim belirteci beş dakikalık ömrü içinde birden çok belge isteğinde kullanılabilir, ama yalnızca kapsadığı belge yapılandırmaları için, toplam on kopyayla ve her zaman aynı DPoP anahtarıyla.",
                "**Yalnızca gerçek cüzdanlar.** Kurum belgeyi vermeden önce cüzdan sağlayıcısının verdiği kısa ömürlü bir cüzdan örneği kanıtı ile bir anahtar kanıtı denetler. İkisi de güven listesindeki bir sağlayıcıdan gelir, kendi iptal kaydını taşır ve anahtarın nasıl saklandığını söyler.",
                "**Sunum (OpenID4VP, DCQL).** Doğrulayıcının isteği kayıtlı sertifikasıyla imzalıdır ve kayıt sertifikasını taşır. Cüzdan ikisini de güven listesine karşı denetler, tam olarak neyin istendiğini gösterir ve kayıtlı kapsamın dışındaki her şey için uyarır. Doğrulayıcı seçenek sunuyorsa (`credential_sets`, `claim_sets`) cüzdan bunları seçenek olarak gösterir. İstenen bir alanı taşımayan belge asla gönderilmez; cüzdan isteğin neden karşılanamadığını kişiye söyler. Cevap şifrelidir ve yalnızca onaylanan alanları ile anahtarın bu telefonda olduğunun kanıtını taşır.",
                "**Tarayıcıdan.** Bir web sitesi belgeyi QR kodu yerine tarayıcının Digital Credentials API’siyle de isteyebilir. Referans doğrulayıcı bunu sunar, cüzdan çekirdeği de ISO/IEC 18013-7 Ek C’deki mdoc isteğini yanıtlar. Tamga Wallet’ta Android modülü yazıldı ama henüz cihazda denenmedi; iOS sürümü henüz yok.",
                "**Web siteleri.** Site kişiyi cüzdanla bir kez, yalnızca o siteye ait bir takma adla kaydeder. Cüzdan takma adı sitenin kayıtlı alan adından türetir; bu yüzden iki site kişiyi eşleştiremez, yenilenen sertifika takma adı değiştirmez ve yeni telefonda kimlik doğrulanınca aynı takma adlar geri gelir. Günlük giriş ardından bir passkey ile yapılır ve hiçbir alan paylaşılmaz. Bkz. [Tamga ile giriş yap](/learn/unlinkability).",
            ]),
        ]),
        "verification": ("Doğrulama: beş adım, üç sonuç", [
            ("p", "Her doğrulama aynı hattı aynı sırayla çalıştırır ve ilk hatada durur. Her adımın kalıcı bir kodu vardır; bu yüzden bir red her zaman nedenini söyler."),
            ("table", "Doğrulama hattı", "pipeline"),
            ("p", "INDETERMINATE (belirsiz) asla REJECTED (red) olarak bildirilmez. Bir listeye ulaşılamıyorsa ya da liste güncel değilse doğrulayıcı şu an denetleyemediğini söyler, çünkü “bu diploma sahte” ile “denetleyemiyorum” arasındaki fark birinin işe alınıp alınmamasına karar verebilir. Yetki veriliş tarihine göre değerlendirilir: üniversite etkinken verilmiş bir diploma üniversite askıya alındıktan sonra da geçerli kalır, yeni belge verme ise hemen durur."),
            ("p", "Ekim 2026’da kimlik servisi ve Tamga Verify, OpenID Foundation’ın uyum test planlarını sandbox üzerinde çalıştırdı: HAIP ve FAPI 2.0 ile OpenID4VCI (63 modül) ve HAIP ile OpenID4VP (14 modül). Belge veren planının son çalıştırmasında başarısız modül kalmadı; doğrulayıcı planının son turunda ne başarısız modül ne uyarı vardı. Bu çalışmadan yirmiye yakın değişiklik çıktı, her biri bir şartname maddesine dayanıyor ve dördü önceki kararları kayıtlı ADR’lerle değiştirdi. Bu, Foundation’ın kendi aracıyla yapılan bir öz-testti; sertifika ayrı bir süreçtir. İlk tam çalıştırmanın öğrettikleri açık kaynak [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) olarak yayımlandı; bütün hikâye [blogda](/blog/openid-conformance-self-test)."),
        ]),
        "revocation": ("İptal ve yaşam döngüsü", [
            ("p", "İptal IETF Token Status List ile yapılır. Her belge kopyasının bir listede rastgele bir konumda durum kaydı vardır. Kimlik servisinin listeleri kayıt başına tek bit kullanır; belge geçerli ya da iptaldir, askı yoktur. Kurum listeleri iki bit kullanır ve askıda değeri yalnızca türün şeması askıya izin veriyorsa görülür; bugün bu tür diplomadır. Kurum listeyi istek üzerine değil sabit aralıkla yayınlar; böylece zamanlama kişi hakkında hiçbir şey ele vermez ve her yayın çapalanır. Doğrulayıcılar listeleri önceden çeker; bir belgeyi denetlemek ne kuruma ne telefona çağrı yapar. Listeler 2 dakikada bir yeniden yayınlanır ve her biri 6 saat geçerlidir: durum sunucusu çalışırken bir iptal dakikalar içinde doğrulayıcılara ulaşır, kısa bir kesinti de doğrulamayı durdurmaz."),
            ("p", "Kopyalar tasarım gereği tükenir. Belge bir yenileme belirteciyle geldiyse cüzdan kopyaları kurumun ilan ettiği eşikte arka planda yeniler ve yenileme yeni bir bilgi paylaşmaz. Yenileme belirteci tek bir taşıma anahtarına değil cüzdan örneğinin kanıt anahtarına bağlıdır; OAuth kanıt profili bunu ister ve cüzdan böylece DPoP anahtarlarını değiştirse de yenileyebilir. Kimlik belgesi sunularak yenilenen belgeler ise kişinin onayını ve PIN’ini gerektirir. Bkz. [iptal](/learn/revocation)."),
        ]),
        "privacy": ("Tasarımdan gelen mahremiyet", [
            ("ul", [
                "**Doğrulayıcı başına kopya.** Her doğrulayıcı farklı bir anahtara bağlı farklı bir kopya alır; doğrulayıcılar aldıklarını karşılaştırarak kişiyi eşleştiremez. Veriliş ve bitiş zamanları saat başına yuvarlanır, bu yüzden kopyalar zaman damgasıyla da eşleştirilemez.",
                "Varsayılan olarak **seçici paylaşım**; soru asıl veri olmadan cevaplanabiliyorsa `age_over_15` ve `age_over_18` gibi evet/hayır alanları.",
                "**Kimlik kontrolü yalıtılmıştır.** Kimlik doğrulama sağlayıcısıyla yalnızca kimlik servisi konuşur. Belgeyi verdikten sonra fotoğraf tutmaz; yalnızca opak bir kayıt (kişi referansı ve belge numarasının özeti) tutar. Kurumlar kişiyi sağlayıcı üzerinden değil kimlik belgesi üzerinden eşleştirir.",
                "**Günlüklerde ve herkese açık adreslerde kişisel veri yok.** İptal listesi adresleri kurumu açığa vurmaz; günlükler ne olduğunu yazar, kimin başına geldiğini asla yazmaz.",
                "**Web siteleri** hesap anahtarı olarak siteye özel bir takma ad alır. Kimlik belgesi numarası da özeti de hiçbir zaman gönderilmez; takma adların türetildiği tohum cüzdana ayrı bir belge olarak ulaşır ve sunucuda saklanmaz.",
            ]),
            ("note", "Açıkça söylenen artık risk: bir kurum birden çok doğrulayıcıyla işbirliği yaparsa verdiği imzalar üzerinden kişiyi hâlâ eşleştirebilir. Sıfır bilgi ispatıyla sunum bu açığı kapatır; cüzdan tarafında mağaza sürümünden sonra gelir (bkz. sıfır bilgi ispatı bölümü)."),
        ]),
        "proximity": ("Yakın alan: geçiş kartları ve yaş kontrolü", [
            ("p", "Turnike ve etkinlik kapıları için Tamga bir geçiş kartı kullanır. Kişi standart bir sunumla bir kez kaydolur; ardından cüzdan 60 saniyelik imzalı bir jetonu QR kodu olarak gösterir. Jetonda kişisel veri yoktur, tekrar kullanım reddedilir ve bilet tek kullanımlık olabilir. Ekim 2026’dan beri her kapı kendini doğrulama servisine işletmecinin verdiği bir terminal anahtarıyla tanıtır; böylece QR kodun fotoğrafını çeken biri bileti sahibi kapıya varmadan harcayamaz. Kişiden kişiye kontrolde roller tersine döner: cüzdan kısa ömürlü bir istek adresi gösterir, kontrol edenin uygulaması standart bir OpenID4VP isteği başlatır. İkisi de sürümlü köprülerdir. Hedef Bluetooth ve NFC üzerinden ISO 18013-5’tir; Bluetooth yolu cüzdanda kodlandı ve cihaz testlerini bekliyor."),
        ]),
        "ledger": ("Listelerden deftere", [
            ("p", "Bir defter ancak birden çok bağımsız taraf onu işletirse bir şey katar. Bu yüzden Tamga listelerle başlar ve QBFT uzlaşılı izinli bir Hyperledger Besu ağını ancak en az iki bağımsız validator operatörü yazılı kabul verdiğinde ekler. O ağın kontratları yazıldı, derlendi ve test edildi; liste yayıncısı liste özetlerini yerel bir geliştirme zincirine şimdiden gönderebiliyor. Karar gereği zincir imzalı listelerin projeksiyonudur: yalnızca her liste sürümünün özetini (sürüm, içerik özeti, önceki özet, yayın zamanı) ve çapa günlüğünün son satırının özetini kaydeder. İçerik, kayıt, belge ya da kişisel veri tutmaz. Bir özet ancak eşik sayıda bağımsız yazıcı aynı değeri gönderince onaylı sayılır; yazıcılar bir sürüm hakkında anlaşamazsa ilk gelenin değeri kilitlenmez, çelişki kayda geçer. Zincirin cevabı doğrulama için hiçbir zaman gerekli değildir; imzalı listeyle çeliştiğinde liste geçerlidir. Üretimde bu özellik ikinci bir bağımsız operatör var olana kadar kapalı kalır."),
            ("p", "Defterdeki yönetişim ilkeleri izler. Validator’lar eşit oylu devletlerdir; yeni üyeler üçte iki oyla katılır; her devlet kendi kurumlarını tek başına kaydeder ya da askıya alır ve hangi yabancı kurumları tanıyacağına kendisi karar verir. Bir protokol yükseltmesi eşiğe ulaştıktan sonra en az yedi gün bekler; böylece katılmayan bir devlet yürürlüğe girmeden önce çekilebilir. Ulusal şema adları kendi ad alanında durur, bir kurum yalnızca kendi devletinin kök sertifikasına bağlanabilir ve defterdeki durum listesi kaydı her listeyi kendi bit sayısıyla kabul eder. Geçişten önce liste geçmişi kontratlara yeniden oynatılır ve ikisinin aynı cevapları vermesi gerekir. Bileşenler güveni tek bir arayüz üzerinden okur; bu yüzden belgeler, cüzdanlar ve doğrulama hattı değişmez. Bkz. [blockchain nedir, ne değildir](/learn/what-is-blockchain)."),
        ]),
        "research": ("Sıfır bilgi ispatı ve araştırma yönleri", [
            ("p", "**Sıfır bilgi ispatıyla sunum (karara bağlandı, kısmen yapıldı).** Cüzdan, kurumun imzaladığı ve hiç değişmeyen bir mdoc hakkında “18 yaşından büyük” ya da “15 yaşından büyük” gibi bir cümleyi açık kaynak Longfellow ZK sistemiyle kanıtlar; AB’nin yaş doğrulama çalışması da bu sistem üzerine kurulu. Doğrulayıcı yalnızca cümlenin doğru olduğunu ve belgeyi hangi kurumun verdiğini öğrenir; iki sunum birbirine bağlanamaz. Yalnızca incelenmiş ve kimliği imzalı güven listesinde yayımlanmış devreler kabul edilir. İspat durum listesi konumunu açmadığı için iptal ispatın içinde denetlenemez; bu yüzden ispat en çok 24 saat geçerli kısa ömürlü bir kopya üzerinden yapılır ve belge iptal edilince kimlik servisi bu kopyayı yenilemeyi bırakır. Doğrulayıcı tarafı canlıda. Yerel ispatçı Android için derlendi ve gerçek ispatlar masaüstü ispatçısıyla test edildi; telefonda ispat üretimi mağaza sürümünden sonra gelir, ispat yapılamadığında olağan sunum sürer. Bkz. [sıfır bilgi ispatı](/learn/zero-knowledge-proofs)."),
            ("p", "**Araştırma yönü: değer katmanı.** Doğrulanmış taraflar arasında yetkilendirme; para hareketi düzenlenmiş ödeme sistemlerinde kalır. İlk sürümün ya da pilotun parçası değildir ve herhangi bir kullanımdan önce bağımsız güvenlik incelemesinden geçecektir."),
        ]),
        "status": ("Durum ve yol haritası", [
            ("p", "**Bugün çalışan (ilk sürüm, gerçek kriptografi):** diploma ve öğrenci belgesi verme ve sunma; iptal ve kurum askısı; kimlik kontrolü ve iki yaş alanı taşıyan, mdoc olarak da verilen kimlik belgesi; kimliği doğrulanmış kapılarla kampüs ve etkinlik geçiş kartları, tek kullanımlık biletler; siteye özel takma adla web sitesine kayıt ve passkey ile giriş; doğrulayıcı tarafında sıfır bilgi ispatıyla yaş kontrolü; kurumun imza anahtarının kurumda kaldığı ve servisin imzalamak için kuruma yalnızca bir özet gönderdiği barındırılan belge verme servisi (Cloud Signature Consortium API). Dokuz açık kaynak paket npm’de 0.7.3 deneme sürümünde ve bu sürüm öz-testten çıkan doğrulayıcı düzeltmelerini taşıyor. Gerçek ağın Türkiye listesi yayında ve tek etkin belge vereni kimlik servisi; ilk gerçek kurum, bir üniversite, hazırlanıyor."),
            ("table", "Aşamalar", "phases"),
            ("p", "İlk sürümün bilinen sınırları aşağıda kayıtlıdır ve pilottan önce kapanır. Pilotun başarı ve durdurma ölçütleri önceden tanımlıdır. Listeye giren ilk cüzdan Tamga Wallet Android test derlemesinde; mağaza sürümleri ile Bluetooth ve Digital Credentials API cihaz testleri cüzdan tarafındaki sonraki adımlardır ve ağın değil cüzdanın işidir."),
            ("p", "Gerçek ağdan ayrı bir test ağı, sandbox.tamga.network, Ekim 2026’dan beri yayında: kendi test kökü ve listeleri, örnek kurumlar, sahte kişiler ve her türden örnek belgeler, hızlı denemenin yanında günlük ve aylık tavanlı isteğe bağlı gerçek kimlik doğrulama, test kurumu hesapları ve kendi terminal anahtarları olan bir deneme kapısı. Gerçek ağdaki hiçbir cüzdan ya da doğrulayıcı ona güvenmez. Cüzdan, kurum ve doğrulayıcı geliştiricilerinin hepsi orada dener; cüzdan geliştiricisi kendi cüzdan sağlayıcısını sandbox listesine kaydettirir ve cüzdanını örnek kurumlarla, kimlik servisiyle ve doğrulayıcıyla dener. OpenID öz-testi de orada çalıştı; test aracının sertifikaları yalnızca sandbox listelerine eklendi. Bkz. [sandbox rehberi](https://docs.tamga.network/tr/guides/sandbox)."),
        ]),
        "limits": ("Bilinen sınırlar", [
            ("ul", [
                "Bu aşamada güven çapası tek operatörün imzasına dayanır. Herkese açık çapa günlüğü, şeffaflık raporu ve denetimler kötüye kullanımı caydırır; imkânsız kılamaz. Bu sınırı yalnızca ikinci bir bağımsız liste yazıcısı, sonra da defter kaldırır.",
                "Durum sunucusu çalışırken bir iptal birkaç dakikada etkili olur (2 dakikalık yayın aralığı ile doğrulayıcının ön çekim aralığı).",
                "Sıfır bilgi ispatıyla sunulan belgenin iptali ispatın içinde denetlenemez. Kısa ömürlü kopya bu açıklığı 24 saatle sınırlar, ortadan kaldırmaz.",
                "Sıfır bilgi ispatıyla sunum cüzdana gelene kadar kurum eşleştirmesi riski kalır.",
                "Kimlik servisi teorik olarak bir kişinin belirli bir sitedeki takma adını hesaplayabilir. Anahtar koruması, ayrı yapılandırılan tohum ve denetim bunu sınırlar; sıfır bilgi ispatı ileride kaldırır.",
                "Bir cüzdan uygulama mağazalarında yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez. Cüzdanın mağaza sürümüyle App Attest ve Play Integrity zorunlu olur.",
                "OpenID uyum çalıştırması sandbox üzerinde, her planın tek bir çeşidiyle yapılan bir öz-testti. Sertifika ayrı bir süreçtir; cüzdan planları cihaz derlemesi gerektirdiği için çalıştırılmadı.",
                "Barındırılan belge verme servisinin uzaktan imza yolu yazıldı ve test edildi, ama gerçek ağda henüz hiçbir kurum kullanmıyor; gerçek ağ dosyada tutulan bir kurum anahtarını reddeder.",
            ]),
        ]),
        "open": ("Kurallar, açık kaynak ve ayrıntılı okuma", [
            ("p", "Ağın kuralları Tamga ARF 1.0 olarak yayınlanır: ana belge, Trust Framework, Tamga Rulebook ve ondan her belge türü için dallanan rulebook’lar (Education, Identity ve Event Ticket) [arf.tamga.network](https://arf.tamga.network/tr/) adresindedir. Ayrıca bkz. [kurallar ve rulebook’lar](/learn/rules-and-rulebooks)."),
            ("p", "Kod Apache-2.0, belgeler CC BY 4.0 lisanslıdır. `@tamga-network/*` paketleri güven listelerini, belge biçimlerini, belge vermeyi, doğrulamayı, sıfır bilgi ispatını ve cüzdan çekirdeğini kapsar. Entegrasyon kılavuzları ve spesifikasyonlar [geliştirici belgelerindedir](https://docs.tamga.network/tr/); bu belgede anılan her karar orada bir ADR olarak yayımlanmıştır. Kavramlar [Öğren](/learn) bölümünde sıfırdan anlatılır; [sözlük](https://docs.tamga.network/tr/glossary) hızlı başvuru, [manifesto](/manifesto) ise “neden” sorusunun cevabıdır."),
            ("note", "Bu yaşayan bir belgedir. Duyuruya kadar sürüm 1.0’da kalır ve kararlar olgunlaştıkça yerinde güncellenir; bu baskı 27 Ekim 2026 tarihlidir, ilk baskı 3 Ekim 2026’da yayımlandı. Kalıcı olan güven modelidir."),
        ]),
    },
}

TK = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper, 1.0 wersiýa (gaýtadan seredilen neşir, 2026-njy ýylyň 27-nji oktýabry): EUDI profillerine esaslanýan Türkiýe we türki dünýäsi üçin sanly ynam infrastrukturasy. Gol çekilen ynam sanawlary, SD-JWT VC we ISO mdoc, OpenID4VCI we OpenID4VP, bäş ädimli barlag hatary, dizaýndan gelýän gizlinlik, OpenID öz-synagy, kitaba barýan ýol we häzir nämäniň işleýändigi.",
    "masthead": "Whitepaper · v1.0 · gaýtadan seredilen " + DATE,
    "eyebrow": "Sanly Ynam Infrastrukturasy",
    "title": "Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy",
    "pdf_title": "Türkiýe we Türki Dünýäsi üçin \\ Sanly Ynam Infrastrukturasy",
    "subtitle": "ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy. Guramalar X.509 sertifikat göterýär, ynam häzir gol çekilen sanawlara daýanýar, garaşsyz operatorlar goşulanda rugsatly kitap goşulýar.",
    "abstract_label": "Gysgaça mazmun",
    "toc": "Mazmuny",
    "version": "WHITEPAPER · WERSIÝA 1.0",
    "edition": "Gaýtadan seredilen neşir · ilkinji neşir " + FIRST_DATE,
    "footer": "Whitepaper v1.0",
    "further": "Jikme-jiklik",
    "abstract": [
        "Tamga Network sanly ynam infrastrukturasydyr. Gurama diplom, talyp resminamasy, şahsyýet resminamasy ýa-da bilet ýaly resminamany gönüden-göni adamyň telefonyna berýär. Adam diňe barlaýjynyň soran meýdanlaryny paýlaşýar, barlaýjy bolsa guramaga ýüz tutman resminamany birnäçe sekuntda barlaýar.",
        "Tehniki gatlak Ýewropa Bileleşiginiň gatlagydyr we bolşy ýaly ulanylýar: SD-JWT VC we ISO 18013-5 mdoc resminamalary, OpenID4VCI we OpenID4VP, guramalar üçin X.509 sertifikatlary we ETSI modelinde gol çekilen ynam sanawlary. Tamga onuň üstüne türki dünýäsi üçin ýazylan dolandyryş gatlagyny goşýar. Her sanawda, belgide we rolda her agza döwlet üçin orun bar; Tamga operator rolyny diňe wagtlaýyn, döwletleriň adyndan we bir döwlet ony kabul edýänçä ýerine ýetirýär.",
        "Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş zynjyrly ynam sanawlaryna daýanýar. Rugsatly Besu/QBFT kitabynyň kody ýazyldy we synagdan geçdi, ýöne kitap diňe gol çekilen sanawlary şöhlelendirýär we azyndan iki garaşsyz operator ony bilelikde dolandyrmaga başlaýança ýapyk galýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat ýazylmaýar, heşi hem ýazylmaýar. Hyzmatlar hakyky kriptografiýa bilen başdan-aýak işleýär, açyk paketler npm-de synag wersiýasy hökmünde çap edildi, resminama beriji we barlaýjy bolsa 2026-njy ýylyň oktýabrynda OpenID Foundation-yň laýyklyk synag meýilnamalaryny öz-synag hökmünde geçirip, şowsuz modulsyz tamamlady. Bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.",
    ],
    "sections": {
        "problem": ("Mesele: resminama nusgasy döwrüniň soňy", [
            ("p", "Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Diplomyň nusgasy iş berijiye, şahsyýet kartynyň nusgasy banka gidýär we her nusga eýesiniň gaýdyp görmeýän bir serwerinde ýaşamaga başlaýar. Her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykymy ýa dälmi bolsa nusganyň näderejede ynandyryjy görünýändigine bagly galýar."),
            ("p", "Täze model muny tersine öwürýär. Resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlaýjy çeşmä soramagyň ýerine kriptografik goly barlaýar. Bu resminamanyň galan bölegi Tamga-nyň bu modeli Türkiýe we türki dünýäsi üçin nähili gurýandygyny düşündirýär; arka plan [näme üçin täze model](/learn/paper-to-digital) sahypasynda."),
        ]),
        "vision": ("Garaýyş: eIDAS 2.0-dan türki dünýäsine", [
            ("p", "eIDAS 2.0 bilen ÝB-niň her agza döwleti raýatyna Ýewropa Sanly Şahsyýet Gapjygyny hödürlemäge borçly. Onuň aňyrsyndaky arhitektura (ARF) we kesgitlän profilleri ÝB-den has daşarda sanly ynamyň umumy diline öwrülýär, sebäbi bu profillere esaslanýan gapjyklar, resminama berijiler we barlaýjylar biri-biri bilen gürleşip bilýär."),
            ("p", "Türki dünýäsi umumy dil maşgalasyny, medeniýeti we uzak taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli, guramanyň şahsyýetine serhediň aňyrsynda hem ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda gurýar we her döwleti öz hasabynyň özygtyýarly eýesi edip goýýan dolandyryş gatlagyny goşýar."),
            ("p", "Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Esasda resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk; şonuň üçin başga ýerden gelen laýyk gapjyk ýa-da barlaýjy Tamga guramasy bilen işläp bilýär. Onuň üstünde Tamga Network ýeňil federasiýadyr: her döwletiň ynam sanawyny jemleýär we döwletleriň biri-birini ykrar etmegine mümkinçilik berýär. Häzir Türkiýäniň sanawyny Tamga wagtlaýyn çap edýär; döwlet öz sanawyny çap edende tor şony görkezýär. Toruň üstünde onuň düzgünlerine eýerýän gapjyklar we hyzmatlar işleýär. Tor öz gapjygyny işletmeýär. Gapjyk üpjün edijilerini ynam sanawynda sanaýar we çap edilen düzgünlere eýerýän her üpjün ediji sanawa girip biler. Sanawa giren ilkinji gapjyk Tamga Wallet; ol öz üpjün ediji hyzmaty bolan aýratyn önümdir we ýazgysy 2026-njy ýylyň 14-nji oktýabryndan bäri sanawda işjeň. Tamga Wallet ÝB bilen laýyk; “EUDI Wallet” ady bolsa ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna degişli. Tor hiç zat satmaýar. Düzgünleri, ynam sanawlaryny, açyk kody we Gurama konsoly, Tamga Verify ýaly salgylanma hyzmatlaryny işledýär; täjirçilik hyzmatlaryny toruň daşyndaky kompaniýalar hödürleýär."),
        ]),
        "principles": ("Ýörelgeler", [
            ("ul", [
                "**Ilki özygtyýarlylyk.** Her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk üçden iki ses bilen kesgitlenýär; serhetaşa ykrar her döwletiň birtaraplaýyn karary.",
                "**Hiç bir umumy ýazgyda şahsy maglumat ýok.** Sanawlar, žurnallar we kitap şahsy maglumat götermeýär, heşini hem götermeýär.",
                "**Laýyk ýöne garaşsyz.** ÝB-niň tehniki gatlagy bolşy ýaly ulanylýar; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.",
                "**Köp döwlet üçin.** Hiç bir belgi, rol ýa-da maglumat gurluşy Tamga-ny ýeke-täk operator hasaplamaýar. Tamga hemişe ýazga alnan wagtlaýyn wekildir.",
                "**Kitap saklaýyş saýlawy däl, gol çekijileriň saýlawydyr.** Häzir gol çekilen sanawlar; garaşsyz operatorlar bilelikde gol çekende kitap.",
                "**Kadadan çykmasyz enjam baglanyşygy.** Resminamanyň her nusgasy adamyň enjamyndaky açara baglanandyr; şonuň üçin nusgany gaýtadan oýnap bolmaýar.",
                "**Tabşyrmak üçin dizaýn.** Her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar; toruň dolandyryşyny bir gaznaga tabşyrmak eýýäm ýazylan we synagdan geçirilen.",
            ]),
        ]),
        "roles": ("Rollar", [
            ("p", "ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy we “TR National Root CA (wagtlaýyn operator: Tamga)”. Guramalar resminama üpjün edijilerdir. Iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr; her biriniň guramany we goldaw salgysyny görkezýän giriş sertifikaty bar we bu sertifikat ETSI TS 119 411-8 profiline laýyk gelýär. PID üpjün edijisiniň orny döwlet ony doldurýança boş galýar. Şol wagta çenli şahsyýet resminamasy adamyň şahsyýet resminamasyny we janlylygyny barlaýan Tamga şahsyýet hyzmatyndan gelýär; bu resminama döwlet PID-i hasaplanmaýar, tassyklama resminamasydyr we döwletiň PID-i gelende onuň ýerini alýar. Tor gapjyk saýlamaýar, gapjyklary sanaýar. Her gapjyk öz gapjyk üpjün edijisini işledýär; üpjün ediji gapjyk birliklerini hasaba alýar we gapjyk hem açar tassyklamalaryny berýär. Tor hiç birini işletmeýär. Häzir Türkiýe sanawynda ýeke-täk işjeň resminama beriji wagtlaýyn şahsyýet hyzmaty; demolarda ulanylan synag guramalary ýatyryldy, ilkinji hakyky gurama taýýarlanýar. Heniz validator operatory ýok, şonuň üçin kitap hem ýok. Ýanaşyk tablisa [rollar we adalgalar](/learn/roles) sahypasynda."),
        ]),
        "trust": ("Ynam modeli: gol çekilen ynam sanawlary", [
            ("p", "Gol kimiň gol çekendigini subut edýär. Ynam sanawy bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip bilýändigini we häzirki ýagdaýyny aýdýar. Tamga-nyň sanawlary gol çekilen JWS faýllarydyr; wersiýaly we heş zynjyrly, ýagny her wersiýa öňküsini görkezýär. Hiç bir wersiýa pozulmaýar we her biri indiki täzelenme senesini göterýär. Barlaýjy sanawyň gol çekijisini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her sanaw wersiýasy, her ýatyrylyş sanawynyň çap edilmegi we her shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk labyr žurnalyna ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik [ynam sanawlary](/learn/trust-lists) sahypasynda."),
            ("table", "Çap edilýän faýllar — trust.tamga.network", "trust"),
            ("p", "Belgiler el bilen bellenilmeýär, sertifikatlardan we görnüş atlaryndan alynýar; şonuň üçin tabşyrylanda-da, kitap gelende-de üýtgemeýär:"),
            ("table", "Belgiler", "ids"),
            ("p", "**Federasiýa.** Sanawlaryň sanawy başga operatoryň çap eden sanawyny hem görkezip biler: döwletiň, onuň ygtyýarlandyran guramasynyň ýa-da ÝB-niň sanawyny. Her biri üçin salgysyny, Tamga-nyň öz gol çekilen sanawlar sanawynda berkidilen gol çekijisini we haýsy rollar hem resminama görnüşleri üçin kepil bolup biljekdigini aýdýan çägini ýazga alýar. Sanaw eýesinde galýar. Döwlet öz sanawyny çap edende gapjyk we barlaýjy üçin diňe salgy we gol çekiji üýtgeýär. Ilkinji okalýan daşky görnüş ETSI TS 119 602; şeýlelikde Tamga barlaýjysy ÝB şahsyýet resminamasyny (PID) we mobil sürüjilik şahadatnamasyny (mDL) hem tanap biler. Häzir sanawlar sanawynda daşky sanaw ýok; her biri ýazga alnan razylyk bilen goşulýar. Serediň: [federasiýa](/learn/federation)."),
        ]),
        "credentials": ("Resminamalar: SD-JWT VC we mdoc", [
            ("p", "Esasy görnüş SD-JWT VC (IETF, `dc+sd-jwt`, ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar. Sözbaşy guramanyň X.509 zynjyryny göterýär, `cnf` meýdany nusgany enjamdaky açara baglaýar. Şahsyýet resminamasy şol bir eýe açary bilen ISO 18013-5 mdoc görnüşinde hem berilýär; şeýlelikde diňe mdoc düşünýän brauzer ýa-da ýaş gapysy hem ony ulanyp bilýär. Iki görnüş hem `age_over_15` we `age_over_18` ýaş meýdanlaryny göterýär; bu meýdanlar berlen pursatynda doglan senesinden alynýar we birini soran barlaýjy diňe hawa ýa-da ýok alýar. Ýaş çäkleriniň toplumy ýapyk we diňe ýazga alnan karar bilen üýtgeýär. Resminama görnüşleri hemişelik URN-lerdir. Olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär; şeýlelikde gapjyk kesgitlemäniň üýtgändigini bilýär. Agza döwletiň hasaba alan milli görnüşi öz at meýdanyny ulanýar (`urn:tamga:<cc>:…`), şonuň üçin milli at tor derejesindäki at bilen asla çaknyşmaýar. Serediň: [resminamalar](/learn/verifiable-credentials)."),
            ("code", "SD-JWT VC görnüşindäki diplom (açylan, gysgaldylan)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "Milli şahsyýet belgisi diňe şahsyýet resminamasynda we diňe saýlap açylýan meýdan hökmünde bar. Hiç bir diplom, karta ýa-da bilet ony götermeýär."),
        ]),
        "flows": ("Bermek we hödürlemek", [
            ("ul", [
                "**Bermek (OpenID4VCI).** Gurama şol bir ekranda QR kody we PIN görkezýär; PIN baglanyşygyň içinde asla gitmeýär. Ýa-da gapjyk guramalaryň katalogyndan başlaýar we şahsyýet resminamasyny hödürläp ilki adamyň şahsyýetini subut edýär. Gapjyk her biri başga enjam açaryna baglanan on nusga alýar. Giriş belligi bäş minutlyk ömründe birnäçe resminama haýyşynda ulanylyp bilner, ýöne diňe öz içine alýan resminama konfigurasiýalary üçin, jemi on nusga bilen we hemişe şol bir DPoP açary bilen.",
                "**Diňe hakyky gapjyklar.** Gurama resminamany bermezden öň gapjyk üpjün edijisiniň beren gysga möhletli gapjyk nusgasy tassyklamasyny we açar tassyklamasyny barlaýar. Ikisi hem ynam sanawyndaky üpjün edijiden gelýär, öz ýatyrylyş ýazgysyny göterýär we açaryň nähili saklanýandygyny aýdýar.",
                "**Hödürlemek (OpenID4VP, DCQL).** Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir we hasaba alyş sertifikatyny göterýär. Gapjyk ikisini hem ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär. Barlaýjy saýlaw hödürleýän bolsa (`credential_sets`, `claim_sets`), gapjyk olary saýlaw hökmünde görkezýär. Soralan meýdany götermeýän resminama asla iberilmeýär; gapjyk haýyşyň näme üçin ýerine ýetirilip bilinmeýändigini adama aýdýar. Jogap şifrlenen we diňe tassyklanan meýdanlary hem açaryň şu telefondadygynyň subutnamasyny göterýär.",
                "**Brauzerden.** Web saýt resminamany QR kodunyň ýerine brauzeriň Digital Credentials API-si bilen hem sorap biler. Salgylanma barlaýjy muny hödürleýär, gapjyk ýadrosy hem ISO/IEC 18013-7 C goşundysyndaky mdoc haýyşyna jogap berýär. Tamga Wallet-de Android moduly ýazyldy, ýöne heniz enjamda synalmady; iOS wersiýasy heniz ýok.",
                "**Web saýtlar.** Saýt adamy gapjyk bilen bir gezek, diňe şol saýta degişli lakam bilen hasaba alýar. Gapjyk lakamy saýtyň hasaba alnan domen adyndan alýar; şonuň üçin iki saýt adamy deňeşdirip bilmeýär, täzelenen sertifikat lakamy üýtgetmeýär we täze telefonda şahsyýet barlananda şol lakamlar yzyna gelýär. Soňra gündelik giriş passkey bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: [Tamga bilen giriş](/learn/unlinkability).",
            ]),
        ]),
        "verification": ("Barlag: bäş ädim, üç netije", [
            ("p", "Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar."),
            ("table", "Barlag hatary", "pipeline"),
            ("p", "INDETERMINATE (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy häzir barlap bilmeýändigini aýdýar, sebäbi “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitläp biler. Ygtyýar berlen senesine görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom uniwersitet togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar."),
            ("p", "2026-njy ýylyň oktýabrynda şahsyýet hyzmaty we Tamga Verify OpenID Foundation-yň laýyklyk synag meýilnamalaryny sandbox-da geçirdi: HAIP we FAPI 2.0 bilen OpenID4VCI (63 modul) we HAIP bilen OpenID4VP (14 modul). Resminama beriji meýilnamasynyň soňky geçirilişinde şowsuz modul galmady; barlaýjy meýilnamasynyň soňky tapgyrynda şowsuz modul-da, duýduryş-da ýokdy. Bu işden ýigrimiye golaý üýtgeşme çykdy, her biri şertnamanyň bir maddasyna esaslanýar we dördüsi öňki kararlary ýazga alnan ADR-ler bilen üýtgetdi. Bu Foundation-yň öz guraly bilen edilen öz-synagdy; sertifikat aýratyn prosesdir. Ilkinji doly geçirilişiň öwredenleri açyk çeşmeli [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) hökmünde çap edildi; doly hekaýa [blogda](/blog/openid-conformance-self-test)."),
        ]),
        "revocation": ("Ýatyrylyş we durmuş aýlawy", [
            ("p", "Ýatyrylyş IETF Token Status List bilen edilýär. Her resminama nusgasynyň sanawda tötänleýin orunda ýagdaý ýazgysy bar. Şahsyýet hyzmatynyň sanawlary ýazgy başyna bir bit ulanýar; resminama güýjünde ýa-da ýatyrylan, togtadylma ýok. Gurama sanawlary iki bit ulanýar we togtadylan bahasy diňe görnüşiň shemasy togtatmaga rugsat berýän ýerinde görünýär; häzir bu görnüş diplom. Gurama sanawy haýyş boýunça däl-de, kesgitli aralyk bilen çap edýär; şeýlelikde wagt adam barada hiç zat aýan etmeýär we her çap labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak guramaga-da, telefona-da jaň etmeýär. Sanawlar her 2 minutda täzeden çap edilýär we her biri 6 sagat güýjünde: ýagdaý serweri işleýän wagty ýatyrylyş birnäçe minutda barlaýjylara ýetýär, gysga kesilme hem barlagy togtatmaýar."),
            ("p", "Nusgalar dizaýn boýunça gutarýar. Resminama täzeleme belligi bilen gelen bolsa, gapjyk nusgalary guramanyň yglan eden çäginde arka planda täzeleýär we täzeleme täze maglumat paýlaşmaýar. Täzeleme belligi ýeke-täk daşaýyş açaryna däl-de, gapjyk nusgasynyň tassyklama açaryna baglanýar; OAuth tassyklama profili muny talap edýär we gapjyk şeýlelikde DPoP açarlaryny üýtgetse-de täzeläp bilýär. Şahsyýet resminamasy hödürlenip täzelenýän resminamalar bolsa adamyň razylygyny we PIN-ini talap edýär. Serediň: [ýatyrylyş](/learn/revocation)."),
        ]),
        "privacy": ("Dizaýndan gelýän gizlinlik", [
            ("ul", [
                "**Barlaýjy başyna nusga.** Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär. Bermek we gutarmak wagtlary sagada tegeleklenýär, şonuň üçin nusgalar wagt belligi bilen hem deňeşdirilip bilinmeýär.",
                "Adaty ýagdaýda **saýlap paýlaşmak**; sorag esasy maglumatsyz jogaplanyp bilinýän bolsa `age_over_15` we `age_over_18` ýaly hawa/ýok meýdanlary.",
                "**Şahsyýet barlagy aýrylandyr.** Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär. Resminamany berenden soň surat saklamaýar; diňe açyk däl ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.",
                "**Žurnallarda we açyk salgylarda şahsy maglumat ýok.** Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.",
                "**Web saýtlar** hasap açary hökmünde saýta degişli lakam alýar. Şahsyýet resminamasynyň belgisi hem, onuň heşi hem hiç haçan iberilmeýär; lakamlaryň alynýan tohumy gapjyga aýratyn resminama hökmünde gelýär we serwerde saklanmaýar.",
            ]),
            ("note", "Açyk aýdylýan galyndy töwekgelçilik: gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, beren gollary arkaly adamy heniz tanap biler. Nol bilimli subutnama bilen hödürlemek bu boşlugy ýapýar; gapjyk tarapynda dükan wersiýasyndan soň gelýär (nol bilimli subutnama bölümine serediň)."),
        ]),
        "proximity": ("Ýakyn aralyk: geçiş kartalary we ýaş barlagy", [
            ("p", "Turniketler we çäre gapylary üçin Tamga geçiş kartasyny ulanýar. Adam standart hödürleme bilen bir gezek hasaba durýar; soňra gapjyk 60 sekuntlyk gol çekilen belgini QR kody hökmünde görkezýär. Belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we bilet bir gezeklik bolup biler. 2026-njy ýylyň oktýabryndan bäri her gapy özüni barlag hyzmatyna operatoryň beren terminal açary bilen tanadýar; şeýlelikde QR kodunyň suratyny alan adam bileti eýesi gapyya ýetmezden sarp edip bilmeýär. Adamdan adama barlagda rollar tersine öwrülýär: gapjyk gysga ömürli haýyş salgysyny görkezýär, barlaýanyň programmasy standart OpenID4VP haýyşyny başladýar. Ikisi hem wersiýaly köprülerdir. Maksat Bluetooth we NFC arkaly ISO 18013-5; Bluetooth ýoly gapjykda kodlandy we enjam synaglaryna garaşýar."),
        ]),
        "ledger": ("Sanawlardan kitaba", [
            ("p", "Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we QBFT ylalaşykly rugsatly Hyperledger Besu toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Şol toruň kontraktlary ýazyldy, kompilirlendi we synagdan geçdi; sanaw çap ediji sanaw heşlerini ýerli ösüş zynjyryna eýýäm iberip bilýär. Karar boýunça zynjyr gol çekilen sanawlaryň proýeksiýasydyr: diňe her sanaw wersiýasynyň heşini (wersiýa, mazmun heşi, öňki heş, çap wagty) we labyr žurnalynyň soňky setiriniň heşini ýazga alýar. Mazmun, ýazgy, resminama ýa-da şahsy maglumat saklamaýar. Heş diňe çäk sanda garaşsyz ýazyjy şol bir bahany iberende tassyklanan hasaplanýar; ýazyjylar bir wersiýa barada ylalaşmasa, ilki geleniň bahasy gulplanmaýar, gapma-garşylyk ýazga geçýär. Zynjyryň jogaby barlag üçin hiç haçan zerur däl; gol çekilen sanaw bilen çaknyşanda sanaw güýjünde. Önümçilikde bu aýratynlyk ikinji garaşsyz operator peýda bolýança ýapyk galýar."),
            ("p", "Kitapdaky dolandyryş ýörelgelere eýerýär. Validatorlar deň sesli döwletlerdir; täze agzalar üçden iki ses bilen goşulýar; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar we haýsy daşary ýurt guramalaryny ykrar etjekdigini özi kesgitleýär. Protokol täzelenmesi çäge ýetenden soň azyndan ýedi gün garaşýar; şeýlelikde razy bolmaýan döwlet güýje girmezden öň çekilip biler. Milli shema atlary öz at meýdanynda durýar, gurama diňe öz döwletiniň kök sertifikatyna baglanyp bilýär we kitapdaky ýagdaý sanawy hasaby her sanawy öz bit sany bilen kabul edýär. Geçişden öň sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaplary bermegi gerek. Komponentler ynamy ýeke-täk interfeýs arkaly okaýar; şonuň üçin resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: [blokçeýn näme, näme däl](/learn/what-is-blockchain)."),
        ]),
        "research": ("Nol bilimli subutnama we gözleg ugurlary", [
            ("p", "**Nol bilimli subutnama bilen hödürlemek (karar berildi, bölekleýin guruldy).** Gapjyk gurama gol çeken we üýtgemeýän mdoc barada “18 ýaşdan uly” ýa-da “15 ýaşdan uly” ýaly sözlemi açyk çeşmeli Longfellow ZK ulgamy bilen subut edýär; ÝB-niň ýaş barlagy boýunça işi hem şu ulgama esaslanýar. Barlaýjy diňe sözlemiň dogrudygyny we resminamany haýsy guramanyň berendigini bilýär; iki hödürleme biri-birine baglanyp bilinmeýär. Diňe gözden geçirilen we belgisi gol çekilen ynam sanawynda çap edilen zynjyrlar kabul edilýär. Subutnama ýagdaý sanawynyň ornuny açmaýandygy üçin ýatyrylyş subutnamanyň içinde barlanyp bilinmeýär; şonuň üçin subutnama iň köp 24 sagat güýjünde gysga ömürli nusganyň üstünden düzülýär we resminama ýatyrylanda şahsyýet hyzmaty bu nusgany täzelemegi bes edýär. Barlaýjy tarapy işleýär. Ýerli subutnama düzüji Android üçin kompilirlendi we hakyky subutnamalar iş stoly düzüjisi bilen synagdan geçdi; telefonda subutnama düzmek dükan wersiýasyndan soň gelýär, subutnama mümkin bolmasa adaty hödürleme dowam edýär. Serediň: [nol bilimli subutnama](/learn/zero-knowledge-proofs)."),
            ("p", "**Gözleg ugry: baha gatlagy.** Barlanan taraplaryň arasynda ygtyýarlandyrma; pul hereketi düzgünleşdirilen töleg ulgamlarynda galýar. Ilkinji wersiýanyň ýa-da pilotyň bölegi däl we islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer."),
        ]),
        "status": ("Ýagdaý we ýol kartasy", [
            ("p", "**Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):** diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we iki ýaş meýdanyny göterýän, mdoc görnüşinde hem berilýän şahsyýet resminamasy; tanadylan gapylar bilen kampus we çäre geçiş kartalary, bir gezeklik biletler; saýta degişli lakam bilen web saýta hasaba durmak we passkey bilen giriş; barlaýjy tarapynda nol bilimli subutnama bilen ýaş barlagy; guramanyň gol açarynyň guramada galýan we hyzmatyň gol çekmek üçin guramaga diňe heş iberýän ýerleşdirilen resminama beriş hyzmaty (Cloud Signature Consortium API). Dokuz açyk çeşmeli paket npm-de 0.7.3 synag wersiýasynda we bu wersiýa öz-synagdan çykan barlaýjy düzedişlerini göterýär. Hakyky toruň Türkiýe sanawy işleýär we ýeke-täk işjeň resminama berijisi şahsyýet hyzmaty; ilkinji hakyky gurama, uniwersitet, taýýarlanýar."),
            ("table", "Tapgyrlar", "phases"),
            ("p", "Ilkinji wersiýanyň belli çäkleri aşakda ýazga alnan we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenen. Sanawa giren ilkinji gapjyk Tamga Wallet Android synag ýygnamasynda; dükan wersiýalary hem Bluetooth we Digital Credentials API enjam synaglary gapjyk tarapyndaky indiki ädimlerdir we toruň däl-de, gapjygyň işidir."),
            ("p", "Hakyky tordan aýry synag tory, sandbox.tamga.network, 2026-njy ýylyň oktýabryndan bäri işleýär: öz synag köki we sanawlary, nusga guramalar, ýasama adamlar we her görnüşden nusga resminamalar, çalt synagyň ýanynda gündelik we aýlyk çäkli islege bagly hakyky şahsyýet barlagy, synag gurama hasaplary we öz terminal açarlary bolan synag gapysy. Hakyky tordaky hiç bir gapjyk ýa-da barlaýjy oňa ynanmaýar. Gapjyk, gurama we barlaýjy işläp düzüjileriniň hemmesi şol ýerde synaýar; gapjyk işläp düzüjisi öz gapjyk üpjün edijisini sandbox sanawyna hasaba aldyrýar we gapjygyny nusga guramalar, şahsyýet hyzmaty we barlaýjy bilen synaýar. OpenID öz-synagy hem şol ýerde geçirildi; synag guralynyň sertifikatlary diňe sandbox sanawlaryna goşuldy. Serediň: [sandbox gollanmasy](https://docs.tamga.network/guides/sandbox)."),
        ]),
        "limits": ("Belli çäkler", [
            ("ul", [
                "Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk labyr žurnaly, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär. Bu çägi diňe ikinji garaşsyz sanaw ýazyjysy, soňra-da kitap aýyrýar.",
                "Ýagdaý serweri işleýän wagty ýatyrylyş birnäçe minutda güýje girýär (2 minutlyk çap aralygy bilen barlaýjynyň öňünden alyş aralygy).",
                "Nol bilimli subutnama bilen hödürlenen resminamanyň ýatyrylyşy subutnamanyň içinde barlanyp bilinmeýär. Gysga ömürli nusga bu boşlugy 24 sagat bilen çäklendirýär, aradan aýyrmaýar.",
                "Nol bilimli subutnama bilen hödürlemek gapjyga gelýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.",
                "Şahsyýet hyzmaty nazary taýdan adamyň belli bir saýtdaky lakamyny hasaplap biler. Açar goragy, aýratyn konfigurirlenen tohum we barlag muny çäklendirýär; nol bilimli subutnama ony geljekde aýyrar.",
                "Gapjyk programma dükanlarynda çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär. Gapjygyň dükan wersiýasy bilen App Attest we Play Integrity hökmany bolýar.",
                "OpenID laýyklyk geçirilişi sandbox-da, her meýilnamanyň ýeke-täk görnüşi bilen edilen öz-synagdy. Sertifikat aýratyn prosesdir; gapjyk meýilnamalary enjam ýygnamasyny talap edýändigi üçin geçirilmedi.",
                "Ýerleşdirilen resminama beriş hyzmatynyň uzakdan gol ýoly ýazyldy we synagdan geçdi, ýöne hakyky torda heniz hiç bir gurama ulanmaýar; hakyky tor faýlda saklanýan gurama açaryny ret edýär.",
            ]),
        ]),
        "open": ("Düzgünler, açyk çeşme we giňişleýin okamak", [
            ("p", "Toruň düzgünleri Tamga ARF 1.0 görnüşinde çap edilýär: esasy resminama, Trust Framework, Tamga Rulebook we ondan her resminama görnüşi üçin şahalanýan rulebook-lar (Education, Identity we Event Ticket) [arf.tamga.network](https://arf.tamga.network) salgysynda (iňlis we türk dillerinde). Şeýle hem serediň: [düzgünler we rulebook-lar](/learn/rules-and-rulebooks)."),
            ("p", "Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamaly. `@tamga-network/*` paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy, nol bilimli subutnamany we gapjyk ýadrosyny öz içine alýar. Integrasiýa gollanmalary we spesifikasiýalar [işläp düzüjiler üçin resminamalarda](https://docs.tamga.network) (iňlis we türk dillerinde); bu resminamada agzalan her karar şol ýerde ADR hökmünde çap edilen. Düşünjeler [Öwren](/learn) bölüminde başdan düşündirilýär; [sözlük](https://docs.tamga.network/glossary) çalt salgylanma, [manifest](/manifesto) bolsa “näme üçin” soragynyň jogaby."),
            ("note", "Bu ýaşaýan resminamadyr. Yglan edilýänçä 1.0 wersiýada galýar we kararlar kämilleşdigiçe ýerinde täzelenýär; bu neşir 2026-njy ýylyň 27-nji oktýabry bilen senelenen, ilkinji neşir 2026-njy ýylyň 3-nji oktýabrynda çap edildi. Hemişelik galýan ynam modelidir."),
        ]),
    },
}

# az (Azərbaycan dili): TR/EN ile birlikte yazılır; ana dil okuması bitene kadar sitede çeviri notu bandı görünür.
AZ = {
    "meta_title": "Whitepaper",
    "meta_desc": "Tamga Network Whitepaper, versiya 1.0 (yenidən baxılmış nəşr, 27 oktyabr 2026): EUDI profilləri əsasında Türkiyə və türk dünyası üçün rəqəmsal etibar infrastrukturu. İmzalı etibar siyahıları, SD-JWT VC və ISO mdoc, OpenID4VCI və OpenID4VP, beş addımlı yoxlama xətti, dizayndan gələn məxfilik, OpenID öz-sınağı, reyestrə gedən yol və bu gün nəyin işlədiyi.",
    "masthead": "Whitepaper · v1.0 · yenidən baxılmış " + DATE,
    "eyebrow": "Rəqəmsal Etibar İnfrastrukturu",
    "title": "Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu",
    "pdf_title": "Türkiyə və Türk Dünyası üçün \\ Rəqəmsal Etibar İnfrastrukturu",
    "subtitle": "Avropa İttifaqının (Aİ) EUDI profilləri əsasında suveren istinad arxitekturası. Qurumlar X.509 sertifikatı daşıyır, etibar bu gün imzalı siyahılara əsaslanır, müstəqil operatorlar qoşulduqda icazəli reyestr əlavə olunur.",
    "abstract_label": "İcmal",
    "toc": "Mündəricat",
    "version": "WHITEPAPER · VERSİYA 1.0",
    "edition": "Yenidən baxılmış nəşr · ilk nəşr " + FIRST_DATE,
    "footer": "Whitepaper v1.0",
    "further": "Ətraflı",
    "abstract": [
        "Tamga Network rəqəmsal etibar infrastrukturudur. Qurum diplom, tələbə bileti, şəxsiyyət sənədi və ya bilet kimi sənədi birbaşa şəxsin telefonuna verir. Şəxs yalnız yoxlayan tərəfin istədiyi sahələri paylaşır, yoxlayan tərəf isə quruma müraciət etmədən sənədi saniyələr ərzində yoxlayır.",
        "Texniki qat Avropa İttifaqının qatıdır və olduğu kimi istifadə olunur: SD-JWT VC və ISO 18013-5 mdoc sənədləri, OpenID4VCI və OpenID4VP, qurumlar üçün X.509 sertifikatları və ETSI modelində imzalı etibar siyahıları. Tamga bunun üstünə türk dünyası üçün yazılmış idarəetmə qatı əlavə edir. Hər siyahıda, identifikatorda və rolda hər üzv dövlət üçün yer var; Tamga operator rolunu yalnız müvəqqəti olaraq, dövlətlərin adından və bir dövlət onu təhvil alana qədər yerinə yetirir.",
        "Etibar bu gün hamıya açıq lövbər jurnalı ilə birlikdə versiyalı və hash zəncirli etibar siyahılarına əsaslanır. İcazəli Besu/QBFT reyestrinin kodu yazılıb və test edilib, lakin reyestr yalnız imzalı siyahıları əks etdirir və ən azı iki müstəqil operator onu birlikdə idarə etməyə başlayana qədər söndürülmüş qalır. Siyahılara, jurnallara və ya reyestrə heç bir fərdi məlumat yazılmır, hətta hash-i belə yazılmır. Xidmətlər real kriptoqrafiya ilə başdan sona işləyir, açıq paketlər npm-də sınaq buraxılışı kimi dərc olunub, sənəd verən və yoxlayan tərəf isə 2026-cı ilin oktyabrında OpenID Foundation-ın uyğunluq test planlarını öz-sınaq kimi icra edib uğursuz modul qalmadan tamamladı. Bu sənəd nəyin işlədiyini, nəyin planlaşdırıldığını və nəyin hələ tədqiqat olduğunu bildirir.",
    ],
    "sections": {
        "problem": ("Problem: sənəd surəti dövrünün sonu", [
            ("p", "Onilliklər boyu kim olduğumuzu surət təqdim edərək sübut etdik. Diplomun surəti işəgötürənə, şəxsiyyət vəsiqəsinin surəti banka gedir və hər surət sahibinin bir daha heç görmədiyi bir serverdə yaşamağa başlayır. Hər bank, işəgötürən və universitet eyni yoxlamanı yenidən qurur; sənədin həqiqi olub-olmaması isə surətin nə qədər inandırıcı göründüyündən asılı qalır."),
            ("p", "Yeni model bunu tərsinə çevirir. Sənəd şəxsdə qalır, yalnız lazım olan sübut paylaşılır və yoxlayan tərəf mənbəyə müraciət etmək əvəzinə kriptoqrafik imzanı yoxlayır. Bu sənədin qalan hissəsi Tamga-nın bu modeli Türkiyə və türk dünyası üçün necə qurduğunu izah edir; arxa plan [niyə yeni model](/learn/paper-to-digital) səhifəsindədir."),
        ]),
        "vision": ("Vizyon: eIDAS 2.0-dan türk dünyasına", [
            ("p", "eIDAS 2.0 ilə Aİ-nin hər üzv dövləti öz vətəndaşlarına Avropa Rəqəmsal Şəxsiyyət Cüzdanı təqdim etməlidir. Arxasındakı arxitektura (ARF) və sabitlədiyi profillər Aİ-dən çox-çox kənarda rəqəmsal etibarın ortaq dilinə çevrilir, çünki bu profillər üzərində qurulan cüzdanlar, sənəd verənlər və yoxlayan tərəflər bir-biri ilə danışa bilir."),
            ("p", "Türk dünyası ortaq bir dil ailəsini, mədəniyyəti və uzun bir tarixi paylaşır. Bir dövlətdə verilmiş diplom digərində yoxlana bilməli, bir qurumun kimliyinə sərhədin o tayında da etibar edilə bilməlidir. Tamga bu ortaq zəmini eyni standartlar üzərində qurur və hər dövləti öz qeydiyyatının suvereni kimi saxlayan idarəetmə qatı əlavə edir."),
            ("p", "Tamga hər biri müstəqil dayana bilən üç qat üzərində qurulub. Təməldə sənədlər, protokollar və etibar siyahıları Aİ standartlarına uyğundur; buna görə başqa yerdən gələn uyğun cüzdan və ya yoxlayan tərəf Tamga qurumu ilə işləyə bilir. Onun üstündə Tamga Network yüngül federasiyadır: hər dövlətin etibar siyahısını toplayır və dövlətlərin bir-birini tanımasını təmin edir. Bu gün Türkiyənin siyahısını Tamga müvəqqəti olaraq dərc edir; bir dövlət öz siyahısını dərc etdikdə şəbəkə onu göstərir. Şəbəkənin üstündə isə onun qaydalarına uyan cüzdanlar və xidmətlər işləyir. Şəbəkə öz cüzdanını idarə etmir. Cüzdan provayderlərini etibar siyahısında sıralayır və dərc olunmuş qaydalara uyan hər provayder siyahıya daxil ola bilər. Siyahıya daxil olan ilk cüzdan Tamga Wallet-dir; öz provayder xidməti olan ayrıca məhsuldur və qeydi 2026-cı il 14 oktyabrdan bəri siyahıda aktivdir. Tamga Wallet Aİ ilə uyğundur; “EUDI Wallet” adı isə Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı cüzdanlar üçün ayrılmışdır. Şəbəkə heç nə satmır. Qaydaları, etibar siyahılarını, açıq kodu və Qurum Konsolu, Tamga Verify kimi istinad xidmətlərini idarə edir; kommersiya xidmətlərini şəbəkədən kənar şirkətlər təqdim edir."),
        ]),
        "principles": ("Prinsiplər", [
            ("ul", [
                "**Əvvəlcə suverenlik.** Hər dövlət öz qeydiyyatının yeganə müəllifidir; şəbəkəyə üzvlük üçdə iki səslə qərara alınır; sərhədlərarası tanınma hər dövlətin birtərəfli qərarıdır.",
                "**Heç bir ortaq qeyddə fərdi məlumat yoxdur.** Siyahılar, jurnallar və reyestr fərdi məlumat daşımır, hətta hash-ini belə daşımır.",
                "**Uyğun, amma müstəqil.** Aİ-nin texniki qatı olduğu kimi istifadə olunur; idarəetmə qatı türk dünyası üçün yazılır.",
                "**Bir neçə dövlət üçün.** Heç bir identifikator, rol və ya məlumat strukturu Tamga-nı yeganə operator kimi nəzərdə tutmur. Tamga hər yerdə qeydə alınmış müvəqqəti əvəzedicidir.",
                "**Reyestr saxlama seçimi deyil, imzalayanların seçimidir.** Bu gün imzalı siyahılar; müstəqil operatorlar birlikdə imzaladıqda reyestr.",
                "**İstisnasız cihaz bağlılığı.** Sənədin hər nüsxəsi şəxsin cihazındakı bir açara bağlıdır; buna görə nüsxə təkrar istifadə edilə bilməz.",
                "**Təhvil verilmək üçün dizayn.** Hər müvəqqəti səlahiyyətin ölçülə bilən təhvil nöqtəsi var; şəbəkənin idarəsinin bir fonda təhvili indidən yazılıb və məşq edilib.",
            ]),
        ]),
        "roles": ("Rollar", [
            ("p", "Aİ arxitekturasının hər rolu Tamga-da mövcuddur. Dövlət hələ qoşulmayıbsa, rolu Tamga müvəqqəti və qeydə alınmış şəkildə öz üzərinə götürür: etibar siyahısı operatoru, qeydiyyat orqanı və “TR National Root CA (müvəqqəti operator: Tamga)”. Qurumlar sənəd provayderləridir. İşəgötürənlər, vebsaytlar və giriş qapıları qeydiyyatdan keçmiş yoxlayan tərəflərdir; hər birinin təşkilatı və dəstək ünvanını göstərən giriş sertifikatı var və bu sertifikat ETSI TS 119 411-8 profilinə uyğundur. PID provayderinin yeri bir dövlət onu doldurana qədər boş qalır. O vaxta qədər şəxsiyyət sənədi şəxsin şəxsiyyət sənədini və canlılığını yoxlayan Tamga şəxsiyyət xidmətindən gəlir; bu sənəd dövlət PID-i sayılmır, attestasiya sənədidir və dövlətin PID-i gəldikdə onun yerini alır. Şəbəkə cüzdan seçmir, cüzdanları sıralayır. Hər cüzdan öz cüzdan provayderini idarə edir; provayder cüzdan vahidlərini qeydə alır və cüzdan ilə açar attestasiyalarını verir. Şəbəkə heç birini idarə etmir. Bu gün Türkiyə siyahısında yeganə aktiv sənəd verən müvəqqəti şəxsiyyət xidmətidir; demolarda istifadə olunan test qurumları ləğv edilib, ilk real qurum hazırlanır. Hələ validator operatoru yoxdur, buna görə reyestr də yoxdur. Yan-yana cədvəl [rollar və terminlər](/learn/roles) səhifəsindədir."),
        ]),
        "trust": ("Etibar modeli: imzalı etibar siyahıları", [
            ("p", "İmza kimin imzaladığını sübut edir. Etibar siyahısı isə imzalayanın real qurum olub-olmadığını, hansı sənəd növlərini nə vaxtdan verə bildiyini və cari vəziyyətini bildirir. Tamga-nın siyahıları imzalı JWS fayllarıdır; versiyalı və hash zəncirlidir, yəni hər versiya özündən əvvəlkini göstərir. Heç bir versiya silinmir və hər biri növbəti yenilənmə tarixini daşıyır. Yoxlayan tərəf siyahının imzalayanını ayrıca kanalla dərc edilmiş kök barmaq izi ilə müqayisə edir. Hər siyahı versiyası, hər ləğv siyahısı dərci və hər sxem dəyişikliyi həmçinin ən azı saatda bir dəfə hamıya açıq lövbər jurnalına yazılır; beləliklə geri çevrilmiş siyahı aşkar edilir. Ətraflı [etibar siyahıları](/learn/trust-lists) səhifəsindədir."),
            ("table", "Dərc edilən fayllar — trust.tamga.network", "trust"),
            ("p", "İdentifikatorlar əl ilə təyin edilmir, sertifikatlardan və növ adlarından törədilir; buna görə təhvil zamanı da, reyestr gəldikdə də dəyişmir:"),
            ("table", "İdentifikatorlar", "ids"),
            ("p", "**Federasiya.** Siyahıların siyahısı başqa operatorun dərc etdiyi siyahını da göstərə bilər: bir dövlətin, onun səlahiyyət verdiyi qurumun və ya Aİ-nin siyahısını. Hər biri üçün ünvanını, Tamga-nın öz imzalı siyahılar siyahısında sabitlənmiş imzalayanını və hansı rollara və sənəd növlərinə zəmanət verə biləcəyini bildirən əhatə dairəsini qeydə alır. Siyahı sahibində qalır. Bir dövlət öz siyahısını dərc etdikdə cüzdan və yoxlayan tərəf üçün yalnız ünvan və imzalayan dəyişir. Oxunan ilk xarici format ETSI TS 119 602-dir; beləliklə Tamga yoxlayıcısı Aİ şəxsiyyət sənədini (PID) və mobil sürücülük vəsiqəsini (mDL) də tanıya bilər. Bu gün siyahıların siyahısında xarici siyahı yoxdur; hər biri qeydə alınan razılıqla əlavə olunur. Bax: [federasiya](/learn/federation)."),
        ]),
        "credentials": ("Sənədlər: SD-JWT VC və mdoc", [
            ("p", "Əsas format SD-JWT VC-dir (IETF, `dc+sd-jwt`, ES256). Hər sahə salted hash arxasında gizlidir və yalnız sənəd sahibinin razılığı ilə açılır. Başlıq qurumun X.509 zəncirini daşıyır, `cnf` sahəsi nüsxəni cihazdakı açara bağlayır. Şəxsiyyət sənədi eyni sahib açarı ilə ISO 18013-5 mdoc kimi də verilir; beləliklə yalnız mdoc anlayan brauzer və ya yaş qapısı da ondan istifadə edə bilir. Hər iki format `age_over_15` və `age_over_18` yaş sahələrini daşıyır; bu sahələr verilmə anında doğum tarixindən törədilir və birini istəyən yoxlayan tərəf yalnız bəli və ya xeyr alır. Yaş hədləri toplusu qapalıdır və yalnız qeydə alınmış qərarla dəyişir. Sənəd növləri sabit URN-lərdir. Təsvirləri hamıya açıq kataloqda durur və hər sənəd öz təsvirinin hash-ini daşıyır; beləliklə cüzdan təsvirin dəyişdiyini anlayır. Üzv dövlətin qeydə aldığı milli növ öz ad sahəsindən istifadə edir (`urn:tamga:<cc>:…`), buna görə milli ad şəbəkə miqyaslı adla heç vaxt toqquşmur. Bax: [sənədlər](/learn/verifiable-credentials)."),
            ("code", "SD-JWT VC formatında diplom (açılmış, qısaldılmış)", "sdjwt"),
            ("table", "", "sdjwt_notes"),
            ("p", "Milli şəxsiyyət nömrəsi yalnız şəxsiyyət sənədində və yalnız seçmə ilə açıqlanan sahə kimi olur. Heç bir diplom, kart və ya bilet onu daşımır."),
        ]),
        "flows": ("Sənədin verilməsi və təqdim edilməsi", [
            ("ul", [
                "**Vermə (OpenID4VCI).** Qurum eyni ekranda QR kod və PIN göstərir; PIN heç vaxt keçidin içində göndərilmir. Və ya cüzdan qurumlar kataloqundan başlayır və şəxsiyyət sənədini təqdim edərək əvvəlcə şəxsin kimliyini sübut edir. Cüzdan hər biri fərqli cihaz açarına bağlı on nüsxə alır. Giriş tokeni beş dəqiqəlik ömrü ərzində bir neçə sənəd sorğusunda istifadə oluna bilər, lakin yalnız əhatə etdiyi sənəd konfiqurasiyaları üçün, cəmi on nüsxə ilə və həmişə eyni DPoP açarı ilə.",
                "**Yalnız real cüzdanlar.** Qurum sənədi verməzdən əvvəl cüzdan provayderinin verdiyi qısamüddətli cüzdan nüsxəsi attestasiyasını və açar attestasiyasını yoxlayır. Hər ikisi etibar siyahısındakı provayderdən gəlir, öz ləğv qeydini daşıyır və açarın necə saxlandığını bildirir.",
                "**Təqdimetmə (OpenID4VP, DCQL).** Yoxlayan tərəfin sorğusu onun qeydiyyat sertifikatı ilə imzalanır və qeydiyyat sertifikatını daşıyır. Cüzdan hər ikisini etibar siyahısı ilə yoxlayır, tam olaraq nəyin tələb olunduğunu göstərir və qeydiyyatdakı əhatə dairəsindən kənar hər şey barədə xəbərdarlıq edir. Yoxlayan tərəf seçimlər təklif edirsə (`credential_sets`, `claim_sets`), cüzdan onları seçim kimi göstərir. Tələb olunan sahəni daşımayan sənəd heç vaxt göndərilmir; cüzdan sorğunun niyə yerinə yetirilə bilmədiyini şəxsə bildirir. Cavab şifrələnir və yalnız təsdiqlənmiş sahələri və açarın bu telefonda olduğunun sübutunu daşıyır.",
                "**Brauzerdən.** Vebsayt sənədi QR kod əvəzinə brauzerin Digital Credentials API-si ilə də istəyə bilər. İstinad yoxlayıcısı bunu təqdim edir, cüzdan nüvəsi isə ISO/IEC 18013-7 Əlavə C-dəki mdoc sorğusuna cavab verir. Tamga Wallet-də Android modulu yazılıb, lakin hələ cihazda sınaqdan keçirilməyib; iOS versiyası hələ yoxdur.",
                "**Vebsaytlar.** Sayt şəxsi cüzdanla bir dəfə, yalnız həmin sayta aid psevdonimlə qeydiyyata alır. Cüzdan psevdonimi saytın qeydiyyatdakı domen adından törədir; buna görə iki sayt şəxsi uyğunlaşdıra bilməz, yenilənən sertifikat psevdonimi dəyişdirmir və yeni telefonda kimlik yoxlandıqda eyni psevdonimlər geri qayıdır. Gündəlik giriş bundan sonra passkey ilə olur və heç bir sahə paylaşılmır. Bax: [Tamga ilə giriş](/learn/unlinkability).",
            ]),
        ]),
        "verification": ("Yoxlama: beş addım, üç nəticə", [
            ("p", "Hər yoxlama eyni xətti eyni ardıcıllıqla icra edir və ilk xətada dayanır. Hər addımın daimi kodu var; buna görə rədd həmişə səbəbini bildirir."),
            ("table", "Yoxlama xətti", "pipeline"),
            ("p", "INDETERMINATE (qeyri-müəyyən) heç vaxt REJECTED (rədd) kimi bildirilmir. Siyahıya çatmaq mümkün olmadıqda və ya siyahı aktual olmadıqda yoxlayan tərəf hazırda yoxlaya bilmədiyini bildirir, çünki “bu diplom saxtadır” ilə “yoxlaya bilmirəm” arasındakı fərq kiminsə işə götürülüb-götürülməməsinə qərar verə bilər. Səlahiyyət verilmə tarixinə görə qiymətləndirilir: universitet aktiv olarkən verilmiş diplom universitet dayandırıldıqdan sonra da etibarlı qalır, yeni sənəd verilməsi isə dərhal dayanır."),
            ("p", "2026-cı ilin oktyabrında şəxsiyyət xidməti və Tamga Verify OpenID Foundation-ın uyğunluq test planlarını sandbox-da icra etdi: HAIP və FAPI 2.0 ilə OpenID4VCI (63 modul) və HAIP ilə OpenID4VP (14 modul). Sənəd verən planının son icrasında uğursuz modul qalmadı; yoxlayan tərəf planının son turunda nə uğursuz modul, nə də xəbərdarlıq var idi. Bu işdən iyirmiyə yaxın dəyişiklik çıxdı, hər biri spesifikasiyanın bir maddəsinə əsaslanır və dördü əvvəlki qərarları qeydə alınmış ADR-lərlə dəyişdirdi. Bu Foundation-ın öz aləti ilə aparılan öz-sınaq idi; sertifikatlaşdırma ayrıca prosesdir. İlk tam icranın öyrətdikləri açıq mənbəli [oidf-conformance-kit](https://github.com/tamga-network/oidf-conformance-kit) kimi dərc edilib; tam hekayə [bloqdadır](/blog/openid-conformance-self-test)."),
        ]),
        "revocation": ("Ləğv və həyat dövrü", [
            ("p", "Ləğv IETF Token Status List ilə həyata keçirilir. Sənədin hər nüsxəsinin siyahıda təsadüfi mövqedə status qeydi var. Şəxsiyyət xidmətinin siyahıları qeyd başına bir bit istifadə edir; sənəd etibarlıdır və ya ləğv edilib, dayandırma yoxdur. Qurum siyahıları iki bit istifadə edir və “dayandırılıb” dəyəri yalnız növün sxemi dayandırmaya icazə verdikdə görünür; bu gün bu növ diplomdur. Qurum siyahını tələb üzrə deyil, sabit intervalla dərc edir; beləliklə vaxt şəxs haqqında heç nə açıqlamır və hər dərc lövbərlənir. Yoxlayan tərəflər siyahıları əvvəlcədən yükləyir; sənədi yoxlamaq nə quruma, nə də telefona zəng edir. Siyahılar hər 2 dəqiqədən bir yenidən dərc olunur və hər biri 6 saat etibarlıdır: status serveri işləyərkən ləğv bir neçə dəqiqəyə yoxlayan tərəflərə çatır, qısa kəsinti isə yoxlamanı dayandırmır."),
            ("p", "Nüsxələr dizayna görə tükənir. Sənəd yeniləmə tokeni ilə gəlibsə, cüzdan nüsxələri qurumun elan etdiyi həddə arxa planda yeniləyir və yeniləmə yeni məlumat paylaşmır. Yeniləmə tokeni tək bir daşıma açarına deyil, cüzdan nüsxəsinin attestasiya açarına bağlıdır; OAuth attestasiya profili bunu tələb edir və cüzdan beləliklə DPoP açarlarını dəyişsə də yeniləyə bilir. Şəxsiyyət sənədi təqdim edilərək yenilənən sənədlər isə şəxsin razılığını və PIN-ini tələb edir. Bax: [ləğv](/learn/revocation)."),
        ]),
        "privacy": ("Dizayndan gələn məxfilik", [
            ("ul", [
                "**Hər yoxlayan tərəf üçün ayrı nüsxə.** Hər yoxlayan tərəf fərqli açara bağlı fərqli nüsxə alır; yoxlayan tərəflər aldıqlarını müqayisə edərək şəxsi uyğunlaşdıra bilməz. Verilmə və bitmə vaxtları saata yuvarlaqlaşdırılır, buna görə nüsxələr vaxt möhürü ilə də uyğunlaşdırıla bilməz.",
                "Defolt olaraq **seçici paylaşım**; sual əsas məlumat olmadan cavablandırıla bilirsə `age_over_15` və `age_over_18` kimi bəli/xeyr sahələri.",
                "**Şəxsiyyət yoxlaması təcrid olunub.** Şəxsiyyəti təsdiqləyən provayderlə yalnız şəxsiyyət xidməti əlaqə saxlayır. Sənədi verdikdən sonra foto saxlamır; yalnız qeyri-şəffaf qeyd (şəxs istinadı və sənəd nömrəsinin hash-i) saxlayır. Qurumlar şəxsi provayder vasitəsilə deyil, şəxsiyyət sənədi vasitəsilə uyğunlaşdırır.",
                "**Jurnallarda və hamıya açıq ünvanlarda fərdi məlumat yoxdur.** Ləğv siyahısı ünvanları qurumu açıqlamır; jurnallar nə baş verdiyini yazır, kimin başına gəldiyini heç vaxt yazmır.",
                "**Vebsaytlar** hesab açarı kimi sayta xas psevdonim alır. Nə şəxsiyyət sənədinin nömrəsi, nə də onun hash-i heç vaxt göndərilmir; psevdonimlərin törədildiyi toxum cüzdana ayrıca sənəd kimi çatır və serverdə saxlanmır.",
            ]),
            ("note", "Açıq bildirilən qalıq risk: bir qurum bir neçə yoxlayan tərəflə əməkdaşlıq edərsə, verdiyi imzalar vasitəsilə şəxsi yenə də uyğunlaşdıra bilər. Sıfır bilik sübutu ilə təqdimetmə bu boşluğu aradan qaldırır; cüzdan tərəfində mağaza versiyasından sonra gəlir (sıfır bilik sübutu bölməsinə bax)."),
        ]),
        "proximity": ("Yaxın məsafə: keçid kartları və yaş yoxlaması", [
            ("p", "Turniket və tədbir girişləri üçün Tamga keçid kartından istifadə edir. Şəxs standart təqdimetmə ilə bir dəfə qeydiyyatdan keçir; sonra cüzdan 60 saniyəlik imzalı tokeni QR kod kimi göstərir. Tokendə fərdi məlumat yoxdur, təkrar istifadə rədd edilir və bilet birdəfəlik ola bilər. 2026-cı ilin oktyabrından bəri hər qapı özünü yoxlama xidmətinə operatorun verdiyi terminal açarı ilə təqdim edir; beləliklə QR kodun şəklini çəkən şəxs bileti sahibi qapıya çatmazdan əvvəl xərcləyə bilməz. Şəxsdən şəxsə yoxlamada rollar tərsinə dönür: cüzdan qısamüddətli sorğu ünvanı göstərir, yoxlayanın tətbiqi standart OpenID4VP sorğusu başladır. Hər ikisi versiyalı körpüdür. Hədəf Bluetooth və NFC üzərindən ISO 18013-5-dir; Bluetooth yolu cüzdanda kodlaşdırılıb və cihaz testlərini gözləyir."),
        ]),
        "ledger": ("Siyahılardan reyestrə", [
            ("p", "Reyestr yalnız bir neçə müstəqil tərəf onu idarə etdikdə fayda verir. Buna görə Tamga siyahılarla başlayır və QBFT konsensuslu icazəli Hyperledger Besu şəbəkəsini yalnız ən azı iki müstəqil validator operatoru yazılı razılıq verdikdə əlavə edir. Həmin şəbəkənin müqavilələri yazılıb, kompilyasiya edilib və test olunub; siyahı naşiri siyahı hash-lərini lokal inkişaf zəncirinə artıq göndərə bilir. Qərara görə zəncir imzalı siyahıların proyeksiyasıdır: yalnız hər siyahı versiyasının hash-ini (versiya, məzmun hash-i, əvvəlki hash, dərc vaxtı) və lövbər jurnalının son sətrinin hash-ini qeydə alır. Məzmun, qeyd, sənəd və ya fərdi məlumat saxlamır. Hash yalnız hədd sayda müstəqil yazıcı eyni dəyəri göndərdikdə təsdiqlənmiş sayılır; yazıcılar bir versiya barədə razılaşmasa, ilk gələnin dəyəri kilidlənmir, ziddiyyət qeydə alınır. Zəncirin cavabı yoxlama üçün heç vaxt tələb olunmur; imzalı siyahı ilə ziddiyyət təşkil etdikdə siyahı etibarlıdır. İstehsalatda bu funksiya ikinci müstəqil operator meydana çıxana qədər söndürülmüş qalır."),
            ("p", "Reyestrdəki idarəetmə prinsipləri izləyir. Validatorlar bərabər səsli dövlətlərdir; yeni üzvlər üçdə iki səslə qoşulur; hər dövlət öz qurumlarını təkbaşına qeydiyyata alır və ya dayandırır və hansı xarici qurumları tanıyacağına özü qərar verir. Protokol yeniləməsi həddə çatdıqdan sonra ən azı yeddi gün gözləyir; beləliklə razı olmayan dövlət qüvvəyə minməzdən əvvəl çıxa bilər. Milli sxem adları öz ad sahəsində durur, qurum yalnız öz dövlətinin kök sertifikatına bağlana bilər və reyestrdəki status siyahısı qeydiyyatı hər siyahını öz bit sayı ilə qəbul edir. Keçiddən əvvəl siyahı tarixçəsi müqavilələrə yenidən oynadılır və hər ikisinin eyni cavabları verməsi lazımdır. Komponentlər etibarı tək bir interfeys vasitəsilə oxuyur; buna görə sənədlər, cüzdanlar və yoxlama xətti dəyişmir. Bax: [blockchain nədir, nə deyil](/learn/what-is-blockchain)."),
        ]),
        "research": ("Sıfır bilik sübutu və tədqiqat istiqamətləri", [
            ("p", "**Sıfır bilik sübutu ilə təqdimetmə (qərar qəbul edilib, qismən qurulub).** Cüzdan qurumun imzaladığı və heç dəyişməyən mdoc haqqında “18 yaşdan yuxarı” və ya “15 yaşdan yuxarı” kimi ifadəni açıq mənbəli Longfellow ZK sistemi ilə sübut edir; Aİ-nin yaş yoxlaması üzrə işi də bu sistem üzərində qurulub. Yoxlayan tərəf yalnız ifadənin doğru olduğunu və sənədi hansı qurumun verdiyini öyrənir; iki təqdimat bir-birinə bağlana bilməz. Yalnız nəzərdən keçirilmiş və identifikatoru imzalı etibar siyahısında dərc edilmiş sxemlər qəbul edilir. Sübut status siyahısı mövqeyini açmadığı üçün ləğv sübutun içində yoxlanıla bilməz; buna görə sübut ən çox 24 saat etibarlı qısamüddətli nüsxə üzərindən aparılır və sənəd ləğv edildikdə şəxsiyyət xidməti bu nüsxəni yeniləməyi dayandırır. Yoxlayan tərəf hissəsi işləyir. Yerli sübut generatoru Android üçün kompilyasiya edilib və real sübutlar masaüstü generatorla test edilib; telefonda sübut yaratmaq mağaza versiyasından sonra gəlir, sübut mümkün olmadıqda adi təqdimetmə davam edir. Bax: [sıfır bilik sübutu](/learn/zero-knowledge-proofs)."),
            ("p", "**Tədqiqat istiqaməti: dəyər qatı.** Təsdiqlənmiş tərəflər arasında səlahiyyətləndirmə; pul hərəkəti tənzimlənən ödəniş sistemlərində qalır. İlk versiyanın və ya pilotun hissəsi deyil və hər hansı istifadədən əvvəl müstəqil təhlükəsizlik yoxlamasından keçəcək."),
        ]),
        "status": ("Vəziyyət və yol xəritəsi", [
            ("p", "**Bu gün işləyən (ilk versiya, real kriptoqrafiya):** diplom və tələbə biletinin verilməsi və təqdim edilməsi; ləğv və qurumun dayandırılması; şəxsiyyət yoxlaması və iki yaş sahəsi daşıyan, mdoc kimi də verilən şəxsiyyət sənədi; kimliyi təsdiqlənmiş qapılarla kampus və tədbir keçid kartları, birdəfəlik biletlər; sayta xas psevdonimlə vebsaytda qeydiyyat və passkey ilə giriş; yoxlayan tərəfdə sıfır bilik sübutu ilə yaş yoxlaması; qurumun imza açarının qurumda qaldığı və xidmətin imzalamaq üçün quruma yalnız hash göndərdiyi hostinqli sənəd vermə xidməti (Cloud Signature Consortium API). Doqquz açıq mənbəli paket npm-də 0.7.3 sınaq buraxılışındadır və bu versiya öz-sınaqdan çıxan yoxlayıcı düzəlişlərini daşıyır. Real şəbəkənin Türkiyə siyahısı işləyir və yeganə aktiv sənəd verəni şəxsiyyət xidmətidir; ilk real qurum, bir universitet, hazırlanır."),
            ("table", "Mərhələlər", "phases"),
            ("p", "İlk versiyanın məlum məhdudiyyətləri aşağıda qeydə alınıb və pilotdan əvvəl aradan qaldırılır. Pilotun uğur və dayandırma meyarları əvvəlcədən müəyyən edilib. Siyahıya daxil olan ilk cüzdan Tamga Wallet Android sınaq qurulumundadır; mağaza buraxılışları ilə Bluetooth və Digital Credentials API cihaz testləri cüzdan tərəfindəki növbəti addımlardır və şəbəkənin deyil, cüzdanın işidir."),
            ("p", "Real şəbəkədən ayrı test şəbəkəsi, sandbox.tamga.network, 2026-cı ilin oktyabrından bəri işləyir: öz test kökü və siyahıları, nümunə qurumlar, saxta şəxslər və hər növdən nümunə sənədlər, sürətli sınaqla yanaşı gündəlik və aylıq limitli istəyə bağlı real şəxsiyyət yoxlaması, test qurumu hesabları və öz terminal açarları olan sınaq qapısı. Real şəbəkədəki heç bir cüzdan və ya yoxlayan tərəf ona etibar etmir. Cüzdan, qurum və yoxlayan tərəf tərtibatçılarının hamısı orada sınaqdan keçirir; cüzdan tərtibatçısı öz cüzdan provayderini sandbox siyahısında qeydə aldırır və cüzdanını nümunə qurumlar, şəxsiyyət xidməti və yoxlayıcı ilə sınayır. OpenID öz-sınağı da orada icra edildi; test alətinin sertifikatları yalnız sandbox siyahılarına əlavə olundu. Bax: [sandbox bələdçisi](https://docs.tamga.network/guides/sandbox)."),
        ]),
        "limits": ("Məlum məhdudiyyətlər", [
            ("ul", [
                "Bu mərhələdə etibar lövbəri bir operatorun imzasına əsaslanır. Hamıya açıq lövbər jurnalı, şəffaflıq hesabatı və auditlər sui-istifadənin qarşısını alır; onu qeyri-mümkün edə bilmir. Bu məhdudiyyəti yalnız ikinci müstəqil siyahı yazıcısı, sonra isə reyestr aradan qaldırır.",
                "Status serveri işləyərkən ləğv bir neçə dəqiqəyə qüvvəyə minir (2 dəqiqəlik dərc intervalı ilə yoxlayan tərəfin əvvəlcədən yükləmə intervalı).",
                "Sıfır bilik sübutu ilə təqdim edilən sənədin ləğvi sübutun içində yoxlanıla bilməz. Qısamüddətli nüsxə bu boşluğu 24 saatla məhdudlaşdırır, aradan qaldırmır.",
                "Sıfır bilik sübutu ilə təqdimetmə cüzdana gələnə qədər qurum tərəfindən uyğunlaşdırma riski qalır.",
                "Şəxsiyyət xidməti nəzəri olaraq şəxsin müəyyən saytdakı psevdonimini hesablaya bilər. Açarın qorunması, ayrıca konfiqurasiya edilən toxum və audit bunu məhdudlaşdırır; sıfır bilik sübutu isə gələcəkdə aradan qaldırır.",
                "Cüzdan tətbiq mağazalarında dərc edilənə qədər telefonun “təhlükəsiz aparat təminatındayam” bəyanatı qəbul edilmir. Cüzdanın mağaza versiyası ilə App Attest və Play Integrity məcburi olur.",
                "OpenID uyğunluq icrası sandbox-da, hər planın tək bir variantı ilə aparılan öz-sınaq idi. Sertifikatlaşdırma ayrıca prosesdir; cüzdan planları cihaz qurulumu tələb etdiyi üçün icra edilməyib.",
                "Hostinqli sənəd vermə xidmətinin uzaqdan imza yolu yazılıb və test edilib, lakin real şəbəkədə hələ heç bir qurum ondan istifadə etmir; real şəbəkə faylda saxlanan qurum açarını rədd edir.",
            ]),
        ]),
        "open": ("Qaydalar, açıq mənbə və ətraflı oxu", [
            ("p", "Şəbəkənin qaydaları Tamga ARF 1.0 kimi dərc edilir: əsas sənəd, Trust Framework, Tamga Rulebook və ondan hər sənəd növü üçün ayrılan rulebook-lar (Education, Identity və Event Ticket) [arf.tamga.network](https://arf.tamga.network) ünvanındadır. Həmçinin bax: [qaydalar və rulebook-lar](/learn/rules-and-rulebooks)."),
            ("p", "Kod Apache-2.0, sənədlər CC BY 4.0 lisenziyası ilədir. `@tamga-network/*` paketləri etibar siyahılarını, sənəd formatlarını, sənədin verilməsini, yoxlamanı, sıfır bilik sübutunu və cüzdan nüvəsini əhatə edir. İnteqrasiya bələdçiləri və spesifikasiyalar [tərtibatçı sənədlərindədir](https://docs.tamga.network); bu sənəddə istinad edilən hər qərar orada ADR kimi dərc olunub. Anlayışlar [Öyrən](/learn) bölməsində sıfırdan izah edilir; [lüğət](https://docs.tamga.network/glossary) sürətli istinad, [manifest](/manifesto) isə “niyə” sualının cavabıdır."),
            ("note", "Bu canlı sənəddir. Elana qədər versiya 1.0-da qalır və qərarlar yetişdikcə yerində yenilənir; bu nəşr 27 oktyabr 2026 tarixlidir, ilk nəşr 3 oktyabr 2026-da dərc edilib. Daimi olan etibar modelidir."),
        ]),
    },
}

LANGS = {"en": EN, "tr": TR, "tk": TK, "az": AZ}

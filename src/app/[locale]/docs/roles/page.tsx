import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import {
  BadgeCheck,
  Boxes,
  Building2,
  Database,
  Fingerprint,
  KeyRound,
  Landmark,
  ListChecks,
  ScanLine,
  Smartphone,
  UserRound,
  UserX,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DocArticle, CompareTable } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

/*
 * Kaynak: tamga-network FW-ARF-0001 §2 (rol tablosu), FW-TF-0001 §3.2 (katılım kapıları) ve §4.2 (ISO/IEC 17000 rolleri).
 * Bu sayfa karar üretmez; var olan kararları eIDAS 2.0 / EUDI terimleriyle eşleştirir.
 */

type L = Record<Locale, string>;
type Group = "trust" | "providers" | "use";

type Role = {
  group: Group;
  icon: LucideIcon;
  /** AB terimi (İngilizce, her dilde aynı) */
  eu: string;
  name: L;
  host?: string;
  today: L;
  state: L;
  does: L;
  limit: L;
  /** Boş slot: çizimde kesik çerçeve */
  empty?: boolean;
};

const ROLES: Role[] = [
  {
    group: "trust",
    icon: ListChecks,
    eu: "Trusted List Scheme Operator",
    name: { en: "Trusted lists", tr: "Güven listeleri", tk: "Ynam sanawlary" },
    host: "trust.tamga.network",
    today: {
      en: "Tamga, provisionally, on behalf of the national authority",
      tr: "Tamga, geçici olarak, ulusal otorite adına",
      tk: "Tamga, wagtlaýyn, milli ygtyýarly edaranyň adyndan",
    },
    state: {
      en: "National authority",
      tr: "Ulusal otorite",
      tk: "Milli ygtyýarly edara",
    },
    does: {
      en: "Compiles, signs and publishes the national trusted list",
      tr: "Ulusal güven listesini derler, imzalar ve yayınlar",
      tk: "Milli ynam sanawyny düzýär, gol çekýär we çap edýär",
    },
    limit: {
      en: "No personal data in the list; nothing is deleted — every version is kept",
      tr: "Listede kişisel veri yok; hiçbir şey silinmez — her sürüm saklanır",
      tk: "Sanawda şahsy maglumat ýok; hiç zat pozulmaýar — her wersiýa saklanýar",
    },
  },
  {
    group: "trust",
    icon: Landmark,
    eu: "Registrar",
    name: {
      en: "Participant register",
      tr: "Katılımcı kaydı",
      tk: "Gatnaşyjylaryň hasaby",
    },
    today: {
      en: "Tamga, as stand-in",
      tr: "Tamga, vekâleten",
      tk: "Tamga, wekil hökmünde",
    },
    state: {
      en: "State registrar",
      tr: "Devletin kayıt kurumu",
      tk: "Döwletiň hasaba alyş edarasy",
    },
    does: {
      en: "Registers institutions, verifiers and wallet providers",
      tr: "Kurumları, doğrulayıcıları ve cüzdan sağlayıcılarını kaydeder",
      tk: "Guramalary, barlaýjylary we gapjyk üpjün edijileri hasaba alýar",
    },
    limit: {
      en: "Registers, does not license — legal authority sits outside the network",
      tr: "Kaydeder, yetki vermez — yasal yetki ağın dışındadır",
      tk: "Hasaba alýar, ygtyýar bermeýär — kanuny ygtyýar toruň daşynda",
    },
  },
  {
    group: "trust",
    icon: BadgeCheck,
    eu: "Registration Certificate Provider",
    name: {
      en: "Registration certificates",
      tr: "Kayıt sertifikaları",
      tk: "Hasaba alyş sertifikatlary",
    },
    today: {
      en: "Tamga, as stand-in",
      tr: "Tamga, vekâleten",
      tk: "Tamga, wekil hökmünde",
    },
    state: { en: "State", tr: "Devlet", tk: "Döwlet" },
    does: {
      en: "Issues one certificate per use (at most 12 months), taken only from the signed list entry",
      tr: "Her kullanım için bir sertifika üretir (en çok 12 ay); içerik yalnız imzalı listedeki kayıttan",
      tk: "Her ulanyş üçin bir sertifikat berýär (iň köp 12 aý); mazmuny diňe gol çekilen sanawdaky ýazgydan",
    },
    limit: {
      en: "None for a participant without an official identifier (tax or trade register number)",
      tr: "Resmî kimlik numarası (VKN / MERSİS) girilmemiş katılımcıya üretilmez",
      tk: "Resmi belgisi (salgyt ýa-da söwda sanawy belgisi) ýok gatnaşyja berilmeýär",
    },
  },
  {
    group: "trust",
    icon: KeyRound,
    eu: "Access CA · National Root CA",
    name: {
      en: "TR National Root CA (provisional)",
      tr: "TR Ulusal Kök CA (geçici)",
      tk: "TR Milli kök CA (wagtlaýyn)",
    },
    today: {
      en: "Tamga, as provisional operator",
      tr: "Tamga, geçici işletmeci",
      tk: "Tamga, wagtlaýyn işlediji",
    },
    state: {
      en: "State root or a qualified trust service provider",
      tr: "Devletin kökü ya da nitelikli güven hizmeti sağlayıcısı",
      tk: "Döwletiň köki ýa-da kwalifisirlenen ynam hyzmaty üpjün edijisi",
    },
    does: {
      en: "Roots the X.509 certificates of institutions, including verifiers' access certificates",
      tr: "Kurumların X.509 sertifikalarının (doğrulayıcı erişim sertifikaları dahil) köküdür",
      tk: "Guramalaryň X.509 sertifikatlarynyň (barlaýjylaryň giriş sertifikatlary hem) köki",
    },
    limit: {
      en: "The root identifier stays the same at hand-over",
      tr: "Devirde kök kimliği değişmez",
      tk: "Tabşyrylanda kök belgisi üýtgemeýär",
    },
  },
  {
    group: "providers",
    icon: UserX,
    eu: "PID Provider",
    name: { en: "Empty slot", tr: "Boş slot", tk: "Boş orun" },
    today: { en: "Nobody", tr: "Kimse", tk: "Hiç kim" },
    state: { en: "State", tr: "Devlet", tk: "Döwlet" },
    does: {
      en: "Provides person identification data at the highest assurance level",
      tr: "Kişi kimlik verisini en yüksek güven seviyesinde sağlar",
      tk: "Adamyň şahsyýet maglumatyny iň ýokary ynam derejesinde berýär",
    },
    limit: {
      en: "Tamga cannot fill this slot",
      tr: "Tamga bu slotu dolduramaz",
      tk: "Tamga bu orny doldurup bilmeýär",
    },
    empty: true,
  },
  {
    group: "providers",
    icon: Fingerprint,
    eu: "(provisional) identity attestation",
    name: {
      en: "Tamga identity service",
      tr: "Tamga kimlik servisi",
      tk: "Tamga şahsyýet hyzmaty",
    },
    host: "id.tamga.network",
    today: {
      en: "Tamga, with remote identity verification",
      tr: "Tamga, uzaktan kimlik doğrulamayla",
      tk: "Tamga, uzakdan şahsyýet barlagy bilen",
    },
    state: {
      en: "Taken over by the PID Provider",
      tr: "PID sağlayıcısı devralır",
      tk: "PID üpjün ediji kabul edýär",
    },
    does: {
      en: "Issues an identity attestation after identity proofing",
      tr: "Kimlik ispatından sonra kimlik belgesi verir",
      tk: "Şahsyýet subutnamasyndan soň şahsyýet tassyknamasyny berýär",
    },
    limit: {
      en: "Keeps no images or selfies; the national ID number appears only in this credential type",
      tr: "Görüntü ve özçekim saklamaz; T.C. kimlik no yalnız bu belge türünde yer alır",
      tk: "Surat we selfi saklamaýar; milli şahsyýet belgisi diňe şu resminama görnüşinde bolýar",
    },
  },
  {
    group: "providers",
    icon: Boxes,
    eu: "(Q)EAA / PuB-EAA Provider",
    name: {
      en: "Institution (issuer)",
      tr: "Kurum (belge veren)",
      tk: "Gurama (resminama beriji)",
    },
    host: "issuer.tamga.network",
    today: {
      en: "Universities, a ticketing company (levels I1–I2)",
      tr: "Üniversiteler, bir bilet şirketi (I1–I2 seviyesi)",
      tk: "Uniwersitetler, bir bilet kompaniýasy (I1–I2 derejesi)",
    },
    state: {
      en: "Also public bodies (PUB)",
      tr: "Kamu kurumları da (PUB)",
      tk: "Döwlet edaralary hem (PUB)",
    },
    does: {
      en: "Issues the credential types it is authorised for",
      tr: "Yetkili olduğu belge türlerini verir",
      tk: "Ygtyýarly bolan resminama görnüşlerini berýär",
    },
    limit: {
      en: "Authorised per credential type; the signing key belongs to the institution",
      tr: "Yetki belge türü başınadır; imza anahtarı kurumundur",
      tk: "Ygtyýar her resminama görnüşi üçin aýratyn; gol açary guramanyňky",
    },
  },
  {
    group: "providers",
    icon: Database,
    eu: "Authentic Source",
    name: {
      en: "The institution's own system",
      tr: "Kurumun kendi sistemi",
      tk: "Guramanyň öz ulgamy",
    },
    today: {
      en: "The institution (e.g. student information system)",
      tr: "Kurum (ör. öğrenci bilgi sistemi)",
      tk: "Gurama (meselem, talyp maglumat ulgamy)",
    },
    state: {
      en: "Also public registers",
      tr: "Kamu kaynakları da",
      tk: "Döwlet çeşmeleri hem",
    },
    does: {
      en: "Holds the original of the information",
      tr: "Bilginin asıl sahibidir",
      tk: "Maglumatyň asyl eýesi",
    },
    limit: {
      en: "Tamga keeps no copy of it",
      tr: "Tamga bu bilginin kopyasını tutmaz",
      tk: "Tamga onuň nusgasyny saklamaýar",
    },
  },
  {
    group: "providers",
    icon: Smartphone,
    eu: "Wallet Provider",
    name: {
      en: "Wallet provider",
      tr: "Cüzdan sağlayıcısı",
      tk: "Gapjyk üpjün ediji",
    },
    host: "wallet.tamga.network",
    today: { en: "Tamga", tr: "Tamga", tk: "Tamga" },
    state: {
      en: "Tamga and certified third parties",
      tr: "Tamga ve sertifikalı üçüncü taraflar",
      tk: "Tamga we sertifikatlanan üçünji taraplar",
    },
    does: {
      en: "Signs the wallet unit attestation (WUA): the app is genuine and its keys sit in device hardware",
      tr: "Cüzdan birimi beyanını (WUA) imzalar: uygulama gerçektir, anahtarları cihaz donanımındadır",
      tk: "Gapjyk birliginiň tassyknamasyna (WUA) gol çekýär: programma hakyky, açarlary enjamyň apparatynda",
    },
    limit: {
      en: "In the pilot, no credentials for wallets whose keys are software-only",
      tr: "Pilotta anahtarı yalnız yazılımda duran cüzdana belge verilmez",
      tk: "Synagda açary diňe programmada duran gapjyga resminama berilmeýär",
    },
  },
  {
    group: "use",
    icon: UserRound,
    eu: "EUDI Wallet · Holder",
    name: {
      en: "Tamga Wallet and its user",
      tr: "Tamga Wallet ve kullanıcısı",
      tk: "Tamga Wallet we onuň ulanyjysy",
    },
    today: {
      en: "Students, graduates",
      tr: "Öğrenciler, mezunlar",
      tk: "Talyplar, uçurymlar",
    },
    state: { en: "Citizens", tr: "Vatandaşlar", tk: "Raýatlar" },
    does: {
      en: "Holds credentials and decides what to show to whom",
      tr: "Belgeleri taşır, neyi kime göstereceğine karar verir",
      tk: "Resminamalary saklaýar, nämäni kime görkezjekdigini karar berýär",
    },
    limit: {
      en: "Every presentation needs the PIN or biometrics",
      tr: "Her gösterim PIN ya da biyometri ister",
      tk: "Her görkezmek PIN ýa-da biometriýa talap edýär",
    },
  },
  {
    group: "use",
    icon: Building2,
    eu: "Relying Party",
    name: {
      en: "Verifying organisation",
      tr: "Doğrulayan kurum",
      tk: "Barlaýjy gurama",
    },
    today: {
      en: "Employers, career centres",
      tr: "İşverenler, kariyer merkezleri",
      tk: "Iş berijiler, karýera merkezleri",
    },
    state: { en: "Same", tr: "Aynı", tk: "Şol bir" },
    does: {
      en: "Asks for fields within its registered scope",
      tr: "Kaydındaki kapsam içinde alan ister",
      tk: "Hasaba alnan çägiň içinde meýdan soraýar",
    },
    limit: {
      en: "Cannot ask for fields outside its scope — the wallet shows the scope and warns",
      tr: "Kapsam dışı alan isteyemez — cüzdan kapsamı gösterir ve uyarır",
      tk: "Çägiň daşyndaky meýdany sorap bilmeýär — gapjyk çägi görkezýär we duýduryş berýär",
    },
  },
  {
    group: "use",
    icon: ScanLine,
    eu: "Intermediary",
    name: {
      en: "Tamga Verify (hosted verifier)",
      tr: "Tamga Verify (barındırılan doğrulayıcı)",
      tk: "Tamga Verify (ýerleşdirilen barlaýjy)",
    },
    host: "verify.tamga.network",
    today: { en: "Tamga", tr: "Tamga", tk: "Tamga" },
    state: { en: "Same", tr: "Aynı", tk: "Şol bir" },
    does: {
      en: "Requests and verifies on behalf of a verifying organisation",
      tr: "Doğrulayan kurum adına ister ve doğrular",
      tk: "Barlaýjy guramanyň adyndan soraýar we barlaýar",
    },
    limit: {
      en: "The result goes only to that organisation, and only once",
      tr: "Sonuç yalnız o kuruma ve bir kez verilir",
      tk: "Netije diňe şol gurama we diňe bir gezek berilýär",
    },
  },
];

/** AB'de karşılığı olan ama bugün Tamga'da ayrı bir katılımcısı olmayan roller + yönetişim (FW-TF-0001 §4.2). */
const LATER: { eu: string; today: L; state: L }[] = [
  {
    eu: "Supervisory body",
    today: { en: "None yet", tr: "Henüz yok", tk: "Entek ýok" },
    state: {
      en: "National supervisory body",
      tr: "Ulusal denetim kurumu",
      tk: "Milli gözegçilik edarasy",
    },
  },
  {
    eu: "Conformity assessment body (CAB)",
    today: {
      en: "Self-declaration + public conformance test vectors",
      tr: "Öz beyan + herkese açık uyum test vektörleri",
      tk: "Öz beýany + açyk laýyklyk synag wektorlary",
    },
    state: {
      en: "Independent assessment bodies",
      tr: "Bağımsız değerlendirme kuruluşları",
      tk: "Garaşsyz baha beriş edaralary",
    },
  },
  {
    eu: "Scheme owner · Accreditation body",
    today: {
      en: "Tamga, as founding stand-in",
      tr: "Tamga, kurucu vekil",
      tk: "Tamga, esaslandyryjy wekil",
    },
    state: {
      en: "Council · national accreditation body",
      tr: "Konsey · ulusal akreditasyon kurumu",
      tk: "Geňeş · milli akkreditasiýa edarasy",
    },
  },
  {
    eu: "Ledger node operator",
    today: {
      en: "None — signed lists, no ledger yet",
      tr: "Yok — imzalı listeler, henüz defter yok",
      tk: "Ýok — gol çekilen sanawlar, entek sanaw kitaby ýok",
    },
    state: {
      en: "At least two independent institutions (Hyperledger Besu)",
      tr: "En az iki bağımsız kurum (Hyperledger Besu)",
      tk: "Iň az iki garaşsyz gurama (Hyperledger Besu)",
    },
  },
];

const OBJECTS: { eu: string; tamga: L; note: L }[] = [
  {
    eu: "LoTL · Trusted List",
    tamga: {
      en: "lotl.jws · tl-tr.jws",
      tr: "lotl.jws · tl-tr.jws",
      tk: "lotl.jws · tl-tr.jws",
    },
    note: {
      en: "ETSI TS 119 612 model, at trust.tamga.network",
      tr: "ETSI TS 119 612 modeli, trust.tamga.network",
      tk: "ETSI TS 119 612 modeli, trust.tamga.network",
    },
  },
  {
    eu: "(Q)EAA",
    tamga: {
      en: "Credential types — urn:tamga:<domain>:<Type>:<major>",
      tr: "Belge türleri — urn:tamga:<alan>:<Tür>:<sürüm>",
      tk: "Resminama görnüşleri — urn:tamga:<ugur>:<Görnüş>:<wersiýa>",
    },
    note: {
      en: "Catalogue at schemas.tamga.network",
      tr: "Katalog: schemas.tamga.network",
      tk: "Katalog: schemas.tamga.network",
    },
  },
  {
    eu: "PID",
    tamga: { en: "— (empty slot)", tr: "— (boş slot)", tk: "— (boş orun)" },
    note: {
      en: "Provisional: the identity attestation from the Tamga identity service",
      tr: "Geçici: Tamga kimlik servisinin kimlik belgesi",
      tk: "Wagtlaýyn: Tamga şahsyýet hyzmatynyň şahsyýet tassyknamasy",
    },
  },
  {
    eu: "WUA",
    tamga: {
      en: "WUA (same name)",
      tr: "WUA (aynı ad)",
      tk: "WUA (şol bir at)",
    },
    note: {
      en: "Signed by the wallet provider",
      tr: "Cüzdan sağlayıcısı imzalar",
      tk: "Gapjyk üpjün ediji gol çekýär",
    },
  },
  {
    eu: "Status List",
    tamga: {
      en: "Revocation lists",
      tr: "İptal listeleri",
      tk: "Ýatyryş sanawlary",
    },
    note: {
      en: "IETF Token Status List, at status.tamga.network",
      tr: "IETF Token Status List, status.tamga.network",
      tk: "IETF Token Status List, status.tamga.network",
    },
  },
  {
    eu: "WRPAC · WRPRC",
    tamga: {
      en: "Access certificate · registration certificate",
      tr: "Erişim sertifikası · kayıt sertifikası",
      tk: "Giriş sertifikaty · hasaba alyş sertifikaty",
    },
    note: {
      en: "ETSI TS 119 475 registration certificate",
      tr: "ETSI TS 119 475 kayıt sertifikası",
      tk: "ETSI TS 119 475 hasaba alyş sertifikaty",
    },
  },
  {
    eu: "LoA Low · Substantial · High",
    tamga: {
      en: "T1 · T2 · T3 (+ T0 anonymous)",
      tr: "T1 · T2 · T3 (+ T0 anonim)",
      tk: "T1 · T2 · T3 (+ T0 näbelli)",
    },
    note: {
      en: "One-to-one; the level is a precondition of the credential type, not a field in it",
      tr: "Bire bir; seviye belge türünün ön koşuludur, belgede alan değildir",
      tk: "Birme-bir; dereje resminama görnüşiniň şerti, resminamada meýdan däl",
    },
  },
  {
    eu: "—",
    tamga: {
      en: "I1 · I2 · I3 · PUB",
      tr: "I1 · I2 · I3 · PUB",
      tk: "I1 · I2 · I3 · PUB",
    },
    note: {
      en: "Tamga's institution levels: registered · contracted · accredited · public body",
      tr: "Tamga'nın kurum seviyeleri: kayıtlı · sözleşmeli · akredite · kamu kurumu",
      tk: "Tamganyň gurama derejeleri: hasaba alnan · şertnamaly · akkreditirlenen · döwlet edarasy",
    },
  },
];

type Ui = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  groups: Record<Group, string>;
  today: string;
  state: string;
  hMap: string;
  mapNote: string;
  later: string;
  hRoles: string;
  rolesHead: string[];
  hObjects: string;
  objectsHead: string[];
  hRule: string;
  rule: string;
  hMore: string;
  arf: string;
  arfHref: string;
  glossary: string;
  eidas: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    meta: {
      title: "Roles and terms",
      description:
        "The eIDAS 2.0 / EUDI roles and their Tamga counterparts: who holds each role today, who takes it over when the state joins, what each may do and where its limits are.",
    },
    eyebrow: "EU alignment",
    title: "Roles and terms: eIDAS 2.0 ↔ Tamga",
    intro:
      "The EU's eIDAS 2.0 regulation and the EUDI wallet architecture define a fixed set of roles. Tamga fills each of them with a named service or participant. Today, in the signed-list phase, Tamga holds several roles that belong to the state provisionally, on behalf of the national authority — and hands each of them over when the state joins.",
    groups: {
      trust: "Trust and registration",
      providers: "Providers",
      use: "Use",
    },
    today: "Today",
    state: "When the state joins",
    hMap: "The map",
    mapNote:
      "Gold chip: who holds the role today. Blue chip: who holds it once the state joins. Dashed box: a slot kept empty on purpose.",
    later: "Not yet filled — and the governance roles",
    hRoles: "Every role in one table",
    rolesHead: [
      "EU term",
      "In Tamga",
      "Today",
      "When the state joins",
      "Does",
      "Limit",
    ],
    hObjects: "Objects: the same things, two vocabularies",
    objectsHead: ["EU term", "In Tamga", "Note"],
    hRule: "One rule across every role",
    rule: "Tamga holds no signing key in any service it hosts. Even where the issuing service runs at Tamga, the credential key belongs to the institution; the one pilot exception is listed openly on the known shortcuts page.",
    hMore: "Read further",
    arf: "Tamga ARF §2 — ecosystem roles (the binding text)",
    arfHref: "https://arf.tamga.network/architecture#_2-ecosystem-roles",
    glossary: "Glossary",
    eidas: "eIDAS 2.0 and the EUDI Wallet",
  },
  tr: {
    meta: {
      title: "Roller ve terimler",
      description:
        "eIDAS 2.0 / EUDI rolleri ve Tamga'daki karşılıkları: her rolü bugün kim üstleniyor, devlet katılınca kim devralıyor, her rol ne yapabilir ve sınırı nerede.",
    },
    eyebrow: "AB uyumu",
    title: "Roller ve terimler: eIDAS 2.0 ↔ Tamga",
    intro:
      "AB'nin eIDAS 2.0 tüzüğü ve EUDI cüzdan mimarisi sabit bir rol seti tanımlar. Tamga bu rollerin her birini adı konmuş bir hizmet ya da katılımcıyla doldurur. Bugün, imzalı listeler evresinde, devlete ait birkaç rolü Tamga geçici olarak, ulusal otorite adına üstlenir — ve devlet katıldığında her birini devreder.",
    groups: {
      trust: "Güven ve kayıt",
      providers: "Sağlayıcılar",
      use: "Kullanım",
    },
    today: "Bugün",
    state: "Devlet katılınca",
    hMap: "Harita",
    mapNote:
      "Altın etiket: rolü bugün kimin üstlendiği. Mavi etiket: devlet katılınca kimin üstleneceği. Kesik çerçeve: bilerek boş bırakılan slot.",
    later: "Henüz dolmayanlar — ve yönetişim rolleri",
    hRoles: "Bütün roller tek tabloda",
    rolesHead: [
      "AB terimi",
      "Tamga'da",
      "Bugün",
      "Devlet katılınca",
      "Ne yapar",
      "Sınırı",
    ],
    hObjects: "Nesneler: aynı şeyler, iki sözlük",
    objectsHead: ["AB terimi", "Tamga'da", "Not"],
    hRule: "Bütün rollerde tek kural",
    rule: "Tamga barındırdığı hiçbir hizmette imza anahtarı tutmaz. Belge verme servisi Tamga'da çalışsa bile belge anahtarı kurumundur; pilottaki tek istisna bilinen kısayollar sayfasında açıkça yazılıdır.",
    hMore: "Devamı",
    arf: "Tamga ARF §2 — ekosistem rolleri (bağlayıcı metin)",
    arfHref: "https://arf.tamga.network/tr/architecture#_2-ekosistem-rolleri",
    glossary: "Sözlük",
    eidas: "eIDAS 2.0 ve EUDI Wallet",
  },
  tk: {
    meta: {
      title: "Rollar we adalgalar",
      description:
        "eIDAS 2.0 / EUDI rollary we olaryň Tamgadaky gabat gelýänleri: her roly häzir kim ýerine ýetirýär, döwlet goşulanda kim kabul edýär, her rol näme edip bilýär we çägi nirede.",
    },
    eyebrow: "ÝB bilen laýyklyk",
    title: "Rollar we adalgalar: eIDAS 2.0 ↔ Tamga",
    intro:
      "ÝB-niň eIDAS 2.0 düzgünnamasy we EUDI gapjyk arhitekturasy kesgitli rollar toplumyny kesgitleýär. Tamga olaryň her birini ady goýlan hyzmat ýa-da gatnaşyjy bilen doldurýar. Häzir, gol çekilen sanawlar döwründe, Tamga döwlete degişli birnäçe roly wagtlaýyn, milli ygtyýarly edaranyň adyndan ýerine ýetirýär — we döwlet goşulanda olaryň her birini tabşyrýar.",
    groups: {
      trust: "Ynam we hasaba alyş",
      providers: "Üpjün edijiler",
      use: "Ulanyş",
    },
    today: "Häzir",
    state: "Döwlet goşulanda",
    hMap: "Karta",
    mapNote:
      "Altyn bellik: roly häzir kim ýerine ýetirýär. Gök bellik: döwlet goşulanda kim ýerine ýetirer. Kesik çarçuwa: bilkastlaýyn boş goýlan orun.",
    later: "Entek doldurylmadyklar — we dolandyryş rollary",
    hRoles: "Ähli rollar bir tablisada",
    rolesHead: [
      "ÝB adalgasy",
      "Tamgada",
      "Häzir",
      "Döwlet goşulanda",
      "Näme edýär",
      "Çägi",
    ],
    hObjects: "Obýektler: şol bir zatlar, iki sözlük",
    objectsHead: ["ÝB adalgasy", "Tamgada", "Bellik"],
    hRule: "Ähli rollarda bir düzgün",
    rule: "Tamga ýerleşdirýän hiç bir hyzmatynda gol açaryny saklamaýar. Resminama beriş hyzmaty Tamgada işlese-de, resminama açary guramanyňky; synagdaky ýeke-täk kadadan çykma belli gysga ýollar sahypasynda açyk ýazylan.",
    hMore: "Dowamy",
    arf: "Tamga ARF §2 — ekoulgam rollary (hökmany tekst)",
    arfHref: "https://arf.tamga.network/architecture#_2-ecosystem-roles",
    glossary: "Sözlük",
    eidas: "eIDAS 2.0 we EUDI Wallet",
  },
};

const loc = (l: string): Locale => (l === "tr" || l === "tk" ? l : "en");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const u = UI[loc(locale)];
  return pageMeta(locale, "/docs/roles", {
    title: u.meta.title,
    description: u.meta.description,
  });
}

function Chip({
  tone,
  label,
  value,
}: {
  tone: "gold" | "accent";
  label: string;
  value: string;
}) {
  const cls =
    tone === "gold"
      ? "border-gold-bright/50 bg-gold-bright/10 text-foreground"
      : "border-accent/50 bg-accent/10 text-foreground";
  return (
    <span
      className={`inline-flex max-w-full flex-col rounded-md border px-2 py-1 text-xs leading-snug ${cls}`}
    >
      <span className="mono-label text-[0.62rem] text-foreground-subtle">
        {label}
      </span>
      <span>{value}</span>
    </span>
  );
}

function RoleBox({ r, l, u }: { r: Role; l: Locale; u: Ui }) {
  const Icon = r.icon;
  return (
    <li
      className={`flex flex-col gap-2 rounded-lg p-3 ${
        r.empty
          ? "border border-dashed border-border-strong bg-transparent"
          : "border border-border bg-background-elevated"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <Icon
          size={18}
          aria-hidden
          className={`mt-0.5 shrink-0 ${r.empty ? "text-foreground-subtle" : "text-primary"}`}
        />
        <div className="min-w-0">
          <p className="mono-label text-[0.65rem] text-foreground-subtle">
            {r.eu}
          </p>
          <p className="font-medium leading-snug text-foreground">
            {r.name[l]}
          </p>
          {r.host && (
            <p className="break-all font-mono text-xs text-foreground-muted">
              {r.host}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Chip tone="gold" label={u.today} value={r.today[l]} />
        <Chip tone="accent" label={u.state} value={r.state[l]} />
      </div>
    </li>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = loc(locale);
  const u = UI[l];
  const groups: Group[] = ["trust", "providers", "use"];

  return (
    <DocArticle
      href="/docs/roles"
      eyebrow={u.eyebrow}
      title={u.title}
      intro={u.intro}
    >
      <h2>{u.hMap}</h2>
      <p>{u.mapNote}</p>
      <div className="not-prose my-6 grid gap-4 lg:grid-cols-3">
        {groups.map((g) => (
          <section
            key={g}
            className="rounded-xl border border-border bg-surface/50 p-3"
          >
            <h3 className="mono-label mb-3 px-1 text-foreground">
              {u.groups[g]}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {ROLES.filter((r) => r.group === g).map((r) => (
                <RoleBox key={r.eu} r={r} l={l} u={u} />
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="not-prose my-6 rounded-xl border border-dashed border-border-strong p-3">
        <h3 className="mono-label mb-3 px-1 text-foreground">{u.later}</h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {LATER.map((x) => (
            <li
              key={x.eu}
              className="flex flex-col gap-2 rounded-lg bg-surface/50 p-3"
            >
              <p className="mono-label text-[0.65rem] text-foreground-subtle">
                {x.eu}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Chip tone="gold" label={u.today} value={x.today[l]} />
                <Chip tone="accent" label={u.state} value={x.state[l]} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h2>{u.hRoles}</h2>
      <CompareTable
        head={u.rolesHead}
        rows={ROLES.map((r) => [
          r.eu,
          <>
            {r.name[l]}
            {r.host && (
              <span className="block break-all font-mono text-xs">
                {r.host}
              </span>
            )}
          </>,
          r.today[l],
          r.state[l],
          r.does[l],
          r.limit[l],
        ])}
      />

      <h2>{u.hObjects}</h2>
      <CompareTable
        head={u.objectsHead}
        rows={OBJECTS.map((o) => [o.eu, o.tamga[l], o.note[l]])}
      />

      <h2>{u.hRule}</h2>
      <p>
        {u.rule} <Link href="/shortcuts">→</Link>
      </p>

      <h2>{u.hMore}</h2>
      <ul>
        <li>
          <a href={u.arfHref} target="_blank" rel="noopener noreferrer">
            {u.arf}
          </a>
        </li>
        <li>
          <Link href="/docs/eidas-eudi">{u.eidas}</Link>
        </li>
        <li>
          <Link href="/docs/glossary">{u.glossary}</Link>
        </li>
      </ul>
    </DocArticle>
  );
}

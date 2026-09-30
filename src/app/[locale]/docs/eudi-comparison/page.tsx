import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DocArticle, Callout, CompareTable, FitPill, type Fit } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

/*
 * Kaynak: tamga-network docs/framework/0001-tamga-arf.md (FW-ARF-0001) §0 katmanlar, §2 roller, §9 standart uyum haritası,
 * §11 bilinen sınırlar; ADR-0009 (Faz B), ADR-0011, ADR-0012, ADR-0013; sapma kütüğü docs/delivery/09 §6 (S-9, S-14).
 */

type L = Record<Locale, string>;
type Row = { c: L; eu: L; tamga: L; fit: Fit };

const FIT_LABEL: Record<Fit, L> = {
  same: { en: "same", tr: "aynı", tk: "şol bir" },
  bridge: { en: "bridge", tr: "köprü", tk: "köpri" },
  planned: { en: "planned", tr: "planlı", tk: "meýilleşdirilen" },
  differs: { en: "by design", tr: "bilinçli fark", tk: "bilkastlaýyn tapawut" },
};

const LAYERS: { eu: L; tamga: L; layer: L }[] = [
  { layer: { en: "Law and governance", tr: "Hukuk ve yönetişim", tk: "Hukuk we dolandyryş" }, eu: { en: "eIDAS 2.0 + implementing acts", tr: "eIDAS 2.0 + uygulama tüzükleri", tk: "eIDAS 2.0 + ýerine ýetiriş namalary" }, tamga: { en: "Tamga Trust Framework", tr: "Tamga Güven Çerçevesi", tk: "Tamga Ynam Çarçuwasy" } },
  { layer: { en: "Architecture and roles", tr: "Mimari ve roller", tk: "Arhitektura we rollar" }, eu: { en: "ARF", tr: "ARF", tk: "ARF" }, tamga: { en: "Tamga ARF", tr: "Tamga ARF", tk: "Tamga ARF" } },
  { layer: { en: "Participant rules", tr: "Katılımcı kuralları", tk: "Gatnaşyjy düzgünleri" }, eu: { en: "ARF high-level requirements", tr: "ARF üst düzey gereksinimler", tk: "ARF ýokary derejeli talaplar" }, tamga: { en: "Tamga Rulebook", tr: "Tamga Rulebook", tk: "Tamga Rulebook" } },
  { layer: { en: "Document-type rules", tr: "Belge tipi kuralları", tk: "Resminama görnüşi düzgünleri" }, eu: { en: "Attestation rulebooks", tr: "Attestation rulebook’ları", tk: "Attestation rulebook-lar" }, tamga: { en: "Education rulebook, more to follow", tr: "Eğitim rulebook’u, devamı gelecek", tk: "Bilim rulebook-y, dowamy bar" } },
  { layer: { en: "Technical standards", tr: "Teknik standartlar", tk: "Tehniki standartlar" }, eu: { en: "ETSI · IETF · OpenID · ISO", tr: "ETSI · IETF · OpenID · ISO", tk: "ETSI · IETF · OpenID · ISO" }, tamga: { en: "the same, with Tamga profiles", tr: "aynıları, Tamga profilleriyle", tk: "şol birleri, Tamga profilleri bilen" } },
];

const ROLES: { role: string; today: L; later: L }[] = [
  { role: "Trusted List Operator", today: { en: "Tamga — provisional, on behalf of the national authority", tr: "Tamga — geçici, ulusal otorite adına", tk: "Tamga — wagtlaýyn, milli edaranyň adyndan" }, later: { en: "the national authority", tr: "ulusal otorite", tk: "milli edara" } },
  { role: "Registrar", today: { en: "Tamga (on behalf)", tr: "Tamga (vekâleten)", tk: "Tamga (wekilçilikde)" }, later: { en: "the state registrar", tr: "devletin kayıt otoritesi", tk: "döwletiň hasaba alyş edarasy" } },
  { role: "National Root CA", today: { en: "“TR National Root CA (provisional operator: Tamga)” — its identifier does not change on handover", tr: "“TR National Root CA (geçici operatör: Tamga)” — devirde kimliği değişmez", tk: "“TR National Root CA (wagtlaýyn operator: Tamga)” — tabşyrylanda belgisi üýtgemeýär" }, later: { en: "the state’s own root", tr: "devletin kendi kökü", tk: "döwletiň öz köki" } },
  { role: "PID Provider", today: { en: "empty slot; an identity credential from Tamga’s identity service (document + liveness check) instead", tr: "boş yer; yerine Tamga kimlik servisinden kimlik belgesi (belge + canlılık kontrolü)", tk: "boş orun; ýerine Tamga şahsyýet hyzmatyndan şahsyýet resminamasy (resminama + janlylyk barlagy)" }, later: { en: "the state", tr: "devlet", tk: "döwlet" } },
  { role: "Attestation Provider", today: { en: "universities, ticket sellers", tr: "üniversiteler, bilet satıcıları", tk: "uniwersitetler, bilet satyjylary" }, later: { en: "+ public bodies", tr: "+ kamu kurumları", tk: "+ döwlet edaralary" } },
  { role: "Wallet Provider", today: { en: "Tamga (wallet attestation)", tr: "Tamga (cüzdan onayı)", tk: "Tamga (gapjyk tassyklamasy)" }, later: { en: "+ certified third parties", tr: "+ sertifikalı üçüncü taraflar", tk: "+ sertifikatlaşdyrylan üçünji taraplar" } },
  { role: "Relying Party", today: { en: "employers, websites, gates — registered with a scope", tr: "işverenler, web siteleri, kapılar — kapsamıyla kayıtlı", tk: "iş berijiler, web saýtlar, gapylar — çägi bilen hasaba alnan" }, later: { en: "the same", tr: "aynı", tk: "şol bir" } },
  { role: "Validator Operator", today: { en: "none — no ledger in this phase", tr: "yok — bu aşamada zincir yok", tk: "ýok — bu tapgyrda zynjyr ýok" }, later: { en: "≥ 2 independent operators → ledger", tr: "≥ 2 bağımsız operatör → zincir", tk: "≥ 2 garaşsyz operator → zynjyr" } },
];

const STANDARDS: Row[] = [
  { c: { en: "Trust lists", tr: "Güven listeleri", tk: "Ynam sanawlary" }, eu: { en: "ETSI TS 119 612", tr: "ETSI TS 119 612", tk: "ETSI TS 119 612" }, tamga: { en: "same model, signed JSON (JWS); ETSI XML projection planned", tr: "aynı model, imzalı JSON (JWS); ETSI XML projeksiyonu planlı", tk: "şol bir model, gol çekilen JSON (JWS); ETSI XML proýeksiýasy meýilleşdirilen" }, fit: "bridge" },
  { c: { en: "Institution identity", tr: "Kurum kimliği", tk: "Gurama şahsyýeti" }, eu: { en: "X.509", tr: "X.509", tk: "X.509" }, tamga: { en: "X.509, national root", tr: "X.509, ulusal kök", tk: "X.509, milli kök" }, fit: "same" },
  { c: { en: "Credential format", tr: "Belge biçimi", tk: "Resminama görnüşi" }, eu: { en: "SD-JWT VC", tr: "SD-JWT VC", tk: "SD-JWT VC" }, tamga: { en: "SD-JWT VC (dc+sd-jwt), ES256", tr: "SD-JWT VC (dc+sd-jwt), ES256", tk: "SD-JWT VC (dc+sd-jwt), ES256" }, fit: "same" },
  { c: { en: "Mobile document", tr: "Mobil belge", tk: "Mobil resminama" }, eu: { en: "ISO/IEC 18013-5 mdoc", tr: "ISO/IEC 18013-5 mdoc", tk: "ISO/IEC 18013-5 mdoc" }, tamga: { en: "identity credential also issued as mdoc", tr: "kimlik belgesi mdoc olarak da verilir", tk: "şahsyýet resminamasy mdoc görnüşinde hem berilýär" }, fit: "same" },
  { c: { en: "Issuance", tr: "Belge verme", tk: "Resminama bermek" }, eu: { en: "OpenID4VCI 1.0", tr: "OpenID4VCI 1.0", tk: "OpenID4VCI 1.0" }, tamga: { en: "OpenID4VCI: pre-authorized code + PIN, or wallet-initiated", tr: "OpenID4VCI: ön yetkili kod + PIN ya da cüzdan başlatmalı", tk: "OpenID4VCI: öňünden ygtyýarly kod + PIN ýa-da gapjyk başlatýan" }, fit: "same" },
  { c: { en: "Presentation", tr: "Sunum", tk: "Hödürleme" }, eu: { en: "OpenID4VP 1.0, DCQL", tr: "OpenID4VP 1.0, DCQL", tk: "OpenID4VP 1.0, DCQL" }, tamga: { en: "OpenID4VP, DCQL, signed request, encrypted answer", tr: "OpenID4VP, DCQL, imzalı istek, şifreli cevap", tk: "OpenID4VP, DCQL, gol çekilen haýyş, şifrlenen jogap" }, fit: "same" },
  { c: { en: "Revocation", tr: "İptal", tk: "Ýatyrylyş" }, eu: { en: "IETF Token Status List", tr: "IETF Token Status List", tk: "IETF Token Status List" }, tamga: { en: "same, published at a fixed interval", tr: "aynı, sabit aralıkla yayınlanır", tk: "şol bir, kesgitli aralykda çap edilýär" }, fit: "same" },
  { c: { en: "Identity proofing", tr: "Kimlik ispatı", tk: "Şahsyýet subutnamasy" }, eu: { en: "ETSI TS 119 461", tr: "ETSI TS 119 461", tk: "ETSI TS 119 461" }, tamga: { en: "document + liveness check, mapped to assurance levels", tr: "belge + canlılık kontrolü, güvence seviyelerine eşlenir", tk: "resminama + janlylyk barlagy, kepillik derejelerine gabat getirilýär" }, fit: "same" },
  { c: { en: "Wallet attestation", tr: "Cüzdan onayı", tk: "Gapjyk tassyklamasy" }, eu: { en: "Wallet Unit Attestation", tr: "Wallet Unit Attestation", tk: "Wallet Unit Attestation" }, tamga: { en: "WUA required by issuers; until Tamga Wallet is on the App Store and Google Play, the phone’s own claim of secure hardware is not accepted (every wallet counts as software-level); with the store release App Attest / Play Integrity become mandatory", tr: "WUA olmadan belge verilmez; Tamga Wallet App Store ve Google Play’de yayınlanana kadar telefonun “güvenli donanımdayım” beyanı kabul edilmez (her cüzdan yazılım seviyesinde sayılır); mağaza sürümüyle App Attest / Play Integrity zorunlu olur", tk: "WUA-syz resminama berilmeýär; Tamga Wallet App Store we Google Play-de çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär (her gapjyk programma derejesinde hasaplanýar); dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar" }, fit: "bridge" },
  { c: { en: "Key storage", tr: "Anahtar saklama", tk: "Açar saklamak" }, eu: { en: "secure element (WSCD)", tr: "güvenli bölge (WSCD)", tk: "howpsuz bölek (WSCD)" }, tamga: { en: "first release: software keys; pilot: the phone’s secure enclave", tr: "ilk sürüm: yazılımda anahtar; pilot: telefonun güvenli bölgesi", tk: "ilkinji wersiýa: programma açarlary; pilot: telefonyň howpsuz bölegi" }, fit: "bridge" },
  { c: { en: "Close range", tr: "Yakın alan", tk: "Ýakyn aralyk" }, eu: { en: "ISO 18013-5 over NFC/BLE", tr: "NFC/BLE üzerinden ISO 18013-5", tk: "NFC/BLE arkaly ISO 18013-5" }, tamga: { en: "QR pass for gates today; NFC/BLE next", tr: "bugün kapılar için QR geçiş kartı; sırada NFC/BLE", tk: "häzir gapylar üçin QR geçiş kartasy; indiki NFC/BLE" }, fit: "bridge" },
  { c: { en: "Browser", tr: "Tarayıcı", tk: "Brauzer" }, eu: { en: "W3C Digital Credentials API", tr: "W3C Digital Credentials API", tk: "W3C Digital Credentials API" }, tamga: { en: "planned", tr: "planlı", tk: "meýilleşdirilen" }, fit: "planned" },
  { c: { en: "Qualified e-signature", tr: "Nitelikli e-imza", tk: "Kwalifisirlenen elektron gol" }, eu: { en: "QES from the wallet", tr: "cüzdandan QES", tk: "gapjykdan QES" }, tamga: { en: "planned", tr: "planlı", tk: "meýilleşdirilen" }, fit: "planned" },
];

const DIFFS: { what: L; why: L }[] = [
  { what: { en: "Sovereignty-first governance", tr: "Egemenlik öncelikli yönetişim", tk: "Özygtyýarlylyga esaslanýan dolandyryş" }, why: { en: "Each state is the only writer of its own registry; network membership by a 2/3 vote; cross-border recognition decided by each state unilaterally.", tr: "Her devlet kendi kaydının tek yazarıdır; ağ üyeliği 2/3 oyla; sınır ötesi tanımayı her devlet tek taraflı belirler.", tk: "Her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk 2/3 ses bilen; serhetaşa ykrary her döwlet birtaraplaýyn kesgitleýär." } },
  { what: { en: "Provisional operator, built for handover", tr: "Geçici operatör, devir için tasarlı", tk: "Wagtlaýyn operator, tabşyrmak üçin taslanan" }, why: { en: "No structure assumes Tamga as the only operator. Every member state has a slot; handover changes only the operator field.", tr: "Hiçbir yapı Tamga’yı tek operatör varsaymaz. Her üye devletin yeri vardır; devir yalnızca operatör alanını değiştirir.", tk: "Hiç bir gurluş Tamga-ny ýeke-täk operator hasaplamaýar. Her agza döwletiň orny bar; tabşyrmak diňe operator meýdanyny üýtgedýär." } },
  { what: { en: "Optional ledger", tr: "İsteğe bağlı defter", tk: "Islege bagly kitap" }, why: { en: "The EU relies on lists alone. Tamga adds a permissioned ledger only when at least two independent operators join; lists and ledger give the same answers.", tr: "AB yalnızca listelere dayanır. Tamga, en az iki bağımsız operatör katıldığında izinli bir defter ekler; listeler ve defter aynı cevabı verir.", tk: "ÝB diňe sanawlara daýanýar. Tamga azyndan iki garaşsyz operator goşulanda rugsatly kitap goşýar; sanawlar we kitap şol bir jogaby berýär." } },
  { what: { en: "Public anchor log", tr: "Herkese açık çapa günlüğü", tk: "Açyk labyr žurnaly" }, why: { en: "Every revocation-list publication and schema change is a signed line in an append-only log, at least hourly — a rolled-back list is detectable.", tr: "Her iptal listesi yayını ve şema değişikliği, en az saatte bir, yalnızca eklenebilen bir günlükte imzalı bir satırdır — geri sarılmış liste fark edilir.", tk: "Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi, azyndan sagatda bir gezek, diňe goşup bolýan žurnalda gol çekilen setirdir — yza aýlanan sanaw anyklanýar." } },
  { what: { en: "Three outcomes, always", tr: "Her zaman üç sonuç", tk: "Hemişe üç netije" }, why: { en: "“Could not check” (INDETERMINATE) is never reported as “rejected”.", tr: "“Denetlenemedi” (INDETERMINATE) asla “red” olarak bildirilmez.", tk: "“Barlap bolmady” (INDETERMINATE) asla “ret” hökmünde habar berilmeýär." } },
  { what: { en: "No national ID in shared documents", tr: "Ortak belgelerde ulusal kimlik no. yok", tk: "Umumy resminamalarda milli şahsyýet belgisi ýok" }, why: { en: "The national ID number appears only in the identity credential; diplomas, tickets and cards never carry it.", tr: "Ulusal kimlik numarası yalnızca kimlik belgesinde bulunur; diploma, bilet ve kartlar asla taşımaz.", tk: "Milli şahsyýet belgisi diňe şahsyýet resminamasynda bar; diplomlar, biletler we kartalar ony asla göterýär däl." } },
];

const LIMITS: L[] = [
  { en: "In this phase the trust anchor rests on one operator’s signature; the public log, transparency report and audits deter misuse but cannot make it impossible.", tr: "Bu aşamada güven çapası tek operatörün imzasına dayanır; herkese açık günlük, şeffaflık raporu ve denetim kötüye kullanımı caydırır ama imkânsız kılmaz.", tk: "Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar; açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar, ýöne ony mümkin däl edip bilmeýär." },
  { en: "A revocation takes effect within about 90 minutes at most.", tr: "Bir iptal en geç yaklaşık 90 dakikada etkili olur.", tk: "Ýatyrylyş iň giç takmynan 90 minutda güýje girýär." },
  { en: "The same issuer could link a person across verifiers if they collude; closing this needs zero-knowledge credentials.", tr: "Aynı kurum, doğrulayıcılarla işbirliği yaparsa kişiyi doğrulayıcılar arasında eşleştirebilir; bunu kapatmak sıfır bilgili belgeler gerektirir.", tk: "Şol bir gurama barlaýjylar bilen hyzmatdaşlyk etse adamy barlaýjylaryň arasynda tanap biler; muny ýapmak üçin nol bilimli resminamalar gerek." },
  { en: "First release only: keys in software and the issuer key held by Tamga — both close before the pilot.", tr: "Yalnızca ilk sürümde: anahtarlar yazılımda ve kurum anahtarı Tamga’da — ikisi de pilottan önce kapanır.", tk: "Diňe ilkinji wersiýada: açarlar programmada we guramanyň açary Tamga-da — ikisi hem pilotdan öň ýapylýar." },
];

type Ui = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  hLayers: string;
  pLayers: string;
  hRoles: string;
  pRoles: string;
  hStd: string;
  pStd: ReactNode;
  hDiff: string;
  hLimits: string;
  pLimits: string;
  outro: ReactNode;
  cols: { layer: string; eu: string; tamga: string; role: string; today: string; later: string; comp: string; fit: string; what: string; why: string };
  legend: string;
};

const UI: Record<Locale, Ui> = {
  en: {
    meta: { title: "Tamga and the EUDI architecture", description: "Side by side: the EU’s EUDI architecture (ARF) and Tamga — layers, roles, standards, deliberate differences and known limits." },
    eyebrow: "How Tamga works",
    title: "Tamga and the EUDI architecture",
    intro: "Tamga keeps the EU’s technical layer as it is and writes its own governance layer for the Turkic world. This page shows, row by row, where Tamga is the same, where it builds a bridge, what is planned — and what it does differently on purpose.",
    hLayers: "The same layers",
    pLayers: "The EU framework has five layers. Tamga mirrors each one with its own document set.",
    hRoles: "Roles: who does what, today and later",
    pRoles: "Every role of the EU architecture exists in Tamga. Where a state has not joined yet, Tamga holds the role provisionally — on the record, on behalf of the state.",
    hStd: "Standards",
    pStd: <>The technical layer is the same. Where the first release still takes a shortcut, the row says so.</>,
    hDiff: "Where Tamga differs on purpose",
    hLimits: "Known limits, stated openly",
    pLimits: "These limits are also listed in the pilot’s limitations notice.",
    outro: <>Details: <Link href="/docs/trust-lists">trust lists</Link> · <Link href="/docs/how-tamga-works">architecture</Link> · <Link href="/docs/eidas-eudi">eIDAS, EUDI and EBSI</Link>.</>,
    cols: { layer: "Layer", eu: "EU", tamga: "Tamga", role: "Role (ARF)", today: "Today", later: "When the state joins", comp: "Component", fit: "Fit", what: "Difference", why: "What it means" },
    legend: "● same · ◐ bridge (same model, interim form) · ○ planned",
  },
  tr: {
    meta: { title: "Tamga ve EUDI mimarisi", description: "Yan yana: AB’nin EUDI mimarisi (ARF) ve Tamga — katmanlar, roller, standartlar, bilinçli farklar ve bilinen sınırlar." },
    eyebrow: "Tamga nasıl çalışır",
    title: "Tamga ve EUDI mimarisi",
    intro: "Tamga, AB’nin teknik katmanını olduğu gibi korur ve Türk dünyası için kendi yönetişim katmanını yazar. Bu sayfa satır satır Tamga’nın nerede aynı olduğunu, nerede köprü kurduğunu, neyin planlı olduğunu — ve neyi bilerek farklı yaptığını gösterir.",
    hLayers: "Aynı katmanlar",
    pLayers: "AB çerçevesinin beş katmanı var. Tamga her birini kendi belge setiyle karşılar.",
    hRoles: "Roller: kim ne yapar, bugün ve sonra",
    pRoles: "AB mimarisinin her rolü Tamga’da var. Bir devlet henüz katılmadıysa rolü Tamga geçici olarak üstlenir — kayıtlı biçimde, devlet adına.",
    hStd: "Standartlar",
    pStd: <>Teknik katman aynıdır. İlk sürümün hâlâ kestirme kullandığı yerde satır bunu söyler.</>,
    hDiff: "Tamga’nın bilerek farklı yaptıkları",
    hLimits: "Açıkça söylenen bilinen sınırlar",
    pLimits: "Bu sınırlar pilotun sınırlar bildiriminde de listelenir.",
    outro: <>Ayrıntılar: <Link href="/docs/trust-lists">güven listeleri</Link> · <Link href="/docs/how-tamga-works">mimari</Link> · <Link href="/docs/eidas-eudi">eIDAS, EUDI ve EBSI</Link>.</>,
    cols: { layer: "Katman", eu: "AB", tamga: "Tamga", role: "Rol (ARF)", today: "Bugün", later: "Devlet katılınca", comp: "Bileşen", fit: "Uyum", what: "Fark", why: "Ne anlama gelir" },
    legend: "● aynı · ◐ köprü (aynı model, ara biçim) · ○ planlı",
  },
  tk: {
    meta: { title: "Tamga we EUDI arhitekturasy", description: "Ýanaşyk: ÝB-niň EUDI arhitekturasy (ARF) we Tamga — gatlaklar, rollar, standartlar, bilkastlaýyn tapawutlar we belli çäkler." },
    eyebrow: "Tamga nähili işleýär",
    title: "Tamga we EUDI arhitekturasy",
    intro: "Tamga ÝB-niň tehniki gatlagyny bolşy ýaly saklaýar we türki dünýäsi üçin öz dolandyryş gatlagyny ýazýar. Bu sahypa setirme-setir Tamga-nyň nirede şol birdigini, nirede köpri gurýandygyny, nämäniň meýilleşdirilendigini — we nämäni bilkastlaýyn başgaça edýändigini görkezýär.",
    hLayers: "Şol bir gatlaklar",
    pLayers: "ÝB çarçuwasynyň bäş gatlagy bar. Tamga olaryň her birine öz resminamalar toplumy bilen jogap berýär.",
    hRoles: "Rollar: kim näme edýär, häzir we soňra",
    pRoles: "ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn öz üstüne alýar — hasaba alnan görnüşde, döwletiň adyndan.",
    hStd: "Standartlar",
    pStd: <>Tehniki gatlak şol bir. Ilkinji wersiýanyň heniz gysga ýol ulanýan ýerinde setir muny aýdýar.</>,
    hDiff: "Tamga-nyň bilkastlaýyn başgaça edýänleri",
    hLimits: "Açyk aýdylýan belli çäkler",
    pLimits: "Bu çäkler pilotyň çäkler beýannamasynda hem görkezilýär.",
    outro: <>Jikme-jiklikler: <Link href="/docs/trust-lists">ynam sanawlary</Link> · <Link href="/docs/how-tamga-works">arhitektura</Link> · <Link href="/docs/eidas-eudi">eIDAS, EUDI we EBSI</Link>.</>,
    cols: { layer: "Gatlak", eu: "ÝB", tamga: "Tamga", role: "Rol (ARF)", today: "Häzir", later: "Döwlet goşulanda", comp: "Bölek", fit: "Laýyklyk", what: "Tapawut", why: "Manysy" },
    legend: "● şol bir · ◐ köpri (şol bir model, aralyk görnüş) · ○ meýilleşdirilen",
  },
};

function body(locale: Locale): ReactNode {
  const u = UI[locale];
  return (
    <>
      <h2>{u.hLayers}</h2>
      <p>{u.pLayers}</p>
      <CompareTable head={[u.cols.layer, u.cols.eu, u.cols.tamga]} rows={LAYERS.map((r) => [r.layer[locale], r.eu[locale], r.tamga[locale]])} />

      <h2>{u.hRoles}</h2>
      <p>{u.pRoles}</p>
      <CompareTable head={[u.cols.role, u.cols.today, u.cols.later]} rows={ROLES.map((r) => [r.role, r.today[locale], r.later[locale]])} />

      <h2>{u.hStd}</h2>
      <p>{u.pStd}</p>
      <CompareTable
        label={u.legend}
        head={[u.cols.comp, u.cols.eu, u.cols.tamga, u.cols.fit]}
        rows={STANDARDS.map((r) => [r.c[locale], r.eu[locale], r.tamga[locale], <FitPill key="f" fit={r.fit} label={FIT_LABEL[r.fit][locale]} />])}
      />

      <h2>{u.hDiff}</h2>
      <CompareTable
        head={[u.cols.what, u.cols.why]}
        rows={DIFFS.map((d) => [<span key="w" className="inline-flex items-center gap-2"><FitPill fit="differs" label={FIT_LABEL.differs[locale]} />{d.what[locale]}</span>, d.why[locale]])}
      />

      <h2>{u.hLimits}</h2>
      <p>{u.pLimits}</p>
      <Callout tone="gold">
        <ul className="list-disc space-y-1.5 pl-5">
          {LIMITS.map((l) => (
            <li key={l.en}>{l[locale]}</li>
          ))}
        </ul>
      </Callout>
      <p>{u.outro}</p>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const u = UI[locale as Locale] ?? UI.en;
  return pageMeta(locale, "/docs/eudi-comparison", { title: u.meta.title, description: u.meta.description });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = (UI[locale as Locale] ? locale : "en") as Locale;
  const u = UI[loc];
  return (
    <DocArticle href="/docs/eudi-comparison" eyebrow={u.eyebrow} title={u.title} intro={u.intro}>
      {body(loc)}
    </DocArticle>
  );
}

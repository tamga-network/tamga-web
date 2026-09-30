import type { Locale } from "@/i18n/routing";

/*
 * Bilinen kısayollar — sapma kütüğünün kamuya açık, sade hâli. Kaynak: tamga-network docs/delivery/09-DEMO-KURGU.md §6
 * (özel). Kütükte bir madde açılır, daralır ya da kapanırsa bu dosya aynı gün güncellenir. İç notlar ve kişi adları girmez.
 */

type L = Record<Locale, string>;
export type ShortcutState = "open" | "narrowed" | "closed";
export type Shortcut = {
  id: string;
  state: ShortcutState;
  what: L;
  why?: L;
  closing: L;
  date?: string;
};

export const SHORTCUTS_PAGE: Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lead: string;
    note: string;
    labels: Record<ShortcutState, string>;
    cols: { what: string; why: string; closing: string };
    hOpen: string;
    hClosed: string;
    closedOn: string;
    closedCols: { date: string; done: string };
  }
> = {
  en: {
    title: "Known shortcuts",
    description:
      "Every shortcut Tamga takes before the pilot — what it is, why it is accepted for now and how it closes. Closed items stay on the list.",
    eyebrow: "Transparency",
    lead: "The first release takes a few deliberate shortcuts. Each one is numbered, written down and closed before the pilot; no other shortcut exists. Closed items stay here with their date.",
    note: "A new shortcut is added here before it is taken. Security findings: security@tamga.network.",
    labels: { open: "Open", narrowed: "Narrowed", closed: "Closed" },
    cols: { what: "Shortcut", why: "Why for now", closing: "How it closes" },
    hOpen: "Open",
    hClosed: "Closed",
    closedOn: "closed on",
    closedCols: { date: "Closed on", done: "What was done" },
  },
  tr: {
    title: "Bilinen kısayollar",
    description:
      "Tamga'nın pilottan önce bilerek kullandığı her kısayol — ne olduğu, neden şimdilik kabul edildiği ve nasıl kapanacağı. Kapananlar listede kalır.",
    eyebrow: "Şeffaflık",
    lead: "İlk sürüm birkaç bilinçli kısayol kullanıyor. Her biri numaralı, yazılı ve pilottan önce kapanıyor; bunların dışında kısayol yok. Kapananlar tarihiyle burada kalır.",
    note: "Yeni bir kısayol, kullanılmadan önce buraya yazılır. Güvenlik bulguları: security@tamga.network.",
    labels: { open: "Açık", narrowed: "Daraldı", closed: "Kapandı" },
    cols: { what: "Kısayol", why: "Neden şimdilik", closing: "Nasıl kapanır" },
    hOpen: "Açık",
    hClosed: "Kapananlar",
    closedOn: "kapandı:",
    closedCols: { date: "Kapanış", done: "Ne yapıldı" },
  },
  tk: {
    title: "Belli gysga ýollar",
    description:
      "Tamga-nyň pilotdan öň bilkastlaýyn ulanýan her gysga ýoly — näme, näme üçin häzirlikçe kabul edilýär we nähili ýapylýar. Ýapylanlar sanawda galýar.",
    eyebrow: "Açyklyk",
    lead: "Ilkinji wersiýa birnäçe bilkastlaýyn gysga ýol ulanýar. Her biri belgili, ýazylan we pilotdan öň ýapylýar; bulardan başga gysga ýol ýok. Ýapylanlar senesi bilen şu ýerde galýar.",
    note: "Täze gysga ýol ulanylmazdan öň şu ýere ýazylýar. Howpsuzlyk tapyndylary: security@tamga.network.",
    labels: { open: "Açyk", narrowed: "Daraldy", closed: "Ýapyldy" },
    cols: {
      what: "Gysga ýol",
      why: "Näme üçin häzirlikçe",
      closing: "Nähili ýapylýar",
    },
    hOpen: "Açyk",
    hClosed: "Ýapylanlar",
    closedOn: "ýapyldy:",
    closedCols: { date: "Ýapylan senesi", done: "Näme edildi" },
  },
};

export const SHORTCUTS: Shortcut[] = [
  {
    id: "S-1",
    state: "open",
    what: {
      en: "The institution's signing key is held in Tamga's environment.",
      tr: "Kurumun imza anahtarı Tamga'nın ortamında duruyor.",
      tk: "Guramanyň gol açary Tamga-nyň gurşawynda saklanýar.",
    },
    why: {
      en: "There is no pilot institution yet.",
      tr: "Henüz pilot kurum yok.",
      tk: "Heniz pilot gurama ýok.",
    },
    closing: {
      en: "The key moves to the institution's own key vault (KMS / HSM); the old certificate is revoked.",
      tr: "Anahtar kurumun kendi anahtar kasasına (KMS / HSM) geçer; eski sertifika iptal edilir.",
      tk: "Açar guramanyň öz açar ammaryna (KMS / HSM) geçýär; köne sertifikat ýatyrylýar.",
    },
  },
  {
    id: "S-2",
    state: "open",
    what: {
      en: "Revocation lists are published every 2 minutes.",
      tr: "İptal listeleri 2 dakikada bir yayınlanıyor.",
      tk: "Ýatyrylyş sanawlary her 2 minutda çap edilýär.",
    },
    why: {
      en: "So that demonstrations need no waiting.",
      tr: "Gösterimlerde beklenmesin diye.",
      tk: "Görkezişlerde garaşmazlyk üçin.",
    },
    closing: {
      en: "Hourly in the pilot; publication stays at fixed times only.",
      tr: "Pilotta saatte bir; yayın yine yalnız sabit aralıkla.",
      tk: "Pilotda sagatda bir gezek; çap etmek ýene diňe kesgitli aralykda.",
    },
  },
  {
    id: "S-4",
    state: "open",
    what: {
      en: "Credential data comes from a sample register in the Institution Console (fictional people).",
      tr: "Belge bilgileri Kurum Konsolu'ndaki örnek kayıt defterinden geliyor (sahte kişiler).",
      tk: "Resminama maglumatlary Gurama konsolyndaky nusga ýazgy kitabyndan gelýär (toslama adamlar).",
    },
    why: {
      en: "No institution has connected its own records yet.",
      tr: "Henüz hiçbir kurum kendi kayıtlarını bağlamadı.",
      tk: "Heniz hiç bir gurama öz ýazgylaryny birikdirmedi.",
    },
    closing: {
      en: "Data is read from the institution's own lookup endpoint; the contract is published (API reference).",
      tr: "Bilgiler kurumun kendi sorgu ucundan okunur; sözleşme yayında (API başvurusu).",
      tk: "Maglumatlar guramanyň öz gözleg nokadyndan okalýar; şertnama çap edildi (API salgylanmasy).",
    },
  },
  {
    id: "S-5",
    state: "narrowed",
    what: {
      en: "The wallet has been tested on iPhone only.",
      tr: "Cüzdan yalnız iPhone'da denendi.",
      tk: "Gapjyk diňe iPhone-da synaldy.",
    },
    why: { en: "Time.", tr: "Süre.", tk: "Wagt." },
    closing: {
      en: "Android: native modules and build settings are ready; testing on devices follows.",
      tr: "Android: yerel modüller ve derleme ayarları hazır; cihazda test sırada.",
      tk: "Android: ýerli modullar we gurluş sazlamalary taýýar; enjamda synag nobatda.",
    },
  },
  {
    id: "S-6",
    state: "open",
    what: {
      en: "The trust list is signed with a single key.",
      tr: "Güven listesi tek anahtarla imzalanıyor.",
      tk: "Ynam sanawyna bir açar bilen gol çekilýär.",
    },
    why: { en: "Time.", tr: "Süre.", tk: "Wagt." },
    closing: {
      en: "A second, rolling signing key.",
      tr: "Kaydırmalı ikinci bir imza anahtarı.",
      tk: "Aýlanýan ikinji gol açary.",
    },
  },
  {
    id: "S-7",
    state: "open",
    what: {
      en: "Privacy notice and data-protection texts are not published yet.",
      tr: "Gizlilik ve KVKK aydınlatma metinleri henüz yayında değil.",
      tk: "Gizlinlik we maglumat goraýyş düşündiriş tekstleri heniz çap edilmedi.",
    },
    why: {
      en: "Only fictional data is processed today.",
      tr: "Bugün yalnız sahte veri işleniyor.",
      tk: "Häzir diňe toslama maglumat işlenýär.",
    },
    closing: {
      en: "Published before the pilot.",
      tr: "Pilottan önce yayınlanır.",
      tk: "Pilotdan öň çap edilýär.",
    },
  },
  {
    id: "S-8",
    state: "open",
    what: {
      en: "No independent security audit yet.",
      tr: "Henüz bağımsız güvenlik denetimi yapılmadı.",
      tk: "Heniz garaşsyz howpsuzlyk barlagy geçirilmedi.",
    },
    why: { en: "Early stage.", tr: "Erken aşama.", tk: "Irki tapgyr." },
    closing: {
      en: "Before the pilot.",
      tr: "Pilottan önce.",
      tk: "Pilotdan öň.",
    },
  },
  {
    id: "S-9",
    state: "narrowed",
    what: {
      en: "Wallet keys are kept in software, not in the phone's secure chip.",
      tr: "Cüzdan anahtarları telefonun güvenli çipinde değil, yazılımda tutuluyor.",
      tk: "Gapjyk açarlary telefonyň howpsuz çipinde däl-de, programmada saklanýar.",
    },
    why: {
      en: "The development app cannot reach the secure chip.",
      tr: "Geliştirme uygulaması güvenli çipe erişemiyor.",
      tk: "Işläp düzüş programmasy howpsuz çipe ýetip bilmeýär.",
    },
    closing: {
      en: "Store app: keys in Secure Enclave / StrongBox — the code is ready.",
      tr: "Mağaza sürümü: anahtarlar Secure Enclave / StrongBox'ta — kod hazır.",
      tk: "Dükan wersiýasy: açarlar Secure Enclave / StrongBox-da — kod taýýar.",
    },
  },
  {
    id: "S-10",
    state: "open",
    what: {
      en: "Sample diplomas can be issued without a real identity check.",
      tr: "Deneme diplomaları gerçek kimlik doğrulaması olmadan verilebiliyor.",
      tk: "Synag diplomlary hakyky şahsyýet barlagy bolmazdan berlip bilinýär.",
    },
    why: {
      en: "There are no real people in the demo.",
      tr: "Gösterimde gerçek kişi yok.",
      tk: "Görkezişde hakyky adam ýok.",
    },
    closing: {
      en: "Every credential requires a real remote identity check or an in-person registration desk.",
      tr: "Her belge gerçek uzaktan kimlik doğrulaması ya da kayıt masası ister.",
      tk: "Her resminama hakyky uzakdan şahsyýet barlagyny ýa-da hasaba alyş stoluny talap edýär.",
    },
  },
  {
    id: "S-14",
    state: "narrowed",
    what: {
      en: "Device attestation is not yet required; every wallet is treated as “software”.",
      tr: "Cihaz kanıtı henüz zorunlu değil; her cüzdan “yazılım” sayılıyor.",
      tk: "Enjam subutnamasy heniz hökmany däl; her gapjyk “programma” hasaplanýar.",
    },
    why: {
      en: "No store build yet.",
      tr: "Henüz mağaza derlemesi yok.",
      tk: "Heniz dükan gurluşy ýok.",
    },
    closing: {
      en: "App Attest / Play Integrity becomes mandatory with the store app; the verification code is ready.",
      tr: "Mağaza sürümüyle App Attest / Play Integrity zorunlu olur; doğrulama kodu hazır.",
      tk: "Dükan wersiýasy bilen App Attest / Play Integrity hökmany bolýar; barlag kody taýýar.",
    },
  },
  {
    id: "S-15",
    state: "open",
    what: {
      en: "The identity service can run with a simulated identity-check provider.",
      tr: "Kimlik servisi benzetilmiş bir kimlik doğrulama sağlayıcısıyla çalışabiliyor.",
      tk: "Şahsyýet hyzmaty meňzedilen şahsyýet barlag üpjün edijisi bilen işläp bilýär.",
    },
    why: {
      en: "Demonstrations without real identities.",
      tr: "Gerçek kimlik olmadan gösterim.",
      tk: "Hakyky şahsyýetsiz görkeziş.",
    },
    closing: {
      en: "Real provider only.",
      tr: "Yalnız gerçek sağlayıcı.",
      tk: "Diňe hakyky üpjün ediji.",
    },
  },
  {
    id: "S-16",
    state: "open",
    what: {
      en: "At a turnstile the pass is shown without a PIN; the consent given at registration lasts at most 6 months and every use is logged in the wallet.",
      tr: "Turnikede geçiş kartı PIN sorulmadan gösteriliyor; kayıtta verilen rıza en çok 6 ay geçerli, her gösterim cüzdan geçmişine yazılıyor.",
      tk: "Turniketde geçiş kartasy PIN soralmazdan görkezilýär; hasaba alnanda berlen razylyk iň köp 6 aý güýjünde, her görkeziş gapjyk taryhyna ýazylýar.",
    },
    why: {
      en: "A two-second turnstile experience.",
      tr: "İki saniyelik turnike deneyimi.",
      tk: "Iki sekuntlyk turniket tejribesi.",
    },
    closing: {
      en: "Durations set with pilot data; reviewed again with in-person presentation (ISO 18013-5).",
      tr: "Süreler pilot verisiyle belirlenir; yakın alan sunumuyla (ISO 18013-5) yeniden değerlendirilir.",
      tk: "Möhletler pilot maglumatlary bilen kesgitlenýär; ýakyn aralyk hödürlemesi (ISO 18013-5) bilen täzeden seredilýär.",
    },
  },
  {
    id: "S-17",
    state: "narrowed",
    what: {
      en: "When signing up to websites, the same document fingerprint goes to every site (daily sign-in uses a passkey).",
      tr: "Web sitelerine kayıtta aynı belge özeti her siteye gidiyor (günlük giriş passkey ile).",
      tk: "Web saýtlara hasaba duranyňda şol bir resminama heşi her saýta gidýär (gündelik giriş passkey bilen).",
    },
    why: {
      en: "Per-site pseudonyms are not built yet.",
      tr: "Site başına takma ad henüz yok.",
      tk: "Saýt başyna lakam heniz ýok.",
    },
    closing: {
      en: "A different pseudonym for each site.",
      tr: "Her siteye farklı takma ad.",
      tk: "Her saýta başga lakam.",
    },
  },
  {
    id: "S-19",
    state: "open",
    what: {
      en: "The wallet starts the gate-pass registration itself.",
      tr: "Geçiş kartı kaydını cüzdan kendisi başlatıyor.",
      tk: "Geçiş kartasynyň hasaba alnyşyny gapjyk özi başlaýar.",
    },
    why: {
      en: "One phone is enough for demonstrations.",
      tr: "Gösterimde tek telefon yetsin diye.",
      tk: "Görkezişde bir telefon ýeterlik bolar ýaly.",
    },
    closing: {
      en: "The registration desk or the institution's page starts the request.",
      tr: "İsteği kayıt masası ya da kurumun sayfası başlatır.",
      tk: "Haýyşy hasaba alyş stoly ýa-da guramanyň sahypasy başlaýar.",
    },
  },
  {
    id: "S-11",
    state: "closed",
    date: "2026-09-28",
    what: {
      en: "The wallet's local storage was unencrypted.",
      tr: "Cüzdanın yerel deposu şifresizdi.",
      tk: "Gapjygyň ýerli ammary şifrlenmändi.",
    },
    closing: {
      en: "Encrypted with AES-256-GCM; the key stays on this device only.",
      tr: "AES-256-GCM ile şifreli; anahtar yalnız bu cihazda.",
      tk: "AES-256-GCM bilen şifrlenen; açar diňe şu enjamda.",
    },
  },
  {
    id: "S-3",
    state: "closed",
    date: "2026-09-29",
    what: {
      en: "Notifications were shown inside a Tamga portal.",
      tr: "Bildirimler bir Tamga portalında gösteriliyordu.",
      tk: "Bildirişler Tamga portalynda görkezilýärdi.",
    },
    closing: {
      en: "The institution sends the offer through its own channel; Tamga never sees contact details.",
      tr: "Teklifi kurum kendi kanalıyla gönderir; Tamga iletişim bilgisi görmez.",
      tk: "Teklibi gurama öz kanaly bilen iberýär; Tamga aragatnaşyk maglumatlaryny görmeýär.",
    },
  },
  {
    id: "S-18",
    state: "closed",
    date: "2026-09-29",
    what: {
      en: "The mdoc session transcript followed a non-standard profile.",
      tr: "mdoc oturum özeti standart dışı bir profildeydi.",
      tk: "mdoc sessiýa jemi standart däl profilde bolupdyr.",
    },
    closing: {
      en: "Now the OpenID4VP standard handover with detached device signature.",
      tr: "Artık OpenID4VP standardı ve ayrık cihaz imzası.",
      tk: "Indi OpenID4VP standarty we aýry enjam goly.",
    },
  },
  {
    id: "S-12",
    state: "closed",
    date: "2026-09-26",
    what: {
      en: "The wallet checked a verifier's domain in its certificate without full parsing.",
      tr: "Cüzdan doğrulayıcının alan adını sertifikada tam ayrıştırmadan denetliyordu.",
      tk: "Gapjyk barlaýjynyň domen adyny sertifikatda doly derňemezden barlaýardy.",
    },
    closing: {
      en: "Full certificate parsing.",
      tr: "Sertifika tam ayrıştırılıyor.",
      tk: "Sertifikat doly derňelýär.",
    },
  },
  {
    id: "S-13",
    state: "closed",
    date: "2026-09-26",
    what: {
      en: "The wallet read verifier registrations from an unsigned view of the list.",
      tr: "Cüzdan doğrulayıcı kayıtlarını listenin imzasız görünümünden okuyordu.",
      tk: "Gapjyk barlaýjy ýazgylaryny sanawyň golsuz görnüşinden okaýardy.",
    },
    closing: {
      en: "Only from the signed trust list, checked against keys built into the app.",
      tr: "Yalnız imzalı güven listesinden, uygulamaya gömülü anahtarlarla denetlenerek.",
      tk: "Diňe gol çekilen ynam sanawyndan, programma goşulan açarlar bilen barlanyp.",
    },
  },
];

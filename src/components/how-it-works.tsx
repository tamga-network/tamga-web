"use client";

/*
 * "Nasıl çalışır" — güven akışı sahnesi (2026-10-02; 2026-11-18 yeniden tasarım).
 * Koyu sahne (her iki temada): güven listesi (üst) · belge veren kurum · kişinin cüzdanı · doğrulayan. Oklar çizilir, üzerinden
 * gerçek nesne kayar (belge, soru, paylaşılan alanlar, listeye soru ve cevap). Beş adım kendiliğinden ilerler (görünürken);
 * etkileşim: cüzdanda paylaşılacak alanları seçmek ve "adı değiştirip göster" ile imzanın tutmadığını görmek.
 * Telefonda yalnız o adımın iki tarafı alt alta. Hareket azaltma: son adımın sabit, tam hâli.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  ListChecks,
  Lock,
  Pause,
  PenLine,
  Play,
  RotateCcw,
  ScanLine,
  Wallet,
  X as XIcon,
} from "lucide-react";

type Field = [label: string, value: string];
type Labels = {
  title: string;
  issuer: string;
  issuerSub: string;
  wallet: string;
  walletSub: string;
  verifier: string;
  verifierSub: string;
  trust: string;
  trustSub: string;
  rows: [string, string][];
  cardTitle: string;
  cardIssuer: string;
  fields: Field[];
  sealed: string;
  hidden: string;
  request: string;
  query: string;
  response: string;
  verified: string;
  play: string;
  pause: string;
  prev: string;
  next: string;
  step: string;
  steps: { title: string; body: string }[];
};

const L: Record<"tr" | "en" | "tk" | "az", Labels> = {
  tr: {
    title: "Bir belgenin yolculuğu",
    issuer: "Belge veren kurum",
    issuerSub: "üniversite · hastane · kurum",
    wallet: "Kişinin cüzdanı",
    walletSub: "belgeler telefonda",
    verifier: "Doğrulayan",
    verifierSub: "işveren · site · kapı",
    trust: "Güven listesi",
    trustSub: "imzalı · devletin",
    rows: [
      ["TR", "Örnek Kurum"],
      ["TR", "Örnek Üniversite"],
    ],
    cardTitle: "Kimlik belgesi",
    cardIssuer: "Örnek Kurum",
    fields: [
      ["Ad Soyad", "Ayşe Yılmaz"],
      ["Doğum tarihi", "14.03.2001"],
      ["Belge türü", "Kimlik"],
      ["Geçerlilik", "2031"],
      ["18+", "Evet"],
    ],
    sealed: "imzalı",
    hidden: "gizli",
    request: "18 yaşından büyük mü?",
    query: "Bu kurum listede mi?",
    response: "Listede · imza geçerli · iptal yok",
    verified: "Doğrulandı",
    play: "Oynat",
    pause: "Duraklat",
    prev: "Önceki adım",
    next: "Sonraki adım",
    step: "Adım",
    steps: [
      {
        title: "Kurum belgeyi hazırlar",
        body: "Her alan ayrı mühürlenir (salted hash); sonra kurum belgenin tamamını kendi anahtarıyla imzalar.",
      },
      {
        title: "Belge cüzdana gider",
        body: "İmzalı belge kişinin telefonundaki cüzdana yerleşir. Kopyası hiçbir sunucuda tutulmaz.",
      },
      {
        title: "Doğrulayan sorar",
        body: "Bir site, işveren ya da kapı yalnız ihtiyacı olanı ister: \"18 yaşından büyük mü?\"",
      },
      {
        title: "Sadece gereken gider",
        body: "Kişi onaylar; ad ve doğum tarihi cüzdanda kalır. Giden yalnız \"18+: Evet\" ve kurumun imzası.",
      },
      {
        title: "Güven listesine sorulur",
        body: "Doğrulayan, kurumun devletin imzalı listesinde olduğunu ve belgenin iptal edilmediğini kontrol eder. Kuruma sorulmaz, hiçbir şey kaydedilmez.",
      },
    ],
  },
  en: {
    title: "The journey of a credential",
    issuer: "Issuing institution",
    issuerSub: "university · hospital · agency",
    wallet: "The person's wallet",
    walletSub: "credentials on the phone",
    verifier: "Verifier",
    verifierSub: "employer · website · gate",
    trust: "Trust list",
    trustSub: "signed · by the state",
    rows: [
      ["TR", "Example Agency"],
      ["TR", "Example University"],
    ],
    cardTitle: "Identity credential",
    cardIssuer: "Example Agency",
    fields: [
      ["Name", "Ayşe Yılmaz"],
      ["Date of birth", "14.03.2001"],
      ["Type", "Identity"],
      ["Valid until", "2031"],
      ["Over 18", "Yes"],
    ],
    sealed: "signed",
    hidden: "hidden",
    request: "Is this person over 18?",
    query: "Is this issuer listed?",
    response: "Listed · signature valid · not revoked",
    verified: "Verified",
    play: "Play",
    pause: "Pause",
    prev: "Previous step",
    next: "Next step",
    step: "Step",
    steps: [
      {
        title: "The institution prepares the credential",
        body: "Every field is sealed on its own (salted hash); then the institution signs the whole credential with its key.",
      },
      {
        title: "The credential goes to the wallet",
        body: "The signed credential lands in the wallet on the person's phone. No server keeps a copy.",
      },
      {
        title: "The verifier asks",
        body: "A website, employer or gate asks only for what it needs: \"Is this person over 18?\"",
      },
      {
        title: "Only what is needed is shared",
        body: "The person approves; name and date of birth stay in the wallet. Only \"Over 18: Yes\" and the institution's signature are sent.",
      },
      {
        title: "The trust list is checked",
        body: "The verifier checks that the institution is on the state's signed list and the credential is not revoked. The institution is not contacted and nothing is logged.",
      },
    ],
  },
  tk: {
    title: "Resminamanyň ýoly",
    issuer: "Resminama berýän gurama",
    issuerSub: "uniwersitet · hassahana · edara",
    wallet: "Adamyň gapjygy",
    walletSub: "resminamalar telefonda",
    verifier: "Barlaýjy",
    verifierSub: "iş beriji · saýt · gapy",
    trust: "Ynam sanawy",
    trustSub: "gol çekilen · döwletiň",
    rows: [
      ["TR", "Mysal edara"],
      ["TR", "Mysal uniwersitet"],
    ],
    cardTitle: "Şahsyýet resminamasy",
    cardIssuer: "Mysal edara",
    fields: [
      ["Ady", "Ayşe Yılmaz"],
      ["Doglan senesi", "14.03.2001"],
      ["Görnüşi", "Şahsyýet"],
      ["Möhleti", "2031"],
      ["18+", "Hawa"],
    ],
    sealed: "gol çekildi",
    hidden: "gizlin",
    request: "18 ýaşdan uly my?",
    query: "Bu gurama sanawda barmy?",
    response: "Sanawda · gol dogry · ýatyrylmadyk",
    verified: "Tassyklandy",
    play: "Oýnat",
    pause: "Duruz",
    prev: "Öňki ädim",
    next: "Indiki ädim",
    step: "Ädim",
    steps: [
      {
        title: "Gurama resminamany taýýarlaýar",
        body: "Her meýdan aýratyn möhürlenýär (salted hash); soňra gurama resminamanyň hemmesine öz açary bilen gol çekýär.",
      },
      {
        title: "Resminama gapjyga gidýär",
        body: "Gol çekilen resminama adamyň telefonyndaky gapjyga ýerleşýär. Hiç bir serwer nusgasyny saklamaýar.",
      },
      {
        title: "Barlaýjy soraýar",
        body: "Saýt, iş beriji ýa-da gapy diňe gerek zady soraýar: \"18 ýaşdan uly my?\"",
      },
      {
        title: "Diňe gereki gidýär",
        body: "Adam tassyklaýar; ady we doglan senesi gapjykda galýar. Diňe \"18+: Hawa\" we guramanyň goly gidýär.",
      },
      {
        title: "Ynam sanawy barlanýar",
        body: "Barlaýjy guramanyň döwletiň gol çekilen sanawyndadygyny we resminamanyň ýatyrylmandygyny barlaýar. Gurama sorag berilmeýär, hiç zat ýazylmaýar.",
      },
    ],
  },
  az: {
    title: "Rəqəmsal sənədin yolu",
    issuer: "Sənədi verən qurum",
    issuerSub: "universitet · xəstəxana · dövlət qurumu",
    wallet: "Şəxsin rəqəmsal cüzdanı",
    walletSub: "rəqəmsal sənədlər telefonda",
    verifier: "Yoxlayan tərəf",
    verifierSub: "işəgötürən · sayt · giriş qapısı",
    trust: "Etibar siyahısı",
    trustSub: "imzalı · dövlət tərəfindən",
    rows: [
      ["TR", "Nümunə Qurum"],
      ["TR", "Nümunə Universitet"],
    ],
    cardTitle: "Şəxsiyyət sənədi",
    cardIssuer: "Nümunə Qurum",
    fields: [
      ["Ad", "Ayşe Yılmaz"],
      ["Doğum tarixi", "14.03.2001"],
      ["Növ", "Şəxsiyyət"],
      ["Etibarlılıq müddəti", "2031"],
      ["18 yaşdan yuxarı", "Bəli"],
    ],
    sealed: "imzalı",
    hidden: "gizli",
    request: "Bu şəxs 18 yaşdan yuxarıdırmı?",
    query: "Bu qurum siyahıdadırmı?",
    response: "Siyahıdadır · imza etibarlıdır · ləğv edilməyib",
    verified: "Təsdiqləndi",
    play: "Oynat",
    pause: "Dayandır",
    prev: "Əvvəlki addım",
    next: "Növbəti addım",
    step: "Addım",
    steps: [
      {
        title: "Qurum rəqəmsal sənədi hazırlayır",
        body: "Hər sahə ayrıca möhürlənir (salted hash); sonra qurum bütün sənədi öz açarı ilə imzalayır.",
      },
      {
        title: "Rəqəmsal sənəd cüzdana göndərilir",
        body: "İmzalı sənəd şəxsin telefonundakı rəqəmsal cüzdana yerləşir. Heç bir server onun surətini saxlamır.",
      },
      {
        title: "Yoxlayan tərəf soruşur",
        body: "Sayt, işəgötürən və ya giriş qapısı yalnız ehtiyac duyduğu məlumatı istəyir: \"Bu şəxs 18 yaşdan yuxarıdırmı?\"",
      },
      {
        title: "Yalnız lazım olan paylaşılır",
        body: "Şəxs razılıq verir; ad və doğum tarixi cüzdanda qalır. Yalnız \"18 yaşdan yuxarı: Bəli\" və qurumun imzası göndərilir.",
      },
      {
        title: "Etibar siyahısı yoxlanılır",
        body: "Yoxlayan tərəf qurumun dövlətin imzalı siyahısında olduğunu və sənədin ləğv edilmədiyini yoxlayır. Quruma müraciət edilmir və heç nə qeydə alınmır.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ etkileşim metinleri (2026-11-18) */

type Extra = {
  pick: string;
  pickHint: string;
  tamper: string;
  untamper: string;
  rejected: string;
  badSig: string;
  sigOk: string;
  listed: string;
  notRevoked: string;
  received: string;
  unseen: string;
  waiting: string;
  issued: string;
  tryIt: string;
};

const XL: Record<"tr" | "en" | "tk" | "az", Extra> = {
  tr: {
    pick: "Paylaşılacakları seç",
    pickHint: "Alanlara dokun: telefondan neyin çıkacağına kişi karar verir.",
    tamper: "Adı değiştirip göster",
    untamper: "Belgeyi düzelt",
    rejected: "Reddedildi",
    badSig: "İmza tutmuyor",
    sigOk: "İmza geçerli",
    listed: "Kurum listede",
    notRevoked: "İptal edilmemiş",
    received: "Gelen",
    unseen: "görmediği alan",
    waiting: "Bekliyor",
    issued: "İmzalandı ve gönderildi",
    tryIt: "Kendin dene",
  },
  en: {
    pick: "Choose what to share",
    pickHint: "Tap a field: the person decides what leaves the phone.",
    tamper: "Alter the name and present it",
    untamper: "Restore the credential",
    rejected: "Rejected",
    badSig: "Signature does not match",
    sigOk: "Signature valid",
    listed: "Issuer listed",
    notRevoked: "Not revoked",
    received: "Received",
    unseen: "fields not seen",
    waiting: "Waiting",
    issued: "Signed and sent",
    tryIt: "Try it yourself",
  },
  tk: {
    pick: "Paýlaşyljagyny saýla",
    pickHint: "Meýdana basyň: telefondan näme çykjagyny adam özi saýlaýar.",
    tamper: "Ady üýtgedip görkez",
    untamper: "Resminamany dikelt",
    rejected: "Ret edildi",
    badSig: "Gol gabat gelmeýär",
    sigOk: "Gol dogry",
    listed: "Gurama sanawda",
    notRevoked: "Ýatyrylmadyk",
    received: "Gelen",
    unseen: "görülmedik meýdan",
    waiting: "Garaşýar",
    issued: "Gol çekildi we iberildi",
    tryIt: "Özüňiz synap görüň",
  },
  az: {
    pick: "Paylaşılacaqları seçin",
    pickHint: "Sahəyə toxunun: telefondan nəyin çıxacağına şəxs özü qərar verir.",
    tamper: "Adı dəyişib təqdim edin",
    untamper: "Sənədi bərpa edin",
    rejected: "Rədd edildi",
    badSig: "İmza uyğun gəlmir",
    sigOk: "İmza etibarlıdır",
    listed: "Qurum siyahıdadır",
    notRevoked: "Ləğv edilməyib",
    received: "Gələn",
    unseen: "görülməyən sahə",
    waiting: "Gözləyir",
    issued: "İmzalandı və göndərildi",
    tryIt: "Özünüz sınayın",
  },
};

/* ------------------------------------------------------------------ zamanlama ve geometri */

/** Her adımın süresi (ms). */
const DURATIONS = [4200, 3400, 3400, 4600, 5600];
const STEPS = 5;
/** Sahne koordinatları (SVG viewBox ile aynı; paneller ve paketler yüzdeyle yerleşir). */
const W = 1000;
const H = 590;

type Pt = [number, number];
type Curve = [Pt, Pt, Pt, Pt];

/** Oklar: her biri kübik eğri. */
const CURVES: Record<"issue" | "request" | "present" | "query" | "answer", Curve> = {
  issue: [[262, 400], [300, 350], [338, 350], [374, 400]],
  request: [[738, 340], [700, 300], [664, 300], [626, 340]],
  present: [[626, 500], [664, 545], [700, 545], [738, 500]],
  query: [[880, 262], [880, 160], [780, 96], [668, 96]],
  answer: [[668, 128], [748, 128], [846, 170], [846, 262]],
};

const ACTIVE: Record<number, (keyof typeof CURVES)[]> = {
  0: [],
  1: ["issue"],
  2: ["request"],
  3: ["present"],
  4: ["query", "answer"],
};

function bez([p0, p1, p2, p3]: Curve, t: number): Pt {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  return [x, y];
}

function d([p0, p1, p2, p3]: Curve) {
  return `M${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`;
}

function track(c: Curve) {
  const pts = Array.from({ length: 13 }, (_, i) => bez(c, i / 12));
  return {
    left: pts.map(([x]) => `${(x / W) * 100}%`),
    top: pts.map(([, y]) => `${(y / H) * 100}%`),
  };
}

const EASE = [0.4, 0, 0.2, 1] as const;

/* ------------------------------------------------------------------ küçük parçalar */

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function PanelHead({ icon, title, sub, active }: { icon: React.ReactNode; title: string; sub: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[var(--flow-line)] px-3.5 py-2.5">
      <span
        className={`grid size-7 shrink-0 place-items-center rounded-md transition-colors duration-500 ${
          active ? "bg-gok-300 text-gok-900" : "bg-[color-mix(in_oklab,var(--ink-band-fg)_8%,transparent)] text-ink-band-muted"
        }`}
        aria-hidden
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold leading-tight text-ink-band-fg">{title}</span>
        <span className="block truncate font-mono text-[10px] leading-tight text-ink-band-muted">{sub}</span>
      </span>
    </div>
  );
}

function panelClass(active: boolean) {
  return `overflow-hidden rounded-xl border bg-[color-mix(in_oklab,var(--ink-band)_80%,var(--gok-900))] transition-[border-color,box-shadow] duration-500 ${
    active
      ? "border-[color-mix(in_oklab,var(--gok-300)_55%,transparent)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--gok-300)_25%,transparent),0_20px_50px_-20px_rgba(0,0,0,0.8)]"
      : "border-[var(--flow-line)] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.8)]"
  }`;
}

type SceneState = {
  l: Labels;
  x: Extra;
  step: number;
  shared: Set<number>;
  tampered: boolean;
  animate: boolean;
  onToggle: (i: number) => void;
};

function fieldValue(l: Labels, i: number, tampered: boolean) {
  const v = l.fields[i][1];
  if (i === 0 && tampered) return v.replace(/a(?=[^a]*$)/, "e");
  return v;
}

/* ------------------------------------------------------------------ paneller */

function IssuerPanel({ l, x, step, animate }: SceneState) {
  const sealing = step === 0 && animate;
  return (
    <div className={panelClass(step <= 1)}>
      <PanelHead icon={<Building2 size={15} />} title={l.issuer} sub={l.issuerSub} active={step <= 1} />
      <div className="px-3.5 py-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[12px] font-semibold text-ink-band-fg">{l.cardTitle}</span>
          <span className="truncate font-mono text-[10px] text-ink-band-muted">{l.cardIssuer}</span>
        </div>
        <ul className="mt-2 grid gap-1">
          {l.fields.map(([k], i) => (
            <li key={k} className="flex items-center justify-between gap-2 text-[11px]">
              <span className="truncate text-ink-band-muted">{k}</span>
              <motion.span
                key={`h-${step}`}
                initial={sealing ? { opacity: 0, scale: 0.4 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: sealing ? 0.3 + i * 0.35 : 0, duration: 0.3 }}
                className="rounded bg-[color-mix(in_oklab,var(--gok-300)_16%,transparent)] px-1.5 font-mono text-[10px] text-gok-300"
              >
                #{(0x3a1 + i * 0x2f7).toString(16)}
              </motion.span>
            </li>
          ))}
        </ul>
        <motion.div
          key={`seal-${step}`}
          initial={sealing ? { opacity: 0, scale: 1.6, rotate: -12 } : false}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ delay: sealing ? 2.2 : 0, duration: 0.45, ease: EASE }}
          className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-gold-bright px-2 py-1 text-[11px] font-bold text-ink-band"
        >
          <Check size={12} strokeWidth={3} aria-hidden /> {step === 0 ? l.sealed : x.issued}
        </motion.div>
      </div>
    </div>
  );
}

function WalletPanel({ l, x, step, shared, tampered, onToggle }: SceneState) {
  const has = step >= 1;
  const picking = step >= 2;
  return (
    <div className="rounded-[1.6rem] border border-[var(--flow-line)] bg-[color-mix(in_oklab,var(--ink-band)_60%,black)] p-1.5 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.9)]">
      <div className={`${panelClass(step >= 1 && step <= 3)} rounded-[1.3rem]`}>
        <PanelHead icon={<Wallet size={15} />} title={l.wallet} sub={l.walletSub} active={step >= 1 && step <= 3} />
        <div className="px-3 py-3 md:min-h-[15.5rem]">
          {!has ? (
            <div className="grid h-24 place-items-center md:h-[13.5rem] rounded-lg border border-dashed border-[var(--flow-line)] font-mono text-[11px] text-ink-band-muted">
              {x.waiting}
            </div>
          ) : (
            <motion.div initial={step === 1 ? { opacity: 0, y: 12 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: step === 1 ? 1.5 : 0, duration: 0.4 }}>
              {step === 2 ? (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="mb-2 rounded-lg bg-gok-300 px-2.5 py-1.5 text-[11px] font-semibold leading-snug text-gok-900"
                >
                  {l.request}
                </motion.p>
              ) : null}
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] font-semibold text-ink-band-fg">{l.cardTitle}</span>
                {picking ? <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-gold-bright">{x.pick}</span> : null}
              </div>
              <ul className="mt-2 grid gap-1">
                {l.fields.map(([k], i) => {
                  const on = shared.has(i);
                  const forged = tampered && i === 0;
                  return (
                    <li key={k}>
                      <button
                        type="button"
                        disabled={!picking}
                        aria-pressed={picking ? on : undefined}
                        onClick={() => onToggle(i)}
                        className={`flex w-full items-center gap-2 rounded-md border px-2 py-1 text-left text-[11px] transition-colors duration-300 ${
                          picking ? "cursor-pointer hover:border-gok-300" : "cursor-default"
                        } ${
                          picking && on
                            ? "border-[color-mix(in_oklab,var(--gok-300)_60%,transparent)] bg-[color-mix(in_oklab,var(--gok-300)_14%,transparent)]"
                            : "border-transparent bg-[color-mix(in_oklab,var(--ink-band-fg)_5%,transparent)]"
                        }`}
                      >
                        {picking ? (
                          on ? (
                            <Check size={12} strokeWidth={3} className="shrink-0 text-gok-300" aria-hidden />
                          ) : (
                            <Lock size={11} className="shrink-0 text-ink-band-muted" aria-hidden />
                          )
                        ) : null}
                        <span className="min-w-0 flex-1 truncate text-ink-band-muted">{k}</span>
                        <span
                          className={`truncate font-medium ${forged ? "text-[var(--flow-bad)] underline decoration-wavy" : picking && !on ? "text-ink-band-muted" : "text-ink-band-fg"}`}
                        >
                          {picking && !on ? "••••" : fieldValue(l, i, tampered)}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function VerifierPanel({ l, x, step, shared, tampered, animate }: SceneState) {
  const list = [...shared].sort();
  const bad = tampered && shared.has(0);
  const checks: [string, boolean][] = [
    [bad ? x.badSig : x.sigOk, !bad],
    [x.listed, true],
    [x.notRevoked, true],
  ];
  return (
    <div className={panelClass(step >= 2)}>
      <PanelHead icon={<ScanLine size={15} />} title={l.verifier} sub={l.verifierSub} active={step >= 2} />
      <div className="px-3.5 py-3 md:min-h-[13rem]">
        {step < 2 ? (
          <div className="grid h-24 place-items-center md:h-[11.5rem] rounded-lg border border-dashed border-[var(--flow-line)] font-mono text-[11px] text-ink-band-muted">
            {x.waiting}
          </div>
        ) : step === 2 ? (
          <p className="rounded-lg border border-[var(--flow-line)] px-2.5 py-2 text-[12px] leading-snug text-ink-band-fg">{l.request}</p>
        ) : (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-band-muted">{x.received}</p>
            <motion.ul
              key={`r-${step}-${list.join()}`}
              initial={step === 3 && animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: step === 3 && animate ? 1.9 : 0 }}
              className="mt-1.5 grid gap-1"
            >
              {list.length === 0 ? <li className="text-[11px] text-ink-band-muted">—</li> : null}
              {list.map((i) => (
                <li key={i} className="flex items-center justify-between gap-2 rounded-md bg-[color-mix(in_oklab,var(--ink-band-fg)_5%,transparent)] px-2 py-1 text-[11px]">
                  <span className="truncate text-ink-band-muted">{l.fields[i][0]}</span>
                  <span className={`truncate font-medium ${tampered && i === 0 ? "text-[var(--flow-bad)]" : "text-ink-band-fg"}`}>{fieldValue(l, i, tampered)}</span>
                </li>
              ))}
              <li className="px-2 pt-0.5 font-mono text-[10px] text-ink-band-muted">
                <Lock size={10} className="mr-1 inline" aria-hidden />
                {l.fields.length - list.length} {x.unseen}
              </li>
            </motion.ul>
            {step === 4 ? (
              <div className="mt-3 grid gap-1">
                {checks.map(([t, ok], i) => (
                  <motion.p
                    key={t}
                    initial={animate ? { opacity: 0, x: -6 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: animate ? 2.6 + i * 0.3 : 0 }}
                    className={`flex items-center gap-1.5 text-[11px] font-medium ${ok ? "text-[var(--flow-ok)]" : "text-[var(--flow-bad)]"}`}
                  >
                    {ok ? <Check size={12} strokeWidth={3} aria-hidden /> : <XIcon size={12} strokeWidth={3} aria-hidden />} {t}
                  </motion.p>
                ))}
                <motion.span
                  initial={animate ? { opacity: 0, scale: 1.6, rotate: -12 } : false}
                  animate={{ opacity: 1, scale: 1, rotate: -4 }}
                  transition={{ delay: animate ? 3.7 : 0, duration: 0.45, ease: EASE }}
                  className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 text-[13px] font-bold ${
                    bad ? "bg-[var(--flow-bad)] text-ink-band" : "bg-gold-bright text-ink-band"
                  }`}
                >
                  {bad ? <XIcon size={14} strokeWidth={3} aria-hidden /> : <Check size={14} strokeWidth={3} aria-hidden />}
                  {bad ? x.rejected : l.verified}
                </motion.span>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function TrustPanel({ l, step, animate }: SceneState) {
  const live = step === 4;
  return (
    <div className={panelClass(live)}>
      <div className="flex items-center gap-2 border-b border-[var(--flow-line)] px-3.5 py-2">
        <span className="flex gap-1" aria-hidden>
          <i className="size-2 rounded-full bg-[var(--flow-line)]" />
          <i className="size-2 rounded-full bg-[var(--flow-line)]" />
          <i className="size-2 rounded-full bg-[var(--flow-line)]" />
        </span>
        <ListChecks size={14} className={live ? "text-gok-300" : "text-ink-band-muted"} aria-hidden />
        <span className="text-[13px] font-semibold text-ink-band-fg">{l.trust}</span>
        <span className="ml-auto font-mono text-[10px] text-ink-band-muted">{l.trustSub}</span>
      </div>
      <ul className="grid gap-1 px-3 py-2.5">
        {l.rows.map(([cc, name], i) => {
          const hit = live && i === 0;
          return (
            <li key={name} className="relative flex items-center gap-2.5 overflow-hidden rounded-md px-2 py-1 text-[12px]">
              {hit ? (
                <motion.span
                  className="absolute inset-0 bg-[color-mix(in_oklab,var(--gok-300)_18%,transparent)]"
                  initial={animate ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ delay: animate ? 1.3 : 0, duration: 0.5 }}
                  aria-hidden
                />
              ) : null}
              <span className="relative font-mono text-[10px] text-ink-band-muted">{cc}</span>
              <span className="relative text-ink-band-fg">{name}</span>
              {hit ? (
                <motion.span
                  className="relative ml-auto text-[var(--flow-ok)]"
                  initial={animate ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: animate ? 1.7 : 0 }}
                >
                  <Check size={13} strokeWidth={3} aria-hidden />
                </motion.span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ paketler */

function Packet({ step, l, x, shared, tampered }: SceneState) {
  const chip =
    "pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)]";
  const go = (c: Curve, delay: number, dur = 1.1) => ({
    initial: { left: track(c).left[0], top: track(c).top[0], opacity: 0 },
    animate: { ...track(c), opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] },
    transition: { delay, duration: dur, ease: EASE },
  });
  if (step === 1)
    return (
      <motion.span key="p1" className={`${chip} inline-flex items-center gap-1.5 bg-gold-bright text-ink-band`} {...go(CURVES.issue, 0.6)}>
        <FileText size={12} aria-hidden /> {l.cardTitle}
      </motion.span>
    );
  if (step === 2)
    return (
      <motion.span key="p2" className={`${chip} max-w-[15rem] truncate bg-gok-300 text-gok-900`} {...go(CURVES.request, 0.6)}>
        {l.request}
      </motion.span>
    );
  if (step === 3) {
    const n = shared.size;
    const label = n === 1 ? `${l.fields[[...shared][0]][0]}: ${fieldValue(l, [...shared][0], tampered)}` : `${n} / ${l.fields.length}`;
    return (
      <motion.span key={`p3-${n}`} className={`${chip} inline-flex items-center gap-1.5 bg-gok-300 text-gok-900`} {...go(CURVES.present, 0.6)}>
        <Check size={12} strokeWidth={3} aria-hidden /> {label}
      </motion.span>
    );
  }
  if (step === 4)
    return (
      <>
        <motion.span key="p4q" className={`${chip} bg-gok-300 text-gok-900`} {...go(CURVES.query, 0.5)}>
          {l.query}
        </motion.span>
        <motion.span key="p4a" className={`${chip} inline-flex items-center gap-1.5 bg-[var(--flow-ok)] text-ink-band`} {...go(CURVES.answer, 1.9)}>
          <Check size={12} strokeWidth={3} aria-hidden /> {x.listed}
        </motion.span>
      </>
    );
  return null;
}

/* ------------------------------------------------------------------ masaüstü sahne */

function pos(cx: number, top: number, w: number): CSSProperties {
  return { left: `${((cx - w / 2) / W) * 100}%`, top: `${(top / H) * 100}%`, width: `${(w / W) * 100}%` };
}

function DesktopStage(s: SceneState) {
  const live = new Set(ACTIVE[s.step]);
  return (
    <div className="relative hidden aspect-[1000/590] w-full md:block">
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <marker id="flow-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--gok-300)" />
          </marker>
          <marker id="flow-head-dim" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--flow-line)" />
          </marker>
        </defs>
        {(Object.keys(CURVES) as (keyof typeof CURVES)[]).map((k) => {
          const on = live.has(k);
          return (
            <g key={k}>
              <path d={d(CURVES[k])} fill="none" stroke="var(--flow-line)" strokeWidth="1.5" strokeDasharray="3 6" markerEnd={on ? undefined : "url(#flow-head-dim)"} />
              {on ? (
                <>
                  <motion.path
                    key={`${k}-${s.step}`}
                    d={d(CURVES[k])}
                    fill="none"
                    stroke="var(--gok-300)"
                    strokeWidth="2"
                    markerEnd="url(#flow-head)"
                    initial={s.animate ? { pathLength: 0 } : false}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.55, ease: EASE, delay: k === "answer" ? 1.4 : 0 }}
                  />
                  <path d={d(CURVES[k])} fill="none" stroke="var(--ink-band-fg)" strokeOpacity="0.55" strokeWidth="2" className="flow-dash" />
                </>
              ) : null}
            </g>
          );
        })}
      </svg>

      <div className="absolute" style={pos(500, 18, 330)}>
        <TrustPanel {...s} />
      </div>
      <div className="absolute" style={pos(135, 262, 250)}>
        <IssuerPanel {...s} />
      </div>
      <div className="absolute" style={pos(500, 218, 252)}>
        <WalletPanel {...s} />
      </div>
      <div className="absolute" style={pos(865, 262, 255)}>
        <VerifierPanel {...s} />
      </div>

      {s.animate ? <Packet {...s} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ telefon sahnesi */
/*
 * Telefonda iki katman, ikisinin de yüksekliği sabit (geçişte sayfa zıplamaz):
 * üstte dört tarafın küçük haritası (oklar ve kayan nokta), altta o adımda işi yapan tarafın paneli (yerinde soluklaşarak değişir).
 */

const MINI_W = 360;
const MINI_H = 210;
const MINI_NODES = { trust: [180, 34], issuer: [52, 150], wallet: [180, 150], verifier: [308, 150] } as const;
const MINI_CURVES: Record<keyof typeof CURVES, Curve> = {
  issue: [[76, 150], [100, 150], [130, 150], [156, 150]],
  request: [[290, 136], [262, 112], [228, 112], [200, 136]],
  present: [[200, 164], [228, 190], [262, 190], [290, 164]],
  query: [[308, 126], [308, 80], [260, 38], [206, 36]],
  answer: [[206, 46], [252, 50], [292, 84], [296, 128]],
};
const FOCUS: ("issuer" | "wallet" | "verifier")[] = ["issuer", "wallet", "wallet", "verifier", "verifier"];

function MiniMap({ l, step, animate }: SceneState) {
  const live = new Set(ACTIVE[step]);
  const nodes: [keyof typeof MINI_NODES, string, React.ReactNode][] = [
    ["trust", l.trust, <ListChecks key="t" size={15} />],
    ["issuer", l.issuer, <Building2 key="i" size={15} />],
    ["wallet", l.wallet, <Wallet key="w" size={15} />],
    ["verifier", l.verifier, <ScanLine key="v" size={15} />],
  ];
  const lit: Record<keyof typeof MINI_NODES, boolean> = {
    trust: step === 4,
    issuer: step <= 1,
    wallet: step >= 1 && step <= 3,
    verifier: step >= 2,
  };
  return (
    <div className="relative w-full" style={{ aspectRatio: `${MINI_W} / ${MINI_H}` }}>
      <svg viewBox={`0 0 ${MINI_W} ${MINI_H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        {(Object.keys(MINI_CURVES) as (keyof typeof CURVES)[]).map((k) => (
          <g key={k}>
            <path d={d(MINI_CURVES[k])} fill="none" stroke="var(--flow-line)" strokeWidth="1.2" strokeDasharray="2 4" />
            {live.has(k) ? (
              <>
                <path d={d(MINI_CURVES[k])} fill="none" stroke="var(--gok-300)" strokeWidth="1.6" strokeOpacity="0.55" />
                <path d={d(MINI_CURVES[k])} fill="none" stroke="var(--ink-band-fg)" strokeOpacity="0.7" strokeWidth="1.6" className="flow-dash" />
                {animate ? (
                  <circle r="4.5" fill={k === "answer" ? "var(--flow-ok)" : "var(--gold-bright)"}>
                    <animateMotion dur="1.6s" repeatCount="indefinite" begin={k === "answer" ? "0.8s" : "0s"} path={d(MINI_CURVES[k])} />
                  </circle>
                ) : null}
              </>
            ) : null}
          </g>
        ))}
      </svg>
      {nodes.map(([k, label, icon]) => {
        const [x, y] = MINI_NODES[k];
        return (
          <div
            key={k}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${(x / MINI_W) * 100}%`, top: `${(y / MINI_H) * 100}%`, width: "30%" }}
          >
            <span
              className={`grid size-9 place-items-center rounded-xl border transition-colors duration-500 ${
                lit[k]
                  ? "border-gok-300 bg-gok-300 text-gok-900 shadow-[0_0_0_4px_color-mix(in_oklab,var(--gok-300)_18%,transparent)]"
                  : "border-[var(--flow-line)] bg-[color-mix(in_oklab,var(--ink-band)_80%,var(--gok-900))] text-ink-band-muted"
              }`}
              aria-hidden
            >
              {icon}
            </span>
            <span className={`line-clamp-2 text-center text-[10px] leading-tight ${lit[k] ? "text-ink-band-fg" : "text-ink-band-muted"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function MobileStage(s: SceneState) {
  const focus = FOCUS[s.step];
  const panel = focus === "issuer" ? <IssuerPanel {...s} /> : focus === "wallet" ? <WalletPanel {...s} /> : <VerifierPanel {...s} />;
  return (
    <div className="grid gap-3 md:hidden">
      <MiniMap {...s} />
      <div className="relative h-[22rem] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={focus}
            className="absolute inset-x-0 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ bileşen */

export function HowItWorks({ locale }: { locale: string }) {
  const key = ((locale as keyof typeof L) in L ? locale : "en") as keyof typeof L;
  const l = L[key];
  const x = XL[key];
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [shared, setShared] = useState<Set<number>>(() => new Set([l.fields.length - 1]));
  const [tampered, setTampered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const vis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  const running = playing && inView && visible && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS), DURATIONS[step]);
    return () => window.clearTimeout(t);
  }, [running, step]);

  const go = useCallback((n: number) => setStep(((n % STEPS) + STEPS) % STEPS), []);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      setPlaying(false);
      go(step + (e.key === "ArrowRight" ? 1 : -1));
    }
  };
  const onToggle = (i: number) => {
    setPlaying(false);
    setShared((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    if (step < 3) setStep(3);
  };
  const onTamper = () => {
    if (tampered) {
      setTampered(false);
      setShared(new Set([l.fields.length - 1]));
      setStep(0);
      setPlaying(true);
      return;
    }
    setTampered(true);
    setShared((prev) => new Set([...prev, 0]));
    setStep(3);
    setPlaying(true);
  };

  // Hareket azaltılmışsa ya da sunucu çiziminde: son adımın tam, okunur hâli.
  const shownStep = reduced ? 4 : step;
  const s: SceneState = { l, x, step: shownStep, shared, tampered, animate: inView && !reduced, onToggle };

  return (
    <div ref={ref} className="grid gap-6" role="group" aria-label={l.title} onKeyDown={onKey}>
      <div className="flow-stage overflow-hidden rounded-2xl border border-[var(--flow-line)] p-3 sm:p-5">
        <DesktopStage {...s} />
        <MobileStage {...s} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        {/* Bütün adım metinleri aynı hücrede üst üste: kutu en uzununa göre boy alır, geçişte sayfa zıplamaz. */}
        <div className="grid">
          {l.steps.map((st, i) => (
            <div
              key={st.title}
              aria-hidden={i !== shownStep}
              aria-live={i === shownStep ? "polite" : undefined}
              className={`[grid-area:1/1] transition-opacity duration-300 ${i === shownStep ? "opacity-100" : "pointer-events-none invisible opacity-0"}`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                {l.step} {i + 1} / {STEPS}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{st.title}</h3>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-foreground-muted">{st.body}</p>
              <p className={`mt-2 text-sm text-gold ${i >= 2 ? "" : "invisible"}`}>{x.pickHint}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:justify-items-end">
          {!reduced ? (
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" role="tablist" aria-label={l.title}>
                {l.steps.map((st, i) => (
                  <button
                    key={st.title}
                    type="button"
                    role="tab"
                    aria-selected={i === step}
                    aria-label={`${l.step} ${i + 1}: ${st.title}`}
                    onClick={() => {
                      setPlaying(false);
                      go(i);
                    }}
                    className="group grid gap-1.5 py-1"
                  >
                    <span className={`font-mono text-[11px] ${i === step ? "text-foreground" : "text-foreground-subtle"}`}>{i + 1}</span>
                    <span className="block h-1 w-10 overflow-hidden rounded-full bg-border-strong sm:w-12">
                      <span
                        key={`bar-${step}-${running}`}
                        className={`block h-full bg-primary ${i < step ? "w-full" : i === step ? (running ? "flow-bar w-full" : "w-full opacity-60") : "w-0"}`}
                        style={i === step && running ? { animationDuration: `${DURATIONS[i]}ms` } : undefined}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button type="button" className="grid size-9 place-items-center rounded-md border border-border-strong text-foreground hover:bg-surface" aria-label={l.prev} onClick={() => { setPlaying(false); go(step - 1); }}>
                  <ChevronLeft size={17} aria-hidden />
                </button>
                <button type="button" className="grid size-9 place-items-center rounded-md border border-border-strong text-foreground hover:bg-surface" aria-label={playing ? l.pause : l.play} aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
                  {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
                </button>
                <button type="button" className="grid size-9 place-items-center rounded-md border border-border-strong text-foreground hover:bg-surface" aria-label={l.next} onClick={() => { setPlaying(false); go(step + 1); }}>
                  <ChevronRight size={17} aria-hidden />
                </button>
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle">{x.tryIt}</span>
            <button
              type="button"
              onClick={onTamper}
              aria-pressed={tampered}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                tampered ? "border-primary bg-primary text-primary-contrast" : "border-border-strong text-foreground hover:bg-surface"
              }`}
            >
              {tampered ? <RotateCcw size={14} aria-hidden /> : <PenLine size={14} aria-hidden />}
              {tampered ? x.untamper : x.tamper}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

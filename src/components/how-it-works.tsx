"use client";

/*
 * "Nasıl çalışır" — animasyonlu, adım adım anlatım (2026-10-02).
 * Sahne: belge veren kurum (sol) · kişinin cüzdanı (orta) · doğrulayan (sağ) · güven listesi (üst orta).
 * Beş adım: belge hazırlanır (her alan ayrı mühür) → cüzdana gider → doğrulayan sorar → yalnız gereken gider →
 * güven listesine sorulur, cevap döner. Görünür olunca kendiliğinden ilerler; Oynat/Duraklat, adım düğmeleri, önceki/sonraki.
 * Masaüstü yatay sahne; telefonda farklı, dikey düzen (küçük iz + belge kartı). Hareket azaltma: beş adım sabit dizi.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Building2, Check, ChevronLeft, ChevronRight, ListChecks, Pause, Play, ScanLine, Wallet } from "lucide-react";

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

const L: Record<"tr" | "en" | "tk", Labels> = {
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
};

/** Her adımın süresi (ms): son adımda soru-cevap gidip geldiği için daha uzun. */
const DURATIONS = [3800, 3200, 3000, 4000, 4600];
const STEPS = 5;

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

/* ------------------------------------------------------------------ belge kartı */

function CredentialCard({
  l,
  step,
  animate,
  compact = false,
}: {
  l: Labels;
  step: number;
  animate: boolean;
  compact?: boolean;
}) {
  const hashing = step === 0 && animate;
  const redacted = step >= 3;
  return (
    <div className={`hw-card ${compact ? "hw-card-compact" : ""}`} data-step={step}>
      <div className="hw-card-head">
        <span className="hw-card-title">{l.cardTitle}</span>
        <span className="hw-card-issuer">{l.cardIssuer}</span>
      </div>
      <ul className="hw-fields">
        {l.fields.map(([k, v], i) => {
          const keep = i === l.fields.length - 1;
          const hide = redacted && !keep;
          return (
            <li key={k} className={`hw-field ${hide ? "is-hidden" : ""} ${redacted && keep ? "is-kept" : ""}`}>
              <span className="hw-field-k">{k}</span>
              <span className="hw-field-v">
                <span className="hw-field-text">{v}</span>
                {hide ? (
                  <span
                    className={`hw-redact ${step === 3 && animate ? "is-anim" : ""}`}
                    style={{ animationDelay: `${i * 120}ms` } as CSSProperties}
                    aria-label={l.hidden}
                  />
                ) : null}
              </span>
              <span
                className={`hw-hash ${hashing ? "is-anim" : ""}`}
                style={{ animationDelay: `${300 + i * 260}ms` } as CSSProperties}
                aria-hidden="true"
              >
                #
              </span>
            </li>
          );
        })}
      </ul>
      <div className="hw-card-foot">
        <span
          className={`hw-seal ${hashing ? "is-anim" : ""}`}
          style={{ animationDelay: hashing ? "1900ms" : "0ms" } as CSSProperties}
        >
          <Check size={12} strokeWidth={3} aria-hidden="true" />
          {l.sealed}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ masaüstü sahne */

function ActorNode({
  icon,
  title,
  sub,
  className,
  active,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  className: string;
  active: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`hw-node ${className} ${active ? "is-active" : ""}`}>
      <span className="hw-node-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="hw-node-text">
        <span className="hw-node-title">{title}</span>
        <span className="hw-node-sub">{sub}</span>
      </span>
      {children}
    </div>
  );
}

function DesktopStage({ l, step, animate }: { l: Labels; step: number; animate: boolean }) {
  // Kartın yeri: 1. adımda kurumda, sonra cüzdanda.
  const cardX = step === 0 ? "16.666%" : "50%";
  const moveCard = step === 1 && animate;
  const active = {
    issuer: step === 0 || step === 1,
    wallet: step >= 1 && step <= 3,
    verifier: step >= 2,
    trust: step === 4,
  };
  return (
    <div className="hw-stage" aria-hidden="true">
      <svg className="hw-lines" viewBox="0 0 1000 480" preserveAspectRatio="none">
        <path d="M166 420 H834" />
        <path className="hw-line-faint" d="M500 98 C 500 200, 166 250, 166 372" />
        <path className="hw-line-faint" d="M500 98 V 372" />
        <path className={`hw-line-faint ${step === 4 ? "is-live" : ""}`} d="M500 98 C 500 200, 834 250, 834 372" />
      </svg>

      <div className={`hw-trust ${active.trust ? "is-active" : ""}`}>
        <div className="hw-trust-head">
          <ListChecks size={16} aria-hidden="true" />
          <span className="hw-node-title">{l.trust}</span>
          <span className="hw-node-sub">{l.trustSub}</span>
        </div>
        <ul className="hw-trust-rows">
          {l.rows.map(([cc, name], i) => (
            <li key={name} className={`hw-trust-row ${i === 0 && step === 4 && animate ? "is-hit" : ""} ${i === 0 && step === 4 && !animate ? "is-hit-static" : ""}`}>
              <span className="hw-cc">{cc}</span>
              <span>{name}</span>
              <Check size={13} strokeWidth={3} className="hw-row-check" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>

      <ActorNode className="hw-at-issuer" icon={<Building2 size={18} />} title={l.issuer} sub={l.issuerSub} active={active.issuer} />
      <ActorNode className="hw-at-wallet" icon={<Wallet size={18} />} title={l.wallet} sub={l.walletSub} active={active.wallet} />
      <ActorNode className="hw-at-verifier" icon={<ScanLine size={18} />} title={l.verifier} sub={l.verifierSub} active={active.verifier}>
        {step === 4 ? (
          <span className={`hw-verified ${animate ? "is-anim" : ""}`}>
            <Check size={13} strokeWidth={3} aria-hidden="true" />
            {l.verified}
          </span>
        ) : null}
      </ActorNode>

      {/* Belge kartı: kurumdan cüzdana kayar */}
      <div
        key={`card-${step}`}
        className={`hw-card-slot ${moveCard ? "is-moving" : ""}`}
        style={{ "--x": cardX } as CSSProperties}
      >
        <CredentialCard l={l} step={step} animate={animate} />
      </div>

      {/* 3: istek doğrulayandan cüzdana */}
      {step === 2 ? (
        <span key="req" className={`hw-pill hw-pill-req ${animate ? "is-anim" : "is-static"}`}>
          {l.request}
        </span>
      ) : null}

      {/* 4–5: en küçük sunum cüzdandan doğrulayana */}
      {step >= 3 ? (
        <div key={`mini-${step}`} className={`hw-mini ${step === 3 && animate ? "is-anim" : "is-at-verifier"}`}>
          <span className="hw-mini-row">
            <span className="hw-field-k">{l.fields[l.fields.length - 1][0]}</span>
            <span className="hw-mini-v">{l.fields[l.fields.length - 1][1]}</span>
          </span>
          <span className="hw-mini-seal">
            <Check size={11} strokeWidth={3} aria-hidden="true" />
            {l.sealed}
          </span>
        </div>
      ) : null}

      {/* 5: listeye soru ve cevap */}
      {step === 4 ? (
        <>
          <span key="q" className={`hw-pill hw-pill-query ${animate ? "is-anim" : "is-static"}`}>
            {l.query}
          </span>
          <span key="r" className={`hw-pill hw-pill-resp ${animate ? "is-anim" : "is-static"}`}>
            <Check size={12} strokeWidth={3} aria-hidden="true" />
            {l.response}
          </span>
        </>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ telefon düzeni */

const TRACK: { key: "issuer" | "wallet" | "verifier" | "trust"; icon: React.ReactNode }[] = [
  { key: "issuer", icon: <Building2 size={16} /> },
  { key: "wallet", icon: <Wallet size={16} /> },
  { key: "verifier", icon: <ScanLine size={16} /> },
  { key: "trust", icon: <ListChecks size={16} /> },
];

/** Telefonda her adımın hareketi: hangi iki durak arasında bir şey taşınıyor. */
const MOBILE_MOVE: [number, number][] = [
  [0, 0],
  [0, 1],
  [2, 1],
  [1, 2],
  [2, 3],
];

function MobileStage({ l, step, animate }: { l: Labels; step: number; animate: boolean }) {
  const [from, to] = MOBILE_MOVE[step];
  const name = { issuer: l.issuer, wallet: l.wallet, verifier: l.verifier, trust: l.trust };
  const activeSet = new Set([from, to]);
  return (
    <div className="hw-mobile" aria-hidden="true">
      <div className="hw-track">
        <span className="hw-track-line" />
        {TRACK.map((t, i) => (
          <span key={t.key} className={`hw-stop ${activeSet.has(i) ? "is-active" : ""}`} style={{ "--i": i } as CSSProperties}>
            <span className="hw-stop-icon">{t.icon}</span>
            <span className="hw-stop-label">{name[t.key]}</span>
          </span>
        ))}
        {from !== to ? (
          <span
            key={`dot-${step}`}
            className={`hw-dot ${animate ? "is-anim" : ""} ${step === 4 ? "is-roundtrip" : ""}`}
            style={{ "--from": from, "--to": to } as CSSProperties}
          />
        ) : null}
      </div>
      <div className="hw-mobile-card">
        {step === 2 ? <span className="hw-chip hw-chip-req">{l.request}</span> : null}
        {step === 4 ? (
          <span className="hw-chip hw-chip-ok">
            <Check size={12} strokeWidth={3} aria-hidden="true" />
            {l.response}
          </span>
        ) : null}
        <CredentialCard l={l} step={step} animate={animate} compact />
        {step === 4 ? (
          <span className="hw-verified hw-verified-mobile">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
            {l.verified}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ bileşen */

export function HowItWorks({ locale }: { locale: string }) {
  const l = L[(locale as keyof typeof L) in L ? (locale as keyof typeof L) : "en"];
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
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
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPlaying(false);
      go(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPlaying(false);
      go(step - 1);
    }
  };

  if (reduced) {
    return (
      <ol className="hw-static" aria-label={l.title}>
        {l.steps.map((s, i) => (
          <li key={s.title} className="hw-static-step">
            <span className="hw-static-num">{i + 1}</span>
            <div className="hw-static-body">
              <h3 className="hw-caption-title">{s.title}</h3>
              <p className="hw-caption-text">{s.body}</p>
            </div>
            <MobileStage l={l} step={i} animate={false} />
          </li>
        ))}
      </ol>
    );
  }

  const animate = inView;
  const cur = l.steps[step];
  return (
    <div ref={ref} className="hw" role="group" aria-roledescription="carousel" aria-label={l.title} onKeyDown={onKey}>
      <DesktopStage l={l} step={step} animate={animate} />
      <MobileStage l={l} step={step} animate={animate} />

      <div className="hw-controls">
        <div className="hw-chips" role="tablist" aria-label={l.title}>
          {l.steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-label={`${l.step} ${i + 1}: ${s.title}`}
              className={`hw-chipbtn ${i === step ? "is-current" : ""} ${i < step ? "is-done" : ""}`}
              onClick={() => {
                setPlaying(false);
                go(i);
              }}
            >
              <span className="hw-chipbtn-num">{i + 1}</span>
              <span className="hw-chipbtn-bar">
                <span
                  key={`bar-${step}-${running}`}
                  className={`hw-chipbtn-fill ${i === step && running ? "is-running" : ""}`}
                  style={{ animationDuration: `${DURATIONS[i]}ms` } as CSSProperties}
                />
              </span>
            </button>
          ))}
        </div>
        <div className="hw-buttons">
          <button type="button" className="hw-iconbtn" aria-label={l.prev} onClick={() => { setPlaying(false); go(step - 1); }}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="hw-iconbtn"
            aria-label={playing ? l.pause : l.play}
            aria-pressed={!playing}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
          <button type="button" className="hw-iconbtn" aria-label={l.next} onClick={() => { setPlaying(false); go(step + 1); }}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="hw-caption" aria-live="polite">
        <span className="hw-caption-step">
          {l.step} {step + 1} / {STEPS}
        </span>
        <h3 className="hw-caption-title">{cur.title}</h3>
        <p className="hw-caption-text">{cur.body}</p>
      </div>
    </div>
  );
}

/*
 * Ana sayfa ve "Öğren" şemaları (2026-10-02; 2026-11-18 yeniden çizim).
 * Dil: güven akışı sahnesiyle aynı koyu "ekran" (her iki temada), pencere başlığı, ince nokta ızgara, üstten gök ışığı;
 * paneller koyu yüzey + ince çizgi, vurgu gök-300, mühür altın, ret kırmızı. Etkin bağlantılarda akan kesik çizgi (flow-dash),
 * birkaç yerde sakin döngü (flow-spin / flow-scan). Hareket reduced-motion'da kapalı (globals.css).
 * Renkler yalnız globals.css tokenlarından; metinler dile göre dışarıdan gelir (content/home.tsx).
 */
import type { ReactNode } from "react";

const MONO = "var(--font-mono), ui-monospace, monospace";
const SANS = "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif";
const DISPLAY = "var(--font-onest), ui-sans-serif, system-ui, sans-serif";

const C = {
  bg: "var(--ink-band)",
  panel: "var(--flow-panel)",
  panel2: "var(--flow-panel-2)",
  line: "var(--flow-line)",
  text: "var(--ink-band-fg)",
  muted: "var(--ink-band-muted)",
  accent: "var(--gok-300)",
  accentDeep: "var(--gok-900)",
  gold: "var(--gold-bright)",
  ok: "var(--flow-ok)",
  bad: "var(--flow-bad)",
};

const CHROME = 34;

function slug(title: string) {
  return title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24) || "dg";
}

function Frame({
  title,
  desc,
  viewBox,
  children,
  className = "",
}: {
  title: string;
  desc: string;
  viewBox: string;
  children: ReactNode;
  className?: string;
}) {
  const id = slug(title);
  const [, , w, h] = viewBox.split(" ").map(Number);
  const H = h + CHROME;
  return (
    <svg viewBox={`0 0 ${w} ${H}`} role="img" aria-labelledby={`${id}-t ${id}-d`} className={`h-auto w-full ${className}`} style={{ maxWidth: "100%" }}>
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <defs>
        <pattern id={`${id}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="var(--ink-band-fg)" opacity="0.07" />
        </pattern>
        <radialGradient id={`${id}-glow`} cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="var(--gok-700)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--gok-700)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-head`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--gok-600)" />
          <stop offset="100%" stopColor="var(--gok-800)" />
        </linearGradient>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={C.accent} />
        </marker>
        <marker id={`${id}-arrow-muted`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={C.line} />
        </marker>
      </defs>
      <rect width={w} height={H} rx="16" fill={C.bg} />
      <rect width={w} height={H} rx="16" fill={`url(#${id}-glow)`} />
      <rect width={w} height={H} rx="16" fill={`url(#${id}-dots)`} />
      <rect x="0.75" y="0.75" width={w - 1.5} height={H - 1.5} rx="15.5" fill="none" stroke={C.line} strokeWidth="1.5" />
      {/* pencere başlığı */}
      <g>
        {[18, 32, 46].map((x) => (
          <circle key={x} cx={x} cy={CHROME / 2} r="3.6" fill={C.line} />
        ))}
        <text x="64" y={CHROME / 2 + 4} fontFamily={MONO} fontSize="10.5" letterSpacing="1.2" fill={C.muted}>
          {title.toLocaleUpperCase()}
        </text>
        <line x1="0" x2={w} y1={CHROME} y2={CHROME} stroke={C.line} strokeWidth="1" />
      </g>
      <g transform={`translate(0 ${CHROME})`}>{children}</g>
    </svg>
  );
}

const arrowId = (title: string, muted = false) => `url(#${slug(title)}-arrow${muted ? "-muted" : ""})`;
const headId = (title: string) => `url(#${slug(title)}-head)`;

/** Bağlantı: etkinse gök çizgi + üstünde akan kesik çizgi; değilse sönük kesik çizgi. */
function Wire({ d, live = true, arrow, title }: { d: string; live?: boolean; arrow?: boolean; title: string }) {
  if (!live) return <path d={d} fill="none" stroke={C.line} strokeWidth="1.5" strokeDasharray="3 5" markerEnd={arrow ? arrowId(title, true) : undefined} />;
  return (
    <g>
      <path d={d} fill="none" stroke={C.accent} strokeOpacity="0.45" strokeWidth="1.6" markerEnd={arrow ? arrowId(title) : undefined} />
      <path d={d} fill="none" stroke={C.text} strokeOpacity="0.65" strokeWidth="1.6" className="flow-dash" />
    </g>
  );
}

function Panel({ x, y, w, h, accent = false, rx = 12 }: { x: number; y: number; w: number; h: number; accent?: boolean; rx?: number }) {
  return (
    <g>
      {accent ? <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={rx + 3} fill="none" stroke={C.accent} strokeOpacity="0.18" strokeWidth="5" /> : null}
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={C.panel} stroke={accent ? C.accent : C.line} strokeWidth="1.3" />
    </g>
  );
}

function Chip({ x, y, text, tone = "accent", w }: { x: number; y: number; text: string; tone?: "accent" | "muted" | "gold" | "ok"; w?: number }) {
  const width = w ?? text.length * 6.4 + 14;
  const fill = { accent: "var(--gok-300)", muted: "var(--flow-line)", gold: C.gold, ok: C.ok }[tone];
  const color = tone === "muted" ? C.muted : C.accentDeep;
  return (
    <g>
      <rect x={x} y={y} width={width} height="18" rx="5" fill={fill} fillOpacity={tone === "accent" ? 0.16 : tone === "muted" ? 0.6 : 1} />
      <text x={x + width / 2} y={y + 12.5} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill={tone === "accent" ? C.accent : color}>
        {text}
      </text>
    </g>
  );
}

function Check({ x, y, r = 11, tone = "gold" }: { x: number; y: number; r?: number; tone?: "gold" | "ok" }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={tone === "gold" ? C.gold : C.ok} />
      <path d={`M${x - r * 0.42} ${y} l${r * 0.3} ${r * 0.3} l${r * 0.55} -${r * 0.6}`} fill="none" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Cross({ x, y, r = 10 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.bg} stroke={C.bad} strokeWidth="1.5" />
      <path d={`M${x - r * 0.4} ${y - r * 0.4}l${r * 0.8} ${r * 0.8}M${x + r * 0.4} ${y - r * 0.4}l-${r * 0.8} ${r * 0.8}`} stroke={C.bad} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/* Çizgi simgeler (24×24) */
const I = {
  building: (
    <g fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M2 22h20M4 22V10l8-5 8 5v12M9 22v-6h6v6" />
    </g>
  ),
  phone: (
    <g fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinejoin="round">
      <rect x="6" y="1.5" width="12" height="21" rx="2.5" />
      <path d="M10.5 19h3" />
    </g>
  ),
  scan: (
    <g fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M7 12h10" />
    </g>
  ),
  list: (
    <g fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="2.5" width="18" height="19" rx="2.5" />
      <path d="M7.5 8.5h9M7.5 12.5h9M7.5 16.5h5" />
    </g>
  ),
  person: (
    <g fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" />
    </g>
  ),
};

function Node({ x, y, w, h, label, sub, accent = false, icon }: { x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean; icon?: ReactNode }) {
  return (
    <g>
      <Panel x={x} y={y} w={w} h={h} accent={accent} />
      {icon && (
        <g>
          <rect x={x + 14} y={y + h / 2 - 17} width="34" height="34" rx="9" fill={C.panel2} stroke={C.line} />
          <g transform={`translate(${x + 19} ${y + h / 2 - 12})`}>{icon}</g>
        </g>
      )}
      <text x={x + (icon ? 60 : 18)} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} fontFamily={DISPLAY} fontSize="14.5" fontWeight="600" fill={C.text}>
        {label}
      </text>
      {sub && (
        <text x={x + (icon ? 60 : 18)} y={y + h / 2 + 15} fontFamily={MONO} fontSize="10.5" fill={C.muted}>
          {sub}
        </text>
      )}
    </g>
  );
}

const HASH = ["3a1f…c9", "7c21…0e", "e04b…5a", "19d6…b2", "a3f9…44"];

/* ------------------------------------------------------------------ akış (Öğren) */

export type FlowLabels = {
  title: string;
  desc: string;
  issuer: string;
  issuerSub: string;
  wallet: string;
  walletSub: string;
  verifier: string;
  verifierSub: string;
  signed: string;
  only: string;
  trust: string;
  trustSub: string;
  checks: string;
};

/** Nasıl çalışır: belge veren → cüzdan → doğrulayan; doğrulayan güven listesine bakar. Masaüstünde yatay, telefonda dikey. */
export function FlowDiagram({ l }: { l: FlowLabels }) {
  const t = l.title;
  const tm = `${l.title} `;
  return (
    <>
      <Frame title={t} desc={l.desc} viewBox="0 0 980 360" className="hidden md:block">
        <Node x={40} y={50} w={250} h={78} label={l.issuer} sub={l.issuerSub} icon={I.building} />
        <Node x={365} y={50} w={250} h={78} label={l.wallet} sub={l.walletSub} icon={I.phone} accent />
        <Node x={690} y={50} w={250} h={78} label={l.verifier} sub={l.verifierSub} icon={I.scan} />
        <Wire title={t} d="M294 89 H 359" arrow />
        <Wire title={t} d="M619 89 H 684" arrow />
        <text x="326" y="74" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.signed}</text>
        <text x="651" y="74" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.only}</text>
        <Node x={290} y={236} w={400} h={78} label={l.trust} sub={l.trustSub} icon={I.list} />
        <Wire title={t} d="M815 134 C 815 200, 760 275, 698 275" arrow />
        <Wire title={t} d="M165 134 C 165 200, 220 275, 282 275" live={false} arrow />
        <text x="830" y="205" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.checks}</text>
      </Frame>
      <Frame title={tm} desc={l.desc} viewBox="0 0 360 520" className="md:hidden">
        <Node x={24} y={20} w={312} h={70} label={l.issuer} sub={l.issuerSub} icon={I.building} />
        <Node x={24} y={146} w={312} h={70} label={l.wallet} sub={l.walletSub} icon={I.phone} accent />
        <Node x={24} y={272} w={312} h={70} label={l.verifier} sub={l.verifierSub} icon={I.scan} />
        <Wire title={tm} d="M180 94 V 140" arrow />
        <Wire title={tm} d="M180 220 V 266" arrow />
        <text x="192" y="121" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.signed}</text>
        <text x="192" y="247" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.only}</text>
        <Node x={24} y={420} w={312} h={70} label={l.trust} sub={l.trustSub} icon={I.list} />
        <Wire title={tm} d="M180 346 V 414" arrow />
        <text x="192" y="384" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.checks}</text>
      </Frame>
    </>
  );
}

/* ------------------------------------------------------------------ 01 doğrulanabilir belge */

export type CredLabels = { title: string; desc: string; issuer: string; type: string; fields: [string, string][]; seal: string; sig: string };

/** Doğrulanabilir belge: her alanın kendi özeti (hash) ve bütününü bağlayan kurum imzası. */
export function CredentialDiagram({ l }: { l: CredLabels }) {
  const n = l.fields.length;
  const top = 92;
  const row = 34;
  const ph = top - 20 + n * row + 46;
  const foot = 20 + ph - 16;
  return (
    <Frame title={l.title} desc={l.desc} viewBox={`0 0 460 ${ph + 40}`}>
      <Panel x={30} y={20} w={400} h={ph} accent rx={16} />
      <path d="M30 36a16 16 0 0 1 16-16h368a16 16 0 0 1 16 16v38H30z" fill={headId(l.title)} />
      <text x="50" y="44" fontFamily={MONO} fontSize="10" letterSpacing="1" fill="#ffffff" opacity="0.8">{l.issuer.toLocaleUpperCase()}</text>
      <text x="50" y="64" fontFamily={DISPLAY} fontSize="16" fontWeight="600" fill="#ffffff">{l.type}</text>
      {l.fields.map(([k, v], i) => (
        <g key={k}>
          <text x="50" y={top + 14 + i * row} fontFamily={MONO} fontSize="10.5" fill={C.muted}>{k}</text>
          <text x="160" y={top + 14 + i * row} fontFamily={SANS} fontSize="13" fill={C.text}>{v}</text>
          <Chip x={268} y={top + 1 + i * row} text={`#${HASH[i % HASH.length]}`} w={70} />
          {i < n - 1 ? <line x1="50" x2="410" y1={top + 25 + i * row} y2={top + 25 + i * row} stroke={C.line} strokeWidth="0.8" /> : null}
        </g>
      ))}
      {/* özetler imzaya bağlanır */}
      <path d={`M342 ${top + 10} H 356 V ${top + 10 + (n - 1) * row} H 342`} fill="none" stroke={C.accent} strokeOpacity="0.5" strokeWidth="1.3" />
      <Wire title={l.title} d={`M356 ${top + 10 + ((n - 1) * row) / 2} H 372`} />
      <g className="flow-scan">
        <circle cx="392" cy={top + 10 + ((n - 1) * row) / 2} r="17" fill="none" stroke={C.gold} strokeWidth="1.2" strokeDasharray="2 3" />
      </g>
      <Check x={392} y={top + 10 + ((n - 1) * row) / 2} r={12} />
      <text x="50" y={foot} fontFamily={MONO} fontSize="10" fill={C.muted}>{l.sig}</text>
      <text x="410" y={foot} textAnchor="end" fontFamily={MONO} fontSize="10" fill={C.gold}>{l.seal}</text>
    </Frame>
  );
}

/* ------------------------------------------------------------------ 02 seçici paylaşım */

export type DisclosureLabels = { title: string; desc: string; card: string; shared: string; hidden: string; fields: { k: string; v: string; show: boolean }[] };

/** Seçici paylaşım: her alanın kendi kilidi; yalnız seçilen alan açılır ve karşıya gider. */
export function DisclosureDiagram({ l }: { l: DisclosureLabels }) {
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <text x="24" y="30" fontFamily={MONO} fontSize="10" letterSpacing="1" fill={C.muted}>{l.card.toLocaleUpperCase()}</text>
      <text x="272" y="30" fontFamily={MONO} fontSize="10" letterSpacing="1" fill={C.accent}>{l.shared.toLocaleUpperCase()}</text>
      <line x1="248" x2="248" y1="20" y2="280" stroke={C.line} strokeDasharray="2 4" />
      {l.fields.map((f, i) => {
        const y = 44 + i * 58;
        return (
          <g key={f.k}>
            <Panel x={24} y={y} w={196} h={42} accent={f.show} rx={10} />
            <text x="38" y={y + 26} fontFamily={SANS} fontSize="12.5" fill={C.text}>{f.k}</text>
            <Chip x={150} y={y + 12} text={`#${HASH[i % HASH.length].slice(0, 4)}`} w={58} tone={f.show ? "accent" : "muted"} />
            {f.show ? (
              <g>
                <Wire title={l.title} d={`M224 ${y + 21} H 266`} arrow />
                <rect x="272" y={y} width="164" height="42" rx="10" fill="var(--gok-300)" fillOpacity="0.14" stroke={C.accent} strokeWidth="1.3" />
                <text x="288" y={y + 26} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{f.v}</text>
                <Check x={418} y={y + 21} r={8} tone="ok" />
              </g>
            ) : (
              <g>
                <path d={`M224 ${y + 21} H 238`} stroke={C.line} strokeWidth="1.5" strokeDasharray="3 4" />
                <rect x="272" y={y} width="164" height="42" rx="10" fill="none" stroke={C.line} strokeWidth="1.3" strokeDasharray="3 4" />
                <g transform={`translate(288 ${y + 13})`}>
                  <rect x="0" y="5" width="12" height="10" rx="2" fill="none" stroke={C.muted} strokeWidth="1.3" />
                  <path d="M2.5 5V3a3.5 3.5 0 0 1 7 0v2" fill="none" stroke={C.muted} strokeWidth="1.3" />
                </g>
                <text x="308" y={y + 26} fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.hidden}</text>
              </g>
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------------ 03 sıfır bilgi ispatı */

export type ZkLabels = { title: string; desc: string; input: string; inputSub: string; proof: string; output: string; never: string };

/** Sıfır bilgi ispatı: doğum tarihi telefonda kalır → ispat → "18 yaşından büyük" ✓. */
export function ZkDiagram({ l }: { l: ZkLabels }) {
  const [o1, o2] = l.output.split("|");
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <Panel x={20} y={86} w={136} h={74} rx={12} />
      <text x="36" y="112" fontFamily={MONO} fontSize="10" fill={C.muted}>{l.input}</text>
      <text x="36" y="138" fontFamily={DISPLAY} fontSize="15" fontWeight="600" fill={C.text}>{l.inputSub}</text>
      <Wire title={l.title} d="M160 123 H 186" arrow />
      <g>
        <g className="flow-spin" style={{ transformOrigin: "232px 123px" }}>
          <circle cx="232" cy="123" r="44" fill="none" stroke={C.accent} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="1 7" strokeLinecap="round" />
        </g>
        <polygon points={hex(232, 123, 34)} fill={C.panel} stroke={C.accent} strokeWidth="1.5" />
        <text x="232" y="121" textAnchor="middle" fontFamily={MONO} fontSize="13" fontWeight="600" fill={C.accent}>ZK</text>
        <text x="232" y="137" textAnchor="middle" fontFamily={MONO} fontSize="9" fill={C.muted}>{l.proof}</text>
      </g>
      <Wire title={l.title} d="M278 123 H 304" arrow />
      <Panel x={310} y={86} w={130} h={74} accent rx={12} />
      <Check x={332} y={110} r={10} tone="ok" />
      <text x="350" y={o2 ? 115 : 128} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{o1}</text>
      {o2 && <text x="350" y="134" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{o2}</text>}
      {/* doğum tarihi karşıya geçmez */}
      <path d="M88 166 C 88 226, 372 226, 374 166" fill="none" stroke={C.bad} strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="3 5" />
      <Cross x={231} y={211} />
      <text x="230" y="254" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.never}</text>
    </Frame>
  );
}

/* ------------------------------------------------------------------ 04 site başına takma ad */

export type PseudoLabels = { title: string; desc: string; person: string; sites: [string, string][]; cant: string };

/** Site başına takma ad: bir kişi, her sitede başka kimlik; siteler kayıtlarını birbirine bağlayamaz. */
export function PseudonymDiagram({ l }: { l: PseudoLabels }) {
  const ys = [26, 112, 198];
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <g>
        <circle cx="82" cy="135" r="46" fill="none" stroke={C.accent} strokeOpacity="0.2" strokeWidth="6" />
        <circle cx="82" cy="135" r="40" fill={C.panel} stroke={C.accent} strokeWidth="1.4" />
        <g transform="translate(64 116) scale(1.5)">{I.person}</g>
        <text x="82" y="200" textAnchor="middle" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{l.person}</text>
      </g>
      {l.sites.map(([site, id], i) => (
        <g key={site}>
          <Wire title={l.title} d={`M124 135 C 180 135, 186 ${ys[i] + 26}, 244 ${ys[i] + 26}`} arrow />
          <Panel x={250} y={ys[i]} w={186} h={52} rx={11} />
          <text x="266" y={ys[i] + 22} fontFamily={SANS} fontSize="12.5" fill={C.text}>{site}</text>
          <text x="266" y={ys[i] + 40} fontFamily={MONO} fontSize="10.5" fill={C.accent}>{id}</text>
        </g>
      ))}
      {/* siteler arasında bağ kurulamaz */}
      {[0, 1].map((i) => (
        <g key={i}>
          <path d={`M420 ${ys[i] + 52} V ${ys[i + 1]}`} stroke={C.bad} strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="3 4" />
          <Cross x={420} y={(ys[i] + 52 + ys[i + 1]) / 2} r={8} />
        </g>
      ))}
      <text x="343" y="272" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={C.muted}>{l.cant}</text>
    </Frame>
  );
}

/* ------------------------------------------------------------------ 05 güven zinciri */

export type ChainLabels = { title: string; desc: string; steps: [string, string][]; signs: string };

/** Güven zinciri: listelerin listesi → ülke listesi → kurum sertifikası → belge; her halka bir alttakini imzalar. */
export function TrustChainDiagram({ l }: { l: ChainLabels }) {
  const n = l.steps.length;
  const gap = 66;
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <Wire title={l.title} d={`M64 ${46} V ${22 + (n - 1) * gap + 26}`} />
      {l.steps.map(([t, s], i) => {
        const y = 22 + i * gap;
        const first = i === 0;
        const last = i === n - 1;
        return (
          <g key={t}>
            <circle cx="64" cy={y + 25} r="9" fill={first ? C.gold : C.panel} stroke={first ? C.gold : C.accent} strokeWidth="1.4" />
            {last ? <Check x={64} y={y + 25} r={9} tone="ok" /> : null}
            <Panel x={90} y={y} w={278} h={50} accent={first} rx={11} />
            <text x="108" y={y + 22} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{t}</text>
            <text x="108" y={y + 39} fontFamily={MONO} fontSize="10.5" fill={C.muted}>{s}</text>
            {i < n - 1 ? (
              <g>
                <path d={`M368 ${y + 30} C 394 ${y + 30}, 394 ${y + gap + 20}, 372 ${y + gap + 20}`} fill="none" stroke={C.accent} strokeOpacity="0.5" strokeWidth="1.3" markerEnd={arrowId(l.title)} />
                <text x="400" y={y + 52} fontFamily={MONO} fontSize="9.5" fill={C.muted}>{l.signs}</text>
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------------ yönetişim rolleri */

export type RolesLabels = { title: string; desc: string; operator: string; registrar: string; states: string; network: string };

/** Yönetişim: ortada ağın kuralları (çekirdek), çevresinde işletmeci, kayıt kurumu ve devlet listeleri; hepsi kurallara bağlı. */
export function RolesDiagram({ l }: { l: RolesLabels }) {
  const [rule, sub] = l.network.split("|");
  const cx = 230;
  const cy = 138;
  const roles: [number, number, string][] = [
    [104, 52, l.operator],
    [356, 52, l.registrar],
    [230, 262, l.states],
  ];
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      {/* yörünge */}
      <circle cx={cx} cy={cy} r="98" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="2 6" />
      <g className="flow-spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy - 98} r="3" fill={C.gold} />
      </g>
      {roles.map(([x, y]) => (
        <Wire key={`${x}-${y}`} title={l.title} d={`M${x} ${y} L ${cx + (x - cx) * 0.45} ${cy + (y - cy) * 0.45}`} />
      ))}
      {/* çekirdek */}
      <circle cx={cx} cy={cy} r="58" fill="none" stroke={C.accent} strokeOpacity="0.18" strokeWidth="8" />
      <circle cx={cx} cy={cy} r="52" fill={C.panel} stroke={C.accent} strokeWidth="1.5" />
      <text x={cx} y={cy - 2} textAnchor="middle" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill={C.text}>{rule}</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={C.accent}>{sub ?? ""}</text>
      {roles.map(([x, y, t]) => (
        <g key={t}>
          <rect x={x - 76} y={y - 19} width="152" height="38" rx="10" fill={C.panel} stroke={C.line} strokeWidth="1.3" />
          <text x={x} y={y + 4.5} textAnchor="middle" fontFamily={SANS} fontSize="12" fill={C.text}>{t}</text>
        </g>
      ))}
    </Frame>
  );
}

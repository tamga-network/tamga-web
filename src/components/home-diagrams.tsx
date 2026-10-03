/*
 * Ana sayfa diyagramları (2026-10-02): satır içi SVG, renkler tema tokenlarından (--dg-*), tek çizgi kalınlığı (1.5),
 * yuvarlatılmış düğümler, mono etiketler, ince ızgara. Hareket yalnız "dg-fade" sınıfında ve reduced-motion'da kapalı.
 * Metinler dile göre dışarıdan gelir (content/home.tsx).
 */
import type { ReactNode } from "react";

const MONO = "var(--font-mono), ui-monospace, monospace";
const SANS = "var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif";
const DISPLAY = "var(--font-onest), ui-sans-serif, system-ui, sans-serif";

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
  const id = title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24) || "dg";
  const [, , w, h] = viewBox.split(" ").map(Number);
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      className={`h-auto w-full ${className}`}
      style={{ maxWidth: "100%" }}
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <defs>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--dg-grid)" strokeWidth="1" />
        </pattern>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dg-accent)" />
        </marker>
        <marker id={`${id}-arrow-muted`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dg-line-strong)" />
        </marker>
      </defs>
      <rect x="0" y="0" width={w} height={h} rx="16" fill="var(--dg-surface-2)" />
      <rect x="0" y="0" width={w} height={h} rx="16" fill={`url(#${id}-grid)`} />
      <g>{children}</g>
    </svg>
  );
}

/** Ok başı kimliği için kısa yol: Frame'deki title'dan türetilen id ile aynı kural. */
const arrowId = (title: string, muted = false) =>
  `url(#${title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 24) || "dg"}-arrow${muted ? "-muted" : ""})`;

function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
  icon,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
  icon?: ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill={accent ? "var(--dg-accent-soft)" : "var(--dg-surface)"}
        stroke={accent ? "var(--dg-accent)" : "var(--dg-line)"}
        strokeWidth="1.5"
      />
      {icon && <g transform={`translate(${x + 18} ${y + h / 2 - 14})`}>{icon}</g>}
      <text x={x + (icon ? 58 : 18)} y={y + (sub ? h / 2 - 3 : h / 2 + 5)} fontFamily={DISPLAY} fontSize="15" fontWeight="600" fill="var(--dg-text)">
        {label}
      </text>
      {sub && (
        <text x={x + (icon ? 58 : 18)} y={y + h / 2 + 15} fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">
          {sub}
        </text>
      )}
    </g>
  );
}

/* Basit çizgi simgeler (28×28), tema rengiyle */
const I = {
  building: (
    <g fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3 26h22M5 26V11l9-6 9 6v15M10 26v-8h8v8" />
      <path d="M9 13h2M17 13h2" />
    </g>
  ),
  phone: (
    <g fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="7" y="2" width="14" height="24" rx="3" />
      <path d="M12 22h4" />
      <rect x="10" y="7" width="8" height="6" rx="1.5" />
    </g>
  ),
  check: (
    <g fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M14 2l10 4v8c0 6-4.5 10-10 12C8.5 24 4 20 4 14V6z" />
      <path d="M9.5 14l3 3 6-6.5" />
    </g>
  ),
  list: (
    <g fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" strokeLinecap="round">
      <rect x="4" y="3" width="20" height="22" rx="3" />
      <path d="M9 10h10M9 15h10M9 20h6" />
    </g>
  ),
};

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

/** Nasıl çalışır: belge veren → cüzdan → doğrulayan; üçü de güven listesine bakar. Masaüstünde yatay, telefonda dikey. */
export function FlowDiagram({ l }: { l: FlowLabels }) {
  const a = arrowId(l.title);
  const am = arrowId(l.title, true);
  return (
    <>
      <Frame title={l.title} desc={l.desc} viewBox="0 0 980 400" className="hidden md:block">
        <Node x={40} y={70} w={250} h={78} label={l.issuer} sub={l.issuerSub} icon={I.building} />
        <Node x={365} y={70} w={250} h={78} label={l.wallet} sub={l.walletSub} icon={I.phone} accent />
        <Node x={690} y={70} w={250} h={78} label={l.verifier} sub={l.verifierSub} icon={I.check} />
        <line x1="296" y1="109" x2="357" y2="109" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={a} />
        <line x1="621" y1="109" x2="682" y2="109" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={a} />
        <text x="326" y="96" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.signed}</text>
        <text x="651" y="96" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.only}</text>
        <Node x={290} y={268} w={400} h={78} label={l.trust} sub={l.trustSub} icon={I.list} />
        {[165, 490, 815].map((x) => (
          <path key={x} d={`M${x} 154 V 214 Q ${x} 228 ${x < 490 ? x + 14 : x > 490 ? x - 14 : x} 228 H ${x < 490 ? 380 : x > 490 ? 600 : x}`} fill="none" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="4 5" />
        ))}
        <line x1="490" y1="154" x2="490" y2="260" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="4 5" markerEnd={am} />
        <line x1="380" y1="228" x2="380" y2="260" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="4 5" markerEnd={am} />
        <line x1="600" y1="228" x2="600" y2="260" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="4 5" markerEnd={am} />
        <text x="490" y="378" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.checks}</text>
      </Frame>
      <Frame title={`${l.title} `} desc={l.desc} viewBox="0 0 360 560" className="md:hidden">
        <Node x={24} y={24} w={312} h={72} label={l.issuer} sub={l.issuerSub} icon={I.building} />
        <Node x={24} y={156} w={312} h={72} label={l.wallet} sub={l.walletSub} icon={I.phone} accent />
        <Node x={24} y={288} w={312} h={72} label={l.verifier} sub={l.verifierSub} icon={I.check} />
        <line x1="180" y1="100" x2="180" y2="150" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={arrowId(`${l.title} `)} />
        <line x1="180" y1="232" x2="180" y2="282" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={arrowId(`${l.title} `)} />
        <text x="192" y="130" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.signed}</text>
        <text x="192" y="262" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.only}</text>
        <Node x={24} y={440} w={312} h={72} label={l.trust} sub={l.trustSub} icon={I.list} />
        <line x1="180" y1="364" x2="180" y2="434" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="4 5" markerEnd={arrowId(`${l.title} `, true)} />
        <text x="192" y="404" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.checks}</text>
      </Frame>
    </>
  );
}

export type CredLabels = { title: string; desc: string; issuer: string; type: string; fields: [string, string][]; seal: string; sig: string };

/** Doğrulanabilir belge: kurumun imzası ve mührüyle bir kart. */
export function CredentialDiagram({ l }: { l: CredLabels }) {
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <rect x="40" y="36" width="380" height="228" rx="18" fill="var(--dg-surface)" stroke="var(--dg-line)" strokeWidth="1.5" />
      <rect x="40" y="36" width="380" height="58" rx="18" fill="var(--dg-accent)" />
      <rect x="40" y="76" width="380" height="18" fill="var(--dg-accent)" />
      <text x="64" y="62" fontFamily={MONO} fontSize="11" fill="#ffffff" opacity="0.85">{l.issuer}</text>
      <text x="64" y="82" fontFamily={DISPLAY} fontSize="16" fontWeight="600" fill="#ffffff">{l.type}</text>
      {l.fields.map(([k, v], i) => (
        <g key={k}>
          <text x="64" y={126 + i * 30} fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{k}</text>
          <text x="196" y={126 + i * 30} fontFamily={SANS} fontSize="13" fill="var(--dg-text)">{v}</text>
        </g>
      ))}
      <circle cx="360" cy="196" r="34" fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <circle cx="360" cy="196" r="26" fill="none" stroke="var(--dg-accent)" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M347 196l9 9 17-18" fill="none" stroke="var(--dg-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="360" y="246" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--dg-muted)">{l.seal}</text>
      <text x="64" y="246" fontFamily={MONO} fontSize="10" fill="var(--dg-muted)">{l.sig}</text>
    </Frame>
  );
}

export type DisclosureLabels = { title: string; desc: string; card: string; shared: string; hidden: string; fields: { k: string; v: string; show: boolean }[] };

/** Seçici paylaşım: her alanın kendi salted hash'i; yalnız seçilen alan açılır. */
export function DisclosureDiagram({ l }: { l: DisclosureLabels }) {
  const a = arrowId(l.title);
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <text x="28" y="34" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.card}</text>
      {l.fields.map((f, i) => (
        <g key={f.k}>
          <rect x="28" y={48 + i * 54} width="196" height="42" rx="10" fill="var(--dg-surface)" stroke={f.show ? "var(--dg-accent)" : "var(--dg-line)"} strokeWidth="1.5" />
          <text x="42" y={74 + i * 54} fontFamily={SANS} fontSize="12.5" fill="var(--dg-text)">{f.k}</text>
          <rect x="156" y={58 + i * 54} width="58" height="22" rx="6" fill="var(--dg-surface-2)" />
          <text x="185" y={73 + i * 54} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="var(--dg-muted)">
            {["#a3f9…", "#7c21…", "#e04b…", "#19d6…"][i % 4]}
          </text>
          <line x1="230" y1={69 + i * 54} x2="262" y2={69 + i * 54} stroke={f.show ? "var(--dg-accent)" : "var(--dg-line)"} strokeWidth="1.5" strokeDasharray={f.show ? undefined : "3 4"} markerEnd={f.show ? a : undefined} />
          {f.show ? (
            <g>
              <rect x="268" y={48 + i * 54} width="164" height="42" rx="10" fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth="1.5" />
              <text x="284" y={74 + i * 54} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{f.v}</text>
            </g>
          ) : (
            <g className="dg-fade">
              <rect x="268" y={48 + i * 54} width="164" height="42" rx="10" fill="var(--dg-surface)" stroke="var(--dg-line)" strokeWidth="1.5" strokeDasharray="3 4" />
              <rect x="284" y={63 + i * 54} width="10" height="12" rx="2" fill="none" stroke="var(--dg-muted)" strokeWidth="1.3" />
              <path d={`M286 ${63 + i * 54}v-3a3 3 0 0 1 6 0v3`} fill="none" stroke="var(--dg-muted)" strokeWidth="1.3" />
              <text x="304" y={74 + i * 54} fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.hidden}</text>
            </g>
          )}
        </g>
      ))}
      <text x="268" y="34" fontFamily={MONO} fontSize="11" fill="var(--dg-accent)">{l.shared}</text>
    </Frame>
  );
}

export type ZkLabels = { title: string; desc: string; input: string; inputSub: string; proof: string; output: string; never: string };

/** Sıfır bilgi ispatı: doğum tarihi → ispat → "18 yaşından büyük" ✓; doğum tarihi gitmez. */
export function ZkDiagram({ l }: { l: ZkLabels }) {
  const a = arrowId(l.title);
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <rect x="24" y="96" width="132" height="70" rx="14" fill="var(--dg-surface)" stroke="var(--dg-line)" strokeWidth="1.5" />
      <text x="40" y="124" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.input}</text>
      <text x="40" y="148" fontFamily={DISPLAY} fontSize="15" fontWeight="600" fill="var(--dg-text)">{l.inputSub}</text>
      <line x1="162" y1="131" x2="196" y2="131" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={a} />
      <circle cx="232" cy="131" r="32" fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <text x="232" y="128" textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="500" fill="var(--dg-accent)">ZK</text>
      <text x="232" y="143" textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="var(--dg-muted)">{l.proof}</text>
      <line x1="268" y1="131" x2="302" y2="131" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={a} />
      <rect x="308" y="96" width="128" height="70" rx="14" fill="var(--dg-surface)" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <path d="M324 131l7 7 13-14" fill="none" stroke="var(--dg-ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="352" y="128" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{l.output.split("|")[0]}</text>
      {l.output.split("|")[1] && (
        <text x="352" y="146" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{l.output.split("|")[1]}</text>
      )}
      <path d="M90 172 C 90 230, 360 230, 372 172" fill="none" stroke="var(--dg-line-strong)" strokeWidth="1.5" strokeDasharray="3 5" />
      <g transform="translate(222 212)">
        <circle r="11" fill="var(--dg-surface)" stroke="#c2410c" strokeWidth="1.5" />
        <path d="M-5 -5l10 10M5 -5l-10 10" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <text x="230" y="254" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.never}</text>
    </Frame>
  );
}

export type PseudoLabels = { title: string; desc: string; person: string; sites: [string, string][]; cant: string };

/** Site başına takma ad: bir kişi, her sitede başka kimlik; siteler birbirine bağlayamaz. */
export function PseudonymDiagram({ l }: { l: PseudoLabels }) {
  const ys = [48, 126, 204];
  const am = arrowId(l.title, true);
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      <circle cx="86" cy="150" r="40" fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <circle cx="86" cy="138" r="11" fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <path d="M66 168c4-10 12-14 20-14s16 4 20 14" fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="86" y="212" textAnchor="middle" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{l.person}</text>
      {l.sites.map(([site, id], i) => (
        <g key={site}>
          <path d={`M128 150 C 190 150, 190 ${ys[i] + 24}, 250 ${ys[i] + 24}`} fill="none" stroke="var(--dg-line-strong)" strokeWidth="1.5" markerEnd={am} />
          <rect x="256" y={ys[i]} width="180" height="48" rx="12" fill="var(--dg-surface)" stroke="var(--dg-line)" strokeWidth="1.5" />
          <text x="272" y={ys[i] + 20} fontFamily={SANS} fontSize="12.5" fill="var(--dg-text)">{site}</text>
          <text x="272" y={ys[i] + 37} fontFamily={MONO} fontSize="11" fill="var(--dg-accent)">{id}</text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(446 ${ys[i] + 63})`}>
          <path d="M-6 -4l12 8M-6 4l12 -8" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      <text x="346" y="284" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--dg-muted)">{l.cant}</text>
    </Frame>
  );
}

export type ChainLabels = { title: string; desc: string; steps: [string, string][]; signs: string };

/** Güven zinciri: LOTL → ülke listesi → kurum sertifikası → belge. */
export function TrustChainDiagram({ l }: { l: ChainLabels }) {
  const a = arrowId(l.title);
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 300">
      {l.steps.map(([t, s], i) => (
        <g key={t}>
          <rect
            x={40 + i * 22}
            y={22 + i * 66}
            width={300}
            height={50}
            rx="12"
            fill={i === 0 ? "var(--dg-accent-soft)" : "var(--dg-surface)"}
            stroke={i === 0 ? "var(--dg-accent)" : "var(--dg-line)"}
            strokeWidth="1.5"
          />
          <text x={58 + i * 22} y={44 + i * 66} fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{t}</text>
          <text x={58 + i * 22} y={61 + i * 66} fontFamily={MONO} fontSize="10.5" fill="var(--dg-muted)">{s}</text>
          {i < l.steps.length - 1 && (
            <g>
              <path d={`M${70 + i * 22} ${72 + i * 66} V ${82 + i * 66} Q ${70 + i * 22} ${88 + i * 66} ${78 + i * 22} ${88 + i * 66}`} fill="none" stroke="var(--dg-accent)" strokeWidth="1.5" markerEnd={a} />
              <text x={360 + i * 22} y={84 + i * 66} fontFamily={MONO} fontSize="10" fill="var(--dg-muted)">{l.signs}</text>
            </g>
          )}
        </g>
      ))}
    </Frame>
  );
}

export type RolesLabels = { title: string; desc: string; operator: string; registrar: string; states: string; network: string };

/** Yönetişim rolleri: işletmeci, kayıt kurumu ve devlet listeleri; ortada ağın kuralları. */
export function RolesDiagram({ l }: { l: RolesLabels }) {
  return (
    <Frame title={l.title} desc={l.desc} viewBox="0 0 460 260">
      <circle cx="230" cy="130" r="54" fill="var(--dg-accent-soft)" stroke="var(--dg-accent)" strokeWidth="1.5" />
      <text x="230" y="126" textAnchor="middle" fontFamily={DISPLAY} fontSize="14" fontWeight="600" fill="var(--dg-text)">{l.network.split("|")[0]}</text>
      <text x="230" y="144" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="var(--dg-muted)">{l.network.split("|")[1] ?? ""}</text>
      {(
        [
          [24, 30, l.operator],
          [296, 30, l.registrar],
          [160, 196, l.states],
        ] as [number, number, string][]
      ).map(([x, y, t]) => (
        <g key={t}>
          <rect x={x} y={y} width="140" height="42" rx="12" fill="var(--dg-surface)" stroke="var(--dg-line)" strokeWidth="1.5" />
          <text x={x + 70} y={y + 26} textAnchor="middle" fontFamily={SANS} fontSize="12.5" fill="var(--dg-text)">{t}</text>
        </g>
      ))}
      <path d="M150 72 L 192 96" stroke="var(--dg-line-strong)" strokeWidth="1.5" />
      <path d="M310 72 L 268 96" stroke="var(--dg-line-strong)" strokeWidth="1.5" />
      <path d="M230 184 L 230 196" stroke="var(--dg-line-strong)" strokeWidth="1.5" />
    </Frame>
  );
}

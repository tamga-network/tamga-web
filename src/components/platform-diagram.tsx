import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";
import type { Locale } from "@/i18n/routing";

type Content = {
  eyebrow: string;
  title: string;
  description: string;
  issuerSub: string;
  holderSub: string;
  verifierSub: string;
  principles: string[];
};

/* Fixed English labels (roles + operations stay in English across locales). */
const ROLES = { issuer: "Issuer", holder: "Holder", verifier: "Verifier", network: "Trust lists" };
const NETWORK_SUB = ["Digital Trust", "Infrastructure"];
const EDGES = {
  issue: { a: "ISSUE", b: "signs a credential" },
  present: { a: "PRESENT", b: "shows only what's needed" },
  register: { a: "REGISTER", b: "publishes its public key" },
  verify: { a: "VERIFY", b: "checks issuer & revocation" },
};
const TRUST = { a: "TRUST", b: "no integration needed" };

const en: Content = {
  eyebrow: "The platform",
  title: "One credential, verified anywhere — no integration",
  description:
    "The issuer signs a credential into the holder's wallet; the holder presents it to any verifier, who checks it against the signed trust lists without ever contacting the issuer. Personal data never enters the lists.",
  issuerSub: "University · X.509",
  holderSub: "Citizen · TamgaID",
  verifierSub: "Employer · RP",
  principles: [
    "Personal data never in lists or logs",
    "X.509 institutions · a separate copy per verifier",
    "Unreachable infrastructure → never a false “rejected”",
  ],
};

const tr: Content = {
  eyebrow: "Platform",
  title: "Tek credential, her yerde doğrulanır — entegrasyon yok",
  description:
    "Issuer, belgeyi imzalayıp holder'ın cüzdanına verir; holder bunu herhangi bir verifier'a sunar, verifier ise issuer'a hiç ulaşmadan imzalı güven listelerine karşı doğrular. Kişisel veri listelere asla girmez.",
  issuerSub: "Üniversite · X.509",
  holderSub: "Vatandaş · TamgaID",
  verifierSub: "İşveren · RP",
  principles: [
    "Kişisel veri listede ve günlükte yok",
    "X.509 kurumlar · her doğrulayıcıya ayrı kopya",
    "Altyapıya ulaşılamazsa asla sahte “red” yok",
  ],
};

const tk: Content = {
  eyebrow: "Platforma",
  title: "Bir credential, islendik ýerde barlanýar — integrasiýa ýok",
  description:
    "Issuer resminamany imzalap holder-yň gapjygyna berýär; holder ony islendik verifier-e hödürleýär, verifier bolsa issuer-e ýüz tutman gol çekilen ynam sanawlaryna görä barlaýar. Şahsy maglumat sanawlara asla girmeýär.",
  issuerSub: "Uniwersitet · X.509",
  holderSub: "Raýat · TamgaID",
  verifierSub: "Iş beriji · RP",
  principles: [
    "Şahsy maglumat sanawda we žurnalda ýok",
    "X.509 guramalar · her barlaýja aýry nusga",
    "Infrastruktura elýetmez bolsa asla ýalan “ret” ýok",
  ],
};

const content: Record<Locale, Content> = { en, tr, tk };

function SvgNode({
  cx,
  cy,
  role,
  subLines,
  ring,
}: {
  cx: number;
  cy: number;
  role: string;
  subLines: string[];
  ring: string;
}) {
  const two = subLines.length > 1;
  const roleY = cy - (two ? 9 : 2);
  return (
    <g>
      <circle cx={cx} cy={cy} r={70} fill="none" strokeWidth={6} strokeOpacity={0.16} style={{ stroke: ring }} />
      <circle cx={cx} cy={cy} r={64} strokeWidth={2} style={{ stroke: ring, fill: "var(--background)" }} />
      <text
        x={cx}
        y={roleY}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        style={{ fill: "var(--foreground)", fontFamily: "var(--font-serif, sans-serif)", letterSpacing: "0.04em" }}
      >
        {role.toUpperCase()}
      </text>
      {subLines.map((s, i) => (
        <text
          key={i}
          x={cx}
          y={roleY + 16 + i * 11}
          textAnchor="middle"
          fontSize="9.5"
          style={{ fill: "var(--foreground-muted)", fontFamily: "var(--font-mono, monospace)" }}
        >
          {s}
        </text>
      ))}
    </g>
  );
}

function ActLabel({ x, y, a, b, color }: { x: number; y: number; a: string; b: string; color: string }) {
  return (
    <>
      <text x={x} y={y} textAnchor="middle" fontSize="11" fontWeight="700" style={{ fill: color, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.06em" }}>
        {a}
      </text>
      <text x={x} y={y + 13} textAnchor="middle" fontSize="9" style={{ fill: "var(--foreground-subtle)", fontFamily: "var(--font-mono, monospace)" }}>
        {b}
      </text>
    </>
  );
}

export function PlatformDiagram({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? en;
  const gold = "var(--gold)";
  const accent = "var(--accent)";
  const primary = "var(--primary)";
  const ink = "var(--foreground)";
  const linec = "var(--border-strong)";

  return (
    <section className="shell py-20 sm:py-24">
      <Reveal>
        <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.description} />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 rounded-2xl border border-border bg-surface/30 p-4 sm:p-6">
          <svg
            viewBox="0 0 680 520"
            className="mx-auto block h-auto w-full max-w-[740px]"
            role="img"
            aria-label={c.title}
          >
            <defs>
              <marker id="ah-gold" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" style={{ fill: gold }} />
              </marker>
              <marker id="ah-accent" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" style={{ fill: accent }} />
              </marker>
            </defs>

            {/* credential circuit (gold): issuer top → holder left, holder right → verifier top */}
            <path d="M130,194 Q158,124 274,120" fill="none" strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#ah-gold)" style={{ stroke: gold }} />
            <path d="M406,120 Q522,124 550,194" fill="none" strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#ah-gold)" style={{ stroke: gold }} />

            {/* chain circuit (accent): issuer bottom → network left, network right → verifier bottom */}
            <path d="M130,326 Q158,396 274,400" fill="none" strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#ah-accent)" style={{ stroke: accent }} />
            <path d="M406,400 Q522,396 550,326" fill="none" strokeWidth="1.6" strokeDasharray="4 4" markerEnd="url(#ah-accent)" style={{ stroke: accent }} />

            {/* trust line (neutral, split for label) */}
            <line x1="202" y1="260" x2="300" y2="260" strokeWidth="1.4" strokeDasharray="3 4" style={{ stroke: linec }} />
            <line x1="380" y1="260" x2="478" y2="260" strokeWidth="1.4" strokeDasharray="3 4" style={{ stroke: linec }} />

            {/* operation labels */}
            <ActLabel x={162} y={100} a={EDGES.issue.a} b={EDGES.issue.b} color={gold} />
            <ActLabel x={518} y={100} a={EDGES.present.a} b={EDGES.present.b} color={gold} />
            <ActLabel x={162} y={420} a={EDGES.register.a} b={EDGES.register.b} color={accent} />
            <ActLabel x={518} y={420} a={EDGES.verify.a} b={EDGES.verify.b} color={accent} />

            {/* trust text */}
            <text x={340} y={255} textAnchor="middle" fontSize="11" fontWeight="700" style={{ fill: ink, fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.08em" }}>
              {TRUST.a}
            </text>
            <text x={340} y={270} textAnchor="middle" fontSize="9" style={{ fill: "var(--foreground-subtle)", fontFamily: "var(--font-mono, monospace)" }}>
              {TRUST.b}
            </text>

            {/* nodes (symmetric diamond) */}
            <SvgNode cx={130} cy={260} role={ROLES.issuer} subLines={[c.issuerSub]} ring={gold} />
            <SvgNode cx={340} cy={120} role={ROLES.holder} subLines={[c.holderSub]} ring={primary} />
            <SvgNode cx={550} cy={260} role={ROLES.verifier} subLines={[c.verifierSub]} ring={accent} />
            <SvgNode cx={340} cy={400} role={ROLES.network} subLines={NETWORK_SUB} ring={ink} />
          </svg>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {c.principles.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-foreground-muted"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

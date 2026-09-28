import { Check, Lock } from "lucide-react";
import { LogoMark } from "./logo";
import type { Locale } from "@/i18n/routing";

type DiscContent = {
  heading: string;
  verified: string;
  issuer: string;
  holder: string;
  claims: string;
  disclosed: string;
  hidden: string;
  signature: string;
  revocation: string;
  sigValid: string;
  revActive: string;
};

const en: DiscContent = {
  heading: "Credential",
  verified: "Verified",
  issuer: "issuer",
  holder: "holder",
  claims: "claims",
  disclosed: "disclosed",
  hidden: "hidden",
  signature: "signature",
  revocation: "revocation",
  sigValid: "valid",
  revActive: "active",
};

const tr: DiscContent = {
  heading: "Belge",
  verified: "Doğrulandı",
  issuer: "düzenleyen",
  holder: "tutan",
  claims: "alanlar",
  disclosed: "açık",
  hidden: "gizli",
  signature: "imza",
  revocation: "iptal",
  sigValid: "geçerli",
  revActive: "aktif",
};

const tk: DiscContent = {
  heading: "Resminama",
  verified: "Barlandy",
  issuer: "beriji",
  holder: "eýe",
  claims: "meýdanlar",
  disclosed: "açyk",
  hidden: "gizli",
  signature: "gol",
  revocation: "ýatyrmak",
  sigValid: "dogry",
  revActive: "işjeň",
};

const content: Record<Locale, DiscContent> = { en, tr, tk };

const ISSUER = "Identity provider · X.509 (TR)";
const HOLDER = "p:8f2a…c19";
const CLAIMS: { key: string; disclosed: boolean }[] = [
  { key: "age_over_18", disclosed: true },
  { key: "birth_date", disclosed: false },
  { key: "full_name", disclosed: false },
];

/** Visual credential card demonstrating selective disclosure ("over 18"). */
export function DisclosureCard({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? en;
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border-strong bg-background-elevated shadow-soft">
      {/* head */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground-subtle">
          {c.heading}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-gold">
          <LogoMark size={15} /> {c.verified}
        </span>
      </div>

      {/* issuer / holder */}
      <div className="space-y-3 px-5 pt-4 font-mono text-[12.5px] leading-relaxed">
        <div className="flex justify-between gap-4">
          <span className="text-foreground-subtle">{c.issuer}</span>
          <span className="truncate text-foreground" lang="en">
            {ISSUER}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-foreground-subtle">{c.holder}</span>
          <span className="truncate text-accent" lang="en">
            {HOLDER}
          </span>
        </div>
      </div>

      {/* claims */}
      <div className="px-5 pb-4 pt-4">
        <p className="mono-label mb-2">{c.claims}</p>
        <div className="space-y-2">
          {CLAIMS.map((claim) => (
            <div
              key={claim.key}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface/40 px-3 py-2"
            >
              <span className="font-mono text-[12.5px] text-foreground" lang="en">
                {claim.key}
              </span>
              {claim.disclosed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wide text-gold">
                  <Check size={12} /> {c.disclosed}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wide text-foreground-subtle">
                  <Lock size={11} /> {c.hidden}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3 font-mono text-[11px] text-foreground-subtle">
        <span>
          {c.signature}: <span className="text-foreground">{c.sigValid}</span>
        </span>
        <span>
          {c.revocation}: <span className="text-foreground">{c.revActive}</span>
        </span>
      </div>
    </div>
  );
}

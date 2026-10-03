"use client";

/*
 * Ana sayfadaki "İmzayı doğrula" modülü: imzalı listenin örnek alanları + düğmeye basınca beliren doğrulama mührü.
 * Gerçek doğrulama yapmaz; trust.tamga.network'teki listenin hangi alanlarla doğrulandığını gösteren bir örnektir.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function VerifyModule({
  eyebrow,
  title,
  lead,
  button,
  how,
  sample,
  ok,
  pending,
  fields,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  button: string;
  how: string;
  sample: string;
  ok: string;
  pending: string;
  fields: [string, string][];
}) {
  const [verified, setVerified] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="shell grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <div className="grid content-start gap-5">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#6fb3d2]">{eyebrow}</span>
        <h2 className="text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">{title}</h2>
        <p className="text-lg leading-relaxed text-ink-band-muted">{lead}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setVerified(true)}
            className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#1e5a78] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#174a63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6fb3d2]"
          >
            {button}
          </button>
          <Link
            href="/learn/trust-lists"
            className="inline-flex min-h-12 items-center rounded-md border border-[#3a4a59] px-5 text-[15px] font-semibold text-ink-band-fg transition-colors hover:border-ink-band-fg"
          >
            {how}
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#2a3846] bg-[#0b1218]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-band-line px-5 py-3.5">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-band-muted">{sample}</span>
          <AnimatePresence mode="wait" initial={false}>
            {verified ? (
              <motion.span
                key="ok"
                role="status"
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#123826] px-3 py-1.5 text-xs font-semibold text-[#7fe0a8]"
              >
                <Check size={14} aria-hidden /> {ok}
              </motion.span>
            ) : (
              <motion.span
                key="pending"
                exit={reduce ? undefined : { opacity: 0 }}
                className="rounded-full border border-[#3a4a59] px-3 py-1.5 text-xs text-ink-band-muted"
              >
                {pending}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <dl className="m-0">
          {fields.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] gap-4 px-5 py-3 font-mono text-[13px] ${
                i < fields.length - 1 ? "border-b border-ink-band-line" : ""
              }`}
            >
              <dt className="text-[#7f93a3]">{k}</dt>
              <dd className="m-0 break-words text-ink-band-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

const HEX = "M50 4 L86 24 V60 L50 96 L14 60 V24 Z";
const GLYPH = "M50 22 V70 M32 40 L50 22 L68 40 M34 62 H66";

/** Small static-ish mark for header / footer. */
export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <path d={HEX} fill="none" stroke="var(--gold-bright)" strokeWidth={3} />
      <path
        d={GLYPH}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wordmark used in the header. */
export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="Tamga Network — ana sayfa"
    >
      <LogoMark size={30} className="transition-transform duration-500 group-hover:rotate-[30deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.05rem] font-semibold tracking-tight text-foreground">
          Tamga
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-foreground-subtle">
          Network
        </span>
      </span>
    </Link>
  );
}

/** Large animated mark for the hero. Draws its strokes, then breathes. */
export function AnimatedLogoMark({ size = 240 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="tamga-glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="46" r="46" fill="url(#tamga-glow)" />

      {/* Outer hexagon seal — gold */}
      <motion.path
        d={HEX}
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth={2.4}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />

      {/* Inner glyph — al kızıl (the "tamga" stamp) */}
      <motion.path
        d={GLYPH}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Gentle breathing after draw */}
      <motion.g
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 2 }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </motion.svg>
  );
}

/** Just the tamga stamp (no outer hexagon) — floats and breathes, no frame. */
export function AnimatedTamgaGlyph({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`h-auto text-primary dark:text-white ${className ?? ""}`}
      initial={{ opacity: 0, y: 6 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -11, 0] }}
      transition={
        reduce
          ? { duration: 0.6 }
          : {
              opacity: { duration: 0.9, ease: "easeOut" },
              y: { duration: 4.6, ease: "easeInOut", repeat: Infinity },
            }
      }
    >
      <motion.path
        d={GLYPH}
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

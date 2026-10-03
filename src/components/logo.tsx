"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";

/*
 * Tamga Network işareti (2026-10-02): N1 — iç içe T (dış T ağ, içteki iki kol ağa katılanlar). 24 px ve altında sade
 * işaret NS (yalnız dış T). Tek kaynak: docs/brand/build-logo-kit.mjs → tamga-network/ops/brand/logo/mark.svg.
 */
const N1 = [
  "M144 160 H880 L832 240 H192 Z",
  "M472 236 H552 V820 L512 860 L472 820 Z",
  "M218.4 284 H428 V780 L348 700 V364 H266.4 Z",
  "M805.6 284 H596 V780 L676 700 V364 H757.6 Z",
];
const NS = ["M168 196 H856 L800 300 H224 Z", "M452 296 H572 V788 L512 848 L452 788 Z"];
const VB = "112 128 800 768";

/**
 * Header, footer ve rozetler için işaret. `mono`: geçerli yazı rengiyle (ör. renkli düğme üstünde beyaz).
 */
export function LogoMark({
  size = 28,
  className,
  mono = false,
}: {
  size?: number;
  className?: string;
  mono?: boolean;
}) {
  const paths = size <= 24 ? NS : N1;
  return (
    <svg width={size} height={size} viewBox={VB} className={className} aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} fill={mono ? "currentColor" : "var(--primary)"} />
      ))}
    </svg>
  );
}

/** Başlıktaki logotip. */
export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Tamga Network — ana sayfa">
      <LogoMark size={30} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="font-serif text-[1.08rem] font-semibold tracking-tight text-foreground">Tamga Network</span>
    </Link>
  );
}

/** Büyük işaret: parçalar sırayla basılır (damga basma hareketi). */
export function AnimatedLogoMark({ size = 240 }: { size?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg width={size} height={size} viewBox={VB} aria-hidden="true">
      {N1.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="var(--primary)"
          initial={reduce ? false : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 + i * 0.12 }}
        />
      ))}
    </svg>
  );
}

/** Yalnız işaret, yavaşça süzülür (eski sayfalarda kullanılıyorsa). */
export function AnimatedTamgaGlyph({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox={VB}
      aria-hidden="true"
      className={`h-auto text-primary ${className ?? ""}`}
      initial={{ opacity: 0, y: 6 }}
      animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
      transition={
        reduce
          ? { duration: 0.6 }
          : { opacity: { duration: 0.9, ease: "easeOut" }, y: { duration: 5, ease: "easeInOut", repeat: Infinity } }
      }
    >
      {N1.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </motion.svg>
  );
}

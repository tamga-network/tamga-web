"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/**
 * Satır içi terim: altı noktalı sözcük + kısa açıklama balonu. Üzerine gelince, odaklanınca ya da dokununca açılır;
 * Esc ve dışarı tıklama kapatır. Ekran okuyucu açıklamayı aria-describedby ile duyar.
 *
 *   <Term tip="Bir verinin parmak izi: veri değişirse özet de değişir.">hash</Term>
 *   <Term tip="…" en="trust list">güven listesi</Term>   // Türkçe sayfada İngilizce karşılık balonda da görünür
 */
export function Term({ children, tip, en }: { children: ReactNode; tip: string; en?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-describedby={id}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="learn-term cursor-help rounded-sm bg-transparent p-0 font-[inherit] text-[inherit] underline decoration-primary/60 decoration-dotted decoration-[1.5px] underline-offset-[3px] transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {children}
      </button>
      <span
        id={id}
        role="tooltip"
        className={`learn-term-tip pointer-events-none absolute left-0 top-[calc(100%+6px)] z-30 w-max max-w-[min(20rem,80vw)] rounded-lg border border-border bg-background-elevated px-3 py-2 text-left text-[13px] font-normal leading-relaxed text-foreground shadow-soft transition-opacity duration-150 ${
          open ? "opacity-100" : "sr-only opacity-0"
        }`}
      >
        {en ? <span className="mb-0.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-primary">{en}</span> : null}
        {tip}
      </span>
    </span>
  );
}

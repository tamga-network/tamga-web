"use client";

// Adapted from reactbits.dev "LetterGlitch" (canvas 2D, no deps). A glitching
// grid of characters — a "matrix / code" backdrop. Client-only; static for
// reduced-motion.

import { useRef, useEffect } from "react";

type RGB = { r: number; g: number; b: number };
type Letter = { char: string; color: string; targetColor: string; colorProgress: number };

type Props = {
  glitchColors?: string[];
  className?: string;
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
  fontFamily?: string;
};

export function LetterGlitch({
  glitchColors = ["#b01e22", "#c8a24c", "#2a6f8e"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
  fontFamily = "monospace",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const letters = useRef<Letter[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    context.current = canvas.getContext("2d");
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rnd = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    const getChar = () => rnd(lettersAndSymbols);
    const getColor = () => rnd(glitchColors);

    const hexToRgb = (hex: string): RGB | null => {
      const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(short, (_m, r, g, b) => r + r + g + g + b + b);
      const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return res
        ? { r: parseInt(res[1], 16), g: parseInt(res[2], 16), b: parseInt(res[3], 16) }
        : null;
    };
    const interp = (s: RGB, e: RGB, f: number) =>
      `rgb(${Math.round(s.r + (e.r - s.r) * f)}, ${Math.round(s.g + (e.g - s.g) * f)}, ${Math.round(s.b + (e.b - s.b) * f)})`;

    const initLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows };
      letters.current = Array.from({ length: columns * rows }, () => ({
        char: getChar(),
        color: getColor(),
        targetColor: getColor(),
        colorProgress: 1,
      }));
    };

    const draw = () => {
      const ctx = context.current;
      if (!ctx || letters.current.length === 0) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "top";
      letters.current.forEach((l, i) => {
        const x = (i % grid.current.columns) * charWidth;
        const y = Math.floor(i / grid.current.columns) * charHeight;
        ctx.fillStyle = l.color;
        ctx.fillText(l.char, x, y);
      });
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.current?.setTransform(dpr, 0, 0, dpr, 0, 0);
      initLetters(Math.ceil(rect.width / charWidth), Math.ceil(rect.height / charHeight));
      draw();
    };

    const update = () => {
      const count = Math.max(1, Math.floor(letters.current.length * 0.05));
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * letters.current.length);
        const l = letters.current[idx];
        if (!l) continue;
        l.char = getChar();
        l.targetColor = getColor();
        if (!smooth) {
          l.color = l.targetColor;
          l.colorProgress = 1;
        } else {
          l.colorProgress = 0;
        }
      }
    };

    const smoothTick = () => {
      let redraw = false;
      letters.current.forEach((l) => {
        if (l.colorProgress < 1) {
          l.colorProgress = Math.min(1, l.colorProgress + 0.05);
          const s = hexToRgb(l.color);
          const e = hexToRgb(l.targetColor);
          if (s && e) {
            l.color = interp(s, e, l.colorProgress);
            redraw = true;
          }
        }
      });
      if (redraw) draw();
    };

    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTime.current >= glitchSpeed) {
        update();
        draw();
        lastGlitchTime.current = now;
      }
      if (smooth) smoothTick();
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    if (!reduced) animate();

    // Redraw once a custom (e.g. Old Turkic) font finishes loading.
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.load(`${fontSize}px ${fontFamily}`).then(draw).catch(() => {});
    }

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resize();
        if (!reduced) animate();
      }, 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth, fontFamily]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: "#0b0b0c" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      {outerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(11,11,12,0) 55%, rgba(11,11,12,1) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      )}
    </div>
  );
}

export default LetterGlitch;

"use client";

// Adapted from reactbits.dev "ShinyText" (framer-motion). A sweeping shine over
// text — good for eyebrows, labels, small headings. Theme-aware via CSS vars.

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";

type Props = {
  text: string;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  disabled?: boolean;
  pauseOnHover?: boolean;
  delay?: number;
};

export function ShinyText({
  text,
  speed = 3,
  className = "",
  color = "var(--foreground-subtle)",
  shineColor = "var(--foreground)",
  spread = 120,
  disabled = false,
  pauseOnHover = false,
  delay = 0,
}: Props) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = speed * 1000;
  const delayDuration = delay * 1000;

  useAnimationFrame((time) => {
    if (disabled || isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const cycleDuration = animationDuration + delayDuration;
    const cycleTime = elapsedRef.current % cycleDuration;
    progress.set(cycleTime < animationDuration ? (cycleTime / animationDuration) * 100 : 100);
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [progress]);

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  const onEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);
  const onLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundPosition,
      }}
    >
      {text}
    </motion.span>
  );
}

export default ShinyText;

"use client";

// Lazy wrapper: defers the three.js WebGL code (~150KB) into its own chunk,
// loaded on the client after mount — out of the home route's initial JS.

import dynamic from "next/dynamic";
import type { FloatingLinesProps } from "./floating-lines";

const FloatingLines = dynamic(
  () => import("./floating-lines").then((m) => m.FloatingLines),
  { ssr: false },
);

export function FloatingLinesLazy(props: FloatingLinesProps) {
  return <FloatingLines {...props} />;
}

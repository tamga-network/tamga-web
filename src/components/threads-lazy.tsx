"use client";

// Lazy wrapper: defers the ogl WebGL code into its own chunk (loaded on the
// client after mount) so it stays out of the home route's initial JS.

import dynamic from "next/dynamic";
import type { ThreadsProps } from "./threads";

const Threads = dynamic(() => import("./threads").then((m) => m.Threads), {
  ssr: false,
});

export function ThreadsLazy(props: ThreadsProps) {
  return <Threads {...props} />;
}

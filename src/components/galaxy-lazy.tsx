"use client";

import dynamic from "next/dynamic";

/** Client-only, lazy-loaded Galaxy — keeps the ogl code out of the initial bundle. */
export const GalaxyLazy = dynamic(() => import("./galaxy").then((m) => m.Galaxy), {
  ssr: false,
});

import { notFound } from "next/navigation";

// Catch-all so that any unmatched path under /[locale]/… renders the
// localized not-found boundary (src/app/[locale]/not-found.tsx).
export default function CatchAllPage() {
  notFound();
}

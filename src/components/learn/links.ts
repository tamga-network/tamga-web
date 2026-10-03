import type { Href } from "@/i18n/navigation";
import { arfUrl, docsUrl } from "@/lib/docs-nav";
import type { Deeper } from "@/content/learn/types";

/** "Daha derine" bağlantısının hedefi: dış adres (docs, ARF) ya da site içi yol. */
export function deeperTarget(d: Deeper, locale: string): { external?: string; href?: Href } {
  if (d.kind === "docs") return { external: docsUrl(locale, d.href) };
  if (d.kind === "arf") return { external: `${arfUrl(locale)}${d.href.replace(/^\//, "")}` };
  return { href: d.href as Href };
}

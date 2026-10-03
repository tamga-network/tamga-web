import type { Href } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { arfUrl, localizeExternal } from "./docs-nav";
import type { Target } from "./nav";

/** Menü hedefinin adresi: ARF (dile göre, bölüm çapasıyla), dış adres (docs dile göre) ya da site içi bağlantı. */
export function targetOf(t: Target, locale: Locale): { external?: string; href?: Href } {
  if (t.arf) return { external: arfUrl(locale) + (t.arfPath ?? "") + (t.arfHash ? `#${t.arfHash[locale]}` : "") };
  if (t.external) return { external: localizeExternal(t.external, locale) };
  return { href: t.href };
}

/** Yeni sekmede açılmayan dış adresler (e-posta). */
export const opensInPlace = (url: string) => url.startsWith("mailto:");

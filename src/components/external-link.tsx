import type { AnchorHTMLAttributes } from "react";

/*
 * Dış bağlantılar — tek kural: başka bir siteye (http/https, alt alan adları dahil) giden her bağlantı yeni sekmede açılır
 * (target="_blank" rel="noopener noreferrer"); site içi bağlantılar aynı sekmede kalır. Dış adrese elle anchor yazma;
 * bunu kullan. `npm run check` (scripts/check-external-links.mjs) kuralsız dış bağlantıyı yakalar.
 */

export const EXTERNAL_ATTRS = { target: "_blank", rel: "noopener noreferrer" } as const;

export const isExternalHref = (href: string) => /^(https?:)?\/\//i.test(href);

export function ExternalLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a href={href} {...rest} {...EXTERNAL_ATTRS}>
      {children}
    </a>
  );
}

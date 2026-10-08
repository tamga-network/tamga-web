import type { ReactNode } from "react";
import { Link, type Href } from "@/i18n/navigation";

/*
 * Blog satır içi biçimi: **kalın**, *eğik* / _eğik_, `kod`, [metin](adres). Site içi adres (`/learn/…`, `/blog/…`, `/join`)
 * dil önekiyle (next-intl Link); dış adres yeni sekmede, rel="noopener noreferrer"; `/blog/…` altındaki dosyalar düz bağlantı.
 */
const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*|`[^`]+`|(?<![\w*])\*[^*\s][^*\n]*?\*(?![\w*])|(?<!\w)_[^_\s][^_\n]*?_(?!\w))/g;

export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter((p) => p !== "" && p !== undefined);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 1) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
          return (
            <strong key={i}>
              <Rich text={part.slice(2, -2)} />
            </strong>
          );
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link)
          return (
            <SmartLink key={i} href={link[2]}>
              <Rich text={link[1]} />
            </SmartLink>
          );
        if (/^\*[^*][\s\S]*\*$|^_[^_][\s\S]*_$/.test(part))
          return (
            <em key={i}>
              <Rich text={part.slice(1, -1)} />
            </em>
          );
        return part;
      })}
    </>
  );
}

/** Site içi yolu next-intl Link hedefine çevirir (blog yazısı dinamik rota; diğerleri sabit yol). */
function internalHref(href: string): Href {
  const [pathPart, hash] = href.split("#");
  const [pathname] = pathPart.split("?");
  const blog = /^\/blog\/([a-z0-9-]+)\/?$/.exec(pathname);
  const target = blog ? { pathname: "/blog/[slug]" as const, params: { slug: blog[1] } } : { pathname };
  return (hash ? { ...target, hash } : blog ? target : pathname) as Href;
}

export function SmartLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("#")) return <a href={href} className={className}>{children}</a>;
  if (href.startsWith("/") && !/\.\w+$/.test(href.split(/[?#]/)[0]))
    return (
      <Link href={internalHref(href)} className={className}>
        {children}
      </Link>
    );
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

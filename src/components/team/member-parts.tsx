import type { ComponentType, SVGProps } from "react";
import { BookOpen, Globe, GraduationCap, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/social-icons";
import { EXTERNAL_ATTRS } from "@/components/external-link";
import { initials, tx, type TeamMember } from "@/content/team";

/*
 * Ekip sayfası parçaları: fotoğraf (AVIF → WebP → JPEG) ya da baş harfli simge, kişinin bağlantı simgeleri.
 */

export function MemberPhoto({
  member,
  locale,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 360px, 100vw",
  initialsClassName = "text-[clamp(3rem,9vw,5.5rem)]",
}: {
  member: TeamMember;
  locale: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  initialsClassName?: string;
}) {
  const p = member.photo;
  if (!p) {
    return (
      <div
        role="img"
        aria-label={member.name}
        className={`relative flex items-center justify-center overflow-hidden bg-ink-band ${className}`}
      >
        {/* İnce ızgara + Gök ışıması: fotoğrafı olmayan kişiler için sade, markaya uygun simge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 25%, rgba(111,179,210,0.35), transparent 55%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 28px 28px, 28px 28px",
          }}
        />
        <span
          aria-hidden="true"
          className={`relative font-serif font-semibold tracking-tight text-ink-band-fg ${initialsClassName}`}
        >
          {initials(member.name)}
        </span>
      </div>
    );
  }
  const src = `/team/${p.base}`;
  return (
    <picture className={`block overflow-hidden ${className}`}>
      <source type="image/avif" srcSet={`${src}.avif`} sizes={sizes} />
      <source type="image/webp" srcSet={`${src}.webp`} sizes={sizes} />
      {/* statik, önceden küçültülmüş görsel (AVIF/WebP/JPEG) */}
      <img
        src={`${src}.jpg`}
        alt={tx(p.alt, locale)}
        width={p.width}
        height={p.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="h-full w-full object-cover"
      />
    </picture>
  );
}

/**
 * Yuvarlak profil resmi + dönen marka halkası (globals.css `.team-avatar`). Kartta halka üstüne gelince/odakta döner;
 * `live` profil sayfasında sürekli ve yavaş döner. Boyut `--team-size` ile (ör. `[--team-size:13rem]`).
 */
export function MemberAvatar({
  member,
  locale,
  className = "",
  live = false,
  priority = false,
  sizes = "160px",
  initialsClassName = "text-5xl",
}: {
  member: TeamMember;
  locale: string;
  className?: string;
  live?: boolean;
  priority?: boolean;
  sizes?: string;
  initialsClassName?: string;
}) {
  return (
    <span className={`team-avatar ${live ? "team-avatar--live" : ""} ${className}`}>
      <span className="team-avatar-frame">
        <MemberPhoto
          member={member}
          locale={locale}
          priority={priority}
          sizes={sizes}
          initialsClassName={initialsClassName}
          className="h-full w-full rounded-full"
        />
      </span>
    </span>
  );
}

type IconC = ComponentType<SVGProps<SVGSVGElement>>;

const LINKS: { key: keyof TeamMember["links"]; label: string; icon: IconC; href: (v: string) => string }[] = [
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, href: (v) => v },
  { key: "github", label: "GitHub", icon: GithubIcon, href: (v) => v },
  { key: "x", label: "X", icon: XIcon, href: (v) => v },
  { key: "orcid", label: "ORCID", icon: BookOpen as IconC, href: (v) => v },
  { key: "scholar", label: "Google Scholar", icon: GraduationCap as IconC, href: (v) => v },
  { key: "website", label: "Web", icon: Globe as IconC, href: (v) => v },
  { key: "email", label: "E-mail", icon: Mail as IconC, href: (v) => `mailto:${v}` },
];

export const memberLinks = (m: TeamMember) =>
  LINKS.filter((l) => m.links[l.key]).map((l) => ({ ...l, url: l.href(m.links[l.key]!) }));

/** Simge düğmeleri (kart ve profil). Kartın içinde tıklanabilir kalsın diye `relative z-10`. */
export function MemberLinkIcons({
  member,
  size = 18,
  className = "",
  withLabels = false,
}: {
  member: TeamMember;
  size?: number;
  className?: string;
  withLabels?: boolean;
}) {
  const links = memberLinks(member);
  if (links.length === 0) return null;
  return (
    <ul className={`relative z-10 flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ key, label, icon: Icon, url }) => (
        <li key={key}>
          <a
            href={url}
            {...(url.startsWith("mailto:") ? {} : EXTERNAL_ATTRS)}
            aria-label={`${member.name} · ${label}`}
            title={label}
            className={
              withLabels
                ? "inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                : "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-subtle transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            }
          >
            <Icon width={size} height={size} aria-hidden="true" />
            {withLabels && <span>{label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

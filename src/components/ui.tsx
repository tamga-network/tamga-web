import { Link, type Href } from "@/i18n/navigation";
import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/*  Button / link                                                             */
/* -------------------------------------------------------------------------- */

type ButtonProps = {
  // Internal typed routes (autocomplete preserved) OR an external http(s) URL,
  // which the component renders as a plain target="_blank" anchor below.
  href: Href | (string & {});
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.97]";
  const styles = {
    primary:
      "bg-primary text-primary-contrast hover:bg-primary-strong shadow-sm",
    outline: "border !border-primary text-foreground dark:!border-foreground",
    ghost: "text-foreground-muted hover:text-foreground",
  }[variant];

  // External links are always plain strings starting with http(s).
  if (typeof href === "string" && href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href as Href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading                                                           */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-balance text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface/50 p-6 transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface hover:shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page header (inner pages)                                                 */
/* -------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-tamga-grain">
      <div className="shell py-16 sm:py-20">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

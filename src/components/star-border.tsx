// Adapted from reactbits.dev "StarBorder" (pure CSS). An animated glinting
// border — good for a special CTA / "get early access" style button.

import type { CSSProperties, ElementType, ReactNode } from "react";
import "./star-border.css";

type Props = {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
};

export function StarBorder({
  as: Component = "button",
  className = "",
  color = "var(--gold-bright)",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: Props) {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...style }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
}

export default StarBorder;

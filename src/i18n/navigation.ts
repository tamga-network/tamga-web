import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

/** The href type accepted by the localized <Link> (string pathname or object). */
export type Href = ComponentProps<typeof Link>["href"];

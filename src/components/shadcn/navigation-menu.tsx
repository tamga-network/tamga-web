"use client";

/*
 * shadcn/ui NavigationMenu (Radix) — sitenin renk belirteçleriyle. Klavye, odak ve ekran okuyucu desteği Radix'ten gelir.
 * Kaynak kalıp: ui.shadcn.com/docs/components/navigation-menu
 */
import * as React from "react";
import { NavigationMenu as NM } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NM.Root>) {
  return (
    <NM.Root
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute left-1/2 top-full flex -translate-x-1/2 justify-center">
        <NM.Viewport className="nm-viewport relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top overflow-hidden rounded-xl border border-border bg-background/95 shadow-soft backdrop-blur-md transition-[width,height] duration-200 md:w-[var(--radix-navigation-menu-viewport-width)]" />
      </div>
    </NM.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NM.List>) {
  return (
    <NM.List
      className={cn("flex flex-1 list-none items-center gap-0.5", className)}
      {...props}
    />
  );
}

export const NavigationMenuItem = NM.Item;

export const triggerCls =
  "group inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm text-foreground-muted outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 data-[state=open]:text-foreground";

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NM.Trigger>) {
  return (
    <NM.Trigger className={cn(triggerCls, className)} {...props}>
      {children}
      <ChevronDown
        size={14}
        aria-hidden
        className="transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </NM.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NM.Content>) {
  return (
    <NM.Content
      className={cn("left-0 top-0 w-full p-3 md:absolute md:w-auto", className)}
      {...props}
    />
  );
}

export const NavigationMenuLink = NM.Link;

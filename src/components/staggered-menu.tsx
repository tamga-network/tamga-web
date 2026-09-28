"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Href } from "@/i18n/navigation";
import { LogoMark } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileLocale } from "./mobile-locale";
import type { Social } from "./social-icons";
import "./staggered-menu.css";

export type StaggeredItem = { label: string; href: Href; ariaLabel?: string };

export function StaggeredMenu({
  items = [],
  socialItems = [],
  socialsTitle = "Socials",
  displaySocials = true,
  displayItemNumbering = true,
  position = "right",
}: {
  items?: StaggeredItem[];
  socialItems?: Social[];
  socialsTitle?: string;
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  position?: "left" | "right";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  const offscreen = position === "left" ? -100 : 100;

  // Initial offscreen positioning
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      const preLayers = preContainer
        ? Array.from(
            preContainer.querySelectorAll<HTMLElement>(".sm-prelayer"),
          )
        : [];
      preLayerElsRef.current = preLayers;

      // GSAP owns the horizontal offset (x stays 0, only xPercent moves).
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(panel, { autoAlpha: 1 });
      if (preContainer) gsap.set(preContainer, { opacity: 1 });
    });
    return () => ctx.revert();
  }, [offscreen]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-panel-itemLabel"),
    );
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>(
        ".sm-panel-list[data-numbering] .sm-panel-item",
      ),
    );
    const socialTitle = panel.querySelector<HTMLElement>(".sm-socials-title");
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLElement>(".sm-socials-link"),
    );
    const controls = panel.querySelector<HTMLElement>(".sm-controls");

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 8 });
    if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
    if (controls) gsap.set(controls, { y: 20, opacity: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(
        el,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    const tailStart = panelInsertTime + panelDuration * 0.4;
    if (controls)
      tl.to(
        controls,
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        tailStart,
      );
    if (socialTitle)
      tl.to(
        socialTitle,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        tailStart + 0.05,
      );
    if (socialLinks.length)
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
        },
        tailStart + 0.09,
      );

    openTlRef.current = tl;
    return tl;
  }, [offscreen]);

  const playOpen = useCallback(() => {
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, [offscreen]);

  const setOpenState = useCallback(
    (next: boolean) => {
      if (next === openRef.current) return;
      openRef.current = next;
      setOpen(next);
      if (next) playOpen();
      else playClose();
    },
    [playOpen, playClose],
  );

  const toggleMenu = useCallback(
    () => setOpenState(!openRef.current),
    [setOpenState],
  );
  const closeMenu = useCallback(() => setOpenState(false), [setOpenState]);

  // Close on route change (client nav keeps the header mounted)
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Outside click + Esc + body scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const panel = panelRef.current;
      if (panel && !panel.contains(e.target as Node)) {
        // ignore clicks on the header (logo / theme / toggle handle themselves)
        const header = panel
          .closest(".staggered-menu-wrapper")
          ?.querySelector(".staggered-menu-header");
        if (header && header.contains(e.target as Node)) return;
        closeMenu();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeMenu]);

  return (
    <div
      className="staggered-menu-wrapper fixed-wrapper"
      style={{ "--sm-accent": "var(--primary)" } as React.CSSProperties}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        <div className="sm-prelayer" style={{ background: "var(--gold-bright)" }} />
        <div className="sm-prelayer" style={{ background: "var(--primary)" }} />
      </div>

      <header className="staggered-menu-header" aria-label="Mobile navigation">
        <Link href="/" className="sm-logo" aria-label="Tamga Network — home">
          <LogoMark size={28} />
          <span className="sm-logo-text">Tamga Network</span>
        </Link>

        <div className="sm-header-actions">
          <ThemeToggle />
          <button
            className="sm-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            {open ? (
              <X size={20} strokeWidth={2.2} />
            ) : (
              <Menu size={20} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={idx}>
                <Link
                  className="sm-panel-item"
                  href={it.href}
                  aria-label={it.ariaLabel ?? it.label}
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="sm-controls">
            <MobileLocale />
          </div>

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">{socialsTitle}</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s) => (
                  <li key={s.label} className="sm-socials-item">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="sm-socials-link"
                    >
                      <s.Icon width={22} height={22} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;

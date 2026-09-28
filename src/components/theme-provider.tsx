"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { THEME_COOKIE, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggle: () => {},
});

const ONE_YEAR = 60 * 60 * 24 * 365;

function apply(theme: Theme) {
  const d = document.documentElement;
  d.classList.remove("light", "dark");
  d.classList.add(theme);
  d.style.colorScheme = theme;
}

/**
 * Theme is persisted in a cookie so the server can render the correct
 * `<html class>` on the first paint — no flash, and no inline `<script>`
 * (which React 19 warns about). See `[locale]/layout.tsx`.
 */
export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  // Reconcile with whatever class is actually on <html> (defensive).
  useEffect(() => {
    const current = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    if (current !== theme) setThemeState(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.cookie = `${THEME_COOKIE}=${t};path=/;max-age=${ONE_YEAR};samesite=lax`;
    apply(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme: theme, setTheme, toggle }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

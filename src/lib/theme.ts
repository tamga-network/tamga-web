// Server-safe theme constants (no "use client"), so both the server layout
// and the client provider can import the cookie name reliably.
export const THEME_COOKIE = "theme";
export type Theme = "light" | "dark";

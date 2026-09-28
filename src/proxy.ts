import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes, _next, _vercel
  // - files with an extension (e.g. favicon.ico, icon.svg)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

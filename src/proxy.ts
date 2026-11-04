import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { newNonce, pageCsp } from "./lib/csp";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`.
const handleI18nRouting = createMiddleware(routing);

/**
 * Her sayfa isteği yeni bir nonce alır: CSP başlığı hem isteğe (Next.js render sırasında nonce'u buradan okur ve kendi
 * betiklerine ekler; `x-nonce` uygulama kodu için) hem yanıta yazılır. next-intl, isteğin başlıklarını kendi
 * yanıtına (next/rewrite) taşır; bu yüzden başlıkları ona vermeden önce isteğe ekliyoruz.
 */
export default function proxy(request: NextRequest) {
  const nonce = newNonce();
  const csp = pageCsp(nonce);

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp);

  const response = handleI18nRouting(new NextRequest(request, { headers }));
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Match all pathnames except for
  // - API routes, _next, _vercel
  // - files with an extension (e.g. favicon.ico, icon.svg)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Mono, Onest } from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_COOKIE, type Theme } from "@/lib/theme";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd, siteGraph } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Başlıklar — Onest (Türkçe, Türkmence, Azerbaycanca ve Kiril: Kazakça, Kırgızca).
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://tamga.network";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // Ana sayfanın bilgisi; alt sayfalar kendi canonical/OG'sini `pageMeta` ile verir (src/lib/seo.ts).
  const home = pageMeta(locale, "/", { description: t("description") });
  return {
    ...home,
    metadataBase: new URL(siteUrl),
    applicationName: "Tamga Network",
    title: {
      default: t("title"),
      template: "%s · Tamga Network",
    },
    openGraph: { ...home.openGraph, title: t("title"), description: t("ogDescription") },
    twitter: { ...home.twitter, title: t("title"), description: t("ogDescription") },
    // Simgeler tek kaynaktan (tamga-network/ops/brand/icons → npm run brand:sync); favicon.ico dosya kuralıyla.
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/manifest.webmanifest",
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101820" },
    { media: "(prefers-color-scheme: light)", color: "#F8F6F1" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // Read the theme from the cookie so the server renders the correct
  // <html class> on first paint — no flash, and no inline theme <script>.
  const cookieStore = await cookies();
  const theme: Theme =
    cookieStore.get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";
  const t = await getTranslations({ locale, namespace: "meta" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${theme} ${plexSans.variable} ${onest.variable} ${plexMono.variable} h-full antialiased`}
      style={{ colorScheme: theme }}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteGraph(t("description"))} />
        <NextIntlClientProvider>
          <ThemeProvider initialTheme={theme}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-contrast"
            >
              {tc("skipToContent")}
            </a>
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_COOKIE, type Theme } from "@/lib/theme";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TranslationNote } from "@/components/translation-note";
import { JsonLd, siteGraph } from "@/components/json-ld";
import { pageMeta } from "@/lib/seo";

// Yazı tipleri kendi kopyamız (src/fonts, OFL 1.1 — lisanslar aynı klasörde): üçüncü taraf yazı tipi sunucusu yok, derleme de
// dış ağa çıkmaz. Latin, Latin-ext (Türkçe, Azerbaycanca, Türkmence) ve Kiril (Kazakça, Kırgızca); değişken ağırlık.
const plexSans = localFont({
  src: "../../fonts/ibm-plex-sans-var.woff2",
  variable: "--font-plex-sans",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

// Başlıklar — Onest (Türkçe, Türkmence, Azerbaycanca ve Kiril: Kazakça, Kırgızca).
const onest = localFont({
  src: "../../fonts/onest-var.woff2",
  variable: "--font-onest",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "../../fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
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
            <TranslationNote locale={locale} />
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

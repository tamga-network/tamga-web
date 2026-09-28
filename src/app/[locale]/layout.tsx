import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { IBM_Plex_Sans, IBM_Plex_Mono, Sora } from "next/font/google";
import "../globals.css";
import "flag-icons/css/flag-icons.min.css";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_COOKIE, type Theme } from "@/lib/theme";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Display / headings — Sora (modern geometric sans, replaces the old serif).
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
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
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: "%s · Tamga Network",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale,
      url: siteUrl,
      siteName: "Tamga Network",
      title: t("title"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
    icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        tr: "/tr",
        en: "/en",
        tk: "/tk",
      },
    },
  };
}

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
    cookieStore.get(THEME_COOKIE)?.value === "light" ? "light" : "dark";

  return (
    <html
      lang={locale}
      dir="ltr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${theme} ${plexSans.variable} ${sora.variable} ${plexMono.variable} h-full antialiased`}
      style={{ colorScheme: theme }}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider initialTheme={theme}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Sayfa başına arama ve paylaşım bilgisi: canonical adres, üç dilin eşleri (+ x-default), Open Graph ve Twitter kartı.
 * Next.js metadata'yı sığ birleştirir: düzen (layout) yalnız site geneli bilgiyi verir; sayfaya özgü olan her şey buradan.
 * Paylaşım görseli `[locale]/opengraph-image.tsx` üretir; sayfa kendi openGraph'unu verince Next dosya kuralındaki görseli
 * düşürdüğü için adresi burada açıkça yazılır.
 */
export const SITE_URL = "https://tamga.network";
export const SITE_NAME = "Tamga Network";

/** Open Graph dil kodları (dil_ÜLKE). */
export const OG_LOCALE: Record<string, string> = { en: "en_US", tr: "tr_TR", tk: "tk_TM" };

const url = (locale: string, path: string) => `${SITE_URL}/${locale}${path === "/" ? "" : path}`;

export function pageMeta(
  locale: string,
  path: string,
  m: Metadata & { title?: string; description?: string },
  og?: {
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    /** Sayfaya özel paylaşım görseli (mutlak ya da kök göreli adres); yoksa dilin genel görseli. */
    image?: string;
    /** Sayfanın gerçekten var olduğu diller (hreflang); yoksa üç dil. */
    locales?: readonly string[];
    /** Canonical'ın dili (ör. çevirisi olmayan sayfada İngilizce asıl). */
    canonicalLocale?: string;
    noindex?: boolean;
  },
): Metadata {
  const title = m.title;
  const description = m.description;
  const full = title ? `${title} · ${SITE_NAME}` : undefined;
  const langs = og?.locales ?? routing.locales;
  const languages: Record<string, string> = Object.fromEntries(langs.map((l) => [l, url(l, path)]));
  languages["x-default"] = url(routing.defaultLocale, path);
  const imageUrl = og?.image ? (og.image.startsWith("/") ? `${SITE_URL}${og.image}` : og.image) : `${SITE_URL}/${locale}/opengraph-image`;
  const image = { url: imageUrl, width: 1200, height: 630, alt: title ?? SITE_NAME, type: "image/png" };
  return {
    ...m,
    ...(og?.noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: url(og?.canonicalLocale ?? locale, path), languages },
    openGraph: {
      type: og?.type ?? "website",
      siteName: SITE_NAME,
      url: url(locale, path),
      locale: OG_LOCALE[locale] ?? OG_LOCALE.en,
      alternateLocale: langs.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      ...(full ? { title: full } : {}),
      ...(description ? { description } : {}),
      ...(og?.publishedTime ? { publishedTime: og.publishedTime } : {}),
      ...(og?.modifiedTime ? { modifiedTime: og.modifiedTime } : {}),
      ...(og?.authors ? { authors: og.authors } : {}),
      ...(og?.section ? { section: og.section } : {}),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      images: [image.url],
      ...(full ? { title: full } : {}),
      ...(description ? { description } : {}),
    },
  };
}

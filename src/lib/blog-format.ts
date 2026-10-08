/** Blog, Etkinlikler ve ana sayfa için tarih biçimi (sunucuda; saat dilimi kayması olmasın diye UTC). */
const DATE_LOCALE: Record<string, string> = { en: "en-GB", tr: "tr-TR", tk: "tk-TM" };

export function formatDate(iso: string, locale: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(DATE_LOCALE[locale] ?? "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, (m || 1) - 1, d || 1)));
}

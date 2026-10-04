/*
 * Dış belge siteleri için dil duyarlı adresler (ADR-0018 üç kapı: genel anlatım bu sitede /learn, geliştirici belgeleri
 * docs.tamga.network, Tamga ARF arf.tamga.network). Eski /docs genel belgeleri 2026-10-02'de /learn'e taşındı.
 */

export const DEV_DOCS_URL = "https://docs.tamga.network";
/** Geliştirici belgeleri dile göre: İngilizce kökte, Türkçe /tr/ altında (Türkmence sayfa yok → İngilizce). */
export function docsUrl(locale: string, path = ""): string {
  return `${DEV_DOCS_URL}${locale === "tr" ? "/tr" : ""}/${path.replace(/^\//, "")}`;
}
/** Dış bağlantı docs.tamga.network ise okurun diline çevirir. */
export function localizeExternal(url: string | undefined, locale: string): string | undefined {
  // /api/ sayfası tek dilli (statik): dil öneki eklenmez.
  if (!url || !url.startsWith(DEV_DOCS_URL) || url.startsWith(`${DEV_DOCS_URL}/api`)) return url;
  return docsUrl(locale, url.slice(DEV_DOCS_URL.length));
}
/*
 * Sandbox (test ağı): menüler ve /network sayfası tek adresten okur. Kurulana kadar docs rehberine gider (dile göre,
 * localizeExternal ile); sandbox.tamga.network yayına girince SANDBOX_LIVE = true yapılır ("Yakında" da kalkar).
 */
export const SANDBOX_LIVE = false;
export const SANDBOX_HOST = "sandbox.tamga.network";
export const SANDBOX_URL = SANDBOX_LIVE ? `https://${SANDBOX_HOST}` : `${DEV_DOCS_URL}/guides/sandbox`;
export function arfUrl(locale: string): string {
  return locale === "tr" ? "https://arf.tamga.network/tr/" : "https://arf.tamga.network/";
}

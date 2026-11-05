/**
 * Site haritası için gerçek "son değişiklik" tarihi: verilen kaynak dosyaların (ya da klasörlerin) son commit tarihi.
 * Derlemede bir kez çalışır (sitemap.xml statik üretilir). Sunucu derlemeyi git kopyasından yaptığı için tarih orada da
 * gerçektir (public depoda her yayın bir commit; dosyaya dokunmayan yayın tarihini değiştirmez).
 * git yoksa ya da dosya hiç commit'lenmemişse `undefined` döner — o zaman lastmod yazılmaz (uydurma "bugün" yazılmaz;
 * Google her derlemede değişen lastmod'a güvenmeyi bırakır).
 */
import { execFileSync } from "node:child_process";

const cache = new Map<string, Date | undefined>();

export function gitLastModified(...paths: string[]): Date | undefined {
  const key = paths.join("\0");
  if (cache.has(key)) return cache.get(key);
  let date: Date | undefined;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) date = new Date(out);
  } catch {
    date = undefined;
  }
  cache.set(key, date);
  return date;
}

/** En yeni tarih (tanımsızlar atlanır). */
export function latest(...dates: (Date | undefined)[]): Date | undefined {
  const ds = dates.filter((d): d is Date => d instanceof Date && !Number.isNaN(d.getTime()));
  return ds.length ? new Date(Math.max(...ds.map((d) => d.getTime()))) : undefined;
}

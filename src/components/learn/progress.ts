"use client";

/*
 * Okuma ilerlemesi: okunan Learn sayfalarının adresleri bu tarayıcıda saklanır (yalnız okurun kendi kolaylığı; sunucuya
 * gitmez). Gizli pencere ya da engellenmiş depolama durumunda sessizce boş döner.
 */

const KEY = "tamga-learn-read";
export const PROGRESS_EVENT = "tamga-learn-progress";

export function readSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function markRead(slug: string): void {
  try {
    const set = new Set(readSlugs());
    if (set.has(slug)) return;
    set.add(slug);
    window.localStorage.setItem(KEY, JSON.stringify([...set]));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    /* depolama yok: ilerleme gösterilmez */
  }
}

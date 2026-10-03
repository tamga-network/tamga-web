/*
 * Etkinlikler — tek kaynak (ana sayfadaki "Haberler ve etkinlikler" ve /events sayfası).
 * Tamga'nın düzenlediği ve katıldığı konuşmalar, atölyeler ve toplantılar. Yalnız gerçek, tarihi belli etkinlikler.
 */
import type { Locale } from "@/i18n/routing";

export type TamgaEvent = {
  id: string;
  /** ISO tarih (başlangıç) */
  date: string;
  title: Partial<Record<Locale, string>> & { en: string };
  place: Partial<Record<Locale, string>> & { en: string };
  summary?: Partial<Record<Locale, string>>;
  url?: string;
  kind: "talk" | "workshop" | "meeting" | "conference";
};

export const EVENTS: TamgaEvent[] = [];

const today = () => new Date().toISOString().slice(0, 10);

export const upcomingEvents = () => EVENTS.filter((e) => e.date >= today()).sort((a, b) => (a.date < b.date ? -1 : 1));
export const pastEvents = () => EVENTS.filter((e) => e.date < today()).sort((a, b) => (a.date < b.date ? 1 : -1));

export const pickL = (m: Partial<Record<Locale, string>> & { en: string }, locale: string) =>
  m[locale as Locale] ?? m.en;

"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PROGRESS_EVENT, markRead, readSlugs } from "./progress";

export type SidebarChapter = {
  n: number;
  title: string;
  pages: { slug: string; title: string }[];
};

function useReadSlugs(): string[] {
  const [read, setRead] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setRead(readSlugs());
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return read;
}

/** Sayfa açılınca okundu sayılır. */
export function ReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => markRead(slug), 1500);
    return () => window.clearTimeout(t);
  }, [slug]);
  return null;
}

/** Bölümler ve sayfalar; geçerli sayfa vurgulu, okunanlar işaretli, geçerli bölüm açık. */
export function LearnSidebar({
  chapters,
  current,
  labels,
}: {
  chapters: SidebarChapter[];
  current?: string;
  labels: { chapter: string; progress: string; read: string; total: number };
}) {
  const read = useReadSlugs();
  const currentChapter = chapters.find((c) => c.pages.some((p) => p.slug === current))?.n ?? 1;
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set([currentChapter]));
  useEffect(() => setOpenSet((s) => new Set(s).add(currentChapter)), [currentChapter]);
  const toggle = (n: number) =>
    setOpenSet((s) => {
      const next = new Set(s);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  const done = read.filter((s) => chapters.some((c) => c.pages.some((p) => p.slug === s))).length;
  const pct = labels.total ? Math.round((done / labels.total) * 100) : 0;

  return (
    <nav aria-label={labels.chapter} className="text-sm">
      <div className="mb-5 space-y-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border" aria-hidden>
          <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="m-0 text-xs text-foreground-subtle" aria-live="polite">
          {labels.progress.replace("{read}", String(done)).replace("{total}", String(labels.total))}
        </p>
      </div>
      <ol className="m-0 list-none space-y-1 p-0">
        {chapters.map((c) => {
          const open = openSet.has(c.n);
          const id = `learn-ch-${c.n}`;
          return (
            <li key={c.n}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => toggle(c.n)}
                className="flex w-full items-start gap-2.5 rounded-md px-2 py-2 text-left text-foreground transition-colors hover:bg-surface/60 focus-visible:outline-2 focus-visible:outline-primary"
              >
                <span className="mt-0.5 w-5 shrink-0 font-mono text-[11px] text-foreground-subtle">
                  {String(c.n).padStart(2, "0")}
                </span>
                <span className="flex-1 font-medium leading-snug">{c.title}</span>
                <ChevronDown
                  size={15}
                  aria-hidden
                  className={`mt-0.5 shrink-0 text-foreground-subtle transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <ol id={id} hidden={!open} className="m-0 mb-2 ml-[1.15rem] list-none border-l border-border p-0 pl-3">
                {c.pages.map((p) => {
                  const active = p.slug === current;
                  const isRead = read.includes(p.slug);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={{ pathname: "/learn/[slug]", params: { slug: p.slug } }}
                        aria-current={active ? "page" : undefined}
                        className={`-ml-[13px] flex items-center gap-2 border-l-2 py-1.5 pl-3 pr-1 leading-snug transition-colors ${
                          active
                            ? "border-primary font-medium text-primary"
                            : "border-transparent text-foreground-muted hover:border-border-strong hover:text-foreground"
                        }`}
                      >
                        <span className="flex-1">{p.title}</span>
                        {isRead && !active ? (
                          <Check size={13} aria-label={labels.read} className="shrink-0 text-primary/70" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Learn ana sayfasında: okunmamış ilk sayfaya "devam et". Hiç okunmamışsa görünmez. */
export function ContinueLink({ order, label }: { order: string[]; label: string }) {
  const read = useReadSlugs();
  if (!read.length) return null;
  const next = order.find((s) => !read.includes(s));
  if (!next) return null;
  return (
    <Link
      href={{ pathname: "/learn/[slug]", params: { slug: next } }}
      className="inline-flex items-center justify-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground"
    >
      {label}
    </Link>
  );
}

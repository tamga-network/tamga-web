/**
 * Blog — içerik TEK YERDE: `src/content/blog/<slug>/article.{en,tr,tk}.md` (yazar kılavuzu: `src/content/blog/README.md`).
 * `en` ve `tr` zorunlu; `tk` isteğe bağlı — yoksa /tk sayfası İngilizce metni bir notla gösterir (hreflang ve site haritası
 * yalnız gerçek dilleri listeler). Görseller `public/blog/<slug>/<dil>/fig-<ad>.png`.
 *
 * Derlemede okunur (sunucu tarafı) ve denetlenir: diller var mı, ortak alanlar aynı mı, kategori geçerli mi, ilgili bağlantılar
 * (yazı, Learn sayfası, site sayfası) ve metin içi site bağlantıları var mı, görseller `public/` altında var mı, alt metin dolu mu,
 * dış bağlantılar https mi. Bozuksa derleme durur (hata iletileri Türkçe).
 *
 * Markdown alt kümesi: ## / ### başlık, paragraf, - ve 1. liste, | tablo |, > alıntı ("**Not:**" / "**Note:**" / "**Önemli:**" /
 * "**Important:**" ile başlarsa vurgulu kutu), ![alt](/blog/… "isteğe bağlı alt yazı"), ```dil title="…" kod penceresi,
 * "## Kaynaklar" / "## Sources" bölümü (küçük yazı). Satır içi: **kalın**, *eğik*, `kod`, [metin](adres). `<!-- … -->` görünmez.
 *
 * Taslak (`draft: true`): yayında görünmez. Yalnız geliştirmede (`npm run dev`) ya da `BLOG_DRAFTS=1` ile derlenince görünür;
 * o zaman da "Taslak" etiketiyle ve noindex.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { routing } from "@/i18n/routing";
import { LEARN_PAGES } from "@/content/learn";
import { BLOG_CATEGORIES, categoryLabel, type BlogCategory } from "./blog-ui";
import { formatDate } from "./blog-format";

export { BLOG_CATEGORIES, type BlogCategory } from "./blog-ui";
export { formatDate } from "./blog-format";

export type BlogLocale = "en" | "tr" | "tk";
const REQUIRED: BlogLocale[] = ["en", "tr"];

/* ---------- bloklar ---------- */

/** Kod penceresinde renklendirilen diller (`@/components/code-window` CodeLang); öbürleri düz metin, etiket yine yazılır. */
export type CodeLang = "ts" | "tsx" | "js" | "sh" | "bash" | "json" | "html" | "text" | "http" | "yaml";
const LANG_ALIAS: Record<string, CodeLang> = {
  ts: "ts",
  typescript: "ts",
  tsx: "tsx",
  js: "js",
  javascript: "js",
  mjs: "js",
  sh: "sh",
  shell: "sh",
  bash: "bash",
  console: "bash",
  json: "json",
  jsonc: "json",
  html: "html",
  xml: "html",
  http: "http",
  yaml: "yaml",
  yml: "yaml",
  text: "text",
  txt: "text",
  plain: "text",
};

export type HeadingBlock = { h2: string; id: string };
export type CodeBlock = { code: string; lang: CodeLang; label: string; title?: string };
export type CalloutBlock = { callout: string[]; kind: "note" | "important"; label: string };
export type FigureBlock = { img: string; alt: string; caption?: string; width?: number; height?: number };
export type SourcesBlock = { sources: BlogBlock[]; title: string; id: string };
export type BlogBlock =
  | HeadingBlock
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { quote: string }
  | { table: { head: string[]; rows: string[][] } }
  | FigureBlock
  | CodeBlock
  | CalloutBlock
  | SourcesBlock;

export type BlogText = {
  title: string;
  description: string;
  coverAlt?: string;
  blocks: BlogBlock[];
  /** Ara başlıklar (içindekiler). */
  toc: { id: string; title: string }[];
  words: number;
  /** Dakika (≈ 200 kelime/dk, en az 1; kod sayılmaz). */
  readingTime: number;
};

/**
 * İlgili bağlantı: bir blog yazısı (`/blog/<slug>`), bir Learn sayfası (`/learn/<slug>`) ya da bir site sayfası
 * (`/whitepaper`, `/join` …; `routing.ts`'teki sabit yollar).
 */
export type BlogRelated = { kind: "post" | "learn" | "page"; slug: string };

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  /** YYYY-MM-DD; taslakta boş olabilir. */
  date: string | null;
  updated: string | null;
  draft: boolean;
  /** `public/` altındaki kapak görseli (ör. /blog/<slug>/cover.webp); yoksa paylaşım görseli üretilir. */
  cover: string | null;
  related: BlogRelated[];
  /** Yazının gerçekten yazıldığı diller (en, tr her zaman; tk varsa). */
  locales: BlogLocale[];
  en: BlogText;
  tr: BlogText;
  tk?: BlogText;
};

export const SHOW_DRAFTS = process.env.NODE_ENV === "development" || process.env.BLOG_DRAFTS === "1";

const DIR = path.join(process.cwd(), "src", "content", "blog");
const PUBLIC = path.join(process.cwd(), "public");

/** Site içi sabit sayfalar (ilgili bağlantı ve metin içi bağlantı denetimi için): routing.ts'teki parametresiz yollar. */
export const SITE_PAGES: string[] = Object.keys(routing.pathnames).filter((p) => !p.includes("["));

/* ---------- ön bilgi + Markdown alt kümesi ---------- */

function frontmatter(src: string): { meta: Record<string, string>; body: string } {
  const m = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return { meta: {}, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["'](.*)["']$/, "$1");
  }
  return { meta, body: src.slice(m[0].length) };
}

/** Başlıktan bağlantı kimliği (Türkçe ve Türkmence harfler sadeleşir). */
export function slugify(s: string) {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
    ä: "a", ň: "n", ý: "y", ž: "z",
  };
  return s
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîûäňýž]/g, (c) => map[c] ?? c)
    .replace(/[`*_[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const FENCE_OPEN = /^\s*```\s*([\w+-]*)\s*(.*)$/;
const FENCE_CLOSE = /^\s*```\s*$/;
const CALLOUT = /^\*\*(Not|Note|Önemli|Important|Uyarı|Warning|Bellik|Möhüm):?\*\*:?\s*/i;
const NOTE_LABEL = /^(not|note|bellik)$/i;
const SOURCES = /^(kaynaklar|kaynakça|sources|references|çeşmeler)$/i;

function codeBlock(info: string, rawLines: string[]): CodeBlock {
  const m = FENCE_OPEN.exec(info)!;
  const given = (m[1] || "text").toLowerCase();
  const title = /title\s*=\s*"([^"]*)"|title\s*=\s*'([^']*)'/.exec(m[2]);
  const indent = Math.min(...rawLines.filter((l) => l.trim()).map((l) => /^\s*/.exec(l)![0].length));
  const code = rawLines
    .map((l) => (Number.isFinite(indent) ? l.slice(indent) : l))
    .join("\n")
    .replace(/\s+$/, "");
  return {
    code,
    lang: LANG_ALIAS[given] ?? "text",
    label: given,
    ...(title ? { title: title[1] ?? title[2] } : {}),
  };
}

const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*|`|(^|\s)[*_]|[*_](\s|$)/g, "$1$2");

function parse(body: string): { blocks: BlogBlock[]; toc: BlogText["toc"]; words: number } {
  const lines = body.split(/\r?\n/);
  const blocks: BlogBlock[] = [];
  const toc: BlogText["toc"] = [];
  const ids = new Set<string>();
  let para: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;
  let quote: string[] = [];
  let table: string[][] | null = null;
  let fence: { info: string; lines: string[] } | null = null;
  let comment = false;

  const flush = () => {
    if (para.length) blocks.push({ p: para.join(" ").trim() });
    if (list) blocks.push(list.kind === "ul" ? { ul: list.items } : { ol: list.items });
    if (quote.length) {
      // Boş "> " satırı paragraf ayırır.
      const paras = quote
        .join("\n")
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\n/g, " ").trim())
        .filter(Boolean);
      const first = paras[0] ?? "";
      const c = CALLOUT.exec(first);
      if (c) {
        paras[0] = first.slice(c[0].length);
        blocks.push({
          callout: paras.filter(Boolean),
          kind: NOTE_LABEL.test(c[1]) ? "note" : "important",
          label: c[1],
        });
      } else blocks.push({ quote: paras.join(" ") });
    }
    if (table && table.length >= 1) {
      const [head, ...rows] = table;
      blocks.push({ table: { head, rows } });
    }
    para = [];
    list = null;
    quote = [];
    table = null;
  };

  for (const raw of lines) {
    if (fence) {
      if (FENCE_CLOSE.test(raw)) {
        blocks.push(codeBlock(fence.info, fence.lines));
        fence = null;
      } else fence.lines.push(raw.replace(/\s+$/, ""));
      continue;
    }
    let line = raw.trimEnd();
    if (comment) {
      const end = line.indexOf("-->");
      if (end < 0) continue;
      comment = false;
      line = line.slice(end + 3);
    }
    line = line.replace(/<!--[\s\S]*?-->/g, "");
    if (line.includes("<!--")) {
      comment = true;
      line = line.slice(0, line.indexOf("<!--"));
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    if (FENCE_OPEN.test(line)) {
      flush();
      fence = { info: line, lines: [] };
      continue;
    }
    let m: RegExpExecArray | null;
    if ((m = /^(#{2,3})\s+(.+)$/.exec(line))) {
      flush();
      const text = m[2].trim();
      if (m[1] === "##") {
        let id = slugify(text) || `section-${toc.length + 1}`;
        while (ids.has(id)) id += "-2";
        ids.add(id);
        toc.push({ id, title: text.replace(/\*\*|`/g, "") });
        blocks.push({ h2: text, id });
      } else blocks.push({ h3: text });
      continue;
    }
    if (/^#\s/.test(line)) continue; // başlık (h1) ön bilgiden gelir
    if ((m = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line))) {
      flush();
      blocks.push({ img: m[2], alt: m[1], ...(m[3] ? { caption: m[3] } : {}) });
      continue;
    }
    if (/^\|.*\|$/.test(line.trim())) {
      if (para.length || list || quote.length) flush();
      const cells = line.trim().slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // ayırıcı satır
      (table ??= []).push(cells);
      continue;
    }
    if ((m = /^>\s?(.*)$/.exec(line))) {
      if (para.length || list || table) flush();
      quote.push(m[1].trim() ? m[1] : "");
      continue;
    }
    if ((m = /^\s*[-*]\s+(.+)$/.exec(line))) {
      if (para.length || quote.length || table || (list && list.kind !== "ul")) flush();
      (list ??= { kind: "ul", items: [] }).items.push(m[1]);
      continue;
    }
    if ((m = /^\s*\d+[.)]\s+(.+)$/.exec(line))) {
      if (para.length || quote.length || table || (list && list.kind !== "ol")) flush();
      (list ??= { kind: "ol", items: [] }).items.push(m[1]);
      continue;
    }
    if (list && /^\s{2,}\S/.test(raw)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`; // liste maddesinin devamı
      continue;
    }
    if (list || quote.length || table) flush();
    para.push(line.trim());
  }
  if (fence) blocks.push(codeBlock(fence.info, fence.lines));
  flush();

  // "## Kaynaklar" / "## Sources": sonraki h2'ye kadar olan bloklar tek bölümde (küçük yazı).
  const out: BlogBlock[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if ("h2" in b && SOURCES.test(b.h2.replace(/\*\*|`/g, "").trim())) {
      const inner: BlogBlock[] = [];
      while (i + 1 < blocks.length && !("h2" in blocks[i + 1])) inner.push(blocks[++i]);
      out.push({ sources: inner, title: b.h2, id: b.id });
    } else out.push(b);
  }

  const words = out
    .flatMap((b) => ("sources" in b ? b.sources : [b]))
    .map((b) =>
      "p" in b
        ? b.p
        : "ul" in b
          ? b.ul.join(" ")
          : "ol" in b
            ? b.ol.join(" ")
            : "h2" in b
              ? b.h2
              : "h3" in b
                ? b.h3
                : "quote" in b
                  ? b.quote
                  : "callout" in b
                    ? b.callout.join(" ")
                    : "table" in b
                      ? [...b.table.head, ...b.table.rows.flat()].join(" ")
                      : "",
    )
    .map(plainText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return { blocks: out, toc, words };
}

/* ---------- görsel ölçüsü (bağımlılıksız: PNG, JPEG, WebP, GIF başlığından) ---------- */

export function imageSize(file: string): { width: number; height: number } | null {
  let b: Buffer;
  try {
    b = readFileSync(file);
  } catch {
    return null;
  }
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b.length > 10 && b.toString("ascii", 0, 3) === "GIF") return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) };
  if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const kind = b.toString("ascii", 12, 16);
    if (kind === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    if (kind === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const n = b.readUInt32LE(21);
      return { width: 1 + (n & 0x3fff), height: 1 + ((n >> 14) & 0x3fff) };
    }
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
      i += 2 + len;
    }
  }
  return null;
}

/* ---------- yükleme + denetim ---------- */

const bool = (v?: string) => v === "true" || v === "yes";
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SHARED = ["category", "date", "draft", "cover", "related", "updated"] as const;

const walk = (blocks: BlogBlock[]): BlogBlock[] => blocks.flatMap((b) => ("sources" in b ? [b, ...walk(b.sources)] : [b]));
/** Bir dildeki bütün satır içi metin (bağlantı denetimi için). */
const inlineText = (blocks: BlogBlock[]) => JSON.stringify(walk(blocks).filter((b) => !("code" in b)));

const isLearn = (s: string) => LEARN_PAGES.some((p) => p.slug === s);
const isPage = (p: string) => SITE_PAGES.includes(p);

function load(): BlogPost[] {
  if (!existsSync(DIR)) return [];
  const errors: string[] = [];
  const posts: (BlogPost & { relatedRaw: string[] })[] = [];
  for (const slug of readdirSync(DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .map((d) => d.name)) {
    const files: Partial<Record<BlogLocale, ReturnType<typeof frontmatter>>> = {};
    for (const lang of ["en", "tr", "tk"] as BlogLocale[]) {
      const file = path.join(DIR, slug, `article.${lang}.md`);
      if (existsSync(file)) files[lang] = frontmatter(readFileSync(file, "utf8"));
      else if (REQUIRED.includes(lang)) errors.push(`${slug}: article.${lang}.md yok (en ve tr zorunlu)`);
    }
    if (!files.en || !files.tr) continue;
    if (!/^[a-z0-9-]+$/.test(slug)) errors.push(`${slug}: klasör adı yalnız küçük harf, rakam ve tire`);
    const locales = (["en", "tr", "tk"] as BlogLocale[]).filter((l) => files[l]);
    const m = files.en.meta;
    for (const k of SHARED)
      for (const l of locales)
        if ((files[l]!.meta[k] ?? "") !== (m[k] ?? "")) errors.push(`${slug}: "${k}" ${l} ile en arasında farklı`);
    for (const l of locales) {
      const f = files[l]!;
      if (f.meta.slug && f.meta.slug !== slug)
        errors.push(`${slug}: article.${l}.md slug "${f.meta.slug}" klasör adıyla aynı değil`);
      if (f.meta.lang && f.meta.lang !== l) errors.push(`${slug}: article.${l}.md lang "${f.meta.lang}"`);
      if (!f.meta.title) errors.push(`${slug}: ${l} başlık (title) boş`);
      if (!f.meta.description) errors.push(`${slug}: ${l} açıklama (description) boş`);
    }
    const draft = bool(m.draft);
    const category = m.category as BlogCategory;
    if (!BLOG_CATEGORIES.includes(category))
      errors.push(`${slug}: bilinmeyen ya da boş kategori "${m.category ?? ""}" (${BLOG_CATEGORIES.join(", ")})`);
    const date = m.date && DATE.test(m.date) ? m.date : null;
    if (m.date && !date) errors.push(`${slug}: tarih YYYY-AA-GG olmalı ("${m.date}")`);
    if (!draft && !date) errors.push(`${slug}: yayımlanan yazının tarihi olmalı (ya da draft: true)`);
    if (m.updated && !DATE.test(m.updated)) errors.push(`${slug}: updated YYYY-AA-GG olmalı ("${m.updated}")`);
    const cover = m.cover || null;
    if (cover && !existsSync(path.join(PUBLIC, cover))) errors.push(`${slug}: kapak görseli yok: public${cover}`);
    const relatedRaw = (m.related ?? "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);

    const text = (lang: BlogLocale): BlogText => {
      const f = files[lang]!;
      const p = parse(f.body);
      for (const b of walk(p.blocks)) {
        if (!("img" in b)) continue;
        if (!b.alt.trim()) errors.push(`${slug}: ${lang} görselin alt metni boş: ${b.img}`);
        if (!b.img.startsWith("/")) {
          errors.push(`${slug}: ${lang} görsel yerel olmalı (/blog/${slug}/${lang}/fig-….png): ${b.img}`);
          continue;
        }
        if (!b.img.startsWith(`/blog/${slug}/`))
          errors.push(`${slug}: ${lang} görsel /blog/${slug}/ altında olmalı: ${b.img}`);
        const file = path.join(PUBLIC, decodeURI(b.img.split(/[?#]/)[0]));
        const size = imageSize(file);
        if (size) Object.assign(b, size);
        else if (!existsSync(file)) {
          const msg = `${slug}: ${lang} görsel yok: public${b.img}`;
          if (draft) console.warn(`[blog] ${msg} (taslak)`);
          else errors.push(msg);
        }
      }
      return {
        title: f.meta.title,
        description: f.meta.description,
        coverAlt: f.meta.coverAlt || undefined,
        ...p,
        readingTime: Math.max(1, Math.round(p.words / 200)),
      };
    };
    posts.push({
      slug,
      category,
      date,
      updated: m.updated && DATE.test(m.updated) ? m.updated : null,
      draft,
      cover,
      related: [],
      relatedRaw,
      locales,
      en: text("en"),
      tr: text("tr"),
      ...(files.tk ? { tk: text("tk") } : {}),
    });
  }

  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  for (const p of posts) {
    // İlgili: "blog:<slug>" · "learn:<slug>" · "page:/<yol>" açıkça; yalın slug önce yazı, sonra Learn sayfası diye aranır.
    for (const r of p.relatedRaw) {
      const [, prefix, s] = /^(?:(blog|learn|page):)?(.+)$/.exec(r)!;
      if (prefix === "page") {
        const pg = s.startsWith("/") ? s : `/${s}`;
        if (isPage(pg)) p.related.push({ kind: "page", slug: pg });
        else errors.push(`${p.slug}: ilgili site sayfası yok: ${r} (geçerli: ${SITE_PAGES.join(", ")})`);
        continue;
      }
      const post = prefix !== "learn" ? bySlug.get(s) : undefined;
      if (post && s !== p.slug) {
        p.related.push({ kind: "post", slug: s });
        if (!p.draft && post.draft) errors.push(`${p.slug}: yayımlanan yazı taslağı ilgili gösteriyor: ${r}`);
      } else if (prefix !== "blog" && isLearn(s)) p.related.push({ kind: "learn", slug: s });
      else errors.push(`${p.slug}: ilgili bağlantı yok (yazı, learn:<slug> ya da page:/<yol>): ${r}`);
    }
    for (const lang of p.locales) {
      const json = inlineText(p[lang]!.blocks);
      // Metin içi site bağlantıları: /blog/<slug>, /learn/<slug> ve sabit sayfalar var olmalı (dil öneki yazılmaz).
      for (const x of json.matchAll(/\]\((\/[^)\s"]*)\)/g)) {
        const href = x[1].split(/[?#]/)[0].replace(/\/$/, "") || "/";
        if (/^\/(en|tr|tk)(\/|$)/.test(href)) {
          errors.push(`${p.slug}: ${lang} site içi bağlantıda dil öneki yazılmaz: ${x[1]}`);
          continue;
        }
        // /blog/rss.xml: sayfanın kendi dilindeki akış olarak çizilir (rich.tsx SmartLink → /<dil>/blog/rss.xml)
        if (href === "/blog/rss.xml") continue;
        let bm: RegExpExecArray | null;
        if ((bm = /^\/blog\/([a-z0-9-]+)$/.exec(href))) {
          const target = bySlug.get(bm[1]);
          if (!target) errors.push(`${p.slug}: ${lang} bağlantı kırık ${href}`);
          else if (!p.draft && target.draft) errors.push(`${p.slug}: ${lang} yayımlanan yazı taslağa bağlanıyor ${href}`);
        } else if ((bm = /^\/learn\/([a-z0-9-]+)$/.exec(href))) {
          if (!isLearn(bm[1])) errors.push(`${p.slug}: ${lang} bağlantı kırık ${href}`);
        } else if (href.startsWith("/blog/") && /\.\w+$/.test(href)) {
          if (!existsSync(path.join(PUBLIC, decodeURI(href)))) errors.push(`${p.slug}: ${lang} dosya yok: public${href}`);
        } else if (!isPage(href) && !/\.\w+$/.test(href)) errors.push(`${p.slug}: ${lang} bağlantı kırık ${href}`);
      }
      // Dış bağlantılar yalnız https (mailto hariç).
      for (const x of json.matchAll(/\]\((http:\/\/[^)\s"]+)\)/g))
        errors.push(`${p.slug}: ${lang} dış bağlantı https olmalı: ${x[1]}`);
    }
  }
  if (errors.length) throw new Error(`Blog içeriği hatalı:\n${errors.join("\n")}`);
  return posts
    .map(({ relatedRaw: _r, ...p }) => p)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.slug.localeCompare(b.slug));
}

const ALL = load();

/** Sitede görünen yazılar: yayında yalnız taslak olmayanlar; geliştirmede (ya da BLOG_DRAFTS=1) taslaklar da. */
export const POSTS = ALL.filter((p) => SHOW_DRAFTS || !p.draft);
/** RSS ve site haritası: her zaman yalnız yayımlananlar. */
export const PUBLISHED = ALL.filter((p) => !p.draft);

export const blogPath = (slug?: string) => (slug ? `/blog/${slug}` : "/blog");
export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
/** Dile göre metin; tk yoksa İngilizce (sayfa bunu `isFallback` ile bildirir). */
export const postText = (p: BlogPost, locale: string): BlogText =>
  (locale === "tr" ? p.tr : locale === "tk" ? p.tk : undefined) ?? p.en;
export const isFallback = (p: BlogPost, locale: string) => !p.locales.includes(locale as BlogLocale);
/** Sayfada gösterilecek ilgili bağlantılar: yayında görünmeyen (taslak) yazılar düşer. */
export const visibleRelated = (p: BlogPost) => p.related.filter((r) => r.kind !== "post" || !!postBySlug(r.slug));

/* ---------- eski arayüzle uyumlu kısa liste (ana sayfa "Haberler" bölümü) ---------- */

export type PostMeta = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  readingTime: string;
};

export function getPostsMeta(locale: string): PostMeta[] {
  return PUBLISHED.filter((p) => p.date).map((p) => {
    const x = postText(p, locale);
    return {
      slug: p.slug,
      date: p.date!,
      title: x.title,
      description: x.description,
      tag: categoryLabel(p.category, locale),
      readingTime: `${x.readingTime} min`,
    };
  });
}

export const allSlugs = () => POSTS.map((p) => p.slug);
export const formatPostDate = (p: BlogPost, locale: string) => (p.date ? formatDate(p.date, locale) : "");

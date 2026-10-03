# -*- coding: utf-8 -*-
"""Whitepaper üreteci: content.py (tek kaynak) → src/content/whitepaper.tsx + whitepaper/tamga-whitepaper-{en,tr,tk}.typ.
Kullanım (tamga-web kökünden): python whitepaper/source/generate.py && npx prettier --write src/content/whitepaper.tsx
  && powershell -File whitepaper/build.ps1"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from content import CODE, IDS, LANGS, TABLES, TABLE_MONO

# PDF: bu bölümler yeni sayfada başlar (bölüm geçişleri; web sayfasını etkilemez)
CHAPTER_BREAKS = {"trust", "privacy", "ledger", "status"}

WEB = os.path.normpath(os.path.join(HERE, "..", "..")).replace("\\", "/") + "/"
TOK = re.compile(r"\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)")


# ---------------- TSX ----------------
def jsx_text(t):
    out = []
    for ch in t:
        if ch in "{}<>":
            out.append('{"' + ch + '"}')
        else:
            out.append(ch)
    return "".join(out)


def jsx_inline(t):
    res, pos = [], 0
    for m in TOK.finditer(t):
        res.append(jsx_text(t[pos:m.start()]))
        if m.group(1) is not None:
            res.append("<strong>" + jsx_inline(m.group(1)) + "</strong>")
        elif m.group(2) is not None:
            res.append("<code>" + jsx_text(m.group(2)) + "</code>")
        else:
            if m.group(4).startswith("http"):
                res.append('<a href="' + m.group(4) + '">' + jsx_text(m.group(3)) + "</a>")
            else:
                res.append('<Link href="' + m.group(4) + '">' + jsx_text(m.group(3)) + "</Link>")
        pos = m.end()
    res.append(jsx_text(t[pos:]))
    return "".join(res)


def jsx_blocks(blocks, ind="        ", lang="en"):
    out = []
    for b in blocks:
        k = b[0]
        if k == "p":
            out.append(f"{ind}<p>{jsx_inline(b[1])}</p>")
        elif k == "ul":
            out.append(f"{ind}<ul>")
            out += [f"{ind}  <li>{jsx_inline(i)}</li>" for i in b[1]]
            out.append(f"{ind}</ul>")
        elif k == "code":
            out.append(f"{ind}<Code label={json.dumps(b[1], ensure_ascii=False)} code={{C_{b[2].upper()}}} />")
        elif k == "table":
            rows = json.dumps([list(r) for r in TABLES[b[2]][lang]], ensure_ascii=False)
            mono = " mono" if b[2] in TABLE_MONO else ""
            out.append(f"{ind}<KV label={json.dumps(b[1], ensure_ascii=False)} rows={{{rows}}}{mono} />")
        elif k == "note":
            out.append(f'{ind}<p className="text-sm text-foreground-subtle">{jsx_inline(b[1])}</p>')
    return "\n".join(out)


def tsx():
    L = []
    L.append('''import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/*
 * Whitepaper v1.0 (2026-10-03). Aynı içerik whitepaper/tamga-whitepaper-{en,tr,tk}.typ (PDF) ile birebir;
 * ikisi de whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme. Kaynaklar: tamga-network DECISIONS §0,
 * ADR-0009…0014, ADR-0031, ADR-0032, ADR-0035…0038, Tamga ARF 1.0 (FW-ARF-0001…0006), SPEC-TRUST-0001, SPEC-API-0001, SPEC-PROTO-0002.
 */

export type WhitepaperSection = { id: string; n: string; title: string; body: ReactNode };

export type WhitepaperContent = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  subtitle: string;
  abstractLabel: string;
  abstract: ReactNode;
  tocLabel: string;
  sections: WhitepaperSection[];
  slogan: string;
};

/** Small code/diagram block used inside a section body. */
function Code({ label, code }: { label: string; code: string }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      <div className="border-b border-border px-4 py-2">
        <span className="mono-label">{label}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed text-foreground-muted">
        {code}
      </pre>
    </div>
  );
}

/** Key / description table (files, identifiers, pipeline steps, phases). */
function KV({ label, rows, mono }: { label: string; rows: string[][]; mono?: boolean }) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-surface/60">
      {label && (
        <div className="border-b border-border px-4 py-2">
          <span className="mono-label">{label}</span>
        </div>
      )}
      <dl className="divide-y divide-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
            <dt className="font-mono text-[0.8rem] text-foreground">{k}</dt>
            <dd className={`text-sm leading-relaxed text-foreground-muted ${mono ? "font-mono text-[0.8rem] break-words" : ""}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* --- Language-neutral blocks (shared across locales) --- */
''')
    for k, v in CODE.items():
        L.append(f"const C_{k.upper()} = {json.dumps(v, ensure_ascii=False)};")
    for lang, d in LANGS.items():
        L.append(f"\nconst {lang}: WhitepaperContent = {{")
        L.append(f"  meta: {{ title: {json.dumps(d['meta_title'], ensure_ascii=False)}, description: {json.dumps(d['meta_desc'], ensure_ascii=False)} }},")
        for key, name in [("eyebrow", "eyebrow"), ("title", "title"), ("subtitle", "subtitle"), ("abstract_label", "abstractLabel"), ("toc", "tocLabel")]:
            if name == "abstractLabel":
                continue
            L.append(f"  {name}: {json.dumps(d[key], ensure_ascii=False)},")
        L.append(f"  abstractLabel: {json.dumps(d['abstract_label'], ensure_ascii=False)},")
        L.append("  abstract: (\n    <>")
        for para in d["abstract"]:
            L.append(f"      <p>{jsx_inline(para)}</p>")
        L.append("    </>\n  ),")
        L.append("  sections: [")
        for i, sid in enumerate(IDS, 1):
            title, blocks = d["sections"][sid]
            L.append(f'    {{\n      id: "{sid}",\n      n: "{i:02d}",\n      title: {json.dumps(title, ensure_ascii=False)},\n      body: (\n        <>')
            L.append(jsx_blocks(blocks, "          ", lang))
            L.append("        </>\n      ),\n    },")
        L.append("  ],")
        L.append('  slogan: "Building Trust Infrastructure for the Digital World.",')
        L.append("};")
    L.append('''
const content: Record<Locale, WhitepaperContent> = { en, tr, tk };

export function getWhitepaperContent(locale: string): WhitepaperContent {
  return content[locale as Locale] ?? content.en;
}
''')
    open(WEB + "src/content/whitepaper.tsx", "w", encoding="utf-8", newline="").write("\n".join(L))


# ---------------- Typst ----------------
SPECIAL = set("\\#$*_@<>[]`~=+")


def ty_text(t):
    out = []
    for ch in t:
        out.append("\\" + ch if ch in SPECIAL else ch)
    s = "".join(out)
    return s.replace("//", "/\\/")


def ty_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def ty_inline(t, lang):
    res, pos = [], 0
    for m in TOK.finditer(t):
        res.append(ty_text(t[pos:m.start()]))
        if m.group(1) is not None:
            res.append("*" + ty_inline(m.group(1), lang) + "*")
        elif m.group(2) is not None:
            res.append("#raw(" + ty_str(m.group(2)) + ")")
        else:
            url = m.group(4) if m.group(4).startswith("http") else "https://tamga.network/" + lang + m.group(4)
            res.append("#link(" + ty_str(url) + ")[" + ty_text(m.group(3)) + "]")
        pos = m.end()
    res.append(ty_text(t[pos:]))
    return "".join(res)


def typst(lang, d):
    L = [f"// Tamga Network — Whitepaper v1.0 ({lang}). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.",
         f"// Build:  typst compile --root . tamga-whitepaper-{lang}.typ ../public/whitepaper-{lang}.pdf",
         '#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted', "",
         "#show: conf.with(",
         f'  lang: "{lang}",',
         f"  title: [{d['pdf_title']}],",
         f"  subtitle: [{ty_inline(d['subtitle'], lang)}],",
         f'  labels: (abstract: {ty_str(d["abstract_label"])}, contents: {ty_str(d["toc"])}, version: {ty_str(d["version"])}),',
         f'  footer-right: {ty_str(d["footer"])},',
         "  abstract: ["]
    for para in d["abstract"]:
        L.append("    " + ty_inline(para, lang))
        L.append("")
    L.append("  ],")
    L.append(")")
    L.append("")
    for sid in IDS:
        title, blocks = d["sections"][sid]
        if sid in CHAPTER_BREAKS:
            L.append("#chapter()")
        L.append("= " + ty_text(title))
        L.append("")
        for b in blocks:
            if b[0] == "p":
                L.append(ty_inline(b[1], lang))
                L.append("")
            elif b[0] == "ul":
                for i in b[1]:
                    L.append("- " + ty_inline(i, lang))
                L.append("")
            elif b[0] == "code":
                L.append(f"#codeblock({ty_str(b[1])}, {ty_str(CODE[b[2]])})")
                L.append("")
            elif b[0] == "table":
                rows = ", ".join("(" + ty_str(k) + ", " + ty_str(v) + ")" for k, v in TABLES[b[2]][lang])
                mono = "true" if b[2] in TABLE_MONO else "false"
                L.append(f"#kvtable({ty_str(b[1])}, ({rows},), mono: {mono})")
                L.append("")
            elif b[0] == "note":
                L.append(f"#notebox[{ty_inline(b[1], lang)}]")
                L.append("")
    open(WEB + f"whitepaper/tamga-whitepaper-{lang}.typ", "w", encoding="utf-8", newline="").write("\n".join(L))


tsx()
for lang, d in LANGS.items():
    typst(lang, d)
print("ok")

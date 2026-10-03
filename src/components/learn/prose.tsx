import type { ReactNode } from "react";
import { Globe2, Info, TriangleAlert } from "lucide-react";
import { getLearnUi } from "@/content/learn";
import type { DiagramKey } from "@/content/learn/types";
import { LearnDiagram } from "./learn-diagram";

/*
 * Learn sayfalarında kullanılan parçalar. Bölüm yazarları gövdeyi bunlarla yazar:
 *
 *   <p>… <Term tip="…" en="hash">özet</Term> …</p>
 *   <Callout kind="turkic" locale={locale}>Bakü'de verilen bir belge…</Callout>
 *   <Figure diagram="disclosure" locale={locale} caption="…" />      // hazır şema
 *   <Figure caption="…"><BenimSemam /></Figure>                         // özel şema
 *
 * Başlıklar gövdede <h2>/<h3> ile yazılır; biçim `.learn-prose` sınıfından gelir.
 */

export { Term } from "./term";

type CalloutKind = "info" | "turkic" | "caution";

const ICON = { info: Info, turkic: Globe2, caution: TriangleAlert } as const;
const TONE: Record<CalloutKind, string> = {
  info: "border-primary/25 bg-primary/[0.05]",
  turkic: "border-gold/35 bg-gold/[0.07]",
  caution: "border-[color:var(--dg-warn,#b45309)]/35 bg-[color:var(--dg-warn,#b45309)]/[0.06]",
};
const ICON_TONE: Record<CalloutKind, string> = {
  info: "text-primary",
  turkic: "text-gold",
  caution: "text-[color:var(--dg-warn,#b45309)]",
};

/** Bilgi kutusu: "Bilgi", "Türk dünyasında", "Dikkat". Başlık verilmezse türün adı yazılır. */
export function Callout({
  kind = "info",
  title,
  locale,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  locale: string;
  children: ReactNode;
}) {
  const Icon = ICON[kind];
  const label = title ?? getLearnUi(locale).callout[kind];
  return (
    <aside className={`not-prose my-7 flex gap-3.5 rounded-xl border px-5 py-4 ${TONE[kind]}`}>
      <Icon size={18} strokeWidth={1.8} aria-hidden className={`mt-0.5 shrink-0 ${ICON_TONE[kind]}`} />
      <div className="min-w-0 space-y-1.5 text-[15px] leading-relaxed text-foreground-muted">
        <p className="m-0 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-foreground">{label}</p>
        <div className="space-y-2 [&_p]:m-0">{children}</div>
      </div>
    </aside>
  );
}

/** Şema çerçevesi: hazır şema (`diagram`) ya da içerik (`children`), altında kısa açıklama. */
export function Figure({
  diagram,
  locale,
  caption,
  children,
}: {
  diagram?: DiagramKey;
  locale?: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <figure className="not-prose my-9">
      <div className="overflow-hidden rounded-2xl border border-border bg-background-elevated p-3 sm:p-5">
        {diagram && locale ? <LearnDiagram diagram={diagram} locale={locale} /> : children}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-[13px] leading-relaxed text-foreground-subtle">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

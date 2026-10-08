import { Callout } from "@/components/learn/prose";
import { CodeWindow } from "@/components/code-window";
import type { BlogBlock, CodeBlock, FigureBlock } from "@/lib/blog";
import { Rich } from "./rich";

/*
 * Blog yazısı gövdesi: `.learn-prose` okuma sütunu biçimi + sitenin kod penceresi (CodeWindow, shiki derlemede), Learn'deki
 * bilgi kutusu (Not → bilgi, Önemli → dikkat), görsel çerçevesi ve küçük yazılı Kaynaklar bölümü.
 */

export type PostBodyLabels = { copy: string; copied: string; code: string };

/** Kod penceresinde görünen dil adı. */
const LANG_NAME: Record<string, string> = {
  json: "JSON",
  jsonc: "JSON",
  http: "HTTP",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  mjs: "JavaScript",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  console: "Shell",
  text: "Text",
  txt: "Text",
  plain: "Text",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  xml: "XML",
  "cbor-diag": "CBOR diag",
};

export function PostBody({ blocks, labels }: { blocks: BlogBlock[]; labels: PostBodyLabels }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Body key={i} block={b} labels={labels} />
      ))}
    </>
  );
}

function Body({ block: b, labels }: { block: BlogBlock; labels: PostBodyLabels }) {
  if ("code" in b) return <Code block={b} labels={labels} />;
  if ("img" in b) return <Figure block={b} />;
  if ("callout" in b)
    return (
      <Callout kind={b.kind === "note" ? "info" : "caution"} title={b.label} locale="en">
        {b.callout.map((p, i) => (
          <p key={i}>
            <Rich text={p} />
          </p>
        ))}
      </Callout>
    );
  if ("sources" in b)
    return (
      <section className="blog-sources" aria-labelledby={b.id}>
        <h2 id={b.id}>
          <Rich text={b.title} />
        </h2>
        <PostBody blocks={b.sources} labels={labels} />
      </section>
    );
  if ("h2" in b)
    return (
      <h2 id={b.id}>
        <Rich text={b.h2} />
      </h2>
    );
  if ("h3" in b)
    return (
      <h3>
        <Rich text={b.h3} />
      </h3>
    );
  if ("p" in b)
    return (
      <p>
        <Rich text={b.p} />
      </p>
    );
  if ("ul" in b)
    return (
      <ul>
        {b.ul.map((x, i) => (
          <li key={i}>
            <Rich text={x} />
          </li>
        ))}
      </ul>
    );
  if ("ol" in b)
    return (
      <ol>
        {b.ol.map((x, i) => (
          <li key={i}>
            <Rich text={x} />
          </li>
        ))}
      </ol>
    );
  if ("quote" in b)
    return (
      <blockquote>
        <Rich text={b.quote} />
      </blockquote>
    );
  if ("table" in b)
    return (
      <table>
        <thead>
          <tr>
            {b.table.head.map((h, i) => (
              <th key={i} scope="col">
                <Rich text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>
                  <Rich text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  return null;
}

function Code({ block: b, labels }: { block: CodeBlock; labels: PostBodyLabels }) {
  const name = LANG_NAME[b.label] ?? b.label.toUpperCase();
  return (
    <CodeWindow
      code={b.code}
      lang={b.lang}
      filename={b.title ?? name}
      badge={b.title ? name : undefined}
      numbers={b.code.split("\n").length >= 4}
      copyLabel={labels.copy}
      copiedLabel={labels.copied}
      label={`${labels.code}: ${b.title ?? name}`}
      className="my-8"
    />
  );
}

/** Görsel: Learn şema çerçevesiyle aynı kart; görseller açık temalı olabilir, koyu temada da beyaz zeminde okunur. */
function Figure({ block: b }: { block: FigureBlock }) {
  const caption = b.caption ?? b.alt;
  return (
    <figure className="blog-figure not-prose my-9">
      <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 sm:p-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- önceden hazırlanmış statik görsel; ölçü derlemede okunur */}
        <img
          src={b.img}
          alt={b.alt}
          {...(b.width && b.height ? { width: b.width, height: b.height } : {})}
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto max-w-full rounded-lg"
        />
      </div>
      {caption ? (
        // Alt yazı alt metinle aynıysa ekran okuyucu iki kez okumasın.
        <figcaption
          aria-hidden={caption === b.alt ? true : undefined}
          className="mt-3 text-center text-[13px] leading-relaxed text-foreground-subtle"
        >
          <Rich text={caption} />
        </figcaption>
      ) : null}
    </figure>
  );
}

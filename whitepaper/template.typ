// Shared academic whitepaper template for Tamga Network.
// Language content files (en/tr/tk) import `conf` and call it with their text.

#let al = rgb("#B01E22")
#let gold = rgb("#9c7b25")
#let ink = rgb("#1a1a1a")
#let muted = rgb("#4a4a4a")

// Code / diagram block
#let codeblock(body) = block(
  width: 100%,
  fill: rgb("#f5f2ec"),
  stroke: 0.5pt + rgb("#e0d9cb"),
  radius: 3pt,
  inset: 9pt,
)[#body]

// Callout note box (left gold rule)
#let notebox(body) = block(
  width: 100%,
  fill: rgb("#faf6ee"),
  stroke: (left: 2pt + gold),
  inset: 9pt,
  radius: 2pt,
)[#text(size: 9pt, fill: muted)[#body]]

#let conf(
  lang: "en",
  title: [],
  subtitle: [],
  slogan: "Building Trust Infrastructure for the Digital World.",
  labels: (:),
  footer-right: "Whitepaper v1.0",
  footer-left: "Tamga Network",
  abstract: [],
  body,
) = {
  let lb = (
    abstract: "Abstract",
    contents: "Contents",
    version: "WHITEPAPER · VERSION 1.0",
  ) + labels

  set document(title: title, author: "Tamga Network")
  set text(font: "New Computer Modern", size: 10.5pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.68em, spacing: 1.1em)

  show link: it => text(fill: al, it)
  show raw: set text(font: "DejaVu Sans Mono", size: 8.5pt)

  set heading(numbering: "1.1  ")
  show heading: set text(fill: ink)
  show heading.where(level: 1): it => [
    #v(0.6em)
    #text(size: 13pt, weight: 700, fill: al)[#it]
    #v(0.1em)
  ]
  show heading.where(level: 2): it => [
    #v(0.2em)
    #text(size: 11pt, weight: 700)[#it]
  ]

  // ---- Title page ----
  set page(
    paper: "a4",
    margin: (x: 2.4cm, top: 2.6cm, bottom: 2.4cm),
    footer: none,
    numbering: none,
  )

  align(center + horizon)[
    #image("seal.svg", width: 2.5cm)
    #v(10pt)
    #text(size: 10pt, tracking: 3pt, fill: muted)[TAMGA NETWORK]
    #v(6pt)
    #line(length: 30%, stroke: 0.8pt + gold)
    #v(18pt)
    #text(size: 22pt, weight: 700)[#title]
    #v(14pt)
    #block(width: 78%)[
      #text(size: 11pt, fill: muted, style: "italic")[#subtitle]
    ]
    #v(30pt)
    #text(size: 10pt, tracking: 1.5pt, fill: muted)[
      #lb.version · #datetime.today().year()
    ]
    #v(8pt)
    #text(size: 10pt, fill: gold, style: "italic")[#slogan]
  ]

  pagebreak()

  // ---- Body ----
  set page(footer: context [
    #set text(size: 8pt, fill: muted)
    #line(length: 100%, stroke: 0.4pt + rgb("#e0d9cb"))
    #v(2pt)
    #grid(
      columns: (1fr, 1fr, 1fr),
      align(left)[#footer-left],
      align(center)[#counter(page).display()],
      align(right)[#footer-right],
    )
  ])
  counter(page).update(1)

  align(center)[#text(size: 12pt, weight: 700, fill: al)[#lb.abstract]]
  v(2pt)
  block(inset: (x: 6pt))[#abstract]

  v(10pt)
  outline(title: text(size: 12pt, weight: 700, fill: al)[#lb.contents], indent: 1.2em)

  v(6pt)
  line(length: 100%, stroke: 0.4pt + rgb("#e0d9cb"))

  body
}

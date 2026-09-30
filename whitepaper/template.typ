// Shared academic whitepaper template for Tamga Network.
// Language content files (en/tr/tk) import `conf` and call it with their text.

#let al = rgb("#B01E22")
#let gold = rgb("#9c7b25")
#let ink = rgb("#1a1a1a")
#let muted = rgb("#4a4a4a")

#let rule = rgb("#e0d9cb")
#let paper2 = rgb("#f7f4ee")

// Small caption above a figure (kept on the same page as the figure)
#let caption(label) = if label != "" {
  block(below: 5pt, text(font: "DejaVu Sans Mono", size: 7pt, tracking: 0.6pt, fill: gold)[#upper(label)])
}

// Code block: caption + code never split across pages
#let codeblock(label, code) = block(breakable: false, width: 100%, above: 12pt, below: 12pt)[
  #caption(label)
  #block(width: 100%, fill: paper2, stroke: (left: 1.6pt + gold, rest: 0.4pt + rule), inset: (x: 11pt, y: 9pt), radius: 2pt)[
    #set par(justify: false, leading: 0.55em)
    #text(font: "DejaVu Sans Mono", size: 7.6pt, fill: ink)[#raw(block: true, code)]
  ]
]

// Key / description table: mono keys, wrapping descriptions; never split across pages
#let kvtable(label, rows, mono: false) = block(breakable: false, width: 100%, above: 12pt, below: 12pt)[
  #caption(label)
  #set par(justify: false, leading: 0.55em)
  #table(
    columns: (auto, 1fr),
    inset: (x: 8pt, y: 5.5pt),
    stroke: (x, y) => (top: if y == 0 { 0.8pt + gold } else { 0.4pt + rule }, bottom: if y == rows.len() - 1 { 0.8pt + gold } else { none }),
    fill: (x, y) => if calc.odd(y) { paper2 } else { none },
    ..rows.map(((k, v)) => (
      text(font: "DejaVu Sans Mono", size: 7.6pt, weight: "bold", fill: ink)[#k],
      if mono { text(font: "DejaVu Sans Mono", size: 7.6pt, fill: muted)[#v] } else { text(size: 9pt, fill: muted)[#v] },
    )).flatten(),
  )
]

// Chapter boundary: next major section starts on a fresh page (a no-op at the top of a page)
#let chapter() = pagebreak(weak: true)

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
  // Headings stay with the text that follows (sticky): no heading alone at the bottom of a page
  show heading.where(level: 1): it => block(sticky: true, above: 22pt, below: 10pt)[
    #text(size: 13pt, weight: 700, fill: al)[#it]
  ]
  show heading.where(level: 2): it => block(sticky: true, above: 14pt, below: 7pt)[
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
    #block[#set par(justify: false); #set text(hyphenate: false); #text(size: 22pt, weight: 700)[#title]]
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

  // Abstract and contents on their own page; the body starts fresh
  pagebreak()

  body
}

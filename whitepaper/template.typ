// Shared whitepaper template for Tamga Network (brand 2026-10-02).
// Language content files (en/tr/tk) import `conf` and call it with their text.
// Fonts: headings Onest, body IBM Plex Sans, code IBM Plex Mono (build.ps1 passes --font-path).
// Onest is not available locally yet; headings fall back to IBM Plex Sans until it is added.

#let gok = rgb("#1E5A78")       // primary accent (gok-600)
#let gok-700 = rgb("#174A63")
#let gok-50 = rgb("#EEF5F8")
#let gold = rgb("#C8A24C")      // small accents only
#let ink = rgb("#14120F")
#let muted = rgb("#4A4740")
#let rule = rgb("#E2DCCF")
#let paper = rgb("#F8F6F1")
#let band = rgb("#101820")

#let sans = ("IBM Plex Sans", "New Computer Modern")
#let head = ("IBM Plex Sans", "New Computer Modern")   // Onest when available
#let mono = ("IBM Plex Mono", "DejaVu Sans Mono")

// Small caption above a figure (kept on the same page as the figure)
#let caption(label) = if label != "" {
  block(below: 5pt, text(font: mono, size: 7pt, weight: 500, tracking: 0.6pt, fill: gok)[#upper(label)])
}

// Code block: caption + code never split across pages
#let codeblock(label, code) = block(breakable: false, width: 100%, above: 12pt, below: 12pt)[
  #caption(label)
  #block(width: 100%, fill: paper, stroke: (left: 1.6pt + gok, rest: 0.4pt + rule), inset: (x: 11pt, y: 9pt), radius: 2pt)[
    #set par(justify: false, leading: 0.55em)
    #text(font: mono, size: 7.6pt, fill: ink)[#raw(block: true, code)]
  ]
]

// Key / description table: mono keys, wrapping descriptions; never split across pages
#let kvtable(label, rows, mono: false) = block(breakable: false, width: 100%, above: 12pt, below: 12pt)[
  #caption(label)
  #set par(justify: false, leading: 0.55em)
  #table(
    columns: (auto, 1fr),
    inset: (x: 8pt, y: 5.5pt),
    stroke: (x, y) => (top: if y == 0 { 0.8pt + gok } else { 0.4pt + rule }, bottom: if y == rows.len() - 1 { 0.8pt + gok } else { none }),
    fill: (x, y) => if calc.odd(y) { paper } else { none },
    ..rows.map(((k, v)) => (
      text(font: ("IBM Plex Mono", "DejaVu Sans Mono"), size: 7.6pt, weight: 600, fill: ink)[#k],
      if mono { text(font: ("IBM Plex Mono", "DejaVu Sans Mono"), size: 7.6pt, fill: muted)[#v] } else { text(size: 9pt, fill: muted)[#v] },
    )).flatten(),
  )
]

// Chapter boundary: next major section starts on a fresh page (a no-op at the top of a page)
#let chapter() = pagebreak(weak: true)

// Callout note box (left Gök rule)
#let notebox(body) = block(
  width: 100%,
  fill: gok-50,
  stroke: (left: 2pt + gok),
  inset: 9pt,
  radius: 2pt,
)[#text(size: 9pt, fill: muted)[#body]]

#let conf(
  lang: "en",
  title: [],
  subtitle: [],
  slogan: "Building Trust Infrastructure for the Digital World.",
  labels: (:),
  date: "2026-10-03",
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
  set text(font: sans, size: 10pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.7em, spacing: 1.1em)

  show link: it => text(fill: gok, it)
  show raw: set text(font: mono, size: 8.5pt)
  show strong: set text(weight: 600)

  set heading(numbering: "1.1  ")
  show heading: set text(font: head, fill: ink)
  // Headings stay with the text that follows (sticky): no heading alone at the bottom of a page
  show heading.where(level: 1): it => block(sticky: true, above: 22pt, below: 10pt)[
    #text(size: 13pt, weight: 600, fill: gok)[#it]
  ]
  show heading.where(level: 2): it => block(sticky: true, above: 14pt, below: 7pt)[
    #text(size: 11pt, weight: 600)[#it]
  ]

  // ---- Title page ----
  set page(
    paper: "a4",
    margin: (x: 2.4cm, top: 2.6cm, bottom: 2.4cm),
    footer: none,
    numbering: none,
    background: place(bottom, rect(width: 100%, height: 1.1cm, fill: band)),
  )

  align(center + horizon)[
    #image("logo.svg", width: 2.4cm)
    #v(14pt)
    #text(font: head, size: 10pt, weight: 600, tracking: 3pt, fill: gok)[TAMGA NETWORK]
    #v(6pt)
    #line(length: 30%, stroke: 0.8pt + gold)
    #v(18pt)
    #block[#set par(justify: false); #set text(hyphenate: false); #text(font: head, size: 22pt, weight: 600)[#title]]
    #v(14pt)
    #block(width: 78%)[
      #set par(justify: false)
      #text(size: 11pt, fill: muted)[#subtitle]
    ]
    #v(30pt)
    #text(font: mono, size: 9pt, tracking: 1.2pt, fill: muted)[
      #lb.version · #date
    ]
    #v(8pt)
    #text(size: 10pt, fill: gok)[#slogan]
  ]

  pagebreak()

  // ---- Body ----
  set page(background: none, footer: context [
    #set text(size: 8pt, fill: muted)
    #line(length: 100%, stroke: 0.4pt + rule)
    #v(2pt)
    #grid(
      columns: (1fr, 1fr, 1fr),
      align(left)[#footer-left],
      align(center)[#counter(page).display()],
      align(right)[#footer-right],
    )
  ])
  counter(page).update(1)

  align(center)[#text(font: head, size: 12pt, weight: 600, fill: gok)[#lb.abstract]]
  v(2pt)
  block(inset: (x: 6pt))[#abstract]

  v(10pt)
  outline(title: text(font: head, size: 12pt, weight: 600, fill: gok)[#lb.contents], indent: 1.2em)

  // Abstract and contents on their own page; the body starts fresh
  pagebreak()

  body
}

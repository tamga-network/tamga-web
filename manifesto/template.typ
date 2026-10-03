// Shared manifesto template for Tamga Network (brand 2026-10-02).
// Language content files (en/tr/tk) import `conf` and call it with their text.
// Deliberately NOT academic — a typographic manifesto, not a paper.
// Fonts: headings Onest, body IBM Plex Sans (build.ps1 passes --font-path).
// Onest is not available locally yet; headings fall back to IBM Plex Sans until it is added.

#let gok = rgb("#1E5A78")       // primary accent
#let gold = rgb("#C8A24C")      // small accents only
#let ink = rgb("#14120F")
#let muted = rgb("#4A4740")
#let rule = rgb("#E2DCCF")
#let band = rgb("#101820")

#let sans = ("IBM Plex Sans", "New Computer Modern")
#let head = ("IBM Plex Sans", "New Computer Modern")   // Onest when available
#let mono = ("IBM Plex Mono", "DejaVu Sans Mono")

#let conf(
  lang: "en",
  eyebrow: "MANIFESTO",
  title: [],
  lead: [],
  theses: (),
  closing: [],
  slogan: "Building Trust Infrastructure for the Digital World.",
  date: "2026-10-03",
  footer-left: "Tamga Network",
  footer-right: "Manifesto v1.0",
) = {
  set document(title: title, author: "Tamga Network")
  set text(font: sans, size: 10.5pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.74em, spacing: 1.2em)
  show strong: set text(weight: 600)
  show emph: set text(fill: gok)

  // ---- Title page ----
  set page(
    paper: "a4",
    margin: (x: 2.6cm, top: 2.8cm, bottom: 2.6cm),
    footer: none,
    numbering: none,
    background: place(bottom, rect(width: 100%, height: 1.1cm, fill: band)),
  )

  align(center + horizon)[
    #image("logo.svg", width: 2.5cm)
    #v(14pt)
    #text(font: head, size: 10pt, weight: 600, tracking: 3.5pt, fill: gok)[TAMGA NETWORK]
    #v(6pt)
    #line(length: 26%, stroke: 0.8pt + gold)
    #v(22pt)
    #text(font: head, size: 11pt, weight: 500, tracking: 4pt, fill: muted)[#upper(eyebrow)]
    #v(16pt)
    #block(width: 84%)[
      #set text(hyphenate: false)
      #set par(justify: false)
      #text(font: head, size: 25pt, weight: 600)[#title]
    ]
    #v(30pt)
    #text(font: mono, size: 9pt, tracking: 1.2pt, fill: muted)[
      #upper(footer-right) · #date
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

  // Lead
  block(width: 100%, inset: (x: 2pt))[
    #set par(justify: false)
    #text(size: 13pt, fill: muted)[#lead]
  ]
  v(10pt)
  line(length: 100%, stroke: 0.4pt + rule)
  v(14pt)

  // Theses split evenly over two pages; the closing gets a page of its own
  let half = calc.ceil(theses.len() / 2)
  for (i, th) in theses.enumerate() {
    if i == half { pagebreak() }
    let n = if i < 9 { "0" + str(i + 1) } else { str(i + 1) }
    block(breakable: false, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        column-gutter: 14pt,
        align(top)[#text(font: head, size: 22pt, weight: 600, fill: gold)[#n]],
        [
          #set text(hyphenate: false)
          #text(font: head, size: 13pt, weight: 600, fill: gok)[#th.title]
          #set text(hyphenate: auto)
          #v(3pt)
          #th.body
        ],
      )
    ]
    v(18pt)
  }

  pagebreak()
  align(center + horizon)[
    #image("logo.svg", width: 1.4cm)
    #v(18pt)
    #block(width: 82%)[
      #set par(justify: false)
      #text(size: 13pt)[#closing]
    ]
    #v(22pt)
    #line(length: 18%, stroke: 0.6pt + gold)
    #v(14pt)
    #text(font: head, size: 12pt, weight: 600, fill: gok)[#slogan]
  ]
}

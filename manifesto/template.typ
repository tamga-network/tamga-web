// Shared manifesto template for Tamga Network.
// Language content files (en/tr/tk) import `conf` and call it with their text.
// Deliberately NOT academic — a typographic manifesto, not a paper.

#let al = rgb("#B01E22")
#let gold = rgb("#9c7b25")
#let ink = rgb("#1a1a1a")
#let muted = rgb("#4a4a4a")

#let conf(
  lang: "en",
  eyebrow: "MANIFESTO",
  title: [],
  lead: [],
  theses: (),
  closing: [],
  slogan: "Building Trust Infrastructure for the Digital World.",
  footer-left: "Tamga Network",
  footer-right: "Manifesto v1.0",
) = {
  set document(title: title, author: "Tamga Network")
  set text(font: "New Computer Modern", size: 11pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.72em, spacing: 1.2em)

  // ---- Title page ----
  set page(
    paper: "a4",
    margin: (x: 2.6cm, top: 2.8cm, bottom: 2.6cm),
    footer: none,
    numbering: none,
  )

  align(center + horizon)[
    #image("seal.svg", width: 2.6cm)
    #v(12pt)
    #text(size: 10pt, tracking: 3.5pt, fill: muted)[TAMGA NETWORK]
    #v(6pt)
    #line(length: 26%, stroke: 0.8pt + gold)
    #v(22pt)
    #text(size: 12pt, tracking: 4pt, fill: gold)[#upper(eyebrow)]
    #v(16pt)
    #block(width: 84%)[
      #set text(hyphenate: false)
      #set par(justify: false)
      #text(size: 25pt, weight: 700)[#title]
    ]
    #v(30pt)
    #text(size: 10pt, tracking: 1.5pt, fill: muted)[
      #upper(footer-right) · #datetime.today().year()
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

  // Lead
  block(width: 100%, inset: (x: 2pt))[
    #text(size: 13pt, fill: muted, style: "italic")[#lead]
  ]
  v(10pt)
  line(length: 100%, stroke: 0.4pt + rgb("#e0d9cb"))
  v(14pt)

  // Theses
  // Theses split evenly over two pages; the closing gets a page of its own
  let half = calc.ceil(theses.len() / 2)
  for (i, th) in theses.enumerate() {
    if i == half { pagebreak() }
    let n = if i < 9 { "0" + str(i + 1) } else { str(i + 1) }
    block(breakable: false, width: 100%)[
      #grid(
        columns: (auto, 1fr),
        column-gutter: 14pt,
        align(top)[#text(size: 22pt, weight: 700, fill: gold)[#n]],
        [
          #set text(hyphenate: false)
          #text(size: 13pt, weight: 700, fill: al)[#th.title]
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
    #image("seal.svg", width: 1.4cm)
    #v(18pt)
    #block(width: 82%)[
      #set par(justify: false)
      #text(size: 13pt, style: "italic")[#closing]
    ]
    #v(22pt)
    #line(length: 18%, stroke: 0.6pt + gold)
    #v(14pt)
    #text(size: 12pt, fill: al, style: "italic")[#slogan]
  ]
}

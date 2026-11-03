// Tamga Network — akademik çalışmalar şablonu (A4, tek sütun).
// İçerik dosyaları md2typ.mjs ile Markdown kaynağından üretilir; elle düzenlenmez.
// Yazı tipleri: başlık Onest, gövde IBM Plex Sans, kod IBM Plex Mono (build.ps1 --font-path verir).

#let gok = rgb("#1E5A78")
#let gok-700 = rgb("#174A63")
#let gok-50 = rgb("#EEF5F8")
#let gold = rgb("#C8A24C")
#let gold-50 = rgb("#FAF4E4")
#let ink = rgb("#14120F")
#let muted = rgb("#4A4740")
#let rule = rgb("#E2DCCF")
#let paper = rgb("#F8F6F1")
#let band = rgb("#101820")

#let sans = ("IBM Plex Sans", "New Computer Modern")
#let head = ("Onest", "IBM Plex Sans", "New Computer Modern")
#let mono = ("IBM Plex Mono", "DejaVu Sans Mono")

// ---- Şekil ----
#let sekil(no, baslik, dosya, yarim: false) = figure(
  kind: image,
  supplement: [Şekil],
  numbering: _ => str(no),
  caption: figure.caption(position: bottom)[#baslik],
  block(width: if yarim { 72% } else { 100% }, image(dosya, width: 100%)),
)

// ---- Tablo ----
#let tablo(baslik, kolonlar, basliklar, satirlar) = {
  block(sticky: true, above: 14pt, below: 6pt)[
    #set par(justify: false)
    #text(size: 9pt, fill: ink)[#baslik]
  ]
  block(width: 100%, below: 14pt)[
    #set par(justify: false, leading: 0.5em)
    #set text(size: 8.6pt)
    #table(
      columns: kolonlar,
      inset: (x: 6pt, y: 5pt),
      stroke: (x, y) => (
        top: if y == 0 { 0.9pt + gok } else if y == 1 { 0.6pt + gok } else { none },
      ),
      fill: (x, y) => if y > 0 and calc.even(y) { paper } else { none },
      table.header(..basliklar.map(h => text(weight: 600, fill: gok-700)[#h])),
      ..satirlar.flatten(),
      table.hline(stroke: 0.9pt + gok),
    )
  ]
}

// ---- Kutular ----
#let kutu(tur, baslik, govde) = {
  let (etiket, zemin, kenar) = if tur == "teknik" {
    ("TEKNİK AYRINTI", paper, muted)
  } else if tur == "ornek" {
    ("ÖRNEK", gok-50, gok)
  } else if tur == "tarihce" {
    ("TARİHÇE", gold-50, gold)
  } else {
    ("ÖNEMLİ", white, gok-700)
  }
  block(
    width: 100%, above: 14pt, below: 14pt, breakable: tur == "teknik" or tur == "tarihce",
    fill: zemin,
    stroke: if tur == "onemli" { (left: 3pt + kenar, rest: 0.8pt + kenar) } else { (left: 2.4pt + kenar) },
    inset: (x: 12pt, y: 10pt), radius: 2pt,
  )[
    #text(font: mono, size: 7pt, weight: 600, tracking: 0.8pt, fill: kenar)[#etiket]
    #if baslik != "" { linebreak(); text(font: head, size: 10.5pt, weight: 600, fill: ink)[#baslik] }
    #v(2pt)
    #set text(size: 9.4pt)
    #govde
  ]
}

// ---- Kod ----
#let kod(dil, icerik) = block(
  width: 100%, above: 10pt, below: 10pt, breakable: false,
  fill: paper, stroke: (left: 1.6pt + gok, rest: 0.4pt + rule), inset: (x: 10pt, y: 8pt), radius: 2pt,
)[
  #set par(justify: false, leading: 0.5em)
  #text(font: mono, size: 7.8pt, fill: ink)[#raw(block: true, lang: dil, icerik)]
]

// ---- Kaynak ----
#let kaynak(no, govde) = block(above: 6pt, below: 6pt, breakable: false)[
  #set par(justify: false)
  #grid(columns: (2.4em, 1fr), text(fill: gok, weight: 600)[\[#no\]], govde)
]

#let conf(
  lang: "tr",
  dizi: "",
  baslik: "",
  altbaslik: "",
  yazar: "",
  kurum: "",
  tarih: "",
  surum: "",
  lisans: "",
  anahtar: (),
  ozet: [],
  anahtar-etiket: "Anahtar kelimeler",
  ozet-etiket: "Özet",
  icindekiler-etiket: "İçindekiler",
  surum-etiket: "Sürüm",
  atif: "",
  body,
) = {
  set document(title: baslik, author: yazar, keywords: anahtar)
  set text(font: sans, size: 10.2pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.72em, spacing: 1.05em)
  show link: it => text(fill: gok, it)
  show raw.where(block: false): it => box(fill: paper, inset: (x: 2pt), outset: (y: 2pt), radius: 1.5pt, text(font: mono, size: 8.6pt, it))
  show strong: set text(weight: 600)
  show figure: set block(above: 16pt, below: 16pt, breakable: false)
  show figure.caption: it => block(width: 92%)[
    #set par(justify: false)
    #set text(size: 8.8pt, fill: muted)
    #text(weight: 600, fill: gok-700)[#it.supplement #context it.counter.display(it.numbering).]
    #it.body
  ]
  set list(indent: 0.6em, body-indent: 0.5em, spacing: 0.75em)
  set enum(indent: 0.6em, body-indent: 0.5em, spacing: 0.75em)

  set heading(numbering: "1.1  ")
  show heading: set text(font: head, fill: ink)
  show heading.where(level: 1): it => block(sticky: true, above: 30pt, below: 14pt)[
    #text(size: 15pt, weight: 600, fill: gok)[#it]
  ]
  show heading.where(level: 2): it => block(sticky: true, above: 18pt, below: 8pt)[
    #text(size: 11.2pt, weight: 600)[#it]
  ]

  // ---- Kapak ----
  set page(
    paper: "a4",
    margin: (x: 2.5cm, top: 2.5cm, bottom: 2.4cm),
    footer: none,
    background: place(bottom, rect(width: 100%, height: 1.1cm, fill: band)),
  )
  align(center)[
    #v(1.2cm)
    #image("../whitepaper/logo.svg", width: 1.9cm)
    #v(10pt)
    #text(font: head, size: 9.5pt, weight: 600, tracking: 3pt, fill: gok)[TAMGA NETWORK]
    #v(4pt)
    #text(font: mono, size: 8pt, tracking: 1.6pt, fill: muted)[#upper(dizi)]
    #v(6pt)
    #line(length: 22%, stroke: 0.8pt + gold)
  ]
  v(1fr)
  align(center)[
    #block(width: 90%)[
      #set par(justify: false)
      #set text(hyphenate: false)
      #text(font: head, size: 27pt, weight: 600, fill: ink)[#baslik]
      #v(12pt)
      #text(font: head, size: 13pt, weight: 500, fill: muted)[#altbaslik]
    ]
    #v(34pt)
    #text(size: 13pt, weight: 600)[#yazar]
    #v(2pt)
    #text(size: 10pt, fill: muted)[#kurum]
  ]
  v(1fr)
  align(center)[
    #text(font: mono, size: 8.5pt, tracking: 1pt, fill: muted)[#upper(tarih) · #upper(surum-etiket) #surum]
    #v(10pt)
    #block(width: 80%)[
      #set par(justify: false)
      #set text(size: 7.8pt, fill: muted)
      #lisans
    ]
    #v(0.9cm)
  ]

  // ---- Gövde ----
  set page(background: none, footer: context [
    #set text(size: 7.8pt, fill: muted)
    #line(length: 100%, stroke: 0.4pt + rule)
    #v(2pt)
    #grid(
      columns: (1fr, auto, 1fr),
      align(left)[#yazar · #baslik],
      align(center)[#counter(page).display()],
      align(right)[Tamga Network],
    )
  ])
  pagebreak()
  counter(page).update(1)

  block(below: 10pt)[#text(font: head, size: 15pt, weight: 600, fill: gok)[#ozet-etiket]]
  ozet
  v(6pt)
  block[
    #set par(justify: false)
    #text(weight: 600)[#anahtar-etiket:] #anahtar.join(" · ")
  ]
  if atif != "" {
    v(14pt)
    block(width: 100%, fill: paper, stroke: (left: 1.6pt + gold), inset: (x: 10pt, y: 8pt))[
      #set par(justify: false)
      #set text(size: 8.4pt, fill: muted)
      #text(font: mono, size: 7pt, weight: 600, tracking: 0.8pt, fill: gold)[ATIF] \
      #atif
    ]
  }
  pagebreak()
  outline(title: text(font: head, size: 15pt, weight: 600, fill: gok)[#icindekiler-etiket], indent: 1.4em, depth: 2)
  pagebreak()

  body
}

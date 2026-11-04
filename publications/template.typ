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

// ---- Dil etiketleri (tr · en · tk · az) ----
#let L = (
  tr: (sekil: "Şekil", teknik: "TEKNİK AYRINTI", ornek: "ÖRNEK", tarihce: "TARİHÇE", onemli: "ÖNEMLİ",
       ozet: "Özet", anahtar: "Anahtar kelimeler", icindekiler: "İçindekiler", surum: "Sürüm", atif: "ATIF"),
  en: (sekil: "Figure", teknik: "TECHNICAL DETAIL", ornek: "EXAMPLE", tarihce: "HISTORY", onemli: "KEY POINT",
       ozet: "Abstract", anahtar: "Keywords", icindekiler: "Contents", surum: "Version", atif: "CITATION"),
  tk: (sekil: "Surat", teknik: "TEHNIKI JIKME-JIKLIK", ornek: "MYSAL", tarihce: "TARYH", onemli: "MÖHÜM",
       ozet: "Gysgaça mazmuny", anahtar: "Açar sözler", icindekiler: "Mazmuny", surum: "Wersiýa", atif: "SALGYLANMA"),
  az: (sekil: "Şəkil", teknik: "TEXNİKİ DETAL", ornek: "NÜMUNƏ", tarihce: "TARİXÇƏ", onemli: "VACİB",
       ozet: "Xülasə", anahtar: "Açar sözlər", icindekiler: "Mündəricat", surum: "Versiya", atif: "İSTİNAD"),
)
#let lbl(dil, k) = L.at(dil, default: L.tr).at(k)

// ---- Şekil ----
#let sekil(no, baslik, dosya, yarim: false, dil: "tr") = figure(
  kind: image,
  supplement: [#lbl(dil, "sekil")],
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
#let kutu(tur, baslik, govde, dil: "tr") = {
  let (zemin, kenar) = if tur == "teknik" {
    (paper, muted)
  } else if tur == "ornek" {
    (gok-50, gok)
  } else if tur == "tarihce" {
    (gold-50, gold)
  } else {
    (white, gok-700)
  }
  let etiket = lbl(dil, tur)
  block(
    width: 100%, above: 14pt, below: 14pt, breakable: tur == "teknik" or tur == "tarihce",
    fill: zemin,
    stroke: if tur == "onemli" { (left: 3pt + kenar, rest: 0.8pt + kenar) } else { (left: 2.4pt + kenar) },
    inset: (x: 12pt, y: 10pt), radius: 2pt,
  )[
    // Etiket ve başlık, kutunun ilk satırlarıyla aynı sayfada kalır (sayfa sonunda tek başına başlık olmaz)
    #block(sticky: true, below: 6pt)[
      #text(font: mono, size: 7pt, weight: 600, tracking: 0.8pt, fill: kenar)[#etiket]
      #if baslik != "" { linebreak(); text(font: head, size: 10.5pt, weight: 600, fill: ink)[#baslik] }
    ]
    #set text(size: 9.4pt)
    #govde
  ]
}

// ---- Kod ----
#let kod(dil, icerik, baslik: "") = block(width: 100%, above: 10pt, below: 10pt, breakable: false)[
  #if baslik != "" {
    block(below: 0pt, fill: gok-50, stroke: (left: 1.6pt + gok, top: 0.4pt + rule, right: 0.4pt + rule), inset: (x: 10pt, y: 5pt), width: 100%, radius: (top: 2pt))[
      #set par(justify: false)
      #text(font: mono, size: 7pt, weight: 600, tracking: 0.4pt, fill: gok-700)[#upper(dil)] #h(6pt) #text(size: 8.4pt, fill: ink)[#baslik]
    ]
  }
  #block(width: 100%, above: 0pt, fill: paper, stroke: (left: 1.6pt + gok, rest: 0.4pt + rule), inset: (x: 10pt, y: 8pt), radius: if baslik != "" { (bottom: 2pt) } else { 2pt })[
    #set par(justify: false, leading: 0.5em)
    #text(font: mono, size: 7.8pt, fill: ink)[#raw(block: true, lang: dil, icerik)]
  ]
]

// ---- Formül bloğu (Typst matematik) ----
#let formul(body) = block(width: 100%, above: 10pt, below: 10pt, breakable: false, inset: (y: 4pt))[
  #set align(center)
  #set text(size: 10.5pt)
  #body
]

// ---- Protokol adımları: numara · kim · ne yapar · hesap ----
#let adimlar(rows) = block(width: 100%, above: 10pt, below: 12pt, breakable: true)[
  #set par(justify: false, leading: 0.5em)
  #table(
    columns: (auto, auto, 1.5fr, 1fr),
    align: (center + horizon, left + horizon, left + horizon, left + horizon),
    inset: (x: 7pt, y: 7pt),
    stroke: (x, y) => (top: if y == 0 { 0.9pt + gok } else { 0.4pt + rule }, bottom: if y == rows.len() - 1 { 0.9pt + gok } else { none }),
    ..rows.enumerate().map(((i, r)) => {
      let (kim, ne, hesap) = r
      (
        box(width: 1.5em, height: 1.5em, radius: 50%, fill: gok, align(center + horizon, text(size: 8pt, weight: 600, fill: white)[#(i + 1)])),
        text(font: mono, size: 7.6pt, weight: 600, fill: gok-700)[#kim],
        text(size: 9.2pt)[#ne],
        text(size: 10pt)[#hesap],
      )
    }).flatten(),
  )
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
  anahtar-etiket: none,
  ozet-etiket: none,
  icindekiler-etiket: none,
  surum-etiket: none,
  atif: "",
  // Kısa metinler (manifesto) için: özet sayfası ve içindekiler isteğe bağlı
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  body,
) = {
  let kisa-baslik = if kisa-baslik == none { baslik } else { kisa-baslik }
  let anahtar-etiket = if anahtar-etiket == none { lbl(lang, "anahtar") } else { anahtar-etiket }
  let ozet-etiket = if ozet-etiket == none { lbl(lang, "ozet") } else { ozet-etiket }
  let icindekiler-etiket = if icindekiler-etiket == none { lbl(lang, "icindekiler") } else { icindekiler-etiket }
  let surum-etiket = if surum-etiket == none { lbl(lang, "surum") } else { surum-etiket }
  set document(title: baslik, author: yazar, keywords: anahtar)
  set text(font: sans, size: 10.2pt, fill: ink, lang: lang)
  set par(justify: true, leading: 0.72em, spacing: 1.05em)
  show link: it => text(fill: gok, it)
  show raw.where(block: false): it => box(fill: paper, inset: (x: 2pt), outset: (y: 2pt), radius: 1.5pt, text(font: mono, size: 8.6pt, it))
  show strong: set text(weight: 600)
  show math.equation: set text(font: "New Computer Modern Math")
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
    #image("logo.svg", width: 1.9cm)
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
    #if kurum != yazar {
      v(2pt)
      text(size: 10pt, fill: muted)[#kurum]
    }
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
      // Sol: kısa başlık (yazar kurumsa yazar adı tekrar edilmez); sayfa numarasıyla çakışmasın diye orta sütun sabit
      columns: (1fr, 3em, 1fr),
      align(left)[#box(width: 100%, clip: true, height: 1.2em)[#if yazar != "Tamga Network" [#yazar · ]#kisa-baslik]],
      align(center)[#counter(page).display()],
      align(right)[Tamga Network],
    )
  ])
  pagebreak()
  counter(page).update(1)

  if ozet-sayfasi {
    block(below: 10pt)[#text(font: head, size: 15pt, weight: 600, fill: gok)[#ozet-etiket]]
    ozet
    v(6pt)
    if anahtar.len() > 0 {
      block[
        #set par(justify: false)
        #text(weight: 600)[#anahtar-etiket:] #anahtar.join(" · ")
      ]
    }
    if atif != "" {
      v(14pt)
      block(width: 100%, fill: paper, stroke: (left: 1.6pt + gold), inset: (x: 10pt, y: 8pt))[
        #set par(justify: false)
        #set text(size: 8.4pt, fill: muted)
        #text(font: mono, size: 7pt, weight: 600, tracking: 0.8pt, fill: gold)[#lbl(lang, "atif")] \
        #atif
      ]
    }
    pagebreak()
  }
  if icindekiler {
    outline(title: text(font: head, size: 15pt, weight: 600, fill: gok)[#icindekiler-etiket], indent: 1.4em, depth: 2)
    pagebreak()
  }

  body
}

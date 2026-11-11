// MF — Gadymy möhüriň häzirki zaman garşylygyny gurýarys. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tk")
#let sekil = sekil.with(dil: "tk")

#show: conf.with(
  lang: "tk",
  dizi: "Tamga Network Manifesto",
  baslik: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys",
  altbaslik: "Türkiýe we türki dünýäsi üçin sanly ynam barada sekiz ýörelge",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "Noýabr 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. Bu iş Creative Commons Attribution 4.0 International (CC BY 4.0) ygtyýarnamasy bilen neşir edildi: çeşmesi görkezilip paýlaşylyp we uýgunlaşdyrylyp bilner. https://creativecommons.org/licenses/by/4.0/",
  anahtar: ("",),
  atif: "Tamga Network (2026). Gadymy möhüriň häzirki zaman garşylygyny gurýarys. Manifest, wersiýa 1.0. https://tamga.network/manifesto-tk.pdf",
  ozet-sayfasi: false,
  kisa-baslik: none,
  icindekiler: false,
  ozet: [

  ],
)

Dünýä ynam gurmagyň usulyny üýtgedýär. Ýewropa her agza döwletiň öz raýatlaryna sanly şahsyýet gapjygyny hödürlemegini düzgünnama bilen hökmany etdi we onuň daşynda standart emele gelýär. Bu özgerişiň boljagy ýa-da bolmajagy indi sowal däl. Indi sowal ony kimiň gurjagy we kimiň diňe satyn aljagy.

#heading(level: 1, numbering: none)[Ynam infrastrukturadyr]

Hiç bir programma şahsyýeti, ygtyýary we resminamany noldan barlamaly bolmaly däl. Elektrik we internet umumy infrastruktura bolşy ýaly, sanly ynam hem şeýle bolmaly; her bank, uniwersitet, iş beriji we gapy ony täzeden gurmagyň ýerine ondan peýdalanmaly. Biz şol infrastrukturany tabşyrylyp bilner ýaly gurýarys: ilki bir gaznaga, döwletler goşuldygyça bolsa olaryň özüne. Tor girdeji gazanmagy maksat edinmeýär we hyzmat satmaýar. Onuň düzgünleri we ynam sanawlary açykdyr, paketleriniň kody hem açyk çeşmelidir; her kim olary okap we barlap biler.

#heading(level: 1, numbering: none)[Maglumat eýesiniň elinde galýar]

Hiç kim özi barada bir zady subut etmek üçin resminamasynyň nusgasyny tabşyrmaly bolmaly däl. Resminama adamyň telefonynda galýar we telefondan diňe zerur subutnama çykýar. Adam resminamanyň diňe soralan meýdanlaryny görkezýär; muňa saýlap açmak diýilýär. Ol doglan senesini bermän 15 ýa-da 18 ýaşdan ulydygyny görkezip bilýär, barlaýjy tarap bolsa diňe hawa ýa-da ýok görýär. Biz muny hukuk hasaplaýarys we tehnologiýa bu hukuga hormat goýmagy indi ýeňilleşdirýär.

#heading(level: 1, numbering: none)[Barlag çeşmä ýüz tutman edilmeli]

Resminamanyň hakykydygyna matematika karar bermeli; nusganyň näderejede ynandyryjy görünýändigi ölçeg bolup bilmez. Kriptografik gol resminamany kimiň berendigini we içinde hiç zadyň üýtgemändigini subut edýär. Muny resminamany berene soraman edýär, şonuň üçin beren gurama resminamanyň nirede ulanylandygyny bilmeýär. Resminamanyň ýatyrylandygy ýa-da ýatyrylmandygy hem guramanyň çap edýän ýagdaý sanawyndan okalýar. Sanaw bütinleýin ýüklenýändigi üçin gurama haýsy resminamanyň barlanandygyny bilmeýär.

#heading(level: 1, numbering: none)[Blokçeýn serişdedir, diňe serişde]

Häzir torda blokçeýn ýok we ynamyň oňa zerurlygy hem ýok. Ynam her kimiň ýükläp we barlap bilýän gol çekilen, açyk ynam sanawlaryna daýanýar. Umumy kitap diňe garaşsyz taraplar ony bilelikde dolandyranda bir zat goşýar we şonda-da diňe sanaw ýazgylarynyň gysgaça nusgalaryny (hash) we barmak yzlaryny saklaýar, şahsy maglumaty bolsa hiç haçan. Kitabyň kody ýazyldy we synagdan geçdi; ikinji garaşsyz operator goşulýança ýapyk durýar. #{strong[Şahsy maglumat hiç birine asla ýazylmaýar.]} Adam bularyň hiç birini görmeýär; diňe şahsyýetini ulanýar.

#heading(level: 1, numbering: none)[Açyk standartlar, baglanyşyk ýok]

SD-JWT VC, ISO mdoc, OpenID4VC we X.509 ÝB-niň saýlan açyk standartlarydyr we biz olary ÝB-niň profilleri bilen bolşy ýaly ulanýarys. Özümizi dünýäniň ylalaşan standartlaryna baglaýarys; haýsydyr bir kompaniýanyň önümine baglamaýarys, öz önümimize-de. Şeýlelikde, bir guramanyň beren resminamasyny şol standartlara eýerýän islendik barlaýjy okap bilýär. Tor gapjyk işletmeýär; düzgünlere eýerýän her gapjygy sanaýar. Sanawa giren ilkinji gapjyk Tamga Wallet aýratyn önümdir we sanawa başga her gapjygyň girjek ýoly bilen girdi.

#heading(level: 1, numbering: none)[Özygtyýarlyk we laýyklyk bir wagtda mümkün]

Dünýä göçme subutnamaga geçende öňümizde iki ýol bar. Ýa bu özgerişi daşardan getireris, ýa-da şol bir açyk standartlarda öz infrastrukturamyzy gurup, açarlaryny öz elimizde saklarys. Biz ikinjisini saýlaýarys. Laýyklyk ÝB-niň saýlan formatlaryna we düzgünlerine eýermek, özygtyýarlyk bolsa kimiň ynamdar hasaplanjagyny özümiziň çözmegimizdir. #{strong[Şol bir standartlar, öz torumyz]} we goşulanda öz hasabynyň ýeke-täk ýazyjysy boljak her döwlet.

#heading(level: 1, numbering: none)[Tamga umumy möhür däbidir]

#{emph[Tamga]} türki halklaryň gadymy möhüridi; eýeçiligi, degişliligi we ygtyýary subut edýän belgi. Barlanyp bilinýän sanly resminama şonuň häzirki zaman garşylygydyr. Umumy dil maşgalasyny, medeniýeti we taryhy paýlaşýan halklar umumy sanly ynam binýady üçin tebigy topragydyr we olaryň her biri öz möhürini öz elinde saklaýar.

#heading(level: 1, numbering: none)[Merkez däl, örüm]

Biz ýeke-täk häkimiýet islemeýäris. Bilelikde işläp bilýän garaşsyz ynam sanawlaryndan ybarat örüm isleýäris. Bu örümde her ýurt öz ynam sanawyny, edaralaryny we dolandyryşyny saklaýar we beýlekilere umumy standartlar arkaly baglanýar. Bir sanawa girmek beýlekisine girmegi aňlatmaýar; her tor kimi ykrar etjegini özi çözýär. Şol bir standartlar sebäpli ol Ýewropa bilen hem gürleşip bilýär.

#heading(level: 1, numbering: none)[Maksadymyz]

Sanly ynamy her programmanyň täzeden çözýän meseleleriň sanawyndan çykarmak we Türkiýe bilen türki dünýäsi üçin umumy, özygtyýarly we bilelikde işleýän infrastruktura öwürmek isleýäris.

#{emph[Building Trust Infrastructure for the Digital World.]}

#{emph[Wersiýa 1.0, gaýtadan seredilen neşir, Noýabr 2026. Ilkinji neşir 3-nji oktýabr 2026.]}

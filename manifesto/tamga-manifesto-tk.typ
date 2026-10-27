// Tamga Network — Manifest (Türkmençe). v1.0, gaýtadan seredilen 2026-10-27 (ilkinji neşir 2026-10-03).
// Tekst src/content/manifesto.tsx (tk) bilen birmeňzeş; ikisi bilelikde üýtgedilýär.
// Build:  typst compile --root . tamga-manifesto-tk.typ ../public/manifesto-tk.pdf
#import "template.typ": conf

#conf(
  lang: "tk",
  eyebrow: "Manifest",
  title: [Gadymy möhüriň häzirki zaman garşylygyny gurýarys],
  footer-right: "Manifest v1.0",
  date: "2026-10-27",
  edition: "Gaýtadan seredilen neşir · ilkinji neşir 2026-10-03",
  lead: [
    Dünýä ynam gurmagyň usulyny üýtgedýär. Ýewropa täze modeli düzgünnama bilen hökmany
    etdi we onuň daşynda standart emele gelýär. Bu özgerişiň boljagy ýa-da bolmajagy indi
    sowal däl. Indi sowal ony kimiň gurjagy we kimiň diňe satyn aljagy.
  ],
  theses: (
    (
      title: "Ynam infrastrukturadyr",
      body: [
        Hiç bir programma şahsyýeti, ygtyýary we resminamany noldan barlamaly bolmaly
        däl. Elektrik we internet umumy infrastruktura bolşy ýaly, sanly ynam hem şeýle
        bolmaly; her bank, uniwersitet, iş beriji we gapy ony täzeden gurmagyň ýerine
        ondan peýdalanmaly. Biz şol infrastrukturany gurýarys we tabşyrmak üçin gurýarys;
        ilki bir gaznaga, wagtyň geçmegi bilen döwletleriň özüne tabşyrylar.
      ],
    ),
    (
      title: "Maglumat eýesiniň elinde galýar",
      body: [
        Hiç kim özi barada bir zady subut etmek üçin resminamasynyň nusgasyny tabşyrmaly
        bolmaly däl. Resminama adamyň telefonynda galýar, telefondan diňe zerur
        subutnama çykýar. Adam doglan senesini bermän 15 ýa-da 18 ýaşdan ulydygyny
        görkezip bilýär, barlaýjy tarap bolsa diňe hawa ýa-da ýok görýär. Biz muny hukuk
        hasaplaýarys we tehnologiýa bu hukuga hormat goýmagy indi ýeňilleşdirýär.
      ],
    ),
    (
      title: "Barlag çeşmä ýüz tutman edilmeli",
      body: [
        Resminamanyň hakykydygyna matematika karar bermeli; nusganyň näderejede
        ynandyryjy görünýändigi ölçeg bolup bilmez. Kriptografik gol resminamany kimiň
        berendigini we içinde hiç zadyň üýtgemändigini subut edýär. Muny resminamany
        berene soraman edýär, şonuň üçin beren gurama adamyň resminamany nirede we haçan
        ulanandygyny asla bilmeýär.
      ],
    ),
    (
      title: "Blokçeýn serişdedir, diňe serişde",
      body: [
        Biz täze blokçeýn gurmaýarys. Ynam häzir her kimiň ýükläp we barlap bilýän gol
        çekilen, açyk ynam sanawlaryna daýanýar. Umumy kitap diňe garaşsyz taraplar ony
        bilelikde dolandyranda bir zat goşýar; kitabyň kody ýazyldy we synagdan geçdi,
        şol güne çenli ýapyk durýar. *Şahsy maglumat hiç birine asla ýazylmaýar.* Adam
        bularyň hiç birini görmeýär; diňe şahsyýetini ulanýar.
      ],
    ),
    (
      title: "Açyk standartlar, baglanyşyk ýok",
      body: [
        SD-JWT VC, ISO mdoc, OpenID4VC, X.509 we saýlap paýlaşmak ÝB-niň öz profilleridir
        we biz olary bolşy ýaly ulanýarys. Özümizi dünýäniň ylalaşan standartlaryna
        baglaýarys; haýsydyr bir kompaniýanyň önümine baglamaýarys, öz önümimize-de.
        Tor gapjyk işletmeýär; düzgünlere eýerýän her gapjygy sanaýar. Ilkinji sanalan
        gapjyk Tamga Wallet aýratyn önümdir we sanawa başga her gapjygyň girjek ýoly bilen
        girdi.
      ],
    ),
    (
      title: "Özygtyýarlyk we laýyklyk bir wagtda mümkün",
      body: [
        Dünýä göçme subutnamaga geçende öňümizde iki ýol bar. Ýa bu özgerişi daşardan
        getireris, ýa-da şol bir açyk standartlarda öz infrastrukturamyzy gurup,
        açarlaryny öz elimizde saklarys. Biz ikinjisini saýlaýarys. *Şol bir standartlar,
        öz torumyz* we öz hasabynyň ýeke-täk ýazyjysy bolan her döwlet.
      ],
    ),
    (
      title: "Tamga umumy möhür däbidir",
      body: [
        _Tamga_ türki halklaryň gadymy möhüridi; eýeçiligi, degişliligi we ygtyýary subut
        edýän belgi. Barlanyp bilinýän sanly resminama şonuň häzirki zaman garşylygydyr.
        Umumy dil maşgalasyny, medeniýeti we taryhy paýlaşýan halklar umumy sanly ynam
        binýady üçin tebigy topragydyr we olaryň her biri öz möhürini öz elinde saklaýar.
      ],
    ),
    (
      title: "Merkez däl, örüm",
      body: [
        Biz ýeke-täk häkimiýet islemeýäris. Bilelikde işläp bilýän garaşsyz torlardan
        ybarat örüm isleýäris, bir *Trust Mesh*. Bu örümde her ýurt öz ynam sanawyny,
        edaralaryny we dolandyryşyny saklaýar we beýlekilere umumy standartlar arkaly
        baglanýar, edil Ýewropa baglanjagy ýaly.
      ],
    ),
  ),
  closing: [
    Maksadymyz sanly ynamy her programmanyň täzeden çözýän meseleleriň sanawyndan
    çykarmak we Türkiýe bilen türki dünýäsi üçin umumy, özygtyýarly we bilelikde işleýän
    infrastruktura öwürmek.
  ],
  slogan: "Building Trust Infrastructure for the Digital World.",
)

// Tamga Network — Whitepaper v1.0 (tk). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-tk.typ ../public/whitepaper-tk.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "tk",
  title: [Türkiýe we Türki Dünýäsi üçin \ Sanly Ynam Infrastrukturasy],
  subtitle: [ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy — X.509 guramalar, häzir gol çekilen ynam sanawlary, garaşsyz operatorlar goşulanda rugsatly kitap.],
  labels: (abstract: "Gysgaça mazmun", contents: "Mazmuny", version: "WHITEPAPER · WERSIÝA 1.0"),
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network *Sanly Ynam Infrastrukturasydyr*: guramalar resminamalary — diplom, talyp resminamasy, şahsyýet resminamasy, bilet — adamyň telefonyna berýär, adam barlaýjynyň zerur meýdanlaryny paýlaşýar we barlaýjy berijä ýüz tutman olary birnäçe sekuntda barlaýar.

    Tamga ÝB-niň tehniki gatlagyny üýtgetmän ulanýar: *SD-JWT VC* we *ISO 18013-5 mdoc* resminamalary, *OpenID4VCI/VP*, *X.509* guramalar we ETSI modelinde *gol çekilen ynam sanawlary*. Onuň öz gatlagy türki dünýäsi üçin dolandyryşdyr: her gurluşda her agza döwlet üçin orun bar we Tamga diňe olaryň adyndan wagtlaýyn operatordyr.

    Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş-zynjyrly ynam sanawlaryna daýanýar; rugsatly *Besu/QBFT* kitaby diňe azyndan iki garaşsyz operator goşulanda goşulýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat — hatda heşi hem — ýazylmaýar. Tutuş akym hakyky kriptografiýa bilen häzir başdan-aýak işleýär; bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.

  ],
)

= Mesele: “resminama nusgasy” döwrüniň soňy

Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Nusgalar serwerlerde toplanýar we gözegçilikden çykýar; her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykylygy bolsa nusganyň ynandyryjylygyna bagly galýar.

Täze model muny tersine öwürýär: resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlag çeşmä soramazdan kriptografik taýdan edilýär. Serediň: #link("https://tamga.network/tk/learn/paper-to-digital")[näme üçin täze model].

= Garaýyş: eIDAS 2.0-dan türki dünýäsine

*eIDAS 2.0* bilen ÝB-niň her agza döwleti raýatyna *Ýewropa Sanly Şahsyýet Gapjygyny* hödürlemäge borçly. Bu gapjygyň arhitekturasy (ARF) we profilleri sanly ynamyň hakyky standartyna öwrülýär.

Türki dünýäsi dili, medeniýeti we taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli; guramanyň şahsyýetine serhetden aňyrda ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda, her döwleti özygtyýarly saklaýan dolandyryş bilen gurýar.

Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Esas: resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk; şeýdip laýyk gapjyklar we barlaýjylar Tamga-daky guramalar bilen işläp bilýär. Onuň üstünde *Tamga Network* her döwletiň ynam sanawyny jemleýän we döwletleriň biri-birini ykrar etmegine mümkinçilik berýän ýeňil federasiýadyr — häzir Türkiýäniň sanawyny Tamga wagtlaýyn çap edýär; döwlet öz sanawyny çap edende tor şony görkezýär. Şu esasda toruň ilkinji gapjygy, aýratyn önüm bolan *Tamga Wallet* (ÝB bilen laýyk; “EUDI Wallet” ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna degişli at) we toruň düzgünlerine eýerýän hyzmat üpjün edijiler işleýär; bular toruň bölegi däl, onuň gatnaşyjylarydyr. Tor hiç zat satmaýar: düzgünleri, ynam sanawlaryny, açyk kody we Gurama konsoly, Tamga Verify ýaly salgylanma hyzmatlaryny işledýär; täjirçilik hyzmatlaryny toruň daşyndaky kompaniýalar hödürleýär.

= Ýörelgeler

- *Ilki özygtyýarlylyk* — her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk 2/3 ses bilen; serhetaşa ykrar birtaraplaýyn kesgitlenýär.
- *Hiç bir umumy ýazgyda şahsy maglumat ýok* — sanawda, žurnalda ýa-da kitapda ýok; hatda heşi hem ýok.
- *Laýyk ýöne garaşsyz* — ÝB-niň tehniki gatlagy bolşy ýaly; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.
- *Köp döwlet üçin* — hiç bir belgi ýa-da rol Tamga-ny ýeke-täk operator hasaplamaýar; Tamga hemişe wagtlaýyn wekildir.
- *Kitap saklaýyş däl, gol çekijileriň saýlanmasydyr* — häzir sanawlar; garaşsyz operatorlar goşulanda kitap.
- *Kadadan çykmasyz enjam baglanyşygy* — resminamanyň her nusgasy enjamdaky açara baglanandyr; nusgany gaýtadan oýnap bolmaýar.
- *Tabşyrmak üçin dizaýn* — her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar.

= Rollar

ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy we “TR National Root CA (wagtlaýyn operator: Tamga)”. Guramalar resminama üpjün edijilerdir; iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr. PID üpjün edijisiniň orny döwlet ony doldurýança boş; şol wagt şahsyýet resminamasy Tamga şahsyýet hyzmatyndan gelýär (resminama we janlylyk barlagy). Tor gapjyklary saýlamaýar, ykrar edýär: çap edilen düzgünlere eýerýän we laýyklyk synaglaryndan geçen islendik gapjyk üpjün edijisi sanawa girip biler; ilkinjisi Tamga Wallet. Her gapjyk öz gapjyk üpjün edijisini işledýär; tor hiç birini işletmeýär. Heniz validator operatory ýok — şonuň üçin kitap hem ýok. Ýanaşyk: #link("https://tamga.network/tk/learn/roles")[rollar we adalgalar].

#chapter()
= Ynam modeli: gol çekilen ynam sanawlary

Gol kimiň gol çekendigini subut edýär; *ynam sanawy* bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip biljekdigini we häzirki ýagdaýyny aýdýar. Sanawlar gol çekilen JWS faýllarydyr, *wersiýaly we heş-zynjyrly*, pozulmaýar we indiki täzelenme senesini göterýär; barlaýjy gol çekijini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk *labyr žurnalyna* ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik: #link("https://tamga.network/tk/learn/trust-lists")[ynam sanawlary].

#kvtable("Çap edilýän faýllar — trust.tamga.network", (("lotl.jws", "sanawlaryň sanawy — milli sanawlar, daşky sanawlar, shemalar, gapjyk üpjün edijileri, kabul edilen ZK zynjyrlary"), ("tl-tr.jws", "Türkiýe — kök sertifikat edaralary, resminama berijiler (+ ygtyýarlar), barlaýjylar"), ("tl-az · kz · kg · uz", "beýleki agza döwletler üçin goýlan orunlar"), ("anchors.jsonl", "labyr žurnaly — her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"), ("keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"), ("archive/", "öňki her wersiýa, asla pozulmaýar"),), mono: false)

Belgiler bellenilmeýär, alynýar; tabşyrylanda ýa-da kitap gelende üýtgemeýär:

#kvtable("Belgiler", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"), ("vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa> — meselem urn:tamga:edu:DiplomaCredential:1"), ("schema_id", "keccak256(vct)"), ("adam", "belgi ýok — resminamanyň her nusgasy üçin bir enjam açary"),), mono: true)

*Federasiýa.* Sanawlaryň sanawy başga operatoryň — döwletiň, onuň ygtyýarlandyran guramasynyň ýa-da ÝB-niň — çap eden sanawyny hem görkezip biler: onuň salgysyny, Tamga-nyň gol çekilen sanawlar sanawynda berkidilen gol çekijisini we haýsy rollar hem resminama görnüşleri üçin kepil bolup biljekdigini aýdýan çägini. Sanaw eýesinde galýar; döwlet öz sanawyny çap edende gapjyk we barlaýjy üçin diňe salgy we gol çekiji üýtgeýär. Ilkinji okalýan görnüş ETSI TS 119 602; şeýlelikde barlaýjy ÝB şahsyýet resminamasyny (PID) we mobil sürüjilik şahadatnamasyny (mDL) hem tanap biler. Häzir sanawlar sanawynda daşky sanaw ýok; her biri ýazga alnan razylyk bilen goşulýar. Serediň: #link("https://tamga.network/tk/learn/federation")[federasiýa].

= Resminamalar: SD-JWT VC we mdoc

Esasy görnüş *SD-JWT VC* (IETF, #raw("dc+sd-jwt"), ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar; sözbaşy guramanyň X.509 zynjyryny göterýär; #raw("cnf") nusgany enjam açaryna baglaýar. Şahsyýet resminamasy mundan başga-da *ISO 18013-5 mdoc* görnüşinde berilýär; şeýlelikde ýaş barlagy #raw("age_over_18") meýdanyny alýar we başga hiç zat almaýar. Resminama görnüşleri hemişelik URN-lerdir; olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär. Serediň: #link("https://tamga.network/tk/learn/verifiable-credentials")[resminamalar].

#codeblock("SD-JWT VC görnüşindäki diplom (açylan, gysgaldylan)", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-…\",
  \"iat\": 1790000000,
  \"cnf\": { \"jwk\": { … } },
  \"status\": { \"status_list\": {
    \"idx\": 48213,
    \"uri\": \"https://status.tamga.network/…\" } },
  \"_sd\": [ \"…\", \"…\" ]
}")

#kvtable("", (("cnf.jwk", "şu nusganyň enjam açary"), ("_sd", "gizlin meýdanlar, duzlanan heşler görnüşinde"), ("sözbaşy · x5c", "guramanyň X.509 sertifikat zynjyry"),), mono: false)

Milli şahsyýet belgisi diňe şahsyýet resminamasynda bar; hiç bir diplom, karta ýa-da bilet ony göterýär däl.

= Bermek we hödürlemek

- *Bermek (OpenID4VCI).* Gurama QR kody we şol ekranda PIN görkezýär — PIN baglanyşygyň içinde asla gitmeýär. Ýa-da gapjyk guramalaryň katalogyndan başlaýar we ilki adamyň şahsyýetini subut edýär. Gapjyk her biri başga enjam açaryna baglanan *on nusga* alýar.
- *Diňe hakyky gapjyklar.* Guramalar gapjyk üpjün edijisinden gysga möhletli *gapjyk tassyklamasyny* (WUA) talap edýär.
- *Hödürlemek (OpenID4VP, DCQL).* Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir. Gapjyk ony ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär. Barlaýjy saýlaw hödürleýän bolsa (#raw("credential_sets"), #raw("claim_sets")), gapjyk olary saýlaw hökmünde görkezýär; soralan meýdany bolmadyk resminama asla iberilmeýär we gapjyk haýyşyň näme üçin ýerine ýetirilip bilinmeýändigini adama aýdýar. Jogap şifrlenendir; diňe tassyklanan meýdanlary we açaryň şu telefondadygynyň subutnamasyny göterýär.
- *Web saýtlar.* Saýt adamy bir gezek gapjyk bilen, şol saýta degişli lakam bilen hasaba alýar: gapjyk her saýt üçin aýratyn we hemişelik lakam döredýär; iki saýt adamy deňeşdirip bilmeýär, täze telefonda şahsyýet gaýtadan barlananda şol lakamlar yzyna gelýär. Soňra gündelik giriş *passkey* bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: #link("https://tamga.network/tk/learn/unlinkability")[Tamga bilen gir].

= Barlag: bäş gatlak, üç netije

Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar.

#kvtable("Barlag hatary", (("T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"), ("A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"), ("B · görnüş", "resminama görnüşi hasaba alnan; kesgitlemäniň heşi katalog bilen gabat gelýär"), ("C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly; kategoriýa gabat gelýär"), ("D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; sanaw täze we labyrlanan"), ("E · syýasat", "soralan meýdanlar bar; barlaýjynyň çäginden daşary hiç zat ýok"), ("→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"),), mono: false)

*INDETERMINATE* (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy “häzir barlap bolmady” diýýär — “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitleýär. Ygtyýar *berlen senesine* görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar.

= Ýatyrylyş we durmuş aýlawy

Ýatyrylyş *IETF Token Status List* bilen edilýär: her resminama nusgasy üçin *tötänleýin* orunda iki bit — güýjünde, ýatyrylan ýa-da togtadylan. Gurama sanawy *kesgitli aralykda* çap edýär, asla haýyş boýunça däl; şeýlelikde wagty adam barada hiç zady aýan etmeýär; her çap edilişi labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak ne gurama, ne-de telefona çagyryş edýär. Ýatyrylyş iň giç takmynan 90 minutda her barlaýja ýetýär. Nusgalar dizaýn boýunça gutarýar; täzeleme belgisi (refresh token) bilen berlen resminamalarda gapjyk täze nusgalary beriji yglan eden çäkde fonda özbaşdak alýar we täzeleme täze hiç zat paýlaşmaýar. Şahsyýet resminamasyny görkezmek bilen täzelenýän resminamalar adamyň razylygy we PIN-i bilen täzelenýär. Serediň: #link("https://tamga.network/tk/learn/revocation")[ýatyrylyş].

#chapter()
= Dizaýndan gelýän gizlinlik

- *Barlaýjy başyna nusga.* Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär.
- Adaty ýagdaýda *saýlap paýlaşmak*; görnüş rugsat berende #raw("age_over_18") ýaly predikatlar.
- *Şahsyýet barlagy aýrylandyr.* Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär; resminamany berenden soň surat saklamaýar, diňe açyk däl, heşlenen ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.
- *Žurnallarda we açyk salgylarda şahsy maglumat ýok.* Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.
- *Web saýtlar* hasap açary hökmünde saýta degişli lakam alýar; şahsyýet resminamasynyň belgisi hem, onuň heşi hem iberilmeýär; saýtlar adamy deňeşdirip bilmeýär.

#notebox[Açyk aýdylýan galyndy töwekgelçilik: şol bir gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, adamy heniz tanap biler. Nol bilimli subutnama bilen hödürlemek muny ýapýar; gapjyk tarapynda dükan wersiýasyndan soň gelýär (aşakda nol bilimli subutnama serediň).]

= Ýakyn aralyk: geçiş kartalary we ýaş barlagy

Turniketler we çäre gapylary üçin Tamga *geçiş kartasyny* ulanýar: standart hödürleme bilen bir gezek hasaba durmak, soňra QR hökmünde görkezilýän 60 sekuntlyk gol çekilen belgi — belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we biletler bir gezeklik bolup biler. Adamdan adama barlagda OpenID4VP tersine başlaýar: barlaýanyň programmasy standart haýyş başlaýar. Ikisi hem wersiýaly köprülerdir; maksat NFC/BLE arkaly ISO 18013-5.

#chapter()
= Sanawlardan kitaba

Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we *QBFT* ylalaşykly rugsatly *Hyperledger Besu* toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Sanawyň her meýdany kontrakt ýazgysyna gabat gelýär; sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaby berýändigi synagdan geçirilýär. Bölekler ynamy bir interfeýs arkaly okaýar; resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: #link("https://tamga.network/tk/learn/what-is-blockchain")[blokçeýn näme — we näme däl].

Kitapdaky dolandyryş ýörelgelere eýerýär: validatorlar deň sesli döwletlerdir; täze agzalar 2/3 ses bilen; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar; daşary ýurt guramalarynyň ykrar edilmegini her döwlet özi kesgitleýär.

= Nol bilimli subutnama we gözleg ugurlary

*Nol bilimli subutnama bilen hödürlemek (karar berildi).* Gapjyk gurama gol çeken we üýtgemeýän mdoc barada “18 ýaşdan uly” ýaly bir hakykaty açyk çeşmeli Longfellow ZK ulgamy bilen subut edýär — Ýewropanyň ýaş barlagy boýunça işleri hem şu ulgama esaslanýar. Barlaýjy diňe sözlemiň dogrudygyny we resminamany haýsy guramanyň berendigini görýär; iki görkeziş biri-birine baglanyp bilinmeýär. Diňe barlanan we gol çekilen ynam sanawynda çap edilen zynjyrlar kabul edilýär. Barlaýjy tarapy taýýar; telefonda subutnama döretmek dükan wersiýasyndan soň gelýär; subutnama mümkin bolmasa adaty hödürleme dowam edýär. Serediň: #link("https://tamga.network/tk/learn/zero-knowledge-proofs")[nol bilimli subutnamalar].

*Gözleg ugry: baha gatlagy.* Barlanan taraplaryň arasynda ygtyýarlandyrma; hasaplaşyk düzgünleşdirilen ýollarda galýar. Ilkinji wersiýanyň ýa-da pilotyň bölegi däl; islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer.

#chapter()
= Ýagdaý we ýol kartasy

*Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):* diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we şahsyýet resminamasy, mdoc görnüşinde hem; kampus we çäre geçiş kartalary, bir gezeklik biletler; saýta degişli lakam bilen web saýta hasaba durmak we passkey bilen giriş; barlaýjy tarapynda nol bilimli subutnama bilen ýaş barlagy; dokuz açyk çeşmeli paket. Telefonda synagdan geçirildi.

#kvtable("Tapgyrlar", (("Sanaw tapgyry (häzir)", "gol çekilen ynam sanawlary + labyr žurnaly · Tamga = wagtlaýyn operator"), ("Pilot", "ilkinji resminama beriji gurama uniwersitet · guramanyň açary uniwersitetde · sanawlar, kitap ýok"), ("0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby"), ("1 tapgyr", "agza döwletleriň sanawlary · ýakyn aralyk (NFC/BLE) · Digital Credentials API"),), mono: false)

Ilkinji wersiýanyň belli çäkleri ýazga alnandyr we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenendir.

Hakyky tordan doly aýry synag tory, *sandbox.tamga.network*, işleýär: öz synag köki we sanawlary, nusga guramalar, ýasama adamlar we her görnüşden nusga resminamalar, çalt synagyň ýanynda islege bagly hakyky şahsyýet barlagy (gündelik we aýlyk çägi bilen) we synag gurama hasaplary. Hakyky tordaky hiç bir gapjyk ýa-da barlaýjy oňa ynanmaýar. Gapjyk, gurama we barlaýjy işläp düzüjileriniň hemmesi şol ýerde synaýar: gapjyk işläp düzüjisi öz gapjyk üpjün edijisini sandbox sanawyna hasaba aldyrýar we gapjygyny nusga guramalar, şahsyýet hyzmaty we barlaýjy bilen synap görýär. Serediň: #link("https://docs.tamga.network/guides/sandbox")[sandbox gollanmasy] (iňlis dilinde).

= Belli çäkler

- Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär.
- Ýatyrylyş iň giç takmynan 90 minutda güýje girýär.
- Nol bilimli subutnama bilen hödürlemek gapjyga gelýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.
- Şahsyýet hyzmaty nazary taýdan adamyň belli bir saýtdaky lakamyny hasaplap biler; açar goragy we barlag muny çäklendirýär, nol bilimli subutnama ony geljekde aýyrar.
- Tordaky gapjyklar (ilkinjisi Tamga Wallet) programma dükanlarynda çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär; gapjygyň dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar.

= Düzgünler, açyk çeşme we giňişleýin okamak

Toruň düzgünleri *Tamga ARF 1.0* görnüşinde çap edilýär: esasy resminama, Trust Framework, *Tamga Rulebook* we ondan her resminama görnüşi üçin şahalanýan rulebook-lar — Education, Identity we Event Ticket — #link("https://arf.tamga.network")[arf.tamga.network] salgysynda (iňlis we türk dillerinde). Şeýle hem serediň: #link("https://tamga.network/tk/learn/rules-and-rulebooks")[düzgünler we rulebook-lar].

Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamalydyr. #raw("@tamga-network/*") paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy we gapjyk ýadrosyny öz içine alýar; integrasiýa gollanmalary we spesifikasiýalar #link("https://docs.tamga.network")[işläp düzüjiler üçin resminamalarda] (iňlis we türk dillerinde). Düşünjeler #link("https://tamga.network/tk/learn")[Öwren] bölüminde başdan düşündirilýär; #link("https://docs.tamga.network/glossary")[sözlük] çalt salgylanma, #link("https://tamga.network/tk/manifesto")[manifest] bolsa “näme üçin”.

#notebox[Bu ýaşaýan resminamadyr (v1.0). Kararlar kämilleşdigiçe üýtgeýär; hemişelik galýan ynam modelidir.]

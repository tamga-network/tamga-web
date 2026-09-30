// Tamga Network — Whitepaper v3.0 (tk). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-tk.typ ../public/whitepaper-tk.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "tk",
  title: [Türkiýe we Türki Dünýäsi üçin \ Sanly Ynam Infrastrukturasy],
  subtitle: [ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy — X.509 guramalar, häzir gol çekilen ynam sanawlary, garaşsyz operatorlar goşulanda rugsatly kitap.],
  labels: (abstract: "Gysgaça mazmun", contents: "Mazmuny", version: "WHITEPAPER · WERSIÝA 3.0"),
  footer-right: "Whitepaper v3.0",
  abstract: [
    Tamga Network *Sanly Ynam Infrastrukturasydyr*: guramalar resminamalary — diplom, talyp resminamasy, şahsyýet resminamasy, bilet — adamyň telefonyna berýär, adam barlaýjynyň zerur meýdanlaryny paýlaşýar we barlaýjy berijä ýüz tutman olary birnäçe sekuntda barlaýar.

    Tamga ÝB-niň tehniki gatlagyny üýtgetmän ulanýar: *SD-JWT VC* we *ISO 18013-5 mdoc* resminamalary, *OpenID4VCI/VP*, *X.509* guramalar we ETSI modelinde *gol çekilen ynam sanawlary*. Onuň öz gatlagy türki dünýäsi üçin dolandyryşdyr: her gurluşda her agza döwlet üçin orun bar we Tamga diňe olaryň adyndan wagtlaýyn operatordyr.

    Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş-zynjyrly ynam sanawlaryna daýanýar; rugsatly *Besu/QBFT* kitaby diňe azyndan iki garaşsyz operator goşulanda goşulýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat — hatda heşi hem — ýazylmaýar. Tutuş akym hakyky kriptografiýa bilen häzir başdan-aýak işleýär; bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.

  ],
)

= Mesele: “resminama nusgasy” döwrüniň soňy

Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Nusgalar serwerlerde toplanýar we gözegçilikden çykýar; her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykylygy bolsa nusganyň ynandyryjylygyna bagly galýar.

Täze model muny tersine öwürýär: resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlag çeşmä soramazdan kriptografik taýdan edilýär. Serediň: #link("https://tamga.network/tk/docs/why-new-model")[näme üçin täze model].

= Garaýyş: eIDAS 2.0-dan türki dünýäsine

*eIDAS 2.0* bilen ÝB-niň her agza döwleti raýatyna *Ýewropa Sanly Şahsyýet Gapjygyny* hödürlemäge borçly. Bu gapjygyň arhitekturasy (ARF) we profilleri sanly ynamyň hakyky standartyna öwrülýär.

Türki dünýäsi dili, medeniýeti we taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli; guramanyň şahsyýetine serhetden aňyrda ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda, her döwleti özygtyýarly saklaýan dolandyryş bilen gurýar.

= Ýörelgeler

- *Ilki özygtyýarlylyk* — her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk 2/3 ses bilen; serhetaşa ykrar birtaraplaýyn kesgitlenýär.
- *Hiç bir umumy ýazgyda şahsy maglumat ýok* — sanawda, žurnalda ýa-da kitapda ýok; hatda heşi hem ýok.
- *Laýyk ýöne garaşsyz* — ÝB-niň tehniki gatlagy bolşy ýaly; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.
- *Köp döwlet üçin* — hiç bir belgi ýa-da rol Tamga-ny ýeke-täk operator hasaplamaýar; Tamga hemişe wagtlaýyn wekildir.
- *Kitap saklaýyş däl, gol çekijileriň saýlanmasydyr* — häzir sanawlar; garaşsyz operatorlar goşulanda kitap.
- *Kadadan çykmasyz enjam baglanyşygy* — resminamanyň her nusgasy enjamdaky açara baglanandyr; nusgany gaýtadan oýnap bolmaýar.
- *Tabşyrmak üçin dizaýn* — her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar.

= Rollar

ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy, “TR National Root CA (wagtlaýyn operator: Tamga)” we gapjyk üpjün edijisi. Guramalar resminama üpjün edijilerdir; iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr. PID üpjün edijisiniň orny döwlet ony doldurýança boş; şol wagt şahsyýet resminamasy Tamga şahsyýet hyzmatyndan gelýär (resminama we janlylyk barlagy). Heniz validator operatory ýok — şonuň üçin kitap hem ýok. Ýanaşyk: #link("https://tamga.network/tk/docs/eudi-comparison")[Tamga we EUDI arhitekturasy].

#chapter()
= Ynam modeli: gol çekilen ynam sanawlary

Gol kimiň gol çekendigini subut edýär; *ynam sanawy* bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip biljekdigini we häzirki ýagdaýyny aýdýar. Sanawlar gol çekilen JWS faýllarydyr, *wersiýaly we heş-zynjyrly*, pozulmaýar we indiki täzelenme senesini göterýär; barlaýjy gol çekijini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk *labyr žurnalyna* ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik: #link("https://tamga.network/tk/docs/trust-lists")[ynam sanawlary].

#kvtable("Çap edilýän faýllar — trust.tamga.network", (("lotl.jws", "sanawlaryň sanawy — milli sanawlar, shemalar, gapjyk üpjün edijileri"), ("tl-tr.jws", "Türkiýe — kök sertifikat edaralary, resminama berijiler (+ ygtyýarlar), barlaýjylar"), ("tl-az · kz · kg · uz", "beýleki agza döwletler üçin goýlan orunlar"), ("anchors.jsonl", "labyr žurnaly — her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"), ("keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"), ("archive/", "öňki her wersiýa, asla pozulmaýar"),), mono: false)

Belgiler bellenilmeýär, alynýar; tabşyrylanda ýa-da kitap gelende üýtgemeýär:

#kvtable("Belgiler", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"), ("vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa> — meselem urn:tamga:edu:DiplomaCredential:1"), ("schema_id", "keccak256(vct)"), ("adam", "belgi ýok — resminamanyň her nusgasy üçin bir enjam açary"),), mono: true)

= Resminamalar: SD-JWT VC we mdoc

Esasy görnüş *SD-JWT VC* (IETF, #raw("dc+sd-jwt"), ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar; sözbaşy guramanyň X.509 zynjyryny göterýär; #raw("cnf") nusgany enjam açaryna baglaýar. Şahsyýet resminamasy mundan başga-da *ISO 18013-5 mdoc* görnüşinde berilýär; şeýlelikde ýaş barlagy #raw("age_over_18") meýdanyny alýar we başga hiç zat almaýar. Resminama görnüşleri hemişelik URN-lerdir; olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär. Serediň: #link("https://tamga.network/tk/docs/did-vc")[resminamalar].

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
- *Hödürlemek (OpenID4VP, DCQL).* Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir. Gapjyk ony ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär; soňra tassyklanan meýdanlar we açaryň şu telefondadygynyň subutnamasy bilen şifrlenen jogap iberýär.
- *Web saýtlar.* Saýt adamy bir gezek gapjyk bilen hasaba alýar; soňra gündelik giriş *passkey* bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: #link("https://tamga.network/tk/docs/login-with-tamga")[TamgaID bilen giriş].

= Barlag: bäş gatlak, üç netije

Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar.

#kvtable("Barlag hatary", (("T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"), ("A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"), ("B · görnüş", "resminama görnüşi hasaba alnan; kesgitlemäniň heşi katalog bilen gabat gelýär"), ("C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly; kategoriýa gabat gelýär"), ("D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; sanaw täze we labyrlanan"), ("E · syýasat", "soralan meýdanlar bar; barlaýjynyň çäginden daşary hiç zat ýok"), ("→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"),), mono: false)

*INDETERMINATE* (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy “häzir barlap bolmady” diýýär — “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitleýär. Ygtyýar *berlen senesine* görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar.

= Ýatyrylyş we durmuş aýlawy

Ýatyrylyş *IETF Token Status List* bilen edilýär: her resminama nusgasy üçin *tötänleýin* orunda iki bit — güýjünde, ýatyrylan ýa-da togtadylan. Gurama sanawy *kesgitli aralykda* çap edýär, asla haýyş boýunça däl; şeýlelikde wagty adam barada hiç zady aýan etmeýär; her çap edilişi labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak ne gurama, ne-de telefona çagyryş edýär. Ýatyrylyş iň giç takmynan 90 minutda her barlaýja ýetýär. Nusgalar dizaýn boýunça gutarýar; gapjyk täzelerini almazdan öň soraýar we asla ýuwaşlyk bilen täzelemeýär. Serediň: #link("https://tamga.network/tk/docs/recovery-revocation")[dikeldiş we ýatyrylyş].

#chapter()
= Dizaýndan gelýän gizlinlik

- *Barlaýjy başyna nusga.* Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär.
- Adaty ýagdaýda *saýlama açyklama*; görnüş rugsat berende #raw("age_over_18") ýaly predikatlar.
- *Şahsyýet barlagy aýrylandyr.* Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär; resminamany berenden soň surat saklamaýar, diňe açyk däl, heşlenen ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.
- *Žurnallarda we açyk salgylarda şahsy maglumat ýok.* Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.
- *Web saýtlar* hasap açarynyň çig bahasyny däl, öz syry bilen döredilen heşini saklaýar.

#notebox[Açyk aýdylýan galyndy töwekgelçilik: şol bir gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, adamy heniz tanap biler. Muny ýapmak üçin nol bilimli resminamalar gerek (gözleg ugurlaryna serediň).]

= Ýakyn aralyk: geçiş kartalary we ýaş barlagy

Turniketler we çäre gapylary üçin Tamga *geçiş kartasyny* ulanýar: standart hödürleme bilen bir gezek hasaba durmak, soňra QR hökmünde görkezilýän 60 sekuntlyk gol çekilen belgi — belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we biletler bir gezeklik bolup biler. Adamdan adama barlagda OpenID4VP tersine başlaýar: barlaýanyň programmasy standart haýyş başlaýar. Ikisi hem wersiýaly köprülerdir; maksat NFC/BLE arkaly ISO 18013-5.

#chapter()
= Sanawlardan kitaba

Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we *QBFT* ylalaşykly rugsatly *Hyperledger Besu* toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Sanawyň her meýdany kontrakt ýazgysyna gabat gelýär; sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaby berýändigi synagdan geçirilýär. Bölekler ynamy bir interfeýs arkaly okaýar; resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: #link("https://tamga.network/tk/docs/blockchain")[blokçeýn näme — we näme däl].

Kitapdaky dolandyryş ýörelgelere eýerýär: validatorlar deň sesli döwletlerdir; täze agzalar 2/3 ses bilen; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar; daşary ýurt guramalarynyň ykrar edilmegini her döwlet özi kesgitleýär.

= Gözleg ugurlary

Bular öwrenilýän dizaýnlardyr; ilkinji wersiýanyň ýa-da pilotyň bölegi däl we islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer.

- Gurama tarapyndan tanalmagy aradan aýyrmak üçin *nol bilimli resminamalar* (meselem, BBS\+). Serediň: #link("https://tamga.network/tk/docs/selective-disclosure")[saýlama açyklama].
- *Hasabatly açyklama* — lakamlaryň diňe kazyýet we köp guramaly bosaga bilen çözülip bilinmegi (DKG we bosaga ElGamal; açar asla täzeden gurulmaýar). Serediň: #link("https://tamga.network/tk/docs/accountable-disclosure")[hasabatly açyklama].
- *Alnan lakamlar we dikeldiş* — iýerarhiki açarlar, konwert şifrlemesi, enjamy dikeltmek. Serediň: #link("https://tamga.network/tk/docs/identity-layers")[şahsyýet gatlaklary].
- *Baha gatlagy* — barlanan taraplaryň arasynda ygtyýarlandyrma; hasaplaşyk düzgünleşdirilen ýollarda galýar.

#chapter()
= Ýagdaý we ýol kartasy

*Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):* diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we şahsyýet resminamasy, mdoc görnüşinde hem; kampus we çäre geçiş kartalary, bir gezeklik biletler; web saýta hasaba durmak we passkey bilen giriş; sekiz açyk çeşmeli paket. Telefonda synagdan geçirildi.

#kvtable("Tapgyrlar", (("B tapgyr (häzir)", "gol çekilen ynam sanawlary + labyr žurnaly · Tamga = wagtlaýyn operator"), ("Pilot", "bir wakf uniwersiteti · guramanyň açary uniwersitetde · sanawlar, kitap ýok"), ("0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby"), ("1 tapgyr", "agza döwletleriň sanawlary · ýakyn aralyk (NFC/BLE) · Digital Credentials API"),), mono: false)

Ilkinji wersiýadaky her gysga ýol — nusga ýazgylar, programmada açar, Tamga-da duran guramanyň açary, ýeke operator — açyk #link("https://tamga.network/tk/shortcuts")[belli gysga ýollar] sahypasynda görkezilýär we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenendir.

= Belli çäkler

- Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk žurnal, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär.
- Ýatyrylyş iň giç takmynan 90 minutda güýje girýär.
- Nol bilimli resminamalar kabul edilýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.
- Diňe ilkinji wersiýada: açarlar programmada we guramanyň açary Tamga-da — ikisi hem pilotdan öň ýapylýar.
- Tamga Wallet App Store we Google Play-de çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär; dükan wersiýasy bilen App Attest / Play Integrity hökmany bolar.

= Açyk çeşme we giňişleýin okamak

Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamalydyr. #raw("@tamga-network/*") paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy we gapjyk ýadrosyny öz içine alýar; integrasiýa gollanmalary #link("https://tamga.network/tk/docs/developers")[işläp düzüjiler bölüminde]. Düşünjeler #link("https://tamga.network/tk/docs")[resminamalarda] başdan düşündirilýär; #link("https://tamga.network/tk/docs/glossary")[sözlük] çalt salgylanma, #link("https://tamga.network/tk/manifesto")[manifest] bolsa “näme üçin”.

#notebox[Bu ýaşaýan resminamadyr (v3.0). Kararlar kämilleşdigiçe üýtgeýär; hemişelik galýan ynam modelidir.]

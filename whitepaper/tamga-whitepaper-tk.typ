// Tamga Network — Whitepaper v1.0 (tk). whitepaper/source/content.py dosyasından üretilir (generate.py) — elle düzenleme.
// Build:  typst compile --root . tamga-whitepaper-tk.typ ../public/whitepaper-tk.pdf
#import "template.typ": conf, codeblock, kvtable, chapter, notebox, muted

#show: conf.with(
  lang: "tk",
  title: [Türkiýe we Türki Dünýäsi üçin \ Sanly Ynam Infrastrukturasy],
  subtitle: [ÝB-niň EUDI profillerine esaslanýan özygtyýarly salgylanma arhitekturasy. Guramalar X.509 sertifikat göterýär, ynam häzir gol çekilen sanawlara daýanýar, garaşsyz operatorlar goşulanda rugsatly kitap goşulýar.],
  labels: (abstract: "Gysgaça mazmun", contents: "Mazmuny", version: "WHITEPAPER · WERSIÝA 1.0"),
  date: "2026-10-27",
  edition: "Gaýtadan seredilen neşir · ilkinji neşir 2026-10-03",
  footer-right: "Whitepaper v1.0",
  abstract: [
    Tamga Network sanly ynam infrastrukturasydyr. Gurama diplom, talyp resminamasy, şahsyýet resminamasy ýa-da bilet ýaly resminamany gönüden-göni adamyň telefonyna berýär. Adam diňe barlaýjynyň soran meýdanlaryny paýlaşýar, barlaýjy bolsa guramaga ýüz tutman resminamany birnäçe sekuntda barlaýar.

    Tehniki gatlak Ýewropa Bileleşiginiň gatlagydyr we bolşy ýaly ulanylýar: SD-JWT VC we ISO 18013-5 mdoc resminamalary, OpenID4VCI we OpenID4VP, guramalar üçin X.509 sertifikatlary we ETSI modelinde gol çekilen ynam sanawlary. Tamga onuň üstüne türki dünýäsi üçin ýazylan dolandyryş gatlagyny goşýar. Her sanawda, belgide we rolda her agza döwlet üçin orun bar; Tamga operator rolyny diňe wagtlaýyn, döwletleriň adyndan we bir döwlet ony kabul edýänçä ýerine ýetirýär.

    Ynam häzir açyk labyr žurnaly bilen bilelikde wersiýaly we heş zynjyrly ynam sanawlaryna daýanýar. Rugsatly Besu/QBFT kitabynyň kody ýazyldy we synagdan geçdi, ýöne kitap diňe gol çekilen sanawlary şöhlelendirýär we azyndan iki garaşsyz operator ony bilelikde dolandyrmaga başlaýança ýapyk galýar. Sanawlara, žurnallara ýa-da kitaba hiç bir şahsy maglumat ýazylmaýar, heşi hem ýazylmaýar. Hyzmatlar hakyky kriptografiýa bilen başdan-aýak işleýär, açyk paketler npm-de synag wersiýasy hökmünde çap edildi, resminama beriji we barlaýjy bolsa 2026-njy ýylyň oktýabrynda OpenID Foundation-yň laýyklyk synag meýilnamalaryny öz-synag hökmünde geçirip, şowsuz modulsyz tamamlady. Bu resminama nämäniň işleýändigini, nämäniň meýilleşdirilendigini we nämäniň heniz gözlegdigini aýdýar.

  ],
)

= Mesele: resminama nusgasy döwrüniň soňy

Onlarça ýyllap kimdigimizi nusga tabşyryp subut etdik. Diplomyň nusgasy iş berijiye, şahsyýet kartynyň nusgasy banka gidýär we her nusga eýesiniň gaýdyp görmeýän bir serwerinde ýaşamaga başlaýar. Her bank, iş beriji we uniwersitet şol bir barlagy täzeden gurýar; resminamanyň hakykymy ýa dälmi bolsa nusganyň näderejede ynandyryjy görünýändigine bagly galýar.

Täze model muny tersine öwürýär. Resminama adamda galýar, diňe zerur subutnama paýlaşylýar we barlaýjy çeşmä soramagyň ýerine kriptografik goly barlaýar. Bu resminamanyň galan bölegi Tamga-nyň bu modeli Türkiýe we türki dünýäsi üçin nähili gurýandygyny düşündirýär; arka plan #link("https://tamga.network/tk/learn/paper-to-digital")[näme üçin täze model] sahypasynda.

= Garaýyş: eIDAS 2.0-dan türki dünýäsine

eIDAS 2.0 bilen ÝB-niň her agza döwleti raýatyna Ýewropa Sanly Şahsyýet Gapjygyny hödürlemäge borçly. Onuň aňyrsyndaky arhitektura (ARF) we kesgitlän profilleri ÝB-den has daşarda sanly ynamyň umumy diline öwrülýär, sebäbi bu profillere esaslanýan gapjyklar, resminama berijiler we barlaýjylar biri-biri bilen gürleşip bilýär.

Türki dünýäsi umumy dil maşgalasyny, medeniýeti we uzak taryhy paýlaşýar. Bir döwletde berlen diplom beýlekisinde barlanyp bilinmeli, guramanyň şahsyýetine serhediň aňyrsynda hem ynanyp bolmaly. Tamga bu umumy binýady şol bir standartlarda gurýar we her döwleti öz hasabynyň özygtyýarly eýesi edip goýýan dolandyryş gatlagyny goşýar.

Tamga her biri özbaşdak durup bilýän üç gatlakda gurulýar. Esasda resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk; şonuň üçin başga ýerden gelen laýyk gapjyk ýa-da barlaýjy Tamga guramasy bilen işläp bilýär. Onuň üstünde Tamga Network ýeňil federasiýadyr: her döwletiň ynam sanawyny jemleýär we döwletleriň biri-birini ykrar etmegine mümkinçilik berýär. Häzir Türkiýäniň sanawyny Tamga wagtlaýyn çap edýär; döwlet öz sanawyny çap edende tor şony görkezýär. Toruň üstünde onuň düzgünlerine eýerýän gapjyklar we hyzmatlar işleýär. Tor öz gapjygyny işletmeýär. Gapjyk üpjün edijilerini ynam sanawynda sanaýar we çap edilen düzgünlere eýerýän her üpjün ediji sanawa girip biler. Sanawa giren ilkinji gapjyk Tamga Wallet; ol öz üpjün ediji hyzmaty bolan aýratyn önümdir we ýazgysy 2026-njy ýylyň 14-nji oktýabryndan bäri sanawda işjeň. Tamga Wallet ÝB bilen laýyk; “EUDI Wallet” ady bolsa ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän gapjyklaryna degişli. Tor hiç zat satmaýar. Düzgünleri, ynam sanawlaryny, açyk kody we Gurama konsoly, Tamga Verify ýaly salgylanma hyzmatlaryny işledýär; täjirçilik hyzmatlaryny toruň daşyndaky kompaniýalar hödürleýär.

= Ýörelgeler

- *Ilki özygtyýarlylyk.* Her döwlet öz hasabynyň ýeke-täk ýazyjysydyr; tora agzalyk üçden iki ses bilen kesgitlenýär; serhetaşa ykrar her döwletiň birtaraplaýyn karary.
- *Hiç bir umumy ýazgyda şahsy maglumat ýok.* Sanawlar, žurnallar we kitap şahsy maglumat götermeýär, heşini hem götermeýär.
- *Laýyk ýöne garaşsyz.* ÝB-niň tehniki gatlagy bolşy ýaly ulanylýar; dolandyryş gatlagy türki dünýäsi üçin ýazylýar.
- *Köp döwlet üçin.* Hiç bir belgi, rol ýa-da maglumat gurluşy Tamga-ny ýeke-täk operator hasaplamaýar. Tamga hemişe ýazga alnan wagtlaýyn wekildir.
- *Kitap saklaýyş saýlawy däl, gol çekijileriň saýlawydyr.* Häzir gol çekilen sanawlar; garaşsyz operatorlar bilelikde gol çekende kitap.
- *Kadadan çykmasyz enjam baglanyşygy.* Resminamanyň her nusgasy adamyň enjamyndaky açara baglanandyr; şonuň üçin nusgany gaýtadan oýnap bolmaýar.
- *Tabşyrmak üçin dizaýn.* Her wagtlaýyn ygtyýaryň ölçenip bilinýän tabşyryş nokady bar; toruň dolandyryşyny bir gaznaga tabşyrmak eýýäm ýazylan we synagdan geçirilen.

= Rollar

ÝB arhitekturasynyň her roly Tamga-da bar. Döwlet heniz goşulmadyk bolsa, roly Tamga wagtlaýyn we hasaba alnan görnüşde öz üstüne alýar: ynam sanawynyň operatory, hasaba alyş edarasy we “TR National Root CA (wagtlaýyn operator: Tamga)”. Guramalar resminama üpjün edijilerdir. Iş berijiler, web saýtlar we gapylar hasaba alnan barlaýjylardyr; her biriniň guramany we goldaw salgysyny görkezýän giriş sertifikaty bar we bu sertifikat ETSI TS 119 411-8 profiline laýyk gelýär. PID üpjün edijisiniň orny döwlet ony doldurýança boş galýar. Şol wagta çenli şahsyýet resminamasy adamyň şahsyýet resminamasyny we janlylygyny barlaýan Tamga şahsyýet hyzmatyndan gelýär; bu resminama döwlet PID-i hasaplanmaýar, tassyklama resminamasydyr we döwletiň PID-i gelende onuň ýerini alýar. Tor gapjyk saýlamaýar, gapjyklary sanaýar. Her gapjyk öz gapjyk üpjün edijisini işledýär; üpjün ediji gapjyk birliklerini hasaba alýar we gapjyk hem açar tassyklamalaryny berýär. Tor hiç birini işletmeýär. Häzir Türkiýe sanawynda ýeke-täk işjeň resminama beriji wagtlaýyn şahsyýet hyzmaty; demolarda ulanylan synag guramalary ýatyryldy, ilkinji hakyky gurama taýýarlanýar. Heniz validator operatory ýok, şonuň üçin kitap hem ýok. Ýanaşyk tablisa #link("https://tamga.network/tk/learn/roles")[rollar we adalgalar] sahypasynda.

#chapter()
= Ynam modeli: gol çekilen ynam sanawlary

Gol kimiň gol çekendigini subut edýär. Ynam sanawy bolsa gol çekijiniň hakyky guramadygyny, haýsy resminama görnüşlerini haçandan bäri berip bilýändigini we häzirki ýagdaýyny aýdýar. Tamga-nyň sanawlary gol çekilen JWS faýllarydyr; wersiýaly we heş zynjyrly, ýagny her wersiýa öňküsini görkezýär. Hiç bir wersiýa pozulmaýar we her biri indiki täzelenme senesini göterýär. Barlaýjy sanawyň gol çekijisini aýratyn ýol bilen çap edilen kök barmak yzy bilen deňeşdirýär. Her sanaw wersiýasy, her ýatyrylyş sanawynyň çap edilmegi we her shema üýtgeşmesi mundan başga-da azyndan sagatda bir gezek açyk labyr žurnalyna ýazylýar; şeýlelikde yza aýlanan sanaw anyklanýar. Jikme-jiklik #link("https://tamga.network/tk/learn/trust-lists")[ynam sanawlary] sahypasynda.

#kvtable("Çap edilýän faýllar — trust.tamga.network", (("lotl.jws", "sanawlaryň sanawy: milli sanawlar, daşky sanawlar, shemalar, gapjyk üpjün edijileri, kabul edilen ZK zynjyrlary"), ("tl-tr.jws", "Türkiýe: kök sertifikat edaralary, ygtyýarlary bilen resminama berijiler, barlaýjylar, gapjyk üpjün edijileri"), ("tl-<cc>.jws", "beýleki her agza döwlet (AZ, KZ, KG, UZ) we synçylar (HU, TM) üçin goýlan orun; häzir diňe TR işjeň"), ("anchors.jsonl", "labyr žurnaly: her waka üçin gol çekilen bir setir, azyndan sagatda bir gezek"), ("keys/", "kök barmak yzlary (aýratyn ýoldaky ynam labyry)"), ("archive/", "öňki her wersiýa, asla pozulmaýar"),), mono: false)

Belgiler el bilen bellenilmeýär, sertifikatlardan we görnüş atlaryndan alynýar; şonuň üçin tabşyrylanda-da, kitap gelende-de üýtgemeýär:

#kvtable("Belgiler", (("ca_id", "keccak256(state_code ‖ SHA-256(kök sertifikat))"), ("issuer_id", "keccak256(state_code ‖ SHA-256(gurama sertifikaty))"), ("vct", "urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa>, meselem urn:tamga:edu:DiplomaCredential:1 (tor görnüşi)"), ("vct (milli)", "urn:tamga:<cc>:<ugur>:<Görnüş>:<esasy wersiýa>; bir döwletiň öz at meýdanynda hasaba alan görnüşi"), ("schema_id", "keccak256(vct)"), ("adam", "belgi ýok; resminamanyň her nusgasy üçin bir enjam açary"),), mono: true)

*Federasiýa.* Sanawlaryň sanawy başga operatoryň çap eden sanawyny hem görkezip biler: döwletiň, onuň ygtyýarlandyran guramasynyň ýa-da ÝB-niň sanawyny. Her biri üçin salgysyny, Tamga-nyň öz gol çekilen sanawlar sanawynda berkidilen gol çekijisini we haýsy rollar hem resminama görnüşleri üçin kepil bolup biljekdigini aýdýan çägini ýazga alýar. Sanaw eýesinde galýar. Döwlet öz sanawyny çap edende gapjyk we barlaýjy üçin diňe salgy we gol çekiji üýtgeýär. Ilkinji okalýan daşky görnüş ETSI TS 119 602; şeýlelikde Tamga barlaýjysy ÝB şahsyýet resminamasyny (PID) we mobil sürüjilik şahadatnamasyny (mDL) hem tanap biler. Häzir sanawlar sanawynda daşky sanaw ýok; her biri ýazga alnan razylyk bilen goşulýar. Serediň: #link("https://tamga.network/tk/learn/federation")[federasiýa].

= Resminamalar: SD-JWT VC we mdoc

Esasy görnüş SD-JWT VC (IETF, #raw("dc+sd-jwt"), ES256). Her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar. Sözbaşy guramanyň X.509 zynjyryny göterýär, #raw("cnf") meýdany nusgany enjamdaky açara baglaýar. Şahsyýet resminamasy şol bir eýe açary bilen ISO 18013-5 mdoc görnüşinde hem berilýär; şeýlelikde diňe mdoc düşünýän brauzer ýa-da ýaş gapysy hem ony ulanyp bilýär. Iki görnüş hem #raw("age_over_15") we #raw("age_over_18") ýaş meýdanlaryny göterýär; bu meýdanlar berlen pursatynda doglan senesinden alynýar we birini soran barlaýjy diňe hawa ýa-da ýok alýar. Ýaş çäkleriniň toplumy ýapyk we diňe ýazga alnan karar bilen üýtgeýär. Resminama görnüşleri hemişelik URN-lerdir. Olaryň kesgitlemeleri açyk katalogda durýar we her resminama öz kesgitlemesiniň heşini göterýär; şeýlelikde gapjyk kesgitlemäniň üýtgändigini bilýär. Agza döwletiň hasaba alan milli görnüşi öz at meýdanyny ulanýar (#raw("urn:tamga:<cc>:…")), şonuň üçin milli at tor derejesindäki at bilen asla çaknyşmaýar. Serediň: #link("https://tamga.network/tk/learn/verifiable-credentials")[resminamalar].

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

Milli şahsyýet belgisi diňe şahsyýet resminamasynda we diňe saýlap açylýan meýdan hökmünde bar. Hiç bir diplom, karta ýa-da bilet ony götermeýär.

= Bermek we hödürlemek

- *Bermek (OpenID4VCI).* Gurama şol bir ekranda QR kody we PIN görkezýär; PIN baglanyşygyň içinde asla gitmeýär. Ýa-da gapjyk guramalaryň katalogyndan başlaýar we şahsyýet resminamasyny hödürläp ilki adamyň şahsyýetini subut edýär. Gapjyk her biri başga enjam açaryna baglanan on nusga alýar. Giriş belligi bäş minutlyk ömründe birnäçe resminama haýyşynda ulanylyp bilner, ýöne diňe öz içine alýan resminama konfigurasiýalary üçin, jemi on nusga bilen we hemişe şol bir DPoP açary bilen.
- *Diňe hakyky gapjyklar.* Gurama resminamany bermezden öň gapjyk üpjün edijisiniň beren gysga möhletli gapjyk nusgasy tassyklamasyny we açar tassyklamasyny barlaýar. Ikisi hem ynam sanawyndaky üpjün edijiden gelýär, öz ýatyrylyş ýazgysyny göterýär we açaryň nähili saklanýandygyny aýdýar.
- *Hödürlemek (OpenID4VP, DCQL).* Barlaýjynyň haýyşy hasaba alnan sertifikaty bilen gol çekilendir we hasaba alyş sertifikatyny göterýär. Gapjyk ikisini hem ynam sanawyna görä barlaýar, näme soralýandygyny takyk görkezýär we hasaba alnan çäkden daşary islendik zat üçin duýduryş berýär. Barlaýjy saýlaw hödürleýän bolsa (#raw("credential_sets"), #raw("claim_sets")), gapjyk olary saýlaw hökmünde görkezýär. Soralan meýdany götermeýän resminama asla iberilmeýär; gapjyk haýyşyň näme üçin ýerine ýetirilip bilinmeýändigini adama aýdýar. Jogap şifrlenen we diňe tassyklanan meýdanlary hem açaryň şu telefondadygynyň subutnamasyny göterýär.
- *Brauzerden.* Web saýt resminamany QR kodunyň ýerine brauzeriň Digital Credentials API-si bilen hem sorap biler. Salgylanma barlaýjy muny hödürleýär, gapjyk ýadrosy hem ISO/IEC 18013-7 C goşundysyndaky mdoc haýyşyna jogap berýär. Tamga Wallet-de Android moduly ýazyldy, ýöne heniz enjamda synalmady; iOS wersiýasy heniz ýok.
- *Web saýtlar.* Saýt adamy gapjyk bilen bir gezek, diňe şol saýta degişli lakam bilen hasaba alýar. Gapjyk lakamy saýtyň hasaba alnan domen adyndan alýar; şonuň üçin iki saýt adamy deňeşdirip bilmeýär, täzelenen sertifikat lakamy üýtgetmeýär we täze telefonda şahsyýet barlananda şol lakamlar yzyna gelýär. Soňra gündelik giriş passkey bilen bolýar we hiç bir meýdan paýlaşylmaýar. Serediň: #link("https://tamga.network/tk/learn/unlinkability")[Tamga bilen giriş].

= Barlag: bäş ädim, üç netije

Her barlag şol bir hatary şol bir tertipde işledýär we ilkinji säwlikde togtaýar. Her ädimiň hemişelik kody bar; şonuň üçin ret hemişe sebäbini aýdýar.

#kvtable("Barlag hatary", (("T0", "haýyş we jogap biri-birine degişli (nonce, alyjy, şifrleme)"), ("A · format", "gol, sertifikat zynjyry, enjam subutnamasy, gizlin meýdanlar bozulmadyk"), ("B · görnüş", "resminama görnüşi hasaba alnan; kesgitlemäniň heşi katalog bilen gabat gelýär"), ("C · ynam", "gurama bu görnüş üçin berlen senesinde ygtyýarly; kategoriýa gabat gelýär"), ("D · ýagdaý", "ýatyrylmadyk ýa-da togtadylmadyk; sanaw täze we labyrlanan"), ("E · syýasat", "soralan meýdanlar bar; barlaýjynyň çäginden daşary hiç zat ýok"), ("→ netije", "ACCEPTED (kabul) · REJECTED (ret, haýsy ädimde) · INDETERMINATE (barlap bolmady)"),), mono: false)

INDETERMINATE (kesgitsiz) asla REJECTED (ret) hökmünde habar berilmeýär. Sanawa ýetip bolmasa ýa-da sanaw täze bolmasa, barlaýjy häzir barlap bilmeýändigini aýdýar, sebäbi “bu diplom ýasama” bilen “barlap bilemok” arasyndaky tapawut kimdir biriniň işe alynmagyny kesgitläp biler. Ygtyýar berlen senesine görä bahalandyrylýar: uniwersitet işjeň wagtynda berlen diplom uniwersitet togtadylandan soň hem güýjünde galýar, täze resminama bermek bolsa derrew togtaýar.

2026-njy ýylyň oktýabrynda şahsyýet hyzmaty we Tamga Verify OpenID Foundation-yň laýyklyk synag meýilnamalaryny sandbox-da geçirdi: HAIP we FAPI 2.0 bilen OpenID4VCI (63 modul) we HAIP bilen OpenID4VP (14 modul). Resminama beriji meýilnamasynyň soňky geçirilişinde şowsuz modul galmady; barlaýjy meýilnamasynyň soňky tapgyrynda şowsuz modul-da, duýduryş-da ýokdy. Bu işden ýigrimiye golaý üýtgeşme çykdy, her biri şertnamanyň bir maddasyna esaslanýar we dördüsi öňki kararlary ýazga alnan ADR-ler bilen üýtgetdi. Bu Foundation-yň öz guraly bilen edilen öz-synagdy; sertifikat aýratyn prosesdir. Ilkinji doly geçirilişiň öwredenleri açyk çeşmeli #link("https://github.com/tamga-network/oidf-conformance-kit")[oidf-conformance-kit] hökmünde çap edildi; doly hekaýa #link("https://tamga.network/tk/blog/openid-conformance-self-test")[blogda].

= Ýatyrylyş we durmuş aýlawy

Ýatyrylyş IETF Token Status List bilen edilýär. Her resminama nusgasynyň sanawda tötänleýin orunda ýagdaý ýazgysy bar. Şahsyýet hyzmatynyň sanawlary ýazgy başyna bir bit ulanýar; resminama güýjünde ýa-da ýatyrylan, togtadylma ýok. Gurama sanawlary iki bit ulanýar we togtadylan bahasy diňe görnüşiň shemasy togtatmaga rugsat berýän ýerinde görünýär; häzir bu görnüş diplom. Gurama sanawy haýyş boýunça däl-de, kesgitli aralyk bilen çap edýär; şeýlelikde wagt adam barada hiç zat aýan etmeýär we her çap labyrlanýar. Barlaýjylar sanawlary öňünden alýar; resminamany barlamak guramaga-da, telefona-da jaň etmeýär. Sanawlar her 2 minutda täzeden çap edilýär we her biri 6 sagat güýjünde: ýagdaý serweri işleýän wagty ýatyrylyş birnäçe minutda barlaýjylara ýetýär, gysga kesilme hem barlagy togtatmaýar.

Nusgalar dizaýn boýunça gutarýar. Resminama täzeleme belligi bilen gelen bolsa, gapjyk nusgalary guramanyň yglan eden çäginde arka planda täzeleýär we täzeleme täze maglumat paýlaşmaýar. Täzeleme belligi ýeke-täk daşaýyş açaryna däl-de, gapjyk nusgasynyň tassyklama açaryna baglanýar; OAuth tassyklama profili muny talap edýär we gapjyk şeýlelikde DPoP açarlaryny üýtgetse-de täzeläp bilýär. Şahsyýet resminamasy hödürlenip täzelenýän resminamalar bolsa adamyň razylygyny we PIN-ini talap edýär. Serediň: #link("https://tamga.network/tk/learn/revocation")[ýatyrylyş].

#chapter()
= Dizaýndan gelýän gizlinlik

- *Barlaýjy başyna nusga.* Her barlaýjy başga açara baglanan başga nusga alýar; barlaýjylar alanlaryny deňeşdirip adamy tanap bilmeýär. Bermek we gutarmak wagtlary sagada tegeleklenýär, şonuň üçin nusgalar wagt belligi bilen hem deňeşdirilip bilinmeýär.
- Adaty ýagdaýda *saýlap paýlaşmak*; sorag esasy maglumatsyz jogaplanyp bilinýän bolsa #raw("age_over_15") we #raw("age_over_18") ýaly hawa/ýok meýdanlary.
- *Şahsyýet barlagy aýrylandyr.* Şahsyýet barlag üpjün edijisi bilen diňe şahsyýet hyzmaty gürleşýär. Resminamany berenden soň surat saklamaýar; diňe açyk däl ýazgy (şahs salgysy we resminama belgisiniň heşi) saklaýar. Guramalar adamy üpjün ediji arkaly däl, şahsyýet resminamasy arkaly deňeşdirýär.
- *Žurnallarda we açyk salgylarda şahsy maglumat ýok.* Ýatyrylyş sanawynyň salgylary guramany aýan etmeýär; žurnallar näme bolandygyny ýazýar, kimiň başyna gelendigini asla ýazmaýar.
- *Web saýtlar* hasap açary hökmünde saýta degişli lakam alýar. Şahsyýet resminamasynyň belgisi hem, onuň heşi hem hiç haçan iberilmeýär; lakamlaryň alynýan tohumy gapjyga aýratyn resminama hökmünde gelýär we serwerde saklanmaýar.

#notebox[Açyk aýdylýan galyndy töwekgelçilik: gurama birnäçe barlaýjy bilen hyzmatdaşlyk etse, beren gollary arkaly adamy heniz tanap biler. Nol bilimli subutnama bilen hödürlemek bu boşlugy ýapýar; gapjyk tarapynda dükan wersiýasyndan soň gelýär (nol bilimli subutnama bölümine serediň).]

= Ýakyn aralyk: geçiş kartalary we ýaş barlagy

Turniketler we çäre gapylary üçin Tamga geçiş kartasyny ulanýar. Adam standart hödürleme bilen bir gezek hasaba durýar; soňra gapjyk 60 sekuntlyk gol çekilen belgini QR kody hökmünde görkezýär. Belgide şahsy maglumat ýok, gaýtadan ulanmak ret edilýär we bilet bir gezeklik bolup biler. 2026-njy ýylyň oktýabryndan bäri her gapy özüni barlag hyzmatyna operatoryň beren terminal açary bilen tanadýar; şeýlelikde QR kodunyň suratyny alan adam bileti eýesi gapyya ýetmezden sarp edip bilmeýär. Adamdan adama barlagda rollar tersine öwrülýär: gapjyk gysga ömürli haýyş salgysyny görkezýär, barlaýanyň programmasy standart OpenID4VP haýyşyny başladýar. Ikisi hem wersiýaly köprülerdir. Maksat Bluetooth we NFC arkaly ISO 18013-5; Bluetooth ýoly gapjykda kodlandy we enjam synaglaryna garaşýar.

#chapter()
= Sanawlardan kitaba

Kitap diňe birnäçe garaşsyz tarap ony dolandyranda bir zat goşýar. Şonuň üçin Tamga sanawlar bilen başlaýar we QBFT ylalaşykly rugsatly Hyperledger Besu toruny diňe azyndan iki garaşsyz validator operatory ýazmaça razylyk berende goşýar. Şol toruň kontraktlary ýazyldy, kompilirlendi we synagdan geçdi; sanaw çap ediji sanaw heşlerini ýerli ösüş zynjyryna eýýäm iberip bilýär. Karar boýunça zynjyr gol çekilen sanawlaryň proýeksiýasydyr: diňe her sanaw wersiýasynyň heşini (wersiýa, mazmun heşi, öňki heş, çap wagty) we labyr žurnalynyň soňky setiriniň heşini ýazga alýar. Mazmun, ýazgy, resminama ýa-da şahsy maglumat saklamaýar. Heş diňe çäk sanda garaşsyz ýazyjy şol bir bahany iberende tassyklanan hasaplanýar; ýazyjylar bir wersiýa barada ylalaşmasa, ilki geleniň bahasy gulplanmaýar, gapma-garşylyk ýazga geçýär. Zynjyryň jogaby barlag üçin hiç haçan zerur däl; gol çekilen sanaw bilen çaknyşanda sanaw güýjünde. Önümçilikde bu aýratynlyk ikinji garaşsyz operator peýda bolýança ýapyk galýar.

Kitapdaky dolandyryş ýörelgelere eýerýär. Validatorlar deň sesli döwletlerdir; täze agzalar üçden iki ses bilen goşulýar; her döwlet öz guramalaryny ýeke özi hasaba alýar ýa-da togtadýar we haýsy daşary ýurt guramalaryny ykrar etjekdigini özi kesgitleýär. Protokol täzelenmesi çäge ýetenden soň azyndan ýedi gün garaşýar; şeýlelikde razy bolmaýan döwlet güýje girmezden öň çekilip biler. Milli shema atlary öz at meýdanynda durýar, gurama diňe öz döwletiniň kök sertifikatyna baglanyp bilýär we kitapdaky ýagdaý sanawy hasaby her sanawy öz bit sany bilen kabul edýär. Geçişden öň sanawyň taryhy kontraktlara gaýtadan oýnalýar we ikisiniň şol bir jogaplary bermegi gerek. Komponentler ynamy ýeke-täk interfeýs arkaly okaýar; şonuň üçin resminamalar, gapjyklar we barlag hatary üýtgemeýär. Serediň: #link("https://tamga.network/tk/learn/what-is-blockchain")[blokçeýn näme, näme däl].

= Nol bilimli subutnama we gözleg ugurlary

*Nol bilimli subutnama bilen hödürlemek (karar berildi, bölekleýin guruldy).* Gapjyk gurama gol çeken we üýtgemeýän mdoc barada “18 ýaşdan uly” ýa-da “15 ýaşdan uly” ýaly sözlemi açyk çeşmeli Longfellow ZK ulgamy bilen subut edýär; ÝB-niň ýaş barlagy boýunça işi hem şu ulgama esaslanýar. Barlaýjy diňe sözlemiň dogrudygyny we resminamany haýsy guramanyň berendigini bilýär; iki hödürleme biri-birine baglanyp bilinmeýär. Diňe gözden geçirilen we belgisi gol çekilen ynam sanawynda çap edilen zynjyrlar kabul edilýär. Subutnama ýagdaý sanawynyň ornuny açmaýandygy üçin ýatyrylyş subutnamanyň içinde barlanyp bilinmeýär; şonuň üçin subutnama iň köp 24 sagat güýjünde gysga ömürli nusganyň üstünden düzülýär we resminama ýatyrylanda şahsyýet hyzmaty bu nusgany täzelemegi bes edýär. Barlaýjy tarapy işleýär. Ýerli subutnama düzüji Android üçin kompilirlendi we hakyky subutnamalar iş stoly düzüjisi bilen synagdan geçdi; telefonda subutnama düzmek dükan wersiýasyndan soň gelýär, subutnama mümkin bolmasa adaty hödürleme dowam edýär. Serediň: #link("https://tamga.network/tk/learn/zero-knowledge-proofs")[nol bilimli subutnama].

*Gözleg ugry: baha gatlagy.* Barlanan taraplaryň arasynda ygtyýarlandyrma; pul hereketi düzgünleşdirilen töleg ulgamlarynda galýar. Ilkinji wersiýanyň ýa-da pilotyň bölegi däl we islendik ulanylyşdan öň garaşsyz howpsuzlyk barlagyndan geçer.

#chapter()
= Ýagdaý we ýol kartasy

*Häzir işleýän (ilkinji wersiýa, hakyky kriptografiýa):* diplom we talyp resminamasyny bermek we hödürlemek; ýatyrylyş we guramanyň togtadylmagy; şahsyýet barlagy we iki ýaş meýdanyny göterýän, mdoc görnüşinde hem berilýän şahsyýet resminamasy; tanadylan gapylar bilen kampus we çäre geçiş kartalary, bir gezeklik biletler; saýta degişli lakam bilen web saýta hasaba durmak we passkey bilen giriş; barlaýjy tarapynda nol bilimli subutnama bilen ýaş barlagy; guramanyň gol açarynyň guramada galýan we hyzmatyň gol çekmek üçin guramaga diňe heş iberýän ýerleşdirilen resminama beriş hyzmaty (Cloud Signature Consortium API). Dokuz açyk çeşmeli paket npm-de 0.7.3 synag wersiýasynda we bu wersiýa öz-synagdan çykan barlaýjy düzedişlerini göterýär. Hakyky toruň Türkiýe sanawy işleýär we ýeke-täk işjeň resminama berijisi şahsyýet hyzmaty; ilkinji hakyky gurama, uniwersitet, taýýarlanýar.

#kvtable("Tapgyrlar", (("Sanaw tapgyry (häzir)", "gol çekilen ynam sanawlary we labyr žurnaly · Tamga wagtlaýyn operator · sandbox işleýär · paketler npm-de synag wersiýasy · OpenID öz-synagy edildi"), ("Pilot", "ilkinji resminama beriji gurama uniwersitet · guramanyň açary guramada galýar (uzakdan gol) · gapjyklar dükanlarda · hakyky telefonlarda Bluetooth we Digital Credentials API · sanawlar, kitap ýok"), ("Tabşyryş", "toruň dolandyryşy bir gaznaga geçýär; ädim ýazylan we synagdan geçirilen · belgiler üýtgemeýär"), ("0 tapgyr", "azyndan 2 garaşsyz validator operatory gol çekende rugsatly Besu/QBFT kitaby · kontraktlar ýazyldy we synagdan geçdi; zynjyr gol çekilen sanawlary şöhlelendirýär"), ("1 tapgyr", "agza döwletleriň sanawlary · okaýjy barlagly NFC arkaly ýakyn aralyk"),), mono: false)

Ilkinji wersiýanyň belli çäkleri aşakda ýazga alnan we pilotdan öň ýapylýar. Pilotyň üstünlik we togtatma ölçegleri öňünden kesgitlenen. Sanawa giren ilkinji gapjyk Tamga Wallet Android synag ýygnamasynda; dükan wersiýalary hem Bluetooth we Digital Credentials API enjam synaglary gapjyk tarapyndaky indiki ädimlerdir we toruň däl-de, gapjygyň işidir.

Hakyky tordan aýry synag tory, sandbox.tamga.network, 2026-njy ýylyň oktýabryndan bäri işleýär: öz synag köki we sanawlary, nusga guramalar, ýasama adamlar we her görnüşden nusga resminamalar, çalt synagyň ýanynda gündelik we aýlyk çäkli islege bagly hakyky şahsyýet barlagy, synag gurama hasaplary we öz terminal açarlary bolan synag gapysy. Hakyky tordaky hiç bir gapjyk ýa-da barlaýjy oňa ynanmaýar. Gapjyk, gurama we barlaýjy işläp düzüjileriniň hemmesi şol ýerde synaýar; gapjyk işläp düzüjisi öz gapjyk üpjün edijisini sandbox sanawyna hasaba aldyrýar we gapjygyny nusga guramalar, şahsyýet hyzmaty we barlaýjy bilen synaýar. OpenID öz-synagy hem şol ýerde geçirildi; synag guralynyň sertifikatlary diňe sandbox sanawlaryna goşuldy. Serediň: #link("https://docs.tamga.network/guides/sandbox")[sandbox gollanmasy].

= Belli çäkler

- Bu tapgyrda ynam labyry bir operatoryň goluna daýanýar. Açyk labyr žurnaly, açyklyk hasabaty we barlaglar hyýanatçylygyň öňüni alýar; ony mümkin däl edip bilmeýär. Bu çägi diňe ikinji garaşsyz sanaw ýazyjysy, soňra-da kitap aýyrýar.
- Ýagdaý serweri işleýän wagty ýatyrylyş birnäçe minutda güýje girýär (2 minutlyk çap aralygy bilen barlaýjynyň öňünden alyş aralygy).
- Nol bilimli subutnama bilen hödürlenen resminamanyň ýatyrylyşy subutnamanyň içinde barlanyp bilinmeýär. Gysga ömürli nusga bu boşlugy 24 sagat bilen çäklendirýär, aradan aýyrmaýar.
- Nol bilimli subutnama bilen hödürlemek gapjyga gelýänçä gurama tarapyndan tanalmak töwekgelçiligi galýar.
- Şahsyýet hyzmaty nazary taýdan adamyň belli bir saýtdaky lakamyny hasaplap biler. Açar goragy, aýratyn konfigurirlenen tohum we barlag muny çäklendirýär; nol bilimli subutnama ony geljekde aýyrar.
- Gapjyk programma dükanlarynda çykýança telefonyň “howpsuz enjamdadyryn” diýen beýany kabul edilmeýär. Gapjygyň dükan wersiýasy bilen App Attest we Play Integrity hökmany bolýar.
- OpenID laýyklyk geçirilişi sandbox-da, her meýilnamanyň ýeke-täk görnüşi bilen edilen öz-synagdy. Sertifikat aýratyn prosesdir; gapjyk meýilnamalary enjam ýygnamasyny talap edýändigi üçin geçirilmedi.
- Ýerleşdirilen resminama beriş hyzmatynyň uzakdan gol ýoly ýazyldy we synagdan geçdi, ýöne hakyky torda heniz hiç bir gurama ulanmaýar; hakyky tor faýlda saklanýan gurama açaryny ret edýär.

= Düzgünler, açyk çeşme we giňişleýin okamak

Toruň düzgünleri Tamga ARF 1.0 görnüşinde çap edilýär: esasy resminama, Trust Framework, Tamga Rulebook we ondan her resminama görnüşi üçin şahalanýan rulebook-lar (Education, Identity we Event Ticket) #link("https://arf.tamga.network")[arf.tamga.network] salgysynda (iňlis we türk dillerinde). Şeýle hem serediň: #link("https://tamga.network/tk/learn/rules-and-rulebooks")[düzgünler we rulebook-lar].

Kod Apache-2.0, resminamalar CC BY 4.0 ygtyýarnamaly. #raw("@tamga-network/*") paketleri ynam sanawlaryny, resminama görnüşlerini, bermegi, barlagy, nol bilimli subutnamany we gapjyk ýadrosyny öz içine alýar. Integrasiýa gollanmalary we spesifikasiýalar #link("https://docs.tamga.network")[işläp düzüjiler üçin resminamalarda] (iňlis we türk dillerinde); bu resminamada agzalan her karar şol ýerde ADR hökmünde çap edilen. Düşünjeler #link("https://tamga.network/tk/learn")[Öwren] bölüminde başdan düşündirilýär; #link("https://docs.tamga.network/glossary")[sözlük] çalt salgylanma, #link("https://tamga.network/tk/manifesto")[manifest] bolsa “näme üçin” soragynyň jogaby.

#notebox[Bu ýaşaýan resminamadyr. Yglan edilýänçä 1.0 wersiýada galýar we kararlar kämilleşdigiçe ýerinde täzelenýär; bu neşir 2026-njy ýylyň 27-nji oktýabry bilen senelenen, ilkinji neşir 2026-njy ýylyň 3-nji oktýabrynda çap edildi. Hemişelik galýan ynam modelidir.]

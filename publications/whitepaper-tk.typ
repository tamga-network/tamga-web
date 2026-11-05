// WP-TK — Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tk")
#let sekil = sekil.with(dil: "tk")

#show: conf.with(
  lang: "tk",
  dizi: "Tamga Network Whitepaper",
  baslik: "Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy",
  altbaslik: "Giňeldilen neşir: nähili işleýär, näme üçin şeýle saýlandy, nirä barýar",
  yazar: "Tamga Network",
  kurum: "Tamga Network",
  tarih: "Noýabr 2026",
  surum: "1.0",
  lisans: "© 2026 Tamga Network. Bu iş Creative Commons Attribution 4.0 International (CC BY 4.0) ygtyýarnamasy bilen neşir edildi: çeşmesi görkezilip paýlaşylyp we uýgunlaşdyrylyp bilner. https://creativecommons.org/licenses/by/4.0/",
  anahtar: ("sanly ynam infrastrukturasy", "ynam sanawlary", "eIDAS 2.0", "EUDI ARF", "SD-JWT VC", "mdoc", "OpenID4VCI", "OpenID4VP", "saýlap açmak", "baglanyşyksyzlyk", "özygtyýarlylyk", "türki dünýäsi",),
  atif: "Tamga Network (2026). Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy. Whitepaper, wersiýa 1.0. https://tamga.network/whitepaper-tk.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Tamga Network Türkiýe we türki dünýäsi üçin taslanan, Ýewropa Bileleşiginiň sanly şahsyýet tertibi bilen şol bir tehniki dilde gürleşýän ynam torudyr. Torda resminamany gurama berýär, adam ony telefonyndaky gapjykda göterýär we kime görkezjekdigini özi kesgitleýär, barlaýjy bolsa resminamany beren guramadan soramazdan birnäçe sekuntda barlaýar. Resminamalar ÝB-niň saýlan açyk standartlary bilen kodlanýar (SD-JWT VC we ISO\/IEC 18013-5 mdoc); bermek we hödürlemek OpenID4VCI we OpenID4VP profilleri bilen amala aşyrylýar; her resminama enjamyň howpsuz enjam bölegindäki açara baglanýar we adam diňe soralan meýdanlary görkezýär. Ynamyň çeşmesi häzir islendik adamyň göçürip alyp barlap bilýän gol çekilen ynam sanawlary we sagatma-sagat öňe gidýän labyr žurnalydyr. Umumy kitabyň kody ýazyldy we synagdan geçirildi; ýöne ol önümçilikde ýok we ýapyk, azyndan iki garaşsyz operator bolmasa-da açylmaz. Umumy ýazgylaryň hiç birinde şahsy maglumat ýok.

Resminama bu gurluşyň nähili işleýändigini, her möhüm saýlawyň näme üçin edilendigini we toruň nirä barýandygyny ýigrimi dört bölümde gürrüň berýär. Ynam sanawlary, gurama sertifikatlary, resminama görnüşleri, bermek we hödürlemek akymlary, barlag hatary, ýatyrylyş, gapjyk düzgünleri, wagtlaýyn şahsyýet hyzmaty, gizlinlik inženerçiligi we howp modeli bir-birden açylýar; her saýlaw ony berkidýän karar ýazgysy we seredilen alternatiwalary bilen bilelikde berilýär. Özygtyýarlylyk dizaýnyň ilkibaşdan goýan şertidir. Her döwlet öz ýazgysynyň ýeke-täk ýazyjysydyr we häzir döwletiň adyndan wagtlaýyn ýerine ýetirilýän her rol hiç bir resminamany, guramanyň şahsyýetini ýa-da resminama görnüşini üýtgetmezden tabşyrylyp bilinjek görnüşde guruldy. Häzir sanawlarda diňe Türkiýäniň orny işjeň; beýleki döwletler üçin diňe orun goýuldy.

Tekst her tassyklamanyň ýagdaýyny aç-açan aýdýar: işleýän, karary kabul edilen, ýöne heniz işe girizilmedik we gözleg tapgyryndaky funksiýalar aýrylýar, ýol kartasy senenama bilen däl-de, şertler bilen berilýär. Soňky bölümler kararlaryň hemmesini, yglan edilen galyndy töwekgelçilikleri we açyk soraglary bir ýerde hödürleýär. Resminama hukuk pikiri ýa-da sertifikat tassyklamasy däldir we hiç bir döwlet ýa-da gurama bilen baglaşylan ylalaşygyň habarnamasy däldir.
  ],
)

#heading(level: 1, numbering: none)[Okamak üçin gollanma]

Bu resminama Tamga Network-i başdan-aýak düşündirýär: onuň nähili işleýändigini, her möhüm saýlawyň näme üçin edilendigini we toruň nirä barýandygyny. Her kime her bölümi okamak hökman däl. Döwlet dolandyryjysynyň gözleýän zady bilen gapjyk işläp düzüjisiniň gözleýän zady başga-başga; Tablisa 1 her okyjy topary üçin gysga ýol teklip edýär. Teklip edilen ýol çäk däldir. Bölümler biri-birine bölüm belgisi bilen salgylanýar, okyjy bir düşünjäni ilkinji gezek gören ýerinden yza ýa-da öňe geçip biler.

#kutu("onemli", [Bu resminama näme däl])[
Bu resminama hukuk pikiri däldir; KVKK \[9\], eIDAS ýa-da başga bir kanunçylyk barada aýdylan sözlemler hukukçynyň bahasynyň ornuny tutmaýar. Sertifikat tassyklamasyny hem götermeýär; Tamga-nyň laýyklyk synaglary öz-synagdyr we hiç bir guramanyň makullamagyny aňlatmaýar. Hiç bir döwlet ýa-da gurama bilen baglaşylan ylalaşygyň ýa-da dowam edýän gepleşigiň habarnamasy däldir; tekstde ady agzalýan döwletler üçin sanawlarda diňe orun goýuldy. Resminama ýaşaýan tekstdir we 1.0 wersiýanyň içinde ýerinde täzelenýär. Çeşme resminamalar bilen gapma-garşy gelse, çeşme güýjünde: ilki karar ýazgylary, soňra spesifikasiýalar, soňra çarçuwa resminamalary.
]

#tablo([#{strong[Tablisa 1.]} Okyjy toparlary boýunça teklip edilýän okaýyş ýollary.], (29fr, 48fr, 20fr), ([Okyjy], [Näme gözleýär], [Teklip edilýän bölümler],), (
  ([Döwlet dolandyryjysy, düzgünleşdiriji, döwlet wekili], [özygtyýarlylyk, tabşyryş, ÝB bilen gatnaşyk, hukuk çägi], [1–4, 18, 20, 22–23],),
  ([Gurama (uniwersitet, hünär guramasy, bilet satyjy)], [nähili goşulýaryn, goşulmagyň peýdasy näme, gol açary kimde galýar], [1–2, 5, 7–9, 12, 17],),
  ([Barlaýjy, web saýt], [nähili barlaýaryn, näme görýärin, borjum näme], [5, 10–11, 15],),
  ([Gapjyk işläp düzüjisi], [sanawa nähili girýärin, haýsy subutnamalar talap edilýär, düzgünler näme], [5, 13, 17, 20],),
  ([Alym, gözlegçi, howpsuzlyk hünärmeni], [modeliň esaslandyrmasy, howplar, galyndy töwekgelçilikler], [3, 6, 11, 15–16, 19, 21, 23],),
  ([Žurnalist, giň okyjy], [näme çözülýär, näme üçin möhüm], [Gysgaça mazmuny, 1–2, 4, 15, 24],),
))

Resminamadaky her tassyklama üç ýagdaýyň birine degişli we tekst muny hemme ýerde aç-açan aýdýar. Bir funksiýanyň adynyň ýanynda galyň ýazylan ýagdaý belligini görseňiz, ony Tablisa 2-däki manysy bilen okaň. Ähli funksiýalaryň ýagdaýy 22-nji bölümde ýeke-täk tablisada jemlenýär.

#tablo([#{strong[Tablisa 2.]} Ýagdaý bellikleri.], (19fr, 41fr, 46fr), ([Bellik​​​​​​​​​], [Manysy], [Mysal],), (
  ([#{strong[Işleýär]}], [Hakyky torda ýa-da sandbox-da işjeň we çeşme bilen görkezilip bilner], [gol çekilen ynam sanawlary, Tamga Verify, sandbox],),
  ([#{strong[Meýilleşdirilen]}], [Karara esaslanýar, kody ýa-da dizaýny bar, ýöne işjeň däl], [Bluetooth arkaly ýakyn aralykda hödürlemek, hakyky torda XML ynam sanawy],),
  ([#{strong[Gözleg]}], [Karar ýok ýa-da karar togtadyldy], [nol bilimli subutnama bilen lakam çykarmak, baha gatlagy],),
))

Kararlar karar ýazgylary (ADR, #{emph[Architecture Decision Record]}), tehniki düzgünler spesifikasiýalar (SPEC), çarçuwa düzgünleri bolsa Tamga Arhitektura we Salgylanma Çarçuwasynyň resminamalary (FW) bilen agzalýar. Tekstde "ADR-0042" görýän ýeriňizde kararyň doly teksti #{raw("docs.tamga.network/tr/adr/")} salgysynda, "SPEC-TRUST-0001 §5" görýän ýeriňizde spesifikasiýanyň degişli bölümi #{raw("docs.tamga.network/tr/specifications/")} salgysynda, "FW-ARF-0001 §6.1" görýän ýeriňizde çarçuwa resminamasy #{raw("arf.tamga.network/tr/")} salgysynda ýerleşýär. Belgileriň salgylara gabat gelşi E goşmaçada berilýär \[63, 64, 65\]. Belgiler hemişelikdir: resminamanyň ady ýa-da ýeri üýtgese-de, belgisi şol bir galýar.

Bu neşir taýýarlanan wagty Tamga-nyň açyk paketleri npm-de 0.8.2 synag wersiýasy bilen çap edildi; çarçuwa resminamalary 1.0 wersiýada. Wersiýa bagly her sözlem şu sene boýunça ýazyldy.

= Giriş: Nusgadan Subutnama

== Bir arza sahnasy

Bu tapgyryň ilkinji makalasynda \[67\] Bakuwda bakalawriaty tamamlap, Stambulda magistratura okamak isleýän Aýnur bilen tanyşypdyk. Aýnur indi uçurym boldy we Stambuldaky bir kompaniýanyň bildirişine arza berýär. Bildiriş düşnükli: dalaşgärden diplom, bahalaryň sanawy we şahsyýet resminamasy talap edilýär. Kompaniýanyň işe almak boýunça jogapkäri Timur arzalaryň arasynda Aýnuryň terjimehalyny halaýar we ony söhbetdeşlige çagyrýar.

Söhbetdeşlikden öň resminamalar gelýär. Aýnur diplomynyň skanirlenen nusgasyny e-poçta bilen iberýär; Timur azerbaýjan dilindäki teksti okap bilmeýändigi üçin notarial taýdan tassyklanan terjime soraýar. Aýnur terjime býurosyny tapýar, notariusa nobata ýazylýar, birnäçe gün we birneme pul sarp edýär. Ahyrynda Timuryň elinde iki kagyz bar: diplomyň nusgasy we şol nusganyň terjimesi. Ýöne Timuryň esasy soragy henizem jogapsyz. Bu diplom hakykymy?

Timur muny anyklamak üçin Bakuwdaky uniwersitetiň talyplar bölümine e-poçta ýazýar. E-poçta biraz wagt garaşýar; belki dogry adama ýetýär, belki ýetmeýär. Jogap gelse, hepdelerden soň gelýär, gelmese Timur ýa nusga ynanmak, ýa-da dalaşgäri ýitirmek arasynda saýlaw edýär. Şol aralykda Aýnuryň diplomy, şahsyýet kartynyň göçürmesi we bahalaryň sanawy kompaniýanyň işe alyş bukjasynda, e-poçta serwerinde we belki dalaşgärleri yzarlaýyş ulgamynda saklanýar. Aýnur bu nusgalaryň nirede, näçe wagtlap we kimiň elýeterliligi bilen saklanýandygyny hiç haçan bilmez.

Bu sahnada hiç kim erbet niýetli däl. Aýnur dogruçyl, Timur üns berýän, uniwersitet kömekçil. Mesele resminamalaryň göterilýän ýolunda. Kagyz dünýäsinden miras alan tertibimiz üç zady bir wagtda erbet edýär. Nusga asylnusganyň hakykydygyny subut etmeýär; sebäbi faýly üýtgetmek möhüri galplaşdyrmakdan has aňsat. Barlag çeşmäniň jogap bermegine bagly; çeşme haýal bolsa, başga dilde gürleýän bolsa ýa-da asla jogap bermese, barlag hem togtaýar. Her arza bolsa adamyň maglumatlaryndan ýene bir nusga döredýär: Timura diplomdaky diňe birnäçe maglumat gerek bolsa-da, ol resminamanyň hemmesini, üstesine-de şahsyýet karty bilen bilelikde alýar.

== Tamga-nyň gysga jogaby

Şol bir arza Tamga Network-iň taslan ýoly bilen hem yzarlalyň (Surat 1).

Aýnuryň uniwersiteti diplomy #{strong[sanly gol çekilen resminama]} hökmünde berýär we bu resminama Aýnuryň telefonyndaky #{strong[gapjyga]}, ýagny resminamalary saklaýan we görkezýän programma, ýerleşýär. Bu resminama adaty faýldan tapawutlanýar; onuň içi uniwersitetiň açary bilen gol çekilen we Aýnuryň telefonynyň howpsuz enjam böleginde döredilen açara baglanan. Bu baglanyşyk resminamanyň başga telefona göçürilip, şol ýerde ulanylmagynyň öňüni alýar (8-nji bölüm).

Timuryň kompaniýasy Aýnurdan resminama soranda, kompaniýanyň saýty #{strong[haýyş]} döredýär. Haýyş gol çekilendir we kompaniýanyň kimdigini, hasaba alnan maksadyny we haýsy meýdanlary soraýandygyny göterýär: aýdaly, "diplomyň derejesi, hünäri we uçurym bolan ýyly". Aýnuryň gapjygy ilki kompaniýanyň hakykatdanam hasaba alnan barlaýjydygyny ýa-da däldigini barlaýar, soňra haýyşy Aýnura görkezýär: kim soraýar, näme üçin soraýar, haýsy meýdanlary soraýar. Aýnur PIN-i ýa-da barmak yzy bilen tassyklaýar. Telefonyndan diňe şu üç meýdan çykýar; ortaça bahasy, doglan senesi ýa-da şahsyýet belgisi çykmaýar.

Timuryň barlag programmasy birnäçe sekuntda dört soraga jogap gözleýär. Resminama hakykatdanam gol çekildimi we goldan soň hiç zat üýtgemedimi? Gol çeken hakykatdanam uniwersitetmi we diplom bermäge ygtyýarlymy; resminama berlen güni ygtyýarlymydy? Uniwersitet bu resminamany soňra ýatyrdymy? Resminamany görkezýän telefon resminamanyň baglanan telefonymy? Bu soraglaryň hiç biri üçin uniwersitete jaň etmek gerek däl. Ikinji soragyň jogaby islendik adamyň göçürip alyp barlap bilýän #{strong[gol çekilen ynam sanawynda]}, üçünjisiniň jogaby uniwersitetiň öňünden çap eden #{strong[ýatyrylyş sanawynda]} durýar (6-njy we 12-nji bölümler). Uniwersitet hem Aýnuryň diplomyny kime we haçan görkezendigini bilmeýär.

#kutu("teknik", [Şol bir sahnanyň protokol dilindäki gysgaça beýany])[
Aşakdaky tablisa sahnadaky habarlary yzygiderlikde görkezýär. Jikme-jiklikleri 10-njy bölüm (hödürlemek) we 11-nji bölüm (barlag hatary) düşündirýär; bu ýerde diňe karkasy berýäris.

#adimlar((
  ("Timur → Aýnur", [#{strong[Haýyş.]} Kompaniýanyň barlaýjysy gol çekilen OpenID4VP haýyşyny döredýär; haýyş QR kody ýa-da salgy hökmünde Aýnura ýetýär.], $"müşderi belgisi" = "x509_hash"$),
  ("Aýnuryň gapjygy", [#{strong[Barlag we tassyklama.]} Gapjyk barlaýjynyň ynam sanawyndaky ýazgysyny we hasaba alyş sertifikatyny barlaýar, soralan meýdanlary görkezýär, razylyk alýar.], $"hasaba alyş sertifikaty ýok" => "ret"$),
  ("Aýnur → Timur", [#{strong[Jogap.]} Gapjyk diňe tassyklanan meýdanlary we şu haýyşa baglanan enjam goluny şifrlenen görnüşde iberýär.], $"vp_token" = "SD-JWT VC" + "açylan meýdanlar" + "enjam goly"$),
  ("Timuryň barlaýjysy", [#{strong[Barlag hatary.]} Gol, resminama görnüşi, ynam sanawy, ýatyrylyş ýagdaýy we syýasat yzygiderlikde barlanýar.], $"netije" in {"kabul", "ret", "barlap bolmady"}$),
))

Tablisadaky adalgalaryň her biri ilkinji gezek agzalan bölümlerinde açylýar: OpenID4VP \[31\] 3.4 we 10-njy bölümlerde, hasaba alyş sertifikaty 7.5-nji bölümde, SD-JWT VC \[16\] 8-nji bölümde, üç bahaly netije 11-nji bölümde.
]

Bu sahnanyň dizaýny beýan edýändigini aç-açan aýtmak gerek. Tamga Network-iň gurluşynda her ýurduň öz ynam sanawy üçin orun bar, ýöne häzir diňe Türkiýäniň sanawy işjeň. Azerbaýjan üçin sanawlarda orun goýuldy; bu ylalaşygyň ýa-da gepleşigiň habarnamasy däldir, diňe döwlet goşulanda öz sanawyny çap edip biljek boş ornudyr. Aýnuryň Bakuwdaky uniwersitetiniň şu ýol bilen resminama berip bilmegi üçin şol ornuň dolmagy gerek (6.2-nji bölüm). Türkiýäniň sanawynda hem bu neşir taýýarlanan wagty ýeke-täk işjeň resminama beriji toruň wagtlaýyn şahsyýet hyzmatydyr (14-nji bölüm); gurama resminamalary ilkinji guramalar goşuldygyça şol bir ýol bilen berler. Akymyň hemmesini häzir sandbox-da, ýagny hakyky tordan doly aýry synag torunda, nusga guramalar bilen synap bolýar (17-nji bölüm). Haýsy funksiýanyň häzir işleýändigi 22-nji bölümde bir-birden görkezilýär.

#sekil(1, [Köne ýol we täze ýol: nusgalar zynjyry we çeşmeden soramazdan barlag], "figures/wp-tk/sekil-1.svg", yarim: false)

== Bu resminamanyň goşandy we meýilnamasy

Tamga Network-i öň gysga whitepaper bilen \[62\] beýan edipdik; bu giňeldilen neşir onuň ornuny tutýar. Manifest we işläp düzüjiler üçin resminamalar onuň ýanynda durýar. Bu neşir üç soraga bilelikde we jikme-jik jogap bermek üçin ýazyldy.

Birinji sorag #{strong[nähili işleýändigi]}. Resminamanyň berilmeginden barlagyna, ýatyrylyşyndan gapjykdaky ömrüne çenli her ädimi hiç hili deslapky bilim çaklamazdan düşündirýäris. Tehniki jikme-jiklikleri taşlamaýarys, ýöne olary aýratyn gutulara salýarys; gutulary geçýän okyjy hem teksti yzarlap biler. Ikinji sorag #{strong[näme üçin şeýle saýlanandygy]}. Toruň her möhüm karary karar ýazgysyna esaslanýar we bu ýazgylar nämäniň saýlanandygy bilen bilelikde haýsy wariantlaryň näme üçin taşlanandygyny hem ýazýar. Resminamanyň dowamynda bir saýlawy düşündirenimizde onuň karar ýazgysyny we alternatiwalaryny bilelikde berýäris. Üçünji sorag #{strong[nirä barýandygy]}. Häzir nämäniň işleýändigini, nämäniň karar edilip, heniz işjeň däldigini we nämäniň henizem gözlegdigini aýyrýarys; senenamanyň ýerine şert berýäris.

Resminama alty bölekden ybarat. #{strong[Bölek I]} (1–4-nji bölümler) meseläni, Ýewropa Bileleşiginiň bu meselä beren jogabyny we Tamga-nyň dizaýn ýörelgelerini beýan edýär. #{strong[Bölek II]} (5–8-nji bölümler) ynamyň gurluşyny gurýar: rollar, ynam sanawlary, gurama sertifikatlary we resminama görnüşleri. #{strong[Bölek III]} (9–12-nji bölümler) akymlary yzarlaýar: resminama bermek, hödürlemek, barlag we ýatyrylyş. #{strong[Bölek IV]} (13–16-njy bölümler) adamyň tarapyna geçýär: gapjyk düzgünleri, wagtlaýyn şahsyýet hyzmaty, gizlinlik inženerçiligi we howpsuzlyk modeli. #{strong[Bölek V]} (17–20-nji bölümler) ekoulgamy we dolandyryşy beýan edýär: sandbox we açyk paketler, özygtyýarlylyk we tabşyryş, umumy kitabyň näme üçin häzir ýokdugy we ÝB bilen gatnaşyk. #{strong[Bölek VI]} (21–24-nji bölümler) kararlary bir ýerde hödürleýär, ýol kartasyny we açyk soraglary berýär. Goşmaçalar sözlügi, kararlaryň görkezijisini, standartlaryň görkezijisini we resminamalar toplumynyň görkezijisini öz içine alýar.

Bu resminamany çap edýän toruň özi makalalar tapgyryny hem çap edýär. Saýlap açmak, baglanyşyksyzlyk, ynam sanawlary ýa-da ýatyrylyş ýaly düşünjäni bütin çuňlugy bilen bilmek isleýän okyja tekstiň içinde tapgyryň degişli makalasyny görkezýäris; bu ýerde düşünjäni diňe Tamga-ny düşünmek üçin ýeterlik derejede açýarys.

== At: tamga

Merkezi Aziýanyň türki taýpalary sürülerine, emläklerine we gaýalara #{emph[tamga]} diýlip atlandyrylýan nyşanlary basardylar. Atyň sagrysyndaky tamga eýesini tanamaýan adama-da atyň haýsy taýpa degişlidigini aýdýardy. Tapgyryň ilkinji makalasy bu nyşanyň göterýän pikirini jikme-jik düşündirýär: jemgyýetde hemmäniň tanaýan nyşany saňa tanamaýan adamyň barada ygtybarly maglumat berýär.

Barlanyp bilinýän sanly resminama bu pikiriň häzirki zaman görnüşidir, ýöne ondan iki nokatda tapawutlanýar. Birinjiden, gadymy tamgany galplaşdyryp bolýardy; sanly goly bolsa gol çekijiniň gizlin açary bolmazdan döredip bolmaýar. Ikinjiden, tamgany tanamak üçin ony öňünden bilmek gerekdi; sanly dünýäde haýsy nyşanyň kime degişlidigini aýdýan gol çekilen sanaw bar we bu sanaw hemmä açyk. Toruň ady bu iki pikiri birleşdirýär: hemmäniň tanap bilýän möhüri we şol möhrüň kime degişlidigini aýdýan, hemmäniň barlap bilýän ýazgysy.

= Mesele Meýdany we Talaplar

== Nusga ykdysadyýetiniň bahasy

Aýnuryň arzasyndaky mesele ýeke adamyň betbagtlygy däl; resminamalaryň nusga hökmünde aýlanýan tertibiniň adaty netijesidir. Bu tertibiň bahasyny hiç kim ýeke hasap-fakturada görmeýär, ýöne her kim onuň bir bölegini tölýär. Bu bölümde bahany kimiň näme töleýändigi arkaly düşündirýäris we san bermeýäris; sebäbi ygtybarly we deňeşdirip bolýan san bermek bu resminamanyň çäginden çykýar we çeşmesiz statistika ýazmazlygy ýörelge edinýäris.

Ilkinji baha #{strong[galplykdyr]}. Diplomyň skanirlenen nusgasyny surat redaktirleýän programma bilen birnäçe minutda üýtgedip bolýar. Nusgany alan tarap asylnusgany görmeýänçä muny duýup bilmeýär. Galplyk näçe aňsat bolsa, dogruçyl arza berijä bolan ynam hem şonça azalýar: Timur Aýnuryň diplomynyň hakykydygyna ynansa-da, muny subut edip bilmeýär.

Ikinji baha #{strong[gaýtalanýan barlagdyr]}. Aýnuryň diplomy iş berijide, bankda, magistratura maksatnamasynda we talyp haky arzasynda aýry-aýrylykda barlanýar. Her gurama şol bir soragy noldan berýär we şol bir näbellilik bilen ýaşaýar. Barlagyň bir gezek edilip, hemmäniň ondan peýdalanyp biljek infrastrukturasy ýok.

Üçünji baha #{strong[maglumatyň eýesinden aýrylmagydyr]}. Her arza adamyň maglumatlaryndan bir nusgany adamyň görüp bilmeýän serwerinde galdyrýar. Adam bu nusganyň haçan pozuljakdygyny, kimleriň görjekdigini ýa-da maglumat syzdyrylanda nirä gitjekdigini bilmeýär. Resminamany subut etmek üçin adam resminamanyň hemmesini berýär, garşy tarapa bolsa köplenç diňe bir-iki maglumat gerek.

Dördünji baha #{strong[çeşmäniň üstündäki ýükdür]}. Uniwersitetleriň talyplar bölümleri uçurymlarynyň resminamalary barada gelýän e-poçtalara, jaňlara we resmi hatlara jogap berýär. Bu iş näçe köp bolsa, çeşmäniň jogaby şonça gijikýär; jogap näçe gijikse, nusga ynanmak basyşy şonça artýar.

== Serhetde duran ynam

Bu bahalar serhetden geçilende köpelýär. Türki dünýäsi umumy dil maşgalasyny, medeniýeti we uzak taryhy paýlaşýar; talyplar, işgärler we maşgalalar bu ýurtlaryň arasynda barha köp hereket edýär. Ýöne bir ýurduň guramasyna beýleki ýurtda ynanmagyň häzir gysga ýoly ýok. Bakuwdaky uniwersitetiň hakykatdanam uniwersitetdigini Stambuldaky iş beriji nireden bilsin? Gazagystanda berlen hünär resminamasynyň henizem güýjündedigini ýa-da däldigini Daşkentdäki hassahana nädip bilsin?

Häzir bu soraglaryň jogaby köplenç kagyz we araçylar arkaly berilýär: terjimeler, notarial tassyklamalar, tassyklama zynjyrlary, guramadan gurama hat alyşmalar. Her araçy gijikme we çykdajy goşýar, ýöne olaryň hiç biri esasy soraga, ýagny "bu resminama gol çeken hakykatdanam ygtyýarly guramamy?" diýen soraga matematiki jogap bermeýär. Tamga-nyň Trust Framework-i öz garaýşyny şu boşluga görä ýazýar: Türki Döwletleriň Guramasynyň agza we synçy döwletleriniň, olaryň guramalarynyň we raýatlarynyň biri-biriniň resminamalaryny çeşmeden soramazdan barlap bilýän umumy ynam infrastrukturasy (FW-TF-0001 §1.1). Bu sözlem maksatdyr; häzir hiç bir döwlet tora goşulmady we bu resminama hiç bir döwlet bilen ylalaşyk ýa-da gepleşik barada habar bermeýär. Mesele meýdanyny beýan edenimizde ýurt atlaryny meseläniň gündelik ýüzüni aýdyňlaşdyrmak üçin ulanýarys.

== Gizlinligiň ikinji meselesi

Nusgany gol çekilen sanly resminama bilen çalyşmak birinji meseläni çözýär, ýöne üns bilen taslanmasa, täze mesele döredýär. Sanly barlag kagyzyň hiç haçan edip bilmedik görnüşinde #{strong[yz galdyryp biler]}. Bu yzlaryň dört görnüşi bar we olaryň her biri aýratyn dizaýn çäresini talap edýär.

Birinjiden, barlaýjy her barlagda resminama berijiden sorasa, beriji gurama adamyň resminamasyny nirede we haçan ulanandygyny bilýär. Bu sanly şahsyýet edebiýatynda "öýe jaň etmek" diýlip atlandyrylýan meseledir. Ikinjiden, barlaýjy zerur bolanyndan köpüsini sorap biler: ýaşyňyzy barlamak isleýän saýt doglan senäňizi, adyňyzy we salgyňyzy bilelikde alyp biler. Üçünjiden, dürli barlaýjylar alan maglumatlaryny birleşdirse, adam biri-birinden habarsyz hasaplanýan baryşlarynda şol bir adam hökmünde deňeşdirilip bilner; şol bir resminama her gezek şol bir gol we şol bir belgi bilen görkezilýän bolsa, bu deňeşdirme aňsatlaşýar. Dördünjiden, umumy ýazgylar (sanawlar, žurnallar, mümkin bolan kitap) şahsy maglumat ýa-da resminama heşini göterse, bu ýazgylar hemmäniň okap bilýän gözegçilik guralyna öwrülýär.

Bu dört yz tapgyryň saýlap açmak we baglanyşyksyzlyk baradaky makalalarynyň \[68, 70\] temasydyr. Tamga-nyň esasy çarçuwa resminamasy olara garşy ýedi çäräni sanaýar (FW-ARF-0001 §7.2): umumy ýazgylarda şahsy maglumatyň bolmazlygy, her barlaýja aýratyn nusga we saýt başyna lakam, nol bilimli subutnama, kesgitli aralyk bilen çap edilýän ýatyrylyş sanawlary, her hödürlemede razylyk we artyk talap duýduryşy, şahsyýet barlagynda suratlaryň saklanmazlygy we ulanyş statistikasynyň diňe azyndan ellişer adamlyk toparlar görnüşinde çap edilmegi. Bular 15-nji bölümde bir-birden düşündirilýär. Bu ýerde diňe şuny nygtaýarys: gizlinlik soňundan goşulýan aýratynlyk bolup bilmez. Haýsy maglumatyň haýsy ýazga girjekdigi arhitekturanyň ilkinji günden kabul edýän kararydyr.

== Özygtyýarlylyk soragy

Dünýä göçürip bolýan sanly resminamalara geçende ýurduň öňünde takmynan iki ýol bar. Birinjisi bu özgerişi daşardan almak: başga ýurduň ýa-da kompaniýanyň infrastrukturasyny, düzgünlerini we açarlaryny ulanmak. Ikinjisi şol bir açyk standartlaryň üstünde öz infrastrukturasyny gurmak we açarlaryny öz elinde saklamak. Tamga ikinji ýoly saýlaýar we muny manifestinde "şol bir standartlar, öz torumyz" diýip jemleýär.

Ýöne "öz torumyz" diýmek ýeke-täk häkimiýet islemegi aňlatmaýar. Birnäçe döwletiň goşuljak torunda esasy sorag kimiň näme barada karar berjekdigidir. Tamga-nyň dolandyryş karary bu soragy ýönekeý mysal bilen berýär: döwlet öz uniwersitetini resminama beriji hökmünde hasaba alanda näme üçin başga döwletiň sesine garaşmaly? (ADR-0002). Garaşmaly däl. Ýewropa Bileleşiginde hem her agza döwlet öz ynam sanawyny garaşsyz çap edýär we hiç bir döwlet başgasynyň haýsy guramany sanawa aljakdygyna ses bermeýär. Tamga bu öňki tejribä eýerýär: her döwlet öz ýazgysynyň ýeke-täk ýazyjysydyr, serhetaşa ykrar her döwletiň öz karary we döwletiň tordan çykmagy onuň raýatlarynyň resminamalaryny güýjünden düşürmeýär. Bu ýörelgeleriň jikme-jiklikleri 18-nji bölümde.

Özygtyýarlylyk soragynyň häzirki güne seredýän ýüzi hem bar. Häzir hiç bir döwlet tora goşulmandygy sebäpli döwlete degişli rollary (ynam sanawyny işletmek, guramalary hasaba almak, kök sertifikaty saklamak) toruň wagtlaýyn operatory döwletiň adyndan ýerine ýetirýär. Bu ýagdaý özygtyýarlylyk ýörelgesine ters ýaly görünip biler; şonuň üçin her wagtlaýyn roluň nähili tabşyryljakdygy ilkibaşdan ýazylýar we tabşyryşda hiç bir resminamanyň, ýazgynyň ýa-da belginiň üýtgemezligi dizaýnyň şerti bolýar (4.1-nji bölüm, P4 ýörelgesi).

== Talaplar

Şu ýere çenli aýdylanlary ynam torunyň kanagatlandyrmaly on iki talabyna öwrüp bileris. Tablisa 3 olary sanaýar we olaryň her biriniň bu resminamada nirede kanagatlandyrylýandygyny görkezýär. Resminamanyň galan bölegi bu tablisa ýygy-ýygydan dolanýar; dizaýn saýlawyny düşündirenimizde onuň haýsy talaby kanagatlandyrýandygyny aýdýarys.

#tablo([#{strong[Tablisa 3.]} Talaplar we olaryň kanagatlandyrylýan bölümleri.], (11fr, 29fr, 48fr, 25fr), ([\#​​​​​​​​], [Talap], [Näme üçin], [Nirede kanagatlandyrylýar​​],), (
  ([G1], [Çeşmeden soramazdan barlag], [Çeşmäniň ýüki we gijikmesi; "öýe jaň etmek"], [6, 11, 12],),
  ([G2], [Saýlap açmak], [Barlaýjy diňe özüne gerek zady görmeli], [8, 10],),
  ([G3], [Baglanyşyksyzlyk], [Barlaýjylar adamy biri-birine aýdyp bilmeli däl], [9\.5, 13, 15],),
  ([G4], [Şahsy maglumatsyz umumy ýazgy], [Sanawlar we žurnallar gözegçilik guralyna öwrülmeli däl], [6, 12, 15.5, 19],),
  ([G5], [Enjama baglanan resminama], [Resminama başganyň telefonynda ulanylyp bilinmeli däl], [8\.2, 13],),
  ([G6], [Ýatyrylyşy gözegçiliksiz çap etmek], [Yzyna almak adamyň nirede barlanandygyny aýan etmeli däl], [12],),
  ([G7], [Döwlet özygtyýarlylygy], [Her döwlet öz ýazgysynyň ýeke-täk ýazyjysy bolmaly], [4\.1, 18],),
  ([G8], [Ýeke operator çaklamasynyň bolmazlygy we tabşyryp bolmaklyk], [Wagtlaýyn rollar tabşyrylyp bilinmeli; tabşyryşda belgiler üýtgemeli däl], [4\.4, 6.7, 18.4],),
  ([G9], [ÝB standartlary bilen bilelikde işlemek], [Şol bir dilde gürleýän gapjyklar we barlaýjylar bilen işläp bilmek], [3, 20],),
  ([G10], [Açyk kod we gulplanmazlyk], [Hiç bir gurama ýeke öndürijä bagly galmaly däl], [5\.3, 17],),
  ([G11], ["Barlap bolmady" bilen "güýjünde däl" arasyndaky tapawut], [Kesilme dogruçyl resminamany ýasama görkezmeli däl], [11\.4],),
  ([G12], [Synag tory we laýyklyk subutnamasy], [Gatnaşyjylar hakyky tora girmezden synap bilmeli; laýyklyk görkezilip bilinmeli], [16\.5, 17, 20.5],),
))

Tablisanyň bir aýratynlygyna ünsi çekmek isleýäris. Talaplaryň bir bölegi biri-biri bilen dartgynlykda. Saýlap açmak we baglanyşyksyzlyk (G2, G3) adamyň mümkin boldugyça az yz galdyrmagyny talap edýär; ýöne barlaýjynyň resminamany barlap bilmegi üçin resminamanyň gol çekilen we ýatyrylyp bilinýän, ýagny bir ýerde yzarlanyp bilinýän gurluşy götermegi gerek (G1, G6). Özygtyýarlylyk (G7) her döwletiň öz düzgünlerini goýmagyny talap edýär; bilelikde işlemek (G9) bolsa hemmäniň şol bir düzgünler bilen gürleşmegini. Tamga-nyň dizaýnynyň möhüm bölegi bu dartgynlyklaryň nähili deňagramlaşdyrylýandygyny düşündirýär. Surat 2 gyzyklanýan taraplary we olaryň arasyndaky esasy dartgynlyklary bilelikde görkezýär.

#sekil(2, [Gyzyklanýan taraplar we dartgynlyklar], "figures/wp-tk/sekil-2.svg", yarim: false)

= Arka Plan: eIDAS 2.0, EUDI ARF we Açyk Standartlar

Tamga Network boşlukda taslanmady. Onuň tehniki gatlagy Ýewropa Bileleşiginiň soňky on ýylda guran sanly şahsyýet tertibiniň üstünde oturýar. Bu bölüm şol tertibi Tamga-ny düşünmek üçin ýeterlik derejede beýan edýär. ÝB hukugyny ähli jikme-jikligi bilen bilmek isleýän okyjy üçin tapgyryň eIDAS 2.0 \[2\] makalasy aýratyn çeşmedir.

== eIDAS-dan eIDAS 2.0-a

Ýewropa Bileleşiginiň elektron şahsyýet we ynam hyzmatlary baradaky düzgünnamasy, gysga ady bilen #{strong[eIDAS]}, 910\/2014 \[1\] belgisi bilen 2014-nji ýylda kabul edildi. Düzgünnama iki aýagyň üstünde gurlupdy. Birinji aýak elektron şahsyýetdi: agza döwlet öz elektron şahsyýet ulgamyny habar berse, beýleki agza döwletleriň döwlet hyzmatlary şol ulgamy ykrar etmäge borçludy. Ikinji aýak ynam hyzmatlarydy: elektron gol, elektron möhür, wagt belligi we olary üpjün edýän guramalara gözegçilik. Tamga-nyň ynam modeliniň daýanýan #{strong[ynam sanawlary]} şu ikinji aýagyň önümidir: her agza döwlet gözegçilik edýän kwalifisirlenen ynam hyzmaty üpjün edijilerini gol çekilen sanawda çap edýär.

Elektron şahsyýet aýagy garaşylan ýaýbaňlyga ýetmedi. Adamlar resminama götermeýärdi, her girişde öz ýurtlarynyň şahsyýet ulgamyna ugradylýardy; bu tapgyryň ilkinji makalasynda \[67\] federasiýa döwri diýip atlandyran modelimizdir. Komissiýa 2021-nji ýylda düzgünnamany üýtgetmegi teklip etdi we şol gün agza döwletleri umumy tehniki çarçuwanyň üstünde işlemäge çagyrdy \[3\]. Üýtgeşme 2024-nji ýylyň 11-nji aprelindäki #{strong[2024\/1183 belgili Düzgünnama]} hökmünde kabul edildi we 2024-nji ýylyň 20-nji maýynda güýje girdi. Bu tekst häzir #{strong[eIDAS 2.0]} diýlip atlandyrylýar.

eIDAS 2.0-yň özeni geçişdir: adamyň her gezek şahsyýet üpjün edijisine ugradylýan modelinden, resminamalaryny öz gapjygynda göterýän modele. Düzgünnama her agza döwletiň öz raýatlaryna azyndan bir #{strong[Ýewropa Sanly Şahsyýet Gapjygyny]} (#{emph[European Digital Identity Wallet]}, EUDI Wallet) hödürlemegini hökmany edýär. Borç döwletiň üstünde; adamlar üçin gapjygy ulanmak meýletin we mugt. Düzgünnama mundan başga-da gapjykdan maglumat soraýan guramalaryň ilki hasaba alynmagyny, gapjygyň garaşsyz guramalar tarapyndan sertifikatlaşdyrylmagyny we döwlet edaralary bilen käbir hususy pudak guramalarynyň gapjygy kabul etmegini göz öňünde tutýar.

Düzgünnamanyň özi ýörelgeleri, rollary we borçlary kesgitleýär; ýöne fransuz gapjygynyň nemes banky bilen gürleşip bilmegi üçin zerur tehniki düzgünleri ýazmaýar. Bu düzgünler Komissiýanyň çykarýan #{strong[ýerine ýetiriş düzgünnamalarynda]} (#{emph[Commission Implementing Regulation]}, CIR) ýerleşýär. Gapjyk bilen bagly ilkinji bäş ýerine ýetiriş düzgünnamasy (2024\/2977–2982 \[5\]) 2024-nji ýylyň 28-nji noýabrynda kabul edildi we 2024-nji ýylyň 24-nji dekabrynda güýje girdi; düzgünnamanyň gapjyk üçin göz öňünde tutan 24 aýlyk möhleti şu seneden başlandy. 2025-nji ýylyň maýynda ynanýan taraplaryň hasaba alynmagyny hem öz içine alýan ikinji toplum (2025\/846–849 \[6\]), 2026-njy ýylyň iýulynda bolsa salgylanýan standartlary täzeleýän üýtgediji düzgünnamalar (2026\/1730 \[7\], 2026\/1731, 2026\/1735) çap edildi. Ýerine ýetiriş düzgünnamasy köplenç standardy göçürmeýär, oňa salgylanýar; şonuň üçin ÝB-de hökmany tehniki düzgün köplenç düzgünnamanyň salgylanýan standartynyň belli bir wersiýasydyr.

== Resminama görnüşleri: PID, EAA, QEAA, PuB-EAA

eIDAS 2.0 gapjykda göterilýän resminamalary iki uly topara bölýär. Birinji topar #{strong[adamyň şahsyýet maglumatlarydyr]} (#{emph[Person Identification Data]}, #{strong[PID]}): ady, familiýasy, doglan senesi, raýatlygy ýaly adamyň şahsyýetini kesgitleýän maglumat. PID-i diňe döwlet ýa-da döwletiň ygtyýarlandyran guramasy berip bilýär we ol gapjygyň esasyny düzýär. Ikinji topar #{strong[elektron atribut tassyklamalarydyr]} (#{emph[Electronic Attestation of Attributes]}, #{strong[EAA]}): diplom, talyp resminamasy, hünär resminamasy, agzalyk karty, bilet; gysgaça aýdylanda, PID-den başga her resminama.

Düzgünnama EAA-lary hem kimiň berýändigine we haýsy kepilligi göterýändigine görä üçe bölýär. Kwalifisirlenen ynam hyzmaty üpjün edijisiniň berýän #{strong[kwalifisirlenen atribut tassyklamasy]} (QEAA) kagyz ýüzündäki deňi bilen birmeňzeş hukuk täsirine eýe. Ygtyýarly çeşme üçin jogapkär döwlet edarasynyň ýa-da onuň adyndan bellenen guramanyň berýän #{strong[döwlet edarasynyň tassyklamasy]} (PuB-EAA) aýratyn synpdyr. Olardan daşarda galýan her kim, meselem uniwersitet, bilet satyjy ýa-da sport kluby, #{strong[kwalifisirlenmedik atribut tassyklamasyny]} berip biler. Bölünişik hukuk täsirini kesgitleýär; tehniki görnüş bolsa köplenç birmeňzeş.

Tamga-nyň bu düşünjeler bilen gatnaşygynda ilkinji düzgün toruň #{strong[PID bermezligidir]}. Esasy çarçuwa resminamasy PID bermegi çägiň daşynda hasaplaýar we bu roly döwlete goýýar (FW-ARF-0001 §1.7). Ynam sanawynda PID üpjün edijileri üçin orun bar, ýöne bu orun häzir boş. Adamyň şahsyýetini tassyklaýan resminama barybir gerek bolandygy sebäpli tor döwletiň PID üpjün edijisi bellenýänçä #{strong[wagtlaýyn şahsyýet resminamasy üpjün edijisini]} işledýär; bu hyzmatyň berýän resminamasy PID däl, kwalifisirlenmedik EAA-dyr we döwletiň PID-i gelende onuň ýerini boşadýar (ADR-0011, ADR-0022; 14-nji bölüm). Tablisa 4 dört düşünjäni we olaryň Tamga-daky deňlerini ýanaşyk goýýar.

#tablo([#{strong[Tablisa 4.]} ÝB resminama düşünjeleri we olaryň Tamga-daky deňleri.], (25fr, 32fr, 31fr, 48fr), ([Düşünje], [Kim berýär (ÝB)], [Kepillik we hukuk täsiri], [Tamga-daky deňi],), (
  ([PID], [Döwlet ýa-da döwletiň ygtyýarlandyran guramasy], [Iň ýokary kepillik; gapjygyň esasy], [Berilmeýär; sanawda orun goýlan we boş. Wagtlaýyn şahsyýet hyzmaty PID-iň ornuny tutmaýar],),
  ([EAA (kwalifisirlenmedik)], [Islendik gurama], [Hukuk täsiri umumy düzgünlere görä], [Gurama resminama görnüşleri (talyp resminamasy, diplom, bilet) we wagtlaýyn şahsyýet resminamasy],),
  ([QEAA], [Kwalifisirlenen ynam hyzmaty üpjün edijisi], [Kagyz deňi bilen birmeňzeş hukuk täsiri], [Häzir ýok; "kwalifisirlenen" bolmak garaşsyz bahalandyrmany we gözegçiligi talap edýär (ADR-0022)],),
  ([PuB-EAA], [Ygtyýarly çeşme üçin jogapkär döwlet edarasy], [Döwlet çeşmesine daýanýar], [Gurama synplarynda döwlet synpy (PUB) üçin orun bar; häzir döwlet edarasy bolan resminama beriji ýok],),
))

== ARF-iň rollary we ynam sanawlary

Komissiýanyň 2021-nji ýyldaky çagyryşy bilen agza döwletleriň hünärmenleri we Komissiýa gapjyk ekoulgamynyň tehniki çarçuwasyny bilelikde ýazyp başladylar. Bu çarçuwanyň ady #{strong[Arhitektura we Salgylanma Çarçuwasy]} (#{emph[Architecture and Reference Framework]}, #{strong[ARF]} \[11\]). ARF hökmany hukuk teksti däl; açyk ösdürilýän we yzygiderli täzelenýän tehniki resminamadyr. Ýöne ýerine ýetiriş düzgünnamalary ARF-daky işe daýanýar; amalda ARF indiki düzgünnamada nämäniň hökmany boljakdygyny öňünden görkezýär. Bu neşir taýýarlanan wagty ARF-iň häzirki wersiýasy 2026-njy ýylyň 23-nji iýulyndaky 3.0.0 wersiýasydyr.

ARF-iň iň dowamly goşantlarynyň biri #{strong[rollar toplumydyr]}. Her roluň näme edýändigi we kimiň öňünde jogapkärdigi belli:

- #{strong[Gapjyk üpjün edijisi]} (#{emph[Wallet Provider]}) gapjyk programmasyny hödürleýär we gapjygyň hakyky, howpsuz gapjykdygyny subut edýän gol çekilen beýannamalary döredýär.
- #{strong[PID üpjün edijisi]} adamyň şahsyýet maglumatlaryny berýär; #{strong[atribut tassyklamasy üpjün edijileri]} beýleki resminamalary.
- #{strong[Ynanýan tarap]} (#{emph[Relying Party]}), ýagny barlaýjy, gapjykdan resminama soraýar. Ynanýan tarapyň adyndan işleýän #{strong[araçy]} (#{emph[intermediary]}) hem şu roluň bir görnüşidir.
- #{strong[Hasaba alyş edarasy]} (#{emph[Registrar]}) ynanýan taraplary we olaryň haýsy maksat bilen haýsy maglumatlary sorap biljekdigini hasaba alýar.
- #{strong[Giriş sertifikaty edarasy]} (#{emph[Access Certificate Authority]}) ynanýan taraplara gapjyga özlerini tanatjak sertifikatlaryny berýär; #{strong[hasaba alyş sertifikaty üpjün edijisi]} bolsa hasaba alyşdaky çägi göterýän gol çekilen resminamany döredýär.
- #{strong[Ynam sanawy üpjün edijisi]} bu rollary kimleriň ýerine ýetirýändigini gol çekilen sanawlarda çap edýär.

Bu rollaryň hemmesiniň üstünde eIDAS-yň 2014-nji ýyldan bäri işleýän ynam sanawy arhitekturasy durýar. Her agza döwlet öz #{strong[milli ynam sanawyna]} gol çekip, ony çap edýär; Komissiýa hem bu sanawlaryň salgylaryny we gol çekijilerini görkezýän #{strong[sanawlaryň sanawyny]} (#{emph[List of Trusted Lists]}, LOTL) çap edýär. eIDAS 2.0 bilen bu arhitektura gapjyk ekoulgamynyň täze rollaryna giňeýär: haýsy guramalaryň gapjyk üpjün edijisi, PID üpjün edijisi ýa-da giriş sertifikaty edarasy bolýandygy hem şuňa meňzeş sanawlar bilen habar berilýär.

Bu tertibiň bir netijesi barlagyň #{strong[iki taraplaýyn]} bolmagydyr. Barlaýjy resminamany barlanda gapjyk hem barlaýjyny barlaýar: haýyşa gol çeken gurama hakykatdanam hasaba alnanmy, soraýan meýdanlary hasaba alyşynyň çäginde barmy? 1.2-nji bölümdäki sahnada Aýnuryň gapjygynyň Timuryň kompaniýasyny barlamagy şu ýörelgäniň ulanylyşydyr. Surat 3 rollary ÝB-niň adalgalary bilen görkezýär.

#sekil(3, [EUDI ekoulgamynda rollar (ÝB adalgalary bilen, ýönekeýleşdirilen)], "figures/wp-tk/sekil-3.svg", yarim: false)

== Tehniki standartlaryň kartasy

ARF ýeke tehnologiýa baglanmagyň ýerine dürli standart guramalarynyň ýazan kämil standartlaryndan toplum saýlaýar. Bu standartlary ÝB ýazmaýar; IETF, ISO, OpenID Foundation, ETSI we W3C ýaly guramalar ýazýar. ÝB-niň edýän işi bu standartlaryň arasyndan saýlamak we olaryň wariantlaryny daraldýan #{strong[profilleri]} kesgitlemekdir. Tamga bu saýlawy we profilleri bolşy ýaly ulanýar. Tablisa 5 standartlary gatlaklary boýunça sanaýar; olaryň her biriniň Tamga-da nähili ulanylýandygy degişli bölümde düşündirilýär. Surat 4 şol bir standartlary gatlaklar görnüşinde görkezýär.

#tablo([#{strong[Tablisa 5.]} Tamga-nyň daýanýan esasy standartlary.], (25fr, 28fr, 26fr, 48fr, 26fr), ([Gatlak​​​​​​​​​​​​​​], [Standart], [Ýazan​​​​​​​​​​​​​​​​], [Näme üçin gerek], [Resminamada​​​​​​​​​​],), (
  ([Resminama görnüşi], [SD-JWT (RFC 9901) we SD-JWT VC (IETF taslamasy)], [IETF], [Meýdanlary aýratynlykda gizläp bolýan, gol çekilen JSON resminama], [8-nji bölüm],),
  ([Resminama görnüşi], [ISO\/IEC 18013-5 mdoc], [ISO\/IEC], [Mobil sürüjilik şahadatnamasy üçin işlenip düzülen ikilik (CBOR) görnüş; ýakyn aralyk], [8\.3, 10.8-nji bölümler],),
  ([Resminama bermek], [OpenID4VCI 1.0], [OpenID Foundation], [Guramanyň gapjyga resminama bermegi], [9-njy bölüm],),
  ([Hödürlemek], [OpenID4VP 1.0 we sorag dili DCQL], [OpenID Foundation], [Barlaýjynyň gapjykdan resminama soramagy], [10-njy bölüm],),
  ([Profil], [HAIP 1.0], [OpenID Foundation], [Ýokary kepillik üçin OpenID4VC wariantlaryny daraldýan profil], [9, 10-njy bölümler],),
  ([Brauzer], [Digital Credentials API; ISO\/IEC 18013-7], [W3C; ISO\/IEC], [Web saýtyň resminamany brauzer arkaly soramagy], [10\.6-njy bölüm],),
  ([Ýatyrylyş], [Token Status List (IETF taslamasy)], [IETF], [Resminamanyň ýatyrylandygyny ýa-da däldigini berijiden soramazdan bilmek], [12-nji bölüm],),
  ([Ynam], [ETSI TS 119 612 we TS 119 602], [ETSI], [Ynam sanawlary we ynamdar guramalaryň sanawlary], [6-njy bölüm],),
  ([Guramanyň şahsyýeti], [X.509 (RFC 5280); ETSI TS 119 412-6, TS 119 411-8, TS 119 475], [IETF; ETSI], [Gurama, barlaýjy we hasaba alyş sertifikatlarynyň profilleri], [7-nji bölüm],),
  ([Şahsyýet barlagy], [ETSI TS 119 461], [ETSI], [Uzakdan şahsyýet barlagynyň syýasat we howpsuzlyk şertleri], [14-nji bölüm],),
))

Tablisadaky "taslama" sözi standartyň kämillik tapgyryny görkezýär. SD-JWT-niň özi 2025-nji ýylda RFC 9901 \[15\] hökmünde çap edildi; onuň üstünde gurlan SD-JWT VC \[16\] we Token Status List \[17\] bolsa IETF-de soňky tapgyrda. ÝB ýerine ýetiriş düzgünnamalarynda bu taslamalaryň belli wersiýalaryna salgylanýar; Tamga hem şol wersiýalary yzarlaýar. OpenID4VP 1.0 \[31\] 2025-nji ýylyň iýulynda, OpenID4VCI 1.0 \[30\] 2025-nji ýylyň sentýabrynda, HAIP 1.0 \[32\] 2025-nji ýylyň dekabrynda soňky wersiýa hökmünde çap edildi.

#kutu("teknik", [Standartyň "profili" näme diýmek?])[
Umumy maksatly standart dürli ulanyş ýagdaýlaryna hyzmat etmek üçin köp ýerde saýlaw goýýar: birnäçe gol algoritmi, birnäçe müşderi belgisi görnüşi, açary baglamagyň birnäçe ýoly. Wariantlaryň köplügi çeýeligi üpjün edýär, ýöne bilelikde işlemegi kynlaşdyrýar. A gapjygy bir warianty, B barlaýjysy başga warianty ulansa, ikisi hem standarda laýyk gelýär, ýöne biri-birine düşünmeýär. #{strong[Profil]} şu wariantlardan bir bölek toplumy saýlap, ony hökmany edýän resminamadyr. HAIP 1.0 OpenID4VCI we OpenID4VP-niň ýokary kepillik talap edýän ulanyşlar üçin profilidir. Tamga-nyň bu profile laýyklygyny karara baglaýan ýazgy (ADR-0034) iki mysal berýär: barlaýjy gol çekilen haýyşda müşderi belgisi hökmünde diňe öz giriş sertifikatynyň heşini (#{raw("x509_hash")}) ulanýar we gapjyk diňe ony kabul edýär; gapjygyň öz üpjün edijisinden alan subutnamasyndaky #{raw("sub")} bahasy hem şol bir gapjyk çözgüdini ulanýan ähli gurnamalarda umumydyr. Ikinji düzgüniň esasy HAIP-iň aç-açan talabydyr, ýöne düzgün gizlinlik netijesini hem döredýär: subutnamanyň "kim" meýdany ýeke telefona mahsus bahany götermeýär, diňe gapjyk çözgüdiniň adyny göterýär.
]

#sekil(4, [Standartlaryň gatlaklary], "figures/wp-tk/sekil-4.svg", yarim: false)

== ÝB-den daşardan seredeniňde

ÝB-den daşardaky ýurtda bu standartlary ulanýan üçin ilkinji sorag özüne nähili at berip biljekdigidir. "EUDI Wallet" ýa-da Ýewropa Sanly Şahsyýet Gapjygy tehniki kesgitleme däl, #{strong[hukuk derejesidir]}: ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän we ÝB düzgünlerine görä sertifikatlaşdyrylan gapjygy aňladýar. ÝB-den daşardaky guramanyň gapjygy bu derejäni alyp bilmeýär, ÝB-niň gapjyk ynam nyşanyny hem ulanyp bilmeýär (FW-ARF-0001 §1.4). Şonuň üçin Tamga-nyň köpçülige açyk tekstlerde ulanýan aňlatmasy "ÝB bilen laýyk": şol bir resminama görnüşlerini, şol bir protokollary we şol bir ynam modelini ulanmak we muny synaglar bilen görkezmek.

Ikinji sorag ÝB bilen laýyk resminamanyň ÝB-de güýjünde boljakdygy ýa-da bolmajakdygydyr. Bu soragyň jogaby tehnikanyň däl-de, hukugyň meýdanynda we toruň elinde däl. Tamga-nyň orun kesgitleme kararyna goşulan hukuk bellik muny aç-açan ýazýar (ADR-0035): düzgünnamanyň döwlet we hususy pudaga gapjygy kabul etmek borjuny ýükleýän 5f maddasy ÝB-den daşardaky gapjygy ýa-da sanawy ykrar etmegiň ýoly däl. ÝB-den daşarky ýurtlar üçin aç-açan esas ynam hyzmatlary babatda Bileleşik bilen şol ýurduň arasynda baglaşyljak ylalaşygy göz öňünde tutýan 14-nji maddadyr we bu ylalaşygyň taraplary döwletlerdir. Toruň roly tehniki taýýarlykdyr: ETSI görnüşindäki sanawlar, ETSI profilli sertifikatlar we tabşyrylyp bilinýän döwlet rollary. Gysga möhletde ÝB barlaýjysy Tamga resminamalaryny diňe öz islegi bilen, Tamga-nyň ynam sanawyny öz ynam çeşmesine goşup kabul edip biler; bu hukuk ykrary däl we şeýle hem düşündirilmeýär. Ykrar meselesiniň hemmesi 20-nji bölümde.

= Dizaýn Ýörelgeleri we Orun Kesgitlemek

Arhitekturany düşünmegiň gysga ýoly ony guranlaryň nämäni hiç haçan etmejekdiklerini aýdýan ýerine seretmekdir. Tamga-nyň esasy çarçuwa resminamasy bu düzgünleri ýedi ýörelgede jemleýär (FW-ARF-0001 §1.6). Bu bölüm ilki şol ýörelgeleri, soňra toruň özüni nähili ýerleşdirýändigini, nämäni etmeýändigini we häzir kimiň eli bilen işledilýändigini beýan edýär.

== Ýedi ýörelge

#{strong[P1. Her döwlet öz milli ýazgylarynyň ýeke-täk ýazyjysydyr.]} Döwletiň haýsy guramany resminama beriji hökmünde hasaba aljakdygyna başga hiç bir döwlet ses bermeýär. Tora agzalyk geňeş döredilende agza döwletleriň üçden iki sesi bilen bolýar; serhetaşa ykrar bolsa her döwletiň birtaraplaýyn kararydyr. Näme üçin? Sebäbi hiç bir döwlet öz içki guramaçylyk kararlarynyň başgalaryň sesine bagly bolýan ýa-da bir gün tordan çykarylsa raýatlarynyň resminamalarynyň gymmatyny ýitirjek gurluşyna girmez (ADR-0002). Özygtyýarlylyk kepilligi gatnaşmagyň deslapky şertidir.

#{strong[P2. Hiç bir umumy ýazgyda şahsy maglumat ýok.]} Ynam sanawynda, labyr žurnalynda, mümkin bolan umumy kitapda we žurnallarda şahsy maglumat ýok; resminamanyň mazmuny hem, resminamanyň heşi hem ýok. Näme üçin heşi hem? Sebäbi heş resminamany bilýän adam üçin resminamanyň özi ýaly tanadyjydyr: elinde diplom bolan adam onuň heşini hasaplap, köpçülige açyk ýazgyda gözläp biler. Umumy ýazgylaryň gözegçilik guralyna öwrülmezliginiň ýeke-täk ygtybarly ýoly olara asla şahsy maglumat goýmazlykdyr.

#{strong[P3. Tehniki gatlak ÝB standartlary bilen birmeňzeş.]} Tamga-nyň özüne mahsus her goşundy standartyň giňeltme nokady arkaly edilýär we standart müşderileri bozmaýar. Bilelikde işlemegiň gymmaty hiç kimiň aýratyn uýgunlaşdyrma ýazmaga mejbur bolmazlygyndan gelýär. ÝB bilen laýyk gapjyk Tamga guramasyndan resminama alyp bilmeli, Tamga barlaýjysy hem ÝB bilen laýyk gapjykdan gelen resminamany işläp bilmeli.

#{strong[P4. Hiç bir belgi, rol ýa-da gurluş ýeke operator çaklamasyny götermeýär.]} Toruň häzir wagtlaýyn öz üstüne alan her döwlet roly tabşyrylyp bilinjek görnüşde taslanýar. Näme üçin? Sebäbi gurluş ýeke operatora görä gurlan bolsa, tabşyryş güni hemme zady täzeden ýazmak gerek bolýar: gurama belgileri üýtgeýär, resminamalar güýjüni ýitirýär, gapjyklar täzelenýär. Tamga-da tabşyryş diňe sanawyň operator meýdanyny we gol çekijisini üýtgedýär; guramalaryň belgileri, resminama görnüşleri we berlen resminamalar şol bir galýar (6.7, 18.4-nji bölümler).

#{strong[P5. Umumy kitap saklaýyş saýlawy däl, gol çekijileriň saýlawydyr.]} Häzir ynam gol çekilen sanawlardan gelýär. Azyndan iki garaşsyz operator bolanda umumy kitap gurulýar. Näme üçin? Sebäbi ýeke operatoryň işledýän dört düwünli zynjyry şol operatoryň gol çeken sanawyndan köp ynam döretmeýär (ADR-0009). Kitaby gymmatly edýän zat ýazgylaryň biri-birinden garaşsyz taraplaryň umumy goly bilen saklanmagydyr. Şonuň üçin Tamga-da zynjyryň kody ýazyldy we synagdan geçirildi, ýöne ol önümçilikde ýok we ýapyk; ikinji garaşsyz operator bolmasa açylmaýar we açylanda-da diňe gol çekilen sanawlaryň heşini göterýär (ADR-0051; 19-njy bölüm).

#{strong[P6. Her resminama enjamyň howpsuz zolagyndaky açara baglanýar.]} Resminamany göçürip ýa-da başga birine geçirip bolmaýar. Baglanyşygy bolmadyk resminamany ony ele geçiren islendik adam görkezip biler; diplomyň faýlyny alan adam özüni onuň eýesi ýaly görkezip biler. Enjam baglanyşygy bolmasa, sanly resminama kagyz nusganyň gowşaklygyny götermegini dowam etdirýär (ADR-0006; 8.2-nji bölüm).

#{strong[P7. Kod bilen çäklendirip bolmaýan her ygtyýar syýasat, ölçenip bilinýän tabşyryş çägi we açyklyk hasabaty bilen çäklendirilýär.]} Ýerleşdirmek, domen ady, ýazgy saklamak we statistika ýaly ygtyýarlary kod bilen böwetläp bolmaýar; ýöne olary hyýanatçylykly ulanyp bolýar. Trust Framework bu ýörelgäni "ýumşak güýç hem çäklendirilýär" diýip atlandyrýar (FW-TF-0001 §1.2, G-B). Näme üçin? Sebäbi toruň bitaraplygy onuň ýazan düzgünleri bilen bir hatarda operatoryň düzgünlerden daşarda galýan güýçleri bilen hem synalýar. Meselem, ýerleşdirilen resminama berijileriň paýy belli bir çäkden geçse, mesele dolandyryşyň gün tertibine çykýar we açyklyk hasabaty üç aýda bir gezek çap edilýär (18.5-nji bölüm).

Trust Framework bu ýedi ýörelgä dolandyryşa mahsus ýene bir düzgüni goşýar we ony "hasaba alyş ygtyýarlandyrma däldir" diýip atlandyrýar (FW-TF-0001 §1.2, G-A). Tora hasaba durmak guramaga resminama bermek ygtyýaryny bermeýär; uniwersitetiň diplom bermek ygtyýary toruň daşyndan, öz kanunçylygyndan gelýär. Tor diňe toruň içindäki çägi, ýagny guramanyň haýsy resminama görnüşlerini haýsy meýdanlar bilen berip biljekdigini saklaýar. Tablisa 6 ýörelgeleri 2.5-nji bölümdäki talaplara we olary jikme-jikleşdirýän bölümlere baglaýar.

#tablo([#{strong[Tablisa 6.]} Ýörelgeler, olaryň kanagatlandyrýan talaplary we jikme-jiklik bölümleri.], (14fr, 41fr, 10fr, 15fr), ([Ýörelge​​​​], [Özeni], [Talap​​​], [Jikme-jiklik],), (
  ([P1], [Her döwlet öz ýazgysynyň ýeke-täk ýazyjysy], [G7], [6\.2, 18.1],),
  ([P2], [Umumy ýazgylarda şahsy maglumat ýok], [G4, G6], [6, 12.4, 15.5, 19.3],),
  ([P3], [Tehniki gatlak ÝB standartlary bilen birmeňzeş], [G9, G10], [3, 8–10, 20],),
  ([P4], [Ýeke operator çaklamasy ýok, rollar tabşyrylyp bilinýär], [G8], [6\.7, 7.2, 18.4],),
  ([P5], [Kitap gol çekijileriň saýlawy; azyndan iki garaşsyz operator], [G8, G4], [6\.4, 19],),
  ([P6], [Her resminama enjam açaryna baglanan], [G5], [8\.2, 13],),
  ([P7], [Ýumşak güýç syýasat we çäk bilen çäklendirilen], [G8], [18\.5],),
))

== Üç gatlak

Tamga-nyň orun kesgitleme karary (ADR-0035) gurluşy biri-biriniň üstünde oturýan üç gatlaga bölýär we her gatlagyň aýratynlykda gymmat götermegini şert edip goýýar (Surat 5).

#{strong[Esas: ÝB bilen laýyklyk.]} Resminamalar, protokollar we ynam sanawlary ÝB standartlarynda. Tor asla ulalmasa, ýeke döwlet hem goşulmasa, bu gatlak guramalar we gapjyklar üçin barybir gymmat göterýär: gurama Tamga-nyň açyk paketleri bilen ÝB bilen laýyk resminama berip biler, barlaýjy ÝB bilen laýyk resminamalary barlap biler.

#{strong[Tamga Network: ýeňil ynam federasiýasy.]} Toruň esasy işi ýurtlaryň ynam sanawlaryny bir ýere jemlemek we biri-birine tanatmakdyr. Bu ýerde "federasiýa" her sanawyň öz eýesi tarapyndan işledilýän we umumy sanawlar sanawynda görkezilýän modelini aňladýar. Tor çap edilen düzgünlere eýerýän her gapjyk üpjün edijisini tanaýar; gapjyklary saýlamaýar. Häzir Türkiýäniň sanawyny tor döwletiň adyndan wagtlaýyn işledýär. Döwlet öz sanawyny çap edende sanawlaryň sanawy şol sanawyň salgysyny we gol çekijisini görkezýär. Agyr gurama ilkinji günden gurulmaýar: bir ýa-da iki döwlet goşulmaga isleg bildirende geňeş ýa-da gazna döredilýär, sanawlar tabşyrylýar we umumy kitap gelýär.

#{strong[Toruň üstündäkiler.]} Toruň düzgünlerine eýerýän gapjyklar we hyzmat üpjün edijiler şu gatlakda. Olar toruň bölegi hasaplanmaýar; toruň gatnaşyjylary ýa-da ulanyjylarydyr. Bu gatlak ilkinji kararda "önümler we hyzmatlar" diýlip kesgitlenipdi; toruň özüniň hyzmat hödürleýän gurluşy göz öňünde tutulýardy. Şol karar ýazgysy munuň dartgynlyk döredýändigini hem belläpdi: ÝB modelinde sanawy dolandyrýan tarapyň hyzmat satmagy bähbitler çaknyşygy hasaplanýar. Indiki karar bu dartgynlygy aýyrdy we toruň diňe tordugyny, täjirçilik hyzmatlarynyň bolsa toruň daşyndaky kompaniýalar tarapyndan öz atlary bilen hödürlenýändigini karara baglady (ADR-0037). Ondan soňky karar gapjyklaryň hem toruň daşyndadygyny aýdyňlaşdyrdy (ADR-0042; 5.4-nji bölüm).

Näme üçin üç gatlak? Karar ýazgysy üç ýola seredýär. Birinjisi diňe ÝB bilen laýyk gapjyk we onuň töweregindäki hyzmatlardy; bu ýol çalt, ýöne türki dünýäsi üçin umumy ynam binýadyny gurmaýar we döwlet gapjyklary gelende tapawutlandyryjy hiç zat galdyrmaýar. Ikinjisi ilki ÝB-ä meňzeş agyr gurama gurmakdy; ýöne döwletler goşulmazdan şeýle guramany gurmak hem gaty ir, hem esassyz bolardy. Üçünji ýol, gatlakly gurluş, ilkinji ikisiniň gowy taraplaryny birleşdirýär: esas derrew gymmat döredýär, federasiýa gatlagy döwletler goşuldygyça ösýär we döwlet sanawlary gelende gymmat ýitmeýär, tersine federasiýanyň gymmaty artýar.

#sekil(5, [Tamga-nyň üç gatlagy], "figures/wp-tk/sekil-5.svg", yarim: false)

== Tor näme däl

Gurluşy beýan etmegiň bir ýoly hem onuň näme däldigini aýtmakdyr. Tamga Network-iň kararlary toruň öz üstüne almajak işlerini aç-açan sanaýar; bu çäkler toruň bitaraplygyny we tabşyrylyp bilinmegini goraýar.

Tor #{strong[önüm ýa-da hyzmat satmaýar]}. Düzgünleri ýazýar, ynam sanawlaryny çap edýär, açyk kody we toruň işlemegi üçin zerur salgylanma hyzmatlaryny işledýär; bularyň hiç biri satylmaýar. Integrasiýa, goldaw ýa-da maslahat ýaly täjirçilik hyzmatlaryny toruň daşyndaky kompaniýalar öz atlary bilen hödürleýär we toruň salgylanma hyzmatlary hem hasaba alyş prosesi ähli gatnaşyjylar üçin birmeňzeş şertlerde açyk (ADR-0037).

Tor #{strong[gapjyk işletmeýär]}. Hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini, saýtyny ýa-da goldaw hyzmatyny işletmeýär; gapjyklary diňe ynam sanawyndaky ýazgylary arkaly tanaýar (ADR-0042).

Tor #{strong[PID bermeýär]}. Bu rol döwlete goýuldy. Toruň wagtlaýyn şahsyýet hyzmaty PID bolmadyk, wagtlaýyn şahsyýet resminamasyny berýär (3.2, 14-nji bölümler).

Tor #{strong[töleg işlemeýär we token çykarmaýar]}. Toruň irki dizaýnynda mümkin bolan kitabyň üstünde gurlup bilinjek baha gatlagy üçin käbir orunlar goýlupdy. Bu orunlar hökmany bolmakdan çykaryldy we togtadylan gözleg ugry hökmünde galdy; olaryň täzeden açylmagy dolandyryş guramasynyň kararyny, garaşsyz howpsuzlyk barlagyny we täze karar ýazgysyny talap edýär (ADR-0072). Esasy çarçuwa resminamasy hem tölegi we baha geçirmegi çägiň daşynda hasaplaýar (FW-ARF-0001 §1.7).

Tor #{strong[şahsy ýazgy saklamaýar]}. Adamlaryň resminamalary guramalaryň öz ulgamlaryndan okalýar, adamyň gapjygynda göterilýär; toruň umumy ýazgylarynda şahsy maglumat ýok (P2). Munuň ýeke-täk dar kadadan çykmasy wagtlaýyn şahsyýet hyzmatydyr: bu hyzmat şahsyýetini barlan adamlary üçin maglumat jogapkäridir we saklaýan maglumatlaryny gysga we kesgitli möhletler bilen çäklendirýär (14.7-nji bölüm).

Esasy çarçuwa resminamasynyň çäkden daşary sanawy mundan başga-da guramalaryň resminama eýesi bolýan gurama gapjygyny, W3C VCDM \[37\] görnüşinde ikinji resminama şekillendirilişini we kwalifisirlenen elektron goly sanaýar. Bular hemişelik aýrylmadyk; olaryň her biri diňe aýratyn karar bilen açylyp bilner.

== Girdeji gazanmagy maksat edinmeýän tor, gazna we wagtlaýyn operatorlyk

Tamga Network girdeji gazanmagy maksat edinmeýän ynam tory hökmünde taslandy we onuň hemişelik orny gaznadyr. Ýöne toruň kompaniýa ýaly öz-özünden ýuridiki şahsy ýok we gazna heniz döredilmedi. Beýleki tarapdan käbir işler eýýäm häzirden ýuridiki şahsy talap edýär: sertifikatyň subýekt meýdanyna ýazyljak guramanyň belgisi, domen adynyň hasaba alynmagy, şahsy maglumatlar baradaky kanunçylyk öňünde maglumat jogapkäriniň hasaba alynmagy, gatnaşyk şertnamalary.

Bu boşluk karar bilen dolduryldy (ADR-0070). Gazna ýuridiki şahs derejesini alýança toruň öz hyzmatlaryny, ýagny sanawy çap etmegi, hasaba alyş edarasy roluny döwletiň adyndan ýerine ýetirmegi, şahsyýet hyzmatyny, Tamga Verify-y, saýtlary we domen atlaryny #{strong[wagtlaýyn operator]} "Tamga Network-iň adyndan" işledýär. Ýuridiki şahsy talap edýän her amal onuň ady bilen we şu söz bilen edilýär; gatnaşyk şertnamalary gazna geçmegi göz öňünde tutýan hukuk mirasdüşerligi maddasyny göterýär. Ynam sanawlarynda bolsa sanaw operatorynyň ady hemişe "Tamga Network" we ýagdaýy "wagtlaýyn" (#{raw("provisional")}) hökmünde bellenýär.

Kararyň seredýän wariantlary bu dizaýnyň näme üçin saýlanandygyny görkezýär. Sanawlarda operatoryň ady hökmünde gönüden-göni kompaniýanyň adyny ýazmak ret edildi; sebäbi sanawa eýeçilik tora degişli we tabşyryşda sanawyň belgisi üýtgärdi. Ýuridiki şahsy talap edýän her işi gazna döredilýänçä saklamak hem ret edildi; şahsyýet hyzmaty, barlaýjynyň hasaba alynmagy we dükan barlagy eýýäm häzirden ýuridiki şahsy talap edýärdi. Maglumatlary her ýazgyda aýry-aýrylykda saklamak hem pytraňňy we barlap bolmaýan bolany üçin ret edildi. Saýlanan ýolda wagtlaýyn operatoryň maglumatlary ýeke-täk konfigurasiýa bahasyndan gelýär we sanaw çap ediji her çap etmeden öň muny barlaýar; maglumatlar gabat gelmese, çap etmek togtaýar. Gazna tabşyryş diňe şu bahany we oňa bagly ýazgylar bilen sertifikatlary üýtgedýär; sanaw operatorynyň ady, kök sertifikatyň belgisi, resminama görnüşleriniň belgileri we guramalaryň hemişelik belgileri üýtgemeýär.

Wagtlaýyn operatoryň başga önümleri bolsa-da, olar torda aýratyn gatnaşyjydyr we hiç hili artykmaçlyk almaýar. Maliýeleşdiriş babatda toruň ýörelgesi hem gysga: tor girdeji gazanmagy maksat edinmeýär, wagtlaýyn döwürde hiç bir gatnaşyjydan, ýagny resminama beriji guramadan, barlaýjydan, gapjyk üpjün edijisinden ýa-da adamdan haky almaýar we adamlar üçin hemişe mugt (ADR-0071; FW-TF-0001 §5.5). Maliýeleşdirişiň dolandyryş bilen baglanyşygy 18.7-nji bölümde.

= Rollar we Komponentler

3-nji bölüm ÝB-niň rollar toplumyny beýan etdi. Bu bölüm şol bir toplumy Tamga-nyň içinden görkezýär: häzir her roly kim ýerine ýetirýär, döwlet goşulanda kim ýerine ýetirer, haýsy hyzmat nirede işleýär we maglumat haýsy ugurda akýar.

== Rollar toplumy

Tamga-nyň rollar toplumy ÝB ARF-inden \[11\] alyndy we bir düzgün bilen başlaýar: her ýurt sanawy bu rollaryň her biri üçin orun goýýar; orun boş galsa-da bar (FW-ARF-0001 §3). Munuň amaly manysy şeýle: döwlet goşulanda gurluşa täze meýdan goşulmaýar, bar bolan orun dolýar. Tablisa 7 rollary häzirki we döwlet goşulandaky eýeleri bilen bilelikde berýär.

#tablo([#{strong[Tablisa 7.]} Rollar: häzir we döwlet goşulanda.], (32fr, 48fr, 27fr, 24fr), ([Rol (ÝB-däki ady)], [Näme edýär], [Häzir], [Döwlet goşulanda],), (
  ([Ynam sanawynyň operatory (#{emph[Trusted List Scheme Operator]})], [Ýurt sanawyny düzýär, gol çekýär, çap edýär], [Tor, döwletiň adyndan wagtlaýyn], [Milli edara ýa-da onuň ygtyýarlandyran guramasy],),
  ([Hasaba alyş edarasy (#{emph[Registrar]})], [Resminama berijileri, barlaýjylary we gapjyk üpjün edijilerini hasaba alýar; kanuny ygtyýar bermeýär], [Tor, döwletiň adyndan wagtlaýyn], [Döwletiň hasaba alyş edarasy],),
  ([Milli kök sertifikat edarasy], [Gurama sertifikatlarynyň köki], [Tor, wagtlaýyn; köküň belgisi tabşyryşda üýtgemeýär], [Döwletiň köki ýa-da ygtyýarly sertifikat üpjün edijisi],),
  ([Giriş we hasaba alyş sertifikaty üpjün edijisi], [Barlaýjylara giriş we hasaba alyş sertifikatyny berýär], [Tor, wagtlaýyn], [Döwlet],),
  ([PID üpjün edijisi], [Adamyň şahsyýet maglumatlaryny iň ýokary kepillikde berýär], [#{strong[Boş]}; tor bu roly öz üstüne almaýar], [Döwlet],),
  ([Wagtlaýyn şahsyýet resminamasy üpjün edijisi], [PID üpjün edijisi ýokka uzakdan şahsyýet barlagy bilen şahsyýet resminamasyny berýär], [Toruň şahsyýet hyzmaty], [PID üpjün edijisi öz üstüne alýar],),
  ([Resminama beriji (#{emph[Attestation Provider]})], [Atribut tassyklamasyny berýär we gerek bolanda ýatyrýar], [Guramalar (uniwersitet, bilet satyjy ýaly)], [Guramalar we döwlet edaralary],),
  ([Ygtyýarly çeşme (#{emph[Authentic Source]})], [Maglumatyň esasy ýazgysyny saklaýar], [Guramanyň öz hasaba alyş ulgamy], [Şol bir; mundan başga-da döwlet çeşmeleri],),
  ([Gapjyk üpjün edijisi (#{emph[Wallet Provider]})], [Gapjygy hödürleýär; gapjyk we açar tassyklamalaryna gol çekýär], [Gapjygy hödürleýän guramalar; tor işletmeýär, sanaýar], [Düzgünlere eýerýän her üpjün ediji],),
  ([Barlaýjy (#{emph[Relying Party]})], [Resminama soraýar we barlaýar; hasaba alnan we çägi kesgitlenen], [Iş beriji, web saýt, gapy], [Şol bir],),
  ([Araçy barlaýjy (#{emph[Intermediary]})], [Başga barlaýjynyň adyndan resminama soraýar we barlaýar], [Tamga Verify], [Şol bir],),
  ([Resminama eýesi (#{emph[Holder]})], [Resminamany göterýär, kime görkezjekdigini kesgitleýär], [Talyp, uçurym, ulanyjy], [Raýat],),
  ([Kitap operatory], [Umumy kitabyň bir düwnüni işledýär], [#{strong[Ýok]}], [Azyndan iki garaşsyz gurama],),
))

Tablisanyň üç setiri aýratyn düşündirilmäge mynasyp. #{strong[PID üpjün edijisi]} setiri boş we bu bilkastlaýyn boşluk: tor döwlete degişli bu roly doldurmaýar, diňe onuň ornuny saklaýar. #{strong[Wagtlaýyn şahsyýet resminamasy üpjün edijisi]} bu boşlugyň döredýän zerurlygyny wagtlaýyn kanagatlandyrýar; onuň berýän resminamasy PID däl we döwletiň PID üpjün edijisi bellenende onuň ýerini boşadýar (ADR-0011). #{strong[Araçy barlaýjy]} öz barlag programmasyny işletmek islemeýän barlaýjynyň adyndan işi ýerine ýetirýän hyzmatdyr; gapjyk adama esasy barlaýjynyň adyny görkezýär. Toruň ýerleşdirýän Tamga Verify hyzmaty şu roldadyr (11.5-nji bölüm).

Bir gurama birnäçe roly öz üstüne alyp biler. Meselem, bilet satyjy hem bileti berýän, hem gapyda barlaýan tarapdyr; her rol üçin aýratyn hasaba durýar we şol roluň düzgünlerine aýry-aýrylykda eýerýär (FW-ROLE-0001 §1). Tablisada görünmeýän ýene bir rol #{strong[auditordyr]}. Häzir laýyklyk öz beýannamasy we açyk laýyklyk synaglary bilen görkezilýär; döwletler goşulanda garaşsyz laýyklygy bahalandyryş guramalary we milli akkreditasiýa gelýär (FW-ROLE-0001 §10; 18.6-njy bölüm).

#kutu("teknik", [Sanawlaryň sanawyndaky ýurt orny])[
Rollaryň "boş bolsa-da orny bar" düzgüni sanawlaryň sanawyndaky her ýurt ýazgysynda görünýär. Aşakdaky mysal toruň sanaw çap edijisiniň çeşme faýlyndan gysgaldyldy; bahalar mysal üçin berilýär we çap edilen sanawda görnüş gol çekilen JWS hökmünde bolýar.

#kod("json", "{
  \"national_lists\": [
    {
      \"state_code\": \"TR\",
      \"status\": \"ACTIVE\",
      \"membership\": \"TDT_MEMBER\",
      \"list_url\": \"https://trust.tamga.network/tl-tr.jws\",
      \"operator\": {
        \"name\": \"Tamga Network\",
        \"status\": \"provisional\",
        \"on_behalf_of\": \"TR national authority (to be designated)\"
      },
      \"roles\": {
        \"registrar\":        { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"tlso\":             { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"access_ca\":        { \"status\": \"PROVISIONAL\", \"operated_by\": \"Tamga Network\" },
        \"national_root_ca\": { \"status\": \"ACTIVE\", \"operated_by\": \"Tamga Network (provisional)\" },
        \"pid_provider\":     { \"status\": \"RESERVED\" }
      },
      \"recognition\": { \"mode\": \"unilateral\", \"recognizes\": [\"TR\"] }
    },
    { \"state_code\": \"AZ\", \"status\": \"RESERVED\", \"membership\": \"TDT_MEMBER\" },
    …
  ]
}", baslik: "Mysal: sanawlaryň sanawynda Türkiýäniň orny we goýlan orun (gysgaldylan)")

Üç jikme-jiklik üns çekýär. Operator bölegi (#{raw("operator")}) toruň bu sanawy heniz bellenmedik milli edaranyň adyndan wagtlaýyn işledýändigini aýdýar; sanaw tapgyrynyň dowamynda bu meýdany boş goýup bolmaýar (SPEC-TRUST-0001 §3, §8 TL1). PID üpjün edijisiniň orny #{raw("RESERVED")} hökmünde durýar; tor bu orny doldurmaýar (SPEC-TRUST-0001 §8, TL8). Ykrar tertibi #{raw("unilateral")}, ýagny birtaraplaýyn: ýurduň haýsy ýurtlaryň resminamalaryny ykrar etjekdigi onuň öz karary. Azerbaýjan setiri bolsa diňe goýlan orun; onuň içinde sanaw salgysy, gol çekiji ýa-da rol ýok. Şeýle görnüşde goýlan orunlar Gazagystan, Gyrgyzystan we Özbegistan (Türki Döwletler Guramasynyň agzalary) hem-de Wengriýa we Türkmenistan (synçylar) üçin hem bar. Bu orunlar hiç bir döwlet bilen ylalaşygyň ýa-da gepleşigiň habarnamasy däldir.
]

== Rollary aýyrmagyň düzgünleri

Rollaryň kimdedigi ýaly, haýsy roluň nämäni edip bilmejekdigi hem möhüm. Tamga-nyň çarçuwa resminamalary üç aýyrma düzgünini goýýar.

Birinji düzgün #{strong[guramanyň gol açarynyň guramada galmagydyr]}. Tor ýerleşdirýän hiç bir hyzmatynda guramanyň gol açaryny saklamaýar; resminama beriş hyzmaty toruň serwerinde işlese-de, resminamanyň gol açary guramaga degişli (FW-ARF-0001 §3; FW-ROLE-0001 §1). Bu düzgün ýerleşdirilen hyzmatyň amatlylygy bilen guramanyň özygtyýarlylygy arasyndaky dartgynlygy çözýär. Karar ýazgysy muny nähili etmelidigini ýazýar (ADR-0057): guramanyň açary öz enjam howpsuzlyk modulynda ýa-da saýlan ynam hyzmaty üpjün edijisinde durýar; ýerleşdirilen hyzmat goly Cloud Signature Consortium-yň \[54\] uzakdan gol interfeýsi bilen soraýar we garşy tarapa diňe gol çekiljek maglumatyň SHA-256 heşini iberýär. Resminamanyň mazmuny we şahsy maglumat gol hyzmatyna gitmeýär. Gaýdyp gelen gol guramanyň ynam sanawyndaky sertifikaty bilen ýerli barlanýar; barlanmasa, resminama berilmeýär. Hakyky torda gurama açarynyň hyzmat serwerindäki faýldan okalmagy konfigurasiýa derejesinde ret edilýär. Ýagdaý: uzakdan goluň kody we synaglary taýýar, ýöne hakyky torda muny ulanýan gurama heniz ýok (#{strong[Meýilleşdirilen]}; jikme-jiklik 7.6-njy bölümde).

Ikinji düzgün #{strong[hasaba alşyň ygtyýarlandyrma hasaplanmazlygydyr]}. Hasaba alyş edarasy hasaba alýar, makullamaýar (FW-TF-0001 §1.2, G-A). Uniwersitetiň diplom bermek ygtyýaryny ýokary bilim kanunçylygy, hünär guramasynyň resminama bermek ygtyýaryny onuň öz kanuny berýär; tor bu ygtyýary ne berýär, ne-de barlaýar. Toruň saklaýan zady toruň içindäki çägidir: bu gurama haýsy resminama görnüşlerini haýsy meýdanlar bilen berip biler? Bu aýyrma tory hukuk häkimiýeti ýaly hereket etmekden goraýar we her döwletiň öz ygtyýar tertibini bolşy ýaly galdyrýar.

Üçünji düzgüne görä #{strong[ygtyýarly çeşme guramada]}. Resminamadaky maglumatyň esasy ýazgysy, meselem talybyň maksatnamasy ýa-da uçurym bolan senesi, guramanyň öz hasaba alyş ulgamynda durýar. Ýerleşdirilen resminama beriş hyzmaty bu maglumaty saklamaýar; resminama gol çekiljek pursatynda guramanyň sorag nokadyndan okaýar, resminama berlenden soň ýatdan aýyrýar (ADR-0020). Karar iki ýoly kesgitleýär. Birinji ýolda gurama adamyň şahsyýetine baglanan teklip döredýär we salgyny özi iberýär; adam gapjykda şahsyýetini hödürleýär, şahsyýet teklip bilen gabat gelse, resminama berilýär. Ikinji ýolda adam gapjykdan guramany saýlaýar we şahsyýetini hödürleýär; hyzmat guramanyň sorag nokadyna gol çekilen haýyş bilen ýüz tutýar. Iki ýolda hem tor adam ýazgysyny saklamaýar. Seredilen alternatiwa adam ýazgylaryny toruň gurama konsolynda saklamakdy; bu ýol ret edildi we konsoldaky hasaba alyş kitaby diňe sandbox-daky synag çeşmesi hökmünde galdy. Akymyň jikme-jikligi 9.2-nji bölümde.

== Komponentler we hyzmat salgylary

Rollaryň aňyrsynda işleýän programma komponentleri iki topara bölünýär. Bir topar #{strong[açyk çeşmeli kitaphanalardyr]}: resminama görnüşlerini okaýan we ýazýan, ynam sanawlaryny barlaýan, resminama berýän we barlaýan paketler. Olar Apache-2.0 ygtyýarnamasy bilen hemmä açyk we gurama öz resminama beriş ýa-da barlag programmasyny şu paketler bilen gurup biler. Beýleki topar #{strong[ýerleşdirilen salgylanma hyzmatlarydyr]}: toruň özüniň işledýän resminama beriş hyzmaty, Gurama konsoly, Tamga Verify, şahsyýet hyzmaty, sanaw çap ediji we katalog. Kitaphanalar açyk, ýerleşdirilen hyzmatlar operatorda; ýöne düzgünler ikisi üçin hem birmeňzeş (FW-ARF-0001 §4.1). Gurama ýerleşdirilen hyzmaty ulanmaga borçly däl.

Tablisa 8 hyzmatlary salgylary bilen bilelikde berýär. Bu neşir taýýarlanan wagty tablisadaky hyzmatlaryň hemmesi işjeň (#{strong[Işleýär]}); #{raw("*.sandbox.tamga.network")} salgysyndaky synag nusgalary hem şeýle.

#tablo([#{strong[Tablisa 8.]} Komponentler, olaryň wezipeleri we hyzmat salgylary.], (20fr, 48fr, 48fr), ([Komponent], [Wezipe], [Salgy​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​],), (
  ([Tanyşdyryş saýty], [Toruň tanyşdyrylyşy; kök açarlaryň barmak yzlary], [#{raw("tamga.network")} (#{raw("/trust-anchor")})],),
  ([Çarçuwa resminamalary], [Tamga ARF we onuň goşmaçalary], [#{raw("arf.tamga.network")}],),
  ([Işläp düzüjiler üçin resminamalar], [Gollanmalar, düşünjeler, spesifikasiýalar, karar ýazgylary], [#{raw("docs.tamga.network")}],),
  ([Ynam sanawy çap ediji], [Sanawlaryň sanawy, ýurt sanawlary, labyr žurnaly, arhiw], [#{raw("trust.tamga.network")}],),
  ([Resminama görnüşleriniň katalogy], [Resminama görnüşleriniň kesgitlemeleri we shemalary, üýtgemeýän faýllar], [#{raw("schemas.tamga.network")}],),
  ([Ýerleşdirilen resminama beriş hyzmaty], [Guramalaryň adyndan OpenID4VCI bilen resminama bermek, ýatyrylyş sanawyny çap etmek], [#{raw("issuer.tamga.network/{gurama}")}],),
  ([Ýatyrylyş sanawlary], [Resminamalaryň ýagdaý sanawlary], [#{raw("status.tamga.network")}],),
  ([Gurama konsoly], [Gurama işgärleriniň resminamalary, ýazgylary, açarlary dolandyrýan ekrany], [#{raw("console.tamga.network")}],),
  ([Tamga Verify], [Ýerleşdirilen araçy barlaýjy], [#{raw("verify.tamga.network")}],),
  ([Şahsyýet hyzmaty], [Wagtlaýyn şahsyýet resminamasy; lakam tohumy], [#{raw("id.tamga.network")}],),
  ([Sandbox], [Şol bir hyzmatlaryň aýratyn kök bilen işleýän synag nusgalary], [#{raw("*.sandbox.tamga.network")}],),
))

Tablisanyň aşagyna bir düzgün goşmak gerek. #{strong[Domen ady hyzmatyň salgysydyr, belgi däldir]} (FW-ARF-0001 §4.2). Gurama ýerleşdirilen hyzmatdan öz domen adyndaky hyzmata geçende, ynam sanawyndaky ýazgysynda diňe salgy üýtgeýär; guramanyň belgisi we beren resminamalary üýtgemeýär. Guramanyň belgisi guramanyň sertifikatyndan alynýar (6.7-nji bölüm). Bu düzgün iki zady birden goraýar. Guramany ýerleşdirilen hyzmata bagly bolmakdan halas edýär (G10) we toruň domen atlarynyň bir gün gazna tabşyrylmagynyň hiç bir resminama täsir etmezligini üpjün edýär (G8).

Surat 6 komponentleri we olaryň arasyndaky akymlary görkezýär. Oklaryň üstündäki protokol atlary indiki bölümlerde bir-birden açylýar.

#sekil(6, [Komponentler we maglumat akymy], "figures/wp-tk/sekil-6.svg", yarim: false)

== Tor we gapjyklar

Ynam torunyň gapjyklar bilen gatnaşygy daşyndan seredýän üçin köplenç iň bulaşyk temadyr. Tamga-nyň bu babatdaky karary bir sözleme sygýar: tor gapjyk işletmeýär, #{strong[gapjyklary sanaýar]} (ADR-0042).

Toruň gapjyklar bilen gatnaşygy üç zatdan ybarat. Birinjisi düzgünlerdir: gapjygyň açarlary nähili saklajakdygy, razylyk ekranynda nämäni görkezjekdigi, taryhy nirede saklajakdygy ýaly düzgünler spesifikasiýada we çarçuwa resminamalarynda ýazylan (13-nji bölüm). Ikinjisi açyk paketlerdir: gapjyk işläp düzüjisi resminama almak, ýerli barlag geçirmek we resminama görkezmek üçin toruň gapjyk ýadrosy paketini ulanyp biler. Üçünjisi ynam sanawyndaky #{strong[gapjyk üpjün edijisiniň ýazgysydyr]}. Sanawlaryň sanawyndaky #{raw("wallet_providers[]")} meýdany tanalýan her gapjyk üpjün edijisiniň belgisini, gol sertifikatlaryny we gapjyk çözgütlerini göterýär. Resminama beriji resminamany bermezden öň gapjygyň hödürleýän tassyklamasynyň şu sanawdaky üpjün edijiden gelýändigini ýa-da gelmeýändigini barlaýar; sanawda ýok üpjün edijiniň gapjygyna resminama berilmeýär (9.3-nji bölüm).

Tor näme üçin öz gapjygyny işletmeýär? Karar ýazgysy muny ÝB-niň rol aýrylyşy bilen esaslandyrýar: ÝB gurluşynda her gapjygy ony hödürleýän gurama işledýär we ynam çarçuwasy gapjyk üpjün edijilerini diňe sanaýar. Tor gapjygyň üpjün edijisini özi işletse, bitaraplygy bozulardy; gazna tabşyrylan güni hem gapjygyň hyzmaty tora bagly galardy. Seredilen beýleki wariant gapjyklar üçin aýratyn synag gurşawyny gurmakdy; bu hem ret edildi, sebäbi şol bir guramalar, barlaýjy we düzgünler iki gezek gurlan bolardy. Sandbox ýeke-täk we tora degişli: gapjyk işläp düzüjisi öz üpjün edijisini sandbox sanawyna hasaba aldyrýar we gapjygyny şol ýerdäki nusga guramalar, şahsyýet hyzmaty we barlaýjy bilen synaýar. Toruň domen atlarynda gapjyga degişli hiç bir hyzmat işlemeýär.

Toruň ynam sanawyna giren ilkinji gapjyk Tamga Wallet; ol aýratyn önüm hökmünde öz ammarynda ösýär, üpjün ediji hyzmatyny öz domen adynda işledýär we sanawa beýleki her gapjygyň girjek ýoly bilen, şol bir düzgünler bilen girdi. Üpjün edijiniň ýazgysy hakyky toruň we sandbox-yň sanawlarynda işjeň (#{strong[Işleýär]}; FW-ARF-0001 §2.8). Toruň interfeýsleri we resminamalary ýeke gapjygy öňe çykarmaýar; bu resminama hem mundan beýläk gapjyklary umumy at bilen agzaýar.

Sanawda bolmagyň adama görünýän netijesi hem bar. ÝB-niň gapjyklar üçin kesgitlän ynam nyşany ÝB-den daşarda ulanylyp bilinmeýändigi sebäpli tor öz sanawyndaky gapjyklar üçin ýazuw görnüşindäki görkeziji kesgitleýär: "Tamga Network-de sanawda" (ADR-0049). Görkezijiniň logotipi ýok; ÝB ýyldyzlary, ÝB reňkleri ýa-da "ynam nyşany" sözi ulanylmaýar. Adam görkezijä degende gol çekilen sanawdaky üpjün edijiniň ýazgysyny görýär; gapjyk birligi ýatyrylsa ýa-da üpjün ediji sanawdan çyksa, görkeziji gizlenýär (13.6-njy bölüm).

== Ugur düzgünleri

Komponentleriň biri-birine nähili baglanýandygy ýaly, maglumatyň haýsy ugurda akýandygy hem howpsuzlyk we gizlinlik kararydyr. Esasy çarçuwa resminamasy muny dört gysga düzgün bilen berkidýär (FW-ARF-0001 §4.5).

+ #{strong[Ynam sanawlaryna diňe sanaw çap ediji ýazýar.]} Resminama beriş hyzmatlary sanawa ýazyp bilmeýär; diňe labyr žurnalyna ýazgy goşulmagyny haýyş edip bilýär. Bu düzgün resminama beriş hyzmaty ele geçirilen ýagdaýynda-da hüjümçiniň özüni sanawa ygtyýarly gurama hökmünde goşup bilmezligini üpjün edýär.
+ #{strong[Okaýanlar sanawy barlamazdan ulanmaýar.]} Barlaýjylar we gapjyklar hiç bir sanaw ýazgysyny onuň goluny, wersiýa zynjyryny we täzeligini barlamazdan ulanmaýar. Açyk paketler bu barlaglary taýýar ýerine ýetirýär; ähli müşderiler ynam soraglaryny ýeke-täk interfeýs arkaly berýär (ADR-0015; 6.6-njy bölüm). Şeýlelikde sanawyň yza aýlanan köne wersiýasy ýa-da gol çekilmedik nusgasy sessiz kabul edilip bilinmeýär.
+ #{strong[Ýatyrylyş sanawy her barlagda göçürilmeýär.]} Barlaýjy ýatyrylyş sanawlaryny öňünden we toptan alýar. Bu düzgün 2.3-nji bölümdäki "öýe jaň etmek" meselesine arhitekturanyň jogabydyr: barlaýjy resminamany barlanda resminama berijä ýa-da onuň serwerine şol resminama üçin haýyş ibermeýär, şonuň üçin beriji gurama haýsy resminamanyň haçan barlanandygyny bilip bilmeýär (12.4-nji bölüm).
+ #{strong[Hiç bir Tamga hyzmaty IP salgysyny ýazga almaýar.]} Žurnallarda resminama meýdanlarynyň bahalary we resminamanyň ýatyrylyş sanawyndaky orny hem ýok. Bu düzgün P2-niň hyzmat žurnallaryna ulanylyşydyr: žurnal adamy tanatmaga ýeterlik hiç bir yzy götermeli däl.

Bu dört düzgün bilelikde okalanda toruň bütin arhitekturasynyň gysgaça beýanyny berýär. Ynam ýeke ugurdan, gol çekilen neşirlerden gelýär. Okaýan tarap hemme zady özi barlaýar. Barlag wagtynda çeşmeden soralmaýar. Umumy ýazgylar bolsa adamy tanamaýar. Indiki bölümler bu karkasyň her bölegini jikme-jikleşdirýär: 6-njy bölüm ynam sanawlaryny we labyr žurnalyny, 7-nji bölüm gurama sertifikatlaryny, 8-nji bölüm resminama görnüşlerini beýan edýär.

= Ynam Modeli: Gol Çekilen Ynam Sanawlary we Labyr Žurnaly

Timur Stambuldaky bir kompaniýanyň işe almak boýunça jogapkäri. Onuň stolunyň üstüne arza gelýär; arza beren Aýnur diplomyny kagyz görnüşinde däl-de, telefonyndan iberipdir. Timuryň programmasy resminamany açýar we goluň dogrudygyny aýdýar. Timuryň aňyna ilki gelýän sorag bolsa gol bilen bagly däl: "Bu goly çeken Mysal uniwersiteti hakykatdanam uniwersitetmi, diplom bermäge ygtyýarlymy, häzir henizem işleýärmi?" Bu bölüm Tamga Network-iň bu soraga nähili jogap berýändigini beýan edýär. Jogabyň merkezinde iki gurluş bar: hemmäniň göçürip alyp barlap bilýän gol çekilen #{strong[ynam sanawlary]} (#{emph[trust lists]}) we bu sanawlaryň ýanynda saklanýan, sagatma-sagat öňe gidýän #{strong[labyr žurnaly]} (#{emph[anchor log]}). Häzir tordaky ähli ynam şu iki gurluşa daýanýar; umumy kitabyň (zynjyryň) kody ýazylan we synagdan geçirilen hem bolsa, ol önümçilikde ýok we ýapyk, ikinji garaşsyz operator bolmasa-da açylmaýar (19-njy bölüm).

== Gol nämäni subut edýär, sanaw nämäni subut edýär

Sanly gol ýeke zady subut edýär: resminama belli bir gizlin açaryň eýesi tarapyndan gol çekildi we şol pursatdan bäri üýtgemedi. Goly barlaýan programmanyň elinde diňe açyk açar bar; bu açaryň "Mysal uniwersitetine" degişlidigini goluň özi aýdyp bilmeýär. Hüjümçi hem goly döwmäge synanyşmaýar; barlaýja öz açaryny dogry açar ýaly kabul etdirmäge synanyşýar. Şonuň üçin her ynam infrastrukturasyna ikinji gatlak gerek: açar bilen guramanyň arasyndaky baglanyşygy gurýan we şol guramanyň näme üçin ygtyýarlydygyny aýdýan ýazgy. Tapgyryň altynjy makalasy \[71\] bu meseläniň taryhyny we ÝB-däki çözgüdini jikme-jik beýan edýär; bu ýerde Tamga-nyň saýlan ýoluny yzarlaýarys.

Tamga-da bu ýazgy gol çekilen sanawdyr. Sanaw "şu sertifikatyň eýesi şu guramadyr, şu görnüşleri şu seneden bäri bermäge ygtyýarlydyr, häzirki ýagdaýy şeýledir" diýýär. Barlaýjy guramaga jaň etmeýär; sanawy öňünden göçürip alypdyr. Tertip ÝB-niň ynam sanawy modeli bilen birmeňzeş (FW-ARF-0001 §6.1); tapawudy Tamga-da häzir sanawy döwletiň adyndan wagtlaýyn toruň çap etmegi we munuň sanawda aç-açan ýazylmagydyr.

== Sanawlaryň sanawy we ýurt sanawlary

Ynam iki gatlakly faýl tertibinde durýar (Surat 7). Çap edilýän faýllar Tablisa 9-da jemlenen. Iň ýokarda #{strong[sanawlaryň sanawy]} (#{raw("lotl")}, #{emph[List of Trusted Lists]}) bar. Bu faýl her ýurt sanawynyň salgysyny, şol sanawa gol çekmäge ygtyýarly açarlary we ýurduň ykrar sazlamalaryny görkezýär. Tor derejesinde umumy bolan ýazgylar hem şu ýerde: toruň umumy resminama görnüşleri we katalog salgysy, tanalýan gapjyk üpjün edijileri, kabul edilen nol bilimli subutnama zynjyrlary we kategoriýa sözlügi. Adamyň şahsyýet maglumatlarynyň üpjün edijileri (PID) üçin goýlan meýdan boş; Tamga PID bermeýär (SPEC-TRUST-0001 §3, TL8).

Aşakda #{strong[ýurt sanawlary]} (#{raw("tl-<cc>")}) bar. Ýurt sanawy şol ýurduň kök sertifikatlaryny, resminama berijilerini (synplary, kepillik derejeleri we haýsy görnüşleri bermäge ygtyýarlydyklary bilen), hasaba alnan barlaýjylaryny we milli resminama görnüşlerini göterýär (SPEC-TRUST-0001 §4). Her ýurt orny ÝB arhitekturasyndaky rollaryň her biri üçin aýratyn orun saklaýar: sanaw operatory, hasaba alyş edarasy, adamyň şahsyýet maglumatlarynyň üpjün edijisi, giriş sertifikaty üpjün edijisi we milli kök sertifikat edarasy. Rol boş galsa-da, onuň orny bar.

Häzir diňe Türkiýäniň orny işjeň. Türki Döwletleriň Guramasynyň agzalary Azerbaýjan, Gazagystan, Gyrgyzystan we Özbegistan üçin hem-de synçylar Wengriýa we Türkmenistan üçin sanawlaryň sanawynda orun goýuldy; bu hiç bir döwlet bilen ylalaşygyň ýa-da gepleşigiň habarnamasy däldir. Şonuň üçin Aýnuryň Bakuwda alan bakalawr diplomyny häzir tor arkaly barlap bolmaýar; Azerbaýjanyň orny döwlet goşulyp, öz sanawyny çap edende dolar. Türkiýe sanawynyň #{raw("operator")} meýdany operatoryň wagtlaýyndygyny (#{raw("status: \"provisional\"")}) we kimiň adyndan işleýändigini (#{raw("on_behalf_of")}) ýazga geçirýär; bu meýdany boş goýup bolmaýar (TL1). Her sanaw mundan başga-da #{raw("environment")} meýdanynda #{raw("production")} ýa-da #{raw("sandbox")} ýazýar; hakyky tora baglanan gapjyk sandbox sanawyny ýüklemeýär (ADR-0038).

#sekil(7, [Sanawlaryň sanawy, ýurt sanawlary we ýazgylar], "figures/wp-tk/sekil-7.svg", yarim: false)

#tablo([#{strong[Tablisa 9.]} #{raw("trust.tamga.network")} salgysynda çap edilýän esasy faýllar (SPEC-TRUST-0001 §2).], (48fr, 48fr, 19fr), ([Faýl​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Mazmuny], [Ýagdaýy],), (
  ([#{raw("lotl.jws")} (#{raw("lotl.json")} okalýan nusga)], [sanawlaryň sanawy: ýurt orunlary we olaryň gol çekijileri, umumy görnüşler, gapjyk üpjün edijileri, ZK zynjyrlary], [işleýär],),
  ([#{raw("tl-tr.jws")} (#{raw("tl-tr.json")})], [Türkiýe: kök sertifikat, resminama berijiler we olaryň ygtyýarlary, barlaýjylar we gapy toparlary], [işleýär],),
  ([#{raw("tl-<cc>.jws")}], [beýleki ýurt orunlary; häzir boş, diňe orun goýuldy], [goýlan orun],),
  ([#{raw("anchors.jsonl")}], [labyr žurnaly: her setir aýratyn gol çekilen, azyndan sagatda bir setir], [işleýär],),
  ([#{raw("keys/root-fingerprints.json")}], [sanawlaryň sanawyna gol çekýän sertifikatyň we milli köküň barmak yzlary], [işleýär],),
  ([#{raw("wrprc/")}, #{raw("status/wrprc/")}], [hasaba alyş sertifikatlary we olaryň 1 bitlik ýagdaý sanawy (7.5-nji bölüm)], [işleýär],),
  ([#{raw("zk/<zynjyr>")}], [sanawda ady agzalýan ZK zynjyr faýllary], [işleýär],),
  ([#{raw("lote/<görnüş>.jws")}], [ETSI TS 119 602 görnüşleri (6.8-nji bölüm)], [meýilleşdirilen (öndüriji taýýar, çap etmek sazlama bilen açylýar)],),
  ([#{raw("tl-<cc>.xml")}, #{raw("tl-<cc>.sha2")}], [ETSI TS 119 612 XML görnüşi (6.8-nji bölüm)], [sandbox-da işleýär, hakyky torda meýilleşdirilen],),
  ([#{raw("archive/")}], [sanawyň her köne wersiýasy we žurnal arhiwi; hiç zat pozulmaýar], [işleýär],),
  ([#{raw("CHANGELOG.md")}], [hemmä açyk üýtgeşmeler žurnaly], [işleýär],),
))

#kutu("teknik", [Resminama berijiniň ýazgysy nähili görünýär])[
Ýurt sanawyndaky her resminama beriji ýazgysy birnäçe hemişelik meýdany göterýär: guramanyň belgisi we sertifikatynyň barmak yzy, synpy we kepillik derejesi, haýsy resminama görnüşleri üçin haýsy sene aralygynda ygtyýarlydygy, ýatyrylyş sanawlarynyň salgy köki we ýagdaý taryhy. ÝB-niň umumy hasaba alyş maglumat toplumy (resmi ady, belgisi, salgysy, aragatnaşyk maglumatlary, maglumat goraýyş edarasy) hem şol bir ýazgyda (ADR-0024). Aşakdaky mysal oýlanyp tapylan Mysal uniwersiteti üçin we gysgaldyldy. #{raw("issuer_id")} bilen barmak yzy bu resminama üçin döredilen nusga P-256 sertifikatyndan hakykatdanam hasaplandy; #{raw("schema_id")} bahalary ýazylan günündäki katalogdan alyndy we täzeden hasaplanyp barlandy. Bahalar mysaldyr.

#kod("json", "{
  \"issuer_id\": \"0xe41abbb087864814f3de55b27c9ce923537485bcc08e349c7c0b2209e8db1b60\",
  \"slug\": \"example-university\",
  \"legal_name\": \"Örnek Üniversitesi\",
  \"category\": \"EDUCATION\",
  \"assurance\": \"I2\",
  \"class\": \"EAA\",
  \"cert_fingerprint_sha256\": \"fb58ea8de393d34d2b73ce7672a08c3e2908028edbd5fce9a4c10fb4ad2577ce\",
  \"issuer_url\": \"https://issuer.tamga.network/example-university\",
  \"status\": \"ACTIVE\",
  \"valid_from\": \"2026-09-01T00:00:00Z\",
  \"status_history\": [
    { \"status\": \"ACTIVE\", \"since\": \"2026-09-01T00:00:00Z\", \"reason\": \"initial-registration\" }
  ],
  \"schema_authorizations\": [
    { \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
      \"schema_id\": \"0x9d6d0e873ee0466cf1cdc8a8bd73f9435022635f0b6e46cd478e70f6e6aed26b\",
      \"allowed\": true, \"valid_from\": \"2026-09-01T00:00:00Z\", \"valid_until\": null }
  ],
  \"identifiers\": [ { \"scheme\": \"TR-VKN\", \"value\": \"…\" } ],
  \"delegate_keys\": [ { \"fingerprint_sha256\": \"…\", \"purpose\": \"status_list\", \"status\": \"ACTIVE\" } ]
}", baslik: "Mysal: tl-tr içinden gysgaldylan resminama beriji ýazgysy")

Ygtyýar #{strong[wagt penjireli]}: #{raw("schema_authorizations")} her görnüş üçin başlangyç we islege bagly gutaryş senesini göterýär. Barlaýjy guramanyň resminamany beren pursatynda (#{raw("iat")}) bu görnüş üçin ygtyýarlydygyny ýa-da däldigini barlaýar. Şonuň üçin ýapylan uniwersitetiň öň beren diplomy güýjünde galýar; täze resminama bermek bolsa guramanyň ýagdaýy üýtgän pursatynda togtaýar (SPEC-TRUST-0001 §4; 11.3-nji bölüm).
]

== Sanaw düzgünleri

Gol çekilen bolmak ýeterlik däl; okyjy elindäki wersiýanyň iň täze we hakyky wersiýadygyna ynanyp bilmeli. Sanawlar munuň üçin birnäçe ýönekeý düzgüne eýerýär (FW-ARF-0001 §6.3; SPEC-TRUST-0001 §1, §8). Her sanawyň #{strong[wersiýa belgisi]} bar we bu belgi diňe artýar. Her täze wersiýa öňki wersiýanyň gol çekilen faýlynyň SHA-256 heşini #{raw("previous_version_hash")} meýdanynda göterýär; şeýlelikde wersiýalar zynjyr ýaly biri-birine baglanýar. Sanaw ýazgy #{strong[pozmaýar]}: gurama togtadylanda ýa-da sanawdan çykarylanda onuň ýazgysy ýerinde galýar, diňe ýagdaýyň üýtgemegi #{raw("status_history")} taryhyna goşulýar. Köne resminamalary diňe şeýle ýagdaýda olaryň berlen senesine görä bahalandyryp bolýar.

Sanawlaryň #{strong[täzelik tertibi]} bar. Her sanaw indiki täzelenme senesini (#{raw("next_update")}) göterýär we bu sene iň köp 90 gün soň bolýar; üýtgeşme bolmasa-da, sanaw bu möhletiň içinde täzeden gol çekilýär. Üýtgeşme bolsa iň giç 24 sagadyň içinde çap edilýär. Senesi geçen ýa-da elýeterli bolmadyk sanaw bilen edilen barlag ne "kabul", ne-de "ret" döredýär; netije "barlap bolmady" (TL5); Timur üçin "bu diplom ýasama" bilen "häzir barlap bilemok" şol bir zat däl (11.4-nji bölüm). Ýükleýji tanamaýan görnüş wersiýasynda hem togtaýar, ony sessiz nädogry düşündirmeýär (TL6).

Sanaw we labyr žurnaly goly üçin düzgün #{strong[azyndan iki süýşýän sertifikaty]} talap edýär: açaryň çalşylmagy azyndan 30 gün öňünden yglan edilýär we täze açar köne açar bilen gol çekilip tanyşdyrylýar (TL3). Ýazylan güni çap edilen sanawlarda ýeke gol sertifikaty işjeň; ikinji sertifikatyň işe girizilmegi we gol açarynyň enjam açar ammaryna geçirilmegi spesifikasiýada açyk iş hökmünde ýazga alnan (SPEC-TRUST-0001, Açyk meseleler 3). #{emph[Ýagdaýy: meýilleşdirilen.]} Her üýtgeşme mundan başga-da hemmä açyk üýtgeşmeler žurnalyna ýazylýar.

#kutu("teknik", [Wersiýa zynjyry we yza aýlamagyň tutulmagy])[
Barlaýjy her sanawyň iň soňky kabul eden wersiýasyny we şol wersiýanyň heşini ýatda saklaýar. Täze gelen wersiýa üç düzgüne görä bahalandyrylýar (paketlerdäki #{raw("TrustSource")} ýükleýjisi, TL2):

#formul[$ h_n &= "SHA-256"("sanaw"_n ".jws") \
"prev"("sanaw"_(n+1)) &= h_n \
v_"gelen" < v_"bilinýän" &=> "ret (yza aýlamak)" \
v_"gelen" = v_"bilinýän" " we " h_"gelen" != h_"bilinýän" &=> "ret (şol bir wersiýa, başga mazmun)" $]

Heş sanawda #{raw("sha256:")} öňüşekilli on altylyk setir hökmünde ýazylýar. Hüjümçi barlaýja köne sanawy, meselem guramanyň heniz togtadylmadyk wersiýasyny hödürlese, wersiýa belgisi yzda galandygy üçin sanaw ret edilýär. Wersiýa belgisini üýtgetmek goly bozýar; goly täzeden çekmek üçin bolsa sanawlaryň sanawynyň gol açary gerek.
]

== Labyr žurnaly

Torda sanawlardan has ýygy üýtgeýän iki zat bar: birnäçe minutda bir gezek täzeden çap edilýän guramalaryň ýatyrylyş sanawlary (12.5-nji bölüm) we resminama görnüşleriniň kesgitlemeleri. Olary ýurt sanawyna ýazmak sanawy çişirerdi; şonuň üçin Tamga ikinji gurluşy saklaýar: #{strong[labyr žurnaly]} (#{raw("anchors.jsonl")}).

Žurnalyň her setiri özbaşdak gol çekilen JWS-dir. Setir tertip belgisini (#{raw("seq")}), öňki setiriň SHA-256 heşini (#{raw("previous_hash")}), wagt belligini we görnüşi göterýär. Dört görnüş bar (SPEC-TRUST-0001 §5): ýatyrylyş sanawynyň çap edilmegi (#{raw("status_list")}: haýsy guramanyň haýsy sanawy, näçenji wersiýa, mazmunyň heşi), resminama görnüşi kesgitlemesiniň heşi (#{raw("schema")}), sagatlyk ýaşaýyş alamaty (#{raw("heartbeat")}) we arhiwlenende ýazylýan barlag nokady (#{raw("checkpoint")}). Žurnala sagatda azyndan bir setir düşýär; üýtgeşme bolmasa-da ýaşaýyş alamaty ýazylýar. Setirler pozulmaýar, žurnal hemmä açyk we setirlerde şahsy maglumat ýa-da resminama heşi ýok (TL11). Žurnalyň gol açarlary hem sanawlaryň sanawynda çap edilýär.

Žurnalyň peýdaly ýeri ýatyrylyş sanawlarynyň yza aýlanmagyny tutmakdyr. Aýdaly, kimdir biri ýatyrylan resminamany ulanmak üçin barlaýja şol ýatyrylyşdan öňki ýatyrylyş sanawyny hödürleýär. Sanaw guramanyň goluny göterýändigi üçin gol dogry. Ýöne labyr žurnaly şol sanawyň soňky wersiýasynyň belgisini we mazmun heşini ýazga alypdyr; barlaýjy alan sanawynyň heşini žurnaldaky heş bilen deňeşdirýär we gabat gelmeýän sanawy ulanmaýar (SPEC-TRUST-0001 §5; barlag hatarynda D ädimi). Žurnalyň özi hem sagatlyk yzygiderlik bilen köneligiň öňünden goralýar: soňky setiri aşa köne bolan žurnal sanawy köne hasaplaýar (Surat 8).

Žurnal ulaldygyça ýükleme wagty uzalýar. Şonuň üçin belli bir çäkde setirler arhiwe geçirilýär we täze žurnal arhiwiň soňky setirine we arhiw faýlynyň heşine baglanan, arhiwiň döreden soňky ýagdaýyny göterýän gol çekilen barlag nokady bilen başlaýar. Zynjyr kesilmeýär, setir pozulmaýar, doly taryhy arhiwlerden täzeden gurup bolýar (TL12). #{emph[Ýagdaýy: işleýär.]}

#sekil(8, [Heş zynjyrly sanaw wersiýalary we labyr žurnaly: yza aýlanan neşir nähili tutulýar], "figures/wp-tk/sekil-8.svg", yarim: false)

#kutu("teknik", [Labyr žurnalyndan bir setir])[
Aşakdaky setir guramanyň ýatyrylyş sanawynyň çap edilmeginiň žurnala nähili ýazylýandygyny görkezýär. Görnüş hakyky žurnaldaky bilen birmeňzeş; bahalar mysaldyr we gysgaldyldy. Sanaw salgysy (#{raw("list_uri")}) aç-açan däl: guramany, ýyly ýa-da talyp toparyny aýan etmeýär (S8).

#kod("json", "{
  \"seq\": 51588,
  \"previous_hash\": \"sha256:73f6842108c0…a694c408\",
  \"ts\": \"2026-11-03T23:10:06Z\",
  \"kind\": \"status_list\",
  \"list_id\": \"0x…4101234c731b7165\",
  \"issuer_id\": \"0xe41abbb0…e8db1b60\",
  \"list_uri\": \"https://status.tamga.network/4101234c731b7165\",
  \"content_hash\": \"sha256:f037c5749daa…e9f4851d50\",
  \"list_version\": 15294
}", baslik: "Mysal: labyr žurnalynda ýatyrylyş sanawynyň çap edilmegi (JWS ýüki, açylan)")
]

== Aýratyn ýoldaky ynam labyry

Bu zynjyryň hemmesiniň başlangyç nokady bolmaly. Gapjyk we barlaýjy ilkibaşdan diňe #{strong[bir zada]} ynanýar: sanawlaryň sanawyna gol çekýän sertifikatyň barmak yzyna. Bu baha #{strong[ynam labyry]} (#{emph[trust anchor]}) diýlip atlandyrylýar. Galan hemme zady, ýagny ýurt sanawlarynyň gol çekijilerini, guramalary, barlaýjylary we gapjyk üpjün edijilerini goly şu labyra baglanýan sanawlar aýdýar.

Labyr sanawlaryň özünden aýratyn ýol bilen (#{emph[out-of-band]}) çap edilýär. Şol bir baha üç ýerde birmeňzeş görnüşde görünýär: tanyşdyryş saýtynyň ynam labyry sahypasy (#{raw("tamga.network/trust-anchor")}), ynam sanawy saýtyndaky açar faýly (#{raw("keys/root-fingerprints.json")}) we gatnaşyk şertnamalary (FW-ARF-0001 §6.1); üç ýeri birden üýtgetmek ýeke ýeri üýtgetmekden has kyn. Sanawdaky gapjyklar bu barmak yzyny programmanyň içinde berkidýär. Sandbox-yň aýratyn köki bar we hakyky tordaky hiç bir gapjyk ýa-da barlaýjy oňa ynanmaýar (ADR-0038).

== Ýeke-täk interfeýs: TrustSource

Sanawlary okamak gol, wersiýa zynjyry, täzelik, görnüş wersiýasy we labyr žurnaly düzgünleriniň bilelikde ulanylmagyny talap edýär; olary her müşderide aýratyn ýazmak biri-birinden tapawutlanýan amala aşyrylyşlary döredýär. Şonuň üçin Tamga ähli ynam soraglarynyň ýeke-täk interfeýs arkaly berilmegini karara baglady (ADR-0015): #{raw("TrustSource")}. Resminama beriş hyzmaty, barlaýjy, şahsyýet hyzmaty we gapjyk şol bir soraglary şol bir interfeýse berýär: "Bu gurama bu resminamany beren senesinde kabul edilip bilinýärmi?", "Bu görnüş üçin ygtyýarlymydy?", "Bu barlaýjynyň ýazgysy näme?", "Bu açar sanawdaky gapjyk üpjün edijisine degişlimi?", "Sanawlar näderejede täze?" (SPEC-TRUST-0001 §6). Interfeýsden daşarda hiç bir komponent sanaw faýllaryny düşündirmeýär (TL4).

Interfeýsiň jogaby üç bahaly: #{raw("YES")}, #{raw("NO")} ýa-da #{raw("UNKNOWN")}. Näbelli jogap barlagda "barlap bolmady" netijesine öwrülýär; hiç haçan ret ýaly görkezilmeýär. Interfeýsiň ikinji peýdasy geljege gönükdirilen: häzir onuň aňyrsynda gol çekilen sanawlar bar, umumy kitap gurulsa, şol bir interfeýsiň aňyrsyna kitap girýär we gapjygyň, barlaýjynyň ýa-da resminama beriş hyzmatynyň kody üýtgemeýär (19.8-nji bölüm).

Karar kabul edilende üç alternatiwa ölçeldi: gapjygyň sanawy öz kodunda aýratyn barlamagy (iki amala aşyrylyş wagtyň geçmegi bilen tapawutlanardy), gapjyga serwer kitaphanalaryny göterýän uýgunlaşdyrmalary goşmak (döwük-ýenjikdi) we gapjygyň her ynam soragyny toruň serwerine bermegi. Iň soňkusy iň aňsadydy we ret edildi: şol serwer haýsy gapjygyň haýsy guramany haçan soranyny bilerdi. Saýlanan ýolda barlag ýadrosy platformadan garaşsyz kiçi paketdir we sanawlar toptan alynýar; müşderi tora adama baglanyp bilinjek jaň etmeýär (ADR-0015, TS3 \[12\]).

== Belgiler

Ynam torunda atlar üýtgäp, domen atlary el çalşyp, operatorlar tabşyrylyp biler. Belgiler bulardan täsirlenmeli däl. Şonuň üçin Tamga-daky hemişelik belgiler sertifikatlaryň we görnüş atlarynyň özünden alynýar; guramanyň ady ýa-da toruň domen ady bu hasaba girmeýär (FW-ARF-0001 §5.3; SPEC-ID-0002 §2).

#kutu("teknik", [Belgileriň alnyşy])[
Kök sertifikat we gurama belgileri ýurt kodunyň UTF-8 baýtlary bilen sertifikatyň DER kodlamasynyň SHA-256 heşi yzly-yzyna birikdirilip, Keccak-256 bilen heşlenip alynýar. Resminama görnüşiniň belgisi görnüş adynyň (#{raw("vct")}) özüniň Keccak-256 heşidir:

#formul[$ "ca_id" &= "keccak256"("utf8"("cc") || "SHA-256"("DER"("kök sertifikat"))) \
"issuer_id" &= "keccak256"("utf8"("cc") || "SHA-256"("DER"("gurama sertifikaty"))) \
"schema_id" &= "keccak256"("utf8"("vct")) $]

Bu ýerde $||$ yzly-yzyna birikdirmegi aňladýar. Mysal bahalar bilen: 6.2-nji bölümdäki ýazgyda gurama sertifikatynyň barmak yzy #{raw("fb58ea8d…2577ce")}, ýurt kody #{raw("TR")} bolanda #{raw("issuer_id = 0xe41abbb0…e8db1b60")} çykýar. Diplom görnüşiniň ady #{raw("urn:tamga:edu:DiplomaCredential:1")} üçin #{raw("schema_id = 0x9d6d0e87…e6aed26b")} çykýar; bu baha katalogdaky ýazgy bilen birmeňzeş.

Näme üçin SHA-256 däl-de, Keccak-256? Umumy kitap gurlanda belgiler kontraktlardaky ýazgylaryň açary bolar we EVM gurşawynda içine gurlan heş funksiýasy Keccak-256-dyr. Sanaw tapgyrynda alnan belgi kitap tapgyrynda asla üýtgemezden şol bir ýazgynyň açary bolýar (SPEC-TRUST-0001 §7; 19-njy bölüm).
]

#tablo([#{strong[Tablisa 10.]} Belgiler: nähili emele gelýär, haçan üýtgeýär (FW-ARF-0001 §5.3).], (28fr, 40fr, 40fr), ([Belgi], [Nähili emele gelýär], [Haçan üýtgeýär],), (
  ([Kök sertifikatyň belgisi (#{raw("ca_id")})], [ýurt kody + kök sertifikatyň barmak yzy], [kök üýtgese],),
  ([Guramanyň belgisi (#{raw("issuer_id")})], [ýurt kody + gurama sertifikatynyň barmak yzy], [sertifikat täzelenende; täze ýazgy köne ýazga mirasdüşer (#{raw("successor_id")}) hökmünde baglanýar],),
  ([Resminama görnüşiniň belgisi (#{raw("vct")}, #{raw("schema_id")})], [#{raw("urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa>")} we onuň heşi], [diňe esasy wersiýa üýtgände],),
  ([Barlaýjynyň müşderi belgisi (#{raw("client_id")})], [giriş sertifikatynyň heşi (#{raw("x509_hash")})], [sertifikat täzelenende],),
  ([Barlaýjynyň hemişelik ýazgysy (#{raw("dns_name")})], [hasaba alyşdaky domen ady], [üýtgemeýär; nusgalar we lakamlar oňa baglanýar],),
  ([Adam], [global belgi ýok], [resminama başyna enjam açary, barlaýjy başyna nusga, saýt başyna lakam],),
))

Sertifikat täzelenende guramanyň belgisiniň üýtgemegi belginiň galplaşdyryp bolmaýandygynyň bahasydyr; dowamlylyk mirasdüşerlik baglanyşygy bilen üpjün edilýär we köne sertifikat bilen berlen resminamalar köne ýazga görä barlanmagyny dowam etdirýär (SPEC-ID-0002, XC2). Tabşyryşda diňe sanawyň #{raw("operator")} meýdany üýtgeýär; kök, gurama we görnüş belgileri üýtgewsiz galýar (SPEC-TRUST-0001 §1). Domen ady hyzmatyň salgysydyr, belgi däldir (FW-ARF-0001 §4.2).

== ETSI görnüşleri

ÝB-niň ynam sanawy ekoulgamy ýyllar bäri ETSI standartlary bilen işleýär. Tamga-nyň ygtyýarly çeşmesi öz JSON sanawlarydyr; ýöne şol bir mazmuny ÝB gurallarynyň okap biljek görnüşlerinde hem hödürlemek toruň ÝB bilen bilelikde işläp bilmeginiň tehniki şertidir. Iki görnüş kesgitlenen.

#{strong[ETSI TS 119 602 \[42\] (LoTE).]} ÝB gapjyk rollary üçin (gapjyk üpjün edijileri, resminama berijiler, giriş sertifikaty üpjün edijileri) JSON esasly "Lists of Trusted Entities" görnüşini ulanýar. Sanaw çap ediji Tamga sanawlaryndan bu görnüşde üç görnüş döredip bilýär; "agza döwlet tarapyndan habar berlen" manysyny göterýän ETSI salgylarynyň ýerine Tamga-nyň öz salgy köküni ulanýar we kwalifisirlenmedik resminama beriji üçin ETSI-de deňi ýoklugy sebäpli öz görnüş salgysyny ýazýar (SPEC-ID-0002 §8.1.1). Çap etmek çeşmede sazlama bilen açylýar. #{emph[Ýagdaýy: öndüriji taýýar; çap etmek meýilleşdirilen.]}

#{strong[ETSI TS 119 612 \[41\] (XML).]} ÝB-niň gol barlag gurallary we ÝB-den daşardaky ýurtlar üçin açylan aralyk ýol milli sanawy şu XML görnüşinde, XAdES \[53\] goly bilen talap edýär. Tamga bu görnüşi şol bir gol çekilen ýurt sanawyndan we #{strong[şol bir wersiýa belgisi bilen]} döredýär; XML-de JSON-da ýok hiç bir ýazgy bolup bilmeýär we ikisi gapma-garşy gelse, JSON güýjünde (ADR-0066, TX1). XML-de ÝB manysynda "kwalifisirlenen" ýa-da "habar berlen" diýen tassyklamany göterýän hiç bir ETSI salgysy ulanylmaýar; sanaw görnüşi, ýagdaý we düzgün salgylary Tamga köküne degişli we her XML faýly "910\/2014 \[1\] çäginde habar berlen sanaw däldir; sanawda kwalifisirlenen ynam hyzmaty ýok" duýduryşyny göterýär (TX2). XML-e aýratyn gol sertifikaty gol çekýär; bu sertifikat ETSI-niň sanaw gol profiline laýyk gelýär we JSON sanawlaryna gol çekip bilmeýär. Barlaýjylar XML-e girmeýär, sebäbi olar ynam hyzmaty üpjün edijisi däl; olaryň ýazgylary JSON sanawynda we hasaba alyş sertifikatlarynda.

Ret edilen wariantlar şulardy: çap etmegi yza süýşürmegi dowam etdirmek (döwlete gural hödürlemek wadasy boş galardy), XML-i aýratyn hasaba alyş kitabyndan döretmek (iki çeşme biri-birinden süýşerdi) we ETSI-niň "kwalifisirlenen" ýagdaý salgylaryny ulanmak (Tamga-nyň yglan edip bilmejek tassyklamasy). Tamga-nyň XML sanawy ÝB-niň üçünji ýurt sanawlaryna girmeýär; ol sanawlar döwletleriň gözegçilik edýän gol we möhür hyzmatlary üçin. Peýdasy türki döwleti öz sanawyny çap etmek islände synagdan geçen guralyň we şablonyň taýýar bolmagydyr (ADR-0066). #{emph[Ýagdaýy: sandbox-da çap edilýär (#{raw("trust.sandbox.tamga.network/tl-tr.xml")}, "TEST" bellikli wagtlaýyn salgylar bilen); hakyky torda sanawy işletjek gazna, poçta salgylary we gol çekiji bilen bilelikde meýilleşdirilen.]} Hukuk ykrar soragy 20-nji bölümde.

== Federasiýa: başganyň sanawy

Tamga-nyň ýurt sanawynyň eýesi bolmagy hökman däl. Döwlet, döwletiň ygtyýarlandyran guramasy ýa-da ÝB öz sanawyny çap edende sanawlaryň sanawy şol sanawy #{strong[görkeziji]} hökmünde görkezip biler (ADR-0036; FW-TF-0001 §6.1). Görkeziji dört maglumaty göterýär: sanawyň asyl salgysy, sanawa gol çekýän sertifikatlaryň Tamga-nyň gol çeken sanawlar sanawynda #{strong[berkidilen]} barmak yzlary, sanawyň haýsy rollar we haýsy resminama görnüşleri üçin kepil bolup biljekdigini aýdýan #{strong[çäk]} we sanawyň haýsy karar bilen goşulandygyny görkezýän #{strong[makullama]} ýazgysy (Surat 9).

Düzgünler gysga we berk. Gol çekijisi berkidilen barmak yzy bilen gabat gelmeýän daşky sanaw ýüklenmeýär (FD1). Daşky sanaw öz çäginden çykyp bilmeýär: diňe şahsyýet üpjün edijilerine kepil bolýan sanaw diplom berýän guramany goşup bilmeýär, goşsa-da, şol ýazgy hasaba alynmaýar (FD2). Her daşky sanawyň täzeligi aýratyn yzarlanýar: biri ýetmezçilikli ýa-da köne bolsa-da, Tamga sanawlary täsirlenmeýär, diňe şol sanawa bagly soraglar "näbelli" jogabyny berýär (FD3). Daşky sanawyň goşulmagy, üýtgemegi ýa-da çykarylmagy taslama dolandyryşynyň makullamagy bilen bolýar we ýazgyda ýazylýar (FD4). Toruň öz görnüşlerinde görnüş kesgitlemesiniň bitewilik heşi hökmany; daşky görnüşlerde (ÝB-niň adamyň şahsyýet maglumatlary ýa-da mobil sürüjilik şahadatnamasy ýaly) görnüşiň ynamy daşky sanawyň gol çekilen ýazgysyndan gelýär (FD5).

Saýlanan ýol ÝB-niň öz modelidir. Daşky ýazgylary Tamga sanawyna göçürmek olary Tamga-nyň goly bilen görkezerdi, eýeçiligi we tabşyryşy bulaşdyrardy; her barlaýjynyň daşky sanawlary özi saýlamagy bolsa ýeke-täk ynam labyryny ýok ederdi (ADR-0036). Paketler ETSI TS 119 602 we 119 612 görnüşindäki daşky sanawlary okaýar we ÝB-niň adamyň şahsyýet maglumatlary hem-de mobil sürüjilik şahadatnamasy görnüşlerini tanaýar. Mehanizmiň taýýar bolmagy bilen belli bir sanawa ynanylmagy aýry kararlardyr. #{emph[Ýagdaýy: mehanizm işleýär; häzir sanawlaryň sanawynda daşky sanaw ýok.]}

#sekil(9, [Federasiýa: başganyň sanawy sanawlaryň sanawynda görkezijidir], "figures/wp-tk/sekil-9.svg", yarim: false)

= Guramanyň Şahsyýeti we Sertifikatlar

Elif Mysal uniwersitetiniň talyplar bölüminde işleýär. Uniwersitet tora goşulanda Elifiň toparyna açar jübütini döretmek we diňe sertifikat haýyşyny ibermek tabşyrylýar; gizlin açar uniwersitetiň enjam howpsuzlyk modulyndan asla çykmaz. Birnäçe günden soň uniwersitetiň Türkiýe kök sertifikatyna baglanan sertifikaty bolýar we sertifikatyň barmak yzy ýurt sanawyna girýär. Bu bölüm bu sertifikatyň näme üçin X.509 \[28\] bolandygyny, onuň içinde nämäniň ýazylandygyny, barlaýjylaryň we hasaba alyş edarasynyň haýsy sertifikatlary ulanýandygyny we ýerleşdirilen hyzmatyň guramanyň açaryna degmezden goly nähili alýandygyny beýan edýär.

== Näme üçin X.509, näme üçin DID däl

Guramanyň şahsyýeti üçin iki dalaşgär bardy: tora mahsus merkezleşdirilmedik belginiň (#{raw("did:tamga")}) profili we guramalaryň eýýäm ulanýan X.509 sertifikatlary. Taslama dolandyryşy X.509-y saýlady we DID gurama profilini güýjünden düşürdi (ADR-0004). Guramalar elektron möhür we gol üçin eýýäm X.509 ulanýar we olaryň düzgünleşdiriji ýazgylary bar. "Şahsyýet kwalifisirlenen sertifikat bilen barlandy" sözleminiň kanunçylykda deňi bar; "DID bilen barlandy" sözleminiň heniz ýok. ÝB-niň kwalifisirlenen sertifikat we kwalifisirlenen gol döredýän enjam tertibi hem X.509-yň üstünde gurlan; şol bir binýady ulanmak ÝB bilen laýyklygy aňsatlaşdyrýar.

Şol bir karar adamlar üçin ters ugurdaky ýörelgäni goýýar: #{strong[adama global belgi berilmeýär.]} Hemişelik şahsyýet belgisi adamyň bilim, saglyk we iş gatnaşyklaryny bir sapaga düzerdi. Adam her gatnaşykda başga açar, başga nusga we gerek bolsa başga lakam bilen görünýär (Tablisa 10, soňky setir; 15-nji bölüm). Guramalaryň şahsyýeti bolsa, tersine, hemmäniň barlap biljek derejesinde açyk we hemişelik.

== Milli kök we wagtlaýyn operatorlyk

Her döwletiň öz milli kök sertifikaty bar we gurama sertifikatlary şu köke baglanýar. Barlaýjy resminamadaky goldan gurama sertifikatyna, ondan köke ýetýär; köküň barmak yzyny ýurt sanawynda gözleýär (SPEC-ID-0002 §1). Häzir Türkiýäniň köküni toruň wagtlaýyn operatory işledýär we bu ýagdaý sanawda roluň ýanynda aç-açan ýazylýar. Köküň ady tabşyryşda üýtgewsiz galýar: döwlet ýa şol bir köküň işledilişini öz üstüne alýar, ýa-da öz köküni süýşýän görnüşde goşýar we köne kök pensiýa çykýar (FW-TF-0001 §7, 3-nji ädim).

Kök sertifikat hem baky däl. Möhleti gutaranda ýa-da açar berkidilmeli bolanda #{strong[süýşürme]} (#{emph[rollover]}) ulanylýar: täze kök hasaba alynýar, köne köküň ýagdaýy #{raw("ROLLING_OVER")} bolýar we gabat gelýän döwürde iki kök hem kabul edilýär; guramalar sertifikatlaryny täze köke geçirýär, döwrüň ahyrynda köne kök #{raw("RETIRED")} bolýar. Pensiýa çykan kök öz döwründe berlen resminamalaryň barlagynda kabul edilmegini dowam etdirýär. Kök ele geçirilse, ýagdaý başgaça: kök #{raw("REVOKED")} bolýar we oňa baglanan ähli sertifikatlar güýjüni ýitirýär (SPEC-ID-0002 §4). Gabat gelýän döwrüň dowamlylygy (teklip 12 aý) we döwletleriň aralyk sertifikat edarasyny ulanjakdygy ýa-da ulanmajakdygy spesifikasiýada açyk sorag hökmünde ýazga alnan (Surat 10).

#sekil(10, [Sertifikat agajy: kim kime gol çekýär], "figures/wp-tk/sekil-10.svg", yarim: false)

== Resminama berijiniň sertifikat profili

Sertifikatyň içinde nämäniň ýazylandygy ony okaýan gurallaryň guramany tanap biljekdigini ýa-da bilmejekdigini kesgitleýär. ÝB-niň şahsyýet resminamasy, gapjyk we atribut tassyklamasy üpjün edijileri üçin ýazan sertifikat profili ETSI TS 119 412-6-dyr \[43\]; subýekt ýuridiki şahs bolanda EN 319 412-3 \[44\] ulanylýar. Tamga-da resminama beriji guramalaryň, şahsyýet hyzmaty hem goşmak bilen, resminama gol we ýatyrylyş sanawy gol sertifikatlary şu profile görä ýazylýar (ADR-0050).

Profiliň iň möhüm meýdany subýekt bölümindäki #{strong[guramanyň belgisidir]} (#{raw("organizationIdentifier")}). Bu meýdan guramanyň salgyt ýa-da reýestr belgisinden alnan we hasaba alyş sertifikatyndaky belgi bilen birmeňzeş bolan semantik belgini göterýär; Türkiýede salgyt belgisi üçin #{raw("VATTR-…")}, söwda reýestri üçin #{raw("NTRTR-…")} görnüşi ulanylýar. Bu gabat gelmegiň netijesinde ÝB tarapyndaky barlaýjy resminama gol çeken guramany hasaba alyş maglumatlary bilen baglap biler. Açar ulanylyşy hökmany (#{emph[critical]}) bellikli giňeltmedir we #{strong[ýeke görnüşlidir]}: diňe #{raw("digitalSignature")}. Şol bir sertifikat mdoc resminama golunda hem ulanylýandygy üçin ISO 18013-5-iň \[34\] talap edýän görnüşi şudur. Subýekt we edara açar belgileri (SKI, AKI) hökmany; barlaýjy haýyşlaryndaky ynam edarasynyň gabat gelşi şu belgä daýanýar. Algoritm P-256 bilen ECDSA SHA-256 we sertifikat iň köp 3 ýyl güýjünde.

Seredilen wariantlaryň biri gurama belgisini diňe ynam sanawynda saklamakdy; ret edildi, sebäbi sanawdan daşardaky ÝB gurallary sertifikatyň özüne seredýär. Açar ulanylyşyna mazmun borçlulygyny (#{raw("nonRepudiation")}) goşmak hem mdoc profili bilen çaknyşýandygy üçin ret edildi. Kwalifisirlenen ýa-da döwlet synpyndaky resminama berijiler üçin gerek goşmaça meýdanlar (ygtyýar elýeterlilik maglumaty, kwalifisirlenen sertifikat beýannamalary) şol synp açylanda aýratyn karar bilen geler; häzir tordaky ähli resminama berijiler kwalifisirlenmedik atribut tassyklamasyny berýär (ADR-0022, ADR-0050).

== Barlaýjynyň giriş sertifikaty

Barlaýjy gapjykdan resminama soranda haýyşyna öz #{strong[giriş sertifikaty bilen]} gol çekýär. Bu sertifikatyň profili ETSI TS 119 411-8-dir we ÝB-niň ynanýan taraplary hasaba almak baradaky ýerine ýetiriş düzgünnamasy oňa salgylanýar (ADR-0058). Sertifikatyň subýekt meýdanynda guramanyň belgisi, resmi ady we ýurdy bar. Umumy at (#{raw("CN")}) meýdany adamyň tanajak söwda ady ýa-da hyzmat adydyr; Aýnuryň razylyk ekranynda Timuryň kompaniýasy tanyş ady bilen görünýär. Sertifikatyň alternatiw at bölümi iki zady göterýär: hasaba alyşdaky domen ady we azyndan bir #{strong[aragatnaşyk maglumaty]}, Tamga-da hasaba alyşdaky goldaw salgysy. Goldaw salgysy bolmadyk barlaýja hakyky torda giriş sertifikaty berilmeýär (AC1). Şol bir gurama dürli hyzmatlar üçin aýratyn sertifikat sorasa, her sertifikat hyzmatyň belgisini aýratyn meýdanda göterýär (AC2).

Iki jikme-jiklik toruň dogruçyllyk çyzygyny görkezýär. ETSI-niň ÝB ynam hyzmaty üpjün edijilerine degişli syýasat belgisi giriş sertifikatyna ýazylmaýar; sebäbi şol belgi sertifikatyň gözegçilik edilen ÝB ynam hyzmaty üpjün edijisi tarapyndan berlendigi barada beýannamadyr we Tamga muny yglan edip bilmeýär (AC3). Toruň öz syýasat belgisi we sertifikat amalyýet beýannamasy gazna döredilende goşular. #{emph[Ýagdaýy: meýilleşdirilen.]} Ikinji jikme-jiklik belgiler bilen bagly: sertifikat täzelenende barlaýjynyň müşderi belgisi (#{raw("x509_hash")}) üýtgeýär, hemişelik ýazgysy bolan domen ady üýtgemeýär. 2026-njy ýylyň oktýabrynda hakyky we sandbox barlaýjylarynyň sertifikatlary şol bir açar bilen täzeden berlende saýtlardaky lakamlar şonuň üçin täsirlenmedi; lakam domen adyndan alynýar (ADR-0058; 15.3-nji bölüm).

== Hasaba alyş sertifikaty

Giriş sertifikaty "bu haýyş şu guramadan gelýär" diýýär; gapjygyň esasy soragy bolsa bu guramanyň #{strong[nämäni sorap biljekdigidir]}. ÝB munuň üçin ikinji resminamany göz öňünde tutýar: hasaba alyş sertifikaty (#{emph[registration certificate]}), ETSI TS 119 475 \[46\]. Tamga Türkiýäniň adyndan wagtlaýyn hasaba alyş edarasy hökmünde barlaýjynyň her ulanyşy we her resminama beriji üçin hasaba alyş sertifikatyny döredýär (ADR-0026). Sertifikatyň mazmuny diňe gol çekilen ynam sanawyndaky ýazgydan gelýär: barlaýjynyň maksady, haýsy resminama görnüşinden haýsy meýdanlary sorap biljekdigi, gizlinlik syýasaty, guramanyň belgisi. Sertifikat JWT görnüşinde (#{raw("rc-wrp+jwt")}), sanaw gol açaryndan aýratyn #{strong[hasaba alyş edarasynyň açary bilen]} gol çekilýär we iň köp 12 aý güýjünde. Açaryň barmak yzy sanawlaryň sanawynda çap edilýär.

Barlaýjy hasaba alyş sertifikatyny haýyşyna goşýar; gapjyk goly, möhleti, sertifikatdaky gurama belgisiniň haýyşa gol çeken giriş sertifikatyndaky belgi bilen birmeňzeşdigini we soralan meýdanlaryň sertifikatyň rugsat berýän meýdanlarynyň içinde galýandygyny barlaýar. Hasaba alyş sertifikatyny götermeýän haýyş häzir ret edilýär (ADR-0056; FW-ARF-0001 §2.2); artyk meýdan soraýan haýyşda gapjyk adamy duýdurýar (10.3-nji bölüm). Hasaba alyş sertifikatlary mundan başga-da Tamga-nyň öz syýasat belgisini, syýasat resminamasynyň salgysyny we ýagdaý ýazgysyny göterýär; hasaba alyş edarasy 1 bitlik ýagdaý sanawyny saklaýar we hasaba alyş ýa-da mazmun üýtgände köne sertifikat öz-özünden ýatyrylýar. Gapjyk sertifikaty ýatyrylan haýyşy ret edýär, ýagdaýy barlap bilmese duýdurýar (ADR-0068; FW-POL-0003). Tablisa 11 bu bölümde beýan edilen sertifikat görnüşlerini bilelikde berýär. #{emph[Ýagdaýy: hasaba alyş sertifikatlary, syýasat meýdanlary we ýagdaý sanawy hakyky torda we sandbox-da işleýär.]}

#tablo([#{strong[Tablisa 11.]} Sertifikat görnüşleri: kim berýär, näme göterýär, nirede barlanýar.], (35fr, 25fr, 40fr, 24fr, 34fr), ([Görnüş], [Kim berýär], [Näme göterýär], [Profil], [Nirede barlanýar],), (
  ([Guramanyň resminama gol we ýatyrylyş sanawy gol sertifikaty], [milli kök (häzir wagtlaýyn operator)], [guramanyň belgisi, resmi ady, ýurdy; diňe #{raw("digitalSignature")}], [ETSI TS 119 412-6, EN 319 412-3], [barlaýjyda (gurluş we ynam ädimleri), gapjykda],),
  ([Barlaýjynyň giriş sertifikaty], [milli kök], [guramanyň belgisi, söwda ady, domen ady, goldaw salgysy], [ETSI TS 119 411-8], [gapjykda, gol çekilen haýyş alnanda],),
  ([Hasaba alyş sertifikaty], [hasaba alyş edarasy (häzir wagtlaýyn)], [ulanyş maksady, soralyp bilinjek meýdanlar, syýasat, ýagdaý ýazgysy], [ETSI TS 119 475], [gapjykda, soralan meýdanlar bilen deňeşdirmek],),
  ([Sanaw gol sertifikatlary (JSON we aýratyn XML gol çekijisi)], [wagtlaýyn operator], [sanawlaryň goly], [Tamga JWS; XML üçin ETSI TS 119 612 §5.7.1], [sanawy ýükleýän her müşderide],),
  ([Gapjyk üpjün edijisiniň sertifikaty], [gapjyk üpjün edijisi, sanawda hasaba alnan], [WIA we açar tassyklamasynyň goly], [ETSI TS 119 412-6 (gapjyk görnüşi)], [resminama berijide (9.3-nji bölüm)],),
))

== Guramanyň açary guramada: uzakdan gol

Toruň ýerleşdirýän hiç bir hyzmaty guramalaryň gol açaryny saklamaýar (FW-ARF-0001 §3); ýöne ýerleşdirilen hyzmat bilen berlen resminamalar hem guramanyň açary bilen gol çekilmeli. Ikisini bilelikde saklaýan ýol uzakdan goldur (ADR-0057). Guramanyň resminama we ýatyrylyş sanawy gol açarlary guramanyň öz enjam howpsuzlyk modulynda ýa-da guramanyň şertnama baglaşan ynam hyzmaty üpjün edijisinde döredilýär we şol ýerde galýar. Ýerleşdirilen hyzmat goly ÝB-de uzakdan gol we möhür üçin ornaşan interfeýs bolan Cloud Signature Consortium \[54\] API-niň 2-nji wersiýasy bilen soraýar.

Hyzmata gidýän ýeke zat gol çekiljek maglumatyň SHA-256 heşidir. Resminamanyň mazmuny, şahsy maglumat ýa-da adamyň açary gol hyzmatyna gitmeýär; gol hyzmaty haýsy adama resminama berlendigini bilmeýär (RS2). Gaýdyp gelen gol guramanyň ynam sanawyndaky sertifikaty bilen ýerli barlanýar; barlanmadyk gol bilen resminama berilmeýär (RS3). Hakyky torda gurama açarynyň hyzmat serwerindäki faýldan okalmagy konfigurasiýa derejesinde ret edilýär; faýl açary diňe ýerli işläp düzmek, synaglar we sandbox üçin (RS4). Gurama gol ygtyýaryny islän pursatynda yzyna alyp biler; gol hyzmatyndaky müşderi belgisini ýapmagy ýerleşdirilen hyzmatyň şol guramanyň adyndan resminama bermegini derrew togtadýar.

#kutu("teknik", [Uzakdan goluň ädimleri])[
Ýerleşdirilen hyzmat resminama gol çekýän her gezeginde üç jaňy we iki ýerli ädimi ýerine ýetirýär (CSC API v2; ADR-0057 K1–K3). Algoritm belgileri SHA-256 üçin #{raw("2.16.840.1.101.3.4.2.1")}, gol üçin #{raw("ecdsa-with-SHA256")} (#{raw("1.2.840.10045.4.3.2")}) bolýar.

#adimlar((
  ("Resminama beriş hyzmaty → Gol hyzmaty", [#{strong[Giriş.]} Guramanyň kesgitlän müşderi belgisi bilen gysga ömürli giriş belligini alýar (#{raw("client_credentials")}).], $"bellik" <- "gol hyzmaty"$),
  ("Resminama beriş hyzmaty", [#{strong[Heş.]} Gol çekiljek maglumatyň (JWS gol girdisi ýa-da COSE gurluşy) diňe heşini hasaplaýar.], $h = "SHA-256"("gol girdisi")$),
  ("Resminama beriş hyzmaty → Gol hyzmaty", [#{strong[Ygtyýar.]} Ýeke gol üçin, şu heşe baglanan gol ygtyýaryny soraýar (#{raw("credentials/authorize")}).], $"SAD" <- "ygtyýar"(h)$),
  ("Resminama beriş hyzmaty → Gol hyzmaty", [#{strong[Gol.]} Heşe gol çekdirýär (#{raw("signatures/signHash")}).], $sigma <- "gol çek"_("gurama") (h)$),
  ("Resminama beriş hyzmaty", [#{strong[Barlag.]} Goly sanawdaky gurama sertifikatynyň açyk açary bilen ýerli barlaýar; gabat gelmese resminamany bermeýär.], $"barla"(sigma, h, "pk"_"sanaw") attach(=, t: ?) "hawa"$),
))

Gol hyzmatyna ýetip bolmasa, resminama berilmeýär we adam soňra täzeden synanyşýar; edil guramanyň ygtyýarly çeşmesine ýetip bolmadyk ýagdaýyndaky ýaly (9.2-nji bölüm).
]

Ret edilen wariantlar: açary serwerde faýl hökmünde saklamak (toruň düzgünine ters), ýeke bulut üpjün edijisiniň açar hyzmatyna baglanmak (guramany bir üpjün edijä baglaýar) we tora mahsus täze gol interfeýsi (standart eýýäm bar). Guramanyň resminama beriş programmasyny açyk paketler bilen öz serwerinde işletmegi ikinji ýol hökmünde açyk galýar (ADR-0016, ADR-0057). #{emph[Ýagdaýy: ýerleşdirilen hyzmatda kod we synaglar taýýar; hakyky torda bu ýoly ulanýan gurama heniz ýok, meýilleşdirilen.]}

= Resminamalar: Formatlar, Görnüşler we Katalog

Aýnur Mysal uniwersitetinde magistraturany tamamlady we diplomyny gapjygyna aldy. Telefonynda görýän zady kart: uniwersitetiň ady, derejesi, uçurym bolan senesi. Kartyň aňyrsynda bolsa biri-birine berk baglanan birnäçe gurluş bar: guramanyň gol çeken özeni, her biri aýratyn açylyp bilinýän meýdanlar, telefondaky açara baglanyşyk we resminamanyň görnüşini kesgitleýän katalog ýazgysy. Bu bölüm şu gurluşlary bir-birden açýar. Saýlap açmagyň özi tapgyryň üçünji makalasynyň \[68\] temasy; bu ýerde Tamga profiliniň ony nähili daraldýandygyna we näme üçin şeýle daraldýandygyna ünsi jemleýäris.

== SD-JWT VC-niň anatomiýasy

Tamga resminamalarynyň esasy görnüşi SD-JWT VC-dir \[16\] (IETF RFC 9901 \[15\] üstünde gurlan SD-JWT esasly resminama görnüşi; ADR-0006). Bu görnüş ÝB arhitekturasynyň esasy görnüşi, JSON esasly we saýlap açmagy öz gurluşynyň içinde göterýär. SD-JWT VC tilda (#{raw("~")}) bilen aýrylan üç bölekden ybarat (Surat 11): guramanyň gol çeken JWT-si, her biri ýeke meýdany göterýän #{strong[açyşlar]} (#{emph[disclosures]}) we hödürleme pursatynda gapjygyň goşýan #{strong[açar baglanyşygy JWT-si]} (#{emph[KB-JWT]}). Gurama resminamany berende setir soňky tilda bilen gutarýar, sebäbi açar baglanyşygy heniz ýok. Aýnur resminamany görkezende görkezmek islemeýän açyşlaryny setirden #{strong[aýyrýar]} we ahyryna açar baglanyşygyny goşýar. JWT üýtgemeýär, guramanyň goly güýjünde galýar. Gizlemek bir zat goşmak däl-de, aýyrmakdyr (SPEC-CRED-0002 §2).

Guramanyň gol çeken JWT-si açylyp bilinýän meýdanlaryň özüni däl-de, diňe olaryň #{strong[duzlanan heşlerini]} (#{raw("_sd")} massiwi) göterýär. Her meýdan üçin tötänleýin duz (#{emph[salt]}) döredilýär; duz, meýdanyň ady we bahasy JSON massiwi hökmünde ýazylýar, Base64URL bilen kodlanýar we bu setiriň SHA-256 heşi JWT-ä girýär. Barlaýjy gelen açyşyň heşini täzeden hasaplaýar we JWT-däki massiwden gözleýär. Duz bolmasa, doglan senesi ýaly çaklap bolýan meýdanyň heşini sözlük hüjümi bilen açyp bolardy; duz munuň öňüni alýar.

#sekil(11, [SD-JWT VC gatlaklary: haýsy bölek kimden gelýär], "figures/wp-tk/sekil-11.svg", yarim: false)

#kutu("teknik", [Açyşyň we onuň heşiniň hasaby])[
Tamga profili standartyň galdyran wariantlaryny daraldýar (SPEC-CRED-0002 §1): gol algoritmi diňe ES256, #{raw("typ")} diňe #{raw("dc+sd-jwt")}, heş algoritmi (#{raw("_sd_alg")}) diňe #{raw("sha-256")}, duz 128 bit, guramanyň sertifikat zynjyry (#{raw("x5c")}) hökmany we kök sertifikat zynjyra goýulmaýar, açar baglanyşygy kadadan çykmasyz hökmany, ýalan heş (#{emph[decoy digest]}) gadagan, içme-iç saýlap açmak iň köp iki dereje we #{raw("_sd")} massiwi hemişe baýt boýunça artýan tertipde. Açyşyň hasaby şeýle:

#formul[$ A &= "BASE64URL"("UTF-8"("JSON"(["duz", "at", "baha"]))) \
d &= "BASE64URL"("SHA-256"("ASCII"(A))) \
"kabul" &<=> d in "_sd" $]

Guramalar massiwi kesgitli ylalaşyk bilen ýazýar: elementleriň arasynda otur we bir boşluk, ASCII-den daşary nyşanlar #{raw("\\uXXXX")} gaçyşy bilen. Aşakdaky bahalar şu ylalaşyk bilen hakykatdanam hasaplandy; duzlar şu mysal üçin saýlandy, bahalar mysaldyr.

#kod("text", "Tuz (16 bayt, onaltılık)  : 9c41e07b2fd35a8816c4be72031d9fa5
Tuz (Base64URL)            : nEHgey_TWogWxL5yAx2fpQ
JSON dizisi                : [\"nEHgey_TWogWxL5yAx2fpQ\", \"given_name\", \"Aynur\"]
Açıklama (Base64URL)       : WyJuRUhnZXlfVFdvZ1d4TDV5QXgyZnBRIiwgImdpdmVuX25hbWUiLCAiQXludXIiXQ
Özet (_sd içine giren)     : Ib6OYL63r2BOsXDxfg3agTb5ZL4vjI3nD2Ya5WBqyxs

Tuz (Base64URL)            : Wy6P0QR6yT5mELfUL-hcGQ
JSON dizisi                : [\"Wy6P0QR6yT5mELfUL-hcGQ\", \"family_name\", \"Məmmədova\"]
Açıklama (Base64URL)       : WyJXeTZQMFFSNnlUNW1FTGZVTC1oY0dRIiwgImZhbWlseV9uYW1lIiwgIk1cdTAyNTltbVx1MDI1OWRvdmEiXQ
Özet (_sd içine giren)     : 31B1ZwTB5I8Vvg3TjV3_YVjNlgO-dZ39Ftfl_nQhTiA", baslik: "Mysal: Aýnuryň diplomyndan iki açyş")

#{strong[Gaýtadan seriýalaşdyrmagyň duzagy.]} Heş açyş #{emph[setiriniň]} heşidir; massiwiň täzeden ýazylan görnüşiniňki däl. Şol bir familiýa massiwini boşluksyz we #{raw("ə")} harpyny gaçyşsyz ýazsak (#{raw("[\"Wy6P0QR6yT5mELfUL-hcGQ\",\"family_name\",\"Məmmədova\"]")}), maglumat şol bir galýar, ýöne heş #{raw("wCd6pAztppTpS9k8d-IPbCifKlRIJFHE_t_eCV_ySa8")} bolýar we JWT-däki bilen gabat gelmeýär. Şonuň üçin barlaýjy açyşy #{strong[ilki heşleýär, soňra açýar]}; açyp, täzeden ýazýan programma hatda özüniň döreden resminamasyny-da barlap bilmeýär (SPEC-CRED-0002 §3.3, §3.5). Ylalaşyk diňe döretmek üçin; barlaýjy başga ylalaşyk bilen ýazylan daşky resminamalary hem barlaýar.

#{strong[Ýalan heş näme üçin gadagan?]} Standart gizlin meýdanlaryň sanyny näbelli etmek üçin deňi bolmadyk heşlere rugsat berýär. Tamga-da görnüşiň kesgitlemesi açyk we meýdanlaryň sanyny eýýäm aýdýar; guramadan gurama üýtgeýän ýalan heşleriň sany bolsa özbaşdak barmak yzy bolardy. Gapdal kanala garşy çözgüt gapjygyň şol bir barlaýja yzygiderli açyş toplumyny hödürlemegidir (SPEC-CRED-0002 §4.4).
]

Hödürleme pursatynda gapjyk ahyryna açar baglanyşygy JWT-sini goşýar. Bu kiçijik JWT resminamanyň baglanan enjam açary bilen gol çekilýär we dört meýdany göterýär: barlaýjynyň beren bir gezeklik bahasy (#{raw("nonce")}), maksat barlaýjy (#{raw("aud")}), hödürleme pursaty (#{raw("iat")}) we hödürlenýän setiriň heşi (#{raw("sd_hash")}). Ilkinji üçüsi gaýtadan oýnamagyň öňüni alýar: ýazga alnan hödürlemäni başga barlaýja ýa-da başga haýyşa gaýtadan hödürläp bolmaýar. Dördünjisi araçylyk edýän biriniň hödürlenen açyşlaryň käbirini sessiz aýyrmagynyň öňüni alýar (SPEC-CRED-0002 §6).

#kutu("teknik", [Açar baglanyşygynyň hasaby])[
#{raw("sd_hash")} açar baglanyşygyndan başga, hödürlenýän setiriň hemmesiniň heşidir; soňky açyşdan soňky tilda hem girýär we diňe hödürlenen açyşlar girýär:

#formul[$ "sd_hash" &= "BASE64URL"("SHA-256"("JWT" || "~" || A_1 || "~" || dots.c || A_k || "~")) \
"KB-JWT" &= "gol"_("cnf") ("nonce", "aud", "iat", "sd_hash") $]

Barlaýjy açar baglanyşygynyň goluny resminamadaky #{raw("cnf")} açary bilen barlaýar, #{raw("aud")} bahasynyň özüdigini, #{raw("nonce")} bahasynyň özüniň beren bahasydygyny barlaýar, #{raw("iat")} üçin ±300 sekuntlyk penjiräni ulanýar we #{raw("sd_hash")}-y özi hasaplap deňeşdirýär (SPEC-CRED-0002 §8, Ş8; C17). Tamga görnüşlerinde açar baglanyşygy bolmadyk hödürleme ret edilýär (C8).
]

Aşakdaky mysal Aýnuryň diplomynyň guramanyň gol çeken esasy bölegini açyşlar açylan görnüşde görkezýär. Hödürlemede bu meýdanlaryň diňe bir bölegi açylýar (Surat 12).

#kod("json", "{
  \"iss\": \"https://issuer.tamga.network/example-university\",
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"vct#integrity\": \"sha256-7Dcy7bWeg5CURNEE+veGmjOE3HWb95ZGJBWX/ZrZgtI=\",
  \"iat\": 1782896400,
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"…\", \"y\": \"…\" } },
  \"status\": { \"status_list\": { \"idx\": 48213, \"uri\": \"https://status.tamga.network/…\" } },
  \"given_name\": \"Aynur\",
  \"family_name\": \"Məmmədova\",
  \"qualification_title\": { \"tr-TR\": \"Bilgisayar Mühendisliği Yüksek Lisans Diploması\",
                           \"en-US\": \"Master of Science in Computer Engineering\" },
  \"eqf_level\": 7,
  \"isced_f_code\": \"0613\",
  \"awarding_body_name\": { \"tr-TR\": \"Örnek Üniversitesi\", \"en-US\": \"Example University\" },
  \"awarding_date\": \"2026-06-30\",
  \"grade\": \"3.71\",
  \"thesis_title\": { \"tr-TR\": \"…\" },
  \"is_graduate\": true
}", baslik: "Mysal: açylan diplomyň esasy bölegi (açyşlar ýerine goýlan, gysgaldylan; bahalar mysaldyr)")

Mysalda üç jikme-jiklik bar. #{raw("iat")} sagada tegeleklenen; nusgalary berlen pursaty boýunça deňeşdirip bolmaz ýaly (paketleriň wersiýa bellikleri; 15.2-nji bölüm). Diplomyň #{raw("exp")} meýdany ýok; täzelemek borjy uçurymy ömürboýy uniwersitete baglardy. Baha we dissertasiýanyň ady görnüş kesgitlemesinde "hemişe gizlenip bilner" diýip bellenen: Aýnur diplomyny bahasyny görkezmezden hödürläp biler, kagyz diplomda bolsa onuň üstündäki hemme zat görünýär (SPEC-SCHEMA-0002 §3.3).

#sekil(12, [Saýlap açmak: dört meýdanly resminamadan iki meýdanyň görkezilmegi], "figures/wp-tk/sekil-12.svg", yarim: false)

== Enjam baglanyşygy näme üçin kadadan çykmasyz

Spesifikasiýalarda "uniwersitet pikirindäki gizlin säwlik" diýlip atlandyrylýan nädogry çaklama bar: "Talyp uniwersitetiň makullamagy bilen resminama alsa, resminamany göterýän şol talypdyr." Uniwersitet talybyň bardygyny tassyklaýar; ýöne resminamanyň giren gapjygynyň şol talyba degişlidigini tassyklamaýar. Baglanyşyk bolmasa, resminamany dostuň gapjygyna aldyryp ýa-da birnäçe gapjyga alyp satyp bolýar; ulgam säwlik bermeýär, sessiz nädogry aýdýar (SPEC-CRED-0001 §3).

Tamga-da her resminama berlen pursatynda adamyň enjamynda döredilen açara baglanýar: açaryň açyk bölegi resminamanyň #{raw("cnf")} meýdanyna ýazylýar, gizlin bölegi enjamyň howpsuz zolagyndan çykmaýar. Hödürlemede gapjyk açar baglanyşygyna şu açar bilen gol çekýär. Baglanyşyk kadadan çykmasyz hökmany (ADR-0006). Onuň subut edýän zady resminamany hödürleýäniň resminama berlende baglanan gizlin açary häzir elinde saklaýandygydyr; garşydaky adamyň resminamada ady agzalýan adamdygyny subut etmeýär. Resminama eýesi telefonyny we gulp koduny başga birine berse, hiç bir ädim säwlik bermeýär. Baglanyşyk nädogry gapjyga ýazylmagyň we geçirilmegiň öňüni alýar, enjamy meýletin paýlaşmagyň öňüni almaýar (SPEC-CRED-0001 §3). Adamyň özüni baglamak üçin şahsyýet resminamasy gerek: guramalar resminama berende adamyň şahsyýet resminamasyny hödürleýşini öz ýazgylary bilen deňeşdirýär (9.2-nji bölüm; 14-nji bölüm).

== mdoc: ikinji şekillendiriliş

Tamga-nyň şahsyýet resminamasy SD-JWT VC-niň ýanynda ISO\/IEC 18013-5 \[34\] #{strong[mdoc]} görnüşinde hem berilýär (ADR-0013). mdoc mobil sürüjilik şahadatnamasy üçin işlenip düzülen, CBOR \[29\] kodlamasyny we COSE goluny ulanýan görnüşdir. Üç esas bar: brauzerden resminama soraýan Digital Credentials API-niň \[36\] Safari we iOS tarapy diňe mdoc kabul edýär; ADR-0013-iň ýazga alyşy ýaly, ÝB arhitekturasy adamyň şahsyýet maglumatlary üçin mdoc-y hökmany saýýar; ýakyn aralykda ISO 18013-5 mdoc göterýär (10.8-nji bölüm). Diňe SD-JWT VC bilen galmak brauzer arkaly girişi we ÝB bilen deňleşmegi ýitirerdi; doly mdoc-a geçmek bar bolan hatary döwerdi we web üçin has ýönekeý görnüşi taşlardy.

Düzgünler iki şekillendirilişi berk saklaýar. mdoc diňe SD-JWT VC-niň ikinji şekillendirilişidir; şol bir meýdanlary, şol bir berliş we gutaryş wagtlaryny göterýär we #{strong[şol bir enjam açaryna]} baglanýar: SD-JWT-däki #{raw("cnf")} bilen mdoc-daky #{raw("deviceKey")} şol bir açardyr (MD1, MD2). Iki şekillendiriliş ýeke beriş akymynda döredilýär we şol bir ýatyrylyş bitini paýlaşýar. mdoc-yň #{raw("docType")} bahasy görnüşiň ady (#{raw("urn:tamga:id:IdentityAttestation:1")}) bilen birmeňzeş, at meýdany #{raw("tamga.id.1")}. Meýdanlaryň atlary we kodlamasy ÝB-niň adamyň şahsyýet maglumatlary baradaky ýerine ýetiriş düzgünnamasynda (ÝB 2026\/1731 \[7\]) berkidilen kodlama laýyk: SD-JWT-de #{raw("birthdate")} we #{raw("nationalities")} massiwi, mdoc-da #{raw("birth_date")} we massiw bahaly #{raw("nationality")} (ADR-0045). Şahsyýet resminamasyndan başga görnüşler häzir diňe SD-JWT VC. Nol bilimli subutnama üçin ulanylýan gysga ömürli nusga hem mdoc-dyr (15.4-nji bölüm).

#kutu("teknik", [mdoc-da saýlap açmak])[
mdoc-da her meýdan aýratyn #{raw("IssuerSignedItem")} gurluşydyr: tötänleýin belgi (#{raw("digestID")}), 16 baýtlyk tötänleýin baha (#{raw("random")}), meýdanyň ady we bahasy. Gurluş CBOR bilen kodlanýar, 24 belgili CBOR tegi bilen oralýar we bu baýtlaryň SHA-256 heşi guramanyň gol çeken #{strong[Mobile Security Object]}-ine (MSO) ýazylýar. Gapjyk hödürlemede diňe saýlan gurluşlaryny iberýär; barlaýjy heşleri MSO bilen, MSO-nyň goluny gurama sertifikaty bilen we enjam goluny sessiýa baglanan ýazgynyň üstünde barlaýar.

#formul[$ "element" &= "CBOR"("tag 24"("CBOR"({"digestID", "random", "elementIdentifier", "elementValue"}))) \
"MSO.valueDigests"["tamga.id.1"]["digestID"] &= "SHA-256"("element") $]

#{raw("age_over_18 = true")} elementi #{raw("1438205713")} belgisi we #{raw("8d1f6a20c43b97e5512a0ff6b8c3d471")} tötänleýin bahasy bilen kodlananda 87 baýtlyk setir çykýar we onuň heşi #{raw("b42af3a67628a8e5…a0536d4d")} bolýar. Hasap toruň mdoc paketiniň kodlaýjysy bilen edildi; bahalar mysaldyr. Belgiler yzygiderli däl-de, tötänleýin; yzygiderli bolsady, açylan meýdanlaryň belgileri gizlenen meýdanlaryň sanyny we tertibini aýan ederdi.

#kod("text", "{
  \"version\": \"1.0\",
  \"digestAlgorithm\": \"SHA-256\",
  \"docType\": \"urn:tamga:id:IdentityAttestation:1\",
  \"valueDigests\": { \"tamga.id.1\": { 1438205713: h'b42af3a6…a0536d4d', 902114467: h'…', … } },
  \"deviceKeyInfo\": { \"deviceKey\": { 1: 2, -1: 1, -2: h'…', -3: h'…' } },
  \"validityInfo\": { \"signed\": 0(\"2026-07-01T09:00:00Z\"),
                    \"validFrom\": 0(\"2026-07-01T09:00:00Z\"),
                    \"validUntil\": 0(\"2028-07-01T09:00:00Z\") },
  \"status\": { \"status_list\": { \"idx\": 7310, \"uri\": \"https://…\" } }
}", baslik: "Mysal: şahsyýet resminamasynyň MSO-sy (CBOR diagnostika görnüşine ýakyn, gysgaldylan; bahalar mysaldyr)")

mdoc-yň ýatyrylyş ýazgysy şol bir logiki sanawyň CWT görnüşine salgylanýar; JWT we CWT görnüşleri şol bir bitleri göterýär (ADR-0048). MSO guramanyň sertifikaty bilen COSE\_Sign1 goluny göterýär we sertifikat zynjyry goluň içinde; SD-JWT bilen şol bir ynam labyryna baglanýar (MD3). Tablisa 12 iki görnüşi ýanaşyk goýýar.
]

#tablo([#{strong[Tablisa 12.]} SD-JWT VC bilen mdoc-yň deňeşdirmesi (FW-ARF-0001 §5.1; ADR-0013).], (14fr, 23fr, 31fr), ([], [SD-JWT VC], [ISO\/IEC 18013-5 mdoc],), (
  ([Kodlama we gol], [JSON, JOSE (ES256)], [CBOR, COSE\_Sign1 (ES256)],),
  ([Görnüşiň belgisi], [#{raw("vct")} (URN)], [#{raw("docType")} (şol bir URN)],),
  ([Saýlap açmak], [duzlanan heşler (#{raw("_sd")}) we açyşlar], [#{raw("IssuerSignedItem")} heşleri (MSO)],),
  ([Enjam baglanyşygy], [#{raw("cnf")} + açar baglanyşygy JWT-si], [#{raw("deviceKey")} + sessiýa ýazgysynyň üstünde enjam goly],),
  ([Ýatyrylyş], [Token Status List (JWT görnüşi)], [şol bir sanaw, CWT görnüşi],),
  ([Tamga-da ulanylyşy], [ähli görnüşler; uzakdan hödürlemek], [şahsyýet resminamasy; brauzer, ýakyn aralyk, ZK],),
))

== Resminama görnüşiniň belgisi we katalog

Resminamanyň "diplom" bolýandygyny aýdýan zat resminamanyň #{raw("vct")} meýdanyndaky görnüş adydyr. Tamga-da bu at URN-dir: #{raw("urn:tamga:<ugur>:<Görnüş>:<esasy wersiýa>")}, meselem #{raw("urn:tamga:edu:DiplomaCredential:1")} (ADR-0010). Görnüşiň manysy, ýagny haýsy meýdanlary göterýändigi, ekranda haýsy dillerde nähili görkeziljekdigi we haýsy meýdanlaryň gizlenip bilinjekdigi #{strong[görnüş kesgitlemesinde]} (#{emph[Type Metadata]}) ýazylýar; maglumat düzgünleri aýratyn JSON Schema \[39\] faýlynda. Kesgitlemeler #{raw("schemas.tamga.network")} salgysyndaky katalogda üýtgemeýän faýllar hökmünde çap edilýär (SPEC-SCHEMA-0001).

Bu ilkinji karar däldi. Ilkinji shema karary görnüş adyny durnukly HTTPS salgysy edipdi (ADR-0007, 1-nji karar); iki hepdeden soň üýtgedildi. Esasy dolandyryş bilen baglydy: birnäçe döwletiň goşuljak torunda görnüş belgisi gaznanyň domen adyna bagly bolup bilmez. HTTPS warianty standarda laýykdy, ýöne domen adyny baky belginiň bölegi edýärdi. ÝB-niň #{raw("urn:eudi:pid:1")} we katalog tertibi hem şol bir nusgadyr. Standartdan daşary #{raw(".well-known")} ýoly we DID esasly görnüş belgisi hem ret edildi (ADR-0010). Bahasy ýazga geçdi: toruň katalogyny bilmeýän barlaýjy URN-den kesgitlemä ýetip bilmeýär; şonuň üçin katalog salgysy sanawlaryň sanawynda we paketlerde göterilýär.

Kesgitlemäniň nirede durýandygyny katalogdaky #{raw("metadata_url")} aýdýar; domen ady üýtgese, diňe şu salgylar üýtgeýär. Her resminama göz öňünde tutýan kesgitlemesiniň heşini #{raw("vct#integrity")} meýdanynda göterýär we bu meýdan Tamga-da hökmany (ETSI TS 119 472-1 \[49\]; IETF taslamasynda islege bagly). Katalog serweri ele geçirilse-de, meýdanyň manysyny sessiz süýşürip bolmaýar; heş mazmuny ýeke özi kesgitleýändigi üçin gapjyk kesgitlemäni bir gezek göçürip alyp, onlaýn däl wagty hem ulanyp bilýär.

#kutu("teknik", [Katalog ýazgysy, bitewilik heşi we çözmek])[
Bitewilik heşi W3C Subresource Integrity \[38\] görnüşinde: #{raw("sha256-")} öňüşekili we faýlyň çig baýtlarynyň SHA-256 heşiniň Base64 kodlamasy. Heş serweriň gaýtarýan baýt yzygiderliginden alynýar; faýl täzeden formatlanmaýar, setir ahyrlary LF, kodlama BOM-syz UTF-8 (SPEC-SCHEMA-0001 §3). Aşakdaky ýazgy ýazylan günündäki katalogdan alyndy we täzeden hasaplanyp barlandy: diplom kesgitlemesiniň 4.536 baýtlyk faýlynyň heşi katalogdaky #{raw("content_hash")} bilen, görnüş adynyň Keccak-256 heşi #{raw("schema_id")} bilen birmeňzeş. Işläp düzmek tapgyrynda kesgitlemeler ýerinde düzedilip bilinýändigi üçin (aşakda) bahalar üýtgäp biler; mysal hökmünde okalmaly.

#kod("json", "{
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"schema_id\": \"0x9d6d0e873ee0466cf1cdc8a8bd73f9435022635f0b6e46cd478e70f6e6aed26b\",
  \"metadata_url\": \"https://schemas.tamga.network/v1/edu/DiplomaCredential/1.0.0/metadata.json\",
  \"content_hash\": \"sha256-7Dcy7bWeg5CURNEE+veGmjOE3HWb95ZGJBWX/ZrZgtI=\",
  \"version\": \"1.0.0\",
  \"layer\": \"NETWORK\",
  \"status\": \"ACTIVE\"
}", baslik: "Mysal: katalogdaky diplom ýazgysy")

#kod("json", "{
  \"vct\": \"urn:tamga:edu:DiplomaCredential:1\",
  \"extends\": \"urn:tamga:core:TamgaBaseCredential:1\",
  \"extends#integrity\": \"sha256-8ZCjtH26C7Bh0u+Lox3zJA+JLfP4JYtcQPW+8fxoyPU=\",
  \"schema_uri\": \"https://schemas.tamga.network/v1/edu/DiplomaCredential/1.0.0/schema.json\",
  \"schema_uri#integrity\": \"sha256-AJXIk9o4DlyVFC3PyCeH/4XEeZnh+dYTWVFlvjQjonc=\",
  \"display\": [ { \"lang\": \"tr-TR\", \"name\": \"Diploma\", \"description\": \"Yükseköğretim mezuniyet belgesi\" },
               { \"lang\": \"en-US\", \"name\": \"Diploma\", \"description\": \"Higher education degree\" } ],
  \"claims\": [ { \"path\": [\"grade\"], \"sd\": \"always\",
                \"display\": [ { \"lang\": \"tr-TR\", \"label\": \"Not ortalaması\" } ] },
              { \"path\": [\"is_graduate\"], \"sd\": \"allowed\" } ],
  \"tamga\": { \"tier\": \"NETWORK\", \"issuer_categories\": [\"EDUCATION\"], \"uses_status_list\": true,
             \"suspension_allowed\": true, \"min_issuer_assurance\": \"I2\", \"min_binding_level\": \"T2\" }
}", baslik: "Mysal: diplom görnüşiniň kesgitlemesinden bir bölek (gysgaldylan)")

#{raw("schema_uri")} we onuň heşi IETF taslamasynyň häzirki wersiýasynda ýok; Tamga olary öz goşundysy hökmünde saklaýar we standart okaýjy tanamaýan meýdanyny hasaba almaýar. Barlaýjynyň görnüş ädimi yzygiderlikde şulary edýär (ADR-0010 K2; SPEC-SCHEMA-0001 §7): #{raw("vct")} bilen #{raw("vct#integrity")} ýok bolsa ret; görnüşiň katalog ýazgysy ýok bolsa ýa-da yzyna alnan bolsa ret; kesgitlemäni keşden, ýok bolsa #{raw("metadata_url")} salgysyndan al; alnan baýtlaryň heşi resminamadaky baha bilen hem, katalog ýazgysy bilen hem gabat gelmese ret; kesgitlemedäki #{raw("vct")} resminama bilen birmeňzeş bolmasa ret; ýokary görnüş zynjyryny (#{raw("extends")}) iň köp bäş dereje we aýlawsyz çöz; resminamany JSON Schema-a görä barla; iň soňunda guramanyň resminama berlen senesinde bu görnüş üçin ygtyýarlydygyny sanawdan sora. Kesgitlemäni hiç ýerden alyp bolmasa, netije ret däl-de, "barlap bolmady".
]

Esasy wersiýa URN-iň bölegidir; bozujy üýtgeşme täze URN diýmekdir. Aralyk we düzediş wersiýalary şol bir URN-iň aşagynda täze #{raw("metadata_url")} we täze heş bilen çap edilýär; resminamadaky #{raw("vct#integrity")} olaryň haýsysynyň göz öňünde tutulýandygyny takyklaýar. Ulanyşdan aýrylan (#{raw("DEPRECATED")}) görnüş indi #{strong[berlip bilinmeýär]}, ýöne onuň bilen berlen resminamalar #{strong[barlanmagyny dowam etdirýär]}; 2027-nji ýylda berlen diplom görnüşiň täze esasy wersiýasy çykanda hem barlanyp bilinmeli (ADR-0007, 7-nji karar; ADR-0010 K4). Milli resminama görnüşleri öz at meýdanyny ulanýar: #{raw("urn:tamga:<cc>:<ugur>:<Görnüş>:<esasy wersiýa>")}; tor görnüşi bu görnüşde bolup bilmeýär, şeýlelikde milli at tor derejesindäki at bilen hiç haçan çaknyşmaýar (ADR-0054).

Häzir tor #{strong[işläp düzmek tapgyrynda]}: beta neşirine çenli görnüş kesgitlemeleri ýerinde düzedilýär, synag resminamalary täzeden alynýar; çap edilen kesgitlemäniň üýtgewsizligi beta bilen başlaýar (ADR-0029). Diplomyň kesgitlemesine togtatmak rugsady goşulanda heş üýtgedi we öňki synag diplomlary täzeden berildi (SPEC-SCHEMA-0002 §3.1); hakyky ulanyjy ýokka yza laýyklyk kody ýazylmady.

== Häzirki görnüşler

#tablo([#{strong[Tablisa 13.]} Katalogdaky resminama görnüşleri (ýazylan güni; #{raw("packages/schemas")} katalogy, SPEC-SCHEMA-0002\/0003, FW-RB-0002…0005).], (43fr, 16fr, 48fr), ([Görnüş (#{raw("vct")}, #{raw("urn:tamga:")} öňüşekili taşlanan)], [Görünýän ady], [Format · ýatyrylyş · togtatmak · iň pes dereje · düzgünler kitaby],), (
  ([#{raw("edu:StudentCredential:1")}], [talyp resminamasy], [SD-JWT VC · ýatyrylyş sanawy ýok, iň köp 90 gün · togtatmak ýok · T1 · FW-RB-0002],),
  ([#{raw("edu:DiplomaCredential:1")}], [diplom], [SD-JWT VC · Status List, 2 bit · togtatmak bar · T2 · FW-RB-0002],),
  ([#{raw("id:IdentityAttestation:1")}], [şahsyýet resminamasy], [PID däl · SD-JWT VC + mdoc · Status List, 1 bit · togtatmak ýok · T2 · FW-RB-0003],),
  ([#{raw("contact:EmailAddress:1")}, #{raw("contact:PhoneNumber:1")}], [e-poçta, telefon], [tassyklanan aragatnaşyk · SD-JWT VC · Status List, 1 bit · togtatmak ýok · T0 · FW-RB-0005],),
  ([#{raw("tkt:EventTicket:1")}], [çäre bileti], [SD-JWT VC · Status List · togtatmak ýok · T0 · FW-RB-0004],),
  ([#{raw("id:DrivingLicenceAttestation:1")}], [sürüjilik şahadatnamasy maglumaty], [resmi resminama däl · SD-JWT VC · Status List, 1 bit · togtatmak ýok · T2 · FW-RB-0003],),
  ([#{raw("id:PseudonymSeed:1")}], [lakam tohumy], [hiç bir barlaýja görkezilmeýär · SD-JWT VC · ýatyrylyş sanawy ýok · T2 · ADR-0031, ADR-0061],),
  ([#{raw("id:ShortLivedIdentityAttestation:1")}], [ZK nusgasy], [mdoc · ýatyrylyş sanawy ýok, iň köp 24 sagat · togtatmak ýok · T2 · ADR-0044],),
))

Talyp resminamasy ýatyrylyş sanawyny ulanmaýar; gysga ömür ýatyrylyşyň ornuny tutýar. Diplom möhletsiz we ýatyrylyş sanawyny ulanýar; plagiat ýa-da ýasama hasaba alyş ýaly seýrek, ýöne hakyky ýatyrylyş sebäpleri bar. Diplom kodlanan meýdanlary bilen Ýewropa Öwreniş Modeline (ELM \[61\]) gabat getirilýär: Ýewropa Kärleriň Çarçuwasynyň derejesi (EQF) we ISCED-F ugur kody. Germaniýadaky iş berijiniň "Kompýuter inženerçiligi" ýazgysyny okamagy hökman däl; ol #{raw("0613")} ugur koduna we 7-nji derejä düşünýär (SPEC-SCHEMA-0001 §8.3). Sürüjilik şahadatnamasy maglumaty ne resmi sürüjilik şahadatnamasy, ne-de mobil sürüjilik şahadatnamasy; ýol gözegçiliginde geçmeýär we muny kartyň üstünde aç-açan aýdýar (ADR-0039). Milli şahsyýet belgisi diňe şahsyýet resminamasynda we diňe saýlap açylyp bilinýän meýdan hökmünde bar; hiç bir diplom, kart ýa-da bilet ony götermeýär (FW-ARF-0001 §5.1). Şahsyýet resminamasyndan döreýän görnüşleriň jikme-jikligi 14-nji bölümde.

== Kategoriýa signaly we kepillik

ÝB hukugynda kwalifisirlenen atribut tassyklamalary we döwlet çeşmesiniň adyndan berlen atribut tassyklamalary resminamanyň içinde awtomatik işlenip bilinýän kategoriýa görkezijisini göterýär; kwalifisirlenmedikler götermeýär. Tamga bu gurluşy öz şertlerinde gaýtalaýar (ADR-0010 K5). Resminama beriji ýazgysynyň synpy #{raw("PUB")} bolsa, resminama #{raw("category")} meýdanynda #{raw("urn:tamga:eaa:pub")}, #{raw("QUALIFIED")} bolsa #{raw("urn:tamga:eaa:qualified")} göterýär; synpy #{raw("EAA")} bolan, ýagny hasaba alnan ýa-da şertnamalaýyn derejedäki resminama berijiler kategoriýa götermeýär. Gurama diňe hasaba alyşdaky synpynyň signalyny goýup biler; barlaýjy ynam ädiminde resminamadaky kategoriýany sanaw bilen deňeşdirýär we gabat gelmese resminamany ret edýär (C4). Şeýlelikde ýasama signal peýda bermeýär. ÝB-niň öz kategoriýa atlary (#{raw("urn:etsi:esi:eaa:eu:*")}) ulanylmaýar; tor ÝB-niň çäginden daşarda.

Ikinji düzgün adam bilen bagly: #{strong[adamyň şahsyýet barlagynyň derejesi resminama hiç haçan ýazylmaýar]} (C18). Dereje görnüşiň deslapky şertidir; diplom diňe azyndan T2 baglanyşyk bilen berilýär (Tablisa 13) we baglanyşyk usuly diňe resminama berijiniň barlag ýazgysyna ýazylýar (PR7). ÝB hem derejäni resminama ýazmaýar (ADR-0010, E alternatiwasy).

Häzirki ýagdaý ýönekeý: tordaky ähli resminama berijiler kwalifisirlenmedik atribut tassyklamasyny berýär we hiç bir resminama kategoriýa meýdanyny götermeýär. Şahsyýet hyzmaty hem kwalifisirlenen däl; ÝB-de bu derejä garaşsyz laýyklyk bahalandyrmasy we gözegçilik gerek (ADR-0022). Resminama mundan başga-da "kwalifisirlenen däl" görkezijisi ýazylmaýar (ADR-0047). Diplomda guramanyň iň ýokary derejesiniň (I3) haçan açyljakdygy pilotdan soňa goýuldy.

= Resminama Bermek: OpenID4VCI Profili

Aýnuryň magistr diplomy taýýar. Elif uniwersitetiň talyp maglumat ulgamynda uçurymlyk ýazgysyny tassyklandan soň Aýnura şol bir ulgamdan salgy gidýär. Aýnur salgyny telefonynda açýar, gapjyk şahsyýetini soramak üçin razylyk soraýar, soňra birnäçe sekuntda diplom karty peýda bolýar. Şol birnäçe sekuntda gapjyk bilen uniwersitetiň resminama beriş hyzmatynyň arasynda birnäçe habar gatnaýar. Bu bölüm şol habarlary beýan edýär. Protokol OpenID Foundation-yň OpenID for Verifiable Credential Issuance 1.0 (OpenID4VCI \[30\]) resminamasydyr; Tamga onuň üstünde berk profil gurýar (SPEC-PROTO-0001). Tapgyryň sekizinji makalasy \[73\] protokolyň özüni noldan düşündirýär; bu ýerde profiliň saýlawlaryna we olaryň esaslaryna seredýäris.

== Iki başlangyç

Resminama iki ýol bilen soralyp bilner (FW-ARF-0001 §2.1). #{strong[Guramanyň başladýan]} ýolunda gurama #{strong[teklip]} (#{emph[credential offer]}) döredýär we ony adama QR kody ýa-da salgy hökmünde ýetirýär. #{strong[Gapjygyň başladýan]} ýolunda adam gapjykda guramany saýlaýar we resminamasyny soraýar; gapjyk guramalaryň sanawyny ynam sanawyndan okaýar, aýratyn serwerden soramaýar (PR15). Iki ýolda hem gurama ilki özüni tanadýar: her resminama beriş hyzmaty standart tanyşdyryş resminamasyny (#{emph[issuer metadata]}) çap edýär. Gapjyk bu resminamany gol çekilen görnüşde soraýar; gol çekiji guramanyň sanawdaky sertifikaty bolmasa, ony ulanmaýar. Resminama guramanyň hasaba alyş sertifikatyny hem göterýär; gapjyk soralan görnüşiň hasaba alnandygyny öňünden barlaýar (SPEC-PROTO-0001 §2.1).

Teklip QR kodunyň içine salynmaýar; QR kody diňe teklibiň salgysyny (#{raw("credential_offer_uri")}) göterýär we salgy #{strong[bir gezeklikdir]} (PR3). Ulanylan teklip ikinji gezek okadylanda gapjyk "bu çakylyk ulanyldy" diýýär; Aýnur "QR kodum işlemeýär" diýen pursaty syzdyryş duýulýar. Guramanyň başladýan ýolunda teklipler üç synpa bölünýär (Tablisa 14).

#tablo([#{strong[Tablisa 14.]} Teklip synplary we gorag (SPEC-PROTO-0001 §3.3).], (48fr, 33fr, 18fr, 35fr, 48fr), ([Synp​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Nirede görünýär], [Ömri], [Ikinji faktor], [Goşmaça düzgün],), (
  ([#{raw("on-screen")}], [adamyň sessiýa açan gurama ekranynda], [5 minut, bir gezeklik], [6 sanly amal kody, şol bir sessiýada], [3 nädogry synanyşykda teklip ýanýar],),
  ([#{raw("out-of-band")}], [e-poçta ýa-da SMS bilen iberilýän QR kody], [iň köp 72 sagat, bir gezeklik], [6 sanly amal kody, #{strong[başga kanal arkaly]}], [kanalyň salgysy diňe guramanyň hasaba alnan maglumatlaryndan; berlenden soň iki kanala hem "gapjyga goşuldy" habarnamasy],),
  ([#{raw("identity-bound")}], [guramanyň öz kanaly bilen iberen salgysy], [7 gün, bir gezeklik], [amal kody ýok; adam şahsyýet resminamasyny hödürleýär], [teklip adamyň şahsyýetine baglanan (9.2-nji bölüm)],),
))

Amal kody (#{raw("tx_code")}) ekrany egniň üstünden görýän ýa-da QR kodunyň suratyny alýan adama garşy ikinji faktordyr we öňünden ygtyýarlandyrylan akymda geçilip bilinmeýär (PR1). Kod teklibiň içinde gitmeýär. Şahsyýete baglanan teklibe bolsa amal kody asla gerek däl; sebäbi resminama diňe teklipde ady agzalýan adama berlip bilner.

#kutu("teknik", [Şahsyýete baglanan teklip obýekti])[
Şahsyýete baglanan teklip standartyň ygtyýarlandyryş kody akymyny ulanýar; teklipde öňünden ygtyýarlandyrylan kod ýok, diňe teklibiň belgisini göterýän #{raw("issuer_state")} bahasy bar. Gapjyk bu bahany ygtyýarlandyryş haýyşyna goýýar we resminama beriji teklibiň güýjündedigini, ulanylmandygyny we şol bir resminama görnüşi üçindigini barlaýar (SPEC-PROTO-0001 §3.4). Bahalar mysaldyr.

#kod("json", "{
  \"credential_issuer\": \"https://issuer.tamga.network/example-university\",
  \"credential_configuration_ids\": [\"urn:tamga:edu:DiplomaCredential:1\"],
  \"grants\": { \"authorization_code\": { \"issuer_state\": \"b3f1c2…\" } }
}", baslik: "Mysal: Aýnuryň diplomy üçin şahsyýete baglanan teklip")

#kod("text", "openid-credential-offer://?credential_offer_uri=
  https%3A%2F%2Fissuer.tamga.network%2Fexample-university%2Foffers%2F8a3f9c21", baslik: "Mysal: QR kodunyň göterýän salgysy")

Tanyşdyryş resminamasynda her resminama konfigurasiýasynyň belgisi we çägi (#{raw("scope")}) görnüşiň URN-idir; format hemişe #{raw("dc+sd-jwt")}, gol we subutnama algoritmi diňe ES256, toptan bermegiň möçberi 10. Gijikdirilen beriş nokady we habarnama nokady häzir yglan edilmeýär (§2.1, §9, §10).
]

== Ygtyýarly çeşme guramada

Diplomyň içindäki maglumat kimiňki? Tamga-nyň jogaby kesgitli: maglumat guramanyň öz ulgamynda we şol ýerde galýar. Ýerleşdirilen resminama beriş hyzmatynda-da tor adam ýazgysyny saklamaýar; resminama maglumatlary gol pursatynda guramanyň #{strong[ygtyýarly çeşmesinden]} (#{emph[authentic source]}) okalýar we resminama berlenden soň ýatdan aýrylýar (ADR-0020). Taslama dolandyryşynyň bu kararda ugry aýdyňdy: talyplary toptan ýüklemek ýok, teklip e-poçtasyny guramanyň özi iberýär, toruň adam maglumatlary bilen işi ýok. ÝB-de hem resminama üpjün edijisi atributy ygtyýarly çeşmeden alýar we araçynyň çeşme maglumatlaryny hemişelik saklamagyna garaşylmaýar.

Iki ýol kesgitlenen (Surat 13). #{strong[A ýolunda]} gurama başladýar: guramanyň ulgamy toruň API-sine resminama görnüşini, guramanyň adam üçin ulanýan aç-açan däl salgylanmasyny (#{raw("subject_ref")}) we iki deňeşdiriş açaryny, adamyň şahsyýet belgisini we doglan senesini iberýär. Hyzmat bu açarlary açyk saklamaýar; gurama başyna açarly heşi (HMAC-SHA-256 \[26\]) saklaýar. Salgyny adama guramanyň özi ýetirýär; tor adamyň aragatnaşyk salgysyny görmeýär (AS3). Aýnur salgyny açanda gapjyk şahsyýet resminamasyny hödürleýär; hödürlenen resminamadaky şahsyýet belgisiniň we doglan senesiniň heşi teklipdäki heş bilen gabat gelmese, resminama berilmeýär. Salgyny başga biri ele geçirse-de, resminamany alyp bilmeýär (AS2). #{strong[B ýolunda]} adam başladýar: Aýnur gapjykda uniwersiteti saýlaýar we şahsyýetini hödürleýär; resminama beriş hyzmaty guramanyň sorag nokadyna gol çekilen, gysga ömürli haýyş bilen ýüz tutýar. Ýazgy bar bolsa, resminama berilýär, ýok bolsa "guramanyň ýazgysynda tapylmady" jogaby gaýdýar we jogap saklanmaýar. Hemişelik galýan zat diňe guramanyň aç-açan däl adam salgylanmasy (ýatyrmak we täzelemek üçin) we şahsyýete baglanan teklipdäki açarly heşdir (AS1).

Toruň öz hasaba alyş kitabyny saklamagy (adam maglumatlaryny tora geçirýär) diňe synag gurşawyna goýuldy; teklip e-poçtasyny toruň ibermegi (tora aragatnaşyk salgysyny görkezýär) ret edildi; şahsyýet baglanyşygy bolmazdan diňe amal koduna daýanmak şahsyýet resminamasy bolmadyklar üçin ätiýaçlyk ýoly hökmünde galdy (ADR-0020). #{emph[Ýagdaýy: iki ýol hem ýerleşdirilen hyzmatda işleýär.]}

#sekil(13, [Ygtyýarly çeşme guramada: A ýoly we B ýoly], "figures/wp-tk/sekil-13.svg", yarim: false)

#kutu("teknik", [Gapjygyň başladýan bermesi])[
Gapjygyň başladýan ýolunda ygtyýarlandyryş kody akymy OAuth-yň howpsuzlyk goşundylary bilen bilelikde işleýär: ygtyýarlandyryş haýyşy ilki arka kanal arkaly iterilýär (PAR \[21\], RFC 9126), kod çalşygy PKCE \[22\] (S256) bilen goralýar we müşderiniň belgisi parol däl-de, gapjyk nusgasy tassyklamasydyr (PR13). Adamyň şahsyýeti guramanyň resminama beriş hyzmatyna edilen standart hödürleme bilen deňeşdirilýär (SPEC-PROTO-0001 §11.2).

#adimlar((
  ("Gapjyk → Resminama beriji", [#{strong[PAR.]} Soralýan görnüşi (#{raw("scope")} = görnüşiň URN-i), gaýdyş salgysyny, PKCE bahasyny we bar bolsa #{raw("issuer_state")}-i arka kanal arkaly iterýär; haýyşa gapjyk nusgasy tassyklamasy we onuň eýeçilik subutnamasy goşulýar.], $"request_uri" <- "PAR"(s, "code_challenge", "WIA")$),
  ("Gapjyk → Resminama beriji", [#{strong[Ygtyýarlandyryş.]} Ygtyýarlandyryş nokadyna ýüz tutýar; resminama beriji şahsyýet resminamasyny soraýan gol çekilen hödürleme haýyşyny gaýtarýar (şahsyýet belgisi, doglan senesi, ady, familiýasy).], $"haýyş" <- "authorize"("request_uri")$),
  ("Gapjyk → Resminama beriji", [#{strong[Hödürleme.]} Standart hödürleme akymyny işledýär; resminama beriji hödürlemäni doly barlag hataryndan geçirýär.], $"vp_token" -> "T0 + A…E"$),
  ("Resminama beriji", [#{strong[Deňeşdirme.]} Şahsyýet belgisini we doglan senesini teklipdäki heş ýa-da guramanyň çeşmesindäki ýazgy bilen deňeşdirýär; gabat gelmese #{raw("access_denied")}.], $"HMAC"_k ("şahsyýet belgisi", "doglan s.") attach(=, t: ?) "teklip heşi"$),
  ("Gapjyk → Resminama beriji", [#{strong[Bellik.]} Ygtyýarlandyryş koduny PKCE syry bilen bellige çalyşýar; kod bir gezeklik we iň köp 60 sekuntlyk.], $"access_token" <- ("code", v)$),
  ("Gapjyk → Resminama beriji", [#{strong[Resminama.]} Nonce, açar subutnamalary (#{raw("proof")}) we resminama haýyşy; ädimler guramanyň başladýan akymy bilen birmeňzeş (9.4-nji bölüm).], $"proofs" -> "credential"$),
))

Ulanylan ygtyýarlandyryş kody ikinji gezek gelse, resminama beriji ilki şol koddan berlen bellikleri yzyna alýar. Bu kodyň syzandygyndan şübhelenilende adamyň sessiýasyny ýapmagy hüjümçiniň kody ulanmagynyň öňüni almakdan öňe goýýan bilkastlaýyn saýlawdyr (RFC 9700 \[23\] §4.5; SPEC-PROTO-0001 §11.2).
]

== Diňe hakyky gapjyklara

Resminama beriji garşysyndakynyň sanawda tanalýan gapjykdygyny ýa-da ýasama müşderidigini bilmek isleýär. ÝB modelinde jogap gapjyk üpjün edijisiniň gol çeken iki tassyklamasydyr (ADR-0025; FW-POL-0002). #{strong[Gapjyk nusgasy tassyklamasy]} (#{emph[Wallet Instance Attestation]}, WIA) gapjygyň sanawda hasaba alnan üpjün edijiniň çözgüdidigini aýdýar. Onuň ömri 24 sagatdan gysga we her amalda täze açar hem täze ýatyrylyş ýazgysy bilen alynýar; iki gurama şol bir WIA-ny görmeýär, üpjün ediji hem gapjygyň näçe gurama bilen gatnaşandygyny bilmeýär. #{strong[Açar tassyklamasy]} (#{emph[key attestation]}, KA) bolsa resminamanyň baglanjak açarlarynyň haýsy ammarda, programmada ýa-da telefonyň howpsuz zolagynda durýandygyny aýdýar; onuň derejesi hakykaty aýtmaga borçly, barlanmadyk beýan tassyklama ýazylmaýar (WIA3).

Resminama beriji WIA-nyň goluny, gol çekijiniň sanawdaky gapjyk üpjün edijisine degişlidigini, möhletini, eýeçilik subutnamasyny we ýatyrylyş ýagdaýyny barlaýar; KA-nyň goluny, ýatyrylyş ýagdaýyny we ammar derejesiniň guramanyň iň pes çägini kanagatlandyrýandygyny barlaýar. Sanawda ýok üpjün edijiniň gapjygyna resminama berilmeýär; ýatyrylan tassyklama bilen hem berilmeýär (PR11, PR19). Guramalar iň pes çägi öz syýasatlary bilen ýokarlandyryp biler. Hakyky torda şahsyýet hyzmaty diňe açar tassyklamaly haýyşy kabul edýär we howpsuz zolak derejesini iň pes çäk hökmünde ulanýar; sandbox we ýerli işläp düzmek programma derejesini kabul etmegi dowam etdirýär (SPEC-PROTO-0001 §11.1.1). Köne model 30 gün güýjünde bolan we her guramaga birmeňzeş görkezilýän ýeke gapjyk tassyklamasydy; baglanyp bilinýändigi we ýatyrylyp bilinmeýändigi üçin taşlandy (ADR-0025). Jikme-jiklik 13-nji bölümde.

== DPoP, nonce we açar subutnamasy

Resminama beriş akymynda üç aýry mehanizm üç aýry soraga jogap berýär. Birinjisi bellik bilen bagly: giriş belligi ogurlansa näme bolýar? Tamga-da giriş belligi #{strong[DPoP]} \[20\] bilen iberijisine baglanýar (RFC 9449). Gapjyk wagtlaýyn P-256 açary bilen gol çekilen subutnamany iberýär we resminama beriji belligi şu açaryň barmak yzyna baglaýar; belligi ogurlan adam açar onda bolmandygy üçin ony ulanyp bilmeýär. Subutnama bir gezeklik we ±5 minutlyk penjiresi bar; belligiň ömri 5 minut (PR9, PR17).

Ikinjisi täzelik bilen bagly: gapjygyň subutnamasy ýaňy döredildimi ýa-da başga ýerden göçürildimi? Resminama berijiniň #{strong[nonce nokady]} 5 minut güýjünde bolan, bir gezeklik bahany (#{raw("c_nonce")}) berýär we baha #{strong[atomlaýyn]} sarp edilýär; "ilki barla, soňra poz" diýip iki ädimde edilýän sarp ediş şol bir subutnamanyň iki gezek ulanylmagyna getirýän ýaryşy galdyrardy (PR4). OpenID4VCI 1.0-da bu baha diňe nonce nokadyndan gelýär.

Üçünjisi açar bilen bagly: resminamanyň baglanjak açary hakykatdanam gapjykdamy? Gapjyk şu açar bilen kiçijik JWT-ä gol çekýär: #{strong[açar subutnamasy]} (#{raw("proof")}, görnüşi #{raw("openid4vci-proof+jwt")}); onuň içinde subutnamanyň haýsy resminama beriji üçindigi (#{raw("aud")}), döredilen pursaty (#{raw("iat")}) we ýaňy alnan #{raw("nonce")} bar. Subutnamanyň sözbaşysyndaky açyk açar resminamanyň #{raw("cnf")} meýdanyna girjek açardyr; KA hem şu sözbaşyda göterilýär. Subutnamada diňe ES256 kabul edilýär (PR5).

#kutu("teknik", [DPoP baglanyşygy we guramanyň başladýan bermesiniň ädimleri])[
DPoP baglanyşygynda bellik subutnamadaky açyk açaryň RFC 7638 \[24\] barmak yzyna baglanýar. Barmak yzy açaryň hökmany meýdanlarynyň sözlük tertibinde we boşluksyz ýazylan JSON-ynyň SHA-256 heşidir. Resminama nokadynda her haýyş mundan başga-da belligiň heşini (#{raw("ath")}) göterýär:

#formul[$ "jkt" &= "BASE64URL"("SHA-256"("JSON"({"crv", "kty", "x", "y"}))) \
"token.cnf.jkt" &attach(=, t: ?) "jkt"("DPoP subutnamasyndaky jwk") \
"ath" &= "BASE64URL"("SHA-256"("giriş belligi")) $]

Spesifikasiýadaky mysal P-256 açary (#{raw("x = f83OJ3D2…VEU")}, #{raw("y = x_FEzRu9…I5a0")}) üçin barmak yzy #{raw("oKIywvGUpTVTyxMQ3bwIIeQUudfr_CkLMjCE19ECD-U")} çykýar; bahalar mysaldyr. Guramanyň başladýan, öňünden ygtyýarlandyrylan kodly akymy şu ädimler bilen dowam edýär (SPEC-PROTO-0001 §1–§8; Surat 14):

#adimlar((
  ("Gurama → Aýnur", [#{strong[Teklip.]} Ekranda QR kody we aýratynlykda 6 sanly amal kody görkezýär; teklip salgysy bir gezeklik.], $"offer_uri", "tx_code"$),
  ("Gapjyk → Resminama beriji", [#{strong[Teklip we tanyşdyryş.]} Teklibi we gol çekilen tanyşdyryş resminamasyny alýar; gol çekijini sanawdaky gurama sertifikaty bilen deňeşdirýär.], $"metadata" -> "sanaw"$),
  ("Gapjyk → Resminama beriji", [#{strong[Bellik.]} Öňünden ygtyýarlandyrylan kody we amal koduny DPoP subutnamasy hem gapjyk nusgasy tassyklamasy bilen iberýär.], $"access_token" <- ("code", "tx_code", "DPoP", "WIA")$),
  ("Gapjyk → Resminama beriji", [#{strong[Nonce.]} Nonce nokadyndan täze baha alýar.], $"c_nonce" <- "nonce nokady"$),
  ("Gapjyk", [#{strong[Açarlar.]} On nusga üçin on aýry açar döredýär; üpjün edijiden açar tassyklamasyny (KA) alýar we açar subutnamasyna gol çekýär.], $k_1 dots.c k_(10) quad pi = "gol"("aud", "iat", "c_nonce")$),
  ("Gapjyk → Resminama beriji", [#{strong[Resminama haýyşy.]} #{raw("Authorization: DPoP")} sözbaşysy, şol bir açar bilen täze DPoP subutnamasy (#{raw("ath")} bilen) we sözbaşysynda KA göterýän açar subutnamasy.], $"POST /credential"$),
  ("Resminama beriji", [#{strong[Barlaglar.]} Bellik we çäk; subutnamanyň goly, #{raw("aud")}, #{raw("iat")}; nonce-y atomlaýyn sarp et; açarlaryň tapawutlylygy; görnüş ygtyýary henizem güýjündemi.], $"nonce" in "täze toplum" => "poz"$),
  ("Resminama beriji", [#{strong[Gol.]} Maglumaty ygtyýarly çeşmeden okaýar, her nusgany aýry açara baglaýar, her nusga üçin ýatyrylyş sanawynda tötänleýin orun goýýar we guramanyň açary bilen gol çekýär.], $"cnf"_i = k_i quad "idx"_i <- "tötänleýin"$),
  ("Resminama beriji → Gapjyk", [#{strong[Jogap.]} Nusgalary gaýtarýar; olaryň her biri SD-JWT VC setiridir we soňky tilda bilen gutarýar.], $"credentials"[1 dots.c 10]$),
))

Görnüş ygtyýarynyň resminama nokadynda täzeden soralmagy artykmaç ýaly görünip biler; tanyşdyryş resminamasy döredilende ol eýýäm barlanypdy (PR2). Ýöne ygtyýar tanyşdyryş resminamasy keşe alnandan soň yzyna alnan bolup biler; bu arzan barlag we nädogry resminama döretmegiň bahasy ýokary (SPEC-PROTO-0001 §7.3).
]

Säwlik kodlary standartyň öz kodlarydyr we şahsy maglumat saklamaýar: "Aynur Məmmədova üçin ýazgy tapylmady" diýilmeýär, #{raw("credential_request_denied")} diýilýär (PR8). Akymyň käbir jikme-jiklikleri 2026-njy ýylyň oktýabrynda OpenID Foundation-yň laýyklyk synag guraly bilen sandbox-yň üstünde geçirilen öz-synagdan çykdy (ADR-0059, ADR-0060); bu öz-synagdyr, sertifikat aýratyn prosesdir (16.5-nji bölüm).

#sekil(14, [Guramanyň başladýan resminama bermesi: yzygiderlik diagrammasy], "figures/wp-tk/sekil-14.svg", yarim: false)

== Toptan bermek: on nusga, on açar

Aýnur diplomyny Timura, soňra başga iş berijä, soňra talyp haky guramasyna görkezip biler. Hemişe şol bir nusgany görkezen bolsa, bu guramalar şol bir #{raw("cnf")} açaryndan we şol bir ýatyrylyş ornundan üçüsiniň-de şol bir adam bilen gatnaşandygyna düşünip bilerdi. Çözgüt her hödürlemede başga nusga ulanmakdyr (SPEC-PROTO-0001 §8.1). Tamga-da bir beriş amalynda #{strong[on nusga]} berilýär we her nusga #{strong[başga enjam açaryna]} baglanýar (PR6). Bir haýyşda şol bir açar bilen iki subutnama gelse, resminama beriji haýyşy ret edýär. Gapjyk her barlaýja aýry nusga görkezýär we şol bir barlaýja şol bir nusgany görkezmegi dowam etdirýär (13.4-nji bölüm).

On sany deňagramlylykdyr: ýeke nusga baglanyşygy açyk galdyrýar, elli nusga isrip döredýär; baha pilot maglumatlary bilen täzeden sazlanar (SPEC-PROTO-0001 §8.3, Açyk meseleler 4). Diplomyň her nusgasy ýatyrylyş sanawynda #{strong[aýry orun]} sarp edýär. Diplom ýatyrylanda on ornuň hemmesi bellenýär; haýsy orunlaryň şol bir diploma degişlidigini diňe gurama öz maglumat bazasynda bilýär we bu gabat getiriş hiç haçan daşary çykmaýar (PR10). On bitiň bir wagtda üýtgemegi daşardan signal bolup bilerdi; ýöne ýatyrylyş sanawlary üýtgeşme bolsa-da, bolmasa-da kesgitli aralyk bilen çap edilýändigi üçin haýsy bitleriň bilelikde üýtgändigi görünmeýär (12.4-nji bölüm).

Giriş belligini 5 minutlyk ömrüniň dowamynda birnäçe resminama haýyşynda ulanyp bolýar; ýöne diňe öz içine alýan konfigurasiýasy üçin, jemi on nusga çenli we hemişe baglanan DPoP açary bilen. Ömür gaýtadan ulanmak bilen uzalmaýar (ADR-0059, AT1–AT3). Bir gezeklik bellik ÝB-niň salgylanma resminama berijisinden tapawutlanýardy we tor kesilende täze ygtyýar talap edýärdi; çäksiz gaýtadan ulanmak ýatyrylyş orunlaryny gutaryp bilerdi. Bilet we ZK nusgasy ýeke bukja bolup galýar.

== Sessiz täzelemek

Nusgalar dizaýn boýunça gutarýar. Gurama resminamalarynda (talyp resminamasy we diplom; biletlerden başga) gapjyk nusgalar azalanda ýa-da möhleti gutarmaga golaý bolanda adamdan soramazdan täze nusga alyp biler (ADR-0023). Çäkleri resminama beriji yglan edýär: iki ulanylmadyk nusga galanda ýa-da ýedi günlük ömür galanda (SPEC-PROTO-0001 §2.1). Gapjyk täzelemegi programma öňde wagty we tötänleýin gijikme bilen edýär.

Täzeleme ilkinji beriş amalynda berlen #{strong[täzeleme belligi bilen]} edilýär. Bellik bir gezeklik, her ulanylanda täzesi bilen çalşylýar we resminama beriji diňe onuň heşini saklaýar. Täzelemede resminama beriji ýazgyny ygtyýarly çeşmeden täzeden okaýar; adam çeşmede ýok bolsa, bellik güýjüni ýitirýär we resminama berilmeýär (PR18). Belligiň nämä baglanýandygy bir gezek üýtgedi. Ilkinji kararda bellik ilkinji amaldaky DPoP açaryna baglanýardy. OAuth-yň gapjyk tassyklamasy bilen müşderini barlamak profili bolsa baglanyşygyň #{strong[müşderi nusgasynyň açaryna]}, ýagny ilkinji amaldaky gapjyk nusgasy tassyklamasynyň #{raw("cnf")} açaryna gurulmagyny we DPoP açarynyň üýtgäp bilmegini talap edýär. Tamga baglanyşygy şoňa görä üýtgetdi (ADR-0060). Gapjyk her amalda täze WIA açaryny ulanýandygy üçin baglanyşygyň açary diňe şol resminama bilen saklanýar we täzelemede üpjün edijiden şu açar üçin täze WIA soralýar; açary diňe şol gurama görýär. Ýeke-täk hemişelik nusga açary has ýönekeý bolardy we ähli guramalar şol bir açary görjekdigi üçin ret edildi.

Adam maglumatlaryny saklamaýan görnüşlerde sessiz täzelemek ýok: şahsyýet resminamasy we aragatnaşyk resminamalary täzeleme belligini bermeýär we täzeleme adamyň hereketi bilen bolýar. Şahsyýet hyzmatynyň ýeke-täk kadadan çykmasy nol bilimli subutnama üçin ulanylýan gysga ömürli nusgalardyr; olaryň belligi şahsyýet resminamasyny täzelemeýär, diňe gysga ömürli nusga alýar we diňe gapjyk bu çägi aýratyn sorasa berilýär (ADR-0044, ADR-0062; 15.4-nji bölüm). #{emph[Ýagdaýy: sessiz täzelemek we müşderi nusgasyna baglanyşyk işleýär (paketlerde 0.7.2-den bäri).]}

== Habarnama we "siz däl bolsaňyz"

Resminama beriş akymynyň soňky ädimi adam bilen bagly. Toruň arhitektura resminamasy resminama gapjyga goşulanda adama "resminamaňyz gapjyga goşuldy; siz däl bolsaňyz habar beriň" habarynyň gitmegini göz öňünde tutýar (FW-ARF-0001 §4.3). E-poçta ýa-da SMS bilen iberilýän tekliplerde bu habar resminama berlenden soň iki kanala hem gidýär (SPEC-PROTO-0001 §3.3). Adamyň habary bolmazdan gapjyga alnan resminama şeýlelikde duýulýar; ulanylan teklip duýduryşy bilen bilelikde, ele geçirilen salgynyň yzyny yzarlaýan ikinji alamatdyr.

Mundan aýratynlykda OpenID4VCI gapjygyň resminamany kabul edendigini resminama berijä habar berýän #{strong[habarnama nokadyny]} kesgitleýär. Tamga resminama berijileri bu nokady häzir yglan etmeýär (SPEC-PROTO-0001 §10). Nokat goşulsa, habarnamalar diňe hasaplaýjy hökmünde ulanylar, adam boýunça saklanmaz; gapjyk resminamanyň soňra pozulandygyny hiç bir resminama berijä habar bermeýär. Gijikdirilen beriş nokady hem hödürlenmeýär: ýazgy taýýar bolmasa haýyş ret edilýär we gurama soňra täze teklip döredýär (SPEC-PROTO-0001 §9). #{emph[Ýagdaýy: adama habar bermek düzgüni kesgitlenen; standart habarnama nokady we gijikdirilen bermek hödürlenmeýär.]}

Aýnuryň diplomy indi gapjygynda, on nusga görnüşinde, olaryň her biri aýry açara baglanan. Timuryň ondan nähili soraýandygy, gapjygyň nämäni görkezýändigi we barlaýjynyň haýsy tertipde nämäni barlaýandygy indiki bölümleriň temasy.

= Hödürlemek: OpenID4VP, DCQL we Ýakyn Aralyk

Aýnur oýlanyp tapylan Mysal Holdingiň bildirişine arza berýär. Bakuwdaky diplomy üçin häzir bu ýol açyk däl: torda diňe Türkiýäniň sanawy işjeň, Azerbaýjan üçin orun goýuldy (bu hiç bir döwlet bilen ylalaşygyň ýa-da gepleşigiň habarnamasy däldir). Şonuň üçin mysaly Aýnuryň Türkiýe sanawyndaky oýlanyp tapylan Mysal uniwersitetinden alan diplomy arkaly gurýarys. Işe almak boýunça jogapkär Timuryň ekranynda QR kody peýda bolýar; Aýnur ony okadýar, gapjygy oňa kimiň näme soraýandygyny aýdýar, Aýnur tassyklaýar we birnäçe sekuntdan soň ekranda "kabul" ýazgysy çykýar. Diplom bir gezek berilýär, ýöne onlarça gezek görkezilýär we her hödürlemede üç sorag bar: Kim soraýar? Näme soraýar we näme üçin? Jogap diňe oňa ýetýärmi? Tamga bu soraglara ÝB-niň saýlan protokoly, #{strong[OpenID4VP 1.0]} \[31\] (#{emph[OpenID for Verifiable Presentations]}, barlanyp bilinýän hödürleme protokoly) we onuň ÝB-däki ýokary kepillik profili #{strong[HAIP 1.0]} \[32\] bilen jogap berýär (SPEC-PROTO-0002). Protokolyň esasy tapgyryň sekizinji makalasynda düşündirildi; bu ýerde Tamga-nyň nämäni näme üçin saýlandygyna ünsi jemleýäris.

== Gol çekilen haýyş we barlaýjynyň şahsyýeti

QR kodunyň içinde resminama ýok, şahsy maglumat hem ýok; diňe haýyşyň göçüriljek salgysy (#{raw("request_uri")}) bar. Gapjyk bu salgydan #{strong[gol çekilen haýyş obýektini]} göçürip alýar. Haýyş barlaýjynyň (#{emph[verifier]}) giriş sertifikaty bilen gol çekilen JWT-dir; onuň sözbaşysynda sertifikat zynjyry (#{raw("x5c")}) bar. Gol çekilmedik haýyş ret edilýär (PV6); gol bolmasa, gapjyk garşysyndakynyň kimdigini bilip bilmeýär, adamy artyk talapdan hem duýdurup bilmeýär.

Barlaýjy özüni #{strong[müşderi belgisi]} (#{emph[client identifier]}) bilen tanadýar. HAIP 1.0 §5 gol çekilen haýyşlarda barlaýjynyň #{raw("x509_hash")} öňüşekilini ulanmagyny we gapjygyň ony kabul etmegini hökmany edýär. Baha haýyşa gol çeken ýaprak sertifikatyň heşinden hasaplanýar. Tamga diňe şu öňüşekili kabul edýär; öň ulanylan domen ady esasly öňüşekil (#{raw("x509_san_dns")}) we gol çekilmedik #{raw("redirect_uri")} öňüşekili ret edilýär (ADR-0034). Domen ady düzgüniniň howpsuzlyk tarapy saklanýar: jogap salgysynyň domen ady haýyşa gol çeken sertifikatyň SAN meýdanynda ýazylgy bolmaly.

#kutu("teknik", [Müşderi belgisi nähili hasaplanýar, näme üçin ikinji belgi gerek])[
#{raw("x509_hash")} bahasy ýaprak sertifikatyň DER kodlamasynyň SHA-256 heşiniň base64url görnüşidir (OpenID4VP 1.0 §5.9.3):

#formul[$ "client_id" = "x509_hash:" ‖ "base64url"("SHA-256"("DER"("ýaprak sertifikat"))) $]

Sanaw çap ediji şol bir bahany barlaýjynyň giriş sertifikatyndan hasaplap, ynam sanawyndaky ýazga ýazýar. Gapjyk haýyşdaky bahany sanawdaky ýazgy bilen deňeşdirýär we barlaýjynyň hasaba alnan adyny, çägini we ýagdaýyny tapýar. Baha el bilen berilmeýär; paketler ony sertifikatdan hasaplaýar (ADR-0034 CI1).

Bu belginiň bir gowşak tarapy bar: sertifikat täzelenende heş hem üýtgeýär. Lakamlar, resminama nusgalarynyň gabat getirilişi we geçiş kartalary şu baha baglanan bolsady, her täzelenmede adamyň hasaplary we kartalary ýiterdi. Şonuň üçin her barlaýjy ýazgysy mundan başga-da #{strong[hemişelik belgi]} göterýär: sertifikatyň SAN meýdanyndaky domen ady (#{raw("dns_name")}). Sertifikatdan garaşsyz galmaly her zat şu meýdana baglanýar (ADR-0034 CI3, CI4). Hemişelik belgi üçin #{raw("rp_id")} hem göz öňünde tutuldy, ýöne ol hem sertifikatdan alynýandygy üçin saýlanmady.
]

Haýyş ýene bir zady göterýär: barlaýjynyň şol ulanyş üçin alan #{strong[hasaba alyş sertifikatyny]} (#{emph[registration certificate]}, ETSI TS 119 475 \[46\]). Giriş sertifikaty "meniň kimdigimi", hasaba alyş sertifikaty "nämäni, haýsy maksat bilen soramak üçin hasaba alnandygymy" aýdýar. Sertifikat haýyşyň #{raw("verifier_info")} meýdanynda gelýär; diňe ynam sanawyndaky ýazgydan döredilýär we hasaba alyş edarasynyň aýratyn açary bilen gol çekilýär (ADR-0026). Gapjyk dört zady yzygiderlikde barlaýar: goluň sanawlaryň sanawyndaky hasaba alyş edarasynyň açaryna degişlidigini, möhleti (iň köp 12 aý), sertifikatdaky guramanyň belgisiniň (#{raw("sub")}) giriş sertifikatyndaky #{raw("organizationIdentifier")} bilen birmeňzeşdigini we soralan meýdanlaryň sertifikatyň çäginde galýandygyny. Ilkinji üçüsiniň biri gabat gelmese, gapjyk maglumat ibermeýär (ADR-0026 WRC4).

ÝB-niň 2026\/1731 \[7\] belgili ýerine ýetiriş düzgünnamasy bu barlagy gapjykda 2028-08-11-den başlap hökmany edýär. Tamga şol sene çenli duýduryş bilen geçiş göz öňünde tutupdy; 2026-10-19-da geçiş aýryldy we hasaba alyş sertifikatyny götermeýän haýyş häzirden, adamdan soralman ret edilýär (ADR-0056 K10). Duýduryş hasaba alynmadyk ulanyşa gapy galdyrýardy we bozujy üýtgeşmäniň iň arzan pursaty gapjyklar giňden ýaýramazdan öňdi. Hasaba alyş sertifikatlary 2026-10-29-dan bäri syýasat belgisini we hasaba alyş edarasynyň 1 bitlik ýatyrylyş sanawyndaky ýazgyny hem göterýär; gapjyk sertifikaty ýatyrylan haýyşa maglumat ibermeýär (ADR-0068, FW-POL-0003). #{strong[Ýagdaýy:]} işleýär (hakyky tor we sandbox).

== DCQL bilen näme soralýar

Barlaýjy nämäni isleýändigini #{strong[DCQL]} (#{emph[Digital Credentials Query Language]}, sanly resminama sorag dili) bilen aýdýar. OpenID4VP-niň köne taslamalaryndaky Presentation Exchange Tamga-da asla goldanmaýar; #{raw("presentation_definition")} göterýän haýyş ret edilýär (PV1). Iki sorag hereketlendirijisini bilelikde goldamak köne ýüki bolmadyk tor üçin diňe hüjüm meýdany diýmekdi.

DCQL-iň iň anyk peýdasy iň kiçi soragy berip bilmekdir. Talyp arzanladyşyny soraýan kinoteatr diňe "talypmy" diýip soraýar.

#kod("json", "{
  \"credentials\": [
    {
      \"id\": \"student\",
      \"format\": \"dc+sd-jwt\",
      \"meta\": { \"vct_values\": [\"urn:tamga:edu:StudentCredential:1\"] },
      \"claims\": [ { \"path\": [\"is_enrolled\"], \"values\": [true] } ]
    }
  ]
}", baslik: "Mysal: talyp arzanladyşy üçin iň kiçi DCQL soragy (bahalar mysaldyr)")

Kinoteatr bu sorag bilen adyny, uniwersiteti, hünäri we okuwa giren ýylyny görmeýär. Timuryň işe almak syýasaty bolsa diplom üçin sekiz meýdan soraýar (uçurymlyk, dereje ady, dereje, ugur kody, beriji gurama, sene, ady, familiýasy); ortaça baha we dissertasiýanyň ady soragda ýok bolany üçin gapjykdan çykmaýar. #{raw("vct_values")} massiwdir we barlaýja azyndan iki shema wersiýasyny bilelikde kabul etmek maslahat berilýär; ýogsam shemanyň täzelenmegi köne uçurymlary daşarda galdyrýar (SPEC-PROTO-0002 §4.2).

Sorag saýlaw hem hödürläp biler (#{raw("credential_sets")}: "diplom ýa-da talyp resminamasy"; #{raw("claim_sets")}: "ilki dissertasiýaly, bolmasa dissertasiýasyz"). Her saýlaw adamyň razylyk ekranynda düşünmeli çylşyrymlylygydyr; şonuň üçin bir haýyşda iň köp üç resminama we iki #{raw("credential_sets")} ýazgysy bolup biler (PV9). Çägiň çaklamadygy we ulanyjy synagy bilen sazlanjakdygy spesifikasiýada ýazylan. Islege bagly toplum deslapky ýagdaýda paýlaşylmaýar; soralan meýdanlaryň birini götermeýän resminama asla iberilmeýär (PV12). mdoc \[34\] görnüşindäki şahsyýet resminamasynda ýaş soraýan barlaýjy diňe #{raw("[\"tamga.id.1\", \"age_over_18\"]")} ýoluny soraýar we diňe #{raw("true")} görýär.

== Razylyk ekrany we artyk talap

Razylyk ekrany adamyň görýän ýeke-täk ýüzi we onuň tertibi düzgün bilen kesgitlenen: kim soraýar (sanawdaky hasaba alnan ady we hasaba alyş belligi), näme üçin (hasaba alyş sertifikatyndaky maksat teksti), näme paýlaşylar (meýdanma-meýdan, bahalary bilen), näme paýlaşylmaz (gizlin galýan meýdanlaryň diňe atlary), soňra razylyk ýa-da ret (SPEC-WALLET-0001 §5.1). Dördünji madda adaty däl. "Ortaça bahaňyz paýlaşylmaz" setiri saýlap açmagyň işleýändigini adama görkezýär; görünmeýän gorag adam üçin ýok ýalydyr.

Haýyş hasaba alnan çäkden geçse näme bolýar? Bu ýerde iki ýol bardy: gapjyk haýyşy böwetläp biler ýa-da adamy duýdurup, karary oňa galdyryp biler. Tamga duýdurmagy saýlady. Gapjyk adamyň guralydyr; adam bilkastlaýyn hasaba alynmadyk gözlegçä ýa-da synaga resminama görkezmek isläp biler. Ýöne duýduryşyň hakykatdanam görülmegi gerek. Razylyk düwmesiniň ýanyndaky kiçijik çal ýazgy muny üpjün etmeýär; düzgün aýratyn görüş bölegini we gijräk işjeňleşýän düwmäni talap edýär (WL8). Duýduryş ýadawlygynyň öňüni almak üçin adaty akymda hiç hili duýduryş ýok (Tablisa 15).

#tablo([#{strong[Tablisa 15.]} Haýyşyň ýagdaýyna görä gapjygyň hereketi.], (48fr, 48fr, 20fr), ([Ýagdaý], [Gapjyk näme edýär], [Çeşme],), (
  ([Barlaýjy hasaba alnan, ähli meýdanlar çägiň içinde], [Adaty razylyk ekrany, duýduryş ýok], [SPEC-WALLET-0001 §5.2],),
  ([Hasaba alnan, ýöne käbir meýdanlar çägiň daşynda], [Çägiň daşyndaky meýdanlar aýratyn bölekde we başga reňkde; razylyk düwmesi 3 sekunt gijikdirilen], [WL8],),
  ([Barlaýjy sanawda hasaba alynmadyk], [Akymy kesýän aýratyn ekran: "Kimdigini tassyklap bilmeýäris" → Dowam et \/ Ýatyr], [SPEC-PROTO-0002 §6.1],),
  ([Haýyşda hasaba alyş sertifikaty ýok, sertifikat güýjünde däl ýa-da ýatyrylan], [Adamdan soralman ret; maglumat gitmeýär], [ADR-0026, ADR-0056 K10, ADR-0068],),
  ([Resminama berijiniň paýlaşma düzgüni ýerine ýetmeýär ýa-da bahalandyrylyp bilinmeýär], [Aýratyn duýduryş bölegi, bar bolsa "Düzgüni oka"; deslapky düwme "Paýlaşma", "Barybir paýlaş" gijikdirilen], [ADR-0046],),
  ([Şol bir barlaýjydan 24 sagatda 3-den köp dürli sorag], [Adama maglumat: "Bu barlaýjy şu gün 4 dürli resminama sorady"], [SPEC-WALLET-0001 §5.3],),
))

Bäşinji setir resminama berijiniň sesidir: gurama görnüşiň diňe belli barlaýjylara görkezilmegini isläp biler (ÝB ARF \[11\] 43-nji tema). Düzgün resminamanyň içine goýulmady; resminama formaty üýtgemez ýaly, düzgün barlaýja açylmaz ýaly we hödürlemede tor haýyşy gerek bolmaz ýaly ol guramanyň gol çekilen resminama beriş maglumatlarynda (#{emph[Credential Issuer metadata]}) baha hökmünde çap edilýär, gapjyk ony resminama bilen bilelikde saklaýar (ADR-0046). Düzgün ýerine ýetmese, soňky karary barybir adam berýär; berk böwet şol bir resminamanyň ÝB gapjygynda başgaça hereket etmegine getirjekdigi üçin ret edildi. Soňky setir bolsa barlaýjynyň dürli soraglar bilen adamyň haýsy resminamalara eýedigini kartalaşdyrmagyny görünýän edýär.

== Jogap we şifrlemek

Aýnur tassyklanda gapjyk diňe soralan meýdanlaryň açyşlaryny (#{emph[disclosure]}) saýlaýar we olara #{strong[KB-JWT]} (#{emph[Key Binding JWT]}, enjam baglanyşygynyň goly) goşýar. KB-JWT resminamanyň baglanan enjam açary bilen gol çekilýär we üç zady biri-birine baglaýar: barlaýjynyň müşderi belgisiniň hemmesini (#{raw("aud")}, öňüşekili bilen bilelikde; PV7), haýyşyň bir gezeklik bahasyny (#{raw("nonce")}) we iberilen setiriň heşini (#{raw("sd_hash")}; hasaby 8-nji bölümde). Şeýlelikde ýazga alnan hödürlemäni ne başga barlaýja, ne-de şol barlaýjynyň başga haýyşyna gaýtadan oýnap bolmaýar.

#kutu("teknik", [Bir gezeklik baha näme üçin 128 bit, mdoc-da baglanyşyk nähili gurulýar])[
Haýyşdaky #{raw("nonce")} we #{raw("state")} azyndan 128 bit tötänleýin (SPEC-PROTO-0002 §3). Hüjümçiniň bir synanyşykda dogry bahany tapmak ähtimallygy şeýle:

#formul[$ P = 2^(-128) approx 2.9 dot 10^(-39) $]

mdoc görnüşinde şol bir baglanyşyk enjam golunyň üstünde gurulýan sessiýa ýazgysy (#{emph[SessionTranscript]}) bilen üpjün edilýär. OpenID4VP 1.0 B goşmaçasynyň B.2.6.1 bölümine görä ýazgy müşderi belgisini, #{raw("nonce")}-y, jogabyň şifrlenen açarynyň RFC 7638 \[24\] barmak yzyny we jogap salgysyny bilelikde heşleýär:

#formul[$ "SessionTranscript" = ["null", "null", ["OpenID4VPHandover", "SHA-256"("CBOR"(["client_id", "nonce", "jwkThumbprint", "response_uri"]))]] $]

Başga haýyşa geçirilen enjam jogaby barlagyň A6 ädiminde ret edilýär (PV11).
]

Hödürleme şahsy maglumat göterýär. Şonuň üçin jogap hemişe şifrlenen: haýyş obýektindäki barlaýjy açary bilen JWE hökmünde (#{raw("ECDH-ES")}, #{raw("A128GCM")} ýa-da #{raw("A256GCM")}; HAIP §5) jogap salgysyna iberilýär (#{raw("direct_post.jwt")}). Şifrlenmedik jogap tertipleri asla ulanylmaýar (PV3). Daşaýyş gatlagynyň şifrlemesi ýeterlik däl; jogap salgysynyň öňündäki ters proksi, howpsuzlyk diwary ýa-da žurnal ulgamy mazmuny görüp biler. Jogap nokady güýjündäki jogaba diňe gaýdyş salgysyny berýär; başga hiç zat gaýtarmaýar (OpenID4VP 1.0 §8.2).

Aýnur bermezligi saýlasa, gapjyk diňe "bermedi" diýýär (#{raw("access_denied")}) we sebäbini aýtmaýar (PV5). "Adamda bu resminama ýok" bilen "adam bermek islemedi" arasyndaky tapawut barlaýja syzsa, barlaýjy soraglar bilen adamyň haýsy resminamalara eýedigini anyklap biler. Aşakdaky ädimler we Surat 15 akymyň hemmesini görkezýär.

#adimlar((
  ("Timuryň serweri", [#{strong[Hödürlemäni aç.]} Syýasatdan DCQL döredýär, bir gezeklik bahalar bilen haýyş obýektini taýýarlaýar; QR-a diňe salgy girýär.], $"nonce", "state" <- "tötänleýin"_(>= 128 "bit")$),
  ("Gapjyk → Barlaýjy", [#{strong[Haýyşy al.]} Salgydan gol çekilen haýyş obýektini göçürip alýar; her alnyş aýratyn şahadyr (§10.5).], $"GET request_uri"$),
  ("Gapjyk", [#{strong[Barla.]} Gol we zynjyr, müşderi belgisiniň sanawdaky ýazgysy, hasaba alyş sertifikaty we onuň ýagdaýy, paýlaşma düzgüni, çäk.], $"client_id" attach(=, t: ?) "ýazgy.client_id"$),
  ("Aýnur", [#{strong[Tassykla.]} Ekranda kimiň, näme üçin, haýsy meýdanlary soraýandygyny görýär; enjamyň biometriýasy ýa-da paroly bilen tassyklaýar.], $"ulanyjyny barlamak"$),
  ("Gapjyk", [#{strong[Jogaby gur.]} Diňe soralan açyşlary saýlaýar, KB-JWT-ä gol çekýär.], $"aud" = "client_id", quad "sd_hash"$),
  ("Gapjyk → Barlaýjy", [#{strong[Iber.]} Jogaby barlaýjynyň açary bilen şifrläp, jogap salgysyna iberýär.], $"JWE"("vp_token")$),
  ("Barlaýjy", [#{strong[Barla.]} Jogaby açýar we barlag hataryny (11-nji bölüm) işledýär; netijäni üç bahanyň biri hökmünde berýär.], $"T0" -> "A" -> "B" -> "C" -> "D" -> "E"$),
))

#sekil(15, [Uzakdan hödürlemek: gol çekilen haýyş, razylyk we şifrlenen jogap], "figures/wp-tk/sekil-15.svg", yarim: false)

== Ýasama rete garşy alnyş şahalary

2026-10-29-da ýapylan bir gowşaklyk standartdaky bir boşlugy gowy görkezýär. OpenID4VP 1.0-da gapjygyň ret jogaby gol çekilmedik we şifrlenmezden iberilip bilner; reti hödürleme baglaýan ýeke zat #{raw("state")} bahasydyr. Tamga-da #{raw("state")} gol çekilen haýyş obýektindedi we haýyş obýektini QR-daky salgydan islendik adam şahsyýetini tassyklamazdan alyp bilýärdi. Timuryň ekranyndaky QR-y ýandaky stoldan gören adam obýekti alyp, "adam ret etdi" diýip ýasama jogap iberip, Aýnuryň arzasyny bozup bilerdi. Şahsy maglumat syzmazdy, ýöne amal böwetlenerdi.

Çözgüt haýyş salgysynyň her alnyşynda täze #{strong[alnyş şahasyny]} açmakdyr (ADR-0067). Her alnyş şol bir mazmun bilen täzeden gol çekilen haýyş obýektini alýar; ýöne #{raw("state")}, #{raw("nonce")} we jogaby şifrleýän açar her şahada täze. QR-y gören adam diňe öz şahasynyň #{raw("state")}-ini bilýär. Onuň ýasama reti diňe öz şahasyny ýapýar; Aýnuryň gapjygy öz şahasynda hödürlemäni tamamlaýar. Hödürleme doly diňe ýeke alnyşy bar bolsa we şol şaha ýapylan bolsa ret edilen hasaplanýar; birnäçe alnyş bar bolsa, möhleti gutarýança açyk galýar we ilkinji dogry hödürleme ýeňýär (Tablisa 16).

#tablo([#{strong[Tablisa 16.]} Ýasama ret meselesi üçin seredilen wariantlar (ADR-0067).], (36fr, 18fr, 48fr), ([Wariant], [Netije​​​​​​​​], [Näme üçin],), (
  ([Ilkinji ret hödürlemäni ýapýar (giňden ýaýran amalyýet)], [ret], [QR-y gören islendik adam hakyky adamyň amalyny bozup biler],),
  ([Gapjyk rete enjam açary bilen gol çekýär], [ret], [Standartdan daşary; retiň kimiň enjamyndan gelendigini barlaýja baglaýar we "ret sebäbi syzmaýar" ýörelgesine ters gelýär],),
  ([Ret hödürlemäni asla ýapmaýar], [ret], [Adaty akymda adam "bermedim" diýende barlaýjy möhlet gutarýança garaşýar],),
  ([Her alnyş aýratyn şaha, ret diňe öz şahasyny ýapýar], [#{strong[saýlandy]}], [Standartyň içinde galýar; HAIP-iň "her haýyşda wagtlaýyn açar" düzgüniniň has berk deňidir],),
))

Şahalaryň ýat bahasy bar. Ilkinji dizaýndaky kesgitli çäk (hödürleme başyna 10 şaha) özi böwetlemegiň ýoludy; häzir 10-dan geçýän alnyş asla jogap almadyk we azyndan 120 sekuntlyk iň köne şahanyň ornuny alýar, 32-de ýaş şerti aýrylýar, jogaby işlenen şaha asla taşlanmaýar. Eýeçilik subutnamasyna ýetmeýän jogaplar şaha boýunça sanalýar we bäşinjisinde diňe şol şaha ýapylýar. Galan töwekgelçilik ýazga alnan: QR-y hakyky gapjykdan öň alyp, derrew ret edýän adam ýeke şahaly hödürlemäni ýapyp biler; bu enjamlar arasyndaky akymyň belli çägidir (OpenID4VP 1.0 §14) we barlaýjy täze hödürleme açýar. #{strong[Ýagdaýy:]} işleýär (paketlerde 0.7.4-den bäri) (Surat 16).

#sekil(16, [Ýasama ret hüjümi we alnyş şahalary], "figures/wp-tk/sekil-16.svg", yarim: false)

== Brauzerden hödürlemek

Aýnur arzany telefonyndan, kompaniýanyň saýtynda beren bolsa, QR gerek bolmazdy. W3C-niň #{strong[Digital Credentials API]}-si \[36\] (sanly resminama interfeýsi) brauzere gapjygy gönüden-göni çagyrmaga mümkinçilik berýär; jogap tertibi #{raw("dc_api.jwt")} bolýar (OpenID4VP 1.0 A goşmaçasy). Bu ýoluň güýçli tarapy bar: hödürlemäniň maksady brauzeriň özüniň berýän gelip çykyş (#{emph[origin]}) bahasydyr. Ýasama saýt öz gelip çykyşyndan başgasyny talap edip bilmeýär; bu fişinge garşy berk baglanyşykdyr. Ýöne gelip çykyş ýeke özi barlaýjynyň nämäni soramaga ygtyýarlydygyny aýtmaýar. Şonuň üçin Tamga bu ýolda hem gol çekilen haýyş obýektini ulanýar: gelip çykyş fişingi, #{raw("x509_hash")} bolsa ygtyýar barlagyny çözýär (SPEC-PROTO-0002 §7.2).

Käbir brauzerler OpenID4VP-ni bu interfeýs arkaly götermeýär we mdoc-y ISO\/IEC 18013-7 \[35\] C goşmaçasy bilen soraýar. Bu ýagdaýda barlaýjy şol bir hödürleme üçin ikinji haýyşy döredýär; jogap HPKE \[25\] (RFC 9180) bilen şifrlenýär we sessiýa ýazgysy sahypanyň gelip çykyşyny öz içine alýar. Iş stolunda brauzer interfeýsi bar bolsa, deslapky ýol şoldur; QR ätiýaçlyk hökmünde onuň ýanynda galýar. #{strong[Ýagdaýy:]} barlaýjy tarapy işleýär; gapjyk tarapy meýilleşdirilen (tordaky ilkinji gapjykda Android kody ýazyldy, heniz kompilirlenmedi we enjamda synalmady; iOS ýok; FW-ARF-0001 §2.8).

== Web saýtlara giriş

Dilnoza bir saýtyň işläp düzüjisi we saýtyna "Tamga bilen gir" düwmesini goýmak isleýär (önümiň ady ADR-0030). Bu akym hem şol bir OpenID4VP haýyşydyr; tapawudy saýtyň hasap açary hökmünde #{strong[saýt başyna lakam]} almagydyr, resminama bahalarynyň hiç biri hasap açary bolmaýar (ADR-0031). Hasaba alynanda saýt diňe syýasatynda rugsat berlen meýdanlary (meselem, ady we familiýasy) we şol saýta mahsus lakam açaryny görýär. Iki dürli saýt şol bir adamy deňeşdirip bilmeýär; adam telefonyny çalşyp, şahsyýetini täzeden tassyklanda şol bir lakamlar yzyna gelýär. Gündelik giriş saýtyň öz passkey-i bilen edilýär we hiç bir resminama meýdany paýlaşylmaýar. Lakamyň nähili alynýandygy, galyndy töwekgelçilik (şahsyýet hyzmatynyň lakamy nazary taýdan hasaplap bilmegi) we ony nol bilimli subutnama bilen aýyrmak maksady 15-nji bölümde beýan edilýär. #{strong[Ýagdaýy:]} işleýär.

== Ýakyn aralyk: köprüler we maksat

Uzakdan hödürlemede QR-y barlaýjy görkezýär, gapjyk okaýar. Gapyda, kassada ýa-da işgäriň öňünde bolsa tersi gerek: QR-y gapjyk görkezýär. ARF bu meýdany ISO\/IEC 18013-5 bilen çözýär. Gapjygyň görkezýän QR-y diňe tanyşlykdyr (#{emph[device engagement]}); esasy haýyş we jogap Bluetooth ýa-da NFC arkaly, sessiýa şifrlemesi bilen geçýär we resminama mdoc görnüşinde bolýar (tapgyryň dokuzynjy makalasy \[74\]).

Tamga bu maksady kodlady, ýöne heniz enjamlarda synamady. Şol güne çenli iki köpri ýol ulanylýar (ADR-0012). Ikisiniň daýanýan ýörelgesi şeýle: #{strong[barlag üçin bir gezeklik bahany ynanmak isleýän tarap döredýär.]} Gapjyk QR görkezýän bolsa, ýa ikinji kanal açylýar (ISO 18013-5), ýa-da gysga wagt penjiresi we gaýtalanma sanawy bilen kanagatlanylýar. Ýeke QR-yň göterip bilýän takmynan 2,9 KB-y SD-JWT \[15\] VC-ni we sertifikat zynjyryny götermäge ýetmeýär; QR ýa ýüz tutma salgysyny, ýa-da kiçijik, gol çekilen, şahsy maglumatsyz žetony göterýär.

- #{strong[B, geçiş kartasy.]} Adam resminamasyny bir gezek, adaty uzakdan akym bilen, hasaba alnan barlaýja görkezýär we onuň deregine geçiş hukugyny alýar. Soňra her geçişde gapjyk 60 sekuntlyk, şahsy maglumat saklamaýan gol çekilen žetony görkezýär (§10.9).
- #{strong[C, ýüzbe-ýüz barlag.]} Barlagy adam gapjykdan özi başladýar; hödürleme adaty uzakdan ýol bilen Tamga Verify-a gidýär. Kabul edilende gapjyga gaýdyp gelýän salgy bäş minut güýjünde bolan görkeziş açaryny göterýär; gapjyk ony QR hökmünde görkezýär, işgär okadanda netijäni görýär (SPEC-PROTO-0002 §5.4). Adam meýdanlary hödürlemeden öň tassyklapdyr.
- #{strong[Maksat, ISO\/IEC 18013-5.]} Bluetooth arkaly mdoc. Okaýjy hasaba alyş sertifikatyny haýyşyň içinde CBOR \[29\] görnüşinde iberýär we haýyşa öz sertifikaty bilen gol çekýär; gapjyk uzakdan akymdaky barlaglary bu ýerde hem edýär we okaýjy sertifikatynyň sanawa baglanandygyny aýratyn barlaýar (SPEC-PROTO-0002 §7.5). Bu tapgyrda NFC ýok.

Köprüler standarty göçürmeýär: C standart OpenID4VP-dir, B bolsa standartdan daşarydygy aç-açan ýazylan, wersiýaly žetondyr. "Görkez" ekrany üç ýolda hem birmeňzeş; Bluetooth gelende diňe QR-yň aňyrsyndaky daşaýyş üýtgeýär (Surat 17) (Tablisa 17).

#tablo([#{strong[Tablisa 17.]} Hödürleme kanallary we olaryň häzirki ýagdaýlary.], (20fr, 23fr, 29fr, 26fr), ([Kanal], [QR-y kim görkezýär​​​​​​​​​], [Mehanizm], [Ýagdaýy],), (
  ([Şol bir enjam (salgy)], [ýok], [OpenID4VP, #{raw("direct_post.jwt")}], [Işleýär],),
  ([Başga enjam (QR)], [barlaýjy], [OpenID4VP, #{raw("direct_post.jwt")}, alnyş şahalary], [Işleýär],),
  ([Brauzer (Digital Credentials API, 18013-7 C goşmaçasy)], [ýok], [OpenID4VP #{raw("dc_api.jwt")}; mdoc üçin C goşmaçasy], [Barlaýjy işleýär; gapjyk meýilleşdirilen],),
  ([Geçiş kartasy (B)], [gapjyk], [60 sek gol çekilen žeton + terminal açary], [Işleýär (sandbox; hakyky torda häzir gapy syýasaty ýok)],),
  ([Ýüzbe-ýüz barlag (C)], [gapjyk], [Adaty hödürleme + 5 min görkeziş açary], [Işleýär (Tamga Verify)],),
  ([Bluetooth (ISO\/IEC 18013-5)], [gapjyk], [Tanyşlyk QR-y + BLE sessiýasy, mdoc], [Meýilleşdirilen (kodlandy, enjam synagyna garaşýar)],),
  ([NFC], [—], [—], [Bu tapgyrda ýok],),
))

#sekil(17, [Ýakyn aralykda üç ýol: geçiş kartasy, ýüzbe-ýüz barlag we ISO\/IEC 18013-5 maksady], "figures/wp-tk/sekil-17.svg", yarim: false)

== Gapy we bilet

Nurlan konserte barýar. Onuň bileti bilet satyjynyň beren resminamasy we şahsy maglumat götermeýär: çäre, ýer, biletiň synpy, oturgyç we satyjynyň bilet belgisiniň heşi bar, ady ýok (FW-RB-0004). Bilet enjam açaryna baglanan; Nurlan ony dostunyň telefonyna göçürip bilmeýär.

Nurlan bileti konsertden öň bir gezek gapynyň barlaýjysyna görkezýär we geçiş hukugyny alýar. Gapyda gapjyk žetona gol çekýär we ony QR hökmünde görkezýär. Žetonyň içinde diňe aç-açan däl geçiş belgisi, maksat barlaýjy, wagt meýdanlary we gaýtalanma belgisi bar; QR 400 baýtdan geçmeýär. Ekranda janly sagat we 60 sekuntlyk yzyna sanaýyş bar; ekranyň suraty möhlet gutaranda peýdasyz bolýar.

#adimlar((
  ("Nurlan → Barlaýjy", [#{strong[Hasaba durmak.]} Bileti adaty uzakdan akym bilen bir gezek görkezýär; barlaýjy diňe kabul netijesinden geçiş hukugyny berýär.], $"pass_grant" <- "ACCEPTED"$),
  ("Gapjyk", [#{strong[Žeton.]} Gapyda nusga açary bilen gysga ömürli žetona gol çekýär; QR-a diňe žeton girýär.], $"exp" - "iat" <= 60 "sek"$),
  ("Gapy → Tamga Verify", [#{strong[Barlag haýyşy.]} Žetony terminal toparyna baglanan terminal açary bilen iberýär.], $"Authorization: Bearer" "tk_"…$),
  ("Tamga Verify", [#{strong[Barlag.]} Açary, toparyň sanawda işjeňdigini, goly, möhleti, gaýtalanma belgisini we biletiň ulanylmandygyny barlaýar.], $"jti" in.not "gaýtalanma sanawy"$),
  ("Tamga Verify → Gapy", [#{strong[Geçiş.]} Kabul edilende bileti sarp edýär; şol bir biletiň ikinji geçişi ret edilýär.], $"ulanyldy" = 1$),
))

Şol bir žetonyň iki gezek okadylmagyna garşy terminal toparynyň gapylary žeton belgilerini (#{raw("jti")}) umumy sanawda saklaýar. Şol bir biletiň iki gezek ulanylmagyna garşy bilet ýatyrylyş sanawyndaky bir bit bilen "ulanyldy" edilýär; sanaw kesgitli aralyk bilen çap edilýändigi üçin (12-nji bölüm) aralygyň içindäki ikinji geçişi gapylaryň umumy "ulanyldy" sanawy kesýär. Onlaýn däl gapy diňe möhleti barlaýar we 60 sekundyň içinde göçürilen QR-yň başga gapyda geçmek töwekgelçiligini kabul edýär (ADR-0012 K3).

2026-10-26-daky howpsuzlyk barlagy gapylaryň haýyş iberýän nokadynyň şahsyýet talap etmeýändigini tapdy: QR-y gören adam žetony özi iberip, bileti sarp edip, hakyky gapyda Nurlany saklap bilerdi. Karar her terminal toparynyň operatordan alýan 192 bitlik #{strong[terminal açary bilen]} özüni tanatmagydyr; açarsyz haýyş žetona asla degmeýär, serwer diňe açaryň heşini saklaýar (ADR-0065). Özara TLS we gapy sertifikaty maksat hökmünde galdy; giriş sertifikatynyň gizlin açaryny her gapy enjamyna paýlamak ret edildi. 2026-10-29-dan bäri gapy toparlary gol çekilen sanawda, barlaýjy ýazgysynyň aşagynda, gapylary işledýän gurama we kabul edilen syýasatlar bilen durýar; gurama diňe öz gapylarynyň açarlaryny dolandyrýar, sanawdan çykarylan toparyň gapylary derrew togtaýar (ADR-0069).

Gurnaýjy hem beriji, hem barlaýjy tarap bolandygy üçin biletde baglanyşyksyzlyk manysyz we bu kabul edildi. Geçiş kartasy her hödürlemede biometriýa soramaýar; bu hasaba alnanda berlen möhletli (iň köp takmynan 6 aý) we çägi belli razylyga daýanýar, her hödürleme gapjygyň taryhyna ýazylýar we razylyk islendik pursatda yzyna alynýar (WL13, WL14). #{strong[Ýagdaýy:]} sandbox-da işleýär; hakyky torda häzir kesgitlenen gapy syýasaty ýok; sertifikatly we onlaýn däl gapy şahsyýeti üçin meýdan we okaýjy taýýar, ulanylmaýar (meýilleşdirilen).

= Barlag Hatary: Bäş Gatlak, Üç Netije

Timuryň ekranynda "kabul" ýazgysy çykmazdan öň, onuň serwerinde otuzdan gowrak kiçijik barlag yzygiderlikde işledi. Resminamany barlamak "gol dogrumy" diýen soragdan ybarat däl. Gol dogry bolup biler, ýöne resminama gol çeken gurama şol görnüşi bermäge ygtyýarly bolmazlygy mümkin; ygtyýarly bolup biler, ýöne resminama ýatyrylan bolmagy mümkin; hemme zat ýerinde bolup biler, ýöne barlaýjy soranyndan köpüsini alan bolmagy mümkin.

== Näme üçin hemişelik hatar

Tamga barlagy ýeke-täk normatiw tertibe baglaýar we her ädime hemişelik kod berýär (SPEC-API-0001 §1). Munuň üç sebäbi bar. Birinjisi yzygiderlilik: şol bir resminama haýsy barlaýjyda, haýsy paket bilen barlansa-da, şol bir netijäni almaly. Ikinjisi düşündirip bolmaklyk: "barlag şowsuz" diýmegiň ýerine "C2-de düşdi, gurama bu görnüşi bermäge ygtyýarly däl" diýip bolýar. Üçünjisi gözegçilik: netijeler barlag ýazgylarynda ýyllar boýy saklanýar. Şonuň üçin ädim kodunyň manysy hiç haçan üýtgemeýär; täze ädim täze kod alýar, aýrylan kod gaýtadan ulanylmaýar (AP1). C2-niň manysy 2029-njy ýylda üýtgän bolsa, 2027-nji ýylyň ýazgylary nädogry okalardy.

Ädimler yzygiderlikde işleýär we ilkinji şowsuzlykda togtaýar; diňe barlag ýazgysy (E4) her ýagdaýda ýazylýar. HTTP ýagdaý kody netijäni götermeýär: ret edilen resminama şowly API jaňydyr we 200 gaýtarýar, 4xx diňe haýyş säwligidir (AP5). Bular garyşdyrylsa, müşderiler tor säwligini güýjünde däl resminamadan tapawutlandyryp bilmeýär, gözegçilik ulgamlary hem ret edilen resminamalary näsazlyk hasaplaýar.

== Gatlaklar

Tablisa 18 gatlaklary we olaryň her biriniň saýlanan ädimlerini berýär.

#tablo([#{strong[Tablisa 18.]} Barlag hatarynyň gatlaklary we saýlanan ädim kodlary (doly sanaw SPEC-API-0001 §1).], (10fr, 35fr, 48fr), ([Gatlak], [Berýän soragy], [Saýlanan ädimler],), (
  ([T0 Deslapky şert], [Elimdäki ynam sanawy täzemi?], [Sanaw köne ýa-da elýeterli däl bolsa, syýasatyň täzelik çäkleri ýetmezçilikli bolsa: barlap bolmady],),
  ([A Format], [Resminama bozulmadykmy, gol çekilenmi, şu haýyşa degişlimi?], [A2 sözbaşy (#{raw("ES256")}, #{raw("dc+sd-jwt")}, #{raw("x5c")}) · A3 zynjyr köke ýetýär · #{strong[A3b]} guramanyň belgisi sertifikatdan · A3d enjam baglanyşygy (#{raw("cnf")}) bar · A5 her açyşyň heşi resminamada · A6 KB-JWT (#{raw("aud")}, #{raw("nonce")}, #{raw("sd_hash")}) · A7 möhlet],),
  ([Z1 Nol bilim ýoly], [Subutnama dogrumy?], [Zynjyr sanawda we faýlyň heşi gabat gelýär; diňe soralan elementler açylan (15-nji bölüm)],),
  ([B Görnüş], [Resminama görnüşi tanalýarmy?], [B2 görnüş hasaba alnan we yzyna alynmadyk · B4 görnüş kesgitlemesiniň heşi #{raw("vct#integrity")} bilen birmeňzeş · B6 JSON Schema laýyklygy],),
  ([C Ynam], [Gurama sanawdamy, bu görnüş üçin ygtyýarlymy?], [C1 gurama resminama berlen pursatynda kabul edilip bilinýärmidi · #{strong[C2]} gurama bu görnüş üçin ygtyýarlymydy (geçip bolmaýar) · C3 ykrar · C4 kategoriýa görkezijisi ýazgy bilen laýyk],),
  ([D Ýagdaý], [Resminama ýatyrylanmy ýa-da togtadylanmy?], [D2 ýatyrylyş sanawy öňünden alnan keşden · D3 sanawyň gol çekijisi guramanyň hasaba alnan ýatyrylyş açary · D4 täzelik · D5 labyr žurnaly bilen gabat gelmek, wersiýa yza gitmedik · D6 bitiň bahasy],),
  ([E Syýasat], [Barlaýjynyň soranlary kanagatlandyrylýarmy?], [E1 gurama synpynyň çägi · E2 soralan meýdanlar açylan · E3 hasaba alnan çäkden geçilmedik · E4 barlag ýazgysy ýazyldy],),
))

Iki ädim tablisanyň içinde ýitmeli däl. #{strong[A3b]} guramanyň belgisini resminamanyň #{raw("iss")} meýdanyndan däl-de, gol çeken ýaprak sertifikatyň barmak yzyndan alýar. Munuň näme üçin möhümdigi bir hüjüm bilen görünýär: barlaýjy belgini #{raw("iss")}-den okan bolsa, şol bir köküň aşagynda dogry sertifikaty bolan islendik gurama #{raw("iss")} meýdanyna başga uniwersitetiň salgysyny ýazyp, onuň adyndan resminama döredip bilerdi. Gol öz sertifikaty bilen dogry, zynjyr dogry, #{raw("iss")} bolsa ýasama bolardy. Şonuň üçin #{raw("iss")} diňe yzygiderlilik barlagynda ulanylýar (AP12). Belginiň nähili alynýandygy 6-njy bölümde.

#{strong[C2]}-den bolsa hiç bir konfigurasiýa bilen geçip bolmaýar (AP8). Barlaýjy syýasaty islän derejesinde ýumşadyp biler, ýöne "bu gurama bu resminama görnüşini bermäge ygtyýarlymydy" soragyny ýapyp bilmeýär. Ýapyp bilýän bolsa, sanawdaky her gurama islendik resminamany dogry ýaly görkezip bilerdi.

Paketler bu tertibi ýeke funksiýada ýerine ýetirýär we howpsuzlyk girişleriniň ýatdan çykarylmagyna ýol bermeýär. Ynam labyry, barlaýjy ýazgysy ýa-da ýatyrylyş sanawynyň gol çekijisi berilmese, funksiýa ret edýär; barlagy bilkastlaýyn geçmek isleýän muny aç-açan #{raw("\"none\"")} bahasy bilen ýazmaga borçly we geçilen ädim netijede görünýär (ADR-0056 MR1). Ýatdan çykarmak indi ret diýmekdir; bilkastlaýyn geçmek kodda ýazylan, barlagda görünýän karardyr.

== Wagta bagly ygtyýar

C1 we C2 resminamanyň berlen pursatyny soraýar: gurama resminamanyň #{raw("iat")} pursatynda sanawda işjeň we bu görnüş üçin ygtyýarlymydy (AP11)? Munuň ýerine "gurama häzir resminama berip bilýärmi" diýip soralan bolsa, iki sessiz säwlik çykardy. Ýapylan guramanyň öň beren ähli diplomlary bir gijäniň içinde güýjünde däl ýaly görünerdi. Görnüş täze wersiýa geçip, köne wersiýa yzyna alnanda köne wersiýa bilen berlen her resminama ret edilerdi. Meýilleşdirilen sertifikat täzelenmesi hem resminamalary düşürerdi. Barlag geçmişe gönükdirilen amaldyr: resminama geçmişde berildi we kesgitleýji zat şol günki ýagdaýdyr (FW-ARF-0001 §4.4).

Bu düzgüniň çägi bar we ol çäk ýatyrylyşdyr. Gurama resminama berlen güni ygtyýarly bolsa, resminama C gatlagyndan geçýär; ýöne resminama soňra ýatyrylan bolsa, D gatlagynda düşýär. Wagt oky ynam üçin yza, ýagdaý üçin häzirki güne seredýär.

== Üç bahaly netije

Hataryň netijesi üç bahanyň biridir: #{strong[kabul]} (#{raw("ACCEPTED")}), #{strong[ret]} (#{raw("REJECTED")}) we #{strong[barlap bolmady]} (#{raw("INDETERMINATE")}). Üçünjisi höküm däl; infrastruktura ýetip bolmandygyny ýa-da maglumatyň könedigini aýdýar. "Bu diplom ýasama" bilen "häzir barlap bilemok" arasyndaky tapawut adamyň işe alynmagy ýa-da alynmazlygydyr. Şonuň üçin barlap bolmady netijesi ret bilen bir sebede salynmaýar we ulanyjy interfeýsinde aýratyn görkezilýär (AP2). Barlap bolmady netijesiniň sebäbi hökmany meýdanda gelýär: görnüş kesgitlemesine ýetip bolmady, ýatyrylyş sanawyna ýetip bolmady, ýatyrylyş sanawy köne, ýatyrylyş sanawyndaky bahanyň kesgitlenen manysy ýok, ynam sanawy köne ýaly.

#kutu("teknik", [Netije nähili birleşýär])[
Hataryň ädimlerini kesgitli tertipde $s_1, s_2, dots, s_n$ diýip ýazalyň (T0, A1 … E3). Her ädimiň çykyşy "geçdi", "ret" ýa-da "barlap bolmady". Hatar ilkinji şowsuzlykda togtaýandygy üçin netije geçmedik ilkinji ädimiň çykyşydyr; olaryň hiç biri ýok bolsa, kabuldyr:

#formul[$ k^* &= min (k : s_k != "geçdi") \
"netije" &= s_(k^*) quad "(şeýle ädim ýok bolsa ACCEPTED)" $]

Bu düzgüniň bir netijesi bar: ynam sanawy köne bolsa (T0), netije barlap bolmady bolýar we indiki ädimler asla işlemeýär; resminama ýasama bolsa-da "ret" diýilmeýär. Köne sanaw bilen berlen ret sanawa täze goşulan guramanyň dogry resminamasyny hem ret edip bilerdi. Garaşylmadyk programma säwligi hem şol bir düzgün bilen barlap bolmady berýär, ret bermeýär.

Netije obýektinde iki zat asla ýok. Açylan meýdanlaryň #{strong[bahalary]} netije obýektine girmeýär, diňe atlary girýär (AP3); bahalar aýratyn nokatdan, aýratyn ygtyýarlandyrylyp alynýar. Ýatyrylyş sanawyndaky orun (#{raw("idx")}) bolsa hiç bir jogapda we ýazgyda ýok (AP4). Netije obýekti barlag ýazgysyna ýazylýar we uzak wagtlap saklanýar; bu iki düzgün şol ýazgynyň gözegçilik guralyna öwrülmeginiň öňüni alýar.
]

#kod("json", "{
  \"verification_id\": \"vrf_01J8XKQ2M4\",
  \"outcome\": \"ACCEPTED\",
  \"failed_step\": null,
  \"indeterminate_reason\": null,
  \"spec_version\": \"SPEC-API-0001@1.0.0\",
  \"sdk_version\": \"@tamga-network/verifier@0.8.2\",
  \"checks_performed\": [\"T0\", \"A1\", \"A2\", \"A3\", \"A3b\", \"…\", \"D6\", \"E1\", \"E2\", \"E3\", \"E4\"],
  \"checks_skipped\": [],
  \"issuer\": { \"issuer_id\": \"0x7f3a…\", \"state_code\": \"TR\", \"category\": \"EDUCATION\", \"assurance\": \"I2\" },
  \"schema\": { \"vct\": \"urn:tamga:edu:DiplomaCredential:1\", \"status\": \"ACTIVE\" },
  \"disclosed_claims\": [\"is_graduate\", \"qualification_title\", \"eqf_level\", \"isced_f_code\",
                       \"awarding_body_name\", \"awarding_date\", \"family_name\", \"given_name\"],
  \"status\": { \"value\": \"VALID\", \"token_age_sec\": 1830 },
  \"evaluated_at\": \"2026-11-04T09:12:44Z\"
}", baslik: "Mysal: gysgaldylan netije obýekti; baha ýok, idx ýok (bahalar mysaldyr)")

#{raw("checks_skipped")} boş bolmasa, barlaýjy muny görünýän etmeli; barlagyň geçilendigini sessiz kabul etmek onuň geçilmeginiň maksadyny puja çykarýar (Surat 18).

#sekil(18, [Barlag hatary: alty gapy, üç çykyş], "figures/wp-tk/sekil-18.svg", yarim: false)

== Ýerleşdirilen barlaýjy

Her barlaýjy bu hatary öz serwerinde işledip biler; paketler açyk we bahalar hiç bir araçynyň üstünden geçmeýär. Öz infrastrukturasyny gurmak islemeýänler üçin toruň ýerleşdirýän barlaýjysy #{strong[Tamga Verify]}-dyr (ADR-0030). Araçy täze töwekgelçilik getirýär we bu töwekgelçilik ADR-0017 bilen daraldyldy. Ilkinji dizaýnda baha nokatlary hödürleme belgisini bilýän her kime jogap berýärdi; belgi brauzer taryhynda ýa-da ekrany paýlaşmakda görnüp bilerdi. Häzir baha gaýtarýan her nokat diňe hödürlemäni açan barlaýja açyk. Barlaýjy şahsyýetini sanawda hasaba alnan giriş sertifikatynyň açary bilen gol çeken, iň köp 60 sekuntlyk, gaýtalap bolmaýan beýannama bilen subut edýär; täze syr gerek däl. Bahalar bir gezek okalýar we iň giç bäş minutdan soň ýatdan pozulýar; brauzere gidýän hiç bir žeton baha okamak ygtyýaryny götermeýär (ADR-0017 HV1–HV5). Saýt başyna statik API açary, aýratyn OAuth serweri we özara TLS şol bir kepilligi has köp syr ýa-da işletmek ýüki bilen berýändigi üçin saýlanmady. Tamga Verify barlaýjynyň adyndan haýyş açanda gapjyk #{strong[esasy barlaýjynyň]} hasaba alnan adyny görkezýär, araçyny aýratyn belleýär we çägi esasy barlaýjynyň ýazgysyna görä barlaýar; araçylyk gatnaşygy iki ýazgyda hem ýazylmadyk bolsa, haýyş ret edilýär (PV14). #{strong[Ýagdaýy:]} işleýär.

= Ýatyrylyş we Durmuş Aýlawy

Elif Mysal uniwersitetiniň talyplar bölüminde işleýär. Bir gün irden bir uçurymyň dissertasiýasynda plagiat şübhesiniň bardygy barada hat gelýär. Derňew birnäçe hepde dowam eder. Elifiň elinde diňe iki erbet ýol bolan bolsa, ol diplomy ýa nähak ýerden hemişelik ýatyrardy, ýa-da derňew gutarýança hiç zat etmezdi. Bu bölüm resminamanyň soňra nähili yzyna alynýandygyny ýa-da togtadylýandygyny we munuň näme üçin hiç kimi yzarlamazdan edilmelidigini düşündirýär. Meseläniň esasy tapgyryň ýedinji makalasynda \[72\] beýan edildi.

== Yzarlamazdan yzyna almak

Gurama "bu resminama indi güýjünde däl" diýip bilmegi üçin barlaýjy bir ýere seretmeli. Iň aňsat ýol her barlagda guramadan soramakdyr; ýöne onda gurama uçurymlarynyň haýsy iş berijilere haçan ýüz tutandygyny öwrenýär we kagyz diplomda bolmadyk yzarlaýyş kanaly döreýär.

Tamga-nyň jogaby IETF-iň #{strong[Token Status List]} \[17\] taslamasydyr (ýatyrylyş sanawy, ýagdaý sanawy; ÝB-niň 2026\/1731 \[7\] bilen berkiden draft-20 wersiýasyna eýerilýär; SPEC-CRED-0003). Gurama her resminama uly bit hatarynda tötänleýin orun berýär. Resminama ýatyrylanda şol orundaky baha üýtgeýär. Hatar gysylýar, gol çekilýär we kesgitli aralyklarda çap edilýär. Barlaýjy hatary öňünden alýar we resminamany görende hiç kime soramazdan öz nusgasyna seredýär. Gurama resminamanyň nirede we haçan görkezilendigini öwrenip bilmeýär.

#kutu("teknik", [Resminamanyň ýagdaýyny okamak])[
Resminama #{raw("status.status_list")} içinde öz ornuny (#{raw("idx")}) we sanawyň salgysyny (#{raw("uri")}) göterýär; bu meýdan saýlap açmak arkaly gizlenip bilinmeýär. Sanaw her resminama üçin $b$ bit ulanýar (Tamga-da 1 ýa-da 2). Tertip belgisi kiçi bolan resminama baýtyň iň pes derejeli bitinde ýerleşýär. Açylan hataryň $n$-nji baýtyna $D[n]$ diýsek:

#formul[$ n &= floor((i dot b) / 8) \
k &= (i dot b) mod 8 \
"ýagdaý" &= floor(D[n] / 2^k) mod 2^b $]

Mysal bahalar bilen, iki bitli gurama sanawynda orny 48213 bolan diplom:

#formul[$ i dot b &= 48213 dot 2 = 96426 \
n &= floor(96426 / 8) = 12053, quad k = 96426 mod 8 = 2 \
"ýagdaý" &= floor(D[12053] / 4) mod 4 $]

Şol bir orun bir bitli şahsyýet hyzmatynyň sanawynda bolan bolsa, $n = floor(48213 / 8) = 6026$, $k = 48213 mod 8 = 5$ bolardy we ýeke bit okalardy. Sanawyň ululygy hem aňsat hasaplanýar. Iň az sygym bolan 100.000 orun bilen:

#formul[$ "2 bit:" quad & 100.000 dot 2 = 200.000 "bit" = 25.000 "baýt" \
"1 bit:" quad & 100.000 dot 1 = 100.000 "bit" = 12.500 "baýt" $]

Sanaw esasan noldan ybarat bolany üçin onuň gysylan ululygy adatça birnäçe ýüz baýtdyr (SPEC-CRED-0003 §3.3).
]

Surat 19 şol bir mysaly resminamadan bite çenli yzarlaýar.

#sekil(19, [Ýatyrylyş sanawy: resminamadan orna, ornundan bite], "figures/wp-tk/sekil-19.svg", yarim: false)

== Näme üçin zynjyrda däl

Bu kararyň ilkinji görnüşi bir gapma-garşylykdan döredi. 2026-09-09-daky ammar barlagynda spesifikasiýa "sanaw zynjyryň daşynda, görkeziji zynjyrda" diýýärdi; kontrakt kody bolsa bit hataryny zynjyrda saklaýardy we her ýatyrylyş bir zynjyr amalydy. ADR-0008 gapma-garşylygy zynjyrdan daşary sanawyň peýdasyna çözdi. Esasy delil gizlinlikdir. Rugsatly kitapda her amal her validator düwnüne wagt belligi bilen bilelikde görünýär. "Pylan uniwersitet pylan güni, pylan sagatda, pylan ornundaky resminamany ýatyrdy" diýen maglumat özbaşdak adamy aýtmaýar. Ýöne düzgün-nyzam kararynyň senesi, işden çykylan gün ýa-da bir bölümiň ýapylmagy bu bellik bilen birleşende adamy daraldýar (Tablisa 19).

#tablo([#{strong[Tablisa 19.]} Ýatyrylyş sanawynyň ýeri üçin seredilen wariantlar (ADR-0008).], (39fr, 13fr, 48fr), ([Wariant], [Netije], [Sebäbi],), (
  ([Bit hatary doly zynjyrda], [ret], [Ýatyrylyş pursaty ähli düwünlere syzýar; zynjyryň hemişelik ýagdaýy ulalýar; standartyň daşaýyş modelinden gyşarýar],),
  ([Kriptografik akkumulýator ýa-da nol bilim bilen ýatyrylyş], [yza süýşürildi (gözleg)], [Iň güýçli gizlinlik; ýöne kämil kitaphana we gapjyk goldawy ýok],),
  ([Gysga ömürli resminama, ýatyrylyş ýok], [bölekleýin kabul edildi], [Talyp resminamasynda (iň köp 90 gün) dogry; möhletsiz diplomda nädogry],),
  ([Gyssagly ýatyrylyş zynjyrda, adaty ýatyrylyş daşarda], [ret], [Zynjyra ýazylan ýatyrylyş takyk iň duýgur bolanydyr; syzmany jemleýär],),
  ([Gol çekilen sanaw zynjyryň daşynda, diňe heşi labyrlanýar], [#{strong[saýlandy]}], [Ýatyrylyş pursaty görünmeýär; standartyň öz modeli; barlaýjy işjeň keşleýär],),
))

Çykdajy hem şol bir ugry görkezýärdi. 100.000 orunly bir bitli sanaw 12,5 KB; takmynan 200 ýokary okuw mekdebi üçin bu zynjyryň hemişelik ýagdaýynda 2,5 MB bolýar we her ýatyrylyş bir amaldyr (ADR-0008). Häzir labyr sanaw çap edijiniň labyr žurnalydyr; umumy kitap gelse, oňa diňe çap edilenleriň heşi ýazylar (Bölüm 19).

== Bit sany we togtatma

Standart her resminama üçin 1, 2, 4 ýa-da 8 bite rugsat berýär. Tamga iki bahany ulanýar we haýsysynyň ulanyljakdygyny görnüşiň manysy kesgitleýär (ADR-0048) (Tablisa 20).

#tablo([#{strong[Tablisa 20.]} Ýagdaý bahalary we olaryň haýsy görnüşde ulanylýandygy.], (11fr, 11fr, 25fr, 26fr), ([Baha​​​​​], [Standart ady​​], [Tamga-daky manysy], [Nirede],), (
  ([#{raw("0x00")}], [VALID], [Güýjünde], [Ähli sanawlar],),
  ([#{raw("0x01")}], [INVALID], [Hemişelik ýatyrylyş; yzyna gaýdyp bolmaýar], [Ähli sanawlar],),
  ([#{raw("0x02")}], [SUSPENDED], [Wagtlaýyn togtatma; yzyna alyp bolýar], [Diňe 2 bitli gurama sanawlarynda we diňe shemasy togtatmaga rugsat berýän görnüşde (häzir diplom)],),
  ([#{raw("0x03")}], [bellenen], [Ulanylmaýar; okalsa ret], [—],),
))

Şahsyýet hyzmatynyň görnüşleri (şahsyýet resminamasy, sürüjilik şahadatnamasynyň maglumaty, e-poçta we telefon resminamalary) 1 bitli sanawlar bilen çap edilýär we olarda togtatma ýok. Bu ÝB-niň şahsy şahsyýet maglumatlary (PID) baradaky düzgünine laýyklaşmakdyr: 2024\/2979 \[5\] belgili düzgünnamanyň II goşundysy, 2026\/1731 bilen üýtgedilen görnüşinde, PID-de ýagdaýy diňe "ýatyrylan \/ ýatyrylmadyk" diýip kesgitleýär. Tamga-nyň şahsyýet resminamasy PID däl, ýöne ÝB PID-iniň atlaryny ulanýar we döwletiň PID-i gelende onuň ýerini almaga iň ýakyn görnüşdir. Şahsyýet barada "derňew dowamynda wagtlaýyn güýjünde däl" diýiljek ýagdaý hem bolmaýar; şübhe ýüze çyksa resminama ýatyrylýar we adam täzeden barlanýar.

Gurama sanawlary 2 bitli; togtatma bolsa diňe shemasynda #{raw("suspension_allowed: true")} ýazylan görnüşlerde ulanylýar. Elifiň meselesi şu ýerde çözülýär: ol diplomy derňew dowamynda togtadýar, derňew gutaranda ýa togtatmany aýyrýar ýa-da ony ýatyrylyşa öwürýär. Gurama konsoly "Togtat" düwmesini diňe şu görnüşlerde görkezýär. Togtatma rugsadynyň gurama başyna däl-de, görnüş başyna berilmegi bilkastdandyr; togtatma görnüşiň manysyna bagly we shema hemmeler üçin şol bir düzgüni aýdýar.

Resminama mdoc \[34\] görnüşinde hem berlen bolsa, şol bir logiki sanaw iki görnüşde, aýry we opak salgylarda çap edilýär: SD-JWT \[15\] nusgasy JWT görnüşine, mdoc nusgasy CWT görnüşine salgylanýar. Iki görnüş hem şol bir bitleri göterýär we şol bir aýlawda şol bir açar bilen gol çekilýär; şeýlelikde mdoc okaýjysy JWT seljerijisini götermäge mejbur bolmaýar.

== Gizlinlik düzgünleri

Ýatyrylyş sanawynyň gizlinlik peýdasy birnäçe ýerde aňsatlyk bilen bozulyp bilner. Spesifikasiýa bu ýerleri birin-birin ýapýar (SPEC-CRED-0003 §5–§6, §9).

- #{strong[Orun tötänleýin.]} Orun her hödürlemede görünýär; yzygiderli paýlanylan bolsa, uçurym bolmagyň tertibi we iki uçurymyň arasyndaky wagt tapawudy orundan okalardy, saýlap açmak bilen gizlenen sene syzardy.
- #{strong[Sygym uly.]} Her sanaw azyndan 100.000 orunly we iň köp 80% doldurylýar.
- #{strong[Salgy opak, bölmek diňe görnüş boýunça.]} #{raw("…/edu-2026-a")} ýaly salgy ýa-da "2026-njy ýylyň uçurymlary A sanawynda" ýaly tertip gizlenen uçurym ýylyny özi aýdardy; salgy #{raw("…/7f3a9c21")} ýaly manysyz setirdir.
- #{strong[Barlag başyna almak gadagan.]} Barlaýjy sanawlary meýilleşdirilen toplumlaýyn öňünden alyş bilen alýar; paketler muny deslapky ýagdaý edýär.
- #{strong[Sanawyň gol çekijisi berkidilýär.]} Ýatyrylyş sanawy resminama açaryndan aýry açar bilen gol çekilýär; barlaýjy goly barlamazdan öň gol çekijini guramanyň sanawdaky hasaba alnan ýatyrylyş açaryna berkidýär (ADR-0056 K6). Bu açar ele salnan ýagdaýynda-da ýasama diplom döredip bolmaýar.

#kutu("teknik", [Tötänleýin orun nämäni gizleýär, nämäni gizlemeýär])[
Yzygiderli paýlamada iki resminamanyň orun tertibi hemişe olaryň berliş tertibi bilen gabat gelýär. Tötänleýin paýlamada bu baglanyşyk üzülýär. A resminamasy B-den öň berlen bolsun; orunlar sygymyň içinden garaşsyz we deňölçegli saýlananda:

#formul[$ "yzygiderli:" quad & P("idx"_A < "idx"_B) = 1 \
"tötänleýin:" quad & P("idx"_A < "idx"_B) = 1 / 2 $]

Ýagny orunlaryň tertibine seredýän adam teňňe zyňmakdan gowy çaklama edip bilmeýär. Ulanylmadyk ornuň biti bilen güýjündäki resminamanyň biti birmeňzeş (#{raw("0x00")}); daşyndan seredýän adam sanawda näçe resminamanyň bardygyny hem görüp bilmeýär. Şonuň üçin boş orunlary "doly" görkezmäge synanyşýan başlangyç goh düzgüni görnüp bilinýän gorag bermeýändigi sebäpli 2026-10-09-da aýryldy.

Tötänleýin ornuň gizläp bilmeýän iki zady bar. Birinjisi guramanyň özi: 300 uçurymy bolan ýokary okuw mekdebi 100.000 orunly sanawda 300 doly orun diýmekdir; sanaw uly, ýöne "süri" gurama bilen çäklenýär we #{raw("iss")} meýdany guramany eýýäm aýdýar. Bu spesifikasiýada kabul edilen çäkdir. Ikinjisi şol bir resminamanyň gaýtadan görkezilmegi: orun we salgy bir nusgada üýtgemeýär, iki barlaýjy şol bir nusgany görüp ylalaşsa, olary gabat getirip biler. Çözgüt her barlaýja başga orunly aýry nusga görkezmekdir (§13.4, Bölüm 9).
]

== Täzelik we güýje giriş wagty

Sanaw üýtgeşme bolsa-da, bolmasa-da kesgitli aralyk bilen çap edilýär; häzir bu aralyk #{strong[2 minut]}. Diňe ýatyrylyş bolanda çap edilen bolsa, täze wersiýanyň peýda bolmagy "şu minutda bir ýatyrylyş boldy" diýmek bolardy. Aralykdan daşary "gyssagly" çap hem edilmeýär; gyssagly ýagdaýda dogry gural guramany togtatmak ýa-da onuň sertifikatyny ýatyrmakdyr (SPEC-CRED-0003 §5.3). ADR-0008 aralygy bir sagat edip teklip edipdi; spesifikasiýa ýatyrylyşlaryň birnäçe minutda görünmegi üçin gysga aralygy we kesilmä çydamak üçin uzyn güýjünde bolmak möhletini bilelikde saýlady (taslama dolandyryşynyň tassyklamagy bilen, 2026-10-09).

Sanaw belliginde iki wagt meýdany bar. #{raw("ttl")} barlaýjynyň täzesini almazdan öň garaşyp biljek wagtydyr we çap aralygyna deňdir (120 sekunt). #{raw("exp")} belligiň takyk soňky pursatydyr: çapdan #{strong[6 sagat]} soň. Ýagdaý serweri kesilse, barlaýjy elindäki soňky sanaw bilen 6 sagada çenli barlamagy dowam etdirýär; netije derrew "barlap bolmady" ýagdaýyna düşmeýär.

#kutu("teknik", [Ýatyrylyş haçan güýje girýär])[
Ýatyrylyş ilki indiki çapa, soňra barlaýjynyň indiki öňünden alşyna garaşýar. Çap aralygy $Delta_"neşir"$, öňünden alyş aralygy $Delta_"öňünden alyş"$ bolsa, iň erbet gijikme:

#formul[$ t_"täsirli" lt.eq Delta_"neşir" + Delta_"öňünden alyş" $]

Çap aralygy 120 sekunt bolsa we barlaýjy maslahat berlişi ýaly #{raw("ttl")} aralygynda alýan bolsa:

#formul[$ t_"täsirli" lt.eq 120 + 120 = 240 "sek" = 4 "minut" $]

Barlaýjy sanawy bäş minutda bir gezek alýan bolsa, çäk $120 + 300 = 420$ sekunt, ýagny ýedi minut bolýar. Kesilme tarapynda penjire $"exp" - "iat" = 6 "sa" = 21.600 "sn"$; bu salgylanma syýasatlaryndaky belligiň iň uly ýaşy bilen (#{raw("max_status_token_age_sec = 21600")}) deňdir.

Barlaýjy öz töwekgelçiligine görä has berk hereket edip biler. Bellik 09:00-da çap edilen we barlag 10:30-da edilýän bolsun:

#formul[$ "ýaş" = "1,5 sag" = 5.400 "sek" $]

Pes töwekgelçilikli barlaýjy (çägi 21.600 sek) bu sanaw bilen barlaýar. Resmi amal ýaly ýokary töwekgelçilikli barlaýjy (çägi 600 sek) bolsa şol ýagdaýda "barlap bolmady, sanaw köne" diýýär we täze sanawa garaşýar (SPEC-CRED-0003 §8.2).
]

Uzyn #{raw("exp")}-iň bahasy bar we ol baha hem hasaplanyldy. Tor ýoluny ele salan adam köne, ýöne gol çekilen belligi hödürläp, ýatyrylyşy iň köp 6 sagat gizläp biler. Labyr barlagy bu penjiräni daraldýar: her çapyň heşi labyr žurnalyna ýazylýar we barlaýjy elindäki belligiň wersiýasynyň yza gitmändigini barlaýar (D5). Öňünden alyş labyrdan öň edilen bolsa netije "barlap bolmady", soň edilen bolsa ret bolýar; şeýlelikde guramanyň ýatyran resminamasyny öz serwerinde ümsümlik bilen gaýtadan "güýjünde" görkezmegi hem tutulýar (Surat 20).

#sekil(20, [Çap aýlawy: üýtgeşme bolsa-da, bolmasa-da kesgitli aralyk], "figures/wp-tk/sekil-20.svg", yarim: false)

== Ýatyrylyş syýasaty

Kimiň haýsy şertde ýatyryp biljekdigi bir syýasat resminamasynda jemlenýär (FW-POL-0001; ÝB ARF \[11\] VCR\_05). Syýasat täze düzgün goýmaýar, görnüşleriň rulebook-laryny we kararlary jemleýär. Umumy şertler ýatyrylyp bilinýän her görnüşde güýjünde: adam razylygyny yzyna alsa, adam "resminamaňyz bir gapjyga goşuldy" habarnamasyna garşy çyksa, resminama ýalňyş berlen bolsa, şol bir adama şol bir görnüşiň täze nusga toplumy berilse (köne toplum ýatyrylýar) we guramanyň gol açary syzan bolsa. Görnüşe mahsus şertler hem ýazylan: diplomda galplyk ýa-da kazyýet karary, biletde yzyna gaýtarmak, çäräniň ýatyrylmagy we gapydan geçiş, şahsyýet resminamasynda adamyň pozmak haýyşy ýa-da resminamanyň ýitendigi barada habar.

Syýasat ýatyrylyşa sebäp #{strong[bolmaýan]} zatlary hem sanaýar we bu sanaw azyndan birinjisi ýaly möhümdir. Guramanyň togtadylmagy ýa-da sanawdan çykarylmagy onuň köne resminamalaryny güýjünden düşürmeýär; diňe täze resminama bermegi togtadýar. Guramanyň sertifikatyny täzelemegi we resminama görnüşiniň täze wersiýa geçmegi hem resminamalary ýatyrmaýar (§11.3). Resminamany diňe resminama beriji ýatyrýar; toruň operatory resminama ýatyrmaýar, zerur bolsa guramany togtadýar.

Gurama isläp, öz goşmaça şertlerini öz sahypasynda çap edip biler; baglanyşyk onuň ynam sanawyndaky ýazgysynda #{raw("revocation_policy_uri")} meýdanynda durýar we gapjyk ony gurama sahypasynda görkezýär. Goşmaça şertler umumy syýasaty daraldyp bilmeýär, diňe goşup bilýär (ADR-0047 K2).

Ýatyrylyşyň sebäbi sanawda-da, resminamada-da ýok; sanaw şahsy maglumat götermeýär we hiç bir ýazgy orun maglumatyny saklamaýar. Guramanyň API-si ýatyrylyş haýyşyna "nobata goýuldy, şu pursatdan soň güýje girýär" diýip jogap berýär; derrew ýatyrylyş ýok we API muny aç-açan aýdýar, şeýlelikde jaň edijiniň garaşýan zady başdan dogry gurulýar (SPEC-API-0001 §5.3).

== Gapjyk birligini ýatyrmak

Telefon ýitende näme ýatyrylmaly? ÝB-niň ARF-i gapjyk birligi ýatyrylanda resminama berijileriň öz resminamalaryny hem ýatyrmagyny PID üpjün edijisi üçin hökmany, beýlekiler üçin bolsa islege bagly edýär. Tamga-nyň düzgüni şeýle (ADR-0047 K1): şahsyýet hyzmaty birligi iň giç 24 sagadyň dowamynda barlaýar we şol birlikdäki öz resminamalaryny ýatyrýar; gurama resminamalary bolsa ýatyrylmaýar.

Gurama resminamalary muňa garamazdan ulanyp bolmaýan ýagdaýa düşýär: her nusga eksport edip bolmaýan enjam açaryna bagly we her hödürleme ulanyjynyň tassyklamasyny talap edýär; ýatyrylan birlige hiç bir gurama täze resminama ýa-da täzeleme bermeýär; ýatyrylyşy gören gapjyk resminamalary pozýar; gysga ömürli görnüşler möhleti dolanda gutarýar. Zynjyrlaýyn ýatyrylyş bolsa her resminama ýazgysyna gapjyk belgisini ýazmagy talap ederdi. Galyndy töwekgelçilik ýazga alnan: telefony we ony açmak maglumatyny bilelikde ele salan adam telefon tora birikmeýänçä möhleti dolmadyk gurama resminamasyny görkezip biler; munuň üçin adam guramadan ýatyrylyş soraýar. Zynjyrlaýyn ýatyrylyş bu töwekgelçiligi ýapmazdy, sebäbi tora birikmeýän telefon ýatyrylyşy hem öwrenmeýär. Birligi telefonsyz ýatyrmak Bölüm 13.5-de.

= Gapjyk: Düzgünler, Açarlar we Tassyklamalar

Aýnuryň diplomynyň gymmaty onuň telefonyndaky açara bagly. Açar başga ýere göçürilip bilinýän bolsa, diplom hem göçürilip bilnerdi; açar ýiten bolsa, diplom hem görkezilip bilinmezdi. Bu bölüm gapjygyň toruň gözünde nähili tanalýandygyny, açarlaryny nirede we nähili saklaýandygyny, muny resminama berijä nähili subut edýändigini we adamyň öz maglumatlary üstündäki gözegçiligini düşündirýär. Gapjyk howpsuzlygynyň umumy çarçuwasy tapgyryň onunjy makalasynda \[75\].

== Toruň gapjyga garaýşy

Tamga Network hiç bir gapjygyň programmasyny, gapjyk üpjün edijisini ýa-da saýtyny işletmeýär (ADR-0042). Toruň gapjyklar bilen gatnaşygy üç zatdan ybarat: düzgünler (SPEC-WALLET-0001, Tamga ARF), açyk paketler (#{raw("@tamga-network/wallet-core")} we beýlekiler) we ynam sanawyndaky #{strong[gapjyk üpjün edijisi]} ýazgysy (#{raw("wallet_providers[]")}: salgy, tassyklama gol sertifikaty, çözgüdiň ady). ÝB-de hem her gapjygy ony hödürleýän gurama işledýär; ynam çarçuwasy üpjün edijileri diňe sanaýar. Toruň öz üpjün edijisini ýerleşdirmegine seredildi we ol ret edildi, sebäbi bu toruň bitaraplygyny bozardy we gaznaga tabşyrylanda bir gapjygyň hyzmatyny tora bagly galdyrardy.

Gapjygyň sanawa girişi dört ädimden ybarat (FW-ONB-0001 §4): gapjyk çözgüdiniň beýany (platformalar, howpsuz enjam derejesi, PIN we biometriýa, ätiýaçlyk nusga modeli), üpjün ediji şertnamasy (tassyklamalar, täzeleme we ýatyrylyş möhletleri, dikeldiş açaryny saklamazlyk), laýyklyk synaglary we sanawa giriş. Gapjyk işläp düzüjisi ilki öz üpjün edijisini sandbox sanawyna hasaba aldyrýar we gapjygyny şol ýerdäki nusga guramalar bilen synaýar. Sanawa giren ilkinji gapjyk Tamga Wallet aýratyn önümdir we bu ýoldan, beýleki her gapjyk bilen deň şertlerde girdi. Toruň interfeýsleri gapjygy umumy at bilen agzaýar; gapjygyň ady zerur bolanda sanawdaky ýazgy maglumatyndan gelýär (ADR-0042 NW4).

== Açar arhitekturasy we derejeler

Gapjyk spesifikasiýasy bir gapma-garşylygyň çözgüdi bilen başlaýar (SPEC-WALLET-0001 §1). Resminama açary howpsuz zolakdan asla çykmaly däldi; taslamanyň ilkinji belliklerinde bolsa "24 sözli tohum bilen ätiýaçlyk nusga" pikiri bardy. Tohum gapjygy ulanyp bolýan ýagdaýda yzyna getirýän bolsa, ol açarlary hem getirýär diýmekdir. Açarlary tohumdan almak özüne çekijidi, ýöne enjam baglanyşygyny çüýrederdi: tohum paýlaşylyp bilinýän bolsa, resminama başga birine geçirilip bilner we resminama berlende ýapylan "talyp resminamasyny dostunyň gapjygyna aldyrmak" boşlugy dikeldiş pursatynda gaýtadan açylýar. Platformalaryň enjamlaryň arasynda sinhronlanýan açarlary hem ret edildi; ynam Apple we Google hasabyna süýşýär, şol bir hasapdaky başga enjam açary alyp biler we ÝB bu synpy iň ýokary gapjyk derejesi hasaplamaýar.

Karar: resminama eýesiniň açarlary tohumdan alynmaýar we howpsuz zolakdan asla çykmaýar (WL1); ätiýaçlyk nusga resminamalary we olaryň sanawyny göterýär, açarlary götermeýär (WL2). Täze telefonda dikeldilen resminama okalyp bilner, ýöne görkezilip bilinmez, guramadan täzeden alynýar; tohumyň işi adama "şu dört resminamany täzeden sora" diýip bir basyşly sanaw hödürlemekdir. Tor ýa-da üpjün ediji adamyň adyndan hiç bir şertde dikeldiş açaryny saklamaýar (WL10); saklan bolsa, ähli gapjyklary açyp biljek merkez dörärdi (Tablisa 21).

#tablo([#{strong[Tablisa 21.]} Gapjyk kepillik derejeleri (SPEC-WALLET-0001 §2.2, FW-ARF-0001 §6.5).], (19fr, 30fr, 31fr, 19fr), ([Dereje​​​​​​​​​], [Açar ammary], [Tordaky orny], [Enjam tassyklamasy],), (
  ([W1], [Programma üpjünçiligi], [Goldanmaýar; resminama berilmeýär (diňe sandbox-da toruň öz synag açary)], [—],),
  ([W2], [Enjamyň howpsuz zolagy (Secure Enclave, StrongBox, iň az TEE)], [Häzirki iň pes dereje], [Islege bagly; üpjün edijiniň karary],),
  ([W3], [Sertifikatly howpsuz enjam], [Döwlet tapgyrynda], [Hökmany (ADR-0047 K5)],),
))

Her hödürleme ulanyjynyň tassyklamasyny talap edýär (WL11). Howpsuz enjam açary bolan enjamda resminama açary telefonyň gulpuna bagly we hödürlemäniň tassyklamasy operasion ulgamyň biometriýa ýa-da enjam paroly soragydyr; programmanyň sazlamalary muny öçürip bilmeýär. Adam bu soragdan ýüz öwürse, ätiýaç ýol ýok, hödürleme edilmeýär. Şeýlelikde açyk gapjygyň arka planda ümsümlik bilen hödürleme etmeginiň öňi alynýar.

#kutu("teknik", [PIN çäkleriniň hasaby])[
Programmanyň PIN-i azyndan 6 sanly; 5 ýalňyş synanyşykda 30 sekunt garaşylýar, 10-da gapjyk gulplanýar we tohum gerek bolýar (SPEC-WALLET-0001 §2.3). Telefony ele salan adamyň gulplanmazdan öň PIN-i tötänleýin çaklama bilen tapmak ähtimallygy:

#formul[$ P_"çaklama" lt.eq 10 / 10^6 = 10^(-5) = "0,001%" $]

Bu çägiň hem bahasy bar: şol bir adam 10 gezek ýalňyş girizip gapjygy gulplap biler. Spesifikasiýa muny kabul edilen töwekgelçilik hökmünde ýazýar; onuň alternatiwasy PIN-i gödek güýç hüjümine açyk goýmakdyr.
]

== WIA we KA

Gurama resminama bermezden öň garşysyndaky programmanyň sanawda tanalýan gapjykdygyny we açarlaryň howpsuz enjamda durýandygyny bilmek isleýär. Ilkinji dizaýnda gapjyk 30 gün güýjünde bolan ýeke-täk tassyklamany her gurama görkezýärdi; guramalar şol bir gapjygy biri-birine baglap bilerdi we tassyklamany ýatyrmagyň ýoly ýokdy. Tamga muny ÝB-niň TS3 \[12\] modeli bilen çalşyrdy (ADR-0025).

- #{strong[WIA]} (#{emph[Wallet Instance Attestation]}, gapjyk nusgasy tassyklamasy) gapjygyň özüni tanadýar. Onuň ömri 24 sagatdan gysga we #{strong[her resminama amalynda täzesi]} alynýar: täze eýeçilik açary we ýatyrylyş sanawynda biri-birine baglanyp bilinmeýän täze ýazgy bilen. Gurama başyna gaýtadan ulanmak wariantyndan bilkastlaýyn peýdalanylmady; peýdalanylan bolsa, üpjün ediji gapjygyň näçe gurama bilen gatnaşykda bolandygyny öwrenerdi.
- #{strong[KA]} (#{emph[key attestation]}, açar tassyklamasy) resminama açarlarynyň haýsy ammarda we haýsy ulanyjy tassyklamasy bilen goralýandygyny aýdýar. Ol bir bukjadaky ähli resminama açarlaryny göterýär we bir gezek ulanylýar. Ony ýatyrmak açar ammarynyň #{strong[görnüşi]} başyna umumy bir ýazgy bilen edilýär; şeýlelikde birligiň şahsyýetini KA-dan çykaryp bolmaýar.

HAIP 1.0 \[32\] §4.4.1 ýene bir düzgün getirýär: WIA-nyň "kim" meýdany (#{raw("sub")}) şol bir gapjyk çözgüdini ulanýan ähli nusgalarda umumy baha bolmaly. Tamga-da bu çözgüdiň adydyr; ol telefona mahsus baha götermeýär (ADR-0034 CI6). Guramanyň görýän zady adama däl-de, çözgüde salgylanýar.

#kod("json", "{
  \"iss\": \"https://saglayici.example\",
  \"sub\": \"ornek-cuzdan-cozumu\",
  \"iat\": 1795000000,
  \"exp\": 1795082800,
  \"wallet_name\": \"Örnek Cüzdan\",
  \"wallet_version\": \"1.4.0\",
  \"cnf\": { \"jwk\": { \"kty\": \"EC\", \"crv\": \"P-256\", \"x\": \"…\", \"y\": \"…\" } },
  \"client_status\": {
    \"status\": { \"status_list\": { \"idx\": 5127, \"uri\": \"https://saglayici.example/status/wia/3\" } },
    \"exp\": 1800184000
  }
}", baslik: "Mysal: WIA-nyň gysgaldylan mazmuny; meýdan gurluşy ýönekeýleşdirildi (bahalar mysal üçin)")

#kutu("teknik", [WIA-nyň ömri we baglanyşyksyzlyk])[
Mysaldaky bahalar bilen WIA-nyň ömri we ýatyrylyş ýazgysynyň saklanyş möhleti şeýle hasaplanýar:

#formul[$ "exp" - "iat" &= 1.795.082.800 - 1.795.000.000 = 82.800 "sek" = 23 "sag" < 24 "sag" \
"client_status.exp" - "iat" &= 5.184.000 "sek" = 60 "gün" gt.eq 31 "gün" $]

23 sagat Tamga-nyň saýlan ömrüdir, 60 gün adaty saklanyş möhletidir; gurama has uzyn möhlet yglan etse, üpjün ediji öz ýokarky çägine çenli berýär. Baglanyşyksyzlyk düzgüni bolsa bir setirdir: $i$ we $j$ iki aýry resminama amaly bolsa

#formul[$ "cnf"_i != "cnf"_j quad "we" quad "idx"_i != "idx"_j $]

Ýagny iki gurama şol bir gapjykdan gelen tassyklamalarda umumy açary ýa-da umumy ýatyrylyş ýazgysyny görmeýär. WIA we KA ýatyrylyş sanawlarynyň her biri azyndan 10.000 ýazgyly (2024\/2979 \[5\] belgili düzgünnamanyň Ib goşundysy); gurama bu çägiň aşagyndaky sanawa daýanýan tassyklamany kabul etmeýär.
]

Gurama resminama bermezden öň WIA-nyň goluny, üpjün edijiniň sanawdadygyny, möhleti, eýeçilik subutnamasyny we ýatyrylyş ýagdaýyny barlaýar; resminama nokadynda KA-ny we açar ammarynyň derejesiniň öz aşaky çägini kanagatlandyrýandygyny barlaýar. Ýatyrylan WIA ýa-da KA bilen resminama berilmeýär (ADR-0025 WIA4). Sanawda bolmadyk üpjün edijiniň gapjygyna hem resminama berilmeýär.

KA-nyň iň möhüm düzgüni "dereje hakykaty aýdýar" düzgünidir (ADR-0025 WIA3): barlanmadyk beýan KA-a ýazylmaýar. Enjam tassyklamasy (Apple App Attest, Android açar tassyklamasy, Play Integrity) bu hakykatyň çeşmesidir. Toruň düzgüni enjam tassyklamasyny diňe iň ýokary derejede hökmany edýär: W3 beýan edýän her KA-dan öň üpjün ediji enjam tassyklamasyny barlaýar, W2-de bu üpjün edijiniň kararydyr (ADR-0047 K5). Ony her derejede hökmany etmäge seredildi; enjam tassyklamasy her platformada we her enjamda bolmaýandygy üçin W2 gapjyklaryny daşarda galdyrjakdygy sebäpli ret edildi. #{strong[Ýagdaý:]} WIA we KA görnüşi we barlagy işleýär; enjam açarlary we enjam tassyklamasy kodlandy, enjam synagyna garaşýar (meýilleşdirilen; FW-ARF-0001 §2.8); barlanyp bilinmeýän enjam beýany KA-a girmeýär (Surat 21).

#sekil(21, [Gapjyk birligi, gapjyk üpjün edijisi we tassyklamalar], "figures/wp-tk/sekil-21.svg", yarim: false)

== Nusgalar

Gurama resminamalary on nusga görnüşinde berilýär; her nusga aýry enjam açaryna we ýatyrylyş sanawynda aýry orna bagly (Bölüm 9). Nusgalaryň nähili ulanyljakdygy iki taraplaýyn düzgüne baglanan: bir barlaýja #{strong[hemişe şol bir]} nusga, dürli barlaýjylara #{strong[dürli]} nusgalar görkezilýär (WL5). Şol bir barlaýja başga nusga görkezmek hiç zat gazandyrmaýar; Timur Aýnury onuň arzasyndan eýýäm tanaýar, başga nusga diňe nusga sarp edýär. Dürli barlaýjylara dürli nusga bolsa, iki barlaýjynyň enjam açary ýa-da ýatyrylyş orny arkaly ylalaşyp Aýnury gabat getirmeginiň öňüni alýar. Gabat getirmäniň açary barlaýjynyň hemişelik şahsyýetidir (#{raw("dns_name")}); sertifikat täzelense-de bozulmaýar.

Şol bir barlaýja şol bir görnüş üçin edilen gaýtadan hödürlemelerde açylýan meýdan toplumy hem durnukly galýar (WL6). Birinji hödürlemede sekiz, ikinjisinde alty meýdan açylan bolsa, barlaýjy aradaky tapawutdan gizlenen meýdanlar barada bir zat çykaryp bilerdi. Barlaýjy azrak sorasa, gapjyk artykmajyny ibermeýär, ýöne adama "siz bu barlaýja öň şu meýdanlary beripdiňiz" diýen maglumaty görkezýär.

Nusgalar gutarýar. Tanyş barlaýjyda bu mesele däl; täze barlaýjyda adam ýa täzeleýär, ýa-da bir nusgany baglanyşyk duýduryşy bilen gaýtadan ulanýar. Gapjyk guramanyň yglan eden çäklerinde nusgalary adamdan soramazdan hem täzeleýär (ADR-0023): täzeleme belligi bolan gurama resminamalarynda, programma öňde we gulp açyk wagty, tötänleýin gijikme bilen. Köne "awtomatik täzeleme ýok" düzgüni ÝB ARF-iniň \[11\] gaýtadan bermegiň mümkin boldugyça ulanyjynyň hereketini talap etmezligi baradaky şerti sebäpli üýtgedi. Şahsyýet we aragatnaşyk resminamalary bu çägiň daşynda; şahsyýet hyzmaty resminamany berenden soň adamyň meýdanlaryny saklamaýar.

#kutu("teknik", [Ümsüm täzelemäniň galýan yzy])[
Gurama häzir on nusgalyk bukja berýär we iki ulanylmadyk nusga galanda täzelemäni başladýar. Şol bir barlaýja gaýtadan hödürleme nusga sarp etmeýändigi üçin bir bukja şunça #{strong[täze]} barlaýja ýetýär:

#formul[$ 10 - 2 = 8 "täze barlaýjy" $]

Gurama täzeleme haýyşlarynyň ýygylygyndan resminamanyň takmynan näçe täze barlaýja görkezilendigini çykaryp biler: her sekiz täze barlaýjyda bir haýyş. Bu yz kabul edilen deňagramlylykdyr we dört çäre bilen daraldylýar: şol bir barlaýja şol bir nusga, 0 bilen 6 sagadyň arasynda tötänleýin gijikme, täzeleme haýyşynyň haýsy barlaýjy üçin edilendigini asla öz içine almazlygy we adamyň bu sazlamany öçürip bilmegi (ADR-0023 K6). Resminamanyň möhletiniň dolmagyna 7 gün galanda hem täzeleme başlaýar.
]

== Adamyň gözegçiligi

Gapjyk her hödürlemäni ýerli ýazga alýar: haçan, haýsy barlaýjy, haýsy meýdanlar, artykmaç talap bolupmydy. Bu ýazgy enjamda galýar we hiç bir serwere iberilmeýär; iberilen bolsa, takyk goralmaly bolan hereket profili bir merkezde jemlenerdi (SPEC-PROTO-0002 PV8, SPEC-WALLET-0001 WL4). Haýsy barlaýja haýsy nusganyň görkezilendigini saklaýan gabat getirme ýazgysy hem şol düzgüne tabyn we ätiýaçlyk nusga girmeýär.

ÝB bolsa adamyň amal žurnalyny we resminamalarynyň sanawyny eksport edip bilmegini hökmany edýär (2024\/2979 belgili düzgünnama, TS10). Žurnalyň serwerde şifrlenen ätiýaçlyk nusgasyny saklamak (meta-maglumat ýene-de jemlenýär) we ýönekeý JSON eksporty (paýlaşma programmalarynda açyk galýar) ret edildi. Karar: žurnal enjamdan diňe adamyň özüniň başladan we öz paroly bilen şifrlän faýlynda çykýar; faýla resminama bahalary, nusgalar we açarlar girmeýär (ADR-0027) (Tablisa 22).

#tablo([#{strong[Tablisa 22.]} Adamyň hukuklary we olaryň gapjykdaky gabatlyklary.], (29fr, 48fr, 20fr), ([Hukuk ýa-da zerurlyk], [Gapjykdaky gabatlygy], [Çeşme],), (
  ([Kime näme görkezendigimi bilmek], [Enjamdaky taryh: wagt, barlaýjy, meýdan atlary, artykmaç talap], [WL4, FW-ARF-0001 §2.7],),
  ([Maglumatymy almak we göçürmek], [Adamyň başladan, parolly TS10 faýly (göçürme sanawy we žurnal)], [ADR-0027],),
  ([Taryhyň näçe wagt saklanjakdygyny saýlamak], [30 \/ 90 \/ 180 \/ 365 gün ýa-da möhletsiz; pozmazdan öň duýduryş], [SPEC-WALLET-0001 §5.7],),
  ([Hemme zady pozmak], ["Gapjygy nola getir we maglumatlarymy poz": şahsyýet hyzmatyndaky ýazgy, üpjün edijidäki birlik ýazgysy, enjamdaky hemme zat], [SPEC-WALLET-0001 §7.6],),
  ([Bir guramadan maglumatymy pozmagy talap etmek], [Taryhdan "Maglumatlarymy pozmagy sora"], [FW-ARF-0001 §2.7],),
  ([Arz etmek], [Barlaýjynyň degişli bolan maglumatlary goramak edarasyna barýan ýol], [FW-ARF-0001 §2.7],),
  ([Telefonym ýitende gapjygy ýapmak], [Telefonsyz, hasapsyz ýatyrylyş ýoly (gurnalanda berlen ýatyrylyş syry)], [ADR-0047 K3],),
  ([Gapjygymyň ýatyrylandygyny öwrenmek], [Gapjykdan daşarda azyndan bir ýol], [ADR-0047 K4],),
))

Pozmagyň tertibi möhümdir: ilki şahsyýet hyzmaty (gapjyk meýdan açmazdan eýeçilik hödürlemesi bilen pozmagy soraýar; hyzmat ýazgyny pozýar, nusgalary ýatyrýar, uzakdan şahsyýet barlagy üpjün edijisindäki sessiýany pozdurýar), soňra gapjyk üpjün edijisi (birlik ýatyrylýar, ýazgysy pozulýar), iň soňunda enjam. Tor ýok bolsa, enjamdaky pozmak barybir ýerine ýetirilýär we adama galan ädimler görkezilýär.

Ýiten telefon üçin ÝB-niň ARF-i üpjün edijide ulanyjy hasabyny göz öňünde tutýar; Tamga-da hasap ýok. Şonuň üçin her üpjün ediji telefonsyz we hasap açmazdan işleýän ýatyrylyş ýoluny hödürlemäge borçly: birlik işjeňleşdirilende döredilip, adama bir gezek görkezilýän ýatyrylyş syry, üpjün edijide diňe haýal heşi bilen (ADR-0047 K3). Bu ARF-den aç-açan ýazylan gyşarmadyr; SMS bilen habar bermek bolsa ýiten telefona gitjekdigi we şahsy maglumat talap etjekdigi üçin tor düzgüni hökmünde ret edildi.

== "Tamga Network-de sanawda"

ÝB-de sertifikatly gapjyklar üçin ynam nyşany bar; onuň görnüşi we reňkleri düzgünnama bilen kesgitlenen we ol diňe agza döwletiň hödürleýän ýa-da ykrar edýän sertifikatly gapjygy üçindir. Tordaky hiç bir gapjyk ÝB gapjygy däl we bu nyşany ulanyp bilmeýär. Ýöne nyşanyň çözýän zerurlygy bu ýerde-de bar: adam telefonyndaky programmanyň düzgünlere eýerýän we sanawda hasaba alnan gapjykdygyny ýa-da däldigini bilmek isleýär.

Tamga-nyň jogaby ýazuw görnüşindäki görkezijidir: #{strong["Tamga Network-de sanawda"]} (ADR-0049). Logo, nyşan ýa-da möhür ýok; ÝB ýyldyzlary we reňkleri, "ynam nyşany" ýa-da "sertifikatly" sözi ulanylmaýar. Görkezijä basylanda gapjyk goly barlanan sanawdaky öz üpjün ediji ýazgysyny görkezýär: resmi adyny, ýazgynyň ýagdaýyny, derejesini we sanawyň çap edilen wagtyny. Görkeziji barlanyp bilinýän beýandyr, bezeg däl. Birlik ýatyrylan bolsa, üpjün ediji ýa-da çözgüt ýazgysy işjeň bolmasa, sanaw barlanyp bilinmeýän ýa-da köne bolsa, ýa-da gapjyk diňe sandbox sanawyna bagly bolsa, görkeziji gizlenýär. Öz logoly "Tamga ynam nyşany" hem seredildi; ady ÝB nyşanyny ýatladýandygy we logo barlanyp bilinýän hiç zat aýtmaýandygy üçin ret edildi. #{strong[Ýagdaý:]} işleýär (paketler 0.6.0-dan bäri).

== Ýaş çägi ýok

eIDAS 2.0 \[2\] Ýewropa Sanly Şahsyýet Gapjygy üçin iň az ýaşy göz öňünde tutmaýar we Tamga hem ýaş çägini goýmaýar: ne gapjyklaryň sanawa hasaba alynmagy üçin, ne-de şahsyýet hyzmatynyň şahsyýet resminamasyny bermegi üçin (ADR-0043). Ýeke-täk şert güýjündäki şahsyýet resminamasy bilen şahsyýeti barlamakdyr. Resminamany kimiň alyp biljekdigini şol resminamany beriji kesgitleýär; talyp resminamasyny diňe hasaba alnan talyba uniwersitet berýär. Ýaşa bagly hyzmat hem barlaýjy hökmünde diňe zerur maglumaty soraýar (#{raw("age_over_18")} ýaly; Bölüm 14). Tor boýunça 18 ýa-da 13–16 ýaş çägine seredildi; birinjisi talyp, sportçy we çäre ýaly kiçi ýaşlylaryň hem ulanýan resminamalaryny daşarda galdyrjakdygy, ikinjisi bolsa ýaş çägi däl-de, razylyga esaslanýan hyzmatlarda ene-atanyň razylygy düzgünidigi üçin ret edildi.

Açyk galan iş ene-atanyň razylygydyr. GDPR-yň \[8\] 8-nji maddasy razylyga esaslanýan maglumat jemgyýetiniň hyzmatlarynda 16 ýaşdan kiçiler üçin ene-atanyň razylygyny talap edýär (agza döwletler bu ýaşy 13-e çenli peseldip biler); KVKK \[9\] aýratyn ýaş goýmaýar. Şahsyýet hyzmatynyň razylyk akymy üçin gerek tertip hukuk derňewinden soň aýratyn karar bilen seredilip geçiler; uzakdan şahsyýet barlagy üpjün edijisiniň kiçi ýaşlylar üçin şerti hem tassyklanmaga garaşýar. #{strong[Ýagdaý:]} ýaş çäginiň ýoklugy işleýär; ene-atanyň razylygy akymy açyk iş.

= Şahsyýet: Wagtlaýyn Şahsyýet Resminamasy Üpjün Edijisi

Aýnur Stambulda bir işe arza bermezden öň uçurym bolan guramasyndan resminamasyny gapjygyna almak isleýär. Gurama oňa ýeke-täk sorag berýär: "Bu hakykatdanam senmi?" Bu soragy her guramanyň aýry-aýry bermegi her gezek şahsyýet kartyňyzyň suratyny, selfini we garaşmak wagtyny talap etmegi aňladýar. Ýewropa Bileleşiginde bu soraga döwletiň berýän şahsy şahsyýet maglumatlary (PID) jogap berýär: adam PID-ini gapjygynda görkezýär, gurama ony öz ýazgysy bilen deňeşdirýär we resminamany berýär. Türkiýede-de, türki dünýäsiniň hiç bir ýurdunda-da häzir şeýle döwlet üpjün edijisi ýok. Bu bölüm toruň bu boşlugy nähili we haýsy çäkler bilen doldurýandygyny düşündirýär.

== PID ýok wagty näme edilýär

Üç ýol bardy. Döwletiň PID üpjün edijisine garaşmak, ýöne munuň senesi ýokdy. Şahsyýeti barlamagy her guramanyň öz resminama beriş hyzmatyna goýmak; bu ýagdaýda adam her guramada täzeden barlanýar we her gurama aýry üpjün ediji integrasiýasyny gurýar. Ýa-da şahsyýeti bir ýerde barlap, netijäni adamyň gapjygyna göçürip bolýan resminama hökmünde bermek. Taslama dolandyryşy üçünji ýoly saýlady (ADR-0011): toruň şahsyýet hyzmaty (#{raw("id.tamga.network")}) adamy bir gezek uzakdan barlaýar we oňa özi gol çeken #{strong[şahsyýet resminamasyny]} berýär. Adam bu resminama bilen islän guramasyna barýar; gurama resminamany hödürleme arkaly alýar, öz ýazgysy bilen deňeşdirýär we öz resminamasyny berýär.

Bu resminama PID däl; ÝB-niň dilinde ol kwalifisirlenmedik elektron atribut tassyklamasydyr (EAA). Ynam sanawynda PID üpjün edijileriniň orny (#{raw("pid_providers[]")}) bilkastlaýyn boş goýulýar we şahsyýet hyzmaty adaty resminama beriji ýazgysydyr (kategoriýa #{raw("IDENTITY")}). Bu tapawudyň amaly netijesi tabşyrylanda görünýär: döwlet PID üpjün edijisini bellände şahsyýet hyzmatynyň ýazgysy mirasdüşer görkezijisi (#{raw("successor_id")}) bilen tabşyrylýar, täze resminama berilmeýär, berlen resminamalar möhletleri dolýança barlanyp bilinýän bolup galýar (FW-RB-0003 §4.7). Meýdan atlary ÝB PID-i bilen birmeňzeş bolany üçin guramalaryň deňeşdiriş kody üýtgemeýär; diňe gol çekiji üýtgeýär. Bu ARF-iň \[11\] "PID hödürlemesi bilen EAA bermek" nusgasynyň edil özüdir (FW-TF-0001 §3.5). #{emph[Ýagdaý: işleýär.]} Hakyky toruň Türkiýe sanawynda häzir ýeke-täk işjeň resminama beriji şahsyýet hyzmatydyr (Surat 22).

#sekil(22, [Şahsyýet zynjyry: bir gezek barla, her gurama şol bir resminama bilen bar], "figures/wp-tk/sekil-22.svg", yarim: false)

== Uzakdan şahsyýet barlagy

Uzakdan şahsyýet barlagy üç barlagyň jemidir: şahsyýet resminamasyny skanirläp, onuň hakykylygyny derňemek, kameranyň öňündäki adamyň janlydygyny anyklamak (janlylyk) we ýüzi resminamadaky surat bilen deňeşdirmek. Bu işi ygtyýarnamaly uzakdan şahsyýet barlagy üpjün edijisi ýerine ýetirýär. Dizaýn belli bir üpjün edijä bagly däl: şahsyýet hyzmaty üpjün ediji bilen dar adapter interfeýsi arkaly gürleşýär (sessiýa aç, karary al, habarnamany barla) we ikinji üpjün ediji şol bir interfeýsiň aňyrsyna goşulyp bilner (SPEC-ID-0003 §6). Ikinji, ýerli üpjün edijiniň goşulmagy açyk meseledir (SPEC-ID-0003, Açyk meseleler 3).

Üpjün ediji toruň görmäge iň köp ygtyýary bolan daşky bölegidir; ol adamyň resminamasyny we ýüzüni görýär. Şonuň üçin onuň töweregine berk düzgünler çekildi (SPEC-ID-0003 §3, §8). Üpjün ediji bilen diňe şahsyýet hyzmaty gürleşýär; guramalar, gapjyklar we barlaýjylar gürleşmeýär. Üpjün edijiniň sessiýasy adama şahsyýet hyzmatynyň beren opak salgylanmasy bilen baglanýar; bu meýdana at, şahsyýet belgisi ýa-da e-poçta ýazylmaýar. Iş akymynda diňe resminama, janlylyk we ýüz deňeşdirmesi açyk; jenaýatçylykly girdejileri barlamak we aragatnaşyk barlagy ýapyk, sebäbi maksat diňe resminama bermegiň deslapky şertini üpjün etmekdir. Üpjün edijiniň habarnamasy (webhook) gol we wagt belligi bilen barlanýar, ýöne ol diňe başladyjydyr; karar hemişe üpjün edijiniň karar nokadyndan täzeden alynýar. Resminamanyň şekili, portret, wideo we nyşan tanamagyň netijesi şahsyýet hyzmatynda saklanmaýar; hyzmatyň saklaýan zady netijäniň gysga jemlemesidir. Žurnallara wakanyň görnüşi, sessiýa salgylanmasy we dereje ýazylýar; at, resminama belgisi we gabat gelme baly ýazylmaýar.

Säwlik ýagdaýlary hem howpsuz tarapa gurlan. "Derňelýär" ýa-da "ret edildi" kararynda resminama berilmeýär we adama üpjün edijiniň esaslandyrmasy geçirilmeýär; üpjün edijiniň kesilmegi derejäni peseltmeýär, diňe resminama bermegi togtadýar. Adam üpjün edijä geçmezden öň maglumat beriş tekstini görýär we aç-açan razylygyny berýär; razylyk ýok bolsa barlag başlamaýar.

Bu ädimiň bir gowşak tarapyny aç-açan aýtmak gerek: janlylyk we ýüz deňeşdirmesi emeli döredilen ýüzlere we wideo akymyna goşulyp edilýän hüjümlere (deepfake we injeksiýa hüjümleri \[55\]) garşy üpjün edijiniň ýüze çykaryş ukyby näçe güýçli bolsa, şonça güýçlüdir. Tor bu töwekgelçiligi iki düzgün bilen daraldýar: iň ýokary dereje (T3) hiç bir uzakdan ýüz barlagy bilen berilmeýär we üpjün ediji bilen baglaşylan şertnama ETSI TS 119 461-e \[47\] salgylanýar (FW-TF-0001 §3.5). Mesele tapgyryň "Deepfake Çağında Kimlik Doğrulama" \[78\] makalasynda jikme-jik seredilýär.

#kutu("teknik", [Şahsyýet resminamasyny almagyň akymy])[
Şahsyýet resminamasyny gurama däl, gapjyk başladýar; akym OpenID4VCI-iň \[30\] ygtyýarlandyryş kody ýoludyr (Bölüm 9.1) we SPEC-ID-0003 §9 hem-de SPEC-PROTO-0001 §11.2-de kesgitlenen. Gapjyk her ädimde sanawdaky gapjyk üpjün edijisiniň beren gapjyk nusgasy tassyklamasyny (WIA) göterýär (Bölüm 13.3).

#adimlar((
  ("Gapjyk → Şahsyýet hyzmaty", [#{strong[Ygtyýar haýyşy.]} Haýyş PAR bilen goýulýar; müşderi belgisi WIA, PKCE kody goşulýar. Şahsyýet resminamasynyň çäginiň ýanynda ZK nusgasynyň çägi hem soralyp bilner.], $"code_challenge" = "SHA-256"("code_verifier")$),
  ("Şahsyýet hyzmaty → Adam", [#{strong[Maglumat bermek we razylyk.]} Brauzerde maglumat beriş teksti görkezilýär, aç-açan razylyk alynýar; razylyk ýok bolsa akym #{raw("access_denied")} bilen gutarýar.], []),
  ("Şahsyýet hyzmaty → Üpjün ediji", [#{strong[Sessiýa.]} Opak adam salgylanmasy bilen sessiýa açylýar; adam resminamasyny skanirleýär, janlylyk we ýüz deňeşdirmesi edilýär.], $"vendor_data" = "subject_ref"$),
  ("Şahsyýet hyzmaty", [#{strong[Karar.]} Habarnama gelse-de, karar üpjün edijiniň karar nokadyndan alynýar; üç barlag geçilen bolsa dereje T2 bolýar.], $"T2" <== "resminama" ∧ "janlylyk" ∧ "ýüz"$),
  ("Şahsyýet hyzmaty → Gapjyk", [#{strong[Ygtyýarlandyryş kody we bellik.]} Bir gezeklik kod PKCE barlagy we WIA bilen giriş belligine öwrülýär; bellik DPoP açaryna bagly.], $"jkt" = "SHA-256"("JWK"_"dpop")$),
  ("Gapjyk → Şahsyýet hyzmaty", [#{strong[Resminama haýyşy.]} Her nusga üçin aýry enjam açary bilen açar subutnamasy we açar tassyklamasy (KA) iberilýär.], $"cnf"_i != "cnf"_j quad (i != j)$),
  ("Şahsyýet hyzmaty → Gapjyk", [#{strong[Bermek.]} SD-JWT VC we mdoc görnüşinde 10 nusga; soralan bolsa gysga ömürli ZK nusgalary; soňra şol bir bellik bilen aýry haýyşda lakam tohumy.], []),
  ("Şahsyýet hyzmaty", [#{strong[Arassalamak.]} Adamyň meýdanlary ýatdan aýrylýar; hemişelik ýazgyda diňe opak salgylanma, resminama belgisiniň açarly heşi, möhlet we ýatyrylyş sanawyndaky orunlar galýar.], $"document_number_hash" = "HMAC-SHA256"(k_"doc", "ýurt" ‖ "görnüş" ‖ "no")$),
))

Tohumyň aýry haýyşda berilmegi standarta laýyklyk kararydyr: OpenID4VCI 1.0 resminama jogabyna goşmaça meýdan goşmaga rugsat bermeýär, şonuň üçin tohum aýry resminama konfigurasiýasy hökmünde yglan edilýär we şahsyýet resminamasyny beren bellik bilen diňe bir gezek soralyp bilner (ADR-0061).
]

== Derejeler

Tor ynamy iki garaşsyz okda ölçeýär (ADR-0005). Birinji ok adamyň şahsyýetiniň näderejede güýçli barlanandygydyr: T0-dan T3-e çenli. Ikinji ok resminama berijiniň näderejede barlanandygydyr: I1-den I3-e çenli (Bölüm 18.6). Barlaýjynyň ynamy ikisiniň jemi däl-de, köpeltmek hasylydyr; gaty gowy barlanan adam barlanmadyk guramanyň resminamasyny göterýän bolsa ýa-da akkreditasiýaly gurama şahsyýeti asla barlanmadyk adama resminama beren bolsa, netije gymmatsyzdyr. Adam tarapyndaky derejeler eIDAS kepillik derejeleri \[4\] we şahsyýet barlagy üçin ETSI TS 119 461-iň derejeleri bilen birme-bir gabat gelýär; şeýlelikde tor öz ölçegini ulananda ÝB bilen şol bir dilde gürleşýär (Tablisa 23).

#tablo([#{strong[Tablisa 23.]} Adamyň kepillik derejeleri we olaryň gabatlyklary (ADR-0005; SPEC-ID-0003 §1; FW-ARF-0001 §6.5).], (19fr, 21fr, 14fr, 48fr, 26fr), ([Dereje​​​​​​​​​], [eIDAS derejesi​​​​​​​​​], [ETSI TS 119 461​​​​​​], [Adaty ýol], [Şahsyýet hyzmatynda],), (
  ([T0], [ýok], [ýok], [enjam açary, e-poçta ýa-da telefon kody; şahsyýet barada tassyklama ýok], [aragatnaşyk resminamalary],),
  ([T1], [Low], [Baseline], [aýry kanaldan gelýän kod, liniýa ýa-da hasap eýeçiligi], [ulanylmaýar],),
  ([T2], [Substantial], [Substantial], [uzakdan resminama + janlylyk + ýüz deňeşdirmesi ýa-da ýüzbe-ýüz hasaba alyş stoly], [şahsyýet resminamasy häzir şu derejede],),
  ([T3], [High], [High], [kwalifisirlenen elektron gol bilen nonce-a gol çekmek; döwlet tapgyrynda PID], [uzakdan ýüz barlagy bilen berilmeýär],),
))

Iki düzgün tablisany doldurýar. Birinjiden, dereje resminama ýazylmaýar. Resminama görnüşi iň pes derejäni deslapky şert hökmünde göterýär; gurama bu derejäni resminama bermezden öň üpjün edýär we haýsy ýol bilen üpjün edendigini öz barlag ýazgysyna ýazýar (SPEC-ID-0003, Çägi). Resminama "kepillik" meýdany goýlan bolsa, her barlaýjy adamyň haýsy ýoldan geçendigini öwrenerdi. Ikinjiden, NFC bilen çip okalan hem bolsa, netije hukuk taýdan T3 hasaplanmaýar; resminama bu hakykaty #{raw("document_chip_verified")} meýdany bilen diňe hakykat hökmünde göterýär (FW-RB-0003 §4.3). Derejeler wagtyň geçmegi bilen hem könelip biler: enjamyň çalşylmagy ýa-da uzak wagtlap ulanylmazlyk ýaly wakalar derejäni peseldýär (ADR-0005, 4-nji karar).

== Synp: kwalifisirlenmedik

Şahsyýet hyzmaty ynam sanawyna ilki iň ýokary synpda hasaba alnypdy. Ondan soň geçirilen ÝB boşluk derňewi munuň goralyp bilinmejekdigini görkezdi (ADR-0022). eIDAS 2.0-da \[2\] "kwalifisirlenen" hukuk derejesidir; ol garaşsyz laýyklyga baha beriş edarasynyň barlagyny we gözegçilik edarasynyň gözegçiligini talap edýär. Emma tor bu hyzmatda hem sanaw operatory, hem hasaba alyş edarasy, hem-de resminama berijidir; ol özüni iň ýokary synpa özi ýazan bolardy. Seredilen dört wariantdan "kwalifisirlenmedik EAA, I2" kabul edildi: ol hakyky ýagdaýy beýan edýär we ÝB-de kwalifisirlenmedik EAA-ny her kim berip biler. I1 hem ret edildi, sebäbi şahsyýet barlagy we açar dolandyryşy I2 şertlerini kanagatlandyrýardy.

Resminamada munuň görünýän yzy bar, has takygy, yzyň ýoklugy. ETSI TS 119 472-1 \[49\] kwalifisirlenmedik we döwlet çeşmesinden gelmeýän EAA-da hukuk kategoriýasy meýdanynyň bolmazlygyny talap edýär; şonuň üçin şahsyýet resminamasy #{raw("category")} meýdanyny götermeýär we resminamanyň synpy resminama berijiniň sanawdaky ýazgysyndan okalýar (FW-RB-0003 §2.1). Iki üýtgewsiz düzgün bu karary goraýar: toruň özi işledýän hyzmaty garaşsyz baha bermezden kwalifisirlenen ýa-da I3 hökmünde hasaba alynmaýar we synp ýokarlandyrylýança hiç bir syýasat şahsyýet resminamasy üçin I3 talap etmeýär. Garaşsyz baha berilenden soň synp täze ADR bilen ýokarlandyrylyp bilner. #{emph[Ýagdaý: ýokarlandyrmak meýilleşdirilen.]}

== Meýdanlar

Şahsyýet resminamasy ÝB PID-iniň meýdan atlaryny we kodlamasyny ulanýar (ADR-0045; Ýerine ýetiriş düzgünnamasy (ÝB) 2026\/1731 \[7\]). At we kodlama tapawutlary ÝB-niň öz tapawutlarydyr: SD-JWT VC-de \[16\] doglan senesi #{raw("birthdate")}, mdoc-da \[34\] #{raw("birth_date")} hökmünde, ISO sene belligi bilen ýazylýar. Görnüşi we at meýdany (#{raw("urn:tamga:id:IdentityAttestation:1")}, #{raw("tamga.id.1")}) toruňkydyr; ÝB-niň PID görnüşi we at meýdany ulanylmaýar, sebäbi resminama PID däl. Bu saýlawyň alternatiwasy tora mahsus atlary saklap, her barlaýja gabatlyk tablisasyny bermekdi; ol ret edildi, sebäbi ol her ÝB barlaýjysyny toruň atlaryny öwrenmäge mejbur ederdi (Tablisa 24).

#tablo([#{strong[Tablisa 24.]} Şahsyýet resminamasynyň meýdanlary (FW-RB-0003 §2.2, §3.1, §3.2). Adamyň ähli meýdanlary aýry-aýrylykda açylyp bilner; portret, salgy we kepillik derejesi meýdany ýok.], (48fr, 33fr, 22fr, 26fr), ([SD-JWT VC ady​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [mdoc elementi​​​​​​​​​​​​​​​​​​], [Näme göterýär], [Bellik],), (
  ([#{raw("given_name")}, #{raw("family_name")}], [şol bir], [ady, familiýasy], [ÝB PID ady],),
  ([#{raw("birthdate")}], [#{raw("birth_date")}], [doglan senesi], [ÝB PID kodlamasy],),
  ([#{raw("nationalities")}], [#{raw("nationality")}], [raýatlyklaryň massiwi], [her element aýratyn açylýar],),
  ([#{raw("personal_administrative_number")}], [şol bir], [milli şahsyýet belgisi], [diňe şu görnüşde bar],),
  ([#{raw("issuing_country")}], [şol bir], [ÝB manysynda resminamany beren üpjün edijiniň ýurdy], [häzir skanirlenen şahsyýet resminamasyny beren ýurt],),
  ([#{raw("document_type")}], [şol bir], [barlanan resminamanyň görnüşi], [şahsyýet karty, pasport, ýaşamaga rugsatnama, sürüjilik şahadatnamasy],),
  ([#{raw("document_number_hash")}], [şol bir], [resminama belgisiniň açarly heşi], [belginiň özi ýok],),
  ([#{raw("document_chip_verified")}], [şol bir], [NFC çipi okaldymy], [hakykat, dereje däl],),
  ([#{raw("verification_method")}], [şol bir], [barlag ýoly], [uzakdan, NFC bilen uzakdan, ýüzbe-ýüz],),
  ([#{raw("age_over_18")}, #{raw("age_over_15")}], [şol bir], [ýaş çägi geçildimi], [alnan hawa\/ýok],),
))

Şahsyýet belgisi bilkastlaýyn diňe şu resminamada durýar we diňe hasaba alnan çäginde bu meýdan bolan barlaýja açylýar (SPEC-ID-0003 §8). Belginiň ýoklugy hem synag edildi: diňe at we doglan senesi bilen deňeşdirmek atdaşlarda näbelli bolýar we guramalaryň ret etmeleri köpelýär; bu wariant ret edildi (ADR-0011).

Ýaş meýdanlarynda barlaýja köplenç doglan senesi gerek däl; çägiň geçilendigini ýa-da geçilmändigini bilmek ýeterlik. Şahsyýet hyzmaty bu jogaby resminamany beren pursatynda doglan senesinden alýar we oňa gol çekýär; gapjyk çägi özi hasaplamaýar, sebäbi onda resminama berijiniň goly netijäni öz içine almazdy. Atlar ISO\/IEC 18013-5-iň #{raw("age_over_NN")} nusgasyna eýerýär we çäkleriň toplumy ýapyk: häzir 15 we 18; täze çäk diňe ADR bilen goşulýar (ADR-0064). 15 ýaş çäginiň esaslarynyň biri Türkiýede 7578 belgili Kanun \[10\] bilen sosial tor üpjün edijileri üçin girizilen we 2026-njy ýylyň 1-nji noýabrynda güýje giren 15 ýaş düzgünidir. Bu hukuk pikiri däl; ol platformanyň öz borjuny nähili ýerine ýetirjekdigini kesgitlemeýär, diňe toruň şahsyýet resminamasynyň bu soraga iň az maglumat bilen jogap berip bilmegini üpjün edýär.

#kutu("teknik", [Ýaş meýdanlarynyň alnyşy])[
Alyş resminama berlen güni, hyzmatyň sagadynyň UTC senenama gününe görä edilýär. Adam N-nji doglan gününiň başlanýan güni çägi geçýär; 29-njy fewralda doglanlar kabisa ýyly bolmadyk ýyllarda 1-nji martda (ADR-0064, K1):

#formul[$ "age_over_N" &= ("doglan_senesi" + N "ýyl" <= "berlen_güni") quad quad N in {15, 18} \
"mysal:" quad "1998-05-17" + 18 "ýyl" &= "2016-05-17" <= "2026-11-04" quad => quad "age_over_18" = "true" $]

Bahalar mysal üçin. Barlaýjy diňe hawa ýa-da ýok görýär. Iki çägi bilelikde açmak ýaş aralygyny aýan edip biljekdigi üçin (biri hawa, beýlekisi ýok bolsa, adam 15 bilen 17 ýaş arasyndadyr) toruň barlaýjy syýasatlary ýeke-täk çägi talap edýär; iki çägi birden soraýan çäk barlaýjynyň ýazgysynda aýratyn esaslandyrylmaly (ADR-0064, K3).
]

== Şahsyýetden döreýän resminamalar

Şahsyýet hyzmaty şol bir infrastruktura bilen ýene üç resminama görnüşini berýär. Olaryň her biri aýry karardan döredi we hemmesinde şol bir sorag berildi: bu maglumat şahsyýet resminamasynyň içine goýulmalymy ýa-da aýry resminama bolmalymy? Her gezek jogap "aýry resminama" boldy, sebäbi aýry resminamalar aýry görkezilýär, aýry ýaşaýar we aýry ýatyrylýar (Tablisa 25).

#tablo([#{strong[Tablisa 25.]} Şahsyýet hyzmatynyň berýän görnüşleri.], (34fr, 23fr, 35fr, 22fr, 28fr, 25fr, 30fr), ([Görnüş​​​​​​​​​​​​​​​​​​​​​], [Näme subut edýär], [Deslapky şert​​​​​​​​​​​​​​​​​​​​​​​​], [Güýjünde bolmagy], [Formaty​​​​​​​​​​​​​​​], [Karar​​​​​​​​​​​​​​​], [Ýagdaý],), (
  ([Şahsyýet resminamasy], [kimdigini], [uzakdan şahsyýet barlagy (T2)], [iň köp 2 ýyl], [SD-JWT VC + mdoc], [ADR-0011, ADR-0013], [işleýär],),
  ([ZK nusgasy], [diňe ýaş çäklerini], [şahsyýet resminamasy], [iň köp 24 sagat], [mdoc], [ADR-0044], [şahsyýet hyzmatynda işleýär; gapjyk tarapy meýilleşdirilen],),
  ([Lakam tohumy], [hiç zat; görkezilmeýär], [şahsyýet resminamasy], [şahsyýet resminamasy bilen deň], [SD-JWT VC], [ADR-0031, ADR-0061], [işleýär],),
  ([E-poçta, telefon], [salgynyň şol gapjygyň elindedigini], [bir gezeklik kod (T0)], [iň köp 1 ýyl], [SD-JWT VC], [ADR-0021], [e-poçta işleýär; hakyky SMS ibermek meýilleşdirilen],),
  ([Sürüjilik şahadatnamasynyň maglumaty], [kartda ýazylan kategoriýalar we seneler], [şahsyýet resminamasyny görkezmek], [kartyň möhleti ýa-da 1 ýyl, haýsysy öň bolsa], [SD-JWT VC], [ADR-0039], [sandbox-da; hakyky adamlara hukuk derňewinden soň],),
))

Aragatnaşyk resminamalary adamyň kimdigini aýtmaýar; diňe "bu salgy resminama berlen pursatynda şu gapjygyň elindedi" diýýär. Şonuň üçin olar şahsyýet barlagyny talap etmeýär we şahsyýet maglumatyny götermeýär. Salgy diňe akym dowamynda ýatda durýar, resminama berlenden soň pozulýar; maglumatlar bazasyna diňe onuň açarly heşi ýazylýar, žurnala ne salgy, ne-de kod ýazylýar (ADR-0021). Belgiler we salgylar wagtyň geçmegi bilen başga birine geçip bilýändigi üçin güýjünde bolmak möhleti bir ýyl bilen çäklendirilýär.

Sürüjilik şahadatnamasynyň maglumaty iň köp çäk bilen gurşalan görnüşdir. Ol awtoulag kärendesi ýa-da kurýer işe almak ýaly işlerde garşy tarapyň berýän "haýsy kategoriýada güýjündäki şahadatnamaň bar?" soragyna jogap berýär, ýöne resmi sürüjilik şahadatnamasy däl we mobil sürüjilik şahadatnamasy (mDL) hem däl. Muny dört ýerde aç-açan aýdýar: tanyşdyryş maglumatynda, her barlaýjynyň görýän we asla gizläp bolmaýan #{raw("not_official_licence: true")} meýdanynda, gapjykdaky kartyň öň ýüzünde we barlaýjy ekranlarynda (ADR-0039). Ol kartyň häzir togtadylandygyny ýa-da däldigini görkezmeýär; toruň resmi ýazga girip bilmegi ýok. Milli şahsyýet belgisi, çäklendirme we saglyk kodlary resminama girmeýär. Kart bilen şahsyýet resminamasynyň arasyndaky gabatlyk üpjün edijä at iberilmezden, şahsyýet hyzmatynda açarly heş bilen gurulýar. Bir ýurduň ygtyýarly edarasy sanly sürüjilik şahadatnamasyny berip başlanda tor şol ýurt üçin bu görnüşi bermegi bes edýär.

Lakam tohumy bolsa asla görkezilmeýän ýeke-täk görnüşdir. Onuň wezipesi Bölüm 15.3-de düşündirilýär.

== Saklamak we pozmak

Şahsyýet hyzmaty bu maglumat üçin maglumat jogapkäridir (FW-TF-0001 §3.6). Şonuň üçin toruň öň ulanýan "Tamga hiç bir şahsy maglumaty görmeýär" sözlemi daraldyldy: tor şahsyýet barlagynyň maglumatlaryny görýär, bilim we pudak resminamalarynyň mazmunyny görmeýär (ADR-0011, K4). Resminama berlenden soň adamyň meýdanlary saklanmaýar; hemişelik ýazgyda diňe opak adam salgylanmasy, resminama belgisiniň açarly heşi, möhletler we ýatyrylyş sanawyndaky orunlar galýar (SPEC-ID-0003 §8). Ýazgylar we waka žurnallary gysga we kesgitli möhletler bilen saklanýar; bu möhletler hukuk derňewi bilen takyklanar. Üpjün ediji tarapyndaky şekil saklamak möhleti şertnama bilen iň aza çenli azaldylýar.

Pozmak haýyşy gyzykly dizaýn meselesini çözýär: adamyň hasaby ýok, onda "bu ýazgy meniňki" diýeni hyzmat nähili tanaýar? Jogap hyzmatyň beren resminamalarynyň özüdir. Adam pozmak nokadyna bir ýa-da birnäçe şahsyýet resminamasynyň hödürlemesini iberýär; hiç bir meýdan açylmaýar, diňe gol we enjam baglanyşygy barlanýar. Ýazgy ýatyrylyş sanawyndaky orundan tapylýar. Netijede ýazgynyň ähli nusgalary güýjünden düşýär, ýazgy we oňa bagly žurnal setirleri pozulýar, üpjün edijiden sessiýanyň pozulmagy soralýar (SPEC-ID-0003 §9.1). Ýatyrylyş sanawynda diňe bitler galýar. Lakam tohumy hyzmat tarapynda asla saklanmaýandygy üçin onda pozulmaly zat ýok.

== Dükan synlaýyş kody

Gapjyk programmasy programma dükanyna girmezden öň synlaýjylar onuň ähli akymlaryny synap görmek isleýär. Şahsyýet akymy hakyky şahsyýet resminamasyny we ýüz skanirlemesini talap edýändigi üçin synlaýjy muny edip bilmeýär. Hemişelik "synag tertibi" ret edildi: ony hakyky ulanyjy hem açyp biler we ýasama resminamalar hakyky ýaly görnüp biler. Kabul edilen çözgüt möhletli we bir gezeklik synlaýyş kodudyr (ADR-0033). Kod azyndan 128 bit tötänleýin, diňe heşi bilen saklanýar, iň köp 14 gün güýjünde we maglumat beriş sahypasyndaky kiçi meýdana girizilýär. Güýjündäki kod bilen şol sessiýa üçin ýasama barlag ulanylýar we resminama aýry synag gol çekijisi bilen gol çekilýär. Bu gol çekiji sanawda iň pes synpda (I1) durýar; hakyky syýasatlaryň hemmesi I2 talap edýändigi üçin synag resminamasy hiç bir hakyky barlagdan geçmeýär. Kod toruň hyzmatydyr we sanawdaky her gapjyga deň şertlerde açyk. #{emph[Ýagdaý: meýilleşdirilen.]} Kod taýýar; synag gol çekijisiniň sanaw ýazgysy garaşylýan arza hökmünde durýar we ýazgy çap edilýänçä synlaýyş ýoly "işjeň däl" jogabyny berýär.

= Gizlinlik Inženeriýasy

Timur bir kompaniýada işe alyş bilen meşgullanýar we Aýnuryň diplomyny barlaýar. Şol agşam Aýnur Dilnozanyň işläp düzen saýtyna "Tamga bilen gir" düwmesi arkaly agza bolýar. Indiki hepde Timuryň kompaniýasy bilen Dilnozanyň saýty müşderi sanawlaryny deňeşdirmek karar etse näme bolar? Iki ýazgyda umumy baha bar bolsa (açar, belgi ýa-da şol bir sekunda düşýän wagt belligi), Aýnuryň iki durmuşy biri-birine baglanýar. Gizlinlik diňe "haýsy meýdany görkezdim" diýen sorag däl; ol "görkezen zatlarymy başgalar bilen birleşdirip bolarmy" diýen soragdyr. Bu bölüm toruň bu ikinji soraga berýän inženerçilik jogaplaryny yzygiderli beýan edýär. Düşünjäniň özi tapgyryň "Bağlanamazlık" makalasynda jikme-jik düşündirilýär.

== Howp hökmünde baglanyşyklylyk

Baglanyşyklylyk birnäçe aýry kanaldan döreýär we her kanalyň öz çäresi bar. Şol bir resminamanyň şol bir nusgasy iki barlaýja görkezilse, gol we enjam açary iki ýerde-de birmeňzeş bolýar. Resminamanyň berlen sekundy barmak yzy diýen ýaly bir zatdyr. Ýatyrylyş sanawyndaky orun resminama mahsusdyr. Saýta girmek üçin ulanylýan belgi her saýtda birmeňzeş bolsa, saýtlar birleşýär. Iň soňunda, resminamany beren gurama öz goluny tanaýar; gurama bir barlaýjy bilen hyzmatdaşlyk etse, adamy barybir tapyp biler. Tor bu soňkusyny häzir doly ýapyp bilmeýär we ony galyndy töwekgelçilik L3 hökmünde ýazýar (FW-ARF-0001 §7.4) (Surat 23).

#sekil(23, [Baglanyşyklylygyň kanallary we olaryň her biriniň çäresi], "figures/wp-tk/sekil-23.svg", yarim: false)

== Barlaýjy başyna nusga we tegeleklenen wagt

Gapjyk resminamany ýeke nusga hökmünde däl-de, on nusga hökmünde alýar we her nusga aýry enjam açaryna bagly (SPEC-PROTO-0001 §8). Düzgün resminama beriji tarapynda hem berk talap edilýär: şol bir açar bilen gelen subutnamalar ret edilýär, sebäbi şol bir açar nusgalary ýene biri-birine baglardy. Gapjyk her barlaýja aýry nusga görkezýär we şol bir barlaýja hemişe şol bir nusgany görkezýär (ýapyşýan nusga düzgüni, Bölüm 13.4). Şeýlelikde iki barlaýjy elindäki gollary deňeşdirse-de umumy baha tapyp bilmeýär. Nusgalar azaldygyça gurama resminamalary ümsümlik bilen täzelenýär (ADR-0023).

Ikinji çäre wagtdyr. Resminamanyň berlen we möhletiniň gutarýan pursatlary sekundyna çenli ýazylan bolsa, şol bir nusga bukjasyndaky resminamalary ýa-da şol bir günde berlen az sanly resminamany wagt belliginden tapawutlandyryp bolardy. Şonuň üçin resminama beriş paketi #{raw("iat")} we #{raw("exp")} bahalaryny sagada çenli aşak tegelekleýär; şol bir bukjadaky ähli nusgalar birmeňzeş bahalary alýar. Tegeleklemek resminamanyň barlanyp bilinmegini bozjak bolsa (meselem, gol sertifikaty şol sagadyň içinde başlan bolsa), hakyky pursat galýar: barlanyp bilinmek baglanyşyksyzlykdan öňde durýar. #{emph[Ýagdaý: işleýär.]}

== Saýt başyna lakam

"Tamga bilen gir" ilkinji wersiýasynda her saýta şahsyýet resminamasyndaky resminama belgisiniň heşini iberýärdi. Saýt bahany bolşy ýaly saklamaýardy, ýöne iki saýt ylalaşsa, şol bir bahany görüp, şol bir adamy tapardy. Üstesine-de adam şahsyýet kartyny täzelände resminama belgisi üýtgeýändigi üçin saýtdaky hasap hem ýiterdi. ADR-0031 bu iki meseläni bilelikde çözmek üçin bäş wariantyň deňeşdirmesini geçirdi.

Gapjygyň öz tötänleýin syryndan açar almak doly baglanyşyksyzlygy bererdi, ýöne telefon çalşylanda ähli hasaplar ýiterdi. Resminama berijiniň saýt başyna belgi döretmegi hasaplary gorardy, ýöne şahsyýet hyzmaty adamyň haýsy saýta girendigini öwrenerdi. Passkey özbaşdak şahsyýet götermeýär; ol gündelik giriş üçin galdy. Nol bilimli subutnama bilen alnan belgi dogry uzak möhletli çözgütdir, ýöne häzir ol dükan ýygnamasyny we ZK kitaphanasyny talap edýär. Saýlanan ýol şahsyýetden alynýan tohumdyr.

Şahsyýet hyzmaty şahsyýet resminamasyny berende adamyň üýtgemeýän şahsyýetinden (Türkiýe üçin şahsyýet belgisinden) tohum alýar. Tohum aýry we asla görkezilmeýän resminama görnüşi bilen gapjyga gelýär we serwerde saklanmaýar; her barlagda şol bir giriş maglumatyndan täzeden hasaplanýar. Gapjyk bu tohumdan her saýt üçin aýry açar alýar. Saýt adamy şol açaryň barmak yzy arkaly tanaýar. Iki saýt dürli açarlary görýändigi üçin adamy gabat getirip bilmeýär; adam täze telefonda şahsyýetini täzeden barlanda şol bir tohum, diýmek şol bir lakamlar yzyna gelýär. Deslapky ýagdaýda bir saýtda bir lakam bolýar, bu bolsa ýasama köp hasaby kynlaşdyrýar; saýt isläp, öz ýazgysynda birnäçe lakama rugsat berip biler. Saýta hasaba durlanda diňe syýasatda rugsat berlen meýdanlar (meselem, ady, familiýasy), girişde bolsa hiç bir resminama meýdany gitmeýär. #{emph[Ýagdaý: işleýär.]}

#kutu("teknik", [Lakamy almak])[
Alyş iki tapgyrly (ADR-0031, K1 we K2; SPEC-WALLET-0001 §5.4). Bellik wersiýa setiridir; hemişelik ululyklar gysgaldyldy:

#formul[$ "seed" &= "HMAC-SHA256"(k_"ps", quad "bellik" ‖ "ýurt" ‖ "şahsyýet_belgisi") \
d_"site" &= "HKDF-SHA256"("seed", quad "info" = "bellik" ‖ "dns_name" ‖ "tertip") mod n \
Q_"site" &= d_"site" dot G quad ("P-256") \
"lakam" &= "RFC7638-barmak-yzy"(Q_"site") $]

Birinji setir şahsyýet hyzmatynda, beýleki üçüsi gapjykda, PIN ýa-da biometriýa tassyklamasyndan soň hasaplanýar; alnan ýapyk açar saklanmaýar. $k_"ps"$ resminama belgisiniň heşiniň açaryndan aýry açardyr we diňe şahsyýet hyzmatynda durýar. Saýtyň şahsyýeti barlaýjynyň ynam sanawyndaky hemişelik ýazgysy bolan domen adydyr (#{raw("dns_name")}); sertifikatdan alynýan müşderi belgisi ulanylmaýar, sebäbi sertifikat täzelenende ol üýtgeýär we lakamy hem üýtgederdi (ADR-0034). Iki saýtyň açarlary näme üçin garaşsyz? HKDF-iň \[27\] dürli #{raw("info")} bahalary üçin berýän netijeleri tohumy bilmeýän adam üçin biri-biri bilen baglanyşyksyz tötänleýin bahalar ýalydyr; lakamdan ne tohumy, ne-de şahsyýeti yzyna tapyp bolýar. Saýta gidýän zat lakam açary bilen gol çekilen gysga bellik (#{raw("aud")} = saýt, #{raw("nonce")}) we ýatyrylmadyk gapjyk birliginden gelendigini görkezýän täze WIA-dyr.
]

Bu dizaýnyň belli bir gowşaklygy bar we ol ADR-de aç-açan ýazylan: tohum açaryna we bir adamyň şahsyýet belgisine bilelikde eýe bolan adam, meselem şahsyýet hyzmatyny işledýän tarap bir saýt bilen hyzmatdaşlyk edip, şol adamyň şol saýtdaky lakamyny hasaplap biler. Çäreler şulardyr: açaryň pilotda enjam howpsuzlyk moduluna geçirilmegi, giriş ýazgysy, açyklyk hasabatynda açaryň ulanylyşynyň sanalmagy we açaryň geljekde döwlet üpjün edijisine tabşyrylyp bilinmegi. Hemişelik çözgüt nol bilimli subutnama bilen almakdyr. #{emph[Ýagdaý: gözleg.]} Bu gowşaklyga garamazdan täze ýagdaý öňküsinden ep-esli gowudyr: öň her saýt her kimi gabat getirip bilýärdi, indi muny diňe bu iki bölegi bilelikde saklaýan adam edip biler (Surat 24).

#sekil(24, [Lakam alyş agajy: bir tohum, saýtlaryň arasynda baglanyşygy bolmadyk açarlar], "figures/wp-tk/sekil-24.svg", yarim: true)

== Nol bilimli subutnama

Saýlap açmak adama diňe zerur meýdany görkezmäge mümkinçilik berýär, ýöne görkezilen meýdanyň goly ýene-de guramanyň golydyr; gurama bilen barlaýjynyň hyzmatdaşlygy (L3) şu gol arkaly amala aşýar. Nol bilimli subutnama bu soňky kanaly ýapýar: gapjyk "guramanyň gol çeken resminamasynda #{raw("age_over_18")} meýdany dogry" diýen sözlemi resminamany, goly we doglan senesini görkezmezden subut edýär. Tor munuň üçin Longfellow \[56, 57\] ZK ulgamyny saýlady (ADR-0032). BBS maşgalasynyň gollary ret edildi, sebäbi olar guramalardan gol açaryny we formatyny üýtgetmegi talap edýär we ÝB-niň tassyklanan mehanizmler sanawynda ýok. Longfellow guramanyň häzirki ES256 gol çekilen mdoc \[34\] resminamasyna degmeýär, ynamly gurnamany talap etmeýär we ÝB-niň ýaş barlagy profili bilen bagly tehniki spesifikasiýasy (TS13 \[12\]) şol bir ulgama esaslanýar. Toplumlaýyn nusga usuly aýrylmady; subutnama düzüp bolmadyk ýagdaýynda ätiýaç ýol hökmünde dowam edýär.

Iki goşmaça düzgün bu ýoly howpsuz edýär. Barlaýjy diňe sanawlaryň sanawynda çap edilen we işjeň bolan zynjyr heşlerini kabul edýär. ZK hödürlemesinde ýatyrylyş sanawyndaky orun hem açylmaýar, sebäbi açylan bolsa, iki hödürleme ýene biri-birine baglanardy. Ikinji düzgün bir mesele döredýär: ýatyrylan şahsyýet resminamasy ZK bilen görkezilse, barlaýjy muny görüp bilmeýär. ADR-0044 ÝB ARF-iniň \[11\] gysga ömürli resminama ýoluny saýlady: ZK bilen diňe şahsyýet hyzmatynyň aýratyn berýän, iň köp 24 sagat güýjünde bolan we ýatyrylyş sanawyny götermeýän ZK nusgalary görkezilýär. Gapjyk bu nusgalary kiçi bukjalar görnüşinde alýar we adamdan soramazdan täzeleýär; esasy resminama ýatyrylan bolsa täze nusga berilmeýär we ýatyrylyş ZK hödürlemesinde iň giç 24 sagatda güýje girýär. Ýedi günlük nusgalar ret edildi, sebäbi ARF-iň "ýatyrylyş gerek däl" çägi 24 sagatdyr.

#{emph[Ýagdaý:]} barlaýjy tarapy işleýär; gapjyk tarapy meýilleşdirilen. Subutnama düzüji toruň açyk paketidir (#{raw("@tamga-network/zk")}) we gapjyga birikdirildi; Android ýerli kitaphanasy kompilirlendi, iOS kitaphanasy garaşýar we telefonda ölçeg entek edilmedi (FW-ARF-0001 §2.8).

#kutu("teknik", [ZK bilen ýaşy subut etmek])[
Barlaýjy DCQL \[31\] soragynda #{raw("mso_mdoc_zk")} formatyny soraýar. Akymyň esasy çyzgylary (ADR-0032, ADR-0044; SPEC-WALLET-0001 §4.5):

#adimlar((
  ("Barlaýjy → Gapjyk", [#{strong[Haýyş.]} Gol çekilen OpenID4VP haýyşy; DCQL-de #{raw("mso_mdoc_zk")} formaty we ýeke-täk element: #{raw("age_over_18 = true")}.], $"nonce", "aud"$),
  ("Gapjyk", [#{strong[Nusgany saýlamak.]} Güýjündäki ZK nusgasy saýlanýar; nusga ýok bolsa ZK soragy kanagatlandyrylmaýar, adaty wariant teklip edilýär.], $"validUntil" - "validFrom" <= 24 "sa"$),
  ("Gapjyk (howpsuz enjam)", [#{strong[Adaty enjam goly.]} Sessiýanyň ýazgysyna enjam açary bilen adaty usulda gol çekilýär; açar enjamdan çykmaýar.], $sigma_"enjam" = "Sign"(d_"enjam", "SessionTranscript")$),
  ("Gapjyk (subutnama düzüji)", [#{strong[Subutnama.]} Zynjyr sanawdan saýlanýar we onuň baýtlary çap edilen heş bilen deňeşdirilýär; subutnama düzülýär.], $"SHA-256"("shema") = "combined_hash"$),
  ("Gapjyk → Barlaýjy", [#{strong[Jogap.]} Jogapda diňe subutnama bar; resminama, gollar we duzlar gitmeýär.], []),
  ("Barlaýjy", [#{strong[Barlag.]} Zynjyryň heşi sanawdamy we işjeňmi; gurama açary sanawdan; subutnama barlanýar; subutnamanyň baglaýan görnüşi ZK nusgasy bolsa ýatyrylyş barlagy gerek däl.], $"status" = "NOT_APPLICABLE"$),
))

Zynjyryň içinde guramanyň goly, meýdanyň heşi, bahanyň #{raw("true")} bolýandygy, güýjünde bolmak möhleti we enjam goly barlanýar; jikme-jiklikler tapgyryň "Sıfır Bilgi İspatları ve Kimlik" \[69\] makalasynda. ADR-0032-däki iş stoly ölçeginde subutnama takmynan ýarym sekuntda düzüldi, takmynan 343 KB tutdy we sekundyň bäşden birinde barlandy; bu ululyk sebäpli subutnama QR bilen geçirilmeýär. Bir jikme-jiklik shema düzgünine öwrüldi: ulanylýan zynjyr wersiýasy gurama açaryny, resminama görnüşini, meýdan adyny we bahany baglaýar, ýöne at meýdanyny baglamaýar. Şonuň üçin bir resminama görnüşinde şol bir meýdan ady diňe bir at meýdanynda bolup biler we katalog muny kompilirlemede barlaýar (ADR-0032, K8). Şol bir zynjyr deňlik subutnamasydyr, çäk zynjyrda hemişelik däl; şonuň üçin #{raw("age_over_15")} üçin täze zynjyr gerek bolmady (ADR-0064, K4).
]

Surat 25 adaty saýlap açmak bilen nol bilimli hödürlemede barlaýjynyň görýän zatlaryny deňeşdirýär.

#sekil(25, [ZK hödürlemesi: näme gizlenýär, näme görünýär], "figures/wp-tk/sekil-25.svg", yarim: false)

== Umumy ýazgylarda maglumat ýok

Ynam sanawlary, labyr žurnaly, geljekde geljek umumy kitap we hyzmat žurnallary toruň hemmä açyk ýa-da paýlaşylýan ýazgylarydyr. Bu ýazgylaryň hiç birinde şahsy maglumat ýok; resminamanyň mazmuny-da, resminamanyň heşi-de ýazylmaýar (FW-ARF-0001 §1.6, P2 ýörelgesi). Heşi ýazmazlyk bilkastlaýyn saýlawdyr: resminamanyň heşi şahsy maglumat däl ýaly görünýär, ýöne resminamany elinde saklaýan islendik adam ony ýazgyda tapyp, "bu resminama şu pursatda şu amalda ulanyldy" diýen netijä gelip biler. Hyzmatlar IP salgysyny ýazga almaýar; žurnallarda resminama meýdanlarynyň bahalary we ýatyrylyş sanawyndaky orun ýok (FW-ARF-0001 §4.5). Ýatyrylyş sanawlary üýtgeşme bolsa-da, bolmasa-da kesgitli aralyk bilen çap edilýär, şeýlelikde ýatyrylyşyň pursaty syzmaýar (Bölüm 12.4). Ulanyş statistikasy diňe jemlenen we azyndan 50-lik toparlar görnüşinde çap edilýär (FW-TF-0001 §1.7). Barlag netijesiniň obýekti meýdanlaryň bahalaryny däl, diňe atlaryny göterýär we ýatyrylyş ornuny asla götermeýär; şeýlelikde uzak wagtlap saklanýan bu obýektiň yzarlaýyş meýdançasyna öwrülmeginiň öňi alynýar (SPEC-API-0001 §7) (Tablisa 26).

#tablo([#{strong[Tablisa 26.]} Gizlinlik çäreleri, olaryň ýapýan howpy we ýagdaýy.], (35fr, 34fr, 19fr, 19fr), ([Çäre], [Ýapýan howpy], [Karar ýa-da düzgün], [Ýagdaý],), (
  ([Saýlap açmak, ýaş çäkleri], [artykmaç maglumat], [ADR-0006, ADR-0064], [işleýär],),
  ([Barlaýjy başyna aýry açarly nusga], [barlaýjylaryň arasynda gabat getirmek], [SPEC-PROTO-0001 §8], [işleýär],),
  ([Sagada çenli tegeleklenen wagt], [wagt belligi arkaly gabat getirmek], [issuer paketi], [işleýär],),
  ([Amal başyna täze WIA açary], [gapjyk tassyklamasy arkaly gabat getirmek], [ADR-0025], [işleýär],),
  ([Saýt başyna lakam], [saýtlaryň arasynda hasaplary gabat getirmek], [ADR-0031, ADR-0061], [işleýär],),
  ([Tötänleýin ýatyrylyş orny, toplumlaýyn öňünden alyş, kesgitli aralykly çap], [ýatyrylyş sanawy arkaly yzarlamak], [SPEC-CRED-0003], [işleýär],),
  ([Nol bilimli subutnama we gysga ömürli nusga], [gurama bilen barlaýjynyň hyzmatdaşlygy (L3)], [ADR-0032, ADR-0044], [barlaýjy tarapy işleýär, gapjyk tarapy meýilleşdirilen],),
  ([Umumy ýazgylarda şahsy maglumat we heş ýok, IP ýazgysy ýok], [umumy ýazgydan netije çykarmak], [FW-ARF-0001 §1.6, §4.5], [işleýär],),
  ([Üpjün edijiniň diňe şahsyýet hyzmaty bilen gürleşmegi], [üpjün edijiniň adamy guramalaryň arasynda yzarlamagy], [SPEC-ID-0003 §8], [işleýär],),
  ([ZK bilen lakamy almak], [şahsyýet hyzmatynyň nazary alşy], [ADR-0031, E wariant], [gözleg],),
))

== Hukuk çarçuwasy

Toruň gizlinlik düzgünleri tehniki bolşy ýaly hukuky hem. Türkiýede esas 6698 belgili Şahsy Maglumatlary Goramak Kanunydyr \[9\]; ÝB bilen gatnaşykda Maglumatlary Goramagyň Umumy Düzgünnamasy \[8\] (GDPR) kesgitleýjidir. Trust Framework rollary şeýle paýlaýar (FW-TF-0001 §3.6): resminama beriji gurama we ygtyýarly çeşme öz maglumatlarynyň maglumat jogapkäridir; tor özi ýerleşdirýän resminama beriş hyzmatynda şertnama boýunça maglumat işleýji, şahsyýet hyzmatynda bolsa maglumat jogapkäridir; gapjyk üpjün edijisi enjamdaky maglumata girip bilmeýär; barlaýjy alan meýdanlary üçin jogapkärdir. Adamyň hukuklary gapjykda anyk görnüşe girýär: görkeziş taryhy enjamda saklanýar, maglumatlary goramak edarasyna arz etmegiň ýoly gapjykda görünýär we razylygy yzyna almak resminamany ýatyrmagy aňladýar. Şahsyýet barlagyndan öň maglumat berilýär we aç-açan razylyk alynýar.

Çarçuwa şertnama goşundylary bilen bilelikde pilotdan öň Şahsy Maglumatlary Goramak Kanuny we 5070 belgili Elektron Gol Kanuny boýunça hukuk derňewinden geçýär (FW-TF-0001 §1.4). Bu bölümdäki rollaryň paýlanyşy toruň öz düzgünleriniň jemlemesidir; hukuk pikiri däl. Kiçi ýaşlylar üçin ene-atanyň razylygy akymy açyk meseledir: tor ýaş çägini goýmaýar (ADR-0043), GDPR-yň 8-nji maddasy razylyga esaslanýan hyzmatda kiçi ýaşlylar üçin ene-atanyň razylygyny talap edýär we munuň tordaky gabatlygy hukuk derňewinden soň aýratyn karar bilen seredilip geçiler.

== Galýan gizlinlik töwekgelçilikleri

Häzir üç töwekgelçilik aç-açan galýar. Birinjisi L3: şol bir guramanyň resminamalary dürli barlaýjylarda birleşdirilse, adam gabat getirilip bilner; nol bilimli subutnama gapjyklara ýetdigiçe bu töwekgelçilik aýrylýar. Ikinjisi lakam almagyň belli gowşaklygydyr; ol açar goragy we açyklyk bilen çäklendirilýär, hemişelik çözgüdi gözleg tapgyrynda. Üçünjisi gysga ömürli ZK nusgalarynyň täzeleniş ýygylygydyr: şahsyýet hyzmaty gapjygyň işjeňdigini takmynan günde bir gezek bolýan täzelemeden öwrenip biler; haýsy barlaýja näme görkezilendigini öwrenmeýär. Tötänleýin gijikme we adamyň öçürip bilýän awtomatik täzeleme sazlamasy muny azaldýar (ADR-0044, Netijeler). Bu töwekgelçilikler Bölüm 23-däki galyndy töwekgelçilikler tablisasynda aýrylmagynyň şertleri bilen bilelikde jemlenýär.

= Howpsuzlyk Modeli we Howplar

Nurlan bir konsert gapysynyň öňünde nobatda dur. Telefonyndaky bilet geçiş kartasyna öwrülipdir, ekranda 60 sekuntlyk QR kody dur. Onuň yzyndaky biri ekranyň suratyny alýar. Bu surat bilen näme edip bolar? Howpsuzlyk modeli takyk şu hili soraglary öňünden bermek diýmekdir: nämäni goraýarys, kime ynanýarys, kim näme synanyşyp biler we synanyşsa näme bolar? Bu bölüm toruň bu soraglara berýän jogabyny bir ýerde jemleýär.

== Baýlyklar we ynam çaklamalary

Goralmaly açarlaryň her biriniň aýry ýeri we şerti bar (FW-TF-0001 §2.3). Kök sertifikat onlaýn däl dabarada, iki adam we hasabat bilen döredilýär. Sanaw gol açary düzgün boýunça azyndan iki süýşýän sertifikat bilen, enjam taýdan goralýan gurşawda saklanýar; SECURITY.md-ä \[66\] görä häzir sanaw ýeke gol açary bilen çap edilýär we ikinji açar pilotdan öň goşular. Resminama berijiniň gol açary guramanyň gözegçiliginde; hakyky tor faýldan okalýan gurama açaryny kabul etmeýär (ADR-0057). Resminama eýesiniň açary enjamyň howpsuz zolagynda döredilýär, eksport edilip bilinmeýär we dikeldiş tohumyndan alynmaýar. Şahsyýet hyzmatynda resminama gol açary, resminama belgisiniň heşiniň açary we lakam tohumynyň açary biri-birinden aýrydyr.

Gapjyklar we barlaýjylar ýeke-täk zada ynanýar: sanawlaryň sanawyna gol çekýän köke. Sanaw serwerine, baglanyşyga ýa-da domen adyna ynanylmaýar; gol, wersiýa zynjyry we täzelik barlanmazdan hiç bir ýazgy ulanylmaýar (FW-ARF-0001 §4.5). Resminama berijä diňe öz resminamalary üçin, şahsyýet barlagy üpjün edijisine diňe şahsyýet barlagynyň karary üçin ynanylýar we ol karar her gezek täzeden tassyklanýar (Surat 26).

#sekil(26, [Ynam serhetleri we serhetlerden geçýän subutnamalar], "figures/wp-tk/sekil-26.svg", yarim: false)

#kutu("onemli", [Häzir ynamyň ýeke-täk labyry])[
Häzir ynamyň labyry ýeke-täk operatoryň golydyr (galyndy töwekgelçilik L1; FW-ARF-0001 §6.6). Operator bilen resminama beriji bilelikde hereket etse, sanawda gapma-garşylykly ýazgy çap edilip bilner. Hemmä açyk labyr žurnaly yza aýlamagy görünýän edýär, açyklyk hasabaty we barlag muňa päsgel berýär, ýöne olaryň hiç biri ony mümkin däl etmeýär. Bu çäk diňe birnäçe garaşsyz gol çekiji we umumy kitap bilen aýrylýar (Bölüm 19).
]

== Hüjümçi modelleri

Model sekiz hüjümçä aýry-aýrylykda seredýär: ýasama resminama döredýän, telefony ogurlaýan, programmany göçürýän, gerekdekinden köp soraýan ýa-da maglumaty başgalar bilen birleşdirýän barlaýjy, QR koduny gizlin synlaýan, sanawy yza aýlaýan, operator bilen bilelikde hereket edýän gurama we şahsyýet barlagynda ýasama ýüz ýa-da resminama ulanýan. Olaryň her biriniň elindäki mümkinçilik başga; Tablisa 27 olaryň her biri üçin çäräni we galyndy töwekgelçiligi berýär.

== Howplar tablisasy

#tablo([#{strong[Tablisa 27.]} Howp modeli: howp, çäre, esas we galyndy töwekgelçilik.], (31fr, 48fr, 20fr, 44fr), ([Howp], [Çäre], [Esas], [Galyndy töwekgelçilik],), (
  ([Ýasama guramanyň adyndan resminama], [guramanyň şahsyýeti #{raw("iss")} meýdanyndan däl, X.509 sertifikatdan alynýar; görnüş ygtyýaryny (C2) hiç bir sazlama bilen geçip bolmaýar], [ADR-0004; SPEC-API-0001 §7], [gurama açarynyň ogurlanmagy; waka prosesi we ýatyrylyş],),
  ([Resminamanyň başga gapjyga geçirilmegi], [enjam baglanyşygy kadadan çykmasyz hökmany; her hödürleme enjam açary bilen gol talap edýär], [ADR-0006], [ýok diýen ýaly; açar eksport edilip bilinmeýär],),
  ([Telefonyň ogurlanmagy], [her hödürlemede PIN ýa-da biometriýa; hasapsyz, ýatyrylyş syry bilen gapjyk birligini ýatyrmak; ýatyrylyşy gapjykdan daşarda öwrenip bolýar], [ADR-0047], [telefon we gulp maglumaty bilelikde bolanda, tora birikmeýän telefonda möhleti dolmadyk gurama resminamasy],),
  ([Ýasama ýa-da göçürilen gapjyk], [sanawdaky üpjün edijiniň WIA we KA-sy; programma açarly gapjyga resminama ýok; enjam tassyklamasy iň ýokary derejede hökmany], [ADR-0025, ADR-0047], [enjam açary we enjam tassyklamasy meýilleşdirilen; enjamda heniz synalmady],),
  ([Artykmaç talap edýän barlaýjy], [gol çekilen haýyş, hasaba alyş sertifikaty, çäk barlagy, adama duýduryş; sertifikatsyz haýyş ret edilýär], [ADR-0026, ADR-0056], [soňky karar adamda; duýduryşy geçip biler],),
  ([Hyzmatdaşlyk edýän barlaýjylar], [aýry nusga, tegeleklenen wagt, lakam, ZK], [ADR-0031, ADR-0032], [L3, ZK gapjyklara ýetýänçä],),
  ([Gaýtadan oýnamak], [#{raw("nonce")}, #{raw("aud")}, KB-JWT, DPoP, bir gezeklik kod], [SPEC-PROTO-0001; SPEC-PROTO-0002], [ýok diýen ýaly],),
  ([QR-y gören adamyň ýasama reti], [haýyşyň her alnyşy täze #{raw("state")}, #{raw("nonce")} we şifrleme açary bilen aýry şaha; ret diňe öz şahasyny ýapýar], [ADR-0067], [ýok diýen ýaly; hüjümçi diňe öz şahasyny ýapýar],),
  ([QR-y gören adamyň bileti sarp etmegi], [gapy özüni terminal açary bilen tanadýar; açarsyz haýyş žetona degmeýär; gapy toparlary sanawda], [ADR-0065, ADR-0069], [terminal açarynyň syzmagy; ýatyrylýar; sertifikatly gapy meýilleşdirilen],),
  ([Sanawy yza aýlamak], [wersiýa zynjyry, öňki wersiýanyň heşi, labyr žurnaly; yza aýlamakdan gorag deslapky ýagdaýda açyk], [SPEC-TRUST-0001; ADR-0056], [ýeke gol çekiji (L1)],),
  ([Operator bilen guramanyň hyzmatdaşlygy], [hemmä açyk üýtgeşme we labyr žurnaly, açyklyk hasabaty], [FW-ARF-0001 §6.6], [L1; umumy kitap bilen aýrylýar],),
  ([Ýerleşdirilen hyzmatda gurama açary], [uzakdan gol: hyzmata diňe heş gidýär, gol ýerli barlanýar; hakyky tor faýldaky gurama açaryny ret edýär], [ADR-0057], [meýilleşdirilen; hakyky torda ulanýan gurama ýok],),
  ([Ýatyrylan şahsyýet bilen ZK hödürlemesi], [diňe gysga ömürli ZK nusgasy; esasy resminama ýatyrylan bolsa täze nusga ýok], [ADR-0044], [ýatyrylyş iň giç 24 sagatda güýje girýär],),
  ([Ýasama ýüz ýa-da resminama bilen şahsyýet barlagy], [janlylyk we ýüz deňeşdirmesi; resminamada portret ýok; T3 uzakdan ýüz bilen berilmeýär], [SPEC-ID-0003 §1, §8], [üpjün edijiniň ýüze çykaryş ukybyna bagly],),
  ([Integratoryň barlagy ýalňyşlyk bilen öçürmegi], [howpsuz deslapky ýagdaýlar; geçmek üçin aç-açan #{raw("\"none\"")} bahasy], [ADR-0056], [bilkastlaýyn geçilen barlag],),
))

Gapy hüjümi bir hüjümiň nähili ýüze çykarylyp ýapylandygyny gowy görkezýär (Surat 27). Gapy geçiş žetonyny barlag hyzmatyna iberýärdi we hyzmat gapynyň kimdigini soramaýardy. Suraty alan adam žetony ilki özi iberip, bir gezeklik bileti sarp edip bilerdi, Nurlan gapa gelende bilet "ulanylan" görünerdi. Indi gapy operatoryň şol gapy topary üçin beren terminal açary bilen özüni tanadýar; açarsyz haýyş žetona asla degmeýär (ADR-0065). Gapy toparlary ynam sanawynda çap edilýär we her topar gapylary işledýän guramany atlandyrýar; gurama diňe öz gapylarynyň açarlaryny görýär we ýatyrýar (ADR-0069). Ýasama ret hüjümi şol bir maşgaladan we Bölüm 10.5-de düşündirilýär. #{emph[Ýagdaý: işleýär.]}

#sekil(27, [Bileti ýasama sarp etmek hüjümi: terminal açaryndan öň we soň], "figures/wp-tk/sekil-27.svg", yarim: false)

== Howpsuz deslapky ýagdaýlar

Kitaphananyň howpsuzlygy ony ulanýan işläp düzüji iň aňsat ýoly saýlanda näme bolýandygyna bagly. Paketleriň 0.7.0 wersiýasynda bu ýörelge karara öwrüldi (ADR-0056): ynam labyry, gaýdyş salgysynyň rugsat sanawy, ýatyrylyş soragy we barlaýjynyň ýazgysy hökmany girişler boldy. Barlagy geçmek henizem mümkin, ýöne diňe aç-açan #{raw("\"none\"")} ýazmak bilen; ýatdan çykaryp geçip bolmaýar. Şol karar hasaba alyş sertifikatyny götermeýän haýyşlary, ÝB-niň has uzyn geçiş döwrüni ykrar etmegine garamazdan, şu günden ret etdi; enjam açary bolmadyk mdoc-y \[34\] güýjünde däl hasaplady; ynam sanawyny yza aýlamakdan goragy deslapky ýagdaýda açdy. Seredilen alternatiwa ýumşak deslapky ýagdaýlary saklap, duýduryş döwri bilen geçmekdi; ol ret edildi. Paketleriň 0.8.0 wersiýasynda şol ýörelge bir ädim öňe gitdi: barlaýjy paketi indi haýyşyň her alnyşy üçin aýry şaha açmagy deslapky ýagdaý edýär we umumy haýyş obýektini döretmeýär (CHANGELOG 0.8.0). #{emph[Ýagdaý: işleýär.]}

== Laýyklyk we synag

Toruň häzirki laýyklyk tertibi "ýeňil laýyklykdyr" (FW-TF-0001 §2.4, §4.3). Hemmä açyk laýyklyk synag wektorlary doňdurylan girişleri we garaşylýan çykyşlary göterýär; otrisatel ýagdaýlaryň her biri (enjam baglanyşygynyň subutnamasy ýok, nädogry #{raw("nonce")}, möhleti geçen resminama…) ret edilmeli. Borçnama synaglary azyndan üç zady talap edýär: köne sanaw "barlap bolmady" netijesini berýär, näbelli formatda amal togtaýar, gol säwliginde amal togtaýar. #{raw("INDETERMINATE")} garaşylýan ýerinde #{raw("REJECTED")} gaýtarýan programma laýyk däl hasaplanýar (GUIDE-0009).

2026-njy ýylyň oktýabrynda şahsyýet hyzmaty we Tamga Verify OpenID Foundation-yň laýyklyk synag meýilnamalary \[33\] bilen sandbox-da öz-synagdan geçirildi; onuň gerimi we netijeleri Bölüm 20.5-de. Bu öz-synagdy, sertifikat aýratyn prosesdir. Bu işden ýigrimiye golaý üýtgeşme çykdy we dördüsi öňki kararlary ýazga alnan ADR-ler bilen üýtgetdi (meselem, ADR-0061 we ADR-0062).

Tor şu wagta çenli öz howpsuzlyk derňewlerini geçirdi; gapy boşlugy 2026-njy ýylyň oktýabryndaky howpsuzlyk tapgyrynda şu ýol bilen tapyldy we ýapyldy. SECURITY.md-de görkezilişi ýaly, tor heniz garaşsyz daşky barlagdan geçmedi; daşky derňew üçin geriminiň, howp modeliniň, maglumat akymlarynyň, üýtgewsiz düzgünler katalogynyň we synag netijeleriniň girýän bukjasy ammarda taýýar saklanýar. Paketlerde gurnamadan soňky skript ýok; dokuz paketiň sekizisi diňe üznüksiz integrasiýadan, gelip çykyş subutnamasy bilen çap edilýär, subutnama düzüji paket bolsa telefon kitaphanalary heniz şol ýerde kompilirlenip bilinmeýändigi üçin el bilen çap edilýär.

== Waka jogap bermek we jogapkärli habar bermek

Trust Framework wakalary möhümligine görä toparlara bölýär (FW-TF-0001 §4.6). Ynamyň özüni howp astyna salýan wakalar (resminama berijiniň gol açarynyň syzmagy, sanaw açaryndan şübhe, gapjyk çözgüdinde boşluk) iň giç 4 sagatda, bir hyzmata ýa-da gatnaşyja täsir edýänler iň giç 24 sagatda habar berilýär. Açary syzan resminama beriji togtadylýar, onuň sertifikaty we täsir eden resminamalar ýatyrylýar; sanaw açaryndan şübhe edilende süýşýän ikinji sertifikata geçilýär. Şahsy maglumatlaryň bozulmagy KVKK-a \[9\] 72 sagadyň dowamynda habar berilýär. Düzgünleri bozýan gatnaşyjy üçin duýduryşdan çykarmaga çenli uzaýan temmi basgançaklary bar we çykarmak köne resminamalary güýjünden düşürmeýär (Bölüm 18.6).

Howpsuzlyk boşluklary #{raw("security@tamga.network")} salgysyna habar berilýär; tor 72 sagadyň dowamynda jogap berýär we 90 günlük utgaşdyrylan aýan ediş penjiresini ulanýar. Sanawdaky gapjyklar bu çägiň daşynda we öz operatorlaryna habar berilýär (SECURITY.md). Şol resminama bilkastlaýyn kabul edilen çäkleri hem sanaýar; olaryň täsirini görkezýän tapyndy hem hoşallyk bilen kabul edilýär.

= Sandbox, Açyk Paketler we Salgylanma Hyzmatlary

Elif Mysal uniwersitetiniň talyplar bölüminde işleýär we diplomlarynyň gapjykda nähili görünjekdigini, iş berijiniň näme görjekdigini bilesi gelýär. Dilnoza bolsa saýtyna "Tamga bilen gir" düwmesini goşmak isleýär. Ikisi hem hakyky adamyň maglumatyna degmezden, hakyky tory hapalamazdan we hiç kimden rugsada garaşmazdan synap görmek isleýär. Toruň näderejede açykdygy oňa goşulmak isleýän adamyň ilkinji synagy näçe aňsat edip bilýändigi bilen ölçelýär. Bu bölüm şol ilkinji ädimiň gurallaryny düşündirýär.

== Sandbox

Sandbox hakyky tordan doly aýry synag torudyr (ADR-0038). Onuň hyzmatlary hakyky tordaky bilen şol bir koddur we salgy tertibini #{raw("sandbox")} goşmaça ady bilen gaýtalaýar; gapjyk ýa-da barlaýjy diňe salgylary we ynam labyryny üýtgedip geçýär. Onuň öz synag köki, öz açarlary we özüni aç-açan synag hökmünde belleýän sanawlary bar. Hakyky toruň köki sandbox-da hiç zada gol çekmeýär, sandbox köki hakyky toruň hiç bir sanawynda ýok we hakyky tor üçin konfigurirlenen programma sandbox sanawyny kabul etmeýär. Maglumatlar her gije ilkinji ýagdaýyna gaýdýar. Diňe ýerli işläp düzmek gurşawy (telefon we beýleki serwerler girip bilmeýär) we hakyky torda synag guramalary (synag resminamalary hakyky barlaýjylarda güýjünde bolardy) wariantlary ret edildi.

Sandbox-da nusga guramalar, dürli ýurtlardan we dürli ýagdaýlarda on üç ýasama adam we her görnüşden nusga resminamalar bar. Käbir adamlar otrisatel netijeleri synamak üçin taýýarlanan: diplomy berlen badyna ýatyrylan, togtadylan, 17 ýaşly, hiç bir guramada ýazgysy bolmadyk. Nusga adamlaryň şahsyýet belgileri bilkastlaýyn nädogry görnüşde (GUIDE-0013). Şahsyýet barlagy deslapky ýagdaýda ýasama üpjün ediji bilen edilýär. Hakyky şahsyýet barlagynyň ädimlerini görmek isleýänler üçin aýry hakyky ýol hem bar (ADR-0040); bu ýol çäkli we ýokarky çäkli. Adam skanirlemezden öň aç-açan synag gurşawy duýduryşyny tassyklaýar, resminama diňe ady, familiýasy we doglan senesi geçýär, şahsyýet we resminama belgisiniň ýerine tötänleýin we aç-açan synagdygy belli bolan baha ýazylýar; şeýlelikde sandbox resminamasy hakyky tordaky resminamalar we lakamlar bilen baglanyp bilinmeýär. Bu ýol hakyky toruň üpjün ediji hasabyny paýlaşýar; munuň getirýän töwekgelçilikleri we olary azaltmak ADR-0040-da ýazylan.

Guramalar sandbox-da öz synag guramalaryny hem açyp bilýär (ADR-0041). Elif oýlanyp tapylan gurama adyny we görnüşini ýazýar; e-poçta, telefon ýa-da adam ady soralmaýar. Gurama sandbox sanawyna "synag guramasy" belligi bilen derrew goşulýar; Elif sandbox-daky Gurama konsolyna passkey bilen girýär, oýlanyp tapylan ýazgylaryny ýükleýär we stolda resminama berýär. Şahsyýet belgisiniň barlag düzgüninden geçýän san göterýän ýazgy ret edilýär, sebäbi ol hakyky adama degişli bolup biler. Synag guramalarynyň sertifikatlaryny göni sandbox köki bermeýär; köküň gol çeken we diňe bir dereje aşak sertifikat berip bilýän aýry aralyk sertifikat edarasy berýär. Köküň ýapyk açary hiç bir serwerde durmaýar; aralyk edara ele salnan ýagdaýynda diňe ol ýatyrylyp, täzesine gol çekilýär. Gapjyk işläp düzüjileri öz gapjyk üpjün edijilerini sandbox sanawyna häzir taslama dolandyryşyna ýüz tutup hasaba aldyrýar; tor sandbox-da-da gapjyk üpjün edijisini işletmeýär (ADR-0042). #{emph[Ýagdaý: işleýär.]} Tablisa 28 sandbox-y hakyky tor bilen deňeşdirýär.

#tablo([#{strong[Tablisa 28.]} Sandbox we hakyky tor.], (13fr, 26fr, 36fr), ([Mesele], [Hakyky tor], [Sandbox],), (
  ([Ynam köki we sanawlar], [hakyky kök, #{raw("trust.tamga.network")}], [aýry synag köki, #{raw("trust.sandbox.tamga.network")}, sanawda synag belligi],),
  ([Adamlar], [hakyky adamlar], [ýasama adamlar; islege bagly, ýokarky çäkli hakyky şahsyýet ýoly],),
  ([Şahsyýet barlagy], [uzakdan şahsyýet barlagy üpjün edijisi], [deslapky ýasama üpjün ediji],),
  ([Guramalar], [gatnaşyk derwezelerinden geçen guramalar], [nusga guramalar we özbaşdak açylýan synag guramalary],),
  ([Hemişelik saklanyş], [ýazgy pozulmaýar, üýtgeşme žurnala goşulýar], [her gije nola getirilýär],),
  ([Gapy açarlary], [operator berýär], [synag açarlary hemmä açyk],),
  ([Özara ynam], [sandbox-a ynanmaýar], [hakyky tora garyşmaýar],),
))

== Dokuz paket

Toruň düzgünleri diňe resminamalarda durmaýar; olar kod görnüşinde hem ýaýradylýar. #{raw("@tamga-network/*")} ady bilen dokuz açyk çeşmeli paket bar. Koduň ygtyýarnamasy Apache-2.0, resminamalaryňky CC BY 4.0. Paketler npm-de 0.8.2 synag wersiýasy bilen çap edildi; durnukly 1.0.0 wersiýasyna çenli interfeýsler üýtgäp biler (README) (Tablisa 29).

#tablo([#{strong[Tablisa 29.]} Açyk paketler.], (48fr, 48fr, 29fr), ([Paket​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​], [Wezipesi], [Platforma belligi],), (
  ([#{raw("@tamga-network/core")}], [heşler, belgiler, sertifikat kömekçileri, ÝB PID atlar tablisasy], [React Native üçin aýry goşmaça ýollar],),
  ([#{raw("@tamga-network/trust")}], [gol çekilen sanawlary ýükleýär we barlaýar; ýeke-täk okaýyş interfeýsi #{raw("TrustSource")}], [#{raw("/core")} platforma bagly däl, React Native hem goşulyp],),
  ([#{raw("@tamga-network/schemas")}], [resminama görnüşleriniň katalogy: Type Metadata, JSON Schema, bitewilik heşleri], [her ýerde, React Native hem goşulyp],),
  ([#{raw("@tamga-network/sd-jwt")}], [SD-JWT VC: saýlap açmak, enjam baglanyşygy, ýatyrylyş sanawy], [],),
  ([#{raw("@tamga-network/mdoc")}], [ISO\/IEC 18013-5 mdoc: CBOR, COSE, bermek we barlamak], [arassa TypeScript, React Native bilen laýyk],),
  ([#{raw("@tamga-network/issuer")}], [resminama bermek (OpenID4VCI) we ýatyrylyş sanawyny çap etmek; ýerleşdirilen hyzmatyň müşderisi], [serwer],),
  ([#{raw("@tamga-network/verifier")}], [barlag hatary we OpenID4VP; sahypa toplumy; ZK barlagy], [serwer; #{raw("/web")} sahypa toplumy],),
  ([#{raw("@tamga-network/wallet-core")}], [gapjyk ýadrosy: açarlar, resminama almak, ýerli barlaglar, görkezmek], [Node we React Native],),
  ([#{raw("@tamga-network/zk")}], [mdoc üçin gapjyk tarapyndaky nol bilimli subutnama düzüji], [ýadro her ýerde; telefonda ýerli subutnama düzüji],),
))

Paketleriň iň möhüm dizaýn karary ýeke-täk ynam interfeýsidir (ADR-0015). Gapjyk hem goşulyp, her müşderi ynam soraglaryny şol bir interfeýsden soraýar; şeýlelikde şol bir düzgün iki gezek, iki dürli görnüşde ýazylmaýar. Interfeýsiň aňyrsynda häzir gol çekilen sanawlar dur; umumy kitap gelende ol interfeýs üýtgemezden onuň aňyrsyna girýär (Bölüm 6.6 we 19.8). Gapjyk React Native-de işleýändigi üçin barlag ýadrosy faýl ulgamyna we platforma mahsus kitaphanalara bagly bolmadyk goşmaça ýola bölündi.

#kod("typescript", "import { fetchTrustSource } from \"@tamga-network/wallet-core\";
import { verifyPresentation } from \"@tamga-network/verifier\";

// Güven çapası: uygulamaya gömülü kök parmak izleri; liste sunucusuna güvenilmez
const { source: trust } = await fetchTrustSource(\"https://trust.sandbox.tamga.network\", http, {
  pins: { lotlSigners: [SANDBOX_LOTL_SIGNER_FINGERPRINT], environment: \"sandbox\" },
});

// Cüzdandan gelen şifreli yanıt çözüldükten sonra (istek dalı ve state denetimiyle)
const { result, claims } = await verifyPresentation({
  presentation, aud: clientId, nonce: branch.nonce, policy, policyCredentialId: \"diploma\",
  trust, statusCache, rootCertsDer,
  rp: trust.relyingParty(clientId),   // kayıt zorunlu; bilerek atlamak için \"none\"
  audit: (entry) => log(entry),       // denetim kaydı
});
// result.outcome: \"ACCEPTED\", \"REJECTED\" ya da \"INDETERMINATE\"", baslik: "Mysal: hödürlemäni öz serweriňizde barlamak (gysgaldylan, 0.8.2 synag wersiýasy)")

Mysal gysgaldyldy we bahalar mysal üçin; haýyşyň her alnyşy üçin aýry şaha açýan doly akym üznüksiz integrasiýada hakyky paketlere garşy işleýän nusga taslamalarda (#{raw("examples/02-verify-own-server")}). Öz barlaýjysyny ýazmak islemeýän adam ýerleşdirilen Tamga Verify-ny ulanyp biler.

== Salgylanma hyzmatlary

Tor dört salgylanma hyzmatyny işledýär (ADR-0037): ýerleşdirilen resminama beriş hyzmaty, Gurama konsoly, Tamga Verify we şahsyýet hyzmaty. Bular toruň işläp bilmegi, synalyp bilinmegi we guramalaryň goşulyp bilmegi üçindir; satylmaýar we hemmä deň şertlerde açyk. Daşky gurama ýerleşdirilen resminama beriş hyzmatyna öz serwerinden, kireýçä bagly we ygtyýar çägi kesgitlenen API arkaly girýär; ýeke-täk paýlaşylýan administrator açary ret edildi (ADR-0016). Gurama konsoly işgärleriň çakylyk bilen hasap açyp, passkey bilen girýän we resminamalary, ýatyrylyşy we togtatmany, hasaba alyş kitabyny dolandyrýan ýeke-täk ýeridir; köne uçurym portaly aýryldy, sebäbi adam resminamany indi gapjykdan soraýar (ADR-0019). Tamga Verify-da netijä we açylan meýdanlara diňe hödürlemäni açan barlaýjy, sanawdaky açary bilen gol çekilen gysga ömürli beýan arkaly we diňe bir gezek girip bilýär (ADR-0017).

Her hyzmat üçin şol bir sözlem dogry: öz programmaňyzy şol bir düzgünler bilen gurup bilersiňiz (FW-ARF-0001 §4.1). Gurama öz resminama beriş hyzmatyny, barlaýjy öz barlag programmasyny işledip biler; toruň hyzmatyny ulanmak şert däl (Surat 28).

#sekil(28, [Işläp düzüjiniň ýoly: sandbox-dan hakyky tora], "figures/wp-tk/sekil-28.svg", yarim: false)

== Resminamalaryň üç derwezesi

Toruň daşyna gönükdirilen resminamalary ÝB-däki tertibe meňzeş görnüşde üç aýry derwezeden çap edilýär (ADR-0018). Umumy beýan tamga.network-da; işläp düzüji resminamalary, gollanmalar, spesifikasiýalar we karar ýazgylary docs.tamga.network-da; arhitektura we salgylanma çarçuwasy (Tamga ARF) bilen onuň goşundylary arf.tamga.network-da. Okyjy özüne görä derwezäni saýlaýar: gurama ýolbaşçysy düşünjelerden, işläp düzüji gollanmadan, düzgünleşdiriji çarçuwadan başlaýar. Tamga ARF türk we iňlis dillerinde çap edilýär; türkçe tekst çeşmedir, iňlisçe tekst şol bir wersiýanyň resmi terjimesidir we iki diliň arasyndaky wersiýa süýşmesi kompilirlemede tutulýar. Bu resminamada berlen ADR, SPEC we FW belgileriniň hemmesini bu derwezelerden hemmä açyk görnüşde tapyp bolýar.

= Dolandyryş we Özygtyýarlylyk

Bu tora iki döwletiň goşulandygyny göz öňüne getireliň. Birinjisi öz ýurdundaky bir hünär guramasyny resminama beriji hökmünde sanawa goşmak isleýär. Ikinji döwletiň sesine garaşmak gerekmi? Gerek bolsa, hiç bir döwlet şeýle tora girmez; ol öz içki kararlaryny başganyň tassyklamagyna bagly eden bolardy. Gerek bolmasa, toruň umumy tarapy galarmy? Bu bölüm Tamga Network-iň bu iki uçuň arasynda saýlan ýoluny, häzir kimiň nämäni karar edýändigini we bu tertibiň nähili el çalyşjakdygyny düşündirýär.

Ilki häzirki ýagdaý. Sanawlarda häzir diňe Türkiýe bölümi işjeň. Türki Döwletleriň Guramasynyň (TDG) agzalary Azerbaýjan, Gazagystan, Gyrgyzystan we Özbegistan hem-de synçylar Wengriýa we Türkmenistan üçin orun goýuldy (FW-TF-0001 §1.3). Bu orunlar boş ýerlerdir; hiç bir döwlet bilen ylalaşyk ýa-da gepleşik barada habarnama däldir. Aşakda "döwletiň goşulmagynda" diýlip düşündirilýän ähli zat, şol gün gelse, işleýän düzgünlerdir.

== Üç gatlakly özygtyýarlylyk

Ýewropa Bileleşigi bu soraga öz ynam sanawlary bilen jogap berdi: her agza döwlet öz sanawyny garaşsyz çap edýär, Komissiýa diňe bu sanawlary jemleýän sanawlaryň sanawyny saklaýar we hiç bir döwlet başga döwletiň haýsy guramany sanawa goşjakdygyna ses bermeýär. Tamga Network bu öňki mysala eýerýär we dolandyryşy her birinde karar başga bir tarapda bolan üç gatlaga bölýär (ADR-0002; Surat 29).

#{strong[Tora agzalyk.]} Stoluň başynda haýsy döwletiň oturýandygy umumy karardyr. Täze döwleti kabul etmek, döwleti çykarmak we umumy protokoly ýokarlandyrmak agza döwletleriň üçden iki sesi bilen bolýar. Agzybirlik bilkastlaýyn saýlanmady; ol ýeke döwletiň toruň ösüşini gulplap bilmegini aňladýardy.

#{strong[Milli ýazgylar.]} Döwletiň resminama berijileri, barlaýjylary we kök sertifikatlary diňe şol döwletiň ygtyýaryndadyr; daşky ses ýok. Ýörelge FW-ARF-0001 §1.6-da P1 hökmünde ýazylan: her döwlet öz milli ýazgylarynyň ýeke-täk ýazyjysydyr. Sanaw tapgyrynda bu düzgün gol bilen goralýar: milli sanaw diňe şol ýazgynyň gol açary bilen gol çekilýär. Kitap tapgyrynda şol düzgün kitabyň özünde berk talap edilýär we hoşniýetli söz bolmakdan çykýar (ADR-0002 2-nji goşmaça karar; ADR-0054 K2).

#{strong[Serhetaşa ykrar.]} "X ýurdunyň resminamalaryny kabul edýärinmi?" diýen soraga her döwlet öz adyndan we birtaraplaýyn jogap berýär. ADR-0002-niň başlangyç tertibine görä esaslandyryjy agzalar biri-birini başdan ykrar edýär, soň goşulan döwlet ykrary öz kanunçylygynyň tizliginde özi açýar. Şeýlelikde "ýa hemmesi, ýa hiç biri" duzagyna düşülmeýär.

Bu gatlaklaryň üstünde iki kepillik bar. Döwlet ses gerek bolmazdan, birtaraplaýyn #{strong[tordan çykyp biler]}. Döwletiň #{strong[çykarylmagy hem onuň raýatlarynyň resminamalaryny güýjünden düşürmeýär]}: çykarylan döwlet täze ýazgy ýazyp bilmeýär, ýöne gapjyklardaky resminamalar galýar we olara näme boljakdygy beýleki döwletleriň ykrar kararyna bagly (ADR-0002 4–5-nji goşmaça kararlar; FW-TF-0001 §3.3). Döwletiň tora girende berjek ilkinji soragy şudur: "Bir gün çyksam, raýatlarym nämäni ýitirer?"

#sekil(29, [Özygtyýarlylygyň üç gatlagy: kim karar berýär?], "figures/wp-tk/sekil-29.svg", yarim: false)

#kutu("teknik", [Ses bermegiň düzgünleri])[
$n$ karar pursatyndaky işjeň agzalaryň sany, $e$ "hawa" sesleriniň sany bolsun. Çägi bitin sanlar bilen ýazmak tegeleklemek soragyny aýyrýar:

#formul[$ "kabul" &<==> 3 dot e >= 2 dot n \
"çykarmak": quad n &= n_"işjeň" - 1 quad "(çykarylanyň sesi hasaba alynmaýar)" \
"ýokarlandyrmak": quad t_"nobat" + 7 "gün" &<= t_"ulanyş" <= t_"nobat" + 37 "gün" $]

Dört agzaly torda kabul etmek üçin azyndan üç "hawa" gerek ($3 dot 3 >= 8$); bäş agzada üçüsi ýetmeýär ($9 < 10$), dördüsi gerek. Ýokarlandyrmakda çäk dolanda teklip nobata girýär, iň irki ýedi günden soň ulanylýar we ulanylan pursatynda çäk şol wagtky işjeň agzalardan täzeden hasaplanýar (ADR-0055; Bölüm 19.6). Häzir bu düzgünleriň hiç biri kodda işlemeýär: sanaw tapgyrynda dolandyryş resminamada ýaşaýar (ADR-0009 K5).
]

== Häzirki edaralar

Bu tertip döwletleri göz öňünde tutýar, ýöne häzir torda goşulan döwlet ýok. Trust Framework (FW-TF-0001) bu boşlugy atlandyrmagy saýlaýar: döredip bolmaýan edara tablisada "heniz ýok" diýlip ýazylýar, wagtlaýyn ýagdaý wagtlaýyn diýlip atlandyrylýar (Tablisa 30).

Häzir #{strong[wagtlaýyn operator]} gündelik işleýşi, infrastrukturany, sanaw operatorlygyny we hasaba alyş edarasynyň roluny döwletiň adyndan alyp barýar. Toruň ýuridik şahsy bolmandygy üçin bu iş dörediljek täjirçilik däl gaznanyň adyndan edilýär; sanawlarda operatoryň ady hemişe "Tamga Network" diýlip ýazylýar we onuň ýagdaýy #{raw("provisional")} (wagtlaýyn) diýlip bellenýär (ADR-0070 OP1). #{strong[Tehniki geňeş]} spesifikasiýa üýtgeşmelerini, karar ýazgylaryny tassyklamagy we umumy resminama görnüşlerini alyp barýar. #{strong[Maslahat]} ýok; agza döwlet ýok wagty ol döredilmeýär. Dolandyryş edarasy (gazna ýa-da maslahat) bir ýa-da iki döwlet goşulmaga isleg bildirende döredilýär we sanawlar oňa tabşyrylýar (FW-ARF-0001 §8.3).

#tablo([#{strong[Tablisa 30.]} Edaralar we olaryň ygtyýarlary (FW-TF-0001 §1.6, §4.2).], (39fr, 22fr, 27fr), ([Mesele], [Häzir], [Döwletiň goşulmagynda],), (
  ([Ýurt sanawy, hasaba alyş edarasy, kök sertifikat], [Wagtlaýyn operator, döwletiň adyndan], [Her döwlet öz sanawy üçin],),
  ([Agzalyga kabul etmek, çykarmak, protokoly ýokarlandyrmak], [Ýok (agza döwlet ýok)], [Maslahat, üçden iki],),
  ([Spesifikasiýalar, karar ýazgylary, umumy görnüşler], [Tehniki geňeş], [Maslahatyň syýasatlaryna bagly],),
  ([Shemanyň eýesi we akkreditasiýa (ISO\/IEC 17000 \[40\])], [Wagtlaýyn operator], [Maslahat; milli akkreditasiýa edarasy],),
  ([Laýyklyga baha bermek], [Öz beýany we açyk laýyklyk synaglary], [Garaşsyz baha beriş edaralary],),
))

Tablisanyň iň dogruçyl setiri ikinjisidir: häzir döwletiň ses berjek karary ýok, sebäbi ses berjek döwlet ýok. Wagtlaýyn operatoryň we tehniki geňeşiň giň ygtyýarlary hut şonuň üçin ýazmaça çäklere, ölçenip bilinýän çäklere we açyklyk hasabatyna baglandy (Bölüm 18.5).

== Tapgyrlar

Toruň ösüşi dört tapgyrda kesgitlenen we tapgyrlar senenama bilen däl-de, şert bilen kesgitlenýär (FW-ARF-0001 §8.1; Tablisa 31, Surat 30). Sene berilmeýär, sebäbi her geçiş toruň özbaşdak üpjün edip bilmejek zadyna bagly: garaşsyz ikinji operatora ýa-da döwletiň goşulmak kararyna.

#tablo([#{strong[Tablisa 31.]} Dolandyryş tapgyrlary (FW-ARF-0001 §8.1; ADR-0009 K4).], (26fr, 22fr, 29fr, 30fr, 19fr), ([Tapgyr​​​​​​​​​​​​​​​], [Ynamyň labyry], [Kim dolandyrýar​​​​​​​​​​​​], [Geçiş şerti], [Ýagdaý],), (
  ([Sanaw tapgyry], [Gol çekilen sanawlar we labyr žurnaly], [Wagtlaýyn operator], [—], [Işleýär],),
  ([Kitap tapgyry], [Umumy kitap (sanawlaryň proýeksiýasy)], [Ilkinji operatorlar], [Azyndan iki garaşsyz operatoryň ýazmaça razylygy; deňgüýçlilik synaglary], [Meýilleşdirilen (kod taýýar, ýapyk)],),
  ([Döwletiň goşulmagy], [Umumy kitap], [Maslahat, üçden iki], [Ilkinji döwlet operatorynyň önümçilige geçmegi], [Meýilleşdirilen],),
  ([Institusional giňelme], [Umumy kitap], [Maslahat], [Maslahatyň çäkleri], [Meýilleşdirilen],),
))

#sekil(30, [Dolandyryş tapgyrlary: ynamyň labyry we dolandyryjy], "figures/wp-tk/sekil-30.svg", yarim: false)

Iki geçiş dürli soraglara jogap berýär. Kitap tapgyry ynamyň #{strong[näçe gol çekijä]} daýanýandygyny üýtgedýär; döwletiň goşulmagy bolsa ynamyň #{strong[kime degişlidigini]}. Ikisi başga tertipde hem gelip biler. Bölüm 19 birinjisine, aşakdaky tabşyryş meýilnamasy ikinjisine seredýär.

== Tabşyryş meýilnamasy

Tamga-nyň häzir öz üstüne alýan her döwlet roly tabşyrmak üçin dizaýn edildi (FW-ARF-0001 §1.6 P4: hiç bir belgi, rol ýa-da gurluş ýeke operator çaklamasyny götermeýär). Munuň yzy sanawlarda görünýär: köküň ady "TR National Root CA (wagtlaýyn operator)" görnüşinde, at döwlete degişli we operator aýry meýdanda ýazylýar (ADR-0009 K5). Tabşyrylanda bu meýdan üýtgeýär; gurama, kök we resminama görnüşi belgileri üýtgemeýär.

Tabşyrmak iki aýry wakadyr. #{strong[Gaznaga tabşyrmak]} gazna ýuridik şahs bolanda toruň öz hyzmatlarynyň operatoryny üýtgedýär. Ýeke konfigurasiýa bahasy we oňa bagly ýazgylar bilen sertifikatlar täzelenýär; sanaw operatorynyň ady, kök we resminama görnüşi belgileri hem-de guramalaryň hemişelik belgileri üýtgemeýär (ADR-0070 K4, OP3). Tabşyrmak taýýar gural we ýazmaça gollanma bilen alnyp barylýar; guraly gury synag tertibinde işledip bolýar. Belli ýeke-täk goşmaça täsir şahsyýet hyzmatynda: resminama gol sertifikatyna guramanyň belgisi gaznaga tabşyrylanda täze açar bilen goşular we şahsyýet resminamalary şol gün bir gezek täzeden alnar; bu täzeden almagy iki gezek başdan geçirmezlik üçin şeýle saýlandy (ADR-0058; Bölüm 14).

#{strong[Döwlete tabşyrmak]} döwlet öz ýurt sanawyny kabul edip alanda bolýar we alty ädimde kesgitlenen (Tablisa 32). Tertip çeýe; döwlet ilki sanaw operatorlygyny alyp, hasaba alyş edarasyny soň kabul edip biler.

#tablo([#{strong[Tablisa 32.]} Döwlete tabşyrmagyň ädimleri (FW-TF-0001 §7).], (10fr, 23fr, 48fr), ([Ädim​​​​], [Näme tabşyrylýar], [Nähili],), (
  ([1], [Ýurt sanawynyň operatorlygy], [Operator meýdany üýtgeýär; döwletiň gol sertifikaty süýşýän görnüşde goşulýar; belgiler üýtgemeýär],),
  ([2], [Hasaba alyş edarasy], [Hasaba alyş ygtyýary döwlete geçýär; wagtlaýyn operator indi hasaba alyp bilmeýär],),
  ([3], [Milli kök sertifikat], [Ady üýtgemeýär, operatory üýtgeýär; ýa-da döwletiň köki süýşýän görnüşde goşulýar, köne kök pensiýa çykarylýar],),
  ([4], [Şahsy şahsyýet maglumatlary (PID) üpjün edijisiniň orny], [Döwlet doldurýar; şahsyýet barlagynyň ýokary derejeleri PID-e geçýär],),
  ([5], [Umumy kitap], [Döwlet operatorlary bilen kitap; sanaw arhiwi bolşy ýaly geçirilýär we deňgüýçlilik synagyndan geçýär],),
  ([6], [Trust Framework], [Maslahatyň eýeçiligine geçýär; wersiýa belgilenişi dowam edýär],),
))

Trust Framework tablisanyň aşagyna ýeke sözlem goýýar: "Tabşyrmak hiç bir resminamany, ýazgyny ýa-da belgini güýjünden düşürmeýär." Gapjyk we barlaýjy üçin tabşyrmagyň ähli täsiri sanawyň salgysynyň we gol çekijisiniň üýtgemegidir (ADR-0035 PO3). Kod bilen goralyp bilinmeýän baýlyklar, ýagny domen atlary, kök sertifikatlar, sanaw arhiwi we açarlar ýazmaça düzgüne bagly: domen ady gazna döredilende gaznanyň adyna hasaba alynýar, geçiriş gulpy we DNSSEC ulanylýar, azyndan on ýyl öňünden täzelenýär; ýatyrylanda ýa-da tabşyrylanda olar mirasdüşerlik şertnamasy bilen maslahata ýa-da amanatçä geçýär (FW-TF-0001 §5.7; ADR-0070 K5).

== Ölçenip bilinýän çäkler we açyklyk

Kod bilen çäklendirip bolýan ygtyýar kod bilen çäklendirilýär: gol açary bolmadyk adam sanawy üýtgedip bilmeýär. Ýöne hyzmatlary ýerleşdirýän, domen adyny saklaýan, ýazgy alyp barýan we statistika ýygnaýan operator hiç bir düzgüni bozmazdan ümsüm agram gazanyp biler. Trust Framework muňa #{strong[ýumşak güýç]} diýýär we ony hem çäklendirýär (G-B; FW-ARF-0001 §1.6 P7): şeýle her ygtyýar ýazmaça syýasata, ölçenip bilinýän çäge we açyklyk hasabatyna baglanýar (Tablisa 33).

#tablo([#{strong[Tablisa 33.]} Ýumşak ygtyýarlar we olaryň çäkleri (FW-TF-0001 §1.6–§1.7; FW-RB-0001 RB-OP-09…RB-OP-13).], (21fr, 48fr), ([Ygtyýar], [Çäk],), (
  ([Resminama beriş hyzmatyny ýerleşdirmek], [Ýerleşdirilen guramalaryň sanawy açyk; olaryň paýy 30%-den geçse, mesele maslahatyň gün tertibine gelýär],),
  ([Kitap düwünlerini işletmek], [Döwlet operatorlarynyň sany azyndan dörde ýetende ilkinji operatoryň düwünleri tabşyrylýar],),
  ([Sanawlary indekslemek], [Operator ýerleşdirilen indeksleme hyzmatyny hödürlemeýär; indeksleme programmasy açyk çeşmeli],),
  ([Statistika ýygnamak], [Diňe jemlenen hasaplaýjy; 50-den kiçi topar çap edilmeýär; gurama ýa-da resminama boýunça hasaplaýjy ýok; çig hasaplaýjy iň köp 13 aý],),
  ([Sanawy üýtgetmek], [Hemmä açyk üýtgeşme žurnaly (kim, haçan, näme, esas); labyr žurnaly],),
))

Açyklyk hasabaty üç aýda bir gezek çap edilýär: sanaw wersiýalary we üýtgeşmeler, ýerleşdiriş paýy, azyndan 50-lik toparlar bilen görnüş ulanyş hasaplaýjylary, wakalar we barlag tapyndylary; ol şahsy maglumat saklamaýar (FW-TF-0001 §1.7). Bu tertibiň çägi aýdyň we Bölüm 23-de galyndy töwekgelçilik hökmünde ýene agzalar: häzir ynamyň labyry ýeke operatoryň golydyr. Operator bilen resminama beriji bilelikde hereket etse, gapma-garşylykly ýazgy çap edilip bilner; žurnal, hasabat we barlag muňa päsgel berýär, ýöne ony mümkin däl etmeýär (FW-ARF-0001 §6.6, L1). Bu çägi aýyrjak zat Bölüm 19-daky köp gol çekijili tertipdir.

== Gatnaşyk derwezeleri we laýyklyk tertibi

Trust Framework-iň birinji ýörelgesi bir çägi çekýär: #{strong[hasaba almak ygtyýarlandyrmak däldir]} (G-A). Hasaba alyş edarasy hasaba alýar, tassyklamaýar. Uniwersitetiň diplom bermäge kanuny ygtyýary toruň daşynda, öz ýurdunyň kanunçylygynda berilýär; tor diňe toruň içindäki çägi saklaýar: haýsy görnüşi, haýsy meýdanlar bilen berip biljekdigini.

Resminama berijiler üçin dört derweze bar (FW-TF-0001 §3.2). #{strong[I1 (hasaba alnan)]} domen adyna eýeçiligi, aragatnaşyk maglumatyny we tehniki laýyklygy talap edýär we barlaýja "akkreditasiýaly däl" diýlip görünýär. #{strong[I2 (şertnamaly)]} munuň üstüne ýuridik şahsyň we gol çekmäge ygtyýarly adamyň tassyklanmagyny, gatnaşyk şertnamasyny, X.509 \[28\] sertifikatyny we şahsy maglumat goşundylaryny goşýar. #{strong[I3 (akkreditasiýaly)]} açarlaryň enjam howpsuzlyk modulynda ýa-da kwalifisirlenen elektron möhürde saklanmagyny, ýazgy alyp barmagy, waka habar beriş möhletlerini, ýyllyk gözden geçirmegi we jogapkärçilik ätiýaçlandyrmasyny talap edýär. #{strong[Döwlet]} synpy döwlet edaralary we ygtyýarly çeşmeler üçindir we degişli döwletiň hasaba alyş edarasy tarapyndan hasaba alynýar. Resminama görnüşi boýunça ygtyýar derwezeden garaşsyz: her görnüş üçin aýry rugsat sanawy bar, deslapky ýagdaýda ýapyk. Barlaýjy we gapjyk üpjün edijisi derwezeleri Bölüm 20.3-de düşündirilýär. Barlag ÝB gapjyk ekoulgamyndaky ýaly garyşyk modeldir: kwalifisirlenen gabatlygy bolan resminamalar öňünden, beýlekiler soňundan barlanýar (Tablisa 34).

#tablo([#{strong[Tablisa 34.]} Laýyklyk tertibi (FW-TF-0001 §4.1).], (19fr, 16fr, 48fr), ([Synp], [Tertip], [Mazmun],), (
  ([I3 \/ kwalifisirlenen gabatlygy], [Öňünden barlag], [Hasaba alynmazdan öň tehniki we institusional baha bermek; ýyllyk barlag],),
  ([I2], [Soňundan barlag], [Öz beýany, laýyklyk synaglary; arz ýa-da waka boýunça barlag],),
  ([I1], [Öz beýany], [Tehniki laýyklyk synagy; "akkreditasiýaly däl" belligi],),
  ([Gapjyk üpjün edijisi], [Häzir öz beýany we laýyklyk synaglary], [Döwletiň goşulmagynda öňünden barlag, sertifikatly çözgüt],),
  ([Barlaýjy], [Soňundan barlag], [Çägiň bozulmagy ýa-da artykmaç talap barada arz boýunça],),
))

Düzgün bozulsa, bäş basgançakly temmi basgançaklary işleýär: otuz günlük düzediş möhletli duýduryş, görnüş ygtyýarynyň daraldylmagy, togtatma, mirasdüşer bellenip çykarmak we şertnamany ýatyrmak (FW-TF-0001 §4.5). Basgançaklaryň iň möhüm düzgüni ýene-de resminamalary goraýar: çykarmak köne resminamalary güýjünden düşürmeýär, sebäbi güýjünde bolmak resminamanyň berlen senesine görä bahalandyrylýar (Bölüm 11.3). Pul jerimesi ýok; maslahat döredilse, öz karary bilen girizip biler. Jedeller ilki shemanyň eýesiniň ýanynda, soňra şertnamadaky kazyýet ýerinde çözülýär; guramanyň ýerleşýän döwletiniň hukugy esasdyr, döwletleriň arasynda maslahat ygtyýarly we onuň üstünde başga edara ýok (FW-TF-0001 §4.7, §5.8). Çarçuwa pilotdan öň Türkiýäniň şahsy maglumat we elektron gol kanunçylygy boýunça hukuk derňewinden geçiriler (FW-TF-0001 §1.4); bu resminama hukuk pikiri däl.

== Maliýeleşdirmek ýörelgesi

Tamga Network täjirçilik maksadyny yzarlamaýar we önüm ýa-da hyzmat satmaýar (ADR-0037). Bu ýerde diňe toruň bitaraplygyna täsir edýän ýörelgeler ýazylýar (ADR-0071; FW-TF-0001 §5.5). Adamlar üçin tor hemişe mugt. Wagtlaýyn döwürde tor hiç bir gatnaşyjydan sanaw ýazgysy, resminama bermek, barlag, şahsyýet hyzmaty ýa-da sanaw hyzmaty üçin töleg almaýar. Maliýe goşandy hasaba alyş kararyna, sanawdaky orna, gatnaşyk derwezelerine ýa-da dolandyryşdaky sese täsir etmeýär. Tölegli hyzmatlar toruň daşyndaky kompaniýalar tarapyndan öz atlary bilen hödürlenýär we hasaba alyş karary olara baglanyp bilinmeýär. Töleg meselesi täzeden açylsa, bu dolandyryş edarasynyň kararyny we täze karar ýazgysyny talap edýär.

== Rulebook tertibi

Tamga-nyň arhitekturasy we salgylanma çarçuwasy (FW-ARF-0001) ÝB-niň ARF-i \[11\] ýaly esasy resminamadan we goşundylardan ybarat. A goşundy Trust Framework, B goşundy #{strong[Tamga Rulebook]}-dyr (FW-RB-0001): ol her roluň eýermeli belgili we hökmany düzgünlerini jemleýär we ÝB ARF-iniň ýokary derejeli talaplar goşundysynyň gabatlygydyr. Düzgünler #{raw("RB-<ROL>-<NN>")} görnüşinde (meselem, RB-OP-15: umumy kitap azyndan iki garaşsyz operatoryň ýazmaça razylygy bolmazdan gurulmaýar) we RFC 2119-yň MUST, SHOULD, MAY dilini ulanýar. Her resminama görnüşiniň rulebook-y (Education, Identity, Event Ticket, Contact) bu kitapdan şahalanýar, onuň ähli düzgünlerini miras alýar we ÝB-niň Attestation Rulebook \[13\] şablonyna eýerýär.

Bu resminamalar karar döretmeýär. Hökmanylyk tertibi karar ýazgylary, spesifikasiýalar, Trust Framework, Tamga Rulebook we şertnama şablonlarydyr; gapma-garşylykda ýokarkysy güýjünde (FW-TF-0001 §0). Her üýtgeşme karar ýazgysyna daýanýar we #{raw("arf.tamga.network")}-da çap edilýär; gatnaşyjynyň borçlaryny üýtgedýän esasy wersiýa şertnamalara täzeden gol çekilmegini talap edýär (FW-TF-0001 §8). Düzgünlerden her gyşarma esaslandyrmasy we ýapylyş senesi bilen ýazga geçýär; ýazga alynmadyk gyşarma bozulmadyr (RB-ENF-04). Kararlaryň nähili kabul edilýändigi Bölüm 21-de.

= Umumy Kitap: Näme üçin Häzir Däl, Nähili Geler

#kutu("onemli", [Bu bölümiň ýagdaýy: meýilleşdirilen])[
Häzir işleýän zynjyr ýok. Rugsatly umumy kitabyň kody ýazyldy we synagdan geçdi; önümçilikde ýok we ýapyk. Ikinji garaşsyz operator bolmazdan açylmaýar (ADR-0009, ADR-0051). Aşakdakylar kitap açylsa güýjünde boljak düzgünlerdir. Häzir ynam Bölüm 6-daky gol çekilen sanawlara we labyr žurnalyna daýanýar we barlagyň hiç bir ädimi zynjyra bagly däl.
]

"Blokçeýn nirede?" diýen sorag Tamga-a iň köp berilýän soraglaryň biridir, sebäbi toruň ilkinji dizaýny zynjyr bilen başlanýardy. Häzirki jogap şeýle: zynjyr häzirki wagtda hiç zat goşmaýar we hiç zat goşmaýan döwründe gurulmagy ynamy bolşundan uly görkezýär. Bu bölüm munuň esaslaryny, kitabyň haýsy düzgünler bilen geljekdigini we geçişiň nähili ediljekdigini düşündirýär. Zynjyryň şahsyýet ulgamynda haçan peýdaly bolýandygyny umumy görnüşde tapgyryň on ikinji makalasy \[77\] ara alyp maslahatlaşýar.

== Kitap haçan bir zat goşýar

Umumy kitabyň wadasy biri-birine doly ynanmaýan birnäçe tarapyň, olaryň hiç biriniň özbaşdak üýtgedip bilmejek ýazgysyny saklamagydyr. Wizantiýa \[58\] säwliklerine çydamly ylalaşyk usullary taraplaryň bir bölegi säwlikli ýa-da erbet niýetli bolsa-da işleýär; ýöne galanlarynyň biri-birinden garaşsyzdygyna daýanýar.

Köne meýilnamada birinji tapgyrda dört blok tassyklaýjy (validator) bardy we dördüsi hem şol bir operatoryňky boljakdy. ADR-0009 ýönekeý sorag berdi: şol bir eliň astyndaky dört düwün şol eliň dogruçyldygy baradaky çaklamadan artyk näme döredýär? Ol kesilmä çydamlylygy döredýär, ynamy döretmeýär. Ýeke operatoryň zynjyry ynam nukdaýnazaryndan ýeke operatoryň gol çeken heş zynjyrly žurnaly bilen deňdir; soňkusy arzan, ETSI standarty we ÝB gapjyk ekoulgamynyň öz modelidir (ADR-0009 F1).

Bu syn ýörelgä öwrüldi (FW-ARF-0001 §1.6 P5): #{strong[umumy kitap saklaýyş saýlawy däl, gol çekijileriň saýlawydyr.]} Gymmat maglumatyň nirede durýandygyndan däl-de, ony näçe garaşsyz tarapyň tassyklaýandygyndan gelýär. Şonuň üçin başlangyç çägi ýazmaça kesgitlenen: zynjyr diňe wagtlaýyn operatordan hukuk we operasion taýdan garaşsyz azyndan bir gurama (ikinji uniwersitet, palata ýa-da döwlet edarasy ýaly) tassyklaýjyny işletmegi ýazmaça kabul edende gurulýar (ADR-0009 K4; RB-OP-15). Häzir şeýle operator ýok. Seredilen alternatiwalar hem ýazga alnan: zynjyra garaşmak kepillik gazanylmazdan pilotu infrastruktura bagly edýärdi; ýeke operatorly "işläp düzmek zynjyry" ynam bermezden zynjyr görnüşini bererdi; sanawy, sertifikaty we ýatyrylyş sanawy bolmadyk demo bolsa şol bir arhitektura bolmandygy üçin geçişde hemme zadyň täzeden ýazylmagyny talap ederdi.

== Näme üçin Besu we QBFT

Kitap häzir gurulmajak hem bolsa, onuň tehnologiýasy saýlandy: Hyperledger Besu \[59\] we QBFT ylalaşyk usuly (ADR-0001). Tor rugsatly we garaşsyz hususy tordur; onuň öz başlangyç bloky we zynjyr belgisi bar, hemmä açyk hiç bir tora bagly däl. QBFT-de blok tassyklaýjylaryň üçden ikisinden köpüsiniň tassyklamagy bilen bir blokda gutarnykly bolýar we ses güýji deňdir. Dizaýnda tassyklaýjylar döwletlerdir, ynamdar guramalar blok tassyklamaýan doly düwünleri işledýär; QBFT birnäçe onlarça tassyklaýjydan ýokarda kynçylyk çekýändigi üçin bu bölünişik ölçeg meselesini hem çözýär (Tablisa 35).

#tablo([#{strong[Tablisa 35.]} Kitap hereketlendirijisi üçin seredilen wariantlar (ADR-0001; ADR-0051).], (23fr, 16fr, 48fr), ([Wariant], [Netije​​​​​​​], [Sebäbi],), (
  ([Hyperledger Besu + QBFT], [Saýlandy], [Rugsatly tor, deň ses, derrew gutarnyklylyk içine gurlan; Apache 2.0, şahalandyryp bolýar; EBSI \[60\] hem Besu esasly],),
  ([Cosmos SDK (CometBFT)], [Ret], [Ölçegi we tizligi has gowy; ýöne köp zynjyrly gurluşyň artykmaçlygy ýeke umumy kitapda peýdasyz, EBSI-den tapawutly toplum],),
  ([Noldan ylalaşyk usuly], [Ret], [Töwekgelçilik we möhlet ýokary, özygtyýarlylyga goşandy ýok],),
  ([Hemmä açyk zynjyr ýa-da onuň üstündäki gatlak], [Ret], [Özygtyýarlylygyň ýitmegi; şahsy maglumat çägini daşky zynjyrda barlap bolmaýar],),
))

ADR-0001-iň ilkinji esaslarynyň arasynda kitabyň geljekde gymmat geçirişini götermegi hem bardy; bu ugur häzir togtadyldy (Bölüm 19.9). Saýlawy saklaýan esaslar rugsatly gurluş, deň ses, derrew gutarnyklylyk, özygtyýarlylyk we ÝB-däki öňki mysaldyr.

== Proýeksiýa ýörelgesi

Kitap gelse, sanawlaryň ýerini tutarmy? ADR-0051 iň dar we iň howpsuz jogaby berýär: #{strong[zynjyr gol çekilen sanawlaryň proýeksiýasydyr.]} Çeşme hemişe gol çekilen sanawlar we labyr žurnalydyr; zynjyr diňe "bu sanaw wersiýasy şu heş bilen çap edildi" diýip şaýatlyk edýän ikinji ýazgydyr (Surat 31).

Zynjyra iki görnüşli ýazgy ýazylýar: her sanaw wersiýasynyň heşi (haýsy sanaw, näçenji wersiýa, mazmunyň SHA-256 heşi, öňki wersiýanyň heşi, çap wagty) we labyr žurnalynyň soňky setiriniň heşi. Žurnalyň setirleri biri-birine heş zynjyry bilen baglanandygy üçin soňky setir bütin žurnaly baglaýar. Sanawyň mazmuny, ýazgylar, resminamalar, resminama heşleri we şahsy maglumat zynjyra ýazylmaýar; ýazgy meýdanlary diňe hemişelik ululykly heşler we bitin sanlardyr, erkin tekst meýdany ýok (ADR-0051 K2, CH2; Tablisa 36).

#sekil(31, [Proýeksiýa: çeşme sanaw, önüm kitap], "figures/wp-tk/sekil-31.svg", yarim: false)

Proýeksiýanyň iň möhüm düzgüni ugurdyr. Barlag hatary we müşderileriň ynam soraglaryny berýän ýeke-täk interfeýsi (#{raw("TrustSource")}, Bölüm 6.6) diňe sanawlardan okaýar; zynjyr hiç bir ädimde gerek däl we gerek hem bolmaz. Barlaýjy isläp, öz sanawynyň heşini zynjyrdaky tassyklanan heş bilen deňeşdirip biler we üç jogabyň birini alýar. #{strong[Hawa]}: tassyklanan heş şol bir. #{strong[Ýok]}: şol bir wersiýa üçin başga tassyklanan heş bar; bu iki barlaýja iki dürli sanawyň görkezilendiginiň alamatydyr, barlag netijesini üýtgetmeýär, ýöne operatora duýduryş berýär we açyklyk hasabatyna girýär. #{strong[Näbelli]}: aýratynlyk ýapyk ýa-da zynjyra girip bolmaýar; netije erbetleşmeýär. Gapma-garşylykda sanaw güýjünde; zynjyr ýazgysy düzedilmeýär, onuň ýanyna täze wersiýa goşulýar (ADR-0051 K1, K5, CH1).

#tablo([#{strong[Tablisa 36.]} Kitapda näme bar, näme ýok (ADR-0051 CH2; ADR-0063 BL2; FW-ARF-0001 §1.6 P2).], (48fr, 41fr), ([Kitapda bar], [Kitapda ýok],), (
  ([Sanaw wersiýasynyň belgisi, mazmun heşi, öňki heş, çap wagty], [Sanawyň mazmuny; gurama, barlaýjy we shema ýazgylary],),
  ([Labyr žurnalynyň soňky setiriniň tertibi, heşi, wagty], [Resminamalar we resminama heşleri],),
  ([Ýazyjylaryň haýsy dalaşgäri goldaýandygy, gapma-garşylyk wakalary], [Şahsy maglumat, şahsyýet belgisi, meýdan bahalary],),
  ([Ýatyrylyş sanawynyň salgysy, heşi, wersiýasy, ululygy, bit sany], [Ýatyrylyş bitleri, sanawdaky orunlar, resminama görnüşiniň ady],),
))

Soňky setir proýeksiýa düzgün-nyzamyny gowy görkezýär. Şahsyýet hyzmatynyň ýatyrylyş sanawlary ýazgy başyna bir, gurama sanawlary iki bit ulanýar (Bölüm 12.3). Kitabyň köne taslamasy diňe iki biti kabul edýärdi we şahsyýet sanawlaryny asla labyrlap bolmazdy. ADR-0063 düzgüni öwürdi: kitap sanawyň özüni nähili tanadýandygyny ýazga alýar we IETF Token Status List-iň \[17\] rugsat berýän 1, 2, 4 ýa-da 8 bahalarynyň birini kabul edýär. Haýsy görnüşiň näçe bit ulanjakdygy çap edijiniň we barlaýjynyň düzgünidir; kitap resminama görnüşini bilmeýär.

== Çäkli labyr we bäsdeş dalaşgärler

Zynjyrda heşiň tassyklanan hasaplanmagy üçin ýeke ýazyjynyň (anchorer) ibermegi ýeterlik däl: çäk sany dürli ygtyýarly ýazyjy birmeňzeş maglumaty ibermeli we önümçilikde çäk azyndan ikidir. Ýeke operator tassyklanan labyr döredip bilmeýär; bu "ikinji garaşsyz operator" düzgüniniň kitapdaky gabatlygydyr (ADR-0051 K3, CH3).

Ýazyjylar ylalaşyp bilmese näme bolar? Ilkinji dizaýnda wersiýany ilki açan ýazyjy maglumatyň nähili boljakdygyny kesgitleýärdi, başga maglumat iberen ret edilýärdi. Howpsuzlyk derňewi munuň iki gowşaklygyny tapdy: ýeke ýazyjy wersiýany nädogry maglumat bilen açyp, dogruçyl ýazyjylary hemişelik böwetläp bilýärdi we ret zynjyrda yz galdyrmaýandygy üçin bu gulp görünmeýärdi. ADR-0053 düzgüni üýtgetdi: şol bir wersiýa üçin her dürli maglumat #{strong[aýry dalaşgär]} hökmünde ýazga alynýar, ikinji we ondan soňky her dürli dalaşgär hemmäniň görüp biljek gapma-garşylyk wakasyny ýaýradýar, çägi ilki dolduran dalaşgär ýeňýär (Surat 32). Tassyklanandan soň wersiýa ýapylýar; tassyklanan ýazgy üýtgemeýär we pozulmaýar. Toplumdan çykarylan ýazyjynyň goldawy hasaba alynmaýar, şeýlelikde açaryny çalşan operator şol bir wersiýa iki ses berip bilmeýär; çägi hem ýazyjylaryň sanyndan geçer ýaly düzüp bolmaýar (ADR-0053 K4).

#sekil(32, [Bäsdeş dalaşgärler: şol bir wersiýa üçin iki dürli heş (çäk k = 2)], "figures/wp-tk/sekil-32.svg", yarim: false)

#kutu("teknik", [Çäkli tassyklamanyň düzgüni we labyryň ýoly])[
$W$ ygtyýarly ýazyjylaryň toplumy, $k$ çäk, $D(v, a)$ bolsa $v$ wersiýa üçin $a$ dalaşgäri goldaýan ygtyýarly ýazyjylar bolsun (ADR-0051 CH3; ADR-0053 AC1–AC4):

#formul[$ "tassyk"(v, a) &<==> abs(D(v, a)) >= k \
2 &<= k <= abs(W) quad "(önümçilikde)" \
D(v, a) inter D(v, b) &= emptyset quad "her" a != b "üçin" $]

Üçünji setir bir ýazyjynyň şol bir wersiýa üçin iki dalaşgäri goldap bilmejekdigini aýdýar; bolmasa ýeke operator iki dürli heşi goldap, iki dürli gürlemegini öz içinde gizläp bilerdi. Sanaw wersiýasynyň zynjyra ýoly:

#adimlar((
  ("Sanaw çap ediji", [#{strong[Çap.]} Sanawa gol çekýär; öňki wersiýanyň heşini sanawa ýazýar.], $"prev"_n = "SHA-256"(L_(n-1))$),
  ("Sanaw çap ediji", [#{strong[Öz barlagy.]} Goly, heş zynjyryny, täzeligi barlaýar; sagdyn däl toplum labyrlanmaýar.], $"Verify"(L_n) = "hakyky"$),
  ("Ýazyjy → Kitap", [#{strong[Iberiş.]} Diňe heşi iberýär; bu ses bermekdir.], $h_n = "SHA-256"(L_n)$),
  ("Kitap", [#{strong[Dalaşgär.]} Şol bir heş goldawy artdyrýar; başga heş täze dalaşgär açýar we gapma-garşylyk wakasyny ýaýradýar.], $abs(D(n, h_n)) + 1$),
  ("Kitap", [#{strong[Tassyk.]} Goldaw çäge ýetende wersiýa ýapylýar.], $abs(D(n, h_n)) >= k$),
  ("Barlaýjy", [#{strong[Islege bagly barlag.]} Öz sanawynyň heşini tassyklanan labyr bilen deňeşdirýär.], $h attach(=, t: ?) h_n$),
))

Aýratynlyk baýdagy deslapky ýagdaýda ýapyk; ýapyk wagty zynjyra birikilmeýär. Önümçilikde baýdak ikinji garaşsyz operator we azyndan iki çäk bolmazdan açylmaýar (ADR-0051 CH5).
]

== At meýdany, döwletara baglanyşyk, kwotalar

"Milli ýazgylara diňe şol döwlet ýazýar" ýörelgesi kitapda koduň düzgünine öwrülýär we ADR-0054 onuň üç gyrasyny ýapdy. #{strong[Atlar:]} umumy görnüşler #{raw("urn:tamga:<alan>:<Tür>:<ana sürüm>")}, bir döwlete mahsus görnüşler #{raw("urn:tamga:<cc>:<alan>:<Tür>:<ana sürüm>")} görnüşinde (Bölüm 8.4). Milli görnüş diňe öz döwletiniň at meýdanynda bolup biler, umumy görnüş hiç bir döwletiň at meýdanynda bolup bilmez; şeýlelikde döwlet maslahatda ses berilýän umumy görnüşiň adyny öňünden eýeläp bilmeýär. #{strong[Baglanyşyklar:]} gurama diňe öz döwletiniň köküne baglanýar we diňe öz döwletinden mirasdüşer görkezýär; bir döwletiň togtatma karary başga döwletiň guramalaryna täsir edip bilmeýär. #{strong[Kwotalar:]} islenmedik ýazgyny çäklendirýän gündelik ýokarky çäkler döwlet başyna we ýazgy görnüşi başyna hasaplanýar, ýatyrylyş sanawyny çap etmek sanaw başyna günde 48 bilen çäklendirilýär (sagatlaýyn çap we gaýtadan synanyşyk paýy) we gurama başyna gündelik täze sanaw ýazgysy çäklendirilýär; ýokarky çägi täze sanaw açyp geçip bolmaýar.

== Ýokarlandyrmak üçin garaşmak möhleti

Toruň düzgünlerini üýtgedýän iň güýçli amal kitapdaky ýazgy programmalaryny (akylly şertnamalary) ýokarlandyrmakdyr. Bölüm 18.1-däki çykmak hukugy, ýokarlandyrmak ses geçen pursatynda güýje girse, işlemeýär: garşy çykýan döwlet karar bermäge ýetişmänkä täze düzgünler ulanylyp başlanýar. Şonuň üçin ADR-0055 ýokarlandyrmaga ýedi günlük garaşmak möhletini goýýar.

#kutu("teknik", [Protokoly ýokarlandyrmagyň ädimleri])[
#adimlar((
  ("Agza döwlet → Kitap", [#{strong[Teklip.]} Täze wersiýany görkezýän teklip açylýar; erkin maglumat götermeýär.], $"teklip" = ("maksat", "täze wersiýa")$),
  ("Agza döwletler", [#{strong[Ses bermek.]} Işjeň agzalar ses berýär.], $3 dot e >= 2 dot n$),
  ("Kitap", [#{strong[Nobat.]} Çäk dolanda teklip ulanylmaýar, nobata girýär.], $"eta" = t_"nobat" + 7 "gün"$),
  ("Agza döwletler", [#{strong[Çykmak penjiresi.]} Her kim näme boljakdygyny görýär; razy bolmadyk döwlet çykyp biler.], $t_"nobat" <= t < "eta"$),
  ("Kitap", [#{strong[Täzeden hasaplamak.]} Çäk şol wagtky işjeň agzalardan täzeden hasaplanýar; çykanyň sesi düşýär.], $3 dot e' >= 2 dot n'$),
  ("Kitap", [#{strong[Ulanmak.]} Çäk üpjün edilýän bolsa ulanylýar; otuz günde ulanylmasa teklip düşýär.], $"eta" <= t_"ulanyş" <= "eta" + 30 "gün"$),
))

Iki gün döwlet edaralaryna jogap bermäge wagt galdyrmaýar, on dört gün gyssagly düzedişi artykmaç uzaldýar; ýedi gün giňden ýaýran tejribedir. Aýry wagt gulpy programmasy täze ygtyýar eýesini döretjekdigi üçin ret edildi. Garaşmak diňe ýokarlandyrmaga degişli; agzalyga kabul etmek, çykarmak we umumy görnüşi hasaba almak garaşmasyzdyr.
]

Ses berlen zadyň okalyp bilinýän bolup galmagy hem düzgündir. Ýokarlandyrmak bilen diňe parametrsiz başlangyç funksiýasyny çagyryp bolýar; başlangyç bahalar täze wersiýanyň kodunda we ses berlen zat şol koddur. Ýazyjy goşmak, çägi üýtgetmek ýa-da umumy görnüşi aýyrmak ýaly dolandyryş amallary görnüşi belli aýry teklipler bilen edilýär. Umumy "şu çagyryşy ýerine ýetir" teklibi bilkastlaýyn döredilmedi: ol kitapda erkin maglumat meýdanyny açardy we döwletiň nämä ses berýändigini okamagyny kynlaşdyrardy (ADR-0055 GE2, GE3).

== Rugsat bermek we işletmek

Kitap rugsatly: diňe tassyklanan düwünler birikýär, diňe tassyklanan hasaplar amal iberýär. Ilkinji resminamalar muny Besu-nyň zynjyryň üstündäki rugsat mehanizmi bilen göz öňünde tutýardy; Besu bu mehanizmi 24.12-de ulanyşdan aýyrdy we 25.6.0-da doly aýyrdy. ADR-0052 galan ýoly, her düwündäki ýerli rugsat faýlyny saýlady we bir düzgün goşdy: faýl el bilen ýazylmaýar, kitabyň öz dolandyryş ýazgysyndan döredilýär; her operator ony özi döredýär, ähli tassyklaýjylar şol bir sanawy göterýär we tapawut işleýiş wakasy hökmünde habar berilýär. Rugsat sanawy ikinji gorag hatarydyr; ýazmak ygtyýarynyň esasy barlagy kitabyň düzgünlerinde we sanawdaky säwlik şol ygtyýary giňeltmeýär. Düwünleriň uzakdan çagyryş interfeýsi internete açylmaýar; daşky giriş diňe özara TLS barlaýan ters proksiniň aňyrsyndan, kesgitlenen müşderilere berilýär (ADR-0052 LP4, LP5).

== Geçiş

Sanawlardan kitaba geçiş täzeden ýazmak bolmaz. Geçiş sanaw wersiýalarynyň arhiwiniň kitaba #{strong[gaýtadan oýnalmagydyr]}: her wersiýa yzygiderlilikde işlenýär we ýazgylaryň ýagdaý taryhyndaky wagtlar saklanýar (ADR-0009 K7). Maksat şeýle: ýapylan guramanyň köne diplomy berlen senesinde gurama işjeň bolandygy üçin güýjünde (Bölüm 11.3) we geçişden soň hem şol bir jogaby almaly. Kabul ediş ölçegi şoňa görä ýazyldy: pilotyň dowamynda ýazga alnan her ynam soragynda sanawa daýanýan ynam çeşmesi bilen kitaba daýanýan ynam çeşmesi şol bir jogaby bermeli; ýeke soragda kabul bilen ret tapawutlansa, geçiş tamamlanmadyk hasaplanýar. Berlen resminamalar täzeden berilmeýär; gapjyk we resminama beriş hyzmaty üýtgemeýär; müşderiler diňe #{raw("TrustSource")} interfeýsiniň aňyrsyndaky amala aşyrylyşy çalyşýar (ADR-0015; FW-ARF-0001 §8.2). Geçişden yzyna hem gaýdyp bolýar we sanawlar kitap tapgyrynda-da çap edilmegini dowam etdirýär (ADR-0009 3-nji esas).

== Gymmat gatlagy: togtadyldy

Ilkinji dizaýnda kitabyň geljekde gymmat gatlagyny götermegi üçin käbir kararlar kabul edilipdi (ADR-0003). Olar indi hökmany däl we diňe gözleg ugry hökmünde ýazgyda dur (ADR-0072). Tamga Network token ýa-da coin çykarmaýar; töleg, hasaplaşyk ýa-da gymmat geçirişini işlemeýär we bular ne ilkinji wersiýanyň, ne-de pilotyň bölegidir. Kitabyň kody diňe sanawlaryň proýeksiýasydyr. Bu ugruň täzeden açylmagy dolandyryş edarasynyň kararyny, gizlinlik gözlegini, garaşsyz howpsuzlyk derňewini we täze karar ýazgysyny talap edýär.

= ÝB bilen Laýyklyk we Üçünji Ýurtlary Ykrar Etmek

Aýnur Stambulda bir işe arza berýär; iş berijiniň Ýewropada hyzmatdaşy bar we ol hem Aýnuryň resminamasyny görmek isleýär. Hyzmatdaşyň ulgamy ÝB gapjyklaryndan gelýän resminamalary okap bilýär; Aýnuryň resminamasy hem ÝB-niň saýlan formatynda we gol çekilen. Resminama ol ýerde kabul edilermi?

Jogabyň iki ýarymy bar. Birinji ýarymy tehniki: resminama okalyp bilnermi, onuň goluny barlap bolarmy, ony beren guramany ynamdar sanawdan öwrenip bolarmy? Tamga-nyň dizaýny şu ýarymyna jogap bermäge çalyşýar. Ikinji ýarymy hukuky: okalan resminama Ýewropada nähili güýç berilýär? Bu ýarymy toruň elinde däl. Ýene bir bellik: Aýnuryň Bakuda alan diplomy häzir toruň sanawlarynda ýok; diňe Türkiýäniň sanawy işjeň we Azerbaýjan üçin goýlan orun döwlet goşulanda dolup biljek boş ýerdir, ylalaşyk barada habarnama däldir.

== Bilelikde işlemegiň üç derejesi

Trust Framework üç derejäni kesgitleýär (FW-TF-0001 §6). #{strong[Göçürilip bilinmek]}: resminamalar SD-JWT VC \[16\] we mdoc \[34\] görnüşinde, OpenID4VCI \[30\] we OpenID4VP \[31\] bilen berilýär we görkezilýär; ÝB gapjygy Tamga resminamasyny tehniki taýdan işläp biler. #{strong[Ynam]}: sanawlar ETSI modelinde, ETSI TS 119 602 \[42\] JSON görnüşinde hem çap edilýär, kök barmak yzlary aýratyn ýol bilen yglan edilýär we sanawlaryň sanawynda başgalaryň sanawlary üçin orun bar. #{strong[Hukuky ykrar]}: resminamanyň başga ýurtda hukuk taýdan güýjünde hasaplanmagy. Ilkinji iki dereje toruň işi we häzir esasan işleýär; üçünjisi döwletleriň işi we tor bu ylalaşyklaryň tarapy däl.

== Standartlara laýyklyk kartasy

Tehniki gatlagyň ÝB-ňki bilen birmeňzeş bolmagy FW-ARF-0001 §1.6-da P3 hökmünde ýazylan: Tamga-a mahsus her goşmaça standart giňeltme nokady arkaly edilýär we standart müşderileri bozmaýar (ADR-0035 PO1). Tablisa 37 ÝB ekoulgamynyň daýanýan standartlaryny, olaryň Tamga-daky gabatlyklaryny we ýagdaýlaryny görkezýär; "işleýär" hakyky torda ýa-da sandbox-da janly diýmekdir.

#tablo([#{strong[Tablisa 37.]} Standartlara laýyklyk kartasy (FW-ARF-0001 §2.8, §8.4; FW-REF-0001; degişli karar ýazgylary).], (18fr, 36fr, 48fr, 21fr), ([Ugur], [Standart ýa-da ÝB düzgüni], [Tamga-daky gabatlygy], [Ýagdaý],), (
  ([Ynam sanawy], [ETSI TS 119 602 (LoTE, JSON)], [Daşky sanawlar şu görnüşde okalýar (ADR-0036); Tamga sanawlarynyň LoTE görnüşi (Bölüm 6.8)], [Okamak işleýär; görnüşleriň çap edilmegi meýilleşdirilen],),
  ([Ynam sanawy], [ETSI TS 119 612 V2.4.1 (XML)], [Şol bir gol çekilen çeşmeden, şol bir wersiýa bilen XAdES gol çekilen görnüş (ADR-0066)], [Sandbox-da işleýär; hakyky torda meýilleşdirilen],),
  ([Guramanyň şahsyýeti], [X.509 (RFC 5280), ETSI EN 319 401; TS 119 412-6, EN 319 412-3], [Milli kök we gurama sertifikatlary, guramanyň belgisi (ADR-0004, ADR-0050)], [Işleýär],),
  ([Giriş sertifikaty], [ETSI TS 119 411-8], [Söwda ady, goldaw salgysy, hyzmat belgisi (ADR-0058)], [Işleýär; syýasat belgisi meýilleşdirilen],),
  ([Resminama beriji syýasaty], [ETSI TS 119 471], [Tamga Rulebook-yň resminama beriji düzgünleri], [Düzgünlere girizildi],),
  ([Resminama formaty], [IETF SD-JWT VC, ETSI TS 119 472-1, ISO\/IEC 18013-5 mdoc], [SD-JWT VC esasy; şahsyýet goşmaça mdoc (ADR-0006, ADR-0013)], [Işleýär],),
  ([Şahsyýet meýdanlary], [ÝB-niň 2026\/1731 Ýerine ýetiriş düzgünnamasy], [ÝB PID meýdan atlary; resminama PID däl (ADR-0045)], [Işleýär],),
  ([Bermek we görkezmek], [OpenID4VCI 1.0, OpenID4VP 1.0, DCQL, HAIP 1.0, ETSI TS 119 472-2\/-3], [Tamga bermek we görkezmek profilleri (Bölüm 9–10; ADR-0034)], [Işleýär],),
  ([Brauzerden görkezmek], [W3C Digital Credentials API, ISO\/IEC 18013-7], [Barlaýjy tarapy], [Barlaýjy taýýar; gapjyk meýilleşdirilen],),
  ([Ýakyn aralyk], [ISO\/IEC 18013-5 (Bluetooth)], [Maksat akymy; häzir köpri ýollar (ADR-0012)], [Meýilleşdirilen (enjam synagyna garaşýar)],),
  ([Gapjyk tassyklamalary], [ÝB-niň TS3 tehniki spesifikasiýasy], [24 sagatdan gysga WIA we açar tassyklamasy (ADR-0025)], [Işleýär; enjam tassyklamasy meýilleşdirilen],),
  ([Ýatyrylyş], [IETF Token Status List], [Ýatyrylyş sanawlary; mdoc üçin CWT (ADR-0008, ADR-0048)], [Işleýär],),
  ([Hasaba alyş], [ÝB-niň 2025\/848 Ýerine ýetiriş düzgünnamasy (2026\/1730 bilen), ETSI TS 119 475], [Umumy hasaba alyş maglumat toplumy; hasaba alyş sertifikaty, syýasaty we ýagdaý sanawy (ADR-0024, ADR-0026, ADR-0068)], [Işleýär],),
  ([Paýlaşmak düzgüni we lakam], [ÝB ARF 43-nji we 11-nji mowzuk], [Içine gurlan açyş syýasaty; saýt başyna lakam (ADR-0046, ADR-0031)], [Işleýär],),
  ([Şahsyýet barlagy], [ETSI TS 119 461], [Derejeleriň gabatlygy; üpjün ediji şertnamasy oňa salgylanýar], [Düzgünlere girizildi],),
  ([Waka habar bermek], [ÝB-niň 2025\/847 Ýerine ýetiriş düzgünnamasy], [Möhümlik derejeleri we möhletler (FW-TF-0001 §4.6)], [Düzgünlere girizildi],),
  ([Sertifikatly gapjyklaryň sanawy], [ÝB-niň 2025\/849 Ýerine ýetiriş düzgünnamasy], [Gabatlygy döwletiň goşulmagynda], [Meýilleşdirilen],),
  ([Resminama görnüşiniň düzgünleri], [ÝB Attestation Rulebook şablony 1.5], [Tamga Rulebook-yň şahalary], [Işleýär],),
  ([Nol bilimli subutnama], [Longfellow ZK (mdoc)], [Ýaş subutnamasy; zynjyrlar sanawda (ADR-0032, ADR-0044)], [Barlaýjy işleýär; gapjyk meýilleşdirilen],),
  ([Bilim manysy], [ELM 3 \/ Europass, ISCED-F, EQF], [Diplom meýdanlarynyň manysy (Education Rulebook)], [Işleýär],),
  ([Ynam nyşany], [ÝB gapjyk ynam nyşany], [Ulanylmaýar; "Tamga Network-de sanawda" görkezijisi (ADR-0049)], [Işleýär],),
))

Tablisa laýyklyk tassyklamasyny göterýär, sertifikat tassyklamasyny götermeýär: "işleýär" standartyň ulanylýandygyny we muny çeşme bilen görkezip bolýandygyny aýdýar; ony garaşsyz guramanyň tassyklandygyny aýtmaýar (Bölüm 20.5).

== ÝB hasaba alyş maglumatlary we sertifikatlar

ÝB-niň çemeleşmesinde gapjykdan maglumat soraýan her gurama ilki hasaba alynýar we hasaba alnanda bildirenden köp zat sorap bilmeýär (eIDAS 2.0 \[2\] 5b maddasy). Tamga şol bir logikany öz hasaba alyş edarasy we ÝB-niň öz maglumat toplumy hem-de sertifikat görnüşleri bilen gurýar; munuň maksady döwlet bu roly kabul edip alanda ýa-da ÝB barlaýjysy bu ýazgylara seredende ýat gurluş bilen ýüzbe-ýüz bolmazlygydyr.

Ýazgylar ÝB-niň umumy hasaba alyş maglumat toplumyny göterýär (2025\/848 \[6\] Ýerine ýetiriş düzgünnamasynyň I goşundysy, 2026\/1730 \[7\] üýtgetmesi bilen): resmi we söwda ady, şahsyýet belgisi, salgy, aragatnaşyk, her ulanyş üçin maksat we gizlinlik syýasaty, döwlet edarasydygy ýa-da däldigi, araçy gatnaşyklary we maglumatlary goramak edarasy. Diňe ýuridik şahslar hasaba alynýar; gapjygyň tassyklama ekrany, pozmak haýyşy we arz ýoly şu maglumata daýanýar (ADR-0024). Barlaýjy iki sertifikat göterýär. #{strong[Giriş sertifikaty]} onuň kimdigini aýdýar (ETSI TS 119 411-8 \[45\]; ADR-0058). #{strong[Hasaba alyş sertifikaty]} onuň nämä hasaba alnandygyny aýdýar: ETSI TS 119 475 \[46\] görnüşinde, mazmuny diňe gol çekilen sanawdaky ýazgydan gelýän, aýry hasaba alyş edarasynyň açary bilen gol çekilen we iň köp 12 aý güýjünde bolan sertifikat. Gapjyk soralan meýdanlary onuň bilen deňeşdirýär; sertifikatsyz haýyş ret edilýär, sertifikaty ýatyrylan haýyşa maglumat iberilmeýär (ADR-0026, ADR-0056, ADR-0068). Gapjyk üpjün edijileri bolsa öz çözgütlerini beýan edýär, laýyklyk synaglaryndan geçýär we tassyklama gol açarlary sanawlaryň sanawyna goşulýar (FW-TF-0001 §3.2).

ÝB ARF-iniň \[11\] iki mowzugy hem şol ýol bilen alyndy. 43-nji mowzuga görä resminama beriji öz resminamasynyň diňe belli barlaýjylara görkezilmegini talap edip biler; Tamga-da bu düzgün guramanyň gol çekilen tanyşdyryş maglumatynda çap edilýär, gapjyk ony barlaýjynyň sertifikatlary bilen deňeşdirýär, gabat gelmese duýdurýar we soňky karary adama goýýar (ADR-0046). 11-nji mowzugyň lakam düzgünleri saýt başyna lakam tertibi bilen madda-madda gabat getirildi (SPEC-WALLET-0001 §5.4.1; Bölüm 15.3).

== Hukuky ykrar toruň elinde däl

Bu bölümiň iň möhüm sözlemi şeýle: ÝB standartlary bilen tehniki laýyklyk ÝB-de hukuky ykrary aňlatmaýar. Tapgyryň on birinji makalasy \[76\] muny düzgünnamanyň tekstinden jikme-jik görkezdi; bu ýerde onuň Tamga üçin netijelerini jemleýäris (ADR-0035 hukuk belligi; FW-ARF-0001 §6.2).

Köp goýberilýän ýalňyşlyk 5f maddasyny üçünji ýurtlaryň ykrar edilmeginiň ýoly hasaplamakdyr. 5f maddasy ÝB-niň içindäki guramalaryň #{strong[ÝB gapjyklaryny]} kabul etmek borjudyr; onuň mowzugy düzgünnama laýyklykda hödürlenýän gapjyklara ÝB-niň içinde ynanylmagydyr. Düzgünnamada ÝB-den daşardaky ýurduň gapjygyny Ýewropa Sanly Şahsyýet Gapjygy hasaplaýan ýa-da ony oňa deň tutýan düzgün ýok.

"Üçünji ýurt" jümlesiniň geçýän esasy maddasy "Halkara ölçegi" atly 14-nji maddadyr we ol #{strong[ynam hyzmatlary]} bilen çäklenýär. 14(1)-nji madda görä üçünji ýurtda döredilen ynam hyzmaty üpjün edijileriniň hyzmatlary ýerine ýetiriş düzgünnamasy bilen ýa-da ÝB bilen şol ýurduň arasynda Ýewropa Bileleşiginiň Işleýşi hakyndaky Şertnamanyň 218-nji maddasyna laýyklykda baglaşylan ylalaşyk bilen ykrar edilse, ÝB-däki kwalifisirlenen ynam hyzmatlary bilen hukuk taýdan deňgüýçli hasaplanýar. 14(2)-nji madda üçünji ýurtdaky üpjün edijileriň ÝB-däki kwalifisirlenen üpjün edijilere ulanylýan şertleri kanagatlandyrmagyny we şol ýurduň ykrar edilen üpjün edijileriniň ynam sanawyny döredip çap etmegini talap edýär; 14(3)-nji madda özara bolmak şertidir. Bu ýoluň taraplary döwletlerdir: Türkiýe ýa-da başga türki döwlet bu ýola girip biler, Tamga Network ylalaşygyň tarapy bolup bilmez.

Toruň roly #{strong[tehniki taýýarlykdyr]}: ETSI görnüşindäki sanawlar, ETSI profilli sertifikatlar we tabşyrylyp bilinýän döwlet rollary. Döwlet bu ýola girmek islese, tor oňa synagdan geçen gural we şablon hödürläp biler; sanawyň eýesi şol döwlet bolar. ETSI TS 119 612 \[41\] XML görnüşiniň esaslarynyň biri şudur (ADR-0066). Komissiýa üçünji ýurtlaryň gol we möhür hyzmatlary üçin goşmaça aralyk ýoly \[14\] açdy: üçünji ýurt ynam sanawlarynyň sanawy we oňa bagly halkara laýyklyk pilody. Bu ýol döwletiň gözegçilik edýän gol we möhür üpjün edijilerini öz içine alýar we hukuk taýdan deňgüýçlilik bermeýär; Tamga-nyň sanawyndaky guramalar bu ýoluň mowzugy däl we Tamga döwlet bolmandygy üçin onuň öz sanawy oňa girmeýär (ADR-0066) (Surat 33).

#sekil(33, [Ykrar ýollary: tehniki ynam we hukuky ykrar], "figures/wp-tk/sekil-33.svg", yarim: false)

Gysga möhletde ýagdaý şeýle. Tamga-nyň sanawlarynyň sanawy ÝB-niň sanawlaryny şol bir federasiýa mehanizmi bilen, çägini resminama görnüşi boýunça çäklendirip görkezip biler (Bölüm 6.9); bu tehniki ynamdyr we häzir sanawda daşky sanaw ýok. Ters ugurda ÝB-däki barlaýjy Tamga resminamalaryny diňe öz islegi bilen, Tamga-nyň sanawyny öz ynam çeşmesine goşup kabul edip biler; bu hem hukuky ykrar däl we şeýle diýlip düşündirilmeýär. Aýnuryň ýewropaly hyzmatdaşy üçin häzirki jogap şeýle: resminama tehniki taýdan okalyp bilner, ýöne oňa beriljek güýç şol guramanyň öz düzgünlerine we degişli hukuga bagly.

== Laýyklygy nähili görkezýäris

"ÝB bilen laýyk" tassyklamadyr we subutnama talap edýär. Häzir laýyklyk dört ýol bilen görkezilýär; olaryň hiç biri sertifikat däl.

#{strong[Açyk laýyklyk synaglary.]} Resminama berijiniň, barlaýjynyň we gapjyk üpjün edijisiniň nämä görä synalýandygy ammarda hemmä açyk we wersiýaly; wektorlar şahsy maglumat we ýapyk açar saklamaýar. Borçnama synaglary azyndan şulary barlaýar: köne sanaw "barlap bolmady" netijesini berýär, näbelli formatda we gol säwliginde amal togtaýar. Synaglar her çapdan öň hökmany (FW-TF-0001 §4.3; RB-ENF-01).

#{strong[OpenID öz-synagy.]} 2026-njy ýylyň oktýabrynda şahsyýet hyzmaty we Tamga Verify sandbox-da OpenID Foundation-yň laýyklyk synag meýilnamalaryny \[33\] geçirdi: HAIP \[32\] we FAPI 2.0 bilen OpenID4VCI (63 modul) we HAIP bilen OpenID4VP (14 modul). Resminama beriş tarapynyň soňky geçirilişi şowsuz modulsyz, barlaýjy tarapynyňky şowsuz modulsyz we duýduryşsyz tamamlandy. Barlaýjy geçirilişi haýyşyň işlenişiniň 29-njy oktýabrda üýtgemeginden öň boldy we täzeden geçiriler; gapjyk meýilnamalary enjam ýygnamasyny talap edýändigi üçin geçirilmedi. Bu OpenID Foundation-yň öz guraly bilen edilen öz-synagdyr; sertifikatlaşdyrmak aýratyn prosesdir. Öwrenilenler açyk çeşmeli synag toplumy hökmünde çap edildi.

#{strong[ETSI sanawynyň ÝB guraly bilen okalmagy.]} Sandbox-daky ETSI TS 119 612 XML sanawy ETSI-niň resmi XML shemasyna we ÝB-niň gol barlag guralyna (DSS) garşy barlandy. Gural goly we salgylanmalary sagdyn tapdy; gol çekiji ÝB-de ynam labyry bolmandygy üçin netije "kesgitsiz" boldy we bu garaşylýan netijedir (ADR-0066). Barlag diňe formatyň dogrudygyny subut edýär; ykrar manysyny götermeýär.

#{strong[Bilelikde işlemek çäreleri.]} ÝB-niň bilelikde işlemek çärelerine gatnaşmak çarçuwada göz öňünde tutulan (FW-ARF-0001 §7.3) we #{strong[meýilleşdirilen]} ýagdaýda. Döwletler goşulanda bu ýeňil laýyklyk tertibiniň üstüne garaşsyz baha beriş edaralary we milli sertifikatlaşdyrma goşular (FW-TF-0001 §2.4).

== At we nyşan

Laýyklygyň dili hem laýyklygyň bölegidir. "EUDI Wallet", ýagny Ýewropa Sanly Şahsyýet Gapjygy, ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän we ÝB düzgünlerine görä sertifikatlaşdyrylan gapjygyň hukuk adydyr; ÝB-den daşardaky guramanyň gapjygy bu derejäni alyp bilmeýär we ÝB ynam nyşanyny ulanyp bilmeýär (FW-ARF-0001 §1.4; ADR-0035 PO4). Tor öz sanawyndaky gapjyklar üçin öz ýazuw görnüşindäki görkezijisini ulanýar: "Tamga Network-de sanawda". Görkezijiniň logosy ýok, ÝB ýyldyzlary we reňkleri ulanylmaýar; basylanda gol çekilen sanawdaky üpjün ediji ýazgysy açylýar we ýazgy sanawdan çykanda görkeziji ýitýär (ADR-0049). Tablisa 38 hemmä açyk her tekstde eýerilýän dili jemleýär.

#tablo([#{strong[Tablisa 38.]} Näme diýip bileris, näme diýip bilmeris (ADR-0035 hukuk belligi we PO4; ADR-0049; ADR-0066 TX2).], (28fr, 19fr, 44fr), ([Jümle], [Ulanylýarmy​​​​], [Sebäbi],), (
  (["ÝB bilen laýyk", "ÝB standartlarynda"], [Hawa], [Şol bir formatlar, protokollar we sanaw modeli; synaglar bilen goldanýar],),
  (["OpenID öz-synagy edildi"], [Hawa], [Gerimi we senesi ýazylyp],),
  (["Tamga Network-de sanawda"], [Hawa], [Toruň öz ýazuw görnüşindäki görkezijisi],),
  (["EUDI Wallet", "Ýewropa Sanly Şahsyýet Gapjygy"], [Ýok], [Agza döwlete degişli hukuk derejesi],),
  (["ÝB ynam nyşany", ÝB ýyldyzlary], [Ýok], [ÝB-den daşarda ulanyp bolmaýar],),
  (["Sertifikatly"], [Ýok], [Sertifikatlaşdyrmak aýratyn prosesdir we geçirilmedi],),
  (["Kwalifisirlenen", "habar berlen sanaw"], [Ýok], [Resminama berijiler kwalifisirlenen däl; sanaw 910\/2014 boýunça habar berilmedi],),
  (["ÝB-de güýjünde", "ÝB bilen özara ykrar"], [Ýok], [Hukuky ykrar döwletara ylalaşygy talap edýär],),
  (["Milli gapjyk"], [Ýok], [Tor gapjyk işletmeýär we hiç bir döwletiň adyndan gürlemeýär],),
))

Bu düzgünleriň maksady okyjyny Tamga-nyň bolşundan uly bir zatdygyna ynandyrmazlykdyr. Toruň aýdyp biljek zady Ýewropanyň saýlan dilinde gürleýändigi we muny her kesiň synap biljek görnüşinde görkezýändigidir. Şol diliň Ýewropada hukuk taýdan nämä gabat geljekdigini döwletler karar eder.

= Kararlar we Olaryň Esaslary

Bu resminamanyň dowamynda her möhüm saýlawy karar ýazgysyna bagladyk. Okyjy saýlawyň esasy bilen gyzyklananda ADR belgisi arkaly karar ýazgysynyň doly tekstine geçip biler; ol ýerde meseläniň nähili ýüze çykandygyny, haýsy wariantlaryň deňeşdirilendigini we haýsysynyň näme üçin saýlanandygyny tapar. Bu bölüm kararlary bir ýerde hödürleýär. Ilki kararyň nähili kabul edilýändigini, soňra on uly karary jikme-jik, ondan soň kabul edilen ähli kararlary mowzuklary boýunça we iň soňunda wagtyň geçmegi bilen üýtgän kararlary düşündirýär.

== Karar nähili kabul edilýär

Tamga-da hökmany saýlaw ýazmaça karar ýazgysy bilen başlaýar. Düzgün gysga we toruň her ammarynda şol bir söz bilen gaýtalanýar: ilki karar ýazgysy, soňra kod. Karar ýazgysy dört soraga jogap berýär. Haýsy ýagdaý karary talap etdi, haýsy wariantlara seredildi, haýsysy saýlandy we munuň netijeleri näme boldy? Ýazgylaryň köpüsi mundan başga-da kararyň döredýän hökmany düzgünlerini, ýagny üýtgewsiz düzgünleri gysga kodlar bilen sanaýar; meselem, ADR-0017-niň düzgünleri #{raw("HV1")}, #{raw("HV2")} diýlip atlandyrylýar we laýyklyk synaglary şu kodlara salgylanýar.

Ýazgy üç ýagdaýdan geçýär. #{strong[Teklip]} (#{emph[Proposed]}) tapgyrynda karar ýazyldy, ýöne hökmany däl. Taslama dolandyryşy karary kabul edende ýazgy #{strong[işjeň]} (#{emph[Active]}) bolýar we kabul edilen senesi ýazga alynýar; täsir eden spesifikasiýalar we çarçuwa resminamalary şol bir işde täzelenýär. Ýapylan karar diňe täze karar ýazgysy bilen üýtgeýär. Üýtgän ýazgy pozulmaýar; ol #{strong[ýerini başgasyna berdi]} (#{emph[Superseded]}) diýlip bellenýär ýa-da täze ýazgy köne ýazgynyň haýsy bendini üýtgedendigini aç-açan ýazýar. Şeýlelikde kararyň häzirki görnüşi bilen bir hatarda onuň bu görnüşe nähili gelendigini hem okap bolýar.

Bu neşiriň taýýarlanan senesinde 72 karar ýazgysy bar: 70-si işjeň, biri teklip ýagdaýynda (ADR-0028) we biri ýerini başga karara beren (ADR-0003). Ähli ýazgylaryň belgisi, ady, ýagdaýy we kabul edilen senesi B goşmaçasynda.

== On uly karar

Ýazgylaryň hemmesi deň agramly däl. Aşakdaky on karar toruň keşbini kesgitleýär; galanlarynyň köpüsi olaryň jikme-jiklikleridir. Olaryň her biri üçin soragy, wariantlary, saýlawy, esasy we saýlawyň bahasyny gysgaça berýäris. Jikme-jiklikler degişli bölümlerde.

#{strong[1\. Resminama formaty: SD-JWT VC \[16\] we şahsyýet üçin goşmaça mdoc \[34\] (ADR-0006, ADR-0013).]} Sorag resminamanyň haýsy formatda kodlanjakdygydy. SD-JWT VC saýlap açmagy içine gurlan görnüşde hödürleýär, ÝB-niň esasy formatydyr we JSON-LD esasly formatlardan has ýönekeýdir; şonuň üçin ol esasy format boldy. Şahsyýet resminamasy üçin ýeke format ýetmedi. iOS brauzeri arkaly görkezmek we ýakyn aralyk mdoc talap edýär, ÝB hem şahsy şahsyýet maglumatlaryny iki formatda kesgitleýär. Seredilen beýleki iki ýol diňe SD-JWT VC-de galmak we doly mdoc-a geçmekdi; birinjisi brauzer ýoluny ýapýar, ikinjisi web akymlary üçin has ýönekeý bolan hatary bozardy. Onuň bahasy şahsyýet resminamasy üçin ikinji bermek we barlag kody hem-de onuň synaglarydyr (Bölüm 8).

#{strong[2\. Guramanyň şahsyýeti X.509 \[28\], adama global belgi ýok (ADR-0004).]} Guramalaryň şahsyýeti üçin tora mahsus merkezleşdirilmedik belgi profili bilen X.509 sertifikatlarynyň arasynda saýlaw edildi. Guramalar elektron gol we möhür üçin eýýäm X.509 ulanýar, onuň kanunçylykda gabatlygy bar we ÝB-niň kwalifisirlenen sertifikat tertibi şu esasda; tora mahsus profil güýjünden düşürildi. Şol karar adamlar üçin ters ýörelgäni goýýar: adama tor boýunça hemişelik belgi berilmeýär. Onuň bahasy sertifikat täzelenende guramanyň belgisiniň hem üýtgemegi we dowamlylygyň mirasdüşerlik baglanyşygy bilen gurulmagydyr (Bölüm 6.7, 7.1).

#{strong[3\. Zynjyrsyz başlangyç we iki garaşsyz operator çägi (ADR-0009, ADR-0051).]} Sorag umumy kitabyň haçan guruljakdygydy. Wariantlar pilotu kitabyň gurulmagyna baglamak, ýeke operatorly işläp düzmek zynjyry bilen başlamak we kitaby bir çäge baglap, gol çekilen sanawlar bilen başlamakdy. Ýeke operatoryň dört düwni şol operatoryň gol çeken sanawyndan artyk ynam döretmeýändigi üçin üçünji ýol saýlandy. Kitap azyndan iki garaşsyz operatoryň ýazmaça razylygy bilen gurulýar we gurlanda-da gol çekilen sanawlaryň proýeksiýasy bolýar. Onuň bahasy häzir ynamyň ýeke gol çekijä daýanmagydyr; bu galyndy töwekgelçilik Bölüm 23-de L1 hökmünde ýazylan (Bölüm 19).

#{strong[4\. Ýatyrylyş sanawy zynjyryň daşynda (ADR-0008).]} Ýatyrylyş maglumatynyň bit hataryny umumy kitapda saklamak hemişelik we barlanyp bilinýän ýaly görünýär. Ýöne haýsy bitiň haçan üýtgändigini hemmä açyk kitapda yzarlap bolýar; düwün işledýänler resminamanyň ýatyrylan pursatyny öwrenýär. Karar bit hataryny resminama berijiniň gol çeken we kesgitli aralyk bilen çap edýän sanawynda saklaýar; kitap gurulsa, ol diňe sanawyň heşini göterýär. Kriptografik akkumulýator ýa-da nol bilim bilen ýatyrylyş yza süýşürildi, gysga ömürli resminama ýoly bolsa bölekleýin kabul edildi. Onuň bahasy ýatyrylyşyň bir çap aralygy gijikme bilen güýje girmegidir (Bölüm 12).

#{strong[5\. Tor diňe tordur we gapjyk işletmeýär (ADR-0037, ADR-0042).]} Ilkinji ýerleşiş karary toruň üstünde önümleri we hyzmatlary hem göz öňünde tutýardy we sanawy dolandyrýan tarapyň hyzmat satmagynyň dartgynlylyk döredýändigini özi belläpdi. ADR-0037 bu dartgynlylygy aýyrdy: täjirçilik hyzmatlary toruň daşyndaky kompaniýalar tarapyndan öz atlary bilen hödürlenýär. ADR-0042 şol ýörelgäni gapjyklara ulandy; toruň bir gapjygyň üpjün ediji hyzmatyny işletmegi dowam etdirmegi we gapjyklar üçin aýry synag gurşawyny gurmagy ret edildi. Onuň bahasy toruň ilkinji gapjygynyň hem öz üpjün edijisini toruň daşynda gurmaga mejbur bolmagydyr (Bölüm 4.3, 5.4).

#{strong[6\. Wagtlaýyn şahsyýet resminamasy üpjün edijisi, kwalifisirlenmedik (ADR-0011, ADR-0022).]} Döwletiň şahsy şahsyýet maglumatlary üpjün edijisi ýok wagty guramalaryň adamy ygtybarly tanap bilmegi gerekdi. Wariantlar her guramanyň öz şahsyýet barlagyny geçirmegi, döwlete garaşmak we şahsyýet belgisini götermeýän resminamady; birinjisi adamy her guramada täzeden barladýar, ikinjisiniň senesi ýok, üçünjisi atdaşlarda gabat getirmegi näbelli edýär. Saýlanan ýol toruň wagtlaýyn şahsyýet hyzmatyny işletmegi we PID bolmadyk resminama bermegidir. Hyzmatyň synpy hem aýry karar bilen kwalifisirlenmedik atribut tassyklamasy we I2 hökmünde berkidildi; "kwalifisirlenen" garaşsyz baha bermegi talap edýär. Onuň bahasy toruň bu hyzmat üçin maglumat jogapkäri bolmagydyr (Bölüm 14).

#{strong[7\. Ygtyýarly çeşme guramada, gol açary hem guramada (ADR-0020, ADR-0057).]} Ýerleşdirilen resminama beriş hyzmaty guramalar üçin amatly, ýöne iki töwekgelçiligi bar: adam ýazgylarynyň torda jemlenmegi we gurama açarynyň operatorda durmagy. ADR-0020 adam ýazgylaryny torda saklamagy ret etdi; maglumat gol çekilýän pursatda guramanyň sorag nokadyndan okalýar we saklanmaýar. ADR-0057 açary serwerde faýlda saklamagy, ýeke bulut üpjün edijisine baglanmagy we tora mahsus gol nokadyny kesgitlemegi ret etdi; hyzmat goly CSC API v2 \[54\] bilen soraýar we garşy tarapa diňe heş iberýär. Onuň bahasy guramanyň sorag nokadyny we gol hyzmatyny işletmegidir (Bölüm 5.2, 7.6, 9.2).

#{strong[8\. Saýt başyna lakam (ADR-0031).]} "Tamga bilen gir" saýta adamyň kimdigini her gezek şol bir görnüşde aýtmalydy, ýöne iki saýt şol bir adamy gabat getirip bilmeli däldi. Bäş usula seredildi: gapjygyň tötänleýin syry (telefon çalşylanda hasaplar ýitýär), passkey (şahsyýet götermeýär), resminama berijiniň saýt başyna belgi döretmegi (haýsy saýta girlendigini öwrenýär), şahsyýetden alynýan tohum we nol bilimli subutnama bilen almak. Häzir dördünjisi ulanylýar; bäşinjisi maksatdyr. Onuň bahasy şahsyýet hyzmatynyň tohum açaryny we adamyň şahsyýet belgisini bilelikde ulanyp, lakamy nazary taýdan alyp bilmegidir (Bölüm 15.3).

#{strong[9\. Nol bilimli subutnama we gysga ömürli nusgalar (ADR-0032, ADR-0044).]} Gurama bilen barlaýjy şol bir resminamanyň goluny deňeşdirip, adamy gabat getirip biler. Resminamany üýtgetmezden, ol barada subutnama düzmek bu baglanyşygy üzýär; ilkinji tassyklama ýaş çägidir. Ýöne subutnama ýatyrylyş sanawyndaky orny hem gizleýändigi üçin ýatyrylyşy hödürlemede barlap bolmaýar. Ýatyrylyş sanawly subutnama we uzak ömürli nusga ret edildi; ZK hödürlemesi iň köp 24 sagat güýjünde, ümsümlik bilen täzelenýän nusgalar bilen edilýär. Onuň bahasy ýatyrylyşyň ZK hödürlemesinde iň giç 24 sagatda güýje girmegi we nusga täzelemesiniň şahsyýet hyzmatynda işjeňlik yzyny galdyrmagydyr (Bölüm 15.4).

#{strong[10\. ÝB-niň ýoly: WIA we KA, HAIP \[32\], hasaba alyş sertifikaty, howpsuz deslapky ýagdaýlar (ADR-0025, ADR-0034, ADR-0026, ADR-0056).]} Bu dört karar şol bir ýörelgäniň ulanylyşydyr: ÝB-niň saýlan çözgüdi bar wagty tora mahsus çözgüt ýazylmaýar. Ýeke we 30 gün güýjünde bolan gapjyk tassyklamasynyň ýerine ÝB-niň 24 sagatdan gysga ömürli we her amalda täze açarly WIA-sy hem-de açar tassyklamasy kabul edildi. Barlaýjynyň müşderi belgisi HAIP-iň talap edişi ýaly giriş sertifikatynyň heşi boldy. Hasaba alyş sertifikatyny döretmezlik ÝB-de islege baglydy, ýöne ÝB gapjyklarynyň Tamga barlaýjylarynyň çägini bilip bilmegi üçin ony döretmek saýlandy. Paketlerde barlagy geçirýän ýumşak deslapky ýagdaýlar hem aýryldy; geçmek indi koda aç-açan ýazylmaly bahadyr. Onuň bahasy integratorlaryň her wersiýada has berk düzgünlere uýgunlaşmagydyr (Bölüm 7.5, 10.1, 13.3, 16.4).

Surat 34 bu kararlary we olaryň arasyndaky "daýanýar" we "üýtgedýär" baglanyşyklaryny mowzuklar boýunça görkezýär.

#sekil(34, [Kararlar kartasy: uly kararlar we olaryň arasyndaky baglanyşyklar], "figures/wp-tk/sekil-34.svg", yarim: false)

== Ähli kararlar

Aşakdaky ýedi tablisa ähli işjeň kararlary mowzuklary boýunça tertipleşdirýär: ynam we sanawlar (Tablisa 39), resminama we shema (Tablisa 40), protokol (Tablisa 41), gapjyk (Tablisa 42), şahsyýet (Tablisa 43), gizlinlik (Tablisa 44) hem-de dolandyryş, ýerleşiş we kitap (Tablisa 45). Her setir karary bir sözlem bilen, onuň esasyny we karar ýazgysynda galdyrylan esasy wariantyny berýär. Esas we wariant sütünleri karar ýazgylarynyň "Kontekst" we "Seredilen wariantlar" bölümlerinden gysgaldyldy; karar ýazgysy wariantyny aç-açan ara alyp maslahatlaşmaýan bolsa, sütünde diňe ýazgynyň öz deňeşdirmesi ýazylýar.

#tablo([#{strong[Tablisa 39.]} Ynam we sanaw kararlary.], (48fr, 44fr, 41fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0004.]} Guramanyň şahsyýeti X.509; adama global belgi ýok], [Guramalar eýýäm sertifikatly; kanunçylykda gabatlygy bar], [Tora mahsus DID gurama profili],),
  ([#{strong[ADR-0015.]} Gapjyk hem goşulyp, ýeke-täk ynam interfeýsi (#{raw("TrustSource")})], [Şol bir düzgün iki gezek ýazylmaýar; kitaba geçilende interfeýs üýtgemeýär], [Gapjykda aýry barlag; her soragy toruň serwerinden soramak],),
  ([#{strong[ADR-0024.]} Ýazgylarda ÝB-niň umumy hasaba alyş maglumat toplumy], [Tassyklama ekrany, pozmak we arz şu maglumata daýanýar], [Köne dar ýazgy],),
  ([#{strong[ADR-0026.]} Hasaba alyş sertifikaty (ETSI TS 119 475)], [Gapjyk barlaýjynyň çägini barlap bilsin], [Hasaba alyş sertifikatyny döretmezlik; barlaýjy başyna ýeke sertifikat],),
  ([#{strong[ADR-0036.]} Daşky sanawlar bilen federasiýa: salgy, berkidilen gol çekiji, çäk, razylyk], [Döwlet sanawlaryny we ÝB görnüşlerini tanap bilmek], [Daşky ýazgylary öz sanawyna göçürmek],),
  ([#{strong[ADR-0046.]} Içine gurlan açyş syýasaty (ÝB ARF 43-nji mowzuk)], [Guramanyň paýlaşmak düzgüni; soňky karar adamda], [Düzgüni resminamanyň içine goýmak; baglanyşyk bilen ýüklemek],),
  ([#{strong[ADR-0050.]} Gurama sertifikat profili ETSI TS 119 412-6], [Ýazgy bilen gabat gelýän gurama belgisi sertifikatda], [Belgini diňe sanawda saklamak],),
  ([#{strong[ADR-0058.]} Giriş sertifikaty ETSI TS 119 411-8; şahsyýet hyzmatynyň sertifikaty gaznaga tabşyrylanda täzelenýär], [ETSI profili; bir gezeklik täzeden almak], [Şahsyýet hyzmatynyň sertifikatyny derrew çalyşmak],),
  ([#{strong[ADR-0066.]} ETSI TS 119 612 XML görnüşi, şol bir çeşmeden we şol bir wersiýa bilen], [ÝB we üçünji ýurt gurallary XML talap edýär], [Aýry hasaba alyş kitabyndan XML; "kwalifisirlenen" ETSI salgylary],),
  ([#{strong[ADR-0068.]} Hasaba alyş sertifikatynyň syýasaty we 1 bitli ýagdaý sanawy], [Sertifikaty yzyna alyp bolmagy], [Ýagdaýsyz sertifikat],),
))

#tablo([#{strong[Tablisa 40.]} Resminama we shema kararlary.], (48fr, 44fr, 38fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0006.]} SD-JWT VC esasy; OpenID4VCI we OpenID4VP; ES256; enjam baglanyşygy kadadan çykmasyz], [ÝB-niň esasy toplumy; baglanyşyk bolmasa resminama başga birine geçýär], [JSON-LD esasly format (esaslandyrmada deňeşdirilýär)],),
  ([#{strong[ADR-0007.]} Shema katalogy zynjyryň daşynda, bitewilik heşi hökmany, wersiýaly], [Barlaýjy kesgitlemäniň üýtgändigine düşünmeli], [Shemany doly zynjyrda saklamak; erkin #{raw("vct")}],),
  ([#{strong[ADR-0010.]} #{raw("vct")} URN, katalogdan çözülýär; kategoriýa signaly], [Görnüş belgisi domen adyna baglanmaly däl], [Durnukly HTTPS salgysy hökmünde #{raw("vct")}],),
  ([#{strong[ADR-0013.]} Şahsyýet resminamasy goşmaça mdoc], [Brauzer we ýakyn aralyk mdoc talap edýär; ÝB PID mysaly], [Diňe SD-JWT VC; doly mdoc],),
  ([#{strong[ADR-0014.]} Gurama synplaryna diňe çäre synpy goşulýar], [Hakyky ulanyş gelmezden synp açylmaýar], [Ulag we aragatnaşyk synplaryny hem goşmak],),
  ([#{strong[ADR-0021.]} E-poçta we telefon resminamalary; salgy saklanmaýar], [Barlanan aragatnaşyk zerurlygy], [Salgyny şahsyýet resminamasyna goşmak; ikisi bir resminamada],),
  ([#{strong[ADR-0029.]} Işläp düzmek döwründe shemalar ýerinde düzedilýär], [Bu döwürde yza laýyklyk ýüki göterilmeýär], [Her düzedişde täze wersiýa],),
  ([#{strong[ADR-0039.]} Sürüjilik şahadatnamasynyň maglumaty (resmi resminama däl, mDL däl)], [Barlanan maglumat zerurlygy; resmi resminama bilen garyşmasyn], [Resmi mDL resminama görnüşi bilen bermek; maglumaty şahsyýet resminamasyna goşmak],),
  ([#{strong[ADR-0045.]} Şahsyýet meýdanlary ÝB PID kodlamasy bilen], [2026\/1731 Ýerine ýetiriş düzgünnamasy bilen laýyklaşdyrmak], [Köne meýdan atlary],),
  ([#{strong[ADR-0064.]} #{raw("age_over_15")} goşulýar; ýaş çäkleri ýapyk toplum], [15 ýaş çägi zerurlygy (hukuk pikiri däl)], [Diňe 18; açyk toplum],),
))

#tablo([#{strong[Tablisa 41.]} Protokol kararlary.], (48fr, 30fr, 29fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0012.]} Ýakyn aralyk üçin köpri ýollar; maksat ISO\/IEC 18013-5], [Bluetooth enjamda taýýar bolýança], [ISO\/IEC 18013-5-i derrew etmek; doly resminamany QR-a goýmak],),
  ([#{strong[ADR-0016.]} Ýerleşdirilen resminama beriş hyzmatyna kireýçä bagly çäkli giriş], [Gurama öz serwerinden çagyryp bilsin], [Ýeke paýlaşylýan administrator açary],),
  ([#{strong[ADR-0017.]} Barlag netijesine diňe gol çekilen beýan bilen we bir gezeklik okamak bilen giriş], [Netije salgysy hemmä açykdy], [Belgini bilýän her kime jogap],),
  ([#{strong[ADR-0034.]} HAIP 1.0: #{raw("x509_hash")} müşderi belgisi; WIA #{raw("sub")} umumy], [HAIP talaby; hemişelik ýazgy #{raw("dns_name")}], [#{raw("x509_san_dns")}-de galmak; iki prefiksi birden kabul etmek],),
  ([#{strong[ADR-0048.]} Şahsyýet görnüşlerinde togtatma ýok; mdoc üçin CWT sanawy], [ÝB PID düzgüni], [Şahsyýetde togtatma],),
  ([#{strong[ADR-0056.]} Paket API-lerinde howpsuz deslapky ýagdaýlar], [Barlagy geçirýän deslapky ýagdaý bolmasyn], [Ýumşak deslapky ýagdaý we duýduryş],),
  ([#{strong[ADR-0059.]} Bir giriş belligi bilen birnäçe resminama haýyşy (iň köp 10 nusga)], [OpenID4VCI 1.0 we ÝB salgylanmasy], [Bir gezeklik bellik],),
  ([#{strong[ADR-0060.]} Täzeleme belligi müşderi nusgasynyň açaryna bagly], [Attestation profili; DPoP açary üýtgäp biler], [DPoP açaryna baglanyşyk],),
  ([#{strong[ADR-0062.]} ZK nusgasynyň täzeleme belligi diňe çägi soralanda], [Çäk ýörelgesi (RFC 6749 \[19\] §6)], [Her şahsyýet ygtyýarynda bermek],),
  ([#{strong[ADR-0065.]} Gapy terminaly özüni terminal açary bilen tanadýar], [QR-y gören adam bileti sarp edip bilmesin], [Belgisiz nokat],),
  ([#{strong[ADR-0067.]} Haýyş obýektiniň her alnyşy aýry şaha], [Ýasama ret hüjümi], [Ýeke haýyş obýekti],),
  ([#{strong[ADR-0069.]} Gapy toparlary sanawda; terminal açary guramanyň adyndan], [Gurama diňe öz gapylaryny dolandyrsyn], [Operator boýunça umumy açar],),
))

#tablo([#{strong[Tablisa 42.]} Gapjyk kararlary.], (48fr, 28fr, 36fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0023.]} Nusgalar ümsümlik bilen täzelenýär], [Nusgalar gutarýar; ÝB düzgünleri], [Her täzelemede adamdan soramak],),
  ([#{strong[ADR-0025.]} WIA (24 sagatdan gysga) we açar tassyklamasy, ÝB TS3 modeli], [Baglanyşyksyzlyk; ÝB modeli], [Ýeke, 30 günlük gapjyk tassyklamasy],),
  ([#{strong[ADR-0047.]} Birligi ýatyrmak, gapjykdan daşary ýatyrylyş ýoly; enjam tassyklamasy diňe iň ýokary derejede hökmany], [ÝB şablonyndaky açyk meseleler], [Gurama resminamalarynda zynjyrlaýyn ýatyrylyş; her derejede enjam tassyklamasy],),
  ([#{strong[ADR-0049.]} "Tamga Network-de sanawda" ýazuw görnüşindäki görkeziji], [ÝB ynam nyşanyny ÝB-den daşarda ulanyp bolmaýar], [ÝB nyşany ýa-da logo],),
))

#tablo([#{strong[Tablisa 43.]} Şahsyýet kararlary.], (48fr, 44fr, 30fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0005.]} Iki okly kepillik (adam T0–T3, gurama I1–I3); döwletsiz başlangyç], [eIDAS kepillik derejeleri bilen gabatlyk; döwlet ýok wagty bar bolan ynamy kabul etmek], [Ynamy ýeke san bilen ölçemek],),
  ([#{strong[ADR-0011.]} PID ýok wagty wagtlaýyn şahsyýet resminamasy üpjün edijisi (PID däl)], [Şahsyýetiň bir ýerde barlanmagy; guramalaryň gabat getirip bilmegi], [Her guramada aýry barlag; şahsyýet belgisiz resminama],),
  ([#{strong[ADR-0020.]} Ygtyýarly çeşme guramada; tor adam ýazgysyny saklamaýar], [Maglumat öz çeşmesinde galýar], [Adam ýazgysyny torda saklamak],),
  ([#{strong[ADR-0022.]} Şahsyýet hyzmaty kwalifisirlenmedik, I2], ["Kwalifisirlenen" garaşsyz baha bermegi talap edýär], [Kwalifisirlenen synp ýa-da I3],),
  ([#{strong[ADR-0033.]} Dükan synlaýşy üçin bir gezeklik kod], [Hakyky şahsyýetsiz synlamak; her gapjyga deň], [Programmada hemişelik synag tertibi],),
  ([#{strong[ADR-0043.]} Ýaş çägi ýok], [eIDAS 2.0 iň az ýaşy göz öňünde tutmaýar], [Ýaş çägini goýmak],),
  ([#{strong[ADR-0057.]} Ýerleşdirilen beriş hyzmatynda gurama açary guramada (CSC API v2)], [Açar operatorda galyp bilmeýär], [Açary hyzmatda faýlda saklamak],),
))

#tablo([#{strong[Tablisa 44.]} Gizlinlik kararlary.], (48fr, 35fr, 36fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0008.]} Ýatyrylyş bit hatary zynjyryň daşynda, gol çekilen sanawda], [Ýatyrylyş pursaty düwünlere syzmasyn], [Bit hataryny zynjyrda saklamak],),
  ([#{strong[ADR-0027.]} Žurnal diňe adamyň başladan şifrlenen eksporty bilen çykýar], [ÝB TS10 talaby we enjamda galmak ýörelgesi], [Žurnalyň asla çykmazlygy],),
  ([#{strong[ADR-0031.]} Saýt başyna lakam; şahsyýetden alnan tohum], [Saýtlar gabat getirip bilmeýär; täze telefonda şol bir hasap], [Gapjygyň tötänleýin syry; resminama berijiniň döreden belgisi],),
  ([#{strong[ADR-0032.]} Longfellow ZK bilen mdoc hödürlemesi; ilkinji tassyklama ýaş], [Resminama üýtgemezden baglanyp bilinmeýän subutnama], [Diňe toplumlaýyn nusga (ätiýaç hökmünde galdy)],),
  ([#{strong[ADR-0044.]} ZK hödürlemesi iň köp 24 sagatlyk nusgalar bilen], [ZK-da ýatyrylyşy barlap bolmaýar], [Ýatyrylyş sanawly ZK; uzak ömürli nusga],),
  ([#{strong[ADR-0061.]} Lakam tohumy aýry resminama konfigurasiýasy], [Standarta laýyklyk], [Standartdan daşary jogap meýdany],),
))

#tablo([#{strong[Tablisa 45.]} Dolandyryş, ýerleşiş we kitap kararlary.], (48fr, 35fr, 35fr), ([Karar], [Esas], [Galdyrylan wariant],), (
  ([#{strong[ADR-0001.]} Kitap gelse Hyperledger Besu we QBFT], [Rugsatly, deň ses, derrew gutarnyklylyk; ÝB mysaly], [Cosmos SDK; noldan ylalaşyk; hemmä açyk zynjyr],),
  ([#{strong[ADR-0002.]} Özygtyýarlylygy ileri tutýan üç gatlakly dolandyryş], [Her döwlet öz ýazgysynyň ýeke-täk ýazyjysy; çykmak hukugy], [Esaslandyryjy konsorsium we umumy ses bermek],),
  ([#{strong[ADR-0009.]} Zynjyrsyz başlangyç; zynjyr azyndan iki garaşsyz operator bilen], [Ýeke operatoryň zynjyry ynam döretmeýär], [Zynjyra garaşmak; ýeke operatorly işläp düzmek zynjyry],),
  ([#{strong[ADR-0018.]} Resminamalaryň üç derwezesi; türkçe çeşme, iňlisçe resmi terjime], [Okyja görä bölmek; ÝB tertibi], [Ähli resminamalary bir saýtda jemlemek],),
  ([#{strong[ADR-0019.]} Gurama konsoly we maglumatlar bazasy], [Gurama işleri bir ýerde; adam gapjykdan soraýar], [Talyp portaly we faýl esasly ýazgy],),
  ([#{strong[ADR-0030.]} Önüm atlary], [Yzygiderli at], [Köne önüm ady],),
  ([#{strong[ADR-0035.]} Üç gatlakly ýerleşiş], [Her gatlak özbaşdak gymmat göterýär], [Diňe ÝB bilen laýyk gapjyk; ilki agyr gurama],),
  ([#{strong[ADR-0037.]} Tor diňe tordur; täjirçilik hyzmatlary daşarda], [Bitaraplyk; tabşyrylyp bilinmek], [Hyzmatlaryň toruň içinde galmagy],),
  ([#{strong[ADR-0038.]} Aýry sandbox synag tory], [Hakyky tordan doly aýrylyk], [Hakyky torda synag guramalary],),
  ([#{strong[ADR-0040.]} Sandbox-da ýokarky çäkli hakyky şahsyýet barlagy ýoly], [Hakyky akymy synap bolmagy], [Diňe ýasama adam],),
  ([#{strong[ADR-0041.]} Sandbox-da gurama synag hasaplary], [Guramalaryň özbaşdak synamagy], [Konsolsyz sandbox],),
  ([#{strong[ADR-0042.]} Tor gapjyk işletmeýär, sanaýar], [ÝB rol bölünişigi; bitaraplyk], [Toruň bir gapjygyň üpjün edijisini işletmegi; aýry gapjyk sandbox-y],),
  ([#{strong[ADR-0051.]} Zynjyr gol çekilen sanawlaryň proýeksiýasydyr], [Çeşme ýeke; barlag zynjyra mätäç däl], [Zynjyryň çeşme bolmagy],),
  ([#{strong[ADR-0052.]} Besu ýerli rugsat bermek], [Besu 25.6.0 zynjyryň üstündäki rugsady aýyrdy], [Zynjyryň üstündäki rugsat şertnamasy],),
  ([#{strong[ADR-0053.]} Sanaw labyrynda bäsdeş dalaşgärler], [Ilki ýazan gulplap bilmesin], [Ilki ýazanyň bahasy gulplaýar],),
  ([#{strong[ADR-0054.]} Shema at meýdany, döwletara baglanyşyk, kwota çägi], [Ady eýelemek we kwotadan gaçmak bolmasyn], [At bellemek; shema belgisine döwlet koduny goşmak],),
  ([#{strong[ADR-0055.]} Ýokarlandyrmakda 7 gün garaşmak; görnüşi belli ýazgy teklipleri], [Razy bolmadyk döwletiň çykmak hukugy], [Derrew ulanmak; umumy çagyryş teklibi],),
  ([#{strong[ADR-0063.]} Zynjyrdaky ýatyrylyş ýazgysy sanawyň bit sanyny kabul edýär], [Proýeksiýa ýörelgesi], [Hemişelik 2 bit],),
  ([#{strong[ADR-0070.]} Gazna döredilýänçä wagtlaýyn operator; sanawda at "Tamga Network"], [Toruň ýuridik şahsy ýok; tabşyrmak bir nokatdan], [Sanawda operator kompaniýanyň ady; ýuridik şahs talap edýän işlere garaşmak],),
  ([#{strong[ADR-0071.]} Wagtlaýyn döwürde gatnaşyjydan töleg alynmaýar], [Bitaraplyk; maliýe goşandy ýazga täsir etmeýär], [Guramadan ýyllyk töleg],),
  ([#{strong[ADR-0072.]} Gymmat gatlagy togtadyldy, gözleg ugry], [Tor token we töleg işlemeýär; zynjyr diňe proýeksiýa], [ADR-0003-iň ilgeklerini hökmany saklamak],),
))

== Üýtgän kararlar

Karar yzygiderliginiň dogruçyllygy onuň üýtgän kararlaryny gizlemezliginden bilinýär. Tamga-nyň karar ýazgylarynda alty üýtgeşme aýratyn sapakly; olaryň her biri täze maglumatyň, standartyň ýa-da derňewiň netijesidir.

Birinjisi gymmat gatlagydyr. Toruň irki dizaýnynda mümkin bolan kitabyň geljekde gymmat geçirişini götermegi üçin bäş hökmany düzgün goýlupdy (ADR-0003). ADR-0072 bu düzgünleri hökmany bolmakdan çykardy we gözleg ugry hökmünde togtatdy; ADR-0003 häzir "ýerini başgasyna berdi" ýagdaýynda. Ikinjisi resminama görnüşiniň belgisidir. Ilkinji dizaýn görnüşi durnukly HTTPS salgysy bilen kesgitleýärdi; köp döwletli torda görnüş belgisiniň ýeke domen adyna bagly galyp bilmejekdigi görlende belgi URN boldy we kesgitleme katalogdan çözülýän boldy (ADR-0010). Üçünjisi gapjyk tassyklamasydyr: ýeke we 30 gün güýjünde bolan tassyklama ÝB-niň tehniki spesifikasiýasy çap edilende gysga ömürli WIA we açar tassyklamasy bilen çalşyryldy (ADR-0025).

Dördünjisi amal žurnalydyr. Gapjyk düzgünleri žurnalyň enjamdan asla çykmazlygyny talap edýärdi; ÝB bolsa adamyň žurnalyny eksport edip bilmegini hökmany edýär. Düzgün žurnalyň diňe adamyň özüniň başladan we öz paroly bilen şifrlän eksportynda çykyp biljek görnüşinde daraldyldy (ADR-0027). Bäşinjisi togtatmadyr: şahsyýet hyzmatynyň resminamalarynda togtatma bardy, ÝB-niň şahsy şahsyýet maglumatlary düzgünine laýyklaşdyrylanda aýryldy (ADR-0048). Altynjysy täzeleme belliginiň baglanyşygydyr. Bellik ilki DPoP \[20\] açaryna baglydy; laýyklyk işinde DPoP açarynyň üýtgäp biljekdigi we standartyň baglanyşygy müşderi nusgasynyň açaryna gurýandygy görlende düzgün üýtgedi (ADR-0060).

Bu üýtgeşmeleriň umumy tarapy bar: olaryň hiç biri ümsüm däl. Olaryň her biri köne ýazgyny öz ýerinde galdyrýar, nämäni üýtgedendigini ýazýar we täsir eden spesifikasiýany şol bir işde täzeleýär.

= Ýagdaý, Ýol Kartasy we Açyk Kararlar

Ynam toruň haýsy funksiýany häzir hödürleýändigini, haýsysyny diňe karar edendigini aç-açan aýtmagy ony ulanjaklaryň ilkinji zerurlygydyr. Bu bölüm resminamanyň dowamynda dargadylyp berlen ýagdaý belliklerini bir tablisada jemleýär, ýol kartasyny tapgyrlar we şertler görnüşinde berýär, teklip ýagdaýyndaky karary we açyk kararlary sanaýar. Sene berilmeýär, sebäbi tapgyrlaryň her biri toruň öz elinde bolmadyk şertlere, garaşsyz operatorlaryň, guramalaryň we döwletleriň kararlaryna bagly.

== Häzir näme işleýär

Tablisa 46 funksiýalary üç ýagdaý belligi boýunça tertipleşdirýär. Bellikleriň manysy okamak gollanmasyndaky ýalydyr: #{strong[işleýär]} hakyky torda ýa-da sandbox-da janly diýmekdir, #{strong[meýilleşdirilen]} karara bagly, ýöne janly däl, #{strong[gözleg]} bolsa karary bolmadyk ýa-da togtadylan funksiýadyr. Tablisa bu neşiriň taýýarlanan senesine görä we esasy çarçuwa resminamasynyň funksiýa ýagdaýy tablisasy bilen bilelikde täzelenýär (FW-ARF-0001 §2.8).

#tablo([#{strong[Tablisa 46.]} Funksiýalaryň ýagdaýy.], (38fr, 19fr, 22fr, 15fr), ([Funksiýa], [Ýagdaý], [Bellik], [Bölüm​​​​​​​],), (
  ([Gol çekilen ynam sanawlary, sanawlaryň sanawy, labyr žurnaly, arhiw], [Işleýär], [hakyky tor we sandbox], [6],),
  ([Resminama görnüşleriniň katalogy], [Işleýär], [üýtgemeýän faýllar, bitewilik heşi], [8\.4],),
  ([Gurama we gapjyk tarapyndan başladylýan resminama bermek], [Işleýär], [ýerleşdirilen hyzmatda iki ýol], [9],),
  ([Uzakdan görkezmek, Tamga Verify, barlag hatary], [Işleýär], [üç bahaly netije], [10, 11],),
  ([Ýatyrylyş sanawlary (JWT; mdoc üçin CWT)], [Işleýär], [kesgitli aralykly çap], [12],),
  ([Web saýtlara giriş we saýt başyna lakam], [Işleýär], [], [10\.7, 15.3],),
  ([Bilet we bir gezeklik gapydan geçiş], [Işleýär (sandbox)], [hakyky torda kesgitlenen gapy syýasaty ýok], [10\.9],),
  ([Maglumaty pozmak, taryh, eksport], [Işleýär], [], [13\.5],),
  ([Wagtlaýyn şahsyýet hyzmaty we şahsyýet resminamasy], [Işleýär], [hakyky torda ýeke-täk işjeň resminama beriji], [14],),
  ([E-poçta resminamasy], [Işleýär], [], [14\.6],),
  ([Hasaba alyş sertifikatlary, syýasat meýdanlary we ýagdaý sanawy], [Işleýär], [], [7\.5],),
  ([Daşky sanawlar bilen federasiýa mehanizmi], [Işleýär], [häzir sanawda daşky sanaw ýok], [6\.9],),
  ([Gapjyk üpjün edijisiniň ýazgysy], [Işleýär], [sanawa giren ilkinji gapjyk, hakyky tor we sandbox], [5\.4],),
  ([Nol bilimli subutnama, barlaýjy tarapy], [Işleýär], [], [15\.4],),
  ([Sandbox], [Işleýär], [hemmä açyk; şahsyýet barlagy ýokarky çäkli], [17\.1],),
  ([Açyk paketler], [Işleýär], [npm-de 0.8.2 synag wersiýasy, Apache-2.0], [17\.2],),
  ([ETSI TS 119 612 XML görnüşi], [Sandbox-da işleýär], [hakyky torda meýilleşdirilen], [6\.8],),
  ([ETSI TS 119 602 görnüşleriniň çap edilmegi], [Meýilleşdirilen], [döredijisi taýýar], [6\.8],),
  ([Ikinji sanaw gol sertifikaty we enjam açar ammary], [Meýilleşdirilen], [spesifikasiýada açyk iş], [6\.3],),
  ([Bluetooth bilen ýakyn aralyk (ISO\/IEC 18013-5)], [Meýilleşdirilen], [kodlandy, enjam synagyna garaşýar], [10\.8],),
  ([Brauzerden görkezmek, gapjyk tarapy], [Meýilleşdirilen], [barlaýjy taýýar], [10\.6],),
  ([Nol bilimli subutnama, gapjyk tarapy], [Meýilleşdirilen], [enjam synagy ýok], [15\.4],),
  ([Enjam açarlary we enjam tassyklamasy], [Meýilleşdirilen], [kodlandy, enjam synagyna garaşýar], [13\.2],),
  ([Uzakdan goluň hakyky torda ilkinji ulanylyşy], [Meýilleşdirilen], [kod we synaglar taýýar], [7\.6],),
  ([Telefon resminamasy üçin hakyky SMS ibermek], [Meýilleşdirilen], [], [14\.6],),
  ([Sürüjilik şahadatnamasynyň maglumatynyň hakyky adamlara açylmagy], [Meýilleşdirilen], [hukuk derňewinden soň; häzir sandbox-da], [14\.6],),
  ([Dükan synlaýyş kody], [Meýilleşdirilen], [kod taýýar; synag gol çekijisiniň sanaw ýazgysy garaşýar], [14\.8],),
  ([Şahsyýet hyzmatynyň I3-e ýokarlandyrylmagy], [Meýilleşdirilen], [garaşsyz baha berlenden soň, täze karar bilen], [14\.4],),
  ([Giriş sertifikatynda syýasat belgisi], [Meýilleşdirilen], [sertifikat ulanyş beýany çap edilende], [7\.4],),
  ([Sertifikatly we onlaýn däl gapy şahsyýeti], [Meýilleşdirilen], [meýdan we okaýjy taýýar], [10\.9],),
  ([OpenID barlaýjy meýilnamasynyň täzeden geçirilmegi; gapjyk meýilnamalary], [Meýilleşdirilen], [], [20\.5],),
  ([Umumy kitap], [Meýilleşdirilen], [kod taýýar, önümçilikde ýok we ýapyk], [19],),
  ([Gazna, maslahat we sanawlaryň tabşyrylmagy], [Meýilleşdirilen], [], [18\.4],),
  ([ÝB-niň bilelikde işlemek çärelerine gatnaşmak], [Meýilleşdirilen], [], [20\.5],),
  ([Nol bilimli subutnama bilen lakam almak], [Gözleg], [], [15\.3],),
  ([Kriptografik akkumulýator ýa-da nol bilim bilen ýatyrylyş], [Gözleg], [yza süýşürildi], [12\.2],),
  ([Kwantdan soňky algoritmlere geçmek], [Gözleg], [karar ýok], [23\.3],),
  ([Gymmat gatlagy], [Gözleg], [togtadyldy; token, coin we töleg ýok], [19\.9],),
))

Tablisanyň okalyşy barada bir bellik goşalyň. "Işleýär" belligi funksiýany çeşme bilen görkezip bolýandygyny aýdýar; haýsydyr bir guramanyň hakyky torda bu funksiýany ulanýandygyny aýtmaýar. Hakyky toruň Türkiýe sanawynda häzir ýeke-täk işjeň resminama beriji toruň wagtlaýyn şahsyýet hyzmatydyr; gurama resminamalary ilkinji guramalar goşuldygyça şol bir ýol bilen beriler.

== Ýol kartasy

Ýol kartasy alty ädimden ybarat. Her ädim bir şerte bagly we hiç bir ädim öňki ädimde döredilen belgileri üýtgetmeýär (Tablisa 47). Ilkinji dört ädimiň dolandyryş tarapy Bölüm 18.3-de, kitap tarapy Bölüm 19.8-de düşündirildi; Surat 30 şol bir ýoly dolandyryş tapgyrlary hökmünde görkezýär.

#tablo([#{strong[Tablisa 47.]} Ýol kartasynyň ädimleri: şert, näme üýtgeýär, näme üýtgemeýär.], (16fr, 32fr, 48fr, 38fr), ([Ädim], [Şert], [Näme üýtgeýär], [Näme üýtgemeýär],), (
  ([1\. Sanaw tapgyry (häzir)], [], [gol çekilen sanawlar we labyr žurnaly; sandbox; paketler synag wersiýasynda; OpenID öz-synagy], [],),
  ([2\. Taýýarlyk], [sanawdaky gapjyklaryň dükan wersiýalary we enjam synaglary], [enjam tassyklamasy, Bluetooth we brauzer ýollary janly bolýar; ilkinji guramalar hakyky tora goşulýar], [resminama görnüşleri, kök we gurama belgileri],),
  ([3\. Gazna], [gaznanyň ýuridik şahs bolmagy], [operatorlyk gaznaga geçýär; hakyky torda XML sanaw; şahsyýet hyzmatynyň sertifikaty täzelenýär], [sanaw operatorynyň ady, kök belgisi, resminama görnüşleri, berlen resminamalar],),
  ([4\. Kitap], [azyndan iki garaşsyz operatoryň ýazmaça razylygy we deňgüýçlilik synaglary], [sanawlaryň heşi kitaba-da ýazylýar], [gol çekilen sanawlar çeşme bolup galýar; barlag hatary],),
  ([5\. Döwletiň goşulmagy], [döwletiň öz sanawyny çap etmegi], [maslahat döredilýär; PID orny dolýar; wagtlaýyn rollar tabşyrylýar], [gurama belgileri, resminama görnüşleri, berlen resminamalar],),
  ([6\. Institusional giňelme], [maslahatyň kesgitlän çäkleri], [täze pudak shemalary öz kararlary bilen goşulýar], [toruň ýörelgeleri],),
))

Tablisanyň birinji setirinde şert we "näme üýtgemeýär" sütünleri boş, sebäbi bu ädim häzirki wagtdyr. Ikinji ädimiň gurama tarapy bilkastlaýyn atsyz goýuldy: bu resminama hiç bir gurama bilen ylalaşygy ýa-da gepleşigi habar bermeýär. Bäşinji ädimiň şerti hem toruň elinde däl; döwletiň goşulmagy şol döwletiň öz kararydyr.

== Teklip ýagdaýyndaky karar

Işjeň bolmadyk ýeke-täk ýazgy saglyk ugrundaky resminamalar bilen baglydyr (ADR-0028). Teklip saglyk işgärleri üçin biri-birini doldurýan üç resminamany beýan edýär: hünär işini alyp barmak resminamasy, hünär guramasynyň agzalyk resminamasy we guramanyň öz işgärine berýän wezipe resminamasy. Hassahana işe alanda bu resminamalary barlaýjy hökmünde sorap biler. Resminamalarda saglyk maglumaty we şahsyýet belgisi ýok; näsag tarapy çägiň daşynda. Teklip taslama dolandyryşynyň karary bilen togtadyldy: ilkinji pudak bilim bolandygy üçin onuň üstünde işlenmeýär, ýöne ýazgy pozulmaýar. Saglyk ugry açylsa, bu teklip täze maglumatlar bilen täzeden seredilýär we kabul edilse, öz düzgünleri bilen geler.

== Açyk kararlar we indiki işler

Karar ýazgylarynyň we spesifikasiýalaryň "açyk meseleler" bölümleri heniz karary berilmedik soraglary aç-açan sanaýar. Tablisa 48 olaryň hemmä açyk bolanlaryny degişli çeşmesi bilen bilelikde berýär. Käbirleri tehniki ölçege, käbirleri hukuk derňewine, käbirleri hem toruň indiki tapgyryna garaşýar.

#tablo([#{strong[Tablisa 48.]} Açyk kararlar.], (48fr, 48fr, 20fr), ([Sorag], [Näme üçin açyk], [Çeşme],), (
  ([Enjam çalşylanda resminamalaryň tassyklanan geçirilişi], [Täze enjamda resminamalar täzeden alynýar; gurama adamy ýyllar soň tanamaly], [FW-ARF-0001 §7.4 L4; SPEC-WALLET-0001],),
  ([Köp enjam (telefon we planşet)], [Her enjam aýry enjam açaryny we aýry resminama bermegi aňladýar], [SPEC-WALLET-0001],),
  ([Iň ýokary gapjyk derejesiniň döwlet tapgyrynda nähili kesgitlenjekdigi], [Enjam tassyklamasymy ýa-da aýry enjammy], [SPEC-WALLET-0001],),
  ([Kiçi ýaşlylar üçin ene-atanyň razylygy akymy], [Hukuk derňewine we üpjün edijiniň kiçi ýaşlylar üçin şertine garaşylýar], [ADR-0043; SPEC-ID-0003],),
  ([Ikinji şahsyýet barlagy üpjün edijisi], [Ýeke üpjün edijä baglylygyň öňüni almak], [SPEC-ID-0003],),
  ([Ýatyrylyş sanawyny jemlemek hökmanymy; köp ýagdaý üpjün edijisi], [Häzir "maslahat berilýär"; aç-açan ýazylmagy gerek bolup biler], [SPEC-CRED-0003],),
  ([Barlaýjy çäginiň resminama görnüşi belgilerine baglanmagy], [Her täze görnüşde her barlaýjynyň täzelenmegi meselesi], [SPEC-PROTO-0002],),
  ([Gapjyk üpjün edijisi ýazgylarynyň kitapdaky gabatlygy], [Kitap tapgyrynda haýsy şertnamada saklanjakdygy], [SPEC-TRUST-0001],),
  ([ÝB ZK üçin başga ýatyrylyş usulyny saýlasa], [Gysga ömürli nusga karary täzeden seredilýär], [ADR-0044],),
  ([Kök sertifikat süýşürilende üstüne düşmek möhleti; aralyk sertifikat edarasy], [Teklip 12 aý; döwletleriň saýlawyna bagly], [SPEC-ID-0002],),
  ([Çägiň daşyndaky funksiýalar: PID bermek, töleg, gurama gapjygy, W3C VCDM görnüşi, kwalifisirlenen elektron gol], [Olaryň her biri diňe aýry karar bilen açylýar], [FW-ARF-0001 §1.7],),
))

= Çäkler we Açyk Soraglar

Her arhitektura käbir töwekgelçilikleri aýyrýar, käbirlerini azaldýar we käbirlerini bilkastlaýyn göterýär. Bu bölüm üçünji topara seredýär: Tamga-nyň häzir bilýän we kabul edýän töwekgelçiliklerine, heniz jogaby bolmadyk soraglara we gözleg ugurlaryna. Olary aç-açan ýazmak gowşaklygy boýun almakdan has köp şertnamadyr. Okyjy toruň nämä kepil geçmeýändigini bilende, onuň nämä kepil geçýändigine hem has köp ynanyp biler.

== Beýan edilen galyndy töwekgelçilikler

Esasy çarçuwa resminamasy bäş çägi belgi bilen sanaýar (FW-ARF-0001 §7.4). Olara gizlinlik, şahsyýet we işleýiş bölümlerinde düşündirilen birnäçe töwekgelçilik goşulýar. Tablisa 49 olaryň her birini, näme üçin häzir bardygyny, näme bilen azaldylýandygyny we haýsy şertde aýryljakdygyny berýär.

#tablo([#{strong[Tablisa 49.]} Galyndy töwekgelçilikler.], (48fr, 43fr, 48fr, 48fr), ([Töwekgelçilik], [Näme üçin häzir bar], [Azaltmak], [Aýrylmak şerti],), (
  ([L1. Ynam labyry ýeke operatoryň goluna daýanýar; operator bilen resminama beriji bilelikde hereket etse, gapma-garşylykly ýazgy çap edilip bilner], [Sanaw tapgyrynda ýeke gol çekiji bar], [hemmä açyk üýtgeşme we labyr žurnaly, açyklyk hasabaty, barlag], [umumy kitap we birnäçe garaşsyz gol çekiji (Bölüm 19)],),
  ([L2. Ýatyrylyş birnäçe minutda güýje girýär], [ýatyrylyş sanawy kesgitli aralyk bilen çap edilýär we öňünden alynýar], [gysga çap aralygy (2 minut), barlaýjynyň ýygy öňünden alşy], [aýrylmaýar; bilkastlaýyn gizlinlik deňagramlylygydyr (Bölüm 12.5)],),
  ([L3. Şol bir guramanyň resminamalary dürli barlaýjylarda birleşdirilse, adam gabat getirilip bilner], [guramanyň goly nusgalarda tanalýar], [barlaýjy başyna nusga, tegeleklenen wagt], [nol bilimli subutnamanyň gapjyklara ýetmegi (Bölüm 15.4)],),
  ([L4. Enjam çalşylanda resminamalar täzeden alynýar], [tassyklanan geçiriş dizaýny açyk], [guramadan täzeden bermek; ümsüm täzeleme], [tassyklanan geçiriş karary (Tablisa 48)],),
  ([L5. ZK hödürlemesinde ýatyrylyşy barlap bolmaýar], [subutnama ýatyrylyş sanawyndaky orny gizleýär], [iň köp 24 sagatlyk nusgalar; ýatyrylan resminamanyň nusgasy täzelenmeýär], [ÝB-niň ZK üçin başga ýatyrylyş usulyny saýlamagy (ADR-0044)],),
  ([Lakam almagyň belli gowşaklygy], [tohum şahsyýet hyzmatynda şahsyýetden alynýar], [açar goragy we açyklyk; tohum saklanmaýar], [nol bilimli subutnama bilen almak (gözleg)],),
  ([ZK nusgasy täzelemesiniň işjeňlik yzy], [nusgalar takmynan günde bir gezek täzelenýär], [tötänleýin gijikme; adamyň öçürip bilýän awtomatik täzelemesi], [hemişelik çözgüt ýok; haýsy barlaýja näme görkezilendigi öwrenilmeýär],),
  ([Uzakdan şahsyýet barlagynda ýasama ýüz we goşulma hüjümleri; ýeke üpjün edijä baglylyk], [barlag uzakdan şahsyýet barlagy üpjün edijisine daýanýar], [janlylyk we ýüz deňeşdirmesi; resminamada portret ýok; iň ýokary dereje uzakdan ýüz bilen berilmeýär], [döwletiň PID-i; ikinji üpjün ediji (Tablisa 48)],),
  ([Ýeke sanaw gol sertifikaty], [ikinji süýşýän sertifikat heniz ulanyşda däl], [30 gün öňünden yglan edilýän açar çalyşmak düzgüni], [ikinji sertifikat we enjam açar ammary (Bölüm 6.3)],),
  ([Kiçi ýaşlylaryň şahsyýet barlagy], [ýaş çägi ýok; ene-atanyň razylygy akymy kesgitlenmedi], [üpjün edijiniň şerti tassyklanmaga garaşýar], [ene-atanyň razylygy karary (Tablisa 48)],),
  ([Onlaýn däl telefonda möhleti dolmadyk resminama], [ýatyrylyş tora birikmeýän enjama ýetmeýär], [birligi ýatyrmak, gysga güýjünde bolmak möhleti, barlaýjynyň ýatyrylyş barlagy], [aýrylmaýar; gysga ömür bilen çäklendirilýär],),
))

Birinji setir aýratyn nygtalmaga mynasyp, sebäbi toruň häzirki ynam modeliniň çägini iň aýdyň görnüşde şol çekýär. Çap edilen sanawlar her kesiň ýükläp bilýän, wersiýalary biri-birine bagly we her üýtgeşmesi žurnala ýazylýan faýllardyr; gapma-garşylykly ýazgyny gizläp bolmaýar, ýöne çap edip bolýar. Bu çägi aýyrjak zat köp gol çekijili tertipdir we ol tertip diňe garaşsyz taraplar goşulanda gurulýar.

== Heniz jogaby bolmadyk soraglar

Käbir soraglar karar ýazgysynyň açyk meselesi bolmakdan daşary, toruň uzak möhletli keşbine täsir edýär. Olaryň dördüsini aýratyn agzaýarys.

Birinjisi resminamanyň enjam bilen baglanyşygydyr. Enjam baglanyşygy resminamanyň göçürilmeginiň öňüni alýar, ýöne şol bir adamyň telefonyny çalyşmagyny hem kynlaşdyrýar. Uçurym on ýyldan soň telefonyny çalşanda, uniwersiteti ony henizem tanamaly. Tassyklanan geçiriş we köp enjam howpsuzlyk bilen ulanylyşlylygyň arasyndaky bu deňagramlylygyň heniz gurulmadyk iki bölegidir.

Ikinjisi barlaýjynyň çägidir. Häzir barlaýjynyň haýsy meýdanlary sorap biljekdigi hasaba alyş sertifikatynda ýazylýar. Bu çägiň resminama görnüşi belgilerine berk baglanmagy barlagy aňsatlaşdyrýar, ýöne her täze resminama görnüşinde her barlaýjynyň ýazgysynyň täzelenmegini talap edýär.

Üçünjisi şahsyýet barlagynyň çeşmesidir. Wagtlaýyn şahsyýet hyzmaty häzir ýeke uzakdan şahsyýet barlagy üpjün edijisi bilen işleýär. Ikinji üpjün ediji, esasan hem ýerli çeşme, baglylygy azaldýar; döwletiň şahsy şahsyýet maglumatlary gelende bolsa bu meseläniň köp bölegi ýok bolýar.

Dördünjisi kiçi ýaşlylardyr. eIDAS 2.0 \[2\] iň az ýaşy göz öňünde tutmaýar we Tamga hem ýaş çägini goýmaýar (ADR-0043). Ýöne kiçi ýaşly adamyň şahsyýet barlagy üçin ene-atanyň razylygynyň nähili alynjakdygy we üpjün edijiniň bu ýaşdaky adamlar üçin şerti hukuk derňewine garaşýan soraglardyr.

== Gözleg ugurlary

Üç ugur häzir kararsyz we şeýle diýlip agzalýar. Birinjisi #{strong[nol bilimli subutnama bilen lakam almakdyr]}. Häzirki lakam usuly şahsyýet hyzmatyna lakamy nazary taýdan gurup bilmäge ýol berýär. Alşyň subutnama bilen barlanmagy bu gowşaklygy aýyrýar; karar ýazgysy muny maksat hökmünde ýazýar, ýöne gapjyklarda nol bilim kitaphanasy kämilleşmänkä ulanylmaýar (ADR-0031).

Ikinjisi #{strong[kwantdan soňky algoritmlere geçmekdir]}. Häzirki gollar elliptik egri kriptografiýasyna daýanýar. Uly göwrümli kwant kompýuteri bu gollary döwüp biler; şonuň üçin uzak ömürli resminamalar we kök sertifikatlar geçişiň iň möhüm bolan ýerleridir. Tamga-nyň bu barada karary ýok; mesele ÝB-niň we standart guramalarynyň saýlawlaryny yzarlap seredilip geçiljek sorag hökmünde dur. Tapgyryň kwantdan soňky döwri düşündirýän makalasy \[79\] meseläniň tehniki esasyny berýär.

Üçünjisi #{strong[gymmat gatlagydyr]}. Ilkinji dizaýnda kitabyň geljekde gymmat gatlagyny götermegi üçin kabul edilen kararlar indi hökmany däl we diňe gözleg ugry hökmünde ýazgyda dur (ADR-0072). Tamga Network token ýa-da coin çykarmaýar; töleg, hasaplaşyk ýa-da gymmat geçirişini işlemeýär. Bu ugruň täzeden açylmagy dolandyryş edarasynyň kararyny, gizlinlik gözlegini, garaşsyz howpsuzlyk derňewini we täze karar ýazgysyny talap edýär (Bölüm 19.9).

= Netije

Biz Aýnuryň arzasy bilen başlapdyk. Bakuda alan diplomyny Stambuldaky iş berijä görkezmek üçin skanirlenen nusgalar, notarial tassyklanan terjimeler we jogaby hepdeläp dowam edýän e-poçtalar gerek bolýardy; iň soňunda-da Timur diplomyň hakykydygyny subut edip bilmeýärdi. Bu resminamanyň düşündirýän gurluşy şol bir sahnany başga ýol bilen gurýar. Uniwersitet diplomy gol çekilen resminama hökmünde berýär, Aýnur ony telefonynda göterýär we diňe soralan meýdanlary görkezýär, Timuryň programmasy hem goly, ygtyýary, ýatyrylyş ýagdaýyny we enjam baglanyşygyny uniwersitete jaň etmezden barlaýar. Uniwersitet diplomyň nirede görkezilendigini öwrenmeýär; umumy ýazgylaryň hiç biri Aýnury tanamaýar.

Bu ýoluň Aýnur üçin häzir näderejede açykdygyny hem dogruçyl aýtmak gerek. Türkiýäniň sanawy işjeň we akymyň tutuşlygy işleýär; ýöne Azerbaýjan üçin sanawlarda diňe orun goýuldy. Bu ylalaşyk ýa-da gepleşik barada habarnama däldir; döwlet goşulanda öz sanawyny çap edip biljek boş ýerdir. Aýnuryň Bakudaky uniwersitetiniň bu ýol bilen resminama berip bilmegi şol ornuň dolmagyna bagly. Gurluş muňa garaşar ýaly gurlan: orun dolanda täze meýdan goşulmaýar, bar bolan orun dolýar.

Resminamanyň dowamynda üç saýlaw gaýta-gaýta öňümizden çykdy. Tehniki gatlak ÝB-ňki bilen birmeňzeş, sebäbi bilelikde işlemegiň gymmaty hiç kimiň aýratyn uýgunlaşdyrma ýazmaga mejbur bolmazlygyndan gelýär. Ynam häzir gol çekilen sanawlardan gelýär, sebäbi ýeke operatoryň zynjyry gol çekilen sanawdan artyk ynam döretmeýär; umumy kitap diňe garaşsyz taraplar ony bilelikde işledende gelýär we şonda-da sanawlaryň heşini göterýär. Her döwlet öz ýazgysynyň ýeke-täk ýazyjysydyr we häzir döwletiň adyndan alnyp barylýan her rol hiç bir resminamany we belgini üýtgetmezden tabşyrylyp bilner ýaly dizaýn edildi.

Ýol uzyn we şertleri toruň elinde bolmadyk ädimleri öz içine alýar: garaşsyz operatorlar, guramalar, döwletler. Şonuň üçin ýol kartasy sene bermeýär, şert berýär. Operatorlar üýtgäp biler, domen atlary tabşyrylyp bilner, kitap gelip ýa-da gijikip biler. Hemişelik galýan zat ynam modelidir: her kesiň barlap bilýän gol çekilen ýazgylary, çeşmeden soramazdan barlag we adamy tanamaýan umumy ýazgylar.

#heading(level: 1, numbering: none)[Goşmaça A — Sözlük]

Adalgalar elipbiý tertibinde. Asyl adalga ýaýyň içinde berilýär; tehniki adalgalar terjime edilmeýär. Kesgitlemeler toruň sözlügi (FW-DEF-0001) we tapgyryň makalalary bilen ylalaşykly (Tablisa 50).

#tablo([#{strong[Tablisa 50.]} Sözlük.], (24fr, 48fr), ([Adalga], [Kesgitleme],), (
  ([Açar subutnamasy (#{emph[proof of possession]}, #{raw("proof")})], [Gapjygyň resminama haýyşyna goşýan, resminamanyň baglanjak açary bilen gol çekilen gysga subutnamasy (OpenID4VCI JWT proof); açaryň gapjykdadygyny we haýyşyň täzedigini (#{raw("aud")}, #{raw("iat")}, #{raw("nonce")}) görkezýär. Açar tassyklamasy (KA) bilen garyşdyrmaly däl: KA-a gapjyk üpjün edijisi, subutnama bolsa gapjyk gol çekýär.],),
  ([Açar tassyklamasy (#{emph[key attestation]}, KA)], [Gapjyk üpjün edijisiniň resminamanyň baglanjak açarlarynyň enjamyň howpsuz enjamynda döredilendigini we goralýandygyny beýan edýän gol çekilen resminamasy.],),
  ([Alnyş şahasy], [Gol çekilen haýyş obýektiniň her alnyşynda açylýan, öz #{raw("state")}, #{raw("nonce")} we şifrleme açary bolan aýry sessiýa; ret diňe öz şahasyny ýapýar.],),
  ([Araçy barlaýjy (#{emph[intermediary]})], [Barlaýjynyň adyndan gapjykdan resminama soraýan we ony barlaýan hyzmat; gapjyk esasy barlaýjynyň adyny görkezýär. Tamga-da Tamga Verify.],),
  ([Aýratyn ýoldaky ynam labyry], [Sanawlaryň sanawyna gol çekýän sertifikatyň sanawlardan aýry kanallarda çap edilýän barmak yzy.],),
  ([Baglanyşyksyzlyk (#{emph[unlinkability]})], [Dürli barlaýjylaryň şol bir adamyň hödürlemelerini biri-biri bilen gabat getirip bilmezligi.],),
  ([Barlag hatary], [Barlaýjynyň hödürlemäni barlaýan hemişelik gatlaklary: deslapky şert, format, görnüş, ynam, ýagdaý, syýasat.],),
  ([Barlap bolmady (#{emph[INDETERMINATE]})], [Barlagyň höküm çykaryp bilmedik netijesi; "güýjünde däl" diýmegi aňlatmaýar.],),
  ([Barlaýjy (#{emph[relying party, verifier]})], [Gapjykdan resminama soraýan we ony barlaýan hasaba alnan gurama.],),
  ([DCQL], [Barlaýjynyň gapjykdan haýsy resminamany we haýsy meýdanlary soraýandygyny ýazýan sorag dili (#{emph[Digital Credentials Query Language]}).],),
  ([DPoP], [Giriş belligini müşderiniň açaryna baglaýan we her haýyşda şol açar bilen gol çekilen subutnamany talap edýän OAuth giňeltmesi.],),
  ([Enjam baglanyşygy (#{emph[key binding, holder binding]})], [Resminamanyň enjamyň howpsuz enjamynda döredilen açara baglanmagy; görkezilende şol açar bilen gol talap edilýär.],),
  ([Enjam tassyklamasy], [Operasion ulgamyň açaryň howpsuz zolakda döredilendigini we programmanyň üýtgedilmändigini tassyklaýan gol çekilen beýany.],),
  ([Federasiýa], [Ýurt sanawlarynyň öz eýeleri tarapyndan işledilýän we sanawlaryň sanawynda jemlenýän modeli.],),
  ([Gapjyk birligi (#{emph[wallet unit]})], [Gapjygyň belli bir enjamdaky gurnalyşy.],),
  ([Gapjyk nusgasy tassyklamasy (#{emph[Wallet Instance Attestation]}, WIA)], [Gapjyk üpjün edijisiniň gapjyk birligi üçin gol çeken, 24 sagatdan gysga güýjünde bolan beýany; her resminama amalynda täze açar bilen alynýar.],),
  ([Gapjyk üpjün edijisi (#{emph[wallet provider]})], [Gapjygy hödürleýän, birlikleri hasaba alýan we WIA bilen açar tassyklamasyna gol çekýän gurama.],),
  ([Geçiş kartasy], [Ýakyn aralykda hemişelik çözgüt gelýänçä ulanylýan, gysga ömürli we şahsy maglumat götermeýän gol çekilen žeton.],),
  ([Giriş sertifikaty (#{emph[access certificate]})], [Barlaýjynyň öz haýyşlaryna gol çekýän X.509 sertifikaty; müşderi belgisi şu sertifikatyň heşidir.],),
  ([HAIP], [OpenID4VCI we OpenID4VP-niň ýokary kepillik talap edýän ulanyşlar üçin wariantlaryny daraldýan profil.],),
  ([Hasaba alyş edarasy (#{emph[registrar]})], [Resminama berijileri, barlaýjylary we gapjyk üpjün edijilerini hasaba alýan gurama; kanuny ygtyýar bermeýär.],),
  ([Hasaba alyş sertifikaty (#{emph[registration certificate]})], [Hasaba alyş edarasynyň barlaýjynyň ulanyşynyň maksadyny we onuň sorap biljek meýdanlaryny göterýän gol çekilen resminamasy.],),
  ([HKDF], [Bir açardan başga açarlary alýan, HMAC esasly açar alyş funksiýasy.],),
  ([HMAC], [Gizlin açar bilen hasaplanýan, açary bilmeýän adamyň döredip bilmejek heşi.],),
  ([Içine gurlan açyş syýasaty], [Resminama berijiniň öz resminamasynyň haýsy barlaýjylara görkezilip bilinjekdigini gol çekilen tanyşdyryş resminamasynda ýazýan düzgüni; soňky karar adamda.],),
  ([Kitap tapgyry], [Sanaw heşleriniň birnäçe garaşsyz operatoryň saklaýan umumy kitabyna hem ýazylýan tapgyry.],),
  ([Kwalifisirlenmedik atribut tassyklamasy (EAA)], [Kwalifisirlenen ynam hyzmaty üpjün edijisi bolmadyk islendik guramanyň berýän resminamasy.],),
  ([Labyr žurnaly (#{emph[anchor log]})], [Ýatyrylyş sanawlarynyň çap edilişlerini we resminama görnüşleriniň heşlerini sagatlaýyn gol çekilen setirler bilen saklaýan hemmä açyk žurnal.],),
  ([Lakam (#{emph[pseudonym]})], [Gapjygyň her saýt üçin aýratyn döredýän, durnukly, ýöne saýtlaryň arasynda gabat getirip bolmaýan hasap belgisi.],),
  ([Lakam tohumy], [Şahsyýet hyzmatynyň adamyň şahsyýetinden saklamazdan alýan we diňe gapjykda galýan gizlin bahasy.],),
  ([mdoc], [ISO\/IEC 18013-5-iň kesgitleýän, CBOR bilen kodlanýan ikilik resminama formaty.],),
  ([Nol bilimli subutnama (ZK)], [Sözlemiň dogrudygyny, sözleme esaslanýan maglumaty görkezmezden subut edýän subutnama.],),
  ([Nusga], [Şol bir resminamanyň aýry açarlara baglanan nusgalarynyň biri; gapjyk her barlaýja aýry nusga görkezýär.],),
  ([Öňünden ygtyýarlandyrylan kod (#{emph[pre-authorized code]})], [Guramanyň başladýan resminama bermeginde adamyň şahsyýeti öňünden belli bolandygy üçin ulanylýan bir gezeklik kod.],),
  ([PAR], [Ygtyýarlandyryş haýyşynyň ilki göni serwere iberilýän we brauzerde diňe salgylanma salgysynyň göterilýän OAuth giňeltmesi.],),
  ([PID], [Şahsy şahsyýet maglumatlary; döwletiň ýa-da döwletiň ygtyýarlandyran guramasynyň berýän şahsyýet resminamasy. Tamga PID bermeýär.],),
  ([PKCE], [Ygtyýarlandyryş kodunyň ele salynmagyna garşy müşderiniň bir gezeklik barlag bahasyny ulanýan OAuth giňeltmesi.],),
  ([Proýeksiýa], [Umumy kitabyň gol çekilen sanawlaryň diňe heşlerini götermegi; çeşme sanawlardyr, gapma-garşylykda sanaw güýjünde.],),
  ([Resminama (#{emph[credential, attestation]})], [Resminama berijiniň adam barada gol çeken we adamyň gapjygynda göterilýän elektron resminamasy.],),
  ([Resminama beriji (#{emph[issuer, attestation provider]})], [Resminamany berýän gurama: uniwersitet, hünär guramasy, bilet satyjy ýaly.],),
  ([Resminama eýesi (#{emph[holder]})], [Resminamany gapjygynda göterýän we ony kime görkezjekdigini karar edýän adam.],),
  ([Resminama görnüşleriniň katalogy], [Resminama görnüşleriniň kesgitlemeleriniň we shemalarynyň üýtgemeýän faýllar hökmünde çap edilýän ýeri.],),
  ([Sanawlaryň sanawy (#{emph[List of Trusted Lists]}, LoTL)], [Ýurt sanawlarynyň salgylaryny, gol çekijilerini we ykrar ediliş ýagdaýlaryny görkezýän gol çekilen sanaw.],),
  ([Sandbox], [Hakyky tordan aýry kök bilen işleýän, hemmä açyk synag tory.],),
  ([Saýlap açmak (#{emph[selective disclosure]})], [Adamyň resminamadan diňe soralan meýdanlary görkezmegi.],),
  ([SD-JWT VC], [Meýdanlaryny birin-birin gizläp bolýan, gol çekilen JSON resminama formaty.],),
  ([Synag gol çekijisi], [Dükan synlaýyş kody bilen berilýän, hakyky ekoulgamda geçmeýän resminamalaryň gol çekijisi.],),
  ([Terminal açary], [Gapy terminalynyň barlag hyzmatyna özüni tanadýan, guramanyň adyndan berilýän açary.],),
  ([Togtatma (#{emph[suspension]})], [Resminamanyň wagtlaýyn güýjünde däl hasaplanmagy; diňe shemasy rugsat berýän gurama resminamalarynda bar, şahsyýet görnüşlerinde ýok.],),
  ([Umumy kitap (#{emph[ledger]})], [Ynam ýazgylarynyň heşleriniň birnäçe garaşsyz operator tarapyndan saklanýan kitaby (zynjyr); häzir ýok.],),
  ([Uzakdan gol], [Guramanyň açarynyň öz gol hyzmatynda galýan, ýerleşdirilen hyzmatyň diňe heş iberip gol alýan tertibi (CSC API).],),
  ([Wagtlaýyn operator (#{emph[provisional operator]})], [Gazna döredilýänçä toruň hyzmatlaryny "Tamga Network-iň adyndan" işledýän ýuridik şahs.],),
  ([Wagtlaýyn şahsyýet resminamasy], [PID üpjün edijisi ýok wagty şahsyýet hyzmatynyň uzakdan şahsyýet barlagy bilen berýän resminamasy; PID däl.],),
  ([Ygtyýarly çeşme (#{emph[authentic source]})], [Resminamadaky maglumatyň asyl ýazgysyny saklaýan ulgam; meselem, uniwersitetiň talyp maglumat ulgamy.],),
  ([Ynam labyry (#{emph[trust anchor]})], [Barlaýjynyň başdan ynanýan ýeke-täk bahasy: sanawlaryň sanawyna gol çekýän sertifikatyň barmak yzy.],),
  ([Ynam sanawy (#{emph[trust list]})], [Ýurduň kök sertifikatlaryny, resminama berijilerini we barlaýjylaryny göterýän gol çekilen sanaw.],),
  ([Ýatyrylyş (#{emph[revocation]})], [Resminamanyň hemişelik güýjünde däl hasaplanmagy.],),
  ([Ýatyrylyş sanawy (#{emph[status list]})], [Resminama berijiniň her resminamanyň ýagdaýyny birnäçe bit bilen saklaýan, gol çekip çap edýän sanawy; ýagdaý sanawy diýlip hem atlandyrylýar.],),
  ([Ýeke-täk ynam interfeýsi (#{raw("TrustSource")})], [Resminama berijiniň, barlaýjynyň we gapjygyň ähli ynam soraglaryny berýän ýeke-täk interfeýsi.],),
  ([Ýerleşdirilen resminama beriş hyzmaty (#{emph[hosted issuer]})], [Toruň guramalaryň adyndan işledýän resminama beriş hyzmaty; gol açary guramada galýar.],),
  ([Ýurt sanawy (#{raw("tl-<cc>")})], [Ýurduň kök sertifikatlaryny, resminama berijilerini, barlaýjylaryny we milli resminama görnüşlerini göterýän gol çekilen sanaw.],),
  ([ZK nusgasy], [Nol bilimli hödürleme üçin berilýän, iň köp 24 sagat güýjünde bolan we ýatyrylyş sanawyny götermeýän gysga ömürli mdoc nusgasy.],),
))

#heading(level: 1, numbering: none)[Goşmaça B — Karar ýazgylarynyň görkezijisi]

Tablisa 51 ähli karar ýazgylaryny belgi tertibinde berýär. Sene ýazgynyň döredilen senesidir; işjeň ýazgylarda kabul edilen senesi köplenç şol bir, bolmasa ýazgy kabul edilen senesini aýratyn ýazýar. "Bölüm" sütüni ýazgynyň bu resminamada agzalýan esasy bölümlerini görkezýär. Ýazgylaryň doly teksti #{raw("docs.tamga.network/tr/adr/")} bölüminde.

#tablo([#{strong[Tablisa 51.]} Karar ýazgylary.], (10fr, 40fr, 11fr, 13fr, 6fr), ([ADR​​​​​], [Ady], [Ýagdaý], [Sene], [Bölüm],), (
  ([0001], [Besu QBFT kitaby], [Işjeň], [2026-07-29], [19],),
  ([0002], [Özygtyýarlylygy ileri tutýan dolandyryş], [Işjeň], [2026-08-05], [2, 4, 18],),
  ([0003], [Gymmat gatlagynyň ilgekleri], [Ýerini başgasyna berdi], [2026-08-06], [19],),
  ([0004], [Guramanyň şahsyýeti: X.509], [Işjeň], [2026-08-06], [7, 16, 20],),
  ([0005], [Kepillik modeli we döwletsiz başlangyç], [Işjeň], [2026-09-03], [14],),
  ([0006], [Resminama formaty: SD-JWT VC], [Işjeň], [2026-09-03], [4, 8, 15],),
  ([0007], [Shema hasaba alyş kitaby], [Işjeň], [2026-09-09], [8],),
  ([0008], [Ýatyrylyş sanawynyň ýeri], [Işjeň], [2026-09-09], [12, 20],),
  ([0009], [Zynjyrsyz beta we zynjyr çägi], [Işjeň], [2026-09-24], [4, 18, 19],),
  ([0010], [Resminama görnüşiniň belgisi (URN)], [Işjeň], [2026-09-24], [8],),
  ([0011], [Wagtlaýyn şahsyýet resminamasy üpjün edijisi], [Işjeň], [2026-09-25], [3, 5, 14],),
  ([0012], [Ýakyn aralykda resminama görkezmek], [Işjeň], [2026-09-25], [10, 20],),
  ([0013], [Şahsyýet resminamasy üçin mdoc], [Işjeň], [2026-09-26], [8, 14, 20],),
  ([0014], [Çäre kategoriýasy], [Işjeň], [2026-09-27], [21],),
  ([0015], [Ýeke-täk ynam interfeýsi], [Işjeň], [2026-09-27], [5, 6, 17],),
  ([0016], [Ýerleşdirilen resminama beriş hyzmatyna giriş], [Işjeň], [2026-09-27], [7, 17],),
  ([0017], [Barlag netijesine giriş], [Işjeň], [2026-09-27], [11, 17],),
  ([0018], [Resminamalaryň üç derwezesi], [Işjeň], [2026-09-27], [17],),
  ([0019], [Gurama konsoly], [Işjeň], [2026-09-28], [17],),
  ([0020], [Ygtyýarly çeşme guramada], [Işjeň], [2026-09-29], [5, 9],),
  ([0021], [E-poçta we telefon resminamalary], [Işjeň], [2026-09-29], [14],),
  ([0022], [Şahsyýet hyzmatynyň synpy], [Işjeň], [2026-09-29], [3, 7, 8],),
  ([0023], [Nusgalary awtomatik täzelemek], [Işjeň], [2026-09-29], [9, 13, 15],),
  ([0024], [Gatnaşyjynyň hasaba alyş maglumatlary], [Işjeň], [2026-09-29], [6, 20],),
  ([0025], [Gapjyk we açar tassyklamasy], [Işjeň], [2026-09-29], [9, 13, 15],),
  ([0026], [Hasaba alyş sertifikatlary], [Işjeň], [2026-09-29], [7, 10, 20],),
  ([0027], [Amal žurnalyny eksport etmek], [Işjeň], [2026-09-29], [13],),
  ([0028], [Saglyk resminamalary], [Teklip], [2026-09-29], [22],),
  ([0029], [Işläp düzmek döwründe shemalar], [Işjeň], [2026-09-30], [8],),
  ([0030], [Önüm atlary], [Işjeň], [2026-09-30], [10, 11],),
  ([0031], [Saýt başyna lakam], [Işjeň], [2026-10-01], [8, 10, 15],),
  ([0032], [Nol bilimli subutnama (ZK)], [Işjeň], [2026-10-01], [15, 16, 20],),
  ([0033], [Dükan synlaýyş kody], [Işjeň], [2026-10-01], [14],),
  ([0034], [HAIP 1.0 laýyklygy], [Işjeň], [2026-10-01], [3, 10, 13],),
  ([0035], [Ýerleşiş], [Işjeň], [2026-10-01], [3, 4, 20],),
  ([0036], [Ynam federasiýasy], [Işjeň], [2026-10-01], [6, 20],),
  ([0037], [Tamga Network diňe tordur], [Işjeň], [2026-10-02], [4, 17, 18],),
  ([0038], [Sandbox: synag tory], [Işjeň], [2026-10-03], [6, 17],),
  ([0039], [Barlanan sürüjilik şahadatnamasynyň maglumaty], [Işjeň], [2026-10-03], [8, 14],),
  ([0040], [Sandbox-da hakyky şahsyýet barlagy], [Işjeň], [2026-10-04], [17],),
  ([0041], [Sandbox-da gurama synag hasaplary], [Işjeň], [2026-10-04], [17],),
  ([0042], [Tor we gapjyklar: tor gapjyk işletmeýär], [Işjeň], [2026-10-06], [4, 5, 13],),
  ([0043], [Ýaş çägi ýok: ÝB çemeleşmesi], [Işjeň], [2026-10-08], [13, 15, 22],),
  ([0044], [ZK hödürlemesi üçin gysga ömürli nusgalar], [Işjeň], [2026-10-09], [8, 9, 15],),
  ([0045], [Şahsyýet resminamasynyň meýdan atlary: ÝB PID kodlamasy], [Işjeň], [2026-10-09], [8, 14, 20],),
  ([0046], [Içine gurlan açyş syýasaty], [Işjeň], [2026-10-09], [10, 20],),
  ([0047], [Gapjyk birligini ýatyrmak, gapjykdan daşary ýatyrylyş ýoly we enjam tassyklamasy], [Işjeň], [2026-10-12], [12, 13, 16],),
  ([0048], [Şahsyýet hyzmatynyň resminamalarynda togtatma ýok; mdoc ýatyrylyş sanawy CWT], [Işjeň], [2026-10-13], [8, 12, 20],),
  ([0049], ["Tamga Network-de sanawda" görkezijisi], [Işjeň], [2026-10-13], [5, 13, 20],),
  ([0050], [Gurama resminama berijisiniň sertifikat profili], [Işjeň], [2026-10-13], [7, 20],),
  ([0051], [Zynjyr gol çekilen sanawlaryň proýeksiýasydyr], [Işjeň], [2026-10-17], [4, 19],),
  ([0052], [Besu ýerli rugsat bermek], [Işjeň], [2026-10-19], [19],),
  ([0053], [Sanaw labyrynda bäsdeş dalaşgärler], [Işjeň], [2026-10-19], [19],),
  ([0054], [Zynjyrda shema at meýdany, döwletara baglanyşyk we kwota çägi], [Işjeň], [2026-10-19], [8, 18, 19],),
  ([0055], [Dolandyryş: ýokarlandyrmak üçin garaşmak möhleti we ýazgy dolandyryş teklipleri], [Işjeň], [2026-10-19], [18, 19],),
  ([0056], [Paket API-lerinde howpsuz deslapky ýagdaýlar], [Işjeň], [2026-10-19], [7, 10, 16],),
  ([0057], [Ýerleşdirilen resminama beriş hyzmatynda guramanyň gol açary: uzakdan gol (CSC API)], [Işjeň], [2026-10-20], [5, 7, 16],),
  ([0058], [Giriş sertifikatynyň profili (ETSI TS 119 411-8) we şahsyýet hyzmatynyň sertifikatynyň geçiş wagty], [Işjeň], [2026-10-21], [7, 18, 20],),
  ([0059], [Giriş belliginiň ömrüniň dowamynda birnäçe resminama haýyşy], [Işjeň], [2026-10-21], [9],),
  ([0060], [Täzeleme belligi müşderi nusgasynyň açaryna bagly], [Işjeň], [2026-10-22], [9],),
  ([0061], [Lakam tohumy aýry resminama konfigurasiýasy hökmünde, standart resminama haýyşy bilen], [Işjeň], [2026-10-22], [8, 14, 15],),
  ([0062], [ZK nusgasynyň täzeleme belligi diňe ZK nusgasynyň çägi soralanda], [Işjeň], [2026-10-23], [9, 16],),
  ([0063], [Zynjyrdaky ýatyrylyş sanawy ýazgysy sanawyň öz bit sanyny kabul edýär], [Işjeň], [2026-10-23], [19],),
  ([0064], [Şahsyýet resminamasynda ýaş çäkleri: age\_over\_15 we age\_over\_NN nusgasy], [Işjeň], [2026-10-23], [14, 15],),
  ([0065], [Gapy terminallary barlag hyzmatyna özüni tanadýar: terminal açary], [Işjeň], [2026-10-26], [10, 16],),
  ([0066], [ETSI TS 119 612 XML sanaw görnüşi], [Işjeň], [2026-10-29], [6, 20],),
  ([0067], [Haýyş obýektiniň her alnyşy aýry şaha, ret diňe öz şahasyny ýapýar], [Işjeň], [2026-10-29], [10, 16],),
  ([0068], [Hasaba alyş sertifikatynyň syýasaty we ýagdaý sanawy], [Işjeň], [2026-10-29], [7, 10, 20],),
  ([0069], [Gapy toparlary ynam sanawynda: gurama, syýasat, sertifikat; terminal açary guramanyň adyndan], [Işjeň], [2026-10-29], [10, 16],),
  ([0070], [Wagtlaýyn operator zynjyry], [Işjeň], [2026-10-30], [4, 18],),
  ([0071], [Wagtlaýyn döwürde toruň maliýeleşdirilişi: hyzmat tölegi ýok; gazna grantlary we döwlet\/agza goşandy bilen], [Işjeň], [2026-10-30], [4, 18],),
  ([0072], [Gymmat gatlagy togtadyldy: ADR-0003 ilgekleri gözleg ugry], [Işjeň], [2026-10-30], [4, 19, 23],),
))

#heading(level: 1, numbering: none)[Goşmaça C — Standartlaryň görkezijisi]

Tablisa 52 resminamada agzalan daşky standartlary we kadalaşdyryjy namalary, olaryň wersiýalaryny we Tamga-da ulanylýan bölümlerini berýär. Wersiýalar bu neşiriň taýýarlanan senesine görä; standartlaryň mazmuny sitirlenmeýär, diňe olaryň ulanylýan ýeri görkezilýär.

#tablo([#{strong[Tablisa 52.]} Standartlar we kadalaşdyryjy namalar.], (13fr, 34fr, 18fr, 28fr, 21fr), ([Gurama], [Resminama], [Wersiýa], [Tamga-da], [Bölüm​​​​​​​​​​​​],), (
  ([ÝB], [910\/2014 \[1\] we 2024\/1183 \[2\] düzgünnamalary (eIDAS 2.0)], [2024\/1183, 30 aprel 2024], [çarçuwa, rollar, resminama synplary], [3, 20],),
  ([ÝB], [2024\/2977–2982 \[5\] Ýerine ýetiriş düzgünnamalary], [Dekabr 2024; 2026\/1731 bilen üýtgedilen], [PID we EAA kodlamasy, gapjyk funksiýalary], [3, 13, 14],),
  ([ÝB], [2025\/847 \[6\], 2025\/848, 2025\/849 Ýerine ýetiriş düzgünnamalary], [Maý 2025; 2025\/848, 2026\/1730 bilen üýtgedilen], [waka habar bermek, barlaýjyny hasaba almak, sertifikatly gapjyklaryň sanawy], [7, 18, 20],),
  ([ÝB], [2026\/1730 \[7\], 2026\/1731, 2026\/1735 Ýerine ýetiriş düzgünnamalary], [Iýul 2026], [häzirki standart salgylanmalary; şahsyýet meýdanlary], [3, 14, 20],),
  ([ÝB], [Architecture and Reference Framework (ARF \[11\])], [3\.0.0, iýul 2026], [rollar toplumy, düzgünler, mowzuklar], [3, 13, 20],),
  ([ÝB], [EUDI tehniki spesifikasiýalary (TS3 \[12\], TS10, TS13 …)], [ýaşaýan resminamalar], [WIA we KA, eksport, ZK], [13, 15],),
  ([ÝB], [Attestation Rulebook \[13\] şablony], [1\.5], [Tamga Rulebook-yň şahalary], [18\.8],),
  ([IETF], [RFC 9901 \[15\] SD-JWT], [Noýabr 2025], [resminama formaty], [8],),
  ([IETF], [SD-JWT VC \[16\]], [draft-19], [resminama formaty], [8],),
  ([IETF], [Token Status List \[17\]], [draft-20 (ÝB-niň salgylanýany), draft-21], [ýatyrylyş sanawlary], [12],),
  ([IETF], [OAuth 2.0 Attestation-Based Client Authentication \[18\]], [taslama], [WIA bilen müşderini barlamak], [9, 13],),
  ([IETF], [RFC 9449 DPoP \[20\] · RFC 9126 PAR \[21\] · RFC 7636 PKCE \[22\] · RFC 9700 \[23\]], [çap edilen], [resminama beriş profili], [9],),
  ([IETF], [RFC 5280 \[28\] X.509 · RFC 8949 CBOR \[29\] · RFC 7638 \[24\] · RFC 9180 HPKE \[25\]], [çap edilen], [sertifikatlar, mdoc, açaryň barmak yzy, jogaby şifrlemek], [7, 8, 10],),
  ([OpenID Foundation], [OpenID4VCI 1.0 \[30\]], [Final, sentýabr 2025], [resminama bermek], [9],),
  ([OpenID Foundation], [OpenID4VP 1.0 \[31\] we DCQL], [Final, iýul 2025], [görkezmek], [10],),
  ([OpenID Foundation], [HAIP 1.0 \[32\]], [Final, dekabr 2025], [ýokary kepillik profili], [9, 10],),
  ([ISO\/IEC], [18013-5 \[34\]], [2021], [mdoc, ýakyn aralyk], [8\.3, 10.8],),
  ([ISO\/IEC], [TS 18013-7 \[35\]], [2025], [brauzer arkaly mdoc], [10\.6],),
  ([W3C], [Digital Credentials API \[36\]], [iş taslamasy], [brauzerden görkezmek], [10\.6],),
  ([ETSI], [TS 119 612 \[41\]], [V2.4.1], [XML ynam sanawy görnüşi], [6\.8],),
  ([ETSI], [TS 119 602 \[42\]], [V1.1.1], [LoTE görnüşleri, daşky sanawlar], [6\.8, 6.9],),
  ([ETSI], [TS 119 412-6 \[43\] we EN 319 412-3 \[44\]], [V1.2.1], [gurama sertifikat profili], [7\.3],),
  ([ETSI], [TS 119 411-8 \[45\]], [V1.1.1], [barlaýjynyň giriş sertifikaty], [7\.4],),
  ([ETSI], [TS 119 475 \[46\]], [V1.2.1], [hasaba alyş sertifikaty], [7\.5],),
  ([ETSI], [TS 119 461 \[47\]], [V2.1.1], [uzakdan şahsyýet barlagy], [14],),
  ([ETSI], [TS 119 471 \[48\]; TS 119 472-1 \[49\]; TS 119 472-2 \[50\]; TS 119 472-3 \[51\]], [V1.1.1; V1.2.1; V1.2.1; V1.1.1], [resminama beriji syýasaty, resminama, bermek we görkezmek profilleri], [8, 9, 10, 20],),
  ([ETSI], [EN 319 401 \[52\]; EN 319 132-1 (XAdES \[53\])], [çap edilen], [umumy syýasat; XML goly], [6\.8, 20],),
  ([Cloud Signature Consortium], [CSC API \[54\]], [v2], [uzakdan gol], [7\.6],),
  ([Longfellow ZK], [subutnama ulgamy we CFRG taslamasy], [draft-00], [ýaş subutnamasy], [15\.4],),
  ([ÝB], [European Learning Model \/ Europass \[61\]], [3], [diplom meýdanlarynyň manysy], [8\.5],),
))

#heading(level: 1, numbering: none)[Goşmaça D — Gysgaltmalar]

Tablisa 53 resminamada duş gelýän gysgaltmalary açýar; gysgaltmalaryň köpüsi A goşmaçasynda hem kesgitlenen.

#tablo([#{strong[Tablisa 53.]} Gysgaltmalar.], (13fr, 40fr), ([Gysgaltma], [Doly ady],), (
  ([ADR], [Architecture Decision Record, karar ýazgysy],),
  ([ARF], [Architecture and Reference Framework, Arhitektura we salgylanma çarçuwasy],),
  ([CBOR], [Concise Binary Object Representation],),
  ([CIR], [Commission Implementing Regulation, Komissiýanyň ýerine ýetiriş düzgünnamasy],),
  ([CSC], [Cloud Signature Consortium],),
  ([CWT], [CBOR Web Token],),
  ([DC API], [Digital Credentials API],),
  ([DCQL], [Digital Credentials Query Language],),
  ([DPoP], [Demonstrating Proof of Possession],),
  ([EAA], [Electronic Attestation of Attributes, elektron atribut tassyklamasy],),
  ([EBSI], [European Blockchain Services Infrastructure],),
  ([ELM], [European Learning Model],),
  ([ETSI], [European Telecommunications Standards Institute],),
  ([EUDI], [European Digital Identity, Ýewropa sanly şahsyýeti],),
  ([FW], [Tamga çarçuwa resminamasynyň (framework) belgisi],),
  ([HAIP], [OpenID4VC High Assurance Interoperability Profile],),
  ([HKDF], [HMAC-based Key Derivation Function],),
  ([HMAC], [Hash-based Message Authentication Code],),
  ([HPKE], [Hybrid Public Key Encryption],),
  ([JWE \/ JWS \/ JWT], [JSON Web Encryption \/ Signature \/ Token],),
  ([KA], [Key Attestation, açar tassyklamasy],),
  ([KB-JWT], [Key Binding JWT, enjam baglanyşygynyň goly],),
  ([KVKK], [Türkiýäniň 6698 belgili Şahsy Maglumatlary Goramak Kanuny],),
  ([LoTE], [Lists of Trusted Entities (ETSI TS 119 602)],),
  ([LoTL], [List of Trusted Lists, sanawlaryň sanawy],),
  ([mDL], [mobile Driving Licence],),
  ([OpenID4VCI], [OpenID for Verifiable Credential Issuance],),
  ([OpenID4VP], [OpenID for Verifiable Presentations],),
  ([PAR], [Pushed Authorization Requests],),
  ([PID], [Person Identification Data, şahsy şahsyýet maglumatlary],),
  ([PKCE], [Proof Key for Code Exchange],),
  ([PuB-EAA], [döwlet edarasy tarapyndan berilýän atribut tassyklamasy],),
  ([QBFT], [Quorum Byzantine Fault Tolerance],),
  ([QEAA], [Qualified EAA, kwalifisirlenen atribut tassyklamasy],),
  ([SD-JWT VC], [Selective Disclosure JWT Verifiable Credential],),
  ([SPEC], [Tamga spesifikasiýasynyň belgisi],),
  ([TDG], [Türki Döwletleriň Guramasy (türkçe gysgaltmasy TDT)],),
  ([TS], [Technical Specification],),
  ([VCDM], [W3C Verifiable Credentials Data Model],),
  ([WIA], [Wallet Instance Attestation, gapjyk nusgasy tassyklamasy],),
  ([XAdES], [XML Advanced Electronic Signatures],),
  ([ZK], [Zero-Knowledge, nol bilim],),
))

#heading(level: 1, numbering: none)[Goşmaça E — Resminamalar toplumynyň görkezijisi]

Tamga-nyň çarçuwa resminamalary #{raw("arf.tamga.network/tr/")}, spesifikasiýalary we gollanmalary #{raw("docs.tamga.network/tr/")} bölüminde. Tablisa 54 bu resminamada agzalan belgileri olaryň salgylary bilen gabat getirýär. Salgy kökden soňky ýoldur; çarçuwa resminamalary türk we iňlis dillerinde çap edilýär.

#tablo([#{strong[Tablisa 54.]} Çarçuwa resminamalary, spesifikasiýalar we gollanmalar.], (20fr, 20fr, 48fr), ([Belgi], [Ady], [Salgy],), (
  ([FW-ARF-0001], [Arhitektura we salgylanma çarçuwasy], [#{raw("arf.tamga.network/tr/architecture")}],),
  ([FW-TF-0001], [A goşundy: Trust Framework], [#{raw("arf.tamga.network/tr/trust-framework")}],),
  ([FW-RB-0001], [B goşundy: Tamga Rulebook], [#{raw("arf.tamga.network/tr/rulebook")}],),
  ([FW-RB-0002], [Education Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/education")}],),
  ([FW-RB-0003], [Identity Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/identity")}],),
  ([FW-RB-0004], [Event Ticket Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/event-ticket")}],),
  ([FW-RB-0005], [Contact Rulebook], [#{raw("arf.tamga.network/tr/rulebooks/contact")}],),
  ([FW-DEF-0001], [D goşundy: Kesgitlemeler], [#{raw("arf.tamga.network/tr/definitions")}],),
  ([FW-REF-0001], [E goşundy: Çeşmeler], [#{raw("arf.tamga.network/tr/references")}],),
  ([FW-ROLE-0001], [Rollar], [#{raw("arf.tamga.network/tr/roles")}],),
  ([FW-ONB-0001], [Gatnaşmak prosesi], [#{raw("arf.tamga.network/tr/onboarding")}],),
  ([FW-POL-0001], [Ýatyrylyş syýasaty], [#{raw("arf.tamga.network/tr/policies/revocation")}],),
  ([FW-POL-0002], [Gapjyk tassyklamasy syýasaty], [#{raw("arf.tamga.network/tr/policies/wallet-attestation")}],),
  ([FW-POL-0003], [Hasaba alyş sertifikaty syýasaty], [#{raw("arf.tamga.network/tr/policies/registration-certificate")}],),
  ([SPEC-TRUST-0001], [Ynam sanawlary], [#{raw("docs.tamga.network/tr/specifications/trust-lists")}],),
  ([SPEC-ID-0002], [Guramanyň şahsyýeti (X.509)], [#{raw("docs.tamga.network/tr/specifications/x509-identity")}],),
  ([SPEC-ID-0003], [Şahsyýet barlagy], [#{raw("docs.tamga.network/tr/specifications/identity-proofing")}],),
  ([SPEC-CRED-0001], [Resminama formaty we protokollar], [#{raw("docs.tamga.network/tr/specifications/credential-format")}],),
  ([SPEC-CRED-0002], [SD-JWT VC profili], [#{raw("docs.tamga.network/tr/specifications/sd-jwt-vc")}],),
  ([SPEC-CRED-0003], [Ýatyrylyş we ýagdaý sanawy], [#{raw("docs.tamga.network/tr/specifications/status-list")}],),
  ([SPEC-SCHEMA-0001], [Shema katalogy], [#{raw("docs.tamga.network/tr/specifications/schema-catalog")}],),
  ([SPEC-SCHEMA-0002], [Bilim shemalary], [#{raw("docs.tamga.network/tr/specifications/education-schemas")}],),
  ([SPEC-SCHEMA-0003], [Pudak shemalary], [#{raw("docs.tamga.network/tr/specifications/sector-schemas")}],),
  ([SPEC-PROTO-0001], [OpenID4VCI profili], [#{raw("docs.tamga.network/tr/specifications/openid4vci")}],),
  ([SPEC-PROTO-0002], [OpenID4VP profili], [#{raw("docs.tamga.network/tr/specifications/openid4vp")}],),
  ([SPEC-API-0001], [Barlag hatary we API], [#{raw("docs.tamga.network/tr/specifications/verification-api")}],),
  ([SPEC-WALLET-0001], [Gapjyk düzgünleri], [#{raw("docs.tamga.network/tr/specifications/wallet")}],),
  ([GUIDE-0009], [Laýyklyk synaglary], [#{raw("docs.tamga.network/tr/guides/conformance")}],),
  ([GUIDE-0013], [Sandbox: synag tory], [#{raw("docs.tamga.network/tr/guides/sandbox")}],),
  ([ADR-0001 … ADR-0072], [Karar ýazgylary (B goşmaça)], [#{raw("docs.tamga.network/tr/adr/")}],),
))

#heading(level: 1, numbering: none)[Çeşmeler]

#kaynak("1")[Ýewropa Parlamenti we Geňeşi (2014). #{emph[Içerki bazarda elektron amallar üçin elektron şahsyýetlendirme we ynam hyzmatlary hakyndaky 910\/2014 belgili Düzgünnama (ÝB).]} Ýewropa Bileleşiginiň Resmi Žurnaly, L 257, 28 awgust 2014; 2024\/1183 bilen üýtgedilen jemlenen tekst, CELEX 02014R0910-20241018.]

#kaynak("2")[Ýewropa Parlamenti we Geňeşi (2024). #{emph[Ýewropa Sanly Şahsyýet Çarçuwasyny döretmek babatda 910\/2014 belgili Düzgünnamany üýtgedýän 2024-nji ýylyň 11-nji aprelindäki 2024\/1183 belgili Düzgünnama (ÝB).]} Ýewropa Bileleşiginiň Resmi Žurnaly, 30 aprel 2024. http:\/\/data.europa.eu\/eli\/reg\/2024\/1183\/oj]

#kaynak("3")[Ýewropa Komissiýasy (2021). #{emph[Ýewropa Sanly Şahsyýet Çarçuwasyna utgaşdyrylan çemeleşme üçin Bileleşigiň umumy gural toplumy hakyndaky 2021\/946 belgili Maslahat (ÝB).]} 3 iýun 2021.]

#kaynak("4")[Ýewropa Komissiýasy (2015). #{emph[Elektron şahsyýetlendirme serişdeleriniň kepillik derejeleri üçin iň az tehniki şertleri we proseduralary kesgitleýän 2015\/1502 belgili Ýerine ýetiriş düzgünnamasy (ÝB).]} Ýewropa Bileleşiginiň Resmi Žurnaly, L 235, 9 sentýabr 2015.]

#kaynak("5")[Ýewropa Komissiýasy (2024). #{emph[2024\/2977, 2024\/2979, 2024\/2980, 2024\/2981 we 2024\/2982 belgili Ýerine ýetiriş düzgünnamalary (ÝB)]} (Ýewropa Sanly Şahsyýet Gapjyklary). 28 noýabr 2024; Ýewropa Bileleşiginiň Resmi Žurnaly, 4 dekabr 2024.]

#kaynak("6")[Ýewropa Komissiýasy (2025). #{emph[2025\/846, 2025\/847 (gapjyklardaky howpsuzlyk bozulmalaryna jogap), 2025\/848 (gapjyga ynanýan taraplary hasaba almak) we 2025\/849 (sertifikatly gapjyklaryň sanawy) belgili Ýerine ýetiriş düzgünnamalary (ÝB).]} 6 maý 2025; Ýewropa Bileleşiginiň Resmi Žurnaly, 7 maý 2025.]

#kaynak("7")[Ýewropa Komissiýasy (2026). #{emph[2026\/1730, 2026\/1731 we 2026\/1735 belgili Ýerine ýetiriş düzgünnamalary (ÝB)]}, ulanyljak standartlar we spesifikasiýalar babatda. 15 iýul 2026; Ýewropa Bileleşiginiň Resmi Žurnaly, 22 iýul 2026.]

#kaynak("8")[Ýewropa Parlamenti we Geňeşi (2016). #{emph[Şahsy maglumatlary işlemek babatda fiziki şahslary goramak we bu maglumatlaryň erkin hereketi hakyndaky 2016\/679 belgili Düzgünnama (ÝB) (Maglumatlary Goramagyň Umumy Düzgünnamasy).]} Ýewropa Bileleşiginiň Resmi Žurnaly, L 119, 4 maý 2016.]

#kaynak("9")[#{emph[6698 sayılı Kişisel Verilerin Korunması Kanunu]} \[6698 belgili Şahsy Maglumatlary Goramak Kanuny\]. Resmî Gazete, 7 aprel 2016, sany 29677.]

#kaynak("10")[#{emph[7578 sayılı Sosyal Hizmetler Kanunu ve Bazı Kanunlarda Değişiklik Yapılmasına Dair Kanun]} \[Sosial hyzmatlar kanunyna we käbir kanunlara üýtgetmeler girizmek hakyndaky 7578 belgili Kanun\]. Resmî Gazete, 1 maý 2026, sany 33240.]

#kaynak("11")[Ýewropa Komissiýasy we eIDAS bilermenler topary (2026). #{emph[European Digital Identity Wallet: Architecture and Reference Framework (ARF)]}, wersiýa 3.0.0, 23 iýul 2026. https:\/\/eu-digital-identity-wallet.github.io\/eudi-doc-architecture-and-reference-framework\/]

#kaynak("12")[Ýewropa Komissiýasy. #{emph[EUDI Wallet Standards and Technical Specifications]} (TS3 gapjyk birligi tassyklamalary, TS5 we TS6 ynanýan taraplary hasaba almak, TS9 gapjykdan gapjyga täsirleşme, TS10 maglumatlaryň göçürilip bilinmegi, TS13 arifmetik zynjyrlar bilen nol bilimli subutnama). https:\/\/github.com\/eu-digital-identity-wallet\/eudi-doc-standards-and-technical-specifications]

#kaynak("13")[Ýewropa Komissiýasy. #{emph[EUDI Wallet attestation rulebooks catalog]}: Attestation Rulebook şablony, wersiýa 1.5; PID we mDL Rulebook. https:\/\/github.com\/eu-digital-identity-wallet\/eudi-doc-attestation-rulebooks-catalog]

#kaynak("14")[Ýewropa Komissiýasy. #{emph[Pilot for the International Compatibility of Trust Services]} we üçünji ýurt ynam sanawlary. https:\/\/ec.europa.eu (girilen wagty: noýabr 2026).]

#kaynak("15")[Fett, D., Yasuda, K. we Campbell, B. (2025). #{emph[Selective Disclosure for JSON Web Tokens (SD-JWT).]} IETF RFC 9901, noýabr 2025.]

#kaynak("16")[Terbu, O., Fett, D. we Campbell, B. #{emph[SD-JWT-based Verifiable Digital Credentials (SD-JWT VC).]} IETF OAuth iş toparynyň Internet taslamasy draft-ietf-oauth-sd-jwt-vc-19, 2026. https:\/\/datatracker.ietf.org\/doc\/draft-ietf-oauth-sd-jwt-vc\/]

#kaynak("17")[Looker, T., Bastian, P. we Bormann, C. #{emph[Token Status List.]} IETF OAuth iş toparynyň Internet taslamasy draft-ietf-oauth-status-list-20 (20 aprel 2026; ÝB-niň 2026\/1731 bilen salgylanýan wersiýasy) we draft-21 (21 iýun 2026). https:\/\/datatracker.ietf.org\/doc\/draft-ietf-oauth-status-list\/]

#kaynak("18")[Looker, T., Bastian, P. we Bormann, C. #{emph[OAuth 2.0 Attestation-Based Client Authentication.]} IETF OAuth iş toparynyň Internet taslamasy (draft-ietf-oauth-attestation-based-client-auth).]

#kaynak("19")[Hardt, D. (Ed.) (2012). #{emph[The OAuth 2.0 Authorization Framework.]} IETF RFC 6749, oktýabr 2012.]

#kaynak("20")[Fett, D., Campbell, B., Bradley, J., Lodderstedt, T., Jones, M. we Waite, D. (2023). #{emph[OAuth 2.0 Demonstrating Proof of Possession (DPoP).]} IETF RFC 9449, sentýabr 2023.]

#kaynak("21")[Lodderstedt, T., Campbell, B., Sakimura, N., Tonge, D. we Skokan, F. (2021). #{emph[OAuth 2.0 Pushed Authorization Requests.]} IETF RFC 9126, sentýabr 2021.]

#kaynak("22")[Sakimura, N., Bradley, J. we Agarwal, N. (2015). #{emph[Proof Key for Code Exchange by OAuth Public Clients.]} IETF RFC 7636, sentýabr 2015.]

#kaynak("23")[Lodderstedt, T., Bradley, J., Labunets, A. we Fett, D. (2025). #{emph[Best Current Practice for OAuth 2.0 Security.]} IETF RFC 9700, ýanwar 2025.]

#kaynak("24")[Jones, M. we Sakimura, N. (2015). #{emph[JSON Web Key (JWK) Thumbprint.]} IETF RFC 7638, sentýabr 2015.]

#kaynak("25")[Barnes, R., Bhargavan, K., Lipp, B. we Wood, C. (2022). #{emph[Hybrid Public Key Encryption.]} IETF RFC 9180, fewral 2022.]

#kaynak("26")[Krawczyk, H., Bellare, M. we Canetti, R. (1997). #{emph[HMAC: Keyed-Hashing for Message Authentication.]} IETF RFC 2104, fewral 1997.]

#kaynak("27")[Krawczyk, H. we Eronen, P. (2010). #{emph[HMAC-based Extract-and-Expand Key Derivation Function (HKDF).]} IETF RFC 5869, maý 2010.]

#kaynak("28")[Cooper, D., Santesson, S., Farrell, S., Boeyen, S., Housley, R. we Polk, W. (2008). #{emph[Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile.]} IETF RFC 5280, maý 2008.]

#kaynak("29")[Bormann, C. we Hoffman, P. (2020). #{emph[Concise Binary Object Representation (CBOR).]} IETF RFC 8949, dekabr 2020.]

#kaynak("30")[Lodderstedt, T., Yasuda, K., Looker, T. we Bastian, P. (2025). #{emph[OpenID for Verifiable Credential Issuance 1.0.]} OpenID Foundation, soňky wersiýa, 16 sentýabr 2025. https:\/\/openid.net\/specs\/openid-4-verifiable-credential-issuance-1\_0.html]

#kaynak("31")[Terbu, O., Lodderstedt, T., Yasuda, K., Fett, D. we Heenan, J. (2025). #{emph[OpenID for Verifiable Presentations 1.0.]} OpenID Foundation, soňky wersiýa, 9 iýul 2025. https:\/\/openid.net\/specs\/openid-4-verifiable-presentations-1\_0.html]

#kaynak("32")[Yasuda, K., Lodderstedt, T., Bormann, C. we Heenan, J. (2025). #{emph[OpenID4VC High Assurance Interoperability Profile (HAIP) 1.0.]} OpenID Foundation, soňky wersiýa, 24 dekabr 2025. https:\/\/openid.net\/specs\/openid4vc-high-assurance-interoperability-profile-1\_0.html]

#kaynak("33")[OpenID Foundation. #{emph[OpenID Conformance Suite]} we öz-sertifikatlaşdyrma. https:\/\/openid.net\/certification\/ · Tamga Network, #{emph[oidf-conformance-kit]}. https:\/\/github.com\/tamga-network\/oidf-conformance-kit]

#kaynak("34")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification: ISO-compliant driving licence, Part 5: Mobile driving licence (mDL) application.]} ISO\/IEC JTC 1\/SC 17. https:\/\/www.iso.org\/standard\/69084.html]

#kaynak("35")[ISO\/IEC (2025). #{emph[ISO\/IEC TS 18013-7:2025 Personal identification: ISO-compliant driving licence, Part 7: Mobile driving licence (mDL) add-on functions.]} Ikinji neşir, maý 2025.]

#kaynak("36")[Caceres, M., Cappalli, T. we Yosef, M. A. (Ed.) (2026). #{emph[Digital Credentials.]} W3C Working Draft, Federated Identity Working Group, 29 oktýabr 2026. https:\/\/www.w3.org\/TR\/digital-credentials\/]

#kaynak("37")[W3C (2025). #{emph[Verifiable Credentials Data Model v2.0.]} W3C Recommendation, 15 maý 2025. https:\/\/www.w3.org\/TR\/vc-data-model-2.0\/]

#kaynak("38")[W3C (2016). #{emph[Subresource Integrity.]} W3C Recommendation, iýun 2016. https:\/\/www.w3.org\/TR\/SRI\/]

#kaynak("39")[JSON Schema. #{emph[JSON Schema: A Media Type for Describing JSON Documents]}, draft 2020-12. https:\/\/json-schema.org\/draft\/2020-12]

#kaynak("40")[ISO\/IEC (2020). #{emph[ISO\/IEC 17000:2020 Conformity assessment: Vocabulary and general principles.]}]

#kaynak("41")[ETSI (2025). #{emph[ETSI TS 119 612 V2.4.1: Electronic Signatures and Trust Infrastructures (ESI); Trusted Lists.]} Awgust 2025.]

#kaynak("42")[ETSI (2025). #{emph[ETSI TS 119 602 V1.1.1: Electronic Signatures and Trust Infrastructures (ESI); Lists of Trusted Entities; Data model.]} Noýabr 2025.]

#kaynak("43")[ETSI (2026). #{emph[ETSI TS 119 412-6 V1.2.1: ESI; Certificate Profiles; Part 6: Certificate profile requirements for PID, Wallet, EAA, QEAA and PSBEAA providers.]} Aprel 2026.]

#kaynak("44")[ETSI. #{emph[ETSI EN 319 412-3: ESI; Certificate Profiles; Part 3: Certificate profile for certificates issued to legal persons.]}]

#kaynak("45")[ETSI (2025). #{emph[ETSI TS 119 411-8 V1.1.1: ESI; Policy and security requirements for Trust Service Providers issuing certificates; Part 8: Access Certificate Policy for EUDI Wallet Relying Parties.]} Oktýabr 2025.]

#kaynak("46")[ETSI (2026). #{emph[ETSI TS 119 475 V1.2.1: ESI; Relying party attributes supporting EUDI Wallet user’s authorisation decisions.]} Mart 2026.]

#kaynak("47")[ETSI (2025). #{emph[ETSI TS 119 461 V2.1.1: ESI; Policy and security requirements for trust service components providing identity proofing of trust service subjects.]} Fewral 2025.]

#kaynak("48")[ETSI (2025). #{emph[ETSI TS 119 471 V1.1.1: ESI; Policy and security requirements for providers of electronic attestation of attributes services.]} Maý 2025.]

#kaynak("49")[ETSI (2026). #{emph[ETSI TS 119 472-1 V1.2.1: ESI; Profiles for Electronic Attestation of Attributes; Part 1: General requirements.]} Fewral 2026.]

#kaynak("50")[ETSI (2026). #{emph[ETSI TS 119 472-2 V1.2.1: ESI; Profiles for Electronic Attestation of Attributes; Part 2: Profiles for EAA\/PID Presentations to Relying Party.]} Mart 2026.]

#kaynak("51")[ETSI (2026). #{emph[ETSI TS 119 472-3 V1.1.1: ESI; Profiles for Electronic Attestation of Attributes; Part 3: Profiles for issuance of EAA or PID.]} Mart 2026.]

#kaynak("52")[ETSI. #{emph[ETSI EN 319 401: ESI; General Policy Requirements for Trust Service Providers.]}]

#kaynak("53")[ETSI. #{emph[ETSI EN 319 132-1: ESI; XAdES digital signatures; Part 1: Building blocks and XAdES baseline signatures.]}]

#kaynak("54")[Cloud Signature Consortium. #{emph[Architectures and protocols for remote signature applications]} (CSC API), wersiýa 2. https:\/\/cloudsignatureconsortium.org\/]

#kaynak("55")[ENISA (2022). #{emph[Remote Identity Proofing: Attacks & Countermeasures.]} Ýewropa Bileleşiginiň Kiberhowpsuzlyk Agentligi, ýanwar 2022.]

#kaynak("56")[Frigo, M. we shelat, a. (2024). "Anonymous Credentials from ECDSA." #{emph[Cryptology ePrint Archive]}, Hasabat 2024\/2010.]

#kaynak("57")[Frigo, M. we shelat, a. (2026). #{emph[Longfellow ZK.]} IRTF CFRG Internet taslamasy draft-irtf-cfrg-longfellow-00, 19 oktýabr 2026; açyk çeşmeli amala aşyrylyşy https:\/\/github.com\/longfellow-zk\/longfellow-zk]

#kaynak("58")[Lamport, L., Shostak, R. we Pease, M. (1982). "The Byzantine Generals Problem." #{emph[ACM Transactions on Programming Languages and Systems]}, 4(3), 382–401.]

#kaynak("59")[Hyperledger Besu resminamalary: "QBFT", "Local permissioning" we 25.6.0 wersiýa bellikleri. https:\/\/besu.hyperledger.org (girilen wagty: noýabr 2026).]

#kaynak("60")[European Blockchain Services Infrastructure (EBSI). Resminamalar. https:\/\/hub.ebsi.eu (girilen wagty: noýabr 2026).]

#kaynak("61")[Ýewropa Komissiýasy. #{emph[Europass we European Learning Model (ELM)]}, wersiýa 3. https:\/\/europa.eu\/europass\/]

#kaynak("62")[Tamga Network (2026). #{emph[Kadim mührün çağdaş karşılığını inşa ediyoruz]} \[Gadymy möhrüň häzirki zaman gabatlygyny gurýarys\] (manifest), wersiýa 1.0, noýabr 2026. https:\/\/tamga.network\/manifesto-tr.pdf]

#kaynak("63")[Tamga Network (2026). #{emph[Mimari ve Referans Çerçevesi]} \[Arhitektura we salgylanma çarçuwasy\] (FW-ARF-0001) we onuň goşundylary: Trust Framework, Tamga Rulebook we resminama görnüşleriniň rulebook-lary, Kesgitlemeler, Çeşmeler, Rollar, Gatnaşmak, Ýatyrylyş, Gapjyk tassyklamasy we Hasaba alyş sertifikaty syýasatlary; wersiýa 1.0.0. https:\/\/arf.tamga.network\/tr\/ (belgiler E goşmaçasynda).]

#kaynak("64")[Tamga Network (2026). #{emph[Şartnameler]} \[Spesifikasiýalar\] (SPEC-TRUST-0001, SPEC-ID-0002\/0003, SPEC-CRED-0001\/0002\/0003, SPEC-SCHEMA-0001\/0002\/0003, SPEC-PROTO-0001\/0002, SPEC-API-0001, SPEC-WALLET-0001), wersiýa 1.0.0; gollanmalar we düşünje sahypalary. https:\/\/docs.tamga.network\/tr\/]

#kaynak("65")[Tamga Network (2026). #{emph[Mimari karar kayıtları]} \[Arhitektura karar ýazgylary\] ADR-0001…ADR-0072. https:\/\/docs.tamga.network\/tr\/adr\/ (görkezijisi B goşmaçasynda).]

#kaynak("66")[Tamga Network (2026). #{emph[tamga-network]} ammary: README, SECURITY.md, CHANGELOG (0.8.2, 5 noýabr 2026) we #{raw("@tamga-network/*")} paketleri, Apache-2.0. https:\/\/github.com\/tamga-network\/tamga-network]

#kaynak("67")[Tamga Network Akademik Çalışmalar A1 (2026). #{emph[Dijital Kimliğin Evrimi: Kullanıcı Adından Kimlik Cüzdanına]} \[Sanly şahsyýetiň ewolýusiýasy: ulanyjy adyndan şahsyýet gapjygyna\]. https:\/\/tamga.network\/files\/publications\/evolution-of-digital-identity-tr.pdf]

#kaynak("68")[Tamga Network Akademik Çalışmalar A3 (2026). #{emph[Seçici Açıklama: Gerekeni Göster, Gerisi Sende Kalsın]} \[Saýlap açmak: gerekli zady görkez, galany sende galsyn\]. https:\/\/tamga.network\/files\/publications\/selective-disclosure-tr.pdf]

#kaynak("69")[Tamga Network Akademik Çalışmalar A4 (2026). #{emph[Sıfır Bilgi İspatları ve Kimlik]} \[Nol bilimli subutnamalar we şahsyýet\]. https:\/\/tamga.network\/files\/publications\/zero-knowledge-proofs-tr.pdf]

#kaynak("70")[Tamga Network Akademik Çalışmalar A5 (2026). #{emph[Bağlanamazlık: Doğrulayıcılar Seni Birbirine Anlatmasın]} \[Baglanyşyksyzlyk: barlaýjylar seni biri-birine gürrüň bermesin\]. https:\/\/tamga.network\/files\/publications\/unlinkability-tr.pdf]

#kaynak("71")[Tamga Network Akademik Çalışmalar A6 (2026). #{emph[Kime Güveniyoruz? Güven Listeleri ve Dijital Güven Altyapısı]} \[Kime ynanýarys? Ynam sanawlary we sanly ynam infrastrukturasy\]. https:\/\/tamga.network\/files\/publications\/trust-lists-tr.pdf]

#kaynak("72")[Tamga Network Akademik Çalışmalar A7 (2026). #{emph[İptal: Bir Belgeyi Geri Almak, Kimseyi İzlemeden]} \[Ýatyrylyş: resminamany yzyna almak, hiç kimi yzarlamazdan\]. https:\/\/tamga.network\/files\/publications\/revocation-tr.pdf]

#kaynak("73")[Tamga Network Akademik Çalışmalar A8 (2026). #{emph[Belge Nasıl Verilir, Nasıl Gösterilir]} \[Resminama nähili berilýär, nähili görkezilýär\]. https:\/\/tamga.network\/files\/publications\/issuing-and-presenting-tr.pdf]

#kaynak("74")[Tamga Network Akademik Çalışmalar A9 (2026). #{emph[Yüz Yüze Doğrulama: NFC, Bluetooth ve Mobil Ehliyet]} \[Ýüzbe-ýüz barlag: NFC, Bluetooth we mobil sürüjilik şahadatnamasy\]. https:\/\/tamga.network\/files\/publications\/in-person-verification-tr.pdf]

#kaynak("75")[Tamga Network Akademik Çalışmalar A10 (2027, neşir meýilnamasyna görä). #{emph[Cüzdan Güvenliği: Anahtar Nerede Saklanır, Telefon Gerçek mi?]} \[Gapjyk howpsuzlygy: açar nirede saklanýar, telefon hakykymy?\] https:\/\/tamga.network\/files\/publications\/wallet-security-tr.pdf]

#kaynak("76")[Tamga Network Akademik Çalışmalar A11 (2027, neşir meýilnamasyna görä). #{emph[eIDAS 2.0’a Hukuk Dışından Bakış]} \[eIDAS 2.0-a hukukdan daşarda bir garaýyş\]. https:\/\/tamga.network\/files\/publications\/eidas-2-explained-tr.pdf]

#kaynak("77")[Tamga Network Akademik Çalışmalar A12 (2027, neşir meýilnamasyna görä). #{emph[Blokzincir ve Dijital Kimlik]} \[Blokçeýn we sanly şahsyýet\]. https:\/\/tamga.network\/files\/publications\/blockchain-and-identity-tr.pdf]

#kaynak("78")[Tamga Network Akademik Çalışmalar A14 (2027, neşir meýilnamasyna görä). #{emph[Deepfake Çağında Kimlik Doğrulama]} \[Deepfake döwründe şahsyýet barlagy\]. https:\/\/tamga.network\/files\/publications\/deepfakes-and-identity-verification-tr.pdf]

#kaynak("79")[Tamga Network Akademik Çalışmalar A15 (2027, neşir meýilnamasyna görä). #{emph[Kuantum Sonrası Dönemde Dijital Kimlik]} \[Kwantdan soňky döwürde sanly şahsyýet\]. https:\/\/tamga.network\/files\/publications\/post-quantum-identity-tr.pdf]

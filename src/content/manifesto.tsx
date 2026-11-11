import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

/*
 * Manifesto v1.0, revised edition November 2026 (first edition 2026-10-03). Same text as the PDF (public/manifesto-<lang>.pdf,
 * built with publications/md2typ.mjs + publications/build.ps1 from the manifesto Markdown source); change both together.
 * Facts: tamga-network DECISIONS §0, ADR-0009 (lists first, ledger threshold), ADR-0042 (the network runs no wallet), ADR-0051
 * (chain mirrors the signed lists), ADR-0064 (age_over_15), foundation handover plan.
 */

export type ManifestoContent = {
  meta: { title: string; description: string };
  mastheadSub: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: ReactNode;
  theses: { n: string; title: string; body: ReactNode }[];
  closingTitle: string;
  closing: ReactNode;
  slogan: string;
  /** Edition line printed at the end of the PDF. */
  edition: string;
  linkWhitepaper: string;
  linkDocs: string;
};

const en: ManifestoContent = {
  meta: {
    title: "Manifesto",
    description:
      "The Tamga Network Manifesto, eight principles on digital trust for Türkiye and the Turkic world: why it should be a shared, sovereign and interoperable infrastructure.",
  },
  mastheadSub: "Manifesto · v1.0 · November 2026",
  eyebrow: "Manifesto",
  title: "We are building the modern counterpart of the ancient seal",
  subtitle: "Eight principles on digital trust for Türkiye and the Turkic world",
  lead: (
    <>
      The world is changing how it establishes trust. Europe has required every member state, by
      regulation, to offer its citizens a digital identity wallet, and a standard is taking shape around
      it. Whether this change will happen is no longer the question.{" "}
      <span className="text-primary">The question is who will build it and who will only buy it.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Trust is infrastructure",
      body: (
        <>
          No application should have to verify identity, authority and documents from scratch. Electricity and
          the internet are shared infrastructure, and digital trust should be one too, something every bank,
          university, employer and gate draws on rather than rebuilds. We are building that infrastructure so
          that it can be handed over, first to a foundation and, as states join, to the states themselves. The
          network is not-for-profit and sells no services. Its rules and trust lists are public and the code
          of its packages is open source, so anyone can read and check them.
        </>
      ),
    },
    {
      n: "02",
      title: "Data stays in the hands of its owner",
      body: (
        <>
          Nobody should have to hand over a copy of a document to prove something about themselves. The
          document stays on the person’s phone and only the proof that is needed leaves it. The person shows
          only the fields that are asked for, which is called selective disclosure. They can show they are
          over 15 or over 18 without revealing a birth date, and the verifier gets a yes or a no. We treat
          this as a right, and the technology now makes it cheap to honour.
        </>
      ),
    },
    {
      n: "03",
      title: "Verification must not go back to the source",
      body: (
        <>
          A document’s authenticity should rest on mathematics rather than on how convincing a photocopy
          looks. A cryptographic signature proves who issued a document and that nothing in it was changed,
          and it does so without asking the issuer, so the issuer does not learn where the document was used.
          Whether a document has been revoked is read from a status list the issuer publishes. The list is
          downloaded as a whole, so the issuer cannot tell which document was checked.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain is a tool, and only a tool",
      body: (
        <>
          There is no blockchain in the network today, and trust does not need one. It rests on signed, public
          trust lists that anyone can download and check. A shared ledger adds something only when independent
          parties run it together, and even then it carries only digests and fingerprints of list records, never personal data. The code for
          it is written and tested, and it stays switched off until a second independent operator joins.{" "}
          <strong>Personal data is never written to either.</strong> The person never sees any of this and
          simply uses their identity.
        </>
      ),
    },
    {
      n: "05",
      title: "Open standards, no lock-in",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC and X.509 are open standards the EU has chosen, and we use them as
          they are, with the EU’s own profiles. We bind ourselves to standards the world agrees on rather than
          to any company’s product, including our own. Any verifier that follows the same standards can then
          read a credential an institution has issued. The network runs no wallet; it lists every wallet that
          follows the rules. The first wallet on the list, Tamga Wallet, is a separate product and entered the
          list the same way any other will.
        </>
      ),
    },
    {
      n: "06",
      title: "Sovereign and compatible at once",
      body: (
        <>
          As the world moves to portable proofs, we have two paths: import the change from outside, or build
          our own infrastructure on the same open standards and keep the keys to it. We choose the second.
          Compatibility means following the formats and rules the EU has chosen; sovereignty means deciding
          for ourselves who is trusted. <strong>The same standards, our own network,</strong> and every state,
          once it joins, the only writer of its own registry.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga is a shared tradition of the seal",
      body: (
        <>
          A <em>tamga</em> was the ancient seal of the Turkic peoples, a mark that proved ownership, belonging
          and authority. A verifiable digital credential is its modern counterpart. Peoples who share a
          language family, a culture and a history are natural ground for a shared foundation of digital
          trust, and every one of them keeps its own seal.
        </>
      ),
    },
    {
      n: "08",
      title: "A mesh, not a center",
      body: (
        <>
          We want no single authority. We want a mesh of interoperable, independent trust lists, in which each
          country keeps its own trust list, institutions and governance and connects to the others through
          shared standards. Being on one list does not put anyone on another; each network decides for itself
          whom it recognises. The same standards also let it talk to Europe.
        </>
      ),
    },
  ],
  closingTitle: "Our aim",
  closing: (
    <>
      We want to take digital trust out of the list of problems each application solves anew, and to make
      it a shared, sovereign and interoperable infrastructure for Türkiye and the Turkic world.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  edition: "Version 1.0, revised edition, November 2026. First edition 3 October 2026.",
  linkWhitepaper: "Read the whitepaper →",
  linkDocs: "Learn the concepts from scratch →",
};

const tr: ManifestoContent = {
  meta: {
    title: "Manifesto",
    description:
      "Tamga Network Manifestosu, Türkiye ve Türk dünyası için dijital güven üzerine sekiz ilke: dijital güven neden ortak, egemen ve birlikte çalışabilir bir altyapı olmalı.",
  },
  mastheadSub: "Manifesto · v1.0 · Kasım 2026",
  eyebrow: "Manifesto",
  title: "Kadim mührün çağdaş karşılığını inşa ediyoruz",
  subtitle: "Türkiye ve Türk dünyası için dijital güven üzerine sekiz ilke",
  lead: (
    <>
      Dünya güveni kurma biçimini değiştiriyor. Avrupa, her üye devletin vatandaşına bir dijital kimlik
      cüzdanı sunmasını düzenlemeyle zorunlu kıldı ve çevresinde bir standart oluşuyor. Bu dönüşümün olup
      olmayacağı artık soru olmaktan çıktı.{" "}
      <span className="text-primary">Şimdi soru, onu kimin kuracağı ve kimin yalnızca satın alacağı.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Güven bir altyapıdır",
      body: (
        <>
          Hiçbir uygulama kimliği, yetkiyi ve belgeyi sıfırdan doğrulamak zorunda kalmamalı. Elektrik ve
          internet nasıl ortak altyapıysa dijital güven de öyle olmalı; her banka, üniversite, işveren ve kapı
          onu yeniden kurmak yerine ondan yararlanmalı. Biz bu altyapıyı devredilebilecek biçimde kuruyoruz:
          önce bir vakfa, devletler katıldıkça da onların kendisine. Ağ kâr amacı gütmez ve hizmet satmaz.
          Kuralları ve güven listeleri açıktır, paketlerinin kodu da açık kaynaklıdır; herkes okuyabilir ve
          denetleyebilir.
        </>
      ),
    },
    {
      n: "02",
      title: "Veri, sahibinin elinde kalır",
      body: (
        <>
          Kimse kendisiyle ilgili bir şeyi kanıtlamak için belgesinin kopyasını teslim etmek zorunda
          kalmamalı. Belge kişinin telefonunda kalır ve telefondan yalnızca gereken kanıt çıkar. Kişi belgenin
          yalnız istenen alanlarını gösterir; buna seçici açıklama denir. Doğum tarihini vermeden 15 ya da 18
          yaşından büyük olduğunu gösterebilir, doğrulayan taraf da yalnızca evet ya da hayır görür. Biz bunu
          bir hak sayıyoruz ve teknoloji bu hakka saygı göstermeyi artık kolaylaştırıyor.
        </>
      ),
    },
    {
      n: "03",
      title: "Doğrulama kaynağa gitmeden yapılmalı",
      body: (
        <>
          Bir belgenin gerçek olduğuna matematik karar vermeli; fotokopinin ne kadar ikna edici göründüğü ölçü
          olamaz. Kriptografik imza belgeyi kimin verdiğini ve içinde hiçbir şeyin değişmediğini kanıtlar.
          Bunu belgeyi verene sormadan yapar, bu yüzden veren kurum belgenin nerede kullanıldığını öğrenmez.
          Belgenin iptal edilip edilmediği de kurumun yayımladığı durum listesinden okunur. Liste bütün olarak
          indirildiği için kurum hangi belgenin sorulduğunu bilmez.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain araçtır, yalnızca araç",
      body: (
        <>
          Bugün ağda bir blockchain yok ve güvenin ona ihtiyacı da yok. Güven, herkesin indirip
          denetleyebildiği imzalı, açık güven listelerine dayanır. Ortak bir defter ancak bağımsız taraflar
          onu birlikte işlettiğinde bir şey katar ve o zaman da yalnız liste kayıtlarının özetlerini ve parmak izlerini taşır, kişisel veriyi asla. Defterin
          kodu yazıldı ve test edildi; ikinci bağımsız işletmeci katılana kadar kapalı kalır. <strong>Kişisel
          veri ikisine de asla yazılmaz.</strong> Kişi bunların hiçbirini görmez; yalnızca kimliğini kullanır.
        </>
      ),
    },
    {
      n: "05",
      title: "Açık standartlar, kilitlenme yok",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC ve X.509, AB’nin seçtiği açık standartlardır ve biz onları AB’nin
          profilleriyle olduğu gibi kullanırız. Kendimizi dünyanın üzerinde uzlaştığı standartlara bağlarız;
          herhangi bir şirketin ürününe bağlamayız, kendi ürünümüze de. Böylece bir kurumun verdiği belgeyi,
          aynı standartları izleyen her doğrulayıcı okuyabilir. Ağ cüzdan işletmez, kurallara uyan her cüzdanı
          listeler. Listeye giren ilk cüzdan Tamga Wallet ayrı bir üründür ve listeye başka her cüzdanın
          gireceği yoldan girdi.
        </>
      ),
    },
    {
      n: "06",
      title: "Egemenlik ve uyum aynı anda mümkündür",
      body: (
        <>
          Dünya taşınabilir kanıta geçerken önümüzde iki yol var. Ya bu dönüşümü dışarıdan ithal ederiz ya da
          aynı açık standartlar üzerinde kendi altyapımızı kurar ve anahtarlarını elimizde tutarız. Biz
          ikincisini seçiyoruz. Uyum, AB’nin seçtiği biçimleri ve kuralları izlemek demektir; egemenlik ise
          kimin güvenilir sayılacağına kendimizin karar vermesi. Formülümüz kısa: <strong>aynı standartlar,
          kendi ağımız.</strong> Katıldığında her devlet de kendi kaydının tek yazarı olacak.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga, ortak bir mühür geleneğidir",
      body: (
        <>
          <em>Tamga</em>, Türk halklarının kadim mührüydü; mülkiyeti, aidiyeti ve yetkiyi kanıtlayan işaret.
          Doğrulanabilir dijital belge bunun çağdaş karşılığıdır. Ortak bir dil ailesini, kültürü ve tarihi
          paylaşan halklar ortak bir dijital güven zemini için doğal bir topraktır ve her biri kendi mührünü
          elinde tutar.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez değil, örgü",
      body: (
        <>
          Tek bir otorite istemiyoruz. Birlikte çalışabilen bağımsız güven listelerinden oluşan bir örgü
          istiyoruz. Bu örgüde her ülke kendi güven listesini, kurumlarını ve yönetişimini korur ve ötekilere
          ortak standartlar üzerinden bağlanır. Bir listeye girmek ötekine girmek demek değildir; her ağ kimi
          tanıyacağına kendisi karar verir. Aynı standartlar sayesinde Avrupa ile de konuşabilir.
        </>
      ),
    },
  ],
  closingTitle: "Amacımız",
  closing: (
    <>
      Dijital güveni her uygulamanın yeniden çözdüğü sorunlar listesinden çıkarmak ve Türkiye ile Türk
      dünyası için ortak, egemen ve birlikte çalışabilir bir altyapıya dönüştürmek istiyoruz.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  edition: "Sürüm 1.0, gözden geçirilmiş baskı, Kasım 2026. İlk baskı 3 Ekim 2026.",
  linkWhitepaper: "Whitepaper’ı oku →",
  linkDocs: "Kavramları sıfırdan öğren →",
};

const tk: ManifestoContent = {
  meta: {
    title: "Manifest",
    description:
      "Tamga Network Manifesti, Türkiýe we türki dünýäsi üçin sanly ynam barada sekiz ýörelge: sanly ynam näme üçin umumy, özygtyýarly we bilelikde işleýän infrastruktura bolmaly.",
  },
  mastheadSub: "Manifest · v1.0 · Noýabr 2026",
  eyebrow: "Manifest",
  title: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys",
  subtitle: "Türkiýe we türki dünýäsi üçin sanly ynam barada sekiz ýörelge",
  lead: (
    <>
      Dünýä ynam gurmagyň usulyny üýtgedýär. Ýewropa her agza döwletiň öz raýatlaryna sanly şahsyýet
      gapjygyny hödürlemegini düzgünnama bilen hökmany etdi we onuň daşynda standart emele gelýär. Bu
      özgerişiň boljagy ýa-da bolmajagy indi sowal däl.{" "}
      <span className="text-primary">Indi sowal ony kimiň gurjagy we kimiň diňe satyn aljagy.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Ynam infrastrukturadyr",
      body: (
        <>
          Hiç bir programma şahsyýeti, ygtyýary we resminamany noldan barlamaly bolmaly däl. Elektrik we
          internet umumy infrastruktura bolşy ýaly, sanly ynam hem şeýle bolmaly; her bank, uniwersitet, iş
          beriji we gapy ony täzeden gurmagyň ýerine ondan peýdalanmaly. Biz şol infrastrukturany tabşyrylyp
          bilner ýaly gurýarys: ilki bir gaznaga, döwletler goşuldygyça bolsa olaryň özüne. Tor girdeji
          gazanmagy maksat edinmeýär we hyzmat satmaýar. Onuň düzgünleri we ynam sanawlary açykdyr,
          paketleriniň kody hem açyk çeşmelidir; her kim olary okap we barlap biler.
        </>
      ),
    },
    {
      n: "02",
      title: "Maglumat eýesiniň elinde galýar",
      body: (
        <>
          Hiç kim özi barada bir zady subut etmek üçin resminamasynyň nusgasyny tabşyrmaly bolmaly däl.
          Resminama adamyň telefonynda galýar we telefondan diňe zerur subutnama çykýar. Adam resminamanyň
          diňe soralan meýdanlaryny görkezýär; muňa saýlap açmak diýilýär. Ol doglan senesini bermän 15 ýa-da
          18 ýaşdan ulydygyny görkezip bilýär, barlaýjy tarap bolsa diňe hawa ýa-da ýok görýär. Biz muny hukuk
          hasaplaýarys we tehnologiýa bu hukuga hormat goýmagy indi ýeňilleşdirýär.
        </>
      ),
    },
    {
      n: "03",
      title: "Barlag çeşmä ýüz tutman edilmeli",
      body: (
        <>
          Resminamanyň hakykydygyna matematika karar bermeli; nusganyň näderejede ynandyryjy görünýändigi
          ölçeg bolup bilmez. Kriptografik gol resminamany kimiň berendigini we içinde hiç zadyň
          üýtgemändigini subut edýär. Muny resminamany berene soraman edýär, şonuň üçin beren gurama
          resminamanyň nirede ulanylandygyny bilmeýär. Resminamanyň ýatyrylandygy ýa-da ýatyrylmandygy hem
          guramanyň çap edýän ýagdaý sanawyndan okalýar. Sanaw bütinleýin ýüklenýändigi üçin gurama haýsy
          resminamanyň barlanandygyny bilmeýär.
        </>
      ),
    },
    {
      n: "04",
      title: "Blokçeýn serişdedir, diňe serişde",
      body: (
        <>
          Häzir torda blokçeýn ýok we ynamyň oňa zerurlygy hem ýok. Ynam her kimiň ýükläp we barlap bilýän gol
          çekilen, açyk ynam sanawlaryna daýanýar. Umumy kitap diňe garaşsyz taraplar ony bilelikde
          dolandyranda bir zat goşýar we şonda-da diňe sanaw ýazgylarynyň gysgaça nusgalaryny (hash) we barmak yzlaryny saklaýar, şahsy maglumaty bolsa hiç haçan.
          Kitabyň kody ýazyldy we synagdan geçdi; ikinji garaşsyz operator goşulýança ýapyk durýar.{" "}
          <strong>Şahsy maglumat hiç birine asla ýazylmaýar.</strong> Adam bularyň hiç birini görmeýär; diňe
          şahsyýetini ulanýar.
        </>
      ),
    },
    {
      n: "05",
      title: "Açyk standartlar, baglanyşyk ýok",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC we X.509 ÝB-niň saýlan açyk standartlarydyr we biz olary ÝB-niň
          profilleri bilen bolşy ýaly ulanýarys. Özümizi dünýäniň ylalaşan standartlaryna baglaýarys; haýsydyr
          bir kompaniýanyň önümine baglamaýarys, öz önümimize-de. Şeýlelikde, bir guramanyň beren
          resminamasyny şol standartlara eýerýän islendik barlaýjy okap bilýär. Tor gapjyk işletmeýär;
          düzgünlere eýerýän her gapjygy sanaýar. Sanawa giren ilkinji gapjyk Tamga Wallet aýratyn önümdir we
          sanawa başga her gapjygyň girjek ýoly bilen girdi.
        </>
      ),
    },
    {
      n: "06",
      title: "Özygtyýarlyk we laýyklyk bir wagtda mümkün",
      body: (
        <>
          Dünýä göçme subutnamaga geçende öňümizde iki ýol bar. Ýa bu özgerişi daşardan getireris, ýa-da şol
          bir açyk standartlarda öz infrastrukturamyzy gurup, açarlaryny öz elimizde saklarys. Biz ikinjisini
          saýlaýarys. Laýyklyk ÝB-niň saýlan formatlaryna we düzgünlerine eýermek, özygtyýarlyk bolsa kimiň
          ynamdar hasaplanjagyny özümiziň çözmegimizdir. <strong>Şol bir standartlar, öz torumyz</strong> we
          goşulanda öz hasabynyň ýeke-täk ýazyjysy boljak her döwlet.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga umumy möhür däbidir",
      body: (
        <>
          <em>Tamga</em> türki halklaryň gadymy möhüridi; eýeçiligi, degişliligi we ygtyýary subut edýän
          belgi. Barlanyp bilinýän sanly resminama şonuň häzirki zaman garşylygydyr. Umumy dil maşgalasyny,
          medeniýeti we taryhy paýlaşýan halklar umumy sanly ynam binýady üçin tebigy topragydyr we olaryň her
          biri öz möhürini öz elinde saklaýar.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez däl, örüm",
      body: (
        <>
          Biz ýeke-täk häkimiýet islemeýäris. Bilelikde işläp bilýän garaşsyz ynam sanawlaryndan ybarat örüm
          isleýäris. Bu örümde her ýurt öz ynam sanawyny, edaralaryny we dolandyryşyny saklaýar we beýlekilere
          umumy standartlar arkaly baglanýar. Bir sanawa girmek beýlekisine girmegi aňlatmaýar; her tor kimi
          ykrar etjegini özi çözýär. Şol bir standartlar sebäpli ol Ýewropa bilen hem gürleşip bilýär.
        </>
      ),
    },
  ],
  closingTitle: "Maksadymyz",
  closing: (
    <>
      Sanly ynamy her programmanyň täzeden çözýän meseleleriň sanawyndan çykarmak we Türkiýe bilen türki
      dünýäsi üçin umumy, özygtyýarly we bilelikde işleýän infrastruktura öwürmek isleýäris.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  edition: "Wersiýa 1.0, gaýtadan seredilen neşir, Noýabr 2026. Ilkinji neşir 3-nji oktýabr 2026.",
  linkWhitepaper: "Whitepaper-i oka →",
  linkDocs: "Düşünjeleri başdan öwren →",
};

const az: ManifestoContent = {
  meta: {
    title: "Manifest",
    description:
      "Tamga Network Manifesti, Türkiyə və türk dünyası üçün rəqəmsal etibar haqqında səkkiz prinsip: rəqəmsal etibar niyə ortaq, suveren və qarşılıqlı işləyə bilən infrastruktur olmalıdır.",
  },
  mastheadSub: "Manifest · v1.0 · Noyabr 2026",
  eyebrow: "Manifest",
  title: "Biz qədim möhürün müasir qarşılığını qururuq",
  subtitle: "Türkiyə və türk dünyası üçün rəqəmsal etibar haqqında səkkiz prinsip",
  lead: (
    <>
      Dünya etibarı qurmaq üsulunu dəyişir. Avropa hər üzv dövlətin öz vətəndaşlarına rəqəmsal şəxsiyyət
      cüzdanı təqdim etməsini tənzimləmə ilə məcburi etdi və ətrafında bir standart formalaşır. Bu
      dəyişikliyin baş verib-verməyəcəyi artıq sual olmaqdan çıxdı.{" "}
      <span className="text-primary">İndi sual onu kimin quracağı və kimin yalnız satın alacağıdır.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Etibar infrastrukturdur",
      body: (
        <>
          Heç bir tətbiq şəxsiyyəti, səlahiyyəti və sənədləri sıfırdan yoxlamağa məcbur olmamalıdır. Elektrik
          və internet ortaq infrastruktur olduğu kimi rəqəmsal etibar da belə olmalıdır; hər bank,
          universitet, işəgötürən və giriş qapısı onu yenidən qurmaq əvəzinə ondan faydalanmalıdır. Biz bu
          infrastrukturu təhvil verilə biləcək şəkildə qururuq: əvvəlcə bir fonda, dövlətlər qoşulduqca isə
          onların özünə. Şəbəkə mənfəət məqsədi güdmür və xidmət satmır. Onun qaydaları və etibar siyahıları
          açıqdır, paketlərinin kodu da açıq mənbəlidir; hər kəs onları oxuya və yoxlaya bilər.
        </>
      ),
    },
    {
      n: "02",
      title: "Məlumat sahibinin əlində qalır",
      body: (
        <>
          Heç kim özü haqqında nəyisə sübut etmək üçün sənədinin surətini təhvil verməyə məcbur olmamalıdır.
          Sənəd şəxsin telefonunda qalır və telefondan yalnız lazım olan sübut çıxır. Şəxs sənədin yalnız
          soruşulan sahələrini göstərir; buna seçici açıqlama deyilir. O, doğum tarixini vermədən 15 və ya 18
          yaşdan yuxarı olduğunu göstərə bilər, yoxlayan tərəf isə yalnız bəli və ya xeyr görür. Biz bunu bir
          hüquq sayırıq və texnologiya bu hüquqa hörmət etməyi artıq asanlaşdırır.
        </>
      ),
    },
    {
      n: "03",
      title: "Yoxlama mənbəyə müraciət etmədən aparılmalıdır",
      body: (
        <>
          Sənədin həqiqi olduğuna riyaziyyat qərar verməlidir; surətin nə qədər inandırıcı göründüyü ölçü ola
          bilməz. Kriptoqrafik imza sənədi kimin verdiyini və içində heç nəyin dəyişmədiyini sübut edir. Bunu
          sənədi verəndən soruşmadan edir, buna görə verən qurum sənədin harada istifadə olunduğunu öyrənmir.
          Sənədin ləğv edilib-edilmədiyi də qurumun dərc etdiyi status siyahısından oxunur. Siyahı bütöv
          şəkildə yükləndiyi üçün qurum hansı sənədin yoxlandığını bilmir.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain vasitədir, yalnız vasitə",
      body: (
        <>
          Bu gün şəbəkədə blockchain yoxdur və etibarın ona ehtiyacı da yoxdur. Etibar hər kəsin yükləyib
          yoxlaya bildiyi imzalı, açıq etibar siyahılarına əsaslanır. Ortaq reyestr yalnız müstəqil tərəflər
          onu birlikdə idarə etdikdə nəsə qatır və o zaman da yalnız siyahı qeydlərinin xülasələrini (hash) və barmaq izlərini daşıyır, fərdi məlumatı isə heç vaxt.
          Reyestrin kodu yazılıb və test edilib; ikinci müstəqil operator qoşulana qədər söndürülmüş qalır.{" "}
          <strong>Fərdi məlumat heç birinə heç vaxt yazılmır.</strong> Şəxs bunların heç birini görmür; yalnız
          öz şəxsiyyətindən istifadə edir.
        </>
      ),
    },
    {
      n: "05",
      title: "Açıq standartlar, asılılıq yoxdur",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC və X.509 Aİ-nin seçdiyi açıq standartlardır və biz onları Aİ-nin
          profilləri ilə olduğu kimi istifadə edirik. Özümüzü dünyanın razılaşdığı standartlara bağlayırıq;
          hər hansı şirkətin məhsuluna bağlamırıq, öz məhsulumuza da. Beləliklə, bir qurumun verdiyi sənədi
          eyni standartlara uyan istənilən yoxlayan tərəf oxuya bilər. Şəbəkə cüzdan idarə etmir; qaydalara
          uyan hər cüzdanı siyahıya alır. Siyahıya daxil olan ilk cüzdan Tamga Wallet ayrıca məhsuldur və
          siyahıya başqa hər cüzdanın daxil olacağı yolla daxil olub.
        </>
      ),
    },
    {
      n: "06",
      title: "Suverenlik və uyğunluq eyni anda mümkündür",
      body: (
        <>
          Dünya daşına bilən sübuta keçərkən qarşımızda iki yol var. Ya bu dəyişikliyi xaricdən idxal edərik,
          ya da eyni açıq standartlar üzərində öz infrastrukturumuzu qurub açarlarını öz əlimizdə saxlayarıq.
          Biz ikincisini seçirik. Uyğunluq Aİ-nin seçdiyi formatlara və qaydalara əməl etmək, suverenlik isə
          kimin etibarlı sayılacağına özümüzün qərar verməsidir. <strong>Eyni standartlar, öz
          şəbəkəmiz</strong> və qoşulduqda öz qeydiyyatının yeganə müəllifi olacaq hər dövlət.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga ortaq möhür ənənəsidir",
      body: (
        <>
          <em>Tamga</em> türk xalqlarının qədim möhürü idi; mülkiyyəti, mənsubiyyəti və səlahiyyəti sübut edən
          nişan. Yoxlanıla bilən rəqəmsal sənəd onun müasir qarşılığıdır. Ortaq dil ailəsini, mədəniyyəti və
          tarixi paylaşan xalqlar ortaq rəqəmsal etibar təməli üçün təbii zəmindir və hər biri öz möhürünü öz
          əlində saxlayır.
        </>
      ),
    },
    {
      n: "08",
      title: "Mərkəz deyil, şəbəkə toxuması",
      body: (
        <>
          Biz tək bir hakimiyyət istəmirik. Qarşılıqlı işləyə bilən müstəqil etibar siyahılarından ibarət
          toxuma istəyirik. Bu toxumada hər ölkə öz etibar siyahısını, qurumlarını və idarəetməsini qoruyur və
          digərlərinə ortaq standartlar vasitəsilə bağlanır. Bir siyahıya daxil olmaq digərinə daxil olmaq
          demək deyil; hər şəbəkə kimi tanıyacağına özü qərar verir. Eyni standartlar sayəsində o, Avropa ilə
          də danışa bilir.
        </>
      ),
    },
  ],
  closingTitle: "Məqsədimiz",
  closing: (
    <>
      Rəqəmsal etibarı hər tətbiqin yenidən həll etdiyi problemlər siyahısından çıxarmaq və Türkiyə ilə
      türk dünyası üçün ortaq, suveren və qarşılıqlı işləyə bilən infrastruktura çevirmək istəyirik.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  edition: "Versiya 1.0, yenidən baxılmış nəşr, Noyabr 2026. İlk nəşr 3 oktyabr 2026.",
  linkWhitepaper: "Whitepaper-i oxuyun →",
  linkDocs: "Anlayışları sıfırdan öyrənin →",
};

const content: Record<Locale, ManifestoContent> = { en, tr, tk, az };

export function getManifestoContent(locale: string): ManifestoContent {
  return content[locale as Locale] ?? en;
}

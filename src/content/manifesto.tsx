import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

/*
 * Manifesto v1.0, revised edition 2026-10-27 (first edition 2026-10-03). Same text as manifesto/tamga-manifesto-<lang>.typ
 * (PDF); change both together. Facts: tamga-network DECISIONS §0, ADR-0009 (lists first, ledger threshold), ADR-0042 (the network
 * runs no wallet), ADR-0051 (chain mirrors the signed lists), ADR-0064 (age_over_15), foundation handover plan.
 */

export type ManifestoContent = {
  meta: { title: string; description: string };
  mastheadSub: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  theses: { n: string; title: string; body: ReactNode }[];
  closing: ReactNode;
  slogan: string;
  linkWhitepaper: string;
  linkDocs: string;
};

const en: ManifestoContent = {
  meta: {
    title: "Manifesto",
    description:
      "The Tamga Network Manifesto, the modern counterpart of the ancient seal: why digital trust should be a shared, sovereign and interoperable infrastructure for Türkiye and the Turkic world.",
  },
  mastheadSub: "Manifesto · v1.0 · revised 2026-10-27",
  eyebrow: "Manifesto",
  title: "We are building the modern counterpart of the ancient seal",
  lead: (
    <>
      The world is changing how it establishes trust. Europe has made the new model
      mandatory by regulation, and a standard is taking shape around it. Whether this
      change will happen is no longer the question.{" "}
      <span className="text-primary">The question is who will build it and who will only buy it.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Trust is infrastructure",
      body: (
        <>
          No application should have to verify identity, authority and documents from
          scratch. Electricity and the internet are shared infrastructure, and digital
          trust should be one too, something every bank, university, employer and gate
          draws on rather than rebuilds. We are building that infrastructure, and we are
          building it to be handed over, first to a foundation and in time to the states
          themselves.
        </>
      ),
    },
    {
      n: "02",
      title: "Data stays in the hands of its owner",
      body: (
        <>
          Nobody should have to hand over a copy of a document to prove something about
          themselves. The document stays on the person’s phone and only the proof that is
          needed leaves it. A person can show they are over 15 or over 18 without revealing
          a birth date, and the verifier gets a yes or a no. We treat this as a right, and
          the technology now makes it cheap to honour.
        </>
      ),
    },
    {
      n: "03",
      title: "Verification must not go back to the source",
      body: (
        <>
          A document’s authenticity should rest on mathematics rather than on how
          convincing a photocopy looks. A cryptographic signature proves who issued a
          document and that nothing in it was changed, and it does so without asking the
          issuer, so the issuer never learns where and when a person used it.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain is a tool, and only a tool",
      body: (
        <>
          We are not building a new blockchain. Trust today rests on signed, public trust
          lists that anyone can download and check. A shared ledger is worth adding only
          when independent parties run it together; the code for it is written and tested,
          and it stays switched off until that day.{" "}
          <strong>Personal data is never written to either.</strong> The person never sees
          any of this and simply uses their identity.
        </>
      ),
    },
    {
      n: "05",
      title: "Open standards, no lock-in",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 and selective disclosure are the EU’s own
          profiles, and we use them as they are. We bind ourselves to standards the world
          agrees on rather than to any company’s product, including our own. The network
          runs no wallet; it lists every wallet that follows the rules, and the first of
          them, Tamga Wallet, is a separate product that entered the list the same way any
          other will.
        </>
      ),
    },
    {
      n: "06",
      title: "Sovereign and compatible at once",
      body: (
        <>
          As the world moves to portable proofs, we have two paths: import the change from
          outside, or build our own infrastructure on the same open standards and keep the
          keys to it. We choose the second.{" "}
          <strong>The same standards, our own network,</strong> and every state the only
          writer of its own registry.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga is a shared tradition of the seal",
      body: (
        <>
          A <em>tamga</em> was the ancient seal of the Turkic peoples, a mark that proved
          ownership, belonging and authority. A verifiable digital credential is its modern
          counterpart. Peoples who share a language family, a culture and a history are
          natural ground for a shared foundation of digital trust, and every one of them
          keeps its own seal.
        </>
      ),
    },
    {
      n: "08",
      title: "A mesh, not a center",
      body: (
        <>
          We want no single authority. We want a mesh of interoperable, independent
          networks, a <strong>Trust Mesh</strong>, in which each country keeps its own
          trust list, institutions and governance and connects to the others through
          shared standards, exactly as it will connect to Europe.
        </>
      ),
    },
  ],
  closing: (
    <>
      Our aim is to take digital trust out of the list of problems each application solves
      anew, and to make it a shared, sovereign and interoperable infrastructure for Türkiye
      and the Turkic world.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  linkWhitepaper: "Read the whitepaper →",
  linkDocs: "Learn the concepts from scratch →",
};

const tr: ManifestoContent = {
  meta: {
    title: "Manifesto",
    description:
      "Tamga Network Manifestosu, kadim mührün çağdaş karşılığı: dijital güven Türkiye ve Türk dünyası için neden ortak, egemen ve birlikte çalışabilir bir altyapı olmalı.",
  },
  mastheadSub: "Manifesto · v1.0 · gözden geçirilmiş 2026-10-27",
  eyebrow: "Manifesto",
  title: "Kadim mührün çağdaş karşılığını inşa ediyoruz",
  lead: (
    <>
      Dünya güveni kurma biçimini değiştiriyor. Avrupa yeni modeli düzenlemeyle zorunlu
      kıldı ve çevresinde bir standart oluşuyor. Bu dönüşümün olup olmayacağı artık soru
      olmaktan çıktı.{" "}
      <span className="text-primary">Şimdi soru, onu kimin kuracağı ve kimin yalnızca satın alacağı.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Güven bir altyapıdır",
      body: (
        <>
          Hiçbir uygulama kimliği, yetkiyi ve belgeyi sıfırdan doğrulamak zorunda kalmamalı.
          Elektrik ve internet nasıl ortak altyapıysa dijital güven de öyle olmalı; her
          banka, üniversite, işveren ve kapı onu yeniden kurmak yerine ondan yararlanmalı.
          Biz bu altyapıyı kuruyoruz ve devredilmek üzere kuruyoruz; önce bir vakfa, zamanla
          devletlerin kendisine devredilecek.
        </>
      ),
    },
    {
      n: "02",
      title: "Veri, sahibinin elinde kalır",
      body: (
        <>
          Kimse kendisiyle ilgili bir şeyi kanıtlamak için belgesinin kopyasını teslim etmek
          zorunda kalmamalı. Belge kişinin telefonunda kalır, telefondan yalnızca gereken
          kanıt çıkar. Kişi doğum tarihini vermeden 15 ya da 18 yaşından büyük olduğunu
          gösterebilir, doğrulayan taraf da yalnızca evet ya da hayır görür. Biz bunu bir hak
          sayıyoruz ve teknoloji bu hakka saygı göstermeyi artık kolaylaştırıyor.
        </>
      ),
    },
    {
      n: "03",
      title: "Doğrulama kaynağa gitmeden yapılmalı",
      body: (
        <>
          Bir belgenin gerçek olduğuna matematik karar vermeli; fotokopinin ne kadar ikna
          edici göründüğü ölçü olamaz. Kriptografik imza belgeyi kimin verdiğini ve içinde
          hiçbir şeyin değişmediğini kanıtlar. Bunu belgeyi verene sormadan yapar, bu yüzden
          veren kurum kişinin belgeyi nerede ve ne zaman kullandığını hiç öğrenmez.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain araçtır, yalnızca araç",
      body: (
        <>
          Biz yeni bir blockchain kurmuyoruz. Güven bugün herkesin indirip denetleyebildiği
          imzalı, açık güven listelerine dayanır. Ortak bir defter ancak bağımsız taraflar
          onu birlikte işlettiğinde bir şey katar; defterin kodu yazıldı ve test edildi, o
          güne kadar kapalı durur.{" "}
          <strong>Kişisel veri ikisine de asla yazılmaz.</strong> Kişi bunların hiçbirini
          görmez; yalnızca kimliğini kullanır.
        </>
      ),
    },
    {
      n: "05",
      title: "Açık standartlar, kilitlenme yok",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 ve seçici paylaşım AB’nin kendi
          profilleridir ve biz onları olduğu gibi kullanırız. Kendimizi dünyanın üzerinde
          uzlaştığı standartlara bağlarız; herhangi bir şirketin ürününe bağlamayız, kendi
          ürünümüze de. Ağ cüzdan işletmez; kurallara uyan her cüzdanı listeler. İlk
          listelenen cüzdan Tamga Wallet ayrı bir üründür ve listeye başka her cüzdanın
          gireceği yoldan girdi.
        </>
      ),
    },
    {
      n: "06",
      title: "Egemenlik ve uyum aynı anda mümkündür",
      body: (
        <>
          Dünya taşınabilir kanıta geçerken önümüzde iki yol var. Ya bu dönüşümü dışarıdan
          ithal ederiz ya da aynı açık standartlar üzerinde kendi altyapımızı kurar ve
          anahtarlarını elimizde tutarız. Biz ikincisini seçiyoruz.{" "}
          <strong>Aynı standartlar, kendi ağımız</strong> ve kendi kaydının tek yazarı olan
          her devlet.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga, ortak bir mühür geleneğidir",
      body: (
        <>
          <em>Tamga</em>, Türk halklarının kadim mührüydü; mülkiyeti, aidiyeti ve yetkiyi
          kanıtlayan işaret. Doğrulanabilir dijital belge bunun çağdaş karşılığıdır. Ortak
          bir dil ailesini, kültürü ve tarihi paylaşan halklar ortak bir dijital güven zemini
          için doğal bir topraktır ve her biri kendi mührünü elinde tutar.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez değil, örgü",
      body: (
        <>
          Tek bir otorite istemiyoruz. Birlikte çalışabilen bağımsız ağlardan oluşan bir
          örgü istiyoruz, bir <strong>Trust Mesh</strong>. Bu örgüde her ülke kendi güven
          listesini, kurumlarını ve yönetişimini korur ve ötekilere ortak standartlar
          üzerinden bağlanır, tıpkı Avrupa’ya bağlanacağı gibi.
        </>
      ),
    },
  ],
  closing: (
    <>
      Amacımız dijital güveni her uygulamanın yeniden çözdüğü sorunlar listesinden çıkarmak
      ve Türkiye ile Türk dünyası için ortak, egemen ve birlikte çalışabilir bir altyapıya
      dönüştürmek.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  linkWhitepaper: "Whitepaper’ı oku →",
  linkDocs: "Kavramları sıfırdan öğren →",
};

const tk: ManifestoContent = {
  meta: {
    title: "Manifest",
    description:
      "Tamga Network Manifesti, gadymy möhüriň häzirki zaman garşylygy: sanly ynam Türkiýe we türki dünýäsi üçin näme üçin umumy, özygtyýarly we bilelikde işleýän infrastruktura bolmaly.",
  },
  mastheadSub: "Manifest · v1.0 · gaýtadan seredilen 2026-10-27",
  eyebrow: "Manifest",
  title: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys",
  lead: (
    <>
      Dünýä ynam gurmagyň usulyny üýtgedýär. Ýewropa täze modeli düzgünnama bilen hökmany
      etdi we onuň daşynda standart emele gelýär. Bu özgerişiň boljagy ýa-da bolmajagy indi
      sowal däl.{" "}
      <span className="text-primary">Indi sowal ony kimiň gurjagy we kimiň diňe satyn aljagy.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Ynam infrastrukturadyr",
      body: (
        <>
          Hiç bir programma şahsyýeti, ygtyýary we resminamany noldan barlamaly bolmaly däl.
          Elektrik we internet umumy infrastruktura bolşy ýaly, sanly ynam hem şeýle bolmaly;
          her bank, uniwersitet, iş beriji we gapy ony täzeden gurmagyň ýerine ondan
          peýdalanmaly. Biz şol infrastrukturany gurýarys we tabşyrmak üçin gurýarys; ilki
          bir gaznaga, wagtyň geçmegi bilen döwletleriň özüne tabşyrylar.
        </>
      ),
    },
    {
      n: "02",
      title: "Maglumat eýesiniň elinde galýar",
      body: (
        <>
          Hiç kim özi barada bir zady subut etmek üçin resminamasynyň nusgasyny tabşyrmaly
          bolmaly däl. Resminama adamyň telefonynda galýar, telefondan diňe zerur subutnama
          çykýar. Adam doglan senesini bermän 15 ýa-da 18 ýaşdan ulydygyny görkezip bilýär,
          barlaýjy tarap bolsa diňe hawa ýa-da ýok görýär. Biz muny hukuk hasaplaýarys we
          tehnologiýa bu hukuga hormat goýmagy indi ýeňilleşdirýär.
        </>
      ),
    },
    {
      n: "03",
      title: "Barlag çeşmä ýüz tutman edilmeli",
      body: (
        <>
          Resminamanyň hakykydygyna matematika karar bermeli; nusganyň näderejede ynandyryjy
          görünýändigi ölçeg bolup bilmez. Kriptografik gol resminamany kimiň berendigini we
          içinde hiç zadyň üýtgemändigini subut edýär. Muny resminamany berene soraman
          edýär, şonuň üçin beren gurama adamyň resminamany nirede we haçan ulanandygyny asla
          bilmeýär.
        </>
      ),
    },
    {
      n: "04",
      title: "Blokçeýn serişdedir, diňe serişde",
      body: (
        <>
          Biz täze blokçeýn gurmaýarys. Ynam häzir her kimiň ýükläp we barlap bilýän gol
          çekilen, açyk ynam sanawlaryna daýanýar. Umumy kitap diňe garaşsyz taraplar ony
          bilelikde dolandyranda bir zat goşýar; kitabyň kody ýazyldy we synagdan geçdi, şol
          güne çenli ýapyk durýar.{" "}
          <strong>Şahsy maglumat hiç birine asla ýazylmaýar.</strong> Adam bularyň hiç
          birini görmeýär; diňe şahsyýetini ulanýar.
        </>
      ),
    },
    {
      n: "05",
      title: "Açyk standartlar, baglanyşyk ýok",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 we saýlap paýlaşmak ÝB-niň öz profilleridir
          we biz olary bolşy ýaly ulanýarys. Özümizi dünýäniň ylalaşan standartlaryna
          baglaýarys; haýsydyr bir kompaniýanyň önümine baglamaýarys, öz önümimize-de. Tor
          gapjyk işletmeýär; düzgünlere eýerýän her gapjygy sanaýar. Ilkinji sanalan gapjyk
          Tamga Wallet aýratyn önümdir we sanawa başga her gapjygyň girjek ýoly bilen girdi.
        </>
      ),
    },
    {
      n: "06",
      title: "Özygtyýarlyk we laýyklyk bir wagtda mümkün",
      body: (
        <>
          Dünýä göçme subutnamaga geçende öňümizde iki ýol bar. Ýa bu özgerişi daşardan
          getireris, ýa-da şol bir açyk standartlarda öz infrastrukturamyzy gurup, açarlaryny
          öz elimizde saklarys. Biz ikinjisini saýlaýarys.{" "}
          <strong>Şol bir standartlar, öz torumyz</strong> we öz hasabynyň ýeke-täk ýazyjysy
          bolan her döwlet.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga umumy möhür däbidir",
      body: (
        <>
          <em>Tamga</em> türki halklaryň gadymy möhüridi; eýeçiligi, degişliligi we ygtyýary
          subut edýän belgi. Barlanyp bilinýän sanly resminama şonuň häzirki zaman
          garşylygydyr. Umumy dil maşgalasyny, medeniýeti we taryhy paýlaşýan halklar umumy
          sanly ynam binýady üçin tebigy topragydyr we olaryň her biri öz möhürini öz elinde
          saklaýar.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez däl, örüm",
      body: (
        <>
          Biz ýeke-täk häkimiýet islemeýäris. Bilelikde işläp bilýän garaşsyz torlardan
          ybarat örüm isleýäris, bir <strong>Trust Mesh</strong>. Bu örümde her ýurt öz ynam
          sanawyny, edaralaryny we dolandyryşyny saklaýar we beýlekilere umumy standartlar
          arkaly baglanýar, edil Ýewropa baglanjagy ýaly.
        </>
      ),
    },
  ],
  closing: (
    <>
      Maksadymyz sanly ynamy her programmanyň täzeden çözýän meseleleriň sanawyndan çykarmak
      we Türkiýe bilen türki dünýäsi üçin umumy, özygtyýarly we bilelikde işleýän
      infrastruktura öwürmek.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  linkWhitepaper: "Whitepaper-i oka →",
  linkDocs: "Düşünjeleri başdan öwren →",
};

const az: ManifestoContent = {
  meta: {
    title: "Manifest",
    description:
      "Tamga Network Manifesti, qədim möhürün müasir qarşılığı: rəqəmsal etibar Türkiyə və türk dünyası üçün niyə ortaq, suveren və qarşılıqlı işləyə bilən infrastruktur olmalıdır.",
  },
  mastheadSub: "Manifest · v1.0 · yenidən baxılmış 2026-10-27",
  eyebrow: "Manifest",
  title: "Biz qədim möhürün müasir qarşılığını qururuq",
  lead: (
    <>
      Dünya etibarı qurmaq üsulunu dəyişir. Avropa yeni modeli tənzimləmə ilə məcburi etdi
      və ətrafında bir standart formalaşır. Bu dəyişikliyin baş verib-verməyəcəyi artıq sual
      olmaqdan çıxdı.{" "}
      <span className="text-primary">İndi sual onu kimin quracağı və kimin yalnız satın alacağıdır.</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Etibar infrastrukturdur",
      body: (
        <>
          Heç bir tətbiq şəxsiyyəti, səlahiyyəti və sənədləri sıfırdan yoxlamağa məcbur
          olmamalıdır. Elektrik və internet ortaq infrastruktur olduğu kimi rəqəmsal etibar da
          belə olmalıdır; hər bank, universitet, işəgötürən və giriş qapısı onu yenidən qurmaq
          əvəzinə ondan faydalanmalıdır. Biz bu infrastrukturu qururuq və təhvil verilmək üçün
          qururuq; əvvəlcə bir fonda, zamanla dövlətlərin özünə təhvil veriləcək.
        </>
      ),
    },
    {
      n: "02",
      title: "Məlumat sahibinin əlində qalır",
      body: (
        <>
          Heç kim özü haqqında nəyisə sübut etmək üçün sənədinin surətini təhvil verməyə
          məcbur olmamalıdır. Sənəd şəxsin telefonunda qalır, telefondan yalnız lazım olan
          sübut çıxır. Şəxs doğum tarixini vermədən 15 və ya 18 yaşdan yuxarı olduğunu göstərə
          bilər, yoxlayan tərəf isə yalnız bəli və ya xeyr görür. Biz bunu bir hüquq sayırıq və
          texnologiya bu hüquqa hörmət etməyi artıq asanlaşdırır.
        </>
      ),
    },
    {
      n: "03",
      title: "Yoxlama mənbəyə müraciət etmədən aparılmalıdır",
      body: (
        <>
          Sənədin həqiqi olduğuna riyaziyyat qərar verməlidir; surətin nə qədər inandırıcı
          göründüyü ölçü ola bilməz. Kriptoqrafik imza sənədi kimin verdiyini və içində heç
          nəyin dəyişmədiyini sübut edir. Bunu sənədi verəndən soruşmadan edir, buna görə
          verən qurum şəxsin sənədi harada və nə vaxt istifadə etdiyini heç vaxt öyrənmir.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain vasitədir, yalnız vasitə",
      body: (
        <>
          Biz yeni blockchain qurmuruq. Etibar bu gün hər kəsin yükləyib yoxlaya bildiyi
          imzalı, açıq etibar siyahılarına əsaslanır. Ortaq reyestr yalnız müstəqil tərəflər
          onu birlikdə idarə etdikdə nəsə qatır; reyestrin kodu yazılıb və test edilib, o günə
          qədər söndürülmüş qalır.{" "}
          <strong>Fərdi məlumat heç birinə heç vaxt yazılmır.</strong> Şəxs bunların heç
          birini görmür; yalnız öz şəxsiyyətindən istifadə edir.
        </>
      ),
    },
    {
      n: "05",
      title: "Açıq standartlar, asılılıq yoxdur",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 və seçici paylaşım Aİ-nin öz profilləridir və
          biz onları olduğu kimi istifadə edirik. Özümüzü dünyanın razılaşdığı standartlara
          bağlayırıq; hər hansı şirkətin məhsuluna bağlamırıq, öz məhsulumuza da. Şəbəkə
          cüzdan idarə etmir; qaydalara uyan hər cüzdanı sıralayır. Siyahıya daxil olan ilk
          cüzdan Tamga Wallet ayrıca məhsuldur və siyahıya başqa hər cüzdanın daxil olacağı
          yolla daxil olub.
        </>
      ),
    },
    {
      n: "06",
      title: "Suverenlik və uyğunluq eyni anda mümkündür",
      body: (
        <>
          Dünya daşına bilən sübuta keçərkən qarşımızda iki yol var. Ya bu dəyişikliyi
          xaricdən idxal edərik, ya da eyni açıq standartlar üzərində öz infrastrukturumuzu
          qurub açarlarını öz əlimizdə saxlayarıq. Biz ikincisini seçirik.{" "}
          <strong>Eyni standartlar, öz şəbəkəmiz</strong> və öz qeydiyyatının yeganə müəllifi
          olan hər dövlət.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga ortaq möhür ənənəsidir",
      body: (
        <>
          <em>Tamga</em> türk xalqlarının qədim möhürü idi; mülkiyyəti, mənsubiyyəti və
          səlahiyyəti sübut edən nişan. Yoxlanıla bilən rəqəmsal sənəd onun müasir
          qarşılığıdır. Ortaq dil ailəsini, mədəniyyəti və tarixi paylaşan xalqlar ortaq
          rəqəmsal etibar təməli üçün təbii zəmindir və hər biri öz möhürünü öz əlində
          saxlayır.
        </>
      ),
    },
    {
      n: "08",
      title: "Mərkəz deyil, şəbəkə toxuması",
      body: (
        <>
          Biz tək bir hakimiyyət istəmirik. Qarşılıqlı işləyə bilən müstəqil şəbəkələrdən
          ibarət toxuma istəyirik, bir <strong>Trust Mesh</strong>. Bu toxumada hər ölkə öz
          etibar siyahısını, qurumlarını və idarəetməsini qoruyur və digərlərinə ortaq
          standartlar vasitəsilə bağlanır, eynilə Avropaya bağlanacağı kimi.
        </>
      ),
    },
  ],
  closing: (
    <>
      Məqsədimiz rəqəmsal etibarı hər tətbiqin yenidən həll etdiyi problemlər siyahısından
      çıxarmaq və Türkiyə ilə türk dünyası üçün ortaq, suveren və qarşılıqlı işləyə bilən
      infrastruktura çevirməkdir.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  linkWhitepaper: "Whitepaper-i oxuyun →",
  linkDocs: "Anlayışları sıfırdan öyrənin →",
};

const content: Record<Locale, ManifestoContent> = { en, tr, tk, az };

export function getManifestoContent(locale: string): ManifestoContent {
  return content[locale as Locale] ?? en;
}

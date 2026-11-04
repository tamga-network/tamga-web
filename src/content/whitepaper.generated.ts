// ÜRETİLDİ — elle düzenlemeyin. Kaynak: whitepaper Markdown metinleri (node scripts/whitepaper-intro.mjs <WP-*.md>)
export type WhitepaperSectionEntry = {
  n: string;
  title: string;
  kind: "chapter" | "appendix" | "references";
  /** Ekler için yazıldığı biçimde etiket, ör. "Ek A". */
  label?: string;
};

export type WhitepaperIntroData = {
  title: string;
  subtitle: string;
  date: string;
  version: string;
  license: string;
  citation: string;
  abstractLabel: string;
  abstract: string[];
  keywordsLabel: string;
  keywords: string[];
  sections: WhitepaperSectionEntry[];
};

export const WHITEPAPER_INTRO: Record<string, WhitepaperIntroData> = {
  "en": {
    "title": "A Digital Trust Infrastructure for Türkiye and the Turkic World",
    "subtitle": "Extended edition: how it works, why it was built this way, where it is going",
    "date": "November 2026",
    "version": "1.0",
    "license": "CC BY 4.0",
    "citation": "Tamga Network (2026). A Digital Trust Infrastructure for Türkiye and the Turkic World. Whitepaper, version 1.0. https://tamga.network/whitepaper-en.pdf",
    "abstractLabel": "Abstract",
    "abstract": [
      "Tamga Network is a trust network designed for Türkiye and the Turkic world that speaks the same technical language as the European Union's digital identity framework. In the network an institution issues a credential, the person carries it in a wallet on their phone and decides for themselves whom to show it to, and a verifier checks it within seconds without asking the issuing institution. Credentials are encoded in the open standards the EU has chosen (SD-JWT VC and ISO/IEC 18013-5 mdoc); issuance and presentation follow the OpenID4VCI and OpenID4VP profiles; every credential is bound to a key in the device's secure hardware, and the person shows only the fields that are asked for. Today trust comes from signed trust lists that anyone can download and check, and from an anchor log that advances hour by hour. The code for a shared ledger has been written and tested, but the ledger is not in production and is switched off, and it will not be switched on without at least two independent operators. None of the shared records contains personal data.",
      "This document explains, in twenty-four chapters, how this structure works, why each important choice was made and where the network is heading. Trust lists, institution certificates, credential formats, issuance and presentation flows, the verification pipeline, revocation, wallet rules, the provisional identity service, privacy engineering and the threat model are each taken up in turn; every choice is given together with the decision record that binds it and the alternatives that were weighed. Sovereignty is a condition the design sets from the start. Each state is the only writer of its own registry, and every role that is carried out provisionally on behalf of a state today has been built so that it can be handed over without changing any credential, institution identity or credential type. Today only the Türkiye slot is active in the lists; for the other states a slot has only been reserved.",
      "The text states the status of every claim plainly: functions that are live, functions that have been decided but are not yet live, and functions that are still research are kept apart, and the roadmap is given in terms of conditions rather than dates. The final chapters bring together all the decisions, the declared residual risks and the open questions. This document is not a legal opinion or a certification claim, and it is not the announcement of an agreement with any state or institution."
    ],
    "keywordsLabel": "Keywords",
    "keywords": [
      "digital trust infrastructure",
      "trust lists",
      "eIDAS 2.0",
      "EUDI ARF",
      "SD-JWT VC",
      "mdoc",
      "OpenID4VCI",
      "OpenID4VP",
      "selective disclosure",
      "unlinkability",
      "sovereignty",
      "Turkic world"
    ],
    "sections": [
      {
        "n": "1",
        "title": "Introduction: From Copy to Proof",
        "kind": "chapter"
      },
      {
        "n": "2",
        "title": "Problem Space and Requirements",
        "kind": "chapter"
      },
      {
        "n": "3",
        "title": "Background: eIDAS 2.0, the EUDI ARF and Open Standards",
        "kind": "chapter"
      },
      {
        "n": "4",
        "title": "Design Principles and Positioning",
        "kind": "chapter"
      },
      {
        "n": "5",
        "title": "Roles and Components",
        "kind": "chapter"
      },
      {
        "n": "6",
        "title": "Trust Model: Signed Trust Lists and the Anchor Log",
        "kind": "chapter"
      },
      {
        "n": "7",
        "title": "Institution Identity and Certificates",
        "kind": "chapter"
      },
      {
        "n": "8",
        "title": "Credentials: Formats, Types and the Catalogue",
        "kind": "chapter"
      },
      {
        "n": "9",
        "title": "Issuance: The OpenID4VCI Profile",
        "kind": "chapter"
      },
      {
        "n": "10",
        "title": "Presentation: OpenID4VP, DCQL and Proximity",
        "kind": "chapter"
      },
      {
        "n": "11",
        "title": "The Verification Pipeline: Five Layers, Three Outcomes",
        "kind": "chapter"
      },
      {
        "n": "12",
        "title": "Revocation and Lifecycle",
        "kind": "chapter"
      },
      {
        "n": "13",
        "title": "The Wallet: Rules, Keys and Attestations",
        "kind": "chapter"
      },
      {
        "n": "14",
        "title": "Identity: The Provisional Identity Credential Provider",
        "kind": "chapter"
      },
      {
        "n": "15",
        "title": "Privacy Engineering",
        "kind": "chapter"
      },
      {
        "n": "16",
        "title": "Security Model and Threats",
        "kind": "chapter"
      },
      {
        "n": "17",
        "title": "Sandbox, Open Packages and Reference Services",
        "kind": "chapter"
      },
      {
        "n": "18",
        "title": "Governance and Sovereignty",
        "kind": "chapter"
      },
      {
        "n": "19",
        "title": "The Shared Ledger: Why Not Now, and How It Will Come",
        "kind": "chapter"
      },
      {
        "n": "20",
        "title": "EU Alignment and Third-Country Recognition",
        "kind": "chapter"
      },
      {
        "n": "21",
        "title": "Decisions and Their Rationale",
        "kind": "chapter"
      },
      {
        "n": "22",
        "title": "Status, Roadmap and Open Decisions",
        "kind": "chapter"
      },
      {
        "n": "23",
        "title": "Limits and Open Questions",
        "kind": "chapter"
      },
      {
        "n": "24",
        "title": "Conclusion",
        "kind": "chapter"
      },
      {
        "n": "A",
        "title": "Glossary",
        "kind": "appendix",
        "label": "Appendix A"
      },
      {
        "n": "B",
        "title": "Decision records index",
        "kind": "appendix",
        "label": "Appendix B"
      },
      {
        "n": "C",
        "title": "Standards index",
        "kind": "appendix",
        "label": "Appendix C"
      },
      {
        "n": "D",
        "title": "Abbreviations",
        "kind": "appendix",
        "label": "Appendix D"
      },
      {
        "n": "E",
        "title": "Document set index",
        "kind": "appendix",
        "label": "Appendix E"
      },
      {
        "n": "",
        "title": "References",
        "kind": "references"
      }
    ]
  },
  "tr": {
    "title": "Türkiye ve Türk Dünyası için Dijital Güven Altyapısı",
    "subtitle": "Genişletilmiş baskı: nasıl çalışır, neden böyle seçildi, nereye gidiyor",
    "date": "Kasım 2026",
    "version": "1.0",
    "license": "CC BY 4.0",
    "citation": "Tamga Network (2026). Türkiye ve Türk Dünyası için Dijital Güven Altyapısı. Whitepaper, sürüm 1.0. https://tamga.network/whitepaper-tr.pdf",
    "abstractLabel": "Özet",
    "abstract": [
      "Tamga Network, Türkiye ve Türk dünyası için tasarlanmış, Avrupa Birliği'nin dijital kimlik düzeniyle aynı teknik dili konuşan bir güven ağıdır. Ağda kurum belgeyi verir, kişi belgeyi telefonundaki cüzdanda taşır ve kime göstereceğine kendisi karar verir, doğrulayıcı da belgeyi veren kuruma sormadan birkaç saniyede denetler. Belgeler AB'nin seçtiği açık standartlarla kodlanır (SD-JWT VC ve ISO/IEC 18013-5 mdoc); verme ve gösterme OpenID4VCI ve OpenID4VP profilleriyle yapılır; her belge cihazın güvenli donanımındaki bir anahtara bağlıdır ve kişi yalnızca istenen alanları gösterir. Güvenin kaynağı bugün herkesin indirip denetleyebildiği imzalı güven listeleri ve saat saat ilerleyen bir çapa günlüğüdür. Ortak bir defterin kodu yazılmış ve test edilmiştir; ama üretimde yoktur ve kapalıdır, en az iki bağımsız işletmeci olmadan da açılmaz. Ortak kayıtların hiçbirinde kişisel veri bulunmaz.",
      "Belge, bu yapının nasıl çalıştığını, her önemli seçimin neden yapıldığını ve ağın nereye gittiğini yirmi dört bölümde anlatır. Güven listeleri, kurum sertifikaları, belge biçimleri, verme ve gösterme akışları, doğrulama hattı, iptal, cüzdan kuralları, geçici kimlik servisi, gizlilik mühendisliği ve tehdit modeli tek tek açılır; her seçim, onu bağlayan karar kaydıyla ve değerlendirilen alternatifleriyle birlikte verilir. Egemenlik tasarımın baştan koyduğu bir şarttır. Her devlet kendi kaydının tek yazarıdır ve bugün devlet adına geçici olarak yürütülen her rol, hiçbir belgeyi, kurum kimliğini ya da belge türünü değiştirmeden devredilebilecek biçimde kurulmuştur. Bugün listelerde yalnızca Türkiye yuvası etkindir; öteki devletler için yalnızca yer ayrılmıştır.",
      "Metin her iddianın durumunu açıkça söyler: çalışan, kararı alınmış ama henüz canlı olmayan ve araştırma aşamasındaki işlevler ayrılır, yol haritası takvimle değil koşullarla verilir. Son bölümler kararların tamamını, beyan edilen artık riskleri ve açık soruları bir arada sunar. Belge hukuki görüş ya da sertifika iddiası değildir ve hiçbir devletle ya da kurumla yapılmış bir anlaşmanın bildirimi değildir."
    ],
    "keywordsLabel": "Anahtar kelimeler",
    "keywords": [
      "dijital güven altyapısı",
      "güven listeleri",
      "eIDAS 2.0",
      "EUDI ARF",
      "SD-JWT VC",
      "mdoc",
      "OpenID4VCI",
      "OpenID4VP",
      "seçici açıklama",
      "bağlanamazlık",
      "egemenlik",
      "Türk dünyası"
    ],
    "sections": [
      {
        "n": "1",
        "title": "Giriş: Kopyadan Kanıta",
        "kind": "chapter"
      },
      {
        "n": "2",
        "title": "Sorun Alanı ve Gereksinimler",
        "kind": "chapter"
      },
      {
        "n": "3",
        "title": "Arka Plan: eIDAS 2.0, EUDI ARF ve Açık Standartlar",
        "kind": "chapter"
      },
      {
        "n": "4",
        "title": "Tasarım İlkeleri ve Konumlanma",
        "kind": "chapter"
      },
      {
        "n": "5",
        "title": "Roller ve Bileşenler",
        "kind": "chapter"
      },
      {
        "n": "6",
        "title": "Güven Modeli: İmzalı Güven Listeleri ve Çapa Günlüğü",
        "kind": "chapter"
      },
      {
        "n": "7",
        "title": "Kurum Kimliği ve Sertifikalar",
        "kind": "chapter"
      },
      {
        "n": "8",
        "title": "Belgeler: Biçimler, Türler ve Katalog",
        "kind": "chapter"
      },
      {
        "n": "9",
        "title": "Belge Verme: OpenID4VCI Profili",
        "kind": "chapter"
      },
      {
        "n": "10",
        "title": "Gösterme: OpenID4VP, DCQL ve Yakın Alan",
        "kind": "chapter"
      },
      {
        "n": "11",
        "title": "Doğrulama Hattı: Beş Katman, Üç Sonuç",
        "kind": "chapter"
      },
      {
        "n": "12",
        "title": "İptal ve Yaşam Döngüsü",
        "kind": "chapter"
      },
      {
        "n": "13",
        "title": "Cüzdan: Kurallar, Anahtarlar ve Kanıtlar",
        "kind": "chapter"
      },
      {
        "n": "14",
        "title": "Kimlik: Geçici Kimlik Belgesi Sağlayıcısı",
        "kind": "chapter"
      },
      {
        "n": "15",
        "title": "Gizlilik Mühendisliği",
        "kind": "chapter"
      },
      {
        "n": "16",
        "title": "Güvenlik Modeli ve Tehditler",
        "kind": "chapter"
      },
      {
        "n": "17",
        "title": "Sandbox, Açık Paketler ve Referans Hizmetler",
        "kind": "chapter"
      },
      {
        "n": "18",
        "title": "Yönetişim ve Egemenlik",
        "kind": "chapter"
      },
      {
        "n": "19",
        "title": "Ortak Defter: Neden Şimdi Değil, Nasıl Gelir",
        "kind": "chapter"
      },
      {
        "n": "20",
        "title": "AB Uyumu ve Üçüncü Ülke Tanıma",
        "kind": "chapter"
      },
      {
        "n": "21",
        "title": "Kararlar ve Gerekçeleri",
        "kind": "chapter"
      },
      {
        "n": "22",
        "title": "Durum, Yol Haritası ve Açık Kararlar",
        "kind": "chapter"
      },
      {
        "n": "23",
        "title": "Sınırlar ve Açık Sorular",
        "kind": "chapter"
      },
      {
        "n": "24",
        "title": "Sonuç",
        "kind": "chapter"
      },
      {
        "n": "A",
        "title": "Sözlük",
        "kind": "appendix",
        "label": "Ek A"
      },
      {
        "n": "B",
        "title": "Karar kayıtları dizini",
        "kind": "appendix",
        "label": "Ek B"
      },
      {
        "n": "C",
        "title": "Standart dizini",
        "kind": "appendix",
        "label": "Ek C"
      },
      {
        "n": "D",
        "title": "Kısaltmalar",
        "kind": "appendix",
        "label": "Ek D"
      },
      {
        "n": "E",
        "title": "Belge seti dizini",
        "kind": "appendix",
        "label": "Ek E"
      },
      {
        "n": "",
        "title": "Kaynaklar",
        "kind": "references"
      }
    ]
  },
  "tk": {
    "title": "Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy",
    "subtitle": "Giňeldilen neşir: nähili işleýär, näme üçin şeýle saýlandy, nirä barýar",
    "date": "Noýabr 2026",
    "version": "1.0",
    "license": "CC BY 4.0",
    "citation": "Tamga Network (2026). Türkiýe we Türki Dünýäsi üçin Sanly Ynam Infrastrukturasy. Whitepaper, wersiýa 1.0. https://tamga.network/whitepaper-tk.pdf",
    "abstractLabel": "Gysgaça mazmuny",
    "abstract": [
      "Tamga Network Türkiýe we türki dünýäsi üçin taslanan, Ýewropa Bileleşiginiň sanly şahsyýet tertibi bilen şol bir tehniki dilde gürleşýän ynam torudyr. Torda resminamany gurama berýär, adam ony telefonyndaky gapjykda göterýär we kime görkezjekdigini özi kesgitleýär, barlaýjy bolsa resminamany beren guramadan soramazdan birnäçe sekuntda barlaýar. Resminamalar ÝB-niň saýlan açyk standartlary bilen kodlanýar (SD-JWT VC we ISO/IEC 18013-5 mdoc); bermek we hödürlemek OpenID4VCI we OpenID4VP profilleri bilen amala aşyrylýar; her resminama enjamyň howpsuz enjam bölegindäki açara baglanýar we adam diňe soralan meýdanlary görkezýär. Ynamyň çeşmesi häzir islendik adamyň göçürip alyp barlap bilýän gol çekilen ynam sanawlary we sagatma-sagat öňe gidýän labyr žurnalydyr. Umumy kitabyň kody ýazyldy we synagdan geçirildi; ýöne ol önümçilikde ýok we ýapyk, azyndan iki garaşsyz operator bolmasa-da açylmaz. Umumy ýazgylaryň hiç birinde şahsy maglumat ýok.",
      "Resminama bu gurluşyň nähili işleýändigini, her möhüm saýlawyň näme üçin edilendigini we toruň nirä barýandygyny ýigrimi dört bölümde gürrüň berýär. Ynam sanawlary, gurama sertifikatlary, resminama görnüşleri, bermek we hödürlemek akymlary, barlag hatary, ýatyrylyş, gapjyk düzgünleri, wagtlaýyn şahsyýet hyzmaty, gizlinlik inženerçiligi we howp modeli bir-birden açylýar; her saýlaw ony berkidýän karar ýazgysy we seredilen alternatiwalary bilen bilelikde berilýär. Özygtyýarlylyk dizaýnyň ilkibaşdan goýan şertidir. Her döwlet öz ýazgysynyň ýeke-täk ýazyjysydyr we häzir döwletiň adyndan wagtlaýyn ýerine ýetirilýän her rol hiç bir resminamany, guramanyň şahsyýetini ýa-da resminama görnüşini üýtgetmezden tabşyrylyp bilinjek görnüşde guruldy. Häzir sanawlarda diňe Türkiýäniň orny işjeň; beýleki döwletler üçin diňe orun goýuldy.",
      "Tekst her tassyklamanyň ýagdaýyny aç-açan aýdýar: işleýän, karary kabul edilen, ýöne heniz işe girizilmedik we gözleg tapgyryndaky funksiýalar aýrylýar, ýol kartasy senenama bilen däl-de, şertler bilen berilýär. Soňky bölümler kararlaryň hemmesini, yglan edilen galyndy töwekgelçilikleri we açyk soraglary bir ýerde hödürleýär. Resminama hukuk pikiri ýa-da sertifikat tassyklamasy däldir we hiç bir döwlet ýa-da gurama bilen baglaşylan ylalaşygyň habarnamasy däldir."
    ],
    "keywordsLabel": "Açar sözler",
    "keywords": [
      "sanly ynam infrastrukturasy",
      "ynam sanawlary",
      "eIDAS 2.0",
      "EUDI ARF",
      "SD-JWT VC",
      "mdoc",
      "OpenID4VCI",
      "OpenID4VP",
      "saýlap açmak",
      "baglanyşyksyzlyk",
      "özygtyýarlylyk",
      "türki dünýäsi"
    ],
    "sections": [
      {
        "n": "1",
        "title": "Giriş: Nusgadan Subutnama",
        "kind": "chapter"
      },
      {
        "n": "2",
        "title": "Mesele Meýdany we Talaplar",
        "kind": "chapter"
      },
      {
        "n": "3",
        "title": "Arka Plan: eIDAS 2.0, EUDI ARF we Açyk Standartlar",
        "kind": "chapter"
      },
      {
        "n": "4",
        "title": "Dizaýn Ýörelgeleri we Orun Kesgitlemek",
        "kind": "chapter"
      },
      {
        "n": "5",
        "title": "Rollar we Komponentler",
        "kind": "chapter"
      },
      {
        "n": "6",
        "title": "Ynam Modeli: Gol Çekilen Ynam Sanawlary we Labyr Žurnaly",
        "kind": "chapter"
      },
      {
        "n": "7",
        "title": "Guramanyň Şahsyýeti we Sertifikatlar",
        "kind": "chapter"
      },
      {
        "n": "8",
        "title": "Resminamalar: Formatlar, Görnüşler we Katalog",
        "kind": "chapter"
      },
      {
        "n": "9",
        "title": "Resminama Bermek: OpenID4VCI Profili",
        "kind": "chapter"
      },
      {
        "n": "10",
        "title": "Hödürlemek: OpenID4VP, DCQL we Ýakyn Aralyk",
        "kind": "chapter"
      },
      {
        "n": "11",
        "title": "Barlag Hatary: Bäş Gatlak, Üç Netije",
        "kind": "chapter"
      },
      {
        "n": "12",
        "title": "Ýatyrylyş we Durmuş Aýlawy",
        "kind": "chapter"
      },
      {
        "n": "13",
        "title": "Gapjyk: Düzgünler, Açarlar we Tassyklamalar",
        "kind": "chapter"
      },
      {
        "n": "14",
        "title": "Şahsyýet: Wagtlaýyn Şahsyýet Resminamasy Üpjün Edijisi",
        "kind": "chapter"
      },
      {
        "n": "15",
        "title": "Gizlinlik Inženeriýasy",
        "kind": "chapter"
      },
      {
        "n": "16",
        "title": "Howpsuzlyk Modeli we Howplar",
        "kind": "chapter"
      },
      {
        "n": "17",
        "title": "Sandbox, Açyk Paketler we Salgylanma Hyzmatlary",
        "kind": "chapter"
      },
      {
        "n": "18",
        "title": "Dolandyryş we Özygtyýarlylyk",
        "kind": "chapter"
      },
      {
        "n": "19",
        "title": "Umumy Kitap: Näme üçin Häzir Däl, Nähili Geler",
        "kind": "chapter"
      },
      {
        "n": "20",
        "title": "ÝB bilen Laýyklyk we Üçünji Ýurtlary Ykrar Etmek",
        "kind": "chapter"
      },
      {
        "n": "21",
        "title": "Kararlar we Olaryň Esaslary",
        "kind": "chapter"
      },
      {
        "n": "22",
        "title": "Ýagdaý, Ýol Kartasy we Açyk Kararlar",
        "kind": "chapter"
      },
      {
        "n": "23",
        "title": "Çäkler we Açyk Soraglar",
        "kind": "chapter"
      },
      {
        "n": "24",
        "title": "Netije",
        "kind": "chapter"
      },
      {
        "n": "A",
        "title": "Sözlük",
        "kind": "appendix",
        "label": "Goşmaça A"
      },
      {
        "n": "B",
        "title": "Karar ýazgylarynyň görkezijisi",
        "kind": "appendix",
        "label": "Goşmaça B"
      },
      {
        "n": "C",
        "title": "Standartlaryň görkezijisi",
        "kind": "appendix",
        "label": "Goşmaça C"
      },
      {
        "n": "D",
        "title": "Gysgaltmalar",
        "kind": "appendix",
        "label": "Goşmaça D"
      },
      {
        "n": "E",
        "title": "Resminamalar toplumynyň görkezijisi",
        "kind": "appendix",
        "label": "Goşmaça E"
      },
      {
        "n": "",
        "title": "Çeşmeler",
        "kind": "references"
      }
    ]
  },
  "az": {
    "title": "Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu",
    "subtitle": "Genişləndirilmiş nəşr: necə işləyir, niyə belə seçilib, hara gedir",
    "date": "Noyabr 2026",
    "version": "1.0",
    "license": "CC BY 4.0",
    "citation": "Tamga Network (2026). Türkiyə və Türk Dünyası üçün Rəqəmsal Etibar İnfrastrukturu. Whitepaper, versiya 1.0. https://tamga.network/whitepaper-az.pdf",
    "abstractLabel": "Xülasə",
    "abstract": [
      "Tamga Network Türkiyə və Türk dünyası üçün layihələndirilmiş, Avropa İttifaqının rəqəmsal şəxsiyyət sistemi ilə eyni texniki dildə danışan etibar şəbəkəsidir. Şəbəkədə sənədi qurum verir, şəxs onu telefonundakı cüzdanda daşıyır və kimə göstərəcəyinə özü qərar verir, yoxlayan tərəf isə sənədi verən quruma müraciət etmədən onu bir neçə saniyədə yoxlayır. Sənədlər Aİ-nin seçdiyi açıq standartlarla kodlaşdırılır (SD-JWT VC və ISO/IEC 18013-5 mdoc); vermə və təqdimetmə OpenID4VCI və OpenID4VP profilləri ilə aparılır; hər sənəd cihazın təhlükəsiz aparat təminatındakı bir açara bağlıdır və şəxs yalnız tələb olunan sahələri göstərir. Etibarın mənbəyi bu gün hər kəsin yükləyib yoxlaya bildiyi imzalı etibar siyahıları və saatbasaat irəliləyən lövbər jurnalıdır. Ortaq reyestrin kodu yazılıb və test edilib; lakin o, istehsalatda yoxdur, söndürülüb və ən azı iki müstəqil operator olmadan işə salınmır. Ortaq qeydlərin heç birində fərdi məlumat yoxdur.",
      "Sənəd bu strukturun necə işlədiyini, hər mühüm seçimin niyə edildiyini və şəbəkənin hara getdiyini iyirmi dörd bölmədə izah edir. Etibar siyahıları, qurum sertifikatları, sənəd formatları, vermə və təqdimetmə axınları, yoxlama xətti, ləğv, cüzdan qaydaları, müvəqqəti şəxsiyyət xidməti, məxfilik mühəndisliyi və təhdid modeli bir-bir açılır; hər seçim onu bağlayan qərar qeydi və nəzərdən keçirilmiş alternativlərlə birlikdə verilir. Suverenlik dizaynın əvvəldən qoyduğu şərtdir. Hər dövlət öz qeydiyyatının yeganə müəllifidir və bu gün dövlət adından müvəqqəti icra edilən hər rol heç bir sənədi, qurum identifikatorunu və ya sənəd növünü dəyişdirmədən təhvil verilə biləcək şəkildə qurulub. Bu gün siyahılarda yalnız Türkiyə üçün yer aktivdir; digər dövlətlər üçün yalnız yer ayrılıb.",
      "Mətn hər iddianın vəziyyətini açıq deyir: işləyən, qərarı qəbul edilmiş, lakin hələ canlı olmayan və tədqiqat mərhələsində olan funksiyalar bir-birindən ayrılır, yol xəritəsi təqvimlə deyil, şərtlərlə verilir. Son bölmələr qərarların hamısını, bəyan edilmiş qalıq riskləri və açıq sualları bir yerdə təqdim edir. Sənəd hüquqi rəy və ya sertifikat iddiası deyil, heç bir dövlət və ya qurumla bağlanmış razılaşma barədə bildiriş də deyil."
    ],
    "keywordsLabel": "Açar sözlər",
    "keywords": [
      "rəqəmsal etibar infrastrukturu",
      "etibar siyahıları",
      "eIDAS 2.0",
      "EUDI ARF",
      "SD-JWT VC",
      "mdoc",
      "OpenID4VCI",
      "OpenID4VP",
      "seçici paylaşım",
      "əlaqələndirilməzlik",
      "suverenlik",
      "Türk dünyası"
    ],
    "sections": [
      {
        "n": "1",
        "title": "Giriş: Surətdən Sübuta",
        "kind": "chapter"
      },
      {
        "n": "2",
        "title": "Problem Sahəsi və Tələblər",
        "kind": "chapter"
      },
      {
        "n": "3",
        "title": "Arxa Plan: eIDAS 2.0, EUDI ARF və Açıq Standartlar",
        "kind": "chapter"
      },
      {
        "n": "4",
        "title": "Dizayn Prinsipləri və Mövqeləndirmə",
        "kind": "chapter"
      },
      {
        "n": "5",
        "title": "Rollar və Komponentlər",
        "kind": "chapter"
      },
      {
        "n": "6",
        "title": "Etibar Modeli: İmzalı Etibar Siyahıları və Lövbər Jurnalı",
        "kind": "chapter"
      },
      {
        "n": "7",
        "title": "Qurum Şəxsiyyəti və Sertifikatlar",
        "kind": "chapter"
      },
      {
        "n": "8",
        "title": "Sənədlər: Formatlar, Növlər və Kataloq",
        "kind": "chapter"
      },
      {
        "n": "9",
        "title": "Sənədin Verilməsi: OpenID4VCI Profili",
        "kind": "chapter"
      },
      {
        "n": "10",
        "title": "Təqdimetmə: OpenID4VP, DCQL və Yaxın Məsafə",
        "kind": "chapter"
      },
      {
        "n": "11",
        "title": "Yoxlama Xətti: Beş Qat, Üç Nəticə",
        "kind": "chapter"
      },
      {
        "n": "12",
        "title": "Ləğv və Həyat Dövrü",
        "kind": "chapter"
      },
      {
        "n": "13",
        "title": "Cüzdan: Qaydalar, Açarlar və Sübutlar",
        "kind": "chapter"
      },
      {
        "n": "14",
        "title": "Şəxsiyyət: Müvəqqəti Şəxsiyyət Sənədi Provayderi",
        "kind": "chapter"
      },
      {
        "n": "15",
        "title": "Məxfilik Mühəndisliyi",
        "kind": "chapter"
      },
      {
        "n": "16",
        "title": "Təhlükəsizlik Modeli və Təhdidlər",
        "kind": "chapter"
      },
      {
        "n": "17",
        "title": "Sandbox, Açıq Paketlər və İstinad Xidmətləri",
        "kind": "chapter"
      },
      {
        "n": "18",
        "title": "İdarəetmə və Suverenlik",
        "kind": "chapter"
      },
      {
        "n": "19",
        "title": "Ortaq Reyestr: Niyə İndi Yox, Necə Gələcək",
        "kind": "chapter"
      },
      {
        "n": "20",
        "title": "Aİ ilə Uyğunluq və Üçüncü Ölkə Tərəfindən Tanınma",
        "kind": "chapter"
      },
      {
        "n": "21",
        "title": "Qərarlar və Onların Əsaslandırması",
        "kind": "chapter"
      },
      {
        "n": "22",
        "title": "Status, Yol Xəritəsi və Açıq Qərarlar",
        "kind": "chapter"
      },
      {
        "n": "23",
        "title": "Hədlər və Açıq Suallar",
        "kind": "chapter"
      },
      {
        "n": "24",
        "title": "Nəticə",
        "kind": "chapter"
      },
      {
        "n": "A",
        "title": "Lüğət",
        "kind": "appendix",
        "label": "Əlavə A"
      },
      {
        "n": "B",
        "title": "Qərar qeydlərinin göstəricisi",
        "kind": "appendix",
        "label": "Əlavə B"
      },
      {
        "n": "C",
        "title": "Standartlar göstəricisi",
        "kind": "appendix",
        "label": "Əlavə C"
      },
      {
        "n": "D",
        "title": "Abbreviaturalar",
        "kind": "appendix",
        "label": "Əlavə D"
      },
      {
        "n": "E",
        "title": "Sənədlər toplusunun göstəricisi",
        "kind": "appendix",
        "label": "Əlavə E"
      },
      {
        "n": "",
        "title": "Mənbələr",
        "kind": "references"
      }
    ]
  }
};

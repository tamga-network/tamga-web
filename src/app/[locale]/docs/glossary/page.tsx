import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { DocArticle } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

type Group = { title: string; terms: { term: string; def: string }[] };
type Content = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  groups: Group[];
};

const CONTENT: Record<Locale, Content> = {
  en: {
    meta: {
      title: "Glossary",
      description:
        "A glossary of the core terms used across the Tamga Network ecosystem — digital identity, trust and blockchain concepts.",
    },
    eyebrow: "Reference",
    title: "Glossary",
    intro:
      "The core terms used across the Tamga Network ecosystem. When you get stuck on a concept, you can quickly look here.",
    groups: [
      {
        title: "Core concepts",
        terms: [
          { term: "Tamga Network", def: "A Digital Trust Infrastructure that unites digital identity, verifiable credentials, authorization and immutable records under a single architecture. It is not a blockchain network: today trust is anchored in signed trust lists; a permissioned ledger may be added later." },
          { term: "Digital Trust Infrastructure", def: "The layer that provides trust in the digital world as a shared infrastructure service. Instead of each application solving the trust problem separately, it provides a common trust layer." },
          { term: "TamgaID", def: "The infrastructure’s first end-user product. The wallet where an individual creates, manages and uses their digital identity. TamgaID is not Tamga Network itself." },
          { term: "Trust Mesh", def: "Not a central authority, but a mesh of interoperable, independent trust networks. Each country keeps its own network while connecting through shared standards." },
          { term: "Vertical Platform", def: "A sector-specific platform running on the shared trust infrastructure: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay." },
        ],
      },
      {
        title: "Tamga today",
        terms: [
          { term: "Trust list", def: "A signed, versioned, hash-chained public register of institutions, their certificates, what they may issue and their status. The EU model (ETSI TS 119 612)." },
          { term: "Anchor log", def: "A public, append-only log where every revocation-list publication and schema change is written as a signed line, at least hourly." },
          { term: "SD-JWT VC", def: "The IETF credential format Tamga uses by default: each field hidden behind a salted hash, revealed only with the holder’s approval." },
          { term: "mdoc (ISO 18013-5)", def: "The mobile-document format of the mobile driving licence. Tamga issues the identity credential also as an mdoc, e.g. for age checks." },
          { term: "OpenID4VCI / OpenID4VP", def: "The OpenID standards for issuing credentials into a wallet and presenting them to a verifier — the EUDI profiles." },
          { term: "Wallet Unit Attestation (WUA)", def: "A short-lived statement from the wallet provider that the app is a genuine wallet; issuers require it." },
          { term: "Per-verifier copy", def: "The wallet holds several copies of each credential, each bound to a different device key, and gives each verifier a different one — so verifiers cannot link the holder." },
          { term: "ACCEPTED / REJECTED / INDETERMINATE", def: "The three verification outcomes. INDETERMINATE means “could not be checked right now” and is never shown as a rejection." },
          { term: "Passkey", def: "A WebAuthn key on your device for one website. After signing up with the wallet, daily sign-in uses a passkey and shares no fields." },
        ],
      },
      {
        title: "Identity and trust",
        terms: [
          { term: "Digital Identity", def: "The verifiable representation of an entity on the network (individual, institution, object). The starting point of the ecosystem." },
          { term: "DID", def: "Decentralized Identifier. A unique identity address that can be verified without depending on a central authority (a W3C standard)." },
          { term: "VC — Verifiable Credential", def: "A verifiable document. A digital document with an embedded digital signature that can be verified without going to the source (diploma, licence, etc.)." },
          { term: "SSI", def: "Self-Sovereign Identity. The approach where control of identity belongs not to a central institution but to the user themselves." },
          { term: "Issuer – Holder – Verifier", def: "The trust triangle. The Issuer issues and signs the credential; the Holder carries and presents it in their wallet; the Verifier checks the signature without going to the source." },
          { term: "Trust Graph", def: "The trust graph formed by the verifiable links among identities, relationships, credentials and events." },
        ],
      },
      {
        title: "Cryptography and records",
        terms: [
          { term: "Hash", def: "A fixed-length, one-way digital fingerprint produced from data. Used to prove that the data has not changed." },
          { term: "Digital signature", def: "Sealing the hash of data with a private key. Verified with the public key; proves the source and integrity of a document." },
          { term: "PKI", def: "Public Key Infrastructure. A chain of trust that records which key belongs to which institution and what it is authorized to do." },
          { term: "SD-JWT", def: "Selective Disclosure JWT. A format that lets only the necessary fields be revealed without breaking a document’s integrity." },
          { term: "ZKP", def: "Zero-Knowledge Proof. A technique for proving something without revealing its value at all." },
          { term: "On-chain / Off-chain", def: "On-chain: non-personal trust data kept on the blockchain. Off-chain: operational data and documents kept in the wallet/institution. Today Tamga has no chain; public trust data lives in signed trust lists." },
        ],
      },
      {
        title: "Network and standards",
        terms: [
          { term: "Permissioned network", def: "A blockchain network where the validators are specific and trusted. The ledger Tamga plans is one." },
          { term: "Consensus", def: "The mechanism by which the network’s nodes agree on the content of the next block. Tamga uses QBFT (the Byzantine Fault Tolerance family)." },
          { term: "Hyperledger Besu", def: "The open-source, EVM-compatible client Tamga chose for its future ledger (once at least two independent operators join). The same technology family as Europe’s EBSI infrastructure." },
          { term: "eIDAS 2.0", def: "The EU’s electronic identity and trust services framework; it makes a digital identity wallet mandatory for every member state." },
          { term: "EUDI Wallet", def: "European Digital Identity Wallet — the EU citizen’s digital identity wallet (the application layer)." },
          { term: "EBSI", def: "European Blockchain Services Infrastructure — the EU’s inter-institutional trust infrastructure (the infrastructure layer). Tamga’s positional counterpart." },
        ],
      },
      {
        title: "Advanced architecture",
        terms: [
          { term: "Root Identity", def: "The unique identity record issued by the state that holds the link to the real person. Only the issuer + a guardian threshold can access it." },
          { term: "Pseudonym", def: "A separate, mutually unlinkable identity derived from the root identity for each application. Prevents cross-application profiling." },
          { term: "Unlinkability", def: "The property that the same person’s identities in different applications cannot be mathematically correlated." },
          { term: "HD derivation (BIP32/SLIP-0010)", def: "Hierarchical deterministic key derivation. A method of producing unlimited, unlinkable child keys from a single seed along fixed paths." },
          { term: "BIP39 mnemonic", def: "A 24-word recovery phrase; converted to a seed (PBKDF2-HMAC-SHA512). The source of all the user’s keys." },
          { term: "Escrow", def: "A record holding the link between pseudonyms and the root identity, protected by threshold encryption. Opened only with authority." },
          { term: "Threshold encryption", def: "A model where the decryption authority is split into shares and can only be used when enough (K-of-N) shares come together." },
          { term: "Distributed Key Generation (DKG)", def: "A protocol where guardians jointly generate a shared key so that no single party ever holds it; the key is never reconstructed — only a specific ciphertext is opened by a quorum (threshold ElGamal)." },
          { term: "Guardian", def: "One of an institutional set of five per state (judiciary, data-protection authority, civil-registry authority, ombudsman, a parliament-appointed member), each holding one threshold share. A 3-of-5 quorum with at least one non-executive approval is required to open." },
          { term: "Envelope encryption", def: "Encrypting data with a DEK and wrapping the DEK with a KEK; since the server never sees the KEK, it cannot read the content." },
          { term: "DEK / KEK", def: "Data Encryption Key / Key Encryption Key. The two-layer keys in envelope encryption that encrypt the data and wrap that key." },
          { term: "Token Status List", def: "The IETF revocation list Tamga uses: two bits per credential copy (valid, revoked, suspended) at a random position, signed and published at a fixed interval." },
          { term: "Challenge-response (FIDO2/WebAuthn)", def: "Authentication where, without sending a password, a random value from the server is signed with the private key and verified with the public key." },
          { term: "Secure Enclave / StrongBox", def: "The secure area on iOS and Android where keys/PINs are stored in hardware isolation." },
          { term: "ICAO 9303", def: "The e-passport/e-ID NFC chip verification standard. Used together with face matching in second-tier recovery." },
        ],
      },
    ],
  },
  tr: {
    meta: {
      title: "Sözlük",
      description:
        "Tamga Network ekosisteminde kullanılan temel terimlerin sözlüğü — dijital kimlik, güven ve blockchain kavramları.",
    },
    eyebrow: "Referans",
    title: "Sözlük",
    intro:
      "Tamga Network ekosisteminde geçen temel terimler. Bir kavrama takıldığında hızlıca buraya bakabilirsin.",
    groups: [
      {
        title: "Temel kavramlar",
        terms: [
          { term: "Tamga Network", def: "Dijital kimlik, doğrulanabilir belgeler, yetkilendirme ve değiştirilemez kayıtları tek mimari altında birleştiren Dijital Güven Altyapısı. Bir blockchain ağı değildir: bugün güven imzalı güven listelerine dayanır; ileride izinli bir defter eklenebilir." },
          { term: "Digital Trust Infrastructure", def: "Dijital ortamda güveni ortak bir altyapı hizmeti olarak sunan katman. Her uygulamanın güven problemini ayrı çözmesi yerine ortak bir güven katmanı sağlar." },
          { term: "TamgaID", def: "Altyapının son kullanıcıya açılan ilk ürünü. Bireyin dijital kimliğini oluşturduğu, yönettiği ve kullandığı cüzdan. TamgaID, Tamga Network’ün kendisi değildir." },
          { term: "Trust Mesh", def: "Merkezî bir otorite değil, birlikte çalışabilir bağımsız güven ağlarından oluşan örgü. Her ülke kendi ağını korurken ortak standartlarla bağlanır." },
          { term: "Vertical Platform (Dikey Platform)", def: "Ortak güven altyapısı üzerinde çalışan sektöre özel platform: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay." },
        ],
      },
      {
        title: "Bugün Tamga",
        terms: [
          { term: "Güven listesi", def: "Kurumların, sertifikalarının, neyi verebileceklerinin ve durumlarının imzalı, sürümlü, hash-zincirli ve herkese açık kaydı. AB modeli (ETSI TS 119 612)." },
          { term: "Çapa günlüğü", def: "Her iptal listesi yayınının ve şema değişikliğinin, en az saatte bir, imzalı bir satır olarak yazıldığı herkese açık ve yalnızca eklenebilen günlük." },
          { term: "SD-JWT VC", def: "Tamga’nın varsayılan IETF belge biçimi: her alan tuzlanmış bir özetin arkasında gizlidir ve yalnızca belge sahibinin onayıyla açılır." },
          { term: "mdoc (ISO 18013-5)", def: "Mobil ehliyetin mobil belge biçimi. Tamga kimlik belgesini, örneğin yaş kontrolü için, mdoc olarak da verir." },
          { term: "OpenID4VCI / OpenID4VP", def: "Belgeyi cüzdana vermek ve doğrulayıcıya sunmak için OpenID standartları — EUDI profilleri." },
          { term: "Cüzdan onayı (WUA)", def: "Cüzdan sağlayıcısının, uygulamanın gerçek bir cüzdan olduğunu söyleyen kısa ömürlü beyanı; belge verenler bunu ister." },
          { term: "Doğrulayıcı başına kopya", def: "Cüzdan her belgenin, her biri farklı cihaz anahtarına bağlı birkaç kopyasını tutar ve her doğrulayıcıya farklı birini verir — doğrulayıcılar belge sahibini eşleştiremez." },
          { term: "ACCEPTED / REJECTED / INDETERMINATE", def: "Üç doğrulama sonucu. INDETERMINATE “şu an denetlenemedi” demektir ve asla red olarak gösterilmez." },
          { term: "Passkey", def: "Cihazında tek bir web sitesine ait WebAuthn anahtarı. Cüzdanla kayıttan sonra günlük giriş passkey ile olur ve hiçbir alan paylaşılmaz." },
        ],
      },
      {
        title: "Kimlik ve güven",
        terms: [
          { term: "Digital Identity", def: "Ağ üzerindeki bir varlığın (birey, kurum, nesne) doğrulanabilir temsili. Ekosistemin başlangıç noktası." },
          { term: "DID", def: "Decentralized Identifier — merkeziyetsiz tanımlayıcı. Merkezî bir otoriteye bağımlı olmadan doğrulanabilen benzersiz kimlik adresi (W3C standardı)." },
          { term: "VC — Verifiable Credential", def: "Doğrulanabilir belge. İçine dijital imza gömülü, kaynağa gitmeden doğrulanabilen dijital belge (diploma, ehliyet vb.)." },
          { term: "SSI", def: "Self-Sovereign Identity — öz-egemen kimlik. Kimliğin kontrolünün merkezî kuruma değil, kullanıcının kendisine ait olduğu yaklaşım." },
          { term: "Issuer – Holder – Verifier", def: "Güven üçgeni. Issuer belgeyi düzenler ve imzalar; Holder cüzdanında taşır ve sunar; Verifier imzayı kaynağa gitmeden doğrular." },
          { term: "Trust Graph", def: "Kimlikler, ilişkiler, credential’lar ve olaylar arasındaki doğrulanabilir bağların oluşturduğu güven grafiği." },
        ],
      },
      {
        title: "Kriptografi ve kayıt",
        terms: [
          { term: "Hash", def: "Bir veriden üretilen sabit uzunluklu, tek yönlü dijital parmak izi. Verinin değişmediğini kanıtlamaya yarar." },
          { term: "Dijital imza", def: "Bir verinin hash’inin özel anahtarla mühürlenmesi. Açık anahtarla doğrulanır; belgenin kaynağını ve bütünlüğünü kanıtlar." },
          { term: "PKI", def: "Public Key Infrastructure — açık anahtar altyapısı. Hangi anahtarın hangi kuruma ait ve yetkili olduğunu kaydeden güven zinciri." },
          { term: "SD-JWT", def: "Selective Disclosure JWT. Bir belgenin bütünlüğünü bozmadan yalnızca gerekli alanların açığa çıkarılmasını sağlayan format." },
          { term: "ZKP", def: "Zero-Knowledge Proof — sıfır bilgi ispatı. Bir şeyi, o şeyin değerini hiç açıklamadan kanıtlama tekniği." },
          { term: "On-chain / Off-chain", def: "On-chain: blockchain’de tutulan kişisel olmayan güven verisi. Off-chain: cüzdanda/kurumda tutulan operasyonel veri ve belgeler. Bugün Tamga’da zincir yok; herkese açık güven verisi imzalı güven listelerinde." },
        ],
      },
      {
        title: "Ağ ve standartlar",
        terms: [
          { term: "İzinli (permissioned) ağ", def: "Doğrulayıcıların (validator) belirli ve güvenilir olduğu blockchain ağı. Tamga’nın planladığı defter böyledir." },
          { term: "Consensus", def: "Ağdaki node’ların bir sonraki bloğun içeriğinde uzlaşma mekanizması. Tamga QBFT (Byzantine Fault Tolerance ailesi) kullanır." },
          { term: "Hyperledger Besu", def: "Tamga’nın gelecekteki defteri için seçtiği açık kaynaklı, EVM uyumlu istemci (en az iki bağımsız operatör katılınca). Avrupa’nın EBSI altyapısıyla aynı teknoloji ailesi." },
          { term: "eIDAS 2.0", def: "AB’nin elektronik kimlik ve güven hizmetleri çerçevesi; her üye devlete dijital kimlik cüzdanı zorunluluğu getirir." },
          { term: "EUDI Wallet", def: "European Digital Identity Wallet — AB vatandaşının dijital kimlik cüzdanı (uygulama katmanı)." },
          { term: "EBSI", def: "European Blockchain Services Infrastructure — AB’nin kurumlar arası güven altyapısı (altyapı katmanı). Tamga’nın konumsal emsali." },
        ],
      },
      {
        title: "İleri mimari",
        terms: [
          { term: "Root Identity (Kök Kimlik)", def: "Devletin verdiği, gerçek kişiyle bağı tutan tekil kimlik kaydı. Yalnızca issuer + guardian eşiği erişebilir." },
          { term: "Pseudonym", def: "Kök kimlikten türetilmiş, her uygulama için ayrı ve birbirine bağlanamayan takma kimlik. Uygulamalar arası profillemeyi engeller." },
          { term: "Unlinkability", def: "Bağlanamazlık. Aynı kişinin farklı uygulamalardaki kimliklerinin matematiksel olarak ilişkilendirilememesi." },
          { term: "HD türetme (BIP32/SLIP-0010)", def: "Hiyerarşik deterministik anahtar türetme. Tek bir seed’den, sabit yollarla sınırsız ve bağlantısız alt anahtar üretme yöntemi." },
          { term: "BIP39 mnemonic", def: "24 kelimelik kurtarma ifadesi; bir seed’e dönüştürülür (PBKDF2-HMAC-SHA512). Kullanıcının tüm anahtarlarının kaynağı." },
          { term: "Escrow (eşleme kaydı)", def: "Pseudonym’ler ile kök kimlik arasındaki bağı tutan, eşik şifrelemeyle korunan kayıt. Yalnızca yetkiyle açılır." },
          { term: "Threshold encryption", def: "Eşik şifreleme. Çözme yetkisinin paylara bölünüp ancak yeterli sayıda (K-of-N) pay bir araya gelince kullanılabildiği model." },
          { term: "Dağıtık Anahtar Üretimi (DKG)", def: "Guardian’ların ortak bir anahtarı, hiçbir tarafın onu tek başına tutmayacağı şekilde birlikte ürettiği protokol; anahtar asla yeniden kurulmaz — yalnızca belirli bir şifreli metin bir yeter sayı tarafından açılır (threshold ElGamal)." },
          { term: "Guardian", def: "Devlet başına kurumsal bir 5’liden biri (yargı, veri-koruma otoritesi, nüfus/kimlik otoritesi, ombudsman, parlamento-atamalı üye); her biri bir eşik payı tutar. Açma için 3-of-5 yeter sayı ve en az bir yürütme-dışı onay gerekir." },
          { term: "Envelope encryption", def: "Zarf şifreleme. Veriyi bir DEK ile şifreleyip DEK’i bir KEK ile sarma; sunucu KEK’i görmediği için içeriği okuyamaz." },
          { term: "DEK / KEK", def: "Data Encryption Key / Key Encryption Key. Zarf şifrelemede veriyi şifreleyen ve o anahtarı sarmalayan iki katmanlı anahtar." },
          { term: "Token Status List", def: "Tamga’nın kullandığı IETF iptal listesi: her belge kopyası için rastgele bir konumda iki bit (geçerli, iptal, askıda); sabit aralıkla imzalanıp yayınlanır." },
          { term: "Challenge-response (FIDO2/WebAuthn)", def: "Parola göndermeden, sunucunun yolladığı rastgele bir değeri özel anahtarla imzalayıp açık anahtarla doğrulatan kimlik doğrulama." },
          { term: "Secure Enclave / StrongBox", def: "iOS ve Android’de anahtar/PIN’lerin donanımsal olarak izole saklandığı güvenli bölge." },
          { term: "ICAO 9303", def: "E-pasaport/e-kimlik NFC çip doğrulama standardı. İkinci kademe kurtarmada yüz eşleştirmeyle birlikte kullanılır." },
        ],
      },
    ],
  },
  tk: {
    meta: {
      title: "Sözlük",
      description:
        "Tamga Network ekoulgamynda ulanylýan esasy terminleriň sözlügi — sanly şahsyýet, ynam we blokçeýn düşünjeleri.",
    },
    eyebrow: "Salgy",
    title: "Sözlük",
    intro:
      "Tamga Network ekoulgamynda ulanylýan esasy terminler. Bir düşünjä kürtdüreniňde çalt bu ýere seredip bilýärsiň.",
    groups: [
      {
        title: "Esasy düşünjeler",
        terms: [
          { term: "Tamga Network", def: "Sanly şahsyýeti, barlanyp bilinýän resminamalary, ygtyýarlandyrmany we üýtgedip bolmajak ýazgylary ýeke arhitekturada birleşdirýän Sanly Ynam Infrastrukturasy. Blokçeýn tory däl: häzir ynam gol çekilen ynam sanawlaryna daýanýar; soňra rugsatly kitap goşulyp biler." },
          { term: "Digital Trust Infrastructure", def: "Sanly gurşawda ynamy umumy infrastruktura hyzmaty hökmünde hödürleýän gatlak. Her programmanyň ynam meselesini aýry çözmegi ýerine umumy ynam gatlagyny üpjün edýär." },
          { term: "TamgaID", def: "Infrastrukturanyň soňky ulanyja açylýan ilkinji önümi. Şahsyň sanly şahsyýetini döredýän, dolandyrýan we ulanýan gapjygy. TamgaID Tamga Network-iň özi däl." },
          { term: "Trust Mesh", def: "Merkezi häkimiýet däl, bilelikde işleýän garaşsyz ynam torlaryndan ybarat örüm. Her ýurt öz toruny saklap umumy standartlar bilen baglanýar." },
          { term: "Vertical Platform (Dik platforma)", def: "Umumy ynam infrastrukturasynda işleýän pudaklaýyn platforma: TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay." },
        ],
      },
      {
        title: "Häzirki Tamga",
        terms: [
          { term: "Ynam sanawy", def: "Guramalaryň, sertifikatlarynyň, näme berip biljekdikleriniň we ýagdaýynyň gol çekilen, wersiýaly, heş-zynjyrly açyk hasaby. ÝB modeli (ETSI TS 119 612)." },
          { term: "Labyr žurnaly", def: "Her ýatyrylyş sanawynyň çap edilmegi we shema üýtgeşmesi, azyndan sagatda bir gezek, gol çekilen setir hökmünde ýazylýan açyk we diňe goşup bolýan žurnal." },
          { term: "SD-JWT VC", def: "Tamga-nyň adaty IETF resminama görnüşi: her meýdan duzlanan heşiň aňyrsynda gizlenýär we diňe eýesiniň razylygy bilen açylýar." },
          { term: "mdoc (ISO 18013-5)", def: "Mobil sürüjilik şahadatnamasynyň mobil resminama görnüşi. Tamga şahsyýet resminamasyny, meselem ýaş barlagy üçin, mdoc görnüşinde hem berýär." },
          { term: "OpenID4VCI / OpenID4VP", def: "Resminamany gapjyga bermek we barlaýja hödürlemek üçin OpenID standartlary — EUDI profilleri." },
          { term: "Gapjyk tassyklamasy (WUA)", def: "Gapjyk üpjün edijisiniň programmanyň hakyky gapjykdygyny aýdýan gysga möhletli beýany; berijiler muny talap edýär." },
          { term: "Barlaýjy başyna nusga", def: "Gapjyk her resminamanyň her biri başga enjam açaryna baglanan birnäçe nusgasyny saklaýar we her barlaýja başgasyny berýär — barlaýjylar eýäni baglanyşdyryp bilmeýär." },
          { term: "ACCEPTED / REJECTED / INDETERMINATE", def: "Üç barlag netijesi. INDETERMINATE “häzir barlap bolmady” diýmekdir we asla ret hökmünde görkezilmeýär." },
          { term: "Passkey", def: "Enjamyňdaky bir web saýta degişli WebAuthn açary. Gapjyk bilen hasaba durandan soň gündelik giriş passkey bilen bolýar we hiç bir meýdan paýlaşylmaýar." },
        ],
      },
      {
        title: "Şahsyýet we ynam",
        terms: [
          { term: "Digital Identity", def: "Tordaky bir subýektiň (şahs, gurama, zat) barlanyp bilinýän görkezmesi. Ekoulgamyň başlangyç nokady." },
          { term: "DID", def: "Decentralized Identifier — merkezleşdirilmedik kesgitleýji. Merkezi häkimiýete bagly bolmazdan barlanyp bilinýän özboluşly şahsyýet salgysy (W3C standarty)." },
          { term: "VC — Verifiable Credential", def: "Barlanyp bilinýän resminama. Içine sanly gol gömlüp goýlan, çeşmä gitmän barlanyp bilinýän sanly resminama (diplom, şahadatnama we ş.m.)." },
          { term: "SSI", def: "Self-Sovereign Identity — öz-özygtyýarly şahsyýet. Şahsyýetiň gözegçiliginiň merkezi gurama däl-de, ulanyjynyň özüne degişli bolan çemeleşme." },
          { term: "Issuer – Holder – Verifier", def: "Ynam üçburçlugy. Issuer resminamany taýýarlaýar we gol çekýär; Holder gapjygynda göterýär we hödürleýär; Verifier goly çeşmä gitmän barlaýar." },
          { term: "Trust Graph", def: "Şahsyýetleriň, gatnaşyklaryň, credential-laryň we wakalaryň arasyndaky barlanyp bilinýän baglanyşyklardan emele gelen ynam grafigi." },
        ],
      },
      {
        title: "Kriptografiýa we ýazgy",
        terms: [
          { term: "Hash", def: "Maglumatdan öndürilen durnukly uzynlykdaky, bir taraplaýyn sanly barmak yzy. Maglumatyň üýtgemändigini subut etmäge ýarar." },
          { term: "Sanly gol", def: "Maglumatyň hash-iniň gizlin açar bilen möhürlenmegi. Açyk açar bilen barlanýar; resminamanyň çeşmesini we bitewiligini subut edýär." },
          { term: "PKI", def: "Public Key Infrastructure — açyk açar infrastrukturasy. Haýsy açaryň haýsy gurama degişlidigini we ygtyýarlydygyny ýazýan ynam zynjyry." },
          { term: "SD-JWT", def: "Selective Disclosure JWT. Resminamanyň bitewiligini bozman diňe zerur meýdanlaryň açylmagyna mümkinçilik berýän format." },
          { term: "ZKP", def: "Zero-Knowledge Proof — nol-bilim subutnamasy. Bir zady, şol zadyň bahasyny asla açman subut etmek usuly." },
          { term: "On-chain / Off-chain", def: "On-chain: blokçeýnde saklanýan şahsy däl ynam maglumaty. Off-chain: gapjykda/guramada saklanýan amal maglumaty we resminamalar. Häzir Tamga-da zynjyr ýok; açyk ynam maglumaty gol çekilen ynam sanawlarynda." },
        ],
      },
      {
        title: "Tor we standartlar",
        terms: [
          { term: "Rugsatly (permissioned) tor", def: "Barlaýjylaryň (validator) belli we ynamly bolan blokçeýn tory. Tamga-nyň meýilleşdirýän kitaby şeýledir." },
          { term: "Consensus", def: "Tordaky node-laryň indiki blogyň mazmunynda ylalaşyk mehanizmi. Tamga QBFT (Byzantine Fault Tolerance maşgalasy) ulanýar." },
          { term: "Hyperledger Besu", def: "Tamga-nyň geljekki kitaby üçin saýlan açyk çeşmeli, EVM laýyk müşderisi (azyndan iki garaşsyz operator goşulanda). Ýewropanyň EBSI infrastrukturasy bilen şol bir tehnologiýa maşgalasy." },
          { term: "eIDAS 2.0", def: "ÝB-niň elektron şahsyýet we ynam hyzmatlary çarçuwasy; her agza döwlete sanly şahsyýet gapjygy hökmanylygyny getirýär." },
          { term: "EUDI Wallet", def: "European Digital Identity Wallet — ÝB raýatynyň sanly şahsyýet gapjygy (programma gatlagy)." },
          { term: "EBSI", def: "European Blockchain Services Infrastructure — ÝB-niň guramalar arasy ynam infrastrukturasy (infrastruktura gatlagy). Tamga-nyň ýerleşdiriş garşylygy." },
        ],
      },
      {
        title: "Ösen arhitektura",
        terms: [
          { term: "Root Identity (Kök Şahsyýet)", def: "Döwletiň beren, hakyky adam bilen baglanyşygy saklaýan ýeke-täk şahsyýet ýazgysy. Diňe issuer + guardian eşigi girip bilýär." },
          { term: "Pseudonym", def: "Kök şahsyýetden alnan, her programma üçin aýry we biri-birine baglanyp bolmaýan lakam şahsyýet. Programmalar arasy profillemäni öňleýär." },
          { term: "Unlinkability", def: "Baglanyp bolmazlyk. Şol bir adamyň dürli programmalardaky şahsyýetleriniň matematik taýdan baglanyşdyrylyp bilinmezligi." },
          { term: "HD türetme (BIP32/SLIP-0010)", def: "Ýerarhik deterministik açar türetmesi. Ýeke seed-den, durnukly ýollar bilen çäksiz we baglanyşyksyz çaga açar öndürmek usuly." },
          { term: "BIP39 mnemonic", def: "24 sözlük dikeldiş sözlemi; bir seed-e öwrülýär (PBKDF2-HMAC-SHA512). Ulanyjynyň ähli açarlarynyň çeşmesi." },
          { term: "Escrow (baglanyşyk ýazgysy)", def: "Pseudonym-ler bilen kök şahsyýetiň arasyndaky baglanyşygy saklaýan, eşik şifrlemesi bilen goralýan ýazgy. Diňe ygtyýar bilen açylýar." },
          { term: "Threshold encryption", def: "Eşik şifrlemesi. Açmak ygtyýarynyň paýlara bölünip diňe ýeterlik sanly (K-of-N) paý bir ýere gelende ulanylyp bilinýän model." },
          { term: "Paýlanan Açar Öndürmek (DKG)", def: "Guardian-laryň umumy açary hiç bir tarap ýeke özi saklamaz ýaly bilelikde öndürýän protokoly; açar asla gaýtadan gurulmaýar — diňe belli bir şifr ýeter san tarapyndan açylýar (threshold ElGamal)." },
          { term: "Guardian", def: "Döwlet başyna kurumsal bäşligiň biri (kazyýet, maglumat-goragy edarasy, ilat/şahsyýet edarasy, ombudsman, parlament-bellenen agza); her biri bir eşik paýyny saklaýar. Açmak üçin 3-of-5 ýeter san we azyndan bir ýerine ýetiriş-daşy tassyklama gerek." },
          { term: "Envelope encryption", def: "Konwert şifrlemesi. Maglumaty DEK bilen şifrläp DEK-i KEK bilen dolamak; serwer KEK-i görmeýändigi üçin mazmuny okap bilmeýär." },
          { term: "DEK / KEK", def: "Data Encryption Key / Key Encryption Key. Konwert şifrlemesinde maglumaty şifrleýän we şol açary dolaýan iki gatlakly açar." },
          { term: "Token Status List", def: "Tamga-nyň ulanýan IETF ýatyrylyş sanawy: her resminama nusgasy üçin tötänleýin orunda iki bit (güýjünde, ýatyrylan, togtadylan); kesgitli aralykda gol çekilip çap edilýär." },
          { term: "Challenge-response (FIDO2/WebAuthn)", def: "Parol ugratman, serweriň ugradýan tötän bahasyny gizlin açar bilen gol çekip açyk açar bilen barladýan şahsyýet barlagy." },
          { term: "Secure Enclave / StrongBox", def: "iOS we Android-de açarlaryň/PIN-leriň apparat taýdan izolirlenip saklanýan howpsuz zolagy." },
          { term: "ICAO 9303", def: "E-pasport/e-şahsyýet NFC çip barlag standarty. Ikinji tapgyr dikeldişde ýüz deňeşdirme bilen bilelikde ulanylýar." },
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale as Locale] ?? CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = CONTENT[locale as Locale] ?? CONTENT.en;
  return (
    <DocArticle href="/docs/glossary" eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
      <div className="not-prose space-y-10">
        {c.groups.map((group) => (
          <section key={group.title}>
            <p className="mono-label mb-4">{group.title}</p>
            <dl className="space-y-4">
              {group.terms.map((t) => (
                <div
                  key={t.term}
                  className="rounded-lg border border-border bg-surface/40 p-5"
                >
                  <dt className="font-serif text-lg font-semibold text-foreground">
                    {t.term}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {t.def}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </DocArticle>
  );
}

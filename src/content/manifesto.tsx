import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

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
      "The Tamga Network Manifesto — the modern counterpart of the ancient seal. A call to turn digital trust into a shared, sovereign and interoperable infrastructure.",
  },
  mastheadSub: "Manifesto · v1.0 · 2026-10-03",
  eyebrow: "Manifesto",
  title: "We are building the modern counterpart of the ancient seal",
  lead: (
    <>
      The world is changing how it establishes trust. Europe made it mandatory
      by regulation; a standard is forming. The question is no longer “will this
      transformation happen” —{" "}
      <span className="text-primary">“who will be a producer in it.”</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Trust is not a product, it is an infrastructure",
      body: (
        <>
          Every application should not have to re-verify identity, authority and
          documents. Just as electricity and the internet are shared
          infrastructure, digital trust should be a shared infrastructure too. We
          are building that infrastructure.
        </>
      ),
    },
    {
      n: "02",
      title: "Data stays in the hands of its owner",
      body: (
        <>
          You should not have to hand over a copy of your document to prove your
          identity. Data stays under the user’s control; only the necessary proof
          is shared. You should be able to prove you are “over 18” without giving
          your birth date. This is not a luxury, it is a <strong>right</strong>.
        </>
      ),
    },
    {
      n: "03",
      title: "Verification must happen without going back to the source",
      body: (
        <>
          A document’s authenticity should rely on the certainty of mathematics,
          not on how convincing a photocopy looks. A cryptographic signature
          proves who a document came from and that it was not altered, without
          asking the source at all.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain is a means, not an end",
      body: (
        <>
          We are not building a new blockchain network. Today trust rests on signed,
          public trust lists; a shared ledger is added only when independent parties run
          it together.{" "}
          <strong>Personal data is never written to either.</strong> The user never
          sees any of it; they only use their identity.
        </>
      ),
    },
    {
      n: "05",
      title: "Open standards, vendor independence",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 and selective disclosure — the EUDI profiles. We are
          committed to the open standards the world agrees on, not to a specific
          company’s product. No lock-in; interoperability is essential.
        </>
      ),
    },
    {
      n: "06",
      title: "Sovereignty and compatibility are possible at once",
      body: (
        <>
          As the world moves to the portable proof model, we have two paths:
          import this transformation from outside, or build our own sovereign,
          open-standards-compatible infrastructure. We choose the second —{" "}
          <strong>compatible yet independent.</strong> The same standards, our own
          network.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga is a shared tradition of the seal",
      body: (
        <>
          <em>Tamga</em> was the ancient seal of the Turkic tribes — a mark that
          proved ownership, belonging and authority. A verifiable digital
          credential is its modern counterpart. Sharing a common language,
          culture and history, the{" "}
          <strong>peoples of the Turkic world</strong> are a natural soil
          for a shared digital foundation of trust.
        </>
      ),
    },
    {
      n: "08",
      title: "Not a center, but a mesh",
      body: (
        <>
          Not a single authority, but a mesh of interoperable, independent
          networks — a <strong>Trust Mesh</strong>. Each country keeps its own
          trust network, institutions and governance while connecting to others
          through shared standards.
        </>
      ),
    },
  ],
  closing: (
    <>
      We aim to turn digital trust from a problem that each application solves
      anew into a shared, sovereign and interoperable infrastructure service for
      Türkiye and the Turkic world.
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
      "Tamga Network Manifestosu — kadim mührün çağdaş karşılığı. Dijital güveni ortak, egemen ve birlikte çalışabilir bir altyapıya dönüştürme çağrısı.",
  },
  mastheadSub: "Manifesto · v1.0 · 2026-10-03",
  eyebrow: "Manifesto",
  title: "Kadim mührün çağdaş karşılığını inşa ediyoruz",
  lead: (
    <>
      Dünya, güveni kurma biçimini değiştiriyor. Avrupa bunu düzenlemeyle zorunlu
      kıldı; standart oluşuyor. Soru artık “bu dönüşüm olacak mı” değil —{" "}
      <span className="text-primary">“bu dönüşümde kim üretici olacak.”</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Güven bir ürün değil, bir altyapıdır",
      body: (
        <>
          Her uygulama kimliği, yetkiyi ve belgeyi yeniden doğrulamak zorunda
          kalmamalı. Nasıl elektrik ve internet ortak bir altyapıysa, dijital
          güven de ortak bir altyapı olmalıdır. Biz bu altyapıyı inşa ediyoruz.
        </>
      ),
    },
    {
      n: "02",
      title: "Veri, sahibinin elinde kalır",
      body: (
        <>
          Kimliğini kanıtlamak için belgenin kopyasını teslim etmek zorunda
          kalmamalısın. Veri kullanıcının kontrolünde kalır; yalnızca gerekli olan
          kanıt paylaşılır. Doğum tarihini vermeden “18 yaş üstü” olduğunu
          kanıtlayabilmelisin. Bu bir lüks değil, <strong>hak</strong>tır.
        </>
      ),
    },
    {
      n: "03",
      title: "Doğrulama kaynağa gitmeden yapılmalı",
      body: (
        <>
          Bir belgenin gerçekliği fotokopinin ikna ediciliğine değil, matematiğin
          kesinliğine dayanmalı. Kriptografik imza, belgenin kimden geldiğini ve
          değiştirilmediğini kaynağa hiç sormadan kanıtlar.
        </>
      ),
    },
    {
      n: "04",
      title: "Blockchain araçtır, amaç değildir",
      body: (
        <>
          Biz yeni bir blockchain ağı kurmuyoruz. Bugün güven, imzalı ve herkese açık
          güven listelerine dayanır; ortak bir defter ancak bağımsız taraflar onu birlikte
          işlettiğinde eklenir.{" "}
          <strong>Kişisel veri ikisine de asla yazılmaz.</strong> Kullanıcı bunların
          hiçbirini görmez; yalnızca kimliğini kullanır.
        </>
      ),
    },
    {
      n: "05",
      title: "Açık standartlar, üretici bağımsızlığı",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 ve seçici paylaşım — EUDI profilleri. Belirli bir
          şirketin ürününe değil, dünyanın üzerinde uzlaştığı açık standartlara
          bağlıyız. Kilitlenme yok; birlikte çalışabilirlik esas.
        </>
      ),
    },
    {
      n: "06",
      title: "Egemenlik ve uyum aynı anda mümkündür",
      body: (
        <>
          Dünya taşınabilir kanıt modeline geçerken önümüzde iki yol var: bu
          dönüşümü dışarıdan ithal etmek ya da kendi egemen, açık standartlara
          uyumlu altyapımızı inşa etmek. Biz ikinci yolu seçiyoruz —{" "}
          <strong>uyumlu ama bağımsız.</strong> Aynı standartlar, kendi ağımız.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga, ortak bir mühür geleneğidir",
      body: (
        <>
          <em>Tamga</em>, Türk boylarının kadim mührüydü — mülkiyeti, aidiyeti ve
          yetkiyi doğrulayan işaret. Doğrulanabilir dijital belge bunun çağdaş
          karşılığıdır. Ortak dil, kültür ve tarih mirasını paylaşan{" "}
          <strong>Türk dünyasının halkları</strong>, ortak bir dijital
          güven zemini için doğal bir topraktır.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez değil, örgü",
      body: (
        <>
          Tek bir otorite değil, birlikte çalışabilir bağımsız ağlardan oluşan bir
          örgü — <strong>Trust Mesh</strong>. Her ülke kendi güven ağını,
          kurumlarını ve yönetişimini korurken ortak standartlar üzerinden diğer
          ağlarla güven ilişkisi kurar.
        </>
      ),
    },
  ],
  closing: (
    <>
      Dijital güveni tek tek uygulamaların yeniden çözdüğü bir problem olmaktan
      çıkarıp, Türkiye’nin ve Türk dünyasının ortak, egemen ve birlikte
      çalışabilir bir altyapı hizmetine dönüştürmeyi hedefliyoruz.
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
      "Tamga Network Manifesti — gadymy möhüriň häzirki zaman garşylygy. Sanly ynamy umumy, özygtyýarly we bilelikde işleýän infrastruktura öwürmäge çagyryş.",
  },
  mastheadSub: "Manifest · v1.0 · 2026-10-03",
  eyebrow: "Manifest",
  title: "Gadymy möhüriň häzirki zaman garşylygyny gurýarys",
  lead: (
    <>
      Dünýä ynam gurmagyň usulyny üýtgedýär. Ýewropa muny düzgünnama bilen
      hökmany etdi; standart emele gelýär. Sowal indi “bu özgeriş boljakmy” däl —{" "}
      <span className="text-primary">“bu özgerişde kim öndüriji bolar.”</span>
    </>
  ),
  theses: [
    {
      n: "01",
      title: "Ynam önüm däl, infrastrukturadyr",
      body: (
        <>
          Her programma şahsyýeti, ygtyýary we resminamany täzeden barlamaly
          bolmaly däl. Elektrik we internet umumy infrastruktura bolşy ýaly, sanly
          ynam hem umumy infrastruktura bolmaly. Biz şol infrastrukturany gurýarys.
        </>
      ),
    },
    {
      n: "02",
      title: "Maglumat eýesiniň elinde galýar",
      body: (
        <>
          Şahsyýetiňi subut etmek üçin resminamaňyň nusgasyny tabşyrmaly bolmaly
          däl. Maglumat ulanyjynyň gözegçiliginde galýar; diňe zerur subutnama
          paýlaşylýar. Doglan seneňi bermän “18 ýaşdan uly” diýip subut edip
          bilmeli. Bu şaýlyk däl, <strong>hukuk</strong>dyr.
        </>
      ),
    },
    {
      n: "03",
      title: "Barlag çeşmä ýüz tutman edilmeli",
      body: (
        <>
          Resminamanyň hakykylygy nusganyň ynandyryjylygyna däl, matematikanyň
          takyklygyna daýanmaly. Kriptografik gol, resminamanyň kimden gelendigini
          we üýtgedilmändigini çeşmä asla soraman subut edýär.
        </>
      ),
    },
    {
      n: "04",
      title: "Blokçeýn serişde, maksat däl",
      body: (
        <>
          Biz täze blokçeýn tory gurmaýarys. Häzir ynam gol çekilen, açyk ynam
          sanawlaryna daýanýar; umumy kitap diňe garaşsyz taraplar ony bilelikde
          dolandyranda goşulýar.{" "}
          <strong>Şahsy maglumat hiç birine ýazylmaýar.</strong> Ulanyjy bularyň hiç
          birini görmeýär; diňe şahsyýetini ulanýar.
        </>
      ),
    },
    {
      n: "05",
      title: "Açyk standartlar, öndürijiden garaşsyzlyk",
      body: (
        <>
          SD-JWT VC, ISO mdoc, OpenID4VC, X.509 we saýlap paýlaşmak — EUDI profilleri. Belli bir
          kompaniýanyň önümine däl, dünýäniň ylalaşan açyk standartlaryna
          ygrarlydyrys. Baglanyşyk ýok; bilelikde işlemek esasdyr.
        </>
      ),
    },
    {
      n: "06",
      title: "Özygtyýarlyk we laýyklyk bir wagtda mümkün",
      body: (
        <>
          Dünýä göçme subutnama modeline geçende öňümizde iki ýol bar: bu özgerişi
          daşardan getirmek ýa-da öz özygtyýarly, açyk standartlara laýyk
          infrastrukturamyzy gurmak. Biz ikinji ýoly saýlaýarys —{" "}
          <strong>laýyk ýöne garaşsyz.</strong> Şol bir standartlar, öz torumyz.
        </>
      ),
    },
    {
      n: "07",
      title: "Tamga umumy möhür däbidir",
      body: (
        <>
          <em>Tamga</em> türki taýpalaryň gadymy möhüridi — eýeçiligi, degişliligi
          we ygtyýary tassyklaýan belgi. Barlanyp bilinýän sanly resminama şonuň
          häzirki zaman garşylygydyr. Umumy dili, medeniýeti we taryhy paýlaşýan{" "}
          <strong>türki dünýäsiniň halklary</strong>, umumy sanly ynam
          binýady üçin tebigy topragydyr.
        </>
      ),
    },
    {
      n: "08",
      title: "Merkez däl, örüm",
      body: (
        <>
          Ýeke-täk häkimiýet däl, bilelikde işleýän garaşsyz torlardan ybarat
          örüm — <strong>Trust Mesh</strong>. Her ýurt öz ynam toruny,
          edaralaryny we dolandyryşyny saklap, umumy standartlar arkaly beýleki
          torlar bilen ynam gatnaşygyny gurýar.
        </>
      ),
    },
  ],
  closing: (
    <>
      Sanly ynamy her programmanyň täzeden çözýän meselesinden çykaryp,
      Türkiýäniň we türki dünýäsiniň umumy, özygtyýarly we bilelikde işleýän
      infrastruktura hyzmatyna öwürmegi maksat edinýäris.
    </>
  ),
  slogan: "Building Trust Infrastructure for the Digital World.",
  linkWhitepaper: "Whitepaper-i oka →",
  linkDocs: "Düşünjeleri başdan öwren →",
};

const content: Record<Locale, ManifestoContent> = { en, tr, tk };

export function getManifestoContent(locale: string): ManifestoContent {
  return content[locale as Locale] ?? en;
}

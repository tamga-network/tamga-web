import { ExternalLink } from "@/components/external-link";
import { Callout, Figure, Term } from "@/components/learn/prose";
import type { LearnPage } from "./types";

/* Bölüm 5 — Güven altyapısı: güven listeleri, federasyon, blockchain nedir, neden henüz blockchain yok. */

/* ------------------------------------------------------------------ küçük şemalar (token renkleri) */

type Labels = { lotl: string; tr: string; az: string; eu: string; ext: string; pin: string; own: string };

/** Federasyon: Tamga'nın listelerin listesi ülke listelerini ve dış (AB) listeleri gösterir; her liste kendi imzacısında. */
function FederationDiagram({ l }: { l: Labels }) {
  const box = "fill-[var(--background-elevated)] stroke-[var(--border-strong)]";
  const text = "fill-[var(--foreground)] font-mono";
  const sub = "fill-[var(--foreground-muted)]";
  return (
    <svg viewBox="0 0 640 300" role="img" aria-labelledby="fed-t" className="h-auto w-full">
      <title id="fed-t">{l.lotl}</title>
      <rect x="220" y="20" width="200" height="56" rx="12" className="fill-[var(--primary)] stroke-none" />
      <text x="320" y="54" textAnchor="middle" className="fill-white font-mono" fontSize="14">
        {l.lotl}
      </text>
      {[
        { x: 30, label: l.tr, note: l.own },
        { x: 240, label: l.az, note: l.own },
        { x: 450, label: l.eu, note: l.ext },
      ].map((n, i) => (
        <g key={i}>
          <path
            d={`M320 76 C320 120 ${n.x + 80} 130 ${n.x + 80} 176`}
            className="fill-none stroke-[var(--primary)]"
            strokeWidth="2"
            strokeDasharray={i === 2 ? "6 5" : undefined}
          />
          <rect x={n.x} y="176" width="160" height="70" rx="12" strokeWidth="1.5" className={box} />
          <text x={n.x + 80} y="206" textAnchor="middle" className={text} fontSize="13">
            {n.label}
          </text>
          <text x={n.x + 80} y="228" textAnchor="middle" className={sub} fontSize="11">
            {n.note}
          </text>
        </g>
      ))}
      <text x="320" y="282" textAnchor="middle" className={sub} fontSize="11">
        {l.pin}
      </text>
    </svg>
  );
}

type LedgerLabels = { a: string; b: string; c: string; same: string; block: string };

/** Ortak defter: bağımsız birkaç taraf aynı blok zincirini tutar. */
function LedgerDiagram({ l }: { l: LedgerLabels }) {
  const blocks = [0, 1, 2, 3];
  return (
    <svg viewBox="0 0 640 260" role="img" aria-labelledby="led-t" className="h-auto w-full">
      <title id="led-t">{l.same}</title>
      {[l.a, l.b, l.c].map((who, row) => (
        <g key={row} transform={`translate(0 ${20 + row * 74})`}>
          <text x="20" y="34" className="fill-[var(--foreground)] font-mono" fontSize="12">
            {who}
          </text>
          {blocks.map((b) => (
            <g key={b} transform={`translate(${170 + b * 112} 8)`}>
              <rect
                width="88"
                height="44"
                rx="8"
                strokeWidth="1.5"
                className="fill-[var(--background-elevated)] stroke-[var(--primary)]"
              />
              <text x="44" y="27" textAnchor="middle" className="fill-[var(--foreground-muted)] font-mono" fontSize="11">
                {l.block} {b + 1}
              </text>
              {b < 3 ? <path d="M88 22 H112" className="stroke-[var(--primary)]" strokeWidth="2" /> : null}
            </g>
          ))}
        </g>
      ))}
      <text x="320" y="252" textAnchor="middle" className="fill-[var(--foreground-muted)]" fontSize="12">
        {l.same}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ sayfalar */

export const CHAPTER_5: LearnPage[] = [
  /* -------------------------------------------------------------- 5.1 Güven listeleri */
  {
    slug: "trust-lists",
    chapter: 5,
    order: 1,
    minutes: 6,
    title: { tr: "Güven listeleri", en: "Trust lists", tk: "Ynam sanawlary", az: "Etibar siyahıları" },
    summary: {
      tr: "Kime güvenileceğini kim söyler? Listelerin listesi, ülke listesi, imza, sürüm ve tazelik.",
      en: "Who says whom to trust? The list of lists, national lists, signatures, versions and freshness.",
      tk: "Kime ynanmalydygyny kim aýdýar? Sanawlaryň sanawy, ýurt sanawy, gol, wersiýa we täzelik.",
      az: "Kimə etibar edilməli olduğunu kim deyir? Siyahıların siyahısı, milli siyahılar, imzalar, versiyalar və aktuallıq.",
    },
    diagram: "trust-chain",
    keyPoints: [
      {
        tr: "Bir imza tek başına yetmez; imzayı atan kurumun gerçekten yetkili olduğunu söyleyen imzalı bir liste gerekir.",
        en: "A signature alone is not enough; you also need a signed list saying the signer really is an authorised institution.",
        tk: "Diňe gol ýeterlik däl; gol çeken guramanyň hakykatdanam ygtyýarlydygyny aýdýan gollanan sanaw gerek.",
        az: "Təkcə imza kifayət deyil; imzalayanın həqiqətən səlahiyyətli qurum olduğunu bildirən imzalı siyahı da lazımdır.",
      },
      {
        tr: "Listelerin listesi ülke listelerini gösterir; her ülke listesi o ülkenin kurumlarını, doğrulayıcılarını ve cüzdan sağlayıcılarını sayar.",
        en: "The list of lists points to national lists; each national list names that country's institutions, verifiers and wallet providers.",
        tk: "Sanawlaryň sanawy ýurt sanawlaryny görkezýär; her ýurt sanawy şol ýurduň guramalaryny, barlaýjylaryny we gapjyk üpjün edijilerini sanaýar.",
        az: "Siyahıların siyahısı milli siyahılara istinad edir; hər milli siyahı həmin ölkənin qurumlarını, yoxlayan tərəflərini və cüzdan provayderlərini sadalayır.",
      },
      {
        tr: "Listeler sürümlüdür ve bir öncekine bağlıdır; bayat ya da değiştirilmiş bir liste fark edilir ve doğrulama \"şu an karar verilemedi\" der.",
        en: "Lists are versioned and chained to the previous one; a stale or altered list is noticed, and verification answers \"cannot decide right now\".",
        tk: "Sanawlar wersiýaly we öňküsine baglanyşykly; köne ýa-da üýtgedilen sanaw duýulýar we barlag \"häzir karar berip bolmaýar\" diýýär.",
        az: "Siyahılar versiyalanır və əvvəlkinə zəncirlə bağlanır; köhnəlmiş və ya dəyişdirilmiş siyahı aşkar edilir və yoxlama \"hazırda qərar vermək mümkün deyil\" cavabını verir.",
      },
    ],
    deeper: [
      { label: { tr: "Kavram: güven listeleri", en: "Concept: trust lists", tk: "Düşünje: ynam sanawlary", az: "Anlayış: etibar siyahıları" }, href: "/concepts/trust-lists", kind: "docs" },
      { label: { tr: "Güven listelerini okumak", en: "Reading trust lists", tk: "Ynam sanawlaryny okamak", az: "Etibar siyahılarının oxunması" }, href: "/guides/read-trust-lists", kind: "docs" },
      { label: { tr: "Şartname: güven listeleri", en: "Specification: trust lists", tk: "Spesifikasiýa: ynam sanawlary", az: "Spesifikasiya: etibar siyahıları" }, href: "/specifications/trust-lists", kind: "docs" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework", az: "Trust Framework" }, href: "trust-framework", kind: "arf" },
    ],
    body: {
      tr: (
        <>
          <p>
            Önceki bölümde bir belgenin <Term tip="Belgeyi verenin özel anahtarıyla atılan, sonradan değiştirilemeyen dijital işaret." en="digital signature">dijital imza</Term> ile
            korunduğunu gördük. İmza bize iki şey söyler: belge değişmemiştir ve bir anahtar tarafından imzalanmıştır. Ama asıl soru
            açıkta kalır: <strong>Bu anahtar kime ait ve o kurum bu belgeyi vermeye yetkili mi?</strong>
          </p>
          <p>
            Almatı'daki bir işveren, Taşkent'teki bir üniversitenin imzasını taşıyan bir belge görüyor. Üniversitenin adını biliyor,
            ama anahtarını tanımıyor. Herkes bir anahtar üretip altına "Örnek Üniversite" yazabilir. İşte güven listeleri bu boşluğu
            doldurur.
          </p>

          <h2>Güven listesi nedir?</h2>
          <p>
            <Term tip="Hangi kurumların, doğrulayıcıların ve cüzdan sağlayıcılarının güvenilir olduğunu sayan, imzalı ve herkese açık liste." en="trust list">Güven listesi</Term>,
            bir ülkede kimlerin belge vermeye, belge istemeye ve cüzdan sunmaya yetkili olduğunu sayan imzalı bir kayıttır. Her
            satırda kurumun adı, resmî kimlik numarası, sertifikası ve hangi belge türlerini verebileceği yazar. Liste herkese açıktır;
            gizli bir veritabanı değildir.
          </p>
          <p>
            Doğrulayan taraf belgeyi aldığında listeye bakar: "Bu imzayı atan anahtar, listede bu belge türünü vermeye yetkili bir
            kuruma mı ait?" Cevap evetse belgeye güvenilir. Kurumu aramaya, e-posta atmaya, haftalarca beklemeye gerek kalmaz.
          </p>

          <h2>Listelerin listesi</h2>
          <p>
            Her ülkenin kendi listesi vardır, çünkü hangi kurumların güvenilir olduğuna o ülke karar verir. Ama bir doğrulayıcı onlarca
            ülkenin listesini tek tek tanıyamaz. Bunun için bir üst katman vardır:{" "}
            <Term tip="Ülke listelerinin nerede durduğunu ve hangi anahtarla imzalandığını gösteren üst liste." en="List of Trusted Lists (LOTL)">listelerin listesi</Term>.
            Bu liste ülke listelerinin adresini ve imzacısını gösterir. Doğrulayıcı yalnızca tek bir kök anahtarı sabitler; geri kalan
            her şey bu zincirle bağlanır: listelerin listesi → ülke listesi → kurum sertifikası → belge.
          </p>
          <p>
            Avrupa Birliği aynı modeli yıllardır kullanıyor: AB'nin listeler listesi üye devletlerin listelerini gösterir. Tamga
            Network da aynı biçimi kullanır, böylece iki dünya aynı dili konuşur.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Bugün Türkiye listesini Tamga, devlet adına geçici işletmeci olarak yayınlıyor. Azerbaycan, Kazakistan, Kırgızistan,
              Özbekistan ve Türkmenistan için listede yer ayrılmış durumda. Bir devlet kendi listesini yayınladığında listelerin listesi
              onu gösterir; cüzdanlar ve doğrulayıcılar için yalnızca adres değişir.
            </p>
          </Callout>

          <h2>Sürüm, zincir ve tazelik</h2>
          <p>
            Bir liste değiştiğinde (yeni bir kurum eklendiğinde ya da bir kurumun yetkisi kaldırıldığında) yeni bir sürüm yayınlanır.
            Her sürüm bir öncekinin <Term tip="Verinin parmak izi: içerik bir harf bile değişse özet tamamen değişir." en="hash">özetini</Term> taşır;
            böylece sürümler bir zincir gibi birbirine bağlanır. Geçmiş silinmez. Biri eski bir listeyi geri yüklemeye ya da bir
            satırı sessizce değiştirmeye kalkarsa zincir kopar ve herkes bunu görür.
          </p>
          <p>
            Listeler bir son geçerlilik tarihi de taşır. Değişiklik olmasa bile en geç 90 günde bir yeniden imzalanır; değişiklikler
            ise en geç 24 saat içinde yayınlanır. Ayrıca herkese açık bir{" "}
            <Term tip="Liste yayınlarının ve iptal listelerinin özetlerinin saat saat eklendiği, geri alınamaz kayıt." en="anchor log">çapa günlüğü</Term>{" "}
            her saat güncellenir. Doğrulayıcı elindeki liste bayatsa ya da listeye ulaşamıyorsa "geçerli" demez; "şu an karar
            verilemedi" der. Güvenli taraf budur: emin olunamayan bir belge kabul de edilmez, reddedilmiş de sayılmaz.
          </p>

          <h2>Kişisel veri listede yok</h2>
          <p>
            Güven listelerinde kurumlar vardır, kişiler yoktur. Hangi öğrencinin hangi belgeyi aldığı, kimin nerede belge gösterdiği
            listeye ya da çapa günlüğüne yazılmaz; özeti bile yazılmaz. Liste yalnızca "kim yetkili" sorusunu cevaplar.
          </p>
          <p>
            Bir sonraki sayfada, farklı ülkelerin listelerinin birbirini nasıl tanıdığına bakacağız. Canlı listeyi şimdi görmek
            istersen: <ExternalLink href="https://trust.tamga.network/">trust.tamga.network</ExternalLink>.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            In the previous chapter we saw that a credential is protected by a{" "}
            <Term tip="A mark made with the issuer's private key that cannot be changed afterwards.">digital signature</Term>. The
            signature tells us two things: the document has not changed, and some key signed it. The real question remains open:{" "}
            <strong>whose key is it, and is that institution allowed to issue this document?</strong>
          </p>
          <p>
            An employer in Almaty looks at a credential signed by a university in Tashkent. They know the university's name, but not
            its key. Anyone can create a key and write "Example University" under it. Trust lists close exactly this gap.
          </p>

          <h2>What is a trust list?</h2>
          <p>
            A <Term tip="A signed, public list naming the institutions, verifiers and wallet providers that can be trusted.">trust list</Term>{" "}
            is a signed register of who, in a country, may issue credentials, request them and offer wallets. Each entry carries the
            institution's name, its official registration number, its certificate and the credential types it may issue. The list is
            public; it is not a secret database.
          </p>
          <p>
            When a verifier receives a credential, it checks the list: "Does the key behind this signature belong to an institution
            that is listed as allowed to issue this type?" If yes, the credential can be trusted. No calls, no e-mails, no weeks of
            waiting.
          </p>

          <h2>The list of lists</h2>
          <p>
            Every country has its own list, because each country decides which of its institutions are trustworthy. But a verifier
            cannot get to know dozens of national lists one by one. So there is a layer above them: the{" "}
            <Term tip="The top-level list that says where each national list lives and which key signs it.">List of Trusted Lists (LOTL)</Term>.
            It gives the address and the signer of every national list. A verifier pins a single root key; everything else follows
            from the chain: list of lists → national list → institution certificate → credential.
          </p>
          <p>
            The European Union has used this model for years: the EU list of lists points to the member states' lists. Tamga
            Network uses the same format, so the two worlds speak the same language.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              Today Tamga publishes the Türkiye list as a provisional operator, on behalf of the state. Seats are reserved for
              Azerbaijan, Kazakhstan, Kyrgyzstan, Uzbekistan and Turkmenistan. When a state publishes its own list, the list of lists
              points to it; for wallets and verifiers only the address changes.
            </p>
          </Callout>

          <h2>Versions, chaining and freshness</h2>
          <p>
            When a list changes (an institution joins, or loses its authorisation) a new version is published. Each version carries
            the <Term tip="A fingerprint of data: change one letter and the digest changes completely.">hash</Term> of the
            previous one, so the versions form a chain. History is never deleted. If someone tried to restore an old list or quietly
            change a line, the chain would break and everyone would see it.
          </p>
          <p>
            Lists also carry an expiry date. They are re-signed at least every 90 days even when nothing changes, and changes are
            published within 24 hours. A public{" "}
            <Term tip="An append-only, public log to which the digests of list and status-list publications are added every hour.">anchor log</Term>{" "}
            is updated every hour as well. If the list a verifier holds is stale, or cannot be reached, the verifier does not say
            "valid"; it says "cannot decide right now". That is the safe side: a credential that cannot be checked is neither
            accepted nor counted as rejected.
          </p>

          <h2>No personal data on the list</h2>
          <p>
            Trust lists contain institutions, not people. Which student received which credential, or who showed a credential where,
            is never written to the list or the anchor log, not even as a digest. The list answers one question only: who is
            authorised.
          </p>
          <p>
            On the next page we look at how the lists of different countries recognise each other. To see the live list now:{" "}
            <ExternalLink href="https://trust.tamga.network/">trust.tamga.network</ExternalLink>.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Öňki bölümde resminamanyň <Term tip="Beriji guramanyň gizlin açary bilen goýlan, soň üýtgedip bolmaýan sanly bellik." en="digital signature">sanly gol</Term> bilen
            goralýandygyny gördük. Gol iki zady aýdýar: resminama üýtgemändir we ony bir açar gollapdyr. Emma esasy sorag açyk
            galýar: <strong>bu açar kime degişli we şol gurama bu resminamany bermäge ygtyýarlymy?</strong>
          </p>
          <p>
            Almatydaky iş beriji Daşkentdäki uniwersitetiň goly bilen resminama görýär. Uniwersitetiň adyny bilýär, emma açaryny
            tanamaýar. Islendik adam açar döredip, aşagyna "Mysal Uniwersitet" ýazyp biler. Ynam sanawlary şu boşlugy doldurýar.
          </p>
          <h2>Ynam sanawy näme?</h2>
          <p>
            <Term tip="Ynamly guramalary, barlaýjylary we gapjyk üpjün edijileri sanaýan gollanan, açyk sanaw." en="trust list">Ynam sanawy</Term>{" "}
            bir ýurtda kimiň resminama bermäge, soramaga we gapjyk hödürlemäge ygtyýarlydygyny sanaýan gollanan ýazgydyr. Her setirde
            guramanyň ady, resmi belgisi, sertifikaty we haýsy resminamalary berip biljekdigi ýazylýar. Sanaw açykdyr.
          </p>
          <h2>Sanawlaryň sanawy</h2>
          <p>
            Her ýurduň öz sanawy bar. Barlaýjy olaryň hemmesini aýratynlykda tanap bilmeýär, şonuň üçin ýokarky gatlak bar:{" "}
            <Term tip="Ýurt sanawlarynyň salgysyny we gol çekijisini görkezýän ýokarky sanaw." en="List of Trusted Lists (LOTL)">sanawlaryň sanawy</Term>.
            Barlaýjy diňe bir kök açary berkidýär; galan zatlar zynjyr bilen baglanýar: sanawlaryň sanawy → ýurt sanawy → gurama
            sertifikaty → resminama. Ýewropa Bileleşigi hem şu modeli ulanýar.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn operator hökmünde çap edýär. Azerbaýjan, Gazagystan,
              Gyrgyzystan, Özbegistan we Türkmenistan üçin ýer goýlupdyr. Döwlet öz sanawyny çap edende diňe salgy üýtgeýär.
            </p>
          </Callout>
          <h2>Wersiýa, zynjyr we täzelik</h2>
          <p>
            Sanaw üýtgände täze wersiýa çap edilýär; her wersiýa öňkisiniň <Term tip="Maglumatyň barmak yzy." en="hash">hash</Term>-ini
            saklaýar. Taryh pozulmaýar. Sanawlar üýtgeşiklik bolmasa-da iň giçi 90 günde täzeden gollanýar, üýtgeşiklikler 24 sagadyň
            içinde çap edilýär, açyk <Term tip="Her sagat goşulýan, yzyna alyp bolmaýan açyk ýazgy." en="anchor log">anchor log</Term>{" "}
            her sagat täzelenýär. Sanaw köne bolsa barlaýjy "dogry" diýmeýär, "häzir karar berip bolmaýar" diýýär.
          </p>
          <h2>Sanawda şahsy maglumat ýok</h2>
          <p>
            Ynam sanawlarynda guramalar bar, adamlar ýok. Kimiň haýsy resminamany alandygy sanawa ýazylmaýar. Janly sanaw:{" "}
            <ExternalLink href="https://trust.tamga.network/">trust.tamga.network</ExternalLink>.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Əvvəlki fəsildə rəqəmsal sənədin{" "}
            <Term tip="Sənədi verən qurumun şəxsi açarı ilə qoyulan, sonradan dəyişdirilə bilməyən işarə.">rəqəmsal imza</Term> ilə qorunduğunu
            gördük. İmza bizə iki şey deyir: sənəd dəyişməyib və onu hansısa açar imzalayıb. Əsas sual isə açıq qalır:{" "}
            <strong>bu açar kimə məxsusdur və həmin qurum bu sənədi verməyə səlahiyyətlidirmi?</strong>
          </p>
          <p>
            Almatıdakı bir işəgötürən Daşkənddəki universitetin imzaladığı rəqəmsal sənədə baxır. O, universitetin adını bilir, lakin
            açarını tanımır. Hər kəs açar yaradıb altına "Nümunə Universiteti" yaza bilər. Etibar siyahıları məhz bu boşluğu doldurur.
          </p>

          <h2>Etibar siyahısı nədir?</h2>
          <p>
            <Term tip="Etibar edilə bilən qurumları, yoxlayan tərəfləri və cüzdan provayderlərini sadalayan imzalı, açıq siyahı.">Etibar siyahısı</Term>{" "}
            bir ölkədə kimin rəqəmsal sənəd verə, onları tələb edə və rəqəmsal cüzdan təqdim edə biləcəyini göstərən imzalı reyestrdir.
            Hər qeyddə qurumun adı, rəsmi qeydiyyat nömrəsi, sertifikatı və verə biləcəyi sənəd növləri yer alır. Siyahı açıqdır;
            gizli verilənlər bazası deyil.
          </p>
          <p>
            Yoxlayan tərəf rəqəmsal sənədi aldıqda siyahını yoxlayır: "Bu imzanın arxasındakı açar bu növ sənədi verməyə səlahiyyətli
            kimi siyahıda göstərilən quruma məxsusdurmu?" Cavab bəli olarsa, sənədə etibar etmək olar. Nə zəng, nə e-poçt, nə də
            həftələrlə gözləmə lazımdır.
          </p>

          <h2>Siyahıların siyahısı</h2>
          <p>
            Hər ölkənin öz siyahısı var, çünki hansı qurumlarının etibarlı olduğuna hər ölkə özü qərar verir. Lakin yoxlayan tərəf
            onlarla milli siyahını bir-bir tanıya bilməz. Buna görə onların üzərində bir qat var:{" "}
            <Term tip="Hər milli siyahının harada yerləşdiyini və hansı açarla imzalandığını göstərən ən üst səviyyəli siyahı.">Etibarlı Siyahıların Siyahısı (LOTL)</Term>.
            O, hər milli siyahının ünvanını və imzalayanını göstərir. Yoxlayan tərəf yalnız bir kök açarı sabitləyir; qalan hər şey
            zəncirdən irəli gəlir: siyahıların siyahısı → milli siyahı → qurum sertifikatı → rəqəmsal sənəd.
          </p>
          <p>
            Avropa İttifaqı (Aİ) bu modeldən illərdir istifadə edir: Aİ-nin siyahıların siyahısı üzv dövlətlərin siyahılarına istinad
            edir. Tamga Network da eyni formatdan istifadə edir, beləliklə, iki dünya eyni dildə danışır.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Bu gün Türkiyə siyahısını Tamga dövlət adından müvəqqəti operator kimi dərc edir. Azərbaycan, Qazaxıstan, Qırğızıstan,
              Özbəkistan və Türkmənistan üçün yerlər ayrılıb. Dövlət öz siyahısını dərc etdikdə siyahıların siyahısı ona istinad edir;
              rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan dəyişir.
            </p>
          </Callout>

          <h2>Versiyalar, zəncir və aktuallıq</h2>
          <p>
            Siyahı dəyişdikdə (qurum qoşulduqda və ya səlahiyyətini itirdikdə) yeni versiya dərc edilir. Hər versiya əvvəlkinin{" "}
            <Term tip="Verilənlərin barmaq izi: bir hərfi dəyişsəniz, həş tamamilə dəyişir.">həş</Term> dəyərini daşıyır, beləliklə,
            versiyalar zəncir əmələ gətirir. Tarixçə heç vaxt silinmir. Kimsə köhnə siyahını bərpa etməyə və ya bir sətri gizlicə
            dəyişməyə cəhd etsə, zəncir qırılar və bunu hamı görər.
          </p>
          <p>
            Siyahıların həmçinin etibarlılıq müddəti var. Heç nə dəyişməsə belə, onlar ən azı 90 gündə bir yenidən imzalanır,
            dəyişikliklər isə 24 saat ərzində dərc edilir. Açıq{" "}
            <Term tip="Siyahı və status siyahısı dərclərinin həşlərinin hər saat əlavə edildiyi, yalnız əlavə etməyə imkan verən açıq jurnal.">lövbər jurnalı</Term>{" "}
            da hər saat yenilənir. Yoxlayan tərəfin əlindəki siyahı köhnəlibsə və ya ona çatmaq mümkün deyilsə, yoxlayan tərəf
            "etibarlıdır" demir; "hazırda qərar vermək mümkün deyil" deyir. Təhlükəsiz tərəf budur: yoxlanıla bilməyən rəqəmsal sənəd
            nə qəbul edilir, nə də rədd edilmiş sayılır.
          </p>

          <h2>Siyahıda fərdi məlumatlar yoxdur</h2>
          <p>
            Etibar siyahılarında insanlar deyil, qurumlar var. Hansı tələbənin hansı rəqəmsal sənədi aldığı və ya kimin harada sənəd
            təqdim etdiyi siyahıya və ya lövbər jurnalına heç vaxt yazılmır, hətta həş şəklində belə. Siyahı yalnız bir suala cavab
            verir: kim səlahiyyətlidir.
          </p>
          <p>
            Növbəti səhifədə müxtəlif ölkələrin siyahılarının bir-birini necə tanıdığına baxacağıq. Canlı siyahını indi görmək üçün:{" "}
            <ExternalLink href="https://trust.tamga.network/">trust.tamga.network</ExternalLink>.
          </p>
        </>
      ),
    },
  },

  /* -------------------------------------------------------------- 5.2 Federasyon */
  {
    slug: "federation",
    chapter: 5,
    order: 2,
    minutes: 5,
    title: { tr: "Federasyon", en: "Federation", tk: "Federasiýa", az: "Federasiya" },
    summary: {
      tr: "Ülkeler birbirinin belgelerini nasıl tanır ve Avrupa'nın listeleriyle köprü nasıl kurulur.",
      en: "How countries recognise each other's credentials, and how the bridge to Europe's lists works.",
      tk: "Ýurtlar biri-biriniň resminamalaryny nädip ykrar edýär we Ýewropanyň sanawlary bilen köpri nädip gurulýar.",
      az: "Ölkələr bir-birinin rəqəmsal sənədlərini necə tanıyır və Avropanın siyahıları ilə körpü necə işləyir.",
    },
    keyPoints: [
      {
        tr: "Federasyon, her ülkenin kendi listesinin sahibi olarak kalıp diğer listeleri tanıyabilmesidir; merkezi bir kayıt yoktur.",
        en: "Federation means each country stays the owner of its own list while being able to recognise the others; there is no central register.",
        tk: "Federasiýa her ýurduň öz sanawynyň eýesi bolup galyp, beýlekileri ykrar edip bilmegidir; merkezi ýazgy ýok.",
        az: "Federasiya o deməkdir ki, hər ölkə öz siyahısının sahibi olaraq qalır və eyni zamanda digərlərini tanıya bilir; mərkəzi reyestr yoxdur.",
      },
      {
        tr: "Dış bir liste, listelerin listesinde adresi, sabitlenmiş imzacısı ve kapsamı (hangi roller, hangi belge türleri) ile gösterilir.",
        en: "An external list appears in the list of lists with its address, a pinned signer and a scope (which roles, which credential types).",
        tk: "Daşarky sanaw sanawlaryň sanawynda salgysy, berkidilen gol çekijisi we gerimi bilen görkezilýär.",
        az: "Xarici siyahı siyahıların siyahısında ünvanı, sabitlənmiş imzalayanı və əhatə dairəsi (hansı rollar, hansı sənəd növləri) ilə göstərilir.",
      },
      {
        tr: "Bir dış liste bayatlarsa yalnız ona bağlı sorular \"karar verilemedi\" olur; Tamga'nın kendi listeleri etkilenmez.",
        en: "If an external list goes stale, only the questions that depend on it become \"cannot decide\"; Tamga's own lists are not affected.",
        tk: "Daşarky sanaw köne bolsa diňe oňa bagly soraglar \"karar berip bolmaýar\" bolýar; Tamganyň öz sanawlaryna täsir etmeýär.",
        az: "Xarici siyahı köhnələrsə, yalnız ondan asılı olan suallar \"qərar vermək mümkün deyil\" vəziyyətinə düşür; Tamga-nın öz siyahılarına təsir etmir.",
      },
    ],
    deeper: [
      { label: { tr: "Kavram: federasyon", en: "Concept: federation", tk: "Düşünje: federasiýa", az: "Anlayış: federasiya" }, href: "/concepts/federation", kind: "docs" },
      { label: { tr: "Devletler: liste yayınlamak", en: "States: publishing a list", tk: "Döwletler: sanaw çap etmek", az: "Dövlətlər: siyahının dərc edilməsi" }, href: "/guides/publish-national-list", kind: "docs" },
      { label: { tr: "Karar: güven federasyonu (ADR-0036)", en: "Decision: trust federation (ADR-0036)", tk: "Karar: ynam federasiýasy (ADR-0036)", az: "Qərar: etibar federasiyası (ADR-0036)" }, href: "/adr/0036-trust-federation-external-lists", kind: "docs" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework", az: "Trust Framework" }, href: "trust-framework", kind: "arf" },
    ],
    body: {
      tr: (
        <>
          <p>
            Güven listeleri bir ülkenin içinde kime güvenileceğini söyler. Peki Bişkek'te verilmiş bir meslek belgesi İstanbul'daki bir
            hastanede nasıl tanınır? Ya da Avrupa'da verilmiş bir kimlik belgesi Bakü'deki bir otel girişinde nasıl doğrulanır? Bunun
            cevabı <Term tip="Her ülkenin kendi listesinin sahibi kaldığı, ama listelerin birbirini tanıyabildiği düzen." en="federation">federasyon</Term>.
          </p>

          <h2>Tek bir merkez değil, birbirini tanıyan listeler</h2>
          <p>
            İki yol düşünülebilir. Birincisi, bütün kurumların tek bir merkezi kayıtta toplanması. Bu kolay görünür, ama hiçbir devlet
            kendi kurumlarının kaydını başka birine bırakmak istemez. İkincisi federasyon: her ülke kendi listesini yayınlar ve
            kendisi yönetir; listeler ise birbirine işaret ederek tanınır. Tamga Network ikinci yolu seçti.
          </p>
          <p>
            Bunun anlamı şu: Kazakistan'ın listesine kimin gireceğine yalnız Kazakistan karar verir. Ağın görevi o listeyi bulup
            gösterebilmek ve onu imzalayan anahtarın gerçekten Kazakistan'a ait olduğundan emin olmaktır.
          </p>

          <Figure caption="Listelerin listesi ülke listelerini ve dış listeleri gösterir; her liste kendi sahibinin anahtarıyla imzalıdır.">
            <FederationDiagram
              l={{
                lotl: "Listelerin listesi",
                tr: "Türkiye listesi",
                az: "Ülke listesi",
                eu: "AB listeleri",
                own: "kendi imzacısı",
                ext: "dış liste · kapsamlı",
                pin: "Her imzacı listelerin listesinde sabitlenir",
              }}
            />
          </Figure>

          <h2>Dış liste nasıl tanınır?</h2>
          <p>
            Başka bir işletmecinin listesi, listelerin listesinde üç bilgiyle gösterilir:
          </p>
          <ul>
            <li>
              <strong>Adres:</strong> listenin nerede yayınlandığı.
            </li>
            <li>
              <strong>Sabitlenmiş imzacı:</strong> listeyi imzalayan anahtarın parmak izi. Başka bir anahtarla imzalanmış bir liste
              kabul edilmez.
            </li>
            <li>
              <strong>Kapsam:</strong> o listenin neyi söyleyebileceği. Örneğin "yalnız kimlik belgesi veren kurumlar" ya da
              "yalnız cüzdan sağlayıcıları". Kapsam dışındaki bir satır yok sayılır.
            </li>
          </ul>
          <p>
            Bu kayıt bir onaya dayanır; bir listenin tanınması yazılı bir kararla olur. Dış liste kendi tazeliğini taşır: bayatlarsa
            yalnız ona bağlı sorular "şu an karar verilemedi" olur. Türkiye listesi ya da diğer listeler bundan etkilenmez.
          </p>
          <p>
            Avrupa'nın listeleri ETSI'nin tanımladığı ortak bir biçimde yayınlanır. Tamga bu biçimi okuyabildiği için AB'nin kimlik
            belgesi ve sürücü belgesi gibi belge türleri de, kapsamı tanımlandığında doğrulanabilir.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Federasyon Türk dünyası için bir köprü demek. Her devlet egemenliğini korur, ama vatandaşlarının belgeleri komşu ülkelerde
              ve Avrupa'da da anlaşılır. Bir öğrenci Taşkent'ten Ankara'ya, bir mühendis Aşkabat'tan Bakü'ye gittiğinde belgesi
              sınırda takılmaz.
            </p>
          </Callout>

          <h2>Devir nasıl olur?</h2>
          <p>
            Bugün Türkiye listesini Tamga geçici olarak, devlet adına işletiyor. Devlet ya da yetkilendirdiği kurum kendi listesini
            yayınlamaya hazır olduğunda listelerin listesi yeni adresi ve yeni imzacıyı gösterir. Kurumların sertifikaları, belge
            türleri ve verilmiş belgeler değişmez; cüzdanlar ve doğrulayıcılar için yalnızca adres değişir. Ağ baştan bu devre göre
            tasarlandı.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Trust lists say whom to trust inside one country. So how is a professional licence issued in Bishkek recognised by a
            hospital in Istanbul? Or an identity credential issued in Europe checked at a hotel in Baku? The answer is{" "}
            <Term tip="An arrangement where each country keeps ownership of its own list, but the lists can recognise each other.">federation</Term>.
          </p>

          <h2>Not one centre, but lists that recognise each other</h2>
          <p>
            There are two possible approaches. The first is to gather every institution into one central register. That looks easy,
            but no state wants to hand the register of its institutions to someone else. The second is federation: each country
            publishes and runs its own list, and the lists are recognised by pointing to each other. Tamga Network chose the second.
          </p>
          <p>
            In practice: only Kazakhstan decides who goes on Kazakhstan's list. The network's job is to find that list, show it, and
            make sure the key that signs it really belongs to Kazakhstan.
          </p>

          <Figure caption="The list of lists points to national lists and to external lists; each list is signed with its owner's key.">
            <FederationDiagram
              l={{
                lotl: "List of lists",
                tr: "Türkiye list",
                az: "National list",
                eu: "EU lists",
                own: "its own signer",
                ext: "external · scoped",
                pin: "Every signer is pinned in the list of lists",
              }}
            />
          </Figure>

          <h2>How is an external list recognised?</h2>
          <p>Another operator's list appears in the list of lists with three pieces of information:</p>
          <ul>
            <li>
              <strong>Address:</strong> where the list is published.
            </li>
            <li>
              <strong>Pinned signer:</strong> the fingerprint of the key that signs it. A list signed with any other key is
              rejected.
            </li>
            <li>
              <strong>Scope:</strong> what that list is allowed to say, for example "only institutions issuing identity
              credentials" or "only wallet providers". Entries outside the scope are ignored.
            </li>
          </ul>
          <p>
            Each entry rests on an approval: recognising a list is a written decision. An external list keeps its own freshness; if it
            goes stale, only the questions that depend on it become "cannot decide right now". The Türkiye list and the other lists are
            not affected.
          </p>
          <p>
            Europe's lists are published in a common format defined by ETSI. Because Tamga can read that format, EU credential types
            such as the identity credential and the driving licence can also be verified once their scope is defined.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              For the Turkic world, federation is a bridge. Every state keeps its sovereignty, yet its citizens' credentials are
              understood in neighbouring countries and in Europe. When a student moves from Tashkent to Ankara, or an engineer from
              Ashgabat to Baku, their credentials do not get stuck at the border.
            </p>
          </Callout>

          <h2>How does a hand-over work?</h2>
          <p>
            Today Tamga runs the Türkiye list provisionally, on behalf of the state. When the state, or a body it authorises, is ready
            to publish its own list, the list of lists points to the new address and the new signer. Institution certificates,
            credential types and credentials already issued stay the same; for wallets and verifiers only the address changes. The
            network was designed for this hand-over from the start.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Ynam sanawlary bir ýurduň içinde kime ynanmalydygyny aýdýar. Bişkekde berlen hünär resminamasy Stambuldaky
            hassahanada nädip ykrar edilýär? Jogaby <Term tip="Her ýurt öz sanawynyň eýesi bolup galýar, sanawlar biri-birini ykrar edýär." en="federation">federasiýa</Term>.
          </p>
          <h2>Bir merkez däl, biri-birini ykrar edýän sanawlar</h2>
          <p>
            Her ýurt öz sanawyny özi çap edýär we dolandyrýar; sanawlar biri-birine salgylanyp ykrar edilýär. Gazagystanyň sanawyna
            kimiň girjegini diňe Gazagystan çözýär.
          </p>
          <Figure caption="Sanawlaryň sanawy ýurt we daşarky sanawlary görkezýär; her sanaw eýesiniň açary bilen gollanýar.">
            <FederationDiagram
              l={{
                lotl: "Sanawlaryň sanawy",
                tr: "Türkiýe sanawy",
                az: "Ýurt sanawy",
                eu: "ÝB sanawlary",
                own: "öz gol çekijisi",
                ext: "daşarky · gerimli",
                pin: "Her gol çekiji berkidilýär",
              }}
            />
          </Figure>
          <h2>Daşarky sanaw nädip ykrar edilýär?</h2>
          <p>
            Daşarky sanaw üç maglumat bilen görkezilýär: salgysy, berkidilen gol çekijisi we gerimi (haýsy roly, haýsy resminamalary
            aýdyp biljekdigi). Daşarky sanaw köne bolsa diňe oňa bagly soraglar täsirlenýär. Ýewropanyň sanawlary ETSI formatynda; Tamga
            ony okap bilýär.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Federasiýa türki dünýäsi üçin köpridir: her döwlet özygtyýarlylygyny saklaýar, raýatlaryň resminamalary goňşy ýurtlarda
              we Ýewropada düşnükli bolýar.
            </p>
          </Callout>
          <h2>Tabşyrmak</h2>
          <p>
            Häzir Türkiýäniň sanawyny Tamga wagtlaýyn işledýär. Döwlet öz sanawyny çap etmäge taýýar bolanda diňe salgy we gol çekiji
            üýtgeýär; berlen resminamalar üýtgemeýär.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Etibar siyahıları bir ölkə daxilində kimə etibar ediləcəyini göstərir. Bəs Bişkekdə verilmiş peşə lisenziyası İstanbuldakı
            xəstəxanada necə tanınır? Və ya Avropada verilmiş şəxsiyyət sənədi Bakıdakı oteldə necə yoxlanılır? Cavab{" "}
            <Term tip="Hər ölkənin öz siyahısının sahibi qaldığı, lakin siyahıların bir-birini tanıya bildiyi düzən.">federasiya</Term>dır.
          </p>

          <h2>Tək mərkəz deyil, bir-birini tanıyan siyahılar</h2>
          <p>
            İki mümkün yanaşma var. Birincisi bütün qurumları vahid mərkəzi reyestrdə toplamaqdır. Bu asan görünür, lakin heç bir
            dövlət öz qurumlarının reyestrini başqasına həvalə etmək istəmir. İkincisi federasiyadır: hər ölkə öz siyahısını dərc edir
            və idarə edir, siyahılar isə bir-birinə istinad etməklə tanınır. Tamga Network ikinci yolu seçib.
          </p>
          <p>
            Praktikada bu belədir: Qazaxıstanın siyahısına kimin daxil ediləcəyinə yalnız Qazaxıstan qərar verir. Şəbəkənin vəzifəsi
            həmin siyahını tapmaq, göstərmək və onu imzalayan açarın həqiqətən Qazaxıstana məxsus olduğuna əmin olmaqdır.
          </p>

          <Figure caption="Siyahıların siyahısı milli siyahılara və xarici siyahılara istinad edir; hər siyahı sahibinin açarı ilə imzalanır.">
            <FederationDiagram
              l={{
                lotl: "Siyahıların siyahısı",
                tr: "Türkiyə siyahısı",
                az: "Milli siyahı",
                eu: "Aİ siyahıları",
                own: "öz imzalayanı",
                ext: "xarici · əhatəli",
                pin: "Hər imzalayan siyahıların siyahısında sabitlənir",
              }}
            />
          </Figure>

          <h2>Xarici siyahı necə tanınır?</h2>
          <p>Başqa operatorun siyahısı siyahıların siyahısında üç məlumatla göstərilir:</p>
          <ul>
            <li>
              <strong>Ünvan:</strong> siyahının harada dərc edildiyi.
            </li>
            <li>
              <strong>Sabitlənmiş imzalayan:</strong> onu imzalayan açarın barmaq izi. Başqa açarla imzalanmış siyahı rədd
              edilir.
            </li>
            <li>
              <strong>Əhatə dairəsi:</strong> həmin siyahının nəyi bildirə biləcəyi, məsələn, "yalnız şəxsiyyət sənədləri verən
              qurumlar" və ya "yalnız cüzdan provayderləri". Əhatə dairəsindən kənar qeydlər nəzərə alınmır.
            </li>
          </ul>
          <p>
            Hər qeyd təsdiqə əsaslanır: siyahının tanınması yazılı qərardır. Xarici siyahı öz aktuallığını saxlayır; köhnələrsə, yalnız
            ondan asılı olan suallar "hazırda qərar vermək mümkün deyil" vəziyyətinə düşür. Türkiyə siyahısı və digər siyahılar bundan
            təsirlənmir.
          </p>
          <p>
            Avropanın siyahıları ETSI tərəfindən müəyyən edilmiş ümumi formatda dərc edilir. Tamga bu formatı oxuya bildiyi üçün
            şəxsiyyət sənədi və sürücülük vəsiqəsi kimi Aİ sənəd növləri də əhatə dairəsi müəyyən edildikdən sonra yoxlanıla bilər.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Türk dünyası üçün federasiya bir körpüdür. Hər dövlət öz suverenliyini qoruyur, lakin vətəndaşlarının rəqəmsal sənədləri
              qonşu ölkələrdə və Avropada da başa düşülür. Tələbə Daşkənddən Ankaraya, mühəndis isə Aşqabaddan Bakıya köçdükdə onların
              sənədləri sərhəddə ilişib qalmır.
            </p>
          </Callout>

          <h2>Təhvil necə həyata keçirilir?</h2>
          <p>
            Bu gün Türkiyə siyahısını Tamga dövlət adından müvəqqəti olaraq idarə edir. Dövlət və ya onun səlahiyyət verdiyi qurum öz
            siyahısını dərc etməyə hazır olduqda siyahıların siyahısı yeni ünvana və yeni imzalayana istinad edir. Qurum sertifikatları,
            sənəd növləri və artıq verilmiş rəqəmsal sənədlər eyni qalır; rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan
            dəyişir. Şəbəkə əvvəldən bu təhvil nəzərə alınaraq layihələndirilib.
          </p>
        </>
      ),
    },
  },

  /* -------------------------------------------------------------- 5.3 Blockchain nedir */
  {
    slug: "what-is-blockchain",
    chapter: 5,
    order: 3,
    minutes: 5,
    title: { tr: "Blockchain nedir?", en: "What is blockchain?", tk: "Blokçeýn näme?", az: "Blokçeyn nədir?" },
    summary: {
      tr: "Ortak bir defter, uzlaşı ve izinli ya da herkese açık zincirler: abartısız, sade bir anlatım.",
      en: "A shared ledger, consensus, and permissioned or public chains: a plain explanation without the hype.",
      tk: "Umumy kitap, ylalaşyk we rugsatly ýa-da açyk zynjyrlar: artykmaç sözsüz, ýönekeý düşündiriş.",
      az: "Ortaq reyestr, konsensus, icazəli və ya açıq zəncirlər: şişirtmədən sadə izah.",
    },
    keyPoints: [
      {
        tr: "Blockchain, birbirinden bağımsız birkaç tarafın aynı kaydı birlikte tuttuğu ve hiçbirinin tek başına değiştiremediği bir defterdir.",
        en: "A blockchain is a ledger that several independent parties keep together, so that none of them can change it alone.",
        tk: "Blokçeýn birnäçe garaşsyz tarapyň bilelikde saklaýan we hiç biriniň ýeke özi üýtgedip bilmeýän kitabydyr.",
        az: "Blokçeyn bir neçə müstəqil tərəfin birlikdə saxladığı reyestrdir; belə ki, onlardan heç biri onu təkbaşına dəyişə bilməz.",
      },
      {
        tr: "Herkese açık zincirlere herkes katılabilir; izinli zincirlerde yalnız tanınan işletmeciler blok üretir.",
        en: "Anyone can join a public chain; on a permissioned chain only known operators produce blocks.",
        tk: "Açyk zynjyra her kim goşulyp biler; rugsatly zynjyrda diňe tanalýan operatorlar blok döredýär.",
        az: "Açıq zəncirə hər kəs qoşula bilər; icazəli zəncirdə isə blokları yalnız tanınmış operatorlar yaradır.",
      },
      {
        tr: "Blockchain kişisel veri saklamak için uygun değildir; Tamga'da zincire yalnız kişisel olmayan güven kayıtları yazılır.",
        en: "A blockchain is not a place for personal data; in Tamga only non-personal trust records ever go on a chain.",
        tk: "Blokçeýn şahsy maglumat üçin däl; Tamgada zynjyra diňe şahsy däl ynam ýazgylary ýazylýar.",
        az: "Blokçeyn fərdi məlumatlar üçün yer deyil; Tamga-da zəncirə yalnız fərdi xarakter daşımayan etibar qeydləri yazılır.",
      },
    ],
    deeper: [
      { label: { tr: "Neden henüz blockchain yok", en: "Why no blockchain yet", tk: "Näme üçin entek blokçeýn ýok", az: "Niyə hələ blokçeyn yoxdur" }, href: "/learn/why-not-blockchain-yet", kind: "site" },
      { label: { tr: "Karar: zincirsiz başlangıç (ADR-0009)", en: "Decision: starting without a chain (ADR-0009)", tk: "Karar: zynjyrsyz başlangyç (ADR-0009)", az: "Qərar: zəncirsiz başlanğıc (ADR-0009)" }, href: "/adr/0009-phase-b-chainless-beta-and-chain-threshold", kind: "docs" },
      { label: { tr: "Mimari", en: "Architecture", tk: "Arhitektura", az: "Arxitektura" }, href: "architecture", kind: "arf" },
    ],
    body: {
      tr: (
        <>
          <p>
            "Blockchain" kelimesi çoğu insana kripto paraları hatırlatır. Oysa fikrin özü çok daha sadedir ve paradan bağımsızdır:
            birbirine tam güvenmeyen birkaç tarafın, aynı kaydı birlikte tutması.
          </p>

          <h2>Bir defter, birden çok el</h2>
          <p>
            Bir mahallede ortak bir kasa düşünün. Hesap defterini tek bir kişi tutarsa herkes ona güvenmek zorundadır; o kişi bir
            satırı silerse kimse fark etmeyebilir. Şimdi defterin birebir kopyasını beş farklı komşu tutsun. Her yeni kayıt beşinin
            de defterine aynı anda yazılsın ve bir kayıt ancak çoğunluk "evet, doğru" derse geçerli olsun. Artık tek bir kişinin
            sessizce bir şey değiştirmesi mümkün değildir.
          </p>
          <p>
            <Term tip="Birden çok bağımsız tarafın aynı kayıtları birlikte tuttuğu, geçmişi değiştirilemeyen defter." en="blockchain">Blockchain</Term>{" "}
            bunun dijital hâlidir. Kayıtlar <Term tip="Belli bir zaman aralığında toplanan kayıtlar paketi; bir öncekinin özetini taşır." en="block">bloklar</Term>{" "}
            hâlinde toplanır, her blok bir öncekinin özetini taşır ve böylece bir zincir oluşur. Eski bir bloğu değiştirmek, ondan
            sonraki bütün blokları ve diğer tarafların kopyalarını da değiştirmeyi gerektirir.
          </p>

          <Figure caption="Bağımsız taraflar aynı bloklar zincirinin birer kopyasını tutar; bir kayıt ancak uzlaşıyla eklenir.">
            <LedgerDiagram l={{ a: "İşletmeci A", b: "İşletmeci B", c: "İşletmeci C", same: "Herkeste aynı defter", block: "Blok" }} />
          </Figure>

          <h2>Uzlaşı: kim karar veriyor?</h2>
          <p>
            Yeni bir kaydın deftere girmesi için tarafların anlaşması gerekir. Buna{" "}
            <Term tip="Bağımsız tarafların bir sonraki kayıt üzerinde anlaşma yöntemi." en="consensus">uzlaşı</Term> denir. Bitcoin gibi
            herkese açık zincirlerde bu, çok enerji harcayan bir yarışla yapılır. Kurumsal kullanımda ise daha sakin yöntemler vardır:
            önceden tanınan işletmeciler sırayla blok önerir ve çoğunluk onaylar.
          </p>

          <h2>Herkese açık ve izinli zincirler</h2>
          <p>
            <strong>Herkese açık zincirlere</strong> herkes katılabilir; kimin kayıt yazdığı bilinmez, güven matematiğe ve ekonomik
            teşviklere dayanır. <strong>İzinli zincirlerde</strong> ise blok üretenler bellidir: bakanlıklar, düzenleyiciler, tanınan
            kurumlar. Kim olduklarını herkes bilir ve sorumludurlar. Devletlerin ortak bir güven kaydı tutması için ikincisi uygundur.
            Tamga'nın ileride kullanmayı planladığı defter de izinli bir defterdir.
          </p>

          <Callout kind="caution" locale="tr">
            <p>
              Blockchain kişisel veri için doğru yer değildir: zincire yazılan bir şey silinemez, oysa kişilerin verilerinin silinmesini
              isteme hakkı vardır (KVKK, GDPR). Bu yüzden Tamga'da zincire kişisel veri, belge ya da belgenin özeti hiçbir zaman yazılmaz.
              Zincire yalnız kurumların kaydı, belge türleri ve iptal listelerinin adresleri gibi kişisel olmayan güven bilgileri yazılır.
            </p>
          </Callout>

          <Callout kind="turkic" locale="tr">
            <p>
              Ortak bir defter, birden çok Türk devletinin aynı güven kaydını birlikte tutması demek. Hiçbiri tek başına listeyi
              değiştiremez; ama her biri kendi kurumlarının kaydında söz sahibi kalır.
            </p>
          </Callout>

          <h2>Ne zaman işe yarar?</h2>
          <p>
            Blockchain'in değeri, birden çok <strong>bağımsız</strong> tarafın kaydı birlikte tutmasından gelir. Tek bir taraf
            tutuyorsa zincir yalnızca daha yavaş ve daha pahalı bir veritabanıdır. Bir sonraki sayfada, Tamga'nın bu yüzden neden
            henüz zincir kullanmadığını ve zincirin ne zaman geleceğini anlatıyoruz.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            To most people "blockchain" means cryptocurrencies. The core idea is much simpler, and has nothing to do with money:
            several parties who do not fully trust each other keep the same record together.
          </p>

          <h2>One ledger, many hands</h2>
          <p>
            Picture a shared fund in a neighbourhood. If one person keeps the ledger, everyone has to trust them; if they delete a line,
            nobody may notice. Now let five neighbours each keep an identical copy. Every new entry is written into all five at once,
            and an entry only counts if a majority says "yes, that is right". No single person can now change anything quietly.
          </p>
          <p>
            A <Term tip="A ledger kept together by several independent parties, whose history cannot be changed.">blockchain</Term> is
            the digital version of this. Entries are collected into{" "}
            <Term tip="A bundle of entries collected over a period; it carries the digest of the previous block.">blocks</Term>, each
            block carries the digest of the one before, and so a chain forms. Changing an old block would mean changing every block
            after it, and every other party's copy as well.
          </p>

          <Figure caption="Independent parties each keep a copy of the same chain of blocks; an entry is added only by consensus.">
            <LedgerDiagram l={{ a: "Operator A", b: "Operator B", c: "Operator C", same: "The same ledger everywhere", block: "Block" }} />
          </Figure>

          <h2>Consensus: who decides?</h2>
          <p>
            For a new entry to go in, the parties have to agree. This is called{" "}
            <Term tip="The method by which independent parties agree on the next entry.">consensus</Term>. Public chains such as Bitcoin
            do this with an energy-hungry race. In institutional settings calmer methods are used: known operators take turns to
            propose a block and a majority approves it.
          </p>

          <h2>Public and permissioned chains</h2>
          <p>
            <strong>Public chains</strong> are open to anyone; you do not know who writes the entries, and trust rests on mathematics
            and economic incentives. On <strong>permissioned chains</strong> the block producers are known: ministries, regulators,
            recognised institutions. Everyone knows who they are, and they are accountable. For states keeping a shared trust record,
            the second fits. The ledger Tamga plans to use later is a permissioned one.
          </p>

          <Callout kind="caution" locale="en">
            <p>
              A blockchain is the wrong place for personal data: what is written cannot be erased, yet people have the right to have
              their data deleted (GDPR, KVKK). That is why in Tamga no personal data, credential or credential digest is ever written to
              a chain. Only non-personal trust information goes there: institution records, credential types and the addresses of
              status lists.
            </p>
          </Callout>

          <Callout kind="turkic" locale="en">
            <p>
              A shared ledger means several Turkic states keeping the same trust record together. None of them can change the list
              alone, yet each keeps the say over the record of its own institutions.
            </p>
          </Callout>

          <h2>When is it worth it?</h2>
          <p>
            A blockchain earns its value when several <strong>independent</strong> parties keep the record together. If only one
            party keeps it, the chain is just a slower and more expensive database. The next page explains why, for that reason, Tamga
            does not use a chain yet, and when it will.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            "Blokçeýn" köp adama kripto pullary ýatladýar. Emma pikiriň özeni has ýönekeý: biri-birine doly ynanmaýan birnäçe tarap
            şol bir ýazgyny bilelikde saklaýar.
          </p>
          <h2>Bir kitap, köp el</h2>
          <p>
            Kitaby bir adam saklasa, hemme oňa ynanmaly. Bäş goňşy birmeňzeş nusgalary saklasa, täze ýazgy diňe köpçülik razy bolanda
            goşulsa, hiç kim ýeke özi gizlin üýtgedip bilmeýär.{" "}
            <Term tip="Birnäçe garaşsyz tarapyň bilelikde saklaýan, taryhyny üýtgedip bolmaýan kitaby." en="blockchain">Blokçeýn</Term> şunuň
            sanly görnüşidir: ýazgylar bloklara ýygnalýar, her blok öňkisiniň hash-ini saklaýar.
          </p>
          <Figure caption="Garaşsyz taraplaryň her biri şol bir blok zynjyrynyň nusgasyny saklaýar.">
            <LedgerDiagram l={{ a: "Operator A", b: "Operator B", c: "Operator C", same: "Hemmede şol bir kitap", block: "Blok" }} />
          </Figure>
          <h2>Ylalaşyk we zynjyr görnüşleri</h2>
          <p>
            Täze ýazgy üçin taraplar ylalaşmaly (<Term tip="Garaşsyz taraplaryň indiki ýazgy barada ylalaşmak usuly." en="consensus">consensus</Term>).
            Açyk zynjyrlara her kim goşulyp biler; rugsatly zynjyrlarda blok döredijiler tanalýar. Döwletleriň umumy ynam ýazgysy üçin
            rugsatly zynjyr laýyk; Tamga hem geljekde şeýle kitaby meýilleşdirýär.
          </p>
          <Callout kind="caution" locale="tk">
            <p>
              Blokçeýn şahsy maglumat üçin däl: ýazylan zady pozup bolmaýar. Tamgada zynjyra şahsy maglumat ýa-da resminama hiç haçan
              ýazylmaýar.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>Umumy kitap birnäçe türki döwletiň şol bir ynam ýazgysyny bilelikde saklamagydyr.</p>
          </Callout>
          <h2>Haçan peýdaly?</h2>
          <p>
            Blokçeýniň gymmaty birnäçe garaşsyz tarapdan gelýär. Ýeke tarap saklasa, ol diňe haýal maglumat binasydyr.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Əksər insanlar üçün "blokçeyn" kriptovalyutalar deməkdir. Əsas ideya isə daha sadədir və pulla heç bir əlaqəsi yoxdur:
            bir-birinə tam etibar etməyən bir neçə tərəf eyni qeydi birlikdə saxlayır.
          </p>

          <h2>Bir reyestr, çoxlu əl</h2>
          <p>
            Məhəllədə ortaq bir fond təsəvvür edin. Hesab dəftərini bir nəfər aparırsa, hamı ona etibar etməlidir; o, bir sətri silsə,
            heç kim fərqinə varmaya bilər. İndi isə beş qonşunun hər biri eyni nüsxəni saxlasın. Hər yeni qeyd eyni anda beşinə də
            yazılır və qeyd yalnız əksəriyyət "bəli, doğrudur" dedikdə qüvvədə olur. Artıq heç kim təkbaşına nəyisə gizlicə dəyişə bilməz.
          </p>
          <p>
            <Term tip="Bir neçə müstəqil tərəfin birlikdə saxladığı, tarixçəsi dəyişdirilə bilməyən reyestr.">Blokçeyn</Term> bunun
            rəqəmsal versiyasıdır. Qeydlər{" "}
            <Term tip="Müəyyən müddət ərzində toplanan qeydlər paketi; əvvəlki blokun həşini daşıyır.">bloklarda</Term> toplanır, hər
            blok özündən əvvəlkinin həşini daşıyır və beləliklə, zəncir yaranır. Köhnə bloku dəyişmək ondan sonrakı bütün blokları,
            həmçinin digər tərəflərin nüsxələrini də dəyişməyi tələb edərdi.
          </p>

          <Figure caption="Müstəqil tərəflərin hər biri eyni bloklar zəncirinin nüsxəsini saxlayır; qeyd yalnız konsensusla əlavə edilir.">
            <LedgerDiagram l={{ a: "Operator A", b: "Operator B", c: "Operator C", same: "Hər yerdə eyni reyestr", block: "Blok" }} />
          </Figure>

          <h2>Konsensus: kim qərar verir?</h2>
          <p>
            Yeni qeydin əlavə edilməsi üçün tərəflər razılığa gəlməlidir. Buna{" "}
            <Term tip="Müstəqil tərəflərin növbəti qeyd barədə razılığa gəlmə üsulu.">konsensus</Term> deyilir. Bitcoin kimi açıq
            zəncirlər bunu çox enerji tələb edən yarışla edir. İnstitusional mühitdə daha sakit üsullardan istifadə olunur: tanınmış
            operatorlar növbə ilə blok təklif edir və əksəriyyət onu təsdiqləyir.
          </p>

          <h2>Açıq və icazəli zəncirlər</h2>
          <p>
            <strong>Açıq zəncirlər</strong> hər kəs üçün açıqdır; qeydləri kimin yazdığı bilinmir və etibar riyaziyyata və iqtisadi
            stimullara əsaslanır. <strong>İcazəli zəncirlərdə</strong> isə blok yaradanlar məlumdur: nazirliklər, tənzimləyicilər,
            tanınmış qurumlar. Onların kim olduğunu hamı bilir və onlar hesabatlıdırlar. Ortaq etibar qeydi aparan dövlətlər üçün
            ikincisi uyğundur. Tamga-nın gələcəkdə istifadə etməyi planlaşdırdığı reyestr də icazəlidir.
          </p>

          <Callout kind="caution" locale="az">
            <p>
              Blokçeyn fərdi məlumatlar üçün yanlış yerdir: yazılan silinə bilməz, halbuki insanların öz məlumatlarının silinməsini
              tələb etmək hüququ var (GDPR, KVKK). Məhz buna görə Tamga-da heç bir fərdi məlumat, rəqəmsal sənəd və ya sənədin həşi heç
              vaxt zəncirə yazılmır. Ora yalnız fərdi xarakter daşımayan etibar məlumatları yazılır: qurum qeydləri, sənəd növləri və
              status siyahılarının ünvanları.
            </p>
          </Callout>

          <Callout kind="turkic" locale="az">
            <p>
              Ortaq reyestr bir neçə türk dövlətinin eyni etibar qeydini birlikdə saxlaması deməkdir. Onlardan heç biri siyahını
              təkbaşına dəyişə bilməz, lakin hər biri öz qurumlarının qeydi üzərində söz sahibi olaraq qalır.
            </p>
          </Callout>

          <h2>Nə vaxt dəyərlidir?</h2>
          <p>
            Blokçeyn qeydi bir neçə <strong>müstəqil</strong> tərəf birlikdə saxladıqda dəyər qazanır. Əgər onu yalnız bir tərəf
            saxlayırsa, zəncir sadəcə daha yavaş və daha bahalı verilənlər bazasıdır. Növbəti səhifədə Tamga-nın məhz bu səbəbdən hələ
            zəncirdən niyə istifadə etmədiyini və nə vaxt edəcəyini izah edirik.
          </p>
        </>
      ),
    },
  },

  /* -------------------------------------------------------------- 5.4 Neden henüz blockchain yok */
  {
    slug: "why-not-blockchain-yet",
    chapter: 5,
    order: 4,
    minutes: 4,
    title: {
      tr: "Neden henüz blockchain yok?",
      en: "Why no blockchain yet?",
      tk: "Näme üçin entek blokçeýn ýok?",
      az: "Niyə hələ blokçeyn yoxdur?",
    },
    summary: {
      tr: "Bugün imzalı listeler yeter; ortak defter en az iki bağımsız işletmeci katıldığında gelir.",
      en: "Signed lists are enough today; a shared ledger comes once at least two independent operators take part.",
      tk: "Häzir gollanan sanawlar ýeterlik; umumy kitap azyndan iki garaşsyz operator goşulanda gelýär.",
      az: "Bu gün imzalı siyahılar kifayətdir; ortaq reyestr ən azı iki müstəqil operator iştirak etdikdə gələcək.",
    },
    keyPoints: [
      {
        tr: "Tek işletmecili bir zincir güven eklemez; bugün Tamga tek işletmeci olduğu için imzalı, zincirli listelerle başlıyor.",
        en: "A chain with a single operator adds no trust; since Tamga is the only operator today, it starts with signed, chained lists.",
        tk: "Ýeke operatorly zynjyr ynam goşmaýar; Tamga häzir ýeke operator bolany üçin gollanan sanawlar bilen başlaýar.",
        az: "Tək operatorlu zəncir etibarı artırmır; bu gün yeganə operator Tamga olduğu üçün o, imzalı, zəncirlə bağlanmış siyahılarla başlayır.",
      },
      {
        tr: "Ortak defter, en az iki bağımsız işletmeci yazılı olarak katıldığında başlar.",
        en: "The shared ledger starts once at least two independent operators join in writing.",
        tk: "Umumy kitap azyndan iki garaşsyz operator ýazmaça goşulanda başlaýar.",
        az: "Ortaq reyestr ən azı iki müstəqil operator yazılı şəkildə qoşulduqdan sonra başlayır.",
      },
      {
        tr: "Geçiş kimseyi etkilemez: kimlikler zincirdeki gibi hesaplanır, cüzdan ve doğrulayıcı aynı arayüzle okumaya devam eder.",
        en: "The switch affects no one: identifiers are computed as on the chain, and wallets and verifiers keep reading through the same interface.",
        tk: "Geçiş hiç kime täsir etmeýär: belgiler zynjyrdaky ýaly hasaplanýar, gapjyk we barlaýjy şol bir interfeýs bilen okaýar.",
        az: "Keçid heç kimə təsir etmir: identifikatorlar zəncirdəki kimi hesablanır, rəqəmsal cüzdanlar və yoxlayan tərəflər eyni interfeys vasitəsilə oxumağa davam edir.",
      },
    ],
    deeper: [
      { label: { tr: "Blog: neden zincirsiz başlıyoruz", en: "Blog: why we start without a blockchain", tk: "Blog: näme üçin zynjyrsyz başlaýarys", az: "Bloq: niyə blokçeynsiz başlayırıq" }, href: "/blog/why-no-blockchain-yet", kind: "site" },
      { label: { tr: "Karar: zincirsiz başlangıç ve zincir eşiği (ADR-0009)", en: "Decision: chainless start and ledger threshold (ADR-0009)", tk: "Karar: zynjyrsyz başlangyç (ADR-0009)", az: "Qərar: zəncirsiz başlanğıc və reyestr həddi (ADR-0009)" }, href: "/adr/0009-phase-b-chainless-beta-and-chain-threshold", kind: "docs" },
      { label: { tr: "Yönetişim", en: "Governance", tk: "Dolandyryş", az: "İdarəetmə" }, href: "/learn/governance", kind: "site" },
      { label: { tr: "Trust Framework", en: "Trust Framework", tk: "Trust Framework", az: "Trust Framework" }, href: "trust-framework", kind: "arf" },
    ],
    body: {
      tr: (
        <>
          <p>
            Tamga Network'ün hedefinde ortak bir defter var. Ama bugün ağ bir blockchain üzerinde çalışmıyor. Bu bir eksik değil,
            bilinçli bir sıra. Nedeni bir önceki sayfanın son cümlesinde: zincirin değeri birden çok bağımsız taraftan gelir.
          </p>

          <h2>Bir defter tek elle olmaz</h2>
          <p>
            Bugün ağda tek bir işletmeci var: devletler adına geçici olarak çalışan Tamga. Tek bir işletmecinin çalıştırdığı zincirde
            blokları üreten de, onaylayan da aynı taraftır. Böyle bir zincir maliyeti ve karmaşıklığı artırır, ama güveni artırmaz.
            Dürüst olmak gerekirse, o durumda zincir yalnızca daha yavaş bir veritabanı olur.
          </p>

          <h2>Bugün ne kullanıyoruz?</h2>
          <p>
            Bunun yerine Avrupa'nın kendi güven listeleri için kullandığı modeli kullanıyoruz: imzalı, sürümlü ve birbirine zincirli
            listeler. Önceki sayfalarda gördüğümüz gibi her sürüm bir öncekinin özetini taşır, geçmiş silinmez ve her saat güncellenen
            herkese açık bir çapa günlüğü vardır. Bir listenin geri sarılması ya da sessizce değiştirilmesi herkes tarafından fark
            edilebilir.
          </p>
          <p>
            Bunun bir sınırı da var ve onu açıkça söylüyoruz: bugün güvenin son halkası tek bir işletmecinin imzasıdır. Herkese açık
            günlük, şeffaflık ve denetim kötüye kullanımı caydırır, ama tamamen imkânsız kılmaz. Zincir, bu son halkayı birden çok
            ele dağıtmak için gelecek.
          </p>

          <h2>Zincir ne zaman gelir?</h2>
          <p>
            Kural basit: <strong>en az iki bağımsız işletmeci</strong>, yani Tamga'dan hukuken ve işletme olarak ayrı en az bir taraf,
            yazılı olarak katıldığında izinli bir ortak defter başlar. Bu taraf bir devlet kurumu ya da devletin yetkilendirdiği bir
            kurum olabilir. Devletler katıldıkça işletmeci sayısı artar, defterin güvencesi de büyür.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Hedef, Türk devletlerinin her birinin ortak defterde bir düğüm işletmesi. O zaman hiçbir devlet, Tamga dahil, kaydı
              tek başına değiştiremez. Bu ağın vakıf yoluyla aynı yönde ilerler.
            </p>
          </Callout>

          <h2>Geçiş kimseyi etkilemeyecek</h2>
          <p>
            Ağ baştan bu geçişe göre tasarlandı. Kurumların ve belge türlerinin kimlikleri bugünden zincirdeki gibi hesaplanıyor. Liste
            geçmişi deftere birebir aktarılabilir ve iki yolun aynı cevabı verdiği test ediliyor. Cüzdanlar, doğrulayıcılar ve
            belgeler güvene tek bir arayüzden bakıyor; liste yerine defter geldiğinde onlar için bir şey değişmiyor.
          </p>
          <p>
            Değişmeyen bir kural daha var: deftere kişisel veri, belge ya da belgenin özeti yazılmaz. Zincir ne kadar güçlü olursa
            olsun, insanların bilgisi orada durmaz.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            A shared ledger is part of Tamga Network's goal. But today the network does not run on a blockchain. That is not a gap;
            it is a deliberate order of steps. The reason is in the last line of the previous page: a chain's value comes from several
            independent parties.
          </p>

          <h2>A ledger needs more than one hand</h2>
          <p>
            Today the network has one operator: Tamga, acting provisionally on behalf of the states. On a chain run by a single
            operator, the same party produces and approves the blocks. Such a chain adds cost and complexity but no trust. To be
            honest, in that situation a chain is just a slower database.
          </p>

          <h2>What we use today</h2>
          <p>
            Instead we use the model Europe uses for its own trusted lists: signed, versioned lists chained to each other. As we saw on
            the earlier pages, every version carries the digest of the previous one, history is never deleted, and a public anchor log
            is updated every hour. Anyone can detect a list that was rolled back or quietly changed.
          </p>
          <p>
            There is a limit, and we say it plainly: today the last link of trust is one operator's signature. The public log,
            transparency and audits deter misuse, but they do not make it impossible. The chain will come to spread that last link
            across several hands.
          </p>

          <h2>When does the chain come?</h2>
          <p>
            The rule is simple: a permissioned shared ledger starts once <strong>at least two independent operators</strong>, meaning
            at least one party legally and operationally separate from Tamga, join in writing. That party can be a state body or an
            institution the state authorises. As more states join, the number of operators grows, and so does the ledger's assurance.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              The aim is for every Turkic state to run a node on the shared ledger. Then no state, Tamga included, can change the
              record alone. This moves in the same direction as the network's path to a foundation.
            </p>
          </Callout>

          <h2>The switch will affect no one</h2>
          <p>
            The network was designed for this switch from the start. Institution and credential-type identifiers are already computed
            exactly as on the chain. The list history can be replayed into the ledger, and tests check that both give the same
            answers. Wallets, verifiers and credentials look at trust through a single interface; when the ledger replaces the lists,
            nothing changes for them.
          </p>
          <p>
            One rule does not change either: no personal data, credential or credential digest is written to the ledger. However strong
            the chain, people's information does not live there.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Umumy kitap Tamga Networkuň maksadynyň bir bölegi. Emma häzir tor blokçeýnde işlemeýär. Bu kemçilik däl, bilkastlaýyn
            tertip: zynjyryň gymmaty birnäçe garaşsyz tarapdan gelýär.
          </p>
          <h2>Kitap ýeke el bilen bolmaýar</h2>
          <p>
            Häzir torda bir operator bar: döwletleriň adyndan wagtlaýyn işleýän Tamga. Ýeke operatorly zynjyr çykdajy goşýar, ynam
            goşmaýar.
          </p>
          <h2>Häzir näme ulanýarys?</h2>
          <p>
            Ýewropanyň öz ynam sanawlary üçin ulanýan modelini: gollanan, wersiýaly, biri-birine baglanyşykly sanawlar we her sagat
            täzelenýän açyk anchor log. Çägi hem açyk aýdýarys: häzir ynamyň soňky halkasy bir operatoryň goly.
          </p>
          <h2>Zynjyr haçan gelýär?</h2>
          <p>
            Azyndan <strong>iki garaşsyz operator</strong> ýazmaça goşulanda rugsatly umumy kitap başlaýar.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>Maksat: her türki döwletiň umumy kitapda bir düwün işletmegi. Şonda hiç bir döwlet ýazgyny ýeke özi üýtgedip bilmez.</p>
          </Callout>
          <h2>Geçiş hiç kime täsir etmez</h2>
          <p>
            Belgiler eýýäm zynjyrdaky ýaly hasaplanýar; gapjyklar we barlaýjylar şol bir interfeýs bilen okaýar. Kitaba şahsy
            maglumat hiç haçan ýazylmaýar.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Ortaq reyestr Tamga Network-un məqsədinin bir hissəsidir. Lakin bu gün şəbəkə blokçeyn üzərində işləmir. Bu çatışmazlıq
            deyil; addımların şüurlu ardıcıllığıdır. Səbəb əvvəlki səhifənin son cümləsindədir: zəncirin dəyəri bir neçə müstəqil
            tərəfdən gəlir.
          </p>

          <h2>Reyestr üçün bir əl kifayət deyil</h2>
          <p>
            Bu gün şəbəkənin bir operatoru var: dövlətlər adından müvəqqəti fəaliyyət göstərən Tamga. Tək operatorun idarə etdiyi
            zəncirdə blokları eyni tərəf həm yaradır, həm də təsdiqləyir. Belə zəncir xərci və mürəkkəbliyi artırır, lakin etibarı
            artırmır. Açığını desək, bu vəziyyətdə zəncir sadəcə daha yavaş verilənlər bazasıdır.
          </p>

          <h2>Bu gün nədən istifadə edirik</h2>
          <p>
            Bunun əvəzinə Avropanın öz etibar siyahıları üçün istifadə etdiyi modeldən istifadə edirik: imzalı, versiyalanan və bir-birinə
            zəncirlə bağlanan siyahılar. Əvvəlki səhifələrdə gördüyümüz kimi, hər versiya əvvəlkinin həşini daşıyır, tarixçə heç vaxt
            silinmir və açıq lövbər jurnalı hər saat yenilənir. Geri qaytarılmış və ya gizlicə dəyişdirilmiş siyahını hər kəs aşkar edə bilər.
          </p>
          <p>
            Bir məhdudiyyət də var və biz bunu açıq deyirik: bu gün etibarın son halqası bir operatorun imzasıdır. Açıq jurnal,
            şəffaflıq və auditlər sui-istifadənin qarşısını alır, lakin onu qeyri-mümkün etmir. Zəncir bu son halqanı bir neçə əl
            arasında bölüşdürmək üçün gələcək.
          </p>

          <h2>Zəncir nə vaxt gələcək?</h2>
          <p>
            Qayda sadədir: icazəli ortaq reyestr <strong>ən azı iki müstəqil operator</strong>, yəni Tamga-dan hüquqi və əməliyyat
            baxımından ayrı olan ən azı bir tərəf yazılı şəkildə qoşulduqdan sonra başlayır. Bu tərəf dövlət orqanı və ya dövlətin
            səlahiyyət verdiyi qurum ola bilər. Daha çox dövlət qoşulduqca operatorların sayı artır, onunla birlikdə reyestrin təminatı da güclənir.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Məqsəd hər türk dövlətinin ortaq reyestrdə bir düyün idarə etməsidir. Onda heç bir dövlət, o cümlədən Tamga, qeydi
              təkbaşına dəyişə bilməz. Bu, şəbəkənin fonda çevrilmə yolu ilə eyni istiqamətdə irəliləyir.
            </p>
          </Callout>

          <h2>Keçid heç kimə təsir etməyəcək</h2>
          <p>
            Şəbəkə əvvəldən bu keçid nəzərə alınaraq layihələndirilib. Qurum və sənəd növü identifikatorları artıq zəncirdəki kimi
            hesablanır. Siyahı tarixçəsi reyestrə təkrar ötürülə bilər və testlər hər ikisinin eyni cavabları verdiyini yoxlayır.
            Rəqəmsal cüzdanlar, yoxlayan tərəflər və rəqəmsal sənədlər etibara vahid interfeys vasitəsilə baxır; reyestr siyahıları
            əvəz etdikdə onlar üçün heç nə dəyişmir.
          </p>
          <p>
            Dəyişməyən daha bir qayda var: reyestrə heç bir fərdi məlumat, rəqəmsal sənəd və ya sənədin həşi yazılmır. Zəncir nə qədər
            güclü olsa da, insanların məlumatları orada saxlanılmır.
          </p>
        </>
      ),
    },
  },
];

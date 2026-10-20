import { Callout, Figure, Term } from "@/components/learn/prose";
import type { L, LearnPage } from "./types";

/*
 * Bölüm 4 — Avrupa'nın modeli. AB bilgileri yalnız çalışma alanının kaynak kütüphanesinden (docs/standards: TIMELINE.md,
 * REGISTRY.csv; tüzük tarihleri AB Yayın Ofisi'nden doğrulanmış). Emin olunmayan tarih ya da rakam yazılmaz.
 */

/* ------------------------------------------------------------------ Avrupa takvimi (satır içi şema) */

type Milestone = { when: L; what: L; ref?: string; future?: boolean };

const MILESTONES: Milestone[] = [
  {
    when: { tr: "11 Nisan 2024", en: "11 April 2024", tk: "11 aprel 2024", az: "11 aprel 2024" },
    what: {
      tr: "eIDAS 2.0 kabul edildi: Tüzük (AB) 2024/1183.",
      en: "eIDAS 2.0 adopted: Regulation (EU) 2024/1183.",
      tk: "eIDAS 2.0 kabul edildi: (ÝB) 2024/1183 düzgünnamasy.",
      az: "eIDAS 2.0 qəbul edildi: (Aİ) 2024/1183 saylı Reqlament.",
    },
    ref: "2024/1183",
  },
  {
    when: { tr: "20 Mayıs 2024", en: "20 May 2024", tk: "20 maý 2024", az: "20 may 2024" },
    what: {
      tr: "Tüzük yürürlüğe girdi. Bütün süreler bu tarihten sayılır.",
      en: "The regulation enters into force. Every deadline counts from this date.",
      tk: "Düzgünnama güýje girdi. Ähli möhletler şu seneden hasaplanýar.",
      az: "Reqlament qüvvəyə minir. Bütün müddətlər bu tarixdən hesablanır.",
    },
  },
  {
    when: { tr: "Kasım 2024", en: "November 2024", tk: "Noýabr 2024", az: "Noyabr 2024" },
    what: {
      tr: "İlk uygulama tüzükleri: kişi kimlik verisi ve belgeler, cüzdanın çekirdek işlevleri, bildirim, sertifikasyon, protokoller.",
      en: "First implementing acts: person identification data and attestations, the wallet's core functions, notification, certification, protocols.",
      tk: "Ilkinji ýerine ýetiriş düzgünnamalary: şahsyýet maglumaty we resminamalar, gapjygyň esasy işleri, habar bermek, sertifikasiýa, protokollar.",
      az: "İlk icra aktları: şəxsi identifikasiya məlumatları və attestasiyalar, rəqəmsal cüzdanın əsas funksiyaları, bildiriş, sertifikatlaşdırma, protokollar.",
    },
  },
  {
    when: { tr: "2025", en: "2025", tk: "2025", az: "2025" },
    what: {
      tr: "Doğrulayıcıların kaydı, sertifikalı cüzdanların listesi, nitelikli belgeler (QEAA) ve kamu belgeleri için yeni tüzükler.",
      en: "New acts on registering relying parties, the list of certified wallets, qualified attestations (QEAA) and public-sector attestations.",
      tk: "Barlaýjylary hasaba almak, sertifikatly gapjyklaryň sanawy, kwalifisirlenen resminamalar (QEAA) we döwlet resminamalary üçin täze düzgünnamalar.",
      az: "Etibar edən tərəflərin qeydiyyatı, sertifikatlaşdırılmış rəqəmsal cüzdanların siyahısı, kvalifikasiyalı attestasiyalar (QEAA) və dövlət sektoru attestasiyaları haqqında yeni aktlar.",
    },
  },
  {
    when: { tr: "11 Ağustos 2026", en: "11 August 2026", tk: "11 awgust 2026", az: "11 avqust 2026" },
    what: {
      tr: "Güncelleme paketi yürürlükte: cüzdan kanıtları (WIA ve anahtar kanıtı), AB güven işareti, sunum için HAIP ve ISO profilleri.",
      en: "Update package in force: wallet attestations (WIA and key attestation), the EU trust mark, HAIP and ISO profiles for presentation.",
      tk: "Täzeleme toplumy güýje girdi: gapjyk subutnamalary (WIA we açar subutnamasy), ÝB ynam belgisi, görkezmek üçin HAIP we ISO profilleri.",
      az: "Yenilənmə paketi qüvvədədir: rəqəmsal cüzdan attestasiyaları (WIA və açar attestasiyası), Aİ etibar nişanı, təqdimat üçün HAIP və ISO profilləri.",
    },
  },
  {
    when: { tr: "2026 sonu", en: "End of 2026", tk: "2026-njy ýylyň ahyry", az: "2026-cı ilin sonu" },
    what: {
      tr: "Her üye devlet vatandaşlarına en az bir sertifikalı EUDI Wallet sunmuş olmalı.",
      en: "Every member state must offer its citizens at least one certified EUDI Wallet.",
      tk: "Her agza döwlet raýatlaryna iň bolmanda bir sertifikatly EUDI Wallet hödürlän bolmaly.",
      az: "Hər üzv dövlət öz vətəndaşlarına ən azı bir sertifikatlaşdırılmış EUDI Wallet təqdim etməlidir.",
    },
    future: true,
  },
  {
    when: { tr: "2027 sonu", en: "End of 2027", tk: "2027-nji ýylyň ahyry", az: "2027-ci ilin sonu" },
    what: {
      tr: "Düzenlenmiş sektörler (ör. bankalar) ve çok büyük çevrim içi platformlar cüzdanı kabul etmek zorunda.",
      en: "Regulated sectors (such as banks) and very large online platforms must accept the wallet.",
      tk: "Düzgünleşdirilen pudaklar (meselem, banklar) we örän uly onlaýn platformalar gapjygy kabul etmeli.",
      az: "Tənzimlənən sektorlar (məsələn, banklar) və çox böyük onlayn platformalar rəqəmsal cüzdanı qəbul etməlidir.",
    },
    future: true,
  },
  {
    when: { tr: "11 Ağustos 2028", en: "11 August 2028", tk: "11 awgust 2028", az: "11 avqust 2028" },
    what: {
      tr: "Cüzdanlar doğrulayıcının kayıt sertifikasını denetlemek zorunda; portre, kişi kimlik verisinin zorunlu alanı olur.",
      en: "Wallets must check the relying party's registration certificate; the portrait becomes a mandatory field of the person identification data.",
      tk: "Gapjyklar barlaýjynyň hasaba alyş sertifikatyny barlamaly; surat şahsyýet maglumatynyň hökmany meýdany bolýar.",
      az: "Rəqəmsal cüzdanlar etibar edən tərəfin qeydiyyat sertifikatını yoxlamalıdır; portret şəxsi identifikasiya məlumatlarının məcburi sahəsinə çevrilir.",
    },
    future: true,
  },
  {
    when: { tr: "2030", en: "2030", tk: "2030", az: "2030" },
    what: {
      tr: "AB'nin dijital on yıl hedefi: vatandaşların %80'i dijital kimlik kullanıyor.",
      en: "The EU's Digital Decade target: 80 % of citizens use a digital identity.",
      tk: "ÝB-niň sanly onýyllyk maksady: raýatlaryň 80 %-i sanly şahsyýet ulanýar.",
      az: "Aİ-nin Rəqəmsal Onillik hədəfi: vətəndaşların 80 %-i rəqəmsal şəxsiyyətdən istifadə edir.",
    },
    future: true,
  },
];

function EuTimeline({ locale }: { locale: "tr" | "en" | "tk" | "az" }) {
  const label = { tr: "Gelecek tarih", en: "Upcoming", tk: "Geljekki sene", az: "Gələcək tarix" }[locale];
  return (
    <ol className="relative m-0 list-none space-y-0 p-0">
      {MILESTONES.map((m, i) => (
        <li key={i} className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0">
          <span aria-hidden className="relative flex justify-center">
            {i < MILESTONES.length - 1 ? (
              <span className="absolute top-4 bottom-[-0.25rem] w-px bg-border" />
            ) : null}
            <span
              className={
                m.future
                  ? "mt-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background-elevated"
                  : "mt-1.5 h-3 w-3 rounded-full bg-primary"
              }
            />
          </span>
          <div className="min-w-0">
            <p className="m-0 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-foreground">
              {m.when[locale]}
              {m.future ? <span className="ml-2 normal-case tracking-normal text-foreground-subtle">· {label}</span> : null}
            </p>
            <p className="m-0 mt-1 text-[15px] leading-relaxed text-foreground-muted">{m.what[locale]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ EUDI Wallet ile AB uyumlu cüzdan tablosu */

function WalletCompare({ locale }: { locale: "tr" | "en" | "tk" | "az" }) {
  const head = {
    tr: ["", "EUDI Wallet", "AB uyumlu cüzdan"],
    en: ["", "EUDI Wallet", "EU-compatible wallet"],
    tk: ["", "EUDI Wallet", "ÝB bilen laýyk gapjyk"],
    az: ["", "EUDI Wallet", "Aİ ilə uyğun rəqəmsal cüzdan"],
  }[locale];
  const rows: Record<"tr" | "en" | "tk" | "az", string[][]> = {
    tr: [
      ["Kim sunar", "Bir AB üye devleti ya da onun tanıdığı sağlayıcı", "Herhangi bir kuruluş"],
      ["Sertifika", "AB kurallarına göre sertifikalı, AB'nin listesinde", "AB unvanını taşımaz"],
      ["Biçimler ve protokoller", "AB standartları", "Aynı standartlar"],
      ["AB güven işareti", "Kullanabilir", "Kullanamaz"],
      ["Uyum nasıl gösterilir", "Sertifikasyonla", "Birlikte çalışabilirlik testleriyle"],
    ],
    en: [
      ["Who offers it", "An EU member state or a provider it recognises", "Any organisation"],
      ["Certification", "Certified under EU rules, on the EU's list", "Does not carry the EU title"],
      ["Formats and protocols", "EU standards", "The same standards"],
      ["EU trust mark", "May use it", "May not use it"],
      ["How compatibility is shown", "Through certification", "Through interoperability tests"],
    ],
    tk: [
      ["Kim hödürleýär", "ÝB agza döwleti ýa-da onuň ykrar eden üpjün edijisi", "Islendik gurama"],
      ["Sertifikat", "ÝB düzgünleri boýunça sertifikatly, ÝB-niň sanawynda", "ÝB adyny göterenok"],
      ["Formatlar we protokollar", "ÝB standartlary", "Şol bir standartlar"],
      ["ÝB ynam belgisi", "Ulanyp bilýär", "Ulanyp bilmeýär"],
      ["Laýyklyk nähili görkezilýär", "Sertifikasiýa bilen", "Bilelikde işleýiş synaglary bilen"],
    ],
    az: [
      ["Kim təqdim edir", "Aİ üzv dövləti və ya onun tanıdığı provayder", "İstənilən təşkilat"],
      ["Sertifikatlaşdırma", "Aİ qaydalarına əsasən sertifikatlaşdırılıb, Aİ-nin siyahısındadır", "Aİ statusunu daşımır"],
      ["Formatlar və protokollar", "Aİ standartları", "Eyni standartlar"],
      ["Aİ etibar nişanı", "İstifadə edə bilər", "İstifadə edə bilməz"],
      ["Uyğunluq necə göstərilir", "Sertifikatlaşdırma yolu ilə", "Qarşılıqlı işləmə testləri ilə"],
    ],
  };
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] border-collapse text-[14px]">
        <thead>
          <tr className="bg-surface">
            {head.map((h, i) => (
              <th
                key={i}
                scope="col"
                className="border-b border-border px-4 py-3 text-left font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-foreground-subtle"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows[locale].map((r, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-3 text-left align-top font-medium text-foreground">
                {r[0]}
              </th>
              <td className="px-4 py-3 align-top text-foreground-muted">{r[1]}</td>
              <td className="px-4 py-3 align-top text-foreground-muted">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ Belge türleri tablosu */

function AttestationTypes({ locale }: { locale: "tr" | "en" | "tk" | "az" }) {
  const head = {
    tr: ["Tür", "Kim verir", "Örnek"],
    en: ["Type", "Who issues it", "Example"],
    tk: ["Görnüş", "Kim berýär", "Mysal"],
    az: ["Növ", "Kim verir", "Nümunə"],
  }[locale];
  const rows: Record<"tr" | "en" | "tk" | "az", string[][]> = {
    tr: [
      ["PID", "Devlet ya da devlet adına yetkili kurum", "Ad, soyad, doğum tarihi: kimliğin temeli"],
      ["EAA", "Herhangi bir kurum", "Öğrenci belgesi, etkinlik bileti, üyelik"],
      ["QEAA", "Nitelikli güven hizmeti sağlayıcısı (QTSP)", "Hukuki ağırlığı yüksek bir nitelik belgesi"],
      ["PuB-EAA", "Yetkili kaynaktan sorumlu ya da yetkilendirilmiş kamu kurumu", "Kamunun kendi kaydından verdiği belge"],
    ],
    en: [
      ["PID", "The state or a body authorised on its behalf", "Name, surname, date of birth: the core of identity"],
      ["EAA", "Any organisation", "Student card, event ticket, membership"],
      ["QEAA", "A qualified trust service provider (QTSP)", "An attribute attestation with strong legal weight"],
      ["PuB-EAA", "A public body responsible for, or designated by, an authentic source", "An attestation the public sector issues from its own register"],
    ],
    tk: [
      ["PID", "Döwlet ýa-da onuň adyndan ygtyýarly gurama", "At, familiýa, doglan senesi: şahsyýetiň esasy"],
      ["EAA", "Islendik gurama", "Talyp şahadatnamasy, çäre bileti, agzalyk"],
      ["QEAA", "Kwalifisirlenen ynam hyzmaty üpjün edijisi (QTSP)", "Hukuk taýdan agramly häsiýet resminamasy"],
      ["PuB-EAA", "Ygtyýarly çeşmä jogapkär ýa-da ygtyýarlandyrylan döwlet edarasy", "Döwletiň öz sanawyndan berýän resminamasy"],
    ],
    az: [
      ["PID", "Dövlət və ya onun adından səlahiyyətli qurum", "Ad, soyad, doğum tarixi: şəxsiyyətin əsası"],
      ["EAA", "İstənilən təşkilat", "Tələbə bileti, tədbir bileti, üzvlük"],
      ["QEAA", "Kvalifikasiyalı etibar xidməti provayderi (QTSP)", "Güclü hüquqi qüvvəyə malik atribut attestasiyası"],
      ["PuB-EAA", "Mötəbər mənbəyə cavabdeh olan və ya onun təyin etdiyi dövlət qurumu", "Dövlət sektorunun öz reyestrindən verdiyi attestasiya"],
    ],
  };
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[560px] border-collapse text-[14px]">
        <thead>
          <tr className="bg-surface">
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-border px-4 py-3 text-left font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-foreground-subtle"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows[locale].map((r) => (
            <tr key={r[0]} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-3 text-left align-top font-mono text-[13px] font-medium text-foreground">
                {r[0]}
              </th>
              <td className="px-4 py-3 align-top text-foreground-muted">{r[1]}</td>
              <td className="px-4 py-3 align-top text-foreground-muted">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ Sayfalar */

export const CHAPTER_4: LearnPage[] = [
  /* ================================================================ 4.1 eIDAS */
  {
    slug: "eidas",
    chapter: 4,
    order: 1,
    minutes: 5,
    title: { tr: "eIDAS 2.0 nedir?", en: "What is eIDAS 2.0?", tk: "eIDAS 2.0 näme?", az: "eIDAS 2.0 nədir?" },
    summary: {
      tr: "Avrupa Birliği'nin dijital kimlik ve güven hizmetleri tüzüğü ve neden bizi de ilgilendirdiği.",
      en: "The European Union's regulation on digital identity and trust services, and why it matters to us too.",
      tk: "Ýewropa Bileleşiginiň sanly şahsyýet we ynam hyzmatlary baradaky düzgünnamasy we onuň bize hem näme üçin degişlidigi.",
      az: "Avropa İttifaqının rəqəmsal şəxsiyyət və etibar xidmətləri haqqında reqlamenti və onun bizim üçün də niyə əhəmiyyətli olduğu.",
    },
    body: {
      tr: (
        <>
          <p>
            Avrupa Birliği'nde bir öğrenci Lizbon'dan Varşova'ya taşındığında diplomasını, sağlık sigortasını, banka hesabını yeni
            ülkede nasıl kanıtlayacak? Yıllarca cevap kâğıt, onaylı kopya ve bekleme oldu. eIDAS bu soruya AB'nin verdiği hukuki
            cevaptır.
          </p>
          <h2>Bir tüzük, iki kuşak</h2>
          <p>
            eIDAS, İngilizce <em>electronic IDentification, Authentication and trust Services</em> sözcüklerinden gelir: elektronik
            kimlik, kimlik doğrulama ve <Term tip="Elektronik imza, mühür, zaman damgası gibi, dijital dünyada güveni sağlayan hizmetler. Bölümün 3. sayfasında anlatılıyor." en="trust services">güven hizmetleri</Term>.
            İlk kuşak, ülkelerin elektronik kimlik sistemlerinin birbirini tanımasını ve elektronik imzanın hukuken geçerli olmasını
            düzenliyordu. Ama vatandaşın elinde, ülkeden ülkeye taşıyabileceği tek bir araç yoktu.
          </p>
          <p>
            İkinci kuşak, yani eIDAS 2.0, <strong>Tüzük (AB) 2024/1183</strong> olarak 11 Nisan 2024'te kabul edildi ve 20 Mayıs
            2024'te yürürlüğe girdi. Getirdiği en büyük yenilik, her AB vatandaşı için bir dijital kimlik cüzdanıdır: EUDI Wallet.
            Bir AB tüzüğü olduğu için üye devletlerde ayrıca yasa çıkarmaya gerek kalmadan doğrudan uygulanır.
          </p>
          <h2>eIDAS 2.0 neler ekledi</h2>
          <ul>
            <li>
              <strong>Cüzdan.</strong> Kişinin kimliğini ve belgelerini telefonunda taşıdığı, kime ne gösterdiğine kendisinin karar
              verdiği bir uygulama.
            </li>
            <li>
              <strong>Elektronik belgeler.</strong> Diploma, ehliyet, meslek belgesi, üyelik gibi bilgilerin herkesin okuyabildiği
              ortak bir dijital biçimi. AB bunlara "nitelik belgesi" der.
            </li>
            <li>
              <strong>Yeni güven hizmetleri.</strong> Örneğin nitelikli elektronik defter: kayıtların sırasının ve bütünlüğünün
              hukuken güvence altına alındığı bir kayıt defteri.
            </li>
          </ul>
          <h2>Kurallar nasıl katman katman yazılır</h2>
          <p>
            Tüzük ilkeleri ve hakları koyar; teknik ayrıntıyı Avrupa Komisyonu'nun{" "}
            <Term tip="Tüzüğün teknik ayrıntılarını bağlayıcı biçimde belirleyen Komisyon düzenlemeleri." en="implementing acts">uygulama tüzükleri</Term>{" "}
            belirler. İlk paket Kasım 2024'te kabul edildi: kişi kimlik verisi ve belgeler, cüzdanın çekirdek işlevleri, bildirim,
            sertifikasyon ve protokoller. 2025'te ve 2026'da yenileri ve güncellemeleri geldi.
          </p>
          <p>
            Mimarinin ayrıntıları ise{" "}
            <Term tip="Architecture and Reference Framework: EUDI Wallet'ın rollerini, akışlarını ve gereksinimlerini anlatan başvuru çerçevesi." en="ARF">ARF</Term>{" "}
            adlı başvuru belgesinde toplanır (en son sürüm 3.0.0, Temmuz 2026). ARF kendi başına bağlayıcı değildir; bağlayıcı olan
            tüzük ve uygulama tüzükleridir. ARF bunların nasıl bir araya geldiğini anlatan ortak haritadır. Tamga'nın kendi
            çerçevesine de bu yüzden "Tamga ARF" denir.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Almatı'da okuyan bir öğrenci yüksek lisans için Berlin'e başvuruyor; Bakü'deki bir şirket Varşova'daki bir ortağıyla
              sözleşme imzalıyor. Avrupa'daki üniversiteler, bankalar ve kurumlar belgeleri yakında cüzdandan okumaya başlayacak.
              Türk dünyasından gelen belgeler aynı dili konuşmazsa yine kâğıda ve beklemeye mahkûm kalır.
            </p>
          </Callout>
          <h2>Tamga Network ile ilişkisi</h2>
          <p>
            Tamga Network bir AB kurumu değildir ve eIDAS'ın kapsamında da değildir. Ama aynı mimariyi bilerek kullanır: belge
            biçimleri, belge alma ve gösterme protokolleri, güven listeleri AB standartlarındadır. Böylece Türk dünyasında verilen
            bir belge, Avrupa'daki yazılımlarla birlikte çalışmaya uygun olur; bu uyum birlikte çalışabilirlik testleriyle
            gösterilir. Ağın konumu bir kararla yazılıdır: önce AB uyumu, onun üstünde Türk dünyasının hafif bir güven ağı.
          </p>
          <p>
            Birlikte çalışmak, hukuken tanınmak demek değildir. eIDAS'ın 5f maddesi AB içindeki kurumların AB cüzdanlarını kabul
            etmesini düzenler; AB dışındaki bir cüzdanın ya da güven listesinin tanınması için bir yol değildir. AB dışı için tek açık
            dayanak 14. maddedir: yalnız güven hizmetlerini (ör. nitelikli e-imza) kapsar ve Birlik ile o ülke arasında bir anlaşma
            ister; tarafları devletlerdir. Tamga Network bu anlaşmanın tarafı olamaz. Ağın işi teknik hazırlıktır: ETSI biçiminde
            listeler, ETSI profilli sertifikalar ve devletlere devredilebilecek roller. Bugün bir AB doğrulayıcısı Tamga belgelerini
            ancak kendi isteğiyle, güven listemizi kendi güven kaynağına ekleyerek kabul edebilir.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            When a student moves from Lisbon to Warsaw, how do they prove their diploma, health insurance or bank account in the new
            country? For years the answer was paper, certified copies and waiting. eIDAS is the EU's legal answer to that question.
          </p>
          <h2>One regulation, two generations</h2>
          <p>
            eIDAS stands for <em>electronic IDentification, Authentication and trust Services</em>: electronic identity,
            authentication and <Term tip="Services that create trust online, such as electronic signatures, seals and timestamps. Page 3 of this chapter covers them.">trust services</Term>.
            The first generation made the member states' electronic identity schemes recognise one another and gave electronic
            signatures legal effect. What it did not give citizens was a single tool they could carry from country to country.
          </p>
          <p>
            The second generation, eIDAS 2.0, was adopted as <strong>Regulation (EU) 2024/1183</strong> on 11 April 2024 and entered
            into force on 20 May 2024. Its biggest novelty is a digital identity wallet for every EU citizen: the EUDI Wallet. As an
            EU regulation it applies directly in every member state, without national laws to transpose it.
          </p>
          <h2>What eIDAS 2.0 adds</h2>
          <ul>
            <li>
              <strong>The wallet.</strong> An app in which a person carries their identity and credentials and decides who sees what.
            </li>
            <li>
              <strong>Electronic attestations.</strong> A shared digital format for diplomas, driving licences, professional
              qualifications or memberships that anyone can read. The EU calls them attestations of attributes.
            </li>
            <li>
              <strong>New trust services.</strong> For example the qualified electronic ledger: a register whose order and integrity
              are legally assured.
            </li>
          </ul>
          <h2>How the rules are written, layer by layer</h2>
          <p>
            The regulation sets out principles and rights; the technical detail is fixed by the European Commission's{" "}
            <Term tip="Commission regulations that set the binding technical details of the main regulation.">implementing acts</Term>. The first package
            was adopted in November 2024: person identification data and attestations, the wallet's core functions, notification,
            certification and protocols. More acts and updates followed in 2025 and 2026.
          </p>
          <p>
            The architecture itself is described in a reference document called the{" "}
            <Term tip="Architecture and Reference Framework: the reference describing the EUDI Wallet's roles, flows and requirements.">ARF</Term>{" "}
            (latest version 3.0.0, July 2026). The ARF is not binding on its own; the regulation and its implementing acts are. The
            ARF is the shared map of how they fit together, which is why Tamga's own framework is called the "Tamga ARF".
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              A student in Almaty applies for a master's programme in Berlin; a company in Baku signs a contract with a partner in
              Warsaw. Universities, banks and institutions in Europe will soon read credentials straight from wallets. If credentials
              from the Turkic world do not speak the same language, they stay stuck with paper and waiting.
            </p>
          </Callout>
          <h2>How it relates to Tamga Network</h2>
          <p>
            Tamga Network is not an EU body and is not within the scope of eIDAS. But it deliberately uses the same architecture:
            credential formats, the protocols for issuing and presenting credentials, and trust lists all follow EU standards. A
            credential issued in the Turkic world is therefore fit to work with European software, and that compatibility is shown
            through interoperability tests. The network's position is set down in a decision: EU compatibility first, and on top of
            it a light trust network for the Turkic world.
          </p>
          <p>
            Working together is not the same as legal recognition. Article 5f of eIDAS governs how bodies inside the EU accept EU
            wallets; it is not a way to recognise a wallet or a trusted list from outside the EU. For countries outside the EU the
            only open basis is Article 14: it covers trust services only (for example qualified e-signatures) and requires an
            agreement between the Union and that country, whose parties are states. Tamga Network cannot be a party to it. The
            network's job is technical preparation: lists in ETSI formats, certificates with ETSI profiles and roles that can be
            handed over to states. Today an EU relying party can accept Tamga credentials only of its own accord, by adding our
            trusted list to its own trust source.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Bir talyp Lissabondan Warşawa göçende diplomyny, saglyk ätiýaçlandyryşyny ýa-da bank hasabyny täze ýurtda nädip subut
            eder? Köp ýyllap jogap kagyz, tassyklanan nusga we garaşmakdy. eIDAS ÝB-niň bu soraga beren hukuk jogabydyr.
          </p>
          <h2>Bir düzgünnama, iki nesil</h2>
          <p>
            eIDAS iňlisçe <em>electronic IDentification, Authentication and trust Services</em> sözlerinden gelýär: elektron
            şahsyýet, şahsyýeti barlamak we <Term tip="Elektron gol, möhür, wagt belligi ýaly, sanly dünýäde ynam döredýän hyzmatlar." en="trust services">ynam hyzmatlary</Term>.
            Birinji nesil ýurtlaryň elektron şahsyýet ulgamlarynyň biri-birini ykrar etmegini we elektron golyň hukuk güýjüni
            düzgünleşdirdi. Emma raýatyň elinde ýurtdan ýurda göterip boljak ýeke-täk gural ýokdy.
          </p>
          <p>
            Ikinji nesil, eIDAS 2.0, <strong>(ÝB) 2024/1183 düzgünnamasy</strong> hökmünde 2024-nji ýylyň 11-nji aprelinde kabul
            edildi we 20-nji maýynda güýje girdi. Onuň iň uly täzeligi her ÝB raýaty üçin sanly şahsyýet gapjygy: EUDI Wallet.
            Düzgünnama agza döwletlerde aýratyn kanun kabul etmezden göni ulanylýar.
          </p>
          <h2>eIDAS 2.0 näme goşdy</h2>
          <ul>
            <li>
              <strong>Gapjyk.</strong> Adamyň şahsyýetini we resminamalaryny telefonynda göterýän, kime näme görkezjegini özi
              çözýän programma.
            </li>
            <li>
              <strong>Elektron resminamalar.</strong> Diplom, sürüjilik şahadatnamasy, hünär resminamasy ýaly maglumatlaryň
              hemmeleriň okap bilýän umumy sanly görnüşi.
            </li>
            <li>
              <strong>Täze ynam hyzmatlary.</strong> Meselem, kwalifisirlenen elektron kitap: ýazgylaryň tertibi we bitewüligi hukuk
              taýdan kepillendirilen hasaba alyş kitaby.
            </li>
          </ul>
          <h2>Düzgünler gatlak-gatlak nädip ýazylýar</h2>
          <p>
            Düzgünnama ýörelgeleri we hukuklary kesgitleýär; tehniki jikme-jiklikleri Ýewropa Komissiýasynyň{" "}
            <Term tip="Esasy düzgünnamanyň tehniki jikme-jikliklerini borçly görnüşde kesgitleýän Komissiýa düzgünnamalary." en="implementing acts">ýerine ýetiriş düzgünnamalary</Term>{" "}
            kesgitleýär. Ilkinji toplum 2024-nji ýylyň noýabrynda kabul edildi; 2025-nji we 2026-njy ýyllarda täzeleri geldi.
            Arhitekturanyň jikme-jiklikleri <Term tip="Architecture and Reference Framework: EUDI Wallet-iň rollaryny we talaplaryny beýan edýän salgylanma çarçuwasy." en="ARF">ARF</Term>{" "}
            atly resminamada jemlenýär (soňky wersiýa 3.0.0, iýul 2026). ARF özbaşdak borçly däl; borçly bolan düzgünnamalardyr.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Almatyda okaýan talyp Berline magistratura üçin ýüz tutýar; Bakudaky kompaniýa Warşawadaky hyzmatdaşy bilen şertnama
              baglaşýar. Ýewropadaky uniwersitetler we banklar ýakyn wagtda resminamalary gapjykdan okap başlar. Türki dünýäniň
              resminamalary şol bir dilde gürlemese, kagyzda galar.
            </p>
          </Callout>
          <h2>Tamga Network bilen baglanyşygy</h2>
          <p>
            Tamga Network ÝB edarasy däl we eIDAS-yň çäginde däl. Emma şol bir arhitekturany bilkastlaýyn ulanýar: resminama
            formatlary, bermek we görkezmek protokollary, ynam sanawlary ÝB standartlarynda. Şeýlelik bilen türki dünýäde berlen
            resminama Ýewropadaky programmalar bilen bilelikde işlemäge laýyk bolýar; bu laýyklyk synaglar bilen görkezilýär.
          </p>
          <p>
            Bilelikde işlemek hukuky taýdan ykrar edilmek däldir. eIDAS-yň 5f maddasy ÝB-niň içindäki edaralaryň ÝB gapjyklaryny
            kabul etmegini düzgünleşdirýär; ÝB-den daşardaky gapjygy ýa-da ynam sanawyny ykrar etmegiň ýoly däl. ÝB-den daşary
            ýurtlar üçin ýeke-täk açyk esas 14-nji maddadyr: diňe ynam hyzmatlaryny (meselem, kwalifisirlenen elektron gol) öz içine
            alýar we Bileleşik bilen şol ýurduň arasynda şertnama talap edýär; onuň taraplary döwletlerdir. Tamga Network şol
            şertnamanyň tarapy bolup bilmeýär. Toruň işi tehniki taýýarlykdyr: ETSI görnüşindäki sanawlar, ETSI profilli
            şahadatnamalar we döwletlere geçirilip bilinjek rollar. Häzir ÝB-däki barlaýjy Tamga resminamalaryny diňe öz islegi
            bilen, ynam sanawymyzy öz ynam çeşmesine goşup kabul edip biler.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Avropa İttifaqında (Aİ) bir tələbə Lissabondan Varşavaya köçəndə diplomunu, tibbi sığortasını və ya bank hesabını yeni
            ölkədə necə sübut edəcək? İllərlə cavab kağız, təsdiqlənmiş surətlər və gözləmə olub. eIDAS Aİ-nin bu suala verdiyi hüquqi cavabdır.
          </p>
          <h2>Bir reqlament, iki nəsil</h2>
          <p>
            eIDAS ingiliscə <em>electronic IDentification, Authentication and trust Services</em> ifadəsinin qısaltmasıdır: elektron
            identifikasiya, autentifikasiya və <Term tip="Elektron imza, möhür və vaxt damğası kimi onlayn mühitdə etibar yaradan xidmətlər. Bu fəslin 3-cü səhifəsində izah olunur.">etibar xidmətləri</Term>.
            İlk nəsil üzv dövlətlərin elektron identifikasiya sxemlərinin bir-birini tanımasını təmin etdi və elektron imzalara
            hüquqi qüvvə verdi. Vətəndaşlara isə ölkədən ölkəyə apara biləcəkləri vahid alət vermədi.
          </p>
          <p>
            İkinci nəsil, yəni eIDAS 2.0, <strong>(Aİ) 2024/1183 saylı Reqlament</strong> kimi 11 aprel 2024-cü ildə qəbul edildi və
            20 may 2024-cü ildə qüvvəyə mindi. Onun ən böyük yeniliyi hər Aİ vətəndaşı üçün rəqəmsal şəxsiyyət cüzdanıdır: EUDI Wallet.
            Aİ reqlamenti olduğu üçün o, milli qanunlarla köçürülməsinə ehtiyac olmadan hər üzv dövlətdə birbaşa tətbiq olunur.
          </p>
          <h2>eIDAS 2.0 nələri əlavə edir</h2>
          <ul>
            <li>
              <strong>Rəqəmsal cüzdan.</strong> İnsanın öz şəxsiyyətini və rəqəmsal sənədlərini saxladığı və kimin nəyi görəcəyinə özünün qərar verdiyi tətbiq.
            </li>
            <li>
              <strong>Elektron attestasiyalar.</strong> Diplomlar, sürücülük vəsiqələri, peşə ixtisasları və ya üzvlüklər üçün hər kəsin
              oxuya biləcəyi ortaq rəqəmsal format. Aİ bunları atributların attestasiyası adlandırır.
            </li>
            <li>
              <strong>Yeni etibar xidmətləri.</strong> Məsələn, kvalifikasiyalı elektron reyestr: qeydlərinin ardıcıllığı və bütövlüyü
              hüquqi cəhətdən təmin olunan reyestr.
            </li>
          </ul>
          <h2>Qaydalar qat-qat necə yazılır</h2>
          <p>
            Reqlament prinsipləri və hüquqları müəyyən edir; texniki təfərrüatları isə Avropa Komissiyasının{" "}
            <Term tip="Əsas reqlamentin məcburi texniki təfərrüatlarını müəyyən edən Komissiya reqlamentləri.">icra aktları</Term> müəyyənləşdirir. İlk paket
            2024-cü ilin noyabrında qəbul edildi: şəxsi identifikasiya məlumatları və attestasiyalar, rəqəmsal cüzdanın əsas funksiyaları,
            bildiriş, sertifikatlaşdırma və protokollar. 2025 və 2026-cı illərdə yeni aktlar və yenilənmələr gəldi.
          </p>
          <p>
            Arxitekturanın özü isə{" "}
            <Term tip="Architecture and Reference Framework: EUDI Wallet-ın rollarını, axınlarını və tələblərini təsvir edən istinad sənədi.">ARF</Term>{" "}
            adlı istinad sənədində təsvir olunur (son versiya 3.0.0, iyul 2026). ARF özlüyündə məcburi deyil; məcburi olan reqlament və
            onun icra aktlarıdır. ARF bunların bir-birinə necə uyğunlaşdığını göstərən ortaq xəritədir; Tamga-nın öz çərçivəsinin
            "Tamga ARF" adlanmasının səbəbi də budur.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Almatıda oxuyan tələbə Berlində magistratura proqramına müraciət edir; Bakıdakı şirkət Varşavadakı tərəfdaşı ilə müqavilə
              imzalayır. Avropadakı universitetlər, banklar və qurumlar tezliklə rəqəmsal sənədləri birbaşa rəqəmsal cüzdanlardan oxuyacaq.
              Türk dünyasından gələn rəqəmsal sənədlər eyni dildə danışmasa, kağız və gözləmə içində qalacaq.
            </p>
          </Callout>
          <h2>Tamga Network ilə əlaqəsi</h2>
          <p>
            Tamga Network Aİ qurumu deyil və eIDAS-ın əhatə dairəsinə daxil deyil. Lakin o, eyni arxitekturadan şüurlu şəkildə istifadə
            edir: rəqəmsal sənəd formatları, rəqəmsal sənədlərin verilməsi və təqdim edilməsi protokolları və etibar siyahıları Aİ
            standartlarına əsaslanır. Buna görə Türk dünyasında verilmiş rəqəmsal sənəd Avropa proqram təminatı ilə işləməyə yararlıdır və
            bu uyğunluq qarşılıqlı işləmə testləri ilə göstərilir. Şəbəkənin mövqeyi bir qərarla müəyyən edilib: əvvəlcə Aİ ilə uyğunluq,
            onun üzərində isə Türk dünyası üçün yüngül etibar şəbəkəsi.
          </p>
          <p>
            Birgə işləmək hüquqi tanınma ilə eyni deyil. eIDAS-ın 5f maddəsi Aİ daxilindəki qurumların Aİ rəqəmsal cüzdanlarını necə qəbul
            etdiyini tənzimləyir; bu, Aİ-dən kənardakı rəqəmsal cüzdanı və ya etibar siyahısını tanımaq yolu deyil. Aİ-dən kənar ölkələr
            üçün yeganə açıq əsas 14-cü maddədir: o, yalnız etibar xidmətlərini (məsələn, kvalifikasiyalı elektron imzaları) əhatə edir və
            İttifaqla həmin ölkə arasında saziş tələb edir; sazişin tərəfləri dövlətlərdir. Tamga Network bu sazişin tərəfi ola bilməz.
            Şəbəkənin işi texniki hazırlıqdır: ETSI formatlarında siyahılar, ETSI profilli sertifikatlar və dövlətlərə təhvil verilə bilən
            rollar. Bu gün Aİ-dəki etibar edən tərəf Tamga rəqəmsal sənədlərini yalnız öz təşəbbüsü ilə, etibar siyahımızı öz etibar
            mənbəyinə əlavə etməklə qəbul edə bilər.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "eIDAS 2.0, Tüzük (AB) 2024/1183'tür; 20 Mayıs 2024'ten beri yürürlükte ve her AB vatandaşına bir dijital kimlik cüzdanı getirir.",
        en: "eIDAS 2.0 is Regulation (EU) 2024/1183; in force since 20 May 2024, it brings a digital identity wallet to every EU citizen.",
        tk: "eIDAS 2.0 — (ÝB) 2024/1183 düzgünnamasy; 2024-nji ýylyň 20-nji maýyndan bäri güýje girdi we her ÝB raýatyna sanly şahsyýet gapjygyny getirýär.",
        az: "eIDAS 2.0 (Aİ) 2024/1183 saylı Reqlamentdir; 20 may 2024-cü ildən qüvvədədir və hər Aİ vətəndaşına rəqəmsal şəxsiyyət cüzdanı gətirir.",
      },
      {
        tr: "Tüzük ilkeleri koyar; teknik ayrıntı uygulama tüzüklerinde, mimari haritası ARF'dedir.",
        en: "The regulation sets the principles; the technical detail sits in the implementing acts, the architectural map in the ARF.",
        tk: "Düzgünnama ýörelgeleri kesgitleýär; tehniki jikme-jiklik ýerine ýetiriş düzgünnamalarynda, arhitektura kartasy ARF-de.",
        az: "Reqlament prinsipləri müəyyən edir; texniki təfərrüatlar icra aktlarında, arxitektura xəritəsi isə ARF-dədir.",
      },
      {
        tr: "Tamga Network AB'nin biçimlerini ve protokollerini kullanır; böylece Türk dünyasının belgeleri Avrupa'da da okunabilir olur.",
        en: "Tamga Network uses the EU's formats and protocols, so credentials from the Turkic world can be read in Europe too.",
        tk: "Tamga Network ÝB-niň formatlaryny we protokollaryny ulanýar; şeýlelik bilen türki dünýäniň resminamalary Ýewropada hem okalýar.",
        az: "Tamga Network Aİ-nin formatlarından və protokollarından istifadə edir, buna görə Türk dünyasından olan rəqəmsal sənədlər Avropada da oxuna bilər.",
      },
    ],
    deeper: [
      {
        label: { tr: "Konumlanma kararı (AB uyumu taban)", en: "The positioning decision (EU compatibility as the base)", tk: "Ýerleşiş karary", az: "Mövqeləndirmə qərarı (əsas kimi Aİ ilə uyğunluq)" },
        href: "/adr/0035-positioning-three-layers",
        kind: "docs",
      },
      {
        label: { tr: "Tamga ARF: mimari ve başvuru çerçevesi", en: "Tamga ARF: architecture and reference framework", tk: "Tamga ARF: arhitektura", az: "Tamga ARF: arxitektura və istinad çərçivəsi" },
        href: "architecture",
        kind: "arf",
      },
      {
        label: { tr: "Kaynaklar: AB tüzükleri ve standartlar", en: "References: EU acts and standards", tk: "Çeşmeler: ÝB düzgünnamalary", az: "İstinadlar: Aİ aktları və standartlar" },
        href: "references",
        kind: "arf",
      },
      {
        label: { tr: "Sonraki: EUDI Wallet nedir?", en: "Next: what is the EUDI Wallet?", tk: "Indiki: EUDI Wallet näme?", az: "Növbəti: EUDI Wallet nədir?" },
        href: "/learn/eudi-wallet",
        kind: "site",
      },
    ],
  },

  /* ================================================================ 4.2 EUDI Wallet */
  {
    slug: "eudi-wallet",
    chapter: 4,
    order: 2,
    minutes: 5,
    title: { tr: "EUDI Wallet nedir?", en: "What is the EUDI Wallet?", tk: "EUDI Wallet näme?", az: "EUDI Wallet nədir?" },
    summary: {
      tr: "Avrupa dijital kimlik cüzdanı nedir, ne değildir; \"AB uyumlu cüzdan\" ile farkı.",
      en: "What the European Digital Identity Wallet is and is not, and how it differs from an \"EU-compatible wallet\".",
      tk: "Ýewropa sanly şahsyýet gapjygy näme we näme däl; \"ÝB bilen laýyk gapjyk\" bilen tapawudy.",
      az: "Avropa Rəqəmsal Şəxsiyyət Cüzdanı nədir və nə deyil, \"Aİ ilə uyğun rəqəmsal cüzdan\"dan nə ilə fərqlənir.",
    },
    body: {
      tr: (
        <>
          <p>
            EUDI Wallet, <em>European Digital Identity Wallet</em>, yani Avrupa dijital kimlik cüzdanıdır. Telefonda çalışan bir
            uygulamadır; içinde kişinin kimliği ve belgeleri durur. Kişi bir siteye giriş yaparken, bir bankada hesap açarken ya da
            bir kapıdan geçerken yalnız istenen bilgiyi, kendi onayıyla gösterir.
          </p>
          <h2>Cüzdanda neler olur</h2>
          <ul>
            <li>
              <strong>Kimlik.</strong> Devletin verdiği{" "}
              <Term tip="Person Identification Data: devletin verdiği temel kimlik verisi (ad, soyad, doğum tarihi gibi). Sonraki sayfada anlatılıyor.">PID</Term>.
            </li>
            <li>
              <strong>Belgeler.</strong> Ehliyet, diploma, meslek belgesi, üyelik gibi kurumların verdiği belgeler.
            </li>
            <li>
              <strong>İmza.</strong> Cüzdan kişinin nitelikli elektronik imza atabilmesini de sağlar; bu imza hukuken ıslak imzaya
              eşdeğerdir.
            </li>
          </ul>
          <h2>Bir unvan, tek bir uygulama değil</h2>
          <p>
            "EUDI Wallet" bir şirketin ürün adı değil, hukuki bir unvandır. Bir AB üye devletinin sunduğu ya da tanıdığı ve AB
            kurallarına göre sertifikalanan cüzdanlar bu adı taşır. Her ülke kendi cüzdanını çıkarır; sertifikalı cüzdanların
            listesini AB yayınlar ve bu cüzdanlar AB'nin güven işaretini kullanabilir.
          </p>
          <p>
            Cüzdan kendini de kanıtlar. Bir kurum belge vermeden önce, karşısındaki uygulamanın gerçekten sertifikalı bir cüzdan
            olduğunu ve anahtarların güvenli yerde durduğunu görmek ister. Bunun için cüzdan iki kanıt taşır:{" "}
            <Term tip="Wallet Instance Attestation: cüzdan sağlayıcısının, bu cüzdan kopyasının gerçek ve güncel olduğunu imzalayan kısa ömürlü kanıtı.">WIA</Term>{" "}
            ve{" "}
            <Term tip="Belgenin bağlanacağı anahtarın hangi güvenli donanımda üretildiğini gösteren kanıt." en="key attestation">anahtar kanıtı</Term>.
            AB bu ikisini 2026'daki güncellemeyle zorunlu hâle getirdi.
          </p>
          <h2>"AB uyumlu cüzdan" ne demek</h2>
          <p>
            AB dışındaki bir kuruluşun cüzdanı EUDI Wallet unvanını alamaz. Ama aynı standartları konuşabilir, aynı belgeleri
            alabilir ve gösterebilir. Buna "AB uyumlu cüzdan" denir; uyum, sertifikayla değil birlikte çalışabilirlik testleriyle
            gösterilir.
          </p>
          <WalletCompare locale="tr" />
          <p>
            Tamga Network'ün ilk cüzdanı olan Tamga Wallet ikinci gruptadır: AB uyumlu bir cüzdandır, ama "EUDI Wallet" ya da
            "ulusal cüzdan" değildir ve öyle tanıtılmaz. Bu kural ağın kararlarında açıkça yazılıdır.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Türk dünyasında devletler kendi cüzdanlarını çıkarabilir. Tamga Network bir cüzdanı
              seçmez, tanır: kurallara uyan ve uyum testlerini geçen her cüzdan ağda çalışır. Taşkent'te bir devlet cüzdanı da,
              Ankara'da Tamga Wallet da aynı belgeyi alıp gösterebilir.
            </p>
          </Callout>
          <h2>Bugün neredeyiz</h2>
          <p>
            AB'nin takvimine göre her üye devlet 2026 sonuna kadar vatandaşlarına en az bir sertifikalı EUDI Wallet sunmuş olmalı.
            Bu sayfa güncellenirken (Ekim 2026) sertifikalı cüzdan henüz yayımlanmamıştı; ülkeler deneme ve sertifikasyon
            aşamasındaydı. Takvimin ayrıntısı bu bölümün son sayfasında.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            The EUDI Wallet is the European Digital Identity Wallet. It is an app on a phone that holds a person's identity and
            credentials. When signing in to a website, opening a bank account or walking through a gate, the person shows only what
            is asked, with their own consent.
          </p>
          <h2>What the wallet holds</h2>
          <ul>
            <li>
              <strong>Identity.</strong> The{" "}
              <Term tip="Person Identification Data: the core identity data issued by the state (name, surname, date of birth and so on). The next page covers it.">PID</Term>{" "}
              issued by the state.
            </li>
            <li>
              <strong>Credentials.</strong> Driving licence, diploma, professional qualification, membership, issued by institutions.
            </li>
            <li>
              <strong>Signature.</strong> The wallet also lets the person create a qualified electronic signature, which has the legal
              effect of a handwritten one.
            </li>
          </ul>
          <h2>A title, not a single app</h2>
          <p>
            "EUDI Wallet" is not a company's product name but a legal title. Wallets that an EU member state offers or recognises,
            and that are certified under EU rules, carry it. Each country brings out its own wallet; the EU publishes the list of
            certified wallets, and those wallets may use the EU trust mark.
          </p>
          <p>
            The wallet also proves itself. Before issuing a credential, an institution wants to see that the app in front of it is a
            genuine certified wallet and that its keys are stored safely. For that the wallet carries two proofs: a{" "}
            <Term tip="Wallet Instance Attestation: a short-lived proof, signed by the wallet provider, that this copy of the wallet is genuine and up to date.">WIA</Term>{" "}
            and a <Term tip="A proof of which secure hardware generated the key that a credential will be bound to.">key attestation</Term>. The EU
            made both mandatory in its 2026 update.
          </p>
          <h2>What an "EU-compatible wallet" means</h2>
          <p>
            A wallet from an organisation outside the EU cannot take the EUDI Wallet title. It can, however, speak the same standards,
            receive the same credentials and present them. That is called an EU-compatible wallet; compatibility is shown through
            interoperability tests rather than certification.
          </p>
          <WalletCompare locale="en" />
          <p>
            Tamga Wallet, the first wallet of Tamga Network, belongs to the second group: an EU-compatible wallet, never presented as
            an "EUDI Wallet" or a "national wallet". The network's decisions state this rule explicitly.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              States in the Turkic world can bring out their own wallets. Tamga Network does not pick a
              wallet; it recognises them: any wallet that follows the rules and passes the conformance tests works on the network. A
              state wallet in Tashkent and Tamga Wallet in Ankara can receive and present the same credential.
            </p>
          </Callout>
          <h2>Where things stand</h2>
          <p>
            Under the EU timeline, every member state must offer its citizens at least one certified EUDI Wallet by the end of 2026.
            When this page was last updated (October 2026), no certified wallet had been published yet; countries were testing and
            going through certification. The last page of this chapter gives the full timeline.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            EUDI Wallet — Ýewropa sanly şahsyýet gapjygy. Bu telefondaky programma bolup, içinde adamyň şahsyýeti we resminamalary
            durýar. Adam sahypa girende, bankda hasap açanda ýa-da derwezeden geçende diňe soralan maglumaty öz razylygy bilen
            görkezýär.
          </p>
          <h2>Gapjykda näme bar</h2>
          <ul>
            <li>
              <strong>Şahsyýet.</strong> Döwletiň berýän{" "}
              <Term tip="Person Identification Data: döwletiň berýän esasy şahsyýet maglumaty (at, familiýa, doglan senesi).">PID</Term>-i.
            </li>
            <li>
              <strong>Resminamalar.</strong> Sürüjilik şahadatnamasy, diplom, hünär resminamasy.
            </li>
            <li>
              <strong>Gol.</strong> Gapjyk kwalifisirlenen elektron gol çekmäge hem mümkinçilik berýär; bu gol hukuk taýdan el
              golunyň deňidir.
            </li>
          </ul>
          <h2>At, ýeke-täk programma däl</h2>
          <p>
            "EUDI Wallet" hukuk adydyr: ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän we ÝB düzgünleri boýunça sertifikatlanan
            gapjyklary bu ady göterýär. ÝB sertifikatly gapjyklaryň sanawyny çap edýär. Gapjyk özüni hem subut edýär:{" "}
            <Term tip="Wallet Instance Attestation: gapjyk nusgasynyň hakyky we täze bolandygyny tassyklaýan gysga möhletli subutnama.">WIA</Term>{" "}
            we <Term tip="Açaryň haýsy howpsuz enjamda döredilendigini görkezýän subutnama." en="key attestation">açar subutnamasy</Term>.
          </p>
          <h2>"ÝB bilen laýyk gapjyk" näme</h2>
          <p>
            ÝB-den daşardaky guramanyň gapjygy EUDI Wallet adyny alyp bilmeýär, emma şol bir standartlarda gürläp bilýär. Laýyklyk
            sertifikat bilen däl-de, bilelikde işleýiş synaglary bilen görkezilýär.
          </p>
          <WalletCompare locale="tk" />
          <p>
            Tamga Network-yň ilkinji gapjygy Tamga Wallet ikinji topara degişli: ÝB bilen laýyk gapjyk, emma "EUDI Wallet" ýa-da
            "milli gapjyk" däl.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Türki dünýäde döwletler öz gapjyklaryny çykaryp biler. Tamga Network gapjyk saýlamaýar, ykrar edýär: düzgünlere
              eýerýän her gapjyk torda işleýär.
            </p>
          </Callout>
          <h2>Häzir nirede</h2>
          <p>
            ÝB senenamasyna görä her agza döwlet 2026-njy ýylyň ahyryna çenli iň bolmanda bir sertifikatly EUDI Wallet hödürlemeli.
            Bu sahypa täzelenende (oktýabr 2026) sertifikatly gapjyk entek çap edilmändi.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            EUDI Wallet European Digital Identity Wallet, yəni Avropa rəqəmsal şəxsiyyət cüzdanıdır. Bu, telefonda işləyən və insanın
            şəxsiyyətini və rəqəmsal sənədlərini saxlayan tətbiqdir. İnsan vebsayta daxil olarkən, bankda hesab açarkən və ya keçid
            məntəqəsindən keçərkən yalnız tələb olunanı, öz razılığı ilə göstərir.
          </p>
          <h2>Rəqəmsal cüzdanda nələr saxlanılır</h2>
          <ul>
            <li>
              <strong>Şəxsiyyət.</strong> Dövlətin verdiyi{" "}
              <Term tip="Person Identification Data: dövlətin verdiyi əsas şəxsiyyət məlumatları (ad, soyad, doğum tarixi və s.). Növbəti səhifədə izah olunur.">PID</Term>{" "}
              məlumatları.
            </li>
            <li>
              <strong>Rəqəmsal sənədlər.</strong> Qurumların verdiyi sürücülük vəsiqəsi, diplom, peşə ixtisası, üzvlük.
            </li>
            <li>
              <strong>İmza.</strong> Rəqəmsal cüzdan həm də insana kvalifikasiyalı elektron imza yaratmağa imkan verir; bu imza əl ilə
              atılmış imza ilə eyni hüquqi qüvvəyə malikdir.
            </li>
          </ul>
          <h2>Tək bir tətbiq deyil, hüquqi status</h2>
          <p>
            "EUDI Wallet" hər hansı şirkətin məhsul adı deyil, hüquqi statusdur. Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı və Aİ
            qaydalarına əsasən sertifikatlaşdırılmış rəqəmsal cüzdanlar bu statusu daşıyır. Hər ölkə öz rəqəmsal cüzdanını buraxır; Aİ
            sertifikatlaşdırılmış rəqəmsal cüzdanların siyahısını dərc edir və bu cüzdanlar Aİ etibar nişanından istifadə edə bilər.
          </p>
          <p>
            Rəqəmsal cüzdan özünü də sübut edir. Rəqəmsal sənəd verməzdən əvvəl qurum qarşısındakı tətbiqin həqiqətən sertifikatlaşdırılmış
            rəqəmsal cüzdan olduğunu və açarlarının təhlükəsiz saxlandığını görmək istəyir. Bunun üçün rəqəmsal cüzdan iki sübut daşıyır:{" "}
            <Term tip="Wallet Instance Attestation: cüzdan provayderinin imzaladığı, rəqəmsal cüzdanın bu nüsxəsinin həqiqi və aktual olduğunu göstərən qısamüddətli sübut.">WIA</Term>{" "}
            və <Term tip="Rəqəmsal sənədin bağlanacağı açarın hansı təhlükəsiz aparatda yaradıldığını göstərən sübut.">açar attestasiyası</Term>. Aİ
            2026-cı il yenilənməsində hər ikisini məcburi etdi.
          </p>
          <h2>"Aİ ilə uyğun rəqəmsal cüzdan" nə deməkdir</h2>
          <p>
            Aİ-dən kənar təşkilatın rəqəmsal cüzdanı EUDI Wallet statusunu ala bilməz. Lakin o, eyni standartlarla işləyə, eyni rəqəmsal
            sənədləri qəbul edə və təqdim edə bilər. Buna Aİ ilə uyğun rəqəmsal cüzdan deyilir; uyğunluq sertifikatlaşdırma ilə deyil,
            qarşılıqlı işləmə testləri ilə göstərilir.
          </p>
          <WalletCompare locale="az" />
          <p>
            Tamga Network-un ilk rəqəmsal cüzdanı olan Tamga Wallet ikinci qrupa aiddir: Aİ ilə uyğun rəqəmsal cüzdandır və heç vaxt
            "EUDI Wallet" və ya "milli cüzdan" kimi təqdim edilmir. Şəbəkənin qərarlarında bu qayda açıq şəkildə yazılıb.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Türk dünyasındakı dövlətlər öz rəqəmsal cüzdanlarını buraxa bilər. Tamga Network rəqəmsal cüzdan
              seçmir, onları tanıyır: qaydalara əməl edən və uyğunluq testlərindən keçən istənilən rəqəmsal cüzdan şəbəkədə işləyir.
              Daşkənddəki dövlət cüzdanı da, Ankaradakı Tamga Wallet da eyni rəqəmsal sənədi qəbul edib təqdim edə bilər.
            </p>
          </Callout>
          <h2>Hazırkı vəziyyət</h2>
          <p>
            Aİ təqviminə əsasən, hər üzv dövlət 2026-cı ilin sonunadək vətəndaşlarına ən azı bir sertifikatlaşdırılmış EUDI Wallet təqdim
            etməlidir. Bu səhifə sonuncu dəfə yenilənəndə (oktyabr 2026) hələ heç bir sertifikatlaşdırılmış rəqəmsal cüzdan dərc
            edilməmişdi; ölkələr sınaq və sertifikatlaşdırma mərhələsində idi. Təqvimin tam təsviri bu fəslin son səhifəsindədir.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "EUDI Wallet bir uygulama adı değil, hukuki bir unvandır: AB üye devletinin sunduğu ya da tanıdığı, sertifikalı cüzdan.",
        en: "The EUDI Wallet is not an app name but a legal title: a certified wallet that an EU member state offers or recognises.",
        tk: "EUDI Wallet programma ady däl, hukuk adydyr: ÝB agza döwletiniň hödürleýän ýa-da ykrar edýän sertifikatly gapjygy.",
        az: "EUDI Wallet tətbiq adı deyil, hüquqi statusdur: Aİ üzv dövlətinin təqdim etdiyi və ya tanıdığı sertifikatlaşdırılmış rəqəmsal cüzdan.",
      },
      {
        tr: "AB dışındaki cüzdanlar \"AB uyumlu\" olabilir: aynı standartlar, uyum testlerle gösterilir.",
        en: "Wallets outside the EU can be \"EU-compatible\": the same standards, with compatibility shown through tests.",
        tk: "ÝB-den daşardaky gapjyklar \"ÝB bilen laýyk\" bolup biler: şol bir standartlar, laýyklyk synaglar bilen görkezilýär.",
        az: "Aİ-dən kənar rəqəmsal cüzdanlar \"Aİ ilə uyğun\" ola bilər: eyni standartlar, uyğunluq isə testlərlə göstərilir.",
      },
      {
        tr: "Tamga Wallet ağın ilk cüzdanıdır ve AB uyumludur; Tamga Network kurallara uyan her cüzdanı tanır.",
        en: "Tamga Wallet is the network's first wallet and is EU-compatible; Tamga Network recognises every wallet that follows its rules.",
        tk: "Tamga Wallet toruň ilkinji gapjygy we ÝB bilen laýyk; Tamga Network düzgünlere eýerýän her gapjygy ykrar edýär.",
        az: "Tamga Wallet şəbəkənin ilk rəqəmsal cüzdanıdır və Aİ ilə uyğundur; Tamga Network öz qaydalarına əməl edən hər rəqəmsal cüzdanı tanıyır.",
      },
    ],
    deeper: [
      {
        label: { tr: "Cüzdan sağlayıcılarının kuralları (Tamga Rulebook)", en: "Rules for wallet providers (Tamga Rulebook)", tk: "Gapjyk üpjün edijileriň düzgünleri", az: "Cüzdan provayderləri üçün qaydalar (Tamga Rulebook)" },
        href: "rulebook",
        kind: "arf",
      },
      {
        label: { tr: "Cüzdan ve anahtar kanıtı kararı", en: "The wallet and key attestation decision", tk: "Gapjyk we açar subutnamasy karary", az: "Rəqəmsal cüzdan və açar attestasiyası qərarı" },
        href: "/adr/0025-wallet-instance-and-key-attestations",
        kind: "docs",
      },
      {
        label: { tr: "Rehber: uyumlu cüzdan geliştirmek", en: "Guide: building a compatible wallet", tk: "Gollanma: laýyk gapjyk döretmek", az: "Bələdçi: uyğun rəqəmsal cüzdan hazırlamaq" },
        href: "/guides/build-a-wallet",
        kind: "docs",
      },
      {
        label: { tr: "İlk cüzdan: Tamga Wallet", en: "The first wallet: Tamga Wallet", tk: "Ilkinji gapjyk: Tamga Wallet", az: "İlk rəqəmsal cüzdan: Tamga Wallet" },
        href: "/learn/first-wallet",
        kind: "site",
      },
    ],
  },

  /* ================================================================ 4.3 Güven hizmetleri */
  {
    slug: "trust-services",
    chapter: 4,
    order: 3,
    minutes: 6,
    title: { tr: "Güven hizmetleri", en: "Trust services", tk: "Ynam hyzmatlary", az: "Etibar xidmətləri" },
    summary: {
      tr: "QTSP, nitelikli elektronik imza (QES), nitelikli belgeler ve Avrupa'nın güven listeleri.",
      en: "QTSPs, qualified electronic signatures (QES), qualified attestations and Europe's trusted lists.",
      tk: "QTSP, kwalifisirlenen elektron gol (QES), kwalifisirlenen resminamalar we Ýewropanyň ynam sanawlary.",
      az: "QTSP-lər, kvalifikasiyalı elektron imzalar (QES), kvalifikasiyalı attestasiyalar və Avropanın etibar siyahıları.",
    },
    diagram: "trust-chain",
    body: {
      tr: (
        <>
          <p>
            Kâğıt dünyasında güveni noter, ıslak imza, kaşe ve iadeli taahhütlü mektup sağlar. Dijital dünyada bu işi{" "}
            <Term tip="Dijital dünyada güven sağlayan hizmetler: elektronik imza, elektronik mühür, zaman damgası, kayıtlı teslim, web sitesi doğrulama ve benzerleri." en="trust services">güven hizmetleri</Term>{" "}
            yapar: bir belgeyi kimin imzaladığını, ne zaman var olduğunu, yolda değişip değişmediğini gösteren hizmetler.
          </p>
          <h2>İmzanın üç seviyesi</h2>
          <p>
            eIDAS elektronik imzayı üç seviyede tanır. <strong>Basit</strong> elektronik imza bir e-postanın altındaki ad bile
            olabilir. <strong>Gelişmiş</strong> imza, imzalayana bağlı ve değişikliği ortaya çıkaran kriptografik bir imzadır.{" "}
            <strong>Nitelikli</strong> elektronik imza, yani{" "}
            <Term tip="Qualified Electronic Signature: nitelikli bir sertifikaya dayanan ve güvenli bir imza aracında üretilen imza; hukuken ıslak imzaya eşdeğerdir.">QES</Term>,
            en yüksek seviyedir ve hukuken ıslak imzaya eşdeğerdir. Nitelikli imzanın anahtarı, ele geçirilemeyen güvenli bir
            donanımda durur.
          </p>
          <h2>Nitelikli olan ve olmayan</h2>
          <p>
            Güven hizmeti sunan her kuruluş "nitelikli" değildir. Nitelikli unvanı almak için kuruluş bağımsız bir uygunluk
            değerlendirmesinden geçer, ulusal bir denetim kurumunun gözetimine girer ve düzenli olarak yeniden denetlenir. Bu
            kuruluşlara{" "}
            <Term tip="Qualified Trust Service Provider: bağımsız değerlendirmeden geçmiş ve ulusal denetim kurumunun gözetimindeki güven hizmeti sağlayıcısı.">QTSP</Term>{" "}
            denir. Nitelikli bir hizmetin verdiği kanıt, mahkemede ve kurumlarda daha güçlü bir hukuki ağırlık taşır.
          </p>
          <h2>Kim nitelikli: güven listeleri</h2>
          <p>
            Bir doğrulayıcı, karşısındaki imzanın gerçekten nitelikli bir sağlayıcıdan geldiğini nereden bilir? Her AB üye devleti
            kendi nitelikli sağlayıcılarını imzalı bir{" "}
            <Term tip="Hangi kuruluşların güvenilir olduğunu, anahtarlarıyla birlikte gösteren, imzalı ve sürümlü liste." en="trust list">güven listesinde</Term>{" "}
            yayınlar; biçimi ETSI TS 119 612 standardıdır. Avrupa Komisyonu da bu ülke listelerinin listesini yayınlar:{" "}
            <Term tip="List of Trusted Lists: bütün ülke listelerini adresleri ve imzacılarıyla gösteren üst liste.">LOTL</Term>. Yukarıdaki şema aynı
            zincirin Tamga'daki karşılığını gösteriyor: listelerin listesi, ülke listesi, kurum, belge.
          </p>
          <h2>eIDAS 2.0'ın yenilikleri</h2>
          <ul>
            <li>
              <strong>Nitelikli belgeler.</strong> QTSP'ler artık bir kişinin niteliğini, örneğin bir mesleği ya da bir yetkiyi,
              nitelikli bir belgeyle onaylayabilir. Bunun adı{" "}
              <Term tip="Qualified Electronic Attestation of Attributes: QTSP'nin verdiği, hukuki ağırlığı yüksek nitelik belgesi.">QEAA</Term>; bir sonraki
              sayfada öbür belge türleriyle karşılaştırılıyor.
            </li>
            <li>
              <strong>Nitelikli elektronik defter.</strong> Kayıtların sırasını ve bütünlüğünü hukuken güvenceye alan bir defter
              hizmeti. Ortak defter (blockchain) bölümünde Tamga'nın bu konudaki yolu anlatılıyor.
            </li>
          </ul>
          <Callout kind="turkic" locale="tr">
            <p>
              Tamga Network aynı modeli Türk dünyası için kurar: bugün Türkiye listesi, ileride her Türk devletinin kendi listesi ve
              hepsini gösteren bir listelerin listesi. Ağ, AB'nin güncel liste biçimini (ETSI TS 119 602) de okur; böylece AB
              listeleri ağda "dış liste" olarak gösterilebilir. Tamga'nın kendi kimlik servisi ise bugün nitelikli değildir: bağımsız
              değerlendirmeden geçmediği için güven listesinde nitelikli olmayan bir belge veren olarak kayıtlıdır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            In the paper world trust comes from notaries, handwritten signatures, stamps and registered letters. Online, that job
            belongs to <Term tip="Services that create trust online: electronic signatures, electronic seals, timestamps, registered delivery, website authentication and the like.">trust services</Term>:
            services that show who signed a document, when it existed and whether it changed along the way.
          </p>
          <h2>Three levels of signature</h2>
          <p>
            eIDAS recognises electronic signatures at three levels. A <strong>simple</strong> electronic signature can be just the
            name at the bottom of an email. An <strong>advanced</strong> signature is a cryptographic signature linked to the signer
            that reveals any change. A <strong>qualified</strong> electronic signature, or{" "}
            <Term tip="Qualified Electronic Signature: a signature based on a qualified certificate and created on a secure signing device; legally equivalent to a handwritten signature.">QES</Term>,
            is the highest level and has the legal effect of a handwritten signature. Its key lives in secure hardware that cannot be
            copied.
          </p>
          <h2>Qualified and non-qualified</h2>
          <p>
            Not every provider of trust services is "qualified". To earn the title, an organisation passes an independent conformity
            assessment, comes under the supervision of a national body and is re-assessed regularly. These organisations are called{" "}
            <Term tip="Qualified Trust Service Provider: a trust service provider that has passed independent assessment and is supervised by a national body.">QTSPs</Term>.
            Evidence from a qualified service carries more legal weight in courts and institutions.
          </p>
          <h2>Who is qualified: trusted lists</h2>
          <p>
            How does a verifier know that a signature really comes from a qualified provider? Each EU member state publishes its
            qualified providers in a signed{" "}
            <Term tip="A signed, versioned list showing which organisations are trusted, together with their keys.">trusted list</Term>, in the ETSI TS 119 612
            format. The European Commission publishes the list of those national lists, the{" "}
            <Term tip="List of Trusted Lists: the top-level list that points to every national list with its address and signer.">LOTL</Term>. The diagram above
            shows the same chain as Tamga uses it: the list of lists, a national list, an institution, a credential.
          </p>
          <h2>What eIDAS 2.0 adds</h2>
          <ul>
            <li>
              <strong>Qualified attestations.</strong> QTSPs can now confirm a person's attribute, such as a profession or a mandate,
              with a qualified credential called a{" "}
              <Term tip="Qualified Electronic Attestation of Attributes: an attribute attestation issued by a QTSP, with strong legal weight.">QEAA</Term>. The
              next page compares it with the other kinds.
            </li>
            <li>
              <strong>Qualified electronic ledgers.</strong> A ledger service that legally assures the order and integrity of records.
              The chapter on shared ledgers explains Tamga's path here.
            </li>
          </ul>
          <Callout kind="turkic" locale="en">
            <p>
              Tamga Network builds the same model for the Turkic world: today a list for Türkiye, later each Turkic state's own list,
              and a list of lists that shows them all. The network also reads the EU's current list format (ETSI TS 119 602), so EU
              lists can appear on the network as "external lists". Tamga's own identity service is not qualified today: it has not been
              independently assessed, so it is registered in the trust list as a non-qualified issuer.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Kagyz dünýäsinde ynamy notarius, el goly, möhür we hasaba alnan hat üpjün edýär. Sanly dünýäde bu işi{" "}
            <Term tip="Sanly dünýäde ynam döredýän hyzmatlar: elektron gol, elektron möhür, wagt belligi we ş.m." en="trust services">ynam hyzmatlary</Term>{" "}
            edýär: resminama kimiň gol çekendigini, haçan bolandygyny we üýtgemändigini görkezýär.
          </p>
          <h2>Golyň üç derejesi</h2>
          <p>
            eIDAS elektron goly üç derejede ykrar edýär: ýönekeý, ösen we kwalifisirlenen.{" "}
            <Term tip="Qualified Electronic Signature: kwalifisirlenen sertifikata esaslanýan we howpsuz enjamda döredilen gol; el golunyň deňi.">QES</Term>{" "}
            iň ýokary derejedir we hukuk taýdan el golunyň deňidir.
          </p>
          <h2>Kwalifisirlenen we däl</h2>
          <p>
            Kwalifisirlenen ady almak üçin gurama garaşsyz bahalandyrmadan geçýär we milli gözegçilik edarasynyň gözegçiligine
            girýär. Bu guramalara{" "}
            <Term tip="Qualified Trust Service Provider: garaşsyz bahalandyrmadan geçen we milli gözegçilikdäki ynam hyzmaty üpjün edijisi.">QTSP</Term>{" "}
            diýilýär.
          </p>
          <h2>Kim kwalifisirlenen: ynam sanawlary</h2>
          <p>
            Her agza döwlet öz kwalifisirlenen üpjün edijilerini gol çekilen{" "}
            <Term tip="Haýsy guramalaryň ynamdardygyny açarlary bilen görkezýän gol çekilen sanaw." en="trust list">ynam sanawynda</Term>{" "}
            çap edýär (ETSI TS 119 612). Ýewropa Komissiýasy bu sanawlaryň sanawyny,{" "}
            <Term tip="List of Trusted Lists: ähli milli sanawlary görkezýän ýokary sanaw.">LOTL</Term>-y çap edýär.
          </p>
          <h2>eIDAS 2.0-yň täzelikleri</h2>
          <ul>
            <li>
              <strong>Kwalifisirlenen resminamalar</strong> (<Term tip="QTSP-niň berýän, hukuk taýdan agramly häsiýet resminamasy.">QEAA</Term>).
            </li>
            <li>
              <strong>Kwalifisirlenen elektron kitap:</strong> ýazgylaryň tertibini we bitewüligini hukuk taýdan kepillendirýän
              hyzmat.
            </li>
          </ul>
          <Callout kind="turkic" locale="tk">
            <p>
              Tamga Network şol bir modeli türki dünýä üçin gurýar: häzir Türkiýäniň sanawy, soňra her türki döwletiň öz sanawy we
              olaryň hemmesini görkezýän sanawlaryň sanawy. Tor ÝB-niň häzirki sanaw formatyny (ETSI TS 119 602) hem okaýar.
              Tamga-nyň şahsyýet hyzmaty häzir kwalifisirlenen däl.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Kağız dünyasında etibarı notariuslar, əl imzaları, möhürlər və sifarişli məktublar təmin edir. Onlayn mühitdə bu iş
            <Term tip="Onlayn mühitdə etibar yaradan xidmətlər: elektron imzalar, elektron möhürlər, vaxt damğaları, qeydiyyatlı çatdırılma, vebsayt autentifikasiyası və s.">etibar xidmətlərinin</Term> üzərinə düşür:
            sənədi kimin imzaladığını, nə vaxt mövcud olduğunu və yolda dəyişib-dəyişmədiyini göstərən xidmətlər.
          </p>
          <h2>İmzanın üç səviyyəsi</h2>
          <p>
            eIDAS elektron imzaları üç səviyyədə tanıyır. <strong>Sadə</strong> elektron imza e-poçtun sonundakı ad da ola bilər.
            <strong>Təkmil</strong> imza imzalayana bağlı olan və istənilən dəyişikliyi üzə çıxaran kriptoqrafik imzadır.
            <strong>Kvalifikasiyalı</strong> elektron imza, yəni{" "}
            <Term tip="Qualified Electronic Signature: kvalifikasiyalı sertifikata əsaslanan və təhlükəsiz imza vasitəsində yaradılan imza; hüquqi cəhətdən əl imzasına bərabərdir.">QES</Term>,
            ən yüksək səviyyədir və əl imzası ilə eyni hüquqi qüvvəyə malikdir. Onun açarı surəti çıxarıla bilməyən təhlükəsiz aparatda
            saxlanılır.
          </p>
          <h2>Kvalifikasiyalı və qeyri-kvalifikasiyalı</h2>
          <p>
            Etibar xidmətləri göstərən hər provayder "kvalifikasiyalı" deyil. Bu statusu almaq üçün təşkilat müstəqil uyğunluq
            qiymətləndirməsindən keçir, milli orqanın nəzarəti altına düşür və mütəmadi olaraq yenidən qiymətləndirilir. Belə təşkilatlar{" "}
            <Term tip="Qualified Trust Service Provider: müstəqil qiymətləndirmədən keçmiş və milli orqanın nəzarəti altında olan etibar xidməti provayderi.">QTSP</Term> adlanır.
            Kvalifikasiyalı xidmətin verdiyi sübut məhkəmələrdə və qurumlarda daha böyük hüquqi çəkiyə malikdir.
          </p>
          <h2>Kim kvalifikasiyalıdır: etibar siyahıları</h2>
          <p>
            Yoxlayan tərəf imzanın həqiqətən kvalifikasiyalı provayderdən gəldiyini haradan bilir? Hər Aİ üzv dövləti öz kvalifikasiyalı
            provayderlərini ETSI TS 119 612 formatında imzalanmış{" "}
            <Term tip="Hansı təşkilatlara etibar edildiyini onların açarları ilə birlikdə göstərən, imzalanmış və versiyalaşdırılmış siyahı.">etibar siyahısında</Term> dərc edir.
            Avropa Komissiyası bu milli siyahıların siyahısını,{" "}
            <Term tip="List of Trusted Lists: hər bir milli siyahıya ünvanı və imzalayanı ilə istinad edən yuxarı səviyyəli siyahı.">LOTL</Term>-u dərc edir. Yuxarıdakı diaqram
            eyni zənciri Tamga-da istifadə olunduğu şəkildə göstərir: siyahıların siyahısı, milli siyahı, qurum, rəqəmsal sənəd.
          </p>
          <h2>eIDAS 2.0 nələri əlavə edir</h2>
          <ul>
            <li>
              <strong>Kvalifikasiyalı attestasiyalar.</strong> QTSP-lər indi insanın peşəsi və ya səlahiyyəti kimi atributunu{" "}
              <Term tip="Qualified Electronic Attestation of Attributes: QTSP-nin verdiyi, güclü hüquqi qüvvəyə malik atribut attestasiyası.">QEAA</Term> adlanan
              kvalifikasiyalı rəqəmsal sənədlə təsdiq edə bilər. Növbəti səhifə onu digər növlərlə müqayisə edir.
            </li>
            <li>
              <strong>Kvalifikasiyalı elektron reyestrlər.</strong> Qeydlərin ardıcıllığını və bütövlüyünü hüquqi cəhətdən təmin edən reyestr
              xidməti. Ortaq reyestrlərə həsr olunmuş fəsil Tamga-nın bu sahədəki yolunu izah edir.
            </li>
          </ul>
          <Callout kind="turkic" locale="az">
            <p>
              Tamga Network Türk dünyası üçün eyni modeli qurur: bu gün Türkiyə üçün siyahı, sonra hər türk dövlətinin öz siyahısı və
              onların hamısını göstərən siyahıların siyahısı. Şəbəkə Aİ-nin mövcud siyahı formatını (ETSI TS 119 602) da oxuyur, buna görə
              Aİ siyahıları şəbəkədə "xarici siyahılar" kimi göstərilə bilər. Tamga-nın öz şəxsiyyət xidməti bu gün kvalifikasiyalı deyil:
              müstəqil qiymətləndirmədən keçməyib, buna görə etibar siyahısında qeyri-kvalifikasiyalı sənədi verən qurum kimi qeydiyyatdadır.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Güven hizmetleri dijital dünyanın noteri ve kaşesidir; nitelikli elektronik imza (QES) hukuken ıslak imzaya eşdeğerdir.",
        en: "Trust services are the online world's notary and stamp; a qualified electronic signature (QES) has the legal effect of a handwritten one.",
        tk: "Ynam hyzmatlary sanly dünýäniň notariusy we möhrüdir; kwalifisirlenen elektron gol (QES) el golunyň deňidir.",
        az: "Etibar xidmətləri onlayn dünyanın notariusu və möhürüdür; kvalifikasiyalı elektron imza (QES) əl imzası ilə eyni hüquqi qüvvəyə malikdir.",
      },
      {
        tr: "Nitelikli sağlayıcılar (QTSP) bağımsız değerlendirmeden geçer ve ülkelerin imzalı güven listelerinde yayınlanır.",
        en: "Qualified providers (QTSPs) pass independent assessment and are published in the member states' signed trusted lists.",
        tk: "Kwalifisirlenen üpjün edijiler (QTSP) garaşsyz bahalandyrmadan geçýär we gol çekilen ynam sanawlarynda çap edilýär.",
        az: "Kvalifikasiyalı provayderlər (QTSP) müstəqil qiymətləndirmədən keçir və üzv dövlətlərin imzalanmış etibar siyahılarında dərc olunur.",
      },
      {
        tr: "Tamga Network aynı zinciri kurar: listelerin listesi, ülke listeleri, kurumlar; AB listeleri dış liste olarak okunabilir.",
        en: "Tamga Network builds the same chain: a list of lists, national lists, institutions; EU lists can be read as external lists.",
        tk: "Tamga Network şol bir zynjyry gurýar: sanawlaryň sanawy, milli sanawlar, guramalar; ÝB sanawlary daşky sanaw hökmünde okalýar.",
        az: "Tamga Network eyni zənciri qurur: siyahıların siyahısı, milli siyahılar, qurumlar; Aİ siyahıları xarici siyahılar kimi oxuna bilər.",
      },
    ],
    deeper: [
      {
        label: { tr: "Kavram: güven listeleri ve federasyon", en: "Concept: trust lists and federation", tk: "Düşünje: ynam sanawlary", az: "Anlayış: etibar siyahıları və federasiya" },
        href: "/concepts/trust-lists",
        kind: "docs",
      },
      {
        label: { tr: "Şartname: güven listeleri", en: "Specification: trust lists", tk: "Şertnama: ynam sanawlary", az: "Spesifikasiya: etibar siyahıları" },
        href: "/specifications/trust-lists",
        kind: "docs",
      },
      {
        label: { tr: "Trust Framework: kim katılır, kim denetler", en: "Trust Framework: who joins, who supervises", tk: "Trust Framework", az: "Trust Framework: kim qoşulur, kim nəzarət edir" },
        href: "trust-framework",
        kind: "arf",
      },
      {
        label: { tr: "Kimlik servisinin sınıfı kararı", en: "The identity service's class decision", tk: "Şahsyýet hyzmatynyň synpy", az: "Şəxsiyyət xidmətinin sinfi haqqında qərar" },
        href: "/adr/0022-identity-service-non-qualified",
        kind: "docs",
      },
    ],
  },

  /* ================================================================ 4.4 PID, EAA, QEAA */
  {
    slug: "pid-and-attestations",
    chapter: 4,
    order: 4,
    minutes: 5,
    title: { tr: "PID, EAA, QEAA", en: "PID, EAA, QEAA", tk: "PID, EAA, QEAA", az: "PID, EAA, QEAA" },
    summary: {
      tr: "Kişi kimlik verisi (PID) ve öbür belge türleri (EAA, QEAA, PuB-EAA) arasındaki fark.",
      en: "The difference between person identification data (PID) and the other kinds of attestation (EAA, QEAA, PuB-EAA).",
      tk: "Adamyň şahsyýet maglumaty (PID) bilen beýleki resminama görnüşleriniň (EAA, QEAA, PuB-EAA) arasyndaky tapawut.",
      az: "Şəxsi identifikasiya məlumatları (PID) ilə digər attestasiya növləri (EAA, QEAA, PuB-EAA) arasındakı fərq.",
    },
    diagram: "credential",
    body: {
      tr: (
        <>
          <p>
            Cüzdandaki her belge aynı ağırlıkta değildir. Bir konser bileti ile kimlik kartı, ikisi de cüzdanda durur ama biri
            kapıdan geçmeye yeter, öbürü banka hesabı açmaya. AB bu farkı dört belge türüyle adlandırır.
          </p>
          <h2>Dört tür</h2>
          <AttestationTypes locale="tr" />
          <ul>
            <li>
              <strong>
                <Term tip="Person Identification Data: devletin ya da devlet adına yetkili bir kurumun verdiği temel kimlik verisi.">PID</Term>
              </strong>{" "}
              kişinin temel kimliğidir: ad, soyad, doğum tarihi gibi alanlar. Devlet ya da devletin yetkilendirdiği kurum verir. AB,
              2028'den itibaren portreyi de PID'in zorunlu alanı yapıyor.
            </li>
            <li>
              <strong>
                <Term tip="Electronic Attestation of Attributes: kişinin bir niteliğini (öğrenci olmak, bilet sahibi olmak gibi) gösteren elektronik belge.">EAA</Term>
              </strong>{" "}
              kişinin bir niteliğini gösteren belgedir: öğrenci olmak, bir etkinliğe biletli olmak, bir derneğe üye olmak. Her kurum
              EAA verebilir.
            </li>
            <li>
              <strong>QEAA</strong>, nitelikli bir güven hizmeti sağlayıcısının (QTSP) verdiği EAA'dır. Hukuki ağırlığı yüksektir.
            </li>
            <li>
              <strong>PuB-EAA</strong>, bir kamu kurumunun, kendi sorumluluğundaki{" "}
              <Term tip="Bir bilginin resmî kaydının tutulduğu yer; örneğin nüfus kaydı ya da üniversitenin öğrenci kaydı." en="authentic source">yetkili kaynaktan</Term>{" "}
              verdiği belgedir. Örneğin bir bakanlığın kendi sicilinden verdiği bir meslek kaydı.
            </li>
          </ul>
          <h2>Ayrım neden önemli</h2>
          <p>
            Doğrulayıcı, karşısındaki belgeye ne kadar güvenebileceğini türünden anlar. Hesap açan bir banka kişinin kimliğinden emin
            olmak zorundadır; PID ister. Bir konser kapısı için bilet, yani bir EAA yeter. Bir hastane bir hekimin yetkisini
            görmek isterse daha güçlü bir belgeyi, QEAA ya da PuB-EAA'yı tercih eder. Tür bilgisi böylece "kime ne kadar güven"
            sorusunu baştan cevaplar.
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              Bakü'de okuyan bir öğrenci Bişkek'teki bir yaz okuluna katılıyor. Kapıda öğrenci indirimi için öğrenci belgesi (EAA)
              yeter; yurt girişinde kimlik gerekir. Kimlik için ülkesinin devlet PID'i varsa o kullanılır; yoksa geçici bir çözüm
              gerekir. Tamga'nın kimlik belgesi tam bu boşluk için var.
            </p>
          </Callout>
          <h2>Tamga'da karşılıkları</h2>
          <p>
            Tamga Network'teki diploma, öğrenci belgesi ve etkinlik bileti birer EAA'dır. Tamga'nın kimlik belgesi ise PID değildir:
            devletlerin PID'i gelene kadar kullanılan, nitelikli olmayan, geçici bir kimlik belgesidir ve öyle anılır. Bir devlet
            kendi PID'ini verdiğinde onun yerini PID alır.
          </p>
          <p>
            Ağ, AB'nin belgelerini de tanıyabilir. Federasyon kurallarıyla AB PID'i ve{" "}
            <Term tip="mobile Driving Licence: ISO 18013-5 standardındaki mobil sürücü belgesi.">mDL</Term> (mobil sürücü belgesi), ağda "dış belge türü"
            olarak doğrulanabilir; hangi dış listeye güvenileceğine ise her seferinde ayrı bir onayla karar verilir.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Not every credential in a wallet carries the same weight. A concert ticket and an identity card both sit in the wallet,
            but one gets you through a gate and the other opens a bank account. The EU names that difference with four kinds of
            attestation.
          </p>
          <h2>Four kinds</h2>
          <AttestationTypes locale="en" />
          <ul>
            <li>
              <strong>
                <Term tip="Person Identification Data: core identity data issued by the state or a body authorised on its behalf.">PID</Term>
              </strong>{" "}
              is a person's core identity: name, surname, date of birth and similar fields. The state, or a body it authorises, issues
              it. From 2028 the EU also makes the portrait a mandatory PID field.
            </li>
            <li>
              <strong>
                <Term tip="Electronic Attestation of Attributes: an electronic credential showing one of a person's attributes, such as being a student or holding a ticket.">EAA</Term>
              </strong>{" "}
              shows an attribute of the person: being a student, holding a ticket for an event, being a member of an association.
              Any organisation can issue an EAA.
            </li>
            <li>
              <strong>QEAA</strong> is an EAA issued by a qualified trust service provider (QTSP). It carries strong legal weight.
            </li>
            <li>
              <strong>PuB-EAA</strong> is an attestation a public body issues from an{" "}
              <Term tip="The place where the official record of a piece of information is kept, such as a population register or a university's student register.">authentic source</Term>{" "}
              it is responsible for, for example a professional registration issued by a ministry from its own register.
            </li>
          </ul>
          <h2>Why the distinction matters</h2>
          <p>
            A verifier learns from the kind how far it can rely on a credential. A bank opening an account must be sure of the
            person's identity, so it asks for a PID. A concert gate only needs a ticket, an EAA. A hospital checking a doctor's
            licence prefers something stronger, a QEAA or a PuB-EAA. The kind answers the question "how much trust, for whom" from
            the start.
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              A student from Baku joins a summer school in Bishkek. At the door, a student card (an EAA) is enough for the student
              discount; checking into the dormitory needs identity. If their country has a state PID, that is used; if not, an interim
              solution is needed. Tamga's identity credential exists for exactly that gap.
            </p>
          </Callout>
          <h2>Their counterparts in Tamga</h2>
          <p>
            Diplomas, student cards and event tickets on Tamga Network are EAAs. Tamga's identity credential is not a PID: it is a
            non-qualified, interim identity credential used until states issue their own PID, and it is named as such. Once a state
            issues its PID, the PID takes its place.
          </p>
          <p>
            The network can also recognise EU credentials. Under the federation rules, the EU PID and the{" "}
            <Term tip="mobile Driving Licence: the mobile driving licence defined by ISO 18013-5.">mDL</Term> (mobile driving licence) can be verified on the
            network as "external credential types"; which external list to trust is decided each time with its own approval.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Gapjykdaky her resminama deň agramly däl. Konsert bileti we şahsyýet kartasy ikisi hem gapjykda durýar, emma biri
            derwezeden geçmäge, beýlekisi bank hasabyny açmaga ýeterlik. ÝB bu tapawudy dört görnüş bilen atlandyrýar.
          </p>
          <h2>Dört görnüş</h2>
          <AttestationTypes locale="tk" />
          <ul>
            <li>
              <strong><Term tip="Person Identification Data: döwletiň berýän esasy şahsyýet maglumaty.">PID</Term></strong> — adamyň esasy
              şahsyýeti; döwlet berýär. 2028-nji ýyldan surat hökmany meýdan bolýar.
            </li>
            <li>
              <strong><Term tip="Electronic Attestation of Attributes: adamyň bir häsiýetini görkezýän elektron resminama.">EAA</Term></strong> —
              talyp bolmak, bilet eýesi bolmak ýaly häsiýetleri görkezýär; islendik gurama berip bilýär.
            </li>
            <li>
              <strong>QEAA</strong> — QTSP-niň berýän EAA-sy; hukuk taýdan agramly.
            </li>
            <li>
              <strong>PuB-EAA</strong> — döwlet edarasynyň öz{" "}
              <Term tip="Maglumatyň resmi ýazgysynyň saklanýan ýeri." en="authentic source">ygtyýarly çeşmesinden</Term> berýän resminamasy.
            </li>
          </ul>
          <h2>Tapawut näme üçin möhüm</h2>
          <p>
            Barlaýjy resminama näçe ynanyp boljakdygyny onuň görnüşinden bilýär: bank PID soraýar, konsert derwezesi üçin bilet
            (EAA) ýeterlik.
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              Bakuda okaýan talyp Bişkekdäki tomusky mekdebe gatnaşýar. Arzanladyş üçin talyp şahadatnamasy (EAA) ýeterlik;
              ýaşaýyş jaýyna girmek üçin şahsyýet gerek. Tamga-nyň şahsyýet resminamasy şu boşluk üçin bar.
            </p>
          </Callout>
          <h2>Tamga-daky gabat gelýänleri</h2>
          <p>
            Tamga Network-daky diplom, talyp şahadatnamasy we çäre bileti EAA-dyr. Tamga-nyň şahsyýet resminamasy PID däl: döwlet
            PID-i gelýänçä ulanylýan, kwalifisirlenen däl wagtlaýyn resminamadyr. Federasiýa bilen ÝB PID-i we{" "}
            <Term tip="mobile Driving Licence: ISO 18013-5 boýunça mobil sürüjilik şahadatnamasy.">mDL</Term> torda daşky görnüş hökmünde barlanyp
            bilner.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Rəqəmsal cüzdandakı hər rəqəmsal sənəd eyni çəkiyə malik deyil. Konsert bileti də, şəxsiyyət vəsiqəsi də rəqəmsal cüzdanda
            saxlanılır, lakin biri girişdən keçməyə imkan verir, digəri isə bank hesabı açmağa. Aİ bu fərqi dörd attestasiya növü ilə
            adlandırır.
          </p>
          <h2>Dörd növ</h2>
          <AttestationTypes locale="az" />
          <ul>
            <li>
              <strong>
                <Term tip="Person Identification Data: dövlətin və ya onun adından səlahiyyətli qurumun verdiyi əsas şəxsiyyət məlumatları.">PID</Term>
              </strong>{" "}
              insanın əsas şəxsiyyətidir: ad, soyad, doğum tarixi və oxşar sahələr. Onu dövlət və ya dövlətin səlahiyyət verdiyi qurum
              verir. 2028-ci ildən Aİ portreti də PID-in məcburi sahəsinə çevirir.
            </li>
            <li>
              <strong>
                <Term tip="Electronic Attestation of Attributes: insanın atributlarından birini, məsələn, tələbə olmasını və ya bilet sahibi olmasını göstərən elektron sənəd.">EAA</Term>
              </strong>{" "}
              insanın atributunu göstərir: tələbə olmaq, tədbirə bileti olmaq, assosiasiyaya üzv olmaq. İstənilən təşkilat EAA verə
              bilər.
            </li>
            <li>
              <strong>QEAA</strong> kvalifikasiyalı etibar xidməti provayderinin (QTSP) verdiyi EAA-dır. Güclü hüquqi qüvvəyə malikdir.
            </li>
            <li>
              <strong>PuB-EAA</strong> dövlət qurumunun cavabdeh olduğu{" "}
              <Term tip="Məlumatın rəsmi qeydinin saxlandığı yer, məsələn, əhali reyestri və ya universitetin tələbə reyestri.">mötəbər mənbədən</Term>{" "}
              verdiyi attestasiyadır, məsələn, nazirliyin öz reyestrindən verdiyi peşə qeydiyyatı.
            </li>
          </ul>
          <h2>Bu fərq niyə vacibdir</h2>
          <p>
            Yoxlayan tərəf rəqəmsal sənədə nə dərəcədə etibar edə biləcəyini onun növündən öyrənir. Hesab açan bank insanın
            şəxsiyyətindən əmin olmalıdır, buna görə PID tələb edir. Konsert girişi üçün bilet, yəni EAA kifayətdir. Həkimin lisenziyasını
            yoxlayan xəstəxana daha güclü sənədə, QEAA və ya PuB-EAA-ya üstünlük verir. Növ "kimə, nə qədər etibar" sualına əvvəlcədən
            cavab verir.
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              Bakıdan olan tələbə Bişkekdəki yay məktəbinə qatılır. Girişdə tələbə endirimi üçün tələbə bileti (EAA) kifayətdir;
              yataqxanada qeydiyyat üçün isə şəxsiyyət lazımdır. Ölkəsinin dövlət PID-i varsa, ondan istifadə olunur; yoxdursa, keçid
              dövrü üçün həll lazımdır. Tamga-nın şəxsiyyət sənədi məhz bu boşluq üçün mövcuddur.
            </p>
          </Callout>
          <h2>Tamga-dakı qarşılıqları</h2>
          <p>
            Tamga Network-dakı diplomlar, tələbə biletləri və tədbir biletləri EAA-dır. Tamga-nın şəxsiyyət sənədi PID deyil: bu,
            dövlətlər öz PID-lərini verənədək istifadə olunan qeyri-kvalifikasiyalı, müvəqqəti şəxsiyyət sənədidir və belə də
            adlandırılır. Dövlət öz PID-ini verdikdə onun yerini PID tutur.
          </p>
          <p>
            Şəbəkə Aİ rəqəmsal sənədlərini də tanıya bilər. Federasiya qaydalarına əsasən, Aİ PID-i və{" "}
            <Term tip="mobile Driving Licence: ISO 18013-5 ilə müəyyən edilmiş mobil sürücülük vəsiqəsi.">mDL</Term> (mobil sürücülük vəsiqəsi) şəbəkədə
            "xarici rəqəmsal sənəd növləri" kimi yoxlanıla bilər; hansı xarici siyahıya etibar ediləcəyi hər dəfə ayrıca təsdiqlə qərara alınır.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "PID kişinin temel kimliğidir ve devlet verir; EAA ise herhangi bir kurumun verdiği nitelik belgesidir.",
        en: "A PID is a person's core identity, issued by the state; an EAA is an attribute attestation any organisation can issue.",
        tk: "PID adamyň esasy şahsyýeti we döwlet berýär; EAA bolsa islendik guramanyň berip bilýän häsiýet resminamasy.",
        az: "PID insanın dövlət tərəfindən verilən əsas şəxsiyyətidir; EAA isə istənilən təşkilatın verə biləcəyi atribut attestasiyasıdır.",
      },
      {
        tr: "QEAA nitelikli sağlayıcıdan, PuB-EAA kamunun yetkili kaynağından gelir; ikisi de hukuken daha ağırdır.",
        en: "A QEAA comes from a qualified provider and a PuB-EAA from a public authentic source; both carry more legal weight.",
        tk: "QEAA kwalifisirlenen üpjün edijiden, PuB-EAA döwletiň ygtyýarly çeşmesinden gelýär.",
        az: "QEAA kvalifikasiyalı provayderdən, PuB-EAA isə dövlətin mötəbər mənbəyindən gəlir; hər ikisi daha böyük hüquqi çəkiyə malikdir.",
      },
      {
        tr: "Tamga'da diploma ve bilet EAA'dır; Tamga'nın kimlik belgesi PID değil, devlet PID'i gelene kadar geçici bir belgedir.",
        en: "In Tamga, diplomas and tickets are EAAs; Tamga's identity credential is not a PID but an interim credential until a state PID exists.",
        tk: "Tamga-da diplom we bilet EAA-dyr; Tamga-nyň şahsyýet resminamasy PID däl, wagtlaýyn resminamadyr.",
        az: "Tamga-da diplomlar və biletlər EAA-dır; Tamga-nın şəxsiyyət sənədi PID deyil, dövlət PID-i yaranana qədər müvəqqəti rəqəmsal sənəddir.",
      },
    ],
    deeper: [
      {
        label: { tr: "Identity Rulebook: Tamga kimlik belgesi", en: "Identity Rulebook: the Tamga identity credential", tk: "Identity Rulebook", az: "Identity Rulebook: Tamga şəxsiyyət sənədi" },
        href: "rulebooks/identity",
        kind: "arf",
      },
      {
        label: { tr: "Geçici kimlik belgesi sağlayıcısı kararı", en: "The interim identity provider decision", tk: "Wagtlaýyn şahsyýet karary", az: "Müvəqqəti şəxsiyyət provayderi qərarı" },
        href: "/adr/0011-provisional-identity-attestation-provider",
        kind: "docs",
      },
      {
        label: { tr: "Federasyon: dış listeler ve AB PID", en: "Federation: external lists and the EU PID", tk: "Federasiýa: daşky sanawlar", az: "Federasiya: xarici siyahılar və Aİ PID-i" },
        href: "/adr/0036-trust-federation-external-lists",
        kind: "docs",
      },
      {
        label: { tr: "Tanımlar (Ek D)", en: "Definitions (Annex D)", tk: "Kesgitlemeler (D goşundy)", az: "Təriflər (Əlavə D)" },
        href: "definitions",
        kind: "arf",
      },
    ],
  },

  /* ================================================================ 4.5 Avrupa takvimi */
  {
    slug: "eu-timeline",
    chapter: 4,
    order: 5,
    minutes: 4,
    title: { tr: "Avrupa takvimi", en: "The European timeline", tk: "Ýewropa senenamasy", az: "Avropa təqvimi" },
    summary: {
      tr: "Tüzük, uygulama tüzükleri, cüzdanların gelişi ve kabul yükümlülüğü: neyin ne zaman olduğu.",
      en: "The regulation, the implementing acts, the arrival of wallets and the duty to accept them: what happens when.",
      tk: "Düzgünnama, ýerine ýetiriş düzgünnamalary, gapjyklaryň gelmegi we kabul etmek borjy: näme haçan bolýar.",
      az: "Reqlament, icra aktları, rəqəmsal cüzdanların gəlişi və onları qəbul etmək öhdəliyi: nə vaxt nə baş verir.",
    },
    body: {
      tr: (
        <>
          <p>
            eIDAS 2.0 bir günde gelmiyor; adım adım geliyor. Önce tüzük, sonra teknik kurallar, ardından cüzdanlar ve en son,
            kurumların cüzdanı kabul etme yükümlülüğü. Bu sayfa o adımları tarih sırasıyla gösteriyor.
          </p>
          <Figure caption="Tarihler AB Resmî Gazetesi'nde yayımlanan tüzüklerden. Boş halkalar gelecek tarihleri gösteriyor.">
            <EuTimeline locale="tr" />
          </Figure>
          <h2>Üç büyük eşik</h2>
          <ul>
            <li>
              <strong>2026 sonu: cüzdanlar.</strong> Her üye devlet en az bir sertifikalı EUDI Wallet sunmuş olmalı.
            </li>
            <li>
              <strong>2027 sonu: kabul.</strong> Bankalar gibi düzenlenmiş sektörler ve çok büyük çevrim içi platformlar, kişi
              isterse cüzdanla kimlik doğrulamayı kabul etmek zorunda. Doğrulayıcılar için asıl dönüşüm burada başlar.
            </li>
            <li>
              <strong>2028: sıkılaşan kurallar.</strong> Cüzdanlar doğrulayıcının{" "}
              <Term tip="Bir doğrulayıcının kim olduğunu ve hangi bilgileri isteyebileceğini gösteren, kayıt kurumunun verdiği sertifika." en="registration certificate">kayıt sertifikasını</Term>{" "}
              denetlemek zorunda; portre, PID'in zorunlu alanı oluyor.
            </li>
          </ul>
          <h2>Bugün neredeyiz</h2>
          <p>
            Bu sayfa güncellenirken (Ekim 2026) tüzük ve uygulama tüzüklerinin büyük bölümü yürürlükteydi; Ağustos 2026'daki
            güncelleme paketiyle cüzdan kanıtları ve sunum profilleri netleşmişti. Sertifikalı bir EUDI Wallet ise henüz
            yayımlanmamıştı. Mimari başvuru belgesi ARF'nin en güncel sürümü 3.0.0'dı (Temmuz 2026).
          </p>
          <Callout kind="turkic" locale="tr">
            <p>
              2027'den sonra Avrupa'daki bir banka ya da büyük bir platform, kimliğini cüzdanla kanıtlamak isteyen herkesi kabul
              etmek zorunda olacak. Taşkent'ten Münih'e giden bir mühendis, Aşkabat'tan Viyana'ya giden bir öğrenci için soru şu:
              ülkesinin belgeleri bu dili konuşacak mı? Tamga Network bu soruya bugünden hazırlanmak için var.
            </p>
          </Callout>
          <h2>Tamga takvimi nasıl izliyor</h2>
          <p>
            Tamga, AB kurallarını çıktıkça izler ve kendi kurallarını onlara göre günceller. Örneğin cüzdan kanıtları (WIA ve anahtar
            kanıtı), doğrulayıcıların kayıt sertifikaları ve yüksek güvenceli sunum profili (HAIP 1.0), AB'nin ilgili kuralları
            netleştikçe Tamga'nın kararlarına işlendi. Böylece AB'nin her yeni adımı, ağın kurallarında bir karşılık
            bulur.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            eIDAS 2.0 does not arrive in a day; it arrives step by step. First the regulation, then the technical rules, then the
            wallets and finally the duty for institutions to accept them. This page lays out those steps in order.
          </p>
          <Figure caption="Dates come from acts published in the Official Journal of the EU. Hollow rings mark upcoming dates.">
            <EuTimeline locale="en" />
          </Figure>
          <h2>Three big thresholds</h2>
          <ul>
            <li>
              <strong>End of 2026: wallets.</strong> Every member state must offer at least one certified EUDI Wallet.
            </li>
            <li>
              <strong>End of 2027: acceptance.</strong> Regulated sectors such as banks, and very large online platforms, must accept
              identification with the wallet when a person asks for it. This is where the real change for verifiers begins.
            </li>
            <li>
              <strong>2028: tighter rules.</strong> Wallets must check the relying party's{" "}
              <Term tip="A certificate from the registrar showing who a verifier is and which data it may ask for.">registration certificate</Term>;
              the portrait becomes a mandatory PID field.
            </li>
          </ul>
          <h2>Where things stand</h2>
          <p>
            When this page was last updated (October 2026), the regulation and most implementing acts were in force; the August 2026
            update package had settled the wallet attestations and the presentation profiles. No certified EUDI Wallet had been
            published yet. The latest version of the ARF reference document was 3.0.0 (July 2026).
          </p>
          <Callout kind="turkic" locale="en">
            <p>
              After 2027, a bank or a large platform in Europe will have to accept anyone who wants to prove their identity with a
              wallet. For an engineer moving from Tashkent to Munich or a student going from Ashgabat to Vienna, the question is
              whether their country's credentials will speak this language. Tamga Network exists to get ready for that question today.
            </p>
          </Callout>
          <h2>How Tamga follows the timeline</h2>
          <p>
            Tamga tracks EU rules as they appear and updates its own rules accordingly. Wallet attestations (WIA and key attestation),
            registration certificates for verifiers and the high-assurance presentation profile (HAIP 1.0), for example, were written
            into Tamga's decisions as the corresponding EU rules took shape. Every new EU step finds a counterpart in the
            network's rules.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            eIDAS 2.0 bir günde gelmeýär; ädim-ädim gelýär: ilki düzgünnama, soňra tehniki düzgünler, soňra gapjyklar we iň soňunda
            guramalaryň gapjygy kabul etmek borjy.
          </p>
          <Figure caption="Seneler ÝB-niň Resmi Býulletenindäki düzgünnamalardan. Boş halkalar geljekki seneleri görkezýär.">
            <EuTimeline locale="tk" />
          </Figure>
          <h2>Üç uly bosaga</h2>
          <ul>
            <li>
              <strong>2026-njy ýylyň ahyry:</strong> her agza döwlet sertifikatly EUDI Wallet hödürlemeli.
            </li>
            <li>
              <strong>2027-nji ýylyň ahyry:</strong> banklar we örän uly platformalar gapjygy kabul etmeli.
            </li>
            <li>
              <strong>2028:</strong> gapjyklar barlaýjynyň{" "}
              <Term tip="Barlaýjynyň kimdigini we haýsy maglumatlary sorap biljekdigini görkezýän sertifikat." en="registration certificate">hasaba alyş sertifikatyny</Term>{" "}
              barlamaly.
            </li>
          </ul>
          <h2>Häzir nirede</h2>
          <p>
            Bu sahypa täzelenende (oktýabr 2026) düzgünnamalaryň köpüsi güýje girdi, emma sertifikatly EUDI Wallet entek çap
            edilmändi. ARF-iň soňky wersiýasy 3.0.0 (iýul 2026).
          </p>
          <Callout kind="turkic" locale="tk">
            <p>
              2027-den soň Ýewropadaky bank gapjyk bilen şahsyýetini subut etmek isleýän her kesi kabul etmeli bolar. Aşgabatdan
              Wena gidýän talyp üçin sorag: ýurdunyň resminamalary bu dilde gürlärmi? Tamga Network şu soraga häzirden taýýarlanmak
              üçin bar.
            </p>
          </Callout>
          <h2>Tamga senenamany nähili yzarlaýar</h2>
          <p>
            Tamga ÝB düzgünlerini yzarlaýar we öz düzgünlerini olara görä täzeleýär: gapjyk subutnamalary, hasaba alyş
            sertifikatlary we HAIP 1.0 eýýäm Tamga-nyň kararlaryna girizildi.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            eIDAS 2.0 bir gündə gəlmir; addım-addım gəlir. Əvvəlcə reqlament, sonra texniki qaydalar, ardınca rəqəmsal cüzdanlar və
            nəhayət qurumların onları qəbul etmək öhdəliyi. Bu səhifə həmin addımları ardıcıllıqla göstərir.
          </p>
          <Figure caption="Tarixlər Aİ-nin Rəsmi Jurnalında dərc olunmuş aktlardan götürülüb. Boş halqalar gələcək tarixləri göstərir.">
            <EuTimeline locale="az" />
          </Figure>
          <h2>Üç böyük hədd</h2>
          <ul>
            <li>
              <strong>2026-cı ilin sonu: rəqəmsal cüzdanlar.</strong> Hər üzv dövlət ən azı bir sertifikatlaşdırılmış EUDI Wallet təqdim etməlidir.
            </li>
            <li>
              <strong>2027-ci ilin sonu: qəbul.</strong> Banklar kimi tənzimlənən sektorlar və çox böyük onlayn platformalar insan
              istədikdə rəqəmsal cüzdanla identifikasiyanı qəbul etməlidir. Yoxlayan tərəflər üçün əsl dəyişiklik burada başlayır.
            </li>
            <li>
              <strong>2028: daha sərt qaydalar.</strong> Rəqəmsal cüzdanlar etibar edən tərəfin{" "}
              <Term tip="Qeydiyyat orqanının verdiyi, yoxlayan tərəfin kim olduğunu və hansı məlumatları tələb edə biləcəyini göstərən sertifikat.">qeydiyyat sertifikatını</Term> yoxlamalıdır;
              portret PID-in məcburi sahəsinə çevrilir.
            </li>
          </ul>
          <h2>Hazırkı vəziyyət</h2>
          <p>
            Bu səhifə sonuncu dəfə yenilənəndə (oktyabr 2026) reqlament və icra aktlarının əksəriyyəti qüvvədə idi; 2026-cı ilin avqust
            yenilənmə paketi rəqəmsal cüzdan attestasiyalarını və təqdimat profillərini müəyyənləşdirmişdi. Hələ heç bir
            sertifikatlaşdırılmış EUDI Wallet dərc edilməmişdi. ARF istinad sənədinin son versiyası 3.0.0 idi (iyul 2026).
          </p>
          <Callout kind="turkic" locale="az">
            <p>
              2027-ci ildən sonra Avropadakı bank və ya böyük platforma şəxsiyyətini rəqəmsal cüzdanla sübut etmək istəyən hər kəsi
              qəbul etməli olacaq. Daşkənddən Münhenə köçən mühəndis və ya Aşqabaddan Vyanaya gedən tələbə üçün sual budur: ölkəsinin
              rəqəmsal sənədləri bu dildə danışacaqmı? Tamga Network bu suala bu gündən hazırlaşmaq üçün mövcuddur.
            </p>
          </Callout>
          <h2>Tamga təqvimi necə izləyir</h2>
          <p>
            Tamga Aİ qaydalarını dərc olunduqca izləyir və öz qaydalarını onlara uyğun yeniləyir. Məsələn, rəqəmsal cüzdan
            attestasiyaları (WIA və açar attestasiyası), yoxlayan tərəflər üçün qeydiyyat sertifikatları və yüksək təminatlı təqdimat
            profili (HAIP 1.0) müvafiq Aİ qaydaları formalaşdıqca Tamga-nın qərarlarına daxil edildi. Aİ-nin hər yeni addımı şəbəkənin
            qaydalarında öz qarşılığını tapır.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Tüzük 2024'te yürürlüğe girdi; teknik kurallar 2024'ten bu yana paket paket geliyor.",
        en: "The regulation came into force in 2024; the technical rules have arrived in packages since then.",
        tk: "Düzgünnama 2024-nji ýylda güýje girdi; tehniki düzgünler toplum-toplum gelýär.",
        az: "Reqlament 2024-cü ildə qüvvəyə mindi; texniki qaydalar o vaxtdan bəri paketlər şəklində gəlir.",
      },
      {
        tr: "2026 sonu cüzdanlar, 2027 sonu düzenlenmiş sektörlerde kabul yükümlülüğü, 2028 daha sıkı kurallar.",
        en: "Wallets by the end of 2026, the duty to accept them in regulated sectors by the end of 2027, tighter rules in 2028.",
        tk: "2026-njy ýylyň ahyrynda gapjyklar, 2027-nji ýylyň ahyrynda kabul etmek borjy, 2028-de has berk düzgünler.",
        az: "2026-cı ilin sonunadək rəqəmsal cüzdanlar, 2027-ci ilin sonunadək tənzimlənən sektorlarda onları qəbul etmək öhdəliyi, 2028-ci ildə daha sərt qaydalar.",
      },
      {
        tr: "Tamga AB'nin her adımını izler ve kendi kurallarına işler; böylece belgeler Avrupa yazılımıyla teknik olarak çalışır. Hukuki tanınma ise devletler arası anlaşma ister (eIDAS Madde 14).",
        en: "Tamga follows every EU step and writes it into its own rules, so that credentials work with European software. Legal recognition, however, needs an agreement between states (eIDAS Article 14).",
        tk: "Tamga ÝB-niň her ädimini yzarlaýar we öz düzgünlerine girizýär; hukuky ykrar edilmek üçin döwletleriň arasynda şertnama gerek (eIDAS 14-nji madda).",
        az: "Tamga Aİ-nin hər addımını izləyir və öz qaydalarına daxil edir ki, rəqəmsal sənədlər Avropa proqram təminatı ilə işləsin. Hüquqi tanınma isə dövlətlər arasında saziş tələb edir (eIDAS 14-cü maddə).",
      },
    ],
    deeper: [
      {
        label: { tr: "Kaynaklar: AB tüzükleri listesi (Ek E)", en: "References: list of EU acts (Annex E)", tk: "Çeşmeler (E goşundy)", az: "İstinadlar: Aİ aktlarının siyahısı (Əlavə E)" },
        href: "references",
        kind: "arf",
      },
      {
        label: { tr: "HAIP 1.0 uyumu kararı", en: "The HAIP 1.0 alignment decision", tk: "HAIP 1.0 karary", az: "HAIP 1.0 uyğunlaşdırma qərarı" },
        href: "/adr/0034-haip-client-id-and-wia-sub",
        kind: "docs",
      },
      {
        label: { tr: "Kayıt sertifikaları kararı", en: "The registration certificates decision", tk: "Hasaba alyş sertifikatlary", az: "Qeydiyyat sertifikatları qərarı" },
        href: "/adr/0026-registration-certificates",
        kind: "docs",
      },
      {
        label: { tr: "Sonraki bölüm: güven listeleri nasıl çalışır", en: "Next chapter: how trust lists work", tk: "Indiki bap: ynam sanawlary", az: "Növbəti fəsil: etibar siyahıları necə işləyir" },
        href: "/learn/trust-lists",
        kind: "site",
      },
    ],
  },
];

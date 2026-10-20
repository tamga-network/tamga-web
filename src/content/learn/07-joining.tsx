import { Callout, Term } from "@/components/learn/prose";
import type { LearnPage } from "./types";

/* Bölüm 7 — Katılım. Kaynaklar: ARF Trust Framework §3.2 (katılım kapıları), §3.3 (yaşam döngüsü), §4.3 (uyum testleri),
   §6.1 (federasyon), §7 (devir); ADR-0024/0026/0034/0036/0037. Süre ve ücret bilgisi verilmez (karar ve kurum hazırlığına bağlı). */

export const CHAPTER_7: LearnPage[] = [
  /* ------------------------------------------------------------------ 7.1 */
  {
    slug: "join-as-issuer",
    chapter: 7,
    order: 1,
    minutes: 6,
    title: {
      tr: "Kurum olarak belge vermek",
      en: "Issuing as an institution",
      tk: "Gurama hökmünde resminama bermek",
      az: "Qurum olaraq rəqəmsal sənəd vermək",
    },
    summary: {
      tr: "Bir kurum ağda belge vermek için hangi adımlardan geçer, neye ihtiyaç duyar.",
      en: "The steps an institution takes to issue credentials on the network, and what it needs.",
      tk: "Gurama torda resminama bermek üçin haýsy ädimlerden geçýär we oňa näme gerek.",
      az: "Qurumun şəbəkədə rəqəmsal sənəd vermək üçün keçdiyi addımlar və ona nələrin lazım olduğu.",
    },
    diagram: "trust-chain",
    body: {
      tr: (
        <>
          <p>
            Bir üniversite mezuniyet belgesini, bir meslek odası üyelik
            belgesini, bir konser organizatörü bileti dijital olarak vermek
            istiyor. Tamga Network&apos;te bunu yapabilmek için kurumun önce ağa
            kaydolması gerekir. Kayıt, ağın bütün doğrulayıcılarına şunu söyler:
            &quot;Bu kurum gerçek, bu anahtar onun, bu tür belgeyi vermeye
            yetkili.&quot;
          </p>
          <p>
            Bu sayfa yolu sade dille anlatır. Formların ve teknik adımların
            tamamı geliştirici belgelerinde ve Tamga ARF&apos;de.
          </p>

          <h2>Başlamadan önce neye ihtiyacınız var?</h2>
          <ul>
            <li>
              <strong>Tüzel kişilik ve yetkili bir kişi.</strong> Kurumun resmî
              kaydı (Türkiye&apos;de MERSİS ya da kuruluş kanunu) ve kurum adına
              imza atabilecek birinin teyidi.
            </li>
            <li>
              <strong>Bir alan adı.</strong> Kurumun kendi internet adresi. Ağ,
              alan adının gerçekten kuruma ait olduğunu denetler.
            </li>
            <li>
              <strong>Belge bilgilerinin kaynağı.</strong> Diploma için öğrenci
              bilgi sistemi, üyelik için oda kaydı. Bu kaynağa ağda{" "}
              <Term
                tip="Belgedeki bilginin asıl kaydının tutulduğu yer; belge bilgisi oradan okunur."
                en="authentic source"
              >
                yetkili kaynak
              </Term>{" "}
              denir. Bilgi ağa kopyalanmaz, belge verilirken kaynaktan okunur.
            </li>
            <li>
              <strong>Bir belge türü.</strong> Ne vereceğiniz önceden tanımlı
              olmalı: örneğin Education Rulebook öğrenci belgesini ve diplomayı,
              Event Ticket Rulebook etkinlik biletini tarif eder. Yeni bir tür
              gerekiyorsa önce onun kuralları yazılır.
            </li>
            <li>
              <strong>Kişisel veri düzeni.</strong> Belgeyi kime ve nasıl
              verdiğinizi KVKK&apos;ya uygun kurgulamanız gerekir.
            </li>
          </ul>

          <h2>Adım adım</h2>
          <ol>
            <li>
              <strong>Başvuru.</strong> Kurum, AB&apos;nin ortak kayıt veri
              setiyle aynı bilgileri verir: resmî ad, kurum kimlik numarası,
              adres, iletişim, ne yapacağı.
            </li>
            <li>
              <strong>Kapı denetimleri.</strong> Alan adı sahipliği, iletişim
              bilgisi ve kurumun tüzel kişiliği denetlenir. Kapı geçilmeden
              kayıt yapılmaz.
            </li>
            <li>
              <strong>Sertifika.</strong> Kurum bir anahtar çifti üretir. Gizli
              anahtar kurumda kalır; açık anahtar için bir{" "}
              <Term
                tip="Bir açık anahtarın kime ait olduğunu kanıtlayan imzalı dijital kimlik kartı."
                en="certificate"
              >
                sertifika
              </Term>{" "}
              verilir. Doğrulayıcılar belgedeki imzayı bu sertifikayla denetler.
            </li>
            <li>
              <strong>Belge türü yetkisi.</strong> Her tür için ayrı izin
              verilir; başlangıçta hiçbir tür açık değildir. Bir üniversite
              diploma verebilir, ama bilet veremez.
            </li>
            <li>
              <strong>Deneme ve uyum testleri.</strong> Kurum, ağın herkese açık
              test vektörleriyle deneme belgeleri üretir; sonuç raporu başvuruya
              eklenir.
            </li>
            <li>
              <strong>Listeye giriş.</strong> Kurum, ülkesinin{" "}
              <Term
                tip="Hangi kurumların hangi belgeleri vermeye yetkili olduğunu gösteren, imzalı ve herkese açık liste."
                en="trust list"
              >
                güven listesine
              </Term>{" "}
              eklenir. Artık her doğrulayıcı onu tanır.
            </li>
            <li>
              <strong>İlk belge.</strong> Kurum ister ağın barındırılan belge
              verme hizmetini kendi sistemine bağlar, ister açık kaynak
              paketlerle kendi yazılımını çalıştırır. İki yolda da belge kişinin
              seçtiği uyumlu cüzdana gider.
            </li>
          </ol>
          <p>
            Ne kadar sürer? Kurumun hazırlığına bağlıdır: kaynağın hazır olması,
            sözleşme ve testler.
          </p>

          <h2>Güvence seviyeleri</h2>
          <p>
            Her kurum aynı derinlikte denetlenmez. Doğrulayıcı, belgenin hangi
            seviyedeki bir kurumdan geldiğini görür ve kararını buna göre verir.
          </p>
          <ul>
            <li>
              <strong>Kayıtlı:</strong> alan adı ve iletişim doğrulanmış, deneme
              belgesi testleri geçmiş. Doğrulayıcı ekranında &quot;akredite
              değil&quot; olarak görünür.
            </li>
            <li>
              <strong>Sözleşmeli:</strong> tüzel kişilik, imza yetkilisi,
              katılım sözleşmesi ve kurum sertifikası tamam.
            </li>
            <li>
              <strong>Akredite:</strong> anahtarlar güvenli donanımda, denetim
              ve kayıt tutma yükümlülüğü, olay bildirimi ve yıllık gözden
              geçirme.
            </li>
            <li>
              <strong>Kamu:</strong> devlet kurumu ya da yetkili kaynak adına;
              ilgili devletin kayıt kurumu kaydeder.
            </li>
          </ul>

          <Callout kind="turkic" locale="tr">
            <p>
              Her ülkenin kurumları kendi ülkesinin listesine girer. Bugün
              yayında olan liste Türkiye listesidir; diğer Türk devletleri için
              yerler ayrılmış durumda. Bir ülke kendi listesini yayınladığında,
              o ülkenin kurumları oraya kaydolur ve belgeleri yine bütün ağda
              doğrulanır.
            </p>
          </Callout>

          <h2>Katıldıktan sonra</h2>
          <p>
            Kurum her zaman ağın kurallarına tabidir. Bir sorun olursa askıya
            alınabilir: yeni belge veremez, ama daha önce verdiği belgeler
            verildikleri tarihe göre geçerli kalır. Kurum isterse bildirimle
            ayrılabilir; geçmiş kayıtlar silinmez, eski belgeler doğrulanmaya
            devam eder.
          </p>
          <Callout kind="info" locale="tr">
            <p>
              Ağ hizmet satmaz. Entegrasyon ya da destek almak isteyen kurumlar
              bunu ağın dışındaki şirketlerden alabilir; kayıt süreci herkes
              için aynıdır.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            A university wants to issue its graduation certificate digitally, a
            professional chamber its membership card, a concert promoter its
            tickets. To do this on Tamga Network, the institution first
            registers with the network. Registration tells every verifier on the
            network: &quot;This institution is real, this key belongs to it, and
            it may issue this type of credential.&quot;
          </p>
          <p>
            This page walks through the path in plain words. The forms and
            technical steps are in the developer docs and Tamga ARF.
          </p>

          <h2>What you need before you start</h2>
          <ul>
            <li>
              <strong>A legal entity and an authorised person.</strong> The
              institution&apos;s official registration and confirmation of
              someone who can sign on its behalf.
            </li>
            <li>
              <strong>A domain name.</strong> The institution&apos;s own web
              address. The network checks that it really belongs to the
              institution.
            </li>
            <li>
              <strong>The source of the data.</strong> For a diploma, the
              student information system; for membership, the chamber&apos;s
              register. The network calls this the{" "}
              <Term
                tip="The place where the original record behind a credential is kept; data is read from there when issuing."
                en="authentic source"
              >
                authentic source
              </Term>
              . Data is not copied into the network; it is read from the source
              at the moment of issuing.
            </li>
            <li>
              <strong>A credential type.</strong> What you issue must be defined
              in advance: the Education Rulebook describes the student
              certificate and the diploma, the Event Ticket Rulebook the event
              ticket. A new type first gets its own rules.
            </li>
            <li>
              <strong>A data protection set-up.</strong> Who you issue to, and
              how, must follow data protection law.
            </li>
          </ul>

          <h2>Step by step</h2>
          <ol>
            <li>
              <strong>Application.</strong> The institution provides the same
              data the EU&apos;s common registration data set asks for: official
              name, registration number, address, contact and what it will do.
            </li>
            <li>
              <strong>Gate checks.</strong> Domain ownership, contact details
              and legal identity are checked. No registration without passing
              the gate.
            </li>
            <li>
              <strong>Certificate.</strong> The institution creates a key pair.
              The private key stays with the institution; a{" "}
              <Term
                tip="A signed digital ID card that proves who a public key belongs to."
                en="certificate"
              >
                certificate
              </Term>{" "}
              is issued for the public key. Verifiers check the signature on a
              credential against it.
            </li>
            <li>
              <strong>Credential type permission.</strong> Each type is granted
              separately; none is open by default. A university may issue
              diplomas, but not tickets.
            </li>
            <li>
              <strong>Trial and conformance tests.</strong> The institution
              produces trial credentials against the network&apos;s public test
              vectors; the report goes with the application.
            </li>
            <li>
              <strong>Entry into the list.</strong> The institution is added to
              its country&apos;s{" "}
              <Term
                tip="A signed, public list showing which institutions may issue which credentials."
                en="trust list"
              >
                trust list
              </Term>
              . From then on every verifier recognises it.
            </li>
            <li>
              <strong>First credential.</strong> The institution either connects
              the network&apos;s hosted issuing service to its system or runs
              its own software with the open-source packages. Either way, the
              credential goes to the compatible wallet the person chooses.
            </li>
          </ol>
          <p>
            How long does it take? That depends on the institution: a ready data
            source, the agreement and the tests.
          </p>

          <h2>Assurance levels</h2>
          <p>
            Not every institution is checked to the same depth. The verifier
            sees which level a credential comes from and decides accordingly.
          </p>
          <ul>
            <li>
              <strong>Registered:</strong> domain and contact verified, trial
              credentials passed the tests. Shown to verifiers as &quot;not
              accredited&quot;.
            </li>
            <li>
              <strong>Contracted:</strong> legal entity, authorised signatory,
              participation agreement and institution certificate in place.
            </li>
            <li>
              <strong>Accredited:</strong> keys in secure hardware, audit and
              record-keeping duties, incident reporting and an annual review.
            </li>
            <li>
              <strong>Public:</strong> a state body or an authentic source;
              registered by that state&apos;s registrar.
            </li>
          </ul>

          <Callout kind="turkic" locale="en">
            <p>
              Institutions join their own country&apos;s list. Today the live
              list is Türkiye&apos;s; places are reserved for the other Turkic
              states. When a country publishes its own list, its institutions
              register there, and their credentials are still verified across
              the whole network.
            </p>
          </Callout>

          <h2>After joining</h2>
          <p>
            An institution always remains subject to the network&apos;s rules.
            If something goes wrong it can be suspended: it can no longer issue,
            but credentials it issued earlier stay valid as of their issue date.
            An institution can also leave with notice; past records are not
            deleted and old credentials keep verifying.
          </p>
          <Callout kind="info" locale="en">
            <p>
              The network sells no services. Institutions that want integration
              or support can get it from companies outside the network; the
              registration process is the same for everyone.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Uniwersitet diplomyny, hünär birleşigi agzalyk resminamasyny,
            konsert gurnaýjysy bileti sanly görnüşde bermek isleýär. Muny Tamga
            Network-da etmek üçin gurama ilki bilen tora hasaba alynmaly. Hasaba
            alyş ähli barlaýjylara şeýle diýýär: &quot;Bu gurama hakyky, bu açar
            onuňky, ol şu görnüşli resminamany bermäge ygtyýarly.&quot;
          </p>

          <h2>Başlamazdan öň näme gerek?</h2>
          <ul>
            <li>
              <strong>Ýuridik şahs we ygtyýarly adam.</strong> Guramanyň resmi
              hasaba alnyşy we onuň adyndan gol çekip bilýän adamyň
              tassyklamasy.
            </li>
            <li>
              <strong>Domen ady.</strong> Guramanyň öz internet salgysy; tor
              onuň hakykatdan hem guramanyňkydygyny barlaýar.
            </li>
            <li>
              <strong>Maglumatyň çeşmesi</strong> (
              <Term
                tip="Resminamadaky maglumatyň asyl ýazgysy saklanýan ýer."
                en="authentic source"
              >
                ygtyýarly çeşme
              </Term>
              ). Maglumat tora göçürilmeýär, resminama berlende çeşmeden
              okalýar.
            </li>
            <li>
              <strong>Resminama görnüşi</strong>, mysal üçin Education Rulebook
              ýa-da Event Ticket Rulebook boýunça.
            </li>
          </ul>

          <h2>Ädimme-ädim</h2>
          <ol>
            <li>
              Arza: resmi at, hasaba alyş belgisi, salgy, habarlaşmak üçin
              maglumat.
            </li>
            <li>
              Derwezede barlag: domen, habarlaşmak maglumaty we ýuridik şahs.
            </li>
            <li>
              Sertifikat: gizlin açar guramada galýar, açyk açar üçin{" "}
              <Term
                tip="Açyk açaryň kime degişlidigini subut edýän gol çekilen sanly şahsyýet kartoçkasy."
                en="certificate"
              >
                sertifikat
              </Term>{" "}
              berilýär.
            </li>
            <li>
              Her resminama görnüşi üçin aýratyn rugsat; başda hiç bir görnüş
              açyk däl.
            </li>
            <li>Synag resminamalary we laýyklyk synaglary.</li>
            <li>
              Ýurduň{" "}
              <Term
                tip="Haýsy guramalaryň haýsy resminamalary bermäge ygtyýarlydygyny görkezýän gol çekilen sanaw."
                en="trust list"
              >
                ynam sanawyna
              </Term>{" "}
              girmek.
            </li>
            <li>
              Ilkinji resminama: toruň hyzmaty ýa-da açyk kodly paketler bilen
              öz programmasy.
            </li>
          </ol>
          <p>Näçe wagt alýar? Guramanyň taýýarlygyna bagly.</p>

          <Callout kind="turkic" locale="tk">
            <p>
              Her ýurduň guramalary öz ýurdunyň sanawyna girýär. Häzir çap
              edilen sanaw Türkiýäniň sanawy; beýleki türki döwletler üçin ýer
              goýlan.
            </p>
          </Callout>

          <h2>Goşulandan soň</h2>
          <p>
            Gurama togtadylyp bilner: täze resminama berip bilmeýär, ýöne öň
            berlenler güýjünde galýar. Gurama habar berip çykyp hem biler. Tor
            hyzmat satmaýar; goşulyş ýoly hemmeler üçin birmeňzeş.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Universitet məzuniyyət sənədini, peşə palatası üzvlük vəsiqəsini,
            konsert təşkilatçısı biletlərini rəqəmsal formada vermək istəyir.
            Bunu Tamga Network-da etmək üçün qurum əvvəlcə şəbəkədə
            qeydiyyatdan keçir. Qeydiyyat şəbəkədəki hər bir yoxlayan tərəfə
            bunu bildirir: &quot;Bu qurum realdır, bu açar ona məxsusdur və o,
            bu növ rəqəmsal sənədi verə bilər.&quot;
          </p>
          <p>
            Bu səhifə yolu sadə dillə izah edir. Formalar və texniki addımlar
            tərtibatçı sənədlərində və Tamga ARF-də verilib.
          </p>

          <h2>Başlamazdan əvvəl Sizə nə lazımdır</h2>
          <ul>
            <li>
              <strong>Hüquqi şəxs və səlahiyyətli şəxs.</strong> Qurumun rəsmi
              qeydiyyatı və onun adından imza ata bilən şəxsin təsdiqi.
            </li>
            <li>
              <strong>Domen adı.</strong> Qurumun öz veb ünvanı. Şəbəkə onun
              həqiqətən quruma məxsus olduğunu yoxlayır.
            </li>
            <li>
              <strong>Məlumatların mənbəyi.</strong> Diplom üçün tələbə
              informasiya sistemi, üzvlük üçün palatanın reyestri. Şəbəkə bunu{" "}
              <Term
                tip="Rəqəmsal sənədin əsasındakı ilkin qeydin saxlandığı yer; sənəd verilərkən məlumat oradan oxunur."
                en="authentic source"
              >
                orijinal mənbə
              </Term>{" "}
              adlandırır. Məlumat şəbəkəyə köçürülmür; sənəd verildiyi anda
              mənbədən oxunur.
            </li>
            <li>
              <strong>Rəqəmsal sənəd növü.</strong> Verdiyiniz sənəd əvvəlcədən
              müəyyən edilməlidir: Education Rulebook tələbə arayışını və
              diplomu, Event Ticket Rulebook isə tədbir biletini təsvir edir.
              Yeni növ üçün əvvəlcə onun öz qaydaları yazılır.
            </li>
            <li>
              <strong>Məlumatların qorunması üzrə təşkilat.</strong> Sənədi kimə
              və necə verdiyiniz məlumatların qorunması haqqında qanunvericiliyə
              uyğun olmalıdır.
            </li>
          </ul>

          <h2>Addım-addım</h2>
          <ol>
            <li>
              <strong>Müraciət.</strong> Qurum Avropa İttifaqının (Aİ) ümumi
              qeydiyyat məlumat dəstinin tələb etdiyi məlumatları təqdim edir:
              rəsmi ad, qeydiyyat nömrəsi, ünvan, əlaqə məlumatları və nə ilə
              məşğul olacağı.
            </li>
            <li>
              <strong>Giriş yoxlamaları.</strong> Domen sahibliyi, əlaqə
              məlumatları və hüquqi status yoxlanılır. Bu mərhələ keçilmədən
              qeydiyyat aparılmır.
            </li>
            <li>
              <strong>Sertifikat.</strong> Qurum açar cütü yaradır. Gizli açar
              qurumda qalır; açıq açar üçün{" "}
              <Term
                tip="Açıq açarın kimə məxsus olduğunu sübut edən imzalı rəqəmsal şəxsiyyət vəsiqəsi."
                en="certificate"
              >
                sertifikat
              </Term>{" "}
              verilir. Yoxlayan tərəflər rəqəmsal sənəddəki imzanı onunla
              yoxlayır.
            </li>
            <li>
              <strong>Rəqəmsal sənəd növü üzrə icazə.</strong> Hər növ üçün icazə
              ayrıca verilir; standart olaraq heç bir növ açıq deyil.
              Universitet diplom verə bilər, amma bilet verə bilməz.
            </li>
            <li>
              <strong>Sınaq və uyğunluq testləri.</strong> Qurum şəbəkənin açıq
              test vektorları əsasında sınaq rəqəmsal sənədləri hazırlayır;
              hesabat müraciətə əlavə olunur.
            </li>
            <li>
              <strong>Siyahıya daxil olma.</strong> Qurum öz ölkəsinin{" "}
              <Term
                tip="Hansı qurumların hansı rəqəmsal sənədləri verə biləcəyini göstərən imzalı, açıq siyahı."
                en="trust list"
              >
                etibar siyahısına
              </Term>{" "}
              əlavə olunur. Bundan sonra hər yoxlayan tərəf onu tanıyır.
            </li>
            <li>
              <strong>İlk rəqəmsal sənəd.</strong> Qurum ya şəbəkənin təqdim
              etdiyi (hosted) sənəd vermə xidmətini öz sisteminə qoşur, ya da
              açıq mənbəli paketlərlə öz proqram təminatını işlədir. Hər iki
              halda rəqəmsal sənəd şəxsin seçdiyi uyğun rəqəmsal cüzdana
              göndərilir.
            </li>
          </ol>
          <p>
            Bu nə qədər vaxt aparır? Bu, qurumdan asılıdır: hazır məlumat
            mənbəyi, müqavilə və testlər.
          </p>

          <h2>Təminat səviyyələri</h2>
          <p>
            Hər qurum eyni dərinlikdə yoxlanılmır. Yoxlayan tərəf rəqəmsal
            sənədin hansı səviyyədən gəldiyini görür və buna uyğun qərar verir.
          </p>
          <ul>
            <li>
              <strong>Qeydiyyatlı:</strong> domen və əlaqə məlumatları
              təsdiqlənib, sınaq rəqəmsal sənədləri testlərdən keçib. Yoxlayan
              tərəflərə &quot;akkreditə olunmayıb&quot; kimi göstərilir.
            </li>
            <li>
              <strong>Müqaviləli:</strong> hüquqi şəxs, səlahiyyətli imzaçı,
              iştirak müqaviləsi və qurum sertifikatı mövcuddur.
            </li>
            <li>
              <strong>Akkreditə olunmuş:</strong> açarlar təhlükəsiz
              avadanlıqdadır; audit və qeydlərin aparılması öhdəlikləri,
              insidentlər barədə məlumat vermə və illik yoxlama.
            </li>
            <li>
              <strong>Dövlət:</strong> dövlət orqanı və ya orijinal mənbə;
              həmin dövlətin qeydiyyat orqanı tərəfindən qeydiyyata alınır.
            </li>
          </ul>

          <Callout kind="turkic" locale="az">
            <p>
              Qurumlar öz ölkələrinin siyahısına qoşulur. Hazırda fəaliyyətdə
              olan siyahı Türkiyənin siyahısıdır; digər türk dövlətləri üçün
              yerlər ayrılıb. Ölkə öz siyahısını dərc etdikdə onun qurumları
              orada qeydiyyatdan keçir və onların rəqəmsal sənədləri yenə də
              bütün şəbəkədə yoxlanılır.
            </p>
          </Callout>

          <h2>Qoşulduqdan sonra</h2>
          <p>
            Qurum həmişə şəbəkənin qaydalarına tabe olaraq qalır. Problem
            yaranarsa, onun fəaliyyəti dayandırıla bilər: o, artıq sənəd verə
            bilmir, lakin əvvəl verdiyi rəqəmsal sənədlər verildikləri tarixə
            görə etibarlı qalır. Qurum bildiriş verməklə şəbəkədən çıxa da
            bilər; keçmiş qeydlər silinmir və köhnə rəqəmsal sənədlər
            yoxlanılmağa davam edir.
          </p>
          <Callout kind="info" locale="az">
            <p>
              Şəbəkə heç bir xidmət satmır. İnteqrasiya və ya dəstək istəyən
              qurumlar bunu şəbəkədən kənar şirkətlərdən ala bilər; qeydiyyat
              prosesi hamı üçün eynidir.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Kurum ağa kaydolur; alan adı, tüzel kişilik ve anahtarı denetlenir, gizli anahtar kurumda kalır.",
        en: "The institution registers; its domain, legal identity and key are checked, and the private key stays with it.",
        tk: "Gurama hasaba alynýar; domeni, ýuridik şahsy we açary barlanýar, gizlin açar guramada galýar.",
        az: "Qurum qeydiyyatdan keçir; onun domeni, hüquqi statusu və açarı yoxlanılır, gizli açar isə qurumda qalır.",
      },
      {
        tr: "Her belge türü ayrı izinle açılır; testleri geçen kurum ülkesinin güven listesine girer.",
        en: "Each credential type is granted separately; an institution that passes the tests enters its country's trust list.",
        tk: "Her resminama görnüşi aýratyn rugsat bilen açylýar; synaglardan geçen gurama ýurdunyň ynam sanawyna girýär.",
        az: "Hər rəqəmsal sənəd növü üçün icazə ayrıca verilir; testlərdən keçən qurum öz ölkəsinin etibar siyahısına daxil olur.",
      },
      {
        tr: "Askıya alma ya da çıkış eski belgeleri geçersiz kılmaz; süreç herkes için aynıdır.",
        en: "Suspension or exit does not invalidate earlier credentials; the process is the same for everyone.",
        tk: "Togtatmak ýa-da çykmak öňki resminamalary güýjünden düşürmeýär; ýol hemmeler üçin birmeňzeş.",
        az: "Fəaliyyətin dayandırılması və ya çıxış əvvəlki rəqəmsal sənədləri etibarsız etmir; proses hamı üçün eynidir.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Kurum olarak ağa katılım (rehber)",
          en: "Joining as an institution (guide)",
          tk: "Gurama hökmünde goşulmak (gollanma)",
          az: "Qurum olaraq qoşulmaq (bələdçi)",
        },
        href: "/guides/join-as-institution",
        kind: "docs",
      },
      {
        label: {
          tr: "Uyum testleri",
          en: "Conformance tests",
          tk: "Laýyklyk synaglary",
          az: "Uyğunluq testləri",
        },
        href: "/guides/conformance",
        kind: "docs",
      },
      {
        label: {
          tr: "Katılım süreci",
          en: "Onboarding",
          tk: "Goşulyş tertibi",
          az: "Qoşulma prosesi",
        },
        href: "onboarding",
        kind: "arf",
      },
      {
        label: { tr: "Ağa katıl", en: "Join the network", tk: "Tora goşul", az: "Şəbəkəyə qoşulun" },
        href: "/join",
        kind: "site",
      },
    ],
  },

  /* ------------------------------------------------------------------ 7.2 */
  {
    slug: "join-as-verifier",
    chapter: 7,
    order: 2,
    minutes: 6,
    title: {
      tr: "Doğrulayıcı olmak",
      en: "Becoming a verifier",
      tk: "Barlaýjy bolmak",
      az: "Yoxlayan tərəf olmaq",
    },
    summary: {
      tr: "Kayıt, erişim sertifikası ve kişiden neler istenebileceği: doğrulayıcının yolu.",
      en: "Registration, an access certificate and what may be asked of a person: the verifier's path.",
      tk: "Hasaba alyş, giriş sertifikaty we adamdan näme soralyp bilinjekdigi: barlaýjynyň ýoly.",
      az: "Qeydiyyat, giriş sertifikatı və şəxsdən nələrin istənilə biləcəyi: yoxlayan tərəfin yolu.",
    },
    diagram: "disclosure",
    body: {
      tr: (
        <>
          <p>
            Bir işveren başvuranın diplomasını, bir otel misafirin kimliğini,
            bir konser kapısı bileti, bir web sitesi kullanıcının 18 yaşından
            büyük olduğunu görmek istiyor. Bunları kişinin cüzdanından isteyen
            herkes ağda{" "}
            <Term
              tip="Kişiden belge isteyen ve gelen belgeyi denetleyen taraf: işveren, banka, otel, web sitesi."
              en="verifier"
            >
              doğrulayıcıdır
            </Term>
            .
          </p>
          <p>
            Güven listeleri herkese açıktır: bir belgenin imzasını herkes
            denetleyebilir. Ama kişinin cüzdanından bilgi istemek için
            doğrulayıcının kaydolması gerekir. Nedeni basit: cüzdan, isteyenin
            kim olduğunu ve neyi isteyebileceğini bilmelidir.
          </p>

          <h2>İki yol</h2>
          <ul>
            <li>
              <strong>Barındırılan doğrulayıcı.</strong> Ağın referans
              doğrulayıcısı Tamga Verify&apos;ı kullanırsınız; sitenize bir
              düğme koyarsınız, gerisini o yapar. Sonuç ve değerler yalnız size
              ve bir kez verilir.
            </li>
            <li>
              <strong>Kendi yazılımınız.</strong> Açık kaynak paketlerle
              doğrulamayı kendi sunucunuzda yaparsınız.
            </li>
          </ul>
          <p>İki yolda da kayıt aynıdır.</p>

          <h2>Adım adım</h2>
          <ol>
            <li>
              <strong>Başvuru.</strong> Yalnız tüzel kişiler kaydolur.
              AB&apos;nin ortak kayıt veri seti istenir: resmî ad, kurum kimlik
              numarası, adres, iletişim, hizmetin açıklaması, kamu kurumu olup
              olmadığı, bir aracı kullanıp kullanmadığı ve bağlı olduğu veri
              koruma kurumu.
            </li>
            <li>
              <strong>Her kullanım için amaç.</strong> Ne için bilgi
              istediğinizi ve gizlilik politikanızı yazarsınız: &quot;Konser
              girişinde bilet&quot;, &quot;İş başvurusunda diploma&quot;.
            </li>
            <li>
              <strong>Alan incelemesi.</strong> İstemek istediğiniz alanlar{" "}
              <Term
                tip="Bir işlem için yalnız gerçekten gereken bilgiyi istemek ilkesi."
                en="data minimisation"
              >
                veri azaltma
              </Term>{" "}
              ilkesine göre incelenir. Yaş kontrolü için doğum tarihi değil,
              &quot;18 yaşından büyük&quot; yeterlidir.
            </li>
            <li>
              <strong>Erişim sertifikası.</strong> Kurumunuzu ve sitenizin alan
              adını kanıtlayan bir{" "}
              <Term
                tip="Doğrulayıcının kimliğini ve alan adını kanıtlayan sertifika; istekleri imzalamak için kullanılır."
                en="access certificate"
              >
                erişim sertifikası
              </Term>{" "}
              alırsınız. Cüzdana gönderdiğiniz her istek bununla imzalanır.
            </li>
            <li>
              <strong>Kayıt sertifikası.</strong> Her kullanım için en çok 12 ay
              geçerli bir kayıt sertifikası üretilir. Cüzdan, isteğinizi bu
              sertifikayla karşılaştırır.
            </li>
            <li>
              <strong>Uyum testleri.</strong> İmzalı istek, doğrulama adımları,
              bayat listede &quot;şu an doğrulanamadı&quot; sonucu ve kapsam
              dışı alan istememe test edilir.
            </li>
            <li>
              <strong>Listeye giriş.</strong> Kaydınız güven listesine eklenir;
              cüzdanlar sizi tanır.
            </li>
          </ol>
          <p>Ne kadar sürer? Kurumun hazırlığına bağlıdır.</p>

          <Callout kind="caution" locale="tr">
            <p>
              Doğrulayıcı kaydında yazılan alanların dışında bilgi isteyemez.
              Cüzdan isteği kayıtla karşılaştırır ve kişiye kimin, neyi, neden
              istediğini gösterir. Fazlası istendiğinde kişi bunu görür.
            </p>
          </Callout>

          <h2>Kişi ne görür?</h2>
          <p>
            Onay ekranında doğrulayıcının kayıtlı adı, amacı ve istenen alanlar
            yazar. Barındırılan doğrulayıcı kullanılıyorsa, &quot;aracı&quot;
            olarak o da görünür. Kişi onaylarsa yalnız istenen bilgiler gider;
            onaylamazsa hiçbir şey gitmez.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Bişkek&apos;teki bir şirket, İstanbul&apos;da verilmiş bir
              diplomayı doğrulamak için üniversiteyi aramaz. Belgedeki imzayı,
              üniversitenin Türkiye güven listesindeki kaydını ve iptal durumunu
              saniyeler içinde kendisi denetler.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            An employer wants to see an applicant&apos;s diploma, a hotel a
            guest&apos;s identity, a concert gate a ticket, a website that a
            user is over 18. Anyone who asks for these from a person&apos;s
            wallet is, on the network, a{" "}
            <Term
              tip="The party that requests a credential from a person and checks it: an employer, a bank, a hotel, a website."
              en="verifier"
            >
              verifier
            </Term>
            .
          </p>
          <p>
            Trust lists are public: anyone can check the signature on a
            credential. But to ask a person&apos;s wallet for data, a verifier
            must register. The reason is simple: the wallet has to know who is
            asking and what they may ask for.
          </p>

          <h2>Two ways</h2>
          <ul>
            <li>
              <strong>The hosted verifier.</strong> You use Tamga Verify, the
              network&apos;s reference verifier: you add a button to your site
              and it does the rest. Results and values are given to you only,
              and only once.
            </li>
            <li>
              <strong>Your own software.</strong> You verify on your own server
              with the open-source packages.
            </li>
          </ul>
          <p>Registration is the same either way.</p>

          <h2>Step by step</h2>
          <ol>
            <li>
              <strong>Application.</strong> Only legal entities register. The
              EU&apos;s common registration data set is used: official name,
              registration number, address, contact, a description of the
              service, whether it is a public body, whether it uses an
              intermediary and its data protection authority.
            </li>
            <li>
              <strong>A purpose for each use.</strong> You state why you ask and
              give your privacy policy: &quot;ticket at the concert
              entrance&quot;, &quot;diploma for a job application&quot;.
            </li>
            <li>
              <strong>Field review.</strong> The fields you want are reviewed
              against{" "}
              <Term
                tip="The principle of asking only for the data a transaction really needs."
                en="data minimisation"
              >
                data minimisation
              </Term>
              . For an age check, &quot;over 18&quot; is enough, not the date of
              birth.
            </li>
            <li>
              <strong>Access certificate.</strong> You receive an{" "}
              <Term
                tip="A certificate proving the verifier's identity and domain name; used to sign requests."
                en="access certificate"
              >
                access certificate
              </Term>{" "}
              that proves your institution and your site&apos;s domain name.
              Every request you send to a wallet is signed with it.
            </li>
            <li>
              <strong>Registration certificate.</strong> For each use, a
              registration certificate valid for up to 12 months is produced.
              The wallet compares your request with it.
            </li>
            <li>
              <strong>Conformance tests.</strong> Signed requests, the
              verification steps, the &quot;cannot be verified right now&quot;
              result on a stale list and not asking beyond scope are tested.
            </li>
            <li>
              <strong>Entry into the list.</strong> Your registration is added
              to the trust list; wallets recognise you.
            </li>
          </ol>
          <p>
            How long does it take? That depends on the institution&apos;s
            preparation.
          </p>

          <Callout kind="caution" locale="en">
            <p>
              A verifier cannot ask for data outside the fields in its
              registration. The wallet compares the request with the
              registration and shows the person who is asking, for what and why.
              If more is asked, the person sees it.
            </p>
          </Callout>

          <h2>What the person sees</h2>
          <p>
            The consent screen shows the verifier&apos;s registered name, its
            purpose and the requested fields. If a hosted verifier is used, it
            is shown as the &quot;intermediary&quot;. If the person approves,
            only the requested data goes; if not, nothing does.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              A company in Bishkek does not call the university to verify a
              diploma issued in Istanbul. It checks the signature, the
              university&apos;s entry in Türkiye&apos;s trust list and the
              revocation status itself, in seconds.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Iş beriji diplomany, myhmanhana şahsyýeti, konsert derwezesi bileti,
            web sahypasy ulanyjynyň 18 ýaşdan uludygyny görmek isleýär. Muny
            adamyň gapjygyndan soraýan her kim torda{" "}
            <Term
              tip="Adamdan resminama soraýan we ony barlaýan tarap."
              en="verifier"
            >
              barlaýjydyr
            </Term>
            . Ynam sanawlary hemmelere açyk, ýöne gapjykdan maglumat soramak
            üçin barlaýjy hasaba alynmaly.
          </p>

          <h2>Iki ýol</h2>
          <ul>
            <li>Toruň salgylanma barlaýjysy Tamga Verify.</li>
            <li>Açyk kodly paketler bilen öz serweriňizde barlamak.</li>
          </ul>

          <h2>Ädimme-ädim</h2>
          <ol>
            <li>
              Arza: diňe ýuridik şahslar; resmi at, hasaba alyş belgisi, salgy,
              hyzmatyň beýany, maglumat gorag edarasy.
            </li>
            <li>Her ulanyş üçin maksat we gizlinlik syýasaty.</li>
            <li>
              Meýdanlaryň{" "}
              <Term
                tip="Diňe hakykatdan gerek maglumaty soramak ýörelgesi."
                en="data minimisation"
              >
                maglumaty azaltmak
              </Term>{" "}
              ýörelgesi boýunça barlagy.
            </li>
            <li>
              <Term
                tip="Barlaýjynyň şahsyýetini we domenini subut edýän sertifikat."
                en="access certificate"
              >
                Giriş sertifikaty
              </Term>{" "}
              we her ulanyş üçin iň köp 12 aý güýjünde bolan hasaba alyş
              sertifikaty.
            </li>
            <li>Laýyklyk synaglary we sanawa girmek.</li>
          </ol>

          <Callout kind="caution" locale="tk">
            <p>
              Barlaýjy hasaba alnan meýdanlardan daşary maglumat sorap bilmeýär;
              gapjyk muny adama görkezýär.
            </p>
          </Callout>
          <Callout kind="turkic" locale="tk">
            <p>
              Bişkekdäki kompaniýa Stambulda berlen diplomany barlamak üçin
              uniwersitete jaň etmeýär: goly, sanawdaky ýazgyny we ýatyrylyş
              ýagdaýyny özi barlaýar.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            İşəgötürən namizədin diplomunu, otel qonağın şəxsiyyətini, konsert
            girişi bileti, veb sayt isə istifadəçinin 18 yaşdan yuxarı olduğunu
            görmək istəyir. Bunları şəxsin rəqəmsal cüzdanından istəyən hər kəs
            şəbəkədə{" "}
            <Term
              tip="Şəxsdən rəqəmsal sənəd istəyən və onu yoxlayan tərəf: işəgötürən, bank, otel, veb sayt."
              en="verifier"
            >
              yoxlayan tərəfdir
            </Term>
            .
          </p>
          <p>
            Etibar siyahıları açıqdır: rəqəmsal sənəddəki imzanı hər kəs
            yoxlaya bilər. Lakin şəxsin rəqəmsal cüzdanından məlumat istəmək
            üçün yoxlayan tərəf qeydiyyatdan keçməlidir. Səbəbi sadədir:
            rəqəmsal cüzdan kimin istədiyini və nələri istəyə biləcəyini
            bilməlidir.
          </p>

          <h2>İki yol</h2>
          <ul>
            <li>
              <strong>Təqdim olunan (hosted) yoxlama xidməti.</strong> Siz
              şəbəkənin istinad yoxlama xidməti olan Tamga Verify-dan istifadə
              edirsiniz: saytınıza düymə əlavə edirsiniz, qalanını o edir.
              Nəticələr və dəyərlər yalnız Sizə və yalnız bir dəfə verilir.
            </li>
            <li>
              <strong>Öz proqram təminatınız.</strong> Açıq mənbəli paketlərlə
              yoxlamanı öz serverinizdə aparırsınız.
            </li>
          </ul>
          <p>Hər iki halda qeydiyyat eynidir.</p>

          <h2>Addım-addım</h2>
          <ol>
            <li>
              <strong>Müraciət.</strong> Yalnız hüquqi şəxslər qeydiyyatdan
              keçir. Avropa İttifaqının (Aİ) ümumi qeydiyyat məlumat dəstindən
              istifadə olunur: rəsmi ad, qeydiyyat nömrəsi, ünvan, əlaqə
              məlumatları, xidmətin təsviri, dövlət orqanı olub-olmaması,
              vasitəçidən istifadə edib-etməməsi və aid olduğu məlumatların
              qorunması orqanı.
            </li>
            <li>
              <strong>Hər istifadə üçün məqsəd.</strong> Nə üçün məlumat
              istədiyinizi bildirir və məxfilik siyasətinizi təqdim edirsiniz:
              &quot;konsert girişində bilet&quot;, &quot;iş müraciəti üçün
              diplom&quot;.
            </li>
            <li>
              <strong>Sahələrin nəzərdən keçirilməsi.</strong> İstədiyiniz
              sahələr{" "}
              <Term
                tip="Əməliyyat üçün yalnız həqiqətən lazım olan məlumatları istəmək prinsipi."
                en="data minimisation"
              >
                məlumatların minimallaşdırılması
              </Term>{" "}
              prinsipi əsasında nəzərdən keçirilir. Yaş yoxlaması üçün doğum
              tarixi deyil, &quot;18 yaşdan yuxarı&quot; kifayətdir.
            </li>
            <li>
              <strong>Giriş sertifikatı.</strong> Siz qurumunuzu və saytınızın
              domen adını sübut edən{" "}
              <Term
                tip="Yoxlayan tərəfin kimliyini və domen adını sübut edən sertifikat; sorğuları imzalamaq üçün istifadə olunur."
                en="access certificate"
              >
                giriş sertifikatı
              </Term>{" "}
              alırsınız. Rəqəmsal cüzdana göndərdiyiniz hər sorğu onunla
              imzalanır.
            </li>
            <li>
              <strong>Qeydiyyat sertifikatı.</strong> Hər istifadə üçün ən çoxu
              12 ay etibarlı olan qeydiyyat sertifikatı hazırlanır. Rəqəmsal
              cüzdan sorğunuzu onunla müqayisə edir.
            </li>
            <li>
              <strong>Uyğunluq testləri.</strong> İmzalı sorğular, yoxlama
              addımları, köhnəlmiş siyahıda &quot;hazırda yoxlamaq mümkün
              deyil&quot; nəticəsi və icazə verilən çərçivədən artıq məlumat
              istənilməməsi test edilir.
            </li>
            <li>
              <strong>Siyahıya daxil olma.</strong> Qeydiyyatınız etibar
              siyahısına əlavə olunur; rəqəmsal cüzdanlar Sizi tanıyır.
            </li>
          </ol>
          <p>
            Bu nə qədər vaxt aparır? Bu, qurumun hazırlığından asılıdır.
          </p>

          <Callout kind="caution" locale="az">
            <p>
              Yoxlayan tərəf qeydiyyatındakı sahələrdən kənar məlumat istəyə
              bilməz. Rəqəmsal cüzdan sorğunu qeydiyyatla müqayisə edir və şəxsə
              kimin, nəyi və nə üçün istədiyini göstərir. Artıq məlumat
              istənildikdə şəxs bunu görür.
            </p>
          </Callout>

          <h2>Şəxs nəyi görür</h2>
          <p>
            Razılıq ekranında yoxlayan tərəfin qeydiyyatdakı adı, məqsədi və
            istənilən sahələr göstərilir. Təqdim olunan yoxlama xidmətindən
            istifadə edilirsə, o, &quot;vasitəçi&quot; kimi göstərilir. Şəxs
            təsdiqləyərsə, yalnız istənilən məlumatlar göndərilir;
            təsdiqləməzsə, heç nə göndərilmir.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Bişkekdəki şirkət İstanbulda verilmiş diplomu yoxlamaq üçün
              universitetə zəng etmir. O, imzanı, universitetin Türkiyənin
              etibar siyahısındakı qeydini və ləğv statusunu saniyələr ərzində
              özü yoxlayır.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Kişinin cüzdanından bilgi isteyen her kurum kaydolur; yalnız tüzel kişiler kaydolabilir.",
        en: "Every institution that asks a wallet for data registers; only legal entities can.",
        tk: "Gapjykdan maglumat soraýan her gurama hasaba alynýar; diňe ýuridik şahslar.",
        az: "Rəqəmsal cüzdandan məlumat istəyən hər qurum qeydiyyatdan keçir; bunu yalnız hüquqi şəxslər edə bilər.",
      },
      {
        tr: "İstenebilecek alanlar veri azaltma ilkesiyle belirlenir; istekler erişim sertifikasıyla imzalanır.",
        en: "Permitted fields follow data minimisation; requests are signed with an access certificate.",
        tk: "Soralyp bilinjek meýdanlar maglumaty azaltmak ýörelgesine görä kesgitlenýär; haýyşlar giriş sertifikaty bilen gol çekilýär.",
        az: "İcazə verilən sahələr məlumatların minimallaşdırılması prinsipinə əsaslanır; sorğular giriş sertifikatı ilə imzalanır.",
      },
      {
        tr: "Kişi onay ekranında kimin, neyi, neden istediğini görür; yalnız onayladığı bilgi gider.",
        en: "The consent screen shows who asks, for what and why; only what the person approves is shared.",
        tk: "Adam kimiň, näme we näme üçin soraýandygyny görýär; diňe tassyklanan maglumat gidýär.",
        az: "Razılıq ekranı kimin, nəyi və nə üçün istədiyini göstərir; yalnız şəxsin təsdiqlədiyi məlumatlar paylaşılır.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Doğrulayıcı kaydı (rehber)",
          en: "Verifier registration (guide)",
          tk: "Barlaýjy hasaba alyşy (gollanma)",
          az: "Yoxlayan tərəfin qeydiyyatı (bələdçi)",
        },
        href: "/guides/register-verifier",
        kind: "docs",
      },
      {
        label: {
          tr: "Uyum testleri",
          en: "Conformance tests",
          tk: "Laýyklyk synaglary",
          az: "Uyğunluq testləri",
        },
        href: "/guides/conformance",
        kind: "docs",
      },
      {
        label: {
          tr: "Roller ve yükümlülükler",
          en: "Roles and obligations",
          tk: "Rollar we borçlar",
          az: "Rollar və öhdəliklər",
        },
        href: "roles",
        kind: "arf",
      },
      {
        label: {
          tr: "Tamga Rulebook: doğrulayıcı kuralları",
          en: "Tamga Rulebook: verifier rules",
          tk: "Tamga Rulebook: barlaýjy düzgünleri",
          az: "Tamga Rulebook: yoxlayan tərəf qaydaları",
        },
        href: "rulebook",
        kind: "arf",
      },
    ],
  },

  /* ------------------------------------------------------------------ 7.3 */
  {
    slug: "build-a-wallet",
    chapter: 7,
    order: 3,
    minutes: 6,
    title: {
      tr: "Cüzdan kurmak",
      en: "Building a wallet",
      tk: "Gapjyk gurmak",
      az: "Rəqəmsal cüzdan yaratmaq",
    },
    summary: {
      tr: "Cüzdan sağlayıcısı olmak, uyum testlerini geçmek ve ağın listesine girmek.",
      en: "Becoming a wallet provider, passing the conformance tests and getting onto the network's list.",
      tk: "Gapjyk üpjün ediji bolmak, laýyklyk synaglaryndan geçmek we toruň sanawyna girmek.",
      az: "Cüzdan provayderi olmaq, uyğunluq testlərindən keçmək və şəbəkənin siyahısına daxil olmaq.",
    },
    body: {
      tr: (
        <>
          <p>
            Tamga Network cüzdan seçmez, tanır. Bir banka, bir girişim, bir kamu
            kurumu ya da bir topluluk kendi cüzdanını yapabilir; ağın
            yayınlanmış kurallarına uyan ve testleri geçen her cüzdan ağda
            çalışır. Cüzdanı yapan ve işleten kuruluşa{" "}
            <Term
              tip="Cüzdan uygulamasını yapan, işleten ve cüzdanların gerçek olduğuna kefil olan kuruluş."
              en="wallet provider"
            >
              cüzdan sağlayıcısı
            </Term>{" "}
            denir.
          </p>

          <h2>Cüzdan ne yapmak zorunda?</h2>
          <ul>
            <li>
              <strong>Anahtarları korumak.</strong> Kişinin belgesine bağlı
              anahtar telefondan çıkmaz; güvenli donanımda tutulur ve PIN ya da
              biyometriyle açılır.
            </li>
            <li>
              <strong>Kişiye sormak.</strong> Hiçbir bilgi onaysız gitmez. Onay
              ekranı kimin istediğini, neyi istediğini ve neden istediğini
              açıkça gösterir.
            </li>
            <li>
              <strong>Kaydı kişide tutmak.</strong> Kime ne gösterildiği yalnız
              telefonda kayıtlıdır; kişi isterse şifreli olarak dışa aktarır,
              isterse siler.
            </li>
            <li>
              <strong>Gizliliği korumak.</strong> Seçici paylaşım, her
              doğrulayıcıya ayrı kopya ve site başına takma ad desteklenir.
            </li>
            <li>
              <strong>Kendini kanıtlamak.</strong> Cüzdan, belge alırken gerçek
              ve değiştirilmemiş bir cüzdan olduğunu iki kanıtla gösterir: bir{" "}
              <Term
                tip="Cüzdan sağlayıcısının, bu cüzdanın kendi gerçek uygulaması olduğuna dair imzalı beyanı."
                en="Wallet Instance Attestation"
              >
                cüzdan örneği kanıtı
              </Term>{" "}
              ve anahtarın güvenli donanımda olduğunu söyleyen bir{" "}
              <Term
                tip="Belge anahtarının güvenli donanımda üretildiğini ve tutulduğunu gösteren imzalı beyan."
                en="key attestation"
              >
                anahtar kanıtı
              </Term>
              .
            </li>
          </ul>

          <h2>Adım adım</h2>
          <ol>
            <li>
              <strong>Kuralları okuyun.</strong> Tamga Rulebook&apos;taki cüzdan
              kuralları ve cüzdan şartnamesi, cüzdanın neyi yapmak zorunda
              olduğunu numaralı maddelerle söyler.
            </li>
            <li>
              <strong>Geliştirin.</strong> Açık kaynak cüzdan çekirdeğini
              kullanabilirsiniz; zorunlu değildir. Şartnameye uyan her yazılım
              geçerlidir. Cüzdan sağlayıcınızı siz işletirsiniz; ağ cüzdan
              işletmez.
            </li>
            <li>
              <strong>Sandbox&apos;ta deneyin.</strong> Cüzdan sağlayıcınız
              sandbox listesine kaydedilir (bugün başvuruyla) ve cüzdanınızı
              oradaki örnek kurumlarla, kimlik servisiyle ve doğrulayıcıyla
              uçtan uca denersiniz. Kendi kendine kayıt ve adresinizi
              verdiğiniz otomatik uyum testi planlanıyor.
            </li>
            <li>
              <strong>Cüzdan çözümünü beyan edin.</strong> Hangi platformlar,
              hangi güvenli donanım seviyesi, hangi kilit yöntemi ve hangi
              yedekleme modeli.
            </li>
            <li>
              <strong>Uyum testlerini geçin.</strong> Anahtar koruma, onay
              ekranı, geçmiş ve silme, iki kanıt ve gösterme protokolü; ayrıca
              gerçek bir cihazda gösterim.
            </li>
            <li>
              <strong>Listeye girin.</strong> İki kanıtı imzaladığınız anahtar
              listelerin listesine eklenir. Artık ağdaki kurumlar sizin
              cüzdanınıza belge verebilir.
            </li>
          </ol>
          <p>
            Ne kadar sürer? Ekibin hazırlığına ve testlerin sonucuna bağlıdır.
          </p>

          <Callout kind="info" locale="tr">
            <p>
              Ağın ilk cüzdanı Tamga Wallet&apos;tır. Ayrı bir üründür ve ağın
              kurallarına diğer her cüzdan gibi uyar; ona tanınmış bir ayrıcalık
              yoktur.
            </p>
          </Callout>

          <Callout kind="turkic" locale="tr">
            <p>
              Avrupa&apos;da da durum aynıdır: her AB ülkesi kendi vatandaşına
              bir cüzdan sunar, ama cüzdanlar aynı standartları konuşur. Başka
              bir güven listesinde kayıtlı bir cüzdan sağlayıcısı, o liste ağa
              federasyonla eklenmişse ve kapsamı izin veriyorsa Tamga
              Network&apos;te de tanınabilir.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            Tamga Network does not pick wallets; it recognises them. A bank, a
            start-up, a public body or a community can build its own wallet; any
            wallet that follows the network&apos;s published rules and passes
            the tests works on the network. The organisation that builds and
            runs a wallet is a{" "}
            <Term
              tip="The organisation that builds and runs the wallet app and vouches that its wallets are genuine."
              en="wallet provider"
            >
              wallet provider
            </Term>
            .
          </p>

          <h2>What a wallet must do</h2>
          <ul>
            <li>
              <strong>Protect keys.</strong> The key bound to a person&apos;s
              credential never leaves the phone; it is kept in secure hardware
              and unlocked with a PIN or biometrics.
            </li>
            <li>
              <strong>Ask the person.</strong> Nothing leaves without consent.
              The consent screen clearly shows who is asking, what for and why.
            </li>
            <li>
              <strong>Keep the record with the person.</strong> What was shown
              to whom is stored only on the phone; the person can export it
              encrypted or delete it.
            </li>
            <li>
              <strong>Protect privacy.</strong> Selective disclosure, a separate
              copy per verifier and a pseudonym per site are supported.
            </li>
            <li>
              <strong>Prove itself.</strong> When receiving a credential, the
              wallet shows it is a genuine, unmodified wallet with two proofs: a{" "}
              <Term
                tip="The wallet provider's signed statement that this wallet is its genuine app."
                en="Wallet Instance Attestation"
              >
                wallet instance attestation
              </Term>{" "}
              and a{" "}
              <Term
                tip="A signed statement that the credential key was created in and is kept by secure hardware."
                en="key attestation"
              >
                key attestation
              </Term>{" "}
              saying the key is in secure hardware.
            </li>
          </ul>

          <h2>Step by step</h2>
          <ol>
            <li>
              <strong>Read the rules.</strong> The wallet rules in the Tamga
              Rulebook and the wallet specification say, in numbered items, what
              a wallet must do.
            </li>
            <li>
              <strong>Build.</strong> You may use the open-source wallet core;
              you don&apos;t have to. Any software that follows the
              specification is valid. You run your own wallet provider; the
              network doesn&apos;t run wallets.
            </li>
            <li>
              <strong>Test in the sandbox.</strong> Your wallet provider is
              registered in the sandbox list (on request, for now) and you try
              your wallet end to end against the sample institutions, the
              identity service and the verifier there. Self-registration and an
              automatic conformance test, where you give your address, are
              planned.
            </li>
            <li>
              <strong>Declare your wallet solution.</strong> Which platforms,
              which level of secure hardware, which unlock method and which
              backup model.
            </li>
            <li>
              <strong>Pass the conformance tests.</strong> Key protection, the
              consent screen, history and deletion, both proofs and the
              presentation protocol; plus a demonstration on a real device.
            </li>
            <li>
              <strong>Enter the list.</strong> The key you sign both proofs with
              is added to the list of trusted lists. From then on, institutions
              on the network can issue credentials to your wallet.
            </li>
          </ol>
          <p>
            How long does it take? That depends on the team and the test
            results.
          </p>

          <Callout kind="info" locale="en">
            <p>
              The network&apos;s first wallet is Tamga Wallet. It is a separate
              product and follows the network&apos;s rules like any other
              wallet; it has no special privileges.
            </p>
          </Callout>

          <Callout kind="turkic" locale="en">
            <p>
              Europe works the same way: each EU country offers its citizens a
              wallet, but all wallets speak the same standards. A wallet
              provider registered in another trust list can also be recognised
              on Tamga Network, if that list has been added through federation
              and its scope allows it.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Tamga Network gapjyk saýlamaýar, ykrar edýär. Çap edilen düzgünlere
            eýerýän we synaglardan geçen her gapjyk torda işleýär. Gapjygy
            döredýän we işledýän gurama{" "}
            <Term
              tip="Gapjyk programmasyny döredýän we işledýän gurama."
              en="wallet provider"
            >
              gapjyk üpjün ediji
            </Term>{" "}
            diýilýär.
          </p>

          <h2>Gapjyk näme etmeli?</h2>
          <ul>
            <li>
              Açarlary howpsuz enjamda saklamak; PIN ýa-da biometrika bilen
              açmak.
            </li>
            <li>
              Razylyk bolmasa hiç zat ibermezlik; kimiň, näme we näme üçin
              soraýandygyny görkezmek.
            </li>
            <li>
              Ýazgyny diňe telefonda saklamak; adam ony şifrlenen görnüşde
              eksport edip ýa-da pozup biler.
            </li>
            <li>
              Saýlap paýlaşmak, her barlaýja aýratyn nusga we her sahypa üçin
              lakam.
            </li>
            <li>
              Özüni subut etmek:{" "}
              <Term
                tip="Gapjyk üpjün edijiniň bu gapjygyň hakyky programmasydygy barada gol çekilen beýany."
                en="Wallet Instance Attestation"
              >
                gapjyk nusgasynyň subutnamasy
              </Term>{" "}
              we açar subutnamasy (key attestation).
            </li>
          </ul>

          <h2>Ädimme-ädim</h2>
          <ol>
            <li>Tamga Rulebook-daky gapjyk düzgünlerini okaň.</li>
            <li>Işläp düzüň; açyk kodly gapjyk ýadrosy hökmany däl. Gapjyk üpjün edijiňizi özüňiz işledýärsiňiz.</li>
            <li>
              Sandbox-da synaň: üpjün edijiňiz sandbox sanawyna hasaba alynýar
              (häzir haýyş boýunça), gapjygyňyzy nusga guramalar, şahsyýet
              hyzmaty we barlaýjy bilen synap görýärsiňiz.
            </li>
            <li>
              Gapjyk çözgüdini yglan ediň: platformalar, howpsuz enjam, gulp
              usuly, ätiýaçlyk.
            </li>
            <li>Laýyklyk synaglaryndan we hakyky enjamda görkezişden geçiň.</li>
            <li>
              Subutnamalara gol çekýän açaryňyz sanawlaryň sanawyna goşulýar.
            </li>
          </ol>

          <Callout kind="info" locale="tk">
            <p>
              Toruň ilkinji gapjygy Tamga Wallet; aýry önüm we beýleki gapjyklar
              ýaly düzgünlere eýerýär.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Tamga Network rəqəmsal cüzdanları seçmir, onları tanıyır. Bank,
            startap, dövlət orqanı və ya icma öz rəqəmsal cüzdanını yarada
            bilər; şəbəkənin dərc olunmuş qaydalarına əməl edən və testlərdən
            keçən istənilən rəqəmsal cüzdan şəbəkədə işləyir. Rəqəmsal cüzdanı
            yaradan və idarə edən təşkilat{" "}
            <Term
              tip="Rəqəmsal cüzdan tətbiqini yaradan, idarə edən və onun cüzdanlarının həqiqi olduğuna zəmanət verən təşkilat."
              en="wallet provider"
            >
              cüzdan provayderidir
            </Term>
            .
          </p>

          <h2>Rəqəmsal cüzdan nə etməlidir</h2>
          <ul>
            <li>
              <strong>Açarları qorumaq.</strong> Şəxsin rəqəmsal sənədinə bağlı
              açar heç vaxt telefondan çıxmır; o, təhlükəsiz avadanlıqda
              saxlanılır və PIN və ya biometrik məlumatlarla açılır.
            </li>
            <li>
              <strong>Şəxsdən soruşmaq.</strong> Razılıq olmadan heç nə
              göndərilmir. Razılıq ekranı kimin, nəyi və nə üçün istədiyini
              aydın göstərir.
            </li>
            <li>
              <strong>Qeydləri şəxsdə saxlamaq.</strong> Kimə nəyin göstərildiyi
              yalnız telefonda saxlanılır; şəxs onu şifrələnmiş şəkildə ixrac
              edə və ya silə bilər.
            </li>
            <li>
              <strong>Məxfiliyi qorumaq.</strong> Seçici paylaşım (selective
              disclosure), hər yoxlayan tərəf üçün ayrıca nüsxə və hər sayt üçün
              ayrıca təxəllüs dəstəklənir.
            </li>
            <li>
              <strong>Özünü sübut etmək.</strong> Rəqəmsal sənəd qəbul edərkən
              rəqəmsal cüzdan həqiqi və dəyişdirilməmiş cüzdan olduğunu iki
              sübutla göstərir:{" "}
              <Term
                tip="Cüzdan provayderinin bu rəqəmsal cüzdanın onun həqiqi tətbiqi olduğuna dair imzalı bəyanatı."
                en="Wallet Instance Attestation"
              >
                cüzdan nüsxəsinin attestasiyası
              </Term>{" "}
              və{" "}
              <Term
                tip="Rəqəmsal sənəd açarının təhlükəsiz avadanlıqda yaradıldığını və orada saxlandığını göstərən imzalı bəyanat."
                en="key attestation"
              >
                açar attestasiyası
              </Term>{" "}
              (açarın təhlükəsiz avadanlıqda olduğunu təsdiqləyir).
            </li>
          </ul>

          <h2>Addım-addım</h2>
          <ol>
            <li>
              <strong>Qaydaları oxuyun.</strong> Tamga Rulebook-dakı rəqəmsal
              cüzdan qaydaları və cüzdan spesifikasiyası rəqəmsal cüzdanın nə
              etməli olduğunu nömrələnmiş bəndlərlə göstərir.
            </li>
            <li>
              <strong>Hazırlayın.</strong> Açıq mənbəli cüzdan nüvəsindən
              istifadə edə bilərsiniz; bu məcburi deyil. Spesifikasiyaya uyğun
              istənilən proqram təminatı etibarlıdır. Cüzdan provayderinizi Siz
              özünüz idarə edirsiniz; şəbəkə rəqəmsal cüzdan idarə etmir.
            </li>
            <li>
              <strong>Sandbox-da sınaqdan keçirin.</strong> Cüzdan provayderiniz
              sandbox siyahısında qeydiyyata alınır (hələlik müraciət əsasında)
              və Siz rəqəmsal cüzdanınızı oradakı nümunə qurumlar, şəxsiyyət
              xidməti və yoxlayan tərəflə başdan sona sınaqdan keçirirsiniz.
              Özünüqeydiyyat və ünvanınızı təqdim etdiyiniz avtomatik uyğunluq
              testi planlaşdırılır.
            </li>
            <li>
              <strong>Cüzdan həllinizi bəyan edin.</strong> Hansı platformalar,
              təhlükəsiz avadanlığın hansı səviyyəsi, hansı kilid açma üsulu və
              hansı ehtiyat nüsxə modeli.
            </li>
            <li>
              <strong>Uyğunluq testlərindən keçin.</strong> Açarların qorunması,
              razılıq ekranı, tarixçə və silmə, hər iki sübut və təqdimat
              protokolu; üstəlik real cihazda nümayiş.
            </li>
            <li>
              <strong>Siyahıya daxil olun.</strong> Hər iki sübutu imzaladığınız
              açar etibar siyahılarının siyahısına əlavə olunur. Bundan sonra
              şəbəkədəki qurumlar rəqəmsal cüzdanınıza rəqəmsal sənəd verə
              bilər.
            </li>
          </ol>
          <p>
            Bu nə qədər vaxt aparır? Bu, komandadan və test nəticələrindən
            asılıdır.
          </p>

          <Callout kind="info" locale="az">
            <p>
              Şəbəkənin ilk rəqəmsal cüzdanı Tamga Wallet-dır. O, ayrıca
              məhsuldur və digər rəqəmsal cüzdanlar kimi şəbəkənin qaydalarına
              əməl edir; onun heç bir xüsusi imtiyazı yoxdur.
            </p>
          </Callout>

          <Callout kind="turkic" locale="az">
            <p>
              Avropada da eyni qayda işləyir: Avropa İttifaqının (Aİ) hər bir
              ölkəsi öz vətəndaşlarına rəqəmsal cüzdan təqdim edir, lakin bütün
              cüzdanlar eyni standartlarla işləyir. Başqa etibar siyahısında
              qeydiyyatda olan cüzdan provayderi, həmin siyahı federasiya yolu
              ilə əlavə edilibsə və onun əhatə dairəsi buna imkan verirsə, Tamga
              Network-da da tanına bilər.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Ağ cüzdan seçmez, tanır: kurallara uyan ve testleri geçen her cüzdan çalışır.",
        en: "The network recognises wallets rather than picking them: any wallet that follows the rules and passes the tests works.",
        tk: "Tor gapjyk saýlamaýar, ykrar edýär: düzgünlere eýerýän her gapjyk işleýär.",
        az: "Şəbəkə rəqəmsal cüzdanları seçmir, tanıyır: qaydalara əməl edən və testlərdən keçən istənilən rəqəmsal cüzdan işləyir.",
      },
      {
        tr: "Cüzdan anahtarı güvenli donanımda tutar, onaysız bilgi göndermez ve kaydı kişide bırakır.",
        en: "A wallet keeps keys in secure hardware, sends nothing without consent and leaves the record with the person.",
        tk: "Gapjyk açary howpsuz enjamda saklaýar, razylyksyz hiç zat ibermeýär we ýazgyny adamda galdyrýar.",
        az: "Rəqəmsal cüzdan açarları təhlükəsiz avadanlıqda saxlayır, razılıq olmadan heç nə göndərmir və qeydləri şəxsdə saxlayır.",
      },
      {
        tr: "Testleri geçen sağlayıcının imza anahtarı listelerin listesine eklenir; Tamga Wallet da aynı yoldan geçer.",
        en: "A provider that passes has its signing key added to the list of trusted lists; Tamga Wallet takes the same path.",
        tk: "Synagdan geçen üpjün edijiniň açary sanawlaryň sanawyna goşulýar; Tamga Wallet hem şol ýoldan geçýär.",
        az: "Testlərdən keçən provayderin imza açarı etibar siyahılarının siyahısına əlavə olunur; Tamga Wallet da eyni yolu keçir.",
      },
      {
        tr: "Denemeler ayrı bir test ağında (sandbox) yapılır: uydurma kişiler, ayrı güven kökü ve gerçekçi olsun diye gerçek adlı örnek kurumlar (İstanbul Bilgi Üniversitesi, Bubilet, Paribu Cineverse; İstanbul Bilgi Üniversitesi pilot ortağımızdır, diğer ikisiyle bir ilişki ya da anlaşma yoktur); oradaki belge test anahtarıyla imzalıdır, hiçbir yerde geçmez.",
        en: "Testing happens on a separate test network (the sandbox): made-up people, its own trust root and, to keep it realistic, example institutions under real names (İstanbul Bilgi Üniversitesi, Bubilet, Paribu Cineverse; İstanbul Bilgi Üniversitesi is our pilot partner, and there is no relationship or agreement with the other two); a credential from there is signed with a test key and is not valid anywhere.",
        tk: "Synaglar aýry synag ulgamynda (sandbox) geçirilýär: oýlanyp tapylan adamlar, aýry ynam köki we hakyky bolar ýaly hakyky atly nusga guramalar (İstanbul Bilgi Üniversitesi, Bubilet, Paribu Cineverse; İstanbul Bilgi Üniversitesi biziň pilot hyzmatdaşymyz, beýleki ikisi bilen hiç hili gatnaşyk ýa-da ylalaşyk ýok); ondaky resminama synag açary bilen gol çekilen, hiç ýerde geçmeýär.",
        az: "Sınaqlar ayrıca test şəbəkəsində (sandbox) aparılır: uydurma şəxslər, öz etibar kökü və real görünməsi üçün həqiqi adlarla nümunə qurumlar (İstanbul Bilgi Üniversitesi, Bubilet, Paribu Cineverse; İstanbul Bilgi Üniversitesi pilot tərəfdaşımızdır, digər ikisi ilə heç bir əlaqə və ya razılaşma yoxdur); oradan verilən rəqəmsal sənəd test açarı ilə imzalanır və heç bir yerdə etibarlı deyil.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Cüzdan geliştirmek (rehber)",
          en: "Building a wallet (guide)",
          tk: "Gapjyk döretmek (gollanma)",
          az: "Rəqəmsal cüzdan yaratmaq (bələdçi)",
        },
        href: "/guides/build-a-wallet",
        kind: "docs",
      },
      {
        label: {
          tr: "Cüzdan yayın öncesi kontrol listesi",
          en: "Wallet pre-release checklist",
          tk: "Gapjyk barlag sanawy",
          az: "Rəqəmsal cüzdan üçün buraxılışdan əvvəl yoxlama siyahısı",
        },
        href: "/guides/wallet-checklist",
        kind: "docs",
      },
      {
        label: {
          tr: "Sandbox: test ağında uçtan uca deneme",
          en: "Sandbox: end-to-end testing on the test network",
          tk: "Sandbox: synag ulgamynda başdan-aýak synag",
          az: "Sandbox: test şəbəkəsində başdan sona sınaq",
        },
        href: "/guides/sandbox",
        kind: "docs",
      },
      {
        label: {
          tr: "Uyum testleri",
          en: "Conformance tests",
          tk: "Laýyklyk synaglary",
          az: "Uyğunluq testləri",
        },
        href: "/guides/conformance",
        kind: "docs",
      },
      {
        label: {
          tr: "Tamga Rulebook: cüzdan kuralları",
          en: "Tamga Rulebook: wallet rules",
          tk: "Tamga Rulebook: gapjyk düzgünleri",
          az: "Tamga Rulebook: rəqəmsal cüzdan qaydaları",
        },
        href: "rulebook",
        kind: "arf",
      },
    ],
  },

  /* ------------------------------------------------------------------ 7.4 */
  {
    slug: "for-states",
    chapter: 7,
    order: 4,
    minutes: 6,
    title: { tr: "Devletler için", en: "For states", tk: "Döwletler üçin", az: "Dövlətlər üçün" },
    summary: {
      tr: "Bir devlet kendi güven listesini nasıl yayınlar ve geçici işletmeciden listeyi nasıl devralır.",
      en: "How a state publishes its own trust list and takes the list over from the provisional operator.",
      tk: "Döwlet öz ynam sanawyny nädip çap edýär we sanawy wagtlaýyn operatordan nädip kabul edýär.",
      az: "Dövlət öz etibar siyahısını necə dərc edir və siyahını müvəqqəti operatordan necə təhvil alır.",
    },
    diagram: "roles",
    body: {
      tr: (
        <>
          <p>
            Tamga Network&apos;ün temel ilkesi şudur: her devlet kendi
            listesinin sahibidir. Bir ülkede hangi kurumların belge vermeye
            yetkili olduğuna o ülke karar verir; başka bir ülkenin listesine
            kimin gireceğine karışmaz.
          </p>

          <h2>Bugün durum ne?</h2>
          <p>
            Bugün Türkiye listesini Tamga, devlet adına ve geçici olarak
            işletir; listede bu açıkça yazar. Diğer Türk devletleri için yerler
            ayrılmış durumda. Ağın yapısı ilk günden birden çok devlete göre
            kuruldu: kimlikler, liste biçimi ve kurallar bir devlet katıldığında
            değişmez.
          </p>

          <h2>Bir devletin iki yolu</h2>
          <h3>1. Kendi listesini yayınlamak</h3>
          <p>
            Devlet ya da devletin yetkilendirdiği bir kurum, kendi güven
            listesini Avrupa&apos;nın kullandığı biçimde (ETSI TS 119 602)
            yayınlar. Tamga&apos;nın listelerin listesi bu listeyi dört bilgiyle
            gösterir:
          </p>
          <ul>
            <li>listenin yayın adresi;</li>
            <li>
              listeyi imzalayan sertifikanın sabitlenmiş{" "}
              <Term
                tip="Bir sertifikanın kısa, benzersiz özeti; değişirse hemen anlaşılır."
                en="fingerprint"
              >
                parmak izi
              </Term>
              ;
            </li>
            <li>
              listenin hangi rollere ve belge türlerine kefil olabileceği
              (kapsam);
            </li>
            <li>hangi kararla ve hangi tarihte eklendiği.</li>
          </ul>
          <p>
            Liste sahibinde kalır; Tamga yalnızca onu gösterir. İmzası
            eşleşmeyen liste yüklenmez. Bir listenin geçici olarak erişilemez
            olması diğer listeleri etkilemez. Bu yapıya{" "}
            <Term
              tip="Ayrı ayrı yönetilen listelerin, her biri kendi sahibinde kalarak birbirini tanıması."
              en="federation"
            >
              federasyon
            </Term>{" "}
            denir.
          </p>
          <h3>2. Geçici işletmeciden devralmak</h3>
          <p>
            Devir adım adım yapılır ve hiçbir belgeyi, kaydı ya da kimliği
            geçersiz kılmaz:
          </p>
          <ol>
            <li>
              Ulusal liste işletmeciliği devlete geçer; devletin imza
              sertifikası eklenir.
            </li>
            <li>
              Kayıt kurumu yetkisi devlete geçer; Tamga artık o ülkede kayıt
              yapamaz.
            </li>
            <li>
              Ulusal kök sertifikanın işletmecisi değişir ya da devletin kendi
              kökü eklenir.
            </li>
            <li>
              Devletin kişi kimliği belgesi (
              <Term
                tip="Devletin verdiği kişi kimliği belgesi; AB'de Person Identification Data."
                en="PID"
              >
                PID
              </Term>
              ) için ayrılan yer devlet tarafından doldurulur.
            </li>
            <li>
              En az iki bağımsız işletmeci olduğunda ortak defter aşamasına
              geçilir.
            </li>
          </ol>
          <p>
            Cüzdanlar ve doğrulayıcılar için yalnız adres ve imzacı değişir;
            kişiler bir şey yapmak zorunda kalmaz.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Bir ya da iki devlet katılmaya istekli olduğunda ağın yönetişimi
              için bir konsey ya da vakıf kurulur. Üyelik üçte iki oyla olur.
              Her devlet hangi ülkelerin belgelerini tanıyacağına kendisi karar
              verir; tanıma karşılıklı olmak zorunda değildir.
            </p>
          </Callout>

          <h2>Avrupa ile bağ</h2>
          <p>
            Ağ, AB listelerini de aynı federasyon yöntemiyle dış liste olarak
            okuyabilir. Böylece bir Türk devletinin kurumlarının belgeleri ile
            AB&apos;nin belgeleri aynı standartları konuşur. Uzun vadede
            devletler arası hukuki tanıma, AB ile ayrı anlaşmalarla kurulur.
          </p>
        </>
      ),
      en: (
        <>
          <p>
            Tamga Network&apos;s founding principle: each state owns its own
            list. A country decides which of its institutions may issue
            credentials; it does not decide who enters another country&apos;s
            list.
          </p>

          <h2>Where things stand today</h2>
          <p>
            Today Tamga operates Türkiye&apos;s list provisionally, on the
            state&apos;s behalf; the list says so explicitly. Places are
            reserved for the other Turkic states. The network was built for many
            states from day one: identifiers, the list format and the rules do
            not change when a state joins.
          </p>

          <h2>Two paths for a state</h2>
          <h3>1. Publishing its own list</h3>
          <p>
            The state, or a body it authorises, publishes its own trust list in
            the format Europe uses (ETSI TS 119 602). Tamga&apos;s list of
            trusted lists then shows that list with four pieces of information:
          </p>
          <ul>
            <li>the list&apos;s publication address;</li>
            <li>
              the pinned{" "}
              <Term
                tip="A short, unique digest of a certificate; any change is noticed at once."
                en="fingerprint"
              >
                fingerprint
              </Term>{" "}
              of the certificate that signs it;
            </li>
            <li>
              which roles and credential types the list may vouch for (its
              scope);
            </li>
            <li>which decision added it, and when.</li>
          </ul>
          <p>
            The list stays with its owner; Tamga only points to it. A list whose
            signature does not match is not loaded. If one list is temporarily
            unreachable, the others are not affected. This is called{" "}
            <Term
              tip="Separately run lists recognising one another, each staying with its owner."
              en="federation"
            >
              federation
            </Term>
            .
          </p>
          <h3>2. Taking over from the provisional operator</h3>
          <p>
            The hand-over happens in steps and invalidates no credential, record
            or identifier:
          </p>
          <ol>
            <li>
              National list operation passes to the state; the state&apos;s
              signing certificate is added.
            </li>
            <li>
              The registrar role passes to the state; Tamga can no longer
              register anyone in that country.
            </li>
            <li>
              The national root certificate changes operator, or the
              state&apos;s own root is added.
            </li>
            <li>
              The place reserved for the state&apos;s person identification
              credential (
              <Term
                tip="The personal identity credential a state issues; in the EU, Person Identification Data."
                en="PID"
              >
                PID
              </Term>
              ) is filled by the state.
            </li>
            <li>
              With at least two independent operators, the network moves to the
              shared-ledger stage.
            </li>
          </ol>
          <p>
            For wallets and verifiers only the address and the signer change;
            people do not have to do anything.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              When one or two states are willing to join, a council or
              foundation is set up to govern the network. Membership is by a
              two-thirds vote. Each state decides for itself which
              countries&apos; credentials it recognises; recognition does not
              have to be mutual.
            </p>
          </Callout>

          <h2>The link with Europe</h2>
          <p>
            The network can also read EU lists as external lists, with the same
            federation method. The credentials of a Turkic state&apos;s
            institutions and those of the EU thus speak the same standards.
            Legal recognition between states is built in the long run through
            separate agreements with the EU.
          </p>
        </>
      ),
      tk: (
        <>
          <p>
            Tamga Network-yň esasy ýörelgesi: her döwlet öz sanawynyň eýesidir.
            Haýsy guramalaryň resminama bermäge ygtyýarlydygyny şol ýurt özi
            çözýär.
          </p>

          <h2>Häzir ýagdaý nähili?</h2>
          <p>
            Häzir Türkiýäniň sanawyny Tamga döwletiň adyndan wagtlaýyn işledýär.
            Beýleki türki döwletler üçin ýer goýlan. Döwlet goşulanda
            kesgitleýjiler, sanaw formaty we düzgünler üýtgemeýär.
          </p>

          <h2>Döwletiň iki ýoly</h2>
          <h3>1. Öz sanawyny çap etmek</h3>
          <p>
            Döwlet öz ynam sanawyny Ýewropanyň formatynda (ETSI TS 119 602) çap
            edýär. Tamga-nyň sanawlaryň sanawy ony salgysy, gol çekijiniň{" "}
            <Term tip="Sertifikatyň gysga, özboluşly jemi." en="fingerprint">
              barmak yzy
            </Term>
            , gerimi we kararyň senesi bilen görkezýär. Sanaw eýesinde galýar.
            Munuň ady{" "}
            <Term
              tip="Aýry dolandyrylýan sanawlaryň biri-birini ykrar etmegi."
              en="federation"
            >
              federasiýa
            </Term>
            .
          </p>
          <h3>2. Wagtlaýyn operatordan kabul etmek</h3>
          <ol>
            <li>Milli sanawy işletmek döwlete geçýär.</li>
            <li>Hasaba alyş ygtyýary döwlete geçýär.</li>
            <li>Milli kök sertifikatyň operatory üýtgeýär.</li>
            <li>PID üçin goýlan ýeri döwlet doldurýar.</li>
            <li>
              Iň azyndan iki garaşsyz operator bolanda umumy kitap tapgyryna
              geçilýär.
            </li>
          </ol>
          <p>
            Hiç bir resminama güýjünden düşmeýär; gapjyklar we barlaýjylar üçin
            diňe salgy üýtgeýär.
          </p>

          <Callout kind="turkic" locale="tk">
            <p>
              Bir ýa-da iki döwlet goşulmaga taýyn bolanda geňeş ýa-da
              gaznaçylyk döredilýär. Agzalyk üçden iki ses bilen bolýar; her
              döwlet kimi ykrar etjekdigini özi çözýär.
            </p>
          </Callout>
        </>
      ),
      az: (
        <>
          <p>
            Tamga Network-un əsas prinsipi: hər dövlət öz siyahısının
            sahibidir. Ölkə öz qurumlarından hansının rəqəmsal sənəd verə
            biləcəyinə özü qərar verir; başqa ölkənin siyahısına kimin daxil
            olacağına isə qərar vermir.
          </p>

          <h2>Bu gün vəziyyət necədir</h2>
          <p>
            Hazırda Türkiyənin siyahısını Tamga müvəqqəti olaraq, dövlət adından
            idarə edir; siyahıda bu açıq şəkildə qeyd olunur. Digər türk
            dövlətləri üçün yerlər ayrılıb. Şəbəkə ilk gündən bir çox dövlət
            üçün qurulub: dövlət qoşulduqda identifikatorlar, siyahının formatı
            və qaydalar dəyişmir.
          </p>

          <h2>Dövlət üçün iki yol</h2>
          <h3>1. Öz siyahısını dərc etmək</h3>
          <p>
            Dövlət və ya onun səlahiyyət verdiyi orqan öz etibar siyahısını
            Avropanın istifadə etdiyi formatda (ETSI TS 119 602) dərc edir.
            Bundan sonra Tamga-nın etibar siyahılarının siyahısı həmin siyahını
            dörd məlumatla göstərir:
          </p>
          <ul>
            <li>siyahının dərc ünvanı;</li>
            <li>
              siyahını imzalayan sertifikatın sabitlənmiş{" "}
              <Term
                tip="Sertifikatın qısa, unikal həzmi; istənilən dəyişiklik dərhal nəzərə çarpır."
                en="fingerprint"
              >
                barmaq izi
              </Term>
              ;
            </li>
            <li>
              siyahının hansı rollara və rəqəmsal sənəd növlərinə zəmanət verə
              biləcəyi (əhatə dairəsi);
            </li>
            <li>hansı qərarla və nə vaxt əlavə edildiyi.</li>
          </ul>
          <p>
            Siyahı sahibində qalır; Tamga yalnız ona istinad edir. İmzası uyğun
            gəlməyən siyahı yüklənmir. Bir siyahı müvəqqəti əlçatmaz olarsa,
            bu, digərlərinə təsir etmir. Buna{" "}
            <Term
              tip="Ayrı-ayrılıqda idarə olunan siyahıların, hər biri öz sahibində qalmaqla, bir-birini tanıması."
              en="federation"
            >
              federasiya
            </Term>{" "}
            deyilir.
          </p>
          <h3>2. Müvəqqəti operatordan təhvil almaq</h3>
          <p>
            Təhvil mərhələlərlə həyata keçirilir və heç bir rəqəmsal sənədi,
            qeydi və ya identifikatoru etibarsız etmir:
          </p>
          <ol>
            <li>
              Milli siyahının idarə edilməsi dövlətə keçir; dövlətin imza
              sertifikatı əlavə olunur.
            </li>
            <li>
              Qeydiyyat orqanı rolu dövlətə keçir; Tamga artıq həmin ölkədə heç
              kimi qeydiyyata ala bilməz.
            </li>
            <li>
              Milli kök sertifikatın operatoru dəyişir və ya dövlətin öz kökü
              əlavə olunur.
            </li>
            <li>
              Dövlətin şəxsiyyəti təsdiq edən rəqəmsal sənədi (
              <Term
                tip="Dövlətin verdiyi şəxsiyyət sənədi; Aİ-də Person Identification Data."
                en="PID"
              >
                PID
              </Term>
              ) üçün ayrılmış yer dövlət tərəfindən doldurulur.
            </li>
            <li>
              Ən azı iki müstəqil operator olduqda şəbəkə ortaq reyestr
              mərhələsinə keçir.
            </li>
          </ol>
          <p>
            Rəqəmsal cüzdanlar və yoxlayan tərəflər üçün yalnız ünvan və
            imzaçı dəyişir; şəxslərin heç nə etməsinə ehtiyac yoxdur.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Bir və ya iki dövlət qoşulmağa hazır olduqda şəbəkəni idarə etmək
              üçün şura və ya fond yaradılır. Üzvlük üçdə iki səslə həyata
              keçirilir. Hər dövlət hansı ölkələrin rəqəmsal sənədlərini
              tanıyacağına özü qərar verir; tanınmanın qarşılıqlı olması məcburi
              deyil.
            </p>
          </Callout>

          <h2>Avropa ilə əlaqə</h2>
          <p>
            Şəbəkə eyni federasiya üsulu ilə Avropa İttifaqının (Aİ)
            siyahılarını da xarici siyahılar kimi oxuya bilər. Beləliklə, türk
            dövlətinin qurumlarının rəqəmsal sənədləri ilə Aİ-nin rəqəmsal
            sənədləri eyni standartlarla işləyir. Dövlətlərarası hüquqi tanınma
            uzunmüddətli perspektivdə Aİ ilə ayrıca sazişlər vasitəsilə
            qurulur.
          </p>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Her devlet kendi listesinin sahibidir; bugün Türkiye listesini Tamga geçici olarak işletir.",
        en: "Each state owns its list; today Tamga operates Türkiye's list provisionally.",
        tk: "Her döwlet öz sanawynyň eýesi; häzir Türkiýäniň sanawyny Tamga wagtlaýyn işledýär.",
        az: "Hər dövlət öz siyahısının sahibidir; hazırda Türkiyənin siyahısını Tamga müvəqqəti olaraq idarə edir.",
      },
      {
        tr: "Devlet kendi listesini yayınlarsa ağ onu federasyonla gösterir; liste sahibinde kalır.",
        en: "If a state publishes its own list, the network points to it through federation; the list stays with its owner.",
        tk: "Döwlet öz sanawyny çap etse, tor ony federasiýa arkaly görkezýär.",
        az: "Dövlət öz siyahısını dərc edərsə, şəbəkə federasiya vasitəsilə ona istinad edir; siyahı sahibində qalır.",
      },
      {
        tr: "Devir adım adım yapılır ve hiçbir belgeyi geçersiz kılmaz; yalnız adres ve imzacı değişir.",
        en: "Hand-over happens step by step and invalidates no credential; only the address and signer change.",
        tk: "Tabşyryş ädimme-ädim bolýar we hiç bir resminamany güýjünden düşürmeýär.",
        az: "Təhvil addım-addım həyata keçirilir və heç bir rəqəmsal sənədi etibarsız etmir; yalnız ünvan və imzaçı dəyişir.",
      },
    ],
    deeper: [
      {
        label: {
          tr: "Devletler: liste yayınlama ve federasyon",
          en: "States: publishing a list and federation",
          tk: "Döwletler: sanaw çap etmek",
          az: "Dövlətlər: siyahının dərci və federasiya",
        },
        href: "/guides/publish-national-list",
        kind: "docs",
      },
      {
        label: { tr: "Federasyon", en: "Federation", tk: "Federasiýa", az: "Federasiya" },
        href: "/concepts/federation",
        kind: "docs",
      },
      {
        label: {
          tr: "Trust Framework: devir planı",
          en: "Trust Framework: hand-over plan",
          tk: "Trust Framework: tabşyryş meýilnamasy",
          az: "Trust Framework: təhvil planı",
        },
        href: "trust-framework",
        kind: "arf",
      },
      {
        label: {
          tr: "Ağa katıl: devletler",
          en: "Join the network: states",
          tk: "Tora goşul: döwletler",
          az: "Şəbəkəyə qoşulun: dövlətlər",
        },
        href: "/join",
        kind: "site",
      },
    ],
  },

  /* ------------------------------------------------------------------ 7.5 */
  {
    slug: "next-steps",
    chapter: 7,
    order: 5,
    minutes: 3,
    title: { tr: "Sırada ne var?", en: "What next?", tk: "Indiki ädim näme?", az: "Növbəti addım nədir?" },
    summary: {
      tr: "Sözlük, geliştirici belgeleri, Tamga ARF ve iletişim: buradan sonra nereye gidilir.",
      en: "The glossary, the developer docs, Tamga ARF and contact: where to go from here.",
      tk: "Sözlük, işläp düzüjiler üçin resminamalar, Tamga ARF we habarlaşmak: şu ýerden soň nirä gitmeli.",
      az: "Lüğət, tərtibatçı sənədləri, Tamga ARF və əlaqə: buradan sonra hara müraciət etmək olar.",
    },
    body: {
      tr: (
        <>
          <p>
            Yolun sonuna geldiniz. Dijital kimlikten başlayıp imzayı,
            doğrulanabilir belgeyi, gizliliği, Avrupa&apos;nın modelini, güven
            listelerini ve Tamga Network&apos;ü gördünüz. Buradan sonra yolunuz
            rolünüze göre ayrılır.
          </p>

          <h2>Kuralları ayrıntısıyla okumak istiyorsanız</h2>
          <p>
            Tamga ARF ağın çerçevesidir: roller, güven modeli, Trust Framework,
            Tamga Rulebook ve belge türü rulebook&apos;ları. &quot;Okuma
            yolu&quot; sayfası rolünüze göre neyi okumanız gerektiğini gösterir.
          </p>

          <h2>Uygulamak istiyorsanız</h2>
          <p>
            Geliştirici belgeleri adım adım rehberler, kod örnekleri, açık
            kaynak paketler ve şartnameler sunar. &quot;Başlarken&quot;
            sayfasından hangi yolun size uygun olduğunu seçebilirsiniz.
          </p>

          <h2>Bir terimi unuttuysanız</h2>
          <p>
            Sözlük, bu yolda geçen bütün terimleri kısa açıklamalarıyla bir
            araya getirir.
          </p>

          <h2>Katılmak ya da sormak istiyorsanız</h2>
          <p>
            &quot;Ağa katıl&quot; sayfası kurumlar, cüzdan sağlayıcılar ve
            devletler için kapıları anlatır. Sorularınız için{" "}
            <strong>info@tamga.network</strong> adresine yazabilirsiniz.
          </p>

          <Callout kind="turkic" locale="tr">
            <p>
              Tamga Network, Türk dünyasının belgelerinin sınır tanımadan,
              kişinin kontrolünde ve Avrupa ile aynı dili konuşarak dolaşması
              için var. Bu yolu okuyan herkes, bunun bir parçası olmayı da
              düşünebilir.
            </p>
          </Callout>
        </>
      ),
      en: (
        <>
          <p>
            You have reached the end of the path. Starting from digital
            identity, you have seen signatures, verifiable credentials, privacy,
            Europe&apos;s model, trust lists and Tamga Network. From here, your
            path depends on your role.
          </p>

          <h2>If you want the rules in detail</h2>
          <p>
            Tamga ARF is the network&apos;s framework: roles, the trust model,
            the Trust Framework, the Tamga Rulebook and the credential-type
            rulebooks. Its &quot;Reading path&quot; page shows what to read for
            your role.
          </p>

          <h2>If you want to build</h2>
          <p>
            The developer docs offer step-by-step guides, code examples,
            open-source packages and specifications. The &quot;Get started&quot;
            page helps you pick the right path.
          </p>

          <h2>If you forgot a term</h2>
          <p>
            The glossary gathers every term used along this path, with short
            explanations.
          </p>

          <h2>If you want to join or ask</h2>
          <p>
            The &quot;Join the network&quot; page describes the doors for
            institutions, wallet providers and states. For questions, write to{" "}
            <strong>info@tamga.network</strong>.
          </p>

          <Callout kind="turkic" locale="en">
            <p>
              Tamga Network exists so that the Turkic world&apos;s credentials
              can travel across borders, under the person&apos;s control and in
              the same language as Europe. Anyone who has read this far might
              consider being part of it.
            </p>
          </Callout>
        </>
      ),
      tk: (
        <>
          <p>
            Ýoluň soňuna ýetdiňiz. Sanly şahsyýetden başlap, gol, barlanyp
            bilinýän resminama, gizlinlik, Ýewropanyň modeli, ynam sanawlary we
            Tamga Network bilen tanyşdyňyz.
          </p>
          <h2>Düzgünleri jikme-jik okamak üçin</h2>
          <p>
            Tamga ARF: rollar, ynam modeli, Trust Framework we rulebook-lar.
            &quot;Okaýyş ýoly&quot; sahypasy size näme okamalydygyny görkezýär.
          </p>
          <h2>Işläp düzmek üçin</h2>
          <p>
            Işläp düzüjiler üçin resminamalar: gollanmalar, kod mysallary, açyk
            kodly paketler we spesifikasiýalar.
          </p>
          <h2>Goşulmak ýa-da soramak üçin</h2>
          <p>
            &quot;Tora goşul&quot; sahypasy guramalar, gapjyk üpjün edijiler we
            döwletler üçin. Soraglar üçin: <strong>info@tamga.network</strong>.
          </p>
        </>
      ),
      az: (
        <>
          <p>
            Yolun sonuna çatdınız. Rəqəmsal şəxsiyyətdən başlayaraq imzalar,
            yoxlanıla bilən rəqəmsal sənədlər, məxfilik, Avropanın modeli, etibar
            siyahıları və Tamga Network ilə tanış oldunuz. Buradan sonra
            yolunuz rolunuzdan asılıdır.
          </p>

          <h2>Qaydaları ətraflı oxumaq istəyirsinizsə</h2>
          <p>
            Tamga ARF şəbəkənin çərçivəsidir: rollar, etibar modeli, Trust
            Framework, Tamga Rulebook və rəqəmsal sənəd növləri üzrə
            rulebook-lar. Onun &quot;Oxu yolu&quot; səhifəsi rolunuza görə nəyi
            oxumalı olduğunuzu göstərir.
          </p>

          <h2>Tətbiq etmək istəyirsinizsə</h2>
          <p>
            Tərtibatçı sənədləri addım-addım bələdçilər, kod nümunələri, açıq
            mənbəli paketlər və spesifikasiyalar təqdim edir. &quot;Başlanğıc&quot;
            səhifəsi Sizə uyğun yolu seçməyə kömək edir.
          </p>

          <h2>Hansısa termini unutmusunuzsa</h2>
          <p>
            Lüğət bu yolda istifadə olunan bütün terminləri qısa izahlarla bir
            yerə toplayır.
          </p>

          <h2>Qoşulmaq və ya sual vermək istəyirsinizsə</h2>
          <p>
            &quot;Şəbəkəyə qoşulun&quot; səhifəsi qurumlar, cüzdan provayderləri
            və dövlətlər üçün yolları təsvir edir. Suallarınızı{" "}
            <strong>info@tamga.network</strong>{" "}
            ünvanına göndərə bilərsiniz.
          </p>

          <Callout kind="turkic" locale="az">
            <p>
              Tamga Network türk dünyasının rəqəmsal sənədlərinin sərhədlər
              arasında, şəxsin nəzarəti altında və Avropa ilə eyni dildə dolaşa
              bilməsi üçün mövcuddur. Buraya qədər oxuyan hər kəs onun bir
              hissəsi olmağı düşünə bilər.
            </p>
          </Callout>
        </>
      ),
    },
    keyPoints: [
      {
        tr: "Kuralların ayrıntısı Tamga ARF'de; okuma yolu rolünüze göre yol gösterir.",
        en: "The rules in detail are in Tamga ARF; the reading path guides you by role.",
        tk: "Düzgünleriň jikme-jikligi Tamga ARF-de.",
        az: "Qaydaların təfərrüatı Tamga ARF-dədir; oxu yolu Sizə rolunuza görə istiqamət verir.",
      },
      {
        tr: "Uygulama için geliştirici belgeleri: rehberler, kod örnekleri, paketler ve şartnameler.",
        en: "For implementation: the developer docs with guides, examples, packages and specifications.",
        tk: "Işläp düzmek üçin: işläp düzüjiler üçin resminamalar.",
        az: "Tətbiq üçün: bələdçilər, nümunələr, paketlər və spesifikasiyalar olan tərtibatçı sənədləri.",
      },
      {
        tr: 'Katılmak için "Ağa katıl" sayfası; sorular için info@tamga.network.',
        en: 'To join, the "Join the network" page; for questions, info@tamga.network.',
        tk: 'Goşulmak üçin "Tora goşul" sahypasy; soraglar üçin info@tamga.network.',
        az: 'Qoşulmaq üçün "Şəbəkəyə qoşulun" səhifəsi; suallar üçün info@tamga.network.',
      },
    ],
    deeper: [
      {
        label: { tr: "Okuma yolu", en: "Reading path", tk: "Okaýyş ýoly", az: "Oxu yolu" },
        href: "reading-path",
        kind: "arf",
      },
      {
        label: { tr: "Başlarken", en: "Get started", tk: "Başlamak", az: "Başlanğıc" },
        href: "/guides/",
        kind: "docs",
      },
      {
        label: { tr: "Sözlük", en: "Glossary", tk: "Sözlük", az: "Lüğət" },
        href: "/glossary",
        kind: "docs",
      },
      {
        label: { tr: "Ağa katıl", en: "Join the network", tk: "Tora goşul", az: "Şəbəkəyə qoşulun" },
        href: "/join",
        kind: "site",
      },
    ],
  },
];

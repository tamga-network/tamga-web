import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { ExternalLink } from "@/components/external-link";

/*
 * Geçici gizlilik sayfası (/privacy), 2026-11-16. Hukuki inceleme sürüyor; metin yalnız bugünkü gerçeği anlatır.
 * Kaynaklar:
 *  - site: src/proxy.ts + src/lib/csp.ts (dış betik/yazı tipi/analiz yok, her şey 'self'), çerezler `theme`
 *    (src/lib/theme.ts) ve next-intl dil çerezi `NEXT_LOCALE`; Öğren ilerlemesi yalnız tarayıcıda (src/components/learn/progress.ts);
 *    sunucu kayıtları işletmecinin sunucu yapılandırmasından (IP'siz erişim kaydı; erişim 14 gün, hata kaydı ~24 saat).
 *  - kimlik servisi: kalıcı kayıt yalnız opak subject_ref, belge no anahtarlı özeti, tür, tarihler, yöntem, sağlayıcı oturum
 *    kimliği, iptal listesi yeri; kişi alanları yalnız bellekte, ihraçtan sonra silinir; bitiş/iptalden 30 gün sonra kayıt +
 *    sağlayıcı oturumu silme isteği; olay günlüğü 365 gün.
 * Veri sorumlusu satırında tüzel kişi adı yazılmaz (vakıf henüz yok) — hukukçu sorusu.
 * 2026-11-25 (ağın ADR-0098'i): sağlayıcı kaldırıldı; gerçek ağda kimlik belgesi verilmiyor, ilk madde buna göre.
 * Kişisel veri, saklama süresi ya da sağlayıcı değişirse bu sayfa aynı gün güncellenir.
 */

export type PrivacySection = { id: string; title: string; items: ReactNode[] };
export type PrivacyContent = {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  notice: string;
  sections: PrivacySection[];
};

const MAIL = "privacy@tamga.network";
const mail = <a href={`mailto:${MAIL}`}>{MAIL}</a>;
const wallet = <ExternalLink href="https://tamgawallet.com">tamgawallet.com</ExternalLink>;

const en: PrivacyContent = {
  title: "Privacy",
  description: "What this website and the Tamga identity service process, how long it is kept and how to reach us.",
  eyebrow: "About",
  lead: "What this website and the Tamga identity service process, how long it is kept and how to reach us.",
  notice: "This text is provisional; a legal review is under way. Last updated 2026-11-25.",
  sections: [
    {
      id: "site",
      title: "This website (tamga.network)",
      items: [
        "This website does not collect personal data. It has no forms, no accounts, no analytics and no trackers (no tracking code, advertising or social media plug-ins). Fonts and images are served from our own server.",
        "Cookies: only two cookies may be set, and they only remember your choices: the language (NEXT_LOCALE) and the light or dark theme (theme). The Learn pages you have read are remembered only in your browser (local storage) and are never sent to us.",
        "Server logs: for operation and security, the web server keeps access logs without IP addresses (time, page address, response code); they are deleted after 14 days. Error logs can technically contain an IP address; they are deleted within about 24 hours.",
        "The servers are in Germany (EU).",
      ],
    },
    {
      id: "identity",
      title: "Identity service (id.tamga.network)",
      items: [
        "Identity credentials are not issued on the real network for now: Tamga no longer uses a remote identity verification provider, and no ID card, passport or face images are processed. A person's core identity (PID) has to come from the state or a body it authorises; the identity service will reopen only through such a path. Credentials issued earlier by invitation stay valid until they expire, and the points below describe what is kept for them. The images taken for those credentials were processed by the former provider (Didit) as Tamga's processor; Tamga asks the provider to delete them.",
        "The verified fields (name, surname, date of birth, nationality, ID number and, if the document carries it, place of birth) are held only in memory until the credential is issued, are never written to disk and are deleted within minutes after the credential reaches your wallet. About once a month your wallet renews the copies of the credential: it shows one copy to the identity service, and the fields read from it are again held only in memory for a few minutes.",
        "What is kept: a record with no personal fields: an opaque (pseudonymous) reference, a keyed hash of the document number (to notice the same document being used twice), the credential type, the issue and expiry dates, the verification method, the provider's session reference and the credential's position in the revocation list. The record is deleted 30 days after the credential expires (at most two years) or is revoked, and the provider is then asked to delete the session. The revocation list keeps only a bit. The event log contains no personal data and is deleted after 365 days.",
        "Retention periods will be confirmed by the legal review.",
      ],
    },
    {
      id: "rights",
      title: "Your rights and contact",
      items: [
        <>Controller: the operator of Tamga Network (provisional operator); contact {mail}.</>,
        <>You can ask for access, correction or deletion under KVKK Article 11 and the GDPR at {mail}. Deleting your identity record revokes the credential.</>,
        <>Tamga Wallet is a separate product; its privacy notice is on {wallet}.</>,
      ],
    },
  ],
};

const tr: PrivacyContent = {
  title: "Gizlilik",
  description: "Bu sitenin ve Tamga kimlik servisinin neyi işlediği, ne kadar tuttuğu ve bize nasıl ulaşacağınız.",
  eyebrow: "Hakkında",
  lead: "Bu sitenin ve Tamga kimlik servisinin neyi işlediği, ne kadar tuttuğu ve bize nasıl ulaşacağınız.",
  notice: "Bu metin geçicidir; hukuki inceleme sürüyor. Son güncelleme 2026-11-25.",
  sections: [
    {
      id: "site",
      title: "Bu site (tamga.network)",
      items: [
        "Bu site kişisel veri toplamaz. Form, hesap, analiz aracı ya da izleyici (takip kodu, reklam, sosyal medya eklentisi) yoktur. Yazı tipleri ve görseller kendi sunucumuzdan gelir.",
        "Çerezler: yalnız seçiminizi hatırlayan iki çerez kullanılabilir: dil (NEXT_LOCALE) ve açık/koyu tema (theme). Öğren bölümünde okuduğunuz sayfalar yalnız tarayıcınızda (yerel depolama) tutulur, bize gönderilmez.",
        "Sunucu kayıtları: web sunucusu işletim ve güvenlik için IP adresi içermeyen erişim kayıtları tutar (zaman, sayfa adresi, yanıt kodu); bunlar 14 gün sonra silinir. Hata kayıtları teknik olarak IP adresi içerebilir; en geç yaklaşık 24 saat içinde silinir.",
        "Sunucular Almanya'dadır (AB).",
      ],
    },
    {
      id: "identity",
      title: "Kimlik servisi (id.tamga.network)",
      items: [
        "Gerçek ağda kimlik belgesi şimdilik verilmiyor: Tamga artık uzaktan kimlik doğrulama sağlayıcısı kullanmıyor; kimlik kartı, pasaport ya da yüz görüntüsü işlenmiyor. Kişinin temel kimliğini (PID) devletin ya da yetkilendirdiği kurumun vermesi gerekir; kimlik servisi ancak böyle bir yolla yeniden açılır. Daha önce davetle verilmiş belgeler süreleri dolana kadar geçerlidir; aşağıdaki maddeler onlar için tutulanları anlatır. O belgeler için alınan görüntüleri Tamga adına veri işleyen eski sağlayıcı (Didit) işledi; Tamga bu görüntülerin silinmesini sağlayıcıdan ister.",
        "Doğrulanan alanlar (ad, soyad, doğum tarihi, uyruk, kimlik numarası ve belgede varsa doğum yeri) belge verilene kadar yalnız bellekte durur, diske yazılmaz ve belge cüzdanınıza ulaştıktan sonra dakikalar içinde silinir. Cüzdanınız belgenin kopyalarını ayda bir kez kendiliğinden yeniler: kimlik servisine bir kopyayı gösterir; okunan alanlar yine yalnız birkaç dakika bellekte durur.",
        "Tutulan: kişi alanı içermeyen bir kayıt: opak (takma) bir başvuru kimliği, belge numarasının anahtarlı özeti (aynı belgenin iki kez kullanılmasını fark etmek için), belge türü, veriliş ve bitiş tarihleri, doğrulama yöntemi, sağlayıcının oturum kimliği ve belgenin iptal listesindeki yeri. Kayıt, belgenin süresi bittikten (en çok iki yıl) ya da belge iptal edildikten 30 gün sonra silinir; o sırada sağlayıcıdan oturumu silmesi istenir. İptal listesinde yalnız bir bit kalır. Olay günlüğü kişi verisi içermez ve 365 gün sonra silinir.",
        "Saklama süreleri hukuki incelemeyle kesinleşecektir.",
      ],
    },
    {
      id: "rights",
      title: "Haklarınız ve iletişim",
      items: [
        <>Veri sorumlusu: Tamga Network işletmecisi (geçici işletmeci); iletişim {mail}.</>,
        <>KVKK 11. madde ve GDPR kapsamındaki erişim, düzeltme ve silme taleplerinizi {mail} adresine iletebilirsiniz. Kimlik kaydınızın silinmesi belgeyi iptal eder.</>,
        <>Tamga Wallet ayrı bir üründür; gizlilik metni {wallet} adresindedir.</>,
      ],
    },
  ],
};

const tk: PrivacyContent = {
  title: "Gizlinlik",
  description: "Bu saýtyň we Tamga şahsyýet hyzmatynyň nämäni işleýändigi, näçe wagt saklaýandygy we biziň bilen nädip habarlaşyp boljakdygy.",
  eyebrow: "Biz barada",
  lead: "Bu saýtyň we Tamga şahsyýet hyzmatynyň nämäni işleýändigi, näçe wagt saklaýandygy we biziň bilen nädip habarlaşyp boljakdygy.",
  notice: "Bu tekst wagtlaýyndyr; hukuk barlagy dowam edýär. Soňky täzelenme 2026-11-25.",
  sections: [
    {
      id: "site",
      title: "Bu saýt (tamga.network)",
      items: [
        "Bu saýt şahsy maglumat ýygnamaýar. Forma, hasap, analiz guraly ýa-da yzarlaýjy (yzarlaýyş kody, mahabat, sosial media goşmaçasy) ýok. Şriftler we suratlar öz serwerimizden gelýär.",
        "Kukiler: diňe saýlawyňyzy ýatda saklaýan iki kuki ulanylyp bilner: dil (NEXT_LOCALE) we ýagty/garaňky tema (theme). Öwren bölüminde okan sahypalaryňyz diňe brauzeriňizde (ýerli ammar) saklanýar we bize iberilmeýär.",
        "Serwer ýazgylary: web serweri işleýiş we howpsuzlyk üçin IP salgysyny saklamaýan giriş ýazgylaryny alyp barýar (wagt, sahypa salgysy, jogap kody); olar 14 günden soň pozulýar. Ýalňyşlyk ýazgylarynda tehniki taýdan IP salgysy bolup biler; olar takmynan 24 sagadyň içinde pozulýar.",
        "Serwerler Germaniýada (ÝB).",
      ],
    },
    {
      id: "identity",
      title: "Şahsyýet hyzmaty (id.tamga.network)",
      items: [
        "Hakyky torda şahsyýet resminamasy häzirlikçe berilmeýär: Tamga indi uzakdan şahsyýet barlaýan üpjün edijini ulanmaýar; şahsyýetnamanyň, pasportyň ýa-da ýüzüň suratlary işlenmeýär. Adamyň esasy şahsyýet maglumatlaryny (PID) döwlet ýa-da onuň ygtyýarly eden edarasy bermeli; şahsyýet hyzmaty diňe şeýle ýol bilen täzeden açylar. Ozal çakylyk bilen berlen resminamalar möhleti gutarýança hereket edýär; aşakdaky bentler olar üçin saklanýan zatlary düşündirýär. Şol resminamalar üçin alnan suratlary Tamga-nyň adyndan maglumat işleýji öňki üpjün ediji (Didit) işledi; Tamga bu suratlaryň pozulmagyny üpjün edijiden soraýar.",
        "Barlanan meýdanlar (ady, familiýasy, doglan senesi, raýatlygy, şahsyýet belgisi we resminamada bar bolsa doglan ýeri) resminama berilýänçä diňe ýatda saklanýar, diske ýazylmaýar we resminama gapjygyňyza ýetenden soň birnäçe minudyň içinde pozulýar. Gapjygyňyz resminamanyň nusgalaryny aýda bir gezek özbaşdak täzeleýär: şahsyýet hyzmatyna bir nusgany görkezýär; okalan meýdanlar ýene-de diňe birnäçe minut ýatda saklanýar.",
        "Saklanýan: şahsy meýdany bolmadyk ýazgy: opak (lakam) salgylanma, resminama belgisiniň açarly heşi (şol bir resminamanyň iki gezek ulanylmagyny bilmek üçin), resminamanyň görnüşi, berlen we möhleti gutarýan senesi, barlag usuly, üpjün edijiniň sessiýa belgisi we resminamanyň ýatyrylyş sanawyndaky ýeri. Ýazgy resminamanyň möhleti gutarandan (iň köp iki ýyl) ýa-da ýatyrylandan 30 gün soň pozulýar; şol wagt üpjün edijiden sessiýany pozmak soralýar. Ýatyrylyş sanawynda diňe bir bit galýar. Waka žurnalynda şahsy maglumat ýok we ol 365 günden soň pozulýar.",
        "Saklamak möhletleri hukuk barlagy bilen kesgitlener.",
      ],
    },
    {
      id: "rights",
      title: "Hukuklaryňyz we habarlaşmak",
      items: [
        <>Maglumatlara jogapkär: Tamga Network-yň işlediji (wagtlaýyn işlediji); habarlaşmak {mail}.</>,
        <>KVKK-nyň 11-nji maddasy we GDPR boýunça görmek, düzetmek we pozmak haýyşlaryňyzy {mail} salgysyna iberip bilersiňiz. Şahsyýet ýazgyňyzyň pozulmagy resminamany ýatyrýar.</>,
        <>Tamga Wallet aýry önümdir; onuň gizlinlik teksti {wallet} salgysynda.</>,
      ],
    },
  ],
};

const az: PrivacyContent = {
  title: "Məxfilik",
  description: "Bu saytın və Tamga şəxsiyyət xidmətinin nəyi emal etdiyi, nə qədər saxladığı və bizimlə necə əlaqə saxlaya biləcəyiniz.",
  eyebrow: "Haqqımızda",
  lead: "Bu saytın və Tamga şəxsiyyət xidmətinin nəyi emal etdiyi, nə qədər saxladığı və bizimlə necə əlaqə saxlaya biləcəyiniz.",
  notice: "Bu mətn müvəqqətidir; hüquqi yoxlama davam edir. Son yenilənmə 2026-11-25.",
  sections: [
    {
      id: "site",
      title: "Bu sayt (tamga.network)",
      items: [
        "Bu sayt şəxsi məlumat toplamır. Forma, hesab, analitika aləti və ya izləyici (izləmə kodu, reklam, sosial media əlavəsi) yoxdur. Şriftlər və şəkillər öz serverimizdən gəlir.",
        "Kukilər: yalnız seçiminizi yadda saxlayan iki kuki istifadə oluna bilər: dil (NEXT_LOCALE) və açıq/tünd mövzu (theme). Öyrən bölməsində oxuduğunuz səhifələr yalnız brauzerinizdə (yerli yaddaş) saxlanılır və bizə göndərilmir.",
        "Server qeydləri: veb server işləmə və təhlükəsizlik üçün IP ünvanı olmayan giriş qeydləri saxlayır (vaxt, səhifə ünvanı, cavab kodu); onlar 14 gündən sonra silinir. Xəta qeydlərində texniki olaraq IP ünvanı ola bilər; onlar təxminən 24 saat ərzində silinir.",
        "Serverlər Almaniyadadır (Aİ).",
      ],
    },
    {
      id: "identity",
      title: "Şəxsiyyət xidməti (id.tamga.network)",
      items: [
        "Real şəbəkədə şəxsiyyət sənədi hələlik verilmir: Tamga artıq məsafədən şəxsiyyət yoxlaması provayderindən istifadə etmir; şəxsiyyət vəsiqəsi, pasport və ya üz təsvirləri emal olunmur. Şəxsin əsas şəxsiyyət məlumatlarını (PID) dövlət və ya onun səlahiyyət verdiyi qurum verməlidir; şəxsiyyət xidməti yalnız belə bir yolla yenidən açılacaq. Əvvəllər dəvətlə verilmiş sənədlər müddəti bitənə qədər qüvvədədir; aşağıdakı bəndlər onlar üçün saxlanılanları izah edir. Həmin sənədlər üçün alınan təsvirləri Tamga adından məlumat emal edən keçmiş provayder (Didit) emal edib; Tamga bu təsvirlərin silinməsini provayderdən tələb edir.",
        "Yoxlanılan sahələr (ad, soyad, doğum tarixi, vətəndaşlıq, şəxsiyyət nömrəsi və sənəddə varsa doğum yeri) sənəd verilənə qədər yalnız yaddaşda qalır, diskə yazılmır və sənəd cüzdanınıza çatdıqdan sonra bir neçə dəqiqə ərzində silinir. Cüzdanınız sənədin nüsxələrini ayda bir dəfə özü yeniləyir: şəxsiyyət xidmətinə bir nüsxəni göstərir; oxunan sahələr yenə yalnız bir neçə dəqiqə yaddaşda qalır.",
        "Saxlanılan: şəxsi sahə olmayan qeyd: opak (təxəllüs) istinad, sənəd nömrəsinin açarlı heşi (eyni sənədin iki dəfə istifadəsini görmək üçün), sənəd növü, verilmə və bitmə tarixləri, yoxlama üsulu, provayderin sessiya identifikatoru və sənədin ləğv siyahısındakı yeri. Qeyd sənədin müddəti bitdikdən (ən çox iki il) və ya ləğv edildikdən 30 gün sonra silinir; bu zaman provayderdən sessiyanı silmək istənilir. Ləğv siyahısında yalnız bir bit qalır. Hadisə jurnalında şəxsi məlumat yoxdur və o, 365 gündən sonra silinir.",
        "Saxlama müddətləri hüquqi yoxlama ilə dəqiqləşəcək.",
      ],
    },
    {
      id: "rights",
      title: "Hüquqlarınız və əlaqə",
      items: [
        <>Məlumat nəzarətçisi: Tamga Network operatoru (müvəqqəti operator); əlaqə {mail}.</>,
        <>KVKK-nın 11-ci maddəsi və GDPR üzrə giriş, düzəliş və silmə tələblərinizi {mail} ünvanına göndərə bilərsiniz. Şəxsiyyət qeydinizin silinməsi sənədi ləğv edir.</>,
        <>Tamga Wallet ayrıca məhsuldur; onun məxfilik mətni {wallet} ünvanındadır.</>,
      ],
    },
  ],
};

const content: Record<Locale, PrivacyContent> = { en, tr, tk, az };

export function getPrivacyContent(locale: string): PrivacyContent {
  return content[(["en", "tr", "tk", "az"].includes(locale) ? locale : "en") as Locale];
}

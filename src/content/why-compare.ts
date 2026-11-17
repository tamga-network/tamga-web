/*
 * "Bugün / Tamga Network ile" karşılaştırması (2026-11-18): ana sayfa "Neden Tamga Network?" bölümü.
 * Sağ sütundaki cümleler sitedeki mevcut anlatımdan derlendi (beş fikir, "Amacımız", Hakkında › konumlanma); yeni iddia yok.
 * Sıra content/home.tsx why.problems ile aynı.
 */
import type { Locale } from "@/i18n/routing";

export type WhyCompare = { today: string; tamga: string; fixes: [string, string, string, string, string] };

const data: Record<Locale, WhyCompare> = {
  en: {
    today: "Today",
    tamga: "With Tamga Network",
    fixes: [
      "The verifier checks that the institution is on the state’s signed trust list and is sure within seconds, without contacting the institution.",
      "The credential is signed with the institution’s key. Change a single letter and the signature breaks, so the credential is rejected.",
      "Each field is sealed separately. The person opens only the field that is asked for, and with a zero-knowledge proof can simply answer “yes”.",
      "Each state keeps ownership of its own list. The lists share one format, so the countries can recognise each other.",
      "Credentials, protocols and trust lists follow EU standards, so Turkic-world credentials speak the same language as Europe’s.",
    ],
  },
  tr: {
    today: "Bugün",
    tamga: "Tamga Network ile",
    fixes: [
      "Doğrulayan, kurumun devletin imzalı güven listesinde olduğuna bakar ve kuruma sormadan saniyeler içinde emin olur.",
      "Belge kurumun anahtarıyla imzalıdır. Tek harf değişirse imza bozulur ve belge reddedilir.",
      "Her alan ayrı mühürlenir. Kişi yalnız istenen alanı açar; sıfır bilgi ispatıyla yalnızca “evet” de diyebilir.",
      "Her devlet kendi listesinin sahibi kalır. Listeler aynı biçimde olduğu için ülkeler birbirini tanır.",
      "Belgeler, protokoller ve güven listeleri AB standartlarına uyar. Türk dünyasının belgeleri Avrupa’yla aynı dili konuşur.",
    ],
  },
  tk: {
    today: "Häzir",
    tamga: "Tamga Network bilen",
    fixes: [
      "Barlaýjy guramanyň döwletiň gol çekilen ynam sanawyndadygyny barlaýar we gurama soramazdan birnäçe sekuntda ynanýar.",
      "Resminama guramanyň açary bilen gol çekilýär. Bir harp üýtgese, gol bozulýar we resminama ret edilýär.",
      "Her meýdan aýratyn möhürlenýär. Adam diňe soralýan meýdany açýar; nol bilim subutnamasy bilen diňe “hawa” diýip hem biler.",
      "Her döwlet öz sanawynyň eýesi bolup galýar. Sanawlar birmeňzeş görnüşde bolany üçin ýurtlar biri-birini tanaýar.",
      "Resminamalar, protokollar we ynam sanawlary ÝB standartlaryna laýyk gelýär. Türki dünýäsiniň resminamalary Ýewropa bilen bir dilde gürleşýär.",
    ],
  },
  az: {
    today: "Bu gün",
    tamga: "Tamga Network ilə",
    fixes: [
      "Yoxlayan tərəf qurumun dövlətin imzalı etibar siyahısında olduğunu yoxlayır və quruma müraciət etmədən bir neçə saniyədə əmin olur.",
      "Sənəd qurumun açarı ilə imzalanır. Bir hərf dəyişsə, imza pozulur və sənəd rədd edilir.",
      "Hər sahə ayrıca möhürlənir. Şəxs yalnız istənilən sahəni açır; sıfır bilik sübutu ilə sadəcə “bəli” də deyə bilər.",
      "Hər dövlət öz siyahısının sahibi olaraq qalır. Siyahılar eyni formatda olduğu üçün ölkələr bir-birini tanıyır.",
      "Sənədlər, protokollar və etibar siyahıları Aİ standartlarına uyğundur. Türk dünyasının sənədləri Avropa ilə eyni dildə danışır.",
    ],
  },
};

export function getWhyCompare(locale: string): WhyCompare {
  return data[locale as Locale] ?? data.en;
}

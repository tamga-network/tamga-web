# Blog yazarı kılavuzu (tamga.network/blog)

Her yazı bir klasördür: `src/content/blog/<slug>/article.en.md` + `article.tr.md` (+ isteğe bağlı `article.tk.md`).
**İngilizce ve Türkçe zorunlu**; biri eksikse derleme durur. Türkmence yoksa `/tk/blog/<slug>` İngilizce metni bir notla
gösterir ("Bu ýazgy heniz türkmen diline terjime edilmedi…"); o zaman hreflang ve site haritası tk adresini listelemez,
tk sayfasının canonical'ı İngilizce yazıdır. Ayrıştırıcı ve denetim: `src/lib/blog.ts` (hata iletileri Türkçe, derlemede
görünür). Denetim: `npm run check` ve `npm run build`.

## Kim için, hangi sesle
- Okur: **kurumlar** (belge veren üniversite, bakanlık, işveren), **geliştiriciler** (doğrulayıcı, cüzdan, entegrasyon) ve
  **devletler** (güven listesi, yönetişim). Bireysel kullanıcıya cüzdan anlatımı bu blogun işi değildir.
- **Tamga Network** kâr amacı gütmeyen, vakfa devredilmek üzere kurulan bir güven ağıdır: kurallar (Tamga ARF), güven
  listeleri, katalog ve açık kaynak paketler. **Ağ cüzdan işletmez** (ADR-0042); cüzdanları listeler. Bir cüzdandan söz
  edilecekse "ağdaki cüzdanlardan biri" diye, ağın parçası değilmiş gibi anılır.
- "AB uyumlu" denir; "EUDI Wallet" unvanı ya da AB onayı iddia edilmez. Sade, olgusal, abartısız; sınırlar açıkça söylenir.
- Teknik terim çevrilmez (SD-JWT VC, mdoc, OpenID4VP, trust list); ilk geçtiği yerde kısa açıklanır. Türkçe metin "siz" dilinde.

## Klasör ve adlar
- `<slug>`: yalnız küçük harf, rakam, tire (`signed-trust-lists-explained`). Adres `/<dil>/blog/<slug>`; üç dilde aynı slug.
  Yayımlanmış bir yazının slug'ı değişmez (değişirse `next.config.ts` yönlendirmesi gerekir).
- Görseller: **`public/blog/<slug>/<dil>/fig-<ad>.png`** (dil başına ayrı klasör; görseldeki yazılar o dilde). Bütün yerel
  görseller `/blog/<slug>/` altında olmalı. Kapak (isteğe bağlı): `public/blog/<slug>/cover.webp`, 1400×788.
- `_` ile başlayan klasör okunmaz (çalışma alanı için).

## Ön bilgi (frontmatter)
```yaml
---
title: Signed trust lists, explained
slug: signed-trust-lists-explained
description: Tek cümlelik özet — listede, paylaşım kartında ve RSS'te görünür (≈ 160 karakter).
date: 2026-10-08
lang: en
category: network
draft: false
related: why-no-blockchain-yet, learn:trust-lists, page:/join
---
```
Başlıkta `:` varsa değeri tırnağa alın (`title: "Gerçek kriptografi: ilk sürüm"`).

| Alan | Zorunlu | Not |
|---|---|---|
| `title` | evet | Dile göre. |
| `slug` | önerilir | Klasör adıyla aynı olmalı. |
| `description` | evet | Dile göre, tek cümle. |
| `date` | yayımlananda evet | `YYYY-AA-GG`. Liste yeni tarihten eskiye; en yeni yazı "Tümü"nde öne çıkan geniş kart olur. |
| `lang` | önerilir | `en` / `tr` / `tk`, dosya adıyla aynı. |
| `category` | evet | Aşağıdaki beş değerden biri. |
| `draft` | hayır | `true` → yayında yok (yalnız `npm run dev` ya da `BLOG_DRAFTS=1` ile, "Taslak" etiketli ve noindex). |
| `related` | hayır | Virgülle ayrılmış hedefler (aşağıda). Hedef yoksa derleme durur. |
| `updated` | hayır | `YYYY-AA-GG`, sonradan düzeltmede. |
| `cover`, `coverAlt` | hayır | Kapak yolu (`/blog/<slug>/cover.webp`) ve alt metni. Kapak yoksa paylaşım görseli başlıktan kendiliğinden üretilir (`/<dil>/blog/<slug>/og.png`). |

`category`, `date`, `draft`, `cover`, `related`, `updated` **bütün dillerde aynı** olmalı.

## Kategoriler
| Değer | en | tr | tk |
|---|---|---|---|
| `announcements` | Announcements | Duyurular | Habarlar |
| `network` | Network | Ağ | Tor |
| `standards` | Standards | Standartlar | Standartlar |
| `privacy` | Privacy | Gizlilik | Gizlinlik |
| `europe` | Europe | Avrupa | Ýewropa |

Yeni kategori = `src/lib/blog-ui.ts` → `BLOG_CATEGORIES` + `CATEGORY_LABELS` (kamuya açık yeni ad: proje yönetimine sorulur).

## İlgili bağlantılar (`related`)
- `<slug>` ya da `blog:<slug>` → başka bir blog yazısı (`/blog/<slug>`). Yayımlanan yazı taslak yazıyı gösteremez.
- `learn:<slug>` → bir Learn sayfası (`/learn/<slug>`; geçerli slug'lar `src/content/learn/*` ve `src/i18n/routing.ts`,
  ör. `trust-lists`, `selective-disclosure`, `eidas`, `roles`, `join-as-issuer`, `for-states`). Yalın slug önce yazı, sonra
  Learn sayfası diye aranır.
- `page:/<yol>` → sitenin sabit bir sayfası: `/`, `/about`, `/manifesto`, `/scenarios`, `/whitepaper`, `/blog`, `/join`,
  `/network`, `/partners`, `/events`, `/roadmap`, `/changelog`, `/sdk`, `/brand`, `/learn` (ve sabit `/learn/<slug>` yolları).

## Markdown alt kümesi
- `## Ara başlık` (içindekilere girer) ve `### Alt başlık`. `#` yazılmaz — başlık ön bilgiden gelir.
- Paragraf, `- madde`, `1. madde`, `| tablo |` (ilk satır başlık; `|---|` ayırıcı satırı).
- Satır içi: `**kalın**`, `*eğik*`, `` `kod` ``, `[metin](adres)`.
- `<!-- kaynak notu -->` yayında görünmez; iddianın kaynağını (ADR, karar, çerçeve belgesi numarası) buraya yazın.

### Görsel
```md
![Güven listesi zinciri: AB LOTL → ülke listesi → kurum](/blog/signed-trust-lists-explained/en/fig-chain.png)
![Alt metin](/blog/<slug>/tr/fig-ad.png "Görünen alt yazı (isteğe bağlı)")
```
Alt metin zorunlu (boşsa derleme durur); ayrı alt yazı verilmezse alt metin görünür alt yazı olur. Dosya `public/` altında
yoksa derleme durur (taslakta yalnız uyarı). Ölçü dosyadan okunur (PNG, WebP, JPEG, GIF). Görseller beyaz kartta gösterilir;
açık temalı hazırlanabilir.

### Kod penceresi
````md
```json title="Güven listesi girdisi (örnek)"
{ "entity": "did:example:university", "status": "active" }
```
````
Sitenin kod penceresiyle aynı görünüm (üç nokta, başlık, dil etiketi, kopyala, 4+ satırda satır numarası; renklendirme
derlemede). Renklendirilen diller: `ts`, `tsx`, `js`, `json`, `http`, `bash`/`sh`, `yaml`, `html`, `text`; `cbor-diag` ve
bilinmeyenler düz metin (etiket yine görünür). `title="…"` isteğe bağlı (yoksa dil adı). Kişisel veri, gerçek anahtar, gerçek
belge içeriği yazılmaz — örnekler açıkça örnek olsun (`example.org`, `did:example:…`).

### Not ve vurgulu kutu
```md
> **Note:** Bilgi kutusu. (Türkçede **Not:**)
> **Important:** Dikkat kutusu. (Türkçede **Önemli:**)
> Düz alıntı → alıntı.
```
Kutunun içinde boş `>` satırı paragraf ayırır. Türkmencede `**Bellik:**` (not) da kabul edilir.

### Kaynaklar
Yazının sonunda `## Sources` (en) / `## Kaynaklar` (tr) başlığı: altındaki liste ayrı bölümde, küçük yazıyla gösterilir.
Dış bağlantılar `https://` olmalı (yeni sekmede, `rel="noopener noreferrer"` kendiliğinden); resmî AB kaynakları (EUR-Lex,
eu-digital-identity-wallet GitHub), standart kuruluşları (ETSI, IETF, OpenID, ISO), `docs.tamga.network` ve Tamga ARF uygundur.
Site içi bağlantılar `/learn/<slug>`, `/blog/<slug>`, `/whitepaper` … biçiminde, **dil öneki yazılmaz** (kendiliğinden eklenir);
kırık site içi bağlantı derlemeyi durdurur.

## İçerik kuralları
- Kişi adı ve araç adı yok (yazar, yapay zekâ/model adları, iç inceleme adları); yazar her zaman "Tamga Network". Kararlar
  "proje yönetimi" onayıyla anılır.
- İç belge yolu, depo içi dosya yolu, kiracı verisi, iş planı, fiyat, konuşma alıntısı yazılmaz. Kamuya açık bağlantılar
  (site, docs, ARF, açık kaynak depo) yazılabilir.
- Kaynakta (ağ kararları/ADR, durum belgesi, çerçeve belgeleri) olmayan iddia, rakam, ortaklık, tarih yazılmaz. Emin
  değilseniz `[DOLDURULACAK]` yazın ve sorun.
- Ağ bugün geçici bir işletmeciyle çalışır; zincir (defter) bağımsız operatörler katılınca gelir — bunu olduğundan büyük
  göstermeyin.
- Okuma süresi kendiliğinden (≈ 200 kelime/dk; kod sayılmaz).

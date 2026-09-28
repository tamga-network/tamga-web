# Tamga Network — Tanıtım Sitesi

**tamga.network** için tanıtım/kurumsal web sitesi. Dijital Güven Altyapısı
projesini sıfırdan, hiç bilmeyen birinin bile anlayacağı şekilde anlatır.

## Teknoloji

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (sınıf tabanlı dark/light — `next-themes`)
- **framer-motion** (animasyonlu logo + scroll-reveal)
- **lucide-react** (ikonlar)
- Fontlar: **IBM Plex Serif / Sans / Mono** (`next/font`)

## Komutlar

```bash
npm run dev      # geliştirme sunucusu (http://localhost:3000)
npm run build    # prodüksiyon derlemesi
npm run start    # derlenmiş sürümü çalıştır
```

## Sayfa Haritası

Tüm yollar bir dil öneki taşır: **`/en` (varsayılan) · `/tr` · `/tk`**. Kök `/`
otomatik olarak `/en`'e yönlenir. Aşağıdaki yollar öneksiz gösterilmiştir.

| Yol | İçerik |
|-----|--------|
| `/` | Ana sayfa: hero (animasyonlu tamga mührü), sorun, biz neyiz, isim kökeni, eIDAS/Avrupa, Türk dünyası, nasıl çalışır, ekosistem, konumlandırma |
| `/manifesto` | 8 tezlik manifesto (PDF olarak indirilebilir — yazdır) |
| `/about` | İsim kökeni, misyon/vizyon, konumlandırma (Türk dünyasının EBSI'si) |
| `/docs` | Sıfırdan rehber (aşağıya bakın) |
| `/whitepaper` | 12 bölümlük teknik whitepaper (PDF olarak indirilebilir) |
| `/blog`, `/blog/[slug]` | Yazılar |

### Dokümanlar (`/docs`) — sıfırdan anlatım

1. Neden yeni bir model? → 2. Dijital Kimlik → 3. Blockchain (ve değil) →
4. Kriptografi temelleri → 5. DID & Verifiable Credentials → 6. Seçici ifşa /
SD-JWT → 7. Mimari & Trust Graph → 8. eIDAS/EUDI/EBSI → 9. TamgaID & ekosistem →
10. Sözlük.

Manifesto ve whitepaper, kavramlar için bu dokümanlara kaynak/atıf verir.

## Tasarım Sistemi

Onaylanan marka paleti `src/app/globals.css` içinde CSS değişkenleri olarak
tanımlıdır ve iki tema (Obsidyen/dark, Parşömen/light) için ayrı ayrı eşlenir:

- Al Kızıl `#B01E22` · Altın `#C8A24C` · Obsidyen `#17110F`
- Parşömen `#F4EDE2` · Göktürk mavisi `#2A6F8E`

Yeniden kullanılabilir bileşenler `src/components/` altında (`ui.tsx`,
`logo.tsx`, `header.tsx`, `footer.tsx`, `reveal.tsx`, `doc-article.tsx`).

## Diller (i18n — `next-intl`)

Site üç dillidir: **`en` (varsayılan) · `tr` · `tk` (Türkmence)**. Yapı:

- `src/i18n/{routing,request,navigation}.ts`, `src/proxy.ts` (Next 16’da
  `middleware.ts` → `proxy.ts`), `next.config.ts` içinde plugin.
- Tüm sayfalar `src/app/[locale]/` altında; `[locale]/layout.tsx` `<html lang>`’i
  render eder. Dahili linkler `@/i18n/navigation`’dan (`Link`, locale-önekli).
- Arayüz metinleri `messages/{en,tr,tk}.json`. Dil değiştirici header’da
  (`LocaleSwitcher`).
- **Durum:** arayüz + iskelet 3 dilli. Uzun sayfa *gövdeleri* şu an TR fallback
  gösteriyor; EN/TK çevirisi devam ediyor (bkz. `todos.md`). Türkmence ilk taslak,
  native review gerekir.

> **i→İ tuzağı:** büyütülen İngilizce ibareler (`Digital Trust Infrastructure`)
> `lang="en"` ile işaretlenir; `text-transform: uppercase` altında bozulma olmaz.

## PDF

- **Whitepaper → Typst PDF (kanonik).** Akademik, beyaz zeminli PDF; kaynak
  `whitepaper/*.typ`, şablon `whitepaper/template.typ`. Çıktı üç dilde:
  `public/whitepaper-{en,tr,tk}.pdf`. `/whitepaper` sayfasındaki buton locale'e
  göre doğru PDF'i indirir. Yeniden üretmek için:
  ```powershell
  powershell -File whitepaper/build.ps1   # Typst binary tools/ altında (gitignore)
  ```
- **Manifesto → yazdır.** Manifesto sayfası yazdırma için optimize; "PDF olarak
  indir" tarayıcının yazdır → PDF akışını tetikler (`@media print`).

## Notlar

- Bu depo Next.js 16 kullanır; `AGENTS.md` bu sürümün bazı API'lerinin
  değiştiğini hatırlatır (ör. dinamik route `params` artık `Promise`).
- Tüm sayfalar statik olarak önceden üretilir (SSG); site hızlıdır.

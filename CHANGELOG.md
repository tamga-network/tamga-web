# Değişiklik günlüğü — tamga-web

Biçim: Keep a Changelog. Site dağıtımları tarihle anılır.

## [Yayınlanmadı]

### Değişti (2026-10-01 — site başına takma ad)
- `/shortcuts`: S-17 **kapandı** (her site kendine özel takma ad alıyor; belge değeri gitmiyor). `/docs/login-with-tamga` (üç dil):
  hesap anahtarı site başına takma ad; yeni telefonda kimlik yeniden doğrulanınca aynı takma adlar döner. Whitepaper (üç dil, PDF)
  ve web girişi kod örneği aynı anlatımla.

### Değişti (2026-09-30 — Tamga Verify)
- verify.tamga.network her yerde **Tamga Verify** adıyla: ekosistem listesi ve menüler, `/docs/roles` (aracı doğrulayıcı),
  `/brand` ad tablosu (üç dil).
- Altbilgi ve telefon menüsündeki sosyal medya simgelerinden yer tutucu hesaplar (X, LinkedIn, Instagram, Medium — hesaplar
  henüz açılmadı) kaldırıldı; yalnız GitHub kalır. Hesap açılınca `social-icons.tsx` + JSON-LD `sameAs`'a eklenir.

### Düzeltildi (2026-09-30 — arama ve paylaşım)
- **Canonical hatası:** her alt sayfa arama motoruna dilin ana sayfasını "asıl adres" diye bildiriyordu (docs, whitepaper, blog
  dizinden düşebilirdi). Artık her sayfa kendi adresini, üç dil eşini ve `x-default`'u verir (`src/lib/seo.ts` `pageMeta`).
- Paylaşım önizlemesi sayfanın kendi başlığı ve açıklamasıyla (`og:url`, `og:locale` tr_TR/en_US/tk_TM); blog yazıları makale
  türünde ve tarihli. Paylaşım görselinde alt başlık sayfanın dilinde.

### Eklendi (2026-09-30 — marka, JSON-LD, simgeler)
- `/brand` "Marka" sayfası: ad yazılışı, mühür (koyu/açık/tek renk/adla), renkler (HEX/RGB, koyu zemin tonları), yazılar
  (başlık Sora, gövde IBM Plex Sans, kod IBM Plex Mono), "Tamga ile giriş yap" düğmesi, indirmeler, kullanım izni. Proje
  menüsünde ve altbilgide.
- JSON-LD: her sayfada `Organization` + `WebSite` (Google site adı ve bilgi paneli), blog yazılarında `BlogPosting`.
- iPhone simgesi (`apple-touch-icon.png`), web manifest, tema rengi; simgeler tek kaynaktan (`npm run brand:sync` ←
  `tamga-network/ops/brand/icons`).
- "Tamga ile giriş yap" örnek düğmesi parmak izi yerine tek renk mühürle (marka sayfasındaki kural).

### Değişti (2026-09-30 — renkler)
- Zemin ve metin renkleri marka paletine bağlandı: açık temada Parşömen yüzeyler + Obsidyen metin, koyu temada Obsidyen zemin
  + Parşömen metin (önceki nötr gri tonların yerine). Paylaşım görseli de Obsidyen / Parşömen / Altın.

### Değişti (2026-09-30 — ürün adları)
- Cüzdanın adı her yerde **Tamga Wallet**; "TamgaID" adı kaldırıldı. Web sitesi girişi "Tamga ile giriş yap" / "Tamga ile
  kayıt ol" (en "Sign in with Tamga", tk "Tamga bilen gir"). `/docs/tamga-id` sayfası "Tamga Wallet" oldu (adres şimdilik aynı);
  whitepaper PDF'leri yeniden derlendi.
- Sözlük ve sayfalardan dikey platform adları (TamgaEducation, TamgaHealth, TamgaLogistics, TamgaPay) ve "Trust Graph"
  çıkarıldı; yerine sektör anlatımı. "Trust Mesh" vizyon adı olarak kalır.

### Eklendi (2026-09-30 — bilinen kısayollar, lisans)
- `/shortcuts` "Bilinen kısayollar": sapma kütüğünün kamuya açık, sade hâli (açık / daraldı / kapandı); ana sayfa, whitepaper
  ve blog "herkese açık liste" ifadeleri bu sayfaya bağlanır. Proje menüsünde.
- `LICENSE` (Apache-2.0) ve `LICENSE-docs` (CC BY 4.0, içerik; ad ve mühür hariç).

### Kaldırıldı (2026-09-30 — denetim)
- `/components` iç vitrini ve yalnız orada kullanılan efekt bileşenleri; `public/logo-options` (özel depoya), create-next-app
  görselleri, `DEPLOY-CHECKLIST.md` (açık maddeler backlog'a).

### Değişti (2026-09-30 — menüler, SDK, changelog, yol haritası)
- Üst menü shadcn/ui kalıbıyla (Radix NavigationMenu): Dokümanlar · Geliştiriciler ▾ · Ekosistem ▾ · Proje ▾; açılır menülerde
  renkli simgeli, açıklamalı, yan yana kutucuklar. Telefon menüsü sağdan açılan panel + açılır bölümler (Radix Dialog + Accordion);
  eski StaggeredMenu ve gsap kaldırıldı.
- Yeni `/sdk` sayfası: paket kartları (ad npm'i, "Belge" geliştirici belgesini yeni sekmede açar), kurulum, çalışan örnekler;
  geliştirici belgesi SDK'ya bağlanır.
- Changelog sürüm sürüm (v0.1.0 … v0.4.0; Özellik / Güvenlik etiketi, Eklendi / Değiştirildi / Düzeltildi); üç dilde "Changelog".
- Yol haritası: aşama özeti + her aşamada durum rozetli (Yayında / Devam ediyor / Planlanıyor / Araştırma), simgeli kartlar.
- Alt bilgi: Kaynaklar (Geliştiriciler, Tamga ARF, SDK, API, npm, GitHub), Ekosistem (kullanıcıya dönük servisler), Sektörler,
  Şirket. Ağ adresleri tablosu Hakkında'dan ana sayfaya taşındı; ana sayfadaki sektör bölümü "Sektörler" oldu.

### Eklendi (2026-09-30 — menü, kurum sayfası, yol haritası, değişiklik günlüğü)
- Üst menü: Ekosistem (ağın bütün alt alan adları, gruplu) ve Proje (Senaryolar, Yol haritası, Değişiklik günlüğü, Blog, Hakkında)
  açılır menüleri; sağda "Kurum olarak katıl" düğmesi. Ana sayfadaki "Bugün neler çalışıyor" düğmesi yerine aynı başvuru.
- Yeni sayfalar: `/issuers` (kurum olarak katılma: kimler, ne kazandırır, gereksinimler, süreç, başvuru), `/roadmap` (tarihsiz
  aşamalar), `/changelog` (sade dille değişiklikler). Hakkında sayfasında ağın herkese açık adresleri tablosu (`#ecosystem`).
- Alt bilgi: geliştirici belgeleri, SDK ve paketler, API başvuruları, npm, GitHub, yol haritası, değişiklik günlüğü.

### Değişti (2026-09-30 — kod blokları ve PDF dizgisi)
- Belgelerde hizalı düz metin blokları tabloya dönüştü (güven listesi dosyaları, servisler, doğrulama hattı, kimlik katmanları,
  SD-JWT örneğinin açıklamaları); açıklamalar sayfanın dilinde. `not-prose` bileşenleri artık metin içi stilleri almaz.
- Whitepaper PDF: tablolar, başlıklar sonraki metinle aynı sayfada, şekiller sayfa arasında bölünmez, içindekiler ayrı sayfada,
  büyük bölümler yeni sayfada. Manifesto PDF: ilkeler iki sayfaya dengeli, kapanış ayrı sayfada, başlıkta tire yok.

### Kaldırıldı (2026-09-27)
- `deploy/` PM2 kurulum dosyaları (setup/security/authorization/verify, REDEPLOY, nginx örneği, todos) — kurulum artık
  operatör deposunda tek yerde (tek sunucu, nginx + systemd).

### Eklendi (2026-09-27 — üç kapı, ADR-0018)
- Dokümanlar genel bakışında üç kapı (Genel · Geliştirici belgeleri · Tamga ARF); belge menüsünde "Diğer belgeler";
  alt bilgide geliştirici belgeleri ve Tamga ARF bağlantıları; Geliştiriciler sayfası sonunda docs.tamga.network ve ARF.

### Eklendi (2026-09-27 — kod örnekleri)
- Geliştiriciler: kurulum sekmeleri (npm/pnpm/yarn) + dört testli örnek (`tamga-network/examples` → `npm run examples:sync`;
  `npm run check` bayat örneği yakalar). TamgaID ile giriş sayfası aynı örnek dosyaları gösterir. Kod bloklarına "Kopyala" düğmesi.

### Değişti (2026-09-27 — içerik güncel mimariye göre)
- Ana sayfa: zincir yerine imzalı güven listeleri (Faz B), W3C VC yerine SD-JWT VC + ISO mdoc; yeni "Bugün / Pilot / Sonra"
  bölümü; QES yol haritasına; devlet validatörleri hedef olarak; bileşen metinleri (platform şeması, belge kartı, giriş).
- Docs: yeniden yazılan — TamgaID ile giriş (kayıt + passkey, geliştirici kodu), Belgeler (X.509, SD-JWT VC, mdoc; eski
  `did-vc` rotası korundu), Mimari (servisler, A–E hattı, üç sonuç); güncellenen — blockchain, iptal (Token Status List),
  seçici açıklama (mdoc yaş), kriptografi, eIDAS, TamgaID, sözlük ("Bugün Tamga" grubu); "tasarım/araştırma" etiketi —
  kimlik katmanları, hesap verebilir ifşa, kurtarma.
- Whitepaper v3.0 (web + 3 PDF, tek kaynaktan); manifesto (sayfa + 3 PDF) ve hakkımızda standart dili.
- Gerçek kurum adları (İTÜ, NVİ, İstanbul Üniversitesi) örnek adlarla değiştirildi.
- Alt bilgi "Ağ" sütunu: var olmayan Blockchain/Validators/Explorer yerine gerçek sayfalar.

### Eklendi
- Docs: Güven listeleri, Tamga ve EUDI mimarisi (karşılaştırma tabloları), Geliştiriciler; `CompareTable` / `FitPill` bileşenleri.
- Blog: "Neden zincirsiz başlıyoruz", "Sahte veri, gerçek kriptografi"; 2026-09-24 öncesi yazılara "önceki tasarım" notu.
- `npm run check` (typecheck + üç dil anahtar eşliği).

### Bekleyen
- Türkmence metinlerin ana dili Türkmence olan biri tarafından okunması.
- Ekip / iletişim bilgisi; gelir modeli sitede yazılsın mı (karar bekliyor).
- AB resmî sitesi benzeri yeniden tasarım (sonraya).

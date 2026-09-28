# Tamga Web — Deploy Öncesi Gözden Geçirme Listesi

Durum: **build 101 sayfa yeşil; sitemap + robots + temel metadata hazır.**
İşaretler: ✅ hazır · ⚠️ aksiyon gerek · 🔵 karar/opsiyon.

> **Durum (2026-08-07):** OG görseli ✅ · güvenlik başlıkları ✅ · deploy scriptleri+rehber ✅.
> **Yayın için kalan (sunucu tarafı):** DNS + SSL (certbot) + systemd + nginx → `deploy/README.md`.
> **Şimdilik ertelendi (todo):** Gizlilik/KVKK sayfaları · gerçek sosyal linkler (sayfalar açılmadı).

---

## A. Görsel paylaşım (OG)
- [x] ✅ **OG + Twitter görseli eklendi.** `src/app/opengraph-image.tsx` (1200×630,
      `next/og` ile PNG; header logosu = altıgen mühür + tamga, marka koyu zemin) +
      `twitter-image.tsx` (aynısını kullanır) + `layout.tsx`'te `twitter.card =
      summary_large_image`. Nihai logo gelince görseli güncelle.
- [x] ✅ Favicon / `public/icon.svg` mevcut.

## B. Yasal & uyum (kimlik projesi için kritik)
- [ ] ⚠️ **Gizlilik Politikası + KVKK Aydınlatma Metni + Kullanım Koşulları** sayfaları
      yok. En az `/privacy` + `/kvkk` (3 dil).
- [ ] 🔵 **Çerez onayı:** şu an sadece tema çerezi (işlevsel, onay gerekmez). Analytics
      eklenirse KVKK/GDPR çerez banner'ı gerekebilir.

## C. Placeholder & bağlantılar
- [ ] ⚠️ **Sosyal linkler placeholder:** `footer.tsx` + `social-icons.tsx` →
      `github.com/tamga-network`, `x.com/tamganetwork`. Gerçek hesap ya da kaldır.
- [ ] ⚠️ **Footer ekosistem/şirket sütunları** placeholder (Payments/Education/Health…,
      Team/Careers). Gerçek link ya da "yakında".
- [ ] 🔵 **`/components`** sayfası `noindex` ✅; ama iç önizleme galerisi — prod'a hiç
      çıkarmamayı düşün.

## D. İçerik & dil
- [ ] ⚠️ **Türkmence (TK) ilk taslak** — whitepaper, senaryolar, 7 yeni blog, docs,
      sign-in. Native Türkmençe review önerilir.
- [ ] 🔵 **Blog slug'ları** İngilizce (öneri: öyle kalsın).
- [x] ✅ EN + TR tam ve tutarlı; whitepaper/manifesto PDF'leri v2.0 güncel.

## E. SEO & metadata
- [x] ✅ Sitemap (93 URL, hreflang) + robots + canonical + hreflang alternates.
- [ ] ⚠️ **`siteUrl` doğrula** (`layout.tsx:37`) → `https://tamga.network`.
- [ ] 🔵 Deploy sonrası Google Search Console + Bing'e sitemap gönder.

## F. Teknik / build
- [x] ✅ `npm run build` temiz (101 sayfa). Deploy öncesi prod modda (`start`) smoke test.
- [ ] ⚠️ **Mimari not:** tema çerezi yüzünden tüm sayfalar `ƒ` (dynamic) → **düz statik
      hosting yetmez**, Node SSR gerekir (Vercel veya kendi Node/Docker sunucu).
- [x] ✅ Env değişkeni gerekmiyor (analytics eklenirse `NEXT_PUBLIC_*` gelir).
- [x] ✅ Özel 404 (`not-found`) var.

## G. Altyapı & deploy
- [x] ✅ **Güvenlik başlıkları eklendi** (`next.config.ts` → HSTS, CSP [WebGL/font-güvenli],
      X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy; `poweredByHeader:false`).
- [x] ✅ **Deploy scriptleri + rehber hazır** → `deploy/` (`setup.sh`, `tamga-web.service`,
      `nginx.conf.example`, `verify.sh`, `README.md`). Sunucu sertleştirme: `../tamga-network/security.sh`.
- [ ] ⚠️ **Uygula (sunucuda):** DNS (A kaydı) + certbot TLS + systemd + nginx → `deploy/README.md` adımları.
- [ ] 🔵 Hosting kararı: kendi sunucu (rehber buna göre) vs Vercel.
- [ ] 🔵 Analytics (gizlilik-dostu Plausible/Umami self-host) — karar. Eklenirse CSP `connect-src` genişlet.

## H. Performans & erişilebilirlik
- [x] ✅ Tek WebGL kütüphanesi (ogl), lazy-load, 7 bileşende reduced-motion guard.
- [ ] 🔵 Deploy sonrası **Lighthouse** (LCP/CLS, mobil).
- [ ] ⚠️ **Erişilebilirlik son pas:** kontrast (`foreground-subtle`/placeholder), odak
      halkaları, klavye navigasyonu.

## I. Deploy sonrası smoke test (5 dk)
- [ ] 3 dilde ana sayfa + tüm nav sayfaları 200
- [ ] `/tr/scenarios` + `/tk/scenarios` + `/tr/about` + `/tk/about` 200
      (yollar artık her dilde aynı — lokalize `/hakkimizda`/`/senaryolar` kaldırıldı)
- [ ] Whitepaper & manifesto PDF butonları yeni sekmede açılıyor
- [ ] Mobil menü (hamburger→X, dil dropdown), tema toggle
- [ ] `/sitemap.xml` ve `/robots.txt` erişilebilir
- [ ] WebGL arka planlar mobilde takılmıyor; reduced-motion'da donuyor

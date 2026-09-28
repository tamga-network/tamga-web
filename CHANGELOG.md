# Değişiklik günlüğü — tamga-web

Biçim: Keep a Changelog. Site dağıtımları tarihle anılır.

## [Yayınlanmadı]

### Kaldırıldı (2026-09-27)
- `deploy/` PM2 kurulum dosyaları (setup/security/authorization/verify, REDEPLOY, nginx örneği, todos) — kurulum artık
  operatör deposunda tek yerde (tek sunucu, nginx + systemd).

### Eklendi (2026-09-27 — üç kapı, ADR-0018)
- Dokümanlar genel bakışında üç kapı (Genel · Geliştirici belgeleri · Tamga ARF); belge menüsünde "Diğer belgeler";
  alt bilgide geliştirici belgeleri ve Tamga ARF bağlantıları; Geliştiriciler sayfası sonunda docs.tamga.network ve ARF.

### Eklendi (2026-09-27 — kod örnekleri)
- Geliştiriciler: kurulum sekmeleri (npm/pnpm/yarn) + dört testli örnek (`tamga-network/examples` → `npm run examples:sync`;
  `npm run check` bayat örneği yakalar). TamgaID ile giriş sayfası aynı örnek dosyaları gösterir. Kod bloklarına "Kopyala" düğmesi.

### Değişti (2026-09-27 — içerik güncel mimariye göre; denetim `../docs/SITE-GUNCELLEME.md`)
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

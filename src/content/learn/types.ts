import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";

/*
 * Learn (tamga.network/learn) içerik modeli. Sıfırdan Tamga Network'e uzanan öğrenme yolu: 7 bölüm, her bölümde kısa sayfalar.
 * Bir sayfa = tek fikir, 3–6 dakika, sade dil, bir şema, sonunda "Özet" + "Daha derine" (docs / ARF) + "Sonraki".
 * Müfredat: scratchpad'deki learn-curriculum.md (onaylı).
 *
 * Yazarlar yalnız sayfa nesnesinin `body`, `keyPoints`, `deeper` ve `diagram` alanlarını doldurur; sıra ve adresler bölüm
 * dosyalarındaki `slug`, `chapter`, `order` alanlarından gelir.
 */

export type L = Record<Locale, string>;

/** Sayfa içinde yeniden kullanılan şemalar (src/components/home-diagrams.tsx + how-it-works). Etiketler ana sayfa içeriğinden. */
export type DiagramKey =
  | "flow" // üç taraf + güven listesi
  | "how-it-works" // hareketli beş adım
  | "credential" // belge kartı, alan mühürleri, imza
  | "disclosure" // seçici paylaşım
  | "zk" // sıfır bilgi ispatı
  | "pseudonym" // site başına takma ad
  | "trust-chain" // LOTL → ülke listesi → kurum → belge
  | "roles"; // işletmeci, kayıt kurumu, devlet listeleri

/**
 * "Daha derine" bağlantısı.
 * - kind "docs": `href` docs.tamga.network içindeki yol, ör. "/concepts/trust-lists" (dile göre /tr eklenir)
 * - kind "arf":  `href` Tamga ARF içindeki sayfa, ör. "trust-framework" ya da "rulebooks/education" (dile göre /tr/)
 * - kind "site": `href` bu sitedeki yol, ör. "/learn/trust-lists" ya da "/join"
 */
export type Deeper = { label: L; href: string; kind: "docs" | "arf" | "site" };

/** Gövde: her dil için bir React parçası. Yazarlar `@/components/learn/prose` içindeki Term, Callout, Figure'ı kullanabilir. */
export type LearnBody = Partial<Record<Locale, ReactNode>>;

export type LearnPage = {
  slug: string;
  chapter: number;
  order: number;
  title: L;
  /** bir-iki cümle: sayfa ne anlatır (liste, meta açıklama) */
  summary: L;
  /** okuma süresi, dakika */
  minutes: number;
  /** sayfanın gövdesi; boşsa "yazılıyor" gösterilir */
  body?: LearnBody;
  /** "Özet" kutusu: 3 madde */
  keyPoints?: L[];
  deeper?: Deeper[];
  /** gövdenin başında gösterilecek şema (isteğe bağlı; gövde içinde de Figure kullanılabilir) */
  diagram?: DiagramKey;
};

export type LearnChapter = {
  n: number;
  key: string;
  title: L;
  /** bir satır: bölüm ne anlatır */
  intro: L;
};

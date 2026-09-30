import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getDocDoors, getDocsNav } from "@/lib/docs-nav";
import { DocArticle, Callout } from "@/components/doc-article";
import type { Locale } from "@/i18n/routing";

type Ui = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  intro: string;
  p1: string;
  calloutTitle: string;
  callout: ReactNode;
  h2contents: string;
  h2source: string;
  source: ReactNode;
};

const UI: Record<Locale, Ui> = {
  en: {
    meta: {
      title: "Documentation — Overview",
      description:
        "A guide that explains Tamga Network from scratch. It introduces digital identity, cryptography, credentials (SD-JWT VC, mdoc), trust lists, selective disclosure and blockchain for a reader with no prior knowledge.",
    },
    eyebrow: "Documentation",
    title: "Tamga Network from scratch",
    intro:
      "This guide is written for a reader with no prior knowledge of digital identity and trust technologies. It explains the terms one by one, then how Tamga Network brings them together.",
    p1: "Our aim is ambitious: to explain digital trust infrastructure, blockchain, verifiable credentials and selective disclosure so clearly that even someone with no technical background can understand. We cover each concept generally first, then in the Tamga context.",
    calloutTitle: "How to read this",
    callout: (
      <>
        Reading in order is best. The “Concepts — from scratch” section lays the
        ground; the “How Tamga works” section puts our solution on top of it. In a
        hurry? Jump straight to{" "}
        <Link href="/docs/how-tamga-works">Architecture: how Tamga runs</Link>.
      </>
    ),
    h2contents: "What’s in this guide?",
    h2source: "What are these docs the source of?",
    source: (
      <>
        The content here is the conceptual foundation that Tamga Network’s{" "}
        <Link href="/manifesto">manifesto</Link> and{" "}
        <Link href="/whitepaper">whitepaper</Link> also rest on. The manifesto and
        whitepaper PDFs cite these pages as references, so when a reader gets stuck
        on a term they can come straight here and learn it from scratch.
      </>
    ),
  },
  tr: {
    meta: {
      title: "Dokümanlar — Genel Bakış",
      description:
        "Tamga Network’ü sıfırdan anlatan rehber. Dijital kimlik, kriptografi, belgeler (SD-JWT VC, mdoc), güven listeleri, seçici açıklama ve blockchain kavramlarını hiç bilmeyen biri için baştan açıklar.",
    },
    eyebrow: "Dokümanlar",
    title: "Sıfırdan Tamga Network",
    intro:
      "Bu rehber, dijital kimlik ve güven teknolojilerini hiç bilmeyen bir okuyucu için yazıldı. Terimleri tek tek açıklıyor, sonra Tamga Network’ün bunları nasıl bir araya getirdiğini anlatıyor.",
    p1: "Amacımız iddialı: dijital güven altyapısını, blockchain’i, doğrulanabilir belgeleri ve seçici ifşayı hiç teknik bilgisi olmayan birinin bile anlayacağı şekilde anlatmak. Her kavramı önce genel olarak, sonra Tamga bağlamında ele alıyoruz.",
    calloutTitle: "Nasıl okunmalı?",
    callout: (
      <>
        Sırayla okumak en iyisidir. “Kavramlar — sıfırdan” bölümü zemini kurar;
        “Tamga nasıl çalışır” bölümü bu zeminin üzerine bizim çözümümüzü koyar.
        Aceleniz varsa doğrudan{" "}
        <Link href="/docs/how-tamga-works">Mimari: Tamga nasıl çalışır</Link> sayfasına
        geçebilirsiniz.
      </>
    ),
    h2contents: "Bu rehberde neler var?",
    h2source: "Bu dokümanlar neyin kaynağı?",
    source: (
      <>
        Buradaki içerik, Tamga Network’ün <Link href="/manifesto">manifestosunun</Link>{" "}
        ve <Link href="/whitepaper">whitepaper’ının</Link> da dayandığı kavramsal
        temeldir. Manifesto ve whitepaper PDF’lerinde bu sayfalara kaynak olarak
        atıf verilir; böylece bir okuyucu bir terime takıldığında doğrudan buraya
        gelip sıfırdan öğrenebilir.
      </>
    ),
  },
  tk: {
    meta: {
      title: "Resminamalar — Umumy syn",
      description:
        "Tamga Network-i başdan düşündirýän gollanma. Sanly şahsyýet, kriptografiýa, resminamalar (SD-JWT VC, mdoc), ynam sanawlary, saýlama açyklama we blokçeýn düşünjelerini asla bilmeýän adam üçin başdan düşündirýär.",
    },
    eyebrow: "Resminamalar",
    title: "Başdan Tamga Network",
    intro:
      "Bu gollanma, sanly şahsyýet we ynam tehnologiýalaryny asla bilmeýän okyjy üçin ýazyldy. Terminleri birin-birin düşündirýär, soň Tamga Network-iň olary nähili birleşdirýändigini beýan edýär.",
    p1: "Maksadymyz uly: sanly ynam infrastrukturasyny, blokçeýni, barlanyp bilinýän resminamalary we saýlama açyklamany asla tehniki bilimi bolmadyk adamyň hem düşünjek görnüşinde düşündirmek. Her düşünjäni ilki umumy, soň Tamga çäginde ele alýarys.",
    calloutTitle: "Nähili okalmaly?",
    callout: (
      <>
        Yzygiderli okamak iň gowusy. “Düşünjeler — başdan” bölümi binýady goýýar;
        “Tamga nähili işleýär” bölümi bu binýadyň üstünde biziň çözgüdimizi goýýar.
        Howlugýan bolsaňyz göni{" "}
        <Link href="/docs/how-tamga-works">Arhitektura: Tamga nähili işleýär</Link>{" "}
        sahypasyna geçip bilersiňiz.
      </>
    ),
    h2contents: "Bu gollanmada näme bar?",
    h2source: "Bu resminamalar nämäniň çeşmesi?",
    source: (
      <>
        Bu ýerdäki mazmun, Tamga Network-iň{" "}
        <Link href="/manifesto">manifestiniň</Link> we{" "}
        <Link href="/whitepaper">whitepaper-iniň</Link> hem daýanýan düşünje
        binýadydyr. Manifest we whitepaper PDF-lerinde bu sahypalara çeşme
        hökmünde salgy berilýär; şeýlelikde okyjy bir termine kürtdürende göni bu
        ýere gelip başdan öwrenip bilýär.
      </>
    ),
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = UI[locale as Locale] ?? UI.en;
  return pageMeta(locale, "/docs", { title: ui.meta.title, description: ui.meta.description });
}

export default async function DocsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = UI[locale as Locale] ?? UI.en;
  const nav = getDocsNav(locale);
  const doors = getDocDoors(locale);
  const here = { en: "You are here", tr: "Buradasınız", tk: "Siz şu ýerde" }[locale as Locale] ?? "You are here";

  return (
    <DocArticle href="/docs" eyebrow={ui.eyebrow} title={ui.title} intro={ui.intro}>
      <p>{ui.p1}</p>

      <div className="not-prose my-8 grid gap-3 sm:grid-cols-3">
        {doors.map((d) => {
          const body = (
            <>
              <span className="flex items-center justify-between gap-2 text-sm font-medium text-foreground">
                {d.title}
                {d.external ? (
                  <ArrowUpRight size={15} aria-hidden className="text-foreground-subtle group-hover:text-primary" />
                ) : (
                  <span className="mono-label text-primary">{here}</span>
                )}
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-foreground-muted">{d.text}</span>
            </>
          );
          const cls = `group block rounded-lg border px-4 py-3 transition-colors ${
            d.external ? "border-border bg-surface/40 hover:border-border-strong" : "border-primary/40 bg-primary/5"
          }`;
          return d.external ? (
            <a key={d.key} href={d.external} className={cls}>
              {body}
            </a>
          ) : (
            <div key={d.key} className={cls}>
              {body}
            </div>
          );
        })}
      </div>

      <Callout title={ui.calloutTitle} tone="gold">
        {ui.callout}
      </Callout>

      <h2>{ui.h2contents}</h2>

      {nav
        .filter((_s, i) => i !== 0)
        .map((section) => (
          <div key={section.title} className="not-prose mt-6">
            <p className="mono-label mb-3">{section.title}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm text-foreground transition-colors hover:border-border-strong"
                  >
                    {item.title}
                    <ArrowRight
                      size={15}
                      className="text-foreground-subtle transition-colors group-hover:text-primary"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      <h2>{ui.h2source}</h2>
      <p>{ui.source}</p>
    </DocArticle>
  );
}

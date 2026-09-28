import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { Threads } from "@/components/threads";
import { FloatingLines } from "@/components/floating-lines";
import { Galaxy } from "@/components/galaxy";
import { Lightfall } from "@/components/lightfall";
import { LetterGlitch } from "@/components/letter-glitch";
import { ShinyText } from "@/components/shiny-text";
import { GradientText } from "@/components/gradient-text";
import { StarBorder } from "@/components/star-border";

export const metadata: Metadata = {
  title: "Components",
  robots: { index: false, follow: false },
};

function Demo({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="mono-label text-primary">{name}</span>
        <span className="text-sm text-foreground-muted">{note}</span>
      </div>
      {children}
    </section>
  );
}

export default async function ComponentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="shell max-w-4xl py-16 sm:py-20">
      <p className="eyebrow mb-3">Internal · not linked</p>
      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Components
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
        reactbits elementlerinin markaya uyarlanmış önizlemeleri (taslak tasarım
        sayfası). Beğendiklerini söyle, gerçek sayfalara yerleştirelim. Bu sayfa
        navigasyonda yok ve arama motorlarına kapalı.
      </p>

      {/* ---- Backgrounds ---- */}
      <Demo name="Threads" note="Hero / bölüm arka planı — dokuma iplikler (ogl)">
        <div className="relative h-64 overflow-hidden rounded-xl border border-border bg-surface">
          <Threads color={[0.78, 0.63, 0.3]} amplitude={1.2} distance={0.2} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-foreground">
              Tamga Network
            </span>
          </div>
        </div>
      </Demo>

      <Demo name="Floating Lines" note="CTA / bölüm arka planı — akışkan gradyan çizgiler (three.js)">
        <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-surface">
          <FloatingLines
            linesGradient={["#B01E22", "#C8A24C", "#2A6F8E"]}
            animationSpeed={1}
            lineCount={[5]}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-foreground">
              Build Trust
            </span>
          </div>
        </div>
      </Demo>

      <Demo name="Galaxy" note="Hero / geniş bölüm — süzülen yıldız alanı, imleçle iter (ogl)">
        <div
          className="relative h-72 overflow-hidden rounded-xl border border-border"
          style={{ background: "#07070c" }}
        >
          <Galaxy density={1.1} glowIntensity={0.4} hueShift={20} saturation={0.6} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-white">
              Turkic World
            </span>
          </div>
        </div>
      </Demo>

      <Demo name="Lightfall" note="Dramatik bölüm — ışık huzmeli tünel, imleç ışığı (ogl)">
        <div className="relative h-72 overflow-hidden rounded-xl border border-border">
          <Lightfall
            colors={["#C8A24C", "#B01E22", "#2A6F8E"]}
            backgroundColor="#0d0d0f"
            streakCount={3}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-white">
              Digital Trust
            </span>
          </div>
        </div>
      </Demo>

      <Demo name="Letter Glitch" note="Teknik / güvenlik bölümü — glitch'leyen karakter ızgarası (canvas)">
        <div className="relative h-64 overflow-hidden rounded-xl border border-border">
          <LetterGlitch glitchColors={["#b01e22", "#c8a24c", "#2a6f8e"]} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl font-semibold text-white">
issuerId · X.509
            </span>
          </div>
        </div>
      </Demo>

      {/* ---- Text ---- */}
      <Demo name="Shiny Text" note="Eyebrow, etiket, küçük başlık — üzerinden parıltı geçer">
        <div className="rounded-xl border border-border bg-surface/40 p-8">
          <ShinyText
            text="Building trust infrastructure"
            className="text-2xl font-semibold"
            shineColor="var(--gold-bright)"
          />
        </div>
      </Demo>

      <Demo name="Gradient Text" note="Vurgu kelime, rozet — animasyonlu marka gradyanı">
        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-surface/40 p-8">
          <GradientText className="text-3xl font-bold">Digital Trust</GradientText>
          <GradientText showBorder className="text-sm">
            eIDAS 2.0 ready
          </GradientText>
        </div>
      </Demo>

      {/* ---- Micro ---- */}
      <Demo name="Star Border" note="Özel CTA butonu — kenarında dönen parıltı">
        <div className="flex flex-wrap gap-4 rounded-xl border border-border bg-surface/40 p-8">
          <StarBorder as="button" color="var(--gold-bright)">
            Get early access
          </StarBorder>
          <StarBorder as="button" color="var(--primary)" speed="4s">
            Read the whitepaper
          </StarBorder>
        </div>
      </Demo>

      <p className="mt-16 text-sm text-foreground-subtle">
        <strong className="text-foreground-muted">Hyperspeed</strong> henüz
        eklenmedi — `three` + `postprocessing` (yeni bağımlılık) ve ~600 satır
        gerektiriyor. İstersen ekleyeyim. Ayrıca Light Rays, Silk, Aurora, Split
        Text, Count Up, Rotating Text, Magnet, Click Spark de eklenebilir.
      </p>
    </div>
  );
}

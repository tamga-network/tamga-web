import { ArrowRight, Check, Fingerprint, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";
import { SectionHeading } from "./ui";
import type { Locale } from "@/i18n/routing";

export type ConsentField = { label: string; state: "shared" | "proven" | "hidden" };
export type ConsentData = {
  app: string;
  wants: string;
  fields: ConsentField[];
  allow: string;
  deny: string;
  note: string;
};
type LoginData = { signInTo: string; app: string; google: string; apple: string; or: string; tamga: string };
type Content = {
  eyebrow: string;
  title: string;
  description: string;
  benefits: { title: string; body: string }[];
  link: string;
  login: LoginData;
  consent: ConsentData;
};

/** Mock of a website's sign-in options, with "Sign in with Tamga" highlighted. */
function LoginButtonsMock({ d }: { d: LoginData }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-2xl border border-border-strong bg-background-elevated p-5 shadow-soft">
      <p className="mb-4 text-center text-sm text-foreground-muted">
        {d.signInTo} <span className="font-semibold text-foreground">{d.app}</span>
      </p>
      <div className="space-y-2.5">
        {[d.google, d.apple].map((label) => (
          <div
            key={label}
            className="flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-[13px] font-medium text-foreground-subtle"
          >
            {label}
          </div>
        ))}
        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-wide text-foreground-subtle">{d.or}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-contrast shadow-sm">
          <LogoMark size={16} mono /> {d.tamga}
        </div>
      </div>
    </div>
  );
}

/** Mock of the Tamga Wallet consent screen — the site gets only what you approve. */
export function ConsentMock({ d }: { d: ConsentData }) {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-border-strong bg-background-elevated shadow-soft">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <LogoMark size={16} />
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground-subtle">Tamga Wallet</span>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm leading-snug text-foreground">
          <strong>{d.app}</strong> {d.wants}
        </p>
        <div className="mt-3 space-y-2">
          {d.fields.map((f) => (
            <div
              key={f.label}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface/40 px-3 py-2"
            >
              <span className="text-[13px] text-foreground" lang="en">{f.label}</span>
              {f.state === "shared" ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-gold">
                  <Check size={11} /> shared
                </span>
              ) : f.state === "proven" ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                  <Fingerprint size={11} /> proven
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-foreground-subtle">
                  <Lock size={10} /> hidden
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-[13px] font-medium text-primary-contrast">
            {d.allow}
          </div>
          <div className="rounded-lg border border-border px-4 py-2 text-center text-[13px] font-medium text-foreground-muted">
            {d.deny}
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] leading-snug text-foreground-subtle">{d.note}</p>
      </div>
    </div>
  );
}

const en: Content = {
  eyebrow: "Sign in",
  title: "Sign in with Tamga",
  description:
    "Like “Sign in with Google”, but the identity is yours. A website asks for only the fields it needs; you approve each one on a consent screen; it never sees a password or a pool of your data.",
  benefits: [
    { title: "Sign up once, then a passkey", body: "No new password for every site. You sign up once with your wallet; after that, daily sign-in is a passkey on your device and no fields are shared again." },
    { title: "You choose what is shared", body: "Prove you are over 18 without revealing your birth date; share a name without an address." },
    { title: "Phishing-resistant", body: "There is no password to steal or leak — sign-in is a cryptographic proof from your device." },
    { title: "Verified when it matters", body: "When a service must, it can know you are a real person whose identity document was checked — not an anonymous account." },
  ],
  link: "How “Sign in with Tamga” works",
  login: { signInTo: "Sign in to", app: "example.com", google: "Continue with Google", apple: "Continue with Apple", or: "or", tamga: "Sign in with Tamga" },
  consent: {
    app: "example.com",
    wants: "wants to access:",
    fields: [
      { label: "Full name", state: "shared" },
      { label: "Over 18", state: "proven" },
      { label: "Email", state: "shared" },
      { label: "Home address", state: "hidden" },
    ],
    allow: "Allow",
    deny: "Deny",
    note: "No password shared · you control every field",
  },
};

const tr: Content = {
  eyebrow: "Giriş",
  title: "Tamga ile giriş yap",
  description:
    "“Google ile giriş yap” gibi, ama kimlik senin. Bir web sitesi yalnızca ihtiyaç duyduğu alanları ister; her birini bir izin ekranında onaylarsın; site bir şifreni ya da veri havuzunu asla görmez.",
  benefits: [
    { title: "Bir kez kayıt, sonra passkey", body: "Her siteye ayrı şifre yok. Siteye bir kez cüzdanınla kaydolursun; sonrasında günlük giriş cihazındaki passkey ile olur ve hiçbir alan yeniden paylaşılmaz." },
    { title: "Neyin paylaşılacağını sen seçersin", body: "Doğum tarihini vermeden 18 yaş üstü olduğunu kanıtla; adres vermeden isim paylaş." },
    { title: "Oltalamaya dayanıklı", body: "Çalınacak ya da sızacak bir şifre yok — giriş, cihazından gelen kriptografik bir kanıttır." },
    { title: "Gerektiğinde doğrulanmış", body: "Bir hizmet gerektirdiğinde, anonim bir hesap değil, kimlik belgesi doğrulanmış gerçek biri olduğunu bilebilir." },
  ],
  link: "“Tamga ile giriş yap” nasıl çalışır",
  login: { signInTo: "Şuraya giriş:", app: "example.com", google: "Google ile devam et", apple: "Apple ile devam et", or: "veya", tamga: "Tamga ile giriş yap" },
  consent: {
    app: "example.com",
    wants: "şunlara erişmek istiyor:",
    fields: [
      { label: "Ad soyad", state: "shared" },
      { label: "18 yaş üstü", state: "proven" },
      { label: "E-posta", state: "shared" },
      { label: "Ev adresi", state: "hidden" },
    ],
    allow: "İzin ver",
    deny: "Reddet",
    note: "Şifre paylaşılmaz · her alanı sen kontrol edersin",
  },
};

const tk: Content = {
  eyebrow: "Giriş",
  title: "Tamga bilen gir",
  description:
    "“Google bilen gir” ýaly, ýöne şahsyýet seniňki. Web-saýt diňe zerur meýdanlary soraýar; her birini razylyk ekranynda tassyklaýarsyň; saýt parolyňy ýa-da maglumat howzuny asla görmeýär.",
  benefits: [
    { title: "Bir gezek hasaba dur, soň passkey", body: "Her saýt üçin täze parol ýok. Saýta bir gezek gapjygyň bilen hasaba durýarsyň; soňra gündelik giriş enjamyňdaky passkey bilen bolýar we hiç bir meýdan gaýtadan paýlaşylmaýar." },
    { title: "Nämäniň paýlaşyljagyny sen saýlaýarsyň", body: "Doglan senäni açman 18 ýaşdan uludygyňy subut et; salgy bermän ady paýlaş." },
    { title: "Fişinge çydamly", body: "Ogurlanjak ýa-da syzjak parol ýok — giriş enjamyňdan gelýän kriptografik subutnamadyr." },
    { title: "Gerek bolanda barlanan", body: "Hyzmat talap etse, anonim hasap däl, şahsyýet resminamasy barlanan hakyky adamdygyňy bilip bilýär." },
  ],
  link: "“Tamga bilen gir” nähili işleýär",
  login: { signInTo: "Giriş:", app: "example.com", google: "Google bilen dowam et", apple: "Apple bilen dowam et", or: "ýa-da", tamga: "Tamga bilen gir" },
  consent: {
    app: "example.com",
    wants: "şulara girmek isleýär:",
    fields: [
      { label: "Ady we familiýasy", state: "shared" },
      { label: "18 ýaşdan uly", state: "proven" },
      { label: "E-poçta", state: "shared" },
      { label: "Öý salgysy", state: "hidden" },
    ],
    allow: "Rugsat ber",
    deny: "Ret et",
    note: "Parol paýlaşylmaýar · her meýdany sen dolandyrýarsyň",
  },
};

const content: Record<Locale, Content> = { en, tr, tk };

export function getSignInConsent(locale: string): ConsentData {
  return (content[locale as Locale] ?? en).consent;
}

export function SignInSection({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? en;
  return (
    <section className="border-y border-border bg-background-elevated/40">
      <div className="shell py-20 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow={c.eyebrow} title={c.title} description={c.description} />
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* benefits */}
          <div className="space-y-5">
            {c.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.28}>
              <Link
                href="/docs/login-with-tamga"
                className="link-underline inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-primary"
              >
                {c.link} <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          {/* visuals: login options → consent */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-4">
              <LoginButtonsMock d={c.login} />
              <ArrowRight aria-hidden className="hidden rotate-90 text-primary/40 lg:block" size={20} />
              <ConsentMock d={c.consent} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

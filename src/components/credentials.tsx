import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";
import type { Locale } from "@/i18n/routing";

type Row = { k: string; v: string; accent?: boolean; divider?: boolean };
type CredContent = {
  eyebrow: string;
  title: string;
  body: string;
  link: string;
  cardHeading: string;
  verified: string;
  rows: Row[];
  footnote: string;
};

const en: CredContent = {
  eyebrow: "Verifiable Credentials",
  title: "Verify once. Present anywhere.",
  body: "A credential is issued and signed once. You reveal only the fields you choose — the rest stay hidden as salted hashes — and any verifier checks the signature cryptographically, without ever going back to the issuer.",
  link: "How selective disclosure works",
  cardHeading: "Credential",
  verified: "Verified",
  rows: [
    { k: "type", v: "University diploma" },
    { k: "issuer", v: "Example University · X.509 (TR)" },
    { k: "issuerId", v: "0x9f2a…c1" },
    { k: "holder", v: "device key · this verifier’s copy", accent: true },
    { k: "disclosed", v: "degree · graduation_year ✓" },
    { k: "withheld", v: "gpa · student_no · birth_date" },
    { k: "proof", v: "SD-JWT VC · selective disclosure", divider: true },
  ],
  footnote: "Example: a university diploma. The issuer is an X.509 institution listed in the national trust list; each verifier receives a different copy, so verifiers cannot link the holder.",
};

const tr: CredContent = {
  eyebrow: "Doğrulanabilir Belgeler",
  title: "Bir kez doğrula. Her yerde sun.",
  body: "Belge bir kez düzenlenir ve imzalanır. Yalnızca seçtiğin alanları açarsın — gerisi tuzlanmış özet olarak gizli kalır — ve herhangi bir doğrulayıcı, düzenleyene hiç geri dönmeden imzayı kriptografik olarak denetler.",
  link: "Seçici ifşa nasıl çalışır",
  cardHeading: "Belge",
  verified: "Doğrulandı",
  rows: [
    { k: "tür", v: "Üniversite diploması" },
    { k: "düzenleyen", v: "Örnek Üniversite · X.509 (TR)" },
    { k: "issuerId", v: "0x9f2a…c1" },
    { k: "tutan", v: "cihaz anahtarı · bu doğrulayıcının kopyası", accent: true },
    { k: "açıklanan", v: "degree · graduation_year ✓" },
    { k: "gizlenen", v: "gpa · student_no · birth_date" },
    { k: "kanıt", v: "SD-JWT VC · seçici açıklama", divider: true },
  ],
  footnote: "Örnek: üniversite diploması. Düzenleyen, ulusal güven listesinde kayıtlı bir X.509 kurumu; her doğrulayıcı farklı bir kopya alır, bu yüzden doğrulayıcılar belge sahibini birbirleriyle eşleştiremez.",
};

const tk: CredContent = {
  eyebrow: "Barlanýan resminamalar",
  title: "Bir gezek barla. Islendik ýerde hödürle.",
  body: "Resminama bir gezek berilýär we gol çekilýär. Diňe saýlan meýdanlaryňy açýarsyň — galanlary duzlanan haş hökmünde gizlin galýar — we islendik barlaýjy, berijä asla dolanman goly kriptografik taýdan barlaýar.",
  link: "Saýlama açyklama nähili işleýär",
  cardHeading: "Resminama",
  verified: "Barlandy",
  rows: [
    { k: "görnüş", v: "Uniwersitet diplomy" },
    { k: "beriji", v: "Mysal uniwersitet · X.509 (TR)" },
    { k: "issuerId", v: "0x9f2a…c1" },
    { k: "eýe", v: "enjam açary · şu barlaýjynyň nusgasy", accent: true },
    { k: "açylan", v: "degree · graduation_year ✓" },
    { k: "gizlenen", v: "gpa · student_no · birth_date" },
    { k: "subutnama", v: "SD-JWT VC · saýlama açyklama", divider: true },
  ],
  footnote: "Mysal: uniwersitet diplomy. Beriji — milli ynam sanawynda hasaba alnan X.509 gurama; her barlaýjy başga nusga alýar, şonuň üçin barlaýjylar eýäni biri-biri bilen baglanyşdyryp bilmeýär.",
};

const content: Record<Locale, CredContent> = { en, tr, tk };

export function Credentials({ locale }: { locale: string }) {
  const c = content[locale as Locale] ?? en;
  return (
    <section className="shell py-20 sm:py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Claim */}
        <Reveal>
          <div>
            <p className="eyebrow mb-3">{c.eyebrow}</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {c.title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-foreground-muted">
              {c.body}
            </p>
            <Link
              href="/docs/selective-disclosure"
              className="link-underline mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              {c.link} <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        {/* Widget card */}
        <Reveal delay={0.1}>
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-border-strong bg-background-elevated shadow-soft">
              {/* head */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground-subtle">
                  {c.cardHeading}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-gold">
                  <LogoMark size={15} /> {c.verified}
                </span>
              </div>

              {/* claims */}
              <div className="space-y-3 px-5 py-4 font-mono text-[12.5px] leading-relaxed">
                {c.rows.map((row) => (
                  <div
                    key={row.k}
                    className={`flex justify-between gap-4 ${
                      row.divider ? "border-t border-border pt-3" : ""
                    }`}
                  >
                    <span className="text-foreground-subtle">{row.k}</span>
                    <span
                      className={`truncate ${
                        row.accent ? "text-accent" : "text-foreground"
                      }`}
                      lang="en"
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* footnote */}
              <div className="border-t border-border px-5 py-3">
                <span className="font-mono text-[10.5px] text-foreground-subtle">
                  {c.footnote}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

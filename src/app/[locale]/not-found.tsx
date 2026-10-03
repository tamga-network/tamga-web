import { getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark size={48} />
      <p className="eyebrow mt-8">{t("code")}</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-foreground-muted">{t("body")}</p>
      <div className="mt-8 flex gap-3">
        <Button href="/">{t("home")}</Button>
        <Button href="/learn" variant="outline">
          {t("docs")}
        </Button>
      </div>
    </div>
  );
}

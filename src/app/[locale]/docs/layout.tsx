import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BookOpen, List, ChevronDown } from "lucide-react";
import { DocsSidebar } from "@/components/docs-sidebar";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();
  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[240px_1fr] lg:gap-14 lg:py-16">
      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-2">
        <Link
          href="/docs"
          className="mb-6 flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <BookOpen size={16} className="text-primary" />
          {t("nav.docs")}
        </Link>

        {/* Mobile: collapsible */}
        <details className="group mb-2 lg:hidden">
          <summary className="flex list-none items-center justify-between rounded-lg border border-border bg-surface/40 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              <List size={15} className="text-primary" />
              {t("common.contents")}
            </span>
            <ChevronDown
              size={16}
              className="text-foreground-subtle transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="mt-4 border-t border-border pt-4">
            <DocsSidebar />
          </div>
        </details>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DocsSidebar />
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 max-w-3xl">{children}</div>
    </div>
  );
}

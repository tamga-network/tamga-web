/**
 * Otomatik çeviri notu: başlığın altında ince bant. Yalnız ana dili konuşan birinin okuması henüz bitmemiş dillerde görünür
 * (bugün az); okuma bitince dil bu listeden çıkarılır.
 */
const NOTES: Partial<Record<string, { text: string; write: string }>> = {
  az: {
    text: "Bu səhifə avtomatik tərcümə olunub. Səhv görsəniz,",
    write: "ünvanına yazın.",
  },
};

export function TranslationNote({ locale }: { locale: string }) {
  const note = NOTES[locale];
  if (!note) return null;
  return (
    <div role="note" className="border-b border-border bg-surface">
      <p className="shell py-2 text-sm text-foreground-muted">
        {note.text}{" "}
        <a
          href="mailto:info@tamga.network"
          className="underline decoration-border-strong underline-offset-2 hover:text-foreground"
        >
          info@tamga.network
        </a>{" "}
        {note.write}
      </p>
    </div>
  );
}

type LoaderProps = {
  badge?: string;
  count?: number;
  title?: string;
};

export default function Loader({
  badge = "loading",
  count = 10,
  title = "Loading titles",
}: LoaderProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-500">
          {badge}
        </span>
      </div>
      {/* Hero section */}
      <div className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

      <div className="flex items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="sr-only">{title}</div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={`${badge}-${index}`}
            className="overflow-hidden rounded-2xl border border-r(--border) bg-white shadow-sm dark:bg-slate-900"
          >
            <div className="h-42 animate-pulse bg-slate-200 md:h-70 dark:bg-slate-800" />
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-full space-y-2">
                  <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="h-7 w-14 shrink-0 animate-pulse rounded-full bg-amber-400/20" />
              </div>
              <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

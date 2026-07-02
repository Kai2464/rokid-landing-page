function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-gray-200 dark:bg-white/10 ${className}`}
    />
  );
}

function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[2rem] border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/5 ${className}`}
    />
  );
}

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white text-gray-950 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
      <header className="border-b border-gray-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-10 w-10" />
            <SkeletonBlock className="h-5 w-32" />
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-20" />
          </div>

          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-11 w-11" />
            <SkeletonBlock className="h-11 w-36" />
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gray-100 blur-3xl dark:bg-white/5" />

        <section className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <SkeletonBlock className="mb-6 h-10 w-64" />

            <div className="space-y-4">
              <SkeletonBlock className="h-14 w-full max-w-xl rounded-2xl" />
              <SkeletonBlock className="h-14 w-full max-w-lg rounded-2xl" />
              <SkeletonBlock className="h-14 w-full max-w-md rounded-2xl" />
            </div>

            <div className="mt-8 space-y-3">
              <SkeletonBlock className="h-5 w-full max-w-2xl rounded-xl" />
              <SkeletonBlock className="h-5 w-full max-w-xl rounded-xl" />
              <SkeletonBlock className="h-5 w-full max-w-lg rounded-xl" />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SkeletonBlock className="h-12 w-44" />
              <SkeletonBlock className="h-12 w-36" />
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <SkeletonCard className="h-32" />
              <SkeletonCard className="h-32" />
              <SkeletonCard className="h-32" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-8 rounded-[2.5rem] bg-gray-200 blur-3xl dark:bg-white/10" />

            <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-950/10 dark:border-white/10 dark:bg-gray-900 dark:shadow-black/30">
              <SkeletonCard className="min-h-[420px]" />

              <div className="mt-4 grid grid-cols-3 gap-3">
                <SkeletonCard className="h-20 rounded-2xl" />
                <SkeletonCard className="h-20 rounded-2xl" />
                <SkeletonCard className="h-20 rounded-2xl" />
              </div>

              <div className="mt-4 space-y-3 rounded-[1.5rem] bg-gray-950 p-4 dark:bg-white/5">
                <SkeletonBlock className="h-14 w-full rounded-2xl bg-white/10" />
                <SkeletonBlock className="h-14 w-full rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SkeletonLoader;
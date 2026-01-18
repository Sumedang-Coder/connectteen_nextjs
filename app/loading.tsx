export function HistorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-neutral-900 to-neutral-800 p-5"
        >
          {/* shimmer */}
          <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-white/5 to-transparent" />

          {/* image */}
          <div className="h-40 w-full rounded-xl bg-neutral-700/50" />

          {/* text */}
          <div className="mt-4 space-y-3">
            <div className="h-4 w-3/4 rounded bg-neutral-700/60" />
            <div className="h-3 w-1/2 rounded bg-neutral-700/40" />
            <div className="h-3 w-2/3 rounded bg-neutral-700/40" />
          </div>
        </div>
      ))}
    </div>
  )
}

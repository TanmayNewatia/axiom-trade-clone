"use client";

export function TokenCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      {/* Icon and name skeleton */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-secondary rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-secondary rounded w-3/4" />
          <div className="h-3 bg-secondary rounded w-1/2" />
        </div>
      </div>

      {/* Price section skeleton */}
      <div className="mb-3 p-2 rounded space-y-2">
        <div className="h-3 bg-secondary rounded" />
        <div className="h-3 bg-secondary rounded w-2/3" />
      </div>

      {/* Stats skeleton */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-3 bg-secondary rounded w-8" />
        ))}
      </div>

      {/* Actions skeleton */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-8 h-8 bg-secondary rounded" />
        ))}
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-1">
        {[1, 2].map((i) => (
          <div key={i} className="h-3 bg-secondary rounded px-2 py-1 w-10" />
        ))}
      </div>
    </div>
  );
}

export function TokenGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-max">
      {/* New Pairs Column */}
      <section className="space-y-4">
        <div className="h-5 bg-secondary rounded w-24 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Final Stretch Column */}
      <section className="space-y-4">
        <div className="h-5 bg-secondary rounded w-24 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* Migrated Column */}
      <section className="space-y-4 sm:col-span-2 lg:col-span-1">
        <div className="h-5 bg-secondary rounded w-24 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <TokenCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

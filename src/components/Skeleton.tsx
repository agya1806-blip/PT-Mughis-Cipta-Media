export function BookCardSkeleton() {
  return (
    <div className="rounded-xl border border-gold/20 bg-cream overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-cream" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-cream rounded w-1/3" />
        <div className="h-5 bg-cream rounded w-3/4" />
        <div className="h-4 bg-cream rounded w-1/2" />
        <div className="h-6 bg-cream rounded w-1/4" />
      </div>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-cream rounded-xl border border-gold/20 p-6 animate-pulse">
      <div className="h-6 bg-cream rounded w-3/4 mb-3" />
      <div className="h-4 bg-cream rounded w-1/3 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-cream rounded w-full" />
        <div className="h-4 bg-cream rounded w-5/6" />
        <div className="h-4 bg-cream rounded w-4/6" />
      </div>
    </div>
  )
}



export function BookCardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-zinc-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-100 rounded w-1/3" />
        <div className="h-5 bg-zinc-100 rounded w-3/4" />
        <div className="h-4 bg-zinc-100 rounded w-1/2" />
        <div className="h-6 bg-zinc-100 rounded w-1/4" />
      </div>
    </div>
  )
}

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 animate-pulse">
      <div className="h-6 bg-zinc-100 rounded w-3/4 mb-3" />
      <div className="h-4 bg-zinc-100 rounded w-1/3 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-zinc-100 rounded w-full" />
        <div className="h-4 bg-zinc-100 rounded w-5/6" />
        <div className="h-4 bg-zinc-100 rounded w-4/6" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-8">
      <div className="h-8 bg-zinc-100 rounded w-1/3" />
      <div className="h-4 bg-zinc-100 rounded w-2/3" />
      <div className="h-4 bg-zinc-100 rounded w-1/2" />
      <div className="h-48 bg-zinc-100 rounded-xl" />
      <div className="space-y-3">
        <div className="h-4 bg-zinc-100 rounded w-full" />
        <div className="h-4 bg-zinc-100 rounded w-5/6" />
        <div className="h-4 bg-zinc-100 rounded w-4/6" />
      </div>
    </div>
  )
}

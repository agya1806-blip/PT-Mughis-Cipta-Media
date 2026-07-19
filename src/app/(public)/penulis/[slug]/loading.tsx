export default function AuthorDetailLoading() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-4 bg-zinc-200 rounded w-48 mb-6 animate-pulse" />
        <div className="h-8 bg-zinc-200 rounded w-64 mb-8 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 bg-white overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-zinc-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-100 rounded w-1/3" />
                <div className="h-5 bg-zinc-100 rounded w-3/4" />
                <div className="h-4 bg-zinc-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

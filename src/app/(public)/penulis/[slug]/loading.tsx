export default function AuthorDetailLoading() {
  return (
    <div className="flex-1 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-4 bg-gold/20 rounded w-48 mb-6 animate-pulse" />
        <div className="bg-cream rounded-2xl border border-gold/20 overflow-hidden animate-pulse">
          <div className="h-32 sm:h-40 bg-cream" />
          <div className="px-6 sm:px-8 pb-8 -mt-14 sm:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-6">
              <div className="w-24 h-24 rounded-2xl border-4 border-cream bg-cream shrink-0" />
              <div className="pt-14 sm:pt-0 space-y-2">
                <div className="h-7 bg-gold/20 rounded w-48" />
                <div className="h-4 bg-cream rounded w-32" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-cream rounded w-full" />
              <div className="h-4 bg-cream rounded w-5/6" />
              <div className="h-4 bg-cream rounded w-4/6" />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="h-6 bg-gold/20 rounded w-48 mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gold/20 bg-cream overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-cream" />
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
    </div>
  )
}

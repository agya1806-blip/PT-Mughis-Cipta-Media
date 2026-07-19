export default function BookDetailLoading() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-4 bg-zinc-200 rounded w-48 mb-6 animate-pulse" />
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="aspect-[3/4] bg-zinc-100 rounded-xl animate-pulse" />
            <div className="md:col-span-2 space-y-6">
              <div className="h-6 bg-zinc-200 rounded w-24 animate-pulse" />
              <div className="h-8 bg-zinc-200 rounded w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 bg-zinc-100 rounded animate-pulse" />
                ))}
              </div>
              <div className="h-10 bg-zinc-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

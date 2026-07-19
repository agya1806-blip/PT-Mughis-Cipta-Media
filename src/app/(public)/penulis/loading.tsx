export default function AuthorsLoading() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-4 bg-zinc-200 rounded w-48 mb-8 animate-pulse" />
        <div className="h-8 bg-zinc-200 rounded w-32 mb-2 animate-pulse" />
        <div className="h-4 bg-zinc-200 rounded w-64 mb-8 animate-pulse" />
        <div className="h-11 bg-zinc-200 rounded-xl max-w-md mb-8 animate-pulse" />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 bg-zinc-200 rounded-full w-24 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 animate-pulse">
              <div className="w-20 h-20 bg-zinc-100 rounded-full mx-auto mb-4" />
              <div className="h-4 bg-zinc-100 rounded w-3/4 mx-auto mb-1" />
              <div className="h-3 bg-zinc-100 rounded w-1/2 mx-auto mb-3" />
              <div className="h-5 bg-zinc-100 rounded w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

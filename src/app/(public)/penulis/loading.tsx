export default function AuthorsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 bg-zinc-200 rounded w-48 mb-8 animate-pulse" />
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-zinc-100 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}

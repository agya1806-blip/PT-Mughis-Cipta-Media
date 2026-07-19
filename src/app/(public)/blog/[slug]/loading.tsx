export default function BlogArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-4 bg-zinc-200 rounded w-48 mb-6 animate-pulse" />
      <div className="h-10 bg-zinc-200 rounded w-3/4 mb-4 animate-pulse" />
      <div className="h-4 bg-zinc-200 rounded w-1/3 mb-8 animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 bg-zinc-100 rounded w-full animate-pulse" />
        <div className="h-4 bg-zinc-100 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-zinc-100 rounded w-4/6 animate-pulse" />
        <div className="h-4 bg-zinc-100 rounded w-full animate-pulse" />
        <div className="h-4 bg-zinc-100 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  )
}

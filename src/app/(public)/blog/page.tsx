import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata = { title: "Blog | Maktabah al-Mughis" }

const PER_PAGE = 6

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1)
  const skip = (currentPage - 1) * PER_PAGE

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: PER_PAGE,
    }),
    prisma.article.count(),
  ])

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Blog</h1>
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center text-zinc-500">
            <p>Belum ada artikel. Kembali lagi nanti.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((a) => (
              <Link key={a.id} href={`/blog/${a.slug}`} className="block bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-zinc-900 mb-2">{a.title}</h2>
                <p className="text-sm text-zinc-500">
                  {new Date(a.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="text-zinc-600 mt-3 line-clamp-3">{a.content.replace(/<[^>]*>/g, "").substring(0, 200)}...</p>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
              >
                Sebelumnya
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  p === currentPage
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {p}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="px-4 py-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-colors text-sm"
              >
                Selanjutnya
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

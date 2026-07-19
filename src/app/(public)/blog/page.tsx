import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Pagination, EmptyState } from "@/components/ui"

export const metadata = {
  title: "Blog",
  description: "Baca artikel dan informasi terbaru seputar dunia penerbitan, literasi, dan kegiatan Maktabah al-Mughis - PT Mughis Cipta Media.",
  openGraph: {
    title: "Blog - Maktabah al-Mughis",
    description: "Artikel dan informasi terbaru seputar penerbitan dan literasi.",
  },
  twitter: {
    title: "Blog - Maktabah al-Mughis",
    description: "Artikel dan informasi terbaru seputar penerbitan dan literasi.",
  },
  alternates: { canonical: "/blog" },
}

const PER_PAGE = 6

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1)
  const skip = (currentPage - 1) * PER_PAGE

  let articles: Array<{ id: number; title: string; slug: string; content: string; featuredImage: string; createdAt: Date; updatedAt: Date }> = []
  let total = 0

  try {
    const result = await Promise.all([
      prisma.article.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: PER_PAGE,
      }),
      prisma.article.count(),
    ])
    articles = result[0] as typeof articles
    total = result[1]
  } catch {
    // Database tidak tersedia
  }

  const totalPages = Math.ceil(total / PER_PAGE)
  const featured = articles.length > 0 ? articles[0] : null
  const latest = currentPage === 1 ? articles.slice(1) : articles

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Blog" }]} />

        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Blog</h1>

        {featured && currentPage === 1 && (
          <Link
            href={`/blog/${featured.slug}`}
            className="block bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-8 mb-10 text-white hover:shadow-xl transition-shadow"
          >
            <span className="inline-block text-xs font-medium uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-3">
              Artikel Unggulan
            </span>
            <h2 className="text-2xl font-bold mb-2">{featured.title}</h2>
            <p className="text-zinc-300 text-sm mb-4">
              {new Date(featured.createdAt).toLocaleDateString("id-ID", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
            <p className="text-zinc-400 line-clamp-2">
              {featured.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
            </p>
          </Link>
        )}

        {articles.length === 0 ? (
          <EmptyState
            title="Belum ada artikel"
            description="Kembali lagi nanti untuk membaca artikel-artikel terbaru dari Maktabah al-Mughis."
          />
        ) : (
          <>
            <div className="space-y-6">
              {latest.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="block bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-md transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-zinc-900 mb-2">{a.title}</h2>
                  <p className="text-sm text-zinc-500 mb-3">
                    {new Date(a.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                  <p className="text-zinc-600 line-clamp-3">
                    {a.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                  </p>
                </Link>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
              className="mt-10"
            />
          </>
        )}
      </div>
    </div>
  )
}

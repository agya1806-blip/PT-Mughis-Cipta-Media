import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { EmptyState, Pagination } from "@/components/ui"

export const metadata = {
  title: "Pencarian",
  description: "Cari buku, artikel, dan konten di PT Mughis Cipta Media.",
  openGraph: {
    title: "Pencarian - PT Mughis Cipta Media",
    description: "Cari buku dan konten di PT Mughis Cipta Media.",
  },
  twitter: {
    title: "Pencarian - PT Mughis Cipta Media",
    description: "Cari buku dan konten di PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/search" },
}

const PER_PAGE = 10

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const query = (params.q || "").trim()
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1)
  const skip = (currentPage - 1) * PER_PAGE

  let results: Array<{ type: string; title: string; description: string; href: string }> = []
  let total = 0

  if (query) {
    try {
      const bookWhere = {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
          { synopsis: { contains: query } },
        ],
      }
      const articleWhere = {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
        ],
      }

      const [bookRows, articleRows, bookCount, articleCount] = await Promise.all([
        prisma.book.findMany({ where: bookWhere, orderBy: { createdAt: "desc" } }),
        prisma.article.findMany({ where: articleWhere, select: { id: true, title: true, slug: true, createdAt: true }, orderBy: { createdAt: "desc" } }),
        prisma.book.count({ where: bookWhere }),
        prisma.article.count({ where: articleWhere }),
      ])

      const bookResults = bookRows.map((b) => ({
        type: "Buku" as const,
        title: b.title,
        description: b.synopsis.substring(0, 120),
        href: `/buku/${b.slug}`,
      }))

      const articleResults = articleRows.map((a) => ({
        type: "Artikel" as const,
        title: a.title,
        description: new Date(a.createdAt).toLocaleDateString("id-ID", {
          year: "numeric", month: "long", day: "numeric",
        }),
        href: `/blog/${a.slug}`,
      }))

      const combined = [...bookResults, ...articleResults]
      total = bookCount + articleCount
      results = combined.slice(skip, skip + PER_PAGE)
    } catch {
      // Database tidak tersedia
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  return (
    <main className="flex-1 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Pencarian" }]} />

        <h1 className="text-3xl font-bold text-green-dark mb-8">Pencarian</h1>

        <form action="/search" method="GET" className="mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Cari buku, artikel, penulis..."
              className="flex-1 rounded-xl border border-gold/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-green text-gold font-medium hover:bg-green-dark transition-colors text-sm"
            >
              Cari
            </button>
          </div>
        </form>

        {query ? (
          <>
            <p className="text-sm text-green/80 mb-6">
              {total > 0
                ? `Menampilkan ${total} hasil untuk "${query}"`
                : `Tidak ditemukan hasil untuk "${query}"`}
            </p>

            {results.length === 0 ? (
              <EmptyState
                title="Tidak ada hasil"
                description="Coba gunakan kata kunci yang berbeda."
              />
            ) : (
              <div className="space-y-4">
                {results.map((r, i) => (
                  <Link
                    key={`${r.href}-${i}`}
                    href={r.href}
                    className="block bg-cream rounded-xl border border-gold/20 p-5 hover:shadow-md transition-shadow"
                  >
                    <span className="inline-block text-xs font-medium text-green-dark bg-gold/10 px-2 py-0.5 rounded-full mb-2">
                      {r.type}
                    </span>
                    <h2 className="font-semibold text-green-dark mb-1">{r.title}</h2>
                    <p className="text-sm text-green/80 line-clamp-2">{r.description}</p>
                  </Link>
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/search"
              searchParams={{ q: query }}
              className="mt-10"
            />
          </>
        ) : (
          <div className="text-center text-green/60 py-12">
            <p>Masukkan kata kunci untuk memulai pencarian.</p>
          </div>
        )}
      </div>
    </main>
  )
}

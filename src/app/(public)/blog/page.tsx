import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { Pagination, EmptyState } from "@/components/ui"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Media Center",
  description: "Artikel, berita, dan informasi terbaru seputar dunia penerbitan, literasi, dan kegiatan PT Mughis Cipta Media.",
  openGraph: {
    title: "Media Center - Maktabah al-Mughis",
    description: "Informasi dan artikel seputar penerbitan dan literasi.",
  },
  twitter: {
    title: "Media Center - Maktabah al-Mughis",
    description: "Informasi dan artikel seputar penerbitan dan literasi.",
  },
  alternates: { canonical: "/blog" },
}

const PER_PAGE = 6

const categories = [
  { label: "Semua", slug: "" },
  { label: "Penerbitan", slug: "penerbitan" },
  { label: "Literasi", slug: "literasi" },
  { label: "Tips Menulis", slug: "tips-menulis" },
  { label: "Berita", slug: "berita" },
  { label: "Event", slug: "event" },
]

function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "")
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

interface Props {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}

export default async function MediaCenterPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1)
  const activeCategory = params.category || ""
  const searchQuery = params.search || ""
  const skip = (currentPage - 1) * PER_PAGE

  let articles: Array<{ id: number; title: string; slug: string; content: string; featuredImage: string; createdAt: Date; updatedAt: Date }> = []
  let total = 0

  try {
    const where: Record<string, unknown> = {}
    if (searchQuery) {
      where.OR = [
        { title: { contains: searchQuery } },
        { content: { contains: searchQuery } },
      ]
    }
    const result = await Promise.all([
      prisma.article.findMany({
        where: Object.keys(where).length > 0 ? where : undefined,
        orderBy: { createdAt: "desc" },
        skip,
        take: PER_PAGE,
      }),
      prisma.article.count({
        where: Object.keys(where).length > 0 ? where : undefined,
      }),
    ])
    articles = result[0] as typeof articles
    total = result[1]
  } catch {
    // Database tidak tersedia
  }

  const totalPages = Math.ceil(total / PER_PAGE)
  const featured = articles.length > 0 && currentPage === 1 && !searchQuery ? articles[0] : null
  const latest = currentPage === 1 && !searchQuery ? articles.slice(1) : articles

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Media Center" }]} />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <span className="text-gold text-[11px] font-medium uppercase tracking-[0.1em]">Media Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900">
              Informasi &{" "}
              <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">
                Wawasan Penerbitan
              </span>
            </h1>
            <p className="mt-2 text-zinc-500 max-w-2xl">
              Artikel, tips, dan berita terbaru seputar dunia penerbitan dan literasi dari PT Mughis Cipta Media.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <form action="/blog" method="GET">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const href = cat.slug ? `/blog?category=${cat.slug}` : "/blog"
              const isActive = cat.slug === activeCategory
              return (
                <Link
                  key={cat.slug || "all"}
                  href={href}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-gold text-white"
                      : "bg-white border border-zinc-200 text-zinc-600 hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="relative block bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl overflow-hidden mb-10 hover:shadow-xl transition-shadow group"
          >
            {featured.featuredImage && (
              <div className="relative w-full h-64 sm:h-80">
                <Image
                  src={featured.featuredImage}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <span className="inline-block text-[10px] font-medium uppercase tracking-wider bg-gold text-white px-3 py-1 rounded-full mb-4">
                Artikel Unggulan
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">{featured.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(featured.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {estimateReadingTime(featured.content)} menit baca
                </span>
              </div>
              <p className="text-zinc-300 line-clamp-2 text-sm">
                {featured.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
              </p>
            </div>
          </Link>
        )}

        {articles.length === 0 ? (
          <EmptyState
            title="Belum ada artikel"
            description="Kembali lagi nanti untuk membaca artikel-artikel terbaru dari PT Mughis Cipta Media."
          />
        ) : (
          <>
            <div className="space-y-6">
              {latest.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col sm:flex-row bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-md transition-all hover:border-gold/20"
                >
                  {a.featuredImage && (
                    <div className="relative w-full sm:w-56 h-48 sm:h-auto shrink-0 bg-zinc-100">
                      <Image
                        src={a.featuredImage}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6 flex flex-col">
                    <h2 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-gold transition-colors">
                      {a.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(a.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {estimateReadingTime(a.content)} menit baca
                      </span>
                    </div>
                    <p className="text-zinc-600 text-sm line-clamp-2 flex-1">
                      {a.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-gold mt-3 group-hover:gap-1.5 transition-all">
                      Baca Selengkapnya
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
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

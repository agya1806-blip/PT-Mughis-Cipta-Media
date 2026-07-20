import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import PageHero from "@/components/PageHero"
import { Pagination, EmptyState } from "@/components/ui"
import { Clock, Calendar, ChevronRight } from "lucide-react"

export const metadata = {
  title: "Media Center",
  description: "Baca artikel dan informasi terbaru seputar dunia penerbitan, literasi, dan kegiatan PT Mughis Cipta Media.",
  openGraph: {
    title: "Media Center - Maktabah al-Mughis",
    description: "Artikel dan informasi terbaru dari PT Mughis Cipta Media.",
  },
  alternates: { canonical: "/blog" },
}

const PER_PAGE = 9

function readingTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  const min = Math.max(1, Math.round(words / 200))
  return `${min} menit baca`
}

function excerpt(content: string, max = 150): string {
  return content.replace(/<[^>]*>/g, "").substring(0, max) + "..."
}

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1)
  const skip = (currentPage - 1) * PER_PAGE

  let articles: Array<{ id: number; title: string; slug: string; content: string; featuredImage: string; createdAt: Date }> = []
  let total = 0

  try {
    const [result, count] = await Promise.all([
      prisma.article.findMany({ orderBy: { createdAt: "desc" }, skip, take: PER_PAGE }),
      prisma.article.count(),
    ])
    articles = result as typeof articles
    total = count
  } catch {}

  const totalPages = Math.ceil(total / PER_PAGE)
  const featured = currentPage === 1 && articles.length > 0 ? articles[0] : null
  const latest = featured ? articles.slice(1) : articles

  return (
    <main className="min-h-screen">
      <PageHero
        title="Media"
        accent="Center"
        description="Artikel, berita, dan informasi terbaru seputar dunia penerbitan dan literasi dari PT Mughis Cipta Media."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Media Center" },
        ]}
        icon="blog"
      />
      <div className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block bg-cream rounded-2xl border border-gold/20 overflow-hidden mb-12 hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {featured.featuredImage && (
                  <div className="relative h-64 md:h-full min-h-[280px] bg-cream">
                    <Image
                      src={featured.featuredImage}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full w-fit mb-4">
                    Artikel Unggulan
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-green-dark mb-3 group-hover:text-gold transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-green/60 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {readingTime(featured.content)}
                    </span>
                  </div>
                  <p className="text-green/80 leading-relaxed line-clamp-3">
                    {excerpt(featured.content, 200)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gold mt-4 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {articles.length === 0 ? (
            <EmptyState
              title="Belum ada artikel"
              description="Kembali lagi nanti untuk membaca artikel-artikel terbaru dari Maktabah al-Mughis."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latest.map((a) => (
                  <Link
                    key={a.id}
                    href={`/blog/${a.slug}`}
                    className="group flex flex-col bg-cream rounded-xl border border-gold/20 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {a.featuredImage ? (
                      <div className="relative h-48 bg-cream">
                        <Image
                          src={a.featuredImage}
                          alt={a.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                        <span className="text-gold/30 text-6xl font-bold">M</span>
                      </div>
                    )}
                    <div className="flex-1 p-5 flex flex-col">
                      <h3 className="text-base font-semibold text-green-dark mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-green/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(a.createdAt).toLocaleDateString("id-ID", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {readingTime(a.content)}
                        </span>
                      </div>
                      <p className="text-sm text-green/80 line-clamp-3 flex-1">
                        {excerpt(a.content)}
                      </p>
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
    </main>
  )
}

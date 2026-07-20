import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { slugifyAuthor } from "@/lib/authors"
import { AuthorBooks } from "@/components/authors"
import Breadcrumb from "@/components/ui/Breadcrumb"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug).replace(/-/g, " ")
  const books = await prisma.book.findMany({
    select: { author: true },
  })
  const authorNames = [...new Set(books.map((b) => b.author.trim()).filter(Boolean))]
  const author = authorNames.find((n) => slugifyAuthor(n) === slug)
  if (!author) return { title: "Penulis Tidak Ditemukan" }
  return {
    title: `${author} | Penulis | Maktabah al-Mughis`,
    description: `Buku-buku karya ${author} yang diterbitkan oleh Maktabah al-Mughis.`,
    openGraph: {
      title: `${author} - Penulis | Maktabah al-Mughis`,
      description: `Buku-buku karya ${author} yang diterbitkan oleh Maktabah al-Mughis.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${author} - Penulis | Maktabah al-Mughis`,
      description: `Buku-buku karya ${author} yang diterbitkan oleh Maktabah al-Mughis.`,
    },
    alternates: { canonical: `/penulis/${slug}` },
  }
}

export default async function PenulisDetailPage({ params }: Props) {
  const { slug } = await params
  const allBooks = await prisma.book.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  })

  const authorNames = [...new Set(allBooks.map((b) => b.author.trim()).filter(Boolean))]
  const authorName = authorNames.find((n) => slugifyAuthor(n) === slug)
  if (!authorName) notFound()

  const authorBooks = allBooks
    .filter((b) => b.author.trim() === authorName)
    .map((b) => ({
      id: String(b.id),
      title: b.title,
      author: b.author,
      translator: b.translator,
      publisher: b.publisher,
      isbn: b.isbn || "",
      page_count: b.pageCount,
      price: Number(b.price),
      category_id: String(b.categoryId),
      category_name: b.category.name,
      cover_image: b.coverImage,
      synopsis: b.synopsis,
      preview_pdf_url: b.previewPdfUrl,
      created_at: b.createdAt.toISOString(),
      stock: b.stock,
      weight: b.weight || 0,
      dimensions: b.dimensions || "",
      language: b.language || "",
      publication_year: b.publicationYear,
    }))

  const totalBooks = authorBooks.length
  const initial = authorName.charAt(0)

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Penulis", href: "/penulis" },
            { label: authorName },
          ]}
        />

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden mb-10">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-gold/10 via-gold/5 to-zinc-100" />
          <div className="px-6 sm:px-8 pb-8 -mt-14 sm:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-6">
              <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gold/10 flex items-center justify-center text-gold-dark font-bold text-3xl shadow-lg shrink-0">
                {initial}
              </div>
              <div className="pt-14 sm:pt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">{authorName}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-xs text-zinc-400">
                    {totalBooks} buku terbitan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthorBooks books={authorBooks} />

        <div className="mt-10">
          <Link
            href="/penulis"
            className="text-sm text-gold hover:text-gold-dark transition-colors"
          >
            &larr; Semua Penulis
          </Link>
        </div>
      </div>
    </div>
  )
}

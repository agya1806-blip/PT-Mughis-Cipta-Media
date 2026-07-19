import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import BookCard from "@/components/BookCard"
import Breadcrumb from "@/components/ui/Breadcrumb"
import { EmptyState } from "@/components/ui"
import type { Book } from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const author = decodeURIComponent(slug)
  return {
    title: `${author} | Penulis | Maktabah al-Mughis`,
    description: `Profil penulis ${author} - Maktabah al-Mughis`,
  }
}

export default async function PenulisDetailPage({ params }: Props) {
  const { slug } = await params
  const author = decodeURIComponent(slug)

  let mapped: Book[] = []

  try {
    const books = await prisma.book.findMany({
      where: { author },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    })

    if (books.length === 0) notFound()

    mapped = books.map((b) => ({
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
      weight: b.weight,
      dimensions: b.dimensions,
      language: b.language,
      publication_year: b.publicationYear,
    }))
  } catch {
    notFound()
  }

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Penulis", href: "/penulis" },
            { label: author },
          ]}
        />

        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark font-bold text-2xl shrink-0">
            {author.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{author}</h1>
            <p className="text-zinc-500">
              {mapped.length} buku terbitan
            </p>
          </div>
        </div>

        {mapped.length === 0 ? (
          <EmptyState title="Belum ada buku" description="Penulis ini belum memiliki buku yang terdaftar." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mapped.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

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

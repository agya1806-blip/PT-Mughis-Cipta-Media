import { prisma } from "@/lib/prisma"
import BookCard from "./BookCard"

export default async function FeaturedBooks() {
  const books = await prisma.book.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  })

  const featured = books.map((b) => ({
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

  return (
    <section className="bg-zinc-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900">
            Buku Unggulan
          </h2>
          <p className="mt-2 text-zinc-500">
            Koleksi terbaik dari Maktabah al-Mughis
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  )
}

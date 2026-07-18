import { notFound } from "next/navigation"
import Link from "next/link"
import { getBookById, getCategories } from "@/lib/books"
import { BookDetailClient } from "./BookDetailClient"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = getBookById(id)
  if (!book) return { title: "Buku Tidak Ditemukan" }
  return {
    title: `${book.title} | Maktabah al-Mughis`,
    description: book.synopsis.substring(0, 160),
  }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = getBookById(id)
  if (!book) notFound()

  const categories = getCategories()
  const currentCategory = categories.find((c) => c.id === book.category_id)

  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-zinc-900 transition-colors">Katalog</Link>
          <span>/</span>
          <span className="text-zinc-900 truncate">{book.title}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            <div className="aspect-[3/4] bg-zinc-100 rounded-xl flex items-center justify-center">
              <div className="flex flex-col items-center text-zinc-400 p-8 text-center">
                <svg className="w-20 h-20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span className="text-sm font-medium">Sampul Buku</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="inline-block text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full mb-3">
                  {currentCategory?.name ?? book.category_name}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">{book.title}</h1>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-500">Penulis</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.author}</p>
                </div>
                {book.translator && (
                  <div>
                    <span className="text-zinc-500">Penerjemah</span>
                    <p className="font-medium text-zinc-800 mt-0.5">{book.translator}</p>
                  </div>
                )}
                <div>
                  <span className="text-zinc-500">Penerbit</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.publisher}</p>
                </div>
                <div>
                  <span className="text-zinc-500">ISBN</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.isbn}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Halaman</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.page_count} hal</p>
                </div>
                <div>
                  <span className="text-zinc-500">Tahun</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.publication_year}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Bahasa</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.language}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Dimensi</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.dimensions}</p>
                </div>
                <div>
                  <span className="text-zinc-500">Berat</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.weight} gr</p>
                </div>
                <div>
                  <span className="text-zinc-500">Stok</span>
                  <p className="font-medium text-zinc-800 mt-0.5">{book.stock} eksemplar</p>
                </div>
              </div>

              <div className="text-3xl font-bold text-amber-800">
                Rp{book.price.toLocaleString("id-ID")}
              </div>

              <div className="flex flex-wrap gap-3">
                <BookDetailClient book={book} />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 p-8">
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">Sinopsis</h2>
            <p className="text-zinc-600 leading-relaxed">{book.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

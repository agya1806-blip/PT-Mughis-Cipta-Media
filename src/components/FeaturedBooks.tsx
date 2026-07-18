import BookCard from "./BookCard"
import { books } from "@/lib/books"

export default function FeaturedBooks() {
  const featured = books.slice(0, 4)

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

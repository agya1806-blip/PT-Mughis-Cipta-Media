import BookCard from "@/components/BookCard"
import { EmptyState } from "@/components/ui"
import type { Book } from "@/lib/data"

interface Props {
  books: Book[]
}

export default function AuthorBooks({ books }: Props) {
  if (books.length === 0) {
    return (
      <EmptyState
        title="Belum ada buku"
        description="Penulis ini belum memiliki buku yang terdaftar."
      />
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-green-dark mb-6">
        Buku Terbitan ({books.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

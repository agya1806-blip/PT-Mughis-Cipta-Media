import Link from "next/link"
import Image from "next/image"
import { BookOpen } from "lucide-react"
import BookBadge from "./BookBadge"

export interface BookData {
  id: string
  title: string
  author: string
  price: number
  cover_image?: string | null
  synopsis?: string | null
  category_name?: string | null
  publication_year?: number | null
  badge?: "best-seller" | "new" | "featured" | null
}

interface Props {
  book: BookData
  className?: string
  href?: string
}

export default function BookCard({ book, className = "", href }: Props) {
  const linkHref = href || `/buku/${book.id}`

  return (
    <div
      className={`group relative bg-cream rounded-xl border border-gold/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40 ${className}`}
    >
      <Link href={linkHref} className="block">
        <div className="relative aspect-[3/4] bg-cream overflow-hidden">
          {book.cover_image ? (
            <Image
              src={book.cover_image}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 p-6 text-center">
              <BookOpen className="w-10 h-10 mb-2" />
              <span className="text-xs font-medium line-clamp-2">{book.title}</span>
            </div>
          )}

          {book.badge && (
            <div className="absolute top-3 left-3 z-10">
              <BookBadge variant={book.badge} />
            </div>
          )}

          {book.category_name && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-cream/70 backdrop-blur-md text-green-dark/70 border border-gold/20">
                {book.category_name}
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="font-semibold text-green-dark leading-snug line-clamp-2 text-sm sm:text-base mb-1">
            {book.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 line-clamp-1 mb-2">
            {book.author}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {book.publication_year && (
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {book.publication_year}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-gold inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-1.5">
              Lihat Detail
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

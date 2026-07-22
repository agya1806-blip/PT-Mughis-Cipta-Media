"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Book } from "@/lib/data"
import ShareButton from "./ShareButton"

export default function BookCard({ book }: { book: Book }) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={`/buku/${book.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="relative aspect-[3/4] bg-cream flex items-center justify-center overflow-hidden">
        {book.cover_image && !imgError ? (
          <Image
            src={book.cover_image}
            alt={`Sampul ${book.title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-green/60 p-6 text-center">
            <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-xs font-medium">{book.title.substring(0, 30)}...</span>
          </div>
        )}
        {book.category_name && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium bg-cream/70 backdrop-blur-md text-green-dark/70 border border-gold/20">
              {book.category_name}
            </span>
          </div>
        )}

        {/* Share button - always visible on mobile, appears on hover on desktop */}
        <div 
          className="absolute top-3 left-3 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <ShareButton
            url={`/buku/${book.slug}`}
            title={book.title}
            description={book.synopsis}
            image={book.cover_image || undefined}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold text-green-dark leading-snug line-clamp-2 text-sm sm:text-base mb-1">
          {book.title}
        </h3>
        <p className="text-xs sm:text-sm text-green/80 line-clamp-1 mb-2">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          {book.category_name && (
            <span className="inline-flex items-center text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              {book.category_name}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

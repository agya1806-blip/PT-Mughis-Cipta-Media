"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import BookBadge from "./BookBadge"

export interface BookData {
  id: string
  slug: string
  title: string
  author: string
  price: number
  cover_image?: string | null
  back_cover_image?: string | null
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
  const linkHref = href || `/buku/${book.slug}`
  const images = [book.cover_image, book.back_cover_image].filter((src): src is string => Boolean(src))
  const [active, setActive] = useState(0)
  const touchX = useRef<number | null>(null)
  const hasSlide = images.length > 1

  const goTo = (i: number) => {
    if (images.length < 2) return
    setActive((i + images.length) % images.length)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || images.length < 2) return
    const delta = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(delta) > 40) goTo(active + (delta < 0 ? 1 : -1))
    touchX.current = null
  }

  return (
    <div
      className={`group relative bg-cream rounded-xl border border-gold/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gold/40 ${className}`}
    >
      <Link href={linkHref} className="block">
        <div
          className="relative aspect-[3/4] bg-cream overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {images.length > 0 ? (
            images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-contain bg-cream p-3 transition-transform duration-300 group-hover:scale-[1.02] ${i === active ? "" : "hidden"}`}
              />
            ))
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-green-dark/80 p-6 text-center">
              <BookOpen className="w-10 h-10 mb-2" />
              <span className="text-xs font-medium line-clamp-2">{book.title}</span>
            </div>
          )}

          {hasSlide && (
            <>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(active - 1) }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-cream/90 backdrop-blur-md border border-gold/20 flex items-center justify-center text-green-dark shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Cover sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(active + 1) }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-cream/90 backdrop-blur-md border border-gold/20 flex items-center justify-center text-green-dark shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Cover berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 inset-x-0 z-10 flex justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActive(i) }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-gold" : "bg-gold/40"}`}
                    aria-label={`Cover ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {book.badge && (
            <div className="absolute top-3 left-3 z-10">
              <BookBadge variant={book.badge} />
            </div>
          )}

          {book.category_name && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-cream/90 backdrop-blur-md text-green-dark border border-gold/20">
                {book.category_name}
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="font-semibold text-green-dark leading-snug line-clamp-2 text-sm sm:text-base mb-1">
            {book.title}
          </h3>

          <p className="text-xs sm:text-sm text-green-dark/80 line-clamp-1 mb-2">
            {book.author}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {book.publication_year && (
                <span className="text-[11px] text-green-dark/80">
                  {book.publication_year}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-green inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-1.5">
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
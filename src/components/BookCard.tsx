"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Book } from "@/lib/data"
import { useCart } from "./CartProvider"

export default function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart()
  const [imgError, setImgError] = useState(false)

  function handleAddToCart() {
    addItem({
      bookId: book.id,
      title: book.title,
      price: book.price,
      quantity: 1,
      weight: book.weight,
      coverImage: book.cover_image,
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-[3/4] bg-zinc-100 flex items-center justify-center overflow-hidden">
        {book.cover_image && !imgError ? (
          <Image
            src={book.cover_image}
            alt={`Sampul ${book.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-400 p-4 text-center">
            <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span className="text-xs font-medium">{book.title.substring(0, 30)}...</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full self-start mb-2">
          {book.category_name}
        </span>
        <h3 className="font-semibold text-zinc-900 leading-snug line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-1 mb-2">{book.author}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-amber-800">
            Rp{book.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/buku/${book.id}`}
            className="flex-1 text-center text-sm font-medium text-zinc-700 border border-zinc-300 rounded-lg py-2 transition-colors hover:bg-zinc-50"
          >
            Detail
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 text-sm font-medium text-white bg-emerald-600 rounded-lg py-2 transition-colors hover:bg-emerald-700"
          >
            + Keranjang
          </button>
        </div>
        <div className="mt-2">
          <button
            onClick={() => {
              const event = new CustomEvent("open-preview", { detail: { book } })
              window.dispatchEvent(event)
            }}
            className="w-full text-xs text-center text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Buka Preview
          </button>
        </div>
      </div>
    </div>
  )
}

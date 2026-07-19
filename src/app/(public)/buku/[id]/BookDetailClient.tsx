"use client"

import Link from "next/link"
import type { Book } from "@/lib/data"

export function BookDetailClient({ book }: { book: Book }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => {
          const event = new CustomEvent("open-preview", { detail: { book } })
          window.dispatchEvent(event)
        }}
        className="px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors shadow-sm"
      >
        Buka Preview
      </button>
      <Link
        href={`/kontak?subject=${encodeURIComponent(`Informasi buku: ${book.title}`)}`}
        className="inline-flex items-center px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors"
      >
        Hubungi Kami
      </Link>
    </div>
  )
}

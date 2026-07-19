"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import type { Book } from "@/lib/data"

export function BookDetailClient({ book }: { book: Book }) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Link
        href={`/kontak?subject=${encodeURIComponent(`Konsultasi penerbitan: ${book.title}`)}`}
        className="group inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-all shadow-sm"
      >
        <MessageCircle className="w-4 h-4" />
        Konsultasikan Penerbitan Buku Anda
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
      {book.preview_pdf_url && (
        <button
          onClick={() => {
            const event = new CustomEvent("open-preview", { detail: { book } })
            window.dispatchEvent(event)
          }}
          className="px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors"
        >
          Baca Preview
        </button>
      )}
    </div>
  )
}

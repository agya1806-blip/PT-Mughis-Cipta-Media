"use client"

import Link from "next/link"

export function BookDetailClient({ book }: { book: { title: string; preview_pdf_url?: string | null } }) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Link
        href={`/layanan-penerbitan`}
        className="inline-flex items-center px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors shadow-sm"
      >
        Konsultasikan Penerbitan Buku Anda
      </Link>
      <Link
        href={`/kontak?subject=${encodeURIComponent(`Informasi buku: ${book.title}`)}`}
        className="inline-flex items-center px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors"
      >
        Hubungi Kami
      </Link>
    </div>
  )
}

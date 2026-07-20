"use client"

import Link from "next/link"

export function BookDetailClient({ book }: { book: { title: string; preview_pdf_url?: string | null } }) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Link
        href={`/layanan-penerbitan`}
        className="inline-flex items-center px-6 py-3 bg-green text-gold font-medium rounded-xl hover:bg-green-dark transition-colors shadow-sm"
      >
        Konsultasikan Penerbitan Buku Anda
      </Link>
      <Link
        href={`/kontak?subject=${encodeURIComponent(`Informasi buku: ${book.title}`)}`}
        className="inline-flex items-center px-6 py-3 border border-gold/30 text-green-dark font-medium rounded-xl hover:bg-cream transition-colors"
      >
        Hubungi Kami
      </Link>
    </div>
  )
}

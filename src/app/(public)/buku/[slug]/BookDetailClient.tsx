"use client"

import { useState } from "react"
import Link from "next/link"
import { Share2, LinkIcon, Check, MessageCircle, ShoppingCart } from "lucide-react"

interface BookData {
  title: string
  slug: string
  preview_pdf_url?: string | null
  whatsapp?: string
  price: number
  stock: number
}

export function BookDetailClient({ book }: { book: BookData }) {
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== "undefined"
    ? new URL(`/buku/${book.slug}`, window.location.origin).toString()
    : `/buku/${book.slug}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      prompt("Salin link ini:", fullUrl)
    }
  }

  const waNumber = book.whatsapp?.replace(/[^0-9]/g, "").replace(/^0/, "62")
  const waUrl = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan "${book.title}". Apakah masih tersedia?`)}`
    : null

  const isForSale = book.price > 0 && book.stock > 0

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: book.title, url: fullUrl }).catch(() => {})
          } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(`${book.title}\n${fullUrl}`)}`, "_blank")
          }
        }}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-gold/30 text-green-dark text-sm font-medium hover:bg-gold/5 transition-all"
      >
        <Share2 className="w-4 h-4" />
        Bagikan
      </button>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-xl border border-gold/30 text-green-dark text-sm font-medium hover:bg-gold/5 transition-all"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-gold" />
            <span className="text-gold">Tersalin</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4" />
            Salin Link
          </>
        )}
      </button>

      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-green text-gold text-sm font-semibold hover:bg-green-dark shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          Hubungi Admin
        </a>
      )}

      {isForSale && waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-green text-gold text-sm font-semibold hover:bg-green-dark shadow-sm transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          Beli Buku
        </a>
      )}
    </div>
  )
}

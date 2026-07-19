"use client"

import type { Book } from "@/lib/data"

export function BookDetailClient({ book }: { book: Book }) {
  return (
    <>
      <button
        onClick={() => {
          const event = new CustomEvent("open-preview", { detail: { book } })
          window.dispatchEvent(event)
        }}
        className="px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors shadow-sm"
      >
        Buka Preview
      </button>
      <button className="px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 transition-colors">
        Hubungi Kami
      </button>
    </>
  )
}

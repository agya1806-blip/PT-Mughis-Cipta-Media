"use client"

import { useEffect, useRef, useState } from "react"
import type { Book } from "@/lib/data"

export function PreviewModal() {
  const [book, setBook] = useState<Book | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as { book: Book }
      setBook(detail.book)
      setIsOpen(true)
      document.body.style.overflow = "hidden"
    }

    window.addEventListener("open-preview", handler)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("open-preview", handler)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
    setBook(null)
    document.body.style.overflow = ""
  }

  const handleIframeLoad = () => {
    try {
      const iframe = iframeRef.current
      if (iframe?.contentDocument) {
        const style = iframe.contentDocument.createElement("style")
        style.textContent = `
          * { user-select: none !important; -webkit-user-select: none !important; }
          @media print { body { display: none !important; } }
        `
        iframe.contentDocument.head.appendChild(style)
      }
    } catch {}
  }

  if (!isOpen || !book) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-zinc-900 truncate pr-4">{book.title}</h2>
            <p className="text-sm text-zinc-500 truncate">{book.author}</p>
          </div>
          <button
            onClick={closeModal}
            className="shrink-0 p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Tutup preview"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-hidden bg-zinc-900 relative">
          <iframe
            ref={iframeRef}
            src={`/api/preview?url=${encodeURIComponent(book.preview_pdf_url)}`}
            className="w-full h-full min-h-[70vh]"
            title={`Preview ${book.title}`}
            onLoad={handleIframeLoad}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pointer-events-none">
            <p className="text-white/80 text-xs text-center">
              Hak Cipta Dilindungi &copy; {new Date().getFullYear()} Maktabah al-Mughis
            </p>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
          <span>{book.page_count} halaman</span>
          <span>ISBN: {book.isbn}</span>
        </div>
      </div>
    </div>
  )
}

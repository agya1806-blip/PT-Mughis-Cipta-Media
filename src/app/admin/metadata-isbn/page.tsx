"use client"

import { useState, useEffect, useCallback } from "react"

interface Book {
  id: number
  title: string
  slug: string
  author: string
  translator: string | null
  publisher: string
  publisherName: string | null
  editor: string | null
  layoutBy: string | null
  subject: string | null
  cityOfPublication: string | null
  edition: string | null
  keywords: string | null
  pageCount: number
  publicationYear: number
  language: string | null
  dimensions: string | null
  isbn?: string
  category?: { name: string }
  publicationType?: { name: string } | null
}

export default function MetadataIsbnPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [selected, setSelected] = useState<Book | null>(null)
  const [search, setSearch] = useState("")
  const [copied, setCopied] = useState(false)

  const loadBooks = useCallback(async () => {
    try {
      const params = new URLSearchParams({ limit: "100" })
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/books?${params}`)
      const data = await res.json()
      if (data?.books) setBooks(data.books)
    } catch {}
  }, [search])

  useEffect(() => { loadBooks() }, [loadBooks])

  const buildMetadata = (b: Book) => {
    const pubName = b.publisherName || b.publisher || "PT Mughis Cipta Media"
    const typeName = b.publicationType?.name || "Buku"

    const lines: string[] = []
    lines.push(`Judul: ${b.title}`)
    lines.push(`Penulis: ${b.author}`)
    if (b.translator) lines.push(`Penerjemah: ${b.translator}`)
    lines.push(`Penerbit: ${pubName}`)
    if (b.editor) lines.push(`Editor: ${b.editor}`)
    if (b.layoutBy) lines.push(`Layout: ${b.layoutBy}`)
    lines.push(`Jenis Terbitan: ${typeName}`)
    if (b.category?.name) lines.push(`Kategori: ${b.category.name}`)
    if (b.subject) lines.push(`Subjek: ${b.subject}`)
    if (b.cityOfPublication) lines.push(`Kota Terbit: ${b.cityOfPublication}`)
    if (b.publicationYear) lines.push(`Tahun Terbit: ${b.publicationYear}`)
    if (b.edition) lines.push(`Edisi: ${b.edition}`)
    if (b.pageCount) lines.push(`Jumlah Halaman: ${b.pageCount}`)
    if (b.language) lines.push(`Bahasa: ${b.language}`)
    if (b.dimensions) lines.push(`Ukuran: ${b.dimensions}`)
    if (b.keywords) lines.push(`Kata Kunci: ${b.keywords}`)
    return lines.join("\n")
  }

  const copyMetadata = async () => {
    if (!selected) return
    const text = buildMetadata(selected)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const inputClass = "w-full rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green-dark/80 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Metadata ISBN</h1>
        <p className="text-sm text-green-dark/60">Panel bantuan pengajuan ISBN</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          className={inputClass + " max-w-sm"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
          <div className="p-3 border-b border-gold/10 bg-gold/5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-green-dark/70">Pilih Terbitan</p>
          </div>
          <div className="max-h-[60vh] overflow-y-auto divide-y divide-gold/10">
            {books.length === 0 && (
              <p className="text-center py-8 text-sm text-green-dark/60">Tidak ada data</p>
            )}
            {books.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelected(b)}
                className={`w-full text-left px-4 py-3 transition-colors hover:bg-gold/5 ${
                  selected?.id === b.id ? "bg-gold/10 border-l-2 border-gold" : ""
                }`}
              >
                <p className="text-sm font-medium text-green-dark">{b.title}</p>
                <p className="text-xs text-green-dark/70">{b.author}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-cream rounded-xl border border-gold/20 p-6">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-green-dark">{selected.title}</h2>
                <button
                  onClick={copyMetadata}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-gold text-green-dark text-sm font-medium hover:bg-gold-dark transition-colors"
                >
                  {copied ? (
                    <>✓ Tersalin</>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                      </svg>
                      Salin Metadata
                    </>
                  )}
                </button>
              </div>

              <pre className="text-sm text-green-dark/90 bg-gold/5 rounded-lg p-4 whitespace-pre-wrap font-sans leading-relaxed border border-gold/10">
                {buildMetadata(selected)}
              </pre>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg className="w-12 h-12 text-green-dark/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p className="text-sm text-green-dark/70">Pilih terbitan dari daftar</p>
              <p className="text-xs text-green-dark/50 mt-1">untuk melihat metadata ISBN</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

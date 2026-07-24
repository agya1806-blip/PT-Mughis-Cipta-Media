"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Book {
  id: number
  title: string
  author: string
  price: string
  stock: number
  category: { name: string }
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (search) params.set("search", search)
    fetch(`/api/admin/books?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.books) setBooks(data.books)
        if (data?.total !== undefined) setTotal(data.total)
      })
      .catch(() => {})
  }, [page, search])

  async function handleDelete(id: number) {
    if (!confirm("Hapus buku ini?")) return
    try {
      const res = await fetch(`/api/admin/books/${id}`, { method: "DELETE" })
      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b.id !== id))
        setTotal((t) => t - 1)
      }
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Manajemen Buku</h1>
        <Link
          href="/admin/books/create"
          className="h-10 px-4 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-dark flex items-center"
        >
          Tambah Buku
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari buku..."
          className="w-full max-w-sm rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gold/5 border-b border-gold/20">
              <th className="text-left px-4 py-3 font-medium text-green/70">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-green/70">Penulis</th>
              <th className="text-right px-4 py-3 font-medium text-green/70">Harga</th>
              <th className="text-right px-4 py-3 font-medium text-green/70">Stok</th>
              <th className="text-center px-4 py-3 font-medium text-green/70">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gold/10 hover:bg-gold/5">
                <td className="px-4 py-3 text-green-dark">{book.title}</td>
                <td className="px-4 py-3 text-green/70">{book.author}</td>
                <td className="px-4 py-3 text-right text-green-dark">
                  Rp {Number(book.price).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      book.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link
                    href={`/admin/books/${book.id}`}
                    className="text-green-dark hover:underline text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-green/70">
        <span>Total: {total} buku</span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border border-gold/20 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border border-gold/20"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

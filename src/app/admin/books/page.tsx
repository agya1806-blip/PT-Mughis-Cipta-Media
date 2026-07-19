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
        setBooks(data.books)
        setTotal(data.total)
      })
      .catch(() => {})
  }, [page, search])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Manajemen Buku</h1>
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
          className="w-full max-w-sm rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Penulis</th>
              <th className="text-right px-4 py-3 font-medium text-zinc-600">Harga</th>
              <th className="text-right px-4 py-3 font-medium text-zinc-600">Stok</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800">{book.title}</td>
                <td className="px-4 py-3 text-zinc-500">{book.author}</td>
                <td className="px-4 py-3 text-right text-zinc-800">
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
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/admin/books/${book.id}`}
                    className="text-gold hover:underline text-xs"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-zinc-500">
        <span>Total: {total} buku</span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border border-zinc-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border border-zinc-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

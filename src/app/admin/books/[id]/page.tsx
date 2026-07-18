"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function EditBook() {
  const router = useRouter()
  const params = useParams()
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [form, setForm] = useState({
    title: "",
    author: "",
    translator: "",
    publisher: "",
    categoryId: "",
    synopsis: "",
    price: "",
    resellerPrice: "",
    stock: "0",
    coverImage: "",
    isbn: "",
    pageCount: "0",
    previewPdfUrl: "",
    weight: "250",
    dimensions: "",
    language: "",
    publicationYear: "",
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch(`/api/admin/books/${params.id}`).then((r) => r.json()),
    ]).then(([cats, book]) => {
      setCategories(cats)
      setForm({
        title: book.title,
        author: book.author,
        translator: book.translator || "",
        publisher: book.publisher || "",
        categoryId: String(book.categoryId),
        synopsis: book.synopsis,
        price: String(book.price),
        resellerPrice: book.resellerPrice ? String(book.resellerPrice) : "",
        stock: String(book.stock),
        coverImage: book.coverImage,
        isbn: book.isbn || "",
        pageCount: String(book.pageCount),
        previewPdfUrl: book.previewPdfUrl || "",
        weight: String(book.weight || 250),
        dimensions: book.dimensions || "",
        language: book.language || "",
        publicationYear: String(book.publicationYear || ""),
      })
    })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/books/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to update")
      router.push("/admin/books")
    } catch {
      alert("Gagal menyimpan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Edit Buku</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Penulis</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Penerjemah</label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.translator}
              onChange={(e) => setForm({ ...form, translator: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Penerbit</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.publisher}
              onChange={(e) => setForm({ ...form, publisher: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Kategori</label>
            <select
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((c: { id: number; name: string }) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Harga Retail</label>
            <input
              type="number"
              required
              min={0}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Harga Reseller</label>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.resellerPrice}
              onChange={(e) => setForm({ ...form, resellerPrice: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Stok</label>
            <input
              type="number"
              required
              min={0}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Berat (gram)</label>
            <input
              type="number"
              required
              min={0}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">ISBN</label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.isbn}
              onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Jumlah Halaman</label>
            <input
              type="number"
              min={0}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.pageCount}
              onChange={(e) => setForm({ ...form, pageCount: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Dimensi</label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.dimensions}
              onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Bahasa</label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Tahun Terbit</label>
            <input
              type="number"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.publicationYear}
              onChange={(e) => setForm({ ...form, publicationYear: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-600 mb-1">URL Cover</label>
            <input
              type="url"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-zinc-600 mb-1">Sinopsis</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={form.synopsis}
              onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="h-11 px-6 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800 disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-11 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

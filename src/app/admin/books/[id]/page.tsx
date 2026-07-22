"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function EditBook() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [form, setForm] = useState({
    title: "", author: "", translator: "", publisher: "", categoryId: "",
    synopsis: "", price: "", resellerPrice: "", stock: "0",
    coverImage: "", isbn: "", pageCount: "0", previewPdfUrl: "",
    weight: "250", dimensions: "", language: "", publicationYear: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch(`/api/admin/books/${params.id}`).then((r) => r.json()),
    ]).then(([cats, book]) => {
      setCategories(Array.isArray(cats) ? cats : cats.categories || [])
      setForm({
        title: book.title, author: book.author, translator: book.translator || "",
        publisher: book.publisher || "", categoryId: String(book.categoryId),
        synopsis: book.synopsis, price: String(book.price),
        resellerPrice: book.resellerPrice ? String(book.resellerPrice) : "",
        stock: String(book.stock), coverImage: book.coverImage || "",
        isbn: book.isbn || "", pageCount: String(book.pageCount),
        previewPdfUrl: book.previewPdfUrl || "",
        weight: String(book.weight || 250), dimensions: book.dimensions || "",
        language: book.language || "", publicationYear: String(book.publicationYear || ""),
      })
    }).catch(() => toast("error", "Gagal memuat data buku"))
      .finally(() => setLoading(false))
  }, [params.id, toast])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/books/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Gagal menyimpan")
      toast("success", "Buku berhasil diperbarui!")
      router.push("/admin/books")
    } catch {
      toast("error", "Gagal menyimpan")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-zinc-500">Memuat...</p>
    </div>
  )

  const inputClass = "w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Edit Buku</h1>
        <button type="button" onClick={() => router.back()} className="text-sm text-green/70 hover:text-green-dark">Batal</button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Buku" description="Judul, penulis, penerbit, dan kategori">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-600 mb-1">Judul Buku</label>
              <input type="text" required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Penulis</label>
              <input type="text" required className={inputClass} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Penerjemah</label>
              <input type="text" className={inputClass} value={form.translator} onChange={(e) => setForm({ ...form, translator: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Penerbit</label>
              <input type="text" required className={inputClass} value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Kategori</label>
              <select required className={inputClass} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Pilih Kategori</option>
                {categories.map((c: { id: number; name: string }) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">ISBN</label>
              <input type="text" className={inputClass} value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Harga & Stok" description="Harga jual, reseller, dan stok buku">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Harga Retail</label>
              <input type="number" required min={0} className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Harga Reseller</label>
              <input type="number" min={0} className={inputClass} value={form.resellerPrice} onChange={(e) => setForm({ ...form, resellerPrice: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Stok</label>
              <input type="number" required min={0} className={inputClass} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Detail Fisik" description="Informasi fisik buku">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Jumlah Halaman</label>
              <input type="number" min={0} className={inputClass} value={form.pageCount} onChange={(e) => setForm({ ...form, pageCount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Berat (gram)</label>
              <input type="number" required min={0} className={inputClass} value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Dimensi</label>
              <input type="text" className={inputClass} value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Bahasa</label>
              <input type="text" className={inputClass} value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-600 mb-1">Tahun Terbit</label>
              <input type="number" className={inputClass} value={form.publicationYear} onChange={(e) => setForm({ ...form, publicationYear: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Cover & Media" description="Upload cover buku dan file pendukung">
          <ImageUpload label="Cover Buku" value={form.coverImage} onChange={(val) => setForm({ ...form, coverImage: val })} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-600 mb-1">URL Preview PDF</label>
            <input type="text" className={inputClass} value={form.previewPdfUrl} onChange={(e) => setForm({ ...form, previewPdfUrl: e.target.value })} placeholder="https://..." />
          </div>
        </FormSection>

        <FormSection title="Sinopsis" description="Deskripsi singkat buku">
          <textarea rows={4} className={inputClass} value={form.synopsis} onChange={(e) => setForm({ ...form, synopsis: e.target.value })} />
        </FormSection>

        <div className="flex gap-3 pt-2 pb-8">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

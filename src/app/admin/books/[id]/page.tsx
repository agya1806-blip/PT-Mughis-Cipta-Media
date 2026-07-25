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
  const [pubTypes, setPubTypes] = useState<{ id: number; name: string }[]>([])
  const [form, setForm] = useState({
    title: "", slug: "", author: "", translator: "", publisher: "", categoryId: "",
    publicationTypeId: "",
    editor: "", layoutBy: "", subject: "", cityOfPublication: "",
    edition: "", keywords: "", publisherName: "",
    isbn: "", subtitle: "", penName: "", bindingType: "", publicationStatus: "available",
    synopsis: "", price: "", resellerPrice: "", stock: "0",
    coverImage: "", pageCount: "0", previewPdfUrl: "",
    weight: "250", dimensions: "", language: "", publicationYear: "",
    whatsapp: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  function autoSlug(title: string) {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").substring(0, 100)
    setForm((prev) => ({ ...prev, slug: prev.slug || s }))
  }

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/publication-types").then((r) => r.json()),
      fetch(`/api/admin/books/${params.id}`).then((r) => r.json()),
    ]).then(([cats, types, book]) => {
      setCategories(Array.isArray(cats) ? cats : cats.categories || [])
      setPubTypes(Array.isArray(types) ? types : [])
      setForm({
        title: book.title, slug: book.slug, author: book.author, translator: book.translator || "",
        publisher: book.publisher || "", categoryId: String(book.categoryId),
        publicationTypeId: book.publicationTypeId ? String(book.publicationTypeId) : "",
        editor: book.editor || "", layoutBy: book.layoutBy || "",
        subject: book.subject || "", cityOfPublication: book.cityOfPublication || "",
        edition: book.edition || "", keywords: book.keywords || "",
        publisherName: book.publisherName || "",
        isbn: book.isbn || "", subtitle: book.subtitle || "",
        penName: book.penName || "", bindingType: book.bindingType || "",
        publicationStatus: book.publicationStatus || "available",
        synopsis: book.synopsis, price: String(book.price),
        resellerPrice: book.resellerPrice ? String(book.resellerPrice) : "",
        stock: String(book.stock), coverImage: book.coverImage || "",
        pageCount: String(book.pageCount),
        previewPdfUrl: book.previewPdfUrl || "",
        weight: String(book.weight || 250), dimensions: book.dimensions || "",
        language: book.language || "", publicationYear: String(book.publicationYear || ""),
        whatsapp: book.whatsapp || "",
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
        body: JSON.stringify({ ...form, price: form.price || "0" }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Gagal menyimpan")
      }
      toast("success", "Buku berhasil diperbarui!")
      router.push("/admin/books")
    } catch (e) {
      toast("error", e instanceof Error ? e.message : "Gagal menyimpan")
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
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Judul Buku</label>
              <input type="text" required className={inputClass} value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); autoSlug(e.target.value) }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Slug</label>
              <input type="text" required className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="judul-buku" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Penulis</label>
              <input type="text" required className={inputClass} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Penerjemah</label>
              <input type="text" className={inputClass} value={form.translator} onChange={(e) => setForm({ ...form, translator: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Penerbit</label>
              <input type="text" required className={inputClass} value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Kategori</label>
              <select required className={inputClass} value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Pilih Kategori</option>
                {categories.map((c: { id: number; name: string }) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Jenis Terbitan</label>
              <select className={inputClass} value={form.publicationTypeId} onChange={(e) => setForm({ ...form, publicationTypeId: e.target.value })}>
                <option value="">Pilih Jenis Terbitan</option>
                {pubTypes.map((t: { id: number; name: string }) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">No. WhatsApp</label>
              <input type="text" className={inputClass} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="628521706587" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Harga & Stok" description="Harga jual, reseller, dan stok buku">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Harga Retail</label>
              <input type="number" required min={0} className={inputClass} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Harga Reseller</label>
              <input type="number" min={0} className={inputClass} value={form.resellerPrice} onChange={(e) => setForm({ ...form, resellerPrice: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Stok</label>
              <input type="number" required min={0} className={inputClass} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Detail Fisik" description="Informasi fisik buku">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Jumlah Halaman</label>
              <input type="number" min={0} className={inputClass} value={form.pageCount} onChange={(e) => setForm({ ...form, pageCount: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Berat (gram)</label>
              <input type="number" required min={0} className={inputClass} value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Dimensi</label>
              <input type="text" className={inputClass} value={form.dimensions} onChange={(e) => setForm({ ...form, dimensions: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Bahasa</label>
              <input type="text" className={inputClass} value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Tahun Terbit</label>
              <input type="number" className={inputClass} value={form.publicationYear} onChange={(e) => setForm({ ...form, publicationYear: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Informasi Tambahan" description="Editor, layout, subjek, dan metadata lainnya">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Nama Penerbit</label>
              <input type="text" className={inputClass} value={form.publisherName} onChange={(e) => setForm({ ...form, publisherName: e.target.value })} placeholder="PT Mughis Cipta Media" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">ISBN</label>
              <input type="text" className={inputClass} value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} placeholder="978-xxx-xxx-xxx-x" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Subjudul</label>
              <input type="text" className={inputClass} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Subjudul (jika ada)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Nama Pena</label>
              <input type="text" className={inputClass} value={form.penName} onChange={(e) => setForm({ ...form, penName: e.target.value })} placeholder="Nama pena penulis" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Editor</label>
              <input type="text" className={inputClass} value={form.editor} onChange={(e) => setForm({ ...form, editor: e.target.value })} placeholder="Nama editor" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Layout</label>
              <input type="text" className={inputClass} value={form.layoutBy} onChange={(e) => setForm({ ...form, layoutBy: e.target.value })} placeholder="Nama layout" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Subjek</label>
              <input type="text" className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subjek buku" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Kota Terbit</label>
              <input type="text" className={inputClass} value={form.cityOfPublication} onChange={(e) => setForm({ ...form, cityOfPublication: e.target.value })} placeholder="Kota" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Edisi</label>
              <input type="text" className={inputClass} value={form.edition} onChange={(e) => setForm({ ...form, edition: e.target.value })} placeholder="Contoh: Edisi Pertama" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Jenis Jilid</label>
              <input type="text" className={inputClass} value={form.bindingType} onChange={(e) => setForm({ ...form, bindingType: e.target.value })} placeholder="Softcover/Hardcover" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Status Terbit</label>
              <select className={inputClass} value={form.publicationStatus} onChange={(e) => setForm({ ...form, publicationStatus: e.target.value })}>
                <option value="available">Tersedia</option>
                <option value="coming_soon">Segera Terbit</option>
                <option value="sold_out">Habis</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Kata Kunci</label>
              <input type="text" className={inputClass} value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="Pisahkan dengan koma" />
            </div>
          </div>
        </FormSection>

        <FormSection title="Cover & Media" description="Upload cover buku dan file pendukung">
          <ImageUpload label="Cover Buku" value={form.coverImage} onChange={(val) => setForm({ ...form, coverImage: val })} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-green-dark/80 mb-1">URL Preview PDF</label>
            <input type="text" className={inputClass} value={form.previewPdfUrl} onChange={(e) => setForm({ ...form, previewPdfUrl: e.target.value })} placeholder="https://..." />
          </div>
        </FormSection>

        <FormSection title="Sinopsis" description="Deskripsi singkat buku">
          <textarea rows={4} className={inputClass} value={form.synopsis} onChange={(e) => setForm({ ...form, synopsis: e.target.value })} />
        </FormSection>

        <div className="flex gap-3 pt-2 pb-8">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-green-dark font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-green-dark/80 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

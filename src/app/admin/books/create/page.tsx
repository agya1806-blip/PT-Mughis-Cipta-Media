"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"
import { Sparkles, Bot, RefreshCw } from "lucide-react"

export default function CreateBook() {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [pubTypes, setPubTypes] = useState<{ id: number; name: string }[]>([])
  const [form, setForm] = useState({
    title: "", slug: "", author: "", translator: "", publisher: "", categoryId: "",
    publicationTypeId: "1",
    editor: "", layoutBy: "", subject: "", cityOfPublication: "",
    edition: "", keywords: "", publisherName: "PT Mughis Cipta Media",
    isbn: "", subtitle: "", penName: "", bindingType: "", publicationStatus: "available",
    synopsis: "", price: "", resellerPrice: "", stock: "0",
    coverImage: "", backCoverImage: "", pageCount: "0", previewPdfUrl: "",
    weight: "250", dimensions: "", language: "Indonesia",
    publicationYear: String(new Date().getFullYear()),
    whatsapp: "",
  })
  const [submitting, setSubmitting] = useState(false)

  // AI Copilot State
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiBase64Image, setAiBase64Image] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  function autoSlug(title: string) {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").substring(0, 100)
    setForm((prev) => ({ ...prev, slug: prev.slug || s }))
  }

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/publication-types").then((r) => r.json()),
    ]).then(([cats, types]) => {
      setCategories(Array.isArray(cats) ? cats : cats.categories || [])
      setPubTypes(Array.isArray(types) ? types : [])
    }).catch(() => {})
  }, [])

  async function handleAiBookProcess() {
    if (!aiPrompt.trim() && !aiBase64Image) {
      toast("error", "Harap isi teks sinopsis/catatan atau unggah foto sampul belakang buku")
      return
    }

    setAiLoading(true)
    try {
      const res = await fetch("/api/admin/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: aiPrompt,
          imageBase64: aiBase64Image,
          type: "book"
        })
      })

      const json = await res.json()
      if (json.success && json.data) {
        const generatedTitle = json.data.title || form.title || aiPrompt.split("\n")[0]
        setForm((prev) => ({
          ...prev,
          title: generatedTitle,
          slug: prev.slug || generatedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          subtitle: json.data.subtitle || prev.subtitle,
          author: json.data.author || prev.author,
          publisher: json.data.publisher || prev.publisher || "PT Mughis Cipta Media",
          synopsis: json.data.synopsis || prev.synopsis,
          price: String(json.data.price || prev.price || 75000),
          isbn: json.data.isbn || prev.isbn,
          pageCount: String(json.data.pages || prev.pageCount || 200)
        }))
        toast("success", "Data buku berhasil diekstrak otomatis oleh AI Copilot!")
      } else {
        toast("error", "Gagal meng-extract data buku AI")
      }
    } catch {
      toast("error", "Terjadi kesalahan jaringan saat memanggil AI Copilot")
    } finally {
      setAiLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        categoryId: form.categoryId ? parseInt(form.categoryId) : undefined,
        publicationTypeId: form.publicationTypeId ? parseInt(form.publicationTypeId) : undefined,
        price: form.price ? parseFloat(form.price) : undefined,
        resellerPrice: form.resellerPrice ? parseFloat(form.resellerPrice) : undefined,
        stock: parseInt(form.stock) || 0,
        pageCount: form.pageCount ? parseInt(form.pageCount) : undefined,
        weight: form.weight ? parseInt(form.weight) : undefined,
        publicationYear: parseInt(form.publicationYear) || new Date().getFullYear(),
      }

      const res = await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal menyimpan buku")
      }

      toast("success", "Buku berhasil ditambahkan!")
      router.push("/admin/books")
    } catch (e: unknown) {
      toast("error", e instanceof Error ? e.message : "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-green-dark">Tambah Buku Baru</h1>
          <p className="text-sm text-zinc-500 mt-1">Lengkapi informasi buku yang akan diterbitkan</p>
        </div>
        <button type="button" onClick={() => router.back()} className="text-sm text-green-dark/80 hover:text-green-dark">Batal</button>
      </div>

      {/* 🤖 AI ADMIN COPILOT BOOK EXTRACTOR */}
      <div className="max-w-3xl mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white space-y-3 shadow-xl border-2 border-emerald-500/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">AI Book Copilot (Auto-Fill & Extract Sinopsis)</h3>
              <p className="text-xs text-emerald-200">Tempelkan sinopsis mentah penulis atau unggah foto sampul belakang buku</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Gemini AI Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-emerald-200 font-bold mb-1">Tempel Teks Sinopsis / Catatan Penulis:</label>
            <textarea
              rows={3}
              placeholder="Contoh: Judul Fikih Kontemporer karya Dr. Ahmad, 240 halaman, harga 85rb, ISBN 978-623-..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs font-medium focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-emerald-200 font-bold mb-1">Atau Unggah Foto Sampul Belakang / Naskah:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onloadend = () => setAiBase64Image(reader.result as string)
                reader.readAsDataURL(file)
              }}
              className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white font-bold"
            />
            {aiBase64Image && (
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">✓ Foto sampul buku siap diekstrak AI</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleAiBookProcess}
            disabled={aiLoading}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition active:scale-95"
          >
            {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{aiLoading ? "Mengekstrak Data..." : "🤖 Proses dengan AI Copilot"}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Utama Buku" description="Judul, Penulis, dan Identitas Utama">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Judul Buku *</label>
              <input type="text" required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.title}
                onChange={(e) => { setForm({ ...form, title: e.target.value }); autoSlug(e.target.value); }} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Sub Judul</label>
              <input type="text"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Slug (URL)</label>
              <input type="text" required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Penulis *</label>
              <input type="text" required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Nama Pena</label>
              <input type="text"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.penName}
                onChange={(e) => setForm({ ...form, penName: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Penerbit *</label>
              <input type="text" required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.publisherName}
                onChange={(e) => setForm({ ...form, publisherName: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">ISBN</label>
              <input type="text"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                placeholder="978-623-..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Kategori Buku</label>
              <select
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Jenis Terbitan</label>
              <select
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.publicationTypeId}
                onChange={(e) => setForm({ ...form, publicationTypeId: e.target.value })}
              >
                {pubTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.name}</option>
                ))}
              </select>
            </div>
          </div>
        </FormSection>

        <FormSection title="Harga & Stok" description="Informasi penjualan buku">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Harga (Rp)</label>
              <input type="number"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="85000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Harga Reseller (Rp)</label>
              <input type="number"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.resellerPrice}
                onChange={(e) => setForm({ ...form, resellerPrice: e.target.value })}
                placeholder="70000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Stok</label>
              <input type="number"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
        </FormSection>

        <FormSection title="Sinopsis & Detail" description="Sinopsis buku dan spesifikasi cetak">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Sinopsis Buku</label>
              <textarea rows={4}
                className="w-full rounded-lg border border-zinc-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={form.synopsis}
                onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
                placeholder="Tulis sinopsis ringkas buku atau gunakan AI Copilot di atas..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-green-dark/80 mb-1">Jumlah Halaman</label>
                <input type="number"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.pageCount}
                  onChange={(e) => setForm({ ...form, pageCount: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-dark/80 mb-1">Tahun Terbit</label>
                <input type="number"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.publicationYear}
                  onChange={(e) => setForm({ ...form, publicationYear: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-dark/80 mb-1">Bahasa</label>
                <input type="text"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })} />
              </div>
            </div>
          </div>
        </FormSection>

        <FormSection title="Gambar Sampul" description="Sampul Depan & Belakang">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload label="Sampul Depan" value={form.coverImage} onChange={(val) => setForm({ ...form, coverImage: val })} />
            <ImageUpload label="Sampul Belakang" value={form.backCoverImage} onChange={(val) => setForm({ ...form, backCoverImage: val })} />
          </div>
        </FormSection>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-green-dark font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all">
            {submitting ? "Menyimpan..." : "Simpan Buku"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-green-dark/80 font-medium hover:bg-zinc-50">
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

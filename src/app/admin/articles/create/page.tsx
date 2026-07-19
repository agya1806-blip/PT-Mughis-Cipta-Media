"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"
import AdminEditor from "@/components/admin/AdminEditor"
import DocumentUpload from "@/components/admin/DocumentUpload"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function CreateArticle() {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: "", slug: "", content: "", featuredImage: "", fileUrl: "" })
  const [submitting, setSubmitting] = useState(false)
  const [contentMode, setContentMode] = useState<"html" | "file">("html")

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.content && !form.fileUrl) {
      toast("error", "Harap isi konten atau upload file")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal")
      }
      toast("success", "Artikel berhasil dibuat!")
      router.push("/admin/articles")
    } catch (e: unknown) {
      toast("error", e instanceof Error ? e.message : "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Artikel Baru</h1>
        <button type="button" onClick={() => router.back()} className="text-sm text-zinc-500 hover:text-zinc-700">Batal</button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Artikel" description="Judul dan URL artikel">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Slug (URL)</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </FormSection>

        <FormSection title="Gambar Utama" description="Upload atau masukkan URL gambar">
          <ImageUpload label="" value={form.featuredImage} onChange={(val) => setForm({ ...form, featuredImage: val })} />
        </FormSection>

        <FormSection title="Konten Artikel" description="Tulis langsung atau upload file PDF/DOC">
          <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-0.5 w-fit">
            <button type="button"
              onClick={() => setContentMode("html")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${contentMode === "html" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
              Tulis Manual
            </button>
            <button type="button"
              onClick={() => setContentMode("file")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${contentMode === "file" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
              Upload File
            </button>
          </div>

          {contentMode === "html" ? (
            <AdminEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
              placeholder="Tulis konten artikel di sini..."
            />
          ) : (
            <div className="space-y-3">
              <DocumentUpload
                label="Upload File PDF / Word"
                value={form.fileUrl}
                onChange={(val) => setForm({ ...form, fileUrl: val })}
              />
              {form.fileUrl && (
                <p className="text-xs text-zinc-500">File akan ditampilkan sebagai unduhan di halaman artikel.</p>
              )}
            </div>
          )}
        </FormSection>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all">
            {submitting ? "Menyimpan..." : "Simpan Artikel"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-12 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50">
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

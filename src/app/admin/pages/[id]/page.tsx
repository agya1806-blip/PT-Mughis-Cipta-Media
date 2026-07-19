"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminEditor from "@/components/admin/AdminEditor"
import DocumentUpload from "@/components/admin/DocumentUpload"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: "", slug: "", content: "", fileUrl: "" })
  const [submitting, setSubmitting] = useState(false)
  const [contentMode, setContentMode] = useState<"html" | "file">("html")

  useEffect(() => {
    fetch(`/api/admin/pages/${params.id}`)
      .then((r) => r.json())
      .then((p) => {
        setForm({ title: p.title, slug: p.slug, content: p.content || "", fileUrl: p.fileUrl || "" })
        if (p.fileUrl && !p.content) setContentMode("file")
      })
      .catch(() => toast("error", "Gagal memuat halaman"))
  }, [params.id, toast])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.content && !form.fileUrl) {
      toast("error", "Harap isi konten atau upload file")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/pages/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      toast("success", "Halaman berhasil diperbarui!")
      router.push("/admin/pages")
    } catch {
      toast("error", "Gagal menyimpan")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Edit Halaman</h1>
        <button type="button" onClick={() => router.back()} className="text-sm text-zinc-500 hover:text-zinc-700">Batal</button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Halaman" description="Judul dan URL halaman">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Slug</label>
            <input type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </FormSection>

        <FormSection title="Konten Halaman">
          <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-0.5 w-fit">
            <button type="button" onClick={() => setContentMode("html")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${contentMode === "html" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
              Tulis Manual
            </button>
            <button type="button" onClick={() => setContentMode("file")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${contentMode === "file" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>
              Upload File
            </button>
          </div>
          {contentMode === "html" ? (
            <AdminEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} />
          ) : (
            <DocumentUpload label="Upload File PDF / Word" value={form.fileUrl} onChange={(val) => setForm({ ...form, fileUrl: val })} />
          )}
        </FormSection>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all">
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
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

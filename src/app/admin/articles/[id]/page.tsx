"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"
import AdminEditor from "@/components/admin/AdminEditor"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function EditArticle() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: "", slug: "", content: "", featuredImage: "" })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/articles/${params.id}`)
      .then((r) => r.json())
      .then((data) => setForm({ title: data.title, slug: data.slug, content: data.content, featuredImage: data.featuredImage || "" }))
      .catch(() => toast("error", "Gagal memuat artikel"))
      .finally(() => setLoading(false))
  }, [params.id, toast])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/articles/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal")
      }
      toast("success", "Artikel berhasil diperbarui!")
      router.push("/admin/articles")
    } catch (e: unknown) {
      toast("error", e instanceof Error ? e.message : "Terjadi kesalahan")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-zinc-500">Memuat...</p>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Edit Artikel</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          Batal
        </button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Artikel" description="Judul dan URL artikel">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
            <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Slug (URL)</label>
            <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </FormSection>

        <FormSection title="Gambar Utama" description="Upload atau masukkan URL gambar">
          <ImageUpload label="" value={form.featuredImage} onChange={(val) => setForm({ ...form, featuredImage: val })} />
        </FormSection>

        <FormSection title="Konten" description="Tulis konten artikel menggunakan HTML">
          <AdminEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} />
        </FormSection>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all">
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button type="button" onClick={() => router.back()} className="h-12 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50">
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

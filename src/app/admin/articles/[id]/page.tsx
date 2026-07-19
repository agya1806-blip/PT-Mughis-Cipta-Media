"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import ImageUpload from "@/components/admin/ImageUpload"

export default function EditArticle() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({ title: "", slug: "", content: "", featuredImage: "" })
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/articles/${params.id}`)
      .then((r) => r.json())
      .then((data) => setForm({ title: data.title, slug: data.slug, content: data.content, featuredImage: data.featuredImage || "" }))
      .catch(() => alert("Gagal memuat artikel"))
      .finally(() => setLoading(false))
  }, [params.id])

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
      router.push("/admin/articles")
    } catch (e: unknown) {
      const err = e as Record<string, unknown>
      alert(err.message as string)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="text-zinc-500">Memuat...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Edit Artikel</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
          <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Slug</label>
          <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/50" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div>
          <ImageUpload
            label="Gambar Utama (opsional)"
            value={form.featuredImage}
            onChange={(val) => setForm({ ...form, featuredImage: val })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Konten (HTML)</label>
          <textarea rows={16} required className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/50" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </div>
        <button type="submit" disabled={submitting} className="h-11 px-6 rounded-xl bg-gold text-white font-medium hover:bg-gold-dark disabled:opacity-50">
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  )
}

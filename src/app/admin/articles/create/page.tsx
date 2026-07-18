"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateArticle() {
  const router = useRouter()
  const [form, setForm] = useState({ title: "", slug: "", content: "", featuredImage: "" })
  const [submitting, setSubmitting] = useState(false)

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
      router.push("/admin/articles")
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Artikel Baru</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
          <input
            type="text" required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Slug (URL)</label>
          <input
            type="text" required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">URL Gambar Utama (opsional)</label>
          <input
            type="url"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={form.featuredImage}
            onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Konten (HTML)</label>
          <textarea
            rows={16} required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <button
          type="submit" disabled={submitting}
          className="h-11 px-6 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800 disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  )
}

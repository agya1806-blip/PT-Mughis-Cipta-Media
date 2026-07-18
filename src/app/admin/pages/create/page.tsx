"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: "", slug: "", content: "" })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      router.push("/admin/pages")
    } catch {
      alert("Gagal membuat halaman")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Tambah Halaman</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
          <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Slug (URL)</label>
          <input type="text" required className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="contoh: profil-perusahaan"
          />
          <p className="text-xs text-zinc-400 mt-1">Akan muncul di: /{form.slug || "..."}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-600 mb-1">Konten (HTML)</label>
          <textarea rows={12} className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="h-11 px-6 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800 disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="h-11 px-6 rounded-xl border border-zinc-300 text-zinc-600 font-medium hover:bg-zinc-50"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

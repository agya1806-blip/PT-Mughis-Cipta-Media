"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminEditor from "@/components/admin/AdminEditor"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function CreatePage() {
  const router = useRouter()
  const { toast } = useToast()
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
      toast("success", "Halaman berhasil dibuat!")
      router.push("/admin/pages")
    } catch {
      toast("error", "Gagal membuat halaman")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Tambah Halaman</h1>
        <button type="button" onClick={() => router.back()} className="text-sm text-zinc-500 hover:text-zinc-700">Batal</button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <FormSection title="Informasi Halaman" description="Judul dan URL halaman">
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Judul</label>
            <input
              type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-600 mb-1">Slug (URL)</label>
            <input
              type="text" required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="contoh: profil-perusahaan"
            />
            <p className="text-xs text-zinc-400 mt-1">Akan muncul di: /{form.slug || "..."}</p>
          </div>
        </FormSection>

        <FormSection title="Konten Halaman" description="Tulis konten halaman menggunakan HTML">
          <AdminEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
            placeholder="Tulis konten halaman di sini..."
          />
        </FormSection>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Halaman"}
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

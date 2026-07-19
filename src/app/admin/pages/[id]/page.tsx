"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminEditor from "@/components/admin/AdminEditor"
import FormSection from "@/components/admin/FormSection"
import { useToast } from "@/components/admin/Toast"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState({ title: "", slug: "", content: "" })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/pages/${params.id}`)
      .then((r) => r.json())
      .then((p) => setForm({ title: p.title, slug: p.slug, content: p.content }))
      .catch(() => toast("error", "Gagal memuat halaman"))
  }, [params.id, toast])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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

        <FormSection title="Konten Halaman" description="Tulis konten halaman menggunakan HTML">
          <AdminEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} />
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

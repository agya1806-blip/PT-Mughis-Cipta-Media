"use client"

import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/admin/Toast"

interface PubType {
  id: number
  name: string
  slug: string
  icon: string | null
  badgeColor: string | null
  description: string | null
  status: boolean
  sortOrder: number
}

const ICON_OPTIONS = [
  "Book", "ScrollText", "Languages", "BookOpen", "BookMarked", "BookText",
  "BookHeart", "BookTemplate", "Notebook", "Feather", "Files",
  "FileText", "FileSearch", "Compass", "ClipboardList",
  "GraduationCap", "School", "Church", "Newspaper", "MoreHorizontal",
]

const EMPTY_FORM = { name: "", slug: "", icon: "", badgeColor: "", description: "", sortOrder: "0" }

export default function AdminPublicationTypes() {
  const { toast } = useToast()
  const [types, setTypes] = useState<PubType[]>([])
  const [editing, setEditing] = useState<PubType | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)

  const loadTypes = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/publication-types")
      const data = await res.json()
      if (Array.isArray(data)) setTypes(data)
    } catch {}
  }, [])

  useEffect(() => { loadTypes() }, [loadTypes])

  function autoSlug(name: string) {
    const s = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").substring(0, 100)
    setForm((prev) => ({ ...prev, slug: prev.slug || s }))
  }

  function startEdit(t: PubType) {
    setEditing(t)
    setForm({
      name: t.name,
      slug: t.slug,
      icon: t.icon || "",
      badgeColor: t.badgeColor || "",
      description: t.description || "",
      sortOrder: String(t.sortOrder),
    })
    setShowForm(true)
  }

  function startCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { toast("error", "Nama wajib diisi"); return }
    try {
      const url = "/api/admin/publication-types"
      const method = editing ? "PUT" : "POST"
      const body = editing ? { id: editing.id, ...form } : form
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Gagal menyimpan")
      }
      toast("success", editing ? "Jenis terbitan diperbarui!" : "Jenis terbitan ditambahkan!")
      setShowForm(false)
      loadTypes()
    } catch (e) {
      toast("error", e instanceof Error ? e.message : "Gagal menyimpan")
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus jenis terbitan ini?")) return
    try {
      const res = await fetch(`/api/admin/publication-types?id=${id}`, { method: "DELETE" })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Gagal menghapus")
      }
      toast("success", "Jenis terbitan dihapus!")
      loadTypes()
    } catch (e) {
      toast("error", e instanceof Error ? e.message : "Gagal menghapus")
    }
  }

  const inputClass = "w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 text-sm text-green-dark placeholder-green-dark/80 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Master Jenis Terbitan</h1>
        <button onClick={startCreate} className="h-10 px-4 rounded-lg bg-gold text-green-dark text-sm font-medium hover:bg-gold-dark">
          Tambah Baru
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="max-w-xl mb-8 p-6 rounded-xl border border-gold/20 bg-cream space-y-4">
          <h2 className="text-lg font-bold text-green-dark">{editing ? "Edit" : "Tambah"} Jenis Terbitan</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Nama</label>
              <input type="text" required className={inputClass} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); autoSlug(e.target.value) }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Slug</label>
              <input type="text" required className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Urutan</label>
              <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Icon</label>
              <select className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                <option value="">Pilih icon</option>
                {ICON_OPTIONS.map((ico) => <option key={ico} value={ico}>{ico}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Warna Badge</label>
              <div className="flex gap-2 items-center">
                <input type="color" className="w-10 h-10 rounded cursor-pointer" value={form.badgeColor || "#D3C297"} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })} />
                <input type="text" className={inputClass} value={form.badgeColor} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })} placeholder="#D3C297" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-green-dark/80 mb-1">Deskripsi</label>
              <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="h-10 px-6 rounded-lg bg-gold text-green-dark font-medium hover:bg-gold-dark text-sm">Simpan</button>
            <button type="button" onClick={() => setShowForm(false)} className="h-10 px-6 rounded-lg border border-zinc-300 text-green-dark/80 font-medium hover:bg-zinc-50 text-sm">Batal</button>
          </div>
        </form>
      )}

      <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gold/5 border-b border-gold/20">
              <th className="text-left px-4 py-3 font-medium text-green-dark/80 w-12">#</th>
              <th className="text-left px-4 py-3 font-medium text-green-dark/80">Nama</th>
              <th className="text-left px-4 py-3 font-medium text-green-dark/80">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-green-dark/80">Icon</th>
              <th className="text-center px-4 py-3 font-medium text-green-dark/80">Warna</th>
              <th className="text-center px-4 py-3 font-medium text-green-dark/80">Status</th>
              <th className="text-center px-4 py-3 font-medium text-green-dark/80">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t.id} className="border-b border-gold/10 hover:bg-gold/5">
                <td className="px-4 py-3 text-green-dark/80 text-center">{t.sortOrder}</td>
                <td className="px-4 py-3 text-green-dark font-medium">{t.name}</td>
                <td className="px-4 py-3 text-green-dark/80">{t.slug}</td>
                <td className="px-4 py-3 text-center"><code className="text-xs bg-gold/10 px-2 py-0.5 rounded">{t.icon || "—"}</code></td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block w-5 h-5 rounded" style={{ backgroundColor: t.badgeColor || "#D3C297" }} title={t.badgeColor || ""} />
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${t.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {t.status ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button onClick={() => startEdit(t)} className="text-green hover:underline text-xs">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {types.length === 0 && (
          <p className="text-center py-8 text-green-dark/60 text-sm">Belum ada jenis terbitan.</p>
        )}
      </div>
    </div>
  )
}

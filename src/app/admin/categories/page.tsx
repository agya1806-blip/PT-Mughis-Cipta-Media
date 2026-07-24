"use client"

import { useEffect, useState } from "react"

interface Category {
  id: number
  name: string
  slug: string
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({ name: "", slug: "" })
  const [editingId, setEditingId] = useState<number | null>(null)

  function load() {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {})
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.slug) return
    if (editingId) {
      await fetch(`/api/admin/categories`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      })
    } else {
      await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    }
    setForm({ name: "", slug: "" })
    setEditingId(null)
    load()
  }

  function handleEdit(cat: Category) {
    setForm({ name: cat.name, slug: cat.slug })
    setEditingId(cat.id)
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus kategori?")) return
    await fetch(`/api/admin/categories`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-dark mb-6">Kategori</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 max-w-lg">
        <input type="text" placeholder="Nama" required
          className="flex-1 rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="text" placeholder="Slug" required
          className="flex-1 rounded-lg border border-gold/20 bg-cream px-3 py-2 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <button type="submit"
          className="h-10 px-4 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-dark"
        >
          {editingId ? "Update" : "Tambah"}
        </button>
      </form>
      <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden max-w-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gold/5 border-b border-gold/20">
              <th className="text-left px-4 py-3 font-medium text-green/70">Nama</th>
              <th className="text-left px-4 py-3 font-medium text-green/70">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-green/70">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gold/10 hover:bg-gold/5">
                <td className="px-4 py-3 text-green-dark">{cat.name}</td>
                <td className="px-4 py-3 text-green/70">{cat.slug}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-green-dark dark:text-gold hover:underline text-xs">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:underline text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

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
      .then(setCategories)
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
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Kategori</h1>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 max-w-lg">
        <input type="text" placeholder="Nama" required
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="text" placeholder="Slug" required
          className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <button type="submit"
          className="h-10 px-4 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-dark"
        >
          {editingId ? "Update" : "Tambah"}
        </button>
      </form>
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden max-w-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Nama</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800">{cat.name}</td>
                <td className="px-4 py-3 text-zinc-500">{cat.slug}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button onClick={() => handleEdit(cat)} className="text-gold hover:underline text-xs">Edit</button>
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

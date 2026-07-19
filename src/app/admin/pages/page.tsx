"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Page {
  id: number
  slug: string
  title: string
  updatedAt: string
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([])

  function load() {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then(setPages)
      .catch(() => {})
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: number) {
    if (!confirm("Hapus halaman ini?")) return
    await fetch(`/api/admin/pages/${id}`, { method: "DELETE" })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Halaman</h1>
        <Link
          href="/admin/pages/create"
          className="h-10 px-4 rounded-lg bg-gold text-white text-sm font-medium hover:bg-gold-dark flex items-center"
        >
          Tambah Halaman
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800">{page.title}</td>
                <td className="px-4 py-3 text-zinc-500">/{page.slug}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <Link href={`/admin/pages/${page.id}`} className="text-gold hover:underline text-xs">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:underline text-xs">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

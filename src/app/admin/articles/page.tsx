"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Article {
  id: number
  title: string
  slug: string
  createdAt: string
}

export default function ArticlesPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((d) => setArticles(d.articles || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: number) {
    if (!confirm("Hapus artikel ini?")) return
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
      if (res.ok) setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Artikel</h1>
        <Link
          href="/admin/articles/create"
          className="h-10 px-5 rounded-xl bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 inline-flex items-center"
        >
          + Artikel Baru
        </Link>
      </div>

      {loading ? (
        <p className="text-zinc-500">Memuat...</p>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center text-zinc-500">
          <p>Belum ada artikel.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-zinc-600">Tanggal</th>
                <th className="text-right px-4 py-3 font-medium text-zinc-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="px-4 py-3 text-zinc-800">{a.title}</td>
                  <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{a.slug}</td>
                  <td className="px-4 py-3 text-zinc-500">{new Date(a.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => router.push(`/admin/articles/${a.id}`)}
                      className="text-xs font-medium text-amber-700 hover:text-amber-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

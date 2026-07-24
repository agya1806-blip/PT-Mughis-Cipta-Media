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
        <h1 className="text-2xl font-bold text-green-dark">Artikel</h1>
        <Link
          href="/admin/articles/create"
          className="h-10 px-5 rounded-xl bg-gold text-white text-sm font-medium hover:bg-gold-dark inline-flex items-center"
        >
          + Artikel Baru
        </Link>
      </div>

      {loading ? (
        <p className="text-green/70">Memuat...</p>
      ) : articles.length === 0 ? (
        <div className="bg-cream rounded-xl border border-gold/20 p-8 text-center text-green/70">
          <p>Belum ada artikel.</p>
        </div>
      ) : (
        <div className="bg-cream rounded-xl border border-gold/20 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20 bg-gold/5">
                <th className="text-left px-4 py-3 font-medium text-green/70">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-green/70">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-green/70">Tanggal</th>
                <th className="text-right px-4 py-3 font-medium text-green/70">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-gold/10 hover:bg-gold/5">
                  <td className="px-4 py-3 text-green-dark">{a.title}</td>
                  <td className="px-4 py-3 text-green/70 font-mono text-xs">{a.slug}</td>
                  <td className="px-4 py-3 text-green/70">{new Date(a.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => router.push(`/admin/articles/${a.id}`)}
                      className="text-xs font-medium text-green-dark hover:text-green mr-3"
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

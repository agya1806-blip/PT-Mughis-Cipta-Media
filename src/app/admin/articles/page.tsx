"use client"

import { useState, useEffect } from "react"

interface Article {
  id: number
  title: string
  slug: string
  createdAt: string
}

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch("/api/articles")
      .then((r) => r.json())
      .then(setArticles)
      .catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-800 mb-6">Manajemen Artikel</h1>
      <p className="text-zinc-500 mb-4">Daftar artikel yang telah dipublikasikan.</p>

      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Judul</th>
              <th className="text-left px-4 py-3 font-medium text-zinc-600">Slug</th>
              <th className="text-center px-4 py-3 font-medium text-zinc-600">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                <td className="px-4 py-3 text-zinc-800">{a.title}</td>
                <td className="px-4 py-3 text-zinc-500">/{a.slug}</td>
                <td className="px-4 py-3 text-center text-xs text-zinc-400">
                  {new Date(a.createdAt).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

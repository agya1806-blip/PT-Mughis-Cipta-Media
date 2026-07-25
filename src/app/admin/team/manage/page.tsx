"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ManageTeamPage() {
  const router = useRouter()
  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/team/manage")
      .then((r) => r.json())
      .then((data) => {
        if (data.team_hero_title) setHeroTitle(data.team_hero_title)
        if (data.team_hero_subtitle) setHeroSubtitle(data.team_hero_subtitle)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/team/manage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_hero_title: heroTitle,
          team_hero_subtitle: heroSubtitle,
        }),
      })
      if (!res.ok) throw new Error("Gagal menyimpan")
      alert("Pengaturan berhasil disimpan!")
      router.push("/admin/team")
    } catch {
      alert("Gagal menyimpan pengaturan")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-green/60">Memuat...</p>
      </div>
    )
  }

  const inputClass =
    "w-full rounded-lg border border-gold/20 bg-cream px-3 py-2.5 text-sm text-green-dark placeholder-green/60 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-dark">
          Kelola Halaman Tim
        </h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-green/70 hover:text-green-dark"
        >
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-cream rounded-xl border border-gold/20 p-6 space-y-4">
          <h2 className="text-lg font-bold text-green-dark">
            Hero Section
          </h2>
          <div>
            <label className="block text-sm font-medium text-green-dark mb-1">
              Judul Hero
            </label>
            <input
              type="text"
              className={inputClass}
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-dark mb-1">
              Subjudul Hero
            </label>
            <textarea
              rows={3}
              className={inputClass}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2 pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="h-12 px-8 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark disabled:opacity-50 transition-all"
          >
            {submitting ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </div>
  )
}

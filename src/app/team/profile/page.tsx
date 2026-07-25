"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2, LogOut, ArrowLeft } from "lucide-react"
import { TeamPhotoUpload } from "@/components/team/TeamPhotoUpload"

interface ProfileData {
  id: number
  name: string
  position: string
  division: string
  role: string
  bio: string
  photo: string | null
  email: string
  whatsapp: string | null
  linkedin: string | null
  facebook: string | null
  instagram: string | null
  website: string | null
  skills: string | null
  quote: string | null
}

export default function TeamProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [form, setForm] = useState({
    bio: "",
    photo: "",
    email: "",
    whatsapp: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    website: "",
    skills: "",
    quote: "",
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/team/profile")
      .then((r) => {
        if (r.status === 401) {
          router.push("/team/login")
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (!data) return
        setProfile(data)
        setForm({
          bio: data.bio || "",
          photo: data.photo || "",
          email: data.email || "",
          whatsapp: data.whatsapp || "",
          linkedin: data.linkedin || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
          website: data.website || "",
          skills: data.skills || "",
          quote: data.quote || "",
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")
    try {
      const res = await fetch("/api/team/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Gagal menyimpan")
      }
      setMessage("Profil berhasil diperbarui!")
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Gagal menyimpan")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/team/logout", { method: "POST" })
    } catch {}
    router.push("/team/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  const inputClass =
    "w-full rounded-xl border border-gold/20 px-4 py-3 text-sm bg-cream text-green-dark placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center hover:bg-gold/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-green-dark/80" />
            </a>
            <div>
              <h1 className="text-2xl font-bold text-green-dark">
                Profil Saya
              </h1>
              {profile && (
                <p className="text-sm text-green-dark/80">{profile.name}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-green-dark/80 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl border text-sm ${
              message.includes("berhasil")
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {profile && (
          <div className="bg-cream rounded-2xl border border-gold/20 p-6 sm:p-8 mb-6">
            <div className="mb-6 pb-6 border-b border-gold/10">
              <h2 className="text-lg font-bold text-green-dark">
                {profile.name}
              </h2>
              <p className="text-sm text-green-dark/80">{profile.position}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TeamPhotoUpload
                value={form.photo}
                onChange={(val) => setForm({ ...form, photo: val })}
                label="Foto Profil"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-green-dark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-dark mb-1">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={form.whatsapp}
                    onChange={(e) =>
                      setForm({ ...form, whatsapp: e.target.value })
                    }
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-dark mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={form.linkedin}
                    onChange={(e) =>
                      setForm({ ...form, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-dark mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={form.instagram}
                    onChange={(e) =>
                      setForm({ ...form, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-dark mb-1">
                  Bio
                </label>
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-dark mb-1">
                  Skills (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.skills}
                  onChange={(e) =>
                    setForm({ ...form, skills: e.target.value })
                  }
                  placeholder="Kepemimpinan, Strategi, Inovasi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-dark mb-1">
                  Quote
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Quote profesional..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-green-dark font-bold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                ) : (
                  <><Save className="w-4 h-4" /> Simpan Profil</>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

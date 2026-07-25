"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn, Loader2 } from "lucide-react"

export default function TeamLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/team/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login gagal")
      router.push("/team/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green via-green-dark to-green flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="bg-cream rounded-2xl border border-gold/20 p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-6 h-6 text-green-dark" />
            </div>
            <h1 className="text-2xl font-bold text-green-dark">
              Login Tim
            </h1>
            <p className="text-sm text-green-dark/80 mt-1">
              Masuk untuk mengelola profil Anda
            </p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-sm bg-cream text-green-dark placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@mughisciptamedia.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-dark mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-xl border border-gold/20 px-4 py-3 text-sm bg-cream text-green-dark placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-gold/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-green-dark font-bold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

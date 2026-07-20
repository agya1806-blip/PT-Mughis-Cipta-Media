"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push("/")
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex items-center justify-center py-16 px-4"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="w-full max-w-sm"
      >
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          className="text-2xl font-bold text-green-dark text-center mb-8"
        >
          Masuk
        </motion.h1>
        <motion.form
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-green-dark mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-dark mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-green text-gold font-medium hover:bg-green-dark disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </motion.form>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          className="text-center text-sm text-zinc-600 mt-6"
        >
          Belum punya akun?{" "}
          <Link href="/register" className="text-gold hover:underline">
            Daftar
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

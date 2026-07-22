"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CUSTOMER",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/register", {
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
      className="flex-1 flex items-center justify-center pt-20 pb-16 px-4"
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
          Daftar Akun
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
            <label className="block text-sm font-medium text-green-dark mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
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
            <label className="block text-sm font-medium text-green-dark mb-1">No. WhatsApp</label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-dark mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gold/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 bg-cream text-green-dark placeholder-zinc-400"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <input type="hidden" name="role" value="CUSTOMER" />
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-green text-gold font-medium hover:bg-green-dark disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </motion.form>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          className="text-center text-sm text-zinc-600 mt-6"
        >
          Sudah punya akun?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Masuk
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

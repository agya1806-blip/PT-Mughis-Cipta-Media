"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-zinc-200 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-6 h-6 text-gold" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 mb-2">Pesan Terkirim</h3>
        <p className="text-sm text-zinc-500">
          Terima kasih! Pesan Anda telah kami terima. Tim kami akan menghubungi Anda segera.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-zinc-200 p-6 space-y-4">
      <h2 className="text-lg font-semibold text-zinc-900">Kirim Pesan</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
            Nama Lengkap
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Nama Anda"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-zinc-900 placeholder-zinc-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="email@anda.com"
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-zinc-900 placeholder-zinc-400"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">
          Nomor Telepon
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+62 812-3456-7890"
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-zinc-900 placeholder-zinc-400"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-1">
          Subjek
        </label>
        <input
          id="subject"
          type="text"
          required
          placeholder="Penerbitan Buku"
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-zinc-900 placeholder-zinc-400"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
          Pesan
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tulis pesan Anda di sini..."
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-zinc-900 placeholder-zinc-400 resize-y"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-medium rounded-xl transition-colors text-sm"
      >
        <Send className="w-4 h-4" />
        Kirim Pesan
      </button>
    </form>
  )
}

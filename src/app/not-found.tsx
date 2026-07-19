import type { Metadata } from "next"
import Link from "next/link"
import { Search, Home, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "404 - Halaman Tidak Ditemukan",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" className="stroke-zinc-200" strokeWidth="2" />
            <circle cx="100" cy="100" r="70" className="stroke-gold/20" strokeWidth="1" />
            <text x="100" y="115" textAnchor="middle" className="fill-gold text-7xl font-bold" fontSize="72" fontFamily="system-ui">
              404
            </text>
            <path d="M30 170 Q60 140 100 150 Q140 160 170 130" className="stroke-zinc-300" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="75" cy="85" r="4" className="fill-zinc-300" />
            <circle cx="125" cy="85" r="4" className="fill-zinc-300" />
            <path d="M85 100 Q100 110 115 100" className="stroke-zinc-300" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-zinc-500 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak ada, telah dipindahkan, atau sedang dalam pengembangan.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-100 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Lihat Katalog
          </Link>
        </div>

        <div className="relative max-w-sm mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari di website..."
            readOnly
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm placeholder-zinc-400 cursor-default"
          />
        </div>
      </div>
    </div>
  )
}

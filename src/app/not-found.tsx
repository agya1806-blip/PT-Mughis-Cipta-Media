import Link from "next/link"
import { Search, Home, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
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

        <h1 className="text-2xl font-bold text-green-dark mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-green/80 mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak ada, telah dipindahkan, atau sedang dalam pengembangan.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green text-gold font-medium rounded-xl hover:bg-green-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-green-dark font-medium rounded-xl hover:bg-cream transition-colors"
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
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gold/20 bg-cream text-green-dark text-sm placeholder-zinc-400 cursor-default"
          />
        </div>
      </div>
    </div>
  )
}

"use client"

export default function BookDetailError({ reset }: { reset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-cream px-4 py-20">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900 mb-3">Gagal Memuat Buku</h1>
        <p className="text-zinc-500 mb-8">
          Maaf, gagal memuat detail buku. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          aria-label="Coba lagi muat ulang halaman buku"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-medium rounded-xl hover:bg-gold-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

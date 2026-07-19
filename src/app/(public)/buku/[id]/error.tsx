"use client"

export default function BookDetailError({ reset }: { reset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-50 px-4 py-20">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-zinc-900 mb-3">Gagal Memuat Buku</h1>
        <p className="text-zinc-500 mb-8">
          Maaf, gagal memuat detail buku. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

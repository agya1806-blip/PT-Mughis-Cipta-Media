"use client"

export default function PublicError({ reset }: { reset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-cream px-4 py-20">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4 text-red-400">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-dark mb-3">Terjadi Kesalahan</h1>
        <p className="text-zinc-600 mb-8">
          Maaf, terjadi kesalahan. Silakan coba lagi.
        </p>
        <button
          onClick={reset}
          aria-label="Coba lagi muat ulang halaman"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green text-gold font-medium rounded-xl hover:bg-green-dark transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  )
}

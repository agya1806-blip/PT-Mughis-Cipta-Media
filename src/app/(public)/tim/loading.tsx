export default function TimLoading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto" />
        <p className="text-green/60 text-sm">Memuat...</p>
      </div>
    </div>
  )
}

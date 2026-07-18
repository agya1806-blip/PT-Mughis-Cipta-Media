import { MapPin } from "lucide-react"

export default function MapPlaceholder() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="text-lg font-semibold text-zinc-900 mb-4">Lokasi</h2>
      <div className="aspect-[4/3] bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400">
        <div className="text-center p-4">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Peta Google Maps</p>
          <p className="text-xs mt-1">Integrasi peta akan ditambahkan</p>
        </div>
      </div>
    </div>
  )
}

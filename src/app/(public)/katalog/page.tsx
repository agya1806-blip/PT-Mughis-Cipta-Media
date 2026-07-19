import { Suspense } from "react"
import { KatalogClient } from "@/components/KatalogClient"

export const metadata = {
  title: "Koleksi Buku",
  description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis. Temukan berbagai kategori seperti Aqidah, Fiqih, Tafsir, Hadits, dan lainnya.",
  openGraph: {
    title: "Koleksi Buku - Maktabah al-Mughis",
    description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis.",
  },
  twitter: {
    title: "Koleksi Buku - Maktabah al-Mughis",
    description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis.",
  },
  alternates: {
    canonical: "/katalog",
  },
}

export default function KatalogPage() {
  return (
    <div className="flex-1 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        <Suspense fallback={<div className="text-center py-20 text-zinc-500">Memuat koleksi...</div>}>
          <KatalogClient />
        </Suspense>
      </div>
    </div>
  )
}

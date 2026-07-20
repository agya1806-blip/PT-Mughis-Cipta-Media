import { Suspense } from "react"
import PageHero from "@/components/PageHero"
import { KatalogClient } from "@/components/KatalogClient"

export const metadata = {
  title: "Katalog Buku",
  description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis. Temukan berbagai kategori buku seperti Aqidah, Fiqih, Tafsir, Hadits, dan lainnya.",
  openGraph: {
    title: "Katalog Buku - Maktabah al-Mughis",
    description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis.",
  },
  twitter: {
    title: "Katalog Buku - Maktabah al-Mughis",
    description: "Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis.",
  },
  alternates: {
    canonical: "/katalog",
  },
}

export default function KatalogPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="Katalog"
        accent="Buku"
        description="Jelajahi koleksi buku-buku islami dari Maktabah al-Mughis. Temukan berbagai kategori dan penulis."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Katalog Buku" },
        ]}
        icon="katalog"
      />
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Suspense fallback={<div className="text-center py-20 text-green/60">Memuat katalog...</div>}>
            <KatalogClient />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

import { headers } from "next/headers"
import { SITE } from "@/lib/seo"
import PageHero from "@/components/PageHero"
import { KatalogClient } from "@/components/KatalogClient"
import type { Book, Category } from "@/lib/data"

const baseUrl = SITE.baseUrl

export const metadata = {
  title: "Katalog Terbitan | Penerbit Buku, Kitab & Percetakan Aceh",
  description: "Jelajahi koleksi terbitan dari PT Mughis Cipta Media. Temukan berbagai jenis terbitan — buku, kitab, kitab terjemahan, modul, monograf, prosiding, antologi, novel — dan berbagai kategori serta penulis.",
  openGraph: {
    title: "Katalog Terbitan | Penerbit Buku, Kitab & Percetakan Aceh - PT Mughis Cipta Media",
    description: "Jelajahi koleksi terbitan dari PT Mughis Cipta Media — penerbit buku, kitab, dan percetakan di Aceh.",
    url: `${baseUrl}/katalog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Terbitan | Penerbit & Percetakan Buku Aceh",
    description: "Koleksi terbitan buku, kitab, dan berbagai jenis publikasi dari PT Mughis Cipta Media.",
  },
  alternates: {
    canonical: "/katalog",
  },
}

async function getBaseUrl() {
  const h = await headers()
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000"
  const proto = h.get("x-forwarded-proto") || (process.env.NODE_ENV === "development" ? "http" : "https")
  return `${proto}://${host}`
}

interface PageParams {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function KatalogPage({ searchParams }: PageParams) {
  const params = await searchParams
  const baseUrl = await getBaseUrl()

  const qs = new URLSearchParams()
  if (params.page) qs.set("page", params.page)
  if (params.category_id) qs.set("category_id", params.category_id)
  if (params.search) qs.set("search", params.search)
  if (params.sort) qs.set("sort", params.sort)

  const fetchOpts = { next: { revalidate: 300 } } as const

  const [booksRes, catsRes, pubTypesRes] = await Promise.all([
    fetch(`${baseUrl}/api/books?${qs.toString()}`, fetchOpts),
    fetch(`${baseUrl}/api/categories`, { next: { revalidate: 600 } }),
    fetch(`${baseUrl}/api/publication-types`, { next: { revalidate: 600 } }),
  ])

  const booksData: { books: Book[]; total: number; total_pages: number } = await booksRes.json()
  const catsData: { categories: Category[] } = await catsRes.json()
  const pubTypes = await pubTypesRes.json()

  const books: Book[] = booksData.books ?? []
  const total = booksData.total ?? 0
  const totalPages = booksData.total_pages ?? 1
  const categories: Category[] = catsData.categories ?? []
  const initialPubTypes = Array.isArray(pubTypes) ? pubTypes : []

  return (
    <main className="min-h-screen">
      <PageHero
        title="Katalog"
        accent="Terbitan"
        description="Jelajahi koleksi terbitan dari PT Mughis Cipta Media. Temukan berbagai jenis terbitan, kategori, dan penulis."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Katalog Terbitan" },
        ]}
        icon="katalog"
      />
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <KatalogClient
            initialBooks={books}
            initialCategories={categories}
            initialPubTypes={initialPubTypes}
            initialTotal={total}
            initialTotalPages={totalPages}
          />
        </div>
      </div>
    </main>
  )
}
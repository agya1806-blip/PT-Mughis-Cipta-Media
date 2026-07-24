import { headers } from "next/headers"
import PageHero from "@/components/PageHero"
import { KatalogClient } from "@/components/KatalogClient"
import type { Book, Category } from "@/lib/data"

export const metadata = {
  title: "Katalog Buku",
  description: "Jelajahi koleksi buku dari PT Mughis Cipta Media. Temukan berbagai kategori buku.",
  openGraph: {
    title: "Katalog Buku - PT Mughis Cipta Media",
    description: "Jelajahi koleksi buku dari PT Mughis Cipta Media.",
  },
  twitter: {
    title: "Katalog Buku - PT Mughis Cipta Media",
    description: "Jelajahi koleksi buku dari PT Mughis Cipta Media.",
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

  const [booksRes, catsRes] = await Promise.all([
    fetch(`${baseUrl}/api/books?${qs.toString()}`, fetchOpts),
    fetch(`${baseUrl}/api/categories`, { next: { revalidate: 600 } }),
  ])

  const booksData: { books: Book[]; total: number; total_pages: number } = await booksRes.json()
  const catsData: { categories: Category[] } = await catsRes.json()

  const books: Book[] = booksData.books ?? []
  const total = booksData.total ?? 0
  const totalPages = booksData.total_pages ?? 1
  const categories: Category[] = catsData.categories ?? []

  return (
    <main className="min-h-screen">
      <PageHero
        title="Katalog"
        accent="Buku"
        description="Jelajahi koleksi buku dari PT Mughis Cipta Media. Temukan berbagai kategori dan penulis."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Katalog Buku" },
        ]}
        icon="katalog"
      />
      <div className="bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <KatalogClient
            initialBooks={books}
            initialCategories={categories}
            initialTotal={total}
            initialTotalPages={totalPages}
          />
        </div>
      </div>
    </main>
  )
}

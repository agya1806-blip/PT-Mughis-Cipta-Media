import { prisma } from "@/lib/prisma"
import PageHero from "@/components/PageHero"
import { KatalogClient } from "@/components/KatalogClient"
import type { Book, Category } from "@/lib/data"

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

interface PageParams {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function KatalogPage({ searchParams }: PageParams) {
  const params = await searchParams

  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1)
  const categoryId = params.category_id ? parseInt(params.category_id) : undefined
  const search = params.search ?? ""
  const sort = params.sort ?? "latest"
  const limit = 12

  const where: Record<string, unknown> = {}
  if (categoryId) where.categoryId = categoryId
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" as const } },
      { author: { contains: search, mode: "insensitive" as const } },
    ]
  }

  const orderBy: Record<string, "asc" | "desc"> =
    sort === "title_asc" ? { title: "asc" } :
    sort === "title_desc" ? { title: "desc" } :
    { createdAt: "desc" }

  const [booksRaw, total, categoriesRaw] = await Promise.all([
    prisma.book.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.book.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const books: Book[] = booksRaw.map((b) => ({
    id: String(b.id),
    slug: b.slug,
    title: b.title,
    author: b.author,
    translator: b.translator,
    publisher: b.publisher,
    isbn: b.isbn || "",
    page_count: b.pageCount,
    price: Number(b.price),
    category_id: String(b.categoryId),
    category_name: b.category.name,
    cover_image: b.coverImage,
    synopsis: b.synopsis,
    preview_pdf_url: b.previewPdfUrl,
    created_at: b.createdAt.toISOString(),
    stock: b.stock,
    weight: b.weight,
    dimensions: b.dimensions,
    language: b.language,
    publication_year: b.publicationYear,
  }))

  const categories: Category[] = categoriesRaw.map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
  }))

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

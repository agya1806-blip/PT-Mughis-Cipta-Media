import { NextRequest } from "next/server"
import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"

const getCachedBooks = unstable_cache(
  async (page: string, limit: string, category_id: string, search: string, sort: string) => {
    const p = parseInt(page, 10)
    const l = parseInt(limit, 10)

    const where: Record<string, unknown> = {}
    if (category_id) where.categoryId = parseInt(category_id)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { translator: { contains: search, mode: "insensitive" } },
      ]
    }

    const orderBy: Record<string, "asc" | "desc"> =
      sort === "price_asc" ? { price: "asc" } :
      sort === "price_desc" ? { price: "desc" } :
      sort === "title_asc" ? { title: "asc" } :
      sort === "title_desc" ? { title: "desc" } :
      { createdAt: "desc" }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        include: { category: true },
        orderBy,
        skip: (p - 1) * l,
        take: l,
      }),
      prisma.book.count({ where }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / l))

    const mapped = books.map((b) => ({
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

    return { books: mapped, total, page: p, total_pages: totalPages, limit: l }
  },
  ["api-books"],
  { revalidate: 600, tags: ["books"] }
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const page = searchParams.get("page") ?? "1"
    const limit = searchParams.get("limit") ?? "12"
    const category_id = searchParams.get("category_id") ?? ""
    const search = searchParams.get("search") ?? ""
    const sort = searchParams.get("sort") ?? "latest"

    const data = await getCachedBooks(page, limit, category_id, search, sort)

    return Response.json(data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch {
    return Response.json({ books: [], total: 0, page: 1, total_pages: 1, limit: 12 }, { status: 500 })
  }
}

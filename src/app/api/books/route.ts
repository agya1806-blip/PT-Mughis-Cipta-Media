import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const page = parseInt(searchParams.get("page") ?? "1", 10)
    const limit = parseInt(searchParams.get("limit") ?? "12", 10)
    const category_id = searchParams.get("category_id")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") ?? "latest"

    const where: any = {}
    if (category_id) where.categoryId = parseInt(category_id)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { translator: { contains: search, mode: "insensitive" } },
      ]
    }

    const orderBy: any =
      sort === "price_asc" ? { price: "asc" as const } :
      sort === "price_desc" ? { price: "desc" as const } :
      { createdAt: "desc" as const }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        include: { category: true },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.book.count({ where }),
    ])

    const totalPages = Math.max(1, Math.ceil(total / limit))

    const mapped = books.map((b) => ({
      id: String(b.id),
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

    return Response.json({ books: mapped, total, page, total_pages: totalPages, limit })
  } catch {
    return Response.json({ books: [], total: 0, page: 1, total_pages: 1, limit: 12 }, { status: 500 })
  }
}

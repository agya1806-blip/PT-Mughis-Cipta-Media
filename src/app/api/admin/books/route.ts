import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { slugify } from "@/lib/slug"

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "20")
  const search = searchParams.get("search") || ""

  const where = search
    ? { OR: [{ title: { contains: search } }, { author: { contains: search } }] }
    : {}

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.book.count({ where }),
  ])

  return NextResponse.json({ books, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const body = await request.json()

    if (!body.title || !body.author || !body.categoryId || body.price === undefined) {
      return NextResponse.json({ error: "Judul, penulis, kategori, dan harga wajib diisi" }, { status: 400 })
    }

    const book = await prisma.book.create({
      data: {
        title: body.title,
        slug: body.slug || slugify(body.title),
        author: body.author,
        translator: body.translator || null,
        publisher: body.publisher || "",
        categoryId: parseInt(body.categoryId),
        synopsis: body.synopsis || "",
        price: parseFloat(body.price),
        resellerPrice: body.resellerPrice ? parseFloat(body.resellerPrice) : null,
        stock: parseInt(body.stock) || 0,
        coverImage: body.coverImage || "",
        isbn: body.isbn || null,
        pageCount: parseInt(body.pageCount) || 0,
        previewPdfUrl: body.previewPdfUrl || "",
        weight: parseInt(body.weight) || 250,
        dimensions: body.dimensions || "",
        language: body.language || "",
        publicationYear: parseInt(body.publicationYear) || new Date().getFullYear(),
        whatsapp: body.whatsapp || null,
      },
      include: { category: true },
    })

    return NextResponse.json(book, { status: 201 })
  } catch (e) {
    console.error("Create book error:", e)
    const message = e instanceof Error ? e.message : "Failed to create book"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

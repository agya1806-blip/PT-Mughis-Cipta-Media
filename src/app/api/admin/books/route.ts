import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

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
    const book = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        translator: body.translator || null,
        publisher: body.publisher || "",
        categoryId: parseInt(body.categoryId),
        synopsis: body.synopsis,
        price: parseFloat(body.price),
        stock: parseInt(body.stock) || 0,
        coverImage: body.coverImage,
        isbn: body.isbn || null,
        pageCount: parseInt(body.pageCount) || 0,
        previewPdfUrl: body.previewPdfUrl || "",
        weight: parseInt(body.weight) || 250,
        dimensions: body.dimensions || "",
        language: body.language || "",
        publicationYear: parseInt(body.publicationYear) || new Date().getFullYear(),
      },
      include: { category: true },
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}

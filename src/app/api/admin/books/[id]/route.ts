import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  })
  if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(book)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  try {
    const body = await request.json()
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        author: body.author,
        translator: body.translator || null,
        publisher: body.publisher || undefined,
        categoryId: body.categoryId ? parseInt(body.categoryId) : undefined,
        synopsis: body.synopsis,
        price: body.price ? parseFloat(body.price) : undefined,
        stock: body.stock !== undefined ? parseInt(body.stock) : undefined,
        coverImage: body.coverImage,
        isbn: body.isbn || null,
        pageCount: body.pageCount ? parseInt(body.pageCount) : undefined,
        previewPdfUrl: body.previewPdfUrl || null,
        weight: body.weight ? parseInt(body.weight) : undefined,
        dimensions: body.dimensions || undefined,
        language: body.language || undefined,
        publicationYear: body.publicationYear ? parseInt(body.publicationYear) : undefined,
      },
      include: { category: true },
    })

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  try {
    await prisma.book.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { slugify } from "@/lib/slug"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { id } = await params
    const idNum = parseInt(id)
    if (isNaN(idNum)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })

    const book = await prisma.book.findUnique({
      where: { id: idNum },
      include: { category: true },
    })
    if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json(book)
  } catch {
    return NextResponse.json({ error: "Gagal memuat" }, { status: 500 })
  }
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
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.slug != null ? { slug: body.slug || slugify(body.title || "") } : {}),
        ...(body.author != null ? { author: body.author } : {}),
        ...(body.translator !== undefined ? { translator: body.translator || null } : {}),
        ...(body.publisher !== undefined ? { publisher: body.publisher || "" } : {}),
        ...(body.categoryId != null ? { categoryId: parseInt(body.categoryId) } : {}),
        ...(body.synopsis != null ? { synopsis: body.synopsis } : {}),
        ...(body.price != null ? { price: parseFloat(body.price) } : {}),
        ...(body.resellerPrice !== undefined ? { resellerPrice: body.resellerPrice ? parseFloat(body.resellerPrice) : null } : {}),
        ...(body.stock != null ? { stock: parseInt(body.stock) } : {}),
        ...(body.coverImage != null ? { coverImage: body.coverImage } : {}),
        ...(body.pageCount != null ? { pageCount: parseInt(body.pageCount) } : {}),
        ...(body.previewPdfUrl !== undefined ? { previewPdfUrl: body.previewPdfUrl || "" } : {}),
        ...(body.weight != null ? { weight: parseInt(body.weight) } : {}),
        ...(body.dimensions !== undefined ? { dimensions: body.dimensions || "" } : {}),
        ...(body.language !== undefined ? { language: body.language || "" } : {}),
        ...(body.publicationYear != null ? { publicationYear: parseInt(body.publicationYear) } : {}),
        ...(body.whatsapp !== undefined ? { whatsapp: body.whatsapp || null } : {}),
      },
      include: { category: true },
    })

    revalidateTag("books", "max")
    return NextResponse.json(book)
  } catch (e) {
    console.error("Update book error:", e)
    const message = e instanceof Error ? e.message : "Failed to update book"
    return NextResponse.json({ error: message }, { status: 500 })
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
    revalidateTag("books", "max")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete book" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

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

    const article = await prisma.article.findUnique({ where: { id: idNum } })
    if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(article)
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
    const idNum = parseInt(id)
    if (isNaN(idNum)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })

    const article = await prisma.article.update({
      where: { id: idNum },
      data: {
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.slug != null ? { slug: body.slug } : {}),
        ...(body.content !== undefined ? { content: body.content } : {}),
        ...(body.featuredImage !== undefined ? { featuredImage: body.featuredImage } : {}),
        ...(body.fileUrl !== undefined ? { fileUrl: body.fileUrl } : {}),
      },
    })
    revalidateTag("articles", "max")
    return NextResponse.json(article)
  } catch (e: unknown) {
    const prismaErr = e as { code?: string }
    if (prismaErr.code === "P2002") {
      return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 })
    }
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 })
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
    const idNum = parseInt(id)
    if (isNaN(idNum)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 })

    await prisma.article.delete({ where: { id: idNum } })
    revalidateTag("articles", "max")
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 })
  }
}

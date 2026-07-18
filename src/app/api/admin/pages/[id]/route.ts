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
  const page = await prisma.page.findUnique({ where: { id: parseInt(id) } })
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(page)
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
    const page = await prisma.page.update({
      where: { id: parseInt(id) },
      data: {
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.slug != null ? { slug: body.slug } : {}),
        ...(body.content != null ? { content: body.content } : {}),
      },
    })
    return NextResponse.json(page)
  } catch (e: any) {
    if (e?.code === "P2002") {
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
    await prisma.page.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 })
  }
}
